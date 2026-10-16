// Cubelings: from D:/code/synaesthesia/public/drop03/pieces/005.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Cubelings: little isometric cube creatures, drawn on true 2:1 pixel slopes. The face sits across the front corner.
Proto.add({
  num: 5,
  name: 'Cubelings',
  seed: 364,
  fam: 'Pixel Portraits',
  recipe: 'A block-shaped creature drawn in isometric pixel art on a 40-cell grid, its face folded across the front corner of the cube. Material, build, eyes, mouth, what grows on top, cheeks and the room behind it vary, and some bring a tiny pal (rarely a golden one). About 1 in 450 is a legendary (an aquarium cube with a goldfish inside, a mimic treasure chest, a flickering hologram on its projector) and 1 in 200 has a tiny UFO hovering overhead.',
  interactive: 'Tap the cube to make it hop. Hold it down to squish it.',
  music: true,
  make(c) {
    const S = c.size, N = 40;
    // an LCG, seeded with FNV-1a over the hash text; high bits only
    let h = 0x811c9dc5;
    for (let i = 0; i < c.hash.length; i++) { h ^= c.hash.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    let s = h;
    const lcg = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return (s >>> 8) / 16777216; };
    for (let i = 0; i < 5; i++) lcg();
    const draw = table => {
      let tot = 0;
      for (let i = 1; i < table.length; i += 2) tot += table[i];
      let r = lcg() * tot;
      for (let i = 0; i < table.length; i += 2) { r -= table[i + 1]; if (r < 0) return table[i]; }
      return table[0];
    };

    let material = draw(['Clay', 22, 'Stone', 18, 'Wood', 18, 'Ice', 12, 'Jelly', 12, 'Cardboard', 10, 'Marble', 6, 'Gold', 4]);
    let eyes = draw(['Dots', 28, 'Wide', 22, 'Sleepy', 16, 'Cross', 10, 'Sparkle', 12, 'Big Single', 6, 'Visor', 6]);
    let mouth = draw(['Smile', 30, 'Open', 18, 'Teeth', 14, 'Wavy', 14, 'Cat', 14, 'None', 10]);
    let top = draw(['Nothing', 22, 'Sprout', 20, 'Candle', 14, 'Mushroom', 12, 'Snow', 12, 'Little Tree', 10, 'Birdie', 6, 'Crown', 4]);
    let room = draw(['Tiles', 26, 'Pastel', 22, 'Grid', 18, 'Dots', 18, 'Stripes', 16]);
    const cheeks = lcg() < 0.4;
    let roomHue = Math.floor(lcg() * 6);
    const blinkEvery = 3 + lcg() * 3, blinkAt = lcg() * 4, hopEvery = 4 + lcg() * 4, hopAt = lcg() * 4;
    const grain = [];
    for (let i = 0; i < 40; i++) grain.push(lcg());

    c.trait('Material', material);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('On Top', top);
    c.trait('Room', room);
    c.trait('Cheeks', cheeks ? 'Rosy' : 'Plain');
    c.trait('Wall', ['Peach', 'Mint', 'Periwinkle', 'Rose', 'Butter', 'Sky'][roomHue]);
    // later additions from a second LCG on the hash's tail, so every draw above keeps its value
    let s2 = parseInt(c.hash.slice(-13, -5), 16) >>> 0;
    const lcg2 = () => { s2 = (Math.imul(s2, 22695477) + 1) >>> 0; return (s2 >>> 8) / 16777216; };
    lcg2();
    let tall = lcg2() < 0.28;
    c.trait('Build', tall ? 'Tall Block' : 'Cube');
    const pr2 = lcg2();
    let pal = pr2 < 0.02 ? 'Golden Pal' : pr2 < 0.2 ? 'Pebble Pal' : 'None';
    c.trait('Pal', pal);
    const palLeft = lcg2() < 0.5;
    // sooo many more cubelings: the same second LCG keeps going, so every roll above stays put,
    // and about half of them trade a trait for one of the new ones
    const pick2 = table => { let tot = 0; for (const k in table) tot += table[k]; let r = lcg2() * tot; for (const k in table) if ((r -= table[k]) < 0) return k; return Object.keys(table)[0]; };
    const more = (was, p, table) => lcg2() < p ? pick2(table) : was;
    material = more(material, 0.6, { Clay: 8, Stone: 7, Wood: 7, Ice: 5, Jelly: 5, Cardboard: 4, Marble: 3, Gold: 2, Moss: 9, Toast: 10, Cheese: 9, Watermelon: 8, Brick: 7, Sponge: 7, Candy: 8, Plush: 9, Galaxy: 2, Rainbow: 1.5 });
    eyes = more(eyes, 0.6, { Dots: 10, Wide: 8, Sleepy: 6, Cross: 4, Sparkle: 6, 'Big Single': 3, Visor: 2, Heart: 9, Star: 7, Happy: 11, Wink: 8, 'Anime Shine': 9, Glasses: 6, Swirl: 4, Content: 9, 'Looking Up': 7 });
    mouth = more(mouth, 0.55, { Smile: 12, Open: 7, Teeth: 6, Wavy: 6, Cat: 7, None: 4, Blep: 12, Oh: 10, Fang: 9, Smirk: 8, Drool: 5 });
    top = more(top, 0.6, { Nothing: 8, Sprout: 7, Candle: 5, Mushroom: 5, Snow: 4, 'Little Tree': 4, Birdie: 3, Crown: 2, 'Party Hat': 9, Bow: 9, Cherries: 8, Daisy: 8, Halo: 5, Antenna: 7, Propeller: 7, 'Baby Cube': 6, 'Egg Nest': 5, 'Rain Cloud': 5, Cactus: 6, Snail: 5, Beret: 6 });
    room = more(room, 0.55, { Tiles: 8, Pastel: 7, Grid: 6, Dots: 6, Stripes: 5, Clouds: 10, Hearts: 9, Checker: 8, Confetti: 9, Plaid: 8 });
    if (lcg2() < 0.4) roomHue = 6 + Math.floor(lcg2() * 4);
    let cheekStyle = cheeks ? 'Rosy' : pick2({ Plain: 62, Freckles: 14, Hearts: 9, Bandage: 8, Sticker: 7 });
    let limbs = pick2({ None: 40, Feet: 30, Arms: 16, 'Arms and Feet': 14 });
    let holding = limbs.startsWith('Arms') ? pick2({ Nothing: 40, Balloon: 20, Flower: 16, Lollipop: 14, 'Tiny Flag': 10 }) : 'Nothing';
    let extra = pick2({ None: 46, Scarf: 12, Bowtie: 12, Necklace: 9, Headphones: 9, 'Star Sticker': 8, Monocle: 2 });
    let slab = !tall && lcg2() < 0.18;
    if (pal === 'None' && lcg2() < 0.2) pal = pick2({ 'Slime Pal': 30, 'Bunny Pal': 30, 'Duck Pal': 25, 'Ghost Pal': 15 });
    // the legendaries and the coveted tiny UFO: a murmur-style hash of the hash's eight words, salted per
    // draw, its own stream, so every cubeling rolled above keeps its look
    const mm = salt => {
      let q = 0x1b873593 ^ salt;
      for (let i = 2; i < 66; i += 8) {
        let w = Math.imul(parseInt(c.hash.slice(i, i + 8), 16) | 0, 0xcc9e2d51);
        w = Math.imul((w << 15) | (w >>> 17), 0x1b873593);
        q ^= w; q = (q << 13) | (q >>> 19); q = (Math.imul(q, 5) + 0xe6546b64) | 0;
      }
      q ^= q >>> 16; q = Math.imul(q, 0x85ebca6b); q ^= q >>> 13; q = Math.imul(q, 0xc2b2ae35); q ^= q >>> 16;
      return (q >>> 0) / 4294967296;
    };
    // fewer brown cubes: about four in ten of the clay, wood, cardboard, toast and brick ones turn into one
    // of the bright or strange materials instead (its own salted draws, so nothing else moves)
    const BROWN = ['Clay', 'Wood', 'Cardboard', 'Toast', 'Brick'];
    if (BROWN.includes(material) && mm(0x42524e) < 0.42) {
      const BRIGHT = ['Moss', 14, 'Jelly', 12, 'Ice', 10, 'Candy', 12, 'Plush', 12, 'Watermelon', 10, 'Glass Bead', 15, 'Felt', 15];
      let r = mm(0x42524f) * 100;
      for (let i = 0; i < BRIGHT.length; i += 2) if ((r -= BRIGHT[i + 1]) < 0) { material = BRIGHT[i]; break; }
    }
    // a monocle never lands on a single big eye or a visor: it trades for another accessory
    if (extra === 'Monocle' && (eyes === 'Big Single' || eyes === 'Visor')) extra = ['Bowtie', 'Necklace', 'Scarf', 'Star Sticker'][Math.floor(mm(0x4d4f4e) * 4)];
    const lr = mm(0x4c47);
    const legend = lr < 0.0008 ? 'Aquarium' : lr < 0.0016 ? 'Mimic' : lr < 0.0022 ? 'Hologram' : 'None';
    const ufo = legend === 'None' && mm(0x55464f) < 0.005;
    if (legend === 'Aquarium') {
      // the tank is all fish and water: no ordinary face, nothing on top, no arms; and always a full cube
      material = 'Glass Tank'; eyes = 'Bubbles'; mouth = 'None'; top = 'Nothing'; extra = 'None';
      if (limbs.startsWith('Arms')) limbs = limbs === 'Arms' ? 'None' : 'Feet';
      holding = 'Nothing'; slab = false;
    }
    if (legend === 'Mimic') {
      // a proper treasure chest: domed lid, bands, brass hasp; only its eyes peep out from under the lid
      material = 'Mimic Chest'; mouth = 'Toothy Lid'; eyes = 'Peeping'; top = 'Nothing'; extra = 'None';
      if (limbs.startsWith('Arms')) limbs = limbs === 'Arms' ? 'None' : 'Feet';
      holding = 'Nothing'; slab = false;
    }
    if (legend === 'Hologram') material = 'Hologram';
    if (legend === 'Aquarium' || legend === 'Mimic') cheekStyle = 'Plain';
    c.trait('Material', material);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('On Top', top);
    c.trait('Room', room);
    c.trait('Cheeks', cheekStyle);
    c.trait('Wall', ['Peach', 'Mint', 'Periwinkle', 'Rose', 'Butter', 'Sky', 'Lilac', 'Coral', 'Seafoam', 'Night'][roomHue]);
    c.trait('Build', tall ? 'Tall Block' : slab ? 'Slab' : 'Cube');
    c.trait('Pal', pal);
    c.trait('Limbs', limbs);
    if (holding !== 'Nothing') c.trait('Holding', holding);
    c.trait('Accessory', extra);
    if (legend !== 'None') c.trait('Legendary', legend);
    if (ufo) c.trait('Visitor', 'Tiny UFO');
    // the cube's own outline: soft corners, a puffed pillow, a bite out of one corner, or melting into a puddle.
    // Its own salted draws of the same murmur hash, so every roll above stays put; legendaries stay true cubes
    const sr = mm(0x534850);
    const shape = legend !== 'None' ? 'Cube' : sr < 0.28 ? 'Cube' : sr < 0.48 ? 'Rounded' : sr < 0.66 ? 'Pillow' : sr < 0.84 ? 'Chipped' : 'Melting';
    c.trait('Shape', shape);
    const sr2 = mm(0x534851), chipLeft = sr2 < 0.5;
    const topCut = new Array(14).fill(0), botCut = new Array(14).fill(0), topAdd = new Array(14).fill(0), botAdd = new Array(14).fill(0);
    if (shape === 'Rounded') { topCut[0] = topCut[1] = 1; topCut[11] = 1; topCut[12] = 2; topCut[13] = 3; botCut[0] = botCut[1] = botCut[2] = 1; botCut[11] = 1; botCut[12] = 2; botCut[13] = 3; }
    if (shape === 'Pillow') { topCut[0] = topCut[1] = topCut[13] = 1; botCut[0] = botCut[1] = botCut[13] = 1; [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0].forEach((a, k) => { topAdd[k] = a; botAdd[k] = a; }); }
    if (shape === 'Melting') { topCut[12] = 1; topCut[13] = 2; }
    if (legend === 'Mimic') [0, 0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 0, 0].forEach((a, k) => { topAdd[k] = a; });
    // melting drips: four of them along the bottom edges, two cells wide, stretching and shrinking slowly
    const DRIPS = [[8 + Math.floor(sr2 * 3), 3], [14 + Math.floor(sr2 * 7) % 3, 5], [22 + Math.floor(sr2 * 11) % 3, 2], [27 + Math.floor(sr2 * 5) % 3, 4]];
    if (sr2 * 13 % 1 < 0.5) { const l = DRIPS[1][1]; DRIPS[1][1] = DRIPS[3][1]; DRIPS[3][1] = l; }
    const chipX = chipLeft ? 7 : 33, inChip = (x, y, ty) => shape === 'Chipped' && ((x + 0.5 - chipX) / 4.4) ** 2 + ((y + 0.5 - ty - 7.5) / 2.6) ** 2 < 1;

    const rgb = (r, g, b) => (255 << 24) | (b << 16) | (g << 8) | r; // little-endian ABGR
    const hx = v => rgb(parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16));
    // top, left, right, outline, accent
    const MAT = {
      Clay: ['#f0a07a', '#d0734c', '#a2502f', '#3a1608', '#ffd0b0'],
      Stone: ['#b8bcc4', '#8a8e98', '#626670', '#1c1e24', '#6aa05a'],
      Wood: ['#e0b070', '#bc8848', '#8c5e2c', '#2c1808', '#704418'],
      Ice: ['#e8fbff', '#a8e4f4', '#70bcd8', '#183848', '#ffffff'],
      Jelly: ['#ffb0d8', '#f478b4', '#c84a8c', '#4a0c2c', '#ffe4f2'],
      Cardboard: ['#e2c08c', '#c8a066', '#a07a44', '#3a2610', '#e8e0c8'],
      Marble: ['#fbfaf6', '#e2e0da', '#bab6ae', '#2a2826', '#8a8680'],
      Gold: ['#ffe680', '#f0b830', '#b87c10', '#3a2400', '#fffbe0'],
      Moss: ['#9ad866', '#6aaa4a', '#4a8434', '#14280a', '#d4f49a'],
      Toast: ['#f6d690', '#c88a3a', '#a06a28', '#3a1e08', '#b8742c'],
      Cheese: ['#ffe27a', '#f4c444', '#d29e22', '#4a3404', '#c88c14'],
      Watermelon: ['#ff6a80', '#4ab04a', '#2e8a3a', '#14300e', '#2a1a1a'],
      Brick: ['#e07a62', '#bc5442', '#923c30', '#2a0e08', '#ead8c8'],
      Sponge: ['#fff27a', '#f0d84a', '#cab22a', '#4a3a08', '#c8a820'],
      Candy: ['#ffffff', '#ffd4e4', '#f2a6c4', '#5a1a3a', '#ff5a8a'],
      Plush: ['#dccdff', '#bba4f2', '#937cd2', '#2a1a4a', '#fff0ff'],
      Galaxy: ['#4a3aa0', '#2a1e6a', '#1a124a', '#08061a', '#ffffff'],
      Rainbow: ['#ffffff', '#ffd0d0', '#d0d0ff', '#2a2a3a', '#ffffff'],
      'Glass Bead': ['#8ad0ff', '#3a86f0', '#1e56c0', '#0a1848', '#f0faff'],
      Felt: ['#5ae8d0', '#1ec2ac', '#0e9488', '#06302c', '#f4fff8'],
      'Glass Tank': ['#5ab8e4', '#3a9ed4', '#1e72b0', '#0c3248', '#ffffff'],
      'Mimic Chest': ['#d49656', '#a8682c', '#7a4818', '#2a1406', '#4a4a56'],
      Hologram: ['#9af0ff', '#3ab0e0', '#1a70a8', '#8affff', '#ffffff'],
    }[material].map(hx);
    const INK = material === 'Galaxy' ? hx('#fff2c8') : hx('#16101c'), WHITE = hx('#ffffff'), BLUSH = hx('#ff7a8a');
    const rooms = [['#ffe9d6', '#ffd6b8'], ['#dff3e6', '#c2e6cf'], ['#e4e8ff', '#ccd2fb'], ['#fbe0f0', '#f2c4df'], ['#fff6c8', '#f4e49a'], ['#d8f0f6', '#b8e0ec'],
      ['#f1e6ff', '#ddccfa'], ['#ffe2da', '#f8c6b8'], ['#dcf7ee', '#b8eadb'], ['#232848', '#303868']][roomHue].map(hx);
    const SHADOW = hx(['#e8c4a8', '#a8ccb4', '#b0b6e4', '#dca8c6', '#dcc874', '#98c4d2', '#bfaee4', '#e6a898', '#94cdb8', '#151830'][roomHue]);
    // a rainbow cube takes its colour from the column it is in
    const hue = (k, light) => { const a = k / 14 * 6.283; return rgb(Math.min(255, Math.round(170 + 80 * Math.cos(a) + light)), Math.min(255, Math.round(170 + 80 * Math.cos(a - 2.1) + light)), Math.min(255, Math.round(170 + 80 * Math.cos(a + 2.1) + light))); };

    const buf = new Int32Array(N * N);
    const kind = new Uint8Array(N * N); // 0 room, 1 creature
    const P = (x, y, v, k) => { if (x >= 0 && y >= 0 && x < N && y < N) { buf[y * N + x] = v; if (k !== undefined) kind[y * N + x] = k; } };

    const CONF = ['#ff8aa8', '#7ac8ff', '#ffd25a', '#8ae09a'].map(hx);
    function roomAt(x, y) {
      const floorY = 30;
      if (room === 'Tiles') {
        if (y < floorY) return (y & 1) && ((x + (y >> 1)) % 8 === 0) ? rooms[1] : rooms[0];
        const a = Math.floor((x + 2 * y) / 8), b = Math.floor((x - 2 * y + 400) / 8);
        return (a + b) % 2 ? rooms[1] : rooms[0];
      }
      if (room === 'Grid') return ((x + 2 * y + 400) % 10 === 0 || (x - 2 * y + 400) % 10 === 0) ? rooms[1] : rooms[0];
      if (room === 'Dots') return ((x % 5 === 2) && (y % 5 === 2)) || ((x % 5 === 0) && (y % 5 === 0)) ? rooms[1] : rooms[0];
      if (room === 'Stripes') return Math.floor((x + y * 0.5 + 400) / 4) % 2 ? rooms[1] : rooms[0];
      if (y > floorY && room !== 'Checker') return rooms[1];
      const X = ((x % 12) + 12) % 12, Y = ((y % 12) + 12) % 12;
      if (room === 'Clouds') { const cy2 = Y - (Math.floor((x + 400) / 12) % 2) * 5; return (Math.abs(X - 5) < 4 && (cy2 === 3 || cy2 === 4) && !(cy2 === 3 && Math.abs(X - 5) > 2)) ? rooms[1] : rooms[0]; }
      if (room === 'Hearts') return ((X === 4 || X === 6) && Y === 4) || (X >= 3 && X <= 7 && Y === 5) || (X >= 4 && X <= 6 && Y === 6) || (X === 5 && Y === 7) ? rooms[1] : rooms[0];
      if (room === 'Checker') return (Math.floor((x + 400) / 5) + Math.floor((y + 400) / 5)) % 2 ? rooms[1] : rooms[0];
      if (room === 'Confetti') { const q = ((x * 73856093) ^ (y * 19349663)) >>> 0; return q % 23 === 0 ? CONF[q % 4] : rooms[0]; }
      if (room === 'Plaid') return (X === 2 || Y === 2) ? rooms[1] : (X === 8 || Y === 8) && (x + y) % 2 ? rooms[1] : rooms[0];
      return rooms[0];
    }

    // the viewer's jumps and hover
    let jumpAt = -9, shy = false, squish = 0;
    const CAUS = [hx('#8ad8f4'), hx('#4aa0cc')], GRAVEL = ['#e8c070', '#c88a50', '#8a6a4a', '#f0e0c0'].map(hx), WEED = hx('#3aa04a'), FISH = [hx('#ff7a1a'), hx('#ffd040'), hx('#ffb070')];
    const SURF = hx('#9ae0f4'), GLINT = hx('#e8fbff');
    const IRON = hx('#4a4652'), IRONL = hx('#7a7684'), BRASS = hx('#f0c24a'), BRASS2 = hx('#b8862a'), EYEC = hx('#ff9a2a'), EYEL = hx('#fff4c0');
    const SEAM = hx('#5a3410'), DARK = hx('#1a0804'), TOOTH = hx('#fff8e8'), GOLDC = hx('#ffd040');
    let lookX = 0, lookY = 0, fishU = -6, fishDir = 1, lidOpen = 2, beamOn = false, ufoX = 30, ufoFrom = 30, ufoAt = -9, buildAt = -9, glitchy = false;
    const tankBubbles = [], loot = [];
    const HEARTC = hx('#ff4a6a'), TONGUE = hx('#ff6a7a'), RIND = hx('#f0ffe4'), MSTRIPE = hx('#1e6a2a'), FRECK = hx('#8a4a2a');
    // a little painter for top things: rows of letters looked up in a colour map
    const sprite = (rows, x0, y0, map, k) => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') P(x0 + i, y0 + j, map[r[i]], k === undefined ? 1 : k); });
    function compose(t) {
      const ju = (t - jumpAt) / 0.5;
      const hop = (ju >= 0 && ju < 1 ? Math.round(Math.sin(Math.PI * ju) * 2.4) : ((t + hopAt) % hopEvery) < 0.35 ? 1 : 0) + (beamOn ? 2 : 0);
      const blink = ((t + blinkAt) % blinkEvery) < 0.15;
      const shadowHop = Math.min(1, hop);
      kind.fill(0);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = roomAt(x, y);
      // the shadow on the floor stays put while the cube hops
      if (material !== 'Hologram') for (let y = 33; y < 39; y++) for (let x = 4; x < 36; x++) {
        const k = x < 20 ? 19 - x : x - 20;
        if (y >= 33 + (shadowHop ? 1 : 0) && y < 39 - Math.floor(k / 2) && y > 31 + Math.floor((13 - k) / 2) * 0 && k < 15 && Math.abs(y - 35.5) + k / 2.4 < 4.4 - shadowHop * 0.6 - (hop > 1 ? 0.6 : 0)) P(x, y, SHADOW);
      }
      const sq = Math.round(squish), h = (tall ? 19 : slab ? 11 : 14) - sq, ty = (tall ? 3 : slab ? 10 : 7) - hop + sq;
      // a melting cube sits in its own puddle
      if (shape === 'Melting') for (let y = 33; y < 39; y++) for (let x = 4; x < 36; x++) {
        const q = ((x + 0.5 - 20) / 14.6) ** 2 + ((y + 0.5 - 35.8) / 2.5) ** 2;
        if (q <= 1) P(x, y, q < 0.35 && (x + y) % 3 === 0 ? MAT[0] : x < 20 ? MAT[1] : MAT[2], 1);
      }
      // the cube, column by column
      for (let x = 6; x < 34; x++) {
        const k = x < 20 ? 19 - x : x - 20, step = k >> 1, left = x < 20;
        // the outline's shape: cells cut off the corners, or puffed out past the edges
        for (let a = 1; a <= topAdd[k]; a++) P(x, ty + step - a, MAT[0], 1);
        for (let a = 0; a < botAdd[k]; a++) P(x, ty + 14 - step + h + a, left ? MAT[1] : MAT[2], 1);
        if (shape === 'Melting') DRIPS.forEach(([dx, len], i) => {
          if (x !== dx && x !== dx + 1) return;
          const L = len + (Math.sin(t * 0.9 + i * 1.7) > 0.5 ? 1 : 0) - (x === dx + 1 ? 1 : 0);
          for (let a = 0; a < L; a++) P(x, ty + 14 - step + h + a, left ? MAT[1] : MAT[2], 1);
        });
        for (let y = ty + step + topCut[k]; y < ty + 14 - step; y++) {
          if (inChip(x, y, ty)) continue;
          let v = MAT[0];
          if (material === 'Wood' && (x - 2 * (y - ty) + 400) % 9 === 0) v = MAT[1];
          if (material === 'Stone' && grain[(x * 7 + y * 3) % 40] > 0.84) v = MAT[4];
          if (material === 'Cardboard' && (x === 19 || x === 20)) v = MAT[4];
          if (material === 'Marble' && Math.abs((x - 12) * 0.5 - (y - ty) + grain[x] * 1.2) < 0.5) v = MAT[4];
          if (material === 'Ice' && (x - y + 60) % 9 === 0) v = MAT[4];
          if (material === 'Moss' && grain[(x * 5 + y * 11) % 40] > 0.72) v = MAT[4];
          if (material === 'Toast' && k >= 11) v = MAT[4];
          if (material === 'Cheese' && ((x - 15) ** 2 + (y - ty - 6) ** 2 * 4 < 4 || (x - 24) ** 2 + (y - ty - 8) ** 2 * 4 < 3)) v = MAT[4];
          if (material === 'Watermelon' && (x * 3 + y * 7) % 13 === 0) v = MAT[4];
          if (material === 'Sponge' && grain[(x * 3 + y * 5) % 40] > 0.8) v = MAT[4];
          if (material === 'Candy' && (x - 2 * (y - ty) + 400) % 6 < 2) v = MAT[4];
          if (material === 'Plush' && (x === 19 || x === 20) && y % 2) v = MAT[2];
          if (material === 'Galaxy') v = grain[(x * 7 + y * 13) % 40] > 0.9 ? WHITE : MAT[0];
          if (material === 'Rainbow') v = hue(k + (left ? 0 : 7), 55);
          // the water's surface: soft ripple lines drifting across it
          if (material === 'Glass Bead' && (x - 15) ** 2 + (y - ty - 5) ** 2 * 4 < 5) v = MAT[4];
          if (material === 'Felt' && grain[(x * 5 + y * 3) % 40] > 0.86) v = hx('#8af4e0');
          // looking down into the open tank: water two cells down, ripples drifting across it
          if (material === 'Glass Tank') { const r = (y - ty + Math.floor(t * 1.5)) % 4, q = (x + 2 * (y - ty) + 400) % 9; v = r === 0 && q < 4 ? SURF : r === 2 && q > 5 ? hx('#8ad8f4') : MAT[0]; }
          // the chest's lid: planks, and two iron bands running over it front to back
          if (material === 'Mimic Chest') { const b = x + 2 * (y - ty); v = Math.abs(b - 24.5) < 1.3 || Math.abs(b - 36.5) < 1.3 ? (Math.abs(b - 24.5) < 0.5 || Math.abs(b - 36.5) < 0.5 ? IRONL : IRON) : (x - 2 * (y - ty) + 400) % 6 === 0 ? MAT[1] : MAT[0]; }
          P(x, y, v, 1);
        }
        for (let v = 0; v < h - botCut[k]; v++) {
          const y = ty + 14 - step + v;
          if (inChip(x, y, ty)) continue;
          let col = left ? MAT[1] : MAT[2];
          if (material === 'Wood' && v % 5 === 4) col = left ? MAT[2] : MAT[4];
          if (material === 'Stone' && !(k < 10 && v > 1 && v < 12) && ((v % 5 === 0 && (k + (v / 5 | 0) * 3) % 7 !== 0) || (k + (v / 5 | 0) * 4) % 8 === 0) && v > 0) col = left ? MAT[2] : MAT[3];
          if (material === 'Cardboard' && (x === 19 || x === 20) && v < 4) col = MAT[4];
          if (material === 'Marble' && Math.abs(k * 0.6 - v + grain[(x + 9) % 40] * 3 - 2) < 0.5) col = MAT[4];
          if (material === 'Jelly' && v > 2 && v < 6 && k > 8 && k < 11 && left) col = MAT[4];
          if (material === 'Gold' && left && (k - v + 40) % 11 === 0) col = MAT[4];
          if (material === 'Ice' && left && (k + v) % 7 === 0) col = MAT[4];
          if (material === 'Moss' && v < 2 + (grain[x % 40] > 0.5 ? 1 : 0)) col = left ? MAT[0] : MAT[1];
          if (material === 'Cheese' && ((k - 4) ** 2 + (v - 6) ** 2 < 3 || (k - 10) ** 2 + (v - 3) ** 2 < 2 || (k - 8) ** 2 + (v - 11) ** 2 < 2.5)) col = MAT[4];
          if (material === 'Watermelon') col = v === 0 ? RIND : k % 4 < 2 ? (left ? MAT[2] : MSTRIPE) : col;
          if (material === 'Brick' && (v % 4 === 3 || (k + (v >> 2) * 3) % 6 === 0)) col = MAT[4];
          if (material === 'Sponge' && grain[(k * 3 + v * 7) % 40] > 0.82) col = MAT[4];
          if (material === 'Candy' && (k + v) % 6 < 2) col = MAT[4];
          if (material === 'Plush' && (x === 19 || x === 20) && v % 2) col = MAT[4];
          if (material === 'Galaxy' && grain[(k * 11 + v * 3) % 40] > 0.92) col = WHITE;
          if (material === 'Rainbow') col = hue(k + (left ? 0 : 7), left ? 0 : -45);
          if (material === 'Glass Bead' && left && k >= 9 && k <= 10 && v > 1 && v < h - 3) col = hx('#8ac4ff');
          if (material === 'Glass Bead' && !left && k === 3 && v > 2 && v < h - 5) col = hx('#5a8ae0');
          if (material === 'Felt' && ((k === 12 && v % 2 === 1 && v < h - 1) || (v === h - 2 && k % 2 === 0 && k < 12))) col = MAT[4];
          if (material === 'Glass Tank') {
            // water behind glass: empty glass above the waterline, light caustics drifting below it, gravel along the bottom
            if (v < 2) col = left ? hx('#d8f4fc') : hx('#a8daf0');
            else if (v === 2) col = (k + Math.floor(t * 3)) % 5 === 0 ? WHITE : left ? hx('#9ae0f4') : hx('#6ec4e8');
            else if ((k + v * 2 + Math.floor(t * 2)) % 9 === 0) col = left ? CAUS[0] : CAUS[1];
            if (v >= h - 2) col = GRAVEL[(k * 7 + v * 3 + (left ? 0 : 2)) % 4];
          }
          if (material === 'Mimic Chest') {
            // planks, the lid's iron rim, iron bands down the front, and brass plates on the corners
            const gvB = 5 + (tall ? 2 : 0);
            if (v > gvB && (v - gvB) % 4 === 0) col = left ? MAT[2] : SEAM;
            if (v < gvB - 1 && v % 3 === 2) col = left ? MAT[2] : SEAM;
            if (v === gvB - 1 || v === h - 1) col = IRON;
            if (left && (k === 4 || k === 5 || k === 10 || k === 11)) col = k % 2 ? IRON : IRONL;
            if (k >= 12 && (v < 2 || v > h - 3)) col = k === 12 && v !== 0 && v !== h - 1 ? BRASS2 : BRASS;
            if (k <= 1 && v > h - 3) col = left ? BRASS : BRASS2;
          }
          P(x, y, col, 1);
        }
      }
      // light front edges along the top, and the corner
      const EDGE = material === 'Marble' ? MAT[1] : material === 'Glass Tank' ? GLINT : MAT[0];
      for (let k = 0; k < 14; k++) { const y = ty + 13 - (k >> 1), on = x => y >= 0 && y < N && kind[y * N + x]; if (material === 'Mimic Chest' && (k === 4 || k === 5 || k === 10 || k === 11)) continue; if (on(19 - k)) P(19 - k, y, EDGE, 1); if (on(20 + k)) P(20 + k, y, EDGE, 1); }
      if (shape === 'Pillow') for (const x of [5, 34]) for (let y = ty + 9; y < ty + 5 + h; y++) P(x, y, x < 20 ? MAT[1] : MAT[2], 1);
      if (shape === 'Chipped') {
        // the bite's broken faces in shadow, and the missing crumb on the floor below it
        for (let y = ty + 3; y < ty + 13; y++) for (let x = chipX - 7; x <= chipX + 7; x++) {
          if (x < 0 || x >= N || y < 0 || y >= N || !kind[y * N + x]) continue;
          const q = ((x + 0.5 - chipX) / 4.4) ** 2 + ((y + 0.5 - ty - 7.5) / 2.6) ** 2;
          if (q < 1.45) P(x, y, y + 0.5 > ty + 7.5 ? MAT[2] : MAT[1], 1);
        }
        const cr = chipLeft ? 3 : 35;
        P(cr, 34, MAT[0], 1); P(cr + 1, 34, MAT[0], 1); P(cr, 35, MAT[1], 1); P(cr + 1, 35, MAT[2], 1);
      }
      if (material === 'Jelly') { P(14, ty + 6, MAT[4], 1); P(15, ty + 6, MAT[4], 1); P(16, ty + 5, MAT[4], 1); }
      if (material === 'Stone') for (const [gx, gy] of [[18, ty + 2], [19, ty + 2], [20, ty + 3], [23, ty + 4], [24, ty + 4], [14, ty + 6]]) P(gx, gy, MAT[4], 1);

      // face features, in face space: s from the corner outwards, v down the face
      const at = (s, v) => ty + 14 - (s >> 1) + v + (tall ? 2 : 0) - (slab ? 1 : 0) - sq;
      let fk = 1;
      const L = (s, v, col) => P(19 - s, at(s, v), col, fk);
      const R = (s, v, col) => P(20 + s, at(s, v), col, fk);
      const both = (s, v, col) => { L(s, v, col); R(s, v, col); };
      if (material === 'Glass Tank') {
        // inside the tank, in the tank's own cells (u across both faces, x = 20 + u; bv down from the top edge)
        const T = (u, bv, col) => { const k = u < 0 ? -u - 1 : u; if (k < 14 && bv >= 0 && bv < h) P(20 + u, ty + 14 - (k >> 1) + bv, col, 1); };
        const sw = Math.round(Math.sin(t * 1.6));
        for (let bv = h - 7; bv < h - 2; bv++) T(-11 - (bv < h - 4 ? sw : 0), bv, WEED);
        for (let bv = h - 5; bv < h - 2; bv++) T(11 - (bv < h - 3 ? sw : 0), bv, WEED);
        // a big goldfish swimming across the glass: fanned tail flicking, fins, a bright eye
        const fl = Math.floor(t * 5) % 2, fu = Math.round(fishU), fb = h - 8 + (Math.sin(t * 1.3) > 0.6 ? -1 : 0);
        const FROWS = ['....dd......', fl ? 't..oooooo...' : '...oooooo...', 'ttoohoooooo.', '.tooooooowk.', 'ttoooooooo..', fl ? '...bbbbbb...' : 't..bbbbbb...', '.....f......'];
        const FMAP = { o: FISH[0], h: FISH[2], d: FISH[1], t: FISH[1], b: FISH[2], f: FISH[1], w: WHITE, k: INK };
        FROWS.forEach((r, j) => { for (let i = 0; i < 12; i++) if (r[i] !== '.') T(fu + (fishDir > 0 ? i - 6 : 5 - i), fb + j, FMAP[r[i]]); });
        // the glass: a bright edge down the front corner
        for (let bv = 3; bv < h - 2; bv++) if (bv % 5 !== 4) T(-1, bv, GLINT);
        for (let i = tankBubbles.length - 1; i >= 0; i--) {
          const b = tankBubbles[i], v = Math.round(b.v - (t - b.t0) * 6);
          if (v < 3) { tankBubbles.splice(i, 1); continue; }
          T(b.u + (v % 3 === 0 ? 1 : 0), v, WHITE);
        }
        // its eyes: two bubbles stuck on the glass, looking wherever the pointer is
        const lx = lookX > 0.3 ? 1 : lookX < -0.3 ? -1 : 0, ly = lookY > 0.3 ? 1 : 0;
        for (const sg of [-1, 1]) {
          const c0 = sg < 0 ? -7 : 6;
          for (let i = -2; i <= 2; i++) for (let j = 0; j < 5; j++) {
            if (Math.abs(i) === 2 && (j === 0 || j === 4)) continue;
            const ring = Math.abs(i) === 2 || j === 0 || j === 4;
            if (ring) T(c0 + i, 3 + j, GLINT); else if (blink && j === 2) T(c0 + i, 3 + j, INK); else { const kk = c0 + i < 0 ? -c0 - i - 1 : c0 + i, yy = ty + 14 - (kk >> 1) + 3 + j; if (yy >= 0 && yy < N) T(c0 + i, 3 + j, blendI(buf[yy * N + 20 + c0 + i], WHITE, 0.45)); }
          }
          if (blink) continue;
          const p0 = c0 + (lx < 0 ? -1 : lx > 0 ? 0 : sg < 0 ? 0 : -1), q0 = 4 + ly;
          T(p0, q0, WHITE); T(p0 + 1, q0, INK); T(p0, q0 + 1, INK); T(p0 + 1, q0 + 1, INK);
        }
      }
      if (material === 'Mimic Chest') {
        // the chest's mouth: a dark gap under the lid with fangs, two eyes glowing in it, gold glinting
        // behind them when it gapes; a brass hasp hangs over the gap at the front corner
        const g = Math.round(lidOpen), gv = 5;
        if (g === 0) for (let s = 0; s < 14; s++) both(s, gv, INK);
        for (let s = 2; s < 14; s++) for (let v = gv; v < gv + g; v++) {
          let cc = DARK;
          if (s >= 3 && s <= 8) cc = DARK;
          else if (v === gv && (s === 2 || s === 9 || s === 11)) cc = TOOTH;
          else if (v === gv + g - 1 && g > 2 && (s === 10 || s === 12)) cc = TOOTH;
          else if (g > 2 && (s * 3 + v + Math.floor(t * 6)) % 7 === 0) cc = GOLDC;
          both(s, v, cc);
        }
        if (g >= 2) for (const side of [L, R]) {
          const e0 = gv + (g >= 4 ? 1 : 0), dart = Math.sin(t * 0.8) > 0.7 ? 1 : 0;
          if (blink) { side(5 + dart, e0 + 1 - (g < 3 ? 1 : 0), EYEC); side(6 + dart, e0 + 1 - (g < 3 ? 1 : 0), EYEC); continue; }
          side(4 + dart, e0, EYEL); side(5 + dart, e0, EYEL); side(6 + dart, e0, EYEC);
          side(4 + dart, e0 + 1, EYEC); side(5 + dart, e0 + 1, DARK); side(6 + dart, e0 + 1, EYEC);
        }
        if (g > 2) { L(9, gv + g, TONGUE); L(10, gv + g, TONGUE); L(9, gv + g + 1, TONGUE); }
        // the hasp: a brass plate on the lid's corner, its loop over the gap, a keyhole
        for (let v = gv - 3; v < gv + 2; v++) { both(0, v, v === gv - 1 ? DARK : BRASS); both(1, v, v < gv ? BRASS : BRASS2); }
        L(0, gv - 3, GOLDC); R(1, gv + 1, BRASS2); L(1, gv + 1, BRASS2);
      }
      fk = material === 'Hologram' ? 2 : 1;
      if (eyes === 'Bubbles' || eyes === 'Peeping') {
        // the aquarium's and the mimic's eyes are drawn with them
      } else if (eyes === 'Big Single') {
        for (let s = 0; s < 4; s++) for (let v = 2; v < 8; v++) { const edge = s === 3 || v === 2 || v === 7; both(s, v, blink ? (v === 5 ? INK : (s === 3 ? MAT[1] : MAT[1])) : edge ? INK : WHITE); }
        if (blink) { for (let s = 0; s < 4; s++) for (let v = 2; v < 8; v++) { L(s, v, v === 5 ? INK : MAT[1]); R(s, v, v === 5 ? INK : MAT[2]); } }
        else { both(0, 4, INK); both(1, 4, INK); both(0, 5, INK); both(1, 5, INK); L(1, 4, WHITE); }
      } else if (eyes === 'Visor') {
        for (let s = 0; s < 12; s++) for (let v = 3; v < 5; v++) both(s, v, v === 3 ? hx('#4a78b8') : hx('#1e2e50'));
        for (let s = 0; s < 12; s++) { L(s, 2, INK); R(s, 2, INK); L(s, 5, INK); R(s, 5, INK); }
        L(12, 3, INK); L(12, 4, INK); R(12, 3, INK); R(12, 4, INK);
        const sweep = Math.floor(t * 4) % 30 - 6;
        for (let s = 0; s < 12; s++) if (s === sweep || s === sweep + 1) { L(s, 3, hx('#e8f8ff')); R(11 - s, 3, hx('#e8f8ff')); if (s === sweep) { L(s, 4, hx('#8ab8f0')); R(11 - s, 4, hx('#8ab8f0')); } }
      } else {
        for (const side of [L, R]) {
          const sh = side === L ? MAT[1] : MAT[2];
          if (blink && eyes !== 'Cross') { side(5, 5, INK); side(6, 5, INK); side(7, 5, INK); continue; }
          if (shy) { side(4, 5, INK); side(5, 4, INK); side(6, 4, INK); side(7, 5, INK); continue; }
          if (eyes === 'Dots') { side(5, 3, INK); side(5, 4, INK); side(6, 3, INK); side(6, 4, INK); side(5, 5, INK); side(6, 5, INK); }
          else if (eyes === 'Wide') {
            for (let s = 4; s < 8; s++) for (let v = 2; v < 7; v++) side(s, v, (s === 4 || s === 7) && (v === 2 || v === 6) ? sh : WHITE);
            side(5, 4, INK); side(6, 4, INK); side(5, 5, INK); side(6, 5, INK);
          } else if (eyes === 'Sleepy') { side(4, 4, INK); side(5, 5, INK); side(6, 5, INK); side(7, 4, INK); }
          else if (eyes === 'Cross') { side(4, 3, INK); side(7, 3, INK); side(5, 4, INK); side(6, 4, INK); side(4, 5, INK); side(7, 5, INK); side(5, 4, INK); }
          else if (eyes === 'Sparkle') {
            side(5, 2, INK); side(6, 2, INK); for (let v = 3; v < 6; v++) for (let s = 4; s < 8; s++) side(s, v, INK); side(5, 6, INK); side(6, 6, INK);
            side(5, 3, WHITE); side(6, 5, WHITE);
          } else if (eyes === 'Heart') { side(3, 3, HEARTC); side(4, 3, HEARTC); side(6, 3, HEARTC); side(7, 3, HEARTC); for (let s = 3; s < 8; s++) side(s, 4, HEARTC); side(4, 5, HEARTC); side(5, 5, HEARTC); side(6, 5, HEARTC); side(5, 6, HEARTC); }
          else if (eyes === 'Star') { side(5, 2, INK); side(6, 2, INK); for (let s = 4; s < 8; s++) side(s, 3, INK); side(5, 4, INK); side(6, 4, INK); side(4, 5, INK); side(7, 5, INK); }
          else if (eyes === 'Happy' || (eyes === 'Wink' && side === R)) { side(4, 5, INK); side(5, 4, INK); side(6, 4, INK); side(7, 5, INK); }
          else if (eyes === 'Wink') { side(5, 3, INK); side(5, 4, INK); side(6, 3, INK); side(6, 4, INK); side(5, 5, INK); side(6, 5, INK); }
          else if (eyes === 'Anime Shine') {
            for (let s = 4; s < 8; s++) for (let v = 2; v < 7; v++) side(s, v, v === 6 ? hx('#4a6ad8') : INK);
            side(4, 2, sh); side(7, 2, sh); side(5, 3, WHITE); side(4, 3, WHITE); side(6, 5, WHITE);
          } else if (eyes === 'Glasses') {
            for (let s = 3; s < 9; s++) for (let v = 1; v < 7; v++) if (s === 3 || s === 8 || v === 1 || v === 6) side(s, v, hx('#3a3040'));
            side(5, 3, INK); side(6, 3, INK); side(5, 4, INK); side(6, 4, INK);
          } else if (eyes === 'Swirl') { for (let s = 4; s < 8; s++) side(s, 2, INK); side(7, 3, INK); side(5, 4, INK); side(7, 4, INK); side(5, 5, INK); side(6, 5, INK); side(7, 5, INK); }
          else if (eyes === 'Content') { side(4, 4, INK); side(7, 4, INK); side(5, 5, INK); side(6, 5, INK); }
          else if (eyes === 'Looking Up') {
            for (let s = 4; s < 8; s++) for (let v = 2; v < 7; v++) side(s, v, (s === 4 || s === 7) && (v === 2 || v === 6) ? sh : WHITE);
            side(5, 2, INK); side(6, 2, INK); side(5, 3, INK); side(6, 3, INK);
          }
        }
      }
      fk = 1;
      if (shy && material !== 'Hologram') { L(7, 7, BLUSH); R(7, 7, BLUSH); L(8, 8, BLUSH); R(8, 8, BLUSH); L(10, 7, BLUSH); R(10, 7, BLUSH); }
      if (cheekStyle === 'Rosy' || (shy && legend !== 'Aquarium' && legend !== 'Mimic')) { L(8, 7, BLUSH); L(9, 7, BLUSH); R(8, 7, BLUSH); R(9, 7, BLUSH); }
      fk = material === 'Hologram' ? 2 : 1;
      if (mouth === 'Smile') { both(0, 9, INK); both(1, 9, INK); both(2, 8, INK); }
      else if (mouth === 'Open') { both(0, 8, INK); both(1, 8, INK); both(2, 8, INK); both(0, 9, INK); both(1, 9, hx('#ff6a7a')); both(2, 9, INK); both(0, 10, hx('#ff6a7a')); both(1, 10, INK); }
      else if (mouth === 'Teeth') { for (let s = 0; s < 4; s++) { both(s, 8, INK); both(s, 9, s % 2 ? INK : WHITE); both(s, 10, INK); } }
      else if (mouth === 'Wavy') { for (let s = 0; s < 5; s++) both(s, 9 + (s % 2), INK); }
      else if (mouth === 'Cat') { both(0, 8, INK); both(1, 9, INK); both(2, 9, INK); both(3, 8, INK); }
      else if (mouth === 'Blep' || mouth === 'Fang' || mouth === 'Drool') {
        both(0, 9, INK); both(1, 9, INK); both(2, 8, INK);
        if (mouth === 'Blep') { L(0, 10, TONGUE); L(1, 10, TONGUE); L(0, 11, TONGUE); }
        if (mouth === 'Fang') L(1, 10, WHITE);
        if (mouth === 'Drool') R(2, 9 + Math.floor(t * 1.2) % 3, hx('#8ad8ff'));
      } else if (mouth === 'Oh') { both(0, 8, INK); both(1, 9, INK); both(0, 10, INK); both(0, 9, hx('#6a1a2a')); }
      else if (mouth === 'Smirk') { L(0, 9, INK); L(1, 9, INK); L(2, 9, INK); R(0, 9, INK); R(1, 8, INK); R(2, 7, INK); }
      fk = 1;
      // cheeks and things stuck on the faces
      if (cheekStyle === 'Freckles') for (const side of [L, R]) { side(8, 7, FRECK); side(10, 7, FRECK); side(9, 8, FRECK); }
      else if (cheekStyle === 'Hearts') for (const side of [L, R]) { side(8, 7, HEARTC); side(10, 7, HEARTC); side(9, 8, HEARTC); }
      else if (cheekStyle === 'Bandage') { for (let s = 8; s < 11; s++) { R(s, 6, hx('#f4dcb8')); R(s, 7, hx('#f4dcb8')); } R(9, 6, hx('#d8b088')); }
      else if (cheekStyle === 'Sticker') { L(9, 6, hx('#ffd84a')); L(10, 6, hx('#ffd84a')); L(9, 7, hx('#ffd84a')); L(10, 7, hx('#ffd84a')); }
      if (extra === 'Scarf') {
        for (let s = 0; s < 14; s++) { const sc = (s % 3 === 2) ? hx('#ffe0d0') : hx('#e8484a'); L(s, 11, sc); R(s, 11, sc); L(s, 12, hx('#c03038')); R(s, 12, hx('#c03038')); }
        for (let v = 13; v < 17; v++) { L(9, v, hx('#e8484a')); L(10, v, v % 2 ? hx('#ffe0d0') : hx('#c03038')); }
      } else if (extra === 'Bowtie') { const B1 = hx('#4a8ae8'), B2 = hx('#2a5ab0'); both(0, 12, B2); for (const sd of [L, R]) { sd(1, 11, B1); sd(1, 12, B1); sd(1, 13, B1); sd(2, 11, B1); sd(2, 13, B1); } }
      else if (extra === 'Necklace') { for (let s = 1; s < 12; s += 2) { L(s, 11, hx('#ffd84a')); R(s, 11, hx('#ffd84a')); } both(0, 12, hx('#4ad8c8')); }
      else if (extra === 'Star Sticker') { const ST = hx('#ffd84a'); R(9, 8, ST); R(8, 9, ST); R(9, 9, ST); R(10, 9, ST); R(9, 10, ST); }
      else if (extra === 'Monocle' && eyes !== 'Big Single' && eyes !== 'Visor') { for (let s = 3; s < 9; s++) for (let v = 1; v < 7; v++) if (s === 3 || s === 8 || v === 1 || v === 6) R(s, v, hx('#e8b830')); for (let v = 7; v < 12; v++) R(8 + (v & 1), v, hx('#e8b830')); }
      else if (extra === 'Headphones') {
        for (let x = 5; x < 35; x++) { const u = (x + 0.5 - 20) / 15; if (Math.abs(u) <= 1) P(x, Math.round(ty + 6 - Math.sqrt(1 - u * u) * 9), hx('#3a3a4a'), 1); }
        for (const hx0 of [4, 33]) for (let y = ty + 5; y < ty + 10; y++) { P(hx0, y, hx('#3a3a4a'), 1); P(hx0 + 1, y, hx('#ff6a8a'), 1); P(hx0 + 2, y, hx('#3a3a4a'), 1); }
      }

      // what grows on top, standing at the middle of the top face
      const cx = 20, cy = ty + 7;
      const D = (x, y, col) => P(x, y, col, 1);
      if (top === 'Sprout') {
        const sway = Math.sin(t * 1.4) > 0.5 ? 1 : 0;
        for (let y = cy - 4; y < cy; y++) D(cx, y, hx('#3a8a3a'));
        D(cx - 1 + sway, cy - 5, hx('#5ac85a')); D(cx - 2 + sway, cy - 5, hx('#5ac85a')); D(cx - 2 + sway, cy - 6, hx('#8ae87a')); D(cx - 3 + sway, cy - 6, hx('#5ac85a'));
        D(cx + 1 + sway, cy - 5, hx('#5ac85a')); D(cx + 2 + sway, cy - 5, hx('#5ac85a')); D(cx + 2 + sway, cy - 6, hx('#8ae87a')); D(cx + 3 + sway, cy - 6, hx('#5ac85a'));
        D(cx + sway, cy - 5, hx('#3a8a3a'));
      } else if (top === 'Candle') {
        for (let y = cy - 6; y < cy; y++) { D(cx - 1, y, hx('#fff4e0')); D(cx, y, hx('#e8d8c0')); }
        D(cx, cy - 7, INK);
        const f = Math.floor(t * 7) % 3;
        D(cx - (f === 1 ? 1 : 0), cy - 8, hx('#ffb030')); D(cx, cy - 8, hx('#ffe070')); D(cx - (f === 2 ? 1 : 0), cy - 9, hx('#ffe070')); D(cx - 1, cy - 10 + (f === 0 ? 1 : 0), hx('#ff8a20'));
      } else if (top === 'Mushroom') {
        for (let y = cy - 3; y < cy; y++) { D(cx - 1, y, hx('#f4ecd8')); D(cx, y, hx('#d8ccb0')); }
        for (let y = cy - 7; y < cy - 3; y++) for (let x = cx - 5; x < cx + 5; x++) {
          const w = [2, 4, 5, 5][y - (cy - 7)];
          if (x >= cx - w && x < cx + w) D(x, y, ((x === cx - 3 && y === cy - 5) || (x === cx + 2 && y === cy - 6) || (x === cx && y === cy - 4)) ? WHITE : hx('#e83a3a'));
        }
      } else if (top === 'Snow') {
        for (let x = 6; x < 34; x++) {
          const k = x < 20 ? 19 - x : x - 20, step = k >> 1;
          // snow lies only where the cube is (not in a bite or a cut corner)
          if (shape !== 'Cube' && !(ty + 13 - step >= 0 && kind[(ty + 13 - step) * N + x])) continue;
          for (let y = ty + step; y < ty + 14 - step; y++) if (shape === 'Cube' || (y >= 0 && kind[y * N + x])) D(x, y, (x + 2 * y) % 11 === 0 ? hx('#dceefa') : WHITE);
          D(x, ty + step - 1 - topAdd[k] - (topCut[k] ? -topCut[k] : 0), WHITE);
          D(x, ty + 14 - step, x < 20 ? hx('#eef6fc') : hx('#dceefa'));
          if (k % 5 === 2 || k % 7 === 5) { D(x, ty + 15 - step, x < 20 ? hx('#eef6fc') : hx('#dceefa')); if (k % 5 === 2) D(x, ty + 16 - step, hx('#dceefa')); }
        }
      } else if (top === 'Little Tree') {
        for (let y = cy - 3; y < cy; y++) { D(cx - 1, y, hx('#6a4020')); D(cx, y, hx('#4a2a10')); }
        for (let r = 0; r < 4; r++) for (let x = cx - 1 - (r + 1); x <= cx + r; x++) D(x, cy - 4 - (3 - r) * 2, (x < cx ? hx('#4ab05a') : hx('#2e8040'))), D(x, cy - 3 - (3 - r) * 2, (x < cx ? hx('#3a9a4a') : hx('#226a34')));
        D(cx - 1, cy - 12, hx('#ffe070'));
      } else if (top === 'Birdie') {
        const peck = Math.sin(t * 2.2) > 0.6 ? 1 : 0;
        for (let x = cx - 2; x < cx + 2; x++) for (let y = cy - 4; y < cy - 1; y++) D(x, y, hx('#4a8ae8'));
        D(cx - 2, cy - 1, hx('#e8a020')); D(cx + 1, cy - 1, hx('#e8a020'));
        D(cx + 2, cy - 5 + peck, hx('#4a8ae8')); D(cx + 1, cy - 5 + peck, hx('#4a8ae8')); D(cx + 2, cy - 6 + peck, hx('#4a8ae8')); D(cx + 1, cy - 6 + peck, INK);
        D(cx + 3, cy - 5 + peck, hx('#ffb020'));
        D(cx - 3, cy - 4, hx('#2a5ab0')); D(cx - 1, cy - 3, hx('#8ab8ff'));
      } else if (top === 'Party Hat') {
        for (let y = cy - 8; y < cy; y++) { const w = ((y - (cy - 8)) >> 1) + 1; for (let x = cx - w; x < cx + w; x++) D(x, y, (y + (x > cx ? 1 : 0)) % 3 === 0 ? hx('#ffd84a') : hx('#ff7aa8')); }
        D(cx - 1, cy - 9, WHITE); D(cx, cy - 9, WHITE); D(cx, cy - 10, WHITE);
      } else if (top === 'Bow') {
        sprite(['rr....rr', 'rRr..rRr', 'rRRkkRRr', 'rRr..rRr', 'rr....rr'], cx - 4, cy - 5, { r: hx('#ff4a6a'), R: hx('#ff8aa0'), k: hx('#c82a48') });
      } else if (top === 'Cherries') {
        const sw = Math.sin(t * 1.5) > 0.5 ? 1 : 0;
        for (let k = 0; k < 4; k++) { D(cx - 2 + (k >> 1), cy - 4 - k, hx('#3a8a3a')); D(cx + 1 - (k >> 2), cy - 3 - k, hx('#3a8a3a')); }
        D(cx, cy - 8, hx('#5ac85a')); D(cx + 1, cy - 8, hx('#5ac85a')); D(cx + 1, cy - 9, hx('#8ae87a'));
        sprite(['.rr.', 'rRrr', 'rrrr', '.rr.'], cx - 5 + sw, cy - 4, { r: hx('#e8243a'), R: hx('#ff9aa8') });
        sprite(['.rr.', 'rRrr', 'rrrr', '.rr.'], cx, cy - 3, { r: hx('#d01e34'), R: hx('#ff9aa8') });
      } else if (top === 'Daisy') {
        const sway = Math.sin(t * 1.2) > 0.4 ? 1 : 0;
        for (let y = cy - 5; y < cy; y++) D(cx, y, hx('#3a8a3a'));
        D(cx + 1, cy - 3, hx('#5ac85a'));
        sprite(['.w.', 'wyw', '.w.'], cx - 1 + sway, cy - 8, { w: WHITE, y: hx('#ffc830') });
        D(cx - 2 + sway, cy - 7, WHITE); D(cx + 2 + sway, cy - 7, WHITE);
      } else if (top === 'Halo') {
        const hb = Math.sin(t * 1.6) > 0 ? 1 : 0;
        for (let y = cy - 9; y < cy - 4; y++) for (let x = cx - 6; x < cx + 6; x++) { const d = ((x + 0.5 - cx) / 4.6) ** 2 + ((y + 0.5 - (cy - 7)) / 1.5) ** 2; if (d > 0.5 && d < 1.15) P(x, y - hb, hx('#ffe060'), 0); }
      } else if (top === 'Antenna') {
        for (let y = cy - 6; y < cy; y++) D(cx, y, INK);
        const on = Math.sin(t * 2.2) > 0;
        sprite(['bb', 'bb'], cx - 1 + 1, cy - 8, { b: on ? hx('#ff4a6a') : hx('#ffc0cc') });
      } else if (top === 'Propeller') {
        for (let x = cx - 3; x < cx + 3; x++) { D(x, cy - 1, hx('#4a8ae8')); if (Math.abs(x + 0.5 - cx) < 2) D(x, cy - 2, x % 2 ? hx('#ffd84a') : hx('#e84a4a')); }
        D(cx, cy - 3, INK);
        const f = Math.floor(t * 8) % 2;
        for (let x = cx - (f ? 4 : 1); x < cx + (f ? 5 : 2); x++) D(x, cy - 4, hx('#e84a4a'));
      } else if (top === 'Baby Cube') {
        const py0 = cy - 9 - (Math.sin(t * 2 + 2) > 0.85 ? 1 : 0);
        for (let x = cx - 4; x < cx + 4; x++) {
          const k = x < cx ? cx - 1 - x : x - cx, st = k >> 1;
          for (let y = py0 + st; y < py0 + 4 - st; y++) D(x, y, MAT[0]);
          for (let v = 0; v < 4; v++) D(x, py0 + 4 - st + v, x < cx ? MAT[1] : MAT[2]);
        }
        D(cx - 2, py0 + 5, INK); D(cx + 1, py0 + 5, INK);
      } else if (top === 'Egg Nest') {
        const wob = Math.sin(t * 3) > 0.7 ? 1 : 0;
        for (let x = cx - 4; x < cx + 4; x++) { D(x, cy - 1, hx('#8a5a2a')); D(x, cy - 2, (x % 2) ? hx('#b07a3a') : hx('#6a4018')); }
        sprite(['.ee.', 'eEee', 'eeee', '.ee.'], cx - 2 + wob, cy - 6, { e: hx('#f8f0dc'), E: WHITE });
      } else if (top === 'Rain Cloud') {
        sprite(['..cc....', '.cCCc.c.', 'cCCCCCCc', '.cccccc.'], cx - 4, cy - 13, { c: hx('#c8d0e0'), C: hx('#eef2fa') });
        for (let k = 0; k < 3; k++) { const ry = cy - 9 + ((Math.floor(t * 5) + k * 2) % 6); P(cx - 3 + k * 3, ry, hx('#6aa8f0'), 0); }
      } else if (top === 'Cactus') {
        sprite(['..g..', '..gG.', 'g.gG.', 'g.gGG', 'ggGG.', '..gG.', '.ttt.', '.tTt.'], cx - 3, cy - 8, { g: hx('#4ab05a'), G: hx('#2e8040'), t: hx('#d8703a'), T: hx('#b0502a') });
        D(cx - 1, cy - 9, hx('#ff7ab0'));
      } else if (top === 'Snail') {
        const sx = cx - 3 + Math.round(Math.sin(t * 0.3) * 2);
        sprite(['..ss..', '.sSss.', 'ssSsSs', 'sSSss.', 'bbbbbbb'], sx, cy - 6, { s: hx('#c87a3a'), S: hx('#8a4a1a'), b: hx('#f0dcb0') });
        D(sx + 7, cy - 3, hx('#f0dcb0')); D(sx + 7, cy - 4, INK);
      } else if (top === 'Beret') {
        sprite(['.....k....', '..rrrrrr..', '.rrRRrrrr.', 'rrrrrrrrrr'], cx - 4, cy - 4, { r: hx('#c83a4a'), R: hx('#e86a78'), k: hx('#8a1a2a') });
      } else if (top === 'Crown') {
        for (let x = cx - 4; x < cx + 4; x++) { D(x, cy - 1, hx('#d89a10')); D(x, cy - 2, hx('#ffd040')); if ((x - cx + 4) % 3 === 0) { D(x, cy - 3, hx('#ffd040')); D(x, cy - 4, hx('#fff0a0')); } }
        D(cx - 1, cy - 2, hx('#e8304a'));
        D(cx, cy - 2, hx('#4ac0ff'));
      }
      // stubby limbs, and whatever the little hand is holding
      if (limbs.endsWith('Feet')) for (const fx of [14, 23]) {
        const k = fx < 20 ? 19 - fx : fx - 20, fy = ty + 14 - (k >> 1) + h;
        for (let x = fx; x < fx + 3; x++) { P(x, fy, MAT[2], 1); if (x !== fx + 1 || hop === 0) P(x, fy + 1, MAT[2], 1); }
      }
      if (limbs.startsWith('Arms')) {
        const wave = Math.sin(t * 5) > 0 && ((t + hopAt) % 5) < 1.4, r = ty + 8 + Math.round(h * 0.55), ox = shape === 'Pillow' ? 1 : 0;
        const held = holding !== 'Nothing', upL = held && wave, upR = !held && wave;
        // the left arm hangs (or waves when the right hand is busy)
        if (upL) { P(5 - ox, r, MAT[1], 1); P(4 - ox, r - 1, MAT[1], 1); P(3 - ox, r - 2, MAT[1], 1); for (const [a, b] of [[1, -4], [2, -4], [1, -3], [2, -3]]) P(a - ox, r + b, MAT[1], 1); P(1 - ox, r - 4, MAT[0], 1); }
        else { P(5 - ox, r, MAT[1], 1); P(4 - ox, r, MAT[1], 1); P(3 - ox, r + 1, MAT[1], 1); for (const [a, b] of [[2, 2], [3, 2], [2, 3], [3, 3]]) P(a - ox, r + b, MAT[1], 1); P(2 - ox, r + 2, MAT[0], 1); }
        // the right arm: up in front holding its thing, hanging when empty, waving now and then
        const hx0 = 36 + ox, hy0 = r - 3;
        if (held) { P(34 + ox, r, MAT[2], 1); P(35 + ox, r, MAT[2], 1); P(35 + ox, r - 1, MAT[2], 1); }
        else if (upR) { P(34 + ox, r, MAT[2], 1); P(35 + ox, r - 1, MAT[2], 1); P(36 + ox, r - 2, MAT[2], 1); for (const [a, b] of [[37, -4], [38, -4], [37, -3], [38, -3]]) P(a + ox, r + b, MAT[2], 1); }
        else { P(34 + ox, r, MAT[2], 1); P(35 + ox, r, MAT[2], 1); P(36 + ox, r + 1, MAT[2], 1); for (const [a, b] of [[36, 2], [37, 2], [36, 3], [37, 3]]) P(a + ox, r + b, MAT[2], 1); P(36 + ox, r + 2, MAT[1], 1); }
        if (held) {
          const SC = hx('#4a3a44');
          if (holding === 'Balloon') { for (let y = hy0 - 6; y < hy0; y++) P(hx0 + ((y >> 1) & 1), y, SC, 0); sprite(['.bbb.', 'bBbbb', 'bBbbb', 'bbbbb', '.bbb.', '..b..'], hx0 - 1, hy0 - 12, { b: hx('#ff4a6a'), B: hx('#ffc0cc') }); }
          else if (holding === 'Flower') { for (let y = hy0 - 4; y < hy0; y++) D(hx0, y, hx('#3a8a3a')); D(hx0 + 1, hy0 - 2, hx('#5ac85a')); sprite(['.pp.', 'pyyp', 'pyyp', '.pp.'], hx0 - 1, hy0 - 8, { p: hx('#ff6ac0'), y: hx('#ffd84a') }); }
          else if (holding === 'Lollipop') { for (let y = hy0 - 3; y < hy0; y++) D(hx0, y, WHITE); sprite(['.ll.', 'lpLl', 'lLpl', '.ll.'], hx0 - 1, hy0 - 7, { l: hx('#ff4a8a'), p: hx('#ffe0ec'), L: hx('#ff8ab4') }); }
          else if (holding === 'Tiny Flag') { for (let y = hy0 - 7; y < hy0; y++) D(hx0, y, INK); const fl = Math.floor(t * 3) % 2; sprite(fl ? ['ff..', 'ffff', 'fff.'] : ['fff.', 'ffff', 'ff..'], hx0 + 1, hy0 - 7, { f: hx('#2aa8ff') }); }
          // the hand closed round it, in front of the stick
          for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) P(hx0 + a, hy0 + b, MAT[2], 1);
          P(hx0, hy0, MAT[1], 1);
        }
      }
      // a tiny pal on the floor: its own little cube with a dot face
      if (pal === 'Slime Pal' || pal === 'Bunny Pal' || pal === 'Duck Pal' || pal === 'Ghost Pal') {
        const pc = palLeft ? 2 : 32, bob = Math.sin(t * 2.3 + 1) > 0.8 ? 1 : 0, py = 30 - bob;
        const PAL = {
          'Slime Pal': [['..ss..', '.ssSs.', 'sksskS', 'ssssss'], { s: hx('#7ae08a'), S: hx('#c8ffd0'), k: INK }],
          'Bunny Pal': [['.w..w.', '.w..w.', 'wwwwww', 'wkwwkw', 'wwppww', '.wwww.'], { w: hx('#fff8f4'), k: INK, p: hx('#ffb0c0') }],
          'Duck Pal': [['.yy...', 'ykyoo.', 'yyyy..', 'yyyyyy', '.yyyy.'], { y: hx('#ffe050'), k: INK, o: hx('#ff9a30') }],
          'Ghost Pal': [['.www.', 'wwwww', 'wkwkw', 'wwwww', 'w.w.w'], { w: hx('#f4f8ff'), k: INK }],
        }[pal];
        sprite(PAL[0], pc, py + 5 - PAL[0].length, PAL[1]);
      } else if (pal !== 'None') {
        const PM = pal === 'Golden Pal' ? ['#ffe680', '#f0b830', '#b87c10'].map(hx) : MAT;
        const pc = palLeft ? 5 : 35, py0 = 29 - (Math.sin(t * 2.3 + 1) > 0.8 ? 1 : 0);
        for (let x = pc - 5; x < pc + 5; x++) {
          const k = x < pc ? pc - 1 - x : x - pc, st = k >> 1;
          for (let y = py0 + st; y < py0 + 5 - st; y++) P(x, y, PM[0], 1);
          for (let v = 0; v < 5; v++) P(x, py0 + 5 - st + v, x < pc ? PM[1] : PM[2], 1);
        }
        const blinkP = ((t + 1.7) % 3.9) < 0.15;
        P(pc - 2, py0 + 6 + (blinkP ? 1 : 0), INK, 1); P(pc + 1, py0 + 6 + (blinkP ? 1 : 0), INK, 1);
        if (!blinkP) { P(pc - 2, py0 + 7, INK, 1); P(pc + 1, py0 + 7, INK, 1); }
        P(pc - 1, py0 + 8, INK, 1); P(pc, py0 + 8, INK, 1);
        if (pal === 'Golden Pal') { P(pc - 1, py0 + 1, WHITE, 1); P(pc, py0 + 2, WHITE, 1); }
      }
      // outline the creature
      for (let y = 0; y < N; y++) for (let x = N - 1; x >= 0; x--) {
        if (kind[y * N + x]) continue;
        if ((x > 0 && kind[y * N + x - 1]) || (x < N - 1 && kind[y * N + x + 1]) || (y > 0 && kind[(y - 1) * N + x]) || (y < N - 1 && kind[(y + 1) * N + x])) buf[y * N + x] = MAT[3];
      }
      finish(t, ty);
    }

    // ---------- the legendaries' and the UFO's finishing passes ----------
    const HOLO = ['#0a2a48', '#2a8ad0', '#5ad4f8', '#b8f8ff'].map(hx), HOLO4 = hx('#1a5a98'), MAGENTA = hx('#ff6ad8');
    const lumI = v => 0.3 * (v & 255) + 0.59 * (v >> 8 & 255) + 0.11 * (v >> 16 & 255);
    const blendI = (a, b, k) => rgb(Math.round((a & 255) * (1 - k) + (b & 255) * k), Math.round((a >> 8 & 255) * (1 - k) + (b >> 8 & 255) * k), Math.round((a >> 16 & 255) * (1 - k) + (b >> 16 & 255) * k));
    const LIGHTS = ['#ff5a6a', '#ffd040', '#5af08a'].map(hx), BEAM = hx('#e8ff9a');
    function finish(t, ty) {
      if (material === 'Hologram') {
        // a projected cube: three clean blues for its three faces, scanlines rolling down it, a crisp edge;
        // its eyes and mouth stay solid white on a dark backing so the face always reads. It only glitches
        // (rows tearing, magenta fringes, a flickering edge) while the pointer is on it
        const src = buf.slice(), sk = kind.slice();
        const gRow = glitchy ? (Math.floor(t * 9) * 7) % 30 + 4 : -9;
        const built = Math.min(1, (t - buildAt) / 0.9), edge = built < 1 ? Math.round(N - built * (N - 2)) : -1;
        const feat = j => sk[j] === 2 && lumI(src[j]) < 100;
        for (let y = 0; y < N; y++) {
          const shift = y === gRow || y === gRow + 1 ? 2 : 0;
          for (let x = 0; x < N; x++) {
            const i = y * N + x, sx = Math.max(0, Math.min(N - 1, x - shift)), j = y * N + sx;
            const room = roomAt(x, y);
            if (edge >= 0 && y < edge) { buf[i] = room; kind[i] = 0; continue; }
            if (y === edge && (sk[j] || src[j] === MAT[3])) { buf[i] = WHITE; continue; }
            if (sk[j] === 2) buf[i] = feat(j) ? WHITE : HOLO[0];
            else if (sk[j]) {
              if ((sx > 0 && feat(j - 1)) || (sx < N - 1 && feat(j + 1)) || (y > 0 && feat(j - N)) || (y < N - 1 && feat(j + N))) { buf[i] = HOLO[0]; continue; }
              const v0 = src[j];
              let lv = v0 === MAT[0] ? 2 : v0 === MAT[1] ? 1 : v0 === MAT[2] ? 4 : (L0 => L0 < 45 ? 3 : Math.min(2, Math.floor(L0 / 80)))(lumI(v0));
              const scan = (y + Math.floor(t * 4)) % 3 === 0;
              const tone0 = lv === 4 ? HOLO4 : HOLO[lv], tone = scan && lv !== 3 ? blendI(tone0, HOLO[0], 0.4) : tone0;
              buf[i] = (x + 2 * y) % 7 === 0 && lv !== 3 && !scan ? blendI(room, tone, 0.7) : tone;
              if (glitchy && x > 0 && !sk[j - 1]) buf[i] = MAGENTA;
            } else if (src[j] === MAT[3]) buf[i] = glitchy && (Math.floor(t * 10) + y) % 5 === 0 ? WHITE : MAT[3];
            else buf[i] = room;
          }
        }
        // the projector: a dark puck with a glowing eye, its light rising to the cube in a dithered cone
        for (let y = 31; y < 39; y++) for (let x = 8; x < 32; x++) {
          const w = 2 + (39 - y) * 1.2;
          if (y < 35 && Math.abs(x + 0.5 - 20) < w && (x + y + Math.floor(t * 6)) % 3 === 0 && !kind[y * N + x]) buf[y * N + x] = blendI(buf[y * N + x], HOLO[3], 0.6);
          const d = ((x + 0.5 - 20) / 7) ** 2 + ((y + 0.5 - 36.5) / 2) ** 2;
          if (d <= 1) buf[y * N + x] = d > 0.6 ? hx('#4a5060') : Math.abs(x + 0.5 - 20) < 2 && y < 37 ? HOLO[3] : hx('#22262e');
        }
      }
      // gold coins spilling out of the mimic when it bites
      for (let i = loot.length - 1; i >= 0; i--) {
        const c0 = loot[i], u = t - c0.t0;
        if (u > 1.4) { loot.splice(i, 1); continue; }
        const x = Math.round(c0.x + c0.vx * u), y = Math.round(c0.y - 12 * u + 18 * u * u);
        P(x, y, Math.floor(u * 9) % 2 ? GOLDC : hx('#c88a14')); P(x + 1, y, hx('#a86a10'));
      }
      if (ufo) {
        // the coveted tiny UFO: lights chasing round its rim; hover it and it beams the cubeling up
        const zu = Math.min(1, (t - ufoAt) / 0.6), ux = Math.round(ufoFrom + (ufoX - ufoFrom) * (zu < 1 ? zu * zu * (3 - 2 * zu) : 1)), uy = 2 + (Math.sin(t * 2) > 0.5 ? 1 : 0) - (zu < 1 ? Math.round(Math.sin(Math.PI * zu) * 2) : 0);
        if (!beamOn) for (let y = uy + 5; y < ty + 4; y++) { const w = 1 + ((y - uy) >> 2); for (let x = ux - w; x <= ux + w; x++) if ((x + y + Math.floor(t * 3)) % 4 === 0 && x >= 0 && x < N && y >= 0 && y < N && !kind[y * N + x]) buf[y * N + x] = blendI(buf[y * N + x], BEAM, 0.35); }
        if (beamOn) for (let y = uy + 5; y < ty + 7; y++) { const w = 1 + ((y - uy) >> 2); for (let x = ux - w; x <= ux + w; x++) if ((x + y + Math.floor(t * 10)) % 3 && x >= 0 && x < N && y >= 0 && y < N) buf[y * N + x] = blendI(buf[y * N + x], BEAM, 0.55); }
        const K = INK, D = hx('#9ae8ff'), Dl = hx('#e8fbff'), Gy = hx('#8a90a0');
        const rows = ['...kkk...', '..kDdDk..', '.kkkkkkk.', 'kgLgLgLgk', '.kkkkkkk.'];
        rows.forEach((r, j) => { for (let i = 0; i < 9; i++) { const ch = r[i]; if (ch === '.') continue; P(ux - 4 + i, uy + j, ch === 'k' ? K : ch === 'D' ? Dl : ch === 'd' ? D : ch === 'g' ? Gy : LIGHTS[(i + Math.floor(t * 6)) % 3]); } });
      }
    }

    // straight into a full-size image, block by block
    const cell = Math.max(1, Math.floor(S / N)), off = Math.floor((S - cell * N) / 2);
    const img = c.ctx.createImageData(S, S);
    const out = new Int32Array(img.data.buffer);
    // its voice: a major pentatonic keyed from the hash's tail, played in the cube's own material
    const base = 60 + parseInt(c.hash.slice(-4, -1), 16) % 7, MAJ = [0, 2, 4, 7, 9];
    const scale = k => base + 12 * Math.floor(k / 5) + MAJ[k % 5];
    let climb = 0;
    function voice(k) {
      const m = scale(k);
      if (material === 'Glass Tank') { c.sound.note(m, { dur: 0.12, vel: 0.2, wave: 'sine' }); c.sound.note(m + 7, { dur: 0.18, vel: 0.12, wave: 'sine', at: 0.08 }); }
      else if (material === 'Mimic Chest') { c.sound.hit('click', 0.4); c.sound.note(m - 24, { dur: 0.2, vel: 0.28, wave: 'triangle', cutoff: 500 }); }
      else if (material === 'Hologram') { c.sound.note(m, { dur: 0.08, vel: 0.12, wave: 'square', cutoff: 2400 }); c.sound.note(m + 12, { dur: 0.08, vel: 0.08, wave: 'square', cutoff: 2400, at: 0.06 }); }
      else if (material === 'Wood' || material === 'Cardboard') { c.sound.hit('click', 0.5); c.sound.note(m - 12, { dur: 0.12, vel: 0.3, wave: 'triangle', cutoff: material === 'Wood' ? 1600 : 700 }); }
      else if (material === 'Stone') { c.sound.hit('kick', 0.18); c.sound.note(m - 12, { dur: 0.2, vel: 0.25, wave: 'triangle', cutoff: 600 }); }
      else if (material === 'Ice' || material === 'Marble' || material === 'Glass Bead') { c.sound.note(m + 12, { dur: 0.7, vel: 0.2, wave: 'sine' }); c.sound.note(m + 19, { dur: 0.5, vel: 0.08, wave: 'sine', at: 0.02 }); }
      else if (material === 'Jelly') { c.sound.note(m, { dur: 0.16, vel: 0.24, wave: 'sine' }); c.sound.note(m + 1, { dur: 0.14, vel: 0.18, wave: 'sine', at: 0.1 }); c.sound.note(m, { dur: 0.25, vel: 0.14, wave: 'sine', at: 0.2 }); }
      else if (material === 'Gold') { c.sound.note(m, { dur: 0.6, vel: 0.22, wave: 'triangle' }); c.sound.note(m + 24, { dur: 0.8, vel: 0.1, wave: 'sine', at: 0.03 }); }
      else if (material === 'Moss' || material === 'Plush' || material === 'Sponge' || material === 'Felt') { c.sound.note(m - 12, { dur: 0.3, vel: 0.26, wave: 'sine', attack: 0.02 }); c.sound.note(m - 5, { dur: 0.2, vel: 0.1, wave: 'sine', at: 0.05 }); }
      else if (material === 'Toast' || material === 'Cheese' || material === 'Brick') { c.sound.hit('click', 0.35); c.sound.note(m - 12, { dur: 0.16, vel: 0.26, wave: 'triangle', cutoff: 1000 }); }
      else if (material === 'Galaxy' || material === 'Rainbow') { for (let i = 0; i < 3; i++) c.sound.note(scale(k + i * 2) + 12, { dur: 0.5, vel: 0.14, wave: 'sine', at: i * 0.07 }); }
      else c.sound.note(m, { dur: 0.22, vel: 0.28, wave: 'triangle', cutoff: 1100 });
    }
    let lastTap = -9;
    function feel(t) {
      const inp = c.input;
      const gx = Math.floor((inp.x * S - off) / cell), gy = Math.floor((inp.y * S - off) / cell);
      // the legendaries and the UFO answer the pointer
      if (material === 'Glass Tank') {
        const goal = inp.inside ? Math.max(-8, Math.min(8, (inp.x * N - 20) * 0.7)) : Math.sin(t * 0.35) * 8;
        lookX = inp.inside ? (inp.x * N - 20) / 6 : Math.sin(t * 0.5) * 0.5 + Math.sin(t * 0.21) * 0.6;
        lookY = inp.inside ? (inp.y * N - 18) / 6 : Math.sin(t * 0.37) * 0.8;
        const step = Math.max(-0.25, Math.min(0.25, (goal - fishU) * 0.08));
        if (Math.abs(step) > 0.01) fishDir = step > 0 ? 1 : -1;
        fishU += step;
      }
      if (material === 'Mimic Chest') {
        const want = t - (feel.chomp || -9) < 0.15 ? 0 : t - (feel.chomp || -9) < 1.2 ? 4 : inp.inside && gx >= 4 && gx < 36 && gy < 34 ? 3.6 : 2 + (Math.sin(t * 1.1) > 0.8 ? 1 : 0);
        if (want === 3.6 && lidOpen < 2.6) { c.sound.note(scale(0) - 24, { dur: 0.5, vel: 0.08, wave: 'triangle', cutoff: 400, attack: 0.1 }); c.sound.note(scale(1) - 24, { dur: 0.4, vel: 0.06, wave: 'triangle', cutoff: 400, at: 0.25 }); }
        lidOpen += (want - lidOpen) * (want === 0 ? 1 : 0.3);
      }
      if (material === 'Hologram') {
        const was = glitchy;
        glitchy = inp.inside && gx >= 0 && gy >= 0 && gx < N && gy < N && kind[gy * N + gx] > 0;
        if (glitchy && !was) c.sound.note(scale(9) + 12, { dur: 0.05, vel: 0.06, wave: 'square', cutoff: 3000 });
        if (glitchy && Math.floor(t * 9) % 4 === 0 && Math.floor((t - 1 / 30) * 9) % 4 !== 0) c.sound.note(scale(Math.floor(t * 9) % 8) + 12, { dur: 0.04, vel: 0.04, wave: 'square', cutoff: 2800 });
      }
      if (ufo) {
        const was = beamOn;
        beamOn = inp.inside && Math.abs(gx - ufoX) < 6 && gy < 9;
        if (beamOn && !was) { for (let k = 0; k < 6; k++) c.sound.note(scale(5 + (k % 2) * 2) + 12, { dur: 0.12, vel: 0.06, wave: 'sine', at: k * 0.1 }); }
      }
      const over = inp.inside && gx >= 0 && gy >= 0 && gx < N && gy < N && kind[gy * N + gx] > 0;
      if (over && !shy) c.sound.note(scale(7), { dur: 0.25, vel: 0.08, wave: 'sine', attack: 0.05 });
      shy = over;
      // hold it down to squish it; let go and it springs up with a boing
      const pressing = over && inp.down;
      if (pressing && squish === 0) c.sound.note(scale(2) - 12, { dur: 0.3, vel: 0.12, wave: 'sine', attack: 0.08 });
      if (!pressing && squish > 1.5) { jumpAt = t; c.sound.note(scale(4), { dur: 0.12, vel: 0.2, wave: 'triangle' }); c.sound.note(scale(9), { dur: 0.3, vel: 0.16, wave: 'triangle', at: 0.08 }); }
      squish = pressing ? Math.min(2, squish + 0.25) : 0;
      for (const p of inp.taps()) {
        const tx = Math.floor((p.x * S - off) / cell), tyy = Math.floor((p.y * S - off) / cell);
        if (ufo && Math.abs(tx - ufoX) < 6 && tyy < 9 && t - ufoAt > 0.6) {
          // the UFO zips across to the other side with a warbling whoop
          ufoFrom = ufoX; ufoX = ufoX > 20 ? 9 : 30; ufoAt = t;
          [0, 4, 2, 7, 5, 9].forEach((k, i) => c.sound.note(scale(k) + 12, { dur: 0.08, vel: 0.08, wave: 'sine', at: i * 0.06 }));
          continue;
        }
        if (!(tx >= 0 && tyy >= 0 && tx < N && tyy < N && kind[tyy * N + tx] > 0)) continue;
        if (material === 'Glass Tank' && tankBubbles.length < 10) for (let k = 0; k < 3; k++) tankBubbles.push({ u: Math.round(fishU) + (fishDir > 0 ? 6 : -7) + (k - 1), v: (tall ? 19 : 14) - 5 + k * 2, t0: t + k * 0.15 });
        if (material === 'Mimic Chest' && t - (feel.chomp || -9) > 0.8) {
          feel.chomp = t;
          c.sound.hit('kick', 0.22); c.sound.hit('click', 0.3, { at: 0.02 });
          for (let k = 0; k < 4; k++) { loot.push({ x: 19 + (k % 2), y: 18, vx: (k - 1.5) * 5, t0: t + 0.15 + k * 0.05 }); c.sound.note(scale(9 + k) + 12, { dur: 0.15, vel: 0.07, wave: 'triangle', at: 0.2 + k * 0.08 }); }
        }
        if (material === 'Hologram' && t - buildAt > 1) { buildAt = t; [0, 2, 4, 7, 9, 12].forEach((k, i) => c.sound.note(scale(k) + 12, { dur: 0.07, vel: 0.07, wave: 'square', cutoff: 2600, at: i * 0.13 })); }
        if (t - lastTap > 1.5) climb = 0;
        if (t - lastTap < 0.12) continue;
        lastTap = t;
        if (t - jumpAt > 0.3) jumpAt = t;
        voice(climb % 8);
        climb++;
      }
    }
    let lastSig = -1;
    function render(t) {
      feel(t);
      compose(t);
      let sig = 0;
      for (let i = 0; i < buf.length; i++) sig = (Math.imul(sig, 31) + buf[i]) | 0;
      if (sig === lastSig) return;
      lastSig = sig;
      for (let py = 0; py < S; py++) {
        const gy = Math.floor((py - off) / cell);
        const row = py * S;
        for (let px = 0; px < S; px++) {
          const gx = Math.floor((px - off) / cell);
          out[row + px] = (gx >= 0 && gy >= 0 && gx < N && gy < N) ? buf[gy * N + gx] : roomAt(gx, gy);
        }
      }
      c.ctx.putImageData(img, 0, 0);
    }
    render(0);
    return t => render(t);
  },
});

})(window.Proto);
