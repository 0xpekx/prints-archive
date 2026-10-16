// One Mark: from D:/code/synaesthesia/public/drop03/pieces/056.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// One Mark: a flat silhouette with no face at all except one bold mark where
// the eyes would be, set as pixel art on a fixed 48-cell grid. The mark carries
// the whole expression; the silhouette (skull, jaw, hair or hat, shoulders)
// carries the character. Every shape is placed cell by cell: skulls and jaws are
// stepped profiles with clean runs, seams are one field-coloured cell wide, and
// the marks are small sprites. Motion moves in whole cells.
Proto.add({
  num: 56,
  name: 'One Mark',
  fam: 'Minimal & Geometric',
  recipe: 'Pixel art on a 48-cell grid: a one-colour silhouette on a flat field, faceless except for a single mark across the eyes, set cell by cell: a bar, a slash, a ring, a visor, a bolt and rarer ones. Skull, jaw, topper (hair or hat), shoulders, mark, scheme, pose, crop and field vary; the mark blinks and glances. Very rarely the silhouette is gold, night sky or static, or a small bird sits on the shoulder.',
  interactive: 'Tap the head to make it hop. Tap the background for ripples.',
  music: true,
  seed: 6101,
  make(c) {
    const ctx = c.ctx, S = c.size;  // S: canvas pixels; the art itself lives on the cell grid below

    // every draw hashes the token hash with a counter (FNV-1a, then a final avalanche)
    let calls = 0;
    const draw = () => {
      let h = 0x811c9dc5;
      const key = c.hash + ':' + (calls++);
      for (let ci = 0; ci < key.length; ci++) h = Math.imul(h ^ key.charCodeAt(ci), 0x01000193);
      h = Math.imul(h ^ (h >>> 16), 0x7feb352d); h = Math.imul(h ^ (h >>> 15), 0x846ca68b); h ^= h >>> 16;
      return (h >>> 0) / 2 ** 32;
    };
    const odds = (pairs) => {
      let all = 0; for (const p of pairs) all += p[1];
      let v = draw() * all;
      for (const p of pairs) { if (v < p[1]) return p[0]; v -= p[1]; }
      return pairs[0][0];
    };
    // the later axes roll from a PCG (RXS-M-XS) stream over the hash's fourth word, so the old draws stay put
    let pcg = parseInt(c.hash.slice(26, 34), 16) >>> 0;
    const pc = () => {
      pcg = Math.imul(pcg, 747796405) + 2891336453 >>> 0;
      const mixed = Math.imul(pcg ^ (pcg >>> ((pcg >>> 28) + 4)), 277803737) >>> 0;
      return ((mixed ^ (mixed >>> 22)) >>> 0) / 4294967296;
    };
    const weigh = (pairs) => {
      let all = 0; for (const p of pairs) all += p[1];
      let v = pc() * all;
      for (const p of pairs) { if (v < p[1]) return p[0]; v -= p[1]; }
      return pairs[0][0];
    };

    // the newest picks each hash their own key, so none of the streams above or below move
    const own = (key) => {
      let h = 0x811c9dc5;
      const s = c.hash + ':' + key;
      for (let ci = 0; ci < s.length; ci++) h = Math.imul(h ^ s.charCodeAt(ci), 0x01000193);
      h = Math.imul(h ^ (h >>> 16), 0x7feb352d); h = Math.imul(h ^ (h >>> 15), 0x846ca68b); h ^= h >>> 16;
      return (h >>> 0) / 2 ** 32;
    };

    // schemes: field, silhouette, mark
    const schemes = {
      Signal: ['#f4efe6', '#16161a', '#ff3b2f'], Pool: ['#2fc4b2', '#10302d', '#fff4d6'], Tangerine: ['#ff8a1f', '#1d1b3a', '#ffffff'],
      Bone: ['#16161a', '#efe8da', '#16161a'], Lilac: ['#c9b6ff', '#2b1f57', '#ffd93d'], Moss: ['#dfe7c4', '#2f4a2a', '#ff6f91'],
      Cobalt: ['#1f49d6', '#0c1442', '#7cf3ff'], Blush: ['#ffd1d6', '#7a1131', '#ffffff'], Gold: ['#0f0f12', '#c9a23c', '#0f0f12'],
      Mint: ['#bfeedd', '#123a33', '#ff4f6d'], Brick: ['#c9472f', '#2a1410', '#f6d8a8'], Ink: ['#f7f2e8', '#1d2a6b', '#ff9b21'],
      Mustard: ['#f2c230', '#1e1e1e', '#2f5be0'], Orchid: ['#3a1838', '#f29fc4', '#3a1838'], Ghost: ['#111114', '#111114', '#ece6d8'],
    };
    let scheme = odds([['Signal', 16], ['Pool', 13], ['Tangerine', 13], ['Bone', 11], ['Lilac', 12], ['Moss', 11], ['Cobalt', 11], ['Blush', 9], ['Gold', 4]]);
    const head = odds([['Round', 24], ['Capsule', 20], ['Block', 18], ['Bullet', 14], ['Tuft', 12], ['Sprout', 8], ['Spire', 4]]);
    let mark = odds([['Bar', 22], ['Slash', 15], ['Ring', 13], ['Arc', 12], ['Zigzag', 11], ['Cross', 9], ['Dot', 8], ['Wave', 6], ['Rainbow', 4]]);
    let pose = odds([['Square On', 50], ['Tilted', 30], ['Low', 20]]);
    let extra = odds([['None', 55], ['Horizon', 18], ['Sun', 15], ['Echo', 12]]);

    const tilt = pose === 'Tilted' ? (draw() < 0.5 ? -1 : 1) * (0.06 + draw() * 0.06) : 0;
    const hwRoll = draw(), hhRoll = draw(), eyeRoll = draw(), mwRoll = draw(), mtRoll = draw();
    const slashDir = draw() < 0.5 ? -1 : 1;
    const blinkEvery = 3.5 + draw() * 2.5, blinkOff = draw() * 3;
    const sunLeft = draw() < 0.5;

    // a later addition, rolled from its own mulberry32 over the hash's first word: a small pin on the shoulder
    let mb = (parseInt(c.hash.slice(2, 10), 16) ^ 0x5f356495) >>> 0;
    const mr = () => { mb = (mb + 0x6d2b79f5) | 0; let z = Math.imul(mb ^ (mb >>> 15), 1 | mb); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const pinRoll = mr();
    const pin = pinRoll < 0.6 ? 'None' : pinRoll < 0.74 ? 'Dot' : pinRoll < 0.86 ? 'Bolt' : pinRoll < 0.96 ? 'Star' : 'Gold Star';
    const pinSide = mr() < 0.5 ? -1 : 1, chirpRoot = 72 + Math.floor(mr() * 6);
    const cropRoll = mr();
    let crop = cropRoll < 0.44 ? 'Bust' : cropRoll < 0.78 ? 'Close-up' : 'Far';
    if (crop === 'Bust' && own('crop2') < 0.3) crop = 'Off-centre';   // the bust set to one side, a third of the field left open

    // the newer axes: what tops the head, how the shoulders are cut, and more marks, schemes and fields
    if (pc() < 0.3) scheme = weigh([['Mint', 24], ['Brick', 22], ['Ink', 24], ['Mustard', 18], ['Orchid', 10], ['Ghost', 4]]);
    if (pc() < 0.36) mark = weigh([['Visor', 14], ['Chevron', 16], ['Crescent', 14], ['Bolt', 12], ['Keyhole', 10], ['Spiral', 10], ['Heart', 8], ['Glitch', 8], ['Eye', 5]]);
    if (pc() < 0.32) extra = weigh([['Stripe', 26], ['Arch', 24], ['Split', 26], ['Dots', 24]]);
    let topper = weigh([['None', 30], ['Quiff', 11], ['Afro', 10], ['Ponytail', 9], ['Topknot', 8], ['Cap', 9], ['Beanie', 8], ['Antenna', 6], ['Horns', 4], ['Top Hat', 3], ['Halo', 2]]);
    const shoulders = weigh([['Round', 32], ['Square', 18], ['Sloped', 16], ['High Collar', 13], ['Hooded', 11], ['Turtleneck', 10]]);
    if (head === 'Tuft' || head === 'Spire' || head === 'Sprout') topper = 'None';
    if (shoulders === 'Hooded' && topper !== 'Halo') topper = 'None';
    // more hair and hats, so fewer busts are a bare dome
    if (topper === 'None' && shoulders !== 'Hooded' && head !== 'Tuft' && head !== 'Spire' && head !== 'Sprout' && own('topper2') < 0.75)
      topper = ['Bob', 'Long Hair', 'Space Buns', 'Mohawk', 'Beret'][Math.floor(own('topper2-kind') * 5)];
    const earRoll = pc();
    let ears = shoulders === 'Hooded' || topper === 'Afro' || topper === 'Bob' || topper === 'Long Hair' || head === 'Spire' ? 'None' : earRoll < 0.64 ? 'None' : earRoll < 0.88 ? 'Round' : 'Pointed';
    const side = pc() < 0.5 ? -1 : 1;
    // more poses: some square-on busts turn to one side or shrug, and each pose sets its own shoulders
    if (pose === 'Square On') { const v = own('pose2'); if (v < 0.25) pose = 'Turned'; else if (v < 0.5) pose = 'Shrug'; }
    const songStep = [0, 2, 4, 7, 9, 12, 14];

    // the pixel pass's own axis (the jaw) and the legendaries, from a splitmix32 over the hash's seventh word
    let xs = (parseInt(c.hash.slice(50, 58), 16) ^ 0x2545f491) >>> 0;
    const xr = () => {
      xs = (xs + 0x9e3779b9) >>> 0;
      let z = xs; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); z ^= z >>> 15;
      return (z >>> 0) / 4294967296;  // splitmix32 out
    };
    const legRoll = xr(), itemRoll = xr();
    const legend = legRoll < 0.0009 ? 'Gilded' : legRoll < 0.0017 ? 'Night Sky' : legRoll < 0.0025 ? 'Static' : 'None';
    const bird = itemRoll < 0.005;
    const jaw = (() => { const v = xr(); return v < 0.38 ? 'Soft' : v < 0.64 ? 'Square' : v < 0.86 ? 'Pointed' : 'Long'; })();
    const starSeed = xr();
    // the 4,000-mint axes, from the same stream after everything above: neckwear, earrings and the mark's ink
    const neckwear = (() => { const v = xr(); return v < 0.4 ? 'None' : v < 0.54 ? 'Scarf' : v < 0.66 ? 'Bow Tie' : v < 0.78 ? 'Tie' : v < 0.9 ? 'Pendant' : 'Bandana'; })();
    const earV = xr();
    const earring = shoulders === 'Hooded' ? 'None' : earV < 0.52 ? 'None' : earV < 0.68 ? 'Stud' : earV < 0.82 ? 'Hoop' : earV < 0.94 ? 'Drop' : 'Feather';
    // an earring hangs from an ear: where none was drawn (and no hair covers the ear), a small round one is added
    if (earring !== 'None' && ears === 'None' && topper !== 'Afro' && topper !== 'Bob' && topper !== 'Long Hair') ears = 'Round';
    // the mark's ink: the scheme's own most of the time; otherwise only an ink that stands out from the silhouette
    const hex0 = (h) => [1, 3, 5].map(o => parseInt(h.substr(o, 2), 16));
    const lum = (q) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(q[0]) + 0.7152 * f(q[1]) + 0.0722 * f(q[2]); };
    const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const INKS = { Ember: ['#ff5a2a', '#c2321a'], Ice: ['#9ff0ff', '#1f6f8f'], Lime: ['#c8ff3d', '#4d7a0c'], Violet: ['#b78cff', '#5a2fa8'], Brass: ['#ffd34d', '#8a6a10'] };
    const under = hex0(schemes[scheme][scheme === 'Ghost' ? 0 : 1]), lightUnder = scheme !== 'Ghost' && lum(under) > 0.2;
    const inkV = xr();
    const inkOK = Object.keys(INKS).filter(n => contrast(hex0(INKS[n][lightUnder ? 1 : 0]), under) >= 4.5 && contrast(hex0(INKS[n][lightUnder ? 1 : 0]), hex0(schemes[scheme][2])) >= 1.6);
    const inkWas = inkV < 0.34 ? 'Scheme' : ['Ember', 'Ice', 'Lime', 'Violet', 'Brass'][Math.min(4, Math.floor((inkV - 0.34) / 0.132))];
    const markInk = inkWas === 'Scheme' || !inkOK.length || own('ink2') >= 0.46 ? 'Scheme' : inkOK.includes(inkWas) ? inkWas : inkOK[Math.floor(own('ink3') * inkOK.length)];
    // two-tone: the hair or hat a step lighter or darker than the body, so a topper reads as hair, not a lump
    const tone = legend === 'None' && scheme !== 'Ghost' && shoulders !== 'Hooded' && ((topper !== 'None' && topper !== 'Halo') || head === 'Tuft' || head === 'Sprout') && own('tone') < 0.42 ? 'Two-tone' : 'One colour';

    c.trait('Scheme', scheme);
    c.trait('Silhouette', head);
    c.trait('Jaw', jaw);
    c.trait('Topper', topper);
    c.trait('Mark', mark);
    c.trait('Shoulders', shoulders);
    c.trait('Pose', pose);
    c.trait('Crop', crop);
    c.trait('Field Mark', extra);
    c.trait('Pin', pin);
    c.trait('Neckwear', neckwear);
    c.trait('Earring', earring);
    c.trait('Mark Ink', markInk);
    c.trait('Ears', ears);
    c.trait('Tone', tone);
    if (legend !== 'None') c.trait('Legendary', legend);  // a legendary names itself
    if (bird) c.trait('Rare Item', 'Shoulder Bird');

    // ---------- palette (indices into one small table) ----------
    const hex = (h) => [1, 3, 5].map(o => parseInt(h.substr(o, 2), 16));
    const mix = (a, b, u) => [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * u));
    const [FIELD, BODY, MARK0] = schemes[scheme].map(hex);
    // a new ink for the mark: bright on a dark silhouette, deep on a light one (Ghost draws its mark on the dark field)
    const MARK = markInk === 'Scheme' ? MARK0 : hex(INKS[markInk][lightUnder ? 1 : 0]);
    const ghost = scheme === 'Ghost';
    const pal = [
      FIELD, mix(FIELD, ghost ? MARK : BODY, 0.13), BODY, MARK, mix(MARK, [255, 255, 255], 0.55), mix(MARK, ghost ? FIELD : BODY, 0.55),
      hex('#e2b84a'), hex('#fff0b0'),
      hex('#ff4d4d'), hex('#ff9f1c'), hex('#ffe14d'), hex('#3ddc84'), hex('#3d8bff'), hex('#9b5de5'),
      hex('#4a2c0c'), hex('#a8741f'), hex('#dcaa45'), hex('#fff1bd'),
      hex('#0b0d2a'), hex('#1d2560'), hex('#fff6d8'), hex('#8a90d8'),
      hex('#1e1e24'), hex('#6c6c7a'), hex('#d6d6de'),
      hex('#fbfbf7'),
      lum(BODY) < 0.18 ? mix(BODY, [255, 255, 255], 0.26) : mix(BODY, [0, 0, 0], 0.3),   // 26: the second tone, for hair and hats
    ];
    const C_T = 26;
    const C_F = 0, C_F2 = 1, C_B = 2, C_M = 3, C_MH = 4, C_MD = 5, C_GOLD = 6, C_GOLDHI = 7;
    const MK = legend === 'Gilded' ? 14 : C_M;

    // ---------- the grid and the figure's measurements (in cells) ----------
    const N = 48, CX = crop === 'Off-centre' ? (own('crop2-side') < 0.5 ? 17 : 31) : 24;
    const k = crop === 'Close-up' ? 1.4 : crop === 'Far' ? 0.7 : 1;
    const q = (v) => Math.round(v * k);
    const A = Math.round((8.6 + hwRoll * 1.9) * k);
    let Hb = Math.round((20 + hhRoll * 3) * k);
    if (jaw === 'Long') Hb += q(2);
    const J = Math.round(Hb * 0.38);
    let D, tall = 0;
    if (head === 'Capsule') { D = A; tall = q(1); }
    else if (head === 'Block') D = 2;
    else if (head === 'Bullet') { D = Math.round(A * 1.35); tall = q(3); }
    else if (head === 'Spire') { D = 2 * (A - 1) + 1; tall = q(6); }
    else D = Math.round(A * 0.95);
    const sideRows = Math.max(1, Hb + tall - D - J);
    const rows = D + sideRows + J;
    // the head as a profile of half widths, one per row: a dome, straight sides, then the jaw
    const P = new Int16Array(rows);
    for (let r = 0; r < D; r++) {
      if (head === 'Block') P[r] = A - 2 + r;
      else if (head === 'Spire') P[r] = Math.min(A, 1 + (r >> 1));
      else { const v = (D - r - 0.5) / D; P[r] = Math.max(1, Math.round(A * Math.sqrt(Math.max(0, 1 - v * v)))); }
    }
    for (let r = D; r < D + sideRows; r++) P[r] = A;
    // the neck, and a chin that always ends a cell wider than it on each side, so the jaw line reads and the neck stays short
    const neck0 = Math.max(2, Math.round(A * 0.4)), chinMin = neck0 + 1;
    for (let j = 0; j < J; j++) {
      const u = (j + 0.5) / J;
      let w;
      if (jaw === 'Soft') { const cc = Math.max(chinMin, Math.round(A * 0.42)); w = cc + (A - cc) * (1 - Math.pow(u, 2.2)); }
      else if (jaw === 'Square') w = Math.max(chinMin, j < J - 3 ? A : A - (j - (J - 4)));
      else if (jaw === 'Pointed') { const cc = chinMin; w = cc + (A - cc) * Math.pow(1 - u, 0.9); }
      else { const cc = Math.max(chinMin, Math.round(A * 0.36)); w = cc + (A - cc) * (1 - Math.pow(u, 1.5)); }
      P[D + sideRows + j] = Math.min(A, Math.round(w));
    }
    const chin = (crop === 'Close-up' ? 36 : crop === 'Far' ? 37 : 30) + (pose === 'Low' ? q(4) : 0);
    const top = chin - rows + 1;
    const eyeRow = chin - Math.round(Hb * (0.52 + eyeRoll * 0.08));
    const nh = neck0 + (shoulders === 'Turtleneck' ? q(2) : 0);
    const neckVis = Math.max(1, q(2));
    const sy = chin + 1 + neckVis;
    const SW = shoulders === 'Sloped' ? q(18) : q(21);
    const mt = Math.max(2, Math.round((2.5 + mtRoll * 1.4) * k));
    const mw = 2 * Math.round(A * (0.62 + mwRoll * 0.18));
    const big = k > 1.2, small = k < 0.8;

    // ---------- cell helpers ----------
    const inb = (i, j) => i >= 0 && i < N && j >= 0 && j < N;
    const setc = (L, i, j, v) => { if (inb(i, j)) L[j * N + i] = v; };
    const span = (L, j, x0, x1, v) => { if (j < 0 || j >= N) return; for (let i = Math.max(0, x0); i < Math.min(N, x1); i++) L[j * N + i] = v; };
    const sym = (L, j, w, v) => span(L, j, CX - w, CX + w, v);
    const mx = (d, s) => s > 0 ? CX + d : CX - 1 - d;            // cell d to one side of the centre line
    const sideSpan = (L, j, d0, d1, s, v) => { for (let d = d0; d < d1; d++) setc(L, mx(d, s), j, v); };
    const disc = (L, cx, cy, r, v) => {
      for (let j = Math.floor(cy - r - 1); j <= Math.ceil(cy + r + 1); j++) for (let i = Math.floor(cx - r - 1); i <= Math.ceil(cx + r + 1); i++) {
        const dx = i + 0.5 - cx, dy = j + 0.5 - cy; if (dx * dx + dy * dy <= r * r) setc(L, i, j, v);
      }
    };
    const poly = (L, pts, v) => {
      let x0 = 99, x1 = -99, y0 = 99, y1 = -99;
      for (const [a, b] of pts) { x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
      for (let j = Math.floor(y0); j <= Math.ceil(y1); j++) for (let i = Math.floor(x0); i <= Math.ceil(x1); i++) {
        const px = i + 0.5, py = j + 0.5; let inside = false;
        for (let a = 0, b = pts.length - 1; a < pts.length; b = a, a++) {
          const [xa, ya] = pts[a], [xb, yb] = pts[b];
          if ((ya > py) !== (yb > py) && px < (xb - xa) * (py - ya) / (yb - ya) + xa) inside = !inside;
        }
        if (inside) setc(L, i, j, v);
      }
    };

    // ---------- the mark, as a sprite of cells around its centre ----------
    const sprite = (rowsStr, out, colFor) => {
      const h = rowsStr.length, w = rowsStr[0].length;
      for (let r = 0; r < h; r++) for (let i = 0; i < w; i++) { const ch = rowsStr[r][i]; if (ch !== '.') out.push([i - (w >> 1), r - (h >> 1), colFor(ch)]); }
    };
    const BM = {
      heart: ['.##..##.', '#o######', '########', '########', '.######.', '..####..', '...##...'],
      heartL: ['.###..###.', '#o########', '##########', '##########', '##########', '.########.', '..######..', '...####...', '....##....'],
      ringS: ['..####..', '.######.', '##....##', '##....##', '##....##', '##....##', '.######.', '..####..'],
      ring: ['...####...', '.########.', '.##....##.', '##......##', '##......##', '##......##', '##......##', '.##....##.', '.########.', '...####...'],
      ringL: ['....####....', '..########..', '.###....###.', '.##......##.', '##........##', '##........##', '##........##', '##........##', '.##......##.', '.###....###.', '..########..', '....####....'],
      dotS: ['.##.', '####', '####', '.##.'],
      dot: ['..##..', '.####.', '######', '######', '.####.', '..##..'],
      dotL: ['..####..', '.######.', '########', '########', '########', '########', '.######.', '..####..'],
      keyS: ['.##.', '####', '####', '.##.', '.##.', '####'],
      key: ['.####.', '######', '######', '######', '.####.', '..##..', '..##..', '.####.', '.####.'],
      keyL: ['..####..', '.######.', '########', '########', '########', '.######.', '..####..', '...##...', '...##...', '..####..', '..####..', '.######.'],
      eyeS: ['...####...', '.##....##.', '#........#', '.##....##.', '...####...'],
      eye: ['....######....', '..##......##..', '.#..........#.', '#............#', '.#..........#.', '..##......##..', '....######....'],
      eyeL: ['......######......', '...###......###...', '..#............#..', '.#..............#.', '#................#', '.#..............#.', '..#............#..', '...###......###...', '......######......'],
    };

    // ---------- the head group at rest: neck, ears, skull, head extras and toppers (no ponytail) ----------
    const H0 = new Uint8Array(N * N), seam0 = new Uint8Array(N * N), TP0 = new Uint8Array(N * N);
    for (let j = chin - 3; j <= sy + 3; j++) sym(H0, j, nh, 1);
    for (let r = 0; r < rows; r++) sym(H0, top + r, P[r], 1);
    const SK0 = H0.slice();   // the bare skull and neck
    if (shoulders === 'Turtleneck') sym(seam0, chin + Math.max(1, neckVis - 1), nh - 1, 1);
    // turned: a nose and brow step out on the side it faces, and only the far ear shows
    const turned = pose === 'Turned';
    if (turned) {
      const nr = eyeRow - top;
      for (const [dr, w] of [[-1, 1], [0, 1], [1, 1], [2, 2], [3, 2], [4, 1]]) { const r = nr + q(dr), rr = Math.max(0, Math.min(rows - 1, r)); sideSpan(H0, top + r, P[rr], P[rr] + Math.max(1, q(w)), side, 1); }
    }
    if (ears !== 'None') for (const s of [-1, 1]) {
      if (turned && s === side) continue;
      if (ears === 'Round') { const R = q(2); for (let dy = -R; dy <= R; dy++) sideSpan(H0, eyeRow + 1 + dy, A, A + (Math.abs(dy) === R ? 1 : q(2)), s, 1); }
      else for (const [dy, d0, d1] of [[2, 0, 1], [1, 0, 2], [0, 0, 2], [-1, 0, 3], [-2, 0, 3], [-3, 1, 4], [-4, 2, 4], [-5, 3, 4]]) sideSpan(H0, eyeRow + 1 + dy, A + d0, A + d1, s, 1);
    }
    const hooded = shoulders === 'Hooded';
    const streak = 26 + Math.floor(starSeed * 12);
    // hair and hats go on their own layer (TP0), so a two-tone figure can colour them apart; tufts and sprouts count as hair
    if (head === 'Tuft' && !hooded) for (const [dy, d0, d1] of [[-1, -2, 3], [-2, 0, 4], [-3, 2, 5], [-4, 4, 6]]) sideSpan(TP0, top + dy, d0, d1, side, 1);
    if (head === 'Sprout' && !hooded) {
      const SP = ['.##.........', '####.....##.', '#####...####', '.####..#####', '...######...', '.....##.....', '.....##.....'];
      for (let r = 0; r < SP.length; r++) for (let i = 0; i < 12; i++) if (SP[r][side > 0 ? i : 11 - i] === '#') setc(TP0, CX - 6 + i, top - SP.length + r, 1);
    }
    const hairTo = eyeRow - Math.max(2, q(2)) - (mark === 'Arc' || mark === 'Rainbow' ? q(3) : 0);   // a fringe stops above the mark
    if (topper === 'Quiff') {   // hair swept up off the brow: a cap that stops above the mark, a lifted front, a notch at the parting
      let mTop = 0, mHalf = 0; for (let s = 0; s < 16; s++) for (const cl of markCells(s * 0.25, 0)) { mTop = Math.min(mTop, cl[1]); mHalf = Math.max(mHalf, cl[0] + 1, -cl[0]); }
      const quiffTo = Math.min(hairTo, eyeRow + mTop - 2), L = Math.max(3, q(5));
      for (let j = top - 1; j <= quiffTo; j++) { const r = j - top; sym(TP0, j, r < 0 ? Math.max(1, P[0] - 1) : P[Math.min(rows - 1, r)] + 1, 1); }
      poly(TP0, [[-0.85, 0.5], [-0.62, -0.12], [-0.38, -0.3], [-0.2, -0.06], [0.08, -0.62], [0.5, -1], [0.88, -1], [1.14, -0.66], [1.2, -0.12], [1.02, 0.5], [0.6, 0.95], [-0.6, 0.95]].map(([a, b]) => [CX + side * a * A, top + b * L]), 1);
      for (let p = (quiffTo + 1) * N; p < N * N; p++) TP0[p] = 0;
      // short sides down past the hairline, only where they keep clear of the mark (turned or glancing too)
      const sw0 = Math.max(2, q(2)), mh = mHalf + (turned && mark !== 'Visor' ? Math.max(1, Math.round(A * 0.22)) : 0) + 2;
      for (let j = quiffTo + 1; j <= quiffTo + Math.max(2, q(3)); j++) { const w = P[Math.max(0, Math.min(rows - 1, j - top))] + 1; if (w - sw0 >= mh + 2) for (const s of [-1, 1]) sideSpan(TP0, j, w - sw0, w, s, 1); }
      const px = Math.round(CX - side * A * 0.16);
      for (let d = 0; d < Math.max(2, q(2)); d++) setc(seam0, px + side * d, top - Math.round(L * 0.12) + d, 1);
    } else if (topper === 'Afro') {
      const cy = top + rows * 0.3;
      disc(TP0, CX, cy, A * 1.08, 1);
      for (let b = 0; b < 7; b++) { const th = (-90 + b * 30) * Math.PI / 180; disc(TP0, CX + Math.sin(th) * A * 0.86, cy - Math.cos(th) * A * 0.86, A * 0.5, 1); }
    } else if (topper === 'Topknot') {
      disc(TP0, CX, top - 2.6 * k, 2.7 * k, 1); sym(TP0, top - 1, Math.max(1, q(1.5)), 1); sym(TP0, top, Math.max(1, q(1.5)) + 1, 1);
    } else if (topper === 'Cap') {
      const bot = top + Math.round(rows * 0.22);
      sym(TP0, top - 1, P[0] - 1, 1);
      for (let j = top; j <= bot; j++) sym(TP0, j, P[j - top] + 1, 1);
      sideSpan(TP0, bot, Math.round(A * 0.2), P[bot - top] + 1 + q(5), side, 1);
      sideSpan(TP0, bot - 1, Math.round(A * 0.2), P[bot - 1 - top] + 1 + q(3), side, 1);
    } else if (topper === 'Beanie') {
      const bot = top + Math.round(rows * 0.3), cuff = Math.max(2, q(2));
      sym(TP0, top - 2, Math.max(1, P[0] - 3), 1); sym(TP0, top - 1, P[0], 1);
      for (let j = top; j <= bot; j++) sym(TP0, j, P[j - top] + 1, 1);
      sym(seam0, bot - cuff, P[bot - cuff - top], 1);
      disc(TP0, CX, top - 2 - 1.6 * k, 2.2 * k, 1);
    } else if (topper === 'Antenna') {
      const Lh = q(6), th = big ? 2 : 1;
      for (let i = 0; i < Lh; i++) sideSpan(TP0, top - 1 - i, 1 + (i >> 1), 1 + (i >> 1) + th, side, 1);
      const bd = 1 + (Lh >> 1); disc(TP0, side > 0 ? CX + bd + 0.5 + (th - 1) * 0.5 : CX - bd - 0.5 - (th - 1) * 0.5, top - Lh - 1, 1.6 * k + 0.1, 1);
    } else if (topper === 'Horns') {
      const Lh = q(6);
      for (const s of [-1, 1]) for (let i = 0; i <= Lh; i++) {
        const u = i / Lh, d0 = Math.round(A * (0.3 + 0.5 * u));
        sideSpan(TP0, top + q(1) - i, d0, d0 + Math.max(1, Math.round(A * 0.42 * (1 - u * 0.85))), s, 1);
      }
    } else if (topper === 'Top Hat') {
      const cw = Math.round(A * 0.68), ch = q(7);
      for (let j = top - ch; j <= top; j++) sym(TP0, j, cw, 1);
      sym(TP0, top, Math.round(A * 1.12), 1); sym(TP0, top - 1, Math.round(A * 1.12) - 1, 1);
      sym(seam0, top - 2 - (big ? 1 : 0), cw - 1, 1);
    } else if (topper === 'Bob') {   // a rounded cap of hair, square-cut at the jaw, standing a cell proud of the head
      const bot = chin - Math.round(J * 0.35);
      sym(TP0, top - 1, Math.max(1, P[0] - 1), 1);
      for (let j = top; j <= bot; j++) { const w = P[j - top] + Math.max(1, q(1)); if (j <= hairTo) sym(TP0, j, w, 1); else { sideSpan(TP0, j, w - Math.max(2, q(3)), w, -1, 1); sideSpan(TP0, j, w - Math.max(2, q(3)), w, 1, 1); } }
    } else if (topper === 'Long Hair') {   // a cap, and two lengths falling past the jaw onto the shoulders
      const bot = sy + q(5);
      sym(TP0, top - 1, Math.max(1, P[0] - 1), 1);
      for (let j = top; j <= bot; j++) {
        const r = j - top, w = r < rows ? P[r] + Math.max(1, q(1)) : A - q(1);
        if (j <= hairTo) sym(TP0, j, w, 1);
        else { const inner = r < rows ? Math.min(P[r], w) - Math.max(2, q(2)) : nh + 1; for (const s of [-1, 1]) sideSpan(TP0, j, Math.max(nh + 1, inner), Math.max(nh + 2, w), s, 1); }
      }
    } else if (topper === 'Space Buns') {
      for (const s of [-1, 1]) disc(TP0, CX + s * A * 0.72, top + A * 0.18, 2.6 * k + 0.2, 1);
      sym(TP0, top - 1, Math.max(1, P[0] - 1), 1); for (let j = top; j < top + Math.min(D, 3); j++) sym(TP0, j, P[j - top] + 1, 1);
    } else if (topper === 'Mohawk') {   // a stepped fin from brow to crown
      const fin = q(7), w = Math.max(2, q(2));
      for (let i = 1; i <= fin; i++) { const hw = Math.max(1, Math.round(w * (1 - 0.5 * i / fin))), o = (i % 3 === 0 ? side : 0) + Math.round(i * 0.3) * side; span(TP0, top - i, CX - hw + o, CX + hw + o - (i === fin ? 1 : 0), 1); }
      for (let j = top; j < top + 2; j++) sym(TP0, j, Math.max(1, q(2)), 1);
    } else if (topper === 'Beret') {   // a soft flat disc worn over one ear, with a stalk
      const off = side * Math.round(A * 0.3), bw = A + q(2);
      for (let dy = -2; dy <= 1; dy++) { const w = dy === -2 ? bw - q(3) : dy === 1 ? bw - q(1) : bw; span(TP0, top + dy, CX - w + off, CX + w + off, 1); }
      for (let j = top + 2; j < top + 2 + q(1); j++) sym(TP0, j, P[Math.min(rows - 1, j - top)], 1);
      setc(TP0, CX + off, top - 3, 1); setc(TP0, CX + off + side, top - 4, 1);
    }
    for (let p = 0; p < N * N; p++) if (TP0[p]) H0[p] = 1;
    const halo = topper === 'Halo';
    // the cells of the head group, listed once so each frame only moves them
    const headList = [], seamList = [];
    for (let p = 0; p < N * N; p++) { if (H0[p]) headList.push(p); if (seam0[p]) seamList.push(p); }
    const twoTone = tone === 'Two-tone', toneList = twoTone ? headList.filter(p => TP0[p] && (Math.floor(p / N) <= hairTo || !SK0[p] || topper === 'Bob' || topper === 'Long Hair' || topper === 'Quiff')) : [];   // never over the face around the mark
    const markShift = turned && mark !== 'Visor' ? side * Math.max(1, Math.round(A * 0.22)) : 0;

    // ---------- the shoulders: half widths per row from sy down ----------
    const shoulderW = (() => {
      const out = [];
      let w = nh + Math.max(1, q(2)), i = 0, reach = -1;
      const steps = pose === 'Shrug' ? [4, 4, 3, 3, 2, 2, 1].map(v => Math.max(1, q(v))) : shoulders === 'Square' ? [q(3), Math.max(1, SW - 1 - nh - Math.max(1, q(2)) - q(3)), 1]
        : shoulders === 'Sloped' ? [2, 2, 2, 2, 2, 2, 2, 2, 1, 1].map(v => Math.max(1, q(v)))
        : [3, 3, 3, 2, 2, 1, 1].map(v => Math.max(1, q(v)));
      for (let r = 0; r < N; r++) {
        if (w >= SW && reach < 0) reach = r;
        out.push(Math.min(SW, w) + (reach >= 0 ? Math.floor((r - reach) / 5) : 0));
        if (i < steps.length) w += steps[i++];
      }
      return out;
    })();
    const Ah = A + q(3), hoodTop = top - q(2);

    function markCells(t0, look) {
      const out = [], add = (dx, dy, col) => out.push([dx, dy, col === undefined ? MK : col]);
      const h2 = mw >> 1;
      let centre = true;
      if (mark === 'Bar') { for (let y = 0; y < mt; y++) for (let x = -h2; x < h2; x++) add(x, y); }
      else if (mark === 'Slash') { for (let x = -h2; x < h2; x++) { const off = Math.floor((x + h2) / 3) * slashDir; for (let y = 0; y < mt; y++) add(x, y + off); } }
      else if (mark === 'Ring') sprite(big ? BM.ringL : small || mt < 3 ? BM.ringS : BM.ring, out, () => MK);
      else if (mark === 'Arc') {
        const ra = Math.round(mw * 0.48), th = Math.max(2, mt - 1);
        for (let y = -ra; y < 0; y++) for (let x = -ra; x < ra; x++) { const d = Math.hypot(x + 0.5, y + 0.5); if (d < ra && d >= ra - th && y + 0.5 < -ra * 0.45) add(x, y); }
      } else if (mark === 'Zigzag') {
        const a = Math.max(2, mt);
        for (let x = -h2; x < h2; x++) { const p = (x + h2) % (2 * a), y = p < a ? p : 2 * a - p; add(x, y); add(x, y + 1); if (mt >= 4) add(x, y + 2); }
      } else if (mark === 'Cross') {
        const R = mt + 1;
        for (let y = -R; y < R; y++) for (let x = -R; x < R; x++) if (Math.abs(Math.abs(x + 0.5) - Math.abs(y + 0.5)) < (mt >= 4 ? 1.5 : 1)) add(x, y);
      } else if (mark === 'Dot') {
        sprite(big ? BM.dotL : small ? BM.dotS : BM.dot, out, () => MK);
        for (const cl of out) cl[0] += Math.round(mw * 0.18);
        centre = false;
      } else if (mark === 'Wave') {
        const a = mt * 0.5 + 0.5, ph = Math.floor(t0 * 4) * Math.PI / 8;
        let prev = null;
        for (let x = -h2; x < h2; x++) {
          const y = Math.round(Math.sin((x + h2) / mw * Math.PI * 3 + ph) * a);
          const lo = prev === null ? y : Math.min(y, prev + 1), hi = prev === null ? y : Math.max(y, prev - 1);
          for (let yy = Math.min(y, lo); yy <= Math.max(y, hi); yy++) { add(x, yy); add(x, yy + 1); }
          prev = y;
        }
        centre = false;
      } else if (mark === 'Rainbow') {
        // a weather rainbow: bands bent into an arch over the eyes, a small cloud under each foot
        const per = big ? 2 : 1, R = h2 + (big ? 1 : 0), nb = Math.max(3, Math.min(5, Math.floor((R - 2) / per)));
        const bands = nb >= 5 ? [8, 9, 10, 11, 12] : nb === 4 ? [8, 10, 11, 12] : [8, 10, 12];
        for (let y = -R; y < 0; y++) for (let x = -R; x < R; x++) {
          const d = Math.hypot(x + 0.5, y + 0.5), b = Math.floor((R - d) / per);
          if (d < R && b < nb) add(x, y, bands[b]);
        }
        const foot = nb * per;
        for (const s of [-1, 1]) {
          const x0 = s < 0 ? -R : R - foot;
          for (let x = x0 - 1; x < x0 + foot + 1; x++) add(x, 0, 25);
          for (let x = x0; x < x0 + foot; x++) add(x, 1, 25);
          add(x0 + (foot >> 1), -1, 25);
        }
      } else if (mark === 'Visor') {
        const wv = P[Math.max(0, Math.min(rows - 1, eyeRow - top))] + 1, hgt = mt + 1;
        for (let y = 0; y < hgt; y++) { const inset = y === 0 || y === hgt - 1 ? 1 : 0; for (let x = -wv + inset; x < wv - inset; x++) add(x - look, y); }
        const gx = -Math.round(wv * 0.5) + look;
        add(gx - look, 1, C_MH); add(gx + 1 - look, 1, C_MH); add(gx + 3 - look, 1, C_MH);
      } else if (mark === 'Chevron') {
        const a = Math.max(3, Math.round(mw * 0.36)), th = mt >= 4 ? 3 : 2;
        for (let x = -a; x < a; x++) { const y = a - 1 - Math.floor(Math.abs(x + 0.5)); for (let z = 0; z < th; z++) add(x, y + z); }
      } else if (mark === 'Crescent') {
        const R = mt + 1.5, Rc = Math.ceil(R);
        for (let y = -Rc; y < Rc; y++) for (let x = -Rc; x < Rc; x++) {
          const fx = x + 0.5, fy = y + 0.5;
          if (fx * fx + fy * fy < R * R && (fx - R * 0.5 * slashDir) ** 2 + (fy + R * 0.28) ** 2 >= (R * 0.88) ** 2) add(x, y);
        }
      } else if (mark === 'Bolt') {
        const B = [[-0.5, -0.1], [-0.08, -0.5], [0.0, -0.12], [0.5, -0.32], [0.1, 0.5], [0.02, 0.1], [-0.42, 0.34]];
        const boltMask = new Uint8Array(N * N);
        poly(boltMask, B.map(([a, b]) => [CX + a * mw * slashDir, CX + b * mt * 2.2]), 1);
        for (let p = 0; p < N * N; p++) if (boltMask[p]) add(p % N - CX, Math.floor(p / N) - CX);
      } else if (mark === 'Keyhole') sprite(big ? BM.keyL : small ? BM.keyS : BM.key, out, () => MK);
      else if (mark === 'Spiral') {
        const n = big ? 10 : small ? 6 : 8, cells = [];
        let x = 0, y = 0, dir = 0, len = n - 1, segs = 0;
        cells.push([0, 0]);
        const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];
        while (len > 0) {
          for (let s = 0; s < len; s++) { x += DX[dir]; y += DY[dir]; cells.push([x, y]); }
          dir = (dir + 1) % 4; segs++;
          if (segs >= 3 && segs % 2 === 1) len -= 2;
        }
        const rot = Math.floor(t0 * 0.6 / (Math.PI / 2) * slashDir) & 3;
        for (let [cx0, cy0] of cells) { for (let r = 0; r < rot; r++) [cx0, cy0] = [n - 1 - cy0, cx0]; add(cx0 - (n >> 1), cy0 - (n >> 1)); }
      } else if (mark === 'Heart') sprite(big ? BM.heartL : BM.heart, out, (ch) => ch === 'o' ? C_MH : MK);
      else if (mark === 'Glitch') {
        const th = Math.max(1, Math.round(mt / 3));
        for (let i = 0; i < 3; i++) { const off = Math.round(Math.sin(Math.floor(t0 * 2.5) * 0.7 + i * 2.1) * 2) * (i === 1 ? -1 : 1); for (let y = 0; y < th; y++) for (let x = -h2; x < h2; x++) add(x + off, i * th + y, i === 1 ? C_MH : MK); }
      } else {
        // a single real eye: the rarest mark; the pupil looks on its own
        sprite(big ? BM.eyeL : small ? BM.eyeS : BM.eye, out, () => MK);
        const pw = big ? 4 : 2, ph = big ? 3 : small ? 1 : 2, pl = Math.max(-2, Math.min(2, Math.round(look * 1.2)));
        for (let y = -ph + 1; y < ph; y++) for (let x = -pw; x < pw; x++) if (!(Math.abs(y) === ph - 1 && ph > 1 && (x === -pw || x === pw - 1))) out.push([x + pl - look, y, MK]);
        centre = false;
      }
      if (centre && out.length) {
        let x0 = 99, x1 = -99, y0 = 99, y1 = -99;
        for (const [a, b] of out) { x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
        const sx = -Math.floor((x0 + x1 + 1) / 2), syy = -Math.floor((y0 + y1 + 1) / 2);
        for (const cl of out) { cl[0] += sx; cl[1] += syy; }
      }
      return out;
    }

    // small sprites: pins and the shoulder bird
    const PIN = {
      Dot: ['.##.', '####', '####', '.##.'],
      Bolt: ['..##', '.##.', '####', '.##.', '##..'],
      Star: ['..#..', '.###.', '#####', '.###.', '.#.#.'],
      'Gold Star': ['..#..', '.#o#.', '#####', '.###.', '.#.#.'],
    };
    const BIRD = ['......###..', '.....##e##b', '##..#####..', '.#######...', '..######...', '...####....', '....#.#....'];
    const BIRD_UP = ['...##.###..', '...####e##b', '##..#####..', '.#######...', '..#####....', '...........', '...........'];

    // the legendaries' own cell textures, rolled once
    const stars = [], noise = new Uint8Array(N * N), BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    {
      let z = (Math.floor(starSeed * 4294967296) ^ 0x6a09e667) >>> 0 || 3;
      const nz = () => { z ^= z << 13; z >>>= 0; z ^= z >>> 17; z ^= z << 5; z >>>= 0; return z / 4294967296; };
      if (legend === 'Night Sky') for (let i = 0; i < 150; i++) stars.push([Math.floor(nz() * N), Math.floor(nz() * N), nz() * 6.28, nz() < 0.25]);
      if (legend === 'Static') for (let p = 0; p < N * N; p++) { const v = nz(); noise[p] = v < 0.56 ? 0 : v < 0.93 ? 1 : 2; }
    }

    // ---------- the viewer ----------
    let watchX = 0, watchY = 0, lean = 0, blinkBack = -9, hopAt = -9, prevT = 0, glanceX = 0, glanceY = 0, glanceUntil = -9;
    let flyAt = -9, shineAt = -9, shootAt = -9, shootX = 0, shootY = 0, tuneAt = -9, landed = true;
    const ripples = [];
    const birdSide = -pinSide;
    const birdD = Math.round(SW * 0.62);
    const birdRest = (() => { let r = 0; while (r < N - 1 && shoulderW[r] < birdD + 4) r++; return sy + r - 1 - (pose === 'Shrug' ? Math.max(2, q(3)) : 0); })();
    let birdFace = -birdSide;
    const live = (t) => {
      const inp = c.input, dt = Math.min(0.1, Math.max(0, t - prevT)); prevT = t;
      for (const tap of c.input.taps()) {  // a tap on the bird, the figure or the field
        const fx = tap.x * N, fy = tap.y * N, pan = (tap.x - 0.5) * 0.6;
        const onHead = ((fx - CX) / (A * 1.3)) ** 2 + ((fy - (top + chin) / 2) / (rows * 0.62)) ** 2 < 1, onBody = fy > sy && Math.abs(fx - CX) < SW + 1;
        const bx = mx(birdD, birdSide) + 0.5;  // the bird's middle
        if (bird && t - flyAt > 2.6 && Math.abs(fx - bx) < 6 && fy > birdRest - 8 && fy < birdRest + 3) {
          flyAt = t; landed = false;
          for (let i = 0; i < 3; i++) c.sound.note(chirpRoot + 12 + [0, 7, 4][i], { dur: 0.06, vel: 0.12, wave: 'sine', at: i * 0.09, pan });
          continue;
        }
        if (onHead || onBody) {
          blinkBack = t; hopAt = t;
          c.sound.note(chirpRoot, { dur: 0.08, vel: 0.2, wave: 'sine', pan });
          c.sound.note(chirpRoot + (scheme === 'Gold' ? 7 : 4), { dur: 0.1, vel: 0.2, wave: 'sine', at: 0.25, pan });
          if (legend === 'Gilded') { shineAt = t; [0, 4, 7, 12].forEach((s, i) => c.sound.note(chirpRoot + 12 + s, { dur: 0.5, vel: 0.07, wave: 'triangle', at: 0.35 + i * 0.07, pan })); }
          else if (legend === 'Night Sky') { shootAt = t; shootX = fx; shootY = fy; [0, 2, 4, 7, 9].forEach((s, i) => c.sound.note(chirpRoot + 12 + s, { dur: 0.3, vel: 0.06, wave: 'sine', at: 0.3 + i * 0.08, pan: pan - i * 0.1 })); }
          else if (legend === 'Static') { tuneAt = t; [9, 5, 2, 0].forEach((s, i) => c.sound.note(chirpRoot - 12 + s, { dur: 0.16, vel: 0.08, wave: 'triangle', cutoff: 1400, at: 0.3 + i * 0.1 })); c.sound.note(chirpRoot, { dur: 0.8, vel: 0.08, wave: 'sine', at: 0.75 }); }
        } else {
          ripples.push({ x: fx, y: fy, at: t }); if (ripples.length > 5) ripples.shift();
          glanceX = Math.max(-0.05, Math.min(0.05, (tap.x - 0.5) * 0.14)); glanceY = Math.max(-0.02, Math.min(0.02, (fy - eyeRow) / N * 0.06)); glanceUntil = t + 1.6;
          const step = songStep[Math.max(0, Math.min(songStep.length - 1, Math.floor((1 - tap.y) * songStep.length)))];
          c.sound.note(chirpRoot - 12 + step, { dur: 0.5, vel: 0.12, wave: 'sine', pan: (tap.x - 0.5) * 0.8 });
        }
      }
      if (bird && !landed && t - flyAt > 2.4) { landed = true; c.sound.hit('click', 0.12); }
      const glancing = t < glanceUntil;
      const tx = glancing ? glanceX : inp.inside ? Math.max(-0.05, Math.min(0.05, (inp.x - 0.5) * 0.14)) : 0;
      const ty = glancing ? glanceY : inp.inside ? Math.max(-0.02, Math.min(0.02, (inp.y * N - eyeRow) / N * 0.06)) : 0;
      const tl = inp.inside ? Math.max(-0.07, Math.min(0.07, (inp.x - 0.5) * 0.12)) : 0;
      if (tx || ty || tl || watchX || watchY || lean) {
        const e = Math.min(1, dt * 5);
        watchX += (tx - watchX) * e; watchY += (ty - watchY) * e; lean += (tl - lean) * e * 0.6;
        if (!inp.inside && !glancing && Math.abs(watchX) + Math.abs(watchY) + Math.abs(lean) < 1e-4) { watchX = watchY = lean = 0; }
      }
      if (bird && inp.inside) birdFace = inp.x * N > mx(birdD, birdSide) ? 1 : -1;
      while (ripples.length && t - ripples[0].at > 1.4) ripples.shift();
    };

    // ---------- drawing ----------
    const G = new Uint8Array(N * N), M = new Uint8Array(N * N), Hs = new Uint8Array(N * N), Ss = new Uint8Array(N * N), Tn = new Uint8Array(N * N);
    const cv = document.createElement('canvas'); cv.width = N; cv.height = N;
    const octx = cv.getContext('2d'); const img = octx.createImageData(N, N), px = img.data;
    let lastKey = '';

    function frame(t) {
      const inp = c.input;
      // the state of this frame, in whole cells
      const bob = Math.sin(t * 1.3) > 0.62 ? 1 : 0;
      const hopT = t - hopAt, lift = hopT < 0.4 ? Math.round(Math.sin(hopT / 0.4 * Math.PI) * 1.6 * k) : 0;
      // a tilted pose shears the head a cell at a time; leaning after the pointer moves it as a block and the neck takes the slant
      const leanO = Math.round(lean * 1.4 * (sy - eyeRow));
      const shift = (j) => Math.round((sy - j) * tilt) + (j <= chin ? leanO : Math.round(leanO * (sy - j) / (sy - chin)));
      const p = (t + blinkOff) % blinkEvery;
      let open = p < 0.18 ? Math.max(0.08, Math.abs(p - 0.09) / 0.09) : 1;
      const bk = t - blinkBack;
      if (bk < 0.5) { const qq = (bk % 0.25) / 0.25; open = Math.min(open, Math.max(0.08, Math.abs(qq - 0.5) * 2)); }
      open = open > 0.75 ? 1 : open > 0.3 ? 0.5 : 0;
      const lookF = Math.sin(t * 0.45 + blinkOff) * 0.012 * (mark === 'Dot' || mark === 'Ring' || mark === 'Cross' || mark === 'Eye' ? 1.6 : 0.6) + watchX;
      const look = Math.max(-Math.round(2.4 * k), Math.min(Math.round(2.4 * k), Math.round(lookF * N)));
      const lookY = Math.round(watchY * N);
      const swingC = Math.round((Math.sin(t * 1.1 + blinkOff) * 0.06 + (hopT < 1.2 ? Math.sin(hopT * 9) * 0.25 * (1 - hopT / 1.2) : 0)) * 14 * k);
      const haloBob = Math.sin(t * 1.1) > 0 ? 0 : 1;
      const animStep = (mark === 'Wave' ? Math.floor(t * 4) : 0) + (mark === 'Spiral' ? Math.floor(t * 0.6 / (Math.PI / 2)) * 100 : 0) + (mark === 'Glitch' ? Math.floor(t * 2.5) * 1000 : 0);
      const flyU = bird ? (t - flyAt) / 2.4 : 2;
      const legStep = legend === 'None' ? 0 : Math.floor(t * 8);
      const pk = (legend !== 'None' || bird) && inp.inside ? Math.floor(inp.x * N) + ',' + Math.floor(inp.y * N) : '';
      const birdIdle = bird ? Math.floor((t + blinkOff) / 5) : 0;
      const key = [bob, lift, leanO, open, look, lookY, swingC, haloBob, animStep, ripples.map(r => Math.floor((t - r.at) * 10)).join('.'),
        flyU < 1 ? Math.floor(t * 12) : 0, birdIdle, legStep, pk].join('|');
      if (key === lastKey) return;
      lastKey = key;

      // the field and its quiet second mark
      G.fill(C_F);
      if (extra === 'Horizon') for (let j = 35; j < N; j++) span(G, j, 0, N, C_F2);
      else if (extra === 'Sun') disc(G, sunLeft ? 10 : 38, 8.5, 3.6, C_M);
      else if (extra === 'Stripe') for (let j = 0; j < N; j++) span(G, j, sunLeft ? 6 : 34, sunLeft ? 15 : 43, C_F2);
      else if (extra === 'Arch') { for (let j = 20; j < N; j++) span(G, j, 8, 40, C_F2); disc(G, 24, 20.5, 16, C_F2); }
      else if (extra === 'Split') for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { if (sunLeft ? i + j < N - 1 : i > j) G[j * N + i] = C_F2; }
      else if (extra === 'Dots') for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) setc(G, (sunLeft ? 3 : 38) + a * 2, 3 + b * 2, C_M);

      // the head group, moved as a whole: lean (a shear in whole cells), hop and breath
      Hs.fill(0); Ss.fill(0); Tn.fill(0);
      const up = lift + bob;
      for (const pp of headList) { const i = pp % N, j = (pp - i) / N; setc(Hs, i + shift(j), j - up, 1); }
      for (const pp of seamList) { const i = pp % N, j = (pp - i) / N; setc(Ss, i + shift(j), j - up, 1); }
      for (const pp of toneList) { const i = pp % N, j = (pp - i) / N; setc(Tn, i + shift(j), j - up, 1); }
      if (topper === 'Ponytail') {
        const tieRow = top + Math.round(rows * 0.15), Lt = Math.round(rows * 0.6);
        disc(Hs, mx(A - 1, side) + 0.5 + shift(tieRow), tieRow - up + 0.5, 1.7 * k, 1);
        if (twoTone) disc(Tn, mx(A - 1, side) + 0.5 + shift(tieRow), tieRow - up + 0.5, 1.7 * k, 1);
        for (let i = 0; i <= Lt; i++) {
          const u = i / Lt, dc = A - 1 + Math.round((2.5 + 2 * Math.sin(u * Math.PI * 0.9)) * k) + Math.round(swingC * u * side), wd = Math.max(1, Math.round(3.4 * k * (1 - 0.55 * u)));
          const j = tieRow + i;
          for (let d = dc - (wd >> 1); d < dc - (wd >> 1) + wd; d++) { setc(Hs, mx(d, side) + shift(j), j - up, 1); if (twoTone) setc(Tn, mx(d, side) + shift(j), j - up, 1); }
        }
      }
      if (extra === 'Echo') for (let pp = 0; pp < N * N; pp++) if (Hs[pp]) { const i = pp % N, j = (pp - i) / N; if (j < chin - up) setc(G, i + 2, j + 2, C_F2); }

      // the body: shoulders, then hood or collar
      M.fill(0);
      // a shrug lifts the shoulders up round the neck; a tilted head drops one shoulder a cell
      const sy2 = pose === 'Shrug' ? sy - Math.max(2, q(3)) : sy, drop = pose === 'Tilted' ? (tilt > 0 ? -1 : 1) : 0;
      for (let r = 0; r < N; r++) { const w = shoulderW[r], j = sy2 + r - up; if (!drop) sym(M, j, w, 1); else { span(M, j + (drop < 0 ? 1 : 0), CX - w, CX, 1); span(M, j + (drop > 0 ? 1 : 0), CX, CX + w, 1); } }
      if (shoulders === 'Hooded') {
        for (let j = hoodTop; j < N; j++) {
          const r = j - hoodTop;
          let w = r < Ah ? Math.max(1, Math.round(Ah * Math.sqrt(Math.max(0, 1 - ((Ah - r - 0.5) / Ah) ** 2)))) : Ah;
          if (j > chin) w = Math.max(w, Ah + (j - chin) * 2);
          sym(M, j - up, Math.min(w, Math.max(Ah, shoulderW[Math.max(0, j - sy)] || 0)), 1);
        }
        span(M, hoodTop - 1 - up, side > 0 ? CX : CX - 2, side > 0 ? CX + 2 : CX, 1);
      } else if (shoulders === 'High Collar') for (const s of [-1, 1]) {
        const pts = [[nh, sy + 2], [nh, chin - q(1)], [A + q(3), chin - q(6)], [nh + q(8), sy + 1]].map(([d, j]) => [s > 0 ? CX + d : CX - d, j - up]);
        poly(M, pts, 1);
      }
      // a one-cell field-coloured gap parts the face from the hood or the collar
      if (shoulders === 'Hooded' || shoulders === 'High Collar') {
        const lim = shoulders === 'Hooded' ? chin - Math.round(J * 0.45) - up : N;
        for (let j = 0; j < Math.min(N, lim); j++) for (let i = 0; i < N; i++) {
          const pp = j * N + i;
          if (Hs[pp] || M[pp] !== 1) continue;
          let near = false;
          for (let b = -1; b <= 1 && !near; b++) for (let a = -1; a <= 1; a++) if (inb(i + a, j + b) && Hs[(j + b) * N + i + a]) { near = true; break; }
          if (near && (shoulders === 'Hooded' || j < sy - up)) M[pp] = 2;
        }
      }
      for (let pp = 0; pp < N * N; pp++) { if (Hs[pp]) M[pp] = 1; if (Ss[pp] && M[pp] === 1) M[pp] = 2; }

      // paint the figure: one colour, or (Ghost) a one-cell outline, or a legendary material
      const ptrX = inp.inside ? inp.x * N : -99, ptrY = inp.inside ? inp.y * N : -99;
      const tuning = legend === 'Static' ? Math.max(0, 1 - Math.abs((t - tuneAt) - 0.9) / 0.9) : 0;
      for (let j = 0; j < N; j++) for (let i = 0; i < N; ++i) {
        const pp = j * N + i, m = M[pp];
        if (m === 2) { G[pp] = C_F; continue; }
        if (m !== 1) {
          if (ghost) { const nb = (i > 0 && M[pp - 1] === 1) || (i < N - 1 && M[pp + 1] === 1) || (j > 0 && M[pp - N] === 1) || (j < N - 1 && M[pp + N] === 1); if (nb) G[pp] = C_M; }
          continue;
        }
        if (legend === 'None') { G[pp] = ghost ? C_F : Tn[pp] ? C_T : C_B; continue; }
        const edgeL = (i > 0 && M[pp - 1] !== 1) || (j > 0 && M[pp - N] !== 1);
        const edgeR = (i < N - 1 && M[pp + 1] !== 1) || (j < N - 1 && M[pp + N] !== 1);
        if (legend === 'Gilded') {
          let col = 15;
          if (edgeL) col = 16; else if (edgeR) col = 14;
          const dg = i + j - streak;
          if (!edgeL && !edgeR && (dg === 0 || dg === 1 || dg === 4)) col = 16;
          const sweep = (Math.floor(t * 10) % 110) - 15;
          if (i + j - 30 === sweep || i + j - 30 === sweep + 1) col = 17;
          const d2 = (i + 0.5 - ptrX) ** 2 + (j + 0.5 - ptrY) ** 2;
          if (d2 < 20) col = d2 < 6 ? 17 : 16;
          G[pp] = col;
        } else if (legend === 'Night Sky') {
          const v = Math.max(0, (j - sy - 2) / (N - sy)) * 0.8, bay = (BAYER[(j & 3) * 4 + (i & 3)] + 0.5) / 16;
          G[pp] = edgeL || edgeR ? 21 : v > bay ? 19 : 18;
        } else {
          const n = noise[((j + Math.floor(t * 5)) % N) * N + i];
          const roll = Math.floor(t * 3) % (N + 12) - 6;
          const near = (i + 0.5 - ptrX) ** 2 + (j + 0.5 - ptrY) ** 2 < 40;
          const clear = near || ((i * 7 + j * 13) % 17) / 17 < tuning;
          G[pp] = clear ? (ghost ? C_F : C_B) : (j === roll || j === roll + 1 ? 24 : 22 + n);
        }
      }
      if (legend === 'Night Sky') {
        for (const [i, j, ph, bright] of stars) {
          if (!inb(i, j) || M[j * N + i] !== 1) continue;
          const d2 = (i + 0.5 - ptrX) ** 2 + (j + 0.5 - ptrY) ** 2, tw = Math.sin(t * 0.9 + ph) > 0.2;
          if (d2 < 49 || bright) {
            G[j * N + i] = 20;
            if (bright && (tw || d2 < 49)) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (inb(i + a, j + b) && M[(j + b) * N + i + a] === 1) G[(j + b) * N + i + a] = 21;
          } else if (tw) G[j * N + i] = 21;
        }
        // a small crescent moon high on the shoulder
        const mxc = mx(Math.round(SW * 0.55), -side), myc = sy + 6 - up;
        for (let b = -3; b <= 2; b++) for (let a = -3; a <= 2; a++) { const fx = a + 0.5, fy = b + 0.5; if (fx * fx + fy * fy <= 7.6 && (fx - side * 1.3) ** 2 + (fy + 0.9) ** 2 > 5.2 && inb(mxc + a, myc + b) && M[(myc + b) * N + mxc + a] === 1) G[(myc + b) * N + mxc + a] = 20; }
        const su = (t - shootAt) / 0.9;
        if (su >= 0 && su < 1) for (let z = 0; z < 5; z++) { const i = Math.round(shootX + 10 - su * 22 + z), j = Math.round(shootY - 6 + su * 12 - z * 0.5); setc(G, i, j, z === 0 ? 20 : 21); }
      }
      if (legend === 'Gilded') {
        const su = (t - shineAt) / 0.8;
        if (su >= 0 && su < 1) { const r = Math.round(su * 10); for (const [a, b] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) setc(G, Math.round(CX + a * r + shift(eyeRow)), Math.round(eyeRow - up + b * r * 0.8), 17); }
        if (inp.inside && inb(Math.floor(ptrX), Math.floor(ptrY)) && M[Math.floor(ptrY) * N + Math.floor(ptrX)] === 1) for (const [a, b] of [[0, -2], [0, 2], [-2, 0], [2, 0]]) setc(G, Math.floor(ptrX) + a, Math.floor(ptrY) + b, 17);
      }

      // neckwear, in the mark's ink: it sits on the neck and chest and leans with the neck
      if (neckwear !== 'None') {
        const at = (i, j, col) => setc(G, i + (j < sy ? shift(j) : 0), j - up, col);
        const symRow = (j, w, col) => { for (let i = CX - w; i < CX + w; i++) at(i, j, col); };
        if (neckwear === 'Scarf') {
          for (let j = sy - 1; j <= sy + 1; j++) symRow(j, nh + 2, j === sy ? C_MD : C_M);
          const tx = mx(nh - 2, side);
          for (let j = sy + 2; j <= sy + 2 + q(6); j++) for (let a = 0; a < 3; a++) { const i = side > 0 ? tx + a : tx - a; if (j < sy + 2 + q(6) || a !== 1) at(i, j, (j - sy) % 3 === 0 ? C_MD : C_M); }
        } else if (neckwear === 'Bow Tie') {  // wings and a knot
          const B = ['##......##', '####kk####', '###kkkk###', '####kk####', '##......##'];
          for (let r = 0; r < 5; r++) for (let i = 0; i < 10; i++) if (B[r][i] !== '.') at(CX - 5 + i, sy - 1 + r, B[r][i] === 'k' ? C_MH : C_M);
        } else if (neckwear === 'Tie') {
          symRow(sy - 1, 2, C_M); symRow(sy, 1, C_M);
          for (let j = sy + 1; j < N + 3; j++) for (let i = CX - 2; i < CX + 2; i++) at(i, j, (i + j) % 4 === 0 ? C_MD : C_M);
        } else if (neckwear === 'Pendant') {
          for (let z = 0; z < 5; z++) { at(CX - nh + z, sy - 1 + z, C_MD); at(CX + nh - 1 - z, sy - 1 + z, C_MD); }
          const D4 = ['.##.', '#o##', '####', '.##.'];
          for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) if (D4[r][i] !== '.') at(CX - 2 + i, sy + 4 + r, D4[r][i] === 'o' ? C_MH : C_M);
        } else {
          for (let r = 0; r < nh + 2; r++) { const w = nh + 2 - r, j = sy - 1 + r; for (let i = CX - w; i < CX + w; i++) at(i, j, (i + j) % 3 === 0 && r % 2 === 1 ? C_MH : C_M); }
        }
      }
      // earrings, hung just below each ear line at the head's edge
      if (earring !== 'None') for (const s of [-1, 1]) {
        if (turned && s === side) continue;   // the near ear is round the far side of a turned head
        const j0 = eyeRow + 4, d = P[Math.max(0, Math.min(rows - 1, j0 - top))];
        const at = (dd, j, col) => setc(G, mx(dd, s) + shift(j), j - up, col);
        if (earring === 'Stud') { at(d - 1, j0, C_MH); at(d, j0, C_M); at(d - 1, j0 + 1, C_M); at(d, j0 + 1, C_M); }
        else if (earring === 'Hoop') { at(d, j0, C_M); at(d - 1, j0 + 1, C_M); at(d + 1, j0 + 1, C_M); at(d - 1, j0 + 2, C_M); at(d + 1, j0 + 2, C_M); at(d, j0 + 3, C_M); }
        else if (earring === 'Drop') { at(d, j0, C_M); at(d, j0 + 1, C_M); for (const [a, b] of [[0, 2], [1, 2], [0, 3], [1, 3]]) at(d - 1 + a, j0 + b, a === 0 && b === 2 ? C_MH : C_M); }
        else for (const [a, b, col] of [[0, 0, C_M], [1, 1, C_M], [1, 2, C_MH], [2, 3, C_M], [2, 4, C_MH], [3, 5, C_M]]) at(d + a, j0 + b, col);
      }
      // the halo floats in whole cells
      if (halo) {
        const rx = Math.round(A * 0.75), ty = top - q(4) - up + haloBob, hc = legend === 'Gilded' ? 16 : ghost ? C_M : C_B, sx = shift(ty);
        span(G, ty, CX - rx + 2 + sx, CX + rx - 2 + sx, hc); span(G, ty + 2, CX - rx + 2 + sx, CX + rx - 2 + sx, hc);
        span(G, ty + 1, CX - rx + sx, CX - rx + 2 + sx, hc); span(G, ty + 1, CX + rx - 2 + sx, CX + rx + sx, hc);
      }
      // the pin
      if (pin !== 'None') {
        const sp = PIN[pin], pxc = mx(Math.round(SW * 0.6), pinSide) - (sp[0].length >> 1), pyc = sy + Math.max(3, q(4)) - up;
        for (let r = 0; r < sp.length; r++) for (let i = 0; i < sp[r].length; i++) { const ch = sp[r][i]; if (ch !== '.') setc(G, pxc + i, pyc + r, pin === 'Gold Star' ? (ch === 'o' ? C_GOLDHI : C_GOLD) : C_M); }
      }
      // the mark, blinking by squashing its rows, glancing in whole cells, following the head's lean
      const cells = markCells(t, look);
      for (const [dx, dy, col] of cells) {
        const ry = open === 1 ? dy : open === 0.5 ? Math.round(dy * 0.5) : 0;
        const j = eyeRow + ry - up + lookY, i = CX + dx + look + markShift + shift(j);
        setc(G, i, j, col);
      }
      // the shoulder bird: perched, turning, and now and then flying a loop round the head
      if (bird) {
        let bx = mx(birdD, birdSide) - 5, by = birdRest - 6 - up, face = birdFace, flap = false;
        if (flyU < 1) {
          const a = flyU * Math.PI * 2;
          bx += Math.round(-birdSide * Math.sin(a) * (birdD + 2) * 0.9 - birdSide * (1 - Math.cos(a)) * birdD * 0.5);
          by -= Math.round(Math.sin(flyU * Math.PI) * (birdRest - top + 4));
          face = Math.cos(a) > 0 ? -birdSide : birdSide; flap = Math.floor(t * 9) % 2 === 0;
        } else if (!inp.inside) face = birdIdle % 3 === 2 ? birdSide : -birdSide;
        const sp = flap ? BIRD_UP : BIRD, bc = ghost ? C_M : C_B, W = sp[0].length;
        const at = (i, r) => r >= 0 && r < sp.length && i >= 0 && i < W && sp[r][face > 0 ? i : W - 1 - i] !== '.';
        // a one-cell field-coloured outline wherever the bird crosses the silhouette
        for (let r = -1; r <= sp.length; r++) for (let i = -1; i <= W; i++) if (!at(i, r) && (at(i - 1, r) || at(i + 1, r) || at(i, r - 1) || at(i, r + 1)) && inb(bx + i, by + r) && M[(by + r) * N + bx + i] === 1) G[(by + r) * N + bx + i] = C_F;
        for (let r = 0; r < sp.length; r++) for (let i = 0; i < W; i++) {
          const ch = sp[r][face > 0 ? i : W - 1 - i];
          if (ch === '.') continue;
          setc(G, bx + i, by + r, ch === '#' ? bc : (ghost ? C_F : C_M));
        }
      }
      // ripples from taps on the field: pixel rings that fade in one step
      for (const r of ripples) {
        const kk = (t - r.at) / 1.4, rad = 1 + kk * 11, col = kk < 0.5 ? C_M : C_MD;
        for (let a = 0; a < 64; a++) { const th = a / 64 * Math.PI * 2; setc(G, Math.floor(r.x + Math.cos(th) * rad), Math.floor(r.y + Math.sin(th) * rad), col); }
      }

      for (let pp = 0; pp < N * N; pp++) { const cc = pal[G[pp]], o = pp * 4; px[o] = cc[0]; px[o + 1] = cc[1]; px[o + 2] = cc[2]; px[o + 3] = 255; }
      octx.putImageData(img, 0, 0);
      ctx.resetTransform();
      ctx.imageSmoothingEnabled = false; ctx.drawImage(cv, 0, 0, S, S);
    }
    frame(0);
    return (t) => { live(t); frame(t); };
  },
});

})(window.Proto);
