// Shared runtime for the prototype gallery: noise, colour, the earlier collections' palettes (from art/base.js),
// and the three kinds of stage a
// prototype can draw on (a chunky cell grid, a vector plot, a fragment shader).
// Every prototype is one small function registered with Proto.add().
(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const list = [];

  // the seeded randomness, hex and css, and the palettes are in art/base.js (the page needs them before the art)
  const { rngFromHash, randomHash, hashFor, hex, css, PALETTES, INKS } = window.ProtoBase;

  // ---------- simplex noise ----------
  function makeNoise(R) {
    const perm = new Uint8Array(512), src = R.shuffle(Array.from({ length: 256 }, (_, i) => i));
    for (let i = 0; i < 512; i++) perm[i] = src[i & 255];
    const g3 = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1];
    const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
    function n2(x, y) {
      const s = (x + y) * F2, i = Math.floor(x + s), j = Math.floor(y + s), t = (i + j) * G2;
      const x0 = x - i + t, y0 = y - j + t, i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1;
      const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2, x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
      const ii = i & 255, jj = j & 255;
      let n = 0, a = 0.5 - x0 * x0 - y0 * y0, g;
      if (a > 0) { g = (perm[ii + perm[jj]] % 12) * 3; a *= a; n += a * a * (g3[g] * x0 + g3[g + 1] * y0); }
      a = 0.5 - x1 * x1 - y1 * y1;
      if (a > 0) { g = (perm[ii + i1 + perm[jj + j1]] % 12) * 3; a *= a; n += a * a * (g3[g] * x1 + g3[g + 1] * y1); }
      a = 0.5 - x2 * x2 - y2 * y2;
      if (a > 0) { g = (perm[ii + 1 + perm[jj + 1]] % 12) * 3; a *= a; n += a * a * (g3[g] * x2 + g3[g + 1] * y2); }
      return 70 * n;
    }
    function n3(x, y, z) {
      const s = (x + y + z) / 3, i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s), t = (i + j + k) / 6;
      const x0 = x - i + t, y0 = y - j + t, z0 = z - k + t;
      let i1, j1, k1, i2, j2, k2;
      if (x0 >= y0) {
        if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
        else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
        else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
      } else {
        if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
        else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
        else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      }
      const x1 = x0 - i1 + 1 / 6, y1 = y0 - j1 + 1 / 6, z1 = z0 - k1 + 1 / 6;
      const x2 = x0 - i2 + 1 / 3, y2 = y0 - j2 + 1 / 3, z2 = z0 - k2 + 1 / 3;
      const x3 = x0 - 0.5, y3 = y0 - 0.5, z3 = z0 - 0.5;
      const ii = i & 255, jj = j & 255, kk = k & 255;
      let n = 0, a = 0.6 - x0 * x0 - y0 * y0 - z0 * z0, g;
      if (a > 0) { g = (perm[ii + perm[jj + perm[kk]]] % 12) * 3; a *= a; n += a * a * (g3[g] * x0 + g3[g + 1] * y0 + g3[g + 2] * z0); }
      a = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (a > 0) { g = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12) * 3; a *= a; n += a * a * (g3[g] * x1 + g3[g + 1] * y1 + g3[g + 2] * z1); }
      a = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (a > 0) { g = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12) * 3; a *= a; n += a * a * (g3[g] * x2 + g3[g + 1] * y2 + g3[g + 2] * z2); }
      a = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (a > 0) { g = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12) * 3; a *= a; n += a * a * (g3[g] * x3 + g3[g + 1] * y3 + g3[g + 2] * z3); }
      return 32 * n;
    }
    const fbm = (x, y, z, oct = 3) => { let v = 0, a = 0.5, f = 1; for (let o = 0; o < oct; o++) { v += a * n3(x * f, y * f, z); a *= 0.5; f *= 2; } return v; };
    return { n2, n3, fbm };
  }

  // ---------- colour ----------
  const pk = c => (255 << 24 | c[2] << 16 | c[1] << 8 | c[0]) >>> 0;
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const clamp = (v, lo = 0, hi = 1) => v < lo ? lo : v > hi ? hi : v;
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  // Hue, saturation and brightness on the 0..100 scale the original sketches use.
  function hsb(h, s = 85, b = 90) {
    h = ((h % 100) + 100) % 100 / 100 * 6; s /= 100; b /= 100;
    const i = Math.floor(h), f = h - i, p = b * (1 - s), q = b * (1 - s * f), t = b * (1 - s * (1 - f));
    const [r, g, bl] = [[b, t, p], [q, b, p], [p, b, t], [p, q, b], [t, p, b], [b, p, q]][i % 6];
    return [r * 255, g * 255, bl * 255];
  }
  // t in 0..1 along a list of colours; cyclic wraps back to the first.
  function ramp(cols, t, cyclic) {
    const n = cyclic ? cols.length : cols.length - 1;
    if (n <= 0) return cols[0];
    t = cyclic ? ((t % 1) + 1) % 1 : clamp(t);
    const x = t * n, i = Math.min(Math.floor(x), n - (cyclic ? 0 : 1)), f = x - i;
    return mix(cols[i % cols.length], cols[(i + 1) % cols.length], f);
  }
  // Packed 256-entry lookup tables for cell grids.
  function lut(cols, cyclic, size = 256) {
    const out = new Uint32Array(size);
    for (let i = 0; i < size; i++) out[i] = pk(ramp(cols, cyclic ? i / size : i / (size - 1), cyclic));
    return out;
  }
  function hueLut(s = 85, b = 90, size = 256, from = 0, span = 100) {
    const out = new Uint32Array(size);
    for (let i = 0; i < size; i++) out[i] = pk(hsb(from + span * i / size, s, b));
    return out;
  }

  // A darker copy of a lookup table (k = 0..1).
  function dim(table, k) {
    const out = new Uint32Array(table.length);
    for (let i = 0; i < table.length; i++) { const v = table[i]; out[i] = (255 << 24 | ((v >> 16 & 255) * k) << 16 | ((v >> 8 & 255) * k) << 8 | (v & 255) * k) >>> 0; }
    return out;
  }
  // Darken a whole cell grid in place (k = 0..1), for fades between cycles.
  function fadePx(d, k) {
    if (k >= 1) return;
    k = Math.max(0, k);
    for (let i = 0; i < d.length; i++) { const v = d[i]; d[i] = (255 << 24 | ((v >> 16 & 255) * k) << 16 | ((v >> 8 & 255) * k) << 8 | (v & 255) * k) >>> 0; }
  }
  // black -> the scheme's colours -> near white, for densities and heat maps
  const heat = (cols, size = 256) => lut([[0, 0, 0], ...cols, mix(cols[cols.length - 1], [255, 255, 255], 0.7)], false, size);

  const palette = R => R.pick(PALETTES);
  const inkSet = R => R.pick(INKS);
  // A colour scheme for cell grids: the native rainbow about two times in
  // five, otherwise one of the small palettes. `lut` is cyclic, `cols` the stops.
  function scheme(R, nativeShare = 0.4) {
    if (R() < nativeShare) {
      const neon = R.bool(0.25), s = neon ? 100 : 85, b = neon ? 100 : 90, from = R.range(0, 100), span = R.pick([100, 100, 60, 35]) * R.sign();
      const cols = Array.from({ length: 8 }, (_, i) => hsb(from + span * i / 8, s, b));
      return { name: 'Native', native: true, cols, lut: hueLut(s, b, 256, from, span), black: pk([0, 0, 0]) };
    }
    const p = palette(R);
    return { name: p.name, native: false, cols: p.cols, lut: lut(p.cols, true), black: pk([0, 0, 0]) };
  }

  // Speckled drafting paper, cached as a canvas so plots can restamp it each frame.
  function paper(R, set, px) {
    const c = document.createElement('canvas'); c.width = c.height = px;
    const x = c.getContext('2d');
    x.fillStyle = css(set.ground); x.fillRect(0, 0, px, px);
    x.strokeStyle = css(set.speck, 0.5); x.lineWidth = Math.max(0.6, px / 900);
    x.beginPath();
    const n = Math.round(px * px / 55);
    for (let i = 0; i < n; i++) {
      const a = R() * px, b = R() * px, th = R() * TAU, l = (1 + R()) * px / 500;
      x.moveTo(a, b); x.lineTo(a + Math.cos(th) * l, b + Math.sin(th) * l);
    }
    x.stroke();
    return c;
  }

  // The ground a plot is drawn on: speckled paper with one ink, or black with a
  // palette. paint(a) restamps it (a < 1 fades whatever is already there).
  function sheet(R, g, paperShare = 0.5) {
    const onPaper = R() < paperShare, set = onPaper ? inkSet(R) : { name: 'Black', ground: [0, 0, 0], speck: [0, 0, 0], ink: [236, 236, 236] };
    const tex = onPaper ? paper(R, set, 512) : null, sc = scheme(R, 0.45), ctx = g.ctx;
    return {
      paper: onPaper, ground: set.ground, ink: set.ink, cols: onPaper ? [set.ink] : sc.cols, scheme: sc,
      paint(a = 1) {
        ctx.globalAlpha = a;
        if (tex) ctx.drawImage(tex, 0, 0, 1000, 1000); else { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000); }
        ctx.globalAlpha = 1;
      },
    };
  }

  // ---------- shared WebGL (one context for every shader prototype) ----------
  const GL_MAX = 400;
  let glc = null, gl = null;
  const programs = new Map();
  const GLSL_HEAD = `precision highp float;
uniform vec2 u_res; uniform float u_t; varying vec2 v_uv;
uniform vec3 u_pal[9]; uniform float u_np; uniform float u_native;
vec3 hsb(float h, float s, float b){ h = fract(h) * 6.0; vec3 k = clamp(abs(mod(h + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); return b * mix(vec3(1.0), k, s); }
vec3 palAt(float i){ vec3 c = u_pal[0]; for (int k = 1; k < 9; k++) { if (float(k) <= i) c = u_pal[k]; } return c; }
vec3 pal(float t){ t = fract(t); if (u_native > 0.5) return hsb(t, 0.85, 0.9); float x = t * u_np; float i = floor(x); return mix(palAt(i), palAt(mod(i + 1.0, u_np)), smoothstep(0.0, 1.0, fract(x))); }
vec3 palStep(float t){ t = fract(t); if (u_native > 0.5) return hsb(floor(t * 12.0) / 12.0, 0.85, 0.9); return palAt(floor(t * u_np)); }
`;
  function glInit() {
    glc = document.createElement('canvas'); glc.width = glc.height = GL_MAX;
    gl = glc.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return false;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    return true;
  }
  function glProgram(def) {
    let p = programs.get(def);
    if (p) return p;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(def.name + ': ' + gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a; varying vec2 v_uv; void main(){ v_uv = vec2(a.x, -a.y) * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }'));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, GLSL_HEAD + def.frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(def.name + ': ' + gl.getProgramInfoLog(prog));
    p = { prog, loc: new Map() };
    programs.set(def, p);
    return p;
  }
  function glDraw(def, res, t, uniforms) {
    if (!gl && !glInit()) return null;
    const p = glProgram(def), loc = n => { if (!p.loc.has(n)) p.loc.set(n, gl.getUniformLocation(p.prog, n)); return p.loc.get(n); };
    gl.viewport(0, 0, res, res);
    gl.useProgram(p.prog);
    const a = gl.getAttribLocation(p.prog, 'a');
    gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(loc('u_res'), res, res); gl.uniform1f(loc('u_t'), t);
    for (const k in uniforms) {
      const v = uniforms[k], l = loc(k);
      if (l === null) continue;
      if (typeof v === 'number') gl.uniform1f(l, v);
      else if (v.n) gl['uniform' + v.n + 'fv'](l, v.a);
      else gl['uniform' + v.length + 'fv'](l, v);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    return gl;
  }
  // Uniforms that hand a scheme() to the shader's pal()/palStep().
  function glPalette(sc) {
    const a = new Float32Array(27), n = Math.min(9, sc.cols.length);
    for (let i = 0; i < n; i++) { a[i * 3] = sc.cols[i][0] / 255; a[i * 3 + 1] = sc.cols[i][1] / 255; a[i * 3 + 2] = sc.cols[i][2] / 255; }
    return { u_pal: { a, n: 3 }, u_np: n, u_native: sc.native ? 1 : 0 };
  }

  // ---------- stages ----------
  // def: { name, fam, recipe, type: 'px' | 'vec' | 'gl', n, fps, make(R, U, g) -> frame(t, dt, f) }
  //  px:  g.d is a packed n*n pixel grid, blown up with hard edges
  //  vec: g.ctx draws in a 1000 x 1000 space; g.lw(w) keeps hairlines visible
  //  gl:  frame() returns the uniforms for def.frag, drawn at n x n
  // A piece's number (def.index, which g.home and the gallery's hashes go by) is its place in the whole drop: its family's
  // first piece's, from art/facts.js (ProtoBase.famAt), and its place in its family. The page loads Drop 01 a family at a
  // time (art/base.js need; the speed doc's F, 2026-10-26), and a family loaded alone numbers its pieces as the whole
  // drop does. Without the facts (server/tools/art-facts.mjs, making them) it's the order they're added in, the same.
  const famN = {};
  function add(def) {
    const at = window.ProtoBase && window.ProtoBase.famAt ? window.ProtoBase.famAt(def.fam) : null;
    def.index = at == null ? list.length : at + (famN[def.fam] = (famN[def.fam] || 0) + 1) - 1;
    list.push(def);
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

  // opts (gallery only): { input, sound } for the large view; tiles and GIFs get still ones
  function create(def, canvas, hash, opts) {
    let S = canvas.width;
    const ctx = canvas.getContext('2d');
    const R = rngFromHash(hash);
    let g, flush;
    // Pixel pieces (set 2) pick their grid from `sizes` by seed, and the canvas is
    // made a whole multiple of it so every cell is the same number of pixels.
    const pickN = def.type === 'px' && def.sizes ? R.pick(def.sizes) : 0;
    if (pickN) {
      const base = +canvas.dataset.base || S, k = Math.max(1, Math.round(base / pickN));
      canvas.dataset.base = base;
      if (k * pickN !== S) canvas.width = canvas.height = S = k * pickN;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, S, S);
    if (def.type === 'px') {
      const n = pickN || def.n || 100, off = document.createElement('canvas');
      off.width = off.height = n;
      const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
      d.fill(0xff000000);
      g = { n, d, S };
      flush = () => { octx.putImageData(img, 0, 0); ctx.imageSmoothingEnabled = false; ctx.drawImage(off, 0, 0, S, S); };
    } else if (def.type === 'vec') {
      const k = S / 1000;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      g = { ctx, S, px: 1 / k, lw: w => Math.max(w, 0.85 / k) };
      flush = () => {};
    } else {
      // drawn upside down into one corner of the shared context, read back as
      // plain pixels (only n x n of them), then blown up like a cell grid
      const res = Math.min(GL_MAX, def.n || 200), off = document.createElement('canvas');
      off.width = off.height = res;
      const octx = off.getContext('2d'), img = octx.createImageData(res, res), bytes = new Uint8Array(img.data.buffer);
      g = { S, n: res };
      flush = u => {
        const ctx3 = glDraw(def, res, time, u || {});
        if (!ctx3) return;
        ctx3.readPixels(0, 0, res, res, ctx3.RGBA, ctx3.UNSIGNED_BYTE, bytes);
        octx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = !!def.smooth;
        ctx.drawImage(off, 0, 0, S, S);
      };
    }
    g.input = opts && opts.input || STILL_INPUT;
    g.sound = opts && opts.sound || SILENT;
    // g.home: this is the prototype's own opening variation. g.alt: a second
    // random stream from the same hash, independent of R, so a piece can choose
    // extra modes without changing a single draw its original code makes from R
    // (the original look then comes back exactly for every hash that keeps it).
    g.hash = hash;
    g.home = hash === hashFor(def.index, def.seed || 0);
    g.alt = rngFromHash('0x' + String(hash).slice(2).split('').reverse().join(''));
    // g.trait(name, value): a piece names what this variation rolled (it returns the
    // value, so it can wrap the roll); the large view lists them like a token's traits.
    g.traits = [];
    g.trait = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = g.traits.findIndex(t => t[0] === name); if (i >= 0) g.traits[i][1] = String(v); else g.traits.push([name, String(v)]); return value; };
    let time = 0, f = 0;
    const frame = def.make(R, U, g);
    return {
      def, hash, canvas, traits: g.traits,
      // a frame function may say it repeats exactly: after `period` seconds of its
      // clock, or after `periodSteps` calls for pieces that count steps
      period: frame.period || 0, periodSteps: frame.periodSteps || 0,
      step(dt) { time += dt; flush(frame(time, dt, f++)); },
      get frames() { return f; },
    };
  }

  const U = { TAU, hex, pk, css, mix, clamp, lerp, smooth, hsb, ramp, lut, hueLut, dim, fadePx, heat, BLACK: 0xff000000, PALETTES, INKS, palette, inkSet, scheme, paper, sheet, noise: makeNoise, glPalette };
  const fpsOf = def => def.fps || (def.type === 'px' ? 12 : 24);
  // Pieces merged into one, each member a species of it (see groups.js).
  const groups = [];
  const group = gr => groups.push(gr);
  window.Proto = { list, add, create, fpsOf, randomHash, hashFor, rngFromHash, U, groups, group, Audio, makeInput, makeSound };
})();
