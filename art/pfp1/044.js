// Two Sides: from D:/code/synaesthesia/public/drop03/pieces/044.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 044 Two Sides: cubist sitters as pixel art on a 64-cell grid. Every face is split
// into a front view and a side view at once (a profile nose, mismatched eyes, a
// two-tone mouth), set against a background cut into flat planes with coloured
// seams, every shape drawn with a one-cell dark outline. Eyes, mouths, brows and
// jewellery are hand-set cell sprites; nothing is smoothed or scaled down.
Proto.add({
  num: 44,
  name: 'Two Sides',
  fam: 'Faces & People',
  recipe: 'Each hash is a new sitter painted as two views at once, as pixel art on a 64-cell grid: the face split into a front half and a side half, mismatched eyes and a profile nose, on a background cut into flat planes. Head shape, age, mood, nose, eyes, hair or hat, collar, beard, jewellery, garment, prop and backdrop all vary, with gilt skin, a third eye and a laurel among the rares; one in two hundred holds a rose in the teeth, and rarer still are the legendaries: a Plaster cast on a gallery wall, the sitter Shattered in a gilt mirror, and The Instrument in a papier colle.',
  interactive: 'Tap the face to change its mood. Tap the prop or the background to play it.',
  music: true,
  seed: 0,
  make(c) {
    const ctx = c.ctx, S = c.size;

    // splitmix32 stepping from a seed built out of the hash's bytes (the painting's first stream)
    let sm = 0;
    for (let i = 2; i < c.hash.length; i += 2) sm = (Math.imul(sm, 31) + parseInt(c.hash.substr(i, 2), 16)) | 0;
    const inkSeed = sm >>> 0;
    const R = () => {
      sm = (sm + 0x9e3779b9) | 0;
      let z = sm;
      z = Math.imul(z ^ (z >>> 16), 2246822507);
      z = Math.imul(z ^ (z >>> 13), 3266489909);
      z ^= z >>> 16;
      return (z >>> 0) * 2.3283064365386963e-10;
    };
    const U = (lo, hi) => lo + (hi - lo) * R();
    const W = list => { const tot = list.reduce((s, e) => s + e[1], 0); let v = R() * tot; for (const e of list) { v -= e[1]; if (v < 0) return e[0]; } return list[0][0]; };

    // a second, independent stream (xorshift128 over the hash's last four words) for everything
    // added in the polish, so the first stream's colours, dress and backgrounds stay as they were
    let qa = parseInt(c.hash.slice(34, 42), 16) | 0, qb = parseInt(c.hash.slice(42, 50), 16) | 0;
    let qc = parseInt(c.hash.slice(50, 58), 16) | 0, qd = parseInt(c.hash.slice(58, 66), 16) | 1;
    const Q = () => {
      const t = qa ^ (qa << 11);
      qa = qb; qb = qc; qc = qd;
      qd = (qd ^ (qd >>> 19)) ^ (t ^ (t >>> 8));
      return (qd >>> 0) / 4294967296;
    };
    for (let k = 0; k < 16; k++) Q();
    const QU = (a, b) => a + (b - a) * Q();
    const QW = list => { let tot = 0; for (const e of list) tot += e[1]; let v = Q() * tot; for (const e of list) { v -= e[1]; if (v < 0) return e[0]; } return list[list.length - 1][0]; };

    // ---------- first-stream traits (kept from the original collection) ----------
    const palettes = {
      Ochre: ['#d9a441', '#b5652e', '#e8d4a6', '#6f7f5a', '#3d4f6b', '#c98f5a'],
      Slate: ['#4f6d8a', '#2c3e57', '#a9b9c6', '#d8cfb8', '#8a5a4a', '#6b8fa3'],
      Terracotta: ['#c4573a', '#8a3324', '#efc9a0', '#e39b4f', '#4a5a3c', '#d9b38c'],
      Olive: ['#7c8a3e', '#4b5528', '#e2d9a8', '#b38a3f', '#6a4a3a', '#a7b46a'],
      Harlequin: ['#d63c3c', '#1f3f99', '#f0c419', '#f2ece0', '#1b1b1b', '#2e8b57'],
      Absinthe: ['#9bb04a', '#4f6a2e', '#efe6b0', '#d8b23a', '#2f3b4a', '#c6cf7a'],
      Rose: ['#d98e8e', '#9c4f5a', '#f3d9cc', '#c9a07a', '#5a4a6a', '#e7b7a5'],
      'Blue Hour': ['#3c5a8c', '#1e2f52', '#9bb3d6', '#6d86b5', '#16223d', '#c9d6ea'],
      'Ink and Paper': ['#f1ebdd', '#1d1b19', '#d9d0bc', '#b8322a', '#2c2a27', '#9a968c'],
    };
    let palName = W([['Ochre', 26], ['Slate', 24], ['Terracotta', 24], ['Olive', 18], ['Harlequin', 8]]);
    const skins = [['Light', '#f0d2b4', '#d4a988'], ['Medium', '#e3b088', '#c08560'], ['Light Brown', '#c38558', '#9c623a'], ['Brown', '#93593a', '#6e3f26'], ['Dark', '#62392a', '#45261a'], ['Cobalt', '#8fa6c4', '#5d7598']];
    let skin = W([[skins[0], 18], [skins[1], 18], [skins[2], 18], [skins[3], 18], [skins[4], 18], [skins[5], 6]]);
    let split = W([['Vertical', 44], ['Slanted', 40], ['Stepped', 16]]);
    let eyes = W([['Almond and disc', 38], ['Leaf and diamond', 32], ['Twin almonds', 20], ['One eye', 10]]);
    let hair = W([['Comb', 20], ['Blocks', 18], ['Wave', 18], ['Bun', 16], ['Crop', 16], ['Brim hat', 12]]);
    let hairCol = W([['#1c1714', 34], ['#4a2b1c', 26], ['#8a3a1e', 14], ['#c9a04a', 12], ['#7d7f86', 14]]);
    let garment = W([['Stripes', 30], ['Checks', 22], ['Plain', 28], ['Diamonds', 12], ['Dots', 8]]);
    let prop = W([['None', 52], ['Bird', 14], ['Hand', 16], ['Flower', 12], ['Moon', 6]]);
    const flip = R() < 0.5 ? 1 : -1; // which side is the profile side

    // ---------- second-stream traits (the polish) ----------
    let v = Q();
    if (v < 0.02) palName = 'Ink and Paper'; else if (v < 0.05) palName = 'Blue Hour'; else if (v < 0.15) palName = 'Rose'; else if (v < 0.25) palName = 'Absinthe';
    const pal = palettes[palName];
    v = Q();
    if (v < 0.02) skin = ['Gilt', '#e2b955', '#b0832c'];
    else if (v < 0.11) skin = ['Tan', '#c9a77c', '#a07e55'];
    else if (v < 0.19) skin = ['Deep', '#7c4b30', '#5a321f'];
    else if (v < 0.25) skin = ['Fair', '#f6e0d2', '#dcb6a6'];
    const headShape = QW([['Long', 17], ['Square', 15], ['Heart', 14], ['Pear', 12], ['Round', 14], ['Shield', 12], ['Profile edge', 13], ['Lozenge', 3]]);
    const wf = QU(0.9, 1.08), lf = QU(0.93, 1.04);
    const age = QW([['Young', 26], ['Grown', 36], ['Weathered', 22], ['Elder', 16]]);
    const moods = ['Calm', 'Wry', 'Smile', 'Pout', 'Surprised', 'Stern', 'Sly', 'Whistle'];
    const mood0 = QW([['Calm', 22], ['Wry', 14], ['Smile', 14], ['Pout', 10], ['Surprised', 8], ['Stern', 12], ['Sly', 11], ['Whistle', 7]]);
    if (Q() < 0.07) split = 'Cross';
    v = Q();
    if (v < 0.02) eyes = 'Three eyes'; else if (v < 0.12) eyes = 'Square and almond'; else if (v < 0.2) eyes = 'Disc and slit'; else if (v < 0.27) eyes = 'Twin discs';
    const nose = headShape === 'Profile edge' ? 'In the outline' : QW([['Wedge', 34], ['Hook', 18], ['Snub', 16], ['Broad', 18], ['Roman', 14]]);
    v = Q();
    if (v >= 0.48) hair = QW([['Curls', 14], ['Braid', 10], ['Pompadour', 9], ['Wrap', 10], ['Beret', 10], ['Bowler', 7], ['Flat cap', 8], ['Topknot', 8], ['Fringe', 10], ['Bald', age === 'Elder' || age === 'Weathered' ? 14 : 3], ['Laurel', 2]]);
    v = Q();
    if (age === 'Elder' && v < 0.72) hairCol = v < 0.4 ? '#ebe6da' : '#a9aab0';
    else if (age === 'Weathered' && v < 0.3) hairCol = '#a9aab0';
    else if (v > 0.985) hairCol = '#3c63b8';
    else if (v > 0.9) hairCol = '#a4442a';
    else if (v > 0.84) hairCol = '#1a2238';
    v = Q();
    if (v < 0.36) garment = QW([['Panels', 30], ['Chevrons', 26], ['Wide bands', 22], ['Tartan', 22]]);
    const collar = QW([['Crew', 24], ['V-neck', 22], ['Turtleneck', 14], ['Lapels', 16], ['Sailor', 8], ['Bow tie', 10], ['Ruff', 5]]);
    v = Q();
    if (v < 0.02) prop = 'Dove'; else if (v < 0.42) prop = QW([['Pipe', 22], ['Guitar', 22], ['Fan', 18], ['Lemon', 16], ['Cup', 22]]);
    const jewel = QW([['None', 48], ['Hoop', 16], ['Pearl', 14], ['Drop', 12], ['Tassel', 8]]);
    const eyewear = eyes === 'Three eyes' || eyes === 'One eye' ? 'None' : QW([['None', 86], ['Spectacles', 10], ['Monocle', 4]]);
    const beard = QW([['None', 62], ['Moustache', 10], ['Goatee', 8], ['Stubble', 9], ['Full beard', 8], ['Curled moustache', 3]]);
    let ground = QW([['Shards', 50], ['Fan', 20], ['Tiles', 18], ['Window', 12]]);
    // a third stream (a mulberry over another slice of the hash) for the newer backdrops, so every other
    // draw above and below stays put: 63% of the Shards, Fan and Tiles mints move into one of seven rooms
    // (so Shards, Fan and Tiles together are about a third, Window keeps its 12% and each room is about 8%);
    // a room that was rolled as Fan or Tiles still makes that backdrop's draws, so its later traits stay put
    let bw = (parseInt(c.hash.slice(10, 18), 16) ^ 0x4cf5ad43) >>> 0;
    const B = () => { bw = (bw + 0x6d2b79f5) >>> 0; let z = bw; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const bRoll = B(), bPick = B();
    const ROOMS = ['Still life', 'Cafe wall', 'Harbour window', 'Stage curtain', 'Awning', 'Chequer floor', 'Night window'];
    const rolled = ground;
    if (ground !== 'Window' && bRoll < 0.63) ground = ROOMS[Math.floor(bPick * ROOMS.length)];
    const room = ROOMS.includes(ground);
    const pose = QW([['Upright', 46], ['Tilted', 38], ['Leaning', 16]]);
    const tilt = pose === 'Upright' ? 0 : (Q() < 0.5 ? -1 : 1) * (pose === 'Tilted' ? QU(0.06, 0.1) : QU(0.13, 0.17));


    // ---------- legendaries and the rose: their own stream (a multiply-rotate hash over the hash's 16-bit words) ----------
    const rare = salt => {
      let h = salt | 0;
      for (let i = 2; i < 66; i += 4) { h = Math.imul(h ^ parseInt(c.hash.substr(i, 4), 16), 0x2c1b3c6d); h = (h << 13) | (h >>> 19); }
      h = Math.imul(h ^ (h >>> 15), 0x297a2d39); h ^= h >>> 12;
      return (h >>> 0) * 2.3283064365386963e-10;
    };
    const lv = rare(0x2b1d);
    const legend = lv < 0.001 ? 'Plaster' : lv < 0.002 ? 'Shattered' : lv < 0.003 ? 'The Instrument' : 'None';
    const rose = rare(0x7053) < 0.005;
    const lute = legend === 'The Instrument';
    const tr = (k, val) => c.trait(k, lute && ['Hair', 'Hair colour', 'Beard', 'Jewellery'].includes(k) ? 'None' : lute && k === 'Head' ? 'Guitar' : val);
    const hats = ['Brim hat', 'Beret', 'Bowler', 'Flat cap', 'Wrap'];
    const colName = { '#1c1714': 'Black', '#4a2b1c': 'Brown', '#8a3a1e': 'Rust', '#c9a04a': 'Gold', '#7d7f86': 'Grey', '#ebe6da': 'White', '#a9aab0': 'Silver', '#3c63b8': 'Painted blue', '#a4442a': 'Henna', '#1a2238': 'Blue-black' }[hairCol];
    const outline = palName === 'Blue Hour' ? '#0d1426' : palName === 'Slate' ? '#141a24' : '#21160f';
    const hexRGB = hex => [1, 3, 5].map(k => parseInt(hex.substr(k, 2), 16));
    const mixHex = (a, b, f) => { const x = hexRGB(a), y = hexRGB(b); return 'rgb(' + x.map((n, i) => Math.round(n + (y[i] - n) * f)).join(',') + ')'; };

    // ---------- polygons ----------
    const cutPoly = (poly, px, py, nx, ny) => {
      const a = [], b = [];
      for (let i = 0, n = poly.length; i < n; i++) {
        const p = poly[i], q = poly[(i + 1) % poly.length];
        const dp = (p[0] - px) * nx + (p[1] - py) * ny, dq = (q[0] - px) * nx + (q[1] - py) * ny;
        (dp >= 0 ? a : b).push(p);
        if ((dp >= 0) !== (dq >= 0)) {
          const f = dp / (dp - dq), m = [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
          a.push(m); b.push(m);
        }
      }
      return [a, b];
    };
    const area = p => { let s = 0; for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; s += p[i][0] * q[1] - q[0] * p[i][1]; } return Math.abs(s / 2); };
    const centroid = p => { let x = 0, y = 0; for (const q of p) { x += q[0]; y += q[1]; } return [x / p.length, y / p.length]; };
    // the first stream's shards (always rolled, so its later draws stay put)
    let planes = [[[0, 0], [1000, 0], [1000, 1000], [0, 1000]]];
    for (let k = 0; k < 8; k++) {
      planes.sort((p, q) => area(q) - area(p));
      const big = planes.shift(), [cx, cy] = centroid(big), ang = U(0, Math.PI);
      const parts = cutPoly(big, cx + U(-60, 60), cy + U(-60, 60), Math.cos(ang), Math.sin(ang));
      planes.push(...parts.filter(p => p.length >= 3));
    }
    let planeCols = planes.map(() => pal[Math.floor(R() * pal.length)]);
    let planeHatch = planes.map(() => R() < 0.3);

    // head centre and the first stream's features
    const hcx = 500 + U(-20, 20), hcy = U(400, 430);
    const sxTop = hcx + U(-20, 20), sxBot = hcx + (split === 'Slanted' ? flip * U(40, 80) : U(-15, 15));
    const eyeY = hcy - U(30, 50) * lf;
    const eyeA = [hcx - flip * U(85, 100) * wf, eyeY + U(-12, 12)];
    const eyeB = [hcx + flip * U(80, 100) * wf, eyeY + U(-45, 25)];
    const noseLen = U(80, 115), noseDrop = U(70, 100) * lf, noseRise = U(10, 30);
    const mouthY = hcy + U(150, 172) * lf, mouthW = U(52, 72) * Math.min(1, wf);
    const browA = U(-0.25, 0.1), browB = U(-0.1, 0.35);
    const neckW = U(64, 88);
    const propAt = [hcx + flip * -U(250, 330), U(640, 760)];
    const hairExtra = [U(0.8, 1.2), U(0.8, 1.2), U(-30, 30)];
    const dotsOff = U(0, 40);

    // other backdrops are cut from the second stream
    if (rolled === 'Fan') {
      const ox = Q() < 0.5 ? QU(80, 300) : QU(700, 920), oy = QU(40, 260), rot = QU(0, 6.28);
      const sq = [[0, 0], [1000, 0], [1000, 1000], [0, 1000]], n = 11, angs = [];
      for (let k = 0; k < n; k++) angs.push(rot + k * Math.PI * 2 / n + QU(-0.12, 0.12));
      planes = [];
      for (let k = 0; k < n; k++) {
        const a1 = angs[k], a2 = k + 1 < n ? angs[k + 1] : angs[0] + Math.PI * 2;
        const w1 = cutPoly(sq, ox, oy, -Math.sin(a1), Math.cos(a1))[0];
        const w2 = cutPoly(w1, ox, oy, Math.sin(a2), -Math.cos(a2))[0];
        if (w2.length >= 3 && area(w2) > 40) planes.push(w2);
      }
    } else if (rolled === 'Tiles') {
      const xs = [0, QU(270, 390), QU(610, 730), 1000], ys = [0, QU(260, 380), QU(600, 720), 1000];
      planes = [];
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
        const cell = [[xs[i], ys[j]], [xs[i + 1], ys[j]], [xs[i + 1], ys[j + 1]], [xs[i], ys[j + 1]]];
        const ang = Q() < 0.5 ? Math.PI / 4 : -Math.PI / 4, [cx, cy] = centroid(cell);
        for (const p of cutPoly(cell, cx, cy, Math.cos(ang), Math.sin(ang))) if (p.length >= 3) planes.push(p);
      }
    }
    if (rolled !== 'Shards') { planeCols = planes.map(() => pal[Math.floor(Q() * pal.length)]); planeHatch = planes.map(() => Q() < 0.3); }
    if (ground === 'Window') {
      const wx = hcx + flip * QU(300, 350), wy = QU(70, 130), ww = QU(190, 240), wh = QU(260, 320);
      const tilt = QU(-25, 25);
      const P4 = (x0, y0, x1, y1) => [[x0 + tilt * (y0 - wy) / wh, y0], [x1 + tilt * (y0 - wy) / wh, y0], [x1 + tilt * (y1 - wy) / wh, y1], [x0 + tilt * (y1 - wy) / wh, y1]];
      const sky = palName === 'Ink and Paper' ? '#d9d0bc' : palName === 'Blue Hour' ? '#c9d6ea' : '#9fc0d8';
      planes.push(P4(wx - ww / 2 - 22, wy - 22, wx + ww / 2 + 22, wy + wh + 22)); planeCols.push(pal[2]); planeHatch.push(false);
      for (let k = 0; k < 4; k++) {
        const x0 = wx - ww / 2 + (k % 2) * (ww / 2 + 6), y0 = wy + Math.floor(k / 2) * (wh / 2 + 6);
        planes.push(P4(x0, y0, x0 + ww / 2 - 6, y0 + wh / 2 - 6)); planeCols.push(k === 1 ? mixHex(sky, '#ffffff', 0.35) : sky); planeHatch.push(k === 2);
      }
    }

    if (room) {
      // each room is its own composition, laid out as planes (so tapping one still recolours it and plays
      // its note), in the palette's own colours; the big things sit on the profile side, clear of the props
      planes = []; planeCols = []; planeHatch = [];
      const ellR = (x, y, rx, ry, n) => { const o = []; for (let k = 0; k < n; k++) { const an = k * Math.PI * 2 / n; o.push([x + Math.cos(an) * rx, y + Math.sin(an) * ry]); } return o; };
      const add = (p, col, h) => { planes.push(p); planeCols.push(col); planeHatch.push(!!h); };
      const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const S = flip, side = hcx + S * 340, other = hcx - S * 360, cream = '#f2ece0';
      const skyC = palName === 'Ink and Paper' ? '#d9d0bc' : palName === 'Blue Hour' ? '#c9d6ea' : '#9fc0d8';
      const mirX = p => p.map(([x, y]) => [S > 0 ? x : 1000 - x, y]);
      if (ground === 'Still life') {
        // a table with a bottle on it and a folded newspaper, against a wall cut in two planes
        add(rect(0, 0, 1000, 1000), pal[2]);
        add(mirX([[0, 0], [360, 0], [200, 600], [0, 640]]), pal[5], true);
        add([[0, 600], [1000, 560], [1000, 700], [0, 742]], pal[0]);
        add([[0, 742], [1000, 700], [1000, 1000], [0, 1000]], pal[1], true);
        const bx = side;
        add(rect(bx - 16, 240, bx + 16, 330), pal[4]); add([[bx - 52, 392], [bx - 16, 330], [bx + 16, 330], [bx + 52, 392]], pal[4]);
        add(rect(bx - 52, 392, bx + 52, 620), pal[4]); add(rect(bx - 52, 452, bx + 52, 540), cream, true); add(rect(bx - 38, 404, bx - 22, 600), pal[5]);
        const nx = other;
        add([[nx - 150, 616], [nx + 60, 584], [nx + 92, 650], [nx - 128, 688]], '#ece4d0', true);
        add([[nx + 60, 584], [nx + 176, 612], [nx + 156, 674], [nx + 92, 650]], '#d2c8ae', true);
      } else if (ground === 'Cafe wall') {
        // striped paper above a dado rail, boards below, a poster and a clock
        add(rect(0, 0, 1000, 1000), pal[4]);
        for (let k = 0; k < 10; k++) add(rect(k * 100, 0, k * 100 + 100, 560), k % 2 ? pal[0] : pal[5], k % 2 === 0);
        add(rect(0, 540, 1000, 584), pal[1]);
        for (let k = 0; k < 10; k++) add(rect(k * 100 + 8, 600, k * 100 + 92, 1000), k % 2 ? pal[4] : pal[1]);
        add(rect(side - 112, 70, side + 112, 410), cream); add(rect(side - 84, 100, side + 84, 250), pal[3]); add(rect(side - 84, 286, side + 84, 372), pal[2], true);
        add(ellR(other, 132, 74, 74, 20), cream);
        add([[other - 8, 132], [other + 8, 132], [other + 6, 74], [other - 6, 74]], pal[4]); add([[other, 124], [other, 140], [other + 48, 146], [other + 48, 130]], pal[4]);
      } else if (ground === 'Harbour window') {
        // a big window onto a harbour: sky, a far shore, the sea, a sailing boat and a lighthouse
        add(rect(0, 0, 1000, 1000), pal[1]);
        add(rect(40, 30, 960, 670), pal[2]);
        add(rect(72, 62, 928, 370), skyC);
        add(rect(72, 370, 928, 640), mixHex(pal[4], '#2f5f8f', 0.45), true);
        add(mirX([[72, 370], [250, 326], [430, 350], [560, 370]]), pal[3]);
        const bx = side;
        add([[bx - 92, 432], [bx + 92, 432], [bx + 62, 474], [bx - 62, 474]], pal[0]);
        add([[bx - 6, 236], [bx - 6, 426], [bx - 86, 426]], cream); add([[bx + 6, 270], [bx + 6, 426], [bx + 66, 426]], '#ddd4c2');
        add(rect(other - 18, 250, other + 18, 372), cream); add(rect(other - 26, 222, other + 26, 252), pal[0]);
        add(rect(20, 640, 980, 690), pal[0]);
      } else if (ground === 'Stage curtain') {
        // a spotlit stage: curtains gathered to both sides under a scalloped pelmet, boards below
        const cc = pal[1], cl = mixHex(pal[1], pal[0], 0.45);
        add(rect(0, 0, 1000, 1000), mixHex(pal[4], '#000000', 0.35));
        add(ellR(500, 470, 340, 400, 28), mixHex(pal[2], pal[4], 0.3));
        add(rect(0, 860, 1000, 1000), pal[3], true);
        for (const sd of [-1, 1]) for (let k = 0; k < 4; k++) {
          const x0 = k * 72, x1 = (k + 1) * 72, b0 = k * 44, b1 = (k + 1) * 44, X = x => sd < 0 ? x : 1000 - x;
          add([[X(x0), 0], [X(x1), 0], [X(b1), 1000], [X(b0), 1000]], k % 2 ? cc : cl, k === 3);
        }
        const pel = [[1000, 0], [0, 0]];
        for (let k = 0; k <= 10; k++) pel.push([k * 100, k % 2 ? 168 : 118]);
        add(pel, cl);
      } else if (ground === 'Awning') {
        // a shopfront: a striped awning with a scalloped edge, a shop window and a door
        add(rect(0, 0, 1000, 1000), pal[5], true);
        add(rect(side - 132, 320, side + 132, 710), pal[1]); add(rect(side - 110, 342, side + 110, 688), skyC); add([[side - 110, 342], [side - 30, 342], [side - 110, 470]], mixHex(skyC, '#ffffff', 0.45));
        add(rect(other - 92, 300, other + 92, 1000), pal[1]); add(rect(other - 62, 340, other + 62, 560), pal[0]); add(ellR(other + S * 60, 640, 14, 14, 10), '#d8b23a');
        for (let k = 0; k < 10; k++) {
          const col = k % 2 ? pal[0] : cream;
          add([[k * 100, 0], [k * 100 + 100, 0], [k * 100 + 120, 230], [k * 100 + 20, 230]], col);
          add([[k * 100 + 20, 228], [k * 100 + 120, 228], [k * 100 + 70, 282]], col);
        }
      } else if (ground === 'Chequer floor') {
        // a chequered floor running back to a wall, with a framed landscape on it
        add(rect(0, 0, 1000, 1000), pal[2]);
        add(rect(side - 124, 80, side + 124, 336), pal[1]); add(rect(side - 98, 106, side + 98, 310), pal[3]);
        add([[side - 98, 250], [side - 12, 176], [side + 98, 256], [side + 98, 310], [side - 98, 310]], pal[0]);
        add(rect(0, 540, 1000, 576), pal[1]);
        const vy = 110, xAt = (xb, y) => 500 + (xb - 500) * (y - vy) / (1000 - vy), rows = [576, 612, 662, 734, 840, 1000];
        for (let r = 0; r + 1 < rows.length; r++) for (let k = 0; k < 12; k++) {
          const xa = -700 + k * 200, xb = xa + 200, y0 = rows[r], y1 = rows[r + 1];
          add([[xAt(xa, y0), y0], [xAt(xb, y0), y0], [xAt(xb, y1), y1], [xAt(xa, y1), y1]], (r + k) % 2 ? pal[4] : cream);
        }
      } else {
        // night: a dark wall, a window with the moon and stars, a curtain tied back
        add(rect(0, 0, 1000, 1000), mixHex(pal[4], '#0d1426', 0.35), true);
        add(rect(side - 152, 56, side + 152, 566), pal[2]);
        add(rect(side - 126, 82, side + 126, 540), '#1a2238');
        add(ellR(side + 40, 190, 54, 54, 20), '#f2e6b8'); add(ellR(side + 66, 170, 46, 46, 20), '#1a2238');
        for (const [sx, sy] of [[-96, 120], [-40, 230], [-90, 420], [70, 360], [20, 470], [96, 300]]) add(rect(side + sx, sy, side + sx + 32, sy + 32), '#f2e6b8');
        add(rect(side - 8, 82, side + 8, 540), pal[2]); add(rect(side - 126, 306, side + 126, 322), pal[2]);
        add([[side + S * 150, 30], [side + S * 236, 30], [side + S * 214, 640], [side + S * 152, 610]], pal[0]);
      }
    }

    // ---------- the head ----------
    const P = (rx, ry) => [hcx + flip * rx * wf, hcy + ry * lf];   // +x is the profile side
    const shapes = {
      Long: [[-145, -255], [125, -268], [180, -85], [168, 95], [58, 252], [-52, 248], [-172, 98], [-188, -115]],
      Square: [[-158, -248], [150, -258], [196, -70], [192, 138], [128, 238], [-118, 242], [-186, 150], [-196, -92]],
      Heart: [[-188, -222], [-20, -266], [176, -230], [204, -56], [122, 150], [14, 262], [-112, 158], [-196, -48]],
      Pear: [[-108, -262], [96, -270], [150, -128], [204, 82], [150, 232], [-142, 236], [-206, 96], [-160, -124]],
      Shield: [[-184, -250], [186, -252], [194, 34], [104, 186], [6, 264], [-98, 190], [-192, 38]],
      'Profile edge': [[-150, -258], [110, -268], [178, -150], [192, -52], [262, 48], [190, 86], [204, 128], [180, 156], [178, 206], [118, 252], [-48, 250], [-176, 96], [-190, -118]],
      Lozenge: [[0, -292], [204, -40], [150, 150], [0, 274], [-160, 150], [-206, -40]],
    };
    let shape = shapes[headShape];
    if (headShape === 'Round') { shape = []; for (let k = 0; k < 11; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 11 + 0.14; shape.push([192 * Math.cos(a), 250 * Math.sin(a)]); } }
    let head = shape.map(p => P(p[0] + QU(-9, 9), p[1] + QU(-9, 9)));
    if (lute) {
      // the instrument's body in place of a head: two bouts and a waist
      const c1 = hcy - 110 * lf, r1 = 165 * wf, c2 = hcy + 135 * lf, r2 = 195 * wf, y0 = c1 - r1, y1 = c2 + r2, rim = [];
      for (let k = 0; k <= 24; k++) {
        const y = y0 + (y1 - y0) * k / 24;
        rim.push([y, Math.max(6, Math.sqrt(Math.max(0, r1 * r1 - (y - c1) ** 2)), Math.sqrt(Math.max(0, r2 * r2 - (y - c2) ** 2)))]);
      }
      head = rim.map(([y, w]) => [hcx + w, y]).concat(rim.slice().reverse().map(([y, w]) => [hcx - w, y]));
    }
    const splitLine = split === 'Stepped'
      ? [[sxTop, hcy - 320], [sxTop, hcy - 10], [sxTop + flip * 50, hcy - 10], [sxTop + flip * 50, hcy + 320]]
      : [[sxTop, hcy - 320], [sxBot, hcy + 320]];
    const halfShape = side => {
      const pts = splitLine.map(p => p.slice());
      pts.push([hcx + side * 900, hcy + 320], [hcx + side * 900, hcy - 320]);
      return pts;
    };
    // x of the head's outer edge on one side, at a given height
    const edgeX = (side, y) => {
      let best = hcx;
      for (let i = 0; i < head.length; i++) {
        const p = head[i], q = head[(i + 1) % head.length];
        if ((p[1] - y) * (q[1] - y) <= 0 && p[1] !== q[1]) {
          const x = p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]);
          if ((x - hcx) * side > (best - hcx) * side) best = x;
        }
      }
      return best;
    };
    const front = -flip;
    const earX = edgeX(front, hcy + 10), earY = hcy + 10;
    const noseTop = [hcx + flip * U(5, 25), eyeY - noseRise];
    const noseTip = [hcx + flip * noseLen * Math.min(1.1, wf), hcy + noseDrop];
    const mx = hcx + flip * 10;

    // ---------- small helpers kept from the painting ----------
    const hv = n => { let h = Math.imul((n ^ inkSeed) | 0, 0x27d4eb2d); h ^= h >>> 15; h = Math.imul(h, 0x165667b1); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
    const ell = (x, y, rx, ry, n, a0) => { const o = []; for (let k = 0; k < n; k++) { const a = (a0 || 0) + k * Math.PI * 2 / n; o.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry]); } return o; };

    // ---------- the pixel kit: a fixed 64-cell grid laid over the 1000-unit drawing ----------
    // Polygons are scan-filled at cell centres into masks; a mask's inner edge is its one-cell
    // outline. Small features are cell sprites. Nothing is antialiased or resampled.
    const N = 64, CW = 1000 / N, NN = N * N;
    const tones = [null], toneAt = new Map(), toneWord = [0];
    const rgbOf = col => col[0] === '#' ? hexRGB(col) : col.match(/\d+/g).slice(0, 3).map(Number);
    const T = col => {
      let k = toneAt.get(col);
      if (k === undefined) {
        const [r, gg, bb] = rgbOf(col);
        k = tones.length; tones.push([r, gg, bb]); toneAt.set(col, k);
        toneWord.push(((255 << 24) | (bb << 16) | (gg << 8) | r) >>> 0);
      }
      return k;
    };
    const toHex = (r, gg, bb) => '#' + [r, gg, bb].map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');
    const blend = (a, b2, f) => { const p = rgbOf(a), q = rgbOf(b2); return toHex(p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f, p[2] + (q[2] - p[2]) * f); };
    const toneHex = k => toHex(...tones[k]);
    const darker = new Map(), seams = new Map();
    const deep = k => { if (!darker.has(k)) darker.set(k, T(blend(toneHex(k), outline, 0.34))); return darker.get(k); };
    const seamOf = k => { if (!seams.has(k)) seams.set(k, T(blend(toneHex(k), outline, 0.55))); return seams.get(k); };
    const OL = T(outline);
    const CAST = ['#4d4741', '#8d867b', '#b9b1a3', '#ddd6c8', '#f6f1e6'].map(T);
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const dith = (i, j, a) => a * 16 > BAYER[(j & 3) * 4 + (i & 3)];

    const pvx = hcx, pvy = hcy + 240;   // the head tilts about the top of the neck
    const tiltXf = p => { const dx = p[0] - pvx, dy = p[1] - pvy, co = Math.cos(tilt), si = Math.sin(tilt); return [pvx + dx * co - dy * si, pvy + dx * si + dy * co]; };
    let xf = p => p;
    const cover = (pts, out) => {
      out.fill(0);
      let y0 = 1e9, y1 = -1e9;
      for (const p of pts) { if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1]; }
      const j0 = Math.max(0, Math.ceil(y0 / CW - 0.5)), j1 = Math.min(N - 1, Math.floor(y1 / CW - 0.5)), xs = [];
      for (let j = j0; j <= j1; j++) {
        const y = (j + 0.5) * CW;
        xs.length = 0;
        for (let a = 0, b = pts.length - 1; a < pts.length; b = a++) {
          const p = pts[a], q = pts[b];
          if ((p[1] <= y) !== (q[1] <= y)) xs.push(p[0] + (y - p[1]) * (q[0] - p[0]) / (q[1] - p[1]));
        }
        xs.sort((m, n) => m - n);
        for (let k = 0; k + 1 < xs.length; k += 2) {
          const i0 = Math.max(0, Math.ceil(xs[k] / CW - 0.5)), i1 = Math.min(N - 1, Math.floor(xs[k + 1] / CW - 0.5));
          for (let i = i0; i <= i1; i++) out[j * N + i] = 1;
        }
      }
      return out;
    };
    const mask = pts => cover(pts.map(xf), new Uint8Array(NN));
    const put = (L, m, k, only) => { for (let n = 0; n < NN; n++) if (m[n] && (!only || only[n])) L[n] = k; };
    // the canvas edge counts as inside, so shapes running off the picture get no outline there
    const open4 = (m, n) => { const i = n % N; return (i > 0 && !m[n - 1]) || (i < N - 1 && !m[n + 1]) || (n >= N && !m[n - N]) || (n < NN - N && !m[n + N]); };
    const rimIn = (L, m, k, only) => { for (let n = 0; n < NN; n++) if (m[n] && (!only || only[n]) && open4(m, n)) L[n] = k; };
    const rimOut = (L, m, k) => {
      for (let n = 0; n < NN; n++) if (!m[n]) { const i = n % N; if ((i > 0 && m[n - 1]) || (i < N - 1 && m[n + 1]) || (n >= N && m[n - N]) || (n < NN - N && m[n + N])) L[n] = k; }
    };
    const framed = (L, pts, col, only) => { const m = mask(pts); put(L, m, T(col), only); rimIn(L, m, OL, only); return m; };
    const solid = (L, pts, col, only) => { const m = mask(pts); put(L, m, T(col), only); return m; };
    // small shapes keep their fill and take the outline just outside it
    const chip = (L, pts, col) => { const m = mask(pts); rimOut(L, m, OL); put(L, m, T(col)); return m; };
    const cellOf = p => { const q = xf(p); return [Math.floor(q[0] / CW), Math.floor(q[1] / CW)]; };
    const plot = (L, i, j, k) => { if (i >= 0 && j >= 0 && i < N && j < N) L[j * N + i] = k; };
    const seg = (L, a, b, k, only) => {
      let [i0, j0] = cellOf(a);
      const [i1, j1] = cellOf(b), di = Math.abs(i1 - i0), dj = -Math.abs(j1 - j0), si = i0 < i1 ? 1 : -1, sj = j0 < j1 ? 1 : -1;
      let e = di + dj;
      for (let s = 0; s < 4 * N; s++) {
        if (!only || (i0 >= 0 && j0 >= 0 && i0 < N && j0 < N && only[j0 * N + i0])) plot(L, i0, j0, k);
        if (i0 === i1 && j0 === j1) break;
        const e2 = 2 * e;
        if (e2 >= dj) { e += dj; i0 += si; }
        if (e2 <= di) { e += di; j0 += sj; }
      }
    };
    const trail = (L, pts, k, only) => { for (let n = 0; n + 1 < pts.length; n++) seg(L, pts[n], pts[n + 1], k, only); };
    const dot = (L, p, k) => { const [i, j] = cellOf(p); plot(L, i, j, k); };
    const sprite = (L, at, rows, map, mirrorX) => {
      const q = xf(at), h = rows.length, w = rows[0].length, li = Math.round(q[0] / CW - w / 2), tj = Math.round(q[1] / CW - h / 2);
      for (let r = 0; r < h; r++) for (let s = 0; s < w; s++) { const k = map[rows[r][mirrorX ? w - 1 - s : s]]; if (k) plot(L, li + s, tj + r, k); }
      return [li, tj];
    };
    const ringCells = (L, at, r, k) => {   // a one-cell circle (midpoint)
      const q = xf(at), ci = Math.floor(q[0] / CW), cj = Math.floor(q[1] / CW), R = Math.max(1, Math.round(r / CW));
      let a = R, b = 0, e = 1 - R;
      while (a >= b) {
        for (const [di, dj] of [[a, b], [b, a], [-b, a], [-a, b], [-a, -b], [-b, -a], [b, -a], [a, -b]]) plot(L, ci + di, cj + dj, k);
        b++;
        if (e < 0) e += 2 * b + 1; else { a--; e += 2 * (b - a) + 1; }
      }
    };
    const inside = m => { const o = new Uint8Array(NN); for (let n = 0; n < NN; n++) o[n] = m[n] && !open4(m, n) ? 1 : 0; return o; };
    const pattern = (L, m, k, test) => { for (let n = 0; n < NN; n++) if (m[n]) { const i = n % N; if (test(i, (n - i) / N)) L[n] = k; } };

    // ---------- background: planes, hatching, and a coloured seam where two planes meet ----------
    const backL = new Uint8Array(NN), sitL = new Uint8Array(NN), liveL = new Uint8Array(NN), shown = new Uint8Array(NN);
    const pid = new Int16Array(NN).fill(0), scratch = new Uint8Array(NN);
    planes.forEach((p, n) => { cover(p, scratch); for (let k = 0; k < NN; k++) if (scratch[k]) pid[k] = n; });
    const planeNow = planeCols.slice();
    const hatchSkew = Math.floor(hv(31) * 4);
    const moonAt = [1000 - propAt[0], 150];
    const moonM = prop === 'Moon' ? cover(ell(moonAt[0], moonAt[1], 74, 74, 24), new Uint8Array(NN)) : null;
    const moonS = prop === 'Moon' ? cover(ell(moonAt[0] + 34, moonAt[1] - 16, 64, 64, 24), new Uint8Array(NN)) : null;
    // the instrument's backdrop is a papier colle: scraps of newspaper and sheet music, faux-bois paper, a black
    // plane and charcoal lines on ochre paper; a tap on it stains the little diamond in the palette's colours
    let collTint = pal[0], musTop = 0, musX = [0, 0];
    const musM = new Uint8Array(NN);
    const collage = () => {
      const S = flip, base = T('#b9a27a'), smudge = T('#a99068'), CH = T('#2a2420');
      for (let k = 0; k < NN; k++) { const i = k % N, j = (k - i) / N; backL[k] = dith(i, j, 0.5 + 0.5 * Math.sin(i * 0.3 + j * 0.17)) && hv(k) < 0.25 ? smudge : base; }
      const paper = (pts, col, fn) => { const m = cover(pts, new Uint8Array(NN)), kc = T(col); for (let k = 0; k < NN; k++) if (m[k]) { const i = k % N, j = (k - i) / N; backL[k] = fn ? fn(i, j, kc) : kc; } for (let k = 0; k < NN; k++) if (m[k] && open4(m, k)) backL[k] = deep(kc); return m; };
      const GRAIN = T('#6e4220');
      paper([[hcx + S * 130, 600], [hcx + S * 520, 560], [hcx + S * 540, 1000], [hcx + S * 150, 1000]], '#9a6232', (i, j, kc) => (j + Math.round(Math.sin(i * 0.5) * 1.2)) % 3 === 0 ? GRAIN : kc);
      const HATCH = T('#4a3c30');
      paper([[hcx + S * 70, 40], [hcx + S * 430, -10], [hcx + S * 480, 560], [hcx + S * 120, 610]], '#2a221c', (i, j, kc) => (i + j) % 3 === 0 ? HATCH : kc);
      const INKG = T('#8a8070'), news = cover([[hcx - S * 480, 70], [hcx - S * 150, 40], [hcx - S * 130, 410], [hcx - S * 460, 440]], new Uint8Array(NN));
      let top = N; for (let k = 0; k < NN; k++) if (news[k]) top = Math.min(top, (k - k % N) / N);
      paper([[hcx - S * 480, 70], [hcx - S * 150, 40], [hcx - S * 130, 410], [hcx - S * 460, 440]], '#e6ddc4', (i, j, kc) => j < top + 7 ? CH : j % 2 === 1 && hv(i * 3 + j * 101) < 0.82 ? INKG : kc);
      // the masthead: JOU, cut off where the scrap was torn
      const GLY = { J: ['111', '001', '001', '101', '111'], O: ['111', '101', '101', '101', '111'], U: ['101', '101', '101', '101', '111'] }, CREAM = T('#e6ddc4');
      let lx = Math.round(((S > 0 ? hcx - S * 470 : hcx - S * 160) + 40) / CW);
      for (const ch of 'JOU') { for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (GLY[ch][r][q] === '1') { const k = (top + 1 + r) * N + lx + q; if (news[k]) backL[k] = CREAM; } lx += 4; }
      const STAFF = T('#6a6258'), NOTE = T('#1e1a16'), mus = [[hcx - S * 490, 480], [hcx - S * 170, 450], [hcx - S * 150, 720], [hcx - S * 470, 740]];
      let mtop = N; { const m = cover(mus, new Uint8Array(NN)); for (let k = 0; k < NN; k++) if (m[k]) { mtop = Math.min(mtop, (k - k % N) / N); musM[k] = 1; } }
      musTop = mtop; { let a = N, b = 0; for (let k = 0; k < NN; k++) if (musM[k] && (k - k % N) / N >= mtop + 3 && (k - k % N) / N <= mtop + 11) { a = Math.min(a, k % N); b = Math.max(b, k % N); } musX = [a, b]; }
      paper(mus, '#efe6cf', (i, j, kc) => { const r = j - mtop - 3; if (r >= 0 && r <= 8 && r % 2 === 0) return STAFF; const h = hv(i * 13 + 7); if (r >= 0 && r <= 8 && i % 4 === 1 && h < 0.55 && (r === Math.floor(h * 16) % 8)) return NOTE; return kc; });
      paper([[hcx - S * 300, 770], [hcx - S * 190, 700], [hcx - S * 80, 790], [hcx - S * 190, 870]], collTint);
      // charcoal: two long strokes across the whole sheet and a ring echoing the sound hole
      seg(backL, [hcx - S * 520, 930], [hcx + S * 520, 240], CH); seg(backL, [hcx + S * 300, 0], [hcx + S * 330, 1000], CH);
      ringCells(backL, [hcx + S * 320, 760], 120, CH);
    };
    const buildBack = () => {
      if (lute) { collage(); return; }
      for (let k = 0; k < NN; k++) {
        const n = pid[k], col = T(planeNow[n]), i = k % N, j = (k - i) / N;
        const nr = i < N - 1 ? pid[k + 1] : n, nd = j < N - 1 ? pid[k + N] : n;
        backL[k] = nr !== n || nd !== n ? seamOf(col) : col;
      }
      // tidy: a lone cell held by four neighbours of one colour takes their colour; then the hatching
      for (let k = N; k < NN - N; k++) { const i = k % N; if (i === 0 || i === N - 1) continue; const a = backL[k - 1]; if (a !== backL[k] && a === backL[k + 1] && a === backL[k - N] && a === backL[k + N]) backL[k] = a; }
      for (let k = 0; k < NN; k++) { const n = pid[k], i = k % N, j = (k - i) / N, col = T(planeNow[n]); if (planeHatch[n] && backL[k] === col && (i + j + hatchSkew) % 4 === 0) backL[k] = deep(col); }
      if (moonM) { put(backL, moonM, T('#f2e6b8')); put(backL, moonS, T('#dac98f'), moonM); rimIn(backL, moonM, OL); }
    };
    buildBack();

    // ---------- the sitter (drawn once) ----------
    const sw = QU(0.86, 1.06), shY = QU(720, 770);
    const body = [[500 - 470 * sw, 1030], [500 - 380 * sw, shY + 80], [500 - 190 * sw, shY], [hcx - neckW, hcy + 290], [hcx + neckW, hcy + 290], [500 + 190 * sw, shY], [500 + 380 * sw, shY + 80], [500 + 470 * sw, 1030]];
    const gcol = pal[(pal.indexOf(planeCols[0]) + 1 + 6) % 6] === pal[4] ? pal[1] : pal[4];
    const gcol2 = palName === 'Harlequin' ? '#f0c419' : pal[2];
    const neckQ = [[hcx - neckW, hcy + 140], [hcx + neckW, hcy + 140], [hcx + neckW + 10, hcy + 380], [hcx - neckW - 10, hcy + 380]];
    const crease = blend(skin[2], outline, 0.5);
    {
      const nm = mask(neckQ);
      put(sitL, nm, T(skin[2]));
      solid(sitL, [[hcx + front * neckW * 0.2, hcy + 140], [hcx + front * (neckW + 20), hcy + 140], [hcx + front * (neckW + 20), hcy + 380]], skin[1], nm);
      rimIn(sitL, nm, OL);
      if (age === 'Elder') for (const dx of [-0.35, 0.3]) trail(sitL, [[hcx + dx * neckW, hcy + 255], [hcx + dx * neckW * 1.2, hcy + 310], [hcx + dx * neckW, hcy + 355]], T(crease), nm);
    }

    // garment, cell-aligned patterns
    const bm = mask(body), G1 = T(gcol), G2 = T(gcol2);
    put(sitL, bm, G1);
    const by0 = Math.floor(700 / CW);
    if (garment === 'Stripes') pattern(sitL, bm, G2, (i, j) => j >= by0 && (j - by0) % 3 === 0);
    else if (garment === 'Checks') pattern(sitL, bm, G2, (i, j) => (Math.floor(i / 5) + Math.floor(j / 5)) % 2 === 1);
    else if (garment === 'Diamonds') {
      const dcols = [T(pal[0]), T(pal[2]), T(pal[5])];
      pattern(sitL, bm, OL, () => true);
      pattern(sitL, bm, 0, (i, j) => { const a = i + j, b = i - j + 600; return a % 6 !== 0 && b % 6 !== 0; });
      for (let n = 0; n < NN; n++) if (bm[n] && sitL[n] === 0) { const i = n % N, j = (n - i) / N; sitL[n] = dcols[((Math.floor((i + j) / 6) + Math.floor((i - j + 600) / 6)) % 3 + 3) % 3]; }
    }
    else if (garment === 'Dots') { const o = Math.round(dotsOff / CW); pattern(sitL, bm, G2, (i, j) => { const row = Math.floor((j - by0) / 5), ii = i + o + (row % 2) * 3; return j >= by0 && (j - by0) % 5 < 2 && ii % 6 < 2; }); }
    else if (garment === 'Panels') {
      const kx = hcx + flip * QU(60, 160), ex = flip > 0 ? 1050 : -50;
      framed(sitL, [[kx, 680], [ex, 760], [ex, 1040], [kx + flip * 60, 1040]], pal[0], bm);
      framed(sitL, [[ex - flip * 1100, QU(860, 920)], [hcx - flip * 120, 840], [hcx - flip * 40, 1040], [ex - flip * 1100, 1040]], gcol2, bm);
    } else if (garment === 'Chevrons') {
      for (let k = 0; k < 6; k++) { const yy = 700 + k * 64; trail(sitL, [[0, yy], [hcx, yy + 90], [1000, yy]], G2, bm); trail(sitL, [[0, yy + CW], [hcx, yy + 90 + CW], [1000, yy + CW]], G2, bm); }
    } else if (garment === 'Wide bands') {
      for (let k = 0; k < 6; k++) if (k % 2) { const i0 = Math.round((k * 170 + 40) / CW), i1 = Math.round((k * 170 + 210) / CW), kk = k === 3 ? T(pal[0]) : G2; pattern(sitL, bm, kk, i => i >= i0 && i < i1); }
    } else if (garment === 'Tartan') {
      const band = T(blend(gcol, gcol2, 0.55)), cross = T(blend(gcol, gcol2, 0.85)), thin = T(pal[0]);
      pattern(sitL, bm, band, (i, j) => i % 9 < 3 || (j - by0) % 8 < 3);
      pattern(sitL, bm, cross, (i, j) => i % 9 < 3 && (j - by0) % 8 < 3);
      pattern(sitL, bm, thin, (i, j) => i % 9 === 6 || (j - by0) % 8 === 5);
    }
    // one shadow plane across the body, on the profile side: every ink steps down one shade there
    { const sm = mask([[hcx + flip * 10, 690], [hcx + flip * 600, 690], [hcx + flip * 600, 1040], [hcx + flip * 120, 1040]]); for (let n = 0; n < NN; n++) if (bm[n] && sm[n] && sitL[n] !== OL) sitL[n] = deep(sitL[n]); }
    rimIn(sitL, bm, OL);

    // collar
    const cy0 = hcy + 290, cream = '#f2ece0';
    if (collar === 'V-neck') framed(sitL, [[hcx - neckW - 6, cy0], [hcx + flip * 8, cy0 + 120], [hcx + neckW + 6, cy0]], skin[2]);
    else if (collar === 'Crew') framed(sitL, [[hcx - neckW - 14, cy0 - 4], [hcx + neckW + 14, cy0 - 4], [hcx + neckW + 24, cy0 + 26], [hcx, cy0 + 44], [hcx - neckW - 24, cy0 + 26]], gcol2);
    else if (collar === 'Turtleneck') {
      const tm = framed(sitL, [[hcx - neckW - 12, cy0 - 120], [hcx + neckW + 12, cy0 - 120], [hcx + neckW + 26, cy0 + 30], [hcx - neckW - 26, cy0 + 30]], gcol2);
      pattern(sitL, inside(tm), deep(G2), (i, j) => j % 2 === 0);
    } else if (collar === 'Lapels' || collar === 'Bow tie') {
      framed(sitL, [[hcx - neckW - 6, cy0], [hcx, cy0 + 150], [hcx + neckW + 6, cy0]], cream);
      if (collar === 'Lapels') for (const s of [-1, 1]) framed(sitL, [[hcx + s * (neckW + 8), cy0 - 6], [hcx + s * (neckW + 70), cy0 + 60], [hcx + s * 40, cy0 + 120], [hcx + s * 6, cy0 + 170]], toneHex(deep(G1)));
      else {
        const bc = pal[0] === gcol ? pal[3] : pal[0];
        sprite(sitL, [hcx, cy0 + 34], ['oo...oo', 'obbobbo', 'obbobbo', 'oo...oo'], { o: OL, b: T(bc) });
      }
    } else if ('Sailor' === collar) {
      const sm = framed(sitL, [[hcx - neckW - 10, cy0], [hcx - neckW - 120, cy0 + 40], [hcx - neckW - 90, cy0 + 150], [hcx, cy0 + 170], [hcx + neckW + 90, cy0 + 150], [hcx + neckW + 120, cy0 + 40], [hcx + neckW + 10, cy0], [hcx, cy0 + 120]], cream);
      trail(sitL, [[hcx - neckW - 92, cy0 + 50], [hcx - neckW - 70, cy0 + 130], [hcx, cy0 + 146], [hcx + neckW + 70, cy0 + 130], [hcx + neckW + 92, cy0 + 50]], T(pal[1]), inside(sm));
      framed(sitL, [[hcx, cy0 + 130], [hcx - 44, cy0 + 214], [hcx + 38, cy0 + 218]], pal[0]);
    } else if (collar === 'Ruff') {
      const rp = [];
      for (let k = 0; k < 26; k++) { const a = k / 26 * Math.PI * 2, r = k % 2 ? 150 : 104; rp.push([hcx + Math.cos(a) * r * 1.15, cy0 + 4 + Math.sin(a) * r * 0.42]); }
      const rm = framed(sitL, rp, '#f4efe2');
      for (let k = 0; k < 26; k += 2) { const a = k / 26 * Math.PI * 2; seg(sitL, [hcx + Math.cos(a) * 70, cy0 + 4 + Math.sin(a) * 28], [hcx + Math.cos(a) * 150, cy0 + 4 + Math.sin(a) * 58], T('#cfc6b0'), inside(rm)); }
    }

    // ---------- the head, tilted about the top of the neck ----------
    xf = tiltXf;
    const HC = T(hairCol), shine = T(blend(hairCol, '#fff0dc', 0.3));
    const crown = lift => {
      const pts = head.filter(p => p[1] < hcy - 30 * lf).map(p => {
        const dx = p[0] - hcx, dy = p[1] - hcy, L = Math.hypot(dx, dy);
        return [p[0] + dx / L * lift, p[1] + dy / L * lift, Math.atan2(dy, dx)];
      });
      pts.sort((p, q) => p[2] - q[2]);
      return pts.map(p => [p[0], p[1]]);
    };
    const hairPoly = (lift, line) => crown(lift).concat(line.map(p => P(p[0], p[1])).sort((p, q) => q[0] - p[0]));
    if (!lute) {
      if (hair === 'Bun') framed(sitL, ell(hcx - flip * 40, hcy - 290 * lf, 82, 78, 14, 0.2), hairCol);
      if (hair === 'Wave') framed(sitL, [P(-200, -200), P(-262, 40), P(-212, 262), P(-120, 330), P(-120, -100)], hairCol);
      if (hair === 'Braid') {
        const bx = earX + front * 6;
        for (let k = 0; k < 6; k++) { const y = hcy + 40 + k * 56, x0 = bx + front * (k * 6); framed(sitL, [[x0, y - 38], [x0 + 32, y], [x0, y + 38], [x0 - 32, y]], hairCol); }
        chip(sitL, ell(bx + front * 36, hcy + 384, 18, 18, 10), pal[0]);
      }
      // the ear, on the front side
      if (hair !== 'Wrap' && hair !== 'Wave') {
        framed(sitL, [[earX - front * 16, earY - 58], [earX + front * 34, earY - 66], [earX + front * 46, earY - 20], [earX + front * 30, earY + 42], [earX + front * 4, earY + 58], [earX - front * 16, earY + 40]], skin[1]);
        trail(sitL, [[earX + front * 12, earY - 34], [earX + front * 26, earY - 20], [earX + front * 20, earY + 14]], T(crease));
      }
    }

    // ---------- the face ----------
    const skinMid = blend(skin[1], skin[2], 0.5), S1 = T(skin[1]), S2 = T(skin[2]);
    const H = mask(head);
    put(sitL, H, S1);
    if (lute) {
      // the instrument: a wooden body in two woods, split down the face like any sitter
      solid(sitL, halfShape(flip), '#a8662e', H); solid(sitL, halfShape(front), '#d9a05a', H);
      pattern(sitL, H, T('#c08a48'), (i, j) => j % 4 === 1 && (i + j) % 7 > 2 && (i * CW - hcx) * front > 0);
    } else {
      solid(sitL, halfShape(flip), skin[2], H);
      if (split === 'Cross') solid(sitL, [[sxTop, hcy + 70], [hcx + front * 400, hcy + 40], [hcx + front * 400, hcy + 400], [sxTop, hcy + 400]], skinMid, H);
    }
    // the light falls in planes: a forehead plane on the front side, and a cheek plane of colour
    if (!lute) solid(sitL, [P(-160, -230), P(-30, -250), P(-60, -120), P(-190, -100)], blend(skin[1], '#fff5e1', 0.2), H);
    const blush = age === 'Young' ? 0.45 : age === 'Elder' ? 0.2 : 0.33;
    const cheekKind = Math.floor(QU(0, 3)), chx = eyeA[0] + front * 10, chy = eyeY + 100;
    const blushC = blend(skin[1], '#c8463c', blush + 0.12);
    if (!lute) {
      if (cheekKind === 0) solid(sitL, [[chx - 50, chy - 30], [chx + 40, chy - 40], [chx - 5, chy + 50]], blushC, H);
      else if (cheekKind === 1) solid(sitL, ell(chx, chy, 42, 42, 16), blushC, H);
      else solid(sitL, [[chx, chy - 52], [chx + 36, chy], [chx, chy + 52], [chx - 36, chy]], blushC, H);
    }
    // age, as creases a cell wide
    const CR = T(crease);
    if (!lute && (age === 'Weathered' || age === 'Elder')) {
      const n = age === 'Elder' ? 3 : 2;
      for (let k = 0; k < n; k++) trail(sitL, [P(-120 + k * 12, -176 + k * 30), P(-60, -190 + k * 30), P(0, -182 + k * 30)], CR, H);
      trail(sitL, [[eyeA[0] + front * 64, eyeA[1] + 2], [eyeA[0] + front * 88, eyeA[1] + 20]], CR, H);
    }
    if (!lute && age === 'Elder') {
      trail(sitL, [[noseTip[0] - flip * 50, noseTip[1] + 22], [mx - flip * (mouthW + 12), mouthY - 4], [mx - flip * (mouthW + 6), mouthY + 46]], CR, H);
      seg(sitL, [eyeA[0] - 30, eyeA[1] + 46], [eyeA[0] + 30, eyeA[1] + 46], CR, H);
      seg(sitL, [eyeB[0] - 26, eyeB[1] + 44], [eyeB[0] + 26, eyeB[1] + 44], CR, H);
    }
    // stubble as a dither on the jaw
    if (!lute && beard === 'Stubble') {
      const st = T(blend(skin[2], hairCol, 0.55)), jm = mask([[hcx - 260, hcy + 90], [hcx + 260, hcy + 90], [hcx + 260, hcy + 320], [hcx - 260, hcy + 320]]);
      const mi0 = Math.floor((mx - mouthW - 10) / CW), mi1 = Math.floor((mx + mouthW + 10) / CW), mj = Math.floor(mouthY / CW);
      for (let n = 0; n < NN; n++) if (H[n] && jm[n]) { const i = n % N, j = (n - i) / N; if (!(i >= mi0 && i <= mi1 && Math.abs(j - mj) <= 1) && dith(i, j, 0.38)) sitL[n] = st; }
    }
    if (!lute && beard === 'Goatee') solid(sitL, [[mx - 34, mouthY + 34], [mx + 34, mouthY + 34], [mx + flip * 16, mouthY + 116], [mx - flip * 10, mouthY + 108]], hairCol, H);
    rimIn(sitL, H, OL);
    // the split line, a cell wide, only on the face
    const splitCut = splitLine.map(p => [p[0], Math.max(hcy - 270 * lf, Math.min(p[1], hcy + 270 * lf))]);
    trail(sitL, splitCut, OL, H);
    if (split === 'Cross' && !lute) seg(sitL, [sxTop, hcy + 70], [edgeX(front, hcy + 48), hcy + 44], OL, H);
    if (!lute && beard === 'Full beard') {
      const jaw = head.filter(p => p[1] > hcy + 30 * lf).map(p => {
        const dx = p[0] - hcx, dy = p[1] - hcy, L = Math.hypot(dx, dy), push = 14 + 30 * Math.max(0, dy / L);
        return [p[0] + dx / L * push, p[1] + dy / L * push, Math.atan2(dy, dx)];
      }).sort((p, q) => p[2] - q[2]).map(p => [p[0], p[1]]);
      const inner = [[edgeX(-1, hcy + 40) - 10, hcy + 30 * lf], [hcx - 120 * wf, hcy + 70 * lf], [mx - mouthW - 26, mouthY - 34], [mx + mouthW + 26, mouthY - 34], [hcx + 120 * wf, hcy + 70 * lf], [edgeX(1, hcy + 40) + 10, hcy + 30 * lf]];
      const bd = framed(sitL, jaw.concat(inner), hairCol);
      pattern(sitL, inside(bd), shine, (i, j) => (i + Math.floor(j / 5)) % 3 === 0 && j % 5 < 3);
    }

    // the nose: a profile on a front face
    const nb = [hcx + flip * U(0, 10), noseTip[1] + 20];
    {
      if (nose === 'Wedge') framed(sitL, [noseTop, noseTip, nb], skin[1]);
      else if (nose === 'Hook') framed(sitL, [noseTop, [noseTop[0] + flip * 70, noseTop[1] + 40], [noseTip[0] + flip * 22, noseTip[1] - 30], noseTip, [noseTip[0] - flip * 20, noseTip[1] + 16], nb], skin[1]);
      else if (nose === 'Snub') framed(sitL, [noseTop, [noseTip[0] - flip * 22, noseTip[1] - 26], [noseTip[0] + flip * 6, noseTip[1] - 4], [noseTip[0] - flip * 18, noseTip[1] + 14], nb], skin[1]);
      else if (nose === 'Broad') framed(sitL, [noseTop, [noseTip[0] - flip * 10, noseTip[1] - 30], [noseTip[0] + flip * 14, noseTip[1] + 6], [noseTip[0] - flip * 10, noseTip[1] + 24], [nb[0] - flip * 52, nb[1] + 4], [nb[0] - flip * 40, nb[1] - 30]], skin[1]);
      else if (nose === 'Roman') framed(sitL, [noseTop, [noseTop[0] + flip * 52, noseTop[1] + 54], [noseTop[0] + flip * 46, noseTop[1] + 84], noseTip, nb], skin[1]);
      if (nose !== 'In the outline') { dot(sitL, [noseTip[0] - flip * 30, noseTip[1] + 2], OL); if (nose === 'Broad') dot(sitL, [nb[0] - flip * 30, nb[1] - 8], OL); }
      else { const nt = head[4]; dot(sitL, [nt[0] - flip * 44, nt[1] + 10], OL); }
    }

    // ---------- hair and hats on top ----------
    const streaks = (m, kind) => {
      const im = inside(m);
      if (kind === 'comb') pattern(sitL, im, shine, (i, j) => (((i - Math.floor(j / 3) * flip) % 4) + 4) % 4 === 0);
      if (kind === 'blocks') pattern(sitL, im, shine, (i, j) => j % 3 === 0 && (i + j) % 5 !== 0);
      if (kind === 'wave') pattern(sitL, im, shine, (i, j) => (j + (i % 6 < 3 ? 0 : 1)) % 3 === 0);
      if (kind === 'fringe') pattern(sitL, im, shine, (i, j) => i % 3 === 0 && j % 4 !== 3);
    };
    let hp = null;
    if (!lute) {
      if (hair === 'Comb') { hp = framed(sitL, hairPoly(28, [[-206, -70], [40 + hairExtra[2], -172], [206, -78]]), hairCol); streaks(hp, 'comb'); }
      else if (hair === 'Blocks') { hp = framed(sitL, hairPoly(58, [[218, -20], [218, -120], [70, -150], [-40, -196], [-220, -140], [-220, -20]]), hairCol); streaks(hp, 'blocks'); }
      else if (hair === 'Wave' || hair === 'Bun') { hp = framed(sitL, hairPoly(26, [[-204, -70], [0, -178], [204, -108]]), hairCol); streaks(hp, 'wave'); }
      else if (hair === 'Crop' || hair === 'Topknot' || hair === 'Laurel' || hair === 'Braid') { hp = framed(sitL, hairPoly(14, [[-196, -100], [-60, -190], [50, -204], [196, -118]]), hairCol); streaks(hp, hair === 'Crop' ? 'fringe' : 'wave'); }
      else if (hair === 'Fringe') { const zz = []; for (let k = 0; k <= 10; k++) zz.push([-214 + k * 42.8, -118 + (k % 2) * 34]); hp = framed(sitL, hairPoly(26, zz), hairCol); streaks(hp, 'fringe'); }
      else if (hair === 'Pompadour') {
        hp = framed(sitL, hairPoly(20, [[-204, -84], [10, -188], [204, -96]]), hairCol);
        const pf = framed(sitL, [P(-176, -230), P(-120, -340), P(10, -390), P(150, -350), P(206, -250), P(120, -260), P(-40, -262)], hairCol);
        streaks(pf, 'wave');
      } else if ('Curls' === hair) {
        hp = mask(hairPoly(18, [[-200, -110], [0, -200], [200, -110]])); put(sitL, hp, HC);
        const cr = crown(22), lumps = [];
        for (let k = 0; k < cr.length - 1; k++) for (let s = 0; s < 3; s++) { const p = cr[k], q = cr[k + 1], f2 = s / 3; lumps.push([p[0] + (q[0] - p[0]) * f2, p[1] + (q[1] - p[1]) * f2, 42]); }
        for (let k = 0; k < 5; k++) { const p = P(-160 + k * 80, -190 + Math.abs(k - 2) * 18); lumps.push([p[0], p[1], 36]); }
        for (const [x0, y0, r] of lumps) { const m = framed(sitL, ell(x0, y0, r, r, 12, 0.2), hairCol); dot(sitL, [x0 - r * 0.35, y0 - r * 0.35], shine); hp = hp.map((v, n) => v | m[n]); }
      } else if (hair === 'Bald' && age !== 'Young') {
        for (const s of [-1, 1]) framed(sitL, [P(s * 196, -120), P(s * 220, -40), P(s * 196, 16), P(s * 176, -70)], hairCol);
        seg(sitL, P(-110, -214), P(-40, -228), T(blend(skin[1], '#fffbef', 0.45)));
      }
      if (hair === 'Topknot') {
        const tk = P(-10, -318);
        const km = framed(sitL, ell(tk[0], tk[1], 56, 48, 14, 0.3), hairCol); dot(sitL, [tk[0] - 18, tk[1] - 14], shine);
        hp = hp ? hp.map((v, n) => v | km[n]) : km;
        framed(sitL, [P(-44, -284), P(38, -288), P(34, -254), P(-40, -250)], pal[0]);
      }
      if (hair === 'Laurel') {
        // a gilt wreath: leaves in three golds, outlined together as one piece
        const lm = new Uint8Array(NN), golds = [T('#e8c45a'), T('#d8b23a'), T('#b8902c')];
        for (const side of [-1, 1]) for (let k = 0; k < 9; k++) {
          const a = -Math.PI / 2 + side * (0.25 + k * 0.17), p = [hcx + Math.cos(a) * 214 * wf, hcy - 60 * lf + Math.sin(a) * 210 * lf];
          for (const sgn of [-1, 1]) {
            const la = a + side * Math.PI / 2 + sgn * 0.75 - side * 0.4, L = 78 - k * 3;
            const tip = [p[0] + Math.cos(la) * L, p[1] + Math.sin(la) * L], mid = [(p[0] + tip[0]) / 2, (p[1] + tip[1]) / 2], sd = [Math.cos(la + 1.57) * 20, Math.sin(la + 1.57) * 20];
            const m = mask([p, [mid[0] + sd[0], mid[1] + sd[1]], tip, [mid[0] - sd[0], mid[1] - sd[1]]]);
            put(sitL, m, golds[(k + sgn + 3) % 3]); for (let n = 0; n < NN; n++) lm[n] |= m[n];
          }
        }
        rimOut(sitL, lm, OL);
      }
      // hats
      const hatCol = palName === 'Ink and Paper' ? '#1d1b19' : pal[1];
      if (hair === 'Brim hat') {
        framed(sitL, [[hcx - 150, hcy - 210], [hcx - 120, hcy - 380], [hcx + 140, hcy - 390], [hcx + 160, hcy - 220]], hatCol);
        framed(sitL, [[hcx - 135, hcy - 262], [hcx + 145, hcy - 272], [hcx + 150, hcy - 226], [hcx - 140, hcy - 216]], pal[2]);
        framed(sitL, [[hcx - 290, hcy - 196], [hcx + 300, hcy - 221], [hcx + 290, hcy - 168], [hcx - 280, hcy - 148]], pal[4] === hatCol ? pal[0] : pal[4]);
      } else if (hair === 'Beret') {
        framed(sitL, hairPoly(10, [[-196, -110], [0, -170], [196, -120]]), hairCol);
        const berCol = palName === 'Rose' ? '#5a4a6a' : palName === 'Harlequin' ? '#d63c3c' : '#2a2a30';
        const bm2 = framed(sitL, [P(-230, -190), P(-150, -300), P(40, -340), P(220, -300), P(250, -230), P(150, -186), P(-80, -168)], berCol);
        solid(sitL, [P(-60, -400), P(260, -400), P(260, -150), P(80, -180)], blend(berCol, '#ffffff', 0.12), inside(bm2));
        chip(sitL, [P(30, -336), P(40, -380), P(66, -376), P(60, -334)], berCol);
      } else if (hair === 'Bowler') {
        const bc = palName === 'Ink and Paper' ? '#1d1b19' : '#2c241e';
        const cm = framed(sitL, [P(-170, -200), P(-150, -330), P(-60, -400), P(70, -400), P(160, -330), P(176, -206)], bc);
        framed(sitL, [P(-176, -236), P(176, -242), P(178, -204), P(-174, -198)], pal[0]);
        framed(sitL, [P(-250, -200), P(250, -210), P(236, -160), P(-236, -152)], bc);
        seg(sitL, P(-96, -366), P(-126, -290), T(blend(bc, '#ffffff', 0.25)), inside(cm));
      } else if (hair === 'Flat cap') {
        framed(sitL, hairPoly(8, [[-196, -100], [0, -150], [196, -110]]), hairCol);
        const fm = framed(sitL, [P(-214, -170), P(-150, -300), P(80, -320), P(210, -250), P(330, -210), P(310, -176), P(190, -174)], pal[3] === pal[2] ? pal[0] : pal[3]);
        pattern(sitL, inside(fm), deep(T(pal[3] === pal[2] ? pal[0] : pal[3])), (i, j) => j % 2 === 0);
        seg(sitL, P(196, -250), P(186, -176), OL);
      } else if (hair === 'Wrap') {
        const wm = framed(sitL, hairPoly(50, [[-224, 40], [-214, -60], [-80, -150], [60, -170], [214, -80], [224, 20]]), pal[0]);
        pattern(sitL, inside(wm), T(pal[3] === pal[0] ? pal[2] : pal[3]), (i, j) => (i - j + 64) % 5 < 2);
        hp = wm;
        const kn = P(-60, -300);
        framed(sitL, [[kn[0], kn[1]], [kn[0] - 84, kn[1] - 64], [kn[0] - 74, kn[1] + 34]], pal[0]);
        framed(sitL, [[kn[0], kn[1]], [kn[0] + 74, kn[1] - 78], [kn[0] + 86, kn[1] + 12]], pal[0]);
      }
      // jewellery, hanging from the front ear
      const lobe = [earX + front * 18, earY + 62], gold = T('#d8b23a');
      if (jewel === 'Hoop') sprite(sitL, [lobe[0], lobe[1] + 34], ['.ooo.', 'ogggo', 'og.go', 'ogggo', '.ooo.'], { o: OL, g: gold });
      else if (jewel === 'Pearl') sprite(sitL, [lobe[0], lobe[1] + 16], ['.oo.', 'ohpo', 'oppo', '.oo.'], { o: OL, h: T('#ffffff'), p: T('#efe9dc') });
      else if (jewel === 'Drop') sprite(sitL, [lobe[0], lobe[1] + 40], ['.o.', 'ogo', 'odo', 'odo', 'odo', '.o.'], { o: OL, g: gold, d: T(pal[0] === '#d8b23a' ? '#2e8b57' : pal[0]) });
      else if (jewel === 'Tassel') sprite(sitL, [lobe[0], lobe[1] + 50], ['.o.', 'ogo', 'oto', 'ttt', 'ttt', 'ttt', 't.t'], { o: OL, g: gold, t: T(pal[0]) });
    } else {
      // the instrument's neck rises from the top of the head, with frets, a headstock and pegs
      const top = Math.min(...head.map(p => p[1]));
      const nk = framed(sitL, [[hcx - 26, top + 10], [hcx - 26, 92], [hcx + 26, 92], [hcx + 26, top + 10]], '#5a3a22');
      pattern(sitL, inside(nk), T('#d8c8a0'), (i, j) => j % 3 === 0);
      framed(sitL, [[hcx - 44, 96], [hcx - 52, 0], [hcx + 52, 0], [hcx + 44, 96]], '#3a2616');
      for (let k = 0; k < 3; k++) for (const s of [-1, 1]) sprite(sitL, [hcx + s * 64, 22 + k * 26], ['oo', 'ow'], { o: OL, w: T('#e8dcc0') }, s < 0);
    }
    if (legend === 'Plaster') {
      // a cast: the mould's seam runs up over the head, and the tip of the nose is chipped off
      const sm = new Uint8Array(NN);
      for (let n = 0; n < NN; n++) sm[n] = sitL[n] && sitL[n] !== OL ? 1 : 0;
      const seamPath = [P(-118, -420), P(-150, -200), P(-170, 40), P(-140, 200), [hcx - flip * 120, hcy + 400]];
      trail(sitL, seamPath.map(p => [p[0] + flip * CW, p[1]]), CAST[1], sm);
      trail(sitL, seamPath, CAST[4], sm);
      const [ti, tj] = cellOf(noseTip);
      for (const [di, dj, k] of [[0, 0, CAST[1]], [-flip, 0, CAST[2]], [0, -1, CAST[2]], [0, 1, CAST[1]]]) plot(sitL, ti + di, tj + dj, k);
      // a hairline crack runs down from the crown, and a flake has come off the brow
      trail(sitL, [P(70, -300), P(48, -236), P(78, -180), P(52, -118), P(84, -60)], CAST[1], sm);
      const [bi, bj] = cellOf(P(-120, -150));
      for (const [di, dj, k] of [[0, 0, CAST[1]], [1, 0, CAST[2]], [0, 1, CAST[2]], [1, 1, CAST[1]]]) if (sm[(bj + dj) * N + bi + di]) plot(sitL, bi + di, bj + dj, k);
    }
    xf = p => p;

    // ---------- props: the still parts (drawn once) ----------
    const pc = [hcx + front * QU(300, 350), QU(830, 880)];
    const gx = pc[0], gy = pc[1] - 6, neckEnd = [gx + front * 150, gy - 420];
    const wood = '#c98a3e', woodD = '#8a5528';
    if (prop === 'Hand') {
      // a hand raised to the cheek: four fingers and a thumb in two skin tones, each with its own outline
      const bx = hcx - flip * 150, by = hcy + 240;
      const finger = (x, y, w, l, a, col) => {
        const co = Math.cos(a), si = Math.sin(a), pts = [[-w / 2, 0], [-w * 0.42, -l * 0.8], [-w * 0.2, -l], [w * 0.22, -l], [w * 0.42, -l * 0.8], [w / 2, 0]];
        chip(sitL, pts.map(([u, v]) => [x + u * co - v * si, y + u * si + v * co]), col);
      };
      finger(bx - 48, by + 8, 30, 100, -0.16, skin[2]); finger(bx - 15, by, 31, 126, -0.05, skin[1]); finger(bx + 18, by, 31, 120, 0.05, skin[1]); finger(bx + 49, by + 10, 28, 92, 0.15, skin[2]);
      const pm = framed(sitL, [[bx - 70, by + 4], [bx + 68, by + 6], [bx + 74, by + 120], [bx + 40, by + 200], [bx - 50, by + 200], [bx - 72, by + 110]], skin[1]);
      solid(sitL, [[bx, by + 4], [bx + 80, by + 6], [bx + 80, by + 200], [bx, by + 200]], skin[2], inside(pm));
      finger(bx + flip * 58, by + 112, 34, 96, flip * 0.5, skin[1]);
      trail(sitL, [[bx - 46, by + 44], [bx - 10, by + 60], [bx + 36, by + 50]], CR, inside(pm));
    } else if (prop === 'Guitar') {
      const nk = [[gx - 22, gy - 40], [neckEnd[0] - 22, neckEnd[1]], [neckEnd[0] + 22, neckEnd[1] - 6], [gx + 22, gy - 46]];
      chip(sitL, nk, '#5a3a22');
      for (let k = 1; k < 7; k++) { const f2 = k / 7; dot(sitL, [gx + (neckEnd[0] - gx) * f2, gy - 43 + (neckEnd[1] - gy + 40) * f2], T('#d8c8a0')); }
      framed(sitL, [[neckEnd[0] - 30, neckEnd[1] + 4], [neckEnd[0] - 34, neckEnd[1] - 70], [neckEnd[0] + 28, neckEnd[1] - 76], [neckEnd[0] + 26, neckEnd[1] - 4]], '#3a2616');
      const gb = framed(sitL, [[gx - 140, gy - 60], [gx - 70, gy - 120], [gx + 10, gy - 70], [gx + 90, gy - 120], [gx + 160, gy - 40], [gx + 130, gy + 150], [gx - 120, gy + 150]], wood);
      solid(sitL, [[gx - front * 10, gy - 200], [gx + flip * 400, gy - 200], [gx + flip * 400, gy + 200], [gx - front * 50, gy + 200]], woodD, inside(gb));
      sprite(sitL, [gx, gy + 30], ['.oo.', 'oooo', 'oooo', '.oo.'], { o: OL });
    } else if (prop === 'Lemon') {
      framed(sitL, [[pc[0] - 210, pc[1] + 70], [pc[0] + 170, pc[1] + 50], [pc[0] + 150, pc[1] + 116], [pc[0] - 190, pc[1] + 126]], pal[2]);
    } else if (prop === 'Cup') {
      framed(sitL, [[pc[0] - 120, pc[1] + 68], [pc[0] + 120, pc[1] + 58], [pc[0] + 98, pc[1] + 100], [pc[0] - 98, pc[1] + 104]], cream);
      ringCells(sitL, [pc[0] + front * 82, pc[1] + 6], 34, OL);
      ringCells(sitL, [pc[0] + front * 82, pc[1] + 6], 20, T(cream));
      const cm = framed(sitL, [[pc[0] - 76, pc[1] - 44], [pc[0] + 76, pc[1] - 50], [pc[0] + 56, pc[1] + 70], [pc[0] - 56, pc[1] + 74]], cream);
      const ic = inside(cm);
      pattern(sitL, ic, T(pal[0]), (i, j) => j === Math.floor((pc[1] + 4) / CW) || j === Math.floor((pc[1] + 4) / CW) + 1);
      for (let n = 0; n < NN; n++) if (ic[n] && ((n % N) * CW + CW / 2 - pc[0]) * flip > 6) sitL[n] = deep(sitL[n]);
      solid(sitL, [[pc[0] - 64, pc[1] - 44], [pc[0] + 64, pc[1] - 50], [pc[0] + 60, pc[1] - 28], [pc[0] - 60, pc[1] - 24]], '#4a2b1c', ic);
    }

    if (legend === 'Plaster') {
      framed(sitL, [[90, 944], [910, 944], [910, 1010], [90, 1010]], '#ddd6c8');
      framed(sitL, [[60, 916], [940, 916], [910, 952], [90, 952]], '#f6f1e6');
    }
    // ---------- the shattered legendary: the sitter seen in a broken mirror in a gilt frame ----------
    // a blow landed toward one corner of the glass: cracks run out from it to the frame and ring it twice, and each
    // shard of glass sits a cell askew and catches the light at its own angle
    let facetShift = 0, reformAt = -9, shard = null, crackM = null, imp = null;
    const shardMode = [], shardDisp = [], rays = [], frameM = new Uint8Array(NN);
    const blows = [], crackAt = new Float32Array(NN), underC = new Uint8Array(NN);
    // one blow: where it struck, its rays (angles), two ring radii and each sector's ring jitter, from a seeded rule
    const blowAt = (x, y, R, born) => { const NRAY = 9 + Math.floor(R(3) * 4), ang = [], w = []; for (let k = 0; k < NRAY; k++) { ang.push((k + 0.5 + (R(0x10 + k) - 0.5) * 0.7) / NRAY * Math.PI * 2); w.push(0.8 + R(0x20 + k) * 0.4); } return { x, y, NRAY, ang, w, r1: 4 + R(4) * 2, r2: 15 + R(5) * 5, wob: Math.floor(R(0) * 4), born, R }; };
    // the glass's pieces: a cell's shard is where it lies relative to every blow, and a crack runs wherever two
    // neighbouring cells lie in different shards; a crack the newest blow made appears as its web grows out
    const breakGlass = () => {
      const ids = new Map(), parts = new Array(blows.length), dirs = [];
      shardMode.length = 0; shardDisp.length = 0; rays.length = 0;
      const sid = (b, i, j) => { const dx = i + 0.5 - b.x, dy = j + 0.5 - b.y, d = Math.hypot(dx, dy); if (d < 1.7) return [-1, d, 0]; if (b.far && d > b.far) return [99, d, 0]; let a = Math.atan2(dy, dx) + 0.1 * Math.sin(d * 0.45 + b.wob); a = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); let sec = b.NRAY - 1; for (let k = 0; k < b.NRAY; k++) if (a < b.ang[k]) { sec = (k + b.NRAY - 1) % b.NRAY; break; } const ring = d < b.r1 * b.w[sec] ? 0 : d < b.r2 * b.w[sec] ? 1 : 2; return [sec * 3 + ring, d, b.ang[sec] + Math.PI / b.NRAY]; };
      const old = new Int32Array(NN), oids = new Map(), last = blows[blows.length - 1];
      for (const b of blows) if (!b.S) { b.S = new Int16Array(NN); b.A = new Float32Array(NN); for (let n = 0; n < NN; n++) { const i = n % N, r = sid(b, i, (n - i) / N); b.S[n] = r[0]; b.A[n] = r[2]; } }
      for (let n = 0; n < NN; n++) {
        const i = n % N, j = (n - i) / N; let key = 0, okey = 0, imp2 = false, am = 0, near = 0;
        for (let q = 0; q < blows.length; q++) { const b = blows[q], s = b.S[n]; if (s < 0) imp2 = true; key = key * 128 + s + 1; if (q < blows.length - 1) okey = key; else { am = b.A[n]; near = s % 3; } }
        if (imp2) { shard[n] = -1; old[n] = -1; continue; }
        if (!ids.has(key)) { const id = ids.size; ids.set(key, id); const h = hv(id * 7 + blows.length * 131), push = near < 2 ? 1 : h < 0.6 ? 1 : 0; shardMode.push(Math.floor(hv(id * 13 + 5) * 3)); shardDisp.push([Math.round(Math.cos(am) * push), Math.round(Math.sin(am) * push)]); }
        shard[n] = ids.get(key);
        if (!oids.has(okey)) oids.set(okey, oids.size); old[n] = oids.get(okey);
      }
      for (let n = 0; n < NN; n++) {
        const i = n % N, cr = shard[n] < 0 || (i < N - 1 && shard[n + 1] !== shard[n]) || (n < NN - N && shard[n + N] !== shard[n]);
        crackM[n] = shard[n] < 0 ? 2 : cr ? 1 : 0;
        const ocr = blows.length > 1 && (old[n] < 0 || (i < N - 1 && old[n + 1] !== old[n]) || (n < NN - N && old[n + N] !== old[n]));
        crackAt[n] = crackM[n] && blows.length > 1 && !ocr ? last.born + Math.hypot(i + 0.5 - last.x, (n - i) / N + 0.5 - last.y) / 90 : -99;
      }
      for (let n = 0; n < NN; n++) { const i = n % N, j = (n - i) / N; underC[n] = (i > 0 && crackM[n - 1] === 1) || (j > 0 && crackM[n - N] === 1) ? 1 : 0; }
      for (const b of blows) for (let k = 0; k < b.NRAY; k++) rays.push([Math.cos(b.ang[k]), Math.sin(b.ang[k]), b.R(0x40 + k), b.x, b.y]);
      imp = [last.x, last.y];
    };
    if (legend === 'Shattered') {
      const corner = Math.floor(rare(0x600) * 4);
      shard = new Int16Array(NN); crackM = new Uint8Array(NN);
      blows.push(blowAt((corner & 1 ? 50 : 13) + (rare(0x601) - 0.5) * 6, (corner & 2 ? 49 : 13) + (rare(0x602) - 0.5) * 6, k => k === 0 ? corner / 4 + 0.01 : rare(0x600 + k), -99));
      breakGlass();
      // the frame: four cells of carved gilt, beaded, with a rosette at each corner
      for (let n = 0; n < NN; n++) { const i = n % N, j = (n - i) / N, m = Math.min(i, j, N - 1 - i, N - 1 - j); if (m < 4) frameM[n] = m + 1; }
    }
    const brokenBy = t => { const k = t - reformAt; if (k > 3) return 1; if (k < 0.35) return Math.max(0, 1 - k / 0.35); if (k < 2) return 0; return (k - 2) / 1; };
    const glassC = legend === 'Shattered' ? new Int32Array(3 * 4096).fill(-1) : null;
    const glassOf = (k, mode) => { const key = k * 3 + mode; let v = glassC[key]; if (v < 0) v = glassC[key] = T(blend(blend(toneHex(k), '#cfdce8', 0.3), mode === 1 ? '#1c2836' : '#f2f8ff', mode === 0 ? 0 : mode === 1 ? 0.2 : 0.28)); return v; };
    const GILT = [T('#4a3214'), T('#c89a44'), T('#e8c46a'), T('#8a6424')], GILTHI = T('#fff0b8'), CRACKW = T('#d6e0ea'), GLINTW = T('#ffffff');
    const glassAt = [], frameAt = [], frameK = [], underCrack = new Uint8Array(NN);
    if (legend === 'Shattered') for (let n = 0; n < NN; n++) {
      const m = frameM[n], i = n % N, j = (n - i) / N;
      if (!m) { glassAt.push(n); continue; }
      const along = Math.min(i, j) === m - 1 ? i + j : i - j;
      let k = m === 1 ? GILT[0] : m === 4 ? GILT[3] : m === 2 ? ((along & 3) === 0 ? GILTHI : GILT[2]) : ((along + 2) & 3) === 0 ? GILT[0] : GILT[1];
      const ci = Math.min(i, N - 1 - i), cj = Math.min(j, N - 1 - j);
      if (ci < 6 && cj < 6 && Math.hypot(ci - 2, cj - 2) < 2.3) k = Math.hypot(ci - 2, cj - 2) < 1 ? GILTHI : GILT[2];   // a rosette in each corner
      frameAt.push(n); frameK.push(k);
    }

    // ---------- the living features: eyes, brows, mouth, moustache, glasses, props ----------
    // per mood: front brow raise and tilt, side brow raise and tilt, how far the lids come down
    const moodSet = {
      Calm: [0, 0, 0, 0, 0.12], Smile: [-8, -0.12, -6, -0.1, 0.28], Surprised: [-30, -0.18, -34, -0.14, 0], Stern: [10, 0.36, 10, 0.3, 0.32],
      Wry: [-16, -0.12, 10, 0.26, 0.16], Pout: [-4, -0.32, -4, -0.3, 0.18], Sly: [6, 0.16, -18, -0.16, 0.5], Whistle: [-16, -0.1, -12, -0.08, 0.06],
    };
    const iris = T(palName === 'Harlequin' ? '#1f3f99' : palName === 'Ink and Paper' ? '#b8322a' : pal[4]);
    // on the deepest skins the lips are a soft rose-brown a shade lighter than the face (never a bright red ring), and each brow
    // gets a one-cell lit brow bone under it, so mouth and brows read as clearly as on a light face
    const deepSkin = !lute && (skin[0] === 'Dark' || skin[0] === 'Deep' || skin[0] === 'Brown');
    const lipL = T(deepSkin ? blend(skin[1], '#d88c76', 0.5) : palName === 'Blue Hour' ? '#7a5aa0' : '#b8322a');
    const lipD = deep(lipL);
    const PAPER = T('#f6efe0'), GLEAM = T('#ffffff'), MOUTHIN = T('#3a120f');
    // eye sprites: o outline, w white, l the lower lid (a softer line)
    const EYE = {
      almondS: ['..ooo..', '.owwwo.', 'owwwwwo', '.lllll.'],
      almondL: ['..ooooo..', '.owwwwwo.', 'owwwwwwwo', '.lllllll.'],
      almondXL: ['...ooooo...', '.oowwwwwoo.', 'owwwwwwwwwo', '.llwwwwwll.', '...lllll...'],
      slit: ['.ooooooo.', 'owwwwwwwo', '.lllllll.'],
      disc5: ['.ooo.', 'owwwo', 'owwwo', 'owwwo', '.lll.'],
      disc6: ['.oooo.', 'owwwwo', 'owwwwo', 'owwwwo', 'owwwwo', '.llll.'],
      disc7: ['..ooo..', '.owwwo.', 'owwwwwo', 'owwwwwo', 'owwwwwo', '.lwwwl.', '..lll..'],
      leaf: ['.....ooo.', '..oowwwwo', 'owwwwwwo.', '.llllll..'],
      leafS: ['..ooo', '.owwo', 'owwo.', '.ll..'],
      diamond: ['....ooo....', '..oowwwoo..', 'oowwwwwwwoo', '..llwwwll..', '....lll....'],
      square: ['.oooooo', 'owwwwwo', 'owwwwwo', 'owwwwwo', 'owwwwwo', 'llllll.'],
    };
    const LOWLID = T(blend(outline, skin[1], 0.4));
    const pickEye = (kind, s) => {
      if (kind === 'almond') return s < 0.9 ? 'almondS' : s < 1.1 ? 'almondL' : 'almondXL';
      if (kind === 'disc') return s < 0.95 ? 'disc5' : s < 1.08 ? 'disc6' : 'disc7';
      if (kind === 'leaf') return s < 0.8 ? 'leafS' : 'leaf';
      return kind;
    };
    const drawEye = (kind, at, s, lid, lidK, look) => {
      const name = pickEye(kind, s), mir = flip < 0;
      let rows = EYE[name].map(r => (mir ? r.split('').reverse() : r.split('')));
      const whites = rows.map((r, n) => (r.includes('w') ? n : -1)).filter(n => n >= 0);
      if (lid >= 0.92) { const last = whites[whites.length - 1]; rows = rows.map((r, n) => r.map(ch => (ch === '.' ? '.' : n === last ? 'o' : 's'))); }
      else {
        const kk = Math.min(whites.length, Math.round(lid * whites.length));
        if (kk > 0) { const lr = whites[kk - 1]; rows = rows.map((r, n) => r.map(ch => (ch === '.' ? '.' : n < lr ? 's' : n === lr ? 'o' : ch))); }
      }
      const h = rows.length, w = rows[0].length, q = xf(at), li = Math.round(q[0] / CW - w / 2), tj = Math.round(q[1] / CW - h / 2);
      const map = { o: OL, w: PAPER, l: LOWLID, s: lidK };
      for (let r = 0; r < h; r++) for (let x0 = 0; x0 < w; x0++) { const k = map[rows[r][x0]]; if (k) plot(liveL, li + x0, tj + r, k); }
      // the pupil goes on whatever white is left (a plaster cast has none)
      if (legend === 'Plaster') return;
      const wc = [];
      for (let r = 0; r < h; r++) for (let x0 = 0; x0 < w; x0++) if (rows[r][x0] === 'w') wc.push([x0, r]);
      if (!wc.length) return;
      let cx = 0, cy2 = 0; for (const [a, b] of wc) { cx += a; cy2 += b; } cx /= wc.length; cy2 /= wc.length;
      const isW = (a, b) => rows[b] && rows[b][a] === 'w';
      const put2 = (a, b, k) => { if (isW(a, b)) plot(liveL, li + a, tj + b, k); };
      if (name.startsWith('disc')) {
        const big = name === 'disc7' ? 3 : 2, b0 = Math.round(cy2 - big / 2 + 0.5);
        const a0 = (big === 3 ? Math.round(cx - 1) + (flip > 0 ? 1 : -1) : flip > 0 ? Math.ceil(cx) : Math.floor(cx) - 1) + look;
        for (let b = 0; b < big; b++) for (let a = 0; a < big; a++) put2(a0 + a, b0 + b, iris);
        put2(a0 + Math.floor(big / 2), b0 + Math.floor(big / 2), OL); put2(a0 + (flip > 0 ? 0 : big - 1), b0, GLEAM);
      } else if (name === 'diamond') { const a0 = Math.round(cx) + look; for (let b = 0; b < h; b++) put2(a0, b, OL); put2(a0 - 1, Math.round(cy2) - 1, GLEAM); }
      else if (name === 'square') { const a0 = Math.round(cx - 0.5) + look, b0 = Math.round(cy2 - 0.5); for (let b = 0; b < 2; b++) for (let a = 0; a < 2; a++) put2(a0 + a, b0 + b, OL); }
      else {
        const a0 = (flip > 0 ? Math.ceil(cx - 0.5) : Math.floor(cx - 0.5)) + look, rowsW = [...new Set(wc.map(p => p[1]))].sort((m, n) => m - n), b0 = rowsW[Math.max(0, rowsW.length - 2)];
        for (let b = 0; b < 2; b++) for (let a = 0; a < 2; a++) put2(a0 + a, b0 + b, OL);
        if (rowsW.length > 1) put2(a0, b0, GLEAM);
      }
    };
    const eyeKinds = {
      'Almond and disc': [['almond', 1], ['disc', 1]], 'Leaf and diamond': [['leaf', 1], ['diamond', 1]], 'Twin almonds': [['almond', 0.96], ['almond', 0.8]],
      'Square and almond': [['square', 1], ['almond', 0.86]], 'Disc and slit': [['disc', 0.94], ['slit', 1]], 'Twin discs': [['disc', 0.88], ['disc', 1.1]], 'Three eyes': [['almond', 0.92], ['disc', 0.94]],
    };
    const browK = T(age === 'Elder' && hairCol !== '#ebe6da' ? '#8d8a84' : hats.includes(hair) || hair === 'Bald' || lute ? '#2a1d14' : blend(hairCol, '#000000', 0.3));
    // a brow is a cell line, doubled on its inner half (towards the nose) like a loaded brush
    const BROWLIT = T(blend(skin[1], '#fff1dc', 0.32)), browFree = new Uint8Array(NN);
    const brow = (x, y, len, tiltB, inner, heavy) => {
      const xi = x + inner * len / 2, yi = y + tiltB * len / 2, xo = x - inner * len / 2, yo = y - tiltB * len / 2;
      if (deepSkin) { for (let n = 0; n < NN; n++) browFree[n] = liveL[n] ? 0 : 1; seg(liveL, [xi, yi + CW], [xo, yo + CW], BROWLIT, browFree); }
      seg(liveL, [xi, yi], [xo, yo], browK);
      if (heavy) seg(liveL, [xi, yi - CW], [(xi * 0.55 + xo * 0.45), (yi * 0.55 + yo * 0.45) - CW], browK);
    };
    // mouths, drawn for flip = 1 and mirrored; u is lip (light on the front side, dark on the profile side)
    const MOUTH = {
      Calm: ['.uu.uu.', 'ooooooo', '.uuuuu.'],
      Smile: ['o.....o', 'ouu.uuo', '.ooooo.', '..uuu..'],
      Wry: ['......o', '.uu.uoo', 'ooooo..', '..uuu..'],
      Pout: ['.u.u.', 'uuuuu', 'ooooo', 'uuuuu', '.uuu.'],
      Stern: ['.uuuuu.', 'ooooooo', 'o.....o'],
      Sly: ['......o', '.....o.', 'ooooo..', '.uuu...'],
      Surprised: ['.uuu.', 'udddu', 'udddu', 'udddu', '.uuu.'],
      Whistle: ['.uu.', 'uddu', '.uu.'],
    };
    const drawMouth = (mood, open) => {
      let rows = MOUTH[mood];
      if (mood === 'Surprised' && open) rows = ['.uuu.', 'udddu', 'udddu', 'udddu', 'udddu', '.uuu.'];
      const wide = mouthW > 62 && rows[0].length === 7;
      if (wide) rows = rows.map(r => r.slice(0, 3) + r[3] + r[3] + r[3] + r.slice(4));
      if (flip < 0) rows = rows.map(r => r.split('').reverse().join(''));
      const at = mood === 'Whistle' ? [mx + flip * 22, mouthY + 4] : [mx, mouthY + 4];
      const q = xf(at), h = rows.length, w = rows[0].length, li = Math.round(q[0] / CW - w / 2), tj = Math.round(q[1] / CW - h / 2);
      for (let r = 0; r < h; r++) for (let x0 = 0; x0 < w; x0++) {
        const ch = rows[r][x0];
        if (ch === '.') continue;
        const k = ch === 'o' ? OL : ch === 'd' ? MOUTHIN : (x0 + 0.5 > w / 2) === (flip > 0) ? lipD : lipL;
        plot(liveL, li + x0, tj + r, k);
      }
    };
    const drawMoustache = () => {
      if (lute || (beard !== 'Moustache' && beard !== 'Curled moustache' && beard !== 'Full beard')) return;
      const rows = beard === 'Curled moustache' ? ['oo.......oo', 'o.hhh.hhh.o', '.hhhhhhhhh.', 'hh.......hh'] : ['..hhh.hhh..', '.hhhhhhhhh.', 'hhh.....hhh'];
      sprite(liveL, [mx, mouthY - 38], rows, { h: HC, o: OL });
    };
    const drawEyewear = () => {
      if (eyewear === 'None') return;
      if (eyewear === 'Spectacles') {
        ringCells(liveL, eyeA, 70, OL); ringCells(liveL, eyeB, 60, OL);
        seg(liveL, [eyeA[0] + flip * 72, eyeA[1] - 8], [eyeB[0] - flip * 62, eyeB[1] - 8], OL);
        seg(liveL, [eyeA[0] - flip * 72, eyeA[1]], [earX, earY - 40], OL);
      } else {
        ringCells(liveL, eyeB, 64, T('#b08a2c'));
        trail(liveL, [[eyeB[0] + flip * 30, eyeB[1] + 60], [eyeB[0] + flip * 50, eyeB[1] + 180], [eyeB[0] + flip * 80, hcy + 300]], T('#b08a2c'));
      }
    };

    // ---------- props that move ----------
    let propKick = -9;   // when the prop was last tapped
    const cluster = (L, parts) => {   // shapes filled together and outlined as one piece
      const um = new Uint8Array(NN);
      for (const [pts, col] of parts) { const m = mask(pts); put(L, m, T(col)); for (let n = 0; n < NN; n++) um[n] |= m[n]; }
      rimOut(L, um, OL);
      for (const [pts, col] of parts) put(L, mask(pts), T(col));
      return um;
    };
    const drawBird = (t, dove) => {
      const k = t - propKick, hop = k < 0.6 ? Math.round(Math.sin(k / 0.6 * Math.PI) * 3) * CW : 0, bx = propAt[0], by = propAt[1] - hop;
      const sc = p => [bx + (p[0] - bx) * 1.6 * -flip, by + (p[1] - by) * 1.6];
      const flap = k < 0.6 ? (Math.floor(k * 10) % 2 ? 26 : -10) : 0;
      const bodyPts = [[bx - 60, by + 20], [bx - 10, by - 40], [bx + 50, by - 30], [bx + 80, by - 50], [bx + 60, by], [bx + 10, by + 40]].map(sc);
      framed(liveL, bodyPts, dove ? '#f4f0e6' : pal[3]);
      chip(liveL, [[bx - 10, by - 10], [bx + 30, by - 70 - flap], [bx + 40, by - 10]].map(sc), dove ? '#d9d4c6' : pal[0]);
      chip(liveL, [[bx + 78, by - 54], [bx + 106, by - 45], [bx + 76, by - 36]].map(sc), dove ? '#d98a3a' : pal[0]);
      dot(liveL, sc([bx + 52, by - 28]), OL);
      if (dove) { const a = sc([bx + 104, by - 46]), b = sc([bx + 150, by - 72]); seg(liveL, a, b, OL); for (let q = 0; q < 3; q++) dot(liveL, sc([bx + 116 + q * 14, by - 62 - q * 7 + (q % 2 ? 10 : -6)]), T('#7d9a3a')); }
    };
    const flowerAt = [hcx - flip * 175, hcy - 160];
    const drawFlower = t => {
      const k = t - propKick, spin = k < 1.4 ? Math.round((1 - Math.pow(1 - k / 1.4, 3)) * 4) * Math.PI / 5 : 0, [bx, by] = flowerAt, parts = [];
      for (let q = 0; q < 5; q++) { const a = q / 5 * Math.PI * 2 + spin - Math.PI / 2; parts.push([[[bx, by], [bx + Math.cos(a - 0.4) * 76, by + Math.sin(a - 0.4) * 76], [bx + Math.cos(a) * 88, by + Math.sin(a) * 88], [bx + Math.cos(a + 0.4) * 76, by + Math.sin(a + 0.4) * 76]], q % 2 ? pal[0] : '#e04848']); }
      cluster(liveL, parts);
      sprite(liveL, [bx, by], ['.oo.', 'oyyo', 'oyyo', '.oo.'], { o: OL, y: T('#f0c419') });
    };
    const pipeAt = [mx + flip * (mouthW - 6), mouthY + 6];
    const STEAM = T('#f3ede0');
    const puff = (x, y, rx, ry, a) => {   // a ring of smoke, thinned by an ordered dither as it fades
      for (let s = 0; s < 24; s++) { const an = s / 24 * Math.PI * 2, [i, j] = cellOf([x + Math.cos(an) * rx, y + Math.sin(an) * ry]); if (dith(i, j, a)) plot(liveL, i, j, STEAM); }
    };
    const drawPipe = t => {
      const [x, y] = pipeAt, F = flip;
      seg(liveL, [x, y + CW], [x + F * 116, y + 50 + CW], OL); seg(liveL, [x, y], [x + F * 116, y + 50], T('#3a2616'));
      framed(liveL, [[x + F * 108, y + 8], [x + F * 176, y + 2], [x + F * 170, y + 96], [x + F * 114, y + 96]], '#7a4a26');
      solid(liveL, [[x + F * 116, y + 10], [x + F * 168, y + 6], [x + F * 166, y + 24], [x + F * 118, y + 26]], '#21160f');
      for (let q = 0; q < 3; q++) { const ph = (t * 0.18 + q / 3) % 1; puff(x + F * 140 + Math.round(Math.sin(ph * 6 + q)) * CW + F * ph * 40, y - ph * 260, 18 + ph * 26, 12 + ph * 14, 0.75 * (1 - ph)); }
      const k = t - propKick;
      if (k < 2.2) { const ph = k / 2.2; puff(x + F * (150 + ph * 120), y - ph * 330, 34 + ph * 60, 22 + ph * 30, 1 - ph); }
    };
    const drawFan = t => {
      const k = t - propKick, wob = k < 1.2 ? Math.round(Math.sin(k * 10) * 2 * (1 - k / 1.2)) * 0.1 : 0, base = front * 0.35 + wob;
      const ox = pc[0], oy = pc[1] + 60, co = Math.cos(base), si = Math.sin(base), rot = ([u, v]) => [ox + u * co - v * si, oy + u * si + v * co];
      for (let q = 0; q < 9; q++) {
        const a0 = -Math.PI + 0.25 + q * (Math.PI - 0.5) / 9, a1 = a0 + (Math.PI - 0.5) / 9;
        framed(liveL, [[0, 0], [Math.cos(a0) * 200, Math.sin(a0) * 200], [Math.cos(a1) * 200, Math.sin(a1) * 200]].map(rot), q % 2 ? pal[0] : pal[2]);
      }
      sprite(liveL, [ox, oy], ['.o.', 'ogo', '.o.'], { o: OL, g: T('#d8b23a') });
    };
    const drawLemon = t => {
      const k = t - propKick, rock = k < 1.5 ? Math.round(Math.sin(k * 9) * 3 * (1 - k / 1.5)) * 0.1 : 0;
      const ox = pc[0], oy = pc[1] + 20, a = rock - 0.2, co = Math.cos(a) * 1.3, si = Math.sin(a) * 1.3, rot = ([u, v]) => [ox + u * co - v * si, oy + u * si + v * co];
      const lm = framed(liveL, [[-78, 0], [-60, -40], [0, -56], [62, -38], [86, 0], [60, 40], [0, 54], [-60, 38]].map(rot), '#f0c419');
      solid(liveL, [[0, -60], [70, -40], [96, 0], [70, 44], [0, 60]].map(rot), '#c99a10', inside(lm));
      seg(liveL, rot([-80, 0]), rot([-100, -6]), OL);
      const hx = pc[0] - front * 130, hy = pc[1] + 80;
      const cm = framed(liveL, ell(hx, hy, 64, 32, 18), '#f7e27a');
      for (let q = 0; q < 6; q++) { const an = q / 6 * Math.PI * 2; seg(liveL, [hx, hy], [hx + Math.cos(an) * 46, hy + Math.sin(an) * 22], T('#d9b740'), inside(cm)); }
    };
    const drawSteam = t => {
      const k = t - propKick, boost = k < 2 ? 1 - k / 2 : 0;
      for (let q = 0; q < 3; q++) {
        const x0 = pc[0] - 34 + q * 34;
        for (let s = 0; s <= 10; s++) {
          const [i, j] = cellOf([x0 + Math.round(Math.sin(s * 0.7 + t * 1.6 + q * 2)) * CW, pc[1] - 66 - s * CW * (1 + boost * 0.5)]);
          if (dith(i, j, (0.75 + boost * 0.25) * (1 - s / 12))) plot(liveL, i, j, STEAM);
        }
      }
    };
    const drawStrings = t => {
      // one string down the neck; plucked, it shivers a cell either side for a moment
      const k = t - propKick, amp = k < 1.2 ? (Math.floor(k * 8) % 2 ? 1 : -1) * CW : 0;
      trail(liveL, [[gx, gy + 110], [(gx + neckEnd[0]) / 2 + amp, (gy + neckEnd[1]) / 2 + 10], [neckEnd[0], neckEnd[1] - 4]], T('#c9b48a'));
    };

    // ---------- the rose (coveted): held across the mouth, it sheds a petal when tapped ----------
    const roseSide = prop === 'Pipe' ? -flip : flip;
    const roseAt = [mx + roseSide * 140, mouthY - 10];
    let petals = [];
    const drawRose = t => {
      seg(liveL, [mx - roseSide * 90, mouthY + 14], [roseAt[0] - roseSide * 30, roseAt[1] + 16], T('#3f6b2a'));
      sprite(liveL, [mx - roseSide * 30, mouthY + 34], ['.ogg', 'oggo', 'gg..'], { g: T('#5d8f38'), o: OL }, roseSide < 0);
      sprite(liveL, roseAt, ['..ooo..', '.orrro.', 'orrdrro', 'ordrdro', 'orrdrro', '.orrro.', '..ooo..'], { o: OL, r: T('#d42c40'), d: T('#7e1426') });
    };

    // ---------- the viewer ----------
    // A mulberry32 over the hash's third word picks a mode for the notes: the biggest plane sounds lowest.
    let mw = parseInt(c.hash.slice(18, 26), 16) >>> 0;
    const mr = () => { mw = (mw + 0x6d2b79f5) | 0; let z = Math.imul(mw ^ (mw >>> 15), 1 | mw); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const modes = [[0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 11], [0, 2, 4, 7, 9], [0, 1, 3, 5, 7, 8, 10]];
    const mode = modes[Math.floor(mr() * modes.length)], tonic = 48 + Math.floor(mr() * 7);
    const deg = d => tonic + mode[((d % mode.length) + mode.length) % mode.length] + 12 * Math.floor(d / mode.length);
    const rank = planes.map((p, i) => [area(p), i]).sort((x, y) => y[0] - x[0]).map(e => e[1]);
    const shade = planeCols.map(col => pal.indexOf(col));
    const at = (u, v) => { const i = Math.floor(u * N), j = Math.floor(v * N); return i >= 0 && j >= 0 && i < N && j < N ? j * N + i : -1; };
    const propSpot = { Bird: [propAt[0], propAt[1] - 40, 130], Dove: [propAt[0], propAt[1] - 40, 130], Flower: [flowerAt[0], flowerAt[1], 90], Pipe: [pipeAt[0] + flip * 140, pipeAt[1] + 50, 80], Fan: [pc[0], pc[1], 170], Lemon: [pc[0], pc[1] + 40, 120], Cup: [pc[0], pc[1], 110], Guitar: [gx, gy, 170], Moon: [moonAt[0], moonAt[1], 90], Hand: [hcx - flip * 150, hcy + 300, 110] }[prop];
    // each mood has its own little phrase, in scale degrees
    const phrase = { Calm: [0, 2], Smile: [2, 4, 7], Surprised: [0, 7], Stern: [4, 0], Wry: [3, 1, 4], Pout: [2, 1], Sly: [5, 3, 4], Whistle: [7, 9, 7] };
    let moodIx = moods.indexOf(mood0), moodAt = -9, moonGlow = -9, strumAt = lute ? -2.5 : -9;
    const NOTEK = lute ? T('#c63a2c') : 0, NOTEB = lute ? T('#1e1a16') : 0;
    let pluckAt = -9;
    const strCols = [Math.floor((hcx - CW) / CW), Math.floor((hcx + CW) / CW)], strLo = [(mouthY + 52) / CW, (hcy + 262) / CW], strHi = [2.5, Math.min(...head.map(p => p[1])) / CW + 2.5];
    const slots = Math.max(8, Math.floor((musX[1] - musX[0] - 4) / 3));
    let press0 = null, holdAt = -1, lastDown = false, flipAt = -9, mirrored = 0, prevPx = -1, melody = [], flying = [], playAt = -9;
    const toyTap = (u, v2, t) => {
      const k0 = at(u, v2), pan = (u - 0.5) * 1.2;
      if (legend === 'Shattered') {
        // a new blow where you tapped (the first one stays; four more at most), its cracks running out from it
        const i = u * N, j = v2 * N; if (i < 4 || j < 4 || i > N - 4 || j > N - 4) return true;
        const sd = blows.length * 977 + Math.floor(i) * 61 + Math.floor(j);
        if (blows.length > 4) blows.splice(1, 1);
        const nb = blowAt(i, j, k => hv(sd * 17 + k), t); nb.far = 11 + hv(sd) * 7; nb.r2 = Math.min(nb.r2, nb.far * 0.7); blows.push(nb); breakGlass(); facetShift++;
        c.sound.hit('noise', 0.3, { cutoff: 5000, dur: 0.25 }); c.sound.hit('snare', 0.2); [0, 3, 7, 10].forEach((d, q) => c.sound.note(deg(14 + d), { dur: 0.3, vel: 0.08, wave: 'sine', pan, at: 0.04 + q * 0.05 }));
        return true;
      }
      if (legend === 'Plaster' && k0 >= 0 && owned[k0]) {
        // the cast is turned about on its pedestal: it narrows to its edge and comes round the other way
        flipAt = t; c.sound.hit('click', 0.22); c.sound.note(deg(-5), { dur: 0.5, vel: 0.12, wave: 'triangle', cutoff: 700, pan }); c.sound.note(deg(-1), { dur: 0.4, vel: 0.08, wave: 'triangle', cutoff: 700, pan, at: 0.25 });
        return true;
      }
      if (lute && k0 >= 0 && musM[k0]) {
        // the sheet music plays back the tune the strings wrote on it, note by note
        playAt = t; melody.forEach((p, q) => c.sound.note(deg(p), { dur: 0.35, vel: 0.2, wave: 'triangle', cutoff: 2200, at: q * 0.22 }));
        if (!melody.length) [0, 2, 4].forEach((d, q) => c.sound.note(deg(d), { dur: 0.3, vel: 0.12, wave: 'triangle', at: q * 0.15 }));
        return true;
      }
      return false;
    };
    const toyMove = t => {
      const inp = c.input;
      if (inp.down && !lastDown) holdAt = t;
      if (!inp.down) holdAt = -1;
      if (legend === 'Shattered' && holdAt >= 0 && t - holdAt > 1) { holdAt = -1; blows.length = 1; breakGlass(); reformAt = t; c.sound.note(deg(7), { dur: 1.2, vel: 0.14, wave: 'sine' }); c.sound.note(deg(11), { dur: 1.2, vel: 0.1, wave: 'sine', at: 0.1 }); }
      if (lute) {
        // a finger dragged across a string plucks it: higher up the string, a higher note; each note flies to the
        // next place on the sheet music's stave and stays there
        const px = inp.x * N, py = inp.y * N;
        if (inp.down && prevPx >= 0) for (let q = 0; q < 2; q++) {
          const sc = strCols[q];
          if ((prevPx - sc) * (px - sc) <= 0 && prevPx !== px && py >= strHi[0] && py <= strLo[1] + 2) {
            const p = Math.max(0, Math.min(8, Math.round((strLo[1] - py) / (strLo[1] - strHi[0]) * 8)));
            strumAt = t - 3; pluckAt = t; c.sound.note(deg(p + q * 2), { dur: 0.9, vel: 0.22, wave: 'triangle', cutoff: 2400, pan: (inp.x - 0.5) });
            if (melody.length >= slots) { melody = []; flying = []; }
            flying.push([px, py, t, melody.length, p]); melody.push(p + q * 2);
          }
        }
        prevPx = inp.down ? px : -1;
      }
      // a short, still press and release is a tap (so a hold or a drag never also fires one)
      if (inp.down && !lastDown) press0 = { x: inp.x, y: inp.y, t, moved: 0 };
      if (press0 && inp.down) press0.moved = Math.max(press0.moved, Math.hypot(inp.x - press0.x, inp.y - press0.y) * N);
      if (press0 && !inp.down) { if (press0.moved < 1.5 && t - press0.t < 0.45) tap(press0.x, press0.y, t); press0 = null; }
      lastDown = inp.down;
    };
    const tap = (u, v2, t) => {
      if (legend !== 'None' && toyTap(u, v2, t)) return;
      const x0 = u * 1000, y0 = v2 * 1000, pan = (u - 0.5) * 1.2;
      // the head is tilted: hit-test the head and what it wears in its own frame
      const cs = Math.cos(tilt), sn = -Math.sin(tilt);
      const x = pvx + (x0 - pvx) * cs - (y0 - pvy) * sn, y = pvy + (x0 - pvx) * sn + (y0 - pvy) * cs;
      if (rose && Math.hypot(x - roseAt[0], y - roseAt[1]) < 70) {
        petals.push([roseAt[0], roseAt[1], t]);
        c.sound.note(deg(16), { dur: 0.6, vel: 0.14, wave: 'sine', pan }); c.sound.note(deg(14), { dur: 0.9, vel: 0.1, wave: 'sine', pan, at: 0.18 });
        return;
      }
      const onHead = prop === 'Flower' || prop === 'Pipe', px = onHead ? x : x0, py = onHead ? y : y0;
      if (propSpot && Math.hypot(px - propSpot[0], py - propSpot[1]) < propSpot[2]) {
        propKick = t;
        if (prop === 'Bird') { c.sound.note(deg(18), { dur: 0.07, vel: 0.22, wave: 'sine', pan }); c.sound.note(deg(20), { dur: 0.09, vel: 0.2, wave: 'sine', pan, at: 0.09 }); c.sound.note(deg(18), { dur: 0.12, vel: 0.16, wave: 'sine', pan, at: 0.2 }); }
        else if (prop === 'Dove') { c.sound.note(deg(7), { dur: 0.3, vel: 0.2, wave: 'sine', attack: 0.06, pan }); c.sound.note(deg(5), { dur: 0.5, vel: 0.18, wave: 'sine', attack: 0.08, pan, at: 0.3 }); }
        else if (prop === 'Flower') c.sound.note(deg(14), { dur: 1.2, vel: 0.22, wave: 'sine', pan });
        else if (prop === 'Pipe') { c.sound.hit('noise', 0.12, { cutoff: 520, dur: 0.6 }); c.sound.note(deg(-7), { dur: 0.7, vel: 0.2, wave: 'triangle', cutoff: 500, attack: 0.08, pan }); }
        else if (prop === 'Guitar') [0, 2, 4, 7, 9].forEach((d, i) => c.sound.note(deg(d), { dur: 1.1, vel: 0.2, wave: 'triangle', cutoff: 2200, pan, at: i * 0.035 }));
        else if (prop === 'Fan') { c.sound.hit('noise', 0.08, { cutoff: 1800, dur: 0.35 }); c.sound.note(deg(9), { dur: 0.3, vel: 0.14, wave: 'sine', pan }); }
        else if (prop === 'Lemon') { c.sound.note(deg(11), { dur: 0.12, vel: 0.2, wave: 'sine', pan }); c.sound.note(deg(9), { dur: 0.16, vel: 0.16, wave: 'sine', pan, at: 0.14 }); }
        else if (prop === 'Cup') { c.sound.note(deg(21), { dur: 0.5, vel: 0.16, wave: 'sine', pan }); c.sound.note(deg(25), { dur: 0.4, vel: 0.1, wave: 'sine', pan, at: 0.01 }); }
        else if (prop === 'Moon') { moonGlow = t; c.sound.note(deg(-7), { dur: 2, vel: 0.2, wave: 'sine', attack: 0.3, pan }); }
        else if (prop === 'Hand') c.sound.hit('click', 0.3);
        return;
      }
      const k0 = at(u, v2);
      if (k0 >= 0 && H[k0]) {
        moodIx = (moodIx + 1) % moods.length; moodAt = t;
        if (lute) { strumAt = t; [0, 2, 4, 7, 9, 11].forEach((d, i) => c.sound.note(deg(d), { dur: 1.4, vel: 0.17, wave: 'triangle', cutoff: 2400, pan, at: i * 0.03 })); return; }
        phrase[moods[moodIx]].forEach((d, i) => c.sound.note(deg(7 + d), { dur: 0.22, vel: 0.24, wave: 'sine', pan, at: i * 0.11 }));
        if (legend === 'Shattered') { facetShift++; reformAt = t; [0, 3, 5, 8].forEach((d, i) => c.sound.note(deg(10 + d), { dur: 0.5, vel: 0.12, wave: 'sine', pan, at: 0.25 + i * 0.07 })); }
        if (legend === 'Plaster') { c.sound.hit('click', 0.22); c.sound.note(deg(-5), { dur: 0.5, vel: 0.12, wave: 'triangle', cutoff: 700, pan }); }
        return;
      }
      if (k0 < 0 || sitL[k0]) return;   // the sitter, not the background
      if (legend === 'Plaster') c.sound.hit('click', 0.18);
      const i = pid[k0];
      shade[i] = (Math.max(0, shade[i]) + 1 + Math.floor(mr() * 2)) % pal.length;
      planeNow[i] = pal[shade[i]];
      collTint = planeNow[i];
      buildBack();
      c.sound.note(deg(rank.indexOf(i)), { dur: 0.45, vel: 0.28, wave: 'triangle', cutoff: 1800, pan });
    };

    // ---------- legendary finishes ----------
    const lumOf = k => { const [r, gg, bb] = tones[k]; return (r * 0.3 + gg * 0.59 + bb * 0.11) / 255; };
    const castMemo = new Map(), wallMemo = new Map();
    const castOf = (k, swap) => {
      if (k === OL) return CAST[0];
      if (CAST.includes(k)) return k;
      if (k === PAPER) return CAST[3];
      if (swap && k === S1) k = S2; else if (swap && k === S2) k = S1;
      if (!castMemo.has(k)) { const l = lumOf(k); castMemo.set(k, CAST[l < 0.3 ? 1 : l < 0.5 ? 2 : l < 0.7 ? 3 : 4]); }
      return castMemo.get(k);
    };
    const shadeMemo = new Map();
    const museumShade = k => { if (!shadeMemo.has(k)) shadeMemo.set(k, T(blend(toneHex(k), '#1c1a18', 0.32))); return shadeMemo.get(k); };
    const museum = k => { if (!wallMemo.has(k)) { const l = lumOf(k); wallMemo.set(k, T(toHex(70 + l * 120, 74 + l * 118, 70 + l * 110))); } return wallMemo.get(k); };
    const owned = new Uint8Array(NN), castB = new Int32Array(NN), wallB = new Int32Array(NN), rowA = new Int16Array(N), rowB = new Int16Array(N);
    let lampX = N / 2, lampY = 8;
    const SOX = new Int16Array(4), SOY = new Int16Array(4);
    const LVT = new Int8Array(17 * 9); for (let a = 0; a <= 16; a++) for (let b = 0; b <= 8; b++) LVT[a * 9 + b] = Math.max(0, Math.min(4, Math.floor((1.02 - 0.72 * Math.pow(a / 16, 1.4) - 0.2 * b / 8) * 5)));
    const IVORY = legend === 'Plaster' ? ['#4a443c', '#8a8272', '#bdb4a0', '#e2dbc8', '#fbf8ee'].map(T) : [];
    const LAMPB = T('#fffbe0'), LAMPW = T('#ffffff'), LAMPS = T('#8a6a32'), LAMPG = T('#c8a860');
    const poolM = new Map(), darkM = new Map();
    const poolOf = k => { if (!poolM.has(k)) poolM.set(k, T(blend(toneHex(k), '#ffe8c0', 0.16))); return poolM.get(k); };
    const darkOf = k => { if (!darkM.has(k)) darkM.set(k, T(blend(toneHex(k), '#0a0806', 0.45))); return darkM.get(k); };
    let flipDone = -9;
    // the plaster cast's gallery: a wall in the palette's darkest colour under a pool of light, a dado rail and panelled
    // wainscot below it, and a label card on the wall beside the cast
    const GAL = legend === 'Plaster' ? new Uint16Array(NN) : null;
    if (GAL) {
      const wh0 = blend(pal[1], '#140e0c', 0.32), wl = rgbOf(wh0).reduce((s, v) => s + v, 0) / 765, wallHex = wl < 0.16 ? blend(wh0, '#6a4a3a', 0.4) : wh0, W0 = T(wallHex), W1 = T(blend(wallHex, '#fff0d8', 0.1)), W2 = T(blend(wallHex, '#fff0d8', 0.2));
      const RAIL = T(blend(wallHex, '#fff0d8', 0.28)), RAILD = T(blend(wallHex, '#000000', 0.35)), PANEL = T(blend(wallHex, '#000000', 0.16)), PANELL = T(blend(wallHex, '#000000', 0.3)), CARD = T('#ece4d2'), CARDT = T('#8a8274');
      const cx0 = hcx - flip * 360;
      for (let n = 0; n < NN; n++) {
        const i = n % N, j = (n - i) / N, x = (i + 0.5) * CW, y = (j + 0.5) * CW, e = Math.hypot((x - hcx) / 380, (y - 280) / 460);
        let k = e < 0.6 ? W2 : e < 0.82 ? (dith(i, j, (0.82 - e) / 0.22) ? W2 : W1) : e < 1 ? (dith(i, j, (1 - e) / 0.18) ? W1 : W0) : W0;
        if (y > 700 && y < 724) k = RAIL; else if (y >= 724 && y < 740) k = RAILD;
        else if (y >= 740) { const u = ((x + 1000) % 250); k = u < CW || y < 740 + CW * 2 ? PANELL : PANEL; }
        if (Math.abs(x - cx0) < 70 && y > 500 && y < 590) k = Math.abs(x - cx0) > 70 - CW || y < 500 + CW || y > 590 - CW ? CARDT : ((j % 2 === 0) && Math.abs(x - cx0) < 40 && hv(i * 7 + j) < 0.8 ? CARDT : CARD);
        GAL[n] = k;
      }
    }
    const GALS = GAL, wallP = new Int32Array(GAL ? NN : 0), wallD = new Int32Array(GAL ? NN : 0), wallS = new Int32Array(GAL ? NN : 0);
    if (GAL) for (let n = 0; n < NN; n++) { wallP[n] = poolOf(GAL[n]); wallD[n] = darkOf(GAL[n]); wallS[n] = T(blend(toneHex(wallD[n]), '#000000', 0.62)); }

    const gap = U(3.5, 5.5);
    const third = [hcx + flip * 6, eyeY - 104 * lf];
    const young = age === 'Young' ? 1.06 : 1;

    tr('Palette', palName);
    tr('Skin', lute ? 'Wood' : skin[0]);
    tr('Head', headShape);
    tr('Age', age);
    tr('Mood', mood0);
    tr('Split', split);
    tr('Eyes', eyes);
    tr('Nose', nose);
    tr('Hair', hair);
    tr('Hair colour', hats.includes(hair) ? 'Under hat' : hair === 'Bald' && age === 'Young' ? 'None' : colName);
    tr('Beard', beard);
    tr('Garment', garment);
    tr('Collar', collar);
    tr('Jewellery', jewel);
    tr('Eyewear', eyewear);
    tr('Prop', prop);
    tr('Backdrop', ground);
    tr('Pose', pose);
    if (rose) c.trait('Item', 'Rose');
    if (legend !== 'None') c.trait('Legendary', legend);

    // the grid goes out through a 64 x 64 canvas, scaled up with smoothing off
    const small = document.createElement('canvas');
    small.width = small.height = N;
    const sx2 = small.getContext('2d'), img = sx2.createImageData(N, N), img32 = new Uint32Array(img.data.buffer);
    const behind = new Uint8Array(NN), broke = new Uint8Array(NN);
    const frame = t => {
      for (const tp of c.input.taps()) if (legend === 'None') tap(tp.x, tp.y, t);   // a legendary takes its taps as short, still releases
      if (legend !== 'None') toyMove(t);
      shown.set(backL);
      if (prop === 'Moon' && t - moonGlow < 2.5) {
        const a = Math.sin(Math.min(1, (t - moonGlow) / 2.5) * Math.PI), [mi, mj] = [moonAt[0] / CW, moonAt[1] / CW], glow = T('#fff0be');
        for (let n = 0; n < NN; n++) { const i = n % N, j = (n - i) / N, d = Math.hypot(i + 0.5 - mi, j + 0.5 - mj); if (d > 5 && d < 10 && dith(i, j, a * (1 - (d - 5) / 5))) shown[n] = glow; }
      }
      // a slow breath: the sitter settles one cell and rises again
      const dy = (1 - Math.cos(t * 1.15)) > 1.45 ? 1 : 0;
      liveL.fill(0);
      xf = tiltXf;
      const m = moods[moodIx], set = moodSet[m];
      const fresh = t - moodAt < 0.14, shut = (t > 0.5 && (t + 2.1) % gap < 0.16) || fresh;
      const lid = shut ? 1 : set[4], look = Math.sin(t * 0.21) > 0.6 ? 1 : Math.sin(t * 0.21) < -0.6 ? -1 : 0, wide = m === 'Surprised' ? 1.12 : 1;
      if (eyes === 'One eye') {
        drawEye('almond', [hcx - flip * 20, eyeY - 10], 1.14 * young * wide, lid, S1, look);
        brow(hcx - flip * 20, eyeY - 74 + set[0], 140, set[1] * 0.6, flip, true);
      } else {
        const [ka, kb] = eyeKinds[eyes];
        drawEye(ka[0], eyeA, ka[1] * young * wide, lid, S1, look);
        drawEye(kb[0], eyeB, kb[1] * young * wide, m === 'Sly' && !shut ? 0.1 : lid, lute ? T('#a8662e') : S2, look);
        if (eyes === 'Three eyes') drawEye('leaf', third, 0.62, shut ? 1 : 0.1, S1, look);
        brow(eyeA[0], eyeA[1] - 60 + browA * 20 + set[0], 118, set[1] + browA * 0.4, flip, true);
        brow(eyeB[0], eyeB[1] - 56 + browB * 20 + set[2], 96, set[3] + browB * 0.4, -flip, false);
      }
      if (m === 'Smile') for (const e of [eyeA, eyeB]) sprite(liveL, [e[0], e[1] + 50], ['l...l', '.lll.'], { l: LOWLID });
      if (lute) {
        // the sound hole is the mouth: a rosette that opens wider when the strings ring
        const ring = t - strumAt < 1.4;
        // two strings run up the neck and over the lower bout, broken by the face as a cubist would break them
        const sh = t - strumAt < 1.2 || t - pluckAt < 0.8 ? (Math.floor(t * 16) % 2 ? CW : -CW) : 0, top = Math.min(...head.map(p => p[1]));
        for (const q of [-1, 1]) {
          const sx0 = hcx + q * CW;
          let hov = 0;
          if (c.input.inside && Math.abs(c.input.x * 1000 - sx0) < CW * 2) hov = Math.floor(t * 6) % 2 ? q * CW : 0;
          seg(liveL, [sx0 + sh + hov, mouthY + 52], [sx0, hcy + 262], T('#e6d6ae'));
          seg(liveL, [sx0, top + 40], [sx0 + hov + (t - pluckAt < 0.8 ? sh : 0), 40], T('#e6d6ae'));
        }
        sprite(liveL, [mx, mouthY - 4], ring ? ['...ggg...', '.gg...gg.', '.g.ooo.g.', 'g.ooooo.g', 'g.ooooo.g', 'g.ooooo.g', '.g.ooo.g.', '.gg...gg.', '...ggg...'] : ['..ggg..', '.g...g.', 'g.ooo.g', 'g.ooo.g', 'g.ooo.g', '.g...g.', '..ggg..'], { g: T('#e0c27a'), o: T('#1a120c') });
        sprite(liveL, [hcx, hcy + 268], ['oooooooo', 'obbbbbbo', 'oooooooo'], { o: OL, b: T('#3a2616') });
        // the guitar plays itself now and then (unless you're playing it), and its notes float up and drift away
        if (t - strumAt > 3.6 && t - pluckAt > 4) strumAt = t;
        for (let q = 0; q < 3; q++) {
          const ph = (t - strumAt - q * 0.32) / 2.4; if (ph < 0 || ph > 1) continue;
          sprite(liveL, [mx + flip * (q === 1 ? -1 : 1) * (230 + ph * 170 + q * 30) + Math.sin(ph * 7 + q) * 26, mouthY - 40 - ph * 420 - q * 40], q === 1 ? ['.oooo', '.o..o', '.o..o', 'oo.oo', 'oo.oo'] : ['..oo', '..o.o', '..o..', 'ooo..', 'oo...'], { o: NOTEK }, flip < 0);
        }
      } else {
        drawMouth(m, fresh);
        drawMoustache();
      }
      drawEyewear();
      if (prop === 'Flower') drawFlower(t);
      else if (prop === 'Pipe') drawPipe(t);
      if (rose) drawRose(t);
      xf = p => p;
      if (prop === 'Bird' || prop === 'Dove') drawBird(t, prop === 'Dove');
      else if (prop === 'Fan') drawFan(t);
      else if (prop === 'Lemon') drawLemon(t);
      else if (prop === 'Cup') drawSteam(t);
      else if (prop === 'Guitar') drawStrings(t);
      // fallen petals drift down past the sitter and are gone
      petals = petals.filter(p => t - p[2] < 2.2);
      for (const [px, py, p0] of petals) { const k = t - p0, q = tiltXf([px, py]); dot(liveL, [q[0] + Math.round(Math.sin(k * 3) * 2) * CW, q[1] + k * 260], T('#c8283c')); }

      behind.set(shown);
      owned.fill(0);
      for (let n = NN - 1; n >= 0; n--) {
        const v = sitL[n] || liveL[n];
        const k = liveL[n] || sitL[n];
        if (!v) continue;
        const to = n + dy * N;
        if (to < NN) { shown[to] = k; owned[to] = 1; }
      }
      if (legend === 'Shattered') {
        // the reflection through the broken glass: each shard samples the picture a cell askew and tinted to its angle;
        // the cracks are bright with a dark edge; a tap mends the glass for a moment before it falls apart again, and
        // a glint runs out along each crack from the blow
        const b = brokenBy(t), k0 = c.input.inside ? at(c.input.x, c.input.y) : -1, hot = k0 >= 0 ? shard[k0] : -2;
        broke.set(shown);
        const gt = 200 + Math.floor(t * 9), shift = Math.round(b);
        for (let q = 0; q < glassAt.length; q++) {
          const n = glassAt[q], id = shard[n];
          if (crackM[n] && b > 0.5 && t >= crackAt[n]) { shown[n] = CRACKW; continue; }
          if (id < 0) continue;
          const d = shardDisp[id], i = n % N, j = (n - i) / N, ii = i - d[0] * shift, jj = j - d[1] * shift;
          const src = ii >= 0 && jj >= 0 && ii < N && jj < N ? broke[jj * N + ii] : broke[n];
          // the glass's old glare: two pale streaks drifting across the mirror; the edge of a shard under a crack is in shadow
          const gp = (i + j + gt) % 61, glare = gp < 3 || gp === 5;
          shown[n] = glassOf(src, b > 0.5 && underC[n] && t >= crackAt[n] ? 1 : glare || id === hot ? 2 : b < 0.5 ? 0 : (shardMode[id] + facetShift) % 3);
        }
        // a fresh blow flashes white where it struck
        const nb = blows[blows.length - 1];
        if (t - nb.born < 0.25) for (let a = 0; a < 12; a++) { const r = 1 + (t - nb.born) * 30, i = Math.floor(nb.x + Math.cos(a * 0.52) * r), j = Math.floor(nb.y + Math.sin(a * 0.52) * r); if (i >= 4 && j >= 4 && i < N - 4 && j < N - 4) shown[j * N + i] = GLINTW; }
        // holding a finger on the glass mends it: a ring of light closes in, then the glass is whole but for the first blow
        if (holdAt >= 0 && c.input.down) { const f = Math.min(1, (t - holdAt - 0.2) / 0.8); if (f > 0) for (let a = 0; a < 40; a++) { const r = 16 * (1 - f) + 3, i = Math.floor(c.input.x * N + Math.cos(a * 0.157) * r), j = Math.floor(c.input.y * N + Math.sin(a * 0.157) * r); if (i >= 4 && j >= 4 && i < N - 4 && j < N - 4) shown[j * N + i] = GILTHI; } }
        if (b > 0.5) for (const [ux, uy, ph, ix, iy] of rays) {
          const r = ((t * 14 + ph * 60) % 70) - 4;
          for (const q of [r, r - 1, r - 2]) { const i = Math.floor(ix + ux * q), j = Math.floor(iy + uy * q); if (i >= 4 && j >= 4 && i < N - 4 && j < N - 4) for (const [u, v] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]) { const n2 = (j + v) * N + i + u; if (crackM[n2]) shown[n2] = q === r ? GLINTW : CRACKW; } }
        }
        for (let q = 0; q < frameAt.length; q++) shown[frameAt[q]] = frameK[q];
      }
      if (legend === 'Plaster') {
        // a plaster cast in a dark gallery, lit by one lamp: the lamp is wherever the pointer is (or swings slowly across
        // the top by itself). The cast is pure ivory, modelled only by the light: bright on the side toward the lamp,
        // falling into shade away from it, its features a faint relief; it throws a long shadow on the wall, away from
        // the lamp and longer the lower the lamp hangs; the wall is lit in a pool round the lamp
        if (c.input.inside) { lampX += (c.input.x * N - lampX) * 0.35; lampY += (c.input.y * N - lampY) * 0.35; }
        else { lampX = N / 2 + Math.sin(t * 0.5 + 1) * N * 0.36; lampY = 13 + (1 - Math.cos(t * 0.5 + 1)) * 4; }
        const lx = lampX, ly = lampY;
        let ca = 0, cb = 0, cn = 0;
        for (let j = 0; j < N; j++) { let a = -1, b = -1; for (let i = 0; i < N; i++) if (owned[j * N + i]) { if (a < 0) a = i; b = i; ca += i; cb += j; cn++; } rowA[j] = a; rowB[j] = b; }
        const ccx = cn ? ca / cn : N / 2, ccy = cn ? cb / cn : N / 2, vx = ccx - lx, vy = ccy - ly, vl = Math.hypot(vx, vy) || 1, slen = 6 + Math.max(0, Math.min(16, (ly / N) * 20 + vl * 0.15));
        const shx = vx / vl, shy = vy / vl, sox = SOX, soy = SOY; for (let q = 0; q < 4; q++) { SOX[q] = Math.round(shx * slen * (q + 1) / 4); SOY[q] = Math.round(shy * slen * (q + 1) / 4); }
        for (let n = 0; n < NN; n++) {
          const i = n % N, j = (n - i) / N;
          if (owned[n]) {
            const a = rowA[j], b = rowB[j], w = Math.max(2, b - a), near = lx < a ? a : lx > b + 1 ? b + 1 : lx, u = Math.min(1, Math.abs(i + 0.5 - near) / (w * 0.95 + 1)), up = Math.max(0, Math.min(1, (j - ly) / 44));
            let lv = LVT[Math.floor(u * 16) * 9 + Math.floor(up * 8)];
            const edge = (i > 0 && !owned[n - 1]) || (i < N - 1 && !owned[n + 1]) || (j > 0 && !owned[n - N]) || (j < N - 1 && !owned[n + N]);
            if (edge) lv = Math.abs(i + 0.5 - lx) < Math.abs((i === a ? b : a) + 0.5 - lx) ? Math.min(4, lv + 1) : Math.max(0, lv - 1);
            else if (shown[n] === OL) lv = Math.max(0, lv - 1);   // the features: a faint relief, no drawn line
            castB[n] = IVORY[lv]; shown[n] = IVORY[lv];
          } else {
            const d2 = (i + 0.5 - lx) ** 2 + (j + 0.5 - ly) ** 2;
            let k = d2 < 90 || (d2 < 220 && ((i + j) & 1)) ? wallP[n] : wallD[n];
            for (let q = 0; q < 4; q++) { const si = i - sox[q], sj = j - soy[q]; if (si >= 0 && sj >= 0 && si < N && sj < N && owned[sj * N + si]) { k = q < 3 || ((i + j) & 1) ? wallS[n] : wallD[n]; break; } }
            castB[n] = 0; shown[n] = k;
          }
        }
        // turning the cast: it narrows to its edge, then comes round mirrored (the other side of the face to the front)
        const tf = (t - flipAt) / 0.5;
        if (tf >= 0.5 && tf < 0.6 && flipDone !== flipAt) { mirrored ^= 1; flipDone = flipAt; }
        const sc = tf >= 0 && tf < 1 ? Math.max(0.06, Math.abs(Math.cos(tf * Math.PI))) : 1;
        if (sc < 1 || mirrored) {
          wallB.set(shown); const cx0 = hcx / CW;
          for (let n = 0; n < NN; n++) if (castB[n]) shown[n] = wallD[n];
          for (let n = 0; n < NN; n++) { const i = n % N, j = (n - i) / N, u = (i + 0.5 - cx0) / sc, si = Math.floor(cx0 + (mirrored ? -u : u)); if (si >= 0 && si < N && castB[j * N + si]) shown[n] = castB[j * N + si]; }
        }
      }
      if (legend === 'Plaster') {
        // the lamp itself: a little brass shade, a bright bulb, and its glow
        const bx = Math.floor(lampX), by = Math.floor(lampY);
        for (let a = 0; a < 24; a++) { const x = Math.floor(lampX + Math.cos(a * 0.262) * 3.2), y = Math.floor(lampY + 1 + Math.sin(a * 0.262) * 3.2); if (x >= 0 && y >= 0 && x < N && y < N && (a & 1) && !owned[y * N + x]) shown[y * N + x] = LAMPG; }
        for (const [u, v, k] of [[-1, -1, LAMPS], [0, -1, LAMPS], [1, -1, LAMPS], [2, -1, LAMPS], [0, -2, LAMPS], [1, -2, LAMPS], [0, 0, LAMPB], [1, 0, LAMPB], [0, 1, LAMPB], [1, 1, LAMPW]]) { const x = bx + u, y = by + v; if (x >= 0 && y >= 0 && x < N && y < N) shown[y * N + x] = k; }
      }
      if (lute) {
        // the notes you plucked: in flight to the stave on an arc, then written there; during playback each lights red
        const slotAt = (q, p) => [musX[0] + 3 + q * 3, musTop + 3 + (8 - p)];
        for (const [x0, y0, born, q, p] of flying) {
          const f = Math.min(1, (t - born) / 0.6), [x1, y1] = slotAt(q, p), x = Math.floor(x0 + (x1 - x0) * f), y = Math.floor(y0 + (y1 - y0) * f - Math.sin(f * Math.PI) * 10);
          const lit = t - playAt >= q * 0.22 && t - playAt < q * 0.22 + 0.3, col = f < 1 || lit ? NOTEK : NOTEB;
          for (const [u, v] of [[0, 0], [1, 0], [0, 1], [1, 1], [1, -1], [1, -2], [1, -3]]) { const i = x + u, j = y + v; if (i >= 0 && j >= 0 && i < N && j < N) shown[j * N + i] = col; }
          if (f >= 1 && lit) for (const [u, v] of [[-1, 0], [2, 0], [0, 1], [1, 1]]) { const i = x + u, j = y + v; if (i >= 0 && j >= 0 && i < N && j < N) shown[j * N + i] = NOTEK; }
        }
      }
      for (let n = 0; n < NN; n++) img32[n] = toneWord[shown[n]];
      sx2.putImageData(img, 0, 0);
      ctx.resetTransform();
      ctx.imageSmoothingEnabled = false; ctx.drawImage(small, 0, 0, S, S);   // hard cells, never smoothed
    };
    frame(0);
    return frame;
  },
});

})(window.Proto);
