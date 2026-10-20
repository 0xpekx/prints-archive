// Sea Rogues: from D:/code/synaesthesia/public/drop03/pieces/003.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Sea Rogues: pirate crew portraits in flat colours with heavy black outlines, 32 x 32 cells.
Proto.add({
  num: 3,
  name: 'Sea Rogues',
  seed: 419,
  fam: 'Pixel Portraits',
  recipe: 'A pirate crew portrait drawn in flat colour with heavy black outlines on a 32-cell grid, the sea behind them. Hat, coat, face, beard, eyepatch, earring, the thing they carry, the companion on their shoulder and the weather at sea vary; a rare few are cursed ghosts, and once in a while something rises from the deep. About 1 in 450 is a legendary (a captain turned to cursed gold, one of the merfolk, the Pirate King with every finest thing at once) and 1 in 200 carries a ship in a bottle.',
  interactive: 'Tap the pirate to sing the next note of a shanty. Tap the sea to splash it.',
  music: true,
  make(c) {
    const S = c.size, N = 32;
    // Park-Miller "minimal standard" generator, seeded from the hash
    let seed = 0;
    for (let i = 2; i < c.hash.length; i += 6) seed = (seed * 31 + parseInt(c.hash.slice(i, i + 6), 16)) % 2147483647;
    if (seed <= 0) seed += 2147483646;
    const lehmer = () => { seed = (seed * 48271) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 6; i++) lehmer();
    function pick(list) {
      let sum = 0;
      for (const e of list) sum += e.w;
      let r = lehmer() * sum;
      for (const e of list) { r -= e.w; if (r < 0) return e; }
      return list[0];
    }

    let hat = pick([{ v: 'Tricorn', w: 28 }, { v: 'Bandana', w: 24 }, { v: 'Bicorne', w: 14 }, { v: 'Cavalier', w: 12 }, { v: 'Headscarf', w: 12 }, { v: 'Bare Head', w: 10 }]).v;
    const COATS = [
      { v: 'Navy', w: 24, c: ['#2a3a7a', '#1a2656'] }, { v: 'Crimson', w: 20, c: ['#b42a36', '#7a1a24'] }, { v: 'Bottle Green', w: 16, c: ['#1e6a4a', '#124430'] },
      { v: 'Coal', w: 16, c: ['#34343e', '#1e1e26'] }, { v: 'Mustard', w: 12, c: ['#d8a02a', '#9a6a14'] }, { v: 'Plum', w: 8, c: ['#6a2a7a', '#441a50'] }, { v: 'Gold Brocade', w: 4, c: ['#f2c63e', '#b88a1a'] },
    ];
    let coat = pick(COATS);
    let beard = pick([{ v: 'None', w: 30 }, { v: 'Stubble', w: 18 }, { v: 'Curled Moustache', w: 18 }, { v: 'Full Beard', w: 20 }, { v: 'Braided Beard', w: 14 }]).v;
    let eyes = pick([{ v: 'Steady', w: 34 }, { v: 'Eyepatch', w: 26 }, { v: 'Squint', w: 18 }, { v: 'Scarred', w: 14 }, { v: 'Spyglass Eye', w: 8 }]).v;
    let grin = pick([{ v: 'Smirk', w: 30 }, { v: 'Grin', w: 24 }, { v: 'Gold Tooth', w: 12 }, { v: 'Stern', w: 22 }, { v: 'Shout', w: 12 }]).v;
    let carry = pick([{ v: 'Nothing', w: 30 }, { v: 'Spyglass', w: 18 }, { v: 'Cutlass', w: 18 }, { v: 'Treasure Map', w: 14 }, { v: 'Lantern', w: 12 }, { v: 'Doubloon', w: 8 }]).v;
    let sea = pick([
      { v: 'Noon', w: 26, c: ['#7ac8f0', '#a8e0fa', '#2a7ab8', '#1a5a94', '#e8f6ff'] }, { v: 'Dusk', w: 22, c: ['#f08a5a', '#f6c07a', '#4a4a8a', '#2e2e6a', '#ffd8a8'] },
      { v: 'Storm', w: 16, c: ['#4a5260', '#626c7a', '#24323e', '#18222c', '#c8d4e0'] }, { v: 'Night', w: 16, c: ['#0e1430', '#1a2448', '#0a2238', '#06182a', '#f4e8b0'] },
      { v: 'Dawn', w: 14, c: ['#f6b8c8', '#fde0c8', '#5a8ab8', '#3a6a98', '#ffffff'] }, { v: 'Green Flash', w: 6, c: ['#f4a24a', '#9ae87a', '#2a5a7a', '#1a3a5a', '#e0ffd0'] },
    ]);
    let sight = pick([{ v: 'Open Water', w: 34 }, { v: 'Distant Ship', w: 26 }, { v: 'Island', w: 22 }, { v: 'Lighthouse', w: 18 }]).v;
    let earring = lehmer() < 0.45;
    const skins = ['#f4d0b0', '#e6b38a', '#c99066', '#a06a44', '#7a4a2c', '#53311c'];
    let skin = skins[Math.floor(lehmer() * skins.length)];
    const hairs = ['#1e1612', '#4a2c18', '#8a4a20', '#c8a060', '#d8d4cc', '#6a2418'];
    let hair = hairs[Math.floor(lehmer() * hairs.length)];
    const scarfCol = ['#d8323e', '#2a6ad8', '#e8b020', '#2a9a5a', '#8a3ab8'][Math.floor(lehmer() * 5)];
    const patchLeft = lehmer() < 0.5;
    const phase = lehmer() * 6.28, blinkEvery = 3 + lehmer() * 3;

    c.trait('Hat', hat);
    c.trait('Coat', coat.v);
    c.trait('Beard', beard);
    c.trait('Eyes', eyes);
    c.trait('Mouth', grin);
    c.trait('Carrying', carry);
    c.trait('Sky', sea.v);
    c.trait('On The Horizon', sight);
    // later additions from their own generator on the hash's tail, so every draw above stays as it was
    let w2 = (parseInt(c.hash.slice(-14, -6), 16) ^ 0x2545f491) >>> 0 || 7;
    const xr = () => { w2 ^= w2 << 7; w2 >>>= 0; w2 ^= w2 >>> 9; w2 ^= w2 << 8; w2 >>>= 0; return w2 / 4294967296; };
    xr(); xr();
    const cr = xr() * 100;
    let companion = cr < 54 ? 'None' : cr < 80 ? 'Parrot' : cr < 89 ? 'Crab' : cr < 97.5 ? 'Ship Rat' : 'Kraken';
    c.trait('Companion', companion);
    let ghostly = xr() < 0.022;
    // the rarest crew: a cursed ghost in sea-green rags (named through the coat)
    if (ghostly) { skin = '#9ee8cc'; c.trait('Coat', 'Ghostly'); coat.c = ['#3e8a78', '#2a5e52']; }
    const parrotCol = ['#e8323e', '#2a9a5a', '#2a6ad8'][Math.floor(xr() * 3)];
    // the crew grows: drawn faces (head shape, nose, brows, hair, marks) and new looks, all from this same tail generator
    const pickW = list => { let sum = 0; for (const e of list) sum += e[1]; let r = xr() * sum; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
    let face = pickW([['Oval', 22], ['Square Jaw', 18], ['Long', 14], ['Round', 14], ['Heart', 12], ['Gaunt', 10], ['Broad Jaw', 12]]);
    const nose = pickW([['Straight', 26], ['Button', 16], ['Hooked', 16], ['Broad', 16], ['Crooked', 12], ['Bulbous', 8]]);
    const brows = pickW([['Heavy', 24], ['Arched', 18], ['Furrowed', 22], ['Raised', 16], ['Thin', 14]]);
    let hairDo = pickW([['Long', 28], ['Short', 24], ['Braids', 14], ['Ponytail', 16], ['Wild', 14]]);
    let marks = pickW([['None', 40], ['Freckles', 12], ['Cheek Scar', 12], ['Anchor Tattoo', 8], ['Weathered', 12], ['Soot Stripe', 8], ['Beauty Mark', 8]]);
    const iris = ['#4a2e1a', '#2a5a9a', '#3a7a3a', '#5a5a66', '#8a5a14'][Math.floor(xr() * 5)];
    if (xr() < 0.45) beard = pickW([['None', 20], ['Stubble', 10], ['Curled Moustache', 8], ['Full Beard', 10], ['Braided Beard', 7], ['Goatee', 16], ['Mutton Chops', 14], ['Handlebar', 14]]);
    if (xr() < 0.45) eyes = pickW([['Steady', 18], ['Eyepatch', 12], ['Squint', 9], ['Scarred', 7], ['Spyglass Eye', 4], ['Narrow', 16], ['Wide', 12], ['Tired', 12], ['Glass Eye', 3]]);
    if (xr() < 0.45) grin = pickW([['Smirk', 14], ['Grin', 12], ['Gold Tooth', 6], ['Stern', 10], ['Shout', 5], ['Snarl', 12], ['Pipe', 12], ['Whistle', 10], ['Lips', 14]]);
    if (xr() < 0.4) hat = pickW([['Tricorn', 14], ['Bandana', 12], ['Bicorne', 7], ['Cavalier', 6], ['Headscarf', 6], ['Bare Head', 8], ['Knit Cap', 16], ['Peaked Cap', 14]]);
    if (xr() < 0.35 && !ghostly) coat = pickW([[coat, 40], [{ v: 'Sailor Stripes', c: ['#f4f0e6', '#2a3a7a'], s: 1 }, 20], [{ v: 'Leather', c: ['#6a4428', '#46301a'] }, 20], [{ v: 'Sky Blue', c: ['#4a8ad8', '#2a5aa0'] }, 16]]);
    // gold is the Pirate King's: most gold brocade coats go back to cloth (a hash of its own, so nothing else moves)
    { let q = Math.imul(parseInt(c.hash.slice(-22, -14), 16) | 0, 0x9e3779b1); q ^= q >>> 15; q = Math.imul(q, 0x85ebca6b); q ^= q >>> 13;
      if (coat.v === 'Gold Brocade' && (q >>> 0) / 4294967296 < 0.84) coat = COATS[(q >>> 3) % 6]; }
    // the legendaries and the coveted ship in a bottle, from a Tausworthe (taus88) stream of their own
    // on three words of the hash, so nothing rolled above changes for the ordinary crew
    let u1 = (parseInt(c.hash.slice(2, 10), 16) | 2) >>> 0, u2 = (parseInt(c.hash.slice(26, 34), 16) | 8) >>> 0, u3 = (parseInt(c.hash.slice(50, 58), 16) | 16) >>> 0;
    const taus = () => {
      let b = ((u1 << 13) ^ u1) >>> 19; u1 = (((u1 & 0xfffffffe) << 12) ^ b) >>> 0;
      b = ((u2 << 2) ^ u2) >>> 25; u2 = (((u2 & 0xfffffff8) << 4) ^ b) >>> 0;
      b = ((u3 << 3) ^ u3) >>> 11; u3 = (((u3 & 0xfffffff0) << 17) ^ b) >>> 0;
      return ((u1 ^ u2 ^ u3) >>> 0) / 4294967296;
    };
    for (let i = 0; i < 6; i++) taus();
    const lroll = taus(), broll = taus();
    const legend = lroll < 0.0008 ? 'Cursed Gold' : lroll < 0.0016 ? 'Merfolk' : lroll < 0.0022 ? 'Pirate King' : 'None';
    const gold = legend === 'Cursed Gold', mer = legend === 'Merfolk', king = legend === 'Pirate King';
    if (legend !== 'None') ghostly = false;
    if (legend === 'None' && broll < 0.005) carry = 'Ship in a Bottle';
    if (mer) {
      // one of the sea's own: teal skin, fins for ears, kelp for hair, a coral crown and a trident
      skin = '#4cc0a4'; hair = '#2e7a3e'; hat = 'Coral Crown'; carry = 'Trident'; hairDo = 'Long';
      if (companion !== 'Kraken') companion = 'None';
      if (beard === 'Stubble') beard = 'None';
    }
    if (king) {
      // the one with everything: every finest thing the crew can roll, all on one captain
      hat = 'Bicorne'; coat = { v: 'Gold Brocade', c: ['#f2c63e', '#b88a1a'] }; beard = 'Braided Beard'; eyes = 'Eyepatch'; grin = 'Gold Tooth';
      carry = 'Cutlass'; companion = 'Parrot'; earring = true; marks = 'Cheek Scar'; sight = 'Distant Ship';
      sea = { v: 'Green Flash', c: ['#f4a24a', '#9ae87a', '#2a5a7a', '#1a3a5a', '#e0ffd0'] };
    }
    // the cut of their clothes, which changes the shoulders and neckline, from an FNV stream of its own
    // on the hash text so nothing rolled above moves; the Pirate King always wears the frock coat
    let fh = 0x811c9dc5 ^ 0x6f7574;
    for (let i = 2; i < c.hash.length; i++) fh = Math.imul(fh ^ c.hash.charCodeAt(i), 0x01000193);
    fh ^= fh >>> 13; fh = Math.imul(fh, 0x5bd1e995); fh ^= fh >>> 15;
    let outfit = 'Frock Coat';
    { let r = (fh >>> 0) / 4294967296 * 100; for (const [v, w] of [['Frock Coat', 26], ['Oilskin', 14], ['Jerkin and Bandolier', 16], ['Blouse and Sash', 14], ['Ragged Vest', 14], ['Open Shirt', 16]]) if ((r -= w) < 0) { outfit = v; break; } }
    if (king) outfit = 'Frock Coat';
    c.trait('Hat', hat);
    c.trait('Coat', ghostly ? 'Ghostly' : coat.v);
    c.trait('Outfit', outfit);
    c.trait('Beard', beard);
    c.trait('Eyes', eyes);
    c.trait('Mouth', grin);
    c.trait('Face', face);
    c.trait('Nose', nose);
    c.trait('Brows', brows);
    c.trait('Hair', hairDo);
    c.trait('Marks', marks);
    c.trait('Carrying', carry);
    c.trait('Companion', king ? 'Parrot and Kraken' : companion);
    c.trait('Sky', sea.v);
    c.trait('On The Horizon', sight);
    if (legend !== 'None') c.trait('Legendary', legend);
    // the legendaries drawn as 1/1 pictures of their own (legendRogue, below); every other pirate is drawn as before.
    // A type left out of this list falls back to the older drawing further down.
    const ONE_OF_ONE = ['Cursed Gold', 'Merfolk', 'Pirate King'];
    if (king) return kingEGA();
    if (ONE_OF_ONE.includes(legend)) return legendRogue();

    // ---------- the Pirate King, redrawn as a scene from a 16-colour EGA adventure game: the King full-length on his
    // moonlit deck in a three-quarter pose, cutlass raised, the kraken's arms rising over the rail behind him; the strict
    // EGA palette, blended only by ordered dithering, on a 64-cell grid. Every trait he lists is in the scene: the
    // green flash where the sun has just gone down, the distant ship, the bicorne and crown, the face, nose, brows and
    // hair he rolled (drawn fresh), the braided beard, eyepatch, gold tooth and scar, the gold-trimmed frock coat,
    // the cutlass, the parrot and the kraken. ----------
    function kingEGA() {
      const M = 64, cel = Math.max(1, Math.floor(S / M)), of = Math.floor((S - cel * M) / 2);
      const g = c.ctx;
      const can = document.createElement('canvas');
      can.width = can.height = M;
      const cx2 = can.getContext('2d'), img = cx2.createImageData(M, M), D = img.data;
      // the sixteen EGA colours
      const K = '#000000', NB = '#0000aa', GR = '#00aa00', CY = '#00aaaa', RD = '#aa0000', MG = '#aa00aa', BR = '#aa5500', LG = '#aaaaaa';
      const DG = '#555555', LB = '#5555ff', LGN = '#55ff55', LC = '#55ffff', LR = '#ff5555', LM = '#ff55ff', YL = '#ffff55', WH = '#ffffff';
      const RGB = {};
      const rgb = h => RGB[h] || (RGB[h] = [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
      const put = (x, y, h) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x >= M || y >= M) return; const k = (y * M + x) * 4, v = rgb(h); D[k] = v[0]; D[k + 1] = v[1]; D[k + 2] = v[2]; D[k + 3] = 255; };
      // a dithered blend of two EGA colours, the way the old games shaded
      const dth = (x, y, a, b) => ((x + y) & 1 ? a : b);
      const lv = [];
      for (let i = 0; i < 8; i++) lv.push(taus());
      const tonic2 = 50 + parseInt(c.hash.slice(-6, -2), 16) % 9, DOR2 = [0, 2, 3, 5, 7, 9, 10];
      const deg2 = k => tonic2 + 12 * Math.floor(k / 7) + DOR2[((k % 7) + 7) % 7];
      const tapsNow = () => c.input.taps().map(p => [(p.x * S - of) / cel, (p.y * S - of) / cel]);
      // his skin and hair, brought to the EGA palette: a pair to dither between
      const lum = h => { const v = rgb(h); return 0.3 * v[0] + 0.59 * v[1] + 0.11 * v[2]; };
      const sl = lum(skin), SKA = sl > 190 ? WH : sl > 140 ? LR : sl > 100 ? BR : BR, SKB = sl > 190 ? LR : sl > 140 ? BR : sl > 100 ? RD : DG;
      const hl = lum(hair), [rr, gg, bb] = rgb(hair), HA = hl > 170 ? WH : hl > 120 ? (rr > gg + 30 ? LR : YL) : hl > 70 ? BR : rr > gg + 30 ? RD : DG, HB = hl > 170 ? LG : hl > 120 ? BR : hl > 70 ? RD : K;
      // the font the game's dialogue is written in
      const FONT = { H: ['#.#', '#.#', '###', '#.#', '#.#'], A: ['.#.', '#.#', '###', '#.#', '#.#'], R: ['##.', '#.#', '##.', '#.#', '#.#'], '!': ['.#.', '.#.', '.#.', '...', '.#.'], ' ': ['...', '...', '...', '...', '...'],
        B: ['##.', '#.#', '##.', '#.#', '##.'], E: ['###', '#..', '##.', '#..', '###'], G: ['.##', '#..', '#.#', '#.#', '.##'], O: ['.#.', '#.#', '#.#', '#.#', '.#.'], N: ['#.#', '###', '###', '#.#', '#.#'], S: ['.##', '#..', '.#.', '..#', '##.'], Q: ['.#.', '#.#', '#.#', '##.', '.##'], U: ['#.#', '#.#', '#.#', '#.#', '###'], W: ['#.#', '#.#', '###', '###', '#.#'], K: ['#.#', '#.#', '##.', '#.#', '#.#'] };
      const say = (str, cx, y0, col) => { let x = Math.round(cx - str.length * 2); for (const ch of str) { (FONT[ch] || FONT[' ']).forEach((r, j) => { for (let i = 0; i < 3; i++) if (r[i] === '#') { put(x + i + 1, y0 + j + 1, K); put(x + i, y0 + j, col); } }); x += 4; } };
      const HOR = 31, SUNX = lv[3] < 0.5 ? 8 : 56, SHIPX = SUNX < 32 ? 47 : 10, MOON = [SUNX < 32 ? 50 : 14, 8];
      // the kraken: two arms rising out of the sea behind the rail, curling at their tips
      let laughUntil = -1, squawkUntil = -1, hits = 0, slash = null, retreatAt = -99, lastT = 0;
      const hitAt = [-9, -9], RETREAT = 9.2, tips = [], splashes = [];
      const sinkOf = (i, t) => { const r = t - retreatAt, u = t - hitAt[i]; let s0 = r < RETREAT ? (r < 0.6 ? 0 : r < 2.4 ? (r - 0.6) / 1.8 : r > RETREAT - 1.2 ? (RETREAT - r) / 1.2 : 1) * 40 : 0; if (u < 0.8) s0 += Math.sin(u / 0.8 * Math.PI) * 5; return s0; };
      const lenOf = (i, t) => { const u = t - hitAt[i]; return 40 - (u < 1.4 ? 9 : u < 2.2 ? 9 * (2.2 - u) / 0.8 : 0); };
      const arm = (side, t, sink, len) => {
        const dir = side ? -1 : 1, pts = [];
        const spin = Math.min(1, sink / 40) * 9;
        let x = side ? 54 : 10, y = 46 + sink, a = -Math.PI / 2 - dir * (0.12 + Math.sin(t * 1.1 + side * 2) * 0.08) + dir * spin * 0.3;
        for (let s2 = 0; s2 <= len; s2 += 0.5) {
          const u = s2 / 40;
          pts.push([x, y, 3.6 * (1 - u) + 0.7, a]);
          a += dir * (u < 0.5 ? 0.003 : (u - 0.5) * 1.1 + Math.sin(t * 1.6 + side) * 0.03) * 0.5;
          x += Math.cos(a) * 0.5; y += Math.sin(a) * 0.5;
        }
        return pts;
      };
      const PARROT = [43, 27];
      const onParrot = (x, y) => x >= PARROT[0] - 1 && x <= PARROT[0] + 5 && y >= PARROT[1] - 1 && y <= PARROT[1] + 7;
      const feel = t => {
        lastT = t;
        for (const [x, y] of tapsNow()) {
          if (x < 0 || y < 0 || x >= M || y >= M) continue;
          if (onParrot(x, y)) {
            squawkUntil = t + 0.9;
            c.sound.note(deg2(11), { dur: 0.07, vel: 0.2, wave: 'square', cutoff: 2600 }); c.sound.note(deg2(9), { dur: 0.1, vel: 0.18, wave: 'square', cutoff: 2400, at: 0.09 });
            continue;
          }
          let hit = -1;
          [0, 1].forEach(k => { if (hit < 0 && sinkOf(k, t) < 25 && arm(k, t, sinkOf(k, t), lenOf(k, t)).some(([px, py, r]) => Math.hypot(px - x, py - y) < r + 3)) hit = k; });
          if (hit >= 0) {
            if (slash && t - slash.t0 < 0.3) continue;
            const pts = arm(hit, t, sinkOf(hit, t), lenOf(hit, t)), tp = pts[pts.length - 1];
            if (lenOf(hit, t) > 34) tips.push({ x: tp[0], y: tp[1], vx: hit ? 14 : -14, t0: t });
            splashes.push({ x, y, t0: t });
            slash = { dir: hit ? 1 : -1, t0: t }; hitAt[hit] = t; hits++;
            c.sound.hit('noise', 0.16, { cutoff: 3200, dur: 0.12 });
            c.sound.note(deg2(2 + hits), { dur: 0.12, vel: 0.2, wave: 'square', cutoff: 1600, at: 0.05 });
            if (hits >= 5) {
              hits = 0; retreatAt = t + 0.3; laughUntil = t + 2; squawkUntil = t + 1;
              c.sound.hit('noise', 0.2, { cutoff: 500, dur: 1, at: 0.3 });
              [9, 8, 7, 9, 11].forEach((k, i2) => c.sound.note(deg2(k), { dur: 0.16, vel: 0.24, wave: 'square', cutoff: 1200, at: 0.5 + i2 * 0.2 }));
            }
          } else if (t > laughUntil - 0.6) {
            laughUntil = t + 1.4;
            [9, 8, 7].forEach((k, i2) => c.sound.note(deg2(k), { dur: 0.16, vel: 0.26, wave: 'square', cutoff: 1200, at: i2 * 0.22 }));
          }
        }
      };
      // the King, drawn as a sprite of parts; his outline is the black every EGA sprite wore
      const mask = new Uint8Array(M * M), mcol = new Array(M * M);
      const mput = (x, y, h) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < M && y < M) { mask[y * M + x] = 1; mcol[y * M + x] = h; } };
      const flush = () => { for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) { const i = y * M + x; if (mask[i]) put(x, y, mcol[i]); else if ((x > 0 && mask[i - 1]) || (x < M - 1 && mask[i + 1]) || (y > 0 && mask[i - M]) || (y < M - 1 && mask[i + M])) put(x, y, K); } mask.fill(0); };
      const rect = (x0, y0, w, h, f) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) mput(x, y, typeof f === 'function' ? f(x, y) : f); };
      const JAW = { Oval: 0, 'Square Jaw': 1, Long: 0, Round: 1, Heart: -1, Gaunt: -1, 'Broad Jaw': 2 }[face] || 0, LONGF = face === 'Long' ? 1 : 0;
      function draw(t) {
        const st = Math.floor(t * 10), flash = ((t + 2.5) % 5.3) < 0.15, laugh = t < laughUntil && Math.floor(t * 8) % 2 === 0;
        const swing = slash && t - slash.t0 < 0.4 ? Math.min(3, Math.floor((t - slash.t0) / 0.1)) : -1;
        // the night sky in dithered bands down to the horizon, stars, the moon
        for (let y = 0; y < HOR; y++) for (let x = 0; x < M; x++) {
          let col = y < 8 ? K : y < 13 ? dth(x, y, K, NB) : y < 24 ? NB : y < 28 ? dth(x, y, NB, LB) : y < 30 ? dth(x, y, LB, LR) : dth(x, y, LR, YL);
          if (flash && y < 24) col = dth(x, y, LB, WH);
          put(x, y, col);
        }
        for (let k = 0; k < 18; k++) { const sx = Math.floor(lv[k % 8] * 997 * (k + 1)) % 64, sy = (k * 7 + 3) % 20; put(sx, sy, (st + k) % 9 === 0 ? LG : WH); }
        for (let y = 0; y < 18; y++) for (let x = 0; x < M; x++) { const d = Math.hypot(x + 0.5 - MOON[0], y + 0.5 - MOON[1]); if (d < 6) put(x, y, (x - MOON[0] - 1) ** 2 + (y - MOON[1] + 1) ** 2 < 3 || (x - MOON[0] + 2) ** 2 + (y - MOON[1] - 2) ** 2 < 2 ? LG : d > 5 ? dth(x, y, WH, LG) : WH); }
        // the sun just gone under, and its green flash
        for (let x = SUNX - 3; x <= SUNX + 3; x++) put(x, HOR - 1, YL);
        for (let x = SUNX - 2; x <= SUNX + 2; x++) put(x, HOR - 2, (st % 6) < 3 ? LGN : GR);
        put(SUNX, HOR - 3, LGN);
        // the distant ship on the horizon
        for (let x = SHIPX; x < SHIPX + 7; x++) put(x, HOR - 1, K);
        for (let y = HOR - 7; y < HOR - 1; y++) put(SHIPX + 3, y, K);
        for (let y = HOR - 6; y < HOR - 2; y++) for (let x = SHIPX + 4; x < SHIPX + 4 + (HOR - 2 - y); x++) put(x, y, DG);
        // the sea: dark water, wave glints, the moon's road across it; a whirlpool when the kraken goes under
        const wr = t - retreatAt, whirl = wr > 0 && wr < 4 ? (wr < 0.4 ? wr / 0.4 : wr > 3.3 ? (4 - wr) / 0.7 : 1) : 0;
        for (let y = HOR; y < 46; y++) for (let x = 0; x < M; x++) {
          let col = (y + Math.floor(x / 3) + st) % 7 === 0 ? CY : NB;
          if (Math.abs(x + 0.5 - MOON[0] - Math.sin(y * 1.7 + t * 3) * 1.5) < 2 - (y - HOR) * 0.04 && (x + y + st) % 3 === 0) col = WH;
          // the whirlpools the arms go down into: wide spirals of three blues across the water
          if (whirl) for (const wcx of [12, 52]) { const wx = x + 0.5 - wcx, wy = (y + 0.5 - 36) * 2.4, d = Math.hypot(wx, wy), a = Math.atan2(wy, wx); if (d < 17 * whirl + 2) { const sp = Math.sin(a * 2 + d * 0.6 - t * 12); col = d < 3 ? K : sp > 0.45 ? LC : sp > -0.3 ? LB : NB; } }
          put(x, y, col);
        }
        // the kraken's arms, behind the rail: magenta, suckers along their inner side, red where cut
        for (const k of [0, 1]) {
          const hurt = t - hitAt[k] < 0.3, dir = k ? -1 : 1, pts = arm(k, t, sinkOf(k, t), lenOf(k, t));
          for (const [x, y, r, a] of pts) for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) {
            if (yy > 45 || Math.hypot(xx + 0.5 - x, yy + 0.5 - y) > r) continue;
            const side = ((xx + 0.5 - x) * -Math.sin(a) + (yy + 0.5 - y) * Math.cos(a)) * dir;
            mput(xx, yy, hurt ? LR : side < -r * 0.4 ? LM : side > r * 0.45 ? dth(xx, yy, MG, K) : MG);
          }
          pts.forEach(([x, y, r, a], i) => { if (i % 5 || i < 3 || r < 1.3 || y > 45) return; mput(x + Math.sin(a) * dir * r * 0.55, y - Math.cos(a) * dir * r * 0.55, hurt ? WH : LM); });
        }
        for (let i = tips.length - 1; i >= 0; i--) { const tp = tips[i], u = t - tp.t0; if (u > 1.1) { tips.splice(i, 1); continue; } const x = tp.x + tp.vx * u, y = tp.y - 10 * u + 26 * u * u, a = u * 9; for (let q = 0; q < 5; q++) mput(x + Math.cos(a) * (q - 2), y + Math.sin(a) * (q - 2), q === 0 ? LR : MG); }
        flush();
        // the deck: planks, the rail and its posts in front of the sea, a mast at one side
        for (let y = 46; y < M; y++) for (let x = 0; x < M; x++) put(x, y, (y - 46) % 4 === 3 ? K : (x + (y >> 2) * 5) % 16 === 0 ? K : (x + y) % 9 === 0 ? dth(x, y, BR, RD) : BR);
        for (let x = 0; x < M; x++) { put(x, 40, YL); put(x, 41, BR); put(x, 42, K); }
        for (let x = 2; x < M; x += 7) for (let y = 42; y < 46; y++) { put(x, y, BR); put(x + 1, y, K); }
        const mastX = SUNX < 32 ? 59 : 3;
        for (let y = 0; y < 46; y++) { put(mastX, y, BR); put(mastX + 1, y, dth(mastX, y, BR, K)); }
        // the King: boots, breeches, a long red frock coat with gold trim, the white of his shirt and a sash
        rect(26, 56, 4, 5, (x, y) => y === 56 ? DG : K); rect(33, 55, 4, 6, (x, y) => y === 55 ? DG : K);
        rect(27, 49, 3, 7, (x, y) => dth(x, y, LG, WH)); rect(33, 49, 3, 6, (x, y) => LG);
        for (let y = 26; y < 54; y++) { const w = 6 + (y - 26) * 0.18; for (let x = Math.round(31.5 - w); x <= Math.round(31.5 + w); x++) { const px = x - 31.5; let col = px < -3 ? LR : RD; if (Math.abs(Math.abs(px) - w) < 1) col = YL; if (Math.abs(px) < 2.2 && y < 46) col = (y & 1) ? WH : LG; if (y >= 40 && y <= 41 && Math.abs(px) < 6) col = y === 40 ? LB : NB; if (Math.abs(Math.abs(px) - 2.8) < 0.6 && y % 3 === 0 && y < 46) col = YL; if (y > 46 && Math.abs(px) < 1.6) continue; mput(x, y, col); } }
        // his left hand on his hip; his right arm up with the cutlass (it swings when he cuts)
        rect(37, 33, 3, 7, (x, y) => (x + y) % 3 ? RD : LR); rect(36, 39, 3, 2, SKA);
        const raise = swing < 0 ? 0 : [1, 2, 1, 0][swing] * (slash ? slash.dir : 1);
        const hand = [21 + raise * 2, 15 + Math.abs(raise)];
        for (let k = 0; k <= 10; k++) { const f = k / 10, x = 26 + (hand[0] - 26) * f, y = 27 + (hand[1] - 27) * f; mput(x, y, f > 0.85 ? SKA : (k & 1) ? RD : LR); mput(x + 1, y, f > 0.85 ? SKB : RD); }
        const ba = -Math.PI / 2 - 0.5 + raise * 0.45;
        for (let k = 1; k <= 13; k++) { const x = hand[0] + Math.cos(ba) * k, y = hand[1] + Math.sin(ba) * k; mput(x, y, k > 11 ? WH : (k & 1) ? WH : LG); mput(x + 1, y, LG); }
        for (let k = -2; k <= 2; k++) mput(hand[0] + k, hand[1] + 1, YL);
        mput(hand[0], hand[1] + 2, RD);
        // the head, three-quarters on and half as big again so it holds at a glance: the jaw by his face, a nose by
        // its kind out over his cheek
        const HX = 31, HY = 13 + LONGF;
        for (let y = HY; y < HY + 15 + LONGF; y++) { const r = y - HY, w = r < 2 ? 5 : r < 11 ? 7 : 6 + Math.max(-1, Math.min(1, JAW)) - (r > 13 ? 1 : 0); for (let x = HX - w; x <= HX + w; x++) mput(x, y, x > HX + 3 ? SKB : x < HX - 3 ? SKA : dth(x, y, SKA, SKB)); }
        const NOSE = { Straight: [[8, 5], [8, 6], [8, 7], [9, 8], [8, 8]], Button: [[8, 8], [9, 8], [8, 7]], Hooked: [[8, 4], [9, 5], [10, 6], [10, 7], [9, 8], [8, 8]], Broad: [[8, 6], [8, 7], [9, 7], [9, 8], [8, 8], [10, 8]], Crooked: [[8, 5], [9, 6], [8, 7], [9, 8], [10, 8]], Bulbous: [[8, 6], [9, 6], [8, 7], [9, 7], [10, 7], [8, 8], [9, 8], [10, 8]] }[nose] || [[8, 7], [8, 8]];
        for (const [a, b] of NOSE) mput(HX + a - 1, HY + b, SKA);
        // the hair, as rolled: falling long behind, braided, tied back, wild or cropped
        if (hairDo === 'Long' || hairDo === 'Wild') for (let y = HY; y < HY + (hairDo === 'Long' ? 20 : 12); y++) for (let k = 0; k < (hairDo === 'Wild' ? 4 + (y & 1) : 3); k++) mput(HX - 8 - k, y, (y + k) & 1 ? HA : HB);
        if (hairDo === 'Braids') for (let y = HY + 2; y < HY + 20; y++) { mput(HX - 8 + ((y >> 1) & 1), y, y % 4 === 0 ? YL : HA); mput(HX - 7 + ((y >> 1) & 1), y, HB); }
        if (hairDo === 'Ponytail') for (let k = 0; k < 12; k++) { mput(HX - 8 - Math.round(k * 0.4), HY + 4 + k, k === 0 ? RD : HA); mput(HX - 7 - Math.round(k * 0.4), HY + 4 + k, HB); }
        if (hairDo === 'Short') for (let y = HY + 1; y < HY + 8; y++) mput(HX - 7, y, HA);
        // the eyepatch over his far eye, its strap across; the near eye bright under a brow of its kind; a scar
        for (let y = HY + 4; y < HY + 8; y++) for (let x = HX + 3; x < HX + 7; x++) mput(x, y, K);
        for (let x = HX - 7; x < HX + 3; x++) mput(x, HY + 3 + (x < HX - 1 ? 0 : 1), K);
        for (let y = HY + 5; y < HY + 8; y++) for (let x = HX - 4; x < HX - 1; x++) mput(x, y, WH);
        mput(HX - 2, HY + 6, K); mput(HX - 2, HY + 7, K); mput(HX - 3, HY + 7, LB);
        const BROW = { Heavy: [[-5, 4], [-4, 4], [-3, 4], [-2, 4], [-1, 4], [-5, 3], [-4, 3]], Arched: [[-5, 4], [-4, 3], [-3, 3], [-2, 3], [-1, 4]], Furrowed: [[-5, 3], [-4, 3], [-3, 4], [-2, 4], [-1, 4]], Raised: [[-5, 2], [-4, 2], [-3, 2], [-2, 2]], Thin: [[-4, 4], [-3, 4], [-2, 4]] }[brows] || [[-4, 4], [-3, 4]];
        for (const [a, b] of BROW) mput(HX + a, HY + b, HB === K ? DG : HB);
        if (marks === 'Cheek Scar') { mput(HX - 6, HY + 8, RD); mput(HX - 5, HY + 9, RD); mput(HX - 6, HY + 10, RD); mput(HX - 5, HY + 11, RD); }
        // the braided beard, gold rings on its braids, the mouth in it with its gold tooth
        for (let y = HY + 10; y < HY + 16; y++) for (let x = HX - 6 - (JAW > 0 ? 1 : 0); x <= HX + 6; x++) mput(x, y, (x + y) & 1 ? HA : HB);
        for (const bx of [HX - 4, HX + 2]) for (let y = HY + 16; y < HY + 27; y++) { mput(bx + ((y >> 1) & 1), y, y % 3 === 0 ? YL : (y & 1) ? HA : HB); mput(bx + 1 + ((y >> 1) & 1), y, HB); }
        for (let x = HX - 3; x <= HX + 3; x++) mput(x, HY + 12, laugh ? RD : K);
        if (laugh) for (let x = HX - 3; x <= HX + 3; x++) mput(x, HY + 13, RD);
        mput(HX + 1, HY + 12, YL); mput(HX + 2, HY + 12, YL);
        // the bicorne, gold-edged, a crown upon it and a white plume
        for (let y = HY - 9; y < HY; y++) { const w = y < HY - 5 ? 6 + (y - HY + 9) * 2 : 15; for (let x = HX - w; x <= HX + w; x++) mput(x, y, y === HY - 1 || Math.abs(x - HX) === w ? YL : (x + y) % 5 === 0 ? DG : K); }
        for (let x = HX - 4; x <= HX + 4; x++) { mput(x, HY - 11, x % 2 ? YL : BR); mput(x, HY - 10, YL); if ((x - HX) % 4 === 0) { mput(x, HY - 12, YL); mput(x, HY - 13, YL); } }
        mput(HX - 2, HY - 11, RD); mput(HX, HY - 11, LB); mput(HX + 2, HY - 11, RD);
        const pw = Math.round(Math.sin(t * 2.4));
        for (let k = 0; k < 10; k++) { mput(HX - 14 + k + pw * (k >> 2), HY - 10 - Math.round(Math.sin(k * 0.36) * 3), k < 8 ? WH : LG); mput(HX - 14 + k + pw * (k >> 2), HY - 9 - Math.round(Math.sin(k * 0.36) * 3), LG); }
        // the parrot on his shoulder
        const pb = t < squawkUntil ? (Math.floor(t * 10) & 1) : (Math.floor(t * 1.3) & 1);
        ['.rr.', 'rrrk', 'rryr', '.rgg', '.rgg', '.gbb', '..b.'].forEach((row, j) => { for (let i = 0; i < 4; i++) if (row[i] !== '.') mput(PARROT[0] + i, PARROT[1] + j - pb, { r: LR, k: K, y: YL, g: LGN, b: LB }[row[i]]); });
        flush();
        // the cut: a white arc of the blade's sweep, and the kraken's ink splashing green
        if (swing >= 0) for (let k = 0; k < 7; k++) { const a = ba - raise * 0.3 * k * 0.3 - k * 0.12 * (slash.dir), r = 12 + (k & 1); put(hand[0] + Math.cos(a) * r, hand[1] + Math.sin(a) * r, k < 3 ? WH : LC); }
        for (let i = splashes.length - 1; i >= 0; i--) { const sp2 = splashes[i], u = t - sp2.t0; if (u > 0.7) { splashes.splice(i, 1); continue; } for (let q = 0; q < 8; q++) { const a = q * 0.785, r = u * 9; put(sp2.x + Math.cos(a) * r, sp2.y + Math.sin(a) * r * 0.7 + u * u * 8, q & 1 ? GR : LGN); } }
        // what he says, in the game's yellow
        if (t < laughUntil) say(t - retreatAt < 2.4 && t - retreatAt > 0 ? 'BEGONE!' : 'HAR HAR!', 32, 2, YL);
        else if (t < squawkUntil) say('SQUAWK!', 44, 13, LGN);
      }
      let last = '';
      const frame = t => {
        const key = String(Math.floor(t * 10));
        if (key === last) return;
        last = key;
        draw(t);
        cx2.putImageData(img, 0, 0);
        g.imageSmoothingEnabled = false;
        g.fillStyle = K; g.fillRect(0, 0, S, S);
        g.drawImage(can, 0, 0, M, M, of, of, M * cel, M * cel);
      };
      frame(0);
      return t => { feel(t); frame(t); };
    }

    // ---------- the legendaries: each its own 1/1 scene on the same 32-cell grid, flat colour and heavy outlines ----------
    function legendRogue() {
      const cel = Math.max(1, Math.floor(S / N)), of = Math.floor((S - cel * N) / 2), sp = Math.ceil(of / cel) + 1, W = N + 2 * sp;
      const g = c.ctx;
      const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const th = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
      const hv = (x, y, k) => { let h = Math.imul(x + 97, 0x9e3779b1) ^ Math.imul(y + 61, 0x85ebca6b) ^ Math.imul(k + 7, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
      const lv = [];
      for (let i = 0; i < 16; i++) lv.push(taus());
      const INK = '#0e0a12';
      const buf = new Array(W * W).fill(INK), fig = new Array(W * W).fill(null);
      const idx = (x, y) => (y + sp) * W + x + sp;
      const inB = (x, y) => x >= -sp && y >= -sp && x < N + sp && y < N + sp;
      const put = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (inB(x, y)) buf[idx(x, y)] = col; };
      // the figure layer: whatever is drawn here gets the heavy black outline round it
      const fput = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) fig[idx(x, y)] = col; };
      const fget = (x, y) => inB(x, y) ? fig[idx(x, y)] : null;
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      const each = f => { for (let y = -sp; y < N + sp; y++) for (let x = -sp; x < N + sp; x++) f(x, y); };
      // lay the figure over the background with its outline
      const stampFig = () => {
        each((x, y) => {
          const v = fig[idx(x, y)];
          if (v) buf[idx(x, y)] = v;
          else if (fget(x - 1, y) || fget(x + 1, y) || fget(x, y - 1) || fget(x, y + 1)) buf[idx(x, y)] = INK;
        });
        fig.fill(null);
      };
      const rows = (map, x0, y0, pal, f = fput) => map.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') f(x0 + i, y0 + j, pal[r[i]]); });
      // only the cells that changed since the last frame are painted again, in runs of one colour
      const shown = new Array(W * W).fill('');
      const paint = () => {
        for (let Y = 0; Y < W; Y++) for (let X = 0; X < W;) {
          const i = Y * W + X, col = buf[i];
          if (shown[i] === col) { X++; continue; }
          let e = X + 1;
          while (e < W && buf[Y * W + e] === col && shown[Y * W + e] !== col) e++;
          for (let k = X; k < e; k++) shown[Y * W + k] = col;
          g.fillStyle = col; g.fillRect(of + (X - sp) * cel, of + (Y - sp) * cel, (e - X) * cel, cel);
          X = e;
        }
      };
      const tapsNow = () => c.input.taps().map(p => [Math.floor((p.x * S - of) / cel), Math.floor((p.y * S - of) / cel)]);
      // the pointer in grid cells (only the large view has one; tiles get a still one that is never inside)
      const ptr = () => { const i = c.input; return { x: (i.x * S - of) / cel, y: (i.y * S - of) / cel, in: i.inside, down: i.inside && i.down }; };
      // a tap that is only a tap: the gallery sends one on every press, so for the toys that also hold or drag, a tap
      // counts on a short, still release (or a press and release inside one frame)
      let pressT = -1, pressP = null, pressMoved = 0;
      const pressNow = t => {
        const p = ptr(), click = [], down = tapsNow();
        if (down.length) { if (p.down) { pressT = t; pressP = down[down.length - 1]; pressMoved = 0; } else click.push(...down); }
        if (pressT >= 0) {
          if (p.down) pressMoved = Math.max(pressMoved, Math.hypot(p.x - pressP[0] - 0.5, p.y - pressP[1] - 0.5));
          else { if (t - pressT < 0.35 && pressMoved < 1.6) click.push(pressP); pressT = -1; }
        }
        return { down, click };
      };
      const tonic = 50 + parseInt(c.hash.slice(-6, -2), 16) % 9, DOR = [0, 2, 3, 5, 7, 9, 10];
      const deg = k => tonic + 12 * Math.floor(k / 7) + DOR[((k % 7) + 7) % 7];
      const scene = gold ? goldScene() : merScene();
      let tick = -1;
      const show = t => {
        const q = Math.floor(t * 10);
        if (q === tick) return;
        tick = q;
        scene.draw(q / 10);
        paint();
      };
      show(0);
      return t => { scene.feel(t); show(t); };

      // ----- Cursed Gold: a captain gone to gold bone, grinning on his hoard in a sea cave, ghost-fire in his eyes.
      // Drag a coin off his hoard if you dare: his eyes follow it, and take it too far and his bony hand comes for it -----
      function goldScene() {
        const GOLDS = ['#4a2c06', '#8a5a0c', '#c88a14', '#f0b828', '#ffe070', '#fff8c8'];
        const GHOST = lv[0] < 0.7 ? ['#0a3a2a', '#1a8a5a', '#3af0a0', '#c0ffe0'] : ['#1a1a4a', '#3a3aaa', '#6a8aff', '#d0e0ff'];
        const ANGRY = ['#3a0a0a', '#a01a10', '#ff4a2a', '#ffd0a0'];
        const coinsFly = [];
        let laughUntil = -1, coin = null, grab = null, lastT = 0, rage = 0;
        // the hoard: a mound of coins piled at both sides and low in front of him
        const mound = x => 28 - Math.round(Math.max(0, (Math.abs(x + 0.5 - 16) - 7) * 0.7) + Math.sin(x * 1.3) * 0.6);
        const onHoard = (x, y) => y >= mound(x) - 1;
        const laugh = t => { laughUntil = t + 1.1; [9, 8, 7].forEach((k, i) => c.sound.note(deg(k), { dur: 0.14, vel: 0.18, wave: 'sawtooth', cutoff: 900, at: i * 0.18 })); };
        return {
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr();
            for (const [x, y] of tapsNow()) {
              if (x < 0 || y < 0 || x >= N || y >= N || grab) continue;
              if (onHoard(x, y)) {
                // a coin comes up off the pile in your fingers
                coin = { x: p.x, y: p.y };
                c.sound.hit('click', 0.25); c.sound.note(deg(14), { dur: 0.25, vel: 0.14, wave: 'triangle', at: 0.02 });
              } else laugh(t);
            }
            if (coin) {
              coin.x = p.x; coin.y = p.y;
              // the further it goes from the hoard, the angrier the fire in his eyes
              rage = Math.max(0, Math.min(1, (mound(Math.floor(coin.x)) - coin.y - 3) / 12));
              if (!p.down) {
                // let go: it falls back onto the pile
                coinsFly.push({ x: Math.round(coin.x), y: Math.round(coin.y), vx: 0, t0: t, back: true });
                coin = null; c.sound.hit('click', 0.2, { at: 0.3 });
              } else if (rage >= 1 && !grab) {
                // too far: the hand lunges for it
                grab = { x: coin.x, y: coin.y, t0: t };
                c.sound.hit('noise', 0.12, { cutoff: 1400, dur: 0.25 });
              }
            } else rage = Math.max(0, rage - dt * 0.8);
            if (grab && t - grab.t0 > 0.3 && coin) {
              // snatched: the coin goes back to the hoard and he laughs at you
              coin = null; coinsFly.push({ x: Math.round(grab.x), y: Math.round(grab.y), vx: grab.x < 16 ? 1 : -1, t0: t, back: true });
              laugh(t);
            }
            if (grab && t - grab.t0 > 1.0) grab = null;
          },
          draw: t => {
            const fl = Math.sin(t * 7) * 0.5 + Math.sin(t * 11.3) * 0.5, chatter = (t < laughUntil || rage > 0.5) ? Math.floor(t * (rage > 0.5 ? 14 : 8)) % 2 : 0;
            const EYE = rage > 0.4 ? ANGRY : GHOST;
            // the cave: rock, a shaft of moonlight from the mouth above, ghost-fire glowing low at both sides
            each((x, y) => {
              let col = (x * 7 + y * 13) % 11 < 2 ? '#18202a' : y < 4 ? '#0c1018' : '#10161e';
              if (Math.abs(x - 24 + y * 0.45) < 3.6 && y < 24) col = th(x, y) < 0.55 ? '#3a5064' : '#26343e';
              for (const fx of [3, 28]) { const d = Math.hypot(x - fx, (y - 20) * 0.8); if (d < 6 + fl + rage * 2 && th(x, y) < 0.7 - d / 10) col = EYE[0]; }
              put(x, y, col);
            });
            // ghost-fire in braziers at both sides, burning red when he's angry
            for (const fx of [3, 28]) {
              rows(['k...k', 'kkkkk', '.kkk.'], fx - 2, 22, { k: '#2a2a30' });
              const h = 3 + Math.round(fl + 1 + rage * 3);
              for (let k = 0; k < h; k++) { put(fx, 21 - k, EYE[k < 1 ? 3 : k < 3 ? 2 : 1]); if (k < h - 1) { put(fx - 1, 21 - k + (k % 2), EYE[1]); put(fx + 1, 21 - k + ((k + 1) % 2), EYE[k < 2 ? 2 : 1]); } }
            }
            // the tricorn, with a skull and bones on its front
            const HAT = ['.....kkkkkkkk.....', '..kkkhhhhhhhhkkk..', '.kHhhhhhwwhhhhhHk.', 'kHhhhhhwhhwhhhhhHk', 'kyHhhhhhwwhhhhhHyk', '.kyyhhhwhhwhhhyyk.', '..kkyyyyyyyyyykk..'];
            rows(HAT, 7, 1, { k: INK, h: '#1a1e3a', H: '#3a4270', w: '#f4ecd0', y: GOLDS[4] });
            // the skull: a rounded cranium, deep sockets, cheekbones, a long jaw of teeth that chatters
            for (let y = 8; y < 22; y++) for (let x = 7; x < 25; x++) {
              const crown = inE(x, y, 16, 12.6, 7.2, 5.2), jaw = y >= 16 && y <= 19 + chatter && Math.abs(x + 0.5 - 16) < 5 - (y - 16) * 0.3;
              if (!crown && !jaw) continue;
              const px = x + 0.5 - 16, lit = -px * 0.13 - (y - 11) * 0.2;
              fput(x, y, GOLDS[lit > 0.7 ? 5 : lit > 0.1 ? 4 : lit > -0.6 ? 3 : 2]);
            }
            fput(15, 14, INK); fput(16, 14, INK); fput(15, 15, GOLDS[1]); fput(16, 15, GOLDS[1]);
            // the sockets, the ghost-fire in them watching the coin
            const look = coin ? [Math.max(-1, Math.min(1, Math.round((coin.x - 16) / 6))), coin.y < 9 ? -1 : 0] : [0, 0];
            for (const ex of [10, 18]) {
              rows(['.kkkk.', 'kkkkkk', 'kkkkkk', '.kk.k.'], ex - 1, 10, { k: '#120a04' });
              const glow = (Math.floor(t * 3) + ex) % 4 ? EYE[2] : EYE[3];
              fput(ex + 1 + look[0], 11 + look[1] + 1, glow); fput(ex + 2 + look[0], 11 + look[1] + 1, EYE[1]); fput(ex + 1 + look[0], 12 + look[1] + 1, EYE[1]);
            }
            for (let x = 12; x <= 19; x++) { fput(x, 17 + chatter, x % 2 ? GOLDS[5] : GOLDS[4]); fput(x, 18 + chatter, x % 2 ? GOLDS[4] : GOLDS[3]); }
            for (let x = 12; x <= 19; x++) fput(x, 16 + chatter, '#120a04');
            if (chatter) for (let x = 12; x <= 19; x++) fput(x, 17, '#120a04');
            fput(8, 15, GOLDS[4]); fput(8, 16, GOLDS[2]);
            fput(20, 9, GOLDS[1]); fput(21, 10, GOLDS[1]);
            // the coat: a tattered collar either side, collarbones and the gold of the ribs
            for (let y = 21; y < N; y++) for (let x = 2; x < 30; x++) {
              const half = 7 + (y - 21) * 1.5;
              if (Math.abs(x + 0.5 - 16) > half) continue;
              const inner = Math.abs(x + 0.5 - 16) < 3.6 - (y - 21) * 0.1;
              fput(x, y, inner ? (y % 2 ? GOLDS[3] : GOLDS[1]) : (x + y) % 5 === 0 ? '#3a1018' : x < 16 ? '#6a1a24' : '#4a1018');
            }
            for (let x = 9; x <= 22; x++) if (Math.abs(x + 0.5 - 16) > 2) fput(x, 22 - (Math.abs(x + 0.5 - 16) < 5 ? 0 : 1), GOLDS[4]);
            stampFig();
            // the hoard in front of him, sparkling, a dent where your coin came from
            for (let x = -sp; x < N + sp; x++) for (let y = mound(x); y < N + sp; y++) {
              const r = hv(x, y, 3);
              let col = r < 0.12 ? GOLDS[1] : r < 0.5 ? GOLDS[3] : r < 0.85 ? GOLDS[4] : GOLDS[2];
              if (y === mound(x)) col = GOLDS[5];
              if ((x * 5 + y * 3 + Math.floor(t * 4)) % 23 === 0) col = '#ffffff';
              put(x, y, col);
            }
            rows(['kkkkk', 'k343k', '.k3k.', '..k..', '.k3k.'], 3, 17, { k: INK, 3: GOLDS[3], 4: GOLDS[5] }, put);
            put(26, 21, '#e0203a'); put(27, 21, '#ff6a7a'); put(26, 22, '#a01028');
            for (let k = 0; k < 6; k++) put(19 + k, 28 + (k % 3 === 1 ? 1 : 0) - (k > 3 ? 1 : 0), '#f4f0e6');
            // the bony hand lunging up out of the hoard for the coin
            if (grab) {
              const e = Math.max(0, t - grab.t0), u = Math.min(1, e / 0.3), back = e > 0.6 ? Math.min(1, (e - 0.6) / 0.4) : 0, reach = u * (1 - back);
              const sx = grab.x < 16 ? -1 : 32, sy = 22, hx = sx + (grab.x - sx) * reach, hy = sy + (grab.y - sy) * reach;
              // a bone arm, dark-edged so it reads against the gold, with a claw of fingers
              for (const [w, col] of [[1, INK], [0, null]]) for (let k = 0; k <= 16; k++) {
                const f = k / 16, x = sx + (hx - sx) * f, y = sy + (hy - sy) * f;
                if (w) { put(x, y - 1, INK); put(x, y + 1, INK); put(x + 1, y + 1, INK); } else { put(x, y, k % 4 === 0 ? GOLDS[3] : '#f4e8c8'); put(x + 1, y, '#d8c8a0'); }
              }
              for (const [a, b] of [[-1, -1], [-1, -2], [1, -2], [1, -3], [2, -1], [3, -2], [-2, 0]]) put(hx + a, hy + b, '#f4e8c8');
            }
            // the coin in your fingers, and the doubloons on their way back to the pile
            if (coin) { const x = Math.round(coin.x), y = Math.round(coin.y), sp2 = Math.floor(t * 10) % 3; put(x, y, sp2 === 1 ? '#fff0a0' : GOLDS[4]); if (sp2 !== 1) { put(x + 1, y, GOLDS[2]); put(x, y + 1, GOLDS[2]); put(x + 1, y + 1, GOLDS[1]); } }
            for (let i = coinsFly.length - 1; i >= 0; i--) {
              const c0 = coinsFly[i], u = t - c0.t0;
              if (u > 0.8) { coinsFly.splice(i, 1); continue; }
              const x = Math.round(c0.x + c0.vx * u * 4), y = Math.round(c0.y - 4 * u + 26 * u * u), spin = Math.floor(u * 10) % 3;
              if (y < mound(x)) { put(x, y, spin === 1 ? '#fff0a0' : GOLDS[4]); if (spin !== 1) { put(x + 1, y, GOLDS[2]); put(x, y + 1, GOLDS[2]); } }
            }
          },
        };
      }

      // ----- Merfolk: one of the sea's own, under the waves, hair streaming, a trident and a coral crown.
      // Drag through the water and the current takes the hair, the kelp and the fish; touch the trident to call the fish -----
      function merScene() {
        const HAIRS = [['#0a2a16', '#1a5a2c', '#3a8a40', '#6ab858'], ['#3a0810', '#8a1a2a', '#d0403e', '#ff8a6a'], ['#1e0a3a', '#4a2a8a', '#7a5ac8', '#b89aff']];
        const HAIR = HAIRS[Math.floor(lv[1] * 3)];
        const SKIN = ['#145a4c', '#2a8a74', '#4cc0a4', '#9aeccc'];
        const FIN = lv[2] < 0.5 ? ['#6a2a7a', '#b05ac0', '#e8a0f0'] : ['#8a3a1a', '#e07a3a', '#ffc080'];
        const IRIS = lv[3] < 0.5 ? '#ffd040' : '#b0f0ff';
        const WATER = ['#06142e', '#0a2850', '#104476', '#18689a', '#2a92b8'];
        const fish = [0, 1, 2, 3, 4, 5, 6, 7].map(k => [hv(k, 1, 5) * 10, hv(k, 2, 5) * 4]);
        const FRONT = k => k >= 5; // these three cross in front, low down
        const motes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => [hv(k, 7, 5) * 36 - 2, hv(k, 8, 5) * 30 + 1]);
        const bubbles = [0, 1, 2, 3, 4, 5].map(k => [hv(k, 3, 5) * 32, hv(k, 4, 5) * 40, 0.6 + hv(k, 5, 5)]);
        let cur = 0, lastT = 0, lastX = null, callAt = -9, swirl = 0;
        const popped = bubbles.map(() => -9);
        // where a fish is: on its way across, or pushed away from your finger, or circling when called
        const FISH = fish.map(() => ({ x: 40, y: 6 }));
        const fishGoal = (k, t) => {
          const [fx, fy] = fish[k];
          // called: they come and circle round her and the trident, in front
          if (t - callAt < 3.6) { const a = t * 2.2 + k * 0.785; return [16 + Math.cos(a) * 13, 13 + Math.sin(a) * 10]; }
          return FRONT(k) ? [36 - ((t * 4 + fx * 4 + k * 13) % 44), 22 + fy * 1.5 + Math.sin(t * 2 + fx) * 0.6] : [36 - ((t * 3 + fx * 3) % 44), 4 + fy + Math.sin(t * 2 + fx) * 0.6];
        };
        const fishAt = (f, k, t, gold) => {
          const x = Math.round(f.x), y = Math.round(f.y), dir = gold ? (Math.sin(t * 2.2 + k * 0.785) > 0 ? -1 : 1) : -1;
          const B1 = gold ? '#ffd040' : FRONT(k) ? '#ff8a3a' : '#5ab0d0', B2 = gold ? '#c88a10' : FRONT(k) ? '#c84a1a' : '#3a90b8';
          put(x, y, B1); put(x - dir, y, B1); put(x, y + 1, B2); put(x - dir, y + 1, B2); put(x + dir, y, '#0a1a2a');
          put(x - 2 * dir, y - (Math.floor(t * 6 + k) % 2), B2); put(x - 2 * dir, y + 1, B2);
        };
        return {
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr();
            for (const [x, y] of pressNow(t).click) {
              if (x >= 23 && x <= 29 && y <= 9) {
                // the trident crackles and the fish come to it, circling
                callAt = t;
                [0, 4, 7, 9, 11].forEach((k, i) => c.sound.note(deg(k + 7), { dur: 0.9, vel: 0.1, wave: 'sine', at: i * 0.08 }));
              }
            }
            // dragging stirs a current that the hair and the kelp follow
            if (p.down && lastX !== null && dt > 0) cur += (Math.max(-30, Math.min(30, (p.x - lastX) / dt)) * 0.12 - cur) * Math.min(1, dt * 6);
            else cur *= Math.max(0, 1 - dt * 1.6);
            lastX = p.down ? p.x : null;
            swirl = Math.max(-4, Math.min(4, cur));
            FISH.forEach((f, k) => {
              let [gx, gy] = fishGoal(k, t);
              if (p.in) { const d = Math.hypot(gx - p.x, gy - p.y); if (d < 7) { gx += (gx - p.x) / (d + 0.1) * (7 - d); gy += (gy - p.y) / (d + 0.1) * (7 - d); } }
              gx += swirl * 1.5;
              const jump = Math.abs(gx - f.x) > 20;
              f.x = jump ? gx : f.x + (gx - f.x) * Math.min(1, dt * 6); f.y = jump ? gy : f.y + (gy - f.y) * Math.min(1, dt * 6);
            });
            // a bubble you touch pops
            if (p.in) bubbles.forEach((b, i) => {
              const y = N + 4 - ((b[1] + t * b[2] * 4) % (N + 8)), x = b[0] + Math.sin(t * 2 + b[1]) * 0.7;
              if (t - popped[i] > 2 && Math.hypot(x + 0.5 - p.x, y + 0.5 - p.y) < 2) { popped[i] = t; c.sound.hit('blip', 0.12, { freq: 1400 + i * 120 }); }
            });
          },
          draw: t => {
            const dv = 0, called = t - callAt < 3.6;
            // deep water, lighter towards the surface, light rays wavering down, kelp at both sides
            each((x, y) => {
              let k = Math.max(0, Math.min(4, Math.floor(4.4 - (y + 2) / 8 + th(x, y) * 0.9)));
              if (Math.sin((x - y * 0.35) * 0.5 + t * 0.6) + Math.sin((x + y * 0.2) * 0.23 - t * 0.4) > 1.35 && y < 26) k = Math.min(4, k + 1);
              let col = WATER[k];
              if (y <= 0 && (x + Math.floor(t * 5)) % 5 < 2) col = '#9ae0f0';
              put(x, y, col);
            });
            for (const [kx, ph] of [[1, 0], [3, 1.4], [30, 2.2]]) for (let y = 6; y < N + sp; y++) {
              const sw = Math.round(Math.sin(t * 1.1 + ph + y * 0.3) * (N - y) * 0.06 + swirl * (N - y) * 0.13);
              put(kx + sw, y, (y + kx) % 4 ? '#1a4a24' : '#2a6a30');
              if (y % 4 === kx % 4) put(kx + sw + 1, y, '#3a7a3a');
            }
            // a little school of fish slipping past behind
            FISH.forEach((f, k) => { if (!called && !FRONT(k)) fishAt(f, k, t, false); });
            // drifting motes in the water: they stream with the current you stir
            for (const [mx, my] of motes) {
              const x = Math.round(((mx + t * (0.6 + swirl * 4) + 400) % 36) - 2), y = Math.round(my + Math.sin(t + mx) * 0.8);
              put(x, y, '#8ad8f0'); if (Math.abs(swirl) > 0.6) { put(x - Math.sign(swirl), y, '#4aa0c8'); if (Math.abs(swirl) > 2) put(x - 2 * Math.sign(swirl), y, '#2a78a8'); }
            }
            const Y = dv;
            // the hair, streaming and waving behind
            for (let y = 5; y < N; y++) {
              const hw = y < 12 ? 6.5 + (y - 5) * 0.45 : y < 22 ? 9.6 + (y - 12) * 0.12 : 10.8 - (y - 22) * 0.5;
              const wave = Math.sin(t * 1.6 - y * 0.4) * Math.max(0, y - 9) * 0.09 + swirl * Math.max(0, y - 9) * 0.14;
              for (let x = 0; x < N; x++) {
                const px = x + 0.5 - 16 - wave;
                if (Math.abs(px) > hw) continue;
                const strand = Math.floor(px * 0.9 + Math.sin(y * 0.5 - t) * 0.6) % 3;
                fput(x, y + Y, HAIR[Math.abs(px) > hw - 1 ? 0 : strand === 0 ? 1 : strand === 1 ? 2 : 1]);
              }
            }
            // shoulders and a scaled top, a shell necklace
            for (let y = 21; y < N; y++) for (let x = 3; x < 29; x++) {
              const half = 4 + (y - 21) * 1.6;
              if (Math.abs(x + 0.5 - 16) > Math.min(12, half)) continue;
              const chest = y >= 25 && Math.abs(x + 0.5 - 16) < 7;
              fput(x, y + Y, chest ? (((x + (y % 2)) % 2) ? FIN[1] : FIN[0]) : SKIN[x < 16 ? 2 : 1]);
            }
            for (let x = 11; x <= 20; x++) fput(x, 24 + Y + (Math.abs(x + 0.5 - 16) < 2 ? 1 : 0), '#f4ecd8');
            fput(15, 26 + Y, '#ffd8e8'); fput(16, 26 + Y, '#ffd8e8'); fput(15, 27 + Y, '#e8a0c0'); fput(16, 27 + Y, '#e8a0c0');
            // neck, head: lit from the surface above
            for (let y = 6; y < 23; y++) for (let x = 9; x < 23; x++) {
              const head = inE(x, y, 16, 13.2, 5.4, 6.4), neck = y >= 18 && Math.abs(x + 0.5 - 16) < 2.4;
              if (!head && !neck) continue;
              const lit = -(y - 10) * 0.25 - (x + 0.5 - 16) * 0.08;
              fput(x, y + Y, SKIN[neck && !head ? 1 : lit > 0.6 ? 3 : lit > -0.6 ? 2 : 1]);
            }
            // fin ears, frilled
            for (const sd of [-1, 1]) rows(sd < 0 ? ['2...', '12..', '112.', '0112', '.011', '..01'] : ['...2', '..21', '.211', '2110', '110.', '10..'], sd < 0 ? 7 : 21, 9 + Y, { 0: FIN[0], 1: FIN[1], 2: FIN[2] });
            // a crown of coral
            rows(['.2...2..2...2.', '.21.12.12.21..', '..1111111111..', '..0000000000..'], 9, 3 + Y, { 0: '#8a1a2a', 1: '#e0404a', 2: '#ff8a8a' });
            fput(15, 5 + Y, '#ffffff'); fput(16, 5 + Y, '#ffd040');
            // the face: wide sea eyes, a few scales at the brow, a small smile
            const blink = ((t + 1) % 4.4) < 0.15;
            for (const ex of [12, 18]) {
              if (blink) { fput(ex, 13 + Y, SKIN[0]); fput(ex + 1, 13 + Y, SKIN[0]); continue; }
              fput(ex, 12 + Y, '#ffffff'); fput(ex + 1, 12 + Y, IRIS); fput(ex, 13 + Y, IRIS); fput(ex + 1, 13 + Y, '#06141a');
              fput(ex - (ex < 16 ? 1 : -2), 11 + Y, SKIN[0]); fput(ex + (ex < 16 ? 0 : 1), 11 + Y, SKIN[0]);
            }
            for (const [a, b] of [[13, 9], [15, 8], [17, 9], [19, 10], [11, 10]]) fput(a, b + Y, SKIN[3]);
            fput(15, 15 + Y, SKIN[1]); fput(16, 16 + Y, SKIN[1]);
            for (let x = 14; x <= 17; x++) fput(x, 17 + Y + (x === 14 || x === 17 ? -1 : 0), '#0a3a30');
            fput(12, 15 + Y, '#ff8aa0'); fput(19, 15 + Y, '#ff8aa0');
            // the trident, held up at the right
            const glint = Math.floor(t * 2) % 5 === 0 || called;
            for (let y = 6; y < N; y++) { fput(26, y + Y, y % 5 === 0 ? '#ffe070' : '#c8901a'); fput(27, y + Y, '#8a5a10'); }
            rows(['3.3.3', '2.2.2', '22222', '..2..'], 24, 2 + Y, { 2: called ? '#fff0a0' : '#e0a820', 3: glint ? '#ffffff' : '#fff0a0' });
            rows(['111', '111'], 25, 22 + Y, { 1: SKIN[2] });
            stampFig();
            // the fish in front of her: three bright ones crossing low, and the whole school when the trident calls
            FISH.forEach((f, k) => { if (called || FRONT(k)) fishAt(f, k, t, called); });
            // the trident's crackle while the fish come
            if (called) for (let k = 0; k < 6; k++) { const a = t * 7 + k * 1.05, r = 2 + (k % 3); put(26 + Math.round(Math.cos(a) * r), 3 + Math.round(Math.sin(a) * r * 0.8), k % 2 ? '#ffffff' : '#fff0a0'); }
            // bubbles rising past it all; one you touched bursts into a ring
            bubbles.forEach((b, i) => {
              const y = Math.round(N + 4 - ((b[1] + t * b[2] * 4) % (N + 8))), x = Math.round(b[0] + Math.sin(t * 2 + b[1]) * 0.7);
              const u = t - popped[i];
              if (u < 0.35) { for (const [a, b] of [[-1, -1], [0, -2], [1, -2], [2, -1], [-1, 1], [2, 1], [0, 2], [1, 2], [-2, 0], [3, 0]]) put(x + a, y + b, u < 0.18 ? '#ffffff' : '#a0e8f8'); }
              else if (u > 2) { put(x, y, '#ffffff'); put(x + 1, y, '#c0f4ff'); put(x, y + 1, '#c0f4ff'); put(x + 1, y + 1, '#7ad0e8'); }
            });
          },
        };
      }
    }
    // (the legendaries end here)
    // half-widths row by row from y = 7: the shapes differ by two or three cells, and each jaw tapers its own way
    const FACE = {
      Oval: [3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 4, 3, 2], 'Square Jaw': [4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5],
      Long: [3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 3, 2], Round: [4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 6, 4],
      Heart: [5, 6, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 4, 4, 3, 2, 1], Gaunt: [3, 4, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 2],
      'Broad Jaw': [4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 8, 8, 8, 8, 8, 6],
    }[face];

    // the outfit's shoulders: centre x, centre y, half-width, half-height and squareness (2 is an ellipse)
    const BODY = { 'Frock Coat': [16, 37, 15, 11.5, 2], Oilskin: [16, 37, 15, 11.5, 2], 'Jerkin and Bandolier': [16, 36, 15.5, 10.5, 4],
      'Blouse and Sash': [16, 38.5, 12.5, 13, 2], 'Ragged Vest': [16, 36.5, 16.5, 11, 3], 'Open Shirt': [16, 35.5, 14, 11.5, 2.5] }[outfit];
    const inBody = (x, y, b) => Math.abs((x + 0.5 - BODY[0]) / BODY[2]) ** BODY[4] + ((y + 0.5 - BODY[1] - b) / BODY[3]) ** 2 <= 1;
    const K = '#0c0a10';
    const tone = (h, f) => { const n = parseInt(h.slice(1), 16); const q = v => Math.max(0, Math.min(255, Math.round(v * f))).toString(16).padStart(2, '0'); return '#' + q(n >> 16 & 255) + q(n >> 8 & 255) + q(n & 255); };
    const mixC = (h1, h2, k) => { const p1 = parseInt(h1.slice(1), 16), p2 = parseInt(h2.slice(1), 16); let o = '#'; for (const sh of [16, 8, 0]) o += Math.round((p1 >> sh & 255) * (1 - k) + (p2 >> sh & 255) * k).toString(16).padStart(2, '0'); return o; };
    // the two deepest skins get a warm lit ramp, so brows, nose, lips and beard still read against the black ink
    const deep = skins.indexOf(skin) >= 4;
    if (deep && hair === hairs[0]) hair = '#3e2618'; // dark brown, not near-black, so beard and brows hold against the ink
    const skinD = tone(skin, 0.78), hairD = tone(hair, 0.7), skinL = deep ? mixC(skin, '#e8b080', 0.42) : tone(skin, 1.1);
    const blushC = mixC(skin, '#d0505a', 0.35);
    const grid = new Array(N * N), fig = new Uint8Array(N * N);
    const back = (x, y, col) => { if (x >= 0 && y >= 0 && x < N && y < N) grid[y * N + x] = col; };
    let sinkNow = 0; // how far under the merfolk has dived
    const F = (x, y, col) => { y += sinkNow; if (x >= 0 && y >= 0 && x < N && y < N) { grid[y * N + x] = col; fig[y * N + x] = 1; } };
    const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;

    function sky(x, y, t) {
      const H = 19;
      if (y < H) return y < 9 ? sea.c[0] : sea.c[1];
      const wave = Math.floor(t * 1.2 + y * 1.7);
      const k = (x * 3 + wave * 5 + y * 7 + 400) % 23;
      if (y % 2 === 0 && (k === 0 || k === 3)) return sea.c[4];
      return y < 24 ? sea.c[2] : sea.c[3];
    }

    // the viewer's splashes and gulls, and the shanty being sung
    let shoutUntil = -1, squawkUntil = -1;
    const splashes = [], gulls = [];
    function compose(t) {
      fig.fill(0);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) grid[y * N + x] = sky(x, y, t);
      for (let i = splashes.length - 1; i >= 0; i--) {
        const sp = splashes[i], u = t - sp.t0;
        if (u > 1.1) { splashes.splice(i, 1); continue; }
        const r = 0.6 + u * 5;
        for (let a = 0; a < 20; a++) { const ang = a / 20 * 6.283; back(Math.round(sp.x + Math.cos(ang) * r), Math.round(sp.y + Math.sin(ang) * r * 0.45), sea.c[4]); }
        if (u < 0.35) for (let k = 0; k < 3; k++) back(Math.round(sp.x) - 1 + k, Math.round(sp.y - 1 - u * 6 + Math.abs(k - 1)), sea.c[4]);
      }
      for (let i = gulls.length - 1; i >= 0; i--) {
        const g = gulls[i], u = t - g.t0;
        const gx = Math.round(g.x + u * 6 * g.dir), gy = Math.round(g.y - u * 1.2 + Math.sin(u * 5) * 0.6);
        if (gy < -3 || gx < -4 || gx > N + 4) { gulls.splice(i, 1); continue; }
        const up = Math.floor(u * 6) % 2;
        back(gx, gy, '#f8f8f4'); back(gx - 1, gy - up, '#f8f8f4'); back(gx + 1, gy - up, '#f8f8f4');
        back(gx - 2, gy - up * 2 + (up ? 0 : 1), '#3a3a44'); back(gx + 2, gy - up * 2 + (up ? 0 : 1), '#3a3a44');
      }
      // sun or moon, horizon things
      const night = sea.v === 'Night';
      if (sea.v !== 'Storm') for (let y = 2; y < 9; y++) for (let x = 22; x < 30; x++) if (inE(x, y, 26, 5.5, 3, 3)) back(x, y, night ? '#f6eec8' : '#fff4c0');
      if (night) for (const [sx, sy] of [[3, 3], [9, 6], [5, 11], [13, 2], [29, 12], [20, 10]]) back(sx, sy, Math.sin(t * 1.5 + sx) > -0.3 ? '#ffffff' : sea.c[1]);
      if (sea.v === 'Storm' && Math.sin(t * 0.7 + phase) > 0.97) for (const [lx, ly] of [[25, 0], [25, 1], [24, 2], [24, 3], [25, 4], [26, 5], [25, 6], [25, 7]]) back(lx, ly, '#fffbe0');
      const kraken = companion === 'Kraken' || king;
      if (sight === 'Distant Ship') {
        const sx = 3 + Math.round(Math.sin(t * 0.15 + phase) * 1);
        for (let x = sx; x < sx + 6; x++) back(x, 18, '#3a2a20');
        for (let x = sx + 1; x < sx + 5; x++) back(x, 17, '#4a3628');
        for (let y = 11; y < 17; y++) back(sx + 3, y, '#3a2a20');
        for (let y = 12; y < 16; y++) for (let x = sx + 1; x < sx + 3; x++) back(x, y, '#f0e6d0');
        back(sx + 4, 11, Math.sin(t * 4) > 0 ? '#1a1a1a' : '#2a2a2a'); back(sx + 5, 11, '#1a1a1a');
      } else if (sight === 'Island') {
        for (let y = 15; y < 19; y++) for (let x = 0; x < 10; x++) if (inE(x, y, 4, 19, 6, 3.6)) back(x, y, y === 18 ? '#e8d090' : '#3a8a4a');
        for (let y = 9; y < 16; y++) back(4 + (y < 12 ? 1 : 0), y, '#6a4a2a');
        for (const [dx, dy] of [[-2, 0], [-1, -1], [1, -1], [2, 0], [3, 1], [-3, 1], [0, -1], [1, 0], [3, 0]]) back(5 + dx, 9 + dy, '#2a7a3a');
      } else if (sight === 'Lighthouse') {
        for (let y = 9; y < 19; y++) for (let x = 3; x < 6; x++) back(x, y, (y >> 1) % 2 ? '#d83a3a' : '#f4f0e8');
        back(3, 8, '#2a2a2a'); back(4, 8, '#2a2a2a'); back(5, 8, '#2a2a2a'); back(4, 7, '#2a2a2a');
        const beam = Math.sin(t * 1.2) > 0;
        back(4, 9, '#fff2a0');
        if (beam) for (let i = 1; i < 6; i++) { back(5 + i, 9, '#fff6c8'); if (i > 2) back(5 + i, 10, '#fff6c8'); }
      }

      if (king) {
        // the Pirate King sits on his hoard: heaps of coin either side, gems and a goblet catching the light
        const topL = x => 17.5 + Math.max(0, x - 2) ** 2 * 0.16, topR = x => 20.5 + Math.max(0, 28 - x) ** 2 * 0.13;
        const glint = Math.floor(t * 3);
        for (let x = 0; x < N; x++) {
          const top = Math.round(Math.min(topL(x), topR(x)));
          if (top >= N) continue;
          back(x, top - 1, '#4a2c06');
          for (let y = top; y < N; y++) {
            const h = (x * 7 + y * 13) % 11, d = y - top;
            let col = d === 0 ? '#f2c84a' : h === 0 ? '#fff0a0' : h < 3 ? '#c89a20' : d > 6 ? '#b88a1a' : '#e8b83a';
            if ((x * 5 + y * 3 + glint * 7) % 41 === 0) col = '#ffffff';
            back(x, y, col);
          }
        }
        for (const [gx, gy, gc] of [[2, 23, '#d8323e'], [6, 27, '#2a6ad8'], [1, 29, '#2a9a5a'], [29, 24, '#2a9a5a'], [26, 28, '#d8323e'], [30, 30, '#8a3ab8']]) { back(gx, gy, gc); back(gx + 1, gy, tone(gc, 0.6)); }
      }
      if (kraken) {
        // the kraken: one great tentacle a third of the frame high, rising out of the sea on the right,
        // suckers down its inner side, its tip curled round the mast of any ship out there
        // a Catmull-Rom spine: up the right side, arched over the top of the frame, the tip hanging down
        // on the left and hooked round the mast of any ship out there
        const sw = Math.sin(t * 0.8 + phase) * 0.6, sw2 = Math.sin(t * 1.3 + phase) * 0.5;
        const CP = [[28, 34], [28, 31.5], [30.4, 24], [27.9 + sw, 16.5], [29.4 + sw, 8.5], [25.2, 2.4], [18.5, 3.4 + sw2 * 0.5], [12, 0.9], [6.4, 3.4], [4.3 + sw2, 8.4], [5.1 + sw2, 11.3], [7.2, 10.8], [6.9, 9], [6.9, 9]];
        const sp = [];
        let len = 0;
        for (let k = 1; k < CP.length - 2; k++) for (let j = 0; j < 10; j++) {
          const u = j / 10, [p0, p1, p2, p3] = [CP[k - 1], CP[k], CP[k + 1], CP[k + 2]];
          const cr = d => 0.5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u * u + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u * u * u);
          const x = cr(0), y = cr(1);
          if (sp.length) len += Math.hypot(x - sp[sp.length - 1][0], y - sp[sp.length - 1][1]);
          sp.push([x, y, 0, 0, len]);
        }
        const SN = sp.length - 1;
        sp.forEach((p, i) => { p[3] = i / SN; p[2] = 3.3 - 2.8 * Math.pow(i / SN, 0.7); });
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          let best = 9, bi = 0;
          for (let i = 0; i < sp.length; i++) { const d = Math.hypot(x + 0.5 - sp[i][0], y + 0.5 - sp[i][1]) - sp[i][2]; if (d < best) { best = d; bi = i; } }
          if (best >= 0.9) continue;
          if (best >= 0) { back(x, y, '#2a0a34'); continue; }
          const [px, py, w, s] = sp[bi], nx = sp[Math.min(SN, bi + 1)][0] - sp[Math.max(0, bi - 1)][0], ny = sp[Math.min(SN, bi + 1)][1] - sp[Math.max(0, bi - 1)][1];
          const inner = nx * (y + 0.5 - py) - ny * (x + 0.5 - px) < 0; // the left of the way it grows: the side facing the pirate, the inside of the curl
          let col = inner ? '#9a46aa' : '#5e2070';
          if (inner && best > -1.15 && Math.floor(sp[bi][4] / 1.25) % 2 === 0 && s < 0.9) col = '#f4c8ec';
          else if (!inner && best > -0.9) col = '#7a2e8a';
          back(x, y, col);
        }
        // white water where it breaks the surface
        const fo = Math.floor(t * 4) % 2;
        for (const [qx, qy] of [[25, 20], [26, 19], [31, 19], [27 + fo, 21], [24 - fo, 21], [30, 21 + fo]]) back(qx, qy, '#e8f6ff');
      }
      const bob = Math.sin(t * 1.1 + phase) > 0.6 ? 1 : 0;
      // shoulders: each outfit has its own cut (square, narrow and sloping, broad, hunched), in the coat's colour
      const cloth = (x, y) => { const band = coat.s ? (y % 2 ? 0 : 1) : (x > 22 ? 1 : 0); return coat.s && x > 22 ? tone(coat.c[band], 0.8) : coat.c[band]; };
      const LINEN = ['#f4efe2', '#d8d0c0'];
      for (let y = 22; y < N; y++) for (let x = 0; x < N; x++) {
        if (!inBody(x, y, bob * 0.3)) continue;
        const dx = Math.abs(x + 0.5 - 16);
        let col = cloth(x, y);
        if (outfit === 'Jerkin and Bandolier' && dx > 9.5) col = LINEN[x > 22 ? 1 : 0]; // white shirt sleeves past the jerkin
        else if (outfit === 'Blouse and Sash') col = y >= 29 ? cloth(x, y) : x > 22 || (x + y) % 9 === 0 ? LINEN[1] : LINEN[0];
        else if (outfit === 'Ragged Vest' && dx > 9.5 - ((y * 3 + x) % 2)) col = x > 22 ? skinD : skin; // bare arms, a ragged edge
        F(x, y, col);
      }
      if (outfit === 'Frock Coat') {
        // shirt opening, lapels, buttons
        for (let y = 25; y < N; y++) { const w = Math.max(0, 4 - Math.floor((y - 25) / 2)); for (let x = 16 - w; x < 16 + w; x++) F(x, y, LINEN[0]); if (w > 0 && !coat.s) { F(16 - w - 1, y, '#e8b83a'); F(16 + w, y, '#e8b83a'); } }
        if (!coat.s) for (const by of [27, 30]) { F(9, by, '#f2c84a'); F(22, by, '#f2c84a'); }
      } else if (outfit === 'Oilskin') {
        // buttoned to the throat: a dark seam and horn toggles (the stiff collar is drawn round the neck later)
        for (let y = 25; y < N; y++) F(16, y, tone(coat.c[1], 0.7));
        for (const by of [26, 28, 30]) { F(15, by, '#e8dcc0'); F(17, by, '#e8dcc0'); }
      } else if (outfit === 'Jerkin and Bandolier') {
        for (let y = 25; y < 28; y++) for (let x = 16 - (28 - y); x < 16 + (28 - y); x++) F(x, y, LINEN[0]);
        // a leather bandolier from the left shoulder across to the right hip, studded with powder flasks
        for (let y = 24; y < N; y++) { const x0 = 9 + (y - 24) * 2; for (let k = 0; k < 3; k++) F(x0 + k, y, k === 2 ? '#3a2414' : '#6a4428'); if (y % 2) F(x0 + 1, y, '#c8ccd4'); }
      } else if (outfit === 'Blouse and Sash') {
        // a deep drawstring neck showing the chest, a frill down each side, the sash knotted at the hip
        for (let y = 25; y < 29; y++) { const w = 3 - Math.floor((y - 25) / 2); for (let x = 16 - w; x < 16 + w; x++) F(x, y, x < 16 ? skin : skinD); F(16 - w - 1, y, '#ffffff'); F(16 + w, y, '#ffffff'); }
        for (let y = 29; y < N; y++) F(22, y, tone(coat.c[0], 1.2));
        F(23, 30, tone(coat.c[0], 1.2)); F(23, 31, coat.c[1]);
      } else if (outfit === 'Ragged Vest') {
        for (let y = 25; y < N; y++) { const w = Math.max(1, 3 - Math.floor((y - 25) / 3)); for (let x = 16 - w; x < 16 + w; x++) F(x, y, x < 16 ? skin : skinD); }
        // a little ink star on the upper arm
        F(4, 29, '#3a4a8a'); F(3, 30, '#3a4a8a'); F(5, 30, '#3a4a8a'); F(4, 31, '#3a4a8a');
      } else if (outfit === 'Open Shirt') {
        // the shirt open to the chest, wide collar points turned out, a swallow tattooed below the collarbone
        for (let y = 24; y < N; y++) { const w = Math.max(1, 3 - Math.floor((y - 24) / 3)); for (let x = 16 - w; x < 16 + w; x++) F(x, y, x < 16 ? skin : skinD); }
        for (const [qx, qy] of [[12, 24], [11, 25], [12, 25], [11, 26], [19, 24], [19, 25], [20, 25], [20, 26]]) F(qx, qy, tone(coat.c[0], 1.25));
        if (!king) for (const [qx, qy] of [[14, 28], [15, 29], [16, 28]]) F(qx, qy, '#2a3a7a');
      }
      if (king) {
        // a red velvet cape over the shoulders, trimmed in ermine along the top and down its front edges
        for (let y = 22; y < N; y++) for (let x = 0; x < N; x++) {
          if (!inBody(x, y, bob * 0.3)) continue;
          const dx = Math.abs(x + 0.5 - 16), top = !inBody(x, y - 2, bob * 0.3);
          if ((dx > 3.5 && top) || (dx > 5.5 && dx <= 7)) F(x, y, (x * 7 + y * 3) % 6 === 0 ? K : x > 21 ? '#d8d0c4' : '#f6f2ea');
          else if (dx > 7) F(x, y, x > 16 ? '#5a0a18' : (x + y) % 5 === 0 ? '#b8283a' : '#9a1a2c');
        }
        // the captain's red sash, two medals pinned on it
        for (let k = 0; k < 9; k++) { const sx = 9 + k, sy = 23 + k; if (sy < N) { F(sx, sy, '#c8323e'); F(sx + 1, sy, '#8a1a24'); } }
        for (const [mx, my] of [[11, 26], [14, 29]]) { F(mx, my, '#fff0a0'); F(mx + 1, my, '#f2c84a'); F(mx, my + 1, '#f2c84a'); F(mx + 1, my + 1, '#c89a20'); }
      }
      // the head's outline, row by row: a drawn profile per face shape
      const hw = y => (y >= 7 && y < 7 + FACE.length) ? FACE[y - 7] : 0;
      const chin = 6 + FACE.length;
      // neck, in the shadow of the jaw
      for (let y = 19; y < 26; y++) for (let x = 13; x < 19; x++) if (!(y > 23 && (x === 13 || x === 18))) F(x, y, y <= chin + 1 ? skinD : x < 15 ? skin : skinD);
      if (hat === 'Bandana' || hat === 'Headscarf') for (let x = 13; x < 19; x++) { F(x, 24, scarfCol); F(x, 25, tone(scarfCol, 0.8)); }
      // hair behind the head
      const bush = hairDo === 'Wild' ? 3 : 2;
      if (hairDo === 'Long' || hairDo === 'Wild') for (let y = 9; y < (hairDo === 'Wild' ? 22 : 25); y++) {
        const w = Math.max(hw(Math.min(y, 15)), 5) + bush - (y > 20 ? 1 : 0);
        for (let x = 16 - w; x < 16 + w; x++) if (!(hairDo === 'Wild' && (x === 16 - w || x === 15 + w) && (y + x) % 3 === 0)) F(x, y, x > 17 ? hairD : hair);
      }
      // head: lit from the upper left, a shadow down the right cheek and under the cheekbone
      for (let y = 7; y < chin + 1; y++) {
        const w = hw(y);
        for (let x = 16 - w; x < 16 + w; x++) {
          let col = skin;
          // the right cheek and the jaw's underside in shadow; the temple and the cheekbone catch the light
          if (x >= 16 + w - (w >= 8 ? 3 : 2) || (y >= chin - 1 && x >= 16) || y === chin) col = skinD;
          else if (x === 16 - w + 1 && y >= 12 && y <= 13) col = skinL;
          else if (y === 16 && (x === 16 - w + 1 || x === 16 - w + 2)) col = skinL;
          if (face === 'Gaunt' && y >= 17 && y <= 20 && x === 16 - w + 1) col = skinD; // hollow under the cheekbone
          if (face === 'Gaunt' && y === 15 && x === 16 - w + 1) col = skinL;
          if (face === 'Round' && (y === 17 || y === 18) && (x === 16 - w + 1 || x === 16 - w + 2 || x === 16 + w - 4)) col = blushC;
          if (face === 'Broad Jaw' && y >= chin - 5 && y < chin && x === 16 - w) col = skinD; // the heavy jaw's corner
          // the deepest skins: lit cheekbones, so the face keeps its form round the eyes and nose
          if (deep && y === 16 && col === skin && (x === 12 || x === 13 || x === 19)) col = skinL;
          F(x, y, col);
        }
      }
      // the oilskin's stiff collar turned up round the jaw, in front of any hair
      if (outfit === 'Oilskin') for (const [qx, top] of [[8, 22], [9, 21], [10, 20], [11, 19], [12, 19], [19, 19], [20, 19], [21, 20], [22, 21], [23, 22]]) for (let y = top; y < 26; y++) if (qx < 16 - hw(y + bob) || qx >= 16 + hw(y + bob)) F(qx, y + bob, qx === 12 || qx === 19 ? coat.c[1] : qx > 16 ? tone(coat.c[0], 0.85) : coat.c[0]);
      // ears, unless the hair hides them
      const ew = hw(15), earL = 16 - ew - 1, earR = 16 + ew;
      if (hairDo !== 'Long' && hairDo !== 'Wild' && !mer) for (const [ex, s] of [[earL, -1], [earR, 1]]) { F(ex, 14, s < 0 ? skin : skinD); F(ex, 15, skinD); F(ex, 16, s < 0 ? skin : skinD); }
      if (mer) {
        // fins where the ears would be: a ribbed fan, its spines fluttering when the viewer comes near
        const fl = (finFlutter > 0.5 ? Math.floor(t * 8) : Math.floor(t * 1.5)) % 2;
        for (const [ex, sd] of [[earL, -1], [earR, 1]]) {
          for (let y = 12; y < 18; y++) F(ex, y, y % 2 ? '#8af0dc' : '#4cc0a4');
          for (let y = 11 - fl; y < 17 - fl; y++) F(ex + sd, y, y % 2 ? '#4cc0a4' : '#2e8a7a');
          for (const y of [10, 12, 14]) F(ex + 2 * sd, y - fl, '#2e8a7a');
        }
        // scales across the cheeks and down the neck
        for (const [qx, qy] of [[11, 17], [12, 18], [10, 18], [20, 17], [19, 18], [21, 18]]) if (fig[qy * N + qx]) F(qx, qy, '#2e9a84');
        for (let y = 21; y < 25; y++) for (let x = 13; x < 19; x++) if ((x + y) % 3 === 0) F(x, y, '#3aa88e');
      }
      if (earring) { const glint = Math.sin(t * 2 + phase) > 0.8; F(earL, 17, glint ? '#fff6c0' : '#f2c84a'); F(earL - 1, 18, '#f2c84a'); F(earL, 19, '#c89a20'); }
      // a bare head shows its own hair on top
      if (hat === 'Bare Head') {
        if (hairDo === 'Short') { for (let y = 7; y < 10; y++) { const w = hw(y); for (let x = 16 - w; x < 16 + w; x++) if ((x + y) % 2 === 0) F(x, y, hairD); } }
        else for (let y = hairDo === 'Wild' ? 4 : 6; y < 10; y++) {
          const w = Math.max(hw(y), 4) + (hairDo === 'Wild' ? 2 : 0) - (y < 6 ? 1 : 0);
          for (let x = 16 - w; x < 16 + w; x++) F(x, y, (x + y) % 4 === 0 ? hairD : x > 18 ? hairD : hair);
        }
        if (hairDo === 'Short') { F(12, 8, skinL); F(13, 8, skinL); }
      }
      if (hairDo === 'Braids') for (const s of [-1, 1]) { const bx = s < 0 ? 16 - hw(16) - 2 : 16 + hw(16); for (let y = 15; y < 27; y++) { F(bx, y, y % 2 ? hair : hairD); F(bx + 1, y, y % 2 ? hairD : hair); } F(bx, 27, '#f2c84a'); F(bx + 1, 27, '#c89a20'); }
      if (hairDo === 'Ponytail') { const sw = Math.sin(t * 1.3 + phase) > 0.3 ? 1 : 0; for (let y = 10; y < 24; y++) { const x = 16 + hw(Math.min(y, 15)) + 1 + (y > 16 ? sw : 0) + (y > 20 ? 1 : 0); F(x, y, y % 3 ? hair : hairD); if (y < 20) F(x + 1, y, hairD); } }
      // marks on the skin, kept on the face whatever its shape
      const FM = (x, y, col) => { if (Math.abs(x + 0.5 - 16) < hw(y)) F(x, y, col); };
      if (marks === 'Freckles') for (const [mx, my] of [[11, 15], [13, 16], [12, 17], [18, 16], [20, 15], [19, 17]]) FM(mx, my, skinD);
      else if (marks === 'Cheek Scar') for (const [mx, my] of [[20, 14], [19, 15], [20, 16], [19, 17]]) FM(mx, my, '#d87a7a');
      else if (marks === 'Anchor Tattoo') for (const [mx, my] of [[12, 16], [11, 17], [12, 17], [13, 17], [12, 18], [11, 19], [13, 19]]) FM(mx, my, '#3a4a8a');
      else if (marks === 'Weathered') { for (const [mx, my] of [[11, 13], [11, 15], [20, 13], [20, 15], [14, 18], [17, 18]]) FM(mx, my, skinD); }
      else if (marks === 'Soot Stripe') for (let x = 11; x <= 20; x++) if (x < 15 || x > 16) FM(x, 16, '#1a1218');
      else if (marks === 'Beauty Mark') FM(19, 18, '#3a1a14');
      // facial hair, following the jaw it grows on
      const hairL = deep ? mixC(hair, '#b08060', 0.36) : mixC(hair, '#ffffff', 0.14), strand = (x, y) => ((x + (y >> 1)) % 3 === 0 ? (x > 18 ? hair : hairL) : x > 18 ? hairD : hair);
      if (beard === 'Stubble') for (let y = 18; y <= chin; y++) { const w = hw(y); for (let x = 16 - w + 1; x < 16 + w - 1; x++) if ((x + y) % 2 === 0 && !(y >= 19 && y <= 20 && x > 12 && x < 19)) F(x, y, hairD); }
      if (beard === 'Full Beard' || beard === 'Braided Beard') {
        for (let y = 17; y <= chin + 2; y++) {
          const w = y <= chin ? hw(y) : Math.max(1, hw(chin) - (y - chin) * 2 + 1);
          for (let x = 16 - w; x < 16 + w; x++) {
            if (y === 20 && x > 13 && x < 18) continue;
            if (y < 18 && x > 13 && x < 18) continue;
            F(x, y, strand(x, y));
          }
        }
        if (beard === 'Braided Beard') for (let y = chin + 2; y < chin + 7; y++) { F(15, y, y % 2 ? hair : hairD); F(16, y, y % 2 ? hairD : hair); if (y === chin + 4) { F(15, y, '#f2c84a'); F(16, y, '#f2c84a'); } }
      }
      if (beard === 'Goatee') { for (let y = 21; y <= chin + 1; y++) for (let x = 14; x < 18; x++) if (!(y === chin + 1 && (x === 14 || x === 17))) F(x, y, strand(x, y)); for (let x = 14; x < 18; x++) F(x, 18, hairD); }
      if (beard === 'Mutton Chops') for (let y = 12; y <= 20; y++) { const w = hw(y), deep = y > 16 ? 1 : 0; F(16 - w, y, hairD); F(16 + w - 1, y, hairD); for (let k = 1; k <= 1 + deep; k++) { F(16 - w + k, y, hair); F(16 + w - 1 - k, y, hairD); } }
      if (beard === 'Curled Moustache') { for (let x = 12; x < 20; x++) F(x, 18, x > 17 ? hairD : hair); F(11, 17, hair); F(20, 17, hairD); F(11, 16, hairD); F(20, 16, hairD); }
      if (beard === 'Handlebar') { for (let x = 13; x < 19; x++) F(x, 18, x > 16 ? hairD : hair); F(12, 18, hair); F(19, 18, hairD); F(11, 17, hair); F(20, 17, hairD); F(11, 16, hair); F(20, 16, hairD); F(12, 15, hair); F(19, 15, hairD); }
      // a little sprite painter: K ink, W white, I iris, D shade, L light, R ruddy, G gold, h brow
      const PAINT = { K, W: '#f8f6f0', I: iris, D: skinD, L: skinL, R: blushC, G: '#f2c84a', h: hairD, M: '#7a1a24', B: '#5a3a24', b: '#2a1810' };
      const spr = (rows, x0, y0, flip) => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const ch = r[flip ? r.length - 1 - i : i]; if (ch !== '.') F(x0 + i, y0 + j, PAINT[ch]); } });
      // nose: highlight down the lit side, shadow on the other, nostrils
      spr({ Straight: ['.L..', '.LD.', '.LD.', 'KLDK'], Button: ['....', '....', '.LD.', '.KK.'], Hooked: ['.LD.', '.LD.', '.LDD', 'KDDK'],
        Broad: ['....', '.LD.', 'LLDD', 'KDDK'], Crooked: ['L...', '.LD.', '..LD', '.KDK'], Bulbous: ['.LD.', '.LD.', 'RRRD', 'KRRK'] }[nose], 14, 14);
      // mouth
      const my = 19, mouth = t < shoutUntil ? 'Shout' : grin;
      const MOUTHS = {
        Smirk: ['.....K', '.KKKK.', '..DD..'], Grin: ['K....K', 'KWWWWK', '.KKKK.'], 'Gold Tooth': ['K....K', 'KWGWWK', '.KKKK.'],
        Stern: ['......', '.KKKK.', '..DD..'], Shout: ['.KKKK.', 'KWWWWK', 'KMMMMK', '.KKKK.'], Snarl: ['......', 'KWKKWK', '.KKKK.'],
        Pipe: ['......', '.KKKK.', '..DD..'], Whistle: ['..KK..', '.KMMK.', '..KK..'], Lips: ['......', '.KKKK.', '..LL..'],
      };
      spr(deep ? MOUTHS[mouth].map(r => r.replace(/D/g, 'L')) : MOUTHS[mouth], 13, my);
      // on the deepest skins a lit lower lip under an open mouth, so it reads as a mouth and not a white bar
      const onSkin = (x, y) => { const g = grid[(y + sinkNow) * N + x]; return fig[(y + sinkNow) * N + x] && (g === skin || g === skinD); };
      if (deep) { const rows = MOUTHS[mouth], ly = my + rows.length; if (rows[rows.length - 1].includes('K')) for (const lx of [15, 16]) if (onSkin(lx, ly)) F(lx, ly, skinL); }
      if (grin === 'Pipe' && mouth !== 'Shout') {
        spr(['BB...', '..BBB', '...bB', '...BB'], 18, 20);
        const puff = (t * 0.6 + phase) % 1;
        if (puff < 0.8) { const sy = Math.round(18 - puff * 6); back(21 + (sy % 2), sy, '#e8e8e8'); back(22, sy - 2, '#d8d8d8'); }
      }
      // eyes, then brows over them
      const blink = ((t + phase) % blinkEvery) < 0.15;
      for (const [ex, isLeft] of [[12, true], [17, false]]) {
        const patched = eyes === 'Eyepatch' && isLeft === patchLeft;
        if (patched) { for (let y = 13; y < 16; y++) for (let x = ex; x < ex + 3; x++) F(x, y, K); continue; }
        if (eyes === 'Spyglass Eye' && !isLeft) { for (let y = 12; y < 17; y++) for (let x = ex; x < ex + 4; x++) F(x, y, (y === 12 || y === 16 || x === ex || x === ex + 3) ? '#c8962a' : '#2a3a5a'); F(ex + 1, 13, '#a8d8ff'); continue; }
        const flip = !isLeft;
        if (blink) { spr(['...', 'KKK'], ex, 13, flip); continue; }
        // (no white ring round the iris on the deepest skins: their wide eyes open sideways, not up)
        const E = { Squint: ['DDD', 'KIK'], Narrow: ['KKK', 'DIK'], Wide: deep ? ['KKK', 'WIW'] : ['KKK', 'WWW', 'WIW'], Tired: ['.KK', 'WIK', 'DD.'] }[eyes] || ['.KK', 'WIK'];
        spr(E, ex, eyes === 'Wide' && !deep ? 12 : 13, flip);
        if (eyes === 'Glass Eye' && !isLeft) { F(ex + 1, 14, '#7ff0ff'); F(ex + 1, 13, '#ffffff'); }
      }
      const BROW = { Heavy: [['hhh', '.hh'], 10], Arched: [['.h.', 'h.h'], 10], Furrowed: [['h..', '.hh'], 11], Raised: [['hhh'], 11], Thin: [['.hh'], 11] }[brows];
      for (const isLeft of [true, false]) {
        if (eyes === 'Spyglass Eye' && !isLeft) continue;
        const up = brows === 'Raised' && !isLeft ? -1 : 0, lift = eyes === 'Wide' ? -1 : 0;
        spr(BROW[0], isLeft ? 12 : 17, BROW[1] + up + lift, !isLeft);
        // the deepest skins: a lit brow bone under each brow keeps it apart from the eye
        if (deep) { const by = BROW[1] + up + lift + BROW[0].length, row = BROW[0][BROW[0].length - 1]; for (let i = 0; i < 3; i++) { const x = isLeft ? 12 + i : 19 - i; if (row[i] === 'h' && onSkin(x, by)) F(x, by, skinL); } }
      }
      if (ghostly && !blink) for (const [ex, isLeft] of [[12, true], [17, false]]) {
        if ((eyes === 'Eyepatch' && isLeft === patchLeft) || (eyes === 'Spyglass Eye' && !isLeft) || eyes === 'Squint') continue;
        F(ex + 1, 13, '#e8fff6'); F(ex + 1, 14, '#3affc0');
      }
      if (eyes === 'Eyepatch') for (let x = 8; x < 24; x++) { const y = Math.round(10 + (x - 8) * (patchLeft ? 0.25 : -0.25) + (patchLeft ? 0 : 4)); if (fig[y * N + x] && grid[y * N + x] !== K) F(x, y, K); }
      if (eyes === 'Scarred') { F(18, 11, '#d87a7a'); F(18, 12, '#d87a7a'); F(18, 15, '#d87a7a'); F(19, 16, '#d87a7a'); }
      // hats
      if (hat === 'Tricorn') {
        for (let y = 2; y < 9; y++) for (let x = 9; x < 23; x++) if (inE(x, y, 16, 8.5, 6.4, 5.5) && y < 9) F(x, y, x > 19 ? '#16141c' : '#22202a');
        for (let x = 4; x < 28; x++) {
          const dx = Math.abs(x + 0.5 - 16);
          if (dx > 12) continue;
          const topY = 8 - Math.round(Math.max(0, dx - 3) * 0.55), botY = 10 + (dx < 2 ? 1 : 0) - Math.round(Math.max(0, dx - 7) * 0.4);
          for (let y = topY; y <= botY; y++) F(x, y, y === topY ? '#e8b83a' : '#2c2a34');
        }
        F(15, 9, '#e8b83a'); F(16, 9, '#e8b83a'); F(15, 10, '#c8323e'); F(16, 10, '#c8323e');
      } else if (hat === 'Bicorne') {
        for (let y = 1; y < 10; y++) for (let x = 2; x < 30; x++) if (inE(x, y, 16, 9, 13.5, 6.2) && y < 10) F(x, y, y === 9 ? '#e8b83a' : '#1e1c26');
        const flap = Math.sin(t * 2) > 0 ? 1 : 0;
        F(23, 2 - flap, '#f4f4f4'); F(24, 1 - flap, '#f4f4f4'); F(22, 3, '#f4f4f4'); F(25, 1, '#e4e4e4');
        const CK = { r: '#d8404a', R: '#8a1a24', G: '#fff0a0', g: '#c89a20', W: '#fff0a0', B: '#2a6ad8', b: '#18408a' };
        if (king) {
          // the Pirate King's crown, set over the bicorne, jewels in its band
          ['W...WW...W', 'GG.GGGG.GG', 'GGGGGGGGGG', 'grgGBbGgrg', 'gggggggggg'].forEach((row, j) => { for (let i = 0; i < 10; i++) if (row[i] !== '.') F(11 + i, j, row[i] === 'G' ? (i > 6 ? '#e8b83a' : '#f2c84a') : CK[row[i]] || '#d8323e'); });
        } else {
          // a ribbon cockade: a pleated red rosette round a gold button
          ['.rR.', 'rGgR', 'rgGR', '.RR.'].forEach((row, j) => { for (let i = 0; i < 4; i++) if (row[i] !== '.') F(14 + i, 4 + j, CK[row[i]]); });
        }
      } else if (hat === 'Cavalier') {
        for (let y = 2; y < 11; y++) for (let x = 1; x < 31; x++) { if (inE(x, y, 16, 9.4, 14.5, 2) || (inE(x, y, 16, 8, 6.4, 5.5) && y < 9)) F(x, y, y === 8 && Math.abs(x + 0.5 - 16) < 6.4 ? coat.c[0] : '#3a2a20'); }
        const sw = Math.sin(t * 1.4 + phase) > 0.2 ? 0 : 1;
        for (let i = 0; i < 9; i++) { F(10 - i + (i > 5 ? sw : 0), 6 - Math.round(Math.sin(i * 0.4) * 3), i % 2 ? '#e84a5a' : '#ff8a8a'); F(10 - i + (i > 5 ? sw : 0), 7 - Math.round(Math.sin(i * 0.4) * 3), '#c8323e'); }
      } else if (hat === 'Bandana' || hat === 'Headscarf') {
        for (let y = 5; y < 12; y++) for (let x = 8; x < 24; x++) if (inE(x, y, 16, 12, 7.6, 7) && y < 12) F(x, y, (hat === 'Bandana' && (x * 3 + y * 5) % 7 === 0) ? '#ffffff' : (hat === 'Headscarf' && (x + y) % 4 < 1) ? '#f4efe2' : (x > 19 ? tone(scarfCol, 0.8) : scarfCol));
        if (hat === 'Headscarf') for (let x = 9; x < 23; x++) F(x, 11, tone(scarfCol, 0.7));
        const fl = Math.sin(t * 1.6 + phase) > 0 ? 1 : 0;
        F(24, 9, scarfCol); F(25, 8, scarfCol); F(25, 10 + fl, tone(scarfCol, 0.8)); F(26, 11 + fl, scarfCol); F(26, 9 - fl, tone(scarfCol, 0.8));
      } else if (hat === 'Knit Cap') {
        for (let y = 4; y < 11; y++) for (let x = 8; x < 24; x++) if (inE(x, y, 16, 11, 7.8, 7) && y < 11) F(x, y, y >= 9 ? ((x % 2) ? tone(scarfCol, 0.75) : scarfCol) : (x % 3 === 0 ? tone(scarfCol, 0.8) : x > 19 ? tone(scarfCol, 0.85) : scarfCol));
      } else if (hat === 'Peaked Cap') {
        for (let y = 5; y < 10; y++) for (let x = 9; x < 23; x++) if (!(y === 5 && (x < 10 || x > 21))) F(x, y, y === 9 ? '#f4f0e6' : x > 19 ? '#1a2240' : '#26305a');
        for (let x = 9; x < 21; x++) F(x, 10, '#16141c');
        for (let x = 8; x < 13; x++) F(x, 11, '#16141c');
        F(15, 7, '#f2c84a'); F(16, 7, '#f2c84a'); F(15, 8, '#c89a20'); F(16, 6, '#fff0a0');
      } else if (hat === 'Coral Crown') {
        // branching red coral grown into a crown, two pearls set in its band
        for (let x = 10; x < 22; x++) F(x, 8, x % 2 ? '#e8484a' : '#c8323e');
        for (const [bx, top, fork] of [[11, 5, 1], [14, 2, -1], [17, 3, 1], [20, 5, -1]]) {
          for (let y = top; y < 8; y++) F(bx, y, y === top ? '#ff9a8a' : '#e8484a');
          F(bx + fork, top + 1, '#ff9a8a'); F(bx + fork, top + 2, '#e8484a');
        }
        F(13, 7, '#fff8f0'); F(16, 7, '#fff8f0'); F(19, 7, '#f0e0ff');
      }
      // what they carry, held at the lower left
      if (carry === 'Spyglass') { for (let i = 0; i < 7; i++) { F(3 + i, 30 - i, i < 3 ? '#c89a2a' : '#8a5a2a'); F(4 + i, 30 - i, i < 3 ? '#f2c84a' : '#a86a34'); } F(10, 23, '#a8d8ff'); }
      else if (carry === 'Cutlass') { for (let i = 0; i < 9; i++) F(26 - Math.floor(i * 0.3), 30 - i, i < 3 ? '#8a5a2a' : '#d8dce4'); F(27, 28, '#f2c84a'); F(25, 28, '#f2c84a'); F(24, 21, '#ffffff'); }
      else if (carry === 'Treasure Map') { for (let y = 26; y < 32; y++) for (let x = 2; x < 9; x++) F(x, y, (x === 4 && y === 28) || (x === 5 && y === 29) || (x === 5 && y === 28) || (x === 4 && y === 29) ? '#c8323e' : ((x + y) % 4 === 0 ? '#c8a870' : '#ecd8a8')); }
      else if (carry === 'Lantern') { const fl = Math.sin(t * 6) > 0; for (let y = 24; y < 31; y++) for (let x = 3; x < 8; x++) F(x, y, (y === 24 || y === 30 || x === 3 || x === 7) ? '#4a3a2a' : (fl ? '#ffe070' : '#ffb030')); F(5, 23, '#4a3a2a'); F(5, 27, '#fff6c8'); }
      else if (carry === 'Trident') {
        for (let y = 12; y < N; y++) { F(5, y, '#f2c84a'); F(6, y, '#c89a20'); }
        for (let x = 2; x < 10; x++) F(x, 12, x < 6 ? '#f2c84a' : '#c89a20');
        for (const px of [2, 5, 9]) { F(px, 11, '#f2c84a'); F(px, 10, '#f2c84a'); F(px, 9, '#fff0a0'); }
        F(5, 11, '#f2c84a'); F(6, 11, '#c89a20'); F(6, 10, '#c89a20');
      } else if (carry === 'Ship in a Bottle') {
        // a bottle in the crook of the arm, a tiny ship inside riding a tiny sea that sloshes when tapped
        const BOT = { G: '#8ec8e0', g: '#cfeefa', H: '#ffffff', B: '#7a4a24', S: '#f8f4e8', M: '#3a2414', w: shipSlosh ? '#5aa8e0' : '#2a7ab8', C: '#b07c3a', W: '#e8f8ff' };
        const r = shipRock;
        const rows = ['.GGGGGGG....', 'GgH' + (r < 0 ? 'MS' : r > 0 ? 'SM' : 'SM') + 'ggG....', 'Gg' + (r < 0 ? 'SMS' : 'SMS') + 'ggGGGC', 'GgBBBBBgGGGC', 'G' + (shipSlosh ? 'wWwwWww' : 'wwwwwww') + 'G....', '.GGGGGGG....'];
        rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] !== '.') F(1 + i, 25 + j, BOT[row[i]]); });
      }
      else if (carry === 'Doubloon') { const spin = Math.floor(t * 3) % 4; for (let y = 26; y < 31; y++) for (let x = 3; x < 8; x++) if (inE(x, y, 5.5, 28.5, spin === 1 || spin === 3 ? 1.2 : 2.6, 2.6)) F(x, y, x === 4 ? '#fff0a0' : '#f2c84a'); }
      // a companion on the shoulder (the cutlass hand side stays clear)
      if (companion === 'Parrot' || companion === 'Crab' || companion === 'Ship Rat') {
        const right = carry !== 'Cutlass', px0 = right ? 23 : 4, dir = right ? 1 : -1;
        let sy = 22; while (sy < N && !inBody(px0 + 2, sy, 0)) sy++;
        const at = (i, j, col) => F(right ? px0 + i : px0 + 5 - i, sy - 1 - j, col);
        if (companion === 'Parrot') {
          const nod = Math.sin(t * 1.3 + phase) > 0.7 ? 1 : 0, beakC = '#f4efe2';
          for (let j = 0; j < 5; j++) for (let i = 1; i < 4; i++) at(i, j, j === 4 && i === 1 ? '#f2c84a' : parrotCol);
          at(1, 1, '#2a6ad8'); at(0, 0, parrotCol); at(0, -1, parrotCol); at(1, -1, '#f2c84a');
          at(2, 5 - nod, parrotCol); at(3, 5 - nod, parrotCol); at(2, 6 - nod, parrotCol); at(3, 6 - nod, parrotCol);
          at(4, 5 - nod, beakC); at(4, 4 - nod, '#2a2a2a'); at(3, 6 - nod, '#ffffff'); at(3, 6 - nod, t < squawkUntil ? '#ffffff' : K);
          if (t < squawkUntil) { at(5, 5 - nod, beakC); at(5, 4 - nod, '#2a2a2a'); }
        } else if (companion === 'Crab') {
          const pinch = Math.sin(t * 2.4 + phase) > 0.5 ? 1 : 0;
          for (let i = 0; i < 5; i++) at(i, 0, '#d8402a'); for (let i = 1; i < 4; i++) at(i, 1, '#e8582e');
          at(0, 1 + pinch, '#e8582e'); at(4, 1 + pinch, '#e8582e'); at(0, 2 + pinch, '#d8402a'); at(4, 2 + pinch, '#d8402a');
          at(1, 2, '#ffffff'); at(3, 2, '#ffffff'); at(1, 1, K); at(3, 1, K);
        } else {
          for (let i = 0; i < 4; i++) at(i, 0, '#7a7480'); for (let i = 1; i < 4; i++) at(i, 1, '#8e8894');
          at(3, 2, '#8e8894'); at(4, 1, '#8e8894'); at(5, 1, '#e8a8b0'); at(3, 3, '#e8a8b0'); at(4, 2, K);
          const flick = Math.sin(t * 1.8 + phase) > 0 ? 1 : 0;
          F(right ? px0 - 1 : px0 + 6, sy - 1 + flick, '#c89aa0'); F(right ? px0 - 2 : px0 + 7, sy - flick, '#c89aa0');
        }
      }
      // the outline
      for (let y = N - 1; y >= 0; y--) for (let x = 0; x < N; x++) {
        if (fig[y * N + x]) continue;
        if ((x > 0 && fig[y * N + x - 1]) || (x < N - 1 && fig[y * N + x + 1]) || (y > 0 && fig[(y - 1) * N + x]) || (y < N - 1 && fig[(y + 1) * N + x])) grid[y * N + x] = K;
      }
      finish(t);
    }

    // ---------- the legendaries' finishing passes ----------
    let finFlutter = 0, diveAt = -9, glintAt = null, hoverFig = false, laughUntil = -1, shipRock = 0, shipSlosh = false;
    const coins = [], bubbles = [];
    const GOLD = ['#2e1803', '#6e420a', '#b47e18', '#eab83a', '#fff0a0'];
    const lumOf = h => { const n = parseInt(h.slice(1), 16); return 0.3 * (n >> 16 & 255) + 0.59 * (n >> 8 & 255) + 0.11 * (n & 255); };
    const sparks = [[11, 9], [21, 16], [7, 28], [24, 27], [15, 22]];
    function finish(t) {
      if (mer) {
        // the merfolk's tail curling up out of the water behind, flicking now and then
        const flick = t - diveAt < 1.4 ? Math.floor(t * 6) % 2 : Math.sin(t * 0.9 + phase) > 0.85 ? 1 : 0;
        const TAIL = flick ? ['..........', '.TT....TT.', '..tT..Tt..', '...tTTt...', '....tt....', '....tt....', '...ttt....', '...tt.....']
          : ['TT......TT', '.tT....Tt.', '..tT..Tt..', '...tTTt...', '....tt....', '....tt....', '...ttt....', '...tt.....'];
        const tx = 21, ty = 15;
        const at = (i, j) => j >= 0 && j < TAIL.length && i >= 0 && i < 10 && TAIL[j][i] !== '.';
        for (let j = -1; j <= TAIL.length; j++) for (let i = -1; i <= 10; i++) {
          if (at(i, j)) { back(tx + i, ty + j, TAIL[j][i] === 't' ? '#4cc0a4' : '#8af0dc'); continue; }
          if (at(i - 1, j) || at(i + 1, j) || at(i, j - 1) || at(i, j + 1)) { const X = tx + i, Y = ty + j; if (X >= 0 && Y >= 0 && X < N && Y < N && !fig[Y * N + X]) back(X, Y, K); }
        }
        // the sea up to the chest: below the waterline the body shows through, darkened and blued
        for (let x = 0; x < N; x++) {
          const wl = 25 + (Math.sin(x * 0.7 + t * 2.2) > 0.6 ? -1 : 0);
          for (let y = wl; y < N; y++) {
            const i = y * N + x;
            if (y === wl) grid[i] = (x + Math.floor(t * 4)) % 4 ? sea.c[4] : '#ffffff';
            else grid[i] = mixC(grid[i], sea.c[y < 28 ? 2 : 3], 0.62);
          }
        }
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i], u = t - b.t0, by = Math.round(b.y - u * 6);
          if (by < 2 || u > 3) { bubbles.splice(i, 1); continue; }
          back(Math.round(b.x + Math.sin(u * 4 + b.x) * 0.8), by, '#e8fbff');
        }
      }
      if (gold) {
        // cursed gold: every surface turned to stepped gold, lit from the upper left; only the eyes stay alive, an eerie green
        const src = grid.slice();
        const isF = (x, y) => x >= 0 && y >= 0 && x < N && y < N && fig[y * N + x] === 1;
        const sweep = glintAt !== null ? glintAt : ((t * 5) % 70) - 15;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // cell by cell
          const i = y * N + x;
          if (!fig[i]) { if (src[i] === K) grid[i] = '#1c0e02'; continue; }
          if (y >= 12 && y <= 15 && x >= 11 && x <= 21 && (src[i] === '#f8f6f0' || src[i] === iris)) { grid[i] = src[i] === iris ? '#2affb0' : '#d8fff0'; continue; }
          const L = lumOf(src[i]);
          let k = src[i] === K ? 0 : L < 40 ? 1 : L < 95 ? 2 : L < 175 ? 3 : 4;
          if (k > 0) { if (!isF(x - 1, y) || !isF(x, y - 1)) k = Math.min(4, k + 1); else if (!isF(x + 1, y) || !isF(x, y + 1)) k = Math.max(1, k - 1); }
          const band = x + y * 0.6 - sweep;
          grid[i] = k > 1 && Math.abs(band) < 0.9 ? '#ffffff' : k > 1 && Math.abs(band) < 1.9 ? GOLD[4] : GOLD[k];
        }
        sparks.forEach(([sx, sy], k) => {
          const on = Math.sin(t * 1.7 + k * 2.3) > 0.8 || (hoverFig && Math.sin(t * 6 + k) > 0.3);
          if (on && isF(sx, sy)) { grid[sy * N + sx] = '#ffffff'; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (isF(sx + a, sy + b)) grid[(sy + b) * N + sx + a] = GOLD[4]; }
        });
      }
      if (king && (hoverFig || t < laughUntil)) {
        // the captain's gold winks when looked at: buttons, earring, medals, tooth and the brocade all catch the light
        let n = 0;
        for (let i = 0; i < N * N; i++) {
          const col = grid[i];
          if (col === '#f2c84a' || col === '#f2c63e' || col === '#e8b83a' || col === '#fff0a0') { n++; if ((n * 7 + Math.floor(t * 8)) % 9 === 0) grid[i] = '#ffffff'; }
        }
        if (t < laughUntil) for (let k = 0; k < 9; k++) { const x = 26 - Math.floor(k * 0.3), y = 30 - k; if (y >= 0) grid[y * N + x] = '#ffffff'; }
      }
      // gold coins flipped up by a tap on the cursed captain
      for (let i = coins.length - 1; i >= 0; i--) {
        const c0 = coins[i], u = t - c0.t0;
        if (u > 1.6) { coins.splice(i, 1); continue; }
        const x = Math.round(c0.x + c0.vx * u), y = Math.round(c0.y - 14 * u + 16 * u * u), spin = Math.floor(u * 10) % 3;
        back(x, y, spin === 1 ? '#fff0a0' : '#f2c84a'); if (spin !== 1) { back(x + 1, y, '#c89a20'); back(x, y + 1, '#c89a20'); back(x + 1, y + 1, '#8a6410'); }
      }
    }

    const ctx = c.ctx;
    const cell = Math.max(1, Math.floor(S / N)), off = Math.floor((S - cell * N) / 2);
    // an original shanty in the dorian mode, keyed from the end of the hash (no draw above changes)
    const tonic = 50 + parseInt(c.hash.slice(-6, -2), 16) % 9, DOR = [0, 2, 3, 5, 7, 9, 10];
    const deg = k => tonic + 12 * Math.floor(k / 7) + DOR[((k % 7) + 7) % 7];
    const TUNE = [4, 4, 4, 2, 0, 2, 4, 7, 6, 4, 3, 1, 3, 3, 2, 1, 0, -1, 0, 2, 4, 4, 2, 0];
    let line = 0, lastSing = -9;
    function feel(t) {
      const inp = c.input;
      const hx0 = Math.floor((inp.x * S - off) / cell), hy0 = Math.floor((inp.y * S - off) / cell);
      hoverFig = inp.inside && hx0 >= 0 && hy0 >= 0 && hx0 < N && hy0 < N && fig[hy0 * N + hx0] === 1;
      if (gold) glintAt = inp.inside ? hx0 + hy0 * 0.6 : null;
      if (mer) {
        const near = inp.inside && Math.abs(hx0 - 16) < 12 && hy0 < 26;
        if (near && finFlutter < 0.1) c.sound.note(deg(9), { dur: 0.4, vel: 0.08, wave: 'sine', attack: 0.05 });
        finFlutter += ((near ? 1 : 0) - finFlutter) * 0.2;
        if (near && Math.floor(t * 3) !== Math.floor((t - 1 / 30) * 3) && bubbles.length < 8) bubbles.push({ x: 8 + ((Math.floor(t * 3) * 7) % 16), y: 24, t0: t });
        sinkNow = t - diveAt < 1.2 ? Math.round(Math.sin(Math.PI * (t - diveAt) / 1.2) * 8) : 0;
      }
      if (carry === 'Ship in a Bottle') {
        const nearB = inp.inside && hx0 < 13 && hy0 > 22;
        shipRock = Math.round(Math.sin(t * (nearB ? 5 : 1.4)) * (nearB ? 1 : 0.7));
        shipSlosh = t - (feel.slosh || -9) < 0.6 && Math.floor(t * 8) % 2 === 0;
      }
      for (const p of c.input.taps()) {
        const tx0 = Math.floor((p.x * S - off) / cell), ty0 = Math.floor((p.y * S - off) / cell);
        if (carry === 'Ship in a Bottle' && tx0 >= 0 && tx0 <= 12 && ty0 >= 24 && ty0 <= 31) {
          // a clink on the glass and the little sea inside sloshes
          feel.slosh = t;
          c.sound.note(deg(14), { dur: 0.6, vel: 0.12, wave: 'sine' }); c.sound.note(deg(18), { dur: 0.4, vel: 0.05, wave: 'sine', at: 0.01 });
          c.sound.hit('noise', 0.06, { cutoff: 1200, dur: 0.3, at: 0.08 });
          continue;
        }
        if (gold && tx0 >= 0 && ty0 >= 0 && tx0 < N && ty0 < N && fig[ty0 * N + tx0]) {
          // a doubloon flips off the cursed gold with a clink
          if (coins.length < 6) coins.push({ x: tx0, y: ty0, vx: tx0 < 16 ? -3 : 3, t0: t });
          c.sound.hit('click', 0.25);
          c.sound.note(deg(14), { dur: 0.25, vel: 0.14, wave: 'triangle', at: 0.02 });
          c.sound.note(deg(16), { dur: 0.5, vel: 0.1, wave: 'triangle', at: 0.12 });
          continue;
        }
        if (mer && tx0 >= 6 && tx0 < 26 && ty0 >= 2 && ty0 < 26 && t - diveAt > 1.2) {
          // the merfolk dives under and comes back up: a splash and a watery rising chord
          diveAt = t;
          c.sound.hit('noise', 0.2, { cutoff: 900, dur: 0.4 });
          [0, 4, 7, 9].forEach((k, i) => c.sound.note(deg(k + 7), { dur: 0.9, vel: 0.1, wave: 'sine', at: 0.5 + i * 0.09 }));
          continue;
        }
        if (king && tx0 >= 0 && ty0 >= 0 && tx0 < N && ty0 < N && fig[ty0 * N + tx0] && !(tx0 >= 22 && ty0 >= 17 && ty0 <= 27)) {
          // the Pirate King laughs, the parrot joins in, the cutlass flashes
          if (t < laughUntil - 0.6) continue;
          laughUntil = t + 1.1; shoutUntil = t + 0.9; squawkUntil = t + 0.5;
          [9, 8, 7].forEach((k, i) => c.sound.note(deg(k), { dur: 0.16, vel: 0.26, wave: 'sawtooth', cutoff: 1200, at: i * 0.22 }));
          c.sound.note(deg(11), { dur: 0.07, vel: 0.16, wave: 'square', cutoff: 2600, at: 0.75 });
          c.sound.note(deg(9), { dur: 0.1, vel: 0.14, wave: 'square', cutoff: 2400, at: 0.84 });
          continue;
        }
        const gx = tx0, gy = ty0;
        const inG = gx >= 0 && gy >= 0 && gx < N && gy < N;
        const pRight = carry !== 'Cutlass', pX = pRight ? 23 : 4;
        if (companion === 'Parrot' && gx >= pX - 1 && gx <= pX + 6 && gy >= 17 && gy <= 27) {
          if (t < squawkUntil) continue;
          squawkUntil = t + 0.35;
          c.sound.note(deg(11), { dur: 0.07, vel: 0.2, wave: 'square', cutoff: 2600 });
          c.sound.note(deg(9), { dur: 0.12, vel: 0.18, wave: 'square', cutoff: 2400, at: 0.09 });
          continue;
        }
        if (inG && fig[gy * N + gx]) {
          if (t - lastSing < 0.12) continue;
          lastSing = t; shoutUntil = t + 0.4;
          const k = TUNE[line % TUNE.length];
          c.sound.note(deg(k + 7), { dur: 0.38, vel: 0.32, wave: 'sawtooth', cutoff: 1300, attack: 0.03 });
          c.sound.note(deg(k + 9), { dur: 0.38, vel: 0.16, wave: 'square', cutoff: 1000, attack: 0.03 });
          if (line % 4 === 0) c.sound.note(deg(0), { dur: 0.7, vel: 0.18, wave: 'triangle' });
          line++;
        } else if (gy >= 19) {
          if (splashes.length < 6) splashes.push({ x: gx, y: gy, t0: t });
          c.sound.hit('noise', 0.25, { cutoff: 900, dur: 0.35 });
          c.sound.note(deg(Math.floor((gx + 2) / 5)), { dur: 0.2, vel: 0.12, wave: 'sine', at: 0.05 });
        } else {
          if (gulls.length < 5) gulls.push({ x: gx, y: gy, t0: t, dir: gx < 16 ? 1 : -1 });
          c.sound.hit('blip', 0.25, { freq: 1500 });
          c.sound.hit('blip', 0.2, { freq: 1350, at: 0.12 });
        }
      }
    }
    let last = '';
    let tick = -1;
    function show(t) {
      const q = Math.floor(t * 10);
      if (q === tick) return;
      tick = q;
      t = q / 10;
      compose(t);
      const sig = grid.join('');
      if (sig === last) return;
      last = sig;
      // the sea and sky run past the grid into the margins
      for (let y = -2; y < N + 2; y++) for (let x = -2; x < N + 2; x++) {
        const inside = x >= 0 && y >= 0 && x < N && y < N;
        if (inside || off > 0) {
          ctx.fillStyle = inside ? grid[y * N + x] : sky(Math.max(0, Math.min(N - 1, x)), Math.max(0, Math.min(N - 1, y)), t);
          ctx.fillRect(off + x * cell, off + y * cell, cell, cell);
        }
      }
    }
    show(0);
    return t => { feel(t); show(t); };
  },
});

})(window.Proto);
