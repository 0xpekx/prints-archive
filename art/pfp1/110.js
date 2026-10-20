// Page Parrots: from D:/code/synaesthesia/public/drop03/pieces/110.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Page Parrots: parrots built from broadcast-text mosaic blocks: 2 x 3 chunks per cell,
// two colours per cell, eight colours in all, under a dot-matrix page header and above
// a row of four coloured links. Written from scratch for this piece only.
Proto.add({
  num: 110,
  name: 'Page Parrots',
  fam: 'Pixel Portraits II',
  seed: 989,
  recipe: 'A parrot on its perch, built the way old broadcast text pages built pictures: cells of 2 x 3 mosaic chunks, only eight colours and just two inside any one cell, under a dot-matrix header with a ticking clock and above four coloured links. Species (seventeen, with a rare test-pattern bird), crest, eye, headwear, what it holds, pose, perch, page and screen vary; it blinks, bobs, and one thing on the page flashes.',
  interactive: 'Tap a tune and it sings it back. Tap the links to flip the page.',
  music: true,
  make(c) {
    const S = c.size, cx = c.ctx;
    // a 64-bit-ish xorshift (two 32-bit halves) seeded from the hash halves
    const hh = c.hash.slice(2);
    let a = 0, b = 0;
    for (let i = 0; i < 32; i += 8) { a ^= parseInt(hh.slice(i, i + 8), 16); b ^= parseInt(hh.slice(32 + i, 40 + i), 16); }
    a = a >>> 0 || 0x1234567; b = b >>> 0 || 0x89abcdef;
    function xo() {
      let x = a, y = b;
      a = y;
      x ^= x << 23; x >>>= 0;
      b = (x ^ y ^ (x >>> 17) ^ (y >>> 26)) >>> 0;
      return ((b + y) >>> 0) / 4294967296;
    }
    for (let i = 0; i < 10; i++) xo();
    const choose = (o, rr) => {
      let tot = 0;
      for (const k in o) tot = tot + o[k];
      let left = (rr || xo)() * tot;
      for (const k in o) { left -= o[k]; if (left < 0) return k; }
      return Object.keys(o)[0];
    };
    // a second stream for everything added in the polish, so the first rolls stay as they were:
    // a 32-bit LCG whose output is permuted (rotate by its own top bits) before use
    let lc = (parseInt(hh.slice(16, 24), 16) ^ parseInt(hh.slice(40, 48), 16) ^ 0x2545f491) >>> 0;
    const lr = () => {
      lc = (Math.imul(lc, 747796405) + 2891336453) >>> 0;
      let w = Math.imul((lc >>> ((lc >>> 28) + 4)) ^ lc, 277803737) >>> 0;
      w = (w >>> 22) ^ w;
      return (w >>> 0) * 2.3283064365386963e-10;
    };
    for (let i = 0; i < 6; i++) lr();
    // the newest picks hash their own keys, so no stream above or below moves
    const own = key => { let h = 0x811c9dc5; const k2 = c.hash + ':' + key; for (let i = 0; i < k2.length; i++) h = Math.imul(h ^ k2.charCodeAt(i), 0x01000193); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15; return (h >>> 0) / 4294967296; };

    // the first rolls, exactly as the founder first saw them
    let species = choose({ 'Scarlet Macaw': 22, 'Blue and Gold': 20, 'Green Amazon': 18, Cockatoo: 14, Budgie: 12, Lorikeet: 9, Hyacinth: 5 });
    let crest = choose({ Smooth: 50, Raised: 30, Punk: 20 });
    let holding = choose({ Nothing: 40, Cracker: 20, Cherry: 16, Seed: 14, 'Tiny Hat': 10 });
    let perch = choose({ Branch: 40, 'Ring Swing': 26, Rope: 20, 'Bird Bath': 14 });
    let page = choose({ 'Sky Bands': 28, Jungle: 24, 'Night Page': 18, 'Colour Bars': 16, 'Sunset Page': 14 });
    const mode = choose({ Contiguous: 95, Separated: 5 });
    const leaves = [];
    for (let i = 0; i < 10; i++) leaves.push([Math.floor(xo() * 48), 4 + Math.floor(xo() * 40), xo() < 0.5]);
    const starsP = [];
    for (let i = 0; i < 9; i++) starsP.push([Math.floor(xo() * 48), 4 + Math.floor(xo() * 28)]);
    const flashWhat = Math.floor(xo() * 3);
    const blinkGap = 2.8 + xo() * 2.5, blinkOff = xo() * 3, bobPh = xo() * 6.28;

    // the polish: upgrades and new axes from the second stream
    if (lr() < 0.5) species = choose({ Galah: 14, Eclectus: 12, 'Sun Conure': 13, Rosella: 12, Kea: 10, 'African Grey': 12, Lovebird: 13, 'Golden Conure': 5, "Spix's Macaw": 4, 'Test Pattern': 3 }, lr);
    if (lr() < 0.3) crest = choose({ Curl: 60, Fan: 25, Plume: 15 }, lr);
    if (species === 'Cockatoo' || species === 'Galah') { if (crest === 'Smooth' || crest === 'Punk') crest = 'Raised'; }
    let headwear = holding === 'Tiny Hat' ? 'Top Hat' : choose({ None: 44, 'Party Hat': 10, 'Pirate Bandana': 8, Bow: 8, 'Sailor Cap': 7, Fez: 6, 'Top Hat': 2, Crown: 3, Halo: 3 }, lr);
    if (holding === 'Tiny Hat' || (holding === 'Nothing' && lr() < 0.45)) holding = choose({ Nothing: 10, Chili: 12, Grapes: 11, Walnut: 10, Key: 9, Bell: 9, Letter: 9, Strawberry: 11, Remote: 4, 'Gold Coin': 3 }, lr);
    let eye = choose({ Bright: 44, Pinned: 18, Sleepy: 14, Lashes: 11, Eyepatch: 5, Monocle: 5, 'Heart Eyes': 2 }, lr);
    if (headwear === 'Pirate Bandana' && lr() < 0.5) eye = 'Eyepatch';
    let pose = choose({ Perched: 46, 'Wing Stretch': 16, 'Puffed Up': 12, Dancing: 14, 'Hanging Upside Down': 6, 'With Chick': 4 }, lr);
    if (lr() < 0.38) perch = choose({ Ladder: 14, Cage: 12, 'Palm Frond': 12, 'Fence Post': 12, Teacup: 8, 'TV Aerial': 4, 'Treasure Chest': 3 }, lr);
    if (pose === 'Hanging Upside Down' && /Bath|Post|Teacup|Chest/.test(perch)) pose = 'Perched';
    // some perched birds cock their heads or turn to preen; some bright eyes wink
    if (pose === 'Perched') { const v = own('pose2'); if (v < 0.25) pose = 'Head Cocked'; else if (v < 0.5) pose = 'Preening'; }
    if (eye === 'Bright' && own('eye2') < 0.35) eye = 'Wink';
    if (lr() < 0.45) page = choose({ 'Weather Map': 14, 'Snow Page': 10, Beach: 12, Cityline: 11, Fireworks: 4 }, lr);
    const screenRoll = lr();
    let screen = screenRoll < 0.05 ? 'Black & White' : screenRoll < 0.13 ? 'Ghosting' : mode;
    const facing = lr() < 0.36 ? -1 : 1;
    const pageNo = 100 + Math.floor(lr() * 800);
    const clock0 = Math.floor(lr() * 86400);

    // ---------- legendaries: a splitmix stream keyed by a one-at-a-time hash of the text, apart from every roll above ----------
    let oat = 0;
    for (let i = 2; i < hh.length + 2; i++) { oat = (oat + c.hash.charCodeAt(i)) >>> 0; oat = (oat + (oat << 10)) >>> 0; oat ^= oat >>> 6; }
    oat = (oat + (oat << 3)) >>> 0; oat ^= oat >>> 11; oat = (oat + (oat << 15)) >>> 0;
    const smx = () => { oat = (oat + 0x9e3779b9) >>> 0; let z = oat; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
    const lu = smx(), lp = smx(), lcv = smx();
    const legend = lu < 0.0022 ? (lp < 0.4 ? 'Phoenix' : lp < 0.7 ? 'Dodo' : 'Clockwork') : 'None';
    if (legend === 'None' && lcv < 0.005) holding = 'Golden Microphone';
    const embers = []; for (let i = 0; i < 10; i++) embers.push([smx(), smx(), smx()]);
    // something at its throat: a Marsaglia multiply-with-carry pair on two more slices of the hash
    let mz = (parseInt(hh.slice(4, 12), 16) & 0xffff) | 1, mw = (parseInt(hh.slice(36, 44), 16) & 0xffff) | 1;
    const mwc = () => { mz = (36969 * (mz & 65535) + (mz >>> 16)) >>> 0; mw = (18000 * (mw & 65535) + (mw >>> 16)) >>> 0; return (((mz << 16) + (mw & 65535)) >>> 0) / 4294967296; };
    for (let i = 0; i < 3; i++) mwc();
    const neckwear = choose({ None: 30, 'Bow Tie': 14, 'Bead Necklace': 13, Bandana: 12, 'Bell Collar': 11, Medal: 10, Pearls: 10 }, mwc);
    const flashName = ['Clock', 'Title', 'Header Bar'][flashWhat], faceName = facing > 0 ? 'Left' : 'Right';
    // its build: its own stream (a mulberry mix over an FNV fold of the hash, new salt), so no roll above moves
    let bw = 0x7a3c19e5;
    for (let i = 2; i < c.hash.length; i++) bw = Math.imul(bw ^ c.hash.charCodeAt(i), 0x01000193) >>> 0;
    const br = () => { bw = (bw + 0x6d2b79f5) >>> 0; let z = Math.imul(bw ^ (bw >>> 15), 1 | bw); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    br();
    const build = legend !== 'None' ? 'Classic' : choose({ Classic: 28, Plump: 20, Sleek: 20, Stubby: 16, Hunched: 16 }, br);
    // each build its own outline: body wider or narrower, taller or shorter, the head shifted, the tail longer or gone
    const [BRX, BRY, BHX, BHY, BTAIL] = { Classic: [0, 0, 0, 0, 0], Plump: [3.5, 1.2, 0, 1.5, -2], Sleek: [-2.5, 0.3, 0, 0, 6], Stubby: [1, -1.5, 1, 2.5, -9], Hunched: [1.5, 0, -3, 4, 0] }[build];
    if (legend !== 'None') {
      species = legend; eye = 'Bright';
      if (screen === 'Separated') screen = 'Contiguous';   // a legendary is always drawn solid
      if (legend === 'Phoenix') { page = 'Night Page'; crest = 'Smooth'; headwear = 'None'; if (holding === 'Top Hat') holding = 'Nothing'; }
      if (legend === 'Dodo') crest = 'Smooth';
      if (legend === 'Clockwork') crest = 'Curl';
      if (legend === 'Dodo' && pose === 'Hanging Upside Down') pose = 'Perched';
      c.trait('Legendary', legend); c.trait('Headwear', headwear); c.trait('Holding', holding); c.trait('Pose', pose); c.trait('Perch', perch); c.trait('Page', page); c.trait('Screen', screen);
      c.trait('Neckwear', neckwear); c.trait('Facing', faceName); c.trait('Flashing', flashName);
    } else {
    c.trait('Species', species); c.trait('Crest', crest); c.trait('Eye', eye); c.trait('Headwear', headwear);
    c.trait('Holding', holding); c.trait('Pose', pose); c.trait('Perch', perch); c.trait('Page', page); c.trait('Screen', screen);
    c.trait('Neckwear', neckwear); c.trait('Facing', faceName); c.trait('Flashing', flashName); c.trait('Build', build);
    }

    // the eight colours
    const K = 0, R = 1, G = 2, Y = 3, B = 4, M = 5, C = 6, Wt = 7;
    const RGB = [[0, 0, 0], [255, 0, 0], [0, 255, 0], [255, 255, 0], [0, 0, 255], [255, 0, 255], [0, 255, 255], [255, 255, 255]];
    // body, belly, wing coverts, wing pattern, flight feathers, head, crown, bare face, eye ring,
    // upper beak, lower beak, tail, tail tip, tail length 1..3, big beak, pattern
    // (pattern: 0 none, 1 head bars, 2 scallops, 3 coverts band, 4 grey dither, 5 rainbow)
    const SPX = {
      'Scarlet Macaw': [R, R, Y, G, B, R, R, Wt, Wt, Wt, K, R, B, 3, 1, 3],
      'Blue and Gold': [Y, Y, B, B, B, B, G, Wt, Wt, K, K, B, B, 3, 1, 0],
      'Green Amazon': [G, G, G, R, G, G, Y, G, Wt, Wt, Wt, G, Y, 2, 1, 0],
      Cockatoo: [Wt, Wt, Wt, Wt, Wt, Wt, Wt, Wt, C, K, K, Wt, Y, 1, 1, 0],
      Budgie: [G, G, Y, K, B, Y, Y, Y, Wt, Y, Y, B, B, 3, 0, 1],
      Lorikeet: [G, R, G, G, G, B, B, B, R, R, R, G, Y, 2, 0, 0],
      Hyacinth: [B, B, B, B, B, B, B, B, Y, K, K, B, B, 3, 1, 0],
      Galah: [M, M, Wt, Wt, Wt, M, Wt, M, R, Wt, Wt, Wt, Wt, 1, 0, 0],
      Eclectus: [G, G, G, R, B, G, G, G, G, R, K, G, Y, 1, 1, 0],
      'Sun Conure': [Y, Y, G, Y, B, Y, Y, R, Wt, K, K, G, B, 2, 0, 0],
      Rosella: [R, Y, K, Y, B, R, R, R, R, Wt, Wt, B, C, 3, 0, 2],
      Kea: [G, G, G, K, G, G, G, G, G, K, K, G, R, 1, 1, 2],
      'African Grey': [Wt, Wt, Wt, K, K, Wt, Wt, Wt, Wt, K, K, R, R, 2, 1, 4],
      Lovebird: [G, G, G, G, B, G, R, M, Wt, R, R, B, B, 1, 0, 0],
      'Golden Conure': [Y, Y, Y, Y, G, Y, Y, Y, Wt, Wt, Wt, Y, Y, 2, 0, 0],
      "Spix's Macaw": [C, C, B, B, B, C, Wt, K, Wt, K, K, B, B, 3, 1, 0],
      'Test Pattern': [Wt, Y, C, G, M, R, B, Wt, Wt, K, K, M, R, 3, 1, 5],
      // the legendaries (pattern 6: living flame, 7: brass clockwork)
      Phoenix: [R, Y, R, Y, Y, R, R, R, Wt, Y, Y, R, Y, 3, 1, 6],
      Dodo: [Wt, Wt, Wt, K, Wt, Wt, Wt, Wt, Y, Y, Y, Wt, Wt, 1, 1, 4],
      Clockwork: [Y, Wt, C, Wt, Y, Y, Y, Wt, Wt, Wt, Wt, Y, C, 2, 0, 7],
    }[species];
    const [BODY, BELLY, WING, WING2, FLIGHT, HEAD, CROWN, FACE, RING, BEAK0, LOWER0, TAIL, TIP, TAILN, BIGBEAK, PAT] = SPX;
    // each kind of parrot its own outline: body width and height, head size, tail length and tail width
    const macaw = [-1, 0, 0, 6, 2.1], SH = { 'Scarlet Macaw': macaw, 'Blue and Gold': macaw, Hyacinth: macaw, "Spix's Macaw": macaw, Lovebird: [-1.5, -2, -0.6, -4, 2.8], Budgie: [-1.5, -1.5, -0.8, 3, 1.4],
      Cockatoo: [1, 0.5, 0.3, -1, 3], Galah: [1, 0.5, 0.3, -1, 3], 'African Grey': [0.5, 0, 1.2, -2, 3.2], 'Green Amazon': [0.5, 0, 1, -2, 3.2], Eclectus: [1, 0, 0.5, -2, 3],
      Rosella: [0, 0, 0, 3, 2.8], 'Sun Conure': [-0.5, 0, 0, 2, 2.2], 'Golden Conure': [-0.5, 0, 0, 2, 2.2] }[species] || [0, 0, 0, 0, 2.6];
    // and its own wing marks instead of one shared dot grid: a band, a shoulder patch, bars, scallops, plain (only the kea is speckled)
    const WM = { 'Scarlet Macaw': 'band', 'Green Amazon': 'shoulder', Eclectus: 'shoulder', Budgie: 'scallop', Rosella: 'scallop', 'Sun Conure': 'bars', Kea: 'dots' }[species] || 'plain';
    let BEAK = BEAK0, LOWER = LOWER0;
    const RAINBOW = [Wt, Y, C, G, M, R, B];

    // 24 x 16 cells of 2 x 3 chunks = 48 x 48 chunks. Cell row 0 is the header, row 15 the links.
    const CW = 24, CH = 16, X = CW * 2, Yn = CH * 3, TOP = 3, BOT = 45;
    const img = new Uint8Array(X * Yn), pri = new Uint8Array(X * Yn), lay = new Uint8Array(X * Yn);
    let layer = 1;
    // how much each chunk matters when a cell has to drop a colour: eyes and beaks win over feathers
    let rank = 1;
    const put = (x, y, v) => { if (v >= 0 && x >= 0 && y >= TOP && x < X && y < BOT) { img[y * X + x] = v; pri[y * X + x] = rank; lay[y * X + x] = layer; } };
    // the bird layer goes through a transform: facing, hanging upside down, bob and swing
    let fx = 1, flipY = false, ox = 0, oy = 0, sc = 1, lift = 0, hdx = 0, hdy = 0, hm = 0;
    const Pb = (x, y, v) => {
      if (hm) x = hm - x;   // a preening head turns round to face its back
      if (sc !== 1) { x = 26 + (x - 26) * sc; y = 40 + (y - 40) * sc; }
      x = Math.floor(x + ox + hdx); y = Math.floor(y + oy + hdy - lift);
      if (fx < 0) x = X - 1 - x;
      if (flipY) y = 49 - y;
      put(x, y, v);
    };
    let P = Pb;
    const disc = (cxx, cyy, rx, ry, v) => {
      for (let y = Math.floor(cyy - ry); y <= cyy + ry; y++) for (let x = Math.floor(cxx - rx); x <= cxx + rx; x++) {
        const p = (x + 0.5 - cxx) / rx, q = (y + 0.5 - cyy) / ry;
        if (p * p + q * q <= 1) P(x, y, typeof v === 'function' ? v(x, y, p, q) : v);
      }
    };
    const sprite = (rows, x0, y0, map) => {
      for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) {
        const ch = rows[j][i];
        if (ch !== '.') P(x0 + i, y0 + j, map[ch]);
      }
    };

    // ---------- the pages behind the bird, each built once ----------
    const pageCache = {}, calmCache = {};
    // a page colour that would swallow the bird steps aside
    const clash = new Set([BODY, HEAD, WING, FLIGHT]);
    // the land on the weather map: a few lumps from a fixed sum of waves
    const landAt = (x, y) => Math.sin(x * 0.21 + 1.3) * 3 + Math.sin(y * 0.17 + x * 0.05) * 4 + Math.sin(x * 0.07 - y * 0.11 + 2) * 5;
    const fwBursts = [[7, 10, 5, M], [41, 9, 5, Y], [40, 30, 4, C], [6, 31, 4, R], [25, 6, 3, G]];
    function buildPage(name) {
      if (pageCache[name]) return pageCache[name];
      const pg = new Uint8Array(X * Yn);
      const set = (x, y, v) => { x = Math.floor(x); y = Math.floor(y); if (x >= 0 && y >= TOP && x < X && y < BOT) pg[y * X + x] = v; };
      const blob = (ox2, oy2, rx, ry, v) => { for (let y = Math.floor(oy2 - ry); y <= oy2 + ry; y++) for (let x = Math.floor(ox2 - rx); x <= ox2 + rx; x++) { const p = (x + 0.5 - ox2) / rx, q = (y + 0.5 - oy2) / ry; if (p * p + q * q <= 1) set(x, y, v); } };
      for (let y = TOP; y < BOT; y++) for (let x = 0; x < X; x++) {
        let v = K;
        if (name === 'Sky Bands') v = y < 30 ? (Math.floor(y / 6) % 2 ? C : B) : B;
        else if (name === 'Jungle') v = K;
        else if (name === 'Colour Bars') v = [Wt, Y, C, G, M, R, B, K][Math.floor(x / 6)];
        else if (name === 'Sunset Page') v = y < 14 ? M : y < 22 ? R : y < 28 ? Y : B;
        else if (name === 'Weather Map') v = landAt(x, y) > 4.2 + (y - 24) * 0.1 ? G : B;
        else if (name === 'Snow Page') v = y > 40 - Math.round(Math.sin(x * 0.3) * 1.5) ? Wt : B;
        else if (name === 'Beach') v = y < 24 ? C : y < 33 ? B : (y < 35 && (x + y) % 4 === 0 ? Wt : Y);
        else if (name === 'Cityline') {
          const bw = 5, bi = Math.floor(x / bw), side = x < 12 || x > 37, hgt = side ? 18 + ((bi * 7 + 3) % 4) * 5 : 6;
          v = y > BOT - hgt ? ((x % bw) > 1 && (x % bw) < bw - 1 && y % 3 === 1 && (bi * 5 + y) % 7 < 3 ? Y : B) : K;
        }
        pg[y * X + x] = v;
      }
      if (name === 'Jungle') {
        // vines down the two edges, leaves hung off them, the middle left dark for the bird
        for (let y = TOP; y < BOT; y++) { set(2 + Math.sin(y * 0.3) * 1.2, y, G); set(45 + Math.sin(y * 0.27 + 2) * 1.2, y, G); }
        for (const l of leaves) {
          const lx = l[0] < 24 ? 3 + l[0] * 0.22 : 44 - (47 - l[0]) * 0.22, dx = l[0] < 24 ? 1 : -1, dy = l[2] ? -0.55 : 0.55, n = Math.hypot(1, dy);
          for (let s2 = -4; s2 <= 4; s2 += 0.5) { const wd = 1.9 * (1 - (s2 / 4.6) ** 2); for (let a2 = -wd; a2 <= wd; a2 += 0.5) set(lx + (dx * s2 - dy * a2) / n, l[1] + (dy * s2 * dx + a2) / n, G); }
        }
      }
      if (name === 'Night Page') { for (const s of starsP) set(s[0], s[1], Y); blob(40, 9, 4, 4, Wt); blob(42, 8, 3.4, 3.6, K); }
      if (name === 'Weather Map') {
        // sun and cloud symbols and a temperature in a box, the way weather pages showed them
        blob(9, 9, 2.6, 2.6, Y); for (const [dx, dy] of [[-4, 0], [4, 0], [0, -4], [0, 4]]) set(9 + dx, 9 + dy, Y);
        blob(38, 30, 3.5, 2, Wt); blob(41, 29, 2.5, 2, Wt);
        for (let x = 30; x < 36; x++) for (let y = 12; y < 15; y++) set(x, y, R);
      }
      if (name === 'Snow Page') for (let i = 0; i < 40; i++) set((i * 29 + 7) % X, TOP + ((i * 17) % 36), Wt);
      if (name === 'Beach') { blob(39, 10, 4, 4, Y); for (let x = 0; x < X; x += 5) set(x + 2, 30, Wt); }
      if (name === 'Cityline') { blob(8, 8, 3, 3, Wt); for (const s of starsP) if (s[1] < 20) set(s[0], s[1], Wt); }
      if (name === 'Fireworks') for (const [bx, by, br, bc] of fwBursts) {
        set(bx, by, Wt);
        for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283 + br; set(bx + Math.cos(an) * br, by + Math.sin(an) * br, bc); set(bx + Math.cos(an) * (br - 2), by + Math.sin(an) * (br - 2), bc); }
      }
      // a page colour that would swallow the bird changes to one that doesn't, each to its own
      const used = new Set(pg), swap = [0, 1, 2, 3, 4, 5, 6, 7];
      for (const v of used) if (clash.has(v)) {
        for (const alt of [K, B, C, M, R, G, Y, Wt]) if (!clash.has(alt) && !used.has(alt)) { swap[v] = alt; used.add(alt); break; }
      }
      for (let i = 0; i < pg.length; i++) pg[i] = swap[pg[i]];
      pageCache[name] = pg;
      // the quiet colour of each row (what the page is mostly made of there); the test bars quieten to black
      const calm = new Uint8Array(Yn), n8 = new Uint16Array(8);
      for (let y = TOP; y < BOT; y++) { n8.fill(0); for (let x = 0; x < X; x++) n8[pg[y * X + x]]++; let best = 0; for (let k = 1; k < 8; k++) if (n8[k] > n8[best]) best = k; calm[y] = name === 'Colour Bars' ? swap[K] : best; }
      calmCache[name] = calm;
      return pg;
    }
    const PAGES = ['Sky Bands', 'Jungle', 'Night Page', 'Colour Bars', 'Sunset Page', 'Weather Map', 'Snow Page', 'Beach', 'Cityline', 'Fireworks'];
    const SHORT = { 'Sky Bands': 'SKY', Jungle: 'WILD', 'Night Page': 'NIGHT', 'Colour Bars': 'TEST', 'Sunset Page': 'DUSK', 'Weather Map': 'MAP', 'Snow Page': 'SNOW', Beach: 'BEACH', Cityline: 'CITY', Fireworks: 'PARTY' };
    // the four coloured links lead to four other pages, chosen per hash
    const links = [];
    { let k = Math.floor(lr() * PAGES.length); while (links.length < 4) { k = (k + 3) % PAGES.length; if (PAGES[k] !== page && !links.includes(PAGES[k])) links.push(PAGES[k]); else k++; } }
    let shown = page, before = page, flipAt = -9, shownNo = pageNo;
    // perch and hat colours step aside from the bird's own and from the page colours around them
    const pageNear = (x0, x1, y0, y1) => {
      const pg = buildPage(page), n = new Uint16Array(8), out = new Set();
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) n[pg[y * X + x]]++;
      for (let k = 0; k < 8; k++) if (n[k] > (x1 - x0) * (y1 - y0) * 0.12) out.add(k);
      return out;
    };
    const away = (v, avoid) => { if (!avoid.has(v)) return v; for (const alt of [R, Wt, Y, C, M, B, G, K]) if (!avoid.has(alt)) return alt; return v; };
    const perchMain = { Branch: R, Rope: Y, 'Bird Bath': Wt, 'Ring Swing': Y, Ladder: Y, Cage: Wt, 'Palm Frond': G, 'Fence Post': Y, Teacup: Wt, 'TV Aerial': Wt, 'Treasure Chest': R }[perch];
    const perchAvoid = pageNear(0, X, 36, 45);
    for (const v of [BODY, WING, FLIGHT, TAIL]) perchAvoid.add(v);
    const perchCol = away(perchMain, perchAvoid);
    const pMap = v => v === perchMain ? perchCol : v;
    const hatMain = { None: -1, 'Top Hat': M, 'Party Hat': M, 'Pirate Bandana': R, Bow: M, 'Sailor Cap': Wt, Fez: R, Crown: Y, Halo: Y }[headwear];
    const hatAvoid = pageNear(12, 32, 3, 12);
    for (const v of [HEAD, CROWN, BODY]) hatAvoid.add(v);
    const hatCol = hatMain < 0 ? -1 : away(hatMain, hatAvoid);
    // a dark beak on a dark page would vanish: it turns pale, the way the set would have drawn it
    const beakAvoid = pageNear(4, 44, 10, 26);
    if (beakAvoid.has(BEAK)) BEAK = BEAK === K ? Wt : away(BEAK, new Set([...beakAvoid, HEAD, FACE]));
    if (beakAvoid.has(LOWER)) LOWER = LOWER === K ? (BEAK === Wt ? Y : Wt) : away(LOWER, new Set([...beakAvoid, HEAD, FACE, BEAK]));
    const hMap = v => v === hatMain ? hatCol : v;
    const keyCol = away(Y, pageNear(32, 48, 18, 32));   // brass, unless the page there is yellow

    // ---------- the bird ----------
    const hang = pose === 'Hanging Upside Down', puff = pose === 'Puffed Up' ? 1.4 : 0;
    const preen = pose === 'Preening', cocked = pose === 'Head Cocked';
    const HX = BHX + (preen ? 5 : cocked ? -1.5 : 0), HY = BHY + (preen ? 4 : cocked ? 2 : 0), HM = preen ? 42 : 0;
    const BEAKBIG = ['..UUUUUU', '.UUUUUUU', 'UUUUUUUU', 'UUUUUUUU', 'UUU.NNUU', 'UU.LLLLN', 'UU.LLLLL', '.U.LLLLL', '...LLLL.', '....LL..'];
    const BEAKSMALL = ['.UUUU', 'UUUUU', 'UU.NN', 'U.LLL', '..LL.'];
    const PY = 40;
    function perchAt(py, swing) {
      layer = 2;
      const P = (x, y, v) => Pb(x, y, pMap(v));
      if (perch === 'Branch') {
        for (let x = 0; x < X; x++) { const yy = py + Math.round((x - 24) * 0.04); P(x, yy + 1, R); P(x, yy + 2, x % 7 === 2 ? Y : R); }
        for (let x = 4; x < 9; x++) P(x, py, G);
        P(42, py, G); P(43, py - 1, G); P(44, py - 1, G);
      } else if (perch === 'Rope') { for (let x = 0; x < X; x++) { P(x, py + 1, (x >> 1) % 2 ? Y : Wt); P(x, py + 2, (x >> 1) % 2 ? Wt : Y); } }
      else if (perch === 'Bird Bath') { for (let x = 6; x < 42; x++) { P(x, py + 1, Wt); P(x, py + 2, C); } for (let y = py + 3; y < 46; y++) for (let x = 22; x < 25; x++) P(x, y, Wt); }
      else if (perch === 'Ring Swing') { for (let k = 0; k < 400; k++) { const an = k / 400 * 6.283; P(24 + swing + Math.cos(an) * 15, (py - 15) + Math.sin(an) * 15 + 1, Y); } for (let y = 0; y < py - 30; y++) P(24 + swing, y, Y); }
      else if (perch === 'Ladder') { for (let y = py - 6; y < 46; y++) { P(15, y, Y); P(38, y, Y); } for (const y of [py + 1, py + 5, py - 4]) for (let x = 15; x <= 38; x++) P(x, y, Y); }
      else if (perch === 'Cage') { for (let x = 3; x < X; x += 6) for (let y = 3; y < 46; y++) P(x, y, Wt); for (let x = 0; x < X; x++) { P(x, py + 1, Y); P(x, 44, Wt); } }
      else if (perch === 'Palm Frond') {
        for (let x = 0; x < X; x++) { const yy = py + 1 + Math.round(Math.sin(x / 47 * 3) * 1.2); P(x, yy, G); P(x, yy + 1, Y); if (x % 3 === 0) for (let k = 2; k < 5; k++) P(x - k * 0.6, yy + k, G); }
      } else if (perch === 'Fence Post') { for (let y = py + 1; y < 46; y++) for (let x = 20; x < 32; x++) P(x, y, x === 20 || x === 31 ? K : (x + y * 3) % 7 === 0 ? R : Y); for (let x = 0; x < X; x++) if (x < 20 || x > 31) { P(x, py + 3, Y); P(x, py + 4, R); } }
      else if (perch === 'Teacup') {
        // a teacup with a band and a handle, on its saucer
        for (let y = py + 1; y < py + 6; y++) { const half = y < py + 4 ? 9 : 9 - (y - py - 3) * 1.5; for (let x = 26 - half; x <= 26 + half; x++) P(x, y, y === py + 2 ? M : y === py + 3 && (x & 1) ? M : Wt); }
        for (const [dx, dy] of [[10, 1], [11, 1], [12, 2], [12, 3], [11, 4]]) P(26 + dx, py + dy, Wt);
        for (let x = 12; x < 41; x++) P(x, py + 6, Wt);
      } else if (perch === 'TV Aerial') {
        for (let y = 41; y < 46; y++) for (let x = 0; x < X; x++) P(x, y, (x + (y % 2) * 2) % 4 === 0 ? K : R);
        for (let y = py + 1; y < 41; y++) P(36, y, Wt);
        for (let x = 4; x < 44; x++) P(x, py + 1, Wt);
        for (let x = 6; x < 44; x += 5) for (let k = -2; k <= 2; k++) P(x, py + 1 + k, Wt);
      } else if (perch === 'Treasure Chest') {
        for (let y = py + 1; y < 46; y++) for (let x = 12; x < 40; x++) P(x, y, x === 12 || x === 39 || y === py + 4 ? Y : (x === 25 || x === 26) && y > py + 4 && y < py + 7 ? Wt : R);
        for (let x = 13; x < 39; x++) P(x, py + 1, (x % 3) ? Y : Wt);
        // gold spilling over the rim
        for (const [dx, dy] of [[8, 0], [9, 0], [10, 1], [9, 2], [11, 3], [7, 4], [10, 5], [41, 2], [42, 4], [40, 5]]) P(dx, py + dy, dy % 2 ? Wt : Y);
      }
    }

    function chick(x0, y0) {
      disc(x0, y0, 3.2, 2.8, Y); disc(x0 - 1, y0 - 3.3, 2.2, 2, Y);
      P(x0 - 2, y0 - 4, K); P(x0 - 4, y0 - 3, R); P(x0 - 4, y0 - 4, R);
      P(x0 - 1, y0 + 3, R); P(x0 + 1, y0 + 3, R);
    }

    function bird(t, gape, excited, listen) {
      const bob = gape ? 1 : pose === 'Dancing' ? (Math.sin(t * 6.2 + bobPh) > 0 ? 1 : 0) : Math.sin(t * 1.7 + bobPh) > 0.6 ? 1 : 0;
      const cock = listen ? 1 : 0;
      const swing = perch === 'Ring Swing' ? Math.round(Math.sin(t * 1.3) * 1.2) : 0;
      fx = legend === 'Dodo' && hov ? (hov[0] < 24 ? 1 : -1) : facing; flipY = hang; ox = 0; oy = 0; sc = 1;
      lift = perch === 'Teacup' ? 3 : /Chest|Post|Bath|Aerial/.test(perch) ? 2 : 0;
      perchAt(PY, swing); layer = 1;
      sc = 0.92;
      if (pose === 'With Chick') chick(9, PY - 3 + (Math.sin(t * 2.3) > 0.7 ? 1 : 0));
      ox = swing; oy = bob;
      const dodo = legend === 'Dodo', rb = puff + (dodo ? 2.4 : 0) + BRX + SH[0], ry = 10.5 + puff * 0.6 + (dodo ? 1 : 0) + BRY + SH[1];
      const since = t - legAt;
      if (legend === 'Phoenix') {
        // a tail of fire streaming down past the perch, flickering
        for (let f = 0; f < 5; f++) {
          const h = 15 + f * 2 + Math.round(Math.sin(t * 4 + f * 1.7) * 2) + (since < 0.6 ? 3 : 0) + (hov ? 2 : 0), x0 = 30 + f * 3, y0 = 31 - f * 0.6;
          for (let j = 0; j < h; j++) {
            const u = j / h, w = (1 - u) * 1.1 + 0.25, xc = x0 + j * (0.1 + f * 0.04) + Math.sin(t * 5 + j * 0.45 + f) * u * 2.2, y = y0 - j;
            for (let xx = -w; xx <= w; xx += 0.5) { const fl = (Math.floor(xc + xx) + y + Math.floor(t * 10)) % 7 === 0; P(xc + xx, y, u > 0.82 ? (fl ? Y : Wt) : u > 0.45 ? (fl ? R : Y) : (fl ? Y : R)); }
          }
        }
        for (let k = 0; k < 8; k++) { const y = 35 + k * 0.85, w = 2.4 - k * 0.1, sway = Math.sin(t * 3 + k * 0.6) * (k / 7); for (let xx = -w; xx <= w; xx++) P(31 + xx + k * 0.75 + sway, y, Math.floor(k + t * 8 + xx) % 4 === 0 ? Wt : k > 9 ? Y : (k + Math.floor(t * 6)) % 3 ? R : Y); }
      }
      if (legend === 'Clockwork') {
        // the wind-up key in its back, turning (faster under the pointer, a notch per tap)
        // a brass shaft and a figure-eight bow that turns face-on, three-quarter, edge-on, three-quarter
        const turn = Math.floor(t * (hov ? 6 : 2) + keyTurns) % 4;
        for (let k = 0; k < 6; k++) { P(34 + k, 25, keyCol); P(34 + k, 26, keyCol); }
        const BOW = [['.YYY.', 'YY.YY', 'YY.YY', '.YYY.', '..Y..', '.YYY.', 'YY.YY', 'YY.YY', '.YYY.'], ['.YY.', 'Y.YY', 'Y.YY', '.YY.', '.Y..', '.YY.', 'Y.YY', 'Y.YY', '.YY.'], ['YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY'], ['.YY.', 'YY.Y', 'YY.Y', '.YY.', '..Y.', '.YY.', 'YY.Y', 'YY.Y', '.YY.']][turn];
        sprite(BOW, 40 + (turn === 2 ? 1 : 0), 21, { Y: keyCol });
      }
      // tail behind
      const tl = Math.max(0, [0, 4, 7, 9][TAILN] + BTAIL + SH[3]), TW = SH[4];
      for (let y = 35; y < 35 + tl; y++) { const w = Math.max(0.5, TW - (y - 35) * 0.16 * TW / 2.6 * (tl > 9 ? 9 / tl : 1)); for (let x = -w; x <= w; x++) P(30 + x + (y - 35) * 0.45, y, y > 35 + tl - 3 ? TIP : TAIL); }
      // fan crest goes behind the head
      hdx = HX; hdy = HY; hm = HM;
      if (crest === 'Fan') for (let k = 0; k < 9; k++) { const an = Math.PI * (0.95 + k * 0.13); for (let r = 6; r < 11; r++) P(22 + Math.cos(an) * r * 0.9, 16 + Math.sin(an) * r, k % 2 ? B : R); }
      hdx = 0; hdy = 0; hm = 0;
      // body: chest forward, belly lower, puffed bodies get a ragged edge
      disc(27, 29.5, 8 + rb, ry, (x, y, p, q) => {
        if (PAT === 5) return RAINBOW[Math.floor((y - 19) / 3) % 7];
        if (PAT === 6) return q > 0.1 && p < 0.45 ? Y : R;   // the phoenix: a solid red body, a yellow belly
        if (PAT === 7) return p * p + q * q > 0.86 ? K : q > 0.1 && p < 0.45 ? (x % 3 === 1 && y % 3 === 1 ? K : Wt) : y % 6 === 0 ? K : x % 3 === 1 && y % 6 === 3 ? Wt : Y;   // riveted brass panels
        if (puff && p * p + q * q > 0.82 && (x * 3 + y) % 4 === 0) return -1;
        if (PAT === 4) return y % 3 === 1 && (x + Math.floor(y / 3)) % 3 === 0 ? K : Wt;
        return q > 0.1 && p < 0.45 ? BELLY : BODY;
      });
      if (species === 'Lorikeet') disc(24, 26, 4.5, 2.4, Y);
      if (species === 'Blue and Gold') for (let x = 14; x < 21; x++) P(x, 23, K);
      // wings
      if (pose === 'Wing Stretch') {
        // the near wing raised high behind the back: a fan of long feathers
        for (let k = 0; k < 8; k++) {
          const an = -0.55 - k * 0.15, len = 13 + k * 1.1;
          for (let r = 2; r < len; r++) for (let wdt = -1; wdt <= 0.5; wdt += 0.5) P(31 + Math.cos(an) * r + wdt * Math.sin(an), 25 + Math.sin(an) * r - wdt * Math.cos(an), r > len - 5 ? (species === 'Kea' ? R : FLIGHT) : r < 6 ? WING : k % 2 ? WING : WING2 === K ? FLIGHT : WING2);
        }
      } else {
        const flap = excited && Math.sin(t * 18) > 0 ? -1 : 0;
        disc(30.5, 28.5 + flap + (dodo ? 1 : 0), dodo ? 4.2 : 6 + rb * 0.6, dodo ? 5.5 : 9.5, (x, y, p, q) => {
          if (PAT === 5) return RAINBOW[(Math.floor((x + y) / 3) + 3) % 7];
          if (PAT === 6) return q > 0.55 ? ((x + Math.floor(t * 9)) % 3 ? Y : Wt) : q > 0.15 || p * p + q * q > 0.7 ? Y : R;   // red, edged in yellow, flames flickering only at the tips
          if (PAT === 7) { const r2 = p * p + q * q, an = Math.atan2(q, p) + Math.PI; if (r2 > 0.74) return Math.floor(an / (Math.PI / 7) + t * 1.5) % 2 ? Y : -1; if (r2 > 0.6 || r2 < 0.12) return K; return Math.floor(an / (Math.PI / 3) - t * 1.5) % 2 ? Y : Wt; }   // a gear: teeth round the rim, turning spokes
          if (dodo) {
            if (q > 0.15) return (x * 2 + y) % 6 === 0 ? K : FLIGHT;
            const band = Math.floor((y - 19) / 3); return (y - 19) % 3 === 2 && (x + band) % 2 === 0 ? WING2 : WING;
          }
          if (q > 0.15) return WM === 'scallop' && x % 3 === 0 ? K : FLIGHT;   // long flight feathers, solid
          if (WM === 'band') return q < -0.4 ? WING : WING2;
          if (WM === 'shoulder') return p < 0.05 && q < -0.25 ? WING2 : WING;
          if (WM === 'bars') return (y - 19) % 4 === 3 ? WING2 : WING;
          if (WM === 'scallop') { const band = Math.floor((y - 19) / 3); return (y - 19) % 3 === 2 && (x + band) % 2 === 0 ? WING2 : WING; }
          if (WM === 'dots') return q > -0.1 && (x + y) % 5 === 0 ? WING2 : WING;
          return WING;
        });
        if (!dodo) for (let y = 37; y < 41; y++) for (let x = 31 + (y - 37) * 0.5; x < 35 - (y - 37) * 0.3; x++) P(x, y + flap, FLIGHT);
        else for (const [a, b2] of [[35, 28], [36, 27], [37, 27], [38, 28], [37, 29], [36, 30], [38, 30]]) P(a, b2, (a + b2) % 2 ? Wt : Y);
      }
      if (legend === 'Phoenix') {
        // embers rising off it, drawn toward the pointer (behind its head, so they never cover its face)
        for (const [a, b2, c2] of embers) { const u = (t * (0.25 + c2 * 0.3) + a) % 1, ex2 = 26 + (b2 - 0.5) * 22, tx = hov ? hov[0] : ex2; P(ex2 + (tx - ex2) * u * 0.7 + Math.sin(t * 2 + a * 9), 34 - u * 30 - bob, u < 0.5 ? Y : R); }
      }
      // head, cocked down one chunk while it listens (the build shifts it, and all it wears and holds, as one)
      hdx = HX; hdy = HY; hm = HM;
      const hy = 16.5 + cock, hr = 7.5 + puff * 0.5 + SH[2];
      disc(21, hy, hr, 7 + puff * 0.4 + SH[2] * 0.8, (x, y, p, q) => {
        if (PAT === 5) return q < -0.3 ? R : q < 0.2 ? Y : G;
        if (PAT === 6) return R;   // the phoenix's head is plain red, so its eye reads
        if (PAT === 7) return p * p + q * q > 0.84 ? K : x % 4 === 0 && y % 4 === 2 && q < 0 ? Wt : Y;
        if (q < -0.45 && p < 0.35) return CROWN;
        if (PAT === 1 && p > 0.05 && (y % 2 === 0)) return K;
        if (PAT === 4) return p > 0.25 && y % 3 === 0 && (x + Math.floor(y / 3)) % 3 === 1 ? K : HEAD;
        return HEAD;
      });
      if (species === 'Rosella' || species === 'Budgie') disc(17, hy + 4.2, 2.5, 1.8, species === 'Rosella' ? Wt : B);
      if (FACE !== HEAD) disc(18.3, hy, 4.2, 3.7, FACE);
      if (species === 'Blue and Gold') for (const y of [hy + 1, hy + 2.5]) for (let x = 15; x < 20; x++) P(x, y, K);
      // crest
      const cc = species === 'Cockatoo' ? Y : species === 'Galah' ? Wt : PAT === 5 ? M : HEAD;
      if ((species === 'Cockatoo' || species === 'Galah') && crest === 'Raised') {
        // a cockatoo's crest: five long feathers fanning back, their tips curling forward
        const rise = excited ? 2 : 0;
        for (let f = 0; f < 5; f++) { const len = 8 + f * 0.8 + rise, an = -1.3 + f * 0.17; for (let k = 0; k < len; k++) { const curl = k > len * 0.65 ? (k - len * 0.65) * 0.9 : 0, x = 20 + f * 1.1 + Math.cos(an) * k - curl, y = hy - 5.5 + Math.sin(an) * k + curl * 0.2; P(x, y, cc); P(x + 1, y, cc); } }
      } else if (crest === 'Raised' || (crest === 'Smooth' && excited)) {
        const rise = excited ? 2 : 0;
        for (let k = 0; k < 7 + rise; k++) { P(23 + k * 0.6, hy - 8.5 - k, cc); P(24 + k * 0.6, hy - 8.5 - k, cc); P(26 + k * 0.8, hy - 7.5 - k * 0.7, cc); }
      } else if (crest === 'Punk') { for (let k = 0; k < 5; k++) for (let h = 0; h < 4 + (excited ? 1 : 0); h++) P(17 + k * 2, hy - 8.5 - h - (k % 2), k % 2 ? TIP : cc); }
      else if (crest === 'Curl') { for (const [dx, dy] of [[0, 0], [0, -1], [1, -2], [2, -3], [3, -3], [4, -2], [4, -1], [3, 0]]) P(21 + dx, hy - 8 + dy - (excited ? 1 : 0), cc === Wt ? Y : cc); }
      else if (crest === 'Plume') { for (let k = 0; k < 9; k++) { P(25 + k, hy - 7 - k * 0.5 - (excited ? 1 : 0), k > 5 ? TIP : cc); P(25 + k, hy - 6 - k * 0.5, cc); } }
      // eye
      rank = 4;
      const ex = 18.5, ey = hy - 1.2;
      const blink = (t + blinkOff) % blinkGap < 0.18;
      const ew = eye === 'Eyepatch' ? 'Eyepatch' : excited ? 'Pinned' : eye;
      if (species === 'Hyacinth') disc(ex + 0.5, ey + 0.5, 3.1, 3.1, RING);
      if (legend === 'Clockwork') {
        // a gear for an eye, its spokes turning
        disc(ex + 0.5, ey + 0.5, 2.6, 2.6, Wt);
        const a0 = t * (hov ? 5 : 1.5);
        for (let k = 0; k < 3; k++) { const a = a0 + k * 2.094; P(ex + 0.5 + Math.cos(a) * 1.6, ey + 0.5 + Math.sin(a) * 1.6, K); }
        P(ex, ey, blink ? Wt : C); P(ex + 1, ey, K);
      } else if (ew === 'Eyepatch') { disc(ex + 0.5, ey + 0.5, 2.6, 2.4, K); for (let k = -8; k < 9; k++) P(ex + k, ey - 1 - k * 0.55, K); }
      else if (blink || (ew === 'Sleepy' && Math.sin(t * 0.7) < 0.6)) { for (let x = -1; x <= 1; x++) P(ex + x, ey + 0.5, K); if (ew === 'Sleepy') for (let x = -1; x <= 2; x++) P(ex + x, ey - 0.5, HEAD === K ? B : HEAD); }
      else if (ew === 'Pinned') { disc(ex + 0.5, ey + 0.5, 1.9, 1.9, BEAK === Y ? Wt : Y); P(ex, ey, K); }
      else if (ew === 'Wink') { P(ex - 1, ey + 0.5, K); P(ex, ey - 0.5, K); P(ex + 1, ey - 0.5, K); P(ex + 2, ey + 0.5, K); P(ex + 2, ey - 1.5, K); }   // a closed eye, a lash flicked up
      else if (ew === 'Heart Eyes') sprite(['R.R', 'RRR', '.R.'], ex - 1, ey - 1, { R: R === HEAD ? M : R });
      else { disc(ex + 0.5, ey + 0.5, 1.8, 1.8, K); P(ex, ey - 1, Wt); }
      if (ew === 'Lashes' && !blink) { P(ex - 1, ey - 2, K); P(ex + 1, ey - 2.5, K); P(ex + 2, ey - 2, K); }
      if (eye === 'Monocle') { for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283; P(ex + 0.5 + Math.cos(an) * 3.3, ey + 0.5 + Math.sin(an) * 3.3, Y); } for (let k = 0; k < 9; k++) P(ex + 3 + k * 0.5, ey + 3 + k, Y); }
      // the beak, hooked, opening a little while it sings
      rank = 3;
      if (BIGBEAK) {
        const map = { U: BEAK, L: species === 'Eclectus' ? Y : LOWER, N: BEAK === K ? Wt : K };
        sprite(BEAKBIG.slice(0, 5), 7, hy - 3.5, map);
        sprite(BEAKBIG.slice(5), 7, hy + 1.5 + gape, map);
        for (let g = 0; g < gape; g++) for (let x = 10; x < 14; x++) P(x, hy + 1.5 + g, R === HEAD ? M : R);
      } else {
        sprite(BEAKSMALL.slice(0, 3), 10, hy - 1.5, { U: BEAK, L: LOWER, N: BEAK === K ? Wt : K });
        sprite(BEAKSMALL.slice(3), 10, hy + 1.5 + gape, { U: BEAK, L: LOWER });
        for (let g = 0; g < gape; g++) for (let x = 11; x < 14; x++) P(x, hy + 1.5 + g, R === HEAD ? M : R);
        if (species === 'Budgie') { P(13, hy - 2.5, B); P(14, hy - 2.5, B); }
      }
      // what it wears at its throat, in colours that step aside from its feathers
      if (neckwear !== 'None' && !hang) {
        rank = 3;
        const nav = new Set([BODY, BELLY, HEAD, FACE]), nc = v => away(v, nav), ty = hy + 6;
        if (neckwear === 'Bow Tie') sprite(['AA.AA', 'AAWAA', 'AA.AA'], 17, ty, { A: nc(M), W: Wt === nc(M) ? Y : Wt });
        else if (neckwear === 'Bead Necklace') for (let x = 15; x <= 25; x++) P(x, ty + Math.round((x - 20) ** 2 / 14), x % 2 ? nc(Y) : nc(C));
        else if (neckwear === 'Bandana') { for (let r = 0; r < 4; r++) for (let x = 15 + r * 1.5; x <= 25 - r * 1.5; x++) P(x, ty + r, (x + r) % 3 === 0 ? Wt : nc(R)); }
        else if (neckwear === 'Bell Collar') { for (let x = 15; x <= 25; x++) P(x, ty, nc(R)); disc(20.5, ty + 2.2, 1.6, 1.5, nc(Y)); P(20, ty + 3, K); }
        else if (neckwear === 'Medal') { P(19, ty, nc(B)); P(21, ty, nc(B)); P(20, ty + 1, nc(B)); disc(20.5, ty + 3, 1.6, 1.6, nc(Y)); P(20, ty + 2, Wt); }
        else for (let x = 15; x <= 25; x++) P(x, ty + Math.round((x - 20) ** 2 / 16), x % 2 ? Wt : nc(Wt) === Wt ? C : nc(Wt));
        rank = 1;
      }
      // feet gripping the perch, one lifted when it dances
      const footUp = pose === 'Dancing' && Math.sin(t * 3.1 + bobPh) > 0.3 ? 2 : 0;
      oy = 0; hdx = 0; hdy = 0; hm = 0;
      const footC = dodo ? Y : K;
      for (const [fxx, up] of [[24, footUp], [30, 0]]) { P(fxx, PY - up, footC); P(fxx + 1, PY - up, footC); P(fxx + 2, PY - up, footC); P(fxx - 0.4, PY + 1 - up, footC); P(fxx + 2.6, PY + 1 - up, footC); if (dodo) { P(fxx + 1, PY - 1 - up, Y); P(fxx + 1, PY - 2 - up, Y); } }
      oy = bob; hdx = HX; hdy = HY; hm = HM;
      // what it holds, at the tip of the beak
      rank = 2;
      const hx0 = BIGBEAK ? 0 : 3, hy0 = hy - 16.5;
      const hold = (rows, x0, y0, map) => sprite(rows, x0 + hx0, y0 + hy0, map);
      if (holding === 'Cracker') { for (let y = 20; y < 26; y++) for (let x = 5; x < 11; x++) P(x + hx0, y + hy0, (x + y) % 3 === 0 ? R : Y); }
      else if (holding === 'Cherry') { disc(9 + hx0, 24 + hy0, 2.6, 2.6, R); P(10 + hx0, 20 + hy0, G); P(11 + hx0, 19 + hy0, G); P(8 + hx0, 23 + hy0, Wt); }
      else if (holding === 'Seed') { P(10 + hx0, 21 + hy0, Wt); P(9 + hx0, 22 + hy0, Y); P(10 + hx0, 22 + hy0, Y); }
      else if (holding === 'Chili') hold(['....G', '...RG', '..RR.', '.RR..', 'RR...', 'R....'], 5, 20, { R: R, G: G });
      else if (holding === 'Grapes') hold(['..G..', '.MMM.', 'MMMMM', '.MWM.', '.MMM.', '..M..'], 6, 20, { G: G, M: M, W: Wt });
      else if (holding === 'Walnut') hold(['.YYY.', 'YKYKY', 'YYKYY', 'YKYKY', '.YYY.'], 6, 20, { Y: Y, K: K });
      else if (holding === 'Key') hold(['YYY......', 'Y.YYYYYYY', 'YYY...Y.Y'], 3, 21, { Y: Y });
      else if (holding === 'Bell') hold(['..Y..', '.YYY.', '.YYY.', 'YYYYY', '..K..'], 6, 20, { Y: Y, K: K });
      else if (holding === 'Letter') hold(['WWWWWWW', 'WKWWWKW', 'WWKWKWW', 'WWWKWWW', 'WWWWWWW'], 3, 20, { W: Wt, K: K });
      else if (holding === 'Strawberry') hold(['.GGG.', 'RRRRR', 'RYRYR', '.RRR.', '..R..'], 6, 20, { G: G, R: R, Y: Y });
      else if (holding === 'Remote') hold(['KKKK', 'KRKK', 'KKGK', 'KYKK', 'KKCK', 'KKKK', 'KKKK'], 6, 20, { K: K, R: R, G: G, Y: Y, C: C });
      else if (holding === 'Golden Microphone') {
        // the coveted one: a big golden microphone held up clear of the beak by its handle, a star twinkling
        // off its head; a note flashes beside it while it sings, and it flashes under the pointer
        rank = 4;
        const mx = 4 + hx0, my = 10.5 + hy0, near = gape || (hov && Math.hypot(hov[0] - mx, hov[1] - my) < 7);
        const around = pageNear(0, 16, 3, 24), rim = around.has(Y) ? K : -1, handle = around.has(K) ? Wt : K;
        for (let k = 0; k < 3; k++) { const x = mx + 2.5 + k, y = my + 3 + k * 1.4; P(x, y, handle); P(x + 1, y, handle); P(x, y + 1, handle); }
        if (rim >= 0) disc(mx, my, 4.3, 4.3, rim);
        disc(mx, my, 3.4, 3.4, (x, y, p, q) => near && Math.floor(t * 8) % 2 ? (p + q < -0.4 ? Y : Wt) : p + q < -0.7 ? Wt : Y);
        for (let x = -2; x <= 2; x++) P(mx + x, my + 1.5, handle === K ? K : Y);
        const tw = Math.sin(t * 3.2), sx = mx + 4.5, sy = my - 4.5;
        if (tw > -0.4 || near) P(sx, sy, Wt);
        if (tw > 0.2 || near) for (const [a2, b2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(sx + a2, sy + b2, Y);
        if (gape) sprite(['.WW', '.W.', '.W.', 'WW.', 'WW.'], Math.floor(mx + 7), Math.floor(my - 7), { W: Wt });
        rank = 2;
      }
      else if (holding === 'Gold Coin') hold(['.YYY.', 'YYWYY', 'YWYYY', 'YYYYY', '.YYY.'], 6, 20, { Y: Y, W: Wt });
      // headwear
      const ht = hy - 7.8;
      P = (x, y, v) => Pb(x, y, hMap(v));
      if (headwear === 'Top Hat') { for (let x = 15; x < 27; x++) P(x, ht, M); for (let y = ht - 6; y < ht; y++) for (let x = 17; x < 25; x++) P(x, y, y === ht - 2 ? Y : M); }
      else if (headwear === 'Party Hat') { for (let y = 0; y < 7; y++) for (let x = -y * 0.6 - 0.5; x <= y * 0.6 + 0.5; x++) P(21 + x + (6 - y) * 0.35, ht - 6 + y, (y + Math.floor(x + 9)) % 3 === 0 ? Y : M); P(23, ht - 7, Wt); P(24, ht - 7, Wt); }
      else if (headwear === 'Pirate Bandana') { for (let y = ht - 1; y < ht + 2.5; y++) for (let x = 14.5; x < 28; x++) P(x, y, (x + y * 2) % 5 === 0 ? Wt : R); for (const [dx, dy] of [[28, ht + 1], [29, ht + 2], [30, ht + 1], [30, ht + 3], [31, ht + 4]]) P(dx, dy, R); }
      else if (headwear === 'Bow') sprite(['MM...MM', 'MMMWMMM', 'MM...MM'], 19, ht - 2, { M: HEAD === M ? R : M, W: Wt });
      else if (headwear === 'Sailor Cap') { for (let y = ht - 2; y < ht + 1.5; y++) for (let x = 15; x < 27; x++) P(x, y, y > ht ? B : Wt); P(27, ht + 1, B); P(28, ht + 2, B); P(28, ht + 3, B); }
      else if (headwear === 'Fez') { for (let y = ht - 5; y < ht + 1; y++) for (let x = 17 + (ht - y) * 0.2; x < 25 - (ht - y) * 0.2; x++) P(x, y, R); for (let k = 0; k < 4; k++) P(25 + k * 0.5, ht - 5 + k, K); P(27, ht - 1, Y); }
      else if (headwear === 'Crown') sprite(['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYCYRY', 'YYYYYYY'], 18, ht - 4, { Y: Y, R: R, C: C });
      else if (headwear === 'Halo') { const hv = Math.round(Math.sin(t * 1.4)); for (let x = 16; x < 27; x++) { P(x, ht - 4 + hv, Y); if (x === 16 || x === 26) P(x, ht - 5 + hv, Y); } for (let x = 17; x < 26; x++) P(x, ht - 6 + hv, Y); }
      P = Pb;
      ox = 0; oy = 0; fx = 1; flipY = false; sc = 1; lift = 0; rank = 1; hdx = 0; hdy = 0; hm = 0;
    }

    // ---------- header and link rows: dot-matrix letters, 5 x 7 dots in a cell of 6 x 10 ----------
    // rows given as 7 binary strings per glyph (clearer to check than packed hex)
    const glyphs = {
      A: '01110 10001 10001 11111 10001 10001 10001', B: '11110 10001 10001 11110 10001 10001 11110', C: '01110 10001 10000 10000 10000 10001 01110',
      D: '11110 10001 10001 10001 10001 10001 11110', E: '11111 10000 10000 11110 10000 10000 11111', G: '01110 10001 10000 10111 10001 10001 01111',
      H: '10001 10001 10001 11111 10001 10001 10001', I: '01110 00100 00100 00100 00100 00100 01110', K: '10001 10010 10100 11000 10100 10010 10001',
      L: '10000 10000 10000 10000 10000 10000 11111', M: '10001 11011 10101 10101 10001 10001 10001', N: '10001 10001 11001 10101 10011 10001 10001',
      O: '01110 10001 10001 10001 10001 10001 01110', P: '11110 10001 10001 11110 10000 10000 10000', R: '11110 10001 10001 11110 10100 10010 10001',
      S: '01111 10000 10000 01110 00001 00001 11110', T: '11111 00100 00100 00100 00100 00100 00100', U: '10001 10001 10001 10001 10001 10001 01110',
      V: '10001 10001 10001 10001 10001 01010 00100', W: '10001 10001 10001 10101 10101 10101 01010', X: '10001 10001 01010 00100 01010 10001 10001',
      Y: '10001 10001 01010 00100 00100 00100 00100', F: '11111 10000 10000 11110 10000 10000 10000', "'": '00100 00100 01000 00000 00000 00000 00000',
      0: '01110 10001 10011 10101 11001 10001 01110', 1: '00100 01100 00100 00100 00100 00100 01110', 2: '01110 10001 00001 00010 00100 01000 11111',
      3: '11111 00010 00100 00010 00001 10001 01110', 4: '00010 00110 01010 10010 11111 00010 00010', 5: '11111 10000 11110 00001 00001 10001 01110',
      6: '00110 01000 10000 11110 10001 10001 01110', 7: '11111 00001 00010 00100 01000 01000 01000', 8: '01110 10001 10001 01110 10001 10001 01110',
      9: '01110 10001 10001 01111 00001 00010 01100', Z: '11111 00001 00010 00100 01000 10000 11111', ':': '00000 01100 01100 00000 01100 01100 00000', '&': '01100 10010 10100 01000 10101 10010 01101',
    };
    const FONT = {};
    for (const ch in glyphs) FONT[ch] = glyphs[ch].split(' ').map(r => parseInt(r, 2));
    const TITLE = { 'Scarlet Macaw': 'MACAW', 'Blue and Gold': 'BLUE&GOLD', 'Green Amazon': 'AMAZON', Cockatoo: 'COCKATOO', Budgie: 'BUDGIE', Lorikeet: 'LORIKEET', Hyacinth: 'HYACINTH', Galah: 'GALAH', Eclectus: 'ECLECTUS', 'Sun Conure': 'CONURE', Rosella: 'ROSELLA', Kea: 'KEA', 'African Grey': 'GREY', Lovebird: 'LOVEBIRD', 'Golden Conure': 'GOLDEN', "Spix's Macaw": "SPIX'S", 'Test Pattern': 'TEST CARD', Phoenix: 'PHOENIX', Dodo: 'DODO', Clockwork: 'CLOCKWORK' }[species];
    const greyOf = v => { const l = Math.round(v[0] * 0.3 + v[1] * 0.59 + v[2] * 0.11); return `rgb(${l},${l},${l})`; };
    const css = RGB.map(v => screen === 'Black & White' ? greyOf(v) : `rgb(${v[0]},${v[1]},${v[2]})`);
    function textRow(row, items, bg) {
      const y0 = Math.round(row * S / CH), y1 = Math.round((row + 1) * S / CH);
      cx.fillStyle = css[bg]; cx.fillRect(0, y0, S, y1 - y0);
      const dw = S / CW / 6, dh = (y1 - y0) / 10;
      for (const [col, str, colour] of items) {
        cx.fillStyle = css[colour];
        for (let i = 0, L = str.length; i < L; i++) {
          const gl = FONT[str[i]];
          if (!gl) continue;
          const gx = (col + i) * S / CW;
          for (let r = 0; r < 7; r++) for (let k = 0; k < 5; k++) if (gl[r] >> (4 - k) & 1) cx.fillRect(Math.round(gx + k * dw), Math.round(y0 + (r + 1.5) * dh), Math.ceil(dw), Math.ceil(dh));
        }
      }
    }

    // two colours per cell: keep the cell's two commonest; every chunk takes the nearer
    const pageImg = new Uint8Array(X * Yn), near = new Uint8Array(X * Yn), rowN = new Uint8Array(X * Yn);
    const cellFg = new Uint8Array(CW * CH), cellBg = new Uint8Array(CW * CH), bits = new Uint8Array(X * Yn);
    const cnt = new Uint8Array(8), pc = new Uint8Array(8), score = new Float32Array(8);
    const dist = (u, w) => (RGB[u][0] - RGB[w][0]) ** 2 + (RGB[u][1] - RGB[w][1]) ** 2 + (RGB[u][2] - RGB[w][2]) ** 2;
    function encode() {
      for (let r = 1; r < CH - 1; r++) for (let q = 0; q < CW; q++) {
        cnt.fill(0); pc.fill(0); score.fill(0);
        for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const id = (r * 3 + j) * X + q * 2 + i; cnt[img[id]]++; pc[pageImg[id]]++; score[img[id]] += 1 + pri[id] * pri[id] * 0.8; }
        let f = 0, s = -1;
        for (let k = 0; k < 8; k++) if (score[k] > score[f]) f = k;
        for (let k = 0; k < 8; k++) if (k !== f && cnt[k] > 0 && (s < 0 || score[k] > score[s])) s = k;
        if (s < 0) s = f;
        // the cell's background is whichever colour the bare page has there; the bird is lit chunks over it
        let under = 0;
        for (let k = 0; k < 8; k++) if (pc[k] > pc[under]) under = k;
        if (s === under && f !== under) { const tmp = f; f = s; s = tmp; }
        else if (f === s && f !== under) { s = f; f = under; }
        cellBg[r * CW + q] = f; cellFg[r * CW + q] = s;
        for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) {
          const idx = (r * 3 + j) * X + q * 2 + i, v = img[idx];
          bits[idx] = v === f ? 0 : v === s ? 1 : dist(v, s) < dist(v, f) ? 1 : 0;
        }
      }
    }

    // a faint scan of lines over the large view, like the glass of a set
    let scan = null;
    if (S >= 500) {
      scan = document.createElement('canvas'); scan.width = scan.height = S;
      const sg = scan.getContext('2d');
      sg.fillStyle = 'rgba(0,0,0,0.13)';
      const step = S / 240;
      for (let y = 0; y < S; y += step) sg.fillRect(0, Math.round(y), S, Math.max(1, Math.round(step * 0.38)));
      const vg = sg.createRadialGradient(S / 2, S / 2, S * 0.45, S / 2, S / 2, S * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.28)');
      sg.fillStyle = vg; sg.fillRect(0, 0, S, S);
    }

    // the mimic: its own stream (a Weyl-mixed counter over the last hash word) so nothing above shifts
    let wy = parseInt(hh.slice(56, 64), 16) >>> 0;
    const wr = () => { wy = (wy + 0x9e3779b9) >>> 0; let z = Math.imul(wy ^ (wy >>> 16), 0x45d9f3b); z = Math.imul(z ^ (z >>> 16), 0x45d9f3b); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const ladder = [[0, 2, 4, 7, 9, 12, 14, 16], [0, 3, 5, 7, 10, 12, 15, 17], [0, 2, 4, 5, 7, 9, 11, 12]][Math.floor(wr() * 3)];
    const home = 64 + Math.floor(wr() * 6), accent = wr() < 0.5 ? 12 : 7;
    let heard = [], lastTap = -9, song = null, gape = 0, hov = null, legAt = -9, keyTurns = 0;

    // ---------- the legendaries: each leaves the broadcast page behind for a medium of its own ----------
    // the Phoenix is a demoscene fire effect with copper bars, the Dodo a handheld-console game in four greens, the
    // Clockwork bird its own blueprint patent drawing. Each draws into its own small bitmap, shown hard-edged. Every trait
    // it lists shows: on the Dodo all in the picture, on the Phoenix and the Clockwork named whole, one at a time.
    const LGRID = { Phoenix: 96, Dodo: 64, Clockwork: 80 }[legend] || 96;
    let lgB = null;
    const ABGR = h => (0xff000000 | ((h & 255) << 16) | (h & 0xff00) | ((h >> 16) & 255)) >>> 0;
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
    const bay = (x, y) => BAYER[(x & 3) + ((y & 3) << 2)];
    // a 3 x 5 letter set for the small writing (each letter five rows of three)
    const F3 = {};
    "A.#.#.#####.##.#|B##.#.###.#.###.|C.###..#..#...##|D##.#.##.##.###.|E####..##.#..###|F####..##.#..#..|G.###..#.##.#.##|H#.##.#####.##.#|I###.#..#..#.###|J..#..#..##.#.#.|K#.##.###.#.##.#|L#..#..#..#..###|M#.########.##.#|N##.#.##.##.##.#|O.#.#.##.##.#.#.|P##.#.###.#..#..|Q.#.#.##.###..##|R##.#.###.#.##.#|S.###...#...###.|T###.#..#..#..#.|U#.##.##.##.####|V#.##.##.##.#.#.|W#.##.########.#|X#.##.#.#.#.##.#|Y#.##.#.#..#..#.|Z###..#.#.#..###|0####.##.##.####|1.#.##..#..#.###|2##...#.#.#..###|3##...#.#...###.|4#.##.####..#..#|5####..##...###.|6.###..####.####|7###..#.#..#..#.|8####.#####.####|9####.####..###.|:....#.....#....|..............#.|-......###......|/..#..#.#.#..#..|&.#.#.#.#.#.#.##|'.#..#..........|!.#..#..#.....#.".split('|').forEach(e => { F3[e[0]] = e.slice(1); });
    const W = s => String(s).toUpperCase();
    function lgBuf(R) {
      const can = document.createElement('canvas'); can.width = can.height = R;
      const g = can.getContext('2d'), id = g.createImageData(R, R);
      return { R, can, g, id, d: new Uint32Array(id.data.buffer), prev: new Uint32Array(R * R) };
    }
    const lpx = (x, y, c) => { x |= 0; y |= 0; if (x >= 0 && y >= 0 && x < lgB.R && y < lgB.R) lgB.d[y * lgB.R + x] = c; };
    const lrect = (x0, y0, x1, y1, c) => { for (let y = Math.max(0, y0 | 0); y <= Math.min(lgB.R - 1, y1); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(lgB.R - 1, x1); x++) lgB.d[y * lgB.R + x] = c; };
    const lline = (x0, y0, x1, y1, c) => { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))) || 1; for (let k = 0; k <= n; k++) lpx(Math.round(x0 + (x1 - x0) * k / n), Math.round(y0 + (y1 - y0) * k / n), c); };
    const ltext3 = (str, x, y, c, clip) => { str = W(str); for (let i = 0; i < str.length; i++) { const g = F3[str[i]]; if (!g) continue; for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (g[r * 3 + q] === '#') { const xx = x + i * 4 + q; if (!clip || (xx >= clip[0] && xx <= clip[1])) lpx(xx, y + r, c); } } };
    const ltext5 = (str, x, y, c) => { for (let i = 0; i < str.length; i++) { const g = FONT[str[i]]; if (!g) continue; for (let r = 0; r < 7; r++) for (let k = 0; k < 5; k++) if (g[r] >> (4 - k) & 1) lpx(x + i * 6 + k, y + r, c); } };
    // the traits it lists, as words to write on it
    const LT = [['PERCH', perch], ['HOLDING', holding], ['POSE', pose], ['HAT', headwear], ['NECK', neckwear], ['PAGE', page], ['SCREEN', screen], ['FACING', faceName], ['FLASHING', flashName]];
    function lgPresent() {
      const B = lgB, n = B.R * B.R;
      if (screen === 'Black & White') for (let i = 0; i < n; i++) { const v = B.d[i], l = Math.round((v & 255) * 0.3 + (v >> 8 & 255) * 0.59 + (v >> 16 & 255) * 0.11); B.d[i] = (0xff000000 | (l << 16) | (l << 8) | l) >>> 0; }
      if (screen === 'Ghosting') {
        // the set's ghost: what was there a moment ago lingers, a little to the right
        for (let y = 0; y < B.R; y++) for (let x = B.R - 1; x >= 2; x--) { const i = y * B.R + x, p = B.prev[i - 2], v = B.d[i]; if (((p & 255) + (p >> 8 & 255)) > ((v & 255) + (v >> 8 & 255)) + 120) B.d[i] = (0xff000000 | (((p >> 16 & 255) + (v >> 16 & 255)) >> 1 << 16) | (((p >> 8 & 255) + (v >> 8 & 255)) >> 1 << 8) | (((p & 255) + (v & 255)) >> 1)) >>> 0; }
        B.prev.set(B.d);
      }
      B.g.putImageData(B.id, 0, 0);
      cx.imageSmoothingEnabled = false;
      cx.drawImage(B.can, 0, 0, B.R, B.R, 0, 0, S, S);
    }
    // ---------- the toys' state ----------
    const ph = { heat: 0, burnAt: -9 };
    const dd = { x: facing > 0 ? 36 : 28, face: facing, fruits: [], eatAt: -9, fed: 0, jumpAt: -9, msgAt: 0 };
    const cw = { wind: 0, ang: null, acc: 0, spin: 0, nextAt: 0, step: 0, noteAt: -9, notes: [], I: null };
    const MEL = [0, 2, 4, 2, 5, 4, 2, 0, 3, 4, 5, 7, 5, 4, 2, 1].map((d, k) => (d + (k % 4 === 3 && embers[k % 10][1] < 0.5 ? 1 : 0)) % 8);
    let lgLast = 0, lgPress = null;
    function legendFrame(t, inp) {
      if (!lgB) lgB = lgBuf(LGRID);
      const dt = Math.min(0.1, Math.max(0, t - lgLast)); lgLast = t;
      // a tap counts on a short, still release (each press reports a tap); holds and drags are the other toys
      const taps = [];
      for (const tp of inp.taps()) { if (inp.down) lgPress = { x: tp.x, y: tp.y, at: t, moved: 0, lx: tp.x, ly: tp.y }; else taps.push(tp); }
      if (lgPress) {
        if (inp.down && inp.inside) { lgPress.moved += Math.hypot(inp.x - lgPress.lx, inp.y - lgPress.ly); lgPress.lx = inp.x; lgPress.ly = inp.y; }
        else { if (t - lgPress.at < 0.35 && lgPress.moved < 0.04) taps.push({ x: lgPress.x, y: lgPress.y }); lgPress = null; }
      }
      const held = inp.inside && inp.down;
      if (legend === 'Phoenix') fire(t, dt, held, inp);
      else if (legend === 'Dodo') console8(t, dt, taps, inp);
      else blueprint(t, dt, held, taps, inp);
      lgPresent();
    }
    // ---------- the Phoenix: a demoscene fire effect, Amiga-style fire rising through the bird, copper bars behind ----------
    const FIREP = [0, 0, 0, 0x3c0404, 0x3c0404, 0x3c0404, 0x8a1004, 0x8a1004, 0x8a1004, 0xd03008, 0xd03008, 0xd03008, 0xff7010, 0xff7010, 0xff7010, 0xffb020, 0xffb020, 0xffb020, 0xffe060, 0xffe060, 0xffe060, 0xfff6c0, 0xfff6c0, 0xffffff];
    const COPPER = [[0x2a0a5a, 0x5a2ab0, 0xa070f0, 0xe8d8ff], [0x0a2a5a, 0x1a64b0, 0x50b0f0, 0xd8f4ff], [0x4a0a3a, 0x9a1a7a, 0xe060c0, 0xffd8f4], [0x0a3a2a, 0x1a8a5a, 0x50e0a0, 0xd8ffec]];
    const rnd3 = (x, y, n) => { let h = Math.imul(x * 374761393 + y * 668265263 + n * 2246822519, 1274126177); h ^= h >>> 13; h = Math.imul(h, 1103515245); return ((h >>> 8) & 1023) / 1024; };
    // the bird's shape, drawn into a mask: 1 its body, 2 the lines of its feathers, 3 its eye, 4 its beak
    function phoenixMask(M, R, cx, cy, sc, flap, fs, t) {
      const put = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < R && y < R && (v > M[y * R + x] || v === 3)) M[y * R + x] = v; };
      const disc = (x0, y0, r, v) => { for (let y = Math.floor(y0 - r); y <= y0 + r; y++) for (let x = Math.floor(x0 - r); x <= x0 + r; x++) if ((x - x0) ** 2 + (y - y0) ** 2 <= r * r) put(x, y, v); };
      const cap = (x0, y0, x1, y1, r0, r1, line, v = 1) => {
        const L = Math.hypot(x1 - x0, y1 - y0) || 1, n = Math.ceil(L * 1.5);
        for (let q = 0; q <= n; q++) { const u = q / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u; disc(x, y, Math.max(0.5, r0 + (r1 - r0) * u), v); }
        if (line) for (let q = Math.floor(n * 0.35); q <= n * 0.9; q++) { const u = q / n; put(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, 2); }
      };
      const P = (x, y) => [cx + x * sc, cy + y * sc];
      const C = (a, b, c2, d2, r0, r1, line, v) => { const [x0, y0] = P(a, b), [x1, y1] = P(c2, d2); cap(x0, y0, x1, y1, r0 * sc, r1 * sc, line, v); };
      // wings spread wide and up, each of six long feathers from the shoulder
      for (const s of [-1, 1]) {
        C(s * 4, -6, s * 15, -15, 6, 4.5);
        for (let k = 0; k < 6; k++) { const a = 0.06 + k * 0.19 + flap, L = 24 + 11 * Math.sin(k / 5 * Math.PI); C(s * 7, -8, s * (7 + Math.cos(a) * L), -8 - Math.sin(a) * L, 3.4, 1.4, true); }
      }
      // a tail of three long flames
      for (let k = -1; k <= 1; k++) C(0, 8, k * 8 + Math.sin(t * 5 + k * 2) * 1.5, 30 + (k === 0 ? 4 : 0), 3, 1, true);
      C(0, -8, fs * 2, -17, 3.6, 3.4, false, 5); C(0, 0, 0, 0, 7, 7, false, 5);
      { const [x, y] = P(0, 0); for (let yy = Math.floor(y - 11 * sc); yy <= y + 11 * sc; yy++) for (let xx = Math.floor(x - 6.5 * sc); xx <= x + 6.5 * sc; xx++) if (((xx - x) / (6.5 * sc)) ** 2 + ((yy - y) / (11 * sc)) ** 2 <= 1) put(xx, yy, 5); }
      { const [x, y] = P(fs * 2, -18); disc(x, y, 5 * sc, 5); }
      for (let k = 0; k < 3; k++) C(fs * (1 - k), -22, -fs * (2 + k * 3), -31 + k * 2, 1.6, 0.6);
      { const [x0, y0] = P(fs * 6, -17.5), [x1, y1] = P(fs * 12.5, -16.5); const n = 10; for (let q = 0; q <= n; q++) { const u = q / n; for (let w = -2.2 * (1 - u) * sc; w <= 2.2 * (1 - u) * sc; w += 0.5) put(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + w, 4); } }
      if (sc > 0.6) { const [x, y] = P(fs * 3.2, -19); put(x, y, 3); }
    }
    function fire(t, dt, held, inp) {
      const R = lgB.R, d = lgB.d;
      const cyc = t - ph.burnAt;
      if (cyc > 4.2) {
        const was = ph.heat;
        ph.heat = Math.max(0, Math.min(1, ph.heat + (held ? dt / 1.6 : -dt)));
        if (held && Math.floor(was * 8) !== Math.floor(ph.heat * 8)) c.sound.hit('noise', 0.05 + ph.heat * 0.15, { cutoff: 3000 + ph.heat * 4000, dur: 0.2 });
        if (ph.heat >= 1) {
          ph.burnAt = t; ph.heat = 0;
          c.sound.hit('noise', 0.5, { cutoff: 1500, dur: 1.4 });
          for (let k = 0; k < 5; k++) c.sound.note(home + ladder[k] + 12, { at: 2.2 + k * 0.12, dur: 0.6, vel: 0.12, wave: 'triangle' });
          c.sound.note(home + 36, { at: 3.6, dur: 1, vel: 0.12, wave: 'triangle' });
        }
      }
      const burning = cyc < 4.2, heat = Math.max(ph.heat, cyc < 0.9 ? 1 : 0);
      if (!ph.F) { ph.F = new Float32Array(R * (R + 2)); ph.M = new Uint8Array(R * R); ph.n = 0; }
      const F = ph.F, M = ph.M, n = ++ph.n, fs = facing > 0 ? -1 : 1, BX = 48, BY = 42;
      // the bird (whole, burning away, gone to ash, or a chick rising from the ash)
      M.fill(0);
      const flap = Math.sin(t * (2 + heat * 7)) * (0.06 + heat * 0.08);
      let showBird = true, line = -1;
      if (burning && cyc < 0.9) line = 82 - (cyc / 0.9) * 76;
      if (burning && cyc >= 0.9 && cyc < 2.2) showBird = false;
      if (burning && cyc >= 2.2 && cyc < 3.4) { const u = (cyc - 2.2) / 1.2; phoenixMask(M, R, BX, 74 - u * 22, 0.22 + u * 0.38, Math.sin(t * 9) * 0.1, fs, t); showBird = false; }
      if (showBird) phoenixMask(M, R, BX, BY, 1, flap, fs, t);
      // the fire: seeded from the bird itself (and, as it burns, from all that is burning), rising and cooling
      const seedHot = 150 + heat * 105;
      for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
        const i = y * R + x;
        if (M[i] && (line < 0 || y < line)) { if (rnd3(x, y, n) < 0.55) F[i] = Math.max(F[i], seedHot * (0.7 + 0.3 * rnd3(y, x, n))); }
        else if (M[i] && y >= line) { F[i] = 255; M[i] = 0; }
      }
      if (burning && cyc >= 0.9 && cyc < 3.4) for (let x = 30; x < 67; x++) { const top = 79 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 48) / 18) ** 2)) * 5); if (rnd3(x, 0, n) < 0.4) F[top * R + x] = Math.max(F[top * R + x], 120 + 80 * rnd3(x, 1, n)); }
      const decay = 0.93 + heat * 0.04;
      for (let y = 0; y < R - 1; y++) { const a = y * R, b = (y + 1) * R, c2 = Math.min(R - 1, y + 2) * R; for (let x = 1; x < R - 1; x++) {
        const v = (F[b + x - 1] + F[b + x] + F[b + x + 1] + F[c2 + x]) * 0.25 * decay - 1.6 * rnd3(x, y, n);
        F[a + x] = v > 0 ? v : 0;
      } }
      // the copper bars behind: four raster bars rising and falling in their own colours (reddening with the heat)
      const sec = Math.floor(t) % 2 === 1, rows = ph.rows || (ph.rows = new Uint32Array(R));
      for (let y = 0; y < R; y++) rows[y] = 0;
      for (let k = 0; k < 4; k++) {
        const cy = 36 + Math.sin(t * 1.1 + k * 1.6) * 28, hot = heat > 0.5 || (burning && cyc < 2.2);
        for (let y = Math.floor(cy - 5); y <= cy + 5; y++) { if (y < 0 || y >= 80) continue; const lv = Math.min(3, Math.floor((1 - Math.abs(y - cy) / 5.5) * 4)); if (lv >= 0) rows[y] = ABGR((hot ? [0x3a0804, 0x8a1a08, 0xe05010, 0xffd0a0] : COPPER[k])[lv]); }
      }
      const BG = ABGR(0x05030c), STAR = ABGR(0x8a8ab0);
      for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
        const i = y * R + x, m = M[i];
        if (m) {
          const f = F[i];
          const fi = Math.min(23, Math.floor(f / 256 * 24));
          if (m === 1 && (M[i - 1] === 5 || M[i + 1] === 5 || M[i - R] === 5 || M[i + R] === 5)) { d[i] = ABGR(0x3a0602); continue; }
          d[i] = m === 3 ? ABGR(0x200400) : m === 4 ? ABGR(0xffe060) : m === 2 ? ABGR(heat > 0.6 ? 0xffd040 : 0xe85a10) : ABGR(FIREP[Math.max(m === 5 ? 20 + Math.round(heat * 3) : 15 + Math.round(heat * 4), fi)]);
          continue;
        }
        if (M[i - 1] || M[i + 1] || (i >= R && M[i - R]) || M[i + R]) { d[i] = ABGR(0x2a0402); continue; }
        const fi = Math.min(23, Math.floor(F[i] / 256 * 24));
        if (fi >= 3) { d[i] = ABGR(FIREP[fi]); continue; }
        d[i] = y < 80 && rows[y] ? rows[y] : BG;
      }
      // its night: stars streaming past behind (a Night Page)
      for (const [a, b2, c2] of embers) for (const oy of [0, 37]) { const x = Math.floor(((a * 96 - t * (6 + c2 * 14)) % 96 + 96) % 96), y = Math.floor((b2 * 76 + oy) % 76) + 2, i = y * R + x; if (d[i] === BG) d[i] = STAR; }
      // the ash, and the ring of the rebirth
      if (burning && cyc >= 0.9 && cyc < 3.4) for (let x = 30; x < 67; x++) { const top = 79 - Math.round(Math.sqrt(Math.max(0, 1 - ((x - 48) / 18) ** 2)) * 5); for (let y = top; y <= 80; y++) lpx(x, y, bay(x, y) < 0.35 ? ABGR(0x6a625a) : rnd3(x, y, Math.floor(t * 6)) < 0.05 ? ABGR(0xff8a20) : ABGR(0x2e2824)); }
      if (burning && cyc > 3.4) { const rr = (cyc - 3.4) * 60; for (let k = 0; k < 160; k++) { const a = k / 160 * 6.283; lpx(BX + Math.cos(a) * rr, BY + Math.sin(a) * rr, ABGR(0xffffff)); lpx(BX + Math.cos(a) * (rr - 1), BY + Math.sin(a) * (rr - 1), ABGR(0xffd848)); } }
      // the foot: a copper line, then its traits in a bobbing demo font, whole, a trait at a time
      lrect(0, 81, R - 1, R - 1, BG);
      for (let x = 0; x < R; x++) lpx(x, 81, flashName === 'Header Bar' && sec ? ABGR(0xffffff) : ABGR(hexRain(x * 4 + t * 120)));
      const [lab, val] = LT[Math.floor(t / 2.8) % LT.length];
      const wave = (str, y, cols) => { str = W(str).slice(0, 23); const x0 = Math.round(48 - (str.length * 4 - 1) / 2); for (let i = 0; i < str.length; i++) { const g = F3[str[i]]; if (!g) continue; const oy = Math.round(Math.sin(t * 5 + i * 0.7)); for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (g[r * 3 + q] === '#') lpx(x0 + i * 4 + q, y + r + oy, cols[r]); } };
      wave(lab, 83, (flashName === 'Title' && sec ? [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff] : [0xb090f0, 0x9070e0, 0x7a58d0, 0x6448c0, 0x5038a8]).map(ABGR));
      wave(val, 89, [0xffffff, 0xfff0a0, 0xffc848, 0xff8a20, 0xe04a10].map(ABGR));
      if (flashName === 'Clock') { const secs = (clock0 + Math.floor(t)) % 86400; ltext3(two(Math.floor(secs / 3600)) + (sec ? ':' : ' ') + two(Math.floor(secs / 60) % 60), 2, 2, ABGR(0xc8c8f0)); }
    }
    const hexRain = v => { const h = ((v % 360) + 360) % 360 / 60, k = Math.floor(h), f = h - k, q = Math.round(255 * (1 - f)), p2 = Math.round(255 * f); return [[255, p2, 0], [q, 255, 0], [0, 255, p2], [0, q, 255], [p2, 0, 255], [255, 0, q]][k % 6].reduce((a, b2) => (a << 8) | b2, 0); };
    // ---------- the Dodo: a handheld-console game in four greens ----------
    // the dodo big on its island (a nest with its egg, rocks, the sea lapping), its page as the sky and the level's name,
    // what it wears and holds drawn on it, its perch standing by the palm; drop it fruit and it waddles over and eats
    function console8(t, dt, taps, inp) {
      const R = lgB.R, d = lgB.d;
      const G = screen === 'Black & White' ? [0x1c1c1c, 0x585858, 0xa8a8a8, 0xe8e8e8] : [0x0f380f, 0x306230, 0x8bac0f, 0x9bbc0f];
      const P = G.map(ABGR), fcH = facing;   // facing Left (1): its beak points left
      const GROUND = 58, PUFF = pose === 'Puffed Up' ? 2 : 0;
      // (where it may stand: always whole in the frame, beak and tail)
      const XMIN = () => facing > 0 ? (dd.face > 0 ? 28 : 23 + PUFF) : (dd.face > 0 ? 23 : 19 + PUFF), XMAX = () => facing > 0 ? (dd.face > 0 ? 44 - PUFF : 40) : (dd.face > 0 ? 40 - PUFF : 35);
      for (const tp of taps) {
        const x = tp.x * R, y = tp.y * R;
        if (Math.abs(x - dd.x) < 12 && y > 30 && y < 62 && t - dd.jumpAt > 0.7) { dd.jumpAt = t; c.sound.note(home + ladder[0] + 12, { dur: 0.06, vel: 0.15, wave: 'square', cutoff: 2400 }); c.sound.note(home + ladder[4] + 12, { at: 0.06, dur: 0.12, vel: 0.15, wave: 'square', cutoff: 2400 }); }
        else if (dd.fruits.length < 3) { dd.fruits.push({ x: Math.max(8, Math.min(56, x)), y: Math.max(4, Math.min(GROUND - 6, y)), vy: 0, at: t, kind: (dd.fed + dd.fruits.length) % 3 }); c.sound.note(home + ladder[5] + 12, { dur: 0.05, vel: 0.12, wave: 'square', cutoff: 2400 }); }
      }
      // the fruit falls to the sand; the dodo turns, waddles over, grabs it, gulps it down, a heart, a burp
      for (const f of dd.fruits) { if (f.down) continue; f.vy += 260 * dt; f.y += f.vy * dt; if (f.y >= GROUND - 1) { f.y = GROUND - 1; f.vy = -f.vy * 0.45; if (Math.abs(f.vy) < 18) { f.down = true; f.vy = 0; } } }
      const eat = t - dd.eatAt;
      const target = dd.fruits.find(q => q.down);
      let walking = false;
      if (target && eat > 1.9) {
        dd.face = target.x < dd.x ? 1 : -1;
        const beakX = dd.x - dd.face * 22, dist = target.x - beakX;
        if (Math.abs(dist) < 1.5 || (Math.abs(dist) < 9 && (dd.x <= XMIN() + 0.01 || dd.x >= XMAX() - 0.01))) {
          dd.eatAt = t; dd.fed++; dd.fruits.splice(dd.fruits.indexOf(target), 1);
          c.sound.note(home + ladder[2], { dur: 0.06, vel: 0.15, wave: 'square', cutoff: 2000 });
          c.sound.note(home + ladder[0] - 12, { at: 0.4, dur: 0.18, vel: 0.15, wave: 'triangle' });
          for (let k = 0; k < 3; k++) c.sound.note(home + ladder[2 + k * 2] + 12, { at: 0.85 + k * 0.07, dur: 0.08, vel: 0.12, wave: 'square', cutoff: 2400 });
          c.sound.note(home + ladder[0] - 17, { at: 1.35, dur: 0.22, vel: 0.16, wave: 'square', cutoff: 500 });
        } else { dd.x = Math.max(XMIN(), Math.min(XMAX(), dd.x + Math.sign(dist) * Math.min(Math.abs(dist), dt * 20))); walking = true; }
      }
      const sec = Math.floor(t) % 2 === 1;
      // ---- the sky: its page ----
      const SKY0 = 0, SEA = 22, SAND = 47;
      const night = page === 'Night Page' || page === 'Fireworks';
      for (let y = SKY0; y < SEA; y++) for (let x = 0; x < R; x++) {
        let v = night ? (y < 10 ? 0 : 1) : 2;
        if (page === 'Sky Bands') v = ((y - SKY0) >> 2) % 2 ? 2 : 3;
        if (page === 'Sunset Page') v = y > 16 ? 3 : y > 10 ? (bay(x, y) < 0.5 ? 2 : 3) : 2;
        if (page === 'Colour Bars' && y < 19) v = [3, 2, 1, 0, 3, 2, 1, 0][Math.floor(x / 8)];
        d[y * R + x] = P[v];
      }
      const hr = ((clock0 + t) / 3600) % 24, clockSky = flashName === 'Clock', dayT = clockSky ? (hr >= 6 && hr < 18 ? (hr - 6) / 12 : ((hr + 6) % 24) / 12) : 0;
      const sunX = clockSky ? Math.round(6 + dayT * 52) : facing > 0 ? 50 : 13, sunY = clockSky ? Math.round(14 - Math.sin(dayT * Math.PI) * 8) : 9;
      const moonUp = page === 'Night Page' || (clockSky && !(hr >= 6 && hr < 18)), rays = !clockSky || sec;
      if (night) {
        for (const [a, b2] of embers) { const x = Math.floor(a * 63), y = SKY0 + 1 + Math.floor(b2 * 19); lpx(x, y, Math.sin(t * 2 + a * 9) > -0.3 ? P[3] : P[2]); }
        if (page !== 'Fireworks' || moonUp) { for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= 16 && (x + 2) ** 2 + (y - 1) ** 2 > 9) lpx(sunX + x, sunY + y, P[3]); }
        else for (let k = 0; k < 2; k++) { const ph2 = (t * 0.6 + k * 0.5) % 1, cx2 = k ? 16 : 46, cy2 = k ? 13 : 17, rr = ph2 * 9; if (ph2 < 0.75) for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; lpx(cx2 + Math.cos(a) * rr, cy2 + Math.sin(a) * rr, q % 2 ? P[3] : P[2]); } }
      } else if (page === 'Sunset Page') {
        for (let y = -9; y <= 0; y++) for (let x = -9; x <= 9; x++) if (x * x + y * y <= 81) lpx(32 + x, SEA - 1 + y, (y + 9) % 3 === 2 ? P[2] : P[3]);
      }
      if (!night && (page !== 'Sunset Page' || clockSky)) {
        if (moonUp) { for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= 16 && (x + 2) ** 2 + (y - 1) ** 2 > 9) lpx(sunX + x, sunY + y, P[1]); }
        else { for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const r = Math.hypot(x, y); if (r < 4.2) lpx(sunX + x, sunY + y, r < 3.2 ? P[3] : P[2]); }
        if (rays) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 + t * 0.5; lpx(sunX + Math.cos(a) * 6.5, sunY + Math.sin(a) * 6.5, P[3]); } }
        if (page !== 'Colour Bars') for (const [cx2, cy2, w] of [[10, 8, 9], [36, 6, 11], [58, 14, 7]]) { const x0 = ((cx2 + t * 3) % 72) - 8; for (let x = 0; x < w; x++) { lpx(x0 + x, cy2, P[3]); if (x > 1 && x < w - 2) lpx(x0 + x, cy2 - 1, P[3]); if (x > 2 && x < w - 3) lpx(x0 + x, cy2 - 2, P[3]); } }
      }
      if (page !== 'Sunset Page') { const vx = facing > 0 ? 40 : 24, top = 7, dark = night ? P[0] : P[1], edge = P[0];
        for (let y = top; y < SEA; y++) { const hw = 3 + (y - top) * 1.25 + (y > SEA - 4 ? (y - SEA + 4) * 1.5 : 0); for (let x = Math.floor(vx - hw); x <= vx + hw; x++) lpx(x, y, Math.abs(x - vx) > hw - 1 ? edge : (x - vx) < -(y - top) * 0.4 && (x + y) % 2 ? P[2] : dark); }
        for (let x = -2; x <= 2; x++) lpx(vx + x, top, P[3]); lpx(vx - 1, top + 1, P[3]); lpx(vx + 1, top + 1, P[2]);
        for (const [ox, len] of [[-1, 6], [2, 4]]) for (let k = 0; k < len; k++) lpx(vx + ox + Math.round(Math.sin(k * 0.9) * 0.6) + (ox > 0 ? k * 0.4 : -k * 0.3), top + 2 + k, P[night ? 3 : 2]);
        for (let k = 0; k < 4; k++) { const u = ((t * 0.25 + k / 4) % 1), r = 2 + u * 4, cx2 = vx + u * 10 * (facing > 0 ? 1 : -1), cy2 = top - 2 - u * 5; for (let y = -3; y <= 3; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= r * r) lpx(cx2 + x, cy2 + y, (x + y) > r * 0.4 ? P[night ? 1 : 2] : P[3]); } }
      if (page === 'Snow Page') for (let k = 0; k < 14; k++) { const x = (k * 23 + Math.sin(t + k) * 2 + 64) % 64, y = SKY0 + ((k * 11 + t * 8) % 21); lpx(x, y, P[2]); lpx(x + 1, y, P[3]); }
      if (page === 'Jungle') { for (const [x0, len] of [[3, 12], [9, 7], [55, 10], [61, 14]]) for (let y = SKY0; y < SKY0 + len; y++) { const x = x0 + Math.round(Math.sin(y * 0.5 + t) * 0.6); lpx(x, y, P[1]); if (y % 3 === 0) { lpx(x - 1, y, P[1]); lpx(x + 1, y + 1, P[2]); } } for (let x = 0; x < R; x++) { const h = 3 + Math.round(Math.abs(Math.sin(x * 0.35)) * 3); for (let y = SEA - h; y < SEA; y++) lpx(x, y, P[1]); } }
      if (page === 'Cityline') for (let x = 0; x < R; x++) { const h = [6, 9, 4, 12, 7, 10, 5, 8][Math.floor(x / 8)]; for (let y = SEA - h; y < SEA; y++) lpx(x, y, (x % 8 > 0 && x % 8 < 7 && (y - SEA + h) % 3 === 1 && x % 2 === 0) ? P[3] : P[1]); }
      if (page === 'Weather Map') { for (const [a, b2] of [[0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1]]) lpx(20 + a, 12 + b2, P[1]); ltext3('21', 26, 10, P[1]); }
      // the sea, rolling in to the shore in bands
      for (let y = SEA; y < SAND; y++) for (let x = 0; x < R; x++) { const w = (x + Math.round(t * 6) + y * 5) % 16; lpx(x, y, y === SEA ? P[2] : (w < 3 && (y - SEA) % 5 === 2) ? P[2] : P[1]); }
      for (let x = 0; x < R; x++) { const fy = SAND - 1 + Math.round(Math.sin(x * 0.4 + t * 2.4) * 0.8 + Math.sin(t * 1.3) * 0.5); lpx(x, fy, P[3]); lpx(x, fy + 1, P[3]); }
      // the sand, speckled
      for (let y = SAND + 1; y < R; y++) for (let x = 0; x < R; x++) lpx(x, y, ((x * 7 + y * 13) % 29 === 0 || (y === SAND + 1 && x % 9 < 5)) ? P[1] : P[2]);
      // the island's things: rocks, the palm with its perch beside it, and the nest with an egg (or its chick)
      const back = facing > 0 ? 1 : -1, nx0 = back > 0 ? 11 : 52;   // the perch behind the dodo, the nest before its beak
      const rock = (cx2, cy2, w, h) => { for (let y = -h; y <= 0; y++) for (let x = -w; x <= w; x++) if ((x / w) ** 2 + ((y + h * 0.4) / h) ** 2 <= 1.1) lpx(cx2 + x, cy2 + y, y === -h || Math.abs(x) === w ? P[0] : x < 0 && y < -h / 2 ? P[2] : P[1]); };
      rock(back > 0 ? 3 : 60, 63, 4, 4); rock(back > 0 ? 35 : 28, 63, 2, 2);
      // its perch, standing at the back of the island
      const px0 = back > 0 ? 56 : 7, O = P[0], D = P[1], L = P[2], H = P[3];
      const box = (x0, y0, x1, y1, f) => { for (let y = y0; y <= y1; y++) for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) lpx(x, y, (y === y0 || y === y1 || x === x0 || x === x1) ? O : f); };
      if (perch === 'Branch') { for (let x = -6; x <= 6; x++) { lpx(px0 + x, GROUND + 1, O); lpx(px0 + x, GROUND, D); } lpx(px0 - 3, GROUND - 1, O); lpx(px0 + 2, GROUND - 1, O); lpx(px0 + 3, GROUND - 2, L); }
      else if (perch === 'Ring Swing') { const sw = Math.round(Math.sin(t * 1.3) * 1.5); for (let y = 38; y <= GROUND; y++) { lpx(px0 - 6, y, O); lpx(px0 + 6, y, O); } for (let x = -6; x <= 6; x++) lpx(px0 + x, 38, O); for (let y = 39; y < 44; y++) lpx(px0 + sw * (y - 39) / 5, y, D); for (let k = 0; k < 20; k++) { const a = k / 20 * 6.283; lpx(px0 + sw + Math.cos(a) * 3.5, 47 + Math.sin(a) * 3.5, O); } }
      else if (perch === 'Rope') { box(px0 - 7, 44, px0 - 6, GROUND, D); box(px0 + 6, 44, px0 + 7, GROUND, D); for (let x = -5; x <= 5; x++) lpx(px0 + x, 45 + Math.round(Math.sin((x + 5) / 10 * Math.PI) * 2), (x >> 1) % 2 ? L : O); }
      else if (perch === 'Bird Bath') { box(px0 - 5, 44, px0 + 5, 46, H); box(px0 - 1, 46, px0 + 1, GROUND, L); box(px0 - 3, GROUND - 1, px0 + 3, GROUND, D); }
      else if (perch === 'Ladder') { for (let y = 40; y <= GROUND; y++) { const w = (y - 40) * 0.3; lpx(px0 - w, y, O); lpx(px0 + w, y, O); if (y % 4 === 0 && y > 42) for (let x = -w; x <= w; x++) lpx(px0 + x, y, D); } }
      else if (perch === 'Cage') { for (let k = 0; k < 20; k++) { const a = Math.PI + k / 19 * Math.PI; lpx(px0 + Math.cos(a) * 6, 46 + Math.sin(a) * 6, O); } for (let x = -6; x <= 6; x += 3) for (let y = 46 - Math.round(Math.sqrt(Math.max(0, 36 - x * x))); y <= GROUND; y++) lpx(px0 + x, y, O); for (let x = -6; x <= 6; x++) lpx(px0 + x, GROUND, D); }
      else if (perch === 'Palm Frond') { for (let r = 0; r < 14; r++) { const x = px0 - 7 + r, y = GROUND - Math.round(Math.sin(r / 13 * Math.PI) * 3); lpx(x, y, O); if (r % 2) { lpx(x, y - 1, D); lpx(x + 1, y - 2, D); } } }
      else if (perch === 'Fence Post') { box(px0 - 2, 44, px0 + 2, GROUND, L); lpx(px0, 43, O); for (let x = -7; x <= 7; x++) { if (Math.abs(x) > 2) { lpx(px0 + x, 48, O); lpx(px0 + x, 53, O); } } }
      else if (perch === 'Teacup') { for (let y = 48; y <= GROUND; y++) { const w = 6 - Math.floor((y - 48) / 3); for (let x = -w; x <= w; x++) lpx(px0 + x, y, Math.abs(x) === w || y === GROUND ? O : y === 48 ? D : H); } for (let k = 0; k < 10; k++) { const a = -1.4 + k / 9 * 2.8; lpx(px0 + back * 7 + Math.cos(a) * 2.5 * back, 52 + Math.sin(a) * 2.5, O); } }
      else if (perch === 'TV Aerial') { for (let y = 34; y <= GROUND; y++) lpx(px0, y, O); for (const [y, w] of [[35, 5], [39, 4], [43, 3]]) for (let x = -w; x <= w; x++) lpx(px0 + x, y, O); }
      else if (perch === 'Treasure Chest') { box(px0 - 6, 50, px0 + 6, GROUND, D); box(px0 - 6, 47, px0 + 6, 50, L); lpx(px0, 51, H); lpx(px0, 52, H); for (let x = -5; x <= 5; x += 2) lpx(px0 + x, 46, sec ? H : L); }
      // the nest, before its beak, with an egg in it (or its chick, With Chick)
      { const pxm = facing > 0 ? 1 : 62, lean = facing > 0 ? 1 : -1;
        for (let j = 0; j < 44; j++) { const x = pxm + lean * Math.round(Math.sin(j / 44 * 1.6) * 3), y = GROUND + 2 - j; lpx(x, y, P[0]); lpx(x + lean, y, j % 3 ? P[1] : P[0]); }
        const tx0 = pxm + lean * 3, ty0 = GROUND - 42;
        for (let f = 0; f < 7; f++) { const a = (lean > 0 ? -0.35 : Math.PI + 0.35) + lean * (f - 3) * 0.5 + Math.sin(t * 1.4 + f) * 0.05; for (let r = 1; r < 16; r++) { const x = tx0 + Math.cos(a) * r, y = ty0 + Math.sin(a) * r * 0.6 + r * r * 0.045, w = r > 2 && r < 14 ? (r < 9 ? 2 : 1) : 0; lpx(x, y - 1, P[0]); for (let q = 0; q < w; q++) lpx(x, y + q, P[1]); lpx(x, y + w, P[0]); if (r % 2 && w) lpx(x + lean, y + w + 1, P[0]); } }
        for (const [a, b2] of [[-1, 1], [1, 2], [0, 3]]) { lpx(tx0 + a, ty0 + b2, P[0]); lpx(tx0 + a + 1, ty0 + b2, P[1]); } }
      for (let x = -8; x <= 8; x++) for (let y = -1; y <= 3; y++) if ((x / 8.5) ** 2 + ((y - 1) / 3) ** 2 <= 1) lpx(nx0 + x, GROUND + y, (x + y * 2) % 3 === 0 || y === -1 ? O : (x * 3 + y) % 4 === 0 ? L : D);
      if (pose === 'With Chick') { const hop = Math.max(0, Math.sin(t * 5)) * 1.5; for (let y = -4; y <= 0; y++) for (let x = -2; x <= 2; x++) if (x * x + (y + 2) ** 2 <= 5) lpx(nx0 + x, GROUND - 1 + y - hop, H); lpx(nx0 - back, GROUND - 4 - hop, O); lpx(nx0 - back * 3, GROUND - 3 - hop, L); }
      else for (const ex of [-3, 3]) for (let y = -5; y <= 0; y++) for (let x = -3; x <= 3; x++) { const q = (x / 2.6) ** 2 + ((y + 2.5) / 3.2) ** 2; if (q <= 1) lpx(nx0 + ex + x, GROUND - 1 + y, q > 0.62 ? O : x < 0 && y < -3 ? H : x > 1 ? L : H); }
      // ---- the sprites: fruit and the dodo, drawn in shades and then ringed in the darkest green ----
      const spr = dd.spr || (dd.spr = new Int8Array(R * R)); spr.fill(-1);
      const sp = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < R && y < R) spr[y * R + x] = v; };
      for (const f of dd.fruits) { for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= 8.5) sp(f.x + x, f.y - 3 + y, (x + y < -2 && x * x + y * y > 1) ? 3 : f.kind === 1 ? 2 : 1); sp(f.x, f.y - 7, 0); sp(f.x, f.y - 8, 0); sp(f.x + 1, f.y - 8, 2); sp(f.x + 2, f.y - 9, 2); }
      const fc = dd.face, jump = t - dd.jumpAt < 0.6 ? Math.sin((t - dd.jumpAt) / 0.6 * Math.PI) * 9 : 0;
      const dance = pose === 'Dancing' ? Math.max(0, Math.sin(t * 6.2)) * 2 : 0;
      const dip = eat < 0.3 ? Math.sin(eat / 0.3 * Math.PI / 2) : eat < 0.55 ? 1 - (eat - 0.3) / 0.25 : 0;
      const preen = pose === 'Preening' && (t % 5) > 3.6 && eat > 1.9 ? Math.sin(((t % 5) - 3.6) / 1.4 * Math.PI) : 0;
      const step = walking ? Math.floor(t * 10) % 2 : pose === 'Dancing' ? Math.floor(t * 6.2 / Math.PI) % 2 : 0, bx = dd.x, by = GROUND - 4 - jump - dance;
      const Ld = (x, y, v) => sp(bx - fc * x, by + y, v);   // the dodo's own coordinates: x forward (toward its beak), y down
      const puff = pose === 'Puffed Up' ? 2 : 0;
      // stout legs, the great round body (lighter back and belly), a stubby wing; a curled white tail
      for (const [lx, up] of [[-4, step], [2, 1 - step]]) { for (let k = 0; k < 5; k++) { Ld(lx, -k - up + 4, 1); Ld(lx + 1, -k - up + 4, 1); } Ld(lx + 2, 4 - up, 1); Ld(lx - 1, 4 - up, 1); }
      for (let y = -17 - puff; y <= 0; y++) for (let x = -14 - puff; x <= 11 + puff; x++) { const u = (x + 1.5) / (12.5 + puff), v = (y + 8) / (9 + puff * 0.6); if (u * u + v * v <= 1) Ld(x, y, v > 0.5 || (u < -0.75 && v > 0) ? 2 : 3); }
      if (pose === 'Wing Stretch') { const fl = Math.sin(t * 3) * 1.5; for (let k = 0; k < 12; k++) for (let w = 0; w < 4 - k * 0.25; w++) Ld(-2 - k * 0.6 - w * 0.3, -11 - k - fl * k / 12 + w, k > 8 ? 2 : w < 1 ? 0 : 3); }
      else for (let k = 0; k < 7; k++) { Ld(-3 + k, -9 + (k > 4 ? 1 : 0), 0); if (k > 1 && k < 6) Ld(-3 + k, -8 + (k > 4 ? 1 : 0), 2); }
      for (const [a, b2] of [[-15, -12], [-16, -13], [-17, -14], [-17, -15], [-16, -16], [-15, -16], [-14, -15], [-15, -11], [-16, -10]]) Ld(a - puff, b2, 3);
      // the head on a short neck, the bare pale face round the eye, the great hooked beak
      const cock = pose === 'Head Cocked' ? 1 : 0;
      const hy = -20 + dip * 17 + preen * 8 - cock * 2, hx = 7 + dip * 4 - preen * 10 - cock;
      for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) if (x * x + y * y <= 30) Ld(hx + x, hy + y, 3);
      for (let y = Math.min(hy, -13); y < -12; y++) for (let x = 3; x <= 9; x++) Ld(x + (hx - 7) * Math.min(1, (y + 12) / (hy + 12 || -1)), y, 3);
      for (let y = -2; y <= 2; y++) for (let x = -1; x <= 3; x++) if ((x - 1) ** 2 + y * y <= 5) Ld(hx + x, hy - 1 + y - cock, 2);
      Ld(hx + 1, hy - 1 - cock, 0); Ld(hx + 2, hy - 2 - cock, 3);
      const beakOpen = eat > 0.2 && eat < 0.3 ? 1 : 0;
      for (let k = 0; k < 10; k++) { const top = k < 7 ? -3 : -3 + (k - 6); for (let y = top; y <= 1 - (k > 7 ? 1 : 0); y++) Ld(hx + 5 + k, hy + y + 1 - (y < 0 ? beakOpen : 0), y < 0 ? 2 : 1); }
      Ld(hx + 15, hy + 1, 1); Ld(hx + 15, hy + 2, 1); Ld(hx + 14, hy + 3, 1); Ld(hx + 8, hy - 1, 0); for (let k = 0; k < 7; k++) Ld(hx + 6 + k, hy + 1, 0);
      // the gulp: a lump sliding down its neck into its body
      if (eat > 0.55 && eat < 1) { const u = (eat - 0.55) / 0.45; for (let a = 0; a < 2; a++) for (let b2 = 0; b2 < 2; b2++) Ld(6 + a - u * 3, -14 + u * 8 + b2, 2); }
      // what it wears on its head and round its neck, and holds in its beak
      const hat = (x, y, v) => Ld(hx + x, hy + y, v);
      if (headwear === 'Party Hat') { for (let r = 0; r < 7; r++) for (let x = -3 + Math.floor(r / 2); x <= 3 - Math.floor(r / 2); x++) hat(x, -5 - r, r % 2 ? 1 : 3); hat(0, -12, 3); hat(0, -13, 2); }
      else if (headwear === 'Pirate Bandana') { for (let x = -5; x <= 5; x++) { hat(x, -4, 0); hat(x, -5, x % 2 ? 0 : 1); } hat(-6, -3, 0); hat(-7, -2, 0); hat(-7, -4, 0); }
      else if (headwear === 'Bow') { for (const [a, b2] of [[-2, -6], [-3, -7], [-3, -5], [-1, -6], [1, -6], [2, -7], [2, -5], [0, -6], [3, -6], [-4, -6]]) hat(a, b2, b2 === -6 && Math.abs(a) < 2 ? 0 : 1); }
      else if (headwear === 'Sailor Cap') { for (let y = -8; y <= -5; y++) for (let x = -4 + (y === -8 ? 1 : 0); x <= 4 - (y === -8 ? 1 : 0); x++) hat(x, y, y === -5 ? 0 : 2); hat(5, -5, 0); hat(6, -5, 0); }
      else if (headwear === 'Fez') { for (let y = -10; y <= -5; y++) for (let x = -3 + (y < -8 ? 1 : 0); x <= 3 - (y < -8 ? 1 : 0); x++) hat(x, y, 0); for (let k = 0; k < 4; k++) hat(-3 - (k > 1 ? 1 : 0), -10 + k, 2); }
      else if (headwear === 'Top Hat') { for (let y = -14; y <= -6; y++) for (let x = -3; x <= 3; x++) hat(x, y, y === -8 ? 2 : 0); for (let x = -5; x <= 5; x++) hat(x, -5, 0); }
      else if (headwear === 'Crown') { for (let x = -4; x <= 4; x++) { hat(x, -5, 2); hat(x, -6, 2); } for (const x of [-4, 0, 4]) { hat(x, -7, 2); hat(x, -8, 2); } hat(0, -6, 0); }
      else if (headwear === 'Halo') { for (let k = 0; k < 20; k++) { const a = k / 20 * 6.283; hat(Math.round(Math.cos(a) * 5), -10 + Math.round(Math.sin(a) * 1.4), 3); } }
      const nk = (x, y, v) => Ld(5 + x, -11 + y, v);
      if (neckwear === 'Bow Tie') { for (const [a, b2] of [[0, 0], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1], [-2, -1], [-2, 1], [2, -1], [2, 1], [-2, 0], [2, 0]]) nk(a, b2, a === 0 ? 0 : 1); }
      else if (neckwear === 'Bead Necklace' || neckwear === 'Pearls') { for (let k = 0; k < 6; k++) nk(-4 + k * 1.4, Math.round(Math.sin(k / 5 * Math.PI) * 2), neckwear === 'Pearls' ? 2 : k % 2 ? 1 : 0); }
      else if (neckwear === 'Bandana') { for (let r = 0; r < 4; r++) for (let x = -3 + r; x <= 3 - r; x++) nk(x, r, r === 0 ? 0 : 1); }
      else if (neckwear === 'Bell Collar') { for (let x = -4; x <= 3; x++) nk(x, 0, 0); for (const [a, b2] of [[0, 1], [-1, 2], [0, 2], [1, 2], [0, 3]]) nk(a, b2, 1); }
      else if (neckwear === 'Medal') { nk(-1, 0, 0); nk(0, 1, 0); nk(1, 0, 0); for (const [a, b2] of [[0, 2], [-1, 3], [0, 3], [1, 3], [0, 4]]) nk(a, b2, 1); }
      if (holding !== 'Nothing' && eat > 1.9 && dip === 0) {
        const it = (x, y, v) => Ld(hx + 13 + x, hy + 4 + y, v), k = holding;
        if (k === 'Cracker' || k === 'Letter' || k === 'Remote') { for (let y = 0; y <= 3; y++) for (let x = -2; x <= 2; x++) it(x, y, (k === 'Letter' && y === Math.abs(x) - 0) || (k === 'Remote' && x === 0 && y % 2) ? 0 : 3); }
        else if (k === 'Key') { for (const [a, b2] of [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [0, 3], [0, 4], [1, 4], [1, 3]]) it(a, b2, 3); }
        else if (k === 'Bell') { for (const [a, b2] of [[0, 0], [-1, 1], [0, 1], [1, 1], [-1, 2], [0, 2], [1, 2], [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [0, 4]]) it(a, b2, b2 === 4 ? 0 : 3); }
        else if (k === 'Grapes' || k === 'Cherry') { for (const [a, b2] of (k === 'Grapes' ? [[-1, 1], [1, 1], [0, 2], [-1, 3], [1, 3], [0, 4]] : [[-1, 3], [1, 3]])) { it(a, b2, 2); } it(0, 0, 0); it(0, 1, 0); }
        else if (k === 'Chili') { for (let q = 0; q < 5; q++) it(q - 2, Math.round(Math.sin(q / 4 * Math.PI) * 1.5) + 1, q === 0 ? 0 : 2); }
        else for (let y = 0; y <= 3; y++) for (let x = -2; x <= 2; x++) if (x * x + (y - 1.5) ** 2 <= (k === 'Seed' ? 2 : 4.5)) it(x, y, k === 'Gold Coin' ? (x + y < 0 ? 3 : 2) : k === 'Strawberry' && (x + y) % 2 ? 3 : 2);
      }
      for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) {
        const v = spr[y * R + x];
        if (v >= 0) { d[y * R + x] = P[v]; continue; }
        if ((x > 0 && spr[y * R + x - 1] >= 0) || (x < R - 1 && spr[y * R + x + 1] >= 0) || (y > 0 && spr[(y - 1) * R + x] >= 0) || (y < R - 1 && spr[(y + 1) * R + x] >= 0)) d[y * R + x] = P[0];
      }
      // after the gulp: a heart floats up off its head, then a burp
      const headX = Math.round(bx - fc * hx), headY = Math.round(by + hy);
      if (eat > 0.85 && eat < 1.7) { const u = (eat - 0.85) / 0.85, x = headX, y = Math.round(headY - 9 - u * 8); ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'].forEach((row, r) => { for (let q = 0; q < 7; q++) if (row[q] === '#') lpx(x - 3 + q, y + r, P[0]); }); lpx(x - 2, y + 1, P[3]); }
      if (eat > 1.35 && eat < 1.9) { const u = (eat - 1.35) / 0.55, bxk = Math.round(bx - fc * (hx + 17)), r = 1 + u * 3; for (let q = 0; q < 10; q++) { const a = q / 10 * 6.283; lpx(bxk + Math.cos(a) * r, headY + Math.sin(a) * r, P[0]); } ltext3('BURP', fc > 0 ? Math.max(0, bxk - 16) : Math.min(R - 16, bxk + 2), headY - 9, P[0]); }
      // no header: a flashing Title blinks the game's name small in the corner of the sky, a flashing Header Bar a line along the top
      if (flashName === 'Title' && sec) ltext3('DODO', back > 0 ? 46 : 2, 2, P[0]);
      if (flashName === 'Header Bar' && sec) for (let x = 0; x < R; x++) lpx(x, 0, P[0]);
    }
    // ---------- the Clockwork bird: a blueprint, its patent drawing ----------
    // white line on Prussian blue: the bird (FIG. 1) as one bold solid shape on its perch, and beside it (FIG. 2) an
    // exploded view of its gear train along a dashed axis, with dimension arrows, numbered parts and a title block
    function blueprint(t, dt, held, taps, inp) {
      const R = lgB.R, d = lgB.d;
      const BW = screen === 'Black & White';
      const BG = ABGR(BW ? 0x303030 : 0x153f72), GRID = ABGR(BW ? 0x3c3c3c : 0x1d4c84), WH = ABGR(BW ? 0xf4f4f4 : 0xf2f7ff), LI = ABGR(BW ? 0xa8a8a8 : 0x8ab4e4), DK = ABGR(BW ? 0x202020 : 0x0c2c56);
      // winding: circle the finger round the drawing; a short still tap gives one notch; let go and it sings until it runs down
      for (const tp of taps) { cw.wind = Math.min(1, cw.wind + 0.05); c.sound.hit('click', 0.16); }
      if (held) {
        const a = Math.atan2(inp.y * R - 40, inp.x * R - 40);
        if (cw.ang !== null) { let da = a - cw.ang; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI; if (Math.abs(da) < 1.2) { cw.acc += Math.abs(da); cw.spin += Math.abs(da); } if (cw.acc > Math.PI / 4) { cw.acc = 0; cw.wind = Math.min(1, cw.wind + 0.07); c.sound.hit('click', 0.14); c.sound.note(home + 31 + Math.round(cw.wind * 7), { dur: 0.02, vel: 0.05, wave: 'square', cutoff: 4000 }); } }
        cw.ang = a;
      } else {
        cw.ang = null;
        if (cw.wind > 0) {
          cw.wind = Math.max(0, cw.wind - dt * 0.07); cw.spin += dt * (2.5 + cw.wind * 10);
          if (t >= cw.nextAt) { cw.nextAt = t + 0.18 / Math.max(0.3, Math.min(1, cw.wind * 2.5)); cw.noteAt = t; const dg = MEL[cw.step % MEL.length]; cw.step++; cw.notes.push([t, dg]); c.sound.note(home + ladder[dg] + 24, { dur: 0.5, vel: 0.12, wave: 'sine' }); }
        }
      }
      cw.notes = cw.notes.filter(n => t - n[0] < 2.2);
      if (Math.floor(t * 2) !== cw.tick) { cw.tick = Math.floor(t * 2); cw.spin += 0.16; }   // the escapement: a tick every half second
      const sing = cw.wind > 0 && cw.ang === null, since = t - cw.noteAt, pose3 = !sing ? 0 : since < 0.09 ? 2 : since < 0.2 ? 1 : 0, gape = pose3;
      const fx = x => facing > 0 ? x : R - 1 - x;      // facing Right: the sheet drawn in mirror
      const P = (x, y, c2) => lpx(fx(x), y, c2);
      const line = (x0, y0, x1, y1, c2, dash) => { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))) || 1; for (let k = 0; k <= n; k++) if (!dash || (k % 6) < (dash === 2 ? 1 : 4)) P(Math.round(x0 + (x1 - x0) * k / n), Math.round(y0 + (y1 - y0) * k / n), c2); };
      const arrow = (x, y, dx, dy, c2) => { P(x, y, c2); P(x - dx - dy, y - dy + dx, c2); P(x - dx + dy, y - dy - dx, c2); };
      // the sheet: blue, a fine grid, a border rule
      for (let y = 0; y < R; y++) for (let x = 0; x < R; x++) d[y * R + x] = (x % 8 === 0 || y % 8 === 0) ? GRID : BG;
      for (let k = 1; k < R - 1; k++) { lpx(k, 1, LI); lpx(k, R - 2, LI); lpx(1, k, LI); lpx(R - 2, k, LI); }
      const Q = (x, y, c2) => P(x + 3, y, c2), lineQ = (x0, y0, x1, y1, c2, dash) => line(x0 + 3, y0, x1 + 3, y1, c2, dash), arrowQ = (x, y, dx, dy, c2) => arrow(x + 3, y, dx, dy, c2);
      // FIG. 1, the bird: one solid shape (body, head, fan tail, wing raised when it sings), the perch and its bracket
      const S = cw.S || (cw.S = new Uint8Array(R * R)); S.fill(0);
      const sv = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < R && y < R) S[y * R + x] = Math.max(S[y * R + x], v); };
      const ell = (cx2, cy2, rx, ry, v) => { for (let y = Math.floor(cy2 - ry); y <= cy2 + ry; y++) for (let x = Math.floor(cx2 - rx); x <= cx2 + rx; x++) if (((x - cx2) / rx) ** 2 + ((y - cy2) / ry) ** 2 <= 1) sv(x, y, v); };
      const bob = sing ? (Math.floor(t * 8) % 2) : 0, by = 36 + bob;
      for (let k = 0; k < 5; k++) { const a = 0.35 + k * 0.2 + (sing ? Math.sin(t * 7 + k) * 0.05 : 0); for (let r = 0; r < 17; r++) for (let w = -1; w <= 1; w++) sv(30 + Math.cos(a) * r - Math.sin(a) * w * (1 + r / 12), by + 3 + Math.sin(a) * r + Math.cos(a) * w * (1 + r / 12), 1); }
      ell(22, by, 11, 8, 1);
      ell(13, by - 9, 6, 6, 1);
      { const open = [0, 0.45, 0.95][pose3];
        for (let x = 0; x <= 8; x++) { const top = by - 12 + (8 - x) * 0.35, bot = by - 9.5 + (8 - x) * 0.1; for (let y = Math.round(top); y <= Math.round(bot); y++) sv(8 - x, y, 2); }
        for (let x = 0; x <= 8; x++) { const yc = by - 8 + (8 - x) * open + x * 0.05; sv(8 - x, yc, 2); if (x > 2) sv(8 - x, yc + 1, 2); } }
      const wa = [-0.25, -0.75, -1.25][pose3];
      for (let r = 0; r < 15; r++) for (let w = -2.5 + r * 0.12; w <= 2.5 - r * 0.12; w++) sv(20 + Math.cos(wa) * r - Math.sin(wa) * w, by - 3 + Math.sin(wa) * r + Math.cos(wa) * w, 3);
      for (let k = 0; k < 3; k++) for (let j = 0; j < 5; j++) sv(14 + k * 2 + (j % 2), by - 15 - j, 1);
      // perch and legs
      for (let x = 6; x < 40; x++) { Q(x, 48, WH); Q(x, 49, WH); }
      lineQ(10, 50, 10, 58, WH); lineQ(7, 58, 13, 58, WH); lineQ(10, 54, 16, 50, LI);
      lineQ(19, by + 7, 18, 47, WH); lineQ(25, by + 7, 26, 47, WH);
      for (let y = 0; y < R; y++) for (let x = 0; x < 46; x++) {
        const v = S[y * R + x]; if (!v) continue;
        Q(x, y, v === 2 ? LI : WH);
      }
      for (let y = 1; y < R - 1; y++) for (let x = 1; x < 46; x++) { const i = y * R + x; if (S[i] === 3 && (!S[i - 1] || S[i - 1] !== 3 || !S[i - R] || S[i - R] !== 3)) Q(x, y, DK); }
      // in its body a window: the gear that turns its heart, and the eye a lens
      { const gx = 23, gy = by + 2, ga = cw.spin * 2; for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const r = Math.hypot(x, y), a = Math.atan2(y, x); if (r <= 2.6 + (Math.cos((a - ga) * 6) > 0.3 ? 1.2 : 0) && r > 1) Q(gx + x, gy + y, DK); } }
      { const ex = 12, ey = by - 10; for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) if (x * x + y * y <= 5) Q(ex + x, ey + y, DK); Q(ex, ey, WH); }
      // the key in its back, turning
      { const kc = Math.cos(cw.spin * 1.5); lineQ(30, by - 6, 34, by - 10, WH); for (const s of [-1, 1]) for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) if (x * x + y * y <= 4) Q(35 + s * 2.5 * kc + x * Math.max(0.35, Math.abs(kc)), by - 12 + y, WH); }
      // its song: notes drifting up off the beak
      for (const [nt, dg] of cw.notes) { const u = t - nt, x = Math.round(4 + u * 10 + Math.sin(u * 5 + dg) * 2), y = Math.round(by - 14 - u * 22 - dg); if (y > 9) { for (let b2 = -2; b2 <= 2; b2++) for (let a = -2; a <= 2; a++) if (a * a + b2 * b2 <= 5) Q(x + a, y + b2, a * a + b2 * b2 > 3.5 ? DK : WH); for (let k = 0; k < 9; k++) { Q(x + 2, y - k, WH); Q(x + 3, y - k, DK); } Q(x + 3, y - 8, WH); Q(x + 4, y - 7, WH); Q(x + 5, y - 6, WH); Q(x + 5, y - 5, WH); } }
      // dimension arrows: the bird's length under the perch, its height beside it
      lineQ(6, 59, 40, 59, LI); arrowQ(6, 59, -1, 0, LI); arrowQ(40, 59, 1, 0, LI); lineQ(6, 57, 6, 61, LI); lineQ(40, 57, 40, 61, LI);
      ltext3('42', facing > 0 ? 23 : R - 1 - 23 - 6, 52, LI);
      // FIG. 2, the exploded gear train along a dashed axis: the mainspring (coiled tighter as it is wound), three gears
      // meshing (each turning its own way at its own speed), the key; numbered parts with leader lines
      const AX = 60;
      line(AX, 6, AX, 58, LI, 2);
      line(40, by - 10, AX - 8, 12, LI, 1);
      const gear = (cx2, cy2, r, teeth, a0) => {
        for (let y = Math.floor(cy2 - r - 2); y <= cy2 + r + 2; y++) for (let x = Math.floor(cx2 - r - 2); x <= cx2 + r + 2; x++) {
          const dx = x - cx2, dy = y - cy2, rr = Math.hypot(dx, dy), a = Math.atan2(dy, dx), tooth = Math.cos((a - a0) * teeth) > 0.2;
          if (rr <= r + (tooth ? 2 : 0) && rr > 1.6) { const spoke = rr < r - 2 && rr > 2.6 && Math.cos((a - a0) * 3) < 0.4; P(x, y, spoke ? BG : WH); }
        }
        P(cx2, cy2, WH);
      };
      const sp = cw.spin;
      gear(AX, 24, 10, 12, sp * 0.8);
      gear(AX + 2, 46, 8, 9, -sp * 0.8 * 12 / 9 + 0.25);
      // the mainspring, a spiral, drawn tighter the more it is wound
      { const turns = 2 + cw.wind * 3, cx2 = AX, cy2 = 7; for (let k = 0; k < 120; k++) { const u = k / 120, a = u * turns * 6.283 + sp, r = 0.6 + u * 3.6; P(Math.round(cx2 + Math.cos(a) * r * 1.4), Math.round(cy2 + Math.sin(a) * r * 0.8), WH); } }
      // reference numerals in circles, on leader lines
      const balloon = (x, y, n, lx, ly) => { line(x, y, lx, ly, LI); for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; P(Math.round(x + Math.cos(a) * 3.5), Math.round(y + Math.sin(a) * 3.5), LI); } ltext3(String(n), fx(x) - 1, y - 2, WH); };
      balloon(73, 9, 1, AX + 5, 7); balloon(75, 26, 2, AX + 12, 24); balloon(75, 44, 3, AX + 11, 46);
      // the winding: a dimension arc round FIG. 2, filled as far as it is wound
      { const n = Math.round(cw.wind * 48); for (let k = 0; k <= 48; k++) { const a = -Math.PI / 2 + k / 48 * 6.283, on = k < n; for (const dr of on ? [0, 1] : [0]) { const x = Math.round(AX + Math.cos(a) * (16 + dr)), y = Math.round(30 + Math.sin(a) * (26 + dr)); if (on || k % 4 === 0) P(x, y, on ? WH : LI); } } if (n) { const a = -Math.PI / 2 + n / 48 * 6.283; P(Math.round(AX + Math.cos(a) * 18.5), Math.round(30 + Math.sin(a) * 28.5), WH); P(Math.round(AX + Math.cos(a) * 14), Math.round(30 + Math.sin(a) * 24), WH); } }
      // the labels, and the title block: the bird's name, and its traits, whole, one at a time
      const sec = Math.floor(t) % 2 === 1;
      const txt = (s, x, y, c2) => { s = W(s); for (let i = 0; i < s.length; i++) { const g2 = F3[s[i]]; if (!g2) continue; for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (g2[r * 3 + q] === '#') lpx(x + i * 4 + q, y + r, c2); } };
      txt('FIG.1', facing > 0 ? 4 : R - 24, 4, flashName === 'Title' && sec ? LI : WH);
      txt('FIG.2', facing > 0 ? 58 : 3, 57, WH);
      const TB = 63;
      for (let x = 2; x < R - 2; x++) { lpx(x, TB, flashName === 'Header Bar' && sec ? WH : LI); }
      const [lab, val] = LT[Math.floor(t / 2.8) % LT.length];
      const v = W(val).slice(0, 19), l2 = W(lab) + ' ' + v;
      // the title block: the name in big blueprint capitals, the sheet's number, and its traits as the drawing's notes, whole
      ltext5('CLOCKWORK', 4, TB + 2, flashName === 'Title' && sec ? LI : WH);
      const li = Math.floor(t / 2.8) % LT.length; txt((li + 1) + '/' + LT.length, R - 16, TB + 3, LI);
      for (let y = TB; y < TB + 10; y++) lpx(R - 19, y, LI);
      txt(l2.length <= 19 ? l2 : v, 4, TB + 10, LI);
      if (flashName === 'Clock') { const secs = clock0 + t, cx2 = facing > 0 ? 72 : 7, cy2 = 72; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; lpx(Math.round(cx2 + Math.cos(a) * 4), Math.round(cy2 + Math.sin(a) * 4), sec ? WH : LI); } const ha = (secs / 3600 % 12) / 12 * 6.283 - Math.PI / 2, ma = (secs / 60 % 60) / 60 * 6.283 - Math.PI / 2; for (let r = 0; r <= 2; r++) lpx(Math.round(cx2 + Math.cos(ha) * r), Math.round(cy2 + Math.sin(ha) * r), WH); for (let r = 0; r <= 3; r++) lpx(Math.round(cx2 + Math.cos(ma) * r), Math.round(cy2 + Math.sin(ma) * r), WH); }
    }
    const two = n => (n < 10 ? '0' : '') + n;
    function show(t) {
      // the page, wiping in row by row after a flip, then the bird over it
      const fresh = buildPage(shown), old = buildPage(before), wipe = (t - flipAt) * 70;
      for (let y = TOP; y < BOT; y++) { const src = y < wipe ? fresh : old; for (let x = 0; x < X; x++) img[y * X + x] = src[y * X + x]; }
      pageImg.set(img); pri.fill(0); lay.fill(0);
      bird(t, gape, !!song || heard.length > 0, heard.length > 0 && !song);
      // a quiet margin: within two chunks of the bird the page's pattern gives way to that row's own quiet colour
      near.fill(0);
      for (let y = TOP; y < BOT; y++) for (let x = 0; x < X; x++) if (lay[y * X + x] === 1) for (let d = -2; d <= 2; d++) if (x + d >= 0 && x + d < X) rowN[y * X + x + d] = 1;
      for (let y = TOP; y < BOT; y++) for (let x = 0; x < X; x++) if (rowN[y * X + x]) for (let d = -2; d <= 2; d++) if (y + d >= TOP && y + d < BOT) near[(y + d) * X + x] = 1;
      rowN.fill(0);
      const calmF = calmCache[shown], calmO = calmCache[before];
      for (let y = TOP; y < BOT; y++) { const cv = (y < wipe ? calmF : calmO)[y]; for (let x = 0; x < X; x++) { const i = y * X + x; if (near[i] && !lay[i]) { img[i] = cv; pageImg[i] = cv; } } }
      encode();
      const sep = screen === 'Separated';
      for (let y = TOP; y < BOT; y++) {
        const y0 = Math.round(y * S / Yn), y1 = Math.round((y + 1) * S / Yn);
        for (let x = 0; x < X; x++) {
          const x0 = Math.round(x * S / X), x1 = Math.round((x + 1) * S / X);
          const cell = Math.floor(y / 3) * CW + (x >> 1);
          const on = bits[y * X + x];
          if (sep) {
            // separated chunks: each lit chunk shrinks and the cell background shows round it
            cx.fillStyle = css[cellBg[cell]];
            cx.fillRect(x0, y0, x1 - x0, y1 - y0);
            if (on) {
              const gx = Math.max(1, Math.round((x1 - x0) * 0.2)), gy = Math.max(1, Math.round((y1 - y0) * 0.2));
              cx.fillStyle = css[cellFg[cell]];
              cx.fillRect(x0, y0, x1 - x0 - gx, y1 - y0 - gy);
            }
          } else {
            cx.fillStyle = css[on ? cellFg[cell] : cellBg[cell]];
            cx.fillRect(x0, y0, x1 - x0, y1 - y0);
          }
        }
      }
      // header: page number, the bird's name, and a clock that ticks; one thing flashes once a second
      const secs = (clock0 + Math.floor(t)) % 86400;
      const clock = two(Math.floor(secs / 3600)) + ':' + two(Math.floor(secs / 60) % 60) + ':' + two(secs % 60);
      const flashOn = Math.floor(t) % 2 === 1;
      textRow(0, [[0, 'P' + shownNo, Wt], [5, TITLE, flashWhat === 1 && flashOn ? Wt : Y], [16, clock, flashWhat === 0 && flashOn ? C : Wt]], flashWhat === 2 && flashOn ? K : B);
      textRow(CH - 1, links.map((p, i) => [i * 6, SHORT[p], [R, G, Y, C][i]]), K);
      if (screen === 'Ghosting') { cx.globalAlpha = 0.2; cx.drawImage(cx.canvas, 0, 0, S, S, Math.round(S * 0.014), 0, S, S); cx.globalAlpha = 1; }
      if (scan) cx.drawImage(scan, 0, 0);
    }
    if (legend !== 'None') legendFrame(0, c.input); else show(0);
    return (t) => {
      const inp = c.input;
      if (legend !== 'None') { legendFrame(t, inp); return; }   // a legendary is drawn in a medium of its own
      hov = inp.inside ? [inp.x * X, inp.y * Yn] : null;
      for (const beat of inp.taps()) {
        // the coloured links flip the page
        if (beat.y > (CH - 1) / CH) {
          const k = Math.max(0, Math.min(3, Math.floor(beat.x * 4)));
          if (links[k] !== shown) {
            before = shown; shown = links[k]; flipAt = t; shownNo = 100 + (shownNo + 7 + k * 13) % 800;
            c.sound.note(home + 19, { dur: 0.06, vel: 0.1, wave: 'square', cutoff: 1800 });
            c.sound.note(home + 24, { at: 0.07, dur: 0.08, vel: 0.08, wave: 'square', cutoff: 1800 });
          }
          continue;
        }
        if (song) continue;
        if (t - lastTap > 1.6) heard = [];
        if (heard.length < 8) {
          const deg = Math.max(0, Math.min(7, Math.floor((1 - beat.y) * 8)));
          heard.push([heard.length ? t - heard[0][2] : 0, deg, t]);
          c.sound.note(home + ladder[deg], { dur: 0.18, vel: 0.14, wave: 'sine', pan: (beat.x - 0.5) * 0.6 });
          // each tap stirs a legendary: sparks fly off the phoenix, the clockwork key clicks round a notch, the dodo blinks
          legAt = t;
          if (legend === 'Phoenix') c.sound.hit('noise', 0.06, { cutoff: 7000, dur: 0.15 });
          else if (legend === 'Clockwork') { keyTurns++; c.sound.hit('click', 0.16); }
        }
        lastTap = t;
      }
      // after a pause it sings what it heard, a little quicker, in its own squawky voice
      if (!song && heard.length && t - lastTap > 0.9) {
        song = { at: t, notes: heard.map(h => [h[0] * 0.85, h[1]]) };
        const flourish = wr() < 0.35;
        // its voice: a squawk, or the legendary's own (a flame's breathy whistle, a dodo's honk, a music box)
        const vo = legend === 'Phoenix' ? [24, 'triangle', 0.16] : legend === 'Dodo' ? [-12, 'square', 0.16] : legend === 'Clockwork' ? [24, 'sine', 0.14] : [12, 'square', 0.18];
        for (const [when, deg] of song.notes) {
          c.sound.note(home + ladder[deg] + vo[0], { at: when, dur: legend === 'Clockwork' ? 0.4 : 0.12, vel: vo[2], wave: vo[1], cutoff: legend === 'Dodo' ? 900 : 2400, pan: -0.3 * facing });
          if (legend === 'None') c.sound.note(home + ladder[deg] + 12 + accent, { at: when + 0.015, dur: 0.05, vel: 0.05, wave: 'sawtooth', cutoff: 2800, pan: -0.3 * facing });
          if (legend === 'Dodo') c.sound.note(home + ladder[deg] - 14, { at: when + 0.06, dur: 0.08, vel: 0.1, wave: 'square', cutoff: 700 });
          if (legend === 'Clockwork') c.sound.hit('click', 0.08, { at: when });
          if (holding === 'Golden Microphone') c.sound.note(home + ladder[deg] + 24, { at: when + 0.02, dur: 0.18, vel: 0.08, wave: 'sine', pan: 0.3 * facing });
        }
        if (legend === 'Phoenix') { c.sound.hit('noise', 0.18, { at: song.notes[song.notes.length - 1][0] + 0.15, cutoff: 1200, dur: 0.7 }); legAt = t + song.notes[song.notes.length - 1][0] + 0.15; }
        if (flourish) c.sound.note(home + ladder[7] + 12, { at: song.notes[song.notes.length - 1][0] + 0.2, dur: 0.08, vel: 0.14, wave: 'square', cutoff: 2400, pan: -0.3 * facing });
        song.end = song.notes[song.notes.length - 1][0] + (flourish ? 0.35 : 0.2);
        heard = [];
      }
      gape = 0;
      if (song) {
        const u = t - song.at;
        if (u > song.end + 0.4) song = null;
        else for (const [when] of song.notes) if (u >= when && u < when + 0.13) gape = BIGBEAK ? 2 : 1;
      }
      show(t);
    };
  },
});

})(window.Proto);
