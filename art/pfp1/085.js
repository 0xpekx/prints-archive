// Little Steamers: from D:/code/synaesthesia/public/drop03/pieces/085.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 085 Little Steamers: dim sum dumplings with faces, painted in loose watercolour and fineliner.
Proto.add({
  num: 85,
  name: 'Little Steamers',
  fam: 'Things with Faces',
  recipe: 'A dumpling with a face sitting in its dish, painted in soft watercolour washes on textured paper with a brown fineliner that thickens on the shadow side, while steam curls up. The kind of dumpling (from bao and gyoza to wontons, sesame balls and a rare hedgehog bun), its dish, the paper, the wash and how it was laid, the face (sometimes one whole expression: asleep, puffed up, laughing, side-eyeing or scalded) and where it sits on the dough, the cheeks, a topper, a garnish and a side treat on the table all vary; a fortune cookie is coveted, and once in a long while the dumpling is a koi bun in a lotus pond or a spirit made of steam.',
  interactive: 'Poke the dumpling to make it squeak. Hold to squash it.',
  music: true,
  fps: 30,
  seed: 36,
  make(c) {
    const N = c.size, k = N * 0.001;
    // an LCG seeded by FNV-1a over the hash text; tempered output
    let h = 2166136261;
    for (let i = 0; i < c.hash.length; i++) { h ^= c.hash.charCodeAt(i); h = Math.imul(h, 16777619); }
    let lcg = h >>> 0;
    const rn = () => {
      lcg = Math.imul(lcg, 1664525) + 1013904223 >>> 0;
      let y = lcg ^ (lcg >>> 11); y ^= (y << 7) & 0x9d2c5680; y ^= (y << 15) & 0xefc60000; y ^= y >>> 18;
      return (y >>> 0) * 2.3283064365386963e-10;
    };
    const pickW = (arr) => { let t = 0; for (const a of arr) t += a.w; let x = rn() * t; for (const a of arr) { x -= a.w; if (x < 0) return a; } return arr[0]; };

    const kind0 = pickW([
      { n: 'Bao', w: 22 }, { n: 'Soup Dumpling', w: 20 }, { n: 'Gyoza', w: 18 }, { n: 'Har Gow', w: 16 }, { n: 'Siu Mai', w: 14 }, { n: 'Peach Bun', w: 7 }, { n: 'Golden Bao', w: 3 },
    ]);
    let wash = pickW([
      { n: 'Jade', w: 18, c: [120, 180, 150] }, { n: 'Persimmon', w: 16, c: [236, 140, 96] }, { n: 'Ink Blue', w: 16, c: [92, 128, 186] },
      { n: 'Plum', w: 14, c: [176, 108, 150] }, { n: 'Ochre', w: 14, c: [214, 168, 82] }, { n: 'Rose', w: 14, c: [232, 140, 150] }, { n: 'Moonlit', w: 4, c: [60, 70, 120] },
    ]);
    const dish0 = pickW([{ n: 'Bamboo Steamer', w: 50 }, { n: 'Blue Plate', w: 22 }, { n: 'Lotus Leaf', w: 18 }, { n: 'Red Lacquer', w: 10 }]);
    const eyes0 = pickW([{ n: 'Dots', w: 26 }, { n: 'Content', w: 20 }, { n: 'Sparkle', w: 18 }, { n: 'Sleepy', w: 14 }, { n: 'Teary', w: 8 }, { n: 'Wink', w: 10 }, { n: 'Starry', w: 4 }]);
    const mouth0 = pickW([{ n: 'Tiny Smile', w: 26 }, { n: 'Open', w: 18 }, { n: 'Cat', w: 16 }, { n: 'Pout', w: 12 }, { n: 'Drool', w: 10 }, { n: 'Yawn', w: 10 }, { n: 'Tongue', w: 8 }]);
    let garnish = pickW([{ n: 'None', w: 32 }, { n: 'Chopsticks', w: 18 }, { n: 'Scallion', w: 14 }, { n: 'Sesame', w: 12 }, { n: 'Soy Dish', w: 10 }, { n: 'Little Sibling', w: 8 }, { n: 'Lucky Dot', w: 6 }]);

    const jitter = new Float32Array(4000);
    for (let i = 0; i < jitter.length; i++) jitter[i] = rn() * 2 - 1;
    let jp = 0;
    const J = () => jitter[(jp++) % jitter.length];
    const steamPh = rn() * 10, blinkPh = rn() * 4, breathPh = rn() * 6;

    // ---------- the second menu: a splitmix stream on its own slice of the hash ----------
    // (every roll above keeps its value; these widen the menu and add new axes)
    let sm = parseInt(c.hash.slice(26, 34), 16) >>> 0;
    const sr = () => { sm = (sm + 0x9e3779b9) >>> 0; let z = sm; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b); z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const spick = (arr) => { let t = 0; for (const a of arr) t += a[1]; let x = sr() * t; for (const a of arr) { x -= a[1]; if (x < 0) return a[0]; } return arr[0][0]; };
    let K = sr() < 0.42 ? spick([['Wonton', 14], ['Jade Dumpling', 12], ['Sesame Ball', 11], ['Pineapple Bun', 11], ['Lava Bun', 10], ['Hedgehog Bun', 4], ['Bunny Bao', 3], ['Charcoal Bao', 3]]) : kind0.n;
    let dishN = sr() < 0.3 ? spick([['Stacked Steamers', 14], ['Celadon Plate', 12], ['Banana Leaf', 10]]) : dish0.n;
    let E = sr() < 0.4 ? spick([['Big Sparkle', 10], ['Shy', 10], ['Determined', 8], ['Dizzy', 6], ['Happy Tears', 6], ['Dot Brows', 8], ['Jade Glint', 2]]) : eyes0.n;
    let M = sr() < 0.4 ? spick([['Fang Grin', 9], ['Nom', 8], ['Whistle', 8], ['Wobbly', 8], ['Kiss', 5], ['Big Laugh', 8]]) : mouth0.n;
    let cheeks = spick([['Rosy', 50], ['Peachy', 12], ['Freckled', 10], ['Hearts', 8], ['Swirls', 7], ['None', 8], ['Steamy Flush', 5]]);
    let topper = spick([['None', 40], ['Goji Berry', 10], ['Leaf Hat', 9], ['Chef Hat', 7], ['Tiny Bow', 8], ['Plum Blossom', 8], ['Hairpin', 6], ['Paper Crown', 3]]);
    let prop = spick([['None', 32], ['Teacup', 12], ['Teapot', 9], ['Chili Oil', 9], ['Plum Sprig', 9], ['Egg Tart', 8], ['Steamer Lid', 8], ['Paper Lantern', 5]]);
    const paper = spick([['Cotton White', 54], ['Cream', 22], ['Rice Paper', 12], ['Kraft', 9], ['Gold Flecked', 3]]);
    let laid = spick([['Bloom', 46], ['Band', 16], ['Two-Tone', 14], ['Drips', 10], ['Splash', 10], ['Gold Leaf', 4]]);
    const sj = []; for (let i = 0; i < 40; i++) sj.push(sr());
    const topGarnish = garnish.n === 'Scallion' || garnish.n === 'Sesame' || garnish.n === 'Lucky Dot';
    if ((topGarnish || K === 'Bunny Bao') && (topper === 'Chef Hat' || topper === 'Leaf Hat' || topper === 'Paper Crown')) topper = topper === 'Paper Crown' ? 'Goji Berry' : 'Plum Blossom';
    // legendaries and the coveted fortune cookie roll from their own xorshift128 on two other slices
    // of the hash, after every other draw, so ordinary dumplings (and the opening one) keep their looks
    let xa = parseInt(c.hash.slice(42, 50), 16) | 1, xb = (parseInt(c.hash.slice(58, 66), 16) ^ 0x6b43a9b5) | 0, xc = 0x1f123bb5, xd = 0x5491333;
    const x128 = () => { const tt = xa ^ (xa << 11); xa = xb; xb = xc; xc = xd; xd = (xd ^ (xd >>> 19)) ^ (tt ^ (tt >>> 8)); return (xd >>> 0) / 4294967296; };
    for (let i = 0; i < 8; i++) x128();
    const lroll = x128(), groll = x128();
    const legend = lroll < 0.0011 ? 'Koi Bun' : lroll < 0.002 ? 'Steam Spirit' : '';
    if (!legend && groll < 0.005) prop = 'Fortune Cookie';
    if (legend) {
      K = legend; topper = 'None';
      if (topGarnish) garnish = { n: 'None' };
      if (legend === 'Koi Bun') wash = { n: 'Lotus Pond', c: [92, 128, 186] };
      if (legend === 'Steam Spirit') wash = { n: 'Moonlit', c: [60, 70, 120] };
      c.trait('Legendary', legend);
    }
    // ---------- the third menu: whole-face expressions, where the face sits, chopsticks, and a gentler
    // balance of the big axes; on its own stream (hash 34..42) so every roll above keeps its value ----------
    let fm = parseInt(c.hash.slice(34, 42), 16) >>> 0;
    const fr = () => { fm = (fm + 0x6d2b79f5) >>> 0; let z = fm; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const fpick = arr => { let t = 0; for (const a of arr) t += a[1]; let x = fr() * t; for (const a of arr) { x -= a[1]; if (x < 0) return a[0]; } return arr[0][0]; };
    const fRoll = fr(), fWhole = fpick([['Asleep', 22], ['Puffed Cheeks', 20], ['Laughing', 22], ['Side-Eye', 18], ['Hot Hot', 18]]);
    let place = fpick([['Centre', 27], ['High', 17], ['Low', 15], ['Left', 9], ['Right', 9], ['Looking Up', 12], ['Peeking', 8]]);
    const gapJ = 0.9 + fr() * 0.2, chopUp = fr() < 0.5, rb = [fr(), fr(), fr(), fr(), fr(), fr()];
    if (laid === 'Bloom' && rb[0] < 0.4) laid = ['Band', 'Two-Tone', 'Two-Tone', 'Drips', 'Splash', 'Splash'][Math.floor(rb[3] * 6)];
    if (cheeks === 'Rosy' && rb[1] < 0.4) cheeks = ['Peachy', 'Peachy', 'Freckled', 'Hearts', 'Swirls', 'None', 'Steamy Flush'][Math.floor(rb[4] * 7)];
    if (dishN === 'Bamboo Steamer' && rb[2] < 0.22) dishN = ['Blue Plate', 'Lotus Leaf', 'Celadon Plate', 'Banana Leaf', 'Red Lacquer'][Math.floor(rb[5] * 5)];
    const pleated = K === 'Bao' || K === 'Golden Bao' || K === 'Charcoal Bao' || K === 'Bunny Bao' || K === 'Soup Dumpling' || K === 'Har Gow' || K === 'Jade Dumpling' || K === 'Wonton';
    if (place === 'Peeking' && !pleated) place = 'High';
    if (legend) place = 'Centre';
    // the stock sticker faces (dot or content eyes over a tiny smile) always become a whole-face expression
    const sticker = (E === 'Dots' || E === 'Content') && (M === 'Tiny Smile' || M === 'Cat');
    const face = legend || place === 'Peeking' ? '' : sticker || fRoll < 0.22 ? fWhole : '';
    if (place === 'Peeking') { E = 'Peeping'; M = 'Hidden'; }
    // chopsticks never lie across the face: they hover over the bun about to pinch it, or rest beside the dish
    if (garnish.n === 'Chopsticks') garnish = { n: legend ? 'None' : chopUp ? 'Chopsticks Poised' : 'Chopsticks on a Rest' };
    const chop = garnish.n.startsWith('Chopsticks');
    // the new paintwork (wet edges, backruns, loose band and drips) draws its wobble here, not from J()
    let wm = (fm ^ 0x2545f491) >>> 0;
    const W = () => { wm = (wm + 0x6d2b79f5) >>> 0; let z = wm; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 2147483648 - 1; };
    c.trait('Dumpling', K);
    c.trait('Wash', wash.n);
    c.trait('Laid As', laid);
    c.trait('Paper', paper);
    c.trait('Dish', dishN);
    if (face) c.trait('Expression', face); else { c.trait('Eyes', E); c.trait('Mouth', M); }
    c.trait('Face Sits', place);
    if (face) { E = ''; M = ''; }
    c.trait('Cheeks', cheeks);
    c.trait('Topper', topper);
    c.trait('Garnish', garnish.n);
    c.trait('Side Treat', prop);

    const PEN = 'rgba(74,52,38,0.95)';
    const dark = wash.n === 'Moonlit', coal = K === 'Charcoal Bao';
    const FPEN = coal ? 'rgba(255,246,228,0.95)' : K === 'Steam Spirit' ? 'rgba(30,38,80,0.92)' : PEN;
    const rgba = (cc, a) => 'rgba(' + cc[0] + ',' + cc[1] + ',' + cc[2] + ',' + a + ')';
    const canvas = () => { const cv = document.createElement('canvas'); cv.width = cv.height = N; const g = cv.getContext('2d'); g.setTransform(k, 0, 0, k, 0, 0); g.lineCap = 'round'; g.lineJoin = 'round'; return [cv, g]; };

    // a watercolour wash: several jittered, translucent fills of a polygon, plus a darker pooled edge
    const smooth = (g, pts) => {
      const n = pts.length, last = pts[n - 1];
      g.beginPath();
      g.moveTo(0.5 * (last[0] + pts[0][0]), 0.5 * (last[1] + pts[0][1]));
      for (let i = 0; i < n; i++) { const p = pts[i], q = pts[i + 1 === n ? 0 : i + 1]; g.quadraticCurveTo(p[0], p[1], 0.5 * (p[0] + q[0]), 0.5 * (p[1] + q[1])); }
      g.closePath();
    };
    const washOf = (g, pts, col, alpha, spread, layers = 5) => {
      const cxs = pts.reduce((s, p) => s + p[0], 0) / pts.length, cys = pts.reduce((s, p) => s + p[1], 0) / pts.length;
      for (let l = 0; l < layers; l++) {
        const sh = 1 - l * 0.035;
        const q = pts.map(p => [cxs + (p[0] - cxs) * sh + J() * spread, cys + (p[1] - cys) * sh + J() * spread]);
        g.fillStyle = rgba(col, alpha); smooth(g, q); g.fill();
      }
      const q = pts.map(p => [p[0] + J() * spread * 0.4, p[1] + J() * spread * 0.4]);
      g.strokeStyle = rgba(col.map(v => v * 0.75 | 0), alpha * 1.6); g.lineWidth = 5; smooth(g, q); g.stroke();
    };
    // a wash that only lies in the band between an outline and a smaller copy of it (shading along an edge)
    const washRing = (g, outer, inner, col, alpha, spread, layers) => {
      for (let l = 0; l < layers; l++) {
        const o = outer.map(p => [p[0] + J() * spread * 0.3, p[1] + J() * spread * 0.3]), q = inner.map(p => [p[0] + J() * spread, p[1] + J() * spread]).reverse();
        g.fillStyle = rgba(col, alpha); smooth(g, o); const n = q.length;
        g.moveTo(0.5 * (q[n - 1][0] + q[0][0]), 0.5 * (q[n - 1][1] + q[0][1]));
        for (let i = 0; i < n; i++) { const p = q[i], r = q[(i + 1) % n]; g.quadraticCurveTo(p[0], p[1], 0.5 * (p[0] + r[0]), 0.5 * (p[1] + r[1])); }
        g.fill('evenodd');
      }
    };
    const ellipsePts = (x, y, rx, ry, n = 36, a0 = 0, a1 = Math.PI * 2) => { const o = []; for (let i = 0; i < n; i++) { const a = a0 + (a1 - a0) * i / n; o.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry]); } return o; };
    const pen = (g, fn, w = 5, col = PEN) => {
      g.strokeStyle = col; g.lineWidth = w; fn(g); g.stroke();
      g.save(); g.translate(J() * 2, J() * 2); g.globalAlpha = 0.35; g.lineWidth = w * 0.6; fn(g); g.stroke(); g.restore();
    };
    // a fineliner outline whose weight swells on the shadow side (lower right) and thins in the light
    const inkLine = (g, pts, base, col = PEN) => {
      const n = pts.length; let cx0 = 0, cy0 = 0;
      for (const p of pts) { cx0 += p[0] / n; cy0 += p[1] / n; }
      g.strokeStyle = col;
      for (let i = 0; i < n; i++) {
        const a = pts[(i + n - 1) % n], p = pts[i], b = pts[(i + 1) % n];
        const dx = p[0] - cx0, dy = p[1] - cy0, dl = Math.hypot(dx, dy) || 1, lit = (dx * 0.55 + dy * 0.83) / dl;
        g.lineWidth = base * (0.5 + Math.max(0, lit) * 1.25 + J() * 0.08);
        g.beginPath(); g.moveTo((a[0] + p[0]) / 2, (a[1] + p[1]) / 2); g.quadraticCurveTo(p[0], p[1], (p[0] + b[0]) / 2, (p[1] + b[1]) / 2); g.stroke();
      }
      g.save(); g.translate(J() * 2, J() * 2); g.globalAlpha = 0.3; g.lineWidth = base * 0.5; smooth(g, pts); g.stroke(); g.restore();
    };

    // ---------- the dumpling's silhouette ----------
    const BX = 500, BY = 700, y0 = BY - 10;
    const ring = fn => { const o = []; for (let i = 0; i < 48; i++) { const a = Math.PI + i / 48 * Math.PI * 2; o.push(fn(Math.cos(a), Math.sin(a), i)); } return o; };
    const domed = K === 'Koi Bun' || K === 'Steam Spirit' || K === 'Bao' || K === 'Golden Bao' || K === 'Charcoal Bao' || K === 'Pineapple Bun' || K === 'Lava Bun' || K === 'Hedgehog Bun' || K === 'Bunny Bao';
    const peaked = K === 'Soup Dumpling' || K === 'Har Gow' || K === 'Jade Dumpling';
    let outline, fy = BY - 170, sesameC = BY - 190, wontonC = BY - 150;
    if (domed) {
      const W = K === 'Hedgehog Bun' ? 290 : 300, H = K === 'Hedgehog Bun' ? 340 : K === 'Koi Bun' ? 300 : 350;
      outline = ring((sx, sy) => sy < 0 ? [BX + sx * W, y0 - H * Math.pow(-sy, 0.85)] : [BX + sx * W * (1 - 0.03 * sy), y0 + sy * 30]);
    } else if (peaked) {
      const W = K === 'Har Gow' ? 270 : K === 'Jade Dumpling' ? 282 : 300;
      outline = ring((sx, sy) => {
        if (sy >= 0) return [BX + sx * W, y0 + sy * 30];
        const peak = Math.pow(-sy, 6);
        return [BX + sx * W * (1 - peak * 0.55), y0 + sy * 380 * 0.95 - peak * 60];
      });
    } else if (K === 'Peach Bun') {
      outline = ring((sx, sy) => {
        if (sy >= 0) return [BX + sx * 300, y0 + sy * 30];
        const p = Math.pow(-sy, 10);
        return [BX + sx * 300 * (1 - p * 0.5), y0 + sy * 340 - p * 70];
      });
    } else if (K === 'Gyoza') {
      outline = ring((sx, sy, i) => sy < 0
        ? [BX + sx * 345, y0 + 20 - (-sy) * 270 * (0.45 + 0.55 * (1 - sx * sx)) - (-sy > 0.45 && i % 2 ? 9 : 0)]
        : [BX + sx * 345, y0 + 20 + sy * 34 - Math.pow(sx, 4) * 24]);
      fy = BY - 130;
    } else if (K === 'Sesame Ball') {
      outline = ring((sx, sy) => [BX + sx * 245, sesameC + sy * 245 * (sy > 0 ? 0.86 : 1)]);
      fy = BY - 190;
    } else if (K === 'Siu Mai') {
      outline = [];
      for (let j = 0; j <= 10; j++) { const t = j / 10; outline.push([BX - 255 + Math.sin(t * Math.PI) * 22, BY + 20 - t * 340]); }
      for (let j = 1; j < 16; j++) { const t = j / 16; outline.push([BX - 255 + t * 510, BY - 320 - (j % 2 ? 14 : 0) - Math.sin(t * Math.PI) * 16]); }
      for (let j = 10; j >= 0; j--) { const t = j / 10; outline.push([BX + 255 - Math.sin(t * Math.PI) * 22, BY + 20 - t * 340]); }
      for (let j = 1; j < 10; j++) { const t = j / 10; outline.push([BX + 255 - t * 510, BY + 20 + Math.sin(t * Math.PI) * 26]); }
    } else { // Wonton: a round purse gathered at the neck into a ruffle
      const cy = wontonC, r = 235;
      outline = [];
      for (let j = 0; j <= 26; j++) { const a = -0.96 + j / 26 * (Math.PI + 1.92); outline.push([BX + Math.cos(a) * r, cy + Math.sin(a) * r * 0.92]); }
      outline.push([BX - 62, cy - 232]);
      for (let j = 0; j <= 14; j++) { const t = j / 14; outline.push([BX - 175 + t * 350, cy - 300 - Math.sin(t * Math.PI) * 40 - (j % 2 ? 0 : 22)]); }
      outline.push([BX + 62, cy - 232]);
      fy = BY - 140;
    }
    // a hint of the hand: a very small, smooth wobble (never lumpy)
    const wob1 = sj[2] * 6.28, wob2 = sj[3] * 6.28;
    outline = outline.map(([x, y]) => { const a = Math.atan2(y - (BY - 170), x - BX); const f = 1 + 0.007 * Math.sin(3 * a + wob1) + 0.005 * Math.sin(5 * a + wob2); return [BX + (x - BX) * f, BY - 170 + (y - BY + 170) * f]; });
    let minX = 1e9, maxX = -1e9, topY = 1e9, botY = -1e9;
    for (const [x, y] of outline) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); topY = Math.min(topY, y); botY = Math.max(botY, y); }
    const bw = (maxX - minX) / 2, bh = botY - topY;
    // where a side topper sits: the outline's furthest point up and to the left, tucked in a little
    let A = outline[0], best = -1e9;
    for (const p of outline) { const v = -(p[0] - BX) * 0.55 - p[1] * 0.83; if (v > best) { best = v; A = p; } }
    A = [A[0] + (BX - A[0]) * 0.06, A[1] + 16];
    const topAt = x => { let bestD = 1e9, yy = topY; for (const p of outline) if (p[1] < BY - 60) { const d = Math.abs(p[0] - x); if (d < bestD) { bestD = d; yy = p[1]; } } return yy; };

    // ---------- where the face sits, how far apart the eyes are and how big (per kind, nudged per mint) ----------
    const [kGap, kEs] = legend ? [78, 1] : ({ 'Gyoza': [96, 0.8], 'Siu Mai': [62, 1.15], 'Har Gow': [62, 0.85], 'Jade Dumpling': [66, 0.9], 'Soup Dumpling': [70, 0.95], 'Wonton': [58, 1.1], 'Sesame Ball': [68, 0.9],
      'Pineapple Bun': [86, 0.95], 'Hedgehog Bun': [58, 0.82], 'Peach Bun': [72, 1.05], 'Lava Bun': [80, 1], 'Charcoal Bao': [82, 1.05], 'Bunny Bao': [70, 1.1] }[K] || [78, 1]);
    const gap = Math.round(kGap * (legend ? 1 : gapJ)), es = kEs;
    let fx = BX, FS = place === 'Peeking' ? 1.05 : 1.3, tilt = 0, gzx = 0, gzy = 0;
    // the face never climbs into the pleats or slides off the bottom
    const pleatEnd = K === 'Bao' || K === 'Golden Bao' || K === 'Charcoal Bao' || K === 'Bunny Bao' ? topY + 112 : peaked ? topY + 198 : K === 'Wonton' ? wontonC - 206 : K === 'Siu Mai' ? BY - 284 : topY + 40;
    if (place === 'Left' || place === 'Right') { const sd = place === 'Left' ? -1 : 1; fx = BX + sd * bw * 0.15; tilt = sd * 0.08; gzx = sd * 5; }
    if (place === 'Looking Up') { gzy = -8; tilt = (sj[5] - 0.5) * 0.12; }
    if (place === 'Peeking') fy = Math.max(pleatEnd + 4, Math.min(fy - 20, Math.max(topAt(fx - gap * FS), topAt(fx + gap * FS)) + 44));
    else {
      const fits = dy => fy + dy - 30 * FS * es > Math.max(pleatEnd, topAt(fx - gap * FS) + 30, topAt(fx + gap * FS) + 30) && fy + dy + 100 * FS < botY - 22;
      let dy = { 'High': -52, 'Low': 46, 'Looking Up': -30 }[place] || 0;
      while (dy !== 0 && !fits(dy)) dy += dy > 0 ? -2 : 2;
      fy += dy;
    }

    // ---------- background ----------
    const [bgc, bg] = canvas();
    const paperCol = { 'Cotton White': '#fbf6ec', 'Cream': '#f6ecd6', 'Rice Paper': '#f8f3e6', 'Kraft': '#e3cfab', 'Gold Flecked': '#f7f0e0' }[paper];
    bg.fillStyle = paperCol; bg.fillRect(0, 0, 1000, 1000);
    if (dark) { bg.fillStyle = 'rgba(70,80,130,0.2)'; bg.fillRect(0, 0, 1000, 1000); }
    if (paper === 'Rice Paper') {
      bg.strokeStyle = 'rgba(150,130,100,0.16)'; bg.lineWidth = 1.6;
      for (let i = 0; i < 70; i++) { const x = 500 + J() * 520, y = 500 + J() * 520, a = J() * 3, l = 30 + Math.abs(J()) * 70; bg.beginPath(); bg.moveTo(x, y); bg.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + J() * 10, y + Math.sin(a) * l * 0.5 + J() * 10, x + Math.cos(a) * l, y + Math.sin(a) * l); bg.stroke(); }
    }
    const second = [[120, 180, 150], [236, 140, 96], [92, 128, 186], [176, 108, 150], [214, 168, 82], [232, 140, 150]].filter(cc => cc[0] !== wash.c[0])[Math.floor(sj[4] * 5)];
    const wa = dark ? 0.32 : paper === 'Kraft' ? 0.18 : 0.14;
    if (laid === 'Band') {
      // one loose sweep of a wide flat brush: it starts heavy, thins and swells as it goes, and breaks up
      // into dry-brush streaks where the paint ran out (never a ruled rectangle)
      const x0 = 70 + W() * 40, x1 = 900 + W() * 50, cy = 400 + W() * 40, slope = W() * 0.12, ph = W() * 3, top = [], bot = [];
      for (let i = 0; i <= 24; i++) {
        const u = i / 24, x = x0 + (x1 - x0) * u, th = (130 + 70 * Math.sin(u * 3.1 + ph)) * Math.min(1, u * 7 + 0.25) * (u > 0.82 ? 1 - (u - 0.82) * 2.4 : 1);
        top.push([x, cy + slope * (x - 500) - th * 0.55 + W() * 16]); bot.unshift([x, cy + slope * (x - 500) + th * 0.45 + W() * 20]);
      }
      washOf(bg, top.concat(bot), wash.c, wa * 1.05, 10, 5);
      washOf(bg, top.slice(2, 18).concat(bot.slice(7, 23)).map(([x, y]) => [x, y + (cy - y) * 0.35]), wash.c, wa * 0.5, 16, 3);
      bg.strokeStyle = rgba(wash.c, (wa * 1.6).toFixed(3)); bg.lineCap = 'round';
      for (let i = 0; i < 9; i++) {
        const yy = cy + slope * (x1 - 500) + (i - 4) * 22 + W() * 6, xs = x1 - 60 - Math.abs(W()) * 50;
        for (let s2 = xs; s2 < x1 + 40 + W() * 40;) { const len = 16 + Math.abs(W()) * 40; bg.lineWidth = 3 + Math.abs(W()) * 7; bg.beginPath(); bg.moveTo(s2, yy + slope * (s2 - xs)); bg.lineTo(s2 + len, yy + slope * (s2 + len - xs)); bg.stroke(); s2 += len + 6 + Math.abs(W()) * 18; }
      }
    } else if (laid === 'Drips') {
      // the wash was tilted while still wet: pigment pooled along its lower edge and 3-5 uneven runs crawl
      // down out of that edge (beside the dumpling, where they show), thinning as they go, each ending in a soft bead
      const WX = 500 + W() * 30, WY = 300, RX = 440, RY = 215;
      washOf(bg, ellipsePts(WX, WY, RX, RY, 40), wash.c, wa, 30, 6);
      washOf(bg, ellipsePts(WX + 20 + W() * 50, WY - 30, 310, 160, 30), wash.c, wa * 0.72, 40, 4);
      const edgeY = x => WY + RY * Math.sqrt(Math.max(0, 1 - ((x - WX) / RX) ** 2));
      // the pooled rim: a darker crescent hugging the bottom edge
      const rim = [];
      for (let i = 0; i <= 20; i++) { const a = 0.1 * Math.PI + i / 20 * 0.8 * Math.PI; rim.push([WX + Math.cos(a) * RX * 0.995, WY + Math.sin(a) * RY * 0.995]); }
      for (let i = 20; i >= 0; i--) { const a = 0.1 * Math.PI + i / 20 * 0.8 * Math.PI; rim.push([WX + Math.cos(a) * RX * 0.96, WY + Math.sin(a) * RY * 0.8]); }
      washOf(bg, rim, wash.c, wa * 0.8, 4, 3);
      const fillSoft = (pts, col, alpha, layers) => { for (let l = 0; l < layers; l++) { const sh = 1 - l * 0.03, mx = pts.reduce((s, p) => s + p[0], 0) / pts.length, my = pts.reduce((s, p) => s + p[1], 0) / pts.length; bg.fillStyle = rgba(col, alpha); smooth(bg, pts.map(([x, y]) => [mx + (x - mx) * sh + W() * 1.5, my + (y - my) * sh + W() * 1.5])); bg.fill(); } };
      // where a run can fall in sight: beside the dumpling, or above its shoulder with room to spare
      const room = x => (x < minX - 6 || x > maxX + 6 ? 860 : topAt(x) - 30) - edgeY(x);
      const spots = []; for (let x = WX - RX * 0.84; x <= WX + RX * 0.84; x += 8) if (room(x) > 90) spots.push(x);
      const runs = 3 + Math.floor(Math.abs(W()) * 2.99), made = [];
      for (let d2 = 0; d2 < runs * 4 && made.length < runs && spots.length; d2++) {
        const sd = d2 % 2 ? 1 : -1, side = spots.filter(x => (x - WX) * sd > 0), pool = side.length ? side : spots;
        // favour the spots nearest the dumpling, so the runs read as part of the picture, not bars at the frame edge
        pool.sort((p, q) => Math.abs(p - WX) - Math.abs(q - WX));
        const x = pool[Math.floor(Math.pow(Math.abs(W()), 1.6) * Math.min(pool.length, 14))];
        if (made.some(m => Math.abs(m - x) < 46)) continue;
        made.push(x);
        const ys = edgeY(x) - 26, len = Math.min(room(x) - 10, (made.length === 1 ? 170 : 70) + Math.abs(W()) * 190), w0 = 9 + Math.abs(W()) * 11, bend = W() * 14;
        const wid = t => t < 0.14 ? w0 * (2 - t / 0.14) : w0 * (1 - 0.62 * (t - 0.14) / 0.86);
        const L = [], R = [];
        for (let i = 0; i <= 10; i++) { const t = i / 10, xx = x + bend * t * t + Math.sin(t * 5 + x) * 2, yy = ys + t * len; L.push([xx - wid(t), yy]); R.unshift([xx + wid(t), yy]); }
        fillSoft(L.concat(R), wash.c, wa * 1.35, 3);
        const bx = x + bend, by = ys + len + w0 * 0.3;
        fillSoft(ellipsePts(bx, by, w0 * 0.68, w0 * 0.8, 14), wash.c.map(v => v * 0.85 | 0), wa * 1.6, 3);
        fillSoft(ellipsePts(bx - w0 * 0.2, by - w0 * 0.25, w0 * 0.22, w0 * 0.26, 10), [255, 255, 255], 0.25, 1);
      }
    } else {
      washOf(bg, ellipsePts(laid === 'Two-Tone' ? 420 : 500, 430, 430, 360, 40), wash.c, wa, 40, 6);
      washOf(bg, ellipsePts(520 + J() * 60, 380, 300, 250, 30), wash.c, wa * 0.72, 50, 4);
      if (laid === 'Two-Tone') { washOf(bg, ellipsePts(660, 380, 300, 280, 36), second, wa * 0.9, 46, 5); washOf(bg, ellipsePts(560, 420, 140, 160, 24), second, wa * 0.5, 30, 3); }
    }
    // a few blooms and splatters
    const nSplat = laid === 'Splash' ? 70 : 26;
    for (let i = 0; i < nSplat; i++) {
      const x = 500 + J() * 480, y = 450 + J() * 440, r = (laid === 'Splash' ? 4 : 3) + Math.abs(J()) * (laid === 'Splash' ? 20 : 12);
      bg.fillStyle = rgba(i % 5 === 0 && laid === 'Splash' ? second : wash.c, 0.18 + Math.abs(J()) * 0.2); bg.beginPath(); bg.arc(x, y, r, 0, 7); bg.fill();
    }
    if (laid === 'Splash') {
      bg.strokeStyle = rgba(wash.c, 0.3); bg.lineCap = 'round';
      for (let i = 0; i < 6; i++) { const a = J() * 3.14, r0 = 360 + Math.abs(J()) * 80; bg.lineWidth = 4 + Math.abs(J()) * 6; bg.beginPath(); bg.moveTo(500 + Math.cos(a) * r0, 430 + Math.sin(a) * r0 * 0.9); bg.lineTo(500 + Math.cos(a) * (r0 + 80), 430 + Math.sin(a) * (r0 + 80) * 0.9); bg.stroke(); }
    }
    if (laid === 'Gold Leaf' || paper === 'Gold Flecked') {
      const many = laid === 'Gold Leaf' ? 22 : 40;
      for (let i = 0; i < many; i++) {
        const x = 500 + J() * 470, y = laid === 'Gold Leaf' ? 300 + J() * 260 : 500 + J() * 480, s = laid === 'Gold Leaf' ? 10 + Math.abs(J()) * 26 : 3 + Math.abs(J()) * 5;
        bg.fillStyle = i % 3 ? 'rgba(222,178,72,0.85)' : 'rgba(246,214,120,0.9)'; bg.beginPath();
        for (let q = 0; q < 5; q++) { const a = q * 1.2566 + J() * 0.4, r = s * (0.6 + Math.abs(J()) * 0.5); bg.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
        bg.fill();
      }
    }
    if (dark) {
      bg.fillStyle = 'rgba(255,250,220,0.9)';
      for (let i = 0; i < 16; i++) { bg.beginPath(); bg.arc(500 + J() * 460, 230 + J() * 200, 2 + Math.abs(J()) * 4, 0, 7); bg.fill(); }
      washOf(bg, ellipsePts(800, 170, 70, 70, 24), [255, 240, 190], 0.25, 6, 4);
    }

    if (K === 'Koi Bun') {
      // a lotus pond behind the koi: two lily pads, a flower and a few slow rings on the water
      for (const [lx, ly, r, a0] of [[150, 300, 95, 0.4], [870, 560, 72, 2.6], [820, 170, 50, 4.2]]) {
        const pad = ellipsePts(lx, ly, r, r * 0.62, 30, a0 + 0.35, a0 + Math.PI * 2 - 0.35); pad.push([lx, ly]);
        washOf(bg, pad, [96, 156, 88], 0.4, 3, 5); pen(bg, g => smooth(g, pad), 3.5, 'rgba(50,90,50,0.8)');
      }
      for (let p = 0; p < 7; p++) { const a = -Math.PI / 2 + (p - 3) * 0.42, px2 = 215 + Math.cos(a) * 34, py2 = 262 + Math.sin(a) * 30; washOf(bg, ellipsePts(px2, py2, 13, 26, 14).map(([x, y]) => [px2 + (x - px2) * Math.cos(a + 1.57) - (y - py2) * Math.sin(a + 1.57), py2 + (x - px2) * Math.sin(a + 1.57) + (y - py2) * Math.cos(a + 1.57)]), [240, 140, 170], 0.42, 1.5, 3); }
      washOf(bg, ellipsePts(215, 268, 12, 8, 12), [240, 200, 80], 0.7, 1, 3);
      bg.strokeStyle = 'rgba(60,100,170,0.22)'; bg.lineWidth = 4;
      for (const [rx0, ry0] of [[300, 420], [720, 330]]) for (let q = 1; q < 4; q++) { bg.beginPath(); bg.ellipse(rx0, ry0, q * 46, q * 16, 0, 0, 7); bg.stroke(); }
    }

    // ---------- side treats that sit behind the dish ----------
    const side = garnish.n === 'Little Sibling' ? 1 : garnish.n === 'Soy Dish' || chop ? -1 : sj[0] < 0.5 ? -1 : 1;
    const propSide = prop === 'Paper Lantern' && dark && side > 0 ? -1 : side;
    const PX = 500 + propSide * 400;
    // the coveted fortune cookie sits big on the front of the dish, beside the dumpling (not off in a corner)
    const CK = { x: 500 + propSide * 228, y: 866, s: 2 };
    if (prop === 'Plum Sprig') {
      const cx0 = propSide > 0 ? 1010 : -10, dir = -propSide;
      pen(bg, g => { g.beginPath(); g.moveTo(cx0, 120); g.quadraticCurveTo(cx0 + dir * 120, 150, cx0 + dir * 230, 90); g.moveTo(cx0 + dir * 120, 132); g.quadraticCurveTo(cx0 + dir * 150, 200, cx0 + dir * 200, 250); }, 6, 'rgba(90,60,50,0.85)');
      for (let i = 0; i < 9; i++) {
        const t = i / 8, x = cx0 + dir * (40 + t * 190) + J() * 20, y = 100 + (i % 3) * 50 + J() * 20;
        for (let p = 0; p < 5; p++) { const a = p * 1.2566 + J(); washOf(bg, ellipsePts(x + Math.cos(a) * 12, y + Math.sin(a) * 12, 11, 11, 10), [240, 140, 170], 0.3, 2, 2); }
        bg.fillStyle = 'rgba(200,60,90,0.7)'; bg.beginPath(); bg.arc(x, y, 4, 0, 7); bg.fill();
      }
    } else if (prop === 'Paper Lantern') {
      pen(bg, g => { g.beginPath(); g.moveTo(PX, 0); g.lineTo(PX, 90); }, 3);
      washOf(bg, ellipsePts(PX, 180, 95, 90, 30), [220, 60, 50], 0.38, 4, 6);
      washOf(bg, ellipsePts(PX - 30, 160, 34, 40, 16), [255, 200, 120], 0.3, 3, 3);
      pen(bg, g => smooth(g, ellipsePts(PX, 180, 95, 90, 30)), 4);
      for (const dx of [-55, 0, 55]) pen(bg, g => { g.beginPath(); g.moveTo(PX + dx * 0.4, 92); g.quadraticCurveTo(PX + dx * 1.15, 180, PX + dx * 0.4, 268); }, 2.5);
      for (const yy of [88, 272]) { washOf(bg, [[PX - 40, yy - 9], [PX + 40, yy - 9], [PX + 40, yy + 9], [PX - 40, yy + 9]], [214, 168, 82], 0.6, 1, 3); pen(bg, g => { g.beginPath(); g.rect(PX - 40, yy - 9, 80, 18); }, 3); }
      pen(bg, g => { g.beginPath(); for (let t2 = -3; t2 <= 3; t2++) { g.moveTo(PX + t2 * 4, 282); g.lineTo(PX + t2 * 6, 340); } }, 2.5, 'rgba(200,60,50,0.8)');
    } else if (prop === 'Teapot') {
      const tx = 500 + propSide * 420, ty = 620;
      washOf(bg, ellipsePts(tx, ty, 120, 100, 30), [120, 160, 170], 0.32, 4, 5);
      pen(bg, g => smooth(g, ellipsePts(tx, ty, 120, 100, 30)), 4);
      const sp = [[tx - propSide * 100, ty + 10], [tx - propSide * 190, ty - 70], [tx - propSide * 200, ty - 58], [tx - propSide * 112, ty + 40]];
      washOf(bg, sp, [120, 160, 170], 0.35, 2, 3); pen(bg, g => { g.beginPath(); sp.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); }, 4);
      pen(bg, g => { g.beginPath(); g.arc(tx + propSide * 110, ty - 10, 50, -1.3, 1.3); }, 9, 'rgba(90,120,130,0.8)');
      washOf(bg, ellipsePts(tx, ty - 98, 52, 16, 18), [100, 140, 150], 0.45, 2, 3); pen(bg, g => smooth(g, ellipsePts(tx, ty - 98, 52, 16, 18)), 3.5);
      washOf(bg, ellipsePts(tx, ty - 118, 14, 12, 12), [100, 140, 150], 0.5, 1, 3);
      washOf(bg, ellipsePts(tx - 40, ty - 34, 22, 36, 14), [255, 255, 255], 0.5, 3, 2);
    } else if (prop === 'Steamer Lid') {
      const lx = 500 + propSide * 330, ly = 470;
      const lid = ellipsePts(lx, ly, 150, 230, 40);
      washOf(bg, lid, [200, 160, 90], 0.3, 4, 5);
      bg.strokeStyle = 'rgba(150,100,50,0.35)'; bg.lineWidth = 3;
      for (let i = -5; i <= 5; i++) { const x = lx + i * 24; const hh = 230 * Math.sqrt(Math.max(0, 1 - (i * 24 / 150) ** 2)); bg.beginPath(); bg.moveTo(x, ly - hh + 8); bg.lineTo(x, ly + hh - 8); bg.stroke(); }
      pen(bg, g => smooth(g, lid), 4); pen(bg, g => smooth(g, ellipsePts(lx, ly, 126, 206, 36)), 2.5);
    }

    // ---------- the dish, back half ----------
    const DX = 500, DY = 760, DW = 380;
    const bamboo = dishN === 'Bamboo Steamer' || dishN === 'Stacked Steamers';
    if (bamboo) {
      washOf(bg, ellipsePts(DX, DY - 40, DW, 80, 40), [200, 160, 90], 0.22, 6);
      washOf(bg, ellipsePts(DX, DY - 30, DW - 30, 62, 40), [150, 110, 60], 0.18, 5, 3);
      washOf(bg, ellipsePts(DX, DY - 30, DW - 50, 52, 40), [250, 245, 230], 0.5, 4, 3);
    } else if (dishN === 'Blue Plate') {
      washOf(bg, ellipsePts(DX, DY + 10, DW + 30, 100, 44), [235, 240, 248], 0.5, 6);
      washOf(bg, ellipsePts(DX, DY + 10, DW + 30, 100, 44), [70, 110, 190], 0.08, 6, 3);
      bg.strokeStyle = 'rgba(60,100,180,0.6)'; bg.lineWidth = 9; smooth(bg, ellipsePts(DX, DY + 10, DW + 8, 84, 44)); bg.stroke();
      pen(bg, g => smooth(g, ellipsePts(DX, DY + 10, DW + 30, 100, 44)), 4);
    } else if (dishN === 'Celadon Plate') {
      washOf(bg, ellipsePts(DX, DY + 10, DW + 30, 100, 44), [176, 206, 186], 0.32, 6);
      washOf(bg, ellipsePts(DX, DY + 14, DW - 60, 66, 40), [150, 190, 168], 0.2, 5, 3);
      bg.strokeStyle = 'rgba(80,110,95,0.25)'; bg.lineWidth = 1.6;
      for (let i = 0; i < 26; i++) { let x = DX + J() * 360, y = DY + 10 + J() * 70; bg.beginPath(); bg.moveTo(x, y); for (let s2 = 0; s2 < 3; s2++) { x += J() * 40; y += J() * 14; bg.lineTo(x, y); } bg.stroke(); }
      pen(bg, g => smooth(g, ellipsePts(DX, DY + 10, DW + 30, 100, 44)), 4);
    } else if (dishN === 'Banana Leaf') {
      const lf = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; lf.push([DX + Math.cos(a) * (DW + 90), DY + 20 + Math.sin(a) * 92 * (0.75 + 0.25 * Math.cos(a)) - Math.cos(a) * 24]); }
      washOf(bg, lf, [90, 160, 80], 0.28, 6, 6);
      bg.strokeStyle = 'rgba(50,110,50,0.3)'; bg.lineWidth = 3;
      for (let i = -12; i <= 12; i++) { const x = DX + i * 34; bg.beginPath(); bg.moveTo(x, DY + 20 - i * 2); bg.lineTo(x + 40, DY - 50 - i * 2); bg.moveTo(x, DY + 20 - i * 2); bg.lineTo(x + 40, DY + 92 - i * 2); bg.stroke(); }
      pen(bg, g => { g.beginPath(); g.moveTo(DX - DW - 80, DY + 44); g.lineTo(DX + DW + 80, DY - 4); }, 4, 'rgba(60,110,50,0.8)');
      pen(bg, g => smooth(g, lf), 4);
    } else if (dishN === 'Lotus Leaf') {
      const lp = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; lp.push([DX + Math.cos(a) * (DW + 60 + Math.sin(a * 7) * 20), DY + Math.sin(a) * (110 + Math.sin(a * 5) * 10)]); }
      washOf(bg, lp, [110, 160, 80], 0.2, 8, 6);
      bg.strokeStyle = 'rgba(70,110,50,0.35)'; bg.lineWidth = 4;
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; bg.beginPath(); bg.moveTo(DX, DY); bg.lineTo(DX + Math.cos(a) * (DW + 40), DY + Math.sin(a) * 100); bg.stroke(); }
      pen(bg, g => smooth(g, lp), 4);
    } else {
      washOf(bg, ellipsePts(DX, DY + 10, DW + 40, 104, 44), [190, 40, 40], 0.24, 5, 6);
      washOf(bg, ellipsePts(DX, DY + 10, DW, 80, 44), [120, 20, 20], 0.12, 5, 3);
      pen(bg, g => smooth(g, ellipsePts(DX, DY + 10, DW + 40, 104, 44)), 4);
    }
    // the dumpling's own soft shadow where it sits
    washOf(bg, ellipsePts(BX + 34, botY - 4, bw * 0.98, 30, 30), [110, 80, 60], 0.1, 6, 4);

    // ---------- the dumpling ----------
    const [dc, d] = canvas();
    const bodyCol = { 'Gyoza': [246, 226, 190], 'Har Gow': [246, 220, 214], 'Siu Mai': [246, 214, 120], 'Peach Bun': [255, 226, 214], 'Golden Bao': [244, 202, 100], 'Soup Dumpling': [246, 236, 220],
      'Wonton': [250, 236, 200], 'Jade Dumpling': [196, 228, 196], 'Sesame Ball': [226, 170, 90], 'Pineapple Bun': [252, 242, 218], 'Lava Bun': [252, 240, 222], 'Hedgehog Bun': [250, 236, 212], 'Bunny Bao': [253, 248, 242], 'Charcoal Bao': [84, 80, 88], 'Koi Bun': [253, 248, 240], 'Steam Spirit': [236, 242, 255] }[K] || [252, 246, 236];
    const shadeCol = { 'Siu Mai': [210, 150, 60], 'Golden Bao': [200, 140, 40], 'Sesame Ball': [170, 100, 40], 'Jade Dumpling': [110, 160, 110], 'Charcoal Bao': [30, 28, 36], 'Steam Spirit': [140, 160, 220], 'Koi Bun': [190, 170, 160] }[K] || [200, 170, 150];
    if (K === 'Koi Bun') {   // a koi's dorsal fin, behind the bun
      const fin = [[BX - 120, topY + 46], [BX - 70, topY - 26], [BX + 4, topY - 74], [BX + 70, topY - 56], [BX + 124, topY + 40]];
      d.fillStyle = '#fdf9f0'; smooth(d, fin); d.fill();
      washOf(d, fin, [240, 128, 70], 0.42, 3, 5);
      for (let i = 0; i < 6; i++) pen(d, g => { g.beginPath(); g.moveTo(BX - 90 + i * 40, topY + 40); g.lineTo(BX - 74 + i * 34 + (i - 2.5) * 6, topY - 50 + Math.abs(i - 2.5) * 14); }, 2.5, 'rgba(150,70,40,0.7)');
      inkLine(d, fin, 4.5);
    }
    if (K === 'Bunny Bao') {   // long ears behind the head
      for (const sd of [-1, 1]) {
        const ear = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; ear.push([BX + sd * 95 + Math.cos(a) * 48, topY - 70 + Math.sin(a) * 140]); }
        const eR = ear.map(([x, y]) => { const r = sd * 0.22, dx = x - (BX + sd * 95), dy = y - (topY + 40); return [BX + sd * 95 + dx * Math.cos(r) - dy * Math.sin(r), topY + 40 + dx * Math.sin(r) + dy * Math.cos(r)]; });
        d.fillStyle = '#fdf9f0'; smooth(d, eR); d.fill();
        washOf(d, eR, bodyCol, 0.5, 4, 4);
        washOf(d, eR.map(([x, y]) => [x + (BX + sd * 95 - x) * 0.45, y + (topY - 60 - y) * 0.3]), [245, 150, 160], 0.3, 3, 4);
        inkLine(d, eR, 5);
      }
    }
    if (K === 'Steam Spirit') {
      // a dumpling of steam: veils of white laid over each other, and curls of vapour inside
      for (let l = 0; l < 4; l++) washOf(d, outline.map(([x, y]) => [BX + (x - BX) * (1.22 - l * 0.05), y0 + 20 + (y - y0) * (1.18 - l * 0.04)]), [220, 232, 255], 0.05, 40, 3);
      for (let l = 0; l < 7; l++) washOf(d, outline.map(([x, y]) => [BX + (x - BX) * (1.03 - l * 0.04), y0 + (y - y0) * (1.03 - l * 0.045)]), [236, 242, 255], 0.14, 24, 3);
      d.lineCap = 'round';
      for (let i = 0; i < 4; i++) for (const [lw, al] of [[34, 0.1], [14, 0.22]]) {
        // tall wisps curling up off its crown
        const x0 = BX - 150 + i * 100 + J() * 20;
        d.strokeStyle = 'rgba(245,248,255,' + al + ')'; d.lineWidth = lw; d.beginPath();
        for (let j = 0; j <= 14; j++) { const yy = topY + 40 - j * 22, xx = x0 + Math.sin(j * 0.55 + i * 1.7) * (10 + j * 3); j ? d.lineTo(xx, yy) : d.moveTo(xx, yy); }
        d.stroke();
      }
      d.strokeStyle = 'rgba(255,255,255,0.38)'; d.lineCap = 'round';
      for (let i = 0; i < 7; i++) { const sx = BX + J() * 180, sy = y0 - 120 - Math.abs(J()) * 150; d.lineWidth = 6 + Math.abs(J()) * 8; d.beginPath(); for (let q = 0; q < 22; q++) { const a = q * 0.42, r = 4 + q * 2.6; d.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r * 0.7); } d.stroke(); }
    } else {
      d.fillStyle = dark ? '#eceaf0' : '#fdf9f0'; smooth(d, outline); d.fill();
      washOf(d, outline, bodyCol, coal ? 0.85 : 0.55, 7, 5);
    }
    d.save(); smooth(d, outline); d.clip();
    // shading lives in the band along the lower right edge; the light falls from the upper left
    const lx0 = BX - bw * 0.22, ly0 = topY + bh * 0.36;
    washRing(d, outline, outline.map(([x, y]) => [lx0 + (x - lx0) * 0.8, ly0 + (y - ly0) * 0.78]), shadeCol, coal ? 0.3 : 0.13, 10, 4);
    washRing(d, outline, outline.map(([x, y]) => [lx0 + (x - lx0) * 0.92, ly0 + (y - ly0) * 0.9]), shadeCol, coal ? 0.25 : 0.12, 5, 3);
    if (K !== 'Steam Spirit') {
      // a wet edge: the paint pooled and dried darker just inside the shadow side of the outline
      const n = outline.length; let ox = 0, oy = 0;
      for (const p of outline) { ox += p[0] / n; oy += p[1] / n; }
      const pool = shadeCol.map(v => v * 0.78 | 0);
      for (const [lw, al] of [[22, 0.16], [8, 0.3]]) for (let i = 0; i < n; i++) {
        const a = outline[(i + n - 1) % n], p = outline[i], b = outline[(i + 1) % n];
        const dx = p[0] - ox, dy = p[1] - oy, dl = Math.hypot(dx, dy) || 1, lit = (dx * 0.55 + dy * 0.83) / dl;
        if (lit < 0.05) continue;
        d.strokeStyle = rgba(pool, (al * Math.min(1, lit * 1.4) * (coal ? 0.6 : 1) * (0.8 + 0.4 * Math.abs(W()))).toFixed(3)); d.lineWidth = lw * (0.7 + 0.6 * Math.abs(W()));
        d.beginPath(); d.moveTo((a[0] + p[0]) / 2, (a[1] + p[1]) / 2); d.quadraticCurveTo(p[0], p[1], (p[0] + b[0]) / 2, (p[1] + b[1]) / 2); d.stroke();
      }
      // a backrun: a drop of water let into the drying wash pushed the pigment out into a frilled, darker rim
      // (low in the shadow, on the side away from where the face sits, running off the edge)
      const bs = fx > BX + 4 ? -1 : 1, bx = BX + bs * bw * (0.62 + 0.12 * Math.abs(W())), by = botY - bh * (0.14 + 0.08 * Math.abs(W())), br0 = 50 + Math.abs(W()) * 26, bloom = [];
      const ph7 = W() * 3;
      for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = br0 * (0.84 + 0.08 * Math.sin(a * 7 + ph7) + 0.06 * Math.sin(a * 3 - ph7) + 0.03 * W()); bloom.push([bx + Math.cos(a) * r, by + Math.sin(a) * r * 0.75]); }
      if (W() > -0.3) {
        washOf(d, bloom, shadeCol, coal ? 0.08 : 0.05, 4, 2);
        d.fillStyle = coal ? 'rgba(150,140,150,0.1)' : 'rgba(255,252,242,0.22)'; smooth(d, bloom.map(([x, y]) => [bx + (x - bx) * 0.84, by + (y - by) * 0.84])); d.fill();
      }
      // mottling: the wash dried unevenly, leaving soft patches with crisp edges
      for (let i = 0; i < 4; i++) { const mx = BX + W() * bw * 0.7, myy = topY + bh * (0.35 + 0.45 * Math.abs(W())), mr = 60 + Math.abs(W()) * 80; washOf(d, ellipsePts(mx, myy, mr, mr * 0.7, 18).map(([x, y]) => [x + W() * 10, y + W() * 10]), shadeCol, coal ? 0.05 : 0.045, 6, 2); }
    }
    if (K === 'Har Gow' || K === 'Jade Dumpling') { // the filling glowing through the wrapper
      const fc2 = K === 'Har Gow' ? [240, 130, 110] : [70, 150, 80];
      washOf(d, ellipsePts(BX - 10, y0 - 210, 150, 90, 30), fc2, 0.18, 12, 5);
      d.strokeStyle = rgba(fc2, 0.32); d.lineWidth = 10;
      for (let i = 0; i < 4; i++) { d.beginPath(); d.arc(BX - 10, y0 - 210, 60 + i * 18, Math.PI * 1.1, Math.PI * 1.9); d.stroke(); }
    }
    if (K === 'Peach Bun') washOf(d, ellipsePts(BX + 30, y0 - 300, 170, 120, 30), [250, 120, 130], 0.16, 22, 6);
    if (K === 'Koi Bun') {
      // the koi's markings: red-orange patches and a few ink-black spots, laid wet
      const blot = (x, y, rx, ry, n) => ellipsePts(x, y, rx, ry, n).map(([px, py], i) => [px + Math.sin(i * 2.1 + x) * rx * 0.18, py + Math.cos(i * 1.7 + y) * ry * 0.2]);
      washOf(d, blot(BX - 150 + sj[7] * 60, topY + 84, 125, 82, 18), [236, 92, 44], 0.42, 5, 5);
      washOf(d, blot(BX + 140 - sj[8] * 50, topY + 70 + sj[9] * 40, 100, 72, 16), [240, 110, 50], 0.4, 5, 5);
      washOf(d, blot(BX + 50, y0 - 64, 140, 50, 16), [236, 92, 44], 0.3, 5, 4);
      for (let i = 0; i < 3; i++) washOf(d, blot(BX - 170 + i * 150 + sj[10 + i] * 40, topY + 34 + sj[13 + i] * 40, 22, 15, 10), [36, 36, 48], 0.45, 2, 3);
    }
    if (K === 'Golden Bao') { d.fillStyle = 'rgba(255,240,170,0.9)'; for (let i = 0; i < 40; i++) { d.beginPath(); d.arc(BX + J() * 260, y0 - 130 + J() * 180, 2 + Math.abs(J()) * 4, 0, 7); d.fill(); } }
    if (K === 'Gyoza') washOf(d, ellipsePts(BX, y0 + 40, 340, 50, 30), [200, 130, 50], 0.26, 10, 4);
    if (K === 'Sesame Ball') {
      washOf(d, ellipsePts(BX - 70, sesameC - 90, 110, 80, 24), [255, 220, 150], 0.3, 10, 3);
      for (let i = 0; i < 64; i++) {
        const a = Math.abs(J()) * Math.PI * 2, r = Math.sqrt(Math.abs(J())) * 225, x = BX + Math.cos(a) * r, y = sesameC + Math.sin(a) * r * 0.95;
        if (Math.abs(x - fx) < 190 && Math.abs(y - fy - 40) < 75) continue;
        d.save(); d.translate(x, y); d.rotate(J() * 3); d.fillStyle = i % 4 ? '#fff6dc' : '#3a2a20'; d.beginPath(); d.ellipse(0, 0, 9, 4.5, 0, 0, 7); d.fill(); d.strokeStyle = 'rgba(74,52,38,0.6)'; d.lineWidth = 1.5; d.stroke(); d.restore();
      }
    }
    if (K === 'Pineapple Bun') {   // a crackled sugar crust over the crown
      const cap = outline.filter(p => p[1] < y0 - 150).map(([x, y]) => [x, y - 6]);
      cap.push([BX + bw * 0.9, y0 - 140 + J() * 8], [BX, y0 - 120], [BX - bw * 0.9, y0 - 140 + J() * 8]);
      washOf(d, cap, [232, 168, 70], 0.4, 6, 5);
      d.strokeStyle = 'rgba(150,90,30,0.55)'; d.lineWidth = 3.5;
      for (let r2 = 0; r2 < 3; r2++) for (let q = 0; q < 6; q++) {
        const x = BX - 230 + q * 92 + (r2 % 2) * 46 + J() * 10, y = topY + 40 + r2 * 58 + J() * 8;
        if (y > y0 - 150) continue;
        d.beginPath(); for (let v = 0; v < 6; v++) { const a = v * 1.047 + 0.5, rr2 = 34 + J() * 6; d.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2 * 0.6); } d.closePath(); d.stroke();
      }
    }
    if (K === 'Lava Bun') {
      const crack = [[BX - 90, topY + 50], [BX - 50, topY + 30], [BX - 20, topY + 48], [BX + 20, topY + 24], [BX + 60, topY + 44], [BX + 100, topY + 34]];
      washOf(d, [...crack, [BX + 100, topY + 50], [BX + 50, topY + 64], [BX - 20, topY + 66], [BX - 90, topY + 60]], [250, 190, 40], 0.6, 3, 5);
      for (const [x, len] of [[BX - 40, 110], [BX + 60, 70]]) washOf(d, [[x - 14, topY + 50], [x + 14, topY + 50], [x + 10, topY + 50 + len], [x, topY + 64 + len], [x - 10, topY + 50 + len]], [250, 180, 30], 0.6, 2, 4);
      pen(d, g => { g.beginPath(); crack.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); }, 4.5);
    }
    if (K === 'Hedgehog Bun') {   // snipped dough spikes over the back and crown
      for (let r2 = 0; r2 < 3; r2++) for (let i = 2; i <= 22; i += 2) {
        const p = outline[i + (r2 % 2)], s = 0.9 - r2 * 0.1, x = BX + (p[0] - BX) * s, y = y0 - 10 + (p[1] - y0 + 10) * s;
        if (Math.abs(x - fx) < 210 && y > fy - 70) continue;
        const ang = Math.atan2(y - (y0 - 40), x - BX);
        washOf(d, [[x - Math.sin(ang) * 12, y + Math.cos(ang) * 12], [x + Math.cos(ang) * 30, y + Math.sin(ang) * 30], [x + Math.sin(ang) * 12, y - Math.cos(ang) * 12]], [200, 150, 90], 0.3, 1, 2);
        pen(d, g => { g.beginPath(); g.moveTo(x - Math.sin(ang) * 12, y + Math.cos(ang) * 12); g.lineTo(x + Math.cos(ang) * 30, y + Math.sin(ang) * 30); g.lineTo(x + Math.sin(ang) * 12, y - Math.cos(ang) * 12); }, 3);
        d.fillStyle = 'rgba(90,50,30,0.7)'; d.beginPath(); d.arc(x + Math.cos(ang) * 26, y + Math.sin(ang) * 26, 3, 0, 7); d.fill();
      }
    }
    d.restore();
    // the outline in pen, heavier where the bun turns away from the light
    if (K !== 'Steam Spirit') inkLine(d, outline, 6, coal ? 'rgba(40,30,30,0.95)' : PEN);
    // pleats and marks
    const IK = coal ? 'rgba(255,246,228,0.8)' : PEN;
    d.save(); smooth(d, outline); d.clip();
    if (K === 'Bao' || K === 'Golden Bao' || K === 'Charcoal Bao' || K === 'Bunny Bao') {
      const tx = BX + 10, ty = topY - 10;
      for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32; pen(d, g => { g.beginPath(); g.moveTo(tx, ty + 10); g.quadraticCurveTo(tx + Math.cos(a) * 40 + 16, ty + 10 + Math.sin(a) * 30 + 60, tx + Math.cos(a) * 90, ty + 70 + Math.abs(Math.cos(a)) * 30); }, 4, IK); }
    } else if (peaked) {
      const tx = BX, ty = topY - 2;
      for (let i = 0; i < 8; i++) { const s = (i - 3.5) / 3.5; pen(d, g => { g.beginPath(); g.moveTo(tx + s * 10, ty + 6); g.quadraticCurveTo(tx + s * 120, ty + 80, tx + s * 230, ty + 190 - Math.abs(s) * 30); }, 4); }
    } else if (K === 'Gyoza') {
      for (let i = 0; i < 10; i++) { const x = BX - 260 + i * 58, y = topAt(x); pen(d, g => { g.beginPath(); g.moveTo(x, y + 4); g.quadraticCurveTo(x + 18, y + 40, x + 4, y + 74); }, 4); }
    } else if (K === 'Siu Mai') {
      washOf(d, ellipsePts(BX, BY - 330, 220, 44, 30), [210, 120, 90], 0.3, 6, 4);
      washOf(d, ellipsePts(BX, BY - 340, 46, 24, 16), [255, 120, 30], 0.5, 4, 4);
      pen(d, g => smooth(g, ellipsePts(BX, BY - 330, 220, 44, 30)), 4);
      for (let i = 0; i < 7; i++) { const x = BX - 222 + i * 74; pen(d, g => { g.beginPath(); g.moveTo(x, BY - 290); g.quadraticCurveTo(x + 10, BY - 230, x + 4, BY - 190); }, 3.5); }
    } else if (K === 'Wonton') {
      for (let i = 0; i < 7; i++) { const s = (i - 3) / 3; pen(d, g => { g.beginPath(); g.moveTo(BX + s * 40, wontonC - 232); g.quadraticCurveTo(BX + s * 90, wontonC - 280, BX + s * 160, wontonC - 316 - (1 - Math.abs(s)) * 40); }, 3.5); }
      pen(d, g => { g.beginPath(); g.moveTo(BX - 64, wontonC - 226); g.quadraticCurveTo(BX, wontonC - 214, BX + 64, wontonC - 226); }, 5);
    }
    if (K === 'Peach Bun') {
      d.restore();
      pen(d, g => { g.beginPath(); g.moveTo(BX, y0 - 410); g.quadraticCurveTo(BX + 40, y0 - 270, BX + 10, y0 - 130); }, 4);
      washOf(d, [[BX - 10, y0 - 400], [BX - 120, y0 - 440], [BX - 220, y0 - 400], [BX - 130, y0 - 380]], [100, 170, 90], 0.4, 4, 4);
      washOf(d, [[BX + 10, y0 - 400], [BX + 110, y0 - 460], [BX + 210, y0 - 430], [BX + 120, y0 - 390]], [100, 170, 90], 0.4, 4, 4);
      pen(d, g => { g.beginPath(); g.moveTo(BX - 10, y0 - 400); g.quadraticCurveTo(BX - 130, y0 - 460, BX - 220, y0 - 400); g.quadraticCurveTo(BX - 120, y0 - 370, BX - 10, y0 - 400); }, 4);
      pen(d, g => { g.beginPath(); g.moveTo(BX + 10, y0 - 400); g.quadraticCurveTo(BX + 120, y0 - 480, BX + 210, y0 - 430); g.quadraticCurveTo(BX + 110, y0 - 380, BX + 10, y0 - 400); }, 4);
      d.save();
    }
    d.restore();
    // highlight: leave the paper (lift paint)
    d.save(); smooth(d, outline); d.clip();
    for (let l = 0; l < 5; l++) {   // lifted paint: soft layered fills with no pooled edge
      d.fillStyle = coal ? 'rgba(255,253,246,0.05)' : 'rgba(255,253,246,0.13)';
      smooth(d, ellipsePts(BX - bw * 0.42 + J() * 10, topY + bh * 0.34 + J() * 10, bw * (0.3 - l * 0.04), bh * (0.26 - l * 0.035), 20).map(p => [p[0] + J() * 6, p[1] + J() * 6])); d.fill();
    }
    if (K !== 'Steam Spirit') {
      // the paper left bare in the light: a few dry-brush skips where the brush never touched the dough
      const hx = BX - bw * 0.42, hy = topY + bh * 0.3;
      d.fillStyle = coal ? 'rgba(255,250,240,0.22)' : rgba(paper === 'Kraft' ? [250, 244, 230] : [255, 254, 250], 0.78);
      for (let i = 0; i < 7; i++) {
        const y = hy - bh * 0.08 + i * bh * 0.035 + W() * 4, x = hx - bw * 0.14 + W() * 14 + i * 6, L = bw * (0.12 + 0.12 * Math.abs(W())), th = 3 + Math.abs(W()) * 5;
        for (let s2 = 0; s2 < L; s2 += 10 + Math.abs(W()) * 12) { const w2 = 5 + Math.abs(W()) * 14; d.beginPath(); d.ellipse(x + s2 + w2 / 2, y - s2 * 0.32, w2 / 2, th / 2, -0.32, 0, 7); d.fill(); }
      }
    }
    d.restore();

    // ---------- toppers ----------
    if (topper === 'Goji Berry') {
      for (const [dx, dy] of [[0, 0], [26, 10]]) { washOf(d, ellipsePts(A[0] + dx, A[1] + dy, 16, 22, 14), [220, 50, 40], 0.55, 1.5, 4); pen(d, g => smooth(g, ellipsePts(A[0] + dx, A[1] + dy, 16, 22, 14)), 3.5); }
      washOf(d, [[A[0] + 10, A[1] - 20], [A[0] + 50, A[1] - 44], [A[0] + 70, A[1] - 30], [A[0] + 30, A[1] - 14]], [100, 170, 80], 0.5, 1.5, 3);
      pen(d, g => { g.beginPath(); g.moveTo(A[0] + 10, A[1] - 20); g.quadraticCurveTo(A[0] + 40, A[1] - 50, A[0] + 70, A[1] - 30); g.quadraticCurveTo(A[0] + 40, A[1] - 12, A[0] + 10, A[1] - 20); }, 3.5);
    } else if (topper === 'Tiny Bow') {
      const bwg = sd => [[A[0], A[1]], [A[0] + sd * 46, A[1] - 30], [A[0] + sd * 52, A[1] + 24]];
      for (const sd of [-1, 1]) { washOf(d, bwg(sd), [240, 110, 140], 0.5, 2, 4); pen(d, g => { const p = bwg(sd); g.beginPath(); g.moveTo(p[0][0], p[0][1]); g.quadraticCurveTo(p[1][0], p[1][1] - 10, p[1][0], p[1][1]); g.lineTo(p[2][0], p[2][1]); g.closePath(); }, 3.5); }
      washOf(d, ellipsePts(A[0], A[1], 12, 12, 12), [220, 80, 120], 0.6, 1, 3); pen(d, g => smooth(g, ellipsePts(A[0], A[1], 12, 12, 12)), 3.5);
    } else if (topper === 'Plum Blossom') {
      for (let p = 0; p < 5; p++) { const a = p * 1.2566 - 1.57, px2 = A[0] + Math.cos(a) * 20, py2 = A[1] + Math.sin(a) * 20; washOf(d, ellipsePts(px2, py2, 17, 17, 14), [245, 150, 175], 0.5, 1.5, 3); pen(d, g => smooth(g, ellipsePts(px2, py2, 17, 17, 14)), 3); }
      d.fillStyle = 'rgba(240,190,60,0.95)'; for (let p = 0; p < 6; p++) { d.beginPath(); d.arc(A[0] + Math.cos(p) * 7, A[1] + Math.sin(p) * 7, 3, 0, 7); d.fill(); }
    } else if (topper === 'Hairpin') {
      pen(d, g => { g.beginPath(); g.moveTo(A[0] - 70, A[1] + 26); g.lineTo(A[0] + 90, A[1] - 50); }, 9, 'rgba(150,60,40,0.9)');
      pen(d, g => { g.beginPath(); g.moveTo(A[0] - 70, A[1] + 26); g.lineTo(A[0] + 90, A[1] - 50); }, 2.5);
      washOf(d, ellipsePts(A[0] + 98, A[1] - 54, 15, 15, 12), [90, 170, 150], 0.65, 1, 4); pen(d, g => smooth(g, ellipsePts(A[0] + 98, A[1] - 54, 15, 15, 12)), 3);
      pen(d, g => { g.beginPath(); g.moveTo(A[0] + 98, A[1] - 40); g.lineTo(A[0] + 104, A[1] + 10); g.moveTo(A[0] + 98, A[1] - 40); g.lineTo(A[0] + 90, A[1] + 6); }, 2.5, 'rgba(200,60,60,0.8)');
    } else if (topper === 'Chef Hat') {
      const hb = topY + 30;
      const hat = [[BX - 70, hb], [BX - 72, hb - 60], [BX - 110, hb - 100], [BX - 80, hb - 160], [BX - 20, hb - 170], [BX + 30, hb - 180], [BX + 90, hb - 150], [BX + 110, hb - 100], [BX + 72, hb - 60], [BX + 70, hb]];
      d.fillStyle = '#fdfaf4'; smooth(d, hat); d.fill(); washOf(d, hat, [220, 220, 230], 0.18, 3, 3);
      inkLine(d, hat, 4.5);
      pen(d, g => { g.beginPath(); g.moveTo(BX - 70, hb - 40); g.quadraticCurveTo(BX, hb - 30, BX + 70, hb - 40); g.moveTo(BX - 30, hb - 120); g.quadraticCurveTo(BX - 20, hb - 90, BX - 34, hb - 64); g.moveTo(BX + 30, hb - 128); g.quadraticCurveTo(BX + 44, hb - 96, BX + 32, hb - 64); }, 3);
    } else if (topper === 'Leaf Hat') {
      const lt = topY + 12, lf = [[BX - 150, lt + 30], [BX - 40, lt - 40], [BX + 90, lt - 50], [BX + 170, lt - 10], [BX + 60, lt + 14], [BX - 60, lt + 24]];
      washOf(d, lf, [110, 170, 90], 0.45, 3, 5); inkLine(d, lf, 4.5);
      pen(d, g => { g.beginPath(); g.moveTo(BX - 150, lt + 30); g.quadraticCurveTo(BX, lt - 24, BX + 170, lt - 10); }, 3);
      pen(d, g => { g.beginPath(); g.moveTo(BX - 150, lt + 30); g.lineTo(BX - 186, lt + 52); }, 4);
    } else if (topper === 'Paper Crown') {
      const cb = topY + 26, crown = [[BX - 100, cb], [BX - 110, cb - 90], [BX - 60, cb - 44], [BX - 20, cb - 110], [BX + 20, cb - 44], [BX + 64, cb - 108], [BX + 96, cb - 40], [BX + 120, cb - 92], [BX + 104, cb]];
      washOf(d, crown, [236, 190, 70], 0.55, 2, 5);
      d.strokeStyle = PEN; d.lineWidth = 4.5; d.beginPath(); crown.forEach((p, i) => i ? d.lineTo(p[0], p[1]) : d.moveTo(p[0], p[1])); d.closePath(); d.stroke();
      for (const [x, y] of [[BX - 110, cb - 90], [BX - 20, cb - 110], [BX + 64, cb - 108], [BX + 120, cb - 92]]) { washOf(d, ellipsePts(x, y, 10, 10, 10), [220, 60, 70], 0.7, 1, 3); }
      pen(d, g => { g.beginPath(); g.moveTo(BX - 100, cb - 24); g.lineTo(BX + 104, cb - 24); }, 2.5);
    }

    // ---------- face (static): cheeks and mouth ----------
    // (where it sits, its spacing and tilt were settled above; it is clipped to the dough so a face set off to one side wraps round)
    const faceT = g => { g.translate(fx, fy); g.rotate(tilt); g.scale(FS, FS); g.translate(-fx, -fy); };
    d.save(); smooth(d, outline); d.clip(); faceT(d);
    const blush = cheeks === 'Peachy' ? [250, 150, 90] : [240, 110, 120];
    const lookSide = chop || garnish.n === 'Soy Dish' ? 1 : garnish.n === 'Little Sibling' ? -1 : prop !== 'None' ? propSide : sj[11] < 0.5 ? -1 : 1;
    if (cheeks === 'Rosy' || cheeks === 'Peachy' || cheeks === 'Freckled' || cheeks === 'Steamy Flush') {
      const big = cheeks === 'Steamy Flush' ? 1.3 : 1, al = cheeks === 'Steamy Flush' ? 0.3 : cheeks === 'Freckled' ? 0.15 : cheeks === 'Peachy' ? 0.26 : 0.22;
      for (const sd of [-1, 1]) washOf(d, ellipsePts(fx + sd * (gap + 52), fy + 40, 40 * big, 24 * big, 16), blush, al, 4, 4);
    }
    if (cheeks === 'Freckled') { d.fillStyle = coal ? 'rgba(255,220,190,0.8)' : 'rgba(140,80,50,0.7)'; for (const sd of [-1, 1]) for (const [dx, dy] of [[-16, -6], [2, 6], [18, -4]]) { d.beginPath(); d.arc(fx + sd * (gap + 52) + dx, fy + 36 + dy, 3.6, 0, 7); d.fill(); } }
    if (cheeks === 'Steamy Flush') for (const sd of [-1, 1]) for (let q = 0; q < 3; q++) pen(d, g => { const x = fx + sd * (gap + 34) + q * 15; g.beginPath(); g.moveTo(x + 8, fy + 28); g.lineTo(x - 4, fy + 50); }, 3, 'rgba(200,70,90,0.8)');
    if (cheeks === 'Hearts') for (const sd of [-1, 1]) { const hx = fx + sd * (gap + 50), hy = fy + 38; washOf(d, [[hx, hy + 20], [hx - 26, hy - 2], [hx - 16, hy - 18], [hx, hy - 8], [hx + 16, hy - 18], [hx + 26, hy - 2]], [240, 100, 130], 0.32, 1.5, 4); }
    if (cheeks === 'Swirls') for (const sd of [-1, 1]) pen(d, g => { g.beginPath(); for (let i = 0; i < 24; i++) { const a = i * 0.5, r = 2 + i * 0.95; g.lineTo(fx + sd * (gap + 50) + Math.cos(a) * r * sd, fy + 40 + Math.sin(a) * r * 0.7); } }, 3.5, 'rgba(220,90,110,0.85)');
    const my = fy + 50;
    d.strokeStyle = FPEN; d.lineWidth = 7;
    const mpen = (fn, w) => pen(d, fn, w, FPEN);
    const inside = coal ? [40, 20, 30] : [150, 50, 60];
    if (M === 'Tiny Smile') mpen(g => { g.beginPath(); g.arc(fx, my - 16, 20, 0.5, Math.PI - 0.5); }, 7);
    else if (M === 'Open') { washOf(d, [[fx - 30, my - 6], [fx + 30, my - 6], [fx + 20, my + 30], [fx - 20, my + 30]], inside, 0.45, 2, 4); mpen(g => { g.beginPath(); g.moveTo(fx - 32, my - 6); g.lineTo(fx + 32, my - 6); g.quadraticCurveTo(fx + 26, my + 36, fx, my + 36); g.quadraticCurveTo(fx - 26, my + 36, fx - 32, my - 6); }, 6); }
    else if (M === 'Cat') mpen(g => { g.beginPath(); g.arc(fx - 14, my, 14, 0.2, Math.PI - 0.1); g.moveTo(fx + 28, my); g.arc(fx + 14, my, 14, 0.1, Math.PI - 0.2); }, 6);
    else if (M === 'Pout') mpen(g => { g.beginPath(); g.arc(fx, my + 18, 16, Math.PI + 0.5, -0.5); }, 7);
    else if (M === 'Drool') { mpen(g => { g.beginPath(); g.arc(fx, my - 14, 22, 0.4, Math.PI - 0.4); }, 7); washOf(d, ellipsePts(fx + 20, my + 26, 9, 16, 12), [140, 190, 240], 0.45, 1.5, 3); pen(d, g => { g.beginPath(); g.ellipse(fx + 20, my + 26, 9, 16, 0, 0, 7); }, 3); }
    else if (M === 'Yawn') { washOf(d, ellipsePts(fx, my + 10, 22, 30, 16), inside, 0.5, 2, 4); mpen(g => { g.beginPath(); g.ellipse(fx, my + 10, 22, 30, 0, 0, 7); }, 6); }
    else if (M === 'Tongue') { mpen(g => { g.beginPath(); g.moveTo(fx - 26, my); g.quadraticCurveTo(fx, my + 12, fx + 26, my); }, 6); washOf(d, ellipsePts(fx + 6, my + 16, 13, 14, 12), [240, 110, 120], 0.6, 1.5, 3); pen(d, g => { g.beginPath(); g.arc(fx + 6, my + 12, 13, 0, Math.PI); }, 4); }
    else if (M === 'Fang Grin') { mpen(g => { g.beginPath(); g.arc(fx, my - 20, 26, 0.45, Math.PI - 0.45); }, 7); d.fillStyle = '#fffaf0'; d.beginPath(); d.moveTo(fx - 16, my + 2); d.lineTo(fx - 8, my + 18); d.lineTo(fx - 2, my + 4); d.fill(); pen(d, g => { g.beginPath(); g.moveTo(fx - 16, my + 2); g.lineTo(fx - 8, my + 18); g.lineTo(fx - 2, my + 4); }, 3, FPEN); }
    else if (M === 'Nom') { washOf(d, [[fx - 34, my - 8], [fx + 34, my - 8], [fx + 24, my + 26], [fx - 24, my + 26]], inside, 0.5, 2, 4); mpen(g => { g.beginPath(); g.moveTo(fx - 36, my - 8); g.quadraticCurveTo(fx, my + 4, fx + 36, my - 8); g.quadraticCurveTo(fx + 30, my + 34, fx, my + 34); g.quadraticCurveTo(fx - 30, my + 34, fx - 36, my - 8); }, 6); if (!legend) for (const [dx, dy] of [[52, 20], [60, 40], [-50, 34]]) washOf(d, ellipsePts(fx + dx, my + dy, 5, 4, 8), [210, 160, 90], 0.7, 0.6, 3); }
    else if (M === 'Whistle') mpen(g => { g.beginPath(); g.ellipse(fx + 4, my + 6, 9, 11, 0, 0, 7); }, 6);
    else if (M === 'Wobbly') mpen(g => { g.beginPath(); for (let i = 0; i <= 6; i++) g.lineTo(fx - 30 + i * 10, my + (i % 2 ? -5 : 5)); }, 6);
    else if (M === 'Kiss') mpen(g => { g.beginPath(); g.arc(fx - 2, my - 2, 9, -Math.PI / 2, Math.PI / 2); g.arc(fx - 2, my + 16, 9, -Math.PI / 2, Math.PI / 2); }, 6);
    else if (M === 'Big Laugh') { const lm = [[fx - 44, my - 10], [fx + 44, my - 10], [fx + 30, my + 40], [fx - 30, my + 40]]; washOf(d, lm, inside, 0.55, 2, 4); washOf(d, ellipsePts(fx, my + 26, 22, 11, 14), [240, 110, 120], 0.6, 1, 3); mpen(g => { g.beginPath(); g.moveTo(fx - 46, my - 10); g.quadraticCurveTo(fx, my - 2, fx + 46, my - 10); g.quadraticCurveTo(fx + 40, my + 46, fx, my + 46); g.quadraticCurveTo(fx - 40, my + 46, fx - 46, my - 10); }, 6); }
    // whole-face expressions: drawn as one design (the eyes, a drool bubble, tears and ear-steam move each frame)
    if (face === 'Asleep') { washOf(d, ellipsePts(fx + 8, my + 6, 10, 12, 12), inside, 0.5, 1.5, 3); mpen(g => { g.beginPath(); g.ellipse(fx + 8, my + 6, 10, 12, 0.2, 0, 7); }, 5.5); }
    else if (face === 'Puffed Cheeks') {
      for (const sd of [-1, 1]) {
        const cx2 = fx + sd * (gap + 40), cy2 = fy + 36;
        washOf(d, ellipsePts(cx2, cy2, 54, 44, 18), blush, 0.3, 3, 4);
        washOf(d, ellipsePts(cx2 - sd * 12, cy2 - 14, 16, 11, 10), [255, 253, 246], coal ? 0.18 : 0.6, 1.5, 2);
        mpen(g => { g.beginPath(); sd > 0 ? g.ellipse(cx2, cy2, 56, 46, 0, -1.25, 1.35) : g.ellipse(cx2, cy2, 56, 46, 0, Math.PI - 1.35, Math.PI + 1.25); }, 4.5);
      }
      mpen(g => { g.beginPath(); g.ellipse(fx, my + 4, 7, 8, 0, 0, 7); g.moveTo(fx - 12, my - 2); g.lineTo(fx - 7, my + 2); g.moveTo(fx + 12, my - 2); g.lineTo(fx + 7, my + 2); }, 4.5);
    } else if (face === 'Laughing') {
      const lm = [[fx - 50, my - 14], [fx + 50, my - 14], [fx + 36, my + 52], [fx - 36, my + 52]];
      washOf(d, lm, inside, 0.6, 2, 4); washOf(d, ellipsePts(fx + 4, my + 36, 26, 14, 14), [240, 110, 120], 0.65, 1, 3);
      mpen(g => { g.beginPath(); g.moveTo(fx - 54, my - 14); g.quadraticCurveTo(fx, my - 4, fx + 54, my - 14); g.quadraticCurveTo(fx + 48, my + 58, fx, my + 58); g.quadraticCurveTo(fx - 48, my + 58, fx - 54, my - 14); }, 6);
    } else if (face === 'Side-Eye') {
      mpen(g => { g.beginPath(); g.moveTo(fx - lookSide * 24, my + 6); g.quadraticCurveTo(fx, my + 4, fx + lookSide * 22, my - 4); g.lineTo(fx + lookSide * 30, my - 9); }, 6);
    } else if (face === 'Hot Hot') {
      for (const sd of [-1, 1]) { washOf(d, ellipsePts(fx + sd * (gap + 48), fy + 40, 50, 30, 16), [236, 80, 80], 0.32, 3, 4); for (let q = 0; q < 3; q++) pen(d, g => { const x = fx + sd * (gap + 30) + q * 16; g.beginPath(); g.moveTo(x + 8, fy + 26); g.lineTo(x - 4, fy + 50); }, 3, 'rgba(190,50,60,0.85)'); }
      washOf(d, [[fx - 34, my - 6], [fx + 34, my - 6], [fx + 28, my + 30], [fx - 28, my + 30]], inside, 0.55, 2, 4);
      washOf(d, ellipsePts(fx + 4, my + 38, 17, 22, 14), [240, 110, 120], 0.75, 1, 3); pen(d, g => { g.beginPath(); g.ellipse(fx + 4, my + 38, 17, 22, 0, 0.1, Math.PI - 0.1); g.moveTo(fx + 4, my + 22); g.lineTo(fx + 4, my + 46); }, 4, FPEN);
      mpen(g => { g.beginPath(); for (let i = 0; i <= 8; i++) g.lineTo(fx - 36 + i * 9, my - 6 + (i % 2 ? -5 : 4)); g.moveTo(fx - 36, my - 6); g.quadraticCurveTo(fx - 30, my + 30, fx - 10, my + 30); g.moveTo(fx + 18, my + 30); g.quadraticCurveTo(fx + 32, my + 28, fx + 36, my - 6); }, 6);
      for (const [dx, dy, r] of [[gap + 66, -54, 9], [gap + 84, -20, 7], [-(gap + 70), -46, 8]]) { washOf(d, [[fx + dx, fy + dy - r * 2.2], [fx + dx + r, fy + dy], [fx + dx, fy + dy + r], [fx + dx - r, fy + dy]], [120, 180, 240], 0.55, 0.8, 3); pen(d, g => { g.beginPath(); g.moveTo(fx + dx, fy + dy - r * 2.2); g.quadraticCurveTo(fx + dx + r * 1.3, fy + dy + r * 0.6, fx + dx, fy + dy + r); g.quadraticCurveTo(fx + dx - r * 1.3, fy + dy + r * 0.6, fx + dx, fy + dy - r * 2.2); }, 2.5, 'rgba(70,110,170,0.8)'); }
    }
    if (place === 'Peeking') {
      // the fold of dough hanging over the eyes: a dark gap under it, the eyes look out from the shadow
      const hw = gap + 44;
      washOf(d, [[fx - hw, fy + 6], [fx - hw * 0.5, fy - 18], [fx, fy - 24], [fx + hw * 0.5, fy - 18], [fx + hw, fy + 6], [fx + hw * 0.6, fy + 24], [fx, fy + 30], [fx - hw * 0.6, fy + 24]], coal ? [20, 18, 24] : shadeCol.map(v => v * 0.6 | 0), coal ? 0.4 : 0.2, 2, 4);
    }
    d.restore();

    // the koi's barbels and side fins, and its tail on a canvas of its own so it can swish
    let tailCv = null;
    const tailSide = sj[6] < 0.5 ? 1 : -1, TBx = BX + tailSide * 268, TBy = y0 - 120;
    if (K === 'Koi Bun') {
      for (const sd of [-1, 1]) pen(d, g => { g.beginPath(); g.moveTo(fx + sd * 52, fy + 70); g.quadraticCurveTo(fx + sd * 80, fy + 92, fx + sd * 74, fy + 128); }, 4);
      for (const sd of [-1, 1]) {
        const fin = [[BX + sd * 230, y0 - 70], [BX + sd * 300, y0 - 40], [BX + sd * 318, y0 + 6], [BX + sd * 262, y0 - 6]];
        d.fillStyle = '#fdf9f0'; smooth(d, fin); d.fill(); washOf(d, fin, [244, 150, 90], 0.36, 2, 4); inkLine(d, fin, 3.5);
      }
      let tg;
      [tailCv, tg] = canvas();
      const tl = [[0, -48], [90, -112], [178, -156], [150, -62], [116, 0], [150, 62], [178, 140], [92, 94], [0, 44]].map(([x, y]) => [TBx + tailSide * x, TBy + y]);
      tg.fillStyle = '#fdf9f0'; smooth(tg, tl); tg.fill();
      washOf(tg, tl, [242, 124, 60], 0.4, 4, 5);
      washOf(tg, tl.map(([x, y]) => [TBx + (x - TBx) * 0.55, TBy + (y - TBy) * 0.55]), [236, 92, 44], 0.3, 3, 3);
      for (let i = 0; i < 7; i++) pen(tg, g => { const a = -0.9 + i * 0.3; g.beginPath(); g.moveTo(TBx, TBy); g.lineTo(TBx + tailSide * Math.cos(a) * 160, TBy + Math.sin(a) * 150); }, 2.2, 'rgba(150,70,40,0.6)');
      inkLine(tg, tl, 5);
    }

    // ---------- front of the dish, garnish and front treats ----------
    const [fc, f] = canvas();
    if (bamboo) {
      const tiers = dishN === 'Stacked Steamers' ? 2 : 1;
      for (let tier = tiers - 1; tier >= 0; tier--) {
        const oy = tier * 118, band = [];
        for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI; band.push([DX + Math.cos(a) * DW, DY - 40 + oy + Math.sin(a) * 80]); }
        for (let i = 30; i >= 0; i--) { const a = i / 30 * Math.PI; band.push([DX + Math.cos(a) * DW, DY + 110 + oy + Math.sin(a) * 80]); }
        washOf(f, band, tier ? [190, 150, 84] : [214, 172, 100], 0.32, 4, 5);
        f.strokeStyle = 'rgba(150,100,50,0.4)'; f.lineWidth = 4;
        for (let i = 1; i < 5; i++) { f.beginPath(); for (let j = 0; j <= 30; j++) { const a = j / 30 * Math.PI; const x = DX + Math.cos(a) * DW, y = DY - 40 + oy + i * 30 + Math.sin(a) * 80; j ? f.lineTo(x, y) : f.moveTo(x, y); } f.stroke(); }
        inkLine(f, band, 4.5);
        for (let i = 0; i < 10; i++) { const a = 0.15 + i / 9 * (Math.PI - 0.3), x = DX + Math.cos(a) * DW; pen(f, g => { g.beginPath(); g.moveTo(x, DY - 30 + oy + Math.sin(a) * 80); g.lineTo(x, DY + 100 + oy + Math.sin(a) * 80); }, 2.5); }
      }
    }
    if (garnish.n === 'Chopsticks on a Rest') {
      // laid down on a little celadon rest at the front corner of the table, well clear of the face
      washOf(f, ellipsePts(872, 950, 54, 20, 18), [110, 80, 60], 0.12, 3, 3);
      const rest = [[826, 944], [836, 920], [872, 914], [908, 920], [918, 944], [872, 950]];
      washOf(f, rest, [150, 200, 176], 0.6, 1.5, 4); inkLine(f, rest, 3.5);
      for (const [x0, y0c, x1, y1] of [[560, 990, 1010, 902], [540, 972, 1004, 884]]) {
        const st = [[x0, y0c - 5], [x1, y1 - 9], [x1, y1 + 9], [x0, y0c + 5]];
        washOf(f, st, [170, 60, 40], 0.55, 1.5, 4); pen(f, g => { g.beginPath(); st.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); }, 3);
      }
    } else if (garnish.n === 'Scallion' || garnish.n === 'Sesame' || garnish.n === 'Lucky Dot') {
      const gy = K === 'Siu Mai' ? BY - 332 : K === 'Wonton' ? wontonC - 200 : topY + 34;
      if (garnish.n === 'Scallion') for (let i = 0; i < 6; i++) {
        const x = BX - 120 + i * 50 + J() * 16, y = (K === 'Siu Mai' || K === 'Wonton' ? gy : topAt(BX - 120 + i * 50) + 28) + J() * 8;
        washOf(d, ellipsePts(x, y, 16, 12, 12), [120, 190, 80], 0.5, 2, 3);
        d.strokeStyle = PEN; d.lineWidth = 3; d.beginPath(); d.ellipse(x, y, 16, 12, 0, 0, 7); d.stroke();
        d.beginPath(); d.ellipse(x, y, 7, 5, 0, 0, 7); d.stroke();
      } else if (garnish.n === 'Sesame') for (let i = 0; i < 18; i++) {
        const x = BX + J() * 150, y = (K === 'Siu Mai' || K === 'Wonton' ? gy - 20 : topAt(x) + 20) + Math.abs(J()) * 70;
        d.fillStyle = i % 3 ? '#fff8e8' : '#2b2420'; d.strokeStyle = PEN; d.lineWidth = 2; d.beginPath(); d.ellipse(x, y, 9, 5, J() * 2, 0, 7); d.fill(); d.stroke();
      } else washOf(d, ellipsePts(BX, K === 'Siu Mai' ? BY - 335 : gy + 46, 28, 28, 18), [220, 30, 40], 0.55, 2, 5);
    } else if (garnish.n === 'Soy Dish') {
      washOf(f, ellipsePts(860, 880, 110, 44, 30), [240, 244, 250], 0.7, 3, 4);
      washOf(f, ellipsePts(860, 878, 80, 28, 24), [80, 40, 20], 0.5, 3, 5);
      pen(f, g => smooth(g, ellipsePts(860, 880, 110, 44, 30)), 4);
    } else if (garnish.n === 'Little Sibling') {
      const sx = 160, sy = 900;
      const sp = []; for (let i = 0; i < 30; i++) { const a = Math.PI + i / 30 * Math.PI * 2, cx2 = Math.cos(a), cy2 = Math.sin(a); sp.push([sx + cx2 * 110, sy - 20 + (cy2 < 0 ? cy2 * 130 : cy2 * 26)]); }
      f.fillStyle = '#fdf9f0'; smooth(f, sp); f.fill();
      washOf(f, sp, bodyCol, 0.6, 4, 4);
      inkLine(f, sp, 5);
      pen(f, g => { g.beginPath(); g.arc(sx - 34, sy - 60, 8, 0.2, Math.PI - 0.2); g.moveTo(sx + 42, sy - 60); g.arc(sx + 34, sy - 60, 8, 0.2, Math.PI - 0.2); g.moveTo(sx + 10, sy - 40); g.arc(sx, sy - 40, 10, 0, Math.PI); }, 5, FPEN);
      washOf(f, ellipsePts(sx - 60, sy - 40, 18, 11, 12), [240, 110, 120], 0.3, 2, 3);
      washOf(f, ellipsePts(sx + 60, sy - 40, 18, 11, 12), [240, 110, 120], 0.3, 2, 3);
    }
    if (prop === 'Teacup') {
      const tx = PX + propSide * 10, ty = 900;
      const cup = [[tx - 70, ty - 70], [tx + 70, ty - 70], [tx + 56, ty + 10], [tx - 56, ty + 10]];
      washOf(f, cup, [170, 205, 190], 0.45, 2, 5);
      washOf(f, ellipsePts(tx, ty - 70, 70, 16, 24), [170, 110, 50], 0.5, 1.5, 4);
      pen(f, g => { g.beginPath(); g.moveTo(tx - 70, ty - 70); g.quadraticCurveTo(tx - 68, ty + 6, tx - 50, ty + 12); g.lineTo(tx + 50, ty + 12); g.quadraticCurveTo(tx + 68, ty + 6, tx + 70, ty - 70); }, 4);
      pen(f, g => smooth(g, ellipsePts(tx, ty - 70, 70, 16, 24)), 3.5);
      washOf(f, ellipsePts(tx - 34, ty - 34, 10, 22, 10), [255, 255, 255], 0.5, 2, 2);
    } else if (prop === 'Chili Oil') {
      const tx = PX, ty = 905;
      washOf(f, ellipsePts(tx, ty, 90, 38, 28), [245, 245, 248], 0.75, 2, 4);
      washOf(f, ellipsePts(tx, ty - 2, 64, 24, 24), [210, 50, 30], 0.55, 2, 5);
      f.fillStyle = 'rgba(120,20,10,0.7)'; for (let i = 0; i < 14; i++) { f.beginPath(); f.arc(tx + J() * 50, ty + J() * 16, 2.5, 0, 7); f.fill(); }
      pen(f, g => smooth(g, ellipsePts(tx, ty, 90, 38, 28)), 4);
      pen(f, g => { g.beginPath(); g.moveTo(tx + 30, ty - 6); g.lineTo(tx + 120 * -propSide * -1, ty - 70); }, 6, 'rgba(160,110,60,0.8)');
    } else if (prop === 'Fortune Cookie') {
      // the coveted one: a big folded cookie on the front of the dish, a slip of paper poking out of it
      // (it slides right out when tapped) and a glint drawn over it each frame
      washOf(f, ellipsePts(CK.x, CK.y - 30, 230, 150, 30), [255, 226, 140], 0.16, 14, 4); // a soft golden glow round it
      washOf(f, ellipsePts(CK.x + 20, CK.y + 44, 180, 30, 24), [110, 80, 60], 0.14, 4, 3); // its shadow on the dish
      f.save(); f.translate(CK.x, CK.y); f.scale(CK.s, CK.s);
      const tx = 0, ty = 0, ck = [[tx - 82, ty + 12], [tx - 62, ty - 40], [tx - 12, ty - 64], [tx + 40, ty - 50], [tx + 84, ty - 8], [tx + 52, ty + 22], [tx, ty + 6], [tx - 42, ty + 26]];
      f.fillStyle = '#fbf3e2'; smooth(f, ck); f.fill();
      washOf(f, ck, [236, 178, 84], 0.62, 2, 5);
      washOf(f, [[tx - 40, ty - 30], [tx + 10, ty - 52], [tx + 42, ty - 20], [tx, ty - 2]], [190, 112, 36], 0.4, 2, 3);
      washOf(f, [[tx - 70, ty + 8], [tx - 52, ty - 30], [tx - 30, ty - 14], [tx - 38, ty + 16]], [255, 236, 190], 0.5, 1.5, 2); // a toasted sheen
      inkLine(f, ck, 4);
      pen(f, g => { g.beginPath(); g.moveTo(tx - 10, ty - 62); g.quadraticCurveTo(tx + 8, ty - 22, tx, ty + 6); }, 3.5);
      f.restore();
    } else if (prop === 'Egg Tart') {
      const tx = PX, ty = 895, shell = [];
      for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; shell.push([tx + Math.cos(a) * (84 + (i % 2) * 6), ty + Math.sin(a) * (40 + (i % 2) * 3)]); }
      washOf(f, shell, [222, 170, 90], 0.55, 1.5, 4);
      washOf(f, ellipsePts(tx, ty - 6, 66, 26, 28), [250, 210, 70], 0.65, 2, 5);
      for (let i = 0; i < 4; i++) washOf(f, ellipsePts(tx + J() * 40, ty - 6 + J() * 12, 8, 5, 10), [180, 100, 40], 0.4, 1, 2);
      pen(f, g => smooth(g, shell), 3.5); pen(f, g => smooth(g, ellipsePts(tx, ty - 6, 66, 26, 28)), 3);
    }

    // paper grain over everything
    const grain = document.createElement('canvas'); grain.width = grain.height = N;
    const gx = grain.getContext('2d'), img = gx.createImageData(N, N), px = img.data;
    let s = h | 1;
    const tooth = paper === 'Kraft' ? 1.6 : 1;
    for (let i = 0; i < px.length; i += 4) {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      const v = (s >>> 24);
      px[i] = px[i + 1] = px[i + 2] = 120; px[i + 3] = (v < 50 ? 26 : v < 120 ? 10 : 0) * tooth;
    }
    gx.putImageData(img, 0, 0);

    const ctx = c.ctx;
    const eye1 = (sd, ex, ey, open, t) => {
      if (E === 'Peeping') {   // big round eyes looking out from under the fold, each with a glint
        if (open < 0.3) { ctx.beginPath(); ctx.moveTo(ex - 18, ey + 4); ctx.lineTo(ex + 18, ey + 4); ctx.stroke(); return; }
        ctx.beginPath(); ctx.ellipse(ex + lookSide * 3, ey + 4, 16, 19, 0, 0, 7); ctx.fill();
        ctx.fillStyle = coal ? 'rgba(40,30,30,0.9)' : 'rgba(255,252,240,0.95)'; ctx.beginPath(); ctx.arc(ex + lookSide * 3 + 6, ey + 8, 5.5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(ex + lookSide * 3 - 5, ey + 15, 2.5, 0, 7); ctx.fill();
        return;
      }
      if (E === 'Content' || (E === 'Wink' && sd === 1) || E === 'Happy Tears') {
        ctx.beginPath(); ctx.arc(ex, ey + 8, 18, Math.PI + 0.5, -0.5); ctx.stroke();
        if (E === 'Happy Tears') { ctx.fillStyle = 'rgba(120,180,240,0.6)'; ctx.beginPath(); ctx.ellipse(ex + sd * 24, ey + 14 + ((t * 0.5 + sd * 0.3) % 1 + 1) % 1 * 16, 6, 9, 0, 0, 7); ctx.fill(); ctx.fillStyle = FPEN; }
        return;
      }
      if (E === 'Dizzy') {
        ctx.lineWidth = 4.5; ctx.beginPath();
        for (let i = 0; i < 28; i++) { const a = i * 0.5 + t * 1.2 * sd, r = 1.5 + i * 0.7; ctx.lineTo(ex + Math.cos(a) * r, ey + Math.sin(a) * r * Math.max(0.15, open)); }
        ctx.stroke(); ctx.lineWidth = 7; return;
      }
      if (open < 0.3 || E === 'Sleepy') { ctx.beginPath(); ctx.arc(ex, ey - 4, 18, 0.5, Math.PI - 0.5); ctx.stroke(); return; }
      if (E === 'Dots' || E === 'Wink' || E === 'Dot Brows' || E === 'Determined') {
        ctx.beginPath(); ctx.ellipse(ex, ey, 11, 14, 0, 0, 7); ctx.fill();
        if (E === 'Dot Brows') { ctx.beginPath(); ctx.ellipse(ex - sd * 4, ey - 36, 9, 5.5, sd * 0.2, 0, 7); ctx.fill(); }
        if (E === 'Determined') { ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ex - sd * 22, ey - 22); ctx.lineTo(ex + sd * 18, ey - 30); ctx.stroke(); ctx.lineWidth = 7; }
      } else if (E === 'Sparkle' || E === 'Teary' || E === 'Big Sparkle') {
        const bs = E === 'Big Sparkle' ? 1.25 : 1;
        ctx.beginPath(); ctx.ellipse(ex, ey, 20 * bs, 24 * bs, 0, 0, 7); ctx.fill();
        ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(ex + 7 * bs, ey - 8 * bs, 7 * bs, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(ex - 6 * bs, ey + 9 * bs, 3.5 * bs, 0, 7); ctx.fill();
        if (E === 'Big Sparkle') { const tw = 0.6 + 0.4 * Math.sin(t * 2 + sd); ctx.beginPath(); for (let i = 0; i < 8; i++) { const r2 = i % 2 ? 2 : 9 * tw, a = i * Math.PI / 4; ctx.lineTo(ex + sd * 28 + Math.cos(a) * r2, ey - 30 + Math.sin(a) * r2); } ctx.fill(); }
        ctx.fillStyle = FPEN;
        if (E === 'Teary') { ctx.fillStyle = 'rgba(120,180,240,0.6)'; ctx.beginPath(); ctx.ellipse(ex + sd * 10, ey + 30 + ((t * 0.3 + sd) % 1 + 1) % 1 * 20, 7, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = FPEN; }
      } else if (E === 'Shy') {
        ctx.beginPath(); ctx.ellipse(ex + sd * 3, ey + 6, 9, 10, 0, 0, 7); ctx.fill();
        ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(ex, ey + 2, 17, Math.PI + 0.35, -0.35); ctx.stroke();
        ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ex + sd * 15, ey - 6); ctx.lineTo(ex + sd * 24, ey - 13); ctx.stroke(); ctx.lineWidth = 7;
      } else if (E === 'Starry' || E === 'Jade Glint') {
        if (E === 'Starry') {
          ctx.fillStyle = 'rgba(240,170,40,0.9)'; ctx.beginPath();
          for (let i = 0; i < 10; i++) { const r2 = i % 2 ? 10 : 26, a = -Math.PI / 2 + i * Math.PI / 5; ctx.lineTo(ex + Math.cos(a) * r2, ey + Math.sin(a) * r2); }
          ctx.closePath(); ctx.fill(); ctx.lineWidth = 3.5; ctx.stroke(); ctx.lineWidth = 7; ctx.fillStyle = FPEN;
        } else {
          const jg = ctx.createRadialGradient(ex - 5, ey - 6, 2, ex, ey, 24); jg.addColorStop(0, 'rgba(170,240,200,0.95)'); jg.addColorStop(0.6, 'rgba(60,160,110,0.95)'); jg.addColorStop(1, 'rgba(20,80,60,0.95)');
          ctx.fillStyle = jg; ctx.beginPath(); ctx.ellipse(ex, ey, 21, 25, 0, 0, 7); ctx.fill(); ctx.lineWidth = 3.5; ctx.stroke(); ctx.lineWidth = 7;
          ctx.fillStyle = 'rgba(255,255,250,' + (0.7 + 0.3 * Math.sin(t * 1.7 + sd)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(ex + 7, ey - 9, 6, 0, 7); ctx.fill(); ctx.fillStyle = FPEN;
        }
      }
    };
    // the whole-face expressions' eyes
    const faceEye = (sd, ex, ey, open, t) => {
      if (face === 'Asleep') {
        ctx.beginPath(); ctx.arc(ex, ey - 6, 19, 0.45, Math.PI - 0.45); ctx.stroke(); ctx.lineWidth = 3.5;
        for (const q of [-1, 0, 1]) { const a = Math.PI / 2 + q * 0.55; ctx.beginPath(); ctx.moveTo(ex + Math.cos(a) * 19, ey - 6 + Math.sin(a) * 19); ctx.lineTo(ex + Math.cos(a) * 28, ey - 6 + Math.sin(a) * 28); ctx.stroke(); }
      } else if (face === 'Puffed Cheeks') {
        ctx.beginPath(); ctx.moveTo(ex + sd * 20, ey - 7); ctx.lineTo(ex - sd * 18, ey + 2); ctx.stroke(); ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(ex + sd * 26, ey - 12); ctx.lineTo(ex + sd * 35, ey - 19); ctx.moveTo(ex + sd * 27, ey - 1); ctx.lineTo(ex + sd * 37, ey + 1); ctx.stroke();
      } else if (face === 'Laughing') {
        const sh = Math.sin(t * 23) * 2.2;
        ctx.beginPath(); ctx.moveTo(ex + sd * 17, ey - 15 + sh); ctx.lineTo(ex - sd * 14, ey + sh); ctx.lineTo(ex + sd * 17, ey + 15 + sh); ctx.stroke();
        ctx.fillStyle = 'rgba(120,180,240,0.7)';
        for (const o of [0, 0.5]) { const u = (t * 1.1 + o + (sd > 0 ? 0.25 : 0)) % 1; ctx.globalAlpha = 1 - u; ctx.beginPath(); ctx.ellipse(ex + sd * (28 + u * 44), ey - 8 - u * 26 + u * u * 70, 5, 7, 0, 0, 7); ctx.fill(); }
        ctx.globalAlpha = 1;
      } else if (face === 'Side-Eye') {
        ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ex - 22, ey - 5 - lookSide * sd * 1.5); ctx.lineTo(ex + 22, ey - 5 + lookSide * sd * 1.5); ctx.stroke();
        if (open >= 0.3) { ctx.beginPath(); ctx.ellipse(ex + lookSide * 10, ey + 4, 9, 9, 0, 0, 7); ctx.fill(); }
      } else if (face === 'Hot Hot') {
        ctx.lineWidth = 5.5; ctx.beginPath(); for (let i = 0; i <= 6; i++) ctx.lineTo(ex - 21 + i * 7, ey + (i % 2 ? -5 : 5)); ctx.stroke();
        const u = (t * 0.8 + (sd > 0 ? 0.5 : 0)) % 1; ctx.fillStyle = 'rgba(120,180,240,0.6)'; ctx.beginPath(); ctx.ellipse(ex + sd * 22, ey + 12 + u * 24, 5, 7, 0, 0, 7); ctx.fill();
      }
    };
    const eyesDraw = (open, t) => {
      ctx.strokeStyle = FPEN; ctx.fillStyle = FPEN; ctx.lineCap = 'round'; ctx.lineWidth = 7;
      for (const sd of [-1, 1]) {
        const ex = fx + sd * gap, ey = fy;
        ctx.save(); ctx.translate(ex + gzx, ey + gzy); ctx.scale(es, es); ctx.translate(-ex, -ey);
        if (face) faceEye(sd, ex, ey, open, t); else eye1(sd, ex, ey, open, t);
        ctx.restore();
      }
    };
    // what moves around a whole face: the sleeper's bubble and z's, the scalded one's ear-steam
    const faceExtras = t => {
      if (face === 'Asleep') {
        const my = fy + 50, u = ((t + blinkPh) * 0.27) % 1;
        if (u < 0.92) {
          const r = 5 + 21 * u, bx = fx + 20 + r * 0.75, by = my + 10 + r * 0.25;
          ctx.fillStyle = 'rgba(196,224,250,0.32)'; ctx.strokeStyle = 'rgba(80,120,170,0.75)'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, r * 0.62, 3.6, 4.6); ctx.stroke();
        }
        ctx.strokeStyle = FPEN; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for (let q = 0; q < 3; q++) {
          const v = ((t * 0.22 + q / 3) % 1), zx = fx + gap + 58 + v * 46, zy = fy - 64 - v * 120, zs = 9 + v * 13;
          ctx.globalAlpha = Math.sin(v * Math.PI); ctx.lineWidth = 3 + v * 2;
          ctx.beginPath(); ctx.moveTo(zx - zs, zy - zs); ctx.lineTo(zx + zs, zy - zs); ctx.lineTo(zx - zs, zy + zs); ctx.lineTo(zx + zs, zy + zs); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else if (face === 'Hot Hot') {
        for (const sd of [-1, 1]) for (let q = 0; q < 3; q++) {
          const u = (t * 0.85 + q / 3 + (sd > 0 ? 0.15 : 0)) % 1, r = 9 + u * 24;
          const x = fx + sd * (gap + 118 + u * 80), y = fy - 46 - u * 70 + Math.sin(u * 9 + q) * 6;
          ctx.globalAlpha = (1 - u) * 0.9;
          ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.strokeStyle = 'rgba(140,156,186,0.5)'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };
    // steam: loose, broken wet strokes, each with a faint cool edge where the water dried
    const dashes = [[92, 16, 40, 22, 110, 14], [70, 20, 96, 14, 36, 26], [104, 24, 30, 16, 80, 18]];
    const steam = (t, burst) => {
      ctx.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        const ph = ((t + steamPh) * 0.22 + i / 3) % 1;
        const x0 = BX - 120 + i * 120, ys = topY - 70 - ph * 200;
        const a = Math.sin(ph * Math.PI) * 0.5;
        if (a < 0.02) continue;
        // a faint cool damp patch under it, then two loose, broken strokes of white laid side by side
        for (const [lw, col, al, dx, dash] of [[46, '170,186,212', a * 0.16, 0, null], [17, '255,255,255', a * 1.2, -4, dashes[i]], [9, '255,255,255', a * 0.9, 9, dashes[(i + 1) % 3]]]) {
          ctx.setLineDash(dash || []); ctx.lineDashOffset = -ph * 140 + dx * 5;
          ctx.strokeStyle = 'rgba(' + col + ',' + Math.min(1, al).toFixed(3) + ')'; ctx.lineWidth = lw;
          ctx.beginPath();
          for (let j = 0; j <= 10; j++) { const yy = ys - j * 15, xx = x0 + dx * (1 - j / 14) + Math.sin(j * 0.55 + t * 1.1 + i * 2) * (12 + j * 2.6) + Math.sin(j * 1.7 + i) * 4; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);
      for (const b of burst) {   // a puff squeezed out of the top by a poke
        const u = (t - b.t0) / 1.4;
        if (u < 0 || u > 1) continue;
        for (let q = 0; q < 4; q++) {
          const r = 30 + u * 90 + q * 12, cxp = b.x + (q - 1.5) * 34 * (0.4 + u), cyp = topY - 30 - u * 220 - q * 18;
          ctx.fillStyle = 'rgba(255,255,255,' + ((1 - u) * 0.42).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(cxp, cyp, r * 0.6, 0, 7); ctx.fill();
        }
      }
    };
    // ---------- the viewer pokes the dough ----------
    // a second LCG keyed on another slice of the hash: the painting's own draws stay as they were
    let q2 = (parseInt(c.hash.slice(10, 18), 16) ^ 0xa511e9b3) >>> 0;
    const qr = () => { q2 = (Math.imul(q2, 22695477) + 1) >>> 0; return q2 / 4294967296; };
    const squeak = [0, 2, 4, 7, 9].map(v => v + 76 + Math.floor(qr() * 4));
    let jig = 0, jv = 0, lastT = 0, pressed = false, fluster = 0;
    const puffs = [];
    let nextRing = 0, kickAt = -9, spiritA = 0.94, spiritGoal = 0.94, spiritPuff = -9, wasHov = false, cookieAt = -9;
    const rings = [], drops = [];
    const onBun = (x, y) => Math.abs(x - BX) < bw + 20 && y > topY - 40 && y < botY + 30;
    const knead = t => {
      const dt = Math.max(0, Math.min(0.05, t - lastT)); lastT = t;
      const inp = c.input;
      // the legendaries: the koi makes rings where the pointer is; the steam spirit thins when touched
      const pX = inp.x * 1000, pY = inp.y * 1000, hovBun = inp.inside && onBun(pX, pY);
      if (legend === 'Koi Bun' && inp.inside && t >= nextRing && !hovBun) { nextRing = t + 0.7; rings.push({ x: pX, y: pY, t0: t }); if (rings.length > 6) rings.shift(); c.sound.note(squeak[Math.floor(qr() * 5)] - 7, { dur: 0.08, vel: 0.04, wave: 'sine' }); }
      if (legend === 'Steam Spirit') {
        if (hovBun && !wasHov) c.sound.hit('noise', 0.05, { cutoff: 2400, dur: 0.5 });
        wasHov = hovBun;
        spiritGoal = hovBun ? 0.38 : 0.94;
        spiritA += (spiritGoal - spiritA) * Math.min(1, dt * 4);
      }
      for (const doughPoke of inp.taps()) {
        const x = doughPoke.x * 1000, y = doughPoke.y * 1000;
        if (prop === 'Fortune Cookie' && Math.abs(x - CK.x) < 150 && Math.abs(y - CK.y) < 95) {
          if (t - cookieAt < 1) continue;
          cookieAt = t;
          c.sound.hit('noise', 0.1, { cutoff: 4200, dur: 0.05 }); c.sound.hit('noise', 0.08, { cutoff: 3600, dur: 0.05, at: 0.07 });
          c.sound.note(squeak[2], { dur: 0.4, vel: 0.1, wave: 'sine', at: 0.2 }); c.sound.note(squeak[4], { dur: 0.6, vel: 0.09, wave: 'sine', at: 0.32 });
          continue;
        }
        if (!onBun(x, y)) continue;
        jv -= 2.6; fluster = Math.min(1.4, fluster + 0.45);
        puffs.push({ t0: t, x: BX + (x - BX) * 0.3 }); if (puffs.length > 4) puffs.shift();
        const n = squeak[Math.floor(qr() * squeak.length)];
        if (legend === 'Koi Bun') {
          // a flick of the tail and a splash
          kickAt = t;
          for (let q = 0; q < 7; q++) drops.push({ t0: t, a: -1.9 + q * 0.32 + tailSide * 0.5, v: 260 + q % 3 * 70 });
          if (drops.length > 21) drops.splice(0, 7);
          c.sound.hit('click', 0.12); c.sound.note(n, { dur: 0.08, vel: 0.14, wave: 'sine', at: 0.05 }); c.sound.note(n + 7, { dur: 0.06, vel: 0.1, wave: 'sine', at: 0.14 }); c.sound.note(n + 3, { dur: 0.06, vel: 0.08, wave: 'sine', at: 0.22 });
        } else if (legend === 'Steam Spirit') {
          // it puffs apart into vapour and gathers itself again
          if (t - spiritPuff < 1.4) continue;
          spiritPuff = t;
          c.sound.hit('noise', 0.12, { cutoff: 900, dur: 0.7 });
          c.sound.note(n, { dur: 0.7, vel: 0.08, wave: 'sine', at: 0.9 }); c.sound.note(n + 4, { dur: 0.9, vel: 0.07, wave: 'sine', at: 1.05 });
        } else {
          c.sound.note(n, { dur: 0.09, vel: 0.22, wave: 'sine' });
          c.sound.note(n - 5, { dur: 0.16, vel: 0.18, wave: 'sine', at: 0.07 });
          c.sound.hit('noise', 0.14, { cutoff: 1500, dur: 0.32, at: 0.05 });
        }
      }
      const hold = inp.down && inp.inside && onBun(inp.x * 1000, inp.y * 1000);
      if (hold && !pressed) c.sound.note(squeak[0] - 12, { dur: 0.22, vel: 0.16, wave: 'triangle', cutoff: 1200 });
      pressed = hold;
      const goal = hold ? -0.22 : 0;
      jv += (-(jig - goal) * 160 - jv * 7) * dt;
      jig += jv * dt;
      fluster = Math.max(0, fluster - dt * 0.35);
      if (Math.abs(jig) < 1e-4 && Math.abs(jv) < 1e-3 && !hold) { jig = 0; jv = 0; }
    };
    const lean = (sj[1] - 0.5) * 0.07, peek = place === 'Peeking';
    // the poised chopsticks hover off the bun's upper shoulder (never over the face), opening and closing as if about to pinch
    let chS = null;
    if (garnish.n === 'Chopsticks Poised') {
      let best2 = -1e9; for (const p of outline) { const v = (p[0] - BX) * 0.8 - (p[1] - BY) * 0.6; if (v > best2) { best2 = v; chS = p; } }
      const nx = chS[0] - BX, ny = chS[1] - (topY + bh * 0.6), nl = Math.hypot(nx, ny) || 1; chS = [chS[0] + nx / nl * 16, chS[1] + ny / nl * 16];
    }
    const chopDraw = t => {
      const open = 0.045 + 0.03 * Math.sin(t * 1.3), ang = -0.72, L = 560, H = [chS[0] + Math.cos(ang) * L, chS[1] + Math.sin(ang) * L];
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      for (const sd of [-1, 1]) {
        const a = ang + Math.PI + sd * open, ux = Math.cos(a), uy = Math.sin(a), px2 = -uy, py2 = ux;
        const tip = [H[0] + ux * L, H[1] + uy * L], band = [H[0] + ux * (L - 80), H[1] + uy * (L - 80)];
        const quad = (p0, w0, p1, w1) => { ctx.beginPath(); ctx.moveTo(p0[0] + px2 * w0, p0[1] + py2 * w0); ctx.lineTo(p1[0] + px2 * w1, p1[1] + py2 * w1); ctx.lineTo(p1[0] - px2 * w1, p1[1] - py2 * w1); ctx.lineTo(p0[0] - px2 * w0, p0[1] - py2 * w0); ctx.closePath(); };
        ctx.fillStyle = 'rgba(176,72,48,0.88)'; quad(H, 12, band, 7); ctx.fill();
        ctx.fillStyle = 'rgba(236,208,160,0.95)'; quad(band, 7, tip, 5); ctx.fill();
        ctx.strokeStyle = PEN; ctx.lineWidth = 3.5; quad(H, 12, tip, 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(band[0] + px2 * 7, band[1] + py2 * 7); ctx.lineTo(band[0] - px2 * 7, band[1] - py2 * 7); ctx.stroke();
      }
    };
    const draw = t => {
      ctx.resetTransform();
      ctx.drawImage(bgc, 0, 0);
      const br = jig === 0 ? 1 + Math.sin(t * 1.6 + breathPh) * 0.012 : (1 + Math.sin(t * 1.6 + breathPh) * 0.012) * (1 + jig);
      ctx.translate(BX * k, botY * k); ctx.rotate(lean); ctx.scale(1 / Math.sqrt(br), br); ctx.translate(-BX * k, -botY * k);
      if (rings.length) {
        // rings spreading on the pond, painted as thin wet strokes
        ctx.save(); ctx.resetTransform(); ctx.scale(k, k);
        for (const r of rings) { const a = (t - r.t0) / 2.2; if (a > 1) continue; ctx.strokeStyle = 'rgba(70,110,180,' + ((1 - a) * 0.4).toFixed(3) + ')'; ctx.lineWidth = 5 * (1 - a) + 1; for (const q of [1, 0.6]) { ctx.beginPath(); ctx.ellipse(r.x, r.y, 20 + a * 150 * q, (20 + a * 150 * q) * 0.36, 0, 0, 7); ctx.stroke(); } }
        ctx.restore();
      }
      if (tailCv) {
        const sw = Math.sin(t * 1.7) * 0.06 + (t - kickAt < 1.2 ? Math.sin((t - kickAt) * 22) * 0.32 * (1 - (t - kickAt) / 1.2) : 0);
        ctx.save(); ctx.translate(TBx * k, TBy * k); ctx.rotate(sw * tailSide); ctx.translate(-TBx * k, -TBy * k); ctx.drawImage(tailCv, 0, 0); ctx.restore();
      }
      if (K === 'Steam Spirit') {
        const pa = t - spiritPuff, puff = pa < 0.45 ? pa / 0.45 : pa < 1.9 ? 1 - (pa - 0.45) / 1.45 : 0;
        ctx.globalAlpha = Math.max(0, spiritA * (1 - puff * 0.95));
        const sc = 1 + puff * 0.35, my2 = (topY + bh * 0.5) * k;
        ctx.translate(BX * k, my2); ctx.scale(sc, sc); ctx.translate(-BX * k, -my2);
      }
      ctx.drawImage(dc, 0, 0);
      ctx.scale(k, k);
      faceT(ctx);
      if (fluster > 0.02) {   // poked too often: it goes pink
        ctx.fillStyle = 'rgba(240,100,120,' + (Math.min(1, fluster) * 0.3).toFixed(3) + ')';
        for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(fx + sd * (gap + 52), fy + 40, 44, 27, 0, 0, 7); ctx.fill(); }
      }
      const bl = (t + blinkPh) % 4.4;
      if (jig < -0.09) {   // squeezed shut while squashed
        ctx.strokeStyle = FPEN; ctx.lineWidth = 7; ctx.lineCap = 'round';
        for (const sd of [-1, 1]) { const x = fx + sd * gap; ctx.beginPath(); ctx.moveTo(x - sd * 16, fy - 13); ctx.lineTo(x + sd * 12, fy); ctx.lineTo(x - sd * 16, fy + 13); ctx.stroke(); }
      } else {
        // peeking: the eyes show only below the fold of dough that hangs over them
        const hw = gap + 44;
        if (peek) { ctx.save(); ctx.beginPath(); ctx.moveTo(fx - hw - 300, fy + 8); ctx.lineTo(fx - hw, fy + 8); ctx.quadraticCurveTo(fx, fy - 30, fx + hw, fy + 8); ctx.lineTo(fx + hw + 300, fy + 8); ctx.lineTo(fx + hw + 300, fy + 400); ctx.lineTo(fx - hw - 300, fy + 400); ctx.closePath(); ctx.clip(); }
        eyesDraw(bl < 0.14 ? 0 : 1, t);
        if (peek) {
          ctx.restore(); ctx.strokeStyle = coal ? 'rgba(255,246,228,0.85)' : PEN; ctx.lineCap = 'round';
          ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx - hw, fy + 8); ctx.quadraticCurveTo(fx, fy - 30, fx + hw, fy + 8); ctx.stroke();
          ctx.lineWidth = 3.5; ctx.beginPath(); for (const u of [0.2, 0.42, 0.6, 0.8]) { const x = fx - hw + 2 * hw * u, y = fy + 8 - 4 * u * (1 - u) * 38; ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (u - 0.5) * 14, y - 16, x + (u - 0.5) * 30, y - 30); } ctx.stroke();
        }
      }
      faceExtras(t);
      ctx.resetTransform(); ctx.globalAlpha = 1;
      ctx.drawImage(fc, 0, 0);
      ctx.scale(k, k);
      if (chS) chopDraw(t);
      if (prop === 'Fortune Cookie') {
        // the slip of paper, with a little red seal, pokes out of the cookie and slides out when it is tapped
        const o = Math.min(1, Math.max(0, (t - cookieAt) / 0.6)), L = 66 + (cookieAt > 0 ? o * 100 : 0);
        ctx.save(); ctx.translate(CK.x, CK.y); ctx.scale(CK.s, CK.s); ctx.translate(4, -20); ctx.rotate(-0.28 * propSide);
        ctx.fillStyle = 'rgba(255,253,246,0.97)'; ctx.fillRect(0, -9, L * propSide, 18);
        ctx.strokeStyle = PEN; ctx.lineWidth = 2.5; ctx.strokeRect(0, -9, L * propSide, 18);
        if (L > 60) { ctx.fillStyle = 'rgba(200,40,40,0.85)'; ctx.fillRect((L - 18) * propSide, -6, 12 * propSide, 12); ctx.fillStyle = 'rgba(180,50,40,0.55)'; for (let q = 0; 12 + q * 14 + 7 < L - 24; q++) ctx.fillRect((12 + q * 14) * propSide, -2, 7 * propSide, 4); }
        ctx.restore();
        // a glint on the cookie: a four-point sparkle that twinkles, and a little one beside it
        const gx2 = CK.x - propSide * 64, gy2 = CK.y - 118, tw = 0.82 + 0.18 * Math.sin(t * 3.1);
        ctx.fillStyle = 'rgba(255,252,236,0.95)'; ctx.strokeStyle = 'rgba(214,150,40,0.9)'; ctx.lineWidth = 4;
        for (const [sx2, sy2, r2] of [[gx2, gy2, 54 * tw], [gx2 + propSide * 66, gy2 + 40, 20 * (1.8 - tw)]]) {
          ctx.beginPath();
          for (let q = 0; q < 8; q++) { const a = q * Math.PI / 4, rr = q % 2 ? r2 * 0.22 : r2; ctx.lineTo(sx2 + Math.cos(a) * rr, sy2 + Math.sin(a) * rr); }
          ctx.closePath(); ctx.fill(); ctx.stroke();
        }
      }
      if (drops.length) for (const dp of drops) {
        // splash: drops thrown from the tail, falling back
        const a = t - dp.t0; if (a > 0.9) continue;
        const x = TBx + tailSide * 60 + Math.cos(dp.a) * dp.v * a * tailSide, y = TBy - 60 + Math.sin(dp.a) * dp.v * a + 520 * a * a;
        ctx.fillStyle = 'rgba(90,140,210,' + ((1 - a / 0.9) * 0.6).toFixed(3) + ')'; ctx.beginPath(); ctx.ellipse(x, y, 7, 9, 0, 0, 7); ctx.fill();
      }
      steam(t, puffs);
      if (K === 'Steam Spirit') steam(t * 0.8 + 3.3, puffs);
      ctx.resetTransform();
      ctx.drawImage(grain, 0, 0);
    };
    // Draw every overlay once before the first real frame (a poke's puff, the blush, the squeezed eyes, a blink,
    // the cookie's slip, the koi's rings and splash, the spirit's puff), so the first poke or tap doesn't stall
    // while the canvas sets up those drawing operations; then put everything back and draw the still.
    puffs.push({ t0: 0, x: BX }); fluster = 1; jig = -0.2; cookieAt = 0; spiritPuff = 0;
    if (K === 'Koi Bun') { rings.push({ x: 300, y: 300, t0: 0 }); drops.push({ t0: 0.3, a: -1, v: 200 }); kickAt = 0; }
    draw(0.6); jig = 0; eyesDraw(0, 0.6); ctx.resetTransform(); ctx.globalAlpha = 1;
    puffs.length = rings.length = drops.length = 0; fluster = 0; cookieAt = -9; spiritPuff = -9; kickAt = -9;
    draw(0);
    return t => { knead(t); draw(t); };
  },
});

})(window.Proto);
