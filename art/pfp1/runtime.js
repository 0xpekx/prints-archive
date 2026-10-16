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
//   make(c) -> frame(t, dt) | undefined
// })
// c = { size, hash, ctx | gl, input, sound, trait(name, value), home }
//   size   the square canvas in pixels (256 in a tile, 1000 large, up to 800 in a GIF):
//          draw everything relative to it, so a piece looks the same at any size
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
(function () {
  'use strict';
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
  let glc = null, gl = null;
  function sharedGl(size) {
    if (!gl) {
      glc = document.createElement('canvas');
      glc.width = glc.height = Math.max(256, size);
      gl = glc.getContext('webgl2', { preserveDrawingBuffer: true, antialias: true, premultipliedAlpha: false });
      if (!gl) throw new Error('this browser has no WebGL2');
    }
    if (glc.width < size) glc.width = glc.height = size;
    return gl;
  }

  // opts (gallery only): { input, sound } for the large view; tiles and GIFs get still ones
  function create(def, canvas, hash, opts) {
    const S = canvas.width, ctx = canvas.getContext('2d');
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
      trait(name, value) {
        const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value;
        const i = traits.findIndex(t => t[0] === name);
        if (i >= 0) traits[i][1] = String(v); else traits.push([name, String(v)]);
        return value;
      },
    };
    let copy = () => {};
    if (def.gl) {
      const g = sharedGl(S);
      c.gl = g;
      g.viewport(0, 0, S, S);
      g.clearColor(0, 0, 0, 1); g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
      // the piece drew into the bottom-left S x S of the shared canvas
      copy = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'copy'; ctx.drawImage(glc, 0, glc.height - S, S, S, 0, 0, S, S); ctx.globalCompositeOperation = 'source-over'; };
    } else c.ctx = ctx;
    let time = 0, f = 0;
    const frame = def.make(c);
    copy();
    return {
      def, hash, canvas, traits,
      // a frame function may say it repeats exactly after `period` seconds
      period: frame && frame.period || 0, periodSteps: frame && frame.periodSteps || 0,
      step(dt) {
        time += dt; f++;
        if (!frame) return;
        if (def.gl) sharedGl(S);
        frame(time, dt, f);
        copy();
      },
      get frames() { return f; },
    };
  }

  const fpsOf = def => def.fps || 30;
  const groups = [];
  const group = gr => groups.push(gr);
  window.Proto = { list, add, create, fpsOf, randomHash, hashFor, groups, group, Audio, makeInput, makeSound };
})();
