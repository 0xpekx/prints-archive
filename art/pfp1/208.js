// Pattern Plates: from D:/code/synaesthesia/public/drop03/pieces/208.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Pattern Plates: armadillos in one-bit pixel art from the first mouse-driven desktops:
// black and white only, every grey and texture an eight-by-eight fill pattern.
Proto.add({
  num: 208,
  name: 'Pattern Plates',
  fam: 'Pixel Portraits III',
  fps: 20,
  seed: 564,
  interactive: 'Tap to roll it into a ball. Drag to select and invert.',
  music: true,
  recipe: 'An armadillo, head and shoulders, in one-bit pixel art 64 dots across, as on the first small black-and-white desktops: no greys at all, only black and white dots, with every shade and texture made by an eight-by-eight fill pattern. Shell patterns, bands, ears, eyes, snout, pose, headwear, a prop beside it (an ant it is after, a floppy disk, a mug), the desktop pattern, the ground, the window around it, the cursor on screen and the screen itself vary; it blinks and twitches its nose, and rolls up into a banded ball when tapped. About 1 in 380 is a legendary (a Glyptodon, its giant domed ancestor with rosette scutes and a club tail, or an Engraving in banknote green on cream with a guilloche frame), and about 1 in 200 has the coveted Prize Rosette pinned up beside it.',
  make(c) {
    const S = c.size, g = c.ctx;
    // mulberry-style mixer over a counter keyed by the hash
    const key = [];
    for (let i = 0; i < 8; i++) key.push(parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) | 0);
    let n = 0;
    const r01 = () => {
      let z = (key[n & 7] + Math.imul(++n, 0x6d2b79f5)) | 0;
      z = Math.imul(z ^ (z >>> 15), z | 1); // mix one
      z ^= z + Math.imul(z ^ (z >>> 7), z | 61); // mix two
      return ((z ^ (z >>> 14)) >>> 0) / 4294967296; // to 0..1 for the old traits
    };
    const pickw = (pairs) => { let t = 0; for (const p of pairs) t += p[1]; let r = r01() * t; for (const p of pairs) { r -= p[1]; if (r < 0) return p[0]; } return pairs[0][0]; };

    // eight-by-eight fill patterns, one byte per row (bit 7 is the left dot)
    const PAT = {
      black: [255, 255, 255, 255, 255, 255, 255, 255], white: [0, 0, 0, 0, 0, 0, 0, 0],
      grey: [0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55], dark: [0xee, 0xbb, 0xee, 0xbb, 0xee, 0xbb, 0xee, 0xbb],
      light: [0x88, 0x00, 0x22, 0x00, 0x88, 0x00, 0x22, 0x00], sparse: [0x80, 0, 0, 0, 0x08, 0, 0, 0],
      bricks: [0xff, 0x80, 0x80, 0x80, 0xff, 0x08, 0x08, 0x08], diag: [0x81, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0],
      weave: [0xf8, 0x74, 0x22, 0x47, 0x8f, 0x17, 0x22, 0x71], scales: [0x80, 0x80, 0x41, 0x3e, 0x08, 0x08, 0x14, 0xe3],
      hlines: [0xff, 0, 0, 0, 0xff, 0, 0, 0], vlines: [0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88],
      cross: [0xff, 0x88, 0x88, 0x88, 0xff, 0x88, 0x88, 0x88], diamonds: [0x18, 0x24, 0x42, 0x81, 0x81, 0x42, 0x24, 0x18],
      zigzag: [0x81, 0x42, 0x24, 0x18, 0, 0, 0, 0], waves: [0x00, 0x30, 0x48, 0x84, 0x03, 0x00, 0x00, 0x00],
      dots: [0x00, 0x22, 0x00, 0x00, 0x00, 0x88, 0x00, 0x00], studs: [0x00, 0x66, 0x66, 0x00, 0x00, 0x66, 0x66, 0x00],
      checker: [0xf0, 0xf0, 0xf0, 0xf0, 0x0f, 0x0f, 0x0f, 0x0f], herring: [0x88, 0x44, 0x22, 0x11, 0x11, 0x22, 0x44, 0x88],
      tuft: [0x00, 0x00, 0x00, 0x10, 0x54, 0x00, 0x00, 0x00], sand: [0x00, 0x40, 0x00, 0x02, 0x00, 0x00, 0x10, 0x00],
      scutes: [0x3c, 0x42, 0x99, 0xa5, 0xa5, 0x99, 0x42, 0x3c], tiles: [0xff, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80],
    };
    // an engraved legendary turns every fill into the engraver's lines: wavy hatching, crossed where it is darker
    const DENS = {};
    for (const k in PAT) { let n = 0; for (const r of PAT[k]) for (let b = 0; b < 8; b++) n += (r >> b) & 1; DENS[k] = n / 64; }
    const engr = (d, x, y) => {
      if (d >= 0.97) return 1;
      if (d < 0.2) return 0;
      const u = ((x + y) % 3 + 3) % 3, v = ((x - y) % 3 + 3) % 3;
      if (u === 0) return 1;
      if (d > 0.55 && v === 0) return 1;
      return d > 0.85 && u === 1 ? 1 : 0;
    };
    const pat = (name, x, y) => LEG === 'Engraving' ? engr(DENS[name], x, y) : (PAT[name][y & 7] >> (7 - (x & 7))) & 1;

    let shell = pickw([['Mixed', 30], ['Bricks & Weave', 18], ['Scales', 16], ['Stripes', 14], ['Studded', 12], ['Diamonds', 6], ['Solid', 4]]);
    const bands = pickw([[4, 34], [5, 30], [3, 20], [6, 16]]);
    const ears = pickw([['Tall', 34], ['Round', 24], ['Floppy', 22], ['Tufted', 12], ['Huge', 8]]);
    let eyes = pickw([['Dot', 32], ['Big Round', 24], ['Sleepy', 16], ['Spectacles', 14], ['Star', 8], ['X', 6]]);
    let snout = pickw([['Long', 40], ['Stubby', 28], ['Whiskered', 18], ['Moustache', 14]]);
    let hat = pickw([['None', 34], ['Bowler', 16], ['Beret', 14], ['Bow', 12], ['Sweatband', 10], ['Halo', 8], ['Crown', 6]]);
    let desk = pickw([['Grey', 26], ['Light Dots', 22], ['Diagonal', 16], ['Bricks', 12], ['Waves', 12], ['Black', 12]]);
    let screen = pickw([['Paper White', 56], ['Cream', 18], ['Blue Ink', 12], ['Inverted', 8], ['Sepia', 6]]);

    const ALL = ['bricks', 'diag', 'studs', 'hlines', 'grey', 'dark', 'light', 'weave'];
    const bandPats0 = Array.from({ length: 7 }, () => shell === 'Mixed' ? ALL[Math.floor(r01() * ALL.length)] : null);
    const blinkOff = r01() * 4, twOff = r01() * 3;

    // newer traits: a Weyl counter run through a two-round integer hash, on the hash's second half
    let wy = (parseInt(c.hash.slice(36, 44), 16) ^ parseInt(c.hash.slice(58, 66), 16)) >>> 0;
    const wr = () => {
      wy = (wy + 0x9e3779b9) >>> 0;
      let z = Math.imul(wy ^ (wy >>> 16), 0x21f0aaad);
      z = Math.imul(z ^ (z >>> 15), 0x735a2d97); // second round
      return ((z ^ (z >>> 15)) >>> 0) / 4294967296; // to 0..1 for the newer traits
    };
    for (let i = 0; i < 6; i++) wr();
    const wpk = pairs => { let t = 0; for (const p of pairs) t += p[1]; let r = wr() * t; for (const p of pairs) { r -= p[1]; if (r < 0) return p[0]; } return pairs[0][0]; };
    // a chance to trade an old value for a newer one; always two draws so the stream never shifts
    const trade = (cur, p, pairs) => { const a = wr(), b = wpk(pairs); return a < p ? b : cur; };
    let pose = wpk([['Standing', 46], ['Sniffing', 20], ['Rearing', 18], ['Trotting', 16]]);
    const prop = wpk([['None', 42], ['Ant', 14], ['Floppy Disk', 10], ['Mug', 10], ['Flower', 10], ['Cactus', 8], ['Grubs', 6]]);
    const ground = wpk([['Dots', 40], ['Sand', 18], ['Grass', 16], ['Tiles', 14], ['Rug', 12]]);
    const chrome = wpk([['Bare Screen', 42], ['Window', 26], ['Menu Bar', 18], ['Dialog Box', 14]]);
    const cursor = wpk([['None', 44], ['Arrow', 18], ['Pointing Hand', 12], ['Wristwatch', 10], ['Crosshair', 9], ['Paint Bucket', 7]]);
    // the legendaries: xoshiro128** on the hash's first, third, fifth and seventh words, so no other roll moves
    let xa = parseInt(c.hash.slice(2, 10), 16) >>> 0, xb = parseInt(c.hash.slice(18, 26), 16) >>> 0, xc = parseInt(c.hash.slice(34, 42), 16) >>> 0, xd = (parseInt(c.hash.slice(50, 58), 16) ^ 0x9e3779b9) >>> 0;
    const xo = () => {
      const r = Math.imul(((Math.imul(xb, 5) << 7) | (Math.imul(xb, 5) >>> 25)), 9) >>> 0, t2 = xb << 9;
      xc ^= xa; xd ^= xb; xb ^= xc; xa ^= xd; xc ^= t2; xd = (xd << 11) | (xd >>> 21);
      return r / 4294967296;
    };
    for (let i = 0; i < 8; i++) xo();
    const lu = xo();
    const LEG = lu < 0.0013 ? 'Glyptodon' : lu < 0.0026 ? 'Engraving' : '';
    const rosette = !LEG && lu < 0.0076;          // the coveted prize rosette, about one in two hundred
    shell = trade(shell, 0.22, [['Checkerboard', 36], ['Herringbone', 34], ['Plaid', 30]]);
    hat = trade(hat, 0.24, [['Party Hat', 30], ['Top Hat', 26], ['Cowboy Hat', 26], ['Bandana', 18]]);
    eyes = trade(eyes, 0.16, [['Wink', 55], ['Heart', 45]]);
    screen = trade(screen, 0.16, [['Amber Phosphor', 55], ['Green Phosphor', 45]]);
    if (LEG) c.trait('Legendary', LEG);
    if (LEG === 'Glyptodon') { shell = 'Rosette Scutes'; screen = screen === 'Inverted' ? 'Paper White' : screen; }
    if (LEG === 'Engraving') { screen = 'Banknote'; }
    // the framing: a fourth stream (xorshift32 on two more hash slices), so no other roll moves
    let fx = (parseInt(c.hash.slice(10, 18), 16) ^ Math.imul(parseInt(c.hash.slice(42, 50), 16), 0x85ebca6b) ^ 0x3243f6a8) >>> 0 || 0x2545f491;
    const fr = () => { fx ^= fx << 13; fx >>>= 0; fx ^= fx >>> 17; fx ^= fx << 5; fx >>>= 0; return fx / 4294967296; };
    for (let i = 0; i < 5; i++) fr();
    let framing = 'Side View';
    { let r = fr() * 100; for (const [v, p] of [['Side View', 30], ['Close-Up', 28], ['Side View, Facing Right', 22], ['Close-Up, Facing Right', 20]]) { r -= p; if (r < 0) { framing = v; break; } } }
    if (LEG) framing = framing.includes('Right') ? 'Side View, Facing Right' : 'Side View';
    // a phosphor screen's glow blurs a close-up, so those always stand side on
    if ((screen === 'Amber Phosphor' || screen === 'Green Phosphor') && framing.startsWith('Close')) framing = framing.includes('Right') ? 'Side View, Facing Right' : 'Side View';
    // newer poses (turned to look out at you, nose down digging, and a real rear up on its hind legs) and a pig's
    // nose, rolled on the framing's stream after it, so no other roll moves
    const frOf = pairs => { let tot = 0; for (const p of pairs) tot += p[1]; let r = fr() * tot; for (const p of pairs) { r -= p[1]; if (r < 0) return p[0]; } return pairs[0][0]; };
    if (fr() < 0.42) pose = frOf([['Looking Out', 40], ['Digging', 30], ['Rearing', 30]]); else fr();
    if (fr() < 0.26) snout = 'Pig-Nosed';
    // a busy desktop only behind a plain shell: a busy shell gets a quiet desktop, so the animal reads first
    if (['Diagonal', 'Bricks', 'Waves'].includes(desk) && !(shell === 'Solid' || shell === 'Stripes')) desk = frOf([['Plain', 40], ['Black', 30], ['Light Dots', 20], ['Grey', 10]]); else fr();
    // the glyptodon never wears spectacles and always stands side on, so it reads as an ancient armadillo, not a turtle
    if (LEG === 'Glyptodon') { if (eyes === 'Spectacles') eyes = 'Dot'; if (pose === 'Looking Out') pose = 'Standing'; }
    c.trait('Shell', shell); c.trait('Bands', LEG === 'Glyptodon' ? 'Fused' : bands); c.trait('Ears', ears); c.trait('Eyes', eyes); c.trait('Snout', snout); c.trait('Pose', pose);
    c.trait('Headwear', hat); c.trait('Prop', prop); c.trait('Desktop', desk); c.trait('Ground', ground); c.trait('Window', LEG === 'Engraving' ? 'Guilloche Frame' : chrome); c.trait('Cursor', cursor); c.trait('Screen', screen);
    if (rosette) c.trait('Pinned', 'Prize Rosette');
    c.trait('Framing', framing);
    // how far each pose tips the body about its back feet
    // (half as far in a close-up, so the head stays the middle of the picture)
    const poseRA = () => (pose === 'Rearing' ? (LEG === 'Glyptodon' ? -0.3 : -0.42) : pose === 'Sniffing' ? 0.1 : pose === 'Digging' ? 0.22 : 0) * (framing.startsWith('Close') ? 0.5 : 1);
    // a close-up is the whole animal a little nearer (1.15 times): the snout tip, eye, ears and most of the shell dome stay
    // in the picture with the halo round the head; the floor stays near the bottom and the props keep their corner
    const N0 = 64, ZOOM = framing.startsWith('Close') ? 1.15 : 1, MIR = framing.includes('Right');
    const ZX = 20, ZY = 36, PXO = ZOOM !== 1 ? N0 - 13 : 0;   // a close-up keeps its props in the lower right corner
    let ZAX = 14, ZAY = 37;
    let ZM = 1;

    const bandPats = bandPats0.map((m, i) => {
      if (shell === 'Mixed') return m;
      if (shell === 'Bricks & Weave') return i % 2 ? 'weave' : 'bricks';
      if (shell === 'Scales') return i % 2 ? 'scales' : 'dark';
      if (shell === 'Stripes') return i % 2 ? 'vlines' : 'hlines';
      if (shell === 'Studded') return i % 2 ? 'studs' : 'dark';
      if (shell === 'Diamonds') return i % 2 ? 'diamonds' : 'grey';
      if (shell === 'Checkerboard') return i % 2 ? 'checker' : 'light';
      if (shell === 'Herringbone') return i % 2 ? 'herring' : 'grey';
      if (shell === 'Plaid') return i % 2 ? 'cross' : 'dark';
      return 'black';
    });
    const deskPat = LEG === 'Engraving' ? 'white' : { Plain: 'white', Grey: 'grey', 'Light Dots': 'light', Diagonal: 'diag', Bricks: 'bricks', Waves: 'waves', Black: 'black' }[desk];
    const groundPat = LEG === 'Engraving' ? 'hlines' : { Dots: 'dots', Sand: 'sand', Grass: 'tuft', Tiles: 'tiles', Rug: 'zigzag' }[ground];
    const INK = { 'Paper White': ['#141414', '#f2f1ea'], Cream: ['#2a2018', '#efe2c4'], 'Blue Ink': ['#1a2a8a', '#eef0f8'], Inverted: ['#f0f0f0', '#101010'], Sepia: ['#4a2a14', '#e8d4b0'], 'Amber Phosphor': ['#ffb02e', '#1a1006'], 'Green Phosphor': ['#5cff7a', '#04140a'], Banknote: ['#16352a', '#f1ead0'] }[screen];
    const ink = INK[0].match(/\w\w/g).map(h => parseInt(h, 16)), paper = INK[1].match(/\w\w/g).map(h => parseInt(h, 16));
    const antPh = wr() * 10, cursorAt = [8 + wr() * 44, 8 + wr() * 22];

    const N = 64, bit = new Uint8Array(N * N), cm = new Uint8Array(N * N);
    let groundY = N;
    let SY = 0;
    // the pose turns the body about its back feet: forward for its own drawing calls, back for shape tests
    let RA = 0;
    const RPX = 50, RPY = 52;
    const fwd = (x, y) => { if (!RA) return [x, y]; const dx = x - RPX, dy = y - RPY, cs = Math.cos(RA), sn = Math.sin(RA); return [RPX + dx * cs + dy * sn, RPY - dx * sn + dy * cs]; };
    const back = (x, y) => { if (!RA) return [x, y]; const dx = x - RPX, dy = y - RPY, cs = Math.cos(RA), sn = Math.sin(RA); return [RPX + dx * cs - dy * sn, RPY + dx * sn + dy * cs]; };
    const dot1 = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) { bit[y * N + x] = v; cm[y * N + x] = 1; } };
    const set = (x, y, v) => {
      [x, y] = fwd(x, y); x = Math.round(x); y = Math.round(y) + SY;
      if (ZM === 1) { dot1(x, y, v); return; }
      // in a close-up each dot covers the screen dots whose centres fall inside it, so lines stay unbroken
      const x0 = Math.ceil(ZX + (x - ZAX) * ZM - 0.5), x1 = Math.max(x0, Math.ceil(ZX + (x + 1 - ZAX) * ZM - 0.5) - 1);
      const y0 = Math.ceil(ZY + (y - ZAY) * ZM - 0.5), y1 = Math.max(y0, Math.ceil(ZY + (y + 1 - ZAY) * ZM - 0.5) - 1);
      for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) dot1(xx, yy, v);
    };
    // a screen dot's centre, back in the drawing's own coordinates (through the close-up, the lift and the pose)
    const toWorld = (x, y) => ZM === 1 ? back(x + 0.5, y + 0.5 - SY) : back(ZAX + (x + 0.5 - ZX) / ZM, ZAY + (y + 0.5 - ZY) / ZM - SY);
    const own = new Uint8Array(N * N);
    // fill a region with a pattern, then outline it in black with a one-dot white gap outside
    const shape = (inside, patName, outline = true, gap = true) => {
      own.fill(0);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const p = toWorld(x, y); if (inside(p[0], p[1])) own[y * N + x] = 1; }
      const at = (x, y) => x >= 0 && y >= 0 && x < N && y < N && own[y * N + x];
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // each dot of the screen
        if (own[y * N + x]) {
          cm[y * N + x] = 1;
          const edge = !at(x - 1, y) || !at(x + 1, y) || !at(x, y - 1) || !at(x, y + 1);
          bit[y * N + x] = edge && outline ? 1 : pat(patName, x, y);
        } else if (gap && (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1))) bit[y * N + x] = 0;
      }
    };
    const ellIn = (cx, cy, rx, ry) => (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

    // the creature (and all that stands with it) keeps a black outline and a plain halo, three or four dots of paper,
    // before the desktop pattern starts, so it reads as a silhouette first and a texture second
    const dist = new Float32Array(N * N);
    function finish() {
      for (let i = 0; i < N * N; i++) dist[i] = cm[i] ? 0 : 99;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x; let d = dist[i]; if (!d) continue;
        if (x > 0) d = Math.min(d, dist[i - 1] + 1);
        if (y > 0) { d = Math.min(d, dist[i - N] + 1); if (x > 0) d = Math.min(d, dist[i - N - 1] + 1.41); if (x < N - 1) d = Math.min(d, dist[i - N + 1] + 1.41); }
        dist[i] = d;
      }
      for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) {
        const i = y * N + x; let d = dist[i]; if (!d) continue;
        if (x < N - 1) d = Math.min(d, dist[i + 1] + 1);
        if (y < N - 1) { d = Math.min(d, dist[i + N] + 1); if (x < N - 1) d = Math.min(d, dist[i + N + 1] + 1.41); if (x > 0) d = Math.min(d, dist[i + N - 1] + 1.41); }
        dist[i] = d;
      }
      for (let y = 0; y < groundY; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (cm[i]) continue;
        bit[i] = dist[i] <= 1 ? 1 : dist[i] <= 4.3 ? 0 : pat(deskPat, x, y);
      }
    }
    function floor(gy) {
      groundY = gy;
      for (let y = gy; y < N; y++) for (let x = 0; x < N; x++) bit[y * N + x] = y === gy ? 1 : pat(desk === 'Black' && groundPat === 'dots' ? 'grey' : groundPat, x, y);
    }
    // little pictures drawn dot by dot: X ink, O paper
    let SX0 = 0;
    const stamp = (rows, x0, y0) => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') { const x = Math.round(x0) + i + SX0, y = Math.round(y0) + j; if (x >= 0 && y >= 0 && x < N && y < N) { bit[y * N + x] = r[i] === 'X' ? 1 : 0; cm[y * N + x] = 1; } } });
    const CURSORS = {
      Arrow: ['X.......', 'XX......', 'XOX.....', 'XOOX....', 'XOOOX...', 'XOOOOX..', 'XOOXXX..', 'XXOX....', 'X..XOX..', '...XX...'],
      'Pointing Hand': ['..XX....', '..XOX...', '..XOX...', '..XOXXX.', 'XXXOXOXX', 'XOXOOOOX', '.XOOOOOX', '..XOOOX.', '..XXXXX.'],
      Wristwatch: ['.XXXX.', '.XXXX.', 'XOOOOX', 'XOOXOX', 'XOXOOX', 'XOOOOX', '.XXXX.', '.XXXX.'],
      Crosshair: ['...X...', '...X...', '.......', 'XX.O.XX', '.......', '...X...', '...X...'],
      'Paint Bucket': ['..XX....', '.XOOX...', 'XOOOOX..', 'XOOOOOXX', '.XOOOX.X', '..XXX..X'],
    };

    let clubAt = -9, sealAt = -9, rosAt = -9;
    // facing right: the drawing, its floor and its desktop are mirrored before the window, the ants and the cursor go on
    function mirror() {
      if (!MIR) return;
      for (let y = 0; y < N; y++) for (let x = 0, j = y * N; x < N / 2; x++) {
        const a = j + x, b = j + N - 1 - x, v = bit[a], m = cm[a];
        bit[a] = bit[b]; bit[b] = v; cm[a] = cm[b]; cm[b] = m;
      }
    }
    function paint(t, curl, ant, pointer) {
      SY = 0; RA = 0; ZM = 1;
      const GL = LEG === 'Glyptodon';
      bit.fill(0); cm.fill(0); groundY = N;
      const blink = ((t + blinkOff) % 4.6) < 0.15;
      const tw = Math.floor((t + twOff) * 2.2) % 7 === 0 ? 1 : 0;
      if (curl > 0) {
        // rolled up: a banded ball, bands curving round it like the plates of a real one, the ears and tail tip peeking
        const r = 19 - (1 - curl) * 4, cx = 32 + Math.sin(t * 9) * curl * 1.2, cy = 33;
        floor(52);
        shape(ellIn(cx, cy, r, r), 'white');
        const cols = bands + 3;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // each dot of the screen
          const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
          if (dx * dx + dy * dy >= (r - 1) ** 2) continue;
          const u = Math.asin(Math.max(-1, Math.min(1, dx / Math.sqrt(Math.max(1, (r - 1) ** 2 - dy * dy * 0.35))))) / Math.PI + 0.5;
          const f = u * cols, k = Math.floor(f), edge = f - k < 0.08 || f - k > 0.92;
          let v = edge ? 1 : pat(bandPats[k % 7], x, y);
          // shade the lower right of the ball with a dither, so it reads as round
          if (!edge && dx * 0.6 + dy * 0.8 > r * 0.45 && pat('grey', x, y)) v = 1;
          if (!edge && dx * 0.6 + dy * 0.8 < -r * 0.55 && v && pat('light', x, y) === 0 && (x + y) % 2) v = 0;
          bit[y * N + x] = v;
        }
        shape(ellIn(cx - r * 0.72, cy + r * 0.45, 3.2, 2.6), 'light');
        set(cx - r * 0.8 - 1, cy + r * 0.45, 1);
        shape(ellIn(cx + r * 0.55, cy - r * 0.78, 2.2, 3), 'light');
        finish();
        mirror();
        return;
      }
      // side on: ground, legs, tail, the banded shell, then the head
      SY = -5;
      const GY = 52;
      // the glyptodon's club strikes the ground and the whole screen jumps
      const ct = t - clubAt, shake = GL && ct > 0.25 && ct < 0.5 ? (Math.floor(ct * 40) % 2 ? 1 : -1) : 0;
      SY += shake;
      ZM = ZOOM;
      if (ZM !== 1) {
        // the close-up keeps the middle of the head on the same screen dot whatever the pose
        RA = poseRA();
        const h = fwd(14, 42); ZAX = h[0]; ZAY = h[1] + SY; RA = 0;
      }
      const floorY = ZM === 1 ? GY + SY : Math.min(N - 8, Math.round(ZY + (GY + SY - ZAY) * ZM));
      floor(floorY);
      if (prop === 'Cactus') { const zs = ZM, ss = SY; ZM = 1; SY = floorY - GY; shape((x, y) => (x -= PXO, true) && (x >= 4 && x <= 7 && y > 26 && y <= GY) || (x >= 1 && x <= 3 && y > 34 && y < 40) || (x >= 1 && x <= 2 && y > 29 && y <= 36) || (x >= 8 && x <= 10 && y > 38 && y < 42) || (x >= 9 && x <= 10 && y > 32 && y <= 40), 'vlines'); ZM = zs; SY = ss; }
      RA = poseRA();
      const trot = pose === 'Trotting' ? Math.floor(t * 6) % 2 : 0;
      if (pose === 'Trotting') SY -= trot;
      if (pose === 'Digging') shape(ellIn(4, GY + 1, 7, 3.4), 'sand');
      (GL ? [17, 24, 37, 44] : [24, 31, 45, 52]).forEach((lx, li) => {
        const lift = pose === 'Trotting' && (li % 2) === trot ? 2 : pose === 'Digging' && li < 2 && (li === (Math.floor(t * 8) % 2)) ? 2 : 0;
        const w = GL ? 3 : 2;
        shape((x, y) => x >= lx - w && x <= lx + w && y > 44 && y <= GY - lift, 'dark'); set(lx - 3, GY - 1 - lift, 1); set(lx - 2, GY - lift, 1);
      });
      if (GL) {
        // an armoured tail ending in a spiked club, swung on a tap
        const sw = ct < 0.25 ? -ct / 0.25 * 0.9 : ct < 0.45 ? -0.9 + (ct - 0.25) / 0.2 * 1.5 : ct < 1 ? 0.6 * (1 - (ct - 0.45) / 0.55) : 0;
        const ang = -0.35 + sw, bx = 47, by = 42, TL = 10, ex = bx + Math.cos(ang) * TL, ey = by + Math.sin(ang) * TL;
        shape((x, y) => { const dx = x - bx, dy = y - by, u = (dx * (ex - bx) + dy * (ey - by)) / (TL * TL); if (u < 0 || u > 1) return false; const px = bx + (ex - bx) * u, py = by + (ey - by) * u; return Math.hypot(x - px, y - py) < 3.4 - u * 1.2; }, 'scutes');
        // a big spiked club: a studded ball with six spikes
        shape(ellIn(ex, ey, 4.2, 4.2), 'studs');
        for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + ang; for (let r = 4.6; r < 7.2; r += 0.5) { set(ex + Math.cos(a) * r, ey + Math.sin(a) * r, 1); if (r < 5.8) set(ex + Math.cos(a + 0.12) * r, ey + Math.sin(a + 0.12) * r, 1); } }
      } else {
      shape((x, y) => { const tt = (x - 56) / 8; return tt >= 0 && tt <= 1 && Math.abs(y - (44 + tt * 6)) < 3 * (1 - tt) + 0.6; }, 'white');
      for (let k = 0; k < 3; k++) { const x = 58 + k * 2; for (let y = 42 + k; y < 49 + k; y++) if (Math.abs(y - (44 + (x - 56) / 8 * 6)) < 3 * (1 - (x - 56) / 8) + 0.2) set(x, y, 1); }
      }
      // shell dome
      const CX = GL ? 31 : 38, CY = 48, RX = GL ? 20 : 23, RY = GL ? 28 : 27;
      const dome = (x, y) => y < CY && ((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 <= 1;
      shape(dome, 'white');
      const front = CX - RX + 8, backX = CX + RX - 7, bw = (backX - front) / bands;
      shape((x, y) => dome(x, y) && x < front - 0.5, shell === 'Solid' ? 'black' : 'grey', false, false);
      shape((x, y) => dome(x, y) && x > backX + 0.5, shell === 'Solid' ? 'black' : 'grey', false, false);
      if (GL) {
        // one fused dome of rosette scutes, with a rim of studs
        shape((x, y) => dome(x, y) && y > CY - RY + 1, 'scutes', false, false);
        shape((x, y) => dome(x, y) && y > CY - 6, 'studs', false, false);
      } else for (let b = 0; b < bands; b++) { // one plate at a time
        const x0 = front + b * bw, x1 = x0 + bw;
        shape((x, y) => dome(x, y) && x > x0 + 0.6 && x < x1 - 0.6 && y > CY - RY + 1, bandPats[b], false, false);
      }
      if (LEG === 'Engraving') {
        // contour lines that follow the dome round, crossed in its shadow
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const p = toWorld(x, y); if (!dome(p[0], p[1]) || p[1] < CY - RY + 1.5) continue;
          const e = Math.hypot((p[0] - CX) / RX, (p[1] - CY) / RY), sh = (p[0] - CX) / RX * 0.6 + (p[1] - CY + RY) / RY * 0.5;
          bit[y * N + x] = (e * 7 % 1) < 0.16 || (sh > 0.55 && (((x - y) % 3) + 3) % 3 === 0) || (sh > 0.9 && (((x + y) % 3) + 3) % 3 === 0) ? 1 : 0;
        }
      }
      if (!GL) for (let b = 0; b <= bands; b++) { const x = Math.round(front + b * bw); for (let y = 0; y < CY; y++) if (dome(x, y)) set(x, y, 1); }
      for (let x = 0; x < N; x++) if (dome(x, CY - 1)) set(x, CY - 1, 1);
      for (let x = CX - RX + 1; x < CX + RX; x++) { set(x, CY - 3, 1); if (x % 3 === 0) set(x, CY - 2, 1); }
      // ears, head, face and headwear: side on, or turned to look out at you
      const earR = { Tall: [3, 7], Round: [4.2, 4.2], Floppy: [3.4, 6], Tufted: [3, 7], Huge: [5, 9] }[ears];
      const earAt = (ex0, ey0, etilt, er = earR) => { shape((x, y) => { const dx = x - ex0, dy = y - ey0, u = dx * Math.cos(etilt) + dy * Math.sin(etilt), v = -dx * Math.sin(etilt) + dy * Math.cos(etilt); return er[2] ? Math.abs(v) <= er[1] && Math.abs(u) <= er[0] * (1 - (v / er[1]) ** 2) : (u / er[0]) ** 2 + (v / er[1]) ** 2 <= 1; }, 'light'); if (ears === 'Tufted') for (let k = 0; k < 3; k++) set(ex0 - 2 + k * 2, ey0 - er[1] - 1 - (k % 2), 1); };
      const FRONT = pose === 'Looking Out' && !GL;
      const capPat = GL ? 'scutes' : shell === 'Solid' ? 'dark' : bandPats[0] === 'dark' ? 'grey' : 'dark';
      // the face looking out: a broad armoured crown narrowing to a snout that points at you
      const FXc = 14, FYc = 35, snLen = snout === 'Long' ? 11 : snout === 'Stubby' ? 8 : snout === 'Pig-Nosed' ? 8 : 10;
      let head, tipX, tipY;
      const antX = prop === 'Ant' ? 2 + ((t * 3 + antPh) % 16) : -9;
      if (FRONT) {
        // small leaf-shaped ears set wide on the head, whatever their size side on (so it never reads as a rabbit or a mouse)
        const leaf = ears === 'Huge' ? [2.8, 4.4, 1] : [2.4, 3.8, 1];
        for (const s of [-1, 1]) earAt(FXc + s * 7.4, FYc - 5 + (ears === 'Floppy' ? 1.5 : 0) + (s > 0 ? tw : 0), s * (ears === 'Floppy' ? 1.4 : 0.8), leaf);
        // a small rounded head, and a long narrow snout down the middle of the face, tapering to a small nose pad
        head = (x, y) => { const dx = x - FXc, dy = y - FYc; if ((dx / 7.4) ** 2 + (dy / 6) ** 2 <= 1) return true; return dy >= 2 && dy <= snLen + 0.6 && Math.abs(dx) <= 3.5 - (dy - 2) * 1.8 / snLen; };
        shape(head, 'light');
        // the armoured head shield: a plate over the crown coming to a point between the eyes, outlined so it reads as a plate
        shape((x, y) => head(x, y) && Math.abs(x - FXc) < Math.min(5.8, (FYc + 1.5 - y) * 1.25), capPat, true, false);
        tipX = FXc; tipY = FYc + snLen + tw * 0.5;
        if (snout === 'Pig-Nosed') { shape(ellIn(tipX, tipY, 2.6, 1.8), 'white'); set(tipX - 1, tipY, 1); set(tipX + 1, tipY, 1); }
        else shape(ellIn(tipX, tipY, 1.6, 1.2), 'black', true, false);
        // a little mouth under the nose, and the quick tongue when the ant comes near
        set(tipX - 1, tipY + 2.6, 1); set(tipX, tipY + 3, 1); set(tipX + 1, tipY + 2.6, 1);
        if (prop === 'Ant' && antX > 12) for (let k = 0; k < 3; k++) set(tipX, tipY + 4 + k, 1);
        if (snout === 'Whiskered') for (const s of [-1, 1]) for (let k = 0; k < 3; k++) for (let j = 2; j < 8; j++) set(tipX + s * j, tipY - 1 + k * 1.2 + (k - 1) * j * 0.25, 1);
        if (snout === 'Moustache') for (const s of [-1, 1]) for (let j = 1; j < 7; j++) { set(tipX + s * j, tipY + 1.6 + j * 0.3, 1); set(tipX + s * j, tipY + 2.4 + j * 0.3, 1); }
      } else {
        // ear behind the head
        earAt(21, 32 - earR[1] * 0.6 + (ears === 'Floppy' ? 6 : 0) + tw, ears === 'Floppy' ? -1.1 : -0.25);
        // head: a wedge pointing down to the left, with an armoured cap (the glyptodon's is long and low, with bony studs)
        const sl = GL ? 0.95 : snout === 'Stubby' ? 0.7 : snout === 'Pig-Nosed' ? 0.78 : 1;
        tipX = 19 - 16 * sl; tipY = 45 + 3 * sl + (GL ? 2.5 : 0) + tw * 0.5;
        const hr = GL ? 9 : 8, hb = GL ? 2.6 : 1.5;
        head = (x, y) => {
          const ax = 20, ay = 39; // back of the head
          const vx = tipX - ax, vy = tipY - ay, L2 = vx * vx + vy * vy;
          const tt = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / L2));
          const dx = x - ax - vx * tt, dy = y - ay - vy * tt;
          return Math.hypot(dx, dy) < hr * (1 - tt) + hb;
        };
        shape(head, 'light');
        shape((x, y) => head(x, y) && y < 37 - (20 - x) * 0.4 + (GL ? 1.5 : 0) && x > 9, capPat, false, false);
        if (GL) {
          // bony studs along the top of the skull
          const vx = tipX - 20, vy = tipY - 39, L = Math.hypot(vx, vy), nx = vy / L, ny = -vx / L, s = ny < 0 ? 1 : -1;
          for (const u of [0.08, 0.28, 0.48, 0.68]) { const r = hr * (1 - u) + hb - 0.4; shape(ellIn(20 + vx * u + nx * s * r, 39 + vy * u + ny * s * r, 1.4, 1.4), 'black', true, false); }
        }
        if (snout === 'Pig-Nosed') { shape(ellIn(tipX - 0.2, tipY - 0.3, 1.5, 2.9), 'white'); set(tipX - 0.2, tipY - 1.3, 1); set(tipX - 0.2, tipY + 0.8, 1); }
        else shape(ellIn(tipX + 0.5, tipY, 2, 1.7), 'black', true, false);
        // mouth line, and a quick tongue when the ant comes near
        for (let k = 0; k < 5; k++) set(tipX + 3 + k, tipY + 2 - k * 0.35, 1);
        if (prop === 'Ant' && antX > 12) for (let k = 0; k < 3; k++) set(tipX - 1 - k, tipY + 2 + k * 0.6, 1);
        if (snout === 'Whiskered') for (let k = 0; k < 3; k++) for (let j = 0; j < 6; j++) set(tipX - j, tipY - 2 + k * 2 + (k - 1) * j * 0.3, 1);
        if (snout === 'Moustache') for (let j = 0; j < 7; j++) { set(tipX + 1 - j * 0.8, tipY + 1 + j * 0.3, 1); set(tipX + 2 - j * 0.8, tipY + 2 + j * 0.3, 1); }
      }
      // eyes: one side on, two looking out
      const eyeAt = (ex, ey) => {
        if (blink && eyes !== 'X') { for (let k = -2; k <= 2; k++) set(ex + k, ey, 1); }
        else if (eyes === 'Dot') { shape(ellIn(ex, ey, 1.6, 1.8), 'black', false, true); set(ex - 1, ey - 1, 0); }
        else if (eyes === 'Big Round') { shape(ellIn(ex, ey, 3, 3), 'white'); shape(ellIn(ex - 0.6, ey + 0.4, 1.6, 1.6), 'black', false, false); set(ex - 1, ey - 1, 0); }
        else if (eyes === 'Sleepy') { for (let k = -2; k <= 2; k++) set(ex + k, ey, 1); set(ex - 2, ey - 1, 1); set(ex + 2, ey - 1, 1); }
        else if (eyes === 'Spectacles') { shape(ellIn(ex, ey, 1.4, 1.4), 'black', false, false); for (let a = 0; a < 40; a++) { const r = a / 40 * 6.283; set(ex + Math.cos(r) * 3.6, ey + Math.sin(r) * 3.6, 1); } if (!FRONT || ex < FXc) for (let x = ex + 4; x <= ex + (FRONT ? 5 : 8); x++) set(x, ey - 1, 1); }
        else if (eyes === 'Star') { for (let k = -2; k <= 2; k++) { set(ex + k, ey, 1); set(ex, ey + k, 1); } set(ex - 1, ey - 1, 1); set(ex + 1, ey + 1, 1); set(ex + 1, ey - 1, 1); set(ex - 1, ey + 1, 1); }
        else if (eyes === 'X') for (let k = -2; k <= 2; k++) { set(ex + k, ey + k, 1); set(ex + k, ey - k, 1); }
        else if (eyes === 'Wink') { for (let k = -2; k <= 2; k++) set(ex + k, ey + (Math.abs(k) === 2 ? 0 : -1), 1); }
        else if (eyes === 'Heart') { for (const [a, b] of [[-2, -1], [-1, -2], [0, -1], [1, -2], [2, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2], [-1, 0], [0, 0], [1, 0], [0, 1]]) set(ex + a, ey + b, 1); }
      };
      if (FRONT) { eyeAt(FXc - 4.5, FYc - 0.5); if (eyes === 'Wink') { for (let k = -2; k <= 2; k++) set(FXc + 4.5 + k, FYc - 0.5, 1); } else eyeAt(FXc + 4.5, FYc - 0.5); }
      else eyeAt(15, 40);
      // headwear on the crown of the head
      const hx = FRONT ? FXc : 19, hy = FRONT ? FYc - 6 : 32;
      if (hat === 'Bowler') { shape((x, y) => y < hy && ellIn(hx, hy, 6, 6)(x, y), 'black'); shape(ellIn(hx, hy, 9, 1.5), 'black'); for (let x = hx - 5; x <= hx + 5; x++) set(x, hy - 2, 0); }
      if (hat === 'Beret') { shape(ellIn(hx - 1, hy - 1, 8, 3.2), 'dark'); set(hx - 1, hy - 5, 1); set(hx - 1, hy - 6, 1); }
      if (hat === 'Bow') { shape((x, y) => { const dx = Math.abs(x - hx - 4), dy = Math.abs(y - hy + 1); return dx < 5 && dy < 1 + dx * 0.6; }, 'diag'); shape(ellIn(hx + 4, hy - 1, 1.4, 1.4), 'black'); }
      if (hat === 'Sweatband') shape((x, y) => head(x, y) && (FRONT ? Math.abs(y - (FYc - 3.5)) < 1.6 : Math.abs((x - 15) + (y - 38) * 1.6) < 2.2), 'hlines');
      if (hat === 'Halo') { const yy = hy - 9 + Math.round(Math.sin(t * 1.5)); for (let a = 0; a < 60; a++) { const r = a / 60 * 6.283; set(hx + Math.cos(r) * 7, yy + Math.sin(r) * 1.8, 1); } }
      if (hat === 'Crown') shape((x, y) => { if (y > hy + 1 || y < hy - 9 || Math.abs(x - hx) > 6) return false; const sp = ((x - hx + 6) % 4 + 4) % 4; return y > hy - 4 || y > hy - 9 + Math.abs(sp - 2) * 2.5; }, 'studs');
      if (hat === 'Party Hat') { shape((x, y) => y <= hy + 1 && y > hy - 12 && Math.abs(x - hx) < (y - (hy - 12)) * 0.5, 'diag'); shape(ellIn(hx, hy - 12, 1.6, 1.6), 'black'); }
      if (hat === 'Top Hat') { shape((x, y) => x > hx - 5 && x < hx + 5 && y > hy - 11 && y <= hy, 'black'); shape(ellIn(hx, hy, 8.5, 1.4), 'black'); for (let x = hx - 4; x <= hx + 4; x++) set(x, hy - 3, 0); }
      if (hat === 'Cowboy Hat') { shape((x, y) => (y < hy && ellIn(hx, hy, 5.5, 6)(x, y) && Math.abs(x - hx) > 0.8 || y < hy && y > hy - 3 && ellIn(hx, hy, 5.5, 6)(x, y)), 'dark'); shape((x, y) => Math.abs(y - hy - (Math.abs(x - hx) > 6 ? -(Math.abs(x - hx) - 6) * 0.7 : 0)) < 1.2 && Math.abs(x - hx) < 11, 'black'); }
      if (hat === 'Bandana') { shape((x, y) => head(x, y) && (FRONT ? y < FYc - 1.5 : y < 37 - (20 - x) * 0.4 + 1.5 && x > 8), 'studs'); shape((x, y) => x > hx + 4 && x < hx + 10 && Math.abs(y - hy - 1 - (x - hx - 4) * 0.4) < 1.2 + (x - hx - 4) * 0.15, 'studs'); }
      // digging: clods of earth kicked back from its front paws (kept as screen dots, drawn after the halo)
      const clods = [];
      if (pose === 'Digging') for (let k = 0; k < 5; k++) { const p = ((t * 1.6 + k / 5) % 1), sp = fwd(22 + p * 18, GY - 2 - Math.sin(p * Math.PI) * 12 - k % 2); clods.push([Math.round(ZM === 1 ? sp[0] : ZX + (sp[0] - ZAX) * ZM), Math.round(ZM === 1 ? sp[1] + SY : ZY + (sp[1] + SY - ZAY) * ZM)]); }
      RA = 0;
      SY = 0;
      ZM = 1;
      // props on the ground beside it
      const pg = floorY - shake;
      if (prop === 'Ant') { const ax = Math.round(antX); if (ax < 12) stamp(['X.X.X', '.XXX.', 'X.X.X'], ax, pg - 3); }
      SX0 = PXO;
      if (prop === 'Ant') {}
      else if (prop === 'Floppy Disk') stamp(['XXXXXXXX', 'XOXXXXOX', 'XOXXXXOX', 'XOOOOOOX', 'XOOOOOOX', 'XOXXXXOX', 'XOXOOXOX', 'XXXXXXXX'], 1, pg - 8);
      else if (prop === 'Mug') { stamp(['XXXXXX.', 'XOOOOXX', 'XOOOOXOX', 'XOOOOXX', 'XXXXXX.'], 1, pg - 5); if (Math.floor(t * 2) % 2) stamp(['.X..', '..X.', '.X..'], 2, pg - 9); else stamp(['..X.', '.X..', '..X.'], 2, pg - 9); }
      else if (prop === 'Flower') { stamp(['.X.X.', 'XOXOX', '.XOX.', 'XOXOX', '.X.X.', '..X..', '..XX.', '..X..', '.XX..', '..X..'], 1, pg - 10); }
      else if (prop === 'Grubs') { stamp(['.XXX.', 'XOOOX', '.XXX.'], 2, pg - 3); stamp(['XXX', 'OOX', 'XXX'], 9, pg - 3); }
      SX0 = 0;
      if (rosette) {
        // the coveted prize rosette, pinned up on the screen beside it: pleated petals that spin when tapped, and two notched tails
        const rx0 = 54, ry0 = 16, spin = t - rosAt < 1.2 ? (t - rosAt) * 9 : Math.floor(t * 6.4) / 16;
        // its own plain note, pinned up with a one-dot drop shadow, so it never melts into the desktop
        for (let y = ry0 - 9; y <= ry0 + 15; y++) for (let x = rx0 - 8; x <= rx0 + 9; x++) {
          if (x < 0 || y < 0 || x >= N || y >= N) continue;
          const inBox = x <= rx0 + 8 && y <= ry0 + 14, shadow = !inBox && x > rx0 - 8 && y > ry0 - 9;
          if (!inBox && !shadow) continue;
          bit[y * N + x] = shadow || x === rx0 - 8 || x === rx0 + 8 || y === ry0 - 9 || y === ry0 + 14 ? 1 : 0; cm[y * N + x] = 1;
        }
        set(rx0, ry0 - 10, 1); set(rx0 - 1, ry0 - 10, 1); set(rx0, ry0 - 11, 1);
        for (const s2 of [-1, 1]) shape((x, y) => { const cx2 = rx0 + s2 * 2.4 + (y - ry0) * s2 * 0.22; return y > ry0 + 3 && y < ry0 + 13 - (Math.abs(x - cx2) < 0.8 ? 1.6 : 0) && Math.abs(x - cx2) < 1.8; }, 'black');
        shape(ellIn(rx0, ry0, 7.2, 7.2), 'white');
        for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const r = Math.hypot(x, y); if (r < 6.2 && r > 2.9) set(rx0 + x, ry0 + y, (((Math.atan2(y, x) + spin) / (Math.PI / 4)) % 1 + 1) % 1 < 0.5 && r < 6 - ((((Math.atan2(y, x) + spin) / (Math.PI / 4)) % 1 + 1) % 1) * 2 ? 1 : 0); }
        shape(ellIn(rx0, ry0, 1.9, 1.9), 'black', true, true); set(rx0 - 0.5, ry0 - 0.5, 0);
      }
      finish();
      for (const [x, y] of clods) if (x >= 0 && y >= 0 && x < N && y < N) { bit[y * N + x] = 1; if (x + 1 < N) bit[y * N + x + 1] = 1; }
      mirror();
      // the desktop around it (an engraving gets a banknote's guilloche frame instead)
      if (LEG === 'Engraving') {
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const d = Math.min(x, y, N - 1 - x, N - 1 - y); if (d > 6) continue;
          // two waves woven round the edge between ruled lines, like the border of a banknote
          const along = d === Math.min(y, N - 1 - y) ? x : y, w1 = Math.round(3 + Math.sin(along * 0.62) * 2), w2 = Math.round(3 - Math.sin(along * 0.62) * 2);
          bit[y * N + x] = d === 0 || d === 6 || d === w1 || d === w2 ? 1 : 0;
        }
        // the seal, stamped where it was tapped
        if (t - sealAt < 2.5) for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) {
          const r = Math.hypot(x, y), a = Math.atan2(y, x), X = 51 + x, Y = 51 + y; if (r > 8.6 || X < 0 || Y < 0 || X >= N || Y >= N) continue;
          bit[Y * N + X] = r > 7.6 || Math.abs(r - (5 + Math.sin(a * 8 + t) * 1.1)) < 0.5 || Math.abs(r - (3 + Math.sin(a * 6 - t) * 0.8)) < 0.5 || r < 1 ? 1 : 0;
        }
      } else if (chrome === 'Window') {
        for (let x = 0; x < N; x++) { bit[x] = 1; bit[6 * N + x] = 1; for (let y = 1; y < 6; y++) bit[y * N + x] = y % 2 === 0 && x > 1 && x < N - 2 ? 1 : 0; }
        for (let y = 1; y < 6; y++) for (let x = 4; x < 10; x++) bit[y * N + x] = y === 1 || y === 5 || x === 4 || x === 9 ? 1 : 0;
        for (let y = 1; y < 6; y++) for (let x = 22; x < 42; x++) bit[y * N + x] = 0;
        for (let y = 0; y < N; y++) { bit[y * N] = 1; bit[y * N + N - 1] = 1; }
        for (let y = 2; y < 5; y++) for (let x = 26; x < 38; x++) if ((x * 5 + y) % 3 === 0) bit[y * N + x] = 1;
      } else if (chrome === 'Menu Bar') {
        for (let x = 0; x < N; x++) { for (let y = 0; y < 5; y++) bit[y * N + x] = 0; bit[5 * N + x] = 1; }
        for (const mx of [3, 12, 22, 32]) for (let y = 1; y < 4; y++) for (let x = mx; x < mx + (mx === 3 ? 3 : 6); x++) if (mx === 3 || (x + y) % 2 === 0 || y === 2) bit[y * N + x] = 1;
        const tick = Math.floor(t) % 2;
        for (let y = 1; y < 4; y++) for (let x = 54; x < 60; x++) bit[y * N + x] = (y === 2 && x === 56 + tick) || y !== 2 && (x === 54 || x === 59) ? 1 : 0;
      } else if (chrome === 'Dialog Box') {
        for (let k = 0; k < N; k++) for (const e of [0, 2]) { bit[e * N + k] = 1; bit[(N - 1 - e) * N + k] = 1; bit[k * N + e] = 1; bit[k * N + N - 1 - e] = 1; }
        for (let k = 0; k < N; k++) { bit[N + k] = 0; bit[(N - 2) * N + k] = 0; bit[k * N + 1] = 0; bit[k * N + N - 2] = 0; }
      }
      // marching ants round the selection, and everything inside it inverted
      if (ant) {
        const [x0, y0, x1, y1] = ant.map(Math.round), ph = Math.floor(t * 8);
        const ax0 = Math.max(0, Math.min(x0, x1)), ax1 = Math.min(N - 1, Math.max(x0, x1)), ay0 = Math.max(0, Math.min(y0, y1)), ay1 = Math.min(N - 1, Math.max(y0, y1));
        for (let y = ay0 + 1; y < ay1; y++) for (let x = ax0 + 1; x < ax1; x++) bit[y * N + x] ^= 1;
        let k = 0;
        const step = (x, y) => { if (x >= 0 && y >= 0 && x < N && y < N) bit[y * N + x] = ((k++ + ph) >> 1) % 2 ? 1 : 0; };
        for (let x = ax0; x <= ax1; x++) step(x, ay0);
        for (let y = ay0; y <= ay1; y++) step(ax1, y);
        for (let x = ax1; x >= ax0; x--) step(x, ay1);
        for (let y = ay1; y >= ay0; y--) step(ax0, y);
      }
      // the cursor: where the viewer points, or parked where the hash left it
      if (cursor !== 'None') {
        const cp = pointer || cursorAt, art = CURSORS[cursor], cx = Math.round(cp[0]) - (cursor === 'Crosshair' || cursor === 'Wristwatch' ? 3 : 0), cy = Math.round(cp[1]) - (cursor === 'Crosshair' || cursor === 'Wristwatch' ? 3 : 0);
        art.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') { const x = cx + i, y = cy + j; if (x >= 0 && y >= 0 && x < N && y < N) bit[y * N + x] = r[i] === 'X' ? 1 : 0; } });
        if (cursor === 'Wristwatch') { const a = Math.floor(t * 4) % 4, hand = [[0, -1], [1, 0], [0, 1], [-1, 0]][a]; const x = cx + 3 + hand[0], y = cy + 4 + hand[1]; if (x >= 0 && y >= 0 && x < N && y < N) bit[y * N + x] = 1; }
      }
    }

    const off = document.createElement('canvas'); // the 64 x 64 bitmap
    off.width = off.height = N;
    const oc = off.getContext('2d'); // the bitmap's pen
    const img = oc.createImageData(N, N); // one byte-pair per dot, later
    let curlAt = -9, dragFrom = null, ant = null, wasDown = false, wasIn = false;
    const lp = new Uint8Array(N * N);
    let lastKey = '';
    function frame(t) {
      const inp = c.input;
      const taps = inp.taps(), tp = taps[0];
      if (LEG && inp.inside && !wasIn) {
        if (LEG === 'Glyptodon') { c.sound.note(40, { dur: 0.5, vel: 0.16, wave: 'square', cutoff: 300 }); c.sound.note(43, { dur: 0.6, vel: 0.14, wave: 'square', cutoff: 300, at: 0.35 }); }
        else c.sound.note(84, { dur: 0.15, vel: 0.06, wave: 'triangle' });
      }
      wasIn = inp.inside;
      if (tp && rosette && t - curlAt > 1.7 && Math.hypot(tp.x * N - (MIR ? N - 54 : 54), tp.y * N - 19) < 10) {
        if (t - rosAt > 1.2) { rosAt = t; [64, 67, 72, 76, 79].forEach((m, i) => c.sound.note(m, { dur: i === 4 ? 0.4 : 0.1, vel: 0.13, wave: 'square', cutoff: 2600, at: i * 0.1 })); }
      } else if (tp && LEG === 'Glyptodon') {
        if (t - clubAt > 1.1) { clubAt = t; c.sound.hit('noise', 0.12, { cutoff: 1500, dur: 0.2, at: 0.05 }); c.sound.hit('kick', 0.9, { at: 0.27 }); c.sound.note(36, { dur: 0.4, vel: 0.18, wave: 'square', cutoff: 260, at: 0.27 }); }
      } else if (tp && LEG === 'Engraving') {
        if (t - sealAt > 0.8) { sealAt = t; c.sound.hit('kick', 0.5); c.sound.hit('noise', 0.1, { cutoff: 3000, dur: 0.06 }); [76, 83, 88].forEach((m, i) => c.sound.note(m, { dur: 0.6, vel: 0.06, wave: 'sine', at: 0.15 + i * 0.12 })); }
      } else if (tp && t - curlAt > 2.2) {
        curlAt = t;
        // a falling run as it tucks in, a rising one as it opens up again
        [76, 71, 67, 64].forEach((m, i) => c.sound.note(m, { dur: 0.06, vel: 0.16, wave: 'square', cutoff: 2200, at: i * 0.05 }));
        [64, 67, 71, 76].forEach((m, i) => c.sound.note(m, { dur: 0.06, vel: 0.14, wave: 'square', cutoff: 2200, at: 1.5 + i * 0.05 }));
      }
      if (inp.inside && inp.down) {
        const gx = inp.x * N, gy = inp.y * N;
        if (!wasDown) dragFrom = [gx, gy];
        if (dragFrom && Math.hypot(gx - dragFrom[0], gy - dragFrom[1]) > 3) ant = [dragFrom[0], dragFrom[1], gx, gy];
      } else if (wasDown && ant) c.sound.note(88, { dur: 0.04, vel: 0.08, wave: 'square', cutoff: 3000 });
      wasDown = inp.inside && inp.down;
      const ct = t - curlAt;
      const curl = ct < 1.6 ? Math.min(1, ct * 6, (1.6 - ct) * 6) : 0;
      // repaint only when something visible has changed: every frame while it rolls, swings, stamps or spins,
      // otherwise when a blink, a twitch, a step, the ant, the steam, the halo, the clock, the ants or the cursor moves on
      const live = curl > 0 || (LEG === 'Glyptodon' && t - clubAt < 1.05) || (LEG === 'Engraving' && (t - sealAt < 2.6 || inp.inside)) || (rosette && t - rosAt < 1.25);
      if (!live) {
        const antX = prop === 'Ant' ? 2 + ((t * 3 + antPh) % 16) : -9;
        const key = [((t + blinkOff) % 4.6) < 0.15, Math.floor((t + twOff) * 2.2) % 7 === 0, pose === 'Trotting' ? Math.floor(t * 6) % 2 : 0,
          prop === 'Ant' ? Math.round(antX) + ':' + (antX > 12) : 0, hat === 'Halo' ? Math.round(Math.sin(t * 1.5)) : 0, prop === 'Mug' ? Math.floor(t * 2) % 2 : 0,
          rosette ? Math.floor(t * 6.4) : 0, pose === 'Digging' ? Math.floor(t * 8) : 0, chrome === 'Menu Bar' ? Math.floor(t) % 2 : 0, ant ? ant.map(Math.round).join(':') + ':' + Math.floor(t * 8) : 0,
          cursor !== 'None' && inp.inside ? Math.round(inp.x * N) + ':' + Math.round(inp.y * N) : 0, cursor === 'Wristwatch' ? Math.floor(t * 4) % 4 : 0].join(',');
        if (key === lastKey) return;
        lastKey = key;
      } else lastKey = '';
      paint(t, curl, ant, inp.inside ? [inp.x * N, inp.y * N] : null);
      if (LEG === 'Engraving' && inp.inside) {
        // a jeweller's loupe under the pointer: the engraving at twice the size, inside a heavy ring
        lp.set(bit);
        const cx = inp.x * N, cy = inp.y * N;
        for (let y = Math.floor(cy - 11); y <= cy + 11; y++) for (let x = Math.floor(cx - 11); x <= cx + 11; x++) {
          if (x < 0 || y < 0 || x >= N || y >= N) continue;
          const r = Math.hypot(x - cx, y - cy);
          if (r < 9) { const sx = Math.floor(cx + (x - cx) / 2), sy = Math.floor(cy + (y - cy) / 2); bit[y * N + x] = sx >= 0 && sy >= 0 && sx < N && sy < N ? lp[sy * N + sx] : 0; }
          else if (r < 10.6) bit[y * N + x] = 1;
          else if (r < 11.4) bit[y * N + x] = 0;
        }
      }
      const d = img.data;
      for (let i = 0; i < N * N; i++) { const p = bit[i] ? ink : paper; d[i * 4] = p[0]; d[i * 4 + 1] = p[1]; d[i * 4 + 2] = p[2]; d[i * 4 + 3] = 255; }
      oc.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = false; // keep the dots square
      g.drawImage(off, 0, 0, S, S);
      // a phosphor screen glows a little past each dot
      if (screen === 'Amber Phosphor' || screen === 'Green Phosphor') {
        g.globalAlpha = 0.18; g.imageSmoothingEnabled = true; g.drawImage(off, -S / 128, -S / 128, S + S / 64, S + S / 64); g.globalAlpha = 1;
      }
      // the rounded corners of a small compact screen
      g.fillStyle = '#0c0c0c';
      const r = S * 0.05;
      g.beginPath(); g.rect(0, 0, S, S);
      g.moveTo(r, 0); g.arcTo(S, 0, S, S, r); g.arcTo(S, S, 0, S, r); g.arcTo(0, S, 0, 0, r); g.arcTo(0, 0, S, 0, r); g.closePath();
      g.fill('evenodd');
    }
    frame(0);
    return frame;
  },
});

})(window.Proto);
