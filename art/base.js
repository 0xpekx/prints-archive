// What the page needs of the art before the art itself, which loads after the first screen (art/lib.js, px.js, the
// pieces and the newer drops' runtimes: one bundle of about 5 MB). Here: the seeded randomness, the palettes, and what
// each piece is (art/facts.js: names, families, kinds), so traits, odds and a collector's orb work at once.
// window.Proto and window.ProtoPFP start as stand-ins holding just that. When the art has run (art/adopt.js, its last
// script), each piece's code goes onto its stand-in and the stand-ins get the art's functions, so whatever held them
// before (core.js's series, app.js) draws from then on. ProtoBase.loaded resolves then.
(function () {
  'use strict';
  const TAU = Math.PI * 2;

  // ---------- seeded randomness (sfc32 over the 64-hex hash) ----------
  function rngFromHash(hash) {
    const h = String(hash).replace(/^0x/, '').padEnd(64, '0');
    const word = i => parseInt(h.slice(i * 8, i * 8 + 8), 16) | 0;
    let a = word(0) ^ word(4), b = word(1) ^ word(5), c = word(2) ^ word(6), d = word(3) ^ word(7);
    const next = () => {
      a |= 0; b |= 0; c |= 0; d |= 0;
      const t = (a + b | 0) + d | 0;
      d = d + 1 | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = c << 21 | c >>> 11; c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 20; i++) next();
    const R = () => next();
    R.range = (lo, hi) => lo + (hi - lo) * next();
    R.int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
    R.pick = arr => arr[Math.floor(next() * arr.length)];
    R.bool = (p = 0.5) => next() < p;
    R.sign = () => (next() < 0.5 ? -1 : 1);
    R.gauss = () => { let u = 0; while (u === 0) u = next(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * next()); };
    R.shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; };
    return R;
  }

  function randomHash() {
    const b = new Uint8Array(32);
    crypto.getRandomValues(b);
    return '0x' + Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
  }

  // The gallery's own hash for prototype i, variation k (deterministic).
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

  // ---------- colour: what the page uses before the art (a collector's orb, BLU3PRINTS inks) ----------
  const hex = s => { const v = parseInt(s.slice(1), 16); return [v >> 16 & 255, v >> 8 & 255, v & 255]; };
  const css = (c, a) => a === undefined ? `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})` : `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

  // Palettes carried over from Filaments and from the Senses set in the lab.
  const PALETTES = [
    ['Oodles', ['#ffa4d5', '#83ffc1', '#ffe780', '#99e2ff']],
    ['Denza', ['#305e90', '#db4e54', '#ffbb12', '#389894', '#e0d8c5', '#c7e3d4']],
    ['Ghost', ['#0827f5', '#3751f7', '#8493fa']],
    ['Splatter', ['#00c1ff', '#0023ff', '#7215ff', '#ff03fc', '#ff000a', '#ff8700', '#fff700', '#5fff00', '#00ff2e']],
    ['Matrix', ['#00e000', '#005900', '#b6ffb6']],
    ['Lava', ['#9d0208', '#d00000', '#e85d04', '#faa307']],
    ['Rich', ['#fff69f', '#fdd870', '#d0902f', '#a15501']],
    ['Alien', ['#a0ffe3', '#65dc98', '#8d8980', '#575267']],
    ['Blurple', ['#0099ff', '#5655dd', '#8822ff', '#aa99ff']],
    ['Retrofuture', ['#7700a6', '#fe00fe', '#defe47', '#00b3fe', '#0016ee']],
    ['Surf', ['#c4ffff', '#08deea', '#1261d1']],
    ['Love', ['#ff124f', '#ff00a0', '#fe75fe', '#7a04eb']],
    ['Candy', ['#f887ff', '#de004e', '#860029', '#5b2a8c']],
    ['Cold Blooded', ['#8386f5', '#3d43b4', '#0d2a8a', '#1afe49']],
    ['Neon Hum', ['#00f5d4', '#f15bb5', '#fee440', '#9b5de5', '#00bbf9']],
    ['Middle C', ['#ff2e2e', '#ff7a1a', '#ffd23f', '#fff3c4']],
    ['Treble', ['#caf0f8', '#90e0ef', '#00b4d8', '#0077b6']],
    ['Bass', ['#3a0ca3', '#7209b7', '#b5179e', '#f72585']],
    ['Citrus', ['#f9f871', '#c2f970', '#44d492', '#0b8a6f']],
    ['Velvet', ['#6a1b4d', '#b23a48', '#f2a7b5', '#ffe5ec']],
    ['Petrichor', ['#52796f', '#84a98c', '#cad2c5', '#f1f5ee']],
    ['Ultraviolet', ['#5a189a', '#9d4edd', '#e0aaff', '#ffffff']],
    ['Cymbal', ['#fdf0d5', '#e9c46a', '#b08968', '#7a5a3c']],
  ].map(([name, cols]) => ({ name, cols: cols.map(hex) }));

  // Ground and ink pairs carried over from BLU3PRINTS.
  const INKS = [
    ['Draft', '#eeeeee', '#c8c8c8', '#009be1'], ['Night', '#252524', '#51569b', '#b5baff'],
    ['Slate', '#333a57', '#51569b', '#ffffff'], ['Blueprint', '#2a5896', '#507ebc', '#ffffff'],
    ['Chalkboard', '#0b6633', '#13a05f', '#ffffff'], ['Caution', '#ffe023', '#ccb31b', '#3c3e18'],
    ['Sepia', '#dfc6a9', '#b9966e', '#2a1807'], ['Oxblood', '#972929', '#5e1d1d', '#111111'],
    ['Graphite', '#111111', '#3a3a3a', '#dddddd'], ['Signal', '#fe8d00', '#b16200', '#081c2a'],
    ['Cyan', '#009be1', '#4fb9ea', '#ffffff'], ['Rose', '#e3a0be', '#c8c8c8', '#111111'],
  ].map(([name, ground, speck, ink]) => ({ name, ground: hex(ground), speck: hex(speck), ink: hex(ink) }));

  // ---------- each piece's facts ----------
  // for the pieces the catalogue uses: name, family, kind, how it plays; for the rest, only their place (core.js counts
  // Drop 01's pieces by it). The recipe stays with the art: every series has its own line in the catalogue (brief).
  // Made by server/tools/art-facts.mjs into art/facts.js; checked against the art when it arrives (a stale file could
  // put one piece's code under another's name: the server won't start with one, nor will the cloud build)
  const KEEP = ['index', 'num'], FULL = [...KEEP, 'name', 'fam', 'type', 'key', 'seed', 'smooth', 'interactive', 'music', 'gl', 'fps'];
  // Drops after Drop 02 have runtimes of their own (the catalogue's runtimes: dir -> window global, e.g. drop03 ->
  // ProtoD03): their facts go under F.rt[dir] = { g: global, list }. win: where those runtimes are (window).
  function factsOf(main, pfp, cat, win) {
    const used = new Set(), rts = cat.runtimes || {};
    // Drop 01's pieces by number, Drop 02's (pfp1) as rt:num, a later drop's as dir:num
    for (const s of cat.series) for (const [n] of s.species) used.add((!s.rt ? '' : rts[s.rt] ? s.rt + ':' : 'rt:') + n);
    const one = (d, full) => { const o = {}; for (const k of full ? FULL : KEEP) if (d[k] !== undefined) o[k] = d[k]; return o; };
    const F = { main: main.list.map(d => one(d, used.has(String(d.index + 1)))), pfp: pfp ? pfp.list.map(d => one(d, used.has('rt:' + d.num))) : [] };
    const dirs = Object.keys(rts);
    if (dirs.length) {
      F.rt = {};
      for (const dir of dirs) { const r = win && win[rts[dir]]; F.rt[dir] = { g: rts[dir], list: r && r.list ? r.list.map(d => one(d, used.has(dir + ':' + d.num))) : [] }; }
    }
    return F;
  }
  const main = { list: [], rngFromHash, randomHash, hashFor, U: { TAU, hex, css, PALETTES, INKS } };
  const pfp = { list: [], randomHash, hashFor };
  window.Proto = main; window.ProtoPFP = pfp;
  let known = '';
  // the later drops' stand-in runtimes, by window global (ProtoD03...), made from facts.js
  const extra = {};
  function facts(F) {
    known = JSON.stringify(F);
    main.list.push(...F.main.map(o => Object.assign({}, o)));
    pfp.list.push(...F.pfp.map(o => Object.assign({}, o, { rt: pfp })));
    for (const dir in F.rt || {}) {
      const { g, list } = F.rt[dir], stub = extra[g] = { list: [], randomHash, hashFor };
      stub.list.push(...list.map(o => Object.assign({}, o, { rt: stub })));
      window[g] = stub;
    }
  }

  // ---------- the art arriving ----------
  let ready = false, done = null;
  const loaded = new Promise(r => { done = r; });
  // a piece's code onto its stand-in: Drop 01's by their place in the list (core.js counts them that way), the newer
  // format's by num; and the runtime's functions onto the stand-in runtime
  function take(stub, real, by) {
    for (const d of real.list) {
      let f = stub.list.find(x => x[by] === d[by]);
      if (!f) stub.list.push(f = {});
      Object.assign(f, d);
      if (by === 'num') f.rt = stub;
    }
    if (by === 'num') stub.list.sort((a, b) => a.num - b.num);
    for (const k in real) if (k !== 'list') stub[k] = real[k];
  }
  // called by art/adopt.js, the art's last script
  function adopt() {
    const real = window.Proto, realPFP = window.ProtoPFP;
    if (real === main) return;
    // the later drops' runtimes as the art left them (their own, or still the stand-in if a script didn't run)
    const win = {};
    // (the cloud's engine leaves the later drops' code out on purpose, window.__factsOnly: it never draws them, and their
    // facts are all it needs; cloud/build.mjs checks facts.js against the art itself)
    for (const g in extra) win[g] = window[g] !== extra[g] ? window[g] : window.__factsOnly ? extra[g] : null;
    // (the cloud's engine leaves Drop 02's code out too, 2026-10-18: its stand-ins are its facts)
    const now = JSON.stringify(factsOf(real, realPFP !== pfp ? realPFP : window.__factsOnly ? pfp : null, window.PrintsCatalogue, win));
    B.stale = now !== known;
    if (B.stale) console.error('art/facts.js does not match the art: run node server/tools/art-facts.mjs');
    take(main, real, 'index');
    if (realPFP && realPFP !== pfp) take(pfp, realPFP, 'num');
    for (const g in extra) { if (win[g]) take(extra[g], win[g], 'num'); window[g] = extra[g]; }
    window.Proto = main; window.ProtoPFP = pfp;
    ready = true;
    done();
  }
  // the page: the art's scripts are in <template id="art"> (index.html), so they don't run with the page. They come in
  // groups, one per drop's art (the founder, 2026-10-15: load each drop's art only when it's needed): main (Drop 01's
  // library and pieces), pfp1 (Drop 02), drop03 (Drop 03)... A group is put in when something of that drop has to be
  // drawn (need(g)), one group at a time, and taken onto its stand-ins when its last script has run. The cloud build
  // makes each group one file (data-g on its script tag); on the PC they're the separate scripts, grouped by name.
  // art/adopt.js (all at once) is for the engine, which runs every script; the page leaves it out.
  const groupOf = s => s.getAttribute('data-g') || ((/art\/((?:pfp|drop)\d+)[-/]/.exec(s.getAttribute('src')) || [])[1]) || 'main';
  const G = {};
  const grp = g => G[g] || (G[g] = (() => { let res; const p = new Promise(r => { res = r; }); return { ready: false, asked: false, tries: 0, p, res }; })());
  let busy = false;
  const waiting = [];
  function need(g = 'main') {
    const x = grp(g);
    if (x.ready || x.asked || typeof document === 'undefined' || !document.getElementById('art')) return x.p;
    x.asked = true;
    waiting.push(g);
    next();
    return x.p;
  }
  function next() {
    if (busy || !waiting.length) return;
    busy = true;
    run(waiting.shift());
  }
  function run(g) {
    const x = grp(g), t = document.getElementById('art');
    const srcs = [...t.content.querySelectorAll('script')].filter(s => groupOf(s) === g && !/art\/adopt\.js/.test(s.getAttribute('src'))).map(s => s.getAttribute('src'));
    if (!srcs.length) { x.ready = true; x.res(); busy = false; next(); return; }
    let failed = false;
    srcs.forEach((src, k) => {
      const s = document.createElement('script');
      s.src = src; s.async = false;
      s.onerror = () => { if (failed) return; failed = true; if (++x.tries < 6) setTimeout(() => run(g), 2000 * x.tries); else { busy = false; next(); } };
      if (k === srcs.length - 1) s.onload = () => { if (!failed) { adoptGroup(g); busy = false; next(); } };
      document.head.appendChild(s);
    });
  }
  // one group's code onto its stand-ins
  function adoptGroup(g) {
    const x = grp(g);
    if (g === 'main') { const real = window.Proto; if (real && real !== main) take(main, real, 'index'); window.Proto = main; ready = true; done(); }
    else if (g === 'pfp1') { const real = window.ProtoPFP; if (real && real !== pfp) take(pfp, real, 'num'); window.ProtoPFP = pfp; }
    else { const gl = ((window.PrintsCatalogue || {}).runtimes || {})[g], real = gl && window[gl]; if (gl && real && real !== extra[gl]) { take(extra[gl], real, 'num'); window[gl] = extra[gl]; } }
    x.ready = true; x.res();
  }
  const load = () => need('main');
  const has = g => !!(G[g] && G[g].ready) || (g === 'main' && ready);
  const B = window.ProtoBase = { rngFromHash, randomHash, hashFor, hex, css, PALETTES, INKS, facts, factsOf, adopt, load, need, has, loaded, stale: false, get ready() { return ready; } };
})();
