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
    // the face, the things on top, the limbs and the pal: shared by every cubeling and the legendaries
    function drawEyes(L, R, both, blink, t) {
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
    }
    function drawMouth(L, R, both, t) {
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
    }
    function drawTop(t, ty) {
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
    }
    function drawLimbs(t, ty, h, hop) {
      const D = (x, y, col) => P(x, y, col, 1);
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
    }
    function drawPal(t) {
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
    }
    function drawStuck(L, R, both) {
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
    }
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
      drawEyes(L, R, both, blink, t);
      fk = 1;
      if (shy && material !== 'Hologram') { L(7, 7, BLUSH); R(7, 7, BLUSH); L(8, 8, BLUSH); R(8, 8, BLUSH); L(10, 7, BLUSH); R(10, 7, BLUSH); }
      if (cheekStyle === 'Rosy' || (shy && legend !== 'Aquarium' && legend !== 'Mimic')) { L(8, 7, BLUSH); L(9, 7, BLUSH); R(8, 7, BLUSH); R(9, 7, BLUSH); }
      fk = material === 'Hologram' ? 2 : 1;
      drawMouth(L, R, both, t);
      fk = 1;
      // cheeks and things stuck on the faces
      drawStuck(L, R, both);
      if (extra === 'Headphones') {
        for (let x = 5; x < 35; x++) { const u = (x + 0.5 - 20) / 15; if (Math.abs(u) <= 1) P(x, Math.round(ty + 6 - Math.sqrt(1 - u * u) * 9), hx('#3a3a4a'), 1); }
        for (const hx0 of [4, 33]) for (let y = ty + 5; y < ty + 10; y++) { P(hx0, y, hx('#3a3a4a'), 1); P(hx0 + 1, y, hx('#ff6a8a'), 1); P(hx0 + 2, y, hx('#3a3a4a'), 1); }
      }

      // what grows on top, standing at the middle of the top face
      drawTop(t, ty);
      drawLimbs(t, ty, h, hop);
      drawPal(t);
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
    // ---------- the legendaries: three one-of-ones, each a scene of its own on the same 40-cell grid ----------
    // (every roll and trait above is untouched; they only take over the drawing)
    if (legend !== 'None') return legendary();
    function legendary() {
      const bay = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dth = (x, y) => (bay[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
      // a colour ramp read with ordered dither, so light falls off in crisp pixel steps
      const ramp = (cols, f, x, y) => cols[Math.max(0, Math.min(cols.length - 1, Math.floor(f * (cols.length - 1) + dth(x, y))))];
      const H = tall ? 19 : slab ? 11 : 14, inp = c.input;
      const zb = new Float32Array(N * N), fid = new Int16Array(N * N);
      let cxS = 20, cyS = 0, ty = 7, hop = 0;
      const pr = (X, Y, Z) => [cxS + X - Y, cyS + (X + Y) / 2 - Z];
      // fill a parallelogram (three 3D corners: p0, p0 + the u side, p0 + the v side); shade(u, v, x, y) gives a colour
      // or undefined; with depth on, the nearest surface wins
      function face(p0, p1, p3, id, shade, depth) {
        const a = pr(p0[0], p0[1], p0[2]), b = pr(p1[0], p1[1], p1[2]), d = pr(p3[0], p3[1], p3[2]);
        const ux = b[0] - a[0], uy = b[1] - a[1], vx = d[0] - a[0], vy = d[1] - a[1], det = ux * vy - uy * vx;
        if (Math.abs(det) < 0.05) return;
        const xs = [a[0], b[0], d[0], b[0] + vx], ys = [a[1], b[1], d[1], b[1] + vy];
        const x0 = Math.max(0, Math.floor(Math.min(...xs))), x1 = Math.min(N - 1, Math.ceil(Math.max(...xs)));
        const y0 = Math.max(0, Math.floor(Math.min(...ys))), y1 = Math.min(N - 1, Math.ceil(Math.max(...ys)));
        const z0 = p0[0] + p0[1] + p0[2], zu = p1[0] + p1[1] + p1[2] - z0, zv = p3[0] + p3[1] + p3[2] - z0;
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const px = x + 0.5 - a[0], py = y + 0.5 - a[1], u = (px * vy - py * vx) / det, v = (ux * py - uy * px) / det;
          if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
          const i = y * N + x, z = z0 + u * zu + v * zv;
          if (depth && z < zb[i]) continue;
          const col = shade(u, v, x, y);
          if (col === undefined) continue;
          buf[i] = col; fid[i] = id; kind[i] = 1; zb[i] = z;
        }
      }
      // a sprite of letters, and a thick line, in screen cells
      const spr = (rows, x0, y0, map) => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (map[r[i]] !== undefined) P(x0 + i, y0 + j, map[r[i]], 1); });
      const line = (x0, y0, x1, y1, col) => { const n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)))); for (let k = 0; k <= n; k++) P(Math.round(x0 + (x1 - x0) * k / n), Math.round(y0 + (y1 - y0) * k / n), col, 1); };
      const blink = t => ((t + blinkAt) % blinkEvery) < 0.15;
      const ease = k => k < 0 ? 0 : k > 1 ? 1 : k * k * (3 - 2 * k);

      // ===== Aquarium: the room's lights are off and the tank is the only light, throwing caustics on the walls =====
      const NIGHT = ['#050a1c', '#0a1530', '#10244a', '#1a3c68', '#2a6090', '#4596bc', '#86d8ec'].map(v => blendI(hx(v), rooms[0], 0.05));
      const rampD = (cols, f, x, y, amt) => cols[Math.max(0, Math.min(cols.length - 1, Math.floor(f * (cols.length - 1) + 0.5 + (dth(x, y) - 0.5) * amt)))];
      const WL = ['#0e4a7e', '#1a6fa8', '#2a96cc', '#4cc0e6', '#8ae0f6'].map(hx), WR = ['#0a3664', '#13558a', '#1f78b0', '#38a2d6', '#6ccaee'].map(hx);
      const SURFC = ['#2a9ccc', '#5cc8ea', '#c8f6ff'].map(hx), GRAV = ['#f0c070', '#d88850', '#a87a5a', '#f4e8c8', '#e08aa0', '#7a90b0'].map(hx);
      const FISHS = [['#ff7a1a', '#ffc070', '#ffb040', '#ffe2b8', '#d8520c'], ['#f4f0ec', '#ffffff', '#ff5a3a', '#fff4ee', '#e83a24'], ['#ff8a2a', '#ffd090', '#2a2026', '#fff0d8', '#d85a14']][grain[3] < 0.55 ? 0 : grain[3] < 0.82 ? 1 : 2].map(hx);
      const caus = (x, y, t) => {
        const a = Math.sin(x * 0.7 + t * 1.1 + Math.sin(y * 0.55 - t * 0.7) * 1.7), b = Math.sin(y * (y < 30 ? 0.75 : 1.6) - t * 0.9 + Math.sin(x * 0.42 + t * 0.6) * 2.1);
        const v = Math.abs(a + b);
        return v < 0.32 ? 1 - v / 0.32 : 0;
      };
      let glowK = 1;
      function bgAq(x, y, t) {
        // flat dark shades of the room, a soft halo round the tank, and the caustics: crisp bright ripples of light
        // pouring up the wall above the open top and pooled on the floor in front
        const pat = roomAt(x, y) !== rooms[0], wall = y < 30;
        const dx = x + 0.5 - 20, dy = y + 0.5 - (ty + 15), up = ty + 7 - (y + 0.5);
        const halo = Math.hypot(dx, dy * 1.15) / 21;
        let lit = 0;
        if (up > 0 && Math.abs(dx) < 7 + up * 1.1) lit = Math.max(0, 1 - up / 20);
        if (!wall) { const q = Math.hypot(dx / 17, (y + 0.5 - 36.6) / 3); if (q < 1) lit = Math.max(lit, 1 - q * 0.6); }
        if (halo < 0.75) lit = Math.max(lit, 0.75 - halo);
        lit *= glowK;
        let lv = halo + (dth(x, y) - 0.5) * 0.12 < 0.62 ? 2 : halo < 1.05 ? 1 : 0;
        if (pat) lv = Math.min(lv + 1, 3);
        if (!wall && lv > 0) lv--;
        if (lit > 0.08) { const cs = caus(x, y, t); if (cs > 0.4) lv = Math.max(lv, lit > 0.5 ? 5 : 4); else if (cs > 0.05 && lit > 0.3) lv = Math.max(lv, 3); }
        return NIGHT[lv];
      }
      let fishU = -2, fishDir = 1, fishV = 0, lookX = 0, lookY = 0, dartAt = -9, flipAt = -9, eaten = 0, fleeUntil = -9, fleeTo = 0, finger = null;
      const food = [], hearts = [];
      const tankBub = [];
      function aquarium(t) {
        hop = 0; ty = tall ? 3 : 7; cyS = ty + 7 + H;
        const h = H;
        kind.fill(0);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = bgAq(x, y, t);
        // its feet, if it has any: little dark glass ones
        if (limbs === 'Feet') for (const fx of [14, 23]) { const k = fx < 20 ? 19 - fx : fx - 20, fy = ty + 14 - (k >> 1) + h; for (let x = fx; x < fx + 3; x++) { P(x, fy, hx('#1a5a80'), 1); P(x, fy + 1, hx('#123e5c'), 1); } P(fx, fy, hx('#4ab0d8'), 1); }
        const T = (u, bv, col) => { const k = u < 0 ? -u - 1 : u; if (k < 14 && bv >= 0 && bv < h) P(20 + u, ty + 14 - (k >> 1) + bv, col, 1); };
        const tick = Math.floor(t * 8);
        for (let x = 6; x < 34; x++) {
          const k = x < 20 ? 19 - x : x - 20, step = k >> 1, left = x < 20;
          // the open surface, from above: thin ripple lines drifting across it, glints
          for (let y = ty + step; y < ty + 14 - step; y++) {
            const yy = y - ty, w = Math.sin((x + 2 * yy) * 0.55 + t * 2) + Math.sin((x - 2 * yy) * 0.45 - t * 1.7);
            P(x, y, w > 1.7 ? SURFC[2] : w > 1.05 ? SURFC[1] : SURFC[0], 1);
          }
          // the glass sides: water lit from inside, shafts of light sliding down through it, gravel, the tank's dark base
          for (let v = 0; v < h; v++) {
            const y = ty + 14 - step + v;
            const shaft = Math.sin(k * 0.7 - v * 0.5 + t * 1.2 + (left ? 0 : 2)) > 0.78 ? 0.22 : 0;
            let col = rampD(left ? WL : WR, 0.88 - 0.98 * v / h + shaft, x, y, 0.7);
            if (v === 0) col = left ? hx('#d8f8ff') : hx('#a8e8fa');
            else if (v === 1) col = (k + Math.floor(t * 3)) % 6 === 0 ? WHITE : left ? WL[4] : WR[4];
            if (v >= h - 3 && v < h - 1) col = GRAV[(k * 7 + v * 3 + (left ? 0 : 2) + (grain[k % 40] > 0.6 ? 1 : 0)) % 6];
            if (v === h - 1) col = left ? hx('#16263a') : hx('#0c1826');
            P(x, y, col, 1);
          }
        }
        // swaying grass at both ends, and a little sunken castle on the right
        const blades = [[-12, 8, 0], [-10, 6, 1], [-8, 4, 0], [9, 5, 1], [11, 8, 0], [12, 6, 1]];
        for (const [u, len, tone] of blades) for (let j = 0; j < len; j++) {
          const bv = h - 4 - j, sw = Math.round(Math.sin(t * 1.3 + u * 0.7 + j * 0.35) * j / len * 1.6);
          T(u + sw, bv, j === len - 1 ? hx('#9af08a') : tone ? hx('#2e9a50') : hx('#45c066'));
        }
        const CAS = { c: hx('#d8c8a8'), C: hx('#a89a80'), d: hx('#2a1c2a'), f: hx('#ff5a6a') };
        ['..f..', '..c..', 'c.c.c', 'ccccc', 'cCdCc', 'cCdCc'].forEach((r, j) => { for (let i = 0; i < 5; i++) if (r[i] !== '.') T(3 + i, h - 9 + j, CAS[r[i]]); });
        // the air stone and its stream of bubbles
        T(-5, h - 4, hx('#5a6070')); T(-4, h - 4, hx('#7a8090'));
        for (let i = 0; i < 5; i++) { const ph = (t * 0.55 + i / 5) % 1, bv = Math.round(h - 5 - ph * (h - 5)); if (bv > 1) T(-5 + (Math.sin(t * 3 + i * 2) > 0 ? 1 : 0), bv, i % 2 ? WHITE : hx('#bff2ff')); }
        for (let i = tankBub.length - 1; i >= 0; i--) { const b = tankBub[i], bv = Math.round(b.v - (t - b.t0) * 7); if (t < b.t0) continue; if (bv < 2) { tankBub.splice(i, 1); continue; } T(b.u + (bv % 3 === 0 ? 1 : 0), bv, WHITE); }
        // the goldfish: a fancy fantail, its double tail flowing, swimming laps round the tank
        const fl = Math.floor(t * (t - dartAt < 0.8 ? 12 : 5)) % 2, fu = Math.round(fishU), fb = h - 10 + Math.round(fishV) - (t - flipAt < 0.9 ? Math.round(Math.sin(Math.PI * (t - flipAt) / 0.9) * 3) : 0);
        const BODY = ['..ddd.....', 'oooooo....', 'ohhoooowo.', 'oooooooko.', 'ooooooooom', 'bbbbbbbb..', '.f....f...'];
        const TAIL = fl ? ['...', '...', '.tt', 'ttt', '.tt', '...', '...'] : ['...', 't..', 'tt.', 'ttt', 'tt.', 't..', '...'];
        const FROWS = BODY.map((r, j) => TAIL[j] + r);
        // (after every fifth flake it eats it turns a happy golden somersault)
        const flip = t - flipAt < 0.9, FS = flip ? [hx('#ffd23a'), hx('#fff6b0'), hx('#ffb020'), hx('#fff0c0'), hx('#c88a10')] : FISHS;
        const fd = flip ? (Math.floor((t - flipAt) * 7) % 2 ? -fishDir : fishDir) : fishDir;
        const FMAP = { o: FS[0], h: FS[1], d: FS[2], t: FS[2], b: FS[3], f: FS[2], m: FS[4], w: WHITE, k: INK };
        FROWS.forEach((r, j) => { for (let i = 0; i < 13; i++) if (r[i] !== '.' && r[i] !== ' ') T(fu + (fd > 0 ? i - 6 : 6 - i), fb + j, FMAP[r[i]]); });
        // the food you dropped, sinking (it rests on the gravel until the fish finds it)
        for (const f of food) { if (t < f.t0) continue; const bv = Math.round(Math.min(h - 4, 1 + (t - f.t0) * 1.7)), u = f.u + (bv < h - 4 && Math.sin(t * 3 + f.t0 * 7) > 0.5 ? 1 : 0); if (t - f.t0 < 0.25) T(f.u, 0, WHITE); T(u, bv, f.c ? hx('#f0a050') : hx('#c8603a')); }
        for (let i = hearts.length - 1; i >= 0; i--) { const k = t - hearts[i].t0; if (k > 1.6) { hearts.splice(i, 1); continue; } const bv = Math.round(hearts[i].bv - k * 6); if (bv >= 1) { T(hearts[i].u, bv, hx('#ff5a8a')); T(hearts[i].u + 1, bv, hx('#ff5a8a')); T(hearts[i].u, bv + 1, hx('#ff8ab0')); } }
        if (grain[3] >= 0.82) for (const [i, j] of [[5, 2], [8, 4], [6, 4]]) T(fu + (fishDir > 0 ? i - 6 : 6 - i), fb + j, hx('#2a2026'));
        // the glass: a bright edge down the front corner
        for (let bv = 3; bv < h - 2; bv++) if (bv % 5 !== 4) T(-1, bv, hx('#e8fbff'));
        // its eyes: two bubbles stuck on the glass, looking at you
        const lx = lookX > 0.3 ? 1 : lookX < -0.3 ? -1 : 0, ly = lookY > 0.3 ? 1 : 0, bl = blink(t);
        for (const sg of [-1, 1]) {
          const c0 = sg < 0 ? -7 : 6, top = 2;
          for (let i = -2; i <= 2; i++) for (let j = 0; j < 5; j++) {
            if (Math.abs(i) === 2 && (j === 0 || j === 4)) continue;
            const ring = Math.abs(i) === 2 || j === 0 || j === 4, kk = c0 + i < 0 ? -c0 - i - 1 : c0 + i, yy = ty + 14 - (kk >> 1) + top + j;
            if (ring) T(c0 + i, top + j, (i < 0 && j < 2) || (j === 0 && i < 1) ? WHITE : hx('#bff0ff')); else if (bl && j === 2) T(c0 + i, top + j, INK); else if (yy >= 0 && yy < N) T(c0 + i, top + j, blendI(buf[yy * N + 20 + c0 + i], hx('#e8fbff'), 0.3));
          }
          if (bl) continue;
          const p0 = c0 + (lx < 0 ? -1 : lx > 0 ? 0 : sg < 0 ? 0 : -1), q0 = top + 1 + ly;
          T(p0, q0, INK); T(p0 + 1, q0, INK); T(p0, q0 + 1, INK); T(p0 + 1, q0 + 1, INK); T(p0, q0, WHITE);
        }
        // two kelp fronds grown up out of the water and over the rim, and bubbles escaping the surface
        for (const [bx, by, len, ph] of [[15, ty + 5, 9, 0], [25, ty + 6, 7, 2]]) for (let j = 0; j < len; j++) {
          const x = bx + Math.round(Math.sin(t * 1.1 + ph + j * 0.45) * j / len * 2.2), y = by - j;
          P(x, y, j === len - 1 ? hx('#b8ff9a') : j % 2 ? hx('#3aae5a') : hx('#2a8a48'), 1);
          if (j > 1 && j < len - 1) P(x + (j % 2 ? 1 : -1), y, j % 4 < 2 ? hx('#5ad078') : hx('#3aae5a'), 1);
        }
        for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1, y = Math.round(ty + 9 - ph * 14), x = 15 + (Math.sin(t * 3 + i * 2) > 0 ? 1 : 0); if (ph < 0.92 && y >= 0) P(x, y, ph > 0.8 ? hx('#9ae8f8') : WHITE, 1); }
        // light glinting along the top front edges
        for (let k = 0; k < 14; k++) { const y = ty + 13 - (k >> 1); if ((k + tick) % 7 !== 0) { P(19 - k, y, hx('#bff4ff'), 1); P(20 + k, y, hx('#9ae8fa'), 1); } else { P(19 - k, y, WHITE, 1); P(20 + k, y, WHITE, 1); } }
        // a pal waits by the tank, in its light
        if (pal !== 'None') { const was = buf.slice(); drawPal(t); for (let i = 0; i < N * N; i++) if (buf[i] !== was[i]) { const x = i % N; buf[i] = blendI(blendI(buf[i], NIGHT[1], 0.3), hx('#4cc0e0'), 0.22); } }
        // the tank's dark frame, and the light spilling past it
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (kind[i]) continue;
          if ((x > 0 && kind[i - 1]) || (x < N - 1 && kind[i + 1]) || (y > 0 && kind[i - N]) || (y < N - 1 && kind[i + N])) buf[i] = y < ty + 14 - Math.abs(x + 0.5 - 20) / 2 + 1 ? hx('#9ae6f6') : hx('#071426');
        }
      }

      // ===== Mimic: deep in a torchlit dungeon, the chest yawns open on its teeth and its tongue; gold everywhere =====
      const WOOD = [['#e0a060', '#b87838', '#8a5422', '#5a3210'], ['#c87a50', '#9c5430', '#6e3418', '#401c08'], ['#d8a870', '#ac7e46', '#7c5428', '#4a3014']][grain[5] < 0.5 ? 0 : grain[5] < 0.8 ? 1 : 2].map(hx);
      const STONE = ['#120e18', '#1c1724', '#251f2f', '#2f283b', '#3a3248', '#4a3f58', '#5e4c62', '#7a5a5a', '#a07050', '#d09050'].map(hx);
      const IRN = [hx('#2a2830'), hx('#4a4652'), hx('#7a7684')], BR = [hx('#7a5410'), hx('#c8901c'), hx('#f0c24a'), hx('#fff0a0')];
      const GOLD = [hx('#8a5a08'), hx('#d89a18'), hx('#ffd040'), hx('#fff6b0')], MAW = [hx('#0c0204'), hx('#1e0408'), hx('#3a0a12'), hx('#5a1420')];
      const TONG = [hx('#a02a40'), hx('#e0506a'), hx('#ff8aa0')], TEETH = [hx('#fffaf0'), hx('#d8ccb8')];
      // coins spilled on the floor round the chest (where they lie varies by hash)
      const COINS = [];
      for (let i = 0; i < 14; i++) { const a = grain[(i * 3) % 40] * 6.28, r = 12 + grain[(i * 7 + 1) % 40] * 7; COINS.push([Math.round(20 + Math.cos(a) * r), Math.round(34 + Math.sin(a) * r * 0.3), i]); }
      let lid = 0.7, chompAt = -9, lastYawn = 0, wasOver = false, lean = 0, linger = 0, caught = false, mood = '', moodUntil = -9, eatAt = -9;
      const coins = [], mouthM = new Uint8Array(N * N);
      const torchAt = t => 0.85 + 0.1 * Math.sin(t * 11) + 0.05 * Math.sin(t * 23 + 1);
      function bgMim(x, y, t) {
        const fl = torchAt(t);
        let L = 0;
        for (const [tx, tyy] of [[3.5, 11], [36.5, 11]]) L += Math.max(0, 1 - Math.hypot(x + 0.5 - tx, (y + 0.5 - tyy) * 1.1) / 15) * fl;
        L += Math.max(0, 1 - Math.hypot((x + 0.5 - 20) / 16, (y + 0.5 - 30) / 9)) * 0.45;
        let base = 0.3, f;
        if (y < 28) {
          // big rough stone blocks, a row of four or five, each row offset
          const row = Math.floor((y + 40) / 5), yy = (y + 40) % 5, w = 7 + (row % 3), xx = ((x + 40 + row * 3) % w + w) % w;
          if (yy === 4 || xx === 0) base = 0.02;
          else if (yy === 0 || xx === 1) base = 0.42;
          else base = 0.28 + ((row * 7 + Math.floor((x + 40 + row * 3) / w) * 13) % 5) * 0.03;
          if (y === 27) base = 0.05;
        } else {
          // flagstones, in the cube's own 2:1 diamonds
          const a = (x + 2 * y + 400) % 12, b = (x - 2 * y + 400) % 12;
          base = a === 0 || b === 0 ? 0.04 : 0.2 + ((Math.floor((x + 2 * y + 400) / 12) + Math.floor((x - 2 * y + 400) / 12)) % 3) * 0.04;
        }
        f = base * (0.45 + 0.9 * L) + L * 0.18;
        return ramp(STONE, Math.min(1, f), x, y);
      }
      function mimic(t) {
        // the lid: breathing a little open, a big yawn now and then, snapping shut when it bites
        const ch = t - chompAt;
        hop = ch >= 0 && ch < 0.45 ? Math.round(Math.sin(Math.PI * ch / 0.45) * 2) : 0;
        ty = (tall ? 5 : 9) - hop; cyS = ty + 7 + H; cxS = 20 + Math.round(lean) + (caught ? (Math.floor(t * 20) % 2 ? 1 : -1) : 0);
        const hl = tall ? 6 : 5, hb = H - hl;
        kind.fill(0); fid.fill(0); zb.fill(-1e9);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = bgMim(x, y, t);
        // cobwebs high in the corners, a skull and bones by the wall
        for (let k = 0; k < 6; k++) { P(k, 5 - k, STONE[6]); P(k, 0, k % 2 ? STONE[5] : STONE[6]); P(0, k, STONE[5]); if (k < 4) P(k + 1, 2 - (k >> 1) + 1, STONE[5]); }
        const BONE = { w: hx('#e8dcc8'), s: hx('#b8a890'), k: hx('#1a1218') };
        spr(['.www.', 'wwwww', 'wkwkw', 'wwwww', '.w.w.'], palLeft ? 32 : 3, 29, BONE); spr(['w...w', '.sss.', 'w...w'], palLeft ? 33 : 2, 35, BONE);
        // the torches on the wall, flames licking
        const ft = Math.floor(t * 9);
        for (const tx of [3, 35]) {
          spr(['.ii.', 'iIIi', '.ii.', '.ii.', '..i.'], tx, 12, { i: IRN[0], I: IRN[1] });
          const FL = [['.y..', '.yo.', 'yYoo', 'oYYo', '.oo.'], ['..y.', '.oy.', 'ooYy', 'oYYo', '.oo.'], ['.y.y', '.yo.', 'oYyo', 'oYYo', '.oo.']][(ft + tx) % 3];
          spr(FL, tx, 7, { y: hx('#ffd040'), Y: hx('#fff4b0'), o: hx('#ff7a1a') });
        }
        // spilled gold on the floor
        for (const [x, y, i] of COINS) { const gl = (Math.floor(t * 3) + i * 5) % 17 === 0; P(x, y, gl ? GOLD[3] : GOLD[2]); P(x + 1, y, GOLD[1]); if (i % 3 === 0) P(x, y - 1, GOLD[2]); }
        // the chest's shadow
        for (let y = 34; y < 40; y++) for (let x = 5; x < 35; x++) if (((x + 0.5 - 20) / 15) ** 2 + ((y + 0.5 - 37.6) / 2.4) ** 2 < 1) buf[y * N + x] = STONE[0];
        // the lid's angle: lid 0 shut .. 1 wide open (about 75 degrees)
        const th = lid * 1.3, cs = Math.cos(th), sn = Math.sin(th);
        const LW = (xl, y, zl) => [-7 + xl * cs - zl * sn, y, hb + xl * sn + zl * cs];
        const lit = (col, k) => blendI(col, hx('#ffb060'), k);
        // the hollow inside first (a dark maw: back walls, the floor heaped with gold), then the outside
        const mawCol = (v, gx, gy) => MAW[Math.max(0, Math.min(3, Math.floor(v * 3.2 + dth(gx, gy))))];
        face([-6, 6, hb], [-6, -6, hb], [-6, 6, 1], 20, (u, v, gx, gy) => mawCol(0.9 - v * 0.6, gx, gy), true);
        face([6, -6, hb], [-6, -6, hb], [6, -6, 1], 21, (u, v, gx, gy) => mawCol(0.8 - v * 0.6, gx, gy), true);
        face([-6, -6, 1.5], [6, -6, 1.5], [-6, 6, 1.5], 22, (u, v, gx, gy) => (gx * 3 + gy * 5 + Math.floor(t * 4)) % 11 === 0 ? GOLD[3] : (gx + gy) % 3 ? GOLD[1] : GOLD[2], true);
        // the walls' rim, and the outside: planks, iron bands, brass corners
        const plank = (u, v, sideK, front) => {
          const yv = v * hb;
          let col = (Math.floor(yv) % 3 === 2) ? WOOD[2 + sideK] : WOOD[sideK];
          if (Math.abs(u - 0.27) < 0.045 || Math.abs(u - 0.73) < 0.045) col = Math.abs(u - 0.27) < 0.02 || Math.abs(u - 0.73) < 0.02 ? IRN[2] : IRN[1];
          if ((u < 0.08 || u > 0.92) && (yv < 2 || yv > hb - 2)) col = BR[2 - sideK];
          if (yv >= hb - 1) col = IRN[sideK];
          if (front && Math.abs(u - 0.5) < 0.09 && yv < 3.5) col = yv > 1 && yv < 2.6 && Math.abs(u - 0.5) < 0.03 ? MAW[0] : BR[2 - sideK];
          return col;
        };
        face([7, 7, hb], [-7, 7, hb], [7, 7, 0], 1, (u, v) => plank(u, v, 0, false), true);
        face([7, 7, hb], [7, -7, hb], [7, 7, 0], 2, (u, v) => plank(u, v, 1, true), true);
        face([-7, -7, hb], [7, -7, hb], [-7, 7, hb], 3, (u, v) => { const X = -7 + u * 14, Y = -7 + v * 14; if (X > -6 && X < 6 && Y > -6 && Y < 6) return undefined; return WOOD[0]; }, true);
        // the lid: its outside, and (once it gapes) its dark red roof lined with teeth
        face(LW(14, 7, hl), LW(0, 7, hl), LW(14, -7, hl), 4, (u, v) => { const yy = v * 14; return Math.abs(yy - 3.5) < 0.8 || Math.abs(yy - 10.5) < 0.8 ? IRN[1] : (Math.floor(u * 14) % 3 === 0 ? WOOD[2] : WOOD[1]); }, true);
        face(LW(14, 7, 0), LW(0, 7, 0), LW(14, 7, hl), 5, (u, v) => { const zl = v * hl, xl = (1 - u) * 14; return Math.abs(xl - 3.5) < 0.8 || Math.abs(xl - 10.5) < 0.8 ? IRN[1] : zl < 1 ? IRN[0] : Math.floor(zl) % 3 === 1 ? WOOD[2] : WOOD[1]; }, true);
        face(LW(14, 7, 0), LW(14, -7, 0), LW(14, 7, hl), 6, (u, v) => { const yy = u * 14, zl = v * hl; if (Math.abs(yy - 7) < 1.2) return zl < 1.5 ? BR[1] : BR[2]; return Math.abs(yy - 3.5) < 0.8 || Math.abs(yy - 10.5) < 0.8 ? IRN[2] : zl < 1 ? IRN[1] : WOOD[1]; }, true);
        face(LW(14, -7, 0), LW(14, 7, 0), LW(0, -7, 0), 7, (u, v) => { const xl = (1 - v) * 14; return xl > 12.8 ? MAW[3] : MAW[(Math.floor(xl / 2.5) + Math.floor(u * 7)) % 2 + 1]; }, true);
        const lidF = new Set([4, 5, 6]), maw = (x, y) => { if (x < 0 || y < 0 || x >= N || y >= N) return false; const f = fid[y * N + x]; return f === 7 || f >= 20; };
        const PM = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N && !lidF.has(fid[y * N + x])) P(x, y, col, 1); };
        // teeth: a lower row standing on the front rims, an upper row hanging from the lid's edge
        if (lid > 0.1) {
          for (let s = -5; s <= 5; s += 2) for (const [X, Y] of [[6.5, s], [s, 6.5]]) { const [ax, ay] = pr(X, Y, hb); PM(Math.floor(ax), Math.floor(ay) - 1, TEETH[1]); if (lid > 0.25) PM(Math.floor(ax), Math.floor(ay) - 2, TEETH[0]); }
          if (sn > 0.3) for (let s = -6; s <= 6; s += 2) { const [ex, ey] = pr(...LW(13.6, s, 0)), [fx2, fy2] = pr(...LW(13.6, s, -1.7)); line(ex, ey, fx2, fy2, TEETH[0]); }
        }
        // its eyes, glowing in the dark at the back of the mouth, following you
        if (lid > 0.12) {
          const [qx, qy] = pr(-3, -3, hb - 0.8), bl = blink(t);
          const lk = held ? Math.sign(Math.round(held.x - 20)) : inp.inside ? Math.max(-1, Math.min(1, Math.round((inp.x - 0.5) * 4))) : Math.round(Math.sin(t * 0.7));
          for (const s of [-1, 1]) {
            const ex = Math.round(qx + s * 3.5) - 1, ey = Math.round(qy) - 1, ok = (x, y) => maw(x, y);
            const happy = mood === 'happy' && t < moodUntil, sulk = mood === 'miss' && t < moodUntil;
            const EY = happy ? ['e.e.', 'eee.', '.e..'] : sulk ? ['....', 'eeee', '.ee.'] : bl ? ['....', 'eeee', '....'] : ['.ee.', 'eEEe', '.ee.'];
            EY.forEach((r, j) => { for (let i = 0; i < 4; i++) if (r[i] !== '.' && ok(ex + i, ey + j)) P(ex + i, ey + j, happy ? hx('#ff5a8a') : r[i] === 'E' ? hx('#fff4a0') : hx('#ff9a2a'), 1); });
            if (!bl && !happy && ok(ex + 1 + (lk > 0 ? 1 : 0), ey + 1)) P(ex + 1 + (lk > 0 ? 1 : 0), ey + 1, hx('#1a0804'), 1);
          }
          // the tongue: out over the front corner, lolling down the planks, wagging
          const [rx, ry] = pr(6.6, 6.6, hb), [mx, my] = pr(-1.5, -1.5, 2.5), wag = Math.round(Math.sin(t * (inp.inside ? 7 : 3)) * (lid > 0.5 ? 1 : 0.6));
          const tipY = Math.round(ry) + 3 + Math.round(lid * 4), X0 = Math.round(rx);
          const TC = i => i === -2 || i === 1 ? TONG[0] : i === -1 ? TONG[2] : TONG[1];
          for (let k = 0; k <= 8; k++) { const f = k / 8, x = Math.round(mx + (rx - mx) * f), y = Math.round(my + (ry - 1 - my) * f); for (let i = -2; i <= 1; i++) PM(x + i, y, TC(i)); }
          for (let y = Math.round(ry - 1); y <= tipY; y++) { const x = X0 + (y > ry + 2 ? wag : 0); for (let i = -2; i <= 1; i++) PM(x + i, y, y > ry + 1 && i === 0 ? TONG[0] : TC(i)); }
          PM(X0 + wag - 1, tipY + 1, TONG[0]); PM(X0 + wag, tipY + 1, TONG[0]);
          if ((t * 0.6) % 1 < 0.5) PM(X0 + wag, tipY + 2 + Math.floor((t * 1.2) % 1 * 3), hx('#c8f0ff'));
        }
        // its feet
        if (limbs === 'Feet') for (const fx of [14, 23]) { const k = fx < 20 ? 19 - fx : fx - 20, fy = ty + 14 - (k >> 1) + H; for (let x = fx; x < fx + 3; x++) { P(x, fy, WOOD[3], 1); if (x !== fx + 1 || hop === 0) P(x, fy + 1, WOOD[3], 1); } }
        if (pal !== 'None') { const was = buf.slice(); drawPal(t); for (let i = 0; i < N * N; i++) if (buf[i] !== was[i]) buf[i] = blendI(buf[i], hx('#4a2a1a'), 0.35); }
        // where its mouth is this frame (the maw, and the air just over the rim)
        mouthM.fill(0);
        if (lid > 0.25) for (let i = 0; i < N * N; i++) if (fid[i] === 7 || fid[i] >= 20) { mouthM[i] = 1; for (let k = 1; k < 4; k++) if (i - k * N >= 0) mouthM[i - k * N] = 1; }
        // a dark outline round the chest (and the gold it spits)
        const sk = kind.slice();
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (sk[i]) continue;
          if ((x > 0 && sk[i - 1]) || (x < N - 1 && sk[i + 1]) || (y > 0 && sk[i - N]) || (y < N - 1 && sk[i + N])) buf[i] = hx('#0a0608');
        }
        for (let i = loot.length - 1; i >= 0; i--) {
          const c0 = loot[i], u = t - c0.t0;
          if (u < 0) continue;
          if (u > 1.4) { loot.splice(i, 1); continue; }
          const x = Math.round(c0.x + c0.vx * u), y = Math.round(c0.y - 14 * u + 20 * u * u);
          P(x, y, Math.floor(u * 9) % 2 ? GOLD[2] : GOLD[3]); P(x + 1, y, GOLD[1]);
        }
        // the coins it spat, wherever you flicked them
        for (const k of coins) {
          const x = Math.round(k.x), y = Math.round(k.y), sp = k.rest ? 0 : Math.floor(t * 10 + k.x) % 4;
          const R = sp === 1 ? ['.a.', '.b.', '.a.'] : sp === 3 ? ['.a.', 'aba', '.a.'] : ['aaa', 'aba', 'aaa'];
          R.forEach((r, j) => { for (let i = 0; i < 3; i++) if (r[i] !== '.') P(x - 1 + i, y - 1 + j, r[i] === 'b' ? GOLD[3] : j === 2 ? GOLD[1] : GOLD[2], 1); });
          if (k === held || ((Math.floor(t * 3) + Math.round(k.x)) % 7 === 0)) P(x + 1, y - 2, hx('#fffbe0'), 1);
        }
      }

      // ===== Hologram: a projection of the cubeling, turning slowly on its projector before a striped sunset =====
      const HCS = [['#062a3a', '#0e5a78', '#1a8ab0', '#3ac4e4', '#8af0ff', '#e8ffff'], ['#06301a', '#0e6a34', '#1aa04c', '#3ae070', '#9affb4', '#eaffef'], ['#3a1a04', '#7a3a08', '#c06a10', '#f0a030', '#ffd890', '#fff6e0'], ['#3a0630', '#7a0e6a', '#b02aa0', '#e05ad8', '#ffa8f4', '#fff0fc']].map(a => a.map(hx));
      let HC = HCS[0], hcI = 0;
      const MAG = hx('#ff4ad8');
      let spinAt = 2.2, glitchy = false, rebuildAt = -9, spinPhi = 0, omega = 0, touchedAt = -99, grabX = null, overloadAt = -9;
      const texA = new Int32Array(14 * 24), texB = new Int32Array(14 * 24), featM = new Uint8Array(N * N);
      const vOff = (tall ? 2 : 0) - (slab ? 1 : 0);
      const SUN = ['#ffe866', '#ffc23e', '#ff9440', '#ff6450', '#ff3a7a', '#e02a9e'].map(hx), SKY = ['#07031a', '#0d0526', '#150834', '#210c44', '#341052'].map(hx), GRID = ['#4a0e5e', '#8a1c9a', '#d43ac8', '#ff86ea'].map(hx);
      function bgHolo(x, y, t) {
        const hz = 25;
        if (y < hz) {
          // a retro sun going down behind it, its lower half cut by bands that slide down
          const d = Math.hypot(x + 0.5 - 20, y + 0.5 - hz + 3);
          if (d < 17) {
            const k = (y + 0.5 - (hz - 20)) / 20, gap = k > 0.45 && (y + Math.floor(t * 1.5)) % 3 === 0;
            if (!gap) return SUN[Math.min(5, Math.floor(k * 6))];
          }
          const n = (((x + 57) * 73856093) ^ ((y + 31) * 19349663)) >>> 0;
          if (n % 41 === 0 && Math.sin(t * 2 + n) > -0.3) return n % 3 ? hx('#c8b8ff') : WHITE;
          return d < 19 ? SKY[4] : SKY[Math.min(4, Math.floor(y / hz * 4.6))];
        }
        // the grid floor, rushing toward us
        const dd = y + 0.5 - hz + 0.5, z0 = 8 / dd + t * 0.9, z1 = 8 / (dd + 1) + t * 0.9;
        const vx = (x + 0.5 - 20) / (dd * 0.6), vl = Math.abs(vx - Math.round(vx)) * dd * 0.6 < 0.5;
        if (Math.floor(z0) !== Math.floor(z1) || vl) return GRID[dd > 9 ? 3 : dd > 5 ? 2 : dd > 2 ? 1 : 0];
        return y === hz ? hx('#3a0c4a') : hx('#0c0320');
      }
      function hologram(t) {
        // a slow sway, a whole turn every so often (or when tapped), bobbing over its projector
        const bob = Math.sin(t * 1.5) > 0.3 ? 1 : 0;
        let phi;
        if (t - touchedAt < 6) phi = spinPhi;
        else {
          const sp = ease((t - spinAt) / 1.6);
          if (t - spinAt > 1.6 && t - spinAt > 7) spinAt = t + 0.1;
          phi = sp * Math.PI * 2 + Math.sin(t * 0.8) * 0.16;
        }
        ty = (tall ? 2 : slab ? 9 : 5) - bob; cyS = ty + 7 + H;
        kind.fill(0); fid.fill(0);
        const bg = new Int32Array(N * N);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) bg[y * N + x] = bgHolo(x, y, t);
        buf.fill(0);
        // the face, painted into two textures either side of the front corner
        texA.fill(0); texB.fill(0);
        const bl = blink(t);
        const Lt = (s, v, col) => { v += vOff; if (s >= 0 && s < 14 && v >= 0 && v < 24) texA[v * 14 + s] = col; }, Rt = (s, v, col) => { v += vOff; if (s >= 0 && s < 14 && v >= 0 && v < 24) texB[v * 14 + s] = col; };
        const bt = (s, v, col) => { Lt(s, v, col); Rt(s, v, col); };
        drawEyes(Lt, Rt, bt, bl, t);
        if (cheekStyle === 'Rosy') { Lt(8, 7, BLUSH); Lt(9, 7, BLUSH); Rt(8, 7, BLUSH); Rt(9, 7, BLUSH); }
        drawMouth(Lt, Rt, bt, t);
        drawStuck(Lt, Rt, bt);
        const cs = Math.cos(phi), sn = Math.sin(phi), rot = (X, Y, Z) => [X * cs - Y * sn, X * sn + Y * cs, Z];
        // four sides and the top: corners in the cube's own frame (the face sits across the corner at +7, +7)
        // (each side: the corner its u runs from, the corner it runs to, its texture, its outward normal)
        const SIDES = [[[7, 7], [-7, 7], texA, [0, 1]], [[7, 7], [7, -7], texB, [1, 0]], [[-7, -7], [7, -7], null, [0, -1]], [[-7, -7], [-7, 7], null, [-1, 0]]];
        featM.fill(0);
        const shadeSide = (tex, nx, ny) => (u, v, x, y) => {
          const s = Math.min(13, Math.floor(u * 14)), r = Math.min(23, Math.floor(v * H));
          const fc = tex ? tex[r * 14 + s] : 0;
          featM[y * N + x] = fc ? 1 : 0;
          if (fc) return lumI(fc) < 110 ? HC[0] : fc === BLUSH ? hx('#ff8ad8') : WHITE;
          const lv = 0.5 + 0.5 * (nx * -0.25 + ny * 0.97), band = Math.floor(t * 9) % 30 - 4;
          return HC[(lv > 0.7 ? 3 : lv > 0.35 ? 2 : 1) + (r === band || r === band + 1 ? 1 : 0)];
        };
        // back faces first (just their edges, faintly), then the front ones
        const order = SIDES.map(([a, b, tex, n0], i) => { const n = rot(n0[0], n0[1], 0); return { i, a, b, tex, front: n[0] + n[1] > 0.02, n }; });
        for (const back of [true, false]) for (const sd of order) {
          if (sd.front === back) continue;
          const p0 = rot(sd.a[0], sd.a[1], H), p1 = rot(sd.b[0], sd.b[1], H), p3 = rot(sd.a[0], sd.a[1], 0);
          face(p0, p1, p3, 1 + sd.i + (back ? 10 : 0), back ? (u, v, x, y) => (u < 0.08 || u > 0.92 || v < 0.06 || v > 0.94 ? HC[2] : undefined) : shadeSide(sd.tex, sd.n[0], sd.n[1]), false);
        }
        face(rot(-7, -7, H), rot(7, -7, H), rot(-7, 7, H), 5, (u, v, x, y) => { featM[y * N + x] = 0; return top === 'Snow' ? HC[5] : HC[4]; }, false);
        // whatever it wears on top, its limbs and its pal, all projected too
        const faces = buf.slice();
        if (top !== 'Snow') drawTop(t, ty);
        drawLimbs(t, ty, H, bob); if (pal !== 'None') drawPal(t);
        for (let i = 0; i < N * N; i++) if (buf[i] !== faces[i]) { fid[i] = 0; featM[i] = 0; }
        // compose: translucent cyan over the sunset, bright edges, rolling scanlines, a magenta fringe, and the light cone
        const tick = Math.floor(t * 6), tear = glitchy || (t % 4.3) < 0.2 || Math.abs(omega) > 8 || t - overloadAt < 0.6 ? (Math.floor(t * 9) * 7) % 30 + 4 : -9;
        const built = Math.min(1, (t - rebuildAt) / 0.7), edge = built < 1 ? Math.round(N - built * N) : -1;
        const out2 = new Int32Array(N * N);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x, sx = Math.max(0, Math.min(N - 1, x - (y === tear || y === tear + 1 ? 2 : y === tear + 2 ? -1 : 0))), j = y * N + sx;
          let o = bg[i];
          // the light cone from the projector up to the cube
          if (y > ty + 12 && y < 37 && Math.abs(x + 0.5 - 20) < 3 + (37 - y) * 0.55 && (x + y + tick) % 2 === 0 && !buf[j]) o = blendI(o, HC[4], 0.3);
          const v = buf[j];
          if (v && !(edge >= 0 && y < edge)) {
            const scan = (y + tick) % 3 === 0;
            const lq = lumI(v) / 255, col0 = fid[j] ? v : HC[lq > 0.8 ? 4 : lq > 0.55 ? 3 : lq > 0.3 ? 2 : 1];
            let col = col0;
            if (featM[j]) o = v;
            else {
              o = blendI(o, HC[0], 0.55);
              if (fid[j] && fid[j] < 10) {
                let ed = false;
                for (const q of [j - 1, j + 1, j - N, j + N]) if (q < 0 || q >= N * N || (fid[q] !== fid[j] && !featM[q])) ed = true;
                if (ed) col = HC[5];
              }
              o = blendI(o, col, col === HC[5] ? 1 : fid[j] >= 10 ? 0.4 : (y + tick) % 2 ? 0.28 : 0.72);
            }
          } else if (sx > 0 && buf[j - 1] && !buf[j]) o = blendI(o, MAG, glitchy ? 0.8 : 0.45);
          if (y === edge) o = HC[5];
          out2[i] = o;
        }
        // the projector itself
        for (let y = 35; y < 40; y++) for (let x = 10; x < 30; x++) { const d = ((x + 0.5 - 20) / 8) ** 2 + ((y + 0.5 - 37.5) / 2) ** 2; if (d <= 1) out2[y * N + x] = d > 0.62 ? hx('#3a3a52') : d > 0.4 ? ((x + tick) % 4 ? HC[3] : HC[5]) : hx('#14142a'); }
        buf.set(out2);
      }

      // ---------- the pointer, and painting ----------
      let lastTap = -9, pdown = false, pT = 0, pgx = 0, pgy = 0, held = null, pressAt = -9, pressX = 0, pressY = 0, moved = 0;
      const tapSound = () => { if (lastTap < 0 || true) { voice(climb % 8); climb++; } };
      function feelL(t) {
        const dt = Math.min(0.1, Math.max(0.001, t - pT)); pT = t;
        const gx = (inp.x * S - off) / cell, gy = (inp.y * S - off) / cell, ix = Math.floor(gx), iy = Math.floor(gy);
        const down = inp.inside && inp.down, pressed = down && !pdown, released = !down && pdown;
        const vx = (gx - pgx) / dt, vy = (gy - pgy) / dt;
        if (pressed) { pressAt = t; pressX = gx; pressY = gy; moved = 0; }
        if (down) moved = Math.max(moved, Math.hypot(gx - pressX, gy - pressY));
        const taps = inp.taps().map(p => [(p.x * S - off) / cell, (p.y * S - off) / cell]);
        const over = inp.inside && ix >= 0 && iy >= 0 && ix < N && iy < N && kind[iy * N + ix] > 0;
        if (legend === 'Aquarium') feelAq(t, dt, gx, gy, down, taps, over, released);
        if (legend === 'Mimic') feelMim(t, dt, gx, gy, down, pressed, released, taps, vx, vy);
        if (legend === 'Hologram') feelHolo(t, dt, gx, gy, down, pressed, released, over);
        pdown = down; pgx = gx; pgy = gy;
      }
      // ---- Aquarium: tap the water to drop food and the goldfish comes to eat it (every fifth flake, a golden
      // somersault); knock on the glass and it darts away; press and drag on the glass and it follows your finger
      function feelAq(t, dt, gx, gy, down, taps, over, released) {
        const h = H, colTop = x => ty + 14 - (Math.abs(Math.floor(x) + 0.5 - 20) - 0.5 >> 1);
        // (a knock is a quick tap on the glass, so a press that drags is a finger, not a knock)
        // (a tap is a short, still press: the gallery reports every press as a tap, drags included)
        const quick = released && t - pressAt < 0.3 && moved < 1 ? [[pressX, pressY, true]] : [];
        for (const [tx, tyy, isKnock] of quick) {
          const x = Math.floor(tx), y = Math.floor(tyy);
          if (x < 6 || x > 33 || y < 0 || y >= N) continue;
          const u = Math.max(-12, Math.min(12, x - 20));
          if (y < colTop(x)) {
            // food: three flakes scattered where you tapped
            for (let k = 0; k < 3; k++) food.push({ u: Math.max(-13, Math.min(12, u + k - 1)), t0: t + k * 0.12, c: k % 2 });
            while (food.length > 9) food.shift();
            c.sound.note(scale(7) + 12, { dur: 0.08, vel: 0.08, wave: 'sine' }); c.sound.note(scale(9) + 12, { dur: 0.08, vel: 0.06, wave: 'sine', at: 0.12 });
          } else if (isKnock && y < colTop(x) + h) {
            // a knock on the glass: it darts off to the far side
            fleeUntil = t + 1.1; fleeTo = u > fishU ? -11 : 11; dartAt = t;
            if (tankBub.length < 12) for (let k = 0; k < 3; k++) tankBub.push({ u: u + (k % 2), v: y - colTop(x) + 1, t0: t + k * 0.08 });
            c.sound.hit('click', 0.35); c.sound.note(scale(2) - 12, { dur: 0.1, vel: 0.12, wave: 'triangle', cutoff: 900 });
          }
        }
        finger = null;
        if (down && gx >= 6 && gx < 34) { const ct = colTop(gx); if (gy >= ct && gy < ct + h) finger = { u: Math.floor(gx) - 20, bv: gy - ct }; }
        // where it wants to be: away from a knock, at your finger, at the nearest food, or idling
        const live = food.filter(f => t >= f.t0);
        let goalU = Math.sin(t * 0.33) * 9, goalV = Math.sin(t * 1.1) * 1.2, fast = false;
        if (t < fleeUntil) { goalU = fleeTo; fast = true; }
        else if (finger) { goalU = finger.u - 6 * Math.sign(finger.u - fishU || 1); goalV = finger.bv - (h - 10) - 4; fast = true; }
        else if (live.length) {
          let best = live[0], bd = 1e9;
          for (const f of live) { const d = Math.abs(f.u - fishU); if (d < bd) { bd = d; best = f; } }
          const fbv = Math.min(h - 4, 1 + (t - best.t0) * 1.7);
          goalU = best.u - 6 * Math.sign(best.u - fishU || 1); goalV = fbv - (h - 10) - 4; fast = true;
        }
        const stp = Math.max(-0.45, Math.min(0.45, (goalU - fishU) * (fast ? 0.16 : 0.07)));
        if (Math.abs(stp) > 0.02) fishDir = stp > 0 ? 1 : -1;
        fishU = Math.max(-12, Math.min(12, fishU + stp));
        fishV = Math.max(-2.5, Math.min(2, fishV + Math.max(-0.25, Math.min(0.25, (goalV - fishV) * 0.12))));
        // a gulp when its mouth reaches a flake
        const mu = fishU + 6 * fishDir, mv = h - 10 + fishV + 4;
        for (let i = food.length - 1; i >= 0; i--) {
          const f = food[i]; if (t < f.t0) continue;
          const fbv = Math.min(h - 4, 1 + (t - f.t0) * 1.7);
          if (Math.abs(mu - f.u) <= 1.6 && Math.abs(mv - fbv) <= 1.6) {
            food.splice(i, 1); eaten++;
            if (tankBub.length < 12) tankBub.push({ u: Math.round(mu), v: Math.round(mv), t0: t });
            c.sound.hit('blip', 0.12, { freq: 620 });
            if (eaten % 5 === 0) { flipAt = t; hearts.push({ u: Math.round(fishU), bv: h - 10 + Math.round(fishV), t0: t + 0.4 }); [0, 2, 4, 7, 9, 12].forEach((k, j) => c.sound.note(scale(k) + 12, { dur: 0.12, vel: 0.08, wave: 'sine', at: j * 0.07 })); }
          }
        }
        lookX = finger ? (finger.u) / 6 : live.length ? (live[0].u) / 6 : inp.inside ? (gx - 20) / 6 : Math.sin(t * 0.5) * 0.5 + Math.sin(t * 0.21) * 0.6;
        lookY = finger ? 1 : live.length ? 1 : inp.inside ? (gy - 18) / 6 : Math.sin(t * 0.37) * 0.8;
        glowK = 0.92 + 0.08 * Math.sin(t * 0.9) + (over ? 0.1 : 0) + (t - flipAt < 1 ? 0.15 : 0);
      }
      // ---- Mimic: it snaps at a finger left over its mouth (keep holding and it chews, let go and it spits a coin);
      // tap its planks and it coughs up a coin; grab a coin and flick it, and a coin thrown back into its mouth is
      // caught, to its delight
      function feelMim(t, dt, gx, gy, down, pressed, released, taps, vx, vy) {
        const ix = Math.floor(gx), iy = Math.floor(gy), inMouth = inp.inside && ix >= 0 && iy >= 0 && ix < N && iy < N && mouthM[iy * N + ix];
        const onChest = inp.inside && ix >= 0 && iy >= 0 && ix < N && iy < N && kind[iy * N + ix] && !inMouth;
        const spit = (vx0, vy0) => { const [mx, my] = pr(0, 0, H - 4); coins.push({ x: mx, y: my - 2, vx: vx0, vy: vy0, rest: false, flicked: false }); while (coins.length > 10) coins.shift(); c.sound.note(scale(9) + 12, { dur: 0.15, vel: 0.08, wave: 'triangle' }); c.sound.note(scale(11) + 12, { dur: 0.2, vel: 0.06, wave: 'triangle', at: 0.08 }); };
        // grab a coin
        if (pressed && !held) { let best = null, bd = 2.2; for (const k of coins) { const d = Math.hypot(k.x + 0.5 - gx, k.y + 0.5 - gy); if (d < bd) { bd = d; best = k; } } if (best) { held = best; best.rest = false; c.sound.hit('click', 0.15); } }
        if (held) {
          if (down) { held.x = gx - 0.5; held.y = gy - 0.5; held.vx = vx; held.vy = vy; }
          else { held.vx = Math.max(-60, Math.min(60, held.vx)); held.vy = Math.max(-60, Math.min(60, held.vy)); held.flicked = true; held = null; c.sound.note(scale(4) + 12, { dur: 0.06, vel: 0.06, wave: 'sine' }); }
        }
        // a finger lingering over its mouth gets bitten
        if (inMouth && !held && t - chompAt > 1.5) linger += dt; else if (!caught) linger = Math.max(0, linger - dt * 2);
        if (linger > 0.45 && !caught) {
          chompAt = t; linger = 0; c.sound.hit('kick', 0.22); c.sound.hit('click', 0.3, { at: 0.02 });
          if (down) { caught = true; c.sound.note(scale(0) - 24, { dur: 0.4, vel: 0.1, wave: 'triangle', cutoff: 500, at: 0.1 }); }
        }
        if (caught && !down) { caught = false; chompAt = t - 0.5; spit((coins.length % 2 ? -1 : 1) * (10 + Math.abs(Math.sin(t * 7)) * 5), -22); }
        if (!caught && t - chompAt > 0.12 && t - chompAt < 0.2 && !inMouth && inp.inside && mood !== 'happy') { mood = 'miss'; moodUntil = t + 1; }
        // tap its planks: it coughs up a coin
        const quick = released && t - pressAt < 0.3 && moved < 1 && !caught ? [[pressX, pressY]] : [];
        for (const [tx, tyy] of quick) { const x = Math.floor(tx), y = Math.floor(tyy); if (x >= 0 && y >= 0 && x < N && y < N && kind[y * N + x] && !mouthM[y * N + x] && !held && t - chompAt > 0.6) { chompAt = t - 0.35; spit((x < 20 ? -1 : 1) * (9 + Math.abs(Math.sin(t * 13)) * 6), -22); } }
        // coins fly, bounce and settle on the flagstones; one that lands in its open mouth is eaten
        for (let i = coins.length - 1; i >= 0; i--) {
          const k = coins[i]; if (k === held || k.rest) continue;
          k.vy += 46 * dt; k.x += k.vx * dt; k.y += k.vy * dt;
          if (k.x < 0) { k.x = 0; k.vx = -k.vx * 0.5; } if (k.x > N - 2) { k.x = N - 2; k.vx = -k.vx * 0.5; }
          if (k.y > 37) { k.y = 37; if (Math.abs(k.vy) > 6) { k.vy = -k.vy * 0.45; k.vx *= 0.7; c.sound.note(scale(12) + 12, { dur: 0.05, vel: 0.05, wave: 'triangle' }); } else { k.vy = 0; k.vx = 0; k.rest = true; } }
          const cx2 = Math.floor(k.x + 0.5), cy2 = Math.floor(k.y + 0.5);
          if (k.flicked && k.vy > 0 && cx2 >= 0 && cy2 >= 0 && cx2 < N && cy2 < N && mouthM[cy2 * N + cx2]) { coins.splice(i, 1); chompAt = t; mood = 'happy'; moodUntil = t + 1.4; eatAt = t; c.sound.hit('kick', 0.2); [4, 7, 9, 12].forEach((n, j) => c.sound.note(scale(n) + 12, { dur: 0.15, vel: 0.08, wave: 'triangle', at: 0.15 + j * 0.08 })); }
        }
        // lean toward a finger; the lid: shut on a bite, chewing a caught finger, gaping at one close by, else breathing
        lean += ((inp.inside && !held ? Math.max(-1.5, Math.min(1.5, (gx - 20) / 8)) : 0) - lean) * 0.15;
        const ch = t - chompAt, near = inp.inside && Math.hypot(gx - 20, gy - (ty + 12)) < 14;
        let want;
        if (caught) want = 0.05 + 0.08 * Math.abs(Math.sin(t * 9));
        else if (ch >= 0 && ch < 0.12) want = 0;
        else if (ch >= 0 && ch < 0.6) want = 0.1;
        else if (near || held) want = 0.95;
        else {
          // left alone, it yawns now and then and bites down on nothing, spitting a little gold
          if (t >= lastYawn + 2.6 && t - chompAt > 1) { lastYawn = t + 4; for (let k = 0; k < 4; k++) loot.push({ x: 18 + (k % 3), y: ty + 12, vx: (k - 1.5) * 6, t0: t + 0.18 + k * 0.05 }); want = 0.02; chompAt = t; }
          else want = t > lastYawn + 1.6 ? 0.88 : 0.68 + 0.06 * Math.sin(t * 1.3);
        }
        if (near && !wasOver) { c.sound.note(scale(0) - 24, { dur: 0.5, vel: 0.08, wave: 'triangle', cutoff: 400, attack: 0.1 }); }
        wasOver = near;
        lid += (want - lid) * (want < lid - 0.3 ? 0.6 : 0.2);
      }
      // ---- Hologram: grab it and drag sideways to spin it; let go and it keeps spinning, then turns back to face you;
      // spin it hard enough and the projection overloads and rebuilds itself; a tap changes the colour it's projected in
      function feelHolo(t, dt, gx, gy, down, pressed, released, over) {
        const was = glitchy;
        glitchy = over && !down;
        if (glitchy && !was) c.sound.note(scale(9) + 12, { dur: 0.05, vel: 0.06, wave: 'square', cutoff: 3000 });
        if (pressed && inp.inside) { if (t - touchedAt >= 6) spinPhi = 0; grabX = gx; touchedAt = t; }
        if (down && grabX !== null) {
          const d = (gx - grabX) * 0.16; spinPhi += d; omega = omega * 0.5 + (d / dt) * 0.5; grabX = gx; touchedAt = t;
          if (Math.abs(d) > 0.3 && Math.floor(spinPhi / (Math.PI / 2)) !== Math.floor((spinPhi - d) / (Math.PI / 2))) c.sound.note(scale(5) + 12, { dur: 0.04, vel: 0.05, wave: 'square', cutoff: 2600 });
        } else {
          if (released) {
            touchedAt = t;
            if (t - pressAt < 0.3 && moved < 1) { hcI = (hcI + 1) % HCS.length; HC = HCS[hcI]; rebuildAt = t; [0, 4, 7, 12].forEach((k, i) => c.sound.note(scale(k + hcI) + 12, { dur: 0.07, vel: 0.07, wave: 'square', cutoff: 2600, at: i * 0.06 })); omega = 0; }
          }
          grabX = null;
          if (t - touchedAt < 6) {
            spinPhi += omega * dt; omega *= Math.pow(0.35, dt);
            if (Math.abs(omega) > 16 && t - overloadAt > 1.2) { overloadAt = t; rebuildAt = t + 0.3; omega *= 0.3; [12, 9, 7, 4, 0].forEach((k, i) => c.sound.note(scale(k) + 12, { dur: 0.06, vel: 0.08, wave: 'sawtooth', cutoff: 2000, at: i * 0.05 })); }
            if (Math.abs(omega) < 0.6) { const home = Math.round(spinPhi / (Math.PI * 2)) * Math.PI * 2; spinPhi += (home - spinPhi) * 0.08; omega = 0; }
          }
        }
      }
      let sigL = -1;
      const outside = (gx, gy, t) => legend === 'Aquarium' ? bgAq(gx, gy, t) : legend === 'Mimic' ? bgMim(gx, gy, t) : bgHolo(gx, gy, t);
      function renderL(t) {
        feelL(t);
        if (legend === 'Aquarium') aquarium(t); else if (legend === 'Mimic') mimic(t); else hologram(t);
        let sig = 0;
        for (let i = 0; i < buf.length; i++) sig = (Math.imul(sig, 31) + buf[i]) | 0;
        if (sig === sigL) return;
        sigL = sig;
        // paint a cell band's first pixel row, then copy it down the band
        const g0 = Math.floor(-off / cell), g1 = Math.floor((S - 1 - off) / cell);
        for (let gy = g0; gy <= g1; gy++) {
          const p0 = Math.max(0, off + gy * cell), p1 = Math.min(S, off + (gy + 1) * cell);
          if (p0 >= p1) continue;
          const row = p0 * S, inY = gy >= 0 && gy < N;
          for (let gx = g0; gx <= g1; gx++) {
            const col = inY && gx >= 0 && gx < N ? buf[gy * N + gx] : outside(gx, gy, t);
            out.fill(col, row + Math.max(0, off + gx * cell), row + Math.min(S, off + (gx + 1) * cell));
          }
          for (let py = p0 + 1; py < p1; py++) out.copyWithin(py * S, row, row + S);
        }
        c.ctx.putImageData(img, 0, 0);
      }
      renderL(0);
      return t => renderL(t);
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
