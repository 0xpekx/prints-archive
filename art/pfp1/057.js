// Glyphs: from D:/code/synaesthesia/public/drop03/pieces/057.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Glyphs: faces set like type, in a bitmap font on a fixed 64-cell grid.
// Brackets make the head, punctuation makes the features, hair and brows. Every
// glyph is a one-cell skeleton laid down cell by cell (pixel-perfect lines and
// curves), then stamped with the weight's brush the way a pixel font gets its
// bold, in one of several type finishes (rounded, square, broad nib, inline,
// drop shadow, stencil). Italics shift whole rows, like a bitmap italic.
Proto.add({
  num: 57,
  name: 'Glyphs',
  fam: 'Minimal & Geometric',
  recipe: 'Faces built from bitmap-font glyphs on a 64-cell grid: brackets for the head, punctuation for eyes, brows, nose and mouth, a row of marks for hair or a hat, on a specimen-coloured sheet. The build of the head (classic, tall, wide or askew), brackets, eyes, mouth, accent, type finish, weight, setting, sheet and inks vary. Very rarely the face is set in gold leaf, cut from a ransom note or lit on a dot-matrix sign, or a big ivy-leaf fleuron is set under the chin.',
  interactive: 'Tap to type a new face. Drag up or down to change the weight.',
  music: true,
  seed: 10,
  make(c) {
    const S = c.size, g = c.ctx;

    // xoshiro128** seeded from four words of the hash
    const word = (i) => parseInt(c.hash.substr(2 + i * 8, 8), 16) >>> 0;
    let a = word(4) || 1, b = word(5) ^ word(0), d = word(6) ^ word(1), e = word(7) ^ word(2);
    const rotl = (v, n) => (v << n) | (v >>> (32 - n));  // xoshiro's rotate
    const rng = () => {
      const r = Math.imul(rotl(Math.imul(b, 5), 7), 9) >>> 0;
      const t = b << 9;
      d ^= a; e ^= b; b ^= d; a ^= e; d ^= t; e = rotl(e, 11);
      return r / 4294967296;
    };
    for (let burn = 10; burn > 0; burn--) rng();
    const take = (tbl) => {
      let n = 0; for (const k in tbl) n += tbl[k];
      let v = rng() * n;
      for (const k in tbl) { v -= tbl[k]; if (v < 0) return k; }
      return Object.keys(tbl)[0];
    };
    // a small fast counter generator (sfc32) over the other half of the hash, for the newer axes
    let q0 = word(3) ^ 0xa5a5a5a5, q1 = word(5), q2 = word(6) ^ word(7), q3 = 1;
    const sfc = () => {
      const t = (((q0 + q1) | 0) + q3) | 0;
      q3 = (q3 + 1) | 0; q0 = q1 ^ (q1 >>> 9); q1 = (q2 + (q2 << 3)) | 0; q2 = (q2 << 21) | (q2 >>> 11); q2 = (q2 + t) | 0;
      return ((t >>> 0) + 0.5) / 4294967296;
    };
    for (let warm = 12; warm > 0; warm--) sfc();
    const pickS = (tbl) => {
      let n = 0; for (const k in tbl) n += tbl[k];
      let v = sfc() * n;
      for (const k in tbl) { v -= tbl[k]; if (v < 0) return k; }
      return Object.keys(tbl)[0];
    };

    const sets = {
      Newsprint: ['#f2eee3', '#141414', '#e0352b'], Blueprint: ['#1c3f94', '#f4f1e8', '#ffcf3a'], Highlighter: ['#f7f04a', '#151515', '#ff3d8b'],
      Terminal: ['#0d1410', '#57f287', '#d9ffe6'], Risograph: ['#f6c9d6', '#2a3cc7', '#ff5c39'], Slate: ['#30343c', '#f1ede4', '#ff8a3d'],
      Gilt: ['#121212', '#d9b25a', '#f4e4b0'], Kraft: ['#c9a67a', '#2a1d14', '#f6efe2'], 'Mint Proof': ['#d9f2e3', '#0f3d2e', '#ff6b4a'],
      Cyanotype: ['#123d7a', '#e8f1ff', '#8fd3ff'], 'Red Proof': ['#f6efe4', '#d1281f', '#151515'], Neon: ['#0a0a12', '#ff5ad1', '#5affe1'],
    };
    let setName = take({ Newsprint: 22, Blueprint: 16, Highlighter: 14, Risograph: 14, Slate: 14, Terminal: 12, Gilt: 6 });
    let brackets = take({ Round: 28, Square: 22, Curly: 16, Angle: 14, Bars: 10, Double: 6, None: 4 });
    let eyes = take({ Dots: 22, Rings: 18, Carets: 14, Dashes: 12, Crosses: 10, Stars: 8, Wink: 10, Squint: 6 });
    let mouth = take({ Underscore: 20, Cup: 20, Tilde: 16, Oh: 12, Grin: 12, Vee: 10, Double: 6, Zed: 4 });
    let accent = take({ None: 32, Quotes: 16, Tildes: 14, Caret: 12, Apostrophe: 10, Asterisk: 8, Degree: 4 });
    const weight = take({ Book: 34, Bold: 40, Black: 18, Hairline: 8 });
    let sheet = take({ Plain: 50, Baseline: 26, 'Ghost Glyph': 16, Margins: 8 });
    const roundCaps = rng() < 0.6;
    let nose = rng() < 0.55 ? (rng() < 0.5 ? 'stop' : 'ell') : 'none';
    let lean = (rng() - 0.5) * 0.08;
    const blinkGap = 3 + rng() * 3, blinkPh = rng() * 3;
    const ghost = ['(', '{', '&', '?'][Math.floor(rng() * 4)];

    // the newer axes, from the sfc32 stream: more inks, brackets, eyes, mouths and hair, a type finish,
    // brows and cheeks, a setting, and the proportions of the face
    if (sfc() < 0.3) setName = pickS({ Kraft: 26, 'Mint Proof': 24, Cyanotype: 22, 'Red Proof': 22, Neon: 6 });
    if (sfc() < 0.25) brackets = pickS({ Guillemets: 50, Slashes: 50 });
    if (sfc() < 0.3) eyes = pickS({ Zeros: 30, Equals: 28, Hearts: 26, Ats: 16 });
    if (sfc() < 0.3) mouth = pickS({ Smirk: 30, Tongue: 24, Kiss: 24, Box: 22 });
    if (sfc() < 0.42) accent = pickS({ Spikes: 22, Fringe: 20, Curls: 20, Bun: 16, Cap: 14, Crown: 8 });
    let style = roundCaps ? 'Rounded' : 'Square';
    if (sfc() < 0.45) style = pickS({ 'Broad Nib': 30, Inline: 26, Shadow: 26, Stencil: 18 });
    if (sfc() < 0.3) sheet = pickS({ Grid: 50, 'Crop Marks': 50 });
    const setting = pickS({ Roman: 72, Italic: 26, Sideways: 2 });
    const brows = pickS({ None: 44, Macrons: 18, Ticks: 16, Tildes: 12, Slants: 10 });
    const cheeks = pickS({ None: 64, Blush: 18, Asterisks: 10, Commas: 8 });
    if (sfc() < 0.3) nose = pickS({ vee: 40, angle: 35, pipe: 25 });
    const fw = (sfc() - 0.5) * 0.08, ft = (sfc() - 0.5) * 0.07, fb = (sfc() - 0.5) * 0.05;
    const side = sfc() < 0.5 ? -1 : 1, nibA = -0.6 - sfc() * 0.4;
    if (setting === 'Italic') lean = 0.13 + Math.abs(lean);

    // the legendaries and the fleuron roll from their own Lehmer (Park-Miller) stream over two other words
    let lm = ((word(2) ^ Math.imul(word(6), 0x9e3779b1)) >>> 0) % 2147483646 + 1;
    const lehmer = () => { lm = Number((BigInt(lm) * 48271n) % 2147483647n); return (lm - 1) / 2147483646; };
    for (let i = 0; i < 8; i++) lehmer();
    const legRoll = lehmer(), itemRoll = lehmer();
    const legend = legRoll < 0.0008 ? 'Gold Leaf' : legRoll < 0.0017 ? 'Ransom Note' : legRoll < 0.0025 ? 'Dot Matrix' : 'None';
    const fleuron = itemRoll < 0.005;
    const chipSeed = Math.floor(lehmer() * 1e6);
    // the 4,000-mint axes, from the same Lehmer stream after the rare rolls: glasses and a chin set in glyphs
    const glV = lehmer(), chV = lehmer();
    const glasses = glV < 0.5 ? 'None' : glV < 0.68 ? 'Specs' : glV < 0.82 ? 'Square Specs' : glV < 0.94 ? 'Monocle' : 'Pince-nez';
    const chin = chV < 0.4 ? 'None' : chV < 0.52 ? 'Underscores' : chV < 0.66 ? 'Stubble' : chV < 0.78 ? 'Vees' : chV < 0.9 ? 'Goatee' : 'Tilde';
    // the build: the head's outline itself (tall and narrow, wide and squat, or tipped with one bracket set higher)
    const buV = lehmer();
    const build = buV < 0.3 ? 'Classic' : buV < 0.56 ? 'Tall' : buV < 0.82 ? 'Wide' : 'Askew';

    c.trait('Inks', setName);
    c.trait('Brackets', brackets);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('Accent', accent);
    c.trait('Finish', style);
    c.trait('Weight', weight);
    c.trait('Setting', setting);
    c.trait('Sheet', sheet);
    c.trait('Nose', { none: 'None', stop: 'Stop', ell: 'Ell', vee: 'Vee', angle: 'Angle', pipe: 'Pipe' }[nose]);
    c.trait('Brows', brows);
    c.trait('Cheeks', cheeks);
    c.trait('Glasses', glasses);
    c.trait('Chin', chin);
    c.trait('Build', build);
    if (legend !== 'None') c.trait('Legendary', legend);  // the rarest sets name themselves
    if (fleuron) c.trait('Rare Item', 'Fleuron');

    // ---------- palette ----------
    const rgb = (h) => [0, 2, 4].map(o => parseInt(h.slice(1 + o, 3 + o), 16));
    const blend = (p, q, u) => p.map((v, i) => Math.round(v + (q[i] - v) * u));
    const [PAPERc, INKc, ACCc] = sets[setName].map(rgb);
    const CHIPS = [['#efe9dc', '#151515'], ['#151515', '#f4efe4'], ['#d7322a', '#fff6ea'], ['#f3d23c', '#151515'], ['#2f55c9', '#ffffff'], ['#f3a6c0', '#1d1d1d']];
    const pal = [PAPERc, blend(PAPERc, INKc, 0.14), blend(PAPERc, INKc, 0.32), INKc, ACCc, blend(PAPERc, ACCc, 0.2)];
    const P0 = 0, P1 = 1, P2 = 2, INK = 3, ACC = 4, ACC2 = 5;
    const CH0 = pal.length; for (const [bg, ink] of CHIPS) pal.push(rgb(bg), rgb(ink));
    const CHSH = pal.length; pal.push(blend(PAPERc, [0, 0, 0], 0.28));
    const FLH = pal.length; pal.push(blend(ACCc, [255, 255, 255], 0.6));
    const GOLD = pal.length; for (const h of ['#16110b', '#2c2316', '#6b4a16', '#b8862e', '#e6bd5a', '#fff2c4', '#b3261e']) pal.push(rgb(h));
    const LED = pal.length; for (const h of ['#120604', '#2b0d07', '#4a1709', '#ff6a1f', '#ffd36a', '#ff9b3d']) pal.push(rgb(h));
    // the colour each glyph's ink takes: the mouth goes in the accent ink unless that would vanish
    const MOUTH = ACCc.join() === PAPERc.join() || setName === 'Terminal' || setName === 'Gilt' || setName === 'Neon' ? INK : ACC;

    // ---------- the grid ----------
    const N = 64;
    const W0 = { Hairline: 1, Book: 2, Bold: 3, Black: 4 }[weight];
    let W = W0;
    // per build: bracket inset, top and bottom (as fractions of the grid), eye column, eye row, mouth row
    const GEO = { Classic: [0.2, 0.2, 0.82, 25, 28, 42], Tall: [0.235, 0.15, 0.9, 25, 26, 44], Wide: [0.14, 0.27, 0.77, 22, 30, 41], Askew: [0.2, 0.2, 0.82, 25, 28, 42] }[build];
    let bxL = Math.round((GEO[0] + fw) * N), bxR = N - 1 - bxL;
    const tip = build === 'Askew' ? 4 * side : 0;   // an askew head sets one bracket higher than the other
    // (with the fleuron set under the chin, the head stops short of it)
    const y0 = Math.max(10, Math.round((GEO[1] + ft) * N)), y1 = Math.min(fleuron ? 52 - Math.abs(tip) : 58, Math.round((GEO[2] + fb) * N));
    let EL = GEO[3], ER = N - 1 - EL, armL = bxL + 2;   // (a wide head with chevron brackets may move its eyes in, below)
    const EY = GEO[4], MX = 31, MY = GEO[5], AY = y0 - 5, NY = EY + 5;

    // ---------- skeletons: one-cell lines and curves, laid cell by cell ----------
    const seg = (x0, y0_, x1, y1_, out) => {
      let x = x0, y = y0_; const dx = Math.abs(x1 - x0), dy = -Math.abs(y1_ - y0_), sx = x0 < x1 ? 1 : -1, sy = y0_ < y1_ ? 1 : -1;
      let err = dx + dy;
      for (;;) {
        const l = out[out.length - 1];
        if (!l || l[0] !== x || l[1] !== y) out.push([x, y]);
        if (x === x1 && y === y1_) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x += sx; }
        if (e2 <= dx) { err += dx; y += sy; }
      }
      return out;
    };
    // drop the corner cell of every L-shaped step so a one-cell line stays one cell thin
    const perfect = (cs) => {
      if (cs.length < 3) return cs;
      const out = [cs[0]];
      for (let i = 1; i < cs.length - 1; i++) {
        const p = out[out.length - 1], q = cs[i], r = cs[i + 1];
        if ((p[0] === q[0] || p[1] === q[1]) && (r[0] === q[0] || r[1] === q[1]) && p[0] !== r[0] && p[1] !== r[1]) continue;
        out.push(q);
      }
      out.push(cs[cs.length - 1]);
      return out;
    };
    const path = (pts) => { const out = []; for (let i = 1; i < pts.length; i++) seg(Math.round(pts[i - 1][0]), Math.round(pts[i - 1][1]), Math.round(pts[i][0]), Math.round(pts[i][1]), out); if (pts.length === 1) out.push([Math.round(pts[0][0]), Math.round(pts[0][1])]); return perfect(out); };
    const curve = (fn, n) => { const pts = []; for (let i = 0; i <= n; i++) pts.push(fn(i / n).map(Math.round)); return path(pts); };
    const ellipse = (cx, cy, rx, ry) => curve((u) => [cx + rx * Math.cos(u * Math.PI * 2), cy + ry * Math.sin(u * Math.PI * 2)], 48);
    const bez = (p0, p1, p2, p3) => curve((u) => { const v = 1 - u; return [0, 1].map(k => v * v * v * p0[k] + 3 * v * v * u * p1[k] + 3 * v * u * u * p2[k] + u * u * u * p3[k]); }, 60);
    const fromRows = (rows, cx, cy) => { const out = []; for (let r = 0; r < rows.length; r++) for (let i = 0; i < rows[r].length; i++) if (rows[r][i] === '#') out.push([cx + i - (rows[r].length >> 1), cy + r - (rows.length >> 1)]); return out; };
    const off = (cs, ox, oy, fx) => cs.map(([x, y]) => [ox + (fx ? -x : x), oy + y]);

    // hand-set round glyphs, one per weight, the way a bitmap font draws its o and 0
    const RING = [['.###.', '#...#', '#...#', '#...#', '.###.'], ['..###..', '.#####.', '##...##', '##...##', '##...##', '.#####.', '..###..'], ['..#####..', '.#######.', '###...###', '###...###', '###...###', '.#######.', '..#####..']];
    const ZERO = [['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], ['.#####.', '##...##', '##...##', '##...##', '##...##', '##...##', '##...##', '##...##', '.#####.'], ['.#######.', '###...###', '###...###', '###...###', '###...###', '###...###', '###...###', '###...###', '###...###', '###...###', '.#######.']];
    const OH = [['.#.', '#.#', '#.#', '#.#', '.#.'], ['.###.', '##.##', '##.##', '##.##', '.###.'], ['.#####.', '###.###', '###.###', '###.###', '###.###', '.#####.']];
    const AT = ['.#####.', '#.....#', '#.###.#', '#.#.#.#', '#.####.', '#......', '.#####.'];
    const HEART = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'];
    const HEART_L = ['.###.###.', '#########', '#########', '#########', '.#######.', '..#####..', '...###...', '....#....'];
    // a hedera (the printer's ivy leaf) with curled tendrils, set as a tailpiece: o marks its glint, v its vein
    const FL_LEAF = ['.###...###.', '#oo##.#####', '#o###v#####', '#####v#####', '.####v####.', '..###v###..', '...##v##...', '....###....', '.....#.....'];
    const FL_TEND = ['......', '.###..', '#...#.', '#.#.##', '#..#..', '.##...', '......', '......', '......'];
    const FLEURON = FL_LEAF.map((r, k) => FL_TEND[k] + r + FL_TEND[k].split('').reverse().join(''));
    const CURL = [['.###.', '#...#', '#.###', '#....', '.###.'], ['..###..', '.##.##.', '##...##', '#######', '##.....', '.##..##', '..####.']];

    const Y0 = y0, Y1 = y1;
    // ---------- the glyphs of one face, as strokes: { cells, col, w, grp } or { cells, col, fill, grp } ----------
    function bracketSk(kind, s, xb, w, dy) {
      const y0 = Y0 + dy, y1 = Y1 + dy, ym = (y0 + y1) / 2, h = y1 - y0, out = [];
      if (kind === 'Round') out.push(curve((u) => { const y = y0 + h * u, v = (y - ym) / (h / 2); return [xb + s * 4 * (1 - v * v), y]; }, h));
      else if (kind === 'Square') out.push(path([[xb - s * 4, y0], [xb, y0], [xb, y1], [xb - s * 4, y1]]));
      else if (kind === 'Curly') { const m = Math.round(ym); out.push(path([[xb - s * 3, y0], [xb - s, y0], [xb, y0 + 1], [xb, m - 2], [xb + s * 2, m], [xb, m + 2], [xb, y1 - 1], [xb - s, y1], [xb - s * 3, y1]])); }
      else if (kind === 'Angle') out.push(path([[xb - s, y0], [xb + s * 6, ym], [xb - s, y1]]));
      else if (kind === 'Bars') out.push(path([[xb, y0], [xb, y1]]));
      else if (kind === 'Double') { out.push(path([[xb, y0], [xb, y1]])); out.push(path([[xb + s * (w + 2), y0 + 2], [xb + s * (w + 2), y1 - 2]])); }
      else if (kind === 'Guillemets') for (const o of [0, w + 3]) out.push(path([[xb - s + s * o, y0 + h * 0.2], [xb + s * 5 + s * o, ym], [xb - s + s * o, y1 - h * 0.2]]));
      else if (kind === 'Slashes') out.push(path([[xb - s * 3, y0], [xb + s * 3, y1]]));
      return out;
    }
    function eyeSk(kind, cx, cy, eW, sd, shut) {
      const r = eW + 1, out = [];
      const st = (cells, w) => out.push({ cells, w: w || eW });
      if (shut || kind === 'Dashes') { st(path([[cx - r, cy], [cx + r, cy]])); return out; }
      if (kind === 'Dots') { const rd = [1.5, 2.3, 3.2][eW - 1], cs = []; for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= rd * rd) cs.push([cx + x, cy + y]); out.push({ cells: cs, fill: true }); }
      else if (kind === 'Rings') out.push({ cells: fromRows(RING[eW - 1], cx, cy), fill: true });
      else if (kind === 'Carets') st(path([[cx - r, cy + 1], [cx, cy + 1 - r], [cx + r, cy + 1]]));
      else if (kind === 'Crosses') { st(path([[cx - r + 1, cy - r + 1], [cx + r - 1, cy + r - 1]])); st(path([[cx + r - 1, cy - r + 1], [cx - r + 1, cy + r - 1]])); }
      else if (kind === 'Stars') { const w = Math.max(1, eW - 1); st(path([[cx, cy - r], [cx, cy + r]]), w); st(path([[cx - r + 1, cy - r + 1], [cx + r - 1, cy + r - 1]]), w); st(path([[cx + r - 1, cy - r + 1], [cx - r + 1, cy + r - 1]]), w); }
      else if (kind === 'Wink' && sd < 0) return eyeSk('Dots', cx, cy, eW, sd, false);
      else if (kind === 'Wink' || kind === 'Squint') { const dir = kind === 'Wink' ? 1 : -sd; st(path([[cx - dir * (r - 1), cy - (r - 1)], [cx + dir * (r - 1), cy], [cx - dir * (r - 1), cy + (r - 1)]])); }
      else if (kind === 'Zeros') out.push({ cells: fromRows(ZERO[eW - 1], cx, cy), fill: true });
      else if (kind === 'Equals') { const lo = -Math.floor((eW - 1) / 2), hi = Math.ceil((eW - 1) / 2); st(path([[cx - r, cy - 1 - hi], [cx + r, cy - 1 - hi]])); st(path([[cx - r, cy + 1 - lo], [cx + r, cy + 1 - lo]])); }
      else if (kind === 'Hearts') out.push({ cells: fromRows(eW >= 3 ? HEART_L : HEART, cx, cy), fill: true, col: ACC });
      else if (kind === 'Ats') st(fromRows(AT, cx, cy), 1);
      return out;
    }
    function mouthSk(kind, t, eW) {
      const out = [], st = (cells) => out.push({ cells });
      const x = MX, y = MY;
      if (kind === 'Underscore') st(path([[x - 5, y], [x + 5, y]]));
      else if (kind === 'Cup') st(curve((u) => { const xx = -5 + 10 * u; return [x + xx, y - 2 + 4 * (1 - (xx / 5) ** 2)]; }, 20));
      else if (kind === 'Tilde') { const ph = Math.floor(t * 0.7) % 2; st(curve((u) => { const xx = -5 + 10 * u; return [x + xx, y + 1.6 * Math.sin((xx + ph) * Math.PI / 5)]; }, 20)); }
      else if (kind === 'Oh') out.push({ cells: fromRows(OH[eW - 1], x, y), fill: true });
      else if (kind === 'Grin') { st(path([[x - 5, y - 1], [x + 5, y - 1]])); st(curve((u) => { const xx = -5 + 10 * u; return [x + xx, y - 1 + 4 * (1 - (xx / 5) ** 2)]; }, 20)); }
      else if (kind === 'Vee') st(path([[x - 4, y - 2], [x, y + 2], [x + 4, y - 2]]));
      else if (kind === 'Double') { st(path([[x - 5, y - 2], [x + 5, y - 2]])); st(path([[x - 3, y + 2], [x + 3, y + 2]])); }
      else if (kind === 'Zed') st(path([[x - 4, y - 2], [x + 4, y - 2], [x - 4, y + 2], [x + 4, y + 2]]));
      else if (kind === 'Smirk') st(curve((u) => [x - side * 5 + side * 10 * u, y + 2 * 2 * u * (1 - u) * 1.2 - 3 * u * u], 20));
      else if (kind === 'Box') st(path([[x - 3, y - 3], [x + 3, y - 3], [x + 3, y + 3], [x - 3, y + 3], [x - 3, y - 3]]));
      else if (kind === 'Tongue') { st(path([[x - 5, y], [x + 5, y]])); const tx = x + side * 2; st(path([[tx - 2, y], [tx - 2, y + 2], [tx - 1, y + 3], [tx + 1, y + 3], [tx + 2, y + 2], [tx + 2, y]])); }
      else if (kind === 'Kiss') st(path([[x - 2, y - 3], [x + 1, y - 3], [x + 2, y - 2], [x, y], [x + 2, y + 2], [x + 1, y + 3], [x - 2, y + 3]]));
      return out;
    }
    function accentSk(kind, t, eW) {
      const out = [], st = (cells, w) => out.push({ cells, w });
      const y = AY;
      if (kind === 'Quotes') for (const s of [-1, 1]) { const x = MX + s * 3 + (s > 0 ? 1 : 0); st(path([[x, y - 2], [x, y], [x - 1, y + 2]])); }
      else if (kind === 'Tildes') for (let k = -1; k <= 1; k++) { const x0 = MX + k * 9; st(curve((u) => [x0 - 3 + 6 * u, y + 1.4 * Math.sin(u * Math.PI * 2)], 12)); }
      else if (kind === 'Caret') st(path([[MX - 5, y + 3], [MX, y - 2], [MX + 5, y + 3]]));
      else if (kind === 'Apostrophe') { const sw = Math.floor(t * 0.8) % 2; st(path([[MX + sw, y - 3], [MX + sw, y], [MX - 1 + sw, y + 2]])); }
      else if (kind === 'Asterisk') { if (Math.floor(t * 0.5) % 2) { st(path([[MX, y - 3], [MX, y + 3]])); st(path([[MX - 3, y], [MX + 3, y]])); } else { st(path([[MX - 2, y - 2], [MX + 2, y + 2]])); st(path([[MX + 2, y - 2], [MX - 2, y + 2]])); st(path([[MX, y - 3], [MX, y + 3]])); } }
      else if (kind === 'Degree') st(ellipse(MX, y - 1 + (Math.sin(t * 1.1) > 0 ? 0 : 1), 2, 2));
      else if (kind === 'Spikes') for (let k = 0; k < 4; k++) { const cx = MX + Math.round((k - 1.5) * 6), hop = Math.sin(t * 1.4 + k) > 0.7 ? 1 : 0; st(path([[cx - 2, y + 2 - hop], [cx, y - hop], [cx + 2, y + 2 - hop]])); }
      else if (kind === 'Fringe') for (let k = 0; k < 5; k++) { const cx = MX + (k - 2) * 5; st(path([[cx + side, y - 2], [cx - side, y + 2]])); }
      else if (kind === 'Curls') for (let k = 0; k < 3; k++) out.push({ cells: fromRows(CURL[eW >= 2 ? 1 : 0], MX + (k - 1) * 9, y), fill: true });
      else if (kind === 'Bun') st(fromRows(AT, MX, y - 1), 1);
      else if (kind === 'Cap') {
        const l = bxL + 5, r = bxR - 5, by = y0 - 2;
        st(curve((u) => [l + (r - l) * u, by - 8 * Math.sin(u * Math.PI) ** 0.6], 30));
        st(path([[l, by], [r, by]]));
        st(side > 0 ? path([[r, by], [r + 8, by + 1]]) : path([[l, by], [l - 8, by + 1]]));
      }
      else if (kind === 'Crown') {
        st(path([[MX - 6, y + 2], [MX - 6, y - 2], [MX - 3, y + 1], [MX, y - 3], [MX + 3, y + 1], [MX + 6, y - 2], [MX + 6, y + 2], [MX - 6, y + 2]]));
        out.push({ cells: [[MX - 6, y - 4], [MX, y - 5], [MX + 6, y - 4]], fill: true });
      }
      return out;
    }
    function faceStrokes(t, eyeNow, mouthNow, shut, lift, Wb) {
      const eW = Wb <= 1 ? 1 : Wb >= 4 ? 3 : 2;
      const list = [];
      const push = (grp, items, col, w) => {
        for (const it0 of items) { const it = Array.isArray(it0) ? { cells: it0 } : it0; list.push({ grp, cells: it.cells, col: it.col !== undefined ? it.col : col, w: it.fill ? 0 : (it.w || w), fill: !!it.fill }); }
      };
      if (brackets !== 'None') { push(0, bracketSk(brackets, -1, bxL, Wb, -tip), INK, Wb); push(1, bracketSk(brackets, 1, bxR, Wb, tip), INK, Wb); }
      push(2, eyeSk(eyeNow, EL, EY, eW, -1, shut), INK, eW);
      push(3, eyeSk(eyeNow, ER, EY, eW, 1, shut), INK, eW);
      if (brows !== 'None') for (const [sd, cx, grp] of [[-1, EL, 4], [1, ER, 5]]) {
        const by = EY - 6 - lift - (eW >= 3 ? 1 : 0), bw = Math.max(1, eW - 1), wd = eW >= 2 ? 3 : 2;
        let cs;
        if (brows === 'Macrons') cs = path([[cx - wd, by], [cx + wd, by]]);
        else if (brows === 'Ticks') cs = path([[cx - sd * 2, by + 1], [cx + sd * 2, by - 1]]);
        else if (brows === 'Tildes') cs = path([[cx - 3, by + 1], [cx - 2, by], [cx - 1, by], [cx, by + 1], [cx + 1, by + 1], [cx + 2, by], [cx + 3, by]]);
        else cs = path([[cx - sd * 2, by - 1], [cx + sd * 2, by + 1]]);
        push(grp, [cs], INK, bw);
      }
      if (nose === 'stop') push(6, [{ cells: [[MX, NY], [MX + 1, NY], [MX, NY + 1], [MX + 1, NY + 1]], fill: true }], INK);
      else if (nose === 'ell') push(6, [path([[MX + 1, NY - 3], [MX, NY + 2], [MX + 2, NY + 2]])], INK, Math.max(1, eW - 1));
      else if (nose === 'vee') push(6, [path([[MX - 2, NY - 2], [MX, NY], [MX + 2, NY - 2]])], INK, Math.max(1, eW - 1));
      else if (nose === 'angle') push(6, [path([[MX + side, NY - 3], [MX - side, NY - 1], [MX + side, NY + 1]])], INK, Math.max(1, eW - 1));
      else if (nose === 'pipe') push(6, [path([[MX, NY - 3], [MX, NY + 2]])], INK, Math.max(1, eW - 1));
      if (cheeks !== 'None') for (const [s, grp] of [[-1, 7], [1, 8]]) {
        const cx = Math.round(31.5 + s * (31.5 - bxL) * 0.62), cy = EY + 7;
        if (cheeks === 'Blush') push(grp, [-1, 0, 1].map(k => path([[cx + k * 2 + 1, cy - 1], [cx + k * 2 - 1, cy + 1]])), ACC, 1);
        else if (cheeks === 'Asterisks') push(grp, [{ cells: fromRows(['..#..', '#.#.#', '.###.', '#.#.#', '..#..'], cx, cy), fill: true }], ACC);
        else push(grp, [{ cells: [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx + 1, cy + 1], [cx + 1, cy + 2], [cx, cy + 3]], fill: true }], INK);
      }
      push(9, mouthSk(mouthNow, t, eW), MOUTH, eW);
      if (accent !== 'None') push(10, accentSk(accent, t, eW), ACC, eW);
      // glasses: one-cell frames drawn round the eye glyphs, with a bridge and arms out to the brackets
      if (glasses !== 'None') {
        const g1 = [], fw2 = glasses === 'Square Specs' ? 5 : 6, fh = 5;
        const arms = () => { const a = Math.min(armL, EL - fw2); g1.push(path([[EL - fw2, EY - 1], [a, EY - 2]])); g1.push(path([[ER + fw2, EY - 1], [N - 1 - a, EY - 2]])); };
        if (glasses === 'Specs') { g1.push(ellipse(EL, EY, fw2, fh), ellipse(ER, EY, fw2, fh), path([[EL + fw2, EY - 1], [ER - fw2, EY - 1]])); arms(); }
        else if (glasses === 'Square Specs') {
          for (const cx of [EL, ER]) g1.push(path([[cx - fw2 + 1, EY - fh], [cx + fw2 - 1, EY - fh], [cx + fw2, EY - fh + 1], [cx + fw2, EY + fh - 1], [cx + fw2 - 1, EY + fh], [cx - fw2 + 1, EY + fh], [cx - fw2, EY + fh - 1], [cx - fw2, EY - fh + 1], [cx - fw2 + 1, EY - fh]]));
          g1.push(path([[EL + fw2, EY - 2], [ER - fw2, EY - 2]])); arms();
        } else if (glasses === 'Monocle') {
          g1.push(ellipse(ER, EY, fw2, fh));
          push(11, [{ cells: path([[ER + 4, EY + 4], [ER + 7, EY + 14]]).filter((cc, k) => k % 2 === 0), fill: true, col: ACC }], ACC);
        } else { g1.push(ellipse(EL, EY, fw2 - 1, fh - 1), ellipse(ER, EY, fw2 - 1, fh - 1), path([[EL + fw2 - 1, EY - 1], [31, EY - 3], [32, EY - 3], [ER - fw2 + 1, EY - 1]])); }
        push(11, g1, INK, Math.max(1, eW - 1));
      }
      // a chin set under the mouth
      if (chin !== 'None') {
        const cy = MY + 6, cw = Math.max(1, eW - 1);
        if (chin === 'Underscores') push(12, [-4, 0, 4].map(k => path([[MX + k - 1, cy], [MX + k + 1, cy]])), INK, cw);
        else if (chin === 'Stubble') push(12, [{ cells: [-5, -2, 1, 4].flatMap(k => [[MX + k, cy], [MX + k, cy + 1], [MX + k - 1, cy + 2]]), fill: true }], INK);
        else if (chin === 'Vees') push(12, [-4, 0, 4].map(k => path([[MX + k - 1, cy - 1], [MX + k, cy], [MX + k + 1, cy - 1]])), INK, cw);
        else if (chin === 'Goatee') push(12, [{ cells: fromRows(['.#.#.', '#####', '.#.#.', '#####', '.#.#.'], MX, cy + 1), fill: true }], INK);
        else push(12, [curve((u) => [MX - 6 + 12 * u, cy + 1.3 * Math.sin(u * Math.PI * 2)], 16)], INK, cw);
      }
      return list;
    }

    // ---------- brushes: how each weight and finish stamps a skeleton cell ----------
    const brushCache = {};
    const brushFor = (w, fin) => {
      const key = w + fin;
      if (brushCache[key]) return brushCache[key];
      const lo = -Math.floor((w - 1) / 2), hi = Math.ceil((w - 1) / 2), out = [];
      if (fin === 'Broad Nib') { const sx = Math.cos(nibA) > 0 ? 1 : -1, sy = Math.sin(nibA) > 0 ? 1 : -1; for (let k = lo; k <= hi + 1; k++) out.push([k * sx, k * sy]); }
      else for (let y = lo; y <= hi; y++) for (let x = lo; x <= hi; x++) {
        if (fin === 'Rounded' && w >= 3 && (x === lo || x === hi) && (y === lo || y === hi)) continue;
        out.push([x, y]);
      }
      return (brushCache[key] = out);
    };

    // ---------- the viewer types faces and sets the weight ----------
    const faces = [['Rings', 'Oh'], ['Carets', 'Cup'], ['Wink', 'Grin'], ['Crosses', 'Zed'], ['Stars', 'Tilde'], ['Squint', 'Vee'], ['Dots', 'Double'], ['Hearts', 'Kiss'], ['Zeros', 'Box'], ['Equals', 'Smirk']].filter(f => f[0] !== eyes || f[1] !== mouth);
    // a wide head with chevron brackets: at the mint's own weight and finish, keep three clear cells between each bracket's
    // inner tip and the eyes, brows and glasses (any face the viewer types, blinking too), moving the eyes in as far as needed
    if (build === 'Wide' && (brackets === 'Guillemets' || brackets === 'Angle')) {
      const Wb0 = style === 'Inline' ? Math.max(W0, 3) : W0, fin0 = legend === 'Ransom Note' ? 'Square' : style, sh0 = style === 'Shadow' ? (W0 >= 3 ? 2 : 1) : 0;
      const eW0 = Wb0 <= 1 ? 1 : Wb0 >= 4 ? 3 : 2;
      const reach = (list, grps) => { let lo = 99, hi = -99; for (const s of list) if (grps.includes(s.grp)) { const br = s.fill ? [[0, 0]] : brushFor(s.w, fin0); for (const [x] of s.cells) for (const [bx] of br) { lo = Math.min(lo, x + bx); hi = Math.max(hi, x + bx + sh0); } } return [lo, hi]; };
      const kinds = [...new Set([eyes, ...faces.map(f => f[0])])], armPad = -Math.min(0, ...brushFor(Math.max(1, eW0 - 1), fin0).map(b => b[0]));
      // try the brackets from the old inset out to none: the first that keeps the outer chevron on the sheet with the eyes no
      // closer than a classic head's wins; failing that, the deepest inset that fits at all; failing that, no inset
      const base = bxL, fits = [];
      for (let ins = 0; ins <= 3; ins++) {
        bxL = base + ins; bxR = N - 1 - bxL; EL = GEO[3]; ER = N - 1 - EL;
        const [outer, hi] = reach(faceStrokes(0, eyes, mouth, false, 0, Wb0), [0]), inner = Math.max(hi, bxL + 1);
        armL = inner + 4 + armPad;
        let ok = false;
        for (let k = 0; k <= 4 && EL <= 25; k++) {
          let out = 99;
          for (const ek of kinds) for (const sh of [false, true]) out = Math.min(out, reach(faceStrokes(0, ek, mouth, sh, 0, Wb0), [2, 4, 11])[0]);
          if (out - inner - 1 >= 3) { ok = true; break; }
          EL++; ER--;
        }
        if (ok) fits.push([ins, outer >= 0, EL, armL]);
      }
      const pick = fits.find(f => f[1]) || fits[fits.length - 1];
      if (pick) { bxL = base + pick[0]; EL = pick[2]; armL = pick[3]; }
      else { bxL = base; EL = 25; armL = bxL + 1 + 4 + armPad; }
      bxR = N - 1 - bxL; ER = N - 1 - EL;
    }
    // a small LCG over the hash's fourth word (the face's own xoshiro stream is untouched) picks the order and key
    let lq = parseInt(c.hash.slice(26, 34), 16) >>> 0;
    const lr = () => { lq = (Math.imul(lq, 69069) + 1) >>> 0; return lq / 4294967296; };
    for (let i = faces.length - 1; i > 0; i--) { const j = Math.floor(lr() * (i + 1)); [faces[i], faces[j]] = [faces[j], faces[i]]; }
    const keyRoot = 64 + Math.floor(lr() * 6), steps = [0, 2, 4, 5, 7, 9, 11];
    let typed = -1, typedAt = -9, rang = true, leanNow = 0, prevT = 0, wasDown = false, dragged = 0, lastStep = -1, py = 0, stepAt = 0;
    let glintAt = -9, shuffle = 0, scrollAt = -9, spinAt = -9;
    const flX = 31, flY = 58;   // set under the face, like a printer's tailpiece
    const live = (t) => {
      const inp = c.input, dt = Math.max(0, Math.min(t - prevT, 0.1)); prevT = t;
      const pressing = inp.inside && inp.down;
      if (pressing && !wasDown) { dragged = 0; py = inp.y; }
      if (pressing) { dragged += Math.abs(inp.y - py); py = inp.y; }
      for (const clack of inp.taps()) {
        if (dragged > 0.03) continue;
        const pan = (clack.x - 0.5) * 0.6;
        if (fleuron && Math.abs(clack.x * N - flX - 0.5) < 13 && Math.abs(clack.y * N - flY) < 7) {
          spinAt = t;
          [0, 4, 7, 11, 14].forEach((s, i) => c.sound.note(keyRoot + 12 + s, { dur: 0.35, vel: 0.08, wave: 'triangle', cutoff: 3000, at: i * 0.06, pan }));
          continue;
        }
        typed = (typed + 1) % faces.length; typedAt = t; rang = false;
        c.sound.hit('click', 0.3);
        c.sound.note(keyRoot + steps[typed % steps.length], { dur: 0.12, vel: 0.16, wave: 'triangle', cutoff: 2600, pan });
        if (legend === 'Gold Leaf') { glintAt = t; c.sound.note(keyRoot + 24, { dur: 1.2, vel: 0.07, wave: 'sine', at: 0.12 }); c.sound.note(keyRoot + 28, { dur: 1.0, vel: 0.05, wave: 'sine', at: 0.2 }); }
        else if (legend === 'Ransom Note') { shuffle++; c.sound.hit('noise', 0.05); c.sound.note(keyRoot + 7 + steps[shuffle % 7], { dur: 0.1, vel: 0.08, wave: 'square', cutoff: 1200, at: 0.08, pan }); }
        else if (legend === 'Dot Matrix') { scrollAt = t; for (let i = 0; i < 8; i++) c.sound.note(keyRoot + 12 + steps[(i * 2) % 7], { dur: 0.05, vel: 0.05, wave: 'square', cutoff: 1800, at: i * 0.15 }); }
      }
      if (!rang && t - typedAt > 2.4) { rang = true; c.sound.note(keyRoot + 24, { dur: 0.9, vel: 0.12, wave: 'sine' }); c.sound.note(keyRoot + 31, { dur: 0.6, vel: 0.05, wave: 'sine' }); }
      // dragging steps the weight from hairline (bottom) to ultra (top), a cell at a time; letting go steps it back
      const goalW = pressing && dragged > 0.03 ? Math.max(1, Math.min(5, 1 + Math.floor((1 - inp.y) * 5))) : W0;
      if (W !== goalW && t - stepAt > (pressing ? 0.05 : 0.14)) { W += Math.sign(goalW - W); stepAt = t; }
      if (pressing && dragged > 0.03) {
        if (W !== lastStep) { if (lastStep >= 0) c.sound.note(keyRoot - 12 + steps[(W - 1) * 2 % steps.length], { dur: 0.1, vel: 0.1, wave: 'triangle', cutoff: 1800 }); lastStep = W; }
      } else lastStep = -1;
      const goal = inp.inside ? Math.max(-0.12, Math.min(0.12, (inp.x - 0.5) * 0.22)) : 0;
      if (goal || leanNow) { leanNow += (goal - leanNow) * Math.min(1, dt * 4); if (!goal && Math.abs(leanNow) < 1e-4) leanNow = 0; }
      wasDown = pressing;
    };

    // ---------- the sheet behind the face ----------
    const BG = new Uint8Array(N * N);
    {
      BG.fill(P0);
      const put = (x, y, v) => { if (x >= 0 && x < N && y >= 0 && y < N) BG[y * N + x] = v; };
      const stamp = (cells, w, v) => { const lo = -Math.floor((w - 1) / 2), hi = Math.ceil((w - 1) / 2); for (const [x, y] of cells) for (let b2 = lo; b2 <= hi; b2++) for (let a2 = lo; a2 <= hi; a2++) put(x + a2, y + b2, v); };
      if (sheet === 'Baseline') { for (let y = 2; y < N; y += 5) for (let x = 0; x < N; x++) put(x, y, P1); for (let x = 0; x < N; x++) put(x, 43, P2); }
      else if (sheet === 'Margins') for (let k = 0; k < N; k++) { put(5, k, P2); put(58, k, P2); put(k, 5, P2); put(k, 58, P2); }
      else if (sheet === 'Ghost Glyph') {
        if (ghost === '(') stamp(curve((u) => { const y = -3 + 70 * u, v = (y - 32) / 35; return [59 - 15 * (1 - v * v), y]; }, 70), 7, ACC2);
        else if (ghost === '{') { const P = [[62, 1], [57, 1], [55, 4], [55, 27], [53, 30], [48, 32], [53, 34], [55, 37], [55, 60], [57, 63], [62, 63]]; stamp(path(P), 6, ACC2); }
        else if (ghost === '&') stamp(bez([61, 61], [32, 26], [26, 3], [40, 3]).concat(bez([40, 3], [54, 3], [51, 22], [32, 35])).concat(bez([32, 35], [13, 48], [22, 67], [42, 59])).concat(path([[42, 59], [61, 38]])), 6, ACC2);
        else { stamp(bez([16, 16], [16, -3], [54, -3], [51, 16]).concat(bez([51, 16], [49, 29], [32, 29], [32, 45])), 6, ACC2); for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= 10) put(32 + x, 56 + y, ACC2); }
      } else if (sheet === 'Grid') {
        for (let y = 0; y < N; y += 4) for (let x = 0; x < N; x += 4) put(x, y, P2);
        const l = bxL - 6, r = bxR + 6, tp = y0 - 9, bt = y1 + 5;
        for (let x = l; x <= r; x += 2) { put(x, tp, ACC2); put(x, bt, ACC2); }
        for (let y = tp; y <= bt; y += 2) { put(l, y, ACC2); put(r, y, ACC2); }
      } else if (sheet === 'Crop Marks') {
        for (const [cx, cy, sx, sy] of [[4, 4, 1, 1], [59, 4, -1, 1], [4, 59, 1, -1], [59, 59, -1, -1]]) { for (let k = -3; k <= 2; k++) { put(cx + sx * k, cy, P2); put(cx, cy + sy * k, P2); } }
        if (!fleuron) {
          for (const [x, y] of ellipse(31, 60, 2, 2)) put(x, y, P2);
          for (let k = -3; k <= 3; k++) { put(31 + k, 60, P2); put(31, 60 + k, P2); }
        }
      }
    }

    // ---------- drawing ----------
    const F = new Int16Array(N * N), G = new Uint8Array(N * N), grpOf = new Int8Array(N * N);
    const cv = document.createElement('canvas'); cv.height = cv.width = N;
    const cellCtx = cv.getContext('2d'), img = cellCtx.createImageData(N, N), px = img.data;
    let grille = null;
    if (legend === 'Dot Matrix') {
      grille = document.createElement('canvas'); grille.width = grille.height = S;
      const gc = grille.getContext('2d');
      gc.fillStyle = '#050202'; gc.fillRect(0, 0, S, S);
      gc.globalCompositeOperation = 'destination-out';
      const cs = S / N;
      gc.beginPath();
      for (let j = 0; j < N; j++) for (let i = N - 1; i >= 0; i--) { gc.moveTo((i + 0.5) * cs + cs * 0.4, (j + 0.5) * cs); gc.arc((i + 0.5) * cs, (j + 0.5) * cs, cs * 0.4, 0, Math.PI * 2); }
      gc.fill();
    }
    let lastKey = '';

    function set(t) {
      const inp = c.input;
      const bt = (t + blinkPh) % blinkGap, shut0 = bt < 0.14;
      const mood = typed >= 0 && t - typedAt < 2.4 ? faces[typed] : null;
      const eyeNow = mood ? mood[0] : eyes, mouthNow = mood ? mood[1] : mouth;
      const shut = shut0 && !mood && eyeNow !== 'Hearts';
      const L = legend === 'Ransom Note' ? 0 : lean + leanNow;   // pasted scraps stay square
      const shear = [];
      for (let j = 0; j < N; j++) shear.push(Math.round((31.5 - j) * L));
      const anim = [Math.floor(t * 0.7) % 2, Math.floor(t * 0.8) % 2, Math.floor(t * 0.5) % 2, Math.sin(t * 1.1) > 0 ? 1 : 0, Math.floor(t * 1.4)].join('');
      const ptr = inp.inside ? Math.floor(inp.x * N) + ',' + Math.floor(inp.y * N) : '';
      const gu = (t - glintAt) / 1.1, su = (t - scrollAt) / 1.6, fu = (t - spinAt) / 0.9;
      const key = [eyeNow, mouthNow, shut, W, shear[0], shear[63], anim, ptr, gu < 1 ? Math.floor(t * 20) : 0, shuffle, su < 1 ? Math.floor(su * 64) : 0, fu < 1 ? Math.floor(t * 12) : 0, legend === 'Gold Leaf' ? Math.floor(t * 8) : 0, fleuron && (t + blinkPh) % 2.4 < 0.5 ? 1 : 0].join('|');
      if (key === lastKey) return;
      lastKey = key;

      // the face, built in its own frame
      const Wb = style === 'Inline' ? Math.max(W, 3) : W;
      const strokes = faceStrokes(t, eyeNow, mouthNow, shut, mood ? 1 : 0, Wb);
      F.fill(-1); grpOf.fill(-1);
      const fin = legend === 'Ransom Note' ? 'Square' : style;
      const put = (x, y, v, grp) => { if (x >= 0 && x < N && y >= 0 && y < N) { F[y * N + x] = v; if (grp !== undefined) grpOf[y * N + x] = grp; } };
      const stampAll = (dx, dy, colFn) => {
        for (const s of strokes) {
          const col = colFn(s);
          if (s.fill) { for (const [x, y] of s.cells) put(x + dx, y + dy, col, s.grp); continue; }
          const br = brushFor(s.w, fin);
          for (const [x, y] of s.cells) for (const [bx, by] of br) put(x + bx + dx, y + by + dy, col, s.grp);
        }
      };
      if (legend === 'Ransom Note') {
        // each glyph cut from its own scrap of print and pasted down a little crooked
        stampAll(0, 0, (s) => s.grp);
        const boxes = [];
        for (let p = 0; p < N * N; p++) if (F[p] >= 0) { const gp = F[p], x = p % N, y = (p - x) / N; const bx = boxes[gp] || (boxes[gp] = [x, y, x, y]); bx[0] = Math.min(bx[0], x); bx[1] = Math.min(bx[1], y); bx[2] = Math.max(bx[2], x); bx[3] = Math.max(bx[3], y); }
        F.fill(-1);
        const hov = inp.inside ? grpOfAt(Math.floor(inp.x * N), Math.floor(inp.y * N), boxes) : -1;
        boxes.forEach((bx, gp) => {
          if (!bx) return;
          const h = ((gp + 1) * 2654435761 + chipSeed + shuffle * 40503) >>> 0, chip = h % CHIPS.length, jy = ((h >>> 8) % 3) - 1, jx = ((h >>> 12) % 3) - 1;
          const lift = gp === hov ? 1 : 0, pad = 1 + ((h >>> 16) & 1);
          for (let y = bx[1] - pad; y <= bx[3] + pad; y++) for (let x = bx[0] - pad; x <= bx[2] + pad; x++) put(x + jx + 1 + lift, y + jy + 1 + lift, CHSH);
          for (let y = bx[1] - pad; y <= bx[3] + pad; y++) for (let x = bx[0] - pad; x <= bx[2] + pad; x++) put(x + jx - lift, y + jy - lift, CH0 + chip * 2);
          for (const s of strokes) if (s.grp === gp) {
            const br = s.fill ? [[0, 0]] : brushFor(s.w, 'Square');
            for (const [x, y] of s.cells) for (const [b2, b3] of br) put(x + b2 + jx - lift, y + b3 + jy - lift, CH0 + chip * 2 + 1);
          }
        });
      } else {
        if (style === 'Shadow') { const sh = W >= 3 ? 2 : 1; stampAll(sh, sh, (s) => (s.col === INK ? ACC : INK)); }
        stampAll(0, 0, (s) => s.col);
        if (style === 'Inline') for (const s of strokes) if (!s.fill && s.w >= 3) for (let i = 1; i < s.cells.length - 1; i++) put(s.cells[i][0], s.cells[i][1], -2);
        if (style === 'Stencil') for (const s of strokes) {
          if (s.fill || s.cells.length < 9) continue;
          const lo = -Math.floor((s.w - 1) / 2) - 1, hi = Math.ceil((s.w - 1) / 2) + 1;
          for (let i = 4; i < s.cells.length - 3; i += 9) {
            const [x, y] = s.cells[i], [xa, ya] = s.cells[i - 1], [xb, yb] = s.cells[i + 1];
            const vertical = Math.abs(yb - ya) >= Math.abs(xb - xa);
            for (let o = lo; o <= hi; o++) if (vertical) put(x + o, y, -2); else put(x, y + o, -2);
          }
        }
      }

      // set the face on the sheet: rows shift for italics, and the rare sideways setting turns it a quarter
      G.set(BG);
      const scroll = su >= 0 && su < 1 ? Math.floor(su * N) : 0;
      for (let j = 0; j < N; j++) for (let i = N - 1; i >= 0; i--) {
        const v = F[j * N + i];
        if (v === -1) continue;
        let x = (i + shear[j] + scroll) % N, y = j;
        if (x < 0) x += N;
        if (setting === 'Sideways') { const xx = y; y = N - 1 - x; x = xx; }
        G[y * N + x] = v === -2 ? P0 : v;
      }
      // the fleuron: a big ivy-leaf tailpiece under the face; it glints now and then, its vein closes under
      // the pointer, and a tap spins it once round like a coin
      if (fleuron) {
        const near = inp.inside && Math.abs(inp.x * N - flX - 0.5) < 13 && Math.abs(inp.y * N - flY) < 7;
        const sq = fu >= 0 && fu < 1 ? Math.max(0.1, Math.abs(Math.cos(fu * Math.PI * 2))) : 1;
        const cell = (x, y, v) => { if (x >= 0 && x < N && y >= 0 && y < N) G[y * N + x] = v; };
        for (const pass of [0, 1]) for (let r = 0; r < FLEURON.length; r++) for (let i = 0; i < FLEURON[r].length; i++) {
          const ch = FLEURON[r][i];
          if (ch === '.' || (pass === 1) !== (ch === 'v')) continue;
          if (ch === 'v' && (near || sq < 1)) continue;
          cell(Math.round(flX + (i - 11) * sq), flY - 4 + r, ch === 'o' ? FLH : ch === 'v' ? P0 : ACC);
        }
        if (sq === 1 && (near || (t + blinkPh) % 2.4 < 0.5)) {
          const gx = flX - 4, gy = flY - 4;
          cell(gx, gy, FLH);
          for (const [a2, b2] of [[0, -1], [0, -2], [0, -3], [-1, 0], [-2, 0], [-3, 0], [1, 0], [0, 1]]) {
            const x = gx + a2, y = gy + b2, i = x - flX + 11, r = y - flY + 4;
            cell(x, y, r >= 0 && r < 9 && i >= 0 && i < 23 && FLEURON[r][i] !== '.' ? FLH : INK);
          }
        }
      }

      // the legendary materials
      const ptX = inp.inside ? inp.x * N : -99, ptY = inp.inside ? inp.y * N : -99;
      if (legend === 'Gold Leaf') {
        const ink = (x, y) => x >= 0 && x < N && y >= 0 && y < N && (G[y * N + x] === INK || G[y * N + x] === ACC);
        const out = new Uint8Array(N * N);
        const sweep = gu >= 0 && gu < 1 ? Math.floor(gu * 140) - 10 : -99, idle = (Math.floor(t * 8) % 160) - 30;
        for (let y = 0; y < N; ++y) for (let x = 0; x < N; ++x) {
          const p = y * N + x, v = G[p];
          if (v === INK) {
            let col = GOLD + 3;
            if (!ink(x, y - 1) || !ink(x - 1, y)) col = GOLD + 4;
            else if (!ink(x, y + 1) || !ink(x + 1, y)) col = GOLD + 2;
            const dd = x + y;
            if (dd === sweep || dd === sweep + 1 || dd === idle) col = GOLD + 5;
            const d2 = (x + 0.5 - ptX) ** 2 + (y + 0.5 - ptY) ** 2;
            if (d2 < 30) col = d2 < 8 ? GOLD + 5 : GOLD + 4;
            out[p] = col;
          } else if (v === ACC) out[p] = GOLD + 6;
          else out[p] = v === P0 ? GOLD : GOLD + 1;
        }
        G.set(out);
        if (inp.inside) { const cx = Math.floor(ptX), cy = Math.floor(ptY); for (const [a2, b2] of [[0, -2], [0, 2], [-2, 0], [2, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]) { const x = cx + a2, y = cy + b2; if (x >= 0 && x < N && y >= 0 && y < N && G[y * N + x] >= GOLD + 2 && G[y * N + x] <= GOLD + 5) G[y * N + x] = GOLD + 5; } }
      } else if (legend === 'Dot Matrix') {
        for (let p = 0; p < N * N; p++) {
          const v = G[p], x = p % N, y = (p - x) / N;
          const warm = (x + 0.5 - ptX) ** 2 + (y + 0.5 - ptY) ** 2 < 36;
          G[p] = v === INK ? LED + 3 : v === ACC ? LED + 4 : v === P1 || v === P2 || v === ACC2 ? LED + 2 : (warm ? LED + 1 : LED);
        }
      }

      for (let p = 0; p < N * N; p++) { const cc = pal[G[p]], o = p * 4; px[o] = cc[0]; px[o + 1] = cc[1]; px[o + 2] = cc[2]; px[o + 3] = 255; }
      cellCtx.putImageData(img, 0, 0);
      g.resetTransform();
      g.imageSmoothingEnabled = false; g.drawImage(cv, 0, 0, S, S);
      if (grille) g.drawImage(grille, 0, 0);
    }
    // which pasted scrap is under a cell (ransom note)
    function grpOfAt(x, y, boxes) {
      for (let gp = boxes.length - 1; gp >= 0; gp--) { const bx = boxes[gp]; if (bx && x >= bx[0] - 2 && x <= bx[2] + 2 && y >= bx[1] - 2 && y <= bx[3] + 2) return gp; }
      return -1;
    }
    set(0);
    return (t) => { live(t); set(t); };
  },
});

})(window.Proto);
