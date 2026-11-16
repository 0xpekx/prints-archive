// Worlds's rolls: /home/fleet/code/worlds-overnight-prints/lab/drop/rolls.js (import-lab-drop.mjs), as window.PrintsRolls['drop06'], made when first asked for
;(function () {
var made = null;
var make = function () {
var ProtoRolls;
// Worlds (Drop 05 on the site): each world's own traits, rolled from its hash before anything is drawn, as the art names them (c.trait).
// Built by the lab's scratch/traits/build.mjs from rolls/NNN.js (each checked against the piece's make()) and their tables: each
// value's weight is how often it came up in a million or more pure rolls (a trait's '' = the prints without it). Edit the blocks, never this file.
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

// ==== roll 008 ====
ProtoRolls.add(8, {
  traits: {"Season":{"look":true,"values":{"Spring green":340240,"Summer gold":339412,"Autumn rust":230427,"Silver frost":89921}},"Sky":{"look":true,"values":{"Golden hour":340074,"Morning haze":300165,"Storm light":259844,"Aurora night":99917}},"Land":{"look":true,"values":{"Gentle swells":380205,"A long ridge":340038,"Stream valley":279757}},"Landmark":{"look":true,"values":{"Lone tree":360852,"Standing stones":239625,"Weathered shelter":219765,"Tethered kite":179758}},"Flowers":{"look":true,"values":{"Meadow mix":340263,"Poppies":240102,"Cornflower and daisy":239651,"Sparse":179984}},"Drifting":{"values":{"Dandelion seeds":568325,"Petals":300213,"Fireflies":72468,"Glowing seeds":58994}},"View":{"look":true,"values":{"Standing":456776,"Standing, by the flag line":195231,"Lying in the grass":131492,"Up on a rise":112127,"Lying in the grass, by the flag line":56421,"Up on a rise, by the flag line":47953}},"Birds":{"values":{"None":514297,"Swifts":269374,"Rooks":216329}},"Wind and chimes":{"look":true,"values":{"Gusty, Major pentatonic":167622,"Gusty, Minor pentatonic":140763,"Calm, Major pentatonic":114313,"Steady, Major pentatonic":98913,"Calm, Minor pentatonic":95981,"Gusty, Lydian":87699,"Steady, Minor pentatonic":83526,"Calm, Lydian":59973,"Steady, Lydian":51807,"Gusty, Whole-tone":43756,"Calm, Whole-tone":29943,"Steady, Whole-tone":25704}}},
  roll(hash) {
    const HOME = '0xb7a38b8e2a691213c6942c94815919e0df5824f9cccf072b24a918f7d791d122';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const home = hash === HOME;
      const hx = hash.slice(2);
      const mkR = off => {
        let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
        const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
        for (let i = 0; i < 15; i++) f();
        f.st = () => [a, b, cc, d]; f.ld = s => { a = s[0]; b = s[1]; cc = s[2]; d = s[3]; };
        return f;
      };
      const R = mkR(0), RT = mkR(32);
      const pick = opts => { let tot = 0; for (const o of opts) tot += o[1]; let x = R() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };

      // ---------------------------------------------------------- traits
      let season = pick([['Spring green', 34], ['Summer gold', 34], ['Autumn rust', 23], ['Silver frost', 9]]);
      let sky = pick([['Morning haze', 30], ['Golden hour', 34], ['Storm light', 26], ['Aurora night', 10]]);
      let terr = pick([['Gentle swells', 38], ['A long ridge', 34], ['Stream valley', 28]]);
      let land = pick([['Lone tree', 36], ['Standing stones', 24], ['Weathered shelter', 22], ['Tethered kite', 18]]);
      let flowers = pick([['Meadow mix', 34], ['Poppies', 24], ['Cornflower and daisy', 24], ['Sparse', 18]]);
      let drift = pick([['Dandelion seeds', 52], ['Petals', 30], ['Fireflies', 18]]);
      let temper = pick([['Gusty', 44], ['Calm', 30], ['Steady', 26]]);
      let birds = pick([['Swifts', 30], ['Rooks', 24], ['Hovering kestrel', 20], ['None', 26]]);
      let scale = pick([['Major pentatonic', 38], ['Minor pentatonic', 32], ['Lydian', 20], ['Whole-tone', 10]]);
      if (home) { season = 'Summer gold'; sky = 'Golden hour'; terr = 'A long ridge'; land = 'Lone tree'; flowers = 'Meadow mix'; drift = 'Dandelion seeds'; temper = 'Gusty'; birds = 'Swifts'; scale = 'Major pentatonic'; }
      if (birds === 'Hovering kestrel') birds = 'None'; // a lone near bird read as a model: the roll stays, the bird goes
      const night = sky === 'Aurora night';
      if (drift === 'Fireflies' && (sky === 'Morning haze' || sky === 'Storm light')) drift = 'Dandelion seeds';
      if (night && drift === 'Dandelion seeds') drift = 'Glowing seeds';
      if (night && birds !== 'None') birds = 'None';
      if (season === 'Silver frost' && drift === 'Fireflies') drift = 'Glowing seeds';
      const seedy = drift === 'Dandelion seeds' || drift === 'Glowing seeds';
      T('Season', season); T('Sky', sky); T('Land', terr); T('Landmark', land);
      // the viewpoint, from its own hash stream so every roll above keeps its value
      const RV = mkR(16);
      let view = (() => { const x = RV() * 100; return x < 58 ? 'Standing' : x < 84 ? 'Lying in the grass' : 'Up on a rise'; })();
      if (home || (view === 'Lying in the grass' && terr === 'Stream valley')) view = 'Standing'; // the stream bank crops badly from grass height
      // the flag line comes up close (next draw of the same stream; home never): its near pole at the edge of the frame, the
      // strips big in front of you and the line running away up the slope; shown on the View value
      let lineNear = !home && RV() < 0.3;
      T('Flowers', flowers); T('Drifting', drift); T('View', lineNear ? view + ', by the flag line' : view); T('Birds', birds); T('Wind and chimes', temper + ', ' + scale);

    return out;
  },
});
// ==== end roll ====

// ==== roll 009 ====
ProtoRolls.add(9, {
  traits: {"World":{"look":true,"values":{"Castle Wood":195172,"Harbour Town":195063,"Mountain Pass":163078,"Caravan Stop":146668,"Lighthouse Rock":110852,"Sky Garden":97071,"Viaduct Valley":92096}},"Stock":{"look":true,"values":{"Cream & Ink, navy binding":81732,"Cream & Ink, oxblood binding":81406,"Coloured Card, navy binding":72040,"Coloured Card, oxblood binding":71487,"Cream & Ink, moss binding":67928,"Coloured Card, moss binding":59713,"Cream & Ink, ochre binding":54248,"White Relief, oxblood binding":48294,"White Relief, navy binding":48169,"Coloured Card, ochre binding":47895,"Cream & Ink, charcoal binding":40780,"White Relief, moss binding":39924,"Coloured Card, charcoal binding":36252,"White Relief, ochre binding":32074,"White Relief, charcoal binding":24004,"Vellum, oxblood binding":21668,"Vellum, navy binding":21659,"Vellum, moss binding":18207,"Gold Foil Night, oxblood binding":17016,"Gold Foil Night, navy binding":16622,"Vellum, ochre binding":14210,"Gold Foil Night, moss binding":14110,"Cream & Ink, marbled binding":13709,"Coloured Card, marbled binding":12089,"Gold Foil Night, ochre binding":11326,"Vellum, charcoal binding":10890,"Gold Foil Night, charcoal binding":8379,"White Relief, marbled binding":7871,"Vellum, marbled binding":3477,"Gold Foil Night, marbled binding":2821}},"Hour":{"look":true,"values":{"Noon":279126,"Dusk":278202,"Night":256044,"Dawn":186628}},"Season":{"look":true,"values":{"Summer":298484,"Autumn":280947,"Spring":250252,"Winter":170317}},"Lamp":{"values":{"Reading lamp":815647,"Low lamp":184353}},"Mechanisms":{"look":true,"values":{"sky wheel, boat slot, season wheel, swing wall":100238,"sky wheel, boat slot, season wheel":83090,"sky wheel, boat slot, swing wall":67531,"sky wheel, rider slot, season wheel, swing wall":64632,"sky wheel, boat slot":55056,"sky wheel, cable car, season wheel, swing wall":53783,"sky wheel, rider slot, season wheel":52621,"sky wheel, caravan slot, season wheel, swing wall":48392,"sky wheel, cable car, season wheel":43969,"sky wheel, rider slot, swing wall":42995,"sky wheel, caravan slot, season wheel":39591,"sky wheel, cable car, swing wall":35847,"sky wheel, rider slot":34924,"sky wheel, caravan slot, swing wall":32102,"sky wheel, airship slot, season wheel, swing wall":32020,"sky wheel, train, season wheel, swing wall":30171,"sky wheel, cable car":29479,"sky wheel, caravan slot":26583,"sky wheel, airship slot, season wheel":26105,"sky wheel, train, season wheel":25105,"sky wheel, airship slot, swing wall":21331,"sky wheel, train, swing wall":20325,"sky wheel, airship slot":17615,"sky wheel, train":16495}},"Hidden room":{"look":true,"values":{"None":450633,"Lantern room":186525,"Treasure":143024,"Sleeping cat":142835,"Sleeping dragon":49617,"Starry stair":27366}},"View":{"look":true,"values":{"Across the table":399677,"From the side":220709,"Leaning in":160328,"From above":129585,"Eye to the card":89701}},"Extra":{"look":true,"values":{"None":399668,"Birds":219702,"Balloon":180368,"Lanterns":140045,"Comet":60217}}},
  roll(hash) {
    const HOME = '0xad2ae5a0bdf102d6ab8030a2865a0a3dd7093f4d2ac9aab6d0a11b4ae9cfc915';
    const home = hash === HOME;
    const hx = (hash || '0x0').slice(2).padEnd(64, '0');
    const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
    const sfc = (a, b, cc, d) => () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
    const rnd = sfc(sd(0), sd(1), sd(2), sd(3));
    for (let i = 0; i < 24; i++) rnd();
    const wp = list => { let tot = 0; for (const e of list) tot += e[1]; let x = rnd() * tot; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
    let world = wp([['harbour', 24], ['castle', 22], ['mountain', 20], ['desert', 18], ['sky', 12]]);
    let stock = wp([['cream', 34], ['card', 30], ['white', 20], ['vellum', 9], ['gold', 7]]);
    let hour = wp([['Dawn', 20], ['Noon', 30], ['Dusk', 30], ['Night', 20]]);
    let season = wp([['Spring', 25], ['Summer', 30], ['Autumn', 28], ['Winter', 17]]);
    wp([[3, 18], [4, 40], [5, 30], [6, 12]]);
    let wheel = rnd() < 0.6, flap = rnd() < 0.55;
    let secret = wp([['Lantern room', 34], ['Treasure', 26], ['Sleeping cat', 26], ['Sleeping dragon', 9], ['Starry stair', 5]]);
    let binding = wp([['Oxblood', 24], ['Navy', 24], ['Moss', 20], ['Ochre', 16], ['Charcoal', 12], ['Marbled', 4]]);
    let extra = wp([['None', 40], ['Birds', 22], ['Balloon', 18], ['Lanterns', 14], ['Comet', 6]]);
    if (home) { world = 'harbour'; stock = 'cream'; hour = 'Dusk'; season = 'Autumn'; wheel = true; flap = true; secret = 'Lantern room'; binding = 'Oxblood'; extra = 'Balloon'; }
    const vrng = sfc(sd(2) ^ 0x7f4a7c15, sd(6) ^ 0x3c6ef372, sd(0), sd(4) ^ 0xa54ff53a); for (let i = 0; i < 12; i++) vrng();
    let view = (() => { const x = vrng() * 100; return x < 40 ? 'Across the table' : x < 62 ? 'From the side' : x < 78 ? 'Leaning in' : x < 91 ? 'From above' : 'Eye to the card'; })();
    if (home) view = 'Across the table';
    const nrng = sfc(sd(3) ^ 0xd1c3334a, sd(7) ^ 0xbb67ae85, sd(1) ^ 0x3c6ef372, sd(5)); for (let i = 0; i < 12; i++) nrng();
    const nW = nrng() * 100, nLamp = nrng() * 100;
    const keepOld = home || (world === 'castle' && stock === 'cream');
    if (!keepOld && nW < 12) world = 'lighthouse'; else if (!keepOld && nW < 22) world = 'viaduct';
    const lowLamp = !keepOld && nLamp < 20;
    if (stock === 'gold') hour = 'Night';
    if (!flap) secret = 'None';
    const WN = { harbour: 'Harbour Town', castle: 'Castle Wood', mountain: 'Mountain Pass', desert: 'Caravan Stop', sky: 'Sky Garden', lighthouse: 'Lighthouse Rock', viaduct: 'Viaduct Valley' };
    const SN = { cream: 'Cream & Ink', card: 'Coloured Card', white: 'White Relief', vellum: 'Vellum', gold: 'Gold Foil Night' };
    const SLN = { harbour: 'boat slot', castle: 'rider slot', mountain: 'cable car', desert: 'caravan slot', sky: 'airship slot', lighthouse: 'boat slot', viaduct: 'train' };
    return [
      ['World', WN[world]],
      ['Stock', SN[stock] + ', ' + binding.toLowerCase() + ' binding'],
      ['Hour', hour],
      ['Season', season],
      ['Lamp', lowLamp ? 'Low lamp' : 'Reading lamp'],
      ['Mechanisms', ['sky wheel', SLN[world]].concat(wheel ? ['season wheel'] : [], flap ? ['swing wall'] : []).join(', ')],
      ['Hidden room', secret],
      ['View', view],
      ['Extra', extra],
    ];
  },
});
// ==== end roll ====

// ==== roll 010 ====
ProtoRolls.add(10, {
  traits: {"species":{"look":true,"values":{"pilgrims":260481,"drifters":239965,"tumblers":200460,"lanterns":159329,"tissue bloom":139765}},"optics":{"look":true,"values":{"dark field, verdigris":83501,"dark field, amber":83386,"dark field, moonlit":83233,"stained slide, eosin":80397,"stained slide, gram":80097,"stained slide, methylene":79538,"ink bloom, abyssal":75246,"ink bloom, foxfire":75150,"ink bloom, coral":74927,"interference contrast, olive":57171,"interference contrast, slate":57137,"interference contrast, tint plate":56555,"polarised, second order":39871,"polarised, first order":39609,"phase contrast, green filter":34182}},"population":{"values":{"thriving":517771,"teeming":279439,"sparse":202790}},"formation":{"look":true,"values":{"scattered":460097,"colony":240724,"procession":178665,"milling ring":120514}},"magnification":{"values":{"low power":508515,"high power":263177,"single cell":123282,"oil immersion":105026}},"medium":{"look":true,"values":{"drifting current":379492,"still":359577,"swirling":260931}},"gait":{"look":true,"values":{"gliding":450245,"spinning":299337,"darting":250418}},"lens":{"look":true,"values":{"vignetted":429957,"clean":350694,"dusty slide":219349}},"mutation":{"values":{"none":660205,"predators":99854,"crimson strain":90531,"giant":89953,"twin lineages":59457}}},
  roll(hash) {
    const HOME = '0xc60db8dd26943f8654506143fbda2d0cc770c583b833e991d604a54cf34d05e0';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME;
    let hs = 0;
    for (let i = 2; i < 66; i += 8) hs = (hs ^ parseInt(hash.slice(i, i + 8), 16)) * 2654435761 >>> 0;
    const mk = s0 => { let st = s0; return () => { st = st + 0x6D2B79F5 | 0; let t = Math.imul(st ^ st >>> 15, 1 | st); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const rnd = mk(hs || 1);
    const pw = (r, list) => { let tot = 0; for (const o of list) tot += o[1]; let x = r() * tot; for (const o of list) { x -= o[1]; if (x <= 0) return o[0]; } return list[list.length - 1][0]; };
    const SPECIES = [['pilgrims', 26], ['drifters', 24], ['tumblers', 20], ['lanterns', 16], ['tissue bloom', 14]];
    let sp = pw(rnd, SPECIES);
    let PRES = pw(rnd, [['dark field', 38], ['ink bloom', 30], ['stained slide', 24], ['polarised', 8]]);
    const PALS = {
      'dark field': ['moonlit', 'amber', 'verdigris'], 'ink bloom': ['abyssal', 'coral', 'foxfire'], 'stained slide': ['eosin', 'methylene', 'gram'],
      'polarised': ['first order', 'second order'], 'phase contrast': ['green filter'], 'interference contrast': ['slate', 'olive', 'tint plate'],
    };
    if (home) { sp = 'drifters'; PRES = 'dark field'; }
    const rnd3 = mk((hs ^ 0x2545F491) >>> 0 || 3);
    if (!home && (PRES === 'dark field' || PRES === 'ink bloom') && rnd3() < 0.25) PRES = 'interference contrast';
    const rnd4 = mk((hs ^ 0x68E31DA4) >>> 0 || 5);
    if (!home && PRES === 'dark field' && rnd4() < 0.12) PRES = 'phase contrast';
    const pal = PALS[PRES][Math.floor(rnd() * PALS[PRES].length)];
    let POP = pw(rnd, [['sparse', 22], ['thriving', 50], ['teeming', 28]]);
    const MED = pw(rnd, [['still', 36], ['drifting current', 38], ['swirling', 26]]);
    const LENS = pw(rnd, [['clean', 35], ['vignetted', 43], ['dusty slide', 22]]);
    let GAIT = pw(rnd, [['gliding', 45], ['spinning', 30], ['darting', 25]]);
    const MUT = pw(rnd, [['none', 66], ['giant', 9], ['crimson strain', 9], ['twin lineages', 6], ['predators', 10]]);
    if (home) { POP = 'teeming'; GAIT = 'spinning'; }
    const rnd2 = mk((hs ^ 0x5BD1E995) >>> 0 || 7);
    let FORM = pw(rnd2, [['scattered', 46], ['colony', 24], ['procession', 18], ['milling ring', 12]]);
    let MAG = pw(rnd2, [['low power', 58], ['high power', 30], ['oil immersion', 12], ['single cell', 14]]);
    if (home) { FORM = 'scattered'; MAG = 'low power'; }
    if (PRES === 'polarised' && POP === 'sparse') POP = 'thriving';
    return [['species', sp], ['optics', PRES + ', ' + pal], ['population', POP], ['formation', FORM], ['magnification', MAG], ['medium', MED], ['gait', GAIT], ['lens', LENS], ['mutation', MUT]];
  },
});
// ==== end roll ====

// ==== roll 025 ====
ProtoRolls.add(25, {
  traits: {"Season":{"look":true,"values":{"Snowy forest":315300,"Summer fireflies":267397,"Autumn rain":225001,"Misty spring":192302}},"Country":{"look":true,"values":{"Steppe":284326,"Lake country":270267,"Mountain line":225255,"Coast":180302,"Salt flat":39850}},"Compartment":{"look":true,"values":{"Old wood sleeper":450119,"Modern couchette":350232,"Brass luxury car":199649}},"Lamp":{"look":true,"values":{"Cream pleated shade":450672,"Amber silk shade":349551,"Green glass shade":199777}},"Moon":{"look":true,"values":{"Full moon":288043,"Gibbous moon":240589,"Half moon":199525,"Crescent":191582,"Low amber moon":80261}},"Pace":{"look":true,"values":{"Night express":470181,"Slow stopping train":385355,"Standing at a station":144464}},"Rare":{"values":{"None":820011,"A train passing the other way":80576,"Aurora over the steppe":59563,"Stars mirrored in a salt flat":39850}},"Lamp lit":{"values":{"On":800167,"Off: moonlight only":199833}},"Blind":{"values":{"Up":729725,"Half drawn":270275}}},
  roll(hash) {
    const HOME = '0x4e34d3a7e5fefe418b4245de6c5d0d97a972f6b5210e1df9880345bee575b871';
    const out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const c = { home: hash === HOME, hash, trait: T };
      const hx = c.hash.slice(2);
      const mkR = off => {
        let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
        const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
        for (let i = 0; i < 15; i++) f();
        return f;
      };
      const R = mkR(0);
      const pick = w => { let s = 0; for (const x of w) s += x; let r = R() * s; for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i; } return w.length - 1; };
      let season = pick([30, 25, 25, 20]);         // snow, summer, autumn rain, spring mist
      let region = pick([30, 25, 25, 20]);         // lake country, steppe, mountain line, coast
      let style = pick([45, 35, 20]);              // old wood sleeper, modern couchette, brass luxury
      let lampK = pick([45, 35, 20]);              // cream pleated, amber silk, green glass
      let moonK = pick([30, 25, 20, 17, 8]);       // full, gibbous, half, crescent, low amber
      let pace = pick([55, 45]);                   // night express, slow stopping train
      let rare = pick([82, 8, 6, 4]);              // none, passing train, aurora over the steppe, salt flat
      if (c.home) { season = 1; region = 0; style = 0; lampK = 0; moonK = 0; pace = 0; rare = 0; }
      if (rare === 2) { region = 1; if (season === 2) season = 0; }
      if (rare === 3) { if (season === 2 || season === 3) season = 1; if (moonK < 2) moonK = 3; }
      const SEAS = ['Snowy forest', 'Summer fireflies', 'Autumn rain', 'Misty spring'];
      const REGS = ['Lake country', 'Steppe', 'Mountain line', 'Coast'];
      const STYS = ['Old wood sleeper', 'Modern couchette', 'Brass luxury car'];
      const LMPS = ['Cream pleated shade', 'Amber silk shade', 'Green glass shade'];
      const MNS = ['Full moon', 'Gibbous moon', 'Half moon', 'Crescent', 'Low amber moon'];
      c.trait('Season', SEAS[season]);
      c.trait('Country', rare === 3 ? 'Salt flat' : REGS[region]);
      c.trait('Compartment', STYS[style]);
      c.trait('Lamp', LMPS[lampK]);
      c.trait('Moon', MNS[moonK]);
      c.trait('Pace', ['Night express', 'Slow stopping train'][pace]);
      c.trait('Rare', ['None', 'A train passing the other way', 'Aurora over the steppe', 'Stars mirrored in a salt flat'][rare]);
      const reg = rare === 3 ? 4 : region;
      // the art's draws on R between the traits above and the blind (moon, curtain, coat, seed, start, position, other train)
      R(); R(); R(); R(); R(); R();
      if (!c.home) R();
      if (reg === 4) R();
      const RST = mkR(24), atStation = !c.home && rare < 2 && RST() < 0.16;
      if (!c.home) R();
      if (atStation) c.trait('Pace', 'Standing at a station');
      if (!c.home) R();
      let blind = 0.105;
      if (!c.home && rare < 2 && R() < 0.3) blind = 0.2 + R() * 0.17;
      const RL = mkR(16), lampOff = !c.home && RL() < 0.2;
      c.trait('Lamp lit', lampOff ? 'Off: moonlight only' : 'On');
      c.trait('Blind', blind > 0.15 ? 'Half drawn' : 'Up');
    return out;
  },
});
// ==== end roll ====

// ==== roll 027 ====
ProtoRolls.add(27, {
  traits: {"Town":{"look":true,"values":{"Wooden mountain village":269931,"Narrow old townhouses":249900,"Brick mill town":249861,"Harbour lane":230308}},"Light":{"look":true,"values":{"Sodium orange lamps":380465,"Cool white lamps":300022,"Full moon breaking through":179762,"Blue-hour dusk":139751}},"Snowfall":{"look":true,"values":{"Fine powder":468857,"Big wet flakes":350091,"Wind-driven blizzard":181052}},"Moment":{"values":{"First dusting":576369,"An hour in":223759,"Rare deep snow":199872}},"Detail":{"look":true,"values":{"Lit shop window":399820,"A snowman someone left":350482,"Fox tracks across the street":249698}},"Rare":{"values":{"None":859795,"Aurora":70215,"Road just ploughed":69990}},"Viewpoint":{"look":true,"values":{"Looking down the street":483334,"Turned to the houses across":280180,"On the pavement by the lamp":236486}},"Next door":{"values":{"A house behind the fence":841297,"An empty lot":158703}}},
  roll(hash) {
    const HOME = '0xc271eac88ee81d52d2b56dbea3c701ed912fda009274c14705b9abcc7e672dd5';   // hashFor(26, 0)
    const home = hash === HOME;
    const words = []; for (let i = 0; i < 8; i++) words.push(parseInt(hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0);
    // the art's sfc32 (its state in an Int32Array: here plain int32 locals)
    const mkR = (a0, b0, c0, d0) => { let a = a0 | 0, b = b0 | 0, cc = c0 | 0, d = d0 | 0; const f = () => { let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 12; i++) f(); return f; };
    const RT = mkR(words[0], words[1], words[2], words[3]);
    const pick = (r, o) => { let s = 0; for (const x of o) s += x[1]; let v = r() * s; for (const x of o) { v -= x[1]; if (v < 0) return x[0]; } return o[o.length - 1][0]; };
    let TOWN = pick(RT, [['village', 27], ['mill', 25], ['harbour', 23], ['town', 25]]);
    let LIGHT = pick(RT, [['sodium', 38], ['white', 30], ['moon', 18], ['dusk', 14]]);
    let FALL = pick(RT, [['powder', 40], ['wet', 35], ['blizzard', 25]]);
    let DEEP = RT() < 0.2;
    let DETAIL = pick(RT, [['shop', 40], ['snowman', 35], ['fox', 25]]);
    let RARE = pick(RT, [['none', 86], ['aurora', 7], ['plough', 7]]);
    if (RARE === 'aurora' && FALL === 'blizzard') FALL = 'powder';
    if (home) { TOWN = 'town'; LIGHT = 'sodium'; FALL = 'wet'; DEEP = false; DETAIL = 'shop'; RARE = 'none'; }
    const RV = mkR(words[2] ^ 0x27d4eb2d, words[7] ^ 0x165667b1, words[5] ^ words[0], words[3] ^ 0x85ebca6b);
    let VIEW = home ? 'street' : pick(RV, [['street', 58], ['across', 42]]);
    const RN = mkR(words[6] ^ 0xbf34bd14, words[0] ^ 0x9da4a428, words[4] ^ words[2], words[1] ^ 0x016b56b8);
    const rnSide = RN(), rnView = RN(), rnHour = RN(), rnLot = RN();
    if (!home && rnView < (VIEW === 'across' ? 1 / 3 : 1 / 6)) VIEW = 'walk';
    const HOUR = !home && !DEEP && RARE !== 'plough' && rnHour < 0.3;
    const LOT = !home && VIEW !== 'across' && rnLot < 0.22;
    if (HOUR && FALL === 'blizzard') FALL = 'powder';
    return [
      ['Town', { village: 'Wooden mountain village', mill: 'Brick mill town', harbour: 'Harbour lane', town: 'Narrow old townhouses' }[TOWN]],
      ['Light', { sodium: 'Sodium orange lamps', white: 'Cool white lamps', moon: 'Full moon breaking through', dusk: 'Blue-hour dusk' }[LIGHT]],
      ['Snowfall', { powder: 'Fine powder', wet: 'Big wet flakes', blizzard: 'Wind-driven blizzard' }[FALL]],
      ['Moment', DEEP ? 'Rare deep snow' : HOUR ? 'An hour in' : 'First dusting'],
      ['Detail', { shop: 'Lit shop window', snowman: 'A snowman someone left', fox: 'Fox tracks across the street' }[DETAIL]],
      ['Rare', { none: 'None', aurora: 'Aurora', plough: 'Road just ploughed' }[RARE]],
      ['Viewpoint', { street: 'Looking down the street', across: 'Turned to the houses across', walk: 'On the pavement by the lamp' }[VIEW]],
      ['Next door', LOT ? 'An empty lot' : 'A house behind the fence'],
    ];
  },
});
// ==== end roll ====

// ==== roll 029 ====
ProtoRolls.add(29, {
  traits: {"Era":{"look":true,"values":{"Steam, crimson coaches":102362,"Red diesel, goods":89706,"Blue electric commuter":78159,"Silver streamliner":29773}},"Scenery":{"look":true,"values":{"Market town":89811,"Alpine village":80985,"Desert mesa":66047,"Harbour town":63157}},"Track plan":{"look":true,"values":{"Passing loop and siding":107660,"Dogbone with station":96405,"Figure of eight":95935}},"Room":{"look":true,"values":{"Attic with skylight":113978,"Basement workshop":113406,"Christmas table":72616}},"Signals":{"values":{"Colour light":168597,"Semaphore":131403}},"Traffic":{"values":{"Two trains":199777,"One train":100223}},"Night lamps":{"values":{"Warm":179910,"Cool white":84094,"Festoon bulbs":35996}},"Rare":{"values":{"None":245794,"Ghost train":18111,"Working waterfall":18080,"Circus train":18015}},"View":{"values":{"Operator's seat":168218,"From the corner":72857,"Lineside":36666,"From the stepladder":22259}}},
  roll(hash) { return ((Math) => {   // Math as a local: a bare context looks globals up slowly
    const HOME = '0x47882e7fedc54db0a3b6bd73088e0e2f0ffa2bb935245ce0312aa85e7460b04b';
    const out = [];
    const c = { hash, home: hash === HOME, trait(n, v) { out.push([n, String(v)]); return v; } };
    const PI = Math.PI, TAU = PI * 2, D2R = PI / 180;
    const cl = (x, a, b) => x < a ? a : x > b ? b : x;
    const mix = (a, b, t) => a + (b - a) * t;
    const sm = (a, b, x) => { const t = cl((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    const hyp = (a, b, c) => Math.sqrt(a * a + b * b + (c ? c * c : 0));
    const HX = c.hash.replace(/^0x/, '').padEnd(64, '0');
    const W8 = []; for (let i = 0; i < 8; i++) W8.push(parseInt(HX.slice(i * 8, i * 8 + 8), 16) >>> 0);
    const sfc = (a0, b0, d0, e0) => { const st = new Int32Array([a0, b0, d0, e0]); return () => { let a = st[0], b = st[1], d = st[2], e = st[3]; const t = (a + b | 0) + e | 0; e = e + 1 | 0; a = b ^ b >>> 9; b = d + (d << 3) | 0; d = d << 21 | d >>> 11; d = d + t | 0; st[0] = a; st[1] = b; st[2] = d; st[3] = e; return (t >>> 0) / 4294967296; }; };
    const R = sfc(W8[0], W8[1], W8[2], W8[3]), Q = sfc(W8[4], W8[5], W8[6], W8[7] ^ 0x9e3779b9);
    for (let i = 0; i < 15; i++) { R(); Q(); }
    const wpick = (ws, r) => { let s = 0; for (const w of ws) s += w; let x = r * s; for (let i = 0; i < ws.length; i++) { x -= ws[i]; if (x < 0) return i; } return ws.length - 1; };
    const QR = (a, b) => a + (b - a) * Q(), QI = (a, b) => a + Math.floor(Q() * (b - a + 1));

    // ---------- the variation (every trait first) ----------
    let ERA = wpick([34, 30, 26, 10], R());      // steam + green coaches, red diesel + goods, blue electric, silver streamliner
    let SCN = wpick([27, 30, 22, 21], R());      // alpine village, market town, desert mesa, harbour town
    let PLAN = wpick([32, 36, 32], R());         // figure of eight, oval with a passing loop and a siding, dogbone with station
    let ROOM = wpick([38, 38, 24], R());         // attic, basement workshop, christmas table
    let SIG = R() < (ERA === 0 ? 0.8 : 0.25) ? 0 : 1;
    let TWO = R() < 0.62 ? 1 : 0;
    let LMP = wpick([60, 28, 12], R());          // warm, cool white, festoon
    let RARE = wpick([82, 6, 6, 6], R());        // none, circus train, ghost train, working waterfall
    const PH0 = R(), FLIP = R() < 0.5;
    if (c.home) { ERA = 0; SCN = 1; PLAN = 1; ROOM = 0; SIG = 0; TWO = 1; LMP = 0; RARE = 0; }
    if (RARE === 1 || RARE === 2) TWO = 1;
    c.trait('Era', ['Steam, crimson coaches', 'Red diesel, goods', 'Blue electric commuter', 'Silver streamliner'][ERA]);
    c.trait('Scenery', ['Alpine village', 'Market town', 'Desert mesa', 'Harbour town'][SCN]);
    c.trait('Track plan', ['Figure of eight', 'Passing loop and siding', 'Dogbone with station'][PLAN]);
    c.trait('Room', ['Attic with skylight', 'Basement workshop', 'Christmas table'][ROOM]);
    c.trait('Signals', ['Semaphore', 'Colour light'][SIG]);
    c.trait('Traffic', TWO ? 'Two trains' : 'One train');
    c.trait('Night lamps', ['Warm', 'Cool white', 'Festoon bulbs'][LMP]);
    c.trait('Rare', ['None', 'Circus train', 'Ghost train', 'Working waterfall'][RARE]);
    // the standpoint and a second landform (n12): their own stream, so no old roll moves; the home keeps the seat and one hill
    const RV = sfc(W8[2] ^ 0xb26c72, W8[7], W8[4] ^ 0x3b1d, W8[1]); for (let i = 0; i < 9; i++) RV();
    const vV = RV(), vG = RV();
    // 0 the operator's seat, 1 from the corner, 2 from the stepladder (not under the attic's roof), 3 lineside (not on a figure of eight)
    let VIEW = c.home ? 0 : vV < 0.18 ? (PLAN !== 0 ? 3 : 1) : vV < 0.30 ? (ROOM !== 0 ? 2 : 1) : vV < 0.44 ? 1 : 0;
    void vG;
    const VNAMES = ["Operator's seat", 'From the corner', 'From the stepladder', 'Lineside'];
    // the seat needs no layout; any other standpoint falls back unless its points and a signal are in frame
    if (VIEW === 0) { c.trait('View', VNAMES[0]); return out; }
    const DRYW = SCN === 2 && RARE !== 3;
    const BW = 2.4, BD = 1.6, HW = BW / 2, HD = BD / 2;
    const GA = 0.0225, RAIL = 0.0119, DS = 0.005;
    // nodes [x, z, heading deg] in the running direction; edges [from, to, ...via [x, z, deg]]; conf: edges that share a
    // block (a diamond crossing); st: station {e, s0, s1 (fractions), side or island partner}; hill, stream, road, town
    const PLANS = [
      { // figure of eight, diamond crossing in the middle, a goods siding at the front
        nodes: [[0.62, -0.42, 0], [1.04, 0, 90], [0.62, 0.42, 180], [-0.62, -0.42, 180], [-1.04, 0, 90], [-0.62, 0.42, 0], [0.16, 0.57, 0],
          [0.096, 0.088, 222.6], [-0.096, -0.088, 222.6], [-0.096, 0.088, -42.6], [0.096, -0.088, -42.6]],
        edges: [[0, 1, []], [1, 2, []], [2, 7, [0.336, 0.309, 222.6]], [7, 8, []], [8, 3, [-0.336, -0.309, 222.6]], [3, 4, []], [4, 5, []],
          [5, 9, [-0.336, 0.309, -42.6]], [9, 10, []], [10, 0, [0.336, -0.309, -42.6]], [5, 6, [-0.1, 0.57, 0]]],
        conf: [[3, 8]], st: { e: 2, a: 0, b: 0.6, pre: 0.14, side: 1, w: 0.056, fbEnd: 1 },
        hill: [-0.86, -0.5, 0.5, 0.34], stream: [[-0.6, -0.02], [-0.46, -0.3], [-0.36, -0.58], [-0.38, -0.82]],
        road: [[-0.05, -0.82], [0.1, -0.6], [0.42, -0.36], [0.6, -0.12]], town: [0.3, -0.28, 0.85, 0.22],
      },
      { // oval with a passing loop at an island platform and a goods siding
        nodes: [[-0.62, 0.4, 0], [0.62, 0.4, 0], [1.12, 0, -90], [0.42, -0.4, 180], [-0.22, -0.4, 180], [-0.36, -0.52, 180], [-1.12, 0, 90]],
        edges: [[0, 1, []], [0, 1, [-0.3, 0.28, 0], [0.3, 0.28, 0]], [1, 2, [0.72, 0.4, 0]], [2, 3, [0.72, -0.4, 180]], [3, 4, []], [4, 6, [-0.72, -0.4, 180]], [6, 0, [-0.72, 0.4, 0]], [3, 5, [-0.04, -0.52, 180]]],
        conf: [], st: { e: 0, a: 0.2, b: 0.8, island: 1, w: 0.064 },
        hill: [-0.88, -0.52, 0.5, 0.34], stream: [[-0.68, -0.1], [-0.57, -0.3], [-0.52, -0.55], [-0.54, -0.82]],
        road: [[0.2, 0.05], [0.62, 0.12], [0.86, 0.36], [0.96, 0.82]], town: [-0.45, -0.28, 0.6, 0.18],
      },
      { // dogbone: double track through an island station, a balloon at each end
        nodes: [[-0.34, 0.38, 0], [0.34, 0.38, 0], [1.12, 0, -90], [0.34, 0.26, 180], [-0.34, 0.26, 180], [-1.12, 0, 90], [0.44, 0.47, 0]],
        edges: [[0, 1, []], [1, 2, [0.626, 0.414, 10]], [2, 3, [0.82, -0.32, 180], [0.53, -0.03, 90]], [3, 4, []], [4, 5, [-0.53, -0.03, -90], [-0.82, -0.32, 180]], [5, 0, [-0.626, 0.414, -10]],
          [0, 6, [0.02, 0.47, 0]]],   // a goods siding off the front road, toward the operator
        conf: [], st: { e: 0, a: 0.02, b: 0.98, island: 3, w: 0.058, fbEnd: 1 },
        hill: [-0.9, -0.5, 0.48, 0.34], stream: [[-0.8, 0.05], [-0.7, -0.22], [-0.6, -0.5], [-0.6, -0.82]],
        road: [[0.05, -0.62], [0.3, -0.2], [0.52, 0.15], [0.58, 0.82]], town: [-0.42, -0.65, 0.45, 0.12],
      },
    ];
    const PL = PLANS[PLAN];
    if (FLIP && !c.home) { // a mirrored board (x -> -x): headings mirror, the running direction stays consistent
      const mx = p => { p[0] = -p[0]; if (p.length > 2) p[2] = 180 - p[2]; };
      PL.nodes.forEach(mx); PL.edges.forEach(e => e.slice(2).filter(v => v.length).forEach(mx)); PL.hill[0] = -PL.hill[0];
      PL.stream.forEach(p => p[0] = -p[0]); PL.road.forEach(p => p[0] = -p[0]);
      PL.town = [-PL.town[2], PL.town[1], -PL.town[0], PL.town[3]]; if (PL.st.side) PL.st.side = -PL.st.side;
    }

    // ---------- track geometry: Hermite chains resampled every DS metres ----------
    function buildEdge(pts) {
      const dx = [], dz = [];
      for (let i = 0; i + 1 < pts.length; i++) {
        const [x0, z0, a0] = pts[i], [x1, z1, a1] = pts[i + 1];
        const ch = hyp(x1 - x0, z1 - z0); let th = Math.abs(Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0)));
        const m = th < 1e-3 ? ch : ch * 2 * Math.tan(th / 4) / Math.sin(th / 2);
        const t0x = Math.cos(a0) * m, t0z = Math.sin(a0) * m, t1x = Math.cos(a1) * m, t1z = Math.sin(a1) * m;
        for (let k = i ? 1 : 0; k <= 64; k++) {
          const t = k / 64, t2 = t * t, t3 = t2 * t, h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + t, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
          dx.push(h00 * x0 + h10 * t0x + h01 * x1 + h11 * t1x); dz.push(h00 * z0 + h10 * t0z + h01 * z1 + h11 * t1z);
        }
      }
      const cum = [0]; for (let i = 1; i < dx.length; i++) cum.push(cum[i - 1] + hyp(dx[i] - dx[i - 1], dz[i] - dz[i - 1]));
      const len = cum[cum.length - 1], n = Math.max(2, Math.ceil(len / DS)), ds = len / n;
      const P = new Float32Array((n + 1) * 2), T = new Float32Array((n + 1) * 2);
      for (let k = 0, j = 0; k <= n; k++) {
        const s = k * ds; while (j < cum.length - 2 && cum[j + 1] < s) j++;
        const f = cl((s - cum[j]) / Math.max(1e-9, cum[j + 1] - cum[j]), 0, 1);
        P[k * 2] = mix(dx[j], dx[j + 1], f); P[k * 2 + 1] = mix(dz[j], dz[j + 1], f);
      }
      for (let k = 0; k <= n; k++) {
        const a = Math.max(0, k - 1), b = Math.min(n, k + 1), tx = P[b * 2] - P[a * 2], tz = P[b * 2 + 1] - P[a * 2 + 1], l = hyp(tx, tz) || 1;
        T[k * 2] = tx / l; T[k * 2 + 1] = tz / l;
      }
      return { P, T, n, len, ds };
    }
    const NODES = PL.nodes.map(([x, z, a]) => ({ x, z, a: a * D2R, ins: [], outs: [], to: -1 }));
    const EDGES = PL.edges.map(([f, t, ...via], i) => {
      const nf = NODES[f], nt = NODES[t];
      const ed = buildEdge([[nf.x, nf.z, nf.a], ...via.filter(v => v.length).map(v => [v[0], v[1], v[2] * D2R]), [nt.x, nt.z, nt.a]]);
      ed.f = f; ed.t = t; ed.i = i; nf.outs.push(i); nt.ins.push(i);
      ed.blk = i; ed.tun = new Uint8Array(ed.n + 1); ed.tdep = new Float32Array(ed.n + 1);
      return ed;
    });
    for (const [a, b] of PL.conf) EDGES[b].blk = EDGES[a].blk;
    const NB = EDGES.length;
    // point on an edge at distance s from its start: [x, z, tx, tz]
    const at = (e, s, o) => {
      const E = EDGES[e], u = cl(s / E.ds, 0, E.n - 1e-6), k = Math.floor(u), f = u - k, P = E.P, T = E.T;
      o[0] = mix(P[k * 2], P[k * 2 + 2], f); o[1] = mix(P[k * 2 + 1], P[k * 2 + 3], f);
      const tx = mix(T[k * 2], T[k * 2 + 2], f), tz = mix(T[k * 2 + 1], T[k * 2 + 3], f), l = hyp(tx, tz) || 1;
      o[2] = tx / l; o[3] = tz / l; return o;
    };
    const tmp4 = [0, 0, 0, 0], tmpB = [0, 0, 0, 0];

    // turnouts: a node with two edges on one side; br[0] is the normal road, br[1] the reverse
    const TURN = [];
    NODES.forEach((N, ni) => {
      const facing = N.outs.length === 2, trailing = N.ins.length === 2;
      if (!facing && !trailing) return;
      const br = facing ? N.outs : N.ins, out = facing;
      // which side the reverse road leaves on, seen along the branches (away from the node)
      const pa = at(br[0], out ? 0.16 : EDGES[br[0]].len - 0.16, [0, 0, 0, 0]), pb = at(br[1], out ? 0.16 : EDGES[br[1]].len - 0.16, [0, 0, 0, 0]);
      const hx = Math.cos(N.a), hz = Math.sin(N.a), dir = out ? 1 : -1;
      const sg = Math.sign(((pb[0] - pa[0]) * -hz + (pb[1] - pa[1]) * hx) * dir) || 1;   // +1: the reverse road is on the right
      // the clearance point: how far from the node the two roads are a train's width apart
      let clr = 0.3;
      for (let s = 0.02; s < 0.6; s += 0.01) {
        const qa = at(br[0], out ? s : EDGES[br[0]].len - s, [0, 0, 0, 0]), qb = at(br[1], out ? s : EDGES[br[1]].len - s, [0, 0, 0, 0]);
        if (hyp(qa[0] - qb[0], qa[1] - qb[1]) > 0.055) { clr = s; break; }
      }
      N.to = TURN.length;
      TURN.push({ ni, x: N.x, z: N.z, a: N.a, br, out, sg, clr, state: 0, pos: 0, p0: 0, t0: -9, user: 0, lock: -1, pend: -1, np: 0, ng: 0, tw: -9 });
    });
    const GX = 192, GZ = 128, CW = BW / GX, NV = (GX + 1) * (GZ + 1);
    const gi = (x, z) => Math.round((z + HD) / CW) * (GX + 1) + Math.round((x + HW) / CW);
    const ih = (x, y, s) => { let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
    const vn = (x, y, s) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy); const a = ih(xi, yi, s), b = ih(xi + 1, yi, s), d = ih(xi, yi + 1, s), e = ih(xi + 1, yi + 1, s); return a + (b - a) * ux + (d - a) * uy + (a - b - d + e) * ux * uy; };
    const NOFF = QR(0, 100);
    const fbm = (x, y, s) => vn(x + NOFF, y, s) * 0.55 + vn(x * 2.1 + NOFF, y * 2.1, s + 1) * 0.3 + vn(x * 4.3 + NOFF, y * 4.3, s + 2) * 0.15;
    const [HXc, HZc, HRr, HHh] = PL.hill;
    // vn() < 1, so rr < 1.14 HRr: past HLIM (d > 1, or past the mesa's scree) the hill is exactly 0
    const HLIM = HRr * 1.15 * (SCN === 2 ? 1.36 : 1.0), HLIM2 = HLIM * HLIM;
    // the mesa's cliff line (bays up to 0.12 of the radius deep, by the angle round it) and its top (fractions of HHh)
    const MSG = HXc < 0 ? 1 : -1, MLX = MSG * 0.96, MLZ = -0.28;   // the lower bench lies toward the board's middle
    // bays: 8 to 14 round the cliff, U-shaped in plan, some broad alcoves and some narrow joint clefts, laid out by the hash's
    // spare bits (no draw on any stream), with a small jag along the whole line; blunt buttresses stand between them
    const MSEED = (W8[5] >>> 7) & 1023, NBAY = 8 + MSEED % 7, BAYS = [];
    for (let k = 0; k < NBAY; k++) { const nar = ih(k, MSEED, 31) < 0.35; BAYS.push([(k + 0.2 + 0.6 * ih(k, MSEED, 29)) / NBAY * TAU, (nar ? 0.05 + 0.04 * ih(k, MSEED, 33) : 0.13 + 0.12 * ih(k, MSEED, 33)) * 11 / NBAY, nar ? 0.07 + 0.05 * ih(k, MSEED, 35) : 0.05 + 0.06 * ih(k, MSEED, 35)]); }
    const mesaBay = ang => {
      let b = 0;
      for (const [a0, w, dp] of BAYS) { let t = ang - a0; t -= TAU * Math.round(t / TAU); t = Math.abs(t) / w; if (t < 1) b = Math.max(b, dp * Math.pow(1 - t * t, 0.6)); }
      return Math.min(0.12, b + 0.014 * vn(Math.cos(ang) * 9 + 2, Math.sin(ang) * 9 + 7, 19));
    };
    // (p3) gullies down the dry mesa's apron: 16 round it, straight down the slope (the angle only), deepest under the bays
    const RILLS = [], NRILL = 16, ROFF = ih(1, MSEED, 45) * TAU;
    const mesaRill = (ang, d) => {
      let r = 0; const w = 0.04 + 0.05 * (d - 0.93);
      for (const [a0, dp] of RILLS) { let t = ang - a0; t -= TAU * Math.round(t / TAU); t = Math.abs(t) / w; if (t < 1) r = Math.max(r, dp * (1 - t * t) * (1 - t * t)); }
      return r;
    };
    for (let k = 0; k < NRILL; k++) { const a0 = ROFF + (k + 0.5 + 0.35 * (ih(k, MSEED, 41) - 0.5)) / NRILL * TAU; RILLS.push([a0, 0.55 + 0.45 * Math.min(1, mesaBay(a0) / 0.06)]); }
    const mesaCap = (dx, dz) => { const pr = (dx * MLX + dz * MLZ) / HRr, q = (-dx * MLZ + dz * MLX) / HRr; return 1.02 - 0.06 * pr - 0.11 * sm(0.34, 0.37, pr + 0.06 * (vn(q * 5 + 3, 1.7, 23) - 0.5)); };
    const hillH = (x, z) => {
      const dx = x - HXc, dz = z - HZc;
      if (dx * dx * 0.8464 + dz * dz > HLIM2) return 0;
      const ang = Math.atan2(dz, dx);
      const rr = HRr * (0.86 + 0.28 * vn(Math.cos(ang) * 1.6 + 3, Math.sin(ang) * 1.6 + 3, 7)), d = hyp(dx * 0.92, dz) / rr;
      if (SCN === 2) { // a mesa: a flat cap on steep layered sides, scree at the foot
        const scree = sm(1.35, 0.85, d) * 0.3, nF = 0.97 + 0.06 * fbm(x * 9, z * 9, 3);
        if (!DRYW) return HHh * (Math.max(sm(1.0, 0.8, d), scree) * nF);   // the working waterfall's gorge keeps its old mesa
        // (p3) the apron is the cliff's rubble: concave, steepest where it leans on the rock, never above the old swell, cut
        // by gullies that die out by d 1.2
        const apron = d >= 1.35 ? 0 : Math.min(scree, 0.28 * Math.pow((1.35 - d) / 0.42, 2.4)) * (1 - 0.2 * mesaRill(ang, d) * sm(1.2, 0.95, d));
        // (n13) level beds: a talus of soft beds that crosses the tunnel height where the old flank did (d 0.918) and is no
        // higher than it outside d 0.93, then a cliff of one hard bed whose line is cut back into bays (never pushed out),
        // then a top that tilts a little and steps down to a lower bench on one side
        const dc = 0.82 - mesaBay(ang);
        let f = d >= 0.93 ? 0 : d >= 0.918 ? mix(0.28, 0.368, (0.93 - d) / 0.012) : d >= 0.865 ? mix(0.368, 0.55, (0.918 - d) / 0.053) : 0.55 + (0.865 - d) * 0.6;
        f = mix(Math.max(f, apron), mesaCap(dx, dz), sm(dc + 0.045, dc, d));
        return HHh * f * nF;
      }
      const base = Math.pow(sm(1.0, 0, d), SCN === 0 ? 1.55 : 1.15);
      const k = SCN === 0 ? 1.3 : SCN === 3 ? 0.92 : 0.85;
      return HHh * k * base * (0.82 + 0.36 * fbm(x * 6, z * 6, 5));
    };
    // track samples: tunnel where the hill would bury a train
    const TUNH = 0.125;
    for (const E of EDGES) {
      for (let k = 0; k <= E.n; k++) E.tun[k] = hillH(E.P[k * 2], E.P[k * 2 + 1]) > TUNH ? 1 : 0;
      // no slivers: runs shorter than 8 cm are dropped
      for (let k = 0; k <= E.n;) { let j = k; while (j <= E.n && E.tun[j] === E.tun[k]) j++; if (E.tun[k] && (j - k) * E.ds < 0.08) for (let q = k; q < j; q++) E.tun[q] = 0; k = j; }
      // distance into the tunnel (for darkening a car inside it)
      let d = 0; for (let k = 0; k <= E.n; k++) { d = E.tun[k] ? d + E.ds : 0; E.tdep[k] = d; }
      d = 0; for (let k = E.n; k >= 0; k--) { d = E.tun[k] ? d + E.ds : 0; E.tdep[k] = Math.min(E.tdep[k], d); }
    }
    function spline(pts) {
      const out = [];
      for (let i = 0; i + 1 < pts.length; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        const n = Math.ceil(hyp(p2[0] - p1[0], p2[1] - p1[1]) / 0.005);
        for (let k = i ? 1 : 0; k <= n; k++) {
          const t = k / n, t2 = t * t, t3 = t2 * t;
          const f = (a, b, d, e) => 0.5 * ((2 * b) + (-a + d) * t + (2 * a - 5 * b + 4 * d - e) * t2 + (-a + 3 * b - 3 * d + e) * t3);
          out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
        }
      }
      return out;
    }
    const STREAM = spline(PL.stream), ROAD = spline(PL.road);
    const SWH = 0.032, RDH = 0.024;
    // the stream and road distance fields (stamp()'s nearest-point grid), read only where a signal could stand
    const STW = [], STR = [];
    for (let i = 0; i < STREAM.length; i++) if (!(i & 1) || i === STREAM.length - 1) STW.push(STREAM[i][0], STREAM[i][1]);
    for (let i = 0; i < ROAD.length; i += (i & 1) || i + 1 === ROAD.length ? 1 : 2) STR.push(ROAD[i][0], ROAD[i][1]);
    const fW = { pts: STW, rad: 0.12 }, fR = { pts: STR, rad: 0.08 };
    const fieldAt = (Fd, x, z) => {
      const k = gi(cl(x, -HW, HW), cl(z, -HD, HD)), i = k % (GX + 1), j = (k - i) / (GX + 1), pts = Fd.pts, rad = Fd.rad;
      let v = 1;
      for (let q = 0; q < pts.length; q += 2) {
        const px = pts[q], pz = pts[q + 1];
        const i0 = Math.max(0, Math.floor((px - rad + HW) / CW)), i1 = Math.min(GX, Math.ceil((px + rad + HW) / CW));
        const j0 = Math.max(0, Math.floor((pz - rad + HD) / CW)), j1 = Math.min(GZ, Math.ceil((pz + rad + HD) / CW));
        if (i < i0 || i > i1 || j < j0 || j > j1) continue;
        const dz = j * CW - HD - pz, dz2 = dz * dz, dx = i * CW - HW - px, d = Math.sqrt(dx * dx + dz2);
        if (d < v) v = Math.fround(d);
      }
      return v;
    };
    const SIGS = [];
    const CONF = new Set(PL.conf.flat());
    NODES.forEach((N, ni) => {
      if (!N.outs.length) return;
      for (const e of N.ins) {
        if (CONF.has(e)) continue;
        const E = EDGES[e], stopd = N.ins.length === 2 ? TURN[N.to].clr + 0.03 : 0.06;
        const s = Math.max(0.05, E.len - stopd), p = at(e, s, [0, 0, 0, 0]), k = Math.round(s / E.ds);
        let side = -1, best = -1;
        for (const sd of [-1, 1]) {
          const x = p[0] - p[3] * sd * 0.042, z = p[1] + p[2] * sd * 0.042; let md = 9;
          for (const F of EDGES) for (let q = 0; q <= F.n; q += 2) md = Math.min(md, hyp(F.P[q * 2] - x, F.P[q * 2 + 1] - z));
          if (fieldAt(fW, x, z) < SWH + 0.01 || fieldAt(fR, x, z) < RDH + 0.004) md = 0;
          if (md > best + 0.004) { best = md; side = sd; }
        }
        SIGS.push({ e, s, x: p[0] - p[3] * side * 0.042, z: p[1] + p[2] * side * 0.042, tx: p[2], tz: p[3], side, node: ni, jn: N.outs.length === 2 ? N.to : -1,
          hide: !!(E.tun[k] || E.tdep[Math.max(0, k - 8)] > 0), held: false, clear: 0, arm: 0, feather: 0, y: 0 });
      }
    });
    const mm = (a, b) => { const o = new Float32Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; o[i * 4 + j] = s; } return o; };
    const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const nrm3 = a => { const l = hyp(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
    const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const persp = (fov, n, f) => { const t = 1 / Math.tan(fov / 2); return new Float32Array([t, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0]); };
    const ortho = (r, n, f) => new Float32Array([1 / r, 0, 0, 0, 0, 1 / r, 0, 0, 0, 0, -2 / (f - n), 0, 0, 0, -(f + n) / (f - n), 1]);
    const lookAt = (e, t, up) => { const z = nrm3(sub3(e, t)), x = nrm3(crs(up, z)), y = crs(z, x); return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot3(x, e), -dot3(y, e), -dot3(z, e), 1]); };
    // ---------- the standpoint ----------
    // the seat is the old fixed, high three-quarter view; the corner stands off the front corner away from the hill and looks
    // along the diagonal at it; the stepladder looks almost straight down on the plan; lineside stands at the fascia beside the
    // points at a platform end and looks along the platform at the back sheet
    const camOf = v => {
      const m = FLIP && !c.home ? -1 : 1;
      if (v === 1) return { yaw: 40 * m, el: 24, d: 2.3, fov: 38, ct: [-0.1 * m, 0.02, 0.12], near: 0.8, ap: 6.5, foc: null };
      if (v === 2) return { yaw: 4 * m, el: 70, d: 3.35, fov: 40, ct: [0, 0, 0.06], near: 0.8, ap: 3.25, foc: null };
      if (v === 3) {
        const E = EDGES[PL.st.e], q0 = at(E.i, E.len * PL.st.a, [0, 0, 0, 0]), q1 = at(E.i, E.len * PL.st.b, [0, 0, 0, 0]);
        let T = TURN[0], bd = 9;
        for (const t of TURN) for (const q of [q0, q1]) { const d = hyp(t.x - q[0], t.z - q[1]) + (Math.sign(t.x) === Math.sign(HXc) ? 0.01 : 0); if (d < bd) { bd = d; T = t; } }
        const sg = T.x > (q0[0] + q1[0]) / 2 ? 1 : -1;
        return { yaw: 30 * sg, el: 15, d: 1.15, fov: 38, ct: [T.x - sg * 0.28, 0.035, T.z - 0.14], near: 0.08, ap: 3.5, foc: [T.x, 0.01, T.z] };
      }
      return { yaw: 9, el: 33, d: 2.42, fov: 40, ct: [0.0, 0.04, 0.1], near: 0.8, ap: 6.5, foc: [0.05, 0.0, 0.05] };
    };
    const vpOf = C => { const y = C.yaw * D2R, e = C.el * D2R, cam = [C.ct[0] + Math.sin(y) * Math.cos(e) * C.d, C.ct[1] + Math.sin(e) * C.d, C.ct[2] + Math.cos(y) * Math.cos(e) * C.d];
      return { cam, VP: mm(persp(C.fov * D2R, C.near, 8.0), lookAt(cam, C.ct, [0, 1, 0])) }; };
    // a view with no points or no signal in reach falls back to the corner, and the corner to the seat
    const reach = v => { const M = vpOf(camOf(v)).VP, inF = (x, y, z) => { const w = M[3] * x + M[7] * y + M[11] * z + M[15]; if (w <= 0) return 0;
        const u = (M[0] * x + M[4] * y + M[8] * z + M[12]) / w * 0.5 + 0.5, t = 0.5 - (M[1] * x + M[5] * y + M[9] * z + M[13]) / w * 0.5; return u > 0.05 && u < 0.95 && t > 0.05 && t < 0.95 ? 1 : 0; };
      let p = 0, g = 0; for (const T of TURN) p += inF(T.x, 0.01, T.z); for (const q of SIGS) if (!q.hide) g += inF(q.x, 0.03, q.z); return p > 0 && g > 0; };
    if (VIEW >= 2 && !reach(VIEW)) VIEW = 1;
    if (VIEW === 1 && !reach(1)) VIEW = 0;
    c.trait('View', VNAMES[VIEW]);
    return out;
  })(Math); },
});
// ==== end roll ====

// ==== roll 035 ====
ProtoRolls.add(35, {
  traits: {"Aurora colour":{"look":true,"values":{"Classic green":499520,"Green with red tops":280361,"Pink-fringed storm":150067,"All-red great storm":70052}},"Form":{"look":true,"values":{"Rayed band":369869,"Quiet arc":270370,"Corona":199990,"Pulsating patches":159771}},"Shore":{"look":true,"values":{"Spruce and cabin":340226,"Bare mountains, frozen waterfall":239778,"Fjord with fishing hut":220347,"Tundra with lone tent":199649}},"Ice":{"look":true,"values":{"Black clear ice":400863,"Wind-carved snow":349324,"Pressure ridges":249813}},"Moon":{"look":true,"values":{"None":460299,"Crescent":339670,"Full":200031}},"Something rare":{"values":{"None":699561,"Meteor":140503,"STEVE":90141,"Sunlit blue tops":69795}},"View":{"values":{"Across the lake":580868,"Looking up":238855,"Long lens on the shore":180277}}},
  roll(hash) {
    const HOME = '0x6dfbc16953a93d9185250a5345c6f5da97ca9ac449dce098a38eab3df39d669e';   // hashFor(34, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let colour = pick([['Classic green', 50], ['Green with red tops', 28], ['Pink-fringed storm', 15], ['All-red great storm', 7]]);
    let form = pick([['Quiet arc', 27], ['Rayed band', 37], ['Corona', 20], ['Pulsating patches', 16]]);
    let shoreN = pick([['Spruce and cabin', 34], ['Bare mountains, frozen waterfall', 24], ['Fjord with fishing hut', 22], ['Tundra with lone tent', 20]]);
    let iceN = pick([['Black clear ice', 40], ['Wind-carved snow', 35], ['Pressure ridges', 25]]);
    let moonN = pick([['None', 46], ['Crescent', 34], ['Full', 20]]);
    let rare = pick([['None', 70], ['Meteor', 14], ['STEVE', 9], ['Sunlit blue tops', 7]]);
    if (home) { colour = 'Green with red tops'; form = 'Rayed band'; shoreN = 'Spruce and cabin'; iceN = 'Black clear ice'; moonN = 'Crescent'; rare = 'None'; }
    let view = pick([['Across the lake', 58], ['Looking up', 24], ['Long lens on the shore', 18]], mkR(24));
    if (home) view = 'Across the lake';
    return [['Aurora colour', colour], ['Form', form], ['Shore', shoreN], ['Ice', iceN], ['Moon', moonN], ['Something rare', rare], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 036 ====
ProtoRolls.add(36, {
  traits: {"Candle":{"look":true,"values":{"Brass taper":300408,"Ivory pillar":279420,"Beeswax":219923,"Bottle candle":140106,"Tea light in water":60143}},"Setting":{"look":true,"values":{"Windowsill":312004,"Old desk":279864,"Kitchen table":219898,"Stone niche":188234}},"Draught":{"look":true,"values":{"Window draught":400398,"Still":399953,"Gusty":199649}},"Age":{"look":true,"values":{"Half-burnt":449791,"Fresh":300396,"Stub":249813}},"Night":{"look":true,"values":{"Rain and streetlamps":340263,"Moonlit":339615,"Pitch dark":260116,"Snowfall":60006}},"Wick":{"look":true,"values":{"Curled":499979,"Straight":299881,"Mushroomed":200140}},"Rare":{"values":{"None":860266,"Moth":83660,"Twin flames":56074}},"View":{"look":true,"values":{"Close":421065,"Across the room":299230,"Low across the table":279705}}},
  roll(hash) {
    const HOME = '0x4a184270dabfe378d3cb64e00b18e38525fd816d17dcf1a63807d9cdca1e9bc0';   // hashFor(35, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let candle = pick([['Brass taper', 30], ['Ivory pillar', 28], ['Beeswax', 22], ['Bottle candle', 14], ['Tea light in water', 6]]);
    let setting = pick([['Windowsill', 30], ['Old desk', 28], ['Stone niche', 20], ['Kitchen table', 22]]);
    let draught = pick([['Still', 40], ['Window draught', 40], ['Gusty', 20]]);
    let age = pick([['Fresh', 30], ['Half-burnt', 45], ['Stub', 25]]);
    let night = pick([['Rain and streetlamps', 34], ['Moonlit', 34], ['Pitch dark', 26], ['Snowfall', 6]]);
    let wick = pick([['Curled', 50], ['Straight', 30], ['Mushroomed', 20]]);
    let rare = pick([['None', 86], ['Twin flames', 7], ['Moth', 7]]);
    if (home) { candle = 'Ivory pillar'; setting = 'Windowsill'; draught = 'Window draught'; age = 'Half-burnt'; night = 'Rain and streetlamps'; wick = 'Curled'; rare = 'None'; }
    if (night === 'Snowfall' && setting === 'Stone niche') setting = 'Windowsill';
    if (rare === 'Twin flames' && (candle === 'Tea light in water' || candle === 'Bottle candle')) rare = 'Moth';
    const RX = mkR(6), ACR = RX() < 0.3 && !home;
    const RW = mkR(24);
    let view = pick([['Close', 60], ['Low across the table', 40]], RW);
    if (home) view = 'Close';
    if (ACR) view = 'Across the room';
    return [['Candle', candle], ['Setting', setting], ['Draught', draught], ['Age', age], ['Night', night], ['Wick', wick], ['Rare', rare], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 037 ====
ProtoRolls.add(37, {
  traits: {"lantern":{"look":true,"values":{"paper drum and candle":440294,"pierced tin":299575,"coloured glass":189890,"magic lantern":70241}},"drums":{"look":true,"values":{"animals walking / space and planets":45594,"animals walking / circus parade":41343,"animals walking / forest and birds":41251,"animals walking / sea and ships":40677,"sea and ships / space and planets":34344,"forest and birds / space and planets":31583,"sea and ships / circus parade":30475,"sea and ships / animals walking":30202,"sea and ships / forest and birds":30143,"forest and birds / animals walking":27705,"forest and birds / circus parade":27603,"forest and birds / sea and ships":27313,"circus parade / space and planets":25752,"circus parade / sea and ships":22114,"circus parade / forest and birds":22055,"circus parade / animals walking":21960,"space and planets / forest and birds":12459,"animals walking / space and planets / circus parade":12431,"space and planets / circus parade":12375,"space and planets / animals walking":12355,"space and planets / sea and ships":12351,"animals walking / space and planets / forest and birds":12349,"animals walking / space and planets / sea and ships":12330,"animals walking / forest and birds / circus parade":11408,"animals walking / sea and ships / circus parade":11373,"animals walking / forest and birds / space and planets":11336,"animals walking / sea and ships / forest and birds":11321,"animals walking / circus parade / sea and ships":11266,"animals walking / circus parade / forest and birds":11252,"animals walking / forest and birds / sea and ships":11211,"animals walking / circus parade / space and planets":11147,"animals walking / sea and ships / space and planets":11045,"sea and ships / space and planets / forest and birds":9405,"sea and ships / space and planets / circus parade":9380,"sea and ships / space and planets / animals walking":9307,"forest and birds / space and planets / animals walking":8630,"forest and birds / space and planets / sea and ships":8617,"forest and birds / space and planets / circus parade":8530,"sea and ships / animals walking / circus parade":8328,"sea and ships / animals walking / space and planets":8306,"sea and ships / forest and birds / space and planets":8263,"sea and ships / forest and birds / animals walking":8215,"sea and ships / circus parade / forest and birds":8210,"sea and ships / animals walking / forest and birds":8206,"sea and ships / forest and birds / circus parade":8200,"sea and ships / circus parade / animals walking":8167,"sea and ships / circus parade / space and planets":8117,"forest and birds / circus parade / animals walking":7630,"forest and birds / animals walking / circus parade":7589,"forest and birds / circus parade / sea and ships":7551,"forest and birds / animals walking / sea and ships":7481,"forest and birds / sea and ships / space and planets":7471,"forest and birds / sea and ships / circus parade":7434,"forest and birds / animals walking / space and planets":7418,"forest and birds / sea and ships / animals walking":7355,"forest and birds / circus parade / space and planets":7308,"circus parade / space and planets / animals walking":7289,"circus parade / space and planets / sea and ships":7167,"circus parade / space and planets / forest and birds":7157,"circus parade / animals walking / sea and ships":6134,"circus parade / forest and birds / animals walking":6072,"circus parade / forest and birds / sea and ships":6053,"circus parade / sea and ships / space and planets":6015,"circus parade / animals walking / forest and birds":5991,"circus parade / sea and ships / forest and birds":5989,"circus parade / animals walking / space and planets":5967,"circus parade / sea and ships / animals walking":5963,"circus parade / forest and birds / space and planets":5869,"space and planets / animals walking / sea and ships":3507,"space and planets / sea and ships / circus parade":3468,"space and planets / circus parade / forest and birds":3462,"space and planets / sea and ships / forest and birds":3456,"space and planets / sea and ships / animals walking":3453,"space and planets / forest and birds / animals walking":3425,"space and planets / animals walking / circus parade":3422,"space and planets / circus parade / sea and ships":3405,"space and planets / animals walking / forest and birds":3391,"space and planets / forest and birds / sea and ships":3387,"space and planets / forest and birds / circus parade":3359,"space and planets / circus parade / animals walking":3358}},"room":{"look":true,"values":{"plaster":340488,"wallpaper":318738,"wooden attic":240601,"blanket tent":100173}},"window":{"values":{"moon":500821,"snow":269534,"rain":229645}},"quilt":{"look":true,"values":{"patchwork":340497,"striped":259856,"knitted":219598,"star print":180049}},"turned by":{"values":{"candle heat":739869,"a little motor":189890,"clockwork":70241}},"rare":{"values":{"none":759700,"a cat":80366,"two lanterns":80133,"glow stars":79801}},"view":{"look":true,"values":{"from the doorway":447327,"lying in bed, looking up":300647,"from across the room":135570,"close by the lantern":82562,"lying on the rug":33894}},"stands":{"values":{"on the bedside table":591795,"on the rug":242274,"hung from the ceiling":121935,"hung from the beam":43996}}},
  roll(hash) {
    const HOME = '0xe9187423815401ba58ea22644a06e9105cfe918f3b982a16666c9c4d6d79b5ab';   // hashFor(36, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    let ra = parseInt(hx.slice(0, 8), 16) | 0, rb = parseInt(hx.slice(8, 16), 16) | 0, rc = parseInt(hx.slice(16, 24), 16) | 0, rd = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { const t = (ra + rb | 0) + rd | 0; rd = rd + 1 | 0; ra = rb ^ rb >>> 9; rb = rc + (rc << 3) | 0; rc = rc << 21 | rc >>> 11; rc = rc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const wp = o => { let s = 0; for (const e of o) s += e[1]; let r = rnd() * s; for (const e of o) { r -= e[1]; if (r <= 0) return e[0]; } return o[o.length - 1][0]; };
    let lanK = wp([['paper drum and candle', 44], ['pierced tin', 30], ['coloured glass', 19], ['magic lantern', 7]]);
    let scK = wp([['animals walking', 30], ['sea and ships', 22], ['forest and birds', 20], ['circus parade', 16], ['space and planets', 12]]);
    let roomK = wp([['plaster', 34], ['wallpaper', 32], ['wooden attic', 24], ['blanket tent', 10]]);
    let winK = wp([['moon', 50], ['snow', 27], ['rain', 23]]);
    let rareK = wp([['none', 76], ['two lanterns', 8], ['a cat', 8], ['glow stars', 8]]);
    let quiltK = wp([['patchwork', 34], ['striped', 26], ['knitted', 22], ['star print', 18]]);
    let nDr = rnd() < 0.55 ? 2 : 3;
    rnd(); rnd(); rnd(); rnd();   // palR, palR2, palR3, tuneR
    if (home) { lanK = 'paper drum and candle'; scK = 'animals walking'; roomK = 'wallpaper'; winK = 'moon'; rareK = 'none'; quiltK = 'patchwork'; nDr = 3; }
    let vs2 = (parseInt(hx.slice(32, 40), 16) ^ 0x2C1B3C6D) >>> 0;
    const rv = () => { vs2 = vs2 + 0x6D2B79F5 | 0; let t = Math.imul(vs2 ^ vs2 >>> 15, 1 | vs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let camK = (r => r < 0.56 ? 'from the doorway' : r < 0.86 ? 'lying in bed, looking up' : 'close by the lantern')(rv());
    if (home) camK = 'from the doorway';
    let vs3 = (parseInt(hx.slice(48, 56), 16) ^ 0x37a040) >>> 0;
    const r3 = () => { vs3 = vs3 + 0x6D2B79F5 | 0; let t = Math.imul(vs3 ^ vs3 >>> 15, 1 | vs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const sd1 = r3();
    const free = !home && roomK !== 'blanket tent' && rareK !== 'two lanterns' && rareK !== 'a cat';
    const standT = !free ? 0 : sd1 < 0.32 ? 1 : sd1 < 0.54 ? 2 : 0;
    if (standT === 1) camK = camK === 'from the doorway' ? 'from across the room' : camK === 'close by the lantern' ? 'lying on the rug' : camK;
    if (standT === 2 && camK === 'close by the lantern') camK = 'from the doorway';
    const SCN = ['animals walking', 'sea and ships', 'forest and birds', 'circus parade', 'space and planets'];
    const drums = [scK];
    while (drums.length < nDr) { const k = SCN[Math.floor(rnd() * SCN.length) % SCN.length]; if (!drums.includes(k)) drums.push(k); }
    if (standT === 1 && drums[0] === 'space and planets') { drums[0] = drums[1]; drums[1] = 'space and planets'; }
    const style = ['paper drum and candle', 'pierced tin', 'coloured glass', 'magic lantern'].indexOf(lanK);
    const roomT = ['plaster', 'wallpaper', 'wooden attic', 'blanket tent'].indexOf(roomK);
    return [
      ['lantern', lanK], ['drums', drums.join(' / ')], ['room', roomK], ['window', winK], ['quilt', quiltK],
      ['turned by', style === 2 ? 'a little motor' : style === 3 ? 'clockwork' : 'candle heat'], ['rare', rareK], ['view', camK],
      ['stands', ['on the bedside table', 'on the rug', roomT === 2 ? 'hung from the beam' : 'hung from the ceiling'][standT]],
    ];
  },
});
// ==== end roll ====

// ==== roll 038 ====
ProtoRolls.add(38, {
  traits: {"Building":{"look":true,"values":{"High Gothic nave":399820,"Romanesque chapel":270422,"Modern concrete chapel":249786,"Ruined abbey, open to the sky":79972}},"Glass":{"look":true,"values":{"Deep medieval blue and red":286531,"Abstract colour fields":245965,"Art Nouveau greens and golds":195556,"Clear leaded glass with a roundel":191976,"Empty tracery, deep medieval blue and red fragments":28711,"Empty tracery, art nouveau greens and golds fragments":19161,"Empty tracery, clear leaded glass with a roundel fragments":17669,"Empty tracery, abstract colour fields fragments":14431}},"Season light":{"look":true,"values":{"Autumn gold":311684,"Summer high sun":250848,"Winter low sun":249585,"Dawn":187883}},"Furnishing":{"look":true,"values":{"Oak pews":334987,"Rows of chairs":325186,"Worn flagstones":259855,"Fallen leaves":79972}},"Stone":{"look":true,"values":{"Honey limestone":261967,"Pale grey limestone":224999,"Board-marked concrete":175318,"Whitewashed":150474,"Red sandstone":112774,"Whitewashed concrete":74468}},"Air":{"look":true,"values":{"Dusty air":470270,"Clear air":279412,"Incense haze":250318}},"Something rare":{"values":{"None":829818,"A rack of votive candles":110399,"Equinox alignment":59783}},"Standing":{"look":true,"values":{"At the west door":346090,"Facing the south windows":231158,"Under the crossing, looking up":191524,"In the choir, looking back west":123123,"In the side aisle":40231,"From the west gallery":34064,"Over the light on the floor":33810}}},
  roll(hash) {
    const HOME = '0xeb2fe235d5d753bcd1b2e99cd3d9f879655400c97444b25da91bd0de69496892';
    const out = [], B = {};
    const c = { hash, home: hash === HOME, trait(k, v) { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; } };
      const h = c.hash.replace(/^0x/, '').padEnd(64, '0');
      let sa = parseInt(h.slice(0, 8), 16) >>> 0, sb = parseInt(h.slice(8, 16), 16) >>> 0, sc = parseInt(h.slice(16, 24), 16) >>> 0, sd = parseInt(h.slice(24, 32), 16) >>> 0;
      const r = () => { sa >>>= 0; sb >>>= 0; sc >>>= 0; sd >>>= 0; let t = (sa + sb) | 0; sa = sb ^ (sb >>> 9); sb = (sc + (sc << 3)) | 0; sc = (sc << 21) | (sc >>> 11); sd = (sd + 1) | 0; t = (t + sd) | 0; sc = (sc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 16; i++) r();
      const pick = list => { let s = 0; for (const [, w] of list) s += w; let x = r() * s; for (const [v, w] of list) { if ((x -= w) < 0) return v; } return list[list.length - 1][0]; };
      const range = (a, b) => a + (b - a) * r();

      let building = pick([['gothic', 40], ['romanesque', 27], ['modern', 25], ['ruin', 8]]);
      let glassS = building === 'modern' ? pick([['mod', 50], ['med', 18], ['nouv', 14], ['clr', 18]]) : pick([['med', 36], ['nouv', 24], ['mod', 18], ['clr', 22]]);
      let rare = pick([['none', 72], ['candles', 12], ['swallow', 10], ['equinox', 6]]);
      let season = pick([['winter', 25], ['summer', 25], ['autumn', 30], ['dawn', 20]]);
      let furn = building === 'ruin' ? 'leaves' : building === 'modern' ? pick([['chairs', 55], ['empty', 45]]) : pick([['pews', 50], ['empty', 22], ['chairs', 28]]);
      let stone = building === 'modern' ? pick([['concrete', 70], ['whiteconcrete', 30]]) : pick([['honey', 35], ['grey', 30], ['white', 20], ['red', 15]]);
      let air = pick([['clear', 28], ['dusty', 47], ['incense', 25]]);
      const variant = r();
      if (c.home) { building = 'gothic'; glassS = 'med'; rare = 'none'; season = 'autumn'; furn = 'pews'; stone = 'honey'; air = 'dusty'; }
      if (rare === 'equinox' && season === 'dawn') season = 'autumn';
      if (building === 'ruin' && rare === 'candles') rare = 'none';
      if (rare === 'swallow') rare = 'none';
      const NAMES = {
        building: { gothic: 'High Gothic nave', romanesque: 'Romanesque chapel', modern: 'Modern concrete chapel', ruin: 'Ruined abbey, open to the sky' },
        glass: { med: 'Deep medieval blue and red', nouv: 'Art Nouveau greens and golds', mod: 'Abstract colour fields', clr: 'Clear leaded glass with a roundel' },
        season: { winter: 'Winter low sun', summer: 'Summer high sun', autumn: 'Autumn gold', dawn: 'Dawn' },
        furn: { pews: 'Oak pews', empty: 'Worn flagstones', chairs: 'Rows of chairs', leaves: 'Fallen leaves' },
        stone: { honey: 'Honey limestone', grey: 'Pale grey limestone', white: 'Whitewashed', red: 'Red sandstone', concrete: 'Board-marked concrete', whiteconcrete: 'Whitewashed concrete' },
        air: { clear: 'Clear air', dusty: 'Dusty air', incense: 'Incense haze' },
        rare: { none: 'None', candles: 'A rack of votive candles', swallow: 'A swallow flying through', equinox: 'Equinox alignment' },
      };
      c.trait('Building', NAMES.building[building]);
      c.trait('Glass', building === 'ruin' ? 'Empty tracery, ' + NAMES.glass[glassS].toLowerCase() + ' fragments' : NAMES.glass[glassS]);
      c.trait('Season light', NAMES.season[season]);
      c.trait('Furnishing', NAMES.furn[furn]);
      c.trait('Stone', NAMES.stone[stone]);
      c.trait('Air', NAMES.air[air]);
      c.trait('Something rare', NAMES.rare[rare]);
      let view;
      { let vs = (parseInt(h.slice(32, 40), 16) ^ 0x7F4A7C15) >>> 0;
        const rv = () => { vs = vs + 0x6D2B79F5 | 0; let t = Math.imul(vs ^ vs >>> 15, 1 | vs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
        const x = rv(), jit = rv();
        view = x < .5 ? 'west' : x < .76 ? 'choir' : x < .9 ? 'vault' : 'aisle';
        if (c.home) view = 'west';
        if (building === 'ruin') view = 'west';
        if (building === 'romanesque' && view !== 'west') view = 'vault';
        if (building === 'modern' && view !== 'west') view = 'choir';
        const g = building === 'gothic';
        if (view === 'choir') B.cam = { p: [.4 + jit * .3, 1.62, B.z1 - (g ? 8.5 : 5.5)], yaw: 176 + jit * 5, pitch: g ? 9 : 7, fov: 66 };
        if (view === 'vault') B.cam = { p: [.25, 1.5, B.z1 * (.36 + jit * .1)], yaw: 3, pitch: g ? 52 : 31, fov: 74 };
        if (view === 'aisle') B.cam = { p: [-(B.hw * .54 + B.hw) / 2 + .2, 1.6, 1.1], yaw: 5 + jit * 3, pitch: 7.5, fov: 64 };
        let vs2 = (parseInt(h.slice(40, 48), 16) ^ 0x38b029) >>> 0;
        const rv2 = () => { vs2 = vs2 + 0x6D2B79F5 | 0; let t = Math.imul(vs2 ^ vs2 >>> 15, 1 | vs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
        const d2 = rv2(), axial = view === 'west' || view === 'choir', fromChoir = view === 'choir';
        if (!c.home && axial && building !== 'ruin') {
          if (building === 'modern' && view === 'choir') { if (d2 < .5) view = 'south'; }
          else if (d2 < .2) view = 'south';
          else if (d2 < .42) view = building === 'romanesque' ? 'south' : d2 < .34 ? 'floor' : 'gallery';
          if (view === 'floor' && (season === 'winter' || season === 'dawn')) view = 'south';
        }
        const lowSun = season === 'winter' || season === 'dawn' ? 1 : 0;
        if (view === 'south') B.cam = g ? { p: [-B.hw * .3, 1.6 + .3 * lowSun, B.z1 * .4], yaw: 58, pitch: 17 + 7 * lowSun, fov: 70 } : { p: [-B.hw * .55, 1.6 + .3 * lowSun, B.z1 * .4], yaw: 58, pitch: 13 + 10 * lowSun, fov: 70 };
        if (view === 'floor') B.cam = fromChoir ? { p: [.2, 1.62, B.z1 * .7], yaw: 176 + jit * 6, pitch: -26, fov: 62 } : { p: [.2, 1.62, B.z1 * .3], yaw: 2 + jit * 6, pitch: -26, fov: 62 };
        if (view === 'gallery') B.cam = { p: [.3, g ? B.H * .55 : 5.2, 1.0], yaw: 2, pitch: -17, fov: 70 };
      }
      c.trait('Standing', { west: 'At the west door', choir: 'In the choir, looking back west', vault: 'Under the crossing, looking up', aisle: 'In the side aisle',
        south: 'Facing the south windows', floor: 'Over the light on the floor', gallery: 'From the west gallery' }[view]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 039 ====
ProtoRolls.add(39, {
  traits: {"Water":{"look":true,"values":{"Mountain lake":339889,"Sea loch":299835,"Mill pond":280606,"Frozen lake":79670}},"Light":{"look":true,"values":{"Golden dusk":276538,"Blue hour":269789,"Misty dawn":220186,"Moonrise":149653,"Last sun":83834}},"Shore":{"look":true,"values":{"Slate pebbles":399560,"Round granite":380112,"Sand spit":220328}},"Calm":{"look":true,"values":{"Glass":413916,"Light ripple":276267,"Cat's-paws":230147,"Black ice":35850,"Hoar frost":23899,"Snow drifts":19921}},"Sky":{"look":true,"values":{"High streaks":311826,"Clear":265389,"Mist":220186,"Broken cloud":202599}},"Near water":{"look":true,"values":{"A jetty post":399820,"A reed bed":349733,"An old jetty":250447}},"Something rare":{"values":{"Nothing":580004,"A fire on the far shore":150273,"Trout rising":137465,"A lucky stone":132258}},"Standing":{"look":true,"values":{"A few steps up the beach":399198,"High on a wide beach":320145,"At the water's edge":280657}},"View":{"look":true,"values":{"Eye level":438192,"Crouched by the water":239528,"Looking down at the water":172284,"From the bank above":149996}},"Out on the water":{"values":{"Open water":796741,"An island":107851,"A wooded point":95408}}},
  roll(hash) {
    const HOME = '0x78ab7268f43fe00a01dea1ed5ed9a16dec07463291027b10be42eae1909d0155';
    const home = hash === HOME;
    const hx = hash.slice(2);
    let sa = parseInt(hx.slice(0, 8), 16) >>> 0, sb = parseInt(hx.slice(8, 16), 16) >>> 0, sc = parseInt(hx.slice(16, 24), 16) >>> 0, sd = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { sa >>>= 0; sb >>>= 0; sc >>>= 0; sd >>>= 0; let t = (sa + sb) | 0; sa = sb ^ sb >>> 9; sb = sc + (sc << 3) | 0; sc = sc << 21 | sc >>> 11; sd = sd + 1 | 0; t = t + sd | 0; sc = sc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) rnd();
    const pick = (w) => { let s = 0; for (const x of w) s += x; let v = rnd() * s; for (let i = 0; i < w.length; i++) { v -= w[i]; if (v < 0) return i; } return w.length - 1; };
    let water = pick([34, 30, 28, 8]), light = pick([36, 27, 22, 15]), shore = pick([40, 38, 22]), calm = pick([45, 30, 25]);
    let near = pick([40, 25, 35]), rare = pick([58, 15, 15, 12]), cloud = pick([34, 40, 26]);
    if (water === 3 && rare === 2) rare = 3;
    if (home) { water = 0; light = 0; shore = 0; calm = 0; near = 0; rare = 0; cloud = 1; }
    const frozen = water === 3;
    let s5 = (parseInt(hx.slice(56, 64), 16) ^ 0x39c00b) >>> 0;
    const qrnd = () => { s5 = (s5 + 0x6d2b79f5) >>> 0; let t = s5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const q1 = qrnd(), q2 = qrnd(), q3 = qrnd();
    const lastSun = !home && light === 0 && (water === 1 || water === 2) && q3 < 0.4;
    const out = [];
    out.push(['Water', ['Mountain lake', 'Sea loch', 'Mill pond', 'Frozen lake'][water]]);
    out.push(['Light', lastSun ? 'Last sun' : ['Golden dusk', 'Blue hour', 'Misty dawn', 'Moonrise'][light]]);
    out.push(['Shore', ['Slate pebbles', 'Round granite', 'Sand spit'][shore]]);
    out.push(['Calm', frozen ? ['Black ice', 'Hoar frost', 'Snow drifts'][calm] : ['Glass', 'Light ripple', "Cat's-paws"][calm]]);
    out.push(['Sky', light === 2 ? 'Mist' : ['Clear', 'High streaks', 'Broken cloud'][cloud]]);
    out.push(['Near water', ['A jetty post', 'An old jetty', 'A reed bed'][near]]);
    out.push(['Something rare', ['Nothing', 'A fire on the far shore', 'Trout rising', 'A lucky stone'][rare]]);
    let vs = (parseInt(hx.slice(40, 48), 16) ^ parseInt(hx.slice(16, 24), 16) ^ 0x6d2b79f5) >>> 0;
    const vrnd = () => { vs = (vs + 0x6d2b79f5) >>> 0; let t = vs; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    vrnd();
    const vr = vrnd();
    let stand = vr < 0.4 ? 0 : vr < 0.72 ? 1 : 2;
    if (home) stand = 0;
    out.push(['Standing', ['A few steps up the beach', 'High on a wide beach', "At the water's edge"][stand]]);
    let s3 = 0x2545f491;
    for (let i = 0; i < 64; i += 8) s3 = Math.imul(s3 ^ parseInt(hx.slice(i, i + 8), 16), 0x9e3779b1) ^ (s3 >>> 16);
    s3 = Math.imul(s3 ^ s3 >>> 15, 0x85ebca6b); s3 ^= s3 >>> 13;
    const u3 = (s3 >>> 0) / 4294967296;
    let view = u3 < 0.55 ? 0 : u3 < 0.85 ? 1 : 2;
    if (!home && view !== 2 && !frozen && q1 < 0.22) view = 3;
    if (home) view = 0;
    out.push(['View', ['Eye level', 'Crouched by the water', 'From the bank above', 'Looking down at the water'][view]]);
    const isle = !home && view !== 3 && water !== 2 ? (q2 < 0.18 ? 1 : q2 < 0.34 ? 2 : 0) : 0;
    out.push(['Out on the water', ['Open water', 'An island', 'A wooded point'][isle]]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 042 ====
ProtoRolls.add(42, {
  traits: {"Sand":{"look":true,"values":{"Golden quartz":400644,"Grey estuary mud":259124,"Dark volcanic":200452,"Pink shell sand":139780}},"Ripples":{"look":true,"values":{"Current ripples":480532,"Interference ladders":299691,"Smooth, rill-marked":219777}},"Flat":{"look":true,"values":{"Braided channels":217275,"Runnel and ridge":176475,"A tidal creek":170374,"Sand bars and troughs":150295,"Open flat":149497,"Pools in the hollows":136084}},"Life":{"look":true,"values":{"Lugworms and cockles":360895,"Crab burrows":299276,"Razor shells":178982,"Sand dollars":160847}},"Birds":{"look":true,"values":{"Oystercatchers":338641,"Sanderlings":319906,"A grey heron":187606,"A flock of godwits":93959,"Only their prints":59888}},"Light":{"look":true,"values":{"Golden evening":432807,"Pink dusk":300247,"Misty morning":207058,"Moonlit night":59888}},"Find":{"values":{"None":699665,"A starfish":139952,"A stranded moon jelly":100495,"Bioluminescent night tide":59888}},"View":{"look":true,"values":{"Kneeling, looking down":470814,"Standing, looking down":219225,"Low along the flat":188502,"Straight down on the ripples":121459}},"Tide":{"values":{"Low water":700512,"Flooding in":299488}}},
  roll(hash) {
    const HOME = '0x5aa2a0a571e3dc23f226de7996f4e43ab227ed1ec9fbb7a14127cba84c2c6a72';
    const home = hash === HOME, hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = 0x9E3779B9;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d = (d + 0x6D2B79F5) | 0; const t = (a + b + d) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = ((cc << 21) | (cc >>> 11)) + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r = R) => { let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let sand = pick([['Golden quartz', 40], ['Grey estuary mud', 26], ['Dark volcanic', 20], ['Pink shell sand', 14]]);
    let ripK = pick([['Current ripples', 48], ['Interference ladders', 30], ['Smooth, rill-marked', 22]]);
    let flat = pick([['Braided channels', 32], ['Runnel and ridge', 26], ['Open flat', 22], ['Pools in the hollows', 20]]);
    let life = pick([['Lugworms and cockles', 36], ['Crab burrows', 30], ['Razor shells', 18], ['Sand dollars', 16]]);
    let birds = pick([['Oystercatchers', 36], ['Sanderlings', 34], ['A grey heron', 20], ['A flock of godwits', 10]]);
    let light = pick([['Golden evening', 46], ['Pink dusk', 32], ['Misty morning', 22]]);
    let find = pick([['None', 70], ['A starfish', 14], ['A stranded moon jelly', 10], ['Bioluminescent night tide', 6]]);
    if (home) { sand = 'Golden quartz'; ripK = 'Current ripples'; flat = 'Braided channels'; life = 'Lugworms and cockles'; birds = 'Oystercatchers'; light = 'Golden evening'; find = 'None'; }
    const bio = find === 'Bioluminescent night tide';
    let s3 = (parseInt(hx.slice(48, 56), 16) ^ 0x42d002) | 0;
    const rnd3 = () => { s3 = (s3 + 0x6D2B79F5) | 0; let t = Math.imul(s3 ^ (s3 >>> 15), 1 | s3); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const d3v = rnd3(), d3f = rnd3();
    if (!home) flat = d3f < 0.17 ? 'A tidal creek' : d3f < 0.32 ? 'Sand bars and troughs' : flat;
    let s2 = (parseInt(hx.slice(32, 40), 16) ^ parseInt(hx.slice(40, 48), 16)) | 0;
    const rnd2 = () => { s2 = (s2 + 0x6D2B79F5) | 0; let t = Math.imul(s2 ^ (s2 >>> 15), 1 | s2); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    let view = home ? 'Kneeling, looking down' : pick([['Kneeling, looking down', 58], ['Standing, looking down', 27], ['Straight down on the ripples', 15]], rnd2);
    if (!home && d3v < 0.2 && !bio) view = 'Low along the flat';
    const tideK = home ? 'Low water' : rnd2() < 0.7 ? 'Low water' : 'Flooding in';
    return [['Sand', sand], ['Ripples', ripK], ['Flat', flat], ['Life', life], ['Birds', bio ? 'Only their prints' : birds],
      ['Light', bio ? 'Moonlit night' : light], ['Find', find], ['View', view], ['Tide', tideK]];
  },
});
// ==== end roll ====

// ==== roll 046 ====
ProtoRolls.add(46, {
  traits: {"Palette":{"look":true,"values":{"Botanical":292796,"Earth tones":292152,"Sea blues":291924,"Gold and indigo":123128}},"Paper":{"look":true,"values":{"Cold-press white":423563,"Hot-press smooth":263209,"Toned cream":242473,"Indigo-dyed":70755}},"Painting":{"look":true,"values":{"Hills":300417,"Sea":280129,"Sky":213255,"Flowers":206199}},"Desk":{"look":true,"values":{"Oak":420626,"Painted table":319795,"Slate windowsill":259579}},"Light":{"look":true,"values":{"Lamp":499377,"Candle":279725,"Moonlight":220898}},"Weather":{"values":{"Quiet night":620104,"Rain":379896}},"Rare":{"values":{"None":819609,"Cat's paw print":60157,"Tea ring":60147,"Salt starbursts":60087}},"Mount":{"values":{"Taped to the board":640282,"Loose deckled sheet":359718}},"View":{"look":true,"values":{"Across the desk":280542,"Low along the sheet":279747,"Overhead":259394,"Close on the sheet":180317}}},
  roll(hash) {
    const HOME = '0x61b8f5bcb6a677165c2b7c83d2606b957da047a9e3154a9a7c0941df0a61ebe6';
    const home = hash === HOME;
    function rng(hash, k) {
      const hx = hash.slice(2);
      let a = parseInt(hx.slice(k * 8 % 56, k * 8 % 56 + 8), 16) >>> 0, b = parseInt(hx.slice(8, 16), 16) ^ (k * 0x9E3779B9), c = parseInt(hx.slice(32, 40), 16) >>> 0, d = (parseInt(hx.slice(56, 64), 16) + k) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; const t = (a + b + d) >>> 0; d = (d + 1) >>> 0; a = b ^ (b >>> 9); b = (c + (c << 3)) >>> 0; c = ((c << 21) | (c >>> 11)) >>> 0; c = (c + t) >>> 0; return t / 4294967296; };
      for (let i = 0; i < 16; i++) f();
      return f;
    }
    const R = rng(hash, 0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let palette = pick([['Earth tones', 30], ['Sea blues', 30], ['Botanical', 30], ['Gold and indigo', 9]]);
    let paper = pick([['Cold-press white', 42], ['Hot-press smooth', 26], ['Toned cream', 24], ['Indigo-dyed', 7]]);
    let subject = pick([['Hills', 30], ['Sea', 28], ['Flowers', 22], ['Sky', 20]]);
    let desk = pick([['Oak', 42], ['Painted table', 32], ['Slate windowsill', 26]]);
    let light = pick([['Lamp', 50], ['Candle', 28], ['Moonlight', 22]]);
    let weather = pick([['Quiet night', 62], ['Rain', 38]]);
    let rare = pick([['None', 82], ["Cat's paw print", 6], ['Tea ring', 6], ['Salt starbursts', 6]]);
    if (home) { palette = 'Sea blues'; paper = 'Cold-press white'; subject = 'Sea'; desk = 'Oak'; light = 'Lamp'; weather = 'Rain'; rare = 'None'; }
    if (paper === 'Indigo-dyed' && palette !== 'Gold and indigo' && R() < 0.5) palette = 'Gold and indigo';
    if (rare === 'Salt starbursts' && subject === 'Flowers') subject = 'Sky';
    const RM = rng(hash, 978);
    let mount = pick([['Taped to the board', 64], ['Loose deckled sheet', 36]], RM);
    if (home) mount = 'Taped to the board';
    const RV = rng(hash, 977);
    RV();
    let view = pick([['Overhead', 26], ['Across the desk', 28], ['Close on the sheet', 18], ['Low along the sheet', 28]], RV);
    if (home) view = 'Overhead';
    return [['Palette', palette], ['Paper', paper], ['Painting', subject], ['Desk', desk], ['Light', light], ['Weather', weather], ['Rare', rare], ['Mount', mount], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 50 ====
ProtoRolls.add(50, {
  traits: {"Wire":{"look":true,"values":{"Round wire":449766,"Square frame":249969,"Twisted wire star":220253,"Cube frame":80012}},"Light":{"look":true,"values":{"Soft window":419886,"Ring light":240430,"Warm lamp":239767,"Dark field":99917}},"Mix":{"values":{"Glycerin-rich, slow bands":500202,"Thin, quick marbling":499798}},"Background":{"look":true,"values":{"Black velvet":400863,"Dark room, bokeh":299710,"Blurred garden":299427}},"Metal":{"values":{"Steel":500433,"Copper":299536,"Brass":200031}},"Rare":{"values":{"None":820010,"Bubble in a bubble":70158,"Trapped dust mote":60143,"Frost":49689}}},
  roll(hash) {
    const HOME = '0x99e86b5f4b927cca0e5c0ee15a6799fca09a6ccd6dbad3c4f80832f1ace1a776';   // hashFor(49, 0), as runtime.js: c.home
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let x = R() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let ring = pick([['Round wire', 45], ['Square frame', 25], ['Twisted wire star', 22], ['Cube frame', 8]]);
    let light = pick([['Soft window', 42], ['Ring light', 24], ['Warm lamp', 24], ['Dark field', 10]]);
    let mix = pick([['Glycerin-rich, slow bands', 50], ['Thin, quick marbling', 50]]);
    let back = pick([['Black velvet', 40], ['Blurred garden', 30], ['Dark room, bokeh', 30]]);
    let metal = pick([['Steel', 50], ['Copper', 30], ['Brass', 20]]);
    let rare = pick([['None', 82], ['Bubble in a bubble', 7], ['Trapped dust mote', 6], ['Frost', 5]]);
    if (home) { ring = 'Round wire'; light = 'Soft window'; mix = 'Thin, quick marbling'; back = 'Black velvet'; metal = 'Steel'; rare = 'None'; }
    return [['Wire', ring], ['Light', light], ['Mix', mix], ['Background', back], ['Metal', metal], ['Rare', rare]];
  },
});
// ==== end roll ====

// ==== roll 052 ====
ProtoRolls.add(52, {
  traits: {"Street":{"look":true,"values":{"Old cobbles":260313,"Asphalt with a painted line":240053,"Granite setts":200031,"Brick lane":179259,"Stone channel in a garden":120344}},"Paper":{"look":true,"values":{"White":240304,"Coloured origami":240210,"Newspaper grey":220288,"Brown wrapping paper":139548,"Squared exercise paper":99668,"Gold foil":59982}},"Light":{"look":true,"values":{"Golden late sun":252062,"Grey after-rain":210393,"Blue evening, streetlamp":140352,"Hard noon, dappled shade":104707,"Neon sign at night":91965,"Sun shower":62843,"Grey, still raining":52742,"Blue evening, streetlamp, still raining":35459,"Hard noon, dappled shade, still raining":26286,"Neon sign at night, still raining":23191}},"Folds":{"look":true,"values":{"Classic boats":340726,"Boats and hats":239744,"Flat-bottomed punts":179865,"A crane among them":139616,"A walnut-shell fleet":100049}},"Season":{"look":true,"values":{"Summer":300181,"Autumn":299877,"Spring":219733,"Winter thaw":180209}},"Water":{"look":true,"values":{"Running":400631,"In spate":219595,"Slow and deep":200366,"A trickle":179408}},"Layout":{"look":true,"values":{"A few stones":340201,"Rubble and half-bricks":240353,"Clear run":159366,"A line of stepping stones":139799,"Downspout pouring in":120281}},"Boats":{"look":true,"values":{"A flotilla":386129,"A few":368400,"One big boat":165296,"A fleet from upstream":80175}},"View":{"look":true,"values":{"Kerb height":459933,"Looking upstream":299969,"Looking down":240098}}},
  roll(hash) {
    const HOME = '0x47e7ed080b37cb03a54be369b9ba45fd944b13ac66b63d2b5218f65d9fb1f866';
    const home = hash === HOME, hx = String(hash).slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = 0x9E3779B9;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d = (d + 0x6D2B79F5) | 0; const t = (a + b + d) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = ((cc << 21) | (cc >>> 11)) + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) f();
      return f;
    };
    const mb = (off, salt) => { let q = (parseInt(hx.slice(off, off + 8), 16) ^ salt) >>> 0; return () => { q = (q + 0x6D2B79F5) >>> 0; let t = q; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
    const R = mkR(0);
    const pick = (opts, r = R) => { let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let street = pick([['Old cobbles', 26], ['Granite setts', 20], ['Brick lane', 18], ['Stone channel in a garden', 12], ['Asphalt with a painted line', 24]]);
    let paper = pick([['White', 24], ['Newspaper grey', 22], ['Coloured origami', 24], ['Brown wrapping paper', 14], ['Squared exercise paper', 10], ['Gold foil', 6]]);
    const RX = mb(46, 0x1b873593);
    const season = home ? 'Summer' : pick([['Summer', 30], ['Autumn', 30], ['Winter thaw', 18], ['Spring', 22]], RX);
    let light = pick(season === 'Winter thaw' ? [['Grey after-rain', 55], ['Blue evening, streetlamp', 25], ['Golden late sun', 20]] : [['Golden late sun', 34], ['Grey after-rain', 20], ['Blue evening, streetlamp', 16], ['Hard noon, dappled shade', 16], ['Neon sign at night', 14]]);
    if (season === 'Winter thaw') pick([['Ice and slush', 70], ['Seeds and twigs', 30]]); else if (season === 'Spring') pick([['Cherry petals', 70], ['Seeds and twigs', 30]]); else if (season !== 'Autumn') pick([['Autumn leaves', 25], ['Cherry petals', 25], ['Seeds and twigs', 50]]);
    pick([['Iron grate', 52], ['Stone spout', 28], ['Culvert pipe', 20]]);
    let folds = pick([['Classic boats', 34], ['Boats and hats', 24], ['A crane among them', 14], ['Flat-bottomed punts', 18], ['A walnut-shell fleet', 10]]);
    let rare = pick([['None', 70], ['A toy duck', 12], ['A frog', 10], ['A fleet from upstream', 8]]);
    if (rare === 'A toy duck' || rare === 'A frog') rare = 'None';
    let waterK = pick([['A trickle', 18], ['Running', 40], ['In spate', 22], ['Slow and deep', 20]], RX);
    let obst = pick([['A few stones', 34], ['Clear run', 16], ['Rubble and half-bricks', 24], ['A line of stepping stones', 14], ['Downspout pouring in', 12]], RX);
    if (home) { street = 'Old cobbles'; paper = 'White'; light = 'Golden late sun'; folds = 'Classic boats'; rare = 'None'; waterK = 'Running'; obst = 'A few stones'; }
    const RM = mb(22, 0x7f4a7c15);
    const RAIN0 = !home && RM() < 0.2;
    const lightT = RAIN0 ? ({ 'Golden late sun': 'Sun shower', 'Grey after-rain': 'Grey, still raining' }[light] || light + ', still raining') : light;
    let fleet = pick([['A few', 40], ['A flotilla', 42], ['One big boat', 18]], mb(6, 0x2c1b3c6d));
    if (home) fleet = 'A few';
    let view = pick([['Kerb height', 46], ['Looking upstream', 30], ['Looking down', 24]], mb(30, 0x51ed270b));
    if (home) view = 'Kerb height';
    return [['Street', street], ['Paper', paper], ['Light', lightT], ['Folds', folds], ['Season', season], ['Water', waterK], ['Layout', obst],
      ['Boats', rare === 'A fleet from upstream' ? 'A fleet from upstream' : fleet], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 056 ====
ProtoRolls.add(56, {
  traits: {"Kettle":{"look":true,"values":{"Cast iron tetsubin":240003,"Copper":220459,"Red enamel":159932,"Blue enamel":139996,"Cream enamel":139721,"Whistling kettle":99889}},"Stove":{"look":true,"values":{"Gas hob":439865,"Wood-burning range":340237,"Camp stove in a cabin":219898}},"Window":{"look":true,"values":{"Snow falling":319231,"Frost ferns":300184,"Rain":200401,"Sunny winter morning":180184}},"Cup":{"look":true,"values":{"Porcelain teacup":320554,"Clay mug":279923,"Glass":219765,"Bowl":179758}},"Wall":{"look":true,"values":{"Lime plaster":281160,"White tiles":280386,"Log walls":219898,"Painted boards":218556}},"Teapot":{"look":true,"values":{"Brown glaze":399558,"Blue and white":320159,"Speckled stoneware":280283}},"Hour":{"values":{"Morning":820011,"Blue hour before dawn":129983,"Night by stove light":50006}},"View":{"look":true,"values":{"Across the counter":402859,"Close on the kettle":240305,"From above the hob":217953,"Low, at hob height":138883}}},
  roll(hash) {
    const HOME = '0x9c6a07a02609b6502101cb30655a338cc54a19ea205fa8d8f5df9907bb1bf6de';
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let kettle = pick([['Cast iron tetsubin', 24], ['Red enamel', 16], ['Cream enamel', 14], ['Blue enamel', 14], ['Copper', 22], ['Whistling kettle', 10]]);
    let stove = pick([['Gas hob', 44], ['Wood-burning range', 34], ['Camp stove in a cabin', 22]]);
    let windowT = pick([['Frost ferns', 30], ['Snow falling', 28], ['Rain', 20], ['Sunny winter morning', 22]]);
    let cupT = pick([['Porcelain teacup', 32], ['Clay mug', 28], ['Glass', 22], ['Bowl', 18]]);
    let wall = pick([['Lime plaster', 36], ['White tiles', 36], ['Painted boards', 28]]);
    let teapotT = pick([['Brown glaze', 40], ['Blue and white', 32], ['Speckled stoneware', 28]]);
    let rare = pick([['Morning', 82], ['Blue hour before dawn', 13], ['Night by stove light', 5]]);
    if (home) { kettle = 'Red enamel'; stove = 'Gas hob'; windowT = 'Frost ferns'; cupT = 'Porcelain teacup'; wall = 'White tiles'; teapotT = 'Brown glaze'; rare = 'Morning'; }
    if (stove === 'Camp stove in a cabin') wall = 'Log walls';
    if (rare !== 'Morning' && windowT === 'Sunny winter morning') windowT = 'Snow falling';
    const RV = mkR(24);
    let view = pick([['Across the counter', 40], ['Close on the kettle', 24], ['Low, at hob height', 14], ['From above the hob', 22]], RV);
    if (home) view = 'Across the counter';
    if (rare === 'Night by stove light' && stove === 'Camp stove in a cabin' && view === 'From above the hob') view = 'Across the counter';
    return [['Kettle', kettle], ['Stove', stove], ['Window', windowT], ['Cup', cupT], ['Wall', wall], ['Teapot', teapotT], ['Hour', rare], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 066 ====
ProtoRolls.add(66, {
  traits: {"Stone":{"look":true,"values":{"Cream limestone":399935,"Orange iron-stained":299800,"White calcite":220253,"Blue ice cave":80012}},"Formations":{"look":true,"values":{"Stalactite forest":379797,"Soda straws":270470,"Flowstone curtains":249816,"Helictites":99917}},"Pool":{"look":true,"values":{"Clear turquoise":420111,"Deep blue":330391,"Still black mirror":249498}},"Lamp":{"look":true,"values":{"Candle lantern":400863,"Carbide lamp":349324,"Cold LED":249813}},"Tuning":{"look":true,"values":{"Major pentatonic":299874,"Minor pentatonic":260631,"Dorian":189455,"Lydian":150020,"Overtone series":100020}},"Chamber":{"look":true,"values":{"High hall":350107,"Low vault":349454,"Passage beyond":300439}},"Drips":{"look":true,"values":{"Steady drips":460318,"Slow drips":319486,"Busy drips":220196}},"Rare":{"values":{"None":799491,"Glow-worms":120423,"A column completing":80086}},"View":{"look":true,"values":{"From the bank":499226,"Low at the water":220574,"Along the wall":140132,"Up into the roof":140068}}},
  roll(hash) {
    const HOME = '0xc991b4debb2b70ed42272f801b7cf765a82b8169e73f15e0a734f9384a163722';
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let stone = pick([['Cream limestone', 40], ['Orange iron-stained', 30], ['White calcite', 22], ['Blue ice cave', 8]]);
    let formK = pick([['Stalactite forest', 38], ['Soda straws', 27], ['Flowstone curtains', 25], ['Helictites', 10]]);
    let pool = pick([['Clear turquoise', 42], ['Deep blue', 33], ['Still black mirror', 25]]);
    let lampK = pick([['Candle lantern', 40], ['Carbide lamp', 35], ['Cold LED', 25]]);
    let tuning = pick([['Major pentatonic', 30], ['Minor pentatonic', 26], ['Dorian', 19], ['Lydian', 15], ['Overtone series', 10]]);
    let chamber = pick([['Low vault', 35], ['High hall', 35], ['Passage beyond', 30]]);
    let pace = pick([['Slow drips', 32], ['Steady drips', 46], ['Busy drips', 22]]);
    let rare = pick([['None', 70], ['Glow-worms', 12], ['Cave pearls', 10], ['A column completing', 8]]);
    if (home) { stone = 'Cream limestone'; formK = 'Stalactite forest'; pool = 'Clear turquoise'; lampK = 'Candle lantern'; tuning = 'Major pentatonic'; chamber = 'High hall'; pace = 'Steady drips'; rare = 'Cave pearls'; }
    if (rare === 'Cave pearls') rare = 'None';
    let view = pick([['From the bank', 50], ['Low at the water', 22], ['Along the wall', 14], ['Up into the roof', 14]], mkR(4));
    if (home) view = 'From the bank';
    return [['Stone', stone], ['Formations', formK], ['Pool', pool], ['Lamp', lampK], ['Tuning', tuning], ['Chamber', chamber], ['Drips', pace], ['Rare', rare], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 070 ====
ProtoRolls.add(70, {
  traits: {"Dominoes":{"look":true,"values":{"Natural wood":400467,"Painted rainbow":279641,"Black with white dots":240421,"Bone and ebony":79471}},"Layout":{"look":true,"values":{"Spiral":297423,"Wave":278705,"Branching tree":260524,"Tiny to giant":93194,"Perfect spiral":70154}},"Spacing":{"values":{"Classic":500226,"Close":300013,"Wide":199761}},"Surface":{"look":true,"values":{"Oak floor":349317,"Long table":300263,"Rug":200360,"Stone":150060}},"Room light":{"look":true,"values":{"Morning sun":399977,"Afternoon":379806,"Lamplight":220217}},"Finale":{"look":true,"values":{"Bell":377834,"Marble ramp":272118,"Flag":200075,"Paper pinwheel":149973}},"Book stairs":{"values":{"Yes":627152,"No":372848}}},
  roll(hash) {
    const HOME = '0xefaf1e966ddfde967761376f7ad9e24cfcb1bcd40c7a5e8e6fd2b6e128ce6081';   // hashFor(69, 0): the site's home
    const home = hash === HOME;
    function makeRng(hash, salt) {
      const h = hash.replace(/^0x/, '').padEnd(64, '0');
      let a = parseInt(h.slice(0, 8), 16) ^ salt, b = parseInt(h.slice(8, 16), 16), c = parseInt(h.slice(16, 24), 16) ^ (salt * 2654435761), d = parseInt(h.slice(24, 32), 16) ^ parseInt(h.slice(32, 40), 16);
      const f = () => {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
      for (let i = 0; i < 16; i++) f();
      return f;
    }
    const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let x = r() * s; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
    const r = makeRng(hash, 7), T = {};
    T.set = pick(r, [['Natural wood', 40], ['Painted rainbow', 28], ['Black with white dots', 24], ['Bone and ebony', 8]]);
    T.layoutName = pick(r, [['Spiral', 32], ['Wave', 30], ['Branching tree', 28], ['Tiny to giant', 10]]);
    T.surface = pick(r, [['Oak floor', 35], ['Long table', 30], ['Rug', 20], ['Stone', 15]]);
    T.light = pick(r, [['Morning sun', 40], ['Afternoon', 38], ['Lamplight', 22]]);
    T.finale = pick(r, [['bell', 35], ['marble', 30], ['flag', 20], ['windmill', 15]]);
    T.spacing = pick(r, [['Close', 30], ['Classic', 50], ['Wide', 20]]);
    T.rare = pick(r, [['None', 93], ['Perfect spiral', 7]]);
    if (home) { T.set = 'Natural wood'; T.layoutName = 'Spiral'; T.surface = 'Oak floor'; T.light = 'Morning sun'; T.finale = 'bell'; T.spacing = 'Classic'; T.rare = 'None'; }
    T.layout = T.rare === 'Perfect spiral' ? 'Perfect' : { 'Spiral': 'Spiral', 'Wave': 'Wave', 'Branching tree': 'Tree', 'Tiny to giant': 'Giant' }[T.layoutName];
    if (T.layout === 'Perfect') T.layoutName = 'Spiral';
    if (T.layout === 'Giant' && T.finale === 'marble') T.finale = 'bell';
    if (!home) r();                                   // T.mirror
    T.books = T.layout === 'Giant' || T.layout === 'Perfect' ? false : (home ? true : r() < 0.75);
    const FIN = { bell: 'Bell', marble: 'Marble ramp', flag: 'Flag', windmill: 'Paper pinwheel' };
    return [['Dominoes', T.set], ['Layout', T.layout === 'Perfect' ? 'Perfect spiral' : T.layoutName], ['Spacing', T.spacing], ['Surface', T.surface], ['Room light', T.light], ['Finale', FIN[T.finale]], ['Book stairs', T.books ? 'Yes' : 'No']];
  },
});
// ==== end roll ====

// ==== roll 072 ====
ProtoRolls.add(72, {
  traits: {"Drink":{"look":true,"values":{"Green tea":380458,"Black coffee":299855,"Golden oolong":239579,"Whisked matcha":80108}},"Bowl":{"look":true,"values":{"Oil-spot tenmoku":379493,"Pale celadon":280623,"Rough ash glaze":260199,"Gold-mended crack":79685}},"Shape":{"look":true,"values":{"Conical":416559,"Wide":324829,"Deep":258612}},"Tray":{"look":true,"values":{"Dark wood":449447,"Slate":300449,"Linen":250104}},"Light":{"values":{"Dawn window":550393,"Overcast day":329922,"Candle":119685}},"Floating":{"look":true,"values":{"Tea leaf":339354,"Tea stem":214125,"Osmanthus":196435,"Camellia petal":142616,"Cherry petals":107470}},"Rare":{"values":{"None":860005,"Standing tea stem":80127,"Falling petal":59868}},"View":{"values":{"Over the rim":500190,"Straight down":220014,"Low across the tray":179724,"Close on the surface":100072}}},
  roll(hash) {
    const HOME = '0x839c11f345d6fe381c4ab90979c906e73740b43e665bd42bd740a64dac215346';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const home = hash === HOME;
      const hx = hash.slice(2);
      const mkR = off => {
        let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = 1;
        const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; const t = (a + b + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
        for (let i = 0; i < 16; i++) f();
        return f;
      };
      const R = mkR(0), RG = mkR(24), RS = mkR(40);
      const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
      const rr = (a, b, r) => a + (b - a) * (r || RG)();

      // ---------------------------------------------------------- traits
      let drink = pick([['Green tea', 38], ['Black coffee', 30], ['Golden oolong', 24], ['Whisked matcha', 8]]);
      let glaze = pick([['Oil-spot tenmoku', 38], ['Pale celadon', 28], ['Rough ash glaze', 26], ['Gold-mended crack', 8]]);
      let shape = pick([['Wide', 40], ['Deep', 32], ['Conical', 28]]);
      let tray = pick([['Dark wood', 45], ['Slate', 30], ['Linen', 25]]);
      let light = pick([['Dawn window', 55], ['Overcast day', 33], ['Candle', 12]]);
      let floatK = pick([['Tea leaf', 38], ['Tea stem', 24], ['Osmanthus', 22], ['Camellia petal', 16], ['Cherry petals', 12]]);
      let rare = pick([['None', 80], ['Standing tea stem', 8], ['None', 6], ['Falling petal', 6]]);
      if (glaze === 'Oil-spot tenmoku' && shape !== 'Conical' && R() < 0.5) shape = 'Conical';
      if (home) { drink = 'Green tea'; glaze = 'Oil-spot tenmoku'; shape = 'Wide'; tray = 'Dark wood'; light = 'Dawn window'; floatK = 'Tea leaf'; rare = 'None'; }
      T('Drink', drink); T('Bowl', glaze); T('Shape', shape); T('Tray', tray); T('Light', light); T('Floating', floatK); T('Rare', rare);
      // where you look from: its own stream (words 12 to 36 of the hash), so the rolls above never shift
      const RV = mkR(12);
      let view = pick([['Over the rim', 50], ['Straight down', 22], ['Low across the tray', 18], ['Close on the surface', 10]], RV);
      if (home) view = 'Over the rim';
      T('View', view);

    return out;
  },
});
// ==== end roll ====

// ==== roll 079 ====
ProtoRolls.add(79, {
  traits: {"Tops":{"look":true,"values":{"Painted folk tops":380722,"Brass tops":219711,"Ceramic discs":159679,"Glass tops":149620,"Tippe tops":90268}},"Surface":{"look":true,"values":{"Polished oak":420143,"Slate":259266,"Mirror":220558,"Tatami":100033}},"Light":{"look":true,"values":{"Window daylight":335853,"Warm lamp":300290,"Spotlight":219749,"Evening sun":144108}},"Count":{"values":{"A crowd of five":600213,"One master top":399787}},"Finish":{"look":true,"values":{"":780289,"Polished":153545,"Aged":66166}},"Something rare":{"values":{"None":728607,"A steel disc":100008,"A long sleeper":89432,"A tippe top":81953}},"View":{"values":{"Low and close":644103,"Along the boards":199699,"From above":156198}},"Paint":{"look":true,"values":{"":529010,"Folk red":160133,"Meadow":122494,"Sea blue":122212,"Black and gold":66151}},"Glass":{"look":true,"values":{"":850380,"Clear":82422,"Smoky":37370,"Amber":29828}},"Glaze":{"look":true,"values":{"":840321,"Cobalt on white":71968,"Celadon":47749,"Black slip":39962}}},
  roll(hash) {
    const HOME = '0x84e1de81ed04dffd610f390192b9b6f3ffdc158c031d2c1007cd0ded9c4a27ab';
    const home = hash === HOME;
    function makeRng(hash, salt) {
      const h = hash.replace(/^0x/, '').padEnd(64, '0');
      let a = parseInt(h.slice(0, 8), 16) ^ salt, b = parseInt(h.slice(8, 16), 16) ^ Math.imul(salt, 7919), c = parseInt(h.slice(16, 24), 16) ^ parseInt(h.slice(48, 56), 16), d = parseInt(h.slice(24, 32), 16) ^ parseInt(h.slice(32, 40), 16) ^ parseInt(h.slice(56, 64), 16);
      const f = () => {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
      for (let i = 0; i < 20; i++) f();
      return f;
    }
    const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let x = r() * s; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
    const r = makeRng(hash, 79), T = {};
    T.tops = pick(r, [['Painted folk tops', 38], ['Brass tops', 22], ['Ceramic discs', 16], ['Glass tops', 15], ['Tippe tops', 9]]);
    T.surface = pick(r, [['Polished oak', 42], ['Slate', 26], ['Mirror', 22], ['Tatami', 10]]);
    T.light = pick(r, [['Window daylight', 48], ['Warm lamp', 30], ['Spotlight', 22]]);
    T.count = pick(r, [['A crowd of five', 60], ['One master top', 40]]);
    T.rare = pick(r, [['None', 72], ['A tippe top', 9], ['A steel disc', 10], ['A long sleeper', 9]]);
    T.paint = pick(r, [['Folk red', 34], ['Sea blue', 26], ['Meadow', 26], ['Black and gold', 14]]);
    T.finish = pick(r, [['Polished', 70], ['Aged', 30]]);
    T.glass = pick(r, [['Clear', 55], ['Smoky', 25], ['Amber', 20]]);
    T.glaze = pick(r, [['Cobalt on white', 45], ['Celadon', 30], ['Black slip', 25]]);
    const r2 = makeRng(hash, 7901);
    if (T.light === 'Window daylight' && r2() < 0.3 && !home) T.light = 'Evening sun';
    if (home) { T.tops = 'Painted folk tops'; T.surface = 'Polished oak'; T.light = 'Window daylight'; T.count = 'A crowd of five'; T.rare = 'None'; T.paint = 'Folk red'; }
    if (T.tops === 'Tippe tops' && T.rare === 'A tippe top') T.rare = 'None';
    const vr = makeRng(hash, 7907)();
    T.view = home ? 'Low and close' : vr < 0.6 ? 'Low and close' : vr < 0.8 ? 'From above' : 'Along the boards';
    if (T.view === 'From above' && T.surface === 'Mirror') T.view = 'Low and close';
    const fin = T.tops === 'Brass tops' ? ['Finish', T.finish] : T.tops === 'Glass tops' ? ['Glass', T.glass] : T.tops === 'Ceramic discs' ? ['Glaze', T.glaze] : ['Paint', T.paint];
    return [['Tops', T.tops], ['Surface', T.surface], ['Light', T.light], ['Count', T.count], fin, ['Something rare', T.rare], ['View', T.view]];
  },
});
// ==== end roll ====

// ==== roll 080 ====
ProtoRolls.add(80, {
  traits: {"Frost":{"look":true,"values":{"Ferny dendrites":420240,"Star flowers":239920,"Needle frost":239861,"Feather frost":99979}},"Window":{"look":true,"values":{"Old sash, wavy glass":400884,"Cottage casement, lead lines":299663,"Train window":199418,"Round porthole":100035}},"Outside":{"look":true,"values":{"Snowy garden":320150,"Village street at dawn":239961,"Frozen lake":239538,"Pine forest":200351}},"Light":{"look":true,"values":{"Golden sunrise":439621,"Blue pre-dawn":319996,"Bright noon on snow":240383}},"Weather":{"values":{"Still air":619049,"Snowing":380951}},"Glass":{"look":true,"values":{"Clean":449856,"Scratched":300581,"Dusty":249563}},"Something rare":{"values":{"None":760817,"Candle on the sill":179133,"Heart in the frost":60050}},"Stage":{"values":{"Grown overnight":660190,"Just creeping in from the edges":339810}}},
  roll(hash) {
    const HOME = '0xe7c753ca2c9885ce5a191296183d943a34ff2e894172de337dd54e07da252dc5';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME;
    const hw = i => parseInt(hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
    const rng = seed => { let s = seed >>> 0; return () => { s = (s + 0x9E3779B9) >>> 0; let z = s; z = Math.imul(z ^ (z >>> 16), 0x85EBCA6B); z = Math.imul(z ^ (z >>> 13), 0xC2B2AE35); z ^= z >>> 16; return (z >>> 0) / 4294967296; }; };
    const R = rng(hw(0) ^ Math.imul(80, 0x2545F491));
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let x = R() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    const FROSTS = ['Ferny dendrites', 'Needle frost', 'Star flowers', 'Feather frost'];
    const WINDOWS = ['Old sash, wavy glass', 'Cottage casement, lead lines', 'Train window', 'Round porthole'];
    const OUTS = ['Snowy garden', 'Frozen lake', 'Village street at dawn', 'Pine forest'];
    const LIGHTS = ['Blue pre-dawn', 'Golden sunrise', 'Bright noon on snow'];
    const RARES = ['None', 'Robin on the frame', 'Candle on the sill', 'Heart in the frost'];
    let frost = pick([[FROSTS[0], 42], [FROSTS[1], 24], [FROSTS[2], 24], [FROSTS[3], 10]]);
    let win = pick([[WINDOWS[0], 40], [WINDOWS[1], 30], [WINDOWS[2], 20], [WINDOWS[3], 10]]);
    let out = pick([[OUTS[0], 32], [OUTS[1], 24], [OUTS[2], 24], [OUTS[3], 20]]);
    let light = pick([[LIGHTS[0], 32], [LIGHTS[1], 44], [LIGHTS[2], 24]]);
    let weather = pick([['Still air', 62], ['Snowing', 38]]);
    let pane = pick([['Clean', 45], ['Scratched', 30], ['Dusty', 25]]);
    let rare = pick([[RARES[0], 76], [RARES[1], 0], [RARES[2], 12], [RARES[3], 12]]);
    if (home) { frost = FROSTS[0]; win = WINDOWS[0]; out = OUTS[0]; light = LIGHTS[1]; weather = 'Snowing'; pane = 'Scratched'; rare = RARES[0]; }
    const RT = rng(hw(7) ^ hw(1) ^ 0x5eed0800);
    let stage = (() => { const x = RT() * 100; return x < 66 ? 'Grown overnight' : 'Just creeping in from the edges'; })();
    if (home) stage = 'Grown overnight';
    if (rare === RARES[3] && frost === FROSTS[1]) rare = RARES[2];
    if (rare === RARES[3] && stage !== 'Grown overnight') rare = RARES[2];
    return [['Frost', frost], ['Window', win], ['Outside', out], ['Light', light], ['Weather', weather], ['Glass', pane], ['Something rare', rare], ['Stage', stage]];
  },
});
// ==== end roll ====

// ==== roll 083 ====
ProtoRolls.add(83, {
  traits: {"Balls":{"look":true,"values":{"Steel shot":440380,"Glass marbles":279984,"Dried beans":209633,"Brass bells":70003}},"Board":{"look":true,"values":{"Walnut and brass":420096,"Fairground paint":300487,"Clear acrylic":209577,"Giant":69840}},"Pins":{"values":{"Classic triangle":596738,"Dense field":302598,"Old quincunx":100664}},"Rows":{"look":true,"values":{"6":133830,"10":239299,"12":357488,"14":199543,"18":69840}},"Light":{"look":true,"values":{"Desk lamp":441733,"Window":338641,"Museum spotlight":219626}},"Something rare":{"values":{"None":700065,"Two-colour pour":109964,"Hourglass case":99768,"A balancing ball":90203}},"Camera":{"look":true,"values":{"Straight on":459593,"Close on the bins":257814,"Close on the pins":142925,"Across the desk":139668}},"Moment":{"values":{"Pouring":711106,"The curve standing":288894}}},
  roll(hash) {
    const HOME = '0x7e43f1bc8c195467a80ea152cb1bb5b9902e0a67f89fe9be71c1c3c5596194c0';
    const out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const c = { home: hash === HOME, hash, trait: T };
      const hs = (c.hash || '0x0').slice(2).padEnd(64, '0');
      const sd = i => parseInt(hs.slice(i * 8, i * 8 + 8), 16) >>> 0;
      const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
      const RT = mkR(sd(0) ^ Math.imul(sd(4), 0x2c1b3c6d)), RL = mkR(sd(1) ^ Math.imul(sd(5), 0x297a2d39));
      const RV = mkR(sd(2) ^ Math.imul(sd(6), 0x9e3779b1)), RP_ = mkR(sd(3) ^ Math.imul(sd(7), 0x85ebca77));
      const pick = (R, v, w) => { let t = 0; for (const x of w) t += x; let r = R() * t, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return v[i]; };

      const BALLS = ['Steel shot', 'Glass marbles', 'Dried beans', 'Brass bells'];
      const BOARDS = ['Walnut and brass', 'Fairground paint', 'Clear acrylic', 'Giant'];
      const LAYS = ['Classic triangle', 'Dense field', 'Old quincunx'];
      const LIGHTS = ['Desk lamp', 'Window', 'Museum spotlight'];
      const RARES = ['None', 'Two-colour pour', 'Hourglass case', 'A balancing ball'];
      let BALL = pick(RT, BALLS, [44, 28, 21, 7]);
      let BOARD = pick(RT, BOARDS, [42, 30, 21, 7]);
      let LAY = pick(RT, LAYS, [55, 35, 10]);
      let LIGHT = pick(RT, LIGHTS, [44, 34, 22]);
      let ROWS = pick(RT, [10, 12, 14], [30, 45, 25]);
      let RARE = pick(RT, RARES, [70, 11, 10, 9]);
      if (c.home) { BALL = 'Steel shot'; BOARD = 'Walnut and brass'; LAY = 'Classic triangle'; LIGHT = 'Desk lamp'; ROWS = 12; RARE = 'None'; }
      if (BOARD === 'Giant') ROWS = 18;
      let LY = LAYS.indexOf(LAY);
      const BK = BALLS.indexOf(BALL), BD = BOARDS.indexOf(BOARD), LT = LIGHTS.indexOf(LIGHT), RA = RARES.indexOf(RARE);
      c.trait('Balls', BALL); c.trait('Board', BOARD); c.trait('Pins', LAY); c.trait('Rows', BOARD === 'Giant' ? '18' : String(ROWS));
      c.trait('Light', LIGHT); c.trait('Something rare', RARE);
      const CAMS = ['Straight on', 'Close on the bins', 'Close on the pins', 'Across the desk'];
      const RCm = mkR(sd(6) ^ Math.imul(sd(2), 0x61c88647) ^ 0x2545f491);
      let CAM = pick(RCm, CAMS, [46, 20, 20, 14]); const CSG = RCm() < 0.5 ? 1 : -1; // which way it leans
      if (c.home) CAM = CAMS[0];
      let CM = CAMS.indexOf(CAM);
      c.trait('Camera', CAM);
      const RN = mkR((sd(7) ^ Math.imul(sd(3), 0x45d9f3b) ^ 0x83b65) >>> 0), dM = RN(), dW = RN(), dS = RN(); void dW; // dW: kept for a wedge-split field (planned, not built)
      const STAND = !c.home && dM < 0.36 && RARE !== 'A balancing ball' && RARE !== 'Two-colour pour';
      const SIX = !c.home && dS < 0.16 && BOARD !== 'Giant' && RARE !== 'Hourglass case';
      if (SIX) { ROWS = 6; c.trait('Rows', '6'); if (LAY === 'Dense field') { LAY = 'Classic triangle'; LY = 0; c.trait('Pins', LAY); } } // a finer lattice over seven bins aliases (the centre starves): six rows are the plain triangle
      c.trait('Moment', STAND ? 'The curve standing' : 'Pouring');
      const CBELL = STAND && CM === 2; // close on the pins would cut the standing bell off at the frame's foot: it is seen close on the bins, centred on the whole bell
      if (CBELL) { CM = 1; CAM = CAMS[1]; c.trait('Camera', CAM); }
    return out;
  },
});
// ==== end roll ====

// ==== roll 084 ====
ProtoRolls.add(84, {
  traits: {"Waters":{"look":true,"values":{"A deep fjord":390782,"An island strait with a lighthouse":217988,"A wide lake":174338,"Open sea":130085,"An Arctic crossing":86807}},"Sky":{"look":true,"values":{"Clear night, the Milky Way":270729,"Snowfall":228101,"Low cloud lit by a town":139359,"Sea fog":137431,"Blue hour":122608,"Moonrise":101772}},"Ferry":{"look":true,"values":{"A small car ferry":499133,"An old wooden passenger boat":280539,"A modern catamaran":220328}},"Shore":{"look":true,"values":{"A village with a church":330850,"A fishing harbour":277904,"An empty coast, one farm light":174387,"No land, a far ship and a buoy":130085,"A town in winter, festive lights":86774}},"Sea":{"look":true,"values":{"Long swell":407841,"Glassy calm":243674,"Choppy":216727,"Drift ice":131758}},"Deck lamps":{"look":true,"values":{"Warm white floods":331879,"Floods off, stern light only":263841,"Sodium floods":220475,"Cold white floods":183805}},"Something rare":{"values":{"Nothing":760393,"A ferry passing the other way":89918,"Sea fire in the wake":79699,"The aurora":69990}},"Vantage":{"look":true,"values":{"At the stern rail":336803,"High on the top deck":180232,"Watching the sky":166999,"Over the quarter":159665,"Leaning over the rail":156301}}},
  roll(hash) {
    const HOME = '0xcc15c91c5c3e054007c6095af139731d0ed8b89e34fc9d2a748ce8f6746c9360';   // hashFor(83, 0)
    const home = hash === HOME;
    const WATERS = ['A deep fjord', 'An island strait with a lighthouse', 'A wide lake', 'An Arctic crossing', 'Open sea'];
    const SKIES = ['Clear night, the Milky Way', 'Snowfall', 'Sea fog', 'Moonrise', 'Blue hour', 'Low cloud lit by a town'];
    const LAMPS = ['Warm white floods', 'Sodium floods', 'Cold white floods', 'Floods off, stern light only'];
    const FERRY = ['A small car ferry', 'An old wooden passenger boat', 'A modern catamaran'];
    const SHORE = ['A village with a church', 'A fishing harbour', 'An empty coast, one farm light', 'A town in winter, festive lights'];
    const SEA = ['Glassy calm', 'Long swell', 'Choppy'];
    const RARE = ['Nothing', 'Sea fire in the wake', 'A ferry passing the other way', 'The aurora'];
    const hx = hash.slice(2);
    let sa = parseInt(hx.slice(0, 8), 16) >>> 0, sb = parseInt(hx.slice(8, 16), 16) >>> 0, sc = parseInt(hx.slice(16, 24), 16) >>> 0, sd = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { sa >>>= 0; sb >>>= 0; sc >>>= 0; sd >>>= 0; let t = (sa + sb) | 0; sa = sb ^ sb >>> 9; sb = sc + (sc << 3) | 0; sc = sc << 21 | sc >>> 11; sd = sd + 1 | 0; t = t + sd | 0; sc = sc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) rnd();
    const pick = w => { let s = 0; for (const x of w) s += x; let v = rnd() * s; for (let i = 0; i < w.length; i++) { v -= w[i]; if (v < 0) return i; } return w.length - 1; };
    let waters = pick([45, 25, 20, 10]), weather = pick([45, 25, 18, 12]), ferry = pick([50, 28, 22]), shore = pick([38, 32, 20, 10]);
    let seaK = pick([28, 47, 25]), rare = pick([76, 8, 9, 7]);
    if (home) { waters = 0; weather = 0; ferry = 0; shore = 0; seaK = 1; rare = 0; }
    const aurora = rare === 3;
    if (aurora || rare === 1) weather = 0;
    if (rare === 1 && weather === 2) weather = 0;
    if (shore === 3 && weather === 2) weather = 1;
    let vq = (sd ^ 0xA54FF53A) >>> 0;
    const RV = () => { vq = (vq + 0x6D2B79F5) >>> 0; let t = vq; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const pickV = w => { let tot = 0; for (const x of w) tot += x; let x = RV() * tot; for (let i = 0; i < w.length; i++) { x -= w[i]; if (x < 0) return i; } return w.length - 1; };
    let vant = pickV([50, 18, 16, 16]); pickV([64, 36]);   // gear: drawn, not a trait
    let ice = (waters === 0 || waters === 3) && RV() < (waters === 3 ? 0.42 : 0.2) ? 1 : 0;
    const rTop = RV(); if (vant === 0 && rTop < 0.36) vant = 4;
    if (home) { vant = 0; ice = 0; }
    if (weather === 2 && vant === 1) vant = 2;
    if (aurora && vant === 2) vant = 1;
    if (rare === 2 && vant === 2) vant = 0;
    if (ice) seaK = 0;
    let s3 = 0x084c0de5;
    for (let i = 0; i < 64; i += 8) s3 = Math.imul(s3 ^ parseInt(hx.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s3 >>> 15);
    const RS = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const q0 = RS(), q1 = RS(), q2 = RS();
    let sky = weather === 0 ? (q0 < .4 ? 0 : q0 < .72 ? 4 : 5) : weather;
    let lamp = q1 < .36 ? 0 : q1 < .6 ? 1 : q1 < .8 ? 2 : 3;
    if (aurora) sky = 0;
    if (rare === 1) { sky = q0 < .6 ? 0 : 5; lamp = 3; }
    if (q2 < .13) waters = 4;
    if (home) { sky = 0; lamp = 0; waters = 0; }
    return [
      ['Waters', WATERS[waters]],
      ['Sky', SKIES[sky]],
      ['Ferry', FERRY[ferry]],
      ['Shore', waters === 4 ? 'No land, a far ship and a buoy' : SHORE[shore]],
      ['Sea', ice ? 'Drift ice' : SEA[seaK]],
      ['Deck lamps', LAMPS[lamp]],
      ['Something rare', RARE[rare]],
      ['Vantage', ['At the stern rail', 'Watching the sky', 'Leaning over the rail', 'Over the quarter', 'High on the top deck'][vant]],
    ];
  },
});
// ==== end roll ====

// ==== roll 085 ====
ProtoRolls.add(85, {
  traits: {"Colours":{"look":true,"values":{"Orange in yellow":340240,"Purple in blue":239588,"Green in clear":180130,"Red in purple":179899,"Glitter":60143}},"Lamp":{"look":true,"values":{"Rocket":460165,"Tall column":260093,"Globe":199770,"Giant floor lamp":79972}},"Room":{"look":true,"values":{"Bedroom":380205,"Dorm desk":280067,"Living room":259711,"Rainy window":80017}},"Wax":{"look":true,"values":{"A few big blobs":390226,"Many small blobs":359201,"A swarm of droplets":160338,"One huge blob":90235}},"Base":{"look":true,"values":{"Brushed silver":440107,"Black satin":279649,"Copper":199983,"Gold":80261}},"Outside":{"look":true,"values":{"City lights":449565,"Quiet street":350295,"Full moon":200140}},"Rare":{"values":{"None":839756,"Two-colour wax":90307,"Overheated":69937}},"Framing":{"look":true,"values":{"Whole lamp":399767,"Close on the wax":340009,"Wide, off to one side":260224}},"Stage":{"values":{"Warm and flowing":835022,"Warming up, the lump softening":164978}}},
  roll(hash) {
    const HOME = '0x655fdaf8f12a160445ad953c1b2c75f39c046e92d3393f25b811d2931a2b3639';
    const home = hash === HOME, hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0), RS = mkR(32);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (let i = 0; i < opts.length; i++) { x -= opts[i][1]; if (x <= 0) return i; } return opts.length - 1; };
    const COL = [['Orange in yellow', 34], ['Purple in blue', 24], ['Green in clear', 18], ['Red in purple', 18], ['Glitter', 6]];
    const LMP = [['Rocket', 46], ['Tall column', 26], ['Globe', 20], ['Giant floor lamp', 8]];
    const ROOM = [['Bedroom', 38], ['Dorm desk', 28], ['Living room', 26], ['Rainy window', 8]];
    const WAX = [['A few big blobs', 52], ['Many small blobs', 48]];
    const BAS = [['Brushed silver', 44], ['Black satin', 28], ['Copper', 20], ['Gold', 8]];
    const OUT = [['City lights', 45], ['Quiet street', 35], ['Full moon', 20]];
    const RAR = [['None', 76], ['Two-colour wax', 9], ['Overheated', 7], ['Cat watching', 8]];
    let colK = pick(COL), lmpK = pick(LMP), roomK = pick(ROOM), waxK = pick(WAX), basK = pick(BAS), outK = pick(OUT), rarK = pick(RAR);
    if (home) { colK = 0; lmpK = 0; roomK = 0; waxK = 0; basK = 0; outK = 0; rarK = 0; }
    let vh = 0x811c9dc5; for (let i = 0; i < hx.length; i++) vh = Math.imul(vh ^ hx.charCodeAt(i), 16777619) >>> 0;
    vh = (vh ^ 0x085a11ce) >>> 0;
    const RV = () => { vh = (vh + 0x6D2B79F5) | 0; let t = Math.imul(vh ^ (vh >>> 15), 1 | vh); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const FRM = [['Close on the wax', 34], ['Wide, off to one side', 26], ['Whole lamp', 40]];
    let frK = pick(FRM, RV), formK = 0;
    { const u = RV(); formK = u < 0.09 ? 1 : u < 0.25 ? 2 : 0; }
    if (home) { frK = 2; formK = 0; }
    // the wax stream's first draw (makeSim draws nothing before it)
    const cold = !home && RS() < 0.22 && !formK;
    return [
      ['Colours', COL[colK][0]], ['Lamp', LMP[lmpK][0]], ['Room', ROOM[roomK][0]],
      ['Wax', formK === 1 ? 'One huge blob' : formK === 2 ? 'A swarm of droplets' : WAX[waxK][0]],
      ['Base', BAS[basK][0]], ['Outside', OUT[outK][0]], ['Rare', RAR[rarK === 3 ? 0 : rarK][0]], ['Framing', FRM[frK][0]],
      ['Stage', cold ? 'Warming up, the lump softening' : 'Warm and flowing'],
    ];
  },
});
// ==== end roll ====

// ==== roll 091 ====
ProtoRolls.add(91, {
  traits: {"Model":{"look":true,"values":{"Cylinder":315307,"Airfoil":205394,"Row of rods":92241,"Flat plate":76334,"Sphere":76092,"Hump on the floor":59222,"Fence on the floor":59131,"Block on the floor":58851,"Bird wing":57428}},"Smoke":{"look":true,"values":{"Smoke rake":412151,"Three filaments":127065,"Ink dye":125166,"Smoke wire":105273,"Pulsed smoke wire":104682,"Hydrogen bubbles":75615,"Two-colour dye":50048}},"Tunnel":{"look":true,"values":{"Glass benchtop":420357,"Old wooden":328814,"Water channel":250829}},"Light":{"look":true,"values":{"White light sheet":450246,"Green laser sheet":349791,"Cold light sheet":199963}},"Model size":{"look":true,"values":{"Standard":449930,"Small":299990,"Large":250080}},"Room":{"look":true,"values":{"Night lab":399625,"Blackout":301264,"Workshop lamp":299111}},"Rare":{"values":{"None":819706,"Spinning cylinder":60310,"Locked street":60151,"Tandem cylinders":59833}},"View":{"look":true,"values":{"Close on the wake":399614,"Test section":207865,"Standing back":207557,"Through the glass":184964}},"Flow":{"look":true,"values":{"Vortex street":493169,"Steady wake":230705,"Turbulent":119879,"Billowing bubble":106763,"Steady bubble":49484}}},
  roll(hash) {
    const HOME = '0xa4f15d62f804ff6ac5e010ad09c01902e4fcd071032212a7445c71defbfff27d';   // hashFor(90, 0)
    const home = hash === HOME;
    const hx = (hash || '0x0').slice(2).padEnd(64, '0');
    const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
    const FOFF = 0.5;
    const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR((sd(0) ^ Math.imul(sd(6), 0x2c1b3c6d) ^ 0x0917a11e) >>> 0);
    const pick = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };
    const OBJS = ['Cylinder', 'Airfoil', 'Flat plate', 'Sphere', 'Bird wing'];
    const TUNS = ['Glass benchtop', 'Old wooden', 'Water channel'];
    const SMKS = ['Smoke rake', 'Smoke wire', 'Three filaments', 'Ink dye', 'Hydrogen bubbles', 'Two-colour dye'];
    const LIGHTS = ['Green laser sheet', 'White light sheet', 'Cold light sheet'];
    const SCALES = ['Small', 'Standard', 'Large'];
    const ROOMS = ['Blackout', 'Night lab', 'Workshop lamp'];
    const RARES = ['None', 'Tandem cylinders', 'Spinning cylinder', 'Locked street'];
    let OBJ = pick(OBJS, [32, 25, 18, 18, 7]);
    let TUN = pick(TUNS, [42, 33, 25]);
    let SMK = TUN === 'Water channel' ? pick(SMKS.slice(3), [50, 30, 20]) : pick(SMKS.slice(0, 3), [55, 28, 17]);
    let LIT = pick(LIGHTS, [35, 45, 20]);
    let SCL = pick(SCALES, [30, 45, 25]);
    let ROOM = pick(ROOMS, [30, 40, 30]);
    let RARE = pick(RARES, [82, 6, 6, 6]);
    if (home) { OBJ = 'Cylinder'; TUN = 'Glass benchtop'; SMK = 'Smoke rake'; LIT = 'White light sheet'; SCL = 'Standard'; ROOM = 'Night lab'; RARE = 'None'; }
    if (RARE !== 'None') OBJ = 'Cylinder';
    const R3 = mkR((sd(4) ^ Math.imul(sd(1), 0x9e3779b1) ^ 0x91b8e) >>> 0), dV = R3(), dS = R3(), dM = R3(), dF = (R3() + FOFF) % 1;
    const BARS = !home && dS < 0.5 && SMK === 'Smoke wire';
    if (!home && RARE === 'None' && SMK !== 'Three filaments' && (OBJ === 'Cylinder' || OBJ === 'Sphere' || OBJ === 'Flat plate') && dM < 0.19) OBJ = 'Row of rods';
    const FLOORS = ['Hump on the floor', 'Fence on the floor', 'Block on the floor'];
    const FLOOR = !home && RARE === 'None' && SMK !== 'Three filaments' && (OBJ === 'Cylinder' || OBJ === 'Sphere' || OBJ === 'Flat plate') && dF < 0.45;
    if (FLOOR) OBJ = FLOORS[Math.min(2, Math.floor(dF / 0.15))];
    const R2 = mkR((sd(2) ^ Math.imul(sd(5), 0x2545f491) ^ 0x5eed0091) >>> 0);
    const pick2 = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R2() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };
    const VIEWS = ['Standing back', 'Test section', 'Close on the wake'];
    const FLOWS = ['Vortex street', 'Steady wake', 'Turbulent'];
    let VIEW = pick2(VIEWS, [30, 30, 40]), FLW = pick2(FLOWS, [60, 28, 12]);
    if (home) { VIEW = 'Test section'; FLW = 'Vortex street'; }
    else if (VIEW !== 'Close on the wake' && RARE !== 'Tandem cylinders' && SMK !== 'Three filaments' && dV < (ROOM === 'Blackout' ? 0.55 : 0.30)) VIEW = 'Through the glass';
    return [['Model', OBJ], ['Smoke', BARS ? 'Pulsed smoke wire' : SMK], ['Tunnel', TUN], ['Light', LIT], ['Model size', SCL], ['Room', ROOM], ['Rare', RARE],
      ['View', VIEW], ['Flow', FLOOR ? ['Billowing bubble', 'Steady bubble', 'Turbulent'][FLOWS.indexOf(FLW)] : FLW]];
  },
});
// ==== end roll ====

// ==== roll 092 ====
ProtoRolls.add(92, {
  traits: {"Kite":{"look":true,"values":{"Diamond":280073,"Box":200390,"Delta":195665,"Japanese rectangle":119958,"Rokkaku":119862,"Sled":84052}},"Material":{"look":true,"values":{"Red paper":339946,"Silk patchwork":300293,"Ripstop panels":246271,"Cream washi":113490}},"Tail":{"look":true,"values":{"None":209704,"Bow tail":195879,"Streamers":140475,"Single ribbon":117555,"Twin rope tails":90031,"Paper fringe":84194,"Two short streamers":84052,"Twin ribbons":78110}},"Sky":{"look":true,"values":{"Summer cumulus":440152,"High blue with cirrus":240045,"Golden evening":120481,"Storm front far off":100027,"After sunset":99295}},"Wind":{"look":true,"values":{"Gusty":449791,"Gentle breeze":300396,"Strong":249813}},"Foreground":{"look":true,"values":{"Weathered post":450218,"Post and wire":349751,"Thistle by the post":200031}},"Rare":{"values":{"None":759938,"A second kite tangling":80126,"Thistledown on the wind":80114,"A long ribbon train":79822}},"View":{"look":true,"values":{"Low in the grass":327495,"Long lens":160350,"Wide sky":144543,"Under the kite":102253,"Low in the grass, at a kite festival":80976,"Tilted on your side":63682,"Long lens, at a kite festival":40379,"Wide sky, at a kite festival":35636,"Under the kite, at a kite festival":28671,"Tilted on your side, at a kite festival":16015}},"Line":{"look":true,"values":{"From your hands":499911,"From the right":250453,"From the left":249636}}},
  roll(hash) {
    const HOME = '0x66587a611b4727a72ffcf27212ab2afebeeb30786e3fdf5db39aba9518250457';   // hashFor(91, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = off => {
      let a = parseInt(hx.slice(off, off + 8), 16) >>> 0, b = parseInt(hx.slice(off + 8, off + 16), 16) >>> 0, cc = parseInt(hx.slice(off + 16, off + 24), 16) >>> 0, d = parseInt(hx.slice(off + 24, off + 32), 16) >>> 0;
      const f = () => { a >>>= 0; b >>>= 0; cc >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ (b >>> 9); b = (cc + (cc << 3)) | 0; cc = (cc << 21) | (cc >>> 11); d = (d + 1) | 0; t = (t + d) | 0; cc = (cc + t) | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 15; i++) f();
      return f;
    };
    const R = mkR(0);
    const pick = (opts, r) => { r = r || R; let tot = 0; for (const o of opts) tot += o[1]; let x = r() * tot; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    let kind = pick([['Diamond', 40], ['Delta', 28], ['Box', 20], ['Japanese rectangle', 12]]);
    let mat = pick([['Red paper', 34], ['Silk patchwork', 30], ['Ripstop panels', 28], ['Cream washi', 8]]);
    let sky = pick([['Summer cumulus', 44], ['High blue with cirrus', 24], ['Golden evening', 22], ['Storm front far off', 10]]);
    let windK = pick([['Gentle breeze', 30], ['Gusty', 45], ['Strong', 25]]);
    let fg = pick([['Weathered post', 45], ['Post and wire', 35], ['Thistle by the post', 20]]);
    let rare = pick([['None', 76], ['A second kite tangling', 8], ['Thistledown on the wind', 8], ['A long ribbon train', 8]]);
    const tailOpts = { Diamond: [['Bow tail', 70], ['Paper fringe', 30]], Delta: [['Single ribbon', 60], ['Twin ribbons', 40]], Box: [['Streamers', 70], ['None', 30]], 'Japanese rectangle': [['Twin rope tails', 75], ['None', 25]] };
    let tailK = pick(tailOpts[kind]);
    if (home) { kind = 'Diamond'; mat = 'Red paper'; sky = 'Summer cumulus'; windK = 'Gusty'; fg = 'Weathered post'; rare = 'None'; tailK = 'Bow tail'; }
    if (kind === 'Japanese rectangle' && mat === 'Ripstop panels') mat = 'Cream washi';
    const RV = mkR(28);
    let view = pick([['Low in the grass', 50], ['Wide sky', 22], ['Long lens', 20], ['Tilted on your side', 8]], RV);
    let lineK = pick([['From your hands', 50], ['From the left', 25], ['From the right', 25]], RV);
    if (home) { view = 'Low in the grass'; lineK = 'From your hands'; }
    const RF2 = mkR(20); for (let i = 0; i < 7; i++) RF2();
    const FEST = !home && rare !== 'A second kite tangling' && RF2() < 0.22;
    const RN = mkR(2), dV = RN(), dK = RN(), dS = RN();
    if (!home) {
      if ((view === 'Low in the grass' || view === 'Wide sky') && rare !== 'A second kite tangling' && sky !== 'Storm front far off' && dV < 0.22) view = 'Under the kite';
      if (kind === 'Diamond' && dK < 0.3) { kind = 'Rokkaku'; tailK = 'None'; }
      else if (kind === 'Delta' && dK < 0.3) { kind = 'Sled'; tailK = 'Two short streamers'; }
      if (sky === 'Golden evening' && dS < 0.45) sky = 'After sunset';
    }
    return [['Kite', kind], ['Material', mat], ['Tail', tailK], ['Sky', sky], ['Wind', windK], ['Foreground', fg], ['Rare', rare],
      ['View', FEST ? view + ', at a kite festival' : view], ['Line', lineK]];
  },
});
// ==== end roll ====

// ==== roll 093 ====
ProtoRolls.add(93, {
  traits: {"Machine":{"look":true,"values":{"black office":400460,"mint-green portable":259421,"red portable":239983,"glass-key antique":100136}},"Paper":{"look":true,"values":{"white":359748,"cream":340198,"onionskin":220470,"blue carbon copy":79584}},"Ribbon":{"look":true,"values":{"black":499768,"black and red":400059,"purple":100173}},"Ribbon age":{"look":true,"values":{"worn":449080,"fresh":401064,"nearly dry":149856}},"Desk":{"look":true,"values":{"oak desk":399579,"kitchen table":320244,"cafe table":280177}},"Marks":{"look":true,"values":{"dots and lines":440802,"geometric shapes":418962,"stars and moons":140236}},"Pattern":{"look":true,"values":{"waves":260415,"diamonds":239394,"blocks":219706,"scatter":180409,"mirror":100076}},"Something rare":{"values":{"none":700142,"jammed typebar":110294,"paw prints across the page":99597,"rain on the window":89967}},"View":{"look":true,"values":{"front":245756,"over the shoulder":212259,"from above":180602,"close on the typebars":98080,"low across the keys":82097,"front, drafts crumpled on the desk":54327,"over the shoulder, drafts crumpled on the desk":47364,"from above, drafts crumpled on the desk":39815,"close on the typebars, drafts crumpled on the desk":21547,"low across the keys, drafts crumpled on the desk":18153}},"Light":{"values":{"window":681707,"lamp at night":199827,"through blinds":118466}}},
  roll(hash) {
    const HOME = '0xa66219310b0c97b4fae23c8af3c15dc0d4ddc9ddf4701d29473048d3c85328a8';   // hashFor(92, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    let ra = parseInt(hx.slice(0, 8), 16) | 0, rb = parseInt(hx.slice(8, 16), 16) | 0, rc = parseInt(hx.slice(16, 24), 16) | 0, rd = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { const t = (ra + rb | 0) + rd | 0; rd = rd + 1 | 0; ra = rb ^ rb >>> 9; rb = rc + (rc << 3) | 0; rc = rc << 21 | rc >>> 11; rc = rc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const wp = o => { let s = 0; for (const e of o) s += e[1]; let r = rnd() * s; for (const e of o) { r -= e[1]; if (r <= 0) return e[0]; } return o[o.length - 1][0]; };
    let machK = wp([['black office', 40], ['mint-green portable', 26], ['red portable', 24], ['glass-key antique', 10]]);
    let paperK = wp([['white', 36], ['cream', 34], ['onionskin', 22], ['blue carbon copy', 8]]);
    let ribK = wp([['black', 50], ['black and red', 40], ['purple', 10]]);
    let ageK = wp([['fresh', 40], ['worn', 45], ['nearly dry', 15]]);
    let deskK = wp([['oak desk', 40], ['kitchen table', 32], ['cafe table', 28]]);
    let glyK = wp([['dots and lines', 44], ['geometric shapes', 42], ['stars and moons', 14]]);
    let patK = wp([['waves', 26], ['diamonds', 24], ['blocks', 22], ['scatter', 18], ['mirror', 10]]);
    let rareK = wp([['none', 70], ['jammed typebar', 11], ['paw prints across the page', 10], ['rain on the window', 9]]);
    if (home) { machK = 'black office'; paperK = 'cream'; ribK = 'black and red'; ageK = 'fresh'; deskK = 'oak desk'; glyK = 'geometric shapes'; patK = 'diamonds'; rareK = 'none'; }
    let vs = (parseInt(hx.slice(48, 56), 16) ^ 0x093b1e78) >>> 0;
    const vr = () => { vs = vs + 0x6D2B79F5 | 0; let t = Math.imul(vs ^ vs >>> 15, 1 | vs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const VIEWS = ['front', 'over the shoulder', 'close on the typebars', 'from above', 'low across the keys'];
    const VIEW0 = home ? 0 : (r => r < 0.40 ? 0 : r < 0.66 ? 1 : r < 0.88 ? 3 : 2)(vr());
    const DRAFTS = !home && rareK !== 'paw prints across the page' && vr() < 0.2;
    let s4 = (parseInt(hx.slice(32, 40), 16) ^ 0x93b3e) >>> 0;
    const r4 = () => { s4 = s4 + 0x6D2B79F5 | 0; let t = Math.imul(s4 ^ s4 >>> 15, 1 | s4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const dL = r4(), dV = r4();
    const LIGHT = home || rareK === 'rain on the window' ? 0 : dL < 0.22 ? 1 : dL < 0.35 ? 2 : 0;
    const VIEW = VIEW0 === 0 && !home && dV < 0.25 ? 4 : VIEW0;
    return [
      ['Machine', machK], ['Paper', paperK], ['Ribbon', ribK], ['Ribbon age', ageK], ['Desk', deskK], ['Marks', glyK], ['Pattern', patK], ['Something rare', rareK],
      ['View', DRAFTS ? VIEWS[VIEW] + ', drafts crumpled on the desk' : VIEWS[VIEW]], ['Light', ['window', 'lamp at night', 'through blinds'][LIGHT]],
    ];
  },
});
// ==== end roll ====

// ==== roll 121 ====
ProtoRolls.add(121, {
  traits: {"Liquid":{"look":true,"values":{"Water":399951,"Silicone oil":279733,"Milk":220058,"Ferrofluid":100258}},"Dish":{"look":true,"values":{"Black glass":478956,"White porcelain":400844,"Square tray":120200}},"Light":{"look":true,"values":{"Ring light":499644,"Single lamp":360444,"Coloured gel":139912}},"Mode at mint":{"look":true,"values":{"Hexagons":305250,"Squares":216056,"Stripes":153001,"Chaos":144365,"Below threshold":100479,"Quasi-crystal":80849}},"Pitch":{"look":true,"values":{"Middle":343435,"High":256850,"Low":256092,"Deep bass":143623}},"Walkers":{"values":{"None":899521,"Walker":70368,"Walker pair":30111}},"Camera":{"values":{"Overhead":550007,"Low oblique":288777,"Close in":161216}},"Cone":{"look":true,"values":{"Black paper":459539,"Grey poly":240158,"Brown paper":210399,"Woven fibre":89904}}},
  roll(hash) {
    const HOME = '0x98166e35c6f980d27c3cd43ba6763193a7c30625e9929894c473a07fd61c875e';
    const out = [];
    const c = { hash, home: hash === HOME, trait(k, v) { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; } };
    const TAU = Math.PI * 2;
      const hx = (c.hash || '0x0').slice(2).padEnd(64, '0');
      const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
      const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
      const R = mkR((sd(0) ^ Math.imul(sd(3), 0x2c1b3c6d) ^ 0x121fa5ad) >>> 0);
      const pick = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };

      const LIQS = ['Water', 'Silicone oil', 'Milk', 'Ferrofluid'];
      const DISHES = ['Black glass', 'White porcelain', 'Square tray'];
      const LIGHTS_ = ['Ring light', 'Single lamp', 'Coloured gel'];
      const MODES = ['Stripes', 'Squares', 'Hexagons', 'Quasi-crystal', 'Chaos'];
      const PITCHES = ['Low', 'Middle', 'High'];
      const WALKS = ['None', 'Walker', 'Walker pair'];
      let LIQ = pick(LIQS, [40, 28, 22, 10]);
      let DISH = pick(DISHES, [48, 40, 12]);
      let LIT = pick(LIGHTS_, [50, 36, 14]);
      let MODE = pick(MODES, [17, 24, 34, 9, 16]);
      let PIT = pick(PITCHES, [30, 40, 30]);
      let WALK = pick(WALKS, [90, 7, 3]);
      const rot0 = R() * TAU, ph1 = R(), ph2 = R(), ph3 = R();
      if (c.home) { LIQ = 'Water'; DISH = 'Black glass'; LIT = 'Ring light'; MODE = 'Hexagons'; PIT = 'Middle'; WALK = 'None'; }
      const LI = LIQS.indexOf(LIQ), DI = DISHES.indexOf(DISH), GI = LIGHTS_.indexOf(LIT), PI = PITCHES.indexOf(PIT), WK = WALKS.indexOf(WALK);
      let MI = MODES.indexOf(MODE) + 1;
      if (WK > 0) MI = 0;
      c.trait('Liquid', LIQ); c.trait('Dish', DISH); c.trait('Light', LIT);
      const RQ = mkR((sd(6) ^ Math.imul(sd(1), 0x165667b1) ^ 0x121b0a55) >>> 0);
      const DEEP = !c.home && WK === 0 && RQ() < 0.16;
      if (DEEP) PIT = 'Deep bass';
      c.trait('Mode at mint', WK > 0 ? 'Below threshold' : MODE); c.trait('Pitch', PIT); c.trait('Walkers', WALK);
      const CAMS = ['Overhead', 'Low oblique', 'Close in'];
      const RC = mkR((sd(7) ^ Math.imul(sd(5), 0x27d4eb2d) ^ 0x121ca3eb) >>> 0);
      const rcw = RC() * 100, rc1 = RC(), rc2 = RC();
      let CI = rcw < 50 ? 0 : rcw < 82 ? 1 : 2;
      if (WK > 0 || c.home) CI = 0;
      c.trait('Camera', CAMS[CI]);
      const CONES = ['Black paper', 'Grey poly', 'Brown paper', 'Woven fibre'];
      const RK = mkR((sd(2) ^ Math.imul(sd(4), 0x85ebca6b) ^ 0x121c0e5e) >>> 0);
      const rkw = RK() * 100, rotD = RK() * TAU;
      const KI = c.home ? 0 : rkw < 46 ? 0 : rkw < 70 ? 1 : rkw < 91 ? 2 : 3;
      c.trait('Cone', CONES[KI]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 124 ====
ProtoRolls.add(124, {
  traits: {"Balls":{"values":{"polished steel":539853,"brass":260235,"one heavy ball":100076,"black glass":99836}},"Count":{"values":{"3":80122,"5":600294,"7":319584}},"Frame":{"values":{"chrome":520734,"walnut":339409,"hand-bent wire":139857}},"Desk":{"look":true,"values":{"walnut":499960,"green leather":197688,"oxblood leather":162275,"dusty bench":140077}},"Light":{"values":{"window":538999,"desk lamp":341430,"candle":119571}},"Line":{"values":{"true":860384,"one ball out of line":139616}},"Camera":{"look":true,"values":{"low along the row":367772,"straight down":199902,"face on":192225,"from above":144459,"end on":63651,"close on the click":31991}},"Release":{"values":{"one ball":554199,"two balls":247730,"both ends":135566,"three balls":62505}}},
  roll(hash) {
    const HOME = '0x7f506c2dfe95d0d483d7d80f65a2d47df4706dc93d47fea8a15758551ded99a3';
    const home = hash === HOME;
    function makeRng(hash, salt) {
      const h = hash.replace(/^0x/, '').padEnd(64, '0');
      let a = parseInt(h.slice(0, 8), 16) ^ salt, b = parseInt(h.slice(8, 16), 16) ^ Math.imul(salt, 7919), c = parseInt(h.slice(16, 24), 16) ^ parseInt(h.slice(48, 56), 16), d = parseInt(h.slice(24, 32), 16) ^ parseInt(h.slice(32, 40), 16) ^ parseInt(h.slice(56, 64), 16);
      const f = () => {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
      for (let i = 0; i < 20; i++) f();
      return f;
    }
    const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let x = r() * s; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
    const rng = makeRng(hash, 124);
    let ballT = pick(rng, [['polished steel', 54], ['brass', 26], ['black glass', 10], ['one heavy ball', 10]]);
    let count = pick(rng, [[5, 60], [7, 32], [3, 8]]);
    let frameT = pick(rng, [['chrome', 52], ['walnut', 34], ['hand-bent wire', 14]]);
    let deskT = pick(rng, [['walnut', 50], ['leather', 36], ['dusty bench', 14]]);
    let lightT = pick(rng, [['window', 54], ['desk lamp', 34], ['candle', 12]]);
    let lineT = pick(rng, [['true', 86], ['one ball out of line', 14]]);
    if (home) { ballT = 'polished steel'; count = 5; frameT = 'chrome'; deskT = 'walnut'; lightT = 'window'; lineT = 'true'; }
    const s2 = makeRng(hash, 9124);
    const deskK = deskT === 'walnut' ? 0 : deskT === 'leather' ? 1 : 2;
    const leatherGreen = s2() < 0.55;
    if (deskK === 1) deskT = leatherGreen ? 'green leather' : 'oxblood leather';
    const vr = makeRng(hash, 7124);
    let camT = pick(vr, [['low along the row', 46], ['face on', 24], ['from above', 18], ['end on', 8], ['close on the click', 4]]);
    let relT = pick(vr, [['one ball', 54], ['two balls', 25], ['both ends', 14], ['three balls', 7]]);
    if (!home && vr() < 0.2) camT = 'straight down';
    if (home) { camT = 'low along the row'; relT = 'one ball'; }
    if (count === 3 && relT === 'three balls') relT = 'two balls';
    if (camT === 'close on the click') relT = 'one ball';
    return [['Balls', ballT], ['Count', String(count)], ['Frame', frameT], ['Desk', deskT], ['Light', lightT], ['Line', lineT], ['Camera', camT], ['Release', relT]];
  },
});
// ==== end roll ====

// ==== roll 126 ====
ProtoRolls.add(126, {
  traits: {"Milk":{"look":true,"values":{"Whole":439895,"Cream":240010,"Skim":239689,"Oat":80406}},"Colours":{"values":{"Primary":550154,"Pastel":350237,"Gold mica":99609}},"Plate":{"look":true,"values":{"White china":450070,"Blue enamel":329923,"Glass on wood":220007}},"Table":{"look":true,"values":{"Oak":492935,"Linen":312552,"Slate":194513}},"Light":{"values":{"Window":619943,"Warm lamp":380057}},"Drops":{"look":true,"values":{"Ring":339647,"Cluster":300891,"Scattered":279336,"Rainbow ring":80126}},"View":{"values":{"Low across the plate":579773,"From above":330323,"Straight down into the milk":89904}},"Stage":{"values":{"Swirling":719301,"Just touched":280699}}},
  roll(hash) {
    const HOME = '0xa358ffc391f9070466abbac0cb24c403fa9b4bc955de45570f3d689d902b71da';
    const home = hash === HOME;
    const MILKS = ['Whole', 'Cream', 'Skim', 'Oat'], COLS = ['Primary', 'Pastel', 'Gold mica'];
    const PLATES = ['White china', 'Blue enamel', 'Glass on wood'], TABLES = ['Linen', 'Oak', 'Slate'], LAYOUTS = ['Ring', 'Cluster', 'Scattered', 'Rainbow ring'];
    const VIEWS = ['Low across the plate', 'From above', 'Straight down into the milk'];
    const hw = i => parseInt(hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
    const mul = a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const RT = mul(hw(0) ^ hw(5));
    const pickW = (R, w) => { let s = 0; for (const x of w) s += x; let r = R() * s; for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i; } return w.length - 1; };
    let milkK = pickW(RT, [44, 24, 24, 8]), colK = pickW(RT, [55, 35, 10]), plateK = pickW(RT, [45, 33, 22]), lightK = pickW(RT, [62, 38]), layK = pickW(RT, [34, 30, 28, 8]);
    let tableK = plateK === 2 ? 1 : pickW(RT, [40, 35, 25]);
    if (home) { milkK = 0; colK = 0; plateK = 0; lightK = 1; layK = 1; tableK = 1; }
    const RV = mul(hw(6) ^ hw(1) ^ 0x51ed27);
    let viewK = pickW(RV, [58, 33, 9]);
    if (home) viewK = 0;
    const RS = mul(hw(3) ^ hw(6) ^ 0x126a5e);
    let STG = RS() < 0.28 ? 1 : 0;
    if (home) STG = 0;
    return [['Milk', MILKS[milkK]], ['Colours', COLS[colK]], ['Plate', PLATES[plateK]], ['Table', TABLES[tableK]],
      ['Light', lightK ? 'Warm lamp' : 'Window'], ['Drops', LAYOUTS[layK]], ['View', VIEWS[viewK]], ['Stage', STG ? 'Just touched' : 'Swirling']];
  },
});
// ==== end roll ====

// ==== roll 140 ====
ProtoRolls.add(140, {
  traits: {"Bottle":{"look":true,"values":{"Ribbed":439487,"Waisted grip":259782,"Smooth":220354,"Blue plastic":80377}},"Condition":{"values":{"Scuffed":570042,"As bought":280173,"Crushed":149785}},"Condensation":{"values":{"Dry":520610,"Misted":330140,"Beaded":149250}},"Water":{"values":{"Clear":659574,"Sparkling":180477,"Faintly blue":159949}},"Setting":{"look":true,"values":{"Kitchen at night":449881,"Bathroom tiles":299138,"Window afternoon":250981}},"Table":{"look":true,"values":{"Tiled ledge":303825,"Oak boards":298000,"Walnut":211599,"Grey marble":186576}},"Cap":{"look":true,"values":{"Blue cap":400139,"White cap":300109,"Green cap":179606,"Black cap":120146}},"Wall bubbles":{"values":{"Clinging":500068,"Few":350143,"Beaded":149789}},"Camera":{"look":true,"values":{"Long lens, centred":339995,"Off to one side":240412,"Close on the water":180066,"Low at the table":159551,"Across the room":79976}}},
  roll(hash) {
    const HOME = '0x70bf13e138bf8056cea5fa45e3d8c3ee1690b3c4b3a9c2911af216ae420060a9';
    const home = hash === HOME;
    const BOTTLES = ['Ribbed', 'Waisted grip', 'Blue plastic', 'Smooth'], CONDITIONS = ['As bought', 'Scuffed', 'Crushed'], DAMPS = ['Dry', 'Misted', 'Beaded'];
    const WATERS = ['Clear', 'Faintly blue', 'Sparkling'], SETTINGS = ['Kitchen at night', 'Bathroom tiles', 'Window afternoon'];
    const TABLES = ['Oak boards', 'Walnut', 'Grey marble', 'Tiled ledge'], CAPS = ['Blue cap', 'White cap', 'Green cap', 'Black cap'], BUBBLES = ['Few', 'Clinging', 'Beaded'];
    const hx = hash.slice(2);
    const mkR = (off, salt = 0) => {
      let a = (parseInt(hx.slice(off, off + 8), 16) ^ salt) >>> 0;
      return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    };
    const R = mkR(0);
    const pick = (w) => { let tot = 0; for (const x of w) tot += x; let x = R() * tot; for (let i = 0; i < w.length; i++) { x -= w[i]; if (x <= 0) return i; } return w.length - 1; };
    let dk = pick([44, 26, 8, 22]); pick([88, 12]);
    let wk = pick([84, 16]), sk = pick([45, 30, 25]), tk = pick([35, 25, 22, 18]), ck = pick([40, 30, 18, 12]), uk = pick([35, 50, 15]);
    if (sk === 1 && R() < 0.5) tk = 3;
    { const RK = mkR(32, 0x3e9c51a7); if (wk === 0 && RK() < 0.215) wk = 2; }
    if (home) { dk = 0; wk = 0; sk = 0; tk = 0; ck = 0; uk = 1; }
    const RW = mkR(40, 0x7d3a91c3);
    const pickW = (w) => { let tot = 0; for (const x of w) tot += x; let x = RW() * tot; for (let i = 0; i < w.length; i++) { x -= w[i]; if (x <= 0) return i; } return w.length - 1; };
    let cdk = pickW([28, 57, 15]), dmk = pickW([52, 33, 15]);
    if (home) { cdk = 1; dmk = 1; }
    const RV = mkR(24, 0x2c1b3c6d);
    const vw = [['Long lens, centred', 34], ['Off to one side', 24], ['Close on the water', 18], ['Low at the table', 16], ['Across the room', 8]];
    let camT = (() => { let tot = 0; for (const o of vw) tot += o[1]; let x = RV() * tot; for (const o of vw) { x -= o[1]; if (x <= 0) return o[0]; } return vw[0][0]; })();
    if (home) camT = 'Long lens, centred';
    return [['Bottle', BOTTLES[dk]], ['Condition', CONDITIONS[cdk]], ['Condensation', DAMPS[dmk]], ['Water', WATERS[wk]], ['Setting', SETTINGS[sk]],
      ['Table', TABLES[tk]], ['Cap', CAPS[ck]], ['Wall bubbles', BUBBLES[uk]], ['Camera', camT]];
  },
});
// ==== end roll ====

// ==== roll 147 ====
ProtoRolls.add(147, {
  traits: {"shooter":{"look":true,"values":{"cat's-eye":340954,"swirl":299141,"onionskin":219994,"steel bumboozer":70060,"clay":69851}},"set":{"look":true,"values":{"bright swirls":499602,"sea glass":360167,"galaxy with mica":140231}},"ground":{"values":{"dusty dirt":540479,"packed red clay":339795,"chalk ring on old concrete":119726}},"light":{"values":{"golden hour":619407,"noon":250189,"street lamp at dusk":130404}},"wear":{"look":true,"values":{"new":419863,"chipped":380236,"frosted":199901}},"rack":{"look":true,"values":{"tight diamond":400436,"cross":300415,"loose scatter":299149}},"view":{"values":{"behind the shooter":551210,"across the rack":348934,"down in the dirt":99856}},"moment":{"values":{"before the shot":550320,"just after the break":449680}}},
  roll(hash) {
    const HOME = '0x796c2ea3afd0cbe146ec4850915be4b044f19287511d60bcb38abe9a150fc156';   // hashFor(146, 0), as runtime.js: c.home
    const home = hash === HOME;
  function makeRng(hash, salt) {
    const h = hash.replace(/^0x/, '').padEnd(64, '0');
    let a = parseInt(h.slice(0, 8), 16) ^ salt, b = parseInt(h.slice(8, 16), 16) ^ Math.imul(salt, 7919), c = parseInt(h.slice(16, 24), 16) ^ parseInt(h.slice(48, 56), 16), d = parseInt(h.slice(24, 32), 16) ^ parseInt(h.slice(32, 40), 16) ^ parseInt(h.slice(56, 64), 16);
    const f = () => {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 20; i++) f();
    return f;
  }
  const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let x = r() * s; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
      const rT = k => makeRng(hash, 9000 + k * 131);
      let shooter = pick(rT(1), [["cat's-eye", 34], ['swirl', 30], ['onionskin', 22], ['steel bumboozer', 7], ['clay', 7]]);
      let setN = pick(rT(2), [['bright swirls', 50], ['sea glass', 36], ['galaxy with mica', 14]]);
      let groundN = pick(rT(3), [['dusty dirt', 54], ['packed red clay', 34], ['chalk ring on old concrete', 12]]);
      let lightN = pick(rT(4), [['golden hour', 62], ['noon', 25], ['street lamp at dusk', 13]]);
      let wearN = pick(rT(5), [['new', 42], ['chipped', 38], ['frosted', 20]]);
      let rackN = pick(rT(6), [['tight diamond', 40], ['cross', 30], ['loose scatter', 30]]);
      if (home) { shooter = 'swirl'; setN = 'bright swirls'; groundN = 'dusty dirt'; lightN = 'golden hour'; wearN = 'chipped'; rackN = 'tight diamond'; }
      const rV = makeRng(hash, 9000 + 7 * 131);
      let viewN = pick(rV, [['behind the shooter', 55], ['across the rack', 35], ['down in the dirt', 10]]);
      if (home) viewN = 'behind the shooter';
      const rB = makeRng(hash, 9000 + 8 * 131);
      const BREAK = !home && rB() < 0.45;
      return [['shooter', shooter], ['set', setN], ['ground', groundN], ['light', lightN], ['wear', wearN], ['rack', rackN], ['view', viewN],
        ['moment', BREAK ? 'just after the break' : 'before the shot']];
  },
});
// ==== end roll ====

// ==== roll 151 ====
ProtoRolls.add(151, {
  traits: {"Ratio":{"look":true,"values":{"1:1 near":280038,"2:3":270172,"3:4":249982,"Three-pendulum rotary":100172,"1:3":99636}},"Ink":{"look":true,"values":{"Indigo":305719,"Sepia":234127,"Iron gall black":198060,"White":100168,"Viridian":90078,"Carmine":71848}},"Paper":{"values":{"Cream laid":550743,"White card":349089,"Black card":100168}},"Wood":{"values":{"Mahogany":550644,"Oak":329574,"Ebonised":119782}},"Light":{"values":{"Window":640177,"Lamp":359823}},"Friction":{"values":{"Even":500015,"Long swing":279768,"Short swing":220217}},"Bobs":{"values":{"Brass":600296,"Iron":299659,"Nickel":100045}},"Camera":{"values":{"Across the table":579569,"Over the sheet":279843,"Low at the edge":140588}},"Stage":{"values":{"Mid-drawing":627016,"Nearly still":200141,"First loops":172843}}},
  roll(hash) {
    const HOME = '0x847dcd88eb6dac539f4e5aa88f9b23ff5a495dd72acf759448b8ba8caab1b0ac';
    const home = hash === HOME;
    const hx = (hash || '0x0').slice(2).padEnd(64, '0');
    const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
    const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR((sd(0) ^ Math.imul(sd(3), 0x2c1b3c6d) ^ 0x151a7c3d) >>> 0);
    const pick = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };
    let RATIO = pick(['1:1 near', '2:3', '3:4', '1:3', 'Three-pendulum rotary'], [28, 27, 25, 10, 10]);
    let INK = pick(['Indigo', 'Sepia', 'Iron gall black', 'Viridian', 'Carmine'], [34, 26, 22, 10, 8]);
    let PAPER = pick(['Cream laid', 'White card', 'Black card'], [55, 35, 10]);
    let WOOD = pick(['Mahogany', 'Oak', 'Ebonised'], [55, 33, 12]);
    let LIGHT = pick(['Window', 'Lamp'], [64, 36]);
    let FRIC = pick(['Long swing', 'Even', 'Short swing'], [28, 50, 22]);
    let BOB = pick(['Brass', 'Iron', 'Nickel'], [60, 30, 10]);
    if (home) { RATIO = '2:3'; INK = 'Indigo'; PAPER = 'Cream laid'; WOOD = 'Mahogany'; LIGHT = 'Window'; FRIC = 'Long swing'; BOB = 'Brass'; }
    if (PAPER === 'Black card') INK = 'White';
    const RV = mkR((sd(6) ^ Math.imul(sd(7), 0x2c1b3c6d) ^ 0x7a5e1510) >>> 0);
    const pickV = w => { let tot = 0; for (const x of w) tot += x; let r = RV() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return i; };
    const CAMS = ['Across the table', 'Over the sheet', 'Low at the edge'], STAGES = ['Mid-drawing', 'First loops', 'Nearly still'];
    let CAMK = pickV([58, 28, 14]), STK = pickV([56, 24, 20]);
    if (CAMK === 1 && STK === 1) STK = 0;
    if (home) { CAMK = 0; STK = 0; }
    return [['Ratio', RATIO], ['Ink', INK], ['Paper', PAPER], ['Wood', WOOD], ['Light', LIGHT], ['Friction', FRIC], ['Bobs', BOB], ['Camera', CAMS[CAMK]], ['Stage', STAGES[STK]]];
  },
});
// ==== end roll ====

// ==== roll 153 ====
ProtoRolls.add(153, {
  traits: {"Gear set":{"values":{"Classic ring":599621,"Oval ring":280272,"Straight bar":120107}},"Ring":{"values":{"96 teeth":700039,"105 teeth":179854,"Toothed bar":120107}},"Palette":{"look":true,"values":{"Rainbow gel":449998,"Metallic":249519,"Pastel":200356,"White on black paper":100127}},"Paper":{"look":true,"values":{"White":494882,"Cream":314907,"Black":100127,"Kraft":90084}},"Design":{"values":{"Layered":603171,"Single":246649,"Dense mandala":150180}},"Light":{"look":true,"values":{"Morning window":499387,"Golden hour":300639,"Overcast":199974}},"Plastic":{"values":{"Candy tints":600700,"Clear":219850,"Fluorescent":179450}}},
  roll(hash) {
    const HOME = '0x62fc42e04e68535c67b794ea60da69cd69492ba76b94ef81549b7f6bf97fc910';
    const home = hash === HOME;
    const SETS = [{ name: 'Classic ring', w: 60 }, { name: 'Oval ring', w: 28 }, { name: 'Straight bar', w: 12 }];
    const PALS = [{ name: 'Rainbow gel', w: 45 }, { name: 'Metallic', w: 25 }, { name: 'Pastel', w: 20 }, { name: 'White on black paper', w: 10 }];
    const PAPERS = [{ name: 'White', w: 55 }, { name: 'Cream', w: 35 }, { name: 'Kraft', w: 10 }];
    const DESIGNS = [{ name: 'Single', w: 28 }, { name: 'Layered', w: 57 }, { name: 'Dense mandala', w: 15 }];
    const LIGHTS = [{ name: 'Morning window', w: 50 }, { name: 'Golden hour', w: 30 }, { name: 'Overcast', w: 20 }];
    const PLASTICS = [{ name: 'Candy tints', w: 60 }, { name: 'Clear', w: 22 }, { name: 'Fluorescent', w: 18 }];
    const hx = hash.slice(2);
    const seedOf = o => (parseInt(hx.slice(o, o + 8), 16) ^ parseInt(hx.slice(o + 32, o + 40), 16)) >>> 0;
    const mkR = s => () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const R = mkR(seedOf(0));
    const pickW = (arr) => { let tot = 0; for (const o of arr) tot += o.w; let x = R() * tot; for (let i = 0; i < arr.length; i++) { x -= arr[i].w; if (x <= 0) return i; } return arr.length - 1; };
    let gs = pickW(SETS), pk = pickW(PALS), ppk = pickW(PAPERS), dk = pickW(DESIGNS), lk = pickW(LIGHTS), plk = pickW(PLASTICS);
    let big = R() < 0.3;
    if (gs === 2 && dk === 0) dk = 1;
    if (home) { gs = 0; pk = 0; ppk = 0; dk = 1; lk = 0; plk = 0; big = false; }
    const NR = gs === 0 ? (big ? 105 : 96) : 96, TKIND = gs === 2;
    return [['Gear set', SETS[gs].name], ['Ring', TKIND ? 'Toothed bar' : NR + ' teeth'], ['Palette', PALS[pk].name],
      ['Paper', pk === 3 ? 'Black' : PAPERS[ppk].name], ['Design', DESIGNS[dk].name], ['Light', LIGHTS[lk].name], ['Plastic', PLASTICS[plk].name]];
  },
});
// ==== end roll ====

// ==== roll 162 ====
ProtoRolls.add(162, {
  traits: {"circle stage":{"look":true,"values":{"near complete":417841,"early spokes":279827,"finished, shell-decorated":180802,"old, worn by the current":121530}},"sand":{"look":true,"values":{"pale":499972,"grey":379766,"black volcanic":120262}},"water":{"values":{"clear blue":520120,"soft green":359610,"dusk":120270}},"caustics":{"values":{"strong noon":549746,"soft":450254}},"ridges":{"values":{"20":319821,"28":520752,"40":159427}},"shells":{"values":{"chalk cockle":648601,"pink coral":263587,"mother of pearl":87812}},"visitor":{"values":{"none":879337,"a female visiting":120663}},"view":{"look":true,"values":{"overhead":349338,"low and wide":300287,"close on his run":270766,"straight down":79609}}},
  roll(hash) {
    const HOME = '0xa3e933227d373287bc119a90ad80f2f18a315269c421d93cd81ffe6867293fcf';
    const home = hash === HOME;
    let a0 = parseInt(hash.slice(2, 10), 16) | 0, b0 = parseInt(hash.slice(10, 18), 16) | 0, c0 = parseInt(hash.slice(18, 26), 16) | 0, d0 = parseInt(hash.slice(26, 34), 16) | 0;
    const rnd = () => { a0 |= 0; b0 |= 0; c0 |= 0; d0 |= 0; const t = (a0 + b0 | 0) + d0 | 0; d0 = d0 + 1 | 0; a0 = b0 ^ b0 >>> 9; b0 = c0 + (c0 << 3) | 0; c0 = c0 << 21 | c0 >>> 11; c0 = c0 + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 40; i++) rnd();
    const pick = opts => { let w = 0; for (const o of opts) w += o[1]; let r = rnd() * w, v = opts[0][0]; for (const o of opts) { if (r < o[1]) { v = o[0]; break; } r -= o[1]; } return v; };
    const stageT = pick([['early spokes', 28], ['near complete', 54], ['finished, shell-decorated', 18]]);
    const sandT = pick([['pale', 50], ['grey', 38], ['black volcanic', 12]]);
    const waterT = pick([['clear blue', 52], ['soft green', 36], ['dusk', 12]]);
    const causT = pick([['strong noon', 55], ['soft', 45]]);
    const ridgeT = pick([[20, 32], [28, 52], [40, 16]]);
    rnd(); // the old markings roll
    const shellT = pick([['chalk cockle', 60], ['pink coral', 30], ['mother of pearl', 10]]);
    const femT = pick([['none', 88], ['a female visiting', 12]]);
    const stageS0 = home ? 'near complete' : stageT, sandS = home ? 'pale' : sandT, waterS = home ? 'clear blue' : waterT, causS = home ? 'strong noon' : causT;
    const ridges = home ? 28 : ridgeT, shellS = home ? 'chalk cockle' : sandS === 'black volcanic' ? 'chalk cockle' : shellT, femS = home ? 'none' : femT;
    let v2 = (parseInt(hash.slice(34, 42), 16) ^ parseInt(hash.slice(50, 58), 16) ^ 0x5bd1e995) | 1;
    const rnd2 = () => { v2 ^= v2 << 13; v2 ^= v2 >>> 17; v2 ^= v2 << 5; return (v2 >>> 0) / 4294967296; };
    const pick2 = opts => { let w = 0; for (const o of opts) w += o[1]; let r = rnd2() * w, v = opts[0][0]; for (const o of opts) { if (r < o[1]) { v = o[0]; break; } r -= o[1]; } return v; };
    const viewS = home ? 'overhead' : pick2([['overhead', 35], ['low and wide', 30], ['close on his run', 27], ['straight down', 8]]);
    const worn = !home && rnd2() < .5 && stageT === 'near complete' && causT === 'soft';
    const stageS = worn ? 'old, worn by the current' : stageS0;
    return [['circle stage', stageS], ['sand', sandS], ['water', waterS], ['caustics', causS], ['ridges', String(ridges)], ['shells', shellS], ['visitor', femS], ['view', viewS]];
  },
});
// ==== end roll ====

// ==== roll 166 ====
ProtoRolls.add(166, {
  traits: {"Fish":{"values":{"sardine silver":549378,"anchovy":329974,"blue-green jacks":120648}},"Water":{"values":{"tropical blue":549312,"green temperate":330092,"deep dusk":120596}},"Ball":{"values":{"great":549852,"tight":300547,"towering":149601}},"Light":{"values":{"noon":619758,"low sun":380242}},"Predator":{"look":true,"values":{"dolphins":379641,"sharks":270732,"tuna":229880,"diving gannets":119747}},"Bubbles":{"values":{"few":500252,"trails":379673,"gannet plumes":120075}},"Turn":{"values":{"slow":500609,"fast":374118,"against itself":125273}},"Shape":{"look":true,"values":{"round":260181,"a ring":162240,"egg":142047,"a pillar":139388,"the last few":125919,"torn in two":99390,"flattened":70835}},"View":{"look":true,"values":{"from the surface":300251,"below the ball":203141,"level, from the side":185180,"from the deep":141491,"from far off":97678,"in close":72259}}},
  roll(hash) {
    const HOME = '0x910bdac046b8e760553a832e4265f28610695c29fbf57c6cb1a218e84f5c553a';   // hashFor(165, 0): the site's home
    const home = hash === HOME;
    const hx = hash.slice(2);
    const seed = (a, m) => { for (let i = 0; i < hx.length; i += 8) a = Math.imul(a ^ parseInt(hx.slice(i, i + 8), 16), m) >>> 0; return a; };
    const mk = a => () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pk = R => o => { let r = R(), k; for (k in o) { r -= o[k]; if (r <= 0) return k; } return k; };
    const pick = pk(mk(seed(0x9E3779B9, 0x5BD1E995)));
    const roll = { fish: pick({ 'sardine silver': 0.55, anchovy: 0.33, 'blue-green jacks': 0.12 }),
      water: pick({ 'tropical blue': 0.55, 'green temperate': 0.33, 'deep dusk': 0.12 }),
      ball: pick({ tight: 0.3, great: 0.55, towering: 0.15 }),
      light: pick({ noon: 0.62, 'low sun': 0.38 }),
      predator: pick({ dolphins: 0.38, sharks: 0.27, tuna: 0.23, 'diving gannets': 0.12 }),
      bubbles: pick({ few: 0.5, trails: 0.38, 'gannet plumes': 0.12 }),
      turn: pick({ slow: 0.5, fast: 0.35, 'against itself': 0.15 }),
      shape: pick({ round: 0.55, egg: 0.3, flattened: 0.15 }) };
    if (home) { roll.fish = 'sardine silver'; roll.water = 'tropical blue'; roll.ball = 'great'; roll.light = 'noon'; roll.predator = 'dolphins'; roll.bubbles = 'trails'; roll.shape = 'round'; roll.turn = 'slow'; }
    const rnd2 = mk(seed(0x85EBCA6B, 0xC2B2AE35)), pick2 = pk(rnd2);
    roll.view = home ? 'below the ball' : pick2({ 'below the ball': 0.4, 'from the deep': 0.24, 'level, from the side': 0.24, 'in close': 0.12 });
    rnd2(); rnd2();                                   // vSide, vJit
    if (!home && rnd2() < 0.1) roll.shape = 'torn in two';
    rnd2();                                           // tornA
    if (!home && roll.shape !== 'torn in two' && rnd2() < 0.14) roll.shape = 'the last few';
    if (!home && rnd2() < 0.3) roll.view = 'from the surface';
    const rnd3 = mk(seed(0x27D4EB86, 0x165667B1));
    const f3 = rnd3(), v3 = rnd3();
    if (!home && (roll.shape === 'round' || roll.shape === 'egg' || roll.shape === 'flattened')) roll.shape = f3 < 0.21 ? 'a ring' : f3 < 0.39 ? 'a pillar' : roll.shape;
    if (!home && roll.shape !== 'torn in two' && roll.water !== 'deep dusk' && /below|deep|level/.test(roll.view) && v3 < 0.2) roll.view = 'from far off';
    if (roll.shape === 'a pillar' && (roll.view === 'below the ball' || roll.view === 'in close')) roll.view = 'level, from the side';
    if (roll.shape === 'a ring' && roll.turn === 'against itself') roll.turn = 'fast';
    return [['Fish', roll.fish], ['Water', roll.water], ['Ball', roll.ball], ['Light', roll.light], ['Predator', roll.predator], ['Bubbles', roll.bubbles], ['Turn', roll.turn], ['Shape', roll.shape], ['View', roll.view]];
  },
});
// ==== end roll ====

// ==== roll 167 ====
ProtoRolls.add(167, {
  traits: {"Cave":{"values":{"limestone arch":520550,"jungle-hung mouth":339628,"desert canyon slot":139822}},"Sky":{"look":true,"values":{"cloud-streaked":459041,"clear orange":420533,"storm-lit":120426}},"Flow":{"look":true,"values":{"steady stream":459612,"pulsing waves":420639,"double ribbon":119749}},"Predator":{"values":{"hawks":619535,"falcon pair":260577,"owl at dark":119888}},"Season":{"look":true,"values":{"high summer":419456,"spring":300915,"first frost":279629}},"Moon":{"values":{"none":870370,"rising full moon":129630}},"Path":{"look":true,"values":{"falling away":300724,"high arc":180436,"low over the ridge":166035,"a low river":158622,"towering column":104887,"still circling":89296}},"View":{"look":true,"values":{"at the mouth":499109,"beyond the ridge":153806,"under the stream":147424,"back from the cave":147303,"under the saddle":52358}},"Hour":{"look":true,"values":{"dusk":499860,"afterglow":269236,"sun just down":184262,"blue hour":46642}}},
  roll(hash) {
    const HOME = '0x001a23bd26e7b1093b85a29e8cbcc8872d49d0f6dc63021603490e6a670a5c85';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const home = hash === HOME;
  const FORCE_PATH = null;   // debug: forces a path on every non-home mint
  const FORCE_VIEW = null, FORCE_HOUR = null, FORCE_LAY = 0;   // debug: force a view, an hour or a lay (1 rise, 2 hollow) on every non-home mint
      let hs = 0x811c9dc5 | 0;
      for (let i = 2; i < hash.length; i++) { hs ^= hash.charCodeAt(i); hs = Math.imul(hs, 16777619); }
      const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = pairs => { let r = rnd(), i = 0; while (i < pairs.length - 1 && r >= pairs[i][1]) { r -= pairs[i][1]; i++; } return pairs[i][0]; };
      const cave = pick([['limestone arch', 0.52], ['jungle-hung mouth', 0.34], ['desert canyon slot', 0.14]]);
      const skyT = pick([['clear orange', 0.42], ['cloud-streaked', 0.46], ['storm-lit', 0.12]]);
      const flow = pick([['steady stream', 0.46], ['pulsing waves', 0.42], ['double ribbon', 0.12]]);
      const pred = pick([['hawks', 0.62], ['falcon pair', 0.26], ['owl at dark', 0.12]]);
      const season = pick([['high summer', 0.42], ['spring', 0.3], ['first frost', 0.28]]);
      const moonT = pick([['none', 0.87], ['rising full moon', 0.13]]);
      const hasMoon = moonT !== 'none', mir = rnd() < 0.34 ? 1 : 0, tailI = Math.floor(rnd() * 3), u0 = 0.11 + rnd() * rnd() * 0.22;
      T('Cave', cave); T('Sky', skyT); T('Flow', flow); T('Predator', pred); T('Season', season); T('Moon', moonT);
      // the path across the sky: its own hash-derived stream so the older rolls never shift; home keeps the old fall-away ribbon
      let hp = 0x9e3779b1 | 0;
      for (let i = hash.length - 1; i >= 2; i--) { hp ^= hash.charCodeAt(i); hp = Math.imul(hp, 0x01000193); }
      const rp = () => { hp = hp + 0x6D2B79F5 | 0; let t = Math.imul(hp ^ hp >>> 15, 1 | hp); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pathR = (r => r < 0.4 ? 'falling away' : r < 0.64 ? 'high arc' : r < 0.86 ? 'low over the ridge' : 'towering column')(rp());
      let pathT0 = pathR;
      if (rp() < 0.12) pathT0 = 'still circling';   // 30 -> 12 in 100 (2026-11-12): it reads as a grey ball, not a wheel
      if (FORCE_PATH) pathT0 = FORCE_PATH;
      if (home) pathT0 = 'falling away';
      const sdx = rnd(), sdy = rnd(), sdc = rnd() * 40;
      const isArch = cave === 'limestone arch', isJungle = cave === 'jungle-hung mouth', isSlot = cave === 'desert canyon slot';
      // where it is seen from and the hour (2026-11-12): a third hash stream, so every older roll stays where it was.
      // The home and the storm-lit mints keep the hump at arm's length and their own minute of dusk.
      let h3 = 0x27d4eb2f | 0;
      for (let i = 2; i < hash.length; i++) { h3 ^= hash.charCodeAt(i); h3 = Math.imul(h3, 0x5bd1e995); h3 ^= h3 >>> 13; }
      const r3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const vr = r3(), hr = r3(), hu3 = r3(), lmx = r3(), lms = r3(), lk = r3();
      let view = vr < 0.17 ? 'beyond the ridge' : vr < 0.37 ? (isSlot ? 'at the mouth' : 'back from the cave') : vr < 0.49 && isArch ? 'under the saddle' : 'at the mouth';
      let hour = hr < 0.24 ? 'sun just down' : hr < 0.64 ? 'dusk' : hr < 0.92 ? 'afterglow' : 'blue hour';
      if (FORCE_VIEW && !home) view = FORCE_VIEW; if (FORCE_HOUR && !home) hour = FORCE_HOUR;
      if (home || skyT === 'storm-lit') { view = 'at the mouth'; hour = 'dusk'; }
      if (hour === 'blue hour' && isJungle) hour = 'afterglow';
      if (hour === 'sun just down' && hasMoon) hour = 'dusk';   // the moon's side of the sky has no gold to stretch: a washed-out lilac
      // (2026-11-13) a fourth hash stream: storm-lit mints get views too (their hour stays dusk: the deck's light is built for it),
      // a stream seen from under it, a low river of a path, and two more lays of the land beyond the ridge. Its seed is chosen
      // so 0xe1642236... keeps all nine values; a storm-lit mint still circling (the founder's 0x0d44bd...) reads nothing new.
      let h4 = 0xdaa66d2b | 0;
      for (let i = 2; i < hash.length; i++) { h4 ^= hash.charCodeAt(i); h4 = Math.imul(h4, 0x5bd1e995); h4 ^= h4 >>> 15; }
      const r4 = () => { h4 = h4 + 0x6D2B79F5 | 0; let t = Math.imul(h4 ^ h4 >>> 15, 1 | h4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const w1 = r4(), w2 = r4(), w3 = r4(), w4 = r4(), w5 = r4(), w6 = r4(), w7 = r4(), w8 = r4();
      if (!home && !(skyT === 'storm-lit' && pathT0 === 'still circling')) {
        if (w1 < 0.15) view = 'under the stream';
        else if (skyT === 'storm-lit') view = w1 < 0.4 ? 'beyond the ridge' : w1 < 0.6 ? (isSlot ? 'at the mouth' : 'back from the cave') : w1 < 0.7 && isArch ? 'under the saddle' : 'at the mouth';
        if (w2 < 0.18 && pathT0 !== 'still circling') pathT0 = 'a low river';
      }
      if (FORCE_VIEW && !home) view = FORCE_VIEW;
      if (FORCE_PATH && !home) pathT0 = FORCE_PATH;
      const beyond = view === 'beyond the ridge', back = view === 'back from the cave', saddle = view === 'under the saddle', under = view === 'under the stream';
      const far = beyond || under, river = pathT0 === 'a low river' && !under;
      // the land beyond the ridge: level, a rise away from the glow, or a hollow between two swells
      const lay = !far ? 0 : FORCE_LAY || (w3 < 0.35 ? 1 : w3 < 0.6 ? 2 : 0);
      // over a treeline a circling swarm is a ball over nothing: it takes the path it had rolled
      if (far && pathT0 === 'still circling' && !FORCE_PATH) pathT0 = pathR;
      T('Path', pathT0); T('View', view); T('Hour', hour);

    return out;
  },
});
// ==== end roll ====

// ==== roll 169 ====
ProtoRolls.add(169, {
  traits: {"Colony":{"values":{"Dense":539685,"Sparse":340529,"Galaxy band":119786}},"Glow":{"values":{"Blue-green":519795,"Teal":359337,"Green":120868}},"Cave":{"look":true,"values":{"Low vault":479836,"High cathedral":400046,"Narrow slot":120118}},"Water":{"look":true,"values":{"Gentle drip":460735,"Mirror still":419392,"Slow current":119873}},"Boat":{"values":{"Mid-channel":748190,"Hugging the wall":251810}},"Mist":{"look":true,"values":{"Low mist":460909,"Clear":399387,"Thick mist":139704}},"Silk":{"look":true,"values":{"Long lines":499640,"Short lines":380160,"Silk curtains":120200}},"View":{"values":{"Ahead":560159,"To the near wall":280285,"Up into the colony":159556}}},
  roll(hash) {
    const HOME = '0x1da12dcd588994c7f4baa2a4282ce30a66ff7adea31b9586cfdb639e53989ee4';
    const home = hash === HOME;
    const hx = (hash || '0x0').slice(2).padEnd(64, '0');
    const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
    const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR((sd(0) ^ Math.imul(sd(5), 0x2c1b3c6d) ^ 0x169) >>> 0);
    const pick = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };
    let COL = pick(['Sparse', 'Dense', 'Galaxy band'], [34, 54, 12]);
    let GLW = pick(['Blue-green', 'Teal', 'Green'], [52, 36, 12]);
    let CAV = pick(['Low vault', 'High cathedral', 'Narrow slot'], [48, 40, 12]);
    let WAT = pick(['Mirror still', 'Gentle drip', 'Slow current'], [42, 46, 12]);
    let BOA = pick(['Mid-channel', 'Hugging the wall'], [55, 45]);
    let MST = pick(['Clear', 'Low mist', 'Thick mist'], [40, 46, 14]);
    let SLK = pick(['Short lines', 'Long lines', 'Silk curtains'], [38, 50, 12]);
    if (home) { COL = 'Dense'; GLW = 'Blue-green'; CAV = 'Low vault'; WAT = 'Gentle drip'; BOA = 'Mid-channel'; MST = 'Low mist'; SLK = 'Long lines'; }
    const RV = mkR((sd(6) ^ 0x51ab) >>> 0);
    let VIEW = (() => { const v = ['Ahead', 'To the near wall', 'Up into the colony'], w = [56, 28, 16]; let r = RV() * 100, i = 0; while (r >= w[i] && i < 2) r -= w[i++]; return v[i]; })();
    if (home) VIEW = 'Ahead';
    if (VIEW === 'Up into the colony' || VIEW === 'To the near wall') BOA = 'Mid-channel';
    return [['Colony', COL], ['Glow', GLW], ['Cave', CAV], ['Water', WAT], ['Boat', BOA], ['Mist', MST], ['Silk', SLK], ['View', VIEW]];
  },
});
// ==== end roll ====

// ==== roll 171 ====
ProtoRolls.add(171, {
  traits: {"Leaf":{"values":{"Blue-green":520952,"Deep green":359600,"Young bronze-pink":119448}},"Flower behind":{"values":{"Pink":550011,"White":329687,"None, reeds":120302}},"Light":{"values":{"Dawn":549873,"Overcast":310299,"After-storm":139828}},"Dust":{"values":{"Pollen gold":520152,"Dust grey":360146,"Ash":119702}},"Pond":{"values":{"Leaf above water":550552,"Leaf on water":449448}},"Dew":{"look":true,"values":{"Scattered beads":499993,"Heavy dew":360446,"One great pearl":139561}},"Petal":{"values":{"None":879562,"A fallen petal":120438}},"View":{"look":true,"values":{"Low in the dish":380173,"Pearl off-centre":240337,"Eye level with the bead":219318,"Looking down the veins":160172}},"Drops":{"values":{"One pearl":679777,"A cluster of pearls":320223}}},
  roll(hash) {
    const HOME = '0x299c84e20b865a53d9d85fbd125bcda02202337027446a9dbe1f65d7f321c4d4';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME;
    const pick = (rnd, list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
    const hx = hash.replace(/^0x/, '');
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 |= 0; s1 |= 0; s2 |= 0; s3 |= 0; const t = (s0 + s1 | 0) + s3 | 0; s3 = s3 + 1 | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) rnd();
    let tLeaf = pick(rnd, [['blue-green', 52], ['deep green', 36], ['young bronze-pink', 12]]);
    let tFlower = pick(rnd, [['pink', 55], ['white', 33], ['none, reeds', 12]]);
    let tLight = pick(rnd, [['dawn', 55], ['overcast', 31], ['after-storm', 14]]);
    let tDust = pick(rnd, [['pollen gold', 52], ['dust grey', 36], ['ash', 12]]);
    let tPond = pick(rnd, [['leaf above water', 55], ['leaf on water', 45]]);
    let tDew = pick(rnd, [['scattered beads', 50], ['heavy dew', 36], ['one great pearl', 14]]);
    let tGuest = pick(rnd, [['none', 88], ['a fallen petal', 12]]);
    if (home) { tLeaf = 'blue-green'; tFlower = 'pink'; tLight = 'dawn'; tDust = 'pollen gold'; tPond = 'leaf above water'; tDew = 'scattered beads'; tGuest = 'none'; }
    const cap = v => v[0].toUpperCase() + v.slice(1);
    let sv = 0x2545f491; for (let i = 0; i < hx.length; i++) { sv ^= hx.charCodeAt(hx.length - 1 - i); sv = Math.imul(sv, 0x01000193); }
    const rv = () => { sv = sv + 0x6D2B79F5 | 0; let t = Math.imul(sv ^ sv >>> 15, 1 | sv); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let tView = pick(rv, [['low in the dish', 38], ['pearl off-centre', 24], ['eye level with the bead', 22], ['looking down the veins', 16]]);
    rv();   // viewSide
    if (home) tView = 'low in the dish';
    let tDrops = pick(rv, [['one pearl', 68], ['a cluster of pearls', 32]]);
    if (home) tDrops = 'one pearl';
    return [['Leaf', cap(tLeaf)], ['Flower behind', cap(tFlower)], ['Light', cap(tLight)], ['Dust', cap(tDust)], ['Pond', cap(tPond)], ['Dew', cap(tDew)], ['Petal', cap(tGuest)], ['View', cap(tView)], ['Drops', cap(tDrops)]];
  },
});
// ==== end roll ====

// ==== roll 173 ====
ProtoRolls.add(173, {
  traits: {"Species":{"look":true,"values":{"common warted":460491,"smooth pear":299691,"earthstar":129879,"giant":109939}},"Ripeness":{"look":true,"values":{"full":390040,"just ripe":262567,"unopened":191632,"nearly spent":155761}},"Forest floor":{"values":{"moss":500139,"leaf litter":299638,"rotten log":200223}},"Light":{"look":true,"values":{"low sun shaft":384618,"dappled":320224,"against the sun":165351,"misty dawn":129807}},"Spores":{"values":{"brown":519641,"olive":340341,"purple-brown":140018}},"Weather":{"look":true,"values":{"drips":480961,"dry":233718,"light rain":159939,"a breeze":125382}},"View":{"look":true,"values":{"from above":315988,"in close":270050,"eye level":269241,"a step back":144721}},"Company":{"look":true,"values":{"a few behind":441014,"a tight cluster":279307,"alone":179423,"fairy ring":100256}}},
  roll(hash) {
    const HOME = '0x224aebadcc418b404b482f72c5062e015e32a985a6dafe6d6b0ceeaa5daf64ac';
    const out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const c = { home: hash === HOME, hash, trait: T };
      let hs = 0; const hx = c.hash.slice(2);
      for (let i = 0; i < 16; i++) hs = Math.imul(hs ^ parseInt(hx.slice(i * 4, i * 4 + 4), 16), 0x9E3779B1) + 0x165667B1 | 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (arr, w) => { let r = R() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < arr.length; i++) { r -= w[i]; if (r <= 0) return arr[i]; } return arr[0]; };
      let species = pick(['warted', 'pear', 'giant', 'earthstar'], [46, 30, 11, 13]);
      let ripe = pick(['just ripe', 'full', 'nearly spent'], [30, 50, 20]);
      let floor = pick(['moss', 'leaf litter', 'rotten log'], [50, 30, 20]);
      let lightK = pick(['low sun shaft', 'dappled', 'misty dawn'], [55, 32, 13]);
      let spore = pick(['brown', 'olive', 'purple-brown'], [52, 34, 14]);
      let weather = pick(['dry', 'drips', 'light rain'], [36, 48, 16]);
      if (c.home) { species = 'warted'; ripe = 'full'; floor = 'moss'; lightK = 'low sun shaft'; spore = 'brown'; weather = 'drips'; }
      const seedA = R(), seedB = R();
      // the camera and the company come from their own stream, so the rolls above never shift
      let hs2 = 0x27D4EB2F;
      for (let i = 0; i < 16; i++) hs2 = Math.imul(hs2 ^ parseInt(hx.slice(i * 4, i * 4 + 4), 16), 0x85EBCA77) + 0x3C6EF372 | 0;
      const R2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick2 = (arr, w) => { let r = R2() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < arr.length; i++) { r -= w[i]; if (r <= 0) return arr[i]; } return arr[0]; };
      let view = c.home ? 'eye level' : pick2(['eye level', 'in close', 'from above'], [46, 30, 24]);
      let company = c.home ? 'a few behind' : pick2(['a few behind', 'a tight cluster', 'alone', 'fairy ring'], [44, 28, 18, 10]);
      const vSide = R2() < .5 ? 1 : -1, vJ = R2(), cJ = [R2(), R2(), R2(), R2(), R2(), R2()];
      // a ball not yet open (no mouth, no smoke): drawn last on this stream, so nothing above shifts
      if (!c.home && R2() < .22) ripe = 'unopened';
      // a third stream for the new looks, so every roll above stays
      let hs3 = 0xfd384b89;
      for (let i = 0; i < 16; i++) hs3 = Math.imul(hs3 ^ parseInt(hx.slice(i * 4, i * 4 + 4), 16), 0x85EBCA77) + 0x3C6EF372 | 0;
      const R3 = () => { hs3 = hs3 + 0x6D2B79F5 | 0; let t = Math.imul(hs3 ^ hs3 >>> 15, 1 | hs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const dL = R3(), dW = R3(), dV = R3();
      // the classic puffball picture: the low sun behind the ball in a gap of the wood (the founder's mint draws .849: kept)
      if (!c.home && lightK === 'low sun shaft' && dL < .3) lightK = 'against the sun';
      // a step back: the ball small on a wider floor, the puff climbing through the light as the subject
      if (!c.home && view === 'eye level' && dV < .35) view = 'a step back';
      // a dry day with the air moving one way: the puff lies over and streams out of the frame as a ragged banner
      if (!c.home && weather === 'dry' && dW < .35) weather = 'a breeze';
      // an earthstar not yet split is an onion in the soil: those mints show it just opened
      if (species === 'earthstar' && ripe === 'unopened') ripe = 'just ripe';
      // a fairy ring is a pattern on the floor: it is always seen from above, or it is only a row of lumps
      if (company === 'fairy ring') view = 'from above';
      c.trait('Species', species === 'warted' ? 'common warted' : species === 'pear' ? 'smooth pear' : species === 'giant' ? 'giant' : 'earthstar');
      c.trait('Ripeness', ripe); c.trait('Forest floor', floor); c.trait('Light', lightK); c.trait('Spores', spore); c.trait('Weather', weather);
      c.trait('View', view); c.trait('Company', company);
    return out;
  },
});
// ==== end roll ====

// ==== roll 183 ====
ProtoRolls.add(183, {
  traits: {"Koi":{"look":true,"values":{"kohaku":419745,"showa":260119,"ogon":219775,"butterfly long-fin":100361}},"Count":{"look":true,"values":{"3":339791,"7":419449,"12":240760}},"Season":{"look":true,"values":{"autumn maple":450749,"spring blossom":250063,"summer lilies":199790,"snow melting":99398}},"Water":{"values":{"clear":660087,"green-tinted":339913}},"Light":{"values":{"overcast":500140,"dappled sun":380113,"dusk lantern":119747}},"Bottom":{"values":{"river stones":680357,"dark liner":319643}},"Weather":{"values":{"light breeze":561024,"still air":299592,"drizzle":139384}}},
  roll(hash) {
    const HOME = '0x59b1c82c0da516eb9d21e0a29c4334c51a9679ef57aec189f4d01988c1bbdb33';   // hashFor(182, 0)
    const home = hash === HOME;
    let a0 = 0x9E3779B9;
    const hx = hash.slice(2);
    for (let i = 0; i < hx.length; i += 8) a0 = Math.imul(a0 ^ parseInt(hx.slice(i, i + 8), 16), 0x5BD1E995) >>> 0;
    const rnd = () => { a0 = a0 + 0x6D2B79F5 | 0; let t = Math.imul(a0 ^ a0 >>> 15, 1 | a0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = o => { let r = rnd(), k; for (k in o) { r -= o[k]; if (r <= 0) return k; } return k; };
    const roll = {
      mix: pick({ kohaku: 0.42, ogon: 0.22, showa: 0.26, 'butterfly long-fin': 0.1 }),
      count: pick({ 3: 0.34, 7: 0.42, 12: 0.24 }),
      season: pick({ 'autumn maple': 0.45, 'spring blossom': 0.25, 'summer lilies': 0.2, 'snow melting': 0.1 }),
      water: pick({ clear: 0.66, 'green-tinted': 0.34 }),
      light: pick({ overcast: 0.5, 'dappled sun': 0.38, 'dusk lantern': 0.12 }),
      bottom: pick({ 'river stones': 0.68, 'dark liner': 0.32 }),
    };
    if (home) { roll.mix = 'kohaku'; roll.count = '3'; roll.season = 'autumn maple'; roll.water = 'clear'; roll.light = 'dappled sun'; roll.bottom = 'river stones'; }
    let s1 = 0x0183a11e;
    for (let i = 0; i < hx.length; i += 8) s1 = Math.imul(s1 ^ parseInt(hx.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const airR = R2(), air = home || airR >= 0.3 && airR < 0.86 ? 'light breeze' : airR < 0.3 ? 'still air' : 'drizzle';
    return [['Koi', roll.mix], ['Count', String(+roll.count)], ['Season', roll.season], ['Water', roll.water], ['Light', roll.light], ['Bottom', roll.bottom], ['Weather', air]];
  },
});
// ==== end roll ====

// ==== roll 186 ====
ProtoRolls.add(186, {
  traits: {"Region":{"values":{"Underground":760424,"North woods":139597,"Mountain portal":99979}},"Station":{"look":true,"values":{"Glazed cream tile":379915,"Brutalist concrete":273930,"Timber halt":139597,"Old iron and brick vault":106579,"Stone portal":99979}},"Tiles":{"look":true,"values":{"Cream and green":400985,"White and blue":249469,"Sea green":199607,"Oxblood":149939}},"Edge":{"look":true,"values":{"Tactile strip":450457,"Yellow line":349557,"White line":199986}},"Light":{"look":true,"values":{"Sodium":459690,"Cold fluorescent":421216,"One failing tube":119094}},"Train":{"values":{"Silver":521009,"Dark red":358726,"Empty night freight":120265}},"Doors":{"look":true,"values":{"Red doors":308649,"Blue doors":262743,"Yellow doors":175393,"Cream doors":132950,"None":120265}},"Weather":{"look":true,"values":{"Wet drips":395638,"Dry":211753,"Snowfall":124781,"Leaves blown in":99585,"Clear night":66878,"Flooded track":53448,"Driven snow":31111,"Ground fog":16806}},"Hour":{"values":{"Last train":679319,"First train":320681}}},
  roll(hash) {
    const HOME = '0x5e6fbc89d6d3068b8d716867681d2c341d19af913a8624ad7da483801221c633';
    const home = hash === HOME;
    let hs = 0; for (let i = 2; i < hash.length; i++) hs = (Math.imul(hs, 31) + hash.charCodeAt(i)) >>> 0;
    let rs = hs || 1;
    const rnd = () => { rs = rs + 0x6D2B79F5 | 0; let t = Math.imul(rs ^ rs >>> 15, 1 | rs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (arr) => { let r = rnd(), s = 0; for (const a of arr) { s += a[1]; if (r < s) return a[0]; } return arr[arr.length - 1][0]; };
    for (let i = 0; i < 6; i++) rnd();
    let station = pick([['Glazed cream tile', .5], ['Brutalist concrete', .36], ['Old iron and brick vault', .14]]);
    let light = pick([['Sodium', .46], ['Cold fluorescent', .42], ['One failing tube', .12]]);
    let train = pick([['Silver', .52], ['Dark red', .36], ['Empty night freight', .12]]);
    let weather = pick([['Dry', .3], ['Wet drips', .56], ['Leaves blown in', .14]]);
    let hour = pick([['Last train', .68], ['First train', .32]]);
    let rs2 = ((hs ^ 0x9E3779B9) >>> 0) || 1;
    const R2 = () => { rs2 = rs2 + 0x6D2B79F5 | 0; let t = Math.imul(rs2 ^ rs2 >>> 15, 1 | rs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick2 = (arr) => { let r = R2(), q = 0; for (const a of arr) { q += a[1]; if (r < q) return a[0]; } return arr[arr.length - 1][0]; };
    for (let i = 0; i < 4; i++) R2();
    let tileT = pick2([['Cream and green', .4], ['White and blue', .25], ['Sea green', .2], ['Oxblood', .15]]);
    let edgeT = pick2([['Tactile strip', .45], ['Yellow line', .35], ['White line', .2]]);
    let doorT = pick2([['Red doors', .35], ['Blue doors', .3], ['Yellow doors', .2], ['Cream doors', .15]]);
    const floodRoll = R2();
    if (floodRoll < .07) weather = 'Flooded track';
    if (home) { station = 'Glazed cream tile'; light = 'Sodium'; train = 'Silver'; weather = 'Wet drips'; hour = 'Last train'; tileT = 'Cream and green'; edgeT = 'Tactile strip'; doorT = 'Red doors'; }
    if (train[0] === 'E') doorT = 'None';
    let rs3 = ((hs ^ 0x85EBCA6B) >>> 0) || 1;
    const R3 = () => { rs3 = rs3 + 0x6D2B79F5 | 0; let t = Math.imul(rs3 ^ rs3 >>> 15, 1 | rs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R3();
    let region = (() => { const r = R3(); let q = 0; for (const a of [['Underground', .34], ['City viaduct', .18], ['North woods', .14], ['Open plain', .12], ['Mountain portal', .10], ['Coast', .12]]) { q += a[1]; if (r < q) return a[0]; } return 'Coast'; })();
    if (home || (region[0] !== 'N' && region[0] !== 'M')) region = 'Underground';
    const RG = region[0] === 'N' ? 2 : region[0] === 'M' ? 4 : 0, open = RG > 0;
    if (RG === 2) station = 'Timber halt'; else if (RG === 4) station = 'Stone portal';
    const wShow = open ? { D: 'Clear night', W: 'Snowfall', L: 'Driven snow', F: 'Ground fog' }[weather[0]] : weather;
    return [['Region', region], ['Station', station], ['Tiles', tileT], ['Edge', edgeT], ['Light', light], ['Train', train], ['Doors', doorT], ['Weather', wShow], ['Hour', hour]];
  },
});
// ==== end roll ====

// ==== roll 189 ====
ProtoRolls.add(189, {
  traits: {"city":{"look":true,"values":{"brick walk-up":460270,"glass towers":239779,"low Mediterranean":219716,"canals":80235}},"plan":{"look":true,"values":{"street grid":338533,"river":239073,"downtown towers":238589,"great park":183805}},"hour":{"look":true,"values":{"golden sunset":359308,"deep night":300831,"blue hour":219924,"first light":119937}},"weather":{"look":true,"values":{"rain":280124,"haze":275192,"clear":248797,"snow":195887}},"traffic":{"values":{"heavy":580120,"quiet":299660,"gridlock":120220}},"view":{"look":true,"values":{"high rooftop":339139,"down the avenue":220489,"straight down from a tower":220454,"over the rooftops":219918}},"street lamps":{"values":{"sodium":549895,"white LED":329881,"mercury":120224}}},
  roll(hash) {
    const HOME = '0xe9f26e064e3ed3f9ca857d04b956fd1dada4c6f4d8f80b46c7ee0a29ba36296f';   // hashFor(188, 0)
    const home = hash === HOME;
    const hx = hash.slice(2); const words = []; for (let i = 0; i < 8; i++) words.push(parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0);
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const RT = mk(words[1]);
    const pick = (r, list) => { let u = r(), i = 0; for (; i < list.length - 1; i++) { if ((u -= list[i][1]) < 0) break; } return list[i][0]; };
    let city = pick(RT, [['brick walk-up', .46], ['glass towers', .24], ['low Mediterranean', .22], ['canals', .08]]);
    const hour0 = pick(RT, [['sunset', .36], ['blue hour', .5], ['deep night in rain', .14]]);
    const weather0 = pick(RT, [['clear', .58], ['haze', .32], ['snow', .10]]);
    let traffic = pick(RT, [['quiet', .3], ['heavy', .58], ['gridlock', .12]]);
    let train = pick(RT, [['elevated', .86], ['tram', .14]]);
    let lamps = pick(RT, [['sodium', .55], ['white LED', .33], ['mercury', .12]]);
    const RH = mk((words[4] ^ Math.imul(words[6], 0x3d4d51cb) ^ 0x189b0b) >>> 0);
    const h2 = RH(), w2 = RH();
    let hour = hour0 === 'sunset' ? 'golden sunset' : hour0 === 'blue hour' ? (h2 < .44 ? 'blue hour' : h2 < .76 ? 'deep night' : 'first light') : 'deep night';
    let weather = hour0 === 'deep night in rain' ? 'rain' : weather0 === 'clear' ? (w2 < .22 ? 'snow' : w2 < .5 ? 'rain' : 'clear') : weather0;
    let plan = pick(RH, [['street grid', .28], ['river', .26], ['great park', .2], ['downtown towers', .26]]);
    if (home) { city = 'brick walk-up'; hour = 'blue hour'; weather = 'clear'; traffic = 'heavy'; train = 'elevated'; lamps = 'sodium'; plan = 'street grid'; }
    if (city === 'canals') { plan = 'street grid'; if (train === 'tram') train = 'elevated'; }
    const RV = mk((words[5] ^ Math.imul(words[7], 0x2c1b3c6d) ^ 0x18900a1) >>> 0);
    let view = pick(RV, [['high rooftop', .34], ['straight down from a tower', .22], ['over the rooftops', .22], ['down the avenue', .22]]);
    if (home) view = 'high rooftop';
    return [['city', city], ['plan', plan], ['hour', hour], ['weather', weather], ['traffic', traffic], ['view', view], ['street lamps', lamps]];
  },
});
// ==== end roll ====

// ==== roll 196 ====
ProtoRolls.add(196, {
  traits: {"Cloth":{"values":{"green":560822,"blue":319280,"burgundy":119898}},"Balls":{"values":{"full set":680369,"old ivory":219784,"three-ball carom":99847}},"Rail":{"values":{"mahogany":519694,"walnut":360454,"ebony":119852}},"Lamp":{"values":{"green glass shade":519333,"brass":360656,"single bare bulb":120011}},"Table":{"values":{"worn":500243,"pristine":499757}},"Play":{"look":true,"values":{"mid-frame":360996,"fresh rack":265574,"the break":216543,"last few":156887}},"Air":{"values":{"clear":740049,"smoke":259951}},"View":{"look":true,"values":{"over the whole table":376952,"down the rail":192426,"behind the cue ball":179170,"from among the balls":107717,"low across the cloth":94649,"high over the balls":49086}}},
  roll(hash) {
    const HOME = '0x469f21b5bdf04d6230b2a14bf950492347e83325956205e0fd8f29658657cf14';   // hashFor(195, 0)
    const home = hash === HOME;
    function makeRng(hash, salt) {
      const h = hash.replace(/^0x/, '').padEnd(64, '0');
      let a = parseInt(h.slice(0, 8), 16) ^ salt, b = parseInt(h.slice(8, 16), 16) ^ Math.imul(salt, 7919), c = parseInt(h.slice(16, 24), 16) ^ parseInt(h.slice(48, 56), 16), d = parseInt(h.slice(24, 32), 16) ^ parseInt(h.slice(32, 40), 16) ^ parseInt(h.slice(56, 64), 16);
      const f = () => {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
      for (let i = 0; i < 20; i++) f();
      return f;
    }
    const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let x = r() * s; for (const e of list) { x -= e[1]; if (x < 0) return e[0]; } return list[list.length - 1][0]; };
    const R0 = makeRng(hash, 196);
    const roll = k => makeRng(hash, 19700 + k * 131);
    let tCloth = pick(roll(1), [['green', 56], ['blue', 32], ['burgundy', 12]]);
    let tBalls = pick(roll(2), [['full set', 68], ['old ivory', 22], ['three-ball carom', 10]]);
    let tRail = pick(roll(3), [['mahogany', 52], ['walnut', 36], ['ebony', 12]]);
    let tLamp = pick(roll(4), [['green glass shade', 52], ['brass', 36], ['single bare bulb', 12]]);
    let tAge = pick(roll(5), [['pristine', 50], ['worn', 50]]);
    let tLay = pick(roll(6), [['fresh rack', 34], ['mid-frame', 46], ['last few', 20]]);
    let tAir = pick(roll(7), [['clear', 74], ['smoke', 26]]);
    if (home) { tCloth = 'green'; tBalls = 'full set'; tRail = 'mahogany'; tLamp = 'green glass shade'; tAge = 'worn'; tLay = 'mid-frame'; tAir = 'clear'; }
    const R9 = roll(9), r9a = R9(), r9b = R9();
    if (!home && tBalls !== 'three-ball carom' && r9a < 0.24) tLay = 'the break';
    let tView = home ? 0 : pick(roll(8), [[0, 40], [1, 25], [2, 22], [4, 13]]);
    const carom = tBalls === 'three-ball carom';
    const NB = carom ? 3 : 16;
    for (let i = 0; i < NB; i++) R0();   // the balls' seeds
    let viewStart = !home && R0() < 0.3 ? 3 : 0;
    if (carom && tView === 4) tView = 2;
    if (viewStart === 0) viewStart = tView;
    if (!home && !carom && r9b < (tLay === 'the break' ? 0.72 : tLay === 'last few' ? 0.4 : 0.16)) viewStart = 5;
    if (!home && tLay === 'last few' && viewStart === 1) viewStart = 5;
    if (tLay === 'the break' && !home && !carom) viewStart = 5;
    return [['Cloth', tCloth], ['Balls', tBalls], ['Rail', tRail], ['Lamp', tLamp], ['Table', tAge], ['Play', tLay], ['Air', tAir],
      ['View', ['behind the cue ball', 'low across the cloth', 'from among the balls', 'down the rail', 'high over the balls', 'over the whole table'][viewStart]]];
  },
});
// ==== end roll ====

// ==== roll 197 ====
ProtoRolls.add(197, {
  traits: {"Fold":{"look":true,"values":{"Dart":339634,"Blunt delta":300335,"Long wing":279589,"Spar wing":80442}},"Paper":{"look":true,"values":{"Copy white":300481,"Cream laid":219791,"Graph":160044,"Kraft":119798,"Onionskin":99701,"Stave paper":50244,"Airmail blue":49941}},"Trim":{"look":true,"values":{"Floater":440342,"Porpoise":279153,"Stall-prone":180326,"Looper":100179}},"Hour":{"look":true,"values":{"Late gold":439689,"Last red":200196,"Afternoon":199663,"Hazy morning":100389,"Moonlit":60063}},"Windows":{"look":true,"values":{"Tall sash":370647,"Arched":253331,"Pointed":151619,"Shutters closed":144149,"Stained quarries":80254}},"Floor":{"look":true,"values":{"Oak boards":399890,"Terrazzo":259897,"Limestone flags":240001,"Chequer marble":100212}},"Walls":{"look":true,"values":{"Limewash":439396,"Sage distemper":280167,"Oxblood":180133,"Soot-dark panel":100304}},"Air":{"look":true,"values":{"Still":440493,"Warm bars":319623,"Draught":159980,"Dusty":79904}},"View":{"look":true,"values":{"Alongside":182520,"Down the hall":180999,"From above":153725,"Close behind":150228,"From under":140061,"Long lens":108926,"The sheet":83541}}},
  roll(hash) {
    const HOME = '0xb2b781b0c7b1b5ab8c491d4291a9c1f8ee1c8f2e682e37c4605d40605ecbbd10';   // hashFor(196, 0)
    const home = hash === HOME, SHUT_P = 0.36;
    const hx = (hash || '0x0').slice(2).padEnd(64, '0');
    const sd = i => parseInt(hx.slice(i * 8, i * 8 + 8), 16) >>> 0;
    const mkR = a => { let s = a >>> 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR((sd(0) ^ Math.imul(sd(3), 0x2c1b3c6d) ^ 0x197a) >>> 0);
    const pick = (vals, w) => { let tot = 0; for (const x of w) tot += x; let r = R() * tot, i = 0; while (r >= w[i] && i < w.length - 1) r -= w[i++]; return vals[i]; };
    let FOLD = pick(['Dart', 'Blunt delta', 'Long wing', 'Spar wing'], [34, 30, 28, 8]);
    let PAP = pick(['Copy white', 'Cream laid', 'Graph', 'Kraft', 'Onionskin', 'Airmail blue', 'Stave paper'], [30, 22, 16, 12, 10, 5, 5]);
    let TRIM = pick(['Floater', 'Porpoise', 'Stall-prone', 'Looper'], [44, 28, 18, 10]);
    let HOUR = pick(['Late gold', 'Afternoon', 'Last red', 'Hazy morning', 'Moonlit'], [44, 20, 20, 10, 6]);
    let WIN = pick(['Tall sash', 'Arched', 'Pointed', 'Stained quarries'], [44, 30, 18, 8]);
    let FLR = pick(['Oak boards', 'Terrazzo', 'Limestone flags', 'Chequer marble'], [40, 26, 24, 10]);
    let WLL = pick(['Limewash', 'Sage distemper', 'Oxblood', 'Soot-dark panel'], [44, 28, 18, 10]);
    let AIR = pick(['Still', 'Warm bars', 'Draught', 'Dusty'], [44, 32, 16, 8]);
    let VIEW = pick(['Alongside', 'Close behind', 'From under', 'Long lens'], [42, 24, 20, 14]);
    if (TRIM === 'Looper' && VIEW === 'From under') VIEW = 'Alongside';
    { const R2 = mkR((sd(5) ^ Math.imul(sd(6), 0x9E3779B1) ^ 0x1972) >>> 0), r2 = R2(); if (r2 < 0.12) VIEW = 'Down the hall'; else if (r2 < 0.22) VIEW = 'From above'; else if (VIEW === 'Alongside' && r2 < 0.48) VIEW = r2 < 0.36 ? 'Down the hall' : 'From above'; }
    const R4 = mkR((sd(1) ^ Math.imul(sd(4), 0xC2B2AE35) ^ 0x1974) >>> 0); R4(); const r4b = R4();
    if (home) { FOLD = 'Dart'; PAP = 'Cream laid'; TRIM = 'Floater'; HOUR = 'Late gold'; WIN = 'Tall sash'; FLR = 'Oak boards'; WLL = 'Limewash'; AIR = 'Warm bars'; VIEW = 'Alongside'; }
    const R5 = mkR((sd(3) ^ Math.imul(sd(6), 0x27D4EB2F) ^ 0x1975) >>> 0), r5a = R5(); R5(); const r5c = R5(), r5d = R5();
    if (!home && (VIEW === 'Alongside' || VIEW === 'Close behind') && r5c < 0.2) VIEW = 'The sheet';
    const CORR0 = !home && r4b >= 0.15 && r4b < 0.3 && VIEW !== 'From under' && TRIM !== 'Looper';
    const FLIGHTS = !home && VIEW === 'From above' && r5d < 0.18 && !CORR0;
    const SHUT = !home && VIEW !== 'From under' && HOUR !== 'Moonlit' && WIN !== 'Stained quarries' && r5a < SHUT_P
      && HOUR !== 'Last red' && (PAP !== 'Kraft' || VIEW === 'The sheet') && WLL !== 'Soot-dark panel' && FLR !== 'Chequer marble' && !FLIGHTS && !(CORR0 && VIEW === 'Down the hall');
    return [['Fold', FOLD], ['Paper', PAP], ['Trim', TRIM], ['Hour', HOUR], ['Windows', SHUT ? 'Shutters closed' : WIN], ['Floor', FLR], ['Walls', WLL], ['Air', AIR], ['View', VIEW]];
  },
});
// ==== end roll ====

// ==== roll 204 ====
ProtoRolls.add(204, {
  traits: {"Flask":{"look":true,"values":{"Round":499378,"Conical":319986,"Pear":180636}},"Lamp":{"look":true,"values":{"Raking left":400828,"Raking right":249443,"High slit":220102,"From behind":129627}},"Crystals":{"values":{"Plates":500184,"Fine silk":279613,"Great plates":160482,"Mica shards":59721}},"Fill":{"look":true,"values":{"Two thirds":498923,"Half":260219,"To the shoulder":240858}},"Burner":{"values":{"Bunsen":619819,"Spirit lamp":279985,"Twin jets":100196}},"Wall":{"look":true,"values":{"Glazed tile":339627,"Soot black":300929,"Slate":259328,"Night window":100116}},"Gold":{"look":true,"values":{"Deep gold":460024,"Lemon":300263,"Copper":149485,"Oil film":90228}},"Onset":{"look":true,"values":{"From the surface":479769,"Down the walls":360648,"Everywhere":159583}},"View":{"values":{"Across the flask":500620,"From below":299474,"On the bench":199906}}},
  roll(hash) {
    const HOME = '0x40eb32403979e73b60368f6db4e22195eb00d404ef3602ec6ae165be9defdfe1';
    const home = hash === HOME;
    let hs = 0; for (let i = 2; i + 8 <= hash.length; i += 8) hs = Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x9E3779B1) + 0x7F4A7C15 | 0;
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    rnd(); rnd(); rnd();
    const pick = (opts) => { let w = 0; for (const o of opts) w += o[1]; let x = rnd() * w; for (const o of opts) { x -= o[1]; if (x <= 0) return o[0]; } return opts[0][0]; };
    const out = [];
    out.push(['Flask', home ? 'Round' : pick([['Round', 50], ['Conical', 32], ['Pear', 18]])]);
    out.push(['Lamp', home ? 'Raking left' : pick([['Raking left', 40], ['Raking right', 25], ['High slit', 22], ['From behind', 13]])]);
    out.push(['Crystals', home ? 'Plates' : pick([['Plates', 50], ['Fine silk', 28], ['Great plates', 16], ['Mica shards', 6]])]);
    out.push(['Fill', home ? 'Two thirds' : pick([['Two thirds', 50], ['Half', 26], ['To the shoulder', 24]])]);
    out.push(['Burner', home ? 'Bunsen' : pick([['Bunsen', 62], ['Spirit lamp', 28], ['Twin jets', 10]])]);
    out.push(['Wall', home ? 'Glazed tile' : pick([['Glazed tile', 34], ['Soot black', 30], ['Slate', 26], ['Night window', 10]])]);
    out.push(['Gold', home ? 'Deep gold' : pick([['Deep gold', 46], ['Lemon', 30], ['Copper', 15], ['Oil film', 9]])]);
    out.push(['Onset', home ? 'From the surface' : pick([['From the surface', 48], ['Down the walls', 36], ['Everywhere', 16]])]);
    let vs = 0x811c9dc5 ^ 0x204204; for (let i = 2; i < hash.length; i++) vs = Math.imul(vs ^ hash.charCodeAt(i), 0x01000193);
    vs = vs + 0x6D2B79F5 | 0; let vt = Math.imul(vs ^ vs >>> 15, 1 | vs); vt = vt + Math.imul(vt ^ vt >>> 7, 61 | vt) ^ vt;
    const vU = ((vt ^ vt >>> 14) >>> 0) / 4294967296;
    out.push(['View', home ? 'Across the flask' : vU < .3 ? 'From below' : vU < .5 ? 'On the bench' : 'Across the flask']);
    return out;
  },
});
// ==== end roll ====

// ==== roll 205 ====
ProtoRolls.add(205, {
  traits: {"Water":{"look":true,"values":{"Volvox bloom":230632,"Rotifer garden":185238,"Ciliate swarm":153734,"Spirogyra tangle":120525,"Diatom ooze":107820,"Star plankton":79035,"Blue-green bloom":70593,"Sun animalcules":52423}},"Light":{"look":true,"values":{"Dark-field, cool white":349631,"Dark-field, tungsten":255323,"Rheinberg, amber on blue":120619,"Bright-field":119630,"Nomarski relief":80355,"Rheinberg, gold on violet":56021,"Rheinberg, rose on green":18421}},"Objective":{"values":{"10x":579645,"4x":259949,"20x":160406}},"Eyepiece":{"values":{"Round field":659973,"Wide, cropped field":280158,"Off-centre field":59869}},"Silt":{"values":{"Clear":504723,"Silty":335362,"Milky with bacteria":159915}},"Ciliate":{"values":{"Paramecium caudatum":860002,"Paramecium bursaria (green)":139998}},"Slide":{"look":true,"values":{"Spirogyra":411767,"Bare slide":388891,"Air bubble":129111,"Edge of the drop":70231}},"Volvox":{"look":true,"values":{"Young colonies":413583,"None":355785,"Mothers carrying daughters":193923,"Daughters breaking out":36709}}},
  roll(hash) {
    const HOME = '0xbf2fbb57312bbc73ed8ee6b53bc89ce8fee4f9128fed0010bb229de8abe6fd87';
    const home = hash === HOME;
    const h = hash.slice(2);
    const mix32 = (x) => { x = Math.imul(x ^ x >>> 16, 0x85ebca6b); x = Math.imul(x ^ x >>> 13, 0xc2b2ae35); return x ^ x >>> 16; };
    const word = (i) => parseInt(h.slice(i * 8, i * 8 + 8), 16) | 0;
    let s0 = mix32(word(0) ^ mix32(word(4))), s1 = mix32(word(1) ^ mix32(word(5))), s2 = mix32(word(2) ^ mix32(word(6))), s3 = mix32(word(3) ^ mix32(word(7))) | 1;
    const rnd = () => { s0 |= 0; s1 |= 0; s2 |= 0; s3 |= 0; const t = (s0 + s1 | 0) + s3 | 0; s3 = s3 + 1 | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 24; i++) rnd();
    const k0 = o => Object.keys(o)[0];
    const pick = (o) => { let n = 0; for (const k in o) n += o[k]; let r = rnd() * n; for (const k in o) { r -= o[k]; if (r < 0) return k; } return k0(o); };
    let q4 = mix32(word(1) ^ mix32(word(5) ^ 0x2054e12)) | 0;
    const rnd4 = () => { q4 = q4 + 0x6D2B79F5 | 0; let t = Math.imul(q4 ^ q4 >>> 15, 1 | q4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const d4w = home ? 1 : rnd4(), d4l = home ? 1 : rnd4(), d4s = home ? 1 : rnd4();
    const take4 = (d, o) => { let r = d * 100; for (const k in o) { r -= o[k]; if (r < 0) return k; } return null; };
    let scene = home ? 'Volvox bloom' : pick({ 'Volvox bloom': 30, 'Rotifer garden': 24, 'Ciliate swarm': 20, 'Diatom ooze': 14, 'Spirogyra tangle': 12 });
    if (scene !== 'Spirogyra tangle') scene = take4(d4w, { 'Star plankton': 9, 'Blue-green bloom': 8, 'Sun animalcules': 6 }) || scene;
    const noVol = scene === 'Ciliate swarm' || scene === 'Star plankton' || scene === 'Blue-green bloom' || scene === 'Sun animalcules';
    let lampN = home ? 'Dark-field, cool white' : pick({ 'Dark-field, cool white': 42, 'Dark-field, tungsten': 32, 'Rheinberg, amber on blue': 15, 'Rheinberg, gold on violet': 7, 'Rheinberg, rose on green': 4 });
    if (lampN === 'Rheinberg, rose on green' && (scene === 'Volvox bloom' || scene === 'Spirogyra tangle' || scene === 'Blue-green bloom')) lampN = 'Dark-field, cool white';
    lampN = take4(d4l, { 'Bright-field': 12, 'Nomarski relief': 8 }) || lampN;
    const objN = home ? '10x' : pick({ '10x': 58, '4x': 26, '20x': 16 });
    const eyeN = home ? 'Round field' : pick({ 'Round field': 66, 'Wide, cropped field': 28, 'Off-centre field': 6 });
    let siltN = home ? 'Clear' : pick({ 'Clear': 48, 'Silty': 36, 'Milky with bacteria': 16 });
    const cili = home ? 'Paramecium caudatum' : pick({ 'Paramecium caudatum': 86, 'Paramecium bursaria (green)': 14 });
    const hatch = !home && scene === 'Volvox bloom' && rnd() < .16;
    let feat = home ? 'Spirogyra' : (scene === 'Spirogyra tangle' ? 'Spirogyra' : pick({ 'Bare slide': 48, 'Spirogyra': 36, 'Air bubble': 16 }));
    if (scene !== 'Spirogyra tangle') feat = take4(d4s, { 'Edge of the drop': 8 }) || feat;
    if (scene === 'Blue-green bloom' && siltN === 'Silty') siltN = 'Clear';
    return [['Water', scene], ['Light', lampN], ['Objective', objN], ['Eyepiece', eyeN], ['Silt', siltN], ['Ciliate', cili], ['Slide', feat],
      ['Volvox', scene === 'Volvox bloom' ? (hatch ? 'Daughters breaking out' : 'Mothers carrying daughters') : (noVol ? 'None' : 'Young colonies')]];
  },
});
// ==== end roll ====

// ==== roll 209 ====
ProtoRolls.add(209, {
  traits: {"Lamps":{"look":true,"values":{"Warm halogen":459561,"Cold LED":280552,"Warm and cold":159644,"Sodium":60091,"Sea green":40152}},"Lamp places":{"look":true,"values":{"Floor and side":400038,"Both sides":259763,"Far wall":240354,"One floor lamp":99845}},"Basin":{"look":true,"values":{"White plaster":340225,"Mosaic":340071,"Terrazzo":199832,"Black stone":119872}},"Walls":{"look":true,"values":{"Board concrete":439728,"Limewash":279776,"Old brick":199879,"Rusted steel":80617}},"Tree":{"look":true,"values":{"Olive":300164,"Myrtle":258988,"Laurel":200381,"Bamboo":180463,"Bare branches":60004}},"Wind":{"look":true,"values":{"Light air":460162,"Breeze":280696,"Dead calm":199322,"Squalls":59820}},"Stones on the bottom":{"look":true,"values":{"None":279769,"A few":210055,"A handful":139980,"None, one going in":120145,"A few, one going in":89791,"Years of them":70040,"A handful, one going in":60037,"Years of them, one going in":30183}},"Night":{"values":{"Moonless":600242,"Thin cloud":299645,"Moonlit":100113}},"View":{"look":true,"values":{"Into the water":259273,"Far wall":244879,"Along the wall":150158,"Side wall":140139,"The net":115539,"Across the corner":90012}}},
  roll(hash) {
    const HOME = '0x3986ca8a635c98271ae703401167f81ca3d426ae5e9e0dd5300579ec46f2f10a';
    const home = hash === HOME;
    function rng(hash) {
      let a = parseInt(hash.slice(2, 10), 16) >>> 0, b = parseInt(hash.slice(10, 18), 16) >>> 0, c = parseInt(hash.slice(18, 26), 16) >>> 0, d = parseInt(hash.slice(26, 34), 16) >>> 0;
      return () => { a |= 0; b |= 0; c |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = (c << 21 | c >>> 11); c = c + t | 0; return (t >>> 0) / 4294967296; };
    }
    const pick = (r, list) => { let t = 0; for (const e of list) t += e[1]; let x = r() * t; for (const e of list) { x -= e[1]; if (x <= 0) return e[0]; } return list[0][0]; };
    const r = rng(hash);
    const r2 = rng('0x' + hash.slice(42) + hash.slice(2, 10) + '5bd1e995');
    const v2 = r2(), viewT = home ? 'Far wall' : v2 < .14 ? 'Side wall' : v2 < .255 ? 'The net' : v2 < .34 ? 'Along the wall' : v2 < .6 ? 'Into the water'
      : v2 < .665 ? 'Along the wall' : v2 < .755 ? 'Across the corner' : 'Far wall';
    const lampsT = home ? 'Warm halogen' : pick(r, [['Warm halogen', 46], ['Cold LED', 28], ['Warm and cold', 16], ['Sodium', 6], ['Sea green', 4]]);
    const layoutT = home ? 'Far wall' : pick(r, [['Floor and side', 40], ['Both sides', 26], ['Far wall', 24], ['One floor lamp', 10]]);
    const basinT = home ? 'Mosaic' : pick(r, [['Mosaic', 34], ['White plaster', 34], ['Terrazzo', 20], ['Black stone', 12]]);
    const wallT = home ? 'Board concrete' : pick(r, [['Board concrete', 44], ['Limewash', 28], ['Old brick', 20], ['Rusted steel', 8]]);
    const treeT = home ? 'Olive' : pick(r, [['Olive', 30], ['Myrtle', 26], ['Laurel', 20], ['Bamboo', 18], ['Bare branches', 6]]);
    const windT = home ? 'Breeze' : pick(r, [['Light air', 46], ['Dead calm', 20], ['Breeze', 28], ['Squalls', 6]]);
    const stonesN = home ? 3 : pick(r, [[0, 40], [3, 30], [8, 20], [30, 10]]);
    const skyT = pick(r, [['Moonless', 60], ['Thin cloud', 30], ['Moonlit', 10]]);
    const vThrow = r2();
    const throwing = !home && vThrow < .3;
    return [['Lamps', lampsT], ['Lamp places', layoutT], ['Basin', basinT], ['Walls', wallT], ['Tree', treeT], ['Wind', windT],
      ['Stones on the bottom', (stonesN === 0 ? 'None' : stonesN === 3 ? 'A few' : stonesN === 8 ? 'A handful' : 'Years of them') + (throwing ? ', one going in' : '')],
      ['Night', skyT], ['View', viewT]];
  },
});
// ==== end roll ====

// ==== roll 211 ====
ProtoRolls.add(211, {
  traits: {"Heap":{"look":true,"values":{"Dropped sheaf":329394,"Tossed":156890,"Dropped sheaf, mid-game":140713,"Bird nest":100071,"Log jam":85423,"Tossed, mid-game":67616,"Bird nest, mid-game":42537,"Log jam, mid-game":36789,"Crib":28386,"Crib, mid-game":12181}},"Paint":{"look":true,"values":{"Ringed":439840,"Lacquer":260139,"Barber":180427,"Scorched bamboo":79738,"Ebony and bone":39856}},"Table":{"look":true,"values":{"Marbled lino":299424,"Painted boards":240637,"Baize":219926,"Zinc top":160047,"Slate":79966}},"Light":{"look":true,"values":{"Low sun":440222,"North window":220103,"Bare bulb":200210,"Flash":139465}},"Lens":{"values":{"Three-quarter":580293,"Overhead plate":279243,"Low on the table":140464}},"Sticks":{"values":{"23":240281,"41":559570,"61":200149}},"Gauge":{"values":{"Standard":519677,"Long and slim":259611,"Short and stout":220712}},"Rival":{"values":{"Steady":500509,"Patient":279323,"Shaky":220168}},"Gilded stick":{"values":{"No":910200,"Yes":89800}}},
  roll(hash) {
    const HOME = '0xf439bc6c109a16ebf38814df21f384cf9feb170f8f590d56b6db66eeede39371';
    const home = hash === HOME;
    const hw = []; for (let i = 0; i < 8; i++) hw.push(parseInt(hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0);
    const rngOf = salt => { let a = (hw[0] ^ salt) >>> 0, b = (hw[1] + salt * 2654435761) >>> 0, cc = hw[2] >>> 0, d = (hw[3] ^ (salt << 7)) >>> 0;
      const f = () => { a |= 0; b |= 0; cc |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) f(); return f; };
    const R = rngOf(0x51);
    const pick = (list) => { let s = 0; for (const x of list) s += x[1]; let v = R() * s; for (const x of list) { v -= x[1]; if (v <= 0) return x[0]; } return list[0][0]; };
    let fallT = pick([['Dropped sheaf', 46], ['Tossed', 22], ['Bird nest', 14], ['Log jam', 12], ['Crib', 4]]);
    let setT = pick([['Ringed', 44], ['Lacquer', 26], ['Barber', 18], ['Scorched bamboo', 8], ['Ebony and bone', 4]]);
    let tableT = pick([['Marbled lino', 30], ['Painted boards', 24], ['Baize', 22], ['Zinc top', 16], ['Slate', 8]]);
    let lightT = pick([['Low sun', 44], ['North window', 22], ['Bare bulb', 20], ['Flash', 14]]);
    let viewT = pick([['Three-quarter', 58], ['Overhead plate', 28], ['Low on the table', 14]]);
    let countT = pick([[41, 56], [23, 24], [61, 20]]);
    let gaugeT = pick([['Standard', 52], ['Long and slim', 26], ['Short and stout', 22]]);
    let handT = pick([['Steady', 50], ['Patient', 28], ['Shaky', 22]]);
    let gilded = R() < .09;
    if (home) { fallT = 'Dropped sheaf'; setT = 'Ringed'; tableT = 'Marbled lino'; lightT = 'Low sun'; viewT = 'Three-quarter'; countT = 41; gaugeT = 'Standard'; handT = 'Steady'; gilded = false; }
    const RG = rngOf(0xB7), midGame = !home && RG() < .3;
    return [['Heap', fallT + (midGame ? ', mid-game' : '')], ['Paint', setT], ['Table', tableT], ['Light', lightT], ['Lens', viewT], ['Sticks', String(countT)],
      ['Gauge', gaugeT], ['Rival', handT], ['Gilded stick', gilded ? 'Yes' : 'No']];
  },
});
// ==== end roll ====

// ==== roll 212 ====
ProtoRolls.add(212, {
  traits: {"Test Piece":{"look":true,"values":{"Lens":421727,"Small Lens":177728,"Flat On Flat":177082,"Cylinder":113519,"Wide Lens":109944}},"Lens Curve":{"look":true,"values":{"30 m":386942,"14 m":251745,"None":177082,"60 m":121170,"6 m":63061}},"Dust":{"look":true,"values":{"One Grain":246909,"Two Grains":245754,"Clean":205325,"Scatter":163466,"Lint Fibre":81620,"Grit":56926}},"Flat":{"values":{"Plate":526513,"Thick Flat":368262,"Thin Slide":105225}},"Figure":{"values":{"True":570301,"Oval":254298,"Turned Edge":104568,"Hand Zones":70833}},"Film":{"values":{"Air":822970,"Water":102146,"Half Silvered":74884}},"Lamp":{"look":true,"values":{"Fresh":367029,"Tired":178486,"Mercury Green":159414,"Bare U-Tube":134124,"White Light":80501,"Unfiltered Mercury":80446}},"Bench And Cell":{"look":true,"values":{"Satin Aluminium, Brass Cell":305905,"Black Anodised, Brass Cell":153047,"Satin Aluminium, Black Cell":138199,"Slate, Brass Cell":122471,"Satin Aluminium, Nickel Cell":82018,"Black Anodised, Black Cell":69015,"Slate, Black Cell":55415,"Black Anodised, Nickel Cell":41260,"Slate, Nickel Cell":32670}},"View":{"look":true,"values":{"Three Quarter":344890,"Steep":172485,"Low":138541,"Three Quarter, Close":107789,"Three Quarter, On Contact":72881,"Steep, Close":53967,"Low, Close":43614,"Steep, On Contact":36471,"Low, On Contact":29362}},"Room":{"values":{"Dark":581225,"Work Light On":418775}}},
  roll(hash) {
    const HOME = '0x426b78d9f90daa59f8ec863338f7bfdf189232c2485603128925d226f48d8ab8';   // hashFor(211, 0), as runtime.js: c.home
    const home = hash === HOME;   // (the art's DBG force path is off: DBG = 0 ships)
      let hs = 0x811c9dc5 ^ 212212; for (let i = 2; i < hash.length; i++) { hs ^= hash.charCodeAt(i); hs = Math.imul(hs, 0x01000193); }
      const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
      let curve = pick([['30 m', 5], ['14 m', 4], ['60 m', 1.2], ['6 m', 1]]);
      let dust = pick([['Clean', 2.5], ['One Grain', 3], ['Two Grains', 3], ['Scatter', 2], ['Lint Fibre', 1], ['Grit', .7]]);
      let flat = pick([['Plate', 5], ['Thick Flat', 3.5], ['Thin Slide', 1]]);
      let figure = pick([['True', 5], ['Oval', 2.5], ['Turned Edge', 1.5], ['Hand Zones', .8]]);
      let filmT = pick([['Air', 8], ['Water', 1], ['Half Silvered', .8]]);
      let tube = pick([['Fresh', 5], ['Tired', 2], ['Bare U-Tube', 1.5]]);
      let bench = pick([['Satin Aluminium', 5], ['Black Anodised', 2.5], ['Slate', 2]]);
      let cell = pick([['Brass', 6], ['Black', 2.5], ['Nickel', 1]]);
      let angle = pick([['Three Quarter', 5], ['Steep', 2.5], ['Low', 2]]);
      if (filmT === 'Half Silvered' && (curve === '14 m' || curve === '6 m')) curve = '30 m';
      if (home) { curve = '30 m'; dust = 'Two Grains'; flat = 'Plate'; figure = 'True'; filmT = 'Air'; tube = 'Fresh'; bench = 'Satin Aluminium'; cell = 'Brass'; angle = 'Three Quarter'; }
      let h2 = 0x9e3779b9 ^ 212213; for (let i = 2; i < hash.length; i++) { h2 ^= hash.charCodeAt(i); h2 = Math.imul(h2, 0x01000193); }
      const rnd2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const lr = rnd2(), fr = rnd2(), sx2 = rnd2(), sy2 = rnd2();
      let lampK = 0, close = false;
      if (!home) {
        lampK = lr < .08 ? 2 : lr < .24 ? 1 : 0;
        close = fr < .3;
        if (lampK === 1) tube = 'Mercury Green';
        if (lampK === 2) { tube = 'White Light'; if (cell === 'Brass') cell = 'Nickel'; if (curve === '14 m' || curve === '6 m') curve = '60 m'; if (filmT === 'Half Silvered') filmT = 'Air'; }
      }
      let h3 = 0x85ebca6b ^ 212214; for (let i = 2; i < hash.length; i++) { h3 ^= hash.charCodeAt(i); h3 = Math.imul(h3, 0x01000193); }
      const rnd3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const turn = home ? .45 : (rnd3() < .5 ? -1 : 1) * (.3 + .3 * rnd3()), steepD = 14 + 4 * rnd3(), wC = 12 + 4 * rnd3();
      let h4 = 0x27d4eb2f ^ 212215; for (let i = 2; i < hash.length; i++) { h4 ^= hash.charCodeAt(i); h4 = Math.imul(h4, 0x01000193); }
      const rnd4 = () => { h4 = h4 + 0x6D2B79F5 | 0; let t = Math.imul(h4 ^ h4 >>> 15, 1 | h4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const q4 = []; for (let i = 0; i < 16; i++) q4.push(rnd4());
      const nF0 = filmT === 'Water' ? 1.333 : 1;
      let top = 'Lens', RL = 19.5, TG = 7, offC = false, room = 'Dark';
      if (!home) {
        top = q4[0] < .66 ? 'Lens' : q4[0] < .86 ? 'Flat On Flat' : 'Cylinder';
        if (filmT === 'Half Silvered' && q4[14] < .5) top = 'Flat On Flat';
        if (lampK === 2 && top === 'Flat On Flat') top = 'Lens';
        if (lampK === 1) top = 'Lens';
        if (lampK === 0 && tube === 'Fresh' && q4[2] < .18) { lampK = 3; tube = 'Unfiltered Mercury'; }
        if (q4[1] < .5 && (lampK === 0 || lampK === 1)) room = 'Work Light On';
        if (top === 'Lens') { RL = q4[3] < .25 ? 12 : q4[3] < .75 || curve === '14 m' || curve === '6 m' ? 19.5 : 27; offC = q4[4] < .4; }
        else if (top === 'Flat On Flat') { RL = 27 + 2 * q4[3]; TG = 9; }
        if (RL === 12) TG = 5; else if (RL === 27) TG = 8;
      }
      const topK = top === 'Flat On Flat' ? 1 : top === 'Cylinder' ? 2 : 0;
      const onContact = !home && topK !== 1 && (curve === '6 m' || (curve === '14 m' && close));
      const near = !home && !close && !onContact && q4[7] < .5;
      const teHid = topK !== 1 && figure === 'Turned Edge' && (curve === '14 m' || curve === '6 m');
      const figName = teHid || (onContact && figure === 'Hand Zones') ? 'True' : figure;
      if (onContact) angle += ', On Contact'; else if (close) angle += ', Close';
      return [['Test Piece', topK ? top : RL === 12 ? 'Small Lens' : RL === 27 ? 'Wide Lens' : 'Lens'],
        ['Lens Curve', topK === 1 ? 'None' : curve], ['Dust', dust], ['Flat', flat], ['Figure', figName], ['Film', filmT],
        ['Lamp', tube], ['Bench And Cell', bench + ', ' + cell + ' Cell'], ['View', angle], ['Room', room]];
  },
});
// ==== end roll ====

// ==== roll 213 ====
ProtoRolls.add(213, {
  traits: {"Honey":{"look":true,"values":{"Wildflower":453884,"Acacia":275154,"Chestnut":180034,"Honeydew":90928}},"Warmth":{"values":{"Room warm":500238,"Warmed":300280,"Cold":199482}},"Stream":{"values":{"Steady":529700,"Fine":399711,"Flat from the edge":70589}},"Spoon":{"values":{"Old silver":501297,"Tarnished silver":299767,"Olive wood":198936}},"Surface":{"look":true,"values":{"Enamel dish":332627,"Black slate":197229,"Dark glass":132469,"Old zinc":131334,"A dish of honey":117606,"Light table":88735}},"Lamp":{"look":true,"values":{"Tungsten, left":304668,"Tungsten, right":202634,"North window, left":182248,"North window, right":120911,"Light table":88735,"Low sun, left":60683,"Low sun, right":40121}},"Fall":{"look":true,"values":{"Middle, from above":275918,"High, from above":165464,"Middle":159059,"Low, from above":106346,"High":95572,"Low":67845,"Middle, close on the pile":64046,"High, close on the pile":38534,"Low, close on the pile":27216}},"Hand":{"values":{"Steady hand":554419,"Drawing a line":128204,"Drizzling":118094,"Circling":107649,"Drifting hand":91634}},"Air":{"values":{"Clear":502143,"Fine bubbles":375992,"Frothy":121865}}},
  roll(hash) {
    // the home: hashFor(num - 1, 0), as drop/runtime.js sets def.index (stub-213.mjs does the same)
    const HOME = '0xd48024be6a1452ecad40b671c2db19c8e5630ae88ff8ff0e1a0b9136333875cf';
    const home = hash === HOME;
    const s = hash.replace(/^0x/, ''), rnd0 = i => parseInt(s.substr((i * 2) % 62, 2), 16) / 255;
    let ri = 0; const rnd = () => { const a = rnd0(ri), b = rnd0(ri + 7); ri++; return (a * 251 + b) % 1; };
    const pick = opts => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot; for (const o of opts) { r -= o[1]; if (r <= 0) return o[0]; } return opts[0][0]; };
    const honey = pick([['Wildflower', 5], ['Acacia', 3], ['Chestnut', 2], ['Honeydew', 1]]);
    const warmth = pick([['Room warm', 5], ['Warmed', 3], ['Cold', 2]]);
    const stream = pick([['Fine', 4], ['Steady', 5], ['Flat from the edge', 1]]);
    const spoonK = pick([['Old silver', 5], ['Tarnished silver', 3], ['Olive wood', 2]]);
    const surf = pick([['Enamel dish', 5], ['Black slate', 3], ['Dark glass', 2], ['Old zinc', 2]]);
    const lampK = pick([['Tungsten', 5], ['North window', 3], ['Low sun', 1]]);
    const side = pick([['Left', 3], ['Right', 2]]);
    const start = pick([['Low', 2], ['Middle', 5], ['High', 3]]);
    const hand = pick([['Steady hand', 6], ['Drifting hand', 1]]);
    const air = pick([['Clear', 4], ['Fine bubbles', 3], ['Frothy', 1]]);
    const strm = k => {
      let vs = 0x811c9dc5 ^ k; for (let i = 2; i < hash.length; i++) vs = Math.imul(vs ^ hash.charCodeAt(i), 0x01000193);
      vs = vs + 0x6D2B79F5 | 0; let vt = Math.imul(vs ^ vs >>> 15, 1 | vs); vt = vt + Math.imul(vt ^ vt >>> 7, 61 | vt) ^ vt;
      return ((vt ^ vt >>> 14) >>> 0) / 4294967296;
    };
    const vu = strm(0x213213);
    const T = home ? { honey: 'Wildflower', warmth: 'Room warm', stream: 'Fine', spoonK: 'Old silver', surf: 'Enamel dish', lampK: 'Tungsten', side: 'Left', start: 'Middle', hand: 'Steady hand', air: 'Clear' } : { honey, warmth, stream, spoonK, surf, lampK, side, start, hand, air };
    const uH = strm(0x2130a1), uS = strm(0x2130a2);
    const keep = home || (T.stream === 'Flat from the edge' && T.start === 'Low');
    if (!keep && uH < .36) T.hand = uH < .13 ? 'Drawing a line' : uH < .25 ? 'Drizzling' : 'Circling';
    if (!keep && uS < .21) T.surf = uS < .12 ? 'A dish of honey' : 'Light table';
    const figV = T.hand === 'Drawing a line' || T.hand === 'Drizzling' || T.hand === 'Circling', ltab = T.surf === 'Light table';
    if (figV && T.stream === 'Flat from the edge') T.stream = 'Steady';
    const highV = !home && !figV && vu < .3;
    const nearV = !home && !figV && !highV && vu < .5;
    return [['Honey', T.honey], ['Warmth', T.warmth], ['Stream', T.stream], ['Spoon', T.spoonK], ['Surface', T.surf],
      ['Lamp', ltab ? 'Light table' : T.lampK + ', ' + T.side.toLowerCase()],
      ['Fall', T.start + (highV || figV ? ', from above' : nearV ? ', close on the pile' : '')], ['Hand', T.hand], ['Air', T.air]];
  },
});
// ==== end roll ====

// ==== roll 214 ====
ProtoRolls.add(214, {
  traits: {"Wire":{"values":{"Flat Ribbon":598706,"Round Wire":300971,"Wide Ribbon":100323}},"Finish":{"values":{"Bright Steel":572014,"Oiled Black":209548,"Tarnished":151564,"Blued":66874}},"Coils":{"look":true,"values":{"64":382164,"84":475348,"110":142488}},"Hang":{"look":true,"values":{"Even":343156,"Even, mid-drop":228769,"Tight":170888,"Tight, mid-drop":114391,"Slack":85758,"Slack, mid-drop":57038}},"Backdrop":{"look":true,"values":{"Grey Paper":185576,"Putty Paint":171228,"Sage Paint":142702,"Kraft Paper":128496,"White Paper":114478,"Oxblood Paper":92671,"Blackboard":85968,"Muslin":78881}},"Bench":{"look":true,"values":{"Slate":407388,"Black Paint":306591,"Rubber Mat":204212,"Steel Plate":81809}},"Film":{"look":true,"values":{"1/24":260664,"1/16":156794,"1/40":131303,"1/24, from below":99279,"1/24, close on the foot":90084,"1/16, from below":59722,"1/16, close on the foot":53984,"1/40, from below":49377,"1/40, close on the foot":44904,"1/90":31108,"1/90, from below":11879,"1/90, close on the foot":10902}},"Lamp":{"values":{"Side":527741,"Wide":220363,"Close":131845,"Raking":120051}},"Stock":{"values":{"Colour":697470,"Monochrome":162562,"Faded Print":139968}}},
  roll(hash) {
    const HOME = '0x011051d89d94bc6ff8569770bd6f77e202760c12c77d9b8d732c4c8bf1034072';
    const home = hash === HOME, HOME_LET_GO = false;
    let hs = 0x811c9dc5 ^ 214214; for (let i = 2; i < hash.length; i++) { hs ^= hash.charCodeAt(i); hs = Math.imul(hs, 0x01000193); }
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
    let wireT = pick([['Flat Ribbon', 6], ['Round Wire', 3], ['Wide Ribbon', 1]]);
    let finish = pick([['Bright Steel', 6], ['Oiled Black', 2.2], ['Tarnished', 1.6], ['Blued', .7]]);
    let coils = pick([[84, 5], [64, 3], [110, 1.5]]);
    let hang = pick([['Even', 5], ['Tight', 3], ['Slack', 1.5], ['Brass Weight', 1]]);
    let back = pick([['Grey Paper', 2.6], ['White Paper', 1.6], ['Putty Paint', 2.4], ['Sage Paint', 2], ['Kraft Paper', 1.8], ['Muslin', 1.1], ['Oxblood Paper', 1.3], ['Blackboard', 1.2]]);
    let bench = pick([['Slate', 4], ['Black Paint', 3], ['Rubber Mat', 2], ['Steel Plate', .8]]);
    let film = pick([['1/24', 5], ['1/16', 3], ['1/40', 2.5], ['1/90', .6]]);
    let lamp = pick([['Side', 6], ['Wide', 2.5], ['Close', 1.5]]);
    let stockT = pick([['Colour', 6], ['Monochrome', 1.4], ['Faded Print', 1.2]]);
    if (home) { wireT = 'Flat Ribbon'; finish = 'Bright Steel'; coils = 84; hang = 'Even'; back = 'Putty Paint'; bench = 'Slate'; film = '1/24'; lamp = 'Side'; stockT = 'Colour'; }
    if (hang === 'Brass Weight') { coils = 64; hang = 'Even'; }
    let hs2 = 0x811c9dc5 ^ 0x2141d5e3; for (let i = 2; i < hash.length; i++) { hs2 ^= hash.charCodeAt(i); hs2 = Math.imul(hs2, 0x01000193); }
    const rnd2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vDrop = rnd2(), vDropT = rnd2(), vCam = rnd2();
    const dropped = home ? HOME_LET_GO : vDrop < .4;
    const camV = home ? 0 : vCam < .22 ? 1 : vCam < .42 ? 2 : 0;
    let hs3 = 0x811c9dc5 ^ 0x2143a7b1; for (let i = 2; i < hash.length; i++) { hs3 ^= hash.charCodeAt(i); hs3 = Math.imul(hs3, 0x01000193); }
    const rnd3 = () => { hs3 = hs3 + 0x6D2B79F5 | 0; let t = Math.imul(hs3 ^ hs3 >>> 15, 1 | hs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vLamp = rnd3();
    if (!home && vLamp >= .05 && vLamp < .17) lamp = 'Raking';
    return [['Wire', wireT], ['Finish', finish], ['Coils', String(coils)], ['Hang', hang + (dropped ? ', mid-drop' : '')],
      ['Backdrop', back], ['Bench', bench], ['Film', film + (camV === 1 ? ', from below' : camV === 2 ? ', close on the foot' : '')], ['Lamp', lamp], ['Stock', stockT]];
  },
});
// ==== end roll ====

// ==== roll 215 ====
ProtoRolls.add(215, {
  traits: {"Flask":{"values":{"Round":620516,"Pear":239747,"Conical":139737}},"Fill":{"values":{"Two Thirds":560293,"Half":239387,"Brimming":200320}},"Reducer":{"values":{"Glucose":550874,"Formalin":309316,"Rochelle Salt":139810}},"Metal":{"values":{"Silver":870355,"Gold":79894,"Copper":49751}},"Glass":{"values":{"Clean":741015,"Greasy":178945,"Etched":80040}},"Weather":{"values":{"Overcast":520086,"Bright Haze":280085,"Low Sun":130300,"Snow":69529}},"Room":{"values":{"Three Bays":519639,"Two Bays":339769,"Skylight":140592}},"Bath":{"look":true,"values":{"Graniteware":499952,"Steel":260301,"White Enamel":139387,"Copper":100360}},"Angle":{"values":{"Level":507387,"Low":244692,"Over":187911,"Over the neck":60010}},"Side":{"values":{"Shelf wall":580266,"From the windows":264046,"Against the light":155688}},"Hour":{"values":{"Day":800520,"Lamps on":199480}},"Stage":{"values":{"Growing":699593,"Finished":300407}}},
  roll(hash) {
    const HOME = '0x79004bd17822ab095cfc65894b1e8306f78fdf6be571bf4e6299b7e606821f61';
    const home = hash === HOME;
    const out = [];
    const T = (n, v) => { v = String(v); for (const r of out) if (r[0] === n) { r[1] = v; return; } out.push([n, v]); };
    let h0 = 0; const hs = hash.slice(2);
    for (let i = 0; i < hs.length; i += 8) h0 = (Math.imul(h0, 31) + parseInt(hs.slice(i, i + 8), 16)) | 0;
    let s = h0 >>> 0;
    const rnd = () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (name, opts, hv) => { let w = 0; for (const o of opts) w += o[1]; let r = rnd() * w, v = opts[0][0]; for (const o of opts) { r -= o[1]; if (r <= 0) { v = o[0]; break; } } if (home) v = hv; T(name, v); return v; };
    pick('Flask', [['Round', 62], ['Pear', 24], ['Conical', 14]], 'Round');
    pick('Fill', [['Half', 24], ['Two Thirds', 56], ['Brimming', 20]], 'Two Thirds');
    pick('Reducer', [['Glucose', 55], ['Formalin', 31], ['Rochelle Salt', 14]], 'Glucose');
    const metT = pick('Metal', [['Silver', 87], ['Gold', 8], ['Copper', 5]], 'Silver');
    pick('Glass', [['Clean', 74], ['Greasy', 18], ['Etched', 8]], 'Clean');
    pick('Weather', [['Overcast', 52], ['Bright Haze', 28], ['Low Sun', 13], ['Snow', 7]], 'Overcast');
    const roomT = pick('Room', [['Three Bays', 52], ['Two Bays', 34], ['Skylight', 14]], 'Three Bays');
    const bathT = pick('Bath', [['Graniteware', 50], ['Steel', 26], ['White Enamel', 14], ['Copper', 10]], 'Graniteware');
    pick('Angle', [['Level', 54], ['Low', 26], ['Over', 20]], 'Level');
    let h2 = (h0 ^ 0x2c1b3c6d) | 0;
    const rnd2 = () => { h2 = (h2 + 0x6D2B79F5) | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const cr = rnd2(); rnd2(); rnd2(); rnd2(); rnd2();
    const aboveV = !home && cr >= .26 && cr < .36 && (bathT === 'Graniteware' || bathT === 'Copper');
    if (aboveV) T('Angle', 'Over the neck');
    const cs6 = rnd2(), cs7 = rnd2(), cs8 = rnd2();
    const pick2 = (opts, v0, hv) => { let w = 0; for (const o of opts) w += o[1]; let r = v0 * w, v = opts[0][0]; for (const o of opts) { r -= o[1]; if (r <= 0) { v = o[0]; break; } } return home ? hv : v; };
    let sideT = pick2([['Shelf wall', 52], ['From the windows', 24], ['Against the light', 24]], cs6, 'Shelf wall');
    if (aboveV || (sideT === 'Against the light' && roomT === 'Skylight')) sideT = 'Shelf wall';
    const hourT = pick2([['Day', 80], ['Lamps on', 20]], cs7, 'Day');
    if (hourT === 'Lamps on' && sideT === 'Against the light') sideT = 'From the windows';
    let stageT = pick2([['Growing', 76], ['Finished', 24]], cs8, 'Growing');
    if (metT === 'Gold' && !home) stageT = 'Finished';
    T('Side', sideT); T('Hour', hourT); T('Stage', stageT);
    return out;
  },
});
// ==== end roll ====

// ==== roll 218 ====
ProtoRolls.add(218, {
  traits: {"Puck":{"look":true,"values":{"Seeded Disc":439101,"Sintered Pellet":262880,"Wide Wafer":219120,"Holed Ring":78899}},"Rail":{"look":true,"values":{"Nickel Blocks":463401,"Steel Keepers":277325,"Black Epoxy":184722,"Gold Plate":74552}},"Seams":{"values":{"Flush":525740,"Gapped":369369,"Missing Block":104891}},"Pinned":{"look":true,"values":{"Slanted":442817,"Nearly Level":265341,"Steep":221379,"On Edge":70463}},"Height":{"values":{"Hovering":526086,"Close":263384,"High":210530}},"Light":{"look":true,"values":{"Back Lamp":434838,"Tungsten":261021,"North Window":217321,"Hard Flash":86820}},"Bench":{"look":true,"values":{"Black Resin":408797,"Steel Tray":273128,"Slate":227029,"Foam Box":91046}},"Fog":{"values":{"Steady":588331,"Thin":293519,"Drenched":118150}},"View":{"look":true,"values":{"Three Quarter":190244,"Down the Rail":150014,"Side On":149793,"Close Up":120159,"From Above":119813,"Low":94935,"High":94588,"Wide":80454}}},
  roll(hash) {
    const HOME = '0x4af232153ed1350d47bc2ac2fc60f29e3c45db46071988ac8c4168a12b654760';   // hashFor(217, 0): the site's home
    if (hash === HOME) return [['Puck', 'Seeded Disc'], ['Rail', 'Nickel Blocks'], ['Seams', 'Flush'], ['Pinned', 'Slanted'], ['Height', 'Hovering'], ['Light', 'Back Lamp'], ['Bench', 'Black Resin'], ['Fog', 'Steady'], ['View', 'Three Quarter']];
    let hs = 0x811c9dc5 ^ 218218; for (let i = 2; i < hash.length; i++) { hs ^= hash.charCodeAt(i); hs = Math.imul(hs, 0x01000193); }
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
    const puckT = pick([['Seeded Disc', 5], ['Sintered Pellet', 3], ['Wide Wafer', 2.5], ['Holed Ring', .9]]);
    const trackT = pick([['Nickel Blocks', 5], ['Steel Keepers', 3], ['Black Epoxy', 2], ['Gold Plate', .8]]);
    const seamT = pick([['Flush', 5], ['Gapped', 3.5], ['Missing Block', 1]]);
    const poseT = pick([['Slanted', 5], ['Nearly Level', 3], ['Steep', 2.5], ['On Edge', .8]]);
    const heightT = pick([['Hovering', 5], ['Close', 2.5], ['High', 2]]);
    const lightT = pick([['Back Lamp', 5], ['Tungsten', 3], ['North Window', 2.5], ['Hard Flash', 1]]);
    const benchT = pick([['Black Resin', 4.5], ['Steel Tray', 3], ['Slate', 2.5], ['Foam Box', 1]]);
    const fogT = pick([['Steady', 5], ['Thin', 2.5], ['Drenched', 1]]);
    let viewT = pick([['Three Quarter', 5], ['Low', 2.5], ['High', 2.5]]);
    let h2 = 0x6a09e667 ^ 218311; for (let i = 2; i < hash.length; i++) { h2 ^= hash.charCodeAt(i); h2 = Math.imul(h2, 0x01000193); }
    const rnd2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    { const v = rnd2(); if (v < .15) viewT = 'Side On'; else if (v < .27) viewT = 'Close Up'; else if (v < .35) viewT = 'Wide'; else if (v < .5) viewT = 'Down the Rail'; else if (v < .62) viewT = 'From Above'; }
    return [['Puck', puckT], ['Rail', trackT], ['Seams', seamT], ['Pinned', poseT], ['Height', heightT], ['Light', lightT], ['Bench', benchT], ['Fog', fogT], ['View', viewT]];
  },
});
// ==== end roll ====

// ==== roll 221 ====
ProtoRolls.add(221, {
  traits: {"Foam":{"look":true,"values":{"Pearl":380108,"Blush":200087,"Ice":180431,"Lemon":139341,"Triple foam":100033}},"Tunnel":{"look":true,"values":{"Mixed":340916,"Cold tubes":260114,"Sodium":239079,"Blue LEDs":159891}},"Seat":{"values":{"Left seat":599580,"Right seat":400420}},"Cabin":{"values":{"Saloon":500552,"Low coupe":249857,"Van":249591}},"Wipers":{"values":{"Tandem":620705,"Opposed":279138,"Single arm":100157}},"Glass":{"values":{"Waxed":619661,"Bare":279906,"Stone chip":100433}},"Rollers":{"look":true,"values":{"Blue felt":379970,"Red and grey":280060,"Charcoal":239908,"Touchless":100062}},"Lather":{"look":true,"values":{"Heavy":463044,"Thin":320899,"Drowned":119951,"Heavy, slumped":33207,"Heavy, in lanes":23608,"Thin, slumped":22935,"Thin, in lanes":16356}},"Opens on":{"look":true,"values":{"Drum on the glass":270221,"Lathered":181619,"Sheeting":125787,"Foam arch":111956,"Rinse arch":94685,"Beaded":80455,"Under the dryers":75659,"Wrap brush":59618}}},
  roll(hash) {
    const HOME = '0x0d15b91da17c364e5c60ba08803c38f7757d4ad068a990cda85c01e9f5e16061';
    const home = hash === HOME, out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const PI = Math.PI;

    // ---- from the piece's make()
      // ---- randomness from the hash only
      let h0 = 0; for (let i = 2; i < hash.length; i++) h0 = (Math.imul(h0, 31) + hash.charCodeAt(i)) >>> 0;
      let rs = h0 ^ 0x9e3779b9;
      const rnd = () => { rs = (rs + 0x6D2B79F5) | 0; let z = Math.imul(rs ^ (rs >>> 15), 1 | rs); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
      const pick = (name, opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot, ch = opts[0]; for (const o of opts) { r -= o[1]; if (r <= 0) { ch = o; break; } } return ch[0]; };
      let tFoam = pick('', [['Pearl', 38], ['Blush', 20], ['Ice', 18], ['Lemon', 14], ['Triple foam', 10]]);
      let tLight = pick('', [['Mixed', 34], ['Cold tubes', 26], ['Sodium', 24], ['Blue LEDs', 16]]);
      let tSeat = pick('', [['Left seat', 60], ['Right seat', 40]]);
      let tCabin = pick('', [['Saloon', 50], ['Van', 25], ['Low coupe', 25]]);
      let tArms = pick('', [['Tandem', 62], ['Opposed', 28], ['Single arm', 10]]);
      let tBlade = pick('', [['New rubber', 50], ['Worn rubber', 38], ['Perished rubber', 12]]);
      let tGlass = pick('', [['Waxed', 62], ['Bare', 28], ['Stone chip', 10]]);
      let tCloth = pick('', [['Blue felt', 38], ['Red and grey', 28], ['Charcoal', 24], ['Touchless', 10]]);
      let tLather = pick('', [['Heavy', 52], ['Thin', 36], ['Drowned', 12]]);
      if (home) { tFoam = 'Blush'; tLight = 'Mixed'; tSeat = 'Left seat'; tCabin = 'Saloon'; tArms = 'Tandem'; tBlade = 'Worn rubber'; tGlass = 'Waxed'; tCloth = 'Blue felt'; tLather = 'Heavy'; }
      T('Foam', tFoam); T('Tunnel', tLight); T('Seat', tSeat); T('Cabin', tCabin); T('Wipers', tArms); T('Glass', tGlass); T('Rollers', tCloth);
      const pal = { Pearl: [[.985, .98, .96], [.965, .975, .995], [.99, .985, .965]], Blush: [[.965, .82, .86], [.99, .965, .975], [.965, .89, .92]], Ice: [[.74, .85, .985], [.97, .985, 1], [.82, .90, .985]], Lemon: [[.985, .93, .66], [.985, .985, .92], [.96, .96, .78]], 'Triple foam': [[.97, .74, .81], [.74, .83, .98], [.985, .93, .70]] }[tFoam];
      const sigs = pal.map(a => a.map(x => -Math.log(x) * 1.15));
      const light = { Mixed: { tube: [.86, .93, 1.0], sod: [1.0, .50, .15], led: [.03, .02, .05], amb: [.022, .021, .022], gLed: [[.9, .55, .5], [.5, .6, .9], [.9, .8, .6]] },
        'Cold tubes': { tube: [.84, .94, 1.0], sod: [.10, .13, .16], led: [.06, .05, .16], amb: [.018, .023, .030], gLed: [[.8, .5, .6], [.4, .55, .9], [.8, .75, .6]] },
        Sodium: { tube: [1.0, .60, .24], sod: [1.0, .46, .12], led: [.2, .07, .02], amb: [.035, .022, .012], gLed: [[1, .4, .2], [1, .6, .25], [1, .75, .45]] },
        'Blue LEDs': { tube: [.30, .44, 1.0], sod: [.14, .22, .7], led: [.3, .06, .7], amb: [.012, .016, .045], gLed: [[.7, .25, .8], [.2, .5, 1], [.6, .35, .9]] } }[tLight];
      const flip = tSeat === 'Right seat';
      const cab = { Saloon: { dash: .935, hx: .20, hh: .075, lean: .15, mir: [.86, .062, .19, .052], wheel: [.15, 1.385, .49, .040], led: [.53, .972] },
        Van: { dash: .962, hx: .24, hh: .045, lean: .075, mir: [.72, .03, .20, .05], wheel: [.2, 1.47, .53, .036], led: [.58, .985] },
        'Low coupe': { dash: .885, hx: .22, hh: .095, lean: .25, mir: [.88, .115, .17, .045], wheel: [.2, 1.28, .445, .042], led: [.56, .94] } }[tCabin];
      const fx = x => flip ? 1 - x : x;
      // blades: pivot and reach in glass units, rest angle with y down
      const K = 1.12, restL = -PI + .135, sweep = 1.92;
      const blades = tArms === 'Tandem' ? [{ p: [.93, .925], r0: .17, r1: .90, b: restL, sg: 1 }, { p: [.47, .955], r0: .10, r1: .53, b: restL, sg: 1 }]
        : tArms === 'Opposed' ? [{ p: [.97, .95], r0: .17, r1: .84, b: restL, sg: 1 }, { p: [.03, .96], r0: .17, r1: .62, b: -.075, sg: -1 }]
          : [{ p: [.58, 1.0], r0: .10, r1: .88, b: restL, sg: 1, big: 1 }, { p: [0, 0], r0: 0, r1: 0, b: 0, sg: 1 }];
      if (tArms === 'Single arm') blades[0].sweepK = 1.5;
      if (flip) for (const b of blades) { b.p[0] = 1 - b.p[0]; b.b = PI - b.b; b.sg = -b.sg; }
      const maxSweep = tArms === 'Single arm' ? 2.75 : sweep;
      const resid = { 'New rubber': .004, 'Worn rubber': .02, 'Perished rubber': .055 }[tBlade];
      const chatter = { 'New rubber': .0, 'Worn rubber': .012, 'Perished rubber': .04 }[tBlade];
      const beadUpMax = tGlass === 'Bare' ? .35 : 1;
      // cloth that reads: blue felt a wet mid-blue (OKLCH chroma .12), charcoal a warm dark grey with one finger in four lime
      const clothCols = { 'Blue felt': [[.05, .14, .42], [.06, .12, .30]], 'Red and grey': [[.20, .05, .055], [.07, .07, .08]], 'Charcoal': [[.11, .10, .10], [.16, .22, .04]], 'Touchless': [[0, 0, 0], [0, 0, 0]] }[tCloth];
      const hasRollers = tCloth !== 'Touchless';
      const covMap = { Heavy: .46, Thin: .34, Drowned: 1.25 }[tLather];
      const stripeF = 1.25 + rnd() * .9, stripeP = rnd(), seed = rnd();
      const mobK = tFoam === 'Pearl' ? 1.25 : 1.45;
      // where in the wash the photo starts: from a second stream so the rolls above stay put; the home opens as it always did,
      // others may open with the top drum already climbing the glass or with the rinse arch sheeting water down it
      let h2 = h0 ^ 0x5bd1e995; const rnd2 = () => { h2 = (h2 + 0x6D2B79F5) | 0; let z = Math.imul(h2 ^ (h2 >>> 15), 1 | h2); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
      const sr = rnd2(), sj = rnd2();
      // a third stream (n12) deals the opening among the start and rinse mints, the lather's form and the view, so sr, sj and the
      // rolls above keep their values: the drum mints and the home open as they did
      let h3 = h0 ^ 0x27d4eb2f; const rnd3 = () => { h3 = (h3 + 0x6D2B79F5) | 0; let z = Math.imul(h3 ^ (h3 >>> 15), 1 | h3); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
      const so = rnd3(), sk = rnd3(), sform = rnd3();
      let tOpen = 'Lathered';
      if (!home) {
        if (sr < .3 && hasRollers) tOpen = 'Drum on the glass';
        else if (sr > .78) tOpen = so < .43 ? 'Rinse arch' : 'Sheeting';
        else tOpen = so < .356 ? 'Lathered' : so < .554 ? 'Foam arch' : so < .693 ? (hasRollers ? 'Wrap brush' : 'Foam arch') : so < .851 ? 'Beaded' : 'Under the dryers';
      }
      const form = tOpen !== 'Lathered' || home || tLather === 'Drowned' ? 0 : sform < .4 ? 0 : sform < .75 ? 1 : 2;
      // where in the wash the photo starts (the clock at the gallery's moment is phase0 + 4), with the glass already in that state
      let phase0 = home ? -9 : -10 + 3 * sj, covInit = covMap, wetInit = 0, formInit = form, wetFlag = 0;
      if (tOpen === 'Drum on the glass') phase0 = 9.5 + 2.5 * sj;
      else if (tOpen === 'Rinse arch') { phase0 = 42.4 + 1.2 * sj; covInit = covMap * .35; wetFlag = 1; }
      else if (tOpen === 'Foam arch') { phase0 = 23.2 + sk; covInit = .4 + .06 * sk; formInit = 1; wetInit = .05; }
      else if (tOpen === 'Wrap brush') { phase0 = 30 + 4 * sk; covInit = Math.max(covMap, .62); wetInit = .02; }
      else if (tOpen === 'Sheeting') { phase0 = 47 + 3 * sk; covInit = .06; wetInit = .32; wetFlag = 1; }
      else if (tOpen === 'Beaded') { phase0 = 56 + 4 * sk; covInit = -1; wetInit = .022; }
      else if (tOpen === 'Under the dryers') { phase0 = 64 + 4 * sk; covInit = -1; wetInit = .022; }
      T('Lather', tLather + ['', ', slumped', ', in lanes'][form]); T('Opens on', tOpen);
    return out;
  },
});
// ==== end roll ====

// ==== roll 225 ====
ProtoRolls.add(225, {
  traits: {"Bob":{"look":true,"values":{"Turned Drum":407378,"Waisted":243032,"Brass Ball":203061,"Flywheel":81548,"Four Arm Cross":64981}},"Weights":{"values":{"Hex Nuts":543579,"Knurled":325403,"Ball Weights":131018}},"Finish":{"values":{"Old Brass":542890,"Bright Lacquer":271782,"Nickel Plate":108812,"Verdigris":76516}},"Spring":{"look":true,"values":{"Right-Hand Steel":417400,"Left-Hand Steel":311541,"Blued Steel":166787,"Phosphor Bronze":104272}},"Exchange":{"values":{"Moderate":526363,"Slow":263348,"Quick":210289}},"Tuning":{"values":{"In Tune":600101,"A Little Off":299646,"Far Off":100253}},"Cabinet":{"look":true,"values":{"Sage Paint":296849,"Cream Paint":222758,"Bare Oak":148018,"Slate Paint":147893,"Black Velvet":50819,"Sage Paint, along the wall":45187,"Cream Paint, along the wall":34351,"Slate Paint, along the wall":22625,"Bare Oak, along the wall":22587,"Black Velvet, along the wall":8913}},"Light":{"values":{"North Window":646517,"Night Lamp":161310,"Evening Sun":106174,"Magnesium Flash":85999}},"Exposure":{"values":{"Short":938688,"Time Exposure":61312}},"View":{"values":{"At the bob":745595,"The whole instrument":133945,"From above":120460}}},
  roll(hash) {
    const HOME = '0x7bed7cd50f12d764f2373f0507010a58a1d30a8ce6bad3849abb5a58462051df';
    const home = hash === HOME;
    const fnv = s0 => { let h = s0; for (let i = 2; i < hash.length; i++) { h ^= hash.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h; };
    let hs = fnv(0x811c9dc5 ^ 225225);
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
    let bobS = pick([['Turned Drum', 5], ['Waisted', 3], ['Brass Ball', 2.5], ['Flywheel', 1], ['Four Arm Cross', .8]]);
    let weight = pick([['Hex Nuts', 5], ['Knurled', 3], ['Ball Weights', 1.2]]);
    let finish = pick([['Old Brass', 5], ['Bright Lacquer', 2.5], ['Nickel Plate', 1], ['Verdigris', .7]]);
    let spr = pick([['Right-Hand Steel', 4], ['Left-Hand Steel', 3], ['Blued Steel', 1.6], ['Phosphor Bronze', 1]]);
    let exch = pick([['Moderate', 5], ['Slow', 2.5], ['Quick', 2]]);
    let tune = pick([['In Tune', 6], ['A Little Off', 3], ['Far Off', 1]]);
    let cab = pick([['Sage Paint', 4], ['Cream Paint', 3], ['Slate Paint', 2], ['Bare Oak', 2], ['Black Velvet', .7]]);
    let lightT = pick([['North Window', 7], ['Night Lamp', 1.5], ['Magnesium Flash', .8]]);
    let expo = pick([['Short', 8], ['Time Exposure', 1]]);
    if (home) { bobS = 'Turned Drum'; weight = 'Hex Nuts'; finish = 'Old Brass'; spr = 'Right-Hand Steel'; exch = 'Moderate'; tune = 'In Tune'; cab = 'Sage Paint'; lightT = 'North Window'; expo = 'Short'; }
    let hw = fnv(0x7a414620 ^ 225);
    const rw = () => { hw = hw + 0x6D2B79F5 | 0; let t = Math.imul(hw ^ hw >>> 15, 1 | hw); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vR = rw(), sR = rw();
    let view = home || vR < .72 ? 'At the bob' : vR < .88 ? 'The whole instrument' : 'From above';
    if (view === 'The whole instrument' && lightT === 'Night Lamp') view = 'At the bob';
    if (!home && lightT === 'North Window' && sR < .15 && cab !== 'Black Velvet') lightT = 'Evening Sun';
    const whole = view === 'The whole instrument', above = view === 'From above', sun = lightT === 'Evening Sun';
    const hv = fnv(0x9e3779b9 ^ 225);
    const viewR = (((hv ^ hv >>> 13) >>> 0) % 10007) / 10007;
    const raking = !home && viewR < 0.2 && view === 'At the bob' && !sun;
    if (expo === 'Time Exposure' && (tune === 'Far Off' || raking || whole || above)) expo = 'Short';
    return [['Bob', bobS], ['Weights', weight], ['Finish', finish], ['Spring', spr], ['Exchange', exch], ['Tuning', tune],
      ['Cabinet', raking ? cab + ', along the wall' : cab], ['Light', lightT], ['Exposure', expo], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 233 ====
ProtoRolls.add(233, {
  traits: {"Board":{"look":true,"values":{"Birch":480452,"Teak":240008,"Satinwood":199525,"Rosewood inlay":80015}},"Coins":{"look":true,"values":{"Boxwood and ebony":479994,"Bone and rosewood":259409,"Lacquered":200520,"Odd set":60077}},"Striker":{"look":true,"values":{"Ivory white":499953,"Turned wood":279994,"Grey stone":150097,"Old bakelite":69956}},"Powder":{"look":true,"values":{"Light dusting":480131,"Heavy":299348,"Fresh drift":160832,"Damp":59689}},"Lamp":{"look":true,"values":{"Bare bulb":459284,"Enamel shade":280869,"Tin cone":200050,"Low and swinging":59797}},"View":{"look":true,"values":{"Striker's eye":479588,"Leaning in":300927,"Across the corner":219485}},"Game":{"look":true,"values":{"Fresh rack":460051,"Mid game":360550,"Endgame":179399}},"Wear":{"values":{"Played":500564,"Well loved":339842,"Ancient":159594}},"Wall":{"look":true,"values":{"Limewash":441274,"Green distemper":239413,"Ochre":199397,"Indigo wash":119916}}},
  roll(hash) {
    const HOME = '0x92166d680c2a109dc945b332b2f3d89c32f3303bd7ada2b5cce0d8b520daf7ca';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME, out = [];
    let hs = 0x811c9dc5; for (let i = 2; i < hash.length; i++) hs = Math.imul(hs ^ hash.charCodeAt(i), 16777619) >>> 0;
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (name, opts, hv) => { let r = rnd(), tot = 0; if (home && hv) { out.push([name, hv]); return hv; } for (const o of opts) tot += o[1]; r *= tot; for (const o of opts) { r -= o[1]; if (r <= 0) { out.push([name, o[0]]); return o[0]; } } const l = opts[opts.length - 1][0]; out.push([name, l]); return l; };
    pick('Board', [['Birch', 48], ['Teak', 24], ['Satinwood', 20], ['Rosewood inlay', 8]], 'Birch');
    pick('Coins', [['Boxwood and ebony', 48], ['Bone and rosewood', 26], ['Lacquered', 20], ['Odd set', 6]], 'Boxwood and ebony');
    pick('Striker', [['Ivory white', 50], ['Turned wood', 28], ['Grey stone', 15], ['Old bakelite', 7]], 'Ivory white');
    pick('Powder', [['Light dusting', 48], ['Heavy', 30], ['Fresh drift', 16], ['Damp', 6]], 'Light dusting');
    pick('Lamp', [['Bare bulb', 46], ['Enamel shade', 28], ['Tin cone', 20], ['Low and swinging', 6]], 'Bare bulb');
    pick('View', [["Striker's eye", 48], ['Leaning in', 30], ['Across the corner', 22]], "Striker's eye");
    pick('Game', [['Fresh rack', 46], ['Mid game', 36], ['Endgame', 18]], 'Fresh rack');
    pick('Wear', [['Played', 50], ['Well loved', 34], ['Ancient', 16]], 'Well loved');
    let h2 = 0x9e3779b9; for (let i = 2; i < hash.length; i++) h2 = Math.imul(h2 ^ hash.charCodeAt(i), 0x85ebca6b) >>> 0;
    const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r = R2(), wall = home ? 'Limewash' : r < .44 ? 'Limewash' : r < .68 ? 'Green distemper' : r < .88 ? 'Ochre' : 'Indigo wash';
    out.push(['Wall', wall]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 237 ====
ProtoRolls.add(237, {
  traits: {"Phosphor":{"values":{"green P43":601013,"white P45":398987}},"Sky":{"look":true,"values":{"summer core":400040,"winter band":197543,"moonlit, clouds":160176,"winter band, zodiacal light":101708,"summer core, airglow bands":100346,"moonlit, clouds, airglow bands":40187}},"Foreground":{"look":true,"values":{"forest treeline":356606,"mountain ridge":286164,"open horizon, town glow":178063,"forest treeline, ground mist":119391,"open horizon, town glow, ground mist":59776}},"Tube":{"values":{"crisp":632207,"old, grainy, blemished":367793}},"Planet":{"look":true,"values":{"Jupiter":435046,"Mars":216975,"Saturn":174230,"Venus":173749}},"Satellites":{"values":{"a few":599678,"busy":300727,"Starlink train":99595}},"Aurora":{"values":{"none":899827,"aurora":100173}},"Meteors":{"values":{"sporadic":667122,"shower":221876,"fireball":111002}},"Aim":{"values":{"level":601030,"tilted":278815,"steeply tilted":120155}},"Band":{"look":true,"values":{"leaning right":299262,"leaning left":249789,"standing":200474,"low arch":150610,"overhead":99865}},"Standing":{"look":true,"values":{"back in the meadow":297726,"level view":262753,"under the trees":178271,"horizon low":130759,"horizon high":130491}},"Wood":{"look":true,"values":{"spruce on the crest":286164,"spruce":166924,"hedgerows":119182,"pine":95515,"mixed edge":94967,"hardwood":83125,"a shelterbelt":54351,"a field oak":45084,"hardwood, bare":35466,"a bare field oak":19222}}},
  roll(hash) {
    const HOME = '0x9629e12ee1659055268f9fa288deb83859dc97f14f833d0241258c23debb0450';
    const home = hash === HOME, out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const hx = hash.slice(2);
    const mkR = (o) => {
      let s0 = parseInt(hx.slice(o, o + 8), 16) | 0, s1 = parseInt(hx.slice(o + 8, o + 16), 16) | 0, s2 = parseInt(hx.slice(o + 16, o + 24), 16) | 0, s3 = parseInt(hx.slice(o + 24, o + 32), 16) | 0;
      const f = () => { s0 |= 0; s1 |= 0; s2 |= 0; s3 |= 0; const t = (s0 + s1 | 0) + s3 | 0; s3 = s3 + 1 | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) f();
      return f;
    };
    const rnd = mkR(0);
    const pick = (name, opts) => { let tot = 0; for (const o of opts) tot += o[1]; let u = rnd() * tot; for (const o of opts) { u -= o[1]; if (u <= 0) return T(name, o[0]); } return T(name, opts[0][0]); };
    const PHO = home ? T('Phosphor', 'green P43') : pick('Phosphor', [['green P43', 6], ['white P45', 4]]);
    const SKY = home ? T('Sky', 'summer core') : pick('Sky', [['summer core', 5], ['winter band', 3], ['moonlit, clouds', 2]]);
    const FG = home ? T('Foreground', 'forest treeline') : pick('Foreground', [['forest treeline', 5], ['mountain ridge', 3], ['open horizon, town glow', 2.5]]);
    home ? T('Tube', 'crisp') : pick('Tube', [['crisp', 6], ['old, grainy, blemished', 3.5]]);
    home ? T('Planet', 'Jupiter') : pick('Planet', [['Jupiter', 5], ['Venus', 2], ['Mars', 2.5], ['Saturn', 2]]);
    home ? T('Satellites', 'a few') : pick('Satellites', [['a few', 6], ['busy', 3], ['Starlink train', 1]]);
    home ? T('Aurora', 'none') : pick('Aurora', [['none', 9], ['aurora', 1]]);
    home ? T('Meteors', 'sporadic') : pick('Meteors', [['sporadic', 6], ['shower', 2], ['fireball', 1]]);
    const rA = mkR(24), aU = rA();
    T('Aim', home ? 'level' : aU < 0.6 ? 'level' : aU < 0.88 ? 'tilted' : 'steeply tilted');
    const WINTER = SKY[0] === 'w';
    const rX = mkR(4), x1 = rX(), x2 = rX();
    const ZOD = !home && WINTER && x1 < 0.34, AGB = !home && !WINTER && x1 < 0.2, MIST = !home && FG[0] !== 'm' && x2 < 0.25;
    if (ZOD) T('Sky', SKY + ', zodiacal light'); if (AGB) T('Sky', SKY + ', airglow bands'); if (MIST) T('Foreground', FG + ', ground mist');
    const FGK = FG[0] === 'f' ? 0 : FG[0] === 'm' ? 1 : 2;
    const rN = mkR(12), n1 = rN(), n2 = rN(), n3 = rN();
    T('Band', home || n1 < 0.3 ? 'leaning right' : n1 < 0.55 ? 'leaning left' : n1 < 0.75 ? 'standing' : n1 < 0.9 ? 'low arch' : 'overhead');
    T('Standing', FGK === 0 ? (home || n2 < 0.625 ? 'back in the meadow' : 'under the trees') : n2 < 0.5 ? 'level view' : n2 < 0.75 ? 'horizon low' : 'horizon high');
    T('Wood', FGK === 0 ? (home || n3 < 0.35 ? 'spruce' : n3 < 0.55 ? 'pine' : n3 < 0.8 ? (WINTER ? 'hardwood, bare' : 'hardwood') : 'mixed edge')
      : FGK === 2 ? (n3 < 0.27 ? (WINTER ? 'a bare field oak' : 'a field oak') : n3 < 0.5 ? 'a shelterbelt' : 'hedgerows') : 'spruce on the crest');
    return out;
  },
});
// ==== end roll ====

// ==== roll 254 ====
ProtoRolls.add(254, {
  traits: {"Gap":{"look":true,"values":{"Board Gap":358012,"Shrunk Slats":230091,"Slipped Slate":192296,"Nail Holes":129899,"Split Board":57731,"Knot Hole":31971}},"Sun":{"look":true,"values":{"Morning":349883,"High Noon":201253,"Low Evening":139814,"Late Gold":93769,"Morning, looking up the shaft":66877,"Full Moon":51028,"High Noon, looking up the shaft":38045,"Winter Low":26689,"Late Gold, looking up the shaft":17875,"Full Moon, looking up the shaft":9698,"Winter Low, looking up the shaft":5069}},"Dust":{"look":true,"values":{"Lived In":459768,"Neglected":340070,"Just Swept":139988,"A Century":60174}},"Floor":{"look":true,"values":{"Trunk And Bottles":218273,"Chair And Books":189203,"Crates":188781,"Chimney Breast":99286,"Rolled Rugs":94375,"Water Tank":87064,"Tea Chests":86752,"Bare Boards":36266}},"Air":{"values":{"Faint Draught":500188,"Still":220395,"Through Draught":219268,"Gusting Eaves":60149}},"Timber":{"look":true,"values":{"Oak Pegged":440563,"Pine Rafters":339179,"Tarred Black":149702,"Lime Washed":70556}},"Webs":{"values":{"Old Threads":599736,"A Few Threads":319891,"Shrouded":80373}},"Motes":{"look":true,"values":{"Wool Lint":459439,"Soot And Skin":320223,"Hay Chaff":170231,"Feather Down":50107}},"Sky":{"values":{"Clear":718933,"Passing Cloud":220341,"Clear night":60726}},"Reach":{"values":{"Low gap":791648,"By the ridge":208352}},"Standing":{"values":{"Beside the shaft":724791,"Down the attic":137645,"Up the shaft":137564}}},
  roll(hash) {
    const HOME = '0xc1e3384b0652e27cf6aa12c6c561bdb90cbfe8be760f188438164021778b277f';   // hashFor(253, 0)
    const H = hash === HOME, MOON_P = .09;
    // the art's pick: a forced (home) value draws nothing
    const pick = (rng, list, forced) => {
      if (forced !== undefined) return list[forced][0];
      let w = 0; for (const l of list) w += l[1];
      let r = rng() * w;
      for (const l of list) { r -= l[1]; if (r <= 0) return l[0]; }
      return list[0][0];
    };
    let seed = 2166136261 | 0;
    for (let i = 2; i < hash.length; i++) { seed = Math.imul(seed ^ parseInt(hash[i], 16), 16777619); seed ^= seed >>> 13; }
    let s = seed >>> 0;
    const rng = () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 9; i++) rng();
    let gap = pick(rng, [['Board Gap', 56], ['Slipped Slate', 30], ['Split Board', 9], ['Knot Hole', 5]], H ? 0 : undefined);
    let s2 = (Math.imul(seed ^ 0x2c1b3c6d, 0x297a2d39) ^ 0x51ed27) >>> 0;
    const rng2 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const g2 = rng2();
    if (!H && g2 < .36) gap = g2 < .23 ? 'Shrunk Slats' : 'Nail Holes';
    let sun = pick(rng, [['Morning', 52], ['High Noon', 30], ['Late Gold', 14], ['Winter Low', 4]], H ? 0 : undefined);
    const dust = pick(rng, [['Lived In', 46], ['Neglected', 34], ['Just Swept', 14], ['A Century', 6]], H ? 1 : undefined);
    const hoard0 = pick(rng, [['Trunk And Bottles', 30], ['Crates', 26], ['Chair And Books', 26], ['Rolled Rugs', 13], ['Bare Boards', 5]], H ? 0 : undefined);
    const air = pick(rng, [['Faint Draught', 50], ['Still', 22], ['Through Draught', 22], ['Gusting Eaves', 6]], H ? 0 : undefined);
    const wood = pick(rng, [['Oak Pegged', 44], ['Pine Rafters', 34], ['Tarred Black', 15], ['Lime Washed', 7]], H ? 0 : undefined);
    const webs = pick(rng, [['Old Threads', 60], ['A Few Threads', 32], ['Shrouded', 8]], H ? 0 : undefined);
    const lint = pick(rng, [['Wool Lint', 46], ['Soot And Skin', 32], ['Hay Chaff', 17], ['Feather Down', 5]], H ? 0 : undefined);
    const weather = pick(rng, [['Clear', 78], ['Passing Cloud', 22]], H ? 0 : undefined);
    const sr2 = rng2();
    if (!H && sr2 < .14) sun = 'Low Evening';
    const vu = rng2();
    const upV = !H && sun !== 'Low Evening' && vu < .16;
    let s3 = (Math.imul(seed ^ 0x6a09e696, 0x2f6b4c3d) ^ 0x3c6ef3) >>> 0;
    const rng3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r3 = []; for (let i = 0; i < 12; i++) r3.push(rng3());
    const r3b0 = rng3();   // the first of the 20 spare draws (the art reads only r3b[0] for traits)
    let s4 = (Math.imul(seed ^ 0x1f83d9ab, 0x3243f6a9) ^ 0x7f4a7c) >>> 0;
    const r4a = (() => { s4 = s4 + 0x6D2B79F5 | 0; let t = Math.imul(s4 ^ s4 >>> 15, 1 | s4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })();
    const ridgeG = !H && !upV && (sun === 'Morning' || sun === 'High Noon' || sun === 'Late Gold') && r3[1] < .3;
    const down = !H && !upV && sun !== 'Low Evening' && r3[6] < .19;
    const chim = !H && !upV && !down && sun !== 'Low Evening' && r3[7] < .17;
    const moon = !H && weather === 'Clear' && sun !== 'Low Evening' && r4a < MOON_P;
    const big = !H && !upV && !chim && sun !== 'Low Evening' ? (r3b0 < .14 ? 'Water Tank' : r3b0 > .86 ? 'Tea Chests' : '') : '';
    const hoard = chim ? 'Chimney Breast' : big || hoard0;
    return [
      ['Gap', gap], ['Sun', (moon ? 'Full Moon' : sun) + (upV ? ', looking up the shaft' : '')], ['Dust', dust], ['Floor', hoard],
      ['Air', air], ['Timber', wood], ['Webs', webs], ['Motes', lint], ['Sky', moon ? 'Clear night' : weather],
      ['Reach', ridgeG ? 'By the ridge' : 'Low gap'],
      ['Standing', down ? 'Down the attic' : upV ? 'Up the shaft' : 'Beside the shaft'],
    ];
  },
});
// ==== end roll ====

// ==== roll 255 ====
ProtoRolls.add(255, {
  traits: {"Light":{"look":true,"values":{"Low sun":450201,"Golden hour":280300,"Misty morning":189484,"Last light":80015}},"String":{"look":true,"values":{"Cotton string":450134,"Garden twine":269254,"Bootlace":200316,"Red wool":80296}},"Your conker":{"look":true,"values":{"Round":207906,"Flat-sided":155859,"Round, at the strike":132404,"Big scar":109226,"Flat-sided, at the strike":100184,"Big scar, at the strike":69863,"Seasoned":51293,"Seasoned, at the strike":32739,"Round, drawn back":23936,"Round, fresh from the husk":20107,"Flat-sided, drawn back":18135,"Flat-sided, fresh from the husk":15032,"Round, fresh from the husk, at the strike":12734,"Big scar, drawn back":12717,"Big scar, fresh from the husk":10538,"Flat-sided, fresh from the husk, at the strike":9533,"Big scar, fresh from the husk, at the strike":6628,"Seasoned, drawn back":5895,"Round, fresh from the husk, drawn back":2334,"Flat-sided, fresh from the husk, drawn back":1744,"Big scar, fresh from the husk, drawn back":1193}},"Their conker":{"look":true,"values":{"Round":340000,"Lopsided":285711,"Pale":210813,"Cheesecutter":80232,"Round, fresh from the husk":40047,"Lopsided, fresh from the husk":33746,"Cheesecutter, fresh from the husk":9451}},"Ground":{"look":true,"values":{"Chestnut leaves":393567,"Husks and conkers":305134,"After rain":125277,"Playground":104755,"Frost":71267}},"Battle scars":{"values":{"Fresh pair":549927,"Veteran":350342,"Grudge match":99731}},"Opponent":{"look":true,"values":{"Gentle":499818,"Steady":360577,"Wild":139605}},"Lens":{"look":true,"values":{"Macro":395265,"Close":235136,"Portrait":140599,"Long":128699,"Stand back":100301}},"Angle":{"look":true,"values":{"Three-quarter":378815,"Down the line":225956,"Low":173874,"Under the crown":129205,"From above":92150}}},
  roll(hash) {
    const HOME = '0xa3ba92362ce6f21ceb933598337719e9f97ebcc7523a297707f55d259eaa60b8';
    const c = { hash, home: hash === HOME };
    let hs = 0x811c9dc5 | 0;
    for (let i = 2; i < c.hash.length; i++) hs = Math.imul(hs ^ c.hash.charCodeAt(i), 16777619);
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let hs2 = (hs ^ 0x5bd1e995) | 0;
    const R2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (a) => { let s = 0; for (const x of a) s += x[1]; let u = R() * s; for (const x of a) { u -= x[1]; if (u <= 0) return x[0]; } return a[0][0]; };
    // ---------- traits ----------
    let light = pick([['Low sun', 45], ['Golden hour', 28], ['Misty morning', 19], ['Last light', 8]]);
    let strN = pick([['Cotton string', 45], ['Garden twine', 27], ['Bootlace', 20], ['Red wool', 8]]);
    let mineN = pick([['Round', 40], ['Flat-sided', 30], ['Big scar', 21], ['Seasoned', 9]]);
    let theirN = pick([['Round', 38], ['Lopsided', 32], ['Pale', 21], ['Cheesecutter', 9]]);
    let groundN = pick([['Chestnut leaves', 44], ['Husks and conkers', 34], ['After rain', 14], ['Frost', 8]]);
    let scarsN = pick([['Fresh pair', 55], ['Veteran', 35], ['Grudge match', 10]]);
    let oppN = pick([['Gentle', 50], ['Steady', 36], ['Wild', 14]]);
    let lensN = pick([['Macro', 52], ['Close', 31], ['Long', 17]]);
    if (c.home) { light = 'Low sun'; strN = 'Cotton string'; mineN = 'Round'; theirN = 'Lopsided'; groundN = 'Husks and conkers'; scarsN = 'Veteran'; oppN = 'Gentle'; lensN = 'Macro'; }
    // the stage of the first swing in the opening: its own hash stream (no other roll moves); the home waits as before
    let hs4 = 0x5bd1e995 | 0;
    for (let i = 2; i < c.hash.length; i++) hs4 = Math.imul(hs4 ^ c.hash.charCodeAt(i), 0x01000193) ^ (hs4 >>> 13);
    const R4 = () => { hs4 = hs4 + 0x6D2B79F5 | 0; let t = Math.imul(hs4 ^ hs4 >>> 15, 1 | hs4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let stageN = (() => { const a = [['', 50], ['at the strike', 34], ['drawn back', 16]]; let u = R4() * 100; for (const x of a) { u -= x[1]; if (u <= 0) return x[0]; } return a[0][0]; })();
    if (stageN === 'drawn back' && lensN === 'Macro') stageN = 'at the strike'; // a macro would lose the drawn-back conker off the frame edge
    if (c.home) stageN = '';
    // where the camera stands: its own hash stream, so the rolls above never shift
    let hs3 = 0x2f6b9a13 | 0;
    for (let i = 2; i < c.hash.length; i++) hs3 = Math.imul(hs3 ^ c.hash.charCodeAt(i), 0x01000193) ^ (hs3 >>> 11);
    const R3 = () => { hs3 = hs3 + 0x6D2B79F5 | 0; let t = Math.imul(hs3 ^ hs3 >>> 15, 1 | hs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let angN = (() => { const a = [['Three-quarter', 46], ['Down the line', 24], ['Low', 18], ['From above', 12]]; let u = R3() * 100; for (const x of a) { u -= x[1]; if (u <= 0) return x[0]; } return a[0][0]; })();
    if (c.home) angN = 'Three-quarter';
    const lensO = lensN, angO = angN, groundO = groundN;
    // the variety round's draws (a portrait, the stood-back view, the crown overhead, the playground): a sixth stream,
    // one draw each, so every old roll stays; a value not drawn keeps the old one. The home never reads it.
    let hs6 = 0x510e527f | 0;
    for (let i = 2; i < c.hash.length; i++) hs6 = Math.imul(hs6 ^ c.hash.charCodeAt(i), 0x01000193) ^ (hs6 >>> 10);
    const R6 = () => { hs6 = hs6 + 0x6D2B79F5 | 0; let t = Math.imul(hs6 ^ hs6 >>> 15, 1 | hs6); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    { const uL = R6() * 100, uA = R6() * 100, uG = R6() * 100;
      if (!c.home) {
        if (uL < 14) lensN = 'Portrait'; else if (uL < 24) lensN = 'Stand back';
        // the crown overhead: not from the stood-back eye (the hands would show) nor the portrait's
        if (uA < 12 && lensN !== 'Stand back' && lensN !== 'Portrait' && light !== 'Misty morning') angN = 'Under the crown'; // in mist the crown was a grey blur
        if (lensN === 'Stand back' && angN === 'From above') angN = 'Three-quarter';
        // the third variety round: the crown a true 12 in 100 (a second band of the same draw, the n12 founder's mint, at
        // 14.1, left out of it), and a quarter of the macro three-quarter mints moved under or along the strings
        if (uA >= 16 && uA < 25 && lensN !== 'Stand back' && lensN !== 'Portrait' && light !== 'Misty morning' && angN !== 'Under the crown') angN = 'Under the crown';
        else if (uA >= 25 && uA < 44 && lensN === 'Macro' && angN === 'Three-quarter') angN = uA < 34.5 ? 'Low' : 'Down the line';
        if (uG < 12 && angN !== 'Under the crown') groundN = 'Playground';
      } }
    // the third variety round ("more variety"): each conker its own size, age and eye, from a seventh stream. About half
    // the pairs are a big one against a little one (1.2 to 1.7 times across); the rest near equal, all sizes 1.15 to
    // 1.95. A coat is fresh and red, as it always was, or old, dull and dimpled, and half the pairs are one fresh against
    // one old. The home never reads it.
    // R7-BEGIN
    let hs7 = 0xc402fcb4 | 0; // chosen so the n12 founder's mint (0xdcfd87e5...) draws its pair as it was
    for (let i = 2; i < c.hash.length; i++) hs7 = Math.imul(hs7 ^ c.hash.charCodeAt(i), 0x01000193) ^ (hs7 >>> 14);
    const R7 = () => { hs7 = hs7 + 0x6D2B79F5 | 0; let t = Math.imul(hs7 ^ hs7 >>> 15, 1 | hs7); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    // one conker's own numbers (sz: a radius, or a factor on its old one when < 0; age 0 fresh, 1 as it was, 2 old);
    // 'Pale' is never old and 'Seasoned' always is
    const ownOf = (kn, sz, ag) => { const uA = R7(), uD = R7(), uE = R7(), uF = R7();
      let age = ag >= 0 ? ag : uA < 1 / 3 ? 0 : uA < 2 / 3 ? 1 : 2;
      if (kn === 'Seasoned') age = 2; else if (kn === 'Pale' && age === 2) age = 1;
      const dark = age === 0 ? (kn === 'Pale' ? -.7 : -.12 + uD * .12) : age === 2 ? (kn === 'Seasoned' ? .75 : .45) + uD * (kn === 'Seasoned' ? .25 : .35) : null;
      return { sz, age, dark, red: age === 0 && kn !== 'Pale' ? .55 + uD * .45 : 0, gloss: age === 0 ? 1.1 : age === 2 ? .6 - uD * .2 : null, scar: kn === 'Big scar' ? .38 + uE * .09 : .48 + uE * .22, fresh: age === 0 && kn !== 'Pale' && uF < .24 };
    };
    const own = c.home ? null : (() => { const uP = R7(), u1 = R7(), u2 = R7(), u3 = R7(), uC = R7(), uO = R7();
      const sz = uP < .55 ? (u3 < .5 ? [1.68 + u1 * .27, 1.15 + u2 * .25] : [1.15 + u2 * .25, 1.68 + u1 * .27]) : [-(1.15 + u1 * .8) / 1.51, -(1.15 + u1 * .8) / 1.51];
      // one fresh against one old: the old one is yours if yours is seasoned or theirs pale
      const ag = uC < .5 ? (mineN === 'Seasoned' || theirN === 'Pale' || (theirN !== 'Seasoned' && uO < .5) ? [2, 0] : [0, 2]) : [-1, -1];
      return [ownOf(mineN, sz[0], ag[0]), ownOf(theirN, sz[1], ag[1])]; })();
    // R7-END
    if (lensN === 'Portrait') stageN = '';
    return [['Light', light], ['String', strN], ['Your conker', [mineN, own && own[0].fresh ? 'fresh from the husk' : '', stageN].filter(Boolean).join(', ')], ['Their conker', own && own[1].fresh ? theirN + ', fresh from the husk' : theirN],
      ['Ground', groundN], ['Battle scars', scarsN], ['Opponent', oppN], ['Lens', lensN], ['Angle', angN]];
  },
});
// ==== end roll ====

// ==== roll 256 ====
ProtoRolls.add(256, {
  traits: {"Display":{"look":true,"values":{"Herringbone":339544,"Long bands":300730,"Whirls":240463,"Faint veil":119263}},"Foreground":{"look":true,"values":{"Lake":439000,"Bog pools":260023,"Sea coast":201159,"Town shore":99818}},"Sun below":{"look":true,"values":{"North-east":380044,"North-west":379640,"North":240316}},"Twilight":{"look":true,"values":{"Midnight":449725,"Bright night":300159,"Deep twilight":250116}},"Low cloud":{"look":true,"values":{"Clear":399968,"One bank":380519,"Scattered":219513}},"Lens":{"look":true,"values":{"35 mm":470814,"24 mm":280079,"85 mm":249107}},"Visitor":{"values":{"None":840129,"Aurora":90176,"Mesospheric bore":69695}},"Framing":{"look":true,"values":{"Level horizon":459436,"Low horizon":280479,"High horizon":260085}}},
  roll(hash) {
    const HOME = '0x750ea099fdfd3ad16d979610762b9dcfd807d78f1993c94876cbe9709ccd8e09';   // hashFor(255, 0)
    const home = hash === HOME;
    let s0 = 0x256a1c3d;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const out = [];
    out.push(['Display', home ? 'Herringbone' : pick({ Herringbone: 34, 'Long bands': 30, Whirls: 24, 'Faint veil': 12 })]);
    out.push(['Foreground', home ? 'Lake' : pick({ Lake: 44, 'Bog pools': 26, 'Sea coast': 20, 'Town shore': 10 })]);
    out.push(['Sun below', home ? 'North-west' : pick({ 'North-west': 38, North: 24, 'North-east': 38 })]);
    out.push(['Twilight', home ? 'Midnight' : pick({ 'Bright night': 30, Midnight: 45, 'Deep twilight': 25 })]);
    out.push(['Low cloud', home ? 'One bank' : pick({ Clear: 40, 'One bank': 38, Scattered: 22 })]);
    out.push(['Lens', home ? '35 mm' : pick({ '24 mm': 28, '35 mm': 47, '85 mm': 25 })]);
    out.push(['Visitor', home ? 'None' : pick({ None: 84, Aurora: 9, 'Mesospheric bore': 7 })]);
    let s1 = 0x2561f7a3;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    out.push(['Framing', home ? 'Level horizon' : (() => { const r = R2() * 100; return r < 46 ? 'Level horizon' : r < 74 ? 'Low horizon' : 'High horizon'; })()]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 262 ====
ProtoRolls.add(262, {
  traits: {"Scene":{"look":true,"values":{"Town across a field":380433,"Forest road":259817,"Harbour on sea ice":240277,"Industrial site":59806,"Single lamp":59667}},"Lamps":{"look":true,"values":{"Sodium old town":380032,"Mixed":339943,"LED new town":280025}},"Crystal wobble":{"look":true,"values":{"Steady":339522,"Wobbling":280400,"Needles":219966,"Soft flames":160112}},"Crystal layer":{"look":true,"values":{"Low and deep":439622,"Low and thin":280257,"Lifted":280121}},"Moon":{"values":{"No moon":600000,"Moonlit":400000}},"Sky":{"values":{"Clear":779068,"High haze":140693,"Aurora":80239}},"Lens":{"look":true,"values":{"50 mm":439696,"35 mm":300148,"85 mm":260156}},"View":{"values":{"Eye level":579730,"Low horizon":300319,"From a rise":119951}}},
  roll(hash) {
    const HOME = '0x4e1a022ef1ce77adf058c003e057aa8f1b29468eadfd55063fc0e40e93be914c';   // hashFor(261, 0): the site's home print
    const home = hash === HOME;
    let s0 = 0x262b11a7;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const out = [];
    out.push(['Scene', home ? 'Town across a field' : pick({ 'Town across a field': 38, 'Harbour on sea ice': 24, 'Forest road': 26, 'Single lamp': 6, 'Industrial site': 6 })]);
    out.push(['Lamps', home ? 'Mixed' : pick({ 'Sodium old town': 38, Mixed: 34, 'LED new town': 28 })]);
    out.push(['Crystal wobble', home ? 'Steady' : pick({ Needles: 22, Steady: 34, Wobbling: 28, 'Soft flames': 16 })]);
    out.push(['Crystal layer', home ? 'Low and deep' : pick({ 'Low and thin': 28, 'Low and deep': 44, Lifted: 28 })]);
    out.push(['Moon', home ? 'No moon' : pick({ 'No moon': 60, Moonlit: 40 })]);
    out.push(['Sky', home ? 'Clear' : pick({ Clear: 78, 'High haze': 14, Aurora: 8 })]);
    out.push(['Lens', home ? '50 mm' : pick({ '35 mm': 30, '50 mm': 44, '85 mm': 26 })]);
    let s1 = 0x7c1e5a93;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const V = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const viewW = { 'Eye level': 58, 'Low horizon': 30, 'From a rise': 12 };
    let viewN = 'Eye level';
    if (!home) { let r = V() * 100; for (const k in viewW) { r -= viewW[k]; if (r < 0) { viewN = k; break; } } }
    out.push(['View', viewN]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 266 ====
ProtoRolls.add(266, {
  traits: {"Seeds":{"look":true,"values":{"Grey nickernuts":379793,"Mixed nickernuts":240939,"River pebbles":219149,"Red lucky beans":90260,"Cowries":69859}},"Board":{"values":{"Carved plank":779623,"Scooped in the earth":130227,"Cut in rock":90150}},"Wood":{"look":true,"values":{"Iroko, oiled":362324,"None":220377,"Pale, sun-bleached":217075,"Ebonised, worn through":127404,"Red padauk":72820}},"Feet":{"look":true,"values":{"Plinth":467938,"Four feet":311685,"None":220377}},"Table":{"look":true,"values":{"Weathered planks":350750,"Woven mat":256840,"Indigo cloth":172033,"Bare earth":130227,"Rock":90150}},"Light":{"look":true,"values":{"Under a tree":275047,"Low morning sun":259982,"Late golden sun":219923,"Hazy noon":162888,"Through shutters":82160}},"Stage":{"look":true,"values":{"Midgame":424151,"Opening":330584,"Endgame":165292,"Rout":79973}},"Camera":{"look":true,"values":{"Overhead":300094,"Over the near row":165355,"Along the board":154021,"Low at the edge":120025,"From the far store":109570,"From above":93055,"Close on a cup":57880}},"Opponent":{"values":{"Gentle":550518,"Careful":329364,"Sly":120118}}},
  roll(hash) {
    const HOME = '0xd1e17dcfc258181661c754ea0b993ee2f11328f12ec3f6c9f34a135060ac8fc1';   // hashFor(265, 0)
    const home = hash === HOME;
    let hs = 0x811c9dc5 | 0;
    for (let i = 2; i < hash.length; i++) hs = Math.imul(hs ^ hash.charCodeAt(i), 16777619);
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = a => { let s = 0; for (const x of a) s += x[1]; let u = R() * s; for (const x of a) { u -= x[1]; if (u <= 0) return x[0]; } return a[0][0]; };
    let seedT = pick([['Grey nickernuts', 38], ['Mixed nickernuts', 24], ['River pebbles', 22], ['Red lucky beans', 9], ['Cowries', 7]]);
    let woodT = pick([['Iroko, oiled', 40], ['Pale, sun-bleached', 24], ['Ebonised, worn through', 14], ['Red padauk', 8]]);
    let feetT = pick([['Plinth', 6], ['Four feet', 4]]);
    let tableT = pick([['Weathered planks', 45], ['Woven mat', 33], ['Indigo cloth', 22]]);
    let lightT = pick([['Low morning sun', 38], ['Late golden sun', 32], ['Hazy noon', 18], ['Through shutters', 12]]);
    let stageT = pick([['Opening', 36], ['Midgame', 46], ['Endgame', 18]]);
    let camT = pick([['Along the board', 28], ['Over the near row', 30], ['From the far store', 20]]);
    let oppT = pick([['Gentle', 55], ['Careful', 33], ['Sly', 12]]);
    let hs2 = 0x2c1b3c6d | 0;
    for (let i = 2; i < hash.length; i++) hs2 = Math.imul(hs2 ^ hash.charCodeAt(i), 0x5bd1e995) ^ (hs2 >>> 13);
    const R2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    { const u = R2(), v = R2(); if (u < .16) camT = 'From above'; else if (u < .26) camT = 'Close on a cup'; if (v < .08) stageT = 'Rout'; }
    { const u = R2(); if (u < .3) camT = 'Overhead'; else if (u < .42) camT = 'Low at the edge'; }
    let hs5 = 0x510e527f | 0;
    for (let i = 2; i < hash.length; i++) hs5 = Math.imul(hs5 ^ hash.charCodeAt(i), 0x2c1b3c6d) ^ (hs5 >>> 12);
    const R5 = () => { hs5 = hs5 + 0x6D2B79F5 | 0; let t = Math.imul(hs5 ^ hs5 >>> 15, 1 | hs5); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const bu = R5(), tu = R5();
    let boardT = bu < .13 ? 'Scooped in the earth' : bu < .22 ? 'Cut in rock' : 'Carved plank';
    if (home) { seedT = 'Grey nickernuts'; woodT = 'Iroko, oiled'; feetT = 'Plinth'; tableT = 'Weathered planks'; lightT = 'Low morning sun'; stageT = 'Midgame'; camT = 'Along the board'; oppT = 'Gentle'; boardT = 'Carved plank'; }
    const GK = boardT === 'Scooped in the earth' ? 1 : boardT === 'Cut in rock' ? 2 : 0;
    if (!home && (GK ? lightT !== 'Hazy noon' : tableT !== 'Weathered planks' && tu < .22)) lightT = 'Under a tree';
    if (GK) { woodT = 'None'; feetT = 'None'; tableT = GK === 1 ? 'Bare earth' : 'Rock'; }
    return [['Seeds', seedT], ['Board', boardT], ['Wood', woodT], ['Feet', feetT], ['Table', tableT], ['Light', lightT], ['Stage', stageT], ['Camera', camT], ['Opponent', oppT]];
  },
});
// ==== end roll ====

// ==== roll 267 ====
ProtoRolls.add(267, {
  traits: {"Plate":{"look":true,"values":{"Waterfall":400192,"Harbour":220265,"The Pyramids":169355,"The Moon":160301,"Eclipse":49887}},"Mat":{"look":true,"values":{"Oval":399997,"Arch top":339909,"Octagon":260094}},"Tarnish":{"look":true,"values":{"Halo":460352,"Faint":260404,"Heavy":199234,"Peacock":80010}},"Marks":{"look":true,"values":{"Buffing lines":399292,"Wipe marks":300766,"Fingerprint":219750,"Wiped and fingerprinted":80192}},"Case":{"look":true,"values":{"Black morocco":439885,"Brown leather":400538,"Red morocco":99805,"Green morocco":59772}},"Pad":{"look":true,"values":{"Plum velvet":360302,"Crimson velvet":299125,"Moss velvet":219914,"Royal blue velvet":120659}},"Window":{"look":true,"values":{"Sash window":499800,"Leaded casement":340399,"Bay window":159801}},"Toning":{"look":true,"values":{"Untoned":455297,"Gold-toned":454273,"Solarised blue":90430}},"Falls":{"look":true,"values":{"":599808,"Tall fall":135857,"Tiered cascade":119600,"Twin falls":96358,"Thin veil":48377}},"View":{"look":true,"values":{"":599808,"Across the pool":231663,"From the side":168529}},"Place":{"look":true,"values":{"":599808,"Down the valley":87627,"Broad falls":80056,"Gorge":72470,"Slot canyon":64251,"Under the fall":63903,"Rock bowl":31885}}},
  roll(hash) {
    const HOME = '0x564ddc00267ba2a265052c1cafeef856b120b29efdae76a70b81fe585c5023a0';
    const home = hash === HOME, out = [];
    const c = { hash, trait(k, v) { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; } };
    let s0 = 0x267d1a;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const mkR = (seed) => { let s = seed | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR(s0);
    const pickP = (r, o) => { let tot = 0; for (const k in o) tot += o[k]; let x = r() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const pickW = (o) => { let tot = 0; for (const k in o) tot += o[k]; let x = R() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };

    const RQ = mkR(s0 ^ 0x4a7e133e), rq = RQ();
    const plate = c.trait('Plate', home ? 'Waterfall' : rq < 0.4 ? 'Waterfall' : rq < 0.62 ? 'Harbour' : rq < 0.79 ? 'The Pyramids' : rq < 0.95 ? 'The Moon' : 'Eclipse');
    const subj = ['Waterfall', 'The Moon', 'Eclipse', 'Harbour', 'The Pyramids'].indexOf(plate), wf = subj === 0, sjK = 'sj' + subj;
    const tw = (k, v) => wf ? c.trait(k, v) : v;
    const falls = tw('Falls', home ? 'Tall fall' : pickW({ 'Tall fall': 34, 'Tiered cascade': 30, 'Twin falls': 24, 'Thin veil': 12 }));
    const matT = c.trait('Mat', home ? 'Oval' : pickW({ Oval: 40, 'Arch top': 34, Octagon: 26 }));
    const tarn = c.trait('Tarnish', home ? 'Halo' : pickW({ Faint: 26, Halo: 46, Heavy: 20, Peacock: 8 }));
    const marks = c.trait('Marks', home ? 'Buffing lines' : pickW({ 'Buffing lines': 40, 'Wipe marks': 30, Fingerprint: 22, 'Wiped and fingerprinted': 8 }));
    const leath = c.trait('Case', home ? 'Black morocco' : pickW({ 'Black morocco': 44, 'Brown leather': 40, 'Red morocco': 10, 'Green morocco': 6 }));
    const pad = c.trait('Pad', home ? 'Plum velvet' : pickW({ 'Plum velvet': 36, 'Crimson velvet': 30, 'Moss velvet': 22, 'Royal blue velvet': 12 }));
    const winT = c.trait('Window', home ? 'Sash window' : pickW({ 'Sash window': 50, 'Leaded casement': 34, 'Bay window': 16 }));
    const tone0 = pickW({ 'Gold-toned': 50, Untoned: 50 });
    const tone = c.trait('Toning', home ? 'Gold-toned' : mkR(s0 ^ 0x68e31da4)() < 0.09 ? 'Solarised blue' : tone0);
    const RV = mkR(s0 ^ 0x5f3759df);
    const view = tw('View', home ? 'Across the pool' : (RV() < 0.58 ? 'Across the pool' : 'From the side'));
    const viewI = ['Across the pool', 'From the side'].indexOf(view), vSide = RV() < 0.5 ? -1 : 1;
    const RP = mkR(s0 ^ 0x83fba173), rp = RP();
    const place = tw('Place', home ? 'Gorge' : rp < 0.06 ? 'Down the valley' : rp < 0.1 ? 'Broad falls' : rp < 0.28 ? 'Gorge' : rp < 0.36 ? 'Rock bowl' : rp < 0.38 ? 'Slot canyon' : rp < 0.4 ? 'Under the fall' : rp < 0.54 ? 'Slot canyon' : rp < 0.7 ? 'Broad falls' : rp < 0.84 ? 'Under the fall' : 'Down the valley');
    return out;
  },
});
// ==== end roll ====

// ==== roll 273 ====
ProtoRolls.add(273, {
  traits: {"Pans":{"values":{"Mixed":519497,"Small":219709,"Broad":180658,"One giant":80136}},"Pack":{"values":{"Close":520187,"Loose":300062,"Jammed":179751}},"Swell":{"look":true,"values":{"Long":499681,"Crossed":260075,"In sets":150424,"Heavy":89820}},"Grease":{"values":{"Frazil streaks":520463,"Thick slush":279668,"Dark nilas":199869}},"Light":{"values":{"Pink low sun":500163,"Apricot":219527,"Sun on the line":180232,"Afterglow":100078}},"Rims":{"values":{"Crusted":500472,"Soft":239862,"Heavy":179898,"Snow dusted":79768}},"Ice":{"values":{"Clean":839897,"Algae stained":120038,"Blue old ice":40065}},"Air":{"values":{"Clear":660246,"Haze":239374,"Sea smoke":100380}},"Lead":{"look":true,"values":{"None":464173,"Open lead":256003,"Open water":200193,"Two leads":79631}},"View":{"values":{"Low over the ice":747939,"From the rail":252061}}},
  roll(hash) {
    const HOME = '0xc79e724f608b79b5b99aca9d1f087a611bbaaabdda5f20f028f25a776eb3535d';
    const home = hash === HOME;
    const out = [];
    let hs = 0; for (let i = 2; i < hash.length; i++) hs = Math.imul(hs ^ parseInt(hash[i], 16), 0x01000193) + (i * 2654435761 >>> 0) | 0;
    const rnd = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (name, opts, forced) => { let r = rnd(), v = opts[opts.length - 1]; for (const o of opts) { if (r < o[1]) { v = o; break; } r -= o[1]; } if (home && forced) v = opts.find(o => o[0] === forced); out.push([name, v[0]]); return v; };
    pick('Pans', [['Mixed', .52], ['Small', .22], ['Broad', .18], ['One giant', .08]], 'Mixed');
    pick('Pack', [['Close', .52], ['Loose', .3], ['Jammed', .18]], 'Close');
    pick('Swell', [['Long', .5], ['Crossed', .26], ['In sets', .15], ['Heavy', .09]], 'Long');
    pick('Grease', [['Frazil streaks', .52], ['Thick slush', .28], ['Dark nilas', .2]], 'Frazil streaks');
    pick('Light', [['Pink low sun', .5], ['Apricot', .22], ['Sun on the line', .18], ['Afterglow', .1]], 'Pink low sun');
    pick('Rims', [['Crusted', .5], ['Soft', .24], ['Heavy', .18], ['Snow dusted', .08]], 'Crusted');
    pick('Ice', [['Clean', .84], ['Algae stained', .12], ['Blue old ice', .04]], 'Clean');
    const tAir = pick('Air', [['Clear', .66], ['Haze', .24], ['Sea smoke', .1]], 'Clear');
    const smoke = tAir[0] === 'Sea smoke' ? 1 : 0;
    let ls = 0x2b7e1516; for (let i = 2; i < hash.length; i++) ls = Math.imul(ls ^ parseInt(hash[i], 16), 0x5bd1e995) ^ (ls >>> 13);
    const lrnd = () => { ls = Math.imul(ls ^ ls >>> 16, 0x7feb352d); ls = Math.imul(ls ^ ls >>> 15, 0x846ca68b); ls ^= ls >>> 16; return (ls >>> 0) / 4294967296; };
    const lr0 = lrnd();
    const lr1 = lrnd();
    out.push(['Lead', home ? 'None' : lr1 < .2 ? 'Open water' : lr0 < .58 ? 'None' : lr0 < .9 ? 'Open lead' : 'Two leads']);
    let s4 = 0x3c6ef374; for (let i = 2; i < hash.length; i++) s4 = Math.imul(s4 ^ parseInt(hash[i], 16), 0x85ebca6b) + 0x27d4eb2f | 0;
    s4 = s4 + 0x7F4A7C15 | 0; let t = Math.imul(s4 ^ s4 >>> 16, 0x45d9f3b); t = Math.imul(t ^ t >>> 15, 0x2c1b3c6d);
    const n40 = ((t ^ t >>> 15) >>> 0) / 4294967296;
    const rail = !home && n40 < .28 && !smoke;
    out.push(['View', rail ? 'From the rail' : 'Low over the ice']);
    return out;
  },
});
// ==== end roll ====

// ==== roll 276 ====
ProtoRolls.add(276, {
  traits: {"Tiles":{"look":true,"values":{"white subway":316098,"sage zellige":211291,"terracotta":147013,"black hexagon":126281,"blush square":125888,"grey marble":73429}},"Light":{"look":true,"values":{"warm globe":417305,"cool morning":270173,"bare bulb":228716,"candles":83806}},"Towel":{"look":true,"values":{"white":259603,"ochre":200269,"teal":180198,"rust":160553,"charcoal":119677,"none":79700}},"Steam":{"look":true,"values":{"steady":460725,"heavy":299428,"light":239847}},"Old wipe":{"look":true,"values":{"one swipe":340271,"two fingers":220155,"untouched":150200,"porthole":149523,"zigzag":139851}},"Glass":{"look":true,"values":{"clean":499993,"cloth swirls":300334,"ghost doodle":100078,"antique silver":99595}},"Heater":{"values":{"none":879562,"demister pad":120438}},"Framing":{"look":true,"values":{"edge in view":445106,"close":415017,"corner":139877}}},
  roll(hash) {
    const HOME = '0x705da26d8b080cad928a4ee273faf6f6a035a7280a6c1ba27a2cf3cca0372f6b';
    const H = hash === HOME, hx = hash.slice(2);
    let a = parseInt(hx.slice(0, 8), 16) | 0, b = parseInt(hx.slice(8, 16), 16) | 0, cc = parseInt(hx.slice(16, 24), 16) | 0, dd = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { a |= 0; b |= 0; cc |= 0; dd |= 0; const t = (a + b | 0) + dd | 0; dd = dd + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) rnd();
    const pick = (list) => { let s = 0; for (const e of list) s += e[1]; let r = rnd() * s; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; };
    const tileName = H ? 'sage zellige' : pick([['white subway', 30], ['sage zellige', 20], ['terracotta', 14], ['black hexagon', 12], ['blush square', 12], ['grey marble', 7]]);
    const lightName = H ? 'warm globe' : pick([['warm globe', 40], ['cool morning', 26], ['bare bulb', 22], ['candles', 8]]);
    const towelName = H ? 'ochre' : pick([['white', 26], ['ochre', 20], ['teal', 18], ['rust', 16], ['charcoal', 12], ['none', 8]]);
    const steamName = H ? 'steady' : pick([['steady', 46], ['light', 24], ['heavy', 30]]);
    const wipeName = H ? 'one swipe' : pick([['one swipe', 34], ['two fingers', 22], ['porthole', 15], ['zigzag', 14], ['untouched', 15]]);
    const glassName = H ? 'clean' : pick([['clean', 50], ['cloth swirls', 30], ['ghost doodle', 10], ['antique silver', 10]]);
    const heatName = H ? 'none' : pick([['none', 88], ['demister pad', 12]]);
    let frameName = H ? 'edge in view' : pick([['close', 46], ['edge in view', 40], ['corner', 14]]);
    if (glassName === 'antique silver' && frameName === 'close') frameName = 'edge in view';
    return [['Tiles', tileName], ['Light', lightName], ['Towel', towelName], ['Steam', steamName],
      ['Old wipe', wipeName], ['Glass', glassName], ['Heater', heatName], ['Framing', frameName]];
  },
});
// ==== end roll ====

// ==== roll 280 ====
ProtoRolls.add(280, {
  traits: {"Coil":{"values":{"Coiled coil":574348,"Single coil":425652}},"Shape":{"look":true,"values":{"Straight":368519,"Arched":269671,"V bend":129990,"Zigzag":127820,"Sagging":104000}},"Supports":{"look":true,"values":{"One hook":418985,"Two hooks":261454,"None":191741,"Bend hooks":127820}},"Gas":{"look":true,"values":{"Argon":499796,"Krypton":239932,"Nitrogen mix":160083,"Vacuum":100189}},"Glass":{"values":{"Clear":560315,"Seeded":199551,"Amber":160148,"Daylight blue":79986}},"Age":{"values":{"New":520408,"Worn":340151,"Old stock":139441}},"Light":{"look":true,"values":{"North window":428491,"Desk lamp":263505,"Window behind":176327,"Dark room":131677}},"Dimmer":{"look":true,"values":{"Warm":459458,"Low":280612,"Full":259930}},"View":{"look":true,"values":{"Whole filament":320042,"Oblique":270236,"Close":190580,"Side on":162667,"Down the coil":56475}}},
  roll(hash) {
    const HOME = '0x1e2d45620600613e8c9b0b07b355f12771b94eb52cb8543206e651d56acbc0cd';
    const home = hash === HOME, T = [];
    const trait = (n, v) => { const i = T.findIndex(t => t[0] === n); if (i >= 0) T[i][1] = String(v); else T.push([n, String(v)]); return v; };
    let s0 = 0x2c1b3c6d;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const seed0 = s0;
    const mkR = (sd) => { let s = sd | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR(seed0);
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let coilN = trait('Coil', home ? 'Coiled coil' : pick({ 'Coiled coil': 66, 'Single coil': 34 }));
    const R2s = mkR(seed0 ^ 0x5f3759df), vBend = !home && R2s() < .13;
    let shapeN = trait('Shape', home ? 'Straight' : (p => vBend ? 'V bend' : p)(pick({ Straight: 50, Arched: 36, Sagging: 14 })));
    trait('Supports', home ? 'One hook' : pick({ 'One hook': 48, 'Two hooks': 30, None: 22 }));
    trait('Gas', home ? 'Argon' : pick({ Argon: 50, Krypton: 24, 'Nitrogen mix': 16, Vacuum: 10 }));
    trait('Glass', home ? 'Clear' : pick({ Clear: 56, Seeded: 20, Amber: 16, 'Daylight blue': 8 }));
    trait('Age', home ? 'New' : pick({ New: 52, Worn: 34, 'Old stock': 14 }));
    trait('Light', home ? 'North window' : pick({ 'North window': 52, 'Desk lamp': 32, 'Dark room': 16 }));
    trait('Dimmer', home ? 'Warm' : pick({ Warm: 46, Low: 28, Full: 26 }));
    let viewN = home ? 'Oblique' : pick({ Oblique: 54, Close: 32, 'Down the coil': 14 });
    if (!home) { const r = R2s(); if (r < .46 || (vBend && r < .7)) viewN = r < .27 || vBend ? 'Whole filament' : 'Side on'; }
    const R4 = mkR(seed0 ^ 0x71670d43), r4w = R4(), r4z = R4(), r4d = R4();
    const NEW = !home && !(coilN === 'Single coil' && shapeN === 'Arched' && viewN === 'Close');
    const ZIG = NEW && !vBend && r4z < .15, WINB = NEW && r4w < .18;
    if (ZIG) { coilN = trait('Coil', 'Single coil'); shapeN = trait('Shape', 'Zigzag'); trait('Supports', 'Bend hooks'); }
    if (WINB) trait('Light', 'Window behind');
    if (NEW && !ZIG && coilN === 'Coiled coil' && r4d < .03) viewN = 'Down the coil';
    if (coilN === 'Single coil' && viewN === 'Down the coil') viewN = 'Close';
    trait('View', viewN);
    return T;
  },
});
// ==== end roll ====

// ==== roll 296 ====
ProtoRolls.add(296, {
  traits: {"Array":{"look":true,"values":{"Square ranks":430189,"Staggered":214689,"Close-set":154735,"Rings round the magnet":140367,"Scattered by hand":60020}},"Bench":{"look":true,"values":{"Soapstone":400424,"Waxed oak":249056,"Green baize":179879,"Zinc":140536,"Black plate glass":30105}},"Light":{"look":true,"values":{"North window":449554,"Skylight":240194,"One lamp at night":230404,"Flash":79848}},"Magnet":{"values":{"Bar":500189,"Horseshoe":299473,"Steel rod":160691,"Crossed bars":39647}},"Card":{"look":true,"values":{"Ticks":399680,"Rose":360721,"Silvered":189979,"Black dial":49620}},"Needle":{"values":{"Dry pivot":579995,"Heavy":220243,"Spirit-filled":199762}},"Latitude":{"values":{"Middle":680400,"Strong north":160199,"Near the pole":159401}},"Under the bench":{"values":{"Nothing":840406,"Hidden iron":109463,"Reversed needles":50131}},"Lens":{"look":true,"values":{"From above":350101,"Close":324777,"Long":217367,"Low":107755}}},
  roll(hash) {
    const HOME = '0xe95c9f71143e42ec3f776c4ccb0cb706c781b0f768213267dd98058da06d8134';   // hashFor(295, 0), as runtime.js: c.home
    const home = hash === HOME, out = [];
    const trait = (name, v) => { const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return v; };
      let h0 = 0x811c9dc5;
      for (let i = 2; i < hash.length; i++) { h0 ^= hash.charCodeAt(i); h0 = Math.imul(h0, 16777619); }
      const rnd = () => { h0 = h0 + 0x6D2B79F5 | 0; let t = Math.imul(h0 ^ h0 >>> 15, 1 | h0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (name, opts, homeIdx) => {
        let tot = 0; for (const o of opts) tot += o[1];
        let r = rnd() * tot, k = 0;
        while (k < opts.length - 1 && r >= opts[k][1]) { r -= opts[k][1]; k++; }
        if (home) k = homeIdx;
        trait(name, opts[k][0]);
        return k;
      };
      const layout = pick('Array', [['Square ranks', 50], ['Staggered', 25], ['Close-set', 18], ['Scattered by hand', 7]], 0);
      const bench = pick('Bench', [['Soapstone', 40], ['Waxed oak', 25], ['Green baize', 18], ['Zinc', 14], ['Black plate glass', 3]], 0);
      const lightK = pick('Light', [['North window', 45], ['Skylight', 24], ['One lamp at night', 23], ['Flash', 8]], 0);
      const magK = pick('Magnet', [['Bar', 50], ['Horseshoe', 30], ['Steel rod', 16], ['Crossed bars', 4]], 0);
      const cardK = pick('Card', [['Ticks', 40], ['Rose', 36], ['Silvered', 19], ['Black dial', 5]], 0);
      const needK = pick('Needle', [['Dry pivot', 58], ['Heavy', 22], ['Spirit-filled', 20]], 0);
      const earthK = pick('Latitude', [['Middle', 68], ['Strong north', 16], ['Near the pole', 16]], 0);
      const under = pick('Under the bench', [['Nothing', 84], ['Hidden iron', 11], ['Reversed needles', 5]], 0);
      let lens = pick('Lens', [['Close', 50], ['Long', 28], ['Low', 22]], 0);
      let h1 = 0x2f6b9d17; for (let i = 2; i < hash.length; i++) { h1 ^= hash.charCodeAt(i); h1 = Math.imul(h1, 0x01000193); }
      const rnd1 = () => { h1 = h1 + 0x6D2B79F5 | 0; let t = Math.imul(h1 ^ h1 >>> 15, 1 | h1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      if (!home && rnd1() < .16) { lens = 3; trait('Lens', 'From above'); }
      const RING = !home && rnd1() < .14;
      if (RING) { trait('Array', 'Rings round the magnet'); lens = 3; trait('Lens', 'From above'); }
      let h2 = 0x6a09e667; for (let i = 2; i < hash.length; i++) { h2 ^= hash.charCodeAt(i); h2 = Math.imul(h2, 0x01000193); }
      const rnd2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      if (!home && lens !== 3 && rnd2() < .1) { lens = 3; trait('Lens', 'From above'); }
      if (lens === 2 && (under === 1 || earthK === 2)) { lens = 1; trait('Lens', 'Long'); }
      return out;
  },
});
// ==== end roll ====

// ==== roll 317 ====
ProtoRolls.add(317, {
  traits: {"Receptors":{"look":true,"values":{"Mast and Oak":420550,"Lone Oak":200386,"Poplar Row":139731,"Two Masts":139702,"Wind Turbine":99631}},"Distance":{"look":true,"values":{"Middle":450449,"Near":299433,"Far":250118}},"Polarity":{"values":{"Negative":860172,"Positive":139828}},"Strokes":{"look":true,"values":{"Single":380340,"Double":302025,"Triple":214786,"Five":102849}},"Rain":{"look":true,"values":{"Steady":450424,"Light":299391,"Downpour":250185}},"Cloud Base":{"look":true,"values":{"Ragged Scud":399784,"Flat Base":350606,"Rain Shafts":249610}},"Horizon":{"look":true,"values":{"Farm Lights":346424,"Dark Fields":299405,"Last Light":161307,"Town Glow":106076,"City Skyline":86788}},"Ground":{"look":true,"values":{"Flooded Field":353006,"Wet Stubble":352052,"Marsh Pools":175428,"Lake":119514}},"Framing":{"values":{"Low Horizon":500341,"Big Sky":331407,"Wide Field":168252}},"Flash":{"values":{"Downward":940626,"Upward":59374}}},
  roll(hash) {
    const HOME = '0x99b8a998535f2fb8ec138e62b512e05571f7f218143d1acdca9744de19b266b3';
    const home = hash === HOME;
    const hx = hash.slice(2);
    const mkR = (a, b, d, e) => {
      let s0 = a | 0, s1 = b | 0, s2 = d | 0, s3 = e | 0;
      const r = () => { s0 |= 0; s1 |= 0; s2 |= 0; s3 |= 0; const t = (s0 + s1 | 0) + s3 | 0; s3 = s3 + 1 | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) r();
      return r;
    };
    const H = k => parseInt(hx.slice(k * 8, k * 8 + 8), 16) >>> 0;
    const rnd = mkR(H(0), H(1), H(2), H(3));
    const pick = (name, list) => { let r = rnd(), v = list[0]; for (const e of list) { if (r < e[1]) { v = e; break; } r -= e[1]; } return v[0]; };
    let recT = pick('Receptors', [['Mast and Oak', .42], ['Lone Oak', .2], ['Two Masts', .14], ['Poplar Row', .14], ['Wind Turbine', .1]]);
    let distT = pick('Distance', [['Middle', .45], ['Near', .3], ['Far', .25]]);
    let polT = pick('Polarity', [['Negative', .86], ['Positive', .14]]);
    let strT = pick('Strokes', [['Double', .35], ['Single', .28], ['Triple', .25], ['Five', .12]]);
    let rainT = pick('Rain', [['Steady', .45], ['Light', .3], ['Downpour', .25]]);
    let cloudT = pick('Cloud Base', [['Ragged Scud', .4], ['Flat Base', .35], ['Rain Shafts', .25]]);
    let lightT = pick('Horizon', [['Farm Lights', .45], ['Dark Fields', .3], ['Town Glow', .25]]);
    let groundT = pick('Ground', [['Flooded Field', .4], ['Wet Stubble', .4], ['Marsh Pools', .2]]);
    if (home) { recT = 'Mast and Oak'; distT = 'Middle'; polT = 'Negative'; strT = 'Double'; rainT = 'Steady'; cloudT = 'Ragged Scud'; lightT = 'Farm Lights'; groundT = 'Flooded Field'; }
    if (polT === 'Positive') strT = 'Single';
    const rv = mkR(H(5) ^ 0x317A11, H(6), H(7), H(0) ^ 0x9E37);
    let frameT = 'Low Horizon';
    { const a = rv(), b = rv(), l = rv(); rv(); if (!home && l < .12) groundT = 'Lake'; if (!home) { frameT = a < 0.5 ? 'Low Horizon' : a < 0.74 || groundT === 'Wet Stubble' ? 'Big Sky' : 'Wide Field'; if (lightT === 'Town Glow' && b < 0.45) lightT = 'City Skyline'; } }
    const r4 = mkR(H(6) ^ 0x31712, H(3) + 0x5D1, H(1) ^ 0x7E4B, H(5) + 0x2C9);
    const lastLight = !home && r4() < 0.23 && lightT !== 'Dark Fields';
    r4();
    if (lastLight) lightT = 'Last Light';
    const tallI = recT === 'Two Masts' ? 1 : (recT === 'Mast and Oak' || recT === 'Wind Turbine') ? 0 : -1;
    const flashT = !home && r4() < 0.09 && tallI >= 0 ? 'Upward' : 'Downward';
    return [['Receptors', recT], ['Distance', distT], ['Polarity', polT], ['Strokes', strT], ['Rain', rainT], ['Cloud Base', cloudT], ['Horizon', lightT], ['Ground', groundT], ['Framing', frameT], ['Flash', flashT]];
  },
});
// ==== end roll ====

// ==== roll 320 ====
ProtoRolls.add(320, {
  traits: {"Scene":{"look":true,"values":{"Seaside dusk":222865,"Noon beach":188289,"Harbour lights":179655,"Wheat before rain":170022,"Snowy field":150384,"Window still life":88785}},"Failure":{"look":true,"values":{"Fingers and streaks":351752,"Frost ferns":227295,"Bubbles":205327,"Colour shift only":164465,"Almost blank":51161}},"Film":{"values":{"Colour":680209,"Black and white":219797,"Peel-apart":99994}},"Age":{"values":{"Very expired":549710,"Mildly expired":450290}},"Cast":{"look":true,"values":{"Magenta clouds":300173,"Cyan cast":250483,"Orange flare":249805,"Faded warm":199539}},"Table":{"look":true,"values":{"Walnut":377505,"Grey linoleum":252367,"Slate":209647,"Garden table":160481}},"Light":{"look":true,"values":{"Window":462416,"Desk lamp":299918,"Venetian blinds":237666}}},
  roll(hash) {
    const HOME = '0xc459b50c175e370785f15a4428eed5287f427aae48582db0b7a4914eaf881763';
    const home = hash === HOME;
    let s0 = 0x320f11a5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const mkR = (seed) => { let s = seed | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR(s0);
    const pickW = (o) => { let tot = 0; for (const k in o) tot += o[k]; let x = R() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const scene0 = home ? 'Seaside dusk' : pickW({ 'Seaside dusk': 36, 'Snowy field': 22, 'Harbour lights': 27, 'Window still life': 15 });
    const R4 = mkR(s0 ^ 0x7e4c19d3), r4 = R4(), r4b = R4();
    const scene = home ? scene0 : scene0 !== 'Seaside dusk' ? (r4 < 0.41 ? (r4 < 0.22 ? 'Noon beach' : 'Wheat before rain') : scene0)
      : r4 < 0.38 ? (r4b < 0.35 ? 'Noon beach' : r4b < 0.7 ? 'Wheat before rain' : r4b < 0.85 ? 'Snowy field' : 'Harbour lights') : scene0;
    const fail = home ? 'Fingers and streaks' : pickW({ 'Fingers and streaks': 34, 'Frost ferns': 22, 'Colour shift only': 16, Bubbles: 20, 'Almost blank': 5 });
    const film = home ? 'Colour' : pickW({ Colour: 68, 'Black and white': 22, 'Peel-apart': 10 });
    const age = home ? 'Very expired' : pickW({ 'Mildly expired': 45, 'Very expired': 55 });
    const cast = home ? 'Magenta clouds' : pickW({ 'Cyan cast': 25, 'Magenta clouds': 30, 'Orange flare': 25, 'Faded warm': 20 });
    const table0 = home ? 'Walnut' : pickW({ Walnut: 45, 'Grey linoleum': 30, Slate: 25 });
    const table = !home && R4() > 0.84 ? 'Garden table' : table0;
    const light0 = home ? 'Window' : pickW({ Window: 70, 'Desk lamp': 30 });
    const R2 = mkR(s0 ^ 0x5b1d5a3c);
    const light = !home && light0 === 'Window' && R2() < 0.34 ? 'Venetian blinds' : light0;
    return [['Scene', scene], ['Failure', fail], ['Film', film], ['Age', age], ['Cast', cast], ['Table', table], ['Light', light]];
  },
});
// ==== end roll ====

// ==== roll 322 ====
ProtoRolls.add(322, {
  traits: {"Scene":{"look":true,"values":{"Pier":180561,"Breaking waves":179915,"Cliff and cove":160104,"Rocks and mist":115216,"Tide flats":80130,"Lighthouse":79811,"Breakwater":70214,"Island":69918,"Sea stacks":64131}},"Plate":{"values":{"Tintype":618856,"Ambrotype":301125,"Peeling tintype":80019}},"Format":{"values":{"Quarter plate":539057,"Sixth plate":240016,"Upright quarter plate":141221,"Stereo pair":79706}},"Artefacts":{"look":true,"values":{"Some":450154,"Few":300325,"Many":249521}},"Developer":{"values":{"Warm":549176,"Cool":450824}},"Horizon":{"values":{"High":643349,"Low":356651}},"Varnish":{"look":true,"values":{"Yellowed and crazed":400557,"Yellowed":349820,"Clear":249623}},"Lens":{"values":{"Petzval wide open":619716,"Stopped down":380284}},"Exposure":{"values":{"Long":852380,"Instantaneous":147620}}},
  roll(hash) {
    const HOME = '0x2975e47ba80fb63186c2011417e0b6195a09a4f7921834d34606e58abe895601';
    const home = hash === HOME;
    let s0 = 0x322a1f5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const mkR = (seed) => { let s = seed | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = mkR(s0);
    const pickW = (o) => { let tot = 0; for (const k in o) tot += o[k]; let x = R() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const scene0 = home ? 'Rocks and mist' : pickW({ 'Rocks and mist': 36, Pier: 18, 'Sea stacks': 20, 'Breaking waves': 18, Lighthouse: 8 });
    const Rn = mkR(s0 ^ 0x1c0e5a7), rn1 = Rn(), rn2 = Rn(), rn3 = Rn();
    const scene = home || (scene0 !== 'Rocks and mist' && scene0 !== 'Sea stacks') ? scene0 : rn1 < 0.286 ? 'Cliff and cove'
      : rn3 >= 0.55 ? scene0 : (rn3 / 0.55 * 6) % 1 < 8 / 22 ? 'Tide flats' : (rn3 / 0.55 * 6) % 1 < 15 / 22 ? 'Breakwater' : 'Island';
    const plate = home ? 'Tintype' : pickW({ Tintype: 62, Ambrotype: 30, 'Peeling tintype': 8 });
    const fmt0 = home ? 'Single' : pickW({ Single: 92, 'Stereo pair': 8 }), Rf = mkR(s0 ^ 0x5f3a1c), fr0 = Rf();
    const sceneQ = ['Rocks and mist', 'Pier', 'Sea stacks', 'Breaking waves', 'Lighthouse'].indexOf(scene0);
    const fmt = fmt0 !== 'Single' ? fmt0 : home ? 'Quarter plate' : fr0 < 0.26 ? 'Sixth plate' : fr0 < 0.5 && sceneQ !== 1 && sceneQ !== 3 ? 'Upright quarter plate' : 'Quarter plate';
    const art = home ? 'Some' : pickW({ Few: 30, Some: 45, Many: 25 });
    const devr = home ? 'Warm' : pickW({ Warm: 55, Cool: 45 });
    const hor = home ? 'High' : scene === 'Tide flats' || scene === 'Breakwater' ? (pickW({ High: 58, Low: 42 }), 'High') : pickW({ High: 58, Low: 42 });
    const varn = home ? 'Yellowed and crazed' : pickW({ Clear: 25, Yellowed: 35, 'Yellowed and crazed': 40 });
    const lens = home ? 'Petzval wide open' : pickW({ 'Petzval wide open': 62, 'Stopped down': 38 });
    const expo = !home && scene !== 'Breaking waves' && rn2 < 0.18 ? 'Instantaneous' : 'Long';
    return [['Scene', scene], ['Plate', plate], ['Format', fmt], ['Artefacts', art], ['Developer', devr], ['Horizon', hor], ['Varnish', varn], ['Lens', lens], ['Exposure', expo]];
  },
});
// ==== end roll ====

// ==== roll 334 ====
ProtoRolls.add(334, {
  traits: {"Site":{"look":true,"values":{"Jezero delta":240150,"Gale rim":224086,"Gusev plain":195702,"Dune crests":191977,"Gediz valley":148085}},"Dust":{"look":true,"values":{"Clear":478971,"Hazy":398791,"Global storm":122238}},"Time":{"values":{"Before sunset":503851,"After sunset":239536,"Late afternoon":136912,"Frosty sunrise":119701}},"Camera":{"look":true,"values":{"Mastcam-34":435367,"Pancam mosaic":312581,"Mastcam-100":252052}},"Sky extra":{"values":{"None":648774,"Phobos transit":130555,"Twilight ice cloud":129405,"Earth":77191,"Twilight rays":14075}},"Window":{"look":true,"values":{"Dusty":470798,"Clean":379008,"Dust ring":150194}},"Aim":{"values":{"Horizon":771555,"Low horizon":131951,"High horizon":96494}}},
  roll(hash) {
    const HOME = '0x172cc2840fef02031af262188bdfa64c66129f758181c9eb7fbd037e99b51e6f';   // hashFor(333, 0): the site's home
    const home = hash === HOME;
    const seed = (s, m, sh) => { for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (s >>> sh); return s; };
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const R = mk(seed(0x334d05a1, 0x85ebca6b, 13));
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let extra = home ? 'None' : pick({ None: 46, Earth: 28, 'Phobos transit': 13, 'Twilight ice cloud': 13 });
    let site = home ? 'Gale rim' : pick({ 'Gale rim': 32, 'Gusev plain': 28, 'Jezero delta': 26, 'Dune crests': 14 });
    let dust = home ? 'Clear' : pick({ Clear: 48, Hazy: 38, 'Global storm': 14 });
    let time = home ? 'Before sunset' : pick({ 'Before sunset': 56, 'After sunset': 32, 'Frosty sunrise': 12 });
    let camN = home ? 'Mastcam-34' : pick({ 'Mastcam-34': 50, 'Pancam mosaic': 36, 'Mastcam-100': 14 });
    const win = home ? 'Dusty' : pick({ Clean: 38, Dusty: 47, 'Dust ring': 15 });
    if (extra === 'Phobos transit') { camN = 'Mastcam-100'; if (time === 'After sunset') time = 'Before sunset'; }
    if (extra === 'Phobos transit' && dust === 'Global storm') dust = 'Hazy';
    if (dust === 'Global storm' && time === 'After sunset') time = 'Before sunset';
    if (extra === 'Earth' && time !== 'After sunset') extra = 'None';
    const R4 = mk(seed(0x334f0b9d, 0x165667b1, 13));
    const u4v = R4(), u4l = R4();
    if (!home && extra !== 'Phobos transit' && camN !== 'Mastcam-100' && (site === 'Gale rim' || site === 'Gusev plain') && u4v < 0.33) site = 'Gediz valley';
    if (!home && time === 'Before sunset' && extra === 'None' && camN !== 'Mastcam-100' && dust === 'Clear' && u4l < 0.8) time = 'Late afternoon';
    const R5 = mk(seed(0x334e5d17, 0x2c1b3c6d, 12));
    const u5d = R5();
    if (!home && extra !== 'Phobos transit' && camN !== 'Mastcam-100' && time !== 'Frosty sunrise' && time !== 'After sunset' && dust !== 'Global storm' && (site === 'Gale rim' || site === 'Gusev plain' || site === 'Jezero delta') && u5d < 0.22) site = 'Dune crests';
    const R2 = mk(seed(0x334a1a5e, 0x9e3779b1, 15));
    let aimN = home ? 'Horizon' : (() => { const u = R2() * 100; return u < 62 ? 'Horizon' : u < 88 ? 'Low horizon' : 'High horizon'; })();
    if ((camN === 'Mastcam-100' || dust === 'Global storm' || time === 'Late afternoon') && aimN === 'Low horizon') aimN = 'Horizon';
    if (site === 'Dune crests' && aimN === 'High horizon') aimN = 'Horizon';
    const R3 = mk(seed(0x334c7a3d, 0x27d4eb2f, 14));
    if (R3() < 0.11 && !home && extra === 'None' && time === 'After sunset') extra = 'Twilight rays';
    return [['Site', site], ['Dust', dust], ['Time', time], ['Camera', camN], ['Sky extra', extra], ['Window', win], ['Aim', aimN]];
  },
});
// ==== end roll ====

// ==== roll 349 ====
ProtoRolls.add(349, {
  traits: {"Event":{"look":true,"values":{"classic outbreak":475677,"haboob front":203227,"thin haze":185635,"Caribbean arrival":55250,"classic outbreak, smoke mix":41644,"haboob front, smoke mix":17660,"thin haze, smoke mix":16140,"Caribbean arrival, smoke mix":4767}},"Clouds":{"look":true,"values":{"cloud streets":421718,"open cells":315182,"few":263100}},"Islands":{"look":true,"values":{"Canary-like chain":417522,"Cape Verde-like ring":313448,"lone peak":209013,"Lesser Antilles-like arc":60017}},"Flow":{"values":{"curling low":625315,"straight stream":374685}},"Season":{"values":{"winter":555936,"summer":444064}},"Glint":{"values":{"none":749678,"sun glint":250322}},"Scale":{"look":true,"values":{"regional":498977,"wide":251004,"close":250019}},"Coast":{"look":true,"values":{"corner":367611,"across the frame":235789,"down the right edge":234992,"two shores":101591,"none, mid-ocean":60017}},"Pass":{"values":{"morning":793384,"evening":129676,"from the station":76940}}},
  roll(hash) {
    const HOME = '0x038760f3abc982fe5f2aca23f065b87158e7ccd8fba75bf98110caac72723c95';
    const home = hash === HOME, out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const SEED5 = 0x79df7b70;
    function rng(hash) {
      let s = parseInt(hash.slice(2, 10), 16) ^ parseInt(hash.slice(18, 26), 16) * 7 ^ parseInt(hash.slice(42, 50), 16);
      return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    }
    function pick(R, list) { let r = R() * list.reduce((a, o) => a + o.w, 0); for (const o of list) { r -= o.w; if (r <= 0) return o; } return list[list.length - 1]; }
    const un = (a) => [Math.cos(a), Math.sin(a)];
    function stream(hash, a, salt) { let z = parseInt(hash.slice(a, a + 8), 16) ^ salt; return () => { z = z + 0x6D2B79F5 | 0; let t = Math.imul(z ^ z >>> 15, 1 | z); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    const c = { tile: false };
    const R = rng(hash);

    // ---- from the piece's make()
      // ---------------------------------------------------------------- traits
      const EVT = [{ n: 'classic outbreak', v: 0, w: 5 }, { n: 'haboob front', v: 1, w: 2.2 }, { n: 'thin haze', v: 2, w: 2 }, { n: 'Caribbean arrival', v: 3, w: .6 }, { n: 'Bodele plume', v: 4, w: .15 }];
      const CLD = [{ n: 'few', v: 0, w: 2.5 }, { n: 'cloud streets', v: 1, w: 4 }, { n: 'open cells', v: 2, w: 3 }];
      const ISL = [{ n: 'Canary-like chain', w: 4 }, { n: 'Cape Verde-like ring', w: 3 }, { n: 'lone peak', w: 2 }];
      const LOW = [{ n: 'curling low', v: 1, w: 5 }, { n: 'straight stream', v: 0, w: 3 }];
      const SEA = [{ n: 'winter', v: 0, w: 5 }, { n: 'summer', v: 1, w: 4 }];
      const GLI = [{ n: 'none', v: 0, w: 7.5 }, { n: 'sun glint', v: 1, w: 2.5 }];
      const SMK = [{ n: 'none', v: 0, w: 9.2 }, { n: 'smoke mix', v: 1, w: .8 }];
      const SCL = [{ n: 'close', v: 560, w: 2.5 }, { n: 'regional', v: 820, w: 5 }, { n: 'wide', v: 1150, w: 2.5 }];
      let evt = pick(R, EVT), cld = pick(R, CLD), isk = pick(R, ISL), low = pick(R, LOW), sea = pick(R, SEA), gli = pick(R, GLI), smk = pick(R, SMK), scl = pick(R, SCL);
      if (home) { evt = EVT[0]; cld = CLD[1]; isk = ISL[0]; low = LOW[0]; sea = SEA[0]; gli = GLI[0]; smk = SMK[0]; scl = SCL[1]; }
      // the Bodele plume (a flat desert-only view) read weak in review and is dropped: its rare roll falls back to the classic
      // outbreak (the roll itself stays so every other mint keeps its values)
      if (evt.v === 4) evt = EVT[0];
      const mode = evt.v;
      // a stratocumulus deck to the north on most winter mints and every 'few' mint (its own third stream, R and R2
      // untouched), so a sky with little cumulus still has a deck's edge in the frame; only deck mints compile it
      const R3 = stream(hash, 34, 0x349c2d3c);
      const deckOn = !home && mode < 3 && (cld.v === 0 || R3() < (sea.v === 1 ? .3 : .6)), dK = deckOn ? '#define DECK 1\n' : '';
      let iskN = mode === 3 ? 'Lesser Antilles-like arc' : mode === 4 ? 'none' : isk.n;
      if (mode === 4) smk = SMK[0];
      // the rare smoke mix is named with the event (the roll is its own, as before)
      T('Event', evt.n + (smk.v ? ', smoke mix' : '')); T('Clouds', cld.n); T('Islands', iskN); T('Flow', low.n);
      T('Season', sea.n); T('Glint', gli.n); T('Scale', scl.n);
      // where the coast lies in the frame: its own hash stream (the rolls above are untouched), home forced to the corner
      const R2 = stream(hash, 26, 0x349c0a57);
      const CST = [{ n: 'corner', w: 50 }, { n: 'down the right edge', w: 25 }, { n: 'across the frame', w: 25 }];
      const cst = home ? 0 : CST.indexOf(pick(R2, CST));
      // the hour of the pass: a fourth stream (R, R2, R3 untouched). An evening pass an hour before dusk on 26 in 100 of
      // the mints off a corner or right-edge coast; never the home, a glint mint (a low sun's glint would be a patch) or
      // a thin haze under few clouds (an empty dusk)
      const R4 = stream(hash, 10, 0x349e7e01);
      const eve = !home && mode < 3 && cst !== 2 && R4() < .26 && !gli.v && !(mode === 2 && cld.v === 0);
      // the place and the standpoint: a fifth stream (R to R4 untouched). Two shores (a second desert across a narrow sea)
      // on 24 in 100 of the corner mints; the view from the station toward the limb on 20 in 100 of the other classic
      // outbreaks off a corner or right-edge coast in the morning. Never the home; a mint across the frame keeps one coast
      const R5 = stream(hash, 50, SEED5), r5 = [R5(), R5(), R5(), R5(), R5()];
      let two = !home && mode < 3 && cst === 0 && r5[0] < .31;
      const limb = !home && mode === 0 && cst !== 2 && !eve && !two && !gli.v && r5[1] < .45;

      // ---------------------------------------------------------------- geography (km, x east, y north; view centre at the origin)
      const W = scl.v, jt = home ? 0 : 1;
      const summer = sea.v === 1;
      // the wind: north-easterly trades / Harmattan in winter, a higher, more easterly Saharan air layer in summer
      let wa = Math.PI + (summer ? .4 : .66) - (low.v === 0 ? .3 : 0) + jt * (R() - .5) * .3;
      let ub = un(wa), US = (summer ? 30 : 25) * (1 + jt * (R() - .5) * .25);
      if (mode === 4) { wa = Math.PI + .78 + jt * (R() - .5) * .2; ub = un(wa); US = 34; }
      if (mode === 3) { wa = Math.PI + .1; ub = un(wa); US = 26; }
      // the coast through the lower right, land to the east-south-east
      const ca = (40 + jt * (R() - .5) * 16) * Math.PI / 180;
      const cn = [Math.cos(ca), -Math.sin(ca)];
      let cp = mode === 3 ? [W * .78, 0] : [W * (.26 + jt * (R() - .5) * .06), -W * (.28 + jt * (R() - .5) * .06)];
      if (mode === 3) { cn[0] = 1; cn[1] = 0; }
      // the islands keep their place in the frame (cp0); the coast moves: a Senegal-like north-south shore down the right
      // edge, or the shore pushed in across the frame
      const cp0 = cp.slice();
      if (mode < 3 && cst === 1) { const a2 = (6 + (R2() - .5) * 10) * Math.PI / 180; cn[0] = Math.cos(a2); cn[1] = -Math.sin(a2); cp = [W * (.31 + R2() * .05), cp0[1]]; }
      else if (mode < 3 && cst === 2) { const d = W * (.16 + .05 * R2()); cp = [cp0[0] - cn[0] * d, cp0[1] - cn[1] * d]; }
      // the plume heads downwind; panning follows it
      const pd = (() => { const a = mode === 4 ? wa : mode === 3 ? Math.PI : Math.PI + .55; return un(a); })();
      const PANMAX = .6 * W;
      // the hand can also pan a little back toward the source (PANMIN), so a first drag either way moves the view
      const PANMIN = -.35 * W, ex = (i, f) => f(pd[i] * PANMIN, pd[i] * PANMAX);
      const dom0 = [Math.min(0, ex(0, Math.min)) - .54 * W, Math.min(0, ex(1, Math.min)) - .54 * W];
      const dom1 = [Math.max(0, ex(0, Math.max)) + .54 * W, Math.max(0, ex(1, Math.max)) + .54 * W];
      // the low, the episode clock
      const P = mode === 4 ? 24 : 90, PH = 0;
      const t0 = mode === 4 ? 17.5 : mode === 2 ? 62 : mode === 1 ? 14 : home ? 13 + 0 * R() : (mode === 3 ? 41 : 0) + 19 + jt * (R() - .5) * 8;
      const lowOn = low.v === 1 && mode !== 4;
      const LR = (mode === 3 ? 330 : 270) * (1 + jt * (R() - .5) * .3), LV = lowOn ? (mode === 3 ? 18 : 26) * (1 + jt * (R() - .5) * .3) : 0;
      const lowAt = [-.72 * W + jt * (R() - .5) * .3 * W, -.5 * W + (summer ? .2 * W : 0) + jt * (R() - .5) * .3 * W];
      const LD = [5 + jt * R() * 4, 4 + jt * R() * 3];
      const LC = [lowAt[0] - LD[0] * t0, lowAt[1] - LD[1] * t0];
      // the onset front sweeping across the desert, or a gust front spreading from a storm
      const fd = un(Math.PI + 1.05 + jt * (R() - .5) * .6);
      const FS = mode === 1 ? 42 : mode === 4 ? 400 : 30;
      const HC = [cp[0] + 140 + R() * 80, cp[1] - 20 - R() * 80];
      // islands
      const isl = [];
      const tall = (x, y, r, h, sh) => isl.push({ x, y, r, h, sh, e: 1 + R() * .5, a: R() * 6.28, s: R() * 50 });
      if (mode === 3) {
        // a bowed arc, convex to the east, off-centre and irregularly spaced
        for (let i = 0; i < 7; i++) { const an = -.62 + i * .19 + (R() - .5) * .07, rr = W * (.92 + (R() - .5) * .05); tall(-.66 * W + rr * Math.cos(an), .02 * W + rr * Math.sin(an), 11 + R() * 8, .7 + R() * .3, i === 2 || i === 4 ? 1 : .2); }
      } else if (mode !== 4) {
        const k = iskN;
        if (k === 'Canary-like chain') {
          const base = [cp0[0] - 80, cp0[1] + .3 * W];
          // x, y, short half-axis, height, shedding, elongation, long-axis bearing, [three-fold, egg, pale, lava]
          const L = [[0, 0, 13, .3, 0, 3.6, 1.0, [0, .2, 1, .5]], [42, 70, 10, .32, 0, 2.7, 1.1, [0, 0, 1, 1]], [-157, -45, 22, .8, .9, 1.05, .6, [.06, 0, 0, .1]],
            [-252, -10, 22, 1, 1, 1.55, .55, [.22, .1, 0, .35]], [-310, -30, 10, .7, .25, 1.1, .3, [0, .05, 0, 0]], [-370, 30, 11, .9, .45, 1.9, 1.62, [0, .25, 0, .4]], [-388, -66, 9, .75, .3, 1.25, .9, [.3, 0, 0, .3]]];
          for (const l of L) { const ra = R(); isl.push({ x: base[0] + l[0] * W / 820, y: base[1] + l[1] * W / 820, r: l[2], h: l[3], sh: l[4], e: l[5], a: l[6] + (ra - .5) * .25, s: R() * 50, p: l[7] }); }
        } else if (k === 'Cape Verde-like ring') {
          const base = [cp0[0] - .55 * W + 60, cp0[1] + .38 * W - 215];
          const L = [[-171, 219, 12, .9, .7, 1.7, .75, [.05, .1, 0, .1]], [-144, 190, 8, .6, 0, 1.25, .4, [.15, 0, 0, .3]], [-75, 166, 6, .7, 0, 3.4, .25, [0, .2, 0, .2]], [72, 183, 6, .25, 0, 2.3, 1.55, [0, .15, 1, .6]],
            [86, 113, 13, .3, 0, 1.15, .9, [.1, 0, 1, .3]], [45, 17, 8, .3, 0, 1.3, 1.3, [0, .1, 1, .2]], [0, 0, 13, .75, .3, 1.8, 1.5, [.05, .2, 0, .25]], [-83, -17, 12, 1, 1, 1.0, 0, [0, 0, 0, .7]], [-118, -26, 5, .6, 0, 1.1, 0, [0, 0, 0, 0]]];
          for (const l of L) { const re = R(), ra = R(); isl.push({ x: base[0] + l[0], y: base[1] + l[1], r: l[2], h: l[3], sh: l[4], e: l[5] * (.95 + re * .1), a: l[6] + (ra - .5) * .2, s: R() * 50, p: l[7] }); }
          isl.push({ x: base[0] - 116, y: base[1] + 190, r: 3.5, h: .4, sh: 0, e: 1.4, a: .3, s: 17, p: [0, 0, 0, .2] });
        } else {
          tall(cp0[0] - .5 * W, cp0[1] + .5 * W, 17, 1, 1); tall(cp0[0] - .5 * W + 55, cp0[1] + .5 * W + 35, 6, .4, 0);
        }
      }
      // the view from the station sees far past the overhead frame: the simulated square takes in its ground from the
      // frame's foot (50 km inland of the near shore) to about 1250 km ahead and the first part of the pan, so the square's
      // edge lies in the haze under the horizon
      // The camera looks between the plume's way (downwind) and the islands, so both run away toward the limb
      const limbB = [cp[0] + cn[0] * 50, cp[1] + cn[1] * 50], lh = pd.slice();
      if (limb) {
        const ic = isl.reduce((a, o) => [a[0] + o.x / isl.length, a[1] + o.y / isl.length], [0, 0]), di = [ic[0] - limbB[0], ic[1] - limbB[1]], dl = Math.hypot(di[0], di[1]) || 1;
        lh[0] = pd[0] + .8 * di[0] / dl; lh[1] = pd[1] + .8 * di[1] / dl; const l = Math.hypot(lh[0], lh[1]); lh[0] /= l; lh[1] /= l;
      }
      if (limb) for (const a of [0, 1250 + .24 * W]) for (const sg of [-1, 1]) {
        const hw = 400 + .45 * a, x = limbB[0] + lh[0] * a + lh[1] * sg * hw, y = limbB[1] + lh[1] * a - lh[0] * sg * hw;
        dom0[0] = Math.min(dom0[0], x); dom0[1] = Math.min(dom0[1], y); dom1[0] = Math.max(dom1[0], x); dom1[1] = Math.max(dom1[1], y);
      }
      const dsz = [dom1[0] - dom0[0], dom1[1] - dom0[1]];
      // two shores: the far desert's own coast, turned 15 to 60 degrees from the near one (down the left side where the
      // islands leave room, else along the top), placed to take 16-23 per cent of the opening frame and
      // moved out until every island is 70 km clear of it; where no turn leaves 13 per cent, the mint keeps one coast
      let far = null;
      if (two) {
        const share = (n2, d) => { let k = 0; for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) if (((i + .5) / 24 - .5) * W * n2[0] + ((j + .5) / 24 - .5) * W * n2[1] > d) k++; return k / 576; };
        // the turns that put the far land down the left side, where the plume goes, come first
        const b0 = Math.atan2(-cn[1], -cn[0]), want = .16 + .07 * r5[4], TURN = [45, 30, 60, 15], k0 = Math.floor(r5[3] * 4);
        const order = TURN.slice(k0).concat(TURN.slice(0, k0), [-15, -30]);
        for (let i = 0; i < 6 && !far; i++) {
          const n2 = un(b0 + (order[i] + 6 * (r5[2] - .5)) * Math.PI / 180);
          let lo = -W, hi = W;
          for (let it = 0; it < 24; it++) { const m = (lo + hi) / 2; if (share(n2, m) > want) lo = m; else hi = m; }
          let d = hi;
          for (const o of isl) d = Math.max(d, o.x * n2[0] + o.y * n2[1] + o.r * o.e + 70);
          // and the two coasts may not meet in or near the frame: a sea at least a fifth of the frame wide between them
          let open = true;
          for (let t = -1.2; t <= 1.2; t += .1) { const x = n2[0] * d - n2[1] * t * W, y = n2[1] * d + n2[0] * t * W;
            if (Math.abs(x) < .62 * W && Math.abs(y) < .62 * W && (x - cp[0]) * cn[0] + (y - cp[1]) * cn[1] > -.22 * W) open = false; }
          if (open && share(n2, d) >= .13) far = [n2[0] * d, n2[1] * d, n2[0], n2[1]];
        }
        if (!far) two = false;
      }
      T('Coast', mode === 3 ? 'none, mid-ocean' : mode === 4 ? 'none, inland' : two ? 'two shores' : CST[cst].n);
      T('Pass', eve ? 'evening' : limb ? 'from the station' : 'morning');
    return out;
  },
});
// ==== end roll ====

// ==== roll 350 ====
ProtoRolls.add(350, {
  traits: {"Depth":{"look":true,"values":{"A hand-span":459698,"Ankle":280537,"Deep run":259765}},"Light":{"look":true,"values":{"Morning sun":346569,"Evening sun":326744,"High sun":265584,"Low sun":61103}},"Bed":{"look":true,"values":{"Rippled sand":459725,"Gravel":359484,"Silt and algae":180791}},"Skaters":{"values":{"A pod":500429,"A crowd":250360,"Three":249211}},"Current":{"look":true,"values":{"Gentle":499728,"Still pool":250144,"Riffle":250128}},"Water":{"values":{"Clear":549949,"Tea-stained":299707,"Green":150344}},"View":{"values":{"Standing":519736,"Crouched close":240352,"From the bank":239912}},"Gathering":{"values":{"Spread out":579597,"A tight raft":280061,"Strung along a seam":140342}},"Visitor":{"values":{"None":756038,"A fallen fly":173739,"Mating pair":70223}},"Shade":{"look":true,"values":{"Bank shade":419354,"Alder dapple":400667,"Open sun":179979}}},
  roll(hash) {
    const HOME = '0x3e104c2351aad233fef95eff3c1ce2915160cf9883b4401fb859bc36469706c4';
    const home = hash === HOME;
    const seed = (s, m, sh) => { for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (s >>> sh); return s; };
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const R = mk(seed(0x3a5f1c27, 0x85ebca6b, 13));
    const pk = (r, o) => { let tot = 0; for (const k in o) tot += o[k]; let x = r() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const pick = o => pk(R, o);
    const depthN = home ? 'A hand-span' : pick({ Ankle: 28, 'A hand-span': 46, 'Deep run': 26 });
    const sunN = home ? 'Morning sun' : pick({ 'Morning sun': 34, 'High sun': 26, 'Evening sun': 32, 'Low sun': 6 });
    const bedN = home ? 'Rippled sand' : pick({ 'Rippled sand': 46, Gravel: 36, 'Silt and algae': 18 });
    const skN = home ? 'A pod' : pick({ Three: 25, 'A pod': 50, 'A crowd': 25 });
    const visN0 = home ? 'None' : pick({ None: 84, 'Winged adult': 9, 'Mating pair': 7 });
    const curN = home ? 'Gentle' : pick({ 'Still pool': 25, Gentle: 50, Riffle: 25 });
    const watN = home ? 'Clear' : pick({ Clear: 55, 'Tea-stained': 30, Green: 15 });
    const R2 = mk(seed(0x51ed27a3, 0xc2b2ae35, 15));
    const viewN = home ? 'Standing' : pk(R2, { 'Crouched close': 24, Standing: 52, 'From the bank': 24 });
    const gatN = home ? 'Spread out' : pk(R2, { 'Spread out': 58, 'A tight raft': 28, 'Strung along a seam': 14 });
    const visN = (!home && R2() < .1 && visN0 === 'None') || visN0 === 'Winged adult' ? 'A fallen fly' : visN0;
    let shdN = 'Bank shade';
    if (!home) {
      // the R draws the art makes before it counts the skaters (bed, pebbles, waves, uniforms)
      R(); R(); R(); // az, the lamp position (two)
      R(); // fl
      const bedT = { 'Rippled sand': 0, Gravel: 1, 'Silt and algae': 3 }[bedN];
      R(); R(); R(); R(); R(); // sand x3, ripAmp, ripK
      R(); R(); R(); R(); // gauss (rdA)
      R(); // algae
      const addPeb = t0 => { const ty = t0 === undefined ? (() => { const u = R(); return u < .3 ? 0 : u < .5 ? 1 : u < .62 ? 2 : u < .76 ? 3 : u < .88 ? 4 : u < .93 ? 5 : 6; })() : t0; R(); R(); if (ty !== 4) R(); R(); };
      R(); R(); // clx, cly
      if (bedT !== 3) { const n = 3 + (R() * 3 | 0); for (let i = 0; i < n; i++) { R(); if (i) R(); if (i === 0) R(); else if (i === 1) R(); else { R(); R(); } addPeb(i === 0 ? 3 : undefined); } }
      const nScatter = [10, 46, 0, 5][bedT];
      for (let i = 0; i < nScatter; i++) { R(); R(); R(); R(); R(); addPeb(); }
      for (let i = 0; i < 9; i++) { R(); R(); R(); R(); R(); }       // k, ang, amp, om, then the phase in addW
      for (let i = 0; i < 6; i++) { R(); R(); R(); R(); R(); R(); R(); } // k, gauss x4, amp, phase
      R(); R(); // skA, the uniform
      const nB = { Three: 3, 'A pod': 4 + (R() * 3 | 0), 'A crowd': 8 + (R() * 2 | 0) }[skN] + (viewN === 'From the bank' ? 2 + (R2() * 3 | 0) : 0);
      const R4 = mk(seed(0x6b43a9b5, 0x27d4eb2f, 13));
      for (let i = 0; i < nB; i++) { R4(); if (!(R4() < .5)) R4(); }
      const u = R4(); shdN = u < .42 ? 'Bank shade' : u < .82 ? 'Alder dapple' : 'Open sun';
    }
    return [['Depth', depthN], ['Light', sunN], ['Bed', bedN], ['Skaters', skN], ['Current', curN], ['Water', watN],
      ['View', viewN], ['Gathering', gatN], ['Visitor', visN], ['Shade', shdN]];
  },
});
// ==== end roll ====

// ==== roll 356 ====
ProtoRolls.add(356, {
  traits: {"Sand":{"look":true,"values":{"Golden Quartz":499241,"Grey Volcanic":300159,"White Coral":200600}},"Film":{"look":true,"values":{"Glassy":450356,"Damp":299603,"Brimming":250041}},"Sun":{"look":true,"values":{"Golden Hour":449732,"Morning":350243,"Low Winter Sun":200025}},"Sky":{"values":{"Clear":579480,"Hazy":300014,"Evening Pink":120506}},"Swash":{"look":true,"values":{"Regular":450279,"Lazy":300166,"Restless":249555}},"Surface":{"look":true,"values":{"Smooth":318678,"Pitted":280268,"Runnel":160950,"Rippled":120478,"Rill-marked":119626}},"Stone":{"look":true,"values":{"Greywacke":399771,"Basalt":280094,"Sandstone":170333,"Quartz Veined":149802}},"Finds":{"look":true,"values":{"A Few Shells":416102,"Gravel Strand":199212,"Bare":160132,"Lugworm Casts":112636,"Mussel Shards":111918}},"View":{"look":true,"values":{"Close on the rim":300139,"Facing the sea":299714,"Along the shore":249862,"Looking down":150285}}},
  roll(hash) {
    const HOME = '0xc247d56c6ea140b5d7459e241e44a22b36ae41ffbfd3a9131284c3b0cb4cf7f2';   // hashFor(num - 1, seed): the runtime's home print
    const isHome = hash === HOME;
    const NUM = 356, DM = 540;
    const CAMP0 = [270, 579.6, 176], PITCH = 40 * Math.PI / 180, TANH = Math.tan(20 * Math.PI / 180);
    function rng(hash, salt) {
      const h = hash.slice(2).padEnd(64, '0');
      const w = k => parseInt(h.slice(k * 8, k * 8 + 8), 16) >>> 0;
      let a = (w(0) ^ Math.imul(salt, 0x9E3779B1) ^ Math.imul(w(4), 0x85EBCA6B)) >>> 0, b = (w(1) ^ Math.imul(w(5), 0xC2B2AE35)) >>> 0;
      let c = (w(2) + salt ^ Math.imul(w(6), 0x27D4EB2F)) >>> 0, d = (w(3) ^ Math.imul(w(7), 0x165667B1)) >>> 0;
      const r = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = (c << 21 | c >>> 11); d = d + 1 | 0; t = t + d | 0; c = c + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 20; i++) r();
      return r;
    }
    const pick = (r, arr) => { let s = 0; for (const o of arr) s += o.w; let x = r() * s; for (const o of arr) { x -= o.w; if (x < 0) return o; } return arr[arr.length - 1]; };
    const SANDS = [{ n: 'Golden Quartz', w: 50 }, { n: 'Grey Volcanic', w: 30 }, { n: 'White Coral', w: 20 }];
    const FILMS = [{ n: 'Damp', w: 30 }, { n: 'Glassy', w: 45 }, { n: 'Brimming', w: 25 }];
    const SUNS = [{ n: 'Golden Hour', w: 45 }, { n: 'Morning', w: 35 }, { n: 'Low Winter Sun', w: 20 }];
    const SKIES = [{ n: 'Clear', w: 58 }, { n: 'Hazy', w: 30 }, { n: 'Evening Pink', w: 12 }];
    const SWASH = [{ n: 'Lazy', w: 30 }, { n: 'Regular', w: 45 }, { n: 'Restless', w: 25 }];
    const SURFACES = [{ n: 'Smooth', w: 60 }, { n: 'Pitted', w: 28 }, { n: 'Rippled', w: 12 }];
    const STONES = [{ n: 'Greywacke', w: 40, vein: 0 }, { n: 'Basalt', w: 28, vein: 0 }, { n: 'Sandstone', w: 17, vein: 0 }, { n: 'Quartz Veined', w: 15, vein: 1 }];
    const FINDS = [{ n: 'Bare', w: 20 }, { n: 'A Few Shells', w: 52 }, { n: 'Mussel Shards', w: 14 }, { n: 'Lugworm Casts', w: 14 }];
    const R = rng(hash, NUM);
    let sand = pick(R, SANDS), film = pick(R, FILMS), sun = pick(R, SUNS), skyT = pick(R, SKIES), swash = pick(R, SWASH),
      surf = pick(R, SURFACES), stoneT = pick(R, STONES), finds = pick(R, FINDS);
    if (isHome) { sand = SANDS[0]; film = FILMS[1]; sun = SUNS[0]; skyT = SKIES[0]; swash = SWASH[1]; surf = SURFACES[0]; stoneT = STONES[0]; finds = FINDS[1]; }
    const R4 = rng(hash, NUM + 29), strand = !isHome && R4() < 0.2;
    const R3 = rng(hash, NUM + 13), vr = R3(), vs = R3() < 0.5 ? -1 : 1, vy0 = R3(), vg = R3();
    const view = isHome ? 'Facing the sea' : vr < 0.3 ? 'Facing the sea' : vr < 0.55 ? 'Along the shore' : vr < 0.7 ? 'Looking down' : 'Close on the rim';
    const RN = rng(hash, NUM + 53), n1 = RN(); RN();   // n2: still drawn
    const fresh = !isHome && !(sand.n === 'Grey Volcanic' && view === 'Looking down');
    let runnel = fresh && surf.n === 'Smooth' && n1 < 0.41;
    const rill = fresh && surf.n === 'Smooth' && n1 >= 0.41 && n1 < 0.62;
    // the footprint is switched off in the art (foot is always false)
    if (runnel) {
      // the art drops a runnel that covers under a fifth of the frame: its camera, the stone's place and the coverage pass
      let cf = [0, -Math.cos(PITCH), -Math.sin(PITCH)], cu = [0, -Math.sin(PITCH), Math.cos(PITCH)], cr = [1, 0, 0], CAMP = CAMP0;
      const toGround = (sx, sy) => {
        const vx = (sx - 0.5) * 2 * TANH, vy = (0.5 - sy) * 2 * TANH;
        const d = [cf[0] + vx * cr[0] + vy * cu[0], cf[1] + vx * cr[1] + vy * cu[1], cf[2] + vy * cu[2]];
        const t = -CAMP[2] / d[2];
        return [CAMP[0] + d[0] * t, CAMP[1] + d[1] * t];
      };
      if (view === 'Close on the rim') {
        const pt = (47 + 8 * vy0) * Math.PI / 180, yw = vs * (8 + 30 * vg) * Math.PI / 180;
        const cy = Math.cos(yw), sy = Math.sin(yw), rot = v => [v[0] * cy - v[1] * sy, v[0] * sy + v[1] * cy, v[2]];
        cf = rot([0, -Math.cos(pt), -Math.sin(pt)]); cu = rot([0, -Math.sin(pt), Math.cos(pt)]); cr = rot([1, 0, 0]);
        const h = 118 + 30 * vy0, k = h / -cf[2];
        CAMP = [DM * 0.5 - cf[0] * k, DM * 0.52 - cf[1] * k, h];
      } else if (view !== 'Facing the sea') {
        const pt = (view === 'Looking down' ? 58 + 8 * vy0 : 40 + 4 * vy0) * Math.PI / 180, yw = vs * (view === 'Looking down' ? 6 + 12 * vg : 70 + 20 * vg) * Math.PI / 180;
        const cy = Math.cos(yw), sy = Math.sin(yw), rot = v => [v[0] * cy - v[1] * sy, v[0] * sy + v[1] * cy, v[2]];
        cf = rot([0, -Math.cos(pt), -Math.sin(pt)]); cu = rot([0, -Math.sin(pt), Math.cos(pt)]); cr = rot([1, 0, 0]);
        for (let h = 320; h > 90; h -= 4) {
          const k = h / -cf[2];
          CAMP = [DM * 0.5 - cf[0] * k, DM * 0.5 - cf[1] * k, h];
          let a = 1e9, b = 1e9, e = -1e9, f = -1e9;
          for (const q of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const g = toGround(q[0], q[1]); a = Math.min(a, g[0]); b = Math.min(b, g[1]); e = Math.max(e, g[0]); f = Math.max(f, g[1]); }
          CAMP = [CAMP[0] + DM * 0.5 - (a + e) * 0.5, CAMP[1] + DM * 0.5 - (b + f) * 0.5, h];
          if (e - a < DM - 28 && f - b < DM - 28) break;
        }
      }
      const clampG = p => [Math.min(DM - 50, Math.max(50, p[0])), Math.min(DM - 40, Math.max(60, p[1]))];
      R(); if (!isHome) R();   // the sun's azimuth
      R();                     // slope
      const sa = isHome ? 37 : 27 + 12 * R(), sb = sa * (isHome ? 0.66 : 0.6 + 0.3 * R()); if (!isHome) R(); R(); R();   // sT, sSeed, sPow
      R();                     // chipA
      if (!stoneT.vein) R();   // veinK
      const hx = R(), hy = R(), home = clampG(view === 'Close on the rim' ? toGround(hx < 0.5 ? 0.33 + 0.08 * hx : 0.63 + 0.08 * hx, 0.58 + 0.08 * hy) : view === 'Facing the sea' ? toGround(isHome ? 0.36 : 0.24 + 0.5 * hx, isHome ? 0.6 : 0.5 + 0.17 * hy)
        : toGround(hx < 0.5 ? 0.27 + 0.16 * hx : 0.57 + 0.16 * hx, 0.5 + 0.17 * hy));
      const A1 = 8 + 16 * RN(), f1 = 0.006 + 0.007 * RN(), ph = RN() * 6.283, gap = 30 + 22 * RN(); RN(); const want = 0.3 + 0.14 * RN();
      const bend = x => A1 * (Math.sin(x * f1 + ph) + 0.45 * Math.sin(x * f1 * 2.3 + ph * 1.7));
      const Y0 = home[1] - Math.max(sa, sb) - gap - bend(home[0]);
      const gy = new Float64Array(400), gb = new Float64Array(400);   // each grid point's y and its edge Y0 + bend(x), computed once
      let n = 0;
      for (let i = 0; i < 20; i++) for (let j = 0; j < 20; j++) { const q = toGround((i + 0.5) / 20, (j + 0.5) / 20); gy[n] = q[1]; gb[n++] = Y0 + bend(q[0]); }
      let cov = 0;
      for (let w = 50; w <= 360 && cov < want; w += 10) { let m = 0; for (let k = 0; k < 400; k++) if (gy[k] < gb[k] && gy[k] > gb[k] - w) m++; cov = m / 400; }
      if (cov < 0.2) runnel = false;
    }
    return [['Sand', sand.n], ['Film', film.n], ['Sun', sun.n], ['Sky', skyT.n], ['Swash', swash.n], ['Surface', runnel ? 'Runnel' : rill ? 'Rill-marked' : surf.n], ['Stone', stoneT.n],
      ['Finds', strand ? 'Gravel Strand' : finds.n], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 357 ====
ProtoRolls.add(357, {
  traits: {"Bench":{"look":true,"values":{"Soapstone":319743,"Old teak":260041,"Black epoxy":259764,"Slate":160452}},"Brass":{"look":true,"values":{"Worn brass":400603,"Tarnished":280015,"Bright brass":199376,"Nickel-plated":120006}},"Hose":{"look":true,"values":{"Red rubber":459317,"Black rubber":299927,"Amber latex":240756}},"Light":{"look":true,"values":{"Bench lamp":439721,"Cold lamp":300760,"North window":179906,"Lamp off":79613}},"Gas":{"values":{"Natural gas":537180,"Propane":288624,"Town gas":133982,"Natural gas with a trace of sodium":13619,"Natural gas with a trace of copper":8860,"Propane with a trace of sodium":7259,"Propane with a trace of copper":4878,"Town gas with a trace of sodium":3287,"Town gas with a trace of copper":2311}},"Jet":{"values":{"Standard jet":560929,"Wide jet":259005,"Narrow jet":180066}},"Air":{"look":true,"values":{"Still air":499290,"Slight draught":359975,"Open window":140735}},"Opening":{"look":true,"values":{"Half air":399930,"Safety flame":305281,"Full air":278295,"Lifted":16494}},"View":{"look":true,"values":{"At the collar":354840,"From above":300802,"Whole burner":244379,"On the flame":99979}}},
  roll(hash) {
    const HOME = '0x652f3e67f345c16256bec3b675975b688366e8ffde29f3f3a09d17488ee40fdf';
    const home = hash === HOME, out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const hx = hash.slice(2); let s0 = 0x51ED27A3;
    for (let i = 0; i < 64; i += 8) s0 = (Math.imul(s0 ^ parseInt(hx.slice(i, i + 8), 16), 0x5BD1E995) + 0x2545F491) | 0;
    const rnd = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let r = rnd() * o.reduce((a, b) => a + b[1], 0), v = o[0]; for (const e of o) { r -= e[1]; if (r < 0) { v = e; break; } } return v[0]; };
    const benchN = home ? 'Soapstone' : pick([['Soapstone', 32], ['Black epoxy', 26], ['Old teak', 26], ['Slate', 16]]);
    const brassN = home ? 'Worn brass' : pick([['Worn brass', 40], ['Tarnished', 28], ['Bright brass', 20], ['Nickel-plated', 12]]);
    const hoseN = home ? 'Red rubber' : pick([['Red rubber', 46], ['Black rubber', 30], ['Amber latex', 24]]);
    const lightN = home ? 'Bench lamp' : pick([['Bench lamp', 44], ['Cold lamp', 30], ['North window', 18], ['Lamp off', 8]]);
    const gasN = home ? 'Natural gas' : pick([['Natural gas', 56], ['Propane', 30], ['Town gas', 14]]);
    const jetN = home ? 'Standard jet' : pick([['Standard jet', 56], ['Wide jet', 26], ['Narrow jet', 18]]);
    const airN = home ? 'Still air' : pick([['Still air', 50], ['Slight draught', 36], ['Open window', 14]]);
    let setN = home ? 'Half air' : pick([['Half air', 40], ['Safety flame', 28], ['Full air', 24], ['Lifted', 8]]);
    if (lightN === 'Lamp off' && (setN === 'Full air' || setN === 'Lifted')) setN = 'Safety flame';
    pick([['iron', 74], ['brass', 26]]); if (!home) pick([['white', 40], ['green', 34], ['cream', 26]]);   // base and wall: drawn before the opening
    // ---------- the burner's physics (SI inside solve) ----------
    const GAS = {
      'Natural gas': { rs: 9.52, W: 0.422, eta: 0.15, xi: 5.18, pk: 1.075, lean: 0.5, rich: 1.7, Qmax: 1.9e-5, rmax: 9.4, al: 2.2e-5, sootPhi: 1.6, smoke: 0, ld: 1 },
      Propane: { rs: 23.8, W: 0.446, eta: 0.12, xi: 4.95, pk: 1.08, lean: 0.55, rich: 2.3, Qmax: 0.78e-5, rmax: 23.5, al: 2.2e-5, sootPhi: 1.35, smoke: 1, ld: 0.9 },
      'Town gas': { rs: 4.4, W: 0.95, eta: 0.1, xi: 3.0, pk: 1.15, lean: 0.4, rich: 3.0, Qmax: 3.8e-5, rmax: 4.5, al: 4.5e-5, sootPhi: 2.6, smoke: 0, ld: 0.9 },
    }[gasN];
    const JET = { 'Standard jet': 1, 'Wide jet': 1.15, 'Narrow jet': 0.72 }[jetN], JETQ = { 'Standard jet': 1, 'Wide jet': 1.3, 'Narrow jet': 0.7 }[jetN];
    const RBm = 0.0055, MP = 4, RB = 0.55, ZR = 11.0;
    const RH = 0.33, RT = 0.30, RCO = 0.82, PSIMAX = 1.05;
    function ovl(psi) {
      const r1 = RH, r2 = RT, d = 0.74 * Math.abs(psi);
      if (d >= r1 + r2) return 0; if (d <= r1 - r2) return 1;
      const a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)) + r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2)) - 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
      return a / (Math.PI * r2 * r2);
    }
    function SL(phi) {
      const G = GAS; if (phi < G.lean) return 0;
      let s = G.W * Math.pow(phi, G.eta) * Math.exp(-G.xi * (phi - G.pk) ** 2);
      s *= Math.min(1, (phi - G.lean) / 0.1);
      const tail = phi > G.rich - 0.4 ? 0.11 * Math.exp(-(phi - (G.rich - 0.4)) * 1.6) * Math.max(0, Math.min(1, (G.rich + 1.4 - phi) / 0.5)) : 0;
      if (phi > G.rich) s = 0;
      return Math.max(s, tail);
    }
    // the art's solve without the cone profile (the traits never ask for it)
    function solve(psi, g) {
      const a = Math.max(0.02, ovl(psi)), k = 0.35, f = a / Math.sqrt(a * a + k * k) * Math.sqrt(1 + k * k);
      const Qf = Math.max(1e-9, g * GAS.Qmax * JETQ), Qa = GAS.rmax * JET * f * Qf + 0.01 * GAS.rmax * GAS.Qmax * f;
      const r = Qa / Qf, phi = Math.min(60, GAS.rs / r);
      const Qm = Qf + Qa, U = Qm / (Math.PI * RBm * RBm), gw = U * (MP + 2) / RBm, S = SL(phi);
      const gF = 0.09 * S * S / GAS.al, gB = 0.45 * S * S / GAS.al * (1 + 25 * Math.max(0, phi - 1) ** 2);
      const prem = S > 0.012 ? Math.min(1, (S - 0.012) / 0.05) * (phi > GAS.rich ? Math.max(0, 1 - (phi - GAS.rich) / 1.2) : 1) : 0;
      return { phi, gw, gF, gB, prem };
    }
    const g0 = home ? 0.74 : 0.56 + rnd() * 0.4;
    let psi0 = PSIMAX, gOpen = g0;
    const phiAt = (ps, g) => solve(ps, g).phi;
    if (setN === 'Full air') psi0 = 0;
    else if (setN === 'Half air') {
      const tgt = { 'Natural gas': 2.55, Propane: 2.2, 'Town gas': 2.7 }[gasN];
      let lo = 0, hi = 0.85; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (phiAt(m, g0) < tgt) lo = m; else hi = m; } psi0 = (lo + hi) / 2;
    } else if (setN === 'Lifted') {
      let gl2 = -1; for (let g = 0.5; g <= 1.45; g += 0.02) { const S = solve(0, g); if (S.prem > 0.3 && S.gw > 1.12 * S.gB && S.gw < 1.4 * S.gB) { gl2 = g; break; } }
      if (gl2 > 0) { psi0 = 0; gOpen = gl2 + 0.03; } else { setN = 'Full air'; psi0 = 0; }
    }
    // the opening must hold still for the poster: never inside the flashback or blow-off region
    for (let i = 0; i < 40; i++) { const S = solve(psi0, gOpen); if (S.prem > 0.25 && S.gw < 1.3 * S.gF) { gOpen = Math.min(1.4, gOpen + 0.05); if (gOpen >= 1.4) psi0 = Math.min(PSIMAX, psi0 + 0.06); } else break; }
    // the framing comes from its own stream, so the older rolls keep their values
    let s1 = 0x2F6B3C1D;
    for (let i = 0; i < 64; i += 8) s1 = (Math.imul(s1 ^ parseInt(hx.slice(i, i + 8), 16), 0x27D4EB2F) + 0x165667B1) | 0;
    const rnd3 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vr = rnd3(), v1 = rnd3(), v2 = rnd3(), v3 = rnd3(), v4 = rnd3(), v5 = rnd3();
    // rare (about 4 in 100): a trace of salt on the rim colours one side of the flame, the flame test every pupil remembers
    const v6 = rnd3(), v7 = rnd3(), saltN = !home && v6 < 0.04 ? (v7 < 0.6 ? 'sodium' : 'copper') : '';
    T('Bench', benchN); T('Brass', brassN); T('Hose', hoseN); T('Light', lightN);
    T('Gas', gasN + (saltN ? ' with a trace of ' + saltN : '')); T('Jet', jetN); T('Air', airN); T('Opening', setN);
    // close on the flame only for a sooty opening flame: a bare blue cone that close reads flat
    let viewN = home ? 'At the collar' : vr < 0.45 || (vr >= 0.8 && psi0 < 0.2) ? 'At the collar' : vr < 0.8 ? 'Whole burner' : 'On the flame';
    // from above, off to one side: the burner on its bench with the hose, matches and the lamp's pool (a later draw of the same stream)
    if (!home && v4 < 0.3) viewN = 'From above';
    T('View', viewN);
    return out;
  },
});
// ==== end roll ====

// ==== roll 358 ====
ProtoRolls.add(358, {
  traits: {"Intensity":{"look":true,"values":{"Category 5":283076,"Category 4":207071,"Category 3, ragged eye":188967,"Double eyewall":122490,"Annular":112921,"Category 5, pinhole eye":85475}},"Light":{"look":true,"values":{"Late afternoon":396136,"Mid afternoon":208040,"Last light":166775,"High noon":125189,"Moonlit night":103860}},"Hemisphere":{"values":{"Northern":680122,"Southern":319878}},"Scale":{"look":true,"values":{"Inner core":408689,"Whole storm":306597,"Eye close":284714}},"Eye floor":{"look":true,"values":{"Low cloud swirls":364577,"Clear to the sea":238591,"Cloud-filled":188967,"Mesovortices":133035,"Deep in shadow":74830}},"Shear":{"look":true,"values":{"Light":450819,"Moderate":399742,"Strong":149439}},"Hot towers":{"look":true,"values":{"Many":449690,"Few":400638,"Erupting":149672}},"View":{"values":{"Straight down":699775,"Oblique, from orbit":300225}}},
  roll(hash) {
    const HOME = '0xc3eaf850730c8cc9647c83360335693a41cbc0a21327d1a96ddc42a11c5ad877';   // hashFor(357, 0)
    const home = hash === HOME;
    const rng = (seed) => { let s = seed | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const pick = (R, list) => { let r = R() * list.reduce((a, o) => a + o.w, 0); for (const o of list) { r -= o.w; if (r <= 0) return o; } return list[list.length - 1]; };
    const hs = hash;
    const seed = parseInt(hs.slice(2, 10), 16) ^ Math.imul(parseInt(hs.slice(10, 18), 16), 7) ^ parseInt(hs.slice(50, 58), 16);
    const R = rng(seed);
    const cat = home ? { n: 'Category 5', k: 5 } : pick(R, [
      { n: 'Category 5', k: 5, w: 30 }, { n: 'Category 4', k: 4, w: 22 }, { n: 'Category 3, ragged eye', k: 3, w: 20 },
      { n: 'Double eyewall', k: 2, w: 13 }, { n: 'Annular', k: 1, w: 12 }, { n: 'Category 5, pinhole eye', k: 6, w: 9 }]);
    const lit = home ? { n: 'Late afternoon', el: 24 } : pick(R, [
      { n: 'Late afternoon', el: 22, w: 38 }, { n: 'Mid afternoon', el: 40, w: 20 }, { n: 'High noon', el: 81, w: 12 },
      { n: 'Last light', el: 7, w: 16 }, { n: 'Moonlit night', el: 34, w: 10 }]);
    const hemi = home ? { n: 'Northern' } : pick(R, [{ n: 'Northern', w: 68 }, { n: 'Southern', w: 32 }]);
    const scl = home ? { n: 'Inner core' } : pick(R, [{ n: 'Inner core', w: 40 }, { n: 'Eye close', w: 28 }, { n: 'Whole storm', w: 30 }]);
    const flo = home ? { n: 'Mesovortices', m: 2 } : pick(R, [{ n: 'Low cloud swirls', m: 1, w: 48 }, { n: 'Mesovortices', m: 2, w: 18 }, { n: 'Clear to the sea', m: 0, w: 34 }]);
    const shr = home ? { n: 'Moderate' } : pick(R, [{ n: 'Light', w: 45 }, { n: 'Moderate', w: 40 }, { n: 'Strong', w: 15 }]);
    const tow = home ? { n: 'Many' } : pick(R, [{ n: 'Few', w: 40 }, { n: 'Many', w: 45 }, { n: 'Erupting', w: 15 }]);
    const dimPool = flo.m === 0 && lit.n === 'Last light' && scl.n === 'Eye close' && cat.k !== 3 && cat.k !== 6;
    const floorName = cat.k === 3 ? 'Cloud-filled' : cat.k === 6 && lit.el < 60 ? 'Deep in shadow' : dimPool ? 'Low cloud swirls' : flo.n;
    const R2 = rng(seed ^ 0x358ab1e);
    const obl = !home && R2() < .3;
    return [['Intensity', cat.n], ['Light', lit.n], ['Hemisphere', hemi.n], ['Scale', scl.n], ['Eye floor', floorName], ['Shear', shr.n], ['Hot towers', tow.n],
      ['View', obl ? 'Oblique, from orbit' : 'Straight down']];
  },
});
// ==== end roll ====

// ==== roll 386 ====
ProtoRolls.add(386, {
  traits: {"Brew":{"look":true,"values":{"Filter Coffee":339889,"Espresso":219808,"Black Tea":200292,"Milky Coffee":140305,"Turkish Grounds":99706}},"Flow":{"values":{"Capillary":600165,"Mixed":260084,"Marangoni Eddy":139751}},"Pinning":{"look":true,"values":{"Two Rings":360070,"Single Ring":299483,"Stick-Slip":260452,"Tree Rings":79995}},"Spill":{"look":true,"values":{"Lobed":264926,"Round":232707,"Splash":183052,"Drip Trail":169703,"Twin":149612}},"Glaze":{"look":true,"values":{"Cream Porcelain":339946,"Bone White":260094,"Celadon":180062,"Ironstone":139926,"Speckled Stoneware":79972}},"Crazing":{"look":true,"values":{"Network":420167,"Faint":340226,"Tea-Stained":239607}},"Light":{"look":true,"values":{"North Window":400863,"Morning Sun":319442,"Lamp at Night":160028,"Overcast":119667}},"Old Stains":{"look":true,"values":{"One Old Ring":367962,"Clean":224084,"Many Old Rings":208313,"Cup Ring":199641}},"Standpoint":{"look":true,"values":{"Low Across the Well":499837,"From Above":260423,"Close on the Edge":239740}}},
  roll(hash) {
    const HOME = '0x9f3bcb3cb0539474b04d5526c04cf0896f9e8acc89a2f92bb630320f4ef6925d';
    const c = { hash, home: hash === HOME };
    const hx = c.hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ (s1 >>> 9); s1 = (s2 + (s2 << 3)) | 0; s2 = (s2 << 21) | (s2 >>> 11); s3 = (s3 + 1) | 0; t = (t + s3) | 0; s2 = (s2 + t) | 0; return (t >>> 0) / 4294967296; };
    for (let k = 0; k < 12; k++) rnd();
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[opts.length - 1][0]; };

    let brew = pick([['Filter Coffee', 34], ['Espresso', 22], ['Black Tea', 20], ['Milky Coffee', 14], ['Turkish Grounds', 10]]);
    let flow = pick([['Capillary', 60], ['Mixed', 26], ['Marangoni Eddy', 14]]);
    let pin = pick([['Single Ring', 30], ['Two Rings', 36], ['Stick-Slip', 26], ['Tree Rings', 8]]);
    let shape = pick([['Round', 28], ['Lobed', 32], ['Splash', 22], ['Twin', 18]]);
    let glaze = pick([['Cream Porcelain', 34], ['Bone White', 26], ['Celadon', 18], ['Ironstone', 14], ['Speckled Stoneware', 8]]);
    let craze = pick([['Faint', 34], ['Network', 42], ['Tea-Stained', 24]]);
    let light = pick([['North Window', 40], ['Morning Sun', 32], ['Lamp at Night', 16], ['Overcast', 12]]);
    let hist = pick([['Clean', 28], ['One Old Ring', 46], ['Many Old Rings', 26]]);
    { // variation pass: a separate hash-derived stream leaves a cup's foot ring on some saucers (main rolls untouched)
      let v0 = (parseInt(hx.slice(-8), 16) ^ 0x5bd1e995) | 0;
      const VR = () => { v0 = v0 + 0x6D2B79F5 | 0; let t = Math.imul(v0 ^ v0 >>> 15, 1 | v0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      if (VR() < .2) hist = 'Cup Ring';
      if (VR() < .17) shape = 'Drip Trail';   // second draw of the same stream: a row of drips run off a pour
    }
    // polish pass: a third stream of its own (standpoint, opening moment, pinning defects, idle drops); old rolls stay
    let w0 = (parseInt(hx.slice(-8), 16) ^ 0x2c1b3c6d) + 0x386 | 0;
    const R2 = () => { w0 = w0 + 0x6D2B79F5 | 0; let t = Math.imul(w0 ^ w0 >>> 15, 1 | w0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let k = 0; k < 4; k++) R2();
    const view = c.home ? 'Low Across the Well' : (() => { const u = R2(); return u < 0.5 ? 'Low Across the Well' : u < 0.76 ? 'From Above' : 'Close on the Edge'; })();
    if (c.home) { brew = 'Filter Coffee'; flow = 'Capillary'; pin = 'Two Rings'; shape = 'Lobed'; glaze = 'Cream Porcelain'; craze = 'Network'; light = 'North Window'; hist = 'One Old Ring'; }
    return [['Brew', brew], ['Flow', flow], ['Pinning', pin], ['Spill', shape], ['Glaze', glaze], ['Crazing', craze], ['Light', light], ['Old Stains', hist], ['Standpoint', view]];
  },
});
// ==== end roll ====

// ==== roll 387 ====
ProtoRolls.add(387, {
  traits: {"Metal":{"values":{"Old brass":500192,"Bright brass":240562,"Antique nickel":139700,"Copper":89768,"Blackened":29778}},"Denim":{"look":true,"values":{"Stonewashed":379557,"Raw indigo":280252,"Bleached out":180201,"Washed black":99760,"Hickory stripe":60230}},"Tape":{"look":true,"values":{"Ink navy":440404,"Mustard cotton":220208,"Natural cotton":199578,"Oxblood":99929,"Bottle green":39881}},"Gauge":{"values":{"Number five":559953,"Heavy work":260358,"Fine":179689}},"Light":{"look":true,"values":{"Bench lamp":339836,"North window":280327,"Low sun":159737,"Sun through a blind":140473,"Hard flash":79627}},"Lens":{"look":true,"values":{"Three-quarter":374246,"Wide down the fly":169775,"Low along the chain":139714,"Top-down plate":105511,"Macro on the mesh":80232,"Into the mouth":70215,"Across the teeth":60307}},"Lie":{"values":{"Flat on the bench":825826,"Folded under":174174}},"Wear":{"look":true,"values":{"Oiled and rubbed":459985,"Dry and dull":280145,"Polished by use":179616,"Green in the seams":80254}},"Flaw":{"values":{"Sound":820584,"One tooth missing":109535,"One tooth bent":69881}}},
  roll(hash) {
    const HOME = '0xa896cfdf88e41351cbd9b5797465438740b7e5b37452c274fc403a443bcc79b6';   // hashFor(386, 0)
    const home = hash === HOME;
    const mulberry = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (r, list) => { let s = 0; for (const e of list) s += e[1]; let u = r() * s; for (const e of list) { u -= e[1]; if (u <= 0) return e[0]; } return list[0][0]; };
    let hs = 0; for (let i = 2; i < 66; i += 8) hs = (Math.imul(hs, 31) + parseInt(hash.slice(i, i + 8), 16)) | 0;
    const r = mulberry(hs), out = [], TR = (n, v) => { out.push([n, v]); return v; };
    TR('Metal', home ? 'Old brass' : pick(r, [['Old brass', 50], ['Bright brass', 24], ['Antique nickel', 14], ['Copper', 9], ['Blackened', 3]]));
    TR('Denim', home ? 'Stonewashed' : pick(r, [['Stonewashed', 38], ['Raw indigo', 28], ['Bleached out', 18], ['Washed black', 10], ['Hickory stripe', 6]]));
    TR('Tape', home ? 'Ink navy' : pick(r, [['Ink navy', 44], ['Mustard cotton', 22], ['Natural cotton', 20], ['Oxblood', 10], ['Bottle green', 4]]));
    TR('Gauge', home ? 'Number five' : pick(r, [['Number five', 56], ['Heavy work', 26], ['Fine', 18]]));
    if (!home) pick(r, [['Standard Y', 60], ['Long narrow Y', 26], ['Wide short Y', 14]]);   // Channel: drawn, not listed
    const tLight0 = home ? 'North window' : pick(r, [['North window', 42], ['Bench lamp', 34], ['Low sun', 16], ['Hard flash', 8]]);
    const lens0 = home ? 'Three-quarter' : pick(r, [['Three-quarter', 58], ['Low along the chain', 28], ['Top-down plate', 14]]);
    const rl = mulberry(hs ^ 0x387ca3), lr = rl();
    let lens1 = lr < .17 ? 'Wide down the fly' : lr < .25 ? 'Macro on the mesh' : lens0;
    const r2 = mulberry(hs ^ 0x387c2e);
    if (lens1 === 'Low along the chain' && r2() < 1 / 3) lens1 = 'Into the mouth';
    const rn = mulberry(hs ^ 0x387d6f), nLie = rn(), nSun = rn(), nX = rn();
    const free = !home && tLight0 !== 'Bench lamp';
    TR('Light', free && tLight0 === 'North window' && nSun < 1 / 3 ? 'Sun through a blind' : tLight0);
    if (free && lens1 === 'Three-quarter' && nX < .21) lens1 = 'Across the teeth';
    const tLens = TR('Lens', home ? 'Three-quarter' : lens1);
    TR('Lie', free && (nLie < .19 || tLens === 'Across the teeth') ? 'Folded under' : 'Flat on the bench');
    TR('Wear', home ? 'Oiled and rubbed' : pick(r, [['Oiled and rubbed', 46], ['Dry and dull', 28], ['Polished by use', 18], ['Green in the seams', 8]]));
    TR('Flaw', home ? 'Sound' : pick(r, [['Sound', 82], ['One tooth missing', 11], ['One tooth bent', 7]]));
    return out;
  },
});
// ==== end roll ====

// ==== roll 394 ====
ProtoRolls.add(394, {
  traits: {"Cloud":{"look":true,"values":{"Altocumulus":459901,"Thin cirrocumulus":240148,"Broken patches":220025,"Pollen haze":79926}},"Light":{"look":true,"values":{"Full moon":471275,"Gibbous moon":341690,"Moonrise":116851,"Full moon at dusk":70184}},"Droplets":{"look":true,"values":{"Medium":439645,"Small (wide rings)":300166,"Large (tight rings)":260189}},"Droplet spread":{"look":true,"values":{"Uniform":430509,"Mixed":419450,"Very uniform":150041}},"Silhouette":{"look":true,"values":{"Rooftops":342430,"Pines":293335,"Harbour masts":162007,"None":102286,"Open water":99942}},"Exposure":{"look":true,"values":{"Normal":499669,"Short":280024,"Long":220307}},"Scud":{"values":{"Dark scud":500412,"Clear below":339226,"Heavy scud":160362}},"Lens":{"values":{"Normal":643984,"Telephoto":356016}},"Deck":{"look":true,"values":{"An even deck":367185,"Ranks of billows":230464,"A deck's edge":184118,"A hole in the deck":92034,"No cloud":79926,"Pearl edge":46273}}},
  roll(hash) {
    const HOME = '0x33459d00bd33b8a468e22222805c78de8f722f6f1b3dc5533d7aedb2c3fb20dd';   // hashFor(393, 0): the site's home print
    const home = hash === HOME;
    const sd = (seed, mul, sh) => { let s = seed; for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (s >>> sh); return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const R = sd(0x394c0a7e, 0x85ebca6b, 13);
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const out = [], T = (k, v) => { out.push([k, v]); return v; };
    const cldN = T('Cloud', home ? 'Altocumulus' : pick({ Altocumulus: 46, 'Thin cirrocumulus': 24, 'Broken patches': 22, 'Pollen haze': 8 }));
    const R2 = sd(0x394e1e5a, 0x9e3779b1, 15);
    const lensR = home ? 'Normal' : (R2() < 0.7 ? 'Normal' : 'Telephoto');
    const lensV = cldN === 'Pollen haze' ? 'Telephoto' : lensR;
    const R4 = sd(0x394a0e12, 0x27d4eb2f, 12);
    const FCL = cldN === 'Broken patches' && lensV === 'Telephoto', r4L = R4(), r4S = R4();
    const litR = home ? 'Full moon' : pick({ 'Full moon': 54, 'Gibbous moon': 39, 'Full moon at dusk': 7 });
    const litN = T('Light', !home && !FCL && litR !== 'Full moon at dusk' && r4L < 0.135 ? 'Moonrise' : litR);
    const RISE = litN === 'Moonrise';
    T('Droplets', home ? 'Medium' : pick({ 'Small (wide rings)': 30, Medium: 44, 'Large (tight rings)': 26 }));
    T('Droplet spread', home ? 'Uniform' : pick({ Mixed: 42, Uniform: 43, 'Very uniform': 15 }));
    const silR = home ? 'Rooftops' : pick({ Rooftops: 38, Pines: 30, 'Harbour masts': 18, None: 14 });
    const silV = (cldN === 'Pollen haze' || RISE) && silR === 'None' ? 'Pines' : silR;
    T('Silhouette', home || FCL ? silV : r4S < 0.107 ? 'Open water' : silV);
    T('Exposure', home ? 'Normal' : pick({ Short: 28, Normal: 50, Long: 22 }));
    T('Scud', home ? 'Dark scud' : pick({ 'Clear below': 34, 'Dark scud': 50, 'Heavy scud': 16 }));
    T('Lens', lensV);
    const POL = cldN === 'Pollen haze';
    const R3 = sd(0x394dec4b, 0xc2b2ae35, 14);
    const dkR = (() => { const r = R3(); return r < 0.4 ? 'An even deck' : r < 0.65 ? 'Ranks of billows' : r < 0.85 ? "A deck's edge" : r < 0.95 ? 'A hole in the deck' : 'Pearl edge'; })();
    T('Deck', POL ? 'No cloud' : home ? 'An even deck' : dkR);
    return out;
  },
});
// ==== end roll ====

// ==== roll 405 ====
ProtoRolls.add(405, {
  traits: {"Window":{"look":true,"values":{"Six Over Six":299236,"Four Panes":281530,"Two Panes":193871,"Louvred Shutter":119791,"Leaded Diamonds":105572}},"Sun":{"look":true,"values":{"Morning":460299,"High Sun":380201,"Last Light":159500}},"Dust":{"look":true,"values":{"Fine Haze":419603,"Swept Up":320041,"Lint":180361,"Flour":79995}},"Floor":{"look":true,"values":{"Oak Boards":399935,"Pine Boards":299800,"Painted Boards":200376,"Scrubbed Deal":99889}},"Draught":{"look":true,"values":{"Leaky Sash":400236,"Still Air":399820,"Door Ajar":199944}},"Glass":{"values":{"Clear":520197,"Old Crown":359589,"Cracked Pane":120214}},"Walls":{"look":true,"values":{"Lime White":440735,"Grey Green":299602,"Oxblood":159925,"Bare Plaster":99738}},"Furniture":{"look":true,"values":{"Ladder-back Chair":272915,"Empty Room":220116,"Spindle Chair":189328,"Armchair":100457,"Tall Stool":80395,"Bench":76860,"Child's Chair":59929}},"View":{"look":true,"values":{"Standing":371634,"Crouched by the Light":318526,"Wide from the Door":309840}}},
  roll(hash) {
    const HOME = '0x38ebd911cf05a541c7450821a415051942094fd92998db6a77ef3f2b5974af62';   // hashFor(404, 0)
    const home = hash === HOME;
    const hx = hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ (s1 >>> 9); s1 = (s2 + (s2 << 3)) | 0; s2 = (s2 << 21) | (s2 >>> 11); s3 = (s3 + 1) | 0; t = (t + s3) | 0; s2 = (s2 + t) | 0; return (t >>> 0) / 4294967296; };
    for (let k = 0; k < 12; k++) rnd();
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[opts.length - 1][0]; };
    let win = pick([['Four Panes', 32], ['Six Over Six', 34], ['Two Panes', 22], ['Leaded Diamonds', 12]]);
    let sun = pick([['Morning', 46], ['High Sun', 38], ['Last Light', 16]]);
    let dust = pick([['Fine Haze', 42], ['Swept Up', 32], ['Lint', 18], ['Flour', 8]]);
    let floor = pick([['Oak Boards', 40], ['Pine Boards', 30], ['Painted Boards', 20], ['Scrubbed Deal', 10]]);
    let draught = pick([['Still Air', 40], ['Leaky Sash', 40], ['Door Ajar', 20]]);
    let glass = pick([['Clear', 52], ['Old Crown', 36], ['Cracked Pane', 12]]);
    let walls = pick([['Lime White', 44], ['Grey Green', 30], ['Oxblood', 16], ['Bare Plaster', 10]]);
    let chair = pick([['Ladder-back Chair', 46], ['Spindle Chair', 32], ['Empty Room', 22]]);
    let q0 = parseInt(hx.slice(32, 40) || '9e3779b9', 16) ^ 0x6a09e667, q1 = parseInt(hx.slice(40, 48) || '7f4a7c15', 16) ^ 0x3c6ef372;
    const rnd2 = () => { q0 = Math.imul(q0 ^ q0 >>> 15, 0x2c1b3c6d) + q1 | 0; q1 = Math.imul(q1 ^ q1 >>> 13, 0x297a2d39) ^ q0; q0 ^= q0 >>> 16; return ((q0 ^ q1 >>> 7) >>> 0) / 4294967296; };
    rnd2(); rnd2();
    let view = (() => { const x = rnd2(); return x < 0.36 ? 'Standing' : x < 0.69 ? 'Crouched by the Light' : 'Wide from the Door'; })();
    if (rnd2() < 0.12) win = 'Louvred Shutter';
    if (view === 'Crouched by the Light' && chair === 'Empty Room' && sun === 'Last Light') view = 'Standing';
    if (home) { chair = 'Ladder-back Chair'; win = 'Six Over Six'; sun = 'Morning'; dust = 'Fine Haze'; floor = 'Oak Boards'; draught = 'Leaky Sash'; glass = 'Old Crown'; walls = 'Lime White'; view = 'Standing'; }
    let u0 = parseInt(hx.slice(48, 56) || '85ebca6b', 16) ^ 0x9b0568a5, u1 = parseInt(hx.slice(56, 64) || 'c2b2ae35', 16) ^ 0x5be0cd19;
    const rnd4 = () => { u0 = Math.imul(u0 ^ u0 >>> 15, 0x2c1b3c6d) + u1 | 0; u1 = Math.imul(u1 ^ u1 >>> 13, 0x297a2d39) ^ u0; u0 ^= u0 >>> 16; return ((u0 ^ u1 >>> 7) >>> 0) / 4294967296; };
    rnd4(); rnd4();
    const kindX = rnd4() * 78;
    const kindN = kindX < 10 ? 'Armchair' : kindX < 18 ? 'Tall Stool' : kindX < 26 ? 'Bench' : "Child's Chair";
    if (!home && chair !== 'Empty Room' && kindX < 32 && !(kindN === 'Bench' && win === 'Louvred Shutter' && view === 'Wide from the Door')) chair = kindN;
    return [['Window', win], ['Sun', sun], ['Dust', dust], ['Floor', floor], ['Draught', draught], ['Glass', glass], ['Walls', walls], ['Furniture', chair], ['View', view]];
  },
});
// ==== end roll ====

// ==== roll 413 ====
ProtoRolls.add(413, {
  traits: {"Ground":{"look":true,"values":{"Pale dust track":341446,"Red desert sand":226868,"Grey ash":181641,"Dry riverbed":136732,"Pollen on slate":113313}},"Light":{"values":{"Low sun under the cloud":577725,"Storm grey":313913,"Hail":108362}},"Drops":{"values":{"Big":500018,"Small":250075,"Fat":249907}},"Rain":{"look":true,"values":{"First drops":449700,"Steady":400852,"Downpour coming":149448}},"On the ground":{"look":true,"values":{"Pebbles":272569,"Bare":265005,"Dry leaves":222339,"Footprint":149798,"Ants' nest":90289}},"Wind":{"values":{"Still":549925,"Gusty":450075}},"Before":{"values":{"Dry for weeks":720229,"Yesterday's drops":279771}},"View":{"values":{"Straight down":550204,"Low and raking":249753,"Close":200043}}},
  roll(hash) {
    const HOME = '0x5abf8f4e75324606715a0596b4b1e913cd741e540ebc963ecafeb09441834d36';
    const home = hash === HOME, out = [];
    let s0 = 0x9e3779b9;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
    let rs = s0 || 1;
    const rnd = () => { rs = rs + 0x6D2B79F5 | 0; let t = Math.imul(rs ^ rs >>> 15, 1 | rs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (name, opts, homeI) => {
      let tot = 0; for (const o of opts) tot += o[1];
      let r = rnd() * tot, i = 0;
      for (; i < opts.length - 1; i++) { r -= opts[i][1]; if (r < 0) break; }
      if (home && homeI !== undefined) i = homeI;
      out.push([name, String(opts[i][0])]); return i;
    };
    const ground = pick('Ground', [['Pale dust track', 30], ['Red desert sand', 20], ['Grey ash', 16], ['Dusty flagstone', 0], ['Dry riverbed', 12], ['Pollen on slate', 10]], 0);
    pick('Light', [['Storm grey', 26], ['Low sun under the cloud', 48], ['Hail', 9]], 1);
    pick('Drops', [['Small', 25], ['Big', 50], ['Fat', 25]], 1);
    pick('Rain', [['First drops', 45], ['Steady', 40], ['Downpour coming', 15]], 1);
    const soft = ground <= 2;
    const debOpts = soft ? [['Bare', 22], ['Pebbles', 28], ['Dry leaves', 18], ['Footprint', 20], ["Ants' nest", 12]] : [['Bare', 40], ['Pebbles', 25], ['Dry leaves', 35]];
    pick('On the ground', debOpts, 1);
    pick('Wind', [['Still', 55], ['Gusty', 45]], 0);
    pick('Before', [['Dry for weeks', 72], ["Yesterday's drops", 28]], 0);
    let rs2 = (Math.imul(s0 ^ 0x5bd1e995, 0x27d4eb2f) >>> 0) || 7;
    const R2 = () => { rs2 = rs2 + 0x6D2B79F5 | 0; let t = Math.imul(rs2 ^ rs2 >>> 15, 1 | rs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    R2(); R2(); R2();
    const vr = R2() * 100;
    const viewI = home ? 0 : vr < 55 ? 0 : vr < 80 ? 1 : 2;
    out.push(['View', ['Straight down', 'Low and raking', 'Close'][viewI]]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 414 ====
ProtoRolls.add(414, {
  traits: {"Spray":{"look":true,"values":{"Shower":307492,"Mist":230954,"Jet Fan":200334,"Soaker Hose":161514,"Fog":99706}},"Wall":{"values":{"Old Brick":500135,"Tarred Boards":250049,"Old Render":249816}},"Sun":{"look":true,"values":{"Evening":449448,"Morning":400440,"Last Light":150112}},"Lens":{"values":{"Clear":880042,"Polariser":119958}},"Breeze":{"look":true,"values":{"Light Air":450298,"Still":349758,"Gusty":199944}},"Fitting":{"look":true,"values":{"Brass":419602,"Green Plastic":251513,"Chrome":167371,"None":161514}},"Ground":{"values":{"Gravel":500512,"Flagstones":349682,"Moss":149806}},"View":{"look":true,"values":{"Crouched":316797,"Standing over it":170474,"Stepped back":153164,"The whole bow":146091,"Along the wall":128071,"Down in the wet":85403}},"Wall Feature":{"values":{"Plain":832237,"Garden Door":167763}}},
  roll(hash) {
    const HOME = '0x4535acd9a0ad1e85c238a7c0e01b37350baddd840e16f0bc0dbb3b5bb8b09d03';
    const home = hash === HOME;
    const hx = hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ (s1 >>> 9); s1 = (s2 + (s2 << 3)) | 0; s2 = (s2 << 21) | (s2 >>> 11); s3 = (s3 + 1) | 0; t = (t + s3) | 0; s2 = (s2 + t) | 0; return (t >>> 0) / 4294967296; };
    for (let k = 0; k < 12; k++) rnd();
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[opts.length - 1][0]; };
    let spray = pick([['Shower', 40], ['Mist', 30], ['Jet Fan', 20], ['Fog', 10]]);
    let wall = pick([['Old Brick', 50], ['Tarred Boards', 25], ['Old Render', 25]]);
    let sun = pick([['Evening', 45], ['Morning', 40], ['Last Light', 15]]);
    let lens = pick([['Clear', 88], ['Polariser', 12]]);
    let breeze = pick([['Still', 35], ['Light Air', 45], ['Gusty', 20]]);
    let fitting = pick([['Brass', 50], ['Green Plastic', 30], ['Chrome', 20]]);
    let ground = pick([['Gravel', 50], ['Flagstones', 35], ['Moss', 15]]);
    let v3 = (parseInt(hx.slice(48, 56), 16) ^ 0x5A0C3E1) | 0;
    const r3 = () => { v3 = v3 + 0x6D2B79F5 | 0; let t = Math.imul(v3 ^ v3 >>> 15, 1 | v3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const n3 = []; for (let i = 0; i < 25; i++) n3.push(r3());
    const KEEP = home || hx.startsWith('589ae5dc');
    const SOAK = !KEEP && (spray === 'Shower' || spray === 'Mist') && n3[0] < 0.23;
    if (SOAK) spray = 'Soaker Hose';
    if (home) { spray = 'Shower'; wall = 'Old Brick'; sun = 'Evening'; lens = 'Clear'; breeze = 'Light Air'; fitting = 'Brass'; ground = 'Gravel'; }
    let v0 = (parseInt(hx.slice(40, 48), 16) ^ 0x414C0DE) | 0;
    const rv = () => { v0 = v0 + 0x6D2B79F5 | 0; let t = Math.imul(v0 ^ v0 >>> 15, 1 | v0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let view = (() => { const r = rv(); return r < 0.5 ? 'Crouched' : r < 0.72 ? 'Standing over it' : r < 0.9 ? 'Stepped back' : 'Down in the wet'; })();
    if (home) view = 'Crouched';
    if (!home && view === 'Crouched' && rv() < 0.3) view = 'Along the wall';
    const WHOLE = !KEEP && (SOAK ? n3[1] < 0.5 : (spray === 'Mist' || spray === 'Fog') && n3[1] < 0.2);
    if (WHOLE) view = 'The whole bow';
    if (SOAK && view === 'Standing over it') view = 'Crouched';
    const DOOR = !KEEP && n3[24] < 0.24 && view !== 'Stepped back' && !WHOLE;
    return [['Spray', spray], ['Wall', wall], ['Sun', sun], ['Lens', lens], ['Breeze', breeze], ['Fitting', SOAK ? 'None' : fitting], ['Ground', ground],
      ['View', view], ['Wall Feature', DOOR ? 'Garden Door' : 'Plain']];
  },
});
// ==== end roll ====

// ==== roll 442 ====
ProtoRolls.add(442, {
  traits: {"Sand":{"look":true,"values":{"Quartz and Black Sand":399886,"Garnet Sand":220248,"Pale Silica":200065,"Olivine Grit":99787,"Iron Red":80014}},"Light":{"look":true,"values":{"North Window":439788,"Bench Lamp":260252,"Skylight":220032,"Low Sun Through Blinds":79928}},"Tilt":{"values":{"Gentle":500124,"Moderate":349708,"Steep":150168}},"Flow":{"values":{"Steady":500265,"Trickle":250299,"Pulsing":249436}},"Start":{"look":true,"values":{"Pilot Meander":499707,"Straight Cut":280506,"Two Arms":219787}},"Banks":{"look":true,"values":{"Firm":449916,"Crumbly":399602,"Loose":150482}},"Pebbles":{"look":true,"values":{"None":400533,"One Pebble":399765,"Three Pebbles":199702}},"View":{"values":{"Low and Close":549789,"Straight Down":199794,"At the Water":150534,"From the Header":99883}}},
  roll(hash) {
    const HOME = '0x186a309d1376612315938652166fd17696961c5d7cdadbe320ab40992e64078b';
    const home = hash === HOME;
    function rng(hash, salt) {
      const h = hash.slice(2).padEnd(64, '0');
      const w = k => parseInt(h.slice(k * 8, k * 8 + 8), 16) >>> 0;
      let a = (w(0) ^ Math.imul(salt, 0x9E3779B1) ^ Math.imul(w(4), 0x85EBCA6B)) >>> 0, b = (w(1) ^ Math.imul(w(5), 0xC2B2AE35)) >>> 0;
      let c = (w(2) + salt ^ Math.imul(w(6), 0x27D4EB2F)) >>> 0, d = (w(3) ^ Math.imul(w(7), 0x165667B1)) >>> 0;
      const r = () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = (c << 21 | c >>> 11); d = d + 1 | 0; t = t + d | 0; c = c + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 20; i++) r();
      return r;
    }
    const pick = (r, arr) => { let s = 0; for (const o of arr) s += o.w; let x = r() * s; for (const o of arr) { x -= o.w; if (x < 0) return o; } return arr[arr.length - 1]; };
    const SANDS = [{ n: 'Quartz and Black Sand', w: 40 }, { n: 'Garnet Sand', w: 22 }, { n: 'Pale Silica', w: 20 }, { n: 'Olivine Grit', w: 10 }, { n: 'Iron Red', w: 8 }];
    const LIGHTS = [{ n: 'North Window', w: 44 }, { n: 'Bench Lamp', w: 26 }, { n: 'Skylight', w: 22 }, { n: 'Low Sun Through Blinds', w: 8 }];
    const TILTS = [{ n: 'Gentle', w: 50 }, { n: 'Moderate', w: 35 }, { n: 'Steep', w: 15 }];
    const FLOWS = [{ n: 'Trickle', w: 25 }, { n: 'Steady', w: 50 }, { n: 'Pulsing', w: 25 }];
    const STARTS = [{ n: 'Pilot Meander', w: 50 }, { n: 'Straight Cut', w: 28 }, { n: 'Two Arms', w: 22 }];
    const BANKS = [{ n: 'Firm', w: 45 }, { n: 'Crumbly', w: 40 }, { n: 'Loose', w: 15 }];
    const VIEWS = [{ n: 'Low and Close', w: 55 }, { n: 'Straight Down', w: 20 }, { n: 'At the Water', w: 15 }, { n: 'From the Header', w: 10 }];
    const PEBS = [{ n: 'None', w: 40 }, { n: 'One Pebble', w: 40 }, { n: 'Three Pebbles', w: 20 }];
    const tr = rng(hash, 1);
    let sand = pick(tr, SANDS), light = pick(tr, LIGHTS), tilt = pick(tr, TILTS), flow = pick(tr, FLOWS);
    let start = pick(tr, STARTS), bank = pick(tr, BANKS), peb = pick(tr, PEBS);
    if (home) { sand = SANDS[0]; light = LIGHTS[0]; tilt = TILTS[0]; flow = FLOWS[1]; start = STARTS[0]; bank = BANKS[0]; peb = PEBS[1]; }
    const view = home ? VIEWS[0] : pick(rng(hash, 23), VIEWS);
    return [['Sand', sand.n], ['Light', light.n], ['Tilt', tilt.n], ['Flow', flow.n], ['Start', start.n], ['Banks', bank.n], ['Pebbles', peb.n], ['View', view.n]];
  },
});
// ==== end roll ====

// ==== roll 446 ====
ProtoRolls.add(446, {
  traits: {"Standing":{"look":true,"values":{"Sweating":479982,"Left Standing":250394,"Just Poured":199914,"Forgotten":69710}},"Air":{"values":{"Humid":519829,"Muggy":229550,"Dry":200646,"Tropical":49975}},"Glass":{"look":true,"values":{"Tumbler":499133,"Highball":280539,"Rocks":220328}},"Water":{"look":true,"values":{"Two Thirds":419610,"Full":380141,"Half":200249}},"Ice":{"look":true,"values":{"Three Cubes":439308,"Two Cubes":285589,"Four Cubes":140425,"No Ice":70116,"Ice Sphere":64562}},"Table":{"look":true,"values":{"Oak":360279,"Walnut":319918,"Teak":219776,"Pale Ash":100027}},"Light":{"values":{"Late Sun":500512,"Morning":339734,"Golden Hour":159754}},"Old Rings":{"values":{"Clean":580365,"One Old Ring":319615,"Ring Stains":100020}},"Camera":{"look":true,"values":{"Eye Level":459931,"From Above":299911,"Low and Close":240158}}},
  roll(hash) {
    const HOME = '0xc969765c06d566c00c293db651fe53fc7b9ac8b91384db1bfeb9e4ee970427b2';
    const home = hash === HOME;
    const hx = hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ (s1 >>> 9); s1 = (s2 + (s2 << 3)) | 0; s2 = (s2 << 21) | (s2 >>> 11); s3 = (s3 + 1) | 0; t = (t + s3) | 0; s2 = (s2 + t) | 0; return (t >>> 0) / 4294967296; };
    for (let k = 0; k < 12; k++) rnd();
    const pick = (opts) => { let tot = 0; for (const o of opts) tot += o[1]; let r = rnd() * tot; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[opts.length - 1][0]; };
    let stage = pick([['Just Poured', 20], ['Sweating', 48], ['Left Standing', 25], ['Forgotten', 7]]);
    let air = pick([['Dry', 20], ['Humid', 52], ['Muggy', 23], ['Tropical', 5]]);
    let glassT = pick([['Tumbler', 50], ['Highball', 28], ['Rocks', 22]]);
    let level = pick([['Full', 38], ['Two Thirds', 42], ['Half', 20]]);
    let ice = pick([['Three Cubes', 40], ['Two Cubes', 26], ['Four Cubes', 18], ['Ice Sphere', 9], ['No Ice', 7]]);
    let woodT = pick([['Oak', 36], ['Walnut', 32], ['Teak', 22], ['Pale Ash', 10]]);
    let light = pick([['Late Sun', 50], ['Morning', 34], ['Golden Hour', 16]]);
    let rings = pick([['Clean', 58], ['One Old Ring', 32], ['Ring Stains', 10]]);
    if (home) { stage = 'Sweating'; air = 'Humid'; glassT = 'Tumbler'; level = 'Two Thirds'; ice = 'Three Cubes'; woodT = 'Oak'; light = 'Late Sun'; rings = 'One Old Ring'; }
    if (glassT === 'Rocks' && ice === 'Four Cubes') ice = 'Three Cubes';
    if (glassT === 'Highball' && ice === 'Ice Sphere') ice = 'Two Cubes';
    let cs = (parseInt(hx.slice(40, 48), 16) ^ 0x446ca3e5) | 0;
    const rc = () => { cs = cs + 0x6D2B79F5 | 0; let t = Math.imul(cs ^ cs >>> 15, 1 | cs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const camT = home ? 'Eye Level' : (r => r < 0.3 ? 'From Above' : r < 0.54 ? 'Low and Close' : 'Eye Level')(rc());
    return [['Standing', stage], ['Air', air], ['Glass', glassT], ['Water', level], ['Ice', ice], ['Table', woodT], ['Light', light], ['Old Rings', rings], ['Camera', camT]];
  },
});
// ==== end roll ====

// ==== roll 450 ====
ProtoRolls.add(450, {
  traits: {"Object":{"look":true,"values":{"Diamond":299545,"Ring":259998,"Pointed arch":199317,"Star ring":120768,"Hexagon":120372}},"Material":{"look":true,"values":{"White PLA":400363,"Paper card":219599,"Orange PLA":159678,"Grey resin":139915,"Two-tone":80445}},"Mat":{"look":true,"values":{"Green cutting mat":449759,"Grey cutting mat":220314,"Birch bench":220150,"Black slate":109777}},"Mirror":{"values":{"Clean":500225,"Dusty":320462,"Antique":179313}},"Light":{"look":true,"values":{"North window":450424,"Desk lamp":249477,"Overcast":179880,"Low sun":120219}},"Wall":{"values":{"Standard":500394,"Low":279802,"Tall":219804}},"Camera":{"look":true,"values":{"Standard":210276,"Steep":104708,"Low":104696,"Standard, from the right":77085,"Standard, from the left":62795,"Standard, close":59925,"Steep, from the right":38419,"Low, from the right":38414,"Low, from the left":31900,"Steep, from the left":31316,"Low, close":30422,"Steep, close":30072,"Standard, far":29671,"Standard, from the right, close":21920,"Standard, from the left, close":18057,"Low, far":15234,"Steep, far":15176,"Standard, from the right, far":11001,"Low, from the right, close":10990,"Steep, from the right, close":10877,"Low, from the left, close":9077,"Standard, from the left, far":9038,"Steep, from the left, close":8942,"Steep, from the right, far":5521,"Low, from the right, far":5462,"Low, from the left, far":4515,"Steep, from the left, far":4491}},"Turntable":{"values":{"Birch ply":550657,"Cork":299487,"Black anodised":149856}},"Turn":{"values":{"Facing":712158,"Half turn":168034,"Mid-turn":119808}}},
  roll(hash) {
    const HOME = '0x34357e0e51d9cd01574383f03d437a22a67fbe8f7d303f7fcdd1ed4c8893f817';   // hashFor(449, 0), as runtime.js: c.home
    const home = hash === HOME, out = [];
    const trait = (name, v) => { const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return v; };
    const hx = hash.slice(2);
    let a0 = parseInt(hx.slice(0, 8), 16) >>> 0, a1 = parseInt(hx.slice(8, 16), 16) >>> 0,
      a2 = parseInt(hx.slice(16, 24), 16) >>> 0, a3 = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => {
      a0 >>>= 0; a1 >>>= 0; a2 >>>= 0; a3 >>>= 0;
      const t = (a0 + a1 | 0) + a3 | 0; a3 = a3 + 1 | 0;
      a0 = a1 ^ a1 >>> 9; a1 = a2 + (a2 << 3) | 0; a2 = a2 << 21 | a2 >>> 11; a2 = a2 + t | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 12; i++) rnd();
    const pick = (name, opts, hm) => {
      let tot = 0; for (const o of opts) tot += o[1];
      let r = rnd() * tot, v = opts[opts.length - 1][0];
      for (const o of opts) { if (r < o[1]) { v = o[0]; break; } r -= o[1]; }
      if (home) v = hm;
      return trait(name, v);
    };
    const objT = pick('Object', [['Ring', 50], ['Diamond', 30], ['Pointed arch', 20]], 'Ring');
    pick('Material', [['White PLA', 40], ['Paper card', 22], ['Orange PLA', 16], ['Grey resin', 14], ['Two-tone', 8]], 'White PLA');
    pick('Mat', [['Green cutting mat', 45], ['Grey cutting mat', 22], ['Birch bench', 22], ['Black slate', 11]], 'Green cutting mat');
    pick('Mirror', [['Clean', 50], ['Dusty', 32], ['Antique', 18]], 'Clean');
    pick('Light', [['North window', 45], ['Desk lamp', 25], ['Overcast', 18], ['Low sun', 12]], 'North window');
    pick('Wall', [['Low', 28], ['Standard', 50], ['Tall', 22]], 'Standard');
    const camT = pick('Camera', [['Standard', 50], ['Steep', 25], ['Low', 25]], 'Standard');
    pick('Turntable', [['Birch ply', 55], ['Cork', 30], ['Black anodised', 15]], 'Birch ply');
    let vs = (parseInt(hx.slice(40, 48), 16) ^ 0x68e31da4) | 0;
    const vr = () => { vs = vs + 0x6D2B79F5 | 0; let t = Math.imul(vs ^ vs >>> 15, 1 | vs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const sideR = vr(), turnR = vr();
    let s3 = 0x450c2a11;
    for (let i = 0; i < hx.length; i += 8) s3 = Math.imul(s3 ^ parseInt(hx.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s3 >>> 15);
    const w3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const objR = w3(), distR = w3();
    let objName = objT;
    if (objT === 'Ring' && !home) objName = objR < 0.24 ? 'Hexagon' : objR < 0.48 ? 'Star ring' : 'Ring';
    if (objName !== objT) trait('Object', objName);
    const DIST = home ? 0 : distR < 0.2 ? -1 : distR < 0.3 ? 1 : 0;
    const SIDE = home ? 0 : sideR < 0.6 ? 0 : sideR < 0.82 ? 1 : -1;
    const camName = camT + (SIDE ? (SIDE > 0 ? ', from the right' : ', from the left') : '') + (DIST < 0 ? ', close' : DIST > 0 ? ', far' : '');
    if (camName !== camT) trait('Camera', camName);
    trait('Turn', home ? 'Facing' : turnR < 0.6 ? 'Facing' : turnR < 0.88 ? (SIDE ? 'Facing' : 'Half turn') : 'Mid-turn');
    return out;
  },
});
// ==== end roll ====

// ==== roll 465 ====
ProtoRolls.add(465, {
  traits: {"Setup":{"look":true,"values":{"lone sphere":397670,"sun and earth":277280,"ring current":159154,"ringed sphere":92041,"tipped magnet":73855}},"Gas":{"look":true,"values":{"air":419981,"carbon dioxide":160535,"helium":159370,"argon":140282,"neon":119832}},"Voltage":{"look":true,"values":{"medium":400552,"high":299842,"low":299606}},"Pressure":{"look":true,"values":{"medium":400125,"thin":300447,"dense":299428}},"Sphere":{"values":{"aluminium":500620,"copper":299193,"blackened":200187}},"Room":{"values":{"dark":599678,"red safelight":200649,"lab lamp":199673}},"View":{"values":{"jar view":559899,"close on the oval":259938,"high angle":120107,"grazing":60056}},"Axis":{"values":{"upright":547695,"leaning":232111,"on its side":144012,"toward you":76182}}},
  roll(hash) {
    const HOME = '0x85f73d4430931fe3bfc0579ce2f43518480962e2bf9fb09675cb9ffcfdbe3850';
    const home = hash === HOME, out = [];
    const trait = (n, v) => { const s = String(v), i = out.findIndex(t => t[0] === n); if (i >= 0) out[i][1] = s; else out.push([n, s]); return v; };
    const hx = hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 |= 0; s1 |= 0; s2 |= 0; s3 |= 0; const t = (s0 + s1 | 0) + s3 | 0; s3 = s3 + 1 | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) rnd();
    const pick = (name, opts) => { let tot = 0; for (const o of opts) tot += o[1]; let u = rnd() * tot; for (const o of opts) { u -= o[1]; if (u <= 0) return trait(name, o[0]); } return trait(name, opts[0][0]); };
    let r0 = (parseInt(hx.slice(48, 56), 16) ^ Math.imul(parseInt(hx.slice(56, 64), 16), 0x85ebca6b) ^ 0x465011) | 0;
    const R = () => { r0 = r0 + 0x6D2B79F5 | 0; let t = Math.imul(r0 ^ r0 >>> 15, 1 | r0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const wpick = (o) => { let u = R() * 100; for (const e of o) { u -= e[1]; if (u < 0) return e[0]; } return o[0][0]; };
    const gasR = wpick([['air', 42], ['argon', 14], ['neon', 12], ['helium', 16], ['carbon dioxide', 16]]);
    const axR = wpick([['upright', 46], ['leaning', 22], ['on its side', 20], ['toward you', 12]]);
    const beltR = R() < 16 / 56;
    const setup0 = home ? trait('Setup', 'lone sphere') : pick('Setup', [['lone sphere', 6], ['sun and earth', 3], ['ringed sphere', 1], ['tipped magnet', 0.8]]);
    if (!home) pick('Gas', [['air', 8], ['argon', 1.5], ['neon', 0.8]]);
    trait('Gas', home ? 'air' : gasR);
    if (home) trait('Voltage', 'medium'); else pick('Voltage', [['low', 3], ['medium', 4], ['high', 3]]);
    if (home) trait('Pressure', 'medium'); else pick('Pressure', [['thin', 3], ['medium', 4], ['dense', 3]]);
    if (home) trait('Sphere', 'aluminium'); else pick('Sphere', [['aluminium', 5], ['copper', 3], ['blackened', 2]]);
    if (home) trait('Room', 'dark'); else pick('Room', [['dark', 6], ['red safelight', 2], ['lab lamp', 2]]);
    const BELT = !home && setup0 === 'lone sphere' && beltR;
    if (BELT) trait('Setup', 'ring current');
    const MODE = setup0 === 'lone sphere' ? 0 : setup0 === 'sun and earth' ? 1 : setup0 === 'ringed sphere' ? 2 : 3;
    let q0 = (parseInt(hx.slice(32, 40), 16) ^ Math.imul(parseInt(hx.slice(40, 48), 16), 0x9e3779b1)) | 0;
    const Q = () => { q0 = q0 + 0x6D2B79F5 | 0; let t = Math.imul(q0 ^ q0 >>> 15, 1 | q0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vw = (() => { const o = [['jar view', 56], ['close on the oval', 26], ['high angle', 12], ['grazing', 6]]; let u = Q() * 100; for (const e of o) { u -= e[1]; if (u < 0) return e[0]; } return o[0][0]; })();
    const view = trait('View', home ? 'jar view' : vw);
    trait('Axis', home || view === 'grazing' ? 'upright' : BELT && axR === 'on its side' ? 'leaning' : BELT && axR === 'toward you' ? 'upright' : MODE === 2 && axR === 'toward you' ? 'leaning' : MODE === 3 ? 'upright' : axR);
    return out;
  },
});
// ==== end roll ====

// ==== roll 480 ====
ProtoRolls.add(480, {
  traits: {"Felt":{"look":true,"values":{"Charcoal":279907,"Moss Green":219600,"Oxblood":180389,"Ochre":139905,"Ivory":110489,"Ink Blue":69710}},"Light":{"look":true,"values":{"North Window":380465,"Venetian Sun":259829,"Desk Lamp":219955,"Strip Lights":139751}},"Bubble":{"look":true,"values":{"Medium":459649,"Small":259854,"Large":220581,"Giant":59916}},"Mixture":{"look":true,"values":{"Dish Soap":439757,"Glycerine":280021,"Thin Mix":220079,"Sugar Syrup":60143}},"Frame Rate":{"look":true,"values":{"240 fps":499762,"120 fps":280340,"600 fps":219898}},"Wand":{"look":true,"values":{"Steel Wire":420111,"Brass Ring":260086,"Red Plastic":219776,"Copper Twist":100027}},"Air":{"values":{"Still":550437,"Slow Drift":349825,"Window Draught":99738}},"Nap":{"look":true,"values":{"Fuzzy":499772,"Pressed":340263,"Shaggy":159965}},"Shot":{"look":true,"values":{"Felt level":272039,"Three-quarter":236814,"Close-up":207575,"High angle":88964,"Felt level, on the wand":67990,"Three-quarter, on the wand":59139,"Close-up, on the wand":51964,"High angle, on the wand":15515}}},
  roll(hash) {
    const HOME = '0x43c1e8b4dd24a43deac670e60ca572a751778144798265b558df0190c71cdea6';
    const home = hash === HOME;
    const hx = hash.slice(2);
    let s0 = parseInt(hx.slice(0, 8), 16) | 0, s1 = parseInt(hx.slice(8, 16), 16) | 0, s2 = parseInt(hx.slice(16, 24), 16) | 0, s3 = parseInt(hx.slice(24, 32), 16) | 0;
    const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ (s1 >>> 9); s1 = (s2 + (s2 << 3)) | 0; s2 = (s2 << 21) | (s2 >>> 11); s3 = (s3 + 1) | 0; t = (t + s3) | 0; s2 = (s2 + t) | 0; return (t >>> 0) / 4294967296; };
    for (let k = 0; k < 12; k++) rnd();
    const pick = (o) => { let tot = 0; for (const e of o) tot += e[1]; let r = rnd() * tot; for (const e of o) { r -= e[1]; if (r < 0) return e[0]; } return o[o.length - 1][0]; };
    let felt = pick([['Charcoal', 28], ['Moss Green', 22], ['Oxblood', 18], ['Ochre', 14], ['Ivory', 11], ['Ink Blue', 7]]);
    let light = pick([['North Window', 38], ['Venetian Sun', 26], ['Desk Lamp', 22], ['Strip Lights', 14]]);
    let size = pick([['Small', 26], ['Medium', 46], ['Large', 22], ['Giant', 6]]);
    let mix = pick([['Dish Soap', 44], ['Glycerine', 28], ['Thin Mix', 22], ['Sugar Syrup', 6]]);
    let fps = pick([['120 fps', 28], ['240 fps', 50], ['600 fps', 22]]);
    let wand = pick([['Steel Wire', 42], ['Brass Ring', 26], ['Red Plastic', 22], ['Copper Twist', 10]]);
    let air = pick([['Still', 55], ['Slow Drift', 35], ['Window Draught', 10]]);
    let nap = pick([['Pressed', 34], ['Fuzzy', 50], ['Shaggy', 16]]);
    if (home) { felt = 'Charcoal'; light = 'Venetian Sun'; size = 'Medium'; mix = 'Dish Soap'; fps = '240 fps'; wand = 'Brass Ring'; air = 'Still'; nap = 'Fuzzy'; }
    let cs = (parseInt(hx.slice(56, 64), 16) ^ 0x5bd1e995) | 0;
    const rc2 = () => { cs = (cs + 0x6D2B79F5) | 0; let t = Math.imul(cs ^ (cs >>> 15), 1 | cs); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    let shot = 'Three-quarter';
    { const o = [['Felt level', 28], ['High angle', 12], ['Close-up', 26], ['Three-quarter', 34]]; let r = rc2() * 100; for (const e of o) { r -= e[1]; if (r < 0) { shot = e[0]; break; } } }
    if (home) shot = 'Three-quarter';
    let ms = (parseInt(hx.slice(48, 56), 16) ^ 0x27d4eb2f) | 0;
    ms = (ms + 0x6D2B79F5) | 0; let mt = Math.imul(ms ^ (ms >>> 15), 1 | ms); mt = (mt + Math.imul(mt ^ (mt >>> 7), 61 | mt)) ^ mt;
    let onWand = !home && ((mt ^ (mt >>> 14)) >>> 0) / 4294967296 < 0.2;
    if (onWand && shot === 'High angle' && light === 'Desk Lamp') onWand = false;
    if ((shot === 'High angle' || shot === 'Three-quarter') && (felt === 'Ivory' || felt === 'Ochre') && (light === 'North Window' || light === 'Strip Lights')) shot = 'Felt level';
    return [['Felt', felt], ['Light', light], ['Bubble', size], ['Mixture', mix], ['Frame Rate', fps], ['Wand', wand], ['Air', air], ['Nap', nap], ['Shot', onWand ? shot + ', on the wand' : shot]];
  },
});
// ==== end roll ====

// ==== roll 501 ====
ProtoRolls.add(501, {
  traits: {"Time":{"values":{"Dusk":554573,"Blue hour":361191,"Dawn":84236}},"Clouds":{"look":true,"values":{"Towering cumulus":379402,"Mackerel sky":300326,"Clear":219874,"Storm on the horizon":100398}},"Wind":{"values":{"Patchy ripples":650366,"Glass calm":349634}},"Water":{"values":{"Mirror":679824,"Thin film":239877,"Dry crust and puddles":80299}},"Horizon":{"look":true,"values":{"Islands":419776,"Volcano range":399783,"Nothing":180441}},"Facing":{"look":true,"values":{"Earth's shadow":400050,"Afterglow":379807,"Along the horizon":220143}},"Stance":{"look":true,"values":{"Standing":359634,"Crouched at the waterline":280467,"Looking down into the mirror":240256,"Wide, under the whole sky":119643}},"Visitors":{"values":{"None":954083,"A party of flamingos":22830,"A flock of flamingos":18518,"Thousands of flamingos":4569}}},
  roll(hash) {
    const HOME = '0x3df33d967476982a100261fa91f13fe1014629fbecf024d7f6afeeb87707d895';
    const home = hash === HOME;
    let s0 = 0x501c0de5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const timeN = home ? 'Dusk' : pick({ Dusk: 46, 'Blue hour': 30, Night: 0, Dawn: 7 });
    const cloudN = home ? 'Towering cumulus' : pick({ 'Towering cumulus': 38, 'Mackerel sky': 30, Clear: 22, 'Storm on the horizon': 10 });
    const windN = home ? 'Patchy ripples' : pick({ 'Glass calm': 35, 'Patchy ripples': 65 });
    const waterN = home ? 'Mirror' : pick({ Mirror: 68, 'Thin film': 24, 'Dry crust and puddles': 8 });
    const horN = home ? 'Islands' : pick({ Islands: 42, 'Volcano range': 40, Nothing: 18 });
    const faceN = home ? "Earth's shadow" : pick({ "Earth's shadow": 40, Afterglow: 38, 'Along the horizon': 22 });
    let s1 = 0x5a17e0a3;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const R1 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick1 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R1() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const stanceN = home ? 'Standing' : pick1({ Standing: 36, 'Crouched at the waterline': 28, 'Looking down into the mirror': 24, 'Wide, under the whole sky': 12 });
    let s2 = 0x0f1a3160;
    for (let i = 2; i < 66; i += 8) s2 = Math.imul(s2 ^ parseInt(hash.slice(i, i + 8), 16), 0xcc9e2d51) ^ (s2 >>> 14);
    s2 = Math.imul(s2 ^ s2 >>> 16, 0x85ebca6b); s2 = Math.imul(s2 ^ s2 >>> 13, 0xc2b2ae35); s2 ^= s2 >>> 16;
    const R2 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const visR = R2() * 100, visD = visR < 95 ? 'None' : visR < 97.5 ? 'A party of flamingos' : visR < 99.5 ? 'A flock of flamingos' : 'Thousands of flamingos';
    const visN = home || waterN === 'Dry crust and puddles' ? 'None' : visD;
    return [['Time', timeN], ['Clouds', cloudN], ['Wind', windN], ['Water', waterN], ['Horizon', horN], ['Facing', faceN], ['Stance', stanceN], ['Visitors', visN]];
  },
});
// ==== end roll ====

// ==== roll 502 ====
ProtoRolls.add(502, {
  traits: {"Light":{"values":{"midnight-sun dusk":599746,"overcast blue":240088,"aurora night":100426,"winter snow":59740}},"Bergs":{"values":{"drifting":529547,"packed":249816,"sparse":220637}},"Glacier":{"look":true,"values":{"mid":460349,"near":319323,"far":220328}},"Calls":{"look":true,"values":{"seals":419650,"seals and terns":260002,"quiet":180127,"terns":140221}},"Mist":{"look":true,"values":{"clear":480127,"low mist":399939,"thick mist":119934}},"Ash":{"values":{"ash-banded":549883,"clean ice":280262,"heavy ash":169855}},"Rolled bergs":{"look":true,"values":{"some":499827,"few":300396,"many":199777}},"View":{"look":true,"values":{"From the boat":280303,"Beside a big berg":220156,"Between two bergs":180221,"Down into the brash":139471,"Looking down the lagoon":110223,"Toward the outlet":69626}},"Sky":{"look":true,"values":{"low ceiling":299828,"cloud bars":270263,"clear":180018,"high veil":149465,"clear night":100426}},"Berg":{"look":true,"values":{"Pinnacled":299449,"Tabular":200397,"Tilted":180033,"Blue dome":139902,"Dry-dock":100240,"Striped":50022,"Arch":29957}}},
  roll(hash) {
    const HOME = '0x91d20c25d1aad2c59d45d45c35fe2048a991798009efd9e4bc1eb008b7237b51';   // hashFor(501, 0): the site's home
    const home = hash === HOME;
    const hx = hash.slice(2);
    let sa = parseInt(hx.slice(0, 8), 16) >>> 0, sb = parseInt(hx.slice(8, 16), 16) >>> 0, sc = parseInt(hx.slice(16, 24), 16) >>> 0, sd = parseInt(hx.slice(24, 32), 16) >>> 0;
    const R = () => { sa >>>= 0; sb >>>= 0; sc >>>= 0; sd >>>= 0; let t = (sa + sb) | 0; sa = sb ^ sb >>> 9; sb = sc + (sc << 3) | 0; sc = (sc << 21 | sc >>> 11); sd = sd + 1 | 0; t = t + sd | 0; sc = sc + t | 0; return (t >>> 0) / 4294967296; };
    for (let i = 0; i < 12; i++) R();
    const pick = w => { let s = 0; for (const x of w) s += x; let u = R() * s; for (let i = 0; i < w.length; i++) { u -= w[i]; if (u < 0) return i; } return w.length - 1; };
    const light = home ? 0 : pick([60, 24, 10, 6]);
    const dens = home ? 1 : pick([22, 53, 25]);
    const gdist = home ? 0 : pick([32, 46, 22]);
    const life = home ? 0 : pick([42, 26, 14, 18]);
    const mist = home ? 1 : pick([48, 40, 12]);
    const ashT = home ? 1 : pick([28, 55, 17]);
    const rollT = home ? 1 : pick([30, 50, 20]);
    const mk = v => () => { v = v + 0x6D2B79F5 | 0; let t = Math.imul(v ^ v >>> 15, 1 | v); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let v1 = 0x502ab1e5; for (let i = 2; i < 66; i += 8) v1 = Math.imul(v1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (v1 >>> 15);
    v1 = Math.imul(v1 ^ v1 >>> 16, 0x85ebca6b); v1 = Math.imul(v1 ^ v1 >>> 13, 0xc2b2ae35); v1 ^= v1 >>> 16;
    const R1 = () => { v1 = v1 + 0x6D2B79F5 | 0; let t = Math.imul(v1 ^ v1 >>> 15, 1 | v1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const VIEWS = { 'From the boat': 28, 'Beside a big berg': 22, 'Between two bergs': 18, 'Down into the brash': 14, 'Looking down the lagoon': 11, 'Toward the outlet': 7 };
    const viewN = home ? 'From the boat' : (() => { let r = R1() * 100; for (const k in VIEWS) { r -= VIEWS[k]; if (r < 0) return k; } return 'From the boat'; })();
    const R2 = mk(v1 ^ 0x5e1f00d);   // seeded from v1 after the view's draw
    const skyU = R2();
    const skyS = light === 1 || light === 3 ? 3 : light === 2 ? 0 : home ? 1 : (skyU < 0.3 ? 0 : skyU < 0.75 ? 1 : 2);
    let v3 = 0x502be59; for (let i = 2; i < 66; i += 8) v3 = Math.imul(v3 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (v3 >>> 13);
    v3 = Math.imul(v3 ^ v3 >>> 16, 0x9e3779b1); v3 = Math.imul(v3 ^ v3 >>> 13, 0xc2b2ae35); v3 ^= v3 >>> 16;
    const R3 = mk(v3);
    const BERGS = ['Pinnacled', 'Tabular', 'Tilted', 'Blue dome', 'Dry-dock', 'Striped', 'Arch'];
    const bergK = home ? 0 : (() => { const w = [30, 20, 18, 14, 10, 5, 3]; let u = R3() * 100; for (let i = 0; i < 7; i++) { u -= w[i]; if (u < 0) return i; } return 0; })();
    return [
      ['Light', ['midnight-sun dusk', 'overcast blue', 'aurora night', 'winter snow'][light]],
      ['Bergs', ['sparse', 'drifting', 'packed'][dens]],
      ['Glacier', ['near', 'mid', 'far'][gdist]],
      ['Calls', ['seals', 'seals and terns', 'terns', 'quiet'][life]],
      ['Mist', ['clear', 'low mist', 'thick mist'][mist]],
      ['Ash', ['clean ice', 'ash-banded', 'heavy ash'][ashT]],
      ['Rolled bergs', ['few', 'some', 'many'][rollT]],
      ['View', viewN],
      ['Sky', light === 2 ? 'clear night' : ['clear', 'cloud bars', 'high veil', 'low ceiling'][skyS]],
      ['Berg', BERGS[bergK]],
    ];
  },
});
// ==== end roll ====

// ==== roll 503 ====
ProtoRolls.add(503, {
  traits: {"Storm":{"look":true,"values":{"Mothership":420869,"High-precip green core":259057,"Tornadic rope":219999,"Night storm lit by lightning":100075}},"Light":{"look":true,"values":{"Golden dusk":359961,"Blue hour":204220,"Blue hour, afterglow behind the storm":137072,"Night":100075,"Golden dusk, sun behind the storm":85724,"Last light on the anvil":62050,"Golden dusk, sun under the base":50898}},"Ground":{"look":true,"values":{"Tallgrass":479725,"Wheat stubble":239916,"Ripe wheat":180180,"Burned prairie":100179}},"Landmark":{"look":true,"values":{"Power line":412132,"Windmill":318978,"Lone cottonwood":201565,"Fence only":67325}},"Lightning":{"look":true,"values":{"Cloud-to-ground":386735,"Anvil crawlers":378355,"Bolt from the blue":134835,"Constant flicker":100075}},"Inflow":{"look":true,"values":{"Steady inflow":499665,"Gusty":320248,"Dust lifting":180087}},"Rain shaft":{"values":{"Dark rain":503417,"Sunlit rain":454573,"Rainbow in the rain":42010}},"Framing":{"look":true,"values":{"Storm dead ahead":180748,"Low in the grass":160102,"Down the section road":159677,"Storm off the shoulder":140359,"Long lens on the wall cloud":139807,"Storm passing to one side":119380,"Wide, the whole anvil":99927}},"Form":{"look":true,"values":{"Stacked plates":279463,"Barber pole":199934,"Bell and tail cloud":160582,"Shelf cloud":140075,"Far tower":139902,"Flanking line":80044}},"Sky":{"values":{"Clear":520963,"Other storms":180517,"Streamers":149240,"Scud":119992,"Moonrise":29288}}},
  roll(hash) {
    const HOME = '0x19f193f2f15bf289ac251d73131e1c0cab966a41c8af1b9d6ad913006adaa5bf';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
      let hs = 0;
      for (let i = 2; i < 66; i += 8) hs = (Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x9E3779B1) + 0x7F4A7C15) | 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (opts) => { let u = R(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
    const home = hash === HOME;
      const storm = home ? 'Mothership' : pick([['Mothership', .42], ['High-precip green core', .26], ['Tornadic rope', .22], ['Night storm lit by lightning', .1]]);
      const night = storm.startsWith('Night');
      let time = night ? 'Night' : home ? 'Golden dusk' : pick([['Golden dusk', .62], ['Blue hour', .38]]);
      const ground = home ? 'Tallgrass' : pick([['Tallgrass', .48], ['Wheat stubble', .24], ['Ripe wheat', .18], ['Burned prairie', .1]]);
      const behind = time !== 'Golden dusk' ? 'Clear evening sky' : home ? 'Clear sunset' : pick([['Clear sunset', .7], ['Rainbow in the rain shaft', .3]]);
      // how you frame it: its own stream from the hash, so the rolls above and below stay as they were
      let h1 = 0x503f2a11; for (let i = 2; i < 66; i += 8) h1 = Math.imul(h1 ^ parseInt(hash.slice(i, i + 8), 16), 0x85EBCA6B) ^ (h1 >>> 13);
      const R1 = () => { h1 = h1 + 0x6D2B79F5 | 0; let t = Math.imul(h1 ^ h1 >>> 15, 1 | h1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const FRAMES = [['Storm dead ahead', .18], ['Storm off the shoulder', .14], ['Wide, the whole anvil', .1], ['Low in the grass', .16],
        ['Down the section road', .16], ['Long lens on the wall cloud', .14], ['Storm passing to one side', .12]];
      const frameN = home ? 'Storm dead ahead' : (() => { const u = R1(); let a = 0; for (const [v, w] of FRAMES) { a += w; if (u < a) return v; } return 'Storm passing to one side'; })();
      const fSide = R1() < .5 ? -1 : 1, fM = R1(), fM2 = R1();
      // [yaw offset, pitch, eye height m, half vertical fov deg]
      const FR = { 'Storm dead ahead': [0, .27, 1.45, 34], 'Storm off the shoulder': [fSide * (.36 + .1 * fM), .25, 1.45, 34], 'Wide, the whole anvil': [fSide * (.22 + .08 * fM), .4, 1.45, 45],
        'Low in the grass': [fSide * (.06 + .12 * fM), .47, .72, 38], 'Down the section road': [0, .16, 1.7, 33], 'Long lens on the wall cloud': [0, 0, 1.5, 21],
        'Storm passing to one side': [fSide * (.7 + .15 * fM), .5, 1.45, 38] }[frameN];
      const road = frameN === 'Down the section road', lens = frameN === 'Long lens on the wall cloud', lowCam = frameN === 'Low in the grass';
      // the storm's own form: its own stream (home: today's stacked plates)
      let h2 = 0x503c0f17; for (let i = 2; i < 66; i += 8) h2 = Math.imul(h2 ^ parseInt(hash.slice(i, i + 8), 16), 0xC2B2AE35) ^ (h2 >>> 15);
      const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const FORMS = [['Stacked plates', .28], ['Barber pole', .2], ['Bell and tail cloud', .16], ['Shelf cloud', .14], ['Far tower', .14], ['Flanking line', .08]];
      const fu = R2(), fr = [R2(), R2(), R2(), R2(), R2(), R2()];
      const form = (home ? 'Stacked plates' : (() => { let a = 0; for (const [v, w] of FORMS) { a += w; if (fu < a) return v; } return 'Stacked plates'; })());
      // the sky and the sun's bearing: their own stream (home: clear, side light)
      let h3 = 0x503a5c3d; for (let i = 2; i < 66; i += 8) h3 = Math.imul(h3 ^ parseInt(hash.slice(i, i + 8), 16), 0x27D4EB2F) ^ (h3 >>> 14);
      const R3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const su = R3(), lu = R3(), bu = R3(), sr = [R3(), R3(), R3(), R3()];
      let sky = home ? 'Clear' : (() => { let a = 0; for (const [v, w] of [['Clear', .45], ['Other storms', .18], ['Streamers', .15], ['Scud', .12], ['Moonrise', .1]]) { a += w; if (su < a) return v; } return 'Clear'; })();
      if (sky === 'Moonrise' && time !== 'Blue hour') sky = 'Clear';
      if (sky === 'Moonrise' && form === 'Far tower') sky = 'Clear';     // the far tower, now as wide as a third of the frame, hides the moon
      const lmRoll = home ? 'Windmill' : pick([['Windmill', .38], ['Power line', .3], ['Lone cottonwood', .24], ['Fence only', .08]]);
      const landmark = road ? 'Power line' : lmRoll;
      // rare: the sun already down for the land and the lower storm, its last red light only on the tower top and the anvil
      // (its own draw on the framing stream, so every other roll stays)
      const lastLight = !home && time === 'Golden dusk' && behind === 'Clear sunset' && R1() < .16;
      if (lastLight) time = 'Last light on the anvil';
      // what the rain shaft shows (this trait was "Behind you"; same roll, named for what is seen)
      // a bow shows only when a second draw on the sky stream also says so (about 4 in 100 of all mints)
      const bowRoll = behind.startsWith('Rainbow'), rainbow = bowRoll && bu < .25;
      let sunDir = home || night || lastLight || bowRoll ? 'side' : sky === 'Moonrise' ? 'opposite' : lu < .56 ? 'side' : lu < .82 ? 'behind' : 'under';
      if (time === 'Blue hour' && sunDir === 'under') sunDir = 'behind';
      if (form === 'Far tower' && sunDir === 'under') sunDir = 'side';     // seen from far off the base is a line: no slot to light
      const shaft = rainbow ? 'Rainbow in the rain' : time === 'Golden dusk' ? 'Sunlit rain' : 'Dark rain';
      const habit = night ? 'Constant flicker' : home ? 'Anvil crawlers' : pick([['Anvil crawlers', .42], ['Cloud-to-ground', .43], ['Bolt from the blue', .15]]);
      const inflow = home ? 'Steady inflow' : pick([['Steady inflow', .5], ['Gusty', .32], ['Dust lifting', .18]]);
      // this mint's cloud program (its compile starts here and runs alongside the mint's JS below)
      let CL = null;
      T('Storm', storm); T('Light', time + (sunDir === 'behind' ? (time === 'Blue hour' ? ', afterglow behind the storm' : ', sun behind the storm') : sunDir === 'under' ? ', sun under the base' : '')); T('Ground', ground); T('Landmark', landmark);
      T('Lightning', habit); T('Inflow', inflow); T('Rain shaft', shaft);
      T('Framing', frameN);
      T('Form', form);
      const gt = ground === 'Tallgrass' ? 0 : ground === 'Wheat stubble' ? 1 : ground === 'Ripe wheat' ? 2 : 3;
      T('Sky', sky);

    return out;
  },
});
// ==== end roll ====

// ==== roll 511 ====
ProtoRolls.add(511, {
  traits: {"Light":{"look":true,"values":{"Pink first light":419977,"Gold sunrise":299611,"Before the sun":159885,"Red sun in haze":120527}},"Mist":{"look":true,"values":{"Lying low":449661,"Thin wisps":299319,"Deep blanket":251020}},"Facing":{"look":true,"values":{"Into the sun":420082,"Sun to the side":329999,"Away, moon setting":249919}},"Pools":{"look":true,"values":{"Pool chain":419533,"Scattered pools":360419,"One wide lochan":220048}},"Cotton grass":{"look":true,"values":{"Drifts":499783,"Sparse":279590,"White field":220627}},"Far side":{"look":true,"values":{"Low hills":379705,"Forest edge":300684,"Far mountains":200033,"Open to the sky":119578}},"Pines":{"values":{"A few":519896,"Scattered":299895,"None":180209}},"Calling":{"values":{"Curlew":550263,"Snipe":329733,"Golden plover":120004}},"View":{"values":{"On a hummock":649190,"Crouched at the pool edge":269641,"Looking down into a pool":81169}},"Season":{"look":true,"values":{"Cotton-grass June":498893,"Heather in bloom":220546,"Autumn rust":220166,"Hoar frost":60395}},"Sky":{"values":{"Clear":580791,"Mackerel sky":269559,"Overcast lifting":149650}}},
  roll(hash) {
    const HOME = '0xddd30727e031ac9c822ba1c254a768e11db82fe68df2aa9293a2144a96ebae3d';
    const home = hash === HOME;
    const seed = (s, m, sh) => { for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (s >>> sh); return s; };
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pk = (r, o) => { let tot = 0; for (const k in o) tot += o[k]; let x = r() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const R = mk(seed(0x511b0ad5, 0x85ebca6b, 13)), pick = o => pk(R, o);
    const lightN = home ? 'Pink first light' : pick({ 'Pink first light': 42, 'Gold sunrise': 30, 'Before the sun': 16, 'Red sun in haze': 12 });
    const mistN = home ? 'Lying low' : pick({ 'Lying low': 45, 'Thin wisps': 30, 'Deep blanket': 25 });
    const faceN = home ? 'Into the sun' : pick({ 'Into the sun': 42, 'Sun to the side': 33, 'Away, moon setting': 25 });
    const poolN = home ? 'Pool chain' : pick({ 'Pool chain': 42, 'Scattered pools': 36, 'One wide lochan': 22 });
    const cotN = home ? 'Drifts' : pick({ Sparse: 28, Drifts: 50, 'White field': 22 });
    const farN = home ? 'Low hills' : pick({ 'Low hills': 38, 'Forest edge': 30, 'Far mountains': 20, 'Open to the sky': 12 });
    const pineN = home ? 'A few' : pick({ None: 18, 'A few': 52, Scattered: 30 });
    const birdN = home ? 'Curlew' : pick({ Curlew: 55, Snipe: 33, 'Golden plover': 12 });
    const R2 = mk(seed(0x0b0951d1, 0xc2b2ae35, 15));
    const view0 = home ? 'On a hummock' : pk(R2, { 'On a hummock': 55, 'Crouched at the pool edge': 27, 'Looking down into a pool': 18 });
    const R3 = mk(seed(0x5ea50b06, 0x27d4eb2f, 14));
    const keepDown = R3() < 0.45;
    const viewN = view0 === 'Looking down into a pool' && !keepDown ? 'On a hummock' : view0;
    const seasonN = home ? 'Cotton-grass June' : pk(R3, { 'Cotton-grass June': 50, 'Heather in bloom': 22, 'Autumn rust': 22, 'Hoar frost': 6 });
    const skyN = home ? 'Clear' : pk(R3, { Clear: 58, 'Mackerel sky': 27, 'Overcast lifting': 15 });
    return [['Light', lightN], ['Mist', mistN], ['Facing', faceN], ['Pools', poolN], ['Cotton grass', cotN], ['Far side', farN], ['Pines', pineN], ['Calling', birdN], ['View', viewN], ['Season', seasonN], ['Sky', skyN]];
  },
});
// ==== end roll ====

// ==== roll 513 ====
ProtoRolls.add(513, {
  traits: {"Cave":{"values":{"One big vault":580159,"Long tunnel":300144,"Emerald cave":119697}},"Sea":{"look":true,"values":{"Gentle swell":469044,"Glassy calm":280753,"Swell surging":250203}},"Hour":{"values":{"Midday glow":719892,"Afternoon shaft":280108}},"Rock":{"values":{"Grey limestone":549984,"Ochre limestone":300568,"Dark dolomite":149448}},"Floor":{"values":{"Pale sand":650033,"Boulders and sand":349967}},"Arch":{"values":{"Low arch":799998,"Twin arches":200002}},"Outside":{"values":{"Midday sea":840291,"Grey day":99962,"Sunset":59747}},"Water":{"values":{"Clear azure":704430,"Milky turquoise":175873,"Emerald":119697}},"Standpoint":{"look":true,"values":{"On the ledge":399689,"Low on the water":280637,"At the arch, looking in":199812,"Close under the arch":119862}}},
  roll(hash) {
    const HOME = '0xe67146409ac1938fb7e52a4ddf7e4a36f53b3484c579de4439842d94052abea8';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME;
    const mk = h => () => { h = h + 0x6D2B79F5 | 0; let t = Math.imul(h ^ h >>> 15, 1 | h); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const seed = (h, m) => { for (let i = 2; i < hash.length; i += 8) h = Math.imul(h ^ parseInt(hash.slice(i, i + 8), 16), m) >>> 0; return h; };
    const R = mk(seed(0x9e3779b9, 0x85ebca6b));
    const pk = (r, o) => { let s = 0; for (const k in o) s += o[k]; let x = r() * s; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    let caveT = pk(R, { 'One big vault': 58, 'Long tunnel': 30, 'Emerald cave': 12 });
    let seaT = pk(R, { 'Glassy calm': 28, 'Gentle swell': 47, 'Swell surging': 25 });
    let hourT = pk(R, { 'Midday glow': 72, 'Afternoon shaft': 28 });
    let rockT = pk(R, { 'Grey limestone': 55, 'Ochre limestone': 30, 'Dark dolomite': 15 });
    let floorT = pk(R, { 'Pale sand': 65, 'Boulders and sand': 35 });
    let archT = pk(R, { 'Low arch': 80, 'Twin arches': 20 });
    if (home) { caveT = 'One big vault'; seaT = 'Gentle swell'; hourT = 'Midday glow'; rockT = 'Grey limestone'; floorT = 'Pale sand'; archT = 'Low arch'; }
    const RB = mk(seed(0x2c1b3c6d, 0x1b873593));
    let outT = pk(RB, { 'Midday sea': 84, 'Grey day': 10, 'Sunset': 6 });
    let watT = pk(RB, { 'Clear azure': 80, 'Milky turquoise': 20 });
    if (home) { outT = 'Midday sea'; watT = 'Clear azure'; }
    if (caveT === 'Emerald cave') watT = 'Emerald';
    const RV = mk(seed(0x51394d2b, 0xcc9e2d51));
    const SW = { 'On the ledge': 40, 'Low on the water': 28, 'At the arch, looking in': 20, 'Close under the arch': 12 };
    let standT = 'On the ledge';
    { let s = 0; for (const k in SW) s += SW[k]; let r = RV() * s; for (const k in SW) { r -= SW[k]; if (r < 0) { standT = k; break; } } }
    if (home) standT = 'On the ledge';
    return [['Cave', caveT], ['Sea', seaT], ['Hour', hourT], ['Rock', rockT], ['Floor', floorT], ['Arch', archT], ['Outside', outT], ['Water', watT], ['Standpoint', standT]];
  },
});
// ==== end roll ====

// ==== roll 515 ====
ProtoRolls.add(515, {
  traits: {"Site":{"values":{"Highland plain":520796,"Mare and rille":354476,"Polar crater rim":124728}},"Sun":{"look":true,"values":{"Low raking":308727,"Mid morning":241100,"On the horizon":187027,"High and flat":137563,"Grazing":97680,"Below the horizon":27903}},"Earth":{"look":true,"values":{"Half":385297,"Crescent":277744,"Gibbous":224657,"Full":91989,"Eclipse":20313}},"Mountains":{"look":true,"values":{"Massifs":443796,"Low hills":288546,"Valley walls":192570,"Far rims":75088}},"Rocks":{"look":true,"values":{"Scattered":480174,"Boulder field":270740,"Sparse":169637,"Great boulder":79449}},"Crater":{"look":true,"values":{"Mature":399401,"Fresh":340554,"Ancient":260045}},"Tracks":{"values":{"Boot prints":820633,"Rover tracks":179367}},"View":{"values":{"Earth over the massifs":540121,"Earth to one side":270543,"Over the crater":123495,"Earthrise":65841}},"Light":{"values":{"Sunlit":764757,"Sun on the horizon":187027,"Earthlight":27903,"Eclipsed":20313}},"Ground":{"values":{"Grey regolith":799641,"Bright ray":100262,"Dark mantle":69845,"Orange soil":30252}}},
  roll(hash) {
    const HOME = '0x0d02ad33fdece3edf9b18a965eae44bf3e3d5fa4923f27b2214b014f2c337711';
    const home = hash === HOME, out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    let s0 = 0x515e0a71;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const siteN = T('Site', home ? 'Highland plain' : pick({ 'Highland plain': 50, 'Mare and rille': 34, 'Polar crater rim': 12 }));
    const polar = siteN === 'Polar crater rim';
    T('Sun', polar ? 'Grazing' : home ? 'Low raking' : pick({ 'Low raking': 45, 'Mid morning': 35, 'High and flat': 20 }));
    let earthN = T('Earth', home ? 'Half' : pick({ Half: 36, Crescent: 26, Gibbous: 22, Full: 9, Eclipse: 5 }));
    T('Mountains', home ? 'Massifs' : pick(polar ? { 'Far rims': 60, Massifs: 40 } : { Massifs: 45, 'Valley walls': 22, 'Low hills': 33 }));
    T('Rocks', home ? 'Boulder field' : pick({ Scattered: 48, 'Boulder field': 27, Sparse: 17, 'Great boulder': 8 }));
    T('Crater', home ? 'Fresh' : pick({ Fresh: 34, Mature: 40, Ancient: 26 }));
    T('Tracks', home ? 'Boot prints' : pick({ 'Boot prints': 82, 'Rover tracks': 18 }));
    let s1 = 0x0e7a15e5;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const viewW = polar ? { 'Earth over the massifs': 66, 'Earth to one side': 34 } : earthN === 'Eclipse' ? { 'Earth over the massifs': 56, 'Earth to one side': 28, 'Over the crater': 16 } : { 'Earth over the massifs': 52, 'Earth to one side': 26, 'Over the crater': 14, Earthrise: 8 };
    const viewN = T('View', home ? 'Earth over the massifs' : (() => { let tot = 0; for (const k in viewW) tot += viewW[k]; let r = R2() * tot; for (const k in viewW) { r -= viewW[k]; if (r < 0) return k; } return 'Earth over the massifs'; })());
    const rise = viewN === 'Earthrise';
    if (rise && earthN === 'Crescent') earthN = T('Earth', 'Half');
    let s3 = 0x3a7c5f15;
    for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0xc2b2ae35) ^ (s3 >>> 14);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r3 = [R3(), R3(), R3(), R3(), R3(), R3(), R3()];
    const pick3 = (o, u) => { let tot = 0; for (const k in o) tot += o[k]; let r = u * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const eclConv = earthN === 'Eclipse' && r3[0] >= 0.4;
    if (eclConv) earthN = T('Earth', 'Crescent');
    const lightN = T('Light', earthN === 'Eclipse' ? 'Eclipsed' : home ? 'Sunlit' : (() => { const v = pick3({ Sunlit: 78, 'Sun on the horizon': 18, Earthlight: 4 }, r3[5]); return v === 'Earthlight' && earthN === 'Crescent' ? 'Sun on the horizon' : v; })());
    T('Ground', home ? 'Grey regolith' : pick3({ 'Grey regolith': 80, 'Bright ray': 10, 'Dark mantle': 7, 'Orange soil': 3 }, r3[6]));
    const hzn = lightN === 'Sun on the horizon', eLit = lightN === 'Earthlight';
    if (hzn) T('Sun', 'On the horizon'); else if (eLit) T('Sun', 'Below the horizon');
    return out;
  },
});
// ==== end roll ====

// ==== roll 519 ====
ProtoRolls.add(519, {
  traits: {"Spouts":{"look":true,"values":{"Two, one forming":439395,"One":273450,"One, roping out":147419,"A family of three":139736}},"Light":{"look":true,"values":{"Gold gap under the deck":390171,"Sunset behind the funnel":233290,"High sun":220378,"Overcast":156161}},"Sea":{"look":true,"values":{"Light chop":402486,"Glass":380546,"Wind-streaked":216968}},"Rain":{"values":{"Shafts nearby":579767,"Heavy squall curtain":269678,"Dry line":150555}},"Lightning":{"values":{"None":850129,"Lightning in the line":149871}},"View":{"values":{"Under the deck":580095,"Close to the spout":419905}},"Funnel":{"look":true,"values":{"Slender":399565,"Broad cone":320123,"Needle":280312}},"Lean":{"look":true,"values":{"Leaning":449774,"Upright":349855,"Bowed far over":200371}},"Cloud base":{"look":true,"values":{"Mid":400055,"Low and close":300832,"High and far":299113}},"Waters":{"values":{"Open sea":550296,"Turquoise shallows":250009,"Steel-grey cold sea":120070,"Off a far coast":79625}},"Vortex":{"values":{"Ordinary":909927,"Sheathed":50054,"Thick trunk":40019}}},
  roll(hash) {
    const HOME = '0xea5241921b0c618e07b4eff7c599b813b72ef2569ae4644b4f1ec5edeb283f8c';   // hashFor(518, 0)
    const home = hash === HOME;
    const stream = (h0, mul, add) => {
      let h = h0;
      for (let i = 2; i < 66; i += 8) h = (Math.imul(h ^ parseInt(hash.slice(i, i + 8), 16), mul) + add) | 0;
      const R = () => { h = h + 0x6D2B79F5 | 0; let t = Math.imul(h ^ h >>> 15, 1 | h); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (opts) => { let u = R(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
      return [R, pick];
    };
    const [, pick] = stream(0, 0x9E3779B1, 0x7F4A7C15);
    const [R2] = stream(0x519, 0x85EBCA6B, 0x1B873593);
    let spoutsT = home ? 'Two, one forming' : pick([['One', .42], ['Two, one forming', .44], ['A family of three', .14]]);
    if (spoutsT === 'One' && R2() < .35) spoutsT = 'One, roping out';
    const light = home ? 'Gold gap under the deck' : pick([['Gold gap under the deck', .5], ['Overcast', .2], ['Sunset behind the funnel', .3]]);
    const seaT = home ? 'Light chop' : pick([['Light chop', .62], ['Glass', .38]]);
    const rainT = home ? 'Shafts nearby' : pick([['Shafts nearby', .58], ['Heavy squall curtain', .27], ['Dry line', .15]]);
    const bolts = home ? 'None' : pick([['None', .85], ['Lightning in the line', .15]]);
    const [R3, pick3] = stream(0x5193, 0xC2B2AE35, 0x27D4EB2F);
    const windyT = !home && seaT !== 'Glass' && R3() < .35;
    const u2 = R2(), viewT = home ? 'Under the deck' : u2 < .58 ? 'Under the deck' : 'Close to the spout';
    const funT = home ? 'Slender' : pick3([['Needle', .28], ['Slender', .4], ['Broad cone', .32]]);
    const leanT = home ? 'Leaning' : pick3([['Upright', .35], ['Leaning', .45], ['Bowed far over', .2]]);
    const baseT = home ? 'Mid' : pick3([['Low and close', .3], ['Mid', .4], ['High and far', .3]]);
    const [R4, pick4] = stream(0x5194, 0x27D4EB2F, 0x165667B1);
    const watersT = home ? 'Open sea' : pick4([['Open sea', .55], ['Turquoise shallows', .25], ['Steel-grey cold sea', .12], ['Off a far coast', .08]]);
    const hi = !home && R4() < .22;
    const vortexT = home ? 'Ordinary' : pick4([['Ordinary', .91], ['Sheathed', .05], ['Thick trunk', .04]]);
    return [['Spouts', spoutsT], ['Light', hi ? 'High sun' : light], ['Sea', windyT ? 'Wind-streaked' : seaT], ['Rain', rainT], ['Lightning', bolts],
      ['View', viewT], ['Funnel', funT], ['Lean', leanT], ['Cloud base', baseT], ['Waters', watersT], ['Vortex', vortexT]];
  },
});
// ==== end roll ====

// ==== roll 522 ====
ProtoRolls.add(522, {
  traits: {"Weather":{"values":{"Methane drizzle":500058,"Calm haze":360301,"Squall":139641}},"Light":{"values":{"Titan day":721523,"Dim twilight":278477}},"Shore":{"values":{"Ice-cobble beach":560310,"Dark sand shore":339451,"Ethane rime":100239}},"Sea":{"values":{"Slow swell":655466,"Calm glass":344534}},"Haze":{"values":{"Thick orange":660147,"Low brown murk":259850,"Thin patch, Saturn":80003}},"Coast":{"look":true,"values":{"Far headland":480863,"Two islands":259637,"Open sea":259500}},"Dunes":{"values":{"Linear dunes":620016,"Tall dune wall":240353,"Low hummocks":139631}},"View":{"values":{"Out to sea":600526,"Along the shore":399474}}},
  roll(hash) {
    const HOME = '0xcdf03e2c24f8f75a517664bfbaa6ac9dd1d4380756eb717b426d400974fa1e23';
    const home = hash === HOME, out = [];
    const c = { hash, trait(n, v) { out.push([n, String(v)]); return v; } };
    let s0 = 0x522c0de5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    // a second stream from the hash for the newer traits, so every older roll stays where it was
    let s1 = 0x5a1e7a22;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick2 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const weather0 = home ? 'Methane drizzle' : pick({ 'Calm haze': 36, 'Methane drizzle': 50, 'Squall': 14 });
    const weatherN = c.trait('Weather', weather0);
    const storm = weatherN === 'Squall', calm = weatherN === 'Calm haze';
    const timeN = c.trait('Light', home ? 'Titan day' : pick({ 'Titan day': 72, 'Dim twilight': 28 }));
    const twi = timeN === 'Dim twilight';
    const shoreN = c.trait('Shore', home ? 'Ice-cobble beach' : pick({ 'Ice-cobble beach': 56, 'Dark sand shore': 34, 'Ethane rime': 10 }));
    const sandy = shoreN === 'Dark sand shore', rime = shoreN === 'Ethane rime';
    const seaN = c.trait('Sea', home ? 'Slow swell' : storm ? 'Slow swell' : pick({ 'Calm glass': 40, 'Slow swell': 60 }));
    const glass = seaN === 'Calm glass';
    const hazeN = c.trait('Haze', home ? 'Thick orange' : pick({ 'Thick orange': 66, 'Low brown murk': 26, 'Thin patch, Saturn': 8 }));
    const saturn = hazeN === 'Thin patch, Saturn', murk = hazeN === 'Low brown murk';
    const coastN = c.trait('Coast', home ? 'Far headland' : pick({ 'Far headland': 48, 'Two islands': 26, 'Open sea': 26 }));
    const duneN = c.trait('Dunes', home ? 'Linear dunes' : pick({ 'Linear dunes': 62, 'Tall dune wall': 24, 'Low hummocks': 14 }));
    const viewN = c.trait('View', home ? 'Out to sea' : pick2({ 'Out to sea': 60, 'Along the shore': 40 }));
    return out;
  },
});
// ==== end roll ====

// ==== roll 524 ====
ProtoRolls.add(524, {
  traits: {"Time":{"values":{"Sunset":550841,"Afternoon":329194,"Night lightning":119965}},"Deck":{"look":true,"values":{"Rolls":450403,"Cells":349972,"Towers":199625}},"Rifts":{"look":true,"values":{"Few breaks":449761,"Rifts":400147,"Great chasm":150092}},"Haze":{"values":{"Clear":599876,"Thick":400124}},"Wind":{"values":{"Steady":600713,"Fast jet":399287}},"Facing":{"look":true,"values":{"Sunward":411774,"Across the light":367870,"Glory side":220356}},"Earth":{"values":{"Hidden":906589,"Earth and Moon":93411}},"Altitude":{"values":{"High above the deck":619571,"Skimming the tops":280359,"Among the tops":100070}}},
  roll(hash) {
    const HOME = '0x8a079b2c53129914716926fed1bc4f2c248fe3676016d2e7d16c03e8cf7fec6c';   // hashFor(523, 0)
    const home = hash === HOME;
    let hs = 0;
    for (let i = 2; i < 66; i += 8) hs = (Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x9E3779B1) + 0x7F4A7C15) | 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (opts) => { let u = R(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
    const time = home ? 'Sunset' : pick([['Sunset', .55], ['Afternoon', .33], ['Night lightning', .12]]);
    const deck = home ? 'Rolls' : pick([['Rolls', .45], ['Cells', .35], ['Towers', .2]]);
    const rift = home ? 'Rifts' : pick([['Few breaks', .45], ['Rifts', .4], ['Great chasm', .15]]);
    const haze = home ? 'Clear' : pick([['Clear', .6], ['Thick', .4]]);
    const wind = home ? 'Steady' : pick([['Steady', .6], ['Fast jet', .4]]);
    const night = time === 'Night lightning', aft = time === 'Afternoon';
    const view = home ? 'Sunward' : pick(night ? [['Sunward', .5], ['Across the light', .5]] : [['Sunward', .4], ['Across the light', .35], ['Glory side', .25]]);
    const earth = !aft && !home && R() < .14;
    let hv = 0x2a17524b;
    for (let i = 2; i < 66; i += 8) hv = (Math.imul(hv ^ parseInt(hash.slice(i, i + 8), 16), 0x85EBCA6B) + 0x632BE59B) | 0;
    const Rh = () => { hv = hv + 0x6D2B79F5 | 0; let t = Math.imul(hv ^ hv >>> 15, 1 | hv); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const altN = home ? 'High above the deck' : (() => { const u = Rh(); return u < .62 ? 'High above the deck' : u < .9 ? 'Skimming the tops' : 'Among the tops'; })();
    return [['Time', time], ['Deck', deck], ['Rifts', rift], ['Haze', haze], ['Wind', wind], ['Facing', view], ['Earth', earth ? 'Earth and Moon' : 'Hidden'], ['Altitude', altN]];
  },
});
// ==== end roll ====

// ==== roll 529 ====
ProtoRolls.add(529, {
  traits: {"Hole":{"values":{"Round":549925,"Canal":329995,"Cluster of three":120080}},"Light":{"values":{"Sunset":500499,"Late afternoon":399446,"Moonlit night":100055}},"Deck":{"look":true,"values":{"Altocumulus":499180,"Cirrocumulus":350474,"Wave rows":150346}},"Ice optics":{"values":{"Faint halo":549951,"Bright halo":330104,"Sundogs":107795,"Moondogs":12150}},"Virga":{"values":{"Jellyfish":551499,"Long trails":299089,"Faded":149412}},"Sea":{"values":{"Calm":650630,"Light chop":349370}},"Coast":{"look":true,"values":{"Dune shore":499894,"Rocky headland":349704,"Open flats":150402}},"View":{"values":{"Out to sea":550400,"Looking up":249527,"Along the shore":200073}},"Cover":{"values":{"Broken":500350,"Rafts":250310,"Closed":249340}}},
  roll(hash) {
    const HOME = '0x3f8c48639abb8dd842e065f97b67aba1a5642f5a7d9a9d784c6f4bdda5e7f91e';   // hashFor(528, 0)
    const home = hash === HOME;
    let s0 = 0; for (let i = 2; i < 66; i += 8) s0 = (s0 ^ parseInt(hash.slice(i, i + 8), 16)) + 0x9e3779b9 | 0;
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const holeN = home ? 'Round' : pick({ Round: 55, 'Canal': 33, 'Cluster of three': 12 });
    const timeN = home ? 'Sunset' : pick({ Sunset: 50, 'Late afternoon': 40, 'Moonlit night': 10 });
    const deckN = home ? 'Altocumulus' : pick({ Altocumulus: 50, Cirrocumulus: 35, 'Wave rows': 15 });
    const opticsN = home ? 'Faint halo' : pick({ 'Faint halo': 55, 'Bright halo': 33, Sundogs: 12 });
    const virgaN = home ? 'Jellyfish' : pick({ Jellyfish: 55, 'Long trails': 30, 'Faded': 15 });
    const seaN = home ? 'Calm' : pick({ Calm: 65, 'Light chop': 35 });
    const coastN = home ? 'Dune shore' : pick({ 'Dune shore': 50, 'Rocky headland': 35, 'Open flats': 15 });
    let h2 = 0x529d1e57;
    for (let i = 2; i < 66; i += 8) h2 = Math.imul(h2 ^ parseInt(hash.slice(i, i + 8), 16), 0xcc9e2d51) >>> 0;
    const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const vr = R2(), viewN = home ? 'Out to sea' : vr < .55 ? 'Out to sea' : vr < .8 ? 'Looking up' : 'Along the shore';
    const cr = R2();
    const coverN = home ? 'Broken' : cr < .5 ? 'Broken' : cr < .75 ? 'Closed' : 'Rafts';
    return [['Hole', holeN], ['Light', timeN], ['Deck', deckN], ['Ice optics', timeN === 'Moonlit night' && opticsN === 'Sundogs' ? 'Moondogs' : opticsN],
      ['Virga', virgaN], ['Sea', seaN], ['Coast', coastN], ['View', viewN], ['Cover', coverN]];
  },
});
// ==== end roll ====

// ==== roll 531 ====
ProtoRolls.add(531, {
  traits: {"Fire":{"values":{"Pyrocumulus":691391,"Smoke plume, no cap":269559,"Pyrocumulonimbus with lightning":39050}},"Hour":{"look":true,"values":{"Golden evening":438728,"Dusk":240864,"Afternoon":220139,"Last light, fire glowing":70117,"Night":30152}},"Wind":{"look":true,"values":{"Strong lean":432946,"Moderate":386949,"Calm, straight up":180105}},"Haze":{"values":{"Clear upwind":649795,"Smoky everywhere":350205}},"Light":{"values":{"Side-lit":558198,"Backlit, red sun in the smoke":257956,"Backlit, sun high in the haze":83577,"Afterglow":70117,"Firelight only":30152}},"Country":{"look":true,"values":{"California oak and chaparral":400013,"Australian eucalypt":320093,"Canadian spruce":279894}},"Second fire":{"values":{"None":948981,"Second fire on a far ridge":51019}},"Sky":{"look":true,"values":{"Clear":429204,"Lost in the smoke":350205,"Smoke overhead":143152,"High cloud":77439}},"View":{"values":{"From the hill":649589,"Under the column":350411}}},
  roll(hash) {
    const HOME = '0x7f5a97e4dd317239077673406f857d2a3271925b33074961a563a02d96662590';   // hashFor(530, 0)
    const home = hash === HOME;
    let hs = 0;
    for (let i = 2; i < 66; i += 8) hs = (Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x9E3779B1) + 0x7F4A7C15) | 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (opts) => { let u = R(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
    let sizeT = home ? 'Pyrocumulus' : pick([['Pyrocumulus', .6], ['Smoke plume, no cap', .27], ['Pyrocumulonimbus with lightning', .13]]);
    let timeT = home ? 'Golden evening' : pick([['Golden evening', .58], ['Dusk', .32], ['Last light, fire glowing', .1]]);
    const windT = home ? 'Strong lean' : timeT === 'Last light, fire glowing' ? pick([['Strong lean', .55], ['Moderate', .45]]) : pick([['Strong lean', .42], ['Moderate', .38], ['Calm, straight up', .2]]);
    const hazeT = home ? 'Clear upwind' : pick([['Clear upwind', .65], ['Smoky everywhere', .35]]);
    let lightT = timeT === 'Last light, fire glowing' ? 'Afterglow' : home ? 'Side-lit' : pick([['Side-lit', .62], ['Backlit, red sun in the smoke', .38]]);
    const landT = home ? 'California oak and chaparral' : pick([['California oak and chaparral', .4], ['Australian eucalypt', .32], ['Canadian spruce', .28]]);
    let secondT = home ? 'None' : pick([['None', .85], ['Second fire on a far ridge', .15]]);
    let hn = 0x2C1B3C6D;
    for (let i = 2; i < 66; i += 8) hn = (Math.imul(hn ^ parseInt(hash.slice(i, i + 8), 16), 0xC2B2AE35) + 0x165667B1) | 0;
    const RN = () => { hn = hn + 0x6D2B79F5 | 0; let t = Math.imul(hn ^ hn >>> 15, 1 | hn); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const nCb = RN(), nSec = RN(), nDay = RN(), nNight = RN(), nSky = RN();
    if (sizeT.startsWith('Pyrocumulonimbus') && nCb > .3) sizeT = 'Pyrocumulus';
    if (secondT !== 'None' && nSec > .34) secondT = 'None';
    const lastL = timeT === 'Last light, fire glowing';
    const dayT = !home && !lastL && nDay < .245, nightT = lastL && nNight < .3;
    if (dayT) { timeT = 'Afternoon'; if (lightT.startsWith('Backlit')) lightT = 'Backlit, sun high in the haze'; }
    if (nightT) { timeT = 'Night'; lightT = 'Firelight only'; }
    const skyT = hazeT === 'Smoky everywhere' ? 'Lost in the smoke' : home ? 'Clear' : nSky < .66 ? 'Clear' : nSky < .88 ? 'Smoke overhead' : 'High cloud';
    let hv = 0x5BD1E995;
    for (let i = 2; i < 66; i += 8) hv = (Math.imul(hv ^ parseInt(hash.slice(i, i + 8), 16), 0x85EBCA77) + 0x27D4EB2F) | 0;
    const RV = () => { hv = hv + 0x6D2B79F5 | 0; let t = Math.imul(hv ^ hv >>> 15, 1 | hv); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pickV = (opts) => { let u = RV(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
    const viewT = home ? 'From the hill' : pickV([['From the hill', .65], ['Under the column', .35]]);
    return [['Fire', sizeT], ['Hour', timeT], ['Wind', windT], ['Haze', hazeT], ['Light', lightT], ['Country', landT], ['Second fire', secondT], ['Sky', skyT], ['View', viewT]];
  },
});
// ==== end roll ====

// ==== roll 532 ====
ProtoRolls.add(532, {
  traits: {"Snow":{"look":true,"values":{"Wind drifts":399981,"Patchy thin snow":349974,"Deep drifts":150300,"Bare blue ice":99745}},"Platelets":{"values":{"Platelet carpet":500355,"Thin platelets":349398,"Platelet curtains":150247}},"Algae":{"look":true,"values":{"Faint algae":450454,"Algae bloom":349549,"Clean ice":199997}},"Cracks":{"values":{"One crack":500107,"Crack network":350445,"Refrozen lead":149448}},"Holes":{"values":{"One breathing hole":819876,"Two holes":108202,"Row of holes":71922}},"View":{"look":true,"values":{"From deep":406259,"Level with the hole":344611,"Under the hole":118545,"Along a pressure ridge":71548,"Along a low ridge":32691,"Along a deep keel":26346}},"Water":{"values":{"Clear spring water":550606,"Plankton haze":299338,"Crystal clear":150056}},"Life":{"values":{"Krill swarm":500130,"Comb jellies":499870}},"Sky":{"values":{"Overcast":550222,"Thin sun":349742,"Low sun":100036}}},
  roll(hash) {
    const HOME = '0xb6dc02bd26a378c6607dd6fbf33960fe3172dba50a8da2276b15fb6d1c57aadb';
    const c = { hash, home: hash === HOME };
      let hs = 0x9e3779b9;
      for (let i = 2; i < c.hash.length; i += 8) hs = Math.imul(hs ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let snowT = pick({ 'Wind drifts': 40, 'Patchy thin snow': 35, 'Deep drifts': 15, 'Bare blue ice': 10 });
      let platT = pick({ 'Platelet carpet': 50, 'Thin platelets': 35, 'Platelet curtains': 15 });
      let algaT = pick({ 'Faint algae': 45, 'Algae bloom': 35, 'Clean ice': 20 });
      let crackT = pick({ 'One crack': 50, 'Crack network': 35, 'Refrozen lead': 15 });
      let holeT = pick({ 'One breathing hole': 82, 'Two holes': 18 });
      let keelT = pick({ 'Low ridge': 25, 'Pressure ridge': 55, 'Deep keel': 20 });
      let waterT = pick({ 'Clear spring water': 55, 'Plankton haze': 30, 'Crystal clear': 15 });
      let lifeT = pick({ 'Comb jellies': 50, 'Krill swarm': 35, 'Jelly drift': 15 });
      let skyT = pick({ 'Overcast': 55, 'Thin sun': 35, 'Low sun': 10 });
      if (c.home) {
        snowT = 'Patchy thin snow'; platT = 'Platelet carpet'; algaT = 'Faint algae'; crackT = 'One crack';
        holeT = 'One breathing hole'; keelT = 'Pressure ridge'; waterT = 'Clear spring water'; lifeT = 'Comb jellies'; skyT = 'Thin sun';
      }
      // where you float: a separate hash-derived stream, so every older roll stays put; the home keeps the opening view
      let vs = 0x2f6b9d35;
      for (let i = 2; i < c.hash.length; i += 8) vs = Math.imul(vs ^ parseInt(c.hash.slice(i, i + 8), 16), 0x9e3779b1) >>> 0;
      const R2 = () => { vs = vs + 0x6D2B79F5 | 0; let t = Math.imul(vs ^ vs >>> 15, 1 | vs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const viewR = [R2(), R2(), R2(), R2(), R2(), R2(), R2()];
      if (holeT === 'Two holes' && !c.home && viewR[6] < .4) holeT = 'Row of holes';
      // the standpoint: from deep keeps its old roll; the views level with the ice split on a stream of their own
      let ws = 0x6c8e9cf5;
      for (let i = 2; i < c.hash.length; i += 8) ws = Math.imul(ws ^ parseInt(c.hash.slice(i, i + 8), 16), 0x27d4eb2f) >>> 0;
      const R3 = () => { ws = ws + 0x6D2B79F5 | 0; let t = Math.imul(ws ^ ws >>> 15, 1 | ws); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const v3 = [R3(), R3(), R3(), R3()];
      let view = c.home || (viewR[0] < .64 && holeT !== 'Row of holes') ? 'level' : 'deep';
      if (view === 'level' && !c.home) view = v3[0] < .2 ? 'up' : v3[0] < .42 ? 'ridge' : 'level';
      if (lifeT === 'Jelly drift') lifeT = 'Krill swarm';    // folded into the krill's share (its roll kept)
      const viewT = { level: 'Level with the hole', deep: 'From deep', up: 'Under the hole' }[view] || 'Along ' + { 'Low ridge': 'a low ridge', 'Pressure ridge': 'a pressure ridge', 'Deep keel': 'a deep keel' }[keelT];
      return [['Snow', snowT], ['Platelets', platT], ['Algae', algaT], ['Cracks', crackT], ['Holes', holeT], ['View', viewT], ['Water', waterT], ['Life', lifeT], ['Sky', skyT]];
  },
});
// ==== end roll ====

// ==== roll 533 ====
ProtoRolls.add(533, {
  traits: {"Distance":{"look":true,"values":{"34 km":408146,"46 km":245050,"24 km":162897,"260 km":15180,"300 km":15152,"290 km":15114,"320 km":15077,"280 km":14920,"270 km":14861,"310 km":14851,"100 km":10692,"90 km":10686,"95 km":10673,"105 km":10579,"85 km":10549,"110 km":9485,"250 km":7550,"330 km":7429,"80 km":1109}},"Storm":{"look":true,"values":{"Multicell cluster":248292,"Overshooting top":240198,"Lone tower":160097,"Below the horizon":120134,"Squall line":87871,"Mammatus":79635,"Distant anvil":63773}},"Flash colour":{"values":{"Pink-white":555384,"Violet-white":333247,"Smoky amber":111369}},"Rhythm":{"values":{"Restless":554781,"Lazy":334217,"Spider crawlers":111002}},"Sky":{"look":true,"values":{"Milky Way core":499823,"Milky Way overhead":300003,"Airglow waves":100351,"Perseids":99823}},"Lake":{"values":{"Glass":500512,"Ripple line":499488}},"Cabin":{"values":{"One window":624424,"Dark shore":250292,"Two lights":125284}},"Night":{"values":{"Moonless":545388,"Moonrise":181859,"Late twilight":181693,"Old moon":91060}},"View":{"look":true,"values":{"From the dock":390688,"Into the mirror":182069,"Under the stars":182011,"Storm at the edge":156808,"Through the pines":88424}}},
  roll(hash) {
    const HOME = '0xdd05a13983fb5077e6c15854ccc5f659111e7a1b46bcef749e1142a02e96fc84';
    const home = hash === HOME;
    const hx = hash.slice(2).padEnd(64, '0');
    let a0 = parseInt(hx.slice(0, 8), 16) >>> 0, a1 = parseInt(hx.slice(8, 16), 16) >>> 0, a2 = parseInt(hx.slice(16, 24), 16) >>> 0, a3 = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { const t0 = (a0 + a1 | 0) + a3 | 0; a3 = a3 + 1 | 0; a0 = a1 ^ a1 >>> 9; a1 = a2 + (a2 << 3) | 0; a2 = a2 << 21 | a2 >>> 11; a2 = a2 + t0 | 0; return (t0 >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const roll = (tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = rnd() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } return home ? tab[hi] : v; };
    const distR = roll([['24 km', 2, 24], ['34 km', 5, 34], ['46 km', 3, 46]], 1);
    const formR = roll([['Classic anvil', 5, 0], ['Overshooting top', 3, 1], ['Twin cells', 2, 2], ['Mammatus', 1, 3]], 0)[2];
    const fcolR = roll([['Pink-white', 5], ['Violet-white', 3], ['Smoky amber', 1]], 0);
    const rhythmR = roll([['Lazy', 3], ['Restless', 5], ['Spider crawlers', 1]], 1);
    const skyR = roll([['Milky Way core', 5], ['Milky Way overhead', 3], ['Airglow waves', 1], ['Perseids', 1]], 0);
    const lakeR = roll([['Glass', 4], ['Ripple line', 4]], 1);
    const cabR = roll([['One window', 5], ['Dark shore', 2], ['Two lights', 1]], 0);
    let v0 = (parseInt(hx.slice(40, 48), 16) ^ 0x2c1b3c6d) >>> 0;
    const vr = () => { v0 = v0 + 0x6D2B79F5 | 0; let t = Math.imul(v0 ^ v0 >>> 15, 1 | v0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let w0 = (parseInt(hx.slice(48, 56), 16) ^ 0x7f4a7c15) >>> 0;
    const wr = () => { w0 = w0 + 0x6D2B79F5 | 0; let t = Math.imul(w0 ^ w0 >>> 15, 1 | w0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pickW = tab => { let tot = 0; for (const r of tab) tot += r[1]; let x = wr() * tot; for (const r of tab) { x -= r[1]; if (x < 0) return r; } return tab[tab.length - 1]; };
    const FORMS = ['Lone tower', 'Overshooting top', 'Multicell cluster', 'Mammatus', 'Squall line', 'Distant anvil'];
    const fw = pickW([[0, 40], [2, 22], [4, 22], [5, 16]].map(r => [r[0], r[1], r[0]]))[2];
    let form = home ? 0 : formR === 0 ? fw : formR === 1 ? 1 : formR === 2 ? 2 : 3;
    if (!home) wr();   // which way the anvil runs
    const mb = st => () => { st.v = st.v + 0x6D2B79F5 | 0; let t = Math.imul(st.v ^ st.v >>> 15, 1 | st.v); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const nr5 = mb({ v: (parseInt(hx.slice(32, 40), 16) ^ 0xf246234d) >>> 0 }), dF = nr5(), dS = nr5();
    const nightR = pickW([['Moonless', 6, 0], ['Late twilight', 2, 1], ['Moonrise', 2, 2], ['Old moon', 1, 3]]);
    const night = home ? 0 : nightR[2];
    const far = !home && night === 0 && dS < .22, form0 = form;
    if (far) form = 5;
    const wD = form0 === 5 ? wr() : 0, D = far ? 250 + 80 * nr5() : form === 5 ? 82 + 30 * wD : 0;
    const out = [];
    out.push(['Distance', far ? Math.round(D / 10) * 10 + ' km' : form === 5 ? Math.round(D / 5) * 5 + ' km' : distR[0]]);
    out.push(['Storm', far ? 'Below the horizon' : FORMS[form]]);
    out.push(['Flash colour', fcolR[0]]);
    out.push(['Rhythm', rhythmR[0]]);
    out.push(['Sky', skyR[0]]);
    out.push(['Lake', lakeR[0]]);
    out.push(['Cabin', cabR[0]]);
    out.push(['Night', home ? 'Moonless' : nightR[0]]);
    const VIEWS = [['From the dock', 5, 0], ['Under the stars', 2, 1], ['Into the mirror', 2, 2], ['Storm at the edge', 2, 3]];
    let viewK = 0;
    { let tot = 0; for (const r of VIEWS) tot += r[1]; let x = vr() * tot; for (const r of VIEWS) { x -= r[1]; if (x < 0) { viewK = r[2]; break; } } }
    if (home) viewK = 0;
    const fgK = home || !(viewK === 0 || viewK === 3) || form === 5 ? 0 : dF < .17 ? 1 : 0;
    out.push(['View', fgK ? 'Through the pines' : VIEWS[viewK][0]]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 539 ====
ProtoRolls.add(539, {
  traits: {"Arch":{"look":true,"values":{"Ribbon span":417253,"Broad span":249965,"Tall window":249270,"Double window":83512}},"Core":{"values":{"Climbing":500308,"Rising":300019,"High in the south":199673}},"Airglow":{"values":{"Green bands":555384,"Faint":333247,"Red and green":111369}},"Town glow":{"values":{"Faint town":625739,"Two towns":249499,"Dark sky":124762}},"Water":{"values":{"Potholes":555273,"Scattered":333688,"After rain":111039}},"Visitor":{"values":{"None":959868,"Comet":20772,"Fireball":19360}},"Sandstone":{"values":{"Entrada red":555229,"Navajo buff":333585,"White cap":111186}},"Standpoint":{"look":true,"values":{"Before the arch":450321,"From the flank":299572,"Close beneath":170289,"Under the span":79818}},"Light":{"values":{"Moonless":599729,"Moonlit":160049,"Blue hour":120817,"First dawn":99450,"Zodiacal light":19955}},"Weather":{"values":{"Clear":779736,"High cloud":130323,"Smoke haze":89941}}},
  roll(hash) {
    const HOME = '0xad98c6336249e1b9cae4266504d123f017ea7e49119f2654beabc19b90368ba8';   // hashFor(538, 0)
    const home = hash === HOME, out = [];
    const hx = hash.slice(2).padEnd(64, '0');
    let a0 = parseInt(hx.slice(0, 8), 16) >>> 0, a1 = parseInt(hx.slice(8, 16), 16) >>> 0, a2 = parseInt(hx.slice(16, 24), 16) >>> 0, a3 = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { const t0 = (a0 + a1 | 0) + a3 | 0; a3 = a3 + 1 | 0; a0 = a1 ^ a1 >>> 9; a1 = a2 + (a2 << 3) | 0; a2 = a2 << 21 | a2 >>> 11; a2 = a2 + t0 | 0; return (t0 >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const T = (n, v) => { const i = out.findIndex(t => t[0] === n); if (i >= 0) out[i][1] = String(v); else out.push([n, String(v)]); };
    const trait = (name, tab, hi, quiet) => { let tot = 0; for (const r of tab) tot += r[1]; let x = rnd() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; if (!quiet) T(name, v[0]); return v[2]; };
    trait('Arch', [['Ribbon span', 5, 0], ['Tall window', 3, 1], ['Broad span', 3, 2], ['Double window', 1, 3]], 0);
    trait('Core', [['Rising', 3, 9], ['Climbing', 5, 15], ['High in the south', 2, 21]], 1);
    trait('Airglow', [['Green bands', 5, 0], ['Faint', 3, 1], ['Red and green', 1, 2]], 0);
    trait('Town glow', [['Faint town', 5, 0], ['Two towns', 2, 1], ['Dark sky', 1, 2]], 0);
    trait('Water', [['Potholes', 5, 0], ['Scattered', 3, 1], ['After rain', 1, 2]], 0);
    let visK = trait('Visitor', [['Shooting stars', 6, 0], ['Satellite train', 3, 1], ['Comet', 1, 2], ['Fireball', 1, 3]], 0, true);
    let v1 = (parseInt(hx.slice(48, 56), 16) ^ 0x9e3779b9) >>> 0;
    const vr = () => { v1 = v1 + 0x6D2B79F5 | 0; let t = Math.imul(v1 ^ v1 >>> 15, 1 | v1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    { const keep = vr(); if (visK === 1 || keep >= [0, 0, .23, .21][visK]) visK = 0; }
    T('Visitor', ['None', '', 'Comet', 'Fireball'][visK]);
    trait('Sandstone', [['Entrada red', 5, 0], ['Navajo buff', 3, 1], ['White cap', 1, 2]], 0);
    let s1 = (parseInt(hx.slice(40, 48), 16) ^ 0x3c6ef372) >>> 0;
    const sr = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const STAND = [['Before the arch', 45], ['From the flank', 30], ['Close beneath', 17], ['Under the span', 8]];
    let standK = 0;
    { let x = sr() * 100; for (let i = 0; i < STAND.length; i++) { x -= STAND[i][1]; if (x < 0) { standK = i; break; } } }
    if (home) standK = 0;
    T('Standpoint', STAND[standK][0]);
    let w1 = (parseInt(hx.slice(56, 64), 16) ^ 0x85ebca6b) >>> 0;
    const wr = () => { w1 = w1 + 0x6D2B79F5 | 0; let t = Math.imul(w1 ^ w1 >>> 15, 1 | w1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (tab) => { let x = wr() * 100; for (let i = 0; i < tab.length; i++) { x -= tab[i][1]; if (x < 0) return i; } return 0; };
    const LIGHTS = [['Moonless', 60], ['Moonlit', 16], ['Blue hour', 12], ['First dawn', 10], ['Zodiacal light', 2]];
    const WEATH = [['Clear', 78], ['High cloud', 13], ['Smoke haze', 9]];
    let lightK = pick(LIGHTS), wxK = pick(WEATH);
    if (home) lightK = wxK = 0;
    T('Light', LIGHTS[lightK][0]);
    T('Weather', WEATH[wxK][0]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 541 ====
ProtoRolls.add(541, {
  traits: {"Sun":{"look":true,"values":{"Morning sun":450056,"High sun":249637,"Low gold sun":180610,"Veiled sun":119697}},"Swell":{"look":true,"values":{"Head-high":450155,"Small surf":299642,"Overhead sets":170468,"Big wave day":79735}},"Water":{"look":true,"values":{"Green surf":450454,"Blue clear":269438,"Milky after a storm":180314,"Crystal":99794}},"Depth":{"values":{"Three metres":500107,"Five metres":249968,"Two metres":249925}},"Sand":{"look":true,"values":{"Fine ripples":499941,"Coarse megaripples":219983,"Shell grit":179674,"Black volcanic sand":100402}},"On the sand":{"look":true,"values":{"A few shells":449666,"Weed strands":250415,"Shell drift":180325,"Bare sand":119594}},"Foam":{"values":{"Lacy foam":501178,"Thick rafts":298638,"Clean":200184}},"Chop":{"values":{"Light chop":549698,"Onshore wind":250366,"Glassy":199936}},"View":{"look":true,"values":{"Along the beach":440023,"Out to sea":220008,"Facing the shore":219863,"Under the break":120106}},"Moment":{"look":true,"values":{"A wave breaking":460492,"Between sets":299683,"The wave overhead":139995,"After the set":99830}},"Gaze":{"look":true,"values":{"Up into the water":450107,"Along the bottom":263834,"Up at the surface":236882,"Straight up":49177}}},
  roll(hash) {
    const HOME = '0x00b082a1f3ee1c257d3410ee5793d7848ac6b86516c37834dfc0520493f3c421';
    const home = hash === HOME;
    let hs = 0x9e3779b9;
    for (let i = 2; i < hash.length; i += 8) hs = Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let sunT = pick({ 'Morning sun': 45, 'High sun': 25, 'Low gold sun': 18, 'Veiled sun': 12 });
    let swellT = pick({ 'Head-high': 45, 'Small surf': 30, 'Overhead sets': 17, 'Big wave day': 8 });
    let waterT = pick({ 'Green surf': 45, 'Blue clear': 27, 'Milky after a storm': 18, 'Crystal': 10 });
    let depthT = pick({ 'Three metres': 50, 'Two metres': 25, 'Five metres': 25 });
    let sandT = pick({ 'Fine ripples': 50, 'Coarse megaripples': 22, 'Shell grit': 18, 'Black volcanic sand': 10 });
    let debT = pick({ 'A few shells': 45, 'Weed strands': 25, 'Shell drift': 18, 'Bare sand': 12 });
    let foamT = pick({ 'Lacy foam': 50, 'Thick rafts': 30, 'Clean': 20 });
    let chopT = pick({ 'Light chop': 55, 'Glassy': 20, 'Onshore wind': 25 });
    if (home) {
      sunT = 'Morning sun'; swellT = 'Head-high'; waterT = 'Green surf'; depthT = 'Three metres';
      sandT = 'Fine ripples'; debT = 'A few shells'; foamT = 'Lacy foam'; chopT = 'Light chop';
    }
    let h2 = 0x2545f491;
    for (let i = 2; i < hash.length; i += 8) h2 = Math.imul(h2 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) >>> 0;
    const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let viewT = 'Along the beach';
    { const o = { 'Along the beach': 44, 'Facing the shore': 22, 'Out to sea': 22, 'Under the break': 12 }; let r = R2() * 100; for (const k in o) { r -= o[k]; if (r < 0) { viewT = k; break; } } }
    if (home) viewT = 'Along the beach';
    let h3 = 0x6a09e667;
    for (let i = 2; i < hash.length; i += 8) h3 = Math.imul(h3 ^ parseInt(hash.slice(i, i + 8), 16), 0xc2b2ae35) >>> 0;
    const R3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick3 = (o) => { let r = R3() * 100; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let momT = pick3({ 'A wave breaking': 46, 'Between sets': 30, 'The wave overhead': 14, 'After the set': 10 });
    let gazeT = pick3({ 'Along the bottom': 30, 'Up into the water': 44, 'Up at the surface': 20, 'Straight up': 6 });
    if (home) { momT = 'A wave breaking'; gazeT = 'Up into the water'; }
    if (viewT === 'Under the break' && gazeT !== 'Straight up') gazeT = 'Up at the surface';
    if (waterT === 'Milky after a storm' && (gazeT === 'Up at the surface' || gazeT === 'Straight up')) gazeT = 'Up into the water';
    return [['Sun', sunT], ['Swell', swellT], ['Water', waterT], ['Depth', depthT], ['Sand', sandT], ['On the sand', debT], ['Foam', foamT], ['Chop', chopT],
      ['View', viewT], ['Moment', momT], ['Gaze', gazeT]];
  },
});
// ==== end roll ====

// ==== roll 544 ====
ProtoRolls.add(544, {
  traits: {"Sun":{"look":true,"values":{"Late morning":391499,"High noon":217077,"Afternoon":174636,"Low winter sun":86689,"On the horizon":79772,"Night":50327}},"Sea":{"look":true,"values":{"Light chop":450155,"Fresh breeze":250232,"Glassy calm":199833,"Long ocean swell":99780}},"Water":{"values":{"Oceanic blue":500447,"Tropical turquoise":299556,"Plankton bloom":120112,"Crystal blue":79885}},"Depth":{"look":true,"values":{"Ten metres":449882,"Six metres":224569,"Fifteen metres":162216,"One metre":100666,"Twenty-five metres":62667}},"Drift":{"values":{"Plankton motes":550145,"Sparse":299922,"Marine snow":149933}},"Sky":{"values":{"Clear":549925,"Fair-weather cumulus":350089,"Passing clouds":99986}},"Whale song":{"values":{"Low moans":501178,"Rising whoops":348766,"Long cries":150056}},"View":{"look":true,"values":{"Up the beams":416659,"Level":321870,"Down the beams":104360,"Just under the surface":100666,"Straight up":56445}},"Weather":{"values":{"Sunlit":699587,"Overcast":100497,"Sunset":79772,"Rain":69817,"Moonlight":50327}}},
  roll(hash) {
    const HOME = '0x8ed25e51151a7b01781398973a5daf54d7428dcc110a4dd33188f97fc4a2b666';   // hashFor(543, 0), as runtime.js: c.home
    const home = hash === HOME, c = { hash };
      let hs = 0x9e3779b9;
      for (let i = 2; i < c.hash.length; i += 8) hs = Math.imul(hs ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (o, rnd = R) => { let s = 0; for (const k in o) s += o[k]; let r = rnd() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let sunT = pick({ 'Late morning': 45, 'High noon': 25, 'Afternoon': 20, 'Low winter sun': 10 });
      let seaT = pick({ 'Light chop': 45, 'Glassy calm': 20, 'Fresh breeze': 25, 'Long ocean swell': 10 });
      let waterT = pick({ 'Oceanic blue': 50, 'Tropical turquoise': 30, 'Plankton bloom': 12, 'Crystal blue': 8 });
      let depthT = pick({ 'Ten metres': 50, 'Six metres': 25, 'Fifteen metres': 18, 'Twenty-five metres': 7 });
      let driftT = pick({ 'Plankton motes': 55, 'Sparse': 30, 'Marine snow': 15 });
      let skyT = pick({ 'Clear': 55, 'Fair-weather cumulus': 35, 'Passing clouds': 10 });
      let songT = pick({ 'Low moans': 50, 'Rising whoops': 35, 'Long cries': 15 });
      if (home) {
        sunT = 'Late morning'; seaT = 'Light chop'; waterT = 'Oceanic blue'; depthT = 'Ten metres';
        driftT = 'Plankton motes'; skyT = 'Clear'; songT = 'Low moans';
      }
      // which way the opening looks: its own hash stream, so the rolls above stay put
      let hv = 0x3c6ef372;
      for (let i = 2; i < c.hash.length; i += 8) hv = Math.imul(hv ^ parseInt(c.hash.slice(i, i + 8), 16), 0xcc9e2d51) >>> 0;
      const R2 = () => { hv = hv + 0x6D2B79F5 | 0; let t = Math.imul(hv ^ hv >>> 15, 1 | hv); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      let viewT = pick({ 'Up the beams': 52, 'Level': 34, 'Down the beams': 14 }, R2);
      if (home) viewT = 'Up the beams';
      // the weather and a fourth standpoint: a third stream (added 2026-11-11), so every roll above stays
      let hw = 0x5be0cd19;
      for (let i = 2; i < c.hash.length; i += 8) hw = Math.imul(hw ^ parseInt(c.hash.slice(i, i + 8), 16), 0x1b873593) >>> 0;
      const R3 = () => { hw = hw + 0x6D2B79F5 | 0; let t = Math.imul(hw ^ hw >>> 15, 1 | hw); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      let wxT = pick({ 'Sunlit': 70, 'Overcast': 10, 'Sunset': 8, 'Rain': 7, 'Moonlight': 5 }, R3);
      if (R3() < .1) { viewT = 'Just under the surface'; depthT = 'One metre'; }
      if (home) { wxT = 'Sunlit'; viewT = 'Up the beams'; depthT = 'Ten metres'; }
      // a fifth standpoint, taken from "Up the beams" on a fourth stream (added 2026-11-11, cycle 2): every roll above stays
      let hx = 0x510e527f;
      for (let i = 2; i < c.hash.length; i += 8) hx = Math.imul(hx ^ parseInt(c.hash.slice(i, i + 8), 16), 0x9e3779b1) >>> 0;
      const R4 = () => { hx = hx + 0x6D2B79F5 | 0; let t = Math.imul(hx ^ hx >>> 15, 1 | hx); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      if (R4() < .12 && !home && viewT === 'Up the beams') viewT = 'Straight up';
      // under a grey ceiling there are no shafts to look down: those mints look level into the glow instead
      if ((wxT === 'Overcast' || wxT === 'Rain') && viewT === 'Down the beams') viewT = 'Level';
      if ((wxT === 'Overcast' || wxT === 'Rain') && depthT === 'Twenty-five metres' && viewT === 'Level') viewT = 'Up the beams';
      if (wxT === 'Sunset') sunT = 'On the horizon';
      if (wxT === 'Moonlight') sunT = 'Night';
      return [['Sun', sunT], ['Sea', seaT], ['Water', waterT], ['Depth', depthT], ['Drift', driftT], ['Sky', skyT], ['Whale song', songT], ['View', viewT], ['Weather', wxT]];
  },
});
// ==== end roll ====

// ==== roll 550 ====
ProtoRolls.add(550, {
  traits: {"Light":{"look":true,"values":{"Pink dawn":359732,"Gold sunrise":254750,"Before sunrise":135509,"Rain coming":110397,"Sunset afterglow":89587,"Moonlit":50025}},"Mist":{"look":true,"values":{"Layered banks":439193,"River fog":300131,"Thin haze":180695,"Heavy fog":79981}},"Towers":{"look":true,"values":{"Tower forest":440874,"Scattered towers":279346,"Tall spires":179918,"Low domes":99862}},"Reach":{"look":true,"values":{"Bend ahead":450154,"Straight reach":330095,"Wide pool":219751}},"Lanterns":{"values":{"One raft":580010,"Two rafts":319567,"Three rafts":100423}},"Sky":{"look":true,"values":{"Clear":437457,"High cirrus":284057,"Setting moon":119374,"Low cloud":110397,"Stars":34204,"Evening moon":14511}},"Water":{"look":true,"values":{"Glass":489062,"Slow current":293983,"Drizzle":216955}},"View":{"look":true,"values":{"Downriver":460603,"Toward the cliffs":259759,"Into the light":179588,"Back upriver":100050}},"Season":{"values":{"Green bamboo":880569,"Autumn":119431}},"Horizon":{"look":true,"values":{"Middle":436560,"Low (more sky)":281923,"High (more water)":281517}},"Banks":{"values":{"Bamboo fountains":649883,"Bamboo clumps":350117}}},
  roll(hash) {
    const HOME = '0xff1faafc3abce564b6bea4e9467ac3bc34719faad1892425236117de4b2e06a7';
    const home = hash === HOME;
    const mk = (seed, mul, sh) => { let s = seed; for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (s >>> sh); return s; };
    const mulb = (get, set) => () => { let s = get() + 0x6D2B79F5 | 0; set(s); let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let s0 = mk(0x550a11ce, 0x85ebca6b, 13), s2 = mk(0x0550f00d, 0xc2b2ae35, 14), s1 = mk(0x0550b1e5, 0x9e3779b1, 15);
    const R = mulb(() => s0, v => { s0 = v; }), R2 = mulb(() => s2, v => { s2 = v; }), R1 = mulb(() => s1, v => { s1 = v; });
    const pk = (Rf) => (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = Rf() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    for (let i = 0; i < 8; i++) R();
    for (let i = 0; i < 4; i++) R2();
    for (let i = 0; i < 4; i++) R1();
    const pick = pk(R), pick2 = pk(R2), pick1 = pk(R1);
    const hourR = pick2({ Dawn: 75, 'Rain coming': 11, 'Sunset afterglow': 9, Moonlit: 5 });
    pick2({ 'On the water': 60, 'From the bank': 22, 'From a tower top': 18, 'Close under a cliff': 0 });
    const seasonR = pick2({ 'Green bamboo': 70, 'Rice paddies': 18, Autumn: 12 });
    const hfR = R2();
    const hourN = home ? 'Dawn' : hourR;
    const lightR = home ? 'Pink dawn' : pick({ 'Pink dawn': 48, 'Gold sunrise': 34, 'Before sunrise': 18 });
    const lightN = hourN === 'Dawn' ? lightR : hourN;
    const rain = lightN === 'Rain coming', dusk = lightN === 'Sunset afterglow', night = lightN === 'Moonlit';
    const mistN = home ? 'Layered banks' : pick({ 'Layered banks': 44, 'River fog': 30, 'Thin haze': 18, 'Heavy fog': 8 });
    const towerN = home ? 'Tower forest' : pick({ 'Tower forest': 44, 'Scattered towers': 28, 'Tall spires': 18, 'Low domes': 10 });
    const reachN = home ? 'Bend ahead' : pick({ 'Bend ahead': 45, 'Straight reach': 33, 'Wide pool': 22 });
    const lampN = home ? 'One raft' : pick({ 'One raft': 58, 'Two rafts': 32, 'Three rafts': 10 });
    const skyR = home ? 'Clear' : pick({ Clear: 52, 'High cirrus': 32, 'Setting moon': 16 });
    const skyN = rain ? 'Low cloud' : night ? (skyR === 'High cirrus' ? 'High cirrus' : 'Stars') : dusk && skyR === 'Setting moon' ? 'Evening moon' : skyR;
    const waterR = home ? 'Glass' : pick({ Glass: 55, 'Slow current': 33, Drizzle: 12 });
    const waterN = rain ? 'Drizzle' : waterR;
    const viewN = home ? 'Downriver' : pick1({ Downriver: 46, 'Toward the cliffs': 26, 'Into the light': 18, 'Back upriver': 10 });
    R1();
    const paddy = !home && seasonR === 'Rice paddies';
    const seasonN = home ? 'Green bamboo' : (paddy ? 'Green bamboo' : seasonR);
    const hf = home ? 0.42 : 0.3 + 0.32 * hfR;
    const horN = hf < 0.39 ? 'High (more water)' : hf > 0.53 ? 'Low (more sky)' : 'Middle';
    const banksN = home ? 'Bamboo fountains' : pick1({ 'Bamboo clumps': 35, 'Bamboo fountains': 65 });
    return [['Light', lightN], ['Mist', mistN], ['Towers', towerN], ['Reach', reachN], ['Lanterns', lampN], ['Sky', skyN], ['Water', waterN], ['View', viewN], ['Season', seasonN], ['Horizon', horN], ['Banks', banksN]];
  },
});
// ==== end roll ====

// ==== roll 551 ====
ProtoRolls.add(551, {
  traits: {"Strings":{"look":true,"values":{"4":46017,"5":138106,"6":161184,"7":114684,"5 · gate":162678,"2 · long span":114079,"4 · gate":80941,"1 · long span":75928,"6 · old site":28001,"3 · gate":26770,"5 · old site":23710,"7 · old site":19903,"4 · old site":7999}},"Wind":{"look":true,"values":{"Steady":449576,"Breeze":249985,"Gale":220714,"Jet stream":79725}},"Flags":{"look":true,"values":{"Sun-faded":188603,"Mixed ages":180332,"New":150652,"Tattered":131786,"Sun-faded · large":63567,"Sun-faded · small":55956,"New · large":51111,"White":49598,"New · small":44842,"Tattered · large":44688,"Tattered · small":38865}},"Light":{"look":true,"values":{"Morning":333909,"High sun":214161,"Golden evening":123934,"Early low sun":120483,"Dawn alpenglow":105985,"Blue dusk":70903,"Moonlit":30625}},"Range":{"look":true,"values":{"Pyramid":449061,"Twin summits":330300,"Great wall":220639}},"Snow":{"look":true,"values":{"Dry season":199734,"Fresh snow":152134,"Deep winter":120283,"Dry season · granite":100170,"Dry season · ochre shale":100128,"Dry season · slate scree":100022,"Fresh snow · ochre shale":76137,"Fresh snow · slate scree":75785,"Fresh snow · granite":75607}},"View":{"look":true,"values":{"Across the pass":433357,"Through the gate":270389,"Under the strings":166308,"Close on one string":90674,"Lying under the fan":39272}},"Sky":{"values":{"Clear":640577,"High cirrus":160525,"Storm light":119882,"Cloud sea":63094,"Cloud sea · cirrus":15922}}},
  roll(hash) {
    const HOME = '0xe64780c23410c990f8656c905d7c02af78cc31c939321a65b467c9bc50f45312';
    const home = hash === HOME;
    function rngFrom(hash) {
      let a = parseInt(hash.slice(2, 10), 16) >>> 0, b = parseInt(hash.slice(10, 18), 16) >>> 0, c = parseInt(hash.slice(18, 26), 16) >>> 0, d = parseInt(hash.slice(26, 34), 16) >>> 0;
      return () => { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; let t = (a + b) | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = (c << 21 | c >>> 11); d = d + 1 | 0; t = t + d | 0; c = c + t | 0; return (t >>> 0) / 4294967296; };
    }
    const pick = (R, opts) => { let s = 0; for (const o of opts) s += o[1]; let r = R() * s; for (const o of opts) { r -= o[1]; if (r <= 0) return o[0]; } return opts[opts.length - 1][0]; };
    const R = rngFrom(hash);
    const R4 = rngFrom('0x' + hash.slice(50, 66) + hash.slice(18, 34) + hash.slice(2, 18) + hash.slice(34, 50)); for (let i = 0; i < 8; i++) R4();
    const Q = []; for (let i = 0; i < 16; i++) Q.push(R4());
    const q = (i) => () => Q[i];
    const R5 = rngFrom('0x' + hash.slice(18, 34) + hash.slice(50, 66) + hash.slice(34, 50) + hash.slice(2, 18)); for (let i = 0; i < 10; i++) R5();
    const W = []; for (let i = 0; i < 16; i++) W.push(R5());
    const wq = (i) => () => W[i];
    const layN = home ? 'fan' : pick(wq(0), [['fan', .46], ['gate', .27], ['span', .19], ['old', .08]]);
    const flkN = home ? 'as now' : pick(wq(1), [['as now', .47], ['large', .16], ['small', .14], ['mixed', .18], ['white', .05]]);
    // R3: 6 warm-up draws, then Flags (age), View (standpoint), Sky; the storm roll is its ninth draw
    const R3 = rngFrom('0x' + hash.slice(34, 66) + hash.slice(2, 34)); for (let i = 0; i < 6; i++) R3();
    const ageN = home ? 'Sun-faded' : pick(R3, [['New', .32], ['Sun-faded', .4], ['Tattered', .28]]);
    const standN = home ? 'Across the pass' : pick(R3, [['Across the pass', .42], ['Under the strings', .32], ['Above the lake', .26]]);
    const stormE = !home && pick(R3, [['Clear', .88], ['Storm light', .12]]) === 'Storm light';
    const hourN = home || stormE ? 'Bright morning' : pick(q(0), [['Bright morning', .62], ['Dawn alpenglow', .12], ['Golden evening', .14], ['Blue dusk', .08], ['Moonlit', .035]]);
    const wxN = home ? 'Clear' : pick(q(1), [['Clear', .8], ['High cirrus', .2]]);
    const nStr = home ? 5 : pick(R, [[3, .1], [4, .3], [5, .35], [6, .25]]);
    const windN = home ? 'Steady' : pick(R, [['Breeze', .25], ['Steady', .45], ['Gale', .22], ['Jet stream', .08]]);
    if (!home) R();
    const lightN = home ? 'Morning' : pick(R, [['Morning', .5], ['High sun', .32], ['Early low sun', .18]]);
    const rangeN = home ? 'Pyramid' : pick(R, [['Pyramid', .45], ['Twin summits', .33], ['Great wall', .22]]);
    const snowN = home ? 'Dry season' : pick(R, [['Dry season', .5], ['Fresh snow', .38], ['Deep winter', .12]]);
    const nG = Math.max(3, Math.min(5, nStr)), nSp = nStr < 5 ? 1 : 2;
    const grdN = home || snowN === 'Deep winter' ? 'gravel' : pick(wq(3), [['gravel', .4], ['slate', .2], ['shale', .2], ['granite', .2]]);
    const baseN = standN === 'Above the lake' ? (Q[2] < .4 ? 'Close on one string' : Q[2] < .7 ? 'Across the pass' : 'Under the strings') : standN;
    const view0 = !home && Q[3] < .16 ? (Q[4] > .5 ? 'Lying under the fan' : 'Close on one string') : baseN;
    const seaB = !home && !stormE && W[2] < .09;
    const viewN = layN === 'gate' ? 'Through the gate' : layN === 'span' ? 'Across the pass' : seaB && (view0 === 'Under the strings' || view0 === 'Lying under the fan') ? 'Across the pass' : view0;
    const storm = stormE;
    return [
      ['Strings', layN === 'fan' ? String(nStr + 1) : layN === 'gate' ? nG + ' · gate' : layN === 'span' ? nSp + ' · long span' : layN === 'old' ? (nStr + 1) + ' · old site' : String(nStr + 1)], ['Wind', windN],
      ['Flags', flkN === 'as now' ? ageN : flkN === 'white' ? 'White' : flkN === 'mixed' ? 'Mixed ages' : ageN + ' · ' + flkN],
      ['Light', hourN === 'Bright morning' ? lightN : hourN],
      ['Range', rangeN], ['Snow', grdN === 'gravel' ? snowN : snowN + ' · ' + { slate: 'slate scree', shale: 'ochre shale', granite: 'granite' }[grdN]],
      ['View', viewN],
      ['Sky', storm ? 'Storm light' : seaB ? (wxN === 'High cirrus' ? 'Cloud sea · cirrus' : 'Cloud sea') : wxN],
    ];
  },
});
// ==== end roll ====

// ==== roll 552 ====
// Copies make()'s draws up to the first caiman's place, the river and camera, the moonrise test (Night), the lamp's
// aim (Headtorch can turn Cold white) and the synchronous tree's crown search (Fireflies can become 'Synchronous, along the bank').
ProtoRolls.add(552, {
  traits: {"Drifting":{"look":true,"values":{"Close to the bank":454961,"Midstream":272192,"Narrow channel":181828,"Wide river":91019}},"Forest":{"look":true,"values":{"Mixed canopy":454198,"Palm-lined":273217,"Emergent giants":182093,"Vine-hung":90492}},"Fireflies":{"look":true,"values":{"Scattered":444393,"Synchronous tree":242022,"Synchronous, along the bank":202216,"Click beetles":111369}},"Milky Way":{"values":{"Core rising":500821,"Core high":299621,"Band overhead":199558}},"Mist":{"look":true,"values":{"Lying low":444900,"Faint":444061,"Thick":111039}},"Caiman":{"look":true,"values":{"Two":499217,"One":375578,"A pod":125205}},"Planet":{"look":true,"values":{"Jupiter":499809,"None":374907,"Venus low":125284}},"Looking":{"look":true,"values":{"Along the right bank":284319,"Downriver":240184,"Down the middle":213167,"Straight up":142710,"Up through the gap":119620}},"Headtorch":{"look":true,"values":{"Warm":438732,"Cold white":281454,"Dim amber":168059,"Off, eyes adapted":111755}},"Night":{"look":true,"values":{"Moonless":454468,"Moonlit":356153,"Blue hour":150152,"Moonrise":39227}}},
  roll(hash) {
    const M = Math;   // a local: a bare context looks globals up slowly
    const HOME = '0xe1d8e0d40727b4c732a882213f8f9d69b77901266cc65f824b62ad24460f0377';
    const home = hash === HOME, SZ = 1000;
    const out = [];
    const T = (n, v) => { v = String(v); for (const r of out) if (r[0] === n) { r[1] = v; return; } out.push([n, v]); };
    const smooth = (a, b, x) => { const t = M.max(0, M.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const clamp = (x, a, b) => M.max(a, M.min(b, x));
    const norm = (v) => { const l = M.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const hx = hash.slice(2).padEnd(64, '0');
    let a0 = parseInt(hx.slice(0, 8), 16) >>> 0, a1 = parseInt(hx.slice(8, 16), 16) >>> 0, a2 = parseInt(hx.slice(16, 24), 16) >>> 0, a3 = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { const t0 = (a0 + a1 | 0) + a3 | 0; a3 = a3 + 1 | 0; a0 = a1 ^ a1 >>> 9; a1 = a2 + (a2 << 3) | 0; a2 = a2 << 21 | a2 >>> 11; a2 = a2 + t0 | 0; return (t0 >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const trait = (name, tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = rnd() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; T(name, v[0]); return v[2]; };
    const bankK = trait('Drifting', [['Close to the bank', 5, 0], ['Midstream', 3, 1], ['Narrow channel', 2, 2], ['Wide river', 1, 3]], 0);
    const forK = trait('Forest', [['Mixed canopy', 5, 0], ['Palm-lined', 3, 1], ['Emergent giants', 2, 2], ['Vine-hung', 1, 3]], 0);
    const ffK = trait('Fireflies', [['Synchronous tree', 4, 0], ['Scattered', 4, 1], ['Click beetles', 1, 2]], 0);
    trait('Milky Way', [['Core rising', 5, 0], ['Core high', 3, 1], ['Band overhead', 2, 2]], 0);
    const mistK = trait('Mist', [['Faint', 4, 0], ['Lying low', 4, 1], ['Thick', 1, 2]], 0);
    trait('Caiman', [['One', 3, 0], ['Two', 4, 1], ['A pod', 1, 2]], 1);
    trait('Planet', [['Jupiter', 4, 0], ['None', 3, 1], ['Venus low', 1, 2]], 0);
    let v0 = (parseInt(hx.slice(40, 48), 16) ^ 0x2f6b9a3d) >>> 0;
    const vr = () => { v0 = v0 + 0x6D2B79F5 | 0; let t = M.imul(v0 ^ v0 >>> 15, 1 | v0); t = t + M.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const LOOKS = [['Downriver', 2], ['Up through the gap', 1]];
    let lookK = 0;
    { let tot = 0; for (const r of LOOKS) tot += r[1]; let x = vr() * tot; for (let i = 0; i < LOOKS.length; i++) { x -= LOOKS[i][1]; if (x < 0) { lookK = i; break; } } if (home) lookK = 0; }
    const dark = !home && vr() < 1 / 9;
    let n0 = (parseInt(hx.slice(4, 12), 16) ^ parseInt(hx.slice(36, 44), 16) ^ 0x6a09e667) >>> 0;
    const nr = () => { n0 = n0 + 0x6D2B79F5 | 0; let t = M.imul(n0 ^ n0 >>> 15, 1 | n0); t = t + M.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pickN = (tab) => { let tot = 0; for (const r of tab) tot += r[1]; let x = nr() * tot; for (let i = 0; i < tab.length; i++) { x -= tab[i][1]; if (x < 0) return i; } return tab.length - 1; };
    const NIGHTS = [['Moonless', 44], ['Moonlit', 20], ['Blue hour', 15], ['After rain', 13], ['Moonrise', 8]];
    let nightK = pickN(NIGHTS);
    if (home || (dark && nightK === 3)) nightK = 0;
    if (nightK === 3) nightK = 1;
    const STANDS = [['Along the right bank', 4], ['Down the middle', 3], ['Straight up', 2]];
    const sR = nr(), sK = pickN(STANDS);
    if (!home && sR < .64) lookK = 2 + sK;
    let y0 = (parseInt(hx.slice(20, 28), 16) ^ parseInt(hx.slice(52, 60), 16) ^ 0x3c6ef372) >>> 0;
    const yr = () => { y0 = y0 + 0x6D2B79F5 | 0; let t = M.imul(y0 ^ y0 >>> 15, 1 | y0); t = t + M.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const bendL = !home && lookK < 2 && yr() < .5;
    const TORCHES = [['Warm', 55], ['Cold white', 25], ['Dim amber', 20]];
    let tK = pickN(TORCHES); if (home) tK = 0;
    const aimR = nr(), nX = [nr(), nr(), nr(), nr(), nr(), nr()];
    if (nightK === 4 && (lookK === 1 || lookK === 4)) nightK = 1;
    const MIR = lookK === 2 ? -1 : 1;
    const jit = (k) => (rnd() - .5) * k;
    // the river
    const BANK = [{ W: 40, dL: 8 }, { W: 46, dL: 15 }, { W: 22, dL: 6 }, { W: 72, dL: 10 }][bankK];
    const W0 = BANK.W * (1 + (home ? 0 : jit(.15))), Wa = W0 * (.12 + rnd() * .1), phW = rnd() * M.PI * 2;
    const A1 = 14 + rnd() * 10, k1 = .009 + rnd() * .005, A2 = 4 + rnd() * 4, k2 = .023 + rnd() * .01, ph2 = rnd() * M.PI * 2;
    const ph1 = (home ? -.35 : -.6 + rnd() * .6) + (bendL ? M.PI : 0);
    const wid = (z) => W0 + Wa * M.sin(z * .013 + phW);
    const xc0 = (z) => A1 * M.sin(z * k1 + ph1) + A2 * M.sin(z * k2 + ph2);
    const dL = BANK.dL * (1 + (home ? 0 : jit(.2)));
    const X0 = wid(0) / 2 - (lookK === 3 ? wid(0) / 2 : lookK === 4 ? 3 + 2 * nX[2] : dL) - xc0(0);
    const xcen = (z) => X0 + xc0(z);
    const bankW = (s, u, y, z) => [xcen(z) + s * (u + wid(z) / 2), y, z];
    const FORS0 = [13, 10, 13, 14][forK];
    const C52 = FORS0 * (1 + jit(.2));
    rnd(); // setv(34)
    // the camera
    const tanH = M.tan(33 * M.PI / 180);
    const yawR = M.atan2(xcen(95), 95);
    const yaw0 = yawR + (lookK === 3 ? -.03 : -.24) + (home ? 0 : jit(.1)), pitch0 = .1 + (home ? 0 : jit(.03));
    const cam = { p: [0, .85, 0], fw: [0, 0, 1], rt: [1, 0, 0], up: [0, 1, 0] };
    const LT = { y: 0, p: 0 };
    const readView = () => {
      cam.p = [clamp(0, -.25, .25), clamp(.85 + 0, .6, 1.2), clamp(0, -.6, .3)];
      const yaw = yaw0 + LT.y + 0, pitch = clamp(pitch0 + LT.p + 0, -1.35, 1.35);
      const cp = M.cos(pitch);
      cam.fw = [M.sin(yaw) * cp, M.sin(pitch), M.cos(yaw) * cp];
      const r0 = [M.cos(yaw), 0, -M.sin(yaw)];
      cam.up = cross(cam.fw, r0);
      cam.rt = r0.map(v => v * MIR);
    };
    const rayAt = (sx, sy) => { const qx = sx * 2 - 1, qy = 1 - sy * 2; return norm([0, 1, 2].map(i => cam.fw[i] + (qx * cam.rt[i] + qy * cam.up[i]) * tanH)); };
    const proj = (p) => {
      const v = [p[0] - cam.p[0], p[1] - cam.p[1], p[2] - cam.p[2]];
      const z = dot(v, cam.fw); if (z < .15) return null;
      const x = dot(v, cam.rt) / (z * tanH), y = dot(v, cam.up) / (z * tanH);
      if (M.abs(x) > 1.1 || M.abs(y) > 1.1) return null;
      return [(x * .5 + .5) * SZ, (y * .5 + .5) * SZ, M.hypot(...v)];
    };
    readView();
    // the canoe's draws
    if (!home) { jit(.1); jit(.1); }   // yawC, zp
    if (!home) { rnd(); jit(.2); }     // ps, zg
    const zFar = 18 + 16 * nX[3];
    let zc0 = 12;
    { const tb = yaw0 - .27 + (home ? 0 : jit(.1)); for (let z = 8; z < 70; z += .5) { const w = bankW(-1, -1.5, 0, z); zc0 = z; if (M.atan2(w[0], w[2]) >= tb) break; } }
    // the night: the moonrise needs a low moon clear of the treeline
    const nm = [nr(), nr(), nr(), nr()];
    let mrAz = 0, mrEl = 0, mrS = nm[0] < .5 ? -1 : 1;
    if (nightK === 4) {
      mrAz = yawR + mrS * (.18 + .34 * M.abs(nm[0] - .5));
      const dx = M.sin(mrAz), dz = M.cos(mrAz); let D = 400;
      for (let t = 2; t < 400; t += 2) { const x = dx * t, z = dz * t; if (M.abs(x - xcen(z)) > wid(z) / 2) { D = t; break; } }
      mrEl = M.atan2(C52 + 5, D) + .06 + .05 * nm[1];
      if (mrEl > .36) nightK = 1;
    }
    const azD = (az, el) => [M.sin(az) * M.cos(el), M.sin(el), M.cos(az) * M.cos(el)];
    let moonD = [0, 1, 0], moonR = 0;
    if (nightK === 1) { moonD = nm[2] < .5 ? azD(yawR + (nm[0] - .35) * .7, .3 + .32 * nm[1]) : azD(yaw0 + M.PI + (nm[0] - .5) * 2.2, .55 + .35 * nm[1]); moonR = .0062; }
    if (nightK === 4) { moonD = azD(mrAz, mrEl); moonR = .0105; }
    // the head turns, then the lamp's aim
    const tpos = () => [cam.p[0] + cam.up[0] * .1, cam.p[1] + cam.up[1] * .1, cam.p[2] + cam.up[2] * .1];
    if (lookK === 1) { LT.y = (vr() - .5) * .2; LT.p = .33 + (vr() - .5) * .08; }
    if (lookK === 4) { LT.y = -.35 - .35 * nX[0]; LT.p = .85 + .2 * nX[1]; }
    if (lookK) readView();
    const TPS = [2400, 10000, 650], tq = tpos(), cands = [];
    const cand = (k, w, cw) => { const pr = proj(w); if (!pr) return; const sx = pr[0] / SZ, sy = 1 - pr[1] / SZ; if (sx < .05 || sx > .95 || sy < .08 || sy > .92) return; cands.push({ k, s: [sx, sy], d: M.hypot(w[0] - tq[0], w[1] - tq[1], w[2] - tq[2]), w, cw }); };
    cand(0, bankW(-1, -.6, 1.6, zc0 + .7), null);
    { const w = bankW(1, -.5, 1.4, zFar + .5), pr = proj(w); if (pr && pr[0] / SZ > .55 && pr[0] / SZ < .9) cand(1, w, null); }
    if (!cands.length) for (let z = 14; z < 60 && !cands.length; z += 2) for (const sd of [1, -1]) { const w = bankW(sd, -.5, 1.4, z), pr = proj(w); if (pr && pr[0] / SZ > .12 && pr[0] / SZ < .88 && pr[2] < 56) { cand(1, w, null); break; } }
    for (const sy of [.52, .6]) for (const sx of [.15, .85, .24, .76, .33, .67]) {
      const d = rayAt(sx, sy); let w = null;
      for (let t = 2; t < 15 && !w; t += .25) { const q = [cam.p[0] + d[0] * t, cam.p[1] + d[1] * t, cam.p[2] + d[2] * t]; if (q[1] > .3 && M.abs(q[0] - xcen(q[2])) > wid(q[2]) / 2 + .3) w = q; }
      if (w && M.hypot(w[0] - tq[0], w[1] - tq[1], w[2] - tq[2]) > 4) { cand(5, w, null); break; }
    }
    for (const sd of [-1, 1]) for (let z = 2; z < 18; z += 1.5) { const w = bankW(sd, -2.2, 6.5, z), pr = proj(w); if (pr && pr[2] < 12) { cand(6, w, null); break; } }
    { const d = rayAt(.5 + (nX[4] - .5) * .4, .72); if (d[1] < -.05) { const t = cam.p[1] / -d[1]; cand(3, [cam.p[0] + d[0] * t, 0, cam.p[2] + d[2] * t], null); } }
    if (mistK > 0) cand(2, [xcen(70), 1.1, 70], null);
    const Lof = (q, k) => TPS[k] / (q.d * q.d);
    const okA = (q, k) => q.k === 2 ? k !== 2 : (Lof(q, k) >= (q.k === 0 && lookK < 2 ? 1.2 : 4)) && (q.k !== 1 || k === 1);
    const bankA = (q) => q.k === 0 || q.k === 1 || q.k === 5 || q.k === 6;
    const WT = [3, 3, 2, 1, 0, 3, 2];
    const pickA = (k, bankOnly) => {
      const v = cands.filter(q => okA(q, k) && (!bankOnly || bankA(q))); if (!v.length) return null;
      const near = v.find(q => q.k === 0);
      if (lookK < 2 && near) {
        const alt = v.filter(q => (q.k === 5 || q.k === 6) && Lof(q, k) >= Lof(near, k));
        return aimR < .5 || !alt.length ? near : alt[M.floor((aimR - .5) * 2 * alt.length)];
      }
      if (k === 1) { const far = v.find(q => q.k === 1); if (far && aimR < .6) return far; }
      let tot = 0; for (const q of v) tot += WT[q.k]; let x = aimR * tot;
      for (const q of v) { x -= WT[q.k]; if (x < 0) return q; } return v[v.length - 1];
    };
    let aimC = null;
    if (home) aimC = cands.find(q => q.k === 0);
    else if (lookK === 4) aimC = { k: 4, s: [.5 + (nX[4] - .5) * .3, .42], d: 8 };
    else {
      aimC = pickA(tK, true);
      if (!aimC) { const alt = pickA(tK, false); if (alt && (tK === 2 || aimR < .5)) aimC = alt; else { aimC = pickA(1, true); if (aimC) tK = 1; else aimC = alt; } }
      else if (aimR < .2 && lookK >= 2 && cands.some(q => q.k === 2 && okA(q, tK))) aimC = cands.find(q => q.k === 2);
    }
    if (!aimC) aimC = { k: 0, s: lookK === 1 ? [.3, .35] : [.3, .55], d: 21 };
    const aimS = aimC.s;
    T('Looking', lookK < 2 ? LOOKS[lookK][0] : STANDS[lookK - 2][0]);
    T('Headtorch', dark ? 'Off, eyes adapted' : TORCHES[tK][0]);
    T('Night', NIGHTS[nightK][0]);
    readView();
    // the synchronous tree: a crown 12 to 35 m off, clear of the beam and the moon, or the bank flashes instead
    if (ffK === 0) {
      const ax = rayAt(aimS[0], aimS[1]);
      const mp = moonR > 0 ? proj([cam.p[0] + moonD[0] * 1e4, cam.p[1] + moonD[1] * 1e4, cam.p[2] + moonD[2] * 1e4]) : null;
      let found = false;
      for (const sd of [-1, 1]) { for (const yy of [6, 10]) { for (let z = 4; z < 120; z += 3) {
        const w = bankW(sd, -.6, yy, z), pr = proj(w); if (!pr) continue;
        const sx = pr[0] / SZ, sy = 1 - pr[1] / SZ; if (sx < .12 || sx > .88 || sy < .1 || sy > .8 || pr[2] < 12 || pr[2] > 35) continue;
        const v = norm([w[0] - cam.p[0], w[1] - cam.p[1], w[2] - cam.p[2]]); if (M.acos(clamp(dot(v, ax), -1, 1)) < .2 + 5 / pr[2]) continue;
        if (mp && M.abs(sx - mp[0] / SZ) < .08 + 3 / (pr[2] * tanH)) continue;
        found = true; break;
      } if (found) break; } if (found) break; }
      if (!found) T('Fireflies', 'Synchronous, along the bank');
    }
    return out;
  },
});
// ==== end roll ====

// ==== roll 553 ====
ProtoRolls.add(553, {
  traits: {"Stage":{"values":{"Mature cell":599775,"Far curtains":220452,"After the storm":119953,"Dusk cell":59820}},"Rainbow":{"values":{"None":894407,"A foot in the rain":36987,"Double":36943,"Single":21199,"Supernumerary fringes":10464}},"Storm":{"look":true,"values":{"Lone thunderhead":248982,"Flanking line":198135,"Twin cells":111465,"Lone thunderhead, rain closing in":103877,"Flanking line, rain closing in":82988,"Mammatus evening":61912,"Lone thunderhead, far off":48093,"Twin cells, rain closing in":46696,"Flanking line, far off":37981,"Mammatus evening, rain closing in":26055,"Twin cells, far off":21708,"Mammatus evening, far off":12108}},"Hour":{"look":true,"values":{"Last hour":470688,"Sun on the escarpment":281854,"Late afternoon":187638,"After sunset":59820}},"Trees":{"values":{"Acacias and a baobab":500660,"Acacia woodland edge":249919,"Open plain, one baobab":249421}},"Grass":{"look":true,"values":{"Red oat grass":474947,"Tall dry stalks":284508,"Burnt and greening":190213,"First flush":50332}},"Wind":{"look":true,"values":{"Steady breeze":498923,"Gusty":350632,"Dust in the air":150445}},"Framing":{"look":true,"values":{"Tower dead ahead":263215,"Rain on the right":170827,"Wide under the anvil":158456,"Rain on the left":139429,"Long lens on the rain's foot":93049,"Long lens on the far cell":60095,"Wide on the far cell":59795,"Bow on the right":23218,"Bow on the left":19152,"Long lens on the bow":12764}},"Standpoint":{"look":true,"values":{"Facing the storm, sun over your right shoulder":382313,"Facing the storm, sun over your left shoulder":312808,"Facing the storm, the sun low on your right":167955,"Facing the storm, the sun low on your left":136924}}},
  roll(hash) {
    const HOME = '0x9c85e9ca4dd51327cd1d4cf3bd4663a696e579c11c50dd8fac96c9c339a6c55c';   // hashFor(552, 0): the site's home
    const home = hash === HOME;
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const seed = (s, m, sh) => { for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (s >>> sh); return s; };
    let hs = 0;
    for (let i = 2; i < 66; i += 8) hs = (Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x9E3779B1) + 0x7F4A7C15) | 0;
    const R = mk(hs);
    const pick = (opts) => { let u = R(), a = 0; for (const [v, w] of opts) { a += w; if (u < a) return v; } return opts[opts.length - 1][0]; };
    const storm = home ? 'Lone thunderhead' : pick([['Lone thunderhead', .4], ['Flanking line', .32], ['Twin cells', .18], ['Mammatus evening', .1]]);
    const hour = home ? 'Last hour' : pick([['Last hour', .5], ['Sun on the escarpment', .3], ['Late afternoon', .2]]);
    if (!home) { pick([['Double', .55], ['Single', .3], ['Supernumerary fringes', .15]]); pick([['Giraffe line', .35], ['Zebra and wildebeest', .35], ['Giraffes and zebra', .2], ['Elephants', .1]]); }   // bowT, herd: unnamed, drawn
    const trees = home ? 'Acacias and a baobab' : pick([['Acacias and a baobab', .5], ['Open plain, one baobab', .25], ['Acacia woodland edge', .25]]);
    const grassT = home ? 'Red oat grass' : pick([['Red oat grass', .5], ['Tall dry stalks', .3], ['Burnt and greening', .2]]);
    const wind = home ? 'Steady breeze' : pick([['Steady breeze', .5], ['Gusty', .35], ['Dust in the air', .15]]);
    const R2 = mk(seed(0x1d553b07, 0xC2B2AE35, 15));
    const sunU = R2(), rangeU = R2();
    const mir = !(home || sunU < .55);
    const range = home || rangeU < .62 ? 'mid' : rangeU < .88 ? 'close' : 'far';
    const R4 = mk(seed(0x5534b0e5, 0x165667B1, 13));
    const st4 = R4(); R4(); const bw4 = R4(), fl4 = R4();
    const X4 = []; for (let k = 0; k < 12; k++) X4.push(R4());
    const stageN = home ? 'Mature cell' : st4 < .6 ? 'Mature cell' : st4 < .72 ? 'Far curtains' : st4 < .84 ? 'After the storm' : st4 < .94 ? 'Far curtains' : 'Dusk cell';
    const dusk = stageN === 'Dusk cell', flush = !home && fl4 < .05;
    const standN = 'Facing the storm';
    let bowK = home ? 'Double' : bw4 < .8 ? 'None' : bw4 < .87 ? 'A foot in the rain' : bw4 < .91 ? 'Single' : bw4 < .97 ? 'Double' : bw4 < .99 ? 'Supernumerary fringes' : 'Double';
    if (!home && !(stageN === 'Mature cell' && range !== 'far')) bowK = 'None';
    const R1 = mk(seed(0x553f2a11, 0x85EBCA6B, 13));
    const frameN = home ? 'Bow on the right' : (() => { const u = R1(); return u < .4 ? 'Bow on the right' : u < .7 ? 'Tower dead ahead' : u < .88 ? 'Wide under the anvil' : 'Long lens on the bow'; })();
    const farLong = range === 'far' && (home || X4[5] < .5);   // FR0[2] 22 < 30; the other far framing is 36
    const side = mir ? 'left' : 'right', bowF = bowK !== 'None';
    const framing = range === 'far' ? (farLong ? 'Long lens on the far cell' : 'Wide on the far cell')
      : frameN === 'Bow on the right' ? (bowF ? 'Bow on the ' : 'Rain on the ') + side : frameN === 'Long lens on the bow' ? (bowF ? frameN : 'Long lens on the rain\'s foot') : frameN;
    const sunRot = !home && !bowF && X4[3] < .34 ? .87 + .53 * X4[4] : 0;
    return [
      ['Stage', stageN], ['Rainbow', bowK],
      ['Storm', range === 'mid' ? storm : storm + (range === 'close' ? ', rain closing in' : ', far off')], ['Hour', dusk ? 'After sunset' : hour],
      ['Trees', trees], ['Grass', flush ? 'First flush' : grassT], ['Wind', wind],
      ['Framing', framing],
      ['Standpoint', standN + (sunRot ? ', the sun low on your ' : ', sun over your ') + (sunRot ? side : side + ' shoulder')],
    ];
  },
});
// ==== end roll ====

// ==== roll 555 ====
ProtoRolls.add(555, {
  traits: {"Light":{"look":true,"values":{"Pink summits":461123,"Deep blue":249546,"Gold on the peaks":182259,"Aurora already":67169,"Aurora night":39903}},"Peaks":{"values":{"Horns":500691,"Long wall":339304,"Twin spires":160005}},"Cabins":{"look":true,"values":{"Red row":420162,"Red and ochre":358953,"A few, far apart":220885}},"Water":{"values":{"Glass":554727,"Slow swell":330287,"Sea smoke":114986}},"Sky":{"values":{"Clear":505029,"Pink cirrus":350988,"Light snowfall":143983}},"Boats":{"look":true,"values":{"Two":460915,"One":279480,"Three":259605}},"Ice":{"look":true,"values":{"Along the shore":460706,"Open water":340037,"New ice on the harbour":199257}},"Moon":{"values":{"None":676272,"Full moon over the peaks":269365,"Low moon and its path":54363}},"View":{"look":true,"values":{"Along the quay":341374,"By the cabins":164282,"Long lens on the row":134362,"Across the harbour":130379,"At the waterline":79873,"Under the racks":79451,"Up the fjord":70279}}},
  roll(hash) {
    const HOME = '0x4ed988f8a222b45041907253a847f013eb79561836d83dfa05c4c0b5801ed875';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const home = hash === HOME;
    const mkR = (salt, mul) => {
      let s = salt;
      for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (s >>> 13);
      const f = () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      for (let i = 0; i < 6; i++) f();
      return f;
    };
    const R = mkR(0x555a11ce, 0x85ebca6b), RG = mkR(0x0c0ffee5, 0x27d4eb2d), RV = mkR(0x7e57ab1e, 0x165667b1);
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const TAU = Math.PI * 2, D2R = Math.PI / 180;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // ---------- traits ----------
    let lightN = home ? 'Pink summits' : pick({ 'Pink summits': 48, 'Deep blue': 26, 'Gold on the peaks': 19, 'Aurora already': 7 });
    const peakN = home ? 'Horns' : pick({ Horns: 50, 'Long wall': 34, 'Twin spires': 16 });
    const cabN = home ? 'Red row' : pick({ 'Red row': 42, 'Red and ochre': 36, 'A few, far apart': 22 });
    let waterN = home ? 'Glass' : pick({ Glass: 55, 'Slow swell': 33, 'Sea smoke': 12 });
    let skyN = home ? 'Clear' : pick({ Clear: 50, 'Pink cirrus': 35, 'Light snowfall': 15 });
    const boatN = home ? 'Two' : pick({ One: 28, Two: 46, Three: 26 });
    const iceN = home ? 'Along the shore' : pick({ 'Along the shore': 46, 'Open water': 34, 'New ice on the harbour': 20 });
    let moonN = home ? 'None' : pick({ None: 72, 'Full moon over the peaks': 28 });
    // where you stand (its own stream, drawn after everything else, so the older rolls never move)
    const RS = mkR(0x51de7a1c, 0x9e3779b1), vw = RS();
    let viewN = home ? 'Along the quay' : vw < .62 ? 'Along the quay' : vw < .88 ? 'Across the harbour' : 'Up the fjord';
    // the new looks (2026-11-11): a fifth stream made after RS, five draws always taken; a mint it does not move keeps
    // its old value. Standpoints near the things (by the cabins, under the racks, at the waterline, a long
    // lens on the row), the aurora night, the low moon with its path on the water
    const RW = mkR(0x7a11ee55, 0x2545f491), wv = [RW(), RW(), RW(), RW(), RW()];
    const RX = RW;   // what the new views draw afterwards (which cabin, which rack, how far)
    if (!home) {
      const keep = { 'Along the quay': 34 / 62, 'Across the harbour': 13 / 26, 'Up the fjord': 7 / 12 }[viewN];
      if (wv[0] > keep) { const u = (wv[0] - keep) / (1 - keep) * 46; viewN = u < 12 ? 'By the cabins' : u < 20 ? 'Under the racks' : u < 24.5 ? 'By the cabins' : u < 29 ? 'Long lens on the row' : u < 37 ? 'At the waterline' : 'Long lens on the row'; }
      if (wv[1] < .04) lightN = 'Aurora night';
      if (moonN === 'None' && wv[2] < 8 / 72 && viewN !== 'Long lens on the row' && lightN !== 'Gold on the peaks') moonN = 'Low moon and its path';   // the long lens's wall hides it; gold light drowns it
      // pairings that wash the night out: the aurora wants a clear dark sky and no moon
      if (lightN === 'Aurora night') { if (skyN === 'Light snowfall') skyN = 'Clear'; if (waterN === 'Sea smoke') waterN = 'Glass'; moonN = 'None'; }
    }
    T('Light', lightN); T('Peaks', peakN); T('Cabins', cabN); T('Water', waterN); T('Sky', skyN);
    T('Boats', boatN); T('Ice', iceN); T('Moon', moonN); T('View', viewN);

    return out;
  },
});
// ==== end roll ====

// ==== roll 556 ====
ProtoRolls.add(556, {
  traits: {"Hour":{"look":true,"values":{"Nautical dusk":400604,"Last light":299490,"Blue hour":199963,"Short night":99943}},"Herd":{"look":true,"values":{"Five horses":400388,"Nine horses":299664,"Three horses":200084,"Mare and foal":99864}},"Moon":{"values":{"None":643539,"Thin crescent":276639,"Full moon rising":79822}},"Wind":{"look":true,"values":{"Light breeze":444288,"Still":333585,"Steady wind":222127}},"Grass":{"values":{"Feather grass":554732,"Short fescue":333791,"Tall feather grass":111477}},"Horizon":{"look":true,"values":{"Low far range":477943,"Open steppe":287948,"Under the ridge":138311,"High range":95798}},"Far lights":{"look":true,"values":{"A neighbour's ger":444522,"None":443768,"Ger and a rider's lamp":111710}},"Sky":{"values":{"Clear":579291,"High cirrus":130234,"Ground mist":99872,"Overcast with a gap":80315,"Far storm":80086,"Noctilucent cloud":30202}},"Looking":{"look":true,"values":{"Into the afterglow":224034,"At the door":148217,"From a rise above the camp":118676,"Into the east":94891,"Among the herd":88694,"Lying in the grass":68382,"Long lens on the skyline":60256,"At the door, into the east":51470,"Along the track":49331,"From a rise above the camp, into the east":41055,"Among the herd, into the east":31177,"Lying in the grass, into the east":23817}}},
  roll(hash) {
    const HOME = '0xc34ae38d0e4c1a058d30d2a9fde9638008cf1f912f002b810f042958f96bf5bc';
    const home = hash === HOME;
    const hx = hash.slice(2).padEnd(64, '0');
    const mkR = salt => {
      let a = parseInt(hx.slice(0, 8), 16) ^ salt, b = parseInt(hx.slice(8, 16), 16), cc = parseInt(hx.slice(16, 24), 16) ^ (salt * 7), d = parseInt(hx.slice(24, 32), 16);
      const r = () => { a |= 0; b |= 0; cc |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) r();
      return r;
    };
    const R = mkR(0x556);
    const vu = mkR(0x7a3c)();
    const stand = home ? 0 : vu < .46 ? 0 : vu < .66 ? 1 : vu < .82 ? 2 : vu < .94 ? 3 : 4;
    const Rn = mkR(0x2b7d), skU = Rn(), lkU = Rn(), fmU = Rn();
    const sky = home ? 0 : skU < .58 ? 0 : skU < .71 ? 1 : skU < .81 ? 3 : skU < .89 ? 5 : skU < .97 ? 2 : 4;
    const fullMoon = !home && fmU < .08;
    let look = home || stand === 4 ? 0 : lkU < .65 ? 0 : lkU < .85 ? 1 : stand === 0 ? 2 : 0;
    if (sky === 4) look = 0;
    if (fullMoon && stand !== 4) look = 1;
    const wu = mkR(0x6c1f)();
    let view = home || stand !== 0 ? 0 : wu < .3 ? 1 : wu < .6 ? 2 : 0;
    const ovr = {}, quiet = { Meteors: 1, Hearth: 1 }, out = [];
    if (fullMoon) ovr.Moon = ['Full moon rising', 0, 2];
    if (view === 2) quiet.Horizon = 1;
    const trait = (name, tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = R() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; if (ovr[name]) v = ovr[name]; if (!quiet[name]) out.push([name, v[0]]); return v[2]; };
    trait('Hour', [['Blue hour', 2, -9.5], ['Nautical dusk', 4, -12.5], ['Last light', 3, -15.5], ['Short night', 1, -19]], 1);
    trait('Herd', [['Five horses', 4, 5], ['Three horses', 2, 3], ['Nine horses', 3, 9], ['Mare and foal', 1, -6]], 0);
    trait('Moon', [['None', 7, 0], ['Thin crescent', 3, 1]], 1);
    trait('Wind', [['Still', 3, .04], ['Light breeze', 4, .2], ['Steady wind', 2, .45]], 1);
    const grassK = trait('Grass', [['Feather grass', 5, 0], ['Short fescue', 3, 1], ['Tall feather grass', 1, 2]], 0);
    if (view === 1 && grassK === 1) view = 0;
    trait('Horizon', [['Low far range', 5, 1], ['Open steppe', 3, 0], ['High range', 1, 2]], 0);
    trait('Far lights', [['None', 4, 0], ['A neighbour\'s ger', 4, 1], ['Ger and a rider\'s lamp', 1, 2]], 1);
    out.push(['Sky', ['Clear', 'High cirrus', 'Overcast with a gap', 'Ground mist', 'Noctilucent cloud', 'Far storm'][sky]]);
    if (view === 2) out.push(['Horizon', 'Under the ridge']);
    out.push(['Looking', (view === 1 ? 'Lying in the grass' : [['Into the afterglow', 'Into the east', 'Along the track'][look], 'At the door', 'From a rise above the camp', 'Among the herd', 'Long lens on the skyline'][stand]) + ((stand > 0 || view === 1) && look === 1 ? ', into the east' : '')]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 559 ====
ProtoRolls.add(559, {
  traits: {"Light":{"look":true,"values":{"Gold haze":399969,"Red sun":279689,"Cloud bank":220096,"Pink dusk":100246}},"Surf":{"look":true,"values":{"Rolling":449783,"Big swell":249736,"Gentle":219885,"Glassy":80596}},"Sun":{"look":true,"values":{"Left of centre":450216,"Dead ahead":349775,"Far left":200009}},"View":{"values":{"Ankle-deep":679298,"Low in the swash":200437,"Along the shore":120265}},"Sky":{"look":true,"values":{"Streaked cirrus":399811,"Clear":174619,"Afterglow":139974,"Far shower":109652,"High sun":79855,"Storm light":69825,"Green rim":26264}},"Tide":{"values":{"Mid tide":619656,"High tide, shore break":220286,"Low tide flats":160058}}},
  roll(hash) {
    const HOME = '0x762ee59eadaa16e85729488ed139dd28316648026396c92bb82ebc7d4d889b74';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME;
    const mk = (h, m, sh) => { for (let i = 2; i < 66; i += 8) h = Math.imul(h ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (h >>> sh); return () => { h = h + 0x6D2B79F5 | 0; let t = Math.imul(h ^ h >>> 15, 1 | h); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const pk = (r, o) => { let tot = 0; for (const k in o) tot += o[k]; let x = r() * tot; for (const k in o) { x -= o[k]; if (x < 0) return k; } return Object.keys(o)[0]; };
    const R = mk(0x559f15e7, 0x85ebca6b, 13);
    for (let i = 0; i < 8; i++) R();
    const lightN = home ? 'Gold haze' : pk(R, { 'Gold haze': 40, 'Red sun': 28, 'Cloud bank': 22, 'Pink dusk': 10 });
    const surfN = home ? 'Rolling' : pk(R, { Rolling: 45, 'Big swell': 25, Gentle: 22, Glassy: 8 });
    if (!home) { pk(R, { Five: 34, Four: 24, Six: 20, Three: 14, 'One alone': 8 }); pk(R, { 'A line': 45, 'Two rows': 25, Scattered: 22, 'Close pair': 8 }); pk(R, { Faded: 50, Bright: 35, 'All white': 15 }); }
    const sunN = home ? 'Left of centre' : pk(R, { 'Left of centre': 45, 'Dead ahead': 35, 'Far left': 20 });
    const R2 = mk(0x0559a11e, 0x27d4eb2f, 15);
    const vU = R2() * 100;
    const viewN = home ? 'Ankle-deep' : vU < 54 || (vU >= 66 && vU < 80) ? 'Ankle-deep' : vU < 66 ? 'Along the shore' : 'Low in the swash';
    const R3 = mk(0x559c0a57, 0x165667b1, 14);
    const skyR = home ? 'Streaked cirrus' : pk(R3, { 'Streaked cirrus': 40, 'Clear': 17, 'Afterglow': 14, 'Far shower': 11, 'Storm light': 7, 'High sun': 8, 'Green rim': 3 });
    const skyN = skyR === 'Green rim' && viewN === 'Along the shore' ? 'Clear' : skyR;
    const tideN = home ? 'High tide, shore break' : pk(R3, { 'Mid tide': 62, 'High tide, shore break': 22, 'Low tide flats': 16 });
    return [['Light', lightN], ['Surf', surfN], ['Sun', sunN], ['View', viewN], ['Sky', skyN], ['Tide', tideN]];
  },
});
// ==== end roll ====

// ==== roll 560 ====
ProtoRolls.add(560, {
  traits: {"Light":{"look":true,"values":{"Fog burning off":416590,"Grey fog, no sun":134890,"Low gold sun":124965,"Into the sun":114449,"Clear after the fog":104537,"After rain":83617,"Moon through fog":20952}},"Fog":{"look":true,"values":{"Morning fog":447719,"Thick fog":214972,"Thin fog":161150,"Burnt off":104537,"Sea fog pouring in":71622}},"Shafts":{"look":true,"values":{"Scattered shafts":455739,"Many shafts":189704,"Few shafts":150602,"No shafts":134890,"One great shaft":69065}},"Grove":{"values":{"Old growth":520490,"Giants":259466,"Young and old":220044}},"Floor":{"look":true,"values":{"Sword ferns":459809,"Sorrel carpet":300173,"Needle duff":180271,"Fern sea":59747}},"Water":{"values":{"Creek":580152,"No creek":220031,"Dry creek bed":199817}},"Near giant":{"look":true,"values":{"Goose pen":477856,"Fire scar":324072,"Burls":198072}},"Hour":{"look":true,"values":{"Mid-morning":445045,"Early":380258,"Late morning":153745,"Night":20952}},"Standpoint":{"look":true,"values":{"In a windfall gap":260376,"Behind a fallen giant":150158,"By the giant":115415,"Low in the ferns":102887,"Inside the goose pen":99910,"In the creek":90349,"Close on the bark":74859,"On the log":74841,"In the dry creek bed":31205}}},
  roll(hash) {
    const HOME = '0x299f11df662960eea91d432aed8c454d2a261871906c433dd938b6d3822b6ec2';
    const out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    const c = { home: hash === HOME, hash, trait: T };
      let hs = 0x9e3779b9;
      for (let i = 2; i < c.hash.length; i += 8) hs = Math.imul(hs ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let fogT = pick({ 'Morning fog': 50, 'Thick fog': 24, 'Thin fog': 18, 'Sea fog pouring in': 8 });
      let shaftT = pick({ 'Scattered shafts': 50, 'Many shafts': 22, 'Few shafts': 20, 'One great shaft': 8 });
      let groveT = pick({ 'Old growth': 52, 'Giants': 26, 'Young and old': 22 });
      let floorT = pick({ 'Sword ferns': 46, 'Sorrel carpet': 30, 'Needle duff': 18, 'Fern sea': 6 });
      let waterT = pick({ 'Creek': 58, 'Dry creek bed': 20, 'No creek': 22 });
      let giantT = pick({ 'Goose pen': 42, 'Fire scar': 36, 'Burls': 22 });
      let hourT = pick({ 'Mid-morning': 52, 'Early': 30, 'Late morning': 18 });
      let hs2 = 0x2545f491;
      for (let i = 2; i < c.hash.length; i += 8) hs2 = Math.imul(hs2 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x9e3779b1) >>> 0;
      const R2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      let standT = 'By the giant';
      { const o = { 'By the giant': 60, 'Behind a fallen giant': 30, 'Inside the goose pen': 10 };
        let s = 0; for (const k in o) s += o[k]; let r = R2() * s; for (const k in o) { r -= o[k]; if (r < 0) { standT = k; break; } } }
      if (c.home) standT = 'By the giant';
      if (standT === 'Inside the goose pen') giantT = 'Goose pen';
      if (c.home) { fogT = 'Morning fog'; shaftT = 'Scattered shafts'; groveT = 'Old growth'; floorT = 'Sword ferns'; waterT = 'Creek'; giantT = 'Goose pen'; hourT = 'Mid-morning'; }
      let ST = standT === 'By the giant' ? 0 : standT === 'Behind a fallen giant' ? 1 : 3;
      let hs3 = 0x7f4a7c15;
      for (let i = 2; i < c.hash.length; i += 8) hs3 = Math.imul(hs3 ^ parseInt(c.hash.slice(i, i + 8), 16), 0xc2b2ae35) >>> 0;
      const R3 = () => { hs3 = hs3 + 0x6D2B79F5 | 0; let t = Math.imul(hs3 ^ hs3 >>> 15, 1 | hs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick3 = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R3() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let lightT = pick3({ 'Fog burning off': 40, 'Grey fog, no sun': 13, 'Low gold sun': 12, 'Into the sun': 11, 'Clear after the fog': 10, 'After rain': 8, 'Blue dusk': 0, 'Moon through fog': 2 });
      let ST2 = 0;
      if (ST === 0 && R3() < .5) {
        const k = pick3({ 'Low in the ferns': 30, 'On the log': 25, 'Close on the bark': 25, 'In the creek': 20 });
        ST2 = k === 'Low in the ferns' ? 1 : k === 'On the log' ? 2 : k === 'Close on the bark' ? 3 : waterT === 'No creek' ? 1 : 4;
        standT = ['', 'Low in the ferns', 'On the log', 'Close on the bark', waterT === 'Dry creek bed' ? 'In the dry creek bed' : 'In the creek'][ST2];
      }
      const lpos = R3(), lsd = R3() - .5;
      if (c.home) { lightT = 'Fog burning off'; ST2 = 0; standT = 'By the giant'; }
      let hs4 = 0x1b873593;
      for (let i = 2; i < c.hash.length; i += 8) hs4 = Math.imul(hs4 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x27d4eb2f) >>> 0;
      const R4 = () => { hs4 = hs4 + 0x6D2B79F5 | 0; let t = Math.imul(hs4 ^ hs4 >>> 15, 1 | hs4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      let ST3 = 0;
      { const a = c.home ? 1 : R4(), b = R4(), plain = ST === 0 && ST2 === 0;
        if ((plain || ST === 1) && a < .5) ST3 = b < .83 || waterT === 'No creek' ? 2 : 4;
        else if (plain && waterT !== 'No creek' && a < .65) ST3 = 4;
        if (ST3 === 4) { ST = 0; ST2 = 4; ST3 = 0; standT = waterT === 'Dry creek bed' ? 'In the dry creek bed' : 'In the creek'; }
        if (ST3) { ST = 0; ST2 = 0; standT = ST3 === 1 ? 'Up the trunks' : 'In a windfall gap'; } }
      const mir = R4() < .5, sunMir = R4() < .5, lieR = R4(), q4 = [R4(), R4(), R4(), R4(), R4(), R4(), R4()];
      const ravine = ST2 === 4;
      if (c.home) ST3 = 0;
      const LI =['Fog burning off', 'Grey fog, no sun', 'Low gold sun', 'Into the sun', 'Clear after the fog', 'After rain', 'Blue dusk', 'Moon through fog'].indexOf(lightT);
      const fogR = fogT, shaftR = shaftT, hourR = hourT;
      if (LI === 1 || LI === 6) shaftT = 'No shafts';
      if (LI === 3 && shaftT === 'Few shafts') shaftT = 'Scattered shafts';
      if (LI === 4) fogT = 'Burnt off';
      if (LI === 2) hourT = 'Early';
      if (LI === 6) hourT = 'Dusk';
      if (LI === 7) hourT = 'Night';
      c.trait('Light', lightT);
      c.trait('Fog', fogT); c.trait('Shafts', shaftT); c.trait('Grove', groveT); c.trait('Floor', floorT);
      c.trait('Water', waterT); c.trait('Near giant', giantT); c.trait('Hour', hourT);
      c.trait('Standpoint', standT);
    return out;
  },
});
// ==== end roll ====

// ==== roll 561 ====
ProtoRolls.add(561, {
  traits: {"Snow":{"look":true,"values":{"Big soft flakes":259278,"Fine steady snow":203557,"Heavy fall":149996,"Last few flakes":120469,"None falling":113243,"Driven flat":85616,"Last flakes, moon breaking":41029,"Last flakes":26812}},"Cold":{"look":true,"values":{"Minus 15":439145,"Minus 22":280482,"Minus 8":280373}},"Water":{"look":true,"values":{"Milky jade":499921,"Milky blue-white":359462,"Iron gold":140617}},"Air":{"values":{"Still":503008,"Drifting down-valley":411376,"A gale down-valley":85616}},"Rim stones":{"values":{"Dark basalt":549660,"Grey granite":450340}},"Paper lantern":{"values":{"Cream":700315,"Red":299685}},"Far lights":{"values":{"Ryokan":500117,"Ryokan and farmhouses":379639,"One far window":120244}},"View":{"look":true,"values":{"From the rocks":260053,"Toward the stone lantern":133004,"From the slope above":129840,"Close on the stone lantern":120300,"Along the rim":111428,"Low at the water":107526,"Up through the snowfall":85834,"In the water":52015}},"Pool":{"look":true,"values":{"A long kidney":450513,"Nearly round":219226,"Two lobes":180436,"Wide, its far end in steam":149825}},"Hour":{"look":true,"values":{"Lantern light, heavy cloud":225391,"Full moon after the snow":137002,"Blue hour":119651,"Moon through thin cloud":102715,"Snowing by day":89897,"Blizzard":85616,"Lantern light, cloud lit by the valley":83495,"Sun on new snow":70308,"First light":42990,"Hard frost":42935}},"Lamps":{"look":true,"values":{"All three":461709,"Stone lantern alone":239084,"None lit":173678,"Paper lantern alone":71734,"The lantern behind you":53795}},"Snow depth":{"values":{"Deep midwinter":549774,"Buried":250119,"A first thin fall":200107}},"Rim":{"values":{"River boulders":500009,"Standing rocks":250042,"Snow bank and a spring":249949}}},
  roll(hash) {
    const HOME = '0xaafa166460f034311116415180f0adc3c1de5298d33e97e83857c038702e565f';   // hashFor(560, 0): the runtime's own home (index = num - 1)
    const home = hash === HOME, out = [];
    const T = (n, v) => { const i = out.findIndex(t => t[0] === n); if (i >= 0) out[i][1] = String(v); else out.push([n, String(v)]); return v; };
    const mk = (seed, mul, sh) => {
      let s = seed;
      for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (s >>> sh);
      const R = () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      return [R, pick];
    };
    const [R, pick] = mk(0x561c0de5, 0x85ebca6b, 13);
    const snowN = T('Snow', home ? 'Big soft flakes' : pick({ 'Big soft flakes': 38, 'Fine steady snow': 30, 'Heavy fall': 22, 'Last flakes, moon breaking': 10 }));
    T('Cold', home ? 'Minus 15' : pick({ 'Minus 8': 28, 'Minus 15': 44, 'Minus 22': 28 }));
    T('Water', home ? 'Milky jade' : pick({ 'Milky jade': 50, 'Milky blue-white': 36, 'Iron gold': 14 }));
    const airN = T('Air', home ? 'Still' : pick({ Still: 55, 'Drifting down-valley': 45 }));
    T('Rim stones', home ? 'Dark basalt' : pick({ 'Dark basalt': 55, 'Grey granite': 45 }));
    T('Paper lantern', home ? 'Cream' : pick({ Cream: 70, Red: 30 }));
    T('Far lights', home ? 'Ryokan' : pick({ Ryokan: 50, 'Ryokan and farmhouses': 38, 'One far window': 12 }));
    const [, pick1] = mk(0x56171e3b, 0x2c1b3c6d, 15);
    let viewN = T('View', home ? 'From the rocks' : pick1({ 'From the rocks': 44, 'Toward the stone lantern': 22, 'Along the rim': 22, 'In the water': airN === 'Still' ? 18 : 0 }));
    const [R2, pick2] = mk(0x5613a7d1, 0x9e3779b1, 14);
    const [R3, pick3] = mk(0x5614b0a7, 0x7feb352d, 16);
    T('Pool', home ? 'A long kidney' : pick3({ 'A long kidney': 45, 'Nearly round': 22, 'Two lobes': 18, 'Wide, its far end in steam': 15 }));
    const valleyLit = R3() < 0.27;
    const [R4] = mk(0x5615d2e0, 0x846ca68b, 12);
    const dayR = R4(), rimR = R4(), slopeR = R4(), r4a = R4();
    const dayN = home ? '' : dayR < 0.09 ? 'Snowing by day' : dayR < 0.16 ? 'Sun on new snow' : '';
    const rimSetN = home ? 'River boulders' : rimR < 0.5 ? 'River boulders' : rimR < 0.75 ? 'Standing rocks' : 'Snow bank and a spring';
    let nightN = home ? 'Lantern light, heavy cloud' : pick2({ 'Lantern light, heavy cloud': 40, 'Full moon after the snow': 16, 'Moon through thin cloud': 8, 'Blue hour': 14, 'Blizzard': 10, 'First light': 5, 'Hard frost': 5 });
    if (snowN === 'Last flakes, moon breaking' && nightN === 'Lantern light, heavy cloud') nightN = 'Moon through thin cloud';
    const moonNight = nightN === 'Full moon after the snow' || nightN === 'Moon through thin cloud';
    let lampsN = home ? 'All three' : pick2(Object.assign({ 'All three': 40, 'Stone lantern alone': 22, 'Paper lantern alone': 16, 'The lantern behind you': 12 }, moonNight ? { 'None lit': 12 } : {}));
    if (nightN === 'First light' && lampsN === 'All three') lampsN = 'Stone lantern alone';
    const depthN = home ? 'Deep midwinter' : pick2({ 'Deep midwinter': 55, 'A first thin fall': 20, 'Buried': 25 });
    let view2 = home ? '' : pick2({ '': 51, 'Back in the garden': 13, 'Low at the water': 12, 'Close on the stone lantern': 12, 'Up through the snowfall': 12 });
    if (view2 === 'Up through the snowfall' && !(moonNight || nightN === 'Blue hour' || nightN === 'First light' || nightN === 'Lantern light, heavy cloud')) view2 = '';
    if (view2 === 'Low at the water' && nightN === 'Blizzard') view2 = '';
    const facesA = view2 === 'Close on the stone lantern' || view2 === 'Low at the water' || (!view2 && (viewN === 'Toward the stone lantern' || viewN === 'In the water'));
    if ((facesA || view2 === 'Up through the snowfall') && (lampsN === 'Paper lantern alone' || lampsN === 'The lantern behind you' || lampsN === 'None lit'))
      lampsN = nightN === 'First light' || lampsN === 'None lit' ? 'Stone lantern alone' : 'All three';
    const rose = nightN === 'Lantern light, heavy cloud' && !home && valleyLit;
    if (rose) nightN = 'Lantern light, cloud lit by the valley';
    if (dayN) { nightN = dayN; lampsN = 'None lit'; if (view2 === 'Up through the snowfall') view2 = ''; }
    if (nightN === 'Blizzard' && !view2 && viewN === 'Along the rim') { viewN = r4a < 0.5 ? 'Toward the stone lantern' : 'From the rocks'; T('View', viewN); }
    if (view2 === 'Back in the garden') view2 = 'From the slope above';
    T('Hour', nightN); T('Lamps', lampsN); T('Snow depth', depthN); T('Rim', rimSetN);
    if (view2) T('View', view2);
    if (nightN === 'Hard frost' || nightN === 'Sun on new snow') T('Snow', 'None falling');
    else if (nightN === 'Full moon after the snow' && view2 !== 'Up through the snowfall') T('Snow', 'Last few flakes');
    else if (nightN === 'Blizzard') T('Snow', 'Driven flat');
    else if (snowN === 'Last flakes, moon breaking' && nightN !== 'Moon through thin cloud') T('Snow', 'Last flakes');
    if (nightN === 'Blizzard') T('Air', 'A gale down-valley');
    return out;
  },
});
// ==== end roll ====

// ==== roll 564 ====
ProtoRolls.add(564, {
  traits: {"Light":{"look":true,"values":{"Low sun on the pan":101816,"First light":101407,"Sun reaching the pan":48469,"Crest fire":48308}},"Dune":{"look":true,"values":{"Star dune":134846,"Long wall":98894,"Twin summits":66260}},"Trees":{"look":true,"values":{"Scattered grove":138215,"Few giants":77812,"Dense stand":59897,"One alone":24076}},"Wind":{"look":true,"values":{"Crests smoking":149687,"Still":102443,"Berg wind":47870}},"Sand":{"look":true,"values":{"Red":149949,"Apricot":84215,"Deep rust":65836}},"Tracks":{"values":{"Oryx tracks":165237,"Clean clay":74660,"Many trails":60103}},"Moon":{"values":{"None":264055,"Setting over the dune":35945}},"Facing":{"values":{"The wall":164927,"Across the vlei":90100,"Down the arm":44973}},"Lens":{"values":{"Eye level":234595,"Long lens":65405}}},
  roll(hash) { return ((Math) => {   // Math as a local: a bare context looks globals up slowly
    const HOME = '0xdc0d5e697465acdf4739c4f249cec745497a9acf5f0e5306934ccc242ede6523';
    const home = hash === HOME, out = [];
    const c = { hash, home, trait(n, v) { out.push([n, String(v)]); return v; } };
    let s0 = 0x564d1e5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const TAU = Math.PI * 2, D2R = Math.PI / 180;
    const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const mixv = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
    const smax = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.max(a, b) + h * h * k * 0.25; };
    const nrm = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
    const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    // a second stream for what came later, so the rolls above stay as they were
    let s1 = 0x1e5564b;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(c.hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    // a third stream for the polish pass (2026-11-10): R's and R2's rolls stay as they were
    let s2 = 0x9d5642b;
    for (let i = 2; i < 66; i += 8) s2 = Math.imul(s2 ^ parseInt(c.hash.slice(i, i + 8), 16), 0xc2b2ae35) ^ (s2 >>> 14);
    const R3 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r3a = R3(), r3b = R3(), r3c = R3();
    const lensWant = home ? false : R2() < 0.25;   // the 'Lens' trait is set once the trees stand (a long lens needs a clear tree)
    let lensN = lensWant ? 'Long lens' : 'Eye level';
    const scl = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
    const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    // ---------- traits ----------
    let lightN = home ? 'First light' : pick({ 'First light': 50, 'Low sun on the pan': 34, 'Crest fire': 16 });
    if (!home && lightN === 'First light' && r3a < 0.32) lightN = 'Sun reaching the pan';   // the shadow's edge is out on the clay
    c.trait('Light', lightN);
    const duneN = c.trait('Dune', home ? 'Star dune' : pick({ 'Star dune': 45, 'Long wall': 33, 'Twin summits': 22 }));
    const treeN = c.trait('Trees', home ? 'Scattered grove' : pick({ 'Scattered grove': 46, 'Few giants': 26, 'Dense stand': 20, 'One alone': 8 }));
    const windN = c.trait('Wind', home ? 'Crests smoking' : pick({ 'Crests smoking': 50, Still: 34, 'Berg wind': 16 }));
    const oryxN = home ? 'One far off' : pick({ 'One far off': 50, None: 30, 'Three crossing': 20 });   // the gemsbok is gone (its tracks stay); the roll is kept so later ones don't move
    const sandN = c.trait('Sand', home || r3c < 0.5 ? 'Red' : r3c < 0.78 ? 'Apricot' : 'Deep rust');
    const trackN = c.trait('Tracks', home ? 'Oryx tracks' : pick({ 'Oryx tracks': 55, 'Clean clay': 25, 'Many trails': 20 }));
    const moonN = c.trait('Moon', home ? 'None' : pick({ None: 88, 'Setting over the dune': 12 }));
    const faceN = c.trait('Facing', home ? 'The wall' : pick({ 'The wall': 55, 'Across the vlei': 30, 'Down the arm': 15 }));
    // a 'Long lens' needs a clear tree, so only then are the dune field and the trees laid out (their R draws come first)
    if (!lensWant) { out.push(['Lens', lensN]); return out; }
    const NV = this._nv || (this._nv = (() => {
      const N = 64, nd = new Uint8Array(N * N * N); let z = 0x9e3779b9;
      for (let i = 0; i < nd.length; i++) { z = Math.imul(z ^ z >>> 15, 0x2c1b3c6d); z = Math.imul(z ^ z >>> 12, 0x297a2d39); z ^= z >>> 15; nd[i] = z & 255; }
      return nd;
    })());
    const n3 = (x, y, z) => {
      const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
      let fx = x - ix, fy = y - iy, fz = z - iz; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy); fz = fz * fz * (3 - 2 * fz);
      const x0 = ix & 63, x1 = (ix + 1) & 63, y0 = (iy & 63) << 6, y1 = ((iy + 1) & 63) << 6, z0 = (iz & 63) << 12, z1 = ((iz + 1) & 63) << 12;
      const l = (a, b, t) => a + (b - a) * t;
      return l(l(l(NV[x0 + y0 + z0], NV[x1 + y0 + z0], fx), l(NV[x0 + y1 + z0], NV[x1 + y1 + z0], fx), fy),
        l(l(NV[x0 + y0 + z1], NV[x1 + y0 + z1], fx), l(NV[x0 + y1 + z1], NV[x1 + y1 + z1], fx), fy), fz) / 255;
    };

    // ---------- the dune field: crest spines [ox, oz, dx, dz, L, H, side, amp, freq, phase, e, back slope] ----------
    const SP = [];
    const spine = (ox, oz, ang, L, H, side, amp, e, ww, freq) => {
      SP.push([ox, oz, Math.sin(ang), Math.cos(ang), L, H, side, amp, freq || 0.004 + 0.003 * R(), R() * TAU, e, ww]);
    };
    const jit = (v, a) => v + (R() - 0.5) * 2 * a;
    // the wall ahead (lee faces the pan), the arm, the east range behind, the side ranges
    const FX = jit(40, home ? 0 : 120), FZ = jit(800, home ? 0 : 60), FH = jit(335, home ? 0 : 25);
    if (duneN === 'Twin summits') {
      const gx = FX - 330 - 80 * R();
      spine(gx, FZ + 40, -1.9, 1200, FH * 0.93, 1, 40, 0.95, 0.22);
      spine(gx, FZ + 40, 1.5, 420, FH * 0.93, -1, 15, 1.0, 0.3);
      spine(FX + 120, FZ - 20, 1.9, 1300, FH, -1, 45, 1.0, 0.22);
      spine(FX + 120, FZ - 20, -1.62, 420, FH, 1, 15, 1.0, 0.3);
    } else {
      spine(FX, FZ, -1.95, 1200, FH, 1, duneN === 'Long wall' ? 25 : 40, duneN === 'Long wall' ? 3.2 : 0.9, 0.22);
      spine(FX, FZ, 1.88, 1300, FH, -1, duneN === 'Long wall' ? 30 : 48, duneN === 'Long wall' ? 3.0 : 1.0, 0.22);
      spine(FX + 330 + jit(0, 60), FZ - 50, Math.PI + 0.22 + jit(0, 0.15), 440, FH * 0.83, 1, 8, 0.85, 0.42, 0.012);
      spine(FX + 720 + jit(0, 80), FZ - 150, Math.PI + 0.38 + jit(0, 0.15), 360, FH * 0.66, 1, 8, 0.85, 0.42, 0.012);
      spine(FX - 470 + jit(0, 60), FZ - 170, Math.PI + 0.05 + jit(0, 0.15), 330, FH * 0.62, 1, 8, 0.85, 0.42, 0.012);
    }
    if (duneN !== 'Long wall') {   // the arm that comes down toward the pan: its right flank faces away from the sun
      const ax0 = duneN === 'Twin summits' ? FX + 120 : FX, az0a = duneN === 'Twin summits' ? FZ - 20 : FZ;
      spine(ax0, az0a, Math.atan2(-270, -450) + (home ? 0 : (R() - 0.5) * 0.3), 560, FH, 1, 10, 0.95, 0.45, 0.01);
    }
    // behind: two star dunes, the nearer one with an arm coming down toward the pan, the higher one beyond its saddle
    const EX = jit(-250, home ? 0 : 120), EZ = jit(-720, home ? 0 : 60), EH = jit(210, home ? 0 : 25);
    spine(EX, EZ, 0.15 + jit(0, 0.2), 430, EH, 1, 8, 0.95, 0.45, 0.012);
    spine(EX, EZ, 1.52, 1250, EH, 1, 50, 1.0, 0.2);
    spine(EX, EZ, -1.82, 900, EH, -1, 45, 1.0, 0.2);
    const E2X = jit(420, home ? 0 : 120), E2Z = jit(-1180, home ? 0 : 80), E2H = jit(275, home ? 0 : 30);
    spine(E2X, E2Z, -0.585, 620, E2H, 1, 10, 0.95, 0.45, 0.01);
    spine(E2X, E2Z, 1.877, 1000, E2H, 1, 45, 1.0, 0.2);
    spine(E2X, E2Z, -2.03, 900, E2H, -1, 45, 1.0, 0.2);
    // the side ranges, each with an arm toward the pan
    const LZ = jit(220, home ? 0 : 80), LH = jit(255, home ? 0 : 30);
    spine(-920, LZ, 2.89, 1100, LH, 1, 50, 1.0, 0.22);
    spine(-920, LZ, -0.2, 900, LH * 0.9, -1, 40, 1.0, 0.22);
    spine(-920, LZ, 1.77, 450, LH, 1, 8, 0.95, 0.45, 0.012);
    const RZ = jit(430, home ? 0 : 60), RH = jit(240, home ? 0 : 25);
    spine(1020, RZ, 3.04, 720, RH, -1, 40, 1.0, 0.22);
    spine(1020, RZ, -0.2, 900, RH * 0.92, 1, 45, 1.0, 0.22);
    spine(1020, RZ, -1.42, 480, RH, 1, 8, 0.95, 0.45, 0.012);
    const NSP = SP.length;
    const PANC = [30, 100], PANR = [330, 235];
    const FFD = (() => { const a = 0.3 + (R() - 0.5) * 0.3; return [Math.sin(a), Math.cos(a)]; })();
    const FFH = 230, FFP = 1350;
    const COR0 = [470, -170], CORD = (() => { const a = 1.98 + (R() - 0.5) * 0.15; return [Math.sin(a), Math.cos(a)]; })();
    const spOff = (s, uc) => s[7] * (Math.sin(uc * s[8] + s[9]) + 0.45 * Math.sin(uc * s[8] * 2.37 + s[9] * 1.9) + 0.24 * Math.sin(uc * s[8] * 5.3 + s[9] * 0.7));
    const spineH = (x, z, s) => {
      const qx = x - s[0], qz = z - s[1];
      const u = qx * s[2] + qz * s[3], v = -qx * s[3] + qz * s[2];
      const uc = Math.min(Math.max(u, 0), s[4]);
      const off = spOff(s, uc);
      const ue = Math.sqrt(uc * uc + 4900) - 70;
      const hc = s[5] * (1 - Math.pow(ue / s[4], s[10])) * (0.9 + 0.075 * Math.sin(uc * s[8] * 0.61 + s[9] * 2.7) + 0.05 * Math.sin(uc * s[8] * 2.9 + s[9] * 1.3) + 0.022 * Math.sin(uc * s[8] * 7.1 + s[9] * 4.1));
      const d = (v - off) * s[6];
      return hc - smax(d * 0.64, -d * s[11], 2) - Math.max(Math.max(-u, u - s[4]), 0) * 0.45;
    };
    const corrD = (x, z) => { const qx = x - COR0[0], qz = z - COR0[1], u = Math.max(qx * CORD[0] + qz * CORD[1], 0); return Math.hypot(qx - CORD[0] * u, qz - CORD[1] * u); };
    const terrain = (x, z) => {
      const ex = (x - PANC[0]) / PANR[0], ez = (z - PANC[1]) / PANR[1];
      const rr = Math.hypot(ex, ez) + 0.22 * (n3(x * 0.006, z * 0.006, 3) - 0.5) + 0.08 * (n3(x * 0.03, z * 0.03, 4) - 0.5);
      const pan = sm(1.04, 0.9, rr);
      const fl = (1 + 4.5 * n3(x * 0.003, z * 0.003, 7)) * (1 - pan) - 0.3 * pan;
      const kc = sm(70, 300, corrD(x, z));
      let m = -1e4;
      for (let i = 0; i < NSP; i++) { const h = spineH(x, z, SP[i]); m = smax(m, h, Math.min(30, Math.max(1.5, 30 - m * 0.09))); }
      let h = smax(fl, m * kc + (kc - 1) * 40, 18);
      const rx = x * FFD[0] + z * FFD[1], ry = -x * FFD[1] + z * FFD[0];
      const y = ry + 260 * Math.sin(rx * 0.00093 + 1.3) + 80 * Math.sin(rx * 0.0027 + 4);
      const i0 = Math.floor(y / FFP), d0 = y - i0 * FFP, d1 = d0 - FFP;
      let fh = Math.max(FFH * (0.2 + 1.1 * n3(i0 * 5.3, rx * 0.0024, 11)) - smax(d0 * 0.62, -d0 * 0.21, 3), FFH * (0.2 + 1.1 * n3(i0 * 5.3 + 5.3, rx * 0.0024, 11)) - smax(d1 * 0.62, -d1 * 0.21, 3));
      fh = fh * kc + (kc - 1) * 40;
      const fd = sm(900, 1900, Math.hypot(x - PANC[0], z - PANC[1]));
      h = smax(h, -100 + (fh + 100) * fd, 26);
      const sk = sm(0.5, 8, h);
      return h + sk * (5.5 * n3(x * 0.0065, z * 0.0065, 1) + 1.5 * n3(x * 0.024, z * 0.024, 2) - 3.5);
    };

    // ---------- the sun path: s 0..1 from first light to full morning ----------
    const az0 = (238 + (home ? 0 : (R() - 0.5) * 16)) * D2R, AZSPAN = 36 * D2R;
    const elOf = (s) => (0.7 + 46 * Math.pow(Math.max(s, 0), 1.45)) * D2R;
    const sOfEl = (deg) => Math.pow(Math.max(deg - 0.7, 0) / 46, 1 / 1.45);
    const S0 = lightN === 'Crest fire' ? sOfEl(1.0 + 0.4 * R()) : lightN === 'Low sun on the pan' ? sOfEl(19 + 3 * R()) : lightN === 'Sun reaching the pan' ? (R(), sOfEl(9 + 2.4 * r3b)) : sOfEl(home ? 2.3 : 2.0 + 0.8 * R());
    const sunAt = (s) => { const el = elOf(s), az = az0 + AZSPAN * s; return { el, az, d: [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)] }; };

    // ---------- camera: the composed opening plus c.view; nothing here turns it ----------
    let yaw0 = (faceN === 'Across the vlei' ? -0.42 : faceN === 'Down the arm' ? -0.2 : 0.03) + (home ? 0 : (R() - 0.5) * 0.08);
    let pitch0 = (faceN === 'Down the arm' ? 3 : 5) * D2R;
    let tanH = Math.tan(30 * D2R);
    const NOVIEW = { yaw: 0, pitch: 0, x: 0, y: 0, z: 0 };
    const cam = { yaw: yaw0, pitch: pitch0, x: 0, y: 1.3, z: 0 };
    let viewKey = '';
    const readView = () => {
      const V = c.view || NOVIEW;
      cam.yaw = yaw0 + (V.yaw || 0);
      cam.pitch = Math.max(-1.3, Math.min(1.3, pitch0 + (V.pitch || 0)));
      const ox = V.x || 0, oz = V.z || 0, r = Math.hypot(ox, oz), k = r > 8 ? 8 / r : 1;
      cam.x = ox * k; cam.z = oz * k; cam.y = -0.3 + Math.max(0.4, Math.min(4, 1.6 + (V.y || 0)));
      const vk = cam.yaw.toFixed(5) + cam.pitch.toFixed(5) + cam.x.toFixed(3) + cam.z.toFixed(3) + cam.y.toFixed(3);
      const ch = vk !== viewKey; viewKey = vk; return ch;
    };
    readView();
    const basis = () => {
      const cy = Math.cos(cam.pitch);
      const fw = [Math.sin(cam.yaw) * cy, Math.sin(cam.pitch), Math.cos(cam.yaw) * cy], rt = [Math.cos(cam.yaw), 0, -Math.sin(cam.yaw)];
      return { fw, rt, up: crs(fw, rt) };
    };
    const rayAt = (sx, sy) => {
      const { fw, rt, up } = basis(), qx = sx * 2 - 1, qy = 1 - sy * 2;
      return nrm([0, 1, 2].map(i => fw[i] + (qx * rt[i] + qy * up[i]) * tanH));
    };
    const project = (x, y, z) => {
      const { fw, rt, up } = basis(), v = [x - cam.x, y - cam.y, z - cam.z];
      const zz = v[0] * fw[0] + v[1] * fw[1] + v[2] * fw[2];
      if (zz < 0.2) return null;
      return [(v[0] * rt[0] + v[1] * rt[1] + v[2] * rt[2]) / zz / tanH, (v[0] * up[0] + v[1] * up[1] + v[2] * up[2]) / zz / tanH];
    };

    // ---------- trees: dead camelthorn skeletons as crooked tapering round-cone segments ----------
    // a piece is 16 floats: a.xyz ra, b.xyz rb, mat tone sA sB (arc length along its limb), u.xyz (a frame vector carried
    // along the limb, for the wood's grain) seed
    // the trees' first generator runs in the art as a ghost that stores nothing: only its R draws matter here. Each draw,
    // each segment counted against the cap and each radius and length that decides a draw is kept, in the art's order;
    // the geometry (which never decides a draw) is left out. (A kinked segment's free half never counts, so bent() is seg().)
    let segCap = 0, segN = 0;
    const seg = () => { if (segN >= segCap) return false; segN++; return true; };
    const turn = () => { R(); };
    const limb = (r, len, depth) => {
      const n = Math.max(1, Math.round(len / (0.42 + 0.35 * R())));
      const rEnd = Math.max(0.018, r * (depth >= 2 ? 0.45 : 0.62));
      let rr = r;
      for (let k = 0; k < n; k++) {
        R();
        turn((R() < 0.08 ? 0.6 : 0.16 + 0.34 * R()) * (k === 0 ? 0.5 : 1));
        const nr = r + (rEnd - r) * (k + 1) / n;
        R();
        if (!seg()) return;
        if (depth < 4 && k < n - 1 && R() < [0.5, 0.5, 0.42, 0.3][depth]) {
          turn(0.6 + 0.5 * R()); const r2 = nr * (0.45 + 0.25 * R()), l2 = len * (0.35 + 0.3 * R());
          limb(r2, l2, depth + 1);
        } else if (R() < 0.22 && nr > 0.04) {
          turn(0.8 + 0.5 * R()); R(); seg();
        }
        rr = nr;
      }
      if (depth < 4 && rr > 0.024 && R() < (depth < 2 ? 0.85 : 0.55)) {
        const nf = R() < 0.35 ? 3 : 2;
        for (let f = 0; f < nf; f++) { turn(0.3 + 0.45 * R()); const r2 = rr * (0.62 + 0.15 * R()), l2 = len * (0.42 + 0.3 * R()); limb(r2, l2, depth + 1); }
      }
    };
    const tree = (x, z, sc, kind) => {
      segCap = segN + (kind === 'hero' ? 520 : 260);
      const r0 = (0.17 + 0.1 * R()) * sc * (kind === 'hero' ? 1.2 : 1);
      R(); if (kind !== 'leaner') R();
      const stems = kind === 'hero' || kind === 'broken' ? 1 : R() < 0.22 ? 2 : 1;
      for (let st = 0; st < stems; st++) {
        R();
        let r = r0 * (st ? 0.75 : 1);
        seg();
        for (let k = 0; k < 2 + (R() < 0.6 ? 1 : 0); k++) { R(); seg(); }
        R();
        const nt = 2 + (R() < 0.5 ? 1 : 0);
        r *= 1.15;
        for (let k = 0; k < nt; k++) { turn(0.15 + 0.3 * R()); const nr = r * 0.88; seg(); r = nr; }
        if (kind === 'broken') {
          turn(0.4); seg();
          for (let k = 0; k < 1 + (R() < 0.6 ? 1 : 0); k++) { turn(0.9 + 0.4 * R()); const r2 = r * 0.5, l2 = (0.9 + 1.4 * R()) * sc; limb(r2, l2, 2); }
          continue;
        }
        const nl = kind === 'hero' ? 4 : 2 + Math.floor(R() * 2.4);
        R();
        for (let k = 0; k < nl; k++) {
          R(); R();
          const r2 = r * (0.6 + 0.2 * R()), l2 = (2.6 + 2.4 * R()) * sc * (kind === 'hero' ? 1.15 : 1); R();
          limb(r2, l2, 0);
        }
      }
      if (R() < 0.45) {
        R(); R(); R(); R(); R();
        for (let k = 0; k < 6; k++) {
          R(); R();
          seg();
          if (R() < 0.35) { R(); R(); R(); seg(); }
        }
      }
    };
    // where the trees stand
    const nTrees = treeN === 'Dense stand' ? 46 : treeN === 'Few giants' ? 10 : treeN === 'One alone' ? 1 : 26;
    const placed = [];
    const inPan = (x, z, m) => Math.hypot((x - PANC[0]) / (PANR[0] - m), (z - PANC[1]) / (PANR[1] - m)) < 1;
    if (treeN === 'One alone') {
      const tx = jit(4, 3), tz = jit(26, 4);
      tree(tx, tz, 1.35, 'hero', 0.3 + 0.4 * R(), 0); placed.push([tx, tz]);
    } else {
      const hx = home ? -4.6 : jit(-5, 3) * (R() < 0.3 ? -1 : 1), hz = home ? 13.5 : jit(15, 3);
      tree(hx, hz, treeN === 'Few giants' ? 1.3 : 1.12, 'hero', 0.25 + 0.4 * R(), 0); placed.push([hx, hz]);
      let tries = 0;
      while (placed.length < nTrees && tries++ < 900) {
        const fwd = R() < 0.62, ang = fwd ? yaw0 + (R() - 0.5) * 1.3 : R() * TAU, dist = 11 + Math.pow(R(), fwd ? 1.25 : 0.8) * 230;
        const x = Math.sin(ang) * dist, z = Math.cos(ang) * dist;
        if (!inPan(x, z, 25) || Math.hypot(x, z) < 9 || terrain(x, z) > 0) continue;
        const sp = treeN === 'Dense stand' ? 9 : treeN === 'Few giants' ? 26 : 14;
        if (placed.some(p => Math.hypot(p[0] - x, p[1] - z) < sp)) continue;
        // keep a clear sight line to the arm and wall in the middle of the opening
        const pr = project(x, 3, z);
        if (pr && Math.abs(pr[0] - 0.15) < 0.12 && Math.hypot(x, z) < 45) continue;
        const kr = R(), kind = kr < 0.12 ? 'broken' : kr < 0.28 ? 'leaner' : 'spread';
        tree(x, z, (treeN === 'Few giants' ? 1.15 : 0.75) + 0.5 * R(), kind, R(), placed.length);
        placed.push([x, z, kind]);
      }
    }
        // 'Long lens': the classic Dead Vlei frame, a 17-22 degree lens on one tree 30-110 m out, set on a third, its foot low in the
    // frame so the lit and shadowed dune face fills the rest (no sky); c.view still turns from it
    let lensTg = null;
    if (lensN === 'Long lens') {
      // a tree 20-140 m out with no clearly nearer tree in the frame; the lens is set from its distance so it stands about half the frame high
      // at a low sun the lit band sits high on the dune: farther trees and a shorter tele bring it into the top of the frame
      const hiSh = lightN === 'First light' || lightN === 'Crest fire', side = R2() < 0.5 ? -1 : 1, fr = (hiSh ? 0.8 : 0.62) + 0.1 * R2(), ang = (q) => Math.atan2(q[0], q[1]);
      const fits = (q) => {   // the tree on one third, else the other
        const d = Math.hypot(q[0], q[1]), th = hiSh ? 0.21 : Math.min(0.2, Math.max(0.07, 5.8 / (0.9 * d)));
        for (const sd of [side, -side]) {
          const yw = ang(q) - sd * Math.atan(0.34 * th);
          let ok = true;
          for (const o of placed) {
            const od = Math.hypot(o[0], o[1]);
            if (o === q || od > 0.72 * d) continue;   // only clearly nearer trees can hide it (others stand in the grove with it)
            const sx = Math.tan(ang(o) - yw) / th;
            if (Math.abs(sx) < 1.1 + 1.5 / Math.max(od, 1) / th && Math.cos(ang(o) - yw) > 0) { ok = false; break; }   // its trunk would stand in the frame (outer branches may frame it)
          }
          if (ok) return { d, th, yw, q, sd };
        }
        return null;
      };
      const cand = placed.filter(q => { const d = Math.hypot(q[0], q[1]); return q[2] !== 'broken' && d > 20 && d < 140 && Math.abs(ang(q) - yaw0) < 0.5; }).map(fits).filter(o => o);
      const tg = cand.length ? cand[Math.floor(R2() * cand.length)] : null;
      lensTg = tg;
      if (tg) {
        // note round: the regrown trees stand at their true 4-6 m, so the lens is longer than the choice above assumed (it is
        // kept as it was so the same mints get a long lens); the tree is set on its third again
        tanH = tg.th * (hiSh ? 0.75 : 0.62); yaw0 = ang(tg.q) - tg.sd * Math.atan(0.34 * tanH);
        pitch0 = -Math.atan(1.3 / tg.d) + Math.atan(fr * tanH);
      } else lensN = 'Eye level';
      readView();
    }
    c.trait('Lens', lensN);
    return out;
  })(Math); },
});
// ==== end roll ====

// ==== roll 566 ====
ProtoRolls.add(566, {
  traits: {"Sun":{"look":true,"values":{"Down the lead":380202,"Low gold":239699,"Across the lead":200020,"Behind you":110128,"Sun pillar":69951}},"Pod":{"look":true,"values":{"Small pod":400217,"Pod of ten":259965,"Pair":240007,"Tusking males":99811}},"Lead":{"look":true,"values":{"Open":450219,"Narrow":300426,"Wide":249355}},"Meltpools":{"look":true,"values":{"Scattered":450091,"Early, few":300498,"Many and joined":249411}},"Calls":{"look":true,"values":{"Fulmars and kittiwakes":340352,"Fulmars":300352,"Kittiwakes":279275,"Ivory gulls":80021}},"Horizon":{"look":true,"values":{"Bergs and coast":442233,"Tabular bergs":301259,"Open ice":220793,"Fata Morgana":35715}},"Ridges":{"values":{"Pressure ridge":500071,"Low ridges":349757,"Great ridge":150172}},"View":{"look":true,"values":{"On the floe edge":449244,"Kneeling at the water":300719,"Across the lead":250037}},"Encounter":{"look":true,"values":{"Out in the lead":499960,"Close to the edge":279897,"Along the floe edge":139913,"Tusks up close":80230}},"Weather":{"values":{"Clear and still":520311,"Low overcast":179765,"Sea smoke":159478,"Light snow":140446}},"Pod is":{"look":true,"values":{"Resting":344436,"Travelling":239846,"Tusks raised":218367,"Diving":137469,"Far up the lead":59882}}},
  roll(hash) {
    const HOME = '0x32c0325c74735bed28268791a6428c9b6f8b56f7ef005a84fe6c43e0712108c4';   // hashFor(565, 0)
    const home = hash === HOME;
    const stream = (seed, mul, sh) => {
      let s = seed;
      for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (s >>> sh);
      return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    };
    const pk = R => (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const out = [];
    const T = (n, v) => { const i = out.findIndex(t => t[0] === n); if (i >= 0) out[i][1] = v; else out.push([n, v]); return v; };
    const pick = pk(stream(0x566a11ed, 0x85ebca6b, 13));
    T('Sun', home ? 'Down the lead' : pick({ 'Down the lead': 38, 'Low gold': 24, 'Across the lead': 20, 'Behind you': 11, 'Sun pillar': 7 }));
    T('Pod', home ? 'Small pod' : pick({ Pair: 24, 'Small pod': 40, 'Pod of ten': 26, 'Tusking males': 10 }));
    T('Lead', home ? 'Open' : pick({ Narrow: 30, Open: 45, Wide: 25 }));
    T('Meltpools', home ? 'Scattered' : pick({ 'Early, few': 30, Scattered: 45, 'Many and joined': 25 }));
    T('Calls', home ? 'Fulmars and kittiwakes' : pick({ Fulmars: 30, Kittiwakes: 28, 'Fulmars and kittiwakes': 34, 'Ivory gulls': 8 }));
    const farN = T('Horizon', home ? 'Bergs and coast' : pick({ 'Bergs and coast': 40, 'Tabular bergs': 26, 'Open ice': 22, 'Fata Morgana': 12 }));
    T('Ridges', home ? 'Pressure ridge' : pick({ 'Low ridges': 35, 'Pressure ridge': 50, 'Great ridge': 15 }));
    T('View', home ? 'On the floe edge' : pick({ 'On the floe edge': 45, 'Kneeling at the water': 30, 'Across the lead': 25 }));
    const pick2 = pk(stream(0x566e9c07, 0xc2b2ae35, 15));
    const encN = T('Encounter', home ? 'Out in the lead' : pick2({ 'Out in the lead': 50, 'Close to the edge': 28, 'Along the floe edge': 14, 'Tusks up close': 8 }));
    const close = encN !== 'Out in the lead';
    const R4 = stream(0x566f09e3, 0x9e3779b1, 12);
    const wxR = R4() * 100;
    T('Weather', home ? 'Clear and still' : wxR < 52 ? 'Clear and still' : wxR < 68 ? 'Sea smoke' : wxR < 86 ? 'Low overcast' : 'Light snow');
    if (farN === 'Fata Morgana' && R4() > .3) T('Horizon', R4() < .5 ? 'Tabular bergs' : 'Bergs and coast');
    const pick3 = pk(stream(0x566d00d5, 0x27d4eb2f, 14));
    const doR = pick3({ Resting: 32, Travelling: 26, Diving: 15, 'Tusks raised': 15, 'Far up the lead': 12 });
    T('Pod is', home ? 'Resting' : encN === 'Tusks up close' ? 'Tusks raised' : close && doR === 'Far up the lead' ? 'Resting' : doR);
    return out;
  },
});
// ==== end roll ====

// ==== roll 568 ====
ProtoRolls.add(568, {
  traits: {"Hour":{"look":true,"values":{"Golden hour":349658,"Sun on the sea":300060,"After sunset":250208,"Blue hour":100074}},"Brine":{"look":true,"values":{"Patchwork":450292,"Deep rose":250125,"Pale pans":219917,"Blood red":79666}},"Sky":{"values":{"High streaks":500070,"Clear":320143,"Mackerel sky":179787}},"Sails":{"values":{"Full canvas":548998,"Reefed":330782,"Bare frames":120220}},"Flamingos":{"look":true,"values":{"A small flock":499478,"A great flock":300143,"Three stragglers":200379}},"Harvest":{"look":true,"values":{"Heaps half tiled":448850,"Fresh white heaps":250557,"Heaps under tiles":200226,"No heaps yet":100367}},"Wind":{"values":{"Land breeze":500555,"Dead calm":299114,"Gusty":200331}},"Standpoint":{"values":{"Down the dyke":500606,"Across the pans":249742,"Over an open pan":150400,"Back to the sun":99252}}},
  roll(hash) {
    const HOME = '0x6dd137f6b58b55b1b99f39cdb87d53035bf1e98c8f4b5c4c1b79141dc3ef8182';   // hashFor(567, 0): the site's home print
    const home = hash === HOME;
    let s0 = 0x568a17e5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const out = [];
    out.push(['Hour', home ? 'Golden hour' : pick({ 'Golden hour': 35, 'Sun on the sea': 30, 'After sunset': 25, 'Blue hour': 10 })]);
    out.push(['Brine', home ? 'Patchwork' : pick({ Patchwork: 45, 'Pale pans': 22, 'Deep rose': 25, 'Blood red': 8 })]);
    out.push(['Sky', home ? 'High streaks' : pick({ 'High streaks': 50, Clear: 32, 'Mackerel sky': 18 })]);
    out.push(['Sails', home ? 'Full canvas' : pick({ 'Full canvas': 55, Reefed: 33, 'Bare frames': 12 })]);
    out.push(['Flamingos', home ? 'A small flock' : pick({ 'A small flock': 50, 'A great flock': 30, 'Three stragglers': 20 })]);
    out.push(['Harvest', home ? 'Heaps half tiled' : pick({ 'Heaps half tiled': 45, 'Fresh white heaps': 25, 'Heaps under tiles': 20, 'No heaps yet': 10 })]);
    out.push(['Wind', home ? 'Land breeze' : pick({ 'Land breeze': 50, 'Dead calm': 30, Gusty: 20 })]);
    let s1 = 0x5a1d7e43;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    out.push(['Standpoint', home ? 'Down the dyke' : (() => { const r = R2() * 100; return r < 50 ? 'Down the dyke' : r < 75 ? 'Across the pans' : r < 90 ? 'Over an open pan' : 'Back to the sun'; })()]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 569 ====
ProtoRolls.add(569, {
  traits: {"Light":{"look":true,"values":{"Gold sunrise":459767,"Pink before the sun":220088,"Red sun in haze":180163,"Hoar frost":139982}},"Mist":{"look":true,"values":{"Sea of mist":480377,"Mist in rags":320223,"Brim full":199400}},"Stag":{"look":true,"values":{"Ten pointer":399485,"Young six pointer":279989,"Royal":200038,"Switch":120488}},"Stag is":{"look":true,"values":{"Roaring":399648,"Watching":220104,"Lying up":100217,"Thrashing":100028,"Walking":100024,"Herding":79979}},"Hinds":{"look":true,"values":{"Five hinds":380235,"A dozen hinds":279402,"Hinds and calves":219859,"Alone":120504}},"Rival":{"values":{"Across the glen":500006,"Two rivals":319195,"Only the echo":180799}},"Birches":{"look":true,"values":{"A few in the mist":459540,"A birch wood":300510,"None":239950}},"Hills":{"values":{"Rounded ranges":500370,"Long glen":300141,"Jagged peaks":199489}},"Slope":{"look":true,"values":{"Bronze bracken":459852,"Heather moor":300420,"Bracken sea":239728}},"Standpoint":{"values":{"Above the knoll":549982,"Higher up the slope":300683,"Down the glen":149335}}},
  roll(hash) {
    const HOME = '0x24991bbe5b7017f7c789d2a8e19b0b4bd3bf602167af3a5809fb0b5fb9034777';   // hashFor(568, 0)
    const home = hash === HOME;
    let s0 = 0x569d0e01;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const lightN = home ? 'Gold sunrise' : pick({ 'Gold sunrise': 46, 'Pink before the sun': 22, 'Red sun in haze': 18, 'Hoar frost': 14 });
    const mistN = home ? 'Sea of mist' : pick({ 'Sea of mist': 48, 'Mist in rags': 32, 'Brim full': 20 });
    const stagN = home ? 'Ten pointer' : pick({ 'Ten pointer': 40, 'Young six pointer': 28, Royal: 20, Switch: 12 });
    let s5 = 0x3b9f12c7; for (let i = 2; i < 66; i += 8) s5 = Math.imul(s5 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s5 >>> 14);
    const R5 = () => { s5 = s5 + 0x6D2B79F5 | 0; let t = Math.imul(s5 ^ s5 >>> 15, 1 | s5); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick5 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R5() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const doN = home ? 'Roaring' : pick5({ Roaring: 40, Watching: 22, Walking: 10, Thrashing: 10, 'Lying up': 10, Herding: 8 });
    const hindN = home ? 'Five hinds' : pick({ 'Five hinds': 38, 'A dozen hinds': 28, 'Hinds and calves': 22, Alone: 12 });
    const rivalN = home ? 'Across the glen' : pick({ 'Across the glen': 50, 'Two rivals': 32, 'Only the echo': 18 });
    const birchN = home ? 'A few in the mist' : pick({ 'A few in the mist': 46, 'A birch wood': 30, None: 24 });
    const hillN = home ? 'Rounded ranges' : pick({ 'Rounded ranges': 50, 'Long glen': 30, 'Jagged peaks': 20 });
    const slopeN = home ? 'Bronze bracken' : pick({ 'Bronze bracken': 46, 'Heather moor': 30, 'Bracken sea': 24 });
    let s3 = 0x7a3c5e91; for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s3 >>> 11);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r3 = R3();
    const standN = home ? 'Above the knoll' : r3 < .55 ? 'Above the knoll' : r3 < .85 ? 'Higher up the slope' : 'Down the glen';
    return [['Light', lightN], ['Mist', mistN], ['Stag', stagN], ['Stag is', doN], ['Hinds', hindN], ['Rival', rivalN], ['Birches', birchN], ['Hills', hillN], ['Slope', slopeN], ['Standpoint', standN]];
  },
});
// ==== end roll ====

// ==== roll 570 ====
ProtoRolls.add(570, {
  traits: {"Hour":{"look":true,"values":{"Sunset":137911,"Golden hour":103671,"Afternoon":80265,"Afterglow":75152,"Sunset, light from the side":74953,"Sun on the ridge":68965,"Sunset, the sun at your back":60182,"Golden hour, light from the side":56318,"Golden hour, the sun at your back":44958,"Sun on the ridge, light from the side":37344,"Heat of the day":36830,"Night":29988,"Sun on the ridge, the sun at your back":29922,"Dawn, light from the side":28472,"Sunset, the sun down the rows":26925,"Dawn, the sun at your back":25428,"Golden hour, the sun down the rows":20163,"Heat of the day, light from the side":20024,"Heat of the day, the sun at your back":15793,"Sun on the ridge, the sun down the rows":13439,"Heat of the day, the sun down the rows":7245,"Dawn, the sun down the rows":5468,"Dawn":584}},"Rows":{"look":true,"values":{"Gentle curve":280716,"Straight to the tree":209802,"Sweeping curve":139354,"Gentle curve, over rolling ground":119758,"Straight to the tree, over rolling ground":90126,"Over the brow":70428,"Sweeping curve, over rolling ground":59940,"Over the brow, over rolling ground":29876}},"Lavender":{"look":true,"values":{"Lavandin in full bloom":333887,"Fine lavender, blue-violet":199884,"Half harvested":111089,"A young field":89043,"An old field with gaps":88719,"Going over":88706,"In bud":88672}},"Sky":{"look":true,"values":{"Clear":254695,"Summer cumulus":120246,"Storm behind the field":120170,"Saharan dust":102061,"High cirrus":101890,"Soft overcast":80265,"After rain":79658,"Mist in the hollows":59952,"Mistral-clear, the Alps sharp":51075,"Moonrise":15068,"The Milky Way":14920}},"Beyond":{"look":true,"values":{"Sunflowers and stubble":299957,"Ripe wheat":150471,"More lavender":149963,"Sunflowers across the far field":124624,"Clary sage beyond the rows":80083,"Pale stubble beyond the rows":79882,"Ripe wheat beyond the rows":59883,"A young lavender field beyond":55137}},"Breeze":{"values":{"Light breeze":556474,"Gusty":222325,"Still":221201}},"Standpoint":{"look":true,"values":{"In a furrow":299526,"Truly across the rows":120190,"Across the rows":120014,"Kneeling among the bushes":120007,"From the bank above the road":119691,"Where two fields meet":80368,"At the ends of the rows":79886,"Down the rows into the sun":60318}},"Farm":{"values":{"A mas with one light":554936,"Two lit windows":334209,"A hilltop village":110855}},"Skyline":{"values":{"A lone walnut":550338,"Nothing but the rows":150399,"An old almond":150234,"A row of trees":149029}}},
  roll(hash) {
    const HOME = '0x658dfe0b2fa8a07b36188482da4326c3de849c1c93257bf17a144e40b3867213';
    const home = hash === HOME, c = { hash };
      const hx = c.hash.slice(2).padEnd(64, '0');
      const mkR = salt => {
        let a = parseInt(hx.slice(0, 8), 16) ^ salt, b = parseInt(hx.slice(8, 16), 16), cc = parseInt(hx.slice(16, 24), 16) ^ (salt * 7), d = parseInt(hx.slice(24, 32), 16);
        const r = () => { a |= 0; b |= 0; cc |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
        for (let i = 0; i < 12; i++) r();
        return r;
      };
      const R = mkR(0x570);
      const TR = [];
      const trait = (name, tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = R() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; TR.push([name, v[0]]); return v[2]; };
      const setT = (name, v) => { for (const t of TR) if (t[0] === name) t[1] = v; };
      const getT = name => { for (const t of TR) if (t[0] === name) return t[1]; return ''; };
      const alt0 = trait('Hour', [['Golden hour', 3, 6.5], ['Sunset', 4, 3.2], ['Sun on the ridge', 2, .9], ['Afterglow', 1, -2.8]], 1);
      const rowsK = trait('Rows', [['Gentle curve', 4, [.35, 1.3]], ['Straight to the tree', 3, [.05, 1.]], ['Sweeping curve', 2, [.72, 1.4]], ['Over the brow', 1, [.3, 5.]]], 0);
      const lavK = trait('Lavender', [['Lavandin in full bloom', 5, 0], ['Fine lavender, blue-violet', 3, 1], ['Half harvested', 1, 2]], 0);
      const skyK = trait('Sky', [['Clear', 5, 0], ['High cirrus', 2, 1], ['Saharan dust', 2, 2], ['Mistral-clear, the Alps sharp', 1, 3]], 0);
      const nbK = trait('Beyond', [['Sunflowers and stubble', 4, 0], ['Ripe wheat', 2, 1], ['More lavender', 2, 2]], 0);
      const windB = trait('Breeze', [['Still', 2, .1], ['Light breeze', 5, .4], ['Gusty', 2, .8]], 1);
      R(); // the old Life roll (swifts and swallowtails left in the polish pass); kept so later rolls stay
      const standK = trait('Standpoint', [['In a furrow', 5, 0], ['Kneeling among the bushes', 2, 1], ['Across the rows', 2, 2], ['Down the rows into the sun', 1, 3]], 0);
      const farmK = trait('Farm', [['A mas with one light', 5, 1], ['Two lit windows', 3, 2], ['A hilltop village', 1, 3]], 0);
      const W = mkR(0x5a17);
      const wpick = tab => { let tot = 0; for (const r of tab) tot += r[1]; let x = W() * tot; for (const r of tab) { x -= r[1]; if (x < 0) return r[0]; } return tab[tab.length - 1][0]; };
      let wxK = wpick([[0, 43], [1, 12], [2, 12], [3, 8], [4, 8], [5, 8], [6, 6], [7, 3]]);
      let sunK = wpick([[0, 45], [1, 25], [2, 20], [3, 10]]); // in the frame, to the side, behind you, straight down the rows
      let st2K = W() < .4 ? wpick([[4, 30], [5, 30], [6, 20], [7, 20]]) : -1; // truly across, from the bank, the row ends, two fields meet
      let landK = wpick([[0, 70], [1, 30]]); // level, rolling
      let treeK = wpick([[0, 55], [1, 15], [2, 15], [3, 15]]); // walnut, almond, a row of trees, nothing
      let stateK = wpick([[0, 60], [1, 10], [2, 10], [3, 10], [4, 10]]); // full bloom, in bud, going over, young, old
      let bandK = W() < .4 ? wpick([[0, 30], [1, 20], [2, 20], [3, 15], [4, 15]]) : -1; // sunflowers, stubble, clary sage, young lavender, wheat
      const sideS = W() < .5 ? -1 : 1, wA = W(), wB = W(), wC = W(), wD = W(), moonK = W() < .5 ? 1 : 0;
      if (home) { wxK = 0; sunK = 0; st2K = -1; landK = 0; treeK = 0; stateK = 0; bandK = -1; }
      if (lavK === 2) stateK = 0;
      if (wxK === 6 && sunK === 0) sunK = 1 + (wD < .5 ? 0 : 1); // dawn mist: the sun to the side or behind you
      if (wxK === 4) sunK = 0; // overcast: no sun to place
      if (alt0 < 0 && wxK < 4) sunK = 0; // the afterglow stays in the frame
      if (st2K === 7 && bandK === 3) bandK = 0;
      const fineSky = wxK === 0 || wxK === 5;
      if (wxK === 5) setT('Hour', 'Heat of the day'); else if (wxK === 4) setT('Hour', 'Afternoon'); else if (wxK === 6) setT('Hour', 'Dawn'); else if (wxK === 7) setT('Hour', 'Night');
      if (wxK !== 4 && wxK !== 7 && sunK === 1) setT('Hour', getT('Hour') + ', light from the side');
      else if (wxK !== 4 && wxK !== 7 && sunK === 2) setT('Hour', getT('Hour') + ', the sun at your back');
      else if (wxK !== 4 && wxK !== 7 && sunK === 3 && standK !== 3) setT('Hour', getT('Hour') + ', the sun down the rows');
      if (!fineSky) setT('Sky', ['', 'Storm behind the field', 'Summer cumulus', 'After rain', 'Soft overcast', '', 'Mist in the hollows', moonK ? 'Moonrise' : 'The Milky Way'][wxK]);
      if (st2K >= 4) setT('Standpoint', ['', '', '', '', 'Truly across the rows', 'From the bank above the road', 'At the ends of the rows', 'Where two fields meet'][st2K]);
      if (landK === 1) setT('Rows', getT('Rows') + ', over rolling ground');
      if (stateK > 0) setT('Lavender', ['', 'In bud', 'Going over', 'A young field', 'An old field with gaps'][stateK]);
      if (bandK >= 0) setT('Beyond', ['Sunflowers across the far field', 'Pale stubble beyond the rows', 'Clary sage beyond the rows', 'A young lavender field beyond', 'Ripe wheat beyond the rows'][bandK]);
      TR.push(['Skyline', ['A lone walnut', 'An old almond', 'A row of trees', 'Nothing but the rows'][treeK]]);
    return TR.map(t => [t[0], String(t[1])]);
  },
});
// ==== end roll ====

// ==== roll 571 ====
ProtoRolls.add(571, {
  traits: {"Light":{"look":true,"values":{"Afterglow":168036,"Blue hour":134203,"Red dusk":109001,"Moonrise":100004,"Sun still up":92126,"Afterglow, side-lit":88239,"Afterglow behind you":87700,"Red dusk behind you":57230,"Red dusk, side-lit":57174,"Blue hour behind you":53184,"Blue hour, side-lit":53103}},"Sky":{"look":true,"values":{"High cirrus":321653,"Clear":201335,"Ribbed altocumulus":160654,"Haze":141111,"Lid and slit":141100,"Grey evening":34147}},"Tide":{"look":true,"values":{"Half flooded":343297,"Islands shrinking":183783,"First tongues":183200,"Tidal bore":179828,"Full mirror":109892}},"Creeks":{"look":true,"values":{"Meanders":400531,"Branching":279663,"One great creek":199617,"Ridges and runnels":120189}},"Island":{"look":true,"values":{"Abbey and spire":479266,"Abbey tower":280815,"Two rocks":140125,"Lone chapel":99794}},"Windows":{"values":{"A few lit":500151,"Village lit":339952,"Floodlit abbey":159897}},"Tracks":{"look":true,"values":{"A party's trail":459377,"Two trails":240235,"One set of prints":160245,"Untrodden":140143}},"Wind":{"look":true,"values":{"Still":438847,"Light air":360567,"Gusty":200586}},"Where you stand":{"look":true,"values":{"Facing the mount":215147,"Low by the water":199997,"Mount to the right":169837,"Along the tide front":105125,"Low horizon":97422,"From a rock":89787,"At your feet":74352,"Close under the mount":48333}}},
  roll(hash) {
    const HOME = '0x129040e361077dcb0081593f5899f016a321f12632b97b7413d05fcebc50b69a';
    const home = hash === HOME;
    let s0 = 0x571f100d;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 8; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const lightN = home ? 'Afterglow' : pick({ Afterglow: 40, 'Red dusk': 26, 'Blue hour': 24, Moonrise: 10 });
    const tideN = home ? 'Spring flood' : pick({ 'Spring flood': 50, 'Slow neap': 32, 'Tidal bore': 18 });
    const creekN = home ? 'Meanders' : pick({ Meanders: 40, Branching: 28, 'One great creek': 20, 'Ridges and runnels': 12 });
    const islN = home ? 'Abbey and spire' : pick({ 'Abbey and spire': 48, 'Abbey tower': 28, 'Two rocks': 14, 'Lone chapel': 10 });
    const winN = home ? 'A few lit' : pick({ 'A few lit': 50, 'Village lit': 34, 'Floodlit abbey': 16 });
    const walkN = home ? 'Guided line' : pick({ 'Guided line': 46, 'Two groups': 24, 'Lone walker': 16, None: 14 });
    if (!home) pick({ Oystercatchers: 42, Gulls: 28, Curlews: 18, 'Great flock': 12 });   // the birds: no trait, but a draw
    const windN = home ? 'Still' : pick({ Still: 44, 'Light air': 36, Gusty: 20 });
    let s1 = 0x5157a11d;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x2c1b3c6d) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R2();
    const pick2 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let stand = home ? 'Facing the mount' : pick2({ 'Facing the mount': 42, 'Mount to the right': 26, 'Low by the water': 20, 'Close under the mount': 12 });
    if (stand === 'Close under the mount' && (islN !== 'Abbey and spire' || winN === 'Floodlit abbey')) stand = 'Mount to the right';
    let s3 = 0x57103a11;
    for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s3 >>> 14);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R3();
    const pick3 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R3() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let face = home ? 'Into the glow' : pick3({ 'Into the glow': 42, 'Glow to one side': 22, 'Glow behind you': 22, 'Sun still up': 14 });
    if (face === 'Sun still up' && (lightN === 'Blue hour' || lightN === 'Moonrise')) face = 'Into the glow';
    if (lightN === 'Moonrise') face = 'Glow behind you';
    const moonOK = lightN !== 'Moonrise';
    const skyN = home ? 'High cirrus' : pick3({ 'High cirrus': 32, Clear: 20, 'Ribbed altocumulus': 16, Haze: 14, 'Lid and slit': 14, 'Grey evening': 3.4 });
    const stageR = pick3({ 'First tongues': 25, 'Half flooded': 35, 'Islands shrinking': 25, 'Full mirror': 15 });
    let stage = home || tideN === 'Tidal bore' ? 'Half flooded' : stageR;
    const st2 = R3() < 0.5, st2v = pick3({ 'From a rock': 24, 'Low horizon': 26, 'At your feet': 22, 'Along the tide front': 28 });
    if (!home && st2 && (stand === 'Facing the mount' || stand === 'Mount to the right') && (moonOK || st2v !== 'At your feet')) stand = st2v;
    if (stand === 'Along the tide front' && stage !== 'Half flooded') stage = 'Half flooded';
    const LN = lightN === 'Moonrise' ? 'Moonrise' : face === 'Sun still up' ? 'Sun still up' : lightN + (face === 'Glow to one side' ? ', side-lit' : face === 'Glow behind you' ? ' behind you' : '');
    return [['Light', LN], ['Sky', skyN], ['Tide', tideN === 'Tidal bore' ? 'Tidal bore' : stage], ['Creeks', creekN], ['Island', islN], ['Windows', winN],
      ['Tracks', { 'Guided line': "A party's trail", 'Two groups': 'Two trails', 'Lone walker': 'One set of prints', None: 'Untrodden' }[walkN]],
      ['Wind', windN], ['Where you stand', stand]];
  },
});
// ==== end roll ====

// ==== roll 572 ====
ProtoRolls.add(572, {
  traits: {"Fog":{"look":true,"values":{"Thick":251685,"Drifting banks":179629,"Lying on the water":139853,"Burning off":120451,"Lying low":108201,"Rain veil":100102,"Pea-souper":60085,"A bar on the horizon":39994}},"Light":{"look":true,"values":{"Pearl dawn":163687,"Fog lifting":139853,"Rose dawn":122437,"Sun burning through":120451,"Night fog":110123,"Drizzle":100102,"Blue hour":82083,"Evening fog":80181,"Silver sun":41089,"Clear dawn":39994}},"Gondolas":{"look":true,"values":{"Rank of six":296985,"Rank of eight":198233,"Three by the steps":164764,"Rank of six, stern-in":72640,"Rank of six, one out":63115,"Rank of eight, stern-in":47647,"Rank of eight, one out":41828,"Three by the steps, stern-in":40286,"Rank out":39863,"Three by the steps, one out":34639}},"Covers":{"look":true,"values":{"Navy covers":300022,"One uncovered":300020,"Mixed covers":250043,"Blue covers":149915}},"Poles":{"look":true,"values":{"Blue and white":400539,"Red and white":299477,"Mixed":219604,"Gilded caps":80380}},"Across the basin":{"values":{"Dome and campanile":500416,"Twin domes":299521,"Lone campanile":200063}},"Lamps":{"look":true,"values":{"Amber glass":449736,"Rose glass":249839,"Pale gold":200431,"Triple lanterns":99994}},"Water":{"values":{"Still":500577,"Light swell":349433,"Passing wake":149990}},"Where you stand":{"look":true,"values":{"On the quay":220391,"The open basin":179916,"Beside the lamp":157243,"At the top of the steps":148719,"Along the rank":126438,"Low on the steps":112422,"Down the quay":54871}}},
  roll(hash) {
    const HOME = '0x30813d11714c712c04a1e752ffe11eca0c7f4e5ce50d2b78db364f2cbd66b1a4';   // hashFor(571, 0)
    const home = hash === HOME;
    let s0 = 0x572f06;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 8; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let s3 = 0x572c3a11;
    for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x7feb352d) ^ (s3 >>> 11);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 5; i++) R3();
    const pick3 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R3() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const airW = pick3({ 'Dawn fog': 41, 'Fog lifting': 14, 'Sun burning through': 12, 'Night fog': 11, Drizzle: 10, 'Evening fog': 8, 'Clear dawn': 4 });
    const AIR = home ? 'Dawn fog' : airW;
    const bearR = R3(), standGate = R3(), standR = R3(), rankR = R3();
    const FORM = home ? 'Bow-in' : rankR < 0.66 ? 'Bow-in' : rankR < 0.82 ? 'Stern-in' : rankR < 0.96 ? 'One out' : 'Rank out';
    const fogRoll = home ? 'Thick' : pick({ Thick: 42, 'Drifting banks': 30, 'Lying low': 18, 'Pea-souper': 10 });
    const lightRoll = home ? 'Pearl dawn' : pick({ 'Pearl dawn': 40, 'Rose dawn': 30, 'Blue hour': 20, 'Silver sun': 10 });
    const out = [];
    out.push(['Fog', { 'Fog lifting': 'Lying on the water', 'Sun burning through': 'Burning off', Drizzle: 'Rain veil', 'Clear dawn': 'A bar on the horizon' }[AIR] || fogRoll]);
    out.push(['Light', AIR === 'Dawn fog' ? lightRoll : AIR]);
    const rankN = home ? 'Rank of six' : pick({ 'Rank of six': 45, 'Rank of eight': 30, 'Three by the steps': 25 });
    out.push(['Gondolas', FORM === 'Rank out' ? 'Rank out' : FORM === 'Bow-in' ? rankN : rankN + (FORM === 'Stern-in' ? ', stern-in' : ', one out')]);
    out.push(['Covers', home ? 'One uncovered' : pick({ 'One uncovered': 30, 'Navy covers': 30, 'Mixed covers': 25, 'Blue covers': 15 })]);
    out.push(['Poles', home ? 'Blue and white' : pick({ 'Blue and white': 40, 'Red and white': 30, Mixed: 22, 'Gilded caps': 8 })]);
    out.push(['Across the basin', home ? 'Dome and campanile' : pick({ 'Dome and campanile': 50, 'Twin domes': 30, 'Lone campanile': 20 })]);
    out.push(['Lamps', home ? 'Amber glass' : pick({ 'Amber glass': 45, 'Rose glass': 25, 'Pale gold': 20, 'Triple lanterns': 10 })]);
    out.push(['Water', home ? 'Still' : pick({ Still: 50, 'Light swell': 35, 'Passing wake': 15 })]);
    let s1 = 0x5720f00d;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x2c1b3c6d) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R2();
    const pick2 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const standRoll = home ? 'On the quay' : pick2({ 'On the quay': 40, 'At the top of the steps': 27, 'Along the rank': 23, 'Down the quay': 10 });
    const standNew = home || standGate >= 0.45 ? null : standR < 0.4 ? 'The open basin' : standR < 0.75 ? 'Beside the lamp' : 'Low on the steps';
    out.push(['Where you stand', standNew || standRoll]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 575 ====
ProtoRolls.add(575, {
  traits: {"Sky":{"look":true,"values":{"Gold blaze":327580,"Mackerel sky":213705,"Monsoon haze":180138,"Fire sky":98545,"Rain":90317,"Dry-season haze":89715}},"Moment":{"look":true,"values":{"Before sunrise":229678,"Sun up":140253,"Deep blue hour":130219,"Blue hour":128792,"First rays":101286,"Grey morning":90317,"Red sun":89715,"Old moon":54715,"Milky Way":35025}},"Lotus":{"look":true,"values":{"Lotus edge":440916,"Open mirror":259990,"Lotus field":199475,"Pink bloom":99619}},"Air":{"values":{"Clear":679770,"Pond mist":179822,"Towers in mist":140408}},"Palms":{"look":true,"values":{"Sugar palms":451236,"Mixed palms":349626,"Lone palm":199138}},"Water":{"values":{"Glass":500721,"Breathing":299981,"Fish rising":199298}},"Standpoint":{"look":true,"values":{"Pond edge":423146,"West corner":258068,"By the causeway":238800,"On the causeway":79986}},"Season":{"look":true,"values":{"Dry season":400478,"Equinox":300334,"Wet season":299188}},"Framing":{"values":{"Eye level":630106,"Low at the water":99900,"Long lens":90166,"Mirror picture":89952,"Sky picture":89876}}},
  roll(hash) {
    const HOME = '0x5b9ef0d0f5eeae2a950be3fc78127b90a01c1139de3dcc2e07798fcf4c951c8b';
    const home = hash === HOME, T = [];
    const trait = (n, v) => { const i = T.findIndex(t => t[0] === n); if (i >= 0) T[i][1] = String(v); else T.push([n, String(v)]); return v; };
    let s0 = 0x575d4a11;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 8; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    trait('Sky', home ? 'Gold blaze' : pick({ 'Gold blaze': 40, 'Mackerel sky': 26, 'Monsoon haze': 22, 'Fire sky': 12 }));
    trait('Moment', home ? 'Before sunrise' : pick({ 'Before sunrise': 50, 'Blue hour': 28, 'First rays': 22 }));
    trait('Lotus', home ? 'Lotus edge' : pick({ 'Lotus edge': 44, 'Open mirror': 26, 'Lotus field': 20, 'Pink bloom': 10 }));
    if (!home) R();
    trait('Air', home ? 'Clear' : pick({ Clear: 68, 'Pond mist': 18, 'Towers in mist': 14 }));
    trait('Palms', home ? 'Sugar palms' : pick({ 'Sugar palms': 45, 'Mixed palms': 35, 'Lone palm': 20 }));
    trait('Water', home ? 'Glass' : pick({ Glass: 50, Breathing: 30, 'Fish rising': 20 }));
    let s2 = 0x3c6ef372;
    for (let i = 2; i < 66; i += 8) s2 = Math.imul(s2 ^ parseInt(hash.slice(i, i + 8), 16), 0xc2b2ae35) ^ (s2 >>> 16);
    const R2 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R2();
    trait('Standpoint', home ? 'Pond edge' : (() => { const r = R2() * 100; return r < 46 ? 'Pond edge' : r < 74 ? 'West corner' : 'By the causeway'; })());
    let s3 = 0x1b873593;
    for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s3 >>> 15);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R3();
    const pick3 = (o, r) => { let tot = 0; for (const k in o) tot += o[k]; r *= tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const rH = R3(), rS = R3(), rS2 = R3(), rF = R3();
    const hourN = home ? 'Dawn' : pick3({ Dawn: 46, 'Sun up': 14, 'Red ball': 9, Rain: 9, 'Deep blue': 13, 'Old moon': 5.5, 'Milky Way': 3.5 }, rH);
    trait('Season', home ? 'Equinox' : pick3({ Equinox: 30, 'Dry season': 40, 'Wet season': 30 }, rS));
    const frameR = home ? 'Eye level' : pick3({ 'Eye level': 55, 'Low at the water': 10, 'Long lens': 9, 'Sky picture': 9, 'Mirror picture': 9, Causeway: 8 }, rF);
    trait('Framing', frameR === 'Causeway' ? 'Eye level' : frameR);
    if (frameR === 'Causeway') trait('Standpoint', 'On the causeway');
    if (hourN !== 'Dawn') trait('Moment', { 'Sun up': 'Sun up', 'Red ball': 'Red sun', Rain: 'Grey morning', 'Deep blue': 'Deep blue hour', 'Old moon': 'Old moon', 'Milky Way': 'Milky Way' }[hourN]);
    if (hourN === 'Rain' || hourN === 'Red ball') trait('Sky', hourN === 'Rain' ? 'Rain' : 'Dry-season haze');
    return T;
  },
});
// ==== end roll ====

// ==== roll 577 ====
ProtoRolls.add(577, {
  traits: {"Doline":{"values":{"Great doline":560212,"Narrow shaft":320091,"Twin dolines":119697}},"Light":{"look":true,"values":{"High noon":221578,"Skylight only":155739,"Beam on the wall":127240,"Slanting sun":118195,"Many rays":109791,"Dusk":99520,"Gold beam":89978,"Passing clouds":41894,"Moonlight":36065}},"Cave cloud":{"look":true,"values":{"Fog banks":386666,"Thin mist":370480,"Cloud sea":122862,"Flooded floor":119992}},"Jungle":{"values":{"Rainforest":559953,"Ferns and saplings":300432,"Red-flowering crowns":139615}},"Expedition":{"look":true,"values":{"Headlamp line":499941,"Two climbers":319935,"Camp below":180124}},"Stalagmites":{"look":true,"values":{"Giant stalagmite":499869,"Stalagmite forest":350313,"Bare chamber":149818}},"Rock":{"values":{"Grey limestone":501178,"Ochre flowstone":358898,"Green algae":139924}},"Swifts":{"values":{"Swifts":599609,"Few swifts":279770,"Great flock":120621}},"Vantage":{"look":true,"values":{"Boulder slope":347940,"Stalagmite foot":160439,"Under the doline":132433,"High ledge":128935,"Across the chamber":112727,"Long lens":76502,"Passage mouth":41024}},"Opening":{"values":{"Round shaft":779932,"Long rift":220068}},"Your lamp":{"values":{"Lit":531869,"Off":468131}}},
  roll(hash) {
    const HOMEH = '0xca2ed4ca0987df4ace2e64382b6e5bdd90b66a2acb507b9e8313982ce42d54fb';   // hashFor(576, 0), as runtime.js: c.home
    const HOME = hash === HOMEH, HASH = hash;   // (the art's DBG hash swap is off: DBG = 0 ships)
      let hs = 0x9e3779b9;
      for (let i = 2; i < HASH.length; i += 8) hs = Math.imul(hs ^ parseInt(HASH.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let dolT = pick({ 'Great doline': 56, 'Narrow shaft': 32, 'Twin dolines': 12 });
      let sunT = pick({ 'High noon': 58, 'Slanting sun': 31, 'Passing clouds': 11 });
      let fogT = pick({ 'Thin mist': 42, 'Fog banks': 44, 'Cloud sea': 14 });
      let junT = pick({ 'Rainforest': 56, 'Ferns and saplings': 30, 'Red-flowering crowns': 14 });
      let expT = pick({ 'Headlamp line': 50, 'Two climbers': 32, 'Camp below': 18 });
      let stlT = pick({ 'Giant stalagmite': 50, 'Stalagmite forest': 35, 'Bare chamber': 15 });
      let rockT = pick({ 'Grey limestone': 50, 'Ochre flowstone': 36, 'Green algae': 14 });
      let swT = pick({ 'Swifts': 60, 'Few swifts': 28, 'Great flock': 12 });
      if (HOME) { dolT = 'Great doline'; sunT = 'High noon'; fogT = 'Fog banks'; junT = 'Rainforest'; expT = 'Headlamp line'; stlT = 'Giant stalagmite'; rockT = 'Grey limestone'; swT = 'Swifts'; }
      let h2 = 0x577a17e5;
      for (let i = 2; i < HASH.length; i += 8) h2 = Math.imul(h2 ^ parseInt(HASH.slice(i, i + 8), 16), 0x27d4eb2f) >>> 0;
      const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      let vanT = 'Boulder slope';
      { const r = R2(); vanT = r < .55 ? 'Boulder slope' : r < .86 ? 'Across the chamber' : 'Passage mouth'; }
      if (HOME) vanT = 'Boulder slope';
      let h3s = 0x5773c0de;
      for (let i = 2; i < HASH.length; i += 8) h3s = Math.imul(h3s ^ parseInt(HASH.slice(i, i + 8), 16), 0x165667b1) >>> 0;
      const R3 = () => { h3s = h3s + 0x6D2B79F5 | 0; let t = Math.imul(h3s ^ h3s >>> 15, 1 | h3s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const r3 = []; for (let k = 0; k < 16; k++) r3.push(R3());
      const pickR = (o, r) => { let s = 0; for (const k in o) s += o[k]; r *= s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
      let litT = pickR({ 'Noon beam': 42, 'Skylight only': 17, 'Beam on the wall': 14, 'Many rays': 12, 'Dusk': 11, 'Moonlight': 4 }, r3[0]);
      let standT = r3[3] < .5 ? vanT : pickR({ 'Under the doline': 34, 'High ledge': 33, 'Long lens': 33 }, r3[4]);
      if (standT === 'Long lens' && (litT === 'Skylight only' || litT === 'Dusk')) standT = 'Under the doline';
      let openT = r3[5] < .22 ? 'Long rift' : 'Round shaft';
      let ownL = litT === 'Dusk' || litT === 'Moonlight' || r3[6] < .45;
      let h4s = 0x5774a11e;
      for (let i = 2; i < HASH.length; i += 8) h4s = Math.imul(h4s ^ parseInt(HASH.slice(i, i + 8), 16), 0x2c1b3c6d) >>> 0;
      const R4 = () => { h4s = h4s + 0x6D2B79F5 | 0; let t = Math.imul(h4s ^ h4s >>> 15, 1 | h4s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const r4 = []; for (let k = 0; k < 12; k++) r4.push(R4());
      if (r4[2] < .09) litT = 'Gold beam';
      const flood = r4[1] < .12;
      if (flood) fogT = 'Flooded floor';
      if (standT === 'Long lens' && litT === 'Beam on the wall') standT = stlT !== 'Bare chamber' ? 'Stalagmite foot' : 'Boulder slope';
      else if (!flood && stlT !== 'Bare chamber' && r4[0] < .13) standT = 'Stalagmite foot';
      if (flood) standT = 'Boulder slope';
      if (standT === 'Under the doline' && openT === 'Long rift') standT = 'Across the chamber';
      if (!flood && (litT === 'Dusk' || litT === 'Skylight only') && (standT === 'Across the chamber' || standT === 'Passage mouth')) standT = stlT !== 'Bare chamber' ? 'Stalagmite foot' : 'Boulder slope';
      if (HOME) { litT = 'Noon beam'; standT = 'Boulder slope'; openT = 'Round shaft'; ownL = false; }
      return [['Doline', dolT], ['Light', litT === 'Noon beam' ? sunT : litT], ['Cave cloud', fogT], ['Jungle', junT],
        ['Expedition', expT], ['Stalagmites', stlT], ['Rock', rockT], ['Swifts', swT],
        ['Vantage', standT], ['Opening', openT], ['Your lamp', ownL ? 'Lit' : 'Off']];
  },
});
// ==== end roll ====

// ==== roll 580 ====
ProtoRolls.add(580, (() => {
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  let NZ = null;   // the art's shared noise table (hash-free), made once
  const noise = () => { if (NZ) return NZ; let z = 0x5bd1e995; const rb = () => { z = Math.imul(z ^ z >>> 15, 0x2c1b3c6d); z = Math.imul(z ^ z >>> 12, 0x297a2d39); z ^= z >>> 15; return z & 255; }; NZ = new Uint8Array(256 * 256); for (let i = 0; i < NZ.length; i++) NZ[i] = rb(); return NZ; };
  return {
    traits: {"Water":{"values":{"Clear":549758,"Plankton bloom":350536,"Milky after a storm":99706}},"Torch":{"values":{"Warm white":500135,"Cool LED":399974,"Red filter":99891}},"Moon":{"look":true,"values":{"Half moon":450651,"New moon":349220,"Full moon":200129}},"Sparks":{"look":true,"values":{"Lively":499758,"Faint":350153,"Noctiluca bloom":150089}},"Swell":{"values":{"Gentle surge":549778,"Still":250278,"Long swell":199944}},"Meadow":{"look":true,"values":{"Cystoseira forest":429210,"Ripple field":230705,"Sand channels":153156,"Dense":135947,"Eroded matte":50982}},"Depth":{"values":{"Ten metres":500148,"Six metres":277987,"Sixteen metres":221865}},"View":{"look":true,"values":{"Over the canopy":255657,"At the forest's edge":214279,"Low over the ripples":161017,"Down on the sand":107325,"The bank":76999,"Over the ripples":69688,"The matte wall":68785,"Up the channel":46250}},"Torch held":{"look":true,"values":{"Low in the right hand":439944,"Low in the left hand":229075,"Wide flood":173616,"Laid on the sand":82568,"Above the mask":74797}},"Season":{"look":true,"values":{"High summer":449310,"Spring growth":300450,"Autumn litter":250240}}},
    roll(hash) {
      const HOME = '0x5de6c9aa10a1f6c44e2f3ee66b5966bf12fcfb62c03729817dfe87aeeb5b9847';
      const home = hash === HOME, hx = String(hash).slice(2), out = [];
      const set = (n, v) => { const i = out.findIndex(r => r[0] === n); if (i >= 0) out[i][1] = String(v); else out.push([n, String(v)]); };
      let s0 = parseInt(hx.slice(0, 8), 16) >>> 0, s1 = parseInt(hx.slice(8, 16), 16) >>> 0, s2 = parseInt(hx.slice(16, 24), 16) >>> 0, s3 = parseInt(hx.slice(24, 32), 16) >>> 0;
      const rnd = () => { s0 >>>= 0; s1 >>>= 0; s2 >>>= 0; s3 >>>= 0; let t = (s0 + s1) | 0; s0 = s1 ^ s1 >>> 9; s1 = s2 + (s2 << 3) | 0; s2 = s2 << 21 | s2 >>> 11; s3 = s3 + 1 | 0; t = t + s3 | 0; s2 = s2 + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) rnd();
      const trait = (name, tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = rnd() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; set(name, v[0]); return v[2]; };
      let r4s = (parseInt(hx.slice(56, 64) || '0', 16) ^ 0x7f4a7c15) >>> 0;
      const rnd4 = () => { r4s = (r4s + 0x6d2b79f5) >>> 0; let q = r4s; q = Math.imul(q ^ q >>> 15, q | 1); q ^= q + Math.imul(q ^ q >>> 7, q | 61); return ((q ^ q >>> 14) >>> 0) / 4294967296; };
      const bR = rnd4(), bV = rnd4(), bL = rnd4();
      const botK = home ? 0 : bR < .34 ? 0 : bR < .55 ? 5 : bR < .66 ? 2 : bR < .76 ? 5 : bR < .88 ? 2 : 5;
      const botV = botK === 1 ? (bV < .6 ? 1 : 2) : botK === 2 ? (bV < .7 ? 3 : 4) : botK === 3 ? 5 : botK === 4 ? 6 : botK === 5 ? (bV < .5 ? 7 : 8) : botK === 6 ? (bV < .5 ? 10 : 9) : 0;
      trait('Water', [['Clear', 11, 0], ['Plankton bloom', 7, 1], ['Milky after a storm', 2, 2]], 0);
      trait('Torch', [['Warm white', 10, 0], ['Cool LED', 8, 1], ['Red filter', 2, 2]], 0);
      const moonK = trait('Moon', [['New moon', 7, 0], ['Half moon', 9, 1], ['Full moon', 4, 2]], 1);
      trait('Sparks', [['Faint', 7, 0], ['Lively', 10, 1], ['Noctiluca bloom', 3, 2]], 1);
      trait('Swell', [['Still', 5, 0], ['Gentle surge', 11, 1], ['Long swell', 4, 2]], 1);
      const meadK = trait('Meadow', [['Dense', 8, 0], ['Sand channels', 9, 1], ['Eroded matte', 3, 2]], 1);
      trait('Depth', [['Six metres', 5, 6], ['Ten metres', 9, 10], ['Sixteen metres', 4, 16]], 1);
      if (botK) set('Meadow', ['', 'Rock reef', 'Ripple field', 'Cobbles and boulders', 'Silt and burrows', 'Cystoseira forest', 'Broken rock'][botK]);
      rnd();   // the old seahorse roll (pairK)
      let r2s = (parseInt(hx.slice(40, 48), 16) ^ 0x9e3779b9) >>> 0;
      const rnd2 = () => { r2s = (r2s + 0x6d2b79f5) >>> 0; let q = r2s; q = Math.imul(q ^ q >>> 15, q | 1); q ^= q + Math.imul(q ^ q >>> 7, q | 61); return ((q ^ q >>> 14) >>> 0) / 4294967296; };
      let viewK = home || rnd2() * 14 < 10 ? 0 : 2;
      let r3s = (parseInt(hx.slice(48, 56) || '0', 16) ^ 0x2545f491) >>> 0;
      const rnd3 = () => { r3s = (r3s + 0x6d2b79f5) >>> 0; let q = r3s; q = Math.imul(q ^ q >>> 15, q | 1); q ^= q + Math.imul(q ^ q >>> 7, q | 61); return ((q ^ q >>> 14) >>> 0) / 4294967296; };
      const pick = (x, tab) => { let a = 0; for (let i = 0; i < tab.length; i++) { a += tab[i]; if (x * 100 < a) return i; } return tab.length - 1; };
      const fR = rnd3(), hR = rnd3(), sR = rnd3(); rnd3(); const spR = [rnd3(), rnd3(), rnd3(), rnd3()];
      let findK = home ? 0 : pick(fR, [46, 22, 12, 20, 0, 0]);
      let holdK = home ? 0 : pick(hR, [32, 27, 22, 0, 19]);
      const seasK = home ? 0 : pick(sR, [45, 30, 25]);
      if (!home && !botK && !findK && !viewK && moonK === 0) findK = 3;
      if (!botK && findK) {
        // the standpoint search runs on the meadow's ground: the rnd draws it reads, then the art's JS ground mirrors
        const fa = rnd() * TAU, FD = [Math.cos(fa), Math.sin(fa)];
        const GPh = [rnd(), rnd(), rnd()];
        const MFv = [rnd() * 200, rnd() * 200, [.3, .36, .42][meadK], .17];
        const cha = (rnd() - .5) * .3;
        const CHv = [-.85 + rnd() * .15, 0, Math.sin(cha), -Math.cos(cha)];
        const CH2v = [0, .7, 5.2 + rnd() * 1.5, 1.4 + rnd() * .8];
        CH2v[0] = [.4, .55, .8][meadK];
        const ra = (rnd() - .5) * .5, RFv = [Math.cos(ra), Math.sin(ra), rnd() * 100, 0];
        const NZ = noise();
        const n2 = (x, y) => {
          const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
          const x0 = ix & 255, y0 = iy & 255, x1 = (x0 + 1) & 255, y1 = (y0 + 1) & 255;
          const a = NZ[y0 * 256 + x0], b = NZ[y0 * 256 + x1], c2 = NZ[y1 * 256 + x0], d = NZ[y1 * 256 + x1];
          const u0 = a + (b - a) * fx, u1 = c2 + (d - c2) * fx; return (u0 + (u1 - u0) * fy) / 255;
        };
        const fb3 = (x, y) => n2(x, y) * .5 + n2(x * 2.03 + 17.1, y * 2.03 + 17.1) * .3 + n2(x * 4.1 + 41.7, y * 4.1 + 41.7) * .2;
        const field = (x, y) => {
          const f = fb3(x * MFv[3] + MFv[0], y * MFv[3] + MFv[1]) - MFv[2] + .35 * Math.exp(-((x - 1.4) * (x - 1.4) + (y + 1) * (y + 1)) / 6);
          const dx = x - CHv[0], dy = y - CHv[1], a = dx * CHv[2] + dy * CHv[3], pd = Math.abs(dx * CHv[3] - dy * CHv[2]);
          const w = CH2v[0] * (.75 + .5 * n2(x * .7 + 3.1, y * .7 + 3.1));
          return f - CH2v[1] * Math.exp(-(pd / w) * (pd / w)) * sstep(-6, -3, a);
        };
        const meadow = (x, y) => sstep(-.04, .05, field(x, y));
        const reefM = (x, y) => sstep(0, 1.6, x * RFv[0] + y * RFv[1] - CH2v[2] - 1.6 * (n2(x * .22 + RFv[2], y * .22 + RFv[2]) - .5));
        const DX = CHv[2], DZ = CHv[3], QX = -CHv[3], QZ = CHv[2];
        const bankAt = (bx, bz, sx, sz) => { let k = 0; for (; k < 3; k += .04) if (meadow(bx + sx * k, bz + sz * k) > .5) break; return k; };
        let SP = null;
        if (findK === 1) {
          const a = 1.3 + spR[0] * 1.8, sd = spR[1] < .5 ? -1 : 1, bx = CHv[0] + DX * a, bz = CHv[1] + DZ * a;
          const k = bankAt(bx, bz, QX * sd, QZ * sd), wx = bx + QX * sd * k, wz = bz + QZ * sd * k;
          for (const bk of [.75, .6, .48]) {
            const ex = wx - QX * sd * bk - DX * .3, ez = wz - QZ * sd * bk - DZ * .3;
            if (!SP && k < 2.9 && meadow(ex, ez) < .4) SP = 1;
          }
        } else if (findK === 2) {
          for (let i = 0; i < 40 && !SP; i++) {
            const a = spR[0] * TAU + i * 2.4, r = 1.2 + 3 * ((spR[1] + i * .37) % 1), x = Math.cos(a) * r, z = Math.sin(a) * r;
            const ax = x + FD[0] * 2.4, az = z + FD[1] * 2.4;
            if (meadow(x, z) > .6 && reefM(x, z) < .01 && meadow(ax, az) > .6 && meadow(x + FD[0] * 1.2, z + FD[1] * 1.2) > .6 && ax * ax + az * az < 64) SP = 1;
          }
        } else if (findK === 3) {
          for (let i = 0; i < 12 && !SP; i++) {
            const a = .9 + ((spR[0] + i * .29) % 1) * 2.4, bx = CHv[0] + DX * a + QX * (spR[1] - .5) * .15, bz = CHv[1] + DZ * a + QZ * (spR[1] - .5) * .15;
            if (meadow(bx, bz) < .15) SP = 1;
          }
        }
        if (!SP) findK = 0;
      }
      if (!botK && holdK === 1 && (findK === 1 || (!findK && !viewK && moonK === 0))) holdK = 0;
      if (botK) { findK = 0; viewK = 0; if (holdK === 2 && (botV === 2 || botK >= 2)) holdK = 0; }
      if ((botK === 2 && bL < .55 && moonK > 0) || (botK === 4 && bL < .35)) holdK = 5;
      set('View', botK ? ['', 'Along the rock', 'Into the crevice', 'Low over the ripples', 'Over the ripples', 'Over the cobbles', 'Over the silt', "At the forest's edge", 'Over the canopy', 'Along the ledges', 'Into the crevice'][botV] : !findK && viewK === 2 ? 'Up the channel' : ['The bank', 'The matte wall', 'Over the canopy', 'Down on the sand', "The reef's foot", 'Up the beam'][findK]);
      set('Torch held', ['Low in the right hand', 'Low in the left hand', 'Above the mask', 'Pencil spot', 'Wide flood', 'Laid on the sand'][holdK]);
      set('Season', ['High summer', 'Spring growth', 'Autumn litter'][seasK]);
      return out;
    },
  };
})());
// ==== end roll ====

// ==== roll 582 ====
ProtoRolls.add(582, {
  traits: {"Wreck":{"look":true,"values":{"Listing to port":450056,"Upright":350147,"Heeled over":199797}},"Growth":{"look":true,"values":{"Soft coral garden":319938,"Purple and orange":177563,"Sea fans":150056,"Table corals":139653,"Yellow whips":127777,"Pink bloom":85013}},"Glassfish":{"values":{"Dense school":500447,"Loose school":319875,"Wall of glassfish":179678}},"Water":{"look":true,"values":{"Red Sea blue":499941,"Turquoise":250049,"Plankton haze":169434,"Gin clear":80576}},"Masts":{"values":{"Two masts":501178,"One mast":298638,"Fallen mast":200184}},"Depth":{"look":true,"values":{"Twenty metres":499870,"Sixteen metres":299706,"Twenty-eight metres":200424}},"Standpoint":{"look":true,"values":{"Beside the hull":280049,"Over the rail":279758,"At the hull's foot":159785,"Off the bow":87700,"Far across the sand":74080,"Up the mast":59631,"Above the deck":58997}},"Ship":{"look":true,"values":{"Bridge amidships":338072,"Bridge aft":284482,"Broken in two":200101,"Bow section only":100099,"Ribs open to the light":77246}},"Light":{"look":true,"values":{"Into the sun":219919,"Late gold":170283,"Late morning":162379,"Sun at your back":159610,"High noon":126157,"Overcast":89954,"Low sun":71698}}},
  roll(hash) {
    const HOME = '0x300f2bc57de79a2ca439f097340060dad5ff9bd90fee67e6eb3a640afc606ff7';
    const home = hash === HOME;
    let hs = 0x9e3779b9;
    for (let i = 2; i < hash.length; i += 8) hs = Math.imul(hs ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) >>> 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let listT = pick({ 'Listing to port': 45, 'Upright': 35, 'Heeled over': 20 });
    let growT = pick({ 'Soft coral garden': 45, 'Purple and orange': 25, 'Yellow whips': 18, 'Pink bloom': 12 });
    let schoolT = pick({ 'Dense school': 50, 'Wall of glassfish': 18, 'Loose school': 32 });
    pick({ 'Turtle and batfish': 35, 'Batfish': 35, 'Turtle': 30 });   // Visitors: kept roll, no trait
    let waterT = pick({ 'Red Sea blue': 50, 'Turquoise': 25, 'Plankton haze': 17, 'Gin clear': 8 });
    let sunT = pick({ 'Late morning': 45, 'High noon': 35, 'Low sun': 20 });
    let mastT = pick({ 'Two masts': 50, 'One mast': 30, 'Fallen mast': 20 });
    let depthT = pick({ 'Twenty metres': 50, 'Sixteen metres': 30, 'Twenty-eight metres': 20 });
    if (home) {
      listT = 'Listing to port'; growT = 'Soft coral garden'; schoolT = 'Dense school';
      waterT = 'Red Sea blue'; sunT = 'Late morning'; mastT = 'Two masts'; depthT = 'Twenty metres';
    }
    let h2 = 0x2545f491;
    for (let i = 2; i < hash.length; i += 8) h2 = Math.imul(h2 ^ parseInt(hash.slice(i, i + 8), 16), 0xc2b2ae35) >>> 0;
    const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const STW = { 'Beside the hull': 56, 'Over the rail': 28, "At the hull's foot": 16 };
    let standT = 'Beside the hull';
    { let r = R2() * 100; for (const k in STW) { r -= STW[k]; if (r < 0) { standT = k; break; } } }
    if (home) standT = 'Beside the hull';
    let h3 = 0x6a09e667;
    for (let i = 2; i < hash.length; i += 8) h3 = Math.imul(h3 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) >>> 0;
    const R3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick3 = (o) => { let s = 0; for (const k in o) s += o[k]; let r = R3() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const moveR = R3(), standN = pick3({ 'Under the stern': 0, 'Off the bow': 22, 'Far across the sand': 20, 'Up the mast': 18, 'Above the deck': 16 });
    let shipT = pick3({ 'Bridge amidships': 38, 'Bridge aft': 32, 'Broken in two': 20, 'Bow section only': 10 });
    let lightT = pick3({ 'Sun across': 40, 'Into the sun': 22, 'Sun at your back': 16, 'Late gold': 13, 'Overcast': 9 });
    let h4 = 0xbb67ae85;
    for (let i = 2; i < hash.length; i += 8) h4 = Math.imul(h4 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) >>> 0;
    const R4 = () => { h4 = h4 + 0x6D2B79F5 | 0; let t = Math.imul(h4 ^ h4 >>> 15, 1 | h4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const g4 = R4(), s4 = R4(), w4 = R4(), p4 = R4(), l4 = R4();
    let shipN = '';
    if (!home) {
      if (g4 < .14) growT = 'Table corals';
      else if (g4 >= .55 && g4 < .7) growT = 'Sea fans';
    }
    if (home) { shipT = 'Bridge amidships'; lightT = 'Sun across'; }
    else if (standT === 'Beside the hull' && moveR < .5) standT = standN;
    if (shipT === 'Bow section only' && (standT === 'Under the stern' || standT === 'Up the mast')) standT = 'Off the bow';
    if (!home && lightT === 'Sun across' && l4 < .1) lightT = 'Late gold';
    if (!home && s4 < .11 && (shipT === 'Bridge amidships' || shipT === 'Bridge aft')) shipN = 'Ribs open to the light';
    return [['Wreck', listT], ['Growth', growT], ['Glassfish', schoolT], ['Water', waterT], ['Masts', mastT], ['Depth', depthT],
      ['Standpoint', standT], ['Ship', shipN || shipT], ['Light', lightT === 'Sun across' ? sunT : lightT]];
  },
});
// ==== end roll ====

// ==== roll 583 ====
ProtoRolls.add(583, {
  traits: {"Visitors":{"look":true,"values":{"Eagle rays and a blacktip":402739,"Blacktip patrol":200422,"Lone ray":160751,"Ray squadron":80459,"Eagle rays and a blacktip, arriving later":73968,"Blacktip patrol, arriving later":37156,"Lone ray, arriving later":29625,"Ray squadron, arriving later":14880}},"Deck light":{"look":true,"values":{"Cool white":242245,"Aqua":145684,"Cool white wide flood":84399,"Cool white pile lamps":84295,"Warm":72562,"Cool white lantern":63369,"Cool white spot":52183,"Aqua wide flood":50800,"Aqua pile lamps":50073,"Aqua lantern":37783,"Aqua spot":31650,"Warm wide flood":25201,"Warm pile lamps":25190,"Warm lantern":18932,"Warm spot":15634}},"Sky":{"look":true,"values":{"Milky Way, core rising":230200,"Low moon":160052,"Full moon":139836,"Milky Way, core high":137598,"First light":100176,"Milky Way overhead":92094,"Passing shower":79750,"Far lightning":60294}},"Floor":{"look":true,"values":{"White sand":421849,"Coral heads":420366,"Seagrass":157785}},"Air":{"values":{"Light air":526006,"Glassy":315906,"Reef swell":158088}},"Plankton":{"look":true,"values":{"Plankton":445120,"Clear":443510,"Mysid cloud":111370}},"Neighbours":{"values":{"Lit walkway":587848,"Late night":294371,"Party hut":117781}},"Depth":{"values":{"Two metres":555585,"Shallow":222493,"Deep":221922}},"Standpoint":{"look":true,"values":{"At the rail":267719,"Sitting on the edge":152491,"Deck corner":149176,"Along the edge":137702,"Low on the steps":105860,"Looking out":100313,"Leaning over the edge":86739}}},
  roll(hash) {
    const HOME = '0x9699caea05f11bf59e63a1b5dfdb137645d3ff4385bb542cd7ddd33ae76239be';
    const home = hash === HOME;
    const out = [];
    const T = (n, v) => { v = String(v); for (const r of out) if (r[0] === n) { r[1] = v; return; } out.push([n, v]); };
    const m32 = (seed) => { let s = seed; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const hx = hash.slice(2).padEnd(64, '0');
    let a0 = parseInt(hx.slice(0, 8), 16) >>> 0, a1 = parseInt(hx.slice(8, 16), 16) >>> 0, a2 = parseInt(hx.slice(16, 24), 16) >>> 0, a3 = parseInt(hx.slice(24, 32), 16) >>> 0;
    const rnd = () => { const t0 = (a0 + a1 | 0) + a3 | 0; a3 = a3 + 1 | 0; a0 = a1 ^ a1 >>> 9; a1 = a2 + (a2 << 3) | 0; a2 = a2 << 21 | a2 >>> 11; a2 = a2 + t0 | 0; return (t0 >>> 0) / 4294967296; };
    for (let i = 0; i < 16; i++) rnd();
    const trait = (name, tab, hi, shown) => { let tot = 0; for (const r of tab) tot += r[1]; let x = rnd() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; T(shown || name, v[0]); return v[2]; };
    const visK = trait('Visitors', [['Eagle rays and a blacktip', 5, 0], ['Blacktip patrol', 2.5, 1], ['Lone ray', 2, 2], ['Ray squadron', 1, 3]], 0);
    const lightK = trait('Deck light', [['Cool white', 5, 0], ['Aqua', 3, 1], ['Warm', 1.5, 2]], 0);
    trait('Milky Way', [['Milky Way, core rising', 5, 0], ['Milky Way, core high', 3, 1], ['Milky Way overhead', 2, 2]], 0, 'Sky');
    const floorK = trait('Floor', [['White sand', 4, 0], ['Coral heads', 4, 1], ['Seagrass', 1.5, 2]], 0);
    trait('Air', [['Light air', 5, 0], ['Glassy', 3, 1], ['Reef swell', 1.5, 2]], 0);
    trait('Plankton', [['Plankton', 4, 0], ['Clear', 4, 1], ['Mysid cloud', 1, 2]], 0);
    trait('Neighbours', [['Lit walkway', 5, 0], ['Late night', 2.5, 1], ['Party hut', 1, 2]], 0);
    trait('Depth', [['Two metres', 5, 0], ['Shallow', 2, 1], ['Deep', 2, 2]], 0);
    const sr = m32((parseInt(hx.slice(40, 48), 16) ^ 0x2545f491) >>> 0);
    const STAND = [['At the rail', 5], ['Deck corner', 3], ['Sitting on the edge', 2.5], ['Leaning over the edge', 1]];
    let stK = 0;
    { let tot = 0; for (const r of STAND) tot += r[1]; let x = sr() * tot; stK = STAND.length - 1; for (let k = 0; k < STAND.length; k++) { x -= STAND[k][1]; if (x < 0) { stK = k; break; } } }
    if (home) stK = 0;
    T('Standpoint', STAND[stK][0]);
    const nr = m32((parseInt(hx.slice(48, 56), 16) ^ 0x7f4a7c15) >>> 0);
    let empty = !home && nr() < .27;
    if (empty && floorK === 0) empty = false;
    if (empty) T('Visitors', ['Eagle rays and a blacktip', 'Blacktip patrol', 'Lone ray', 'Ray squadron'][visK] + ', arriving later');
    let stName = STAND[stK][0];
    const xr = m32((parseInt(hx.slice(56, 64), 16) ^ 0x1b873593) >>> 0);
    const NIGHTS = [['Moonless', 46], ['Low moon', 16], ['Full moon', 14], ['First light', 10], ['Passing shower', 8], ['Far lightning', 6]];
    let ngK = 0;
    { let x = xr() * 100; for (let k = 0; k < NIGHTS.length; k++) { x -= NIGHTS[k][1]; if (x < 0) { ngK = k; break; } } }
    if (home) ngK = 0;
    if (ngK) T('Sky', NIGHTS[ngK][0]);
    xr(); xr(); xr(); xr();
    const sq2 = [xr(), xr(), xr(), xr()];
    if (!home && stK < 2 && sq2[0] < .2 && ngK !== 4) { stK = 4; stName = 'Looking out'; }
    const FOUNDER = hash.toLowerCase() === '0xc2e9cf1343ef7b0f68554361b675baf89af6736353db4138c12dd5e0c100b240';
    const qr = m32((parseInt(hx.slice(8, 16), 16) ^ parseInt(hx.slice(48, 56), 16) ^ 0x3c6ef372) >>> 0);
    for (let i = 0; i < 3; i++) qr();
    const LAMPS = [['', 46], [' pile lamps', 16], [' lantern', 12], [' spot', 10], [' wide flood', 16]];
    let lkK = 0;
    { let x = qr() * 100; for (let k = 0; k < LAMPS.length; k++) { x -= LAMPS[k][1]; if (x < 0) { lkK = k; break; } } }
    if (home || FOUNDER) lkK = 0;
    for (let i = 0; i < 6; i++) qr();
    const sq3 = [qr(), qr(), qr(), qr()];
    const rmL = stK === 4 && (lkK === 2 || lkK === 3);
    if (rmL) { stK = 0; stName = 'At the rail'; }
    const stN = !home && !FOUNDER && stK < 3 && sq3[0] < .3 ? (sq3[1] < .55 || rmL ? 5 : 6) : 0;
    if (stN === 5) stName = 'Along the edge';
    else if (stN === 6) stName = 'Low on the steps';
    T('Deck light', ['Cool white', 'Aqua', 'Warm'][lightK] + LAMPS[lkK][0]);
    T('Standpoint', stName);
    return out;
  },
});
// ==== end roll ====

// ==== roll 584 ====
ProtoRolls.add(584, {
  traits: {"Setting":{"look":true,"values":{"Long row":409493,"Quarry slope":200825,"Lone giant":149636,"A pair":139867,"Seven alike":100179}},"Statues":{"look":true,"values":{"Seven":159150,"One":149636,"Two":139867,"Eleven":117226,"Nine":116154,"Fifteen":109165,"Thirteen":75107,"Twelve":35567,"Eight":34153,"Ten":33447,"Five":27217,"Fourteen":3309,"Six":2}},"Standpoint":{"look":true,"values":{"On the plaza":241823,"Far across the plaza":154126,"Below one statue":141892,"Low in the grass":138599,"On the shore behind them":102545,"Among the heads":60743,"Down the line":56300,"Up the slope":54252,"Beside a great head":49720}},"Hour":{"look":true,"values":{"Nautical dusk":292080,"Nightfall":219624,"Last glow":145942,"Afterglow":109462,"Deep night":87005,"Nautical dawn":55473,"Before dawn":41713,"First light":27882,"Dawn glow":20819}},"Moon":{"values":{"None":750450,"High behind you":129331,"Rising behind them":120219}},"Season":{"look":true,"values":{"June":499423,"December":170901,"September":169897,"March":159779}},"Sky":{"values":{"Clear":639684,"Broken cloud":201086,"Green airglow":159230}},"Topknots":{"look":true,"values":{"None":456052,"One":328942,"Three":68743,"Two":68188,"Five":32109,"Both":31233,"All seven":14733}},"Stone":{"look":true,"values":{"Grey tuff":400304,"Yellow tuff":240012,"Dark, weathered":200303,"Lichen-crusted":109621,"One of red scoria":49760}}},
  roll: (() => {
    // the shared noise table (shared(): one fixed stream, the same for every mint), built on the first roll
    let ndC = null;
    const ND = () => {
      if (ndC) return ndC;
      let ns = 0x1234abcd;
      const NR = () => { ns = ns + 0x6D2B79F5 | 0; let t = Math.imul(ns ^ ns >>> 15, 1 | ns); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      ndC = []; for (let i = 0; i < 65536; i++) ndC.push(Math.floor(NR() * 256));
      return ndC;
    };
    return function roll(hash) {
    const HOME = '0x4828c73f01875ebce548549c871387dd47af11aea74ebfb07abcd0cc5b0fad78';   // hashFor(583, 0): the site's home
    const home = hash === HOME;
    // the piece's module constants and helpers the rolls read (FH is '' and FORCE {} in the shipped art)
    const D2R = Math.PI / 180, NCELL = 20, EYE_H = 1.3, LAT = -27.1 * D2R, FORCE = {};
    const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
    const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
      const hx = hash.slice(2).padEnd(64, '0');
      const mkR = salt => {
        let a = parseInt(hx.slice(0, 8), 16) ^ salt, b = parseInt(hx.slice(8, 16), 16), cc = parseInt(hx.slice(16, 24), 16) ^ (salt * 7), d = parseInt(hx.slice(24, 32), 16);
        const r = () => { a |= 0; b |= 0; cc |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
        for (let i = 0; i < 12; i++) r();
        return r;
      };
      const R = mkR(0x584), L = mkR(0x9e37), Rs = mkR(0x51ed), Rv = mkR(0x5717), Rq = mkR(0x3cbc3);
      const rq = (a, b) => a + (b - a) * Rq();
      const pick = tab => { let tot = 0; for (const r of tab) tot += r[1]; let x = Rq() * tot; for (const r of tab) { x -= r[1]; if (x < 0) return r[0]; } return tab[tab.length - 1][0]; };
      const roll = (tab, hi) => { let tot = 0; for (const r of tab) tot += r[1]; let x = R() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } return home ? tab[hi] : v; };
      const tHour = roll([['Last glow', 2, -11.5], ['Nautical dusk', 4, -14.5], ['Nightfall', 3, -17], ['Deep night', 1, -21]], 2), hour = tHour[2];
      const oStat = roll([[0, 5, 15], [0, 3, 11], [0, 2, 7], [0, 1, -15]], 0)[2], oPuk = roll([[0, 4, 1], [0, 3, 0], [0, 2, 3], [0, 1, 5]], 0)[2];
      const herd = roll([[0, 4, 4], [0, 2, 2], [0, 3, 7], [0, 1, -5]], 0)[2];
      const tSwell = roll([['Long swell', 5, 1], ['Low swell', 3, .6], ['Heavy swell', 2, 1.6]], 0), swell = tSwell[2];
      const windB = roll([[0, 4, .2], [0, 2, .05], [0, 3, .45]], 0)[2];
      const tGlow = roll([['Faint', 6, .3], ['Green bands', 2, .75], ['Clean sky', 2, .1]], 0), glowK = tGlow[2];
      const showerK = roll([[0, 7, 0], [0, 2, 1]], 0)[2];
      const lightK = roll([[0, 4, 1], [0, 3, 0], [0, 2, 2]], 0)[2];
      // the setting, the count and every statue are on a stream of their own:
      // 0 a long platform row of very mixed heights, 6 the same with one that never arrived lying in the grass,
      // 1 seven alike in a tight row, 2 the quarry slope (no platform: heads buried to the shoulders or the chin, near and
      // far), 3 a fallen row with one or two still standing, 4 a lone giant, 5 a pair
      // (the lead, 2026-11-10: the fallen row read as logs and the one lying in the grass as a block at tile size, so
      // those two rolls now give the lone giant or the pair, and the plain long row; the code for them is kept)
      const SET0 = home ? 0 : pick([[0, 36], [6, 5], [1, 10], [2, 20], [3, 12], [4, 9], [5, 8]]);
      const SET = SET0 === 6 ? 0 : SET0 === 3 ? (Rq() < .5 ? 4 : 5) : SET0;
      const ROW = SET === 0 || SET === 6;
      let nSt = ROW ? (home ? 15 : pick([[5, 1], [7, 2], [9, 3], [11, 3], [13, 2], [15, 4]])) : SET === 1 ? 7 : SET === 2 ? 8 + Math.floor(Rq() * 7) : SET === 3 ? 7 + 2 * Math.floor(Rq() * 3) : SET === 4 ? 1 : 2;
      const gap = SET === 1 ? rq(4.3, 4.8) : SET === 5 ? rq(4.6, 5.8) : SET === 3 ? rq(6.6, 7.4) : home ? 94 / 14 : rq(6.3, 7.1);
      const span = SET === 2 ? 60 : (nSt - 1) * gap;
      const sv = Rv();
      let stand = home ? 0 : sv < .55 ? 0 : sv < .8 ? 1 : 2;
      if (SET === 3 && stand === 1) stand = 2;
      if ((SET === 2 || SET === 4 || SET === 5) && stand === 2) stand = 1;
      const Rn = mkR(0x6e196), nK = Rn(), nSe = Rn(), nB = Rn(), nB2 = Rn(), nS1 = Rn(), nS2 = Rn(), nM1 = Rn(), nM2 = Rn(), nC = Rn(), nC2 = Rn(), nL = Rn();
      const fz = (k, v) => FORCE[k] !== undefined ? FORCE[k] : v;
      // 0 the hour as rolled, 1 afterglow (the sun 5.5 to 8 down), 2 a waning moon rising out of the sea behind the
      // row, 3 a high moon behind your shoulder: the moon on 25 in 100
      const night = fz('night', home ? 0 : nK < .13 ? 1 : nK < .25 ? 2 : nK < .38 ? 3 : 0);
      // the date: June dusk (the core rising), September dusk (the band upright through the zenith), December dusk (no
      // core: Orion, Sirius, Canopus, the Clouds high), March before dawn (the Cross over the row, the core high)
      const season = fz('season', home ? 0 : nSe < .5 ? 0 : nSe < .67 ? 1 : nSe < .84 ? 2 : 3);
      const sRA = [5.9, 12, 18, 0][season], sDec = [23.3, 0, -23.4, .5][season] * D2R, morning = season === 3;
      // which way the coast lies under the sky: the row's sea is south-east on 55 in 100 (give or take 25 degrees),
      // any bearing on the rest
      const psi = fz('psi', home ? 0 : nB < .55 ? (nB2 - .5) * 50 : (nB2 - .5) * 360) * D2R;
      const cloud = fz('cloud', !home && nC < .2 ? .45 + .4 * nC2 : 0);
      const azv = a => [Math.sin(a), Math.cos(a)];
      const CY0 = (140 + (home ? 0 : (L() - .5) * 8)) * D2R;
      const AX = CY0 - (33 + (home ? 0 : (L() - .5) * 6) + (SET === 2 ? 20 : 0)) * D2R;   // the row runs away to the left
      const tA = azv(AX), nS = azv(AX + Math.PI / 2);
      const dp0 = home ? 16 : 15 + L() * 4;
      let CY = CY0, P0 = 13 * D2R, dp = dp0, ucen = Math.min(37, span / 2 + 8.5), jT = -1;
      if (SET === 2) { dp = dp0 + 9; ucen = 30; P0 = (stand === 1 ? 15 : 11) * D2R; }
      else {
        if (SET === 1) dp = dp0 - 4;
        if (SET === 4 || SET === 5) { dp = dp0 - 3; ucen = span / 2 + 11; }
        if (stand === 1) {
          // a few metres off one statue near the near end of the row, its face above you, the row receding to the left
          jT = nSt < 3 ? 0 : 1 + Math.floor(Rv() * 3);
          const off = 2.5 + Rv() * 1.5;
          dp = 8 + Rv() * 1.5; ucen = off + span / 2 - jT * gap;
          CY = Math.atan2(tA[0] * off + nS[0] * dp, tA[1] * off + nS[1] * dp) - .2 - Rv() * .08; P0 = (24 + Rv() * 4) * D2R;
        } else if (stand === 2) {
          // inland of the axis past the near end, the row running away on the right toward the core's rising
          ucen = span / 2 + 6 + Rv() * 3; dp = 6 + Rv() * 1.5;
          CY = AX + .2 + Rv() * .06; P0 = (8 + Rv() * 3) * D2R;
          if (SET === 3) { ucen += 5; dp += 5.5; CY += .1; }   // clear of the ramp and what lies on it
        }
      }
      // the second draw of where you stand (45 in 100, never the home), each with its own lens: far back across the
      // plaza through a long lens (the row a frieze, each head over the next), on the shore behind the platform looking
      // inland at their backs, low in the grass with a wide lens, or on the quarry slope looking up it (no sea)
      let lensD = 35, eyeH = EYE_H, stand2 = -1;
      if (!home && nS1 < .45 || FORCE.stand2 !== undefined) {
        const opts = SET === 2 ? [[3, 3], [2, 2]] : [[0, 3], [1, 2], [2, 2]];
        stand2 = fz('stand2', (() => { let tot = 0; for (const o of opts) tot += o[1]; let x = nS2 * tot; for (const o of opts) { x -= o[1]; if (x < 0) return o[0]; } return opts[0][0]; })());
        if (stand2 === 0) {
          lensD = 20; dp = dp0 + 6 + nL * 8; ucen = span / 2 + 26 + nL * 14;
          CY = Math.atan2(nS[0] * dp + tA[0] * (ucen - span * .15), nS[1] * dp + tA[1] * (ucen - span * .15)); P0 = 5 * D2R;
        } else if (stand2 === 1) {
          dp = -(12 + nL * 3); ucen = (nL - .5) * Math.min(span, 30) * .5;
          CY = Math.atan2(nS[0] * dp + tA[0] * ucen, nS[1] * dp + tA[1] * ucen) + (nM2 - .5) * .5; P0 = 15 * D2R; lensD = 38;
        } else if (stand2 === 2) {
          lensD = 49; eyeH = .42; P0 = (17 + 6 * nL) * D2R;
        } else {
          CY = CY0 + Math.PI + (nL - .5) * .6; P0 = 10 * D2R; lensD = 33;
        }
      }
      const A = [nS[0] * dp + tA[0] * ucen, nS[1] * dp + tA[1] * ucen];
      const nd = ND();
      const nzJ = (x, y) => {
        const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy; fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
        const cx = ix & 255, cy = iy & 255, ex = (cx + 1) & 255, ey = (cy + 1) & 255;
        const a = nd[cy * 256 + cx] / 255, b = nd[cy * 256 + ex] / 255, g = nd[ey * 256 + cx] / 255, h = nd[ey * 256 + ex] / 255;
        const u0 = a + (b - a) * fx, u1 = g + (h - g) * fx; return u0 + (u1 - u0) * fy;
      };
      const T0 = [L() * 200, L() * 200, L() * 200, L() * 200];
      const CSp = [24 + L() * 4, 14, 5, 60], KN = .8, SLPv = SET === 2 ? .2 : .07;   // the quarry's ground climbs faster inland
      const coastJ = u => CSp[0] + CSp[1] * (nzJ(u / 70 + T0[0], 3.1 + T0[1]) - .5) + CSp[2] * (nzJ(u / 17 + T0[2], 7.7 + T0[3]) - .5) - CSp[3] * smooth(45, 170, u);
      const shoreJ = (x, z) => { const dx = x - A[0], dz = z - A[1]; return dx * nS[0] + dz * nS[1] - coastJ(dx * tA[0] + dz * tA[1]); };
      const Zs = (x, z) => {
        const dx = x - A[0], dz = z - A[1], s = dx * nS[0] + dz * nS[1], u = dx * tA[0] + dz * tA[1], sh = s - coastJ(u);
        const inl = Math.max(-sh - 30, 0);
        let h = 2.6 + 70 * (1 - Math.exp(-inl / 1600)) + SLPv * inl * Math.exp(-inl / 150) + KN * Math.exp(-(x * x + z * z) / 500);
        h += smooth(30, 400, inl) * (22 * (nzJ(x / 900 + T0[1], z / 900 + T0[0]) - .5) + 9 * (nzJ(x / 240 + T0[2], z / 240 + T0[3]) - .5) + 2.5 * (nzJ(x / 70 + T0[3], z / 70 + T0[2]) - .5));
        h += .7 * (nzJ(x / 31 + T0[3], z / 31 + T0[0]) - .5) * smooth(4, 30, inl) + .12 * (nzJ(x / 6.3 + T0[0], z / 6.3 + T0[3]) - .5);
        if (sh > -30) h += -Math.max(sh + 27, 0) * .07 + .6 * (nzJ(x / 9 + T0[1], z / 9 + T0[3]) - .5) * smooth(-26, -20, sh);
        return h;
      };
      const Zcam = Zs(0, 0);
      const H = (x, z) => Zs(x, z) - Zcam;
      const aRow = AX + Math.PI;   // local x toward the near end, local z inland
      const inland = [-nS[0], -nS[1]];
      const wAt = (u, zl) => [A[0] + tA[0] * u + inland[0] * (zl || 0), A[1] + tA[1] * u + inland[1] * (zl || 0)];
      const PB = { set() {} };   // the statues' shape data: not a trait
      let nCell = 0;
      const tStone = pick([['Grey tuff', 40], ['Yellow tuff', 24], ['Dark, weathered', 20], ['Lichen-crusted', 11], ['One of red scoria', 5]]);
      const pal = { 'Grey tuff': [.3, 1, .6], 'Yellow tuff': [.85, 1.15, .5], 'Dark, weathered': [.2, .62, .4], 'Lichen-crusted': [.4, .9, 1.5], 'One of red scoria': [.35, 1, .6] }[tStone];
      const school = { head: rq(.33, .41), wide: rq(.175, .225), box: rq(2.8, 3.9), brow: rq(.018, .03), nose: rq(.04, .068), ero: rq(.15, .8), jut: Rq() };
      const own = SET === 1 ? .28 : 1;
      const ind = (m, sp) => m + sp * own * (Rq() * 2 - 1);
      const tOf = y => y < .6 ? y / 1.2 : .5 + (y - .6) / .8;
      const moai = (hm, quarry, worn) => {
        const st = { cell: Math.min(nCell++, NCELL - 1), hm, seed: Rq() * 200 };
        const head = clamp(ind(school.head + (quarry ? .08 : 0), .05), .3, .52), yN = 1 - head;
        const wS = clamp(ind(school.wide, .03), .14, .26), wB = wS * clamp(ind(.96, .1), .8, 1.1);
        const fB = ind(.142, .02), bB = ind(.125, .015), belly = Math.max(0, ind(.1, .14));
        const wH = wS * clamp(ind(quarry ? .55 : .66, .09), .46, .8), fH = ind(.138, .016), bH = ind(.125, .016), wJ = clamp(ind(.86, .08), .7, 1);
        const er = clamp(ind(school.ero + (quarry ? .15 : 0) + (worn || 0), .35), .05, 1.5);
        const dBr = Math.max(.012, ind(school.brow, .008)) * (quarry ? .5 : 1), vB = quarry ? ind(.8, .025) : ind(.77, .04), dS = quarry ? ind(.012, .004) : ind(.03, .01), sW = quarry ? .5 : ind(.3, .05);
        const pN = Math.max(.03, ind(school.nose + (quarry ? .02 : 0), .014)), vNb = ind(quarry ? .33 : .36, .035), tipW = ind(.4, .09), nEx = quarry ? ind(1.7, .4) : ind(1.15, .35);
        const pL = quarry ? Math.max(.009, ind(.017, .005)) : Math.max(.004, ind(.011, .005)), vM = vNb - ind(.085, .015), pC = Math.max(.004, ind(.014 + .012 * school.jut, .008)), mW = ind(.56, .1);
        const tE = Math.max(.006, ind(.012, .004)), vE0 = ind(.26, .1), arms = quarry ? 0 : clamp(ind(.8, .5), 0, 1.1) * (1 - .5 * Math.min(er, 1));
        const cap = quarry ? Math.max(.014, ind(.03, .014)) : Math.max(.025, ind(.06, .035)), box = clamp(ind(school.box, .5), 2.5, 4.4), neck = clamp(ind(.65, .35), .2, 1.1);
        PB.set([quarry ? .25 : 0, yN, st.seed, er, wB, wS, fB, bB, wH, fH, bH, wJ, dBr, vB, dS, sW, pN, vNb, tipW, nEx, pL, vM, pC, mW, tE, vE0, arms, belly, cap, box, 0, neck], st.cell * 32);
        st.yN = yN; st.fB = fB; st.bB = bB; st.fH = fH; st.wH = wH; st.wS = wS;
        st.warm = clamp(pal[0] + .2 * (Rq() * 2 - 1), 0, 1); st.tone = pal[1] * (1 + .22 * (Rq() * 2 - 1)); st.lichen = Math.max(0, pal[2] * (1 + .6 * (Rq() * 2 - 1))); st.red = 0;
        return st;
      };
      const halfAhu = SET === 2 ? -1.5 : Math.max(span / 2 + 4.5, 7), yAhu = H(A[0], A[1]) - .05, yTop = yAhu + 2.16;
      const inst = [[], [], []];
      const addI = a => { return;  const k = a[2] / (Math.hypot(a[8], a[10]) || 1); inst[k > .45 ? 0 : k > .12 ? 1 : 2].push(a); };
      const piece = (st, tLo, tHi, x, y, z, yaw, lean, fwd, lift, soil) => addI([0, st.cell, st.hm, st.seed, yaw, lean, fwd, st.warm, x, y, z, 0, st.lichen, st.red, soil || 0, 0, lift || 0, tLo, tHi, st.tone]);
      const knot = (pk, x, y, z, yaw, lean, fwd, lift, sd) => addI([0, pk.cell, pk.ph, sd, yaw, lean, fwd, .3, x, y, z, 0, .35, 1, 0, 0, lift, 0, 1, 1]);
      const stand1 = (st, u, zl) => { const [x, z] = wAt(u, zl); st.x = x; st.z = z; st.yaw = aRow + ind(0, .09); st.lean = ind(0, Rq() < .15 ? .11 : .04); st.fw = ind(0, .04); piece(st, 0, 1, x, yTop - .02 * st.hm, z, st.yaw, st.lean, st.fw, 0); st.up = 1; return st; };
      const stats = [];
      let nPuk = 0, tPuk = 'None', tEyes = 'Empty sockets';
      if (SET !== 2) { const [x, z] = wAt(0); inst[1].push([1, 0, 1, 0, aRow, 0, 0, 1, x, yAhu, z, 1, 0, 0, 1, halfAhu, 0, 0, 0, 0]); }
      if (SET === 2) {
        // the quarry slope: heads near and far, each sunk to its own depth and tilted its own way, the greatest nearest
        const fw = azv(CY), rg = [fw[1], -fw[0]], put = [];
        for (let i = 0, n = nSt; i < n; i++) {
          let d, l, hm, x, z, ok = false;
          for (let k = 0; k < 14 && !ok; k++) {
            d = i === 0 ? (stand === 1 ? rq(5.6, 6.6) : rq(8.5, 10.5)) : 9 + 36 * Math.pow((i - 1 + Rq()) / (n - 1), 1.25);
            l = i === 0 ? (Rq() < .5 ? -1 : 1) * d * rq(.24, .4) : d * rq(-.62, .62);
            hm = i === 0 ? rq(10.5, 13.5) : rq(5.5, 11.5);
            x = fw[0] * d + rg[0] * l; z = fw[1] * d + rg[1] * l;
            ok = shoreJ(x, z) < -9 && put.every(q => Math.hypot(q[0] - x, q[1] - z) > (q[2] + hm) * .3 + 1.2);
          }
          if (!ok) { nSt--; continue; }
          put.push([x, z, hm]);
          const st = moai(hm, true), bury = i === 0 ? rq(.42, .5) : rq(.4, .66);
          const yaw = Math.atan2(-x, -z) - Math.PI / 2 + (i === 0 ? (l > 0 ? 1 : -1) * rq(.35, .8) : rq(-1.1, 1.1));
          piece(st, 0, 1, x, H(x, z) - bury * hm, z, yaw, rq(-.14, .14) * 1.9, rq(-.2, .13) * 1.5 - .03, 0, bury);
          stats.push(st);
        }
      } else if (SET === 3) {
        // the fallen row: thrown down across the ramp, most on their faces, some on their backs, most broken at the
        // neck with the head a little way on; one or two still stand (fallen topknots are left out: at this size a red
        // drum in the grass reads as a barrel)
        const up = [Math.floor(Rq() * nSt)]; if (Rq() < .5) up.push(Math.floor(Rq() * nSt));
        for (let i = 0; i < nSt; i++) {
          const u = -span / 2 + i * gap + rq(-.5, .5), st = moai(rq(4.8, 8.2), false, up.includes(i) ? 0 : .35);
          stats.push(st);
          if (up.includes(i)) { stand1(st, u, 0); if (Rq() < .25) { crown(st); nPuk++; } continue; }
          const back = Rq() < .4, z0 = rq(.2, 1), fwd = (back ? -1 : 1) * (Math.PI / 2 + .293 + rq(-.05, .05)), yaw = aRow + (back ? Math.PI : 0) + rq(-.25, .25), lean = rq(-.14, .14);
          const [x, z] = wAt(u, z0), dn = back ? st.bB : st.fB, y = yAhu + 1.5 - .3016 * (z0 - 2.7) + dn * st.hm * .98;
          const ax = [Math.sin(fwd) * Math.cos(yaw), Math.cos(fwd), -Math.sin(fwd) * Math.sin(yaw)];
          if (Rq() < .75) {
            const tn = tOf(st.yN - .015), dl = rq(.4, 1.5), hl = lean + rq(-.8, .8), drop = (dn - (st.fH * Math.abs(Math.cos(hl)) + st.wH * Math.abs(Math.sin(hl)))) * st.hm * .95;
            piece(st, 0, tn, x, y, z, yaw, lean, fwd, 0);
            piece(st, tn, 1, x + ax[0] * dl, y + ax[1] * dl - drop, z + ax[2] * dl, yaw + rq(-.35, .35), hl, fwd + rq(-.06, .06), 0);
          } else piece(st, 0, 1, x, y, z, yaw, lean, fwd, 0);
        }
        tPuk = ['None', 'One', 'Two'][nPuk];
      } else {
        // a row on the platform: the long one of very mixed heights, the seven alike, the pair, the lone giant
        const h0 = rq(4.3, 5.2);
        for (let i = 0; i < nSt; i++) {
          const k = Rq(), hm = SET === 1 ? h0 * ind(1, .2) : SET === 4 ? rq(8.6, 10.4) : SET === 5 ? (i === 0 ? rq(6.6, 9) : rq(3.8, 6.4)) : k < .2 ? rq(2.9, 4.2) : k < .78 ? rq(4.4, 6.6) : k < .95 ? rq(6.8, 8.4) : rq(8.8, 10);
          stats.push(Object.assign(moai(hm, false), { u: -span / 2 + i * gap + (nSt > 1 ? rq(-.5, .5) : 0) }));
        }
        if (jT >= 0 && stats[jT].hm < 6.6) stats[jT].hm = 6.6 + Rv() * 1.6;
        for (const st of stats) stand1(st, st.u, 0);
        // topknots
        nPuk = SET === 4 ? (Rq() < .7 ? 1 : 0) : SET === 5 ? pick([[0, 3], [1, 4], [2, 2]]) : SET === 1 ? pick([[0, 5], [1, 2], [7, 1]]) : home ? 1 : Math.min(nSt, pick([[1, 4], [0, 3], [2, 2], [3, 2], [5, 1]]));
        tPuk = nPuk === nSt && nSt > 1 ? (nSt === 2 ? 'Both' : 'All seven') : ['None', 'One', 'Two', 'Three', 'Four', 'Five'][nPuk];
      }
      return [
        ['Setting', ['Long row', 'Seven alike', 'Quarry slope', 'Fallen row', 'Lone giant', 'A pair', 'Row and one in the grass'][SET]],
        ['Statues', ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen'][nSt]],
        ['Standpoint', stand2 >= 0 ? ['Far across the plaza', 'On the shore behind them', 'Low in the grass', 'Up the slope'][stand2] : SET === 2 ? ['Among the heads', 'Beside a great head'][stand] : ['On the plaza', 'Below one statue', 'Down the line'][stand]],
        ['Hour', night === 1 ? (morning ? 'Dawn glow' : 'Afterglow') : morning ? { 'Last glow': 'First light', 'Nautical dusk': 'Nautical dawn', 'Nightfall': 'Before dawn', 'Deep night': 'Deep night' }[tHour[0]] : tHour[0]],
        ['Moon', ['None', 'None', 'Rising behind them', 'High behind you'][night]],
        ['Season', ['June', 'September', 'December', 'March'][season]],
        ['Sky', cloud > 0 ? 'Broken cloud' : glowK > .5 ? 'Green airglow' : 'Clear'],
        ['Topknots', tPuk],
        ['Stone', tStone],
      ];
    };
  })(),
});
// ==== end roll ====

// ==== roll 585 ====
ProtoRolls.add(585, {
  traits: {"Air":{"look":true,"values":{"Gold":494917,"Dust haze":296858,"Clear":148825,"Khamsin":59400}},"Breeze":{"look":true,"values":{"Steady north wind":396225,"Light air":395411,"Fresh":148657,"Dead calm":59707}},"Fleet":{"look":true,"values":{"Four":349901,"Five":300347,"Three":249717,"Regatta":100035}},"Sails":{"values":{"White cotton":500551,"Weathered":349986,"One ochre sail":149463}},"Sun":{"look":true,"values":{"Raking":250116,"Raking, into the sun":174958,"Through the sails":150335,"Through the sails, into the sun":104584,"Downriver":99897,"Raking, set, into the afterglow":75145,"Downriver, into the sun":70103,"Through the sails, set, into the afterglow":45168,"Downriver, set, into the afterglow":29694}},"Hour":{"look":true,"values":{"Last light":389466,"Late afternoon":233243,"Sun on the horizon":155383,"After sunset":137365,"Blue hour":84543}},"Standpoint":{"values":{"On the boulder":550916,"Out on a mid-river rock":150014,"Between two boulders":149749,"At the water's edge":149321}},"Nearest boat":{"look":true,"values":{"Middle distance":340089,"Crossing ahead":160478,"Two crossing":140243,"Going away":99893,"Coming at you":99459,"Going about":89915,"None near":69923}},"Reach":{"values":{"Below the dunes":720192,"Among the cataract rocks":279808}}},
  roll(hash) {
    const HOME = '0x5634aabaae0283cd8d1bccddf0c7aa567f0ebe9850f49d89e3abed04a4b72934';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
    const home = hash === HOME;
    let s0 = 0x585f311c;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 6; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    // a second stream from the hash for the view, added after the first pass so the first stream's rolls stay as they were
    let s1 = 0x7a1c55e3;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x2c1b3c6d) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R2();
    // note round 2 (2026-11-11): a fourth stream, drawn up front, for where you stand, what the nearest felucca is doing,
    // the hour's ends, the reach and the boats' own build; the first three streams keep every draw they had
    let s4 = 0x51d3a7c9;
    for (let i = 2; i < 66; i += 8) s4 = Math.imul(s4 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s4 >>> 12);
    const R4 = () => { s4 = s4 + 0x6D2B79F5 | 0; let t = Math.imul(s4 ^ s4 >>> 15, 1 | s4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 5; i++) R4();
    const Q = Array.from({ length: 24 }, R4);
    const pick2 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    // ---------- traits ----------
    const AIR = pick({ 'Gold': 5, 'Dust haze': 3, 'Clear': 1.5, 'Khamsin': 0.6 });
    const BREEZE = pick({ 'Light air': 4, 'Steady north wind': 4, 'Fresh': 1.5, 'Dead calm': 0.6 });
    const FLEET = pick({ 'Three': 2.5, 'Four': 3.5, 'Five': 3, 'Regatta': 1 });
    const SAIL = pick({ 'White cotton': 5, 'Weathered': 3.5, 'One ochre sail': 1.5 });
    const SUNP = pick({ 'Raking': 5, 'Through the sails': 3, 'Downriver': 2 });
    const RIDGE = pick({ 'One tomb': 4.5, 'Two tombs': 4, 'Ruined monastery': 1.5 });
    const BIRDS = pick({ 'Egrets': 5, 'Egret skein': 3.5, 'Kites': 1.5 });
    pick({ 'a': 6, 'b': 3, 'c': 1 });   // was the fisherman's roll (the fisherman is gone); kept so later rolls stay
    const MOONT = pick({ 'None': 8.5, 'Young crescent': 1.5 });
    const T_ = home ? { air: 'Gold', br: 'Light air', fl: 'Five', sl: 'Weathered', sp: 'Raking', rg: 'Two tombs', bd: 'Egrets', mo: 'None' }
      : { air: AIR, br: BREEZE, fl: FLEET, sl: SAIL, sp: SUNP, rg: RIDGE, bd: BIRDS, mo: MOONT };
    // on non-home mints (shown on the Sun value): looking across the river (the composed opening), turned into the sun along
    // its path with the hero moved into it, or (rare) the same turn just after sunset, into the afterglow, the lanterns lit
    const STAND = home ? 'On the boulder' : (v => v < 0.55 ? 'On the boulder' : v < 0.7 ? 'At the water\'s edge' : v < 0.85 ? 'Between two boulders' : 'Out on a mid-river rock')(Q[0]);
    const REACH = home ? 'Below the dunes' : Q[3] < 0.28 ? 'Among the cataract rocks' : 'Below the dunes';
    const VIEW = home ? 'Across' : (v => v < 0.5 ? 'Across' : v < 0.85 ? 'Sun' : 'Glow')(R2());
    if (T_.sp !== 'Raking' && T_.sp !== 'Downriver') R2(); R2(); R2(); R2(); R2();
    const HOUR = VIEW === 'Glow' ? 'After sunset' : home ? 'Last light' : pick2({ 'Last light': 5, 'Late afternoon': 3, 'Sun on the horizon': 2 });
    const SIT = home ? 'Middle distance' : (v => v < 0.07 ? 'None near' : v < 0.41 ? 'Middle distance' : v < 0.55 ? 'Two crossing' : v < 0.65 ? 'Coming at you' : v < 0.75 ? 'Going away' : v < 0.84 ? 'Going about' : 'Crossing ahead')(Q[1]);
    const HOUR2 = !home && Q[2] < 0.085 ? 'Blue hour' : HOUR;
    // a young crescent stands some 55 degrees from the sun toward the south, so it is in the picture looking across too
    T('Air', T_.air); T('Breeze', T_.br); T('Fleet', T_.fl); T('Sails', T_.sl);
    T('Sun', T_.sp + (VIEW === 'Sun' ? ', into the sun' : VIEW === 'Glow' ? ', set, into the afterglow' : ''));
    T('Hour', HOUR2); T('Standpoint', STAND); T('Nearest boat', SIT); T('Reach', REACH);   // West ridge, Birds, Moon: rolls kept, too small to name

    return out;
  },
});
// ==== end roll ====

// ==== roll 587 ====
ProtoRolls.add(587, {
  traits: {"Wind":{"look":true,"values":{"Trades along the coast":450677,"Sea breeze inland":249921,"Gusty trades":180031,"Dead calm":119371}},"Lava":{"look":true,"values":{"Three rivulets":450043,"Two channels":330126,"One broad sheet":219831}},"Sea":{"values":{"Long swell":500375,"Heavy surf":350131,"Glassy calm":149494}},"Upslope":{"values":{"Breakouts on the slope":500116,"Vent glow on low cloud":319569,"Clear to the summit":180315}},"Shore":{"values":{"Black sand cove":599897,"Bare rock ledge":400103}},"Hour":{"look":true,"values":{"Moonlit night":440851,"Dusk":169418,"First light":149585,"Low cloud lit red":139554,"Vog":100592}},"Standpoint":{"look":true,"values":{"On the old sea cliff":289488,"Out in the bay":231438,"High on the slope":188817,"Up on a tumulus":145079,"Close to the falls":86967,"Far down the coast":58211}},"Moon":{"look":true,"values":{"Gibbous moon":272489,"Pale moon rising":207359,"Full moon":170070,"Crescent moon low":149676,"Moonless, Milky Way":88762,"Young moon in the glow":70370,"No moon":41274}}},
  roll(hash) {
    const HOME = '0xe3243d8c1938da44585a5cb4db8fb99efd190eb980481fa90c49d0bb41e8dc7a';
    const home = hash === HOME;
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pk = (r, o) => { let tot = 0; for (const k in o) tot += o[k]; let x = r() * tot; for (const k in o) { x -= o[k]; if (x <= 0) return k; } return Object.keys(o)[0]; };
    let hs = 0;
    for (let i = 2; i < 66; i += 8) hs = (hs ^ parseInt(hash.slice(i, i + 8), 16)) >>> 0;
    const R = mk((hs ^ 0x587587) >>> 0), pick = o => pk(R, o);
    let moonT = pick({ 'Gibbous moon': 40, 'Full moon': 25, 'Crescent moon low': 22, 'Moonless, Milky Way': 13 });
    let windT = pick({ 'Trades along the coast': 45, 'Sea breeze inland': 25, 'Gusty trades': 18, 'Dead calm': 12 });
    let entryT = pick({ 'Three rivulets': 45, 'Two channels': 33, 'One broad sheet': 22 });
    let surfT = pick({ 'Long swell': 50, 'Heavy surf': 35, 'Glassy calm': 15 });
    let upT = pick({ 'Breakouts on the slope': 50, 'Vent glow on low cloud': 32, 'Clear to the summit': 18 });
    let shoreT = pick({ 'Black sand cove': 60, 'Bare rock ledge': 40 });
    if (home) { moonT = 'Gibbous moon'; windT = 'Trades along the coast'; entryT = 'Three rivulets'; surfT = 'Long swell'; upT = 'Breakouts on the slope'; shoreT = 'Black sand cove'; }
    let h2 = 0x2f6b587;
    for (let i = 2; i < 66; i += 4) h2 = Math.imul(h2 ^ parseInt(hash.slice(i, i + 4), 16), 0x85ebca6b) >>> 0;
    const R2 = mk(h2);
    let standT = pk(R2, { 'On the old sea cliff': 50, 'Up on a tumulus': 25, 'Close to the falls': 15, 'Far down the coast': 10 });
    if (home) standT = 'On the old sea cliff';
    let h3 = 0x6c1d587;
    for (let i = 2; i < 66; i += 4) h3 = Math.imul(h3 ^ parseInt(hash.slice(i, i + 4), 16), 0xc2b2ae35) >>> 0;
    const R3 = mk(h3);
    let hourT = pk(R3, { 'Moonlit night': 44, 'Dusk': 17, 'First light': 15, 'Low cloud lit red': 14, 'Vog': 10 });
    const newStand = R3() < .42 ? pk(R3, { 'Out in the bay': 55, 'High on the slope': 45 }) : null;
    if (home) hourT = 'Moonlit night';
    else if (newStand) standT = newStand;
    const twi = hourT === 'Dusk' || hourT === 'First light';
    if (twi && moonT !== 'Moonless, Milky Way') moonT = moonT === 'Crescent moon low' ? 'Young moon in the glow' : 'Pale moon rising';
    if (twi && moonT === 'Moonless, Milky Way') moonT = 'No moon';
    return [['Wind', windT], ['Lava', entryT], ['Sea', surfT], ['Upslope', upT], ['Shore', shoreT], ['Hour', hourT], ['Standpoint', standT], ['Moon', moonT]];
  },
});
// ==== end roll ====

// ==== roll 588 ====
ProtoRolls.add(588, {
  traits: {"Hour":{"look":true,"values":{"Solar midnight":299892,"Before midnight":279799,"Small hours":200026,"Late sun":120395,"First sun":99888}},"Fire":{"values":{"Log kokko":554910,"Low bonfire":333992,"Tar-barrel tower":111098}},"Sky":{"look":true,"values":{"Clear":333778,"Cirrus veils":333417,"Grey overcast":133026,"Noctilucent clouds":111473,"After rain":88306}},"Far shore":{"look":true,"values":{"Spruce":444800,"Mixed birch":333179,"Pine ridge":222021}},"Neighbours":{"look":true,"values":{"Two fires across the lake":399801,"Lone fire":300176,"A cottage light":199762,"Fires all round the lake":100261}},"Water":{"values":{"Mirror calm":555908,"Light airs":332821,"Evening breeze":111271}},"Mist":{"look":true,"values":{"Lake mist":444875,"None":443811,"Thick mist":111314}},"Standpoint":{"look":true,"values":{"On the shore rocks":250378,"Along the shore":248071,"Up the slope":202183,"Down at the waterline":149465,"Up on the whaleback":99465,"Out on the lake":50438}},"Fire stage":{"values":{"Full blaze":550728,"Burning down":249724,"Just lit":119811,"Embers":79737}},"Lake":{"look":true,"values":{"Bay":499523,"Narrow sound":200179,"Open selka":170811,"Skerries":129487}}},
  roll(hash) {
    const HOME = '0x4893b13d28b71f1e4ac145fc4cbefa57f3b3cc8ab79c4a310cf5bc6f80ed9f8d';   // hashFor(num - 1, seed): the runtime's home print
    const home = hash === HOME, out = [];
    const hx = hash.slice(2).padEnd(64, '0');
    const mkR = salt => {
      let a = parseInt(hx.slice(0, 8), 16) ^ salt, b = parseInt(hx.slice(8, 16), 16), cc = parseInt(hx.slice(16, 24), 16) ^ (salt * 7), d = parseInt(hx.slice(24, 32), 16);
      const r = () => { a |= 0; b |= 0; cc |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = cc + (cc << 3) | 0; cc = cc << 21 | cc >>> 11; cc = cc + t | 0; return (t >>> 0) / 4294967296; };
      for (let i = 0; i < 12; i++) r();
      return r;
    };
    const R = mkR(0x588), R2 = mkR(0x2c3d), R3 = mkR(0x7e15);
    const trait = (name, tab, hi, re) => { let tot = 0; for (const r of tab) tot += r[1]; let x = R() * tot, v = tab[tab.length - 1]; for (const r of tab) { x -= r[1]; if (x < 0) { v = r; break; } } if (home) v = tab[hi]; else if (re) v = re(v) || v; out.push([name, v[0]]); return v[2]; };
    const pick = (x, tab) => { let tot = 0; for (const r of tab) tot += r[1]; x *= tot; for (const r of tab) { x -= r[1]; if (x < 0) return r; } return tab[tab.length - 1]; };
    trait('Hour', [['Before midnight', 4, -.85], ['Solar midnight', 3, 0], ['Small hours', 2, 1.3], ['First sun', 1, 2.85]], 0,
      v => { const x = R2(), y = R2(); return v[0] === 'Before midnight' && x < .3 ? ['Late sun', 0, -2.75 - .45 * y] : null; });
    trait('Fire', [['Log kokko', 5, 0], ['Low bonfire', 3, 1], ['Tar-barrel tower', 1, 2]], 0);
    trait('Sky', [['Clear', 5, 0], ['Cirrus veils', 3, 1], ['Noctilucent clouds', 1, 2]], 0,
      v => { const x = R2(); return v[2] === 0 ? (x < .24 ? ['Grey overcast', 0, 3] : x < .4 ? ['After rain', 0, 4] : null) : null; });
    trait('Far shore', [['Spruce', 4, 0], ['Mixed birch', 3, 1], ['Pine ridge', 2, 2]], 0);
    trait('Neighbours', [['Two fires across the lake', 4, 2], ['Lone fire', 3, 0], ['A cottage light', 2, -1], ['Fires all round the lake', 1, 6]], 0);
    trait('Water', [['Mirror calm', 5, .0], ['Light airs', 3, .3], ['Evening breeze', 1, .65]], 0);
    trait('Mist', [['None', 4, 0], ['Lake mist', 4, 1], ['Thick mist', 1, 2.4]], 1);
    const Rv = mkR(0x57a9);
    const STP = [['On the shore rocks', 5], ['Down at the waterline', 3], ['Up on the whaleback', 2], ['Out on the lake', 1], ['Along the shore', 0], ['Up the slope', 0]];
    let stI = 0; { let x = Rv() * 11; while (stI < 3 && x >= STP[stI][1]) { x -= STP[stI][1]; stI++; } }
    const nsx = R2(), nsy = R2();   // then jx, jz, fv, pv, pw: unused here
    if (home) stI = 0;
    else if (nsx < .45) stI = nsy < .55 ? 4 : 5;
    out.push(['Standpoint', STP[stI][0]]);
    const ST = ['Full blaze', 'Burning down', 'Just lit', 'Embers'], PL = ['Bay', 'Narrow sound', 'Open selka', 'Skerries'];
    const stage = home ? 0 : ST.indexOf(pick(R3(), [['Full blaze', .55], ['Burning down', .25], ['Just lit', .12], ['Embers', .08]])[0]);
    out.push(['Fire stage', ST[stage]]);
    const plan = home ? 0 : PL.indexOf(pick(R3(), [['Bay', .5], ['Narrow sound', .2], ['Open selka', .17], ['Skerries', .13]])[0]);
    out.push(['Lake', PL[plan]]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 595 ====
ProtoRolls.add(595, {
  traits: {"Larch":{"values":{"Full gold":580275,"Just turning":259901,"Past peak, bronze":159824}},"Spruce":{"values":{"Mixed":560012,"Mostly larch":259610,"Dark spruce belts":180378}},"Stones":{"values":{"Grey gneiss":560102,"Pale granite":279859,"Rusty schist":160039}},"Light":{"look":true,"values":{"Last sun on the tops":233494,"Sun still on the upper forest":155863,"Morning side light":119752,"Grey first-snow day":100628,"Clear after snowfall":80210,"Flat noon blue":79876,"First sun, mist on the lake":77414,"Afterglow":52602,"Storm light":39986,"Last sun on the tops, the moon rising":31759,"Sun still on the upper forest, the moon rising":21292,"Afterglow, the moon rising":7124}},"Haze":{"values":{"Blue valley haze":563872,"Clear":228032,"Smoke from down the valley":117625,"Low cloud along the wall":90471}},"Water":{"values":{"Light airs":580178,"Breeze across the lake":299732,"Needles thick on the surface":120090}},"Snow":{"values":{"First dusting":552209,"None yet":195788,"Heavy on the tops":171421,"Snow into the forest":80582}},"Standpoint":{"values":{"On the stones":559508,"Along the shore":260471,"From the bank":180021}},"Far shore":{"look":true,"values":{"Long forest wall":480517,"Wall on the right":219245,"Side valley opening":210068,"Ranks of spurs":90170}}},
  roll(hash) {
    const HOME = '0x7d783655a58d6a188fda27ecf57e29ec9af6213bcf079fabc9ffcaf0c059ca9a';
    const home = hash === HOME, out = [], T = (k, v) => { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; };
    // the art's light table, only the flags the traits read
    const LT = {
      'Last sun on the tops': { moon: 1 }, 'Sun still on the upper forest': { moon: 1 }, 'Morning side light': { rib: 2 },
      'First sun, mist on the lake': { rib: 1 }, 'Grey first-snow day': { snow: 1, grey: 1, rib: 2 }, 'Clear after snowfall': { snow: 1 },
      'Flat noon blue': { rib: 2 }, 'Afterglow': { moon: 1 }, 'Storm light': {},
    };
    const LIGHTS = { keep: 44, 'Morning side light': 12, 'First sun, mist on the lake': 8, 'Grey first-snow day': 10, 'Clear after snowfall': 8, 'Flat noon blue': 8, 'Afterglow': 6, 'Storm light': 4 };
    const STANDS = { 'On the stones': 56, 'Along the shore': 26, 'From the bank': 18 };
    let s0 = 0x595a13c7;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 6; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const lx = T('Larch', home ? 'Full gold' : pick({ 'Full gold': 58, 'Just turning': 26, 'Past peak, bronze': 16 }));
    const sn0 = home ? 'First dusting' : pick({ 'First dusting': 60, 'None yet': 26, 'Heavy on the tops': 14 });
    const lt0 = home ? 'Last sun on the tops' : pick({ 'Last sun on the tops': 60, 'Sun still on the upper forest': 40 });
    const hz0 = home ? 'Blue valley haze' : pick({ 'Blue valley haze': 62, Clear: 24, 'Smoke from down the valley': 14 });
    const sp = T('Spruce', home ? 'Mixed' : pick({ Mixed: 56, 'Mostly larch': 26, 'Dark spruce belts': 18 }));
    T('Stones', home ? 'Grey gneiss' : pick({ 'Grey gneiss': 56, 'Pale granite': 28, 'Rusty schist': 16 }));
    const wa0 = home ? 'Light airs' : pick({ 'Light airs': 58, 'Breeze across the lake': 30, 'Needles thick on the surface': 12 });
    const mo = home ? 'Empty' : pick({ Empty: 88, 'Moon rising': 12 });
    let s3 = 0x595c2e11; for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s3 >>> 15);
    const R3 = () => { s3 = s3 + 0x6D2B79F5 | 0; let t = Math.imul(s3 ^ s3 >>> 15, 1 | s3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 3; i++) R3();
    const pick3 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R3() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const n3 = { lt: pick3(LIGHTS), sp: pick3(STANDS), air: R3(), sn: R3() };
    const h3 = home;
    let ltN = h3 ? 'keep' : n3.lt, stN = h3 ? 'On the stones' : n3.sp;
    if (ltN === 'First sun, mist on the lake' && lx === 'Past peak, bronze' && sp === 'Dark spruce belts') ltN = 'keep';
    const L = LT[ltN === 'keep' ? lt0 : ltN];
    const moonOn = mo === 'Moon rising' && L.moon;
    T('Light', (ltN === 'keep' ? lt0 : ltN) + (moonOn ? ', the moon rising' : ''));
    const lowCloud = L.rib === 2 && n3.air < .3;
    T('Haze', lowCloud ? 'Low cloud along the wall' : L.grey && hz0 === 'Smoke from down the valley' ? 'Clear' : hz0);
    T('Water', wa0);
    let zf = 0x7c15e3a1; for (let i = 2; i < 66; i += 8) zf = Math.imul(zf ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (zf >>> 11);
    const Rf = () => { zf = zf + 0x6D2B79F5 | 0; let t = Math.imul(zf ^ zf >>> 15, 1 | zf); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) Rf();
    const pickF = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = Rf() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    T('Snow', n3.sn < .08 && !h3 ? 'Snow into the forest' : L.snow && sn0 === 'None yet' ? 'Heavy on the tops' : sn0);
    T('Standpoint', stN);
    T('Far shore', home ? 'Long forest wall' : pickF({ 'Long forest wall': 48, 'Wall on the right': 22, 'Side valley opening': 21, 'Ranks of spurs': 9 }));
    return out;
  },
});
// ==== end roll ====

// ==== roll 596 ====
ProtoRolls.add(596, {
  traits: {"Light":{"look":true,"values":{"Apricot dawn":301172,"Rose dawn":188910,"Clear mid-morning":109526,"Blue hour before the sun":100165,"Pale gold":98196,"Snow shower":89749,"Copper dawn":77139,"Sun pillar":35143}},"Pack":{"look":true,"values":{"Banded":382469,"Tight to the horizon":255073,"Wide leads":212173,"Grey ice in the leads":90180,"Gone out overnight":60105}},"Floes":{"look":true,"values":{"Mixed pans":427636,"Pancakes":260768,"Great plates":167010,"One great pan":74353,"Rafted and ridged":70233}},"Swell":{"values":{"Long and slow":579964,"High and long":300721,"Almost still":119315}},"Snow":{"look":true,"values":{"Dusted":499102,"Fresh fall":300490,"Scoured and glazed":200408}},"Far shore":{"values":{"Kunashiri line":680423,"Lost in haze":259594,"Clear snow peaks":59983}},"Cloud":{"values":{"Band below the sun":549955,"Clear horizon":249069,"High mackerel":200976}},"Vapour":{"values":{"Thin":700401,"Smoking leads":299599}},"Standpoint":{"look":true,"values":{"On the shore rocks":260599,"Down on the ice foot":220094,"Along the coast":190199,"High on the headland":169404,"Back to the sun":159704}}},
  roll(hash) {
    const HOME = '0xa7988384ea0da705898b7afe02214a03e6c3be11bf6f6f37db3d6d6798732c15';   // hashFor(595, 0): the runtime's own home (index = num - 1)
    const home = hash === HOME;
    let s0 = 0x596a11ce;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let s2 = s0 ^ 0x7811a6f4;
    const R2 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick2 = o => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const pick = o => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const light0 = home ? 'Apricot dawn' : pick({ 'Apricot dawn': 42, 'Rose dawn': 27, 'Pale gold': 14, 'Sun pillar': 6, 'Copper dawn': 11 });
    const pack0 = home ? 'Banded' : pick({ Banded: 45, 'Tight to the horizon': 30, 'Wide leads': 25 });
    const floe0 = home ? 'Mixed pans' : pick({ 'Mixed pans': 46, Pancakes: 28, 'Great plates': 18, 'One great pan': 8 });
    const wx = home ? 'dawn' : pick2({ dawn: 70, blue: 10, snow: 9, morning: 11 });
    const st2 = home ? 'shore' : pick2({ shore: 26, foot: 22, head: 17, along: 19, back: 16 });
    const ice2 = home ? '' : pick2({ '': 78, gone: 6, nilas: 9, raft: 7 });
    const out = [];
    out.push(['Light', wx === 'blue' ? 'Blue hour before the sun' : wx === 'snow' ? 'Snow shower' : wx === 'morning' ? 'Clear mid-morning' : st2 === 'back' && light0 === 'Sun pillar' ? 'Apricot dawn' : light0]);
    out.push(['Pack', ice2 === 'gone' ? 'Gone out overnight' : ice2 === 'nilas' ? 'Grey ice in the leads' : pack0]);
    out.push(['Floes', ice2 === 'raft' ? 'Rafted and ridged' : floe0]);
    out.push(['Swell', home ? 'Long and slow' : pick({ 'Long and slow': 58, 'High and long': 30, 'Almost still': 12 })]);
    out.push(['Snow', home ? 'Dusted' : pick({ Dusted: 50, 'Fresh fall': 30, 'Scoured and glazed': 20 })]);
    out.push(['Far shore', home ? 'Kunashiri line' : pick({ 'Kunashiri line': 68, 'Lost in haze': 26, 'Clear snow peaks': 6 })]);
    out.push(['Cloud', home ? 'Band below the sun' : pick({ 'Band below the sun': 55, 'Clear horizon': 25, 'High mackerel': 20 })]);
    out.push(['Vapour', home ? 'Thin' : pick({ Thin: 70, 'Smoking leads': 30 })]);
    out.push(['Standpoint', { shore: 'On the shore rocks', foot: 'Down on the ice foot', head: 'High on the headland', along: 'Along the coast', back: 'Back to the sun' }[st2]]);
    return out;
  },
});
// ==== end roll ====

// ==== roll 601 ====
ProtoRolls.add(601, {
  traits: {"Hour":{"look":true,"values":{"Late Gold":319990,"Long Afternoon":192669,"Last Sun":191786,"White Noon":85077,"Last Minutes":64150,"Blue Hour":62427,"Coast Fog":56923,"Moonlight":26978}},"First Room":{"look":true,"values":{"Teal First":363658,"Rose First":272933,"Ochre First":272524,"Limewash":90885}},"Drift":{"look":true,"values":{"Knee Deep":416266,"Waist Deep":250455,"Ankle Deep":250215,"Door Buried":83064}},"Ceiling":{"values":{"Slits of Sky":554903,"Fallen Boards":333785,"Open Roof":111312}},"Walls":{"look":true,"values":{"Flaking":454199,"Scoured":273740,"Stained":272061}},"House":{"look":true,"values":{"Four Rooms":416604,"Three Rooms":332785,"A Long Passage":120902,"A Fallen Wall":69688,"The Town Hall":60021}},"Air":{"look":true,"values":{"Still Air":495823,"Dusty":298183,"Hanging Sand":98879,"Sea Fog":56923,"Sandstorm":50192}},"Standpoint":{"look":true,"values":{"Down the Rooms":202713,"Low on the Sand":176876,"Facing the Window":142387,"From the Next Room":142105,"In the Corner":119937,"Down the Passage":97736,"Through the Gap":69688,"Across the Hall":48558}},"Sun":{"look":true,"values":{"Over the Shoulder":377291,"From the Right":321293,"Into the Light":244493,"Behind Fog":56923}}},
  roll(hash) {
    const HOME = '0x991ce27435c9790f2a2d0e2c5b1996e7f9616d53d3445620a66bba959448d0c4';
    const out = [];
    const c = { hash, home: hash === HOME, trait(n, v) { out.push([n, String(v)]); return v; } };
      let hs3 = (parseInt(c.hash.slice(2, 10), 16) ^ 0x3c7e601b) | 0;
      const R3 = () => { hs3 = hs3 + 0x6D2B79F5 | 0; let t = Math.imul(hs3 ^ hs3 >>> 15, 1 | hs3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wtd3 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R3() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      const kindR = wtd3([['rooms', 59], ['corridor', 12], ['stair', 8], ['bay', 8], ['hall', 6], ['fallen', 7]]);
      const hourR = wtd3([['old', 81], ['noon', 9], ['blue', 7], ['moon', 3]]);
      const stormR = R3() < .05;
      const k1 = R3(), k2 = R3(), k3 = R3(), k4 = R3();
      // the stair hall and the bay are not built yet: those mints keep their line of rooms
      const kind = c.home || kindR === 'stair' || kindR === 'bay' ? 'rooms' : kindR;
      // ---------- the house for this mint ----------
      let hs = parseInt(c.hash.slice(2, 10), 16) | 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (a) => a[R() * a.length | 0];
      const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      const home = c.home;
      // a second stream for everything added in the 2026-11-11 pass, so the old rolls stay where they were
      let hs2 = (parseInt(c.hash.slice(2, 10), 16) ^ 0x5a2d060d) | 0;
      const R2 = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wtd2 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R2() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      const viewR = wtd2([['In the Corner', 16], ['Down the Rooms', 27], ['Low on the Sand', 19], ['Facing the Window', 19], ['From the Next Room', 19]]);
      const sunR = wtd2([['Over the Shoulder', 40], ['From the Right', 34], ['Into the Light', 26]]);
      const fogR = R2() < .06;
      const hourT = home ? 'Late Gold' : wtd([['Late Gold', 5], ['Last Sun', 3], ['Long Afternoon', 3], ['Copper Dusk', 1]]);
      const paintT = home ? 'Teal First' : wtd([['Teal First', 4], ['Ochre First', 3], ['Rose First', 3], ['Limewash', 1]]);
      const driftT = home ? 'Knee Deep' : wtd([['Ankle Deep', 3], ['Knee Deep', 5], ['Waist Deep', 3], ['Door Buried', 1]]);
      const ceilT = home ? 'Slits of Sky' : wtd([['Slits of Sky', 5], ['Fallen Boards', 3], ['Open Roof', 1]]);
      const decayT = home ? 'Flaking' : wtd([['Flaking', 5], ['Stained', 3], ['Scoured', 3]]);
      const roomsT = home ? 'Four Rooms' : wtd([['Three Rooms', 4], ['Four Rooms', 5]]);
      const hazeT = home ? 'Still Air' : wtd([['Still Air', 5], ['Dusty', 3], ['Hanging Sand', 1]]);
      const storm = !home && stormR, fog = !home && fogR && !storm;
      // a new hour never meets the coast fog; a storm only blows by day
      const hourN = home || fog || (storm && hourR !== 'noon') ? 'old' : hourR;
      const viewT = home ? 'In the Corner' : kind === 'fallen' ? 'Through the Gap' : kind === 'corridor' ? (viewR === 'Low on the Sand' ? viewR : 'Down the Passage') : kind === 'hall' ? (viewR === 'Low on the Sand' ? viewR : 'Across the Hall') : viewR, sunT = fog ? 'Behind Fog' : home ? 'Over the Shoulder' : sunR;
      c.trait('Hour', fog ? 'Coast Fog' : hourN === 'noon' ? 'White Noon' : hourN === 'blue' ? 'Blue Hour' : hourN === 'moon' ? 'Moonlight' : hourT === 'Copper Dusk' ? 'Last Minutes' : hourT); c.trait('First Room', paintT); c.trait('Drift', driftT); c.trait('Ceiling', ceilT); c.trait('Walls', decayT); c.trait('House', kind === 'corridor' ? 'A Long Passage' : kind === 'hall' ? 'The Town Hall' : kind === 'fallen' ? 'A Fallen Wall' : roomsT); c.trait('Air', storm ? 'Sandstorm' : fog ? 'Sea Fog' : hazeT);
      c.trait('Standpoint', viewT); c.trait('Sun', sunT);
    return out;
  },
});
// ==== end roll ====

// ==== roll 606 ====
ProtoRolls.add(606, {
  traits: {"Lamps":{"look":true,"values":{"Amber":384348,"Candle":231516,"Copper":229893,"Verdigris":77206,"Ember":77037}},"Water":{"look":true,"values":{"Ankle":460638,"Flooded":201989,"Shallow":183473,"Drained":91599,"Low water after rain":62301}},"Reach":{"values":{"Long":555262,"Near dark":222452,"Far":222286}},"Stone":{"look":true,"values":{"Proconnesian":499700,"Verd antique":200652,"Rose granite":199449,"Limewashed":100199}},"Bays":{"values":{"Standard":555125,"Wide":223558,"Close-set":221317}},"Lit":{"look":true,"values":{"A few out":357782,"Half dark":143523,"All burning":143075,"One group lit":129969,"Lamps under water":89996,"A shaft of day":79504,"Lamps being lit":56151}},"Air":{"values":{"Damp":555206,"Clear":223018,"Mist":221776}},"Standpoint":{"look":true,"values":{"At the water's edge":187928,"From the stair":187537,"Along the walk":187387,"At a column's foot":124728,"Crouched on the walk":93806,"Down the walk":93693,"Across on the diagonal":62627,"Across the hall":62294}},"Hall":{"values":{"One tier":800369,"Two tiers":199631}}},
  roll(hash) {
    const HOME = '0xeaca87d33d99f00e3ec848b129af1b1df4dc750c53acd0226dcc29fd98f706a6';   // hashFor(605, 0)
    const home = hash === HOME;
    const sfx = s => { let h = s; return () => { h = h + 0x6D2B79F5 | 0; let t = Math.imul(h ^ h >>> 15, 1 | h); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const wt = R => (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const w0 = parseInt(hash.slice(2, 10), 16);
    const wtd = wt(sfx(w0 | 0));
    const lampT = home ? 'Amber' : wtd([['Amber', 5], ['Copper', 3], ['Candle', 3], ['Verdigris', 1], ['Ember', 1]]);
    const waterT = home ? 'Ankle' : wtd([['Ankle', 5], ['Shallow', 2], ['Flooded', 2]]);
    const reachT = home ? 'Long' : wtd([['Long', 5], ['Near dark', 2], ['Far', 2]]);
    const stoneT = home ? 'Proconnesian' : wtd([['Proconnesian', 5], ['Rose granite', 2], ['Verd antique', 2], ['Limewashed', 1]]);
    const bayT = home ? 'Standard' : wtd([['Standard', 5], ['Close-set', 2], ['Wide', 2]]);
    const litT = home ? 'A few out' : wtd([['A few out', 5], ['All burning', 2], ['Half dark', 2]]);
    const hazeT = home ? 'Damp' : wtd([['Damp', 5], ['Clear', 2], ['Mist', 2]]);
    const w2 = wt(sfx((w0 ^ 0xb18eddff) | 0));
    const viewT = home ? 'Along the walk' : w2([['Along the walk', 3], ['Down the walk', 3], ['Across the hall', 2], ["At the water's edge", 3], ['From the stair', 3], ["At a column's foot", 2]]);
    const hallT = home ? 'One tier' : w2([['One tier', 4], ['Two tiers', 1]]);
    const evT = home ? 0 : w2([[0, 70], [1, 13], [2, 9], [3, 8]]);
    const R4 = sfx((w0 ^ 0x3c6ef372) | 0);
    const s4 = R4(), alt4 = R4();
    let stateT = home ? 'Standing' : s4 < .1 ? 'Drained' : s4 < .18 ? 'Low water after rain' : s4 < .26 ? 'Lamps being lit' : 'Standing';
    if ((stateT === 'Drained' && evT === 2) || (stateT === 'Low water after rain' && waterT === 'Flooded') || (stateT === 'Lamps being lit' && evT !== 0)) stateT = 'Standing';
    const drained = stateT === 'Drained', rain = stateT === 'Low water after rain', lighting = stateT === 'Lamps being lit';
    const viewShown = !home && alt4 < .5 && viewT === 'Down the walk' ? 'Crouched on the walk' : !home && alt4 < .5 && viewT === 'Across the hall' ? 'Across on the diagonal' : viewT;
    const litShown = ['', 'One group lit', 'Lamps under water', 'A shaft of day'][evT] || (lighting ? 'Lamps being lit' : litT);
    return [['Lamps', lampT], ['Water', drained || rain ? stateT : waterT], ['Reach', reachT], ['Stone', stoneT], ['Bays', bayT], ['Lit', litShown], ['Air', hazeT],
      ['Standpoint', viewShown], ['Hall', hallT]];
  },
});
// ==== end roll ====

// ==== roll 607 ====
ProtoRolls.add(607, {
  traits: {"Hour":{"look":true,"values":{"Pink alpenglow":439191,"Last pink":260684,"Blue hour":199804,"Gold on the peaks":100321}},"Bubbles":{"look":true,"values":{"Stacked columns":459879,"Dense towers":259684,"Sparse strings":200102,"Great pancakes":80335}},"Snow":{"look":true,"values":{"Dusted":399668,"Bare and polished":279750,"Wind bands":240424,"Windows in snow":80158}},"Cracks":{"look":true,"values":{"Long sheets":479341,"Web":300462,"One great fracture":220197}},"Ice":{"values":{"Black":519637,"Deep teal":299734,"Bottle green":100280,"Milky":80349}},"Range":{"values":{"Front Ranges":500383,"One great face":219778,"Far low hills":180486,"Ragged teeth":99353}},"Spindrift":{"values":{"Thin":550002,"Running":339322,"Ground blizzard":110676}}},
  roll(hash) {
    const HOME = '0x310439d4863fe2905cbcab16c21cebe25c3d09a0d4a5c4d786f4440d30b25201';   // hashFor(606, 0): the site's home print
    const home = hash === HOME;
    let s0 = 0x607bb1ce;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = o => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    return [
      ['Hour', home ? 'Pink alpenglow' : pick({ 'Pink alpenglow': 44, 'Last pink': 26, 'Blue hour': 20, 'Gold on the peaks': 10 })],
      ['Bubbles', home ? 'Stacked columns' : pick({ 'Stacked columns': 46, 'Sparse strings': 20, 'Dense towers': 26, 'Great pancakes': 8 })],
      ['Snow', home ? 'Dusted' : pick({ Dusted: 40, 'Bare and polished': 28, 'Wind bands': 24, 'Windows in snow': 8 })],
      ['Cracks', home ? 'Long sheets' : pick({ 'Long sheets': 48, Web: 30, 'One great fracture': 22 })],
      ['Ice', home ? 'Black' : pick({ Black: 52, 'Deep teal': 30, 'Bottle green': 10, Milky: 8 })],
      ['Range', home ? 'Front Ranges' : pick({ 'Front Ranges': 50, 'One great face': 22, 'Far low hills': 18, 'Ragged teeth': 10 })],
      ['Spindrift', home ? 'Thin' : pick({ Thin: 55, Running: 34, 'Ground blizzard': 11 })],
    ];
  },
});
// ==== end roll ====

// ==== roll 616 ====
ProtoRolls.add(616, {
  traits: {"Standpoint":{"look":true,"values":{"Stack aisle":300360,"Under the cranes":300123,"Yard canyon":200156,"Quay edge":119545,"From the stack top":79816}},"Fog":{"look":true,"values":{"Sea fog":416225,"Clearing":250656,"Thick":249641,"Blue dawn":83478}},"Lamps":{"look":true,"values":{"Sodium":357201,"White LED":214643,"Mixed floods":214630,"Old amber":142211,"Dying sodium":71315}},"Stacks":{"look":true,"values":{"Mixed":416774,"Towering":249707,"Low":166974,"Terraced":166545}},"Rain":{"look":true,"values":{"Just stopped":499700,"Drizzle":299090,"Steady rain":201210}},"Ship":{"values":{"Laden":555125,"Riding high":333394,"Empty berth":111481}},"Cranes":{"look":true,"values":{"Line":454556,"Close-set":272868,"Far apart":181494,"Booms raised":91082}},"Apron":{"values":{"Puddled":555206,"Awash":223018,"Damp":221776}},"Boxes":{"values":{"Faded mixed":555458,"Slate":222427,"Oxide":222115}}},
  roll(hash) {
    const HOME = '0x81652d88efd979aa94bea2e621d7a473898d2687617d8ae2a64aa6fcb660cc5e';   // hashFor(615, 0)
    const home = hash === HOME;
    let hs = parseInt(hash.slice(2, 10), 16) | 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const fogT = home ? 'Sea fog' : wtd([['Sea fog', 5], ['Thick', 3], ['Clearing', 3], ['Blue dawn', 1]]);
    const lampT = home ? 'Sodium' : wtd([['Sodium', 5], ['Mixed floods', 3], ['Old amber', 2], ['White LED', 3], ['Dying sodium', 1]]);
    const stackT = home ? 'Mixed' : wtd([['Mixed', 5], ['Towering', 3], ['Low', 2], ['Terraced', 2]]);
    const rainT = home ? 'Just stopped' : wtd([['Just stopped', 5], ['Drizzle', 3], ['Steady rain', 2]]);
    const shipT = home ? 'Laden' : wtd([['Laden', 5], ['Riding high', 3], ['Empty berth', 1]]);
    const craneT = home ? 'Line' : wtd([['Line', 5], ['Close-set', 3], ['Far apart', 2], ['Booms raised', 1]]);
    const apronT = home ? 'Puddled' : wtd([['Puddled', 5], ['Awash', 2], ['Damp', 2]]);
    const boxT = home ? 'Faded mixed' : wtd([['Faded mixed', 5], ['Oxide', 2], ['Slate', 2]]);
    let h2 = (parseInt((hash.slice(26, 34) || 'a5c3'), 16) ^ 0x51f7e2d) | 0;
    const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const stand0 = home ? 'Stack aisle' : (() => { const u = R2() * 10; return u < 5 ? 'Stack aisle' : u < 8 ? 'Under the cranes' : 'Yard canyon'; })();
    let h4 = (parseInt((hash.slice(34, 42) || '9e3b'), 16) ^ 0x7a3e91c) | 0;
    const R4 = () => { h4 = h4 + 0x6D2B79F5 | 0; let t = Math.imul(h4 ^ h4 >>> 15, 1 | h4); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    if (!home) R4();   // the cranes' paint
    R4();              // palPh
    const su = R4();
    const standT = stand0 === 'Stack aisle' && !home ? (su < .24 ? 'Quay edge' : su < .4 ? 'From the stack top' : stand0) : stand0;
    return [['Standpoint', standT], ['Fog', fogT], ['Lamps', lampT], ['Stacks', stackT], ['Rain', rainT], ['Ship', shipT], ['Cranes', craneT], ['Apron', apronT], ['Boxes', boxT]];
  },
});
// ==== end roll ====

// ==== roll 617 ====
ProtoRolls.add(617, {
  traits: {"Hour":{"look":true,"values":{"First pink":300791,"Rose and gold":199037,"Before the sun":130660,"Grey, snowing":86221,"Full morning sun":85744,"Cold white sun":85681,"Blue hour, moonset":66819,"Hard blue morning":45047}},"Fog":{"look":true,"values":{"Thin and freezing":250830,"Valleys full":197012,"Clearing":131812,"A sea below":124165,"Snow closing in":86221,"Burnt off":85744,"Closing in":79169,"Lifted":45047}},"Snow":{"look":true,"values":{"A night of it":440227,"Deep drifts":280543,"A dusting":279230}},"Wind":{"look":true,"values":{"Light, off the ridge":459837,"Scouring":299391,"Still":240772}},"Wall":{"look":true,"values":{"Worn":439645,"Falling down":300255,"Restored":260100}},"Line":{"look":true,"values":{"The long ridge":399237,"Switchbacks":320678,"Over a high saddle":280085}},"Standpoint":{"look":true,"values":{"Along the walkway":291417,"Back up the climb":268655,"Through a tower window":169655,"At the foot of a stair":140023,"On a tower roof":130250}},"Sky":{"values":{"Freezing fog":592004,"A sea of fog below":124165,"Snow falling":86221,"Full morning sun":85744,"Moon setting":66819,"Hoar frost":45047}}},
  roll(hash) {
    const HOME = '0xf3f4d59b7b41cbbf219d6b112263cf5bb5196baea8dc82c0e909f924cd982c04';
    const HASH = hash, home = hash === HOME, out = [];
    const c = { trait(k, v) { const i = out.findIndex(t => t[0] === k); if (i >= 0) out[i][1] = String(v); else out.push([k, String(v)]); return v; } };
    let s0 = 0x617a11;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(HASH.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 8; i++) R();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let s1 = 0x617b126; // salt chosen so the gallery's sheet shows both standpoints about evenly
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(HASH.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R2();
    const pick2 = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let standR = (home ? 'Along the walkway' : pick2({ 'Along the walkway': 52, 'Back up the climb': 48 }));
    let skyR = (home ? 'Freezing fog' : pick2({ 'Freezing fog': 62, 'A sea of fog below': 13, 'Snow falling': 9, 'Moon setting': 7, 'Full morning sun': 9 }));
    // second cycle: a third stream, so every roll above stays; three more standpoints take 44 in 100 of the mints (a
    // fourth, over the battlements, was built and taken out: at tile size the crenel's sill and a cap filled the frame), and
    // hoar frost under a hard blue sky after the fog has lifted is the one rare sky
    let s2 = 0x617c3e9;
    for (let i = 2; i < 66; i += 8) s2 = Math.imul(s2 ^ parseInt(HASH.slice(i, i + 8), 16), 0x165667b1) ^ (s2 >>> 14);
    const R3 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < 4; i++) R3();
    { const a = R3(), b = R3();
      if (!home) { standR = a < 0.17 ? 'Through a tower window' : a < 0.31 ? 'At the foot of a stair' : a < 0.44 ? 'On a tower roof' : standR;
        if (b < 0.045) skyR = 'Hoar frost'; } }
    const hourN = (home ? 'First pink' : pick({ 'First pink': 42, 'Before the sun': 22, 'Rose and gold': 24, 'Cold white sun': 12 }));
    const hourShown = { 'Snow falling': 'Grey, snowing', 'Moon setting': 'Blue hour, moonset', 'Full morning sun': 'Full morning sun', 'Hoar frost': 'Hard blue morning' }[skyR] || (skyR === 'A sea of fog below' && hourN === 'Before the sun' ? 'Rose and gold' : hourN);
    c.trait('Hour', hourShown);
    const fogN = (home ? 'Thin and freezing' : pick({ 'Thin and freezing': 38, 'Valleys full': 30, 'Clearing': 20, 'Closing in': 12 }));
    c.trait('Fog', { 'Snow falling': 'Snow closing in', 'Full morning sun': 'Burnt off', 'A sea of fog below': 'A sea below', 'Hoar frost': 'Lifted' }[skyR] || fogN);
    const snowN = c.trait('Snow', home ? 'A night of it' : pick({ 'A night of it': 44, 'A dusting': 28, 'Deep drifts': 28 }));
    const windN = c.trait('Wind', home ? 'Light, off the ridge' : pick({ 'Light, off the ridge': 46, 'Still': 24, 'Scouring': 30 }));
    const wallN = c.trait('Wall', home ? 'Worn' : pick({ Worn: 44, 'Restored': 26, 'Falling down': 30 }));
    const lineN = c.trait('Line', home ? 'The long ridge' : pick({ 'The long ridge': 40, 'Switchbacks': 32, 'Over a high saddle': 28 }));
    const standN = c.trait('Standpoint', standR), skyN = c.trait('Sky', skyR);
    return out;
  },
});
// ==== end roll ====

// ==== roll 618 ====
ProtoRolls.add(618, {
  traits: {"Rain":{"look":true,"values":{"Steady":416225,"Drizzle":250656,"Driving":249641,"Squall":83478}},"Flare":{"look":true,"values":{"Full burn":454791,"Low flame":272933,"Roaring":181391,"Twin tips":90885}},"Swell":{"look":true,"values":{"Long swell":499483,"Heavy swell":300564,"Oily calm":199953}},"Lamps":{"look":true,"values":{"Sodium":416783,"Mixed floods":248971,"Old amber":167399,"White floods":166847}},"Platform":{"look":true,"values":{"Jacket":399306,"Semi-sub":239249,"Jack-up":200521,"Tall jacket":160924}},"Side":{"values":{"Starboard":599960,"Port":400040}},"Cloud":{"values":{"Low ceiling":555206,"Very low":223018,"High":221776}},"Lying":{"look":true,"values":{"Alongside":414773,"Standing off":248248,"Far off":170763,"Close in":166216}},"Bearing":{"look":true,"values":{"Abeam":485126,"Off the corner":376552,"Under the boom":138322}},"Field":{"values":{"One platform":625359,"Bridge-linked":191421,"Flare tower":183220}},"Hour":{"values":{"Dead of night":779598,"Last light":220402}}},
  roll(hash) {
    const HOME = '0xab5fac7fbdc0d528ae818f451b1c7687d04501ae3f28436b844adb2728ee199c';
    const home = hash === HOME;
    const w0 = parseInt(hash.slice(2, 10), 16) | 0;
    let hs = w0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const rainT = home ? 'Steady' : wtd([['Steady', 5], ['Driving', 3], ['Drizzle', 3], ['Squall', 1]]);
    const flareT = home ? 'Full burn' : wtd([['Full burn', 5], ['Roaring', 2], ['Low flame', 3], ['Twin tips', 1]]);
    const swellT = home ? 'Long swell' : wtd([['Long swell', 5], ['Heavy swell', 3], ['Oily calm', 2]]);
    const lampT = home ? 'Mixed floods' : wtd([['Sodium', 5], ['Mixed floods', 3], ['White floods', 2], ['Old amber', 2]]);
    let platT = home ? 'Jacket' : wtd([['Jacket', 5], ['Semi-sub', 3], ['Tall jacket', 2]]);
    const sideT = home ? 'Starboard' : wtd([['Starboard', 3], ['Port', 2]]);
    const cloudT = home ? 'Low ceiling' : wtd([['Low ceiling', 5], ['Very low', 2], ['High', 2]]);
    let distT = home ? 'Alongside' : wtd([['Alongside', 5], ['Standing off', 3], ['Close in', 2]]);
    const mb = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const Z = mb(Math.imul(w0 ^ 0x6f1a2e, 0x5bd1e995) | 0);
    const z1 = Z(), z2 = Z();
    if (!home && z1 < .2) platT = 'Jack-up';
    if (!home && z2 < .17) distT = 'Far off';
    const X = mb(Math.imul(w0 ^ 0x4e13a3, 0x1b873593) | 0);
    const xB = X(), xF = X(), xH = X();
    let bearT = home || distT === 'Far off' || xB < .38 ? 'Abeam' : xB < .74 ? 'Off the corner' : 'Under the boom';
    const fieldT = home || distT === 'Close in' ? 'One platform' : xF < .55 ? 'One platform' : xF < .77 ? 'Flare tower' : 'Bridge-linked';
    if (bearT === 'Under the boom' && fieldT !== 'One platform') bearT = 'Off the corner';
    const hourT = home || xH < .78 ? 'Dead of night' : 'Last light';
    return [['Rain', rainT], ['Flare', flareT], ['Swell', swellT], ['Lamps', lampT], ['Platform', platT], ['Side', sideT], ['Cloud', cloudT], ['Lying', distT],
      ['Bearing', bearT], ['Field', fieldT], ['Hour', hourT]];
  },
});
// ==== end roll ====

// ==== roll 623 ====
ProtoRolls.add(623, {
  traits: {"Moon":{"look":true,"values":{"Low in the east":400409,"High overhead":300174,"Just above the rim":220010,"Very low, huge shadows":79407}},"Light":{"look":true,"values":{"Toward the moon":399297,"Moon abeam":379928,"Moon behind you":220775}},"Chalk":{"look":true,"values":{"Mushrooms and mounds":499122,"Whalebacks":220117,"Sugarloaf cones":180528,"Tall mushrooms":100233}},"Black stones":{"values":{"Strewn":500306,"Sparse":259544,"Thick black field":240150}},"Haze":{"look":true,"values":{"Thin":460305,"Clear":300208,"Dust lying low":239487}},"Rim":{"values":{"Low dark hills":500523,"High escarpment":339531,"Faint and far":159946}},"Forms":{"look":true,"values":{"Scattered":398671,"Dense field":342092,"Few, far apart":259237}},"Standpoint":{"look":true,"values":{"Among the forms":411973,"Looking down from a rise":170473,"Low on the pavement":170313,"Long lens down a corridor":163130,"In a shadow, facing the moon":84111}},"Sky":{"values":{"Clear":846523,"Thin cloud, a halo":72229,"After a sandstorm":64540,"Partial eclipse":16708}}},
  roll(hash) {
    const HOME = '0xbc51cb1608bf2acccefef0c0ae685c5d6debbd268a30f43efadf23a7bf7071ac';   // hashFor(622, 0)
    const home = hash === HOME;
    let s0 = 0x623d1e5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const r1 = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let s1 = 0x51a2d7c3;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x9e3779b1) ^ (s1 >>> 15);
    const r2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    let useR2 = false;
    const R = () => useR2 ? r2() : r1();
    const pick = (o) => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const moonN = home ? 'Low in the east' : pick({ 'Low in the east': 40, 'High overhead': 30, 'Just above the rim': 22, 'Very low, huge shadows': 8 });
    const lightN = home ? 'Toward the moon' : pick({ 'Toward the moon': 40, 'Moon abeam': 38, 'Moon behind you': 22 });
    const shapeN = home ? 'Mushrooms and mounds' : ((k) => k === 'Broken stumps' ? 'Mushrooms and mounds' : k)(pick({ 'Mushrooms and mounds': 36, 'Whalebacks': 22, 'Sugarloaf cones': 18, 'Broken stumps': 14, 'Tall mushrooms': 10 }));
    const coverN = home ? 'Strewn' : pick({ Strewn: 50, Sparse: 26, 'Thick black field': 24 });
    const hazeN = home ? 'Thin' : pick({ Thin: 46, Clear: 30, 'Dust lying low': 24 });
    const rimN = home ? 'Low dark hills' : pick({ 'Low dark hills': 50, 'High escarpment': 34, 'Faint and far': 16 });
    const forms0 = home ? 'Scattered' : pick({ Scattered: 40, 'Dense field': 34, 'Few, far apart': 26 });
    const pick2 = (o) => { useR2 = true; const k = pick(o); useR2 = false; return k; };
    const moonFace = lightN === 'Toward the moon' && moonN !== 'High overhead';
    const standN = home ? 'Among the forms' : pick2(moonFace
      ? { 'Among the forms': 34, 'In a shadow, facing the moon': 30, 'Low on the pavement': 12, 'Looking down from a rise': 12, 'Long lens down a corridor': 12 }
      : { 'Among the forms': 44, 'Low on the pavement': 19, 'Looking down from a rise': 19, 'Long lens down a corridor': 18 });
    const skyN = home ? 'Clear' : pick2(moonFace ? { Clear: 63, 'Thin cloud, a halo': 26, 'After a sandstorm': 5, 'Partial eclipse': 6 } : { Clear: 93, 'After a sandstorm': 7 });
    return [['Moon', moonN], ['Light', lightN], ['Chalk', shapeN], ['Black stones', coverN], ['Haze', hazeN], ['Rim', rimN], ['Forms', forms0], ['Standpoint', standN], ['Sky', skyN]];
  },
});
// ==== end roll ====

// ==== roll 624 ====
ProtoRolls.add(624, {
  traits: {"Hour":{"look":true,"values":{"Midnight sun":439496,"High pale sun":240632,"Amber low sun":239987,"Sun on the rim":79885}},"Wind":{"look":true,"values":{"Thin streamers":459827,"Running drift":280115,"Still":180251,"Ground blizzard":79807}},"Ice":{"look":true,"values":{"Cobalt":419991,"Grey-cyan":260190,"Ultramarine":219919,"Old turquoise":99900}},"Scallops":{"look":true,"values":{"Cupped":400413,"Deep scallops":258886,"Polished smooth":220494,"Fish scale":120207}},"Cracks":{"look":true,"values":{"Long veins":440836,"Web":259787,"Few":199494,"Great rift":99883}},"Snow":{"look":true,"values":{"Dusted":419257,"Wind crust":280433,"Bare":200008,"Crust fields":100302}},"Peaks":{"look":true,"values":{"Far range":400197,"Near range":219969,"Thin dark line":219782,"One lone nunatak":160052}},"View":{"look":true,"values":{"Into the sun":352610,"Across the light":138953,"Crouched":101741,"Sun at your back":92651,"At a nunatak's foot":72864,"From a rise":71221,"Long lens":66758,"Along a crack":56837,"Straight down":46365}},"Sky":{"look":true,"values":{"Crystal veil":409240,"Clear":278846,"High wisps":166939,"Sun dogs":74728,"Flat overcast":70247}}},
  roll(hash) {
    const HOME = '0xe540cfc675c92d9b120069aaaf98d58b9b8531f264f8408b148e4d36bc00ebc9';
    const home = hash === HOME;
    let s0 = 0x624b1ce5;
    for (let i = 2; i < 66; i += 8) s0 = Math.imul(s0 ^ parseInt(hash.slice(i, i + 8), 16), 0x85ebca6b) ^ (s0 >>> 13);
    const R = () => { s0 = s0 + 0x6D2B79F5 | 0; let t = Math.imul(s0 ^ s0 >>> 15, 1 | s0); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick = o => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const hourN = home ? 'Midnight sun' : pick({ 'Midnight sun': 44, 'High pale sun': 24, 'Amber low sun': 24, 'Sun on the rim': 8 });
    const windN = home ? 'Thin streamers' : pick({ 'Thin streamers': 46, Still: 18, 'Running drift': 28, 'Ground blizzard': 8 });
    const iceN = home ? 'Cobalt' : pick({ Cobalt: 42, 'Grey-cyan': 26, Ultramarine: 22, 'Old turquoise': 10 });
    const cupN = home ? 'Cupped' : pick({ Cupped: 40, 'Deep scallops': 26, 'Polished smooth': 22, 'Fish scale': 12 });
    const crackN = home ? 'Long veins' : pick({ 'Long veins': 44, Web: 26, Few: 20, 'Great rift': 10 });
    const snowN = home ? 'Dusted' : pick({ Dusted: 42, Bare: 20, 'Wind crust': 28, 'Crust fields': 10 });
    const skyR = home ? 'Crystal veil' : pick({ 'Crystal veil': 44, Clear: 30, 'High wisps': 18, 'Sun dogs': 8 });
    const peakN = home ? 'Far range' : pick({ 'Far range': 40, 'Near range': 22, 'Thin dark line': 22, 'One lone nunatak': 16 });
    let s1 = 0x7b1ce624;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0xc2b2ae35) ^ (s1 >>> 15);
    const R2 = () => { s1 = s1 + 0x6D2B79F5 | 0; let t = Math.imul(s1 ^ s1 >>> 15, 1 | s1); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pick2 = o => { let tot = 0; for (const k in o) tot += o[k]; let r = R2() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    let viewR = home ? 'Into the sun' : (pick2({ 'Into the sun': 44, 'Across the light': 14, 'Sun at your back': 10, Crouched: 11, 'Long lens': 9, 'From a rise': 7, 'Straight down': 5 }));
    const ovc = !home && R2() < .07;
    let s2 = 0x3c624e1d;
    for (let i = 2; i < 66; i += 8) s2 = Math.imul(s2 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s2 >>> 14);
    const R3 = () => { s2 = s2 + 0x6D2B79F5 | 0; let t = Math.imul(s2 ^ s2 >>> 15, 1 | s2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r30 = R3();
    if (!home && viewR === 'Into the sun' && skyR !== 'Sun dogs') viewR = r30 < .18 ? "At a nunatak's foot" : r30 < .32 ? 'Along a crack' : viewR;
    if (viewR === 'Long lens' && windN === 'Ground blizzard') viewR = 'From a rise';
    if (viewR === 'Long lens' && (ovc || (peakN === 'Thin dark line' && hourN === 'High pale sun'))) viewR = 'Across the light';
    const viewN = skyR === 'Sun dogs' && !ovc ? 'Into the sun' : viewR;
    const skyN = ovc ? 'Flat overcast' : skyR;
    return [['Hour', hourN], ['Wind', windN], ['Ice', iceN], ['Scallops', cupN], ['Cracks', crackN], ['Snow', snowN], ['Peaks', peakN], ['View', viewN], ['Sky', skyN]];
  },
});
// ==== end roll ====

// ==== roll 627 ====
ProtoRolls.add(627, {
  traits: {"Hour":{"look":true,"values":{"Grey Afternoon":324421,"Last of the Light":195277,"White Morning":194468,"Midday":130648,"Night":90012,"Blue Hour":65174}},"Water":{"look":true,"values":{"Half Full":416833,"Low Water":249681,"Drained":166880,"Brimming":166606}},"Tile":{"look":true,"values":{"Cream and Bottle":363755,"Ivory and Sea Blue":273391,"White and Oxblood":272299,"Buff and Black":90555}},"Roof":{"look":true,"values":{"Failing":416783,"Missing Bays":250807,"Sound":248971,"Bare Ribs":83439}},"Water Colour":{"look":true,"values":{"Pale Green":377961,"Milky Jade":227093,"Silt":166880,"Peat":152048,"Clear":76018}},"Standpoint":{"look":true,"values":{"From the Gallery":150005,"At the Waterline":138692,"Across the Hall":136926,"Along the Cubicles":110474,"The Shallow Corner":89229,"The Doors":82967,"Under the Ribs":77348,"Down the Middle":67118,"Straight Up":60186,"From a Cubicle":59047,"Down in the Tank":28008}},"Light":{"look":true,"values":{"Overcast":430167,"Low Sun":183535,"Clear and Cold":130648,"Thaw Fog":119770,"Moonlight":90012,"Snow on the Glass":45868}},"State":{"values":{"As Left":520260,"Buddleia in the Gutters":179578,"Cubicles Gone":159946,"A Fallen Bay":140216}}},
  roll(hash) {
    const HOME = '0xb34311e18cbec2c8ee8074d0699d0a119e7e8f69351ae1b81337f2775b7b392a';   // hashFor(626, 0), as runtime.js: c.home
    const home = hash === HOME, H = hash;   // (the art's DBG FORCE path is off: DBG = 0 ships)
      let hs = parseInt(H.slice(2, 10), 16) | 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      let hourT = home ? 'Grey Afternoon' : wtd([['Grey Afternoon', 5], ['White Morning', 3], ['Last of the Light', 3], ['Blue Hour', 1]]);
      let waterT = home ? 'Half Full' : wtd([['Half Full', 5], ['Low Water', 3], ['Brimming', 2], ['Drained', 2]]);
      let tileT = home ? 'Cream and Bottle' : wtd([['Cream and Bottle', 4], ['White and Oxblood', 3], ['Ivory and Sea Blue', 3], ['Buff and Black', 1]]);
      let roofT = home ? 'Failing' : wtd([['Failing', 5], ['Sound', 3], ['Missing Bays', 3], ['Bare Ribs', 1]]);
      let wcT = home ? 'Pale Green' : wtd([['Pale Green', 5], ['Milky Jade', 3], ['Peat', 2], ['Clear', 1]]);
      let h2s = (parseInt(H.slice(-8), 16) ^ 0x627b2a77) | 0;
      const R2 = () => { h2s = h2s + 0x6D2B79F5 | 0; let t = Math.imul(h2s ^ h2s >>> 15, 1 | h2s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const w2 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R2() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      let standT = w2([['The Shallow Corner', 26], ['Down the Middle', 17], ['From the Gallery', 15], ['At the Waterline', 12], ['Along the Cubicles', 14], ['Straight Up', 6], ['Down in the Tank', 10]]);
      let lightT = w2([['Overcast', 63], ['Low Sun', 20], ['Thaw Fog', 12], ['Snow on the Glass', 5]]);
      let stateT = w2([['As Left', 52], ['Cubicles Gone', 16], ['Buddleia in the Gutters', 18], ['A Fallen Bay', 14]]);
      const sv = [R2(), R2(), R2(), R2(), R2()];
      let h3s = (parseInt(H.slice(34, 42) || '7', 16) ^ 0x627c3b1a) | 0;
      const R3 = () => { h3s = h3s + 0x6D2B79F5 | 0; let t = Math.imul(h3s ^ h3s >>> 15, 1 | h3s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const s3 = [R3(), R3(), R3(), R3(), R3(), R3(), R3()];
      if (lightT === 'Overcast') { const u = s3[0] * 63; lightT = u < 13 ? 'Clear and Cold' : u < 22 ? 'Moonlight' : lightT; }
      const takeS = { 'The Shallow Corner': 10 / 26, 'Down the Middle': 5 / 17, 'Along the Cubicles': 3 / 14 }[standT];
      if (takeS && s3[1] < takeS) standT = s3[2] < 11 / 18 ? 'Across the Hall' : 'From a Cubicle';
      let h4s = (parseInt(H.slice(50, 58) || '9', 16) ^ 0x627d4c2d) | 0;
      const R4 = () => { h4s = h4s + 0x6D2B79F5 | 0; let t = Math.imul(h4s ^ h4s >>> 15, 1 | h4s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const s4 = [R4(), R4(), R4(), R4(), R4(), R4(), R4(), R4()];
      if ((standT === 'The Shallow Corner' || standT === 'Down the Middle' || standT === 'At the Waterline') && s4[0] < .44) standT = s4[1] < .56 ? 'The Doors' : 'Under the Ribs';
      if (home) { standT = 'The Shallow Corner'; lightT = 'Overcast'; stateT = 'As Left'; }
      if (waterT === 'Drained' && standT === 'At the Waterline') standT = 'Down in the Tank';
      if (waterT !== 'Drained' && standT === 'Down in the Tank') standT = 'At the Waterline';
      if (lightT === 'Low Sun' && hourT === 'Blue Hour') lightT = 'Overcast';
      if (lightT === 'Snow on the Glass' && roofT === 'Bare Ribs') lightT = 'Overcast';
      if ((standT === 'From a Cubicle' || standT === 'The Doors') && stateT === 'Cubicles Gone') standT = 'Across the Hall';
      const clear = lightT === 'Clear and Cold', moon = lightT === 'Moonlight';
      return [['Hour', clear ? 'Midday' : moon ? 'Night' : hourT], ['Water', waterT], ['Tile', tileT], ['Roof', roofT], ['Water Colour', waterT === 'Drained' ? 'Silt' : wcT],
        ['Standpoint', standT], ['Light', lightT], ['State', stateT]];
  },
});
// ==== end roll ====

// ==== roll 628 ====
ProtoRolls.add(628, {
  traits: {"Light":{"look":true,"values":{"High summer sun":361267,"Silver overcast":293085,"Low arctic sun":259955,"Midnight sun":85693}},"Clarity":{"values":{"Over a hundred metres":500355,"Blue veil":299442,"Absolute clear":200203}},"Moss":{"look":true,"values":{"Moss on the ledges":450454,"Rich carpets":250066,"Thin moss":219595,"Spring green":79885}},"Crack":{"look":true,"values":{"Cathedral":419804,"Wide hall":300336,"Dogleg":279860}},"Surface":{"look":true,"values":{"Glass calm":479656,"Light breeze":347207,"Pocked by rain":139690,"Thin ice":33447}},"View":{"look":true,"values":{"Along the crack":202321,"Over the drop":136727,"Up from the floor":129585,"By the wall":123956,"Lagoon shallows":113263,"The narrows":110022,"Half above, half below":97365,"Toward the light":86761}}},
  roll(hash) {
    // the home: hashFor(num - 1, 0), as drop/runtime.js sets def.index (stub-628.mjs does the same)
    const HOME = '0x6d7874296c39a8033fc26db95646ebb5b642fbe76b4497a6db183d48716e6338';
    const home = hash === HOME;
    const HALF_A = .26, HALF_L = .19;
    const mk = (seed, mul, sh) => { let st = seed; for (let i = 2; i < hash.length; i += 8) st = sh ? Math.imul(st ^ parseInt(hash.slice(i, i + 8), 16), mul) ^ (st >>> sh) : Math.imul(st ^ parseInt(hash.slice(i, i + 8), 16), mul) >>> 0;
      return () => { st = st + 0x6D2B79F5 | 0; let t = Math.imul(st ^ st >>> 15, 1 | st); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
    const pk = R => o => { let s = 0; for (const k in o) s += o[k]; let r = R() * s; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const pick = pk(mk(0x9e3779b9, 0x85ebca6b, 0));
    let lightT = pick({ 'High summer sun': 42, 'Low arctic sun': 28, 'Silver overcast': 20, 'Midnight sun': 10 });
    let clearT = pick({ 'Over a hundred metres': 50, 'Blue veil': 30, 'Absolute clear': 20 });
    let mossT = pick({ 'Moss on the ledges': 45, 'Thin moss': 22, 'Rich carpets': 25, 'Spring green': 8 });
    let crackT = pick({ 'Cathedral': 42, 'Wide hall': 30, 'Dogleg': 28 });
    let surfT = pick({ 'Glass calm': 58, 'Light breeze': 42 });
    let viewT = pick({ 'Along the crack': 44, 'Over the drop': 22, 'By the wall': 20, 'Toward the light': 14 });
    if (home) { lightT = 'High summer sun'; clearT = 'Over a hundred metres'; mossT = 'Moss on the ledges'; crackT = 'Cathedral'; surfT = 'Glass calm'; viewT = 'Along the crack'; }
    const pick2 = pk(mk(0x0628c0de, 0x27d4eb2f, 15));
    let placeT = pick2({ '': 62, 'Lagoon shallows': 14, 'Up from the floor': 13, 'The narrows': 11 });
    let skyT = pick2({ '': 78, 'Pocked by rain': 14, 'Thin ice': 8 });
    if (skyT === 'Thin ice' && lightT !== 'Low arctic sun' && lightT !== 'Silver overcast') skyT = '';
    if (home) { placeT = ''; skyT = ''; }
    if (placeT === 'The narrows' && lightT === 'Silver overcast') lightT = 'Low arctic sun';
    if (placeT) viewT = placeT;
    if (skyT === 'Thin ice' && viewT === 'Over the drop') skyT = '';
    if (skyT) surfT = skyT;
    if (surfT === 'Pocked by rain') lightT = 'Silver overcast';
    const E4 = mk(0x4a1f0628, 0x165667b1, 11)();
    const halfV = !home && hash.slice(0, 10) !== '0x8bd9fe8d' && ((viewT === 'Along the crack' && E4 < HALF_A) || (viewT === 'Lagoon shallows' && E4 < HALF_L));
    if (halfV) viewT = 'Half above, half below';
    return [['Light', lightT], ['Clarity', clearT], ['Moss', mossT], ['Crack', crackT], ['Surface', surfT], ['View', viewT]];
  },
});
// ==== end roll ====

// ==== roll 629 ====
ProtoRolls.add(629, {
  traits: {"Lamps":{"look":true,"values":{"Cold LED":416225,"Old halogen":250656,"Daylight HMI":249641,"Blue survey lamp":83478}},"Pool":{"look":true,"values":{"Lake":416833,"Long water":250185,"Cove":249681,"Twin pools":83301}},"Shore":{"look":true,"values":{"Mussel bank":454417,"White bank":182199,"Broken mussels":181747,"Black mud shore":181637}},"Snow":{"look":true,"values":{"Steady":499700,"Heavy":200652,"Sparse":199449,"Whiteout":100199}},"Beams":{"look":true,"values":{"Three beams":499657,"Wide floods":299232,"One hard beam":201111}},"Standoff":{"values":{"At the edge":500167,"Low over the bank":299575,"Up the slope":200258}},"View":{"look":true,"values":{"Across the pool":449915,"Down at the edge":225542,"Skimming the brine":169826,"Over the brine":154717}},"Light":{"values":{"Far lamps":651481,"Into the glare":209095,"Own lamps only":139424}},"Brine":{"look":true,"values":{"Slow waves":449602,"Dead calm":250858,"Long swell":199521,"Silt cloud":100019}}},
  roll(hash) {
    const HOME = '0x89f2221eb879530c5971de2f930bcd60dece4784ed65b945b0733f0677193cad';
    const home = hash === HOME;
    let hs = parseInt(hash.slice(2, 10), 16) | 0;
    const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const lightT = home ? 'Cold LED' : wtd([['Cold LED', 5], ['Daylight HMI', 3], ['Old halogen', 3], ['Blue survey lamp', 1]]);
    const poolT = home ? 'Lake' : wtd([['Lake', 5], ['Cove', 3], ['Long water', 3], ['Twin pools', 1]]);
    const shoreT = home ? 'Mussel bank' : wtd([['Mussel bank', 5], ['Black mud shore', 2], ['White bank', 2], ['Broken mussels', 2]]);
    const snowT = home ? 'Steady' : wtd([['Steady', 5], ['Sparse', 2], ['Heavy', 2], ['Whiteout', 1]]);
    const beamT = home ? 'Three beams' : wtd([['Three beams', 5], ['Wide floods', 3], ['One hard beam', 2]]);
    const standT = home ? 'At the edge' : wtd([['At the edge', 5], ['Low over the bank', 3], ['Up the slope', 2]]);
    let hs2 = (parseInt(hash.slice(2, 10), 16) ^ 0x6295a1c3) | 0;
    const Rn = () => { hs2 = hs2 + 0x6D2B79F5 | 0; let t = Math.imul(hs2 ^ hs2 >>> 15, 1 | hs2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const w2 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = Rn() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    let viewT = home ? 'Across the pool' : w2([['Across the pool', 45], ['Down at the edge', 20], ['Over the brine', 18], ['Skimming the brine', 17]]);
    const litT = home ? 'Far lamps' : w2([['Far lamps', 56], ['Into the glare', 18], ['Own lamps only', 12]]);
    const brineT = home ? 'Slow waves' : w2([['Slow waves', 45], ['Dead calm', 25], ['Long swell', 20], ['Silt cloud', 10]]);
    if (viewT === 'Over the brine' && litT === 'Own lamps only') viewT = 'Down at the edge';
    return [['Lamps', lightT], ['Pool', poolT], ['Shore', shoreT], ['Snow', snowT], ['Beams', beamT], ['Standoff', standT], ['View', viewT], ['Light', litT], ['Brine', brineT]];
  },
});
// ==== end roll ====

// ==== roll 632 ====
ProtoRolls.add(632, {
  traits: {"Lamp Glass":{"values":{"Banker Green":544684,"Amber Glass":273198,"Opal Glass":182118}},"Lit":{"look":true,"values":{"All On":296484,"Most On":296197,"Not Yet Lit":149647,"Half The Room":84580,"Scattered":73532,"One Lamp":57326,"One Row":42234}},"Dome":{"values":{"Dim Gold":545080,"Night Blue":273173,"Bare Plaster":181747}},"Hour":{"look":true,"values":{"Blue Hour":328153,"Snow Light":189358,"Winter Afternoon":180861,"Deep Night":175272,"Last Light":126356}},"Floor":{"look":true,"values":{"Parquet":499657,"Black Marble":299232,"Terrazzo":201111}},"Standing":{"look":true,"values":{"At A Desk":160597,"Along The Aisle":129751,"Upper Gallery":119390,"On The Landing":102118,"Under The Gallery":96751,"Across The Lamps":88023,"Under The Dome":84228,"By A Window":80030,"Centre Desk":64199,"From The Lantern":61286,"Into The Dome":13627}},"Outside":{"values":{"Clear":600499,"Snow Falling":199487,"Rain On The Glass":119318,"Fog":80696}},"Left On The Desks":{"values":{"Books And Slips":500204,"Folios Heaped":250006,"Bare Desks":249790}}},
  roll(hash) {
    const HOME = '0x928a8569ad08aa2167e32daf5678728f6cf52743631dd7f2cd11a41f37f11f77';
    const home = hash === HOME;
    const mul = (o) => () => { o.s = o.s + 0x6D2B79F5 | 0; const s = o.s; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const R = mul({ s: parseInt(hash.slice(2, 10), 16) | 0 });
    const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    let s1 = 0x0632a11e;
    for (let i = 2; i < 66; i += 8) s1 = Math.imul(s1 ^ parseInt(hash.slice(i, i + 8), 16), 0x27d4eb2f) ^ (s1 >>> 15);
    const R2 = mul({ s: s1 });
    const rLit = R2(), rStand = R2();
    let lampT = home ? 'Banker Green' : wtd([['Banker Green', 6], ['Amber Glass', 3], ['Opal Glass', 2]]);
    let litT = home ? 'Most On' : wtd([['All On', 7], ['Most On', 7], ['Half The Room', 2], ['Scattered', 1], ['One Row', 1]]);
    let domeT = home ? 'Dim Gold' : wtd([['Dim Gold', 6], ['Night Blue', 3], ['Bare Plaster', 2]]);
    let hourT = home ? 'Blue Hour' : wtd([['Blue Hour', 5], ['Deep Night', 3], ['Snow Light', 3], ['Last Light', 2]]);
    let floorT = home ? 'Parquet' : wtd([['Parquet', 5], ['Black Marble', 3], ['Terrazzo', 2]]);
    if (!home && rLit < .07) litT = 'One Lamp';
    let s3 = 0x0632c2c2;
    for (let i = 2; i < 66; i += 8) s3 = Math.imul(s3 ^ parseInt(hash.slice(i, i + 8), 16), 0x2c1b3c6d) ^ (s3 >>> 13);
    const R3 = mul({ s: s3 });
    const w3 = (v, u0) => { let s = 0; for (const o of v) s += o[1]; let u = u0 * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const rS = R3(); R3(); R3(); R3(); const rOut = R3(), rLeft = R3();
    let standT = home ? 'On The Landing' : rStand < .17 ? 'Upper Gallery' : w3([['At A Desk', 15], ['On The Landing', 15], ['Along The Aisle', 20], ['Under The Gallery', 15], ['Centre Desk', 10], ['Into The Dome', 4]], rS);
    const outT = home ? 'Clear' : w3([['Clear', 60], ['Snow Falling', 20], ['Rain On The Glass', 12], ['Fog', 8]], rOut);
    const leftT = home ? 'Books And Slips' : w3([['Bare Desks', 25], ['Books And Slips', 50], ['Folios Heaped', 25]], rLeft);
    if (litT === 'One Lamp' && hourT === 'Deep Night') hourT = 'Blue Hour';
    if (litT === 'One Lamp' && standT !== 'Upper Gallery') standT = 'At A Desk';
    if (litT === 'One Row' && (standT === 'Along The Aisle' || standT === 'Under The Gallery' || standT === 'Centre Desk')) standT = 'At A Desk';
    let s4 = 0x0632d4e5;
    for (let i = 2; i < 66; i += 8) s4 = Math.imul(s4 ^ parseInt(hash.slice(i, i + 8), 16), 0x1b873593) ^ (s4 >>> 14);
    const R4 = mul({ s: s4 });
    const u4 = R4(), u4s = R4(), u4h = R4();
    if (!home) {
      if (u4 < .3) standT = w3([['From The Lantern', 7], ['By A Window', 8], ['Across The Lamps', 10], ['Under The Dome', 5]], u4s);
      else if (standT === 'Into The Dome' && u4s < .5) standT = 'Under The Dome';
      if (u4h < .18) hourT = 'Winter Afternoon';
    }
    if ((litT === 'One Lamp' || litT === 'Scattered') && (standT === 'From The Lantern' || standT === 'Across The Lamps')) standT = 'Under The Dome';
    if (hourT === 'Winter Afternoon') litT = litT === 'One Lamp' || litT === 'One Row' || litT === 'Scattered' ? 'Scattered' : 'Not Yet Lit';
    return [['Lamp Glass', lampT], ['Lit', litT], ['Dome', domeT], ['Hour', hourT], ['Floor', floorT], ['Standing', standT], ['Outside', outT], ['Left On The Desks', leftT]];
  },
});
// ==== end roll ====

// ==== roll 633 ====
ProtoRolls.add(633, {
  traits: {"Sun":{"look":true,"values":{"Morning":400684,"Very low":279639,"Higher":239914,"Midnight sun":79763}},"Fog":{"look":true,"values":{"Thinning":399843,"Thick":259983,"Lying low":220197,"Nearly gone":119977}},"Bow":{"look":true,"values":{"Broad and white":399528,"A second band inside":261061,"Faintly coloured":239287,"Wide and pale":100124}},"In the fog":{"look":true,"values":{"A few bergs":359988,"One great berg":260050,"Growlers":220147,"A far headland":159815}},"Spit":{"look":true,"values":{"Running away right":401350,"Running away left":259513,"A low bar":199143,"A wide beach":139994}},"Light":{"look":true,"values":{"Pearl":400009,"Pewter":279756,"Cold blue":200506,"Faint rose":119729}},"Standpoint":{"look":true,"values":{"On the spit":320105,"At the water's edge":198718,"On the storm crest":139563,"From the raised beach":109551,"Down among the stones":100033,"Along the bow's foot":80146,"Facing open water":51884}},"On the beach":{"look":true,"values":{"Bare shingle":459537,"Stranded ice":240100,"Old snow":159863,"A kelp wrack line":140500}},"Sea":{"look":true,"values":{"Glass":460168,"A long low swell":260003,"Brash ice":179869,"A skin of new ice":99960}}},
  roll(hash) {
    const HOME = '0x1815669b374707d7512410254634426ade2e90c4c429d7217af52a1acff32a11';   // hashFor(632, 0): the site's home
    const home = hash === HOME;
    const seed = (s, m, sh) => { for (let i = 2; i < 66; i += 8) s = Math.imul(s ^ parseInt(hash.slice(i, i + 8), 16), m) ^ (s >>> sh); return s; };
    const mk = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const pk = R => o => { let tot = 0; for (const k in o) tot += o[k]; let r = R() * tot; for (const k in o) { r -= o[k]; if (r < 0) return k; } return Object.keys(o)[0]; };
    const R = mk(seed(0x633b0e, 0x85ebca6b, 13)); for (let i = 0; i < 8; i++) R();
    const pick = pk(R);
    const sunN = home ? 'Morning' : pick({ Morning: 40, 'Very low': 28, Higher: 24, 'Midnight sun': 8 });
    const fogN = home ? 'Thinning' : pick({ Thinning: 40, Thick: 26, 'Lying low': 22, 'Nearly gone': 12 });
    const bowN = home ? 'Broad and white' : pick({ 'Broad and white': 40, 'A second band inside': 26, 'Faintly coloured': 24, 'Wide and pale': 10 });
    const standN = home ? 'A few bergs' : pick({ 'A few bergs': 36, 'One great berg': 26, 'Growlers': 22, 'A far headland': 16 });
    const spitN = home ? 'Running away right' : pick({ 'Running away right': 40, 'Running away left': 26, 'A low bar': 20, 'A wide beach': 14 });
    const lightN = home ? 'Pearl' : pick({ Pearl: 40, Pewter: 28, 'Cold blue': 20, 'Faint rose': 12 });
    const R2 = mk(seed(0x633a11, 0x9e3779b1, 15)); for (let i = 0; i < 6; i++) R2();
    const pick2 = pk(R2);
    let viewR = home ? 'On the spit' : pick2({ 'On the spit': 50, "At the water's edge": 18, 'On the storm crest': 14, 'From the raised beach': 11, 'Facing open water': 7 });
    if (viewR === 'Facing open water' && fogN === 'Thick') viewR = "At the water's edge";
    const R3 = mk(seed(0x633c2d, 0x2c1b3c6d, 14)); for (let i = 0; i < 5; i++) R3();
    { const u3 = R3(); if (!home && viewR === 'On the spit') viewR = u3 < 0.2 ? 'Down among the stones' : u3 < 0.36 ? "Along the bow's foot" : viewR; }
    const beachN = home ? 'Bare shingle' : pick2({ 'Bare shingle': 46, 'Stranded ice': 24, 'Old snow': 16, 'A kelp wrack line': 14 });
    const seaN = home ? 'Glass' : pick2({ Glass: 46, 'A long low swell': 26, 'Brash ice': 18, 'A skin of new ice': 10 });
    return [['Sun', sunN], ['Fog', fogN], ['Bow', bowN], ['In the fog', standN], ['Spit', spitN], ['Light', lightN], ['Standpoint', viewR], ['On the beach', beachN], ['Sea', seaN]];
  },
});
// ==== end roll ====

// ==== roll 639 ====
ProtoRolls.add(639, {
  traits: {"Lamps":{"look":true,"values":{"Oil amber":384348,"Beeswax":229893,"Copper":154645,"Pale wick":154077,"Ember":77037}},"Dark":{"values":{"Long dark":500147,"Deep reach":299981,"Close dark":199872}},"Stone":{"look":true,"values":{"Oxblood and cream":454417,"Terracotta and ivory":272563,"Ochre and limestone":182465,"Whitewashed":90555}},"Shaft":{"look":true,"values":{"One door":363173,"Wide morning":217112,"Open to the court":199459,"Ajar":145448,"Shut":74808}},"Floor":{"look":true,"values":{"Polished":429779,"Mirror wax":257421,"Worn":173107,"Washed lane":139693}},"Stand":{"look":true,"values":{"By the doors":220573,"Looking back":120070,"Up among the arches":99834,"Low":97317,"Long lens":97094,"On the axis":73083,"Looking up":73053,"At a shaft":72808,"Diagonal":58592,"Down the nave":43860,"Across the ranks":43716}},"Light":{"look":true,"values":{"Many lamps":258234,"Few lamps":248796,"By day":199459,"One lamp":115352,"Every lamp":103351,"Shut, lamps":37761,"Shut, few lamps":37047}},"Hall":{"values":{"Brick and stone":534717,"Dark shafts":178259,"Painted bays":177884,"Lantern bay":109140}}},
  roll(hash) {
    const HOME = '0xacf934f797e80d277150a653447faf392909dcd696d1aba225e3be7ad81bb109';
    const out = [];
    const T = (name, value) => { const v = typeof value === 'number' && !Number.isInteger(value) ? +value.toFixed(2) : value; const i = out.findIndex(t => t[0] === name); if (i >= 0) out[i][1] = String(v); else out.push([name, String(v)]); return value; };
      let hs = parseInt(hash.slice(2, 10), 16) | 0;
      const R = () => { hs = hs + 0x6D2B79F5 | 0; let t = Math.imul(hs ^ hs >>> 15, 1 | hs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wtd = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
    const home = hash === HOME;
      // ---------- traits ----------
      const lampT = home ? 'Oil amber' : wtd([['Oil amber', 5], ['Beeswax', 3], ['Copper', 2], ['Pale wick', 2], ['Ember', 1]]);
      const darkT = home ? 'Long dark' : wtd([['Long dark', 5], ['Close dark', 2], ['Deep reach', 3]]);
      const stoneT = home ? 'Oxblood and cream' : wtd([['Oxblood and cream', 5], ['Terracotta and ivory', 3], ['Ochre and limestone', 2], ['Whitewashed', 1]]);
      const shaftT = home ? 'One door' : wtd([['One door', 5], ['Wide morning', 3], ['Ajar', 2]]);
      const floorT = home ? 'Polished' : wtd([['Polished', 5], ['Mirror wax', 3], ['Worn', 2]]);
      const viewT = home ? 'Diagonal' : wtd([['Diagonal', 4], ['Down the nave', 3], ['Across the ranks', 3]]);
      let litT = home ? 'Many' : wtd([['Many', 5], ['Few', 2], ['All lit', 2]]);
      // new looks on their own stream, so every old roll stays: where you stand and how you look, what lights the hall,
      // the hall's own build, and a lane of floor just washed
      let h2 = (parseInt(hash.slice(10, 18), 16) ^ 0x51a7000e) | 0;
      const R2 = () => { h2 = h2 + 0x6D2B79F5 | 0; let t = Math.imul(h2 ^ h2 >>> 15, 1 | h2); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wt2 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R2() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      const eyeT = home ? 'Standing' : wt2([['Standing', 3], ['Long lens', 2], ['Low', 2], ['Looking up', 1.5], ['At a shaft', 1.5], ['On the axis', 1.5]]);
      let lightT = home ? 'Lamps' : wt2([['Lamps', 5], ['One lamp', 1.4], ['Doors open', 2], ['First light', 1.6]]);
      const hallT = home ? 'Brick and stone' : wt2([['Brick and stone', 6], ['Painted bays', 2], ['Dark shafts', 2]]);
      const washed = !home && R2() < .14;
      // first light came out as a grey room with no source in it, among the weakest tiles: its roll stays, and it shows
      // as a few lamps instead
      if (lightT === 'First light') { lightT = 'Lamps'; litT = 'Few'; }
      const r2a = R2(), r2b = R2(), r2c = R2();
      // a third stream (2026-11-12, the founder's note "more diversity/variety"): where in the hall you stand, and whether
      // the doors are shut; the two older streams roll exactly as before
      let h3 = (parseInt(hash.slice(18, 26), 16) ^ 0x639c0de3) | 0;
      const R3 = () => { h3 = h3 + 0x6D2B79F5 | 0; let t = Math.imul(h3 ^ h3 >>> 15, 1 | h3); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const wt3 = (v) => { let s = 0; for (const o of v) s += o[1]; let u = R3() * s; for (const o of v) { u -= o[1]; if (u <= 0) return o[0]; } return v[0][0]; };
      // (the doorway standpoint and the special bays were planned on this stream and not built: their shares stay where
      // the draws put them, folded into the nearest value)
      let standN = home ? '' : wt3([['', 56], ['Looking back', 12], ['Up among the arches', 10], ['By the doors', 14], ['By the doors', 8]]);
      // (the special bays' draw is the lantern's: a lamp-lit nave view, not the home, about one mint in ten)
      const rLn = R3();
      // one lamp seen from up among the arches left the near arcades as black cut-outs: those mints keep their lamps
      if (standN === 'Up among the arches' && lightT === 'One lamp') lightT = 'Lamps';
      const day = lightT === 'Doors open';
      const shut = !home && R3() < .12 && !day && standN !== 'By the doors';
      const r3a = R3(), r3b = R3(), r3c = R3();
      const lant = !home && rLn < .23 && !day && (standN === '' || standN === 'Looking back') && eyeT !== 'Looking up';
      T('Lamps', lampT); T('Dark', darkT); T('Stone', stoneT);
      T('Shaft', shut ? 'Shut' : day ? 'Open to the court' : shaftT);
      T('Floor', washed ? 'Washed lane' : floorT);
      T('Stand', standN || (eyeT === 'Standing' ? viewT : eyeT));
      T('Light', shut ? (litT === 'Few' || lightT === 'One lamp' ? 'Shut, few lamps' : 'Shut, lamps') : day ? 'By day' : lightT !== 'Lamps' ? lightT : litT === 'Many' ? 'Many lamps' : litT === 'Few' ? 'Few lamps' : 'Every lamp');
      T('Hall', lant ? 'Lantern bay' : hallT);

    return out;
  },
});
// ==== end roll ====

;return ProtoRolls;
};
Object.defineProperty(window.PrintsRolls = window.PrintsRolls || {}, 'drop06', { configurable: true, enumerable: true, get: function () { return made || (made = make()); } });
;(window.PrintsRollsSha = window.PrintsRollsSha || {})['drop06'] = '865ce9dfff43c5a8f241931893a2b1a80cf79ec6ffcb1a98c4459757d49af99f';
})();
