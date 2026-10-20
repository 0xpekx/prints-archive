// Primer: from D:/code/synaesthesia/public/drop03/pieces/051.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Primer: characters assembled from Bauhaus primitives (disc, square, triangle,
// arch) in the primary colours, on flat poster fields, set as pixel art on a
// 48-cell grid. Every part of a sitter is one plain shape filled cell by cell:
// head, hair, hat, brows, nose, glasses, collar, even the bird on the shoulder.
// No outlines, no shading: only flat ink in hard square cells. The eyes, brows,
// noses, mouths and the small jewellery are drawn as hand-set cell glyphs.
Proto.add({
  num: 51,
  name: 'Primer',
  fam: 'Minimal & Geometric',
  recipe: 'Each hash is a sitter cut from plain primitives in primary inks on a flat poster field, set as pixel art on a 48-cell grid: a head from a dozen shapes, hair, hat, brows, nose, mouth, eyewear, ears, collar and sometimes a companion. Head proportions, the spacing of the features, the pose and the ink set vary; about one in five hundred is a red balloon, and rarer still are the legendaries: Gold Foil, Unprinted and Sun.',
  interactive: 'Tap the face to make it react. Tap the poster to pass the colours round.',
  music: true,
  seed: 632,
  make(c) {
    const S = c.size, x = c.ctx;

    // sfc32 seeded from the four first words of the hash: the poster's original stream
    const w = [];
    for (let i = 0; i < 4; i++) w.push(parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0);
    let [a, b, d, e] = w;
    const rnd = () => {
      a >>>= 0; b >>>= 0;
      d >>>= 0; e >>>= 0;
      const t = ((a + b) | 0) + e | 0;
      e = e + 1 | 0;
      a = b ^ b >>> 9;
      b = d + (d << 3) | 0;
      d = d << 21 | d >>> 11;
      d = d + t | 0;
      return (t >>> 0) / 0x100000000;
    };
    for (let k = 12; k > 0; k--) rnd();
    const pick = (opts) => {
      let tot = 0;
      for (const [, w] of opts) tot += w;
      let r = rnd() * tot;
      for (const [val, w] of opts) { r -= w; if (r <= 0) return val; }
      return opts.at(-1)[0];
    };

    // a second stream (xorshift32 over the hash's fifth and sixth words) rolls everything added
    // in the polish, so the sitters the first stream already made keep their field, colours and core
    let xs = (parseInt(c.hash.slice(34, 42), 16) ^ Math.imul(parseInt(c.hash.slice(42, 50), 16) | 0, 0x9e3779b1)) >>> 0 || 0x51a5e77;
    const nr = () => { xs ^= xs << 13; xs >>>= 0; xs ^= xs >>> 17; xs ^= xs << 5; xs >>>= 0; return xs / 4294967296; };
    for (let k = 0; k < 7; k++) nr();
    const roll = (opts) => {
      const sum = opts.reduce((tot, [, w]) => tot + w, 0);
      let v = nr() * sum, i = 0;
      while (i < opts.length - 1 && (v -= opts[i][1]) > 0) i++;
      return opts[i][0];
    };
    const span = (lo, hi) => lo + (hi - lo) * nr();

    // ---------- the ink set ----------
    const ink = roll([['Primary', 78], ['Faded', 8], ['Riso', 6], ['Midnight', 4.5], ['Blueprint', 2], ['Gold Leaf', 1.5]]);
    const INKS = {
      Primary: ['#d8352a', '#f3b512', '#1d4f9e', '#151515', '#efe5cf', '#c9c4b8', '#c79a2c'],
      Faded: ['#c9654c', '#e6c26e', '#4d6d93', '#3b3631', '#f2e7cf', '#d4ccb9', '#bf9f58'],
      Riso: ['#ff4f86', '#ffd23f', '#16918b', '#2c2a4e', '#f7f1e5', '#dcd5c8', '#f28a2b'],
      Midnight: ['#e2584b', '#f5cf63', '#5d8fd8', '#0b1424', '#e9edf3', '#2a3550', '#d4a640'],
      // a real blueprint: a dark navy ground, a mid blue, a pale blue, and white for every line and feature
      Blueprint: ['#3f7bd0', '#9cc6f2', '#1f4f9a', '#0b2149', '#f4f8fd', '#123266', '#cfe3f8'],
      'Gold Leaf': ['#8f2019', '#d9ae45', '#1c2d4f', '#0f0e0c', '#f3e7c6', '#2b2723', '#e9c45c'],
    }[ink];
    const [RED, YEL, BLU, INK, CRM, GRY, GLD] = INKS;
    // faces are never filled with the black ink: when ink comes round to the head it is printed as a
    // warm umber with dark features and a plain lip (blue in the blueprint set), and the darkest navy
    // is lifted, so no face ever reads as black with white eyes and a red mouth
    const [UMBER, LIP] = {
      Primary: ['#9a6643', '#5c2e1c'], Faded: ['#a8805f', '#6a4632'], Riso: ['#a5643f', '#6b2f22'],
      Midnight: ['#a0704e', '#5e3424'], Blueprint: ['#2c5aa8', '#f4f8fd'], 'Gold Leaf': ['#93633b', '#56301b'],
    }[ink];
    const skin = q => q === INK ? UMBER : q === BLU && ink === 'Gold Leaf' ? '#3a5688' : q === BLU && ink === 'Blueprint' ? '#2f5ea8' : q;

    // ---------- the original traits (first stream, in their original order) ----------
    let field = pick([['Cream', 34], ['Stone', 20], ['Ink', 16], ['Blue', 14], ['Red', 10], ['Gold', 6]]);
    // a blueprint is printed on its dark sheet: the pale fields become the navy (Stone is a deep blue there)
    if (ink === 'Blueprint' && (field === 'Cream' || field === 'Gold')) field = 'Ink';
    let bg = { Cream: CRM, Stone: GRY, Ink: INK, Blue: BLU, Red: RED, Gold: GLD }[field];
    let head = pick([['Disc', 32], ['Square', 24], ['Arch', 20], ['Triangle', 14], ['Half Disc', 7], ['Diamond', 3]]);
    let eyes = pick([['Dots', 30], ['Half Moons', 20], ['Squares', 16], ['Rings', 14], ['Bars', 12], ['Cyclops', 5], ['Stars', 3]]);
    let mouth = pick([['Bar', 30], ['Bowl', 24], ['Wedge', 16], ['O', 14], ['None', 16]]);
    let cut = pick([['Whole', 52], ['Split', 22], ['Cheeks', 18], ['Offset Print', 8]]);
    let hat = pick([['None', 30], ['Cone', 18], ['Quarter', 16], ['Block', 14], ['Stripe', 12], ['Halo', 6], ['Crown', 4]]);

    // colours: head, shoulders and hat are primaries that differ from the field
    const prim = [RED, YEL, BLU, INK].filter(k => k !== bg);
    const shuffled = prim.slice();
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t; }
    let headC = shuffled[0], bodyC = shuffled[1], hatC = shuffled[2];
    if (bg === GLD) { headC = [RED, BLU, INK][Math.floor(rnd() * 3)]; }
    // on a blueprint every line is white, except on the palest blue, where it's the navy
    const featFor = k => ink === 'Blueprint' ? (k === YEL || k === CRM || k === GLD ? INK : CRM) : k === YEL || k === CRM || k === RED || k === GLD ? INK : CRM;
    // and a blueprint face is never the pale blue, so its white features always read
    if (ink === 'Blueprint' && headC === YEL) [headC, bodyC] = [bodyC, headC];
    const splitPool = [RED, YEL, BLU, INK, CRM].filter(k => k !== headC && k !== bg && k !== bodyC);
    let splitC = splitPool[Math.floor(rnd() * splitPool.length)];
    const mouthFor = k => ink === 'Blueprint' ? featFor(k) : k === RED ? YEL : k === YEL ? RED : k === BLU ? YEL : RED;
    const faceFeat = q => q === INK ? (ink === 'Blueprint' ? CRM : INK) : featFor(q);
    const faceMouth = q => q === INK ? LIP : mouthFor(q);
    const eyeTilt = (rnd() - 0.5) * 0.08;
    const asym = rnd() < 0.25;
    let backdrop = pick([['Plain', 26], ['Sun', 22], ['Quarter', 16], ['Rule', 14], ['Bars', 12], ['Wedge', 10]]);
    const backSide = rnd() < 0.5 ? -1 : 1;
    const lineY = 0.18 + rnd() * 0.12, lineX = rnd() < 0.5;
    let bodyKind = pick([['Shoulders', 50], ['Block', 30], ['Bell', 20]]);
    const blinkOff = rnd() * 4, blinkGap = 3.2 + rnd() * 2.4;

    // ---------- the polish: new shapes for the old axes, and whole new axes (second stream) ----------
    if (nr() < 0.4) head = roll([['Pill', 20], ['Egg', 20], ['Keyhole', 14], ['Shield', 16], ['Lemon', 10], ['Column', 16], ['Octagon', 4]]);
    if (nr() < 0.4 && eyes !== 'Cyclops' && eyes !== 'Stars') eyes = roll([['Crescents', 18], ['Side Glance', 18], ['Tiny', 16], ['Wide', 14], ['Mismatched', 14], ['Wink', 14], ['Crosses', 2]]);
    if (nr() < 0.42) mouth = roll([['Grin', 18], ['Smirk', 18], ['Frown', 12], ['Teeth', 12], ['Tongue', 12], ['Whistle', 12], ['Zigzag', 10]]);
    if (nr() < 0.2) cut = nr() < 0.55 ? 'Mask' : 'Stencil';
    else nr();
    if (nr() < (hat === 'None' ? 0.22 : 0.42)) hat = roll([['Beret', 18], ['Cap', 18], ['Bowler', 16], ['Top Hat', 14], ['Fez', 12], ['Headband', 12], ['Bow', 8], ['Propeller', 3]]);
    if (nr() < 0.36) backdrop = roll([['Grid', 18], ['Rings', 18], ['Steps', 16], ['Checker', 16], ['Dots', 16], ['Split Field', 16]]);
    if (nr() < 0.24) bodyKind = nr() < 0.5 ? 'Cape' : 'Narrow';
    else nr();

    const topCovered = !['None', 'Halo', 'Headband', 'Bow', 'Stripe'].includes(hat);
    let hair = roll([['Bald', 22], ['Fringe', 14], ['Side Part', 12], ['Bob', 12], ['Long', 9], ['Afro', 8], ['Curls', 8], ['Bun', 8], ['Pigtails', 6], ['Flat Top', 6], ['Mohawk', 3]]);
    if (topCovered) hair = { Bun: 'Bob', 'Flat Top': 'Fringe', Curls: 'Afro', Mohawk: 'Side Part' }[hair] || hair;
    const hairPref = roll([[INK, 30], [YEL, 14], [RED, 12], [BLU, 12], [GRY, 10], [CRM, 8]]);
    let brows = roll([['None', 24], ['Level', 18], ['Stern', 12], ['Worried', 10], ['Arched', 12], ['Blocks', 10], ['Quarters', 7], ['Unibrow', 5], ['Tall', 2]]);
    const nose = roll([['None', 28], ['Triangle', 16], ['Quarter', 14], ['Bar', 12], ['Ell', 10], ['Half Disc', 10], ['Dot', 7], ['Long', 3]]);
    let eyewear = roll([['None', 64], ['Round Specs', 9], ['Square Specs', 7], ['Shades', 8], ['Monocle', 4], ['Visor', 5], ['Star Shades', 2], ['Third Lens', 1]]);
    let facial = roll([['None', 48], ['Freckles', 11], ['Moustache', 11], ['Beard', 9], ['Beauty Spot', 8], ['Goatee', 5], ['Sideburns', 4], ['Blush', 2], ['Handlebar', 2]]);
    const ears = roll([['None', 36], ['Plain', 26], ['Studs', 14], ['Hoops', 12], ['Drops', 8], ['Odd Pair', 4]]);
    const outfit = roll([['Plain', 24], ['Stripes', 14], ['Tie', 12], ['Bow Tie', 10], ['Buttons', 10], ['Turtleneck', 10], ['Polka', 7], ['Braces', 7], ['Sash', 4], ['Medal', 2]]);
    const pose = roll([['Straight', 54], ['Tilt Left', 14], ['Tilt Right', 14], ['Three Quarter', 13], ['Chin Up', 5]]);
    const comp = roll([['None', 80], ['Bird', 8], ['Moon', 6], ['Buttonhole', 4], ['Little One', 2]]);
    if (head === 'Half Disc') brows = 'None';   // its flat brow line is the brow
    // restraint: a sitter wears at most two loud things on the face, so it stays a poster, not a costume
    if ((cut === 'Mask' || cut === 'Stencil') && (eyewear !== 'None' || head === 'Half Disc' || head === 'Triangle')) cut = 'Whole';
    let loud = (eyewear !== 'None') + (cut === 'Mask' || cut === 'Stencil') + (hair === 'Mohawk') + (eyes === 'Cyclops' || eyes === 'Stars');
    if (loud >= 2 && ['Beard', 'Moustache', 'Handlebar', 'Goatee', 'Sideburns'].includes(facial)) facial = 'None';

    // ---------- legendaries and the coveted balloon: their own stream, so ordinary sitters keep their look ----------
    // (an FNV-1a pass over the hash text with its own salt per roll, then a final avalanche)
    const fnv = salt => {
      let h = (0x811c9dc5 ^ salt) >>> 0;
      for (let i = 2; i < c.hash.length; i++) { h ^= c.hash.charCodeAt(i); h = Math.imul(h, 0x01000193); }
      h ^= h >>> 16; h = Math.imul(h, 0x7feb352d); h ^= h >>> 15; h = Math.imul(h, 0x846ca68b); h ^= h >>> 16;
      return (h >>> 0) / 0x100000000;
    };
    const lr = fnv(0x51a7);
    const legend = lr < 0.0009 ? 'Gold Foil' : lr < 0.0018 ? 'Unprinted' : lr < 0.0026 ? 'Sun' : 'None';
    const balloon = fnv(0xba11) < 0.005;
    if (legend === 'Sun') {
      // the sun is a poster of its own: a yellow disc with a full ring of wedge rays on a warm red field,
      // and one calm face (smiling eyes, a smile) with nothing on it
      head = 'Disc'; hair = 'Bald'; hat = 'None'; backdrop = 'Plain';
      eyes = 'Crescents'; mouth = 'Bowl'; brows = 'None'; eyewear = 'None'; facial = 'None'; cut = 'Whole';
      field = 'Red'; bg = RED; headC = YEL;
      if (bodyC === RED || bodyC === YEL) bodyC = BLU;
      hatC = bodyC === BLU ? INK : BLU;
    }

    // proportions: every sitter gets its own build and its own spacing of features
    const round = head === 'Disc' || head === 'Half Disc' || head === 'Keyhole' || head === 'Octagon' || head === 'Diamond';
    const k = span(0.92, 1.08), asp = round ? 1 : span(0.9, 1.12);
    const sx = k * asp, sy = k / asp;
    const spread = span(0.84, 1.18), lift = span(-0.014, 0.014), es = span(0.82, 1.25) * k;
    const drop = span(-0.012, 0.014), mw = span(0.75, 1.35), bw = span(0.8, 1.2), ns = span(0.8, 1.2);
    const nw = span(0.065, 0.1) * k;
    const side = nr() < 0.5 ? -1 : 1;
    const fx = pose === 'Three Quarter' ? side * span(0.022, 0.034) : 0;
    const tilt = pose === 'Tilt Left' ? -span(0.08, 0.14) : pose === 'Tilt Right' ? span(0.08, 0.14) : 0;
    const cx = 0.5, cy = pose === 'Chin Up' ? 0.43 : 0.45;
    const reactOrder = Math.floor(nr() * 4);
    const ord = [INK, RED, YEL, BLU, CRM];
    for (let i = ord.length - 1; i > 0; i--) { const j = Math.floor(nr() * (i + 1)); [ord[i], ord[j]] = [ord[j], ord[i]]; }
    const stars = [];
    for (let i = 0; i < 6; i++) stars.push([nr(), nr(), span(0.014, 0.034)]);
    const birdHop = span(5, 8), orbit0 = nr() * 6.28;

    // head shapes in the head's own unit frame (radius 0.25): top, bottom, eye line, eye spacing,
    // mouth line, half width at the eyes (for ears and specs) and half width near the top (for hats)
    const GEO = {
      Disc: [-0.25, 0.25, -0.02, 0.1, 0.11, 0.25, 0.19],
      Square: [-0.23, 0.23, -0.03, 0.105, 0.115, 0.23, 0.23],
      Arch: [-0.2375, 0.2375, -0.02, 0.095, 0.125, 0.225, 0.17],
      Triangle: [-0.1875, 0.3, -0.095, 0.1, 0.0625, 0.215, 0.2875],
      'Half Disc': [-0.0875, 0.1875, 0.008, 0.11, 0.132, 0.255, 0.275],
      Diamond: [-0.3, 0.3, -0.015, 0.08, 0.115, 0.26, 0.08],
      Pill: [-0.28, 0.28, -0.03, 0.09, 0.13, 0.2, 0.16],
      Egg: [-0.29, 0.24, 0, 0.095, 0.13, 0.215, 0.13],
      Keyhole: [-0.25, 0.25, -0.07, 0.075, 0.16, 0.178, 0.14],
      Shield: [-0.24, 0.3, -0.06, 0.1, 0.12, 0.23, 0.23],
      Lemon: [-0.3, 0.3, -0.02, 0.08, 0.12, 0.2, 0.08],
      Column: [-0.29, 0.29, -0.07, 0.08, 0.14, 0.17, 0.17],
      Octagon: [-0.25, 0.25, -0.025, 0.1, 0.115, 0.25, 0.12],
    };
    const [gTop, gBot, gEye, gDx, gMouth, gSide, gTw] = GEO[head];
    const eyeY = gEye + lift, eyeDX = gDx * spread, mouthY = gMouth + drop;
    const noseY = eyeY + (mouthY - eyeY) * 0.55;
    const chinY = cy + gBot * sy;



    // ---------- colour that stays legible while the primaries turn ----------
    const notAny = (...avoid) => ord.find(q => !avoid.includes(q)) || CRM;
    const hairC = () => (hairPref !== headC && hairPref !== bg && hairPref !== hatC) ? hairPref : notAny(headC, bg, hatC, hairPref === GRY ? INK : hairPref);
    // (on a blueprint the nose is the pale blue, so a white nose never reads as a beak between white eyes)
    const noseC = () => ink === 'Blueprint' && headC !== YEL ? YEL : cut === 'Split' ? faceFeat(headC) : notAny(headC, bg, faceFeat(headC) === INK ? CRM : INK);
    let backC = hat === 'None' && bg !== GLD ? hatC : (bg === CRM ? GRY : bg === GRY ? CRM : bg === GLD ? YEL : CRM);
    if (backC === bg) backC = notAny(bg, headC, bodyC);
    const sparkle = bg === GLD || hat === 'Crown' || ink === 'Gold Leaf';

    // ---------- the cell kit: a fixed 48-cell grid, each cell filled by testing its centre ----------
    // Shapes are written as inside-tests in their own frame (a small affine stack like a canvas
    // transform); nothing is antialiased, so every cell is exactly one ink.
    const G = 48;
    const grid = new Uint8Array(G * G), mine = new Uint8Array(G * G), layer = new Uint16Array(G * G);
    let shapeN = 0;   // which shape painted a cell last, so guide lines can sit on the upper shape's edge
    const inkList = [], inkAt = new Map(), words = [];
    const slot = hex => {
      let n = inkAt.get(hex);
      if (n === undefined) {
        n = inkList.length; inkList.push(hex); inkAt.set(hex, n);
        const v = parseInt(hex.slice(1), 16);
        words.push((0xff000000 | ((v & 0xff) << 16) | (v & 0xff00) | (v >>> 16)) >>> 0);
      }
      return n;
    };
    let cur = 0, sitter = 0;
    const pen = hex => { cur = slot(hex); };
    let M = [1, 0, 0, 1, 0, 0];
    const saved = [], clips = [];
    const keep = () => saved.push([M, clips.length]);
    const back = () => { const sv = saved.pop(); M = sv[0]; clips.length = sv[1]; };
    const shift = (dx, dy) => { M = [M[0], M[1], M[2], M[3], M[4] + M[0] * dx + M[2] * dy, M[5] + M[1] * dx + M[3] * dy]; };
    const spin = an => { const co = Math.cos(an), si = Math.sin(an); M = [M[0] * co + M[2] * si, M[1] * co + M[3] * si, M[2] * co - M[0] * si, M[3] * co - M[1] * si, M[4], M[5]]; };
    const stretch = (ax, ay) => { M = [M[0] * ax, M[1] * ax, M[2] * ay, M[3] * ay, M[4], M[5]]; };
    const spot = (px, py) => [M[0] * px + M[2] * py + M[4], M[1] * px + M[3] * py + M[5]];
    const inverse = m => { const det = m[0] * m[3] - m[1] * m[2]; return [m[3] / det, -m[2] / det, -m[1] / det, m[0] / det, m[4], m[5]]; };
    const clipTo = test => clips.push([inverse(M), test]);
    const setCell = (i, j) => { if (i < 0 || j < 0 || i >= G || j >= G) return; const n = j * G + i; grid[n] = cur; mine[n] = sitter; layer[n] = shapeN; };
    const paint = (test, x0, y0, x1, y1) => {
      shapeN++;
      let u0 = 9, u1 = -9, v0 = 9, v1 = -9;
      for (const [px, py] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) {
        const [u, v] = spot(px, py);
        u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v);
      }
      const i0 = Math.max(0, Math.floor(u0 * G)), i1 = Math.min(G - 1, Math.floor(u1 * G));
      const j0 = Math.max(0, Math.floor(v0 * G)), j1 = Math.min(G - 1, Math.floor(v1 * G));
      const iv = inverse(M);
      for (let j = j0; j <= j1; j++) {
        const v = (j + 0.5) / G;
        for (let i = i0; i <= i1; i++) {
          const u = (i + 0.5) / G, du = u - iv[4], dv = v - iv[5];
          if (!test(iv[0] * du + iv[1] * dv, iv[2] * du + iv[3] * dv)) continue;
          let out = false;
          for (const [q, ct] of clips) { const eu = u - q[4], ev = v - q[5]; if (!ct(q[0] * eu + q[1] * ev, q[2] * eu + q[3] * ev)) { out = true; break; } }
          if (!out) setCell(i, j);
        }
      }
    };
    const disc = (px, py, r) => paint((a, b) => (a - px) * (a - px) + (b - py) * (b - py) <= r * r, px - r, py - r, px + r, py + r);
    const box = (px, py, w, h) => {
      if (w < 0) { px += w; w = -w; }
      if (h < 0) { py += h; h = -h; }
      paint((a, b) => a >= px && a < px + w && b >= py && b < py + h, px, py, px + w, py + h);
    };
    const inside = (pts, a, b) => {
      let odd = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const p = pts[i], q = pts[j];
        if ((p[1] > b) !== (q[1] > b) && a < p[0] + (q[0] - p[0]) * (b - p[1]) / (q[1] - p[1])) odd = !odd;
      }
      return odd;
    };
    const shape = pts => {
      let a0 = 9, a1 = -9, b0 = 9, b1 = -9;
      for (const [a, b] of pts) { a0 = Math.min(a0, a); a1 = Math.max(a1, a); b0 = Math.min(b0, b); b1 = Math.max(b1, b); }
      paint((a, b) => inside(pts, a, b), a0, b0, a1, b1);
    };
    const tri = (p, q, r) => shape([p, q, r]);
    // an ellipse, whole (half 0), its top half (1) or its bottom half (2)
    const oval = (px, py, rx, ry, rot, half) => {
      const co = Math.cos(rot || 0), si = Math.sin(rot || 0), big = Math.max(rx, ry);
      paint((a, b) => {
        const dx = a - px, dy = b - py, ex = dx * co + dy * si, ey = dy * co - dx * si;
        if ((half === 1 && ey > 0) || (half === 2 && ey < 0)) return false;
        return (ex / rx) * (ex / rx) + (ey / ry) * (ey / ry) <= 1;
      }, px - big, py - big, px + big, py + big);
    };
    const hoop = (px, py, rx, ry, w) => paint((a, b) => {
      const o = ((a - px) / (rx + w)) ** 2 + ((b - py) / (ry + w)) ** 2, n = ((a - px) / (rx - w)) ** 2 + ((b - py) / (ry - w)) ** 2;
      return o <= 1 && n > 1;
    }, px - rx - w, py - ry - w, px + rx + w, py + ry + w);
    const sector = (px, py, r, a0, a1) => paint((a, b) => {
      const dx = a - px, dy = b - py;
      if (dx * dx + dy * dy > r * r) return false;
      let an = Math.atan2(dy, dx);
      while (an < a0) an += Math.PI * 2;
      return an <= a1;
    }, px - r, py - r, px + r, py + r);
    // straight on the grid, no transform: blocks of cells and cell lines
    const block = (i0, j0, w, h) => { shapeN++; for (let j = j0; j < j0 + h; j++) for (let i = i0; i < i0 + w; i++) setCell(i, j); };
    const rule = (a0, b0, a1, b1) => {
      const dx = Math.abs(a1 - a0), dy = -Math.abs(b1 - b0), ia = a0 < a1 ? 1 : -1, ib = b0 < b1 ? 1 : -1;
      let er = dx + dy;
      shapeN++;
      for (let n = 0; n < 160; n++) {
        setCell(a0, b0);
        if (a0 === a1 && b0 === b1) break;
        const e2 = 2 * er;
        if (e2 >= dy) { er += dy; a0 += ia; }
        if (e2 <= dx) { er += dx; b0 += ib; }
      }
    };
    // a hand-set glyph: rows of characters, each one an ink (or '.' for none), centred on a canvas point
    const stamp = (u, v, rows, map, skip) => {
      const h = rows.length, w = rows[0].length, li = Math.round(u * G - w / 2), tj = Math.round(v * G - h / 2);
      shapeN++;
      for (let r = skip || 0; r < h; r++) for (let q = 0; q < w; q++) {
        const n = map[rows[r][q]];
        if (n === undefined) continue;
        cur = n; setCell(li + q, tj + r);
      }
    };
    const inks = o => { const m = {}; for (const key in o) m[key] = slot(o[key]); return m; };
    const roundRows = d => {
      const out = [], r = d / 2;
      for (let j = 0; j < d; j++) { let s = ''; for (let i = 0; i < d; i++) { const dx = i + 0.5 - r, dy = j + 0.5 - r; s += dx * dx + dy * dy <= r * r + r * 0.15 ? 'a' : '.'; } out.push(s); }
      return out;
    };
    const hollow = rows => rows.map((s, j) => s.split('').map((ch, i) => ch === 'a' && rows[j - 1] && rows[j + 1] && s[i - 1] === 'a' && s[i + 1] === 'a' && rows[j - 1][i] === 'a' && rows[j + 1][i] === 'a' ? 'b' : ch).join(''));
    const mirror = rows => rows.map(s => s.split('').reverse().join(''));
    const run = (ch, n) => ch.repeat(Math.max(0, n));
    const STAR5 = ['..a..', '..a..', 'aaaaa', '.aaa.', '.a.a.'];
    const STAR7 = ['...a...', '...a...', '..aaa..', 'aaaaaaa', '.aaaaa.', '..aaa..', '.aa.aa.'];
    const GLINT = ['..a..', '..a..', 'aaaaa', '..a..', '..a..'];
    const P = (lx, ly) => [lx * sx, ly * sy];   // head unit frame -> unscaled offsets from the head centre

    // ---------- head shapes as inside-tests in the head's unit frame ----------
    const bez = (p0, p1, p2, p3, out) => { for (let i = 0; i < 10; i++) { const t = i / 10, s = 1 - t; out.push([s * s * s * p0[0] + 3 * s * s * t * p1[0] + 3 * s * t * t * p2[0] + t * t * t * p3[0], s * s * s * p0[1] + 3 * s * s * t * p1[1] + 3 * s * t * t * p2[1] + t * t * t * p3[1]]); } };
    const eggPts = [], shieldPts = [[-0.23, -0.24], [0.23, -0.24], [0.23, 0.04]], octPts = [];
    bez([0, -0.29], [0.15, -0.29], [0.225, -0.08], [0.215, 0.04], eggPts); bez([0.215, 0.04], [0.205, 0.17], [0.12, 0.24], [0, 0.24], eggPts);
    bez([0, 0.24], [-0.12, 0.24], [-0.205, 0.17], [-0.215, 0.04], eggPts); bez([-0.215, 0.04], [-0.225, -0.08], [-0.15, -0.29], [0, -0.29], eggPts);
    for (let i = 1; i <= 8; i++) { const t = i / 8, s = 1 - t; shieldPts.push([s * s * 0.23 + 2 * s * t * 0.21, s * s * 0.04 + 2 * s * t * 0.22 + t * t * 0.3]); }
    for (let i = 1; i <= 8; i++) { const t = i / 8, s = 1 - t; shieldPts.push([-(2 * s * t * 0.21 + t * t * 0.23), s * s * 0.3 + 2 * s * t * 0.22 + t * t * 0.04]); }
    for (let i = 0; i < 8; i++) { const an = Math.PI / 8 + i * Math.PI / 4; octPts.push([Math.cos(an) * 0.27, Math.sin(an) * 0.27]); }
    const triPts = [[-0.2875, -0.1875], [0.2875, -0.1875], [0, 0.3]];
    const headIn = (a, b) => {
      switch (head) {
        case 'Disc': return a * a + b * b <= 0.0625;
        case 'Square': return Math.abs(a) <= 0.23 && Math.abs(b) <= 0.23;
        case 'Arch': return Math.abs(a) <= 0.225 && b <= 0.2375 && (b >= -0.0125 || a * a + (b + 0.0125) * (b + 0.0125) <= 0.050625);
        case 'Triangle': return inside(triPts, a, b);
        case 'Half Disc': return b >= -0.0875 && a * a + (b + 0.0875) * (b + 0.0875) <= 0.075625;
        case 'Diamond': return Math.abs(a) / 0.275 + Math.abs(b) / 0.3 <= 1;
        case 'Pill': return Math.abs(a) <= 0.2 && (Math.abs(b) <= 0.08 || a * a + (Math.abs(b) - 0.08) ** 2 <= 0.04);
        case 'Egg': return inside(eggPts, a, b);
        case 'Keyhole': return a * a + (b + 0.07) * (b + 0.07) <= 0.0324 || (b >= 0.02 && b <= 0.25 && Math.abs(a) <= 0.1 + (b - 0.02) / 0.23 * 0.07);
        case 'Shield': return inside(shieldPts, a, b);
        case 'Lemon': return (a + 0.125) ** 2 + b * b <= 0.105625 && (a - 0.125) ** 2 + b * b <= 0.105625;
        case 'Column': return Math.abs(a) <= 0.17 && Math.abs(b) <= 0.29;
        default: return inside(octPts, a, b);
      }
    };
    const headFill = () => paint(headIn, -0.3, -0.31, 0.3, 0.31);

    // ---------- backdrop (on the grid itself, so its lines are whole cells) ----------
    function backdropDraw() {
      pen(backC);
      const sd = backSide, edge = sd > 0 ? 1 : 0, q = v => Math.round(v * G) / G;
      if (backdrop === 'Sun') disc(0.5 + sd * 0.2, 0.38, 0.31);
      else if (backdrop === 'Quarter') disc(edge, 0, 0.62);
      else if (backdrop === 'Bars') { for (let i = 0; i < 3; i++) block(sd > 0 ? 35 + i * 4 : 3 + i * 4, 0, 2, G); }
      else if (backdrop === 'Wedge') tri([edge, 0.05], [edge, 1], [sd > 0 ? 0.12 : 0.88, 1]);
      else if (backdrop === 'Rule') {
        pen(bg === INK ? CRM : INK);
        if (lineX) block(0, Math.round(lineY * G), G, 1); else block(Math.round((0.12 + lineY * 0.4) * G), 0, 1, G);
      }
      else if (backdrop === 'Grid') { const o = Math.round(lineY * 5); for (let i = 1; i < 5; i++) { block(i * 10 - 1 + o - 2, 0, 1, G); block(0, i * 10 - 1, G, 1); } }
      else if (backdrop === 'Rings') { for (let i = 0; i < 4; i++) { const r = 0.3 + i * 0.13; paint((a, b) => Math.abs(Math.hypot(a - edge, b - 1) - r) <= 1 / G, edge - r - 0.05, 1 - r - 0.05, edge + r + 0.05, 1.05); } }
      else if (backdrop === 'Steps') { const pts = [[edge, 1]]; for (let i = 0; i < 4; i++) { const xx = edge - sd * (0.5 - i * 0.125), yy = 0.5 + i * 0.125; pts.push([q(xx), q(yy)], [q(xx + sd * 0.125), q(yy)]); } shape(pts); }
      else if (backdrop === 'Checker') { for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2) block(i * 4, 2 + j * 4, 4, 4); }
      else if (backdrop === 'Dots') { for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) block((sd > 0 ? 34 : 3) + i * 3, 3 + j * 3, 2, 2); }
      else if (backdrop === 'Split Field') { const w = Math.round((0.5 - lineY * 0.2) * G); block(sd > 0 ? G - w : 0, 0, w, G); }
      if (sparkle) {
        const sc = inks({ a: bg === GLD ? YEL : GLD });
        stamp(0.5 - backSide * 0.32, 0.16, GLINT, sc);
        if (ink === 'Gold Leaf') for (const [u, v, r] of stars) stamp(u < 0.5 ? u * 0.3 + 0.04 : 0.66 + u * 0.3, 0.07 + v * 0.48, r > 0.024 ? GLINT : ['.a.', 'aaa', '.a.'], sc);
      }
    }

    // ---------- body and outfit ----------
    const bodyIn = (a, b) => {
      if (bodyKind === 'Shoulders') return b <= 1.04 && (a - 0.5) ** 2 + (b - 1.04) ** 2 <= 0.1764;
      if (bodyKind === 'Block') return a >= 0.16 && a <= 0.84 && b >= 0.76;
      if (bodyKind === 'Bell') return b >= 0.74 && Math.abs(a - 0.5) <= 0.16 + (b - 0.74) / 0.28 * 0.26;
      if (bodyKind === 'Cape') return b >= 0.7 && Math.abs(a - 0.5) <= 0.1 + (b - 0.7) / 0.32 * 0.42;
      if (a < 0.26 || a > 0.74 || b < 0.74) return false;
      const dx = Math.abs(a - 0.5);
      return dx <= 0.15 || b >= 0.83 || (dx - 0.15) ** 2 + (b - 0.83) ** 2 <= 0.0081;
    };
    const shoulderAt = (u) => {
      const dx = Math.abs(u - 0.5);
      if (bodyKind === 'Shoulders') return 1.04 - Math.sqrt(Math.max(0, 0.1764 - dx * dx));
      if (bodyKind === 'Block') return 0.76;
      if (bodyKind === 'Bell') return dx < 0.16 ? 0.74 : 0.74 + (dx - 0.16) / 0.26 * 0.28;
      if (bodyKind === 'Cape') return 0.7 + Math.max(0, dx - 0.1) / 0.42 * 0.32;
      return 0.74;
    };
    const birdX = 0.5 + side * (bodyKind === 'Narrow' ? 0.21 : Math.min(0.37, Math.max(0.26, gSide * sx + 0.05)));
    const birdY = shoulderAt(birdX);

    function outfitDraw() {
      const dC = notAny(bodyC, bg, headC), dC2 = notAny(bodyC, bg, dC);
      keep(); clipTo(bodyIn); pen(dC);
      if (outfit === 'Stripes') { for (let j = 38; j < G; j += 3) box(0, j / G, 1, 1 / G); }
      else if (outfit === 'Polka') { for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) box((i * 4 + (j % 2) * 2 + 1) / G, (38 + j * 3) / G, 1 / G, 1 / G); }
      else if (outfit === 'Tie') {
        tri([0.5 - nw / 2 - 0.035, 0.7], [0.5 + nw / 2 + 0.035, 0.7], [0.5, 0.93]);
        pen(dC2); block(23, 37, 2, 3); block(22, 40, 4, 5); block(23, 45, 2, 1);
      }
      else if (outfit === 'Buttons') { box(23 / G, 37 / G, 1 / G, 11 / G); for (let i = 0; i < 3; i++) box(25 / G, (39 + i * 3) / G, 1 / G, 1 / G); }
      else if (outfit === 'Braces') {
        for (const s of [-1, 1]) { keep(); shift(0.5 + s * 0.14, 0.74); spin(-s * 0.08); box(-0.5 / G, 0, 1 / G, 0.4); back(); }
        pen(dC2); box(17 / G, 41 / G, 1 / G, 1 / G); box(30 / G, 41 / G, 1 / G, 1 / G);
      }
      else if (outfit === 'Sash') { keep(); shift(0.5, 0.86); spin(side * 0.62); box(-0.6, -0.034, 1.2, 0.068); back(); }
      back();
      if (outfit === 'Bow Tie') {
        const by = Math.max(0.74, chinY + 0.035);
        stamp(0.5, by, ['aa...aa', 'aaabaaa', 'aa...aa'], inks({ a: dC, b: dC2 }));
      } else if (outfit === 'Turtleneck') {
        pen(bodyC); const w = Math.round((nw + 0.056) * G / 2); block(24 - w, Math.round(0.63 * G), w * 2, 10);
        pen(dC); for (let i = 0; i < 3; i++) block(24 - w, 34 + i * 2, w * 2, 1);
      } else if (outfit === 'Medal' || outfit === 'Sash') {
        const mx = 0.5 - side * 0.13;
        stamp(mx, 0.875, ['r...r', '.r.r.', '.r.r.', '.ggg.', 'ggsgg', 'gssgg', '.ggg.'], inks({ r: outfit === 'Medal' ? dC : dC2, g: GLD === bodyC ? YEL : GLD, s: bodyC === INK ? CRM : INK }));
      }
    }

    // ---------- companions ----------
    const BIRD = ['.....bb.', '....bbek', 'tt.bbbb.', '.tbwwwb.', '..bbbb..'];
    function bird(t) {
      const bc = notAny(bg, bodyC, headC);
      const hop = Math.max(0, Math.sin(Math.min(1, ((t + 1.7) % birdHop) / 0.4) * Math.PI)) + Math.max(0, 1 - (t - birdAt) / 0.5) * Math.sin(Math.min(1, (t - birdAt) / 0.5) * Math.PI) * 2;
      stamp(birdX, birdY - 0.05 - Math.round(hop) / G, side > 0 ? BIRD : mirror(BIRD), inks({ b: bc, w: notAny(bc, bg, bodyC), k: bc === YEL ? RED : YEL, e: featFor(bc), t: bc }));
    }
    function moon(t, front) {
      const an = orbit0 + t * 0.55, s = Math.sin(an);
      if ((s > 0) !== front) return;
      stamp(cx + Math.cos(an) * 0.37 * sx, cy - 0.12 + s * 0.06, s > 0.3 ? roundRows(3) : ['aa', 'aa'], inks({ a: notAny(bg, headC, hatC) }));
    }
    function littleOne(t, open) {
      const lx = 0.5 - side * 0.37, up = t - hopAt < 0.35 ? Math.round(Math.sin((t - hopAt) / 0.35 * Math.PI)) : 0;
      pen(hatC); oval(lx, 1.02, 0.1, 0.1, 0, 1);
      const lc = bodyC === bg ? headC : bodyC, f = faceFeat(lc), ly = 0.84 - up / G;
      stamp(lx, ly, roundRows(6), inks({ a: skin(lc) }));
      stamp(lx + side * 0.006, ly, open > 0.5 ? ['a..a', '....', '.aa.'] : ['....', 'a..a', '.aa.'], inks({ a: f }));
    }
    function buttonhole() {
      const fxp = 0.5 + side * 0.17, fyp = Math.max(shoulderAt(fxp) + 0.07, 0.84);
      stamp(fxp, fyp, ['..p..', '.ppp.', 'ppcpp', '.ppp.', '..p..'], inks({ p: notAny(bodyC, bg, YEL), c: bodyC === YEL ? CRM : YEL }));
    }

    // ---------- hair (in the head's scaled frame) ----------
    function hairBehind() {
      if (hair === 'Bald') return;
      pen(hairC());
      const wd = gSide + 0.04;
      if (hair === 'Afro') {
        disc(0, -0.05, gSide + 0.07);
        for (let i = 0; i < 9; i++) { const an = Math.PI * (0.92 + i * 1.16 / 8); disc(Math.cos(an) * (gSide + 0.06), -0.05 + Math.sin(an) * (gSide + 0.05), 0.075); }
      } else if (hair === 'Long' || hair === 'Bob') {
        const low = hair === 'Long' ? 0.37 : mouthY + 0.02, w2 = hair === 'Long' ? wd : wd + 0.008, crown = Math.max(gTop + w2, -0.02);
        box(-w2, crown, w2 * 2, low - crown); oval(0, crown, w2, w2, 0, 1);
      } else if ('Pigtails' === hair) {
        for (const s of [-1, 1]) disc(s * (gSide + 0.055), eyeY + 0.07, 0.07);
        const tie = inks({ a: hairC() === YEL ? RED : YEL });
        for (const s of [-1, 1]) { const [u, v] = spot(s * (gSide + 0.01), eyeY + 0.05); stamp(u, v, ['aa', 'aa'], tie); }
      } else if (hair === 'Bun') disc(0, gTop - 0.055, 0.085);
    }
    function hairFront() {
      if (hair === 'Bald') return;
      const hc = hairC();
      keep(); clipTo(headIn); pen(hc);
      if (hair === 'Fringe' || hair === 'Bob' || hair === 'Pigtails') box(-1, -1, 2, eyeY - 0.072 + 1);
      else if (hair === 'Curls' || hair === 'Bun' || hair === 'Flat Top') box(-1, -1, 2, eyeY - 0.098 + 1);
      else if (hair === 'Side Part') { oval(side * 0.07, gTop + 0.01, 0.3, Math.max(0.1, (eyeY - gTop) * 0.62)); disc(side * gSide * 1.02, eyeY - 0.04, 0.075); }
      else if (hair === 'Long') { oval(-0.14, gTop - 0.01, 0.17, Math.max(0.1, (eyeY - gTop) * 0.7), -0.2); oval(0.14, gTop - 0.01, 0.17, Math.max(0.1, (eyeY - gTop) * 0.7), 0.2); }
      else if (hair === 'Afro') box(-1, -1, 2, gTop + 0.055 + 1);
      back();
      pen(hc);
      // curls: a close row of small round bumps along the hairline, all one height, so the top edge is a
      // soft scallop (no points to read as a crown)
      if (hair === 'Curls') { const ww = Math.max(gTw, 0.12) + 0.04, n = 5; for (let i = 0; i < n; i++) { const xx = -ww + i * ww * 2 / (n - 1); disc(xx, gTop + 0.025 + (xx / ww) ** 2 * 0.05, 0.047); } }
      else if (hair === 'Flat Top') { const ww = Math.max(gTw, 0.13) + 0.01; box(-ww, gTop - 0.1, ww * 2, 0.12); }
      else if (hair === 'Mohawk') { tri([-0.045, gTop + 0.03], [0.045, gTop + 0.03], [0, gTop - 0.17]); tri([-0.07, gTop + 0.04], [0, gTop + 0.02], [-0.1, gTop - 0.09]); tri([0.07, gTop + 0.04], [0, gTop + 0.02], [0.1, gTop - 0.09]); }
    }

    // ---------- hats (in the head's scaled frame) ----------
    let propSpin = 0;
    function hatDraw() {
      const pointy = head === 'Diamond' || head === 'Lemon';
      const R = 0.25, topY = gTop + (pointy ? 0.1 : head === 'Egg' ? 0.03 : head === 'Half Disc' ? -0.03 : 0), hs = backSide, tw = Math.max(gTw, pointy ? 0.17 : 0.15);
      const one = 1 / G;
      pen(hatC);
      if (hat === 'Cone') tri([-R * 0.75, topY + 0.01], [R * 0.75, topY + 0.01], [R * 0.15 * hs, topY - R * 1.15]);
      else if (hat === 'Quarter') sector(-hs * R * 0.95, topY + 0.015, R * 1.5, hs > 0 ? -Math.PI / 2 : Math.PI, hs > 0 ? 0 : Math.PI * 1.5);
      else if (hat === 'Block') { box(-R * 0.7, topY - R * 0.75, R * 1.4, R * 0.78); box(-R * 1.15, topY - R * 0.05, R * 2.3, R * 0.14); }
      else if (hat === 'Stripe' || hat === 'Headband') {
        const yb = hat === 'Stripe' ? topY + R * 0.05 : gTop + (eyeY - gTop) * 0.42;
        keep(); clipTo(headIn); box(-1, yb, 2, hat === 'Stripe' ? R * 0.22 : 2 * one); back();
        if (hat === 'Headband') { const ex = -hs * (gSide + 0.005); tri([ex, yb + one], [ex - hs * 0.08, yb - 0.03], [ex - hs * 0.07, yb + 0.06]); }
      }
      else if (hat === 'Halo') { pen(GLD === bg ? CRM : GLD); hoop(0, topY - R * 0.32, R * 0.85, R * 0.22, 0.6 * one); }
      else if (hat === 'Crown') {
        pen(GLD === bg ? INK : GLD);
        const pts = [[-R * 0.8, topY + 0.01]];
        for (let i = 0; i <= 4; i++) pts.push([-R * 0.8 + i * R * 0.4, topY - (i % 2 ? R * 0.35 : R * 0.8)]);
        pts.push([R * 0.8, topY + 0.01]); shape(pts);
      }
      else if (hat === 'Beret') { oval(hs * 0.04, topY - 0.022, tw + 0.07, 0.056, 0, 0); box(hs * 0.04 + hs * (tw + 0.02) - 0.5 / G, topY - 0.03, 1 / G, 1 / G); box(hs * 0.03 - one / 2, topY - 0.11, one, 0.04); }
      else if (hat === 'Cap') {
        const dh = Math.min(tw + 0.02, 0.15);
        oval(0, topY + 0.03, tw + 0.02, dh, 0, 1); box(hs > 0 ? 0 : -(tw + 0.17), topY + 0.012, tw + 0.17, 0.04);
        const [u, v] = spot(0, topY + 0.03 - dh); stamp(u, v - 0.5 / G, ['a'], inks({ a: featFor(hatC) }));
      }
      else if (hat === 'Bowler') { oval(0, topY + 0.015, tw * 0.85, Math.min(tw * 0.85, 0.15), 0, 1); oval(0, topY + 0.015, tw + 0.08, 0.03); }
      else if (hat === 'Top Hat') { box(-tw * 0.72, topY - 0.22, tw * 1.44, 0.23); box(-tw - 0.07, topY - 0.012, (tw + 0.07) * 2, 0.042); pen(notAny(hatC, bg, headC)); box(-tw * 0.72, topY - 0.07, tw * 1.44, 2 * one); }
      else if (hat === 'Fez') {
        shape([[-0.11, topY + 0.015], [0.11, topY + 0.015], [0.08, topY - 0.15], [-0.08, topY - 0.15]]);
        const tc = featFor(hatC) === CRM ? YEL : INK, [u0, v0] = spot(0, topY - 0.15), [u1, v1] = spot(hs * 0.12, topY - 0.07);
        pen(tc); rule(Math.floor(u0 * G), Math.floor(v0 * G), Math.floor(u1 * G), Math.floor(v1 * G));
        stamp(u1, v1 + 1.5 / G, ['aa', 'aa'], inks({ a: tc }));
      }
      else if (hat === 'Bow') {
        const bx = hs * Math.min(0.12, tw), by = topY + 0.03;
        tri([bx, by], [bx - 0.09, by - 0.055], [bx - 0.09, by + 0.055]); tri([bx, by], [bx + 0.09, by - 0.055], [bx + 0.09, by + 0.055]);
        const [u, v] = spot(bx, by); stamp(u, v, ['aa', 'aa'], inks({ a: featFor(hatC) }));
      }
      else if ('Propeller' === hat) {
        const dh = Math.min(tw, 0.13);
        oval(0, topY + 0.03, tw + 0.01, dh, 0, 1);
        pen(notAny(hatC, bg, headC)); box(-tw - 0.01, topY + 0.004, tw * 2 + 0.02, 0.03);
        const py = topY + 0.03 - dh - 0.055, cs = Math.cos(propSpin), stick = INK === hatC ? CRM : INK;
        pen(stick); box(-one / 2, py, one, 0.065);
        const bl1 = notAny(hatC, bg, INK), bl2 = notAny(hatC, bg, INK, bl1);
        pen(bl1); oval(cs * 0.07, py, Math.abs(cs) * 0.07 + 0.012, 0.022);
        pen(bl2); oval(-cs * 0.07, py, Math.abs(cs) * 0.07 + 0.012, 0.022);
        const [u, v] = spot(0, py); stamp(u, v, ['aa', 'aa'], inks({ a: stick }));
      }
    }

    // ---------- the face, as glyphs set cell by cell ----------
    function eyeRows(kind, s, size, look) {
      const r = 0.04 * size, d = Math.max(3, Math.round(2 * r * G)), lk = look > 0.45 ? 1 : look < -0.45 ? -1 : 0;
      let rows, du = 0, dv = 0, keepShut = false;
      if (kind === 'Dots') { rows = roundRows(d); du = lk; }
      else if (kind === 'Half Moons') { const w = d + 1; rows = roundRows(w).slice(Math.floor(w / 2)); dv = -0.5; }
      else if (kind === 'Squares') rows = Array(d).fill(run('a', d));
      else if (kind === 'Rings') {
        const D = Math.max(5, d + 1), mid = (D - 1) / 2, f = hollow(roundRows(D)).map(row => row.replace(/b/g, '.').split(''));
        for (const dy of D % 2 ? [0] : [-0.5, 0.5]) for (const dx of D % 2 ? [0] : [-0.5, 0.5]) { const yy = mid + dy, xx = mid + dx + lk; if (f[yy] && f[yy][xx] === '.') f[yy][xx] = 'a'; }
        rows = f.map(row => row.join(''));
      }
      else if (kind === 'Bars') rows = Array(r * 0.9 * G >= 1.6 ? 2 : 1).fill(run('a', Math.max(3, Math.round(2.8 * r * G))));
      else if (kind === 'Stars') rows = d >= 5 ? STAR7 : STAR5;
      else if (kind === 'Tiny') { const t = Math.max(1, Math.round(d / 2)); rows = Array(t).fill(run('a', t)); du = lk; }
      else if (kind === 'Crescents' || kind === 'Joy') {
        const w = d + 1;
        rows = ['a' + run('.', w - 2) + 'a', '.' + run('a', w - 2) + '.'];
        if (kind === 'Joy') rows = rows.reverse();
        keepShut = true;
      }
      else if (kind === 'Side Glance' || kind === 'Wide') {
        const D = Math.max(5, Math.round((kind === 'Wide' ? 2.6 : 2.1) * r * G)), f = hollow(roundRows(D)).map(row => row.split(''));
        const off = kind === 'Wide' ? lk : (lk || side), c0 = Math.round((D - 2) / 2);
        for (let yy = c0; yy < c0 + 2; yy++) for (let xx = c0 + off; xx < c0 + off + 2; xx++) if (f[yy] && f[yy][xx] === 'b') f[yy][xx] = 'a';
        rows = f.map(row => row.join(''));
      }
      else if (kind === 'Mismatched') rows = s < 0 ? roundRows(d) : Array(d - 1).fill(run('a', d - 1));
      // the open eye of a wink is a small dot (never a big disc that reads as an eye patch)
      else if (kind === 'Wink') rows = s < 0 ? [run('a', d + 1)] : d >= 4 ? ['aaa', 'aaa', 'aaa'] : ['aa', 'aa'];
      else if (kind === 'Crosses') { const n = d | 1; rows = []; for (let j = 0; j < n; j++) { let row = ''; for (let i = 0; i < n; i++) row += i === j || i === n - 1 - j ? 'a' : '.'; rows.push(row); } }
      else rows = roundRows(d);
      return { rows, du, dv, keepShut };
    }
    function eyeAt(kind, open, s, col, look, size, u, v) {
      const g = eyeRows(kind, s, size, look), h = g.rows.length, w = g.rows[0].length;
      const map = inks({ a: col, b: col === CRM ? INK : CRM });
      if (open < 0.5 && !g.keepShut && h > 1) { stamp(u + g.du / G, v, [run('a', Math.max(w, 3))], map); return; }
      const skip = open < 0.85 && !g.keepShut ? Math.floor(h * (1 - open)) : 0;
      stamp(u + g.du / G, v + g.dv / G, g.rows, map, skip);
    }
    function browRows(s, mood) {
      const w = Math.max(3, Math.round(0.084 * bw * k * G)), half = Math.ceil(w / 2);
      if (mood === 'Level') return [run('a', w)];
      if (mood === 'Stern' || mood === 'Worried') {
        // stern: the end towards the nose sits a cell lower; worried: a cell higher
        let rows = [run('a', half) + run('.', w - half), run('.', half) + run('a', w - half)];
        if (mood === 'Worried') rows = rows.reverse();
        return s > 0 ? mirror(rows) : rows;
      }
      if (mood === 'Arched') return ['.' + run('a', w - 2) + '.', 'a' + run('.', w - 2) + 'a'];
      if (mood === 'Blocks') { const b2 = Math.max(2, Math.round(w * 0.6)); return [run('a', b2), run('a', b2)]; }
      if (mood === 'Quarters') return s > 0 ? ['aa.', 'aaa'] : ['.aa', 'aaa'];
      if (mood === 'Tall') return ['a', 'a', 'a'];
      return null;
    }
    function noseRows() {
      const z = ns * k, big = z > 1.08, h = backSide;
      let rows = null;
      if (nose === 'Triangle') rows = big ? ['.a.', '.a.', 'aaa'] : ['.a.', 'aaa'];
      else if (nose === 'Quarter') rows = big ? ['aa.', 'aaa', 'aaa'] : ['a.', 'aa'];
      else if (nose === 'Bar') rows = big ? ['a', 'a', 'a', 'a'] : ['a', 'a', 'a'];
      else if (nose === 'Ell') rows = ['a.', 'a.', 'aa'];
      else if (nose === 'Half Disc') rows = big ? ['aaaa', '.aa.'] : ['aaa', '.a.'];
      else if (nose === 'Dot') rows = big ? ['aa', 'aa'] : ['a'];
      else if (nose === 'Long') rows = ['a..', 'a..', 'aa.', 'aaa'];
      if (rows && h < 0 && (nose === 'Quarter' || nose === 'Ell' || nose === 'Long')) rows = mirror(rows);
      return rows;
    }
    function mouthRows(kind, wide) {
      const W = n => Math.max(3, Math.round(n * wide * G));
      if (kind === 'Bar') return [run('a', W(0.14))];
      if (kind === 'Bowl') { const w = W(0.12); return roundRows(w).slice(Math.floor(w / 2)); }
      if (kind === 'Wedge') { const w = W(0.1) | 1, rows = []; for (let r = 0; r * 2 < w; r++) rows.push(run('.', r) + run('a', w - r * 2) + run('.', r)); return rows.slice(0, 3); }
      if (kind === 'O') return roundRows(Math.max(4, Math.round(0.07 * Math.sqrt(wide) * G)));
      if (kind === 'Gasp') return ['.aa.', 'aaaa', 'aaaa', 'aaaa', '.aa.'];
      if (kind === 'Grin') { const w = W(0.144), rows = roundRows(w).slice(Math.floor(w / 2)); rows[0] = 'a' + run('c', w - 2) + 'a'; return rows; }
      if (kind === 'Smirk') { const w = W(0.1), rows = [run('.', w - 1) + 'a', run('a', w - 1) + '.']; return side > 0 ? rows : mirror(rows); }
      if (kind === 'Frown') { const w = W(0.11); return roundRows(w).slice(0, Math.ceil(w / 2)); }
      if (kind === 'Teeth') { const w = W(0.132); let mid = 'a'; for (let i = 1; i < w - 1; i++) mid += i % 3 === 0 ? 'a' : 'c'; return [run('a', w), mid + 'a', run('a', w)]; }
      if (kind === 'Tongue') { const w = W(0.12), rows = roundRows(w).slice(Math.floor(w / 2)), last = rows.length - 1, m0 = Math.floor(w / 2) - 1; rows[last] = rows[last].slice(0, m0) + 'tt' + rows[last].slice(m0 + 2); if (last > 0) rows[last - 1] = rows[last - 1].slice(0, m0) + 'tt' + rows[last - 1].slice(m0 + 2); return rows; }
      if (kind === 'Whistle') return ['aa', 'aa'];
      if (kind === 'Zigzag') { const w = W(0.14); let r0 = '', r1 = ''; for (let i = 0; i < w; i++) { r0 += i % 2 ? '.' : 'a'; r1 += i % 2 ? 'a' : '.'; } return [r0, r1]; }
      if (kind === 'Shy') return ['aa'];
      return null;
    }

    function face(t, open, look, react, rk) {
      const fC = faceFeat(headC);
      const rC = cut === 'Split' ? faceFeat(splitC) : fC;
      const maskF = featFor(splitC);
      const eyeCol = s => cut === 'Mask' ? maskF : s > 0 ? rC : fC;
      const lx = -eyeDX + fx, rx = eyeDX + fx + (asym ? 0.01 : 0);
      const [lpx, lpy] = P(lx, eyeY + (asym ? -0.012 : 0)), [rpx, rpy] = P(rx, eyeY);
      const surprise = react === 'Surprise' ? rk : 0, shy = react === 'Shy' ? rk : 0;
      const sizeNow = es * (1 + 0.22 * surprise - 0.1 * shy);
      // brows ride up with surprise and slope with shyness
      const browKind = brows === 'None' ? (surprise > 0.5 ? 'Arched' : 'None') : brows;
      const raise = 0.064 * es + 0.03 * surprise + (react === 'Delight' ? 0.008 * rk : 0);
      if (browKind !== 'None') {
        const moodNow = shy > 0.5 ? 'Worried' : surprise > 0.5 && browKind === 'Stern' ? 'Level' : browKind;
        // a wink's open eye always keeps at least one cell of face between it and the brow above
        let up = 0;
        if (eyes === 'Wink') {
          const eh = eyeRows('Wink', 1, sizeNow, 0).rows.length, eyeTop = Math.round(spot(rpx, rpy)[1] * G - eh / 2);
          const bv = spot(rpx, rpy - raise)[1], hb = moodNow === 'Unibrow' ? 1 : browRows(1, moodNow).length;
          const browBot = moodNow === 'Unibrow' ? Math.round((spot(lpx, lpy - raise)[1] + bv) / 2 * G) : Math.round(bv * G - hb / 2) + hb - 1;
          up = Math.max(0, browBot - (eyeTop - 2)) / G;
        }
        if (moodNow === 'Unibrow') {
          const [u0, v0] = spot(lpx, lpy - raise), [u1, v1] = spot(rpx, rpy - raise), w = Math.max(3, Math.round(0.084 * bw * k * G));
          pen(fC); block(Math.round(u0 * G - w / 2), Math.round(((v0 + v1) / 2 - up) * G), Math.round((u1 - u0) * G) + w, 1);
        } else for (const [px, py, s] of [[lpx, lpy, -1], [rpx, rpy, 1]]) { const [u, v] = spot(px, py - raise); stamp(u, v - up, browRows(s, moodNow), inks({ a: s > 0 ? rC : fC })); }
      }
      const lookNow = shy > 0.5 ? 0 : look;
      const r = 0.04 * es * 1.55;
      if (eyes === 'Cyclops') {
        const [u, v] = spot(...P(fx, eyeY)), D = Math.max(5, Math.round(0.12 * k * sizeNow / es * G)), di = Math.max(2, Math.round(0.05 * k * G));
        const f = roundRows(D).map(row => row.split('')), o = Math.round((D - di) / 2), lk = lookNow > 0.45 ? 1 : lookNow < -0.45 ? -1 : 0;
        for (let j = 0; j < di; j++) for (let i = 0; i < di; i++) if (f[o + j] && f[o + j][o + i + lk] === 'a') f[o + j][o + i + lk] = 'b';
        const rows = f.map(row => row.join('')), map = inks({ a: eyeCol(-1), b: headC === RED ? YEL : RED });
        if (open < 0.5) stamp(u, v, [run('a', D)], map);
        else stamp(u, v, rows, map, react === 'Delight' && rk > 0.3 ? Math.floor(D / 2) : 0);
      } else if (eyewear !== 'Shades' && eyewear !== 'Star Shades' && eyewear !== 'Visor') {   // solid lenses hide the eyes
        for (const [px, py, s] of [[lpx, lpy, -1], [rpx, rpy, 1]]) {
          let kind = eyes, op = open;
          if (react === 'Delight' && rk > 0.3) kind = 'Joy';
          if (react === 'Wink' && rk > 0.3 && s === -side) op = 0;
          if (shy > 0.3) op = Math.min(op, 0.55);
          const [u, v] = spot(px, py + (shy > 0.3 ? 0.012 : 0));
          eyeAt(kind, op, s, eyeCol(s), lookNow, sizeNow, u, v);
        }
      }
      // nose
      if (nose !== 'None') { const [u, v] = spot(...P(fx * 1.5, noseY)); stamp(u, v, noseRows(), inks({ a: noseC() })); }
      // facial hair and marks
      const [mx, my] = P(fx, mouthY);
      const fh = hair === 'Bald' ? (fC === INK ? INK : notAny(headC, bg)) : hairC() === headC ? fC : hairC();
      if (facial === 'Beard') { const M0 = M; keep(); stretch(sx, sy); clipTo(headIn); M = M0; pen(fh); oval(mx, my - 0.03, Math.max(0.1, gSide * sx * 0.8), Math.max(0.1, gSide * sx * 0.8), 0, 2); back(); }
      if (facial === 'Goatee') { const [u, v] = spot(mx, my + 0.06); stamp(u, v, ['aaa', 'aaa', '.a.'], inks({ a: fh })); }
      if (facial === 'Sideburns') { keep(); stretch(sx, sy); clipTo(headIn); pen(fh); box(-gSide - 0.02, eyeY - 0.05, 0.06, 0.13); box(gSide - 0.04, eyeY - 0.05, 0.06, 0.13); back(); }
      if (facial === 'Freckles' || facial === 'Blush' || shy > 0.01) {
        const fcC = faceMouth(headC), bl = headC === RED ? YEL : RED;
        for (const s of [-1, 1]) {
          const [u, v] = spot(...P(s * (eyeDX + 0.02) + fx, eyeY + 0.07));
          if (facial === 'Freckles') stamp(u, v, s > 0 ? ['..a', 'a..', '.a.'] : ['a..', '..a', '.a.'], inks({ a: fcC }));
          const blush = facial === 'Blush' ? 1 : shy;
          if (blush > 0.01) {
            // a full blush is solid; shyness comes on as a dither, then fills in
            const rows = blush > 0.7 ? ['aaa', 'aaa'] : blush > 0.3 ? ['a.a', '.a.'] : ['.a.', '...'];
            stamp(u, v + 0.01, rows, inks({ a: bl }));
          }
        }
      }
      if (facial === 'Beauty Spot') { const [u, v] = spot(mx + side * 0.06, my - 0.035); stamp(u, v, ['a'], inks({ a: fC })); }
      // mouth (a reaction borrows another shape for a moment)
      let mk = mouth;
      if (rk > 0.3) mk = react === 'Delight' ? 'Grin' : react === 'Surprise' ? 'Gasp' : react === 'Wink' ? 'Smirk' : 'Shy';
      let mc = faceMouth(headC);
      if ((facial === 'Beard' || facial === 'Goatee') && mc === fh) mc = CRM;
      const mrows = mk !== 'None' ? mouthRows(mk, mw) : null;
      if (mrows) {
        const [u, v] = spot(mk === 'Whistle' ? mx + side * 0.025 : mx, my);
        stamp(u, v, mrows, inks({ a: mc, c: mc === CRM ? INK : CRM, t: mc === LIP ? '#b36a55' : mc === RED ? CRM : RED }));
      }
      if (facial === 'Moustache' || facial === 'Handlebar') {
        const [u, v] = spot(...P(fx, mouthY - 0.036));
        stamp(u, v - 0.5 / G, facial === 'Moustache' ? ['.aa.aa.', 'aaaaaaa', 'a.....a'] : ['a.......a', 'aa.....aa', '.aaaaaaa.'], inks({ a: fh }));
      }
      // eyewear
      if (eyewear !== 'None') {
        const frame = cut === 'Split' || cut === 'Mask' ? notAny(headC, splitC, bg) : fC;
        const L = spot(lpx, lpy), Rr = spot(rpx, rpy), D = Math.max(6, Math.round(2 * r * G) + 1);
        const fm = inks({ a: frame }), li = Math.round(L[0] * G), ri = Math.round(Rr[0] * G), row = Math.round((L[1] + Rr[1]) / 2 * G);
        const bridge = (rowAt, w) => { pen(frame); const a0 = Math.round(L[0] * G + w / 2), a1 = Math.round(Rr[0] * G - w / 2) - 1; if (a1 >= a0) rule(a0, rowAt, a1, rowAt); };
        if (eyewear === 'Round Specs' || eyewear === 'Third Lens') {
          const ring = hollow(roundRows(D)).map(rw => rw.replace(/b/g, '.'));
          stamp(L[0], L[1], ring, fm); stamp(Rr[0], Rr[1], ring, fm); bridge(row - 1, D);
          if (eyewear === 'Third Lens') { const [u, v] = spot(...P(fx, eyeY - 0.1)); stamp(u, v, hollow(roundRows(D - 1)).map(rw => rw.replace(/b/g, '.')), fm); stamp(u, v, ['.a.', 'aaa', '.a.'], inks({ a: YEL === headC ? RED : YEL })); }
        } else if (eyewear === 'Square Specs') {
          const w = D + 1, h = D - 1, sq = [];
          for (let j = 0; j < h; j++) sq.push(j === 0 || j === h - 1 ? run('a', w) : 'a' + run('.', w - 2) + 'a');
          stamp(L[0], L[1], sq, fm); stamp(Rr[0], Rr[1], sq, fm); bridge(row - 1, w);
        } else if ('Monocle' === eyewear) {
          const E = side > 0 ? Rr : L, gm = inks({ a: GLD === headC ? frame : GLD });
          stamp(E[0], E[1], hollow(roundRows(D)).map(rw => rw.replace(/b/g, '.')), gm);
          const [u1, v1] = spot((side > 0 ? rpx : lpx) + side * r * 0.4, (side > 0 ? rpy : lpy) + 0.24);
          pen(GLD === headC ? frame : GLD); rule(Math.round(E[0] * G + side * D / 2 * 0.7), Math.round(E[1] * G + D / 2 * 0.7), Math.round(u1 * G), Math.round(v1 * G));
        } else if (eyewear === 'Shades') {
          const w = D + 1, lens = roundRows(w).slice(Math.floor(w / 2) - 1), sm = inks({ a: INK });
          stamp(L[0], L[1] + 0.5 / G, lens, sm); stamp(Rr[0], Rr[1] + 0.5 / G, lens, sm);
          pen(INK); const top = Math.round(L[1] * G + 0.5 - lens.length / 2); rule(li, top, ri, top);
        } else if (eyewear === 'Visor') {
          const sc = headC === BLU ? RED : BLU, w = ri - li + D + 2, h = Math.max(3, Math.round(1.6 * r * G));
          pen(sc); block(Math.round((L[0] + Rr[0]) / 2 * G - w / 2), row - Math.floor(h / 2), w, h);
          pen(sc === BLU ? CRM : YEL); block(Math.round((L[0] + Rr[0]) / 2 * G - w / 2) + 2, row - Math.floor(h / 2) + 1, w - 4, 1);
        } else if (eyewear === 'Star Shades') {
          const sm = inks({ a: headC === YEL ? RED : YEL });
          stamp(L[0], L[1], STAR7, sm); stamp(Rr[0], Rr[1], STAR7, sm); pen(headC === YEL ? RED : YEL); rule(li, row, ri, row);
        }
      }
    }

    function earsDraw(far) {
      if (ears === 'None' || legend === 'Sun') return;
      const hidden = hair === 'Long' || hair === 'Bob' || hair === 'Afro';
      for (const s of [-1, 1]) {
        const [ex, ey] = P(s * (gSide - 0.004), eyeY + 0.035);
        if (!far) {
          if (!hidden) { const [u, v] = spot(ex, ey); stamp(u, v, roundRows(Math.max(3, Math.round(0.084 * k * G))), inks({ a: skin(cut === 'Split' && s > 0 ? splitC : headC) })); }
          continue;
        }
        const ox = ex + s * 0.025 * k, oy = ey + (hidden ? 0.07 : 0.045) * k;
        const kind = ears === 'Odd Pair' ? (s < 0 ? 'Hoops' : 'Drops') : ears;
        const jc = inks({ a: GLD === headC || GLD === bg ? (headC === YEL ? RED : YEL) : GLD });
        if (kind === 'Studs') { const [u, v] = spot(ox, oy - 0.01); stamp(u, v, ['a'], jc); }
        else if (kind === 'Hoops') { const [u, v] = spot(ox, oy + 0.03); stamp(u, v, ['.a.', 'a.a', 'a.a', '.a.'], jc); }
        else if (kind === 'Drops') { const [u, v] = spot(ox, oy + 0.02); stamp(u, v, ['.a.', '.a.', 'aaa', 'aaa', '.a.'], jc); }
      }
    }

    // ---------- the balloon (the coveted item) ----------
    const BALLOON = ['...aaa...', '.aaaaaaa.', '.ahaaaaa.', 'ahhaaaaaa', 'ahaaaaaaa', 'aaaaaaaaa', '.aaaaaaa.', '..aaaaa..', '...aaa...', '....a....'];
    const bnX = comp === 'Little One' ? 0.5 - side * 0.37 + side * 0.06 : 0.5 - side * 0.33, bnY0 = comp === 'Little One' ? 0.86 : shoulderAt(0.5 - side * 0.33) + 0.03;
    const bnC = bg === RED || backC === RED ? (bg === YEL ? BLU : YEL) : RED;
    let bobAt = -9;
    function balloonDraw(t) {
      const lean = c.input.inside ? Math.max(-3, Math.min(3, Math.round((c.input.x - bnX) * 10))) : Math.round(Math.sin(t * 0.6) * 1.2);
      const bob = t - bobAt < 1.2 ? Math.round(Math.sin((t - bobAt) / 1.2 * Math.PI) * 3) : 0;
      const bi = Math.round(bnX * G) + lean, bj = Math.round(0.19 * G) - bob, ai = Math.round(bnX * G), aj = Math.round(bnY0 * G);
      const sway = Math.round(Math.sin(t * 1.1) * 1);
      pen(bg === INK ? CRM : INK);
      const mi = Math.round((bi + ai) / 2) + sway, mj = Math.round((bj + 4 + aj) / 2);
      rule(bi, bj + 5, mi, mj); rule(mi, mj, ai, aj);
      stamp((bi + 0.5) / G, (bj + 0.5) / G, BALLOON, inks({ a: bnC, h: bnC === YEL ? CRM : '#f6efe0' }));
      return [(bi + 0.5) / G, (bj + 0.5) / G];
    }
    let balloonAt = [bnX, 0.17];

    // ---------- the frame ----------
    let hopAt = -9, birdAt = -9, react = null, reactAt = -9, lookX = 0;
    function draw(t) {
      M = [1, 0, 0, 1, 0, 0]; clips.length = 0; saved.length = 0; sitter = 0;
      pen(bg); grid.fill(cur); mine.fill(0); layer.fill(0); shapeN = 0;
      if (!skipBack) backdropDraw();
      const hp = t - hopAt;
      // a one-cell breath now and then, and a two-cell hop when the primaries pass round
      const breath = Math.sin(t * 1.3 + blinkOff) > 0.82 ? 1 : 0;
      const hop = hp < 0.35 ? Math.round(Math.sin(hp / 0.35 * Math.PI) * 2) : 0;
      const ph = (blinkOff + t) % blinkGap;
      const open = ph < 0.16 ? 0 : 1;
      const ra = t - reactAt, rk = react && ra < 2.6 ? Math.min(1, ra / 0.08) * Math.min(1, (2.6 - ra) / 0.3) : 0;
      // the eyes drift on their own, and toward the pointer when there is one
      const idle = Math.sin(t * 0.37 + blinkOff * 2) > 0.75 ? side : Math.sin(t * 0.29 + 1) < -0.85 ? -side : 0;
      const want = c.input.inside ? Math.max(-1, Math.min(1, (c.input.x - cx) * 3)) : idle;
      lookX += (want - lookX) * 0.12;
      propSpin += hat === 'Propeller' ? 0.03 + Math.max(0, 1 - hp / 1.5) * 0.35 + Math.max(0, 1 - ra / 1.5) * 0.35 : 0;

      if (comp === 'Moon') moon(t, false);
      sitter = 1;
      pen(skin(headC)); box(0.5 - nw / 2, cy, nw, 0.5 - cy + 0.4);
      pen(bodyC); paint(bodyIn, 0, 0.68, 1, 1.05);
      outfitDraw();

      keep();
      shift(cx, chinY - (breath + hop) / G); spin(tilt); shift(0, -gBot * sy);
      keep(); stretch(sx, sy); hairBehind(); back();
      earsDraw(false);
      keep(); stretch(sx, sy);
      if (cut === 'Offset Print') { keep(); shift(0.05 / sx, -0.04 / sy); pen(splitC); headFill(); back(); }
      pen(skin(headC)); headFill();
      if (cut === 'Split' || cut === 'Mask') {
        keep(); clipTo(headIn); pen(cut === 'Split' ? skin(splitC) : splitC);
        if (cut === 'Split') box(0, -1, 1, 2); else box(-1, eyeY - 0.05, 2, 0.1);
        back();
      }
      hairFront();
      if (cut === 'Stencil') { keep(); clipTo(headIn); pen(bg); box(-1, noseY + 0.006, 2, 1 / G); box(backSide * 0.13 - 0.5 / G, gTop - 0.1, 1 / G, eyeY - gTop + 0.04); back(); }
      back();
      if (cut === 'Cheeks') { const cm = inks({ a: headC === RED ? YEL : RED }); for (const s of [-1, 1]) { const [u, v] = spot(...P(s * (eyeDX + 0.035) + fx, mouthY - 0.035)); stamp(u, v, ['.aa.', 'aaaa', '.aa.'], cm); } }
      face(t, open, lookX, react, rk);
      earsDraw(true);
      keep(); stretch(sx, sy); hatDraw(); back();
      back();

      if (comp === 'Moon') { sitter = 0; moon(t, true); }
      else if (comp === 'Bird') bird(t);
      else if (comp === 'Buttonhole') buttonhole();
      else if (comp === 'Little One') littleOne(t, open);
      sitter = 0;
      if (balloon) balloonAt = balloonDraw(t);
    }

    // ---------- the finished grid, as pixels ----------
    const PASS = { [RED]: 0, [YEL]: 1, [GLD]: 1, [BLU]: 2, [INK]: 3, [UMBER]: 3, [LIP]: 3, [CRM]: -1, [GRY]: -1 };
    let printed = 0;
    const out = new Uint32Array(G * G);
    function finish() {
      for (let n = 0; n < G * G; n++) out[n] = words[grid[n]];
      return out;
    }

    // ---------- the legendaries: each one a picture of its own (2026-10-19, pass 2 the same day) ----------
    // Gold Foil: a big gold medal hung on a ribbon in the poster's three primaries, on quilted black velvet under
    // a spotlight: beaded rim, laurel, and the sitter struck in relief (its own head, hair and hat). Grab it and
    // swing it on its ribbon; fling it hard and it spins over to show its back (a Bauhaus emblem); tap to turn it.
    // Unprinted: a blind-embossed proof: the sitter pressed into white paper with no ink, read only by a raking
    // light (the pointer is the lamp), inside a plate mark, signed 1/1 in pencil. Roll ink over it with a brayer:
    // drag to ink, let go to load the next colour, tap to choose one, hold still to wash the sheet clean.
    // Sun: a sunrise poster: the sun's own glyph face on a disc with turning rays over rings of sky, a stepped sea
    // with its reflection. Drag the sun across the sky: high it's noon, low it's a purple dusk, below the sea it's
    // night with stars and a moon; tap the sun to make it flare.
    let skipBack = false;
    const LG = legend === 'None' ? null : (() => {
      const word = hex => { const v = parseInt(hex.slice(1), 16); return (0xff000000 | ((v & 0xff) << 16) | (v & 0xff00) | (v >>> 16)) >>> 0; };
      const mixW = (a, b, u) => { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); const ch = s => Math.round(((p >> s) & 255) * (1 - u) + ((q >> s) & 255) * u); return word('#' + [16, 8, 0].map(s => ch(s).toString(16).padStart(2, '0')).join('')); };
      const out = new Uint32Array(G * G), u1 = 1 / G;
      const hsh = (i, j, s) => { let h = Math.imul(i * 374761393 + j * 668265263 + s * 2246822519, 0x27d4eb2d); h ^= h >>> 15; return (h >>> 0) / 4294967296; };
      const reset = (hex) => { M = [1, 0, 0, 1, 0, 0]; clips.length = 0; saved.length = 0; sitter = 0; pen(hex); grid.fill(cur); mine.fill(0); layer.fill(0); shapeN = 0; };
      // the pointer as gestures: press, drag, hold, release; a tap the runtime saw between two frames counts as a click
      const g = { down: false, t0: 0, x0: 0, y0: 0, x: 0.5, y: 0.5, px: 0.5, py: 0.5, moved: 0, last: 0, dt: 1 / 30, click: null, press: false, release: false };
      const track = (t) => {
        const i = c.input;
        g.dt = Math.max(0.001, Math.min(0.1, t - g.last)); g.last = t; g.press = g.release = false;
        g.px = g.x; g.py = g.y;
        if (i.inside || i.down) { g.x = i.x; g.y = i.y; }
        if (i.down && !g.down) { g.down = true; g.press = true; g.t0 = t; g.x0 = g.px = g.x; g.y0 = g.py = g.y; g.moved = 0; }
        else if (!i.down && g.down) { g.down = false; g.release = true; }
        if (g.down) g.moved = Math.max(g.moved, Math.hypot(g.x - g.x0, g.y - g.y0));
      };
      let pend = null;
      const tapped = (u, v) => { if (!c.input.down) pend = [u, v]; };
      const takeClick = () => { const p = pend; pend = null; if (p) return p; return g.release && g.moved < 0.03 && g.last - g.t0 < 0.5 ? [g.x, g.y] : null; };
      if (legend === 'Gold Foil') {
        const code = n => slot('#0a00' + n.toString(16).padStart(2, '0'));
        const VEL = code(0), SHADOW = code(1), RIB = [code(2), code(3), code(4)], CLASP = code(5), RINGC = code(6), RIMC = code(7), BEADC = code(8), FLD = code(9), INC = code(10), LEAF = code(11);
        const GOLD = ['#4a2f0b', '#94651a', '#c98f29', '#ebbd55', '#fde4a0'].map(word), GLINT = word('#fffbea');
        const VW = [word('#110f0d'), word('#1c1814'), word('#2b241c'), word('#070605'), word('#171310'), word('#1f1a15')];
        const RW = [RED, YEL, BLU].map(h => [mixW(h, '#000000', 0.32), word(h), mixW(h, '#ffffff', 0.25)]);
        const STRIPE = [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0];
        const base = new Map([[CLASP, 3], [RINGC, 3], [RIMC, 3], [BEADC, 4], [FLD, 2], [INC, 0], [LEAF, 3]]);
        const tw = []; for (let k = 0; k < 4; k++) tw.push(nr());
        const PX = 24, PY = -3, L = 33, R = 16.2;   // the pivot (above the top edge), the ribbon's length to the medal's middle, its radius
        let th = 0, om = 0, ph = 0, phv = 0, phGoal = 0, grab = false;
        const medalAt = () => [PX + Math.sin(th) * L, PY + Math.cos(th) * L];
        return {
          tap: tapped,
          frame(t) {
            track(t);
            const dt = g.dt, [mx0, my0] = medalAt();
            // grab it and swing it; let go and it swings on, a hard fling spins it over
            if (g.press && Math.hypot(g.x * G - mx0, g.y * G - my0) < R + 3) grab = true;
            if (grab && g.down) {
              const nt = Math.max(-0.42, Math.min(0.42, Math.atan2(g.x * G - PX, Math.max(4, g.y * G - PY))));
              om = om * 0.5 + (nt - th) / dt * 0.5; th = nt;
            } else {
              if (grab && g.release) { grab = false; if (Math.abs(om) > 2.2) { phv = om * 5.5; c.sound.note(tonic + 24, { dur: 0.9, vel: 0.1, wave: 'sine' }); } }
              om += (-6.3 * Math.sin(th) - 0.45 * om + 0.35 * Math.sin(t * 2.4)) * dt;
              th = Math.max(-0.42, Math.min(0.42, th + om * dt));
              if (Math.abs(th) >= 0.42) om *= -0.4;
            }
            const click = takeClick();
            if (click && !grab) { phGoal = Math.round(ph / Math.PI) * Math.PI + Math.PI; phv = 0; [0, 4, 7].forEach((n, i) => c.sound.note(tonic + 24 + n, { dur: 0.4, vel: 0.07, wave: 'triangle', at: i * 0.08 })); }
            if (Math.abs(phv) > 1.5) { ph += phv * dt; phv *= Math.exp(-1.4 * dt); phGoal = Math.round(ph / Math.PI) * Math.PI; }
            else { phv = 0; ph += (phGoal - ph) * Math.min(1, dt * 7); }
            const sq = Math.cos(ph), back2 = sq < 0;
            reset('#0a0000'); cur = VEL;
            // everything hangs from the pivot: ribbon, clasp, ring and medal turn together
            keep(); shift(PX * u1, PY * u1); spin(-th);
            sitter = 1;
            for (let q = 0; q < 12; q++) { cur = RIB[STRIPE[q]]; box((q - 6) * u1, 2 * u1, u1 * 1.02, 11 * u1); }
            sitter = 2; cur = CLASP; box(-7 * u1, 12.5 * u1, 14 * u1, 2 * u1);
            cur = RINGC; hoop(0, 15.6 * u1, 1.5 * u1, 1.3 * u1, 0.45 * u1);
            keep(); shift(0, L * u1); stretch(Math.max(0.07, Math.abs(sq)), 1);
            sitter = 0; cur = SHADOW; disc(1.3 * u1, 1.5 * u1, R * u1);
            sitter = 3; cur = RIMC; disc(0, 0, R * u1);
            sitter = 4; cur = BEADC;
            for (let q = 0; q < 44; q += 2) { const a = q / 44 * Math.PI * 2; disc(Math.cos(a) * (R - 1.15) * u1, Math.sin(a) * (R - 1.15) * u1, 0.62 * u1); }
            sitter = 1; cur = FLD; disc(0, 0, (R - 2.3) * u1);
            if (Math.abs(sq) > 0.25) {
              sitter = 2; cur = LEAF;
              for (const s of [-1, 1]) for (let q = 0; q < 7; q++) { const a = Math.PI / 2 + s * (0.5 + q * 0.3), r = (R - 4.5) * u1; oval(Math.cos(a) * r, Math.sin(a) * r, 1.2 * u1, 0.6 * u1, a + Math.PI / 2); }
              clipTo((a, b) => a * a + b * b <= ((R - 2.6) * u1) ** 2);
              if (!back2) {
                // the sitter struck in relief, a little over half size
                keep(); shift(0, -2 * u1); stretch(0.6, 0.6);
                sitter = 2; pen(bodyC); oval(0, gBot * sy + 0.21, 0.42, 0.22, 0, 1);
                keep(); stretch(sx, sy); hairBehind(); back();
                sitter = 3; keep(); stretch(sx, sy); pen(headC); headFill(); hairFront(); back();
                sitter = 4; pen(headC); box((fx - 0.018) * sx, noseY * sy - 0.03, 0.036 * sx, 0.05);
                sitter = 1; cur = INC;
                for (const s of [-1, 1]) disc((s * eyeDX + fx) * sx, eyeY * sy, 0.045);
                box((fx - 0.075) * sx, mouthY * sy, 0.15 * sx, 0.032);
                sitter = 4; keep(); stretch(sx, sy); hatDraw(); back();
                back();
              } else {
                // the back: Primer's three primitives in relief, overlapping
                sitter = 1; cur = INC; disc(-3.2 * u1, -1.5 * u1, 5.8 * u1); box(-2 * u1, -5.8 * u1, 8.6 * u1, 8.6 * u1); tri([-6.2 * u1, 7.2 * u1], [6.2 * u1, 7.2 * u1], [0, -2.2 * u1]);
                sitter = 3; pen(RED); disc(-3.2 * u1, -1.5 * u1, 5 * u1);
                sitter = 4; pen(BLU); box(-1.2 * u1, -5 * u1, 7 * u1, 7 * u1);
                sitter = 2; pen(YEL); tri([-5 * u1, 6.5 * u1], [5 * u1, 6.5 * u1], [0, -1 * u1]);
              }
            }
            back(); back();
            // strike it: gold by material, a bevel lit from the upper left, then the glint (under the pointer when it's near)
            const gp = c.input.inside && !g.down ? (c.input.x + c.input.y) * G : (t * 20) % 150 - 30;
            for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
              const n = j * G + i, g0 = grid[n];
              if (g0 === VEL || g0 === SHADOW) {
                // quilted velvet: diamond seams with a button where they cross; a soft spotlight round the medal
                const a = (i + j) % 8, b = (i - j + 64) % 8, lit = Math.hypot(i - mx0, j - my0 + 4) < 22 && (i * 3 + j * 5) % 4 !== 0;
                out[n] = g0 === SHADOW ? VW[3] : a === 0 && b === 0 ? VW[2] : a === 0 || b === 0 ? VW[1] : lit ? VW[5] : VW[(i * 7 + j * 3) % 13 === 0 ? 4 : 0];
                continue;
              }
              const ri = RIB.indexOf(g0);
              if (ri >= 0) { out[n] = RW[ri][(i + j) % 7 === 0 ? 0 : j < 3 ? 2 : 1]; continue; }
              const h = mine[n], hn = m => (m >= 0 && m < G * G ? mine[m] : 0);
              let f = base.has(g0) ? base.get(g0) : 3;
              const ul = Math.max(hn(n - G - 1), hn(n - G), i > 0 ? hn(n - 1) : 0), lo = Math.min(hn(n - G - 1), hn(n - G), i > 0 ? hn(n - 1) : 0);
              if (h > lo && h >= ul) f = Math.min(4, f + 1);
              else if (h < ul || h > hn(n + G + 1) || h > hn(n + G) || (i < G - 1 && h > hn(n + 1))) f = Math.max(0, f - 1);
              const d = i + j - gp;
              out[n] = d > -1 && d < 1 ? GLINT : d > -3 && d < 3 ? GOLD[Math.min(4, f + 1)] : GOLD[f];
            }
            // sparks that come and go on the rim
            const [mx, my] = medalAt();
            for (let k = 0; k < tw.length; k++) {
              const pz = t * 0.8 + tw[k] * 7, life = pz % 1; if (life > 0.45) continue;
              const a = tw[k] * 6.28 + Math.floor(pz) * 2.4, si = Math.round(mx + Math.cos(a) * R * Math.abs(sq) - 0.5), sj = Math.round(my + Math.sin(a) * R - 0.5), arm = life < 0.15 || life > 0.3 ? 1 : 2;
              for (let q = -arm; q <= arm; q++) for (const [a2, b2] of [[si + q, sj], [si, sj + q]]) if (a2 >= 0 && b2 >= 0 && a2 < G && b2 < G) out[b2 * G + a2] = Math.abs(q) < arm ? GLINT : GOLD[4];
            }
            return out;
          },
        };
      }
      if (legend === 'Unprinted') {
        // pass 3: deeper relief, inks that flood their whole colour, a pulled-proof moment, and a brayer always to hand
        const P = [word('#dcd0b6'), word('#ffffff'), word('#7a6b50'), word('#b3a283')], RAISED = word('#f6f1e5'), TABLE = word('#2a2622'), TABLE2 = word('#36312b'), GRAPH = word('#a39d91'), GRAPH2 = word('#bdb7ac');
        const BACK = word('#f4efe3'), BACKD = word('#d8cfbc'), FOLD = word('#9c8f75'), SHINE = word('#fffdf2'), HANDLE = word('#5a4632'), HANDLEL = word('#7d6447'), RED2 = word('#c8372b');
        const INKS4 = [RED, YEL, BLU, INK], inkOf = new Map();
        const variants = s => { let v = inkOf.get(s); if (!v) { const h = inkList[s]; v = [word(h), mixW(h, '#ffffff', 0.3), mixW(h, '#000000', 0.3), mixW(h, '#000000', 0.14)]; inkOf.set(s, v); } return v; };
        const passOf = s => { const p = PASS[inkList[s]]; return p === undefined ? 3 : p; };
        const H = new Int32Array(G * G);
        const LIGHTS = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, -1], [0, -1], [-1, -1]];
        const inPlate = (i, j) => i >= 4 && i <= 43 && j >= 4 && j <= 40;
        const PEN = new Map();
        const glyphs = [['.a.', 'aa.', '.a.', '.a.', 'aaa'], ['...a', '..a.', '..a.', '.a..', 'a...'], ['.a.', 'aa.', '.a.', '.a.', 'aaa']];
        let gx = 5; for (const gph of glyphs) { gph.forEach((row, r) => row.split('').forEach((ch, q) => { if (ch === 'a') PEN.set((42 + r) * G + gx + q, GRAPH); })); gx += gph[0].length + 1; }
        let px0 = 31, py0 = 45;
        for (let q = 0; q <= 14; q++) { const x = Math.round(31 + q * 0.45), y = Math.round(44.6 + Math.sin(q * 0.9) * 1.5 - (q < 6 ? (6 - q) * 0.25 : 0)); for (const [a, b] of [[px0, py0], [x, y]]) PEN.set(b * G + a, q % 5 === 0 ? GRAPH2 : GRAPH); px0 = x; py0 = y; }
        // each ink: when it went down (null: not yet), how far each cell lies from the strokes that put it there
        const SPEED = 45, floodT = [null, null, null, null], dist = [0, 1, 2, 3].map(() => new Float32Array(G * G).fill(1e9)), reach = [0, 0, 0, 0];
        let ink = 0, washAt = -9, holdT = 0, pullAt = -9, pulled = false, stroke = [];
        const flood = (t) => {
          // the ink runs out from the brayer's path over every part of the poster printed in that colour
          const d = dist[ink]; let far = 0;
          const pts = stroke.length > 40 ? stroke.filter((_, k) => k % Math.ceil(stroke.length / 40) === 0) : stroke;
          for (let n = 0; n < G * G; n++) { const i = n % G, j = (n - i) / G; let m = d[n]; for (const [x, y] of pts) { const e = (i + 0.5 - x) ** 2 + (j + 0.5 - y) ** 2; if (e < m * m) m = Math.sqrt(e); } d[n] = m; if (m < 1e8) far = Math.max(far, m); }
          if (floodT[ink] === null) floodT[ink] = t;
          reach[ink] = Math.max(reach[ink], (t - floodT[ink]) * SPEED + far);
        };
        const inkedAt = (p, n, t) => floodT[p] !== null && t >= floodT[p] + dist[p][n] / SPEED;
        const brayer = (bx, by, col, rolling) => {
          // a roller loaded with ink and its wooden handle, angled down and right
          const dark = mixW(INKS4[ink], '#000000', 0.4);
          for (let a = -3; a <= 3; a++) for (let b = -1; b <= 0; b++) { const i = bx + a, j = by + b; if (i >= 0 && j >= 0 && i < G && j < G) out[j * G + i] = b ? col : rolling && (a + Math.floor(g.last * 20)) % 3 === 0 ? col : dark; }
          for (const s of [-1, 1]) { const i = bx + s * 4, j = by - 1; if (i >= 0 && i < G && j >= 0) out[j * G + i] = HANDLE; }
          for (let k = 1; k <= 6; k++) { const i = bx + 4 + Math.floor(k * 0.7), j = by - 1 - k; if (i >= 0 && j >= 0 && i < G && j < G) out[j * G + i] = k > 3 ? HANDLEL : HANDLE; }
        };
        return {
          tap: tapped,
          frame(t) {
            track(t);
            const click = takeClick();
            if (g.down && g.moved > 0.03) {
              if (!stroke.length) c.sound.hit('noise', 0.05, { cutoff: 500, dur: 0.2 });
              const n = Math.max(1, Math.ceil(Math.hypot(g.x - g.px, g.y - g.py) * G));
              for (let s = 0; s <= n; s++) stroke.push([(g.px + (g.x - g.px) * s / n) * G, (g.py + (g.y - g.py) * s / n) * G]);
              if (stroke.length > 6 && Math.floor(t * 6) !== Math.floor((t - g.dt) * 6)) { flood(t); stroke = stroke.slice(-12); }
            }
            if (g.release && stroke.length) { flood(t); stroke = []; ink = (ink + 1) % 4; c.sound.note(tonic + [0, third, 7, 12][ink], { dur: 0.3, vel: 0.12, wave: 'triangle' }); }
            if (click) { ink = (ink + 1) % 4; c.sound.note(tonic + [0, third, 7, 12][ink], { dur: 0.25, vel: 0.12, wave: 'triangle' }); }
            holdT = g.down && g.moved < 0.03 ? t - g.t0 : 0;
            if (holdT > 1.2 && washAt < g.t0) { washAt = t; c.sound.hit('noise', 0.12, { cutoff: 900, dur: 0.6 }); }
            if (washAt > 0 && t - washAt > 0.5 && t - washAt < 0.7 && floodT.some(v => v !== null)) { for (let p = 0; p < 4; p++) { floodT[p] = null; dist[p].fill(1e9); reach[p] = 0; } pulled = false; }
            const washing = t - washAt < 0.5 ? (t - washAt) / 0.5 : 0;
            skipBack = true; draw(t); skipBack = false;
            // which inks this poster uses, and whether all of them have finished running: then the proof is pulled
            const used = [false, false, false, false];
            for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) { const n = j * G + i; H[n] = inPlate(i, j) ? (layer[n] ? 2 + layer[n] : 0) : 1; if (inPlate(i, j) && layer[n]) used[passOf(grid[n])] = true; }
            if (!pulled && used.every((u, p) => !u || (floodT[p] !== null && t > floodT[p] + reach[p] / SPEED + 0.2))) {
              pulled = true; pullAt = t;
              [0, third, 7, 12, 19, 24].forEach((n, i) => c.sound.note(tonic + 12 + n, { dur: 0.9, vel: 0.1, wave: 'sine', at: 0.1 + i * 0.07 }));
            }
            let Ld;
            if (c.input.inside && !g.down) { const dx = c.input.x - 0.5, dy = c.input.y - 0.42; Ld = [Math.abs(dx) > 0.1 ? Math.sign(dx) : 0, Math.abs(dy) > 0.1 ? Math.sign(dy) : 0]; if (!Ld[0] && !Ld[1]) Ld = [-1, -1]; }
            else Ld = LIGHTS[Math.floor(t / 0.55) % LIGHTS.length];
            for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
              const n = j * G + i;
              if (i < 2 || j < 2 || i > G - 3 || j > G - 3) { out[n] = (i === 1 || j === 1 || i === G - 2 || j === G - 2) && hsh(i >> 1, j >> 1, 3) < 0.5 ? TABLE2 : TABLE; continue; }
              const hAt = (a, b) => a >= 0 && b >= 0 && a < G && b < G ? H[b * G + a] : 1;
              const h0 = H[n], h1 = hAt(i + Ld[0], j + Ld[1]), h2 = hAt(i + 2 * Ld[0], j + 2 * Ld[1]), h3 = hAt(i + 3 * Ld[0], j + 3 * Ld[1]);
              const shade = h0 > h1 ? 1 : h0 < h1 || (h0 < h2 && h2 > 1) ? 2 : h0 < h3 && h3 > 1 ? 3 : 0;
              const s = grid[n], p = inPlate(i, j) && layer[n] ? passOf(s) : -1;
              if (p >= 0 && inkedAt(p, n, t) && !(washing && hsh(i, j, 9) < washing)) {
                // the wet edge of the running ink shows a touch darker
                const wet = floodT[p] !== null && t < floodT[p] + dist[p][n] / SPEED + 0.12;
                out[n] = variants(s)[wet ? 2 : shade]; continue;
              }
              out[n] = PEN.get(n) || (shade === 0 && h0 > 1 ? RAISED : P[shade]);
            }
            // the pulled proof: a shine runs over it, its corner lifts off the block and settles, and the pencil gets a red tick
            const pu = t - pullAt;
            if (pu >= 0 && pu < 1.6) {
              const sweep = pu * 110 - 10;
              for (let j = 4; j <= 40; j++) for (let i = 4; i <= 43; i++) { const d = i + j - sweep; if (d >= 0 && d < 2) out[j * G + i] = SHINE; }
              const k = Math.round(Math.sin(Math.min(1, pu / 1.4) * Math.PI) * 17);
              for (let j = 4; j < 4 + k; j++) for (let i = 43 - (k - (j - 4)) + 1; i <= 43; i++) out[j * G + i] = i - (43 - (k - (j - 4))) <= 1 ? FOLD : (i + j) % 5 ? BACK : BACKD;
              for (let q = 0; q < k; q++) { const i = 43 - k + q + 1, j = 4 + q; if (i >= 4 && j <= 40 && i - 1 >= 4) out[j * G + i - 1] = TABLE2; }
            }
            if (pulled) for (const [a, b] of [[16, 45], [17, 46], [18, 45], [19, 44], [20, 43]]) out[b * G + a] = RED2;
            // the four inks in the margin, the loaded one boxed in pencil
            for (let q = 0; q < 4; q++) { const x0 = 21 + q * 2, col = word(INKS4[q]); out[44 * G + x0] = col; out[45 * G + x0] = col; if (q === ink) { out[43 * G + x0] = GRAPH; out[46 * G + x0] = GRAPH; } }
            // the brayer: under the pointer (rolling when pressed), else resting on the corner of the sheet
            const inkW = word(INKS4[ink]);
            if (c.input.inside || g.down) brayer(Math.round(g.x * G), Math.round(g.y * G), inkW, g.down && g.moved > 0.03);
            else brayer(39, 46, inkW, false);
            return out;
          },
        };
      }
      // the Sun
      const SEA2 = mixW(BLU, '#ffffff', 0.22), SEA0 = mixW(BLU, '#000000', 0.25), SUNW = word(YEL), RAY2 = word(CRM), CLOUD = word(CRM), BIRD = word(INK), CHEEK = mixW(RED, YEL, 0.2);
      // the sky by the sun's height: night, dusk, morning, noon (two ring colours each), and the sea under it
      const SKIES = [['#0d1433', '#16204a'], ['#5b1f5e', '#8a2d5c'], [RED, mixHex(RED, YEL, 0.38)], ['#f6a33a', '#f8bd4f']];
      const SEAS = [['#070b1e', '#121a3a', '#1c2850'], [mixHex(BLU, '#3a1040', 0.4), mixHex(BLU, '#000000', 0.3), mixHex(BLU, '#ffffff', 0.12)], [BLU, mixHex(BLU, '#000000', 0.25), mixHex(BLU, '#ffffff', 0.22)], ['#2a7fd0', '#1f63a8', '#7cc3f5']];
      function mixHex(a, b, u) { const w = mixW(a, b, u); return '#' + [w & 255, (w >> 8) & 255, (w >> 16) & 255].map(v => v.toString(16).padStart(2, '0')).join(''); }
      const sunR = 9.6, HZ = 34;
      const cloud0 = nr() * 60, birds = [[nr() * 70, 8 + nr() * 6, 2.2 + nr()], [nr() * 70, 4 + nr() * 5, 1.6 + nr()]];
      const starsN = []; for (let k = 0; k < 40; k++) starsN.push([Math.floor(nr() * G), Math.floor(nr() * (HZ - 2)), nr() * 6.28]);
      let sunX = 24, sunY = 20.5, flare = -9, sunLook = 0, held = false;
      const lerpW = (a, b, u) => mixW(a, b, Math.max(0, Math.min(1, u)));
      return {
        tap: tapped,
        frame(t) {
          track(t);
          // drag the sun anywhere in the sky; let go and it stays there
          if (g.press && Math.hypot(g.x * G - sunX, g.y * G - sunY) < sunR + 6) held = true;
          if (!g.down) held = false;
          if (held) { sunX += (Math.max(4, Math.min(44, g.x * G)) - sunX) * Math.min(1, g.dt * 12); sunY += (Math.max(6, Math.min(46, g.y * G)) - sunY) * Math.min(1, g.dt * 12); }
          const click = takeClick();
          if (click && Math.hypot(click[0] * G - sunX, click[1] * G - sunY) < sunR + 2) {
            flare = t; react = REACTS[reactN % 4]; reactN++; reactAt = t; sing(react, click[0]);
            [0, third + 12, 19, 24].forEach((n, i) => c.sound.note(tonic + n, { dur: 1.4, vel: 0.1, wave: 'sine', attack: 0.04, at: i * 0.03 }));
          }
          // how high it is: 0 under the sea, 1 at the horizon, 2 halfway up, 3 near the top
          const hgt = Math.max(0, Math.min(3, sunY > HZ ? 1 - (sunY - HZ) / 8 : 1 + (HZ - sunY) / 13));
          const k = Math.min(2, Math.floor(hgt)), f = hgt - k;
          const sky = [0, 1].map(q => lerpW(SKIES[k][q], SKIES[k + 1][q], f)), sea = [0, 1, 2].map(q => lerpW(SEAS[k][q], SEAS[k + 1][q], f));
          const night = hgt < 1 ? 1 - hgt : 0, sy0 = sunY + (Math.sin(t * 0.7) > 0.6 && !held ? -1 : 0);
          const fl = t - flare < 0.9 ? Math.ceil(3 * (1 - (t - flare) / 0.9)) : 0;
          const r0 = sunR + 1.2 + fl * 1.5, step = Math.PI / 8, rot = t * 0.12, rayK = 0.55 + Math.min(1, hgt / 2) * 0.45;
          const toward = c.input.inside && !held ? Math.atan2(c.input.y * G - sy0, c.input.x * G - sunX) : null;
          const rays = [];
          for (let q = 0; q < 16; q++) {
            const an = q / 16 * Math.PI * 2 + rot;
            let near = 0;
            if (toward !== null) { let da = Math.abs(an - toward) % (Math.PI * 2); if (da > Math.PI) da = Math.PI * 2 - da; near = da < 0.3 ? 2 : da < 0.6 ? 1 : 0; }
            rays.push([an, q % 2 === 0, near]);
          }
          const inRay = (d, a) => {
            if (d <= r0 || d >= r0 + 11) return 0;
            const q = ((Math.round((a - rot) / step) % 16) + 16) % 16, [an, long, near] = rays[q];
            let da = Math.abs(a - an) % (Math.PI * 2); if (da > Math.PI) da = Math.PI * 2 - da;
            const len = ((long ? 8.5 : 5.5) + near) * rayK, hw = (long ? 0.2 : 0.09) * (1 - (d - r0) / len);
            return d < r0 + len && da < hw ? (long ? 1 : 2) : 0;
          };
          const cxo = ((cloud0 + t * 1.6) % 84) - 18, cloudC = lerpW('#3a3f6a', CRM, hgt / 1.6), cloudS = lerpW('#252a4c', mixHex(CRM, BLU, 0.28), hgt / 1.6);
          for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
            const n = j * G + i, x = i + 0.5, y = j + 0.5;
            if (j >= HZ) {
              // the sea: stepped waves sliding along, the sun's reflection broken across them under wherever it is
              const row = j - HZ, ph = Math.floor(t * 2 + row * 0.7), wv = (i + ph * (row % 2 ? 1 : -1) + 64) % 6;
              let col = (row % 3 === 0 && wv < 2) || (row % 3 === 1 && wv === 1) ? sea[2] : row > 9 ? sea[1] : sea[0];
              const rw = (7 - row * 0.25) * (0.6 + 0.4 * Math.sin(t * 2.3 + row * 1.3)) * Math.min(1, hgt * 0.8 + 0.2);
              if (row % 2 === 0 && Math.abs(x - sunX) < rw) col = night > 0.6 ? word('#f3e7bd') : row < 2 || Math.abs(x - sunX) < rw * 0.5 ? SUNW : RAY2;
              out[n] = col; continue;
            }
            const d = Math.hypot(x - sunX, y - sy0);
            let col = sky[Math.floor((d + t * 0.6) / 3.2) % 2];
            if (night > 0.3) { for (const [si, sj, sp] of starsN) if (si === i && sj === j && Math.sin(t * 1.5 + sp) > -0.3) col = word('#fff6d8'); }
            if (d < sunR) col = SUNW;
            else { const r = inRay(d, Math.atan2(y - sy0, x - sunX)); if (r) col = r === 1 ? SUNW : RAY2; }
            if (y > 3 && y < 13 && x > cxo - 4 && x < cxo + 13) {
              // a bigger cloud: four puffs on a flat foot
              const cd = Math.min(Math.hypot(x - cxo, y - 9.5), Math.hypot(x - cxo - 3.5, y - 7) * 1.05, Math.hypot(x - cxo - 7.5, y - 7.6), Math.hypot(x - cxo - 10, y - 10));
              if ((cd < 3.2 && y < 12) || (y >= 10 && y < 12 && x > cxo && x < cxo + 10)) col = y > 10.8 ? cloudS : cloudC;
            }
            out[n] = col;
          }
          // the moon comes up when the sun goes down
          if (night > 0.2) for (let b = -3; b <= 3; b++) for (let a = -3; a <= 3; a++) { const x = 40 + a, y = 7 + b, d1 = a * a + b * b, d2 = (a + 1.6) ** 2 + (b - 0.8) ** 2; if (d1 <= 10 && d2 > 6.5) out[y * G + x] = word('#f3e7bd'); }
          // birds by day: a flap is a V, a glide a flat line
          if (night < 0.5) for (const [b0, by, sp] of birds) {
            const bx = Math.round(((b0 + t * sp) % 60) - 6), up = Math.floor(t * 4 + b0) % 2, j = Math.round(by);
            for (const [a, b] of up ? [[-3, -2], [-2, -1], [-1, 0], [0, 0], [1, -1], [2, -2]] : [[-3, 0], [-2, -1], [-1, 0], [0, 0], [1, -1], [2, 0]]) { const ii = bx + a, jj = j + b; if (ii >= 0 && ii < G && jj >= 0 && jj < HZ) out[jj * G + ii] = BIRD; }
          }
          // the face: Primer's own glyphs, wide awake at noon, sleepy at dusk, asleep under the sea
          if (sy0 - sunR < HZ) {
            reset('#0a0000');
            const ph = (blinkOff + t) % blinkGap, open = ph < 0.16 ? 0 : 1;
            const ra = t - reactAt, rk = react && ra < 2.6 ? Math.min(1, ra / 0.08) * Math.min(1, (2.6 - ra) / 0.3) : 0;
            const want = c.input.inside ? Math.max(-1, Math.min(1, (c.input.x - sunX / G) * 3)) : 0;
            sunLook += (want - sunLook) * 0.12;
            const zoom = sunR / G / 0.25, keepEyes = eyes, keepMouth = mouth;
            if (hgt > 2.2) { eyes = 'Wide'; mouth = 'Grin'; } else if (hgt < 1.25) { eyes = 'Crescents'; mouth = 'Shy'; }
            keep(); shift(sunX / G, sy0 / G); stretch(zoom / sx, zoom / sy); sitter = 1; face(t, open, sunLook, react, rk); back();
            eyes = keepEyes; mouth = keepMouth;
            for (let n = 0; n < HZ * G; n++) if (mine[n]) out[n] = words[grid[n]];
            for (const s of [-1, 1]) { const ci = Math.round(sunX + s * 5.6 - 1), cj = Math.round(sy0 + 2.2); for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const ii = ci + a, jj = cj + b; if (ii >= 0 && ii < G && jj >= 0 && jj < HZ && !mine[jj * G + ii]) out[jj * G + ii] = CHEEK; } }
          }
          return out;
        },
      };
    })();

    // ---------- the viewer ----------
    // A tap on the poster passes the three primaries round (head, body, hat) and plays a triad:
    // red the root, yellow the third, blue the fifth, ink the octave. A tap on the face makes it
    // react, each reaction with its own little figure in the same key. The key comes from an LCG
    // over the hash's last word, separate from the poster's own streams.
    let kq = parseInt(c.hash.slice(58, 66), 16) >>> 0;
    const kr = () => { kq = (Math.imul(kq, 1103515245) + 12345) >>> 0; return (kq >>> 9) / 8388608; };
    const tonic = 55 + Math.floor(kr() * 8), third = kr() < 0.62 ? 4 : 3;
    const voice = { [RED]: 0, [YEL]: third, [BLU]: 7, [INK]: 12 };
    const REACTS = ['Delight', 'Surprise', 'Wink', 'Shy'];
    let reactN = reactOrder;
    const turn = (u, t) => {
      [headC, bodyC, hatC] = [hatC, headC, bodyC];
      if (hat === 'None' && bg !== GLD) backC = hatC === bg ? notAny(bg, headC, bodyC) : hatC;
      if (splitC === headC || splitC === bodyC) splitC = [RED, YEL, BLU, INK, CRM].find(q => q !== headC && q !== bg && q !== bodyC);
      hopAt = t;
      [headC, bodyC, hatC].forEach((q, i) => c.sound.note(tonic + (voice[q] ?? 0) + (i === 1 ? -12 : 0), { dur: 0.5 + i * 0.15, vel: 0.2, wave: 'triangle', at: i * 0.07, pan: (u - 0.5) }));
    };
    const sing = (kind, u) => {
      const top = tonic + 12, pan = (u - 0.5) * 0.8;
      const seq = kind === 'Delight' ? [0, third, 7, 12] : kind === 'Surprise' ? [7, 14] : kind === 'Wink' ? [12, 7] : [third, 0];
      seq.forEach((n, i) => c.sound.note(top + n, { dur: kind === 'Shy' ? 0.5 : 0.24 + (i === seq.length - 1 ? 0.25 : 0), vel: kind === 'Shy' ? 0.11 : 0.17, wave: kind === 'Surprise' ? 'triangle' : 'sine', at: i * (kind === 'Delight' ? 0.075 : 0.13), pan, attack: kind === 'Shy' ? 0.04 : 0.008 }));
    };
    const onFace = (u, v) => {
      let px = u - cx, py = v - chinY;
      const cs = Math.cos(-tilt), sn = Math.sin(-tilt);
      [px, py] = [px * cs - py * sn, px * sn + py * cs];
      py += gBot * sy;
      return (px / ((gSide + 0.05) * sx)) ** 2 + (py / ((gBot - gTop) * 0.5 * sy + 0.05)) ** 2 < 1.15 || (py < gTop * sy && py > gTop * sy - 0.2 && Math.abs(px) < 0.2);
    };
    const tapAt = (u, v, t) => {
      if (balloon && Math.hypot(u - balloonAt[0], v - balloonAt[1]) < 0.09) {
        bobAt = t;
        c.sound.note(tonic + 19, { dur: 0.3, vel: 0.12, wave: 'sine', pan: (u - 0.5) * 0.8 });
        c.sound.note(tonic + 24, { dur: 0.6, vel: 0.11, wave: 'sine', at: 0.12, pan: (u - 0.5) * 0.8, attack: 0.03 });
        return;
      }
      if (LG) { LG.tap(u, v, t); return; }
      if (comp === 'Bird' && Math.hypot(u - birdX, v - (birdY - 0.05)) < 0.08) {
        birdAt = t;
        const n = tonic + 24 + [0, third, 7][Math.floor(t * 7) % 3];
        c.sound.note(n, { dur: 0.07, vel: 0.1, wave: 'sine', pan: side * 0.6 });
        c.sound.note(n + 5, { dur: 0.09, vel: 0.09, wave: 'sine', at: 0.08, pan: side * 0.6 });
        c.sound.note(n + 7, { dur: 0.12, vel: 0.08, wave: 'sine', at: 0.15, pan: side * 0.6 });
        return;
      }
      if (onFace(u, v)) {
        react = REACTS[reactN % 4]; reactN++; reactAt = t; sing(react, u);
        return;
      }
      turn(u, t);
    };

    c.trait('Ink', ink);
    c.trait('Field', field);
    c.trait('Backdrop', backdrop);
    c.trait('Head', head);
    c.trait('Hair', hair);
    c.trait('Hat', hat);
    c.trait('Eyes', eyes);
    c.trait('Brows', brows);
    c.trait('Nose', nose);
    c.trait('Mouth', mouth);
    c.trait('Eyewear', eyewear);
    c.trait('Face', facial);
    c.trait('Ears', legend === 'Sun' ? 'None' : ears);
    c.trait('Outfit', outfit);
    c.trait('Body', bodyKind);
    c.trait('Cut', cut);
    c.trait('Pose', pose);
    c.trait('Companion', comp);
    if (balloon) c.trait('Item', 'Balloon');
    if (legend !== 'None') c.trait('Legendary', legend);

    // the grid goes out through a 48 x 48 canvas, scaled up with smoothing off
    const small = Object.assign(document.createElement('canvas'), { width: G, height: G });
    const sg = small.getContext('2d'), sheet = sg.createImageData(G, G), sheet32 = new Uint32Array(sheet.data.buffer);
    const show = t => {
      sheet32.set(LG ? LG.frame(t) : finish()); sg.putImageData(sheet, 0, 0);
      x.setTransform(1, 0, 0, 1, 0, 0); x.imageSmoothingEnabled = false;
      x.drawImage(small, 0, 0, S, S);
    };
    if (!LG) draw(0);
    show(0);
    return (t) => {
      for (const tp of c.input.taps()) tapAt(tp.x, tp.y, t);
      if (!LG) draw(t);
      show(t);
    };
  },
});

})(window.Proto);
