// Stomp Frames: from D:/code/synaesthesia/public/drop03/pieces/206.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Stomp Frames: a yeti as an arcade sprite whose whole life is two frames, A and B,
// swapped on the beat like the marching sprites of old cabinets, scene and all.
Proto.add({
  num: 206,
  name: 'Stomp Frames',
  fam: 'Pixel Portraits III',
  fps: 30,
  seed: 1,
  interactive: 'Tap it to make it roar. Tap the scene to make its friend hop.',
  music: true,
  recipe: 'A yeti drawn as an arcade sprite, 32 dots across with a hard black outline, that has exactly two frames, A and B, swapped on a steady beat: arms, mouth, props, friends and the whole scene flip with the same two frames. Fur (every one ragged with tufts), its build (squat, lanky, hunched, cone-headed or crested), face, eyes, mouth, headgear, what it holds, its dance, a little friend, the scene, the beat and the screen it plays on vary; disco fur, halos, mini yetis and inverted screens are rare; about 1 in 390 is a legendary (the Unseen one, nothing but footprints, eyes, a hat and its breath; a Golden Idol on a temple plinth; or the Final Boss with its health bar and a very small hero), and about 1 in 200 carries the coveted Ice Axe, big, over its shoulder on a red strap, with a summit flag planted beside it.',
  make(c) {
    const S = c.size, g = c.ctx;
    // a hash of the hash string for every draw (FNV-1a over the string and a counter)
    let ctr = 0;
    const draw = () => {
      let h = 0x811c9dc5 ^ (ctr++ * 0x9e3779b1);
      for (let i = 2; i < c.hash.length; i++) { h ^= c.hash.charCodeAt(i); h = Math.imul(h, 0x01000193); }
      h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12;
      return (h >>> 0) / 4294967296;
    };
    const one = t => { let s = 0; for (const k in t) s += t[k]; let r = draw() * s; for (const k in t) { r -= t[k]; if (r < 0) return k; } return Object.keys(t)[0]; };

    let fur = one({ 'Snow White': 32, 'Ice Blue': 22, Lilac: 16, Mint: 12, Shaggy: 10, Golden: 4, Shadow: 4 });
    let face = one({ Slate: 34, Tan: 26, Rosy: 22, Brown: 18 });
    let eyes = one({ Dots: 32, Angry: 20, Big: 18, Goggles: 12, Cyclops: 10, Glowing: 8 });
    let mouth = one({ Fangs: 34, Grin: 24, Tongue: 18, 'Snaggle Tooth': 14, Whistling: 10 });
    let head = one({ None: 34, Horns: 20, Beanie: 16, 'Snow Pile': 14, 'Top Knot': 10, Crown: 6 });
    let held = one({ None: 30, Snowball: 22, 'Ice Pop': 16, Cocoa: 14, Icicle: 10, Lantern: 8 });
    let scene = one({ 'Night Peaks': 28, Blizzard: 20, 'Ice Cave': 18, 'Pine Woods': 16, 'Grid Floor': 12, 'Hot Spring': 6 });
    let beatName = one({ March: 46, Amble: 30, Hustle: 24 });
    const facing0 = draw() < 0.5 ? 1 : -1;
    const starA = Array.from({ length: 20 }, () => [Math.floor(draw() * 32), Math.floor(draw() * 18)]);
    const flakes = Array.from({ length: 22 }, () => [Math.floor(draw() * 32), Math.floor(draw() * 32)]);
    const bass = [[45, 40], [43, 38], [47, 40], [45, 36]][Math.floor(draw() * 4)];

    // the rest of the cabinet's cast rolls from sfc32 on the hash words, so every yeti above keeps
    // its looks unless this stream swaps one trait for a newer value
    let sa = parseInt(c.hash.slice(2, 10), 16) >>> 0, sb = parseInt(c.hash.slice(26, 34), 16) >>> 0, sc2 = parseInt(c.hash.slice(50, 58), 16) >>> 0, sd = 1;
    const sfc = () => { const r = (sa + sb + sd) >>> 0; sd = (sd + 1) >>> 0; sa = (sb ^ (sb >>> 9)) >>> 0; sb = (sc2 + (sc2 << 3)) >>> 0; sc2 = ((sc2 << 21) | (sc2 >>> 11)) >>> 0; sc2 = (sc2 + r) >>> 0; return r / 4294967296; };
    for (let warm = 0; warm < 12; warm++) sfc();
    const sfcOf = t => { let s = 0; for (const k in t) s += t[k]; let r = sfc() * s; for (const k in t) { r -= t[k]; if (r < 0) return k; } return Object.keys(t)[0]; };
    if (sfc() < 0.3) fur = sfcOf({ Peach: 26, Frosted: 26, Moss: 22, Ember: 18, Disco: 8 });
    if (sfc() < 0.25) face = sfcOf({ Frost: 50, Mask: 50 });
    if (sfc() < 0.32) eyes = sfcOf({ Sleepy: 28, Shades: 26, Hearts: 22, Starry: 16, Three: 8 });
    if (sfc() < 0.28) mouth = sfcOf({ 'Buck Teeth': 34, Moustache: 30, 'Icicle Beard': 36 });
    if (sfc() < 0.34) head = sfcOf({ 'Viking Helm': 20, 'Propeller Cap': 18, Earmuffs: 18, 'Party Hat': 18, 'Bird Nest': 18, Halo: 8 });
    if (sfc() < 0.32) held = sfcOf({ Boombox: 20, Fish: 20, Flag: 20, Torch: 20, Microphone: 20 });
    if (sfc() < 0.34) scene = sfcOf({ 'Disco Floor': 26, Aurora: 26, 'Moon Base': 22, 'Snow Globe': 18, 'Arcade Cabinet': 8 });
    if (sfc() < 0.25) beatName = sfcOf({ 'Slow Jam': 50, Stagger: 50 });
    let dance = sfcOf({ Stomp: 50, Wave: 18, Flex: 16, Clap: 16 });
    let buddy = sfcOf({ None: 56, 'Snow Bunny': 14, Snowman: 14, Seal: 10, 'Mini Yeti': 6 });
    let screen = sfcOf({ Arcade: 60, 'Handheld Green': 12, 'Duo Cyan': 10, Sepia: 9, 'Night Vision': 6, Inverted: 3 });
    // the legendaries: Jenkins' one-at-a-time hash over the hash string with its own salt, so no other roll moves
    const oat = salt => { let h = salt | 0; for (let i = 2; i < c.hash.length; i++) { h = (h + c.hash.charCodeAt(i)) | 0; h = (h + (h << 10)) | 0; h ^= h >>> 6; } h = (h + (h << 3)) | 0; h ^= h >>> 11; h = (h + (h << 15)) | 0; return (h >>> 0) / 4294967296; };
    const lu = oat(0x7f4a7c15);
    const oatOf0 = (salt, t) => { let tot = 0; for (const k in t) tot += t[k]; let r = oat(salt) * tot; for (const k in t) { r -= t[k]; if (r < 0) return k; } return Object.keys(t)[0]; };
    // night vision is rarer now: half of those screens are back to the arcade's own colours
    if (screen === 'Night Vision' && oat(0x1f83d9ab) < 0.5) screen = 'Arcade';
    const LEG = lu < 0.0009 ? 'Unseen' : lu < 0.0018 ? 'Golden Idol' : lu < 0.0027 ? 'Final Boss' : '';
    const iceAxe = !LEG && lu < 0.0077;          // the coveted one, about one in two hundred
    if (iceAxe) held = 'Ice Axe';
    if (LEG) { c.trait('Legendary', LEG); if (screen === 'Inverted' || screen === 'Night Vision' || LEG !== 'Unseen') screen = 'Arcade'; }
    if (LEG === 'Unseen') { fur = 'Unseen'; eyes = 'Glowing'; if (!['Night Peaks', 'Blizzard', 'Ice Cave', 'Pine Woods', 'Aurora'].includes(scene)) scene = 'Blizzard'; }
    if (LEG === 'Golden Idol') { fur = 'Solid Gold'; face = 'Gold'; eyes = 'Rubies'; scene = 'Temple'; buddy = 'None'; dance = 'Stomp'; if (mouth === 'Tongue' || mouth === 'Whistling') mouth = 'Fangs'; }
    if (LEG === 'Final Boss') {
      // every boss is its own: a colourway, a crown or helm, and a snarl of its own
      fur = ['Abyss', 'Inferno', 'Venom', 'Glacier'][Math.floor(oat(0x6a09e667) * 4)]; head = ['Horns', 'Crown', 'Viking Helm'][Math.floor(oat(0x3c6ef372) * 3)];
      mouth = ['Fangs', 'Snaggle Tooth', 'Icicle Beard', 'Grin'][Math.floor(oat(0x510e527f) * 4)];
      face = 'Mask'; eyes = 'Red Glow'; held = 'None'; scene = 'Boss Arena'; buddy = 'Hero'; dance = 'Stomp';
    }
    // apricot and rust fur never get a pink or tan face, so they read as fur and not bare skin
    if ((fur === 'Peach' || fur === 'Ember') && (face === 'Rosy' || face === 'Tan')) face = face === 'Rosy' ? 'Slate' : 'Brown';
    // white, frosted and ice-blue fur never get the blue frost face (a slate, tan or brown one instead, on its own salt)
    if (face === 'Frost' && (fur === 'Snow White' || fur === 'Frosted' || fur === 'Ice Blue')) face = oatOf0(0x7137449b, { Slate: 40, Tan: 30, Brown: 30 });
    c.trait('Fur', fur); c.trait('Face', face); c.trait('Eyes', eyes); c.trait('Mouth', mouth);
    c.trait('Headgear', head); c.trait('Holding', held); c.trait('Scene', scene); c.trait('Beat', beatName);
    c.trait('Dance', dance); c.trait('Friend', buddy); c.trait('Screen', screen);
    // what it wears and what is on its feet, rolled from the same one-at-a-time hash on new salts, so no older trait moves
    const oatOf = (salt, t) => { let tot = 0; for (const k in t) tot += t[k]; let r = oat(salt) * tot; for (const k in t) { r -= t[k]; if (r < 0) return k; } return Object.keys(t)[0]; };
    let outfit = oatOf(0x2b7e1516, { None: 26, Scarf: 16, Sweater: 15, Overalls: 12, 'Puffer Vest': 12, Sash: 10, Cape: 9 });
    let feet = oatOf(0x28aed2a6, { Bare: 28, Boots: 20, Sneakers: 17, Snowshoes: 15, Skates: 12, Slippers: 8 });
    const KNIT = [['#e0303a', '#ffffff'], ['#3a7ae0', '#ffd23a'], ['#3ac04a', '#ffffff'], ['#a050c0', '#ff9ad0'], ['#ff8a20', '#5a2a10'], ['#20a0a0', '#e8f0ff']][Math.floor(oat(0x5be0cd19) * 6)];
    if (LEG === 'Golden Idol' || LEG === 'Final Boss') { outfit = 'None'; feet = 'Bare'; }
    c.trait('Outfit', outfit); c.trait('Footwear', feet);
    // the body it has: squat, lanky, hunched, a cone head or a crest, on one more salt
    let build = oatOf(0x9b05688c, { Standard: 26, Squat: 16, Lanky: 16, Hunched: 14, 'Cone Head': 14, Crested: 14 });
    if (LEG === 'Golden Idol' || LEG === 'Final Boss') build = 'Standard';
    c.trait('Build', build);
    const BLD = { Standard: [21, 7.4, 7, 0, 6.6, 5.6, 0, 0], Squat: [22, 8.8, 6, 1, 7.4, 5.2, 1, -1], Lanky: [20.5, 6.2, 7.4, -1, 6, 5.6, -1, 3], Hunched: [21, 8.2, 7, 2, 5.4, 4.6, 0, 1], 'Cone Head': [21, 7.4, 7, 0, 6.6, 5.6, 0, 0], Crested: [21, 7.4, 7, 0, 6.6, 5.6, 0, 0] }[build];
    // body centre y, body radii, head drop, head radii, shoulder drop, how far the hanging hands reach down
    const [BY, BRX, BRY, HY, HRX, HRY, SH, ARM] = BLD;
    const beat = { March: 0.5, Amble: 0.75, Hustle: 0.38, 'Slow Jam': 1, Stagger: 0.55 }[beatName];

    const C = {
      0: '#000000', K: '#0d0b14',
    };
    const FURS = { 'Snow White': ['#f4f6ff', '#b8c4e0', '#7a88aa'], 'Ice Blue': ['#bfe8ff', '#6cb6e8', '#3a6ea8'], Lilac: ['#e6d4ff', '#b090e0', '#6e52a6'], Mint: ['#d4ffe8', '#80d8b0', '#3a8a74'], Shaggy: ['#f0e6d2', '#c4ae88', '#86704e'], Golden: ['#fff0a0', '#f0b830', '#a86818'], Shadow: ['#5a5470', '#34304a', '#1c1a2a'],
      Unseen: ['#f4f6ff', '#b8c4e0', '#7a88aa'], 'Solid Gold': ['#fff4b0', '#e8b030', '#9a6018'], Abyss: ['#4a3a6a', '#2a2040', '#16102a'], Inferno: ['#e86a3a', '#a02a1a', '#4a0a08'], Venom: ['#7ac04a', '#3a7a2a', '#143a14'], Glacier: ['#9ad0f0', '#4a7ab0', '#1a2e5a'],
      Peach: ['#ffc890', '#e88a48', '#9a4c1c'], Frosted: ['#ffffff', '#9ad8f4', '#4a8ac0'], Moss: ['#d8eab0', '#98b860', '#5a7a30'], Ember: ['#e88a50', '#b04a20', '#5a1e0a'], Disco: ['#ffd0f4', '#f070d0', '#9a2a90'] };
    const DISCO_B = ['#c8fff4', '#40d8d0', '#1a7a8a'];
    const SKIN = { Slate: ['#8a9ab8', '#5a6888'], Tan: ['#d8a878', '#a87448'], Rosy: ['#f0a8b8', '#c06c84'], Brown: ['#8a5a40', '#5a3424'], Frost: ['#bcdcf4', '#7aa2cc'], Mask: ['#3a3448', '#221e2e'], Gold: ['#f0c840', '#b07818'] }[face];
    const SC = {
      'Night Peaks': ['#0a0c24', '#1c2250', '#2e3a78', '#e8f0ff'],
      Blizzard: ['#5a6a8a', '#7a8aaa', '#a8b8d0', '#ffffff'],
      'Ice Cave': ['#0e2a44', '#185070', '#3a8ab0', '#bff0ff'],
      'Pine Woods': ['#0c1a1a', '#143a2c', '#245a40', '#e8f0e0'],
      'Grid Floor': ['#120626', '#3a0a5a', '#ff3aa8', '#40e8ff'],
      'Hot Spring': ['#2a1426', '#5a2a3a', '#d0705a', '#ffd8b0'],
      'Disco Floor': ['#14081e', '#2a1040', '#ff4ab0', '#ffe84a'],
      Aurora: ['#060c1c', '#0c1a30', '#2ad49a', '#c0ffe0'],
      'Moon Base': ['#04040c', '#14141e', '#8a8a9a', '#e8e8f0'],
      'Snow Globe': ['#1a2a4a', '#2a4a7a', '#a8c8e8', '#ffffff'],
      'Arcade Cabinet': ['#0a0a14', '#16162a', '#ff3a3a', '#ffe84a'],
      Temple: ['#140c08', '#2e2018', '#6a5a48', '#ffb030'],
      'Boss Arena': ['#0c0408', '#2a0a10', '#ff4a1a', '#ffd040'],
    }[scene];

    const LIPC = face === 'Mask' && !LEG ? '#a49cc4' : C.K, GAPEC = face === 'Mask' && !LEG ? '#7a2a4a' : '#3a0a1a';
    const N = 32, buf = new Array(N * N), spr = new Array(N * N), mask = new Uint8Array(N * N), keep = new Uint8Array(N * N);
    let KEEP = 0;                // marks the eyes (1) and what it holds or befriends (2) as they are drawn
    const P = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) { spr[y * N + x] = col; mask[y * N + x] = 1; keep[y * N + x] = KEEP; } };
    let hp = 8, bossHit = -9, deadAt = -9, awakeUntil = -9;   // the final boss's health, the idol's waking
    const E = (cx, cy, rx, ry, col) => { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const dx = (x - cx) / (rx + 0.35), dy = (y - cy) / (ry + 0.35); if (dx * dx + dy * dy <= 1) P(x, y, col); } };
    const L = (x0, y0, x1, y1, col, w) => { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2) + 1; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; if (w > 1) E(x, y, w / 2 - 0.3, w / 2 - 0.3, col); else P(x, y, col); } };
    const B = (x, y, col) => { if (x >= 0 && y >= 0 && x < N && y < N) buf[y * N + x] = col; };

    let t0 = 0;
    function scenery(f) {
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = y < 10 ? SC[0] : y < 20 ? (scene === 'Grid Floor' ? SC[0] : SC[1]) : SC[1];
      if (scene === 'Night Peaks') {
        starA.forEach(([x, y], i) => { if ((i + f) % 2 === 0) buf[y * N + x] = SC[3]; });
        for (let x = 0; x < N; x++) { const h = 18 - Math.abs(((x + 6) % 16) - 8) * 1.2; for (let y = Math.round(h); y < 27; y++) buf[y * N + x] = y < h + 2 ? SC[3] : SC[2]; }
      }
      if (scene === 'Blizzard') flakes.forEach(([x, y], i) => { const xx = (x + f * 2 + (i % 3)) % N, yy = (y + f * 3) % N; buf[yy * N + xx] = SC[3]; });
      if (scene === 'Ice Cave') {
        for (let x = 0; x < N; x++) { const d = 2 + ((x * 7) % 5) + ((x % 6) === 0 ? 3 : 0); for (let y = 0; y < d; y++) buf[y * N + x] = y === d - 1 ? SC[3] : SC[2]; }
        for (let x = 0; x < N; x += 5) { const y = 5 + ((x * 3) % 4) + f; if (y < N) buf[y * N + x + 1] = SC[3]; }
      }
      if (scene === 'Pine Woods') {
        for (const [tx, th] of [[3, 14], [27, 12], [9, 8], [22, 9]]) for (let y = 26 - th; y < 27; y++) { const w = Math.floor((y - (26 - th)) / 2) % 3 + (y - (26 - th)) / 4; for (let x = Math.round(tx - w); x <= tx + w; x++) if (x >= 0 && x < N) buf[y * N + x] = SC[2]; }
        flakes.slice(0, 10).forEach(([x, y]) => { const yy = (y + f * 2) % 26; buf[yy * N + x] = SC[3]; });
      }
      if (scene === 'Grid Floor') {
        for (let y = 20; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = SC[0];
        for (let k = -36; k <= 36; k += 12) for (let y = 20; y < N; y++) { const x = Math.round(16 + k * (y - 19) / 12); if (x >= 0 && x < N) buf[y * N + x] = SC[1]; }
        for (let k = 0; k < 4; k++) { const y = Math.round(20 + ((k + f * 0.5) ** 2) * 0.9); if (y < N) for (let x = 0; x < N; x++) buf[y * N + x] = SC[2]; }
        for (let x = 0; x < N; x++) buf[19 * N + x] = SC[3];
        for (let k = 0; k < 4; k++) { const sx = 3 + k * 8 + f * 2, sy = 3 + (k % 2) * 6; if (sx < N) buf[sy * N + sx] = SC[3]; }
      }
      if (scene === 'Hot Spring') {
        for (let y = 24; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = SC[2];
        for (let k = 0; k < 6; k++) { const sx = 2 + k * 5 + (f ? 1 : 0), sy = 20 - (k % 2) * 3 - f * 2; for (let j = 0; j < 3; j++) { const yy = sy - j * 2, xx = sx + ((j + f) % 2); if (yy >= 0) buf[yy * N + xx] = SC[3]; } }
      }
      if (scene === 'Disco Floor') {
        // lit tiles swap with the frame, and a mirror ball turns its two faces
        for (let y = 24; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = ((x >> 2) + ((y - 24) >> 1) + f) % 2 ? SC[2] : SC[1];
        for (let y = 0; y < 3; y++) B(16, y, '#8a8aa0');
        for (let y = 3; y < 7; y++) for (let x = 14; x < 19; x++) if ((x - 16) ** 2 + (y - 5) ** 2 < 5) B(x, y, (x + y + f) % 2 ? '#e8e8f8' : '#8a8aa0');
        for (let k = 0; k < 8; k++) B((k * 9 + f * 4) % N, 8 + ((k * 5) % 12), k % 2 ? SC[3] : SC[2]);
      }
      if (scene === 'Aurora') {
        for (let x = 0; x < N; x++) { const w = 6 + Math.round(Math.sin(x * 0.4 + f * 1.4) * 2); for (let y = w; y < w + 3; y++) B(x, y, y === w ? SC[3] : SC[2]); }
        starA.forEach(([x, y], i) => { if ((i + f) % 3 === 0 && y > 11) B(x, y, '#ffffff'); });
      }
      if (scene === 'Moon Base') {
        for (let y = 2; y < 9; y++) for (let x = 22; x < 30; x++) if ((x - 26) ** 2 + (y - 5) ** 2 < 12) B(x, y, (x - 24) ** 2 + (y - 4) ** 2 < 3 ? '#3a7ad8' : '#4ab86a');
        starA.forEach(([x, y], i) => { if ((i + f) % 2 === 0 && x < 20) B(x, y, SC[3]); });
        for (let y = 24; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = (x * 3 + y * 5) % 11 === 0 ? SC[1] : SC[2];
        for (const [cx, cy] of [[5, 27], [26, 29]]) for (let x = cx - 2; x <= cx + 2; x++) B(x, cy, SC[1]);
      }
      if (scene === 'Snow Globe') {
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const d = Math.hypot(x + 0.5 - 16, y + 0.5 - 15); if (d > 15.4 && d < 16.6) B(x, y, '#d8ecff'); else if (d >= 16.6) B(x, y, '#0a1020'); }
        for (let y = 27; y < N; y++) for (let x = 2; x < 30; x++) B(x, y, y === 27 ? '#c89a4a' : '#7a4a20');
        flakes.forEach(([x, y], i) => { const xx = (x + (i % 2 ? f : -f) + N) % N, yy = (y + f * 2) % 26; if (Math.hypot(xx - 16, yy - 15) < 15) B(xx, yy, SC[3]); });
      }
      if (scene === 'Arcade Cabinet') {
        for (let x = 0; x < N; x++) { B(x, 0, SC[0]); B(x, 1, (x + f) % 3 ? SC[2] : SC[3]); B(x, 2, SC[0]); }
        for (let y = 3; y < N; y++) { B(0, y, '#2a2a3a'); B(N - 1, y, '#2a2a3a'); }
        starA.forEach(([x, y], i) => { if ((i + f) % 2) B(Math.max(2, x), 4 + (y % 14), '#5a5a8a'); });
      }
      if (scene === 'Temple') {
        // a stone hall: brick wall, two pillars with torches that flicker on the beat, and the idol's plinth
        for (let y = 0; y < 27; y++) for (let x = 0; x < N; x++) buf[y * N + x] = y % 4 === 3 || (x + (y >> 2) % 2 * 3) % 6 === 0 ? SC[0] : SC[1];
        for (const px of [1, 28]) for (let y = 8; y < 27; y++) for (let x = px; x < px + 3; x++) buf[y * N + x] = x === px ? '#8a7a68' : SC[2];
        for (const px of [2, 29]) { B(px, 7, '#5a3a20'); B(px, 6, '#5a3a20'); B(px, 5, f ? '#ffd040' : '#ff7a20'); B(px + (f ? 1 : -1), 4, '#ffb030'); B(px, 3, f ? '#ff7a20' : '#ffe890'); B(px - 1, 5, '#7a3a10'); B(px + 1, 5, '#7a3a10'); }
        for (let y = 27; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = y === 27 ? '#a8987e' : x % 8 === 0 || y === 30 ? '#4a3e30' : SC[2];
      }
      if (scene === 'Boss Arena') {
        // the last stage: a cracked dark wall, a lava floor that heaves on the beat, the boss's health bar and a very small hero
        for (let y = 0; y < 27; y++) for (let x = 0; x < N; x++) buf[y * N + x] = ((x * 7 + y * 3) % 23 === 0 || (x * 5 + y * 11) % 31 === 0) ? SC[1] : SC[0];
        for (let y = 27; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = ((x + f * 2 + (y & 1) * 3) % 6) < 2 ? SC[3] : SC[2];
        for (let k = 0; k < 6; k++) B((k * 11 + f * 3) % N, 26 - ((k * 5 + f * 4) % 14), k % 2 ? SC[3] : SC[2]);
        for (let y = 26; y < N; y++) for (let x = 0; x < 7; x++) buf[y * N + x] = y === 26 ? '#6a6a7a' : '#3a3a48';
        // the bar: a skull, then eight cells of health
        ['.XXX.', 'XoXoX', 'XXXXX', '.X.X.'].forEach((r, j) => { for (let i = 0; i < 5; i++) if (r[i] !== '.') B(1 + i, 1 + j, r[i] === 'X' ? '#ffffff' : SC[0]); });
        for (let x = 7; x <= 30; x++) { B(x, 1, '#ffffff'); B(x, 4, '#ffffff'); }
        B(7, 2, '#ffffff'); B(7, 3, '#ffffff'); B(30, 2, '#ffffff'); B(30, 3, '#ffffff');
        for (let x = 8; x <= 29; x++) { const cell = Math.floor((x - 8) / 22 * 8), on = cell < hp; B(x, 2, on ? '#ff4a3a' : '#3a0a10'); B(x, 3, on ? '#c0202a' : '#2a0610'); }
        // the hero, sword up on one frame and down on the other, lunging after a tap
        const hx = 3, hy = 21, lunge = t0 - bossHit < 0.3;
        for (const [x, y, col] of [[0, 0, '#c8ccd8'], [1, 0, '#c8ccd8'], [0, 1, '#ffd8b0'], [1, 1, '#c8ccd8'], [0, 2, '#3a7ae0'], [1, 2, '#3a7ae0'], [-1, 2, '#3a7ae0'], [0, 3, '#3a7ae0'], [1, 3, '#3a7ae0'], [0, 4, '#5a3a20'], [1, 4, '#5a3a20']]) B(hx + x + (lunge ? 1 : 0), hy + y, col);
        if (lunge) for (let k = 2; k < 6; k++) B(hx + 1 + k, hy + 2, '#ffffff');
        else for (let k = 1; k < 4; k++) B(hx + 2 + (f ? 0 : k - 1), hy + 2 - (f ? k : 0), '#e8ecf8');
      }
      if (['Night Peaks', 'Blizzard', 'Ice Cave', 'Pine Woods', 'Aurora'].includes(scene)) for (let y = 27; y < N; y++) for (let x = 0; x < N; x++) buf[y * N + x] = (x + y + f) % 7 === 0 ? SC[2] : SC[3];
      if (LEG === 'Unseen') {
        // something heavy is stomping here: fresh prints, one foot then the other, and the snow they kick up
        for (const s of [-1, 1]) { const on = (s < 0) === (f === 0), cx = 16 + s * 4.6; for (let x = Math.round(cx - 1.4); x <= Math.round(cx + 1.4); x++) { B(x, 30, SC[1]); B(x, 29, on ? SC[1] : SC[2]); } if (on) { B(Math.round(cx - 2), 27, SC[3]); B(Math.round(cx + 2), 26, SC[3]); B(Math.round(cx), 25, SC[3]); } }
      }
      if (scene === 'Arcade Cabinet') for (let y = 27; y < N; y++) for (let x = 1; x < N - 1; x++) buf[y * N + x] = (x + f) % 4 === 0 ? SC[2] : SC[1];
    }

    function yeti(f, roar) {
      spr.fill(null); mask.fill(0); keep.fill(0);
      const up = f === 1 || roar, dy = f, [F0, F1, F2] = fur === 'Disco' && f ? DISCO_B : FURS[fur], [S0, S1] = SKIN;
      // legs and feet
      const spread = f ? 1 : 0, hd = dy + HY;
      for (const s of [-1, 1]) {
        if (build === 'Squat') E(16 + s * (4.4 + spread), 28.2 - dy * 0.5, 2.5, 1.5, F1);
        else if (build === 'Lanky') E(16 + s * (3.2 + spread), 27 - dy * 0.5, 1.7, 2.6, F1);
        else E(16 + s * (3.6 + spread), 27.5 - dy * 0.5, 2.2, 2, F1);
        E(16 + s * (4.4 + spread), 29.6, 2.4, 1.1, S1);
      }
      // body and head (a hunched one has big shoulders and a small head sunk between them)
      E(16, BY + dy, BRX + (f ? 0.5 : 0), BRY - (f ? 0.4 : 0), F0);
      if (build === 'Hunched') for (const s of [-1, 1]) E(16 + s * 5.6, 16.4 + dy, 3.4, 2.6, F0);
      E(16, 12.5 + hd, HRX, HRY, F0);
      if (build === 'Cone Head') for (let k = 0; k < 6; k++) { const w = Math.round(4.2 - k * 0.75), y = Math.round(12.5 + hd - HRY - k + 0.6); for (let x = 16 - w; x <= 16 + w; x++) P(x, y, F0); }
      // shading on the right side and a pale belly
      for (let y = 0; y < 30; y++) for (let x = 19; x < 26; x++) if (mask[y * N + x] && spr[y * N + x] === F0 && x > 19 + (y % 3 === 0 ? 1 : 0) + Math.abs(y - 19) * 0.25) spr[y * N + x] = F1;
      E(16, BY + 2 + dy, 3.8, 3.8, F0);
      for (let k = 0; k < 4; k++) P(13 + k * 2, BY + 5 + dy - (k % 2), F1);
      // the outfit: recolour the fur of the torso it covers (a cape goes behind, from the shoulders)
      KEEP = 2;
      const isFur = i => spr[i] === F0 || spr[i] === F1;
      const [K1, K2] = KNIT;
      for (let y = 15; y < 29; y++) for (let x = 6; x < 27; x++) {
        const i = y * N + x, yy = y - dy - SH;
        if (!isFur(i) || yy < 16.5) continue;
        let col = null;
        if (outfit === 'Scarf' && yy < 18.5 && x > 10 && x < 22) col = (x + (yy | 0)) % 3 ? K1 : K2;
        else if (outfit === 'Scarf' && x >= 18 && x <= 19 && yy < 23 + f) col = yy % 2 ? K1 : K2;
        else if (outfit === 'Sweater' && yy > 17) col = yy < 18.5 ? K2 : (Math.round(yy) % 4 === 1 ? K2 : K1);
        else if (outfit === 'Overalls' && (yy > 22 || (yy > 18 && (x === 13 || x === 19)))) col = (x === 14 || x === 18) && Math.round(yy) === 23 ? '#ffd23a' : '#3a5aa8';
        else if (outfit === 'Puffer Vest' && yy > 17.5 && yy < 26 && Math.abs(x - 16) > 1.5) col = Math.round(yy) % 3 === 0 ? '#c05a10' : '#ff8a20';
        else if (outfit === 'Sash' && Math.abs((x - 16) + (yy - 22) * 0.9) < 1.3) col = Math.abs((x - 16) + (yy - 22) * 0.9) < 0.5 ? K2 : K1;
        if (col) { spr[i] = col; keep[i] = 2; }
      }
      if (outfit === 'Sash') { P(14, 20 + dy + SH, '#ffd23a'); P(15, 20 + dy + SH, '#ffd23a'); P(14, 21 + dy + SH, '#ffe890'); }
      if (outfit === 'Cape') for (let y = 17; y < 31; y++) for (let x = 4; x < 29; x++) {
        // a cape flares out behind it, swinging the other way on each frame
        const i = y * N + x, yy = y - dy, half = 8 + (yy - 17) * 0.55 + (f ? 0.6 : 0);
        if (mask[i] || yy < 17 || Math.abs(x - 16 + (f ? 0.5 : -0.5)) > half) continue;
        spr[i] = Math.abs(x - 16) > half - 1 ? K2 : K1; mask[i] = 1; keep[i] = 2;
      }
      // the footwear, over the feet
      if (feet !== 'Bare') for (const s of [-1, 1]) {
        const fx = 16 + s * (4.4 + spread), fy = 29.6;
        if (feet === 'Boots') { E(fx, fy - 0.2, 2.5, 1.3, '#7a4a20'); P(fx - 1, fy - 1.5, '#e8dcc0'); P(fx, fy - 1.5, '#e8dcc0'); P(fx + 1, fy - 1.5, '#e8dcc0'); }
        else if (feet === 'Sneakers') { E(fx, fy, 2.5, 1.1, '#ffffff'); P(fx + s, fy, K1); P(fx - s, fy, K1); P(fx, fy + 1, '#5a5a6a'); }
        else if (feet === 'Snowshoes') { E(fx, fy + 0.6, 3.4, 1.2, '#9a7a4a'); P(fx - 1, fy + 0.6, '#3a2a18'); P(fx + 1, fy + 0.6, '#3a2a18'); E(fx, fy - 0.3, 1.8, 0.8, '#5a5a6a'); }
        else if (feet === 'Skates') { E(fx, fy - 0.6, 2.3, 1.1, '#e8e8f0'); for (let k = -2; k <= 2; k++) P(fx + k, fy + 1.2, '#9aa0b0'); P(fx + s * 2, fy + 0.6, '#9aa0b0'); }
        else if (feet === 'Slippers') { E(fx, fy, 2.6, 1.3, '#ff9ac0'); P(fx - 1, fy - 1.2, '#ffffff'); P(fx + 1, fy - 1.2, '#ffffff'); P(fx, fy - 1.3, '#ffffff'); }
      }
      KEEP = 0;
      if (fur === 'Frosted') for (let k = 0; k < 6; k++) P(10 + k * 2 + (f ? 1 : 0), 15 + dy + (k % 3) * 3, F1);
      // tufts that switch sides between frames (on a cone head, one tuft at the tip; on a crested one, a ridge of dark spikes)
      const tuftX = f ? [12, 15, 18] : [13, 16, 19], top = Math.round(12.5 + hd - HRY + 0.6) - (build === 'Cone Head' ? 6 : 0);
      if (build === 'Crested') for (let x = 12; x <= 20; x++) { const sp = (x + f) % 2; P(x, top - 1, F1); if (sp) P(x, top - 2, F2); if (sp && x > 13 && x < 19) P(x, top - 3, F2); }
      else if (head === 'None' && build === 'Cone Head') { P(16, top, F0); P(16 + (f ? 1 : -1), top - 1, F0); P(16 + (f ? 2 : -2), top - 2, F1); }
      else if (head === 'None') tuftX.forEach((tx, i) => { P(tx, top - 1 - (i === 1 ? 1 : 0), F0); P(tx + (f ? 1 : -1), top - 2 - (i === 1 ? 1 : 0), F0); });
      // arms: where each hand goes depends on the dance and the frame
      const hands = {};
      for (const s of [-1, 1]) {
        let hx = 16 + s * (up ? 10.5 : 10), hy = up ? 8 + dy - (build === 'Lanky' ? 1 : 0) : 24 + dy + ARM;
        if (!roar && dance === 'Wave') { if (s < 0) { hx = 16 - (f ? 12 : 10); hy = 7 + dy; } else { hx = 26; hy = 24 + dy; } }
        if (!roar && dance === 'Flex') { hx = 16 + s * (f ? 11.5 : 11); hy = 14 + dy; }
        if (!roar && dance === 'Clap') { hx = f ? 16 + s * 1.6 : 16 + s * 11; hy = f ? 4 + dy : 12 + dy; }
        const sx = 16 + s * (6.5 + (build === 'Hunched' ? 1.5 : build === 'Squat' ? 1 : 0)), raised = hy < 17 + dy, sy0 = 17 + dy + SH;
        L(sx, sy0, hx, hy + (raised ? 2.5 : -2), F0, 3);
        L(sx + s * 1, sy0 + 1, hx + s * 0.5, hy + (raised ? 3.5 : -1), F1, 1);
        if (!roar && dance === 'Flex') E(16 + s * 9, 14.5 + dy, f ? 2.4 : 1.8, f ? 2 : 1.6, F0);
        E(hx, hy, 1.6, 1.6, S0);
        hands[s] = [hx, hy, raised];
      }
      // fur that reads as fur: a ragged fringe of tufts round the edge, darker tips, and a few hair strokes
      if (fur !== 'Solid Gold') {
        const tips = [], tufts = [];
        for (let y = 1; y < 27; y++) for (let x = 1; x < N - 1; x++) {
          const i = y * N + x, c0 = spr[i];
          if (mask[i]) { if ((c0 === F0 || c0 === F1) && !keep[i] && (!mask[i - 1] || !mask[i + 1] || !mask[i - N]) && (x * 5 + y * 3) % 4 === 0) tips.push(i); continue; }
          if ((x * 7 + y * 3) % 5 !== 0) continue;
          const nb = [i - 1, i + 1, i + N].find(j => mask[j] && !keep[j] && (spr[j] === F0 || spr[j] === F1));
          if (nb !== undefined) tufts.push(i);
        }
        for (const i of tips) spr[i] = spr[i] === F0 ? F1 : F2;
        for (const i of tufts) { spr[i] = F1; mask[i] = 1; keep[i] = 0; }
        for (const [x, y] of [[11, BY - 2], [20, BY], [13, BY + 3], [18, BY - 4]]) for (let k = 0; k < 2; k++) { const i = (Math.round(y + dy) + k) * N + x + k; if (i >= 0 && i < N * N && !keep[i] && (spr[i] === F0 || spr[i] === F1)) spr[i] = spr[i] === F0 ? F1 : F2; }
      }
      // face
      KEEP = 4;
      E(16, 13.5 + hd, 4 - (build === 'Hunched' ? 0.5 : 0), 3.2, S0);
      for (let x = 13; x <= 19; x++) P(x, 16.5 + hd + (x === 13 || x === 19 ? -1 : 0), S1);
      KEEP = 0;
      const ey = 12.5 + hd;
      // the frost face has a heavy brow ridge and a broad nose, so it is unmistakably this yeti's
      if (face === 'Frost') { KEEP = 1; for (let x = 12; x <= 20; x++) if (x !== 16) P(x, ey - 2, S1); P(15, ey + 1, S1); P(16, ey + 1, S1); P(17, ey + 1, S1); P(16, ey + 2, S1); KEEP = 0; }
      // on the dark mask face the eyes, the shut mouth and the open mouth switch to lighter tones, so the face still reads
      const darkFace = face === 'Mask' && !LEG, EYE = darkFace ? '#e0d8f4' : C.K, LIP = LIPC, GAPE = GAPEC;
      KEEP = 1;
      const eye = (x) => {
        if (eyes === 'Rubies') { P(x, ey, '#e0303a'); P(x + 1, ey, '#ff8a8a'); P(x, ey - 1, '#a01020'); P(x + 1, ey - 1, '#e0303a'); return; }
        if (eyes === 'Red Glow') { P(x, ey, '#ff3030'); P(x + 1, ey, '#ff3030'); P(x + (x < 16 ? 1 : 0), ey - 1, '#ffb0a0'); P(x + (x < 16 ? -1 : 2), ey - 1, '#ff3030'); return; }
        if (eyes === 'Glowing') { P(x, ey, '#ffe84a'); P(x + 1, ey, '#ffe84a'); return; }
        if (eyes === 'Big') { P(x, ey - 1, '#ffffff'); P(x + 1, ey - 1, '#ffffff'); P(x, ey, C.K); P(x + 1, ey, '#ffffff'); return; }
        if (eyes === 'Sleepy') { P(x, ey, EYE); P(x + 1, ey, EYE); return; }
        if (eyes === 'Hearts') { P(x, ey - 1, '#ff4a7a'); P(x + 1, ey - 1, '#ff4a7a'); P(x, ey, '#ff4a7a'); P(x + 1, ey, '#c02a5a'); return; }
        if (eyes === 'Starry') { P(x, ey, '#ffe84a'); P(x + 1, ey - 1, f ? '#ffffff' : '#ffe84a'); P(x + 1, ey, '#ffe84a'); P(x, ey - 1, f ? '#ffe84a' : '#ffffff'); return; }
        P(x, ey, EYE); P(x + 1, ey, EYE); P(x, ey - 1, EYE); P(x + 1, ey - 1, eyes === 'Dots' ? '#ffffff' : EYE);
        if (eyes === 'Angry') { P(x + (x < 16 ? 0 : 1), ey - 1, EYE); P(x + (x < 16 ? -1 : 2), ey - 2, EYE); }
      };
      if (eyes === 'Cyclops') { E(16, ey, 1.6, 1.4, '#ffffff'); P(16, ey, C.K); P(16 + (f ? 1 : -1), ey, C.K); }
      else if (eyes === 'Goggles') { for (let x = 11; x <= 21; x++) P(x, ey - 1, '#6a3a1a'); E(13.5, ey, 1.7, 1.4, '#7ae0ff'); E(18.5, ey, 1.7, 1.4, '#7ae0ff'); P(13, ey - 1, '#ffffff'); P(18, ey - 1, '#ffffff'); }
      else if (eyes === 'Shades') { for (let x = 12; x <= 20; x++) if (x !== 16) { P(x, ey - 1, C.K); P(x, ey, C.K); } P(f ? 18 : 13, ey - 1, '#ffffff'); }
      else if (eyes === 'Three') { eye(12); eye(19); P(16, ey - 2, EYE); P(16, ey - 3, f ? '#ffffff' : EYE); }
      else { eye(13); eye(18); }
      KEEP = 0;
      // mouth: shut on A, open on B (or wide when roaring)
      const my = 15.5 + hd, open = f === 1 || roar;
      KEEP = 3;
      if (LEG === 'Unseen' && open) for (const [bx, by] of [[19, 14], [21, 13], [22, 11], [20, 12]]) P(bx + f, by + hd, '#e8f0ff');
      if (roar) { E(16, my + 0.5, 2.6, 1.8, '#3a0a1a'); P(14, my - 1, '#ffffff'); P(18, my - 1, '#ffffff'); P(16, my + 1, '#e04a6a'); }
      else if (mouth === 'Whistling') { E(16, my, open ? 1.2 : 0.8, open ? 1.2 : 0.8, GAPE); if (open) P(18 + f, my - 3, '#ffe84a'); }
      else if (mouth === 'Moustache') { for (let x = 13; x <= 19; x++) P(x, my - 1 + ((x === 13 || x === 19) && f ? -1 : 0), F2); if (open) { P(15, my, GAPE); P(16, my, GAPE); P(17, my, GAPE); } }
      else if (open) {
        for (let x = 14; x <= 18; x++) P(x, my, GAPE); for (let x = 15; x <= 17; x++) P(x, my + 1, GAPE);
        if (mouth === 'Fangs') { P(14, my, '#ffffff'); P(18, my, '#ffffff'); }
        if (mouth === 'Tongue') { P(16, my + 1, '#ff6a8a'); P(16, my + 2, '#ff6a8a'); }
        if (mouth === 'Snaggle Tooth') P(17, my, '#ffffff');
        if (mouth === 'Grin') for (let x = 14; x <= 18; x++) P(x, my, '#ffffff');
        if (mouth === 'Buck Teeth') { P(15, my, '#ffffff'); P(16, my, '#ffffff'); P(15, my + 1, '#ffffff'); P(16, my + 1, '#ffffff'); }
      } else {
        for (let x = 14; x <= 18; x++) P(x, my, LIP);
        if (mouth === 'Fangs') { P(14, my + 1, '#ffffff'); P(18, my + 1, '#ffffff'); }
        if (mouth === 'Snaggle Tooth') P(17, my + 1, '#ffffff');
        if (mouth === 'Grin') { P(13, my - 1, LIP); P(19, my - 1, LIP); }
        if (mouth === 'Tongue') P(17, my + 1, '#ff6a8a');
        if (mouth === 'Buck Teeth') { P(15, my + 1, '#ffffff'); P(16, my + 1, '#ffffff'); }
      }
      if (mouth === 'Icicle Beard' && !roar) { for (let x = 14; x <= 18; x++) P(x, my, open ? GAPE : LIP); for (const [x, l] of [[13, 2], [15, 3], [17, 2], [19, 3]]) for (let k = 1; k <= l - (f && x % 4 === 1 ? 1 : 0); k++) P(x, my + k, k === l ? '#ffffff' : '#9ae8ff'); }
      KEEP = 2;
      // headgear
      const hy = 7.5 + hd - (build === 'Cone Head' ? 4 : 0);
      if (head === 'Horns') for (const s of [-1, 1]) { P(16 + s * 5, hy + 1, '#e8dcc0'); P(16 + s * 6, hy, '#e8dcc0'); P(16 + s * 7, hy, '#e8dcc0'); P(16 + s * 7, hy - 1, '#c8b890'); P(16 + s * 8, hy - 2, '#c8b890'); P(16 + s * 8, hy - 3, '#a89870'); P(16 + s * 6, hy + 1, '#c8b890'); }
      if (head === 'Beanie') { E(16, hy + 1, 6, 2.6, '#e0303a'); for (let x = 11; x <= 21; x++) P(x, hy + 2, '#ffffff'); E(16, hy - 2, 1.4, 1.4, '#ffffff'); }
      if (head === 'Snow Pile') { E(16, hy, 5, 1.6, '#ffffff'); E(15 + f, hy - 2, 2.6, 1.4, '#ffffff'); P(14, hy - 4 + f, '#ffffff'); }
      if (head === 'Top Knot') { E(16, hy - 1, 2, 2, F1); P(16, hy - 3, F1); for (let x = 14; x <= 18; x++) P(x, hy + 1, '#e04a8a'); }
      if (head === 'Crown') { for (let x = 12; x <= 20; x++) { P(x, hy, '#ffd030'); P(x, hy - 1, '#ffd030'); } for (const x of [12, 14, 16, 18, 20]) P(x, hy - 2, '#ffd030'); P(16, hy - 1, '#e0303a'); }
      if (head === 'Viking Helm') { E(16, hy + 0.5, 5.6, 2.4, '#9aa0b0'); for (let x = 11; x <= 21; x++) P(x, hy + 2, '#6a7080'); P(16, hy - 1, '#c8ccd8'); for (const s of [-1, 1]) { P(16 + s * 6, hy, '#f4ecd0'); P(16 + s * 7, hy - 1, '#f4ecd0'); P(16 + s * 7, hy - 2 - f, '#f4ecd0'); } }
      if (head === 'Propeller Cap') { E(16, hy + 1, 5.4, 2.2, '#3a7ae0'); for (let x = 12; x <= 20; x += 2) P(x, hy + 1, '#ffd23a'); P(16, hy - 1, '#ffd23a'); P(16, hy - 2, '#9aa0b0'); if (f) { for (let x = 12; x <= 20; x++) P(x, hy - 3, x < 16 ? '#e0303a' : '#3ac04a'); } else { P(16, hy - 4, '#e0303a'); P(15, hy - 3, '#e0303a'); P(17, hy - 3, '#3ac04a'); P(16, hy - 2, '#3ac04a'); } }
      if (head === 'Earmuffs') { for (let x = 11; x <= 21; x++) P(x, hy - 1 + Math.round(Math.abs(x - 16) * 0.3), '#5a5a6a'); E(16.2 - HRX, 12 + hd, 1.6, 2, '#ff7ab0'); E(15.8 + HRX, 12 + hd, 1.6, 2, '#ff7ab0'); }
      if (head === 'Party Hat') { for (let k = 0; k < 6; k++) for (let x = 16 - Math.floor(k / 2); x <= 16 + Math.floor(k / 2); x++) P(x, hy - 4 + k, (k + f) % 2 ? '#ffd23a' : '#3ab8f0'); P(16 + (f ? 1 : -1), hy - 5, '#ff5a8a'); }
      if (head === 'Bird Nest') { E(16, hy + 0.5, 4, 1.4, '#8a5a2a'); for (let x = 12; x <= 20; x += 2) P(x, hy, '#b07a3a'); E(16, hy - 1.5, 1.6, 1.4, '#e8503a'); P(17, hy - 2, C.K); P(18, hy - 1 - f, '#ffb030'); if (f) P(14, hy - 2, '#e8503a'); }
      if (head === 'Halo') { for (let x = 12; x <= 20; x++) { P(x, hy - 3 - f, x === 12 || x === 20 ? '#c8a020' : '#ffe84a'); } }
      // what it holds, in its left hand (as seen)
      const [hx2, hy2, raised] = hands[1], up2 = raised;
      KEEP = 2;
      if (held === 'Ice Axe') {
        // the coveted one: a big climber's ice axe carried over the shoulder on a red strap, its steel head glinting on the
        // beat, and a little summit flag planted beside it
        const ax = 0, ay = dy;
        L(13 + ax, 28 + ay, 25 + ax, 6 + ay, '#8a5a2a', 2);
        L(14 + ax, 28 + ay, 26 + ax, 6 + ay, '#c08a4a', 1);
        P(12 + ax, 29 + ay, '#9aa0b0'); P(12 + ax, 30 + ay, '#5a6070');
        // the red strap, slung from the foot of the shaft to the head
        for (let k = 0; k <= 10; k++) { const u = k / 10, sag = Math.sin(u * Math.PI) * 2.6; P(14 + u * 10 + sag * 0.7 + ax, 26.5 - u * 17 + sag + ay, k === 5 ? '#ff6a5a' : '#d02a2a'); }
        // the steel head: a long pick down one way, a flat adze the other
        for (let k = -3; k <= 4; k++) P(25 + k + ax, 5 + ay, k === 0 ? '#5a6070' : '#c8ccd8');
        for (let k = -3; k <= 4; k++) P(25 + k + ax, 4 + ay, k === 0 ? '#3a4050' : '#e8ecf8');
        P(30 + ax, 6 + ay, '#c8ccd8'); P(30 + ax, 7 + ay, '#9aa0b0'); P(31 + ax, 8 + ay, '#7a8090');
        for (let y = 3; y <= 6; y++) P(21 + ax, y + ay, y === 3 ? '#e8ecf8' : '#9aa0b0');
        if (f) { P(27 + ax, 1 + ay, '#ffffff'); P(26 + ax, 2 + ay, '#ffffff'); P(28 + ax, 2 + ay, '#ffffff'); P(27 + ax, 2 + ay, '#ffffff'); P(27 + ax, 3 + ay, '#ffffff'); }
        // the summit flag, planted on the side away from the friend
        const fx = buddy === 'Snowman' ? 2 : 29;
        for (let y = 19; y <= 29; y++) P(fx, y, '#5a5a6a');
        for (let y = 19; y <= 21; y++) for (let k = 1; k <= 3 - (y === 20 ? 0 : 1); k++) P(fx + (fx > 16 ? -k : k), y + (f && k === 3 ? 1 : 0), y === 20 ? '#ffffff' : '#e0303a');
      }
      if (held === 'Snowball') E(hx2, hy2 - 2, 1.8, 1.8, '#ffffff');
      if (held === 'Ice Pop') { L(hx2, hy2, hx2, hy2 - 1, '#d8b080', 1); for (let y = hy2 - 6; y <= hy2 - 2; y++) { P(hx2, y, y < hy2 - 4 ? '#ff5a8a' : '#ffa0c0'); P(hx2 + 1, y, '#ff5a8a'); } }
      if (held === 'Cocoa') { for (let y = hy2 - 3; y <= hy2; y++) for (let x = hx2 - 1; x <= hx2 + 1; x++) P(x, y, '#f0f0f0'); P(hx2 + 2, hy2 - 2, '#f0f0f0'); P(hx2, hy2 - 3, '#7a4020'); P(hx2 - 1 + f, hy2 - 5, '#d0d8e8'); }
      if (held === 'Icicle') L(hx2, hy2 - 1, hx2 + (up2 ? 0 : 1), hy2 - 8, '#9ae8ff', 1);
      if (held === 'Lantern') { P(hx2, hy2 + 1, C.K); E(hx2, hy2 + 3, 1.2, 1.5, f ? '#ffe060' : '#ffb030'); }
      if (held === 'Boombox') { for (let y = hy2 - 2; y <= hy2 + 1; y++) for (let x = hx2 - 3; x <= hx2 + 3; x++) P(x, y, '#5a5a6a'); E(hx2 - 2, hy2, f ? 1 : 0.6, f ? 1 : 0.6, C.K); E(hx2 + 2, hy2, f ? 1 : 0.6, f ? 1 : 0.6, C.K); P(hx2, hy2 - 1, '#40e8ff'); for (let x = hx2 - 2; x <= hx2 + 2; x++) P(x, hy2 - 3, '#9aa0b0'); }
      if (held === 'Fish') { for (let x = hx2 - 3; x <= hx2 + 1; x++) P(x, hy2 - 2, '#7ab0e0'); P(hx2 - 2, hy2 - 3, '#7ab0e0'); P(hx2 - 1, hy2 - 3, '#a8d0f0'); P(hx2 + 2, hy2 - 2 + (f ? -1 : 1), '#5a8ac0'); P(hx2 + 2, hy2 - 2, '#5a8ac0'); P(hx2 - 3, hy2 - 2, C.K); }
      if (held === 'Flag') { L(hx2, hy2 + 1, hx2, hy2 - 8, '#b08a5a', 1); for (let y = hy2 - 8; y <= hy2 - 5; y++) for (let x = hx2 + 1; x <= hx2 + 4; x++) P(x, y + (f && x > hx2 + 2 ? 1 : 0), (x + y) % 2 ? '#ff4a5a' : '#ffffff'); }
      if (held === 'Torch') { L(hx2, hy2 + 1, hx2, hy2 - 4, '#7a4a20', 1); P(hx2, hy2 - 5, '#ff7a20'); P(hx2 + (f ? 1 : -1), hy2 - 6, '#ffb030'); P(hx2, hy2 - 7, '#ffe84a'); P(hx2, hy2 - 6, '#ffb030'); }
      if (held === 'Microphone') { L(hx2, hy2, hx2 - 1, hy2 - 3, '#3a3a4a', 1); E(hx2 - 1.5, hy2 - 4.5, 1.1, 1.1, '#c8ccd8'); if (f) { P(hx2 - 4, hy2 - 6, '#ffe84a'); P(hx2 - 5, hy2 - 8, '#ffe84a'); } }
      // a little friend at its feet, on the same two frames
      KEEP = 2;
      if (buddy === 'Snow Bunny') { const bx = 3, by = 27 - f * 2; E(bx + 1, by, 1.6, 1.3, '#ffffff'); P(bx, by - 2, '#ffffff'); P(bx, by - 3 + f, '#ffffff'); P(bx + 2, by - 2, '#ffffff'); P(bx + 2, by - 3, '#ffc0d0'); P(bx + 2, by, C.K); P(bx - 1, by + 1, '#ffffff'); }
      if (buddy === 'Snowman') { E(28, 28, 2.4, 2, '#ffffff'); E(28, 24.5, 1.7, 1.6, '#ffffff'); P(27, 24, C.K); P(29, 24, C.K); P(28, 25, '#ff8a20'); P(26, 27 - f, '#7a4a20'); P(25, 26 - f * 2, '#7a4a20'); P(30, 27 - (1 - f), '#7a4a20'); P(31, 26 - (1 - f) * 2, '#7a4a20'); for (let x = 27; x <= 29; x++) P(x, 22, '#2a2a3a'); P(28, 21, '#2a2a3a'); }
      if (buddy === 'Seal') { const sy = 29 - f; E(4, sy, 3, 1.4, '#a8b0c0'); E(6.5, sy - 1.5, 1.6, 1.4, '#a8b0c0'); P(7, sy - 2, C.K); P(8, sy - 1, '#3a3a4a'); P(1, sy - 1 - f, '#a8b0c0'); if (f) E(6.5, sy - 4.5, 1, 1, '#ff5a5a'); }
      if (buddy === 'Mini Yeti') { const my2 = 26 - f; E(4, my2 + 1, 2.4, 2.6, FURS[fur][0]); E(4, my2 - 2, 2, 1.8, FURS[fur][0]); E(4, my2 - 1.6, 1.2, 1, S0); P(3, my2 - 2, C.K); P(5, my2 - 2, C.K); P(1, my2 - 1 - f * 3, FURS[fur][0]); P(7, my2 - 1 - (1 - f) * 3, FURS[fur][0]); }
      KEEP = 0;
      // hard black outline round the sprite
      const out = [];
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        if (mask[y * N + x]) continue;
        if ((x > 0 && mask[y * N + x - 1]) || (x < N - 1 && mask[y * N + x + 1]) || (y > 0 && mask[(y - 1) * N + x]) || (y < N - 1 && mask[(y + 1) * N + x])) out.push(y * N + x);
      }
      for (const i of out) spr[i] = C.K;
    }

    // the screen it plays on: some cabinets only have a few shades of one colour
    const SCREENS = { 'Handheld Green': [[22, 42, 30], [58, 104, 66], [128, 178, 96], [214, 232, 168]], 'Duo Cyan': [[10, 10, 30], [40, 80, 160], [80, 200, 230], [230, 250, 255]], Sepia: [[40, 26, 16], [110, 80, 50], [190, 150, 100], [244, 226, 190]], 'Night Vision': [[4, 16, 6], [20, 80, 30], [70, 200, 80], [200, 255, 190]], Inverted: null };
    const ramp = SCREENS[screen];
    const recolour = (r, gg, b) => {
      if (screen === 'Inverted') return [255 - r, 255 - gg, 255 - b];
      if (!ramp) return [r, gg, b];
      const l = (r * 0.3 + gg * 0.59 + b * 0.11) / 255, k = Math.min(3, Math.floor(l * 4));
      return ramp[k];
    };
    const off = document.createElement('canvas');
    off.width = off.height = N;
    const oc = off.getContext('2d');
    let lastKey = '', lastBeat = -1, roarAt = -9, facing = facing0, liveUntil = -9, hopAt = -9, legAt = -9, wasIn = false;
    const GOLD = [[58, 32, 8], [122, 74, 16], [192, 138, 32], [240, 200, 64], [255, 244, 176]];
    function frame(t) {
      const inp = c.input;
      t0 = t;
      if (LEG && inp.inside && !wasIn) {
        if (LEG === 'Unseen') c.sound.note(bass[0] - 12, { dur: 0.6, vel: 0.12, wave: 'triangle', cutoff: 400 });
        if (LEG === 'Golden Idol') c.sound.note(bass[0] + 36, { dur: 0.8, vel: 0.06, wave: 'sine' });
        if (LEG === 'Final Boss') { c.sound.note(bass[0] - 12, { dur: 0.3, vel: 0.14, wave: 'sawtooth', cutoff: 500 }); c.sound.note(bass[0] - 11, { dur: 0.5, vel: 0.14, wave: 'sawtooth', cutoff: 500, at: 0.3 }); }
      }
      wasIn = inp.inside;
      for (const p of inp.taps()) {
        const gx = Math.floor(p.x * N), gy = Math.floor(p.y * N), sx = facing > 0 ? gx : N - 1 - gx;
        liveUntil = t + beat * 8;
        if (LEG === 'Unseen' && t - legAt > 1.5) {
          // the camera flash: one photograph of it, then it is gone again
          legAt = t; c.sound.hit('click', 0.5); c.sound.hit('noise', 0.18, { cutoff: 5000, dur: 0.08 });
          c.sound.note(bass[1] - 12, { dur: 0.5, vel: 0.16, wave: 'sawtooth', cutoff: 420, at: 0.25 });
          continue;
        }
        const onIt = gx >= 0 && gy >= 0 && gx < N && gy < N && mask[gy * N + sx] && keep[gy * N + sx] !== 2;
        if (LEG === 'Golden Idol' && onIt) {
          if (t > awakeUntil) { awakeUntil = t + beat * 8; legAt = t; c.sound.note(bass[0] - 12, { dur: 2.5, vel: 0.22, wave: 'sine' }); c.sound.note(bass[0] + 7, { dur: 2, vel: 0.08, wave: 'sine', at: 0.02 }); c.sound.note(bass[0] + 19, { dur: 1.6, vel: 0.05, wave: 'triangle', at: 0.04 }); }
          continue;
        }
        if (LEG === 'Final Boss' && (onIt || gx < 8 && gy > 18)) {
          if (t - deadAt > 2 && t - bossHit > 0.25) {
            bossHit = t; hp--;
            c.sound.hit('snare', 0.3); c.sound.note(bass[0] + 12 - (8 - hp), { dur: 0.12, vel: 0.14, wave: 'square', cutoff: 1400 });
            if (hp <= 0) { deadAt = t; [79, 76, 72, 67, 64, 60, 55].forEach((m, i) => c.sound.note(m, { dur: 0.1, vel: 0.15, wave: 'square', cutoff: 2000, at: 0.1 + i * 0.09 })); c.sound.hit('noise', 0.3, { cutoff: 800, dur: 0.8, at: 0.1 }); }
          }
          continue;
        }
        if (gx >= 0 && gy >= 0 && gx < N && gy < N && mask[gy * N + sx] && !(buddy !== 'None' && gy > 20 && (sx < 9 || sx > 24))) {
          roarAt = t;
          c.sound.hit('noise', 0.22, { cutoff: 600, dur: 0.5 });
          c.sound.note(33, { dur: 0.5, vel: 0.28, wave: 'sawtooth', cutoff: 380 });
        } else {
          hopAt = t;
          c.sound.note(bass[0] + 24, { dur: 0.08, vel: 0.12, wave: 'square', cutoff: 1600 });
          c.sound.note(bass[0] + 31, { dur: 0.1, vel: 0.1, wave: 'square', cutoff: 1600, at: 0.09 });
        }
      }
      if (inp.inside) { facing = inp.x < 0.5 ? -1 : 1; liveUntil = Math.max(liveUntil, t + beat * 2); }
      // Stagger swings: the second frame of each pair comes late
      const ph = beatName === 'Stagger' ? (t % (beat * 2)) / beat : t / beat;
      const bi = beatName === 'Stagger' ? Math.floor(t / (beat * 2)) * 2 + (ph < 1.3 ? 0 : 1) : Math.floor(ph);
      const f = ((bi % 2) + 2) % 2, roar = t - roarAt < beat * 4;
      if (LEG === 'Final Boss' && hp <= 0 && t - deadAt > 2) hp = 8;
      const awake = LEG === 'Golden Idol' && t < awakeUntil, still = LEG === 'Golden Idol' && !awake;
      const photo = LEG === 'Unseen' && t - legAt < beat * 4, flash = LEG === 'Unseen' && t - legAt < 0.12;
      const lamp = LEG === 'Unseen' && inp.inside ? [Math.floor(inp.x * N), Math.floor(inp.y * N)] : null;
      const hitF = LEG === 'Final Boss' && t - bossHit < 0.16, dying = LEG === 'Final Boss' && t - deadAt < 2 ? Math.floor((t - deadAt) * 10) : -1;
      const shine = LEG === 'Golden Idol' ? (inp.inside ? Math.floor(inp.x * N) : Math.floor(((t * 0.4) % 1.6) * 40) - 10) : 0;
      const hopping = t - hopAt < beat * 2 ? 1 : 0;
      // the two-note stomp plays only while someone is with it
      if (bi !== lastBeat) { lastBeat = bi; if (t < liveUntil) c.sound.note(bass[f] - (roar ? 5 : 0), { dur: beat * 0.5, vel: 0.16, wave: 'square', cutoff: 600 }); }
      const key = f + ',' + roar + ',' + facing + ',' + hopping + ',' + [photo, flash, lamp, hitF, dying, hp, awake, shine, LEG === 'Final Boss' && t - bossHit < 0.3].join(':');
      if (key === lastKey) return;
      lastKey = key;
      scenery(f);
      yeti(still ? 0 : f, roar || awake && f === 1);
      const img = oc.createImageData(N, N), d = img.data;
      const lift = hopping && f ? 2 : 0;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const sx = facing > 0 ? x : N - 1 - x;
        // a hop lifts only the little friend's corner
        const fy = lift && y + lift < N && y > 18 && (sx < 9 || sx > 24) ? y + lift : y;
        let cs = spr[fy * N + sx];
        const kp = keep[fy * N + sx];
        let lit = false;
        if (LEG === 'Unseen') {
          // it cannot be seen except by its eyes and what it carries, in the torch under the pointer, or in a photograph
          if (lamp) lit = (x - lamp[0]) ** 2 + (y - lamp[1]) ** 2 < 30;
          if (cs && (!kp || kp === 4) && !lit && !photo) cs = null;
        }
        if (dying >= 0 && cs && ((x * 7 + y * 13 + dying * 5) % 10) < dying) cs = null;
        const col = flash ? '#ffffff' : hitF && cs ? '#ffffff' : cs || buf[y * N + x];
        const v = parseInt(col.slice(1), 16), i = (y * N + x) * 4;
        let rgb = recolour(v >> 16, (v >> 8) & 255, v & 255);
        // on the few-shade screens the face patch sits on the second-lightest step whatever its colour (mask, slate, frost),
        // and the outline, the eyes and the mouth on the darkest (white glints and teeth on the lightest), so the face reads
        if (ramp && cs && !flash && !hitF && LEG !== 'Unseen') {
          if (cs === C.K) rgb = ramp[0];
          else if (kp === 4) rgb = ramp[2];
          else if (kp === 1) rgb = cs === '#ffffff' ? ramp[3] : ramp[0];
          else if (kp === 3) { const l = ((v >> 16) * 0.3 + ((v >> 8) & 255) * 0.59 + (v & 255) * 0.11) / 255; rgb = l < 0.5 || cs === LIPC || cs === GAPEC ? ramp[0] : ramp[3]; }
        }
        if (photo && !flash) { const l = (rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11) / 255; rgb = [40 + l * 200, 28 + l * 190, 18 + l * 160]; }
        else if (lit && !cs) rgb = [Math.min(255, rgb[0] * 1.5 + 40), Math.min(255, rgb[1] * 1.5 + 40), Math.min(255, rgb[2] * 1.4 + 30)];
        if (LEG === 'Golden Idol' && cs && cs !== C.K && kp !== 1) {
          // solid gold: every shade of the sprite becomes a step of gold, and a shine runs across it
          const l = (rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11) / 255, band = Math.abs(x + y * 0.5 - shine - 8) < 1.6;
          // polished metal: lit by the left-hand torch, with a bright line of the hall reflected across it
          const horizon = (y % 7) === 2 ? 1 : 0, v = l * 3.3 + (15.5 - x) / 8 + horizon + (band ? 1.2 : 0);
          rgb = GOLD[Math.max(0, Math.min(4, Math.round(v) - 1))];
        } else if (LEG === 'Golden Idol' && cs === C.K) rgb = [46, 24, 6];
        d[i] = rgb[0]; d[i + 1] = rgb[1]; d[i + 2] = rgb[2]; d[i + 3] = 255;
      }
      oc.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(off, 0, 0, S, S);
    }
    frame(0);
    return frame;
  },
});

})(window.Proto);
