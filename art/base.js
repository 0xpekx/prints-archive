// What the page needs of the art before the art itself, which loads only when a piece of its drop is drawn (art/lib.js,
// px.js, the pieces and the newer drops' runtimes: a bundle a drop, Drop 01's a family, about 5 MB in all; app.js
// needArt). Here: the seeded
// randomness, the palettes, and what each piece is (art/facts.js: names, families, kinds), so traits, odds and a
// collector's orb work at once, and lists and grids (the PC's thumbnails) need none of it.
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
  // Drop 01's families, one a file: [file, family, its first piece's number, its pieces, the files it needs with it]
  // (art-facts.mjs). lib.js add() numbers a family's pieces from its first (famAt), and the page loads them a family at
  // a time (need, below)
  let files = [];
  const famFirst = new Map();
  function facts(F, D1) {
    files = (D1 && D1.files) || [];
    for (const f of files) famFirst.set(f[1], f[2]);
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
  // groups, put in when something of theirs has to be drawn (need(g); the founder, 2026-10-15: load each drop's art only
  // when it's needed). Drop 01's a family at a time (the speed doc's F, 2026-10-26: the front door and a shared print
  // draw a few of its pieces, and loaded all 500 of them, 763 KB): lib (art/lib.js and px.js) first, then each family
  // its own group, named by its file (p07-tilings); main is all of Drop 01. Then a group a newer drop: pfp1 (Drop 02),
  // drop03 (Drop 03)... What's asked for together goes in together, in the page's order, and onto its stand-ins when it
  // has all run: a family's pieces each onto its own number's (lib.js add() numbers them as the whole drop does), checked
  // against art/facts.js. The cloud build makes each group one file (data-g on its script tag); on the PC they're the
  // separate scripts, grouped by name. art/adopt.js (all at once) is for the engine, which runs every script; the page
  // leaves it out.
  const D1 = /^p\d\d-[\w-]+$/;
  function groupOf(s) {
    const g = s.getAttribute('data-g'), m = !g && (/art\/((?:pfp|drop)\d+)[-/]/.exec(s.getAttribute('src')) || /art\/(p\d\d-[\w-]+)\.js/.exec(s.getAttribute('src')));
    return g || (m ? m[1] : 'lib');   // (art/lib.js and art/px.js)
  }
  const scripts = () => { const t = document.getElementById('art'); return t ? [...t.content.querySelectorAll('script')].filter(s => !/art\/adopt\.js/.test(s.getAttribute('src'))) : []; };
  let d1 = null;
  const d1Groups = () => d1 || (d1 = [...new Set(scripts().map(groupOf).filter(g => g === 'lib' || D1.test(g)))]);
  const G = {};
  const grp = g => G[g] || (G[g] = (() => { let res; const p = new Promise(r => { res = r; }); return { ready: false, asked: false, tries: 0, p, res }; })());
  let busy = false, soon = false;
  const waiting = [];
  // a family and those it needs with it (p12-terrain draws with p11-sprites' helpers), theirs first
  const withNeeds = g => { const f = files.find(x => x[0] === g); return [...new Set([...((f && f[4]) || []).flatMap(withNeeds), g])]; };
  function need(g = 'main') {
    const x = grp(g);
    if (x.ready || typeof document === 'undefined' || !document.getElementById('art')) return x.p;
    // (a family needs Drop 01's library, and the families whose helpers it uses (art/facts.js); main is all of them)
    for (const y of g === 'main' ? d1Groups() : D1.test(g) ? ['lib', ...withNeeds(g)] : [g]) { const z = grp(y); if (!z.ready && !z.asked) { z.asked = true; waiting.push(y); } }
    // (what's asked for in the same moment, a page's few pieces, goes in as one)
    if (!soon) { soon = true; Promise.resolve().then(() => { soon = false; next(); }); }
    return x.p;
  }
  function next() {
    if (busy || !waiting.length) return;
    busy = true;
    run(waiting.splice(0));
  }
  function run(gs) {
    gs.sort((a, b) => (b === 'lib') - (a === 'lib'));   // (the library's functions before the families that use them)
    const mine = scripts().filter(s => gs.includes(groupOf(s))), bad = new Set();
    let left = mine.length;
    if (!left) { finish(gs, bad); return; }
    for (const s0 of mine) {
      const s = document.createElement('script'), g = groupOf(s0);
      s.src = s0.getAttribute('src'); s.async = false;
      s.onload = () => { if (!--left) finish(gs, bad); };
      s.onerror = () => { bad.add(g); if (!--left) finish(gs, bad); };
      document.head.appendChild(s);
    }
  }
  function finish(gs, bad) {
    const again = [];
    for (const g of gs) {
      const x = grp(g);
      if (!bad.has(g) && adoptGroup(g)) { x.ready = true; x.res(); continue; }
      // (one that didn't come, or didn't run, is asked for again, a few times and slower each time; then given up: the
      // next piece drawn asks again, and whatever waits for it then draws)
      if (++x.tries < 6) again.push(g); else { x.asked = false; x.tries = 0; }
    }
    if (!ready && d1Groups().every(g => G[g] && G[g].ready)) { ready = true; grp('main').ready = true; grp('main').res(); done(); }
    if (again.length) setTimeout(() => { waiting.push(...again.filter(g => !waiting.includes(g))); next(); }, 2000 * Math.max(...again.map(g => grp(g).tries)));
    busy = false;
    next();
  }
  // a group's code onto its stand-ins; false if it isn't all there
  let realLib = null;
  const taken = new WeakSet();
  function adoptGroup(g) {
    if (g === 'lib') {
      // Drop 01's library: its functions onto the stand-in (the families after it add their pieces through them)
      const real = window.Proto;
      if (real && real !== main && real.add) { realLib = real; for (const k in real) if (k !== 'list') main[k] = real[k]; window.Proto = main; }
      return !!realLib;
    }
    if (D1.test(g)) {
      // a family's pieces, each onto the stand-in with its number, if they're the pieces art/facts.js says it has
      const f = files.find(x => x[0] === g), defs = f && realLib ? realLib.list.filter(d => d.fam === f[1] && !taken.has(d)) : [];
      if (!f || defs.length !== f[3] || defs.some(d => { const s = main.list[d.index]; return !s || s.index !== d.index || (s.name && s.name !== d.name); })) {
        console.error(`art/${g}.js is not what art/facts.js says: run node server/tools/art-facts.mjs`);
        return false;
      }
      for (const d of defs) { Object.assign(main.list[d.index], d); taken.add(d); }
      return true;
    }
    if (g === 'pfp1') { const real = window.ProtoPFP; if (real && real !== pfp) take(pfp, real, 'num'); window.ProtoPFP = pfp; }
    else { const gl = ((window.PrintsCatalogue || {}).runtimes || {})[g], real = gl && window[gl]; if (gl && real && real !== extra[gl]) { take(extra[gl], real, 'num'); window[gl] = extra[gl]; } }
    return true;
  }
  // a Drop 01 piece's group: its family's file (a stand-in def, by its number); null for any other
  const groupOfDef = def => { if (!def || def.rt || def.index == null) return null; const f = files.find(x => def.index >= x[2] && def.index < x[2] + x[3]); return f ? f[0] : 'main'; };
  const famAt = fam => (famFirst.has(fam) ? famFirst.get(fam) : null);
  const load = () => need('main');
  const has = g => !!(G[g] && G[g].ready) || (g === 'main' && ready);
  const B = window.ProtoBase = { rngFromHash, randomHash, hashFor, hex, css, PALETTES, INKS, facts, factsOf, adopt, load, need, has, groupOfDef, famAt, loaded, stale: false, get ready() { return ready; } };
})();
