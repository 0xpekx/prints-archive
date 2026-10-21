// Hood Cats: from D:/code/synaesthesia/public/drop03/pieces/007.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Hood Cats: chibi cats in hoods, 24 x 24 cells, outlined in darker shades of their own colours.
Proto.add({
  num: 7,
  name: 'Hood Cats',
  seed: 826,
  fam: 'Pixel Portraits',
  recipe: 'A round-faced cat bundled in a hood, on a 28-cell grid with soft coloured outlines instead of black ones. Fur, hood (plain, knitted or one of thirteen animal and fruit hoods), eyes, mouth, accessory, what it hugs, a pin, a little companion, the weather, the backdrop and a frame all vary; golden cats, astro helmets and ghost kittens are rare; a golden fish is coveted, and once in a long while a cat is glazed porcelain or wind-up clockwork.',
  interactive: 'Tap the cat to make it mew. Stroke it to pet it.',
  music: true,
  make(c) {
    const S = c.size, N = 28; // the cat is drawn in a 24-cell space, set 2 cells in and 1 down
    // each draw hashes the hash string with its own counter (murmur3-style finaliser)
    let draws = 0;
    function roll() {
      let h = 0x1b873593 ^ draws++;
      for (let i = 2; i < c.hash.length; i++) {
        h = Math.imul(h ^ c.hash.charCodeAt(i), 0xcc9e2d51);
        h = (h << 15) | (h >>> 17);
      }
      h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    }
    function weigh(o) {
      const keys = Object.keys(o);
      let sum = 0;
      keys.forEach(k => sum += o[k]);
      let r = roll() * sum;
      for (const k of keys) { r -= o[k]; if (r < 0) return k; }
      return keys[0];
    }

    let fur = weigh({ 'Orange Tabby': 22, Grey: 18, Black: 14, Snow: 12, Calico: 12, Tuxedo: 10, Siamese: 8, Cosmic: 4 });
    let hood = weigh({ Raincoat: 20, Knit: 18, Hoodie: 20, 'Frog Hood': 12, 'Bear Hood': 12, 'Bunny Hood': 8, 'Dino Hood': 6, 'Shark Hood': 4 });
    let eyes = weigh({ Round: 28, Green: 20, Sleepy: 14, Happy: 14, Wink: 10, Sparkly: 9, 'Odd Eyes': 5 });
    let mouth = weigh({ 'Cat Smile': 34, Open: 18, Fang: 16, Blep: 14, Pout: 12, Fishbone: 6 });
    let extra = weigh({ None: 36, 'Bell Collar': 18, Bandage: 12, 'Round Glasses': 14, Leaf: 12, Freckles: 8 });
    let backdrop = weigh({ Polka: 20, Rain: 16, 'Paw Prints': 16, Plain: 16, Stripes: 16, Hearts: 10, Stars: 6 });
    const hoodTint0 = Math.floor(roll() * 5);
    const bgTint0 = Math.floor(roll() * 6);
    const blinkEvery = 3 + roll() * 3, blinkAt = roll() * 4, twitchEvery = 5 + roll() * 4;
    // later draws (the first ones above still land the same): what it holds in its paws,
    // and whether it tilts its head
    let holding = weigh({ Nothing: 34, Mug: 16, Fish: 14, Yarn: 14, Letter: 12, Dumpling: 8, 'Tiny Kitten': 2 });
    const tiltRoll = roll();
    let tilt = tiltRoll < 0.2 ? -1 : tiltRoll < 0.4 ? 1 : 0;
    const kitFur = Math.floor(roll() * 4);

    // the wider wardrobe rolls from its own Park-Miller stream on another slice of the hash,
    // so the cats rolled above keep their looks unless this stream swaps a trait for a new value
    let pm = ((parseInt(c.hash.slice(40, 48), 16) ^ parseInt(c.hash.slice(-6), 16)) >>> 0) % 2147483646 + 1;
    const more = () => (pm = pm * 48271 % 2147483647) / 2147483647;
    const moreOf = o => { let sum = 0; for (const k in o) sum += o[k]; let r = more() * sum; for (const k in o) if ((r -= o[k]) < 0) return k; return Object.keys(o)[0]; };
    if (more() < 0.34) fur = moreOf({ Cream: 18, Smoke: 16, 'Brown Tabby': 16, Tortie: 14, Lilac: 12, Ghost: 6, Golden: 5 });
    if (more() < 0.4) hood = moreOf({ 'Duck Hood': 16, 'Bee Hood': 14, 'Lion Hood': 14, 'Cow Hood': 14, 'Strawberry Hood': 12, 'Mushroom Hood': 12, 'Dragon Hood': 7, 'Unicorn Hood': 6, 'Astro Helmet': 3 });
    if (more() < 0.32) eyes = moreOf({ 'Big Shiny': 20, Determined: 18, Teary: 16, 'Heart Eyes': 14, 'Star Eyes': 6, Dizzy: 5, Glowing: 4 });
    if (more() < 0.3) mouth = moreOf({ 'Toothy Grin': 20, Lollipop: 16, Bubblegum: 16, Whistle: 14, Toast: 12, Yawn: 12 });
    if (more() < 0.32) extra = moreOf({ Scarf: 20, Sunglasses: 18, 'Star Sticker': 14, Eyepatch: 12, Monocle: 10, 'Heart Shades': 5 });
    if (more() < 0.36) backdrop = moreOf({ Checker: 18, Clouds: 18, Zigzag: 16, Fish: 14, Moons: 10, Rainbow: 5 });
    if (more() < 0.3) holding = moreOf({ Onigiri: 14, 'Ice Cream': 14, Cookie: 14, Gift: 12, Book: 12, Plant: 12, 'Paper Boat': 10, 'Star Wand': 4 });
    const bgTint = more() < 0.36 ? 6 + Math.floor(more() * 6) : bgTint0;
    const hoodTint = more() < 0.4 ? 5 + Math.floor(more() * 3) : hoodTint0;
    let companion = moreOf({ None: 66, Ladybug: 7, Bird: 7, Butterfly: 6, Snail: 4, Mouse: 4, Fireflies: 4, 'Ghost Kitten': 1.5 });
    let weather = moreOf({ Clear: 54, Snow: 12, Petals: 10, Bubbles: 8, Leaves: 7, Confetti: 6, Sparkles: 3 });
    let pin = moreOf({ None: 52, 'Star Pin': 9, 'Heart Pin': 9, 'Fish Pin': 8, 'Flower Pin': 8, 'Moon Pin': 6, 'Paw Badge': 6, 'Rainbow Pin': 2 });
    let frame = moreOf({ None: 62, Stamp: 11, Polaroid: 10, Tape: 9, Gold: 5, Holo: 2 });
    let waving = holding === 'Nothing' && more() < 0.22;
    const flakes = [];
    for (let i = 0; i < 16; i++) flakes.push([more(), more(), more()]);
    const scarfTint = Math.floor(more() * 4), tapeTint = Math.floor(more() * 4);

    // legendaries and the coveted golden fish roll from their own xorshift32 on a third slice of
    // the hash, after every other draw, so ordinary cats (and the opening one) keep their looks
    let xs32 = (parseInt(c.hash.slice(18, 26), 16) ^ 0x2f6b9d43) >>> 0 || 0x51ed270b;
    const xsr = () => { xs32 ^= xs32 << 13; xs32 >>>= 0; xs32 ^= xs32 >>> 17; xs32 ^= xs32 << 5; xs32 >>>= 0; return xs32 / 4294967296; };
    for (let i = 0; i < 6; i++) xsr();
    const lroll = xsr(), groll = xsr();
    const legend = lroll < 0.0011 ? 'Porcelain' : lroll < 0.002 ? 'Clockwork' : '';
    const tune = []; // the music box's own little tune
    for (let i = 0; i < 9; i++) tune.push(Math.floor(xsr() * 8));
    if (!legend && groll < 0.005) {
      holding = 'Golden Fish'; waving = false;
      if (frame === 'Gold') frame = 'None';
      if (['Toast', 'Lollipop', 'Bubblegum', 'Fishbone'].includes(mouth)) mouth = 'Cat Smile';
    }
    if (legend === 'Porcelain') {
      fur = 'Porcelain'; hood = 'Glazed Hood'; extra = 'Lucky Bell'; holding = 'Lucky Coin'; backdrop = 'Lacquer';
      weather = 'Sparkles'; frame = 'Gold'; waving = false; tilt = 0; pin = 'None'; if (companion === 'Bird' || companion === 'Butterfly') companion = 'None';
    }
    if (legend === 'Clockwork') { fur = 'Brass'; hood = 'Riveted Helm'; eyes = 'Lamp Eyes'; extra = 'Wind-Up Key'; holding = 'Clock Heart'; backdrop = 'Blueprint'; waving = false; tilt = 0; pin = 'None'; }
    if (legend) c.trait('Legendary', legend);

    c.trait('Fur', fur);
    c.trait('Hood', hood);
    c.trait('Eyes', eyes);
    c.trait('Mouth', mouth);
    c.trait('Extra', extra);
    c.trait('Backdrop', backdrop);
    c.trait('Backdrop Colour', legend === 'Porcelain' ? 'Lacquer Red' : legend === 'Clockwork' ? 'Blueprint Blue' : ['Peach', 'Mint', 'Periwinkle', 'Pink', 'Butter', 'Sky', 'Lavender', 'Coral', 'Sage', 'Cream', 'Teal', 'Night'][bgTint]);
    const hoodNames = { Raincoat: ['Sunflower', 'Tomato', 'Sky', 'Lime', 'Bubblegum', 'Teal', 'Lavender', 'Clear'], Knit: ['Cranberry', 'Cobalt', 'Pine', 'Violet', 'Pumpkin', 'Oatmeal', 'Rose', 'Mustard'], Hoodie: ['Heather', 'Navy', 'Blush', 'Sage', 'Charcoal', 'Lemon', 'Plum', 'Tie-Dye'] }[hood];
    c.trait('Hood Colour', hoodNames ? hoodNames[hoodTint] : legend === 'Porcelain' ? 'Cobalt Glaze' : legend === 'Clockwork' ? 'Steel & Copper' : 'Natural');
    c.trait('Holding', holding);
    c.trait('Pose', waving ? 'Paw Wave' : tilt < 0 ? 'Tilt Left' : tilt > 0 ? 'Tilt Right' : 'Upright');
    c.trait('Companion', companion); c.trait('Weather', weather);
    c.trait('Pin', pin);
    c.trait('Frame', frame);

    const furs = {
      'Orange Tabby': ['#f6a24a', '#d8782a', '#ffd6a0'], Grey: ['#a8acb8', '#7c808e', '#dcdee6'], Black: ['#3a3640', '#24222a', '#5a5662'],
      Snow: ['#f6f4f0', '#d8d4cc', '#ffffff'], Calico: ['#f8f2e8', '#d8cfc0', '#ffffff'], Tuxedo: ['#2e2c34', '#1c1b20', '#f6f4f0'],
      Siamese: ['#f2e2c8', '#d6c0a0', '#6a4a3a'], Cosmic: ['#6a4ab8', '#4a2e8a', '#c0a8ff'],
      Cream: ['#f8e2bc', '#e4c48e', '#fff4e0'], Smoke: ['#6c7588', '#525a6c', '#a2abbe'], 'Brown Tabby': ['#a07a58', '#6e4e34', '#e0c49c'],
      Tortie: ['#3c3236', '#2a2226', '#e8963c'], Lilac: ['#cbbdd4', '#a898b6', '#f0e6f4'], Ghost: ['#e6f2ff', '#b4cce6', '#ffffff'], Golden: ['#ffcf48', '#dc9a18', '#fff2a8'],
      Porcelain: ['#efece6', '#c9c7d2', '#ffffff'], Brass: ['#d6a04a', '#a8742a', '#f6dc96'],
    }[fur];
    const darkFur = fur === 'Black' || fur === 'Cosmic' || fur === 'Tortie' || fur === 'Smoke';
    // dark faces (the tuxedo's upper face too) get coloured irises and light lid lines so the expression reads
    const darkFace = darkFur || fur === 'Tuxedo', LID = darkFace ? '#ead6de' : '#1c1a24';
    const hoodSets = {
      Raincoat: [['#ffd23a', '#e0a020'], ['#ff6a5a', '#d84030'], ['#5ac8f0', '#2a98c8'], ['#8ae06a', '#58b03e'], ['#ff9ad0', '#e06aa8'], ['#3ac0b0', '#1a9088'], ['#b49af0', '#8a6ad0'], ['#e4f2f6', '#b4d4e2']],
      Knit: [['#d84a5a', '#f2e6d8'], ['#4a7ad8', '#f2e6d8'], ['#3aa070', '#f6e8c0'], ['#8a5ac8', '#ffd8f0'], ['#e08a2a', '#fff0d0'], ['#d8c8a6', '#8a5a3a'], ['#e87a9a', '#fff0f4'], ['#e0b030', '#5a3a8a']],
      Hoodie: [['#8a90a0', '#e8e8f0'], ['#3a4a7a', '#c8d0f0'], ['#f0a0b8', '#fff0f4'], ['#4a8a6a', '#d8f0e0'], ['#2a2a32', '#c8c8d0'], ['#f6e070', '#fffbe0'], ['#6a3a6a', '#e8c8e8'], ['#c890e8', '#fff4fc']],
      'Frog Hood': [['#6ac850', '#e8f8c0']], 'Bear Hood': [['#a06a40', '#f0d0a0']], 'Bunny Hood': [['#f6f0f4', '#ffb8cc']],
      'Dino Hood': [['#3ab8a0', '#ffa040']], 'Shark Hood': [['#6a8aa8', '#f0f4f8']],
      'Duck Hood': [['#ffd84a', '#fff6c8']], 'Bee Hood': [['#ffc830', '#fff4c4']], 'Lion Hood': [['#eaa448', '#ffe4a8']], 'Cow Hood': [['#f6f4f0', '#ffc8d2']],
      'Strawberry Hood': [['#e8384a', '#fff0e8']], 'Mushroom Hood': [['#d63a3a', '#fff4e0']], 'Dragon Hood': [['#5a3ab8', '#ffd890']], 'Unicorn Hood': [['#fbf4ff', '#ffc8f0']], 'Astro Helmet': [['#eef0f6', '#bfe6ff']],
      'Glazed Hood': [['#efece6', '#d8303a']], 'Riveted Helm': [['#8c96a6', '#c87240']],
    }[hood];
    const HC = hoodSets[hoodTint % hoodSets.length];
    const tieDye = hood === 'Hoodie' && hoodTint === 7;
    const bgs = [['#fde8d8', '#f8cfb8'], ['#e2f2e4', '#c6e6cc'], ['#e2e8fb', '#c8d2f4'], ['#fbe2ef', '#f2c6dc'], ['#fff6cc', '#f4e4a0'], ['#dcf0f4', '#bce0ea'],
      ['#ece4fb', '#d6c8f4'], ['#ffe2d8', '#fbc2b0'], ['#e6eedc', '#cddcbc'], ['#fbf5e8', '#efe2c4'], ['#d6f0ec', '#aedcd4'], ['#1e2240', '#343c6c']][legend === 'Porcelain' ? 12 : legend === 'Clockwork' ? 13 : bgTint]
      || (legend === 'Porcelain' ? ['#b3222c', '#e2ac3c'] : ['#1a2c52', '#2e4a80']);
    const night = bgTint === 11 || legend === 'Clockwork';

    const hexToRgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
    const shade = (h, f, tint) => { const a = hexToRgb(h); const t = tint ? hexToRgb(tint) : [40, 20, 50]; return toHex(a.map((v, i) => v * f + t[i] * (1 - f) * 0.5)); };
    const mix = (h, g, k) => { const a = hexToRgb(h), b = hexToRgb(g); return toHex(a.map((v, i) => v + (b[i] - v) * k)); };
    const lumOf = h => { const a = hexToRgb(h); return 0.3 * a[0] + 0.59 * a[1] + 0.11 * a[2]; };
    // every cat reads as a cat: a lighter muzzle round the nose, whiskers that cross the face's edge, and,
    // in hoods with no ear holes, its own ears tucked up inside the hood
    const MUZ = mix(fur === 'Siamese' ? '#8a6a58' : fur === 'Tuxedo' || fur === 'Lilac' ? furs[2] : furs[0], '#fff8f0', darkFur ? 0.3 : 0.45);
    const tuckedEars = !legend && !['Raincoat', 'Knit', 'Hoodie'].includes(hood);

    // layers: colour and a region id per cell; region 0 is the backdrop
    const colr = new Array(N * N), reg = new Int16Array(N * N);
    const put = (x, y, col, r) => { x += 2; y += 1; if (x >= 0 && y >= 0 && x < N && y < N) { colr[y * N + x] = col; reg[y * N + x] = r; } };
    const inside = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
    const regAt = (x, y) => (x + 2 >= 0 && y + 1 >= 0 && x + 2 < N && y + 1 < N) ? reg[(y + 1) * N + x + 2] : 0;
    const fillE = (cx, cy, rx, ry, col, r) => { for (let y = -1; y < N - 1; y++) for (let x = -2; x < N - 2; x++) if (inside(x, y, cx, cy, rx, ry)) put(x, y, col, r); };
    const stamp = (rows, x0, y0, pal, r) => rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (pal[row[i]]) put(x0 + i, y0 + j, pal[row[i]], r); });

    // the weather: a few flakes, petals, bubbles or sparks drifting over the backdrop only
    const wx = new Map(), wkey = (x, y) => (y + 10) * 100 + x + 10;
    const CONFETTI = ['#ff6a8a', '#ffc83a', '#5ac8f0', '#8ae06a', '#b48af0'];
    function weatherAt(t) {
      wx.clear();
      if (weather === 'Clear') return;
      const H = N + 4;
      flakes.forEach(([a, b, s], i) => {
        if (weather === 'Sparkles') {
          const ph = (t * 0.45 + s * 3) % 1;
          if (ph > 0.5 || i > 9) return;
          const x = Math.floor(a * N), y = Math.floor(b * N);
          if (ph > 0.14 && ph < 0.36) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) wx.set(wkey(x + dx, y + dy), night ? '#9a9060' : '#ffffff');
          wx.set(wkey(x, y), night ? '#fff3a0' : '#ffe36a');
          return;
        }
        const rise = weather === 'Bubbles' ? -1 : 1, speed = weather === 'Snow' ? 1.5 : weather === 'Bubbles' ? 2 : weather === 'Confetti' ? 2.8 : 1.9;
        const y = Math.floor((((b * H + rise * t * speed * (0.6 + s * 0.7)) % H) + H) % H) - 2;
        const x = Math.floor(a * H - 2 + Math.sin(t * (0.7 + s) + i) * (weather === 'Leaves' || weather === 'Petals' ? 1.6 : 0.8));
        if (weather === 'Snow') { wx.set(wkey(x, y), '#ffffff'); if (i % 4 === 0) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) wx.set(wkey(x + dx, y + dy), night ? '#8a96c0' : '#f4f8ff'); }
        else if (weather === 'Petals') { wx.set(wkey(x, y), i % 2 ? '#ff8ab4' : '#ffb8d2'); if (i % 3 === 0) wx.set(wkey(x + 1, y), '#ffd4e4'); }
        else if (weather === 'Leaves') { const lc = ['#e0802c', '#c85a2a', '#8ab848', '#e8b030'][i % 4]; wx.set(wkey(x, y), lc); wx.set(wkey(x + 1, y + (Math.sin(t * 2 + i) > 0 ? 1 : -1)), lc); }
        else if (weather === 'Confetti') wx.set(wkey(x, y), CONFETTI[i % 5]);
        else if (i < 10) { wx.set(wkey(x, y), '#ffffff'); wx.set(wkey(x + 1, y), '#9ad4f6'); wx.set(wkey(x, y + 1), '#9ad4f6'); wx.set(wkey(x + 1, y + 1), '#bfe4fa'); }
      });
    }

    const RAINBOW = ['#ffaaaa', '#ffcf9c', '#fff09c', '#bdecaa', '#a8d4ff', '#d2bcff'];
    function backAt(x, y, t) {
      const w = wx.get(wkey(x, y));
      if (w) return w;
      let on = false;
      if (backdrop === 'Polka') on = ((x + (y % 8 < 4 ? 0 : 3)) % 6 === 1 && y % 4 === 1);
      else if (backdrop === 'Rain') { const k = (y - Math.floor(t * 6) + 240) % 7; on = (x * 5 + Math.floor((y - Math.floor(t * 6) + 240) / 7) * 3) % 6 === 0 && k < 2; }
      else if (backdrop === 'Stripes') on = (x + 40) % 6 < 2;
      else if (backdrop === 'Paw Prints') { const px = (x + 40) % 8, py = (y + 40 + ((x + 40) % 16 < 8 ? 4 : 0)) % 8; on = (py === 3 && (px === 2 || px === 4)) || (py === 4 && px === 3) || (py === 2 && px === 3); }
      else if (backdrop === 'Hearts') { const px = (x + 40) % 8, py = (y + 40) % 8; on = (py === 2 && (px === 2 || px === 4)) || (py === 3 && px >= 2 && px <= 4) || (py === 4 && px === 3); }
      else if (backdrop === 'Stars') { const px = (x + 40) % 7, py = (y + 40 + ((x + 40) % 14 < 7 ? 3 : 0)) % 7; on = (px === 3 && (py >= 2 && py <= 4)) || (py === 3 && (px === 2 || px === 4)); }
      else if (backdrop === 'Checker') on = (Math.floor((x + 42) / 3) + Math.floor((y + 42) / 3)) % 2 === 0;
      else if (backdrop === 'Zigzag') on = ((y + 40) + Math.abs(((x + 40) % 6) - 3)) % 6 === 0;
      else if (backdrop === 'Fish') { const px = (x + 45) % 9, py = (y + 40 + ((x + 45) % 18 < 9 ? 4 : 0)) % 8; on = (py === 3 && px >= 2 && px <= 5) || ((py === 2 || py === 4) && (px === 3 || px === 4 || px === 6)); }
      else if (backdrop === 'Moons') { const px = (x + 40) % 8, py = (y + 40 + ((x + 40) % 16 < 8 ? 4 : 0)) % 8; on = (px - 3.5) ** 2 + (py - 3.5) ** 2 <= 4.6 && (px - 4.6) ** 2 + (py - 2.9) ** 2 > 3.2; }
      else if (backdrop === 'Clouds') {
        for (let k = 0; k < 3 && !on; k++) {
          const cx = ((flakes[k][0] * 36 + t * 0.35 * (0.6 + flakes[k][2])) % 36) - 4, cy = 3 + k * 8 + flakes[k][1] * 3;
          on = ((x + 0.5 - cx) / 3.4) ** 2 + ((y + 0.5 - cy) / 1.3) ** 2 <= 1 || ((x + 0.5 - cx + 0.8) / 1.8) ** 2 + ((y + 0.5 - cy + 1.1) / 1.3) ** 2 <= 1;
        }
        if (on) return night ? bgs[1] : '#ffffff';
      } else if (backdrop === 'Rainbow') { const band = Math.floor(Math.hypot(x + 0.5 - 14, y + 0.5 - 21) - 12.5); if (band >= 0 && band < 6) return night ? shade(RAINBOW[band], 0.55, '#1e2240') : RAINBOW[band]; }
      else if (backdrop === 'Lacquer') {
        // red lacquer scattered with gold coins, each with its square hole
        const px = (x + 42) % 7, py = (y + 42 + ((x + 42) % 14 < 7 ? 0 : 3)) % 7, d = Math.max(Math.abs(px - 3), Math.abs(py - 3));
        if (d === 1) return (px + py) % 2 ? '#f6cc58' : bgs[1];
        if (d === 0) return '#8a1820';
      } else if (backdrop === 'Blueprint') {
        // drafting paper: a grid, and the plans of two gears
        const r1 = Math.hypot(x + 0.5 - 23.5, y + 0.5 - 22.5), r2 = Math.hypot(x + 0.5 - 4, y + 0.5 - 4.5);
        if (Math.abs(r1 - 6.2) < 0.5 || Math.abs(r1 - 2.6) < 0.45 || Math.abs(r2 - 3.4) < 0.45 || (Math.abs(r1 - 7.4) < 0.6 && Math.floor(Math.atan2(y - 22, x - 23) * 3.2 + 20) % 2 === 0)) return '#6a8cc8';
        if ((x + 40) % 5 === 0 && (y + 40) % 5 === 0) return '#5476b0';
        on = (x + 40) % 5 === 0 || (y + 40) % 5 === 0;
      }
      return on ? bgs[1] : bgs[0];
    }

    // a frame around the portrait (drawn over the outer cells)
    const TAPE = [['#ffb4c8', '#ffd8e4'], ['#a8d8f0', '#d4ecf8'], ['#ffe08a', '#fff0c0'], ['#b8e0a8', '#dcf0d0']][tapeTint];
    const HOLO = ['#ff9ab4', '#ffd27a', '#fff48a', '#9ae8b4', '#8ad0ff', '#c8a8ff'];
    function frameAt(x, y, t, bg) {
      const ring = Math.min(x, y, N - 1 - x, N - 1 - y);
      if (frame === 'Stamp') return ring <= 0 ? (((x + y) & 1) || ring < 0 ? '#d6cebd' : '#fffdf6') : ring === 1 && bg ? '#fffdf6' : null;
      if (frame === 'Polaroid') return ring <= 0 || (ring === 1 && bg) || y >= N - 3 ? (y === N - 3 && ring > 0 ? '#ecebe4' : '#fbfaf5') : null;
      if (frame === 'Gold') return ring <= 0 ? ((x + y) % 3 === 0 ? '#ffe680' : '#d09a20') : ring === 1 && bg ? '#8a5a10' : null;
      if (frame === 'Holo') return ring <= 0 || (ring === 1 && bg) ? HOLO[(((x + y + Math.floor(t * 6)) % 6) + 6) % 6] : null;
      if (frame === 'Tape') {
        for (const [u, v] of [[x, y], [N - 1 - x, y]]) if (u + v >= 2 && u + v <= 4 && Math.abs(u - v) <= 4) return TAPE[(((u - v) % 4) + 4) % 4 < 2 ? 0 : 1];
      }
      return null;
    }

    const topFree = !['Dino Hood', 'Shark Hood', 'Strawberry Hood', 'Dragon Hood', 'Unicorn Hood'].includes(hood);
    // belly panels on the body for the animal and fruit hoods: [panel colour, stripe colour]
    const BELLY = { 'Frog Hood': ['#e8f8c0'], 'Bear Hood': ['#f0d0a0'], 'Bunny Hood': ['#ffd2de'], 'Dino Hood': ['#ffc078', '#ffa040'], 'Shark Hood': ['#f0f4f8'], 'Duck Hood': ['#fff6c8'],
      'Lion Hood': ['#ffe4a8'], 'Dragon Hood': ['#ffd890', '#e8b860'] };
    const MANE = ['#ff8a9a', '#ffc070', '#fff07a', '#8ae0a0', '#80c8ff', '#c0a0ff'];
    const DYE = ['#c890e8', '#ff9ac8', '#ffd27a', '#8ad8f0'];
    function build(t) {
      const eyesNow = legend === 'Clockwork' ? 'Lamp Eyes' : legend ? eyes : mood ? 'Happy' : eyes, mouthNow = mood === 'mew' ? 'Open' : mouth;
      const blink = ((t + blinkAt) % blinkEvery) < 0.16;
      const twitch = ((t + 1.1) % twitchEvery) < 0.3;
      weatherAt(t);
      reg.fill(0);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) colr[y * N + x] = backAt(x, y, t);
      const breathe = Math.sin(t * 1.3) > 0.6 ? 1 : 0;
      // garment
      for (let y = 18; y < N; y++) for (let x = 0; x < N; x++) if (inside(x, y, 12, 28 - breathe * 0.4, 11.2, 8.4)) put(x, y, HC[0], 1);
      if (hood === 'Hoodie') { put(10, 20, HC[1], 2); put(10, 21, HC[1], 2); put(13, 20, HC[1], 2); put(13, 21, HC[1], 2); put(10, 22, '#ffffff', 2); put(13, 22, '#ffffff', 2); }
      if (hood === 'Raincoat') for (let y = 20; y < N; y++) { put(11, y, HC[1], 2); if (y % 2) put(12, y, '#fffbe0', 2); }
      if (hood === 'Knit') for (let x = 0; x < N; x++) for (let y = 20; y < N; y++) if (regAt(x, y) === 1 && y % 3 === 0) put(x, y, HC[1], 2);
      if (BELLY[hood]) { const [bc, sc] = BELLY[hood]; for (let y = 20; y < N; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1 && inside(x, y, 12, 26.4, 5.4, 4.6)) put(x, y, sc && (y % 2 === 0) ? sc : bc, 2); }
      if (hood === 'Bunny Hood') for (let y = 20; y < N; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1 && y % 2 === 0 && (x + (y % 4 ? 2 : 0)) % 4 === 0) put(x, y, '#ff94b4', 2);
      if (hood === 'Cow Hood') for (const [px, py, rx, ry] of [[4.5, 24.5, 2, 1.5], [18.5, 23.5, 1.6, 1.3], [14, 26.5, 1.8, 1.2]]) for (let y = 20; y < N; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1 && inside(x, y, px, py, rx, ry)) put(x, y, '#2c2a32', 2);
      if (hood === 'Mushroom Hood' || hood === 'Strawberry Hood') for (let y = 21; y < N; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1 && (hood === 'Strawberry Hood' ? y % 3 === 0 && (x + (y % 6 ? 2 : 0)) % 4 === 0 : inside(x, y, 4.5, 24, 1.4, 1.4) || inside(x, y, 19, 23.5, 1.5, 1.5) || inside(x, y, 9, 26, 1.2, 1.2) || inside(x, y, 16, 26.5, 1, 1))) put(x, y, hood === 'Strawberry Hood' ? '#ffe27a' : '#fff6ea', 2);
      if (hood === 'Bee Hood') for (let y = 20; y < N; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1 && (y === 22 || y === 23 || y === 26)) put(x, y, '#3a2a20', 2);
      if (hood === 'Unicorn Hood') for (let y = 22; y < 26; y++) for (let x = 0; x < 24; x++) if (regAt(x, y) === 1) put(x, y, MANE[[0, 1, 4, 5][y - 22]], 2);
      if (hood === 'Raincoat' && hoodTint === 7) for (const [x, y] of [[15, 22], [16, 22], [17, 22], [15, 23], [17, 23], [15, 24], [16, 24], [17, 24]]) put(x, y, '#b4d4e2', 2);
      if (hood === 'Astro Helmet') { put(11, 22, '#ff5a5a', 2); put(12, 22, '#5ac8f0', 2); put(11, 23, '#ffd23a', 2); put(12, 23, '#8ae06a', 2); }
      // animal hood ears go behind the hood dome
      if (hood === 'Bear Hood') { fillE(4.5, 4.5, 2.6, 2.6, HC[0], 3); fillE(19.5, 4.5, 2.6, 2.6, HC[0], 3); fillE(4.5, 4.8, 1.3, 1.3, HC[1], 4); fillE(19.5, 4.8, 1.3, 1.3, HC[1], 4); }
      if (hood === 'Bunny Hood') for (const ex of [7, 15]) for (let y = 0; y < 6; y++) for (let x = ex; x < ex + 3; x++) put(x, y, (x === ex + 1 && y > 0) ? HC[1] : HC[0], x === ex + 1 && y > 0 ? 4 : 3);
      if (hood === 'Lion Hood') {
        for (let y = -1; y < 22; y++) for (let x = -2; x < 26; x++) {
          const spike = Math.floor((Math.atan2(y + 0.5 - 12.5, x + 0.5 - 12) + 3.2) * 3.4) & 1;
          if (inside(x, y, 12, 12.5, 11.7 + spike, 10.7 + spike)) put(x, y, spike ? '#b8642a' : '#d27e36', 3);
        }
        for (const ex of [5.2, 18.8]) { fillE(ex, 4.4, 1.9, 1.9, HC[0], 4); fillE(ex, 4.6, 0.9, 0.9, '#c87a40', 4); }
      }
      if (hood === 'Cow Hood') { for (const [x, y] of [[5, 3], [4, 2], [4, 1], [18, 3], [19, 2], [19, 1]]) put(x, y, '#f2e2b4', 3); fillE(1.6, 9, 1.8, 1.1, HC[0], 3); fillE(22.4, 9, 1.8, 1.1, HC[0], 3); }
      if (hood === 'Dragon Hood') for (const [x, y] of [[6, 3], [5, 2], [5, 1], [4, 0], [17, 3], [18, 2], [18, 1], [19, 0]]) put(x, y, y < 1 ? '#fff8e4' : '#f0dcb0', 3);
      if (hood === 'Bee Hood') for (const [x, y] of [[9, 2], [8, 1], [6, -1], [7, -1], [6, 0], [7, 0], [14, 2], [15, 1], [16, -1], [17, -1], [16, 0], [17, 0]]) put(x, y, '#3a2a20', 3);
      // the clockwork cat's ears are two brass gears, turning in steps (faster while it is wound)
      if (hood === 'Riveted Helm') {
        const G = [['...t...', '.ttttt.', '.tbbbt.', 'ttbhbtt', '.tbbbt.', '.ttttt.', '...t...'], ['.t...t.', '..ttt..', '.tbbbt.', '.tbhbt.', '.tbbbt.', '..ttt..', '.t...t.']];
        const turn = Math.floor(t * (t < windUntil ? 4 : gearHover ? 2.5 : 0.8));
        [[3, 0], [14, 0]].forEach(([gx, gy], i) => stamp(G[(turn + i) & 1], gx, gy - (t < windUntil && (turn & 1) ? 1 : 0), { t: '#b07c2c', b: '#e8c070', h: '#4a3018' }, 3));
      }
      // hood dome
      fillE(12, 12.5, 10.6, 9.6, HC[0], 5);
      if (tieDye) for (let y = 0; y < 27; y++) for (let x = -1; x < 25; x++) { const r = regAt(x, y); if (r === 1 || r === 5) put(x, y, DYE[((Math.floor(Math.hypot(x - 12, y - 12) * 0.8 + Math.sin(x * 0.7) * 1.5) % 4) + 4) % 4], r); }
      if (hood === 'Knit') for (let y = 3; y < 9; y++) for (let x = 0; x < N; x++) if (regAt(x, y) === 5 && (x + y) % 4 === 0) put(x, y, shade(HC[0], 0.85), 5);
      if (hood === 'Raincoat') { put(6, 5, '#fffbe8', 6); put(5, 6, '#fffbe8', 6); put(7, 4, '#fffbe8', 6); }
      if (hood === 'Shark Hood') { for (let y = 0; y < 4; y++) for (let x = 11; x < 11 + (4 - y) * 0.8 + 1; x++) put(x + 1, y, HC[0], 3); fillE(12, 12.5, 10.6, 9.6, HC[0], 5); for (let x = 3; x < 21; x += 2) { put(x, 7 + (x > 6 && x < 18 ? -2 : 0) + 0, '#ffffff', 6); } }
      if (hood === 'Frog Hood') { for (const ex of [6.5, 17.5]) { fillE(ex, 3.8, 2.8, 2.6, HC[0], 6); fillE(ex, 3.6, 1.7, 1.6, '#ffffff', 7); put(Math.floor(ex), 3, '#20202a', 8); } }
      if (hood === 'Dino Hood') for (const [sx, sy] of [[12, 1], [8, 2], [16, 2], [5, 4], [19, 4]]) { put(sx, sy, HC[1], 6); put(sx - 1, sy + 1, HC[1], 6); put(sx, sy + 1, HC[1], 6); }
      if (hood === 'Bee Hood') for (let y = 0; y < 22; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && (y === 4 || y === 5 || y === 10 || y === 11 || y === 16 || y === 17)) put(x, y, '#3a2a20', 5);
      if (hood === 'Cow Hood') for (const [px, py, rx, ry] of [[6, 5.5, 2.4, 1.6], [17, 4.6, 1.8, 1.4], [2.6, 12.5, 1.3, 2.2], [21, 14, 1.4, 2.4]]) for (let y = 0; y < 22; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && inside(x, y, px, py, rx, ry)) put(x, y, '#2c2a32', 5);
      if (hood === 'Mushroom Hood') for (const [px, py, r] of [[5.5, 6.5, 1.7], [10.5, 4, 1.4], [16.5, 4.8, 1.6], [20, 9.5, 1.2], [3, 11.5, 1.1], [21.4, 14.5, 1]]) for (let y = 0; y < 22; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && inside(x, y, px, py, r, r)) put(x, y, '#fff6ea', 5);
      if (hood === 'Strawberry Hood') {
        for (let y = 3; y < 22; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && y % 3 === 0 && (x + (y % 6 ? 2 : 0)) % 4 === 0) put(x, y, '#ffe27a', 5);
        for (let x = 6; x < 18; x++) { put(x, 3, x % 2 ? '#3aa040' : '#56c050', 6); if (x % 3 === 0) put(x, 4, '#3aa040', 6); if (x % 3 === 1 && x > 7 && x < 16) put(x, 2, '#56c050', 6); }
        put(12, 1, '#2a7a30', 6); put(12, 0, '#2a7a30', 6); put(13, 0, '#3aa040', 6);
      }
      if (hood === 'Dragon Hood') {
        for (let y = 0; y < 22; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && (x + 2 * y) % 5 === 0) put(x, y, shade(HC[0], 0.8), 5);
        for (const [x, y] of [[12, 1], [11, 2], [12, 2], [13, 2], [8, 3], [16, 3]]) put(x, y, '#ff7a4a', 6);
      }
      if (hood === 'Unicorn Hood') {
        for (const [x, y] of [[12, -1], [11, 0], [12, 0], [11, 1], [12, 1], [11, 2], [12, 2], [13, 2], [11, 3], [12, 3]]) put(x, y, (y + 2) % 2 ? '#ffd860' : '#f0a830', 6);
        for (let y = 4; y < 19; y++) { let x = -1; while (x < 12 && regAt(x, y) !== 5) x++; if (x < 12) { put(x, y, MANE[(y >> 1) % 6], 6); put(x + 1, y, MANE[((y >> 1) + 1) % 6], 6); } }
      }
      if (hood === 'Astro Helmet') { put(18, 3, '#9aa0b0', 6); put(18, 2, '#9aa0b0', 6); put(18, 1, Math.sin(t * 3) > 0 ? '#ff4a5a' : '#a83040', 6); }
      // hood lining around the face
      fillE(12, 13.6, 8.6, 7.2, HC[1], 9);
      if (hood === 'Glazed Hood') {
        // cobalt cloud scrolls brushed over the glaze, and a gold rim where it meets the red lining
        for (let y = 2; y < 23; y++) for (let x = -1; x < 25; x++) {
          if (regAt(x, y) !== 5) continue;
          let rim = false;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (regAt(x + dx, y + dy) === 9) rim = true;
          if (rim) { put(x, y, (x + y) % 3 ? '#f2c040' : '#fff4b0', 7); continue; }
          const sc = Math.sin(x * 0.95 + y * 0.35) + Math.cos(y * 1.25 - x * 0.3);
          if (sc > 1.3 || (x + 2 * y) % 4 === 0) put(x, y, '#2848a8', 7);
          else if (sc > 1.0 && (x + y) % 2) put(x, y, '#7890d4', 7);
        }
        // and cobalt waves along the hem
        for (let x = -1; x < 25; x++) for (const [y, on] of [[24, x % 4 === 1], [25, x % 4 === 0 || x % 4 === 2], [26, true]]) if (on && regAt(x, y) === 1) put(x, y, y === 26 ? '#7890d4' : '#2848a8', 2);
      }
      if (hood === 'Riveted Helm') {
        // a seam over the crown and a ring of rivets round the brim
        for (let y = 3; y < 7; y++) put(12, y, '#5e6878', 6);
        for (let y = 2; y < 23; y++) for (let x = -1; x < 25; x++) if (regAt(x, y) === 5 && !inside(x, y, 12, 12.5, 9.4, 8.4) && (x * 3 + y) % 4 === 0) put(x, y, '#eef2f8', 6);
        for (let x = 0; x < 25; x++) for (let y = 4; y < 23; y++) if (regAt(x, y) === 9 && (x + y) % 2 === 0 && !inside(x, y, 12, 13.6, 7.6, 6.2)) put(x, y, '#a85a30', 9);
      }
      if (hood === 'Astro Helmet') { put(5, 9, '#ffffff', 9); put(6, 8, '#ffffff', 9); put(18, 18, '#e8f8ff', 9); }
      if (hood === 'Duck Hood') { for (let x = 9; x < 15; x++) put(x, 5, '#ff9a2a', 10); for (let x = 10; x < 14; x++) put(x, 6, '#f07a1a', 10); put(8, 4, '#1c1a24', 7); put(15, 4, '#1c1a24', 7); if (companion !== 'Bird') { put(12, 2, HC[0], 3); put(13, 1, HC[0], 3); put(11, 1, HC[0], 3); } }
      // cat ears poke through holes in plain hoods
      if (hood === 'Raincoat' || hood === 'Knit' || hood === 'Hoodie' || hood === 'Glazed Hood') {
        for (const side of [-1, 1]) {
          const lean = (side < 0 && twitch) || mood === 'pet' || side === tilt ? 1 : 0;
          for (let y = 1; y <= 6; y++) {
            const w = (y - 1) * 0.7;
            for (let x = 0; x < N; x++) {
              const dx = (x + 0.5 - (12 + side * 5.5)) * side;
              if (dx >= -1 - w * 0.6 && dx <= w * 0.7 + 0.4 && y >= 1 + lean) put(x, y, (dx > -w * 0.3 && dx < w * 0.4 && y > 3) ? (legend === 'Porcelain' ? '#d8303a' : '#f6a8b8') : furs[0], (dx > -w * 0.3 && dx < w * 0.4 && y > 3) ? 11 : 10);
            }
          }
        }
      }
      // in the other hoods the cat's own ears are tucked up inside, either side of the face (they fold when petted)
      if (tuckedEars) for (const side of [-1, 1]) {
        const fold = (side < 0 && twitch) || mood === 'pet' || side === tilt ? 1 : 0;
        const EAR = fold ? [[6, 6], [6, 7], [7, 7], [8, 7], [6, 8], [7, 8], [8, 8], [9, 8]] : [[6, 4], [6, 5], [7, 5], [6, 6], [7, 6], [8, 6], [6, 7], [7, 7], [8, 7], [9, 7], [7, 8], [8, 8], [9, 8]];
        // (the hood's own eyes, beak, horns and leaves stay in front)
        const free = (x, y) => ![6, 7, 8, 10].includes(regAt(x, y));
        for (const [x, y] of EAR) { const X = side < 0 ? x : 23 - x; if (free(X, y)) put(X, y, furs[0], 10); }
        for (const [x, y] of fold ? [[7, 8]] : [[7, 6], [7, 7], [8, 7]]) { const X = side < 0 ? x : 23 - x; if (free(X, y)) put(X, y, '#f6a8b8', 11); }
      }
      // face
      fillE(12, 14.2, 7.3, 5.9, furs[0], 12);
      if (fur === 'Orange Tabby' || fur === 'Grey' || fur === 'Brown Tabby' || fur === 'Cream' || fur === 'Golden') { for (const [x, y] of [[10, 9], [10, 10], [13, 9], [13, 10], [11, 9], [12, 9], [5, 13], [6, 14], [18, 13], [17, 14]]) put(x, y, furs[1], 13); }
      if (fur === 'Calico') { fillE(8, 11, 3, 2.6, '#f2a24a', 13); fillE(16.5, 10.5, 2.5, 2, '#3a3438', 13); }
      if (fur === 'Tortie') { fillE(8.4, 11.6, 2.6, 2.2, '#e8963c', 13); fillE(16.2, 17, 2.2, 1.6, '#c8742c', 13); put(15, 10, '#f2c890', 13); put(16, 10, '#f2c890', 13); }
      if (fur === 'Tuxedo' || fur === 'Lilac') fillE(12, 16.6, 3.8, 2.4, furs[2], 13);
      if (fur === 'Siamese') { fillE(12, 15.8, 3.6, 2.6, '#8a6a58', 13); }
      if (fur === 'Cosmic') for (const [x, y] of [[8, 10], [15, 11], [17, 16], [6, 15], [12, 10]]) put(x, y, '#ffffff', 13);
      if (fur === 'Golden') [[7, 11], [16, 17], [15, 10]].forEach(([x, y], i) => { if (Math.sin(t * 2.2 + i * 2.1) > 0.75) put(x, y, '#ffffff', 13); });
      if (fur === 'Ghost') { put(6, 11, '#ffffff', 13); put(7, 10, '#ffffff', 13); }
      // the muzzle: two soft lobes under the nose
      if (!legend) { fillE(10.9, 16.5, 1.9, 1.35, MUZ, 13); fillE(13.1, 16.5, 1.9, 1.35, MUZ, 13); }
      // eyes
      const eyeCol = eyesNow === 'Green' ? '#4ab84a' : eyesNow === 'Glowing' ? '#c8ff5a' : darkFace ? '#eaa63a' : '#1c1a24';
      for (const [ex, side] of [[8, -1], [14, 1]]) {
        const ey = 13;
        if (eyesNow === 'Lamp Eyes') {
          // goggle lamps in dark sockets: a shutter blinks them, winding or a hover turns them up
          const hot = t < windUntil || gearHover;
          for (let y = ey - 1; y < ey + 3; y++) for (let x = ex - 1; x < ex + 3; x++) if (x < ex || x > ex + 1 || y < ey || y > ey + 1) put(x, y, hot ? '#7a3a14' : '#4a2e14', 14);
          if (blink && !hot) { put(ex, ey, '#a8742a', 15); put(ex + 1, ey, '#a8742a', 15); put(ex, ey + 1, '#7c501c', 15); put(ex + 1, ey + 1, '#7c501c', 15); continue; }
          const fl = hot && Math.floor(t * 5) % 2;
          put(ex, ey, '#fffbe0', 15); put(ex + 1, ey, hot ? '#ffe680' : '#ffc040', 15); put(ex, ey + 1, hot ? '#ffd050' : '#ff9a20', 15); put(ex + 1, ey + 1, fl ? '#ffe680' : hot ? '#ffb020' : '#e07010', 15);
          continue;
        }
        const shut = blink || eyesNow === 'Sleepy' || eyesNow === 'Happy' || (eyesNow === 'Wink' && side > 0);
        if (shut) {
          if (eyesNow === 'Happy' || (eyesNow === 'Wink' && side > 0 && !blink)) { const lid = mood && darkFur ? '#e6a6b8' : LID; put(ex, ey + 1, lid, 14); put(ex + 1, ey, lid, 14); put(ex + 2, ey + 1, lid, 14); put(ex - 1 + 0, ey + 1, furs[0], 12); }
          else { put(ex, ey + 1, LID, 14); put(ex + 1, ey + 1, LID, 14); }
          continue;
        }
        if (eyesNow === 'Heart Eyes') { const cx = side < 0 ? 8 : 15; for (const [dx, dy] of [[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1], [0, 2]]) put(cx + dx, ey + dy, '#ef3a5c', 14); put(cx - 1, ey, '#ff9ab0', 15); continue; }
        if (eyesNow === 'Star Eyes') { const cx = side < 0 ? 8 : 15; for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1]]) put(cx + dx, ey + dy, '#ffc21a', 14); put(cx, ey, '#fff6c0', 15); continue; }
        if (eyesNow === 'Dizzy') { const cx = side < 0 ? 8 : 15, gap = Math.floor(t * 6) % 8, RING = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]; RING.forEach(([dx, dy], i) => { if (i !== gap) put(cx + dx, ey + dy, LID, 14); }); put(cx, ey, LID, 14); continue; }
        if (eyesNow === 'Big Shiny') { for (let y = ey - 1; y < ey + 2; y++) for (let x = ex; x < ex + 2; x++) put(x, y, '#241c34', 14); put(ex, ey - 1, '#ffffff', 15); put(ex + 1, ey + 1, '#8ab4ff', 15); continue; }
        let iris = eyeCol;
        if (eyesNow === 'Odd Eyes') iris = side < 0 ? '#3a8ae8' : '#e8b020';
        for (let y = ey; y < ey + 2; y++) for (let x = ex; x < ex + 2; x++) put(x, y, iris, 14);
        put(ex, ey - 1, eyesNow === 'Sparkly' ? '#1c1a24' : furs[0], eyesNow === 'Sparkly' ? 14 : 12);
        put(ex + 1, ey - 1, eyesNow === 'Sparkly' ? '#1c1a24' : furs[0], eyesNow === 'Sparkly' ? 14 : 12);
        if (eyesNow === 'Green' || eyesNow === 'Odd Eyes' || eyesNow === 'Glowing' || (darkFace && iris === '#eaa63a')) { put(ex + (side < 0 ? 1 : 0), ey, '#1c1a24', 14); put(ex + (side < 0 ? 1 : 0), ey + 1, '#1c1a24', 14); }
        put(ex, ey, '#ffffff', 15);
        if (eyesNow === 'Sparkly') put(ex + 1, ey + 1, '#ffffff', 15);
        if (eyesNow === 'Determined') { const brow = darkFace ? '#e8dcd0' : '#3a2430'; put(side < 0 ? ex : ex + 1, ey - 2, brow, 14); put(side < 0 ? ex + 1 : ex, ey - 1, brow, 14); put(side < 0 ? ex - 1 : ex + 2, ey - 2, brow, 14); }
        if (eyesNow === 'Teary') { const drip = Math.floor((t * 0.8 + (side < 0 ? 0 : 0.5)) % 1 * 3); put(side < 0 ? ex : ex + 1, ey + 2 + drip, '#7ac8ff', 15); put(ex + 1, ey + 1, '#cfe8ff', 15); }
        if (eyesNow === 'Glowing') { put(ex - 1, ey, shade(furs[0], 1, '#ffffff'), 13); put(ex + 2, ey + 1, shade(furs[0], 1, '#ffffff'), 13); }
      }
      // nose, mouth, whiskers, cheeks
      put(11, 15, '#f07a92', 16); put(12, 15, '#f07a92', 16);
      const M = darkFur ? '#e6a6b8' : '#3a2430';
      if (mouthNow === 'Cat Smile' || mouthNow === 'Blep' || mouthNow === 'Fishbone' || mouthNow === 'Lollipop') { put(10, 16, M, 16); put(11, 17, M, 16); put(12, 17, M, 16); put(13, 16, M, 16); put(11, 16, legend ? furs[0] : MUZ, legend ? 12 : 13); }
      else if (mouthNow === 'Open') { put(11, 16, M, 16); put(12, 16, M, 16); put(11, 17, '#e85a70', 16); put(12, 17, '#e85a70', 16); put(10, 16, M, 16); put(13, 16, M, 16); }
      else if (mouthNow === 'Fang') { put(10, 16, M, 16); put(11, 16, M, 16); put(12, 16, M, 16); put(13, 16, M, 16); put(12, 17, '#ffffff', 16); }
      else if (mouthNow === 'Pout' || mouthNow === 'Bubblegum') { put(11, 17, M, 16); put(12, 17, M, 16); }
      else if (mouthNow === 'Toothy Grin') { put(10, 16, M, 16); put(13, 16, M, 16); put(11, 16, '#ffffff', 16); put(12, 16, '#ffffff', 16); put(11, 17, M, 16); put(12, 17, M, 16); }
      else if (mouthNow === 'Whistle') { put(12, 16, M, 16); put(12, 17, M, 16); put(13, 16, M, 16); }
      else if (mouthNow === 'Yawn') { put(10, 17, M, 16); put(13, 17, M, 16); put(11, 16, M, 16); put(12, 16, M, 16); put(11, 17, '#5a2030', 16); put(12, 17, '#5a2030', 16); put(11, 18, '#e85a70', 16); put(12, 18, '#e85a70', 16); }
      if (mouthNow === 'Blep') put(12, 18, '#f07a92', 16);
      if (mouthNow === 'Fishbone') { const wig = Math.sin(t * 2) > 0 ? 0 : 1; for (let x = 13; x < 19; x++) put(x, 17, '#e8e8f0', 17); for (const x of [14, 16]) { put(x, 16 + wig, '#e8e8f0', 17); put(x, 18 - wig, '#e8e8f0', 17); } put(19, 16, '#e8e8f0', 17); put(19, 18, '#e8e8f0', 17); }
      if (mouthNow === 'Lollipop') { put(14, 17, '#ff5a8a', 17); put(15, 17, '#ffffff', 17); put(14, 18, '#ffffff', 17); put(15, 18, '#ff5a8a', 17); put(16, 19, '#f4ecdc', 17); put(17, 20, '#f4ecdc', 17); }
      if (mouthNow === 'Toast') stamp(['.ooo.', 'oaaao', 'oaaao', 'ooooo'], 10, 16, { o: '#c47a32', a: '#f8dca0' }, 17);
      // whiskers and cheeks
      const cheek = fur === 'Ghost' ? '#c8dcff' : legend === 'Clockwork' ? '#fff0b8' : legend === 'Porcelain' ? '#f48a9a' : '#f6a8b8';
      put(6, 16, cheek, 16); put(17, 16, cheek, 16);
      if (mood === 'pet') { put(5, 16, '#f6a8b8', 16); put(18, 16, '#f6a8b8', 16); put(6, 15, '#f8b8c4', 16); put(17, 15, '#f8b8c4', 16); }
      if (legend) for (const [x, y] of [[3, 15], [4, 15], [3, 17], [4, 16], [20, 15], [19, 15], [20, 17], [19, 16]]) put(x, y, legend === 'Porcelain' ? '#3a5296' : '#3a3440', 18);
      // whiskers fan out from the cheeks across the face's edge, light on dark and dark on light
      else for (const [x, y] of [[6, 15], [5, 15], [4, 15], [3, 14], [2, 14], [6, 17], [5, 17], [4, 18], [3, 18]]) for (const X of [x, 23 - x]) {
        const r = regAt(X, y);
        if (r === 17 || r === 16) continue;
        put(X, y, lumOf(colr[(y + 1) * N + X + 2]) > 160 ? '#7a6a78' : '#f6f4fa', 18);
      }
      // extras
      if (extra === 'Bell Collar') { for (let x = 7; x < 17; x++) put(x, 20, '#d83a4a', 19); put(11, 21, '#ffd040', 20); put(12, 21, '#ffd040', 20); put(11, 22, '#c89010', 20); put(12, 22, '#ffd040', 20); }
      if (extra === 'Bandage') { put(15, 11, '#f8e8d0', 21); put(16, 12, '#f8e8d0', 21); put(16, 11, '#e8d0b0', 21); put(15, 12, '#e8d0b0', 21); }
      if (extra === 'Round Glasses') { for (const ex of [8, 14]) for (const [dx, dy] of [[-1, 0], [-1, 1], [2, 0], [2, 1], [0, -1], [1, -1], [0, 2], [1, 2]]) put(ex + dx, 13 + dy, '#3a3040', 22); put(11, 13, '#3a3040', 22); put(12, 13, '#3a3040', 22); }
      if (extra === 'Leaf') { const sw = Math.sin(t * 1.5) > 0 ? 0 : 1; put(14 + sw, 2, '#4ab84a', 23); put(15 + sw, 1, '#6ad86a', 23); put(16 + sw, 1, '#4ab84a', 23); put(13, 3, '#3a7a30', 23); }
      if (extra === 'Freckles') for (const [x, y] of [[7, 15], [8, 16], [15, 15], [16, 16], [6, 14], [17, 14]]) put(x, y, furs[1], 13);
      if (extra === 'Sunglasses') {
        // (smoky blue lenses on the darkest furs, so the shades still show)
        const LENS = darkFur ? '#4e5272' : '#24222c';
        for (const ex of [7, 13]) { stamp(['.aa.', 'aaaa', '.aa.'], ex, 12, { a: LENS }, 22); put(ex + 1, 12, '#ffffff', 22); put(ex, 13, '#8a8aa8', 22); }
        put(11, 13, LENS, 22); put(12, 13, LENS, 22);
        for (const x of [5, 6, 17, 18]) put(x, 13, darkFur ? '#8a8aa8' : '#3a3644', 22);
      }
      if (extra === 'Heart Shades') { for (const ex of [6, 13]) stamp(['aa.aa', 'abaaa', '.aaa.', '..a..'], ex, 12, { a: '#ff3a84', b: '#ffb4d0' }, 22); put(11, 13, '#c02a6a', 22); put(12, 13, '#c02a6a', 22); }
      if (extra === 'Eyepatch') { for (let y = 12; y < 15; y++) { put(14, y, '#1c1a24', 22); put(15, y, '#1c1a24', 22); } put(13, 13, '#1c1a24', 22); put(16, 13, '#1c1a24', 22); for (const [x, y] of [[16, 11], [17, 10], [18, 9], [13, 11], [12, 10], [11, 9], [10, 8], [9, 7]]) put(x, y, '#3a3040', 22); }
      if (extra === 'Star Sticker') { for (const [x, y] of [[17, 14], [16, 15], [17, 15], [18, 15], [17, 16]]) put(x, y, '#ffc21a', 21); put(17, 15, '#fff2a0', 21); }
      if (extra === 'Monocle') { for (const [x, y] of [[13, 13], [13, 14], [16, 13], [16, 14], [14, 12], [15, 12], [14, 15], [15, 15]]) put(x, y, '#e8b830', 22); for (const [x, y] of [[16, 15], [17, 16], [17, 17], [18, 18], [18, 19]]) put(x, y, '#c89a20', 22); }
      if (extra === 'Scarf') {
        const SC = [['#e84a5a', '#ffe8e0'], ['#4a8ad8', '#e0ecff'], ['#3aa070', '#f6e8c0'], ['#f0a030', '#fff4d0']][scarfTint];
        for (let x = 5; x < 19; x++) { put(x, 20, x % 3 === 0 ? SC[1] : SC[0], 33); put(x, 21, x % 3 === 0 ? SC[1] : SC[0], 33); }
        for (let y = 22; y < 26; y++) { put(15, y, y % 2 ? SC[1] : SC[0], 33); put(16, y, y % 2 ? SC[0] : SC[1], 33); }
      }
      if (extra === 'Lucky Bell') { for (let x = 6; x < 18; x++) put(x, 20, x % 4 === 1 ? '#f0a0a8' : '#d8303a', 19); put(11, 20, '#f6cc40', 20); put(12, 20, '#fff2a0', 20); put(11, 21, '#c89010', 20); put(12, 21, '#f6cc40', 20); }
      if (extra === 'Wind-Up Key') {
        // the key in its side turns slowly, and spins while the music box plays
        const ph = Math.floor(t * (t < windUntil ? 7 : 1.6)) % 4, KEY = [['aaa', 'a.a', 'a.a', 'a.a', 'aaa'], ['aaa', 'a.a', 'aaa'], ['aaa'], ['aaa', 'a.a', 'aaa']][ph];
        put(22, 13, '#8a5a20', 30);
        stamp(KEY, 23, 13 - (KEY.length >> 1), { a: ph === 2 ? '#a8742a' : '#e8b850' }, 30);
      }
      // a companion that sits on the hood moves with the head
      const hop = ((t + 0.4) % 2.6) < 0.25 ? -1 : 0;
      // a ladybug crawling on the side of the hood
      if (companion === 'Ladybug') { const k = Math.round(Math.sin(t * 0.6)); stamp(['.kk.', 'rkkr', 'srrs', 'rrkr', '.rr.'], 19, 8 + k, { k: '#1c1a24', r: '#ec3a3a', s: '#1c1a24' }, 31); put(20, 10 + k, '#ffb0a8', 32); }
      const BIRD = [['..aaa..', '.aaaaeb', 'ttaacc.', '..cccc.', '..y.y..'], { a: '#6ab4f0', e: '#1c1a24', b: '#ffa030', c: '#fff0c8', t: '#3a7ac0', y: '#e88a20' }];
      if (companion === 'Bird' && topFree) stamp(BIRD[0], 9, -2 + hop, BIRD[1], 31);
      // the legendary cats are glazed or plated: light them as round forms, from the pointer if there is one
      if (legend) {
        const RA = legend === 'Porcelain' ? ['#c3c3d3', '#dad9e3', '#efece6', '#ffffff'] : ['#56606e', '#6e7888', '#8c96a6', '#e6edf6'];
        const RB = legend === 'Porcelain' ? RA : ['#7c501c', '#a8742a', '#d6a04a', '#fff0b8'];
        // the form is lit from the upper left; the glint (the light it catches) follows the pointer
        const Lx = -0.48, Ly = -0.62, Lz = 0.62;
        const d = Math.hypot(lightX, lightY) || 1, k = Math.min(0.8, d / 9);
        const gl = Math.hypot(lightX / d * k, lightY / d * k, 0.8), Gx = lightX / d * k / gl, Gy = lightY / d * k / gl, Gz = 0.8 / gl;
        const hl = Math.hypot(Gx, Gy, Gz + 1), Hx = Gx / hl, Hy = Gy / hl, Hz = (Gz + 1) / hl;
        for (let gy = 0; gy < N; gy++) for (let gx = 0; gx < N; gx++) {
          const i = gy * N + gx, r = reg[i], ramp = r === 1 || r === 5 ? RA : r === 12 ? RB : null;
          if (!ramp || colr[i] !== ramp[2]) continue;
          const [cx, cy, rx, ry] = r === 1 ? [12, 28, 11.2, 8.4] : r === 5 ? [12, 12.5, 10.6, 9.6] : [12, 14.2, 7.3, 5.9];
          let nx = (gx - 2 + 0.5 - cx) / rx, ny = (gy - 1 + 0.5 - cy) / ry;
          const q = nx * nx + ny * ny;
          if (q > 0.97) { const sc = Math.sqrt(0.97 / q); nx *= sc; ny *= sc; }
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), lam = nx * Lx + ny * Ly + nz * Lz, spec = nx * Hx + ny * Hy + nz * Hz;
          colr[i] = spec > 0.975 ? ramp[3] : lam < 0.06 ? ramp[0] : lam < 0.32 ? ramp[1] : ramp[2];
        }
      }
      // a head tilt: the whole hood and face lean a cell to one side (the garment stays put)
      if (tilt) {
        const rowC = new Array(N), rowR = new Int16Array(N);
        for (let y = 0; y < 20; y++) {
          const sh = tilt;
          for (let x = 0; x < N; x++) { rowC[x] = colr[y * N + x]; rowR[x] = reg[y * N + x]; }
          for (let x = 0; x < N; x++) {
            const sx = x - sh, inside = sx >= 0 && sx < N && rowR[sx] > 1;
            if (!inside && reg[y * N + x] === 1) continue;
            colr[y * N + x] = inside ? rowC[sx] : backAt(x, y, t);
            reg[y * N + x] = inside ? rowR[sx] : 0;
          }
        }
      }
      // a pin on the chest
      const PINS = {
        'Star Pin': ['..a..', '.aba.', 'aabaa', '.aaa.', '.a.a.'], 'Heart Pin': ['aa.aa', 'abaaa', 'aaaaa', '.aaa.', '..a..'], 'Fish Pin': ['.aaa..a', 'akbaaaa', 'aaaaaaa', '.aaa..a'],
        'Flower Pin': ['.a.a.', 'aaaaa', '.aba.', 'aaaaa', '.a.a.'], 'Moon Pin': ['.aaa.', 'aab..', 'aa...', 'aab..', '.aaa.'], 'Paw Badge': ['.aaa.', 'abaca', 'aaaaa', 'abbba', '.aaa.'],
        'Rainbow Pin': ['.rrr.', 'rryrr', 'ry.yr', 'g...g'],
      };
      if (pin !== 'None') {
        const pc = { 'Star Pin': ['#ffc21a', '#fff2a0'], 'Heart Pin': ['#ef4a68', '#ffb0c0'], 'Fish Pin': ['#5ab8e8', '#d8f0ff'], 'Flower Pin': ['#ffffff', '#ffc83a'], 'Moon Pin': ['#ffe27a', '#fff8d0'], 'Paw Badge': ['#8a5ac8', '#ffffff'], 'Rainbow Pin': ['#ff6a6a', '#ffd23a'] }[pin];
        const P0 = PINS[pin];
        const pinX = holding === 'Golden Fish' ? 23 - P0[0].length : pin === 'Fish Pin' ? 1 : 2;
        stamp(P0, pinX, 26 - P0.length, { a: pc[0], b: pc[1], c: pc[1], k: '#1c1a24', r: '#ff6a6a', y: '#ffd23a', g: '#5ac8f0' }, 30);
        if (Math.sin(t * 0.9 + 1) > 0.93) put(pinX + 1, 26 - P0.length + 1, '#ffffff', 30);
      }
      // paws, and what they hold at chest height (clear of the chin): each thing its own little outlined shape
      if (holding !== 'Nothing') {
        const iy = holding === 'Lucky Coin' ? 22 : frame === 'Polaroid' ? 19 : 20;
        const sprite = (rows, x0, y0, pal, r) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (pal[ch]) put(x0 + i, y0 + j, pal[ch], r + (ch === 'o' ? 0 : 1)); }));
        const tint4 = (a, b, c2, d) => [a, b, c2, d][kitFur];
        const ITEM = {
          Mug: [['ooooooo..', 'occccco..', 'obaaaaooo', 'obaaaao.o', 'oaaaaao.o', 'oaaaaaooo', '.ooooo...'], ['#f4efe6', '#e86a5a', '#5ac8f0', '#ffd23a'][kitFur], '#ffffff', '#7a4426'],
          Fish: [['..oooo.oo', '.oacaaoao', 'oaabaaaao', '.oaaaaoao', '..oooo.oo'], '#8ab4d8', '#d8ecf8', '#1c1a24'],
          Yarn: [['..ooo..', '.oabao.', 'oaabaao', 'oabaaao', '.oaaao.', '..ooo.c'], ['#e85a7a', '#8a5ac8', '#3aa070', '#f0a030'][kitFur], '#ffffff', ['#e85a7a', '#8a5ac8', '#3aa070', '#f0a030'][kitFur]],
          Letter: [['oooooooooo', 'obaaaaaabo', 'oabaaaabao', 'oaabccbaao', 'oaaaccaaao', 'oooooooooo'], '#fbf6ea', '#b8ac96', '#e8304a'],
          Dumpling: [['..oooo..', '.obbbbo.', 'oaaaaaao', 'oacaacao', 'oaaddaao', '.oooooo.'], '#fbf4e6', '#e8dcc8', '#1c1a24'],
          'Tiny Kitten': [['.oo..oo.', 'oaaooaao', 'oaaaaaao', 'oacaacao', 'oaaddaao', '.oooooo.'], ['#f6a24a', '#a8acb8', '#f6f4f0', '#3a3640'][kitFur], '#ffffff', '#1c1a24'],
          Onigiri: [['...oo...', '..oaao..', '.oabaao.', 'oaaaaaao', 'oaccccao', '.oooooo.'], '#fbfbf4', '#ffffff', '#2a4038'],
          'Ice Cream': [['.oooo.', 'oabaao', 'oaaaao', 'occcco', '.occo.', '..oo..'], tint4('#ffb8d0', '#c89070', '#fff4e0', '#a8e0c0'), '#ffffff', '#e0a050'],
          Cookie: [['.oooo.', 'oacaao', 'oaaaco', 'ocaaao', 'oaacao', '.oooo.'], '#d8a060', '#f0c890', '#5a3420'],
          // a gift with its bow standing up off the lid
          Gift: [['.cc.cc.', 'c.ccc.c', 'ooocooo', 'oaacaao', 'oaacaao', 'oaacaao', 'ooooooo'], tint4('#5ac8f0', '#ff6a8a', '#8ae06a', '#b48af0'), '#ffffff', '#ffd23a'],
          // an open book: two pages of lines either side of the spine, the cover showing round the edge
          Book: [['.ooo.ooo.', 'obddoddbo', 'obbbobbbo', 'obddoddbo', 'oaaaoaaao', '.ooo.ooo.'], tint4('#e8584a', '#4a7ad8', '#3aa070', '#8a5ac8'), '#fbf6ea', '#ffd23a'],
          Plant: [['.c..c.', '.cc.c.', '..cc..', 'oooooo', '.oaao.', '.oooo.'], '#d8704a', '#f09a70', '#4ab84a'],
          'Paper Boat': [['...o....', '..oao...', '.oaaao..', 'oooooooo', 'obbbbbbo', '.obbbbo.'], '#fbfbf4', '#dfe8f2', '#1c1a24'],
          'Star Wand': [['..c..', 'ccccc', '.ccc.', '.c.c.', '..a..', '..a..'], '#c8a0e8', '#ffffff', '#ffc21a'],
          // the golden fish: big, held sideways across both paws, fins, scales, a bright eye
          'Golden Fish': [['...offfo....oo', '.oobaaaaaaooao', 'owkaacacacaaao', '.oaaaaaaaaaoao', '..ooaaaaaoo.oo', '....ooooo....o'], '#ffcf3a', '#fff4b0', '#e8a020'],
          'Lucky Coin': [['.oooooo.', 'oabbaaao', 'oaccccao', 'oaaaaaao', '.oooooo.'], '#f2c447', '#fff6c0', '#c8901c'],
          'Clock Heart': [['..ooo..', '.oaaao.', 'oaaaaao', 'oaacaao', 'oaaaaao', '.oaaao.', '..ooo..'], '#f6eed8', '#ffffff', '#3a2a1a'],
        }[holding];
        const [rows, main, light, acc] = ITEM;
        const w = rows[0].length, x0 = Math.round(12 - w / 2);
        const kb = holding === 'Tiny Kitten' && ((t + 1.7) % 3.3) < 0.18;
        const gold = holding === 'Golden Fish';
        const pal = { o: holding === 'Clock Heart' ? '#a8742a' : holding === 'Lucky Coin' || gold ? '#9a5a10' : shade(main, 0.45), a: main, b: light, c: kb ? shade(main, 0.8) : acc, d: holding === 'Book' ? '#a8a4b8' : '#f07a92', f: '#ff9a2a', w: '#ffffff', k: '#1c1a24' };
        const wy = holding === 'Star Wand' ? iy - 2 : holding === 'Gift' ? iy - 1 : iy;
        sprite(rows, x0, wy, pal, holding === 'Lucky Coin' || gold ? 19 : holding === 'Mug' ? 26 : 24); // (the mug's body sits in an unshaded region: one flat glaze)
        if (holding === 'Mug') { const puff = Math.floor(t * 2) % 2; for (const [dx, dy, col] of [[1 + puff, 1, '#d6d8e2'], [2 - puff, 2, '#c4c8d4'], [3 + puff, 1, '#d6d8e2'], [4 - puff, 2, '#c4c8d4']]) if (wy - dy >= 18) put(x0 + dx, wy - dy, col, 27); }
        if (holding === 'Fish' && Math.sin(t * (t < flopUntil ? 16 : 3)) > 0.7) { put(x0 + w, iy, pal.o, 24); put(x0 + w, iy + 4, pal.o, 24); }
        if (gold && Math.sin(t * (t < flopUntil ? 16 : 3)) > 0.7) { put(x0 + w, wy, pal.o, 19); put(x0 + w, wy + 5, pal.o, 19); }
        if (gold || holding === 'Lucky Coin') {
          // a glint runs along the gold (quickly, after a tap)
          const sx = x0 - 3 + Math.floor(t * (t < flopUntil || t < beckonUntil ? 14 : 4)) % (w + 9);
          for (let j = 1; j < rows.length - 1; j++) { const ch = rows[j][sx - x0 + 1 - j]; if (ch === 'a' || ch === 'b' || ch === 'c') put(sx + 1 - j, wy + j, '#ffffff', 26); }
        }
        if (gold) {
          // and it twinkles: two little stars blinking either side
          for (const [sx, sy, ph] of [[2, wy - 1, 0], [21, wy + 1, 1.6], [19, wy - 3, 3.1]]) {
            const on = Math.sin(t * 2.4 + ph) > 0.35;
            if (!on) continue;
            put(sx, sy, '#fffbe0', 26);
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(sx + dx, sy + dy, '#ffd23a', 26);
          }
        }
        if (holding === 'Clock Heart') {
          const D = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]], [dx, dy] = D[Math.floor(t * (t < windUntil ? 8 : 1)) % 8];
          put(x0 + 3 + dx, iy + 3 + dy, '#3a2a1a', 26);
          if (!dx || !dy) put(x0 + 3 + dx * 2, iy + 3 + dy * 2, '#3a2a1a', 26);
          put(x0 + 3, iy + 1, '#c8402a', 26);
        }
        if (holding === 'Star Wand') { const tw = Math.floor(t * 2.5) % 3; put(x0 - 1 + tw * 3, wy - 1 - (tw % 2), '#fff6c0', 26); }
        // paws hugging it from both sides (under it, for the big golden fish), a touch lighter on dark fur so they show
        const PAW = darkFur || fur === 'Tuxedo' ? mix(furs[0], '#ffffff', 0.3) : furs[0], PAWD = darkFur || fur === 'Tuxedo' ? furs[0] : furs[1];
        const pawAt = gold ? [[7, -1], [15, 1]] : [[x0 - 1, -1], [holding === 'Mug' ? x0 + 5 : x0 + w - 1, 1]], py = gold ? wy + 4 : iy + 2;
        for (const [px, side] of pawAt) {
          put(px, py, PAW, 28); put(px + 1, py, PAW, 28); put(px, py + 1, PAW, 28); put(px + 1, py + 1, PAW, 28);
          put(side < 0 ? px + 1 : px, py + 1, PAWD, 29);
        }
      }
      if (waving) { const sw = Math.floor(t * 2.6) % 2 ? 0 : -1; for (const [x, y] of [[3, 20], [4, 20], [2, 19], [3, 19], [2, 18], [3, 18], [1, 17], [2, 17], [1, 16], [2, 16]]) put(x, y, furs[0], 28); stamp(['pap', 'aaa', 'apa'], 0 + sw, 13, { a: furs[0], p: '#f6a8b8' }, 28); }
      // the porcelain cat's raised paw beckons now and then, and three times when tapped
      if (legend === 'Porcelain') {
        const down = t < beckonUntil ? Math.floor((beckonUntil - t) * 3) % 2 === 1 : ((t + blinkAt) % 3.4) < 0.4;
        const top = down ? 5 : 2;
        for (let y = top + 3; y < 20; y++) { put(19, y, '#ffffff', 28); put(20, y, '#f4f2ee', 28); put(21, y, y > 13 ? '#c9c7d2' : '#dad9e3', 28); }
        stamp(down ? ['.aab', 'aaab', 'aaab'] : ['.aa.', 'apap', 'aaab', 'appb'], 18, top - (down ? 0 : 1), { a: '#ffffff', p: '#f48a9a', b: '#dad9e3' }, 28);
        for (let x = 19; x < 22; x++) put(x, top + 4, x === 20 ? '#f2c040' : '#d8303a', 28);
      }
      // companions that live around the cat
      if (companion === 'Bird' && !topFree) stamp(BIRD[0], 18, 17 + hop, BIRD[1], 31);
      // a snail on the right shoulder, inching back and forth
      if (companion === 'Snail') { const sx = Math.round(Math.sin(t * 0.25)); stamp(['..ss...', '.sqqs..', 'sqsqs.e', 'ssqss.b', 'bbbbbbb'], 18 + sx, 19, { s: '#d8904a', q: '#a85a2a', b: '#eadcbc', e: '#3a2a30' }, 31); }
      // a mouse on the right shoulder, ducking down now and then
      if (companion === 'Mouse') { const up = ((t + 1.3) % 5) < 2.6 ? 0 : 1; stamp(['gg.gg', 'gpgpg', 'gegeg', '.gng.'], 19, 19 + up, { p: '#f6a8b8', g: '#a8a8b8', e: '#1c1a24', n: '#f07a92' }, 31); }
      if (companion === 'Butterfly') {
        const bx = 20 + Math.round(Math.sin(t * 0.7) * 1.5), by = 3 + Math.round(Math.sin(t * 1.3) * 1.5), open = Math.floor(t * 4) % 2;
        stamp(open ? ['aa.aa', 'abkba', '.aka.', 'aa.aa'] : ['.a.a.', '.bkb.', '.aka.', '.a.a.'], bx - 2, by - 1, { a: '#ff7ac0', b: '#ffd23a', k: '#3a2a40' }, 31);
      }
      if (companion === 'Fireflies') for (let i = 0; i < 3; i++) {
        if (Math.sin(t * 2 + i * 1.7) < -0.2) continue;
        const fx = 12 + Math.round(Math.cos(t * 0.5 + i * 2.1) * 11.5), fy = 9 + Math.round(Math.sin(t * 0.7 + i * 2.1) * 8);
        put(fx, fy, '#fffbc0', 32); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(fx + dx, fy + dy, '#ffd83a', 31);
      }
      if (companion === 'Ghost Kitten') stamp(['a...a', 'aaaaa', 'aeaea', '.aaa.', '.a.a.'], -1, -1 + Math.round(Math.sin(t * 1.1)), { a: '#eaf4ff', e: '#6a7aa8' }, 31);
      // whistled notes float off to the side
      if (mouthNow === 'Whistle') for (let k = 0; k < 2; k++) { const ph = (t * 0.45 + k * 0.5) % 1, nx = 15 + Math.round(ph * 5) + k, ny = 14 - Math.round(ph * 8); if (ph < 0.85) stamp(['.af', '.a.', 'aa.'], nx, ny, { a: night ? '#fff0c8' : '#3a2a48', f: night ? '#fff0c8' : '#3a2a48' }, 34); }
      if (mouthNow === 'Bubblegum') {
        const ph = ((t + blinkAt) % 3.2) / 3.2;
        if (ph < 0.92) { const r = 0.6 + ph * (holding === 'Nothing' ? 2.4 : 1.9); fillE(12, 18.4, r, r * 0.92, '#ff9ad6', 35); put(Math.round(12 - r * 0.5), Math.round(18 - r * 0.5), '#ffd6ee', 35); }
        else for (const [x, y] of [[9, 18], [15, 18], [12, 20], [10, 16], [14, 16]]) put(x, y, '#ff9ad6', 35);
      }
      // hearts the viewer floats off the backdrop
      for (const h of hearts) { const k = (t - h.t0) / 1.4; if (k < 0 || k > 1) continue; stamp(['a.a', 'aaa', '.a.'], h.x - 1, Math.round(h.y - k * 6), { a: k > 0.75 ? '#ffb4c8' : '#ff5a84' }, 36); }
    }

    // coloured outlines: edges of each region take a darker shade of their own colour
    const outCol = new Array(N * N);
    function outline() {
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x, r = reg[i];
        let col = colr[i];
        if (r > 0) {
          let edge = 0;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const X = x + dx, Y = y + dy;
            if (X < 0 || Y < 0 || X >= N || Y >= N) continue;
            const rr = reg[Y * N + X];
            if (rr === 0) edge = 2;
            else if (rr < r && edge < 1 && r !== 9 && r !== 14 && r !== 15 && r !== 16 && r !== 13 && r !== 18 && r !== 11 && r !== 4 && r !== 8 && r !== 7 && r !== 2 && r !== 20 && r !== 22 && r !== 28 && r !== 29 && r !== 27) edge = 1;
          }
          if (edge === 2) col = shade(col, 0.42);
          else if (edge === 1) col = shade(col, 0.72);
        }
        outCol[i] = col;
      }
    }

    const ctx = c.ctx;
    const cell = Math.max(1, Math.floor(S / N)), off = Math.floor((S - cell * N) / 2);
    // the viewer: a mew on a tap, a purr while petting, hearts off the backdrop;
    // notes from a pentatonic keyed by the hash's tail
    let mood = '', mewUntil = -1, petUntil = -1, nextPurr = 0, px0 = -1, py0 = -1;
    // the legendaries' and the golden fish's own state: a music box wound, a beckon, a flop, the light
    let windUntil = -1, beckonUntil = -1, flopUntil = -1, gearHover = false, nextTick = 0, tock = 0, lightX = -5.5, lightY = -8;
    const hearts = [];
    const kitten = 69 + parseInt(c.hash.slice(-7, -5), 16) % 6, PEN = [0, 2, 4, 7, 9];
    const pen = k => kitten + 12 * Math.floor(k / 5) + PEN[((k % 5) + 5) % 5];
    const cellOf = (x, y) => [Math.floor((x * S - off) / cell), Math.floor((y * S - off) / cell)];
    const onCat = (x, y) => { const [gx, gy] = cellOf(x, y); return gx >= 0 && gy >= 0 && gx < N && gy < N && reg[gy * N + gx] > 0 && reg[gy * N + gx] !== 36; };
    function feel(t) {
      const inp = c.input;
      for (const p of inp.taps()) {
        if (!onCat(p.x, p.y)) {
          const [gx, gy] = cellOf(p.x, p.y);
          if (hearts.length > 5) hearts.shift();
          hearts.push({ x: gx - 2, y: gy - 1, t0: t });
          c.sound.note(pen(5 + hearts.length % 4), { dur: 0.22, vel: 0.12, wave: 'sine', pan: (p.x - 0.5) * 0.6 });
          c.sound.note(pen(7 + hearts.length % 4), { dur: 0.3, vel: 0.08, wave: 'sine', at: 0.1, pan: (p.x - 0.5) * 0.6 });
          continue;
        }
        const [gx, gy] = cellOf(p.x, p.y), rr = reg[gy * N + gx];
        if (holding === 'Golden Fish' && (rr === 19 || rr === 20 || rr === 26)) {
          // the golden fish flops and rings like a little bell
          flopUntil = t + 0.8;
          [10, 12, 14].forEach((k, i) => c.sound.note(pen(k), { dur: 0.5 + i * 0.15, vel: 0.12 - i * 0.025, wave: 'sine', at: i * 0.09 }));
          continue;
        }
        if (legend === 'Porcelain') {
          // three beckons, each with a porcelain tink
          if (t < beckonUntil - 1.2) continue;
          beckonUntil = t + 2;
          for (let k = 0; k < 3; k++) { c.sound.note(pen(k === 2 ? 11 : 9), { dur: 0.45, vel: 0.11, wave: 'sine', at: k * 0.66 + 0.33 }); c.sound.note(pen(15), { dur: 0.2, vel: 0.05, wave: 'sine', at: k * 0.66 + 0.36 }); }
          continue;
        }
        if (legend === 'Clockwork') {
          // wind it: four ratchet clicks, then its music box plays its own tune
          if (t < windUntil - 0.6) continue;
          windUntil = t + 3.4;
          for (let k = 0; k < 4; k++) c.sound.hit('click', 0.12, { at: k * 0.08 });
          tune.forEach((n, k) => c.sound.note(pen(n + 4), { dur: 0.5, vel: 0.1, wave: 'sine', at: 0.45 + k * 0.3 }));
          continue;
        }
        if (t < mewUntil - 0.3) continue;
        mewUntil = t + 0.55;
        const k = Math.floor((1 - p.y) * 4);
        c.sound.note(pen(k + 3), { dur: 0.1, vel: 0.22, wave: 'triangle', cutoff: 2200 });
        c.sound.note(pen(k + 1), { dur: 0.32, vel: 0.2, wave: 'triangle', cutoff: 1600, at: 0.09 });
        if (holding === 'Tiny Kitten' || companion === 'Ghost Kitten') { c.sound.note(pen(k + 6), { dur: 0.07, vel: 0.14, wave: 'triangle', cutoff: 3000, at: 0.42 }); c.sound.note(pen(k + 5), { dur: 0.16, vel: 0.12, wave: 'triangle', cutoff: 2600, at: 0.5 }); }
      }
      if (inp.inside && inp.down && onCat(inp.x, inp.y) && px0 >= 0 && Math.hypot(inp.x - px0, inp.y - py0) > 0.004) petUntil = t + 0.5;
      px0 = inp.inside && inp.down ? inp.x : -1; py0 = inp.y;
      if (t < petUntil && t >= nextPurr) {
        nextPurr = t + 0.3;
        c.sound.hit('noise', 0.16, { cutoff: 160, dur: 0.2 });
      }
      mood = t < mewUntil ? 'mew' : t < petUntil ? 'pet' : '';
      // the legendaries: the light follows the pointer; the clockwork cat ticks while you hover
      if (legend) {
        const tx = inp.inside ? (inp.x * S - off) / cell - 14 : -5.5, ty = inp.inside ? (inp.y * S - off) / cell - 14 : -8;
        lightX += (tx - lightX) * 0.2; lightY += (ty - lightY) * 0.2;
        gearHover = legend === 'Clockwork' && inp.inside && onCat(inp.x, inp.y);
        if (gearHover && t >= nextTick && t >= windUntil) { nextTick = t + 0.5; tock ^= 1; c.sound.hit('click', tock ? 0.05 : 0.035); }
      }
      while (hearts.length && t - hearts[0].t0 > 1.5) hearts.shift();
    }
    // ---------- the legendaries' own pictures ----------
    // (every roll and trait above is untouched; they only take over the drawing)
    // Porcelain is drawn by the cats' own program above again, as before v=283 (a member asked for it back; the founder,
    // 2026-10-20): a tap and it beckons three times, its glaze lit from the pointer. Only Clockwork has a picture of its own.
    // ===== Clockwork (redesign): a tin wind-up toy printed in three risograph inks, fluorescent pink, yellow and blue
    // on cream paper, their overlaps making the reds and navy, the tones in halftone, on its own
    // 56-dot grid: a brass tin head with a riveted steel helm and a printed face, a red tin barrel with gold seams and a
    // clock in its belly, stubby feet and a big key in its side, on a flat blue shadow. Draw circles round it
    // to wind it (the gauge on the left fills); let go and the whole toy shakes its way across the card, its key spins,
    // the little clock in its belly races and its music box plays, and when the big hand passes twelve a bird pops out of the hatch in its
    // head. A short, still tap gives it a little wind
    if (legend === 'Clockwork') return clockworkRiso();
    function clockworkRiso() {
      const inp = c.input, Q = 56, CX = 28;
      const ce = Math.max(1, Math.floor(S / Q)), oe = Math.floor((S - ce * Q) / 2), M = Math.ceil(oe / ce) + 2, G = Q + 2 * M;
      const cv = document.createElement('canvas'); cv.width = cv.height = G;
      const cctx = cv.getContext('2d'), img = cctx.createImageData(G, G), buf = new Uint32Array(img.data.buffer);
      // three ink layers, each a level 0..16 per dot (16 solid, between a halftone), and which parts are the toy
      const LP = new Uint8Array(G * G), LYw = new Uint8Array(G * G), LB = new Uint8Array(G * G), part = new Uint8Array(G * G);
      const ix = (x, y) => { x = Math.round(x) + M; y = Math.round(y) + M; return x >= 0 && y >= 0 && x < G && y < G ? y * G + x : -1; };
      const paint = (x, y, p, yy, b, r) => { const i = ix(x, y); if (i < 0) return; LP[i] = p; LYw[i] = yy; LB[i] = b; if (r !== undefined) part[i] = r; };
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      // the inks by letter: p pink, y yellow, b blue, r red (pink on yellow), g green, n navy (pink on blue), o paper
      const INK = { p: [16, 0, 0], y: [0, 16, 0], b: [0, 0, 16], r: [16, 16, 0], g: [0, 16, 16], n: [16, 0, 16], o: [0, 0, 0], k: [16, 16, 16], q: [7, 0, 0], c: [0, 5, 0], s: [0, 0, 7] };
      const spr = (rows, x0, y0, r) => rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const v = INK[row[i]]; if (v) paint(x0 + i, y0 + j, v[0], v[1], v[2], r); } });
      const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
      const PAPER = rgb('#f4ecd8'), INKS = [rgb('#ff4aa8'), rgb('#ffe400'), rgb('#1a7ac4')];
      const MIXC = [];
      for (let m = 0; m < 8; m++) { const v = PAPER.map((ch, k) => { let o = ch; for (let j = 0; j < 3; j++) if (m >> j & 1) o = o * INKS[j][k] / 255; return Math.round(o); }); MIXC.push((255 << 24) | (v[2] << 16) | (v[1] << 8) | v[0]); }
      const bay = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const blink = t => ((t + blinkAt) % blinkEvery) < 0.16;
      let sxNow = 0, spring = 0, mnA = -Math.PI / 2 - 0.6, hrA = -2.2, gearA = 0, keyA = 0, cuckooAt = -9, lastNote = 0, noteI = 0, windAt = -9, ver = 0;
      const notes = [];

      function draw(t) {
        LP.fill(0); LYw.fill(0); LB.fill(0); part.fill(0);
        const run = spring > 0.05, step = Math.floor(t * 6), bob = run ? step % 2 : 0;
        // while it runs it shakes its way across the card and back
        const sx = run ? Math.round(Math.sin(t * 1.6) * 6 * Math.min(1, spring * 3)) + (step % 2 ? 1 : 0) : 0;
        sxNow = sx;
        // the bare cream paper, and one flat blue shadow under the toy
        for (let y = 49; y < 55; y++) for (let x = 6; x < 52; x++) if (inE(x, y, 28 + Math.round(sxNow * 0.5), 52.5, 21, 2.6)) paint(x, y, 0, 0, 16);
        const X = x => x + sx;
        // its stubby tin feet, lifted in turn as it waddles
        for (const [fx, up] of [[17, run && step % 2 ? 2 : 0], [31, run && !(step % 2) ? 2 : 0]]) spr(['.nnnnnn.', 'nnnnnnnn', 'nnnnnnnn', 'nnnnnnnn'], X(fx), 48 - up + bob, 2);
        // the tin barrel of its body, painted red: gold seam bands with rivets, a printed shine, its clock in its belly
        for (let y = 30; y < 49; y++) for (let x = 14; x < 42; x++) {
          const cx = Math.min(x - 14, 41 - x), cy = Math.min(y - 30, 48 - y);
          if (cx + cy < 2) continue;
          let v = 'r';
          if (y === 32 || y === 33 || y === 45 || y === 46) v = (y === 32 || y === 45) && (x - 15) % 4 === 0 ? 'n' : 'y';
          else if (x === 17 || x === 18) v = 'o';
          spr([v], X(x), y + bob, 2);
        }
        const ccy = 39;
        for (let y = ccy - 9; y <= ccy + 9; y++) for (let x = 28 - 9; x <= 28 + 9; x++) {
          const dx = x + 0.5 - 28, dy = y + 0.5 - ccy, r = Math.hypot(dx, dy);
          if (r > 3.6) continue;
          let v = r > 2.8 ? 'n' : 'o';
          if (r <= 2.8) {
            const hand = (ang, len, w) => { const ux = Math.cos(ang), uy = Math.sin(ang), al = dx * ux + dy * uy, ac = Math.abs(-dx * uy + dy * ux); return al > -0.5 && al < len && ac < w; };
            if (hand(mnA, 2.6, 0.55)) v = 'n'; else if (hand(hrA, 1.8, 0.6)) v = 'r';
          }
          spr([v], X(x), y + bob, 3);
        }
        // stubby tin arms with riveted shoulders
        for (const [ax, sd] of [[9, -1], [42, 1]]) { spr(['rrrrr', 'rrrrr', 'rrrrr', 'yyyyy', 'yyyyy'], X(ax), 33 + bob, 4); spr(['n'], X(ax + (sd < 0 ? 4 : 0)), 34 + bob, 4); }
        // the great butterfly key in its side, turned by your circles and spinning while it runs
        const kph = ((Math.floor(keyA / (Math.PI / 4)) % 4) + 4) % 4, kw = [5, 3, 1, 3][kph];
        for (let x = 41; x < 47; x++) spr(['n'], X(x), 39 + bob, 5);
        for (const sd of [-1, 1]) for (let y = 0; y < 9; y++) for (let x = 0; x <= kw; x++) {
          const yy = 39 + sd * (1 + y), w = Math.round(kw * Math.sin(Math.PI * (y + 0.5) / 9) + 0.4);
          if (x > w) continue;
          const edge = x === w || y === 8;
          spr([edge ? 'n' : kph === 2 ? 'r' : 'y'], X(47 + x), yy + bob, 5); if (x) spr([edge ? 'n' : kph === 2 ? 'r' : 'y'], X(47 - x), yy + bob, 5);
        }
        // its ears: little tin triangles, riveted
        for (const [ex, sd] of [[16, -1], [39, 1]]) for (let y = 3; y < 12; y++) { const w = (y - 3) * 0.6 + 0.4; for (let x = ex - 7; x <= ex + 7; x++) { const dx = x + 0.5 - ex - 0.5; if (Math.abs(dx) > w) continue; spr([Math.abs(dx) < w - 1.6 && y > 6 ? 'p' : 'y'], X(x), y + bob, 6); } }
        // the head: a round-cornered brass tin box, a riveted steel helm band with a copper rim, a seam down each side
        for (let y = 10; y < 30; y++) for (let x = 12; x < 44; x++) {
          const cx = Math.min(x - 12, 43 - x), cy = Math.min(y - 10, 29 - y);
          if (cx + cy < 3) continue;
          let v = 'y';
          if (y <= 13) v = y === 12 && (x - 13) % 4 === 0 ? 'o' : 'b';
          else if (y === 14) v = 'r';
          else if (x === 14 || x === 41) v = 'c';
          spr([v], X(x), y + bob, 7);
        }
        // the hatch on its crown, and the bird that pops out of it, big
        const ck = t - cuckooAt, outB = ck >= 0 && ck < 1.8 ? Math.min(1, ck * 5, (1.8 - ck) * 5) : 0;
        spr(['nnnnnn'], X(25), 10 + bob, 7);
        if (outB > 0) {
          const by = 9 - Math.round(outB * 9) + bob, op = Math.floor(ck * 6) % 2;
          for (let y = by + 6; y < 10 + bob; y++) spr(['nn'], X(27), y, 8);
          spr(['..nnn....', '.nyyyn...', 'nyynyyn' + (op ? 'rr' : 'r.'), 'nyyyyyn' + (op ? 'r.' : '..'), 'nyyyyyyn.', '.nyyyyn..', '..nnnn...'], X(23), by - 1, 8);
        }
        // its printed tin face: lamp eyes in navy rings with a slit pupil and a printed glint, pink cheeks, a pink nose
        const bl = blink(t) && !run;
        for (const ex of [20.5, 35.5]) for (let y = 15; y < 27; y++) for (let x = Math.floor(ex - 5); x <= ex + 5; x++) {
          const r = Math.hypot(x + 0.5 - ex, y + 0.5 - 20.5);
          if (r > 5.1) continue;
          let v = r > 4.1 ? 'n' : bl ? 'y' : r > 3.4 ? 'r' : 'y';
          if (!bl && r <= 3 && Math.abs(x + 0.5 - ex) < 0.6) v = 'n';
          if (!bl && x === Math.floor(ex) - 2 && y === 18) v = 'o';
          if (bl && y === 20 && r <= 4.1) v = 'n';
          spr([v], X(x), y + bob, 10);
        }
        for (const cx of [16, 39]) spr(['.pp.', 'pppp', '.pp.'], X(cx - 1), 24 + bob, 10);
        spr(['pppp', '.pp.'], X(26), 22 + bob, 11);
        const MOUTH = {
          'Cat Smile': [['n..n..n', '.nn.nn.'], 25], Open: [['.nnnnn.', 'nppppnn', '.nppn..'], 25], Fang: [['.nnnnn.', '.nonon.', '..n.n..'], 25], Blep: [['n..n..n', '.nnpnn.', '...pp..'], 25],
          Pout: [['..nnn..', '.n...n.'], 25], 'Toothy Grin': [['nnnnnnn', 'nonnnon', '.nnnnn.'], 25], Whistle: [['..nn...', '.n..n..', '..nn...'], 26], Yawn: [['.nnn.', 'nprpn', 'nrrrn', 'nprpn', '.nnn.'], 26],
          Fishbone: [['n..n..n.n.n.n', '.nn.nn.nnnnnn', '.......n.n.n.'], 25], Lollipop: [['n..n..n....', '.nn.nnn....', '.......n...', '........rp.', '........pr.'], 25],
          Bubblegum: [['n..n..n', '.nn.nn.'], 25], Toast: [['rrrrrr', 'ryyyyr', 'ryyyyr', 'rrrrrr'], 25],
        }[mouth] || [['n..n..n', '.nn.nn.'], 25];
        spr(MOUTH[0], X(MOUTH[1]), 24 + bob, 11);
        if (mouth === 'Bubblegum') { const g = (t % 3) / 3, rb = 1 + g * 3.4; if (g < 0.92) for (let y = 21; y < 35; y++) for (let x = 26; x < 42; x++) { const r = Math.hypot(x + 0.5 - 32, y + 0.5 - 27); if (r < rb) paint(X(x), y + bob, r > rb - 1 ? 16 : 6, 0, 0, 11); } }
        if (mouth === 'Whistle' && Math.floor(t * 2) % 2) spr(['.n', 'n.', 'nn'], X(32), 20 + bob - (Math.floor(t * 4) % 3));
        for (const [y0, x0] of [[23, 13], [25, 13]]) for (let x = x0; x < x0 + 4; x++) { spr(['n'], X(x), y0 + bob, 12); spr(['n'], X(Q - 1 - x), y0 + bob, 12); }
        // the wind gauge down the left: a navy tube with a red fill and ticks
        for (let y = 14; y < 51; y++) { const fl = (50 - y) / 36 < spring; for (let x = 3; x < 8; x++) { const edge = x === 3 || x === 7 || y === 14 || y === 50; paint(x, y, edge || fl ? 16 : 0, !edge && fl ? 16 : 0, edge ? 16 : 0, 9); } if (y % 6 === 2) paint(8, y, 16, 0, 16, 9); }
        // notes floating up from its music box while it plays, big
        for (let i = notes.length - 1; i >= 0; i--) { const k = t - notes[i].t0; if (k > 2.2) { notes.splice(i, 1); continue; } const x = Math.round(notes[i].x + Math.sin(k * 3) * 2), y = Math.round(26 - k * 12); spr(['...b..', '...bb.', '...b.b', '...b.b', '...b..', '.bbb..', 'bbbb..', '.bb...'], x, y); }
        companionR(t);
        weatherR(t);
        frameR(t);
      }
      // its Companion, keeping it company in the corner of the print
      function companionR(t) {
        const hop = ((t + 0.4) % 2.6) < 0.25 ? -1 : 0;
        if (companion === 'Ladybug') spr(['..nn..', '.rnnr.', 'rrnnrr', 'rnrrnr', 'rrnnrr', '.rrrr.'], 10, 46 + Math.round(Math.sin(t * 0.6)));
        if (companion === 'Bird') spr(['..bbb...', '.bbbbny.', 'bbbbbb..', '.bbbbp..', '..y.y...'], 9, 47 + hop);
        if (companion === 'Butterfly') { const o = Math.floor(t * 4) % 2, bx = 45 + Math.round(Math.sin(t * 0.7) * 1.5), by = 2 + Math.round(Math.sin(t * 1.3) * 1.5); spr(o ? ['pp...pp', 'pyp.pyp', '.ppnpp.', '..pnp..', '.pp.pp.'] : ['..p.p..', '..pyp..', '...n...', '..pnp..', '..p.p..'], bx, by); }
        if (companion === 'Snail') spr(['...yyy..', '..yrryy.', '.yryyry.', '.yyrryyn', 'ssssssss'], 9 + Math.round(Math.sin(t * 0.25)), 47);
        if (companion === 'Mouse') { const up = ((t + 1.3) % 5) < 2.6 ? 0 : 1; spr(['pp.pp.', 'sssss.', 'snsssp', 'sssss.', '.s.s..'], 10, 47 + up); }
        if (companion === 'Fireflies') for (let i = 0; i < 3; i++) { if (Math.sin(t * 2 + i * 1.7) < -0.2) continue; const fx = CX + Math.round(Math.cos(t * 0.5 + i * 2.1) * 22), fy = 28 + Math.round(Math.sin(t * 0.7 + i * 2.1) * 18); spr(['.y.', 'yry', '.y.'], fx - 1, fy - 1); }
        if (companion === 'Ghost Kitten') spr(['b...b', 'bbbbb', 'b.b.b', 'b...b', '.bbb.'], 46, 2 + Math.round(Math.sin(t * 1.1) * 1.5));
      }
      // its Weather, drifting across the paper
      function weatherR(t) {
        // its Weather, as a little printed stamp in the top left corner rather than loose over the picture
        if (weather === 'Clear') return;
        for (let y = 3; y < 11; y++) for (let x = 3; x < 11; x++) { const r = Math.hypot(x + 0.5 - 7, y + 0.5 - 7); if (r < 4) paint(x, y, 0, 0, r > 3.1 ? 16 : 0); }
        const on = Math.floor(t * 2) % 2;
        const ICON = { Snow: ['b.b.b', '.bbb.', 'bbobb', '.bbb.', 'b.b.b'], Petals: ['.p.p.', 'ppppp', '.pyp.', 'ppppp', '.p.p.'], Bubbles: ['.bb..', 'b..b.', '.bb.b', '...bb', '.....'],
          Leaves: ['...gg', '..ggg', '.ggg.', 'ggg..', 'g....'], Confetti: ['p...y', '..b..', 'r...b', '..y..', 'b..p.'], Sparkles: on ? ['..y..', '..y..', 'yyryy', '..y..', '..y..'] : ['.....', '..y..', '.yry.', '..y..', '.....'] }[weather];
        if (ICON) spr(ICON, 5, 5);
      }
      // its Frame, round the print
      function frameR(t) {
        for (let y = -M; y < Q + M; y++) for (let x = -M; x < Q + M; x++) {
          const ring = Math.min(x, y, Q - 1 - x, Q - 1 - y);
          if (ring >= 3) continue;
          if (ring < 0) { paint(x, y, 0, 0, frame === 'Stamp' ? 16 : 0); if (frame === 'Stamp') paint(x, y, 16, 0, 16); continue; }
          if (frame === 'None' || frame === 'Tape') { if (ring === 0) paint(x, y, 0, 0, 16); }
          else if (frame === 'Polaroid') paint(x, y, 0, 0, ring === 0 ? 16 : 0);
          else if (frame === 'Gold') { const v = ring === 0 ? [0, 0, 16] : ring === 1 ? [16, 16, 0] : [0, 16, 0]; paint(x, y, v[0], v[1], v[2]); }
          else if (frame === 'Stamp') { const along = (x + y) % 3; if (ring === 0) paint(x, y, along ? 16 : 0, 0, along ? 16 : 0); else if (ring === 1) paint(x, y, 0, 0, 0); else paint(x, y, 16, 0, 16); }
          else if (frame === 'Holo') { const k = ((x + y + Math.floor(t * 8)) % 12 + 12) % 12, v = [[16, 0, 0], [16, 16, 0], [0, 16, 0], [0, 16, 16], [0, 0, 16], [16, 0, 16]][Math.floor(k / 2)]; paint(x, y, v[0], v[1], v[2]); }
        }
        if (frame === 'Tape') for (const [x0, dir] of [[0, 1], [55, -1]]) for (let k = 0; k < 10; k++) for (let w = 0; w < 3; w++) paint(x0 + dir * k, 8 - k + w, 0, 8, 0);
        if (frame === 'Gold') for (const [x, y] of [[3, 3], [52, 3], [3, 52], [52, 52]]) spr(['.r.', 'ryr', '.r.'], x - 1, y - 1);
      }
      // the press: each ink's tone as halftone dots, the overlaps multiplied on the paper
      function press(t) {
        const op = [0, 0], oy = [0, 0], ob = [0, 0];
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          const i = y * G + x;
          const get = (L, o, ph) => { const xx = x - o[0], yy = y - o[1]; if (xx < 0 || yy < 0 || xx >= G || yy >= G) return 0; const v = L[yy * G + xx]; return v >= 16 ? 1 : v && bay[((yy + ph) & 3) * 4 + ((xx + ph * 3) & 3)] < v ? 1 : 0; };
          buf[i] = MIXC[get(LP, op, 0) | get(LYw, oy, 1) << 1 | get(LB, ob, 2) << 2];
        }
        cctx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cv, oe - M * ce, oe - M * ce, G * ce, G * ce);
      }
      // the pointer: circles round it wind it, a short still tap gives it a little wind
      let pT = 0, pdn = false, wAng = null, ratchet = 0, pressAt = -9, pX = 0, pY = 0, moved = 0, nextTk = 0, tk = 0;
      function feelR(t) {
        const dt = Math.min(0.1, Math.max(0.001, t - pT)); pT = t;
        const gx = (inp.x * S - oe) / ce, gy = (inp.y * S - oe) / ce, down = inp.inside && inp.down, pressed = down && !pdn, released = !down && pdn;
        inp.taps();
        if (pressed) { pressAt = t; pX = gx; pY = gy; moved = 0; }
        if (down) moved = Math.max(moved, Math.hypot(gx - pX, gy - pY));
        if (down) {
          const ang = Math.atan2(gy - 30, gx - CX - sxNow);
          if (wAng !== null) {
            let da = ang - wAng; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
            if (Math.abs(da) < 1.2 && Math.hypot(gx - CX - sxNow, gy - 30) > 4) { spring = Math.min(1, spring + Math.abs(da) / (Math.PI * 4)); keyA += Math.abs(da) * 2; ratchet += Math.abs(da); if (ratchet > Math.PI / 4) { ratchet = 0; ver++; c.sound.hit('click', 0.1 + spring * 0.08); } }
          }
          wAng = ang;
        } else wAng = null;
        if (released && t - pressAt < 0.3 && moved < 2) { windAt = t; spring = Math.min(1, spring + 0.12); ver++; for (let k = 0; k < 2; k++) c.sound.hit('click', 0.12, { at: k * 0.08 }); }
        if (!down) spring = Math.max(0, spring - dt * 0.11);
        const over = inp.inside && Math.hypot(gx - CX - sxNow, (gy - 30) * 1.1) < 20;
        const run = down ? 0.15 : 1 + spring * 14 + (over ? 1.5 : 0);
        const before = Math.floor((mnA + Math.PI / 2) / (Math.PI * 2));
        mnA += dt * 0.5 * run; hrA += dt * 0.5 * run / 12; gearA += dt * run; if (!down && spring > 0.05) keyA -= dt * 5;
        if (Math.floor((mnA + Math.PI / 2) / (Math.PI * 2)) > before && t - cuckooAt > 1.5) { cuckooAt = t; c.sound.note(pen(9), { dur: 0.25, vel: 0.12, wave: 'triangle', cutoff: 1800, at: 0.2 }); c.sound.note(pen(5), { dur: 0.4, vel: 0.12, wave: 'triangle', cutoff: 1800, at: 0.55 }); }
        if (!down && spring > 0.05 && t - lastNote > 0.3) { lastNote = t; c.sound.note(pen(tune[noteI % tune.length] + 4), { dur: 0.5, vel: 0.1, wave: 'sine' }); notes.push({ x: 44 + (noteI % 2) * 4, t0: t }); noteI++; }
        if (over && !down && spring <= 0.05 && t >= nextTk) { nextTk = t + 0.5; tk ^= 1; c.sound.hit('click', tk ? 0.05 : 0.035); }
        pdn = down;
      }
      let lastQ = -1, lastV = -1;
      function renderR(t) {
        feelR(t);
        // (it moves in steps, twelve a second, like the clockwork it is)
        const tq = Math.floor(t * 12) / 12;
        if (tq === lastQ && ver === lastV) return;
        lastQ = tq; lastV = ver;
        draw(tq);
        press(tq);
      }
      renderR(0);
      return t => renderR(t);
    }
    let before = '';
    function render(t) {
      feel(t);
      build(t);
      outline();
      const key = outCol.join(',') + (frame === 'Holo' ? Math.floor(t * 6) : '');
      if (key === before) return;
      before = key;
      // one path per colour, margins included
      const groups = new Map();
      const add = (col, X, Y, w, h) => { let p = groups.get(col); if (!p) { p = new Path2D(); groups.set(col, p); } p.rect(X, Y, w, h); };
      const span = Math.ceil(off / cell);
      for (let y = -span; y < N + span; y++) for (let x = -span; x < N + span; x++) {
        const inGrid = x >= 0 && y >= 0 && x < N && y < N;
        const fr = frame === 'None' ? null : frameAt(x, y, t, !inGrid || reg[y * N + x] === 0);
        add(fr || (inGrid ? outCol[y * N + x] : backAt(x, y, t)), off + x * cell, off + y * cell, cell, cell);
      }
      for (const [col, p] of groups) { ctx.fillStyle = col; ctx.fill(p); }
    }
    render(0);
    return t => render(t);
  },
});

})(window.Proto);
