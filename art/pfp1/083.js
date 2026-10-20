// Sill Folk: from D:/code/synaesthesia/public/drop03/pieces/083.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 083 Sill Folk: houseplants whose pots have faces, as pixel art on a 64-cell grid with chunky plum outlines.
Proto.add({
  num: 83,
  name: 'Sill Folk',
  fam: 'Things with Faces',
  recipe: 'A houseplant in a pot with a face, drawn cell by cell as pixel art on a 64 x 64 grid (a small pastel palette, one-cell plum outlines, dithered sky and sunbeam) on a sunny shelf by a window; the plant sways a row at a time and the pot blinks. Plant, pot, glaze, painted pattern, eyes, brows, mouth, cheeks, a little extra, a shelf companion, the shelf cover, the wall and the view outside all vary, with rare finds (a flytrap, a rain boot, an eggshell, opal glaze, a frog, galaxy eyes, a rainbow), a blue rose about once in 200, and three Legendaries about once in 370: Gilded, Cosmos and Up and About.',
  interactive: 'Tap to water it. Move the pointer and it leans toward you.',
  music: true,
  fps: 30,
  seed: 7,
  make(c) {
    const S = c.size;
    // xorshift32, seeded by xoring the hash words together with a twist
    let x32 = 2463534242;
    for (let i = 0; i < 8; i++) { x32 ^= parseInt(c.hash.substr(2 + i * 8, 8), 16); x32 = Math.imul(x32, 1597334677) >>> 0 || 1; }
    const nx = () => { x32 ^= x32 << 13; x32 >>>= 0; x32 ^= x32 >>> 17; x32 ^= x32 << 5; x32 >>>= 0; return x32 * 2.3283064365386963e-10; };
    for (let w = 8; w > 0; w--) nx();
    const roll = (...opts) => { // opts: [name, weight, ...]
      const sum = opts.reduce((acc, o) => acc + o[1], 0);
      let r = nx() * sum;
      for (const o of opts) if ((r -= o[1]) < 0) return o;
      return opts[0];
    };

    const backdrop = roll(['Peach', 18, '#ffd9c7', '#ffc4ad'], ['Mint', 18, '#cdf0dc', '#b4e5c9'], ['Sky', 17, '#cfe6fb', '#b7d7f5'],
      ['Lemon', 16, '#fff1b8', '#ffe596'], ['Lilac', 15, '#e6d9fb', '#d6c4f6'], ['Bubblegum', 10, '#ffd6ea', '#ffbfdc'],
      ['Wallpaper', 4, '#fff4e4', '#ffd0d0'], ['Night Window', 3, '#2f2f5c', '#454683']);
    const plant0 = roll(['Cactus', 18], ['Succulent', 16], ['Monstera', 15], ['Snake Plant', 13], ['Sprout', 12], ['Fern', 11], ['Tulips', 8], ['Bonsai', 4], ['Blooming Cactus', 3]);
    const pot0 = roll(['Terracotta', 30], ['Belly Bowl', 24], ['Cylinder', 22], ['Woven Basket', 14], ['Teacup', 6], ['Bucket', 4]);
    const glaze0 = roll(['Clay', 22, '#f0a17a', '#d9805a'], ['Cream', 18, '#fff3df', '#ecd9bb'], ['Pistachio', 15, '#bfe3b0', '#9fcd8e'],
      ['Rose', 15, '#ffb3c4', '#f08fa6'], ['Periwinkle', 14, '#b9c3ff', '#97a3f0'], ['Butter', 12, '#ffe08a', '#f2c95d'], ['Gold Leaf', 4, '#f4cf5b', '#c99a26']);
    const eyes0 = roll(['Dots', 24], ['Sparkly', 22], ['Smiley', 16], ['Sleepy', 12], ['Wide', 10], ['Wink', 10], ['Stars', 4], ['Teary', 2]);
    const mouth0 = roll(['Smile', 24], ['Beam', 18], ['Blep', 14], ['Oh', 12], ['Kitty', 12], ['Wobble', 10], ['Fangs', 6], ['Whistle', 4]);
    const extra = roll(['None', 36], ['Plant Stake', 14], ['Bee', 14], ['Bow', 12], ['Saucer Puddle', 10], ['Sunglasses', 6], ['Halo', 3]);

    const jit = [];
    for (let i = 0; i < 40; i++) jit.push(nx());
    const swayPhase = nx() * 6.28, blinkPhase = nx() * 5, beePhase = nx() * 6.28;
    let leafHue = roll(['Leaf', 60, '#6fcf8c', '#4caf6e', '#a6e8b4'], ['Teal', 25, '#5cc4b0', '#3ea594', '#9ae3d4'], ['Lime', 15, '#a7d65a', '#84b83b', '#cdea95']);
    // the pot's painted decoration rolls from its own stream (a hash of later hash words),
    // so every draw above keeps its value
    let deco32 = (parseInt(c.hash.slice(-16, -8), 16) ^ 0x7a3d91c5) >>> 0 || 5;
    const decoR = () => { deco32 = (Math.imul(deco32 ^ (deco32 >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0; return ((deco32 ^ (deco32 >>> 13)) >>> 0) / 4294967296; };
    const decoPick = (...o) => { let tot = 0; for (const e of o) tot += e[1]; let r = decoR() * tot; for (const e of o) if ((r -= e[1]) < 0) return e[0]; return o[0][0]; };
    let potArt = pot0[0] === 'Woven Basket' ? 'Woven' : decoPick(['Plain', 32], ['Polka Dots', 18], ['Rim Stripes', 16], ['Zigzag Band', 14], ['Daisy Chain', 12], ['Drips', 6], ['Night Dip', 2]);
    const decoJ = []; for (let i = 0; i < 30; i++) decoJ.push(decoR());

    // ---------- the second wave of variety: a Lehmer stream on another slice of the hash ----------
    // (everything rolled above keeps its value; these only widen the set or add new axes)
    let lm = parseInt(c.hash.slice(18, 26), 16) % 2147483646 + 1;
    const mr = () => (lm = lm * 48271 % 2147483647) / 2147483647;
    const mpick = (...o) => { let tot = 0; for (const e of o) tot += e[1]; let r = mr() * tot; for (const e of o) if ((r -= e[1]) < 0) return e; return o[0]; };
    const plant = mr() < 0.45 ? mpick(['Pothos', 14], ['String of Pearls', 11], ['Pilea', 13], ['Aloe', 12], ['Sunflower', 10], ['Lavender', 10], ['Flytrap', 3]) : plant0;
    let pot = mr() < 0.4 ? mpick(['Tin Can', 14], ['Ribbed', 14], ['Hexagon', 13], ['Squat Bowl', 14], ['Eggshell', 4], ['Rain Boot', 4]) : pot0;
    const glaze = mr() < 0.4 ? mpick(['Speckled Oat', 12, '#f1e4cb', '#dccaa6'], ['Sage', 12, '#c9dcc0', '#a9c39d'], ['Tangerine', 11, '#ffbf86', '#f59d5c'],
      ['Lavender', 11, '#dcc9f2', '#bea6e6'], ['Charcoal', 7, '#4f4860', '#3b3547'], ['Opal', 3, '#f6e2f4', '#c7b6f0']) : glaze0;
    let eyes = mr() < 0.45 ? mpick(['Hearts', 9], ['Spirals', 6], ['Lashes', 12], ['Side Glance', 9], ['Pie Eyes', 10], ['Happy Tears', 6], ['Galaxy', 2]) : eyes0;
    let mouth = mr() < 0.45 ? mpick(['Toothy', 10], ['Gasp', 9], ['Smirk', 10], ['Gritted', 7], ['Cheeky', 8], ['Kiss', 5], ['Bubble Gum', 3]) : mouth0;
    const brows = mpick(['None', 40], ['Soft', 14], ['Raised', 12], ['Worried', 10], ['Grumpy', 9], ['Uneven', 7], ['Bushy', 6])[0];
    let cheeks = mpick(['Blush', 44], ['Freckles', 14], ['Heart Cheeks', 9], ['Swirls', 8], ['Plaster', 7], ['No Blush', 8], ['Sparkles', 5], ['Moustache', 4])[0];
    let companion = mpick(['None', 26], ['Snail', 8], ['Mini Me', 8], ['Watering Can', 8], ['Toadstools', 7], ['Pebble Pals', 6], ['Seed Packet', 6],
      ['Book Stack', 6], ['Tea Mug', 7], ['Ladybug', 7], ['Fairy Lights', 6], ['Frog', 2])[0];
    const view = mpick(['Hills', 30], ['Sea', 13], ['Rooftops', 13], ['Snowfall', 9], ['Sunset', 11], ['Blossom Branch', 10], ['Rain', 8], ['Rainbow', 3])[0];
    const paper = mpick(['Polka', 30], ['Stripes', 25], ['Gingham', 20], ['Sprigs', 15], ['Scallops', 10])[0];
    const surface = mpick(['Wood Shelf', 34], ['Tiled Sill', 14], ['Gingham Cloth', 13], ['Lace Doily', 12], ['Marble', 11], ['Woven Mat', 12])[0];
    const compSide = mr() < 0.5 ? -1 : 1;
    const bloomCol = mpick(['#ffb3c7', 1], ['#fff1a0', 1], ['#ffffff', 1], ['#d9c4ff', 1], ['#ffc89a', 1])[0];
    const mj = []; for (let i = 0; i < 48; i++) mj.push(mr());
    if (pot[0] !== 'Woven Basket' && potArt === 'Woven') potArt = mpick(['Plain', 40], ['Polka Dots', 20], ['Rim Stripes', 18], ['Zigzag Band', 14], ['Daisy Chain', 8])[0];
    if (pot[0] === 'Tin Can') potArt = 'Can Label';
    if (pot[0] === 'Eggshell') potArt = 'Speckled Shell';
    // ---------- the third wave: faces that belong to a pot, and more leaf colours (their own stream) ----------
    let pf = (parseInt(c.hash.slice(26, 34), 16) ^ parseInt(c.hash.slice(58, 66), 16) ^ 0x51ed270b) >>> 0 || 7;
    const pr = () => { pf ^= pf << 13; pf >>>= 0; pf ^= pf >>> 17; pf ^= pf << 5; pf >>>= 0; return pf / 4294967296; };
    const prF = [pr(), pr(), pr(), pr(), pr(), pr(), pr()];
    if (leafHue[0] === 'Leaf' && prF[0] < 0.45) leafHue = [['Variegated', 0, '#86d69c', '#4caf6e', '#f4f1c6'], ['Burgundy', 0, '#c0577a', '#86304f', '#ee9db4'], ['Frosted', 0, '#9cd8c8', '#64a896', '#eefaf6']][Math.floor(prF[1] * 3)];
    const painted = (pot[0] === 'Teacup' || pot[0] === 'Tin Can') && prF[2] < 0.6;   // a folk face painted on the cup or the label
    if (painted) { eyes = ['Folk Painted']; mouth = ['Painted Bow']; cheeks = 'Rosy Dots'; }
    else {
      if (prF[3] < 0.12) eyes = ['Pressed Holes'];                    // two holes pushed into the wet clay with a thumb
      if (prF[4] < 0.1) mouth = ['Chipped Tooth'];                     // a chip out of the rim, and a gap-toothed grin to match
      if (cheeks === 'Blush' && prF[5] < 0.62) cheeks = prF[6] < 0.55 && pot[0] !== 'Woven Basket' ? 'Glaze Tears' : 'Rosy Dots';   // glaze ran down from the eyes in the kiln
    }

    // ---------- the Legendary tier and one coveted find: an FNV hash of the whole hash string, so nothing above changes ----------
    let fv = 0x811c9dc5;
    for (let i = 2; i < c.hash.length; i++) { fv ^= c.hash.charCodeAt(i); fv = Math.imul(fv, 0x01000193) >>> 0; }
    const fr = () => { fv = (fv + 0x9e3779b9) >>> 0; let z = fv; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0; z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0; return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const lr = fr(), legend = lr < 1 / 1100 ? 'Gilded' : lr < 2 / 1100 ? 'Cosmos' : lr < 3 / 1100 ? 'Up and About' : '';
    const blueRose = fr() < 0.005;
    const gilded = legend === 'Gilded', cosmos = legend === 'Cosmos', walker = legend === 'Up and About';
    // a boot on little legs never reads as walking: the walker always gets a round pot instead
    if (walker && pot[0] === 'Rain Boot') pot = ['Belly Bowl'];

    const night = backdrop[0] === 'Night Window', walled = backdrop[0] === 'Wallpaper';
    c.trait('Backdrop', walled ? paper + ' Wallpaper' : backdrop[0]);
    c.trait('Surface', surface);
    c.trait('Plant', plant[0]);
    // the leaf colour was always rolled; now it is named too (the snake plant keeps its own stripes)
    c.trait('Foliage', plant[0] === 'Snake Plant' ? 'Striped' : plant[0] === 'Lavender' ? 'Silver Sage' : leafHue[0]);
    c.trait('Pot', pot[0]);
    c.trait('Glaze', pot[0] === 'Woven Basket' ? 'Wicker' : glaze[0]);
    c.trait('Pot Art', potArt);
    c.trait('Eyes', eyes[0]);
    c.trait('Brows', brows);
    c.trait('Mouth', mouth[0]);
    c.trait('Cheeks', cheeks);
    c.trait('Extra', extra[0]); c.trait('Companion', companion);

    if (legend.length) c.trait('Legendary', legend);
    if (blueRose) c.trait('Treasure', 'Blue Rose');
    c.trait('Window', walled ? 'None' : night ? 'Night Sky' : cosmos ? 'Starfield' : view);   // the cosmos is always seen against the night

    // ================= the pixel grid =================
    // everything is drawn cell by cell on a 64 x 64 grid of palette indices, then scaled up unsmoothed
    const N = 64, ctx = c.ctx;
    const pcv = document.createElement('canvas'); pcv.width = pcv.height = N;
    const pg = pcv.getContext('2d'), img = pg.createImageData(N, N), u32 = new Uint32Array(img.data.buffer);
    const rgbOf = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const mix = (a, b, t) => { const A = rgbOf(a), B = rgbOf(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
    const pal = [0], pmap = {}, lum = [0];
    // near-twins share one entry, so each picture keeps a small palette
    const TWIN = { '#fff5d6': '#fffaf2', '#fffaf0': '#fffaf2', '#fff7e8': '#fffaf2', '#fffdf8': '#fffaf2', '#fff4e4': '#fffaf2', '#fffaf6': '#fffaf2', '#e8f4ff': '#fffaf2', '#ffd0d2': '#fffaf2', '#fff6c2': '#fffaf2', '#ffd2ea': '#fffaf2',
      '#ffbcd2': '#ff9db4', '#ffb3c4': '#ff9db4', '#ff9ed2': '#ff9db4', '#ff9dbb': '#ff9db4', '#ff5f8f': '#ff6f91', '#ffe680': '#ffd23a', '#9fd8f5': '#8fd3ff', '#c9d8ff': '#8fd3ff',
      '#b06a52': '#9a6a52', '#b7845a': '#9a6a52', '#9b6a4f': '#9a6a52', '#a87650': '#9a6a52', '#a87a4e': '#9a6a52', '#6e4636': '#7a5140', '#8a5a3a': '#7a5140',
      '#ffd9b0': '#f6d7b0', '#f2bd8a': '#e2b98c', '#c99a6a': '#e2b98c' };
    const K = h0 => { const h = TWIN[h0] || h0; let k = pmap[h]; if (k === undefined) { const [r, g, b] = rgbOf(h); k = pmap[h] = pal.length; pal.push((0xff000000 | b << 16 | g << 8 | r) >>> 0); lum.push((r * 0.3 + g * 0.55 + b * 0.15) / 255); } return k; };
    const lay = () => new Uint8Array(N * N);
    const put = (D, x, y, k) => { if (k && x >= 0 && y >= 0 && x < N && y < N) D[y * N + x] = k; };
    const get = (D, x, y) => x >= 0 && y >= 0 && x < N && y < N ? D[y * N + x] : 0;

    // a scratch sprite: shapes are filled into it, then stamped onto a layer with a one-cell outline around them
    const tmp = lay(); let qx0 = N, qy0 = N, qx1 = -1, qy1 = -1;
    const pt = (x, y, k) => { x = Math.floor(x); y = Math.floor(y); if (!k || x < 0 || y < 0 || x >= N || y >= N) return; tmp[y * N + x] = k; if (x < qx0) qx0 = x; if (x > qx1) qx1 = x; if (y < qy0) qy0 = y; if (y > qy1) qy1 = y; };
    const area = (ax, ay, bx, by, f) => {
      const X0 = Math.max(0, Math.floor(ax)), Y0 = Math.max(0, Math.floor(ay)), X1 = Math.min(N - 1, Math.ceil(bx)), Y1 = Math.min(N - 1, Math.ceil(by));
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const k = f(x + 0.5, y + 0.5, x, y); if (k) pt(x, y, k); }
    };
    const stampIn = (D, M) => { for (let y = Math.max(0, qy0); y <= qy1; y++) for (let x = Math.max(0, qx0); x <= qx1; x++) { const i = y * N + x; if (tmp[i]) { if (M[i]) D[i] = tmp[i]; tmp[i] = 0; } } qx0 = qy0 = N; qx1 = qy1 = -1; };
    const stamp = (D, ok) => {
      if (qx1 < 0) return;
      if (ok) for (let y = Math.max(0, qy0 - 1); y <= Math.min(N - 1, qy1 + 1); y++) for (let x = Math.max(0, qx0 - 1); x <= Math.min(N - 1, qx1 + 1); x++) {
        const i = y * N + x;
        if (!tmp[i] && ((x > 0 && tmp[i - 1]) || (x < N - 1 && tmp[i + 1]) || (y > 0 && tmp[i - N]) || (y < N - 1 && tmp[i + N]))) D[i] = ok;
      }
      for (let y = qy0; y <= qy1; y++) for (let x = qx0; x <= qx1; x++) { const i = y * N + x; if (tmp[i]) { D[i] = tmp[i]; tmp[i] = 0; } }
      qx0 = qy0 = N; qx1 = qy1 = -1;
    };
    const kv = (k, a, b, x, y) => typeof k === 'function' ? k(a, b, x, y) : k;
    const ell = (cx, cy, rx, ry, k) => area(cx - rx - 1, cy - ry - 1, cx + rx + 1, cy + ry + 1, (px, py, x, y) => { const p = (px - cx) / rx, q = (py - cy) / ry; return p * p + q * q <= 1 ? kv(k, p, q, x, y) : 0; });
    const box = (x, y, w, h, k) => area(x, y, x + w - 1, y + h - 1, (px, py, xx, yy) => kv(k, xx - x, yy - y, xx, yy));
    // a ribbon along a polyline: the cells within w(t) of it; k gets (t along 0..1, v across, x, y)
    const ribbon = (pts, wf, k) => {
      let len = 0; const seg = [];
      for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1], l = Math.hypot(bx - ax, by - ay) || 1e-6; seg.push([ax, ay, bx - ax, by - ay, l, len]); len += l; }
      let X0 = 1e9, Y0 = 1e9, X1 = -1e9, Y1 = -1e9, wm = 0;
      for (const [x, y] of pts) { X0 = Math.min(X0, x); X1 = Math.max(X1, x); Y0 = Math.min(Y0, y); Y1 = Math.max(Y1, y); }
      for (let i = 0; i <= 10; i++) wm = Math.max(wm, wf(i / 10));
      area(X0 - wm - 1, Y0 - wm - 1, X1 + wm + 1, Y1 + wm + 1, (px, py, x, y) => {
        let best = 1e9, bt = 0, bv = 0;
        for (const [ax, ay, dx, dy, l, l0] of seg) {
          let s = ((px - ax) * dx + (py - ay) * dy) / (l * l); s = s < 0 ? 0 : s > 1 ? 1 : s;
          const qx = ax + dx * s - px, qy = ay + dy * s - py, d = qx * qx + qy * qy;
          if (d < best) { best = d; bt = (l0 + s * l) / len; bv = ((px - ax) * dy - (py - ay) * dx) / l; }
        }
        return Math.sqrt(best) <= wf(bt) ? kv(k, bt, bv, x, y) : 0;
      });
    };
    const quad = (ax, ay, cx, cy, bx, by, n) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n, s = 1 - t; o.push([s * s * ax + 2 * s * t * cx + t * t * bx, s * s * ay + 2 * s * t * cy + t * t * by]); } return o; };
    const pointy = t => Math.sin(Math.PI * Math.pow(t, 0.7));
    // hand-drawn sprites: rows of characters, '.' is empty
    const sp = (D, x, y, rows, map, flip) => {
      for (let j = 0; j < rows.length; j++) { const r = rows[j], w = r.length; for (let i = 0; i < w; i++) { const ch = r[flip ? w - 1 - i : i]; if (ch !== '.') put(D, x + i, y + j, map[ch]); } }
    };
    const spT = (x, y, rows, map, flip) => { for (let j = 0; j < rows.length; j++) { const r = rows[j], w = r.length; for (let i = 0; i < w; i++) { const ch = r[flip ? w - 1 - i : i]; if (ch !== '.') pt(x + i, y + j, map[ch]); } } };

    // ---------- the palette ----------
    const O = K('#3d2a4a'), WH = K('#fffaf2');
    const INKh = cosmos || (glaze[0] === 'Charcoal' && pot[0] !== 'Woven Basket') ? '#fff1e0' : '#3d2a4a', INK = K(INKh);
    const PINK = K('#ff9db4'), HOT = K('#ff6f91'), YEL = K('#ffd23a'), BLU = K('#8fd3ff'), BLU2 = K('#4fa6e8');
    const wallH = night ? '#2f2f5c' : backdrop[2], skyH = backdrop[3];
    const L0h = leafHue[2], L1h = leafHue[3], L2h = leafHue[4];
    const L0 = K(L0h), L1 = K(L1h), L2 = K(L2h);
    const u = 0.0768;   // one unit of the old 1000-wide drawing, in cells (with its 1.2 zoom)

    // ---------- layout ----------
    const PT = pot[0], T = plant[0];
    const onShelf = companion !== 'None' && companion !== 'Ladybug' && companion !== 'Fairy Lights';
    const toeDir = onShelf ? -compSide : 1;
    // a Legendary stands alone in its own scene: centred (a walker a little ahead, room for a friend to follow)
    const PX = legend ? (walker ? 35 : 32) : 32 - (onShelf && PT !== 'Rain Boot' ? compSide * 5 : 0);
    // a walker stands up on its legs, pot well off the ground; a gilded pot sits up on its cushion; a cosmos pot floats
    const cx = PX + 0.5, SH = 54, LIFT = walker ? 6 : gilded ? 5 : cosmos ? 4 : 0;
    let PR = 35, PB = 58, A = 12.5, Bw = 9.5, form = 'taper', band = 0;
    if (PT === 'Terracotta') band = 6;
    else if (PT === 'Belly Bowl') { PR = 36; Bw = 8.5; form = 'belly'; }
    else if (PT === 'Cylinder') { PR = 34; A = Bw = 11.5; }
    else if (PT === 'Woven Basket') { PR = 36; A = 13.5; Bw = 10.5; band = 3; }
    else if (PT === 'Teacup') { PR = 37; PB = 55; A = 14.5; Bw = 7.5; form = 'cup'; }
    else if (PT === 'Bucket') band = 3;
    else if (PT === 'Tin Can') A = Bw = 11.5;
    else if (PT === 'Ribbed') { Bw = 8.5; band = 3; }
    else if (PT === 'Squat Bowl') { PR = 40; A = 17.5; Bw = 9.5; form = 'bowl'; }
    else if (PT === 'Eggshell') { PR = 35; PB = 54; A = 11.5; form = 'egg'; }
    else if (PT === 'Rain Boot') { PR = 33; A = Bw = 10.5; band = 3; }
    PR -= LIFT; PB -= LIFT;
    const hw = y => {
      const t = (y + 0.5 - PR) / (PB + 1 - PR);
      let w = form === 'belly' ? A + (Bw - A) * t + 2.2 * Math.sin(Math.PI * Math.min(1, t * 1.08))
        : form === 'cup' ? Bw + (A - Bw) * Math.pow(Math.max(0, Math.cos(t * Math.PI / 2)), 0.55)
        : form === 'bowl' ? Bw + (A - Bw) * Math.sqrt(Math.max(0, 1 - t * t))
        : form === 'egg' ? (y + 0.5 < PR + 7 ? (A + 0.6) * Math.sqrt(Math.max(0, 1 - Math.pow((y + 0.5 - PR - 7) / 10.5, 2))) : (A + 0.6) * Math.sqrt(Math.max(0, 1 - Math.pow((y + 0.5 - PR - 7) / (PB + 1 - PR - 7), 2))))
        : A + (Bw - A) * t;
      if (y === PB && PT !== 'Hexagon' && form !== 'egg') w -= 1;
      return w;
    };
    const R = band ? PR - 1 : PR;          // the soil line, where the plant stands and pivots
    const FY = PR + (form === 'egg' ? 7 : form === 'bowl' ? 8 : Math.max(9, Math.round((PB - PR) * 0.42))) + (band === 6 ? 1 : 0);
    const G = form === 'bowl' || form === 'cup' ? 7 : 6, MY = FY + 4;
    const faceBox = (x, y) => Math.abs(x - PX) <= G + 3 && y >= FY - 5 && y <= MY + 3;

    // ================= background: wall, window, view, shelf =================
    const bg = lay(), glass = lay();
    bg.fill(K(wallH));
    const inWin = (x, y) => y >= 7 && y < SH && Math.abs(x - 32) <= 19 && (y >= 26 || (x - 32) * (x - 32) + (y - 26) * (y - 26) <= 19.4 * 19.4);
    const VIEW = walled ? 'None' : night || cosmos ? 'Night' : view;
    let skyTop = mix(skyH, '#ffffff', 0.45), skyBot = skyH;
    if (VIEW === 'Sunset') { skyTop = '#ffc6d2'; skyBot = '#ffd59e'; }
    if (VIEW === 'Rain') { skyTop = '#c6cade'; skyBot = '#b2b7d0'; }
    if (VIEW === 'Night') { skyTop = '#454683'; skyBot = '#3c3d78'; }
    const ST = K(skyTop), SB = K(skyBot);
    if (walled) {
      const acc = K(backdrop[3]), half = K(mix(backdrop[2], backdrop[3], 0.5)), sprig = K('#9fd3a8');
      for (let y = 0; y < SH; y++) for (let x = 0; x < N; x++) {
        let k = 0;
        if (paper === 'Polka') { const yy = y % 8, xx = (x + (Math.floor(y / 8) % 2) * 4) % 8; if (yy >= 3 && yy < 5 && xx >= 3 && xx < 5) k = acc; }
        else if (paper === 'Stripes') { const xx = x % 7; k = xx < 3 ? acc : xx === 4 ? WH : 0; }
        else if (paper === 'Gingham') { const a = Math.floor(x / 4) % 2, b = Math.floor(y / 4) % 2; k = a && b ? acc : a || b ? half : 0; }
        else if (paper === 'Scallops') { const yy = y % 6, xx = (x + (Math.floor(y / 6) % 2) * 3) % 6; const d = Math.hypot(xx - 2.5, yy - 0.5); if (d > 2.2 && d < 3.3 && yy >= 1) k = acc; }
        if (k) bg[y * N + x] = k;
      }
      if (paper === 'Sprigs') for (let gy = 0; gy < 8; gy++) for (let gx = 0; gx < 9; gx++) {
        const x = gx * 8 + (gy % 2) * 4 + 1, y = gy * 7 + 1;
        sp(bg, x, y, ['..a', 's.s', '.s.', '.s.'], { a: acc, s: sprig });
      }
    } else {
      for (let y = 0; y < SH; y++) for (let x = 0; x < N; x++) {
        if (!inWin(x, y)) continue;
        glass[y * N + x] = 1;
        const d = y < 15 ? 0 : y > 19 ? 1 : (y - 15) / 5;
        bg[y * N + x] = d === 0 ? ST : d === 1 ? SB : ((x + y) % 2 === 0 ? d > 0.5 : d > 0.75) ? SB : ST;
      }
      const hillF = K(VIEW === 'Sunset' ? '#e4a0b4' : VIEW === 'Snowfall' ? '#f4f6ff' : mix(skyBot, '#3d2a4a', 0.12));
      const hillN = K(VIEW === 'Sunset' ? '#c98aa8' : VIEW === 'Snowfall' ? '#fffaf2' : mix(wallH, '#3d2a4a', 0.3));
      const onGlass = (x, y, k) => { if (glass[y * N + x]) bg[y * N + x] = k; };
      const hills = (base, amp, f, ph, k) => { for (let x = 13; x <= 51; x++) { const top = Math.round(base - amp * Math.sin(x * f + ph) - amp * 0.4 * Math.sin(x * 0.41 + ph * 2)); for (let y = top; y < SH; y++) onGlass(x, y, k); } };
      if (VIEW === 'Night') {
        const star = K('#fff6cc');
        for (let i = 0; i < (cosmos ? 40 : 16); i++) { const x = 15 + Math.floor(jit[i] * 35), y = 9 + Math.floor(jit[(i + 7) % 40] * (cosmos ? 44 : 30)); if (glass[y * N + x]) { bg[y * N + x] = star; if (jit[(i + 3) % 40] > 0.7) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) onGlass(x + a, y + b, SB === bg[(y + b) * N + x + a] || ST === bg[(y + b) * N + x + a] ? K('#a9a6d8') : bg[(y + b) * N + x + a]); } }
        // a crescent moon
        for (let y = 10; y < 22; y++) for (let x = 36; x < 50; x++) { const a = Math.hypot(x + 0.5 - 44, y + 0.5 - 18), b = Math.hypot(x + 0.5 - 46.2, y + 0.5 - 16.6); if (a <= 4.6 && b > 4.2) onGlass(x, y, star); }
      } else {
        if (VIEW === 'Sunset') for (let y = 30; y < SH; y++) for (let x = 13; x <= 51; x++) if (Math.hypot(x + 0.5 - (22 + Math.floor(decoJ[3] * 20)), y + 0.5 - 40) <= 6.5) onGlass(x, y, K('#fff0b8'));
        if (VIEW === 'Rainbow') {
          const rb = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#a0c4ff', '#cdb4ff'].map(K);
          for (let y = 7; y < SH; y++) for (let x = 13; x <= 51; x++) { const d = Math.hypot(x + 0.5 - 32.5, y + 0.5 - 46); const i = Math.floor(19 - d); if (i >= 0 && i < 6) onGlass(x, y, rb[i]); }
        }
        if (VIEW === 'Sea') {
          const sea = K(mix(skyBot, '#5a96d2', 0.45)), foam = K(mix(skyBot, '#ffffff', 0.7));
          for (let y = 40; y < SH; y++) for (let x = 13; x <= 51; x++) onGlass(x, y, sea);
          for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const x = 15 + k * 10 + (r % 2) * 5 + Math.floor(decoJ[r + k] * 3), y = 42 + r * 3; onGlass(x, y, foam); onGlass(x + 1, y - 1, foam); onGlass(x + 2, y, foam); }
          const bx = 18 + Math.floor(decoJ[5] * 26), hull = K(mix(skyBot, '#3d2a4a', 0.45));
          sp(bg, bx, 33, ['...w...', '...ww..', '...www.', '...wwww', '...w...', 'hhhhhhh', '.hhhhh.'], { w: WH, h: hull });
        } else if (VIEW === 'Rooftops') {
          const house = K(mix(skyBot, '#3d2a4a', 0.3)), lit = K('#fff3c4');
          let rx = 13;
          for (let i = 0; rx <= 51 && i < 9; i++) {
            const w = 5 + Math.floor(mj[i] * 5), top = 40 + Math.floor(mj[i + 9] * 7), peak = 2 + Math.floor(mj[i + 18] * 3);
            for (let x = rx; x < rx + w; x++) { const roof = top - Math.round(peak * (1 - Math.abs((x + 0.5 - rx - w / 2) / (w / 2)))); for (let y = roof; y < SH; y++) onGlass(x, y, house); }
            if (w >= 6) { onGlass(rx + 1, top + 2, lit); onGlass(rx + w - 2, top + 2, lit); onGlass(rx + 1, top + 3, lit); onGlass(rx + w - 2, top + 3, lit); }
            rx += w + 1;
          }
        } else if (VIEW === 'Snowfall') { hills(42, 2.2, 0.21, decoJ[1] * 6, hillF); hills(47, 1.6, 0.3, decoJ[2] * 6, hillN); }
        else if (VIEW === 'Blossom Branch') {
          hills(41, 2.4, 0.19, decoJ[1] * 6, hillF);
          ribbon([[52, 13], [44, 15], [36, 19], [31, 24]], () => 0.55, K(mix('#8a5a64', skyBot, 0.25))); stampIn(bg, glass);
          ribbon([[42, 16], [39, 12], [35, 11]], () => 0.45, K(mix('#8a5a64', skyBot, 0.25))); stampIn(bg, glass);
          const pk = PINK, wf = WH;
          for (let i = 0; i < 9; i++) { const x = 31 + Math.floor(mj[i] * 20), y = 10 + Math.floor(mj[i + 11] * 14); if (!glass[y * N + x]) continue; const k = i % 3 ? pk : wf; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) onGlass(x + a, y + b, k); onGlass(x, y, YEL); }
        } else if (VIEW !== 'Sea') { hills(40, 2.4, 0.19, decoJ[1] * 6, hillF); hills(45, 1.8, 0.27, decoJ[2] * 6, hillN); }
        if (VIEW === 'Rain') {
          const cl = K(mix(skyBot, '#6e7096', 0.35)), dropK = K(mix(skyTop, '#ffffff', 0.6));
          for (let i = 0; i < 3; i++) { const x = 16 + i * 12 + Math.floor(decoJ[i] * 4), y = 11 + (i % 2) * 4; ell(x + 3, y, 3.4, 2, cl); ell(x + 7, y - 1, 4, 2.6, cl); ell(x + 11, y, 3, 1.8, cl); stampIn(bg, glass); }
          for (let i = 0; i < 12; i++) { const x = 15 + Math.floor(mj[i + 24] * 35), y = 12 + Math.floor(mj[(i + 30) % 48] * 38); onGlass(x, y, dropK); onGlass(x, y + 1, dropK); }
        }
      }
      // the frame, the glazing bars and a shine on the glass
      const frame = K(night ? '#5a5b9a' : mix(wallH, '#3d2a4a', 0.3));
      for (let y = 5; y <= SH; y++) for (let x = 11; x <= 53; x++) {
        if (glass[y * N + x]) { if (x === 32 || y === 26) bg[y * N + x] = frame; continue; }
        if (get(glass, x - 1, y) || get(glass, x + 1, y) || get(glass, x, y - 1) || get(glass, x, y + 1)) bg[y * N + x] = frame;
      }
      if (VIEW !== 'Night') { const sh = K(mix(wallH, '#ffffff', 0.5)); for (let i = 0; i < 5; i++) { onGlass(16 + i, 16 - i, sh); onGlass(17 + i, 16 - i, sh); } for (let i = 0; i < 3; i++) onGlass(16 + i, 20 - i, sh); }
    }
    // a dithered sunbeam falling from the window across the wall
    if (!night && VIEW !== 'Rain') {
      const beam = K(mix(wallH, '#ffffff', 0.5));
      for (let y = 8; y < SH; y++) for (let x = 0; x < N; x++) { const s = x - y * 0.62; if (s > 30 && s < 37 && !glass[y * N + x] && (x + y) % 2 === 0 && bg[y * N + x] === K(wallH)) bg[y * N + x] = beam; }
    }
    // the shelf and its cover
    const surfH = night ? '#8a6bb0' : surface === 'Gingham Cloth' ? '#fffaf6' : surface === 'Marble' ? '#f4f2f6' : '#f7e9da';
    const SF = K(surfH), sfDark = K(mix(surfH, '#3d2a4a', 0.16));
    for (let y = SH; y < N; y++) for (let x = 0; x < N; x++) bg[y * N + x] = y === SH ? O : y === SH + 1 ? sfDark : SF;
    if (surface === 'Wood Shelf' || surface === 'Lace Doily' || surface === 'Woven Mat') {
      const grain = sfDark;
      for (let k = 0; k < 3; k++) for (let x = 0; x < N; x++) { const y = SH + 3 + k * 3 + (Math.sin(x * 0.18 + k * 2 + decoJ[k] * 5) > 0.55 ? 1 : 0); if ((x * 7 + k * 3) % 23 > 2) put(bg, x, y, grain); }
      const kx = 8 + Math.floor(decoJ[6] * 46); for (const [a, b] of [[0, 0], [1, -1], [2, -1], [3, 0], [1, 1], [2, 1]]) put(bg, kx + a, N - 3 + b, grain);
    } else if (surface === 'Tiled Sill') {
      const grout = K(mix(surfH, '#3d2a4a', 0.14)), blue = K('#bfe0f2'), dia = K('#7fb5d6');
      for (let y = SH + 2; y < N; y++) for (let x = 0; x < N; x++) { const r = Math.floor((y - SH - 2) / 4), xx = x + r * 4, q = Math.floor(xx / 8); bg[y * N + x] = (y - SH - 2) % 4 === 3 || xx % 8 === 7 ? grout : (q + r * 2) % 5 === 1 ? blue : SF; }
    } else if (surface === 'Gingham Cloth') {
      const gc = ['#f07a8e', '#7aa8e6', '#7ec29a'][Math.floor(decoJ[7] * 3)], g1 = K(mix(surfH, gc, 0.45)), g2 = K(mix(surfH, gc, 0.8));
      for (let y = SH + 1; y < N; y++) for (let x = 0; x < N; x++) { const a = Math.floor(x / 3) % 2, b = Math.floor((y - SH - 1) / 3) % 2; bg[y * N + x] = a && b ? g2 : a || b ? g1 : SF; }
    } else if (surface === 'Marble') {
      const vein = K('#c9c2d8');
      for (let k = 0; k < 5; k++) { let x = Math.floor(mj[k + 30] * 64); for (let y = SH + 2; y < N; y++) { put(bg, x, y, vein); x += (mj[(k * 5 + y) % 48] > 0.5 ? 1 : 0) - (mj[(k * 3 + y) % 48] > 0.7 ? 1 : 0); } }
    }
    // things lying on the shelf under the pot
    const shadeK = sfDark;
    if (surface === 'Lace Doily') {
      const dw = Bw + 7, lace = K('#fffdf8'), hole = K(mix('#fffdf8', '#3d2a4a', 0.16));
      ell(cx, 58.5, dw, 3.2, (p, q, x, y) => { const r = Math.hypot(p, q); return r > 0.84 ? ((x + y) % 2 ? lace : hole) : (r > 0.62 && r < 0.74 && x % 2) ? hole : lace; }); stamp(bg, K(mix('#3d2a4a', surfH, 0.45)));
    } else if (surface === 'Woven Mat') {
      const dw = Bw + 5, mat = K('#e8c99a'), ring = K('#c9a070');
      ell(cx, 58.5, dw, 3, (p, q) => { const r = Math.hypot(p, q); return (r > 0.3 && r < 0.42) || (r > 0.62 && r < 0.74) ? ring : mat; }); stamp(bg, O);
    }
    if (extra[0] === 'Saucer Puddle') { ell(cx + 3, 59.5, Bw + 6, 2.2, (p, q) => p > 0.2 && p < 0.6 && q < -0.1 ? WH : K('#9fd8f5')); stamp(bg, O); }
    const footW = PT === 'Rain Boot' ? Bw + 4 : form === 'cup' ? Bw + 6 : Bw + 2;
    ell(cx + (PT === 'Rain Boot' ? toeDir * 4 : 0), 58.6, footW, 1.3, shadeK); stamp(bg, 0);
    const compX = 32 + compSide * 21, CB = 57;   // far enough in that a companion never leaves the frame
    if (onShelf) { ell(compX + 0.5, 57.8, 6.5, 1.1, shadeK); stamp(bg, 0); }

    // ================= the character: soil, plant, pot =================
    const back = lay(), plantL = lay(), potL = lay(), comp = lay();
    const SOIL = K('#7a5140'), SOILH = K('#9a6a52');
    ell(cx, R + 0.3, A - (band ? 0.5 : 1), band ? 1.8 : 2.3, (p, q) => q < -0.2 && p < 0 ? SOILH : SOIL); stamp(back, O);

    // ---------- the plant (upright; it sways as a whole, a row at a time) ----------
    const tips = [];
    // Leafy plants draw each leaf with a one-cell darker green edge instead of a plum line; once the plant
    // is done, only the edge cells on its silhouette turn plum (outline(), below), so the clump stays clean
    const leafy = ['Pothos', 'String of Pearls', 'Pilea', 'Fern', 'Monstera'].includes(T);
    const OL = leafy ? K(mix(L1h, '#3d2a4a', 0.3)) : O, pearlHL = K(mix(L2h, '#ffffff', 0.55));
    const bead = (D, x, y) => { const bx = Math.round(x) - 1, by = Math.round(y) - 1; pt(bx, by, pearlHL); pt(bx + 1, by, L0); pt(bx, by + 1, L0); pt(bx + 1, by + 1, L1); stamp(D, OL); };
    const outline = D => { if (!leafy) return; for (let i = 0; i < N * N; i++) if (D[i] === OL) { const x = i % N; if ((x > 0 && !D[i - 1]) || (x < N - 1 && !D[i + 1]) || (i >= N && !D[i - N]) || (i < N * N - N && !D[i + N])) D[i] = O; } };
    const side3 = (v, k1, k2) => v > 0 ? k1 : k2;   // two-tone halves of a leaf
    const leaf = (x, y, a, len, wid, kL, kD, vein) => {
      const tx = x + Math.sin(a) * len, ty = y - Math.cos(a) * len;
      ribbon([[x, y], [tx, ty]], t => wid * pointy(t) + 0.2, (t, v) => vein && Math.abs(v) < 0.5 && t > 0.12 && t < 0.78 ? vein : side3(v, kL, kD));
      return [tx, ty];
    };
    const stem = (pts, w, k, ok) => { ribbon(pts, () => w, k); stamp(plantL, ok === undefined ? OL : ok); };
    const heartLeaf = (D, x, y, a, s, k, kLight, cream) => {
      const len = s * 1.35, tx = x + Math.sin(a) * len, ty = y - Math.cos(a) * len;
      ribbon([[x, y], [tx, ty]], t => s * 0.7 * (t < 0.28 ? 0.7 + 0.3 * Math.sin(t / 0.28 * Math.PI / 2) : Math.pow(Math.cos((t - 0.28) / 0.72 * Math.PI / 2), 1.1)) + 0.15,
        (t, v) => t < 0.13 && Math.abs(v) < 0.9 ? 0 : Math.abs(v) < 0.5 && t > 0.15 && t < 0.8 ? L1 : cream && v > 0.6 && t > 0.25 && t < 0.7 ? cream : v > 0 ? kLight : k);
      stamp(D, OL);
      return [tx, ty];
    };
    if (T === 'Cactus' || T === 'Blooming Cactus') {
      const h = Math.round((330 + jit[0] * 60) * u), top = R - h;
      const arm = (sd, at, len) => {
        const ay = R - at * u, ox = cx + sd * 7.5;
        ribbon([[cx + sd * 3, ay], [ox, ay], [ox, ay - len * u]], () => 2.3, (t, v, x, y) => y >= ay - 0.5 && y < ay + 1.5 ? (y >= ay + 0.5 ? L1 : L0) : (x + 0.5 - ox) * sd > 0.9 ? L1 : (x + 0.5 - ox) * sd < -0.9 ? L2 : L0);
        stamp(plantL, O);
        tips.push([ox, ay - len * u - 3]);
      };
      arm(-1, 150 + jit[1] * 60, 70 + jit[2] * 60);
      if (jit[3] > 0.3) arm(1, 110 + jit[4] * 80, 60 + jit[5] * 60);
      area(cx - 6, top - 1, cx + 6, R + 2, (px, py, x, y) => {
        const dx = px - cx; if (Math.abs(dx) > 5.1) return 0;
        if (py < top + 5 && Math.hypot(dx, py - top - 5) > 5.1) return 0;
        const c2 = x - PX; return c2 >= 3 ? L1 : c2 === -3 && y > top + 2 && y < R - 2 ? L2 : (c2 === -1 || c2 === 1) && y > top + 1 ? L1 : L0;
      });
      stamp(plantL, O);
      for (let i = 0; i < 12; i++) { const x = PX - 3 + Math.floor(jit[(i * 7) % 40] * 6), y = top + 3 + Math.floor(((i + jit[(i * 3 + 5) % 40]) / 12) * (h - 5)); if (plantL[y * N + x] === L0 || plantL[y * N + x] === L2) put(plantL, x, y, WH); }
      if (T === 'Blooming Cactus') {
        const pkA = K('#ff7fb0'), pkB = K('#ffb3cf');
        for (const a of [-1.15, -0.58, 0.58, 1.15, 0]) { leaf(cx, top + 1, a, 4.6, 1.6, pkB, pkA); stamp(plantL, O); }
        put(plantL, PX, top, YEL); put(plantL, PX, top - 1, YEL); put(plantL, PX - 1, top, YEL); put(plantL, PX + 1, top, YEL);
      } else tips.push([cx, top - 2]);
      tips.push([cx - 6, R - h * 0.55], [cx + 6, R - h * 0.7]);
    } else if (T === 'Succulent') {
      // a rosette: outer leaves first, each starting a little out from the heart so the outlines never pile up
      const rows = [[7, 150, 120, 1.2], [6, 120, 105, 0.9], [5, 95, 90, 0.58], [3, 70, 70, 0.22]], tipK = K('#f59bb5');
      rows.forEach((r, ri) => {
        for (let i = 0; i < r[0]; i++) {
          const a = (i / (r[0] - 1) - 0.5) * 2 * r[3], len = (r[1] + 10) * 1.45 * u, wid = r[2] * 0.42 * 1.2 * u, by = R - 0.5 - ri * 2.2;
          const bx = cx + Math.sin(a) * 1.6, by2 = by - Math.cos(a) * 0.8, tx = cx + Math.sin(a) * len, ty = by - Math.cos(a) * len;
          ribbon([[bx, by2], [tx, ty]], t => wid * Math.sin(Math.PI * (0.32 + t * 0.68)) + 0.3, (t, v) => t > 0.82 && Math.abs(v) < 1.2 ? tipK : Math.abs(v) < 0.5 && t > 0.2 ? L1 : (v > 0) === (i % 2 === 0) ? L2 : L0);
          if (ri === 0 && i % 2 === 0) tips.push([tx, ty]);
        }
        stamp(plantL, O);   // a whole ring at once, so its leaves share one outline
      });
    } else if (T === 'Monstera') {
      const leaves = [[-0.1, 215], [-0.75, 175], [0.7, 190], [0.32, 262], [-0.42, 250]];
      leaves.slice(0, 3 + Math.floor(jit[0] * 2.99)).sort((p, q) => q[1] - p[1]).forEach(([a, len], i) => {
        const ex = cx + Math.sin(a) * len * u, ey = R - Math.cos(a) * len * 0.9 * u;
        stem(quad(cx, R + 1, cx + Math.sin(a) * len * 0.2 * u, R - len * 0.6 * u, ex, ey, 8), 0.5, L1);
        const r = a * 0.8, H = 212 * u * 0.92, Wd = 178 * u * 0.82, tx = ex + Math.sin(r) * H, ty = ey - Math.cos(r) * H;
        const slits = [];
        for (const sd of [-1, 1]) for (let j = 0; j < 3; j++) slits.push([0.3 + j * 0.2, sd]);
        ribbon([[ex, ey], [tx, ty]], t => (t < 0.08 ? 0.4 : Wd * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.8)), 0.55)) + 0.2, (t, v) => {
          for (const [s0, sd] of slits) { const along = s0 + Math.abs(v) / Wd * 0.1; if (v * sd > 1.4 && Math.abs(t - along) < 0.022 * 1.0 + 0.012) return 0; }
          if (Math.abs(v) < 0.5 && t < 0.92) return L1;
          if ((Math.abs(t - 0.2) < 0.05 && Math.abs(v + 2.2) < 0.8) || (Math.abs(t - 0.78) < 0.05 && Math.abs(v - 1.6) < 0.8)) return 0;
          return v > 0 ? (i % 2 ? L2 : L0) : i % 2 ? L0 : L1;
        });
        stamp(plantL, OL);
        tips.push([tx, ty]);
      });
    } else if (T === 'Snake Plant') {
      const edge = K('#e8d75a'), gA = K('#3f9a5a'), gB = K('#4caf6e'), gD = K('#2d7a47');
      [[-70, -0.16, 330], [70, 0.14, 300], [-20, -0.04, 400], [30, 0.06, 360], [-110, -0.3, 230], [110, 0.3, 240]].forEach(([dx, a, h], i) => {
        const bx = cx + dx * 0.6 * u, len = h * u, tx = bx + Math.sin(a) * len, ty = R + 1 - Math.cos(a) * len, w0 = 38 * u;
        ribbon([[bx, R + 1], [tx, ty]], t => w0 * (1 - Math.pow(t, 2.2)) + 0.3, (t, v) => { const w = w0 * (1 - Math.pow(t, 2.2)) + 0.3; if (Math.abs(v) > w - 0.95) return edge; return ((t * len + Math.abs(v) * 0.6) % 3.2) < 0.9 ? gD : i % 2 ? gA : gB; });
        stamp(plantL, O);
        if (i < 4) tips.push([tx, ty]);
      });
    } else if (T === 'Sprout') {
      const tall = (200 + jit[2] * 60) * u, top = R - tall;
      stem(quad(cx, R + 1, cx + 1.5, R - tall * 0.6, cx, top, 8), 0.5, L0);
      if (jit[1] > 0.5) { leaf(cx + 0.5, R - 110 * u, 0.9, 100 * u, 44 * u * 0.9, L2, L0, L1); stamp(plantL, O); }
      const t1 = leaf(cx, top, -1.1, 190 * u, 85 * u * 0.85, L2, L0, L1); stamp(plantL, O);
      const t2 = leaf(cx, top, 1.1, 170 * u, 80 * u * 0.85, L2, L0, L1); stamp(plantL, O);
      if (mj[0] < 0.35) { const cap = K('#c99a6a'), capD = K('#a87a4e'); ell(cx + 0.4, top - 1, 2.8, 1.8, (p, q) => q > 0.35 ? 0 : p > 0.3 ? capD : cap); stamp(plantL, O); }
      tips.push(t1, t2, [cx, top - 3]);
    } else if (T === 'Fern') {
      // a Boston fern: long fronds that rise and arch over, the outer ones drooping past the rim,
      // each a comb of little rounded leaflets on a dark midrib; two curled fiddleheads in the middle
      const fronds = [[-1.2, 1.12], [1.15, 1.1], [-0.75, 1.08], [0.78, 1.06], [-0.32, 0.95], [0.36, 0.92]];
      fronds.forEach(([a, k], f) => {
        const len = (20 + jit[f] * 3) * k, pts = [];
        let x = cx + a * 2.5, y = R + 0.5, ang = a * 0.55;
        const bend = Math.sign(a) * (1.0 + Math.abs(a) * 1.5) / len;   // how fast it arches over
        for (let i = 0; i <= 14; i++) { pts.push([x, y]); const ds = len / 14; x += Math.sin(ang) * ds; y -= Math.cos(ang) * ds; ang += bend * ds * (0.4 + i / 14); }
        const kA = f % 2 ? L0 : L2;
        ribbon(pts, t => 0.6 + 2.5 * Math.pow(Math.sin(Math.PI * Math.min(1, 0.12 + t * 0.92)), 0.7), (t, v) => {
          if (Math.abs(v) < 0.5) return L1;
          const ph = (t * len) % 2.2;
          if (Math.abs(v) > 1.1 && ph < 0.7) return 0;   // the gaps between leaflets
          return v > 0 ? kA : L0;
        });
        stamp(plantL, OL);
        if (f % 2 === 0) tips.push(pts[10]);
      });
      // fiddleheads: young fronds still coiled, standing up out of the crown
      for (const [dx, h, fl] of [[-1, 23, false], [2, 20, true]]) {
        const sx = Math.round(cx + dx), top = Math.round(R - h);
        ribbon([[sx + 0.5, R + 1], [sx + 0.5, top + 5]], () => 0.45, L0);
        spT(fl ? sx : sx - 4, top, ['.kkk.', 'kl..k', 'k.k.k', '.kk.k', '....k'], { k: L0, l: L2 }, fl);
        stamp(plantL, OL);
      }
    } else if (T === 'Tulips') {
      const cols = [['#ff6f91', '#e8507a'], ['#ffd25e', '#f0b43a'], ['#b48cff', '#9668ec'], ['#ff9b5e', '#f07a3a']];
      const tc = cols[Math.floor(jit[0] * 4)], tc2 = cols[Math.floor(jit[1] * 4)];
      leaf(cx - 1.5, R + 1, -0.5, 200 * u, 60 * u, L2, L0, L1); stamp(plantL, O);
      leaf(cx + 1.5, R + 1, 0.55, 190 * u, 60 * u, L2, L0, L1); stamp(plantL, O);
      [[-90, 260, tc], [0, 320, tc2], [90, 250, tc]].forEach(([dx, h, col]) => {
        const hx = cx + dx * u, hy = R - h * u;
        stem(quad(cx + dx * 0.2 * u, R + 1, cx + dx * 0.4 * u, R - h * 0.5 * u, hx, hy, 8), 0.5, L1);
        spT(Math.round(hx) - 3, Math.round(hy) - 6, ['t..t..t', 'tt.t.tt', 'tttttss', 'ttttsss', 'ttttsss', '.tttss.', '..tss..'], { t: K(col[0]), s: K(col[1]) });
        stamp(plantL, O);
      });
      tips.push([cx - 9, R - 13], [cx + 9.5, R - 12], [cx - 3, R - 10.5]);
    } else if (T === 'Bonsai') {
      const bark = K('#9b6a4f'), barkD = K('#6e4636');
      ribbon((() => { const o = []; for (let i = 0; i <= 14; i++) { const t = i / 14, s = 1 - t; o.push([s * s * s * (cx - 10 * u) + 3 * s * s * t * (cx - 90 * u) + 3 * s * t * t * (cx + 120 * u) + t * t * t * (cx + 10 * u), s * s * s * (R + 1) + 3 * s * s * t * (R - 90 * u) + 3 * s * t * t * (R - 150 * u) + t * t * t * (R - 260 * u)]); } return o; })(), t => 1.9 - t * 0.9, (t, v) => v < -0.3 ? barkD : bark);
      stamp(plantL, O);
      for (const [x, y, rx, ry] of [[cx - 140 * u, R - 220 * u, 100 * u, 56 * u], [cx + 130 * u, R - 300 * u, 110 * u, 60 * u], [cx - 10 * u, R - 330 * u, 130 * u, 70 * u]]) {
        area(x - rx * 1.4, y - ry * 1.6, x + rx * 1.4, y + ry * 1.2, (px, py) => {
          for (let i = 0; i < 5; i++) { const ex = x + (i - 2) * rx * 0.4, ey = y - Math.sin(i / 4 * Math.PI) * ry * 0.4, p = (px - ex) / (rx * 0.44), q = (py - ey) / (ry * 0.68); if (p * p + q * q <= 1) return py > y + ry * 0.3 ? L1 : (py < y - ry * 0.25 && px < x + rx * 0.3) ? L2 : L0; }
          return 0;
        });
        stamp(plantL, O);
        tips.push([x + rx * 0.3, y - ry * 0.7]);
      }
    } else if (T === 'Pothos') {
      const cream = K('#fff5d6');
      [[-0.25, 235], [0.2, 225], [-0.7, 205], [0.62, 200], [-1.15, 150], [1.05, 160], [-0.45, 130], [0.45, 125]].forEach(([a, len], i) => {
        const ex = cx + Math.sin(a) * len * 1.08 * u, ey = R - Math.cos(a) * len * 0.98 * u;
        stem(quad(cx + a * 0.8, R + 1, cx + Math.sin(a) * len * 0.4 * u, R - len * 0.7 * u, ex, ey, 8), 0.5, L1, 0);
        const tp = heartLeaf(plantL, ex, ey, a * 0.9, (70 + jit[i] * 22) * u, i % 2 ? L0 : L2, i % 2 ? L2 : L0, i % 3 === 0 ? cream : 0);
        if (i < 6) tips.push(tp);
      });
    } else if (T === 'String of Pearls') {
      const pearls = [];
      for (let i = 0; i < 34; i++) { const a = (mj[i % 48] - 0.5) * 2.6, r = 30 + mj[(i + 7) % 48] * 120; pearls.push([cx + Math.sin(a) * r * 1.3 * u, R - 0.5 - Math.cos(a) * r * 0.75 * u - mj[(i + 13) % 48] * 30 * u]); }
      pearls.sort((p, q) => p[1] - q[1]);
      for (const [x, y] of pearls) bead(plantL, x, y);   // each pearl a 2 x 2 bead with a lit cell
      for (let i = 0; i < 4; i++) tips.push(pearls[i * 8]);
    } else if (T === 'Pilea') {
      const coins = [];
      for (let i = 0; i < 9; i++) { const a = (i / 8 - 0.5) * 2.4 + (jit[i] - 0.5) * 0.2, len = 150 + (1 - Math.abs(a) / 1.3) * 150 + jit[i + 9] * 50; coins.push([a, len, 46 + jit[i + 18] * 20, 0.55 + jit[i + 27] * 0.45]); }
      coins.sort((p, q) => q[1] - p[1]);
      stem([[cx, R + 1], [cx, R - 120 * u]], 0.6, L1);
      coins.forEach(([a, len, r, sq], i) => {
        const ex = cx + Math.sin(a) * len * 1.05 * u, ey = R - 100 * u - Math.cos(a) * (len - 100) * u, rr = r * u * 0.95;
        stem(quad(cx, R - 100 * u, cx + Math.sin(a) * len * 0.5 * u, ey + 3, ex, ey + rr * sq * 0.5, 6), 0.45, L1, 0);
        ell(ex, ey, rr, Math.max(1.6, rr * sq), (p, q) => Math.abs(p - 0.1) < 0.2 && Math.abs(q - 0.25) < 0.3 ? L1 : p < -0.2 && q < -0.2 ? L2 : i % 2 ? L0 : (q > 0.35 ? L1 : L0));
        stamp(plantL, OL);
        if (i % 2 === 0) tips.push([ex, ey - rr * sq]);
      });
    } else if (T === 'Aloe') {
      const tooth = K('#fff7e8'), spot = K(mix(L0h, '#ffffff', 0.55));
      [[-1.05, 230], [1.0, 220], [-0.62, 300], [0.66, 290], [-0.22, 340], [0.24, 330], [0.0, 260]].forEach(([a, len], i) => {
        const bx = cx + a * 30 * u, by = R + 1, r = a * 0.8, L = len * u * 0.95, w0 = (46 - Math.abs(a) * 6) * u * 0.95, tx = bx + Math.sin(r) * L, ty = by - Math.cos(r) * L;
        ribbon([[bx, by], [tx, ty]], t => w0 * Math.pow(1 - t, 0.75) + 0.25 + (t > 0.12 && t < 0.8 && Math.round(t * L) % 3 === 0 ? 0.9 : 0), (t, v) => {
          const w = w0 * Math.pow(1 - t, 0.75) + 0.25; if (v < -w) return tooth;
          if (v > w * 0.25) return L1;
          return (Math.round(t * L) % 3 === 1 && v < -w * 0.3 && v > -w * 0.8) ? spot : i % 2 ? L0 : L2;
        });
        stamp(plantL, O);
        if (i > 1 && i < 6) tips.push([tx, ty + 1]);
      });
    } else if (T === 'Sunflower') {
      const hx = cx + 30 * u, hy = R - 300 * u;
      stem(quad(cx, R + 1, cx - 1.5, R - 150 * u, hx, hy, 10), 0.8, L1);
      leaf(cx - 0.5, R - 90 * u, -1.0, 150 * u, 66 * u * 0.85, L2, L0, L1); stamp(plantL, O);
      leaf(cx - 1, R - 170 * u, 1.05, 140 * u, 60 * u * 0.85, L2, L0, L1); stamp(plantL, O);
      const p1 = K('#ffd23a'), p2 = K('#f2a922'), d1 = K('#8a5a3a'), d2 = K('#6a4028');
      area(hx - 11, hy - 11, hx + 11, hy + 11, (px, py) => {
        const dx = px - hx, dy = py - hy, d = Math.hypot(dx, dy), an = Math.atan2(dy, dx);
        const edge = 6.6 + 2.6 * Math.pow(Math.abs(Math.cos(an * 8)), 0.6);
        if (d > edge) return 0;
        if (d < 4.6) return d < 3.6 && (Math.floor(px) + Math.floor(py)) % 2 ? d2 : (dx < -1 && dy < -1 && d > 2.5) ? K('#a87650') : d1;
        return d < 6.4 ? p2 : p1;
      });
      stamp(plantL, O);
      tips.push([cx - 9, R - 12], [cx + 8.5, R - 17.5], [cx - 1.5, R - 4.5]);
    } else if (T === 'Lavender') {
      const sage = K('#a9c3a0'), sageD = K('#7f9a78'), lv1 = K('#a98be0'), lv2 = K('#8c6cd0'), stemK = K('#8fae86');
      for (let i = 0; i < 6; i++) { leaf(cx + (i - 2.5) * 22 * u, R + 1, (i - 2.5) * 0.36, (120 + jit[i] * 50) * u, 1.5, sage, sageD); stamp(plantL, O); }
      for (let i = 0; i < 9; i++) {
        const a = (i / 8 - 0.5) * 1.0 + (jit[i + 6] - 0.5) * 0.12, h = (270 + (1 - Math.abs(a) * 1.4) * 70 + jit[i + 15] * 40) * u * 0.95;
        const bx = cx + a * 20 * u, ex = cx + Math.sin(a) * h, ey = R - Math.cos(a) * h;
        ribbon([[bx, R + 1], [ex, ey]], t => t > 0.6 ? 1.25 * Math.sin(Math.PI * Math.min(1, (t - 0.6) / 0.42 + 0.12)) + 0.3 : 0.45, (t, v, x, y) => t > 0.6 ? ((y + (v > 0 ? 1 : 0)) % 2 ? lv1 : lv2) : stemK);
        stamp(plantL, O);
        if (i % 2 === 0) tips.push([ex, ey - 1]);
      }
    } else if (T === 'Flytrap') {
      for (let i = 0; i < 7; i++) { leaf(cx + (i - 3) * 16 * u, R + 1, (i - 3) * 0.42, (90 + jit[i] * 30) * u, 34 * u, L2, L0); stamp(plantL, O); }
      tips.push([cx - 8.5, R - 4.5], [cx + 8.5, R - 5.4]);
    }
    outline(plantL);
    const traps = T === 'Flytrap' ? [[cx - 130 * u, R - 170 * u, -2.3], [cx + 10 * u, R - 260 * u, -1.55], [cx + 140 * u, R - 160 * u, -0.85]] : [];
    for (const [tx, ty] of traps) stem(quad(cx, R + 1, (cx + tx) / 2, R - 60 * u, tx, ty, 8), 0.6, L1);
    if (extra[0] === 'Bow') {
      const by = (T === 'Cactus' || T === 'Blooming Cactus' ? R - 120 * u : R - 40 * u), bw = K('#ff5f8f'), bw2 = K('#ff9dbb');
      spT(PX - 5, Math.round(by) - 3, ['bb.......bb', 'bbbb...bbbb', 'bbbbbkbbbbb', 'bbbb.k.bbbb', 'bb.......bb'].map(r => r), { b: bw, k: bw2 });
      stamp(plantL, O);
      put(plantL, PX - 4, Math.round(by) - 2, bw2); put(plantL, PX + 4, Math.round(by) - 2, bw2);
    }
    // the top of the plant (for the halo and the blue rose)
    let plantTop = R;
    const findTop = () => { plantTop = R; for (let y = 0; y < N && plantTop === R; y++) for (let x = 0; x < N; x++) if (plantL[y * N + x]) { plantTop = y; break; } };
    findTop();
    // the coveted find: one big blue rose on a long stem, standing up out of whatever the plant is,
    // above its top so it shows on a small tile, with a sparkle that never goes out
    const roseX = Math.round(cx + (T === 'Cactus' || T === 'Snake Plant' ? 7 : 4)), roseY = Math.max(8, Math.min(R - 15, plantTop + 1));
    if (blueRose) {
      const rb1 = K('#3f66e0'), rb2 = K('#8fb0ff'), rb3 = K('#24338f'), rbW = K('#e3ecff');
      stem(quad(cx + 1, R + 1, roseX - 1, (R + roseY) / 2, roseX, roseY + 4, 10), 0.5, L1);
      leaf(roseX - 0.5, Math.round((R + roseY) / 2) + 2, -1.0, 4, 1.5, L2, L0); stamp(plantL, O);
      leaf(roseX, Math.round((R + roseY) / 2) - 2, 1.0, 3.6, 1.4, L2, L0); stamp(plantL, O);
      spT(roseX - 4, roseY - 4, ['..bbbbb..', '.bwaaabb.', 'bwaccaabb', 'baacbcaab', 'baaccaaab', 'bbaaaaabb', '.bbaaabb.', '..bbbbb..'], { a: rb1, b: rb2, c: rb3, w: rbW });
      stamp(plantL, O);
      for (const s of [-1, 1]) { put(plantL, roseX + s * 2, roseY + 4, L0); put(plantL, roseX + s * 3, roseY + 4, L1); }
      findTop();
    }
    if (extra[0] === 'Halo') {
      const hy = Math.max(2, plantTop - 3), hk = K('#ffe680'), hk2 = K('#fff6c2');
      area(cx - 8, hy - 3, cx + 8, hy + 3, (px, py) => { const p = (px - cx) / 6.2, q = (py - hy) / 1.9, p2 = (px - cx) / 4.0, q2 = (py - hy) / 0.7; return p * p + q * q <= 1 && p2 * p2 + q2 * q2 > 1 ? (py < hy ? hk2 : hk) : 0; });
      stamp(plantL, O);
    }

    // ---------- the pot ----------
    const potM = lay();
    let PC0 = PT === 'Woven Basket' ? '#e6be86' : glaze[2], PC1 = PT === 'Woven Basket' ? '#c99a5a' : glaze[3];
    if (PT === 'Tin Can') { PC0 = '#e3e7ee'; PC1 = '#b8bfcc'; }
    const opal = glaze[0] === 'Opal' && PT !== 'Woven Basket' && PT !== 'Tin Can';
    const P0 = K(PC0), P1 = K(PC1), PL = K(mix(PC0, '#ffffff', 0.55));
    const opalK = ['#ffe0f0', '#e0f4ff', '#e6ffe8', '#efe0ff'].map(K);
    const bodyCol = (x, y) => { const w = hw(y), dx = x - PX; if (PT === 'Hexagon') return dx < -w * 0.4 ? PL : dx > w * 0.4 ? P1 : P0; if (dx >= w * 0.5) return P1; return opal ? opalK[Math.floor((x + y * 0.7) / 3) % 4] : P0; };
    // under the body: a teacup's saucer and handle, a bucket's back
    if (PT === 'Teacup') {
      ell(cx, PB + 1.2, Bw + 7, 1.8, (p, q) => q < -0.3 ? PL : P1); stamp(potL, O);
      area(cx + A - 4, PR + 1, cx + A + 6, PR + 13, (px, py) => { const p = (px - cx - A + 0.5) / 4.4, q = (py - PR - 6.5) / 5.2, p2 = (px - cx - A + 0.5) / 2.1, q2 = (py - PR - 6.5) / 2.8; return p * p + q * q <= 1 && p2 * p2 + q2 * q2 > 1 ? P0 : 0; });
      stamp(potL, O);
    }
    area(PX - 20, PR - 3, PX + 22, PB, (px, py, x, y) => {
      if (y < PR) return 0;
      const dx = x - PX, w = hw(y);
      let inside = Math.abs(dx) < w;
      if (PT === 'Rain Boot' && !inside && y >= PB - 7) { const p = (px - (cx + toeDir * (A + 1))) / 7, q = (py - (PB - 1.6)) / 6.2; inside = p * p + q * q <= 1 && py <= PB + 1 && (px - cx) * toeDir > 0; }
      if (!inside) return 0;
      if (!band && form !== 'egg') { const rx = A - 0.5, lip = R + 0.3 + 2.3 * Math.sqrt(Math.max(0, 1 - Math.pow(dx / rx, 2))); if (py < lip && Math.abs(dx) < rx) return 0; }
      if (form === 'egg' && y < PR + 3) { const zz = [0, 1, 2, 1][(x + 40) % 4] + (decoJ[(x + 40) % 30] > 0.7 ? 1 : 0); if (y - PR < zz) return 0; }
      return bodyCol(x, y);
    });
    for (let i = 0; i < N * N; i++) if (tmp[i]) potM[i] = 1;
    stamp(potL, O);
    // the painted decoration, kept off the face
    const art = (x, y, k) => { if (get(potM, x, y) && !faceBox(x, y) && k) potL[y * N + x] = k; };
    const artAny = (x, y, k) => { if (get(potM, x, y) && k) potL[y * N + x] = k; };
    const rimRow = PR + (band ? band - 1 : 3), footRow = PB - 3, artL = lum[P0] > 0.8 ? P1 : PL;
    if (potArt === 'Polka Dots') { for (let y = rimRow + 1; y < PB - 1; y += 4) for (let x = PX - 16; x < PX + 16; x += 4) { const ox = x + ((y - rimRow) / 4 % 2 ? 2 : 0); art(ox, y, artL); art(ox + 1, y, artL); art(ox, y + 1, artL); art(ox + 1, y + 1, artL); } }
    else if (potArt === 'Rim Stripes') { for (let x = 0; x < N; x++) { artAny(x, rimRow + 1, P1); artAny(x, rimRow + 3, artL); artAny(x, footRow, P1); artAny(x, footRow - 2, artL); } }
    else if (potArt === 'Zigzag Band') { for (let x = 0; x < N; x++) { const z = [0, 1, 2, 1][x % 4]; artAny(x, footRow - 2 + z, artL); artAny(x, rimRow + 1 + z, P1); } }
    else if (potArt === 'Daisy Chain') { for (let i = -3; i <= 3; i++) { const x = PX + i * 5, y = footRow - 1 + (i % 2 ? 0 : -1); for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) artAny(x + a, y + b, WH); artAny(x, y, YEL); } }
    else if (potArt === 'Drips') { for (let x = 0; x < N; x++) { const len = 1 + Math.floor(decoJ[x % 30] * 5) * (x % 3 === 0 ? 1 : 0.3); for (let y = PR; y <= rimRow + 1 + len; y++) if (y <= rimRow + 1 || x % 3 === 0 || (x % 3 === 1 && y <= rimRow + 2)) artAny(x, y, P1); } }
    else if (potArt === 'Can Label') {
      const lab = K(opal ? '#f3dcf0' : glaze[2]), labD = K(glaze[3]), ridge = P1;
      for (let y = PR; y <= PB; y++) for (let x = 0; x < N; x++) { if (!get(potM, x, y)) continue; const dx = x - PX; if (y >= PR + 4 && y <= PB - 4) potL[y * N + x] = y === PR + 4 || y === PB - 4 ? labD : dx >= hw(y) * 0.5 ? labD : lab; else if (y === PR + 2 || y === PB - 2) potL[y * N + x] = ridge; }
      const lx = PX + 10, ly = PB - 5; sp(potL, lx - 3, ly - 3, ['...d', '..dd', '.ddd', 'oooo'], { d: labD, o: O });
    } else if (potArt === 'Speckled Shell') { const sk = K('#b08a72'); for (let i = 0; i < 26; i++) art(PX - 10 + Math.floor(mj[i] * 21), PR + 2 + Math.floor(mj[(i + 11) % 48] * 14), sk); }
    if (glaze[0] === 'Speckled Oat' && PT !== 'Woven Basket') { const sk = K('#9c7c64'); for (let i = 0; i < 34; i++) art(PX - 13 + Math.floor(mj[i % 48] * 27 + i * 3 % 5), PR + Math.floor(mj[(i * 7) % 48] * (PB - PR)), sk); }
    if (PT === 'Ribbed') for (let y = PR; y <= PB; y++) { const w = hw(y); for (let k = -4; k <= 4; k++) { const x = Math.round(PX + k * w / 5); art(x, y, k < 2 ? PL : P1); } }
    if (potArt === 'Night Dip') {
      const n1 = K('#2d3274'), n2 = K('#15163a'), gold = K('#ffd86a'), gold2 = K('#fff4c8');
      for (let y = PR; y <= PB; y++) for (let x = 0; x < N; x++) {
        const wav = Math.sin(x * 0.7 + decoJ[2] * 6) > 0 ? 1 : 0;
        if ((y <= FY - 6 + wav) || (y >= MY + 4 - wav)) artAny(x, y, (y <= FY - 8 || y >= MY + 6) ? n2 : n1);
      }
      for (let i = 0; i < 9; i++) { const x = PX - 10 + Math.floor(decoJ[(i * 3) % 30] * 21), y = i % 2 ? PR + 1 + Math.floor(decoJ[(i * 7 + 5) % 30] * 3) : PB - 1 - Math.floor(decoJ[(i * 7 + 5) % 30] * 3); if (get(potM, x, y)) { potL[y * N + x] = i % 3 ? gold : gold2; if (i % 4 === 0) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) artAny(x + a, y + b, gold); } }
    }
    if (PT === 'Woven Basket') {
      const w1 = K('#d6a768'), w2 = K('#b9864a');
      for (let y = PR; y <= PB; y++) for (let x = 0; x < N; x++) { if (!get(potM, x, y)) continue; const r = Math.floor((y - PR) / 2), xx = x + (r % 2) * 2, inRow = (y - PR) % 2; potL[y * N + x] = inRow === 1 && xx % 4 === 0 ? w2 : xx % 4 < 2 ? (x - PX >= hw(y) * 0.5 ? w2 : PC0 === '#e6be86' ? P0 : P0) : w1; }
    } else if (glaze[0] === 'Gold Leaf') { const fl = K('#fff3b0'); for (let i = 0; i < 9; i++) { const x = PX - 9 + Math.floor(jit[i] * 18), y = PR + 3 + Math.floor(jit[i + 9] * 16); art(x, y, fl); art(x + 1, y, fl); art(x, y - 1, fl); } }
    else if (opal) { for (let i = 0; i < 8; i++) { const x = PX - 10 + Math.floor(mj[i] * 20), y = PR + 3 + Math.floor(mj[i + 12] * 16); art(x, y, WH); art(x, y - 1, artL); art(x, y + 1, artL); } }
    if (PT === 'Rain Boot') { const sole = P1, tread = K(mix(PC1, '#3d2a4a', 0.3)); for (let x = 0; x < N; x++) { artAny(x, PB, sole); artAny(x, PB - 1, sole); if (x % 3 === 0) artAny(x, PB, tread); } }
    // a hand-placed glaze highlight down the left side
    if (PT !== 'Woven Basket') for (let y = PR + (band ? band : 3); y < PR + (band ? band : 3) + (form === 'bowl' ? 4 : 7); y++) { const x = PX - Math.ceil(hw(y)) + 2; if (get(potM, x, y) && !faceBox(x, y)) { potL[y * N + x] = PL; if (y < PR + (band || 3) + 2) put(potL, x + 1, y, PL); } }
    // rims and bands
    if (band) {
      const bandK = PT === 'Woven Basket' ? K('#d7a86c') : PT === 'Rain Boot' ? P1 : P0;
      area(cx - A - 2, PR - 1, cx + A + 2, PR - 1 + band - 1, (px, py, x, y) => { const dx = x - PX, w = A + 1; if (Math.abs(dx) >= w) return 0; if ((y === PR - 1 || y === PR - 2 + band) && Math.abs(dx) >= w - 1) return 0; return PT === 'Woven Basket' ? ((x + y) % 3 ? bandK : K('#c49656')) : dx >= w * 0.55 ? P1 : y === PR - 1 ? PL : bandK; });
      stamp(potL, O);
      if (PT === 'Rain Boot') { const tabX = PX - toeDir * (Math.round(A) - 2); spT(tabX - 2, PR - 5, ['.ooo.', 'o...o', 'o...o', 'o...o'], { o: O }); for (let i = 0; i < N * N; i++) if (tmp[i]) { potL[i] = tmp[i]; tmp[i] = 0; } qx0 = qy0 = N; qx1 = qy1 = -1; }
    } else if (PT === 'Tin Can') {
      for (let x = 0; x < N; x++) for (let y = PR - 3; y < PR + 3; y++) if (potL[y * N + x] === O && get(potM, x, y + 1) && Math.abs(x - PX) < A - 1 && y > R) put(potL, x, y, PL);
    } else if (form !== 'egg') { for (let x = 0; x < N; x++) for (let y = PR; y < PR + 4; y++) if (get(potM, x, y) && get(potL, x, y - 1) === O && Math.abs(x - PX) < A - 2) { put(potL, x, y, PL); break; } }
    if (PT === 'Bucket') {
      const metal = K('#aab2c2'), arc = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; arc.push([cx + Math.cos(a) * (A + 0.5), PR - 1 + Math.sin(a) * 14]); }
      ribbon(arc, () => 0.45, metal); stamp(potL, O);
    }
    if (PT === 'Eggshell') {   // the egg cup it sits in
      const cupC = K(['#9fd8f5', '#ffb3c4', '#ffe08a', '#bfe3b0'][Math.floor(mj[40] * 4)]), cupL = WH;
      box(PX - 4, PB + 3, 9, 2, cupC); box(PX - 2, PB + 1, 5, 2, cupC); stamp(potL, O);
      ell(cx, PB - 0.5, 8.2, 3.4, (p, q) => q < -0.5 ? 0 : p < -0.55 && q < 0.3 ? cupL : cupC); stamp(potL, O);
    }
    if (mouth[0] === 'Chipped Tooth') {   // a chip knocked out of the rim, the bare clay showing in it
      const chx = PX + 3 + Math.floor(mj[45] * 3), bare = K('#d9805a');
      for (const [dx, depth] of [[-2, 1], [-1, 2], [0, 3], [1, 2], [2, 1]]) {
        const x = chx + dx; let y = Math.max(0, PR - 4); while (y < PB && !potL[y * N + x]) y++;
        for (let k = 0; k < depth; k++) potL[(y + k) * N + x] = 0;
        put(potL, x, y + depth, Math.abs(dx) > 1 ? O : bare); if (Math.abs(dx) < 2) put(potL, x, y + depth + 1, O);
      }
    }
    // trailing stems in front of the pot (on the walker and the cosmos they hang at the pot's sides, clear of the face)
    const sideTrail = walker || cosmos;
    if (T === 'Pothos') {
      for (const sd of [-1, 1]) {
        const x0 = cx + sd * (sideTrail ? A - 0.5 : A - 2), y0 = R, drop = (170 + mj[sd > 0 ? 1 : 2] * 90) * u, x1 = cx + sd * (A + (sideTrail ? 4.5 : 3)), pts = quad(x0, y0, x0 + sd * 5, y0 + 1.5, x1, y0 + drop, 10);
        ribbon(pts, () => 0.45, L1); stamp(potL, 0);
        for (let k = 0; k < 4; k++) { const [qx, qy] = pts[2 + k * 2]; heartLeaf(potL, qx, qy, Math.PI + sd * (k % 2 ? -0.6 : 0.8), (44 + k * 4) * u, k % 2 ? L0 : L2, k % 2 ? L2 : L0, 0); }
      }
    } else if (T === 'String of Pearls') {
      for (const sd of [-1, 1]) for (let s2 = 0; s2 < 3; s2++) {
        const x0 = cx + sd * (sideTrail ? A - 0.5 - s2 * 1.1 : A - 2.5 - s2 * 1.7), len = (120 + mj[s2 + (sd > 0 ? 3 : 6)] * 140) * u, pts = quad(x0, R, x0 + sd * 4, R + 0.5, x0 + sd * (4 - s2 * 0.6), R + len, 10);
        ribbon(pts, () => 0.4, L1); stamp(potL, 0);
        for (let k = 0; k * 3 < len; k++) { const [px, py] = pts[Math.min(10, Math.round(k * 3 / len * 10))]; bead(potL, px, py); }
      }
    }
    outline(potL);
    if (extra[0] === 'Plant Stake') {
      const sx = PX + Math.round(A) - 4, card = K('#fff7e8'), stick = K('#c99a6a');
      for (let y = R - 6; y <= R + 1; y++) put(potL, sx, y, stick);
      box(sx - 4, R - 13, 9, 7, card); stamp(potL, O);
      for (let x = sx - 3; x <= sx + 3; x++) put(potL, x, R - 11, L1);
      for (let x = sx - 3; x <= sx; x++) put(potL, x, R - 9, L1);
    }
    if (companion === 'Ladybug') {
      const sd = extra[0] === 'Plant Stake' ? -1 : compSide, lx = PX + sd * (Math.round(A) - 4), ly = (band ? PR - 2 : R) - 2, red = K('#ff5a5f');
      spT(lx - 2, ly - 1, sd > 0 ? ['.rrr..', 'rrdrrh', 'rdrdrh'] : ['..rrr.', 'hrrdrr', 'hrdrdr'], { r: red, d: O, h: O });
      stamp(potL, O); put(potL, lx + (sd > 0 ? -1 : 1), ly, K('#ffd0d2'));
    }
    if (companion === 'Fairy Lights') {
      const y0 = PB - 6, wE = hw(PB - 5) - 0.5, pts = [...quad(cx - wE, y0, cx - wE / 2, y0 + 3.2, cx, y0 + 1, 8), ...quad(cx, y0 + 1, cx + wE / 2, y0 + 3.4, cx + wE, y0, 8).slice(1)];
      ribbon(pts, () => 0.5, O); for (let i = 0; i < N * N; i++) if (tmp[i] && !potM[i]) tmp[i] = 0; stamp(potL, 0);
    }

    // ---------- the two legendary materials repaint the plant and pot ----------
    const goldRamp = ['#7a4e12', '#c58b25', '#efc14a', '#fff1a6'].map(K), cosRamp = (cosmos ? ['#272c74', '#3b46ac', '#6c64d4', '#aa9cfa'] : ['#15163a', '#2d3274', '#5a4fb0', '#9d86f0']).map(K);
    const isGold = new Uint8Array(256), starCells = [], facePatch = lay();
    if (gilded || cosmos) {
      const ramp = gilded ? goldRamp : cosRamp, remap = {};
      const re = k => { if (!k || k === O) return k; if (remap[k] === undefined) { const l = lum[k]; remap[k] = ramp[gilded ? (l < 0.25 ? 0 : l < 0.6 ? 1 : l < 0.88 ? 2 : 3) : (l < 0.42 ? 0 : l < 0.62 ? 1 : l < 0.8 ? 2 : 3)]; } return remap[k]; };
      // the pot itself: its body and rim (not the plant trailing over it)
      const inPot = i => { const x = i % N, y = (i / N) | 0; return potM[i] || (y >= PR - 2 - band && y <= PR + 1 && Math.abs(x - PX) <= A + 2) || (PT === 'Teacup' && y > PB) || (PT === 'Teacup' && Math.abs(x - PX) > A - 4 && y >= PR && y <= PR + 13); };
      // gilded: Midas's touch, the plant turns to gold with its pot; cosmos: the pot goes to the night and the
      // plant to nebula, violet to pink
      if (gilded) {   // the plant turns to pale champagne gold with bright highlights, so it never melts into the deep-gold pot
        const rose = ['#6a5418', '#b8962e', '#ecd476', '#fffbe2'].map(K), rr = {};
        for (let i = 0; i < N * N; i++) { const k = plantL[i]; if (!k || k === O) continue; if (rr[k] === undefined) { const l = lum[k]; rr[k] = rose[l < 0.25 ? 0 : l < 0.6 ? 1 : l < 0.88 ? 2 : 3]; } plantL[i] = rr[k]; }
      }
      if (cosmos) {
        const neb = ['#3b1c6e', '#7440b8', '#cf68d4', '#ffd2f2'].map(K), rn = {};
        for (let i = 0; i < N * N; i++) { const k = plantL[i]; if (!k || k === O) continue; if (rn[k] === undefined) { const l = lum[k]; rn[k] = neb[l < 0.42 ? 0 : l < 0.62 ? 1 : l < 0.8 ? 2 : 3]; } plantL[i] = rn[k]; }
      }
      for (let i = 0; i < N * N; i++) if (cosmos || inPot(i)) potL[i] = re(potL[i]);
      for (const k of ramp) isGold[k] = 1;
      if (cosmos) {
        // the pot is a cut-out of the night sky: flat deep blue, a dithered band of nebula, fixed stars
        for (let i = 0; i < N * N; i++) {
          if (!inPot(i) || !isGold[potL[i]]) continue;
          const x = i % N, y = (i / N) | 0, v = (x - PX) * 0.55 - (y - (PR + PB) / 2) + Math.sin(x * 0.6) * 1.5;
          potL[i] = Math.abs(v) < 1.2 ? cosRamp[2] : Math.abs(v) < 3.2 && (x + y) % 2 ? cosRamp[1] : cosRamp[0];
        }
        // a small star-free patch of plain night behind the face, so the cream face reads against it
        for (let i = 0; i < N * N; i++) {
          if (!inPot(i) || !isGold[potL[i]]) continue;
          const x = i % N, y = (i / N) | 0, p = (x + 0.5 - cx) / (G + 5), q = (y + 0.5 - FY - 1.5) / 8.5;
          if (p * p + q * q <= 1) { potL[i] = cosRamp[0]; facePatch[i] = 1; }
        }
        const bright = K('#fff6cc');
        for (let k = 0, made = 0; k < 40 && made < 3; k++) { const x = PX - 8 + Math.floor(fr() * 17), y = PR + 2 + Math.floor(fr() * (PB - PR - 3)); if (faceBox(x, y) || facePatch[y * N + x] || !inPot(y * N + x)) continue; made++; potL[y * N + x] = WH; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (isGold[get(potL, x + a, y + b)]) potL[(y + b) * N + x + a] = bright; }
        for (let i = 0; i < 420 && starCells.length < 80; i++) { const x = Math.floor(fr() * N), y = Math.floor(fr() * N); if (facePatch[y * N + x]) continue; if (isGold[potL[y * N + x]] || isGold[plantL[y * N + x]]) starCells.push([x, y, fr() * 6.28, potL[y * N + x] ? 1 : 0]); }
      }
    }
    // the gilded pot's jewels: a row of set stones round the rim, gem buds on the golden plant, a crown cocked on the rim
    if (gilded) {
      const ruby = K('#e8364f'), rubyD = K('#a81c3a'), sapph = K('#4a7af0'), emer = K('#2fbf78'), gemL = K('#fff4f0');
      const gy = band ? PR + Math.floor(band / 2) - 2 : PR + 2, gems = [ruby, sapph, emer];
      for (let x = PX - Math.round(A) + 3, j = 0; x <= PX + Math.round(A) - 4; x += 5, j++) {
        if (faceBox(x, gy) || faceBox(x + 1, gy + 1)) continue;
        if (!isGold[get(potL, x, gy)] || !isGold[get(potL, x + 1, gy + 1)]) continue;
        const g = gems[j % 3];
        potL[gy * N + x] = gemL; potL[gy * N + x + 1] = g; potL[(gy + 1) * N + x] = g; potL[(gy + 1) * N + x + 1] = g === ruby ? rubyD : O;
      }
      for (const [tx, ty] of tips.slice(0, 4)) { const x = Math.round(tx), y = Math.round(ty) + 1; if (get(plantL, x, y)) { put(plantL, x, y, gemL); put(plantL, x + 1, y, ruby); put(plantL, x, y + 1, ruby); put(plantL, x + 1, y + 1, rubyD); } }
      const crY = (band ? PR - 2 : R) - 5, crX = PX - Math.round(A) - 1;
      spT(crX, crY, ['r...b...r', 'y...y...y', 'yy.yYy.yy', 'yyyyYyyyy', 'yrYybyYry', 'YYYYYYYYY'], { y: goldRamp[2], Y: goldRamp[1], r: ruby, b: sapph });
      stamp(potL, O);
    }

    // ---------- the face's still parts: cheeks, brows, mouth ----------
    const E = eyes[0], M = mouth[0];
    const eyeW = { Dots: 3, Wink: 3, Sparkly: 5, Teary: 5, Smiley: 5, Sleepy: 5, Wide: 6, Stars: 7, Hearts: 7, Spirals: 5, Lashes: 5, 'Side Glance': 6, 'Pie Eyes': 4, 'Happy Tears': 5, Galaxy: 5, 'Pressed Holes': 4, 'Folk Painted': 5 }[E] || 4;
    const eyeH = { Smiley: 2, 'Happy Tears': 2, Sleepy: 3, 'Side Glance': 4, 'Folk Painted': 5 }[E] || (E === 'Stars' ? 7 : E === 'Hearts' ? 6 : E === 'Wide' || E === 'Sparkly' || E === 'Teary' || E === 'Galaxy' ? 6 : 4);
    const eyeTop = FY - Math.floor(eyeH / 2) - (eyeH >= 6 ? 1 : 0);
    const pair = (D, rows, map, off, top, mirror) => { const w = rows[0].length, xl = PX - off - Math.floor(w / 2); sp(D, xl, top, rows, map, false); sp(D, 2 * PX + 1 - xl - w, top, rows, map, mirror); };
    const fm = { o: INK, O: O, w: INK === O ? WH : O, p: PINK, h: HOT, b: BLU, y: YEL, s: K('#ffd9b0'), S: K('#f2bd8a'), r: K('#b06a52') };
    const cheekX = G + Math.ceil(eyeW / 2) + 1;
    const plainCheek = !['No Blush', 'Heart Cheeks', 'Swirls', 'Glaze Tears', 'Rosy Dots'].includes(cheeks);
    if (plainCheek && extra[0] !== 'Sunglasses') pair(potL, ['.pp.', 'pppp'], fm, cheekX - 1, FY + 2, true);
    else if (plainCheek) pair(potL, ['pppp'], fm, cheekX, FY + 4, true);
    if (cheeks === 'Freckles') pair(potL, ['r.r.', '.r.r'], fm, cheekX - 1, FY + 2, true);
    else if (cheeks === 'Heart Cheeks') pair(potL, ['h.h', 'hhh', '.h.'], fm, cheekX - 1, FY + 2, true);
    else if (cheeks === 'Swirls') pair(potL, ['.pp.', 'p..p', 'p.pp', '.p..'], fm, cheekX - 1, FY + 1, true);
    else if (cheeks === 'Plaster') sp(potL, PX + cheekX - 3, FY + 1, ['..OOO.', '.OsSsO', 'OsSsO.', '.OOO..'], fm);
    else if (cheeks === 'Sparkles') pair(potL, ['.y.', 'yyy', '.y.'], fm, cheekX + 1, eyeTop - 2, true);
    else if (cheeks === 'Rosy Dots') pair(potL, ['.hh.', 'hhhh', 'hhhh', '.hh.'], fm, cheekX, FY + 2, true);   // painted folk-art cheeks
    else if (cheeks === 'Glaze Tears') {   // the glaze ran from under each eye in the kiln: long glossy drips, a bead at the end
      const tearK = K(mix(PC1, '#3d2a4a', 0.32)), tearL = K(mix(PC0, '#ffffff', 0.7));
      for (const s3 of [-1, 1]) { const tx = PX + s3 * G + (s3 > 0 ? 1 : 0) - (s3 > 0 ? 0 : 1), len = 4 + Math.floor(mj[46 + (s3 > 0 ? 1 : 0)] * 3); for (let k = 0; k < len; k++) put(potL, tx, FY + 3 + k, tearK); put(potL, tx - 1, FY + 3 + len, tearK); put(potL, tx, FY + 3 + len, tearK); put(potL, tx - 1, FY + 4 + len, tearK); put(potL, tx, FY + 4 + len, tearK); put(potL, tx - 1, FY + 3 + len, tearL); }
    }
    const browRows = { Soft: ['.ooo.', 'o....'], Raised: ['.ooo.', 'o...o'], Worried: ['...oo', '.oo..', 'o....'], Grumpy: ['oo...', '.ooo.', '...oo'], Bushy: ['ooooo', 'ooooo'] }[brows];
    const browAt = eyeTop - 2 - (brows === 'Raised' ? 1 : 0);
    if (extra[0] !== 'Sunglasses' || brows === 'Bushy') {
      if (browRows) pair(potL, browRows, fm, G, browAt - browRows.length + 1 - (extra[0] === 'Sunglasses' ? 1 : 0), true);
      else if (brows === 'Uneven') { sp(potL, PX - G - 2, browAt - 2, ['.ooo.', 'o...o'], fm); sp(potL, PX + G - 2, browAt, ['ooooo'], fm); }
    }
    const mouths = {
      Smile: ['o...o', '.ooo.'], Beam: ['ooooooo', 'ooooooo', '.ohhho.', '..ooo..'], Blep: ['ooooo', '..hh.', '..hh.'], Oh: ['.o.', 'ooo', 'ooo', '.o.'],
      Kitty: ['o.o.o', '.o.o.'], Wobble: ['.o.o.o.', 'o.o.o.o'], Fangs: ['o.....o', '.ooooo.', '.ow.wo.', '..o.o..'], Whistle: ['.o.', 'o.o', '.o.'],
      Toothy: ['o.....o', '.ooooo.', '..owo..', '...o...'], Gasp: ['.ooo.', 'ooooo', 'ooooo', 'ohhho', '.ooo.'], Smirk: ['......o', 'o....o.', '.oooo..'],
      Gritted: ['ooooooo', 'owowowo', 'ooooooo'], Cheeky: ['o...o..', '.oooo..', '...hh..', '...hh..'], Kiss: ['oo.', '..o', 'oo.', '..o', 'oo.'], 'Bubble Gum': ['.o.', 'o.o', '.o.'],
      'Chipped Tooth': ['ooooooo', 'owwowwo', '.ow.wo.', '..ooo..'], 'Painted Bow': ['hh.hh', 'hhhhh', '.hhh.'],
    };
    const mr2 = mouths[M] || mouths.Smile, mW = mr2[0].length;
    const mfm = Object.assign({}, fm, { w: WH });
    if (cheeks === 'Moustache') sp(potL, PX - 4, MY - 3, ['oo.....oo', 'o.ooooo.o', '.ooo.ooo.'], fm);
    sp(potL, PX - Math.floor(mW / 2), MY, mr2, mfm);

    // ---------- the shelf companion ----------
    const look = -compSide, X = compX;
    const LX = dx => X + look * dx;   // x measured toward the pot
    if (companion === 'Snail') {
      const body = K('#f6d7b0'), bodyD = K('#e2b98c'), shellC = K(['#ffb3c4', '#b9c3ff', '#ffe08a', '#bfe3b0'][Math.floor(mj[41] * 4)]);
      area(X - 8, CB - 7, X + 8, CB, (px, py, x, y) => { const d = (px - X) * look; if (y >= CB - 1 && d > -6.5 && d < 5.5) return y === CB ? bodyD : body; const p = (d - 4) / 1.9, q = (py - (CB - 3)) / 2.6; return p * p + q * q <= 1 ? body : 0; });
      stamp(comp, O);
      ell(X - look * 1.5 + 0.5, CB - 5, 4.1, 4.1, (p, q) => p * look < -0.2 && q < -0.3 ? WH : shellC); stamp(comp, O);
      const sx = X - look * 1.5;
      for (const [a, b] of [[0, 0], [1, 0], [1, -1], [0, -2], [-1, -2], [-2, -1], [-2, 0], [-2, 1], [-1, 2], [0, 2], [1, 2], [2, 1]]) put(comp, Math.round(sx + look * a), CB - 5 + b, O);
      for (const dx of [3, 5]) { put(comp, LX(dx), CB - 6, O); put(comp, LX(dx), CB - 7, O); put(comp, LX(dx) + look * 0, CB - 8, O); }
      put(comp, LX(5), CB - 3, O);
    } else if (companion === 'Mini Me') {
      const g2 = K(glaze[0] === 'Rose' ? '#bfe3b0' : '#ffb3c4'), g2d = K(glaze[0] === 'Rose' ? '#9fcd8e' : '#f08fa6');
      ribbon([[X + 0.5, CB - 7], [X + 0.5, CB - 10]], () => 0.45, L0); stamp(comp, O);
      leaf(X + 0.5, CB - 10, -1.1, 3.4, 1.4, L2, L0); stamp(comp, O); leaf(X + 0.5, CB - 10, 1.1, 3.2, 1.3, L2, L0); stamp(comp, O);
      area(X - 6, CB - 7, X + 6, CB, (px, py, x, y) => { const w = 4.6 - (y - CB + 6) * 0.2; return Math.abs(px - X - 0.5) < w ? (px - X - 0.5 > w * 0.4 ? g2d : g2) : 0; }); stamp(comp, O);
      box(X - 5, CB - 8, 11, 2, (a, b) => a > 7 ? g2d : g2); stamp(comp, O);
      put(comp, X - 2, CB - 4, O); put(comp, X + 2, CB - 4, O); put(comp, X - 1, CB - 2, O); put(comp, X, CB - 2, O); put(comp, X + 1, CB - 2, O);
    } else if (companion === 'Watering Can') {
      const wcH = ['#9fd8f5', '#ffb3c4', '#ffe08a', '#c9b8ff'][Math.floor(mj[42] * 4)], wc = K(wcH), wcD = K(mix(wcH, '#3d2a4a', 0.2));
      ribbon([[LX(3), CB - 4], [LX(9), CB - 10]], () => 0.7, wc); stamp(comp, O);
      ell(LX(9.5) + 0.5, CB - 10.5, 1.3, 1.8, wcD); stamp(comp, O);
      area(X - 9, CB - 14, X + 9, CB - 6, (px, py) => { const p = (px - X - 0.5 + look * 1) / 4.2, q = (py - (CB - 8)) / 4.6; const p2 = (px - X - 0.5 + look * 1) / 2.4, q2 = (py - (CB - 8)) / 2.8; return p * p + q * q <= 1 && p2 * p2 + q2 * q2 > 1 && py < CB - 7 ? wc : 0; }); stamp(comp, O);
      box(X - 4, CB - 7, 9, 8, (a, b) => a === 1 && b < 6 ? WH : a > 6 ? wcD : wc); stamp(comp, O);
      put(comp, LX(11), CB - 8, BLU); put(comp, LX(11), CB - 7, BLU); put(comp, LX(12), CB - 5, BLU);
    } else if (companion === 'Toadstools') {
      const capH = ['#ff7f8f', '#ff9f6a', '#c9a3ff'][Math.floor(mj[43] * 3)], cap = K(capH), capD = K(mix(capH, '#3d2a4a', 0.2)), stalkK = K('#fff4e4');
      for (const [dx, h, r] of [[-2, 8, 4.4], [4, 5, 3.2]]) {
        box(X + dx - 1, CB - h, 3, h + 1, stalkK); stamp(comp, O);
        ell(X + dx + 0.5, CB - h + 0.5, r, r * 0.9, (p, q) => q > 0.05 ? 0 : p > 0.5 ? capD : cap); stamp(comp, O);
        put(comp, X + dx - 1, CB - h - 2, WH); put(comp, X + dx + 1, CB - h - 1, WH); if (r > 4) put(comp, X + dx + 2, CB - h - 3, WH);
      }
    } else if (companion === 'Pebble Pals') {
      const pc = ['#d8d2e6', '#c7c0d8', '#e6e0f0'].map(K);
      [[0, 0, 5.4, 2.4], [0.5, -4, 4.1, 2], [-0.3, -7.4, 3, 1.6]].forEach(([dx, dy, rx, ry], i) => { ell(X + 0.5 + dx, CB - ry + dy + 0.6, rx, ry, (p, q) => p < -0.3 && q < -0.3 ? WH : pc[i]); stamp(comp, O); });
      put(comp, X - 2, CB - 1, O); put(comp, X + 2, CB - 1, O);
      leaf(X + 0.2, CB - 9, -0.5, 3, 1.2, L2, L0); stamp(comp, O); leaf(X + 0.2, CB - 9, 0.6, 2.6, 1.1, L2, L0); stamp(comp, O);
    } else if (companion === 'Seed Packet') {
      const paper = K('#fffaf0'), papD = K('#ece0cc'), fl = K(bloomCol === '#ffffff' ? '#ffb3c7' : bloomCol);
      area(X - 5, CB - 12, X + 5, CB, (px, py, x, y) => { if (y === CB - 12 && x % 2) return 0; if (Math.abs(px - X - 0.5) > 4.6) return 0; return x - X >= 3 ? papD : paper; }); stamp(comp, O);
      for (const [a, b] of [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]]) put(comp, X + a, CB - 7 + b, Math.abs(a) + Math.abs(b) === 2 ? 0 : fl);
      put(comp, X, CB - 7, YEL);
      for (let x = X - 3; x <= X + 3; x++) put(comp, x, CB - 3, L1); for (let x = X - 3; x <= X; x++) put(comp, x, CB - 2, L1);
    } else if (companion === 'Book Stack') {
      const bcs = [['#9fd8f5', '#ffb3c4', '#ffe08a'], ['#c9b8ff', '#bfe3b0', '#ffc89a']][Math.floor(mj[44] * 2)], pages = K('#fffaf0');
      [[0, 0, 13, 3], [1, -3, 11, 2], [-1, -5, 12, 3]].forEach(([dx, dy, w, h], i) => {
        const bx = X - Math.floor(w / 2) + dx, k = K(bcs[i]), kd = K(mix(bcs[i], '#3d2a4a', 0.2));
        box(bx, CB + dy - h + 1, w, h, (a, b) => (look > 0 ? a >= w - 2 : a <= 1) ? pages : a === (look > 0 ? 2 : w - 3) ? kd : k); stamp(comp, O);
      });
    } else if (companion === 'Tea Mug') {
      const mcH = ['#ffb3c4', '#9fd8f5', '#fff3df', '#bfe3b0'][Math.floor(mj[45] * 4)], mc = K(mcH);
      area(X - 9, CB - 8, X + 9, CB - 1, (px, py) => { const p = (px - (X + 0.5 - look * 5)) / 2.6, q = (py - (CB - 4.5)) / 2.8, p2 = (px - (X + 0.5 - look * 5)) / 1.2, q2 = (py - (CB - 4.5)) / 1.3; return p * p + q * q <= 1 && p2 * p2 + q2 * q2 > 1 ? mc : 0; }); stamp(comp, O);
      box(X - 4, CB - 9, 9, 10, (a, b) => a === 1 && b > 1 && b < 7 ? WH : a > 6 ? K(mix(mcH, '#3d2a4a', 0.15)) : mc); stamp(comp, O);
      for (let x = X - 3; x <= X + 3; x++) put(comp, x, CB - 9, K('#b7845a'));
      sp(comp, X - 1, CB - 5, ['h.h', 'hhh', '.h.'], { h: HOT });
    } else if (companion === 'Frog') {
      const fc = K('#8fd67a'), fcd = K('#6cb85a'), belly = K('#c8f0b8');
      ell(X + 0.5, CB - 3.4, 6, 3.8, (p, q) => Math.abs(p) < 0.55 && q > -0.1 ? belly : p > 0.6 ? fcd : fc); stamp(comp, O);
      for (const sd of [-1, 1]) { ell(X + 0.5 + sd * 3, CB - 7, 2, 2, fc); stamp(comp, O); put(comp, X + sd * 3, CB - 7, O); put(comp, X + sd * 3 + (sd < 0 ? 1 : 0), CB - 7, O); }
      for (const sd of [-1, 1]) { ell(X + 0.5 + sd * 5.5, CB - 0.2, 2.6, 1, fcd); stamp(comp, O); }
      sp(comp, X - 2, CB - 5, ['o...o', '.ooo.'], { o: O });
      put(comp, X - 4, CB - 5, PINK); put(comp, X + 4, CB - 5, PINK);
    }

    // ================= the viewer: a sunbeam to lean toward, water to give, flowers that pop =================
    let wl = (parseInt(c.hash.slice(42, 50), 16) * 69069 + 1) >>> 0;
    const wr = () => (wl = (Math.imul(wl, 69069) + 1) >>> 0) / 4294967296;
    const drip = [79, 81, 84, 86, 88, 91, 93].map(m => m - Math.floor(wr() * 5));
    const drops = [], splash = [], blooms = [], hearts = [], sparks = [], rings = [];
    const bloomOrder = tips.map((p, i) => [p, wr() + i * 0.001]).sort((p, q) => p[1] - q[1]).map(e => e[0]).slice(0, 7);
    let walkDir = 1, reach = 0, perk = 0, glad = 0, tPot = 0, fed = 0, snapAt = -9, walkX = 0, walkT = 0, hopAt = -9, step = 0, chimeAt = -9;
    const onChar = (x, y) => x >= PX - A - 2 + walkX && x <= PX + A + 2 + walkX && y >= R - 2 && y <= PB + 1;
    const tend = t => {
      const dt = Math.max(0, Math.min(0.1, t - tPot)); tPot = t;
      for (const tap of c.input.taps()) {
        const x = tap.x * N, y = tap.y * N;
        if (scene && scene.tap) { scene.tap(x, y, t); continue; }
        if (legend && onChar(x, y)) {
          if (walker && t - hopAt > 0.55) { hopAt = t; c.sound.note(drip[0] - 12, { dur: 0.12, vel: 0.3, wave: 'triangle' }); c.sound.note(drip[2] - 12, { dur: 0.16, vel: 0.26, wave: 'triangle', at: 0.08 }); c.sound.note(drip[4] - 12, { dur: 0.2, vel: 0.22, wave: 'sine', at: 0.16 }); }
          if (gilded) { chimeAt = t; for (let i = 0; i < 10; i++) sparks.push({ x: PX + (wr() - 0.5) * 2 * A, y: PR + wr() * (PB - PR) - 6, t0: t + i * 0.04 }); [0, 2, 4, 6].forEach((k, i) => c.sound.note(drip[k % drip.length] + 5, { dur: 0.9, vel: 0.16, wave: 'sine', at: i * 0.07 })); }
          if (cosmos) { rings.push({ x, y, t0: t }); c.sound.note(drip[0] - 24, { dur: 1.6, vel: 0.22, wave: 'sine' }); [1, 3, 5].forEach((k, i) => c.sound.note(drip[k] + 7, { dur: 0.7, vel: 0.1, wave: 'triangle', at: 0.15 + i * 0.12 })); }
          continue;
        }
        if (blueRose && Math.hypot(x - roseX - walkX, y - roseY) < 6) { chimeAt = t; [0, 4, 7, 12].forEach((s, i) => c.sound.note(drip[1] + s, { dur: 0.8, vel: 0.14, wave: 'sine', at: i * 0.09 })); continue; }
        const y0 = Math.min(y, R - 16);
        for (let i = 0; i < 4; i++) if (drops.length < 30) drops.push({ x: x + (wr() - 0.5) * 4, y: y0 - wr() * 6, v: 14 + wr() * 8 });
        if (traps.length && t - snapAt > 0.9) { snapAt = t; c.sound.hit('click', 0.4); c.sound.note(drip[0] - 31, { dur: 0.12, vel: 0.3, wave: 'triangle', cutoff: 900 }); }
      }
      for (let i = drops.length; i-- > 0;) {
        const d = drops[i]; d.v += 100 * dt; d.y += d.v * dt;
        const onPot = Math.abs(d.x - cx - walkX) < A - 1, floor = onPot ? R : SH + 1;
        if (d.y >= floor) {
          drops.splice(i, 1); splash.push({ x: Math.floor(d.x), y: Math.floor(floor), a: 0 });
          c.sound.note(drip[Math.floor(wr() * drip.length)], { dur: 0.16, vel: onPot ? 0.26 : 0.16, wave: 'sine', pan: (d.x - 32) / 45 });
          if (onPot) {
            glad = 1.1; perk = Math.min(1, perk + 0.35);
            if (++fed % 4 === 0) {
              if (blooms.length < bloomOrder.length) {
                blooms.push({ at: bloomOrder[blooms.length], t0: t });
                const n = blooms.length;
                c.sound.note(drip[n % drip.length] + 12, { dur: 0.5, vel: 0.2, wave: 'triangle' });
                c.sound.note(drip[(n + 2) % drip.length] + 12, { dur: 0.6, vel: 0.14, wave: 'sine', at: 0.09 });
              } else if (hearts.length < 8) hearts.push({ x: cx + (wr() - 0.5) * 12, t0: t });
            }
          }
        }
      }
      for (let i = splash.length - 1; i >= 0; i--) if ((splash[i].a += dt) > 0.3) splash.splice(i, 1);
      for (let i = hearts.length - 1; i >= 0; i--) if (t - hearts[i].t0 > 1.8) hearts.splice(i, 1);
      for (let i = sparks.length - 1; i >= 0; i--) if (t - sparks[i].t0 > 0.6) sparks.splice(i, 1);
      for (let i = rings.length - 1; i >= 0; i--) if (t - rings[i].t0 > 1.4) rings.splice(i, 1);
      const want = c.input.inside ? Math.max(-1, Math.min(1, (c.input.x * N - cx) / 27)) * 0.13 : 0;
      reach += (want - reach) * Math.min(1, dt * 2.5);
      perk = Math.max(0, perk - dt * 1.2); glad = Math.max(0, glad - dt);
      if (scene && scene.tick) scene.tick(t, dt);
    };

    // ---------- live drawing helpers ----------
    const flower = (D, x, y, k) => {
      const col = K(bloomCol), colD = K(mix(bloomCol, '#3d2a4a', 0.18));
      if (k < 0.35) { pt(x, y, YEL); stamp(D, O); return; }
      if (k < 0.7) { for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pt(x + a, y + b, col); pt(x, y, YEL); stamp(D, O); return; }
      for (let b = -2; b <= 2; b++) for (let a = -2; a <= 2; a++) { const d = Math.abs(a) + Math.abs(b); if (d <= 2 && !(Math.abs(a) === 2 && b) && !(Math.abs(b) === 2 && a)) pt(x + a, y + b, d === 0 ? YEL : Math.abs(a) === 1 && Math.abs(b) === 1 ? colD : col); }
      stamp(D, O);
    };
    const trapK1 = K('#ff6f8a'), toothK = K('#fff7e8');
    const trap = (D, x, y, ang, open) => {
      // two jaws hinged at the stalk: green backs, pink insides, a fringe of pale teeth along the rims
      const th = 0.1 + open * 0.6, L = 8.6;
      for (const d of [-1, 1]) {
        const a = ang + d * th, tx = x + Math.cos(a) * L, ty = y + Math.sin(a) * L;
        const body = t => 2.6 * Math.sin(Math.PI * Math.pow(t, 0.75)) + 0.2;
        ribbon([[x, y], [tx, ty]], t => body(t) + (t > 0.2 && t < 0.92 ? 1.1 : 0), (t, v) => {
          const b = body(t), inner = v * d < 0;
          if (Math.abs(v) > b) return inner && open > 0.25 && Math.round(t * 9) % 2 ? toothK : 0;
          return inner ? (Math.abs(v) > b - 1.1 ? trapK1 : L0) : Math.abs(v) < 0.6 ? L2 : L0;
        });
        stamp(D, O);
      }
    };
    const eyeMap = { o: INK, O: O, w: INK === O ? WH : O, h: HOT, b: BLU, y: YEL, p: K('#ff9ad5'), v: K('#7a5cd6'), n: E === 'Pressed Holes' ? K('#2a1f33') : K('#1e1a4a'), l: PL, c: K('#2f4fb8') };
    const eyeMapC = Object.assign({}, eyeMap, { c: INK, n: E === 'Pressed Holes' ? INK : eyeMap.n }), eyeMapCO = Object.assign({}, eyeMapC, { w: WH });
    const spiralF = [['ooooo', '....o', 'ooo.o', 'o...o', 'ooooo'], ['ooooo', 'o...o', 'o.o.o', 'o.ooo', 'o....'], ['ooooo', 'o...o', 'o.ooo', 'o....', 'ooooo'], ['....o', 'ooo.o', 'o.o.o', 'o...o', 'ooooo']];
    const eyeRows = (Ek, open, t, s) => {
      if (Ek === 'Smiley') return ['.ooo.', 'o...o'];
      if (Ek === 'Happy Tears') return ['.ooo.', 'o...o', 'b....', 'b....'];
      if (!open && !noBlink(Ek)) return ['o...o', '.ooo.'];
      switch (Ek) {
        case 'Dots': case 'Wink': return ['.o.', 'ooo', 'ooo', '.o.'];
        case 'Sparkly': case 'Teary': return ['.ooo.', 'oowwo', 'oowwo', 'ooooo', 'owooo', '.ooo.'];
        case 'Sleepy': return ['ooooo', 'ooooo', '.ooo.'];
        case 'Wide': return ['.OOOO.', 'OwwwwO', 'OwOOwO', 'OwOOwO', 'OwwwwO', '.OOOO.'];
        case 'Stars': return ['...O...', '..OyO..', 'OOyyyOO', 'OyyyyyO', '.OyyyO.', '.OyOyO.', '.OO.OO.'];
        case 'Hearts': return ['.OO.OO.', 'OhwOhhO', 'OhhhhhO', '.OhhhO.', '..OhO..', '...O...'];
        case 'Spirals': return spiralF[(Math.floor(t * 2.5) * s + 400) % 4];
        case 'Lashes': return ['oo...', '..ooo', '.oooo', '.oowo', '..oo.'];
        case 'Side Glance': return glanceX > 0 ? ['.OOOO.', 'OwwOOO', 'OwwOOO', '.OOOO.'] : ['.OOOO.', 'OOOwwO', 'OOOwwO', '.OOOO.'];
        case 'Pie Eyes': return ['.oo.', 'ooww', 'oowo', 'oooo', '.oo.'];
        case 'Pressed Holes': return ['.nn.', 'nnnn', 'nnnn', '.ll.'];   // pushed into the clay: dark hollows with a lit lower lip
        case 'Folk Painted': return ['c.c.c', '.ccc.', 'cwccc', 'ccccc', '.ccc.'];   // painted in cobalt, with three lashes
        case 'Galaxy': {
          const tw = Math.floor(t * 1.7 + s) % 3;
          return ['.OOO.', tw === 0 ? 'OpwvO' : 'OpvvO', 'OpvvO', tw === 1 ? 'OvwnO' : 'OvvnO', tw === 2 ? 'OvnwO' : 'OvnnO', '.OOO.'];
        }
      }
      return ['.o.', 'ooo', 'ooo', '.o.'];
    };
    const glanceX = companion !== 'None' ? compSide : 1;
    const noBlink = Ek => Ek === 'Sleepy' || Ek === 'Pressed Holes' || Ek === 'Folk Painted';   // holes and paint don't blink

    // ================= the Legendary scenes: each its own set, palette and motion =================
    // (built only for a Legendary: an ordinary pot never reaches any of this)
    //   Gilded        Midas's pot, all gold and jewels, on a velvet cushion on a marble plinth between red
    //                 curtains, in a spotlight with dust drifting in it; sparkles run over the gold
    //   Cosmos        the pot adrift in deep space: dithered nebulae, a ringed planet, a ring of its own,
    //                 a little moon going round it, stardust spilling from its base, shooting stars
    //   Up and About  it has climbed out of the window into the view it always looked at, and walks along a
    //                 path through it with a bindle on its shoulder, the land scrolling past in layers
    let scene = null, trek = 0, wclk = 0, tripAt = -9;
    if (legend) {
      const bay = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const dith = (x, y, v) => v * 16 > bay[(y & 3) * 4 + (x & 3)] + 0.5;   // an ordered dither: on for about v of the cells
      const ls = (parseInt(c.hash.slice(10, 18), 16) ^ 0x6a09e667) >>> 0;
      const hs = (a, b) => { let h = (Math.imul(a | 0, 0x27d4eb2d) ^ Math.imul((b | 0) + 0x9e37, 0x165667b1) ^ ls) >>> 0; h = Math.imul(h ^ (h >>> 15), 0x85ebca6b) >>> 0; h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
      const plus = (D, x, y, r, kc, ka) => { put(D, x, y, kc); for (let k = 1; k <= r; k++) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(D, x + a * k, y + b * k, ka); };
      const stage = lay();
      if (gilded) {
        const gR = goldRamp, wine = K('#5c1b42'), wineD = K('#3e0f2c'), dam = K('#70284f'), lit = K('#a04e6a'), lit2 = K('#c7728c');
        const cv = ['#f2717f', '#c9304b', '#93193a', '#5a0c25'].map(K), marb = K('#f4eff6'), marbD = K('#d5c8e0'), vein = K('#b39fc6'), mote = K('#ffeccb'), boards = K('#2c0a20');
        const beamW = y => 2.5 + Math.max(0, y - 5) * 0.42;
        // the wall: a damask trellis, warm in the cone of the spotlight
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const d1 = (x + y) % 10, d2 = (x - y + 640) % 10, dx = Math.abs(x + 0.5 - 32), w = beamW(y);
          const inB = dx < w - 1.4 || (dx < w && (x + y) % 2 === 0);
          stage[y * N + x] = d1 === 5 && d2 === 5 ? gR[inB ? 2 : 1] : d1 === 0 || d2 === 0 ? (inB ? lit2 : dam) : inB ? lit : wine;
        }
        const floorY = PB + 7;
        for (let y = floorY; y < N; y++) for (let x = 0; x < N; x++) stage[y * N + x] = y === floorY ? O : ((x >> 2) + (y >> 1)) % 2 ? wineD : boards;
        // the plinth: a gilt capital on a fluted marble column, and the cushion on top
        const capY = PB + 5;
        box(PX - 12, capY, 26, 2, (a, b) => b === 0 ? (a < 4 ? gR[3] : gR[2]) : a > 20 ? gR[0] : gR[1]); stamp(stage, O);
        box(PX - 9, capY + 2, 20, N - capY - 2, (a) => a > 14 ? (a % 3 === 1 ? vein : marbD) : a % 3 === 1 ? marbD : marb); stamp(stage, O);
        for (let y = capY + 3, x = PX - 3; y < N; y++) { put(stage, x, y, vein); x += hs(y, 7) < 0.5 ? 1 : -1; x = Math.max(PX - 7, Math.min(PX + 5, x)); }
        ell(cx, PB + 1.4, Bw + 6.5, 2.5, (p, q) => q < -0.4 && p < 0.25 ? cv[0] : p > 0.55 || q > 0.45 ? cv[2] : cv[1]); stamp(stage, O);
        for (const s2 of [-1, 1]) { const tx = Math.round(cx - 0.5 + s2 * (Bw + 7)); for (let k = 0; k < 3; k++) put(stage, tx, PB + 1 + k, k === 2 ? gR[1] : gR[2]); put(stage, tx - 1, PB + 4, gR[1]); put(stage, tx + 1, PB + 4, gR[1]); put(stage, tx, PB + 4, gR[3]); }
        // the valance across the top: pleated velvet, a gold braid, a fringe and tassels
        const val = lay();
        for (let x = 0; x < N; x++) {
          const yb = 4 + Math.round(2.2 * Math.abs(Math.sin((x + 0.5) * Math.PI / 16)));
          for (let y = 0; y < yb; y++) val[y * N + x] = y === yb - 1 ? gR[2] : y === yb - 2 ? O : x % 4 === 0 ? cv[2] : y === 1 ? cv[0] : cv[1];
          val[yb * N + x] = x % 2 ? gR[1] : O;
          if (x % 16 === 0 || x % 16 === 15) for (let k = 1; k < 4; k++) val[(yb + k) * N + x] = k === 3 ? gR[1] : gR[2];
        }
        // the curtains, drawn each frame: folds gathered into the tie-backs, swaying a little below them
        const edge = (y, sw) => y < 31 ? 6 + 9.5 * Math.pow((31 - y) / 26, 1.5) : 6 + 6 * Math.pow((y - 31) / 32, 0.8) + sw * (y - 31) / 32;
        const curtains = (D, t, ob) => {
          const sw = Math.sin(t * 0.8) * 1.6 + Math.sin(t * 1.9 + 1) * 0.6;
          for (let y = 0; y < N; y++) {
            const E = Math.round(edge(y, sw));
            for (let x = 0; x <= E; x++) {
              const f = Math.sin(x / E * 9.4 + (y > 31 ? (y - 31) * 0.04 * sw : 0) - 0.4);
              const k = x === E ? O : x === E - 1 ? (f > 0 ? cv[2] : cv[3]) : f > 0.6 ? cv[0] : f > -0.25 ? cv[1] : f > -0.75 ? cv[2] : cv[3];
              D[y * N + x] = k; D[y * N + N - 1 - x] = k;
              if (ob) { ob[y * N + x] = 7; ob[y * N + N - 1 - x] = 8; }
            }
          }
          const E = Math.round(edge(30, 0)) + 1;
          for (const right of [false, true]) {
            for (let x = 0; x <= E; x++) { const xx = right ? N - 1 - x : x; D[29 * N + xx] = O; D[30 * N + xx] = (x + 1) % 3 ? gR[2] : gR[3]; D[31 * N + xx] = x % 3 ? gR[1] : gR[2]; D[32 * N + xx] = O; if (ob) for (let y = 29; y < 33; y++) ob[y * N + xx] = 9; }
            const tx = right ? N - 1 - E : E, swing = Math.round(Math.sin(t * 1.1 + (right ? 1.4 : 0)) * 0.6);
            for (let y = 33; y < 40; y++) { const w2 = y < 35 ? 0 : 1, ox = y > 35 ? swing : 0; for (let d = -w2; d <= w2; d++) put(D, tx + d + ox, y, y === 39 ? (d ? gR[1] : O) : d === -1 ? gR[3] : d === 1 ? gR[1] : gR[2]); }
          }
        };
        const motes = (D, t) => {
          for (let i = 0; i < 16; i++) {
            const y = 7 + Math.floor((hs(i, 1) * 48 + t * (0.5 + hs(i, 2) * 0.9)) % 48), w = beamW(y) - 1;
            const x = Math.round(32 + (hs(i, 3) * 2 - 1) * w + Math.sin(t * 0.7 + i * 2.1) * 0.8), k = D[y * N + x];
            if (k === lit || k === lit2) D[y * N + x] = mote;
          }
        };
        const goldCells = [];
        for (let i = 0; i < N * N; i++) if (isGold[potL[i]] && !faceBox(i % N, (i / N) | 0)) goldCells.push(i);
        // Midas's touch: what a finger touches turns to gold, and the gold runs through that whole thing first (a curtain,
        // the plinth, the cushion, the wall) and creeps across to whatever it touches, until the room is gold; then it
        // melts, running down the room in drips into a pool of molten gold that drains away, and the room is back
        const midas = lay(), front0 = [], ob = lay(), obStage = lay();
        let rs = (ls ^ 0x1b873593) >>> 0 || 1, meltAt = -1, lastChime = -9, gold = 0, nextFront = 0;
        const rnd = () => { rs ^= rs << 13; rs >>>= 0; rs ^= rs >>> 17; rs ^= rs << 5; rs >>>= 0; return rs / 4294967296; };
        // what each cell of the set is: 1 wall, 2 floor, 3 capital, 4 column, 5 cushion, 6 valance (7, 8, 9 the curtains)
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x, dx2 = x - PX, cu = Math.hypot((x + 0.5 - cx) / (Bw + 7.5), (y + 0.5 - PB - 1.4) / 3.6) < 1;
          obStage[i] = cu ? 5 : y >= capY - 1 && y <= capY + 2 && dx2 >= -13 && dx2 <= 14 ? 3 : y > capY + 1 && dx2 >= -10 && dx2 <= 11 ? 4 : y >= floorY ? 2 : 1;
        }
        const gild = i => { if (!midas[i]) { midas[i] = 1; gold++; front0.push(i); } };
        const touch = (x0, y0, r) => { for (let y = Math.floor(y0 - r); y <= y0 + r; y++) for (let x = Math.floor(x0 - r); x <= x0 + r; x++) { if (x < 0 || y < 0 || x >= N || y >= N || Math.hypot(x + 0.5 - x0, y + 0.5 - y0) > r) continue; gild(y * N + x); } };
        const tone = new Uint8Array(256), toneOf = k => { if (!tone[k]) { const l = lum[k]; tone[k] = 1 + (l < 0.22 ? 0 : l < 0.42 ? 1 : l < 0.7 ? 2 : 3); } return gR[tone[k] - 1]; };
        const coins = [];
        const cushionTop = x => Math.abs(x - cx) < A + 1 ? PB : Math.abs(x - cx) < Bw + 6.5 ? PB - 1 : floorY - 1;
        const melted = (x, t) => { const q = (t - meltAt - 0.7) / 2.2 - hs(x, 301) * 0.25; return q * (N + 10); };   // how far the melt has run down column x
        scene = {
          tap(x, y, t) {
            if (onChar(x, y)) {
              for (let i = 0; i < 9; i++) { if (coins.length > 44) coins.shift(); coins.push({ x: cx - 0.5 + (rnd() - 0.5) * 6, y: R - 1, vx: (rnd() - 0.5) * 26, vy: -20 - rnd() * 14, rest: false, b: 0 }); }
              [0, 4, 7, 12].forEach((k, i) => c.sound.note(drip[0] + k, { dur: 0.25, vel: 0.12, wave: 'triangle', at: i * 0.05 }));
            } else if (meltAt < 0) touch(x, y, 2.6);
          },
          tick(t, dt) {
            const inp = c.input;
            if (inp.down && inp.inside && meltAt < 0) {
              const x = inp.x * N, y = inp.y * N;
              if (!onChar(x, y)) { touch(x, y, 2.6); if (t - lastChime > 0.18) { lastChime = t; c.sound.note(drip[Math.floor(rnd() * drip.length)] + 12, { dur: 0.3, vel: 0.06, wave: 'sine' }); } }
            }
            if (meltAt < 0 && front0.length) {
              // the gold's front: each cell on it gilds its neighbours, at once if they're the same thing, now and then if not
              for (let n = Math.min(front0.length, Math.ceil(dt * 420) + Math.ceil(front0.length * dt * 2.6)); n > 0; n--) {
                const i = front0.shift(), x = i % N, y = (i / N) | 0;
                let left = false;
                for (const j of [x > 0 ? i - 1 : -1, x < N - 1 ? i + 1 : -1, y > 0 ? i - N : -1, y < N - 1 ? i + N : -1]) {
                  if (j < 0 || midas[j]) continue;
                  if (ob[j] === ob[i] || rnd() < 0.1) gild(j); else left = true;
                }
                if (left) front0.push(i);
              }
              if (t >= nextFront) { nextFront = t + 0.12; c.sound.note(drip[Math.floor(gold / 300) % drip.length] + 12, { dur: 0.12, vel: 0.03, wave: 'sine' }); }
              if (gold >= N * N) { meltAt = t; front0.length = 0; [12, 7, 4, 0, -5].forEach((k, i) => c.sound.note(drip[0] + k, { dur: 0.6, vel: 0.1, wave: 'sine', at: 0.6 + i * 0.12 })); }
            }
            if (meltAt >= 0 && t - meltAt > 4.4) { midas.fill(0); gold = 0; meltAt = -1; }
            for (const k of coins) {
              if (k.rest) continue;
              k.vy += 70 * dt; k.x += k.vx * dt; k.y += k.vy * dt;
              if (k.x < 1 || k.x > N - 2) { k.vx = -k.vx * 0.6; k.x = Math.max(1, Math.min(N - 2, k.x)); }
              const fl = cushionTop(k.x);
              if (k.y >= fl && k.vy > 0) {
                k.y = fl; k.b++;
                c.sound.note(drip[(k.b + Math.floor(k.x)) % drip.length] + 19, { dur: 0.06, vel: 0.05 / k.b, wave: 'triangle' });
                if (k.b > 2 || Math.abs(k.vy) < 6) { k.rest = true; k.vy = 0; } else { k.vy *= -0.38; k.vx *= 0.6; }
              }
            }
          },
          back(D, t) {
            ob.set(obStage);
            D.set(stage); motes(D, t); curtains(D, t, ob); for (let i = 0; i < 10 * N; i++) if (val[i]) { D[i] = val[i]; ob[i] = 6; }
            if (!gold) return;
            // gold in four tones by how light the thing was, a bright lip where the gold meets what isn't yet, cells twinkling
            const tw = Math.floor(t * 7), melt = meltAt >= 0 && t - meltAt > 0.7;
            for (let i = 0; i < N * N; i++) {
              if (!midas[i]) continue;
              const x = i % N, y = (i / N) | 0;
              if (melt) { const m = melted(x, t); if (y < m - 2) continue; if (y < m) { D[i] = y < m - 1 ? gR[3] : WH; continue; } }
              const edge = !melt && ((x > 0 && !midas[i - 1]) || (x < N - 1 && !midas[i + 1]) || (y > 0 && !midas[i - N]) || (y < N - 1 && !midas[i + N]));
              D[i] = edge ? gR[3] : hs(i, tw) < 0.012 ? WH : toneOf(D[i]);
            }
            if (meltAt >= 0) {
              // the gleam that runs over the gold the moment it's all gold, then the molten pool at the foot of the room
              const g = (t - meltAt) / 0.7;
              if (g < 1) for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, d = x + y - g * 130; if (d > -3 && d < 0) D[i] = d > -1.5 ? WH : gR[3]; }
              const pool = Math.max(0, Math.min(1, (t - meltAt - 1.2) / 1.4)) * (1 - Math.max(0, (t - meltAt - 3.4) / 1.0)) * 6;
              for (let y = Math.floor(N - pool); y < N; y++) for (let x = 0; x < N; x++) { const wv = Math.sin(x * 0.5 + t * 6) > 0.6 && y === Math.floor(N - pool) ? WH : y === Math.floor(N - pool) ? gR[3] : (x + y + Math.floor(t * 10)) % 9 === 0 ? gR[2] : gR[1]; D[y * N + x] = wv; }
            }
          },
          front(D, t, dx, dy) {
            for (const k of coins) { const x = Math.round(k.x), y = Math.round(k.y) - 1, spin = k.rest ? 0 : Math.floor(t * 12 + k.x) % 2; spT(x, y, spin ? ['y', 'Y'] : ['yY', 'YZ'], { y: gR[3], Y: gR[2], Z: gR[1] }); stamp(D, O); }
            // sparkles flaring over the gold, each in its own time
            for (let s2 = 0; s2 < 6; s2++) {
              const ph = t / 1.7 + s2 * 0.37, n = Math.floor(ph), q = ph - n, i = goldCells[Math.floor(hs(n, s2 + 20) * goldCells.length)];
              if (i === undefined) continue;
              const r = q < 0.12 ? 0 : q < 0.26 ? 1 : q < 0.4 ? 2 : q < 0.52 ? 1 : q < 0.6 ? 0 : -1;
              if (r >= 0) plus(D, i % N + dx, ((i / N) | 0) + dy, r, WH, gR[3]);
            }
          },
        };
      } else if (cosmos) {
        const s0 = K('#090920'), s1 = K('#13123c'), nb = ['#261249', '#47196c', '#7a2a8c', '#b84c9e'].map(K), tl = ['#0f2a40', '#18506a', '#2c8798'].map(K);
        const plc = ['#f8dcae', '#eaa878', '#c9785c', '#7a3c4c'].map(K), ringC = [K('#86d6ea'), K('#3a86a6')], pring = [K('#f2e4c2'), K('#b39a7a')], glowK = [K('#2a2266'), K('#3a2c86')];
        const p1 = hs(1, 1) * 6.28, p2 = hs(2, 2) * 6.28, fl = hs(3, 3) < 0.5 ? 1 : -1, star = K('#fff6cc'), star2 = K('#c9b8ff'), star3 = K('#8fd3ff');
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const xx = fl > 0 ? x : N - 1 - x;
          let k = dith(x, y, y / 75) ? s1 : s0;
          // a ragged band of magenta nebula, and a teal cloud low on the other side
          const m = Math.exp(-Math.pow((xx * 0.75 - y + 8) / 12, 2)) * (0.62 + 0.38 * Math.sin(xx * 0.31 + y * 0.17 + p1) * Math.sin(xx * 0.13 - y * 0.29 + p2));
          if (m > 0.2) k = m > 0.72 ? nb[3] : m > 0.52 ? nb[2] : m > 0.34 ? nb[1] : nb[0];
          else if (m > 0.1 && dith(x, y, (m - 0.1) * 10)) k = nb[0];
          const tc = Math.exp(-(Math.pow((xx - 55) / 10, 2) + Math.pow((y - 54) / 7, 2))) * (0.7 + 0.3 * Math.sin(xx * 0.4 + y * 0.3 + p2));
          if (tc > 0.5) k = tc > 0.68 ? tl[1] : tl[0];
          // a soft glow of light behind the pot, so it reads against the night
          const gd = Math.hypot((x + 0.5 - cx) / (A + 7), (y + 0.5 - (PR + PB) / 2 - 1) / 15);
          if (gd < 1) k = gd < 0.72 || dith(x, y, (1 - gd) / 0.28) ? (gd < 0.5 ? glowK[1] : glowK[0]) : k;
          stage[y * N + x] = k;
        }
        // a ringed planet up in the corner, half out of frame
        const qx = fl > 0 ? 54 : 9, qy = 10, qr = 8.6, tilt = 0.28 * fl;
        const ringPts = (front) => { const o = []; for (let i = 0; i < 220; i++) { const a = i / 220 * 6.283, ex = Math.cos(a) * 16, ey = Math.sin(a) * 3.4; if ((ey > 0) !== front) continue; o.push([qx + ex * Math.cos(tilt) - ey * Math.sin(tilt), qy + ex * Math.sin(tilt) + ey * Math.cos(tilt)]); } return o; };
        for (const [x, y] of ringPts(false)) { put(stage, Math.round(x), Math.round(y), pring[1]); }
        area(qx - qr - 1, qy - qr - 1, qx + qr + 1, qy + qr + 1, (px, py, x, y) => {
          const dx = (px - qx) / qr, dy = (py - qy) / qr; if (dx * dx + dy * dy > 1) return 0;
          const band = Math.floor((dy * 3.2 + dx * 0.7 + 4) * 1.6), lit2 = -dx * 0.55 - dy * 0.6 + 0.35;
          const k = plc[band % 3];
          return lit2 < -0.25 && dith(x, y, 0.5 - lit2) ? plc[3] : k;
        });
        stamp(stage, O);
        for (const [x, y] of ringPts(true)) { put(stage, Math.round(x), Math.round(y), pring[0]); put(stage, Math.round(x), Math.round(y) + 1, pring[1]); }
        // the stars: fixed, some twinkling, a few big ones
        const stars = [];
        for (let i = 0; i < 70; i++) stars.push([Math.floor(hs(i, 31) * N), Math.floor(hs(i, 32) * N), hs(i, 33), hs(i, 34) * 6.28]);
        const sky = new Uint8Array(256); for (const k of [s0, s1, ...nb, ...tl, ...glowK]) sky[k] = 1;
        const rcY = PB - 3, rRX = A + 8.5, rRY = 2.6, midY = (PR + PB) / 2;
        // starlight catches the pot's outline, so the night pot stands out from the night
        const rimK = K('#6f6ad8');
        for (let i = N; i < N * N - N; i++) if (potL[i] === O && (!potL[i - 1] || !potL[i + 1] || !potL[i - N] || !potL[i + N]) && !plantL[i] && (i / N | 0) > R) potL[i] = rimK;
        const potRing = (D, dy, back, t) => {
          for (let i = 0; i < 200; i++) {
            const a = i / 200 * 6.283; if ((Math.sin(a) < 0) !== back) continue;
            const x = Math.round(cx - 0.5 + Math.cos(a) * rRX), y = Math.round(rcY + dy + Math.sin(a) * rRY);
            const glint = Math.sin(a * 3 - t * 2.2) > 0.85, gl = t - glowAt < 2.5;
            put(D, x, y, glint ? WH : gl ? gold2[0] : ringC[0]); put(D, x, y + 1, gl ? gold2[1] : ringC[1]);
          }
        };
        const moon = (D, t, dy, back) => {
          const a = t * 0.85 + p1, s = Math.sin(a); if ((s < 0) !== back) return;
          const x = Math.round(cx - 0.5 + Math.cos(a) * (A + 14) - 2), y = Math.round(midY - 3 + s * 6 + dy - 2);
          spT(x, y, ['.mmm.', 'mmMmm', 'mMmmm', 'mmmMm', '.mmm.'], { m: K('#e4e0f6'), M: K('#a9a2d2') });
          stamp(D, O);
        };
        // moons you fling: pull back from where it should start and let go; they fall round the pot under its pull,
        // trailing light, and crash into it in a burst of stars if they come too close
        const moons = [], moonCols = ['#ffd27a', '#9fe8ff', '#ffb3e6', '#c9ff9a', '#ffffff'].map(K), moonDim = ['#c08a3a', '#4a8ab0', '#b0609a', '#7ab04a', '#a0a0c0'].map(K);
        let aim = null, launched = 0, wobbleAt = -9, glowAt = -9;
        const bursts = [], gold2 = [K('#ffe27a'), K('#c9962e')];
        const GM = 520, potY = () => (PR + PB) / 2 + scene.bob(tPot);
        // a fling, helped into an orbit: most of the throw toward or away from the pot is taken out, and its speed
        // round the pot is kept between a slow and a fast orbit, so an ordinary fling goes round at least once
        const launchFrom = (x0, y0, vx, vy) => {
          const cy0 = potY();
          let dx = x0 - cx + 0.5, dy = y0 - cy0, r = Math.hypot(dx, dy);
          if (r < A + 6) { const k = (A + 6) / Math.max(r, 0.1); dx *= k; dy *= k; r = A + 6; if (!isFinite(dx)) { dx = A + 6; dy = 0; } }
          const rx = dx / r, ry = dy / r, tx = -ry, ty = rx, vc = Math.sqrt(GM / Math.pow(r * r + 6, 0.5));
          let vr = vx * rx + vy * ry, vt = vx * tx + vy * ty;
          vr *= 0.3; vt = (vt >= 0 ? 1 : -1) * Math.max(0.8 * vc, Math.min(1.18 * vc, Math.abs(vt) + Math.abs(vr) * 0.5));
          return { x: cx - 0.5 + dx, y: cy0 + dy, vx: rx * vr + tx * vt, vy: ry * vr + ty * vt };
        };
        const stepMoon = (m, h, cy0) => { const dx = cx - 0.5 - m.x, dy = cy0 - m.y, r2 = dx * dx + dy * dy, a = GM / Math.pow(r2 + 6, 1.5); m.vx += dx * a * h; m.vy += dy * a * h; m.x += m.vx * h; m.y += m.vy * h; };
        scene = {
          tap(x, y, t) { rings.push({ x, y, t0: t }); },
          tick(t, dt) {
            const inp = c.input;
            if (inp.down && inp.inside) { const x = inp.x * N, y = inp.y * N; if (!aim) aim = { x0: x, y0: y }; aim.x1 = x; aim.y1 = y; }
            else if (aim) {
              const dx = aim.x0 - aim.x1, dy = aim.y0 - aim.y1;
              if (Math.hypot(dx, dy) > 1.5) {
                if (moons.length > 2) moons.shift();
                const l = launchFrom(aim.x0, aim.y0, dx * 2.4, dy * 2.4);
                moons.push(Object.assign(l, { k: launched++ % moonCols.length, tr: [], ang: Math.atan2(l.y - potY(), l.x - cx + 0.5), turned: 0, laps: 0 }));
                c.sound.note(drip[0] - 12, { dur: 0.5, vel: 0.18, wave: 'sine' }); c.sound.note(drip[3], { dur: 0.3, vel: 0.08, wave: 'triangle', at: 0.08 });
              }
              aim = null;
            }
            const cy0 = potY();
            for (let i = moons.length - 1; i >= 0; i--) {
              const m = moons[i];
              for (let s3 = 0; s3 < 4; s3++) stepMoon(m, dt / 4, cy0);
              m.tr.unshift([m.x, m.y]); if (m.tr.length > 18) m.tr.pop();
              // laps round the pot: on the third, the pot beams and its ring glows gold
              const a = Math.atan2(m.y - cy0, m.x - cx + 0.5); let da = a - m.ang; da = Math.atan2(Math.sin(da), Math.cos(da)); m.ang = a; m.turned += da;
              if (Math.abs(m.turned) >= 6.283 * (m.laps + 1)) { m.laps++; c.sound.note(drip[m.laps % drip.length] + 12, { dur: 0.3, vel: 0.1, wave: 'triangle' }); if (m.laps === 3) { glowAt = t; glad = 2.5; [0, 4, 7, 12, 16].forEach((k, j) => c.sound.note(drip[0] + k + 12, { dur: 0.6, vel: 0.12, wave: 'sine', at: j * 0.08 })); } }
              const r = Math.hypot(m.x - cx + 0.5, m.y - cy0);
              if (r < A * 0.75) { bursts.push({ x: m.x, y: m.y, t0: t, k: m.k }); rings.push({ x: m.x, y: m.y, t0: t }); rings.push({ x: m.x, y: m.y, t0: t - 0.3 }); wobbleAt = t; moons.splice(i, 1); c.sound.note(drip[0] - 24, { dur: 0.9, vel: 0.22, wave: 'sine' }); c.sound.hit('noise', 0.14, { cutoff: 900, dur: 0.4 }); }
              else if (r > 95) moons.splice(i, 1);
            }
          },
          bob: t => Math.round(Math.sin(t * 1.25) * 1.3),
          shake: t => t - wobbleAt < 0.45 ? (Math.floor(t * 18) % 2) * 2 - 1 : 0,
          back(D, t) {
            D.set(stage);
            for (const [x, y, kind, ph] of stars) {
              if (!sky[D[y * N + x]]) continue;
              const v = Math.sin(t * (1.2 + kind * 1.6) + ph);
              if (kind > 0.88) { if (v > -0.2) plus(D, x, y, v > 0.6 ? 2 : 1, WH, star2); else D[y * N + x] = star; }
              else D[y * N + x] = v > 0.3 ? (kind > 0.5 ? star : star3) : kind > 0.4 ? star2 : nb[1];
            }
            // a shooting star now and then
            const per = 6.5, q = ((t + hs(9, 9) * per) % per) / 0.8, n = Math.floor((t + hs(9, 9) * per) / per);
            if (q < 1) {
              const x0 = 6 + hs(n, 41) * 40, y0 = 4 + hs(n, 42) * 14, x = x0 + q * 22, y = y0 + q * 9;
              for (let k = 0; k < 6; k++) { const xx = Math.round(x - k * 1.6), yy = Math.round(y - k * 0.65); if (xx >= 0 && yy >= 0 && xx < N && yy < N && sky[D[yy * N + xx]]) D[yy * N + xx] = k === 0 ? WH : k < 3 ? star : star2; }
            }
          },
          behind(D, t, dx, dy) {
            moon(D, t, dy, true);
            potRing(D, dy, true, t);
            // stardust spilling from its base and drifting down
            for (let k = 0; k < 7; k++) {
              const q = (t * 0.45 + k / 7) % 1, x = Math.round(cx - 0.5 + (hs(k, 51) - 0.5) * 2 * (Bw - 1) + Math.sin(t + k) * 0.6), y = Math.round(PB + 2 + dy + q * 11);
              put(D, x, y, q < 0.4 ? WH : q < 0.75 ? star2 : nb[2]);
            }
          },
          front(D, t, dx, dy) {
            potRing(D, dy, false, t); moon(D, t, dy, false);
            for (const m of moons) {   // a fat moon with a long tail of its own light
              m.tr.forEach(([x, y], j) => { if (j > 1) { const k = j < 5 ? WH : j < 10 ? moonCols[m.k] : j < 14 ? moonDim[m.k] : nb[2]; put(D, Math.round(x), Math.round(y), k); if (j < 8) put(D, Math.round(x) + 1, Math.round(y), k); } });
              ell(m.x, m.y, 2.6, 2.6, (p, q) => p < -0.25 && q < -0.25 ? WH : p > 0.35 || q > 0.35 ? moonDim[m.k] : moonCols[m.k]); stamp(D, O);
            }
            for (const b of bursts) {   // a crash: a burst of rays and stars
              const q = (t - b.t0) / 0.8; if (q > 1) continue;
              for (let j = 0; j < 12; j++) { const an = j / 12 * 6.283, r0 = 2 + q * 14, r1 = r0 + 3 * (1 - q); for (let rr = r0; rr < r1; rr += 1) put(D, Math.round(b.x + Math.cos(an) * rr), Math.round(b.y + Math.sin(an) * rr), j % 3 ? moonCols[b.k] : WH); }
              if (q < 0.3) plus(D, Math.round(b.x), Math.round(b.y), 3, WH, moonCols[b.k]);
            }
            if (aim) {   // the slingshot: a rubber band back to the finger, and where it would go
              const L = Math.hypot(aim.x1 - aim.x0, aim.y1 - aim.y0);
              for (let j = 1; j < L; j += 1) put(D, Math.round(aim.x0 + (aim.x1 - aim.x0) * j / L), Math.round(aim.y0 + (aim.y1 - aim.y0) * j / L), j % 2 ? WH : star2);
              if (L > 1.5) { const g = launchFrom(aim.x0, aim.y0, (aim.x0 - aim.x1) * 2.4, (aim.y0 - aim.y1) * 2.4), cy0 = potY(); for (let j = 0; j < 90; j++) { stepMoon(g, 1 / 30, cy0); if (Math.hypot(g.x - cx + 0.5, g.y - cy0) < A * 0.75) break; if (j % 3 === 0) put(D, Math.round(g.x), Math.round(g.y), j < 45 ? moonCols[launched % moonCols.length] : star2); } }
              ell(aim.x0, aim.y0, 2.6, 2.6, moonCols[launched % moonCols.length]); stamp(D, O);
            }
          },
        };
      } else {
        // ---------- Up and About: out in the view, walking ----------
        const V2 = walled ? 'Hills' : night ? 'Night' : view;
        const pal2 = {   // sky top and bottom, far land (fill, shade), near land, path (fill, mark), verge (fill, dark)
          Hills: ['#9fd6ff', '#e2f4ff', '#b5e2b6', '#97cfa0', '#71c58a', '#52a571', '#eed4a6', '#cfa878', '#5fb86e', '#3f9656'],
          Sea: ['#9fd8ff', '#e6f6ff', '#5a9ad8', '#3f7cc0', '#f2dcae', '#e2c28e', '#c99a6a', '#a87a4e', '#a8c86a', '#7aa04e'],
          Rooftops: ['#ffc9b4', '#ffe6cc', '#d4a8bc', '#bc90a6', '#a07c9c', '#86638a', '#cbc3d4', '#a59cb8', '#8a7f9a', '#6e6480'],
          Snowfall: ['#c2cfea', '#e6edf8', '#f4f6ff', '#d6deef', '#ffffff', '#dfe6f4', '#f6f9ff', '#c7d3eb', '#e8eef9', '#b9c6e2'],
          Sunset: ['#ffadc0', '#ffd99e', '#e7a3b6', '#d48da6', '#b07898', '#966284', '#f2caa2', '#d4a27a', '#8e8a5c', '#6e6c48'],
          'Blossom Branch': ['#a9dcff', '#eaf6ff', '#bfe4bc', '#a3d4a6', '#7ccb8e', '#5aac74', '#f0d6aa', '#d2ab7c', '#68bc72', '#47995a'],
          Rain: ['#9ea3bd', '#c4c8dc', '#8fb29c', '#7b9c88', '#6c987c', '#588468', '#b5a68f', '#938570', '#5f8f68', '#4a7552'],
          Rainbow: ['#a0d8ff', '#e6f6ff', '#b5e2b6', '#97cfa0', '#71c58a', '#52a571', '#eed4a6', '#cfa878', '#5fb86e', '#3f9656'],
          Night: ['#1c1d46', '#3b3d7c', '#2d3568', '#262c5a', '#1f2a52', '#182140', '#4c4c74', '#3a3a5e', '#2a4a5c', '#203a4a'],
        }[V2] || [];
        const [skT, skB, fa, faD, ne, neD, pa, paD, gr, grD] = pal2.map(K), skM = K(mix(pal2[0], pal2[1], 0.5));
        const GY = 46, FG = 50, WX = 18;   // the path's top edge, the row its feet stand on, the column it walks in
        const sunK = K(V2 === 'Sunset' ? '#fff3c0' : '#fff2a8'), sunR = K(V2 === 'Sunset' ? '#ffcf8a' : '#ffe066'), cloudK = K(V2 === 'Rain' ? '#d8dae8' : V2 === 'Sunset' ? '#ffe8e0' : '#ffffff'), cloudD = K(V2 === 'Rain' ? '#a9adc4' : mix(pal2[1], '#9aa8d0', 0.35));
        const moonK = K('#fff6cc'), starK = K('#fff6cc'), starD = K('#9a9ad8');
        const rb = ['#ff9e9e', '#ffd09a', '#fff2a0', '#b9eea6', '#9cc8ff', '#c9b0ff'].map(K);
        const tree = V2 === 'Blossom Branch' ? ['#ffc2d4', '#ff94b4', '#fff0f4'] : V2 === 'Night' ? ['#2a3a62', '#1e2a4a', '#3a4c78'] : V2 === 'Sunset' ? ['#8a5a7a', '#6e4664', '#a8708e'] : V2 === 'Rain' ? ['#5a8a68', '#467254', '#78a684'] : ['#5cb878', '#3f9a5e', '#8fd89c'];
        const trK = tree.map(K), trunk = K(V2 === 'Night' ? '#2a2440' : '#9a6a52');
        const hf = xw => 31 - 3.4 * Math.sin(xw * 0.105 + 1.3) - 1.8 * Math.sin(xw * 0.23 + 0.4);
        const hn = xw => 40.5 - 2.4 * Math.sin(xw * 0.16 + 2.2) - 1.2 * Math.sin(xw * 0.41 + 0.9);
        const cloudRows = [['...ww....', '.wwwwww..', 'wwwwwwwww', '.dddddd..'], ['..ww...', '.wwwww.', 'wwwwwww', '.ddddd.']];
        const lamp = K('#fff3c4'), postK = K('#4a3a5c');
        // rocks along the path: tap to jump them (it jumps them itself until someone taps); a rock it walks into trips it up
        const rockK = [K(V2 === 'Snowfall' ? '#e4e9f6' : '#c9c0cf'), K(V2 === 'Snowfall' ? '#b4c0dc' : '#958aa6'), K('#fffaf2')];
        // what's on the path: a boulder, a fallen log, a sleeping cat (it wakes as you leap it), a puddle (it splashes)
        const rockX = k => 60 + k * 30 + Math.floor(hs(k, 201) * 14);
        const kindOf = k => { const v = hs(k, 205); return v < 0.36 ? 'rock' : v < 0.62 ? 'log' : v < 0.82 ? 'cat' : 'puddle'; };
        const halfW = { rock: 4, log: 4.5, cat: 3, puddle: 0 }, tall = { rock: 9, log: 9, cat: 9, puddle: 0 };
        const logK = [K('#a8744a'), K('#7a4e30'), K('#e8c99a')], catK = [K(['#f2a65a', '#8a8a96', '#3a3040', '#f4efe6'][Math.floor(hs(1, 207) * 4)]), K('#ff9db4')], wetK = [K(mix(pal2[0], '#ffffff', 0.3)), K(mix(pal2[1], '#3d2a4a', 0.15))];
        const signK = [K('#b07a48'), K('#7e5230'), K('#fff6dc'), K('#ffd23a')], signR = K('#e8364f');
        const puffs = [], speed = [];
        let lastLand = 0, wasAir = false, splashAt = -9;
        let resetAt = -9, auto = true, lastTap = -99, passed = -1, cleared = 0, best = 0, hitK = -1, wokeK = -1, wokeAt = -9;
        const footW = () => trek + WX + 0.5, hopH = t => { const h = t - hopAt; return h < 0.9 ? Math.sin(h / 0.9 * Math.PI) * 13 : 0; };
        const dust = (x, y, n) => { for (let j = 0; j < n; j++) puffs.push({ x, y, vx: (j - (n - 1) / 2) * 5, t0: tPot }); };
        const jump = t => { if (t - hopAt > 0.92 && t - tripAt > 1.6) { hopAt = t; dust(WX + 0.5, FG, 5); c.sound.note(drip[0] - 12, { dur: 0.12, vel: 0.26, wave: 'triangle' }); c.sound.note(drip[4] - 12, { dur: 0.18, vel: 0.2, wave: 'sine', at: 0.09 }); } };
        const digits = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];
        // the walker at half size: its own picture shrunk two cells to one (dark face marks win, a fresh outline round
        // it), legs and boots, the bindle on its shoulder; on a trip it tumbles onto its side, legs kicking in the air
        const M2 = 32, mini = new Uint8Array(M2 * M2), mfr = new Uint8Array(M2 * M2), bun = K('#4a7af0'), bunL = K('#bcd0ff'), stick = K('#a87650');
        const shrink = (L, out) => {
          for (let my = 0; my < M2; my++) for (let mx = 0; mx < M2; mx++) {
            const i = my * 2 * N + mx * 2, v = [L[i], L[i + 1], L[i + N], L[i + N + 1]];
            let k = 0, empty = 0, best = 0; const cnt = {};
            for (const q of v) if (!q) empty++;
            if (empty < 3) { if (v.includes(INK) && INK !== O) k = INK; else for (const q of v) if (q) { cnt[q] = (cnt[q] || 0) + 1; if (cnt[q] > best) { best = cnt[q]; k = q; } } if (k === O && best < 2) for (const q of v) if (q && q !== O) { k = q; break; } }
            out[my * M2 + mx] = k;
          }
        };
        const blit = (D, src, ox, oy, rot) => {   // with a one-cell outline round it; rot turns it a quarter onto its side
          const at = (mx, my) => rot ? src[mx * M2 + (M2 - 1 - my)] : src[my * M2 + mx];
          for (let my = 0; my < M2; my++) for (let mx = 0; mx < M2; mx++) if (!at(mx, my)) { let edge = false; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x2 = mx + a, y2 = my + b; if (x2 >= 0 && y2 >= 0 && x2 < M2 && y2 < M2 && at(x2, y2)) edge = true; } if (edge) put(D, ox + mx, oy + my, O); }
          for (let my = 0; my < M2; my++) for (let mx = 0; mx < M2; mx++) { const k = at(mx, my); if (k) put(D, ox + mx, oy + my, k); }
        };
        const walkerDraw = (D, t, CH) => {
          shrink(CH, mini);
          const h = t - hopAt, lift = Math.round(hopH(t)), land = h >= 0.9 && h < 1.02 ? 1 : 0, trip = t - tripAt < 1.6, down = trip && t - tripAt > 0.25 && t - tripAt < 1.35;
          const limb = K(mix(PC1, '#3d2a4a', 0.25)), boot = HOT;
          if (down) {
            // on its side, plant to the back, legs kicking up in the air, big dizzy stars wheeling over it
            const ox = WX + 3 - Math.floor(PB / 2), oy = FG - (M2 - 1) + Math.floor((PX - A) / 2);
            blit(D, mini, ox, oy, true);
            const bx = ox + Math.floor(PB / 2) + 1, by = FG - 3, kick = Math.floor(t * 10) % 2;
            for (const [l, j] of [[0, 0], [1, 3]]) { for (let k2 = 0; k2 < 3; k2++) put(D, bx + k2, by - j - k2 * (kick ^ l ? 1 : 0.5) | 0, limb); put(D, bx + 3, by - j - 3 + (kick ^ l), boot); put(D, bx + 4, by - j - 3 + (kick ^ l), boot); }
            for (let k2 = 0; k2 < 3; k2++) { const a = t * 6 + k2 * 2.09; plus(D, Math.round(WX + 2 + Math.cos(a) * 6), Math.round(FG - 12 + Math.sin(a) * 2), 1, WH, YEL); }
            return;
          }
          const ox = WX - Math.floor(PX / 2), oy = FG - 4 - Math.floor(PB / 2) - lift + land + (trip ? (Math.floor(t * 16) % 2) : 0);
          // the friend from the shelf trots behind
          if (['Snail', 'Frog', 'Mini Me', 'Pebble Pals'].includes(companion)) {
            shrink(comp, mfr); const fx = WX - 14 - Math.floor(compX / 2) + (compSide > 0 ? 0 : 0), fy = FG - Math.floor(CB / 2) - 1 - (scene.running ? Math.floor(t * 8) % 2 : Math.floor(wclk / 0.32) % 4 === 1 ? 1 : 0);
            blit(D, mfr, fx, fy, false);
          }
          // legs and boots, from under the pot to the path, one stepping as it walks, both tucked as it leaps
          const stride = Math.floor(wclk / (scene.running ? 0.16 : 0.28)) % 2, top0 = oy + Math.floor(PB / 2) + 1;
          for (const sd of [-1, 1]) {
            const lx = WX + (sd < 0 ? -2 : 1), step = lift > 0 || (stride === (sd < 0 ? 0 : 1) && !trip);
            const footY = lift > 0 ? top0 + 2 : FG - (step ? 1 : 0);
            for (let y = top0; y < footY; y++) put(D, lx, y, limb);
            put(D, lx, footY, boot); put(D, lx + 1, footY, boot); put(D, lx - 1, footY + 1, O); put(D, lx, footY + 1, O); put(D, lx + 1, footY + 1, O);
          }
          blit(D, mini, ox, oy, false);
          // the bindle on its shoulder
          const hx = WX + Math.ceil(A / 2) + 1, hy = oy + Math.floor(R / 2) + 1, ex = WX - Math.ceil(A / 2) - 3, ey = oy + Math.floor(R / 2) - 5;
          ribbon([[hx, hy], [ex, ey]], () => 0.45, stick); stamp(D, O);
          spT(ex - 2, ey - 1, ['bLb', 'LbL', 'bLb'], { b: bun, L: bunL }); stamp(D, O);
          if (scene.running) for (let j = 0; j < 4; j++) { const y = oy + Math.floor(PR / 2) + 2 + j * 3, x0 = ox + Math.floor((PX - A) / 2) - 3 - ((Math.floor(t * 12) + j * 2) % 3); for (let k = 0; k < 3; k++) put(D, x0 - k, y, wetK[0]); }   // speed lines
        };
        scene = {
          walker: walkerDraw,
          tap(x, y, t) { auto = false; lastTap = t; jump(t); },
          tick(t, dt) {
            const inp = c.input, run = inp.down && inp.inside && t - lastTap > 0.25 ? 2.2 : 1;
            if (t - lastTap > 9) auto = true;   // left alone a while, it watches its own feet again
            const tripping = t - tripAt < 1.6;
            scene.running = run > 1 && !tripping;
            const air = t - hopAt < 0.9;
            if (wasAir && !air) { dust(WX + 0.5, FG, 8); lastLand = t; c.sound.hit('noise', 0.06, { cutoff: 900, dur: 0.1 }); }
            wasAir = air;
            if (!tripping) {
              const was = Math.floor(wclk / 0.32);
              trek += dt * 4 * run * (air ? 5.6 : 1); if (!air) wclk += dt * run * (run > 1 ? 1.6 : 1);
              if (Math.floor(wclk / 0.32) !== was) c.sound.hit('click', 0.05, { pan: 0.2 * ((was & 1) * 2 - 1) });
            }
            const f = footW();
            for (let k = Math.max(0, Math.floor((f - 70) / 30)); k < Math.floor((f + 20) / 30) + 1; k++) {
              const d = rockX(k) - f;
              const kind = kindOf(k), hw2 = halfW[kind];
              if (kind === 'puddle') { if (Math.abs(d) < 3 && hopH(t) < 0.5 && t - splashAt > 0.5) { splashAt = t; for (let j = 0; j < 6; j++) puffs.push({ x: WX + 0.5, y: FG, vx: (j - 2.5) * 7, t0: t, wet: 1 }); c.sound.note(drip[3], { dur: 0.15, vel: 0.15, wave: 'sine' }); } continue; }
              if (auto && d > hw2 + 5.2 && d < hw2 + 5.8) jump(t);
              if (kind === 'cat' && Math.abs(d) < hw2 + 3 && hopH(t) > 1 && wokeK !== k) { wokeK = k; wokeAt = t; c.sound.note(drip[4] + 12, { dur: 0.25, vel: 0.1, wave: 'triangle' }); }
              if (Math.abs(d) < hw2 + 3 && hopH(t) < tall[kind] - 5 && hitK !== k && !tripping) { hitK = k; tripAt = t; resetAt = t; best = Math.max(best, cleared); cleared = 0; dust(WX + 0.5, FG, 10); c.sound.hit('noise', 0.14, { cutoff: 600, dur: 0.2 }); c.sound.note(drip[0] - 24, { dur: 0.35, vel: 0.22, wave: 'triangle' }); c.sound.note(drip[0] - 29, { dur: 0.4, vel: 0.18, wave: 'triangle', at: 0.18 }); }
              if (d < -hw2 - 2 && k > passed) { passed = k; if (hitK !== k) { cleared++; best = Math.max(best, cleared); [0, 7].forEach((m, i) => c.sound.note(drip[2] + m + 12, { dur: 0.12, vel: 0.08, wave: 'sine', at: i * 0.06 })); } }
            }
          },
          back(D, t) {
            const s1 = Math.floor(trek * 0.22), s2 = Math.floor(trek * 0.5), s3 = Math.floor(trek), sc = trek * 0.06 + t * 0.3;
            for (let y = 0; y < GY; y++) for (let x = 0; x < N; x++) D[y * N + x] = y < 16 ? skT : y < 21 ? (dith(x, y, (y - 15.5) / 5) ? skM : skT) : y < 31 ? skM : y < 36 ? (dith(x, y, (y - 30.5) / 5) ? skB : skM) : skB;
            // the sky's own things
            if (V2 === 'Night') {
              for (let i = 0; i < 34; i++) { const x = Math.floor(hs(i, 61) * N), y = Math.floor(hs(i, 62) * 34); D[y * N + x] = Math.sin(t * 1.5 + i * 2.3) > 0.2 ? starK : starD; }
              for (let y = 4; y < 16; y++) for (let x = 42; x < 56; x++) { const a = Math.hypot(x + 0.5 - 49, y + 0.5 - 10), b = Math.hypot(x + 0.5 - 51.2, y + 0.5 - 8.6); if (a <= 4.8 && b > 4.3) D[y * N + x] = moonK; }
            } else if (V2 !== 'Rain') {
              const sx = V2 === 'Sunset' ? 22 : 11, sy = V2 === 'Sunset' ? 34 : 10, sr = V2 === 'Sunset' ? 8.5 : 4.6;
              for (let y = Math.max(0, sy - 11); y < sy + 11; y++) for (let x = Math.max(0, sx - 11); x < sx + 11; x++) { const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy); if (d <= sr) D[y * N + x] = sunK; else if (d <= sr + 1.6 && (x + y) % 2 === 0) D[y * N + x] = sunR; }
            }
            if (V2 === 'Rainbow') for (let y = 6; y < GY; y++) for (let x = 0; x < N; x++) { const i = Math.floor(31 - Math.hypot(x + 0.5 - 32, y + 0.5 - 50)); if (i >= 0 && i < 6) D[y * N + x] = rb[i]; }
            // clouds drift slowly, faster than the land behind
            if (V2 !== 'Night') for (let k = 0; k < 3; k++) {
              const rows = cloudRows[k % 2], x0 = Math.floor(((k * 27 + hs(k, 71) * 20 - sc * (1 + k * 0.3)) % 92 + 92) % 92) - 12, y0 = 5 + k * 6 + (V2 === 'Rain' ? -2 : 0);
              for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) { const ch = rows[j][i]; if (ch !== '.') put(D, x0 + i, y0 + j, ch === 'w' ? cloudK : cloudD); }
            }
            // far: hills (a town on the rooftop walk, the sea by the shore)
            for (let x = 0; x < N; x++) {
              const xw = x + s1;
              if (V2 === 'Sea') { for (let y = 29; y < GY; y++) D[y * N + x] = y === 29 ? faD : ((x + y * 3 + Math.floor(t * 2.5)) % 13 === 0 && y < 38 ? skB : y > 36 && dith(x, y, (y - 36) / 6) ? faD : fa); continue; }
              if (V2 === 'Rooftops') {
                const seg = Math.floor(xw / 7), w0 = seg * 7, top = 22 + Math.floor(hs(seg, 81) * 9), peak = hs(seg, 82) < 0.5 ? 2 : 0;
                const dx = xw - w0, h = top - (peak ? peak - Math.abs(dx - 3) * 0.7 : 0);
                for (let y = Math.max(0, Math.round(h)); y < GY; y++) D[y * N + x] = (dx === 2 || dx === 4) && (y - top) % 4 === 2 && y > top + 1 && hs(seg * 31 + y, 83) < 0.5 ? lamp : dx === 6 ? faD : fa;
                continue;
              }
              const h = Math.round(hf(xw));
              for (let y = h; y < GY; y++) D[y * N + x] = V2 === 'Snowfall' && y > h + 2 && dith(x, y, 0.35) ? faD : y === h ? (V2 === 'Night' ? faD : fa) : y > h + 5 && dith(x, y, (y - h - 5) / 10) ? faD : fa;
            }
            // near: the rolling land just behind the path, and its trees (pines in snow, blossom, lamps in town)
            for (let x = 0; x < N; x++) {
              const h = Math.round(hn(x + s2) + (V2 === 'Sea' ? 2 : 0));
              for (let y = h; y < GY; y++) D[y * N + x] = y === h ? neD : dith(x, y, (y - h) / 9) ? neD : ne;
            }
            if (V2 === 'Rooftops') for (let j = Math.floor(s3 / 22) - 1; j <= Math.floor((s3 + N) / 22) + 1; j++) {
              const x = j * 22 + 9 - s3;
              for (let y = 30; y < GY + 1; y++) put(D, x, y, postK);
              plus(D, x, 29, 1, lamp, lamp); put(D, x - 1, 30, postK); put(D, x + 1, 30, postK);
            } else if (V2 !== 'Sea') for (let j = Math.floor(s2 / 13) - 1; j <= Math.floor((s2 + N) / 13) + 1; j++) {
              if (hs(j, 91) < 0.35) continue;
              const xw = j * 13 + Math.floor(hs(j, 92) * 6), x = xw - s2, base = Math.round(hn(xw)) + 1, big = hs(j, 93) < 0.5 ? 1 : 0;
              if (V2 === 'Snowfall') {
                for (let k = 0; k < 9 + big * 2; k++) { const w = Math.floor(k / 2.2); for (let d = -w; d <= w; d++) put(D, x + d, base - 10 - big * 2 + k, k % 3 === 0 && Math.abs(d) === w ? K('#ffffff') : d > 0 ? K('#2f6a52') : K('#3f8a64')); }
                put(D, x, base - 1, trunk); put(D, x, base, trunk);
              } else {
                for (let k = 0; k < 4; k++) put(D, x, base - k, trunk);
                const r = 2.6 + big;
                for (let y = -4; y <= 4; y++) for (let d = -4; d <= 4; d++) { const q = Math.hypot(d, y * 1.1); if (q <= r) put(D, x + d, base - 5 - big + y, q > r - 1 && (d > 0 || y > 0) ? trK[1] : d < 0 && y < 0 && q < r - 1.5 ? trK[2] : trK[0]); }
              }
            }
            // the path, scrolling past at the walker's pace, with its verge
            for (let y = GY; y < N; y++) for (let x = 0; x < N; x++) {
              const xw = x + s3;
              let k = pa;
              if (V2 === 'Sea') k = (xw % 5 === 0) ? paD : pa;
              else if (V2 === 'Rooftops') k = y % 2 === 0 || (xw + (y >> 1) * 2) % 4 === 0 ? paD : pa;
              else if (hs(xw, y * 7) < 0.07) k = paD;
              if (y === GY) k = (V2 === 'Rooftops' || V2 === 'Sea') ? grD : gr;
              if (y === GY + 1 && V2 !== 'Rooftops' && V2 !== 'Sea' && hs(xw, 5) < 0.5) k = grD;
              D[y * N + x] = k;
            }
            for (let x = 0; x < N; x++) { const xw = x + s3; if (V2 !== 'Rooftops' && hs(xw, 77) < 0.28) put(D, x, GY - 1, hs(xw, 78) < 0.15 && V2 !== 'Night' && V2 !== 'Snowfall' ? K(hs(xw, 79) < 0.5 ? '#ff9db4' : '#fff2a0') : gr); }
            if (V2 === 'Rain') for (let j = Math.floor(s3 / 19) - 1; j <= Math.floor((s3 + N) / 19) + 1; j++) {   // puddles, rippling
              const x0 = j * 19 + 4 - s3, r = 1 + Math.floor((t * 2 + j) % 3);
              for (let d = -4; d <= 4; d++) { put(D, x0 + d, 57, Math.abs(d) === r ? K('#e8ecf8') : skB); if (Math.abs(d) < 3) put(D, x0 + d, 58, skM); }
            }
            for (let k = Math.max(0, Math.floor((s3 - 12) / 26)); k < Math.floor((s3 + N + 12) / 26) + 1; k++) {   // what's on the path
              const x = rockX(k) - s3, kind = kindOf(k);
              if (kind === 'rock') { ell(x + 0.5, FG - 3.6, 4.4, 4.4, (p, q) => p < -0.25 && q < -0.35 ? rockK[2] : p > 0.35 || q > 0.4 ? rockK[1] : (Math.abs(p - q) < 0.07 ? rockK[1] : rockK[0])); stamp(D, O); }
              else if (kind === 'log') {   // two logs stacked, ring-ends showing
                for (const [ox, oy] of [[-4, FG - 4], [-3, FG - 8]]) { box(x + ox, oy, 8, 4, (a, b) => a >= 6 ? (b === 0 || b === 3 ? (a === 7 ? 0 : logK[1]) : logK[2]) : b === 0 ? logK[2] : b === 3 || (a + b * 3) % 5 === 0 ? logK[1] : logK[0]); stamp(D, O); }
              }
              else if (kind === 'puddle') { ell(x + 0.5, FG + 0.5, 4.6, 1.3, (p) => p < -0.2 ? wetK[0] : wetK[1]); stamp(D, 0); }
              else {   // a cat sat up asleep; leap it and it wakes, eyes wide, tail high
                const up = wokeK === k && t - wokeAt < 2.5;
                spT(x - 3, FG - 9 - (up ? 1 : 0), ['c...c..', 'cc.cc..', 'ccccc..', up ? 'cwcwc.c' : 'cOcOc..', 'ccpcc.c', '.cccc.c', 'cccccc.', 'cccccc.', 'c.cc.c.'], { c: catK[0], O: O, w: WH, p: catK[1] }); stamp(D, O);
                if (up) { put(D, x - 2, FG - 7 - 1, O); put(D, x, FG - 7 - 1, O); }
              }
            }
            ell(WX + 0.5, FG + 0.6, Math.max(2, (Bw + 2) / 2 - hopH(t) * 0.15), 1, paD); stamp(D, 0);   // its shadow on the path, shrinking as it leaps
          },
          front(D, t, dx, dy) {

            if (V2 === 'Rain') { const rk = K('#e6e9f6'); for (let i = 0; i < 26; i++) { const y = Math.floor((hs(i, 101) * 64 + t * 34) % 64), x = Math.floor((hs(i, 102) * 70 - t * 6 + y * 0.25) % 70 + 70) % 70 - 3; put(D, x, y, rk); put(D, x - 0, y + 1, rk); } }
            if (V2 === 'Snowfall') for (let i = 0; i < 26; i++) { const y = Math.floor((hs(i, 111) * 64 + t * (3 + hs(i, 112) * 3)) % 64), x = Math.floor((hs(i, 113) * 64 + Math.sin(t * 0.9 + i) * 1.5 - trek * 0.6) % 64 + 64) % 64; put(D, x, y, WH); }
            if (V2 === 'Blossom Branch') for (let i = 0; i < 12; i++) { const y = Math.floor((hs(i, 121) * 64 + t * (4 + hs(i, 122) * 2)) % 64), x = Math.floor((hs(i, 123) * 64 + Math.sin(t * 1.3 + i) * 2 - trek * 0.7) % 64 + 64) % 64; put(D, x, y, K(i % 3 ? '#ffb3c7' : '#fff0f4')); }
            if (V2 === 'Night') for (let i = 0; i < 9; i++) { if (Math.sin(t * 2.1 + i * 1.7) < 0.1) continue; const x = Math.floor((hs(i, 131) * 64 + Math.sin(t * 0.6 + i) * 3 - trek * 0.5) % 64 + 64) % 64, y = 36 + Math.floor(hs(i, 132) * 20 + Math.sin(t * 0.8 + i * 2) * 2); put(D, x, y, K('#fff27a')); }
            // dust kicked up at take-off and landing, splashes in puddles
            for (let j = puffs.length - 1; j >= 0; j--) { const f = puffs[j], q = (t - f.t0) / 0.45; if (q > 1) { puffs.splice(j, 1); continue; } const x = Math.round(f.x + f.vx * q * 0.45), y = Math.round(f.y - (f.wet ? Math.sin(q * Math.PI) * 4 : q * 2)); put(D, x, y, f.wet ? wetK[0] : q < 0.5 ? WH : paD); }
            // the score on a little wooden sign: rocks cleared now, and the best run, under a crown
            const row = (str, x0, y0, col) => { for (let j = 0; j < str.length; j++) { const g = digits[+str[j]]; for (let b = 0; b < 15; b++) if (g[b] === '1') put(D, x0 + j * 4 + (b % 3), y0 + Math.floor(b / 3), col); } };
            const sw2 = 10 + Math.max(String(cleared).length, String(best).length) * 4, sx0 = N - sw2 - 2;
            for (const xx of [sx0 + 2, sx0 + sw2 - 3]) for (let y = 0; y < 2; y++) put(D, xx, y, signK[1]);
            const red = t - resetAt < 0.9 && Math.floor((t - resetAt) * 6) % 2 === 0;   // a run lost: the sign flashes red
            box(sx0, 2, sw2, 14, (a, b) => b === 0 || b === 7 ? signK[1] : red ? signR : signK[0]); stamp(D, O);
            spT(sx0 + 2, 4, ['.oo.', 'oggo', 'oggo'], { o: rockK[1], g: rockK[0] });
            spT(sx0 + 2, 10, ['y.y.y', 'yyyyy', 'yyyyy'], { y: signK[3] });
            for (let i = 0; i < N * N; i++) if (tmp[i]) { D[i] = tmp[i]; tmp[i] = 0; }
            qx0 = qy0 = N; qx1 = qy1 = -1;
            row(String(cleared), sx0 + 8, 3, t - lastLand < 0.3 && cleared ? signK[3] : signK[2]); row(String(best), sx0 + 8, 9, signK[3]);
            // left alone, a little bubble over the next thing on the path says what to do
            if (t - lastTap > 6) {
              const f = footW();
              for (let k = Math.max(0, Math.floor((f - 70) / 30)); k < Math.floor((f + 60) / 30) + 1; k++) {
                const d = rockX(k) - f; if (kindOf(k) === 'puddle' || d < 10 || d > 34 || Math.floor(t * 2) % 3 === 2) continue;
                const bx = Math.round(WX + d) - 7, by = FG - tall[kindOf(k)] - 11;
                box(bx, by, 15, 7, () => WH); stamp(D, O); put(D, bx + 7, by + 7, WH); put(D, bx + 6, by + 7, O); put(D, bx + 8, by + 7, O); put(D, bx + 7, by + 8, O);
                const gl = { T: '111010010010010', A: '010101111101101', P: '110101110100100' };
                ['T', 'A', 'P'].forEach((ch, j) => { for (let b = 0; b < 15; b++) if (gl[ch][b] === '1') put(D, bx + 2 + j * 4 + (b % 3), by + 1 + Math.floor(b / 3), O); });
                break;
              }
            }
            if (V2 === 'Sea' || V2 === 'Hills') for (let i = 0; i < 2; i++) { const x = Math.floor(((hs(i, 141) * 64 + t * (3 + i)) % 80)) - 8, y = 14 + i * 7 + Math.round(Math.sin(t * 2 + i) * 1.2), up = Math.floor(t * 5 + i) % 2; for (const [a, b] of up ? [[-2, -1], [-1, 0], [1, 0], [2, -1]] : [[-2, 0], [-1, 0], [1, 0], [2, 0]]) put(D, x + a, y + b, O); put(D, x, y + 1, O); }
          },
        };
      }
    }

    // ================= compose a frame =================
    const scr = lay(), chr = lay(), plF = lay();
    const swayPh = swayPhase;
    const draw = t => {
      // the plant this frame: blooms and snapping traps, then sheared a row at a time
      plF.set(plantL);
      if (traps.length) {
        const since = t - snapAt;
        traps.forEach(([x, y, a], i) => {
          const shut = since < 0.12 ? 1 - since / 0.12 : since < 1.1 ? 0 : Math.min(1, (since - 1.1) / 0.9);
          const idle = since >= 2 ? 0.85 + Math.sin(t * 1.3 + i * 2) * 0.15 : 1;
          trap(plF, x, y, a + Math.sin(t * 1.7 + i) * 0.05, Math.max(0, Math.min(1, shut * idle)));
        });
      }
      for (const b of blooms) flower(plF, Math.floor(b.at[0]), Math.floor(b.at[1]), Math.min(1, (t - b.t0) / 0.45));
      const sway = Math.sin(t * 1.1 + swayPh) * 0.035 + Math.sin(t * 2.3) * 0.008 + reach;
      const lift = perk > 0.35 ? 1 : 0;
      chr.set(back);
      for (let y = 0; y < N; y++) {
        const sy = y < R - 6 ? Math.min(N - 1, y + lift) : y, off = y < R ? Math.round(sway * (R - y)) : 0, row = sy * N;
        for (let x = 0; x < N; x++) { const k = plF[row + x - off]; if (k && x - off >= 0 && x - off < N) chr[y * N + x] = k; }
      }
      for (let i = 0; i < N * N; i++) if (potL[i]) chr[i] = potL[i];
      // the live face
      const bl = (t + blinkPhase) % 4.8, open = bl >= 0.14;
      if (extra[0] === 'Sunglasses') {
        for (const s of [-1, 1]) { const x0 = s < 0 ? PX - G - 4 : PX + G - 3; box(x0, FY - 2, 8, 4, (a, b) => b === 3 && (a === 0 || a === 7) ? 0 : (a === 1 || a === 2) && b === 0 ? WH : K('#2b2140')); stamp(chr, O); }
        for (let x = PX - G + 4; x <= PX + G - 4; x++) put(chr, x, FY - 2, O);
      } else {
        const Ek = glad > 0 ? 'Smiley' : E;
        for (const s of [-1, 1]) {
          let rows = Ek === 'Wink' && s === 1 ? ['.ooo.', 'o...o'] : eyeRows(Ek, open, t, s);
          if (cosmos && Ek === 'Side Glance') rows = rows.map(r => r.replace(/O/g, 'o').replace(/w/g, 'O'));   // on the night pot: a cream eye, its pupil dark
          const w = rows[0].length;
          const xl = PX - G - Math.floor(w / 2), x = s < 0 ? xl : 2 * PX + 1 - xl - w;
          const mirror = s > 0 && (Ek === 'Lashes' || Ek === 'Happy Tears' || Ek === 'Spirals');
          sp(chr, x, Ek === 'Smiley' || (Ek === 'Wink' && s === 1) || Ek === 'Happy Tears' ? FY - 1 : (!open && !noBlink(Ek)) ? FY : eyeTop, rows, !cosmos ? eyeMap : rows.some(r => r.includes('O')) ? eyeMapCO : eyeMapC, mirror);
          if (Ek === 'Teary' && open) { const d = Math.floor(((t * 0.5 + (s + 1) * 0.3) % 1) * 6); const tx = s < 0 ? x : x + w - 1; put(chr, tx, eyeTop + 6 + d, BLU); put(chr, tx, eyeTop + 7 + d, BLU2); }
        }
      }
      if (M === 'Bubble Gum') {
        const cyc = (t + blinkPhase) % 6.5, gum = K('#ff9ed2'), gumL = K('#ffd2ea'), by = MY + 1;
        if (cyc < 4.6) { const r = 1 + Math.floor(Math.min(1, cyc / 4.6) * Math.min(1, cyc / 4.6) * 3.6); ell(cx, by + r * 0.6, r + 0.4, r + 0.4, (p, q) => p < -0.2 && q < -0.2 && r > 1 ? gumL : gum); stamp(chr, O); }
        else if (cyc < 4.9) for (const [a, b] of [[-4, 0], [4, 0], [-3, -3], [3, -3], [-3, 3], [3, 3], [0, 4]]) put(chr, PX + a, by + 2 + b, gum);
      }
      if (companion === 'Fairy Lights') {
        // bulbs hanging from the garland, each blinking slowly on its own beat
        const cols = ['#ffd23a', '#ff6f91', '#4fa6e8', '#5fc46a'], y0 = PB - 6, A2 = hw(PB - 5) - 0.5;
        for (let k = 0; k < 6; k++) {
          const q = (k + 0.5) / 6, x = Math.floor(cx - A2 + q * 2 * A2), sag = Math.sin(((q * 2) % 1) * Math.PI) * 2.4;
          const y = Math.round(y0 + 1 + sag), on = Math.sin(t * 1.6 + k * 1.9) > -0.3;
          put(chr, x, y + 1, on ? WH : K(cols[k % 4])); put(chr, x, y + 2, K(cols[k % 4]));
        }
      }
      // legendary surfaces: a glint that follows the pointer across gold; stars that twinkle in the cosmos
      if (gilded) {
        const gx = c.input.inside ? c.input.x * N * 1.35 + 10 : ((t * 9) % 140) - 20, glint = K('#fffbe6');
        for (let i = 0; i < N * N; i++) { const k = chr[i]; if (!isGold[k]) continue; const x = i % N, y = (i / N) | 0, s = x + y * 0.5 - gx * 0.7 - 10; if (s > -1.2 && s < 1.2) chr[i] = glint; else if (s > -2.6 && s < 2.6 && k !== goldRamp[3]) chr[i] = goldRamp[Math.min(3, goldRamp.indexOf(k) + 1)]; }
      }
      if (cosmos) {
        const near = c.input.inside ? [c.input.x * N, c.input.y * N] : null, st = K('#fff6cc'), st2 = K('#c9b8ff');
        for (const [x, y, ph, onPot] of starCells) {
          const tw = Math.sin(t * 2 + ph) > 0.2 || (near && Math.hypot(x - near[0], y - near[1]) < 7);
          if (!onPot && !isGold[chr[y * N + x]]) continue;
          chr[y * N + x] = tw ? st : st2;
          if (near && Math.hypot(x - near[0], y - near[1]) < 4) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (isGold[get(chr, x + a, y + b)]) chr[(y + b) * N + x + a] = st2;
        }
      }
      if (cosmos) {   // a one-cell plum outline round the cream eyes, brows and mouth, inside the face patch
        for (let i = N; i < N * N - N; i++) {
          if (!facePatch[i] || !isGold[chr[i]]) continue;
          const a = chr[i - 1], b = chr[i + 1], d = chr[i - N], e = chr[i + N];
          if (a === INK || b === INK || d === INK || e === INK || a === WH || b === WH || d === WH || e === WH) chr[i] = O;
        }
      }
      // the background and weather (a Legendary paints its own scene)
      if (scene) scene.back(scr, t);
      else {
      scr.set(bg);
      if (!walled && !night) {
        const cloud = K(VIEW === 'Rain' ? mix(skyTop, '#ffffff', 0.3) : mix(wallH, '#ffffff', 0.5));
        if (VIEW !== 'Rain') for (let k = 0; k < 2; k++) {
          const cxw = 13 + ((Math.floor(t * 0.5) + Math.floor(decoJ[k] * 40) + k * 19) % 44) - 3, cyw = 12 + k * 5;
          const rows = k ? ['..www...', '.wwwwww.', 'wwwwwwww'] : ['...ww....', '.wwwwww..', 'wwwwwwwww', '.wwwwwww.'];
          for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) { const x = cxw + i, y = cyw + j; if (rows[j][i] === 'w' && get(glass, x, y) && scr[y * N + x] !== K(mix(wallH, '#3d2a4a', 0.3))) scr[y * N + x] = cloud; }
        }
        if (VIEW === 'Snowfall') for (let i = 0; i < 24; i++) { const y = 7 + Math.floor((mj[i] * 47 + t * (2.2 + mj[i + 20] * 2)) % 47), x = 13 + Math.floor(mj[(i + 9) % 48] * 39 + Math.sin(t * 0.8 + i) * 1.2); if (get(glass, x, y)) scr[y * N + x] = WH; }
        if (VIEW === 'Rain') { const rk = K(mix(skyTop, '#ffffff', 0.55)); for (let i = 0; i < 22; i++) { const y = 7 + Math.floor((mj[i] * 47 + t * 30) % 47), x = 13 + Math.floor(mj[(i + 9) % 48] * 39); if (get(glass, x, y)) scr[y * N + x] = rk; if (get(glass, x, y + 1)) scr[(y + 1) * N + x] = rk; } }
      }
      }
      // the character goes down (walking and hopping, if it can)
      let cdy = 0;
      if (walker) { const h = t - hopAt; cdy = h < 0.8 ? -Math.round(Math.sin(h / 0.8 * Math.PI) * 5) : h < 0.92 ? 1 : 0; }   // and a squash as it lands
      const tripping = walker && t - tripAt < 1.6, hopping = cdy < 0, striding = walker && !hopping && !tripping;
      if (tripping && t - tripAt > 0.3 && t - tripAt < 1.35) cdy = 3;   // a tumble: it sits down hard in the path
      if (striding && (wclk / 0.32) % 1 < 0.5) cdy = -1;   // out walking, it bobs up on every step
      if (scene && scene.bob) cdy += scene.bob(t);
      const cdx = walkX + (tripping && t - tripAt < 0.4 ? (Math.floor(t * 16) % 2) * 2 - 1 : 0) + (scene && scene.shake ? scene.shake(t) : 0);   // a stumble or a knock: it wobbles on the spot
      if (scene && scene.behind) scene.behind(scr, t, cdx, cdy);
      if (scene && scene.walker) scene.walker(scr, t, chr);
      else for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const k = chr[y * N + x]; if (k) put(scr, x + cdx, y + cdy, k); }
      if (walker && !(scene && scene.walker)) {   // two little legs striding along (one planted, one stepping), red boots, stubby arms; it stops to wave when a hand comes near
        const stride = Math.floor(wclk / (scene && scene.running ? 0.18 : 0.32)) % 2, limb = K(mix(PC1, '#3d2a4a', 0.25)), limbL = P0, boot = HOT;
        for (const s2 of [-1, 1]) {
          const stepping = hopping || (striding && stride === (s2 < 0 ? 0 : 1));
          // long legs from under the pot (below a saucer or egg cup) down to the path, the foot on row 58
          const fx = PX + cdx + (s2 < 0 ? -5 : 3), top0 = PB + (PT === 'Teacup' ? 3 : PT === 'Eggshell' ? 5 : 1), legN = Math.max(3, 58 - top0 - (hopping ? 0 : cdy)), fy = top0 + cdy - (stepping ? 1 : 0);
          const legRows = []; for (let j = 0; j < legN; j++) legRows.push(stepping && j >= legN / 2 ? '.ll' : 'll.'); legRows.push(stepping ? '.fff' : 'fff.');
          spT(fx - (walkDir < 0 ? 1 : 0), fy, legRows, { l: limb, f: boot }, walkDir < 0); stamp(scr, O);
          // the right hand holds the bindle up on its shoulder; the left swings as it walks, and waves when greeted
          const greet = s2 < 0 && (glad > 0 || hopping || tripping), wave = s2 > 0 ? 1 : greet ? Math.floor(t * 4) % 2 : striding ? stride : 0;
          const ax = s2 < 0 ? PX + cdx - Math.ceil(hw(FY + 2)) - 3 : PX + cdx + Math.ceil(hw(FY + 2)) + 1, ay = FY + 2 + cdy - (wave ? (s2 < 0 && !greet ? 1 : 3) : 0);
          spT(ax, ay, wave ? ['.ll', 'lll', 'll.'].map(r => s2 > 0 ? r : r.split('').reverse().join('')) : ['ll.', 'lll', '.ll'].map(r => s2 < 0 ? r : r.split('').reverse().join('')), { l: limbL }); stamp(scr, O);
        }
      }
      if (!scene) for (let i = 0; i < N * N; i++) { if (comp[i]) scr[i] = comp[i]; }
      else if (walker && !scene.walker && ['Snail', 'Frog', 'Mini Me', 'Pebble Pals'].includes(companion)) {
        // a friend from the shelf trots along behind, a hop on every other step
        const fy = striding && Math.floor(wclk / (scene.running ? 0.16 : 0.32)) % 4 === 1 ? -1 : 0;
        for (let i = 0; i < N * N; i++) { if (!comp[i]) continue; const x = i % N, y = (i / N) | 0, nx = compSide > 0 ? 2 * compX - x - 40 : x + 2; put(scr, nx, y + 1 + fy, comp[i]); }
      }
      if (scene && scene.front) scene.front(scr, t, cdx, cdy);
      // things in the air
      if (companion === 'Tea Mug' && !scene) {
        const steam = K(mix(wallH, '#ffffff', 0.7));
        for (let k = 0; k < 2; k++) { const ph = (t * 0.35 + k * 0.5) % 1; for (let j = 0; j < 4; j++) { const y = CB - 11 - Math.floor(ph * 5) - j * 1, x = X - 1 + k * 2 + Math.round(Math.sin(j * 0.9 + t * 1.5 + k) * 0.7); if ((j + Math.floor(ph * 5)) % 2 || ph < 0.6) put(scr, x, y, steam); } }
      }
      if (blueRose) {   // its sparkle: always lit, flaring big now and then and when the rose is tapped
        const big = Math.floor(t * 1.3) % 4 === 0 || t - chimeAt < 0.8, sx = roseX + 5 + walkX, sy = roseY - 5 + cdy, gl = K('#c9d8ff');
        put(scr, sx, sy, WH);
        for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { put(scr, sx + a, sy + b, gl); if (big) put(scr, sx + 2 * a, sy + 2 * b, gl); }
      }
      for (const h of hearts) { const q = (t - h.t0) / 1.8, x = Math.round(h.x + Math.sin(q * 6) * 1.2), y = Math.round(R - 10 - q * 18); if (q < 0.85 || Math.floor(t * 10) % 2) { sp(scr, x - 2, y, ['.O.O.', 'OhOhO', 'OhhhO', '.OhO.', '..O..'], { O: O, h: HOT }); } }
      for (const s of sparks) { const q = (t - s.t0) / 0.6; if (q < 0) continue; const x = Math.round(s.x) + walkX, y = Math.round(s.y - q * 4), k = goldRamp[3]; put(scr, x, y, WH); if (q < 0.6) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(scr, x + a, y + b, k); }
      for (const r of rings) { const q = (t - r.t0) / 1.4, rad = 1 + q * 13, cols = [WH, K('#fff6cc'), K('#ff9ad5')]; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + q * 2; if ((i + Math.floor(q * 8)) % 3 === 0) continue; put(scr, Math.round(r.x + Math.cos(a) * rad), Math.round(r.y + Math.sin(a) * rad * 0.8), cols[i % 3]); } if (q < 0.5) { put(scr, Math.round(r.x), Math.round(r.y), WH); } }
      if (extra[0] === 'Bee') {
        const a = t * 0.9 + beePhase, bx = Math.round(32 + Math.cos(a) * 21), by = Math.round(18 + Math.sin(a * 2) * 4.5), flip = Math.cos(a) > 0, fl = Math.floor(t * 12) % 2;
        sp(scr, bx - 3, by - 3, fl ? ['..ww...', '.wwww..', '..ww...', '.......', '.......'] : ['.......', '.......', 'www....', '.ww....', '.......'], { w: K('#e8f4ff') }, flip);
        sp(scr, bx - 3, by - 1, ['.OOOOO.', 'OyOyOyO', 'OyOyOOO', '.OOOOO.'], { O: O, y: YEL }, flip);
      }
      for (const d of drops) { const x = Math.floor(d.x), y = Math.floor(d.y); put(scr, x, y - 1, BLU); put(scr, x, y, BLU2); }
      for (const p of splash) { const k = Math.floor(p.a / 0.1); put(scr, p.x - 1 - k, p.y - 1 - (k ? 0 : 0), BLU); put(scr, p.x + 1 + k, p.y - 1, BLU); }
      // out to the canvas: one cell per palette index, scaled up unsmoothed
      for (let i = 0; i < N * N; i++) u32[i] = pal[scr[i]] || pal[O];
      pg.putImageData(img, 0, 0);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = false;   // hard square cells, never smoothed
      ctx.drawImage(pcv, 0, 0, S, S);
    };
    draw(0);
    return t => { tend(t); draw(t); };
  },
});

})(window.Proto);
