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
  recipe: 'An armadillo, head and shoulders, in one-bit pixel art 64 dots across, as on the first small black-and-white desktops: no greys at all, only black and white dots, with every shade and texture made by an eight-by-eight fill pattern. Shell patterns, bands, ears, eyes, snout, pose, headwear, a prop beside it (an ant it is after, a floppy disk, a mug), the desktop pattern, the ground, the window around it, the cursor on screen and the screen itself vary; it blinks and twitches its nose, and rolls up into a banded ball when tapped. About 1 in 380 is a legendary, a picture in a style of its own (a Glyptodon, its giant domed ancestor, as a cave painting in ochre and charcoal lit by a torch; or an Engraving: the armadillo engraved on a polished brass plate, its lines glinting in the light), and about 1 in 200 has the coveted Prize Rosette pinned up beside it.',
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
    let lastKey = '';

    // ================= the legendaries =================
    // (only a legendary print ever comes here; paint() above draws the collection's armadillos.) Still one bit a dot,
    // every grey a fill pattern, on the print's own screen.
    const PR = (name, x, y) => (PAT[name][y & 7] >> (7 - (x & 7))) & 1;
    const B1 = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) bit[y * N + x] = v; };
    // the cursor (the print's Cursor trait) and the drag-select ants, as paint() draws them
    function overlays(t, ant, pointer) {
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
      if (cursor !== 'None') {
        const cp = pointer || cursorAt, art = CURSORS[cursor], cx = Math.round(cp[0]) - (cursor === 'Crosshair' || cursor === 'Wristwatch' ? 3 : 0), cy = Math.round(cp[1]) - (cursor === 'Crosshair' || cursor === 'Wristwatch' ? 3 : 0);
        art.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') B1(cx + i, cy + j, r[i] === 'X' ? 1 : 0); });
        if (cursor === 'Wristwatch') { const a = Math.floor(t * 4) % 4, hand = [[0, -1], [1, 0], [0, 1], [-1, 0]][a]; B1(cx + 3 + hand[0], cy + 4 + hand[1], 1); }
      }
    }

    // ---- Glyptodon: a cave painting by torchlight. Deep in a cave wall, painted in ochre and charcoal by the people
    // who hunted it: the giant armoured beast with its dome of rosette scutes and its spiked club tail, hunters with
    // spears, hand stencils, rows of dots. It is dark: only the torch you hold lights it, the rock and the pigment
    // banded by its flickering light, and in that flicker the beast's doubled legs and tail move, as the old painters
    // meant. Move the torch over the wall; hold it still and the hunt plays out (the torch flares, the spear flies, the
    // beast swings its club); tap to blow a hand stencil onto the rock. Drawn on its own grid, 128 dots across.
    // Its traits, in the cave's way: the rock (Desktop), the pigment (Screen), the ground line (Ground), the frame
    // (Window), its eyes, ears, snout, pose and headwear painted on it, the prop painted beside it, the cursor scratched
    // into the corner.
    const CV = 128;
    let CAVE = null;
    function caveSetup() {
      const seed = parseInt(c.hash.slice(2, 10), 16) >>> 0;
      const hsh = (x, y, s) => { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s, 2246822519)) >>> 0; h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
      const vnoise = (x, y, sc, s) => { const X = Math.floor(x / sc), Y = Math.floor(y / sc), fx = x / sc - X, fy = y / sc - Y, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); const a = hsh(X, Y, s), b = hsh(X + 1, Y, s), cc = hsh(X, Y + 1, s), d = hsh(X + 1, Y + 1, s); return a + (b - a) * u + (cc - a) * v + (a - b - cc + d) * u * v; };
      // the rock: its tone (0 to 1) and its kind (the Desktop trait)
      const ROCK = new Float32Array(CV * CV);
      for (let y = 0; y < CV; y++) for (let x = 0; x < CV; x++) {
        let r = vnoise(x, y, 24, seed) * 0.5 + vnoise(x, y, 9, seed + 1) * 0.32 + vnoise(x, y, 3, seed + 2) * 0.18;
        if (desk === 'Diagonal') r = r * 0.7 + 0.3 * (((x + y + vnoise(x, y, 14, seed + 3) * 20) % 14) / 14);
        if (desk === 'Waves') r = r * 0.7 + 0.3 * ((y + Math.sin(x * 0.12) * 5 + 40) % 12) / 12;
        if (desk === 'Bricks') { const by = Math.floor(y / 18), bx = Math.floor((x + (by % 2) * 15) / 30); r = r * 0.75 + hsh(bx, by, seed + 4) * 0.25; if ((y % 18 === 0) || ((x + (by % 2) * 15) % 30 === 0)) r *= 0.45; }
        if (desk === 'Light Dots' && hsh(x, y, seed + 5) < 0.035) r = 1.15;                 // flecks of limestone
        if (desk === 'Black') r *= 0.62;
        // cracks in the wall
        const k = Math.abs(vnoise(x, y, 20, seed + 6) - 0.5);
        if (k < 0.012) r *= 0.3;
        ROCK[y * CV + x] = r;
      }
      // the paintings: 0 none, 1 charcoal, 2 red ochre, 3 ochre (faint, the second set of legs), 4 yellow ochre;
      // two layers (A and B) for the two moments the flicker shows
      const PA = new Uint8Array(CV * CV), PB = new Uint8Array(CV * CV);
      const put = (L, x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < CV && y < CV) L[y * CV + x] = v; };
      const both = (x, y, v) => { put(PA, x, y, v); put(PB, x, y, v); };
      const disc = (L, cx, cy, r, v) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) (L ? put(L, x, y, v) : both(x, y, v)); };
      const stroke = (L, pts, w, v) => { for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.ceil(Math.hypot(bx - ax, by - ay) * 2) + 1; for (let k = 0; k <= n; k++) disc(L, ax + (bx - ax) * k / n, ay + (by - ay) * k / n, w, v); } };
      // the beast, facing left, about its hind foot (rearing tips it up)
      const tilt = pose === 'Rearing' ? -0.2 : 0, low = pose === 'Sniffing' || pose === 'Digging' ? 4 : 0;
      const R0 = (x, y) => { const dx = x - 94, dy = y - 86, cs = Math.cos(tilt), sn = Math.sin(tilt); return [94 + dx * cs - dy * sn, 86 + dx * sn + dy * cs]; };
      const IN = (x, y) => { const cs = Math.cos(-tilt), sn = Math.sin(-tilt), dx = x - 94, dy = y - 86; return [94 + dx * cs - dy * sn, 86 + dx * sn + dy * cs]; };
      const dome = (x, y) => y <= 70 && ((x - 66) / 33) ** 2 + ((y - 70) / 30) ** 2 <= 1;
      const head = (x, y) => (((x - 29) / 9) ** 2 + ((y - 66 - low) / 7.5) ** 2 <= 1) || (x > 31 && x < 40 && y > 58 + low * 0.5 && y < 74);
      const snoutF = (x, y) => { const sy = 68 + low; if (snout === 'Pig-Nosed') return ((x - 19.5) / 3) ** 2 + ((y - sy) / 4) ** 2 <= 1; if (snout === 'Stubby') return ((x - 21.5) / 3) ** 2 + ((y - sy) / 3) ** 2 <= 1; return x > 15 && x <= 22 && Math.abs(y - sy - (22 - x) * 0.25) < 3 - (22 - x) * 0.25; };
      for (let y = 20; y < 100; y++) for (let x = 6; x < 124; x++) {
        const [X, Y] = IN(x, y);
        const inB = dome(X, Y) || head(X, Y) || snoutF(X, Y);
        if (!inB) continue;
        // red ochre fill, the rock's grain showing through it; a charcoal outline, broken here and there
        const edge = !(dome(X - 1.5, Y) || head(X - 1.5, Y) || snoutF(X - 1.5, Y)) || !(dome(X + 1.5, Y) || head(X + 1.5, Y) || snoutF(X + 1.5, Y)) || !(dome(X, Y - 1.5) || head(X, Y - 1.5) || snoutF(X, Y - 1.5)) || !(dome(X, Y + 1.5) || head(X, Y + 1.5) || snoutF(X, Y + 1.5));
        if (edge) { if (hsh(x, y, seed + 9) > 0.12) both(x, y, 1); continue; }
        if (hsh(x, y, seed + 7) < 0.97 - ROCK[y * CV + x] * 0.12) both(x, y, 2);
      }
      // its rosette scutes: charcoal rings with a dot in each, set in rows over the dome; the skirt of plates
      for (let row = 0; row < 6; row++) for (let col = -6; col <= 6; col++) {
        const cx = 66 + col * 9 + (row % 2) * 4.5, cy = 66 - row * 7.5;
        if (!dome(cx, cy) || ((cx - 66) / 30) ** 2 + ((cy - 70) / 27) ** 2 > 1) continue;
        for (let a = 0; a < 28; a++) { const [px, py] = R0(cx + Math.cos(a / 28 * 6.283) * 3.4, cy + Math.sin(a / 28 * 6.283) * 3); both(px, py, 1); }
        const [dx, dy] = R0(cx, cy); both(dx, dy, 4);
      }
      for (let x = 36; x <= 96; x += 3) { const [px, py] = R0(x, 70); both(px, py, 1); both(px + 1, py, 1); }
      // the legs: pillars, painted twice (two strides), one set bold and one faint, swapped by the flicker
      const legsA = [[42, 0], [54, 0], [78, 0], [90, 0]], legsB = [[38, 0], [57, 0], [74, 0], [93, 0]];
      for (const [L, legs, v, w] of [[PA, legsA, 2, 0], [PA, legsB, 3, 0], [PB, legsB, 2, 0], [PB, legsA, 3, 0]]) for (const [lx] of legs) {
        for (let y = 70; y <= 86; y++) for (let x = lx - 3.5; x <= lx + 3.5; x++) { const [px, py] = R0(x + (y - 70) * (lx < 60 ? -0.12 : 0.08), y); put(L, px, py, (Math.abs(x - lx) > 2.9 || y === 86) && v === 2 ? 1 : v); }
      }
      // the tail with its spiked club, in two swings
      for (const [L, end, v] of [[PA, [118, 62], 2], [PB, [119, 72], 2], [PA, [119, 72], 3], [PB, [118, 62], 3]]) {
        const pts = [[97, 62], [108, 64], end].map(p => R0(p[0], p[1]));
        stroke(L, pts, v === 2 ? 2.6 : 2, v);
        const [ex, ey] = pts[2];
        disc(L, ex, ey, 4.4, v === 2 ? 1 : 3);
        if (v === 2) { disc(L, ex, ey, 2.6, 2); for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283; stroke(L, [[ex + Math.cos(a) * 4, ey + Math.sin(a) * 4], [ex + Math.cos(a) * 7.5, ey + Math.sin(a) * 7.5]], 0.5, 1); } }
      }
      // its face: ears, eye and nose, as the Ears, Eyes and Snout traits have them
      const [hx, hy] = R0(29, 66 + low);
      const earAt = R0(34, 57 + low);
      if (ears === 'Round') disc(null, earAt[0], earAt[1], 2.6, 1);
      else if (ears === 'Floppy') stroke(null, [[earAt[0], earAt[1] + 1], [earAt[0] + 4, earAt[1] + 3], [earAt[0] + 6, earAt[1] + 7]], 1.1, 1);
      else { const hgt = ears === 'Huge' ? 10 : ears === 'Tall' ? 7 : 5; stroke(null, [[earAt[0], earAt[1] + 2], [earAt[0] + 1, earAt[1] - hgt]], ears === 'Huge' ? 1.8 : 1.2, 1); if (ears === 'Tufted') for (const d of [-1.5, 0, 1.5]) both(earAt[0] + 1 + d, earAt[1] - hgt - 1, 1); }
      const ex = hx - 3, ey = hy - 2;
      if (eyes === 'Big Round') { disc(null, ex, ey, 2.2, 4); disc(null, ex, ey, 1, 1); }
      else if (eyes === 'Sleepy' || eyes === 'Wink') stroke(null, [[ex - 2, ey], [ex + 2, ey]], 0.5, 1);
      else if (eyes === 'X') { stroke(null, [[ex - 1.5, ey - 1.5], [ex + 1.5, ey + 1.5]], 0.5, 1); stroke(null, [[ex - 1.5, ey + 1.5], [ex + 1.5, ey - 1.5]], 0.5, 1); }
      else if (eyes === 'Star') { for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 - 1.57; stroke(null, [[ex, ey], [ex + Math.cos(a) * 2.5, ey + Math.sin(a) * 2.5]], 0.4, 4); } }
      else if (eyes === 'Heart') { disc(null, ex - 1, ey - 0.5, 1.2, 4); disc(null, ex + 1, ey - 0.5, 1.2, 4); both(ex, ey + 1.5, 4); }
      else disc(null, ex, ey, 1.3, 1);
      if (snout === 'Whiskered') for (const d of [-2, 0, 2]) stroke(null, [[hx - 10, hy + 2], [hx - 16, hy + d]], 0.4, 1);
      if (snout === 'Moustache') stroke(null, [[hx - 13, hy + 4], [hx - 9, hy + 3], [hx - 6, hy + 5]], 0.7, 1);
      if (snout === 'Pig-Nosed') { both(hx - 10, hy + 1, 1); both(hx - 10, hy + 3, 1); }
      // its headwear, painted on in charcoal and yellow ochre
      const [tx, ty] = R0(31, 57 + low);
      const HW = {
        Bowler: () => { disc(null, tx, ty - 3, 3.5, 1); stroke(null, [[tx - 6, ty], [tx + 6, ty]], 0.8, 1); },
        Beret: () => { for (let x = -5; x <= 5; x++) for (let y = -3; y <= 0; y++) if ((x / 5) ** 2 + ((y + 1) / 2.5) ** 2 <= 1) both(tx + x, ty + y, 2); both(tx + 1, ty - 4, 1); },
        Bow: () => { disc(null, tx - 2.5, ty - 1, 2, 2); disc(null, tx + 2.5, ty - 1, 2, 2); disc(null, tx, ty - 1, 1, 1); },
        Sweatband: () => stroke(null, [[tx - 5, ty + 1], [tx + 5, ty + 1]], 1, 4),
        Halo: () => { for (let a = 0; a < 24; a++) both(tx + Math.cos(a / 24 * 6.283) * 6, ty - 6 + Math.sin(a / 24 * 6.283) * 1.8, 4); },
        Crown: () => { stroke(null, [[tx - 4, ty], [tx + 4, ty]], 1, 4); for (const d of [-4, 0, 4]) stroke(null, [[tx + d, ty], [tx + d, ty - 4]], 0.6, 4); },
        'Party Hat': () => { for (let y = 0; y < 8; y++) for (let x = -3 + y * 0.4; x <= 3 - y * 0.4; x++) both(tx + x, ty - y, y % 3 ? 2 : 4); },
        'Top Hat': () => { for (let y = 0; y < 8; y++) for (let x = -3; x <= 3; x++) both(tx + x, ty - y, 1); stroke(null, [[tx - 6, ty], [tx + 6, ty]], 0.7, 1); },
        'Cowboy Hat': () => { stroke(null, [[tx - 8, ty - 1], [tx - 5, ty], [tx + 5, ty], [tx + 8, ty - 1]], 0.8, 1); disc(null, tx, ty - 3, 3, 1); },
        Bandana: () => { stroke(null, [[tx - 5, ty + 1], [tx + 5, ty + 1]], 1.2, 2); stroke(null, [[tx + 5, ty + 1], [tx + 8, ty + 4]], 0.8, 2); },
      }[hat];
      if (HW) HW();
      // a ground line under it, in the Ground trait's way
      for (let x = 8; x < 122; x++) {
        const gy = 90 + Math.round(Math.sin(x * 0.09) * 1.2);
        if (ground === 'Dots') { if (x % 5 === 0) disc(null, x, gy, 1, 2); }
        else if (ground === 'Sand') { if (hsh(x, gy, seed + 11) < 0.45) both(x, gy + (x % 3), 4); }
        else if (ground === 'Grass') { if (x % 6 === 0) { stroke(null, [[x, gy + 2], [x - 1, gy - 3]], 0.4, 1); stroke(null, [[x + 1, gy + 2], [x + 3, gy - 2]], 0.4, 1); } }
        else if (ground === 'Tiles') { both(x, gy, 1); if (x % 8 === 0) for (let k = 1; k < 4; k++) both(x, gy + k, 1); }
        else if (ground === 'Rug') both(x, gy + Math.abs((x % 6) - 3) - 1, 2);
      }
      // two hunters with spears, behind it; hand stencils and a row of dots high on the wall
      const man = (x, y, s) => { disc(null, x, y - 13, 1.6, 1); stroke(null, [[x, y - 11], [x, y - 5]], 0.6, 1); stroke(null, [[x, y - 5], [x - 3 * s, y]], 0.6, 1); stroke(null, [[x, y - 5], [x + 2 * s, y]], 0.6, 1); stroke(null, [[x, y - 9], [x - 3 * s, y - 7]], 0.5, 1); };
      man(110, 104, 1); man(121, 106, 1);
      for (const [mx, my] of [[110, 104], [121, 106]]) stroke(PA, [[mx - 5, my - 6], [mx + 3, my - 17]], 0.45, 1);
      stroke(PB, [[105, 98], [113, 87]], 0.45, 1); stroke(PB, [[121 - 5, 106 - 6], [121 + 3, 106 - 17]], 0.45, 1);
      const hand = (L, cx, cy, sc, v) => {
        const inH = (x, y) => { const dx = (x - cx) / sc, dy = (y - cy) / sc; if (dx * dx / 9 + (dy - 2) ** 2 / 12 < 1) return true; for (const [fx, fl] of [[-2.6, 4.5], [-0.9, 6], [0.9, 6.3], [2.6, 5.4]]) if (Math.abs(dx - fx) < 0.75 && dy < 0 && dy > -fl) return true; return dx < -2.4 && dx > -5.4 && dy > -1 && dy < 1.6 && Math.abs(dy + (dx + 2.4) * 0.6) < 1; };
        for (let y = Math.floor(cy - 11 * sc); y <= cy + 9 * sc; y++) for (let x = Math.floor(cx - 9 * sc); x <= cx + 8 * sc; x++) { if (inH(x, y)) continue; const r = Math.hypot((x - cx) / sc, (y - cy + 1) / sc); if (r < 9 && hsh(x, y, seed + 12) < 0.85 - r * 0.08) put(L, x, y, v); }
      };
      hand(PA, 16, 26, 1, 2); hand(PB, 16, 26, 1, 2); hand(PA, 30, 20, 0.8, 3); hand(PB, 30, 20, 0.8, 3);
      for (let k = 0; k < 7; k++) disc(null, 46 + k * 6, 16 + Math.sin(k) * 1.5, 1.2, 2);
      // its prop, painted on the wall beside it
      const [qx, qy] = [100, 22];
      const PROP = {
        Ant: () => { disc(null, qx, qy, 1.4, 1); disc(null, qx + 3, qy, 1.8, 1); disc(null, qx + 6.5, qy, 2.2, 1); for (const d of [0, 3, 6]) { stroke(null, [[qx + d, qy], [qx + d - 1, qy + 4]], 0.3, 1); } },
        'Floppy Disk': () => { for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) both(qx + x, qy + y, Math.abs(x) < 3 && y < -1 ? 4 : Math.abs(x) < 4 && y > 1 ? 4 : 1); },
        Mug: () => { for (let y = -4; y <= 4; y++) for (let x = -3; x <= 3; x++) both(qx + x, qy + y, Math.abs(x) === 3 || y === 4 ? 1 : 2); stroke(null, [[qx + 4, qy - 2], [qx + 6, qy], [qx + 4, qy + 2]], 0.5, 1); },
        Flower: () => { stroke(null, [[qx, qy + 7], [qx, qy]], 0.5, 1); for (let k = 0; k < 5; k++) disc(null, qx + Math.cos(k * 1.257) * 2.6, qy - 2 + Math.sin(k * 1.257) * 2.6, 1.3, 2); disc(null, qx, qy - 2, 1, 4); },
        Cactus: () => { stroke(null, [[qx, qy + 7], [qx, qy - 6]], 1.2, 1); stroke(null, [[qx, qy], [qx - 4, qy], [qx - 4, qy - 4]], 0.8, 1); stroke(null, [[qx, qy + 2], [qx + 4, qy + 2], [qx + 4, qy - 2]], 0.8, 1); },
        Grubs: () => { for (const d of [-5, 0, 5]) { stroke(null, [[qx + d - 1.5, qy + 1], [qx + d, qy - 1], [qx + d + 1.5, qy + 1]], 0.9, 4); } },
      }[prop];
      if (PROP) PROP();
      // the cursor trait scratched small in the corner
      const CUR = { Arrow: ['X....', 'XX...', 'XXX..', 'XXXX.', 'XX...', 'X.X..'], 'Pointing Hand': ['.X...', '.X...', '.XXX.', 'XXXXX', 'XXXXX', '.XXX.'], Wristwatch: ['.XXX.', 'X.X.X', 'X.XXX', 'X...X', '.XXX.'], Crosshair: ['..X..', '..X..', 'XX.XX', '..X..', '..X..'], 'Paint Bucket': ['.XXX.', 'X...X', 'XXXXX', 'XXXXX', '.XXX.'] }[cursor];
      if (CUR) CUR.forEach((r, j) => { for (let q = 0; q < r.length; q++) if (r[q] === 'X') both(114 + q, 112 + j, 1); });
      // the Window trait: a rock arch round the scene, tally marks along the top, or a painted cartouche
      const FR = new Uint8Array(CV * CV);
      for (let y = 0; y < CV; y++) for (let x = 0; x < CV; x++) {
        const i = y * CV + x;
        if (chrome === 'Window') { const e = ((x - 64) / 70) ** 2 + ((y - 70) / 66) ** 2 + vnoise(x, y, 7, seed + 13) * 0.12; if (e > 1) FR[i] = 1; }
        if (chrome === 'Menu Bar' && y >= 5 && y <= 9 && x > 6 && x < 122 && x % 4 === 0) both(x, y, 1);
        if (chrome === 'Dialog Box') { const d = Math.min(x - 4, y - 4, 123 - x, 123 - y); if (d >= 0 && d < 2 && hsh(x, y, seed + 14) > 0.2) both(x, y, 2); }
      }
      // facing right: the whole wall mirrored
      if (MIR) for (const L of [ROCK, PA, PB, FR]) for (let y = 0; y < CV; y++) for (let x = 0; x < CV / 2; x++) { const a = y * CV + x, b = y * CV + CV - 1 - x, v = L[a]; L[a] = L[b]; L[b] = v; }
      // the palette: rock tones, then pigment (in the Screen trait's colour), charcoal, yellow ochre, the flame
      const PIG = { 'Blue Ink': [[20, 28, 70], [40, 64, 150], [80, 110, 210]], Sepia: [[60, 34, 16], [110, 66, 30], [160, 104, 56]], 'Amber Phosphor': [[90, 50, 6], [170, 100, 10], [240, 160, 30]], 'Green Phosphor': [[22, 54, 26], [50, 110, 50], [90, 170, 80]], 'Paper White': [[70, 26, 18], [126, 40, 26], [176, 66, 40]] }[screen] || [[86, 24, 12], [150, 42, 20], [200, 72, 32]];
      const pal = [[30, 18, 10], [58, 38, 22], [88, 60, 36], [118, 84, 52], [148, 108, 70], [178, 136, 92], [206, 166, 118],   // (the rock: a warm, lit ochre-brown)
       
        PIG[0], PIG[1], PIG[2], [14, 10, 9], [42, 32, 26], [120, 90, 36], [200, 156, 60], [255, 248, 220], [255, 214, 110], [244, 140, 40], [190, 70, 20], [70, 40, 20], [255, 255, 255], [96, 8, 14], [236, 44, 40]];
      return { ROCK, PA, PB, FR, pal, cv: Object.assign(document.createElement('canvas'), { width: CV, height: CV }), px: new Uint8Array(CV * CV), hands: [], tx: 64, ty: 50, still: 0, hold: -9, was: false, at: -9, mx: 0, my: 0, mv: 0, lastT: 0 };
    }
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    function caveFrame(t) {
      if (!CAVE) CAVE = caveSetup();
      const K = CAVE, inp = c.input, px = K.px;
      // the torch: where you hold it (or wandering slowly along the wall); hold it still and the hunt plays
      if (inp.inside) { const nx = inp.x * CV, ny = inp.y * CV; if (Math.hypot(nx - K.tx, ny - K.ty) > 1.5) K.still = t; K.tx = nx; K.ty = ny; } else { K.tx = 58 + Math.sin(t * 0.33) * 30; K.ty = 54 + Math.sin(t * 0.51) * 10; K.still = t; }
      inp.taps();
      if (inp.down && !K.was) { K.at = t; K.mx = inp.x * CV; K.my = inp.y * CV; K.mv = 0; c.sound.hit('noise', 0.05, { cutoff: 900, dur: 0.3 }); }
      if (inp.down) K.mv = Math.max(K.mv, Math.hypot(inp.x * CV - K.mx, inp.y * CV - K.my));
      if (!inp.down && K.was) {
        if (t - K.at < 0.3 && K.mv < 3) {
          // a tap: a hand stencil blown onto the rock, ochre spat round a hand pressed to the wall
          K.hands.push([Math.max(14, Math.min(114, K.mx - 16)), Math.max(14, Math.min(100, K.my - 4)), t, (K.hands.length * 0.37) % 1]);   // (beside the torch, so the flame never hides it) if (K.hands.length > 7) K.hands.shift();
          c.sound.hit('noise', 0.12, { cutoff: 2400, dur: 0.35 }); c.sound.hit('noise', 0.08, { cutoff: 1600, dur: 0.3, at: 0.1 });
        }
      }
      K.was = inp.down;
      // the hunt plays when you hold the torch still: pressed for a moment, or just resting it on the wall a second
      const pressHunt = inp.down && t - K.at > 0.45 && K.mv < 3, restHunt = inp.inside && !inp.down && t - (K.still ?? t) > 1.1;
      const hunt = pressHunt || restHunt, ht = hunt ? (pressHunt ? t - K.at - 0.45 : t - K.still - 1.1) : -1;
            // the flicker: the light's reach wavers, and with it which of the painted strides shows
      const fl = Math.sin(t * 13.1) * 0.5 + Math.sin(t * 7.3 + 1) * 0.35 + Math.sin(t * 23.7) * 0.15;
      const R = (hunt ? 68 : inp.inside ? 48 : 56) + fl * 4, useB = hunt ? Math.floor(ht * 6) % 2 === 1 : fl > 0.35;
      const L = useB ? K.PB : K.PA, ROCK = K.ROCK, FR = K.FR;
      // the spear's strike: the beast flinches (the painting jolts two dots) and a red wound stays on its flank
      const hph = hunt ? (ht % 1.4) / 1.4 : -1, flinch = hph >= 0.6 && hph < 0.82 ? (MIR ? -3 : 3) * (hph < 0.7 ? 1 : 0.67) | 0 : 0, flinchY = hph >= 0.6 && hph < 0.7 ? 1 : 0;
      if (hph >= 0.6 && (K.lastHit ?? -9) < t - 1) { K.lastHit = t; K.marks = (K.marks || []).concat([[t, K.marks ? K.marks.length : 0]]).slice(-3); }
      const tx = K.tx, ty = K.ty;
      for (let y = 0; y < CV; y++) for (let x = 0; x < CV; x++) {
        // (a low glow everywhere, so the painting reads before the torch comes near; the torch's own light on top)
        const i = y * CV + x, d = Math.hypot(x - tx, (y - ty) * 1.1), lit = Math.max(0, 1 - d / R) * 0.5 + 0.88 - (FR[i] ? 0.6 : 0);
        // light banded into steps with an ordered dither, as a pixel artist would
        const q = lit * 6 + (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 0.9;
        const p = flinch && x - flinch >= 0 && x - flinch < CV && y - flinchY >= 0 ? L[i - flinch - flinchY * CV] : L[i];
        if (p === 1) { px[i] = q > 2.2 ? 11 : 10; continue; }
        if (p >= 2) { px[i] = p === 4 ? (q > 3.4 ? 13 : 12) : p === 3 ? (q > 3.2 ? 8 : 7) : q > 3.4 ? 9 : q > 2 ? 8 : 7; continue; }
        const r = ROCK[i], k = Math.max(0, Math.min(6, Math.floor(q * (0.3 + r * 0.42))));
        px[i] = k;
      }
      // the hands you blew onto the wall (the spray comes in over a moment)
      for (const [hx, hy, ht0, sv] of K.hands) {
        const u = Math.min(1, (t - ht0) / 0.4);
        for (let y = Math.floor(hy - 15); y <= hy + 14; y++) for (let x = Math.floor(hx - 14); x <= hx + 13; x++) {
          if (x < 0 || y < 0 || x >= CV || y >= CV) continue;
          const dx = (x - hx) / 1.5, dy = (y - hy) / 1.5;
          let inH = dx * dx / 9 + (dy - 2) ** 2 / 12 < 1;
          for (const [fx, fl2] of [[-2.6, 4.5], [-0.9, 6], [0.9, 6.3], [2.6, 5.4]]) if (Math.abs(dx - fx) < 0.75 && dy < 0 && dy > -fl2) inH = true;
          if (dx < -2.4 && dx > -5.4 && Math.abs(dy + (dx + 2.4) * 0.6) < 1) inH = true;
          if (inH) continue;
          const r = Math.hypot(dx, dy + 1), hv = (((x * 73856093) ^ (y * 19349663) ^ Math.floor(sv * 1e6)) >>> 0) % 100 / 100;
          if (r < 9.5 * u && (r < 7 || hv < 1.4 - r * 0.12)) px[y * CV + x] = r > 7.5 ? 8 : 9;
        }
      }
      // the hunt: the hunters light up in yellow ochre and a spear flies from them in a high arc, trailing, and
      // strikes the beast's flank in a burst of red; again and again while you hold the torch still
      if (hunt) {
        const MX = x => MIR ? CV - 1 - x : x, P = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < CV && y < CV) px[y * CV + x] = k; };
        for (const [mx, my] of [[110, 104], [121, 106]]) {
          const pts = [[0, -13], [0, -12], [-1, -13], [1, -13], [0, -14], [-1, -12], [1, -12]];
          for (const [a, b] of pts) P(MX(mx + a), my + b, 19);
          for (let k = -11; k <= -5; k++) P(MX(mx), my + k, 19);
          for (let k = 0; k <= 5; k++) { P(MX(mx - k * 0.6), my - 5 + k, 19); P(MX(mx + k * 0.4), my - 5 + k, 19); }
          if (hph >= 0.6) for (let k = 0; k <= 5; k++) { P(MX(mx - 1 - k * 0.5), my - 10 - k, 19); P(MX(mx + 1 + k * 0.5), my - 10 - k, 19); }   // a cheer: arms up
          else for (let k = 0; k <= 4; k++) P(MX(mx - k * 0.75 - 0.5), my - 9 + k * 0.5, 19);
        }
        const per = 1.4, u = Math.min(1, ((ht % per) / per) / 0.6), hit = (ht % per) / per >= 0.6;
        const sx = 106, sy = 92, ex = 76, ey = 56, arc = w => [sx + (ex - sx) * w, sy + (ey - sy) * w - Math.sin(w * Math.PI) * 30];
        if (!hit) {
          const [x, y] = arc(u), [x2, y2] = arc(Math.max(0, u - 0.06)), l = Math.hypot(x - x2, y - y2) || 1;
          for (let k = 0; k < 14; k++) P(MX(x - (x - x2) / l * k), y - (y - y2) / l * k, k < 3 ? 19 : 10);   // (a charcoal shaft, a white point)
          for (let k = 1; k <= 6; k++) { const [qx, qy] = arc(Math.max(0, u - k * 0.05)); if (k % 2) P(MX(qx), qy, 11); }
        } else {
          const v = ((ht % per) / per - 0.6) / 0.4;
          for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283, r = 3 + v * 10; P(MX(ex + Math.cos(a) * r), ey + Math.sin(a) * r * 0.8, v < 0.5 ? 14 : 9); }
          for (let k = 0; k < 10; k++) P(MX(ex + 3 + k * 0.9), ey - 6 + k * 0.7, 13);
          if (v < 0.25) for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283, r = 6 + v * 20; P(MX(ex + Math.cos(a) * r), ey + Math.sin(a) * r * 0.7, 16); }
        }
        if (Math.floor(ht / per) !== Math.floor((ht - 1 / 20) / per)) { c.sound.hit('noise', 0.08, { cutoff: 1800, dur: 0.25 }); c.sound.hit('kick', 0.6, { at: per * 0.6 }); c.sound.note(36, { dur: 0.4, vel: 0.14, wave: 'square', cutoff: 300, at: per * 0.6 }); }
      }
      // the wounds the spears left: red ochre gashes on its flank, fading after a while
      for (const [mt, mk] of K.marks || []) { if (t - mt > 6) continue; const P2 = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < CV && y < CV) px[y * CV + x] = k; }; const cx = 76 + (mk % 3) * 4 - 4, cy = 56 + (mk % 2) * 3, gr = Math.min(1, (t - mt) / 0.15); for (let y = -6; y <= 12; y++) for (let x = -6; x <= 6; x++) { const r = Math.hypot(x, y * 1.2), drip = y > 2 && Math.abs(x - ((x + 99) % 3 === 0 ? x : 99)) < 1 && y < 6 + ((x * 7 + 99) % 5); if ((r < 4.6 * gr && ((x * 5 + y * 3 + 99) % 7 || r < 3)) || (drip && gr >= 1)) P2(MIR ? CV - 1 - (cx + x) : cx + x, cy + y, r < 2.5 ? 20 : 21); } }
      // the torch in your hand: its stick, and a flame that never holds still, sparks going up
      const fx = Math.round(tx), fy = Math.round(ty);
      for (let k = 0; k < 14; k++) { const X = fx + 1 + Math.round(k * 0.35), Y = fy + 3 + k; if (X >= 0 && Y >= 0 && X < CV && Y < CV) { px[Y * CV + X] = 18; if (X + 1 < CV) px[Y * CV + X + 1] = 17; } }
      const fph = Math.floor(t * 14);
      for (let y = -10; y <= 3; y++) for (let x = -4; x <= 4; x++) {
        const w = (3.4 + (hunt ? 1 : 0)) * Math.sqrt(Math.max(0, (y + 10) / 13)) + (((fph + y) * 7) % 3 - 1) * 0.5;
        if (Math.abs(x - Math.sin(t * 9 + y * 0.6) * 1.2 * (-y / 10)) > w) continue;
        const X = fx + x, Y = fy + y; if (X < 0 || Y < 0 || X >= CV || Y >= CV) continue;
        const core = Math.abs(x) < w * 0.4 && y > -6;
        px[Y * CV + X] = core ? (y > -3 ? 14 : 15) : y < -7 ? 17 : 16;
      }
      for (let k = 0; k < 5; k++) { const u = (t * 0.9 + k * 0.21) % 1, X = Math.round(fx + Math.sin(t * 3 + k * 2) * 3 * u + (k - 2)), Y = Math.round(fy - 10 - u * 22); if (X >= 0 && Y >= 0 && X < CV && Y < CV && u < 0.85) px[Y * CV + X] = u < 0.4 ? 15 : 16; }
      // the cursor, when the print has one, as a dark notch at the torch's grip
      const ctx2 = K.cv.getContext('2d'), im = K.im || (K.im = ctx2.createImageData(CV, CV)), d = im.data, pal = K.pal;
      for (let i = 0; i < CV * CV; i++) { const p = pal[px[i]]; d[i * 4] = p[0]; d[i * 4 + 1] = p[1]; d[i * 4 + 2] = p[2]; d[i * 4 + 3] = 255; }
      ctx2.putImageData(im, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(K.cv, 0, 0, S, S);
    }
    // ---- Engraving: an engraved brass plate. The armadillo cut into polished brass with the burin, every hatch line
    // laid along its form, on an engine-turned guilloche ground like a watch dial, inside a raised rope border with its
    // name in a cartouche. Engraved metal is all about the light: each line catches it only when it lies across it, so
    // as you move the light (the pointer) the hatching flares and dies line by line and the guilloche ground ripples.
    // Drag to cut your own lines with the burin (they glint too); tap to buff the plate, a bright sweep across it.
    // Drawn on its own grid, 128 dots across, in eight shades of brass. Its traits, in the plate's way: the shell's
    // pattern, bands, ears, eyes, snout, pose and headwear cut into the armadillo, the prop engraved beside it, the
    // ground (Ground) and the dial's turning (Desktop) under it, the cursor stamped in the cartouche, the border (Window).
    const PG = 128;
    let PLT = null;
    function plateSetup() {
      // per dot: 0 polished plate, 1 a hatch line (with its angle), 2 a deep cut, 3 the raised border, 4 the border's
      // rope (with its angle); and for the dial's ground, its line angle too
      const T = new Uint8Array(PG * PG), A = new Float32Array(PG * PG);
      const set = (x, y, k, a) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < PG && y < PG) { T[y * PG + x] = k; A[y * PG + x] = a; } };
      const tilt = pose === 'Rearing' ? -0.16 : 0, low = pose === 'Sniffing' || pose === 'Digging' ? 4 : 0, trot = pose === 'Trotting';
      const IN = (x, y) => { const cs = Math.cos(-tilt), sn = Math.sin(-tilt), dx = x - 92, dy = y - 88; return [92 + dx * cs - dy * sn, 88 + dx * sn + dy * cs]; };
      const DX = 66, DY = 74, RX = 31, RY = 30;
      const dome = (x, y) => y <= DY + 2 && ((x - DX) / RX) ** 2 + ((y - DY) / RY) ** 2 <= 1;
      const segD = (x, y, ax, ay, bx, by) => { const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy))); return [Math.hypot(x - ax - vx * u, y - ay - vy * u), u]; };
      const SN = snout === 'Stubby' || snout === 'Pig-Nosed' ? [26, 76 + low] : [16, 82 + low];
      const head = (x, y) => { const [d, u] = segD(x, y, 40, 70 + low * 0.5, SN[0], SN[1]); return d < 7.5 * (1 - u) + (snout === 'Pig-Nosed' ? 3.2 : 2) || ((x - 39) / 8) ** 2 + ((y - 68 - low * 0.5) / 8) ** 2 <= 1; };
      const EA = { Tall: [3, 8], Round: [3.6, 3.6], Floppy: [3, 6], Tufted: [2.8, 8], Huge: [4, 11] }[ears] || [3, 8];
      const ear = (x, y) => [[37, 59 + low * 0.5], [43, 60 + low * 0.5]].some(([ex, ey]) => ((x - ex) / EA[0]) ** 2 + ((y - ey + (ears === 'Floppy' ? -2 : EA[1] * 0.5)) / EA[1]) ** 2 <= 1);
      const legX = trot ? [[43, -3], [56, 3], [80, -3], [92, 3]] : [[44, 0], [55, 0], [80, 0], [91, 0]];
      const leg = (x, y) => y > 74 && y <= 94 && legX.some(([lx, sk]) => Math.abs(x - lx - (y - 74) * sk / 20) < 4);
      const tail = (x, y) => { const [d, u] = segD(x, y, 96, 76, 122, 90); return d < 5 * (1 - u) + 1.2; };
      const beast = (x, y) => dome(x, y) || head(x, y) || ear(x, y) || leg(x, y) || tail(x, y);
      const nb = bands;
      for (let y = 8; y < 108; y++) for (let x = 8; x < 120; x++) {
        const [X, Y] = IN(x, y);
        if (!beast(X, Y)) continue;
        set(x, y, 7, 0);                                                                  // (the figure is polished; the field round it is frosted)
        const edge = !beast(X - 1, Y) || !beast(X + 1, Y) || !beast(X, Y - 1) || !beast(X, Y + 1);
        if (edge) { set(x, y, 2, 0); continue; }
        if (dome(X, Y)) {
          // the shell: hatching that follows the dome round; the bands cut deep; the shields' pattern (Shell)
          const nx = (X - DX) / RX, ny = (Y - DY) / RY, e = Math.sqrt(nx * nx + ny * ny), tang = Math.atan2(ny * RX, -nx * RY) + Math.PI / 2;
          if (Y > DY - 1) { set(x, y, (X % 3) ? 1 : 2, Math.PI / 2); continue; }        // the skirt
          const bw = 44 / (nb + 1), bx0 = DX - 22, kf = ((X - bx0) / bw), inBands = X > bx0 && X < DX + 22;
          if (inBands && Math.abs(kf - Math.round(kf)) * bw < 0.6) { set(x, y, 2, 0); continue; }
          let on = (e * 26) % 1 < 0.42;
          if (!inBands) {
            if (shell === 'Studded' || shell === 'Scales' || shell === 'Mixed') { const cx = Math.round(X / 5) * 5, cy = Math.round(Y / 5) * 5; if (Math.hypot(X - cx, Y - cy) < 1.2) { set(x, y, 2, 0); continue; } }
            if (shell === 'Diamonds' || shell === 'Checkerboard' || shell === 'Plaid' || shell === 'Herringbone') { if (((X + Y) % 7 + 7) % 7 < 1 || ((X - Y) % 7 + 7) % 7 < 1) { set(x, y, 2, 0); continue; } }
            if (shell === 'Stripes' || shell === 'Bricks & Weave') on = (X % 4) < 2;
          }
          // (the banded middle of the shell is inlaid in silver: the plate's one second metal, its focal point)
          if (inBands) { set(x, y, on ? 9 : 8, shell !== 'Solid' ? Math.PI / 2 + (X - DX) * 0.01 : tang); continue; }
          if (on) set(x, y, 1, tang);
          continue;
        }
        if (head(X, Y) || ear(X, Y)) {
          const ang = Math.atan2(SN[1] - 70, SN[0] - 40);
          const across = (X - 40) * -Math.sin(ang) + (Y - 70) * Math.cos(ang);
          if (ear(X, Y) && !head(X, Y)) { if ((Y % 2) === 0) set(x, y, 1, Math.PI / 2); continue; }
          if (Math.round(across) % 2 === 0) set(x, y, 1, ang);
          continue;
        }
        if (leg(X, Y)) { if (Y % 2 === 0) set(x, y, 1, 0); if (Y >= 92 && X % 2 === 0) set(x, y, 2, 0); continue; }
        if (tail(X, Y)) { if ((X + Math.round(Y * 0.5)) % 4 < 2) set(x, y, 1, Math.PI / 2 + 0.5); continue; }
      }
      // its eye, nostril, and the Eyes and Snout traits' marks, cut deep
      const [hx, hy] = (() => { const cs = Math.cos(tilt), sn = Math.sin(tilt), dx = 33 - 92, dy = 68 + low - 88; return [92 + dx * cs - dy * sn, 88 + dx * sn + dy * cs]; })();
      const deep = (x, y) => set(x, y, 2, 0), polish = (x, y) => set(x, y, 7, 0);
      for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) polish(hx + x, hy + y);
      if (eyes === 'Big Round') { for (let a = 0; a < 16; a++) deep(hx + Math.cos(a / 2.5) * 2, hy + Math.sin(a / 2.5) * 2); deep(hx, hy); }
      else if (eyes === 'Sleepy' || eyes === 'Wink') for (let x = -2; x <= 2; x++) deep(hx + x, hy + (Math.abs(x) === 2 ? -1 : 0));
      else if (eyes === 'X') for (let k = -1; k <= 1; k++) { deep(hx + k, hy + k); deep(hx + k, hy - k); }
      else if (eyes === 'Star' || eyes === 'Heart') { deep(hx, hy - 2); deep(hx - 1, hy - 1); deep(hx + 1, hy - 1); deep(hx - 2, hy); deep(hx + 2, hy); deep(hx, hy); deep(hx - 1, hy + 1); deep(hx + 1, hy + 1); deep(hx, hy + 2); }
      else if (eyes === 'Spectacles') { for (let a = 0; a < 16; a++) { deep(hx + Math.cos(a / 2.5) * 2.5, hy + Math.sin(a / 2.5) * 2.5); deep(hx - 6 + Math.cos(a / 2.5) * 2, hy + 1 + Math.sin(a / 2.5) * 2); } }
      else { deep(hx, hy); deep(hx + 1, hy); deep(hx, hy + 1); deep(hx + 1, hy + 1); }
      const tip = [SN[0] + (MIR ? 0 : 0), SN[1]];
      deep(tip[0] + 1, tip[1] - 1); deep(tip[0] + 2, tip[1] - 1);
      if (snout === 'Whiskered') for (const d of [-3, 0, 3]) for (let k = 0; k < 7; k++) deep(tip[0] + 2 - k, tip[1] + d * k / 7);
      if (snout === 'Moustache') for (let k = -4; k <= 4; k++) deep(tip[0] + 5 + k, tip[1] + 3 + Math.abs(k) * 0.3);
      // the headwear, engraved on in outline with its own hatching
      const [ax, ay] = [hx + 4, hy - 9];
      const outline = (fn, ang) => { for (let y = -12; y <= 6; y++) for (let x = -10; x <= 10; x++) { if (!fn(x, y)) continue; const e = !fn(x - 1, y) || !fn(x + 1, y) || !fn(x, y - 1) || !fn(x, y + 1); set(ax + x, ay + y, e ? 2 : (y % 2 ? 7 : 1), ang); } };
      const HAT = { Bowler: (x, y) => (x * x / 25 + (y + 2) ** 2 / 16 <= 1 && y <= 0) || (y >= 0 && y <= 1 && Math.abs(x) <= 8), Beret: (x, y) => x * x / 49 + (y + 1) ** 2 / 6 <= 1, Bow: (x, y) => ((x + 3) ** 2 + y * y <= 7) || ((x - 3) ** 2 + y * y <= 7), Sweatband: (x, y) => y >= 2 && y <= 4 && Math.abs(x) <= 7, Halo: (x, y) => Math.abs(Math.hypot(x / 7, (y + 8) / 2) - 1) < 0.25, Crown: (x, y) => (y >= -2 && y <= 0 && Math.abs(x) <= 6) || (y < -2 && y >= -6 && Math.abs(x) % 4 < 1.5 && Math.abs(x) <= 6), 'Party Hat': (x, y) => y <= 0 && y >= -10 && Math.abs(x) <= (y + 10) * 0.4, 'Top Hat': (x, y) => (y <= 0 && y >= -10 && Math.abs(x) <= 4) || (y >= 0 && y <= 1 && Math.abs(x) <= 8), 'Cowboy Hat': (x, y) => (y >= 0 && y <= 1 && Math.abs(x) <= 10) || (y < 0 && y >= -5 && Math.abs(x) <= 5), Bandana: (x, y) => (y >= 1 && y <= 3 && Math.abs(x) <= 7) || (x >= 6 && x <= 9 && y >= 3 && y <= 6) }[hat];
      if (HAT) outline(HAT, 0.3);
      // the ground under it (Ground), and its prop engraved beside it (Prop)
      for (let x = 10; x < 118; x++) {
        if (ground === 'Grass') { if (x % 5 === 0) for (let k = 0; k < 4; k++) set(x + (k > 1 ? 1 : 0), 96 - k, 1, Math.PI / 2); }
        else if (ground === 'Sand') { if ((x * 7) % 5 < 2) set(x, 97 + (x % 3), 1, 0); }
        else if (ground === 'Tiles') { set(x, 96, 2, 0); if (x % 10 === 0) for (let k = 0; k < 6; k++) set(x, 96 + k, 2, 0); }
        else if (ground === 'Rug') set(x, 97 + Math.abs((x % 6) - 3), 1, 0.8);
        else if (x % 3 === 0) set(x, 97, 2, 0);
      }
      const [qx, qy] = [104, 30];
      const PRP = { Ant: (x, y) => [[0, 0, 1.6], [4, 0, 2], [8.5, 0, 2.5]].some(([a, b, r]) => (x - a) ** 2 + (y - b) ** 2 <= r * r), 'Floppy Disk': (x, y) => Math.abs(x) <= 6 && Math.abs(y) <= 6, Mug: (x, y) => (Math.abs(x) <= 4 && Math.abs(y) <= 5) || (x > 4 && x <= 7 && Math.abs(y) <= 3 && Math.abs(Math.hypot(x - 4, y) - 2.5) < 1), Flower: (x, y) => [0, 1, 2, 3, 4].some(k => Math.hypot(x - Math.cos(k * 1.257) * 3.5, y + 2 - Math.sin(k * 1.257) * 3.5) < 2) || (Math.abs(x) < 1 && y > 0 && y < 9), Cactus: (x, y) => (Math.abs(x) <= 2 && Math.abs(y) <= 8) || (x >= -6 && x <= -4 && y >= -4 && y <= 2) || (x >= -6 && x <= -2 && y >= 1 && y <= 2) || (x >= 4 && x <= 6 && y >= -6 && y <= 0) || (x >= 2 && x <= 6 && y >= -1 && y <= 0), Grubs: (x, y) => [-6, 0, 6].some(d => Math.abs(Math.hypot(x - d, y + 1) - 2.5) < 1 && y > -2) }[prop];
      if (PRP) for (let y = -10; y <= 10; y++) for (let x = -10; x <= 10; x++) { if (!PRP(x, y)) continue; const e = !PRP(x - 1, y) || !PRP(x + 1, y) || !PRP(x, y - 1) || !PRP(x, y + 1); set(qx + x, qy + y, e ? 2 : (x + y) % 2 ? 1 : 7, 0.8); }
      // facing right: mirrored (the lettering is laid after)
      if (MIR) for (let y = 0; y < PG; y++) for (let x = 0; x < PG / 2; x++) { const a = y * PG + x, b = y * PG + PG - 1 - x; [T[a], T[b]] = [T[b], T[a]]; const va = A[a]; A[a] = Math.PI - A[b]; A[b] = Math.PI - va; }
      // the dial's engine-turned ground, behind everything, in the Desktop trait's turning
      for (let y = 0; y < PG; y++) for (let x = 0; x < PG; x++) {
        const i = y * PG + x; if (T[i]) continue;
        const dx = x - 64, dy = y - 60, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
        let on = false, ang = a + Math.PI / 2;
        if (desk === 'Diagonal') { on = ((x + y) % 4) < 1; ang = -Math.PI / 4; }
        else if (desk === 'Bricks') { on = y % 6 === 0 || (x + (Math.floor(y / 6) % 2) * 6) % 12 === 0; ang = y % 6 === 0 ? 0 : Math.PI / 2; }
        else if (desk === 'Light Dots') on = (x % 4 === 0 && y % 4 === 0);
        else if (desk === 'Waves') { on = ((y + Math.sin(x * 0.25) * 2.5) % 4 + 4) % 4 < 1; ang = Math.atan(Math.cos(x * 0.25) * 0.6); }
        else if (desk === 'Black') { on = (x + y) % 2 === 0; ang = 0; }
        else if (desk !== 'Plain') on = ((r + Math.sin(a * 14) * 1.6) % 3 + 3) % 3 < 1.1;
        // (kept quiet: only every other line of the turning, so the armadillo stays the brightest thing)
        if (on && (x + y) % 2 === 0) { T[i] = 5; A[i] = ang; }
      }
      // the raised border (Window: a guilloche frame) with its rope, and the cartouche for the name
      for (let y = 0; y < PG; y++) for (let x = 0; x < PG; x++) {
        const i = y * PG + x, d = Math.min(x, y, PG - 1 - x, PG - 1 - y);
        if (d < 7) { T[i] = d === 0 || d === 6 ? 2 : d >= 2 && d <= 4 && (x + y) % 4 < 2 ? 4 : 3; A[i] = (y < 7 || y > PG - 8) ? Math.PI / 4 : -Math.PI / 4; }
        if (y >= 106 && y <= 120 && x >= 26 && x <= 101) T[i] = (y === 106 || y === 120 || x === 26 || x === 101) ? 2 : 3;
      }
      const F7 = { A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'], M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'], D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'], I: ['111', '010', '010', '010', '010', '010', '111'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'], O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'] };
      let lx = 64 - 26;
      for (const ch of 'ARMADILLO') { const gl = F7[ch]; gl.forEach((r, j) => { for (let q = 0; q < r.length; q++) if (r[q] === '1') T[(110 + j) * PG + lx + q] = 2; }); lx += gl[0].length + 1; }
      // the cursor trait, stamped small at the cartouche's end
      const CUR = { Arrow: ['X...', 'XX..', 'XXX.', 'XXXX', 'X.X.'], 'Pointing Hand': ['.X..', '.XX.', 'XXXX', 'XXXX', '.XX.'], Wristwatch: ['.XX.', 'X..X', 'X.XX', '.XX.'], Crosshair: ['.X.', 'XXX', '.X.'], 'Paint Bucket': ['XXXX', 'X..X', 'XXXX', '.XX.'] }[cursor];
      if (CUR) CUR.forEach((r, j) => { for (let q = 0; q < r.length; q++) if (r[q] === 'X') T[(110 + j) * PG + 94 + q] = 2; });
      const pal = [[22, 12, 4], [52, 32, 12], [88, 58, 22], [130, 90, 36], [176, 128, 56], [214, 170, 84], [242, 210, 128], [255, 244, 200], [255, 255, 255],
        [40, 44, 54], [86, 92, 106], [140, 148, 164], [194, 202, 216], [236, 242, 250], [255, 255, 255], [14, 8, 4], [26, 15, 7], [42, 26, 12], [66, 42, 18]];
      // the ornament your cuts complete: laurel sprigs either side of the cartouche, engraved in once you've cut enough
      const ORN = [];
      // (two big sprigs curving up either side of the name plate, broad leaves in pairs along them)
      for (const s2 of [-1, 1]) for (let k = 0; k <= 60; k++) {
        const u = k / 60, a0 = Math.PI * (0.55 + u * 0.75), x = 64 + s2 * (46 - Math.cos(a0) * 6 + u * 4), y = 122 - u * 34, ang = Math.atan2(-34, s2 * 10);
        ORN.push([Math.round(x), Math.round(y), ang, u]);
        if (k % 6 === 3) for (const side of [-1, 1]) for (let q = 1; q <= 6; q++) for (const w of [0, 1]) {
          const lx = x + side * (q * 0.9) + s2 * q * 0.3, ly = y - q * 0.7 + w * (q < 5 && q > 1 ? 1 : 0);
          ORN.push([Math.round(lx), Math.round(ly), ang + side * 0.9, u]);
        }
      }
      const cv = document.createElement('canvas'); cv.width = cv.height = PG;
      return { T, A, ORN, CT: new Float32Array(PG * PG), ncut: 0, ornAt: -9, pal, cv, cx: cv.getContext('2d'), px: new Uint8Array(PG * PG), cut: [], lastCut: null, buffAt: -9, at: -9, was: false, mx: 0, my: 0, mv: 0, lx: 30, ly: 20 };
    }
    function plateFrame(t) {
      if (!PLT) PLT = plateSetup();
      const K = PLT, inp = c.input, T = K.T, A = K.A, px = K.px;
      inp.taps();
      // the light: the pointer, or drifting slowly over the plate
      const tlx = inp.inside ? inp.x * PG : 64 + Math.cos(t * 0.4) * 46, tly = inp.inside ? inp.y * PG : 50 + Math.sin(t * 0.55) * 34;
      K.lx += (tlx - K.lx) * 0.4; K.ly += (tly - K.ly) * 0.4;
      // the burin: a drag cuts a line, its angle the way you drew it; a short still tap buffs the plate
      if (inp.down && !K.was) { K.at = t; K.mx = inp.x * PG; K.my = inp.y * PG; K.mv = 0; }
      if (inp.down) {
        const x = inp.x * PG, y = inp.y * PG; K.mv = Math.max(K.mv, Math.hypot(x - K.mx, y - K.my));
        if (K.mv >= 2) {
          const a = K.lastCut || [x, y], dl = Math.hypot(x - a[0], y - a[1]), n = Math.ceil(dl * 1.5) + 1, ang = dl > 0.3 ? Math.atan2(y - a[1], x - a[0]) : 0;
          for (let k = 0; k <= n; k++) { const cx = Math.round(a[0] + (x - a[0]) * k / n), cy = Math.round(a[1] + (y - a[1]) * k / n); if (cx > 7 && cy > 7 && cx < PG - 8 && cy < PG - 8) { const i = cy * PG + cx; if (T[i] !== 6) K.ncut++; T[i] = 6; A[i] = ang; K.CT[i] = t; } }
          if (K.ncut > 90 && K.ornAt < 0) { K.ornAt = t; [72, 79, 84, 88, 91].forEach((m, i) => c.sound.note(m, { dur: 1.2, vel: 0.05, wave: 'sine', at: 0.1 + i * 0.12 })); }
          if (dl > 3 || !K.lastCut) c.sound.hit('noise', 0.04, { cutoff: 6000 + (y | 0) * 20, dur: 0.04 });
          K.lastCut = [x, y];
        }
      } else K.lastCut = null;
      if (!inp.down && K.was && t - K.at < 0.3 && K.mv < 2) { K.buffAt = t; [79, 86, 91].forEach((m, i) => c.sound.note(m, { dur: 0.7, vel: 0.05, wave: 'sine', at: i * 0.08 })); }
      K.was = inp.down;
      const lx = K.lx, ly = K.ly, bu = (t - K.buffAt) / 0.7, bpos = bu >= 0 && bu < 1 ? -30 + bu * 290 : -999;
      // the ornament engraving itself in, leaf by leaf
      if (K.ornAt > 0) { const u = Math.min(1, (t - K.ornAt) / 1.4); for (const [x, y, ang, q] of K.ORN) if (q <= u) { const i = y * PG + x; if (T[i] !== 6) { T[i] = 6; A[i] = ang; K.CT[i] = K.ornAt + q * 1.4; } } }
      for (let y = 0; y < PG; y++) for (let x = 0; x < PG; x++) {
        const i = y * PG + x, k = T[i];
        // the light's way to this dot: a line glints when it lies across it; the polished plate shines near it
        const dx = x - lx, dy = y - ly, dd = Math.hypot(dx, dy), spot = Math.max(0, 1 - dd / 70), phi = Math.atan2(dy, dx);
        let b;
        let sil = false;
        if (k === 2) b = 0.05;
        else if (k === 5) { const cs = Math.abs(Math.sin(A[i] - phi)); b = 0.08 + cs ** 6 * (0.12 + spot * 0.2); }
        else if (k === 1 || k === 4 || k === 6 || k === 9) { const cs = Math.abs(Math.sin(A[i] - phi)), gl = cs ** 6; b = 0.18 + gl * (0.45 + spot * 0.75) + (k === 6 ? 0.15 + Math.max(0, 1 - (t - K.CT[i]) / 4) * 0.6 : 0); sil = k === 9; }
        else if (k === 7 || k === 8) { b = 0.5 + spot * 0.55; sil = k === 8; }
        else if (k === 3) b = 0.44 + spot * spot * 0.5;
        else b = 0.06 + spot * 0.14;   // the frosted field, dark
        if (bpos > -999) { const q = x + y - bpos; if (q > -6 && q < 6) b += 0.5 * (1 - Math.abs(q) / 6); }
        const v = b * 8 + (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 0.8;
        // (the ground in its own deep bronze, so the gold and the silver lines own the plate)
        px[i] = sil ? 9 + Math.max(0, Math.min(5, Math.floor(v * 0.75))) : (k === 0 || k === 5) ? 15 + Math.max(0, Math.min(3, Math.floor(v * 1.4))) : Math.max(0, Math.min(8, Math.floor(v)));
      }
      // the burin's tip while it cuts: a fleck of bright metal
      if (K.lastCut) { const X = Math.round(K.lastCut[0]), Y = Math.round(K.lastCut[1]); for (const [a, b2] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = X + a, yy = Y + b2; if (xx >= 0 && yy >= 0 && xx < PG && yy < PG) px[yy * PG + xx] = a || b2 ? 7 : 8; } }
      const im = K.im || (K.im = K.cx.createImageData(PG, PG)), d = im.data, pal = K.pal;
      for (let i = 0; i < PG * PG; i++) { const p = pal[px[i]]; d[i * 4] = p[0]; d[i * 4 + 1] = p[1]; d[i * 4 + 2] = p[2]; d[i * 4 + 3] = 255; }
      K.cx.putImageData(im, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(K.cv, 0, 0, S, S);
    }
    function frame(t) {
      if (LEG === 'Glyptodon') return caveFrame(t);   // (a legendary is drawn whole, its own way, above)
      if (LEG === 'Engraving') return plateFrame(t);
      const inp = c.input;
      const taps = inp.taps(), tp = taps[0];
      if (LEG && inp.inside && !wasIn) {
        if (LEG === 'Glyptodon') { c.sound.note(40, { dur: 0.5, vel: 0.16, wave: 'square', cutoff: 300 }); c.sound.note(43, { dur: 0.6, vel: 0.14, wave: 'square', cutoff: 300, at: 0.35 }); }
        else c.sound.note(84, { dur: 0.15, vel: 0.06, wave: 'triangle' });
      }
      wasIn = inp.inside;
      if (tp && rosette && t - curlAt > 1.7 && Math.hypot(tp.x * N - (MIR ? N - 54 : 54), tp.y * N - 19) < 10) {
        if (t - rosAt > 1.2) { rosAt = t; [64, 67, 72, 76, 79].forEach((m, i) => c.sound.note(m, { dur: i === 4 ? 0.4 : 0.1, vel: 0.13, wave: 'square', cutoff: 2600, at: i * 0.1 })); }
      } else if (tp && LEG) {
        // (a legendary's taps are read from its own presses, below)
      } else if (tp && t - curlAt > 2.2) {
        curlAt = t;
        // a falling run as it tucks in, a rising one as it opens up again
        [76, 71, 67, 64].forEach((m, i) => c.sound.note(m, { dur: 0.06, vel: 0.16, wave: 'square', cutoff: 2200, at: i * 0.05 }));
        [64, 67, 71, 76].forEach((m, i) => c.sound.note(m, { dur: 0.06, vel: 0.14, wave: 'square', cutoff: 2200, at: 1.5 + i * 0.05 }));
      }
      const lg = null;
      if (!LEG && inp.inside && inp.down) {
        const gx = inp.x * N, gy = inp.y * N;
        if (!wasDown) dragFrom = [gx, gy];
        if (dragFrom && Math.hypot(gx - dragFrom[0], gy - dragFrom[1]) > 3) ant = [dragFrom[0], dragFrom[1], gx, gy];
      } else if (wasDown && ant) c.sound.note(88, { dur: 0.04, vel: 0.08, wave: 'square', cutoff: 3000 });
      wasDown = inp.inside && inp.down;
      const ct = t - curlAt;
      const curl = ct < 1.6 ? Math.min(1, ct * 6, (1.6 - ct) * 6) : 0;
      // repaint only when something visible has changed: every frame while it rolls, swings, stamps or spins,
      // otherwise when a blink, a twitch, a step, the ant, the steam, the halo, the clock, the ants or the cursor moves on
      const live = curl > 0 || LEG === 'Glyptodon' || LEG === 'Engraving' || (rosette && t - rosAt < 1.25);
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
      // (the Engraving is cut at twice the grain, into its own bitmap)
      const src = off;
      if (src === off) {
        const d = img.data;
        for (let i = 0; i < N * N; i++) { const p = bit[i] ? ink : paper; d[i * 4] = p[0]; d[i * 4 + 1] = p[1]; d[i * 4 + 2] = p[2]; d[i * 4 + 3] = 255; }
        oc.putImageData(img, 0, 0);
      }
      g.imageSmoothingEnabled = false; // keep the dots square
      g.drawImage(src, 0, 0, S, S);
      // a phosphor screen glows a little past each dot
      if (screen === 'Amber Phosphor' || screen === 'Green Phosphor') {
        g.globalAlpha = 0.18; g.imageSmoothingEnabled = true; g.drawImage(src, -S / 128, -S / 128, S + S / 64, S + S / 64); g.globalAlpha = 1;
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
