// The drop's gallery runtime. It is only the frame around the pieces: it gives a
// piece a canvas, its hash and the viewer's pointer, and runs the clock. It has
// no drawing helpers, no randomness and no palettes on purpose: every piece in
// pieces/ is written from scratch and shares no code with any other piece.
//
// A piece registers itself with Proto.add({
//   num: 1..100,            its place in the drop (the file is pieces/NNN.js)
//   name, fam, recipe,      title, family, a plain description
//   interactive: '...',     optional: what the pointer does in the large view
//   music: true,            optional: it plays sound after Unmute (c.sound)
//   gl: true,               optional: draw with WebGL2 (c.gl) instead of 2D (c.ctx)
//   fps: 30,                optional, default 30
//   seed: 0,                optional: which deterministic hash opens it (see hashFor)
//   grid: 160,              the art grid: the piece draws on grid x grid cells scaled up to size, so it is
//                           crisp when size is a whole multiple of grid (0: resolution independent).
//                           A piece whose grid depends on the variation sets c.grid in make(); read
//                           inst.grid after create (a host can make a small probe instance first)
//   make(c) -> frame(t, dt) | undefined
// })
// c = { size, hash, ctx | gl, input, sound, trait(name, value), home, tile }
//   size   the square canvas in pixels (256 in a tile, 1000 large, up to 800 in a GIF):
//          draw everything relative to it, so a piece looks the same at any size
//   tile   true only in a gallery tile (256 px, stepped about 10 times a second with dt about 0.1, a still pointer,
//          no sound). A piece may do far less work there: a smaller simulation grid, fewer particles, fewer substeps,
//          offscreen buffers sized for 256 px, no expensive post passes. The tile must still be the same mint of the
//          same world (same traits, composition and palette); only fine detail may be simpler. Never true in the big
//          view, a GIF or a poster, so `if (c.tile)` branches can't change those. Keep every shader source and any
//          cache on the shared context (gl.__pNNN) the same as without it, or the big view's first make pays again.
//   hash   '0x' + 64 hex digits: the piece's only source of randomness
//   ctx    the 2D context, reset and filled black before make() is called
//   gl     a WebGL2 context shared by every gl piece: it is not yours between calls,
//          so set all state you use (program, buffers, attributes, blend, viewport
//          0, 0, size, size) in every draw; what you draw there is copied out after
//          make() and after every frame()
//   trait  names what this variation rolled; the large view lists them like a token's traits
//   input  the pointer in the large view (see makeInput); tiles get a still one
//   sound  c.sound.note(midi, opts) / c.sound.hit(kind, vel): silent unless unmuted
//   home   true on the piece's own opening variation
//   grid   optional, set in make(): this variation's art grid when it differs from def.grid
(function () {
  'use strict';
  // Dispose (one switch). Many pieces drop per-instance GL objects without deleting them; Chrome frees their GPU memory
  // only when V8 happens to collect the wrappers, so a gallery visit can pile up hundreds of MB between context resets.
  // On: the runtime records the textures, buffers, framebuffers, renderbuffers and VAOs each instance creates during
  // its make() and frames, and inst.dispose() (the gallery calls it when it drops an instance) deletes those nothing
  // shared still holds (see dispose below). false: no wrapping and no deleting at all (the old behaviour).
  const DISPOSE = true;
  const list = [];

  function randomHash() {
    const b = new Uint8Array(32);
    crypto.getRandomValues(b);
    return '0x' + Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
  }

  // The gallery's own hash for piece i, variation k (deterministic): a piece's
  // opening variation is hashFor(num - 1, seed).
  function hashFor(i, k) {
    let s = (i + 1) * 2654435761 + (k || 0) * 40503 >>> 0, out = '0x';
    for (let j = 0; j < 8; j++) {
      s = s + 0x6D2B79F5 | 0;
      let t = Math.imul(s ^ s >>> 15, 1 | s);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      out += ((t ^ t >>> 14) >>> 0).toString(16).padStart(8, '0');
    }
    return out;
  }

  // kept in order of num, whatever order the files load in
  function add(def) {
    if (!Number.isInteger(def.num) || def.num < 1) throw new Error('piece ' + def.name + ' needs a num');
    def.index = def.num - 1;
    def.type = 'raw';
    def.smooth = true;
    def.fam = def.fam || '';
    if (list.some(d => d.num === def.num)) throw new Error('two pieces with num ' + def.num);
    let i = list.findIndex(d => d.num > def.num);
    if (i < 0) i = list.length;
    list.splice(i, 0, def);
  }

  // ---------- input (large view only) ----------
  // g.input is what the pointer is doing over the piece, in 0..1 canvas units
  // (x right, y down). Tiles get a still one that never changes, so a piece must
  // look right without any input and only respond when it gets some.
  //   g.input.inside / down / x / y   the pointer now
  //   g.input.taps()                  clicks or touches since the last frame: [{ x, y }]
  //   g.input.cell(n)                 the cell of an n x n grid under the pointer, or null
  // The pointer may also be a hand waved at the camera, a tilted phone, or another
  // visitor's hand (the gallery feeds them all through the same fields).
  // Sound input (no longer fed: the founder asked that nothing use the microphone,
  // so the gallery never turns it on and listening stays false; kept so pieces that
  // read these fields still run):
  //   g.input.listening               true while the microphone is on
  //   g.input.level                   loudness now, 0..1 (smoothed)
  //   g.input.bands                   Float32Array(8): low to high, 0..1
  //   g.input.wave                    Float32Array(256): the sound wave now, -1..1
  //   g.input.beats()                 claps or beats heard since the last frame (a count)
  function makeInput() {
    const taps = [];
    let beats = 0;
    return {
      x: 0.5, y: 0.5, inside: false, down: false, live: false,
      listening: false, level: 0, bands: new Float32Array(8), wave: new Float32Array(256),
      beats() { const b = beats; beats = 0; return b; },
      beat() { beats++; },
      taps() { return taps.splice(0); },
      push(x, y) { if (taps.length < 32) taps.push({ x, y }); },
      cell(n) { return this.inside ? { x: Math.min(n - 1, Math.max(0, Math.floor(this.x * n))), y: Math.min(n - 1, Math.max(0, Math.floor(this.y * n))) } : null; },
    };
  }
  const STILL_INPUT = makeInput();

  // ---------- sound (pure code, muted until the viewer unmutes) ----------
  // Pieces call g.sound.note(midi, { dur, vel, wave, pan, cutoff }) and
  // g.sound.hit(kind, vel) whenever they play something; both do nothing while
  // muted, in tiles, or in GIF export, so pieces can call them freely.
  // wave: 'sine' | 'triangle' | 'square' | 'sawtooth'; kind: 'kick' | 'snare' | 'hat' | 'click' | 'blip' | 'noise'.
  // g.sound.pcm(samples, rate) queues raw samples end to end (for pieces that make their own waveform).
  const Audio = (() => {
    let ac = null, master = null, voices = 0, noiseBuf = null;
    const MAX_VOICES = 24;
    function init() {
      if (ac) return ac;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
      const comp = ac.createDynamicsCompressor();
      master = ac.createGain(); master.gain.value = 0.5;
      master.connect(comp); comp.connect(ac.destination);
      noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      return ac;
    }
    function out(pan) {
      if (!pan || !ac.createStereoPanner) return master;
      const p = ac.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); p.connect(master); return p;
    }
    function env(gain, t, a, peak, dur) {
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + a + dur);
    }
    function note(midi, o = {}) {
      if (!ac || voices >= MAX_VOICES) return;
      const t = ac.currentTime + (o.at || 0), dur = Math.min(4, o.dur || 0.25), vel = Math.min(1, o.vel ?? 0.5);
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = o.wave || 'triangle';
      osc.frequency.value = o.freq || 440 * Math.pow(2, (midi - 69) / 12);
      let node = osc;
      if (o.cutoff) { const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.cutoff; osc.connect(f); node = f; }
      node.connect(gain); gain.connect(out(o.pan));
      env(gain, t, o.attack || 0.008, vel * 0.25, dur);
      osc.start(t); osc.stop(t + dur + 0.05);
      voices++; osc.onended = () => voices--;
    }
    function hit(kind = 'click', vel = 0.6, o = {}) {
      if (!ac || voices >= MAX_VOICES) return;
      const t = ac.currentTime + (o.at || 0), gain = ac.createGain(), v = Math.min(1, vel) * 0.35;
      gain.connect(out(o.pan));
      if (kind === 'kick' || kind === 'blip') {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        const f0 = kind === 'kick' ? 150 : (o.freq || 880);
        osc.frequency.setValueAtTime(f0, t);
        osc.frequency.exponentialRampToValueAtTime(kind === 'kick' ? 40 : f0 * 0.5, t + (kind === 'kick' ? 0.15 : 0.06));
        osc.connect(gain); env(gain, t, 0.002, v * (kind === 'kick' ? 1.6 : 0.7), kind === 'kick' ? 0.3 : 0.08);
        osc.start(t); osc.stop(t + 0.4); voices++; osc.onended = () => voices--;
      } else {
        const src = ac.createBufferSource(), f = ac.createBiquadFilter();
        src.buffer = noiseBuf;
        f.type = kind === 'hat' ? 'highpass' : kind === 'snare' ? 'bandpass' : kind === 'noise' ? 'lowpass' : 'bandpass';
        f.frequency.value = kind === 'hat' ? 7000 : kind === 'snare' ? 1800 : kind === 'noise' ? (o.cutoff || 1200) : 3000;
        src.connect(f); f.connect(gain);
        const len = kind === 'hat' ? 0.05 : kind === 'snare' ? 0.18 : kind === 'noise' ? (o.dur || 0.4) : 0.015;
        env(gain, t, 0.001, v, len);
        src.start(t); src.stop(t + len + 0.05); voices++; src.onended = () => voices--;
      }
    }
    // raw samples (-1..1) queued end to end, for pieces that compute their own
    // waveform (bytebeat): call it each frame with the next chunk
    let pcmAt = 0;
    function pcm(data, rate = 8000, o = {}) {
      if (!ac || !data.length) return;
      const buf = ac.createBuffer(1, data.length, rate), src = ac.createBufferSource(), gain = ac.createGain();
      buf.copyToChannel(data instanceof Float32Array ? data : Float32Array.from(data), 0);
      src.buffer = buf; gain.gain.value = Math.min(1, o.vel ?? 0.5) * 0.4;
      src.connect(gain); gain.connect(out(o.pan));
      const now = ac.currentTime;
      if (pcmAt < now + 0.02 || pcmAt > now + 1) pcmAt = now + 0.05;
      src.start(pcmAt); pcmAt += data.length / rate;
    }
    return { init, note, hit, pcm, get ready() { return !!ac; }, resume() { if (ac && ac.state === 'suspended') ac.resume(); }, suspend() { if (ac && ac.state === 'running') ac.suspend(); } };
  })();
  const SILENT = { on: false, note() {}, hit() {}, pcm() {} };
  // A live sound for the large view: plays only while `isOn()` says so.
  function makeSound(isOn) {
    return {
      get on() { return isOn() && Audio.ready; },
      note(m, o) { if (this.on) Audio.note(m, o); },
      hit(k, v, o) { if (this.on) Audio.hit(k, v, o); },
      pcm(d, r, o) { if (this.on) Audio.pcm(d, r, o); },
    };
  }

  // ---------- WebGL: one shared context for every gl piece ----------
  // The context can be lost (phones drop it when the page is backgrounded or the GPU is short of memory). A lost
  // context is never reused: pieces cache programs and targets on the gl object (gl.__pNNN), so a fresh context
  // object starts clean. While it is lost, live instances keep their last picture (step() draws nothing) and
  // create() refuses; once a new context exists, inst.lost is true for the old instances and the host remakes them.
  let glc = null, gl = null, glGen = 0, glLost = false, noGl = false, glPieces = new Set();
  const GL_OPTS = { preserveDrawingBuffer: true, antialias: true, premultipliedAlpha: false };
  function newGl(size) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = Math.max(256, size);
    const g = cv.getContext('webgl2', GL_OPTS);
    if (!g || g.isContextLost()) return false;
    // compiles go to the driver's worker threads (talon2 GL: one at a time without it); pieces still read LINK_STATUS as before
    g.getExtension('KHR_parallel_shader_compile');
    cv.addEventListener('webglcontextlost', e => { e.preventDefault(); if (cv === glc) glLost = true; });
    // restored: drop the old object (its caches are dead); the next sharedGl() makes a clean one
    cv.addEventListener('webglcontextrestored', () => { if (cv === glc) { gl = glc = null; glLost = false; glGen++; } });
    halfOnly(g);
    if (DISPOSE) { dHooks(); dWrap(g); }
    glc = cv; gl = g; glGen++; glLost = false; glPieces = new Set();
    return true;
  }
  // Phones with half-float render targets but no 32-bit float ones (many Android GPUs, older iOS): enable the half-float
  // extension for every piece and allocate 32-bit float textures and renderbuffers as their 16-bit versions, which those
  // phones can render to and filter. Less precision, but a live picture instead of a black one. Devices that have
  // EXT_color_buffer_float (desktops, recent phones) are left exactly as they are.
  function halfOnly(g) {
    const sup = g.getSupportedExtensions() || [];
    if (sup.includes('EXT_color_buffer_float') || !sup.includes('EXT_color_buffer_half_float') || !g.getExtension('EXT_color_buffer_half_float')) return;
    const H = new Map([[g.RGBA32F, g.RGBA16F], [g.RGB32F, g.RGB16F], [g.RG32F, g.RG16F], [g.R32F, g.R16F]]), h = f => H.get(f) || f;
    const w = (name, i) => { const o = g[name]; g[name] = function (...a) { a[i] = h(a[i]); return o.apply(this, a); }; };
    w('texImage2D', 2); w('texImage3D', 2); w('texStorage2D', 2); w('texStorage3D', 2);
    w('renderbufferStorage', 1); w('renderbufferStorageMultisample', 2);
    g.__halfOnly = true;
  }
  function sharedGl(size) {
    if (glLost) throw Object.assign(new Error('the WebGL context is lost'), { lost: true });
    if (!gl && (noGl || !newGl(size))) {
      // had a context before: the GPU is away for now (lost); never had one: no WebGL2 on this device
      if (glGen) { glLost = true; throw Object.assign(new Error('the WebGL context is lost'), { lost: true }); }
      noGl = true; throw Object.assign(new Error('this browser has no WebGL2'), { unsupported: 'no WebGL2' });
    }
    if (glc.width < size) glc.width = glc.height = size;
    return gl;
  }
  // try a fresh context while the old one stays lost (some browsers never send webglcontextrestored)
  function reviveGl() { if (!glLost) return true; const was = [glc, gl]; if (newGl(was[0] ? was[0].width : 256)) return true; [glc, gl] = was; return false; }
  // the shared canvas only ever grows (to the big view's 1000 px); a host with no instance bigger than `size` left (the
  // gallery after the big view closes) shrinks it back, so tiles don't resolve and copy a 1000 px drawing buffer
  function fitGl(size) { const s = Math.max(256, size || 256); if (glc && !glLost && glc.width > s) glc.width = glc.height = s; }
  // what the gallery's device tier needs to know up front: WebGL2 at all, and the GPU's name (software renderers such as
  // SwiftShader or llvmpipe name themselves). Makes the shared context, so the gallery calls it just before its first make.
  function gpuInfo() {
    let g;
    try { g = sharedGl(256); } catch (e) { return { gl2: !!e.lost, renderer: '' }; }
    if (g.__info) return g.__info;
    let r = '';
    try {
      r = String(g.getParameter(g.RENDERER) || '');
      // Chrome and Safari mask RENDERER; the unmasked name is behind this extension (Firefox already unmasks RENDERER)
      if (/^webkit/i.test(r)) { const x = g.getExtension('WEBGL_debug_renderer_info'); if (x) r = String(g.getParameter(x.UNMASKED_RENDERER_WEBGL) || r); }
    } catch {}
    return (g.__info = { gl2: true, renderer: r });
  }
  // resolves once the GPU has done the shared context's work queued so far (a fence, polled without blocking the page):
  // a potato waits on it after a make, whose GPU side (shader code generation, bakes) can take seconds in software
  function gpuIdle(maxMs) {
    return new Promise(ok => {
      if (!gl || glLost) return ok(false);
      const g = gl, s = g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE, 0), t0 = performance.now();
      if (!s) return ok(false);
      g.flush();
      const poll = () => {
        if (g !== gl || g.isContextLost()) return ok(false);
        if (g.getSyncParameter(s, g.SYNC_STATUS) === g.SIGNALED || performance.now() - t0 > (maxMs || 60000)) { g.deleteSync(s); return ok(true); }
        setTimeout(poll, 50);
      };
      setTimeout(poll, 50);
    });
  }
  // drop the shared context on purpose (it holds every piece's cached programs and targets); live instances turn lost
  function resetGl() {
    if (!gl) return;
    const ext = gl.getExtension('WEBGL_lose_context');
    gl = glc = null; glLost = false; glGen++;
    if (ext) ext.loseContext();
  }

  // ---------- dispose: delete what a dropped instance created and nothing shared holds (DISPOSE above) ----------
  // Recorded: textures, buffers, framebuffers, renderbuffers and VAOs created on the shared context while an instance's
  // make() or frame() runs (owner = that instance). Never deleted by dispose:
  //  - programs, shaders, samplers, queries, syncs (small, and the things pieces cache most);
  //  - anything reachable from the context's own properties (gl.__pNNN caches, gl.__caps...), from a value stored in a
  //    WeakMap or Map under the context as key (the per-context CACHE.get(gl) pattern), from any Map or Set that was
  //    given a recorded object while an instance ran (closure slot caches), or from the piece's def object, walked recursively (objects, arrays, Maps, Sets) with a visited set; if the walk is too big to finish, nothing;
  //  - anything bound, attached or used by another instance or by code outside any instance (a cache or pool in a
  //    closure shows up this way as soon as a second instance uses it), and anything inside a value registered with a
  //    FinalizationRegistry (a pool that takes an instance's set back when it is collected);
  //  - anything attached to a kept framebuffer or VAO (its current attachments and attribute/index buffers);
  //  - anything the piece deleted itself, and everything of an instance whose context was lost or replaced.
  // Safety net: if a deleted object is ever used again (a cache this could not see), the world is logged with
  // console.error, never disposed again on this page, and the shared context is reset so every live world is remade
  // clean (the gallery's lost-context path).
  // Worlds whose caches the walk can't see (state in a closure behind a cached helper function, a module-level variable
  // or a pool refilled by a FinalizationRegistry), found by scratch/perf/b45/audit.mjs (a later make reused an object
  // dispose had deleted): never tracked or disposed, exactly as with DISPOSE off.
  // 588 (drop-fix, 2026-11-13): its skerry index buffer lives only in the closure of the cached skVao helper and is bound
  // to no VAO until a non-home mint asks for one, so dispose of the first (home) instance deleted it; its per-mint objects
  // go to its own FinalizationRegistry, so skipping it frees nothing less.
  const D_SKIP = new Set([163, 185, 220, 255, 294, 316, 328, 338, 366, 370, 417, 454, 460, 474, 495, 588]);
  const D_OWN = Symbol('owner'), D_SH = Symbol('shared'), D_GONE = Symbol('deleted'), D_DISP = Symbol('disposed'), D_KIDS = Symbol('attached'), D_DEL = Symbol('del');
  let dRec = null, dCur = 0, dSeq = 0, dPanic = false, dCaches = [], dCacheSet = new WeakSet();
  const dNo = new Set(), dStat = { disposed: 0, deleted: 0, kept: 0, bad: 0 };
  const D_KINDS = { createTexture: 'deleteTexture', createBuffer: 'deleteBuffer', createFramebuffer: 'deleteFramebuffer', createRenderbuffer: 'deleteRenderbuffer', createVertexArray: 'deleteVertexArray' };
  function dUse(o) {
    if (o[D_DISP] !== undefined && !dNo.has(o[D_DISP])) {
      dNo.add(o[D_DISP]); dStat.bad++; dPanic = true;
      console.error('dispose: #' + o[D_DISP] + ' used a GL object its dispose deleted; dispose is off for it now and the GL context restarts');
    }
    const w = o[D_OWN];
    if (w !== undefined && w !== dCur) o[D_SH] = 1;
  }
  function dKid(box, key, o) { if (box) (box[D_KIDS] || (box[D_KIDS] = {}))[key] = o; }
  function dWrap(g) {
    let fbDraw = null, fbRead = null, vao = null, arr = null;
    const F = g.FRAMEBUFFER, DF = g.DRAW_FRAMEBUFFER, RF = g.READ_FRAMEBUFFER, AB = g.ARRAY_BUFFER, EB = g.ELEMENT_ARRAY_BUFFER;
    for (const name in D_KINDS) {
      const oc = g[name], od = g[D_KINDS[name]];
      g[name] = function () {
        const o = oc.call(this);
        if (o && dRec) {
          o[D_OWN] = dRec.id; o[D_DEL] = od;
          const r = dRec; r.refs.push(new WeakRef(o));
          if (r.refs.length > r.cap) { r.refs = r.refs.filter(w => { const x = w.deref(); return x && !x[D_GONE]; }); r.cap = Math.max(256, 2 * r.refs.length); }
        }
        return o;
      };
      g[D_KINDS[name]] = function (o) { if (o) o[D_GONE] = 1; return od.call(this, o); };
    }
    const fbOf = t => t === RF ? fbRead : fbDraw;
    const w = (name, fn) => { const o = g[name]; if (o) g[name] = fn(o); };
    w('bindTexture', o => function (t, x) { if (x) dUse(x); return o.call(this, t, x); });
    w('bindRenderbuffer', o => function (t, x) { if (x) dUse(x); return o.call(this, t, x); });
    w('bindBuffer', o => function (t, x) { if (x) dUse(x); if (t === AB) arr = x; else if (t === EB && vao) dKid(vao, 'e', x); return o.call(this, t, x); });
    w('bindBufferBase', o => function (t, i, x) { if (x) dUse(x); return o.call(this, t, i, x); });
    w('bindBufferRange', o => function (t, i, x, a, b) { if (x) dUse(x); return o.call(this, t, i, x, a, b); });
    w('bindVertexArray', o => function (x) { if (x) dUse(x); vao = x; return o.call(this, x); });
    w('bindFramebuffer', o => function (t, x) { if (x) dUse(x); if (t === F) fbDraw = fbRead = x; else if (t === DF) fbDraw = x; else if (t === RF) fbRead = x; return o.call(this, t, x); });
    w('framebufferTexture2D', o => function (t, a, tt, x, l) { if (x) dUse(x); dKid(fbOf(t), a, x); return o.call(this, t, a, tt, x, l); });
    w('framebufferTextureLayer', o => function (t, a, x, l, y) { if (x) dUse(x); dKid(fbOf(t), a, x); return o.call(this, t, a, x, l, y); });
    w('framebufferRenderbuffer', o => function (t, a, rt, x) { if (x) dUse(x); dKid(fbOf(t), a, x); return o.call(this, t, a, rt, x); });
    w('vertexAttribPointer', o => function (i, n, ty, nm, s, off) { if (vao) dKid(vao, i, arr); return o.call(this, i, n, ty, nm, s, off); });
    w('vertexAttribIPointer', o => function (i, n, ty, s, off) { if (vao) dKid(vao, i, arr); return o.call(this, i, n, ty, s, off); });
    w('deleteVertexArray', o => function (x) { if (x === vao) vao = null; return o.call(this, x); });
    w('deleteFramebuffer', o => function (x) { if (x === fbDraw) fbDraw = null; if (x === fbRead) fbRead = null; return o.call(this, x); });
    w('deleteBuffer', o => function (x) { if (x === arr) arr = null; return o.call(this, x); });
    dCaches = []; dCacheSet = new WeakSet();
  }
  // The hooks below are made when the first shared context is (dHooks() in sharedGl). Scoped to the worlds' own code: the patched built-ins are swapped in only while an instance's make() or frame() runs
  // (dRun below) and the originals put straight back after, so the host page's Map, Set, WeakMap and FinalizationRegistry
  // are never patched while its own code runs (prints, 2026-11-13). A cache filled outside a make or frame (a tap handler,
  // a timer) isn't seen; dispose's safety net (a deleted object used again) covers that.
  let dHooked = false, dOrig = null, dMine = null;
  function dHooks() {
    if (dHooked) return; dHooked = true;
    // per-context caches kept in a WeakMap or Map under the context as key: remember their values (weakly) as roots
    const note = v => { if (v && typeof v === 'object' && !dCacheSet.has(v)) { dCacheSet.add(v); dCaches.push(new WeakRef(v)); } };
    // and, while an instance runs, any Map or Set given a recorded GL object (or a small plain object or array holding
    // one): a hash- or size-keyed slot cache kept in a closure (e.g. slots.set(hash, { tex, fbo }))
    const holds = v => {
      if (v[D_OWN] !== undefined) return true;
      if (Array.isArray(v) ? v.length > 32 : Object.getPrototypeOf(v) !== Object.prototype) return false;
      const ks = Object.keys(v); if (ks.length > 32) return false;
      for (const k of ks) { const d = Object.getOwnPropertyDescriptor(v, k), x = d && d.value; if (x && typeof x === 'object' && x[D_OWN] !== undefined) return true; }
      return false;
    };
    const held = (box, v) => { if (dRec && v && typeof v === 'object' && !dCacheSet.has(box) && holds(v)) note(box); };
    const ws = WeakMap.prototype.set, ms = Map.prototype.set, sa = Set.prototype.add;
    dOrig = [[WeakMap.prototype, 'set', ws], [Map.prototype, 'set', ms], [Set.prototype, 'add', sa]];
    dMine = [function (k, v) { if (k === gl && k) note(v); else if (dRec && v && typeof v === 'object' && holds(v)) note(v); return ws.call(this, k, v); },
      function (k, v) { if (k === gl && k) note(v); else held(this, v); return ms.call(this, k, v); },
      function (v) { held(this, v); return sa.call(this, v); }];
    // a pool refilled by a FinalizationRegistry (the held value comes back for reuse when the instance is collected):
    // everything recorded inside a registered held value is shared, never disposed
    const FR = window.FinalizationRegistry;
    if (FR) {
      const reg = FR.prototype.register;
      const mark = (v, d) => { if (!v || typeof v !== 'object' || d > 3) return; if (v[D_OWN] !== undefined) { v[D_SH] = 1; const k = v[D_KIDS]; if (k) for (const x in k) mark(k[x], d + 1); } if (ArrayBuffer.isView(v)) return; for (const k of Object.keys(v).slice(0, 64)) { const x = Object.getOwnPropertyDescriptor(v, k); if (x && 'value' in x) mark(x.value, d + 1); } };
      dOrig.push([FR.prototype, 'register', reg]);
      dMine.push(function (target, held, token) { mark(held, 0); return reg.call(this, target, held, token); });
    }
  }
  // run fn as instance rec: its GL objects are recorded, and the built-in hooks are in place only for the call
  function dRun(rec, fn) {
    const on = dOrig && !dRec;
    dRec = rec; dCur = rec.id;
    if (on) for (let i = 0; i < dOrig.length; i++) dOrig[i][0][dOrig[i][1]] = dMine[i];
    try { return fn(); } finally {
      if (on) for (const [o, k, f] of dOrig) o[k] = f;
      dRec = null; dCur = 0;
      if (dPanic) { dPanic = false; resetGl(); }
    }
  }
  // every recorded GL object reachable from the shared roots, plus what is attached to them; null if too big to walk
  function dReach(g, def) {
    const seen = new Set(), keep = new Set(), stack = [];
    let n = 0;
    const push = v => { if (v && typeof v === 'object' && !seen.has(v)) { seen.add(v); stack.push(v); } };
    // own data properties only: a getter is never called (it could have side effects)
    const props = v => { for (const k of Object.keys(v)) { const d = Object.getOwnPropertyDescriptor(v, k); if (d && 'value' in d) push(d.value); } };
    props(g);
    for (const r of dCaches) push(r.deref());
    props(def);
    while (stack.length) {
      const v = stack.pop();
      if (++n > 200000) return null;
      if (v[D_OWN] !== undefined) { keep.add(v); const kids = v[D_KIDS]; if (kids) for (const k in kids) push(kids[k]); }
      if (ArrayBuffer.isView(v) || v instanceof ArrayBuffer || v instanceof Node || v === g || v === window) continue;
      // arrays: elements and any extra named properties (L.base = ...); long ones only their elements
      if (Array.isArray(v)) { if (v.length <= 4096) props(v); else { n += v.length >> 6; for (let i = 0; i < v.length; i++) push(v[i]); } }
      else if (v instanceof Map) { n += v.size >> 6; for (const [k, x] of v) { push(k); push(x); } }
      else if (v instanceof Set) { n += v.size >> 6; for (const x of v) push(x); }
      else props(v);
    }
    return keep;
  }
  function dKeepWithKids(o, keep) {
    if (keep.has(o)) return; keep.add(o);
    const kids = o[D_KIDS]; if (kids) for (const k in kids) if (kids[k]) dKeepWithKids(kids[k], keep);
  }
  function dispose(rec, g) {
    if (!rec || rec.done) return;
    rec.done = true;
    const all = [];
    for (const r of rec.refs) { const o = r.deref(); if (o && !o[D_GONE]) all.push(o); }
    rec.refs = [];
    if (!all.length || dNo.has(rec.num) || g !== gl || glLost) return;
    const keep = dReach(g, rec.def);
    if (!keep) return;
    for (const o of all) if (o[D_SH] || o[D_OWN] !== rec.id) dKeepWithKids(o, keep);
    dStat.disposed++;
    for (const o of all) {
      if (keep.has(o)) { dStat.kept++; continue; }
      o[D_DEL].call(g, o); o[D_GONE] = 1; o[D_DISP] = rec.num; dStat.deleted++;
    }
  }

  // ---------- what a device must support ----------
  // A world that needs a GPU feature it has no fallback for: num -> feature names (PROBES). When the device lacks one,
  // create() refuses with err.unsupported and the gallery shows the world's poster with a note instead of a blank view.
  // Filled from the device harness only for worlds that can't get a piece-level fallback.
  const NEEDS = { /* tools/perf/needs.mjs */ 4: ['halfFloatTarget'], 24: ['halfFloatTarget'], 31: ['halfFloatTarget'], 38: ['halfFloatTarget'], 41: ['halfFloatTarget'], 43: ['halfFloatTarget'], 47: ['halfFloatTarget'], 50: ['halfFloatTarget'], 51: ['halfFloatTarget'], 60: ['halfFloatTarget'], 61: ['halfFloatTarget'], 62: ['halfFloatTarget'], 64: ['halfFloatTarget'], 69: ['halfFloatTarget'], 73: ['halfFloatTarget'], 77: ['halfFloatTarget'], 78: ['halfFloatTarget'], 80: ['halfFloatTarget'], 82: ['halfFloatTarget'], 85: ['halfFloatTarget'], 86: ['halfFloatTarget'], 87: ['halfFloatTarget'], 89: ['halfFloatTarget'], 98: ['halfFloatTarget'], 116: ['halfFloatTarget'], 126: ['halfFloatTarget'], 127: ['halfFloatTarget'], 144: ['halfFloatTarget'], 168: ['halfFloatTarget'], 186: ['halfFloatTarget'], 190: ['halfFloatTarget'], 192: ['halfFloatTarget'], 248: ['halfFloatTarget'], 265: ['halfFloatTarget'], 272: ['halfFloatTarget'], 303: ['halfFloatTarget'], 306: ['halfFloatTarget'], 307: ['halfFloatTarget'], 309: ['halfFloatTarget'], 312: ['halfFloatTarget'], 332: ['halfFloatTarget'], 354: ['halfFloatTarget'], 356: ['halfFloatTarget'], 361: ['halfFloatTarget'], 374: ['halfFloatTarget'], 379: ['halfFloatTarget'], 386: ['halfFloatTarget'], 389: ['halfFloatTarget'], 390: ['halfFloatTarget'], 395: ['halfFloatTarget'], 401: ['halfFloatTarget'], 411: ['halfFloatTarget'], 412: ['halfFloatTarget'], 428: ['halfFloatTarget'], 429: ['halfFloatTarget'], 431: ['halfFloatTarget'], 438: ['halfFloatTarget'], 442: ['halfFloatTarget'], 449: ['halfFloatTarget'], 451: ['halfFloatTarget'], 457: ['halfFloatTarget'], 461: ['halfFloatTarget'], 463: ['halfFloatTarget'], 476: ['halfFloatTarget'], 477: ['halfFloatTarget'], 479: ['halfFloatTarget'], 481: ['tex4096'], 484: ['halfFloatTarget'], 485: ['halfFloatTarget'], 583: ['halfFloatTarget'], 589: ['halfFloatTarget'], 602: ['halfFloatTarget'], 609: ['halfFloatTarget'] };
  const PROBES = {
    floatTarget: g => !!g.getExtension('EXT_color_buffer_float'),                // render to RGBA32F / RGBA16F
    halfFloatTarget: g => !!(g.getExtension('EXT_color_buffer_half_float') || g.getExtension('EXT_color_buffer_float')),
    floatLinear: g => !!g.getExtension('OES_texture_float_linear'),              // LINEAR filtering of 32-bit float textures
    tex4096: g => g.getParameter(g.MAX_TEXTURE_SIZE) >= 4096,
    tex8192: g => g.getParameter(g.MAX_TEXTURE_SIZE) >= 8192,
  };
  // null when the device can run def, else a short reason; probes run once per context (cached on gl.__caps) and
  // only for worlds listed in NEEDS, so other worlds see no extension enabled that they didn't ask for
  function unsupported(def, size) {
    if (!def.gl) return null;
    let g;
    try { g = sharedGl(size || 256); } catch (e) { return e.unsupported || (e.lost ? 'lost' : String(e.message)); }
    const need = NEEDS[def.num];
    if (!need || !need.length) return null;
    const caps = g.__caps || (g.__caps = {}), missing = [];
    for (const f of need) { if (!(f in caps)) caps[f] = PROBES[f] ? PROBES[f](g) : true; if (!caps[f]) missing.push(f); }
    return missing.length ? 'needs ' + missing.join(', ') : null;
  }

  // opts (gallery only): { input, sound } for the large view; tiles and GIFs get still ones; { tile: true } for a tile (c.tile)
  function create(def, canvas, hash, opts) {
    const S = canvas.width;
    const why = unsupported(def, S);
    if (why === 'lost') throw Object.assign(new Error('the WebGL context is lost'), { lost: true });
    if (why) throw Object.assign(new Error('#' + def.num + ' cannot run here: ' + why), { unsupported: why });
    const ctx = canvas.getContext('2d');
    const reset = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
      ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'; ctx.imageSmoothingEnabled = true;
      ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; ctx.setLineDash([]);
    };
    reset();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, S, S);
    const traits = [];
    const c = {
      size: S, hash,
      input: opts && opts.input || STILL_INPUT,
      sound: opts && opts.sound || SILENT,
      home: hash === hashFor(def.index, def.seed || 0),
      tile: !!(opts && opts.tile),
      trait(name, value) {
        const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value;
        const i = traits.findIndex(t => t[0] === name);
        if (i >= 0) traits[i][1] = String(v); else traits.push([name, String(v)]);
        return value;
      },
    };
    let copy = () => {}, gen = glGen;
    // a gl instance whose context was lost or replaced: it can't draw any more (the host remakes it)
    const lost = () => def.gl && (glLost || gen !== glGen);
    if (def.gl) {
      const g = sharedGl(S), cv = glc;
      c.gl = g; gen = glGen; glPieces.add(def.num);
      // clear the canvas, not a framebuffer another instance's make() or frame left bound (617: wiped its first pass)
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      g.viewport(0, 0, S, S);
      g.clearColor(0, 0, 0, 1); g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
      // the piece drew into the bottom-left S x S of the shared canvas
      // flush first: on Chrome/ANGLE GL some later draws were intermittently missing from the copied frame (022, 023, 028)
      // never copy from a lost context (it would paint the view black): the last good picture stays
      copy = () => { if (g.isContextLost()) return; g.flush(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'copy'; ctx.drawImage(cv, 0, cv.height - S, S, S, 0, 0, S, S); ctx.globalCompositeOperation = 'source-over'; };
    } else c.ctx = ctx;
    let time = 0, f = 0, frame;
    // dispose: GL objects created while this instance's make() or frames run are recorded as its own
    const rec = DISPOSE && def.gl && !D_SKIP.has(def.num) ? { id: ++dSeq, num: def.num, def, refs: [], cap: 256, done: false } : null;
    if (rec) frame = dRun(rec, () => def.make(c));
    else frame = def.make(c);
    if (lost()) throw Object.assign(new Error('the WebGL context was lost during make'), { lost: true });
    copy();
    return {
      def, hash, canvas, traits,
      // a frame function may say it repeats exactly after `period` seconds
      period: frame && frame.period || 0, periodSteps: frame && frame.periodSteps || 0,
      step(dt) {
        if (lost() || rec && rec.done) return;
        time += dt; f++;
        if (!frame) return;
        if (def.gl) sharedGl(S);
        if (rec) dRun(rec, () => frame(time, dt, f));
        else frame(time, dt, f);
        copy();
      },
      // the host drops this instance for good (tile replaced or released, big view Next/Close): delete the GL objects
      // only it held (DISPOSE); it never steps again. Does nothing with DISPOSE off.
      dispose() { if (rec && !rec.done) { if (lost()) { rec.done = true; rec.refs = []; } else dispose(rec, c.gl); } },
      get lost() { return lost(); },
      get frames() { return f; },
      // the art grid this variation is drawn on (see grid above); 0 when it has none
      get grid() { return +c.grid || +def.grid || 0; },
    };
  }

  const fpsOf = def => def.fps || 30;
  const groups = [];
  const group = gr => groups.push(gr);
  window.Proto = { list, add, create, fpsOf, randomHash, hashFor, groups, group, Audio, makeInput, makeSound,
    // device support (gallery): the needs table, a capability check, and the shared context's state
    needs: NEEDS, unsupported, gpuInfo, gpuIdle, glLost: () => glLost, reviveGl, resetGl, fitGl, glUse: () => glPieces.size,
    // dispose (DISPOSE): counts so far, and the worlds it was switched off for after a deleted object was used again
    dispose: { on: DISPOSE, stat: dStat, off: dNo } };
})();
