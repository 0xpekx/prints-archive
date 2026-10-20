// Soft Steps: from D:/code/synaesthesia/public/drop03/pieces/205.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Soft Steps: narwhals in hand-antialiased pixel art: 48 dots across, every edge eased
// with in-between colours from the piece's own ramps, and every motion a sub-pixel one.
Proto.add({
  num: 205,
  name: 'Soft Steps',
  fam: 'Pixel Portraits III',
  fps: 24,
  seed: 1308,
  interactive: 'Tap the tusk to ring it. Tap anywhere else to make it spout and sing.',
  music: true,
  recipe: 'A narwhal, head and shoulders, in careful hand-antialiased pixel art 48 dots across: shapes shaded in five-step ramps with a coloured outline only on the shadow side, curves softened with in-between colours from the ramps, and motion done in fractions of a dot. A blunt melon of a head over a narrow, low face with the eyes set wide, a short snout, and the tusk leaving the upper lip and rising clear of both eyes; flippers at the chest, the tail flukes raised behind one shoulder, and a pale belly under a darker back. Hide, build, tusk and the side it grows from, markings, eyes, mouth, headwear, neckwear, a little companion, a frame and the scene (ice floes to pink dawns, kelp forests and sandy shallows) vary; pearl hides, rainbow tusks, glowing lures and halos are rare; about 1 in 400 is a legendary, a picture of its own (an Ice Sculpture: an isometric diorama in a cold palette, a narwhal carved in faceted ice leaping from a hole in a floating slab of sea ice; or The Unicorn: a page of an old bestiary, the crowned white old bull rising out of curling waves under a gilt arch, its great spiral horn up to the corner), and about 1 in 200 wears the coveted gold ring on its tusk. It bobs, blinks and sways its tusk.',
  make(c) {
    const S = c.size, g = c.ctx;
    // an LCG (Numerical Recipes constants) mixed with the hash on every draw
    const words = []; for (let i = 0; i < 8; i++) words.push(parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0);
    let lc = (words[0] ^ words[5]) >>> 0, step = 0;
    const rn = () => {
      lc = (Math.imul(lc, 1664525) + 1013904223) >>> 0;
      const m = (lc ^ words[step++ & 7] ^ (lc >>> 16)) >>> 0;
      return (Math.imul(m, 2246822519) >>> 0) / 4294967296;
    };
    const roll = arr => { let s = 0; for (const [, w] of arr) s += w; let r = rn() * s; for (const [v, w] of arr) { r -= w; if (r < 0) return v; } return arr[0][0]; };

    let hide = roll([['Arctic Grey', 28], ['Slate', 22], ['Beluga Pale', 18], ['Deep Blue', 16], ['Rose', 8], ['Golden', 4], ['Midnight Ink', 4]]);
    let tusk = roll([['Spiral', 40], ['Long Spiral', 18], ['Stubby', 14], ['Chipped', 12], ['Twin', 8], ['Crystal', 5], ['Gilded', 3]]);
    let marks = roll([['Speckled', 34], ['Plain', 22], ['Blushing', 18], ['Freckled', 16], ['Starry', 10]]);
    let eyes = roll([['Bead', 34], ['Sparkle', 24], ['Sleepy', 16], ['Wide', 14], ['Shades', 8], ['Monocle', 4]]);
    let hat = roll([['None', 36], ['Bobble Hat', 18], ['Earmuffs', 12], ['Bow', 12], ['Captain', 10], ['Crown', 6], ['Ice Crown', 6]]);
    let neck = roll([['None', 40], ['Striped Scarf', 22], ['Bow Tie', 14], ['Life Ring', 12], ['Pearls', 8], ['Medal', 4]]);
    let scene = roll([['Floes', 28], ['Polar Night', 20], ['Aurora', 18], ['Iceberg', 16], ['Under Ice', 12], ['Midnight Sun', 6]]);
    // the wider pod rolls from a PCG (RXS-M-XS) stream on two more hash words, so every narwhal
    // above keeps its looks unless this stream swaps one trait for a newer value
    let pcg = (words[3] ^ words[6] ^ 0x5851f42d) >>> 0;
    const pc = () => { pcg = (Math.imul(pcg, 747796405) + 2891336453) >>> 0; const w2 = Math.imul((pcg >>> ((pcg >>> 28) + 4)) ^ pcg, 277803737) >>> 0; return (((w2 >>> 22) ^ w2) >>> 0) / 4294967296; };
    const pcOf = arr => { let s2 = 0; for (const [, w2] of arr) s2 += w2; let r = pc() * s2; for (const [v, w2] of arr) { r -= w2; if (r < 0) return v; } return arr[0][0]; };
    if (pc() < 0.3) hide = pcOf([['Seafoam', 28], ['Lavender', 26], ['Coral', 26], ['Pearl', 8]]);
    if (pc() < 0.28) tusk = pcOf([['Candy Stripe', 44], ['Glow', 30], ['Rainbow', 14]]);
    if (pc() < 0.3) marks = pcOf([['Mottled', 36], ['Cheek Dots', 36], ['Moon Patch', 28]]);
    if (pc() < 0.3) eyes = pcOf([['Content', 30], ['Teary', 26], ['Hearts', 24], ['Starry', 20]]);
    if (pc() < 0.34) hat = pcOf([['Party Hat', 24], ['Flower', 24], ['Snow Cap', 24], ['Lure', 14], ['Halo', 8]]);
    if (pc() < 0.32) neck = pcOf([['Kelp', 36], ['Bell', 34], ['Shell Necklace', 30]]);
    if (pc() < 0.32) scene = pcOf([['Snowfall', 36], ['Starry Sea', 36], ['Deep Glow', 14]]);
    const build = pcOf([['Classic', 52], ['Chubby', 26], ['Slim', 22]]);
    let tuskSide = tusk === 'Twin' ? 0 : pc() < 0.38 ? 1 : -1;
    const pal2 = pcOf([['None', 56], ['Puffin', 12], ['Fish School', 12], ['Jellyfish', 10], ['Bubbles', 10]]);
    // the legendaries: a middle-square Weyl stream on two more hash words, so no other roll moves
    let msx = (words[2] ^ 0x3c6ef372) >>> 0, msw = 0;
    const mss = ((words[7] ^ Math.imul(words[4], 0x9e3779b1)) | 1) >>> 0;
    const ms = () => { msw = (msw + mss) >>> 0; msx = (Math.imul(msx, msx) + msw) >>> 0; msx = ((msx >>> 16) | (msx << 16)) >>> 0; let z = Math.imul(msx ^ (msx >>> 15), 0x2c1b3c6d); z ^= z >>> 12; return (z >>> 0) / 4294967296; };
    for (let i = 0; i < 9; i++) ms();
    const lu = ms();
    const LEG = lu < 0.0013 ? 'Ice Sculpture' : lu < 0.0026 ? 'The Unicorn' : '';
    const ringed = !LEG && lu < 0.0076;          // the coveted gold ring on the tusk, about one in two hundred
    if (ringed && (tusk === 'Gilded' || tusk === 'Candy Stripe' || tusk === 'Rainbow')) tusk = 'Spiral';
    if (LEG) { c.trait('Legendary', LEG); marks = 'Plain'; }
    if (LEG === 'Ice Sculpture') { hide = 'Clear Ice'; tusk = tusk === 'Twin' ? 'Twin' : 'Crystal'; if (eyes === 'Sleepy' || eyes === 'Content') eyes = 'Bead'; }
    // the Unicorn: a white old bull with one spiral horn twice the usual length, a ring of barnacles and a
    // ship's figurehead crown
    if (LEG === 'The Unicorn') { hide = 'Old Ivory'; tusk = 'Great Spiral'; marks = 'Old Scars'; hat = 'Figurehead Crown'; neck = 'Barnacles'; if (!tuskSide) tuskSide = 1; }
    // a wider palette, on its own xorshift stream on two more hash words: fewer grey and blue hides (about a third
    // now), warmer scenes, and never a hide the same value as its sky
    let xs = (words[1] ^ words[6] ^ 0x2545f491) >>> 0 || 1;
    const xr = () => { xs ^= xs << 13; xs >>>= 0; xs ^= xs >>> 17; xs ^= xs << 5; xs >>>= 0; return xs / 4294967296; };
    const xrOf = arr => { let s2 = 0; for (const [, w2] of arr) s2 += w2; let r = xr() * s2; for (const [v, w2] of arr) { r -= w2; if (r < 0) return v; } return arr[0][0]; };
    for (let i = 0; i < 3; i++) xr();
    const greyBlue = hide === 'Arctic Grey' || hide === 'Slate' || hide === 'Beluga Pale' || hide === 'Deep Blue';
    if (xr() < 0.45 && greyBlue) hide = xrOf([['Apricot', 22], ['Moss', 18], ['Plum', 18], ['Coral', 16], ['Rose', 14], ['Seafoam', 12]]);
    if (xr() < 0.34) scene = xrOf([['Dawn Pink', 30], ['Kelp Forest', 24], ['Sandy Shallows', 24], ['Midnight Sun', 22]]);
    const hx = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const ramp = a => a.map(hx);
    const HIDES = {
      'Arctic Grey': ['#28334e', '#4a5c7a', '#7b8ea8', '#afbecd', '#e0e9ef'],
      Slate: ['#232838', '#424c62', '#67738c', '#949fb5', '#c4ccda'],
      'Beluga Pale': ['#56668a', '#8ca0bb', '#bacadb', '#e0eaf2', '#fbfdff'],
      'Deep Blue': ['#131c42', '#21387a', '#395eae', '#6893d6', '#a8c8f2'],
      Rose: ['#4a2142', '#7d3a64', '#b6608a', '#e294b2', '#fbd0de'],
      Golden: ['#4a2a10', '#84511b', '#c18b2b', '#ebc45b', '#fff1aa'],
      'Midnight Ink': ['#0b0a14', '#1c1a2e', '#2f2c4a', '#4a4670', '#7a74a6'],
      'Clear Ice': ['#2a5a7a', '#5a9ec0', '#9ad4ea', '#d4f4fc', '#ffffff'],
      Seafoam: ['#163a3a', '#2a6464', '#4a9a90', '#8ad0c0', '#c8f4e8'], Lavender: ['#2e2448', '#54447a', '#8470b0', '#b8a4dc', '#e6dcf8'], Coral: ['#4a1e22', '#843a3a', '#c4645a', '#ec9a88', '#ffd4c4'], Pearl: ['#5a5a70', '#9898b0', '#c8c8dc', '#ecebf6', '#ffffff'],
      Apricot: ['#4a2214', '#8a4422', '#c8743a', '#eeaa6a', '#ffdcb0'], Moss: ['#1e2a14', '#3a5224', '#62803a', '#98b05e', '#d0e09a'], Plum: ['#2a1030', '#521e58', '#844088', '#b878b8', '#e8b8e4'],
      'Old Ivory': ['#4a4440', '#8a8278', '#c4bcae', '#e8e2d4', '#fffcf4'],
    };
    const TUSK = ramp(tusk === 'Glow' ? ['#0a5a6a', '#1aa0b0', '#4ae0e8', '#a8fff8', '#f0ffff'] : tusk === 'Crystal' || (tusk === 'Twin' && LEG === 'Ice Sculpture') ? ['#1d4a6a', '#2f86a8', '#6cc6dc', '#b4eef4', '#f2ffff'] : tusk === 'Gilded' ? ['#5a3a08', '#9a6a10', '#d4a020', '#f4d050', '#fff6b0'] : tusk === 'Great Spiral' ? ['#3a2810', '#9a7a40', '#e8c878', '#fae8b0', '#fffbe8'] : ['#6b5a3e', '#a8936a', '#d6c79e', '#f2e9cc', '#fffaf0']);
    const CANDY = ramp(['#7a1020', '#c02a3a', '#f05a6a']), RAINB = ramp(['#ff6a7a', '#ffb050', '#fff070', '#7ae08a', '#6ab8ff', '#b48aff']), GOLDC = hx('#e8b830'), PEARLC = ramp(['#ffd8f0', '#d8f0ff']);
    const LURE = ramp(['#1a6a5a', '#4af0c0', '#c8fff0']), HEART = ramp(['#4a0a22', '#ff5a8a', '#ffa8c4']), TEAR = hx('#8ad8ff'), PUFF = ramp(['#14101e', '#f4f4f8', '#ff8a2a', '#e8503a']), JELLY = ramp(['#c86ad8', '#f0a8f4', '#ffe0ff']), FISHC = ramp(['#f0a040', '#ffd080']), KELP = ramp(['#1a4a2a', '#2a7a3a', '#4aa850']), SHELL = ramp(['#e8a090', '#ffd8c8']);
    // the legendaries' own colours: clear ice and its prism, the Unicorn's barnacles; the gold ring
    const ICEM = ramp(['#2a5a7a', '#5a9ec0', '#9ad4ea', '#d4f4fc', '#ffffff']), PRISM = ramp(['#ff8aa8', '#ffd27a', '#c8ff9a', '#8af0ff', '#b4a8ff']);
    const ICEINK = hx('#0c2238'), BARN = ramp(['#3a3a34', '#6e6c62', '#a8a496', '#dcd8c8']);
    const RING = ramp(['#5a3808', '#9a6810', '#d8a420', '#f8d850', '#fffad0']);
    const ROPE = ramp(['#4a3018', '#8a6a3e', '#c8a46a', '#ecd8a8']), BRASS = ramp(['#2a1a08', '#6a4a18', '#b08a38', '#e8cc78']), PAPER = hx('#f4f0e6'), PAPERS = hx('#d8d2c2'), FROST = ramp(['#9ac8e0', '#d0ecf8', '#ffffff']);
    const SUNC = hx('#ffe8a0'), RIBBON = hx('#c02a40'), INK = hx('#14101e'), WHITE = hx('#ffffff'), BLUSH = ramp(['#a8406a', '#e0708e', '#f4a0b4', '#ffc8d4', '#ffe4ea']);
    const HATR = ramp({ 'Bobble Hat': ['#5a1424', '#9a2238', '#d23c4c', '#f0707a', '#ffb0b0'], Earmuffs: ['#3a1450', '#6a2a8a', '#a050c0', '#d090e8', '#f4d0ff'], Bow: ['#6a1a48', '#b0306e', '#e85a98', '#ff9cc4', '#ffd8ea'], Captain: ['#0e1430', '#1c2a5a', '#2e4488', '#ffffff', '#ffffff'], Crown: ['#5a3808', '#9a6810', '#d8a420', '#f8d850', '#fff8b8'], 'Party Hat': ['#1a4a8a', '#2a7ad8', '#5ab0ff', '#ffd23a', '#fff4b0'], Flower: ['#8a2a4a', '#e05a8a', '#ff9ac0', '#ffd23a', '#fff4c0'], 'Snow Cap': ['#7aa0c0', '#b8d4e8', '#e0eef8', '#f4faff', '#ffffff'], Lure: ['#14101e', '#2a3a3a', '#4af0c0', '#a8fff0', '#ffffff'], Halo: ['#8a6a10', '#c8a020', '#f0d040', '#fff0a0', '#ffffff'], 'Ice Crown': ['#20507a', '#3a8ab8', '#78c8e8', '#c0f0ff', '#ffffff'], 'Figurehead Crown': ['#5a3808', '#9a6810', '#d8a420', '#f8d850', '#fffad0'], None: ['#000000', '#000000', '#000000', '#000000', '#000000'] }[hat]);
    const NECKR = ramp({ 'Striped Scarf': ['#0c3a40', '#14666e', '#22a0a0', '#f2f0e8', '#ffffff'], 'Bow Tie': ['#3a0a14', '#7a1428', '#c02a40', '#f06070', '#ffa0a8'], 'Life Ring': ['#6a1010', '#b02020', '#f04030', '#f8f4ec', '#ffffff'], Pearls: ['#6a6070', '#a8a0b0', '#dcd6e2', '#f6f2fa', '#ffffff'], Medal: ['#5a3808', '#9a6810', '#d8a420', '#f8d850', '#fff8b8'], Kelp: ['#0e2a18', '#1a4a2a', '#2a7a3a', '#4aa850', '#8ad870'], Bell: ['#5a3808', '#9a6810', '#d8a420', '#f8d850', '#fff8b8'], 'Shell Necklace': ['#6a3a3a', '#b06a60', '#e8a090', '#ffd8c8', '#ffffff'], Barnacles: ['#3a3a34', '#6e6c62', '#a8a496', '#dcd8c8', '#f4f0e4'], None: ['#000000', '#000000', '#000000', '#000000', '#000000'] }[neck]);
    const SCS = {
      Floes: { sky: ['#8ec8e8', '#b0dcf0', '#d4eef8'], sea: ['#2e6a9a', '#3c80b0'], ice: ['#f2faff', '#b4d4e6'] },
      'Polar Night': { sky: ['#080c26', '#121a40', '#1e2a5a'], sea: ['#0a1430', '#122046'], ice: ['#8ea4c8', '#4a5e86'] },
      Aurora: { sky: ['#070b1e', '#0e1834', '#18244a'], sea: ['#0a1a2c', '#10283e'], ice: ['#9ad8c8', '#4a7a80'] },
      Iceberg: { sky: ['#a6d4ec', '#c4e4f4', '#e2f2fa'], sea: ['#245e8e', '#3274a6'], ice: ['#f4fcff', '#a8cce2'] },
      'Under Ice': { sky: ['#0c3a5e', '#14507a', '#1e6a96'], sea: ['#0a2c4a', '#0e3858'], ice: ['#c8eef8', '#7ab8d4'] },
      'Midnight Sun': { sky: ['#3a2a6a', '#b44e7a', '#f2a062'], sea: ['#3a2a5a', '#52386e'], ice: ['#ffe0c8', '#d48c8a'] },
      Snowfall: { sky: ['#9ab0c8', '#b4c6d8', '#ccdae6'], sea: ['#40607e', '#4e7090'], ice: ['#f6faff', '#bcd0e0'] },
      'Starry Sea': { sky: ['#060a20', '#0c143a', '#182452'], sea: ['#0a1430', '#16244a'], ice: ['#c8d8f0', '#6a7ea8'] },
      'Deep Glow': { sky: ['#030a18', '#061428', '#0a1e38'], sea: ['#020812', '#04101e'], ice: ['#4af0c0', '#1a8a7a'] },
      'Dawn Pink': { sky: ['#e88aa8', '#f6b4b8', '#ffd8c4'], sea: ['#a8587a', '#c07090'], ice: ['#fff2ec', '#e8aab8'] },
      'Kelp Forest': { sky: ['#0a3a2e', '#125a44', '#207454'], sea: ['#1c3220', '#28442a'], ice: ['#9ae0a8', '#4a9a68'] },
      'Sandy Shallows': { sky: ['#0e6484', '#167c98', '#3a9cb0'], sea: ['#e4c48a', '#cca868'], ice: ['#fff6dc', '#b89458'] },
    };
    // no hide the same value as its sky: a pale hide gets a dark or warm scene and a dark hide a light one, and grey
    // or blue hides keep well away from the pale blue skies
    const lumOf = h => { const v = hx(h); return v[0] * 0.3 + v[1] * 0.59 + v[2] * 0.11; };
    const hideL = (lumOf(HIDES[hide][2]) + lumOf(HIDES[hide][3])) / 2, gbHide = hide in { 'Arctic Grey': 1, Slate: 1, 'Beluga Pale': 1, 'Deep Blue': 1, Pearl: 1 };
    const clash = sc => Math.abs(hideL - lumOf(SCS[sc].sky[1])) < ((hide === 'Clear Ice' || hide === 'Old Ivory' || gbHide) && (sc === 'Floes' || sc === 'Iceberg' || sc === 'Snowfall') ? 70 : 40);
    if (clash(scene)) {
      const ok = [['Floes', 20], ['Polar Night', 14], ['Aurora', 10], ['Iceberg', 12], ['Under Ice', 10], ['Midnight Sun', 14], ['Snowfall', 8], ['Starry Sea', 10], ['Deep Glow', 4], ['Dawn Pink', 14], ['Kelp Forest', 12], ['Sandy Shallows', 12]].filter(([sc]) => !clash(sc));
      if (ok.length) scene = xrOf(ok);
    }
    c.trait('Hide', hide); c.trait('Tusk', tusk); c.trait('Markings', marks); c.trait('Eyes', eyes);
    c.trait('Headwear', hat); c.trait('Neckwear', neck); c.trait('Scene', scene);
    c.trait('Build', build); c.trait('Tusk Side', tusk === 'Twin' ? 'Both' : tuskSide > 0 ? 'Right' : 'Left'); c.trait('Companion', pal2);
    if (ringed) c.trait('Tusk Ring', 'Gold');
    // three more axes for a bigger pod, rolled on after the legendary roll in the same stream, so no older trait moves
    const msOf = arr => { let s2 = 0; for (const [, w2] of arr) s2 += w2; let r = ms() * s2; for (const [v, w2] of arr) { r -= w2; if (r < 0) return v; } return arr[0][0]; };
    const mouth = msOf([['Smile', 26], ['Grin', 16], ['Ooh', 12], ['Smirk', 14], ['Toothy', 12], ['Flat', 10], ['Whistle', 10]]);
    const flips = msOf([['Resting', 30], ['Waving', 24], ['Both Up', 18], ['Tucked', 18], ['Paddling', 10]]);
    let frameKind = msOf([['None', 28], ['Porthole', 18], ['Frosted Corners', 18], ['Rope', 14], ['Snapshot', 14], ['Gilt Frame', 8]]);
    if (LEG === 'The Unicorn' && frameKind === 'Porthole') frameKind = msOf([['None', 28], ['Frosted Corners', 18], ['Rope', 14], ['Snapshot', 14], ['Gilt Frame', 8]]);
    c.trait('Mouth', mouth); c.trait('Flippers', flips); c.trait('Frame', frameKind);

    const HIDE = ramp(HIDES[hide]), SC = SCS[scene];
    const SKY = SC.sky.map(hx), SEA = SC.sea.map(hx), ICE = SC.ice.map(hx);
    // the aurora's bands, about half blended into the night sky
    const AUR = ramp(['#124a44', '#206f5c', '#507d73']);

    // fixed rolls
    const spots = Array.from({ length: 22 }, () => [rn() * 2 - 1, rn() * 2 - 1, 0.5 + rn() * 0.9]);
    const stars = Array.from({ length: 30 }, () => [rn() * 48, rn() * 22, rn()]);
    const floes = Array.from({ length: 4 }, () => [rn() * 48, 25 + rn() * 4, 3 + rn() * 5]);
    const blinkOff = rn() * 4, swayOff = rn() * 6;

    // palette: every ramp plus scene colours; averaged samples snap back onto it
    const PAL = [...HIDE, ...TUSK, INK, WHITE, ...BLUSH, ...SKY, ...SEA, ...ICE];
    if (hat !== 'None') PAL.push(...HATR);
    if (neck !== 'None') PAL.push(...NECKR);
    if (scene === 'Aurora') PAL.push(...AUR);
    PAL.push(...ICEM, ...PRISM, ICEINK, ...BARN, ...RING, ...ROPE, ...BRASS, PAPER, PAPERS, ...FROST);
    PAL.push(SUNC, RIBBON, ...CANDY, ...RAINB, GOLDC, ...PEARLC, ...LURE, ...HEART, TEAR, ...PUFF, ...JELLY, ...FISHC, ...KELP, ...SHELL);

    const RAMPOF = new Map();
    for (const rr of [HIDE, TUSK, BLUSH, SKY, SEA, ICE, AUR, HATR, NECKR, CANDY, LURE, JELLY, KELP, ICEM, PRISM, BARN, RING, ROPE, BRASS, FROST]) for (const col of rr) if (!RAMPOF.has(col)) RAMPOF.set(col, rr);
    const N = 48, SS = 4;
    const lx = -0.48, ly = -0.62, lz = 0.62;
    const shadeIdx = (nx, ny) => {
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const d = nx * lx + ny * ly + nz * lz;
      return Math.max(0, Math.min(4, Math.floor((d + 0.25) * 4)));
    };
    const ell = (px, py, cx, cy, rx, ry) => { const dx = (px - cx) / rx, dy = (py - cy) / ry; return (Math.sqrt(dx * dx + dy * dy) - 1) * Math.min(rx, ry); };
    const seg = (px, py, ax, ay, bx, by, ra, rb) => {
      const vx = bx - ax, vy = by - ay, l2 = vx * vx + vy * vy;
      const t = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / l2));
      const dx = px - ax - vx * t, dy = py - ay - vy * t;
      return [Math.sqrt(dx * dx + dy * dy) - (ra + (rb - ra) * t), t];
    };

    // state shared with the sampler
    let oy = 0, lean = 0, gazeX = 0, gazeY = 0, blink = 0, tt = 0, ringAt = -9;
    let legAt = -9, hov = null;      // a legendary's last tap, and the pointer over it
    const HRX = build === 'Chubby' ? 18.5 : build === 'Slim' ? 14.6 : 16.5;
    // the face: a blunt melon above, and a narrow low face turned three-quarters toward the tusk: the near eye wide of
    // the snout, the far eye smaller and close to it, and the tusk leaving the snout's upper lip, forward and up and out
    // past the cheek, under the far eye and clear of both (twin tusks: a face straight on, a tusk out to each side)
    const twin = tusk === 'Twin', FX = twin ? 24 : 24 + tuskSide * 4.5, EY = twin ? 23.4 : 24.6, MY = 34.2, TY = 31.6;
    const EXS = twin ? [15, 33] : tuskSide > 0 ? [FX - 9, FX + 5.5] : [FX - 5.5, FX + 9], ESC = twin ? [1, 1] : tuskSide > 0 ? [1, 0.85] : [0.85, 1];
    const RUN = twin ? 14 : 13, RISE = twin ? 10.5 : 12;
    const TS = tuskSide > 0 ? -1 : tuskSide < 0 ? 1 : (words[5] >>> 3) & 1 ? 1 : -1;     // the side the tail shows
    const tuskDefs = twin ? [[19.5, -1], [28.5, 1]] : [[FX + tuskSide * (tusk === 'Great Spiral' ? 6.5 : 4), tuskSide]];
    const tlen = tusk === 'Long Spiral' ? 1.22 : tusk === 'Stubby' ? 0.55 : tusk === 'Chipped' ? 0.7 : tusk === 'Great Spiral' ? 1.9 : 1;
    const TR0 = tusk === 'Great Spiral' ? 2.3 : LEG === 'Ice Sculpture' ? 2.2 : 1.9;
    // the Unicorn's great horn: nearly twice the length, rising steeply past the far eye out to the tile's top corner
    const tuskEnd = (bx, s2) => tusk === 'Great Spiral' ? [bx + s2 * 14.5 + lean, TY - 30.1] : [bx + s2 * RUN * tlen + lean * Math.min(1, tlen), TY - RISE * tlen];
    const drops = [];
    // the coveted ring sits this far up the first tusk; where its middle is now (the tusk leans)
    const RING_T = 0.45;
    const ringAtNow = () => { const [ax, s2] = tuskDefs[0], [ex, ey] = tuskEnd(ax, s2); return [ax + (ex - ax) * RING_T, TY + (ey - TY) * RING_T]; };
    // the mouth's colour: the hide's darkest, or dark ink on the ice
    const MC = LEG === 'Ice Sculpture' ? ICEINK : HIDE[0];
    // where the Ice Sculpture's rim is: set by the sampler for each body sample
    let rimD = -9, rimLit = false;
    // the whistled notes drift away on the side the tusk is not
    const WS = tuskSide > 0 ? -1 : 1;
    // markings are drawn on whole dots, so they stay crisp (they move with the bob a whole dot at a time)
    const crispY = py => Math.floor(py) + 0.5 - Math.round(oy);

    // what moves in the scene, worked out once a frame rather than once a sample (same sums, so the same picture):
    // the fish, the jellyfish, the snowflakes and the aurora's height per sample column; and per sample row, which
    // stars of the starry sea can reach it (in their own order)
    const MOV = new Float64Array(44), AURW = new Float64Array(N * SS);
    const STROW = Array.from({ length: N * SS }, (_, r) => stars.filter(st2 => Math.abs((r + 0.5) / SS - st2[1]) < 0.65));
    function moveScene() {
      if (pal2 === 'Fish School') for (let k = 0; k < 5; k++) { MOV[k * 2] = ((tt * 3 + k * 9.7) % 60) - 6; MOV[k * 2 + 1] = 34 + (k % 3) * 2.2 + Math.sin(tt * 2 + k) * 0.6; }
      if (pal2 === 'Jellyfish') { MOV[10] = 41 + Math.sin(tt * 0.4) * 2; MOV[11] = 10 + Math.sin(tt * 0.9) * 1.5; }
      if (scene === 'Snowfall') for (let k = 0; k < 16; k++) { const st2 = stars[k]; MOV[12 + k * 2] = (st2[0] + Math.sin(tt * 0.7 + k) * 1.2 + 48) % 48; MOV[13 + k * 2] = ((st2[1] * 2.2 + tt * (2 + st2[2] * 2)) % 50) - 1; }
      if (scene === 'Aurora') for (let c2 = 0; c2 < N * SS; c2++) { const px = Math.floor(c2 / SS) + (c2 % SS + 0.5) / SS; AURW[c2] = 4.4 + Math.sin(px * 0.22 + tt * 0.4) * 1.1 + Math.sin(px * 0.09) * 0.6; }
    }
    function background(px, py) {
      const hz = 27;
      if (scene === 'Under Ice') {
        if (py < 5 + Math.sin(px * 0.4) * 0.8) return ICE[(px | 0) % 9 < 6 ? 0 : 1];
        const ray = ((px - py * 0.35 + tt * 0.6) % 9 + 9) % 9 < 1.4 && py < 30;
        const b = py < 16 ? 2 : py < 30 ? 1 : 0;
        return ray ? SKY[Math.min(2, b + 1)] : SKY[b];
      }
      if (scene === 'Kelp Forest') {
        // green water, still kelp stalks with blades at the sides, and a dark bed
        if (py > 42 + Math.sin(px * 0.5) * 0.8) return SEA[((px * 0.7 + py * 1.3) % 4) < 0.8 ? 1 : 0];
        for (const k0 of [3.5, 10, 38.5, 45]) {
          const xc = k0 + Math.sin(py * 0.32 + k0) * 1.3, dx = px - xc;
          if (Math.abs(dx) < 0.85) return KELP[dx < -0.3 ? 2 : 1];
          const side = ((py + k0) / 5 | 0) % 2 ? 1 : -1, ph = (py + k0) % 5;
          if (ph < 1.6 && dx * side > 0 && dx * side < 3.2 - ph * 1.2) return KELP[ph < 0.7 ? 2 : 0];
        }
        if (((px - py * 0.3) % 11 + 11) % 11 < 1.1 && py < 26) return SKY[Math.min(2, (py < 13 ? 0 : 1) + 1)];
        return SKY[py < 13 ? 0 : py < 30 ? 1 : 2];
      }
      if (scene === 'Sandy Shallows') {
        // clear turquoise water over rippled sand, with slanting light and a starfish
        if (py > 36 + Math.sin(px * 0.3) * 1.2) {
          const sx = px - 7.5, sy = py - 44.5, a = Math.atan2(sy, sx), r = Math.hypot(sx, sy);
          if (r < 1.2 + 1.5 * Math.max(0, Math.cos(a * 5))) return FISHC[0];
          return SEA[((px * 0.45 + py * 1.6) % 3.4) < 0.7 ? 1 : 0];
        }
        const b = py < 12 ? 0 : py < 26 ? 1 : 2;
        return ((px - py * 0.4) % 10 + 10) % 10 < 1.3 && py < 32 ? SKY[Math.min(2, b + 1)] : SKY[b];
      }
      if (pal2 === 'Fish School') for (let k = 0; k < 5; k++) { const fx = MOV[k * 2], fy = MOV[k * 2 + 1]; const dx = px - fx, dy = py - fy; if (dx * dx / 2.4 + dy * dy / 0.5 < 1) return FISHC[dx > 0.4 ? 1 : 0]; }
      if (pal2 === 'Jellyfish') { const jx = MOV[10], jy = MOV[11]; const dx = px - jx, dy = py - jy; if (dy < 0 && dx * dx / 9 + dy * dy / 5 < 1) return JELLY[dx + dy < -1.5 ? 2 : 1]; if (dy >= 0 && dy < 6 && Math.abs(dx) < 2.6 && Math.abs(((dx + 2.6) % 1.3) - 0.65 + Math.sin(tt * 2 + dy * 0.7) * 0.3) < 0.18) return JELLY[0]; }
      if (scene === 'Deep Glow') { if (((px * 7.3 + py * 3.1) % 13) < 0.25 && ((tt * 0.8 + px * 0.3) % 2) < 1.2) return LURE[2]; if (py > 30) return SEA[0]; return SKY[py < 12 ? 0 : py < 24 ? 1 : 2]; }
      if (scene === 'Snowfall') for (let k = 0; k < 16; k++) { const fx = MOV[12 + k * 2], fy = MOV[13 + k * 2]; const dx = px - fx, dy = py - fy; if (dx * dx + dy * dy < 0.35) return WHITE; }
      if (scene === 'Starry Sea' && py < hz) for (const st2 of STROW[Math.floor(py * SS)]) { const dx = px - st2[0], dy = py - st2[1]; if (dx * dx + dy * dy < 0.18 + st2[2] * 0.2) return ((tt + st2[2] * 5) % 3) < 0.5 ? WHITE : ICE[0]; }
      if (scene === 'Starry Sea' && py >= hz && ((px + (py | 0) * 5) % 13) < 1 && ((tt * 1.3 + px) % 2) < 1) return ICE[1];
      if (py < hz) {
        let k = py < 9 ? 0 : py < 18 ? 1 : 2;
        if (scene === 'Aurora' && py < 8 && !AURM[(py | 0) * N + (px | 0)]) {
          // thin bands in the top rows only, stopping a few dots short of the narwhal, its flukes and its hat
          const w = AURW[Math.floor(px * SS)];
          if (py > w - 1 && py < w + 1.4) return AUR[py < w - 0.3 ? 2 : py < w + 0.6 ? 1 : 0];
        }
        if (scene === 'Iceberg') {
          const top = 12 + Math.abs(px - 38) * 1.1 + (px > 38 ? 2 : 0);
          if (py > top) return ICE[px < 38 + (py - 12) * 0.15 ? 0 : 1];
        }
        if (scene === 'Midnight Sun') { const dx = px - 10, dy = py - 21; if (dx * dx + dy * dy < 22) return SUNC; }
        if (scene === 'Dawn Pink') { const dx = px - 37, dy = py - 27, r2 = dx * dx + dy * dy; if (r2 < 26) return SUNC; if (r2 < 52) return SKY[2]; }
        if (scene === 'Polar Night') { const dx = px - 40, dy = py - 7; if (dx * dx + dy * dy < 9) return ICE[0]; }
        return SKY[k];
      }
      for (const f of floes) if (Math.abs(px - f[0]) < f[2] && py < f[1] + 1.6 && py >= hz) return ICE[py < f[1] + 0.8 ? 0 : 1];
      return SEA[((py - hz) / 3 | 0) % 2 === 0 && ((px + (py | 0) * 3) % 11 < 2) ? 1 : 0];
    }

    // the Ice Sculpture keeps every shape and accessory, but its hide becomes cut ice
    // the frame round the portrait: a porthole, frost in the corners, a rope, a snapshot's border or a gilt frame
    function frameAt(px, py) {
      if (frameKind === 'None') return null;
      const e = Math.min(px, py, N - px, N - py);
      if (frameKind === 'Porthole') { const r = Math.hypot(px - 24, py - 24); if (r > 24.2) return BRASS[0]; if (r > 22) { const a = Math.atan2(py - 24, px - 24); return r > 23.5 ? BRASS[1] : Math.abs(((a + Math.PI) / (Math.PI / 4)) % 1 - 0.5) < 0.09 ? BRASS[0] : BRASS[(px - py) > 0 ? 2 : 3]; } return null; }
      if (frameKind === 'Frosted Corners') { const c2 = Math.min(Math.hypot(px, py), Math.hypot(N - px, py), Math.hypot(px, N - py), Math.hypot(N - px, N - py)), w = 7 + Math.sin(Math.atan2(py - 24, px - 24) * 9) * 1.6; if (c2 < w - 2.2) return FROST[c2 < 3 ? 2 : 1]; if (c2 < w && ((px * 3 + py * 5) | 0) % 3 === 0) return FROST[0]; if (e < 0.8) return FROST[1]; return null; }
      if (frameKind === 'Rope') { if (e < 1.6) { const along = px < 1.6 || px > N - 1.6 ? py : px; return ROPE[((along + e * 1.2) % 2.4) < 1.2 ? 2 : (e < 0.6 ? 0 : 1)]; } return e < 2 ? ROPE[0] : null; }
      if (frameKind === 'Snapshot') { if (py > N - 4 || e < 1.8) return py > N - 4 && e >= 1.8 && py < N - 2.9 && px > 4 && px < 16 ? PAPERS : PAPER; if (e < 2.2 || (py > N - 4.4 && py <= N - 4)) return PAPERS; return null; }
      if (frameKind === 'Gilt Frame') { if (e < 2.6) return RING[e < 0.5 ? 0 : e < 1.2 ? 3 : e < 2 ? (((px + py) | 0) % 3 ? 2 : 4) : 1]; if (e < 3) return RING[0]; return null; }
      return null;
    }
    function sample(px, py) {
      const fr = frameAt(px, py);
      if (fr) return fr;
      const col = sample0(px, py);
      if (LEG !== 'Ice Sculpture') return col;
      const k = HIDE.indexOf(col);
      if (k < 0) return col;
      // a clear rim: bright where the light reaches the edge, dark ink on the shadow side
      if (rimD > -0.85) return rimLit ? WHITE : ICEINK;
      return iceAt(k, px, py);
    }
    // the ice is cut into flat facets: each catches the light at its own angle, every edge a bright line
    const CUTS = [];
    for (let k = 0; k < 11; k++) { const a = k * 2.399963, r = Math.sqrt((k + 0.5) / 11); CUTS.push([24 + Math.cos(a) * r * 17, 30 + Math.sin(a) * r * 17, ((k * 7) % 5) / 4, (k * 0.618) % 1]); }
    function iceAt(k, px, py) {
      const y = py - oy;
      if (k === 0) return ICEINK;
      // after a tap a prism of colour sweeps across the ice
      const lt = tt - legAt;
      if (lt < 1.2) { const band = -6 + lt / 1.2 * 60 - (y - 12) * 0.5; if (Math.abs(px - band) < 3.2) return PRISM[Math.max(0, Math.min(4, Math.floor((px - band + 3.2) / 1.3)))]; }
      let d1 = 1e9, d2 = 1e9, f = null;
      for (const q of CUTS) { const dx = px - q[0], dy = y - q[1], dd = dx * dx + dy * dy; if (dd < d1) { d2 = d1; d1 = dd; f = q; } else if (dd < d2) d2 = dd; }
      // the pointer's glint lights the facet under it
      let lift = 0;
      if (hov) { const dx = px - hov[0], dy = py - hov[1], r2 = dx * dx + dy * dy; if (r2 < 1.1) return WHITE; if (r2 < 60) lift = 1; }
      const glint = ((f[3] + tt * 0.22) % 1) < 0.07;
      const idx = Math.max(0, Math.min(3, Math.round(f[2] * 2.6 + (k - 2.5) * 0.8 - 0.3) + 1 + lift));
      if (Math.sqrt(d2) - Math.sqrt(d1) < 0.32) return idx >= 2 ? ICEM[1] : ICEM[4];
      // a hard specular streak across the upper left, as on polished ice
      const sp = (px - 24) * 0.7 + (y - 22) * 0.7;
      if (Math.abs(sp + 7) < 0.9 && y < 30 && k >= 2) return WHITE;
      return glint ? ICEM[4] : ICEM[idx];
    }
    // the flippers: a turned ellipse each, posed by the Flippers trait, held at the sides of the chest inside the frame
    const flipAt = (px, py, cx, cy, rx, ry, a) => {
      const dx = px - cx, dy = py - cy, ca = Math.cos(a), sa = Math.sin(a), u = (dx * ca + dy * sa) / rx, v = (-dx * sa + dy * ca) / ry;
      return [(Math.sqrt(u * u + v * v) - 1) * Math.min(rx, ry), u * ca - v * sa, u * sa + v * ca];
    };
    const FLP = { Resting: [[9.5, 41.5, 5.6, 2.2, -0.5], [38.5, 41.5, 5.6, 2.2, 0.5]], Waving: [[9.5, 41.5, 5.6, 2.2, -0.5], [39.5, 35.5, 5.6, 2.2, -0.95]], 'Both Up': [[8.5, 35.5, 5.6, 2.2, 0.95], [39.5, 35.5, 5.6, 2.2, -0.95]], Tucked: [[12.5, 42, 4.2, 2, -0.75], [35.5, 42, 4.2, 2, 0.75]], Paddling: [[9, 42.5, 5.6, 2.2, -0.25], [39, 42.5, 5.6, 2.2, 0.25]] }[flips];
    const FL = FLP[0], FR = FLP[1];
    let fbob = 0, fswL = 0, fswR = 0;
    // the tail flukes, raised behind one shoulder: a hint of the whale's back curving up behind the portrait
    const FCX = 24 + TS * (HRX - 4), FCY = 8.6;
    function tailAt(px, y) {
      for (const j of [-1, 1]) {
        const q = flipAt(px, y, FCX + j * 3, FCY - 0.2 - j * TS * 0.7, 3.4, 1.35, -j * 0.4 - TS * 0.22);
        if (q[0] < 0 && !(Math.abs(px - FCX) < 0.5 && y < FCY - 0.3)) {
          const lit = !(q[1] > -0.2 || q[2] > 0.3);
          rimD = q[0]; rimLit = lit;
          return HIDE[q[0] > -0.7 && !lit ? 0 : Math.max(1, shadeIdx(q[1] * 0.9, q[2] * 0.9) - 1)];
        }
      }
      const [ds] = seg(px, y, FCX, FCY + 0.6, 24 + TS * (HRX - 7), 22, 1.0, 2.8);
      if (ds < 0) { const lit = (px - FCX) * TS > 0.2; rimD = ds; rimLit = lit; return HIDE[ds > -0.6 && !lit ? 0 : lit ? 2 : 1]; }
      return null;
    }
    // the still layers are sampled with everything that moves left out (STILL); a moving flipper is then absent
    let STILL = false;
    const movL = flips === 'Both Up' || flips === 'Paddling', movR = movL || flips === 'Waving', NOFLIP = [1, 0, 0], BGS = [0, 0, 0];
    const bgMoves = !(scene === 'Floes' || scene === 'Polar Night' || scene === 'Iceberg' || scene === 'Midnight Sun' || scene === 'Dawn Pink' || scene === 'Kelp Forest' || scene === 'Sandy Shallows') || pal2 === 'Fish School' || pal2 === 'Jellyfish';
    // powers for the melon's squarer curve, from tables (t^2.4 and its root)
    const P24 = new Float32Array(4097), R24 = new Float32Array(4097);
    for (let i = 0; i <= 4096; i++) { P24[i] = Math.pow(i / 2048, 2.4); R24[i] = Math.pow(i * 6 / 4096, 1 / 2.4); }
    const p24 = t => { if (t >= 1.99) return Math.pow(t, 2.4); const f = t * 2048, i = f | 0; return P24[i] + (P24[i + 1] - P24[i]) * (f - i); };
    const r24 = u => { if (u >= 5.99) return Math.pow(u, 1 / 2.4); const f = u * 682.666, i = f | 0; return R24[i] + (R24[i + 1] - R24[i]) * (f - i); };
    // where the aurora must not reach: every dot within three of the narwhal (worked out once, below)
    const AURM = new Uint8Array(N * N);
    let bgHit = false;
    const NY = 1.5;   // the neckwear sits this much lower than it used to, under the new low mouth
    function sample0(px, py) {
      const y = py - oy;
      rimD = -9;
      // drops of the spout
      if (!STILL) for (const d of drops) { const dx = px - d.x, dy = py - d.y; if (dx * dx + dy * dy < d.r * d.r) return dx + dy < -d.r * 0.3 ? WHITE : ICE[0]; }
      // tusk(s), in front of everything: from the middle of the upper lip, forward and up
      if (!STILL) for (const [ax, s] of tuskDefs) {
        const ay = TY, [ex, ey] = tuskEnd(ax, s);
        const [d, t] = seg(px, y, ax, ay, ex, ey, TR0, tusk === 'Chipped' ? 0.9 : 0.25);
        if (ringed && ax === tuskDefs[0][0]) {
          // the coveted gold ring: a thick band round the tusk with a pearl hanging under it on a short chain, and every
          // few seconds (or when the tusk rings) a star glint; the band's shine runs round as it turns
          const L = Math.hypot(ex - ax, ey - ay), ux = (ex - ax) / L, uy = (ey - ay) / L, rr = TR0 + (0.25 - TR0) * RING_T;
          const qx = px - (ax + (ex - ax) * RING_T), qy = y - (ay + (ey - ay) * RING_T), along = qx * ux + qy * uy, across = qx * uy - qy * ux;
          if ((tt + 0.7) % 2.6 < 0.35 || tt - ringAt < 0.45) {
            const gx = Math.abs(qx), gy = Math.abs(qy);
            if (gx + gy < 1.3) return WHITE;
            if ((gx < 0.55 && gy < 3.4) || (gy < 0.55 && gx < 3.4)) return RING[4];
          }
          if (Math.abs(along) < 1.9 && Math.abs(across) < rr + 1.8) {
            const sh = (across / (rr + 1.8) + 1) / 2, spin = ((sh + tt * (tt - ringAt < 1.2 ? 2.5 : 0.35)) % 1 + 1) % 1;
            if (Math.abs(along) > 1.25 || Math.abs(across) > rr + 1.2) return RING[0];
            return RING[spin < 0.14 ? 4 : sh < 0.3 ? 3 : sh > 0.72 ? 1 : 2];
          }
          const py2 = qy - (rr + 3.9), p2 = qx * qx + py2 * py2;
          if (p2 < 2.3) return qx + py2 < -0.6 ? WHITE : PEARLC[1];
          if (p2 < 4.4) return RING[0];
          if (Math.abs(qx) < 0.5 && qy > 0 && qy < rr + 2.2) return RING[1];
        }
        if (tusk === 'Great Spiral') {
          // a star glint runs up the great horn every few seconds (and on a tap or under the pointer)
          const gp = (tt * 0.42) % 1.5, gt = hov || tt - ringAt < 1.2 ? 0.1 + ((tt * 0.6) % 1) * 0.45 : gp < 1 ? 0.1 + gp * 0.45 : -1;
          if (gt > 0) {
            const gx = Math.abs(px - (ax + (ex - ax) * gt)), gy = Math.abs(y - (ay + (ey - ay) * gt));
            if (gx + gy < 1.2) return WHITE;
            if ((gx < 0.42 && gy < 3) || (gy < 0.42 && gx < 3)) return d < 0 ? RING[4] : WHITE;
          }
        }
        if (d < 0) {
          const twist = ((t * 17 * tlen + (px - ax) * 0.25) % 1.6 + 1.6) % 1.6, shadow = (px - ax) * s > 0;
          // a tap sends a ring of light running up the tusk
          if (tt - ringAt < 0.9 && Math.abs(t - (tt - ringAt) / 0.8) < 0.07) return WHITE;
          // the Ice Sculpture's tusks are solid bright crystal with a dark edge on the shadow side
          if (LEG === 'Ice Sculpture') return d > -0.5 ? ICEINK : twist < 0.55 ? TUSK[2] : shadow ? TUSK[3] : WHITE;
          let k = twist < 0.55 ? 1 : 3;
          if (d > -0.55) k = shadow ? 0 : 4;
          // the Unicorn's great horn: deep grooves, and a slow sheen running up it (faster under the pointer)
          if (tusk === 'Great Spiral') { if (d > -0.5) return TUSK[0]; const sh = ((t * 3 - tt * (hov ? 0.9 : 0.25)) % 1 + 1) % 1; if (sh < 0.06) return WHITE; return twist < 0.45 ? TUSK[2] : shadow ? TUSK[3] : TUSK[4]; }
          if (tusk === 'Candy Stripe' && d <= -0.55 && twist < 0.55) return CANDY[shadow ? 1 : 2];
          if (tusk === 'Rainbow' && d <= -0.55 && twist < 0.8) return RAINB[((t * 6 + tt * 2) | 0) % 6];
          return TUSK[k];
        }
      }
      // headwear above the head
      if (hat === 'Bobble Hat') {
        const dPom = ell(px, y, 24, 6.5, 2.6, 2.6);
        if (dPom < 0) return HATR[shadeIdx((px - 24) / 2.6, (y - 6.5) / 2.6)];
        if (y < 14.5 && ell(px, y, 24, 15, 12, 7) < 0) return HATR[y > 12.5 ? 4 : shadeIdx((px - 24) / 12, (y - 15) / 7)];
      }
      if (hat === 'Captain') {
        if (y > 9 && y < 14 && Math.abs(px - 24) < 9 - (14 - y) * 0.25) return y < 11.5 ? HATR[4] : HATR[1];
        if (y >= 14 && y < 15.6 && Math.abs(px - 24) < 11) return HATR[0];
        if (Math.abs(px - 24) < 1.4 && y > 10.5 && y < 13) return GOLDC;
      }
      if (hat === 'Crown' || hat === 'Ice Crown') {
        if (y > 8 && y < 14.5 && Math.abs(px - 24) < 8) {
          const sp = ((px - 16) % 4 + 4) % 4, tip = 8 + Math.abs(sp - 2) * 1.6;
          if (y > tip || y > 11.5) return HATR[px < 22 ? 3 : px < 28 ? 2 : 1];
        }
      }
      if (hat === 'Figurehead Crown') {
        // a ship's figurehead crown, big and bright gold: five points with pearl tips over a jewelled band, a dark edge
        // all round; it glints under the pointer or after a tap
        const dx = px - 24, adx = Math.abs(dx);
        if (!STILL && (hov || tt - legAt < 0.8)) { const gx = Math.abs(px - 27.8), gy = Math.abs(y - 3.6), on = ((tt * 2.2) % 1) < 0.6 || tt - legAt < 0.8; if (on && (gx + gy < 0.9 || (gx < 0.4 && gy < 2.6) || (gy < 0.4 && gx < 2.6))) return WHITE; }
        for (let k = -2; k <= 2; k++) { const bx = 24 + k * 3.84, r2 = (px - bx) ** 2 + (y - 4.1) ** 2; if (r2 < 1.3) return r2 < 0.35 || px - bx + y - 4.1 < -0.5 ? WHITE : PEARLC[1]; }
        if (y > 4.4 && y < 14 && adx < 9.8) {
          const sp = ((dx + 9.6) % 3.84 + 3.84) % 3.84, tip = 4.4 + Math.abs(sp - 1.92) * 3.1;
          if (y > tip || y > 10.4) {
            if (adx > 9.1 || y > 13.3 || (y < 10.4 && y - tip < 0.7) || (y > 10.4 && y < 10.9)) return RING[0];
            if (y > 10.9) {
              if ((px - 24) ** 2 + (y - 12.1) ** 2 < 1.5) return RIBBON;
              for (const jx of [18.8, 29.2]) if ((px - jx) ** 2 + (y - 12.1) ** 2 < 0.9) return TEAR;
              return RING[y < 11.6 ? 4 : 2];
            }
            return RING[sp < 1.92 ? 4 : 3];
          }
        }
      }
      if (hat === 'Party Hat' && y > 2.5 && y < 13.5 && Math.abs(px - 24) < (y - 2.5) * 0.55) return HATR[((y + px * 0.3) / 2 | 0) % 2 ? 3 : px < 24 ? 2 : 1];
      if (hat === 'Party Hat' && (px - 24) ** 2 + (y - 2.2) ** 2 < 1.4) return HATR[4];
      if (hat === 'Flower') { const dx = px - 31, dy = y - 13; const r2 = dx * dx + dy * dy; if (r2 < 1.1) return HATR[3]; if (r2 < 7.5 && Math.cos(Math.atan2(dy, dx) * 5) > -0.2) return HATR[dx + dy < 0 ? 2 : 1]; }
      if (hat === 'Snow Cap') { const d3 = ell(px, y, 24, 12.6, 9.5, 2.8); if (d3 < 0) return HATR[y < 11.5 ? 4 : px > 28 ? 1 : 3]; }
      if (!STILL && hat === 'Lure') { const [d3] = seg(px, y, 24, 12.5, 28, 5, 0.42, 0.3); if (d3 < 0) return HATR[1]; const [d4] = seg(px, y, 28, 5, 31, 4.5, 0.32, 0.3); if (d4 < 0) return HATR[1]; const dx = px - 31.5, dy = y - 5.2, pulse = 0.55 + 0.25 * Math.sin(tt * 3); if (dx * dx + dy * dy < 2.4) return HATR[dx * dx + dy * dy < pulse ? 4 : 3]; if (dx * dx + dy * dy < 4.4 && pulse > 0.7) return HATR[2]; }
      if (!STILL && hat === 'Halo') { const d3 = ell(px, y, 24, 6.5 + Math.sin(tt * 1.2) * 0.4, 8, 1.8); if (Math.abs(d3) < 0.45) return HATR[y < 6.5 ? 3 : 2]; }
      if (!STILL && pal2 === 'Puffin') { const [ex0, ey0] = tuskEnd(tuskDefs[0][0], tuskDefs[0][1]), b0 = tuskDefs[0][0]; const tx = b0 + (ex0 - b0) * 0.72, ty = TY + (ey0 - TY) * 0.72; const bx = tx, by = ty - 2.4 + (((tt + 1) % 3.4) < 0.25 ? -0.8 : 0); const sd = tuskDefs[0][1], dx = px - bx, dy = y - by; if (dx * dx / 3.2 + dy * dy / 6.8 < 1) { if ((dx - 0.5 * sd) ** 2 + (dy + 1.1) ** 2 < 0.9 || (dy > 0.7 && dx * sd > -0.4)) return PUFF[1]; return PUFF[0]; } if ((px - bx - 2.1 * sd) ** 2 / 1.1 + (y - by + 1) ** 2 / 0.35 < 1) return PUFF[(px - bx) * sd > 2.3 ? 3 : 2]; if (y > by + 2.4 && y < by + 3.1 && Math.abs(dx) < 1.1) return PUFF[2]; }
      if (!STILL && pal2 === 'Bubbles') for (let k = 0; k < 6; k++) { const bx = 6 + k * 7.3 + Math.sin(tt + k) * 1.2, by = 46 - ((tt * 4 + k * 8.3) % 48); const dx = px - bx, dy = y - by, r2 = dx * dx + dy * dy, rr = 0.7 + (k % 3) * 0.35; if (r2 < rr * rr && r2 > (rr - 0.5) ** 2) return dx + dy < 0 ? WHITE : ICE[0]; }
      // the whale itself: a blunt melon of a head (a squarer curve than an egg) running down into the shoulders
      let hw, dHead;
      if (y < 27) {
        const ay = p24(Math.abs((y - 27) / 15)), ax = p24(Math.abs((px - 24) / HRX));
        hw = HRX * r24(Math.max(0, 1 - ay));
        dHead = (r24(ax + ay) - 1) * Math.min(HRX, 15);
      } else { hw = HRX + (y - 27) * 0.22; dHead = Math.abs(px - 24) - hw; }
      const fL = STILL && movL ? NOFLIP : flipAt(px, y, FL[0], FL[1] + fbob, FL[2], FL[3], FL[4] + fswL), fR = STILL && movR ? NOFLIP : flipAt(px, y, FR[0], FR[1] + fbob, FR[2], FR[3], FR[4] + fswR), dFlipL = fL[0], dFlipR = fR[0];
      const inHead = dHead < 0;
      // neckwear sits between
      const ny0 = y - NY;
      if (neck === 'Striped Scarf' && ny0 > 34.5 && ny0 < 38.5 && Math.abs(px - 24) < 17) return NECKR[(((px + ny0 * 0.6) / 2.5 | 0) % 2) ? 3 : 2];
      if (neck === 'Striped Scarf' && px > 29 && px < 33 && ny0 >= 38.5 && ny0 < 46) return NECKR[(ny0 / 2.5 | 0) % 2 ? 3 : 1];
      if (neck === 'Life Ring') { const d = ell(px, ny0, 24, 39, 15, 4.2); if (d < 0 && d > -2.6) return NECKR[((Math.atan2(ny0 - 39, px - 24) + 3.2) / 0.8 | 0) % 2 ? 2 : 3]; }
      if (!STILL && neck === 'Kelp' && ny0 > 35 && ny0 < 38.6 && Math.abs(px - 24) < HRX && Math.abs(((px * 0.9 + Math.sin(ny0 * 1.4 + tt) * 1.2) % 3) - 1.5) < 0.8) return NECKR[ny0 < 36.5 ? 3 : 2];
      if (!STILL && neck === 'Bell') { if (Math.abs(px - 24) < HRX - 1 && Math.abs(ny0 - 36) < 0.6) return NECKR[1]; const sw = Math.sin(tt * 2.4) * 0.5, dx = px - 24 - sw, dy = ny0 - 38.6; if (dy > -1.6 && dy < 1.4 && Math.abs(dx) < 1.2 + (dy + 1.6) * 0.35) return NECKR[dx < -0.3 && dy < 0 ? 4 : dy > 0.8 ? 1 : 3]; }
      if (neck === 'Shell Necklace') { for (let k = -3; k <= 3; k++) { const bx = 24 + k * 4, by = 37 + k * k * 0.12; const dx = px - bx, dy = ny0 - by; if (dy > -1.6 && dy < 1.3 && Math.abs(dx) < 1.8 - (dy + 1.6) * 0.32) return SHELL[(px * 1.6 | 0) % 2]; } if (Math.abs(ny0 - (36.6 + ((px - 24) / 4) ** 2 * 0.12)) < 0.25 && Math.abs(px - 24) < 13) return NECKR[1]; }
      if (neck === 'Bow Tie') { const dx = Math.abs(px - 24), dy = Math.abs(ny0 - 38); if (dx < 4.5 && dy < 0.6 + dx * 0.55) return NECKR[dx < 1.2 ? 1 : ny0 < 38 ? 3 : 2]; }
      if (neck === 'Pearls') { for (let k = -4; k <= 4; k++) { const bx = 24 + k * 3.1, by = 37.6 + (k * k) * 0.08; const dx = px - bx, dy = ny0 - by; if (dx * dx + dy * dy < 1.3) return NECKR[dx + dy < -0.4 ? 4 : 2]; } }
      if (neck === 'Medal') { if (Math.abs(px - 24) < 1.2 && ny0 > 36 && ny0 < 40) return RIBBON; const d = ell(px, ny0, 24, 41.5, 2.2, 2.2); if (d < 0) return NECKR[shadeIdx((px - 24) / 2.2, (ny0 - 41.5) / 2.2)]; }
      if (neck === 'Barnacles' && inHead) {
        // the old bull's collar of barnacles: four big grey cones round the neck, each with a pale lip round a dark mouth
        for (let k = 0; k < 4; k++) {
          const bx = 24 + (k - 1.5) * 5.4, by = 37.4 + (k - 1.5) ** 2 * 0.3, dx = px - bx, dy = ny0 - by, r2 = dx * dx + dy * dy;
          if (r2 < 5.3) return r2 < 0.8 ? BARN[0] : r2 < 1.7 ? BARN[3] : r2 > 3.9 ? BARN[dx + dy > 0 ? 0 : 1] : dx + dy < -0.6 ? BARN[3] : BARN[2];
        }
      }
      // the flippers, in front of the chest with a line all round where they cross it
      if (dFlipL < 0 || dFlipR < 0) {
        const q = dFlipL < 0 ? fL : fR, lit = !(q[1] > -0.2 || q[2] > 0.3);
        let k = Math.max(1, shadeIdx(q[1] * 0.9, q[2] * 0.9));
        if (q[0] > -0.75) k = !lit ? 0 : inHead ? 1 : k;
        rimD = q[0]; rimLit = lit;
        return HIDE[k];
      }
      if (inHead) {
        const nx = (px - 24) / Math.max(1, hw), ny = y < 27 ? (y - 27) / 15 : Math.min(0.55, (y - 27) / 26), d = dHead;
        let k = shadeIdx(nx * 0.9, ny * 0.9);
        // a pale belly and throat under the dark back
        const bel = y - 31.5 - Math.abs(px - FX) * 0.55;
        if (bel > 1) k = Math.min(4, Math.max(k + 1, 3)); else if (bel > 0) k = Math.min(4, k + 1);
        // the short snout under the melon: a front-lit bump with a dark lip line under it
        const snx = FX + tuskSide * 1.2, ds = ell(px, y, snx, 31.2, 5.4, 2.5);
        if (ds < 0) { k = Math.min(4, shadeIdx((px - snx) / 5.4 * 0.6, (y - 31.2) / 2.5 * 0.7) + 1); if (ds > -0.6 && y > 31.4) k = 1; }
        // selective outline: only where the light does not reach
        const lit = !(nx > -0.2 || ny > 0.3);
        if (d > -0.8 && !lit) k = 0;
        rimD = d; rimLit = lit;
        // markings, on whole dots so they stay crisp
        const cx = Math.floor(px) + 0.5, cy = crispY(py);
        if (marks === 'Speckled' || (marks === 'Starry' && !STILL)) {
          for (let si = 0; si < 8; si++) {
            const s = spots[si], sx = 24 + s[0] * 11, sy = 18.5 + s[1] * 4.5, dx = cx - sx, dy = cy - sy;
            if (dx * dx + dy * dy < (marks === 'Starry' ? 0.6 : 0.4 + s[2] * 0.5)) return marks === 'Starry' ? (((tt * 1.5 + s[2] * 7) % 3) < 0.4 ? WHITE : TUSK[3]) : HIDE[Math.max(0, k - 2)];
          }
        }
        if (marks === 'Freckled') for (let si = 0; si < 13; si++) { const s = spots[si]; if (Math.abs(s[0]) < 0.4) continue; const dx = cx - (FX + s[0] * 12), dy = cy - (31 + s[1] * 1.5); if (dx * dx + dy * dy < 0.3) return HIDE[Math.max(0, k - 2)]; }
        if (marks === 'Mottled') for (let si = 0; si < 9; si++) { const s2 = spots[si + 13], mx2 = 24 + s2[0] * 12, my2 = 18 + s2[1] * 5, r = 1 + s2[2] * 0.9; const dx = cx - mx2, dy = cy - my2, dx2 = cx - mx2 - r * 0.8, dy2 = cy - my2 + r * 0.5; if (dx * dx + dy * dy < r * r || dx2 * dx2 + dy2 * dy2 < r * r * 0.4) return HIDE[Math.max(0, Math.min(k, 3) - 2)]; }
        if (marks === 'Old Scars') for (let si = 0; si < 7; si++) { const s2 = spots[si], sx = 24 + s2[0] * 12, sy = 18 + s2[1] * 6, [dd] = seg(cx, cy, sx, sy, sx + 3.2 * (s2[0] > 0 ? -1 : 1), sy + 1.3, 0.36, 0.36); if (dd < 0) return HIDE[k >= 3 ? 1 : 0]; }
        if (marks === 'Cheek Dots') for (const ex of EXS) for (const [ox, oy2] of [[-1.2, -0.6], [1.2, -0.6], [0, 0.8]]) { const dx = cx - ex - ox, dy = cy - EY - 5 - oy2; if (dx * dx + dy * dy < 0.42) return HIDE[Math.max(0, k - 2)]; }
        if (marks === 'Moon Patch') { const d1 = (px - 24) ** 2 + (y - 18) ** 2, d2 = (px - 25.3) ** 2 + (y - 17.2) ** 2; if (d1 < 7.5 && d2 > 4.6) return TUSK[3]; }
        if (!STILL && hide === 'Pearl' && k >= 3 && ((px * 3 + y * 5 + (tt * 4 | 0)) % 17) < 1) return PEARLC[(px | 0) % 2];
        if (marks === 'Blushing') { for (const bx of EXS) { const dx = (px - bx) / 2.6, dy = (y - EY - 4.6) / 1.3; if (dx * dx + dy * dy < 1) return BLUSH[2]; } }
        // eyes, wide apart at the sides of the face
        if (!STILL) for (let ei = 0; ei < 2; ei++) {
          const ex = EXS[ei], esc = ESC[ei];
          if (eyes === 'Shades') {
            if (y > EY - 2 && y < EY + 1.6 && Math.abs(px - ex) < 3.6) return y < EY - 1 && px < ex ? HIDE[3] : INK;
            if (y > EY - 1.4 && y < EY - 0.4 && px > EXS[0] + 3 && px < EXS[1] - 3) return INK;
            continue;
          }
          if (eyes === 'Content' && blink < 0.5) { const dx = px - ex, arc = EY - Math.sqrt(Math.max(0, 2.6 - dx * dx)) * 0.9; if (Math.abs(dx) < 1.7 && Math.abs(y - arc) < 0.5) return INK; continue; }
          if (eyes === 'Hearts' && blink < 0.5) {
            // a real heart, bigger than a bead eye: two bumps and a point, bright pink, a dark edge and a white shine
            const hx2 = (px - ex) / esc, hy2 = (y - EY - 0.2) / esc, ax2 = Math.abs(hx2);
            const hd = Math.min(Math.hypot(ax2 - 1.15, hy2 + 0.55) - 1.4, Math.max(ax2 * 0.745 + (hy2 - 2.3) * 0.667, -0.55 - hy2));
            if (hd < 0) { const sh2 = (hx2 + 1.2) ** 2 + (hy2 + 0.9) ** 2; return sh2 < 0.36 ? WHITE : HEART[sh2 < 1.1 ? 2 : 1]; }
            if (hd < 0.62) return HEART[0];
            continue;
          }
          if (eyes === 'Teary' && Math.abs(px - ex - 0.9) < 0.45 && y > EY + 1.6 && y < EY + 2.6 + ((tt * 1.5) % 2.5)) return TEAR;
          if (eyes === 'Starry' && blink < 0.5) { const dx = px - ex - gazeX * 0.6, dy = y - EY - gazeY * 0.5; if (dx * dx + dy * dy < 4.2) { const sx2 = Math.abs(dx), sy2 = Math.abs(dy), tw = 0.3 + 0.12 * Math.sin(tt * 3 + ex); if (sx2 * sy2 < tw && sx2 + sy2 < 1.95) return sx2 + sy2 < 0.5 ? WHITE : GOLDC; return INK; } continue; }
          const big = (eyes === 'Wide' ? 2.6 : eyes === 'Sparkle' ? 2.2 : 1.7) * esc;
          const sq = eyes === 'Sleepy' ? 0.45 : 1;
          const ry = big * 1.2 * Math.max(0.12, sq * (1 - blink));
          const dx = px - ex - gazeX * 0.6, dy = y - EY - gazeY * 0.5;
          if (Math.abs(dx) < big && Math.abs(dy) < ry && (dx * dx) / (big * big) + (dy * dy) / (ry * ry) < 1) {
            if (blink < 0.5 && (eyes === 'Sparkle' || eyes === 'Wide') && dx < -big * 0.15 && dy < -ry * 0.1 && dx > -big * 0.85) return WHITE;
            if (blink < 0.5 && dx > big * 0.3 && dy > ry * 0.35 && LEG !== 'Ice Sculpture') return HIDE[2];
            return INK;
          }
          if (eyes === 'Monocle' && ei === (tuskSide > 0 ? 0 : 1)) { const d2 = Math.sqrt(dx * dx + dy * dy); if (d2 > 2.8 && d2 < 3.6) return TUSK[3]; if (px > ex + 2.5 && px < ex + 3.3 && y > EY + 3 && y < EY + 10) return TUSK[2]; }
          if (eyes === 'Sleepy' && Math.abs(dx) < big + 0.4 && dy > -0.6 && dy < 0.2 && blink < 0.5) return MC;
        }
        // the mouth, low under the snout: two dots deep, with a shape
        const mx = px - FX;
        if (mouth === 'Smile' || mouth === 'Toothy') { const yc = MY + 0.5 - mx * mx * 0.055; if (Math.abs(mx) < 4.4 && Math.abs(y - yc) < 0.72) return MC; if (mouth === 'Toothy' && mx > -0.6 && mx < 1.4 && y > yc + 0.6 && y < yc + 1.9) return WHITE; }
        else if (mouth === 'Grin') { const lo = MY + 0.3 + Math.max(0, 16 - mx * mx) * 0.11; if (Math.abs(mx) < 4.2 && y > MY - 0.5 && y < lo) return y > lo - 1 && Math.abs(mx) < 2 ? BLUSH[1] : MC; }
        else if (mouth === 'Ooh') { const r = Math.hypot(mx / 1.5, (y - MY - 0.6) / 1.8); if (r < 1) return r < 0.5 ? BLUSH[0] : MC; }
        else if (mouth === 'Smirk') { const sy = MY + 0.6 - (mx + 4) * 0.1 - Math.max(0, mx - 2) ** 2 * 0.2; if (mx > -4 && mx < 4.6 && Math.abs(y - sy) < 0.68) return MC; }
        else if (mouth === 'Flat') { if (Math.abs(mx) < 3.2 && Math.abs(y - MY) < 0.7) return MC; }
        else if (mouth === 'Whistle') {
          if (Math.hypot((mx - 1.3) / 1.1, (y - MY - 0.3) / 1.3) < 1) return MC;
          // the notes it whistles drift up and away, under the eye on the side the tusk is not
          if (!STILL) for (let k = 0; k < 2; k++) { const ph = (tt * 0.5 + k * 0.5) % 1, nx2 = FX + WS * (6 + ph * 12), ny2 = MY - ph * 4; if (Math.hypot(px - nx2, y - ny2) < 0.8 || (Math.abs(px - nx2 - 0.65) < 0.28 && y < ny2 && y > ny2 - 2.4)) return INK; }
        }
        if (hat === 'Earmuffs') {
          for (const bx of [24 - HRX + 1, 24 + HRX - 1]) { const dd = ell(px, y, bx, 20.5, 3, 3.4); if (dd < 0) return HATR[shadeIdx((px - bx) / 3, (y - 20.5) / 3.4)]; }
          const d2 = ell(px, y, 24, 20.5, HRX - 1, 11); if (d2 > -1.3 && d2 < 0 && y < 19.5) return HATR[1];
        }
        if (hat === 'Bow') { const dx = Math.abs(px - 32), dy = Math.abs(y - 14.5); if (dx < 5 && dy < 0.8 + dx * 0.5) return HATR[dx < 1.2 ? 1 : y < 14.5 ? 3 : 2]; }
        return HIDE[k];
      }
      if (hat === 'Earmuffs') { const d2 = ell(px, y, 24, 20.5, HRX - 1, 11); if (d2 > -1.3 && d2 < 0.3 && y < 19.5) return HATR[1]; }
      if (hat === 'Bow') { const dx = Math.abs(px - 32), dy = Math.abs(y - 14.5); if (dx < 5 && dy < 0.8 + dx * 0.5) return HATR[dx < 1.2 ? 1 : y < 14.5 ? 3 : 2]; }
      const tl = tailAt(px, y);
      if (tl) return tl;
      bgHit = true;
      return STILL && bgMoves ? BGS : background(px, py);
    }

    const off = document.createElement('canvas');
    off.width = off.height = N;
    const oc = off.getContext('2d');
    const img = oc.createImageData(N, N);
    // ---------- the still layers, cached ----------
    // The bob moves in quarter-dot steps, so each of its seven heights is sampled once (when first
    // reached) with everything that moves left out (STILL), the picture frame and a still scene
    // included. A frame then re-samples only the dots that something moving can reach this frame
    // (eyes, tusk, moving flippers, drops, twinkles...) and the scene where the scene itself moves;
    // every other dot comes straight from its height's cache. Legendaries re-sample every dot.
    const Q = SS * SS, NN = N * N, COLS = [];
    const cid = col => { let k = col.ci; if (k === undefined) { k = col.ci = COLS.length; COLS.push(col); } return k; };
    for (const col of PAL) cid(col);
    for (const rr of RAMPOF.values()) for (const col of rr) cid(col);
    const BG = 65535, ids = new Int32Array(Q), sI = new Int32Array(Q), sC = new Int32Array(Q), rampI = [];
    const rampOf = k => rampI[k] || (rampI[k] = RAMPOF.get(COLS[k]) || [COLS[k]]);
    // a dot from its sixteen samples: the dominant colour, or (only where an edge really splits the
    // dot) the closest in-between from the ramps of the colours that meet there
    const resolve = () => {
      let n = 0, r = 0, gg = 0, b = 0;
      for (let s = 0; s < Q; s++) {
        const k = ids[s], col = COLS[k];
        r += col[0]; gg += col[1]; b += col[2];
        let j = 0; while (j < n && sI[j] !== k) j++;
        if (j === n) { sI[n] = k; sC[n++] = 1; } else sC[j]++;
      }
      let dom = 0;
      for (let j = 1; j < n; j++) if (sC[j] > sC[dom]) dom = j;
      let p = COLS[sI[dom]];
      if (sC[dom] < Q * 0.72) {
        const ar = r / Q, ag = gg / Q, ab = b / Q;
        const dd = p2 => (p2[0] - ar) ** 2 * 0.3 + (p2[1] - ag) ** 2 * 0.59 + (p2[2] - ab) ** 2 * 0.11;
        let best = p, bd = dd(p) * 0.6;
        for (let j = 0; j < n; j++) for (const cand of rampOf(sI[j])) { const e = dd(cand); if (e < bd) { bd = e; best = cand; } }
        p = best;
      }
      return p;
    };
    const levels = new Map();
    const levelOf = () => {
      let lv = levels.get(oy);
      if (lv) return lv;
      lv = { sub: new Uint16Array(NN * Q), dot: new Int32Array(NN) };   // dot: a colour id, or -1 where the scene moves under it
      STILL = true;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const o = (y * N + x) * Q; let open = false;
        for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
          const px = x + (sx + 0.5) / SS, py = y + (sy + 0.5) / SS, col = frameAt(px, py) || sample0(px, py), s = sy * SS + sx;
          if (col === BGS) { open = true; lv.sub[o + s] = BG; } else lv.sub[o + s] = ids[s] = cid(col);
        }
        lv.dot[y * N + x] = open ? -1 : cid(resolve());
      }
      STILL = false;
      levels.set(oy, lv);
      return lv;
    };
    // which dots something moving can reach this frame (boxes and capsules a little wider than what they bound)
    const moving = new Uint8Array(NN);
    const box = (x0, y0, x1, y1) => {
      const i0 = Math.max(0, Math.floor(x0)), i1 = Math.min(N - 1, Math.floor(x1)), j0 = Math.max(0, Math.floor(y0)), j1 = Math.min(N - 1, Math.floor(y1));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) moving[j * N + i] = 1;
    };
    const capsule = (ax, ay, bx, by, r) => {
      const R = r + 0.75, i0 = Math.max(0, Math.floor(Math.min(ax, bx) - R)), i1 = Math.min(N - 1, Math.floor(Math.max(ax, bx) + R)), j0 = Math.max(0, Math.floor(Math.min(ay, by) - R)), j1 = Math.min(N - 1, Math.floor(Math.max(ay, by) + R));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (seg(i + 0.5, j + 0.5, ax, ay, bx, by, R, R)[0] < 0) moving[j * N + i] = 1;
    };
    function markMoving() {
      moving.fill(0);
      for (const d of drops) box(d.x - d.r, d.y - d.r, d.x + d.r, d.y + d.r);
      if (hat === 'Lure') box(23.4, 2.4 + oy, 34, 13 + oy);
      if (hat === 'Halo') box(13.9, 3.7 + oy, 34.1, 9.3 + oy);
      for (const [bx, s2] of tuskDefs) { const [ex2, ey2] = tuskEnd(bx, s2); capsule(bx, TY + oy, ex2, ey2 + oy, ringed || tusk === 'Great Spiral' ? 3.2 : TR0 + 0.2); }
      if (ringed) { const [cx0, cy0] = ringAtNow(); box(cx0 - 3.6, cy0 - 3.6 + oy, cx0 + 3.6, cy0 + 8 + oy); }
      if (pal2 === 'Puffin') { const [ex0, ey0] = tuskEnd(tuskDefs[0][0], tuskDefs[0][1]), b0 = tuskDefs[0][0], tx = b0 + (ex0 - b0) * 0.72, ty = TY + (ey0 - TY) * 0.72 + oy; box(tx - 3.6, ty - 6.4, tx + 3.6, ty + 1.2); }
      if (pal2 === 'Bubbles') for (let k = 0; k < 6; k++) { const bx = 6 + k * 7.3 + Math.sin(tt + k) * 1.2, by = 46 - ((tt * 4 + k * 8.3) % 48) + oy, rr = 0.7 + (k % 3) * 0.35; box(bx - rr, by - rr, bx + rr, by + rr); }
      if (neck === 'Kelp') box(24 - HRX, 35 + NY + oy, 24 + HRX, 38.6 + NY + oy);
      if (neck === 'Bell') box(24 - HRX, 35.4 + NY + oy, 24 + HRX, 40.2 + NY + oy);
      if (hat === 'Figurehead Crown') box(24.5, 0.5 + oy, 31.2, 6.8 + oy);
      for (const [F, mv] of [[FL, movL], [FR, movR]]) if (mv) { const r = Math.max(F[2], F[3]), cy = F[1] + fbob + oy; box(F[0] - r, cy - r, F[0] + r, cy + r); }
      if (marks === 'Starry') for (let si = 0; si < 9; si++) { const s = spots[si], sx = 24 + s[0] * 11, sy = 18.5 + s[1] * 4.5 + Math.round(oy); box(sx - 1.5, sy - 1.5, sx + 1.5, sy + 1.5); }
      if (hide === 'Pearl') box(0, 0, N, N);
      for (const ex of EXS) { const gx = ex + gazeX * 0.6; box(Math.min(ex - 3.7, gx - 4), EY - 4.6 + oy, Math.max(ex + 3.7, gx + 4), (eyes === 'Monocle' ? EY + 10.2 : EY + 6.2) + oy); }
      if (eyes === 'Shades') box(EXS[0] + 2.5, EY - 1.6 + oy, EXS[1] - 2.5, EY - 0.2 + oy);
      if (mouth === 'Whistle') box(Math.min(FX + WS * 5, FX + WS * 19.6), MY - 7.6 + oy, Math.max(FX + WS * 5, FX + WS * 19.6), MY + 1 + oy);
    }
    function render() {
      moveScene();
      const d = img.data, lv = LEG === 'Ice Sculpture' ? null : levelOf();
      if (lv) markMoving();
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const at = y * N + x, i = at * 4, still = lv && !moving[at];
        let p;
        if (still && lv.dot[at] >= 0) p = COLS[lv.dot[at]];
        else {
          const o = at * Q;
          for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
            const s = sy * SS + sx, px = x + (sx + 0.5) / SS, py = y + (sy + 0.5) / SS;
            if (still) { const k = lv.sub[o + s]; ids[s] = k !== BG ? k : cid(background(px, py)); }
            else ids[s] = cid(sample(px, py));
          }
          p = resolve();
        }
        d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2]; d[i + 3] = 255;
      }
      oc.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(off, 0, 0, S, S);
    }

    if (scene === 'Aurora') {
      const near = new Uint8Array(N * N);
      for (let y = 0; y < 12; y++) for (let x = 0; x < N; x++) for (const [sx, sy] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) { bgHit = false; sample0(x + sx, y + sy); if (!bgHit) near[y * N + x] = 1; }
      for (let y = 0; y < 12; y++) for (let x = 0; x < N; x++) if (near[y * N + x]) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const xx = x + i, yy = y + j; if (i * i + j * j <= 10 && xx >= 0 && xx < N && yy >= 0 && yy < N) AURM[yy * N + xx] = 1; }
    }
    // ================= the legendaries: each one a picture of its own =================
    // (only a legendary print ever comes here; everything above draws the collection's narwhals.) Both are drawn on
    // the same 48-dot grid with the same hand-antialiasing: sixteen samples a dot, resolved through the ramps. Most
    // samples are worked out once (a still layer); a frame redoes only what light and motion change, and a dot is
    // resolved again only when one of its samples changed. A tusk on the left mirrors the picture; the Frame trait
    // still frames it.
    const legendFrame = LEG ? (() => {
      const SSN = N * SS, NS = SSN * SSN, MIRX = tuskSide < 0;
      const reg = rr => { for (const col of rr) { if (!RAMPOF.has(col)) RAMPOF.set(col, rr); cid(col); } return rr; };
      const H = a => reg(ramp(a));
      const FRM = new Int32Array(NS).fill(-1);
      for (let sy = 0; sy < SSN; sy++) for (let sx = 0; sx < SSN; sx++) { const f = frameAt((sx + 0.5) / SS, (sy + 0.5) / SS); if (f) FRM[sy * SSN + sx] = cid(f); }
      const prev = new Int32Array(NS).fill(-1), dotc = new Array(NN).fill(null);
      const sstep = (a, b, v) => { const u = Math.max(0, Math.min(1, (v - a) / (b - a))); return u * u * (3 - 2 * u); };
      // paint every dot: kOf(si, X, py) gives a sample's colour id (X already mirrored)
      const paint = kOf => {
        const d = img.data;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          let same = true;
          for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
            const s = sy * SS + sx, si = (y * SS + sy) * SSN + x * SS + sx, px = x + (sx + 0.5) / SS;
            const k = FRM[si] >= 0 ? FRM[si] : kOf(si, MIRX ? N - px : px, y + (sy + 0.5) / SS);
            ids[s] = k; if (prev[si] !== k) { prev[si] = k; same = false; }
          }
          const at = y * N + x;
          if (!same || !dotc[at]) dotc[at] = resolve();
          const p = dotc[at], i = at * 4;
          d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2]; d[i + 3] = 255;
        }
        oc.putImageData(img, 0, 0);
        g.imageSmoothingEnabled = false;
        g.drawImage(off, 0, 0, S, S);
      };
      // a cubic spine and its tube: nearest point, its parameter and the radius there
      const spineOf = (P, rOf, n) => {
        const pts = [];
        for (let i = 0; i <= n; i++) { const s = i / n, u = 1 - s; pts.push([u * u * u * P[0][0] + 3 * u * u * s * P[1][0] + 3 * u * s * s * P[2][0] + s * s * s * P[3][0], u * u * u * P[0][1] + 3 * u * u * s * P[1][1] + 3 * u * s * s * P[2][1] + s * s * s * P[3][1], rOf(s), s]); }
        return pts;
      };
      const tube = (pts, x, y) => {
        let best = 1e9, bs = 0, bx = 0, by = 0, br = 1;
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i], b = pts[i + 1], vx = b[0] - a[0], vy = b[1] - a[1], l2 = vx * vx + vy * vy;
          const u = Math.max(0, Math.min(1, ((x - a[0]) * vx + (y - a[1]) * vy) / l2)), cx = a[0] + vx * u, cy = a[1] + vy * u, r = a[2] + (b[2] - a[2]) * u;
          const dd = Math.hypot(x - cx, y - cy) - r;
          if (dd < best) { best = dd; bs = a[3] + (b[3] - a[3]) * u; bx = cx; by = cy; br = r; }
        }
        return [best, bs, bx, by, br];
      };
      const atS = (pts, s) => { const f = s * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), u = f - i, a = pts[i], b = pts[i + 1]; return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, b[0] - a[0], b[1] - a[1]]; };
      let legAt2 = -9, wasIn2 = false;
      const hoverAt = () => c.input.inside ? [MIRX ? N - c.input.x * N : c.input.x * N, c.input.y * N] : null;

      // a short, still release is a tap (so a hold or a drag never also fires the tap's action)
      const PRS = { at: -9, x: 0, y: 0, moved: 0, was: false };
      const shortTap = (inp, t) => {
        inp.taps();
        let up = false;
        if (inp.down && !PRS.was) { PRS.at = t; PRS.x = inp.x * N; PRS.y = inp.y * N; PRS.moved = 0; }
        if (inp.down) PRS.moved = Math.max(PRS.moved, Math.hypot(inp.x * N - PRS.x, inp.y * N - PRS.y));
        if (!inp.down && PRS.was) up = t - PRS.at < 0.3 && PRS.moved < 1.5;
        PRS.was = inp.down;
        return up;
      };
      if (LEG === 'Ice Sculpture') {
        // ---- Ice Sculpture: an isometric diorama in a cold palette. A slab of sea ice floats in the polar dark, its
        // top laid in iso tiles, its sides banded with the strata of old ice and hung with icicles; out of a hole in it
        // leaps the narwhal, carved from clear ice in flat cut facets with a crystal tusk, the dark water in the hole
        // rippling. Your pointer is a lamp: the facets turn to it, the beam crosses the dark and its shadow falls on the
        // ice; hold to warm it (it drips into the hole, the tusk melts back), let go and it freezes with a crackle of
        // frost; a quick tap sends a prism through it. Drawn on its own grid, 96 dots across, in nine shades of ice.
        // Its traits, in the diorama's way: the sky round it (Scene), its eyes, mouth, flippers, headwear, neckwear and
        // build carved in the ice, its tusk(s) and the side they point (Tusk, Tusk Side), the companion on the ice
        // (Companion), the frame round the scene (Frame).
        const G = 96, cv = document.createElement('canvas'); cv.width = cv.height = G;
        const cx2 = cv.getContext('2d'), im = cx2.createImageData(G, G), px = new Uint8Array(G * G);
        // 0 void .. 8 white; 9-13 prism; 14 water dark, 15 water; 16 accent red, 17 accent gold, 18 aurora green, 19 sun
        const PAL = ['#03060f', '#081430', '#0e2450', '#183a74', '#245a9c', '#3f86c4', '#78b8e4', '#bfe4f8', '#ffffff',
          '#ff6a8a', '#ffc85a', '#8af08a', '#5ac8ff', '#b08aff', '#02101e', '#0a3050', '#e0405a', '#f0c050', '#3ae0a0', '#ffb0a0'].map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
        const MX = tuskSide < 0;                      // the tusk to the left: the whole diorama mirrored
        const BK = build === 'Chubby' ? 1.18 : build === 'Slim' ? 0.84 : 1;
        // the slab: an iso diamond, top at (48, 66), 36 across, 18 high, 11 thick
        const SX0 = 48, SY0 = 68, HW = 36, HH = 18, TH = 11;
        const onTop = (x, y) => Math.abs(x - SX0) / HW + Math.abs(y - SY0) / HH <= 1;
        const HOLE = [44, 68, 9, 4.5];               // the hole the narwhal leaps from
        // the narwhal's spine: a curve from its tail in the hole up and over to its head, the tusk beyond
        const P0 = [40, 70], P1 = [38, 24], P2 = [70, 24];
        const spine = [];
        for (let k = 0; k <= 60; k++) { const s = k / 60, a = (1 - s) ** 2, b = 2 * s * (1 - s), cc = s * s; spine.push([P0[0] * a + P1[0] * b + P2[0] * cc, P0[1] * a + P1[1] * b + P2[1] * cc, s]); }
        const rad = s => (1.4 + 9.2 * Math.sin(Math.min(1, s * 1.25) * Math.PI * 0.55) - (s > 0.85 ? (s - 0.85) * 18 : 0)) * BK;
        const HEAD = spine[60], hdir = Math.atan2(spine[60][1] - spine[55][1], spine[60][0] - spine[55][0]);
        const TB = [HEAD[0] + Math.cos(hdir) * 5.5, HEAD[1] + Math.sin(hdir) * 5.5 + 1], TE = [92, 4], TE2 = [86, 2];
        // per dot of the body: the spine param, the signed offset across it (-1 top .. 1 belly), its facet
        const BODY = new Int8Array(G * G).fill(-1), BS = new Float32Array(G * G), BV = new Float32Array(G * G), BF = new Uint8Array(G * G), TUSKM = new Float32Array(G * G).fill(-1);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          let best = 1e9, bs = 0, bv = 0;
          for (let k = 0; k <= 60; k += 1) { const [sx, sy, s] = spine[k], d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy) / rad(s); if (d < best) { best = d; bs = s; const k2 = Math.min(60, k + 1), k1 = Math.max(0, k - 1), tx = spine[k2][0] - spine[k1][0], ty = spine[k2][1] - spine[k1][1], nl = Math.hypot(tx, ty) || 1; bv = ((x + 0.5 - sx) * ty / nl - (y + 0.5 - sy) * tx / nl) / rad(s) * -1; } }
          // the flukes, spread at the tail (low in the hole: only their tips show above the water)
          const fk = Math.min(Math.hypot((x - 36) / 6, (y - 66) / 2.2), Math.hypot((x - 48) / 6, (y - 66.5) / 2.2));
          if (best <= 1) { const i = y * G + x; BODY[i] = 1; BS[i] = bs; BV[i] = bv; BF[i] = (Math.floor(bs * 6 + (bv > 0 ? 0.5 : 0)) * 5 + (bv > 0.1 ? 1 : 0) * 3) % 11; }
          else if (fk <= 1 && y < 67) { const i = y * G + x; BODY[i] = 2; BS[i] = 0; BV[i] = -0.5; BF[i] = 3; }
          // the tusk(s): a crystal spiral to the corner (two, a little apart, if it has twin tusks)
          for (const E of tusk === 'Twin' ? [TE, TE2] : [TE]) {
            const B = E === TE2 ? [TB[0] - 1, TB[1] - 2] : TB, vx = E[0] - B[0], vy = E[1] - B[1], l2 = vx * vx + vy * vy, u = Math.max(0, Math.min(1, ((x - B[0]) * vx + (y - B[1]) * vy) / l2)), d = Math.hypot(x - B[0] - vx * u, y - B[1] - vy * u);
            if (d < 1.9 * (1 - u) + 0.4 && TUSKM[y * G + x] < 0) TUSKM[y * G + x] = u;
          }
        }
        // the flippers (Flippers): resting, waving, both up, tucked, paddling
        const FL = { Resting: [[0.62, 0.9, 0.6]], Waving: [[0.62, 0.9, -0.9]], 'Both Up': [[0.6, 0.9, -0.7], [0.55, -0.9, -0.8]], Tucked: [[0.62, 0.7, 0.2]], Paddling: [[0.62, 0.95, 0.9], [0.5, 0.95, 0.4]] }[flips] || [];
        for (const [s0, side, ang] of FL) {
          const [sx, sy] = spine[Math.round(s0 * 60)], r = rad(s0), n0 = Math.atan2(spine[Math.round(s0 * 60) + 1][1] - sy, spine[Math.round(s0 * 60) + 1][0] - sx) + Math.PI / 2 * side;
          const bx = sx + Math.cos(n0) * r * 0.8, by = sy + Math.sin(n0) * r * 0.8, a = n0 + ang;
          for (let y = Math.floor(by - 7); y <= by + 7; y++) for (let x = Math.floor(bx - 7); x <= bx + 7; x++) {
            if (x < 0 || y < 0 || x >= G || y >= G) continue;
            const dx = x - bx, dy = y - by, u = dx * Math.cos(a) + dy * Math.sin(a), v = -dx * Math.sin(a) + dy * Math.cos(a);
            if (u > 0 && u < 7 && Math.abs(v) < 2.2 * (1 - u / 8)) { const i = y * G + x; if (BODY[i] < 0) { BODY[i] = 3; BS[i] = s0; BV[i] = v / 2.5; BF[i] = 7; } }
          }
        }
        const lt0 = { x: 20, y: -6 };
        let warm = 0, melt = 0, pool = 0, frzAt = -9, prismAt = -9, wasD = false, dAt = -9, dX = 0, dY = 0, dMv = 0, lmx = 20, lmy = -6, lastT = 0;
        const rnd = (x, y, s) => { let h = Math.imul(x * 73856093 ^ y * 19349663 ^ s * 83492791, 0x9e3779b1) >>> 0; h ^= h >>> 15; return (h >>> 0) % 1000 / 1000; };
        const snow = Array.from({ length: 40 }, (_, k) => [rnd(k, 1, 7) * G, rnd(k, 2, 7) * G, 0.4 + rnd(k, 3, 7) * 0.8]);
        const stars = Array.from({ length: 30 }, (_, k) => [Math.floor(rnd(k, 4, 9) * G), Math.floor(rnd(k, 5, 9) * 50)]);
        // frost in a corner (24 by 24): fern-like crystals growing out along three branches, twigs off them
        const FROST = new Uint8Array(24 * 24);
        for (const [a, len] of [[0.25, 20], [0.785, 22], [1.32, 20]]) for (let r = 0; r < len; r++) {
          const x = Math.round(Math.cos(a) * r), y = Math.round(Math.sin(a) * r); if (x < 24 && y < 24) FROST[y * 24 + x] = r < 8 ? 8 : 7;
          if (r % 3 === 1 && r < len - 2) for (const s of [-1, 1]) for (let k = 1; k <= Math.max(1, 4 - r / 6); k++) { const tx = Math.round(Math.cos(a) * r + Math.cos(a + s * 0.8) * k), ty = Math.round(Math.sin(a) * r + Math.sin(a + s * 0.8) * k); if (tx >= 0 && ty >= 0 && tx < 24 && ty < 24) FROST[ty * 24 + tx] = 7; }
        }
        for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) FROST[y * 24 + x] = 8;
        return t => {
          const inp = c.input, dt = Math.min(0.1, Math.max(0, t - lastT)); lastT = t;
          tt = t;
          if (inp.inside && !wasIn2) c.sound.note(96, { dur: 0.5, vel: 0.05, wave: 'sine' });
          wasIn2 = inp.inside;
          inp.taps();
          // the lamp: the pointer (the diorama's own x, mirrored with it), or a slow drift in the dark above
          const ix = inp.inside ? (MX ? 1 - inp.x : inp.x) * G : 20 + Math.sin(t * 0.3) * 14, iy = inp.inside ? inp.y * G : 4 + Math.sin(t * 0.43) * 4;
          lmx += (ix - lmx) * 0.35; lmy += (iy - lmy) * 0.35;
          // a press: a quick still one is a tap (the prism); held, it warms the ice
          if (inp.down && !wasD) { dAt = t; dX = inp.x; dY = inp.y; dMv = 0; }
          if (inp.down) dMv = Math.max(dMv, Math.hypot(inp.x - dX, inp.y - dY) * G);
          if (!inp.down && wasD) {
            if (t - dAt < 0.3 && dMv < 2) { prismAt = t; [84, 88, 91, 95, 98].forEach((m, i) => c.sound.note(m, { dur: 1.1 - i * 0.12, vel: 0.08, wave: 'sine', at: i * 0.06 })); }
            else if (warm > 0.2) { frzAt = t; for (let k = 0; k < 7; k++) c.sound.hit('noise', 0.05 + (k % 3) * 0.02, { cutoff: 5000 + k * 600, dur: 0.03, at: k * 0.07 }); [91, 96, 103].forEach((m, i) => c.sound.note(m, { dur: 0.5, vel: 0.04, wave: 'sine', at: 0.3 + i * 0.1 })); }
          }
          wasD = inp.down;
          const hold = inp.down && t - dAt > 0.3;
          warm = Math.max(0, Math.min(1, warm + dt * (hold ? 0.9 : -0.6)));
          melt = Math.max(0, Math.min(1, melt + dt * (hold ? 0.7 * warm : -0.04)));
          pool = Math.max(0, Math.min(7, pool + dt * (hold ? warm * 1.6 : -0.15)));
          if (warm > 0.2 && Math.floor(t * 4) !== Math.floor((t - dt) * 4)) c.sound.note(98 - Math.floor(t * 4) % 5, { dur: 0.08, vel: 0.04, wave: 'sine' });
          const frz = t - frzAt < 1.4 ? 1 - (t - frzAt) / 1.4 : 0, pt = t - prismAt;
          // ---- the sky (Scene)
          for (let y = 0; y < G; y++) { const band = y < 20 ? 1 : y < 44 ? (y % 2 && y > 40 ? 2 : 1) : 2; for (let x = 0; x < G; x++) px[y * G + x] = scene === 'Midnight Sun' || scene === 'Dawn Pink' ? (y < 30 ? 2 : 3) : band === 1 && y < 10 ? 0 : band; }
          if (scene === 'Polar Night' || scene === 'Starry Sea' || scene === 'Aurora' || scene === 'Deep Glow') for (const [sx, sy] of stars) px[sy * G + sx] = ((t * 2 + sx) % 5) < 0.6 ? 8 : 6;
          if (scene === 'Aurora') for (let x = 0; x < G; x++) { const top = 8 + Math.sin(x * 0.11 + t * 0.6) * 4 + Math.sin(x * 0.05 - t * 0.3) * 3; for (let y = Math.floor(top); y < top + 14; y++) if ((x + y + Math.floor(t * 6)) % 3 === 0 || y - top < 3) px[y * G + x] = y - top < 3 ? 18 : 11; }
          if (scene === 'Midnight Sun' || scene === 'Dawn Pink') for (let y = 18; y < 42; y++) for (let x = 0; x < G; x++) { const r = Math.hypot(x - 22, y - 40); if (r < 14) px[y * G + x] = r < 12 ? 19 : 17; else if (r < 18 && (x + y) % 2) px[y * G + x] = 4; }
          if (scene === 'Iceberg') for (let x = 0; x < G; x++) { const h = 50 - Math.max(0, 12 - Math.abs(x - 78) * 0.9) - Math.max(0, 7 - Math.abs(x - 14) * 0.8); for (let y = Math.round(h); y < 52; y++) px[y * G + x] = x < 78 && x > 64 ? 4 : 3; }
          if (scene === 'Under Ice') for (let x = 0; x < G; x++) { const d = 4 + (x * 7) % 5 + ((x % 9) === 0 ? 6 : 0); for (let y = 0; y < d; y++) px[y * G + x] = y === d - 1 ? 7 : 5; }
          if (scene === 'Kelp Forest') for (const kx of [8, 16, 80, 88]) for (let y = 30; y < 62; y++) { const x = Math.round(kx + Math.sin(y * 0.3 + t + kx) * 1.5); px[y * G + x] = 4; if (y % 5 === 0) px[y * G + x + 1] = 5; }
          if (scene === 'Sandy Shallows') for (let y = 52; y < 62; y++) for (let x = 0; x < G; x++) if ((x + y * 3) % 7 === 0) px[y * G + x] = 3;
          if (scene === 'Deep Glow') for (let k = 0; k < 6; k++) { const gx = 10 + k * 15, gy = 40 + Math.sin(t + k) * 6; px[Math.round(gy) * G + gx] = 12; }
          // the lamp's beam across the dark, toward the sculpture
          let ax = 52 - lmx, ay = 40 - lmy; const al = Math.hypot(ax, ay) || 1; ax /= al; ay /= al;
          const beam = (x, y) => { const vx = x - lmx, vy = y - lmy, along = vx * ax + vy * ay; if (along < 0) return 0; const perp = Math.abs(vx * ay - vy * ax), w = 1 + along * 0.3; return perp < w * 0.5 ? 2 : perp < w ? 1 : 0; };
          for (let y = 0; y < 62; y++) for (let x = 0; x < G; x++) { const b = beam(x, y); if (b && px[y * G + x] < 4) px[y * G + x] = Math.min(4, px[y * G + x] + b); }   // (flat steps of light, no dither)
          // ---- the slab: its two sides (strata, icicles), its tiled top, the hole with the dark water
          for (let y = 40; y < G; y++) for (let x = 0; x < G; x++) {
            const i = y * G + x, dx = x - SX0;
            if (onTop(x, y)) {
              const u = (dx / HW + (y - SY0) / HH), v = (-dx / HW + (y - SY0) / HH);   // iso tile coordinates
              // two flat tones (the far half catching more light), a crisp bright edge along the near sides
              const edgeN = Math.abs(dx) / HW + Math.abs(y - SY0) / HH > 0.93 && y > SY0 - 2, edgeF = Math.abs(dx) / HW + Math.abs(y - SY0) / HH > 0.93;
              px[i] = edgeN || edgeF ? 8 : y < SY0 - Math.abs(dx) * 0.1 ? 7 : 6;
              // the melt water pooling round the hole
              if (pool > 0.5 && ((x - HOLE[0]) / (HOLE[2] + pool * 1.6)) ** 2 + ((y - HOLE[1]) / (HOLE[3] + pool * 0.8)) ** 2 <= 1) px[i] = 5;
              if (((x - HOLE[0]) / HOLE[2]) ** 2 + ((y - HOLE[1]) / HOLE[3]) ** 2 <= 1) { const r = ((x - HOLE[0]) / HOLE[2]) ** 2 + ((y - HOLE[1]) / HOLE[3]) ** 2; px[i] = r > 0.75 ? 5 : ((x + Math.floor(t * 3)) % 7 === 0 && r > 0.3) ? 15 : 14; }
              continue;
            }
            // the sides below the top's front edges
            const edgeY = SY0 + HH - Math.abs(dx) * HH / HW;
            if (Math.abs(dx) <= HW && y > edgeY && y <= edgeY + TH) {
              const depth = y - edgeY, strata = (Math.floor(depth + Math.sin(x * 0.4) * 0.8) % 3 === 0);
              px[i] = dx < 0 ? (strata ? 5 : 4) : (strata ? 4 : 3);
              if (Math.abs(dx) < 0.6) px[i] = 6;
            }
            // icicles under the sides
            if (Math.abs(dx) <= HW - 2 && y > edgeY + TH && y < edgeY + TH + 1 + ((x * 7) % 5) * ((x % 3) ? 1 : 0)) px[i] = dx < 0 ? 5 : 4;
          }
          // the lamp's shadow of the narwhal on the ice
          const shx = -ax * 8, shy = -ay * 4;
          for (let y = 50; y < 86; y++) for (let x = 0; x < G; x++) { if (!onTop(x, y)) continue; const sx = Math.round(x - shx * 0.3 - (40 - y) * ax * 0.6), sy = Math.round(y - 30 + (y - 50) * -0.2); if (sx >= 0 && sy >= 0 && sx < G && sy < G && BODY[sy * G + sx] > 0 && px[y * G + x] === 7) px[y * G + x] = 6; }
          // ---- the narwhal: flat facets, each turned its own way, lit as they face the lamp; a dark ice edge, a white rim
          const Lx = (lmx - 52) / 60, Ly = (lmy - 40) / 60, Ll = Math.hypot(Lx, Ly, 0.7);
          const tcut = 1 - melt * 0.75;
          for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
            const i = y * G + x, b = BODY[i];
            if (b < 0) {
              const tu = TUSKM[i];
              if (tu >= 0 && tu <= tcut) px[i] = pt < 1.2 && Math.abs(tu - pt) < 0.08 ? 8 : tu > tcut - 0.05 ? 8 : (Math.floor(tu * 24 + (x + y) * 0.25) % 3 === 0 ? 6 : 7);
              continue;
            }
            const v = BV[i], s = BS[i], f = BF[i];
            // the edge of the ice: dark on the shadow side, a white rim where the lamp reaches
            const edge = BODY[i - 1] < 0 || BODY[i + 1] < 0 || BODY[i - G] < 0 || BODY[i + G] < 0;
            const nx = Math.sin(f * 2.1) * 0.45 + (b === 1 ? 0 : 0), ny = -v * 0.8 + Math.cos(f * 1.7) * 0.3;
            const lam = (nx * Lx + ny * Ly + 0.7 * 0.7) / Ll;
            if (edge) { px[i] = frz || (ny * Ly + nx * Lx) > 0.05 ? 8 : 2; continue; }
            let k = Math.round(2.4 + lam * 4.6 + warm * 0.6);
            if (beam(x, y) === 2) k++;
            if (frz && rnd(x, y, Math.floor(t * 14)) < 0.08) k = 8;
            // a slow shine crossing the carving now and then
            if (Math.abs(x * 0.7 - y * 0.7 - (((t * 18) % 160) - 60)) < 1.2) k += 2;
            px[i] = Math.max(3, Math.min(8, k));
            // its facets' cut lines
            const fr2 = BF[i + 1], fd = BF[i + G];
            if ((BODY[i + 1] > 0 && fr2 !== f) || (BODY[i + G] > 0 && fd !== f)) px[i] = k >= 6 ? 5 : 7;
          }
          // its face and what it wears: eye (Eyes), mouth (Mouth), headwear, neckwear
          const ex = Math.round(HEAD[0] + 1), ey = Math.round(HEAD[1] - 1);
          const P = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < G && y < G) px[y * G + x] = k; };
          const EY = {
            Wide: () => { P(ex, ey, 1); P(ex + 1, ey, 1); P(ex, ey + 1, 1); P(ex + 1, ey + 1, 1); P(ex, ey, 8); },
            Shades: () => { for (let x = -2; x <= 3; x++) P(ex + x, ey, 1); P(ex - 3, ey - 1, 1); },
            Monocle: () => { for (let a = 0; a < 10; a++) P(ex + Math.cos(a * 0.63) * 2, ey + Math.sin(a * 0.63) * 2, 17); P(ex, ey, 1); },
            Teary: () => { P(ex, ey, 1); P(ex + 1, ey, 1); P(ex, ey + 2, 12); P(ex, ey + 3, 12); },
            Hearts: () => { P(ex - 1, ey, 16); P(ex + 1, ey, 16); P(ex, ey + 1, 16); P(ex, ey, 16); },
            Starry: () => { P(ex, ey, 17); P(ex - 1, ey, 17); P(ex + 1, ey, 17); P(ex, ey - 1, 17); P(ex, ey + 1, 17); },
            Sparkle: () => { P(ex, ey, 1); P(ex + 1, ey, 1); P(ex, ey + 1, 1); P(ex + 1, ey + 1, 1); P(ex + 1, ey, 8); P(ex + 3, ey - 2, 8); },
          }[eyes] || (() => { P(ex, ey, 1); P(ex + 1, ey, 1); P(ex, ey + 1, 1); P(ex + 1, ey + 1, 1); });
          EY();
          const mx = ex + 3, my = ey + 4;
          if (mouth === 'Ooh' || mouth === 'Whistle') { P(mx, my, 1); P(mx + 1, my, 1); if (mouth === 'Whistle') { P(mx + 3, my - 2, 7); P(mx + 4, my - 3, 7); } }
          else for (let k = -2; k <= 1; k++) P(mx + k, my + (mouth === 'Smile' || mouth === 'Grin' || mouth === 'Toothy' ? (Math.abs(k + 0.5) > 1 ? -1 : 0) : mouth === 'Smirk' ? (k > 0 ? -1 : 0) : 0), 2);
          if (mouth === 'Toothy' || mouth === 'Grin') P(mx, my + 1, 8);
          const hx = Math.round(HEAD[0] - 3), hy = Math.round(HEAD[1] - rad(0.93) + 1);
          const HT = {
            'Bobble Hat': () => { for (let y = 0; y < 4; y++) for (let x = -3; x <= 3; x++) P(hx + x, hy - y, y === 0 ? 8 : 16); P(hx, hy - 5, 8); P(hx, hy - 4, 8); },
            Earmuffs: () => { for (let a = 0; a < 8; a++) P(hx + Math.cos(a * 0.45 + 3.3) * 4, hy + Math.sin(a * 0.45 + 3.3) * 4 + 2, 6); P(hx - 4, hy + 3, 16); P(hx + 4, hy + 3, 16); },
            Bow: () => { P(hx - 2, hy, 16); P(hx - 3, hy - 1, 16); P(hx - 3, hy + 1, 16); P(hx + 2, hy, 16); P(hx + 3, hy - 1, 16); P(hx + 3, hy + 1, 16); P(hx, hy, 16); },
            Captain: () => { for (let x = -3; x <= 3; x++) { P(hx + x, hy, 1); P(hx + x, hy - 1, 8); P(hx + x, hy - 2, 8); } P(hx, hy - 1, 17); },
            Crown: () => { for (let x = -3; x <= 3; x++) P(hx + x, hy, 17); for (const x of [-3, 0, 3]) { P(hx + x, hy - 1, 17); P(hx + x, hy - 2, 17); } },
            'Ice Crown': () => { for (let x = -3; x <= 3; x++) P(hx + x, hy, 7); for (const x of [-3, -1, 1, 3]) for (let k = 1; k < 4 - Math.abs(x) % 2 * 1; k++) P(hx + x, hy - k, 8); },
            'Party Hat': () => { for (let y = 0; y < 6; y++) for (let x = -2 + Math.floor(y / 2); x <= 2 - Math.floor(y / 2); x++) P(hx + x, hy - y, y % 2 ? 17 : 16); P(hx, hy - 6, 8); },
            Flower: () => { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) P(hx + a, hy - 1 + b, 9); P(hx, hy - 1, 17); },
            'Snow Cap': () => { for (let x = -3; x <= 3; x++) { P(hx + x, hy, 8); if (Math.abs(x) < 3) P(hx + x, hy - 1, 8); } },
            Lure: () => { for (let k = 0; k < 6; k++) P(hx + 1 + k * 0.5, hy - k, 2); P(hx + 4, hy - 6, ((t * 2) % 1) < 0.5 ? 17 : 8); },
            Halo: () => { for (let a = 0; a < 16; a++) P(hx + Math.cos(a / 16 * 6.283) * 4, hy - 3 + Math.sin(a / 16 * 6.283) * 1.2, 17); },
          }[hat];
          if (HT) HT();
          const [nx0, ny0] = spine[46], nr = rad(0.77);
          const NK = {
            'Striped Scarf': () => { for (let k = -3; k <= 3; k++) for (let w = 0; w < 2; w++) P(nx0 + k * 0.6 + w, ny0 - nr + 1 + k, (k + w) % 2 ? 16 : 8); },
            'Bow Tie': () => { const bx = nx0 + nr * 0.6, by = ny0 + nr * 0.4; P(bx, by, 1); P(bx - 1, by - 1, 1); P(bx - 1, by + 1, 1); P(bx + 1, by - 1, 1); P(bx + 1, by + 1, 1); },
            'Life Ring': () => { for (let a = 0; a < 20; a++) P(nx0 + Math.cos(a * 0.314) * (nr + 1), ny0 + Math.sin(a * 0.314) * (nr * 0.4 + 1), a % 5 < 2 ? 16 : 8); },
            Pearls: () => { for (let k = -3; k <= 3; k++) P(nx0 + k * 1.2, ny0 + nr * 0.6 + Math.abs(k) * -0.3, 8); },
            Medal: () => { P(nx0 + 2, ny0 + nr * 0.7, 17); P(nx0 + 2, ny0 + nr * 0.7 + 1, 17); P(nx0 + 1, ny0 + nr * 0.4, 16); },
            Kelp: () => { for (let k = -4; k <= 4; k++) P(nx0 + k, ny0 + nr * 0.5 + Math.sin(k) * 0.8, 18); },
            Bell: () => { P(nx0 + 1, ny0 + nr * 0.7, 17); P(nx0, ny0 + nr * 0.7 + 1, 17); P(nx0 + 2, ny0 + nr * 0.7 + 1, 17); P(nx0 + 1, ny0 + nr * 0.7 + 1, 17); },
            'Shell Necklace': () => { for (let k = -3; k <= 3; k++) P(nx0 + k * 1.2, ny0 + nr * 0.6, k % 2 ? 19 : 8); },
          }[neck];
          if (NK) NK();
          // the companion on the ice (Companion)
          if (pal2 === 'Puffin') { const qx = 66, qy = 70; for (const [a, b, k] of [[0, 0, 1], [0, -1, 1], [1, -1, 8], [0, -2, 1], [1, -2, 8], [2, -2, 16], [0, -3, 1], [1, -3, 1], [1, 1, 16], [-1, 0, 1]]) P(qx + a, qy + b, k); }
          if (pal2 === 'Fish School') for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k * 0.25) % 1, fx = 8 + k * 6 + u * 10, fy = 52 - Math.sin(u * Math.PI) * 10; P(fx, fy, 6); P(fx + 1, fy, 6); P(fx - 1, fy - 1, 6); P(fx - 1, fy + 1, 6); }
          if (pal2 === 'Jellyfish') { const jx = 80, jy = 30 + Math.sin(t * 1.2) * 3; for (let x = -2; x <= 2; x++) P(jx + x, jy, 13); for (const x of [-2, 0, 2]) for (let k = 1; k < 4; k++) P(jx + x + Math.sin(t * 3 + k + x) * 0.5, jy + k, 13); }
          if (pal2 === 'Bubbles') for (let k = 0; k < 5; k++) { const u = (t * 0.3 + k * 0.2) % 1; P(HOLE[0] + (k - 2) * 3 + Math.sin(t * 2 + k) * 1.5, HOLE[1] - u * 30, u < 0.8 ? 7 : 6); }
          // drops of melt water, falling into the hole
          if (warm > 0.1) for (let k = 0; k < 3; k++) { const per = 1.6 - warm, u = ((t + k * 0.5) % per) / per, src = k === 0 ? [36, 56] : k === 1 ? [HEAD[0] + 2, HEAD[1] + 6] : [TB[0] + (TE[0] - TB[0]) * tcut, TB[1] + (TE[1] - TB[1]) * tcut]; P(src[0], src[1] + u * (HOLE[1] - src[1]), 7); P(src[0], src[1] + u * (HOLE[1] - src[1]) + 1, 6); }
          // snow falling, always; in a Snowfall scene, more of it
          for (const [sx, sy, sp] of scene === 'Snowfall' || scene === 'Floes' ? snow : snow.slice(0, 16)) { const y = (sy + t * sp * 8) % G, x = (sx + Math.sin(t + sy) * 2 + G) % G; P(x, y, 7); }
          // the prism's rainbow, through the carving and out across the dark
          if (pt < 2.5) for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const q = Math.floor(x / 2) * 2 * 0.8 - Math.floor(y / 2) * 2 * 0.6 - (-20 + pt * 60); if (q > -4.5 && q < 4.5 && (BODY[y * G + x] > 0 || (y < 60 && x > 50))) px[y * G + x] = [9, 10, 12][Math.min(2, Math.floor((q + 4.5) / 3))]; }   // (a stepped band of three colours)
          // the lamp itself
          if (inp.inside) { P(lmx, lmy, 8); P(lmx - 1, lmy, 7); P(lmx + 1, lmy, 7); P(lmx, lmy - 1, 7); P(lmx, lmy + 1, 7); }
          // the frame (Frame)
          for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
            const i = y * G + x, d = Math.min(x, y, G - 1 - x, G - 1 - y);
            if (frameKind === 'Porthole') { const r = Math.hypot(x - 47.5, y - 47.5); if (r > 46) px[i] = 1; else if (r > 44) px[i] = r > 45 ? 3 : 6; }
            else if (frameKind === 'Frosted Corners') { if (FROST[Math.min(y, G - 1 - y) * 24 + Math.min(x, G - 1 - x)] && Math.min(x, G - 1 - x) < 24 && Math.min(y, G - 1 - y) < 24) px[i] = FROST[Math.min(y, G - 1 - y) * 24 + Math.min(x, G - 1 - x)]; }
            else if (frameKind === 'Rope') { if (d < 3) px[i] = ((x + y + (d === 1 ? 2 : 0)) % 4 < 2) ? 17 : 2; }
            else if (frameKind === 'Snapshot') { if (d < 3 || y > G - 10) px[i] = d === 0 ? 6 : 8; }
            else if (frameKind === 'Gilt Frame') { if (d < 4) px[i] = d === 0 || d === 3 ? 2 : (x + y) % 3 ? 17 : 10; }
          }
          const d = im.data;
          for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const p = PAL[px[y * G + (MX ? G - 1 - x : x)]], j = (y * G + x) * 4; d[j] = p[0]; d[j + 1] = p[1]; d[j + 2] = p[2]; d[j + 3] = 255; }
          cx2.putImageData(im, 0, 0);
          g.imageSmoothingEnabled = false;
          g.drawImage(cv, 0, 0, S, S);
        };
      }
      // ---- The Unicorn: a page of an old bestiary. Under a pointed gilt arch on lapis diapered with gold, the white
      // old bull rises side on out of curling medieval waves, its great spiral horn running up past the arch to the
      // corner, a figurehead crown on its head, barnacles on its neck and the scars of a long life on its back. The
      // waves roll, it rides them, a sheen runs up the horn and the gold glints; a tap and it sings, a ring of light
      // climbs the horn and the crown flashes.
      const IV = H(['#3a332c', '#7a7266', '#b8b0a0', '#e2dccc', '#fffcf2']), LAPIS = H(['#0a1236', '#14215e', '#22378a']);
      const VERM = H(['#4a0c0c', '#8a1a14', '#c43a22']), SEA2 = H(['#06263a', '#0e4a62', '#1c7088', '#cfeef0']), GOLD = RING, HORN = H(['#5a4a30', '#a89870', '#e6dec6', '#f8f4e8', '#ffffff']);
      const INKI = cid(INK), WH = cid(WHITE), G = GOLD.map(cid), L = LAPIS.map(cid), V = VERM.map(cid), SE = SEA2.map(cid), IVI = IV.map(cid), HI = HORN.map(cid), BA = BARN.map(cid), PE = cid(PEARLC[1]), RB = cid(RIBBON), TE = cid(TEAR);
      // the page: a pointed arch springing at y 22 from x 5 to 43, its gold band, red spandrels with gold dots, the lapis
      // field with its diaper of gold lines and dots
      const BGP = new Int32Array(NS), BGM = new Uint8Array(NS);
      for (let sy = 0; sy < SSN; sy++) for (let sx = 0; sx < SSN; sx++) {
        const si = sy * SSN + sx, px = (sx + 0.5) / SS, X = MIRX ? N - px : px, py = (sy + 0.5) / SS;
        const inA = X > 5 && X < 43 && (py >= 22 || (Math.hypot(X - 25, py - 22) < 20 && Math.hypot(X - 23, py - 22) < 20));
        const inB = X > 3.6 && X < 44.4 && (py >= 22 || (Math.hypot(X - 25, py - 22) < 21.4 && Math.hypot(X - 23, py - 22) < 21.4));
        let k;
        if (inA) {
          const u = ((X + py) % 8 + 8) % 8, v = ((X - py) % 8 + 8) % 8;
          k = u < 0.3 || v < 0.3 ? G[0] : L[py < 10 ? 0 : 1];
          // and a few gold stars in the field, that twinkle
          for (const [qx, qy] of [[9, 12], [15, 6], [36, 8], [40, 15], [31, 4], [8, 20], [37, 21]]) { const ax = Math.abs(X - qx), ay = Math.abs(py - qy); if (ax + ay < 0.8 || (ax < 0.28 && ay < 1.5) || (ay < 0.28 && ax < 1.5)) { k = G[ax + ay < 0.8 ? 4 : 3]; BGM[si] = 1 + (qx % 3); } }
        } else if (inB) k = (Math.abs(X - 3.6) < 0.45 || Math.abs(X - 44.4) < 0.45 || (!inA && py < 22 && !(Math.hypot(X - 25, py - 22) < 21) && !(Math.hypot(X - 23, py - 22) < 21))) ? G[0] : G[py < 22 ? 4 : 3];
        else {
          k = V[1];
          const u = ((X * 0.5 + py * 0.5) % 3 + 3) % 3, v = ((X * 0.5 - py * 0.5) % 3 + 3) % 3;
          if ((u - 1.5) ** 2 + (v - 1.5) ** 2 < 0.22) k = G[3]; else if (u < 0.2 || v < 0.2) k = V[0];
        }
        BGP[si] = k;
      }
      // the old bull: a tube along a curve rising out of the sea, its blunt head to the right
      const P = [[-5, 46], [3, 35], [10, 27.5], [21.5, 24.5]];
      const pts = spineOf(P, s => 5.6 + 1.6 * sstep(0, 0.4, s) - 0.5 * sstep(0.85, 1, s), 40);
      const HB = [28, 24.3], HE = [46.6, 1.2], HL = Math.hypot(HE[0] - HB[0], HE[1] - HB[1]);
      const LX = -0.5, LY = -0.75, LZ = 0.45;
      const scars = [[6, 27, 9.5, 29.5], [2.5, 32, 6, 33.5], [12, 21, 15, 22.4]];
      const barn = [[9.6, 24.6, 1.3], [12.3, 23.4, 1.1], [11.2, 26.4, 0.9], [7.4, 26.6, 0.9], [14.2, 25.6, 0.7]];
      const GILD = new Float32Array(NS).fill(-99);
      let gLast = null;
      const layers = new Map();
      const layerOf = oyq => {
        let lay = layers.get(oyq);
        if (lay) return lay;
        lay = { k: new Int32Array(NS).fill(-1), m: new Uint8Array(NS), u: new Float32Array(NS) };
        for (let sy = 0; sy < SSN; sy++) for (let sx = 0; sx < SSN; sx++) {
          const si = sy * SSN + sx, px = (sx + 0.5) / SS, X = MIRX ? N - px : px, py = (sy + 0.5) / SS - oyq;
          // the horn: twisted ivory and gold with deep grooves
          const [dh, uh] = seg(X, py, HB[0], HB[1], HE[0], HE[1], 2, 0.3);
          if (dh < 0) {
            const across = ((X - HB[0]) * (HE[1] - HB[1]) - (py - HB[1]) * (HE[0] - HB[0])) / HL, tw = ((uh * HL * 1.05 + across * 0.7) % 1.7 + 1.7) % 1.7;
            lay.k[si] = dh > -0.38 ? HI[0] : tw < 0.42 ? HI[1] : across > 0.3 ? HI[2] : tw < 0.7 ? HI[3] : HI[4];
            lay.m[si] = 2; lay.u[si] = uh; continue;
          }
          // the crown: a band with five points tipped with pearls, a red jewel and two blue ones
          const cdx = X - 21, cy = py - 1;
          if (Math.abs(cdx) < 7.4 && cy > 12.2 && cy < 20.4) {
            for (let k = -2; k <= 2; k++) { const r2 = (X - 21 - k * 3.4) ** 2 + (cy - 13.7 + Math.abs(k) * 0.5) ** 2; if (r2 < 1.1) { lay.k[si] = r2 < 0.3 ? WH : IVI[3]; lay.m[si] = 3; break; } }
            if (lay.k[si] >= 0) continue;
            const sp = ((cdx + 8.5) % 3.4 + 3.4) % 3.4, tip = 13.4 + Math.abs(sp - 1.7) * 2.6 + Math.abs(cdx) * 0.12;
            if (cy > tip || cy > 17.2) {
              const band = cy > 17.2;
              let k = band ? (cy < 17.8 ? G[4] : cy > 19.7 ? G[0] : G[2]) : (sp < 1.7 ? G[4] : G[3]);
              if (Math.abs(cdx) > 6.8 || (!band && cy - tip < 0.45)) k = G[0];
              if (band && cy > 17.9 && cy < 19.6) { if (cdx * cdx + (cy - 18.7) ** 2 < 1) k = RB; else if ((Math.abs(cdx) - 3.6) ** 2 + (cy - 18.7) ** 2 < 0.6) k = TE; }
              lay.k[si] = k; lay.m[si] = 3; continue;
            }
          }
          let [dd, s, cx0, cy0, r] = tube(pts, X, py);
          // the flipper, low by the water
          const fq = flipAt(X, py, 15.5, 33.5, 4.2, 1.6, 0.75);
          let nx = (X - cx0) / r, ny = (py - cy0) / r;
          if (fq[0] < dd) { dd = fq[0]; nx = fq[1] * 0.7; ny = fq[2] * 0.7; }
          if (dd >= 0) continue;
          const nz = Math.sqrt(Math.max(0.04, 1 - Math.min(1, nx * nx + ny * ny))), lam = (nx * LX + ny * LY + nz * LZ) / Math.hypot(nx, ny, nz);
          let k = Math.max(1, Math.min(4, Math.floor((lam + 0.35) * 3.4)));
          if (py > 31 && X < 30) k = Math.max(1, k - 1);
          if (dd > -0.55) k = lam < 0.3 ? 0 : 1;                     // a dark edge all round, darkest on the shadow side
          let kk = IVI[k];
          for (const [ax, ay, bx2, by2] of scars) if (seg(X, py, ax, ay, bx2, by2, 0.22, 0.22)[0] < 0) kk = IVI[Math.max(1, k - 2)];
          for (const [bx2, by2, br] of barn) { const e = Math.hypot(X - bx2, py - by2); if (e < br) kk = e < br * 0.38 ? BA[0] : (X - bx2) + (py - by2) < -0.3 ? BA[3] : BA[2]; else if (e < br + 0.3) kk = BA[0]; }
          // the old eye under a heavy lid, and the long mouth
          const ex = X - 23.6, ey = py - 23.4;
          if (ex * ex / 1.2 + ey * ey / 0.8 < 1) { kk = ey < -0.15 ? IVI[1] : ex > 0.3 && ey > 0.1 ? IVI[3] : INKI; lay.m[si] = 4; }
          else if (Math.abs(ey + 1.15 - ex * 0.15) < 0.3 && Math.abs(ex) < 1.6) kk = IVI[1];
          const mq = X - 24.6, my = py - (27.6 + mq * mq * 0.05);
          if (mq > -4.5 && mq < 3.2 && Math.abs(my) < 0.3) kk = IVI[0];
          lay.k[si] = kk; if (!lay.m[si]) lay.m[si] = 1;
        }
        layers.set(oyq, lay);
        return lay;
      };
      // every height it bobs to, laid out now rather than on the first frame that reaches it
      for (let q = -2; q <= 2; q++) layerOf(q / 4);
      // the page's own gilding (the arch's band, its gold lines and dots, the stars, the crown): the only places your
      // gold leaf will take; and the illuminated initial in the free corner, its frame filling in as you gild
      const GOLDS = new Set(G), GOK = new Uint8Array(NS);
      let GOKN = 0;
      for (let si = 0; si < NS; si++) {
        if (!GOLDS.has(BGP[si])) continue;
        // (not the fine diaper lines on the lapis: those stay quiet)
        const px = (si % SSN + 0.5) / SS, X = MIRX ? N - px : px, py = ((si / SSN | 0) + 0.5) / SS;
        const inA = X > 5 && X < 43 && (py >= 22 || (Math.hypot(X - 25, py - 22) < 20 && Math.hypot(X - 23, py - 22) < 20));
        if (inA && BGP[si] === G[0]) continue;
        GOK[si] = 1; GOKN++;
      }
      const lay0 = layerOf(0);
      for (let si = 0; si < NS; si++) if (lay0.m[si] === 3 && GOLDS.has(lay0.k[si]) && !GOK[si]) { GOK[si] = 2; GOKN++; }
      const IB = [1.2, 1.2, 9.4, 9.4];   // the initial's box
      const inIB = (X, py) => X > IB[0] && X < IB[2] && py > IB[1] && py < IB[3];
      const PERIM = (X, py) => { const w = IB[2] - IB[0], h = IB[3] - IB[1], x = X - IB[0], y = py - IB[1]; return y < 0.7 ? x / (2 * (w + h)) : x > w - 0.7 ? (w + y) / (2 * (w + h)) : y > h - 0.7 ? (w + h + (w - x)) / (2 * (w + h)) : (2 * w + h + (h - y)) / (2 * (w + h)); };
      const letterU = (X, py) => { const x = X - IB[0], y = py - IB[1]; return y > 1.6 && y < 6.8 && ((x > 1.8 && x < 3.1) || (x > 5.1 && x < 6.4)) || (y > 5.6 && y < 6.8 && x > 1.8 && x < 6.4); };
      const SINGM = [45, 52, 57, 52, 50];
      let gilded = 0, doneAt = -9;
      return t => {
        const inp = c.input;
        tt = t;
        if (inp.inside && !wasIn2) [50, 57, 62].forEach((m, i) => c.sound.note(m, { dur: 1.8, vel: 0.06, wave: 'sine', attack: 0.5, at: i * 0.12 }));
        wasIn2 = inp.inside;
        if (shortTap(inp, t) && t - legAt2 > 1.8) { legAt2 = t; SINGM.forEach((m, i) => c.sound.note(m, { dur: 0.9, vel: 0.14, wave: 'sine', attack: 0.25, at: i * 0.32 })); c.sound.note(88, { dur: 1.4, vel: 0.04, wave: 'sine', at: 0.2 }); }
        const lt = t - legAt2, hv = inp.inside;
        const oyq = Math.round(Math.sin(t * 0.9 + swayOff) * 2) / 4, lay = layerOf(oyq);
        const sheen = ((t * (hv ? 0.9 : 0.3)) % 1.4), ring = lt < 1.1 ? lt / 1.0 : -1, blinkOn = ((t + blinkOff) % 5.2) < 0.18;
        const glintC = lt < 0.9 || (t * 0.5) % 3 < 0.25, wv = t * 0.8;
        // singing: each note a neume rising from its mouth, the waves lifting and the stars flashing with it
        let lift = 0, note = false;
        const neumes = [];
        if (lt < 3.4) SINGM.forEach((m, i) => { const u = lt - i * 0.32; if (u < 0) return; if (u < 0.35) { lift = Math.max(lift, (1 - u / 0.35) * 1.1); note = note || u < 0.18; } if (u < 1.9) neumes.push([30 + i * 2.2 + Math.sin(u * 4 + i) * 0.8, 26.5 - u * 6 - (m - 45) * 0.15, u]); });
        // gilding: press and drag over the page's gold to lay leaf on it, burnished bright; the rest of the page won't take it
        if (inp.down && inp.inside) {
          const gx = inp.x * SSN, gy = inp.y * SSN, a = gLast || [gx, gy], n = Math.ceil(Math.hypot(gx - a[0], gy - a[1]) / 2) + 1;
          let took = 0;
          for (let k = 0; k <= n; k++) { const cx2 = a[0] + (gx - a[0]) * k / n, cy2 = a[1] + (gy - a[1]) * k / n; for (let y = Math.floor(cy2 - 7); y <= cy2 + 7; y++) for (let x = Math.floor(cx2 - 7); x <= cx2 + 7; x++) { if (x < 0 || y < 0 || x >= SSN || y >= SSN || (x - cx2) ** 2 + (y - cy2) ** 2 >= 46) continue; const j = y * SSN + x; if (GOK[j] && GILD[j] < 0) { GILD[j] = t; gilded++; took++; } } }
          if (took && (!gLast || Math.hypot(gx - a[0], gy - a[1]) > 10)) c.sound.note(84 + ((gx / 12) | 0) % 7, { dur: 0.3, vel: 0.035, wave: 'sine' });
          gLast = [gx, gy];
        } else gLast = null;
        const prog = Math.min(1, gilded / (GOKN * 0.5));
        if (prog >= 1 && doneAt < 0) { doneAt = t; [62, 66, 69, 74, 78].forEach((m, i) => c.sound.note(m, { dur: 2.2, vel: 0.05, wave: 'sine', attack: 0.1, at: i * 0.09 })); }
        const done = doneAt > 0, dsw = done && t - doneAt < 1.2 ? (t - doneAt) / 1.2 * 110 - 20 : -99;   // the flash of light across the finished page
        paint((si, X, py) => {
          if (dsw > -99 && Math.abs(X + py - dsw) < 1.4) return WH;
          // the illuminated initial: its frame filling in with gold as you gild; finished, a gold U on lapis
          if (inIB(X, py)) {
            const x = X - IB[0], y = py - IB[1], edge = x < 0.7 || y < 0.7 || x > IB[2] - IB[0] - 0.7 || y > IB[3] - IB[1] - 0.7;
            if (edge) return PERIM(X, py) < prog ? (((si * 2654435761) >>> 0) % 13 === 0 || Math.abs(PERIM(X, py) - prog) < 0.02 ? WH : G[4]) : G[0];
            if (letterU(X, py)) return done ? (x < 2.3 || (y > 5.6 && y < 6.1) ? WH : G[4]) : IVI[1];
            if (done) { const vine = Math.abs(Math.sin(x * 1.6) * 1.1 + 4 - y) < 0.35 && (x < 1.6 || x > 6.6); return vine ? G[3] : L[2]; }
            return V[0];
          }
          for (const [nx, ny, u] of neumes) { const dx = X - nx, dy = py - ny; if (Math.abs(dx) + Math.abs(dy) * 1.2 < 1.2) return u < 1.3 ? (dx + dy < -0.5 ? WH : G[4]) : G[2]; if (Math.abs(dx - 0.9) < 0.25 && dy > 0 && dy < 2.6) return G[3]; }
          const ga = GILD[si] > 0 ? t - GILD[si] : -1;
          // the sea, in front: rows of curling waves, each row rolling its own way (lifting with each sung note)
          const sp = 34.6 - lift;
          if (py > sp) {
            const row = Math.floor((py - sp) / 3.3), ry = py - sp - row * 3.3, xo = X + (row % 2) * 3.3 + (row % 2 ? wv : -wv);
            const cxw = ((xo % 6.6) + 6.6) % 6.6 - 3.3, arc = 3.3 - Math.sqrt(Math.max(0, 10.9 - cxw * cxw));
            if (Math.abs(ry - arc) < 0.45) return row % 2 ? SE[2] : SE[3];
            if (ry > arc) return SE[1];
            if (row > 0) return SE[0];
          }
          const burnish = col => {
            // laid leaf: a step brighter, a shine sweeping over it now and then, a glint here and there
            if (((X + py * 0.6 - t * 14) % 40 + 40) % 40 < 1.1 || (((si * 2654435761) >>> 0) + Math.floor(t * 6)) % 61 === 0) return WH;
            return col === G[0] ? G[2] : col === G[1] ? G[3] : G[4];
          };
          const k = lay.k[si];
          if (k >= 0) {
            const m = lay.m[si];
            if (m === 2) { const u = lay.u[si]; if (ring >= 0 && Math.abs(u - ring) < 0.05) return WH; if (Math.abs(u - sheen) < 0.035) return WH; }
            if (m === 3 && glintC) { const gx = Math.abs(X - 24.4), gy = Math.abs(py - oyq - 13.9); if (gx + gy < 0.9 || (gx < 0.35 && gy < 2.4) || (gy < 0.35 && gx < 2.4)) return WH; }
            if (m === 3 && ga >= 0 && GOLDS.has(k)) return burnish(k);
            if (m === 4 && blinkOn) return IVI[1];
            return k;
          }
          if (BGM[si] && (note || ((t * 0.7 + BGM[si] * 0.37) % 1) < 0.18)) return BGM[si] === 2 || note ? WH : G[4];
          if (ga >= 0 && GOK[si] === 1) return burnish(BGP[si]);
          return BGP[si];
        });
      };
    })() : null;
    let spoutAt = -9, wasIn = false;
    function frame(t) {
      if (legendFrame) return legendFrame(t);
      tt = t;
      const inp = c.input;
      hov = LEG && inp.inside ? [inp.x * N, inp.y * N] : null;
      if (LEG && inp.inside && !wasIn) {
        if (LEG === 'Ice Sculpture') c.sound.note(96, { dur: 0.5, vel: 0.05, wave: 'sine' });
        else [50, 57, 62].forEach((m, i) => c.sound.note(m, { dur: 1.8, vel: 0.06, wave: 'sine', attack: 0.5, at: i * 0.12 }));
      }
      wasIn = inp.inside;
      for (const tp of inp.taps()) {
        const gx = tp.x * N, gy = tp.y * N - oy;
        const onBody = gy > 12 && ell(gx, gy, 24, 27, HRX, 15) < 0 || gy >= 27 && Math.abs(gx - 24) < HRX;
        const onTusk = tuskDefs.some(([bx, s2]) => seg(gx, gy, bx, TY, ...tuskEnd(bx, s2), 2.6, 1.4)[0] < 0);
        if (onTusk) {
          if (t - ringAt > 0.5) {
            ringAt = t;
            const top = tusk === 'Great Spiral' ? 74 : tusk === 'Gilded' || tusk === 'Crystal' || tusk === 'Glow' ? 86 : 81;
            c.sound.note(top, { dur: 1.2, vel: 0.12, wave: 'sine' });
            c.sound.note(top + 7, { dur: 0.9, vel: 0.06, wave: 'sine', at: 0.05 });
            c.sound.note(top + 12, { dur: 0.6, vel: 0.04, wave: 'sine', at: 0.3 });
          }
          continue;
        }
        if (LEG && onBody) {
          if (t - legAt > 1.3) {
            legAt = t;
            if (LEG === 'Ice Sculpture') [84, 88, 91, 95, 98].forEach((m, i) => c.sound.note(m, { dur: 1.1 - i * 0.12, vel: 0.08, wave: 'sine', at: i * 0.06 }));
            // the old bull sings: a slow deep call, a ring of light up the great horn, and the crown glints
            else { ringAt = t; [45, 52, 57, 52, 50].forEach((m, i) => c.sound.note(m, { dur: 0.9, vel: 0.14, wave: 'sine', attack: 0.25, at: i * 0.32 })); c.sound.note(88, { dur: 1.4, vel: 0.04, wave: 'sine', at: 0.2 }); }
          }
          continue;
        }
        if (t - spoutAt > 0.8) {
          spoutAt = t;
          c.sound.note(43, { dur: 1.2, vel: 0.35, wave: 'sine', attack: 0.15 });
          c.sound.note(50, { dur: 1.0, vel: 0.25, wave: 'sine', attack: 0.2, at: 0.35 });
          c.sound.note(55, { dur: 0.9, vel: 0.2, wave: 'triangle', attack: 0.2, at: 0.7, cutoff: 900 });
        }
      }
      oy = Math.round(Math.sin(t * 1.3 + swayOff) * 2.8) / 4;   // the bob, in quarter-dot steps (one cached still layer per step)
      fbob = flips === 'Both Up' ? Math.sin(t * 2.2) * 0.6 : 0;
      fswR = flips === 'Waving' ? Math.sin(t * 5) * 0.35 : flips === 'Paddling' ? Math.sin(t * 2.6) * 0.3 : 0;
      fswL = flips === 'Paddling' ? -Math.sin(t * 2.6 + 1.2) * 0.3 : 0;
      const target = inp.inside ? (inp.x - 0.5) * 5 : Math.sin(t * 0.6 + swayOff) * 1.2;
      lean += (target - lean) * 0.15;
      gazeX = inp.inside ? Math.max(-1, Math.min(1, (inp.x - 0.5) * 2.5)) : Math.sin(t * 0.37 + swayOff) * 0.6;
      gazeY = inp.inside ? Math.max(-1, Math.min(1, (inp.y - 0.45) * 2.5)) : 0;
      const bp = (t + blinkOff) % 4.4;
      blink = bp < 0.12 ? bp / 0.12 : bp < 0.24 ? 1 - (bp - 0.12) / 0.12 : 0;
      drops.length = 0;
      const st = t - spoutAt;
      if (st < 1.6) for (let k = 0; k < 10; k++) {
        const life = st - k * 0.06; if (life < 0) continue;
        const sx = (k % 2 ? 1 : -1) * (1 + (k % 5)) * 1.1;
        drops.push({ x: 24 + sx * life * 2.2, y: 14 + oy - life * 22 + life * life * 14, r: Math.max(0.3, 1.3 - life * 0.6) });
      }
      render();
    }
    frame(0);
    return frame;
  },
});

})(window.Proto);
