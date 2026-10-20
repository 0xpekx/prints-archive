// Item Shop: from D:/code/synaesthesia/public/drop03/pieces/105.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Item Shop: the keeper of a little RPG shop, drawn as a three-quarter-view sprite behind the counter.
Proto.add({
  num: 105,
  name: 'Item Shop',
  fam: 'Pixel Portraits II',
  recipe: 'A shopkeeper from an old role-playing game, drawn 40 dots across as a big-headed sprite seen from a little above, leaning on the counter with the wares in front and the shop behind. Keeper (human, dwarf, elf, mole, cyclops, lizardfolk, rabbitfolk, golem, a rare skeleton or ghost, a rarer hungry treasure chest), skin, hair or hat, expression, facial hair, shirt, apron, wares, shop, wall decor, a pet on the counter, a counter extra, how the wares are laid out and the light of the hour vary. It bobs in a two-step idle and blinks.',
  interactive: 'Tap the wares to buy one. Tap the keeper to say hello.',
  music: true,
  make(c) {
    const S = c.size, g2 = c.ctx;
    // LCG (Numerical Recipes constants), seeded by folding the hash, tempered on the way out
    let seed = 0;
    for (let i = 2; i < c.hash.length; i += 6) seed = (Math.imul(seed, 31) + parseInt(c.hash.slice(i, i + 6), 16)) >>> 0;
    function lcg() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      let z = seed ^ (seed >>> 15);
      z = Math.imul(z, 0x2c1b3c6d) >>> 0; // temper
      return ((z ^ (z >>> 12)) >>> 0) / 4294967296;
    }
    for (let i = 0; i < 6; i++) lcg(); // warm up
    function grab(list) {
      let tot = 0;
      for (let w = 1; w < list.length; w += 2) tot += list[w];
      let r = lcg() * tot;
      for (let w = 0; w < list.length; w += 2) { r -= list[w + 1]; if (r < 0) return list[w]; }
      return list[0];
    }

    let keeper = grab(['Human', 34, 'Dwarf', 22, 'Elf', 16, 'Mole', 13, 'Cyclops', 9, 'Mimic', 6]);
    let skin = grab(['Fair', 18, 'Light', 18, 'Medium', 18, 'Tan', 16, 'Brown', 16, 'Deep', 14]);
    if (keeper === 'Mole') skin = 'Velvet Fur';
    if (keeper === 'Cyclops') skin = grab(['Moss Green', 50, 'Sky Blue', 30, 'Lilac', 20]);
    if (keeper === 'Mimic') skin = 'Oak Chest';
    let top = grab(['Short Crop', 22, 'Bun', 14, 'Bald', 10, 'Long Hair', 14, 'Feathered Cap', 14, 'Bandana', 14, 'Hood', 12]);
    if (keeper === 'Mimic') top = 'None';
    let apron = grab(['Leather', 28, 'Forest', 20, 'Crimson', 18, 'Navy', 16, 'Plum', 12, 'Gold Trim', 6]);
    let wares = grab(['Potions', 28, 'Blades', 18, 'Fruit', 16, 'Gems', 12, 'Scrolls', 14, 'Bread', 12]);
    let shop = grab(['Potion Shelves', 28, 'Weapon Rack', 20, 'Map Wall', 16, 'Hearth', 18, 'Book Stacks', 18]);
    let extra = grab(['None', 30, 'Coin Pile', 22, 'Shop Bell', 18, 'Ledger', 14, 'Spectacles', 10, 'Candle', 6]);

    // newer traits: a Jenkins small-fast generator on the hash's second half, so the rolls above keep their values
    let ja = 0xf1ea5eed, jb = parseInt(c.hash.slice(34, 42), 16) >>> 0, jc = parseInt(c.hash.slice(42, 50), 16) >>> 0, jd = parseInt(c.hash.slice(50, 58), 16) >>> 0;
    const rot = (v, k) => (v << k) | (v >>> (32 - k));
    function jsf() {
      const e = (ja - rot(jb, 27)) | 0; // jsf32 step
      ja = jb ^ rot(jc, 17); jb = (jc + jd) | 0; jc = (jd + e) | 0; jd = (e + ja) | 0; // shuffle the four words
      return (jd >>> 0) / 4294967296; // the shop's second stream
    }
    for (let i = 0; i < 8; i++) jsf();
    const draw2 = list => { let tot = 0; for (let w = 1; w < list.length; w += 2) tot += list[w]; let r = jsf() * tot; for (let w = 0; w < list.length; w += 2) { r -= list[w + 1]; if (r < 0) return list[w]; } return list[0]; };
    // a chance to swap an old value for a newer one; always two draws so the stream stays in step
    const fresh = (cur, p, list) => { const a = jsf(), b = draw2(list); return a < p ? b : cur; };
    const newKeeper = fresh(keeper, 0.24, ['Lizardfolk', 30, 'Rabbitfolk', 30, 'Golem', 16, 'Skeleton', 13, 'Ghost', 11]);
    const altSkin = { Lizardfolk: draw2(['Jade Scales', 45, 'Teal Scales', 30, 'Sand Scales', 25]), Rabbitfolk: draw2(['Cream Fur', 40, 'Cocoa Fur', 34, 'Grey Fur', 26]), Golem: 'Granite', Skeleton: 'Bone', Ghost: 'Ectoplasm' };
    if (keeper !== 'Mimic' && newKeeper !== keeper) { keeper = newKeeper; skin = altSkin[keeper]; }
    let face = draw2(['Smile', 30, 'Grin', 15, 'Beaming', 13, 'Smirk', 12, 'Sleepy', 10, 'Wink', 9, 'Stern', 8, 'Starstruck', 3]);
    let whiskers = draw2(['None', 52, 'Mustache', 14, 'Curled Mustache', 10, 'Goatee', 9, 'Stubble', 8, 'Sideburns', 7]);
    const shirt = draw2(['Linen', 30, 'Sky', 20, 'Mustard', 16, 'Rose', 14, 'Striped', 12, 'Chainmail', 8]);
    let pet = draw2(['None', 46, 'Parrot', 12, 'Jelly Cube', 11, 'Hedgehog', 9, 'Fairy', 9, 'Snail', 8, 'Tiny Dragon', 5]);
    const decor = draw2(['None', 34, 'Window', 16, 'Wall Clock', 12, 'Hanging Herbs', 12, 'Mounted Shield', 10, 'Wanted Poster', 10, 'Hanging Lamp', 6]);
    let hour = draw2(['Daylight', 46, 'Lamplit', 24, 'Golden Hour', 16, 'Moonlit', 14]);
    const decorSide = jsf() < 0.5 ? 0 : 1;
    top = keeper === 'Mimic' ? 'None' : fresh(top, 0.26, ['Witch Hat', 24, 'Chef Hat', 22, 'Tricorn', 20, 'Flower Wreath', 18, 'Horned Helm', 16]);
    apron = fresh(apron, 0.2, ['Teal', 40, 'Checkered', 34, 'Patched', 26]);
    wares = fresh(wares, 0.28, ['Mushrooms', 28, 'Rings', 26, 'Fish', 24, 'Eggs', 22]);
    shop = fresh(shop, 0.3, ['Crystal Grotto', 22, 'Herbalist', 28, 'Tailor', 26, 'Armory', 24]);
    extra = fresh(extra, 0.24, ['Crystal Ball', 30, 'Scales', 26, 'Hourglass', 24, 'Cash Box', 20]);
    const bare = keeper === 'Human' || keeper === 'Elf' || keeper === 'Cyclops';
    if (!bare) whiskers = 'None';
    if (keeper === 'Mimic') face = 'Hungry';
    // ---------- legendaries: a Lehmer stream keyed by an sdbm fold of the hash, apart from every roll above ----------
    let sd = 0;
    for (let i = 2; i < c.hash.length; i++) sd = (c.hash.charCodeAt(i) + (sd << 6) + (sd << 16) - sd) >>> 0;
    let leh = (sd % 2147483646) + 1;
    const lx = () => { leh = Number((BigInt(leh) * 16807n) % 2147483647n); return (leh - 1) / 2147483646; };
    for (let i = 0; i < 3; i++) lx();
    const lu = lx(), lp = lx(), lcv = lx();
    const legend = lu < 0.0022 ? (lp < 0.38 ? 'Dragon' : lp < 0.7 ? 'Slime King' : 'Starfolk') : 'None';
    if (legend === 'None' && lcv < 0.005) extra = 'Golden Egg';
    const cosmos = []; for (let i = 0; i < 40; i++) cosmos.push([lx(), lx(), lx() * 6.283]);
    // the counter, and what frames the shop: its own stream (a murmur-mixed counter over an FNV fold of the hash), so no roll above moves
    let cs = 0x2f6b9a13;
    for (let i = 2; i < c.hash.length; i++) cs = Math.imul(cs ^ c.hash.charCodeAt(i), 0x01000193) >>> 0;
    const crand = () => { cs = (cs + 0x9e3779b9) >>> 0; let z = cs; z = Math.imul(z ^ (z >>> 16), 0x85ebca6b); z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35); return ((z ^ (z >>> 16)) >>> 0) / 4294967296; };
    const pickC = list => { let tot = 0; for (let w = 1; w < list.length; w += 2) tot += list[w]; let r = crand() * tot; for (let w = 0; w < list.length; w += 2) { r -= list[w + 1]; if (r < 0) return list[w]; } return list[0]; };
    const counterKind = pickC(['Oak Panels', 28, 'Market Stall', 18, 'Stone Arch', 16, 'Crates', 14, 'Tree Stump', 12, 'Glass Case', 12]);
    const STALL = [[0xd83840, 0xf4ece0], [0x3c68c0, 0xf4ece0], [0x3c9050, 0xf0e4b0]][Math.floor(crand() * 3)];
    const WDY = legend !== 'None' ? [0, 0] : counterKind === 'Crates' ? [-1, -3] : [0, 0]; // how far the wares sit above or below the usual counter top, left and right
    // how the wares are laid out, and on which side (on the same stream, after the counter, so nothing above moves)
    const display = pickC(['Both Ends', 28, 'Heaped', 26, 'On a Stand', 22, 'Basket', 24]);
    const showSide = crand() < 0.5 ? 0 : 1;
    // fewer bare counters and fewer plain daylight shops: a share of each turned over to a pet or another hour (always two draws each)
    { const a = crand(), b = pickC(['Parrot', 12, 'Jelly Cube', 11, 'Hedgehog', 9, 'Fairy', 9, 'Snail', 8, 'Tiny Dragon', 5]); if (pet === 'None' && a < 0.35) pet = b; }
    { const a = crand(), b = pickC(['Lamplit', 12, 'Golden Hour', 22, 'Moonlit', 20]); if (hour === 'Daylight' && a < 0.35) hour = b; }
    if (legend !== 'None') {
      c.trait('Legendary', legend); c.trait('Wares', wares); c.trait('Shop', shop); c.trait('Decor', decor); c.trait('Pet', pet); c.trait('Extra', extra); c.trait('Light', hour); c.trait('Counter', counterKind); c.trait('Display', display);
      if (keeper === 'Mimic') keeper = 'Human';
      skin = { Dragon: 'Emerald Scales', 'Slime King': 'Royal Jelly', Starfolk: 'Night Sky' }[legend];
    } else {
    c.trait('Keeper', keeper); c.trait('Skin', skin); c.trait('Top', top); c.trait('Expression', face); c.trait('Facial Hair', whiskers);
    c.trait('Shirt', shirt); c.trait('Apron', apron); c.trait('Wares', wares); c.trait('Shop', shop); c.trait('Decor', decor);
    c.trait('Pet', pet); c.trait('Extra', extra); c.trait('Light', hour); c.trait('Counter', counterKind); c.trait('Display', display);
    }

    const LINE = 0x24141c;
    const SKIN = {
      Fair: [0xffe0cc, 0xf4b89c, 0xc8806c], Light: [0xffd4a8, 0xe8a878, 0xb87050], Medium: [0xe8c08c, 0xc89860, 0x946838],
      Tan: [0xd8a070, 0xb07848, 0x7c5030], Brown: [0xa87048, 0x84502c, 0x5a341c], Deep: [0x7c4c30, 0x5c3420, 0x3c2014],
      'Velvet Fur': [0x8c7c88, 0x5c4c5c, 0x3c3040], 'Moss Green': [0xb8e090, 0x80b860, 0x4c8040], 'Sky Blue': [0xb0d8f8, 0x78a8e0, 0x4870b0],
      Lilac: [0xe0c8f8, 0xb898e0, 0x8068b0], 'Oak Chest': [0xd8a058, 0xa86c30, 0x704018],
      'Jade Scales': [0x9cd890, 0x5ca868, 0x2e7048], 'Teal Scales': [0x88d8d0, 0x48a8a4, 0x247070], 'Sand Scales': [0xe8d098, 0xc0a060, 0x8a6c38],
      'Cream Fur': [0xfff4e4, 0xe8d4bc, 0xb8a08c], 'Cocoa Fur': [0xb88c68, 0x8c6444, 0x5c4030], 'Grey Fur': [0xd8d8e0, 0xa8a8b4, 0x707080],
      Granite: [0xb4b0a8, 0x88847c, 0x5c5850], Bone: [0xfaf4e2, 0xdcd2b8, 0xa89c80], Ectoplasm: [0xe0fcff, 0xa8e4f0, 0x70b0c8],
      'Emerald Scales': [0x88e0a0, 0x40a868, 0x1e6644], 'Royal Jelly': [0xa8f8d8, 0x58d0a8, 0x2c9078], 'Night Sky': [0x6a5ad8, 0x3c3090, 0x241a5c],
    }[skin];
    const HAIR = [[0x5c3c24, 0x3c2414], [0xe8c060, 0xb08830], [0x2c2430, 0x18141c], [0xc05830, 0x803018], [0xe8e8f0, 0xa8a8b8], [0x7848a0, 0x4c2870]][Math.floor(lcg() * 6)];
    const APRON = {
      Leather: [0xb88050, 0x8c5830, 0x603818], Forest: [0x60a860, 0x3c7840, 0x24502c], Crimson: [0xe05050, 0xa83038, 0x701c28],
      Navy: [0x5878c8, 0x3c5098, 0x283468], Plum: [0xb070c0, 0x804890, 0x542c64], 'Gold Trim': [0x404050, 0x2c2c38, 0x1c1c24],
      Teal: [0x50b8b0, 0x30888c, 0x1c5c60], Checkered: [0xe8e0d0, 0xc04040, 0x803030], Patched: [0x9c8c70, 0x786850, 0x4c4434],
    }[apron];
    const SHIRT0 = [[0xf0ece0, 0xc8c0b0], [0xa8c8e8, 0x7898c0], [0xe8d090, 0xc0a060], [0xd0a0a0, 0xa07070]][Math.floor(lcg() * 4)];
    const SHIRT = { Linen: SHIRT0, Sky: [0xa8c8e8, 0x7898c0], Mustard: [0xe8c060, 0xb89038], Rose: [0xe8a8b4, 0xb87884], Striped: [0xf0ece0, 0x4868b0], Chainmail: [0xb8bcc8, 0x7c8090] }[shirt];
    const WALL = [0x8c6440, 0x704c30, 0x583820];
    const blinkGap = 2.6 + lcg() * 2.5, blinkOff = lcg() * 3, bobPh = lcg() * 6.28;
    const shelfItems = [];
    for (let i = 0; i < 9; i++) shelfItems.push([Math.floor(lcg() * 5), lcg()]);
    const coinCount = 4 + Math.floor(lcg() * 4);
    // a lighter tone of the hair, for the shine across the crown
    const lift = (col, k) => { const r = col >> 16 & 255, gg = col >> 8 & 255, b = col & 255; return (Math.round(r + (255 - r) * k) << 16) | (Math.round(gg + (255 - gg) * k) << 8) | Math.round(b + (255 - b) * k); };
    // the shine on hair: the hair colour pulled toward a warm lamp tone
    const warm = (cc, k) => (Math.round((cc >> 16 & 255) + (0xf4 - (cc >> 16 & 255)) * k) << 16) | (Math.round((cc >> 8 & 255) + (0xd0 - (cc >> 8 & 255)) * k) << 8) | Math.round((cc & 255) + (0x98 - (cc & 255)) * k);
    const HAIRLT = warm(HAIR[0], 0.38);
    const sink = (cc, k) => (Math.round((cc >> 16 & 255) * k) << 16) | (Math.round((cc >> 8 & 255) * k) << 8) | Math.round((cc & 255) * k);
    // on the darkest skins the features keep a light edge of their own: light brows, a lip highlight
    // under the mouth line, and an open mouth that shows teeth (never a pink-red ring)
    const darkSkin = skin === 'Brown' || skin === 'Deep';
    const LIPLT = lift(SKIN[1], 0.34), BROWLT = lift(SKIN[0], 0.3);

    // the shop's tunes: a separate counter-hash stream over the hash text, so the draws above never move
    let tick = 0;
    const tr = () => { let h = 0x2545f491 ^ tick++; for (let i = 2; i < c.hash.length; i += 4) h = Math.imul(h ^ parseInt(c.hash.slice(i, i + 4), 16), 0x5bd1e995) ^ (h >>> 13); return ((h ^ h >>> 15) >>> 0) / 4294967296; };
    const key = 60 + Math.floor(tr() * 7), maj = [0, 4, 7, 12, 16], min = [0, 3, 7, 12, 15];
    let legAt = -9, legDir = 1, eggAt = -9, ptr = null, wasOn = false;
    let cursor = -1, soldSide = -1, soldAt = -9, buyAt = -9, coinFrom = 20, dingAt = -9, helloAt = -9, helloIcon = 0;

    const N = 40;
    const back = new Int32Array(N * N), spr = new Int32Array(N * N), front = new Int32Array(N * N);
    let L = back;
    const dot = (x, y, col) => { x = Math.floor(x); y = Math.floor(y); if (x >= 0 && y >= 0 && x < N && y < N) L[y * N + x] = col; };
    const fill = (x0, y0, x1, y1, col) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) dot(x, y, col); };
    const oval = (cx, cy, rx, ry, col) => {
      for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { // oval's box
        const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry; // -1..1 across the oval
        if (u * u + v * v <= 1) dot(x, y, typeof col === 'function' ? col(x, y, u, v) : col);
      }
    };
    // a potion bottle seen from a little above
    const bottle = (x, y, liquid) => {
      fill(x, y + 1, x + 2, y + 3, liquid);
      dot(x, y + 1, 0xffffff); dot(x + 2, y + 3, LINE);
      dot(x + 1, y, 0xc8a070); dot(x + 1, y - 1, 0x8c6440);
    };

    function room(t) {
      L = back;
      if (legend !== 'None') { legendRoom(t); return; }
      // plank wall
      for (let i = 0; i < N * N; i++) { // each dot of the sheet
        const x = i % N, y = (i / N) | 0; // column, row
        const plank = Math.floor((x + (y > 20 ? 3 : 0)) / 6);
        const seam = (x + (y > 20 ? 3 : 0)) % 6 === 0;
        L[i] = seam ? WALL[2] : (plank * 7 + y) % 13 === 0 ? WALL[0] : WALL[1];
      }
      if (shop === 'Potion Shelves' || shop === 'Book Stacks' || shop === 'Herbalist') {
        for (const sy of [8, 19]) {
          fill(0, sy, 39, sy, 0xc89868); fill(0, sy + 1, 39, sy + 2, 0x6c4428); fill(0, sy + 3, 39, sy + 3, 0x3c2414);
          for (let i = 0; i < 9; i++) {
            const x = 1 + i * 4 + (i > 4 ? 1 : 0), it = shelfItems[i];
            if (shop === 'Potion Shelves') bottle(x, sy - 4, [0xe04848, 0x4888e8, 0x58c858, 0xe8c040, 0xb060d0][it[0]]);
            else if (shop === 'Book Stacks') {
              const h = 4 + Math.floor(it[1] * 3), col = [0xa83030, 0x305890, 0x2c7040, 0xc09030, 0x603070][it[0]];
              fill(x, sy - h, x + 2, sy - 1, col); fill(x, sy - h, x + 2, sy - h, 0xe8d8b0); dot(x + 2, sy - h + 2, LINE);
            } else {
              // clay pots of herbs, leaves spilling over
              fill(x, sy - 2, x + 2, sy - 1, 0xb86438); dot(x + 2, sy - 1, 0x8c4428); fill(x, sy - 3, x + 2, sy - 3, 0xd08048);
              const lc = [0x58a848, 0x78c058, 0x3c8838, 0xa8c850, 0x68b070][it[0]];
              dot(x, sy - 4, lc); dot(x + 1, sy - 5, lc); dot(x + 2, sy - 4, lc); dot(x + 1, sy - 4, 0x2c6830);
            }
          }
        }
      } else if (shop === 'Weapon Rack' || shop === 'Armory') {
        fill(0, 3, 39, 4, 0x6c4428); fill(0, 5, 39, 5, 0x3c2414);
        for (let i = 0; i < 6; i++) {
          const x = 2 + i * 7;
          if (shop === 'Armory') {
            // round shields hung in a row, each with its own boss and rim
            const sc = [0xb83a3a, 0x3a5ab8, 0x3a8a4a][i % 3];
            oval(x + 0.5, 11, 3.2, 3.6, (xx, yy, u, v) => u * u + v * v > 0.6 ? 0xa8a8b8 : (xx + yy) % 4 === 0 && u > 0 ? 0x2c2c38 : sc);
            dot(x, 11, 0xe8e8f0); dot(x + 1, 12, 0x6c6c7c); fill(x, 6, x, 7, 0x3c2414);
          } else if (i % 2) { fill(x, 6, x, 20, 0x8c6440); oval(x + 0.5, 6, 2.4, 1.8, 0xc8d0d8); dot(x - 1, 6, 0x8890a0); }
          else { fill(x, 2, x, 17, 0xd8e0e8); fill(x + 1, 2, x + 1, 17, 0x8890a0); fill(x - 1, 18, x + 2, 18, 0xd0a040); fill(x, 19, x + 1, 21, 0x6c4428); }
        }
      } else if (shop === 'Map Wall') {
        fill(5, 3, 34, 19, 0xe8d8a8); fill(5, 19, 34, 19, 0xc0a878); fill(34, 3, 34, 19, 0xc0a878);
        for (let y = 4; y < 19; y++) for (let x = 6; x < 34; x++) {
          const land = Math.sin(x * 0.45) * 3 + Math.cos(y * 0.6 + x * 0.1) * 2.5 > 1.2;
          if (land) dot(x, y, (x + y) % 5 === 0 ? 0x7ca050 : 0x9cc070);
        }
        for (let k = 0; k < 9; k++) dot(9 + k * 2, 8 + Math.round(Math.sin(k) * 2), 0xc03030);
        dot(26, 12, 0xc03030); dot(27, 13, 0xc03030); dot(25, 13, 0xc03030); dot(26, 14, 0xc03030); dot(27, 11, 0xc03030);
      } else if (shop === 'Tailor') {
        // bolts of cloth stacked on end, and a ribbon of measuring tape
        for (let i = 0; i < 8; i++) {
          const x = 1 + i * 5, h = 9 + Math.floor(shelfItems[i][1] * 6), cc = [0xc84860, 0x4878c8, 0xe8c050, 0x58a868, 0x9858b8, 0xe88848, 0xf0e8d8, 0x40a8a8][(shelfItems[i][0] + i) % 8];
          fill(x, 21 - h, x + 3, 20, cc); fill(x + 3, 21 - h, x + 3, 20, sink(cc, 0.75)); for (let y = 22 - h; y < 21; y += 3) fill(x, y, x + 2, y, lift(cc, 0.3));
        }
        for (let x = 0; x < N; x++) dot(x, 3 + Math.round(Math.sin(x * 0.4) * 1), x % 3 ? 0xf0d860 : 0x2c2c2c);
      } else if (shop === 'Crystal Grotto') {
        // a shop in a cave: rock wall and glowing crystal clusters
        for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0; L[i] = (x * 7 + y * 13) % 17 < 3 ? 0x3c3448 : (x + y * 3) % 11 === 0 ? 0x5c5070 : 0x4a4058; }
        for (const [cx, cy, cc] of [[4, 14, 0x60e0f0], [34, 10, 0xe070f0], [10, 5, 0x80f0a0], [30, 20, 0x60e0f0], [3, 24, 0xe070f0]]) {
          const glow = Math.sin(t * 1.5 + cx) > 0 ? 0xffffff : cc;
          for (let k = 0; k < 4; k++) { dot(cx, cy - k, k === 3 ? glow : cc); dot(cx + 1, cy - k + 1, cc); dot(cx - 1, cy - k + 2, sink(cc, 0.65)); }
        }
      } else {
        fill(4, 6, 35, 27, 0x6c6870); fill(4, 6, 35, 7, 0x8c8890);
        for (let y = 8; y < 28; y += 3) for (let x = 4 + (y % 2) * 2; x < 36; x += 5) dot(x, y, 0x4c4850);
        fill(9, 12, 30, 27, 0x1c1418);
        for (let x = 10; x < 30; x++) {
          const h = 4 + Math.abs(Math.sin(x * 1.3 + t * 6)) * 4 + Math.sin(x * 0.4 + t * 3.3) * 1.5;
          for (let k = 0; k < h; k++) dot(x, 27 - k, k > h - 2 ? 0xf8e070 : k > h * 0.5 ? 0xf09030 : 0xe04020);
        }
        fill(2, 4, 37, 5, 0x5c3c24);
      }
      // the frame of the shop: a market stall's posts and striped awning, or a stone archway
      if (counterKind === 'Market Stall') {
        fill(0, 0, 0, 39, 0xa87c50); fill(1, 0, 1, 39, 0x8c6440); fill(38, 0, 38, 39, 0x8c6440); fill(39, 0, 39, 39, 0x6c4428);
        for (let x = 0; x < N; x++) {
          const st = STALL[Math.floor(x / 4) % 2], k = x % 4;
          fill(x, 0, x, 2, st); if (k < 3) dot(x, 3, st); if (k === 1) dot(x, 4, st);
          if (k === 3) dot(x, 3, 0x3c2414);
        }
        fill(0, 2, 39, 2, sink(STALL[0], 0.7));
      } else if (counterKind === 'Stone Arch') {
        for (let y = 0; y < 21; y++) for (let x = 0; x < N; x++) {
          const d = Math.hypot(x + 0.5 - 20, (y + 0.5 - 21) * 1.05);
          if (d <= 19.2) continue;
          const ring = d < 21.4, seg = Math.floor(Math.atan2(y + 0.5 - 21, x + 0.5 - 20) * 6);
          dot(x, y, ring ? (d < 19.9 ? 0x5c5854 : seg % 2 ? 0xbcb8b0 : 0xa8a49c) : (x * 3 + y * 5) % 7 === 0 || y % 4 === 3 ? 0x5c5854 : (Math.floor(x / 5) + Math.floor(y / 4)) % 2 ? 0x8c8884 : 0x7c7874);
        }
      }
      // something on the wall, up in one corner
      const dx = decorSide ? 31 : 1;
      if (decor === 'Window') {
        fill(dx, 1, dx + 7, 9, 0x5c3c24);
        const sky = hour === 'Moonlit' ? 0x1c2850 : hour === 'Lamplit' ? 0x2c2448 : hour === 'Golden Hour' ? 0xf0a058 : 0x88c8f0;
        fill(dx + 1, 2, dx + 6, 8, sky); fill(dx + 1, 5, dx + 6, 5, 0x5c3c24); fill(dx + 3, 2, dx + 4, 8, 0x5c3c24);
        if (hour === 'Moonlit' || hour === 'Lamplit') { dot(dx + 5, 3, 0xfff4c0); dot(dx + 2, 7, 0xd0d8ff); } else { dot(dx + 1, 3, 0xffffff); dot(dx + 2, 3, 0xffffff); }
      } else if (decor === 'Wall Clock') {
        oval(dx + 3.5, 5, 3.3, 3.3, (x, y, u, v) => u * u + v * v > 0.55 ? 0x8c6440 : 0xf4ecd8);
        const a = t * 0.5;
        dot(dx + 3, 5, LINE); dot(dx + 3 + Math.round(Math.cos(a) * 1.6), 5 + Math.round(Math.sin(a) * 1.6), LINE); dot(dx + 3, 3, LINE);
        const sw = Math.sin(t * 3.1) > 0 ? 1 : -1;
        fill(dx + 3, 9, dx + 3, 11, 0xd0a040); dot(dx + 3 + sw, 12, 0xf0c050);
      } else if (decor === 'Hanging Herbs') {
        fill(dx, 1, dx + 7, 1, 0x3c2414);
        for (let k = 0; k < 3; k++) { const hx = dx + 1 + k * 3; fill(hx, 2, hx, 3, 0x8c6440); for (let y = 4; y < 8 + (k % 2); y++) { dot(hx, y, (y + k) % 2 ? 0x6ca050 : 0x4c8038); dot(hx + (y % 2 ? 1 : -1), y, 0x88b860); } }
      } else if (decor === 'Mounted Shield') {
        for (let y = 1; y < 10; y++) { const w = y < 6 ? 3 : 3 - (y - 5) * 0.8; fill(Math.round(dx + 3.5 - w), y, Math.round(dx + 3.5 + w) - 1, y, y === 1 ? 0xd0a040 : 0x3a5ab8); }
        fill(dx + 3, 2, dx + 3, 8, 0xe8c050); fill(dx + 1, 4, dx + 5, 4, 0xe8c050);
      } else if (decor === 'Wanted Poster') {
        fill(dx, 1, dx + 6, 10, 0xe8d8a8); dot(dx, 1, 0xc8a870); dot(dx + 6, 10, 0xc0a070);
        oval(dx + 3.5, 5, 1.8, 2, 0x8c6c4c); fill(dx + 2, 8, dx + 5, 8, 0x8c6c4c); dot(dx + 3, 1, 0xc03030);
      } else if (decor === 'Hanging Lamp') {
        fill(dx + 3, 0, dx + 3, 2, 0x3c2414);
        fill(dx + 2, 3, dx + 4, 3, 0x3c3c48); const lampOn = Math.sin(t * 2.3) > -0.85 ? 0xfff0a0 : 0xf0c860;
        fill(dx + 2, 4, dx + 4, 6, lampOn); fill(dx + 1, 7, dx + 5, 7, 0x3c3c48);
      }
    }

    // the keeper's head, row by row: a rounded crown, full cheeks and a soft chin
    const HEADW = [3.4, 5.4, 6.5, 7.1, 7.4, 7.6, 7.6, 7.6, 7.5, 7.3, 6.9, 6.3, 5.5, 4.4, 3];
    // each folk's own face: a long human face tapering to the chin, a round elf, a square dwarf with a broad jaw
    const FACEW = {
      Human: [3.2, 5.2, 6.3, 6.9, 7.2, 7.3, 7.3, 7.2, 7, 6.6, 6.1, 5.4, 4.5, 3.5, 2.4],
      Elf: [3.8, 5.7, 6.7, 7.2, 7.5, 7.6, 7.6, 7.4, 7.1, 6.6, 6, 5.2, 4.2, 3, 1.6],
      Dwarf: [3.6, 5.8, 6.9, 7.4, 7.7, 7.8, 7.8, 7.8, 7.8, 7.7, 7.5, 7.2, 6.6, 5.8, 4.6],
    }[keeper] || HEADW;
    const headCol = (x, y, hy) => {
      const r = y - hy + 7, w = FACEW[r] || 1, u = (x + 0.5 - 20) / w, v = (r - 7) / 7;
      // lit from the upper left; the shade runs down the right cheek, and the jaw's shadow is one row, on that side only
      return u + v < -0.85 ? SKIN[0] : u - v * 0.3 > 0.72 || (r === 14 && u > -0.2) || (r === 13 && u > 0.35) ? SKIN[2] : SKIN[1];
    };
    function headShape(hy, wide, colFn) {
      for (let r = 0; r < 15; r++) { const w = FACEW[r] * (wide || 1); for (let x = Math.round(20 - w); x < Math.round(20 + w); x++) dot(x, hy - 7 + r, colFn(x, hy - 7 + r, hy)); }
    }
    // hair seen from a little above: a shaded cap with a ragged fringe and a shine on the crown
    function hairCap(hy, reach) {
      for (let r = 0; r < 8; r++) {
        const w = HEADW[r] + 0.4;
        for (let x = Math.round(20 - w); x < Math.round(20 + w); x++) {
          const fringe = r === 7 ? (x % 3 === 0) : r === 6 ? (x % 3 !== 2) : true;
          if (r >= reach && !fringe) continue;
          const u = (x + 0.5 - 20) / w;
          dot(x, hy - 8 + r, r < 3 && u < -0.1 && u > -0.7 ? HAIRLT : u > 0.55 || r >= 6 ? HAIR[1] : HAIR[0]);
        }
      }
    }

    function shopkeeper(t) {
      L = spr;
      spr.fill(-1);
      const happy = t - buyAt < 0.9 || t - helloAt < 1.2;
      const b = happy ? (Math.floor((t - Math.max(buyAt, helloAt)) * 8) % 2) : Math.sin(t * 2.6 + bobPh) > 0.25 ? 1 : 0;
      const blink = (t + blinkOff) % blinkGap < 0.14 || (happy && keeper === 'Mimic');
      if (legend !== 'None') { legendKeeper(t, happy, b, blink); return; }
      if (keeper === 'Mimic') {
        // a treasure chest leaning on the counter, lid up, all teeth
        const hop = b;
        fill(9, 19 + hop, 30, 30, SKIN[1]);
        for (let x = 9; x <= 30; x++) { dot(x, 19 + hop, SKIN[0]); }
        fill(9, 23 + hop, 30, 23 + hop, 0x585060); fill(9, 27, 30, 27, 0x585060);
        fill(18, 24 + hop, 21, 26, 0xe8c040); dot(19, 25 + hop, LINE);
        fill(8, 6 - hop, 31, 11 - hop, SKIN[1]); fill(8, 6 - hop, 31, 7 - hop, SKIN[0]); fill(8, 9 - hop, 31, 9 - hop, 0x585060);
        fill(10, 12 - hop, 29, 18 + hop, 0x401020);
        for (let x = 10; x < 30; x += 3) { dot(x + 1, 12 - hop, 0xfff8e8); dot(x + 1, 13 - hop, 0xfff8e8); dot(x + 1, 18 + hop, 0xfff8e8); dot(x + 1, 17 + hop, 0xfff8e8); }
        oval(20, 17 + hop, 4, 1.6, 0xd85068);
        if (!blink) { fill(13, 14, 15, 15, 0xf8e040); fill(24, 14, 26, 15, 0xf8e040); dot(14, 14, LINE); dot(25, 14, LINE); }
        else { fill(13, 15, 15, 15, LINE); fill(24, 15, 26, 15, LINE); }
        return;
      }
      const hy = 13 + b;
      // long hair falls behind the shoulders
      if (top === 'Long Hair') { for (const s of [-1, 1]) for (let y = hy - 3; y < hy + 13; y++) for (let k = 0; k < 3; k++) dot(20 + s * (7 + k - (y > hy + 9 ? 1 : 0)), y, k === 1 && y % 3 ? HAIR[0] : s > 0 ? HAIR[1] : (k === 2 ? HAIR[1] : HAIRLT)); }
      // shoulders sloping out from the neck, sleeves down to the hands on the counter
      for (let y = hy + 8; y < 34; y++) {
        const w = Math.min(11.5, 5 + (y - hy - 8) * 2.2);
        for (let x = Math.round(20 - w); x < Math.round(20 + w); x++) {
          const edge = x < 20 - w + 2 || x > 20 + w - 3;
          let cc = edge ? SHIRT[1] : SHIRT[0];
          if (shirt === 'Striped' && !edge) cc = (y % 3 === 0) ? SHIRT[1] : SHIRT[0];
          if (shirt === 'Chainmail' && (x + y) % 2 === 0) cc = SHIRT[1];
          dot(x, y, cc);
        }
      }
      for (const s of [-1, 1]) { for (let y = hy + 12; y < 31; y++) { dot(20 + s * 10, y, SHIRT[1]); dot(20 + s * 11, y, y % 4 === 0 ? SHIRT[0] : SHIRT[1]); dot(20 + s * 9, y, LINE); } }
      // apron bib with straps over the shoulders
      fill(14, hy + 11, 25, 33, APRON[1]);
      fill(15, hy + 11, 24, hy + 11, APRON[0]);
      fill(14, hy + 13, 14, 33, APRON[2]); fill(25, hy + 13, 25, 33, APRON[2]);
      for (let y = hy + 8; y < hy + 11; y++) { dot(15, y, APRON[2]); dot(24, y, APRON[2]); }
      if (apron === 'Gold Trim') { fill(14, hy + 11, 14, 33, 0xe8c040); fill(25, hy + 11, 25, 33, 0xe8c040); fill(15, hy + 11, 24, hy + 11, 0xe8c040); }
      if (apron === 'Checkered') for (let y = hy + 12; y < 34; y++) for (let x = 15; x < 25; x++) if ((x >> 1) % 2 === (y >> 1) % 2) dot(x, y, APRON[0]);
      if (apron === 'Patched') { fill(16, hy + 14, 18, hy + 16, 0xc87850); dot(16, hy + 14, 0xe8e0d0); dot(18, hy + 16, 0xe8e0d0); }
      fill(16, 28, 23, 29, APRON[0]);
      // the neck, in shadow under the chin
      fill(19, hy + 6, 21, hy + 8, SKIN[2]); dot(19, hy + 7, SKIN[1]);
      // ears
      if (keeper === 'Elf') for (const s of [-1, 1]) for (let k = 0; k < 5; k++) { dot(20 + s * (7 + k), hy + 1 - k * 0.6, SKIN[1]); dot(20 + s * (7 + k), hy + 2 - k * 0.6, SKIN[2]); }
      else if (keeper === 'Rabbitfolk') for (const s of [-1, 1]) for (let y = hy - 15; y < hy - 4; y++) { const w = y < hy - 13 ? 0 : 1; fill(20 + s * 4 - w, y + (s > 0 && y < hy - 11 && Math.sin(t * 0.7) > 0.6 ? 1 : 0), 20 + s * 4 + w, y, SKIN[1]); if (y > hy - 13) dot(20 + s * 4, y, 0xf0a8b8); }
      else if (keeper !== 'Mole' && keeper !== 'Skeleton' && keeper !== 'Ghost' && keeper !== 'Golem' && keeper !== 'Lizardfolk') for (const s of [-1, 1]) { fill(20 + s * 7.5 - 0.5, hy + 1, 20 + s * 7.5 + 0.5, hy + 2, SKIN[1]); dot(20 + s * 7.5 + (s > 0 ? 0.5 : -0.5), hy + 2, SKIN[2]); }
      // the head
      if (keeper === 'Golem') { for (let y = hy - 7; y <= hy + 6; y++) for (let x = 13; x <= 26; x++) dot(x, y, x === 26 || y === hy + 6 ? SKIN[2] : (x * 5 + y * 3) % 13 === 0 ? SKIN[2] : x < 16 && y < hy - 3 ? SKIN[0] : SKIN[1]); fill(13, hy - 7, 26, hy - 7, 0x6ca050); dot(15, hy - 8, 0x6ca050); dot(22, hy - 8, 0x88c060); }
      else headShape(hy, keeper === 'Lizardfolk' ? 1.04 : 1, headCol);
      if (keeper === 'Lizardfolk') { for (const x of [16, 20, 24]) { dot(x, hy - 8, SKIN[2]); dot(x, hy - 9, SKIN[1]); } fill(14, hy + 5, 25, hy + 6, SKIN[1]); dot(18, hy + 3, SKIN[2]); dot(21, hy + 3, SKIN[2]); }
      const eyeY = hy + 1;
      // hair or hat over the crown
      if (top === 'Short Crop' || top === 'Bun' || top === 'Long Hair') {
        hairCap(hy, keeper === 'Dwarf' ? 5 : top === 'Long Hair' ? 8 : 6);
        if (top === 'Bun') { oval(20, hy - 9.5, 3, 2.4, (x, y, u, v) => u + v < -0.6 ? HAIRLT : u > 0.4 ? HAIR[1] : HAIR[0]); fill(19, hy - 8, 21, hy - 8, HAIR[1]); }
      } else if (top === 'Bald') {
        dot(16, hy - 5, 0xffffff); dot(17, hy - 6, 0xffffff); dot(16, hy - 4, SKIN[0]);
        if (keeper === 'Human' || keeper === 'Elf' || keeper === 'Dwarf') for (const s of [-1, 1]) { fill(20 + s * 7 - (s > 0 ? 1 : 0), hy - 2, 20 + s * 7 - (s > 0 ? 0 : -1), hy, HAIR[1]); }
      } else if (top === 'Feathered Cap') {
        oval(20, hy - 4, 8.4, 4.4, (x, y, u, v) => u + v < -0.7 ? 0x58a050 : 0x3c7840);
        fill(11, hy - 1, 29, hy, 0x24502c);
        for (let k = 0; k < 8; k++) { dot(26 + k * 0.6, hy - 5 - k, 0xe04848); dot(27 + k * 0.6, hy - 5 - k, 0xf8a0a0); }
      } else if (top === 'Bandana') { // a spotted kerchief, knot at the side
        oval(20, hy - 4, 7.8, 4.3, (x, y) => (x * 2 + y) % 6 < 2 ? 0xf8f0e0 : 0xc83040);
        fill(12, hy - 1, 28, hy - 1, 0xa02838);
        fill(26, hy, 29, hy + 1, 0xc83040); dot(29, hy + 2, 0xc83040); dot(30, hy + 3, 0xc83040);
      } else if (top === 'Hood') {
        oval(20, hy, 9.2, 8.4, (x, y) => (x > 20 ? APRON[2] : APRON[1]));
        headShape(hy + 1, 0.86, (x, y) => headCol(x, y - 1, hy));
      } else if (top === 'Witch Hat') {
        fill(9, hy - 2, 30, hy - 1, 0x3c2858); fill(9, hy - 2, 30, hy - 2, 0x5c4080);
        for (let r = 0; r < 9; r++) { const w = 6 - r * 0.62, bend = r > 6 ? r - 6 : 0; fill(Math.round(20 - w + bend), hy - 3 - r, Math.round(20 + w + bend), hy - 3 - r, r === 1 ? 0xe8c040 : x5(r)); }
      } else if (top === 'Chef Hat') { // a tall puffed toque
        fill(13, hy - 3, 26, hy - 1, 0xf4f4f0); fill(13, hy - 1, 26, hy - 1, 0xd8d8d0);
        for (const [cx, cy] of [[15.5, -6], [20, -7.5], [24.5, -6]]) oval(cx, hy + cy, 3.6, 3, (x, y, u, v) => u - v > 0.7 ? 0xd8d8d0 : 0xffffff);
      } else if (top === 'Tricorn') {
        fill(10, hy - 3, 29, hy - 2, 0x2c2430); fill(10, hy - 4, 12, hy - 4, 0x2c2430); fill(27, hy - 4, 29, hy - 4, 0x2c2430);
        oval(20, hy - 5, 5.6, 3, 0x3c3440); fill(10, hy - 2, 29, hy - 2, 0xd0a040); dot(20, hy - 4, 0xf0f0e8);
      } else if (top === 'Flower Wreath') {
        hairCap(hy, 6);
        for (let x = 12; x < 29; x++) dot(x, hy - 4 + (x === 12 || x === 28 ? 1 : 0), x % 3 === 0 ? 0xff80b0 : x % 3 === 1 ? 0x60a848 : 0xfff070);
      } else if (top === 'Horned Helm') {
        for (let r = 0; r < 6; r++) { const w = HEADW[r] + 0.5; fill(Math.round(20 - w), hy - 8 + r, Math.round(20 + w) - 1, hy - 8 + r, r === 5 ? 0xd0a040 : r < 2 ? 0xd8dce4 : 0xa0a4b0); }
        for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { dot(20 + s * (8 + k * 0.6), hy - 5 - k, 0xf4ecd8); dot(20 + s * (8 + k * 0.6) + (s > 0 ? 1 : -1), hy - 4 - k, 0xd0c4a0); }
      }
      // face
      const mouthY = hy + 4;
      const mouth = () => {
        if ((happy || face === 'Beaming' || face === 'Starstruck') && darkSkin) { dot(18, mouthY, LINE); dot(22, mouthY, LINE); fill(19, mouthY, 21, mouthY, 0xfff4e8); fill(19, mouthY + 1, 21, mouthY + 1, 0x3a1018); }
        else if (happy || face === 'Beaming' || face === 'Starstruck') { fill(18, mouthY, 22, mouthY, LINE); fill(19, mouthY + 1, 21, mouthY + 1, 0xc04858); }
        else if (face === 'Grin') { dot(17, mouthY - 1, LINE); fill(18, mouthY, 22, mouthY, 0xffffff); dot(23, mouthY - 1, LINE); fill(18, mouthY + 1, 22, mouthY + 1, LINE); }
        else if (face === 'Smirk') { fill(20, mouthY, 22, mouthY, LINE); dot(23, mouthY - 1, LINE); }
        else if (face === 'Sleepy') { dot(20, mouthY, LINE); }
        else if (face === 'Stern') fill(18, mouthY, 22, mouthY, LINE);
        else { dot(18, mouthY - 1, LINE); fill(19, mouthY, 21, mouthY, LINE); dot(22, mouthY - 1, LINE); }
      };
      if (keeper === 'Mole') {
        // little round spectacles, the beady eyes bright behind the glass
        for (const ex of [17, 23]) {
          for (const [dx, dy] of [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]) dot(ex + dx, eyeY + dy, 0xe8c050);
          dot(ex, eyeY, blink ? 0x5c4c5c : 0xfff8e0);
          if (!blink) dot(ex - 1, eyeY - 1, 0xfff4b0);
        }
        dot(20, eyeY, 0xe8c050);
        oval(20, hy + 3.6, 2.2, 1.6, 0xf898b0); dot(19, hy + 3, 0xffd0e0);
        if (happy) fill(19, hy + 5, 21, hy + 5, LINE);
      } else if (keeper === 'Cyclops') {
        if (blink) fill(17, eyeY + 1, 23, eyeY + 1, LINE);
        else { oval(20, eyeY + 0.5, 3.2, 2.4, 0xffffff); fill(19, eyeY, 21, eyeY + 1, LINE); dot(19, eyeY, 0xffffff); }
        mouth();
      } else if (keeper === 'Skeleton') {
        for (const ex of [16, 22]) { fill(ex, eyeY - 1, ex + 2, eyeY + 1, LINE); if (!blink) dot(ex + 1, eyeY, Math.sin(t * 2) > 0 ? 0x80f0ff : 0x40c0e0); }
        dot(19, hy + 3, LINE); dot(20, hy + 3, LINE);
        for (let x = 17; x <= 23; x++) { dot(x, mouthY + 1, x % 2 ? 0xffffff : LINE); }
        fill(17, mouthY, 23, mouthY, LINE);
      } else if (keeper === 'Golem') {
        for (const ex of [16, 22]) fill(ex, eyeY, ex + 2, eyeY, blink ? LINE : 0x60f0e0);
        fill(17, mouthY + 1, 22, mouthY + 1, LINE); dot(24, hy - 3, SKIN[2]); dot(25, hy - 2, SKIN[2]);
      } else {
        for (const ex of [17, 23]) {
          const winkShut = face === 'Wink' && ex === 17;
          if (happy) { dot(ex - 1, eyeY + 1, LINE); dot(ex, eyeY, LINE); dot(ex + 1, eyeY, LINE); dot(ex + 2, eyeY + 1, LINE); }
          else if (blink || face === 'Sleepy' || winkShut) fill(ex, eyeY + 1, ex + 1, eyeY + 1, LINE);
          else if (face === 'Starstruck') { dot(ex, eyeY, 0xffe040); dot(ex + 1, eyeY + 1, 0xffe040); dot(ex, eyeY + 1, 0xfff8b0); dot(ex + 1, eyeY, 0xffe040); }
          else if (keeper === 'Lizardfolk') { fill(ex, eyeY, ex + 1, eyeY + 1, 0xf0d040); dot(ex + 1, eyeY, LINE); dot(ex + 1, eyeY + 1, LINE); }
          else { fill(ex, eyeY, ex, eyeY + 1, LINE); dot(ex + 1, eyeY + 1, LINE); dot(ex + 1, eyeY, 0xffffff); }
          // brows in the hair colour, cross on a stern face
          const bc = keeper === 'Lizardfolk' || keeper === 'Rabbitfolk' || keeper === 'Ghost' ? SKIN[2] : darkSkin ? BROWLT : HAIR[1];
          if (face === 'Stern') { dot(ex + (ex < 20 ? 0 : 1), eyeY - 2, bc); dot(ex + (ex < 20 ? 1 : 0), eyeY - 1, bc); }
          else fill(ex, eyeY - 2, ex + 1, eyeY - 2, bc);
        }
        if (keeper === 'Rabbitfolk') { dot(19, hy + 3, 0xf080a0); dot(20, hy + 3, 0xf080a0); dot(19, mouthY + 1, 0xffffff); dot(20, mouthY + 1, 0xffffff); fill(18, mouthY, 21, mouthY, LINE); }
        else if (keeper !== 'Lizardfolk') {
          dot(20, hy + 3, SKIN[2]); mouth();
          const blush = darkSkin ? mixC(SKIN[1], 0xd06050, 0.3) : 0xf09090;
          dot(15, hy + 3, blush); dot(25, hy + 3, blush);
          // the lip highlight: a light dot under each mouth-line dot that sits on bare skin
          if (darkSkin) for (let y = mouthY + 2; y >= mouthY - 1; y--) for (let x = 17; x <= 23; x++) if (L[y * N + x] === LINE && SKIN.includes(L[(y + 1) * N + x])) L[(y + 1) * N + x] = LIPLT;
        }
        else { fill(18, mouthY + 1, 22, mouthY + 1, LINE); if (happy) dot(20, mouthY + 2, 0xd85070); }
      }
      if (keeper === 'Dwarf') {
        // a big beard from below the nose down, combed into strands, the mouth showing under a full mustache;
        // above it the face stays clear: a heavy brow line, two bright eyes and a big round nose
        oval(20, hy + 8, 6.9, 4.4, (x, y, u, v) => (x - 20 + y) % 4 === 0 && v > -0.4 ? HAIR[1] : u < -0.35 && v < 0.3 ? HAIRLT : u > 0.5 ? HAIR[1] : HAIR[0]);
        for (const s of [-1, 1]) fill(20 + s * 6.5, hy + 3, 20 + s * 6.5, hy + 5, HAIR[0]);
        fill(16, hy + 4, 24, hy + 4, HAIR[0]); dot(16, hy + 5, HAIR[1]); dot(24, hy + 5, HAIR[1]); fill(17, hy + 4, 18, hy + 4, HAIRLT);
        fill(19, hy + 2, 21, hy + 3, SKIN[1]); dot(19, hy + 2, SKIN[0]); dot(21, hy + 3, SKIN[2]); dot(20, hy + 3, SKIN[2]);
        fill(18, hy + 5, 22, hy + 5, happy ? (darkSkin ? 0xfff4e8 : 0xc04858) : LINE); if (!happy) fill(19, hy + 5, 21, hy + 5, darkSkin ? 0x3a1018 : 0x8c3c3c);
        dot(18, hy + 11, 0xd0a040); dot(22, hy + 11, 0xd0a040); dot(18, hy + 10, 0xa07818); dot(22, hy + 10, 0xa07818);
        // the eyes again, on top, so no hair or beard can cover them: a dark dot with a bright catchlight under a brow line
        const browC = darkSkin ? BROWLT : HAIR[1];
        for (const ex of [17, 23]) {
          fill(ex - 1, eyeY - 1, ex + 1, eyeY - 1, browC);
          if (blink || face === 'Sleepy' || (face === 'Wink' && ex === 17)) fill(ex, eyeY + 1, ex + 1, eyeY + 1, LINE);
          else if (happy) { dot(ex - 1, eyeY + 1, LINE); dot(ex, eyeY, LINE); dot(ex + 1, eyeY, LINE); dot(ex + 2, eyeY + 1, LINE); }
          else { fill(ex, eyeY, ex + 1, eyeY + 1, LINE); dot(ex + 1, eyeY, 0xffffff); fill(ex, eyeY + 2, ex + 1, eyeY + 2, SKIN[1]); }
        }
      }
      if (whiskers === 'Mustache') { fill(17, mouthY - 1, 23, mouthY - 1, HAIR[0]); dot(17, mouthY, HAIR[1]); dot(23, mouthY, HAIR[1]); }
      else if (whiskers === 'Curled Mustache') { fill(18, mouthY - 1, 22, mouthY - 1, HAIR[0]); dot(17, mouthY - 2, HAIR[0]); dot(23, mouthY - 2, HAIR[0]); dot(16, mouthY - 3, HAIR[1]); dot(24, mouthY - 3, HAIR[1]); }
      else if (whiskers === 'Goatee') { fill(19, mouthY + 2, 21, mouthY + 3, HAIR[0]); dot(20, mouthY + 4, HAIR[1]); }
      else if (whiskers === 'Stubble') for (let x = 15; x < 26; x++) for (let y = mouthY; y < hy + 7; y++) if ((x * 3 + y) % 4 === 0 && Math.abs(x + 0.5 - 20) < (HEADW[y - hy + 7] || 0) - 0.5 && L[y * N + x] !== LINE) dot(x, y, SKIN[2]);
      else if (whiskers === 'Sideburns') for (const s of [-1, 1]) fill(20 + s * 7 - (s > 0 ? 1 : 0), hy - 1, 20 + s * 7 - (s > 0 ? 0 : -1), hy + 3, HAIR[0]);
      if (extra === 'Spectacles') {
        for (const ex of [16, 22]) { fill(ex, eyeY - 1, ex + 3, eyeY - 1, 0xd0a040); fill(ex, eyeY + 2, ex + 3, eyeY + 2, 0xd0a040); dot(ex, eyeY, 0xd0a040); dot(ex + 3, eyeY, 0xd0a040); dot(ex, eyeY + 1, 0xd0a040); dot(ex + 3, eyeY + 1, 0xd0a040); }
        dot(20, eyeY, 0xd0a040);
      }
      // a parrot on the shoulder or a tiny dragon curled on it
      if (pet === 'Parrot') {
        const flap = t - buyAt < 0.6 && Math.floor(t * 10) % 2;
        fill(27, hy + 5, 28, hy + 9, 0x40b040); dot(29, hy + 5, 0xf0c030); dot(28, hy + 4, 0x40b040); dot(27, hy + 4, 0xe03838); dot(28, hy + 5, LINE);
        fill(27, hy + 10, 27, hy + 12, 0x3060d0); if (flap) { dot(26, hy + 6, 0x3060d0); dot(25, hy + 5, 0x3060d0); }
      } else if (pet === 'Tiny Dragon') {
        const puff = Math.sin(t * 0.9) > 0.85;
        fill(25, hy + 6, 29, hy + 8, 0xc84838); dot(29, hy + 5, 0xc84838); dot(30, hy + 5, 0xc84838); dot(30, hy + 4, LINE); dot(26, hy + 5, 0xf0c040); dot(28, hy + 5, 0xf0c040);
        dot(29, hy + 6, 0xf0e070); dot(24, hy + 8, 0xc84838); dot(23, hy + 9, 0xa03028);
        if (puff) { dot(31, hy + 4, 0xb8b8c0); dot(32, hy + 3, 0xd8d8e0); }
      }
      fairyY = hy;
      // a ghost keeper is see-through: its plank wall shows through
      if (keeper === 'Ghost') for (let i = 0; i < N * N; i++) if (spr[i] >= 0) { const y = (i / N) | 0; if (y > hy + 8 && (i % N + y) % 2 === 0) spr[i] = -2; }
    }
    // ---------- the legendary keepers ----------
    const mixC = (a, b2, k) => (Math.round((a >> 16 & 255) * (1 - k) + (b2 >> 16 & 255) * k) << 16) | (Math.round((a >> 8 & 255) * (1 - k) + (b2 >> 8 & 255) * k) << 8) | Math.round((a & 255) * (1 - k) + (b2 & 255) * k);
    let fairyY = 13;
    // ---------- the legendaries: each its own scene, keeper and counter (the shop, its decor and its light give way) ----------
    // a little per-print variety from the legendary's own stream (cosmos was drawn from it above)
    const lv = k => cosmos[k][0], lvi = (k, n) => Math.floor(cosmos[k][1] * n);
    const tri = (A, B2, C2, col) => {
      const x0 = Math.floor(Math.min(A[0], B2[0], C2[0])), x1 = Math.ceil(Math.max(A[0], B2[0], C2[0])), y0 = Math.floor(Math.min(A[1], B2[1], C2[1])), y1 = Math.ceil(Math.max(A[1], B2[1], C2[1]));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const px = x + 0.5, py = y + 0.5, cr = (p, q) => (q[0] - p[0]) * (py - p[1]) - (q[1] - p[1]) * (px - p[0]);
        const d1 = cr(A, B2), d2 = cr(B2, C2), d3 = cr(C2, A);
        if ((d1 >= 0 && d2 >= 0 && d3 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0)) dot(x, y, typeof col === 'function' ? col(x, y) : col);
      }
    };
    const seg = (x0, y0, x1, y1, col, th) => {
      const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 1.5) + 1;
      for (let k = 0; k <= n; k++) { const x = Math.round(x0 + (x1 - x0) * k / n), y = Math.round(y0 + (y1 - y0) * k / n); dot(x, y, col); if (th) dot(x + (th > 0 ? 1 : -1), y, col); }
    };
    const hash2 = (x, y) => { let h = Math.imul(x * 374761393 + y * 668265263, 1274126177); h ^= h >>> 13; return ((Math.imul(h, 1103515245) >>> 0) & 1023) / 1024; };
    // the dragon's hoard: membrane colour, gem colours and the glints, per print
    const WINGC = [[0x521830, 0x6c2240, 0x8a3050], [0x1c2a5c, 0x283c78, 0x38529a], [0x3a1c58, 0x502878, 0x683a98]][lvi(0, 3)];
    const GEMS = [0xe03048, 0x3890f0, 0x40d070, 0xc050e0, 0xf0f0f0];
    const glints = []; for (let k = 0; k < 12; k++) glints.push([Math.floor(cosmos[k + 3][0] * 40), cosmos[k + 3][1], cosmos[k + 3][2]]);
    const hoardTop = x => 18 + Math.abs(x - 19.5) * 0.12 + Math.sin(x * 1.37 + lv(1) * 6) * 0.9;
    const GOLDS = new Set([0xf8d860, 0x8c5c10, 0xf0c040, 0xfff0a0, 0xb07818, 0xd8a024, 0xd0981c]);
    // the slime king's hall: the window's panes, per print
    const PANES = [[0xd83860, 0x3c8ce0, 0xf0c040, 0x58c068], [0x9048d0, 0x3cb8d8, 0xf09040, 0xe04878], [0x3c70e0, 0xe8d050, 0xd04040, 0x40c0a0]][lvi(1, 3)];
    // the starfolk's dusk: two skies
    const DUSK = lvi(2, 2) ? [0x10183c, 0x182a5a, 0x22407a, 0x2c6a8c, 0x4c9898, 0x8cc4a4, 0xe8e0b0] : [0x140e34, 0x24164e, 0x401e66, 0x6c2a78, 0xa84070, 0xe0706a, 0xf8b070];
    const moonSide = lv(2) < 0.5 ? -1 : 1;
    const JELLY = [0xb8ffe0, 0x58e0a8, 0x22a078];
    let cave = null, slab = null, duskSky = null, neb = null;
    const clouds = [];
    // ---------- the legendaries' toys: state, driven by the pointer in legendInput ----------
    // dragon: steal a coin from its hoard while it sleeps; move too fast, or too near its head, and it wakes and breathes fire
    const dg = { wake: 0, noise: 0, hold: false, coin: null, drop: null, fireT: -9, fireTo: [20, 20], loot: 0, lootAt: -9, last: null, snoreAt: 0 };
    // slime king: grab it and pull; it stretches toward you and wobbles back when you let go
    const sk = { grab: null, D: [0, 0], V: [0, 0], warp: null, moved: 0, wob: 0, wobAt: -9, drops: [], coin: null };
    // starfolk: drag across the sky to draw a constellation; let go and it takes the stars into its chest
    const sf = { pts: [], drawing: false, fly: null, flyAt: -9, absorbed: 0 };
    let lastT = 0;
    function legendInput(t, inp) {
      const dt = Math.min(0.1, Math.max(0, t - lastT)); lastT = t;
      const P2 = inp.inside ? [inp.x * N, inp.y * N] : null;
      const taps = inp.taps();
      if (legend === 'Dragon') {
        for (const tp of taps) {
          const tx = Math.floor(tp.x * N), ty = Math.floor(tp.y * N), i = ty * N + tx;
          if (dg.hold || tx < 0 || ty < 0 || tx >= N || ty >= N) continue;
          const onDragon = spr[i] >= 0 && front[i] < 0, onGold = !onDragon && (GOLDS.has(front[i] >= 0 ? front[i] : back[i]));
          if (onGold && inp.down && dg.wake < 0.9) {
            dg.hold = true; dg.coin = [tp.x * N, tp.y * N]; dg.last = dg.coin.slice(); dg.drop = null;
            c.sound.hit('blip', 0.22, { freq: 2637 });
          } else if (onDragon) {
            // a poke on the nose: it snorts and half wakes
            dg.noise = Math.max(dg.noise, 0.75); c.sound.hit('noise', 0.25, { cutoff: 700, dur: 0.4 });
          }
        }
        if (dg.hold) {
          if (!inp.down || !P2) {
            dg.hold = false; dg.drop = { from: dg.coin.slice(), at: t };
            c.sound.hit('click', 0.3); c.sound.hit('click', 0.2, { at: 0.12 });
          } else {
            const sp = Math.hypot(P2[0] - dg.last[0], P2[1] - dg.last[1]);
            dg.noise += Math.max(0, sp - 0.6) * 0.16 + (Math.hypot(P2[0] - 20, P2[1] - 27) < 8 ? dt * 0.5 : 0);
            dg.coin = P2.slice(); dg.last = P2.slice();
            if (P2[0] < 1.5 || P2[0] > 38.5 || P2[1] < 1.5) {
              // out of the hoard and away: one more for the pile in the corner
              dg.hold = false; dg.loot = Math.min(12, dg.loot + 1); dg.lootAt = t; dg.coin = null;
              for (let k = 0; k < 4; k++) c.sound.note(key + 12 + maj[k], { at: k * 0.06, dur: 0.12, vel: 0.18, wave: 'square', cutoff: 3000 });
            }
          }
        }
        dg.noise = Math.max(0, dg.noise - dt * 0.35);
        if (dg.noise > 1 && t - dg.fireT > 2.6) {
          // too loud: it wakes, and breathes fire at the thief's hand; the coin falls back
          dg.fireT = t; dg.fireTo = dg.coin ? dg.coin.slice() : P2 ? P2.slice() : [20, 10]; dg.noise = 1.4;
          if (dg.hold) { dg.hold = false; dg.drop = { from: dg.coin.slice(), at: t }; }
          c.sound.hit('noise', 0.45, { cutoff: 900, dur: 0.9 });
          for (let k = 0; k < 3; k++) c.sound.note(key - 24 + min[k], { at: k * 0.12, dur: 0.2, vel: 0.22, wave: 'sawtooth', cutoff: 380 });
        }
        const tgt = t - dg.fireT < 2.4 ? 1 : dg.noise > 0.45 ? 0.5 : 0;
        dg.wake += (tgt - dg.wake) * Math.min(1, dt * 8);
        if (dg.wake < 0.2 && t - dg.snoreAt > 3.2) { dg.snoreAt = t; c.sound.note(key - 26, { dur: 1.2, vel: 0.05, wave: 'sine', attack: 0.4 }); }
      } else if (legend === 'Slime King') {
        for (const tp of taps) {
          const tx = Math.floor(tp.x * N), ty = Math.floor(tp.y * N);
          if (!sk.grab && inp.down && tx >= 0 && ty >= 0 && tx < N && ty < N && spr[ty * N + tx] >= 0) {
            sk.grab = [tp.x * N, tp.y * N]; sk.moved = 0; sk.V = [0, 0];
            c.sound.note(key + 7, { dur: 0.08, vel: 0.14, wave: 'sine' });
          }
        }
        if (sk.grab && inp.down && P2) {
          let dx = P2[0] - sk.grab[0], dy = P2[1] - sk.grab[1]; const L2 = Math.hypot(dx, dy);
          if (L2 > 24) { dx *= 24 / L2; dy *= 24 / L2; }
          sk.moved = Math.max(sk.moved, L2);
          sk.D[0] += (dx - sk.D[0]) * 0.5; sk.D[1] += (dy - sk.D[1]) * 0.5;
          sk.warp = sk.grab;
        } else if (sk.grab) {
          // let go: the arm snaps back, the whole king squashes and wobbles, drops of jelly fly off the arm's end,
          // and a big stretch shakes the gold coin out of its crown to bounce along the counter
          const L2 = Math.hypot(sk.D[0], sk.D[1]);
          sk.V = sk.moved < 1.5 ? [0, 2.2] : [-sk.D[0] * 0.3, -sk.D[1] * 0.3];
          sk.wob = Math.min(1, 0.3 + sk.moved / 10); sk.wobAt = t;
          if (L2 > 3) for (let k = 0; k < 7; k++) { const a = Math.atan2(sk.D[1], sk.D[0]) + (cosmos[k + 30][0] - 0.5) * 1.6, v = 10 + cosmos[k + 30][1] * 12; sk.drops.push({ x: sk.grab[0] + sk.D[0], y: sk.grab[1] + sk.D[1], vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, at: t }); }
          if (sk.moved > 5) { sk.coin = { at: t, x0: 20, dir: sk.D[0] > 0 ? -1 : 1 }; for (let k = 1; k <= 3; k++) c.sound.hit('blip', 0.3 / k, { freq: 2637, at: k * 0.63 }); }
          c.sound.note(key + 12, { dur: 0.1, vel: 0.2, wave: 'sine' }); c.sound.note(key + 5, { at: 0.08, dur: 0.16, vel: 0.18, wave: 'sine' });
          sk.grab = null;
        } else {
          const f = Math.min(2, dt * 30);
          sk.V[0] += (-0.32 * sk.D[0] - 0.14 * sk.V[0]) * f; sk.V[1] += (-0.32 * sk.D[1] - 0.14 * sk.V[1]) * f;
          sk.D[0] += sk.V[0] * f; sk.D[1] += sk.V[1] * f;
          if (Math.abs(sk.D[0]) + Math.abs(sk.D[1]) + Math.abs(sk.V[0]) + Math.abs(sk.V[1]) < 0.08) { sk.D = [0, 0]; sk.V = [0, 0]; sk.warp = null; }
        }
        for (const d of sk.drops) { d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 40 * dt; }
        sk.drops = sk.drops.filter(d => t - d.at < 1.4 && d.y < 39);
        if (sk.coin && t - sk.coin.at > 3) sk.coin = null;
        if (sk.grab) { const s = Math.hypot(sk.D[0], sk.D[1]); if (Math.floor(s) !== Math.floor(sk.lastS || 0)) c.sound.note(key + 12 + Math.floor(s), { dur: 0.05, vel: 0.06, wave: 'sine' }); sk.lastS = s; }
      } else {
        for (const tp of taps) {
          const tx = Math.floor(tp.x * N), ty = Math.floor(tp.y * N);
          if (!inp.down || tx < 0 || ty < 0 || tx >= N || ty >= N) continue;
          if (spr[ty * N + tx] >= 0 && t - legAt > 0.9) {
            legAt = t; legDir = tp.x < 0.5 ? -1 : 1;
            for (let k = 0; k < 6; k++) c.sound.note(key + 24 + maj[k % 5] + (k > 4 ? 12 : 0), { at: k * 0.07, dur: 0.6, vel: 0.08, wave: 'sine' });
          } else if (ty < 30 && !sf.drawing) { sf.drawing = true; sf.pts = [[tp.x * N, tp.y * N]]; c.sound.note(key + 24, { dur: 0.5, vel: 0.08, wave: 'sine' }); }
        }
        if (sf.drawing) {
          if (inp.down && P2) {
            const lp = sf.pts[sf.pts.length - 1];
            if (Math.hypot(P2[0] - lp[0], P2[1] - lp[1]) >= 3.5 && sf.pts.length < 9 && P2[1] < 30) { sf.pts.push(P2.slice()); c.sound.note(key + 24 + maj[sf.pts.length % 5] + (sf.pts.length > 4 ? 12 : 0), { dur: 0.6, vel: 0.08, wave: 'sine' }); }
          } else {
            sf.drawing = false;
            if (sf.pts.length >= 2) { sf.fly = sf.pts; sf.flyAt = t; for (const d of [0, 4, 7, 12]) c.sound.note(key + 12 + d, { dur: 1.2, vel: 0.06, wave: 'sine', attack: 0.2 }); }
            sf.pts = [];
          }
        }
        if (sf.fly && t - sf.flyAt > 1.3) { sf.fly = null; sf.absorbed = Math.min(6, sf.absorbed + 1); }
      }
    }
    function legendRoom(t) {
      if (legend === 'Dragon') {
        // a cave lit gold from below, the hoard heaped right across it
        // (everything that doesn't move is drawn once, into its own layer; each frame only the firelight's bands change)
        const ROCK = [[0x150d14, 0x1e131b, 0x2a1a22], [0x24151a, 0x331d22, 0x48282a], [0x3c2018, 0x542c20, 0x6e3c28]];
        if (!cave) {
          cave = { w: new Float32Array(N * N), n: new Uint8Array(N * N), top: new Int32Array(N * N).fill(-1) };
          for (let i = 0; i < N * N; i++) {
            const x = i % N, y = (i / N) | 0, n = hash2(x >> 2, (y + (x >> 2)) >> 1);
            cave.w[i] = 1.3 - Math.hypot(x + 0.5 - 20, (y - 20) * 1.2) / 22 + (hash2(x >> 1, y >> 1) - 0.5) * 0.16;
            cave.n[i] = (x * 5 + y * 3) % 23 === 0 ? 3 : n < 0.22 ? 0 : n > 0.82 ? 2 : 1;
          }
          L = cave.top;
          for (let k = 0; k < 7; k++) { const x = 2 + k * 6 + lvi(k + 5, 3), len = 3 + lvi(k + 9, 5); for (let y = 0; y < len; y++) { dot(x, y, 0x2e1c22); if (y < len - 2) dot(x + 1, y, 0x221418); } }
          for (let x = 0; x < N; x++) {
            const top = Math.round(hoardTop(x));
            for (let y = top; y < N; y++) {
              const r = hash2(x, y), edge = y === top;
              L[y * N + x] = edge ? 0xf8d860 : r < 0.12 ? 0x8c5c10 : (x + y * 2) % 4 === 0 ? 0xf0c040 : r > 0.86 ? 0xfff0a0 : y > top + 6 ? 0xb07818 : 0xd8a024;
            }
          }
          for (let k = 0; k < 8; k++) { const x = Math.floor(cosmos[k + 12][0] * 40), y = Math.round(hoardTop(x)) + 1 + lvi(k + 12, 6); dot(x, y, GEMS[k % 5]); dot(x + 1, y, mixC(GEMS[k % 5], 0, 0.35)); dot(x, y - 1, mixC(GEMS[k % 5], 0xffffff, 0.5)); }
          const gx = lv(20) < 0.5 ? 2 : 34, gy = Math.round(hoardTop(gx + 2)) - 4;
          fill(gx, gy, gx + 3, gy + 1, 0xf0c040); fill(gx + 1, gy + 2, gx + 2, gy + 3, 0xd0a030); fill(gx, gy + 4, gx + 3, gy + 4, 0xb08020); dot(gx + 1, gy, 0xe03048); dot(gx, gy, 0xfff0a0);
          const sx = gx < 20 ? 36 : 3, sy = Math.round(hoardTop(sx)) - 6;
          fill(sx, sy, sx, sy + 4, 0x8c5c30); fill(sx - 2, sy + 4, sx + 2, sy + 4, 0xd0a040); dot(sx, sy - 1, 0x3890f0); fill(sx, sy + 5, sx, sy + 7, 0xd8e0e8);
          L = back;
        }
        const fl = (Math.sin(t * 6.3) * 0.5 + Math.sin(t * 9.7) * 0.35) * 0.05 + dg.wake * 0.12;
        for (let i = 0; i < N * N; i++) {
          if (cave.top[i] >= 0) { L[i] = cave.top[i]; continue; }
          const w = cave.w[i] + fl, band = w > 0.78 ? 2 : w > 0.45 ? 1 : 0, n = cave.n[i];
          L[i] = ROCK[band][n === 3 ? (band ? 2 : 1) : n];
        }
      } else if (legend === 'Slime King') {
        // a throne hall: violet stone, a tall window of coloured glass, red velvet drapes and two torches
        for (let i = 0; i < N * N; i++) {
          const x = i % N, y = (i / N) | 0, row = y >> 2, off = row % 2 ? 3 : 0;
          L[i] = y % 4 === 3 || (x + off) % 6 === 0 ? 0x22163a : (x + y * 3) % 11 === 0 ? 0x3e2a5c : hash2(x >> 1, y) < 0.3 ? 0x2c1e48 : 0x342452;
        }
        for (let y = 1; y < 27; y++) for (let x = 9; x <= 30; x++) {
          const dx = x + 0.5 - 20, top = 9 - Math.sqrt(Math.max(0, 121 - dx * dx)) * 0.75;
          if (y < top - 1) continue;
          if (y < top || x === 9 || x === 30 || y === 26) { dot(x, y, 0xd0a040); continue; }
          const lead = (x - 10) % 5 === 4 || (y - 2) % 6 === 5 || Math.abs(dx) < 0.6;
          const pane = PANES[(Math.floor((x - 10) / 5) + Math.floor((y - 2) / 6) * 3) & 3];
          const shine = Math.sin(t * 1.3 - x * 0.25 - y * 0.15) > 0.92;
          dot(x, y, lead ? 0x1a1028 : shine ? mixC(pane, 0xffffff, 0.55) : (x + y) % 7 === 0 ? mixC(pane, 0xffffff, 0.25) : pane);
        }
        for (const s2 of [-1, 1]) for (let y = 0; y < N; y++) {
          const reach = 7 - (y > 14 && y < 24 ? Math.round(3 * Math.sin((y - 14) / 10 * Math.PI)) : 0);
          for (let k = 0; k < reach; k++) { const x = s2 < 0 ? k : 39 - k, fold = (k + (y > 20 ? 1 : 0)) % 3; dot(x, y, fold === 0 ? 0x7a1028 : fold === 1 ? 0xb82038 : 0xd83848); }
          if (y > 16 && y < 20) dot(s2 < 0 ? reach : 39 - reach, y, 0xf0c040);
        }
        for (let x = 0; x < N; x++) { fill(x, 0, x, 1, x % 4 === 1 ? 0xd83848 : 0xa01830); dot(x, 2, x % 2 ? 0xf0c040 : 0xa07818); }
        for (const tx of [7, 32]) {
          fill(tx, 15, tx + 1, 18, 0x5a3c24); dot(tx, 14, 0x8c6440); dot(tx + 1, 14, 0x8c6440);
          const f = Math.floor(t * 8 + tx) % 3;
          dot(tx, 13, 0xf09030); dot(tx + 1, 13, f ? 0xf8e070 : 0xf09030); dot(tx + (f === 2 ? 1 : 0), 12, 0xfff4b0); if (f) dot(tx + (f === 1 ? 0 : 1), 11, 0xf8b040);
        }
      } else {
        // the edge of the world at dusk: the sky in dithered bands, the first stars, a big moon
        if (!duskSky) {
          duskSky = new Int32Array(N * N);
          for (let i = 0; i < N * N; i++) {
            const x = i % N, y = (i / N) | 0, v = Math.max(0, y - 1) / 33 * 6, b0 = Math.min(6, Math.floor(v)), f = v - b0;
            const dith = [0, 8, 2, 10, 12, 4, 14, 6][(x & 3) + ((y & 1) << 2)] / 16;
            duskSky[i] = DUSK[Math.min(6, b0 + (f > 0.55 + dith * 0.4 ? 1 : 0))];
          }
        }
        L.set(duskSky);
        for (const [a, bq, ph] of cosmos) {
          const x = Math.floor(a * 40), y = Math.floor(bq * 17);
          const tw = Math.sin(t * (0.8 + bq * 2) + ph);
          if (tw > 0.2) dot(x, y, tw > 0.85 ? 0xffffff : y < 9 ? 0xc8c0f0 : 0xf0c8d8);
        }
        const mx = moonSide > 0 ? 33 : 6, my = 6;
        oval(mx, my, 4.6, 4.6, (x, y, u, v) => Math.hypot(u + 0.55 * moonSide, v + 0.3) < 0.85 ? L[y * N + x] : u * moonSide < -0.2 ? 0xfff4d8 : 0xf0dcb0);
        for (let k = 0; k < 3; k++) { const y = 15 + k * 5, x0 = ((t * (0.6 + k * 0.3) + k * 13 + lv(k) * 40) % 56) - 16; for (let x = 0; x < 12 + k * 3; x++) { dot(x0 + x, y, mixC(DUSK[3 + k], 0xffe0e8, 0.35)); if (x > 2 && x < 9 + k * 3) dot(x0 + x + 1, y - 1, mixC(DUSK[3 + k], 0xffe0e8, 0.2)); } }
      }
    }

    let legHy = 13;
    function legendKeeper(t, happy, b, blink) {
      const hy = 13 + b, eyeY = hy + 1, since = t - legAt;
      legHy = hy;
      const look = ptr ? Math.max(-1, Math.min(1, Math.round((ptr[0] - 20) / 7))) : 0;
      if (legend === 'Dragon') {
        // a dragon asleep on its hoard: wings folded up behind it like a cloak, its head down on its claws
        const GOLD = 0xf0c040, GOLDD = 0xb08020, IVORY = 0xf4ecd8, IVD = 0xc8b890;
        const w = dg.wake, br = Math.sin(t * (w > 0.5 ? 3 : 1.25)) * (w > 0.5 ? 0.3 : 0.7), lift = Math.round(w * 3), ey = 24 - lift;
        for (const s2 of [-1, 1]) {
          const S = [20 + s2 * 8, 21], T = [20 + s2 * (15 + w * 3), 4 - w * 3 + br * 0.4], B2 = [20 + s2 * (18.5 + w * 1.5), 26], M = [20 + s2 * (13.5 + w * 2), 12];
          tri(S, T, B2, (x, y) => (Math.abs((x - S[0]) * (M[1] - S[1]) - (y - S[1]) * (M[0] - S[0])) < 9) ? WINGC[1] : WINGC[0]);
          seg(S[0], S[1], T[0], T[1], SKIN[2], s2); seg(T[0], T[1], B2[0], B2[1], WINGC[2]); seg(T[0], T[1], M[0] + s2 * 2, 25, WINGC[2]);
          dot(T[0], T[1] - 1, IVORY); dot(T[0] + s2, T[1] - 2, IVORY);
        }
        // the great body behind, in its own shadow, breathing; a ridge of gold spines along its back
        const ry = 9.5 + br * 0.5, BODY = [0x3c9460, 0x2a7448, 0x1a5034];
        for (let y = 12; y < 33; y++) {
          const v = (y - 23.5) / ry; if (Math.abs(v) > 1) continue;
          const half = 12.5 * Math.sqrt(1 - v * v);
          for (let x = Math.round(20 - half); x < Math.round(20 + half); x++) { const u = (x + 0.5 - 20) / half; dot(x, y, u < -0.5 && v < 0 ? BODY[0] : u > 0.55 || v > 0.6 ? BODY[2] : ((x + (y >> 1) * 2) % 4 === 0 && y % 2 === 0) ? BODY[2] : BODY[1]); }
        }
        for (let x = 10; x <= 30; x += 3) { const v = (x + 0.5 - 20) / 12.5, top = Math.round(23.5 - ry * Math.sqrt(Math.max(0, 1 - v * v))); dot(x, top - 1, GOLD); if (Math.abs(x - 20) < 6) dot(x, top - 2, GOLDD); dot(x + 1, top - 1, GOLDD); }
        // forepaws on the gold, ivory claws
        for (const px of [9, 26]) { fill(px, 30, px + 5, 34, SKIN[1]); fill(px, 30, px + 5, 30, SKIN[0]); fill(px + 5, 31, px + 5, 34, SKIN[2]); fill(px, 30, px, 34, 0x1a5034); for (const k of [0, 2, 4]) { dot(px + k, 35, IVORY); dot(px + k + 1, 35, IVD); } }
        for (const s2 of [-1, 1]) { tri([20 + s2 * 7, ey + 1], [20 + s2 * 12.5, ey - 2], [20 + s2 * 8, ey + 5], (x, y) => (x + y) % 3 === 0 ? WINGC[2] : WINGC[1]); }
        // the head, low and long, its chin on its claws, ringed in a dark line so it stands off the body
        const HW = [3.5, 5.5, 7, 7.8, 8, 8, 7.6, 6.8, 6.2, 6, 5.8, 5.6, 5.2, 4.4];
        HW.forEach((hw, r) => { const y = ey - 5 + r; for (let x = Math.round(20 - hw - 1); x < Math.round(20 + hw + 1); x++) dot(x, y, 0x123222); });
        for (let x = Math.round(20 - HW[0]); x < Math.round(20 + HW[0]); x++) dot(x, ey - 6, 0x123222);
        HW.forEach((hw, r) => { const y = ey - 5 + r; for (let x = Math.round(20 - hw); x < Math.round(20 + hw); x++) { const u = (x + 0.5 - 20) / hw; dot(x, y, r > 7 && Math.abs(u) < 0.45 ? (r % 2 ? 0x9ce8b0 : 0x78d090) : u < -0.45 && r < 7 ? SKIN[0] : u > 0.6 || r > 12 ? SKIN[2] : (x * 3 + y * 5) % 11 === 0 ? SKIN[2] : SKIN[1]); } });
        for (let k = 0; k < 3; k++) { dot(20, ey - 6 + k * 1.5, k % 2 ? GOLDD : GOLD); dot(19, ey - 5 + k * 1.5, GOLDD); }
        // horns sweeping back over the body, from the top of the head
        for (const s2 of [-1, 1]) for (let k = 0; k <= 12; k++) {
          const a = k / 12, x = 20 + s2 * (4 + 8.5 * a + a * a * 2), y = ey - 5 - 12 * a + a * a * 3.5;
          dot(x, y, a > 0.75 ? IVORY : k % 3 === 0 ? 0xa89878 : IVD); if (a < 0.7) dot(x - s2, y + 1, a < 0.3 ? 0xa89878 : IVD); if (a < 0.4) dot(x - s2, y, IVD);
        }
        // eyes: shut lids when it sleeps, a glowing crack when it stirs, burning slits that follow you when it wakes
        const lk = dg.coin ? dg.coin : ptr, lx = lk ? Math.max(-1, Math.min(1, Math.round((lk[0] - 20) / 6))) : 0;
        for (const [ex, s2] of [[14, -1], [23, 1]]) {
          fill(ex, ey - 2, ex + 2, ey - 2, SKIN[2]); dot(ex + (s2 < 0 ? 2 : 0), ey - 1, SKIN[2]);
          if (w < 0.25) { fill(ex, ey - 1, ex + 2, ey - 1, SKIN[0]); fill(ex, ey, ex + 2, ey, 0x123222); dot(ex + (s2 < 0 ? 0 : 2), ey + 1, 0x123222); }
          else if (w < 0.75) { fill(ex, ey, ex + 2, ey, Math.sin(t * 9) > 0 ? 0xffc020 : 0xf08020); dot(ex + 1 + lx, ey, LINE); }
          else { fill(ex, ey - 1, ex + 2, ey, Math.sin(t * 6) > 0 ? 0xfff070 : 0xffc020); dot(ex + 1 + lx, ey - 1, LINE); dot(ex + 1 + lx, ey, LINE); }
        }
        dot(17, ey + 6, LINE); dot(22, ey + 6, LINE);
        const fire = t - dg.fireT < 1.1;
        if (fire) { fill(16, ey + 7, 23, ey + 8, 0x601828); for (let x = 16; x <= 23; x += 2) { dot(x, ey + 7, IVORY); dot(x + 1, ey + 8, IVORY); } }
        else { fill(16, ey + 8, 23, ey + 8, LINE); dot(17, ey + 9, IVORY); dot(22, ey + 9, IVORY); }
      } else if (legend === 'Slime King') {
        // a great royal jelly, see-through: the hall's coloured window glows through it
        const wb = sk.wob * Math.exp(-(t - sk.wobAt) * 3) * Math.sin((t - sk.wobAt) * 15);
        const jig = (since < 1.4 ? Math.sin(since * 16) * Math.exp(-since * 3) * 2.2 : 0) + wb * 3, breathe = Math.sin(t * 2.4) * 0.6;
        const pullX = sk.grab ? Math.max(-1.6, Math.min(1.6, sk.D[0] / 6)) : 0;
        const lean = sk.grab ? pullX : ptr ? Math.max(-1.6, Math.min(1.6, (ptr[0] - 20) / 6)) : Math.sin(t * 0.7) * 0.5, top = hy - 5 + Math.round(-breathe * 0.6 - jig * 0.5);
        const jellyAt = (x, y, edge, u) => edge ? (u > 0 ? JELLY[2] : JELLY[1]) : glass(back[y * N + x], u > 0.5 ? 1 : 0);
        // pulled: a long gooey arm reaches out of it after the finger, a bulb of jelly at its end (drawn first, the body covers its root)
        const DL = Math.hypot(sk.D[0], sk.D[1]);
        if (sk.warp && DL > 1.2) {
          const g0 = sk.warp[0], g1 = sk.warp[1], steps = Math.ceil(DL * 2);
          for (let k = 0; k <= steps; k++) {
            const sF = k / steps, cx = g0 + sk.D[0] * sF, cy = g1 + sk.D[1] * sF, r = sF > 0.85 ? 2.9 : 3.3 - 1.4 * sF;
            for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
              if (x < 0 || y < 0 || x >= N || y >= N) continue;
              const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (d > r) continue;
              const edge = d > r - 0.9, hl = (x + 0.5 - cx) + (y + 0.5 - cy) < -r * 0.5 && d > r * 0.35 && !edge;
              dot(x, y, hl ? JELLY[0] : jellyAt(x, y, edge, (x + 0.5 - cx) / r));
            }
          }
        }
        for (let y = top; y < 34; y++) {
          const k = (y - top) / (34 - top), w = (5 + Math.sqrt(k) * 12.5) * (1 + (jig + breathe) * 0.04 * (1 - k * 2)), cx = 20 + lean * (1 - k) * 1.6;
          for (let x = Math.round(cx - w); x < Math.round(cx + w); x++) {
            if (x < 0 || x >= N) continue;
            const u = (x + 0.5 - cx) / w, rim = Math.abs(u) > 0.86 || y === top;
            let cc = jellyAt(x, y, rim, u);
            if (rim && y === top) cc = JELLY[2];
            if ((u < -0.52 && u > -0.72 && k > 0.12 && k < 0.6) || (y === top + 1 && u > -0.45 && u < 0.1)) cc = JELLY[0];
            if (y === top + 2 && u > -0.62 && u < -0.5) cc = 0xffffff;
            dot(x, y, cc);
          }
        }
        const sink2 = cc => mixC(cc, JELLY[1], 0.25);
        const bob = k => Math.round(Math.sin(t * 0.8 + k * 1.7) * 1);
        for (let k = 0; k < 7; k++) { dot(9 + k, 29 - k + bob(0), k < 2 ? sink2(0x8c6440) : k === 2 ? sink2(0xd0a040) : sink2(0xe8eef4)); if (k > 2) dot(10 + k, 29 - k + bob(0), sink2(0x8890a0)); }
        dot(10, 26 + bob(0), sink2(0xd0a040)); dot(13, 29 + bob(0), sink2(0xd0a040));
        oval(28, 23 + bob(1), 1.7, 1.7, sink2(0xf0c040)); dot(27, 22 + bob(1), sink2(0xfff0a0)); dot(28, 23 + bob(1), sink2(0xb08020));
        fill(22, 28 + bob(2), 26, 28 + bob(2), sink2(0xd0a040)); dot(26, 29 + bob(2), sink2(0xd0a040)); dot(24, 29 + bob(2), sink2(0xd0a040)); oval(21, 28 + bob(2), 1.4, 1.4, sink2(0xd0a040));
        for (let k = 0; k < 6; k++) { const ph = (t * 0.3 + k * 0.19) % 1, x = 12 + k * 3.2 + Math.sin(t * 2 + k) * 0.7, y = 33 - ph * 20; if (y > top + 3) dot(x, y, JELLY[0]); }
        for (let k = 0; k < 10; k++) dot(31 + k * 0.45, 26 - k, k < 4 ? 0xb08020 : 0xf0c040);
        oval(35.6, 15.5, 1.5, 1.5, 0xe03048); dot(35, 15, 0xffb0c0);
        // the face, drawn to read over the glass: dark-ringed white eyes with a pupil that watches the finger (or the hand
        // being pulled out of it), rosy cheeks, a smug grin; pulled, the eyes go wide and the mouth makes an O
        const fx0 = Math.round(lean * 1.1), fy = Math.min(eyeY + 2, top + 10), pulled = sk.grab && DL > 3;
        const tgt = sk.warp && DL > 1.2 ? [sk.warp[0] + sk.D[0], sk.warp[1] + sk.D[1]] : ptr, lx = tgt ? (tgt[0] > 20 + fx0 ? 1 : 0) : (Math.floor(t / 2.3) % 2), ly = tgt && tgt[1] < fy ? -1 : 0;
        const RING = 0x0a2418;
        for (const ex of [14, 22]) {
          const e0 = ex + fx0;
          if (blink && !pulled) { fill(e0, fy, e0 + 3, fy, RING); continue; }
          const w = pulled ? 1 : 0;
          fill(e0 - w, fy - 2 - w, e0 + 3 + w, fy + 1 + w, RING);
          fill(e0 + 1 - w, fy - 1 - w, e0 + 2 + w, fy + w, 0xffffff);
          dot(e0 + 1 + lx * (1 + w) - (w && !lx ? 1 : 0), fy + ly + (w ? 0 : 0), 0x0a2418);
        }
        dot(12 + fx0, fy + 3, 0xf890b0); dot(13 + fx0, fy + 3, 0xf890b0); dot(26 + fx0, fy + 3, 0xf890b0); dot(27 + fx0, fy + 3, 0xf890b0);
        if (pulled) { oval(20 + fx0, fy + 5, 2, 1.8, RING); dot(20 + fx0, fy + 5, 0xc04858); }
        else if (happy || since < 1) { fill(17 + fx0, fy + 4, 22 + fx0, fy + 4, RING); fill(18 + fx0, fy + 5, 21 + fx0, fy + 5, 0xc04858); dot(16 + fx0, fy + 3, RING); dot(23 + fx0, fy + 3, RING); }
        else { fill(18 + fx0, fy + 4, 21 + fx0, fy + 4, RING); dot(17 + fx0, fy + 3, RING); dot(22 + fx0, fy + 3, RING); dot(22 + fx0, fy + 5, JELLY[1]); }
        const cx0 = Math.round(20 + lean * 1.6), cy = top - 1;
        fill(cx0 - 6, cy - 1, cx0 + 5, cy + 1, 0xf0c040); fill(cx0 - 6, cy + 1, cx0 + 5, cy + 1, 0xb08020); fill(cx0 - 6, cy - 1, cx0 + 5, cy - 1, 0xfff0a0);
        for (const [px, h] of [[-6, 3], [-3, 4], [-1, 5], [2, 4], [5, 3]]) { for (let k = 1; k < h; k++) { dot(cx0 + px, cy - 1 - k, 0xf0c040); if (k < h - 1) dot(cx0 + px + (px < 0 ? 1 : -1), cy - 1 - k, 0xd0a030); } dot(cx0 + px, cy - 1 - h, 0xfff8e8); }
        for (let x = cx0 - 6; x <= cx0 + 5; x++) dot(x, cy - 2, 0xf0c040);
        const gl = Math.floor(t * 2) % 4;
        [[cx0 - 4, 0xe03048], [cx0 - 1, 0x40c0f0], [cx0 + 3, 0x40d070]].forEach(([x, cc], k) => dot(x, cy, gl === k ? 0xffffff : cc));
      } else {
        // a tall hooded shape cut out of the night itself, a galaxy turning in its chest
        const inside = [];
        const tipX = 20 + Math.round(Math.sin(t * 0.9) * 1.2);
        for (let y = hy - 13; y < 34; y++) {
          const r = y - hy;
          const w = r < -7 ? (r + 13) * 0.62 : r < 6 ? Math.sqrt(Math.max(0, 1 - ((r - 0.5) / 7.5) ** 2)) * 4 + 4.2 : r < 9 ? 8.2 + (r - 6) * 1.5 : Math.min(19, 12.7 + (r - 9) * 0.55);
          const cx = r < -7 ? 20 + (-7 - r) * 0.55 * (tipX >= 20 ? 1 : -1) * (1 + Math.abs(tipX - 20) * 0.4) : 20;
          for (let x = Math.round(cx - w); x < Math.round(cx + w); x++) dot(x, y, 0x0c0a2a);
        }
        if (!neb) {
          neb = { s1: new Float32Array(N * N), c1: new Float32Array(N * N), s2: new Float32Array(N * N), c2: new Float32Array(N * N) };
          for (let i = 0; i < N * N; i++) { const x = i % N, y = (i / N) | 0, a = x * 0.3 + y * 0.22, b2 = y * 0.27 - x * 0.16; neb.s1[i] = Math.sin(a); neb.c1[i] = Math.cos(a); neb.s2[i] = Math.sin(b2); neb.c2[i] = Math.cos(b2); }
        }
        const s1 = Math.sin(t * 0.25), c1 = Math.cos(t * 0.25), s2 = Math.sin(t * 0.1), c2 = Math.cos(t * 0.1);
        for (let i = 0; i < N * N; i++) {
          if (spr[i] < 0) continue;
          const x = i % N, y = (i / N) | 0;
          const n = (neb.s1[i] * c1 + neb.c1[i] * s1) * (neb.s2[i] * c2 - neb.c2[i] * s2);
          let cc = n > 0.55 ? 0x5a2c90 : n > 0.2 ? 0x2e2070 : n < -0.55 ? 0x10385a : 0x14124a;
          const d = ptr ? Math.hypot(x + 0.5 - ptr[0], y + 0.5 - ptr[1]) : 99;
          if (d < 5) cc = mixC(cc, 0x8a6ae0, (1 - d / 5) * 0.6);
          spr[i] = cc; inside.push(i);
        }
        for (const [a, bq, ph] of cosmos.slice(0, 22)) {
          const i = inside[Math.floor(((a * 7.31) % 1) * inside.length)];
          if (i === undefined) continue;
          const tw = Math.sin(t * (1 + bq * 1.5) + ph);
          if (tw > 0) spr[i] = tw > 0.7 ? 0xffffff : 0xb8b0ff;
        }
        const CON = [[11, 30], [14, 26], [17, 28], [15, 32], [24, 27], [27, 30], [30, 26]];
        for (let k = 0; k < CON.length - 1; k++) if (k !== 3) { const [x0, y0] = CON[k], [x1, y1] = CON[k + 1]; const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let j = 1; j < n; j++) { const x = Math.round(x0 + (x1 - x0) * j / n), y = Math.round(y0 + (y1 - y0) * j / n); if (spr[y * N + x] >= 0) spr[y * N + x] = 0x4c4498; } }
        CON.forEach(([x, y], k) => { if (spr[y * N + x] >= 0) spr[y * N + x] = Math.sin(t * 2 + k) > 0 ? 0xffffff : 0xd8d0ff; });
        for (let y = 0; y < N; y++) { let x0 = -1, x1 = -1; for (let x = 0; x < N; x++) if (spr[y * N + x] >= 0) { if (x0 < 0) x0 = x; x1 = x; } if (x0 < 0) continue; const x = moonSide > 0 ? x1 : x0; spr[y * N + x] = y % 3 ? 0xb0a0f0 : 0xe0d8ff; }
        oval(20, hy + 1.2, 6.3, 6.3, (x, y, u, v) => u * moonSide > 0.2 ? 0xd8d0ff : 0x9a88e8);
        oval(20, hy + 1.4, 5.1, 5.3, 0x04030f);
        // a galaxy turning in the chest: every constellation it takes in makes it bigger and brighter
        const gx = 20, gy = hy + 12, arms = 16 + sf.absorbed * 3, fed = sf.fly ? Math.min(1, (t - sf.flyAt) / 1.3) : 0;
        for (let k = 0; k < arms; k++) for (const arm of [0, Math.PI]) { const r = k * 0.3, a = arm + k * 0.5 + t * (0.6 + fed * 2); dot(gx + Math.cos(a) * r * 1.5, gy + Math.sin(a) * r * 0.8, k < 3 + sf.absorbed ? 0xffffff : k < 9 + sf.absorbed ? 0xf0d0ff : 0xa080e8); }
        for (const ex of [17, 23]) {
          if (happy || fed > 0.6) { dot(ex - 1, eyeY + 1, 0xfff8c0); dot(ex, eyeY, 0xfff8c0); dot(ex + 1, eyeY + 1, 0xfff8c0); continue; }
          if (blink) { dot(ex, eyeY, 0x8c7cd0); continue; }
          const p = Math.sin(t * 2.2 + ex) > 0.3;
          dot(ex + look, eyeY, 0xffffff); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) dot(ex + look + dx, eyeY + dy, p ? 0xfff8c0 : 0xe0d8a0);
        }
        // a small ringed world going round the hood, and its moon
        for (const [ph, r, sp, kind] of [[0, 1, 0.55, 0], [2.6, 0, 0.9, 1]]) {
          const a = t * sp + ph + lv(6) * 6, x = Math.round(20 + Math.cos(a) * (12 + r * 2)), y = Math.round(hy - 1 + Math.sin(a) * (4 + r));
          if (Math.sin(a) < 0 && y >= 0 && spr[y * N + x] >= 0) continue;
          if (kind === 0) { oval(x + 0.5, y + 0.5, 1.6, 1.6, (xx, yy, u, v) => u + v < -0.5 ? 0xfff0c8 : 0xf0a060); for (const k of [-3, -2, 2, 3]) dot(x + k, y + (k < 0 ? 1 : 0), 0xfff4e0); }
          else { dot(x, y, 0xe8f0ff); dot(x + 1, y, 0xa8b8e0); }
        }
      }
    }
    // the hall seen through the jelly: each colour mixed once and kept
    const glassMemo = new Map(), glass = (bg, side) => { const k = bg * 2 + side; let v = glassMemo.get(k); if (v === undefined) { v = mixC(bg, side ? JELLY[2] : JELLY[1], 0.4); glassMemo.set(k, v); } return v; };
    function legendCounter(t) {
      if (legend === 'Dragon') {
        // no counter: the hoard runs right down to the front, a goblet and gems in it, and its tail curled round
        if (!slab) {
          slab = new Int32Array(N * N).fill(-1); L = slab;
          for (let x = 0; x < N; x++) { const h = 35 + Math.round(Math.sin(x * 0.6 + lv(7) * 6) * 1.3 + Math.sin(x * 1.7) * 0.6); for (let y = h; y < N; y++) dot(x, y, y === h ? 0xf8d860 : hash2(x, y) < 0.15 ? 0x8c5c10 : (x + y * 2) % 4 === 0 ? 0xf0c040 : hash2(x + 9, y) > 0.85 ? 0xfff0a0 : 0xd0981c); }
          for (let k = 0; k < 5; k++) { const x = 3 + k * 8 + lvi(k + 16, 3), y = 37 + (k % 2); dot(x, y, GEMS[(k + 2) % 5]); dot(x + 1, y, mixC(GEMS[(k + 2) % 5], 0, 0.35)); }
          L = front;
        }
        for (let i = 33 * N; i < N * N; i++) if (slab[i] >= 0) front[i] = slab[i];
        // the tail, curled along the front of the hoard, its spade tip twitching
        const tw = Math.round(Math.sin(t * (dg.wake > 0.5 ? 6 : 0.8)) * (dg.wake > 0.5 ? 1.5 : 0.6));
        for (let k = 0; k < 26; k++) { const a = k / 25, x = 37 - a * 26, y = 31 + Math.sin(a * Math.PI) * 4 + a * 1.2; dot(x, y, SKIN[1]); dot(x, y + 1, SKIN[2]); if (k % 3 === 0 && k < 24) dot(x, y - 1, 0xf0c040); }
        tri([9, 34 + tw], [13, 32 + tw], [10.5, 37 + tw], SKIN[1]); dot(10, 34 + tw, SKIN[0]);
      } else if (legend === 'Slime King') {
        fill(0, 29, 39, 39, 0x4a1c5c); fill(0, 29, 39, 30, 0xf0c040); fill(0, 30, 39, 30, 0xb08020); fill(0, 38, 39, 38, 0xf0c040); fill(0, 39, 39, 39, 0xb08020);
        for (let y = 31; y < 38; y++) for (let x = 0; x < N; x++) if ((x + y) % 6 === 0 || (x - y + 60) % 6 === 0) dot(x, y, 0x6a2c80);
        for (let x = 1; x < N; x += 6) for (let y = 31; y < 38; y++) if ((x + y) % 6 === 0) dot(x, y, 0xf0c040);
        for (let x = 6; x < 34; x++) { dot(x, 29, JELLY[1]); if (x > 8 && x < 31) dot(x, 30, JELLY[2]); }
        for (let k = 0; k < 6; k++) {
          const x = 8 + k * 4.4 + lvi(k + 22, 2), sp = 0.35 + cosmos[k + 22][2] * 0.05, ph = (t * sp + cosmos[k + 22][0]) % 1, len = Math.floor(ph * 9);
          for (let y = 30; y < 31 + Math.min(len, 6); y++) dot(x, y, JELLY[1]);
          dot(x, 31 + len, len >= 6 ? JELLY[0] : JELLY[2]);
        }
      } else {
        // no counter: a bank of dusk cloud, drifting, the wares resting on it
        // (the bank repeats every 7.5 seconds: each quarter-step of its drift is drawn once and kept)
        const step = Math.floor(t * 3.2) % 24;
        if (!clouds[step]) {
          const off = step / 4, puffs = [], layer = new Int32Array(N * N).fill(-1);
          for (let k = -1; k < 8; k++) { const r = 4.2 + ((k + 3) % 3) * 0.7; puffs.push(k * 6 + ((off + k * 2.3) % 6), 31 + (k & 1) * 1.5 + Math.sin(k * 1.9) * 0.8, 1 / (r * r)); }
          for (let y = 26; y < N; y++) for (let x = 0; x < N; x++) {
            let best = 81;
            for (let k = 0; k < puffs.length; k += 3) { const dx = x + 0.5 - puffs[k], dy = (y + 0.5 - puffs[k + 1]) * 1.25, q = (dx * dx + dy * dy) * puffs[k + 2]; if (q < best) best = q; }
            best = Math.sqrt(best);
            if (best > 1 && y < 34) continue;
            const lit2 = y < 30 ? 0 : y < 33 ? 1 : y < 36 ? 2 : 3;
            layer[y * N + x] = [0xfff0f4, 0xf4c8dc, 0xc8a0d0, 0x9c7cc0][Math.min(3, lit2 + (best > 0.8 && y > 29 ? 1 : 0))];
          }
          clouds[step] = layer;
        }
        const cl = clouds[step];
        for (let i = 26 * N; i < N * N; i++) if (cl[i] >= 0) front[i] = cl[i];
      }
    }
    function legendHands(t) {
      if (legend === 'Starfolk') for (const hx0 of [9, 28]) {
        fill(hx0 - 1, 27, hx0 + 2, 29, 0x14104a); dot(hx0, 28, Math.sin(t * 3 + hx0) > 0 ? 0xffffff : 0xfff0a0); dot(hx0 + 1, 28, 0xd8d0ff);
      }
    }
    // after the merge, unoutlined: the dragon's smoke, fire, glints and the thief's coin; the starfolk's constellations
    function legendOver(t) {
      const put = (x, y, cc) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < N && y >= 0 && y < N) { const i = (y * N + x) * 4; img.data[i] = cc >> 16 & 255; img.data[i + 1] = cc >> 8 & 255; img.data[i + 2] = cc & 255; } };
      const bgp = (x, y) => { x = Math.round(x); y = Math.round(y); return x >= 0 && x < N && y >= 0 && y < N && sprite[y * N + x] < 0; };
      if (legend === 'Dragon') {
        const ey = 24 - Math.round(dg.wake * 3);
        // asleep: rings of smoke from its nostrils drift up and away
        if (dg.wake < 0.5) for (let k = 0; k < 3; k++) {
          const ph = (t * 0.32 + k / 3) % 1, x = 20 + (k - 1) * 3 + Math.sin(ph * 6 + k) * 1.5, y = ey + 4 - ph * 26, r = 0.6 + ph * 1.6, cc = ph < 0.4 ? 0xc8c0c8 : ph < 0.7 ? 0x9a909c : 0x6c6070;
          if (ph < 0.12) continue;
          for (let a = 0; a < 8; a++) { const xx = x + Math.cos(a * 0.785) * r, yy = y + Math.sin(a * 0.785) * r * 0.7; if (bgp(xx, yy)) put(xx, yy, cc); }
        }
        for (let k = 0; k < 6; k++) { const ph = (t * (0.18 + cosmos[k + 25][2] * 0.02) + cosmos[k + 25][0]) % 1, x = Math.round(cosmos[k + 25][1] * 38 + 1 + Math.sin(t * 2 + k) * 1.2), y = Math.round(36 - ph * 36); if (bgp(x, y) || y < 4) put(x, y, ph > 0.7 ? 0xc04020 : ph > 0.4 ? 0xf08030 : 0xffd060); }
        for (const [gx, sp, ph] of glints) { const s = Math.sin(t * (1.2 + sp * 1.6) + ph); if (s < 0.75) continue; const gy = Math.round(hoardTop(gx)) + 1 + Math.floor(sp * 8); if (!bgp(gx, gy)) continue; put(gx, gy, 0xffffff); if (s > 0.93) { put(gx - 1, gy, 0xfff4b0); put(gx + 1, gy, 0xfff4b0); put(gx, gy - 1, 0xfff4b0); } }
        // fire, from its jaws to where the thief's hand was
        const fu = t - dg.fireT;
        if (fu < 1.1) {
          const mx = 20, my = ey + 8, tx = dg.fireTo[0], ty = dg.fireTo[1], L2 = Math.hypot(tx - mx, ty - my) || 1, reach = Math.min(1, fu / 0.25) * L2;
          for (let k = 0; k < reach; k += 0.5) {
            const x = mx + (tx - mx) * k / L2, y = my + (ty - my) * k / L2, half = 0.5 + k * 0.12;
            for (let d = -half; d <= half; d += 0.7) { const n = (Math.floor(x * 7 + d * 13 + t * 30)) % 5; if (n === 4 && k > 3) continue; put(x - (ty - my) / L2 * d, y + (tx - mx) / L2 * d, k < 3 || n === 0 ? 0xfff0a0 : Math.abs(d) > half - 0.8 ? 0xe04020 : 0xf09030); }
          }
        }
        // the coin in the thief's hand, or falling back into the hoard
        const coin = (x, y) => { put(x, y, 0xfff0a0); put(x + 1, y, 0xf0c040); put(x, y + 1, 0xf0c040); put(x + 1, y + 1, 0xb08020); put(x - 1, y, 0x8c5c10); put(x + 2, y + 1, 0x8c5c10); };
        if (dg.coin && dg.hold) coin(Math.round(dg.coin[0]), Math.round(dg.coin[1]) - 1);
        if (dg.drop) { const u = (t - dg.drop.at) / 0.45; if (u > 1) dg.drop = null; else coin(Math.round(dg.drop.from[0]), Math.round(dg.drop.from[1] + u * u * 6)); }
        // the stolen ones, heaped in the corner
        for (let k = 0; k < dg.loot; k++) { const x = 2 + (k % 4) * 3, y = 5 - Math.floor(k / 4) * 2; coin(x, y); if (k === dg.loot - 1 && t - dg.lootAt < 0.8) { const r = 1 + Math.floor((t - dg.lootAt) * 5); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(x + dx * r, y + dy * r, 0xfff4b0); } }
      } else if (legend === 'Slime King') {
        // drops of jelly flung off the arm, and the crown's coin bouncing along the counter
        for (const d of sk.drops) { put(d.x, d.y, t - d.at < 0.5 ? JELLY[0] : JELLY[1]); put(d.x - d.vx * 0.02, d.y - d.vy * 0.02, JELLY[1]); }
        if (sk.coin) {
          const u = t - sk.coin.at, x = Math.max(3, Math.min(36, sk.coin.x0 + sk.coin.dir * u * 6)), y = 26 - Math.abs(Math.sin(u * 5)) * 11 * Math.exp(-u * 1.1) - (u < 0.3 ? (0.3 - u) * 20 : 0), wide = u > 2.2 || Math.floor(u * 10) % 2;
          const cx = Math.round(x), cy = Math.round(y), w = wide ? 1 : 0;
          for (let dy = -2; dy <= 2; dy++) for (let dx = -1 - w; dx <= 1 + w; dx++) {
            const edge = Math.abs(dy) === 2 || Math.abs(dx) === 1 + w;
            if (Math.abs(dy) === 2 && Math.abs(dx) === 1 + w) continue;
            put(cx + dx, cy + dy, edge ? 0x6c4410 : dx < 0 && dy < 0 ? 0xfff0a0 : 0xf0c040);
          }
          if (wide) put(cx, cy, 0xb08020);
        }
      } else if (legend === 'Starfolk') {
        const p = (t % 7) / 7;
        if (p < 0.16) { const u = p / 0.16, x0 = Math.round((moonSide > 0 ? 2 : 37) + moonSide * u * 26), y0 = Math.round(2 + u * 9); for (let k = 0; k < 5; k++) { const x = x0 - moonSide * k, y = y0 - Math.round(k * 0.4); if (bgp(x, y)) put(x, y, k === 0 ? 0xffffff : k < 2 ? 0xffe8f0 : 0xd8a0c0); } }
        // the constellation being drawn: stars where you passed, lines between them
        const star = (x, y, big) => { put(x, y, 0xffffff); if (big) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(x + dx, y + dy, 0xfff8c0); };
        const lineTo = (a, b2, cc) => { const n = Math.max(Math.abs(b2[0] - a[0]), Math.abs(b2[1] - a[1])); for (let j = 1; j < n; j++) put(a[0] + (b2[0] - a[0]) * j / n, a[1] + (b2[1] - a[1]) * j / n, cc); };
        const pts = sf.pts.slice(); if (sf.drawing && ptr) pts.push(ptr);
        for (let k = 1; k < pts.length; k++) lineTo(pts[k - 1], pts[k], k === pts.length - 1 && sf.drawing ? 0x7c6cd0 : 0xb8a8ff);
        sf.pts.forEach(([x, y], k) => star(x, y, Math.sin(t * 5 + k) > -0.3));
        // let go: the stars fly into its chest, trailing light
        if (sf.fly) {
          const u = Math.min(1, (t - sf.flyAt) / 1.3), e = u * u * (3 - 2 * u), gx = 20, gy = legHy + 12;
          const at = sf.fly.map(([x, y], k) => [x + (gx - x) * Math.min(1, e * (1 + k * 0.08)), y + (gy - y) * Math.min(1, e * (1 + k * 0.08))]);
          if (u < 0.5) for (let k = 1; k < at.length; k++) lineTo(at[k - 1], at[k], 0x8c7ce0);
          at.forEach(([x, y]) => { star(x, y, u < 0.85); put(x + (x - gx) * 0.12, y + (y - gy) * 0.12, 0x9c8ce8); });
        }
      }
    }
    function x5(r) { return r % 3 === 2 ? 0x2c1c44 : 0x3c2858; }

    function counter(t) {
      L = front;
      front.fill(-1);
      if (legend !== 'None') legendCounter(t);
      else if (counterKind === 'Market Stall') {
        // a board on trestles, a striped cloth hung in front with a scalloped hem
        fill(0, 29, 39, 30, 0xc89868); fill(0, 29, 39, 29, 0xe8c088); fill(0, 31, 39, 31, 0x6c4428);
        for (let x = 0; x < N; x++) { const st = STALL[Math.floor(x / 4) % 2], hem = 36 + (x % 4 === 1 || x % 4 === 2 ? 1 : 0); fill(x, 32, x, hem, (x % 4 === 3) ? sink(st, 0.82) : st); }
      } else if (counterKind === 'Stone Arch') {
        // a stone slab on dressed blocks
        fill(0, 29, 39, 31, 0xa8a4a0); fill(0, 29, 39, 29, 0xd0ccc4); fill(0, 32, 39, 32, 0x5c5854);
        for (let y = 33; y < N; y++) for (let x = 0; x < N; x++) { const off = Math.floor((y - 33) / 3) % 2 ? 4 : 0; dot(x, y, (y - 33) % 3 === 2 || (x + off) % 8 === 0 ? 0x5c5854 : (x + off) % 8 === 1 || (y - 33) % 3 === 0 ? 0x9c9890 : 0x8c8884); }
        for (let x = 3; x < N; x += 7) dot(x, 30, 0x8c8884);
      } else if (counterKind === 'Crates') {
        // three shipping crates of different heights, nailed and braced
        for (const [x0, x1, top] of [[0, 12, 28], [13, 26, 30], [27, 39, 26]]) {
          fill(x0, top, x1, 39, 0xc89858);
          for (let y = top + 3; y < 39; y += 3) fill(x0, y, x1, y, 0xa87c44);
          for (let k = 0; k <= 39 - top - 3; k++) { const x = Math.round(x0 + 1 + (x1 - x0 - 2) * k / (39 - top - 3)); dot(x, 38 - k, 0x8c6034); }
          fill(x0, top, x1, top, 0xe8c080); fill(x0, top + 1, x1, top + 1, 0x8c6034); fill(x0, top, x0, 39, 0x7c5028); fill(x1, top, x1, 39, 0x7c5028);
          dot(x0 + 1, top + 2, 0x3c2414); dot(x1 - 1, top + 2, 0x3c2414);
        }
        for (let k = 0; k < 4; k++) dot(28 + k * 3, 32, 0x5c3c24);
      } else if (counterKind === 'Tree Stump') {
        // a great sawn stump, its rings for a counter top and roots spread on the floor
        for (let y = 31; y < N; y++) { const half = 11.5 + Math.max(0, y - 35) * 1.8; for (let x = Math.round(19.5 - half); x <= Math.round(19.5 + half); x++) dot(x, y, (x * 5 + Math.floor(y / 3)) % 7 === 0 ? 0x3c2814 : x % 3 === 0 ? 0x5a3c22 : x < 13 ? 0x8c6a44 : 0x6c4a2c); }
        oval(19.5, 31.2, 18.6, 2.6, (x, y, u, v) => v > 0 ? 0x6c4a2c : 0x8c6a44); // the bark rim of the slice
        oval(19.5, 29.6, 18.4, 2.6, (x, y, u, v) => { const d = Math.sqrt(u * u + v * v); return d > 0.93 ? 0x9c7448 : Math.floor(d * 6) % 2 ? 0xd8b07c : 0xeccc98; });
      } else if (counterKind === 'Glass Case') {
        // a brass-framed glass case with a few of the best pieces on velvet inside
        fill(0, 29, 39, 29, 0xe8c050); fill(0, 30, 39, 30, 0xa07818);
        fill(0, 31, 39, 36, 0x3a2440); fill(0, 36, 39, 36, 0x5a3460);
        for (let x = 2; x < 38; x += 4) { const g = [0xf0c040, 0x60e0f0, 0xf04080, 0x80f080][(x >> 2) % 4]; dot(x, 34, g); dot(x + 1, 34, g); dot(x, 33, 0xffffff); dot(x + 1, 35, sink(g, 0.6)); }
        for (let x = 0; x < N; x++) for (let y = 31; y < 36; y++) if ((x + y) % 13 === 0 || (x + y) % 13 === 1) dot(x, y, 0xb8dce8);
        for (const x of [0, 13, 26, 39]) fill(x, 31, x, 36, 0xd0a040);
        fill(0, 37, 39, 37, 0x8c5c30); fill(0, 38, 39, 39, 0x6c4428);
      } else {
        fill(0, 29, 39, 32, 0xd8a868);
        for (let x = 0; x < N; x += 9) fill(x, 29, x, 32, 0xb88850);
        fill(0, 29, 39, 29, 0xf0c888);
        fill(0, 33, 39, 33, 0x704420);
        fill(0, 34, 39, 39, 0x9c6c3c);
        for (let x = 2; x < N; x += 10) { fill(x, 35, x + 7, 35, 0x704420); fill(x, 35, x, 38, 0x704420); fill(x + 7, 35, x + 7, 38, 0xb88850); fill(x, 38, x + 7, 38, 0xb88850); }
      }
      // hands resting on the top
      if (legend !== 'None') legendHands(t);
      else if (keeper !== 'Mimic') for (const hx0 of [9, 28]) {
        const hc = keeper === 'Mole' ? [0xffe0e8, 0xf8b8c8, 0xd08098] : SKIN, hd = WDY[hx0 > 20 ? 1 : 0];
        fill(hx0 - 1, 28 + hd, hx0 + 2, 30 + hd, hc[1]);
        dot(hx0 + 2, 30 + hd, hc[2]); dot(hx0 - 1, 28 + hd, hc[0]); dot(hx0, 30 + hd, hc[2]); dot(hx0 + 1, 30 + hd, hc[2]);
      }
      // wares, left and right of the keeper, laid out by the display: at both ends, heaped up on one side,
      // a single one raised on a draped stand, or a basket of them; a price board stands on the empty side
      const signAt = (side) => {
        const x = side ? 31 : 2, y = 25 + WDY[side];
        fill(x + 2, y + 4, x + 3, y + 6, 0x6c4428);
        fill(x, y, x + 5, y + 3, 0xd8b078); fill(x, y + 3, x + 5, y + 3, 0xa87c48); dot(x, y, 0xf0d098);
        dot(x + 1, y + 1, 0xf0c040); dot(x + 2, y + 1, 0xf0c040); dot(x + 1, y + 2, 0xb08020); dot(x + 2, y + 2, 0xb08020);
        dot(x + 4, y + 1, LINE); dot(x + 4, y + 2, LINE);
      };
      if (display !== 'Both Ends') {
        const side = showSide, x0 = side ? 30 : 2, y0 = 27 + WDY[side];
        if (legend === 'None' && !(display === 'Heaped' && side === soldSide && t - soldAt < 1.4)) signAt(1 - side);
        if (display === 'On a Stand') { fill(x0 - 1, y0 + 2, x0 + 8, y0 + 4, 0x7c2840); fill(x0 - 1, y0 + 2, x0 + 8, y0 + 2, 0xb84868); for (let x = x0; x <= x0 + 7; x += 2) dot(x, y0 + 5, 0x7c2840); }
        if (display === 'Basket') { fill(x0 - 1, y0 + 2, x0 + 8, y0 + 5, 0xb88848); for (let x = x0 - 1; x <= x0 + 8; x++) for (let y = y0 + 2; y <= y0 + 5; y++) if ((x + y) % 3 === 0) dot(x, y, 0x8c6030); fill(x0 - 1, y0 + 2, x0 + 8, y0 + 2, 0xd8a868); }
      }
      const spots = display === 'Both Ends' ? [[0, 0, 0], [1, 0, 0]] : display === 'Heaped' ? [[showSide, 0, 0], [showSide, showSide ? -3 : 3, 1], [showSide, showSide ? -1.5 : 1.5, -3]]
        : display === 'On a Stand' ? [[showSide, 0, -2]] : [[showSide, 0, -1]];
      for (const [side, dxs, dys] of spots) {
        const x = Math.round((side ? 30 : 2) + dxs), y = 27 + WDY[side] + dys;
        if (side === soldSide && t - soldAt < 1.4) continue;
        if (wares === 'Potions') {
          oval(x + 1.5, y + 2.5, 2.2, 2.2, 0xe04848); dot(x + 1, y + 1, 0xffffff); fill(x + 1, y - 1, x + 2, y, 0xe8e8f0); dot(x + 1, y - 2, 0xc8a070);
          fill(x + 5, y, x + 6, y + 4, 0x4888e8); dot(x + 5, y, 0xffffff); dot(x + 5, y - 1, 0xc8a070); dot(x + 6, y - 1, 0xc8a070);
        } else if (wares === 'Blades') {
          for (let k = 0; k < 6; k++) { dot(x + k, y + 4 - k * 0.5, 0xe8eef4); dot(x + k, y + 5 - k * 0.5, 0x8890a0); }
          fill(x + 6, y + 1, x + 6, y + 3, 0xd0a040); dot(x + 7, y + 2, 0x6c4428);
        } else if (wares === 'Fruit') {
          oval(x + 2, y + 2.5, 2.2, 2, 0xe03838); dot(x + 1, y + 1, 0xffb0a0); dot(x + 2, y, 0x5c3c24);
          oval(x + 5.5, y + 3, 1.8, 2, 0xc8e050); dot(x + 5, y + 1, 0x5c3c24); dot(x + 5, y + 2, 0xf0f8a0);
        } else if (wares === 'Gems') {
          fill(x, y + 3, x + 7, y + 4, 0x8040a0);
          for (const [gx, cc] of [[x + 1, 0x40e0f0], [x + 4, 0xf04080], [x + 6, 0x60f060]]) { dot(gx, y + 1, cc); dot(gx - 1, y + 2, cc); dot(gx + 1, y + 2, cc); dot(gx, y + 2, 0xffffff); }
          if (Math.sin(t * 2 + side * 2) > 0.85) { dot(x + 4, y - 1, 0xffffff); dot(x + 4, y - 2, 0xffffff); }
        } else if (wares === 'Scrolls') {
          for (let k = 0; k < 2; k++) { fill(x + k * 2, y + 1 + k * 2, x + 6 + k, y + 2 + k * 2, 0xf0e4c0); dot(x + k * 2, y + 1 + k * 2, 0xc0a878); dot(x + 3 + k, y + 1 + k * 2, 0xc03030); dot(x + 3 + k, y + 2 + k * 2, 0xc03030); }
        } else if (wares === 'Mushrooms') {
          for (const [mx, cc] of [[x + 1, 0xd83838], [x + 5, 0xc89050]]) { fill(mx - 1, y + 1, mx + 2, y + 2, cc); dot(mx, y + 1, 0xffffff); fill(mx, y + 3, mx + 1, y + 4, 0xf0e8d8); }
        } else if (wares === 'Rings') {
          fill(x, y + 3, x + 7, y + 4, 0x402040);
          for (const [rx, gem] of [[x + 1, 0xf04060], [x + 5, 0x40c0f0]]) { dot(rx, y + 2, 0xf0c040); dot(rx + 1, y + 2, 0xf0c040); dot(rx - 1 + 1, y + 1, gem); dot(rx, y + 3, 0xd0a030); }
        } else if (wares === 'Fish') {
          for (let k = 0; k < 6; k++) { dot(x + k, y + 2, 0x90b8d0); dot(x + k, y + 3, k % 2 ? 0x6890b0 : 0xb8d8e8); }
          dot(x, y + 1, 0x6890b0); dot(x, y + 4, 0x6890b0); dot(x + 5, y + 2, LINE); fill(x + 1, y + 4, x + 6, y + 4, 0x50a0d0);
        } else if (wares === 'Eggs') {
          fill(x, y + 3, x + 7, y + 4, 0xb88850); fill(x, y + 3, x + 7, y + 3, 0xd8a868);
          for (const [ex, cc] of [[x + 1, 0xfff4e4], [x + 3, 0xf0d8b0], [x + 5, 0xb8e0f0]]) { fill(ex, y + 1, ex + 1, y + 2, cc); dot(ex, y + 1, 0xffffff); }
        } else {
          oval(x + 3.5, y + 2.5, 3.6, 2.2, 0xd89040); for (let k = 0; k < 3; k++) dot(x + 2 + k * 2, y + 1, 0xf0c070); fill(x + 1, y + 4, x + 6, y + 4, 0x9c5c20);
        }
      }
      if (legend === 'Dragon') return;   // the sleeping dragon's head lies where the extra and the pet would be
      // the counter extra, in the middle
      if (extra === 'Coin Pile') {
        for (let i = 0; i < coinCount; i++) { const cx = 17 + (i % 4) * 2, cy = 31 - Math.floor(i / 4); fill(cx, cy, cx + 1, cy, 0xf0c040); dot(cx, cy, 0xfff0a0); dot(cx + 1, cy + 1, 0xa07010); }
      } else if (extra === 'Shop Bell') {
        const w = t - dingAt < 0.5 ? (Math.floor(t * 18) % 2 ? 0.6 : -0.6) : 0;
        oval(20 + w, 29.5, 2.4, 2, 0xe8c040); fill(18, 31, 22, 31, 0xa07010); dot(20, 27 - (w ? 1 : 0), 0xa07010); dot(19 + w, 28, 0xfff0a0);
      } else if (extra === 'Ledger') {
        fill(16, 30, 23, 32, 0xf0ead8); fill(19, 30, 20, 32, 0xc8b898); for (const x of [17, 21, 22]) dot(x, 31, 0x606070);
        for (let k = 0; k < 5; k++) dot(24 + k * 0.4, 31 - k, k === 4 ? 0xffffff : 0xe8e0f0);
      } else if (extra === 'Candle') {
        fill(19, 28, 20, 31, 0xf0ead8); fill(18, 32, 21, 32, 0xc8a040);
        const fl = Math.sin(t * 9) + Math.sin(t * 13.3) > 0.5 ? 1 : 0;
        dot(19 + fl, 26, 0xf8e070); dot(19, 27, 0xf09030); if (fl) dot(20, 25, 0xf8f0c0);
      } else if (extra === 'Crystal Ball') {
        oval(20, 28.5, 2.8, 2.6, (x, y, u, v) => u + v < -0.7 ? 0xffffff : (Math.sin(t * 2 + x + y) > 0.3 ? 0xb890f0 : 0x7c60d0));
        fill(17, 31, 23, 31, 0x8c6440); fill(18, 30, 22, 30, 0x6c4428);
      } else if (extra === 'Scales') {
        const tip = Math.round(Math.sin(t * 0.8) * 0.8);
        fill(20, 26, 20, 31, 0xc09030); fill(17, 32, 23, 32, 0xa07010); fill(15, 26, 25, 26, 0xd0a040);
        fill(15, 27 + tip, 17, 27 + tip, 0xd0a040); fill(23, 27 - tip, 25, 27 - tip, 0xd0a040); dot(16, 26 + tip, 0xf0c040);
      } else if (extra === 'Hourglass') {
        fill(18, 26, 22, 26, 0x6c4428); fill(18, 32, 22, 32, 0x6c4428);
        const sand = (t * 0.25) % 1;
        for (let y = 27; y < 32; y++) { const w = Math.abs(y - 29) * 0.7 + 0.4; fill(Math.round(20 - w), y, Math.round(20 + w) - 1, y, 0xd8e8f0); }
        dot(20, 27, sand < 0.7 ? 0xf0d080 : 0xd8e8f0); dot(19, 31, 0xf0d080); dot(20, 31, 0xf0d080); if (sand > 0.4) dot(20, 30, 0xf0d080); dot(20, 29, 0xf0d080);
      } else if (extra === 'Golden Egg') {
        // the coveted one: a big golden egg on a red velvet cushion, front and centre, a glint sweeping over it
        // (and sparkles round it, drawn last); tapped, it rocks, cracks and a chick peeks out
        const u = t - eggAt, rock = u < 0.5 ? (Math.floor(u * 16) % 2 ? 1 : -1) : 0, open = u > 0.45 && u < 2.4;
        oval(19.5, 31, 6.8, 2.3, (x, y, uu, vv) => vv < -0.35 ? 0xe05068 : uu > 0.55 || vv > 0.5 ? 0x781828 : 0xb82840);
        dot(13, 32, 0xf0c040); dot(26, 32, 0xf0c040); dot(13, 33, 0xc89828); dot(26, 33, 0xc89828);
        const glint = 10 + ((t % 3.2) / 3.2) * 26 + (cursor === 2 ? Math.sin(t * 9) : 0);
        oval(19.5 + rock * 0.6, 25.4, 3.6, 4.7, (x, y, uu, vv) => Math.abs(x + (y - 25) * 0.5 - glint) < 0.75 ? 0xffffff : uu + vv < -0.75 ? 0xfff6c0 : uu > 0.5 || vv > 0.64 ? 0xb88a18 : uu > 0.15 ? 0xe0a820 : 0xf8cc38);
        if (open) {
          for (let x = 16; x <= 23; x++) dot(x, 23 + (x % 2), LINE);
          fill(18, 19, 21, 22, 0xfff070); dot(19, 18, 0xfff070); dot(20, 18, 0xfff070);
          dot(19, 20, LINE); dot(22, 21, 0xf09030); if (Math.floor(u * 3) % 2) dot(20, 17, 0xfff070);
        }
      } else if (extra === 'Cash Box') {
        fill(16, 29, 24, 32, 0x58586c); fill(16, 29, 24, 29, 0x7c7c90); fill(19, 30, 21, 31, 0xe8c040); dot(20, 31, LINE);
      }
      // a pet on the counter
      if (pet === 'Jelly Cube') {
        const jig = t - buyAt < 0.5 ? (Math.floor(t * 14) % 2) : Math.sin(t * 2.2) > 0.6 ? 1 : 0;
        fill(12, 25 + jig, 15, 28, 0x70e0a0); fill(12, 25 + jig, 15, 25 + jig, 0xb0f8d0); dot(13, 26 + jig, LINE); dot(15, 26 + jig, LINE); dot(12, 28, 0x40b070);
      } else if (pet === 'Hedgehog') {
        for (let x = 11; x < 16; x++) dot(x, 26 + (x % 2), 0x6c4c34);
        fill(11, 27, 15, 28, 0x8c6c4c); fill(15, 27, 16, 28, 0xe8c8a0); dot(16, 27, LINE); dot(15, 27, LINE); dot(16, 28, 0x3c2414);
      } else if (pet === 'Snail') {
        const sx = 12 + Math.floor((t * 0.25) % 3);
        oval(sx + 1.5, 26.5, 1.6, 1.6, (x, y) => (x + y) % 2 ? 0xd08848 : 0xa86030); fill(sx, 28, sx + 4, 28, 0xc8c0a0); dot(sx + 4, 27, 0xc8c0a0); dot(sx + 4, 26, LINE);
      }
    }

    const sheet = document.createElement('canvas');
    sheet.height = N; sheet.width = N;
    const sx2 = sheet.getContext('2d');
    const img = sx2.createImageData(N, N);
    // the hour's light, laid over every colour as it is written out
    const LIGHT = legend !== 'None' ? null : { Daylight: null, Lamplit: [1.04, 0.84, 0.6], 'Golden Hour': [1.08, 0.9, 0.7], Moonlit: [0.64, 0.76, 1.06] }[hour];
    // by moonlight the keeper keeps more of its own colour than the shop round it, so dark skin and beards still read,
    // and catches a one-dot cool rim on the window side
    const LIGHTK = hour === 'Moonlit' ? [0.85, 0.9, 1.04] : LIGHT, winDir = decorSide ? 1 : -1;
    const ink = (i, cc, kp) => {
      let r = cc >> 16 & 255, gg = cc >> 8 & 255, b = cc & 255;
      if (LIGHT) {
        const LT = kp ? LIGHTK : LIGHT;
        const x = i % N, y = (i / N) | 0, dd = Math.hypot(x - 20, y - 16) / 26;
        // lamplight: a warm pool on the keeper and the counter, the corners falling off into the dark
        // moonlight: a cold light in from the window side, the far side of the shop in deep blue shadow
        const pool = Math.hypot(x - 20, (y - 24) * 1.15) / 21;
        const vig = hour === 'Golden Hour' ? (x + y < 30 ? 1.08 : 0.96) : hour === 'Lamplit' ? (pool < 0.55 ? 1.12 : pool < 0.8 ? 0.94 : pool < 1 ? 0.74 : 0.56)
          : hour === 'Moonlit' ? ((decorSide ? 39 - x : x) < 8 ? 1.2 : (decorSide ? 39 - x : x) < 31 ? 1.02 : (decorSide ? 39 - x : x) < 35 ? 0.78 : 0.62) * (dd > 0.9 ? 0.8 : 1)
          : dd > 0.9 ? 0.72 : dd > 0.7 ? 0.86 : 1;
        r = Math.min(255, r * LT[0] * vig); gg = Math.min(255, gg * LT[1] * vig); b = Math.min(255, b * LT[2] * vig);
        if (kp === 2 && hour === 'Moonlit') { r += (176 - r) * 0.55; gg += (204 - gg) * 0.55; b += (255 - b) * 0.55; }
      }
      img.data[i * 4] = r; img.data[i * 4 + 1] = gg; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255;
    };
    const sprite = new Int32Array(N * N);

    function draw(t) {
      room(t);
      shopkeeper(t);
      counter(t);
      // merge the keeper and counter into one sprite plane, then ring it in the dark line colour
      for (let i = 0; i < N * N; i++) sprite[i] = front[i] >= 0 ? front[i] : spr[i] === -2 ? -1 : spr[i];
      for (let i = 0; i < N * N; i++) { // each dot of the sheet
        let cc = sprite[i], kp = 0;
        if (cc < 0) {
          const x = i % N, y = (i / N) | 0; // column, row
          const edge = spr[i] !== -2 && ((x > 0 && sprite[i - 1] >= 0) || (x < N - 1 && sprite[i + 1] >= 0) || (y > 0 && sprite[i - N] >= 0) || (y < N - 1 && sprite[i + N] >= 0));
          cc = edge ? LINE : back[i];
          if (spr[i] === -2) cc = (((back[i] >> 16 & 255) + 0xb0) >> 1 << 16) | ((((back[i] >> 8) & 255) + 0xe0) >> 1 << 8) | (((back[i] & 255) + 0xf0) >> 1);
        } else if (front[i] < 0 && spr[i] >= 0) {
          // inner lines where the keeper's colours change sharply in value read as sprite outlines
          const y = (i / N) | 0;
          if (y + 1 < N && front[i + N] >= 0 && y < 28) cc = LINE;
          if (cc !== LINE) { const x = i % N, xs = x + winDir; kp = xs < 0 || xs >= N || sprite[i + winDir] < 0 ? 2 : 1; }
        }
        ink(i, cc, kp);
      }
      // the golden egg's sparkles: three four-point stars twinkling round it, no outline
      if (extra === 'Golden Egg') [[13, 21], [26, 23], [24, 16]].forEach(([sx, sy], k) => {
        const s = Math.sin(t * 2.6 + k * 2.1);
        if (s < -0.2) return;
        const arm = s > 0.75 ? 2 : 1;
        ink(sy * N + sx, 0xffffff);
        for (let r = 1; r <= arm; r++) for (const [a, b2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) ink((sy + b2 * r) * N + sx + a * r, r === 1 ? 0xfff4b0 : 0xf0c040);
      });
      // the fairy: a glowing mote looping over the keeper's head, wings beating, a fading trail of sparks behind it
      if (pet === 'Fairy' && keeper !== 'Mimic' && legend === 'None') {
        const at = tt => { const a = tt * 1.4; return [Math.round(20 + Math.cos(a) * 11), Math.round(fairyY - 1 - Math.abs(Math.sin(a)) * 9 + Math.sin(a * 2.6))]; };
        const put = (x, y, cc) => { if (x >= 0 && x < N && y >= 0 && y < N) ink(y * N + x, cc); };
        for (const [k, cc] of [[0.42, 0xb89848], [0.24, 0xf0d070]]) { const [tx, ty] = at(t - k); put(tx, ty, cc); }
        const [fx, fy] = at(t), up = Math.floor(t * 9) % 2;
        for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) put(fx + dx, fy + dy, 0xfff0a0);
        put(fx, fy, 0xffffff);
        put(fx - 1, fy - 1 - up, 0xd8f4ff); put(fx + 1, fy - 1 - up, 0xd8f4ff); put(fx - 2, fy - 1 - up, up ? 0x98d4f0 : 0xd8f4ff); put(fx + 2, fy - 1 - up, up ? 0x98d4f0 : 0xd8f4ff);
      }
      // the menu cursor, a little down-pointing arrow that blinks over whatever is under the pointer
      if (cursor >= 0 && Math.floor(t * 3) % 3) {
        const cx = cursor === 0 ? 5 : cursor === 1 ? 33 : 20, cy = cursor === 2 ? 20 + (keeper === 'Mimic' ? -16 : -15) : 20;
        for (let r = 0; r < 5; r++) for (let k = -4 + r; k <= 4 - r; k++) { const x = cx + k, y = cy + r - 1; if (x >= 0 && x < N && y >= 0) ink(y * N + x, r === 0 || r === 4 || Math.abs(k) === 4 - r ? LINE : 0xffffff); }
      }
      // a speech bubble after a hello: a heart, a coin or a note
      if (t - helloAt < 1.2) {
        const bx = 28, by = 3;
        for (let y = by; y < by + 7; y++) for (let x = bx; x < bx + 9; x++) { const edge = y === by || y === by + 6 || x === bx || x === bx + 8; if ((x === bx || x === bx + 8) && (y === by || y === by + 6)) continue; ink(y * N + x, edge ? LINE : 0xffffff); }
        ink((by + 7) * N + bx + 2, LINE); ink((by + 8) * N + bx + 1, LINE);
        const icon = [['.X.X.', 'XXXXX', '.XXX.', '..X..'], ['.XXX.', 'XX.XX', 'XX.XX', '.XXX.'], ['..XX.', '..X.X', '..X..', 'XXX..']][helloIcon];
        const ic = [0xe03850, 0xe8b830, 0x4060c0][helloIcon];
        icon.forEach((row, j) => { for (let q = 0; q < 5; q++) if (row[q] === 'X') ink((by + 1 + j) * N + bx + 2 + q, ic); });
      }
      // a coin flipped up off the counter after a sale
      const ca = t - buyAt;
      if (ca < 0.8 && soldSide >= 0) {
        const p = ca / 0.8, x = Math.round(coinFrom + (20 - coinFrom) * p * 0.5), y = Math.round(27 - Math.sin(p * Math.PI) * 12);
        const wide = Math.floor(ca * 12) % 2;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1 - wide; dx <= 1 + wide; dx++) {
          const cxp = x + dx, cyp = y + dy;
          if (cxp >= 0 && cxp < N && cyp >= 0 && cyp < N) ink(cyp * N + cxp, Math.abs(dy) === 1 && Math.abs(dx) === 1 + wide ? LINE : dy < 0 ? 0xfff0a0 : 0xe8c040);
        }
      }
      if (legend === 'Starfolk' && t - legAt < 0.9) {
        const u = (t - legAt) / 0.9, x0 = 20 + legDir * u * 24, y0 = 28 - u * 26;
        for (let k = 0; k < 6; k++) { const x = Math.round(x0 - legDir * k * 1.3), y = Math.round(y0 + k * 1.1); if (x >= 0 && x < N && y >= 0 && y < N) ink(y * N + x, k === 0 ? 0xffffff : k < 3 ? 0xe0d8ff : 0x8070c8); }
      }
      if (legend !== 'None') legendOver(t);
      sx2.putImageData(img, 0, 0);
      g2.imageSmoothingEnabled = false;
      const k = S / N;
      if (Number.isInteger(k)) g2.drawImage(sheet, 0, 0, S, S);
      else {
        const kk = Math.round(k), o = Math.round((S - kk * N) / 2);
        g2.fillStyle = '#24141c'; g2.fillRect(0, 0, S, S);
        g2.drawImage(sheet, o, o, kk * N, kk * N);
      }
    }
    draw(0);
    return (t) => {
      const inp = c.input;
      const zone = (x, y) => y > 0.6 ? (x < 0.3 ? 0 : x > 0.7 ? 1 : 2) : (x > 0.25 && x < 0.75 && y > 0.1 ? 2 : -1);
      cursor = inp.inside ? zone(inp.x, inp.y) : -1;
      ptr = inp.inside ? [inp.x * N, inp.y * N] : null;
      // a legendary keeper is a toy of its own (see legendInput)
      if (legend !== 'None') { cursor = -1; legendInput(t, inp); draw(t); return; }
      const onKeeper = cursor === 2 && inp.y < 0.6;
      if (onKeeper && !wasOn) {
        // stepping up to a legendary keeper: a purr, a squelch or a twinkle
        if (legend === 'Dragon') c.sound.note(key - 24, { dur: 0.6, vel: 0.12, wave: 'sawtooth', cutoff: 320 });
        else if (legend === 'Slime King') c.sound.note(key + 7, { dur: 0.08, vel: 0.1, wave: 'sine' });
        else if (legend === 'Starfolk') c.sound.note(key + 24 + maj[2], { dur: 0.8, vel: 0.07, wave: 'sine' });
      }
      wasOn = onKeeper;
      for (const buy of inp.taps()) {
        const z = zone(buy.x, buy.y);
        if (z < 0 || t - buyAt < 0.5) continue;
        const pan = (buy.x - 0.5) * 0.72;
        if (keeper === 'Mimic') {
          buyAt = t; soldSide = -1;
          c.sound.hit('click', 0.5, { pan });
          for (let k = 0; k < 3; k++) c.sound.note(key - 12 + min[2 - k], { at: 0.04 + k * 0.08, dur: 0.07, vel: 0.24, wave: 'square', cutoff: 1300, pan });
          continue;
        }
        if (z === 2 && buy.y <= 0.6 && legend !== 'None' && t - legAt > 0.9) {
          legAt = t; legDir = buy.x < 0.5 ? -1 : 1;
          if (legend === 'Dragon') {
            c.sound.hit('noise', 0.4, { cutoff: 900, dur: 0.7, pan });
            for (let k = 0; k < 3; k++) c.sound.note(key - 24 + min[k], { at: k * 0.12, dur: 0.18, vel: 0.2, wave: 'sawtooth', cutoff: 380, pan });
          } else if (legend === 'Slime King') {
            c.sound.note(key + 12, { dur: 0.1, vel: 0.22, wave: 'sine', pan }); c.sound.note(key + 5, { at: 0.08, dur: 0.16, vel: 0.2, wave: 'sine', pan });
            c.sound.hit('blip', 0.25, { freq: 2637, at: 0.3, pan });
          } else {
            for (let k = 0; k < 6; k++) c.sound.note(key + 24 + maj[k % 5] + (k > 4 ? 12 : 0), { at: k * 0.07, dur: 0.6, vel: 0.08, wave: 'sine', pan: pan * (k % 2 ? 1 : -1) });
          }
        }
        if (z === 2 && buy.y > 0.6 && extra === 'Golden Egg') {
          if (t - eggAt < 2.4) continue;
          eggAt = t;
          c.sound.hit('click', 0.3, { pan }); c.sound.hit('click', 0.25, { at: 0.12, pan }); c.sound.hit('click', 0.35, { at: 0.42, pan });
          c.sound.note(key + 36 + maj[1], { at: 0.6, dur: 0.06, vel: 0.12, wave: 'sine', pan }); c.sound.note(key + 36 + maj[2], { at: 0.7, dur: 0.08, vel: 0.12, wave: 'sine', pan });
          c.sound.note(key + 36 + maj[1], { at: 1.1, dur: 0.06, vel: 0.1, wave: 'sine', pan }); c.sound.note(key + 36 + maj[2], { at: 1.2, dur: 0.08, vel: 0.1, wave: 'sine', pan });
          continue;
        }
        if (z === 2 && buy.y > 0.6 && extra === 'Shop Bell') {
          dingAt = t;
          c.sound.note(key + 31, { dur: 1.4, vel: 0.22, wave: 'sine', pan });
          c.sound.note(key + 43, { dur: 0.5, vel: 0.08, wave: 'sine', pan });
          continue;
        }
        buyAt = t;
        if (z < 2) {
          soldSide = z; soldAt = t; coinFrom = z ? 34 : 4;
          c.sound.hit('blip', 0.35, { freq: 1976, pan });
          c.sound.hit('blip', 0.3, { freq: 2637, at: 0.07, pan });
          const up = Math.floor(tr() * 2) * 2;
          for (let k = 0; k < 4; k++) c.sound.note(key + 12 + maj[k + (k > 1 ? up >> 1 : 0)], { at: 0.18 + k * 0.08, dur: k === 3 ? 0.3 : 0.07, vel: 0.22, wave: 'square', cutoff: 3000 });
          if (pet === 'Parrot') { c.sound.note(key + 28, { at: 0.5, dur: 0.05, vel: 0.1, wave: 'triangle' }); c.sound.note(key + 31, { at: 0.57, dur: 0.07, vel: 0.1, wave: 'triangle' }); }
        } else {
          soldSide = -1; buyAt = -9; helloAt = t; helloIcon = Math.floor(tr() * 3);
          c.sound.note(key + 12 + maj[1], { dur: 0.08, vel: 0.2, wave: 'square', cutoff: 2600 });
          c.sound.note(key + 12 + maj[2], { at: 0.1, dur: 0.16, vel: 0.2, wave: 'square', cutoff: 2600 });
        }
      }
      draw(t);
    };
  },
});

})(window.Proto);
