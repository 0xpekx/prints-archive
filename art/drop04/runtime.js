// ProtoRolls: a Loot piece's own traits, rolled from written tables before anything is drawn (roll first, then draw).
// The same header opens public/drop07/rolls.js (the site's copy: tables and rolls, no drawing; tools/build-rolls.cjs)
// and runtime.js (the lab). Plain code only: no canvas, no DOM, no Math.random, no Date, so it runs in Node and a Worker.
//   ProtoRolls.add(num, { traits, roll(hash) -> [[trait, value], ...], ...the piece's own tables for its art })
//   traits: { 'Grade': { values: { value: weight, ... } }    counted: rolled so its chance is exactly weight / sum
//             'Bag':   { look: true, values: { ... } }        shown with its exact chance, never counted
//             a trait some prints don't have: its values include '' (empty), the weight of the prints without it
//             'Packed': { list: true }                         a haul: each thing shown with its chance (items/NNN.js) and tier, never counted
//             joint: 'g1' on counted traits picked together from one joint table: each one's values are still its exact
//             chance, but two traits of one joint group are not independent (never multiply them) }
//   roll rows: the traits in the order the page lists them, then ['__tier|Trait|Thing', tier] for every haul thing
//   (Common, Core, Chase, Legend or Unique), then ['__pick', json]: the picks the art draws, so a print keeps drawing
//   its own traits. A host hides the rows that start with '__'.
var ProtoRolls = ProtoRolls || (function (Math, String) {   // the two as locals: a bare context looks globals up slowly
  'use strict';
  const R = {};
  // a stream of its own: sfc32 seeded from the hash and a salt ('roll' for the traits; a piece's art never uses it)
  function rng(hash, salt) {
    const s = String(hash) + '|' + String(salt), st = [];
    let h = 0x811c9dc5;
    for (let k = 0; k < 4; k++) {
      for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
      h = Math.imul(h ^ (k + 1) * 0x9e3779b1, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
      st.push(h >>> 0);
    }
    let [a, b, c, d] = st;
    const next = () => {
      const t = (a + b | 0) + d | 0;
      d = d + 1 | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = c << 21 | c >>> 11; c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 16; i++) next();
    return next;
  }
  // a weighted pick from { value: weight }: weight / sum exactly (to 1 in 2^32)
  // (each table's keys and weights are kept the first time, in for...in order: a joint of thousands of cells is slow to walk with for...in)
  const WP = new WeakMap();
  function wpick(r, values) {
    let c = WP.get(values);
    if (!c) { const ks = [], ws = []; let t = 0; for (const k in values) { ks.push(k); ws.push(values[k]); t += values[k]; } c = { ks, ws, t }; WP.set(values, c); }
    let x = r() * c.t, last = null;
    for (let i = 0; i < c.ks.length; i++) { const w = c.ws[i]; if (w > 0) last = c.ks[i]; if ((x -= w) < 0 && w > 0) return c.ks[i]; }
    return last;
  }
  // The usual roll (docs/ROLL-07.md). o = { natural(r, fix) -> { rows, ... }, direct: { trait: values }, joint: { 'a|b': w },
  // keys: [the joint's traits], fixOf(cell, fix) -> more fixes }. Each direct trait is picked from its own table and the
  // joint traits' cell from the joint table, on the roll's stream; then natural runs on fresh streams (hash|0, hash|1, ...)
  // with those fixed, until it rolls exactly that cell. The print keeps the stream that did it in __pick: { s, fix }.
  function byCell(hash, o) {
    const r = rng(hash, 'roll'), fix = {}, direct = o.direct || {}, keys = o.keys || [];
    for (const k in direct) fix[k] = wpick(r, direct[k]);
    const want = o.joint ? wpick(r, o.joint).split('|') : [];
    if (o.fixOf) Object.assign(fix, o.fixOf(want, fix));
    let n = null, s = '';
    for (let a = 0; a < 200000; a++) {
      s = hash + '|' + a; n = o.natural(rng(s, 'roll'), fix);
      const v = {}; for (const [k, x] of n.rows) v[k] = x;
      if (keys.every((k, i) => (v[k] || '') === want[i]) && Object.keys(direct).every(k => (v[k] || '') === fix[k])) return n.rows.concat([['__pick', JSON.stringify({ s, fix })]]);
    }
    return n.rows.concat([['__pick', JSON.stringify({ s, fix, capped: 1 })]]);   // never at 1 in 1000 or commoner: roll-check fails a capped roll
  }
  // trait i's own table from a joint table { 'a|b': w }: its exact chances
  function marginal(joint, i) { const o = {}; for (const k in joint) { const v = k.split('|')[i]; o[v] = (o[v] || 0) + joint[k]; } return o; }
  // the picks a piece's art draws: from the traits it was handed, or rolled from the hash when it was handed none
  function picks(c, num) {
    let rows = c.traits;
    if (!rows && num != null && R[num]) rows = c.traits = R[num].roll(c.hash);
    const row = rows && rows.find(t => t[0] === '__pick');
    return row ? JSON.parse(row[1]) : null;
  }
  // what natural rolled for the print it was handed (or rolled now from the hash): the state the art draws. Re-running a
  // piece's simulation in another browser engine can come out a last bit differently (Math.sin and the like), and so can
  // miss the handed traits or stop early with no state: then look for a stream that gives them as byCell would, and at
  // worst draw a whole plain roll rather than nothing (the trait list always shows the handed traits)
  const same = (rows, handed) => { const a = rows.filter(t => !t[0].startsWith('__')), b = handed.filter(t => !t[0].startsWith('__')); return a.length === b.length && a.every((t, i) => t[0] === b[i][0] && t[1] === b[i][1]); };
  function state(c, num) {
    const p = picks(c, num), d = R[num], n = d.natural(rng(p.s, 'roll'), p.fix);
    if (n && n.rows && same(n.rows, c.traits)) return n;
    const base = p.s.slice(0, p.s.lastIndexOf('|'));
    for (let a = 0; a < 300; a++) { const m = d.natural(rng(base + '|redraw' + a, 'roll'), p.fix); if (m && m.rows && same(m.rows, c.traits)) return m; }
    return d.natural(rng(p.s, 'roll'), {});
  }
  // the rows a piece names with c.trait: the shown traits, in order (not the '__' rows)
  const shown = c => (c.traits || []).filter(t => !t[0].startsWith('__'));
  return {
    add(num, def) { R[num] = def; },
    has: num => !!R[num],
    def: num => R[num],
    roll: (num, hash, deal) => R[num].roll(hash, deal),   // deal: what the site dealt this print, for a piece that deals (071: { card })
    rng, wpick, byCell, marginal, picks, state, shown,
  };
})(Math, String);

// The drop's gallery runtime. It is only the frame around the pieces: it gives a
// piece a canvas, its hash and the viewer's pointer, and runs the clock. It has
// no drawing helpers, no randomness and no palettes on purpose: every piece in
// pieces/ is written from scratch and shares no code with any other piece.
//
// A piece registers itself with Proto.add({
//   num: 1..500,            its place in the drop (the file is pieces/NNN.js)
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
// c = { size, hash, ctx | gl, input, sound, type, trait(name, value), traits, home }
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
//   type   the pixel typecase: c.type.face(name).draw(ctx, text, x, y, opts) (see below)
//   traits the print's rolled traits, [[trait, value], ...] (see ProtoRolls above): draw exactly these
//   home   true on the piece's own opening variation
//   grid   optional, set in make(): this variation's art grid when it differs from def.grid
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
      pushes: 0,   // every tap ever pushed (the runtime's quiet-when-untouched sound reads it)
      push(x, y) { this.pushes++; if (taps.length < 32) taps.push({ x, y }); },
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
  // A soft mix (the founder, 2026-10-29: nothing obnoxious, no static, the sounds nice): every hit but 'noise' is a pitched
  // tone (a click is a soft tick, a hat a small tink, a snare a wooden tock); 'noise' is only a low, eased-in whoosh; a square
  // or sawtooth always goes through a low-pass; at most 14 voices, at most 6 new sounds in any 0.12 s, the same sound at
  // most once in 60 ms, and a sound that comes back soon comes back a little different (level and a few cents).
  const Audio = (() => {
    let ac = null, master = null, voices = 0, noiseBuf = null;
    const MAX_VOICES = 14, BURST = 6, BURST_S = 0.12, SAME_S = 0.06, last = new Map();
    let recent = [], jit = 0x2545f491;
    const wob = () => { jit = (Math.imul(jit ^ jit >>> 15, 0x2c1b3c6d) + 0x6d2b79f5) >>> 0; return jit / 4294967296; };   // (sound only: never a piece's own stream)
    // may a sound with this key start at t, and how changed (null: dropped)
    function admit(key, t) {
      recent = recent.filter(x => x > ac.currentTime - 1);
      if (voices >= MAX_VOICES || recent.filter(x => Math.abs(x - t) < BURST_S).length >= BURST) return null;
      const prev = last.get(key);
      if (prev !== undefined && Math.abs(t - prev) < SAME_S) return null;
      recent.push(t); if (last.size > 200) last.clear(); last.set(key, t);
      return prev !== undefined && t - prev < 1.5 ? { vel: 0.88 + 0.2 * wob(), cents: (wob() - 0.5) * 14 } : { vel: 1, cents: 0 };
    }
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
      if (!ac) return;
      const t = ac.currentTime + (o.at || 0), dur = Math.min(4, o.dur || 0.25), wave = o.wave || 'triangle', hz = o.freq || 440 * Math.pow(2, (midi - 69) / 12);
      const w = admit(wave + Math.round(hz), t); if (!w) return;
      const vel = Math.min(1, o.vel ?? 0.5) * w.vel * (hz > 1100 ? 0.6 : 1);   // above about MIDI 85 only a softer sparkle
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = wave; osc.frequency.value = hz; osc.detune.value = w.cents;
      const buzzy = wave === 'square' || wave === 'sawtooth', cut = buzzy ? Math.min(o.cutoff || 2200, 3000) : o.cutoff;
      let node = osc;
      if (cut) { const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cut; osc.connect(f); node = f; }
      node.connect(gain); gain.connect(out(o.pan));
      env(gain, t, Math.max(0.005, o.attack || 0.008), vel * 0.25, dur);
      osc.start(t); osc.stop(t + dur + 0.05);
      voices++; osc.onended = () => voices--;
    }
    // the hits as tones: [from Hz, to Hz, glide s, wave, level, fade s]
    const TONE = { kick: [150, 40, 0.15, 'sine', 1.6, 0.3], blip: [880, 440, 0.06, 'sine', 0.7, 0.08], click: [1400, 980, 0.025, 'sine', 0.5, 0.035],
      hat: [2600, 2200, 0.04, 'sine', 0.25, 0.05], snare: [300, 180, 0.08, 'triangle', 0.7, 0.13] };
    function hit(kind = 'click', vel = 0.6, o = {}) {
      if (!ac) return;
      const t = ac.currentTime + (o.at || 0), w = admit(kind + (o.freq || ''), t); if (!w) return;
      const gain = ac.createGain(), v = Math.min(1, vel) * 0.35 * w.vel;
      gain.connect(out(o.pan));
      if (kind === 'noise') {
        // the one noise left: low-passed under 900 Hz and eased in, for a whoosh or a splash
        const src = ac.createBufferSource(), f = ac.createBiquadFilter(), len = Math.min(0.6, o.dur || 0.4);
        src.buffer = noiseBuf; f.type = 'lowpass'; f.frequency.value = Math.min(900, o.cutoff || 900);
        src.connect(f); f.connect(gain);
        env(gain, t, 0.02, v * 0.6, len);
        src.start(t); src.stop(t + len + 0.05); voices++; src.onended = () => voices--;
        return;
      }
      const T = TONE[kind] || TONE.click, f0 = o.freq && kind !== 'kick' ? o.freq : T[0], f1 = f0 * T[1] / T[0];
      const osc = ac.createOscillator();
      osc.type = T[3]; osc.detune.value = w.cents;
      osc.frequency.setValueAtTime(f0, t);
      osc.frequency.exponentialRampToValueAtTime(f1, t + T[2]);
      osc.connect(gain); env(gain, t, 0.005, v * T[4], T[5]);
      osc.start(t); osc.stop(t + T[5] + 0.1); voices++; osc.onended = () => voices--;
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
  // each Loot piece's level, measured so they all sit within a couple of LU of each other (scratch/sound, the Loot I sound pass)
  const VOLUME = {"1":1.349,"19":0.556,"31":0.292,"33":0.684,"52":1.333,"56":0.741,"61":0.55,"62":0.758,"66":0.882,"67":3.366,"68":1.819,"71":0.786,"75":1.497,"80":0.777,"87":0.296,"91":0.147,"92":0.437,"94":0.463,"95":1,"96":1.778,"98":0.676,"99":0.183,"100":0.385,"101":0.912,"102":0.201,"103":0.192,"105":1.259,"117":1.603,"118":2.089,"133":0.478,"141":1.059,"143":2.318,"151":1.23,"154":0.923,"156":2.041,"158":0.179,"162":1.567,"165":0.169,"166":2.722,"167":1.148,"168":2.541,"172":4,"173":0.933,"175":1.012,"177":3.734,"179":4,"180":3.566,"186":1.55,"189":0.21,"191":0.306,"192":4,"197":0.343,"222":1.799,"240":0.513,"243":3.525,"263":0.514,"264":4,"265":0.316,"291":1.059,"292":0.661,"295":1.496,"299":2.571,"301":1.23,"304":1.759,"308":3.02,"309":0.708,"314":1.679,"319":1.097,"336":0.768,"341":0.484,"343":0.226,"348":0.944,"386":1.059,"387":1.047,"482":0.224,"484":0.269,"489":3.444};
  // the Loot pieces whose notes wandered off key (many picked by arithmetic, a semitone at a time), each kept to one major
  // pentatonic so taps that overlap still sound good together: piece -> key (0 C ... 11 B); each note goes to the nearest step
  const KEY = {"31":0,"56":5,"62":0,"92":9,"101":2,"102":4,"141":0,"154":0,"158":0,"165":0,"166":8,"167":9,"173":0,"175":9,"191":0,"263":0,"301":4,"309":4,"343":3,"489":0};
  const inKey = (m, k) => { const pc = (((m - k) % 12) + 12) % 12, to = [0, 2, 4, 7, 9, 12].reduce((b, d) => Math.abs(d - pc) < Math.abs(b - pc) ? d : b, 0); return m + to - pc; };
  // a piece's own loudness (def.volume, else VOLUME, else 1): every sound it plays at that share of its level, so the pieces sit together
  function withVolume(s, k, key) {
    if (!(k > 0)) k = 1;
    if ((k === 1 && key == null) || s === SILENT) return s;
    const sc = o => Object.assign({}, o, { vel: Math.min(1, o && o.vel != null ? o.vel : 0.5) * k });
    return { get on() { return s.on; }, note(m, o) { s.note(key == null || (o && o.freq) ? m : inKey(Math.round(m), key), sc(o)); }, hit(kind, v, o) { s.hit(kind, Math.min(1, v == null ? 0.6 : v) * k, o); }, pcm(d, r, o) { s.pcm(d, r, sc(o)); } };
  }
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


  // ---------- the pixel typecase (Drop 07): letters set pixel for pixel ----------
  // fillText depends on the fonts on the viewer's machine and antialiases, so Drop 07
  // carries its own pixel fonts as bitmaps (vendored open fonts, see tools/build-pixelcase.cjs).
  // This is the gallery's typecase, like c.sound is its speaker: it sets letters and
  // nothing else. Draw on your low-resolution art canvas, in art pixels.
  //   const f = c.type.face('silk')     bytesized (3 px caps) tiny micro silk (5 px caps)
  //                                     jersey (10) gothic (12, blackletter) terminal (7)
  //   f.cap f.descent f.line            cap height, descender and a good line step, in pixels
  //   f.draw(ctx, text, x, y, o)        sets text standing on row y (the letters fill the rows above it; integers) in the
  //        current fillStyle; returns its width. o = { align: 'left'|'center'|'right',
  //        track: extra pixels between letters, scale: 1|2|3 (whole pixels), base: 'alphabetic'|'top' }
  //   f.width(text, o)                  its width in pixels
  //   f.layout(text, o)                 [{ ch, x, w }]: each letter's place, for per-letter work
  //   f.bitmap(ch)                      { w, h, top, adv, rows: ['0110', ...] }: one letter's pixels
  //                                     (top = rows above the baseline), for shimmer, outlines, wipes
  //   f.has(ch)                         whether the face has that letter
  //   f.wrap(text, width, o)            the text broken into lines no wider than width
  const PIXELCASE = {"bytesized":{"label":"Bytesized (OFL)","cap":3,"descent":1,"line":6,"g":{"0":[4,0,3,"a,d,d,a"],"1":[4,0,3,"e,a,a,f"],"2":[4,0,3,"e,b,c,f"],"3":[4,0,3,"f,a,9,f"],"4":[4,0,3,"d,d,f,9"],"5":[4,0,3,"f,e,9,f"],"6":[4,0,3,"c,f,d,f"],"7":[4,0,3,"f,9,a,a"],"8":[4,0,3,"b,f,d,f"],"9":[4,0,3,"f,d,f,9"],"!":[4,1,3,"3,3,2,3"],"\"":[4,0,3,"d,d"],"#":[4,0,3,"d,f,a,d"],"$":[4,0,3,"b,e,b,e"],"%":[4,0,3,"d,9,a,d"],"&":[4,0,3,"b,e,d,f"],"'":[4,1,3,"3,3"],"(":[4,1,3,"5,6,6,5"],")":[4,0,3,"6,5,5,6"],"*":[4,0,3,"f,a,d"],"+":[4,0,3,"a,f,a"],",":[4,0,1,"3,3"],"-":[4,0,2,"f"],".":[4,1,0,"3"],"/":[4,0,3,"9,a,a,c"],":":[4,0,3,"3,2,3"],";":[4,0,3,"3,2,3,3"],"<":[4,1,3,"5,6,5"],"=":[4,0,3,"f,8,f"],">":[4,0,3,"6,5,6"],"?":[4,0,3,"f,b,8,a"],"@":[4,0,3,"a,d,c,b"],"A":[4,0,3,"f,d,f,d"],"B":[4,0,3,"e,f,d,f"],"C":[4,0,3,"b,c,c,b"],"D":[4,0,3,"e,d,d,e"],"E":[4,0,3,"f,e,c,f"],"F":[4,0,3,"f,c,e,c"],"G":[4,0,3,"b,c,d,b"],"H":[4,0,3,"d,f,d,d"],"I":[4,0,3,"f,a,a,f"],"J":[4,0,3,"f,9,9,e"],"K":[4,0,3,"d,e,d,d"],"L":[4,0,3,"c,c,c,f"],"M":[4,0,3,"e,f,d,d"],"N":[4,0,3,"e,d,d,d"],"O":[4,0,3,"f,d,d,f"],"P":[4,0,3,"f,d,f,c"],"Q":[4,0,3,"f,d,e,9"],"R":[4,0,3,"f,d,e,d"],"S":[4,0,3,"b,e,9,e"],"T":[4,0,3,"f,a,a,a"],"U":[4,0,3,"d,d,d,b"],"V":[4,0,3,"d,d,d,a"],"W":[4,0,3,"d,d,f,b"],"X":[4,0,3,"d,a,d,d"],"Y":[4,0,3,"d,d,a,a"],"Z":[4,0,3,"f,a,c,f"],"[":[4,1,3,"7,6,6,7"],"\\":[4,0,3,"c,a,a,9"],"]":[4,0,3,"7,5,5,7"],"^":[4,0,3,"a,d"],"_":[4,0,0,"f"],"`":[4,0,3,"6,5"],"a":[4,0,2,"b,d,f"],"b":[4,0,3,"c,e,d,f"],"c":[4,0,2,"f,c,f"],"d":[4,0,3,"9,f,d,f"],"e":[4,0,2,"b,e,f"],"f":[4,0,3,"b,c,e,c"],"g":[4,0,2,"b,b,f"],"h":[4,0,3,"c,e,d,d"],"i":[4,0,3,"a,8,e,b"],"j":[4,0,3,"9,8,9,f"],"k":[4,0,3,"c,d,e,d"],"l":[4,0,3,"e,a,a,9"],"m":[4,0,2,"e,f,d"],"n":[4,0,2,"e,d,d"],"o":[4,0,2,"f,d,f"],"p":[4,0,2,"f,f,c"],"q":[4,0,2,"f,f,9"],"r":[4,0,2,"f,c,c"],"s":[4,0,2,"b,a,e"],"t":[4,0,3,"c,e,c,b"],"u":[4,0,2,"d,d,b"],"v":[4,0,2,"d,d,a"],"w":[4,0,2,"d,f,b"],"x":[4,0,2,"d,a,d"],"y":[4,0,2,"d,b,e"],"z":[4,0,2,"e,a,b"],"{":[4,0,3,"9,e,a,9"],"|":[4,1,3,"3,3,3,3"],"}":[4,0,3,"c,b,a,c"],"~":[4,0,3,"b,e"],"‘":[4,0,3,"5,6"],"’":[4,1,3,"5,6"],"“":[4,0,3,"d,d"],"”":[4,0,3,"d,d"],"–":[4,0,2,"7"],"—":[4,0,2,"f"],"…":[4,0,0,"d"],"•":[4,0,2,"7,7"],"·":[4,1,1,"3"],"×":[4,0,3,"d,a,d"],"°":[4,0,3,"7,7"],"£":[4,0,3,"b,e,c,f"],"¢":[4,0,3,"a,f,c,f"],"€":[4,0,3,"b,e,e,b"],"é":[4,0,5,"9,a,8,b,e,f"],"è":[4,0,5,"c,a,8,b,e,f"],"ê":[4,0,5,"a,d,8,b,e,f"],"ë":[4,0,4,"d,8,b,e,f"],"á":[4,0,5,"9,a,8,b,d,f"],"à":[4,0,5,"c,a,8,b,d,f"],"â":[4,0,5,"a,d,8,b,d,f"],"ä":[4,0,4,"d,8,b,d,f"],"í":[4,0,4,"9,a,8,e,b"],"ì":[4,0,4,"c,a,8,e,b"],"î":[4,0,4,"a,d,8,e,b"],"ï":[4,0,3,"d,8,e,b"],"ó":[4,0,5,"9,a,8,f,d,f"],"ò":[4,0,5,"c,a,8,f,d,f"],"ô":[4,0,5,"a,d,8,f,d,f"],"ö":[4,0,4,"d,8,f,d,f"],"ú":[4,0,5,"9,a,8,d,d,b"],"ù":[4,0,5,"c,a,8,d,d,b"],"û":[4,0,5,"a,d,8,d,d,b"],"ü":[4,0,4,"d,8,d,d,b"],"ñ":[4,0,5,"b,e,8,e,d,d"],"ç":[4,0,2,"f,c,f,9,a"],"æ":[4,0,2,"b,f,f"],"œ":[4,0,2,"f,e,f"],"ø":[4,0,2,"b,f,e"],"å":[4,0,4,"a,8,b,d,f"],"ß":[4,0,3,"e,f,d,e"]," ":[4,0,0,""]}},"tiny":{"label":"Tiny5 (OFL)","cap":5,"descent":1,"line":8,"g":{"0":[4,0,5,"a,d,d,d,a"],"1":[4,0,5,"5,7,5,5,5"],"2":[4,0,5,"e,9,a,c,f"],"3":[4,0,5,"e,9,a,9,e"],"4":[4,0,5,"9,b,d,f,9"],"5":[4,0,5,"f,c,e,9,e"],"6":[4,0,5,"b,c,e,d,a"],"7":[4,0,5,"f,9,a,a,a"],"8":[4,0,5,"a,d,a,d,a"],"9":[4,0,5,"a,d,b,9,e"],"!":[2,0,5,"3,3,3,2,3"],"\"":[4,0,5,"d,d"],"#":[6,0,5,"16,1r,16,1r,16"],"$":[4,0,5,"a,b,e,9,e,a"],"%":[5,0,5,"p,i,k,p"],"&":[5,0,5,"k,q,k,q,l"],"'":[2,0,5,"3,3"],"(":[3,0,5,"5,6,6,6,5"],")":[3,0,5,"6,5,5,5,6"],"*":[4,0,5,"a,f,a,d"],"+":[4,0,4,"a,f,a"],",":[3,0,1,"5,6"],"-":[4,0,3,"f"],".":[2,0,1,"3"],"/":[3,0,5,"5,5,6,6,6"],":":[2,0,4,"3,2,2,3"],";":[3,0,4,"5,4,4,5,6"],"<":[4,0,5,"9,a,c,a,9"],"=":[4,0,4,"f,8,f"],">":[4,0,5,"c,a,9,a,c"],"?":[4,0,5,"e,9,a,8,a"],"@":[5,0,5,"m,p,r,o,m"],"A":[5,0,5,"m,p,v,p,p"],"B":[5,0,5,"u,p,u,p,u"],"C":[5,0,5,"m,p,o,p,m"],"D":[5,0,5,"u,p,p,p,u"],"E":[5,0,5,"v,o,u,o,v"],"F":[5,0,5,"v,o,u,o,o"],"G":[5,0,5,"n,o,r,p,n"],"H":[5,0,5,"p,p,v,p,p"],"I":[2,0,5,"3,3,3,3,3"],"J":[4,0,5,"9,9,9,d,a"],"K":[5,0,5,"p,q,s,q,p"],"L":[4,0,5,"c,c,c,c,f"],"M":[6,0,5,"1d,1n,1h,1d,1d"],"N":[5,0,5,"p,t,r,p,p"],"O":[5,0,5,"m,p,p,p,m"],"P":[5,0,5,"u,p,u,o,o"],"Q":[5,0,5,"m,p,p,q,l"],"R":[5,0,5,"u,p,u,p,p"],"S":[5,0,5,"n,o,m,h,u"],"T":[4,0,5,"f,a,a,a,a"],"U":[5,0,5,"p,p,p,p,m"],"V":[4,0,5,"d,d,d,a,a"],"W":[6,0,5,"1h,1h,1h,16,16"],"X":[4,0,5,"d,d,a,d,d"],"Y":[4,0,5,"d,d,a,a,a"],"Z":[4,0,5,"f,9,a,c,f"],"[":[3,0,5,"7,6,6,6,7"],"\\":[3,0,5,"6,6,5,5,5"],"]":[3,0,5,"7,5,5,5,7"],"^":[4,0,5,"a,d"],"_":[4,0,1,"f"],"`":[3,0,5,"6,5"],"a":[4,0,4,"b,d,d,b"],"b":[4,0,5,"c,e,d,d,e"],"c":[4,0,4,"b,c,c,b"],"d":[4,0,5,"9,b,d,d,b"],"e":[4,0,4,"a,f,c,b"],"f":[3,0,5,"5,6,7,6,6"],"g":[4,0,4,"b,d,d,b,e"],"h":[4,0,5,"c,e,d,d,d"],"i":[2,0,6,"3,2,3,3,3,3"],"j":[2,0,6,"3,2,3,3,3,3,3"],"k":[4,0,5,"c,d,e,d,d"],"l":[2,0,5,"3,3,3,3,3"],"m":[6,0,4,"1q,1h,1h,1h"],"n":[4,0,4,"e,d,d,d"],"o":[4,0,4,"a,d,d,a"],"p":[4,0,4,"e,d,d,e,c"],"q":[4,0,4,"b,d,d,b,9"],"r":[3,0,4,"7,6,6,6"],"s":[4,0,4,"b,e,9,e"],"t":[3,0,5,"6,7,6,6,5"],"u":[4,0,4,"d,d,d,b"],"v":[4,0,4,"d,d,a,a"],"w":[6,0,4,"1h,1h,16,16"],"x":[4,0,4,"d,a,a,d"],"y":[4,0,4,"d,d,d,a,c"],"z":[4,0,4,"f,a,c,f"],"{":[4,0,5,"b,a,c,a,b"],"|":[2,0,5,"3,3,3,3,3"],"}":[4,0,5,"e,a,9,a,e"],"~":[3,0,3,"7"],"‘":[2,0,6,"3,3"],"’":[2,0,6,"3,3"],"“":[4,0,6,"d,d"],"”":[4,0,6,"d,d"],"–":[4,0,3,"f"],"—":[6,0,3,"1r"],"…":[6,0,1,"1h"],"•":[3,0,4,"7,7"],"·":[2,0,3,"3"],"×":[4,0,4,"d,a,d"],"°":[4,0,5,"a,d,a"],"½":[10,0,5,"i8,pi,ip,iq,ef"],"¼":[9,0,5,"94,cp,9f,9j,75"],"¾":[10,0,5,"qw,i1,gj,pj,e9"],"£":[5,0,5,"i,l,u,k,v"],"¢":[4,0,5,"a,b,c,b,a"],"€":[5,0,5,"m,p,s,p,m"],"é":[4,0,7,"9,a,8,a,f,c,b"],"è":[4,0,7,"c,a,8,a,f,c,b"],"ê":[4,0,7,"a,d,8,a,f,c,b"],"ë":[4,0,6,"d,8,a,f,c,b"],"á":[4,0,7,"9,a,8,b,d,d,b"],"à":[4,0,7,"c,a,8,b,d,d,b"],"â":[4,0,7,"a,d,8,b,d,d,b"],"ä":[4,0,6,"d,8,b,d,d,b"],"í":[2,0,7,"5,6,4,6,6,6,6"],"ì":[2,-1,7,"6,5,4,5,5,5,5"],"î":[2,-1,7,"a,d,8,a,a,a,a"],"ï":[2,-1,6,"d,8,a,a,a,a"],"ó":[4,0,7,"9,a,8,a,d,d,a"],"ò":[4,0,7,"c,a,8,a,d,d,a"],"ô":[4,0,7,"a,d,8,a,d,d,a"],"ö":[4,0,6,"d,8,a,d,d,a"],"ú":[4,0,7,"9,a,8,d,d,d,b"],"ù":[4,0,7,"c,a,8,d,d,d,b"],"û":[4,0,7,"a,d,8,d,d,d,b"],"ü":[4,0,6,"d,8,d,d,d,b"],"ñ":[4,0,6,"e,8,e,d,d,d"],"ç":[4,0,4,"b,c,c,b,a"],"æ":[6,0,4,"1a,1j,1g,1b"],"œ":[6,0,4,"16,1j,1g,17"],"ø":[4,0,4,"a,f,d,a"],"å":[4,0,7,"a,d,a,b,d,d,b"],"ß":[5,0,5,"m,p,q,p,q"]," ":[2,0,0,""]}},"silk":{"label":"Silkscreen (OFL)","cap":5,"descent":1,"line":8,"g":{"0":[6,1,5,"m,p,p,p,m"],"1":[5,1,5,"e,a,a,a,f"],"2":[6,1,5,"u,h,m,o,v"],"3":[6,1,5,"u,h,m,h,u"],"4":[6,1,5,"q,q,v,i,i"],"5":[6,1,5,"v,o,u,h,u"],"6":[6,1,5,"m,o,u,p,m"],"7":[6,1,5,"v,h,i,k,k"],"8":[6,1,5,"m,p,m,p,m"],"9":[6,1,5,"m,p,n,h,m"],"!":[3,1,5,"3,3,3,2,3"],"\"":[5,1,5,"d,d"],"#":[7,1,5,"16,1r,16,1r,16"],"$":[6,1,6,"i,n,o,m,h,u,k"],"%":[7,1,5,"1m,1m,10,17,17"],"&":[6,1,6,"i,n,o,m,o,n,i"],"'":[3,1,5,"3,3"],"(":[4,1,5,"5,6,6,6,5"],")":[4,1,5,"6,5,5,5,6"],"*":[7,1,5,"10,1h,1a,1h,10"],"+":[7,1,5,"10,10,1r,10,10"],",":[4,1,1,"5,6"],"-":[5,1,3,"f"],".":[3,1,1,"3"],"/":[5,1,5,"9,9,a,c,c"],":":[3,1,4,"3,2,3"],";":[4,1,4,"5,4,5,6"],"<":[5,1,5,"9,a,c,a,9"],"=":[5,1,4,"f,8,f"],">":[5,1,5,"c,a,9,a,c"],"?":[6,1,5,"u,h,m,g,k"],"@":[7,1,5,"1a,1h,1i,1c,1a"],"A":[6,1,5,"m,p,v,p,p"],"B":[6,1,5,"u,p,v,p,u"],"C":[6,1,5,"m,p,o,p,m"],"D":[6,1,5,"u,p,p,p,u"],"E":[5,1,5,"f,c,f,c,f"],"F":[5,1,5,"f,c,f,c,c"],"G":[6,1,5,"n,o,r,p,m"],"H":[6,1,5,"p,p,v,p,p"],"I":[3,1,5,"3,3,3,3,3"],"J":[6,1,5,"h,h,h,p,m"],"K":[6,1,5,"p,q,s,q,p"],"L":[5,1,5,"c,c,c,c,f"],"M":[7,1,5,"1d,1n,1h,1d,1d"],"N":[7,1,5,"1d,1l,1h,1f,1d"],"O":[6,1,5,"m,p,p,p,m"],"P":[6,1,5,"u,p,u,o,o"],"Q":[6,1,5,"m,p,p,p,m,h"],"R":[6,1,5,"u,p,u,q,p"],"S":[6,1,5,"n,o,m,h,u"],"T":[5,1,5,"f,a,a,a,a"],"U":[6,1,5,"p,p,p,p,m"],"V":[7,1,5,"1d,1d,16,16,10"],"W":[7,1,5,"1d,1h,1h,1h,16"],"X":[7,1,5,"1d,16,10,16,1d"],"Y":[7,1,5,"1d,16,10,10,10"],"Z":[5,1,5,"f,9,a,c,f"],"[":[4,1,5,"7,6,6,6,7"],"\\":[5,1,5,"c,c,a,9,9"],"]":[4,1,5,"7,5,5,5,7"],"^":[5,1,6,"a,d"],"_":[6,1,0,"v"],"`":[4,1,8,"6,5"],"a":[6,1,5,"m,p,v,p,p"],"b":[6,1,5,"u,p,v,p,u"],"c":[6,1,5,"m,p,o,p,m"],"d":[6,1,5,"u,p,p,p,u"],"e":[5,1,5,"f,c,f,c,f"],"f":[5,1,5,"f,c,f,c,c"],"g":[6,1,5,"n,o,r,p,m"],"h":[6,1,5,"p,p,v,p,p"],"i":[3,1,5,"3,3,3,3,3"],"j":[6,1,5,"h,h,h,p,m"],"k":[6,1,5,"p,q,s,q,p"],"l":[5,1,5,"c,c,c,c,f"],"m":[7,1,5,"1d,1n,1h,1d,1d"],"n":[7,1,5,"1d,1l,1h,1f,1d"],"o":[6,1,5,"m,p,p,p,m"],"p":[6,1,5,"u,p,u,o,o"],"q":[6,1,5,"m,p,p,p,m,h"],"r":[6,1,5,"u,p,u,q,p"],"s":[6,1,5,"n,o,m,h,u"],"t":[5,1,5,"f,a,a,a,a"],"u":[6,1,5,"p,p,p,p,m"],"v":[7,1,5,"1d,1d,16,16,10"],"w":[7,1,5,"1d,1h,1h,1h,16"],"x":[7,1,5,"1d,16,10,16,1d"],"y":[7,1,5,"1d,16,10,10,10"],"z":[5,1,5,"f,9,a,c,f"],"{":[5,1,5,"b,a,c,a,b"],"|":[3,1,6,"3,3,3,3,3,3,3"],"}":[5,1,5,"e,a,9,a,e"],"~":[6,1,5,"l,q"],"‘":[3,1,5,"3,3"],"’":[3,1,5,"3,3"],"“":[5,1,5,"d,d"],"”":[5,1,5,"d,d"],"–":[6,1,3,"v"],"—":[8,1,3,"3j"],"…":[7,1,1,"1h"],"•":[3,1,3,"3"],"·":[3,1,3,"3"],"×":[5,1,4,"d,a,d"],"°":[5,1,5,"a,d,a"],"½":[9,1,5,"5k,5q,5t,4i,4n"],"¼":[9,1,5,"5k,5k,5x,4n,4h"],"¾":[10,1,5,"co,a0,8l,dj,81"],"£":[6,1,5,"j,i,u,k,v"],"¢":[5,1,5,"a,f,c,f,a"],"€":[7,1,5,"12,15,1o,15,12"],"é":[5,1,8,"9,a,8,f,c,f,c,f"],"è":[5,1,8,"c,a,8,f,c,f,c,f"],"ê":[5,1,8,"a,d,8,f,c,f,c,f"],"ë":[5,1,7,"d,8,f,c,f,c,f"],"á":[6,1,8,"i,k,g,m,p,v,p,p"],"à":[6,1,8,"k,i,g,m,p,v,p,p"],"â":[6,1,8,"m,p,g,m,p,v,p,p"],"ä":[6,1,7,"p,g,m,p,v,p,p"],"í":[3,1,8,"5,6,4,6,6,6,6,6"],"ì":[3,0,8,"6,5,4,5,5,5,5,5"],"î":[3,0,8,"a,d,8,a,a,a,a,a"],"ï":[3,0,7,"d,8,a,a,a,a,a"],"ó":[6,1,8,"i,k,g,m,p,p,p,m"],"ò":[6,1,8,"k,i,g,m,p,p,p,m"],"ô":[6,1,8,"m,p,g,m,p,p,p,m"],"ö":[6,1,7,"p,g,m,p,p,p,m"],"ú":[6,1,8,"i,k,g,p,p,p,p,m"],"ù":[6,1,8,"k,i,g,p,p,p,p,m"],"û":[6,1,8,"m,p,g,p,p,p,p,m"],"ü":[6,1,7,"p,g,p,p,p,p,m"],"ñ":[7,1,8,"11,16,w,1d,1l,1h,1f,1d"],"ç":[6,1,5,"m,p,o,p,m,k,o"],"æ":[7,1,5,"1b,1g,1r,1g,1j"],"œ":[7,1,5,"1b,1g,1j,1g,1b"],"ø":[7,1,5,"1a,1f,1h,1l,1a"],"å":[6,1,8,"p,m,g,m,p,v,p,p"],"ß":[6,1,5,"m,p,q,p,q"]," ":[4,0,0,""]}},"micro":{"label":"Micro 5 (OFL)","cap":5,"descent":1,"line":8,"g":{"0":[4,0,5,"f,d,d,d,f"],"1":[3,0,5,"7,5,5,5,5"],"2":[4,0,5,"f,9,f,c,f"],"3":[4,0,5,"f,9,b,9,f"],"4":[4,0,5,"d,d,f,9,9"],"5":[4,0,5,"f,c,f,9,f"],"6":[4,0,5,"f,c,f,d,f"],"7":[4,0,5,"f,9,9,a,a"],"8":[4,0,5,"f,d,f,d,f"],"9":[4,0,5,"f,d,f,9,f"],"!":[2,0,5,"3,3,3,2,3"],"\"":[4,0,5,"d,d"],"#":[6,0,5,"11,1r,16,1r,1g"],"$":[5,0,6,"i,v,q,v,l,v,k"],"%":[6,0,5,"1d,y,10,14,1d"],"&":[6,0,6,"10,1b,1g,1a,1g,1b,10"],"'":[2,0,5,"3,3"],"(":[3,0,5,"5,6,6,6,6,5"],")":[3,0,5,"6,5,5,5,5,6"],"*":[4,0,5,"d,a,d"],"+":[4,0,4,"a,f,a"],",":[2,0,1,"3,3"],"-":[4,0,3,"f"],".":[2,0,1,"3"],"/":[4,0,5,"9,9,a,a,c,c"],":":[2,0,4,"3,2,2,3"],";":[2,0,4,"3,2,2,3,3"],"<":[4,0,4,"b,c,b"],"=":[4,0,4,"f,8,f"],">":[4,0,4,"e,9,e"],"?":[4,0,5,"f,9,a,8,a"],"@":[7,0,6,"3j,2p,32,2y,33,2o,3g"],"A":[4,0,5,"a,d,f,d,d"],"B":[4,0,5,"f,d,e,d,f"],"C":[3,0,5,"7,6,6,6,7"],"D":[4,0,5,"e,d,d,d,e"],"E":[4,0,5,"f,c,e,c,f"],"F":[4,0,5,"f,c,e,c,c"],"G":[4,0,5,"f,c,d,d,e"],"H":[4,0,5,"d,d,f,d,d"],"I":[2,0,5,"3,3,3,3,3"],"J":[3,0,5,"5,5,5,5,6"],"K":[4,0,5,"d,d,e,d,d"],"L":[3,0,5,"6,6,6,6,7"],"M":[6,0,5,"1m,1h,1h,1h,1h"],"N":[4,0,5,"e,d,d,d,d"],"O":[4,0,5,"f,d,d,d,f"],"P":[4,0,5,"f,d,f,c,c"],"Q":[4,0,5,"f,d,d,d,d,a"],"R":[4,0,5,"f,d,e,d,d"],"S":[4,0,5,"f,c,f,9,f"],"T":[4,0,5,"f,a,a,a,a"],"U":[4,0,5,"d,d,d,d,f"],"V":[4,0,5,"d,d,d,d,a"],"W":[6,0,5,"1h,1h,1h,1h,16"],"X":[4,0,5,"d,d,a,d,d"],"Y":[4,0,5,"d,d,d,a,a"],"Z":[4,0,5,"f,9,a,c,f"],"[":[3,0,5,"7,6,6,6,6,7"],"\\":[4,0,5,"c,c,a,a,9,9"],"]":[3,0,5,"7,5,5,5,5,7"],"^":[4,0,5,"a,d"],"_":[5,0,0,"v"],"`":[2,0,7,"6,5"],"a":[4,0,4,"b,d,d,b"],"b":[4,0,5,"c,e,d,d,e"],"c":[4,0,4,"b,c,c,b"],"d":[4,0,5,"9,b,d,d,b"],"e":[4,0,4,"a,d,f,c,a"],"f":[3,0,5,"5,6,7,6,6"],"g":[4,0,4,"b,d,d,9,f"],"h":[4,0,5,"c,e,d,d,d"],"i":[2,0,5,"3,2,3,3,3"],"j":[2,-1,5,"5,4,5,5,5,6"],"k":[4,0,5,"c,d,e,d,d"],"l":[2,0,5,"3,3,3,3,3"],"m":[6,0,4,"1m,1h,1h,1h"],"n":[4,0,4,"e,d,d,d"],"o":[4,0,4,"a,d,d,a"],"p":[4,0,4,"e,d,d,e,c"],"q":[4,0,4,"b,d,d,b,9"],"r":[3,0,4,"7,6,6,6"],"s":[4,0,4,"f,c,9,f"],"t":[3,0,5,"6,7,6,6,7"],"u":[4,0,4,"d,d,d,b"],"v":[4,0,4,"d,d,d,a"],"w":[6,0,4,"1h,1h,1h,16"],"x":[4,0,4,"d,a,a,d"],"y":[4,0,4,"d,d,d,a,c"],"z":[5,0,4,"t,i,k,r"],"{":[4,0,5,"b,a,c,c,a,b"],"|":[2,0,5,"3,3,3,3,3,3"],"}":[4,0,5,"e,a,9,9,a,e"],"~":[5,0,4,"t,r"],"‘":[3,0,5,"5,6"],"’":[3,0,5,"6,5"],"“":[5,0,5,"l,q"],"”":[5,0,5,"q,l"],"–":[5,0,3,"v"],"—":[6,0,3,"1r"],"…":[6,0,1,"1h"],"•":[3,0,4,"7,7"],"·":[2,0,3,"3"],"×":[4,0,4,"d,a,d"],"°":[4,0,6,"a,d,a"],"£":[5,0,5,"i,k,u,k,v"],"¢":[5,0,5,"i,n,q,q,n,i"],"€":[5,0,5,"j,k,u,k,j"],"é":[4,0,7,"a,c,8,a,d,f,c,a"],"è":[4,0,7,"c,a,8,a,d,f,c,a"],"ê":[4,0,7,"a,d,8,a,d,f,c,a"],"ë":[4,0,6,"d,8,a,d,f,c,a"],"á":[4,0,7,"a,c,8,b,d,d,b"],"à":[4,0,7,"c,a,8,b,d,d,b"],"â":[4,0,7,"a,d,8,b,d,d,b"],"ä":[4,0,6,"d,8,b,d,d,b"],"í":[2,0,6,"5,6,4,6,6,6"],"ì":[2,-1,6,"6,5,4,5,5,5"],"î":[2,-1,6,"a,d,8,a,a,a"],"ï":[2,-1,5,"d,8,a,a,a"],"ó":[4,0,7,"a,c,8,a,d,d,a"],"ò":[4,0,7,"c,a,8,a,d,d,a"],"ô":[4,0,7,"a,d,8,a,d,d,a"],"ö":[4,0,6,"d,8,a,d,d,a"],"ú":[4,0,7,"a,c,8,d,d,d,b"],"ù":[4,0,7,"c,a,8,d,d,d,b"],"û":[4,0,7,"a,d,8,d,d,d,b"],"ü":[4,0,6,"d,8,d,d,d,b"],"ñ":[4,-1,7,"t,r,g,m,l,l,l"],"ç":[4,0,4,"b,c,c,b,a,9,a"],"æ":[6,0,4,"1a,1h,1j,18,y"],"œ":[6,0,4,"16,1h,1j,18,y"],"ø":[6,0,4,"11,16,16,1g"],"å":[4,0,8,"a,d,a,8,b,d,d,b"],"ß":[5,0,5,"m,p,q,p,q"]," ":[3,0,0,""]}},"jersey":{"label":"Jersey 10 (OFL)","cap":10,"descent":2,"line":14,"g":{"0":[7,0,10,"2m,3j,37,37,37,37,37,37,3j,2m"],"1":[4,0,10,"f,f,b,b,b,b,b,b,b,b"],"2":[8,0,10,"5a,73,6b,3r,3y,4c,54,6o,73,73"],"3":[8,0,10,"5a,73,6b,3n,4e,4e,3n,6b,73,5a"],"4":[7,0,10,"1v,1z,27,2j,37,37,3j,3j,1v,1v"],"5":[7,0,10,"3j,3j,34,34,3i,2n,1v,37,3j,2m"],"6":[8,0,10,"5a,73,6b,68,72,73,6b,6b,73,5a"],"7":[7,0,10,"3j,3j,1v,1v,1z,26,26,24,24,24"],"8":[8,0,10,"5a,73,6b,6b,5a,73,6b,6b,73,5a"],"9":[8,0,10,"5a,73,6b,6b,73,5b,3n,6b,73,5a"],"!":[3,0,10,"7,7,7,7,7,7,7,4,7,7"],"\"":[6,0,10,"1n,1n,1n"],"#":[12,0,10,"1nq,1nq,1z3,1qk,1qk,1w8,1w8,35o,27k,27k"],"$":[8,0,11,"3s,5a,73,6j,6g,72,5b,3v,6j,73,5a,3s"],"%":[12,0,10,"1s2,29y,2x8,2ag,1tc,1no,1qm,1wb,26m,1z8"],"&":[11,0,10,"15s,1kg,1f4,1f4,15s,1km,1fi,1ek,1ku,16f"],"'":[3,0,10,"7,7,7"],"(":[5,0,10,"j,m,s,s,s,s,s,s,s,s,m,j"],")":[5,0,10,"s,m,j,j,j,j,j,j,j,j,m,s"],"*":[6,0,10,"10,1h,10,16"],"+":[7,0,8,"24,24,3j,3j,24,24"],",":[3,0,2,"7,7,5,6"],"-":[7,0,6,"3j,3j"],".":[3,0,2,"7,7"],"/":[6,0,10,"z,z,z,12,12,12,18,18,18,1k,1k,1k"],":":[3,0,8,"7,7,4,4,4,4,7,7"],";":[3,0,8,"7,7,4,4,4,4,7,7,5,6"],"<":[9,0,9,"7b,7z,ak,ds,dc,ds,ak,7z,7b"],"=":[7,0,7,"3j,3j,1s,3j,3j"],">":[9,0,9,"dc,e0,8u,7j,7b,7j,8u,e0,dc"],"?":[7,0,10,"2m,3j,37,1z,26,24,24,1s,24,24"],"@":[12,0,10,"1z0,2da,2yv,2uz,2yj,2xn,2yj,2um,2yo,2d8,1yw"],"A":[8,0,10,"3s,4c,5a,6v,6b,6b,73,73,6b,6b"],"B":[8,0,10,"72,73,6b,6b,72,73,6b,6b,73,72"],"C":[8,0,10,"5a,73,6r,68,68,68,68,6r,73,5a"],"D":[8,0,10,"72,73,6f,6b,6b,6b,6b,6f,73,72"],"E":[7,0,10,"3j,3j,34,34,3i,3i,34,34,3j,3j"],"F":[7,0,10,"3j,3j,34,34,3i,3i,34,34,34,34"],"G":[8,0,10,"5a,73,6r,68,6n,6n,6b,6r,73,5a"],"H":[8,0,10,"6b,6b,6b,6b,73,73,6b,6b,6b,6b"],"I":[3,0,10,"7,7,7,7,7,7,7,7,7,7"],"J":[7,0,10,"1v,1v,1v,1v,1v,1v,1v,3b,3j,2m"],"K":[7,0,10,"37,37,37,3a,3g,3i,3b,37,37,37"],"L":[6,0,10,"1k,1k,1k,1k,1k,1k,1k,1k,1r,1r"],"M":[10,0,10,"oz,qv,rz,sf,qj,pf,oz,oz,oz,oz"],"N":[9,0,10,"df,df,dv,dv,e3,d7,db,cv,cv,cn"],"O":[8,0,10,"5a,73,6v,6b,6b,6b,6b,6v,73,5a"],"P":[8,0,10,"72,73,6b,6b,6b,73,72,68,68,68"],"Q":[8,0,10,"5a,73,6v,6b,6b,6b,6b,6v,73,58,3z,3r"],"R":[8,0,10,"72,73,6b,6b,6b,72,73,6b,6b,6b"],"S":[8,0,10,"5a,73,6b,68,72,5b,3n,6b,73,5a"],"T":[7,0,10,"3j,3j,24,24,24,24,24,24,24,24"],"U":[8,0,10,"6b,6b,6b,6b,6b,6b,6b,6v,73,5a"],"V":[8,0,10,"6b,6b,6b,6b,6b,6b,6v,5a,4c,3s"],"W":[11,0,10,"1f7,1f7,1f7,1f7,1f7,1f7,1f7,1kv,15a,w4"],"X":[8,0,10,"6b,6b,6v,5a,4c,5a,6v,6b,6b,6b"],"Y":[9,0,10,"cj,cj,cj,cj,dj,am,8s,7s,7s,7s"],"Z":[9,0,10,"e7,e7,7b,7i,7w,8o,a8,dc,e7,e7"],"[":[5,0,10,"v,s,s,s,s,s,s,s,s,s,v"],"\\":[6,0,10,"1k,1k,1k,18,18,18,12,12,12,z,z,z"],"]":[5,0,10,"v,j,j,j,j,j,j,j,j,j,v"],"^":[8,0,9,"4c,5a,6v,6b"],"_":[8,0,0,"73,73"],"`":[3,0,12,"c,e,b"],"a":[8,0,8,"5a,73,3n,5b,73,6b,73,57"],"b":[8,0,10,"68,68,6m,73,6b,6b,6b,6b,73,72"],"c":[8,0,8,"5a,73,6b,68,68,6b,73,5a"],"d":[8,0,10,"3n,3n,5b,73,6b,6b,6b,6b,73,57"],"e":[8,0,8,"5a,73,6b,73,73,68,73,5a"],"f":[6,0,10,"13,1b,18,1r,1r,18,18,18,18,18"],"g":[8,0,8,"5b,73,6b,6b,6b,73,57,3n,73,5a"],"h":[8,0,10,"68,68,6m,73,6b,6b,6b,6b,6b,6b"],"i":[3,0,10,"7,7,4,7,7,7,7,7,7,7"],"j":[4,0,10,"b,b,8,b,b,b,b,b,b,b,f,e"],"k":[7,0,10,"34,34,37,37,3a,3g,3a,37,37,37"],"l":[3,0,10,"7,7,7,7,7,7,7,7,7,7"],"m":[11,0,8,"1gm,1kv,1f7,1f7,1f7,1f7,1f7,1f7"],"n":[8,0,8,"6m,73,6b,6b,6b,6b,6b,6b"],"o":[8,0,8,"5a,73,6b,6b,6b,6b,73,5a"],"p":[8,0,8,"6m,73,6b,6b,6b,6b,73,72,68,68"],"q":[8,0,8,"5b,73,6b,6b,6b,6b,73,57,3n,3n"],"r":[7,0,8,"3a,3j,3e,34,34,34,34,34"],"s":[7,0,8,"2m,3j,34,3i,2n,1v,3j,2m"],"t":[6,0,10,"10,18,18,1r,1r,18,18,18,1b,13"],"u":[8,0,8,"6b,6b,6b,6b,6b,6b,73,57"],"v":[8,0,8,"6b,6b,6b,6b,6v,5a,4c,3s"],"w":[11,0,8,"1f7,1f7,1f7,1f7,1f7,1iv,16m,y4"],"x":[8,0,8,"6b,6v,5a,4c,5a,6v,6b,6b"],"y":[7,0,8,"37,37,37,37,3f,2n,26,2k,3c,34"],"z":[8,0,8,"73,73,3r,3y,4c,54,73,73"],"{":[5,0,10,"j,m,m,m,m,s,s,m,m,m,m,j"],"|":[3,0,10,"7,7,7,7,7,7,7,7,7,7,7,7"],"}":[5,0,10,"s,m,m,m,m,j,j,m,m,m,m,s"],"~":[8,0,7,"55,73,73,5q"],"‘":[3,0,10,"5,6,7,7"],"’":[3,0,10,"7,7,5,6"],"“":[6,0,10,"15,1e,1n,1n"],"”":[6,0,10,"1n,1n,15,1e"],"–":[8,0,6,"73,73"],"—":[11,0,6,"1kv,1kv"],"…":[9,0,2,"d7,d7"],"•":[4,0,7,"f,f,f"],"·":[3,0,6,"7,7"],"×":[8,0,8,"4i,6v,5a,4c,5a,6v,4i"],"°":[7,0,12,"24,2m,37,37,2m,24"],"£":[7,0,10,"26,2n,2j,2g,2g,3i,2g,34,3j,3j"],"¢":[8,0,9,"3s,5a,73,6j,6g,6j,73,5a,3s"],"€":[9,0,9,"8u,an,9v,e0,9s,e0,9v,an,8u"],"é":[8,0,12,"3o,3w,48,3k,5a,73,6b,73,73,68,73,5a"],"è":[8,0,12,"40,48,3w,3k,5a,73,6b,73,73,68,73,5a"],"ê":[8,0,12,"3s,4c,52,3k,5a,73,6b,73,73,68,73,5a"],"ë":[8,0,11,"52,52,3k,5a,73,6b,73,73,68,73,5a"],"á":[8,0,12,"3o,3w,48,3k,5a,73,3n,5b,73,6b,73,57"],"à":[8,0,12,"40,48,3w,3k,5a,73,3n,5b,73,6b,73,57"],"â":[8,0,12,"3s,4c,52,3k,5a,73,3n,5b,73,6b,73,57"],"ä":[8,0,11,"52,52,3k,5a,73,3n,5b,73,6b,73,57"],"í":[3,0,12,"9,b,e,8,8,e,e,e,e,e,e,e"],"ì":[3,0,12,"c,e,b,8,8,e,e,e,e,e,e,e"],"î":[4,0,12,"m,v,p,g,g,m,m,m,m,m,m,m"],"ï":[4,-1,11,"37,37,1s,1s,24,24,24,24,24,24,24"],"ó":[8,0,12,"3o,3w,48,3k,5a,73,6b,6b,6b,6b,73,5a"],"ò":[8,0,12,"40,48,3w,3k,5a,73,6b,6b,6b,6b,73,5a"],"ô":[8,0,12,"3s,4c,52,3k,5a,73,6b,6b,6b,6b,73,5a"],"ö":[8,0,11,"52,52,3k,5a,73,6b,6b,6b,6b,73,5a"],"ú":[8,0,12,"3o,3w,48,3k,6b,6b,6b,6b,6b,6b,73,57"],"ù":[8,0,12,"40,48,3w,3k,6b,6b,6b,6b,6b,6b,73,57"],"û":[8,0,12,"3s,4c,52,3k,6b,6b,6b,6b,6b,6b,73,57"],"ü":[8,0,11,"52,52,3k,6b,6b,6b,6b,6b,6b,73,57"],"ñ":[8,0,13,"40,56,4u,3o,3k,6m,73,6b,6b,6b,6b,6b,6b"],"ç":[8,0,8,"5a,73,6b,68,68,6b,73,5a,3s,3o,3w,3w"],"æ":[12,0,8,"2cu,35r,1mb,2db,35r,2uo,35r,2bi"],"œ":[12,0,8,"2da,35r,2sz,2tb,2tb,2sw,35r,2da"],"ø":[10,0,8,"hp,lb,jq,ke,l2,jq,se,os"],"å":[8,0,12,"4c,44,4c,3k,5a,73,3n,5b,73,6b,73,57"],"ß":[8,0,10,"5a,73,6b,6b,6m,6n,6b,6b,6n,6m"]," ":[4,0,0,""]}},"gothic":{"label":"Jacquard 12 (OFL)","cap":12,"descent":3,"line":17,"g":{"0":[7,1,8,"26,2f,37,37,37,37,3e,2k"],"1":[4,1,8,"b,f,b,b,b,b,b,a"],"2":[7,1,8,"24,2m,2u,1y,1w,20,2n,3i"],"3":[6,1,8,"18,1r,12,10,1a,13,z,z,16,1o,14"],"4":[8,1,8,"3m,3q,3y,46,4m,73,72,3q,3q,3q,3o"],"5":[6,1,8,"1b,1a,1c,1q,1r,z,z,1n,1m,1o,14"],"6":[6,1,11,"y,13,17,1k,1q,1r,1n,1n,1n,1q,18"],"7":[8,1,8,"5b,72,3o,3s,48,48,48,48,48,48,40"],"8":[7,1,11,"24,2m,37,3f,2m,2m,3b,37,37,2m,24"],"9":[6,1,8,"12,1b,1n,1n,1n,1r,17,z,1m,1o,14"],"!":[5,1,12,"m,v,m,m,m,m,m,m,k,g,m,m"],"\"":[6,1,12,"1n,1n,1n,1e"],"#":[14,1,13,"6ci,6ci,6ee,6dg,7wf,9ha,6mw,6j4,9ha,cn0,7kw,75s,75s"],"$":[8,1,10,"3o,3p,3x,4e,4x,52,57,43,5a,5o,3o,3o"],"%":[11,2,10,"jl,o3,me,q4,k8,fq,h7,jt,p9,li"],"&":[13,1,12,"3i8,3mw,4kw,3uo,3i8,3q8,41c,3zk,5js,5z1,4pa,3us"],"'":[3,1,12,"7,7,7,6"],"(":[6,1,13,"x,z,12,10,18,14,1k,1k,1k,1o,18,1a,12,10"],")":[6,1,13,"10,18,1a,12,13,z,z,z,y,12,10,18,1k,1c"],"*":[8,1,13,"3s,4q,4c,73,4c,4q,3s"],"+":[9,1,9,"7c,7s,7s,an,e6,7s,7s,7k"],",":[3,1,2,"7,7,5,6"],"-":[7,1,6,"2n,3i"],".":[3,1,2,"7,7"],"/":[7,1,13,"1t,1t,1v,1u,1y,1w,24,20,2g,28,34,2o,2o"],":":[3,1,9,"7,7,4,4,4,4,4,7,7"],";":[3,1,9,"7,7,4,4,4,4,4,7,7,5,6"],"<":[8,1,9,"3n,3z,58,6o,6o,58,3z,3n"],"=":[9,1,8,"an,e6,74,74,an,e6"],">":[8,1,9,"68,6w,4e,3r,3r,4e,6w,68"],"?":[6,1,12,"1a,1r,1j,z,z,12,18,18,14,w,18,18"],"@":[15,1,11,"df4,f0s,fsy,fz6,j7d,jld,jld,jld,jle,kjg,g4w,fsw,f0k,dfc"],"A":[14,1,12,"7v0,8aa,9kg,71s,7g0,6k0,6k0,6vs,6qg,76h,9em,a30"],"B":[14,1,12,"97i,9r7,6lf,6lf,7s2,6m4,7s3,6lf,6kj,6bn,73w,75c"],"C":[12,1,12,"1ot,1sm,20g,20k,2yc,2t0,2yc,2t0,2t0,28x,29y,1rw"],"D":[11,1,12,"1ku,zj,sz,yb,1jn,yb,1jn,yb,yb,si,16k,1a0"],"E":[12,1,12,"1ot,1sm,200,20k,2yc,2t0,2yc,2sw,2sw,28y,29w,1rs"],"F":[14,1,12,"7m7,8ke,6gg,6gg,6gg,724,78w,6gg,6gg,6gg,9eo,a80"],"G":[13,1,12,"3iy,3lo,40w,5lw,5wq,5mj,5wj,5lv,5m3,4cq,4jo,3js"],"H":[14,1,12,"8wq,at8,6lc,6lc,7se,6ln,7sj,6lf,6lf,6bv,73m,76q,6bo,6co,6c0"],"I":[12,1,12,"2cl,2gq,1l2,1li,1li,1o6,1li,1o6,1li,1li,1yc,22g"],"J":[12,1,12,"2cl,2gq,1l2,1li,1li,1o6,1li,1o6,1li,1li,1li,1li,1li,1yc,22g"],"K":[15,1,12,"hsg,lmg,d6o,d70,fkm,d7q,fk4,d7c,d6s,co6,e6e,ewz"],"L":[13,1,12,"4g0,5ew,3bk,3bk,3ww,3bk,3ww,3bk,3bk,369,3jy,3qk"],"M":[15,1,12,"n2k,iyn,dwm,dwm,ina,e0m,ina,dwm,die,ehy,p2v,f36"],"N":[14,1,12,"7q1,cku,6oc,6ng,7u4,6ng,7u4,6ng,6ng,6r0,9fx,9s6"],"O":[14,1,12,"9dy,apr,6lf,6lf,7s3,6lf,7s3,6lf,6lf,6fa,73s,7ao"],"P":[13,1,12,"5fl,4pq,3c6,3bq,3x2,3bq,3x2,3bq,3bq,3bq,3x8,44w,3b4,3b4,39c"],"Q":[15,1,12,"irx,lfi,d6u,d6u,fk6,d6u,fk6,d6u,d78,cug,e7o,eli,cnb"],"R":[15,1,12,"kci,iws,czw,cz0,e5o,cy0,e5s,cy0,cz0,d9o,frj,ih2"],"S":[13,1,12,"3jt,3ku,3r8,4ao,4jc,3su,3if,397,36l,3ia,4qm,4ww"],"T":[14,1,12,"fs1,fzy,jro,i0k,e0k,dv8,e0k,dv8,dv8,db8,dc8,cts"],"U":[15,1,12,"kcp,ivy,cz0,cz0,e5o,cz0,e5o,cz0,cz0,fu4,frj,ghy"],"V":[14,1,12,"kd5,iwu,czw,cz0,e5o,cz0,e5o,cz0,cz0,co8,fsg,fz4"],"W":[15,1,12,"ij1,pa6,dwm,dwm,ina,dwm,ina,dwm,dwm,eee,iv0,k6o"],"X":[14,1,12,"891,7se,6eo,6e8,6e8,6pk,6e8,6e8,6e8,7sk,9fc,9lc"],"Y":[14,1,12,"a6l,9ge,6hy,6h2,72e,6h2,72e,6h2,6h2,6hy,6f2,6k6,70k,7aw"],"Z":[12,1,12,"1z3,2da,2dg,2dk,2ds,264,1yw,1mo,1og,1s1,2da,35o"],"[":[5,1,13,"v,s,s,s,s,s,s,s,s,s,s,s,s,s,v"],"\\":[7,1,13,"2o,2o,34,28,2g,20,24,1w,1y,1u,1v,1t,1t"],"]":[5,1,13,"v,j,j,j,j,j,j,j,j,j,j,j,j,j,v"],"^":[9,1,12,"7s,8s,9y,cj"],"_":[10,1,0,"lb,se"],"`":[3,0,13,"e,b,9"],"a":[9,1,8,"7w,87,9y,9y,9y,9y,e7,8m"],"b":[9,1,11,"80,9s,9s,a4,af,9y,9y,9y,9y,e4,8g"],"c":[7,1,8,"1z,23,2g,2g,2g,2g,3i,2g"],"d":[8,1,12,"4g,54,4c,3y,47,4z,4z,4z,4z,4z,72,48"],"e":[8,1,8,"3y,47,4z,58,4w,4w,70,4w"],"f":[6,1,12,"1z,23,2g,2g,3i,2g,2g,2g,2g,2g,3g,2g"],"g":[9,1,8,"7w,8f,9y,9y,9y,9y,e6,8j,77,7u,8c"],"h":[9,1,12,"80,9s,9s,9s,a4,af,9y,9y,9y,9y,dy,9y,7g,7s,7k"],"i":[5,1,12,"m,m,g,g,m,v,m,m,m,m,v,m"],"j":[5,0,12,"12,12,w,w,12,1b,12,12,12,12,12,12,12,18,1k"],"k":[9,1,12,"80,9s,9s,9s,a5,ae,9y,ag,9w,9w,dz,9u"],"l":[5,1,12,"i,m,m,m,m,m,m,m,m,m,v,m"],"m":[14,1,8,"8uk,cn3,7l2,7l2,7l2,7l2,9dj,7j6"],"n":[10,1,8,"jw,sf,h2,h2,h2,h2,l3,gy"],"o":[9,1,8,"7w,8f,9y,9y,9y,9y,e4,8g"],"p":[10,1,8,"jw,sf,h2,h2,h2,h2,lb,o4,gw,gw,g0"],"q":[9,1,8,"7w,87,9y,9y,9y,9y,e7,7q,7a,7a,78"],"r":[8,1,8,"53,6z,48,48,48,48,58,48"],"s":[8,1,9,"3l,3x,4e,4x,52,57,43,5a,5o"],"t":[6,1,11,"10,18,18,1r,18,18,18,18,18,1r,12"],"u":[11,1,8,"13g,1jy,y4,y4,y4,y4,16n,va"],"v":[10,1,8,"rg,kv,h2,h2,h2,h2,l8,fk"],"w":[14,1,8,"c7w,99r,7l2,7l2,7l2,7l2,9do,7jk"],"x":[10,1,8,"h9,l2,fk,fk,fk,fo,oo,k8"],"y":[10,1,8,"jw,sf,h2,h2,h2,ha,h0,l8,qo,m4,l4"],"z":[9,1,8,"ah,e6,as,7c,7k,81,an,bi"],"{":[6,1,12,"z,12,18,18,18,10,14,1c,14,10,18,18,18,12,z"],"|":[3,1,13,"5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6"],"}":[6,1,12,"1k,18,12,12,12,10,y,x,y,10,12,12,12,18,1k"],"~":[8,1,8,"54,65,3y"],"‘":[3,1,12,"5,6,7,7"],"’":[3,1,12,"7,7,5,6"],"“":[6,1,12,"15,1e,1n,1n"],"”":[6,1,12,"1n,1n,15,1e"],"–":[10,1,6,"lb,se"],"—":[14,1,6,"9hb,cn2"],"…":[11,1,2,"1f7,1f7"],"•":[6,1,8,"10,1a,1r,1a,10"],"·":[3,1,7,"7,7"],"×":[7,1,8,"29,3f,2k,26,3b,2q"],"°":[5,1,12,"m,r,p,t,m"],"£":[8,1,9,"3y,4f,4y,4w,70,4w,4w,5b,72"],"¢":[8,1,9,"3y,43,4w,4w,70,4w,4w,43,3y"],"€":[8,1,9,"3y,4f,4y,70,4w,70,4x,4e,4s"],"é":[8,1,13,"3q,3w,3s,3k,3k,3y,47,4z,58,4w,4w,70,4w"],"è":[8,1,13,"3w,3q,3m,3k,3k,3y,47,4z,58,4w,4w,70,4w"],"ê":[8,1,13,"3o,3y,4b,3k,3k,3y,47,4z,58,4w,4w,70,4w"],"ë":[8,1,12,"4b,4b,3k,3k,3y,47,4z,58,4w,4w,70,4w"],"á":[9,1,13,"7g,7s,7k,74,74,7w,87,9y,9y,9y,9y,e7,8m"],"à":[9,1,13,"7s,7g,78,74,74,7w,87,9y,9y,9y,9y,e7,8m"],"â":[9,1,13,"7c,7w,8m,74,74,7w,87,9y,9y,9y,9y,e7,8m"],"ä":[9,1,12,"8m,8m,74,74,7w,87,9y,9y,9y,9y,e7,8m"],"í":[5,1,13,"j,m,k,g,g,m,v,m,m,m,m,v,m"],"ì":[5,1,13,"m,j,h,g,g,m,v,m,m,m,m,v,m"],"î":[5,1,13,"10,1a,1n,w,w,18,1q,18,18,18,18,1q,18"],"ï":[5,1,12,"1n,1n,w,w,18,1q,18,18,18,18,1q,18"],"ó":[9,1,13,"7g,7s,7k,74,74,7w,8f,9y,9y,9y,9y,e4,8g"],"ò":[9,1,13,"7s,7g,78,74,74,7w,8f,9y,9y,9y,9y,e4,8g"],"ô":[9,1,13,"7c,7w,8m,74,74,7w,8f,9y,9y,9y,9y,e4,8g"],"ö":[9,1,12,"8m,8m,74,74,7w,8f,9y,9y,9y,9y,e4,8g"],"ú":[11,1,13,"ts,v4,u8,sg,sg,13g,1jy,y4,y4,y4,y4,16n,va"],"ù":[11,1,13,"v4,ts,sw,sg,sg,13g,1jy,y4,y4,y4,y4,16n,va"],"û":[11,1,13,"tc,vk,yg,sg,sg,13g,1jy,y4,y4,y4,y4,16n,va"],"ü":[11,1,12,"yg,yg,sg,sg,13g,1jy,y4,y4,y4,y4,16n,va"],"ñ":[10,1,13,"eu,fy,fo,e8,e8,jw,sf,h2,h2,h2,h2,l3,gy"],"ç":[7,1,8,"1z,23,2g,2g,2g,2g,3i,2g,1y,1u,1w"],"æ":[12,1,8,"1ri,1tj,27n,27w,27k,27k,35o,1ww"],"œ":[12,1,8,"1ri,1vb,27n,27w,27k,27k,35o,1ww"],"ø":[9,1,8,"7x,8f,9y,a6,ae,9y,dw,c8"],"å":[9,1,13,"7w,7o,7w,74,74,7w,87,9y,9y,9y,9y,e7,8m"],"ß":[11,1,12,"fw,ge,jq,jq,jw,k8,jz,jq,jq,jq,ri,jw"]," ":[5,0,0,""]}},"terminal":{"label":"VT323 (OFL)","cap":7,"descent":2,"line":11,"g":{"0":[5,1,7,"a,d,d,d,d,d,a"],"1":[5,1,7,"a,e,a,a,a,a,f"],"2":[5,1,7,"f,d,9,9,a,c,f"],"3":[5,1,7,"f,d,9,b,9,d,f"],"4":[5,0,7,"12,y,16,16,1r,y,y"],"5":[5,1,7,"u,o,u,q,j,q,u"],"6":[5,1,7,"b,c,c,f,d,d,b"],"7":[5,1,7,"f,9,9,b,a,a,c"],"8":[5,1,7,"f,d,d,f,d,d,f"],"9":[5,1,7,"e,d,d,f,9,9,e"],"!":[5,2,7,"3,3,3,3,3,2,3"],"\"":[5,1,8,"d,d"],"#":[5,0,7,"16,1r,16,16,1r,16"],"$":[5,0,8,"10,1a,1r,1o,1a,13,1r,1a,10"],"%":[5,0,7,"15,1e,14,10,y,15,1e"],"&":[5,0,7,"18,16,19,19,1m,1q,1b"],"'":[5,2,8,"3,3"],"(":[5,2,8,"5,6,6,6,6,6,6,6,5"],")":[5,1,8,"6,5,5,5,5,5,5,5,6"],"*":[5,1,6,"a,f,a,f,a"],"+":[5,1,6,"a,a,f,a,a"],",":[5,2,2,"3,3,3,3"],"-":[5,1,4,"f"],".":[5,2,2,"3,3"],"/":[5,0,8,"z,y,y,10,10,10,14,14,1k"],":":[5,2,6,"3,3,2,2,3,3"],";":[5,2,6,"3,3,2,2,3,3,3,3"],"<":[5,1,7,"9,a,a,c,a,a,9"],"=":[5,1,5,"f,8,f"],">":[5,1,7,"c,a,a,9,a,a,c"],"?":[5,0,7,"n,t,h,h,i,g,i"],"@":[5,0,8,"1a,16,1j,1h,1h,1j,14,1a"],"A":[5,0,7,"10,1a,16,16,1a,1n,1n"],"B":[5,0,7,"1q,1n,1n,1q,1n,1n,1q"],"C":[5,0,7,"1a,17,1k,1k,1k,17,1a"],"D":[5,0,7,"1q,1m,1n,1n,1n,1m,1q"],"E":[5,1,7,"f,c,c,f,c,c,f"],"F":[5,1,7,"f,c,c,f,c,c,c"],"G":[5,0,7,"1a,17,1k,1n,1n,17,1a"],"H":[5,0,7,"1n,1n,1n,1r,1n,1n,1n"],"I":[5,1,7,"f,a,a,a,a,a,f"],"J":[5,0,7,"j,j,j,j,j,v,m"],"K":[5,0,7,"1n,1m,1o,1o,1o,1m,1n"],"L":[5,1,7,"o,o,o,o,o,o,v"],"M":[5,0,7,"1n,1n,1n,1r,1r,1r,1n"],"N":[5,0,7,"1n,1n,1r,1r,1r,1n,1n"],"O":[5,0,7,"1a,16,1n,1n,1n,16,1a"],"P":[5,0,7,"1q,1n,1n,1q,1k,1k,1k"],"Q":[5,0,7,"1a,16,1n,1n,1n,16,1a,y,z"],"R":[5,0,7,"1q,1n,1m,1q,1m,1m,1n"],"S":[5,0,7,"1a,1n,1k,1a,z,1n,1a"],"T":[5,0,7,"1r,10,10,10,10,10,10"],"U":[5,0,7,"1n,1n,1n,1n,1n,1n,1a"],"V":[5,0,7,"1n,1n,1n,16,16,1a,10"],"W":[5,0,7,"1h,1h,1h,1h,1a,16,16"],"X":[5,0,7,"1n,16,16,10,16,16,1n"],"Y":[5,0,7,"1n,1n,16,1a,10,10,10"],"Z":[5,1,7,"f,9,9,a,c,c,f"],"[":[5,2,8,"7,6,6,6,6,6,6,6,7"],"\\":[5,0,8,"1k,14,14,10,10,10,y,y,z"],"]":[5,1,8,"7,5,5,5,5,5,5,5,7"],"^":[5,0,7,"10,1a,16,1n"],"_":[5,0,1,"1r"],"`":[5,1,8,"7,5"],"a":[5,0,5,"1a,y,1a,1m,1b"],"b":[5,0,7,"1k,1k,1q,1m,1n,1m,1o"],"c":[5,0,5,"1a,17,1k,17,1a"],"d":[5,0,7,"z,z,1b,17,1f,17,1b"],"e":[5,0,5,"1a,17,1r,14,1a"],"f":[5,1,7,"b,e,f,e,e,e,f"],"g":[5,0,5,"1b,17,1n,17,1b,y,1a"],"h":[5,0,7,"1k,1k,1q,1n,1n,1n,1n"],"i":[5,1,7,"a,8,e,a,a,a,f"],"j":[5,1,7,"b,8,f,b,b,b,b,a,e"],"k":[5,0,7,"1k,1k,1m,1o,1o,1o,1n"],"l":[5,1,7,"e,a,a,a,a,a,f"],"m":[5,0,5,"1q,1h,1h,1h,1h"],"n":[5,0,5,"1i,1n,1n,1n,1n"],"o":[5,0,5,"1a,16,1n,16,1a"],"p":[5,0,5,"1q,1m,1n,1m,1q,1k,1k"],"q":[5,0,5,"1b,17,1n,17,1b,z,z"],"r":[5,0,5,"1q,1b,14,14,1o"],"s":[5,1,5,"f,c,f,9,f"],"t":[5,0,7,"m,m,v,m,m,m,j"],"u":[5,0,5,"1n,1n,1n,1n,1b"],"v":[5,0,5,"1n,16,16,1a,10"],"w":[5,0,5,"1h,1h,1a,16,16"],"x":[5,1,5,"d,d,a,d,d"],"y":[5,0,5,"1f,16,16,1a,10,10,14"],"z":[5,1,5,"f,9,a,c,f"],"{":[5,1,8,"b,a,a,a,e,a,a,a,b"],"|":[5,2,8,"3,3,3,3,3,3,3,3,3"],"}":[5,1,8,"e,a,a,a,b,a,a,a,e"],"~":[5,0,6,"19,1b,1q,1i"],"‘":[5,2,9,"3,3,3,3"],"’":[5,2,9,"3,3,3,3"],"“":[5,1,9,"d,d,d,d"],"”":[5,1,9,"d,d,d,d"],"–":[5,0,4,"1r"],"—":[5,0,4,"1r"],"…":[5,0,1,"1r"],"•":[5,1,4,"f,f"],"·":[5,2,4,"3,3"],"×":[5,1,7,"d,d,a,a,d,d"],"°":[5,1,8,"f,d,d,f"],"½":[5,0,8,"14,1m,14,1a,19,y,16,13"],"¼":[5,0,8,"14,1m,14,18,1b,z,15,13,x"],"¾":[5,0,8,"1k,12,14,10,1r,z,15,13,x"],"£":[5,0,7,"12,16,14,1o,14,15,1q"],"¢":[5,0,8,"10,10,1a,1n,1k,1n,1a,10,10"],"€":[5,0,7,"1a,15,1o,14,1o,15,1a"],"é":[5,0,8,"y,10,w,1a,17,1r,14,1a"],"è":[5,0,8,"10,10,w,1a,17,1r,14,1a"],"ê":[5,0,8,"12,16,w,1a,17,1r,14,1a"],"ë":[5,0,7,"16,w,1a,17,1r,14,1a"],"á":[5,0,8,"12,10,w,1a,y,1a,1m,1b"],"à":[5,0,8,"18,10,w,1a,y,1a,1m,1b"],"â":[5,0,8,"10,16,w,1a,y,1a,1m,1b"],"ä":[5,0,7,"16,w,1a,y,1a,1m,1b"],"í":[5,1,8,"b,a,8,e,a,a,a,f"],"ì":[5,1,8,"e,a,8,e,a,a,a,f"],"î":[5,1,8,"a,d,8,e,a,a,a,f"],"ï":[5,1,7,"d,8,e,a,a,a,f"],"ó":[5,0,8,"12,10,w,1a,16,1n,16,1a"],"ò":[5,0,8,"18,10,w,1a,16,1n,16,1a"],"ô":[5,0,8,"10,16,w,1a,16,1n,16,1a"],"ö":[5,0,7,"16,w,1a,16,1n,16,1a"],"ú":[5,0,8,"12,10,w,1n,1n,1n,1n,1b"],"ù":[5,0,8,"18,10,w,1n,1n,1n,1n,1b"],"û":[5,0,8,"10,16,w,1n,1n,1n,1n,1b"],"ü":[5,0,7,"16,w,1n,1n,1n,1n,1b"],"ñ":[5,0,8,"19,1i,w,1i,1n,1n,1n,1n"],"ç":[5,0,5,"1a,17,1k,17,1a,10,10"],"æ":[5,0,5,"1a,11,1b,1o,1b"],"œ":[5,0,5,"1a,1p,1r,1o,1b"],"ø":[5,0,6,"y,1a,16,1r,16,1a,14"],"å":[5,0,9,"1a,16,1a,w,1a,y,1a,1m,1b"],"ß":[5,0,7,"1a,17,1n,1a,17,17,1q"]," ":[5,0,0,""]}}};
  const Type = (() => {
    const faces = {};
    function face(name) {
      if (faces[name]) return faces[name];
      const F = PIXELCASE[name];
      if (!F) throw new Error('no face ' + name + ' in the pixel typecase (' + Object.keys(PIXELCASE).join(', ') + ')');
      const bits = {};
      const bitmap = ch => {
        if (bits[ch]) return bits[ch];
        const g = F.g[ch] || F.g['?'];
        const rows = g[3] ? g[3].split(',').map(r => parseInt(r, 36).toString(2).slice(1)) : [];
        return (bits[ch] = { adv: g[0], x: g[1], top: g[2], w: rows.length ? rows[0].length : 0, h: rows.length, rows });
      };
      function layout(text, o) {
        text = String(text);
        const k = Math.max(1, Math.round(o && o.scale || 1)), track = Math.round(o && o.track || 0), out = [];
        let x = 0;
        for (let i = 0; i < text.length; i++) {
          const b = bitmap(text[i]);
          out.push({ ch: text[i], x, w: b.adv * k });
          x += b.adv * k + (i < text.length - 1 ? track : 0);
        }
        // the last letter's advance includes its right bearing: trim it to the ink
        if (out.length) { const b = bitmap(text[text.length - 1]); x -= (b.adv - b.x - b.w) * k; }
        out.width = Math.max(0, x);
        return out;
      }
      const f = {
        name, label: F.label, cap: F.cap, descent: F.descent, line: F.line,
        has: ch => !!F.g[ch], bitmap: ch => bitmap(ch), layout,
        width: (text, o) => layout(text, o).width,
        wrap(text, width, o) {
          const lines = [];
          let line = '';
          for (const word of String(text).split(/\s+/).filter(Boolean)) {
            const next = line ? line + ' ' + word : word;
            if (line && layout(next, o).width > width) { lines.push(line); line = word; } else line = next;
          }
          if (line) lines.push(line);
          return lines;
        },
        draw(ctx, text, x, y, o) {
          o = o || {};
          const k = Math.max(1, Math.round(o.scale || 1)), lay = layout(text, o);
          let x0 = Math.round(o.align === 'center' ? x - lay.width / 2 : o.align === 'right' ? x - lay.width : x);
          const y0 = Math.round(o.base === 'top' ? y + F.cap * k : y);
          for (const L of lay) {
            const b = bitmap(L.ch);
            for (let r = 0; r < b.h; r++) {
              const row = b.rows[r];
              let run = -1;
              for (let i = 0; i <= row.length; i++) {
                if (row[i] === '1') { if (run < 0) run = i; }
                else if (run >= 0) { ctx.fillRect(x0 + L.x + (b.x + run) * k, y0 - (b.top - r) * k, (i - run) * k, k); run = -1; }
              }
            }
          }
          return lay.width;
        },
      };
      return (faces[name] = f);
    }
    return { face, faces: Object.keys(PIXELCASE) };
  })();

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
      type: Type,
      home: hash === hashFor(def.index, def.seed || 0),
      traits: opts && opts.traits || (typeof ProtoRolls !== 'undefined' && ProtoRolls.has(def.num) ? ProtoRolls.roll(def.num, hash) : null),
      trait(name, value) {
        const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value;
        const i = traits.findIndex(t => t[0] === name);
        if (i >= 0) traits[i][1] = String(v); else traits.push([name, String(v)]);
        return value;
      },
    };
    // sound answers a touch and then goes quiet (the founder, 2026-10-29): a piece plays only within 8 s of the viewer's last
    // tap, press or move over it, so nothing loops or plays on its own (sounds already scheduled still finish)
    let time = 0, f = 0, heard = -1e9;
    const ip = c.input, seen = { n: ip.pushes, x: ip.x, y: ip.y };
    if (c.sound !== SILENT) {
      const s0 = withVolume(c.sound, def.volume ?? VOLUME[def.num], def.key ?? KEY[def.num]), awake = () => time - heard < 8;
      c.sound = { get on() { return s0.on && awake(); }, note(m, o) { if (awake()) s0.note(m, o); }, hit(k, v, o) { if (awake()) s0.hit(k, v, o); }, pcm(d, r, o) { if (awake()) s0.pcm(d, r, o); } };
    }
    let copy = () => {};
    if (def.gl) {
      const g = sharedGl(S);
      c.gl = g;
      g.viewport(0, 0, S, S);
      g.clearColor(0, 0, 0, 1); g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
      // the piece drew into the bottom-left S x S of the shared canvas
      copy = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'copy'; ctx.drawImage(glc, 0, glc.height - S, S, S, 0, 0, S, S); ctx.globalCompositeOperation = 'source-over'; };
    } else c.ctx = ctx;
    const frame = def.make(c);
    copy();
    return {
      def, hash, canvas, traits,
      // a frame function may say it repeats exactly after `period` seconds
      period: frame && frame.period || 0, periodSteps: frame && frame.periodSteps || 0,
      step(dt) {
        if (ip.down || ip.pushes !== seen.n || ip.x !== seen.x || ip.y !== seen.y) { heard = time; seen.n = ip.pushes; seen.x = ip.x; seen.y = ip.y; }
        time += dt; f++;
        if (!frame) return;
        if (def.gl) sharedGl(S);
        frame(time, dt, f);
        copy();
      },
      get frames() { return f; },
      // the art grid this variation is drawn on (see grid above); 0 when it has none
      get grid() { return +c.grid || +def.grid || 0; },
    };
  }

  const fpsOf = def => def.fps || 30;
  const groups = [];
  const group = gr => groups.push(gr);
  window.Proto = { list, add, create, Type, fpsOf, randomHash, hashFor, groups, group, Audio, makeInput, makeSound };
})();
