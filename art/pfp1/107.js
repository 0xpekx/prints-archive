// Ice Bits: from D:/code/synaesthesia/public/drop03/pieces/107.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Ice Bits: snowmen drawn in an 8 x 8 sprite, the smallest avatar that still reads, shown huge.
Proto.add({
  num: 107,
  name: 'Ice Bits',
  fam: 'Pixel Portraits II',
  seed: 15,
  recipe: 'A snowman drawn in an 8 x 8 sprite, every dot placed by hand, set in a 12 x 12 scene and blown up until each dot is a tile. Its build (classic, tall stack, big head, chubby, leaning, tiny, a rare snow block), pose (standing, melting, buried in a drift, tipping or toppled over), snow, eyes, nose, buttons, hat, neckwear, arms, sky (in bands, lit by a sun or moon on one side), the setting it stands in (open snow, a pine forest, a frozen lake, a village, a moonlit night, a hillside, a campfire, a bird garden, a whiteout) and, rarely, the finish of the tiles vary; snow falls one dot at a time, it blinks, and now and then it waves.',
  interactive: 'Tap to throw a snowball. Hold for a flurry.',
  music: true,
  make(c) {
    const S = c.size, x2 = c.ctx;
    // xorshift32 seeded by xoring the hash words together
    let s32 = 0x9e3779b9;
    for (let i = 0; i < 8; i++) s32 ^= parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> (i % 3);
    s32 = s32 >>> 0 || 1;
    function xr() {
      s32 ^= s32 << 13; s32 >>>= 0;
      s32 ^= s32 >>> 17;
      s32 ^= s32 << 5; s32 >>>= 0;
      return s32 / 4294967296;
    }
    for (let i = 0; i < 8; i++) xr();
    function pickWith(roll, table) {
      let sum = 0;
      for (const row of table) sum += row[1]; // total weight
      let r = roll() * sum;
      for (const row of table) { r -= row[1]; if (r < 0) return row[0]; }
      return table[0][0];
    }
    function pickW(table) {
      const total = table.reduce((a, r) => a + r[1], 0);
      let r = xr() * total;
      for (const row of table) { r -= row[1]; if (r < 0) return row[0]; }
      return table[0][0];
    }

    let snow = pickW([['Fresh', 36], ['Packed Blue', 22], ['Rosy', 14], ['Slushy', 14], ['Glacier', 10], ['Golden', 4]]);
    let eyes = pickW([['Coal', 40], ['Sparkle', 20], ['Sleepy', 16], ['Shades', 12], ['Hearts', 6], ['Monocle', 6]]);
    let nose = pickW([['Carrot', 50], ['Long Carrot', 12], ['Button', 18], ['Pine Cone', 12], ['Radish', 8]]);
    let hat = pickW([['None', 22], ['Bucket', 16], ['Beanie', 18], ['Top Hat', 14], ['Earmuffs', 10], ['Propeller', 10], ['Crown', 10]]);
    let neck = pickW([['None', 34], ['Red Scarf', 26], ['Striped Scarf', 18], ['Bow Tie', 14], ['Gold Medal', 8]]);
    let arms = pickW([['Twigs', 44], ['Mittens', 22], ['Broom', 14], ['Snowball', 12], ['Tiny Flag', 8]]);
    let sky = pickW([['Clear Day', 30], ['Aurora Night', 22], ['Dusk', 20], ['Blizzard', 16], ['Starry', 12]]);
    let ground = pickW([['Snow Field', 44], ['Snow Bank', 30], ['Frozen Pond', 26]]);

    // everything added later comes from a Park-Miller stream on the hash's tail, so the rolls above keep their values
    let lm = parseInt(c.hash.slice(50, 58), 16) % 2147483646 + 1;
    const ice = () => { lm = lm * 48271 % 2147483647; return (lm - 1) / 2147483646; };
    for (let i = 0; i < 1; i++) ice();
    // a second chance at a newer value for each of the old traits: always two draws, so the stream never shifts
    const widen = (cur, p, table) => { const a = ice(), b = pickWith(ice, table); return a < p ? b : cur; };
    const build = pickWith(ice, [['Classic', 38], ['Tall Stack', 15], ['Big Head', 14], ['Chubby', 12], ['Leaning', 9], ['Tiny', 9], ['Snow Block', 3]]);
    const buttons = pickWith(ice, [['Coal', 38], ['Pebbles', 15], ['Red Buttons', 14], ['None', 11], ['Gumdrops', 11], ['Gold Studs', 7], ['Glowing', 4]]);
    const visitor = pickWith(ice, [['None', 54], ['Red Bird', 13], ['Blue Bird', 9], ['Fox Kit', 8], ['Snow Hare', 8], ['Mouse', 6], ['Two Birds', 2]]);
    // the finish is a rare thing now: most tiles are flat
    const finish = pickWith(ice, [['Flat', 94], ['Editor Grid', 2], ['Mosaic', 2], ['LED Matrix', 2]]);
    snow = widen(snow, 0.2, [['Lavender', 46], ['Mint', 44], ['Sherbet', 10]]);
    eyes = widen(eyes, 0.22, [['Wink', 42], ['Odd Buttons', 34], ['Glow', 24]]);
    nose = widen(nose, 0.16, [['Icicle', 55], ['Twig', 45]]);
    hat = widen(hat, 0.3, [['Bobble', 30], ['Flower Crown', 22], ['Bird Nest', 20], ['Traffic Cone', 18], ['Halo', 10]]);
    neck = widen(neck, 0.16, [['Necktie', 55], ['Bell', 45]]);
    arms = widen(arms, 0.22, [['Shovel', 36], ['Cocoa', 34], ['Lantern', 30]]);
    sky = widen(sky, 0.26, [['Sunrise', 34], ['Overcast', 30], ['Snowy Night', 28], ['Eclipse', 8]]);
    ground = widen(ground, 0.18, [['Ice Rink', 52], ['Thin Snow', 48]]);
    // ---------- legendaries: a middle-square Weyl stream keyed by an Adler fold of the hash, apart from every roll above ----------
    let ad1 = 1, ad2 = 0;
    for (let i = 2; i < c.hash.length; i++) { ad1 = (ad1 + c.hash.charCodeAt(i) * 7) % 65521; ad2 = (ad2 + ad1) % 65521; }
    let msx = ((ad2 << 16) | ad1) >>> 0, msw = 0;
    const msr = () => { msw = (msw + 0xb5ad4ece) >>> 0; msx = (Math.imul(msx, msx) + msw) >>> 0; msx = ((msx >>> 16) | (msx << 16)) >>> 0; return msx / 4294967296; };
    for (let i = 0; i < 6; i++) msr();
    const lu = msr(), lp = msr(), lcv = msr();
    const legend = lu < 0.0022 ? (lp < 0.36 ? 'Yeti' : lp < 0.7 ? 'Fire' : 'Diamond') : 'None';
    if (legend === 'None' && lcv < 0.005) nose = 'Golden Carrot';
    const facet = []; for (let i = 0; i < 64; i++) facet.push(Math.floor(msr() * 5));
    if (legend !== 'None') { sky = { Yeti: 'Blizzard', Fire: 'Snowy Night', Diamond: 'Aurora Night' }[legend]; c.trait('Legendary', legend); c.trait('Sky', sky); }
    else {
    c.trait('Snow', snow); c.trait('Build', build); c.trait('Eyes', eyes); c.trait('Nose', nose); c.trait('Buttons', buttons); c.trait('Hat', hat);
    c.trait('Neckwear', neck); c.trait('Arms', arms); c.trait('Sky', sky);
    }
    // the scene around it: one more trait, rolled from its own counter hash so every roll above keeps its value
    let sceneCtr = 0;
    const sceneR = () => { let h = 0x6a09e667 ^ Math.imul(++sceneCtr, 0x9e3779b1); for (let i = 34; i < 66; i += 4) h = Math.imul(h ^ parseInt(c.hash.slice(i, i + 4), 16), 0x01000193); h ^= h >>> 13; return (Math.imul(h, 0x5bd1e995) >>> 0) / 4294967296; };
    const night = sky === 'Aurora Night' || sky === 'Starry' || sky === 'Snowy Night' || sky === 'Eclipse';
    // (the old scene roll stays, so the counter and the ice stream keep their places; the Setting below replaces it)
    let scenery = pickWith(sceneR, [['None', 26], ['Pine Tree', 16], ['Footprints', 12], ['Fence', 10], ['Sled', 10], ['Lamp Post', 9], ['Shooting Star', 8], ['Snow Pal', 6], ['Thaw', 3]]);
    if (scenery === 'Shooting Star' && !night) scenery = 'Pine Tree';
    scenery = widen(scenery, 0.24, [['Snowball Pile', 30], ['Gift Box', 26], ['Birdhouse', 26], ['Campfire', 18]]);
    // the old scene, visitor and ground were a few dots each; they fold into one Setting that repaints the
    // whole background (rolled on, from the same counter hash, so nothing above moves)
    let setting = pickWith(sceneR, [['Open Snow', 18], ['Pine Forest', 14], ['Frozen Lake', 13], ['Village', 13], ['Moon Night', 12], ['Hillside', 8], ['Campfire', 8], ['Bird Garden', 8], ['Whiteout', 6]]);
    if (setting === 'Moon Night' && !night) setting = 'Hillside';
    const lightSide = sceneR() < 0.5 ? -1 : 1;
    // the birds live in the garden now (they still fly off when a snowball lands)
    const bird = legend !== 'None' || setting !== 'Bird Garden' ? 'None' : visitor.indexOf('Bird') >= 0 ? visitor : sceneR() < 0.6 ? 'Red Bird' : 'Blue Bird';
    c.trait('Setting', setting);
    if (finish !== 'Flat') c.trait('Finish', finish);
    // how it stands (or doesn't): its own stream, a xorshift seeded by a djb2 fold of the hash, so no roll above moves
    let pz = 5381;
    for (let i = 2; i < c.hash.length; i++) pz = (Math.imul(pz, 33) ^ c.hash.charCodeAt(i)) >>> 0;
    pz = (pz ^ 0x5bd1e995) >>> 0 || 1;
    const poseR = () => { pz ^= pz << 13; pz >>>= 0; pz ^= pz >>> 17; pz ^= pz << 5; pz >>>= 0; return pz / 4294967296; };
    for (let i = 0; i < 4; i++) poseR();
    const pose = legend !== 'None' ? 'Standing' : pickWith(poseR, [['Standing', 55], ['Melting', 15], ['Buried', 15], ['Toppled', 8], ['Tipping', 7]]);
    if (legend === 'None') c.trait('Pose', pose);

    const N = 12;
    // lit snow, shaded snow, buttons and eyes
    const SN = {
      Fresh: ['#ffffff', '#c8d8ec', '#22242c'], 'Packed Blue': ['#e4f0fc', '#9cb8dc', '#1c2840'], Rosy: ['#fff0f2', '#e8b8c8', '#3a2030'],
      Slushy: ['#e2e0d8', '#aaa89c', '#2c2a24'], Glacier: ['#c8f4ff', '#6ac4e8', '#0c3048'], Golden: ['#fff6c8', '#e8c050', '#4a3008'],
      Lavender: ['#f4eeff', '#c4b4ec', '#2a2044'], Mint: ['#eefff6', '#a6dcc4', '#173a2e'], Sherbet: ['#fff2f6', '#f0b0c8', '#3a2030'],
    }[snow];
    const L0 = SN[0];
    // the rare sherbet snowman is scooped in three flavours, top to bottom
    const SHERBET = [['#ffe4ee', '#f4a8c4'], ['#fff6c4', '#f0cc70'], ['#e4fbe0', '#a8dc9c']];
    const SKY = {
      'Clear Day': ['#5a9ad8', '#8cc0ec', '#fff8c0'], 'Aurora Night': ['#2e4488', '#40e0a0', '#b080ff'], Dusk: ['#e0705a', '#f0a870', '#6a4a8a'],
      Blizzard: ['#7c8ca4', '#a0aec0', '#ffffff'], Starry: ['#283668', '#3c4c88', '#fff8d0'],
      Sunrise: ['#e89aa8', '#ffcf8c', '#fff2b8'], Overcast: ['#8c97a8', '#a7b0be', '#c4ccd6'], 'Snowy Night': ['#1e2848', '#2e3a64', '#ffffff'], Eclipse: ['#120f26', '#2c1e48', '#ffd36a'],
    }[sky];
    const GRD = setting === 'Frozen Lake' ? ['#a8d4f0', '#86bce4'] : setting === 'Moon Night' ? ['#dce8fa', '#a8bce0'] : setting === 'Whiteout' ? ['#ffffff', '#e2eaf2'] : ['#f4f8fc', '#c4d4e8'];
    // every sky in three bands (top, middle, horizon) stepped two rows at a time, lit from one side
    const BANDS = {
      'Clear Day': ['#3f7fc4', '#5a9ad8', '#a6d0f0'], 'Aurora Night': ['#18265a', '#2e4488', '#3e5ca0'], Dusk: ['#5a4282', '#c0607a', '#f0a070'],
      Blizzard: ['#6c7c94', '#8a99ae', '#b4c0ce'], Starry: ['#18224c', '#283668', '#3c4e88'], Sunrise: ['#8a7ac0', '#e89aa8', '#ffcf8c'],
      Overcast: ['#76818f', '#8c97a8', '#b2bac6'], 'Snowy Night': ['#121a34', '#1e2848', '#34406c'], Eclipse: ['#08060f', '#120f26', '#2c1e48'],
    }[sky];
    const STEPS = [];
    const hex3 = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
    const mix = (a, b, k) => { const p = hex3(a), q = hex3(b); return toHex(p.map((v, i) => v + (q[i] - v) * k)); };
    STEPS.push(BANDS[0], mix(BANDS[0], BANDS[1], 0.5), BANDS[1], mix(BANDS[1], BANDS[2], 0.5), BANDS[2]);
    // a hat or scarf close to the colour of the sky right behind it keeps its hue but moves well away in
    // lightness (darker on a light sky, lighter on a dark one), so a red scarf stays red and still reads
    const awayMemo = new Map(), lum = p => p[0] * 0.3 + p[1] * 0.59 + p[2] * 0.11;
    const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const away = (col, y) => {
      const bi = y <= 2 ? 0 : y <= 6 ? 1 : 2, key = col + bi;
      let m = awayMemo.get(key);
      if (m) return m;
      const p = hex3(col), near = [BANDS[bi], BANDS[Math.max(0, bi - 1)], SKY[1]].map(hex3);
      m = col;
      for (const k of [0.45, 0.65, 0.8]) {
        if (Math.min(...near.map(q => dist(hex3(m), q))) >= 110) break;
        m = mix(col, lum(near[0]) > 110 ? '#140c10' : '#ffffff', k);
      }
      awayMemo.set(key, m);
      return m;
    };

    const flakes = [];
    for (let i = 0; i < 7; i++) flakes.push([Math.floor(xr() * N), xr() * N, 0.8 + xr() * 1.2]);
    const starsAt = [];
    for (let i = 0; i < 6; i++) starsAt.push([Math.floor(xr() * N), Math.floor(xr() * 6), xr() * 6.28]);
    const blinkGap = 2.6 + xr() * 2.6, blinkOff = xr() * 3, waveGap = 5 + xr() * 4, waveOff = xr() * 5;
    const auroraPh = xr() * 6.28;
    // the mosaic's tiles each sit a hair lighter or darker
    const tileTint = [];
    for (let i = 0; i < N * N; i++) tileTint.push((ice() - 0.5) * 0.16);

    // snowball fights get their own little mulberry stream from the hash's middle, so the scene never changes
    let mq = parseInt(c.hash.slice(30, 38), 16) >>> 0;
    const mr = () => { mq = (mq + 0x9e3779b9) | 0; let z = mq ^ (mq >>> 16); z = Math.imul(z, 0x7feb352d); z ^= z >>> 15; z = Math.imul(z, 0x846ca68b); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const tones = [[0, 4, 7, 9, 12], [0, 2, 5, 7, 9], [0, 3, 5, 7, 10]][Math.floor(mr() * 3)], base = 67 + Math.floor(mr() * 6);
    let ball = null, hitAt = -9, hitCell = [5, 4], flurry = false, clock = 0;
    let mute = false, legAt = -9, ptrCell = null, lastCell = -1, tingAt = -9, wasIn = false;

    // the builds: each one an 8 x 8 map placed by hand (L lit snow, D shade), with where its face, neck, arms and buttons go
    const BUILDS = {
      Classic: { art: ['..LLLD..', '.LLLLLD.', '.LLLLLD.', '..LLLD..', '.LLLLLD.', 'LLLLLLDD', 'LLLLLLDD', '.LLLLDD.'], top: 0, eye: 1, ex: [2, 4], nose: 2, nx: 3, neck: 3, arm: 4, btn: [[3, 4], [3, 6]] },
      'Tall Stack': { art: ['..LLLD..', '..LLLD..', '.LLLLLD.', '.LLLLLD.', '..LLLD..', '.LLLLLD.', 'LLLLLLDD', '.LLLLDD.'], top: 0, eye: 0, ex: [2, 4], nose: 1, nx: 3, neck: 2, arm: 3, btn: [[3, 3], [3, 6]] },
      'Big Head': { art: ['.LLLLLD.', 'LLLLLLLD', 'LLLLLLLD', '.LLLLLD.', '..LLLD..', '.LLLLLD.', 'LLLLLLDD', '.LLLLDD.'], top: 0, eye: 1, ex: [2, 5], nose: 2, nx: 4, neck: 4, arm: 5, btn: [[3, 6]] },
      Chubby: { art: ['........', '..LLLD..', '..LLLD..', '.LLLLLD.', 'LLLLLLDD', 'LLLLLLDD', 'LLLLLLDD', '.LLLLDD.'], top: 1, eye: 1, ex: [2, 4], nose: 2, nx: 3, neck: 3, arm: 4, btn: [[3, 4], [3, 6]] },
      Leaning: { art: ['...LLLD.', '..LLLLLD', '..LLLLLD', '...LLLD.', '.LLLLLD.', 'LLLLLLDD', 'LLLLLLDD', '.LLLLDD.'], top: 0, eye: 1, ex: [3, 5], nose: 2, nx: 4, neck: 3, arm: 4, btn: [[3, 4], [3, 6]] },
      Tiny: { art: ['........', '........', '..LLLD..', '..LLLD..', '.LLLLLD.', '.LLLLLD.', '.LLLLLD.', '..LLDD..'], top: 2, eye: 2, ex: [2, 4], nose: 3, nx: 3, neck: 4, arm: 5, btn: [[3, 6]] },
      'Snow Block': { art: ['.LLLLLD.', '.LLLLLD.', '.LLLLLD.', '.DDDDDD.', 'LLLLLLLD', 'LLLLLLLD', 'LLLLLLLD', 'DDDDDDDD'], top: 0, eye: 1, ex: [2, 4], nose: 2, nx: 3, neck: 3, arm: 4, btn: [[3, 5]] },
    };
    const B = BUILDS[build];
    const span = r => { const row = B.art[r]; let a = 0, b = 7; while (a < 8 && row[a] === '.') a++; while (b > 0 && row[b] === '.') b--; return [a, b]; };
    const [hL, hR] = span(B.top), [eL, eR] = span(B.eye), [nL, nR] = span(B.neck), [aL0, aR0] = span(B.arm);
    const hc = Math.floor((hL + hR) / 2);
    const BTN = { Coal: [SN[2], SN[2]], Pebbles: ['#7c8088', '#5c6068'], 'Red Buttons': ['#d0283c', '#d0283c'], Gumdrops: ['#ff5a8c', '#54c86a'], 'Gold Studs': ['#f2c02c', '#f2c02c'], Glowing: ['#6af0ff', '#6af0ff'], None: [null, null] }[buttons];

    const cell = new Array(N * N);
    // the snowman is drawn onto its own layer when it isn't standing, then set down in its pose
    const lay = new Array(N * N), hatLay = new Array(N * N), snowLay = new Array(N * N);
    let tgt = cell, tintAway = false;
    // which cells are still sky or background (the lake reflects the rest, the snow only falls on the sky)
    const skyM = new Uint8Array(N * N), bgM = new Uint8Array(N * N);
    const P = (x, y, col) => {
      if (x >= 0 && y >= 0 && x < N && y < N && col && !mute) { tgt[y * N + x] = tintAway ? away(col, y) : col; if (tgt === cell) { skyM[y * N + x] = 0; bgM[y * N + x] = 0; } }
    };
    const SK = (x, y, col) => { if (x >= 0 && y >= 0 && x < N && y < N) { cell[y * N + x] = col; skyM[y * N + x] = 1; bgM[y * N + x] = 1; } };
    const BG = (x, y, col) => { if (x >= 0 && y >= 0 && x < N && y < N) { cell[y * N + x] = col; skyM[y * N + x] = 0; bgM[y * N + x] = 1; } };
    function settle(t) {
      const ox = 2, oy = 2, put = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) { cell[y * N + x] = v; skyM[y * N + x] = 0; bgM[y * N + x] = 0; } };
      const [L, D] = SN;
      if (pose === 'Melting') {
        // sinking two rows into its own meltwater, the bottom slumped wide and the head sagging to one side
        for (let i = 0; i < N * N; i++) if (lay[i]) { const y = (i / N) | 0; put(i % N + (y < oy + B.neck ? 1 : 0), y + 2, lay[i]); }
        const [a, b] = span(Math.min(7, B.arm + 1));
        for (let x = ox + a - 1; x <= ox + b + 1; x++) put(x, 8, x === ox + b + 1 ? D : L);
        for (let x = ox + a - 2; x <= ox + b + 2; x++) put(x, 9, x >= ox + b ? D : x === ox + a - 2 ? D : L);
        for (let x = 0; x < N; x++) put(x, 10, (x + Math.floor(t * 1.5)) % 5 === 0 ? '#e8f6ff' : '#9cc8e8');
        const dp = (t * 0.8) % 1; if (dp < 0.55) put(ox + b + 1, 7 + Math.floor(dp * 4), '#bfe4ff');
      } else if (pose === 'Buried') {
        // up to its shoulders in a drift, the twig tips poking out
        const s = 5 - B.neck;
        for (let i = 0; i < N * N; i++) if (lay[i]) put(i % N, ((i / N) | 0) + s, lay[i]);
        for (let x = 0; x < N; x++) { put(x, 9, GRD[0]); put(x, 8, x % 5 === 3 ? GRD[1] : '#ffffff'); if (x < 2 || x > 9) put(x, 7, x === 0 || x === 11 ? GRD[1] : '#ffffff'); }
      } else if (pose === 'Toppled') {
        // knocked over: the two balls lie apart on the snow, the body on the left and the head on the right with its
        // face still upright, an arm sticking up out of the body, and the hat rolled off beside the head
        const since = t - hitAt, hop = since >= 0 && since < 0.35 ? 1 : 0, wt = (t + waveOff) % waveGap;
        const wv = since >= 0.3 && since < 1.6 ? (Math.floor(since * 5) % 2) : wt < 1.2 ? (Math.floor(wt * 5) % 2) : 0;
        let hb = -1;
        for (let i = 0; i < N * N; i++) if (hatLay[i]) hb = (i / N) | 0;
        for (let i = 0; i < N * N; i++) if (hatLay[i]) put(i % N, ((i / N) | 0) + 9 - hb - hop, hatLay[i]);
        const lump = (art, x0, y0, flav) => art.forEach((row, r) => { for (let q = 0; q < row.length; q++) if (row[q] !== '.') put(x0 + q, y0 + r, snow === 'Sherbet' ? SHERBET[flav(q)][row[q] === 'L' ? 0 : 1] : row[q] === 'L' ? L : D); });
        lump(['.LLL.', 'LLLLD', 'LLLLD', 'LLLLD', '.LDD.'], 0, 5, q => q < 2 ? 2 : 1);
        lump(['.LL.', 'LLLD', 'LLLD', '.DD.'], 6, 6, () => 0);
        // the face, copied off the standing snowman: its eyes to columns 6 and 8, the nose between and to the right
        const e0 = ox + B.ex[0], e1 = ox + B.ex[1], ey = oy + B.eye;
        const fx = x => x === e0 ? 6 : x === e1 ? 8 : x > e0 && x < e1 ? 7 : x < e0 ? 6 - (e0 - x) : 8 + (x - e1);
        for (const [dy, hi] of [[0, 1], [1, 3]]) for (let x = Math.max(0, e0); x <= Math.min(N - 1, e1 + hi); x++) {
          const j = (ey + dy) * N + x, X = fx(x);
          if (lay[j] && lay[j] !== snowLay[j] && X <= (dy ? 10 : 9)) put(X, 7 + dy, lay[j]);
        }
        // its buttons stacked up its side (side by side they would read as a second face)
        B.btn.forEach((bb, i) => { const col = BTN[i % 2]; if (col) put(2, B.btn.length > 1 ? 6 + i * 2 : 8, buttons === 'Glowing' && Math.sin(t * 1.6 + i * 1.7) < -0.2 ? '#2a90b0' : col); });
        // neckwear in the gap between the balls (a scarf's tail, a bell or a medal falls to the snow)
        const nk = { 'Red Scarf': ['#e03a3a', '#e03a3a', '#e03a3a', '#b02828'], 'Striped Scarf': ['#3aa0e0', '#f8f8f8', '#3aa0e0', '#3aa0e0'], 'Bow Tie': [null, '#c02040', '#c02040'],
          'Gold Medal': [null, '#3060d0', '#3060d0', Math.sin(t * 2) > 0.7 ? '#fff8c0' : '#f8c830'], Necktie: [null, '#2c3c8c', '#4256b4'], Bell: ['#b02838', '#b02838', '#b02838', Math.sin(t * 1.8) > 0.6 ? '#fff4b0' : '#f0c040'] }[neck];
        if (nk) nk.forEach((col, k) => { if (col) put(5, 6 + k, col); });
        // one arm up out of the body, waving now and then, holding whatever it held
        const stick = '#7a5030', ax = 1 + wv;
        put(2, 4, stick); put(ax, 3, stick);
        if (arms === 'Mittens') put(ax, 2, '#d03040');
        else if (arms === 'Twigs') { put(ax - 1, 2, stick); put(ax, 1, stick); }
        else if (arms === 'Broom') { put(ax - 1, 2, '#e0b850'); put(ax, 2, '#c89838'); put(ax + 1, 2, '#e0b850'); }
        else if (arms === 'Snowball') put(ax, 2, '#ffffff');
        else if (arms === 'Tiny Flag') { put(ax, 2, stick); put(ax + 1, Math.sin(t * 3) > 0 ? 2 : 3, '#e03a3a'); }
        else if (arms === 'Shovel') { put(ax, 2, '#8a8f9c'); put(ax, 1, '#c2c8d4'); }
        else if (arms === 'Cocoa') { put(ax, 2, '#8a5030'); if (Math.sin(t * 2.2) > -0.2) put(ax, 1, '#f4f4f4'); }
        else if (arms === 'Lantern') { put(ax, 2, '#3a3a48'); put(ax, 1, night || sky === 'Dusk' ? (Math.sin(t * 2.9) > -0.8 ? '#ffd860' : '#e8b040') : '#c8b070'); }
      } else {
        // caught mid-fall, leaning over toward its nose one dot per part: the bottom ball stays put, the middle
        // moves one dot over and the head (with its hat) two, so every part keeps its shape and the face stays whole
        const tip = y => y >= oy + B.arm ? 0 : y >= oy + B.neck ? 1 : 2;
        for (let i = 0; i < N * N; i++) if (lay[i]) { const y = (i / N) | 0; put(i % N + tip(y), y, lay[i]); }
      }
    }

    function scene(t) {
      // sky: a step gradient, two rows to a step, from the darkest at the top to the horizon
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) SK(x, y, STEPS[Math.min(4, y >> 1)]);
      // the light: a sun, or a moon at night, high (or low at dusk and sunrise) on one side, with a glow round it
      const lx = lightSide > 0 ? 9 : 1, low = sky === 'Dusk' || sky === 'Sunrise';
      const ly = low ? 6 : 1;
      if (sky !== 'Eclipse' && setting !== 'Moon Night') {
        const moon = night, core = moon ? '#f4f0d8' : sky === 'Overcast' || sky === 'Blizzard' ? '#eef2f6' : low ? '#ffe2a0' : '#fff6c8';
        for (let y = ly - 2; y <= ly + 3; y++) for (let x = lx - 2; x <= lx + 3; x++) {
          const d = Math.hypot(x - lx - 0.5, y - ly - 0.5);
          if (d > 1.1 && d < 2.7 && y < 10 && skyM[y * N + x]) SK(x, y, mix(cell[y * N + x], core, moon ? 0.18 : 0.32));
        }
        BG(lx, ly, core); BG(lx + 1, ly, core); BG(lx, ly + 1, core); BG(lx + 1, ly + 1, moon ? '#c8c4ac' : core);
      }
      const dark = lightSide > 0 ? 1 : 10;
      if (sky === 'Clear Day') { SK(dark, 2, '#eaf4fc'); SK(dark + 1, 2, '#eaf4fc'); SK(11 - dark, 3, '#d4e8f8'); }
      else if (sky === 'Aurora Night') {
        for (let x = 0; x < N; x++) {
          const y = 2 + Math.round(Math.sin(x * 0.7 + t * 0.5 + auroraPh));
          SK(x, y, (x + Math.floor(t * 0.8)) % 4 === 0 ? SKY[2] : SKY[1]);
        }
      } else if (sky === 'Dusk') BG(dark, 1, '#f4e0b0');
      else if (sky === 'Starry') { for (const st of starsAt) if (Math.sin(t * 1.4 + st[2]) > -0.3 && skyM[st[1] * N + st[0]]) BG(st[0], st[1], SKY[2]); }
      else if (sky === 'Overcast') { for (let x = 0; x < N; x++) { if ((x + 1) % 5 < 3) SK(x, 1, SKY[1]); if (x % 4 !== 2) SK(x, 2, SKY[1]); SK(x, 0, SKY[2]); } }
      else if (sky === 'Snowy Night') { SK(dark, 1, '#c8d2f0'); SK(5, 4, '#8894c4'); }
      else if (sky === 'Eclipse') {
        // a black sun in a burning ring, high on the right
        BG(9, 1, SKY[2]); BG(8, 2, SKY[2]); BG(10, 2, SKY[2]); BG(9, 3, SKY[2]); BG(9, 2, '#05040c');
        for (const st of starsAt) if (st[0] < 7 && Math.sin(t * 1.1 + st[2]) > 0) BG(st[0], st[1], '#b8a8e0');
      }

      // the setting, painted right across the background
      const lit = night || sky === 'Dusk' || sky === 'Eclipse';
      if (setting === 'Moon Night') {
        // a big moon on the lit side, its glow on the sky, the snow lit blue
        const mx0 = lightSide > 0 ? 8 : 1;
        for (let y = 0; y <= 5; y++) for (let x = mx0 - 2; x <= mx0 + 4; x++) { const d = Math.hypot(x - mx0 - 1, y - 2); if (d > 1.7 && d < 3.2 && skyM[y * N + x]) SK(x, y, mix(cell[y * N + x], '#f4f0d8', 0.2)); }
        for (let y = 1; y <= 3; y++) for (let x = mx0; x <= mx0 + 2; x++) if (!((x === mx0 || x === mx0 + 2) && (y === 1 || y === 3))) BG(x, y, '#f6f2dc');
        BG(mx0 + 1, 1, '#f6f2dc'); BG(mx0, 2, '#f6f2dc'); BG(mx0 + 2, 2, '#f6f2dc'); BG(mx0 + 1, 2, '#ddd6b8'); BG(mx0 + 2, 3, '#ddd6b8');
      } else if (setting === 'Pine Forest') {
        // a dark band of snowy pines along the horizon, behind it
        for (const [tx, top] of [[0, 5], [3, 4], [6, 5], [9, 4], [11, 6]]) for (let y = top; y <= 9; y++) {
          const w = Math.min(2, Math.floor((y - top + 1) / 2));
          for (let x = tx - w; x <= tx + w; x++) BG(x, y, y === top ? '#e8f0f8' : (x - tx) * lightSide > 0 ? '#2f6e4a' : '#1f4f36');
        }
      } else if (setting === 'Frozen Lake') {
        // a far shore of dark trees, then the ice
        for (let x = 0; x < N; x++) { BG(x, 8, x % 3 === 1 ? '#34485f' : '#4a6078'); if (x % 3 === 1) BG(x, 7, '#34485f'); BG(x, 9, '#cfe4f4'); }
      } else if (setting === 'Village') {
        // a row of snowy rooftops with lit windows (dim by day)
        const wall = '#5a4560', win = lit ? '#ffd060' : '#9fc0dc';
        for (const [x0, w, top] of [[0, 3, 5], [3, 3, 6], [7, 2, 6], [9, 3, 4]]) {
          for (let y = top; y <= 9; y++) for (let x = x0; x < x0 + w; x++) BG(x, y, y === top ? '#f4f8fc' : y === top + 1 ? '#c4d4e8' : wall);
          BG(x0 + 1, top + 3, win);
        }
        BG(10, 3, '#3a2c40');
        if (Math.sin(t * 1.7) > -0.2) BG(10, 2 - (Math.floor(t * 1.2) % 2), '#c8d0dc');
      } else if (setting === 'Hillside') {
        // a big snowy hill rising on the dark side
        const hx = lightSide > 0 ? 1 : 10;
        for (let y = 4; y <= 9; y++) for (let x = 0; x < N; x++) { const d = ((x - hx) / 7) ** 2 + ((y - 11) / 6.5) ** 2; if (d < 1) BG(x, y, d > 0.8 ? '#c4d4e8' : '#f0f6fc'); }
      } else if (setting === 'Whiteout') {
        // the snow comes down so thick that the sky fades to white near the ground
        for (let y = 0; y < 10; y++) for (let x = 0; x < N; x++) if (skyM[y * N + x]) SK(x, y, mix(cell[y * N + x], '#e4eaf2', 0.45 + y * 0.04));
      } else if (setting === 'Bird Garden') {
        // a bare tree on the far side, snow along its branches
        const tx = 11;
        for (let y = 2; y <= 9; y++) BG(tx, y, '#5a3a24');
        BG(10, 3, '#5a3a24'); BG(9, 2, '#5a3a24'); BG(10, 6, '#5a3a24'); BG(9, 5, '#5a3a24');
        BG(9, 1, '#f4f8fc'); BG(10, 2, '#f4f8fc'); BG(9, 4, '#f4f8fc'); BG(11, 1, '#f4f8fc');
      } else if (setting === 'Campfire') {
        // logs and a fire on one side (its glow is laid over everything at the end)
        BG(10, 9, '#6a4428'); BG(11, 9, '#4e3020');
      } else {
        // open snow: the white of a far drift along the horizon
        for (let x = 0; x < N; x++) BG(x, 9, x % 4 === (lightSide > 0 ? 1 : 2) ? '#c4d4e8' : '#e8f0f8');
      }
      // ground: rows 10 and 11
      for (let x = 0; x < N; x++) { BG(x, 10, GRD[0]); BG(x, 11, GRD[1]); }
      if (setting === 'Frozen Lake') { BG(2, 11, '#e8f6ff'); BG(3, 11, '#e8f6ff'); BG(8, 11, '#e8f6ff'); }
      // a soft shadow under it, cast away from the light
      for (let x = 3; x < 9; x++) BG(x - lightSide, 10, GRD[1]);

      // the 8 x 8 snowman lives in columns 2..9, rows 2..9
      if (pose !== 'Standing') { lay.fill(null); tgt = lay; }
      const ox = 2, oy = 2;
      const since = t - hitAt;
      const bt = (t + blinkOff) % blinkGap < 0.18 || (since >= 0 && since < 0.3);
      const wt = (t + waveOff) % waveGap;
      const wave = since >= 0.3 && since < 1.6 ? (Math.floor(since * 5) % 2) : wt < 1.2 ? (Math.floor(wt * 5) % 2) : 0;
      mute = legend !== 'None';
      const [L, D, K] = SN;
      for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) {
        const ch = B.art[r][q];
        if (ch === '.') continue;
        const flav = snow === 'Sherbet' ? SHERBET[r <= B.neck ? 0 : r <= B.arm + 1 ? 1 : 2] : null;
        P(ox + q, oy + r, ch === 'L' ? (flav ? flav[0] : L) : (flav ? flav[1] : D));
      }
      if (pose === 'Toppled') for (let i = 0; i < N * N; i++) snowLay[i] = lay[i];
      // buttons down its front
      B.btn.forEach((b, i) => { const col = BTN[i % 2]; if (col) P(ox + b[0], oy + b[1], buttons === 'Glowing' && Math.sin(t * 1.6 + i * 1.7) < -0.2 ? '#2a90b0' : col); });
      // eyes
      const ex = [ox + B.ex[0], ox + B.ex[1]], ey = oy + B.eye;
      for (const e of ex) {
        if (bt || eyes === 'Sleepy') { P(e, ey, D); continue; }
        if (eyes === 'Coal') P(e, ey, K);
        else if (eyes === 'Sparkle') P(e, ey, Math.sin(t * 3 + e) > 0.6 ? '#7ac8ff' : K);
        else if (eyes === 'Hearts') P(e, ey, '#ff4a7a');
        else if (eyes === 'Wink') P(e, ey, e === ex[0] ? D : K);
        else if (eyes === 'Odd Buttons') P(e, ey, e === ex[0] ? '#3a78d8' : '#d84a3a');
        else if (eyes === 'Glow') P(e, ey, night ? '#8ef6ff' : '#2aa8c8');
      }
      if (eyes === 'Shades' && !bt) { for (let q = eL; q <= eR; q++) P(ox + q, ey, '#08080c'); P(ex[0], ey, '#3a4a6a'); P(ex[1], ey, '#3a4a6a'); }
      if (eyes === 'Monocle' && !bt) { P(ex[0], ey, K); P(ex[1], ey, K); P(ex[1] + 1, ey, '#f0c040'); P(ex[1] + 1, ey + 1, '#f0c040'); }
      // nose, pointing right
      const nx = ox + B.nx, ny = oy + B.nose;
      if (nose === 'Carrot') { P(nx, ny, '#f07020'); P(nx + 1, ny, '#f8a040'); }
      else if (nose === 'Long Carrot') { P(nx, ny, '#f07020'); P(nx + 1, ny, '#f07020'); P(nx + 2, ny, '#f8a040'); P(nx + 3, ny, '#f8a040'); P(nx + 4, ny, '#ffc070'); }
      else if (nose === 'Button') P(nx, ny, '#c03050');
      else if (nose === 'Pine Cone') { P(nx, ny, '#7a4a20'); P(nx + 1, ny, '#a06830'); }
      else if (nose === 'Radish') { P(nx, ny, '#e03060'); P(nx + 1, ny, '#58b048'); }
      else if (nose === 'Icicle') { P(nx, ny, '#9fd8f4'); P(nx + 1, ny, '#e2f6ff'); }
      else if (nose === 'Golden Carrot') {
        // the coveted one: a long carrot of solid gold, a glint running down it and a star twinkling off its tip
        // (the star flares under the pointer and when a snowball lands)
        const near = (ptrCell && Math.abs(ptrCell[0] - nx - 2) < 3 && Math.abs(ptrCell[1] - ny) < 3) || t - legAt < 0.6, run = Math.floor((t * 2.5) % 7);
        ['#b87808', '#e0a018', '#f2c030', '#ffe680'].forEach((cc, k) => P(nx + k, ny, run === k ? '#ffffff' : cc));
        const sx = Math.min(N - 2, nx + 5), sy = ny - 1, tw = Math.sin(t * 3.1);
        if (tw > -0.5 || near) P(sx, sy, '#ffffff');
        if (tw > 0.15 || near) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(sx + a, sy + b, '#ffe680');
      }
      else { P(nx, ny, '#6a4628'); P(nx + 1, ny - 1, '#6a4628'); }

      // neckwear and hat, with any colour the sky shares turned away from it (not once it has fallen in the snow)
      tintAway = pose !== 'Toppled';
      // neckwear on the neck row
      const ny2 = oy + B.neck, c0 = ox + Math.max(nL, hc - 1), c1 = ox + Math.min(nR, hc + 2);
      if (neck === 'Red Scarf') { for (let q = c0; q <= c1; q++) P(q, ny2, '#e03a3a'); P(c1, ny2 + 1, '#e03a3a'); P(c1, ny2 + 2, '#b02828'); }
      else if (neck === 'Striped Scarf') { for (let q = c0; q <= c1; q++) P(q, ny2, (q - ox) % 2 ? '#3aa0e0' : '#f8f8f8'); P(c0, ny2 + 1, '#3aa0e0'); P(c0, ny2 + 2, '#f8f8f8'); }
      else if (neck === 'Bow Tie') { P(ox + hc, ny2, '#c02040'); P(ox + hc + 1, ny2, '#c02040'); }
      else if (neck === 'Gold Medal') { P(ox + hc, ny2, '#3060d0'); P(ox + hc + 1, ny2, '#3060d0'); P(ox + hc + 1, ny2 + 1, Math.sin(t * 2) > 0.7 ? '#fff8c0' : '#f8c830'); }
      else if (neck === 'Necktie') { P(ox + hc, ny2, '#2c3c8c'); P(ox + hc, ny2 + 1, '#2c3c8c'); P(ox + hc, ny2 + 2, '#4256b4'); }
      else if (neck === 'Bell') { for (let q = c0; q <= c1; q++) P(q, ny2, '#b02838'); P(ox + hc, ny2 + 1, Math.sin(t * 1.8) > 0.6 ? '#fff4b0' : '#f0c040'); }

      // hat above the head; it jumps when a snowball lands (toppled, it has rolled off: drawn on its own layer, two dots wide, and set down beside the head)
      const tp = pose === 'Toppled';
      if (tp) { hatLay.fill(null); tgt = hatLay; }
      const hy = tp ? 9 : oy + B.top - (since >= 0 && since < 0.35 ? 1 : 0);
      const h0 = tp ? 10 : ox + hL, h1 = tp ? 11 : ox + hR, hcx = tp ? 10 : ox + hc;
      if (hat === 'Bucket') { for (let q = h0; q <= h1; q++) { P(q, hy - 1, '#d04030'); P(q, hy - 2, q === h0 ? '#f07060' : '#d04030'); } P(h0 - 1, hy, '#a03020'); P(h1 + 1, hy, '#a03020'); }
      else if (hat === 'Beanie') { for (let q = h0; q <= h1; q++) P(q, hy - 1, '#40a060'); for (let q = h0 - 1; q <= h1 + 1; q++) P(q, hy, (q - ox) % 2 ? '#f8f8f8' : '#40a060'); P(hcx, hy - 2, '#ffffff'); P(hcx + 1, hy - 2, '#ffffff'); }
      else if (hat === 'Top Hat') { for (let q = h0; q <= h1; q++) { P(q, hy - 2, '#18181c'); P(q, hy - 1, q === h0 ? '#c03030' : '#18181c'); } for (let q = h0 - 1; q <= h1 + 1; q++) P(q, hy, '#18181c'); }
      else if (hat === 'Earmuffs') { if (tp) { P(h0 - 1, hy, '#f06aa0'); P(h1 + 1, hy, '#f06aa0'); } else { P(ox + eL - (eL === hL ? 1 : 0), ey, '#f06aa0'); P(ox + eR + (eR === hR ? 1 : 0), ey, '#f06aa0'); P(h0 - 1, hy, '#b0b0c0'); P(h1 + 1, hy, '#b0b0c0'); } for (let q = h0; q <= h1; q++) P(q, hy - 1, '#b0b0c0'); }
      else if (hat === 'Propeller') { // a beanie with a spinning blade
        for (let q = h0; q <= h1; q++) P(q, hy - 1, (q - ox) % 2 ? '#f0d020' : '#3070e0');
        const pc = hcx;
        P(pc, hy - 2, '#808080');
        const spin = Math.floor(t * 8) % 3;
        if (spin === 0) { P(pc - 2, hy - 2, '#e03030'); P(pc - 1, hy - 2, '#e03030'); P(pc + 1, hy - 2, '#e03030'); P(pc + 2, hy - 2, '#e03030'); }
        else if (spin === 1) { P(pc - 1, hy - 2, '#e03030'); P(pc + 1, hy - 2, '#e03030'); }
        else P(pc, hy - 2, '#e03030');
      } else if (hat === 'Crown') { for (let q = h0; q <= h1; q++) P(q, hy - 1, '#f8c830'); P(h0, hy - 2, '#f8c830'); P(h1, hy - 2, '#f8c830'); P(h0 + 1, hy - 1, '#e03050'); P(h0 + 2, hy - 2, Math.sin(t * 2.4) > 0.6 ? '#ffffff' : '#f8c830'); }
      else if (hat === 'Bobble') { for (let q = h0; q <= h1; q++) { P(q, hy - 1, (q - ox) % 2 ? '#7a54c8' : '#f4c040'); } for (let q = h0 + 1; q < h1; q++) P(q, hy - 2, '#7a54c8'); if (tp) P(hcx, hy - 2, '#7a54c8'); P(hcx, hy - 3, '#ffffff'); }
      else if (hat === 'Flower Crown') { for (let q = h0; q <= h1; q++) P(q, hy - 1, (q - ox) % 2 ? '#ff78ae' : (q - ox) % 4 === 0 ? '#ffe060' : '#4a9a4a'); }
      else if (hat === 'Bird Nest') { for (let q = h0; q <= h1; q++) P(q, hy - 1, (q - ox) % 2 ? '#8a6a3c' : '#6a4a28'); P(hcx, hy - 2, '#a8dcf4'); P(hcx + 1, hy - 2, '#a8dcf4'); }
      else if (hat === 'Traffic Cone' && tp) { P(h0 - 1, hy, '#c85a10'); P(h1 + 1, hy, '#c85a10'); for (let q = h0; q <= h1; q++) { P(q, hy - 1, '#f07818'); P(q, hy - 2, '#f8f8f8'); } P(hcx, hy - 3, '#ff9030'); }
      else if (hat === 'Traffic Cone') { for (let q = h0 - 1; q <= h1 + 1; q++) P(q, hy, q < h0 || q > h1 ? '#c85a10' : null); for (let q = h0; q <= h1; q++) P(q, hy - 1, q === hcx || q === hcx + 1 ? '#f8f8f8' : '#f07818'); P(hcx, hy - 2, '#ff9030'); P(hcx + 1, hy - 2, '#e06810'); }
      else if (hat === 'Halo') { const up = Math.sin(t * 1.3) > 0.4 ? 1 : 0; for (let q = h0; q <= h1; q++) P(q, hy - 2 - up, q === h0 || q === h1 ? '#e8b830' : '#fff0a0'); }

      tintAway = false;
      if (tp) tgt = lay;
      // arms out to the sides, the right one waves now and then
      const stick = '#7a5030';
      const lift = wave ? -1 : 0, ay = oy + B.arm, aL = ox + aL0 - 1, aR = ox + aR0 + 1;
      if (arms === 'Mittens') { P(aL, ay, stick); P(aL - 1, ay - 1, '#d03040'); P(aR, ay, stick); P(aR + 1, ay - 1 + lift, '#d03040'); }
      else {
        P(aL, ay, stick); P(aL - 1, ay - 1, stick); P(aL - 2, ay - 1, arms === 'Twigs' ? stick : null);
        P(aR, ay, stick); P(aR + 1, ay - 1 + lift, stick); if (arms === 'Twigs') P(aR + 2, ay - 2 + lift, stick);
      }
      if (arms === 'Broom') { P(aL - 1, ay - 2, '#a07040'); P(aL - 1, ay - 3, '#a07040'); P(aL - 1, ay, '#e0b850'); P(aL - 1, ay + 1, '#e0b850'); P(aL, ay + 1, '#c89838'); }
      else if (arms === 'Snowball') P(aR + 2, ay - 2 + lift, '#ffffff');
      else if (arms === 'Tiny Flag') { P(aR + 2, ay - 2 + lift, stick); P(aR + 2, ay - 3 + lift, stick); P(aR + 3, ay - 3 + lift + (Math.sin(t * 3) > 0 ? 0 : 1), '#e03a3a'); }
      else if (arms === 'Shovel') { P(aL - 1, ay, '#8a8f9c'); P(aL - 1, ay + 1, '#c2c8d4'); }
      else if (arms === 'Cocoa') { P(aR + 2, ay - 2 + lift, '#8a5030'); if (Math.sin(t * 2.2) > -0.2) P(aR + 2, ay - 3 + lift - (Math.sin(t * 1.1) > 0 ? 1 : 0), '#f4f4f4'); }
      else if (arms === 'Lantern') { P(aL - 1, ay, '#3a3a48'); P(aL - 1, ay + 1, night || sky === 'Dusk' ? (Math.sin(t * 2.9) > -0.8 ? '#ffd860' : '#e8b040') : '#c8b070'); }

      mute = false;
      // in the bird garden, a bird on its left hand
      const away2 = since >= 0 && since < 3 && bird !== 'None';
      // (toppled, it sits on top of the fallen body instead, drawn once the body is laid down)
      if (pose === 'Toppled' && tgt !== cell) { tgt = cell; settle(t); }
      if (bird !== 'None') {
        let bx = arms === 'Broom' ? aL - 1 : arms === 'Mittens' ? aL - 1 : aL - 2, by = arms === 'Broom' ? ay - 4 : ay - 2;
        if (arms === 'Shovel' || arms === 'Lantern') { bx = aL - 1; by = ay - 2; }
        if (pose === 'Toppled') { bx = 3; by = 4; }
        let show = true;
        if (away2) {
          // it takes off up and away, then comes back to the same twig
          if (since < 0.6) { const k = Math.floor(since / 0.6 * 4) + 1; bx -= k; by -= k; }
          else if (since < 2.5) show = false;
          else { const k = 3 - Math.floor((since - 2.5) / 0.5 * 3); bx -= k; by -= k; }
        }
        const body = bird === 'Blue Bird' ? '#3a7ae0' : '#d8283a';
        if (show) { P(bx, by, body); P(bx + 1, by, bird === 'Blue Bird' ? '#f2b040' : '#f2a040'); if (bird === 'Two Birds') { P(bx, by - 1, '#3a7ae0'); } }
      }
      if (tgt !== cell) { tgt = cell; settle(t); }
      if (legend !== 'None') legendMan(t, bt, ox, oy);
      // the frozen lake mirrors the snowman, dimmed into the ice
      if (setting === 'Frozen Lake') for (const [dst, src] of [[10, 9], [11, 8]]) for (let x = 0; x < N; x++) {
        const j = src * N + x;
        if (!bgM[j]) cell[dst * N + x] = mix(cell[j], GRD[0], dst === 10 ? 0.5 : 0.65);
      }
      // the campfire: flames that flicker, and a warm light thrown across everything near it
      if (setting === 'Campfire') {
        const fl = Math.sin(t * 5.1) + Math.sin(t * 7.7) > 0;
        const PF = (x, y, col) => { if (pose !== 'Toppled' || bgM[y * N + x]) P(x, y, col); };
        PF(10, 8, fl ? '#ffd060' : '#ff8a2c'); PF(11, 8, fl ? '#ff8a2c' : '#ffd060'); PF(fl ? 10 : 11, 7, '#ff5a2a');
        const k0 = 0.42 + (fl ? 0.04 : 0);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const d = Math.hypot(x - 10.5, y - 8), j = y * N + x;
          if (d < 7 && !(y >= 7 && y <= 8 && x >= 10)) cell[j] = mix(cell[j], '#ff9a3c', k0 * (1 - d / 7));
        }
      }
      // falling snow, one dot at a time, drawn over the sky only
      if (flurry || setting === 'Whiteout' || sky === 'Blizzard' || sky === 'Clear Day' || sky === 'Starry' || sky === 'Snowy Night' || sky === 'Overcast') {
        const count = sky === 'Blizzard' || sky === 'Snowy Night' || setting === 'Whiteout' || flurry ? 7 : 3;
        for (let i = 0; i < count; i++) { // one flake each
          const f = flakes[i];
          const y = Math.floor((f[1] + t * f[2]) % 10), x = (f[0] + Math.floor((t * f[2] + i) / 3)) % N;
          if (skyM[y * N + x]) P(x, y, '#ffffff');
        }
      }
      // a snowball in flight, then the splat flying apart
      if (ball) {
        const u = (t - ball.at) / 0.4;
        if (u >= 1) { ball = null; }
        else P(Math.round(ball.x0 + (hitCell[0] - ball.x0) * u), Math.round(ball.y0 + (hitCell[1] - ball.y0) * u - Math.sin(u * Math.PI) * 2), '#ffffff');
      }
      if (since >= 0 && since < 0.45) {
        const r = since < 0.15 ? 0 : 1 + Math.floor(since * 4);
        for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1]]) P(hitCell[0] + dx * r, hitCell[1] + dy * r, r ? '#f4fbff' : '#ffffff');
      }
    }

    // ---------- the legendaries, each placed dot by dot like the rest ----------
    const YETI = ['.W.WW.W.', 'WWWWWWWW', 'WFFFFFFS', 'WFKFFKFS', 'WFFFFFFS', 'WFFMMFFS', 'WWWWWWWS', 'SWW..WWS'];
    const FL = ['#7a1006', '#c82c0c', '#f06818', '#ffb020', '#fff2b8'];
    // diamond: white and three tones of ice blue (light, mid, deep)
    const ICE = ['#ffffff', '#b4e2fa', '#6cbaea', '#2f7cc4'];
    function legendMan(t, bt, ox, oy) {
      const u = t - legAt, look = ptrCell ? (ptrCell[0] < 4 ? -1 : ptrCell[0] > 8 ? 1 : 0) : 0;
      if (legend === 'Yeti') {
        // a yeti instead of a snowman: shaggy white, a blue face; tapped, it throws its arms up and roars
        const roar = u >= 0 && u < 1.3;
        for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) {
          let ch = YETI[r][q];
          if (roar && r === 4 && q > 1 && q < 6) ch = 'M';
          if (roar && r === 5) ch = 'WFTMMTFS'[q];
          if (r === 3 && (ch === 'K' || q === 2 + look || q === 5 + look)) ch = bt ? 'F' : (q === 2 + look || q === 5 + look) ? 'K' : 'F';
          if (ch === '.') continue;
          P(ox + q, oy + r, { W: '#f2f6fc', S: '#b0c2dc', F: '#5f86c8', K: '#101828', M: '#3a1830', T: '#ffffff' }[ch]);
        }
        for (const [x, sd] of [[ox - 1, -1], [ox + 8, 1]]) {
          if (roar) { for (let y = oy + 2; y <= oy + 5; y++) P(x, y, y === oy + 2 ? '#5f86c8' : sd < 0 ? '#f2f6fc' : '#b0c2dc'); }
          else { for (let y = oy + 5; y <= oy + 7; y++) P(x, y, sd < 0 ? '#f2f6fc' : '#b0c2dc'); P(x, oy + 8, '#5f86c8'); }
        }
      } else if (legend === 'Fire') {
        // a snowman made of fire that never melts: every dot a flame, licking upward, a puddle glowing under it
        const flare = (u >= 0 && u < 0.9 ? 1 : 0) + (ptrCell ? 0.5 : 0);
        const tops = [];
        for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) {
          const ch = B.art[r][q];
          if (ch === '.') continue;
          if (tops[q] === undefined) tops[q] = r;
          const n = Math.sin(q * 1.9 + t * 5.3 + r) * 0.8 + Math.sin(r * 2.3 - t * 7.1 + q * 0.7) * 0.7;
          const lv = Math.max(0, Math.min(4, Math.round((ch === 'L' ? 2.4 : 1.4) + n + (r < 3 ? 0.5 : 0) + flare * 0.6)));
          P(ox + q, oy + r, FL[lv]);
        }
        tops.forEach((r, q) => {
          if (r === undefined) return;
          if (Math.sin(t * 6 + q * 2.1) > 0.1 - flare * 0.5) P(ox + q, oy + r - 1, FL[3]);
          if (flare && Math.sin(t * 7.3 + q * 1.3) > 0.2) P(ox + q, oy + r - 2, FL[2]);
        });
        for (const e of [ox + B.ex[0], ox + B.ex[1]]) P(e, oy + B.eye, bt ? FL[3] : '#2a0802');
        P(ox + B.nx, oy + B.nose, '#3a1a10');
        for (let x = 3; x < 9; x++) P(x, 10, (x + Math.floor(t * 4)) % 3 ? '#3e5c8c' : '#f08a30');
        if (u >= 0 && u < 1.5) for (let k = 0; k < 3; k++) { const y = Math.floor(hitCell[1] - u * 3 - k); if (y >= 0) P(hitCell[0] + (k % 2), y, k ? '#c8ccd4' : '#e8ecf0'); }
      } else {
        // a snowman cut from diamond: light ice on the lit side, deep ice in the shade, straight diagonal facet lines
        // across both balls, and every couple of seconds a white sparkle stepping cell by cell down across it
        const sp = (t % 2.2) / 0.09 | 0;
        for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) {
          const ch = B.art[r][q];
          if (ch === '.') continue;
          const line = (q + r) % 3 === 0;
          let col = ch === 'D' ? (line ? ICE[2] : ICE[3]) : line ? ICE[2] : ICE[1];
          const dd = Math.abs(q - sp - 1) + Math.abs(r - sp);
          if (dd === 0) col = ICE[0];
          else if (dd === 1) col = ch === 'D' ? ICE[1] : '#eefaff';
          if (ptrCell && ptrCell[0] === ox + q && ptrCell[1] === oy + r) col = ICE[0];
          P(ox + q, oy + r, col);
        }
        if (ptrCell) { const [px, py] = ptrCell; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = px + a, y = py + b; if (x >= ox && y >= oy && x < ox + 8 && y < oy + 8 && B.art[y - oy][x - ox] !== '.') P(x, y, '#e8fcff'); } }
        for (const e of [ox + B.ex[0], ox + B.ex[1]]) P(e, oy + B.eye, bt ? '#94dcfa' : '#1a2a5a');
        P(ox + B.nx, oy + B.nose, '#c8102e'); P(ox + B.nx + 1, oy + B.nose, '#f03048');
        if (u >= 0 && u < 1.1) {
          // a tap rings it like glass: a ring of icy light spreading out over the sky
          const rr = u * 9;
          for (let y = 0; y < 10; y++) for (let x = 0; x < N; x++) { const d = Math.hypot(x - 5.5, y - 5.5); if (Math.abs(d - rr) < 0.7 && skyM[y * N + x]) P(x, y, (x + y) % 2 ? ICE[0] : ICE[1]); }
        }
      }
    }

    // a colour nudged lighter or darker, for the mosaic's uneven tiles
    const nudge = (hex, k) => {
      const v = parseInt(hex.slice(1), 16);
      const f = ch => Math.max(0, Math.min(255, Math.round(ch + (k > 0 ? (255 - ch) * k : ch * k))));
      return 'rgb(' + f(v >> 16) + ',' + f(v >> 8 & 255) + ',' + f(v & 255) + ')';
    };
    const gap = Math.max(1, S / 260);
    function draw(t) {
      scene(t);
      if (finish === 'LED Matrix' || finish === 'Mosaic') { x2.fillStyle = finish === 'Mosaic' ? '#d9dde2' : '#06070b'; x2.fillRect(0, 0, S, S); }
      for (let y = 0; y < N; y++) {
        const y0 = Math.round(y * S / N), y1 = Math.round((y + 1) * S / N);
        for (let x = 0; x < N; x++) {
          const x0 = Math.round(x * S / N), x1 = Math.round((x + 1) * S / N), col = cell[y * N + x];
          if (finish === 'LED Matrix') {
            // each dot a round lamp with a faint bloom
            const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, r = (x1 - x0) * 0.4;
            x2.fillStyle = col;
            x2.globalAlpha = 0.22; x2.beginPath(); x2.arc(cx, cy, r * 1.32, 0, 6.2832); x2.fill();
            x2.globalAlpha = 1; x2.beginPath(); x2.arc(cx, cy, r, 0, 6.2832); x2.fill();
          } else if (finish === 'Mosaic') {
            x2.fillStyle = nudge(col, tileTint[y * N + x]);
            x2.fillRect(x0 + gap, y0 + gap, x1 - x0 - gap * 2, y1 - y0 - gap * 2);
          } else {
            x2.fillStyle = col;
            x2.fillRect(x0, y0, x1 - x0, y1 - y0);
          }
        }
      }
      if (finish === 'Editor Grid') {
        // the faint grid of a sprite editor, as if it were still being drawn
        x2.fillStyle = 'rgba(16,24,48,0.2)';
        for (let k = 1; k < N; k++) { const p = Math.round(k * S / N); x2.fillRect(p, 0, gap, S); x2.fillRect(0, p, S, gap); }
      }
    }
    draw(0);
    return (t) => {
      clock = t;
      const inp = c.input;
      ptrCell = inp.inside ? [Math.floor(inp.x * N), Math.floor(inp.y * N)] : null;
      if (ptrCell && !wasIn && legend === 'Fire') c.sound.hit('noise', 0.08, { cutoff: 5000, dur: 0.3 });
      wasIn = !!ptrCell;
      if (legend === 'Diamond' && ptrCell) {
        // the facet under the pointer rings faintly as you move over it
        const id = ptrCell[1] * N + ptrCell[0], ox = 2, oy = 2, q = ptrCell[0] - ox, r = ptrCell[1] - oy;
        if (id !== lastCell && q >= 0 && r >= 0 && q < 8 && r < 8 && B.art[r][q] !== '.' && t - tingAt > 0.1) { tingAt = t; c.sound.note(base + 24 + tones[facet[r * 8 + q]], { dur: 0.35, vel: 0.05, wave: 'sine' }); }
        lastCell = id;
      }
      for (const lob of inp.taps()) {
        if (!ball) {
          legAt = t + 0.4;
          if (legend === 'Yeti') { c.sound.hit('noise', 0.3, { at: 0.45, cutoff: 500, dur: 0.8 }); for (let k = 0; k < 3; k++) c.sound.note(base - 24 + tones[2 - k], { at: 0.45 + k * 0.12, dur: 0.2, vel: 0.2, wave: 'sawtooth', cutoff: 420 }); }
          else if (legend === 'Fire') { c.sound.hit('noise', 0.3, { at: 0.42, cutoff: 6000, dur: 0.5 }); c.sound.note(base - 12, { at: 0.42, dur: 0.3, vel: 0.18, wave: 'sine' }); }
          else if (legend === 'Diamond') for (let k = 0; k < 4; k++) c.sound.note(base + 24 + tones[(k * 2) % 5], { at: 0.42 + k * 0.05, dur: 1.2 - k * 0.15, vel: 0.1, wave: 'sine' });
          else if (nose === 'Golden Carrot') { c.sound.note(base + 31, { at: 0.45, dur: 0.6, vel: 0.1, wave: 'sine' }); c.sound.note(base + 36, { at: 0.52, dur: 0.8, vel: 0.07, wave: 'sine' }); }
        }
        if (ball) continue;
        const left = lob.x < 0.5;
        ball = { at: t, x0: left ? 0 : N - 1, y0: Math.max(0, Math.min(6, Math.floor(lob.y * N) - 2)) };
        hitCell = [left ? 3 : 6, 3 + Math.floor(mr() * 4)];
        hitAt = t + 0.4;
        c.sound.note(base + 12 + tones[4], { dur: 0.05, vel: 0.1, wave: 'triangle', pan: left ? -0.6 : 0.6 });
        c.sound.hit('noise', 0.4, { at: 0.4, cutoff: 1800, dur: 0.18, pan: left ? -0.2 : 0.2 });
        // the bird's two-note alarm as it takes off
        if (bird !== 'None') { c.sound.note(base + 24 + tones[3], { at: 0.46, dur: 0.04, vel: 0.08, wave: 'sine', pan: -0.5 }); c.sound.note(base + 24 + tones[4], { at: 0.52, dur: 0.05, vel: 0.08, wave: 'sine', pan: -0.6 }); }
        // a little "hey!" as it waves back
        const a = tones[Math.floor(mr() * 3)], b = tones[2 + Math.floor(mr() * 3)];
        c.sound.note(base + a, { at: 0.75, dur: 0.08, vel: 0.22, wave: 'square', cutoff: 2400 });
        c.sound.note(base + b, { at: 0.86, dur: 0.18, vel: 0.22, wave: 'square', cutoff: 2400 });
      }
      flurry = (inp.inside && inp.down) || (legend === 'Yeti' && t - legAt < 1.6 && t > legAt);
      draw(t);
    };
  },
});

})(window.Proto);
