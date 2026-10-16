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
    const PX = 32 - (onShelf && PT !== 'Rain Boot' ? compSide * 5 : 0);
    const cx = PX + 0.5, SH = 54, LIFT = walker ? 6 : 0;   // a walker stands up on its legs, pot well off the shelf
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
    const goldRamp = ['#7a4e12', '#c58b25', '#efc14a', '#fff1a6'].map(K), cosRamp = ['#15163a', '#2d3274', '#5a4fb0', '#9d86f0'].map(K);
    const isGold = new Uint8Array(256), starCells = [], facePatch = lay();
    if (gilded || cosmos) {
      const ramp = gilded ? goldRamp : cosRamp, remap = {};
      const re = k => { if (!k || k === O) return k; if (remap[k] === undefined) { const l = lum[k]; remap[k] = ramp[gilded ? (l < 0.25 ? 0 : l < 0.6 ? 1 : l < 0.88 ? 2 : 3) : (l < 0.42 ? 0 : l < 0.62 ? 1 : l < 0.8 ? 2 : 3)]; } return remap[k]; };
      // the pot itself: its body and rim (not the plant trailing over it)
      const inPot = i => { const x = i % N, y = (i / N) | 0; return potM[i] || (y >= PR - 2 - band && y <= PR + 1 && Math.abs(x - PX) <= A + 2) || (PT === 'Teacup' && y > PB) || (PT === 'Teacup' && Math.abs(x - PX) > A - 4 && y >= PR && y <= PR + 13); };
      // gilded: the plant stays green and only the pot and its rim are gold; cosmos: everything goes to the night
      if (cosmos) for (let i = 0; i < N * N; i++) plantL[i] = re(plantL[i]);
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
      if (walker) {   // it shuffles toward the pointer, a cell at a time
        const goal = c.input.inside ? Math.max(-6, Math.min(6, Math.round(c.input.x * N - cx))) : 0;
        if (goal !== walkX && t - walkT > 0.28 && t - hopAt > 0.5) { walkT = t; walkDir = Math.sign(goal - walkX); walkX += walkDir; step++; c.sound.hit('click', 0.12); }
      }
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
      // the background and weather
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
      // the character goes down (walking and hopping, if it can)
      let cdy = 0;
      if (walker) { const h = t - hopAt; cdy = h < 0.5 ? -Math.round(Math.sin(h / 0.5 * Math.PI) * 4) : 0; }
      const cdx = walkX;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const k = chr[y * N + x]; if (k) put(scr, x + cdx, y + cdy, k); }
      if (walker) {   // two little legs, always mid-stride (one planted, one stepping), red boots, stubby arms that wave
        const stride = Math.floor(t / 0.7 + step) % 2, limb = K(mix(PC1, '#3d2a4a', 0.25)), limbL = P0, boot = HOT;
        for (const s2 of [-1, 1]) {
          const stepping = cdy < 0 || stride === (s2 < 0 ? 0 : 1);
          // long legs from under the pot (below a saucer or egg cup) down to the shelf, the foot on row 58
          const fx = PX + cdx + (s2 < 0 ? -5 : 3), top0 = PB + (PT === 'Teacup' ? 3 : PT === 'Eggshell' ? 5 : 1), legN = Math.max(3, 58 - top0), fy = top0 + cdy - (stepping ? 1 : 0);
          const legRows = []; for (let j = 0; j < legN; j++) legRows.push(stepping && j >= legN / 2 ? '.ll' : 'll.'); legRows.push(stepping ? '.fff' : 'fff.');
          spT(fx - (walkDir < 0 ? 1 : 0), fy, legRows, { l: limb, f: boot }, walkDir < 0); stamp(scr, O);
          const wave = s2 > 0 && (c.input.inside || glad > 0 || cdy < 0) ? Math.floor(t * 4) % 2 : 0;
          const ax = s2 < 0 ? PX + cdx - Math.ceil(hw(FY + 2)) - 3 : PX + cdx + Math.ceil(hw(FY + 2)) + 1, ay = FY + 2 + cdy - (wave ? 3 : 0);
          spT(ax, ay, wave ? ['.ll', 'lll', 'll.'] : ['ll.', 'lll', '.ll'].map(r => s2 < 0 ? r : r.split('').reverse().join('')), { l: limbL }); stamp(scr, O);
        }
      }
      for (let i = 0; i < N * N; i++) if (comp[i]) scr[i] = comp[i];
      // things in the air
      if (companion === 'Tea Mug') {
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
