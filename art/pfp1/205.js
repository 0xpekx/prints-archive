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
  recipe: 'A narwhal, head and shoulders, in careful hand-antialiased pixel art 48 dots across: shapes shaded in five-step ramps with a coloured outline only on the shadow side, curves softened with in-between colours from the ramps, and motion done in fractions of a dot. A blunt melon of a head over a narrow, low face with the eyes set wide, a short snout, and the tusk leaving the upper lip and rising clear of both eyes; flippers at the chest, the tail flukes raised behind one shoulder, and a pale belly under a darker back. Hide, build, tusk and the side it grows from, markings, eyes, mouth, headwear, neckwear, a little companion, a frame and the scene (ice floes to pink dawns, kelp forests and sandy shallows) vary; pearl hides, rainbow tusks, glowing lures and halos are rare; about 1 in 400 is a legendary (an Ice Sculpture cut into glinting facets with a bright rim and solid crystal tusks, or The Unicorn, a white old bull with one spiral horn twice the length, a ring of barnacles and a ship\'s figurehead crown), and about 1 in 200 wears the coveted gold ring on its tusk. It bobs, blinks and sways its tusk.',
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
    let spoutAt = -9, wasIn = false;
    function frame(t) {
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
