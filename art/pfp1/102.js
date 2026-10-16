// Night Panel: from D:/code/synaesthesia/public/drop03/pieces/102.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Night Panel: lemurs on a backlit LCD seen so close that every dot splits into red, green and blue stripes.
Proto.add({
  num: 102,
  name: 'Night Panel',
  fam: 'Pixel Portraits II',
  seed: 6,
  recipe: 'A big-eyed lemur at night, drawn 32 dots across on a backlit LCD seen so close that every dot splits into its sub-pixels. Coat, face, eyes, ears, mood, pose (clinging, sunning, peeking over a ledge, hugging its tail), accessory, perch, sky, the light on it, the screen itself (clean, a bleeding backlight, a ghost lemur burned in, cracked, a dead column, water damage) and its company vary; once in a long while the screen takes the lemur over (a dead pixel, a test card, or pressed into negative); it blinks, glances about and swings its tail.',
  interactive: 'Hover to shine a torch in its eyes. Tap to make it call.',
  music: true,
  make(c) {
    const S = c.size, out = c.ctx; // the panel's glass
    // xorshift128 seeded from the hash
    const hx = c.hash.slice(2);
    let x0 = parseInt(hx.slice(0, 8), 16) | 1, x1 = parseInt(hx.slice(8, 16), 16) ^ parseInt(hx.slice(40, 48), 16);
    let x2 = parseInt(hx.slice(16, 24), 16) ^ parseInt(hx.slice(48, 56), 16), x3 = parseInt(hx.slice(24, 32), 16) ^ parseInt(hx.slice(56, 64), 16) ^ parseInt(hx.slice(32, 40), 16);
    function xs() {
      const tt = x0 ^ (x0 << 11);
      x0 = x1; x1 = x2; x2 = x3;
      x3 = (x3 ^ (x3 >>> 19)) ^ (tt ^ (tt >>> 8));
      return (x3 >>> 0) / 4294967296;
    }
    for (let i = 0; i < 16; i++) xs();
    const choose = (...pairs) => { // value, weight, value, weight...
      let sum = 0;
      for (let w = 1; w < pairs.length; w += 2) sum += pairs[w];
      let r = xs() * sum;
      for (let i = 0; i < pairs.length; i += 2) { r -= pairs[i + 1]; if (r <= 0) return pairs[i]; }
      return pairs[0];
    };

    let coat = choose('Ring-Tailed', 32, 'Red Ruffed', 18, 'Black and White Ruffed', 16, 'Bamboo Gold', 14, 'Mouse Brown', 12, 'Spectral', 5, 'Gilded', 3);
    let face = choose('Bandit Patches', 34, 'Spectacle Rings', 22, 'Plain', 24, 'Dark Muzzle', 20);
    let eyes = choose('Amber', 32, 'Lemon', 26, 'Ink', 18, 'Ember', 14, 'Mismatched', 7, 'Hypno', 3);
    let ears = choose('Pointed', 34, 'Tufted', 26, 'Swept', 26, 'Ragged', 14);
    let extra = choose('None', 36, 'Reading Glasses', 16, 'Scarf', 16, 'Monocle', 10, 'Nightcap', 14, 'Firefly', 8);
    let perch = choose('Branch', 40, 'Fence', 22, 'Wire', 22, 'Lamp', 16);
    let sky = choose('Midnight', 30, 'Dusk', 24, 'Moonlit', 22, 'Forest', 16, 'Aurora', 8);
    let panel = choose('RGB Stripe', 46, 'BGR Stripe', 24, 'Delta', 22, 'Stuck Pixel', 8);

    const stars = [];
    for (let i = 0; i < 18; i++) stars.push([Math.floor(xs() * 32), Math.floor(xs() * 20), xs() * 7]);
    const stuck = [Math.floor(xs() * 30) + 1, Math.floor(xs() * 30) + 1];
    const blinkEvery = 3 + xs() * 2.5, blinkOff = xs() * 3, lookEvery = 5 + xs() * 4, lookOff = xs() * 5, moonSide = xs() < 0.5 ? 6 : 26;
    const tailPh = xs() * 6.28, flyPh = xs() * 6.28;

    // torch and call: their own splitmix-style stream from the hash's middle words, so the look above never moves
    let sm = (parseInt(hx.slice(20, 28), 16) ^ 0x5bd1e995) >>> 0;
    const smr = () => { sm = (sm + 0x9e3779b9) >>> 0; let z = sm; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b); z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const callScale = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 5, 7, 9]][Math.floor(smr() * 3)];
    // who keeps it company: rolled on the same side stream, so the traits above keep their values
    const compRoll = smr() * 100;
    let company = compRoll < 58 ? 'None' : compRoll < 78 ? 'Baby' : compRoll < 95 ? 'Moth' : 'Twins';
    const mothPh = smr() * 6.28;
    const callRoot = 72 + Math.floor(smr() * 6);

    // everything added since: a PCG stream on another slice of the hash, so every roll above keeps its value
    let pcg = (parseInt(hx.slice(44, 52), 16) ^ 0x2545f491) >>> 0;
    const pr = () => {
      pcg = (Math.imul(pcg, 747796405) + 2891336453) >>> 0;
      const w = Math.imul((pcg >>> ((pcg >>> 28) + 4)) ^ pcg, 277803737) >>> 0;
      return (((w >>> 22) ^ w) >>> 0) / 2 ** 32;
    };
    for (let i = 0; i < 2; i++) pr();
    const pick = table => { let tot = 0; for (const e of table) tot += e[1]; let r = pr() * tot; for (const e of table) { r -= e[1]; if (r < 0) return e[0]; } return table[0][0]; };
    // a chance at one of the newer values: always two draws, whatever happens, so the stream never slips
    const maybe = (cur, p, table) => { const a = pr(), b = pick(table); return a < p ? b : cur; };
    let pose = pick([['Clinging', 44], ['Sun Salute', 20], ['Peeking', 18], ['Tail Hug', 18]]);
    const mood = pick([['Alert', 38], ['Drowsy', 18], ['Smug', 14], ['Startled', 13], ['Dozing', 12], ['Starry-Eyed', 5]]);
    let light = pick([['Ambient', 34], ['Moon Rim', 26], ['Lamp Rim', 18], ['Neon Signs', 12], ['Screen Glow', 10]]);
    const glass = pick([['Clean', 58], ['Backlight Bleed', 14], ['Dust', 10], ['Burn-In', 8], ['Hairline Crack', 6], ['Dead Column', 4]]);
    coat = maybe(coat, 0.28, [['Sifaka White', 28], ['Crowned', 24], ['Mongoose', 22], ['Coal Black', 18], ['Aye-Aye', 8]]);
    face = maybe(face, 0.2, [['White Blaze', 40], ['Masked', 35], ['Freckled', 25]]);
    eyes = maybe(eyes, 0.18, [['Ice Blue', 45], ['Violet', 32], ['Galaxy', 23]]);
    ears = maybe(ears, 0.15, [['Folded', 60], ['Tiny', 40]]);
    if (coat === 'Aye-Aye') ears = 'Saucers';
    extra = maybe(extra, 0.22, [['Hibiscus', 30], ['Leaf Hat', 25], ['Gold Earring', 25], ['Bow Tie', 20]]);
    perch = maybe(perch, 0.26, [['Rooftop', 28], ['Vine', 24], ['Lantern String', 22], ['Neon Tube', 18], ['Crescent Moon', 8]]);
    sky = maybe(sky, 0.24, [['Rain', 26], ['City Glow', 26], ['Fog', 20], ['Meteor Shower', 18], ['Blood Moon', 10]]);
    const layout = maybe(panel, 0.3, [['PenTile', 40], ['Chevron', 35], ['Quad RGBW', 25]]);
    if (panel === 'RGB Stripe') panel = layout;
    company = maybe(company, 0.2, [['Bat', 40], ['Gecko', 36], ['Eyes in the Dark', 24]]);
    // ---------- the screen, dark coats and a gentler balance: a murmur-mixed stream of their own on hash 12..20 ----------
    // (the old panel and glass rolls above are still made, so nothing else slips)
    let sv = (parseInt(hx.slice(12, 20), 16) ^ 0x7f4a7c15) >>> 0;
    const svr = () => { sv = (sv + 0x9e3779b9) >>> 0; let z = sv; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
    const spick = table => { let tot = 0; for (const e of table) tot += e[1]; let r = svr() * tot; for (const e of table) { r -= e[1]; if (r < 0) return e[0]; } return table[0][0]; };
    const screen = spick([['Clean', 30], ['Backlight Bleed', 17], ['Burn-In', 14], ['Cracked', 12], ['Dead Column', 10], ['Water Damage', 10], ['Stuck Pixels', 4], ['PenTile', 3]]);
    const poseR = svr(), poseP = svr(), compR = svr(), compP = svr();
    if (pose === 'Clinging' && poseR < 0.33) pose = ['Sun Salute', 'Peeking', 'Tail Hug'][Math.floor(poseP * 3)];
    if (company === 'None' && compR < 0.38) company = compP < 0.5 ? 'Tree Frog' : 'Moth Swarm';
    // dark coats always get a rim of light and a paler sky behind them
    const darkCoat = coat === 'Coal Black' || coat === 'Black and White Ruffed' || coat === 'Aye-Aye';
    const rimR = svr();
    if (darkCoat && (light === 'Ambient' || light === 'Screen Glow')) light = rimR < 0.55 ? 'Moon Rim' : 'Lamp Rim';
    // ---------- legendaries: their own xoroshiro64* seeded by a djb2 fold of the hash read backwards ----------
    let k0 = 5381, k1 = 0x6c656d75;
    for (let i = c.hash.length - 1; i >= 2; i--) { k0 = (Math.imul(k0, 33) ^ c.hash.charCodeAt(i)) >>> 0; k1 = (Math.imul(k1 ^ k0, 0x2545f491) + i) >>> 0; }
    k0 = k0 || 1;
    const lr = () => {
      const r = Math.imul(k0, 0x9e3779bb) >>> 0;
      k1 = (k1 ^ k0) >>> 0; k0 = (((k0 << 26) | (k0 >>> 6)) ^ k1 ^ (k1 << 9)) >>> 0; k1 = ((k1 << 13) | (k1 >>> 19)) >>> 0;
      return r / 4294967296;
    };
    for (let i = 0; i < 4; i++) lr();
    const lu = lr(), lp = lr(), lcv = lr();
    const legend = lu < 0.0022 ? (lp < 0.4 ? 'Dead Pixel' : lp < 0.73 ? 'Test Card' : 'Inverted') : 'None';
    if (legend === 'None' && lcv < 0.005) extra = 'Pocket Moon';
    const starPh = []; for (let i = 0; i < 64; i++) starPh.push(lr() * 6.283);
    // a dead-pixel lemur always shows its whole body (sunning or clinging, never peeking), stuck in one pure colour
    const dpPose = lr(), dpCh = Math.floor(lr() * 3);
    if (legend === 'Dead Pixel' && pose !== 'Sun Salute' && pose !== 'Clinging') pose = dpPose < 0.5 ? 'Sun Salute' : 'Clinging';
    if (legend !== 'None') { c.trait('Legendary', legend); c.trait('Pose', pose); c.trait('Company', company); c.trait('Screen', screen); }
    else {
    c.trait('Coat', coat);
    c.trait('Face', face);
    c.trait('Eyes', eyes);
    c.trait('Ears', ears);
    c.trait('Mood', mood);
    c.trait('Pose', pose);
    c.trait('Accessory', extra);
    c.trait('Perch', perch);
    c.trait('Sky', sky);
    c.trait('Light', light);
    c.trait('Screen', screen);
    c.trait('Company', company);
    }

    // fixed-size rolls for the new skies, glass and company, made whatever was picked
    const drops = [];
    for (let i = 0; i < 16; i++) drops.push([pr() * 40, pr() * 32, 9 + pr() * 7]);
    const towers = [];
    for (let i = 0; i < 9; i++) towers.push([Math.floor(pr() * 4) + 3, 15 + Math.floor(pr() * 9), pr()]);
    const meteors = [];
    for (let i = 0; i < 4; i++) meteors.push([4 + pr() * 26, pr() * 8, pr() * 5, 3 + pr() * 3]);
    const specks = [];
    for (let i = 0; i < 7; i++) specks.push([pr(), pr(), 0.5 + pr()]);
    const crack = [[pr() < 0.5 ? 0 : 32, 2 + pr() * 10]];
    for (let i = 1; i < 9; i++) { const p = crack[i - 1]; crack.push([p[0] + (p[0] < 16 || crack[0][0] === 0 ? 1 : -1) * (2 + pr() * 3), p[1] + 1.2 + pr() * 2.8]); }
    const deadX = 3 + Math.floor(pr() * 26), deadCh = Math.floor(pr() * 3);
    const blots = [];
    for (let i = 0; i < 3; i++) blots.push([pr() < 0.5 ? pr() * 4 : 28 + pr() * 4, pr() * 32, 5 + pr() * 5]);
    const batPh = pr() * 6.28, geckoPh = pr() * 6.28, lurkX = 3 + pr() * 6, pressNote = Math.floor(pr() * 5);
    // the screen's own faults (drawn last from this stream, so nothing above moves): a crack's impact and arms,
    // a water stain, a few stuck dots, and the company's new members
    const imp = [5 + pr() * 22, 3 + pr() * 12], crackDots = new Map();
    for (let a = 0; a < 5; a++) {
      let ang = a * 1.2566 + pr() * 0.7, x = imp[0], y = imp[1];
      const len = 5 + pr() * 15;
      for (let k = 0; k < len; k++) { ang += (pr() - 0.5) * 0.5; x += Math.cos(ang); y += Math.sin(ang); const xi = Math.floor(x), yi = Math.floor(y); if (xi >= 0 && yi >= 0 && xi < 32 && yi < 32) crackDots.set(yi * 32 + xi, 1); }
    }
    const stain = [pr() < 0.5 ? 3 + pr() * 6 : 23 + pr() * 6, 4 + pr() * 22, 4.5 + pr() * 3, pr() * 6.28];
    const stuckDots = []; for (let k = 0; k < 4; k++) stuckDots.push([Math.floor(pr() * 32), Math.floor(pr() * 32), [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255]][k]]);
    const swarm = []; for (let k = 0; k < 5; k++) swarm.push([pr() * 6.28, 2 + pr() * 3, 0.6 + pr() * 0.8]);
    const frogX = 2 + Math.floor(pr() * 3);

    // colour sets: dark, body, light, face, belly, tail ring (or none)
    const hexRGB = h => [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
    const CO = {
      'Ring-Tailed': ['#26262c', '#8e8e98', '#c0c0c8', '#f6f6f2', '#ece8de', '#f6f6f2'],
      'Red Ruffed': ['#2a0c08', '#b04020', '#e07a40', '#24120e', '#f0e4d0', null],
      'Black and White Ruffed': ['#0c0c10', '#34343c', '#f4f4f0', '#50505a', '#f0f0ec', null],
      'Bamboo Gold': ['#5a3414', '#c88a3c', '#eab070', '#f0d4a0', '#f4e2bc', null],
      'Mouse Brown': ['#3c2414', '#9a6a48', '#c89470', '#eedcc4', '#eedcc4', null],
      Spectral: ['#21154d', '#4b3aa8', '#8c7cf0', '#d8d0ff', '#b9b0ff', '#d8d0ff'],
      Gilded: ['#5b3a00', '#b98200', '#f2c230', '#fff1a6', '#ffe57a', '#fff1a6'],
      'Sifaka White': ['#5a3a24', '#e6e2da', '#ffffff', '#2c2622', '#f4f0e8', null],
      Crowned: ['#34343a', '#8a8c94', '#b8bac2', '#dcd8cc', '#e8e2d4', null],
      Mongoose: ['#2a2018', '#7c6a58', '#a8957e', '#c8b8a0', '#d8c8b0', null],
      'Coal Black': ['#0a0a10', '#4c4c5e', '#9090b4', '#62627a', '#76768e', null],
      'Aye-Aye': ['#14100e', '#3e3428', '#6e5e4a', '#8e7e66', '#5e5040', null],
    }[coat].map(h => h && hexRGB(h));
    const [dk, md, lt, fc, bl, ring] = CO;
    const darkFace = coat.indexOf('Ruffed') >= 0 || coat === 'Sifaka White';
    // a black lemur with dark eye patches: the patches go mid grey (lighter than the coat), the irises always bright and
    // the closed lids a light grey line, so its eyes never sink into the fur
    const greyMask = coat === 'Coal Black' && (face === 'Bandit Patches' || face === 'Masked' || face === 'Spectacle Rings');
    const patch = greyMask ? [124, 124, 148] : dk, lidLine = greyMask ? [228, 228, 242] : [14, 10, 20];
    const IR = { Amber: [255, 150, 20], Lemon: [255, 230, 40], Ink: greyMask ? [184, 176, 214] : [30, 20, 30], Ember: [255, 60, 40], Hypno: [90, 255, 200], 'Ice Blue': [120, 200, 255], Violet: [180, 110, 255], Galaxy: greyMask ? [110, 126, 255] : [40, 40, 120] };
    const irisL = eyes === 'Mismatched' ? [80, 170, 255] : IR[eyes], irisR = eyes === 'Mismatched' ? [255, 170, 30] : IR[eyes];
    const SKY = {
      Midnight: [[8, 14, 52], [30, 40, 110]],
      Dusk: [[40, 18, 70], [210, 90, 90]],
      Moonlit: [[16, 30, 70], [70, 100, 160]],
      Forest: [[6, 28, 24], [30, 90, 60]],
      Aurora: [[6, 12, 40], [20, 60, 70]],
      Rain: [[12, 18, 34], [46, 60, 86]],
      'City Glow': [[14, 10, 42], [130, 64, 110]],
      Fog: [[26, 32, 50], [96, 106, 128]],
      'Meteor Shower': [[4, 6, 28], [26, 28, 78]],
      'Blood Moon': [[22, 6, 14], [92, 22, 30]],
    }[sky].map((c2, k) => darkCoat ? c2.map(v => Math.min(255, v * 1.25 + (k ? 58 : 30))) : c2);
    const ink = [14, 10, 20];
    const RIM = { 'Moon Rim': [[-1, -1], [200, 222, 255], 0.62], 'Lamp Rim': [[1, 0], [255, 186, 100], 0.62], 'Neon Signs': [[-1, 0], [255, 70, 190], 0.66], 'Screen Glow': [[0, 1], [150, 200, 255], 0.5] }[light];
    if (RIM && darkCoat) RIM[2] = Math.min(0.86, RIM[2] * 1.3);

    const N = 32;
    const rgb = new Float32Array(N * N * 3);
    const own = new Uint8Array(N * N); // 1 where the lemur and its company are
    const mark = new Uint8Array(N * N);
    const headMask = new Uint8Array(N * N);
    function dot(x, y, col, m) {
      if (x < 0 || y < 0 || x >= N || y >= N) return; // off the panel
      const i = y * N + x;
      rgb[i * 3] = col[0]; rgb[i * 3 + 1] = col[1]; rgb[i * 3 + 2] = col[2];
      if (m !== undefined) own[i] = m;
    }
    function disk(cx, cy, rx, ry, col, m) {
      for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
        const a = (x + 0.5 - cx) / rx, b = (y + 0.5 - cy) / ry; // inside the ellipse?
        if (a * a + b * b <= 1) dot(x, y, typeof col === 'function' ? col(x, y) : col, m);
      }
    }
    const tint = (i, col, k) => { rgb[i] += (col[0] - rgb[i]) * k; rgb[i + 1] += (col[1] - rgb[i + 1]) * k; rgb[i + 2] += (col[2] - rgb[i + 2]) * k; };
    // the burn-in ghost: a status bar the panel showed for years (a clock and a battery), as 3 x 5 dot glyphs
    const ghost = new Uint8Array(N * N);
    {
      const G = ['111001111111', '101001001101', '101001111101', '101001100101', '111001111111'];
      for (let r = 0; r < 5; r++) for (let q = 0; q < 12; q++) if (G[r][q] === '1') ghost[(r + 1) * N + q + 2] = 1;
      for (let x = 23; x < 30; x++) { ghost[N + x] = 1; ghost[4 * N + x] = 1; }
      for (let y = 1; y < 5; y++) { ghost[y * N + 23] = 1; ghost[y * N + 29] = 1; }
      ghost[2 * N + 30] = ghost[3 * N + 30] = 1;
      for (let y = 2; y < 4; y++) for (let x = 24; x < 27; x++) ghost[y * N + x] = 1;
    }
    // backlight bleed: light clouding in from a few spots along the edges
    const bleed = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // every dot
      let v = 0;
      for (const b of blots) v = Math.max(v, 1 - Math.hypot(x - b[0], y - b[1]) / (b[2] * 1.5));
      bleed[y * N + x] = Math.max(0, v) ** 1.25;
    }

    const HY = pose === 'Peeking' ? 5 : 0;
    // the head, row by row: a rounded crown, wide cheeks at the eyes, then a long muzzle narrowing to the nose
    const HW = [4.2, 6, 7.2, 7.8, 8.2, 8.2, 8.2, 8.2, 8, 7.4, 6.4, 5.2, 4.1, 3.1, 2.3, 1.6];
    const capCol = hexRGB('#7a4a2c'), crownCol = hexRGB('#e07a2a'), cheekCol = hexRGB('#c0582c'), blaze = [248, 246, 240];
    function headAt(x, ry) {
      const w = HW[ry - 6], u = (x + 0.5 - 16) / w;
      let col = md;
      if (ry <= 8 && u < -0.3) col = lt;
      if (darkFace) { if ((ry >= 12 && Math.abs(u) < 0.5) || ry >= 16) col = fc; }
      else if ((ry >= 10 && Math.abs(u) < 0.72) || ry >= 16) col = fc;
      if (face === 'Dark Muzzle' && ry >= 17) col = dk;
      if (coat === 'Sifaka White' && ry <= 9) col = capCol;
      if (coat === 'Crowned' && ry >= 7 && ry <= 9 && Math.abs(u) < 0.62) col = crownCol;
      if (coat === 'Mongoose' && ry >= 14 && ry <= 16 && Math.abs(u) > 0.55) col = cheekCol;
      if (face === 'White Blaze' && Math.abs(x + 0.5 - 16) < 1.1 && ry >= 7 && ry <= 18) col = blaze;
      if (face === 'Masked' && ry >= 11 && ry <= 15 && Math.abs(u) < 0.96) col = patch;
      if (face === 'Freckled' && ry >= 16 && ry <= 18 && (x * 3 + ry * 5) % 4 === 0) col = [(fc[0] + dk[0]) / 2, (fc[1] + dk[1]) / 2, (fc[2] + dk[2]) / 2];
      return col;
    }

    function drawPerch(t, top, solid) {
      const P0 = {
        Branch: [[90, 58, 36], [60, 38, 24], [40, 26, 18]], Fence: [[170, 130, 90], [130, 95, 64], [70, 50, 40]], Wire: [[60, 62, 72], [40, 42, 50], [24, 24, 30]],
        Lamp: [[120, 130, 140], [60, 66, 74], [40, 44, 50]], Rooftop: [[150, 70, 54], [104, 44, 36], [60, 24, 22]], Vine: [[60, 120, 60], [34, 70, 40], [20, 40, 26]],
        'Lantern String': [[70, 52, 40], [46, 34, 28], [28, 20, 18]], 'Neon Tube': [[50, 40, 60], [30, 24, 40], [18, 14, 26]], 'Crescent Moon': [[255, 244, 200], [230, 214, 150], [190, 170, 110]],
      }[perch];
      if (solid) for (let y = top; y < N; y++) for (let x = 0; x < N; x++) dot(x, y, y === top ? P0[0] : (x * 7 + y * 3) % 11 === 0 ? P0[2] : P0[1]);
      if (perch === 'Branch') {
        for (let x = 0; x < N; x++) { const y = top + Math.round(Math.sin(x * 0.3) * 0.6); dot(x, y, P0[0]); dot(x, y + 1, P0[1]); dot(x, y + 2, P0[2]); }
        dot(3, top - 1, [70, 140, 60]); dot(4, top - 2, [90, 170, 70]); dot(28, top - 1, [70, 140, 60]);
      } else if (perch === 'Fence') {
        for (let x = 0; x < N; x++) for (let y = top; y < N; y++) dot(x, y, (x % 6 === 0) ? P0[2] : y === top ? P0[0] : P0[1]);
      } else if (perch === 'Wire') {
        for (let x = 0; x < N; x++) { const y = top + Math.round(((x - 16) / 16) ** 2 * 2) - (solid ? 1 : 0); dot(x, y, [20, 20, 26]); }
      } else if (perch === 'Lamp') {
        for (let y = top; y < N; y++) for (let x = 2; x < 30; x++) dot(x, y, y === top ? P0[0] : P0[1]);
        disk(27.5, top - 6, 2.2, 2.2, [255, 220, 120]);
        for (let y = top - 4; y < top; y++) dot(27, y, P0[1]);
      } else if (perch === 'Rooftop') {
        // clay tiles in staggered rows under a pale ridge
        for (let y = top; y < N; y++) for (let x = 0; x < N; x++) dot(x, y, y === top ? [200, 120, 90] : (x + (y - top) * 2) % 4 === 0 ? P0[2] : (y - top) % 2 ? P0[1] : [128, 56, 44]);
      } else if (perch === 'Vine') {
        for (let x = 0; x < N; x++) { const y = top + Math.round(Math.sin(x * 0.22 + 1) * 1.1); dot(x, y, P0[1]); dot(x, y + 1, P0[2]); if (x % 5 === 2) { dot(x, y + 2, P0[0]); dot(x + 1, y + 3, [90, 160, 70]); } }
      } else if (perch === 'Lantern String') {
        for (let x = 0; x < N; x++) dot(x, top + Math.round(((x - 16) / 16) ** 2 * -2) + 2, [36, 28, 24]);
        for (const lx of [4, 28]) {
          const glow = 0.85 + Math.sin(t * 1.3 + lx) * 0.15;
          disk(lx + 0.5, top + 2.5, 1.7, 2.2, [255 * glow, 120 * glow, 60 * glow]);
          dot(lx, top + 1, [255, 220, 150]);
        }
      } else if (perch === 'Neon Tube') {
        for (let x = 1; x < 31; x++) { dot(x, top, [255, 120, 210]); dot(x, top + 1, [255, 230, 250]); dot(x, top + 2, [200, 40, 150]); }
        for (let x = 0; x < N; x++) for (const yy of [top - 1, top + 3]) if (yy >= 0 && yy < N) { const i = (yy * N + x) * 3; rgb[i] += 70; rgb[i + 1] += 12; rgb[i + 2] += 50; }
      } else if (perch === 'Crescent Moon') {
        // it sits on the outer curve of a crescent moon
        for (let y = top - 1; y < N; y++) for (let x = 0; x < N; x++) {
          const a = Math.hypot(x + 0.5 - 16, y + 0.5 - 41) < 14, b = Math.hypot(x + 0.5 - 16, y + 0.5 - 45.5) < 13.5;
          if (a && !b) dot(x, y, (x * 5 + y * 3) % 13 === 0 ? P0[2] : y < top + 1 ? P0[0] : P0[1]);
        }
      }
    }

    function baby(bx, by, blink) {
      dot(Math.round(bx - 2), by - 2, dk, 1); dot(Math.round(bx + 2), by - 2, dk, 1);
      disk(bx, by + 0.3, 2.9, 2.5, dk, 1);
      disk(bx, by + 1.3, 1.5, 1.1, fc, 1);
      if (blink) { dot(Math.floor(bx - 1.3), by, ink, 1); dot(Math.floor(bx + 1.3), by, ink, 1); }
      else { dot(Math.floor(bx - 1.3), by, irisR, 1); dot(Math.floor(bx + 1.3), by, irisL, 1); }
      dot(Math.floor(bx), by + 2, ink, 1);
      dot(Math.round(bx - 3), by + 2, lt, 1); dot(Math.round(bx + 3), by + 2, lt, 1);
    }

    let torch = null, shine = 0, callAt = -9, now = 0, press = null, pressK = 0, awake = 0, flinchAt = -9;
    let moonAt = -9, legAt = -9, legTap = [16, 16], nodes = null, lastNear = -1, nearAt = -9, wasIn = false;
    const sparks = [];
    const moonAt0 = [5.3, 6.2], moonNow = [5.3, 6.2];
    function scene(t) {
      own.fill(0);
      // sky
      for (let y = 0; y < N; y++) {
        const k = Math.min(1, y / 26);
        for (let x = 0; x < N; x++) dot(x, y, [SKY[0][0] + (SKY[1][0] - SKY[0][0]) * k, SKY[0][1] + (SKY[1][1] - SKY[0][1]) * k, SKY[0][2] + (SKY[1][2] - SKY[0][2]) * k]);
      }
      if (sky === 'Aurora') {
        for (let x = 0; x < N; x++) {
          const yy = 6 + Math.sin(x * 0.35 + t * 0.4) * 2.5 + Math.sin(x * 0.13) * 2;
          for (let k = 0; k < 5; k++) {
            const y = Math.floor(yy + k), a = 1 - k / 5;
            if (y >= 0 && y < N) { const i = (y * N + x) * 3; rgb[i] += 30 * a; rgb[i + 1] += 170 * a; rgb[i + 2] += 110 * a; }
          }
        }
      }
      if (sky !== 'Rain' && sky !== 'Fog') for (const s of stars) if ((sky !== 'City Glow' || s[1] < 9) && Math.sin(t * 0.9 + s[2]) > -0.3) dot(s[0], s[1], [230, 230, 255]);
      const pocket = extra === 'Pocket Moon', skyMoonX = pocket ? 26 : moonSide;
      if ((sky === 'Moonlit' || sky === 'Midnight') && perch !== 'Crescent Moon' && !pocket) disk(moonSide, 5, 3.2, 3.2, [250, 244, 210]);
      if (sky === 'Moonlit' && perch !== 'Crescent Moon' && !pocket) disk(moonSide + 1.4, 4.4, 2.6, 2.6, SKY[0]);
      if (sky === 'Blood Moon') { disk(skyMoonX, 6, 4.2, 4.2, (x, y) => (x * 3 + y * 7) % 9 === 0 ? [150, 30, 24] : [210, 60, 40]); disk(skyMoonX - 1, 5, 1.2, 1.2, [240, 110, 70]); }
      if (sky === 'Forest') for (let x = 0; x < N; x++) { const h = 10 + ((x * 7) % 5) + (x % 3 === 0 ? -2 : 0); for (let y = N - h; y < N; y++) dot(x, y, [8, 40, 30]); }
      if (sky === 'City Glow') {
        // a far skyline with a few windows still lit
        let x = 0;
        for (const tw of towers) {
          for (let q = 0; q < tw[0] && x < N; q++, x++) for (let y = tw[1]; y < N; y++) {
            const lit = (q % 2 === 1 && (y - tw[1]) % 2 === 1 && Math.sin(x * 12.9 + y * 78.2 + tw[2] * 40) > 0.35);
            dot(x, y, lit ? (Math.sin(t * 0.3 + x + y) > -0.9 ? [255, 200, 110] : [120, 90, 60]) : [24, 16, 44]);
          }
          x++;
        }
      }
      if (sky === 'Meteor Shower') for (const m of meteors) {
        const u = ((t + m[2]) % m[3]) / 0.6;
        if (u < 1) for (let k = 0; k < 4; k++) { const mx = Math.round(m[0] - u * 8 + k), my = Math.round(m[1] + u * 5 - k * 0.6); if (my >= 0 && my < 20) { const i = (my * N + mx) * 3; if (mx >= 0 && mx < N) { rgb[i] += 200 - k * 45; rgb[i + 1] += 210 - k * 45; rgb[i + 2] += 255 - k * 50; } } }
      }
      if (sky === 'Rain') for (const d of drops) {
        const y = (d[1] + t * d[2]) % 36 - 2, x = Math.floor((d[0] - y * 0.35) % 32 + 32) % 32;
        for (let k = 0; k < 2; k++) { const yy = Math.floor(y) - k; if (yy >= 0 && yy < N) tint((yy * N + x) * 3, [140, 170, 220], 0.55 - k * 0.25); }
      }
      if (company === 'Eyes in the Dark' && !(torch && Math.hypot(torch[0] - lurkX, torch[1] - 23) < 7) && (t * 0.7 + batPh) % 6 > 0.25) { dot(Math.floor(lurkX), 23, [210, 255, 90]); dot(Math.floor(lurkX) + 2, 23, [210, 255, 90]); }
      if (pose !== 'Peeking') drawPerch(t, 28, false);

      const fl = t - flinchAt < 0.5;
      const blink = ((t + blinkOff) % blinkEvery) < 0.16 || fl;
      const lt0 = (t + lookOff) % lookEvery;
      let look = lt0 < 1.2 ? -1 : lt0 > lookEvery / 2 && lt0 < lookEvery / 2 + 1.1 ? 1 : 0;
      if (press) look = press[0] < 13 ? -1 : press[0] > 19 ? 1 : 0;

      // the tail: a slow ringed curl, laid out differently for each pose
      const sway = Math.sin(t * 0.9 + tailPh) * 1.5;
      for (let k = 0; k < 26; k++) { // 26 tail segments
        const u = k / 25;
        let tx, ty;
        if (pose === 'Clinging') { tx = 23 + Math.sin(u * 3.2) * 4 + u * sway; ty = 29 - u * 24; }
        else if (pose === 'Sun Salute') { tx = 20 + u * 10 + Math.sin(u * 3) * 0.6; ty = 30.5 - Math.max(0, u - 0.6) * 30 + (u > 0.6 ? Math.sin(t * 0.9 + tailPh) * (u - 0.6) * 3 : 0); }
        else if (pose === 'Peeking') { tx = 26 + Math.sin(u * 3.4 + tailPh) * 2 + u * sway; ty = 31 - u * 22; }
        else { tx = 24 - u * 16 + Math.sin(t * 0.7 + tailPh) * 0.4 * u; ty = 29 - Math.sin(u * 3.1) * 3 - u * 7; }
        const col = ring ? ((k >> 1) % 2 ? ring : dk) : (k > 21 ? dk : md);
        if (pose !== 'Tail Hug') disk(tx, ty, 1.6, 1.3, col, 1);
      }
      // the body for each pose
      if (pose === 'Clinging' || pose === 'Tail Hug') {
        disk(16, 24, 7.6, 6.6, md, 1);
        disk(16, 25.5, 4.6, 4.4, bl, 1);
      }
      if (pose === 'Clinging') {
        for (const s of [-1, 1]) {
          for (let y = 20; y < 28; y++) dot(16 + s * 6 + (y > 24 ? -s : 0), y, y < 23 ? md : lt, 1);
          dot(16 + s * 5, 28, dk, 1); dot(16 + s * 4, 28, dk, 1);
        }
      } else if (pose === 'Tail Hug') {
        // the tail comes round the front and it holds it like a scarf
        for (let k = 0; k < 24; k++) {
          const u = k / 23, tx = 25 - u * 16, ty = 28 - Math.sin(u * 3.1) * 2.6 - u * 6;
          disk(tx, ty, 1.7, 1.4, ring ? ((k >> 1) % 2 ? ring : dk) : (k > 19 ? dk : k % 6 < 3 ? lt : bl), 1);
        }
        for (const s of [-1, 1]) { for (let k = 0; k < 5; k++) dot(16 + s * (7 - k * 0.7), 20 + k, md, 1); dot(16 + s * 3, 25, dk, 1); dot(16 + s * 4, 25, dk, 1); }
      } else if (pose === 'Sun Salute') {
        // sitting up, arms flung wide, pale belly to the sky
        disk(16, 25, 8, 6.8, md, 1);
        disk(16, 26, 5.4, 5.2, bl, 1);
        for (const s of [-1, 1]) {
          for (let k = 0; k < 7; k++) disk(16 + s * (7.8 + k * 0.95), 21.2 - k * 1.05, 1.5, 1.5, k > 4 ? lt : md, 1);
          dot(16 + s * 15 - (s > 0 ? 0 : 1), 13, dk, 1); dot(16 + s * 14 - (s > 0 ? 0 : 1), 13, dk, 1); dot(16 + s * 15 - (s > 0 ? 0 : 1), 12, dk, 1);
          for (let x = 0; x < 4; x++) dot(16 + s * (5 + x), 31, x === 3 ? dk : md, 1);
        }
      }
      // ears
      for (const s of [-1, 1]) {
        const ex = 16 + s * 6.5, ey = 8 + HY + (mood === 'Startled' ? -1 : 0);
        if (ears === 'Saucers') { disk(16 + s * 8.5, 6 + HY, 3.6, 3.4, dk, 1); disk(16 + s * 8.6, 6.3 + HY, 2.2, 2.2, [70, 50, 50], 1); continue; }
        if (ears === 'Folded' && s > 0) { for (let k = 0; k < 4; k++) dot(Math.round(ex + k), ey - 1 + (k > 1 ? 1 : 0), k === 3 ? dk : md, 1); dot(Math.round(ex + 1), ey, fc, 1); continue; }
        const len = ears === 'Tufted' ? 5 : ears === 'Tiny' ? 2 : 4;
        for (let k = 0; k < len; k++) {
          const w = Math.max(0, 2 - k * 0.5);
          for (let o = -w; o <= w; o++) {
            const inner = Math.abs(o) < w - 0.6 && k < len - 1 && ears !== 'Tufted';
            dot(Math.round(ex + s * k * (ears === 'Swept' ? 1.1 : 0.5) + o), ey - k + (ears === 'Swept' ? Math.floor(k / 2) : 0), ears === 'Tufted' && k >= len - 2 ? fc : inner ? dk : md, 1);
          }
        }
        if (ears === 'Ragged') dot(Math.round(ex + s * 1.5), ey - 2, dk, 1);
      }
      // ruff behind the head on the ruffed coats
      if (coat.indexOf('Ruffed') >= 0) for (let k = 0; k < 9; k++) { const ang = 0.2 + k * 0.34; for (let r = 6; r < 9.6; r += 0.5) dot(Math.round(16 + Math.cos(ang) * r), Math.round(13 + HY + Math.sin(ang) * r * 0.9), coat === 'Red Ruffed' ? bl : lt, 1); }
      // the head
      headMask.fill(0);
      for (let ry = 6; ry <= 21; ry++) { const w = HW[ry - 6]; for (let x = Math.round(16 - w); x < Math.round(16 + w); x++) { dot(x, ry + HY, headAt(x, ry), 1); if (ry + HY < N) headMask[(ry + HY) * N + x] = 1; } }
      // a shadow where the cheeks and muzzle sit on the chest, so the jaw reads against a pale body
      for (let y = 15 + HY; y < Math.min(N, 24 + HY); y++) for (let x = 1; x < N - 1; x++) {
        const i = y * N + x;
        if (!own[i] || headMask[i]) continue;
        if (headMask[i - 1] || headMask[i + 1] || headMask[i - N]) tint(i * 3, dk, 0.62);
      }
      const ny = 20 + HY;
      dot(15, ny, ink, 1); dot(16, ny, ink, 1); dot(15, ny - 1, [70, 60, 70], 1);
      const calling = t - callAt < 0.45;
      if (calling) { dot(14, ny + 1, ink, 1); dot(15, ny + 1, [200, 70, 90], 1); dot(16, ny + 1, [200, 70, 90], 1); dot(17, ny + 1, ink, 1); dot(15, ny + 2, ink, 1); dot(16, ny + 2, ink, 1); }
      else if (mood === 'Smug') { dot(14, ny + 1, ink, 1); dot(17, ny + 1, ink, 1); }
      // the eye surround
      const EY = 13 + HY;
      const ringAt = (ex, col) => { for (let a = 0; a < 32; a++) { const ang = a / 32 * 6.283; dot(Math.floor(ex + Math.cos(ang) * 2.9), Math.floor(EY + Math.sin(ang) * 2.8), col, 1); } };
      if (face === 'Bandit Patches') { for (const ex of [12.5, 19.5]) { disk(ex, EY + 0.3, 2.9, 2.8, patch, 1); dot(Math.round(ex + (ex < 16 ? 1.5 : -2.5)), EY + 3, patch, 1); } }
      else if (face === 'Spectacle Rings') { ringAt(12.5, patch); ringAt(19.5, patch); }

      // eyes: a dozing one keeps them shut until the torch wakes it
      const lid = greyMask ? patch : face === 'Bandit Patches' || face === 'Masked' || darkFace ? dk : md;
      const shut = blink || (mood === 'Dozing' && awake < 0.5);
      for (const [ex, ir] of [[12.5, irisL], [19.5, irisR]]) {
        if (shut) {
          disk(ex, EY, 2.3, 2.3, lid, 1);
          for (let x = Math.floor(ex - 2); x < ex + 2; x++) dot(x, EY + (mood === 'Dozing' && !blink ? 1 : 0), lidLine, 1);
          continue;
        }
        disk(ex, EY, 2.3, 2.3, ink, 1);
        if (shine > 0.02) {
          // eyeshine: the iris goes pale and the pupil shrinks to a slit in the beam
          const k = shine;
          disk(ex, EY, 1.8, 1.8, [ir[0] + (255 - ir[0]) * k, ir[1] + (250 - ir[1]) * k, ir[2] + (190 - ir[2]) * k * 0.7], 1);
          if (k > 0.5) { dot(Math.floor(ex), EY - 1, ink, 1); dot(Math.floor(ex), EY, ink, 1); dot(Math.floor(ex) - 1, EY - 1, [255, 255, 255], 1); continue; }
        } else disk(ex, EY, 1.8, 1.8, ir, 1);
        if (eyes === 'Hypno') { const ph = Math.floor(t * 3) % 2; disk(ex, EY, 1, 1, ph ? [20, 120, 100] : ir, 1); }
        if (eyes === 'Galaxy') { const tw = Math.floor(t * 1.5 + ex) % 3; dot(Math.floor(ex) + (tw === 1 ? 1 : 0), EY + (tw === 2 ? 1 : 0), [200, 210, 255], 1); }
        if (mood !== 'Startled') dot(Math.floor(ex + look * 0.7), EY, eyes === 'Ink' ? [0, 0, 0] : ink, 1);
        dot(Math.floor(ex) - 1 + Math.max(0, look), EY - 1, [255, 255, 255], 1);
        if (mood === 'Starry-Eyed') { dot(Math.floor(ex) + 1, EY + 1, [255, 255, 220], 1); if (Math.sin(t * 2 + ex) > 0.3) dot(Math.floor(ex) - 1, EY - 1, [255, 255, 160], 1); }
        if ((mood === 'Drowsy' || mood === 'Smug') && shine < 0.3) { for (let x = Math.floor(ex - 2); x < ex + 2; x++) { dot(x, EY - 2, lid, 1); dot(x, EY - 1, x === Math.floor(ex - 2) || x >= ex + 1 ? lid : lidLine, 1); } }
      }
      // a dozing lemur breathes out a little z now and then
      if (mood === 'Dozing' && awake < 0.5) {
        const zt = (t * 0.5 + tailPh) % 3;
        if (zt < 2) { const zx = 24 + Math.round(zt), zy = 7 + HY - Math.round(zt * 2); for (const [a, b] of [[0, 0], [1, 0], [2, 0], [1, 1], [0, 2], [1, 2], [2, 2]]) dot(zx + a, zy + b, [220, 225, 255]); }
      }

      if (extra === 'Reading Glasses') {
        for (const gx of [10, 17]) { for (let k = 0; k < 5; k++) dot(gx + k, 16 + HY, [200, 60, 60], 1); dot(gx, 15 + HY, [200, 60, 60], 1); dot(gx + 4, 15 + HY, [200, 60, 60], 1); }
        dot(15, 16 + HY, [200, 60, 60], 1); dot(16, 16 + HY, [200, 60, 60], 1);
      } else if (extra === 'Monocle') { // a gold ring over one eye
        for (let a = 0; a < 30; a++) { const ang = a / 30 * 6.283; dot(Math.floor(19.5 + Math.cos(ang) * 3.2), Math.floor(EY + Math.sin(ang) * 3.2), [255, 210, 80], 1); }
        for (let y = 16; y < 22; y++) dot(23, y + HY, [255, 210, 80], 1);
      } else if (extra === 'Scarf') { // knitted, two colours
        // a knitted scarf in two strong colours, its end hanging down the chest
        for (let x = 9; x < 24; x++) { dot(x, 20 + HY, (x % 4 < 2) ? [216, 44, 64] : [44, 70, 170], 1); dot(x, 21 + HY, (x % 4 < 2) ? [168, 30, 50] : [30, 48, 120], 1); }
        for (let y = 22; y < 26; y++) { dot(11, y + HY, y % 2 ? [216, 44, 64] : [44, 70, 170], 1); dot(12, y + HY, y % 2 ? [168, 30, 50] : [30, 48, 120], 1); }
        dot(11, 26 + HY, [240, 200, 120], 1); dot(12, 26 + HY, [240, 200, 120], 1);
      } else if (extra === 'Nightcap') {
        for (let y = 0; y < 5; y++) for (let x = 10 + y; x < 23 - y * 0.4; x++) dot(Math.floor(x), 6 - y + HY, y % 2 ? [70, 90, 200] : [240, 240, 255], 1);
        for (let x = 9; x < 24; x++) dot(x, 7 + HY, [250, 250, 255], 1);
        for (let x = 8; x < 15; x++) dot(x, 2 + HY + Math.round((15 - x) * 0.15), [70, 90, 200], 1);
        disk(7.5, 3.5 + HY, 1.5, 1.5, [255, 255, 255], 1);
      } else if (extra === 'Firefly') {
        const fx = 6 + Math.cos(t * 0.8 + flyPh) * 3.5, fy = 9 + Math.sin(t * 1.1 + flyPh) * 3;
        const on = Math.sin(t * 2.2 + flyPh) > -0.4;
        dot(Math.round(fx), Math.round(fy), on ? [230, 255, 120] : [60, 70, 40]);
      } else if (extra === 'Hibiscus') {
        for (const [a, b] of [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, -1], [1, 1]]) dot(9 + a, 9 + HY + b, [255, 70, 110], 1);
        dot(9, 9 + HY, [255, 220, 90], 1);
      } else if (extra === 'Leaf Hat') { // a big leaf held up like an umbrella
        for (let x = 7; x < 26; x++) { const h = Math.round(Math.sqrt(Math.max(0, 1 - ((x + 0.5 - 16.5) / 9.5) ** 2)) * 2.4); for (let y = 0; y <= h; y++) dot(x, 6 + HY - y, y === 0 ? [40, 110, 50] : x === 16 ? [150, 210, 110] : [80, 170, 70], 1); }
        dot(16, 7 + HY, [60, 90, 40], 1);
      } else if (extra === 'Gold Earring') {
        for (const [a, b] of [[0, 0], [1, 1], [0, 2], [-1, 1]]) dot(23 + a, 10 + HY + b, [255, 205, 70], 1);
      } else if (extra === 'Pocket Moon') {
        // its own moon, taken down from the sky and kept on a string like a balloon: big, gold and haloed, its light warming the fur;
        // tapped, it bobs up on the string and settles
        const up = t - moonAt < 1.2 ? Math.round(Math.sin(Math.min(1, (t - moonAt) / 1.2) * Math.PI) * 2) : 0;
        const mx = moonAt0[0], my = moonAt0[1] - up - (Math.sin(t * 0.9 + tailPh) > 0.6 ? 1 : 0);
        const paw = pose === 'Sun Salute' ? [1, 12] : pose === 'Tail Hug' ? [13, 24] : pose === 'Peeking' ? [10, 25] : [11, 27];
        const n = Math.ceil(Math.hypot(paw[0] - mx, paw[1] - my - 4.4));
        for (let k = 0; k <= n; k++) { const x = Math.round(mx + (paw[0] - mx) * k / n), y = Math.round(my + 4.4 + (paw[1] - my - 4.4) * k / n); if (x >= 0 && y >= 0 && x < N && y < N && !own[y * N + x]) dot(x, y, [250, 240, 214]); }
        disk(mx, my, 4.5, 4.5, (x, y) => { const u = x + 0.5 - mx, v = y + 0.5 - my; return (Math.hypot(u - 1.1, v - 0.7) < 1.1 || Math.hypot(u + 1.4, v + 1.6) < 0.8 || Math.hypot(u + 0.7, v - 2.2) < 0.7) ? [214, 136, 26] : u + v < -2.6 ? [255, 252, 222] : u + v > 3 ? [236, 146, 28] : [255, 204, 52]; }, 2);
        // a slow ring of sparks round it, each twinkling in turn
        for (let k = 0; k < 7; k++) { const a = t * 0.35 + k * 0.8976, on = Math.sin(t * 2.3 + k * 1.9) > 0.1; if (on) dot(Math.round(mx + Math.cos(a) * 6.4), Math.round(my + Math.sin(a) * 6.1), k % 2 ? [255, 255, 255] : [255, 236, 160]); }
        moonNow[0] = mx; moonNow[1] = my;
        // a four-point glint winks off its edge
        const tw = (t * 0.7 + tailPh) % 2.4;
        if (tw < 0.6) { const gx = Math.round(mx + 3), gy = Math.round(my - 3), r = tw < 0.3 ? 1 : 2; dot(gx, gy, [255, 255, 255]); for (let k = 1; k <= r; k++) for (const [a, b] of [[k, 0], [-k, 0], [0, k], [0, -k]]) dot(gx + a, gy + b, [255, 250, 210]); }
      } else if (extra === 'Bow Tie') {
        for (const [a, b] of [[-3, -1], [-3, 0], [-3, 1], [-2, 0], [-2, -1], [-2, 1], [-1, 0], [0, 0], [1, 0], [1, -1], [1, 1], [2, 0], [2, -1], [2, 1]]) dot(15 + a + 1, 22 + HY + b, a === 0 || a === -1 ? [150, 20, 40] : [220, 40, 60], 1);
      }

      // company
      if (company === 'Baby' || company === 'Twins') { if (pose === 'Peeking') baby(16, 3, blink); else baby(16, 25, blink); }
      if (company === 'Twins') { if (pose === 'Sun Salute' || pose === 'Peeking') baby(pose === 'Peeking' ? 25 : 16, pose === 'Peeking' ? 21 : 3, blink); else baby(8.5, 19, blink); }
      if (company === 'Moth') {
        const orbit = extra === 'Pocket Moon', mx = orbit ? moonNow[0] + 0.5 + Math.cos(t * 0.9 + mothPh) * 5.4 : 6 + Math.cos(t * 0.7 + mothPh) * 3, my = orbit ? moonNow[1] + Math.sin(t * 0.9 + mothPh) * 4.8 : 7 + Math.sin(t * 1.3 + mothPh) * 2, open = Math.floor(t * 8) % 2;
        dot(Math.round(mx), Math.round(my), [200, 190, 170]);
        dot(Math.round(mx) - 1, Math.round(my) - open, [235, 228, 210]); dot(Math.round(mx) + 1, Math.round(my) - open, [235, 228, 210]);
      }
      if (company === 'Bat') {
        // hanging from the top edge; now and then it shakes its wings out
        const flap = (t + batPh) % 5.5 < 0.5;
        const bx = moonSide > 16 && extra !== 'Pocket Moon' ? 5 : 26, bc = [44, 34, 54];
        dot(bx, 0, ink, 1); dot(bx, 1, bc, 1); dot(bx, 2, bc, 1); dot(bx, 3, [70, 56, 80], 1); dot(bx, 4, bc, 1); dot(bx, 5, bc, 1);
        if (flap) { for (const d of [-3, -2, -1, 1, 2, 3]) dot(bx + d, 2 + (Math.abs(d) === 3 ? 1 : 0), bc, 1); }
        else { dot(bx - 1, 2, bc, 1); dot(bx + 1, 2, bc, 1); dot(bx - 1, 3, bc, 1); dot(bx + 1, 3, bc, 1); }
        dot(bx, 4, [255, 120, 120], 1);
      }
      if (company === 'Moth Swarm') {
        // a little cloud of moths circling the brightest thing in the sky
        const cx = extra === 'Pocket Moon' ? moonNow[0] : moonSide, cy = extra === 'Pocket Moon' ? moonNow[1] : 5;
        for (const [ph, r, sp] of swarm) { const a = t * sp + ph, mx = Math.round(cx + Math.cos(a) * r * 1.6), my = Math.round(cy + Math.sin(a * 1.3) * r), open = Math.floor(t * 9 + ph * 3) % 2; dot(mx, my, [214, 200, 172]); dot(mx - 1, my - open, [240, 232, 214]); dot(mx + 1, my - open, [240, 232, 214]); }
      }
      if (company === 'Tree Frog') {
        // a bright green tree frog on the perch, red-eyed, its throat puffing now and then
        const fy = pose === 'Peeking' ? 25 : 27, puff = (t + geckoPh) % 3.2 < 0.5;
        for (let k = 0; k < 4; k++) dot(frogX + k, fy, [70, 200, 80], 1);
        for (let k = 0; k < 3; k++) dot(frogX + k, fy - 1, [100, 230, 100], 1);
        dot(frogX, fy - 2, [255, 60, 40], 1); dot(frogX + 2, fy - 2, [255, 60, 40], 1);
        dot(frogX + 1, fy + 1, puff ? [250, 240, 170] : [60, 170, 70], 1);
        dot(frogX - 1, fy + 1, [255, 140, 40], 1); dot(frogX + 4, fy + 1, [255, 140, 40], 1);
      }
      if (company === 'Gecko' && pose !== 'Peeking') {
        const gy = perch === 'Wire' ? 27 : 27, lick = (t + geckoPh) % 4 < 0.25;
        for (let k = 0; k < 6; k++) dot(2 + k, gy - (k === 5 ? 1 : 0), k === 0 ? [60, 170, 90] : [90, 200, 100], 1);
        dot(7, gy - 2, [255, 230, 80], 1); dot(3, gy + 1, [60, 160, 80], 1); dot(6, gy + 1, [60, 160, 80], 1);
        if (lick) dot(8, gy - 1, [255, 120, 150], 1);
      }

      // an aye-aye taps the wood with its long middle finger, listening for grubs
      if (coat === 'Aye-Aye' && pose !== 'Peeking') {
        const tap = Math.floor(t * 3 + tailPh) % 4 === 0 ? 1 : 0;
        for (let k = 0; k < 4; k++) dot(9 - k, 24 + k + (k === 3 ? tap : 0), [110, 90, 70], 1);
      }

      // peeking: it is mostly behind a ledge, hands over the edge
      if (pose === 'Peeking') {
        drawPerch(t, 26, true);
        for (const hx0 of [9, 21]) { for (let k = 0; k < 3; k++) dot(hx0 + k, 25, md, 1); dot(hx0, 26, dk, 1); dot(hx0 + 2, 26, dk, 1); dot(hx0 + 1, 26, md, 1); }
      }

      // light: a rim on the edges that face it
      if (RIM) {
        const [[ddx, ddy], rc, rk] = RIM;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // every dot
          const i = y * N + x;
          if (!own[i]) continue;
          const side = x + ddx, up = y + ddy;
          const open = (ddx && (side < 0 || side >= N || !own[y * N + side])) || (ddy < 0 && (up < 0 || !own[up * N + x]));
          if (light === 'Screen Glow') { if (y > EY) tint(i * 3, rc, (y - EY) / 20 * rk); }
          else if (open) tint(i * 3, rc, rk);
          if (light === 'Neon Signs') { const ox2 = x + 1; if (ox2 >= N || !own[y * N + ox2]) tint(i * 3, [90, 230, 255], 0.5); }
        }
      }

      if (extra === 'Pocket Moon' && legend === 'None') {
        const g = 0.62 + (torch && Math.hypot(torch[0] - moonNow[0], torch[1] - moonNow[1]) < 8 ? 0.3 : 0) + Math.sin(t * 1.4) * 0.08;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // every dot
          const i = y * N + x, d = Math.hypot(x + 0.5 - moonNow[0], y + 0.5 - moonNow[1]);
          if (own[i] === 2) continue;
          if (!own[i]) { if (d < 14) tint(i * 3, [255, 210, 100], Math.min(0.9, g * 1.3 * Math.pow(1 - d / 14, 1.1))); }
          else if (d < 24) tint(i * 3, [255, 196, 84], g * 0.55 * (1 - d / 24));
        }
      }
      // a dark outline wherever the lemur meets the sky
      mark.set(own);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // every dot
        if (mark[y * N + x]) continue;
        if ((x > 0 && mark[y * N + x - 1]) || (x < N - 1 && mark[y * N + x + 1]) || (y > 0 && mark[(y - 1) * N + x]) || (y < N - 1 && mark[(y + 1) * N + x])) dot(x, y, ink);
      }
      if (legend !== 'None') legendPaint(t);
      if (torch && legend === 'None') {
        // a warm pool of torchlight on the panel, brightest at its middle
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { // every dot
          const d2 = (x + 0.5 - torch[0]) ** 2 + (y + 0.5 - torch[1]) ** 2;
          if (d2 > 42) continue;
          const f = Math.sqrt(1 - d2 / 42), g = 1 + 0.85 * f, i = (y * N + x) * 3;
          rgb[i] = Math.min(255, rgb[i] * g + 54 * f); rgb[i + 1] = Math.min(255, rgb[i + 1] * g + 44 * f); rgb[i + 2] = Math.min(255, rgb[i + 2] * g + 16 * f);
        }
      }
      // pressing the glass: the crystal goes dark under the finger with a rainbow ring around it
      if (press && pressK > 0.02) {
        const R = 2 + pressK * 4.5;
        for (let y = Math.max(0, Math.floor(press[1] - R)); y < Math.min(N, press[1] + R + 1); y++) for (let x = Math.max(0, Math.floor(press[0] - R)); x < Math.min(N, press[0] + R + 1); x++) {
          const d = Math.hypot(x + 0.5 - press[0], y + 0.5 - press[1]) / R;
          if (d >= 1) continue;
          const i = (y * N + x) * 3, dim = 0.25 + 0.75 * d * d, k = (1 - d) * pressK;
          rgb[i] = rgb[i] * dim + Math.max(0, Math.sin(d * 9)) * 120 * k;
          rgb[i + 1] = rgb[i + 1] * dim + Math.max(0, Math.sin(d * 9 + 2.1)) * 120 * k;
          rgb[i + 2] = rgb[i + 2] * dim + Math.max(0, Math.sin(d * 9 + 4.2)) * 140 * k;
        }
      }
      if (legend === 'Dead Pixel') {
        // the screen's own faults stay off a dead-pixel lemur: they show only on the dead panel round it
        glowBuf.set(rgb); screenFault(t);
        for (let i = 0; i < N * N; i++) if (own[i]) { rgb[i * 3] = glowBuf[i * 3]; rgb[i * 3 + 1] = glowBuf[i * 3 + 1]; rgb[i * 3 + 2] = glowBuf[i * 3 + 2]; }
      } else screenFault(t);
    }

    // ---------- the screen itself: each fault is plain to see at a glance ----------
    let burn = null;
    function screenFault(t) {
      if (screen === 'Backlight Bleed') {
        // light clouding in from the edges, warm white, breathing a little
        const g = 1 + Math.sin(t * 0.6) * 0.08;
        for (let i = 0; i < N * N; i++) { const b = bleed[i] * g; if (b > 0) { rgb[i * 3] += 170 * b; rgb[i * 3 + 1] += 176 * b; rgb[i * 3 + 2] += 190 * b; } }
      } else if (screen === 'Burn-In') {
        // a ghost of another lemur, burned into the panel by years of the same picture
        if (!burn) { burn = new Uint8Array(N * N); const sx = moonSide > 16 ? -10 : 10; for (let i = 0; i < N * N; i++) if (own[i] === 1) { const x = (i % N) + sx, y = ((i / N) | 0) - 2; if (x >= 0 && x < N && y >= 0) burn[y * N + x] = 1; } }
        for (let i = 0; i < N * N; i++) if (burn[i]) { const k = own[i] ? 0.14 : 0.48; tint(i * 3, [176, 196, 168], k); }
      } else if (screen === 'Dead Column') {
        // one column stuck fully on in one colour, top to bottom
        const col = [[255, 40, 60], [60, 255, 90], [70, 90, 255]][deadCh];
        for (let y = 0; y < N; y++) dot(deadX, y, col);
      } else if (screen === 'Cracked') {
        // a knock left a star of cracks: dead black dots along each arm with a glint beside them, and the
        // liquid crystal bleeding out of the impact in flickering colours
        for (const [i] of crackDots) { const x = i % N, y = (i / N) | 0; dot(x, y, [6, 6, 10]); if (x + 1 < N && !crackDots.has(i + 1)) tint((i + 1) * 3, [230, 240, 255], 0.8); }
        const ix = Math.floor(imp[0]), iy = Math.floor(imp[1]);
        for (let y = iy - 2; y <= iy + 2; y++) for (let x = ix - 2; x <= ix + 2; x++) {
          if (x < 0 || y < 0 || x >= N || y >= N) continue;
          const d = Math.hypot(x - ix, y - iy);
          if (d < 1.2) dot(x, y, [0, 0, 0]);
          else if (d < 2.6) { const h = (x * 7 + y * 13 + Math.floor(t * 3)) % 4; dot(x, y, [[255, 0, 160], [0, 230, 255], [20, 10, 40], [255, 255, 255]][h]); }
        }
        for (let y = iy + 3; y < N; y++) if (!crackDots.has(y * N + ix)) tint((y * N + ix) * 3, [255, 60, 220], 0.5 * (1 - (y - iy) / 40));
      } else if (screen === 'Water Damage') {
        // a stain of water under the glass: a dark pool with an oily rainbow round its edge, and a drip run below it
        const [wx, wy, wr, wph] = stain;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const dx = x + 0.5 - wx, dy = y + 0.5 - wy, a = Math.atan2(dy, dx), d = Math.hypot(dx, dy), r = wr * (1 + 0.22 * Math.sin(a * 3 + wph) + 0.1 * Math.sin(a * 5 - wph));
          const i = (y * N + x) * 3;
          if (d < r - 1) { rgb[i] = rgb[i] * 0.42 + 24; rgb[i + 1] = rgb[i + 1] * 0.38 + 12; rgb[i + 2] = rgb[i + 2] * 0.42 + 40; }
          else if (d < r + 0.7) { const h = a * 2 + t * 0.8 + d; tint(i, [140 + 115 * Math.sin(h), 140 + 115 * Math.sin(h + 2.1), 140 + 115 * Math.sin(h + 4.2)], 0.75); }
        }
        for (let k = 0; k < 6; k++) { const y = Math.floor(wy + wr + k), x = Math.floor(wx + Math.sin(k * 0.8) * 0.6); if (y < N) tint((y * N + x) * 3, [30, 16, 50], 0.6 - k * 0.08); }
      } else if (screen === 'Stuck Pixels') {
        for (const [x, y, col] of stuckDots) dot(x, y, col);
      }
    }

    // ---------- the legendaries: the same lemur (its pose, its company), remade by the screen itself ----------
    const glowBuf = new Float32Array(N * N * 3);
    let dpRot = 0, lastRow = -1, rowAt = -9;
    const rainbow = h => [128 + 127 * Math.sin(h), 128 + 127 * Math.sin(h + 2.1), 128 + 127 * Math.sin(h + 4.2)];
    function legendPaint(t) {
      const since = t - legAt, EY = 13 + HY;
      glowBuf.set(rgb);   // the lemur as the scene drew it, to remake
      if (legend === 'Dead Pixel') {
        // the whole lemur is stuck: its body jammed fully on in one pure channel, pale fur all three (white), dark marks off,
        // its eyes in another channel, its edge always lit so the silhouette reads, on a dead black panel with a few stuck dots;
        // the pointer tears the rows it passes, and a tap runs the pixel-fixer flash (red, green, blue, white) and it sticks again in a new colour
        const fix = since < 0.8 ? Math.floor(since / 0.2) : -1;
        if (fix >= 0) { const col = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255]][fix]; for (let i = 0; i < N * N; i++) dot(i % N, (i / N) | 0, col); return; }
        const ty = torch ? torch[1] : -9, mainCh = (dpCh + dpRot) % 3, eyeCh = (mainCh + 1) % 3;
        for (let y = 0; y < N; y++) {
          const near = Math.abs(y + 0.5 - ty), tear = torch && near < 3 ? Math.round(Math.sin(t * 13 + y * 1.7) * 2.5 * (1 - near / 3)) : 0;
          for (let x = 0; x < N; x++) {
            const sx = x - tear, i = (y * N + x) * 3;
            if (sx < 0 || sx >= N) { rgb[i] = rgb[i + 1] = rgb[i + 2] = 0; continue; }
            const j = y * N + sx, r = glowBuf[j * 3], g = glowBuf[j * 3 + 1], b = glowBuf[j * 3 + 2], lum = 0.3 * r + 0.59 * g + 0.11 * b;
            if (!own[j]) {
              // the dead panel: black, a faint blue scan band drifting down, a few stuck dots of its own
              const band = Math.abs(((y - t * 4) % 40 + 40) % 40 - 20) < 1.5 ? 30 : 0, st = ((Math.imul(x + 1, 0x9e3779b1) ^ Math.imul(y + 7, 0x85ebca6b)) >>> 26) === 0, q = (x + y) % 3;
              rgb[i] = st && q === 0 ? 255 : 2; rgb[i + 1] = st && q === 1 ? 255 : 2; rgb[i + 2] = st && q === 2 ? 255 : 6 + band;
              continue;
            }
            const sxj = j % N, syj = (j / N) | 0;
            const edge = sxj === 0 || sxj === N - 1 || syj === 0 || syj === N - 1 || !own[j - 1] || !own[j + 1] || !own[j - N] || !own[j + N];
            const inEye = Math.hypot(sxj + 0.5 - 12.5, syj + 0.5 - EY) < 1.9 || Math.hypot(sxj + 0.5 - 19.5, syj + 0.5 - EY) < 1.9;
            let ch = mainCh;
            if (edge) ch = mainCh;
            else if (inEye) ch = lum > 245 ? 3 : lum < 44 ? -1 : eyeCh;
            else if (lum > 200) ch = 3;
            else if (lum < 44) ch = -1;
            if (ch === 3) { rgb[i] = rgb[i + 1] = rgb[i + 2] = 255; }
            else if (ch < 0) { rgb[i] = rgb[i + 1] = rgb[i + 2] = 0; }
            else { rgb[i] = ch === 0 ? 255 : 0; rgb[i + 1] = ch === 1 ? 255 : 0; rgb[i + 2] = ch === 2 ? 255 : 0; }
          }
        }
        // a tick each time the tear moves on to a new band of rows
        if (torch) { const row = Math.floor(ty / 3); if (row !== lastRow && t - rowAt > 0.12) { rowAt = t; c.sound.note(callRoot + 24 + callScale[((row % 5) + 5) % 5], { dur: 0.04, vel: 0.05, wave: 'square', cutoff: 3000 }); } lastRow = row; } else lastRow = -1;
      } else if (legend === 'Inverted') {
        // pressed too hard: the liquid crystal flips, the whole picture shows in negative, ringed with rainbow pressure marks
        // round the press (the pointer, or a slow drift); a tap lets go for a moment, it flashes back to positive and a ring runs out
        const back = since < 0.4, pc = torch || [16 + Math.sin(t * 0.3) * 2, 20 + HY * 0.4];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = (y * N + x) * 3;
          if (!back) { rgb[i] = 255 - rgb[i]; rgb[i + 1] = 255 - rgb[i + 1]; rgb[i + 2] = 255 - rgb[i + 2]; }
          const d = Math.hypot(x + 0.5 - pc[0], y + 0.5 - pc[1]);
          if (d < 11) tint(i, rainbow(d * d * 0.16 - t * 1.2), (1 - d / 11) * 0.5);
          if (since < 1.4) { const d2 = Math.hypot(x + 0.5 - legTap[0], y + 0.5 - legTap[1]), r = since * 22; if (Math.abs(d2 - r) < 1.3) tint(i, rainbow(Math.atan2(y - legTap[1], x - legTap[0]) * 2 + r), 0.8 * (1 - since / 1.4)); }
        }
      } else {
        // the panel's own test card: colour bars, a castellated strip, a centring circle, and the lemur in the middle in plain
        // greys with its own eyes; the pointer runs a scope line across it, and a tap plays the line-up tone and rolls the picture once
        const BARS = [[236, 236, 236], [236, 236, 20], [20, 236, 236], [20, 236, 20], [236, 20, 236], [236, 20, 20], [20, 20, 236]];
        const roll = since < 0.9 ? Math.round((1 - since / 0.9) ** 2 * 32) : 0, scope = torch ? Math.floor(torch[1]) : -1;
        for (let y = 0; y < N; y++) {
          const sy = (y + roll) % N;
          for (let x = 0; x < N; x++) {
            const i = (y * N + x) * 3, j = sy * N + x, bar = Math.min(6, Math.floor(x * 7 / N));
            let col;
            const eye = Math.hypot(x + 0.5 - 12.5, sy + 0.5 - EY) < 2.4 || Math.hypot(x + 0.5 - 19.5, sy + 0.5 - EY) < 2.4;
            if (own[j]) { if (eye) col = [glowBuf[j * 3], glowBuf[j * 3 + 1], glowBuf[j * 3 + 2]]; else { const v = 34 + (0.3 * glowBuf[j * 3] + 0.59 * glowBuf[j * 3 + 1] + 0.11 * glowBuf[j * 3 + 2]) * 0.84; col = [v, v, v]; } }
            else if ((x > 0 && own[j - 1]) || (x < N - 1 && own[j + 1]) || (sy > 0 && own[j - N]) || (sy < N - 1 && own[j + N])) col = [8, 8, 12];
            else {
              col = sy < 22 ? BARS[bar] : sy < 25 ? (bar % 2 ? [12, 12, 16] : BARS[6 - bar].map(v => v * 0.8)) : ((x >> 2) + (sy >> 1)) % 2 ? [236, 236, 236] : [12, 12, 16];
              if (Math.abs(Math.hypot(x + 0.5 - 16, sy + 0.5 - 15) - 13.2) < 0.55) col = [255, 255, 255];
            }
            if (sy === scope) col = col.map(v => Math.min(255, v * 0.5 + 140));
            rgb[i] = col[0]; rgb[i + 1] = col[1]; rgb[i + 2] = col[2];
          }
        }
      }
    }

    // the logical image goes in a 32 x 32 canvas
    const small = document.createElement('canvas'); // the 32 x 32 logical picture
    small.width = small.height = N; // one texel per dot
    const sg = small.getContext('2d');
    const id = sg.createImageData(N, N);
    // the sub-pixel masks, drawn once at full size: one with every sub-pixel in its own colour (where the screen itself shows:
    // the sky and panel round the lemur, its glowing eyes, the torch beam, the pocket moon), and one grey-balanced so the
    // lemur's own colours read clean, white fur as white
    const big = S >= 192;
    const pit = S / N;
    const mkMask = grey => {
      const m = document.createElement('canvas'); // a sub-pixel pattern
      m.width = m.height = S;
      const mg = m.getContext('2d'); // drawn once
      mg.fillStyle = '#000'; mg.fillRect(0, 0, S, S);
      const [R, G, B] = grey ? ['#888888', '#888888', '#888888'] : ['#ff0000', '#00ff00', '#0000ff'];
      if (screen === 'PenTile') {
        // two sub-pixels per dot, red and blue taking turns around a shared green
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { // one dot's sub-pixels
          const a = (i + j) % 2 ? B : R, b = (i + j) % 2 ? R : B, x = i * pit, y = j * pit;
          mg.fillStyle = a; mg.fillRect(Math.round(x + pit * 0.06), Math.round(y + pit * 0.06), Math.round(pit * 0.4), Math.round(pit * 0.4));
          mg.fillStyle = b; mg.fillRect(Math.round(x + pit * 0.54), Math.round(y + pit * 0.54), Math.round(pit * 0.4), Math.round(pit * 0.4));
          mg.fillStyle = G;
          mg.fillRect(Math.round(x + pit * 0.6), Math.round(y + pit * 0.1), Math.round(pit * 0.3), Math.round(pit * 0.3));
          mg.fillRect(Math.round(x + pit * 0.1), Math.round(y + pit * 0.6), Math.round(pit * 0.3), Math.round(pit * 0.3));
        }
      } else {
        const order = [R, G, B];
        for (let k = 0; k < 3; k++) { // each colour's sub-pixels as one path
          mg.fillStyle = order[k]; mg.beginPath();
          for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
            const xa = Math.round((i + k / 3) * pit + pit * 0.04), xb = Math.round((i + (k + 0.86) / 3) * pit);
            const ya = Math.round((j + 0.07) * pit), yb = Math.round((j + 0.93) * pit);
            mg.rect(xa, ya, Math.max(1, xb - xa), yb - ya);
          }
          mg.fill();
        }
      }
      return m;
    };
    const maskRGB = big ? mkMask(false) : null, maskGrey = big ? mkMask(true) : null;
    const comp = document.createElement('canvas'); // this frame's mask: grey, with colour cut in where the screen shows
    comp.width = comp.height = big ? S : 1;
    const cg = comp.getContext('2d');
    const split = new Uint8Array(N * N), lastSplit = new Uint8Array(N * N).fill(2);
    let zone = null;   // where the lemur sits (its first frame, grown by two dots so a swaying tail stays inside)

    function show(t) {
      scene(t);
      const d = id.data;
      for (let i = 0; i < N * N; i++) { // into the image data
        d[i * 4] = rgb[i * 3]; d[i * 4 + 1] = rgb[i * 3 + 1]; d[i * 4 + 2] = rgb[i * 3 + 2]; d[i * 4 + 3] = 255;
      }
      sg.putImageData(id, 0, 0);
      out.setTransform(1, 0, 0, 1, 0, 0); // panel space
      out.globalCompositeOperation = 'source-over'; // back to plain painting
      out.globalAlpha = 1;
      out.imageSmoothingEnabled = false; // hard-edged dots
      out.drawImage(small, 0, 0, S, S);
      if (big) {
        // where the dots split into red, green and blue: everywhere on a dead-pixel lemur; otherwise round the lemur,
        // in its eyes and on the pocket moon (and under the torch, below)
        // (a bleeding backlight glows plain white through the glass, not in stripes)
        const EY = 13 + HY, all = legend === 'Dead Pixel', bleedOn = screen === 'Backlight Bleed';
        if (!zone) { zone = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) if (own[i] === 1) { const x = i % N, y = (i / N) | 0; for (let b = -2; b <= 2; b++) for (let a = -2; a <= 2; a++) if (x + a >= 0 && x + a < N && y + b >= 0 && y + b < N) zone[(y + b) * N + x + a] = 1; } }
        let changed = false;
        for (let i = 0; i < N * N; i++) {
          const x = i % N, y = (i / N) | 0;
          split[i] = all || (!zone[i] && !(bleedOn && bleed[i] > 0.2)) || own[i] === 2 || (legend !== 'Inverted' && (Math.hypot(x + 0.5 - 12.5, y + 0.5 - EY) < 2.4 || Math.hypot(x + 0.5 - 19.5, y + 0.5 - EY) < 2.4)) ? 1 : 0;
          if (split[i] !== lastSplit[i]) changed = true;
        }
        // the frame's mask is only rebuilt when the split dots change (the pocket moon bobs)
        if (changed) {
        lastSplit.set(split);
        cg.drawImage(maskGrey, 0, 0);
        cg.save(); cg.beginPath();
        for (let y = 0; y < N; y++) for (let x = 0; x < N;) { // runs of split dots, row by row
          if (!split[y * N + x]) { x++; continue; }
          let x2 = x; while (x2 < N && split[y * N + x2]) x2++;
          const xa = Math.floor(x * pit), ya = Math.floor(y * pit);
          cg.rect(xa, ya, Math.ceil(x2 * pit) - xa, Math.ceil((y + 1) * pit) - ya); x = x2;
        }
        cg.clip(); cg.drawImage(maskRGB, 0, 0); cg.restore();
        }
        out.globalCompositeOperation = 'multiply'; // the stripes darken the gaps
        out.drawImage(comp, 0, 0);
        if (torch) {
          // in the torch beam every dot splits into red, green and blue
          const x0 = Math.max(0, Math.floor(torch[0] - 5)), y0 = Math.max(0, Math.floor(torch[1] - 5)), x1 = Math.min(N, Math.ceil(torch[0] + 5)), y1 = Math.min(N, Math.ceil(torch[1] + 5));
          if (x1 > x0 && y1 > y0) {
            out.globalCompositeOperation = 'source-over'; out.drawImage(small, x0, y0, x1 - x0, y1 - y0, x0 * pit, y0 * pit, (x1 - x0) * pit, (y1 - y0) * pit);
            out.globalCompositeOperation = 'multiply'; out.drawImage(maskRGB, x0 * pit, y0 * pit, (x1 - x0) * pit, (y1 - y0) * pit, x0 * pit, y0 * pit, (x1 - x0) * pit, (y1 - y0) * pit);
          }
        }
        // light leaking across the stripes keeps the picture bright and readable when small
        out.globalCompositeOperation = 'lighter'; // add back some leaked light
        out.globalAlpha = 0.5;
        out.drawImage(small, 0, 0, S, S);
        out.globalAlpha = 1;
        out.globalCompositeOperation = 'source-over'; // back to plain painting
      }
    }
    show(0);
    return (t, dt) => {
      now = t;
      const step = Math.min(0.1, dt || 0.033);
      const inp = c.input;
      for (const touch of inp.taps()) {
        call(touch.x);
        const pan = (touch.x - 0.5) * 0.6;
        if (extra === 'Pocket Moon' && legend === 'None' && t - moonAt > 1.2) {
          moonAt = t;
          c.sound.note(callRoot + 12 + callScale[4], { at: 0.1, dur: 0.9, vel: 0.08, wave: 'sine', pan });
          c.sound.note(callRoot + 24 + callScale[2], { at: 0.3, dur: 1.1, vel: 0.06, wave: 'sine', pan });
        }
        if (legend === 'None' || t - legAt < 0.8) continue;
        legAt = t; legTap = [touch.x * N, touch.y * N];
        if (legend === 'Dead Pixel') {
          // the pixel-fixer: four bright square beeps as the panel flashes red, green, blue and white, then it sticks in new colours
          [0, 4, 7, 12].forEach((d, k) => c.sound.note(callRoot + 12 + d, { at: k * 0.2, dur: 0.14, vel: 0.08, wave: 'square', cutoff: 3600, pan }));
          dpRot = (dpRot + 1) % 3;
        } else if (legend === 'Test Card') {
          // the line-up tone, and a soft rush as the picture rolls
          c.sound.note(83, { dur: 0.8, vel: 0.07, wave: 'sine' });
          c.sound.hit('noise', 0.12, { cutoff: 1800, dur: 0.6, pan });
        } else {
          // the glass lets go with a creak, and a glassy chime as it flips back
          c.sound.hit('noise', 0.16, { cutoff: 5200, dur: 0.18, pan });
          c.sound.note(callRoot + 12 + callScale[4], { at: 0.12, dur: 0.9, vel: 0.07, wave: 'sine', pan });
          c.sound.note(callRoot + 24 + callScale[1], { at: 0.36, dur: 1.2, vel: 0.05, wave: 'sine', pan: -pan });
        }
      }
      if (inp.inside && !wasIn && legend !== 'None') {
        // stepping up to a legendary: the screen notices you
        if (legend === 'Dead Pixel') c.sound.note(callRoot + 24, { dur: 0.06, vel: 0.06, wave: 'square', cutoff: 3000 });
        else if (legend === 'Test Card') c.sound.note(callRoot - 24, { dur: 0.6, vel: 0.05, wave: 'sine' });
        else c.sound.hit('noise', 0.08, { cutoff: 4000, dur: 0.3 });
      }
      wasIn = inp.inside;
      if (inp.inside) {
        torch = [inp.x * N, inp.y * N];
        const near = Math.min(Math.hypot(torch[0] - 12.5, torch[1] - 13 - HY), Math.hypot(torch[0] - 19.5, torch[1] - 13 - HY));
        let want = near < 6 ? 1 - near / 6 * 0.6 : 0;
        if (mood === 'Dozing' && awake < 0.5) { if (near < 7) awake = 2.5; want = 0; }
        if (want > 0.3 && shine <= 0.3) c.sound.note(callRoot + 12 + callScale[4], { dur: 0.12, vel: 0.12, wave: 'triangle' });
        shine += (want - shine) * Math.min(1, step * 10);
      } else { torch = null; shine = 0; }
      if (inp.inside && inp.down) {
        if (!press || pressK < 0.05) {
          // a soft low thump as the finger lands on the glass
          c.sound.note(callRoot - 24 + callScale[pressNote], { dur: 0.18, vel: 0.14, wave: 'sine', pan: (inp.x - 0.5) * 0.5 });
          if (Math.hypot(inp.x * N - 16, inp.y * N - 18 - HY * 0.5) < 9) flinchAt = t;
        }
        press = [inp.x * N, inp.y * N];
        pressK = Math.min(1, pressK + step * 2.2);
      } else if (press) { pressK -= step * 1.8; if (pressK <= 0) { press = null; pressK = 0; } }
      // once woken, a dozing lemur nods off again after a while in the dark
      if (awake > 0 && !(torch && shine > 0.2)) awake = Math.max(0, awake - step * 0.5);
      show(t);
    };
    function call(px) {
      callAt = now;
      if (mood === 'Dozing') awake = Math.max(awake, 1.5);
      const n = 3 + Math.floor(smr() * 3);
      for (let k = 0; k < n; k++) {
        const deg = k < n - 1 ? k * 2 : 1 + Math.floor(smr() * 3);
        const m = callRoot + callScale[deg % 5] + 12 * Math.floor(deg / 5);
        c.sound.note(m, { at: k * 0.07, dur: k === n - 1 ? 0.22 : 0.055, vel: 0.26, wave: k % 2 ? 'square' : 'triangle', cutoff: 3200, pan: (px - 0.5) * 0.6 });
      }
    }
  },
});

})(window.Proto);
