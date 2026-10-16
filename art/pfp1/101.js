// Rattle Crew: from D:/code/synaesthesia/public/drop03/pieces/101.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Rattle Crew: skeleton folk drawn in a four-colour CGA palette on a 32-cell grid.
Proto.add({
  num: 101,
  name: 'Rattle Crew',
  fam: 'Pixel Portraits II',
  seed: 1000,
  recipe: 'A grinning skeleton drawn in only four colours, the way an old CGA screen could show them, 32 cells across with black outlines and dithered shading. The palette (a rare few glow on an amber or green phosphor monitor, or print on paper white), the skull, eyes, jaw, lid, garb, an accessory, the backdrop and a little pet vary; the head bobs, the jaw chatters and the eye lights flicker.',
  interactive: 'Tap to make it cackle. Hold to light up its eyes.',
  music: true,
  make(c) {
    const W = c.size, pen = c.ctx;
    // mulberry32 over the xor-fold of the hash words
    let st = 0x1234abcd;
    for (let i = 0; i < 8; i++) st = Math.imul(st ^ parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16), 0x9e3779b1) >>> 0;
    function mb() {
      st = st + 0x6D2B79F5 | 0;
      let q = Math.imul(st ^ st >>> 15, 1 | st);
      q = q + Math.imul(q ^ q >>> 7, 61 | q) ^ q;
      return ((q ^ q >>> 14) >>> 0) / 2 ** 32;
    }
    function pick(list) {
      let tot = 0;
      for (const it of list) tot += it[1];
      let r = mb() * tot;
      for (const en of list) { r -= en[1]; if (r < 0) return en[0]; }
      return list[0][0];
    }

    const PAL = {
      'Cyan Magenta': ['#000000', '#55ffff', '#ff55ff', '#ffffff'],
      'Dim Cyan': ['#000000', '#00aaaa', '#aa00aa', '#aaaaaa'],
      'Green Red': ['#000000', '#55ff55', '#ff5555', '#ffff55'],
      'Dim Green': ['#000000', '#00aa00', '#aa0000', '#aa5500'],
      'Cyan Red': ['#000000', '#55ffff', '#ff5555', '#ffffff'],
      'Blue Screen': ['#0000aa', '#55ffff', '#ff55ff', '#ffffff'],
      'Amber Monitor': ['#140800', '#8a4400', '#ff9a1a', '#ffd890'],
      'Green Phosphor': ['#020c02', '#1f6b1f', '#4fd84f', '#b8ffb0'],
      'Paper White': ['#f2f0e6', '#9a9a92', '#d24a3a', '#202020'],
    };
    let palette = pick([['Cyan Magenta', 34], ['Green Red', 26], ['Dim Cyan', 14], ['Dim Green', 12], ['Cyan Red', 9], ['Blue Screen', 5]]);
    let skull = pick([['Classic', 40], ['Long', 20], ['Cracked', 18], ['Horned', 14], ['Third Eye', 8]]);
    let eyes = pick([['Pinpoints', 30], ['Glow', 26], ['Hollow', 14], ['Crosses', 12], ['Hearts', 12], ['Odd Pair', 6]]);
    let jaw = pick([['Grin', 38], ['Gap Tooth', 24], ['Agape', 22], ['Rose', 8], ['Gold Fang', 8]]);
    let garb = pick([['Bare Bones', 26], ['Hoodie', 20], ['Velvet Tux', 18], ['Poncho', 16], ['Turtleneck', 20]]);
    let lid = pick([['None', 30], ['Top Hat', 16], ['Party Hat', 16], ['Bandana', 14], ['Flower Crown', 12], ['Crown', 7], ['Candle', 5]]);
    let murk = pick([['Crypt Bricks', 24], ['Starfield', 22], ['Tombstones', 18], ['Moon', 16], ['Stripes', 14], ['Bright Field', 6]]);
    // a pet and the rare amber monitor: their own little xorshift on the hash's middle, so the rolls above keep their values
    let pq = (parseInt(c.hash.slice(42, 50), 16) ^ 0x1b873593) >>> 0 || 77;
    const pr = () => { pq ^= pq << 7; pq >>>= 0; pq ^= pq >>> 9; pq ^= pq << 8; pq >>>= 0; return pq / 4294967296; };
    if (pr() < 0.04) palette = 'Amber Monitor';
    const pr2 = pr() * 100;
    let pet = pr2 < 58 ? 'None' : pr2 < 76 ? 'Bat' : pr2 < 91 ? 'Spider' : 'Ghost';

    // ---------- the second wardrobe: a counter-hashed stream on another slice of the hash ----------
    // (every roll above keeps its value; these widen the sets and add new axes)
    const cw = parseInt(c.hash.slice(50, 58), 16) >>> 0;
    let ci = 0;
    const cr = () => { let z = (cw + Math.imul(++ci, 0x9e3779b9)) >>> 0; z ^= z >>> 16; z = Math.imul(z, 0x7feb352d); z ^= z >>> 15; z = Math.imul(z, 0x846ca68b); z ^= z >>> 16; return (z >>> 0) / 4294967296; };
    const cpick = list => { let tot = 0; for (const it of list) tot += it[1]; let r = cr() * tot; for (const it of list) { r -= it[1]; if (r < 0) return it[0]; } return list[0][0]; };
    if (palette !== 'Amber Monitor') { const rp = cr(); if (rp < 0.025) palette = 'Green Phosphor'; else if (rp < 0.04) palette = 'Paper White'; }
    if (cr() < 0.38) skull = cpick([['Round', 12], ['Square Jaw', 11], ['Stitched', 9], ['Golden', 2]]);
    if (cr() < 0.35) eyes = cpick([['Flames', 8], ['Stars', 8], ['Sleepy Lids', 8], ['Big Pupils', 8], ['Void', 2]]);
    if (cr() < 0.3) jaw = cpick([['Braces', 9], ['Missing Teeth', 9], ['Tongue Out', 8], ['Buck Teeth', 8], ['Grillz', 2]]);
    if (cr() < 0.4) garb = cpick([['Leather Jacket', 12], ['Striped Sweater', 12], ['Vampire Cape', 10], ['Overalls', 9], ['Scarf & Coat', 9], ['Knight Armor', 3], ['Space Suit', 2]]);
    if (garb === 'Hoodie') lid = 'Hood Up';
    else if (cr() < 0.4 && garb !== 'Space Suit') lid = cpick([['Beanie', 12], ['Witch Hat', 10], ['Cowboy Hat', 9], ['Propeller Cap', 8], ['Mohawk', 7], ['Jester Cap', 3], ['Halo', 3]]);
    if (garb === 'Space Suit') lid = 'Helmet';
    let acc = cpick([['None', 50], ['Bowtie', 8], ['Eyepatch', 7], ['Monocle', 6], ['Gold Chain', 7], ['Earring', 6], ['Lollipop', 6], ['Round Specs', 6]]);
    if (acc === 'Bowtie' && (garb === 'Velvet Tux' || garb === 'Turtleneck' || garb === 'Space Suit')) acc = 'Earring';
    if (acc === 'Lollipop' && jaw === 'Rose') acc = 'Gold Chain';
    if (cr() < 0.4) murk = cpick([['Checkerboard', 12], ['Cobwebs', 12], ['Synth Grid', 10], ['Candles', 10], ['Gothic Window', 9], ['Lightning Storm', 3]]);
    cpick([['Black', 58], ['Blue', 12], ['Dark Grey', 10], ['Brown', 7], ['Magenta', 6], ['Green', 4], ['Bright Blue', 3]]);
    if (cr() < 0.3 && pet === 'None') pet = cpick([['Crow', 10], ['Rat', 10], ['Pumpkin', 9], ['Tiny Skull', 3]]);
    const cj = []; for (let i = 0; i < 24; i++) cj.push(cr());
    // the face: sockets, nose and teeth from a counter-hashed draw on a free slice of the hash (26..34), so every roll above keeps its value
    const fw = parseInt(c.hash.slice(26, 34), 16) >>> 0; let fi = 0;
    const fr = () => { let z = ((fw ^ 0x3c6ef372) + Math.imul(++fi, 0x9e3779b9)) >>> 0; z ^= z >>> 16; z = Math.imul(z, 0x21f0aaad); z ^= z >>> 15; z = Math.imul(z, 0x735a2d97); z ^= z >>> 15; return (z >>> 0) / 4294967296; };
    const fpick = list => { let tot = 0; for (const it of list) tot += it[1]; let r = fr() * tot; for (const it of list) { r -= it[1]; if (r < 0) return it[0]; } return list[0][0]; };
    const sockS = fpick([['Round', 26], ['Tall', 18], ['Angry', 16], ['Sad', 16], ['Squint', 14], ['Big Cracked', 10]]);
    const nose = fpick([['Square', 28], ['Triangle', 26], ['Heart', 26], ['Slits', 20]]);
    const teeth = fpick([['Even', 28], ['Small', 20], ['Broad', 18], ['Fangs', 18], ['Chompers', 16]]);
    const bigSide = fr() < 0.5 ? 0 : 1;
    // a Golden skull (and gold grillz) is drawn on the amber monitor, the one palette that has real gold in it
    if (skull === 'Golden' || jaw === 'Grillz') palette = 'Amber Monitor';

    // ---------- legendaries: an FNV-1a fold of the whole hash text, stepped by its own mixer ----------
    // (a stream of its own, so every ordinary mint above keeps every value it had)
    let lv = 0x811c9dc5 ^ 0x52617474;
    for (let i = 2; i < c.hash.length; i++) lv = Math.imul(lv ^ c.hash.charCodeAt(i), 0x01000193) >>> 0;
    const lgr = () => { lv = (lv + 0xa0761d65) >>> 0; let z = Math.imul(lv ^ (lv >>> 15), 0xe7037ed1) >>> 0; z = Math.imul(z ^ (z >>> 13), 0x8ebc6af1) >>> 0; return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const lu = lgr(), lp = lgr(), lc2 = lgr();
    const legend = lu < 0.0022 ? (lp < 0.42 ? 'Crystal Skull' : lp < 0.76 ? 'Dragon Skull' : 'The Reaper') : 'None';
    if (legend === 'None' && lc2 < 0.005) acc = 'Soul Lantern';
    if (legend !== 'None') palette = { 'Crystal Skull': 'Cyan Magenta', 'Dragon Skull': 'Cyan Red', 'The Reaper': 'Green Red' }[legend];
    // crystal facets: seeds in head space, each tilted its own way (fixed count, whatever was rolled)
    const facets = [];
    for (let j = 0; j < 9; j++) for (let i = 0; i < 6; i++) {
      const fx = 6 + i * 4 + (j & 1) * 2 + (lgr() - 0.5) * 2.4, fy = -11 + j * 3.7 + (lgr() - 0.5) * 2;
      const nx = (fx - 16) / 10 + (lgr() - 0.5) * 1.3, ny = (fy - 2) / 12 + (lgr() - 0.5) * 1.3, l = Math.hypot(nx, ny, 0.7);
      facets.push([fx, fy, nx / l, ny / l, 0.7 / l]);
    }
    // each legendary still varies: its palette, what lies behind it, the colour of its eye lights, and a pet (all from this stream)
    const LPAL = { 'Crystal Skull': ['Cyan Magenta', 'Blue Screen', 'Cyan Red'], 'Dragon Skull': ['Cyan Red', 'Green Red', 'Amber Monitor'], 'The Reaper': ['Green Red', 'Amber Monitor', 'Cyan Magenta'] };
    const LBACK = { 'Crystal Skull': ['Vault', 'Starfield', 'Gothic Window', 'Synth Grid'], 'Dragon Skull': ['Ember Cave', 'Moon', 'Lightning Storm', 'Tombstones'], 'The Reaper': ['Harvest Moon', 'Tombstones', 'Cobwebs', 'Lightning Storm'] };
    const lv1 = lgr(), lv2 = lgr(), lv3 = lgr(), lv4 = lgr();
    let legBack = 'None', eyeLight = 'Ember', EL = 2;
    if (legend !== 'None') {
      palette = LPAL[legend][Math.floor(lv1 * 3)];
      legBack = LBACK[legend][Math.floor(lv2 * 4)];
      if (legBack !== LBACK[legend][0]) murk = legBack;
      eyeLight = ['Ember', 'White', 'Pale'][Math.floor(lv3 * 3)]; EL = { Ember: 2, White: 3, Pale: 1 }[eyeLight];
      pet = ['None', 'Bat', 'Spider', 'Ghost', 'Crow', 'Rat', 'Pumpkin', 'Tiny Skull'][Math.floor(lv4 * 8)];
    }
    // a mark on the bone (ordinary mints): its own little stream on a middle slice of the hash
    let mk = (parseInt(c.hash.slice(18, 26), 16) ^ 0x5851f42d) >>> 0;
    const mrr = () => { mk = (Math.imul(mk ^ (mk >>> 13), 0x5bd1e995) + 0x6c078965) >>> 0; mk = (mk ^ (mk >>> 15)) >>> 0; return mk / 4294967296; };
    mrr();
    const mark = (() => { let r = mrr() * 100; for (const [v, w] of [['None', 30], ['Rune', 13], ['Bolt', 13], ['Tally Marks', 11], ['Cheek Star', 12], ['Cheek Heart', 11], ['Teardrop', 10]]) { r -= w; if (r < 0) return v; } return 'None'; })();

    // the head's build: a murmur-mixed draw on a slice of the hash, so every roll above keeps its value
    let hb = (parseInt(c.hash.slice(34, 42), 16) ^ 0x2f6b9e1d) >>> 0;
    hb = Math.imul(hb ^ (hb >>> 16), 0x7feb352d) >>> 0; hb = Math.imul(hb ^ (hb >>> 15), 0x846ca68b) >>> 0; hb = (hb ^ (hb >>> 16)) >>> 0;
    const head = (() => { let r = hb / 4294967296 * 100; for (const [v, w] of [['Standard', 28], ['Big Dome', 18], ['Gaunt', 19], ['Lantern Jaw', 18], ['Squat', 17]]) { r -= w; if (r < 0) return v; } return 'Standard'; })();

    const cols0 = PAL[palette];
    if (legend !== 'None') { c.trait('Legendary', legend); c.trait('Palette', palette); c.trait('Backdrop', legBack); c.trait('Eye Light', eyeLight); c.trait('Pet', pet); }
    else {
      c.trait('Palette', palette);
      c.trait('Skull', skull);
      c.trait('Head', head);
      c.trait('Eyes', eyes);
      c.trait('Jaw', jaw);
      c.trait('Sockets', sockS);
      c.trait('Nose', nose);
      c.trait('Teeth', teeth);
      c.trait('Headwear', lid);
      c.trait('Garb', garb);
      c.trait('Accessory', acc);
      c.trait('Backdrop', murk);
      c.trait('Pet', pet);
      c.trait('Mark', mark);
    }

    const stars = [];
    for (let i = 0; i < 26; i++) stars.push([Math.floor(mb() * 32), Math.floor(mb() * 24), mb() * 6.283, mb() < 0.3 ? 2 : 3]);
    const stones = [];
    for (let i = 0; i < 4; i++) stones.push([Math.floor(mb() * 5) + (i < 2 ? i * 4 : 23 + (i - 2) * 4), 2 + Math.floor(mb() * 3)]);
    const moonLeft = mb() < 0.5;
    const chatterAt = mb() * 5, chatterGap = 3.5 + mb() * 3, bobPhase = mb() * 6.283;
    const glowSwap = 0.25 + mb() * 0.3;

    // the cackle's own little PC-speaker tune, from the far end of the hash so no draw above moves
    let lc = parseInt(c.hash.slice(58, 66), 16) >>> 0;
    const lcg = () => (lc = (Math.imul(lc, 1664525) + 1013904223) >>> 0) / 2 ** 32;
    const scales = [[0, 3, 5, 6, 7, 10], [0, 1, 4, 5, 7, 8, 10], [0, 2, 3, 5, 7, 8, 11]];
    const scale = scales[Math.floor(lcg() * scales.length)], root = 57 + Math.floor(lcg() * 7);
    let cackleAt = -9, cackleLen = 0, lastT = 0, blaze = 0, held = 0, gazeX = 0, gazeY = 0;
    let flareAt = -9, legAt = -9, legX = 0.5, pointer = null, glintAt = -9, lastFacet = -1, wasIn = false;
    function cackle(px) {
      cackleAt = lastT; cackleLen = 0.9;
      const steps = 6, top = 1 + Math.floor(lcg() * 3);
      for (let k = 0; k !== steps; k++) {
        const deg = top * 2 + 6 - k, oct = Math.floor(deg / scale.length);
        const m = root + oct * 12 + scale[((deg % scale.length) + scale.length) % scale.length];
        c.sound.note(m, { at: k * 0.075, dur: 0.06, vel: 0.32 - k * 0.03, wave: 'square', cutoff: 2400, pan: (px - 0.5) * 0.8 });
      }
      c.sound.hit('click', 0.35, { at: 0.02 });
      c.sound.hit('click', 0.25, { at: 0.17 });
      c.sound.hit('click', 0.2, { at: 0.32 });
    }

    const N = 32;
    const cols = cols0.map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
    const backG = new Uint8Array(N * N);
    const fig = new Int8Array(N * N);
    // which cells are bone (the skull and jaw), so their shaded edge can be kept off the backdrop
    const boneM = new Uint8Array(N * N); let boneOn = 0;
    // the busy backdrops thin to sparse dots in the two cells round the figure, so nothing melts into them
    const busy = murk === 'Crypt Bricks' || murk === 'Synth Grid' || murk === 'Cobwebs' || murk === 'Checkerboard', near = new Uint8Array(N * N);
    const tile = document.createElement('canvas'); tile.width = N; tile.height = N;
    const tg = tile.getContext('2d'), img = tg.createImageData(N, N);

    // ---------- the skull, as rows of half-widths (from the centre line between cells 15 and 16) ----------
    const SK = {
      Classic: [[-10, 4], [-9, 6], [-8, 7], [-7, 8], [-6, 8], [-5, 9], [-4, 9], [-3, 9], [-2, 9], [-1, 9], [0, 8], [1, 8], [2, 9], [3, 8], [4, 7], [5, 6]],
      Long: [[-12, 4], [-11, 6], [-10, 7], [-9, 8], [-8, 8], [-7, 8], [-6, 9], [-5, 9], [-4, 9], [-3, 9], [-2, 9], [-1, 9], [0, 8], [1, 8], [2, 9], [3, 8], [4, 7], [5, 6]],
      Round: [[-10, 5], [-9, 7], [-8, 8], [-7, 9], [-6, 10], [-5, 10], [-4, 10], [-3, 10], [-2, 10], [-1, 10], [0, 9], [1, 9], [2, 9], [3, 8], [4, 7], [5, 6]],
      'Square Jaw': [[-10, 4], [-9, 6], [-8, 7], [-7, 8], [-6, 8], [-5, 9], [-4, 9], [-3, 9], [-2, 9], [-1, 9], [0, 9], [1, 9], [2, 9], [3, 9], [4, 8], [5, 8]],
    };
    // the head's build changes its outline: a swollen dome, a long gaunt skull, a heavy lantern jaw, or a low squat one
    const stretchUp = (rows, k) => { const m = new Map(rows), top = rows[0][0], out = []; for (let d = Math.round(top * k); d < 0; d++) out.push([d, m.get(Math.max(top, Math.min(-1, Math.round(d / k))))]); for (const r of rows) if (r[0] >= 0) out.push(r); return out; };
    const base = SK[skull] || SK.Classic, tall = skull === 'Long' ? base : stretchUp(base, 1.2);
    const crown = head === 'Big Dome' ? tall.map(([dy, w], k) => [dy, dy < 0 ? Math.min(12, w + (k < 2 ? 1 : 2)) : w])
      : head === 'Gaunt' ? tall.map(([dy, w]) => [dy, dy < 0 ? Math.max(2, w - 2) : w - 1])
      : head === 'Lantern Jaw' ? base.map(([dy, w]) => [dy, dy >= 0 ? Math.min(11, w + 2) : w])
      : head === 'Squat' ? stretchUp(base, skull === 'Long' ? 0.6 : 0.7).map(([dy, w]) => [dy, dy < 3 ? Math.min(11, w + 1) : w])
      : base;
    let lowerJaw = skull === 'Square Jaw' ? [[7, 8], [8, 8], [9, 7]] : skull === 'Round' ? [[7, 6], [8, 5], [9, 3]] : [[7, 6], [8, 5], [9, 4]];
    if (head === 'Gaunt') lowerJaw = lowerJaw.map(([dy, w]) => [dy, w - 1]);
    if (head === 'Lantern Jaw') lowerJaw = [...lowerJaw.map(([dy, w]) => [dy, Math.min(10, w + 2)]), [10, lowerJaw[2][1]]];
    const wAt = dy => { for (const r of crown) if (r[0] === dy) return r[1]; return 8; };
    const crownTop = crown[0][0];
    const boneHi = skull === 'Golden' ? 2 : 3, boneLo = 1;

    // the backdrop does not move except a few lights, so build it per frame anyway (it is tiny)
    function paintBack(t) {
      const base = murk === 'Bright Field' ? 1 : 0;
      backG.fill(base);
      if (murk === 'Crypt Bricks') {
        for (let i = 0; i !== N * N; i++) {
          const x = i % N, y = (i / N) | 0, row = y >> 2, sx = (x + (row % 2) * 3) % 6;
          if (y % 4 === 3 || sx === 0) backG[i] = 1;
        }
      } else if (murk === 'Starfield') {
        for (const s of stars) {
          const on = Math.sin(t * 1.3 + s[2]) > -0.6;
          if (on) backG[s[1] * N + s[0]] = s[3];
        }
      } else if (murk === 'Tombstones') {
        for (let i = 27 * N; i < N * N; i++) backG[i] = 1;
        for (const s of stones) {
          const h = 5 + s[1];
          for (let y = 27 - h; y < 27; y++) for (let x = s[0]; x < s[0] + 4; x++) {
            const top = y === 27 - h && (x === s[0] || x === s[0] + 3);
            if (!top && x >= 0 && x < N) backG[y * N + x] = 3;
          }
          if (s[0] + 1 >= 0) backG[(27 - h + 2) * N + s[0] + 1] = 0, backG[(27 - h + 2) * N + s[0] + 2] = 0;
        }
      } else if (murk === 'Moon') {
        const mx = moonLeft ? 3.6 : 28.4, my = 4;
        for (let i = 0; i < 14 * N; i++) {
          const x = i % N, y = (i / N) | 0, d = (x + 0.5 - mx) ** 2 + (y + 0.5 - my) ** 2;
          if (d < 11) backG[i] = d > 5 && (x + y) % 2 ? 1 : 3;
        }
        backG[3 * N + Math.floor(mx) - 1] = 1; backG[5 * N + Math.floor(mx) + 1] = 1;
      } else if (murk === 'Stripes') {
        for (let i = 0; i !== N * N; i++) { const x = i % N, y = (i / N) | 0; if ((x + y) % 6 < 2) backG[i] = 2; }
      } else if (murk === 'Checkerboard') {
        for (let i = 0; i !== N * N; i++) { const x = i % N, y = (i / N) | 0; if ((((x >> 2) + (y >> 2)) & 1) && ((x + y) & 1)) backG[i] = 1; }
      } else if (murk === 'Cobwebs') {
        const web = (x, y) => { if (x >= 0 && x < N && y >= 0 && y < N) backG[y * N + x] = 1; };
        for (const [cx, sx] of [[0, 1], [31, -1]]) {
          for (let k = 0; k < 3; k++) { const a = (0.18 + k * 0.32) * Math.PI / 2; for (let r = 1; r < 10; r++) web(Math.round(cx + sx * Math.cos(a) * r), Math.round(Math.sin(a) * r)); }
          for (const rr of [4, 7.5]) for (let k = 0; k <= 24; k++) { const f = k / 24 * 2, seg = f - Math.floor(f), a = (0.18 + f * 0.32) * Math.PI / 2, r = rr - Math.sin(seg * Math.PI) * 1.1; web(Math.round(cx + sx * Math.cos(a) * r), Math.round(Math.sin(a) * r)); }
        }
      } else if (murk === 'Synth Grid') {
        for (let i = 2 * N; i < 19 * N; i++) { const x = i % N, y = (i / N) | 0, d = (x + 0.5 - 16) ** 2 + (y + 0.5 - 18) ** 2; if (d < 150 && !(y > 10 && y % 3 === 0)) backG[i] = 2; }
        for (let x = 0; x < N; x++) backG[19 * N + x] = 1;
        const scroll = (t * 0.6) % 1;
        for (let k = 0; k < 5; k++) { const y = Math.floor(20 + (k + scroll) ** 1.6 * 1.1); if (y < N) for (let x = 0; x < N; x++) backG[y * N + x] = 1; }
        for (let k = -6; k <= 6; k++) for (let y = 20; y < N; y++) { const x = Math.round(16 + k * (y - 18) * 0.55); if (x >= 0 && x < N) backG[y * N + x] = 1; }
      } else if (murk === 'Candles') {
        for (const cx of [2, 28]) {
          for (let y = 23; y < N; y++) { backG[y * N + cx] = 3; backG[y * N + cx + 1] = (y & 1) ? 3 : 1; }
          const fl = Math.sin(t * 7 + cx) + Math.sin(t * 11.3 + cx * 2) > 0.3 ? 1 : 0;
          backG[22 * N + cx] = 2; backG[22 * N + cx + 1] = 2; backG[(21 - fl) * N + cx + fl] = 2; backG[20 * N + cx + (fl ? 1 : 0)] = 3;
        }
      } else if (murk === 'Gothic Window') {
        const x0 = moonLeft ? 1 : 23, mid = x0 + 4;
        for (let y = 1; y < 19; y++) for (let x = x0; x < x0 + 8; x++) {
          const half = y < 6 ? (y - 0.6) * 0.82 : 4;
          const dx = Math.abs(x + 0.5 - mid);
          if (dx > half) continue;
          const rim = dx > half - 1 || y === 18;
          backG[y * N + x] = rim ? 3 : (x === mid || x === mid - 1 || y === 11) ? 0 : ((x + y) & 1 ? 1 : 0);
        }
        backG[5 * N + x0 + 2] = 3; backG[6 * N + x0 + 2] = 3; backG[6 * N + x0 + 1] = 3; backG[7 * N + x0 + 2] = 3;
      } else if (murk === 'Lightning Storm') {
        for (let k = 0; k < 18; k++) { const x = (cj[k] * 32 + t * 9) % 32 | 0, y = (cj[(k + 5) % 24] * 32 + t * 22 + k * 7) % 32 | 0; backG[y * N + x] = 1; if (y + 1 < N) backG[(y + 1) * N + ((x + 31) % 32)] = 1; }
        const ph = (t + cj[3] * 7) % 7.5;
        if (ph < 0.35) {   // one slow flash every few seconds, never a strobe
          for (let i = 0; i < N * N; i++) if (backG[i] === 0 && ((i % N) + ((i / N) | 0)) % 2 === 0) backG[i] = 1;
          let bx = moonLeft ? 5 : 26; for (let y = 0; y < 18; y++) { backG[y * N + bx] = 3; if (y % 3 === 2) bx += (y % 2 ? 1 : -1); }
        }
      } else {
        for (let i = 0; i !== N * N; i++) { const x = i % N, y = (i / N) | 0; if ((x * 7 + y * 3) % 11 === 0) backG[i] = 3; }
      }
    }

    function put(x, y, v) {
      if (v >= 0 && x >= 0 && y >= 0 && x < N && y < N) { fig[y * N + x] = v; boneM[y * N + x] = boneOn; }
    }
    function oval(cx, cy, rx, ry, fn) {
      for (let yy = Math.floor(cy - ry); yy <= cy + ry; yy++) for (let xx = Math.floor(cx - rx); xx <= cx + rx; xx++) {
        const ux = (xx + 0.5 - cx) / rx, uy = (yy + 0.5 - cy) / ry;
        if (ux * ux + uy * uy <= 1) put(xx, yy, typeof fn === 'function' ? fn(xx, yy) : fn);
      }
    }
    function bar(x0, y0, x1, y1, v) {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(x, y, v);
    }
    // bone shading: lit from the upper left, with a checker dither between light and shade
    function bone(x, y, w, dy) {
      const lx = (x + 0.5 - 12.5) / (w * 1.25), lyy = (dy + 4.5) / 12.5, s2 = lx * lx + lyy * lyy;
      // gold: a pale gleam, polished orange and a brown turn into shadow
      if (skull === 'Golden') return s2 < 0.2 ? 3 : s2 < 0.38 ? ((x + y) & 1 ? 3 : 2) : s2 < 0.7 ? 2 : s2 < 0.92 ? ((x + y) & 1 ? 2 : 1) : 1;
      return s2 < 0.42 ? boneHi : s2 < 0.72 ? ((x + y) & 1 ? boneHi : boneLo) : s2 < 0.95 && ((x * 3 + y) % 4 === 0) ? boneHi : boneLo;
    }

    function paintFigure(t) {
      fig.fill(-1); boneM.fill(0);
      const since = t - cackleAt, cackling = since < cackleLen;
      const by = cackling ? (since < 0.12 ? -1 : Math.floor(since * 10) % 2 ? 1 : 0) : Math.sin(t * 1.6 + bobPhase) > 0.55 ? 1 : 0;
      const ct = (t + chatterAt) % chatterGap;
      const chat = cackling ? Math.floor(since * 14) % 2 : ct < 0.5 && Math.floor(ct * 8) % 2 === 0 ? 1 : 0;
      const hy = 13 + by + (crownTop < -10 ? 2 : 0);   // a long skull sits lower so its lid stays in frame
      const top = hy + crownTop;
      // high collars and helmets sit behind the head
      if (garb === 'Vampire Cape') {
        for (let y = 15; y < 27; y++) { const s = Math.floor((27 - y) * 0.45); for (let x = 4 - s; x < 16; x++) put(x, y, x === 4 - s ? 1 : 2); for (let x = 16; x <= 27 + s; x++) put(x, y, x === 27 + s ? 1 : 2); }
      }
      if (lid === 'Helmet') {
        for (let i = 0; i !== N * N; i++) { const x = i % N, y = (i / N) | 0, d = Math.hypot(x + 0.5 - 16, y + 0.5 - (hy - 1)); if (d < 13.6 && d >= 12.6) put(x, y, 3); else if (d < 12.6 && y < 26) put(x, y, ((x + y) & 1) && d > 11.4 ? 1 : 0); }
        put(9, hy - 8, 3); put(10, hy - 9, 3); put(8, hy - 6, 3);
      }
      // shoulders and garb
      const shoulder = (y) => 7 + Math.min(8, Math.floor((y - 26) * 1.6));
      if (garb !== 'Bare Bones') {
        for (let y = 26; y < N; y++) {
          const w = shoulder(y);
          for (let x = 16 - w; x !== 16 + w; x++) {
            const dx = Math.abs(x - 15.5);
            let v = 2;
            if (garb === 'Poncho') v = [2, 1, 3, 1][Math.floor((y - 26 + (x % 2)) / 1.5) % 4];
            else if (garb === 'Velvet Tux') v = dx < (y - 25) * 0.9 ? 3 : dx < (y - 25) * 0.9 + 2 ? 1 : 2;
            else if (garb === 'Turtleneck') v = (x + y) % 4 === 0 ? 1 : 2;
            else if (garb === 'Leather Jacket') v = dx < 1 && y > 27 ? 3 : dx < (y - 25) * 0.7 + 1 && dx > (y - 25) * 0.7 - 0.5 ? 0 : (x + y) % 5 === 0 ? 3 : 1;
            else if (garb === 'Striped Sweater') v = (y & 1) ? 2 : 3;
            else if (garb === 'Vampire Cape') v = dx < (y - 24) * 0.6 ? 2 : 1;
            else if (garb === 'Overalls') v = dx < 5 && y > 27 ? 2 : dx > 4 && dx < 6 ? 2 : 1;
            else if (garb === 'Scarf & Coat') v = (x - 16 + 32) % 8 === 0 && y > 27 ? 0 : 1;
            else if (garb === 'Knight Armor') v = (y - 26) % 2 === 0 ? 3 : (dx > 4 && dx < 6) ? 1 : (x & 1 ? 1 : 3);
            else if (garb === 'Space Suit') v = dx > 9 ? 1 : (dx < 3 && y > 28) ? 2 : 3;
            put(x, y, v);
          }
        }
        if (garb === 'Velvet Tux') { bar(14, 26, 17, 26, 2); put(15, 27, 0); put(16, 27, 0); }
        if (garb === 'Hoodie') { bar(13, 27, 13, 30, 3); bar(18, 27, 18, 30, 3); }
        if (garb === 'Overalls') { put(13, 29, 3); put(18, 29, 3); bar(11, 26, 20, 27, 3); }
        if (garb === 'Leather Jacket') { put(12, 26, 1); put(19, 26, 1); put(11, 25, 1); put(20, 25, 1); }
        if (garb === 'Knight Armor') { bar(12, 24, 19, 26, 1); for (let x = 12; x <= 19; x += 2) put(x, 25, 3); }
        if (garb === 'Space Suit') { bar(12, 25, 19, 26, 1); put(14, 29, 0); put(17, 29, 0); }
      }
      // hood behind the skull
      if (garb === 'Hoodie') {
        oval(16, hy, 12.5, 12.5, 2);
        oval(16, hy + 1, 10.5, 10.8, 0);
        for (let i = 0; i < N * 26; i++) { const x = i % N, y = (i / N) | 0; if (fig[i] === 2 && x > 21 && (x + y) % 2 === 0) fig[i] = 1; }
      }
      // neck: little vertebrae
      for (let y = 22 + by; y < 27; y++) { put(15, y, y % 2 ? 3 : 1); put(16, y, y % 2 ? 3 : 1); }
      if (garb === 'Turtleneck') bar(12, 24, 19, 27, 2);
      if (garb === 'Scarf & Coat') { bar(12, 24, 19, 26, 2); for (let y = 27; y < 31; y++) { put(18, y, 2); put(19, y, y % 2 ? 3 : 2); } }
      if (garb === 'Bare Bones') {
        for (let i = 0; i < 9; i++) { put(14 - i, 27 + (i > 4 ? 1 : 0), 3); put(17 + i, 27 + (i > 4 ? 1 : 0), 3); }
        for (let y = 28; y < N; y++) { put(15, y, 3); put(16, y, 3); }
        for (const ry of [29, 31]) for (let x = 9; x < 23; x++) if (x < 14 || x > 17) put(x, ry, x === 9 || x === 22 ? 1 : 3);
      }
      // horns go behind the cranium edge
      if (skull === 'Horned') {
        const hl = 15 - wAt(-6), hr = 16 + wAt(-6);
        // real horns: thick at the temple, curling out and up to a point
        for (const [r, a, b] of [[0, -1, 1], [-1, -2, 0], [-2, -3, -1], [-3, -4, -3], [-4, -4, -4]]) for (let x = hl + a; x <= hl + b; x++) {
          const v = x === hl + b && r > -3 ? 1 : 3;
          put(x, hy - 6 + r, v); put(31 - x, hy - 6 + r, x === hl + a ? 1 : v === 1 ? 3 : 3);
        }
      }
      // the cranium and upper face, row by row
      boneOn = 1;
      for (const [dy, w] of crown) { const y = hy + dy; for (let x = 16 - w; x < 16 + w; x++) put(x, y, bone(x, y, w, dy)); }
      boneOn = 0;
      // a mark on the bone: on the brow, or on the cheek
      const browFree = skull !== 'Third Eye' && skull !== 'Stitched';
      if (mark === 'Rune' && browFree) { for (let y = -8; y <= -4; y++) put(16, hy + y, 2); put(15, hy - 7, 2); put(17, hy - 6, 2); put(15, hy - 5, 2); }
      else if (mark === 'Bolt' && browFree) for (const [x, y] of [[17, -9], [16, -8], [15, -7], [16, -7], [17, -6], [16, -5], [15, -4]]) put(x, hy + y, 2);
      else if (mark === 'Tally Marks' && browFree) { for (const x of [12, 13, 14, 15]) { put(x, hy - 6, 2); put(x, hy - 5, 2); } put(16, hy - 6, 2); put(11, hy - 5, 2); }
      else if (mark === 'Cheek Star' || (mark !== 'None' && !browFree && mark !== 'Cheek Heart' && mark !== 'Teardrop')) { put(10, hy + 2, 2); put(9, hy + 3, 2); put(10, hy + 3, 3); put(11, hy + 3, 2); put(10, hy + 4, 2); }
      else if (mark === 'Cheek Heart') { put(20, hy + 2, 2); put(22, hy + 2, 2); bar(20, hy + 3, 22, hy + 3, 2); put(21, hy + 4, 2); }
      else if (mark === 'Teardrop') { put(11, hy + 2, 2); put(11, hy + 3, 2); put(10, hy + 3, 2); put(11, hy + 4, 2); }
      // cheek hollows under the cheekbones
      // (one cell in from the edge, so the rim of the skull stays light against the backdrop)
      put(17 - wAt(3), hy + 3, boneLo); put(17 - wAt(4), hy + 4, boneLo); put(14 + wAt(3), hy + 3, boneLo); put(14 + wAt(4), hy + 4, boneLo);
      // the soul lantern lights the near cheek
      if (acc === 'Soul Lantern') for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0; if (fig[i] === boneLo && x >= 18 && x <= 26 && y >= hy - 7 && y <= hy + 10 && (x + y) & 1) fig[i] = boneHi; }
      // teeth, the mouth and the hinged lower jaw
      const drop = (jaw === 'Agape' ? 1 : 0) + chat;
      const tA = teeth === 'Small' ? 12 : teeth === 'Broad' ? 10 : 11, tB = 31 - tA, tPer = teeth === 'Broad' || teeth === 'Chompers' ? 3 : 2;
      const toothRow = (y, gaps) => { for (let x = tA; x <= tB; x++) put(x, y, gaps && (x - tA) % tPer === tPer - 1 ? 0 : x > tB - 2 ? boneLo : boneHi); };
      toothRow(hy + 5, true);
      for (let k = 0; k <= drop; k++) for (let x = tA; x <= tB; x++) put(x, hy + 6 + k, 0);
      const ly = hy + 7 + drop;
      toothRow(ly, true);
      if (teeth === 'Fangs') { put(tA + 1, hy + 6, boneHi); put(tB - 1, hy + 6, boneLo); }
      boneOn = 1;
      for (const [dy, w0] of lowerJaw) { const w = w0 + (teeth === 'Chompers' ? 1 : 0); const y = hy + dy + 1 + drop; for (let x = 16 - w; x < 16 + w; x++) put(x, y, bone(x, y, w, dy)); }
      boneOn = 0;
      if (jaw === 'Gap Tooth') { put(15, hy + 5, 0); put(16, hy + 5, 0); }
      if (jaw === 'Gold Fang') { put(13, hy + 5, 2); put(13, hy + 6, 2); put(13, ly, 2); }
      if (jaw === 'Braces') for (let x = 11; x <= 20; x++) { put(x, hy + 5, x % 2 ? 1 : 2); put(x, ly, x % 2 ? 1 : 2); }
      if (jaw === 'Missing Teeth') { put(13, hy + 5, 0); put(18, ly, 0); put(19, hy + 5, 0); }
      if (jaw === 'Buck Teeth') { put(15, hy + 6, 3); put(16, hy + 6, 3); put(15, hy + 5, 3); put(16, hy + 5, 3); }
      if (jaw === 'Grillz') for (let x = 11; x <= 20; x++) { if (fig[(hy + 5) * N + x] > 0) put(x, hy + 5, x % 3 ? 2 : 3); if (fig[ly * N + x] > 0) put(x, ly, x % 3 ? 2 : 3); }
      if (jaw === 'Tongue Out') { bar(15, hy + 6, 16, ly + 2, 2); put(15, ly + 3, 1); put(16, ly + 3, 2); }
      if (jaw === 'Rose') {
        for (let x = 7; x < 14; x++) put(x, hy + 6 + drop, 1);
        put(9, hy + 5 + drop, 1); put(11, hy + 7 + drop, 1);
        oval(6, hy + 5.5 + drop, 2.3, 2.3, 2);
        put(5, hy + 5 + drop, 3); put(6, hy + 6 + drop, 0);
      }
      // shaped sockets (rounder above, heavier at the inner lower corner) and the nose
      // (rows of [row from the eye line, outer cell, inner cell], counted from the outer edge of each socket)
      const SOCK = {
        Round: [[-2, 1, 2], [-1, 0, 3], [0, 0, 3], [1, 1, 3]],
        Tall: [[-3, 1, 2], [-2, 0, 3], [-1, 0, 3], [0, 0, 3], [1, 1, 3]],
        Angry: [[-3, 0, 0], [-2, 0, 1], [-1, 0, 2], [0, 0, 3], [1, 1, 3]],
        Sad: [[-3, 3, 3], [-2, 2, 3], [-1, 1, 3], [0, 0, 3], [1, 0, 2]],
        Squint: [[0, 0, 3], [1, 1, 3]],
        Big: [[-3, 1, 3], [-2, 0, 4], [-1, 0, 4], [0, 0, 4], [1, 1, 4]],
      };
      for (const side of [0, 1]) {
        const shape = sockS === 'Big Cracked' ? (side === bigSide ? 'Big' : 'Round') : sockS, X = o => side ? 21 - o : 10 + o;
        for (const [r, a, b] of SOCK[shape]) for (let o = a; o <= b; o++) put(X(o), hy + r, 0);
        if (shape === 'Big') for (const [o, r] of [[1, -4], [0, -5], [0, -6], [-1, -7], [-1, -8]]) put(X(o), hy + r, 0);
      }
      if (nose === 'Square') bar(15, hy + 2, 16, hy + 3, 0);
      else if (nose === 'Triangle') { bar(15, hy + 2, 16, hy + 2, 0); bar(14, hy + 3, 17, hy + 3, 0); }
      else if (nose === 'Heart') { bar(14, hy + 2, 17, hy + 2, 0); bar(15, hy + 3, 16, hy + 3, 0); }
      else { bar(14, hy + 2, 14, hy + 3, 0); bar(17, hy + 2, 17, hy + 3, 0); }
      if (skull === 'Cracked') {
        const path = [[21, hy - 9], [21, hy - 8], [20, hy - 7], [21, hy - 6], [22, hy - 5], [22, hy - 4]], cdx = wAt(-6) - 8;
        for (const p of path) put(p[0] + cdx, p[1], 0);
      }
      if (skull === 'Stitched') { const sw = wAt(-6); for (let x = 17 - sw; x <= 14 + sw; x++) put(x, hy - 6, x % 2 ? 0 : boneLo); for (let x = 18 - sw; x <= 14 + sw; x += 3) { put(x, hy - 7, 0); put(x, hy - 5, 0); } }
      if (skull === 'Third Eye') {
        oval(16, hy - 5.5, 1.6, 1.5, 0);
        put(Math.floor(t * 2) % 3 === 0 ? 16 : 15, hy - 6, 2);
      }
      // eye lights, glancing toward the pointer
      const gx = gazeX, gyy = gazeY;
      const dark = blaze < 0.5 && (t * 0.37 + chatterAt) % 4.7 < 0.14;
      const glowC = blaze > 0.5 ? 2 : Math.floor(t / glowSwap) % 7 === 0 ? 2 : 1;
      const hy0 = hy;
      for (const [ex, side] of [[10, 0], [18, 1]]) {
        const hy = hy0 + (sockS === 'Squint' ? 1 : 0);
        if (acc === 'Eyepatch' && side === 0) continue;
        if (dark && eyes !== 'Hollow' && eyes !== 'Void') break;
        const mode = eyes === 'Odd Pair' ? (side ? 'Glow' : 'Pinpoints') : eyes;
        const cx = ex + 1 + side + gx, cy = hy + gyy;
        if (blaze > 0.5 && eyes !== 'Hearts' && eyes !== 'Crosses') { bar(ex, hy - 1, ex + 3, hy, 2); put(cx, cy, 3); continue; }
        if (mode === 'Pinpoints') put(cx, cy, 3);
        else if (mode === 'Glow') { bar(cx - 1 + (gx < 0 ? 0 : 1) * 0, hy - 1 + Math.max(0, gyy), cx, hy + Math.max(0, gyy), glowC); put(cx, cy - 1 + Math.max(0, gyy), 3); }
        else if (mode === 'Crosses') { put(ex + 1, hy - 1, 2); put(ex + 3, hy - 1, 2); put(ex + 2, hy, 2); put(ex + 1, hy + 1, 2); put(ex + 3, hy + 1, 2); }
        else if (mode === 'Hearts') { put(ex + 1, hy - 1, 2); put(ex + 3, hy - 1, 2); bar(ex + 1, hy, ex + 3, hy, 2); put(ex + 2, hy + 1, 2); }
        else if (mode === 'Big Pupils') { bar(cx - 1, hy - 1, cx, hy, 3); put(cx, hy - 1, 0); }
        else if (mode === 'Stars') { put(ex + 2, hy - 2, 3); put(ex + 1, hy - 1, 3); put(ex + 2, hy - 1, 2); put(ex + 3, hy - 1, 3); put(ex + 2, hy, 3); }
        else if (mode === 'Sleepy Lids') { bar(ex, hy - 2, ex + 3, hy - 1, boneLo); put(cx, hy, 3); }
        else if (mode === 'Flames') {
          const f = Math.floor(t * 8 + side * 3) % 3;
          put(ex + 2, hy, 2); put(ex + 1 + (f === 0 ? 0 : 1), hy - 1, 2); put(ex + 1 + (f === 2 ? 2 : 1), hy - 2, 3); put(ex + 2, hy - 3 - (f & 1), 2);
        } else if (mode === 'Void') { if (Math.sin(t * 1.4 + side * 2) > -0.2) put(ex + 1 + side, hy - 1, 3); put(ex + 2 - side, hy + 1, 1); }
      }
      // accessories on the face and neck
      if (acc === 'Eyepatch') { bar(10, hy - 2, 13, hy + 1, 2); put(11, hy - 1, 1); for (let k = 0; k < 9; k++) put(13 + k, hy - 3 - Math.floor(k / 3), 2); }
      else if (acc === 'Monocle') { for (const [dx, dy] of [[-3, -1], [-3, 0], [-3, 1], [2, -1], [2, 0], [2, 1], [-2, -2], [-1, -3], [0, -3], [1, -2], [-2, 2], [-1, 3], [0, 3], [1, 2]]) put(20 + dx, hy + dy, 3); for (let k = 1; k < 7; k++) put(22 + (k > 3 ? 1 : 0), hy + 2 + k, 1); }
      else if (acc === 'Round Specs') { for (const ex of [12, 20]) for (const [dx, dy] of [[-3, -1], [-3, 0], [2, -1], [2, 0], [-2, -2], [-1, -3], [0, -3], [1, -2], [-2, 1], [-1, 2], [0, 2], [1, 1]]) put(ex + dx, hy + dy, 3); bar(14, hy - 2, 17, hy - 2, 3); }
      else if (acc === 'Earring') { const ex = 16 - crown[crown.length - 3][1] - 1; put(ex, hy + 3, 2); put(ex, hy + 4, 2); put(ex + 1, hy + 5, 2); put(ex - 1, hy + 5, 2); put(ex, hy + 6, 2); }
      else if (acc === 'Lollipop') { for (let k = 0; k < 5; k++) put(20 + k, hy + 6 - Math.floor(k / 2), 3); oval(27, hy + 2.5, 2.4, 2.4, 2); put(27, hy + 2, 3); put(26, hy + 3, 3); }
      else if (acc === 'Bowtie') { bar(12, 25, 13, 27, 2); bar(18, 25, 19, 27, 2); bar(14, 26, 17, 26, 2); put(15, 26, 3); put(16, 26, 3); }
      else if (acc === 'Soul Lantern') {
        // a bony hand holds up a bright lantern beside the jaw; inside, a soul burns, leans toward the pointer and lights the cheek
        for (let y = 26; y < N; y++) { put(27, y, 3); put(28, y, y % 2 ? 1 : 3); }
        bar(26, 25, 29, 25, 3); bar(25, 24, 30, 24, 3); put(27, 24, 1); put(29, 24, 1); put(25, 23, 3); put(30, 23, 3);
        put(27, 10, 3); put(28, 10, 3); put(26, 11, 3); put(29, 11, 3);
        bar(26, 12, 29, 12, 3); bar(25, 13, 30, 13, 1); bar(25, 22, 30, 22, 1); bar(26, 23, 29, 23, 3);
        for (let y = 14; y <= 21; y++) { put(25, y, 3); put(30, y, 3); }
        const flare = t - flareAt < 0.9, fh = 3 + (Math.sin(t * 3.1) > 0 ? 1 : 0);
        const lean = pointer ? (pointer[0] < 26 ? -1 : pointer[0] > 29 ? 1 : 0) : Math.round(Math.sin(t * 1.3));
        bar(26, 14, 29, 21, flare ? 3 : 2);
        bar(27, 21 - fh, 28, 21, 3); put(27 + (lean > 0 ? 1 : 0), 20 - fh, 3); if (Math.sin(t * 5.3) > -0.2) put(27 + (lean > 0 ? 1 : 0) + lean, 19 - fh, 3);
        put(27, 21, 2); put(28, 21, 2);
        // a glint winks off the lantern's corner
        const gl = (t * 0.8) % 2.2;
        if (gl < 0.5) { const gx = 24, gy = 11, r = gl < 0.25 ? 1 : 2; put(gx, gy, 3); for (let k = 1; k <= r; k++) { put(gx - k, gy, 3); put(gx + k, gy, 3); put(gx, gy - k, 3); put(gx, gy + k, 3); } }
        if (flare) { const k = Math.floor((t - flareAt) * 12); put(28 + (k & 1 ? 1 : -1), 9 - Math.min(9, k), 3); put(28, 10 - Math.min(10, k), 2); }
      }
      else if (acc === 'Gold Chain') { for (let k = 0; k < 11; k++) { const x = 11 + k, y = 27 + Math.round(Math.sin(k / 10 * Math.PI) * 2); put(x, y, k % 2 ? 2 : 3); } put(16, 30, 2); put(15, 30, 2); put(16, 31, 3); }
      // lid
      if (lid === 'Top Hat') {
        bar(11, top - 3, 20, top + 1, 2);
        bar(11, top, 20, top, 3);
        bar(7, top + 2, 24, top + 2, 2);
        for (let y = top - 3; y <= top + 1; y++) put(19, y, 1);
      } else if (lid === 'Party Hat') {
        for (let y = 0; y < 8; y++) {
          const hw = Math.floor(y * 0.75);
          for (let x = 16 - hw - 1; x <= 15 + hw + 1; x++) put(x, top - 6 + y, (x + y) % 3 === 0 ? 3 : 2);
        }
        put(15, top - 7, 1); put(16, top - 7, 1); put(15, top - 8, 1);
      } else if (lid === 'Bandana') {
        const bEnd = Math.min(top + 5, hy - 4);
        for (let y = top; y <= bEnd; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (i >= 0 && (fig[i] === boneHi || fig[i] === boneLo)) fig[i] = (x + y) % 4 === 0 ? 3 : 2;
        }
        for (let x = 4; x <= 27; x++) if (fig[(bEnd + 1) * N + x] >= 0) put(x, bEnd + 1, 2);
        const kx = 16 + wAt(bEnd - hy);
        put(kx + 1, bEnd, 2); put(kx + 2, bEnd - 1, 2); put(kx + 2, bEnd + 1, 2); put(kx + 3, bEnd + 2, 2);
      } else if (lid === 'Flower Crown') {
        for (let k = 0; k < 5; k++) {
          const fx = Math.floor(9 + k * 3.5), fy = top + 2 + Math.round(Math.abs(k - 2) * 0.9);
          const v = k % 2 ? 1 : 2;
          put(fx - 1, fy, v); put(fx + 1, fy, v); put(fx, fy - 1, v); put(fx, fy + 1, v);
          put(fx, fy, 3);
        }
      } else if (lid === 'Crown') {
        bar(10, top - 1, 21, top + 1, 2);
        for (const px of [10, 13, 18, 21]) { put(px, top - 2, 2); put(px, top - 3, 2); }
        put(15, top - 2, 2); put(16, top - 2, 2); put(15, top - 3, 3); put(16, top - 3, 3); put(15, top - 4, 2); put(16, top - 4, 2);
        put(12, top, 1); put(19, top, 1);
      } else if (lid === 'Candle') {
        bar(15, top - 3, 17, top + 1, 3);
        put(17, top - 3, 1); put(14, top + 1, 3); put(18, top, 3);
        const fl = Math.sin(t * 9) + Math.sin(t * 13.1) > 0.4 ? 1 : 0;
        put(16, top - 4, 2); put(16, top - 5 - fl, 2); put(15 + fl, top - 5, 3);
        if (fl) put(16, top - 7, 2);
      } else if (lid === 'Beanie') {
        for (let y = 0; y < 5; y++) { const hw = [5, 7, 8, 9, 9][y]; for (let x = 16 - hw; x < 16 + hw; x++) put(x, top - 2 + y, y === 4 ? ((x & 1) ? 3 : 2) : (x + y) % 4 === 0 ? 1 : 2); }
        bar(15, top - 4, 16, top - 3, 3); put(14, top - 3, 3); put(17, top - 3, 3);
      } else if (lid === 'Witch Hat') {
        bar(4, top + 1, 27, top + 2, 1); bar(6, top + 3, 25, top + 3, 1);
        for (let y = 0; y < 9; y++) { const hw = Math.max(1, 7 - y); const sh = Math.floor(y * y / 14); for (let x = 16 - hw + sh; x < 16 + hw + sh; x++) put(x, top - y, 1); }
        bar(10, top - 1, 21, top, 2); put(15, top, 3); put(16, top - 1, 3);
      } else if (lid === 'Cowboy Hat') {
        bar(5, top + 1, 26, top + 1, 2); put(4, top, 2); put(27, top, 2); put(3, top - 1, 2); put(28, top - 1, 2);
        for (let y = 0; y < 5; y++) { const hw = 6 - (y > 3 ? 1 : 0); for (let x = 16 - hw; x < 16 + hw; x++) put(x, top - y, y === 1 ? 1 : 2); }
        put(15, top - 4, 0); put(16, top - 4, 0);
      } else if (lid === 'Propeller Cap') {
        for (let y = 0; y < 4; y++) { const hw = [5, 7, 8, 9][y]; for (let x = 16 - hw; x < 16 + hw; x++) put(x, top - 1 + y, ((x >> 2) + y) & 1 ? 2 : 1); }
        bar(16, top + 2, 26, top + 2, 1);
        put(15, top - 2, 3); put(16, top - 2, 3); put(15, top - 3, 3); put(16, top - 3, 3);
        const f = Math.floor(t * (3 + blaze * 10)) % 2;
        if (f) bar(11, top - 4, 20, top - 4, 2); else for (let k = 0; k < 4; k++) { put(13 + k, top - 7 + k, 2); put(18 - k, top - 7 + k, 3); }
      } else if (lid === 'Mohawk') {
        for (let k = 0; k < 7; k++) { const x = 13 + k, h = 2 + ((k * 5) % 3) + (k === 3 ? 2 : 0); for (let y = 0; y < h; y++) put(x, top - y, y === h - 1 ? 3 : 2); }
      } else if (lid === 'Jester Cap') {
        for (let y = top - 2; y <= top; y++) for (let x = 11; x < 21; x++) put(x, y, x < 16 ? 2 : 1);
        for (let k = 0; k < 7; k++) { const yy = top - k + Math.floor(k * k / 8); put(10 - k, yy, 2); put(9 - k, yy, (k & 1) ? 1 : 2); put(21 + k, yy, 1); put(22 + k, yy, (k & 1) ? 2 : 1); }
        for (let x = 8; x < 24; x++) put(x, top + 1, (x & 2) ? 3 : 2);
        put(2, top - 1, 3); put(2, top, 3); put(29, top - 1, 3); put(29, top, 3);
      } else if (lid === 'Halo') {
        bar(12, top - 4, 19, top - 4, 3); put(10, top - 3, 3); put(11, top - 3, 3); put(20, top - 3, 3); put(21, top - 3, 3); bar(12, top - 2, 19, top - 2, 2);
      }
      // the shaded side of the bone never touches the backdrop: an edge cell in shade turns light, inside the black rim
      for (let i = 0; i < N * N; i++) {
        if (!boneM[i] || fig[i] !== boneLo) continue;
        const x = i % N, y = (i / N) | 0;
        if ((x > 0 && fig[i - 1] < 0) || (x < N - 1 && fig[i + 1] < 0) || (y > 0 && fig[i - N] < 0) || (y < N - 1 && fig[i + N] < 0)) fig[i] = boneHi;
      }
    }

    // the pet, drawn last so it sits in front
    function sprite(rows, x0, y0, map) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const v = map[r[i]]; if (v !== undefined) put(x0 + i, y0 + j, v); } }); }
    function paintPet(t) {
      if (pet === 'Bat') {
        // an eight-dot bat, two flap frames, bobbing in the corner
        const up = Math.floor(t * 5) % 2 === 0, by = 5 + (Math.sin(t * 1.7) > 0 ? 0 : 1);
        sprite(up ? ['X......X', 'XX.XX.XX', 'XXXooXXX', '...XX...'] : ['...XX...', '.XXooXX.', 'XXXXXXXX', 'X......X'], 1, by, { X: 2, o: 3 });
      } else if (pet === 'Spider') {
        const sy = 9 + Math.round(Math.sin(t * 0.8) * 2), sx = acc === 'Soul Lantern' ? 4 : 27;
        for (let y = 0; y < sy; y++) put(sx, y, 1);
        put(sx, sy, 2); put(sx + 1, sy, 2); put(sx, sy + 1, 2); put(sx + 1, sy + 1, 2);
        put(sx, sy + 1, 3);
        for (const ly of [sy, sy + 1]) { put(sx - 1, ly + (ly === sy ? -1 : 1), 1); put(sx + 2, ly + (ly === sy ? -1 : 1), 1); }
      } else if (pet === 'Ghost') {
        const gy = 14 + Math.round(Math.sin(t * 1.2) * 1);
        sprite(['..XX..', '.XXXX.', 'XoXXoX', 'XXXXXX', 'XXXXXX', Math.floor(t * 3) % 2 ? 'X.XX.X' : '.XX.XX'], 1, gy, { X: 3, o: 0 });
      } else if (pet === 'Crow') {
        const hop = Math.sin(t * 2.1) > 0.85 ? -1 : 0;
        sprite(['..XX..', '.XoXk.', 'XXXX..', 'XXXX..', '.XX...', '.l.l..'], acc === 'Soul Lantern' ? 1 : 24, (acc === 'Soul Lantern' ? 12 : 20) + hop, { X: 1, o: 3, k: 2, l: 2 });
      } else if (pet === 'Rat') {
        const tail = Math.floor(t * 2) % 2;
        sprite(['.e....', 'XoXX..', 'XXXXX.', '.l.l' + (tail ? 'tt' : '.t'), tail ? '......' : '.....t'], 3, 22, { X: 1, o: 3, e: 1, l: 1, t: 2 });
      } else if (pet === 'Pumpkin') {
        sprite(['...s..', '.XXXX.', 'XoXXoX', 'XXXXXX', 'XmmmmX', '.XXXX.'], 0, 25, { X: 2, o: 0, m: 0, s: 1 });
        if (Math.sin(t * 2.3) > 0.6) { put(1, 27, 3); put(4, 27, 3); }
      } else if (pet === 'Tiny Skull') {
        const fy = 4 + Math.round(Math.sin(t * 1.1) * 1);
        sprite(['.XXX.', 'XXXXX', 'X.X.X', '.XXX.', '.X.X.'], 25, fy, { X: 3 });
      }
    }

    // ---------- the legendaries, each drawn from scratch in the same four colours ----------
    function motion(t) {
      const since = t - cackleAt, cackling = since < cackleLen;
      const by = cackling ? (since < 0.12 ? -1 : Math.floor(since * 10) % 2 ? 1 : 0) : Math.sin(t * 1.6 + bobPhase) > 0.55 ? 1 : 0;
      const ct = (t + chatterAt) % chatterGap;
      const chat = cackling ? Math.floor(since * 14) % 2 : ct < 0.5 && Math.floor(ct * 8) % 2 === 0 ? 1 : 0;
      return [by, chat];
    }
    const glass = new Uint8Array(N * N);
    const facetAt = (x, dy) => { let best = 0, bd = 1e9; for (let k = 0; k < facets.length; k++) { const f = facets[k], d = (x + 0.5 - f[0]) ** 2 + (dy + 0.5 - f[1]) ** 2 * 1.2; if (d < bd) { bd = d; best = k; } } return best; };
    function legendBack(t) {
      const own = legBack === LBACK[legend][0];
      if (own) backG.fill(0); else paintBack(t);
      if (legend === 'Crystal Skull') {
        // a dark vault: a dithered halo behind the skull and a few slow glints
        for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, d = Math.hypot(x + 0.5 - 16, y + 0.5 - 14); if (d > 13 && d < 15.5 && (x + y) % 2 === 0) backG[i] = 1; else if (d >= 15.5 && d < 17 && (x + y * 3) % 4 === 0) backG[i] = 1; }
        if (own) for (const s of stars) if (Math.sin(t * 1.1 + s[2]) > 0.7) backG[s[1] * N + s[0]] = 3;
        const since = t - legAt;
        if (since < 1.1) {
          // the chime's ring of split light, spreading out from the skull
          const r = since * 26;
          for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, dx = x + 0.5 - 16, dy = y + 0.5 - 14, d = Math.hypot(dx, dy); if (Math.abs(d - r) < 1.2) backG[i] = [3, 1, 2][((Math.atan2(dy, dx) * 3 / Math.PI + 6) | 0) % 3]; }
        }
      } else if (legend === 'Dragon Skull') {
        // a cave lit red from below, embers drifting up
        if (own) for (let i = 18 * N; i < N * N; i++) { const x = i % N, y = (i / N) | 0, k = (y - 18) / 14; if (((x * 5 + y * 3) % 7) / 7 < k * 0.9 && (x + y) % 2) backG[i] = 2; }
        for (const s of stars) { const y = Math.floor((s[1] + 8 - t * (1.5 + s[3])) % 32 + 32) % 32, x = (s[0] + Math.round(Math.sin(t + s[2]) * 1.2) + 32) % 32; backG[y * N + x] = y > 20 ? 3 : 2; }
      } else {
        // a huge harvest moon behind the hood, its seas dithered in
        for (let i = 0; i < N * N; i++) { // each cell of the vault
          const x = i % N, y = (i / N) | 0, d = Math.hypot(x + 0.5 - 16, y + 0.5 - 11.5);
          if (d < 15.6) backG[i] = d > 14.7 ? ((x + y) & 1 ? 3 : 1) : ((Math.hypot(x - 6, y - 8) < 3.2 || Math.hypot(x - 26, y - 19) < 3.4 || Math.hypot(x - 24, y - 4) < 2 || Math.hypot(x - 5, y - 21) < 2) && (x + y) & 1) ? 1 : 3;
        }
        if (own) for (const s of stars) if (Math.hypot(s[0] - 16, s[1] - 11.5) > 16.5 && Math.sin(t * 0.9 + s[2]) > 0) backG[s[1] * N + s[0]] = 1;
      }
    }
    function legendFigure(t) {
      fig.fill(-1);
      const [by, chat] = motion(t);
      const hot = blaze > 0.5 || pointer;
      if (legend === 'Crystal Skull') {
        const hy = 13 + by;
        // the skull and a ribcage of the same crystal (9 marks crystal; facets are shaded below)
        for (const [dy, w] of SK.Classic) for (let x = 16 - w; x < 16 + w; x++) put(x, hy + dy, 9);
        put(8, hy + 3, 9); put(23, hy + 3, 9);
        for (let y = 22 + by; y < 27; y++) { put(15, y, 9); put(16, y, 9); }
        for (let i = 0; i < 9; i++) { put(14 - i, 27 + (i > 4 ? 1 : 0), 9); put(17 + i, 27 + (i > 4 ? 1 : 0), 9); }
        for (let y = 28; y < N; y++) { put(15, y, 9); put(16, y, 9); }
        for (const ry of [29, 31]) for (let x = 8; x < 24; x++) if (x < 14 || x > 17) put(x, ry, 9);
        const drop = chat;
        for (let x = 11; x <= 20; x++) put(x, hy + 5, (x - 11) % 2 ? 0 : 9);
        for (let k = 0; k <= drop; k++) for (let x = 11; x <= 20; x++) put(x, hy + 6 + k, 0);
        for (let x = 11; x <= 20; x++) put(x, hy + 7 + drop, (x - 11) % 2 ? 0 : 9);
        for (const [dy, w] of [[7, 6], [8, 5], [9, 4]]) for (let x = 16 - w; x < 16 + w; x++) put(x, hy + dy + 1 + drop, 9);
        // light: from the pointer when it hovers, else a slow sweep; a tap floods it for a moment
        let lx, ly;
        if (pointer) { lx = (pointer[0] - 16) / 12; ly = (pointer[1] - 13) / 12; } else { lx = Math.cos(t * 0.45) * 0.7; ly = Math.sin(t * 0.45) * 0.35 - 0.35; }
        const ll = Math.hypot(lx, ly, 0.75), flood = t - legAt < 0.25 ? 0.35 : 0;
        let top = -1, topS = -9, lowS = 9;
        const raw = facets.map((f, k) => { const s = (f[2] * lx + f[3] * ly + f[4] * 0.75) / ll; if (s > topS) { topS = s; top = k; } if (s < lowS) lowS = s; return s; });
        // spread the facets over the whole range, so the cut always reads
        const shade = raw.map(s => Math.min(1.2, (s - lowS) / (topS - lowS + 1e-6) + flood));
        for (let i = 0; i < N * N; i++) glass[i] = fig[i] === 9 ? 1 : 0;
        for (let i = 0; i < N * N; i++) { // each cell of the vault
          if (!glass[i]) continue;
          const x = i % N, y = (i / N) | 0, dy = y - hy, k = facetAt(x, dy), s = shade[k];
          const edge = (x > 0 && glass[i - 1] && facetAt(x - 1, dy) !== k) || (y > 0 && glass[i - N] && facetAt(x, dy - 1) !== k);
          let v = s > 0.82 ? 3 : s > 0.62 ? ((x + y) & 1 ? 3 : 1) : s > 0.42 ? 1 : s > 0.22 ? ((x + y) & 1 ? 1 : 2) : 2;
          if (edge) v = s > 0.5 ? 1 : 3;
          fig[i] = v;
        }
        // deep sockets with a gleam that follows the pointer, and a nose cut into the crystal
        const sockets = [[[11, 12], [10, 13], [10, 13], [11, 13]], [[19, 20], [18, 21], [18, 21], [18, 20]]];
        for (const s of sockets) s.forEach(([a, b], k) => { for (let x = a; x <= b; x++) put(x, hy - 2 + k, 0); });
        bar(15, hy + 2, 16, hy + 3, 0);
        for (const ex of [11, 19]) { put(ex + 1 + gazeX, hy + gazeY, hot ? (EL === 3 ? 2 : 3) : EL); if (blaze > 0.5) put(ex + 1 + gazeX, hy - 1 + gazeY, 2); }
        // a four-point star where the light catches hardest
        const f = facets[top], sx = Math.round(f[0]), sy = Math.round(hy + f[1]);
        if (sy > 0 && fig[sy * N + sx] > 0 && (pointer || Math.sin(t * 2.3) > 0)) { put(sx, sy, 3); put(sx - 1, sy, 3); put(sx + 1, sy, 3); put(sx, sy - 1, 3); put(sx, sy + 1, 3); }
        if (top !== lastFacet && pointer && t - glintAt > 0.22) { glintAt = t; c.sound.note(root + 24 + scale[(top * 3) % scale.length], { dur: 0.25, vel: 0.05, wave: 'sine' }); }
        lastFacet = top;
      } else if (legend === 'Dragon Skull') {
        const hy = by;
        // bone lit from the upper left: white, a dithered turn, then cyan in the shade, with plate seams
        const shadeB = (x, y, w, y0) => { const u = (x + 0.5 - (16 - w)) / (2 * w) + (y - y0) * 0.012; return u < 0.42 ? ((y - y0) % 4 === 3 && u > 0.12 ? 1 : 3) : u < 0.6 ? ((x + y) & 1 ? 3 : 1) : u > 0.9 && (x + y) & 1 ? 0 : 1; };
        // horns sweeping out and up from the temples, behind the cranium
        for (const s of [-1, 1]) for (let k = 0; k < 11; k++) {
          const x = 16 + s * (9.5 + k * 0.62) - (s < 0 ? 1 : 0), y = hy + 7 - k * 0.78 - (k > 7 ? (k - 7) * 0.5 : 0);
          put(Math.round(x), Math.round(y), k > 8 ? 3 : (k % 3) ? 3 : 1);
          if (k < 8) put(Math.round(x), Math.round(y) + 1, 1);
          if (k < 5) { put(Math.round(x - s), Math.round(y) + 1, 3); put(Math.round(x - s), Math.round(y) + 2, 1); }
        }
        // a crest of spikes along the top
        for (const x of [11, 14, 17, 20]) { put(x, hy + 2, 1); put(x, hy + 1, 3); }
        // cranium, then the long snout narrowing down the frame
        const rows = [5, 8, 9, 10, 11, 11, 11, 11, 10, 10, 9, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5];
        rows.forEach((w, r) => { const y = hy + 3 + r; for (let x = 16 - w; x < 16 + w; x++) put(x, y, shadeB(x, y, w, hy + 3)); });
        // brow ridges over slanted, angry sockets
        for (let x = 7; x <= 13; x++) { put(x, hy + 7 + (x > 11 ? 1 : 0), 3); put(31 - x, hy + 7 + (x > 11 ? 1 : 0), 3); }
        const sock = [[8, 10], [8, 12], [10, 12]];
        sock.forEach(([a, b], k) => { for (let x = a; x <= b; x++) { put(x, hy + 9 + k, 0); put(31 - x, hy + 9 + k, 0); } });
        // the embers in the sockets: they swell and turn toward the pointer
        for (const [ex, s] of [[10, -1], [21, 1]]) {
          const gx = ex + Math.max(-1, Math.min(1, gazeX)) * (s < 0 ? 1 : 1);
          put(gx, hy + 10, EL);
          if (hot) { put(gx, hy + 10, EL === 3 ? 2 : 3); put(gx - 1, hy + 10, EL); put(gx + 1, hy + 10, EL); put(gx, hy + 9, EL); }
          else if (Math.sin(t * 2.1 + s) > 0.4) put(gx, hy + 10, 3);
        }
        // the ridge down the snout, and two nostril slits
        for (let y = hy + 13; y < hy + 21; y++) put(y % 2 ? 15 : 16, y, 1);
        for (const nx of [13, 18]) { put(nx, hy + 21, 0); put(nx, hy + 22, 0); if (hot) put(nx, hy + 22, 2); }
        // teeth, a dark gape, the lower jaw and four long fangs
        const drop = chat + (t - legAt < 1 ? 1 : 0);
        for (let x = 11; x <= 20; x++) put(x, hy + 24, (x & 1) ? 3 : 0);
        for (let k = 1; k <= drop; k++) for (let x = 11; x <= 20; x++) put(x, hy + 24 + k, 0);
        for (const [w, r] of [[5, 0], [5, 1], [4, 2], [3, 3]]) { const y = hy + 25 + drop + r; for (let x = 16 - w; x < 16 + w; x++) put(x, y, r === 0 ? ((x & 1) ? 3 : 0) : shadeB(x, y, w, hy + 20)); }
        for (const fx of [11, 20]) { for (let k = 0; k < 3 + Math.min(drop, 1); k++) put(fx, hy + 24 + k, 3); put(fx + (fx < 16 ? 1 : -1), hy + 26 + drop, 3); }
        // the neck's vertebrae going down out of frame
        for (let y = hy + 29 + drop; y < N; y++) { put(15, y, y % 2 ? 3 : 1); put(16, y, y % 2 ? 3 : 1); put(14, y, y % 2 ? 1 : -1); put(17, y, y % 2 ? 1 : -1); }
        // fire: a burst out of the jaws after a tap, front first, then embers
        const since = t - legAt;
        if (since < 1.1) {
          // it billows toward you: a ball of flame swelling from the jaws, tongues licking up, then breaking into embers
          const r = Math.min(15, since * 40), fade = since > 0.6 ? (since - 0.6) * 2 : 0, mx = 16, my = hy + 26;
          for (let i = 0; i < N * N; i++) { // each cell of the vault
            const x = i % N, y = (i / N) | 0, dx = x + 0.5 - mx, dy = (y + 0.5 - my) * 1.25, a = Math.atan2(dy, dx);
            if (y < hy + 14) continue;
            const edge = r * (0.8 + 0.25 * Math.sin(a * 5 + t * 9)) * (dy < 0 ? 0.75 : 1), d = Math.hypot(dx, dy);
            if (d > edge) continue;
            let n = Math.imul(x * 0x9e37 ^ y * 0x7f4b ^ Math.floor(t * 18) * 0x3c6e, 0x2c1b3c6d) >>> 0; n = ((n ^ (n >>> 15)) >>> 0) % 7;
            if (fade > 0 && n < fade * 7) continue;
            fig[i] = d < edge * 0.45 ? (n < 5 ? 3 : 2) : d < edge * 0.8 ? (n < 4 ? 2 : 3) : (n < 3 ? 2 : -1);
          }
        }
      } else {
        const hy = 12 + by;
        // the robe and its deep hood, black against the moon, rimmed in moonlight
        for (let y = 1; y < N; y++) {
          const w = y < 8 ? [1, 3, 5, 6, 7, 8, 8][y - 1] : y < 21 ? 8.5 + (y > 14 ? (y - 14) * 0.3 : 0) : Math.min(15.5, 10.5 + (y - 20) * 1.1);
          for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) {
            const fromL = x - Math.round(16 - w);
            // black cloth, a thin moonlit fold or two
            put(x, y, (y > 22 && (x === 12 || x === 20)) ? 1 : 0);
          }
        }
        // the lip of the hood over a void, and a skull deep inside it
        oval(16, hy + 1.6, 6, 7.2, (x, y) => y < hy - 1 && (x + y) & 1 ? 1 : 0);
        oval(16, hy + 2.3, 5, 6.6, 0);
        const sk = [[-2, 4], [-1, 5], [0, 5], [1, 5], [2, 5], [3, 4], [4, 4]];
        for (const [dy, w] of sk) for (let x = 16 - w; x < 16 + w; x++) { const lit = x < 16 - w + 3 || dy < 0; put(x, hy + 2 + dy, lit ? 3 : ((x + dy) & 1 ? 3 : 1)); }
        // sockets that burn red, and look where the pointer is
        for (const ex of [13, 18]) { bar(ex, hy + 1, ex + 1, hy + 2, 0); put(ex + (gazeX > 0 ? 1 : 0), hy + 1 + (gazeY < 0 ? 0 : 1), EL); if (hot) { put(ex, hy + 1, EL); put(ex + 1, hy + 1, EL); } }
        put(15, hy + 4, 0); put(16, hy + 4, 0);
        for (let x = 12; x <= 19; x++) put(x, hy + 6, (x & 1) ? 0 : 3);
        for (let k = 0; k < chat; k++) for (let x = 12; x <= 19; x++) put(x, hy + 7 + k, 0);
        for (let x = 13; x <= 18; x++) put(x, hy + 7 + chat, (x & 1) ? 1 : 3);
        // the scythe: a long handle gripped low, the blade curving over the hood; a tap swings it
        const since = t - legAt, sw = since < 0.8 ? Math.sin(Math.min(1, since / 0.8) * Math.PI) * 1.15 : 0;
        const blade = (th, val, edge) => {
          const dx = Math.sin(th), dy = -Math.cos(th), px = -Math.cos(th), py = -Math.sin(th), pv = [25.5, 29.5];
          const topX = pv[0] + dx * 27, topY = pv[1] + dy * 27;
          if (val >= 0) for (let k = -3; k < 28; k++) put(Math.round(pv[0] + dx * k), Math.round(pv[1] + dy * k), k % 7 === 2 ? 3 : 1);
          for (let k = 0; k <= 22; k++) {
            const s = k / 22, bx = topX + px * s * 16 + dx * (1.2 - s * s * 6), byy = topY + py * s * 16 + dy * (1.2 - s * s * 6);
            put(Math.round(bx), Math.round(byy), edge);
            if (val >= 0) for (const o of s < 0.55 ? [1, 2, 2.9] : s < 0.85 ? [1, 1.9] : [1]) put(Math.round(bx - dx * o), Math.round(byy - dy * o), o > 2.5 ? 0 : val);
          }
        };
        const th0 = -0.16;
        if (sw > 0.05) { blade(th0 - sw * 0.55, -1, 1); blade(th0 - sw * 0.8, -1, 1); }
        blade(th0 - sw, 2, 3);
        // bony hands on the handle
        for (const [hx, hyy] of [[24, 22], [25, 28]]) { bar(hx - 1, hyy, hx + 1, hyy + 1, 3); put(hx - 1, hyy + 1, 1); }
      }
    }

    function render(t) {
      if (legend !== 'None') { legendBack(t); legendFigure(t); paintPet(t); }
      else {
        paintBack(t);
        if (acc === 'Soul Lantern') {
          // a pool of light round the lantern, mostly up into the dark above it; it breathes with the flame and swells on a flare
          const r0 = 7.4 + (Math.sin(t * 3.1) > 0 ? 0.7 : 0) + (t - flareAt < 0.9 ? 2.5 : 0);
          for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, d = Math.hypot((x + 0.5 - 27.5) * 1.1, (y + 0.5 - 15) * 0.62); if (d < r0 - 2.6) backG[i] = (x * 5 + y * 3) % 7 === 0 ? 3 : 2; else if (d < r0) backG[i] = (x + y) & 1 ? 0 : 2; else if (d < r0 + 1.6 && (x * 3 + y) % 4 === 0) backG[i] = 2; }
        }
        paintFigure(t);
        paintPet(t);
      }
      if (busy) {
        near.fill(0);
        for (let i = 0; i < N * N; i++) if (fig[i] >= 0) { const x = i % N, y = (i / N) | 0; for (let b = Math.max(0, y - 3); b <= Math.min(N - 1, y + 3); b++) for (let a = Math.max(0, x - 3); a <= Math.min(N - 1, x + 3); a++) near[b * N + a] = 1; }
        for (let i = 0; i < N * N; i++) if (near[i] && fig[i] < 0 && backG[i]) { const x = i % N, y = (i / N) | 0; if ((x + y) % 4 !== 0 || (x & 1)) backG[i] = 0; }
      }
      const d = img.data;
      for (let i = 0, p = 0; i < N * N; i++, p += 4) {
        let v = fig[i];
        if (v < 0) {
          const x = i % N, y = (i - x) / N;
          const edge = (x > 0 && fig[i - 1] >= 0) || (x < N - 1 && fig[i + 1] >= 0) || (y > 0 && fig[i - N] >= 0) || (y < N - 1 && fig[i + N] >= 0);
          v = edge ? 0 : backG[i];
        }
        const col = cols[v];
        d[p] = col[0]; d[p + 1] = col[1]; d[p + 2] = col[2]; d[p + 3] = 255;
      }
      tg.putImageData(img, 0, 0);
      pen.imageSmoothingEnabled = false;
      const k = Math.max(1, Math.floor(W / N)), o = (W - k * N) >> 1;
      pen.drawImage(tile, 0, 0, W, W);
      pen.drawImage(tile, o, o, k * N, k * N);
    }

    render(0);
    return (t) => {
      lastT = t;
      const inp = c.input;
      for (const rap of inp.taps()) {
        cackle(rap.x);
        const pan = (rap.x - 0.5) * 0.7;
        if (acc === 'Soul Lantern' && legend === 'None' && t - flareAt > 0.9) {
          // the soul flares and a wisp climbs out: a hollow, rising call
          flareAt = t;
          [0, 4, 7].forEach((d, k) => c.sound.note(root + 12 + scale[d % scale.length] + (d >= scale.length ? 12 : 0), { at: 0.05 + k * 0.12, dur: 0.6, vel: 0.1, wave: 'sine', pan: 0.5 }));
        }
        if (legend === 'None' || t - legAt < 0.6) continue;
        legAt = t; legX = rap.x;
        if (legend === 'Crystal Skull') {
          // struck glass: a bright chord ringing out
          [0, 2, 4, 6].forEach((d, k) => c.sound.note(root + 24 + scale[d % scale.length], { at: k * 0.05, dur: 1.4 - k * 0.2, vel: 0.12, wave: 'sine', pan: pan * (k % 2 ? -1 : 1) }));
        } else if (legend === 'Dragon Skull') {
          // a roar of fire: a rushing burst and a growl falling away
          c.sound.hit('noise', 0.5, { cutoff: 700, dur: 0.9, pan });
          for (let k = 0; k < 4; k++) c.sound.note(root - 24 + scale[(5 - k) % scale.length], { at: k * 0.11, dur: 0.16, vel: 0.22, wave: 'square', cutoff: 420, pan });
        } else {
          // the scythe's hiss, then one deep bell
          c.sound.hit('noise', 0.3, { cutoff: 2400, dur: 0.35, pan });
          c.sound.note(root - 24, { at: 0.42, dur: 2.6, vel: 0.3, wave: 'triangle' });
          c.sound.note(root - 12 + 7, { at: 0.42, dur: 1.9, vel: 0.08, wave: 'sine' });
          c.sound.note(root + 3, { at: 0.43, dur: 1.2, vel: 0.04, wave: 'sine' });
        }
      }
      pointer = inp.inside ? [inp.x * N, inp.y * N] : null;
      if (pointer && !wasIn && legend !== 'None') {
        // stepping up to a legendary: it notices you
        if (legend === 'Dragon Skull') c.sound.note(root - 24 + scale[1], { dur: 0.7, vel: 0.12, wave: 'square', cutoff: 300 });
        else if (legend === 'The Reaper') c.sound.hit('noise', 0.12, { cutoff: 600, dur: 0.6 });
      }
      wasIn = !!pointer;
      // its eye lights glance toward the pointer, one cell at most
      gazeX = inp.inside ? Math.max(-1, Math.min(1, Math.round((inp.x - 0.5) * 4))) : 0;
      gazeY = inp.inside ? Math.max(-1, Math.min(0, Math.round((inp.y - 0.42) * 4))) : 0;
      // a held press (not a quick tap) lights the sockets up, with one low hum as they catch
      const was = blaze;
      held = inp.inside && inp.down ? held + 1 : 0;
      blaze = held > 6 ? 1 : 0;
      if (blaze && !was) c.sound.note(root - 12 + scale[2], { dur: 0.45, vel: 0.2, wave: 'square', cutoff: 900 });
      render(t);
    };
  },
});

})(window.Proto);
