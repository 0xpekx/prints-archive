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
  recipe: 'Faces built from bitmap-font glyphs on a 64-cell grid: brackets for the head, punctuation for eyes, brows, nose and mouth, a row of marks for hair or a hat, on a specimen-coloured sheet. The build of the head (classic, tall, wide or askew), brackets, eyes, mouth, accent, type finish, weight, setting, sheet and inks vary. Very rarely the face is an illuminated initial in gold leaf, cut out for a ransom note or picked on a fighting-game character select screen, or a big ivy-leaf fleuron is set under the chin.',
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
        if (LG && LG.tap(clack, t)) continue;
        typeFace(clack, t);
      }
      if (!rang && t - typedAt > 2.4) { rang = true; c.sound.note(keyRoot + 24, { dur: 0.9, vel: 0.12, wave: 'sine' }); c.sound.note(keyRoot + 31, { dur: 0.6, vel: 0.05, wave: 'sine' }); }
      // dragging steps the weight from hairline (bottom) to ultra (top), a cell at a time; letting go steps it back
      // (a legendary's drags are its own)
      const goalW = !LG && pressing && dragged > 0.03 ? Math.max(1, Math.min(5, 1 + Math.floor((1 - inp.y) * 5))) : W0;
      if (W !== goalW && t - stepAt > (pressing ? 0.05 : 0.14)) { W += Math.sign(goalW - W); stepAt = t; }
      if (!LG && pressing && dragged > 0.03) {
        if (W !== lastStep) { if (lastStep >= 0) c.sound.note(keyRoot - 12 + steps[(W - 1) * 2 % steps.length], { dur: 0.1, vel: 0.1, wave: 'triangle', cutoff: 1800 }); lastStep = W; }
      } else lastStep = -1;
      const goal = inp.inside ? Math.max(-0.12, Math.min(0.12, (inp.x - 0.5) * 0.22)) : 0;
      if (goal || leanNow) { leanNow += (goal - leanNow) * Math.min(1, dt * 4); if (!goal && Math.abs(leanNow) < 1e-4) leanNow = 0; }
      wasDown = pressing;
    };
    function typeFace(clack, t) {
        const pan = (clack.x - 0.5) * 0.6;
        typed = (typed + 1) % faces.length; typedAt = t; rang = false;
        c.sound.hit('click', 0.3);
        c.sound.note(keyRoot + steps[typed % steps.length], { dur: 0.12, vel: 0.16, wave: 'triangle', cutoff: 2600, pan });
        if (legend === 'Gold Leaf') { glintAt = t; c.sound.note(keyRoot + 24, { dur: 1.2, vel: 0.07, wave: 'sine', at: 0.12 }); c.sound.note(keyRoot + 28, { dur: 1.0, vel: 0.05, wave: 'sine', at: 0.2 }); }
        else if (legend === 'Ransom Note') { shuffle++; c.sound.hit('noise', 0.05); c.sound.note(keyRoot + 7 + steps[shuffle % 7], { dur: 0.1, vel: 0.08, wave: 'square', cutoff: 1200, at: 0.08, pan }); }
        else if (legend === 'Dot Matrix') { scrollAt = t; for (let i = 0; i < 8; i++) c.sound.note(keyRoot + 12 + steps[(i * 2) % 7], { dur: 0.05, vel: 0.05, wave: 'square', cutoff: 1800, at: i * 0.15 }); }
    }

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
    // ---------- the legendaries: each one a picture of its own (2026-10-19, pass 2 the same day) ----------
    // Gold Leaf: the face as an illuminated initial: raised gold strokes outlined in black on a lapis ground, in a
    // gilt frame on parchment with a vine round the margin. Rub the gold to burnish it; tap the blue to set a gold
    // flower in it; tap the gold to letter a new face.
    // Ransom Note: each glyph cut from a magazine scrap and pasted on ruled, hole-punched notebook paper taped to a
    // desk. Drag the scraps about; tap one to swap it for another cutting; tap the scissors to cut them all again.
    // Dot Matrix (third redesign, 2026-10-20): a 16-bit fighting game's character select screen (see its own notes below).
    const FM = new Int16Array(N * N);
    let lastBoxes = [];
    const LG = legend === 'None' ? null : (() => {
      const add = (h) => { pal.push(rgb(h)); return pal.length - 1; };
      const hsh = (x, y, s) => { let h = Math.imul(x * 374761393 + y * 668265263 + s * 974634 + chipSeed, 0x27d4eb2d); h ^= h >>> 15; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
      const onFace = (x, y) => x >= 0 && y >= 0 && x < N && y < N && FM[y * N + x] >= 0;
      const BASE = new Uint8Array(N * N);
      // the pointer as gestures (press, drag, release); a tap seen while the pointer is down waits for its release
      const g = { down: false, t0: 0, x0: 0, y0: 0, x: 0.5, y: 0.5, px: 0.5, py: 0.5, moved: 0, last: -1, dt: 1 / 30, press: false, release: false, vy: 0 };
      const track = (t) => {
        const i = c.input;
        if (t === g.last) return;
        g.dt = Math.max(0.001, Math.min(0.1, t - g.last)); g.last = t; g.press = g.release = false;
        g.px = g.x; g.py = g.y;
        if (i.inside || i.down) { g.x = i.x; g.y = i.y; }
        if (i.down && !g.down) { g.down = true; g.press = true; g.t0 = t; g.x0 = g.px = g.x; g.y0 = g.py = g.y; g.moved = 0; }
        else if (!i.down && g.down) { g.down = false; g.release = true; }
        if (g.down) g.moved = Math.max(g.moved, Math.hypot(g.x - g.x0, g.y - g.y0));
        g.vy = g.vy * 0.5 + (g.y - g.py) / g.dt * 0.5;
      };
      let waiting = null;
      const later = (fn, clack, t) => { if (c.input.down) waiting = [fn, clack]; else fn(clack, t); return true; };
      const settle = (t) => { if (waiting && !c.input.down) { if (g.moved < 0.03 || !g.release) waiting[0](waiting[1], t); waiting = null; } };
      if (legend === 'Gold Leaf') {
        const C = {
          parch: add('#ebdfbe'), parch2: add('#e0d1a7'), parchD: add('#cdb987'), ol: add('#1c1006'), fr: [add('#9b6c1c'), add('#d9aa42'), add('#f6d980')],
          blue: add('#1a2c80'), blueL: add('#22389a'), dot: add('#d9ab45'), dotL: add('#fff3c8'), fil: add('#9aa6dc'),
          g: [add('#8c5f15'), add('#d3a63e'), add('#efcb68'), add('#fff4cc')], red: add('#cc381e'), redL: add('#f2714d'), redD: add('#85200f'),
          vine: add('#4b7a2e'), vineL: add('#78a84a'), berry: [add('#c4372a'), add('#2d47aa'), add('#e3b549')],
        };
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const p = y * N + x, e = Math.min(x, y, N - 1 - x, N - 1 - y);
          let col = e === 0 ? C.parchD : hsh(x, y, 1) < 0.08 ? C.parch2 : C.parch;
          if (e >= 3 && e <= 5) {
            // the gilt frame: a black line outside, then gold lit on the top and left, shaded on the bottom and right
            const far = x === N - 1 - e || y === N - 1 - e;
            col = e === 3 ? C.ol : far ? C.fr[0] : C.fr[e === 5 ? 1 : 2];
          } else if (e > 5) {
            // lapis, a lattice of finer lines, gold dots where they cross and white penwork in each diamond
            const a = (x + y) % 8, b = (x - y + 64) % 8;
            col = a === 0 && b === 0 && ((x + y) & 8) ? C.dot : a === 4 && b === 4 ? C.fil : a === 0 || b === 0 ? C.blueL : C.blue;
          }
          BASE[p] = col;
        }
        // jewels at the frame's corners, and a vine with leaves and berries running round the margin
        for (const [cx, cy] of [[4, 4], [59, 4], [4, 59], [59, 59]]) for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) BASE[(cy - 1 + b) * N + cx - 1 + a] = (cx + cy) % 2 ? C.red : C.blueL;
        for (let k = 0; k < 4 * 56; k++) {
          const side = k / 56 | 0, s = k % 56 + 4, w = Math.round(Math.sin(s * 0.55) * 0.9) + 1;
          const [x, y] = side === 0 ? [s, w] : side === 1 ? [N - 1 - w, s] : side === 2 ? [N - 1 - s, N - 1 - w] : [w, N - 1 - s];
          if (x < 0 || y < 0 || x >= N || y >= N) continue;
          BASE[y * N + x] = s % 14 === 10 ? C.berry[(k / 14 | 0) % 3] : C.vine;
          if (s % 7 === 3) { const lx = side === 1 ? (w === 2 ? N - 1 : N - 3) : side === 3 ? (w === 2 ? 0 : 2) : x, ly = side === 0 ? (w === 2 ? 0 : 2) : side === 2 ? (w === 2 ? N - 1 : N - 3) : y; BASE[ly * N + lx] = C.vineL; }
        }
        const rub = new Float32Array(N * N), flowers = [];
        let lastFace = null, scribeAt = -9, scribe = 1;
        const DOTS = []; for (let p = 0; p < N * N; p++) if (BASE[p] === C.dot && Math.min(p % N, (p / N) | 0, N - 1 - p % N, N - 1 - ((p / N) | 0)) >= 6) DOTS.push(p);
        let rubbed = false;
        const inGround = (x, y) => Math.min(x, y, N - 1 - x, N - 1 - y) > 5;
        return {
          tap(clack, t) {
            return later((cl, t2) => {
              const x = Math.floor(cl.x * N), y = Math.floor(cl.y * N);
              if (FM[y * N + x] < 0 && inGround(x, y)) {
                // a gold flower opens in the lapis where it was tapped
                flowers.push([x, y, t2]); if (N - 1 - x !== x) flowers.push([N - 1 - x, y, t2 + 0.15]);   // and its twin, mirrored, so they build a pattern
                while (flowers.length > 24) flowers.shift();
                [0, 7, 12].forEach((n, i) => c.sound.note(keyRoot + 12 + n, { dur: 0.5, vel: 0.06, wave: 'sine', at: i * 0.06 }));
              } else typeFace(cl, t2);
            }, clack, t);
          },
          paint(t, inp, gu, faceKey) {
            track(t); settle(t);
            if (faceKey !== lastFace) { if (lastFace !== null) scribeAt = t; lastFace = faceKey; }
            scribe = Math.min(1, (t - scribeAt) / 0.9);
            // rubbing burnishes the gold under the pointer; it dulls again slowly
            if (rubbed) { rubbed = false; for (let p = 0; p < N * N; p++) if (rub[p] > 0) { rub[p] = Math.max(0, rub[p] - g.dt * 0.05); rubbed = true; } }
            if (g.down && g.moved > 0.02) {
              rubbed = true;
              const n = Math.max(1, Math.ceil(Math.hypot(g.x - g.px, g.y - g.py) * N * 2));
              for (let s2 = 0; s2 <= n; s2++) { const cx = (g.px + (g.x - g.px) * s2 / n) * N, cy = (g.py + (g.y - g.py) * s2 / n) * N; for (let b = -2; b <= 2; b++) for (let a = -2; a <= 2; a++) { const x = Math.floor(cx + a), y = Math.floor(cy + b); if (x >= 0 && y >= 0 && x < N && y < N && a * a + b * b <= 5) rub[y * N + x] = Math.min(1, rub[y * N + x] + 0.3); } }
              if (Math.floor(t * 10) !== Math.floor((t - g.dt) * 10)) c.sound.hit('noise', 0.03, { cutoff: 4000, dur: 0.06 });
            }
            G.set(BASE);
            const sweep = gu >= 0 && gu < 1 ? Math.floor(gu * 140) - 10 : (Math.floor(t * 14) % 170) - 40;
            const ptX = inp.inside ? inp.x * N : -99, ptY = inp.inside ? inp.y * N : -99, tw = Math.floor(t * 3);
            for (const p of DOTS) if (hsh(p % N, (p / N) | 0, tw) < 0.12) G[p] = C.dotL;
            for (let p = 0; p < N * N; p++) {
              if (FM[p] < 0) continue;
              const x = p % N, y = (p - x) / N;
              for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) { const xx = x + a, yy = y + b; if (xx >= 0 && yy >= 0 && xx < N && yy < N && FM[yy * N + xx] < 0) G[yy * N + xx] = C.ol; }
            }
            for (let p = 0; p < N * N; p++) {
              const v = FM[p];
              if (v < 0) continue;
              const x = p % N, y = (p - x) / N;
              const lit = !onFace(x - 1, y) || !onFace(x, y - 1), dark = !onFace(x + 1, y) || !onFace(x, y + 1);
              if (v === ACC) { G[p] = lit ? C.redL : dark ? C.redD : C.red; continue; }
              let k = lit ? 3 : dark ? 1 : 2;
              const d = x + y - sweep;
              if (d === 0 || d === 1) k = 3; else if (d >= -2 && d <= 3) k = Math.max(k, 2);
              const d2 = (x + 0.5 - ptX) ** 2 + (y + 0.5 - ptY) ** 2;
              if (d2 < 30 && !g.down) k = d2 < 8 ? 3 : Math.max(k, 2);
              if (rub[p] > 0.5) k = dark ? 2 : 3; else if (rub[p] > 0.12) k = Math.max(k, 2);
              G[p] = C.g[k];
            }
            // the flowers: a gold rosette (four gold petals round a red heart, gold between) that pops in with a sparkle
            for (const [fx, fy, f0] of flowers) {
              const u = (t - f0) / 0.35; if (u < 0) continue;
              const cells = [[0, 0, C.red], [1, 0, C.g[3]], [-1, 0, C.g[3]], [0, 1, C.g[3]], [0, -1, C.g[3]]];
              if (u > 0.5) cells.push([1, 1, C.g[1]], [-1, 1, C.g[1]], [1, -1, C.g[1]], [-1, -1, C.g[1]], [2, 0, C.g[2]], [-2, 0, C.g[2]], [0, 2, C.g[2]], [0, -2, C.g[2]]);
              if (u > 0.5 && u < 2.5) { const r = Math.round(2 + (u - 0.5) * 1.5); for (const [a, b] of [[r, -r], [-r, -r], [r, r], [-r, r]]) cells.push([a, b, C.dotL]); }
              if (u > 0.3 && u < 1.2) cells.push([0, 0, C.dotL]);
              for (const [a, b, col] of cells) { const x = fx + a, y = fy + b; if (x >= 0 && y >= 0 && x < N && y < N && FM[y * N + x] < 0 && inGround(x, y)) G[y * N + x] = col; }
            }
            // a new face is scribed: the gold goes down row by row behind a bright quill line, over the red size
            if (scribe < 1) for (let p = 0; p < N * N; p++) {
              if (FM[p] < 0) continue;
              const y = (p / N) | 0, front = 6 + scribe * 54;
              if (y > front + 0.5) G[p] = (p + y) % 2 ? C.redD : C.ol;
              else if (y > front - 1.5) G[p] = C.dotL;
            }
          },
        };
      }
      if (legend === 'Ransom Note') {
        const C = {
          wood: [add('#4a2e1a'), add('#5a3921'), add('#6a4428'), add('#3c2414')], page: add('#fbfaf3'), rule: add('#a8c6e6'), margin: add('#e59a98'), shadow: add('#24160c'),
          chipSh: add('#cbc6b6'), tape: add('#ece5c8'), tapeD: add('#d6cdab'), news: add('#c9c4b6'), dots: add('#f0a12c'), steel: add('#c3c8d1'), steelD: add('#7f8691'), handle: add('#d2342a'), handleD: add('#8e1d16'),
        };
        const inPage = (x, y) => x >= 4 && x <= 58 && y >= 2 && y <= 60;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const p = y * N + x;
          const g = Math.sin(y * 0.9 + Math.sin(x * 0.13) * 3) + Math.sin(y * 0.31 + x * 0.02) * 0.6;
          let col = C.wood[g > 0.9 ? 2 : g > -0.2 ? 1 : g > -1.1 ? 0 : 3];
          if (!inPage(x, y) && inPage(x - 1, y - 1)) col = C.shadow;
          if (inPage(x, y)) {
            col = (y - 9) % 4 === 0 && y > 6 ? C.rule : C.page;
            if (x === 11) col = C.margin;
            if ((x === 6 || x === 7) && [13, 14, 31, 32, 49, 50].includes(y)) col = C.wood[0];
          }
          BASE[p] = col;
        }
        // tape over the two top corners
        for (let k = -1; k <= 8; k++) for (const o of [0, 1, 2]) for (const [x, y] of [[2 + k, 7 - k + o], [61 - k, 7 - k + o]]) if (x >= 0 && y >= 0 && x < N && y < N) BASE[y * N + x] = o === 2 ? C.tapeD : C.tape;
        const off = [], shade = [];   // each scrap's own offset (dragged) and colour turn (tapped)
        let drag = -1, dragOff = null, stirred = false, stampAt = -9;
        const STAMP = ['aaa...aa..aaa.aaa.', 'a..a.a..a..a..a..a', 'aaa..aaaa..a..a..a', 'a....a..a..a..a..a', 'a....a..a.aaa.aaa.'];
        const stampC = add('#c8261d'), stampL = add('#e2685c');
        const boxAt = (x, y) => { const bx = lastBoxes; for (let gp = bx.length - 1; gp >= 0; gp--) { const b = bx[gp]; if (!b) continue; const o2 = off[gp] || [0, 0]; if (x >= b[0] - 2 + o2[0] && x <= b[2] + 2 + o2[0] && y >= b[1] - 2 + o2[1] && y <= b[3] + 2 + o2[1]) return gp; } return -1; };
        const onScissors = (x, y) => x >= 43 && x <= 61 && y >= 51 && y <= 63;
        const SCIS = ['.hhhh..............', 'h....h.............', 'h....h.............', 'h....hss...........', '.hhhh..sss.........', '........sSssssssss.', '.hhhh..sss....sssss', 'h....hss...........', 'h....h.............', 'h....h.............', '.hhhh..............'];
        return {
          off, shade,
          get drag() { return drag; },
          tapAt: boxAt,
          tap(clack, t) {
            const x = clack.x * N, y = clack.y * N;
            if (onScissors(x, y)) return later((cl, t2) => { shuffle++; off.length = 0; shade.length = 0; c.sound.hit('noise', 0.08); c.sound.hit('click', 0.4, { at: 0.08 }); [0, 5, 7].forEach((n, i) => c.sound.note(keyRoot + 7 + n, { dur: 0.08, vel: 0.07, wave: 'square', cutoff: 1300, at: 0.12 + i * 0.07 })); }, clack, t);
            const gp = boxAt(x, y);
            if (gp >= 0) {
              // pick the scrap up; let go where it should stick (a tap without moving it swaps it for another cutting)
              if (c.input.down) { drag = gp; dragOff = (off[gp] || [0, 0]).slice(); stampAt = -9; }
              return later((cl, t2) => { shade[gp] = (shade[gp] || 0) + 1; c.sound.hit('noise', 0.05); c.sound.note(keyRoot + 7 + steps[(shade[gp] + gp) % 7], { dur: 0.1, vel: 0.08, wave: 'square', cutoff: 1200, at: 0.06 }); }, clack, t);
            }
            return later((cl, t2) => typeFace(cl, t2), clack, t);   // bare paper: a new face only on a tap, not at the start of a drag
          },
          paint(t) {
            track(t);
            if (drag >= 0) {
              if (g.down) off[drag] = [dragOff[0] + Math.round((g.x - g.x0) * N), dragOff[1] + Math.round((g.y - g.y0) * N)];
              else {
                if (g.moved >= 0.03) {
                  c.sound.hit('kick', 0.12); c.sound.hit('click', 0.25); stirred = true;
                  const o2 = off[drag]; if (o2 && Math.abs(o2[0]) <= 3 && Math.abs(o2[1]) <= 3) off[drag] = [0, 0];
                  if (stirred && off.every(v => !v || (!v[0] && !v[1]))) { stampAt = t; stirred = false; c.sound.hit('kick', 0.5, { at: 0.05 }); c.sound.hit('snare', 0.2, { at: 0.05 }); }
                }
                drag = -1;
              }
            }
            settle(t);
            G.set(BASE);
            for (let p = 0; p < N * N; p++) {
              const v = FM[p]; if (v < 0) continue;
              const x = p % N, y = (p - x) / N;
              if (v === CHSH) { G[p] = inPage(x, y) ? C.chipSh : C.shadow; continue; }
              let col = v;
              // magazine stock: the cream scraps are newsprint (rows of grey text), the yellow ones a halftone
              if (v === CH0 && y % 2 === 0 && (x + (y >> 1) * 3) % 6 !== 0) col = C.news;
              else if (v === CH0 + 6 && x % 2 === 0 && y % 2 === 0) col = C.dots;
              G[p] = col;
            }
            // the stamp, thumped on once the face is put back together: PAID, in a red box, a little uneven
            const su = t - stampAt;
            if (stampAt > 0 && su >= 0) {
              const big = su < 0.1 ? 1 : 0, x0 = 13 - big, y0 = 51 - big;
              for (let y = y0; y <= y0 + 8 + big * 2; y++) for (let x = x0; x <= x0 + 23 + big * 2; x++) {
                const edge = y === y0 || y === y0 + 8 + big * 2 || x === x0 || x === x0 + 23 + big * 2, r = STAMP[y - y0 - 2 - big], q = x - x0 - 3 - big;
                if ((edge || (r && r[q] === 'a')) && hsh(x, y, 5) > 0.12) G[y * N + x] = hsh(x, y, 6) < 0.25 ? stampL : stampC;
              }
            }
            const sx = 43, sy = 52;
            for (let j = 0; j < SCIS.length; j++) for (let i = 0; i < SCIS[j].length; i++) {
              const ch = SCIS[j][i], x = sx + i, y = sy + j; if (ch === '.' || x >= N || y >= N) continue;
              G[y * N + x] = ch === 'h' ? (j < 5 ? C.handle : C.handleD) : ch === 'S' ? C.steelD : j > 5 ? C.steelD : C.steel;
            }
          },
        };
      }
      {
      // Dot Matrix (third redesign, 2026-10-20): a 16-bit fighting game's character select screen. The face is the selected
      // fighter's big cel-shaded portrait on a 128-pixel bitmap, outlined in black, over a dark arcade backdrop, with its
      // name (the print's inks) on a plate, a round timer counting down, and a roster of six fighters along the bottom with
      // a flashing 1P cursor on this one. Every trait has a version: the eyes and mouth set the expression, the accent the
      // hair, brows, nose, cheeks, glasses and chin their own marks, the brackets the screen's frame, the weight the
      // outline, the finish how it's inked, the setting tilts or turns the screen, the build the head, the sheet the
      // backdrop and the inks the colours and the name. A short tap moves the cursor and the next fighter slides in; drag
      // along the roster to pick one; hold to lock in (READY, a blazing aura), let go for FIGHT!
      const B = 128, bigc = document.createElement('canvas'); bigc.width = bigc.height = B;
      const bctx = bigc.getContext('2d'), bimg = bctx.createImageData(B, B), b32 = new Uint32Array(bimg.data.buffer), OUT = new Uint32Array(B * B);
      const rgbw = (r, g2, b) => (0xff000000 | (Math.max(0, Math.min(255, b | 0)) << 16) | (Math.max(0, Math.min(255, g2 | 0)) << 8) | Math.max(0, Math.min(255, r | 0))) >>> 0;
      const hueF = (h) => { const f = (n) => { const k = (n + h * 6) % 6; return 1 - Math.max(0, Math.min(1, Math.min(k, 4 - k))); }; return [f(5) * 255, f(3) * 255, f(1) * 255]; };
      const hueOf = (c3) => { const mx = Math.max(...c3), mn = Math.min(...c3), d = mx - mn || 1; let h = mx === c3[0] ? ((c3[1] - c3[2]) / d) % 6 : mx === c3[1] ? (c3[2] - c3[0]) / d + 2 : (c3[0] - c3[1]) / d + 4; return (h / 6 + 1) % 1; };
      const grey = (c3) => Math.max(...c3) - Math.min(...c3) < 40;
      // the inks, as arcade colours: the backdrop takes the accent's hue (violet if it has none), the costume the ink's
      const hG = grey(ACCc) ? 0.75 : hueOf(ACCc), hS = grey(INKc) ? (hG + 0.5) % 1 : hueOf(INKc);
      const mixc = (a, b2, u) => a.map((v, q) => v + (b2[q] - v) * u);
      const BGT = mixc(hueF(hG), [6, 4, 16], 0.86), BGB = mixc(hueF(hG), [6, 4, 16], 0.55), STREAK = mixc(hueF(hG), [255, 255, 255], 0.1);
      const SHIRT = hueF(Math.abs(hS - hG) < 0.1 ? (hS + 0.5) % 1 : hS), SHIRTD = mixc(SHIRT, [0, 0, 0], 0.4), SHIRTL = mixc(SHIRT, [255, 255, 255], 0.35);
      const INKW = rgbw(12, 10, 18), WHITE = rgbw(255, 255, 255), SKIN = [255, 206, 166], SKIN2 = [218, 146, 112], SKINL = [255, 236, 210], RED = rgbw(230, 40, 50);
      const DARK = rgbw(6, 4, 12), GOLD = rgbw(255, 214, 40), GOLD2 = rgbw(255, 136, 20), FRAMEC = rgbw(...mixc(hueF(hG), [255, 255, 255], 0.45));
      // the hair: blue-black, black, red or blond (never the backdrop's own colour)
      const HAIRS = [[[40, 44, 110], [90, 110, 210], 0.66], [[28, 26, 30], [110, 110, 130], -1], [[200, 50, 30], [255, 140, 90], 0.02], [[245, 200, 60], [255, 245, 190], 0.13]].filter(([, , h]) => h < 0 || Math.min(Math.abs(h - hG), 1 - Math.abs(h - hG)) > 0.1);
      const [HAIR, HAIRL0] = HAIRS[chipSeed % HAIRS.length], HAIRL = rgbw(...HAIRL0);
      const SKINW = rgbw(...SKIN), HAIRW = rgbw(...HAIR), SHIRTW = rgbw(...SHIRT), SHIRTDW = rgbw(...SHIRTD);
      const SKIN2W = rgbw(...SKIN2), SKINLW = rgbw(...SKINL), SHIRTLW = rgbw(...SHIRTL);
      const OW = { Hairline: 2, Book: 3, Bold: 4, Black: 5 }[weight];
      const HG = { Classic: [64, 62, 31, 36, 0], Tall: [64, 62, 27, 40, 0], Wide: [64, 64, 37, 33, 0], Askew: [64, 62, 31, 36, 0.12 * side] }[build];
      const NAME = setName.toUpperCase();
      // a 5x7 arcade font
      const FONT = { A: '01110100011000111111100011000110001', B: '11110100011000111110100011000111110', C: '01110100011000010000100001000101110', D: '11110100011000110001100011000111110', E: '11111100001000011110100001000011111', F: '11111100001000011110100001000010000', G: '01111100001000010011100011000101111', H: '10001100011000111111100011000110001', I: '01110001000010000100001000010001110', K: '10001100101010011000101001001010001', L: '10000100001000010000100001000011111', M: '10001110111010110101100011000110001', N: '10001110011010110011100011000110001', O: '01110100011000110001100011000101110', P: '11110100011000111110100001000010000', R: '11110100011000111110101001001010001', S: '01111100001000001110000010000111110', T: '11111001000010000100001000010000100', U: '10001100011000110001100011000101110', W: '10001100011000110101101011101110001', X: '10001100010101000100010101000110001', Y: '10001100010101000100001000010000100', '0': '01110100011001110101110011000101110', '1': '00100011000010000100001000010001110', '2': '01110100010000100010001000100011111', '3': '11110000010000101110000010000111110', '4': '00010001100101010010111110001000010', '5': '11111100001111000001000011000101110', '6': '00110010001000011110100011000101110', '7': '11111000010001000100010000100001000', '8': '01110100011000101110100011000101110', '9': '01110100011000101111000010001001100', '!': '00100001000010000100001000000000100', ' ': '00000000000000000000000000000000000' };
      // drawing on the bitmap
      const P = (x, y, c2) => { x |= 0; y |= 0; if (x >= 0 && y >= 0 && x < B && y < B) OUT[y * B + x] = c2; };
      const ell = (cx, cy, rx, ry, fn) => { for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) { const e = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2; if (e <= 1) fn(x, y, e); } };
      const ellO = (cx, cy, rx, ry, fill, w) => { ell(cx, cy, rx + w, ry + w, (x, y) => P(x, y, INKW)); ell(cx, cy, rx, ry, (x, y) => P(x, y, fill)); };
      const ln = (x0, y0, x1, y1, w, c2) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); const lo = -Math.floor((w - 1) / 2); for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let b = 0; b < w; b++) for (let a = 0; a < w; a++) P(x + lo + a, y + lo + b, c2); } };
      const poly = (pts, c2) => { let y0 = 1e9, y1 = -1e9; for (const [, y] of pts) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); } for (let y = Math.floor(y0); y <= y1; y++) { const xs = []; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xa, ya] = pts[i], [xb, yb] = pts[j]; if ((ya > y + 0.5) !== (yb > y + 0.5)) xs.push(xa + (y + 0.5 - ya) / (yb - ya) * (xb - xa)); } xs.sort((a, b2) => a - b2); for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.ceil(xs[k] - 0.5); x <= xs[k + 1] - 0.5; x++) P(x, y, c2); } };
      // arcade lettering: a black outline, the letters shaded top to bottom (yellow into orange, or the colours given)
      const text = (str, cx, cy, sc, c1, c2) => {
        const w = str.length * 6 * sc - sc, x00 = Math.round(cx - w / 2), y0 = Math.round(cy - 3.5 * sc);
        for (const pass of [0, 1]) { let x0 = x00; for (const ch of str) { const gl = FONT[ch] || FONT[' ']; for (let r = 0; r < 7; r++) for (let q = 0; q < 5; q++) if (gl[r * 5 + q] === '1') for (let b = 0; b < sc; b++) for (let a = 0; a < sc; a++) { const X = x0 + q * sc + a, Y = y0 + r * sc + b; if (pass) P(X, Y, r < 3 ? c1 : c2); else for (const [u, v] of [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1], [0, 2], [1, 2]]) P(X + u, Y + v, INKW); } x0 += 6 * sc; } }
      };
      // the backdrop: dark, lighter low down, slanting light streaks (the sheet sets its pattern), the frame (the brackets set it)
      const GROUNDBUF = new Uint32Array(B * B);
      {
        const inset = sheet === 'Margins' ? 7 : 4, fr = FRAMEC;
        for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) {
          const u = y / B; let c3 = mixc(BGT, BGB, u);
          if (sheet === 'Baseline') { if (y % 2) c3 = mixc(c3, [0, 0, 0], 0.45); }
          else if (sheet === 'Grid') { if (y > 74) { const z = (y - 70) / 58, gx = ((x - 64) / z) % 24; if (Math.abs(gx) < 1.4 / z * 0.6 + 0.6 || ((y - 70) ** 0.7 * 3) % 6 < 1) c3 = mixc(c3, STREAK, 0.6); } }
          else if ((x + y * 0.6 + 400) % 46 < 9) c3 = mixc(c3, STREAK, 0.18);
          if (sheet === 'Ghost Glyph') { const d = Math.hypot(x - 96, y - 40); if ((d < 26 && d > 18 && !(x < 96 && y > 40)) || (Math.abs(x - 96) < 4 && y > 50 && y < 62)) c3 = mixc(c3, STREAK, 0.25); }
          let col = rgbw(...c3);
          const e = Math.min(x, y, B - 1 - x, B - 1 - y);
          if (e < inset - 2) col = DARK;
          else if (e < inset + 1) col = fr;
          if (brackets === 'None' && e < inset + 1) col = rgbw(...c3);
          if (brackets === 'Double' && e === inset + 3) col = fr;
          if (brackets === 'Bars' && (x < inset + 4 || x > B - inset - 5) && e >= inset - 2) col = fr;
          if (brackets === 'Round' || brackets === 'Curly') { const cx2 = Math.min(x, B - 1 - x), cy2 = Math.min(y, B - 1 - y); if (cx2 < 12 && cy2 < 12 && Math.hypot(12 - cx2, 12 - cy2) > 12 - inset + 2) col = DARK; }
          if (brackets === 'Curly' && e >= inset - 2 && e < inset + 1 && Math.sin((x + y) * 0.5) > 0.6) col = DARK;
          if ((brackets === 'Angle' || brackets === 'Guillemets') && Math.min(x, B - 1 - x) + Math.min(y, B - 1 - y) < 16) col = Math.min(x, B - 1 - x) + Math.min(y, B - 1 - y) < 13 ? DARK : fr;
          if (brackets === 'Slashes' && e < inset + 1 && ((x + y) % 6) < 2) col = DARK;
          if (sheet === 'Crop Marks' && e >= inset + 2 && e < inset + 4 && (Math.min(x, B - 1 - x) < 16 && Math.min(y, B - 1 - y) < 16)) col = WHITE;
          GROUNDBUF[y * B + x] = col;
        }
      }
      FONT['?'] = '01110100010000100110001000000000100';
      // the roster: six fighters in boxes along the bottom (this one first), drawn once with no backdrop (0 is see-through)
      const RY = 102, RS = 19, RX0 = 64 - RS * 3, ROST = new Uint32Array(B * B);
      {
        const keep = OUT.slice(); OUT.fill(0);
        for (let k = 0; k < 6; k++) {
          const x0 = RX0 + k * RS, hc = k === 0 ? HAIRW : rgbw(...HAIRS[(chipSeed + k) % HAIRS.length][0]), skin = k === 0 ? SKINW : rgbw(...mixc(SKIN, [120, 70, 40], (k * 0.23) % 0.6)), bgk = rgbw(...mixc(hueF((hG + k * 0.17) % 1), [10, 8, 20], 0.55));
          for (let y = RY; y < RY + RS - 1; y++) for (let x = x0; x < x0 + RS - 1; x++) P(x, y, x === x0 || y === RY || x === x0 + RS - 2 || y === RY + RS - 2 ? INKW : bgk);
          ell(x0 + 9, RY + 21, 9, 7, (x, y) => { if (y < RY + RS - 2) P(x, y, k === 0 ? SHIRTW : rgbw(...hueF((hS + k * 0.29) % 1))); });
          ell(x0 + 9, RY + 9, 5, 6, (x, y) => P(x, y, skin));
          ell(x0 + 9, RY + 6, 6, 4, (x, y) => { if (y < RY + 6 + (k & 1)) P(x, y, hc); });
          P(x0 + 7, RY + 9, INKW); P(x0 + 11, RY + 9, INKW); ln(x0 + 8, RY + 12, x0 + 10, RY + 12, 1, INKW);
          if (k === 5) { for (let y = RY + 1; y < RY + RS - 2; y++) for (let x = x0 + 1; x < x0 + RS - 2; x++) P(x, y, bgk); text('?', x0 + 9, RY + 9, 1, WHITE, WHITE); }
        }
        ROST.set(OUT); OUT.set(keep);
      }
      let BASE0 = null, lastFaceKey = eyes + '|' + mouth, pending = null, slideAt = -9, slideDir = 1, lean = 0, shake = 0, fightAt = -9, held = false, lockAt = 0, cur = 0, curGoal = 0, dragSlot = -1;
      const skinCol = (x, y, cx, cy, rx, ry) => { const dx = (x - cx) * side; if (dx > rx * 0.28 + (y - cy) * 0.25) return SKIN2W; if (((x - cx + side * rx * 0.45) / rx) ** 2 + ((y - cy + ry * 0.45) / ry) ** 2 < 0.05) return SKINLW; return SKINW; };
      function cEye(kind, cx, cy, sd, shut, lx, ly, t) {
        const w = Math.max(2, OW - 1);
        if (shut || kind === 'Dashes') { ln(cx - 8, cy + 1, cx + 8, cy + 1, w + 1, INKW); return; }
        if (kind === 'Carets') { ln(cx - 8, cy + 3, cx, cy - 4, w + 1, INKW); ln(cx, cy - 4, cx + 8, cy + 3, w + 1, INKW); return; }
        if (kind === 'Crosses') { ln(cx - 6, cy - 6, cx + 6, cy + 6, w + 1, INKW); ln(cx + 6, cy - 6, cx - 6, cy + 6, w + 1, INKW); return; }
        if (kind === 'Wink' && sd > 0) { ln(cx - 8, cy + 2, cx, cy - 3, w + 1, INKW); ln(cx, cy - 3, cx + 8, cy + 2, w + 1, INKW); return; }
        // fighters' eyes: narrower, a hard upper lid
        const big2 = kind === 'Zeros' || kind === 'Rings', rx = big2 ? 9 : 8, ry = kind === 'Zeros' ? 8 : 5;
        ellO(cx, cy, rx, ry, WHITE, 2);
        const px = cx + Math.max(-4, Math.min(4, lx)), py = cy + Math.max(-1, Math.min(2, ly));
        if (kind === 'Hearts') { for (let b = -5; b <= 5; b++) for (let a = -6; a <= 6; a++) { const X = a / 5, Y = -b / 5; if ((X * X + Y * Y - 1) ** 3 - X * X * Y * Y * Y <= 0) P(px + a, py + b, RED); } }
        else if (kind === 'Stars') { for (let k = -5; k <= 5; k++) { P(px + k, py, GOLD); P(px, py + k, GOLD); } for (let k = -3; k <= 3; k++) { P(px + k, py + k, GOLD); P(px + k, py - k, GOLD); } }
        else if (kind === 'Ats') { for (let k = 0; k < 40; k++) { const a = k * 0.45 + t * 4, r = k * 0.14; P(px + Math.cos(a) * r, py + Math.sin(a) * r, INKW); } }
        else if (kind === 'Rings') { ell(px, py, 4, 4, (x, y, e) => P(x, y, e > 0.35 ? INKW : SHIRTW)); P(px - 1, py - 2, WHITE); }
        else { const pr = kind === 'Zeros' ? 2 : kind === 'Equals' ? 3 : 3.5; ell(px, py, pr, pr, (x, y) => P(x, y, INKW)); P(px - 1, py - 2, WHITE); P(px - 2, py - 1, WHITE); }
        if (kind === 'Squint' || kind === 'Equals') for (let y = cy - ry - 1; y < cy - (kind === 'Squint' ? 0 : 1); y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) if (((x + 0.5 - cx) / (rx + 1)) ** 2 + ((y + 0.5 - cy) / (ry + 1)) ** 2 <= 1) P(x, y, SKINW);
        // the heavy upper lid, angled down towards the nose: a fighter's glare
        ln(cx - rx - 1, cy - ry - (sd < 0 ? 0 : 2) + (kind === 'Squint' || kind === 'Equals' ? ry : 0), cx + rx + 1, cy - ry - (sd < 0 ? 2 : 0) + (kind === 'Squint' || kind === 'Equals' ? ry : 0), w + 1, INKW);
      }
      function cMouth(kind, mx, my, open) {
        const w = OW;
        if (kind === 'Oh') { ellO(mx, my + 2, 5, 4 + open * 4, rgbw(120, 10, 30), 2); return; }
        if (kind === 'Kiss') { ellO(mx, my, 6, 4, RED, 2); ln(mx - 5, my, mx + 5, my, 1, rgbw(150, 10, 30)); return; }
        if (kind === 'Box' || kind === 'Zed') { const h = 4 + open * 6; ln(mx - 12, my - 3, mx + 12, my - 3, w, INKW); for (let y = my - 2; y < my + h; y++) for (let x = mx - 11; x <= mx + 11; x++) P(x, y, kind === 'Zed' ? WHITE : rgbw(120, 10, 30)); ln(mx - 12, my + h, mx + 12, my + h, w, INKW); ln(mx - 12, my - 3, mx - 12, my + h, w, INKW); ln(mx + 12, my - 3, mx + 12, my + h, w, INKW); if (kind === 'Zed') for (let k = -10; k <= 10; k += 4) ln(mx + k, my - 2, mx + k + 2, my + h - 1, 1, INKW); else ln(mx - 10, my - 1, mx + 10, my - 1, 2, WHITE); return; }
        if (kind === 'Grin' || kind === 'Cup' || kind === 'Tongue') {
          const h = (kind === 'Cup' ? 3 : 7) + open * 4;
          poly([[mx - 15, my - 4], [mx + 15, my - 4], [mx + 10, my + h * 0.7], [mx, my + h], [mx - 10, my + h * 0.7]], INKW);
          poly([[mx - 12, my - 2], [mx + 12, my - 2], [mx + 8, my + h * 0.6], [mx, my + h - 2], [mx - 8, my + h * 0.6]], rgbw(120, 10, 30));
          if (kind !== 'Cup') for (let x = mx - 11; x <= mx + 11; x++) { P(x, my - 2, WHITE); P(x, my - 1, WHITE); }
          if (kind === 'Tongue') ell(mx + side * 3, my + h - 2, 5, 4, (x, y) => P(x, y, RED));
          return;
        }
        if (kind === 'Vee') { ln(mx - 12, my + 3, mx, my - 3, w, INKW); ln(mx, my - 3, mx + 12, my + 3, w, INKW); return; }
        if (kind === 'Tilde') { for (let k = -12; k <= 12; k++) ln(mx + k, my + Math.sin(k * 0.6) * 2.5, mx + k + 1, my + Math.sin((k + 1) * 0.6) * 2.5, w, INKW); return; }
        if (kind === 'Smirk') { ln(mx - 10, my + 1, mx + 6, my + 1, w, INKW); ln(mx + 6, my + 1, mx + 12, my - 4, w, INKW); return; }
        if (kind === 'Double') { ln(mx - 10, my - 2, mx + 10, my - 2, w, INKW); ln(mx - 6, my + 3, mx + 6, my + 3, w, INKW); return; }
        ln(mx - 11, my + (open > 0.5 ? 1 : 0), mx + 11, my, w, INKW);
      }
      function cHair(cx, top, rx, t, ry) {
        const hc = HAIRW;
        // the accent becomes the hair (or what's on it)
        if (accent === 'Spikes') { for (let k = -3; k <= 3; k++) { poly([[cx + k * 9 - 8, top + 12], [cx + k * 9 + 8, top + 12], [cx + k * 10 + 2, top - 12 - (k & 1) * 4]], INKW); poly([[cx + k * 9 - 5, top + 10], [cx + k * 9 + 5, top + 10], [cx + k * 10 + 2, top - 9 - (k & 1) * 4]], hc); } }
        else if (accent === 'Curls') { for (let k = -3; k <= 3; k++) ellO(cx + k * 9, top + 4, 7, 6, hc, 2); }
        else if (accent === 'Bun') { ellO(cx, top - 8, 9, 8, hc, 2); }
        else if (accent === 'Cap') { poly([[cx - rx - 4, top + 12], [cx + rx + 4, top + 12], [cx + rx - 4, top - 8], [cx - rx + 4, top - 8]], INKW); poly([[cx - rx - 2, top + 10], [cx + rx + 2, top + 10], [cx + rx - 6, top - 6], [cx - rx + 6, top - 6]], SHIRTW); poly([[cx + side * (rx - 4), top + 8], [cx + side * (rx + 18), top + 12], [cx + side * (rx + 16), top + 15], [cx + side * (rx - 4), top + 13]], SHIRTDW); return; }
        else if (accent === 'Crown') { poly([[cx - 20, top + 8], [cx + 20, top + 8], [cx + 20, top - 12], [cx + 9, top - 4], [cx, top - 16], [cx - 9, top - 4], [cx - 20, top - 12]], INKW); poly([[cx - 18, top + 6], [cx + 18, top + 6], [cx + 18, top - 10], [cx + 9, top - 2], [cx, top - 14], [cx - 9, top - 2], [cx - 18, top - 10]], GOLD); }
        // a swept quiff over the top of the head for the rest, shaded in two tones
        const hl = (x) => top + 15 + (x - cx) * side * 0.22 - Math.abs(x - cx) * 0.1;
        ell(cx, top + ry, rx + 3 + OW, ry + 3 + OW, (x, y) => { if (y < hl(x) + OW) P(x, y, INKW); });
        ell(cx, top + ry, rx + 3, ry + 3, (x, y) => { if (y < hl(x)) P(x, y, (x - cx) * side > rx * 0.3 ? rgbw(...mixc(HAIR, [0, 0, 0], 0.35)) : hc); });
        if (accent === 'Fringe' || accent === 'Tildes') for (let k = -4; k <= 4; k++) poly([[cx + k * 7 - 4, top + 8], [cx + k * 7 + 4, top + 8], [cx + k * 7 + (accent === 'Tildes' ? Math.round(Math.sin(k + t * 3) * 2) : 2), top + 20]], hc);
        // a quiff swept up (none), a peak (caret), a kiss-curl on the forehead (apostrophe) or two of them (quotes)
        if (accent === 'None' || accent === 'Asterisk' || accent === 'Degree') { poly([[cx - 16 * side, top + 5], [cx + 20 * side, top - 3], [cx + 4 * side, top - 14]], INKW); poly([[cx - 14 * side, top + 4], [cx + 18 * side, top - 2], [cx + 4 * side, top - 12]], hc); }
        if (accent === 'Caret') { poly([[cx - 18, top + 6], [cx + 18, top + 6], [cx + side * 4, top - 16]], INKW); poly([[cx - 14, top + 6], [cx + 14, top + 6], [cx + side * 4, top - 12]], hc); }
        if (accent === 'Apostrophe' || accent === 'Quotes') for (const k of accent === 'Quotes' ? [-7, 7] : [0]) { const kx = cx + k + side * 6, ky = top + 19; for (let q = 0; q < 26; q++) { const a = q * 0.42, r = 5 - q * 0.17; ln(kx + Math.cos(a) * r, ky + Math.sin(a) * r, kx + Math.cos(a + 0.42) * (r - 0.17), ky + Math.sin(a + 0.42) * (r - 0.17), 2, hc); } }
        if (accent === 'Asterisk' || accent === 'Degree') { const sx = cx + rx - 8, sy = top + 4; if (accent === 'Asterisk') { for (let k = -4; k <= 4; k++) { P(sx + k, sy, GOLD); P(sx, sy + k, GOLD); P(sx + k, sy + k, GOLD); P(sx + k, sy - k, GOLD); } } else ell(sx, sy, 4, 4, (x, y, e) => { if (e > 0.4) P(x, y, GOLD); }); }
        for (let k = -2; k <= 1; k++) { const x0 = cx + k * 9 - side * 2; ln(x0, top - 1 + Math.abs(k) * 2, x0 + 6, top + 3 + Math.abs(k) * 2, 2, HAIRL); }   // shine
      }
      const select = (t, dir) => { slideAt = t; slideDir = dir; shake = 0.6; c.sound.hit('kick', 0.3); c.sound.note(keyRoot + 12, { dur: 0.08, vel: 0.08, wave: 'square', cutoff: 2400 }); };
      return {
        tap(clack, t) {
          // a press may start a drag along the roster or a hold: the next fighter only on a short, still release
          if (c.input.down) pending = [clack.x, clack.y]; else { typeFace(clack, t); select(t, 1); }
          return true;
        },
        paint(t, inp, gu, faceKey) {
          track(t);
          if (g.release && pending) { if (g.moved < 0.03 && t - g.t0 < 0.35) { typeFace({ x: pending[0], y: pending[1] }, t); select(t, 1); } pending = null; }
          // which box the cursor is on: this fighter's own, or the one a tap moved to; a drag carries it along the roster
          const mood = typed >= 0 && t - typedAt < 2.4;
          curGoal = mood ? 1 + (typed % 5) : 0;
          if (g.down && g.moved > 0.03) {
            const k = Math.max(0, Math.min(5, Math.floor((g.x * B - RX0) / RS)));
            if (k !== dragSlot) { dragSlot = k; c.sound.note(keyRoot + 7 + k, { dur: 0.05, vel: 0.06, wave: 'square', cutoff: 2000 }); }
            curGoal = k; lean += ((g.x - 0.5) * 0.5 - lean) * 0.3;
          } else lean *= 0.85;
          if (g.release && dragSlot >= 0) { if (g.moved >= 0.03 && dragSlot !== 0) { typeFace({ x: g.x, y: g.y }, t); select(t, g.x > g.x0 ? 1 : -1); } dragSlot = -1; }
          cur = curGoal;
          // held still: locked in (READY and a blazing aura); let go for FIGHT!
          const holding = g.down && g.moved < 0.03 && t - g.t0 > 0.4;
          if (holding && !held) { held = true; lockAt = t; c.sound.note(keyRoot, { dur: 0.6, vel: 0.08, wave: 'sawtooth', cutoff: 1500 }); c.sound.note(keyRoot + 7, { dur: 0.6, vel: 0.06, wave: 'square', cutoff: 1500, at: 0.1 }); }
          if (!g.down && held) { held = false; fightAt = t; shake = 1; c.sound.hit('kick', 0.5); c.sound.hit('snare', 0.3, { at: 0.08 }); [0, 4, 7, 12].forEach((s2, i2) => c.sound.note(keyRoot + 12 + s2, { dur: 0.12, vel: 0.07, wave: 'square', cutoff: 3000, at: 0.1 + i2 * 0.07 })); }
          shake = Math.max(0, shake - g.dt * 3);
          lastFaceKey = faceKey;
        },
        big(t) {
          const [eyeK, mouthK] = lastFaceKey.split('|');
          const aura = held ? Math.min(1, (t - lockAt) * 3) : 0, su = t - slideAt;
          const [hx0, hy0, rx0, ry0, tilt] = HG, rx = rx0, ry = ry0;
          // a new fighter slides in from the side, fast
          const slide = su >= 0 && su < 0.25 ? Math.round((1 - su / 0.25) ** 2 * 70 * slideDir) : 0;
          const jx = Math.round((shake > 0 ? Math.sin(t * 60) * 3 * shake : 0) + (aura > 0 ? Math.sin(t * 40) : 0)), cx = hx0 + jx + slide + Math.round(lean * 10), cy = hy0;
          const still = aura === 0 && jx === 0 && cx === hx0;
          if (still && BASE0) OUT.set(BASE0);
          else {
          OUT.set(GROUNDBUF);
          // the aura: flames licking up round the fighter, in the backdrop's colour turned to fire
          if (aura > 0) for (const pass of [0, 1, 2]) for (let k = 0; k < 36; k++) { const a = k / 36 * Math.PI * 2, f = (t * 2.2 + hsh(k, 3, 5)) % 1, r = (rx + 4 + hsh(k, 4, 5) * 8) * aura * (1.15 - pass * 0.12), x0 = cx + Math.cos(a) * r * 1.05, y0 = cy + 14 + Math.sin(a) * r * 1.25 - f * 26, sz = (1 - f) * (7 - pass * 2) + 1; ell(x0, y0, sz, sz * 1.6, (x, y) => P(x, y, pass === 0 ? GOLD2 : pass === 1 ? GOLD : rgbw(255, 250, 210))); }
          // shoulders and neck, the costume cel-shaded
          ell(cx - lean * 4 + 0, 136, 60, 40, (x, y) => P(x, y, INKW)); ell(cx, 137, 56, 36, (x, y) => P(x, y, (x - cx) * side > 18 ? SHIRTDW : (x - cx) * side < -30 ? SHIRTLW : SHIRTW));
          for (let y = cy + ry - 12; y < 106; y++) for (let x = cx - 10; x <= cx + 10; x++) P(x, y, Math.abs(x - cx) >= 9 ? INKW : (x - cx) * side > 2 ? SKIN2W : SKINW);
          // the head: a black outline round cel-shaded skin (a drop shadow, an inline or a cut line by finish)
          if (style === 'Shadow') ell(cx + 5, cy + 5, rx + OW, ry + OW, (x, y) => P(x, y, SHIRTDW));
          if (style === 'Broad Nib') ell(cx + 2, cy + 2, rx + OW + 1, ry + OW + 1, (x, y) => P(x + Math.round((y - cy) * tilt), y, INKW));   // a broad nib: the line swells on the shadow side
          ell(cx, cy, rx + OW, ry + OW, (x, y) => P(x + Math.round((y - cy) * tilt), y, INKW));
          ell(cx, cy, rx, ry, (x, y) => P(x + Math.round((y - cy) * tilt), y, skinCol(x, y, cx, cy, rx, ry)));
          if (style === 'Inline') ell(cx, cy, rx - 2, ry - 2, (x, y, e) => { if (e > 0.86) P(x + Math.round((y - cy) * tilt), y, WHITE); });
          if (style === 'Stencil') for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3; for (let r = -1; r <= OW + 1; r++) P(cx + Math.cos(a) * (rx + r), cy + Math.sin(a) * (ry + r), SKINW); }
          if (still) BASE0 = OUT.slice();
          }
          cHair(cx, cy - ry, rx, t, ry);
          for (const s2 of [-1, 1]) { ellO(cx + s2 * (rx + 1), cy + 2, 4, 7, s2 === side ? SKIN2W : SKINW, 2); }
          // the face
          const ex = Math.round(rx * 0.42), ey = cy - Math.round(ry * 0.1), my = cy + Math.round(ry * 0.52);
          const shut = ((t + blinkPh) % blinkGap) < 0.14 && eyeK !== 'Hearts';
          const lx = c.input.inside ? Math.round((c.input.x - 0.5) * 10) : Math.round(Math.sin(t * 0.6) * 2), ly = c.input.inside ? Math.round((c.input.y - 0.45) * 6) : 0;
          for (const [s2, x] of [[-1, cx - ex], [1, cx + ex]]) {
            const by = ey - 10, bw = Math.max(2, OW);
            if (brows === 'Macrons') ln(x - 8, by, x + 8, by, bw, INKW);
            else if (brows === 'Ticks') ln(x - s2 * 7, by + 3, x + s2 * 7, by - 2, bw, INKW);
            else if (brows === 'Tildes') for (let k = -8; k <= 8; k++) ln(x + k, by + Math.sin(k * 0.5) * 2, x + k + 1, by + Math.sin((k + 1) * 0.5) * 2, bw, INKW);
            else if (brows === 'Slants') ln(x - s2 * 8, by - 3, x + s2 * 8, by + 3, bw, INKW);
            cEye(eyeK, x, ey, s2, shut, lx, ly, t);
            if (glasses === 'Specs' || glasses === 'Pince-nez') { for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; ln(x + Math.cos(a) * 12, ey + Math.sin(a) * 9, x + Math.cos(a) * 12 + 1, ey + Math.sin(a) * 9, 2, INKW); } }
            else if (glasses === 'Square Specs') { ln(x - 12, ey - 8, x + 12, ey - 8, 3, INKW); ln(x - 12, ey + 8, x + 12, ey + 8, 3, INKW); ln(x - 12, ey - 8, x - 12, ey + 8, 3, INKW); ln(x + 12, ey - 8, x + 12, ey + 8, 3, INKW); }
            else if (glasses === 'Monocle' && s2 > 0) { for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2, a1 = a + Math.PI / 32; ln(x + Math.cos(a) * 12.5, ey + Math.sin(a) * 10.5, x + Math.cos(a1) * 12.5, ey + Math.sin(a1) * 10.5, 2, INKW); } ln(x + 9, ey + 8, x + 14, ey + 28, 1, GOLD); }
          }
          if (glasses === 'Specs' || glasses === 'Square Specs' || glasses === 'Pince-nez') ln(cx - ex + 12, ey - 2, cx + ex - 12, ey - 2, 2, INKW);
          const ny = Math.round((ey + my) / 2) + 1;
          if (nose === 'stop') ell(cx, ny, 2, 2, (x, y) => P(x, y, INKW));
          else if (nose === 'ell') { ln(cx + 2, ny - 7, cx - 2, ny + 3, 2, INKW); ln(cx - 2, ny + 3, cx + 4, ny + 3, 2, INKW); }
          else if (nose === 'vee') { ln(cx - 4, ny, cx, ny + 3, 2, INKW); ln(cx, ny + 3, cx + 4, ny, 2, INKW); }
          else if (nose === 'angle') { ln(cx + side * 3, ny - 6, cx - side * 3, ny + 1, 2, INKW); ln(cx - side * 3, ny + 1, cx + side * 3, ny + 3, 2, INKW); }
          else if (nose === 'pipe') ln(cx, ny - 6, cx, ny + 3, 2, INKW);
          if (cheeks === 'Blush') for (const s2 of [-1, 1]) ell(cx + s2 * (ex + 4), ey + 11, 5, 2, (x, y) => P(x, y, rgbw(240, 110, 110)));
          else if (cheeks === 'Asterisks') for (const s2 of [-1, 1]) { const x = cx + s2 * (ex + 6), y = ey + 11; ln(x - 3, y, x + 3, y, 1, INKW); ln(x, y - 3, x, y + 3, 1, INKW); }
          else if (cheeks === 'Commas') { const x = cx - side * (ex + 6), y = ey + 10; ln(x - 3, y - 3, x + 3, y + 3, 2, RED); ln(x - 3, y + 1, x + 1, y + 5, 1, RED); }   // a scar
          const talk = ((t + blinkPh) % 4) < 1.2, open = talk ? Math.abs(Math.sin(t * 10)) : 0;
          cMouth(aura > 0.5 ? 'Grin' : mouthK, cx, my, open);
          const cyc = my + 11;
          if (chin === 'Underscores') ln(cx - 3, cyc + 2, cx + 3, cyc + 2, 2, INKW);
          else if (chin === 'Stubble') for (let k = 0; k < 30; k++) P(cx + (hsh(k, 1, 2) - 0.5) * 30, cyc - 2 + hsh(k, 2, 2) * 8, INKW);
          else if (chin === 'Vees') for (const k of [-6, 0, 6]) { ln(cx + k - 2, cyc, cx + k, cyc + 2, 1, INKW); ln(cx + k, cyc + 2, cx + k + 2, cyc, 1, INKW); }
          else if (chin === 'Goatee') poly([[cx - 6, cyc - 2], [cx + 6, cyc - 2], [cx, cyc + 8]], HAIRW);
          else if (chin === 'Tilde') for (let k = -6; k <= 6; k++) P(cx + k, cyc + Math.round(Math.sin(k * 0.8)), INKW);
          // the name plate (square or rounded by finish), the round timer, the roster with its flashing cursor
          const nsc = NAME.length <= 5 ? 2 : 1, nw = NAME.length * 6 * nsc + 6, nx = side > 0 ? 8 + nw / 2 : B - 8 - nw / 2, nyy = 15;
          for (let y = nyy - 7 - nsc * 2; y <= nyy + 6 + nsc * 2; y++) for (let x = nx - nw / 2 - 2; x <= nx + nw / 2 + 2; x++) { const ex2 = Math.min(x - (nx - nw / 2 - 2), nx + nw / 2 + 2 - x), ey2 = Math.min(y - (nyy - 7 - nsc * 2), nyy + 6 + nsc * 2 - y); if (style !== 'Square' && ex2 + ey2 < 3) continue; P(x, y, ex2 < 1 || ey2 < 1 ? FRAMEC : rgbw(...mixc(BGT, [0, 0, 0], 0.5))); }
          text(NAME, nx, nyy, nsc, GOLD, GOLD2);
          const tm = String(99 - (Math.floor(t) % 100)).padStart(2, '0'), tx = side > 0 ? B - 22 : 22;
          text(tm, tx, 15, 2, WHITE, rgbw(200, 220, 255));
          for (let p = RY * B; p < B * B; p++) if (ROST[p]) OUT[p] = ROST[p];
          const bx0 = RX0 + cur * RS, blink = Math.floor(t * 6) & 1, cc = blink ? RED : GOLD;
          for (let y = RY - 1; y < RY + RS; y++) for (let x = bx0 - 1; x < bx0 + RS; x++) { const ed = Math.min(x - bx0 + 1, bx0 + RS - 1 - x, y - RY + 1, RY + RS - 1 - y); if (ed < 2) P(x, y, cc); }
          text('1P', bx0 + 9, RY - 6, 1, cc, cc);
          if (aura > 0) text('READY', 64, 50, 2, WHITE, GOLD);
          if (t - fightAt < 1.1) { const s2 = Math.min(1, (t - fightAt) * 8); text('FIGHT!', 64, 52, s2 > 0.5 ? 3 : 2, GOLD, GOLD2); }
          // the fleuron: a big ivy leaf on the fighter's chest, an emblem in the accent's colour (green if it has none)
          if (fleuron) { const lx = cx - side * 26, ly = 112, lc = grey(ACCc) ? rgbw(60, 170, 80) : rgbw(...ACCc), lf = (r) => [[lx - 9 - r, ly + 2], [lx - 4, ly - 8 - r], [lx, ly - 3], [lx + 4, ly - 8 - r], [lx + 9 + r, ly + 2], [lx, ly + 11 + r]];
            poly(lf(2), INKW); poly(lf(0), lc); ln(lx, ly - 2, lx, ly + 9, 1, INKW); }
          // the setting: italic slants the screen, sideways turns it a quarter
          if (setting === 'Italic') { for (let y = 0; y < B; y++) { const o = Math.round((64 - y) * 0.12); if (!o) continue; const row = OUT.slice(y * B, y * B + B); for (let x = 0; x < B; x++) { const sx = x - o; OUT[y * B + x] = sx >= 0 && sx < B ? row[sx] : DARK; } } }
          if (setting === 'Sideways') { const cp = OUT.slice(); for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) OUT[y * B + x] = cp[(B - 1 - x) * B + y]; }
          b32.set(OUT); bctx.putImageData(bimg, 0, 0);
          c.ctx.resetTransform(); c.ctx.imageSmoothingEnabled = false; c.ctx.drawImage(bigc, 0, 0, S, S);
        },
      };
      }
    })();
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
      // (pasted scraps only change when the pointer moves onto another one)
      const ptr = inp.inside ? (legend === 'Ransom Note' && !inp.down ? 'g' + LG.tapAt(Math.floor(inp.x * N), Math.floor(inp.y * N)) : legend === 'Dot Matrix' && !inp.down ? 'in' : Math.floor(inp.x * N) + ',' + Math.floor(inp.y * N)) : '';
      const gu = (t - glintAt) / 1.1, su = (t - scrollAt) / 1.6, fu = (t - spinAt) / 0.9;
      const key = [eyeNow, mouthNow, shut, W, shear[0], shear[63], anim, ptr, gu < 1 ? Math.floor(t * 20) : 0, shuffle, su < 1 ? Math.floor(su * 64) : 0, fu < 1 ? Math.floor(t * 12) : 0, legend === 'Ransom Note' ? Math.floor(t / 0.35) : legend !== 'None' ? Math.floor(t * 15) : 0, fleuron && (t + blinkPh) % 2.4 < 0.5 ? 1 : 0].join('|');
      if (key === lastKey && !(LG && inp.down)) return;
      lastKey = key;

      // the face, built in its own frame
      const Wb = style === 'Inline' && legend !== 'Gold Leaf' ? Math.max(W, 3) : W;
      const strokes = faceStrokes(t, eyeNow, mouthNow, shut, mood ? 1 : 0, Wb);
      F.fill(-1); grpOf.fill(-1);
      const fin = legend === 'Ransom Note' || legend === 'Gold Leaf' ? 'Square' : style;
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
        lastBoxes = boxes;
        const dragging = LG.drag, hov = dragging >= 0 ? dragging : inp.inside ? LG.tapAt(Math.floor(inp.x * N), Math.floor(inp.y * N)) : Math.floor(t / 0.7) % 14;
        // the scrap being carried is pasted last, so it lies on top
        const order = boxes.map((b, gp) => gp).filter(gp => boxes[gp] && gp !== dragging); if (dragging >= 0 && boxes[dragging]) order.push(dragging);
        for (const gp of order) {
          const bx = boxes[gp], o2 = LG.off[gp] || [0, 0];
          const role = gp === 2 || gp === 3 ? 1 : gp === 9 ? 2 : gp < 2 ? 0 : -1;   // eyes on black, the mouth on red, the brackets on newsprint
          const h = ((gp + 1) * 2654435761 + chipSeed + shuffle * 40503) >>> 0, chip = ((role >= 0 && !shuffle ? role : h) + (LG.shade[gp] || 0)) % CHIPS.length, jy = ((h >>> 8) % 3) - 1 + o2[1], jx = ((h >>> 12) % 3) - 1 + o2[0];
          const lift = gp === dragging ? 2 : gp === hov ? 1 : 0, pad = role === 1 || role === 2 ? 2 : 1 + ((h >>> 16) & 1);
          for (let y = bx[1] - pad; y <= bx[3] + pad; y++) for (let x = bx[0] - pad; x <= bx[2] + pad; x++) put(x + jx + 2 + lift, y + jy + 2 + lift, CHSH);
          for (let y = bx[1] - pad; y <= bx[3] + pad; y++) for (let x = bx[0] - pad; x <= bx[2] + pad; x++) put(x + jx - lift, y + jy - lift, CH0 + chip * 2);
          for (const s of strokes) if (s.grp === gp) {
            const br = s.fill ? [[0, 0]] : brushFor(s.w, 'Square');
            for (const [x, y] of s.cells) for (const [b2, b3] of br) put(x + b2 + jx - lift, y + b3 + jy - lift, CH0 + chip * 2 + 1);
          }
        }
      } else {
        if (style === 'Shadow' && legend !== 'Gold Leaf') { const sh = W >= 3 ? 2 : 1; stampAll(sh, sh, (s) => (s.col === INK ? ACC : INK)); }
        stampAll(0, 0, (s) => s.col);
        if (style === 'Inline' && legend !== 'Gold Leaf') for (const s of strokes) if (!s.fill && s.w >= 3) for (let i = 1; i < s.cells.length - 1; i++) put(s.cells[i][0], s.cells[i][1], -2);
        if (style === 'Stencil' && legend !== 'Gold Leaf') for (const s of strokes) {
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
      const scroll = !LG && su >= 0 && su < 1 ? Math.floor(su * N) : 0;
      if (LG) FM.fill(-1);
      for (let j = 0; j < N; j++) for (let i = N - 1; i >= 0; i--) {
        const v = F[j * N + i];
        if (v === -1) continue;
        let x = (i + shear[j] + scroll) % N, y = j;
        if (x < 0) x += N;
        if (setting === 'Sideways') { const xx = y; y = N - 1 - x; x = xx; }
        G[y * N + x] = v === -2 ? P0 : v;
        if (LG) FM[y * N + x] = v === -2 ? -1 : v;
      }
      if (LG) LG.paint(t, inp, gu, eyeNow + '|' + mouthNow);
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

      if (LG && LG.big) { LG.big(t); return; }   // the redesigned legendary draws on a finer bitmap of its own
      for (let p = 0; p < N * N; p++) { const cc = pal[G[p]], o = p * 4; px[o] = cc[0]; px[o + 1] = cc[1]; px[o + 2] = cc[2]; px[o + 3] = 255; }
      cellCtx.putImageData(img, 0, 0);
      g.resetTransform();
      g.imageSmoothingEnabled = false; g.drawImage(cv, 0, 0, S, S);
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
