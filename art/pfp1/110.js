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
    show(0);
    return (t) => {
      const inp = c.input;
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
