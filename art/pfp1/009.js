// Spore Kin: from D:/code/synaesthesia/public/drop03/pieces/009.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Spore Kin: little mushroom folk on a 20 x 20 grid. No outlines anywhere: only flat shades and light.
Proto.add({
  num: 9,
  name: 'Spore Kin',
  fam: 'Pixel Portraits',
  recipe: 'A tiny mushroom person on a very chunky 20-cell grid, drawn without outlines, only in flat shaded colour on a banded sky. Cap shape, colour and pattern, stem, face, what it holds, what sits on its cap, what it wears, the ground and the woods behind it vary; glowing, starry, golden and rainbow caps and little clusters are rare; a four-leaf clover is coveted, and once in a long while a kin is an amethyst crystal or the bearded elder of the wood.',
  interactive: 'Tap the cap for spores, the face for a giggle, the moss to sprout a mushroom.',
  music: true,
  make(c) {
    const S = c.size, N = 20, BR = 4, W = N + BR * 2;
    // middle-square Weyl sequence (32-bit form), seeded from the hash
    let x = 0, w = 0;
    const s = (parseInt(c.hash.slice(2, 10), 16) | 1) >>> 0;
    let acc = 0;
    for (let i = 10; i < 66; i += 7) acc = (acc * 33 + parseInt(c.hash.slice(i, i + 7), 16)) >>> 0;
    x = acc;
    function msws() {
      x = (Math.imul(x, x) + (w = (w + s) | 0)) | 0;
      x = (x >>> 16) | (x << 16);
      return (x >>> 0) / 4294967296;
    }
    for (let i = 0; i < 16; i++) msws();
    function chance(list) {
      let sum = 0;
      for (const [, wt] of list) sum += wt;
      let r = msws() * sum;
      for (const [v, wt] of list) { r -= wt; if (r < 0) return v; }
      return list[0][0];
    }

    let capShape = chance([['Dome', 30], ['Bell', 20], ['Flat', 16], ['Conical', 14], ['Frilled', 14], ['Morel', 6]]);
    let capCol = chance([['Scarlet', 26], ['Chestnut', 20], ['Bluecap', 14], ['Lilac', 14], ['Butter', 16], ['Glowcap', 6], ['Inkcap', 4]]);
    let spots = chance([['White Spots', 34], ['None', 26], ['Freckled', 16], ['Ringed', 14], ['Stripes', 10]]);
    let stem = chance([['Cream', 44], ['Blush', 22], ['Tan', 20], ['Moonpale', 14]]);
    let face = chance([['Dots', 30], ['Shiny', 24], ['Sleepy', 16], ['Content', 16], ['Surprised', 14]]);
    let holding = chance([['Nothing', 34], ['Acorn', 18], ['Leaf', 18], ['Flower', 16], ['Firefly Jar', 8], ['Tiny Kin', 6]]);
    let woods = chance([['Meadow', 24], ['Deep Forest', 22], ['Dusk', 18], ['Night', 16], ['Fog', 12], ['Autumn', 8]]);
    const blush = msws() < 0.55;
    const motes = [];
    for (let i = 0; i < 10; i++) motes.push([msws() * W - BR, msws() * W, 0.3 + msws() * 0.5, msws() * 6.28]);
    const blinkEvery = 3 + msws() * 3, blinkAt = msws() * 4;
    const flip = msws() < 0.5 ? -1 : 1;

    // the wider forest rolls from a mulberry32 stream over another slice of the hash, so the
    // kin rolled above keep their looks unless this stream swaps one trait for a newer value
    let mb = (parseInt(c.hash.slice(26, 34), 16) ^ 0x5bd1e995) >>> 0;
    const berry = () => { mb = (mb + 0x6d2b79f5) >>> 0; let q = mb; q = Math.imul(q ^ (q >>> 15), q | 1); q ^= q + Math.imul(q ^ (q >>> 7), q | 61); return ((q ^ (q >>> 14)) >>> 0) / 4294967296; };
    const berryOf = list => { let sum = 0; for (const [, wt] of list) sum += wt; let r = berry() * sum; for (const [v, wt] of list) if ((r -= wt) < 0) return v; return list[0][0]; };
    if (berry() < 0.3) capShape = berryOf([['Puffball', 24], ['Parasol', 24], ['Funnel', 22], ['Shaggy', 20], ['Cluster', 6]]);
    if (berry() < 0.32) capCol = berryOf([['Mint', 22], ['Coral', 22], ['Plum', 20], ['Starry', 6], ['Gold Leaf', 5], ['Rainbow', 3]]);
    if (berry() < 0.3) spots = berryOf([['Big Dots', 22], ['Hearts', 16], ['Speckled Glow', 16], ['Moss Patch', 18], ['Drips', 18]]);
    if (berry() < 0.3) stem = berryOf([['Mint', 26], ['Lilac', 26], ['Charcoal', 22], ['Golden', 12]]);
    if (berry() < 0.34) face = berryOf([['Grumpy', 18], ['Teary', 16], ['Wink', 20], ['Sparkly', 18], ['Whistling', 14], ['Determined', 14]]);
    if (berry() < 0.32) holding = berryOf([['Lantern', 16], ['Dandelion', 18], ['Berries', 18], ['Teacup', 14], ['Feather', 14], ['Snail', 12]]);
    if (berry() < 0.32) woods = berryOf([['Snowfall', 22], ['Rainy', 22], ['Blossom', 22], ['Starry Night', 18], ['Glow Cave', 6]]);
    let topper = berryOf([['None', 58], ['Dewdrop', 9], ['Ladybug', 9], ['Snail', 7], ['Sprout', 7], ['Butterfly', 6], ['Bird', 3], ['Crown', 1.5]]);
    let ground = berryOf([['Moss', 46], ['Clover', 14], ['Pebbles', 12], ['Fallen Leaves', 10], ['Snow', 8], ['Fairy Ring', 6], ['Glowing Moss', 4]]);
    let wear = berryOf([['None', 58], ['Scarf', 14], ['Bow', 12], ['Bell', 8], ['Leaf Cape', 6], ['Flower Crown', 4]]);
    const wearTint = Math.floor(berry() * 4);

    // more variety for a 4,000-mint collection, from a Weyl-and-mix stream on another slice of the
    // hash: it swaps some of the commonest values for others and adds a critter on the moss
    let wy = (parseInt(c.hash.slice(50, 58), 16) ^ 0x1b56c4e9) >>> 0;
    const wr = () => { wy = (wy + 0x632be5ab) >>> 0; let z = Math.imul(wy ^ (wy >>> 15), 0x2c1b3c6d); z = Math.imul(z ^ (z >>> 12), 0x297a2d39); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
    const swapW = (cur, from, chance, list) => { const r = wr(), p = list[Math.floor(wr() * list.length)]; return cur === from && r < chance ? p : cur; };
    stem = swapW(stem, 'Cream', 0.35, ['Speckled', 'Ruby', 'Ash', 'Peach']);
    ground = swapW(ground, 'Moss', 0.5, ['Clover', 'Pebbles', 'Fallen Leaves', 'Daisies', 'Roots', 'Puddle', 'Daisies', 'Puddle']);
    topper = swapW(topper, 'None', 0.3, ['Dewdrop', 'Ladybug', 'Snail', 'Sprout', 'Butterfly', 'Moth', 'Tiny Mushroom', 'Moth', 'Tiny Mushroom']);
    wear = swapW(wear, 'None', 0.3, ['Scarf', 'Bow', 'Bell', 'Necklace', 'Necklace']);
    let cheekStyle = swapW(blush ? 'Rosy' : 'Plain', blush ? 'Rosy' : 'Plain', 0.4, blush ? ['Big Blush', 'Freckled', 'Hearts'] : ['Freckled', 'Glow Spots']);
    let critter = ['None', 'None', 'None', 'Beetle', 'Worm', 'Mouse', 'Frog', 'Hedgehog', 'Bunny', 'Bee'][Math.floor(wr() * 10)];

    // every kin's own face and stem roll from a fifth stream (a mulberry over another slice of the hash),
    // with a fixed number of draws: where the eyes sit, their shape, brows, mouth and the stem's shape.
    // The same stream thins the critters out to about two kin in five
    let fs5 = (parseInt(c.hash.slice(42, 50), 16) ^ 0x2f8e1d6b) >>> 0;
    const fr = () => { fs5 = (fs5 + 0x6d2b79f5) >>> 0; let q = fs5; q = Math.imul(q ^ (q >>> 15), q | 1); q ^= q + Math.imul(q ^ (q >>> 7), q | 61); return ((q ^ (q >>> 14)) >>> 0) / 4294967296; };
    const frOf = list => { let sum = 0; for (const [, wt] of list) sum += wt; let r = fr() * sum; for (const [v, wt] of list) if ((r -= wt) < 0) return v; return list[0][0]; };
    let eyeSet = frOf([['Close', 20], ['Set Wide', 22], ['High', 18], ['Low', 18], ['Uneven', 22]]);
    let eyeShape = frOf([['Dot', 28], ['Big', 26], ['Tall', 24], ['Oval', 22]]);
    let brows = frOf([['None', 22], ['Flat', 22], ['Raised', 20], ['Worried', 18], ['Bushy', 18]]);
    let mouth = frOf([['Smile', 28], ['Grin', 18], ['O', 16], ['Wobbly', 18], ['Tiny', 20]]);
    let stemShape = frOf([['Straight', 30], ['Stout', 24], ['Tapered', 22], ['Bulging', 24]]);
    if (fr() < 0.43) critter = 'None';

    // legendaries and the coveted four-leaf clover roll from their own stream (FNV-1a over the
    // hash text with a counter per draw), after every other draw, so ordinary kin keep their looks
    let fnvN = 0;
    const fnv = () => {
      let hh = (0x811c9dc5 ^ Math.imul(++fnvN, 0x9e3779b1)) >>> 0;
      for (let i = 2; i < c.hash.length; i++) { hh ^= c.hash.charCodeAt(i); hh = Math.imul(hh, 16777619); }
      hh ^= hh >>> 15; hh = Math.imul(hh, 0x2c1b3c6d); hh ^= hh >>> 12; hh = Math.imul(hh, 0x297a2d39); hh ^= hh >>> 15;
      return (hh >>> 0) / 4294967296;
    };
    const lroll = fnv(), groll = fnv();
    const legend = lroll < 0.0011 ? 'Crystal' : lroll < 0.002 ? 'The Elder' : '';
    if (!legend && groll < 0.005) holding = 'Four-Leaf Clover';
    if (legend === 'Crystal') { capShape = 'Crystal Cluster'; capCol = 'Amethyst'; spots = 'Facets'; stem = 'Quartz'; topper = 'None'; wear = 'None'; woods = 'Glow Cave'; ground = 'Glowing Moss'; }
    if (legend === 'The Elder') { capShape = 'Elder Cap'; capCol = 'Weathered'; spots = 'Lichen'; stem = 'Old Bark'; face = 'Ancient'; holding = 'Walking Stick'; topper = 'None'; wear = 'Long Beard'; if (ground === 'Snow') ground = 'Moss'; eyeSet = 'Ancient'; eyeShape = 'Big'; brows = 'White Bushy'; mouth = 'Moustache'; stemShape = 'Straight'; critter = 'None'; }
    if (legend) c.trait('Legendary', legend);

    if (capShape === 'Morel') { capCol = 'Honeycomb'; spots = 'Pitted'; }
    // some looks shape the eyes and mouth themselves
    if ((face === 'Shiny' || face === 'Teary' || face === 'Sparkly') && eyeShape === 'Dot') eyeShape = 'Big';
    if (face === 'Sleepy' || face === 'Content') eyeShape = 'Closed';
    if (face === 'Grumpy' || face === 'Determined') { eyeShape = 'Squint'; brows = 'Furrowed'; }
    if (eyeSet === 'High' && brows !== 'Furrowed') brows = 'None';
    if (face === 'Surprised') mouth = 'O';
    if (face === 'Grumpy') mouth = 'Frown';
    if (face === 'Whistling') mouth = 'Pucker';
    c.trait('Cap', capShape);
    c.trait('Cap Colour', capCol);
    c.trait('Cap Pattern', spots);
    c.trait('Stem', stem);
    c.trait('Stem Shape', stemShape);
    c.trait('Face', face);
    c.trait('Eyes', eyeSet);
    c.trait('Eye Shape', eyeShape);
    c.trait('Brows', brows);
    c.trait('Mouth', mouth);
    c.trait('Holding', holding);
    c.trait('Woods', woods);
    c.trait('Cheeks', cheekStyle);
    c.trait('Critter', critter);
    c.trait('On Its Cap', topper);
    c.trait('Ground', ground);
    c.trait('Wearing', wear);

    const CAPS = {
      Scarlet: ['#a8323e', '#d84a52', '#f07468', '#ffb0a0'], Chestnut: ['#6e4228', '#9c6038', '#c08454', '#e6b688'],
      Bluecap: ['#34529e', '#4a76cc', '#72a2e8', '#b4d6ff'], Lilac: ['#71519e', '#9474c4', '#b89ce2', '#e2d0ff'],
      Butter: ['#c08c22', '#e4b23a', '#f4d064', '#fff0b4'], Glowcap: ['#148480', '#22c4b0', '#78f0dc', '#e0fff8'],
      Inkcap: ['#22222c', '#3a3a48', '#5c5c6e', '#9a9ab0'], Honeycomb: ['#6a4a24', '#9a7038', '#c49a58', '#e8c888'],
      Mint: ['#2e8a6a', '#46b48a', '#78d8ae', '#c4f6de'], Coral: ['#b8484a', '#e86a5e', '#ff9a84', '#ffd0c0'], Plum: ['#4a2050', '#6e3478', '#9a56a2', '#d4a0d8'],
      Starry: ['#141a44', '#202a66', '#34408a', '#6a78c0'], 'Gold Leaf': ['#8a5a10', '#c08a1a', '#eec040', '#fff2a8'], Rainbow: ['#b04a6a', '#e8a040', '#80c860', '#e0f0ff'],
      Amethyst: ['#3a1a6e', '#6a3ab0', '#a47ce8', '#efe2ff'], Weathered: ['#4a3028', '#6e4a3a', '#94705a', '#bea284'],
    };
    const STEMS = { Speckled: ['#bca88c', '#e2d4ba', '#f2e8d4', '#fffaf0'], Ruby: ['#a04050', '#c8606a', '#e4888a', '#ffc0c0'], Ash: ['#7a7e86', '#9ca0a8', '#c0c4cc', '#e8eaf0'], Peach: ['#d48a6a', '#eeaa88', '#fac8a8', '#fff0e2'], Cream: ['#c4ae92', '#e2d2b6', '#f4e9d6', '#fffaf0'], Blush: ['#d09a9a', '#ecc2bc', '#f8dcd6', '#fff2ee'], Tan: ['#a8805c', '#c8a07a', '#e0c09c', '#f4dcc0'], Moonpale: ['#a4aec4', '#c8d0e2', '#e4eaf6', '#ffffff'],
      Mint: ['#7ab8a0', '#a0d8c0', '#c8f0e0', '#f0fff8'], Lilac: ['#a890c0', '#c8b4dc', '#e4d8f0', '#fbf6ff'], Charcoal: ['#3e3a46', '#56525e', '#726e7c', '#9894a4'], Golden: ['#c49a50', '#e0bc70', '#f4d898', '#fff0c8'],
      Quartz: ['#8a7ab4', '#bcb2dc', '#e6e2f6', '#ffffff'], 'Old Bark': ['#4e4034', '#6e5e4c', '#8e7e66', '#b4a68c'] };
    const SKIES = {
      Meadow: ['#bfe6ff', '#d8f0f6', '#e8f6dc', '#9ad27a', '#6cb05a'], 'Deep Forest': ['#18382c', '#204a36', '#2a5c40', '#3c7a44', '#2c5e34'],
      Dusk: ['#f6b6a0', '#e8a0b4', '#b48ccc', '#6c8a5a', '#506c44'], Night: ['#0e1430', '#141c40', '#1a2650', '#22403a', '#18302c'],
      Fog: ['#c8ccd2', '#d6d8dc', '#e2e4e6', '#9aa898', '#7e8e7e'], Autumn: ['#ffd8a0', '#ffc888', '#f4b070', '#c47a3a', '#9a5a2a'],
      Snowfall: ['#c4d4e8', '#d6e2f0', '#e8eff8', '#aebccc', '#8e9eb0'], Rainy: ['#7a8aa0', '#8a9ab0', '#9aaabe', '#5a7a68', '#4a6a58'],
      Blossom: ['#ffd8e6', '#ffe6ee', '#fff2f4', '#e8a0b8', '#c88098'], 'Starry Night': ['#0a0c24', '#10143a', '#18204e', '#1e2c4a', '#16223a'],
      'Glow Cave': ['#0c0a18', '#14102a', '#1c1638', '#2a2050', '#201840'],
    };
    const CAP = CAPS[capCol], STEM = STEMS[stem], SKY = SKIES[woods];
    const dark = woods === 'Night' || woods === 'Deep Forest' || woods === 'Starry Night' || woods === 'Glow Cave';
    const EYE = stem === 'Charcoal' ? '#f4ece0' : '#2a1e24', LID = stem === 'Charcoal' ? '#e4dcd0' : '#3a2a30', LIP = stem === 'Charcoal' ? '#f0a0a8' : '#6a3a40';
    const MOSS = legend === 'Crystal' ? ['#4a3a8a', '#3a2c70', '#d8c0ff'] : ground === 'Snow' ? ['#e8eef6', '#cad6e4', '#ffffff'] : ground === 'Glowing Moss' ? ['#2a8a7a', '#1e6e64', '#8affe0'] : ground === 'Fallen Leaves' ? ['#7a8a3a', '#5e6e2e', '#e08a3a'] : ['#5aa04a', '#4a8a3e', '#a8d870'];
    const RAINBOW = ['#e85a7a', '#f0904a', '#f0d050', '#7ac860', '#5aa0e8', '#9a7ae0'];
    const WEARS = [['#e84a5a', '#ffd8d8'], ['#4a8ad8', '#d8e8ff'], ['#f0b030', '#fff0c0'], ['#9a6ad0', '#ecdcff']][wearTint];
    const SCARVES = [['#f08a30', '#c0601a'], ['#4a8ad8', '#2e64a8'], ['#f0b030', '#c08418'], ['#9a6ad0', '#6e48a0']];

    const can = document.createElement('canvas');
    can.width = can.height = W;
    const g = can.getContext('2d');
    const P = (px, py, col) => { g.fillStyle = col; g.fillRect(px + BR, py + BR, 1, 1); };
    const lit = (nx, ny) => -0.55 * nx - 0.8 * ny; // light from the upper left
    const rampAt = (ramp, v) => ramp[v > 0.55 ? 3 : v > 0.05 ? 2 : v > -0.5 ? 1 : 0];
    const sprite = (rows, x0, y0, pal) => rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (pal[row[i]]) P(x0 + i, y0 + j, pal[row[i]]); });

    // the crystal kin's cap is five separate amethyst points of different heights, growing from a dark
    // rock: [x, tip y, half width]; each widens over its first rows to a straight prism
    const SPIRES = [[10, 0.4, 2.1], [5.6, 3.2, 1.6], [14.6, 2, 1.7], [1.9, 6.2, 1.1], [18.1, 5.4, 1.1]];
    const inSpire = (sp, X, Y) => Y >= sp[1] && Math.abs(X - sp[0]) <= sp[2] * Math.min(1, (Y - sp[1]) / 2.4 + 0.25);
    function capTest(px, py) {
      const X = px + 0.5, Y = py + 0.5;
      if (capShape === 'Dome') return Y < 10 && ((X - 10) / 8.6) ** 2 + ((Y - 9.6) / 7) ** 2 <= 1;
      if (capShape === 'Bell') return Y < 10.4 && ((X - 10) / 6.6) ** 2 + ((Y - 9.8) / 8.4) ** 2 <= 1;
      if (capShape === 'Flat') return Y < 10 && ((X - 10) / 9.6) ** 2 + ((Y - 9.4) / 4.4) ** 2 <= 1;
      if (capShape === 'Conical') return Y < 10 && Y > 1 && Math.abs(X - 10) <= (Y - 1.4) * 0.92 + (Y > 8 ? 0.6 : 0);
      if (capShape === 'Frilled') return Y < 10.6 - ((Math.floor(X) % 3 === 1) ? 0 : 0.8) && ((X - 10) / 8.8) ** 2 + ((Y - 9.6) / 6.8) ** 2 <= 1;
      if (capShape === 'Puffball') return Y < 10.6 && ((X - 10) / 7) ** 2 + ((Y - 6.8) / 5.6) ** 2 <= 1;
      if (capShape === 'Parasol') return (Y < 9.6 && ((X - 10) / 10.2) ** 2 + ((Y - 9.2) / 3) ** 2 <= 1) || (Y > 4.4 && Y < 7 && Math.abs(X - 10) < 1.3);
      if (capShape === 'Funnel') return Y < 10.4 && Y > 3.2 && Math.abs(X - 10) <= 1.8 + (10.4 - Y) * 0.92 - (Y < 4.2 && Math.abs(X - 10) > 7 ? 1 : 0);
      if (capShape === 'Shaggy') return Y < 10.6 && ((X - 10) / 5.2) ** 2 + ((Y - 7) / 7.6) ** 2 <= 1;
      if (capShape === 'Cluster') return [[6, 7.4, 3.6, 2.9], [14, 7.4, 3.6, 2.9], [10, 5, 4, 3.2]].some(([cx, cy, rx, ry]) => Y < cy + 1.6 && ((X - cx) / rx) ** 2 + ((Y - cy - 1) / ry) ** 2 <= 1);
      if (capShape === 'Crystal Cluster') return Y < 10.4 && (Y >= 8.8 && Math.abs(X - 10) <= 8.4 || SPIRES.some(sp => inSpire(sp, X, Y)));
      // the elder's old cap sits tilted: its crown leans left and its brim dips to the right
      if (capShape === 'Elder Cap') return Y < 10 + (X - 10) * 0.16 && ((X - 10 + (9.6 - Y) * 0.36) / 8.2) ** 2 + ((Y - 9.8) / 7.6) ** 2 <= 1;
      return Y < 10.2 && ((X - 10) / 5.6) ** 2 + ((Y - 6.5) / 6.4) ** 2 <= 1; // morel
    }
    let capTop = 0;
    while (capTop < 10 && !capTest(10, capTop)) capTop++;
    if (capShape === 'Cluster') capTop = 2;
    // the cap's extent, for its hand-placed light: a soft highlight up on the left, shade low on the right
    let cx0 = N, cx1 = -1, cy0 = N, cy1 = -1;
    for (let py = -2; py < 12; py++) for (let px = 0; px < N; px++) if (capTest(px, py)) { cx0 = Math.min(cx0, px); cx1 = Math.max(cx1, px); cy0 = Math.min(cy0, py); cy1 = Math.max(cy1, py); }
    const capW = cx1 - cx0 + 1, capH = cy1 - cy0 + 1, hlx = cx0 + capW * 0.34, hly = cy0 + capH * 0.34;
    // the stem's half width at each row, by its shape
    const stemHw = py => stemShape === 'Stout' ? 4.6 + Math.max(0, py - 14) * 0.25 : stemShape === 'Tapered' ? 4.4 - Math.max(0, py - 11) * 0.22 : stemShape === 'Bulging' ? 3.9 + Math.max(0, py - 14) * 0.75 : 3.9 + Math.max(0, py - 14) * 0.3;
    const armL = Math.ceil(9.5 - stemHw(15)) - 1, armR = Math.floor(9.5 + stemHw(15)) + 1;
    // the face: where each eye's inner cell sits (the right one higher on an uneven face)
    const ey = eyeSet === 'High' ? 11 : eyeSet === 'Low' ? 13 : 12;
    const [eL, eR] = eyeSet === 'Close' ? (flip < 0 ? [8, 10] : [9, 11]) : eyeSet === 'Set Wide' ? [7, 12] : [8, 11];
    const eyR = eyeSet === 'Uneven' ? ey - 1 : ey, mxo = 0;

    function drawFace(t, gig, blink) {
        // face: each kin's own eye set and eye shape, brows and mouth, on top of its look
        const look = gig ? 'Happy' : face;
        const shapeOpen = eyeShape === 'Closed' || eyeShape === 'Squint' ? 'Dot' : eyeShape;
        for (const [xi, o, y] of [[eL, -1, ey], [eR, 1, eyR]]) {
          const x0 = Math.min(xi, xi + o), inner = xi, outer = xi + o;
          if (look === 'Ancient') {
            // the elder: big dark eyes with a glint, under white brows
            for (const yy of [y, y + 1]) { P(inner, yy, EYE); P(outer, yy, EYE); }
            if (!blink) P(outer, y, '#ffffff'); else { P(inner, y, STEM[2]); P(outer, y, STEM[2]); }
            continue;
          }
          if (look === 'Happy') { P(x0, y + 1, LID); P(x0 + 1, y, LID); P(x0 + 1, y + 1, LID); continue; }
          if ((blink && look !== 'Sparkly') || look === 'Sleepy' || (look === 'Wink' && o > 0)) { P(x0, y + 1, LID); P(x0 + 1, y + 1, LID); continue; }
          if (look === 'Content') { P(outer, y + 1, LID); P(inner, y, LID); continue; }
          if (look === 'Grumpy' || look === 'Determined') { P(inner, y + 1, EYE); P(outer, y + 1, EYE); const hi = look === 'Grumpy' ? inner : outer, lo = look === 'Grumpy' ? outer : inner; P(hi, y - 1, LID); P(lo, y, LID); continue; }
          // open eyes, by shape: a 1x2 dot, a 2x2 eye, a tall 1x3, a 2x3 oval
          const cells = shapeOpen === 'Big' ? [[inner, y], [outer, y], [inner, y + 1], [outer, y + 1]] : shapeOpen === 'Tall' ? [[inner, y - 1], [inner, y], [inner, y + 1]] : shapeOpen === 'Oval' ? [[inner, y - 1], [outer, y - 1], [inner, y], [outer, y], [inner, y + 1], [outer, y + 1]] : [[inner, y], [inner, y + 1]];
          for (const [px, py] of cells) P(px, py, EYE);
          const top = cells[0][1];
          if (shapeOpen !== 'Dot') P(shapeOpen === 'Tall' ? inner : outer, top, look === 'Shiny' || look === 'Teary' || look === 'Sparkly' || shapeOpen !== 'Tall' ? '#ffffff' : EYE);
          if (look === 'Sparkly') P(inner, top + (shapeOpen === 'Tall' ? 2 : 1), '#cfe4ff');
          // brows over open eyes (never up in the cap's shadow row)
          const by = top - 1, up1 = by - 1 > 11 ? by - 1 : by;
          if (by > 11) {
            if (brows === 'Flat') { P(inner, by, LID); P(outer, by, LID); }
            else if (brows === 'Raised') { P(inner, up1, LID); P(outer, up1, LID); }
            else if (brows === 'Worried') { P(inner, up1, LID); P(outer, by, LID); }
            else if (brows === 'Bushy') { P(inner, by, LID); P(outer, by, LID); P(outer + o, by, LID); P(outer, by - 1 > 11 ? by - 1 : by, LID); }
          }
        }
        if (look === 'Ancient') for (const [px, py] of [[eL - 2, 11], [eL - 1, 11], [eL, 11], [eR, 11], [eR + 1, 11], [eR + 2, 11], [eL - 2, 12], [eR + 2, 12]]) P(px, py, py === 12 ? '#d6d0c4' : '#f6f2ea');
        if (look === 'Teary') { const k = Math.floor(t * 1.2) % 3; P(eL - 1, ey + 2 + (k > 1 ? 1 : 0), '#8ad0ff'); P(eR + 1, eyR + 2 + (k > 0 ? 1 : 0), '#8ad0ff'); }
        const chL = eL - 2, chR = eR + 2, cy = Math.max(ey, eyR) + 2;
        if (cheekStyle === 'Rosy' || gig) { P(chL, cy, '#f2909a'); P(chR, cy, '#f2909a'); }
        if (cheekStyle === 'Big Blush' && !gig) for (const px of [chL - 1, chL, chR, chR + 1]) P(px, cy, px === chL || px === chR ? '#f07888' : '#f6a8b0');
        if (cheekStyle === 'Freckled' && !gig) for (const [px, py] of [[chL, 0], [chL + 1, 1], [chL - 1, 1], [chR, 0], [chR - 1, 1], [chR + 1, 1]]) P(px, cy + py, STEM[0]);
        if (cheekStyle === 'Hearts' && !gig) for (const px of [chL, chR]) { P(px - 1, cy, '#f06080'); P(px + 1, cy, '#f06080'); P(px, cy + 1, '#f06080'); }
        if (cheekStyle === 'Glow Spots' && !gig) for (const px of [chL, chR]) P(px, cy, Math.sin(t * 1.5 + px) > 0 ? '#8affe0' : '#4ac8b0');
        // mouth
        const my = Math.max(ey, eyR) + 3, m0 = 9 + mxo;
        if (look === 'Happy') { P(m0, my, LIP); P(m0 + 1, my, LIP); P(m0, my + 1, '#e8606a'); P(m0 + 1, my + 1, '#e8606a'); P(m0 - 1, my - 1, LIP); P(m0 + 2, my - 1, LIP); }
        else if (look === 'Ancient') { P(m0, my, LIP); P(m0 + 1, my, LIP); P(m0 - 1, my, '#f6f2ea'); P(m0 + 2, my, '#f6f2ea'); P(m0, my - 1, '#a8705a'); P(m0 + 1, my - 1, '#8e5a48'); }
        else if (mouth === 'O') { P(m0, my, LIP); P(m0 + 1, my, LIP); P(m0, my + 1, LIP); P(m0 + 1, my + 1, LIP); }
        else if (mouth === 'Frown') { P(m0, my, LIP); P(m0 + 1, my, LIP); P(m0 - 1, my + 1, LIP); P(m0 + 2, my + 1, LIP); }
        else if (mouth === 'Pucker') { P(m0 + 1, my, LIP); const ph = (t * 0.5) % 1; if (ph < 0.8) { const nx = 15 + Math.round(ph * 3), ny = 10 - Math.round(ph * 6); P(nx, ny, dark ? '#fff4c0' : '#4a3040'); P(nx + 1, ny - 1, dark ? '#fff4c0' : '#4a3040'); P(nx + 1, ny - 2, dark ? '#fff4c0' : '#4a3040'); } }
        else if (mouth === 'Grin') { P(m0 - 1, my - 1, LIP); P(m0 + 2, my - 1, LIP); P(m0 - 1, my, LIP); P(m0, my, '#fffaf0'); P(m0 + 1, my, LIP); P(m0 + 2, my, '#fffaf0'); P(m0, my + 1, LIP); P(m0 + 1, my + 1, LIP); }
        else if (mouth === 'Wobbly') { P(m0 - 1, my, LIP); P(m0, my + 1, LIP); P(m0 + 1, my, LIP); P(m0 + 2, my + 1, LIP); }
        else if (mouth === 'Tiny') P(m0 + (flip > 0 ? 1 : 0), my, LIP);
        else { P(m0, my, LIP); P(m0 + 1, my, LIP); if (look !== 'Sleepy') { P(m0 - 1, my - 1, LIP); P(m0 + 2, my - 1, LIP); } }
    }
    function drawGround(t) {
        if (ground === 'Clover') for (const cx of [1, 17, 19]) { P(cx, 16, '#3a8a3a'); P(cx - 1, 15, '#6ac860'); P(cx + 1, 15, '#6ac860'); P(cx, 14, '#6ac860'); }
        if (ground === 'Pebbles') for (const [px, py] of [[2, 17], [3, 17], [16, 17], [18, 18], [0, 18]]) P(px, py, (px + py) % 2 ? '#b8b0a4' : '#d8d0c4');
        if (ground === 'Fallen Leaves') for (const [px, py] of [[1, 17], [3, 18], [16, 17], [18, 16], [17, 19]]) P(px, py, (px * 3 + py) % 3 ? '#e08a3a' : '#c85a2a');
        if (ground === 'Glowing Moss') for (const px of [0, 2, 17, 19]) if (Math.sin(t * 1.4 + px) > -0.4) P(px, 16 + (px % 2), legend === 'Crystal' ? '#efe2ff' : '#c8fff0');
        if (ground === 'Daisies') for (const [px, py] of [[1, 16], [3, 17], [17, 16], [19, 17]]) { P(px, py, '#f4d040'); P(px - 1, py, '#ffffff'); P(px + 1, py, '#ffffff'); P(px, py - 1, '#ffffff'); }
        if (ground === 'Roots') for (const [px, py] of [[3, 16], [2, 17], [1, 17], [16, 16], [17, 17], [18, 17], [19, 18]]) P(px, py, '#7a5a3a');
        if (ground === 'Puddle') { for (let px = 15; px < 20; px++) P(px, 17, px === 16 ? '#e0f0ff' : '#7ab0e0'); for (let px = 16; px < 19; px++) P(px, 18, '#5a90c8'); if (Math.sin(t * 1.2) > 0.6) P(18, 17, '#ffffff'); }
        if (critter !== 'None') {
          // a neighbour on the moss to its left, big enough to see, standing on the ground in the frame
          const hop = Math.sin(t * 1.3 + 2) > 0.85 ? 1 : 0, wig = Math.floor(t * 2) % 2;
          const CR = {
            Beetle: [['.k.k.', 'kbBbk', 'kbbbk', 'kbbbk', 'k.k.k'], { k: '#1a1418', b: '#3a7ac0', B: '#9ac8ff' }],
            Worm: [wig ? ['...pp', '...pe', 'pp.p.', '.ppp.'] : ['...pp', '...pe', '.pp.p', 'p..p.'], { p: '#e88a9a', e: '#1c1a24' }],
            Mouse: [['.pp..', 'gggp.', 'gggge', 'ggggn', 't.g.g'], { p: '#f6a8b8', g: '#b0b0c0', e: '#1c1a24', n: '#f07890', t: '#d890a0' }],
            Frog: [['wk.wk', 'ggggg', 'gLLLg', 'g.g.g'], { w: '#ffffff', k: '#1c1a24', g: '#4aa83e', L: '#b8e880' }],
            Hedgehog: [['.S.S.', 'sssS.', 'ssssf', 'sssfe', '.f.fk'], { s: '#6a4a2e', S: '#a07a50', f: '#e8c8a0', e: '#1c1a24', k: '#1c1a24' }],
            Bunny: [['..w.w', '..p.p', '.wwwe', 'wwwwn', '.w.w.'], { w: '#f6f2ec', p: '#f6b8c4', e: '#1c1a24', n: '#f07890' }],
            Bee: [['.ww..', 'wwkyk', '.ykyy', '..yy.'], { w: '#e0f0ff', y: '#f4c030', k: '#2a2020' }],
          }[critter];
          sprite(CR[0], 0, 18 - CR[0].length - (critter === 'Bee' ? 3 + hop : critter === 'Frog' || critter === 'Bunny' ? hop : 0), CR[1]);
        }
        if (ground === 'Fairy Ring') for (const [px, py, col] of [[0, 16, '#e8c8a0'], [2, 16, '#f07468'], [17, 16, '#e8c8a0'], [19, 16, '#f07468']]) { P(px, py, '#f4ecd8'); P(px, py - 1, col); P(px - 1, py - 1, col); P(px + 1, py - 1, col); }
    }
    function drawHeld(t) {
        // held things
        const hx = Math.min(16, armR + 1), hy = 14;
        if (holding === 'Acorn') { P(hx, hy, '#7a4a20'); P(hx + 1, hy, '#7a4a20'); P(hx, hy + 1, '#c08a40'); P(hx + 1, hy + 1, '#a8702c'); P(hx, hy - 1, '#5a3410'); }
        else if (holding === 'Leaf') { P(hx, hy, '#3a7a2a'); for (let k = 0; k < 4; k++) { P(hx + 1 + (k > 1 ? 1 : 0), hy - 1 - k, '#6ac04a'); P(hx + (k > 1 ? 1 : 0), hy - 2 - k, '#4aa03a'); } }
        else if (holding === 'Flower') { P(hx, hy, '#3a7a2a'); P(hx, hy - 1, '#3a7a2a'); P(hx, hy - 2, '#ffd040'); P(hx - 1, hy - 2, '#ffffff'); P(hx + 1, hy - 2, '#ffffff'); P(hx, hy - 3, '#ffffff'); }
        else if (holding === 'Firefly Jar') { const on = Math.sin(t * 2.4) > -0.3; P(hx, hy - 1, '#8a8a9a'); P(hx + 1, hy - 1, '#8a8a9a'); P(hx, hy, '#cfe8ff'); P(hx + 1, hy, on ? '#fff07a' : '#cfe8ff'); P(hx, hy + 1, on ? '#e8f8a0' : '#cfe8ff'); P(hx + 1, hy + 1, '#cfe8ff'); }
        else if (holding === 'Tiny Kin') { const bx = 15, by = 16; P(bx, by, STEM[2]); P(bx + 1, by, STEM[1]); P(bx, by + 1, STEM[1]); P(bx + 1, by + 1, STEM[1]); P(bx - 1, by - 1, CAP[2]); P(bx, by - 1, CAP[2]); P(bx + 1, by - 1, CAP[1]); P(bx + 2, by - 1, CAP[1]); P(bx, by - 2, CAP[3]); P(bx + 1, by - 2, CAP[2]); }
        else if (holding === 'Lantern') { const on = 0.5 + 0.5 * Math.sin(t * 1.8); P(hx, hy - 2, '#5a4a3a'); P(hx, hy - 1, '#7a6a4a'); P(hx + 1, hy - 1, '#7a6a4a'); P(hx, hy, on > 0.3 ? '#ffe070' : '#f0c040'); P(hx + 1, hy, '#ffb040'); P(hx, hy + 1, '#7a6a4a'); P(hx + 1, hy + 1, '#7a6a4a'); if (dark && on > 0.5) { P(hx + 2, hy, '#5a5030'); P(hx - 1, hy, '#5a5030'); } }
        else if (holding === 'Dandelion') { P(hx, hy, '#4a8a3a'); P(hx, hy - 1, '#4a8a3a'); P(hx, hy - 2, '#4a8a3a'); for (let dy = -5; dy <= -3; dy++) for (let dx = -1; dx <= 1; dx++) P(hx + dx, hy + dy, dx && dy !== -4 ? '#c4c4cc' : dx || dy !== -4 ? '#f2f2ee' : '#ffffff'); const ph = (t * 0.3) % 1; P(hx + 2 + Math.round(ph * 4), hy - 4 - Math.round(ph * 6 + Math.sin(t * 3)), '#ffffff'); }
        else if (holding === 'Berries') { P(hx, hy - 1, '#3a7a2a'); P(hx, hy, '#c82a4a'); P(hx + 1, hy, '#e8405a'); P(hx, hy + 1, '#e8405a'); P(hx + 1, hy - 1, '#c82a4a'); P(hx + 1, hy - 1, '#ff8a9a'); }
        else if (holding === 'Teacup') { P(hx, hy, '#f4f0f8'); P(hx + 1, hy, '#f4f0f8'); P(hx, hy + 1, '#d8d0e0'); P(hx + 1, hy + 1, '#d8d0e0'); P(hx + 2, hy, '#d8d0e0'); P(hx, hy - 1, '#a8703a'); P(hx + 1, hy - 1, '#a8703a'); if (Math.floor(t * 2) % 2) P(hx + 1, hy - 3, '#ffffff'); else P(hx, hy - 2, '#ffffff'); }
        else if (holding === 'Feather') for (let k = 0; k < 5; k++) { P(hx + (k > 2 ? 1 : 0), hy - k, k === 0 ? '#c8b8a0' : '#f8f0ff'); if (k > 0) P(hx + 1 + (k > 2 ? 1 : 0), hy - k, '#c8a8e8'); }
        else if (holding === 'Snail') sprite(['.ss', 'bsq', 'bbb'], hx - 1, hy - 1, { s: '#e0a050', q: '#b06a30', b: '#eadcbc' });
        else if (holding === 'Four-Leaf Clover') {
          // the lucky one, held up high like a parasol: a big four-leaf clover in a brighter green than
          // anything else, edged in deep green, a gold heart and a gold sparkle running round it (a burst after a tap)
          const cx = 16, cy = 5, luck = t - luckAt < 1;
          for (let py = cy + 3; py <= hy; py++) P(py > hy - 2 ? hx : cx, py, '#2a8a2e');
          P(hx, hy - 2, '#2a8a2e');
          const LEAF = ['.dd.dd.', 'dLLdLLd', 'dLMdMLd', '.ddgdd.', 'dMMdMMd', 'dMSdSMd', '.dd.dd.'];
          sprite(LEAF, cx - 3, cy - 3, { d: '#145a1c', L: '#a8ff8a', M: '#4ef25a', S: '#22b83a', g: luck || Math.floor(t * 2) % 2 ? '#ffe45a' : '#f0c020' });
          const RING = [[0, -4], [2, -4], [4, -2], [4, 0], [4, 2], [2, 4], [0, 4], [-2, 4], [-4, 2], [-4, 0], [-4, -2], [-2, -4]];
          const k = Math.floor(t * 4) % RING.length;
          if (luck) RING.forEach(([ddx, ddy], i) => { if ((i + k) % 3 === 0) P(cx + ddx, cy + ddy, i % 2 ? '#ffffff' : '#fff6b0'); });
          else { const [ddx, ddy] = RING[k], [ex, ey] = RING[(k + RING.length - 1) % RING.length]; P(cx + ex, cy + ey, '#fff0a0'); P(cx + ddx, cy + ddy, '#ffffff'); }
        } else if (holding === 'Walking Stick') {
          // a tall staff on the left, standing clear of the cap, with a glowing tip
          const sx = 1;
          for (let px = sx + 1; px < armL; px++) P(px, 15, STEM[1]);
          for (let py = 7; py < 19; py++) P(sx, py, py % 3 ? '#6a4a2a' : '#8a6a42');
          P(sx + 1, 7, '#6a4a2a'); P(sx + 1, 6, '#5a3a20');
          const glow = 0.5 + 0.5 * Math.sin(t * 2.3), tip = glow > 0.3 ? '#fff2a0' : '#f0c850';
          P(sx, 5, tip); P(sx + 1, 5, '#ffe070'); P(sx, 4, '#ffe070'); P(sx + 1, 4, glow > 0.6 ? '#ffffff' : '#ffe070');
          if (glow > 0.45) for (const [gx, gy] of [[sx - 1, 4], [sx - 1, 5], [sx + 2, 4], [sx + 2, 5], [sx, 3], [sx + 1, 3], [sx, 6]]) P(gx, gy, dark ? '#6a6030' : '#fff6c8');
        }
    }
    function draw(t) {
      // banded sky and ground
      for (let py = -BR; py < N + BR; py++) {
        const band = py < 4 ? 0 : py < 9 ? 1 : py < 15 ? 2 : py < 17 ? 3 : 4;
        g.fillStyle = SKY[band];
        g.fillRect(0, py + BR, W, 1);
      }
      if (woods === 'Starry Night') { for (let i = 0; i < 9; i++) if (Math.sin(t * 1.3 + i * 2.3) > -0.3) P((i * 7 + 3) % 26 - 3, (i * 5) % 10 - 3, '#fff4c0'); for (const [mx, my] of [[15, -2], [16, -2], [15, -1], [16, -1], [17, -1]]) P(mx, my, '#fff0b0'); }
      if (woods === 'Glow Cave') for (let i = 0; i < 6; i++) { const cx = (i * 5 + 1) % 26 - 3, h = 2 + (i % 3); for (let k = 0; k < h; k++) P(cx, -BR + k, k === h - 1 ? '#9a7aff' : '#3a2a6a'); }
      // distant trees as flat silhouettes
      const hill = SKY[3];
      for (let px = -BR; px < N + BR; px++) {
        const h = 2 + Math.round(1.5 + Math.sin(px * 0.9) * 1.2 + Math.sin(px * 0.37 + 1) * 1.4);
        for (let k = 0; k < h; k++) P(px, 14 - k, k === h - 1 && px % 2 ? SKY[2] : hill);
      }
      if (woods === 'Glow Cave') for (const [cx, cy] of [[-2, 12], [17, 13], [20, 11]]) { P(cx, cy, '#8affe0'); P(cx, cy - 1, '#c8fff0'); P(cx + 1, cy, '#4ad8c0'); }
      // floating motes
      for (const m of motes) {
        const fall = woods === 'Autumn' || woods === 'Snowfall' || woods === 'Blossom' ? -1.4 : woods === 'Rainy' ? -5 : 1;
        const my = ((m[1] - t * m[2] * fall) % W + W) % W - BR;
        const mx = Math.round(m[0] + (woods === 'Rainy' ? 0 : Math.sin(t * 0.8 + m[3]) * 0.8));
        let col = dark ? '#d8ff9a' : '#ffffff';
        if (woods === 'Autumn') col = m[3] > 3 ? '#e0602a' : '#f0a030';
        if (woods === 'Fog' || woods === 'Snowfall') col = '#f8faff';
        if (woods === 'Blossom') col = m[3] > 3 ? '#ff9ac0' : '#ffc4d8';
        if (woods === 'Rainy') col = '#c8d8ec';
        if (woods === 'Glow Cave') col = m[3] > 3 ? '#8affe0' : '#c8a8ff';
        if (woods === 'Night' && Math.sin(t * 2 + m[3]) < 0) col = '#6a8a4a';
        P(mx, Math.round(my), col);
        if (woods === 'Rainy') P(mx, Math.round(my) - 1, '#aabcd4');
      }
      // mossy mound (raised a row, so the kin stands on it), with the kin's shadow on it
      for (let py = 14; py < N + BR; py++) for (let px = -BR; px < N + BR; px++) {
        const e = ((px + 0.5 - 10) / 10.5) ** 2 + ((py + 0.5 - 20) / 4.6) ** 2;
        if (e <= 1) P(px, py, py === 15 && px % 3 === 0 ? MOSS[2] : e < 0.5 ? MOSS[0] : MOSS[1]);
      }
      for (let px = 4; px < 16; px++) if (Math.abs(px + 0.5 - 10.4) <= stemHw(17) + 0.8) P(px, 18, MOSS[1]);
      if (legend === 'Crystal') {
        // violet light from the crystals pools on the moss round its foot
        const pul = 0.5 + 0.5 * Math.sin(t * 1.3);
        for (let py = 15; py < 20; py++) for (let px = 0; px < N; px++) { const e = ((px + 0.5 - 10) / (8.5 + pul)) ** 2 + ((py + 0.5 - 17.5) / 2.4) ** 2; if (e < 1) P(px, py, e < 0.45 ? '#9a78e8' : (px + py) % 2 ? '#7a58c8' : MOSS[0]); }
      }
      drawGround(t);
      // the crystal kin splits the light: hover and a little spectrum fans out from its cap toward the pointer
      if (legend === 'Crystal' && hovering) {
        const dx = hoverX - 10, dy = hoverY - 4, dl = Math.hypot(dx, dy) || 1;
        for (let s = 3; s < 16; s++) for (let w2 = -1; w2 <= 1; w2++) {
          const spread = w2 * s * 0.12, x = Math.round(10 + dx / dl * s - dy / dl * spread), y = Math.round(4 + dy / dl * s + dx / dl * spread);
          if (s < dl + 2) P(x, y, RAINBOW[((w2 + 1) * 2 + Math.floor(s / 3) + 60) % 6]);
        }
      }
      // glow behind a glowing cap
      if (capCol === 'Glowcap') {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
        for (let py = -2; py < 13; py++) for (let px = -1; px < 21; px++) {
          const d = Math.hypot(px + 0.5 - 10, (py + 0.5 - 6.5) * 1.1);
          if (d < 10.5 + pulse && d > 8) P(px, py, dark ? '#1e5a5a' : '#bff6ee');
        }
      }
      // stem, in its own shape, with the cap's shadow across its top and a darker foot
      const gig = t - giggleAt < 0.6;
      const blink = ((t + blinkAt) % blinkEvery) < 0.15;
      for (let py = 9; py < 18; py++) for (let px = 3; px < 17; px++) {
        const hw = stemHw(py);
        const X = px + 0.5 - 10;
        if (Math.abs(X) > hw) continue;
        const v = lit(X / hw, (py - 14) / 6) + (py === 17 ? -0.6 : 0);
        P(px, py, py === 11 ? STEM[0] : rampAt(STEM, v));
      }
      if (stem === 'Speckled') for (const [px, py] of [[8, 14], [11, 15], [9, 17], [12, 16], [7, 16], [10, 12]]) P(px, py, '#9a7e62');
      if (stem === 'Old Bark') for (const [px, py] of [[7, 15], [7, 16], [12, 14], [12, 16], [12, 17], [6, 17]]) P(px, py, STEM[0]);
      if (wear === 'Leaf Cape') for (let py = 13; py < 18; py++) for (const px of [armL + 1, armR - 1]) { P(px, py, py % 2 ? '#4a9a3a' : '#5ab04a'); if (py > 14) P(px + (px < 10 ? -1 : 1), py, '#3a8a30'); }
      if (wear === 'Scarf') {
        // a solid scarf (never red, so it can't read as lips) low on the stem, a row clear of the mouth, with its tail hanging off the left side
        const SC = SCARVES[wearTint], hw = stemHw(17), xl = Math.ceil(9.5 - hw), xr = Math.floor(9.5 + hw);
        for (let px = xl; px <= xr; px++) P(px, 17, SC[px === xl + 1 ? 1 : 0]);
        P(xl - 1, 17, SC[1]); P(xl - 1, 18, SC[0]); P(xl - 1, 19, SC[1]);
      }
      drawFace(t, gig, blink);
      if (wear === 'Long Beard') {
        // a long white beard: a light wedge below the mouth, clear of the eyes, that sways (and wags when it hums)
        const wag = t - hmmAt < 1.6 ? Math.round(Math.sin((t - hmmAt) * 7)) : Math.sin(t * 0.8) > 0.85 ? 1 : 0;
        const rows = [[7, 12], [7, 12], [8, 11], [9, 10]];
        rows.forEach(([a, b], j) => { const off = j > 1 ? wag : 0; for (let px = a; px <= b; px++) P(px + off, 16 + j, j === 0 ? '#ffffff' : (px + j) % 3 === 0 ? '#cfcac0' : px > 10 ? '#e2ddd2' : '#f6f2ea'); });
      }
      if (wear === 'Necklace') for (let px = 7; px < 13; px++) P(px, 16 + (px === 9 || px === 10 ? 1 : 0), ['#e84a5a', '#f4d040', '#4a8ad8'][px % 3]);
      if (wear === 'Bell') { for (let px = 7; px < 13; px++) P(px, 16, '#d83a4a'); P(9, 17, '#ffd040'); P(10, 17, '#e8b020'); }
      // little arms
      const wave = Math.sin(t * 1.1) > 0.75 ? 1 : 0;
      P(armL, 15, STEM[1]); P(armR, 15 - (holding === 'Nothing' ? wave : 0), STEM[1]);
      // cap
      const sway = Math.sin(t * 0.7) > 0.85 ? flip : 0;
      const sq = t - poofAt < 0.3 || gig && (t - giggleAt) % 0.3 < 0.15 ? 1 : 0; // the cap squashes as it puffs or giggles
      const shine = Math.floor(t * 6) % 26;
      const inC = (qx, qy) => capTest(qx - sway * (qy < 5 ? 1 : 0), qy - sq);
      for (let py = -2; py < 11 + sq; py++) for (let px = 0; px < N; px++) {
        if (!inC(px, py)) continue;
        // hand-placed light: a lit rim along the top, a soft highlight with a bright spot up on the left,
        // the edge facing the light lit and the far edge and far side in shade
        const up = inC(px, py - 1), lf = inC(px - 1, py), rt = inC(px + 1, py), sx = px + 0.5 - sway * (py < 5 ? 1 : 0), sy = py + 0.5 - sq;
        const hd = ((sx - hlx) / Math.max(2, capW * 0.2)) ** 2 + ((sy - hly) / Math.max(1.4, capH * 0.2)) ** 2;
        const sd = ((sx - hlx) / (capW * 0.6)) ** 2 + ((sy - hly) / (capH * 0.95)) ** 2;
        let col = sd > 1 ? CAP[0] : hd < 1 ? (hd < 0.3 ? CAP[3] : CAP[2]) : CAP[1];
        if (!up) col = sx < cx0 + capW * 0.62 ? CAP[3] : CAP[2];
        else if (!lf && sy < cy1) col = CAP[2];
        else if (!rt) col = CAP[0];
        const v = lit((px + 0.5 - 10) / 9, (py + 0.5 - 6) / 5);
        if (capCol === 'Rainbow') col = v > 0.7 ? '#fff4f8' : RAINBOW[(((py + 2) >> 1) % 6 + 6) % 6];
        if (capCol === 'Starry' && (px * 7 + py * 3) % 11 === 0) col = Math.sin(t * 2 + px) > 0 ? '#fff6c0' : CAP[3];
        if (capCol === 'Gold Leaf' && Math.abs(px + py - shine) < 1) col = '#ffffff';
        if (capShape === 'Crystal Cluster') {
          // each point has a lit face and a shaded face; the light comes from the pointer's side
          const cx2 = px + 0.5 - sway * (py < 5 ? 1 : 0), cy2 = py + 0.5 - sq, side = hovering ? (hoverX < 10 ? -1 : 1) : -1;
          let best = null, bd = 9;
          for (const sp of SPIRES) { const ddx = cx2 - sp[0]; if (inSpire(sp, cx2, cy2) && Math.abs(ddx) < bd) { bd = Math.abs(ddx); best = sp; } }
          if (best) { const ddx = cx2 - best[0]; col = cy2 < best[1] + 1.2 || Math.abs(ddx) < 0.5 ? CAP[3] : (ddx < 0) === (side < 0) ? CAP[2] : CAP[1]; if (cy2 > 9 && !(Math.abs(ddx) < 0.5)) col = CAP[1]; }
          else col = (px + py) % 2 ? '#2a1450' : '#3a1e66';
          if (t - chimeAt < 0.8 && (px * 5 + py * 3 + Math.floor(t * 8)) % 7 === 0) col = '#ffffff';
        }
        if (spots === 'Lichen' && ((px - 6) ** 2 / 4 + (py - 5) ** 2 / 1.6 < 1 || (px - 13) ** 2 / 3 + (py - 4) ** 2 / 1.3 < 1 || (px - 16) ** 2 / 1.5 + (py - 8) ** 2 < 1)) col = (px + py) % 2 ? '#a8b48a' : '#ccd4b0';
        if (capShape === 'Morel' && ((px + (py % 2) * 1) % 2 === 0) && py % 2 === 0) col = CAP[0];
        if (capShape === 'Shaggy' && (px * 2 + py * 3) % 5 === 0 && py > 1) col = CAP[0];
        if (capShape === 'Funnel' && py === 3) col = CAP[3]; else if (capShape === 'Funnel' && py === 4 && Math.abs(px + 0.5 - 10) < 6) col = CAP[0];
        if (spots === 'White Spots' && ((px === 6 && py === 5) || (px === 7 && py === 5) || (px === 6 && py === 6) || (px === 11 && py === 3) || (px === 12 && py === 3) || (px === 14 && py === 7) || (px === 9 && py === 7))) col = '#fff8ec';
        if (spots === 'Freckled' && (px * 7 + py * 5) % 9 === 0) col = CAP[0];
        if (spots === 'Ringed' && (py === 7 || py === 4)) col = CAP[3];
        if (spots === 'Stripes' && (px + 40 - py) % 4 === 0) col = CAP[1] === col ? CAP[2] : CAP[1];
        if (spots === 'Big Dots' && [[5, 5], [6, 5], [5, 6], [6, 6], [13, 3], [14, 3], [13, 4], [14, 4], [10, 7], [11, 7]].some(([a, b]) => a === px && b === py - sq)) col = '#fffaf0';
        if (spots === 'Hearts' && [[5, 5], [7, 5], [5, 6], [6, 6], [7, 6], [6, 7], [12, 3], [14, 3], [12, 4], [13, 4], [14, 4], [13, 5]].some(([a, b]) => a === px && b === py - sq)) col = '#ffe0ea';
        if (spots === 'Speckled Glow' && (px * 5 + py * 11) % 13 === 0) col = Math.sin(t * 2.5 + px * 1.7) > 0 ? '#fffbd0' : CAP[3];
        if (spots === 'Moss Patch' && ((px - 8) ** 2 / 9 + (py - capTop - 1) ** 2 / 2.2 < 1 || (px - 14) ** 2 / 3 + (py - 6) ** 2 / 1.4 < 1)) col = (px + py) % 3 ? '#6ab04a' : '#8ad060';
        if (spots === 'Drips' && !capTest(px, py + 1 - sq) && px % 3 === 1) col = CAP[3];
        P(px, py, col);
      }
      if (legend === 'Crystal') SPIRES.forEach((sp, i) => {
        const ph = (t * 0.55 + i * 0.41) % 1.7;
        if (ph >= 1) return;
        const gy = Math.round(9 - ph * (9 - sp[1] - 0.8)), gx = Math.round(sp[0] - 0.5 - (sp[2] > 1.5 ? 1 : 0) * (hovering && hoverX > 10 ? -1 : 1)) + sway * (gy < 5 ? 1 : 0);
        if (inC(gx, gy)) { P(gx, gy, '#ffffff'); if (inC(gx, gy + 1)) P(gx, gy + 1, '#e8dcff'); }
      });
      if (spots === 'Drips') for (let px = 0; px < N; px++) if (px % 3 === 1 && capTest(px, 9) && !capTest(px, 10)) P(px, 10 + sq + (px % 2), CAP[3]);
      // gills under the cap
      if (capShape !== 'Puffball' && capShape !== 'Cluster') for (let px = 0; px < N; px++) {
        if (capTest(px, 9) && !capTest(px, 10)) P(px, 10 + sq, capShape === 'Morel' ? STEM[0] : CAP[0]);
      }
      if (legend === 'The Elder') for (const [mx, h] of [[4, 2], [8, 3], [13, 2], [16, 1]]) {
        let top = -2;
        while (top < 11 && !inC(mx, top)) top++;
        for (let k = 1; k <= h; k++) P(mx + (k === h && h > 1 ? (mx < 10 ? -1 : 1) : 0), top - k + 1, k === h ? '#a8d870' : '#6aa84a');
        P(mx + 1, top, '#5a9a3e');
      }
      if (wear === 'Bow') { const bx = 15, by = 8 + sq; P(bx, by, WEARS[0]); P(bx + 1, by - 1, WEARS[0]); P(bx + 1, by + 1, WEARS[0]); P(bx - 1, by - 1, WEARS[0]); P(bx - 1, by + 1, WEARS[0]); P(bx, by - 1, WEARS[1]); }
      if (wear === 'Flower Crown') for (let px = 2; px < 18; px += 3) { const fy = 9 + sq - (px > 5 && px < 15 ? 0 : 0); P(px, fy, ['#ff9ac0', '#fff0a0', '#ffffff', '#c8a0ff'][px % 4]); P(px + 1, fy, '#5ab04a'); }
      // something perched on top of the cap
      const ty = capTop - 1 + sq, bob = Math.sin(t * 1.4) > 0.6 ? 1 : 0;
      if (topper === 'Dewdrop') { P(10, ty, '#a8dcff'); P(10, ty - 1, Math.sin(t * 2) > 0.5 ? '#ffffff' : '#cfeaff'); }
      if (topper === 'Ladybug') { const lx = 8 + Math.round(Math.sin(t * 0.5) * 2); sprite(['rkr.', 'rrrk'], lx, ty - 1, { r: '#e83a3a', k: '#1a1418' }); }
      if (topper === 'Snail') sprite(['.ss.', 'sqsb', 'bbbb'], 9, ty - 2, { s: '#d8904a', q: '#a85a2a', b: '#eadcbc' });
      if (topper === 'Sprout') { P(10, ty, '#3a8a30'); P(10, ty - 1, '#3a8a30'); P(9 - bob, ty - 2, '#6ac850'); P(11 + bob, ty - 2, '#6ac850'); }
      if (topper === 'Butterfly') { const bx = 10 + Math.round(Math.sin(t * 0.8) * 3), by = ty - 3 + Math.round(Math.sin(t * 1.7)), open = Math.floor(t * 4) % 2; P(bx, by, '#3a2a30'); P(bx - 1, by - open, '#ffb0e0'); P(bx + 1, by - open, '#ffb0e0'); if (open) { P(bx - 1, by, '#ffe070'); P(bx + 1, by, '#ffe070'); } }
      if (topper === 'Bird') sprite(['.aa.', 'aaeb', 'tcc.'], 9, ty - 2 - bob, { a: '#6ab4f0', e: '#1c1a24', b: '#ffa030', c: '#fff0c8', t: '#3a7ac0' });
      if (topper === 'Moth') { const op = Math.floor(t * 3) % 2; sprite(op ? ['w.w', '.b.', 'w.w'] : ['.w.', 'wbw', '...'], 13, ty - 3, { w: '#e8dcc0', b: '#5a4a3a' }); }
      if (topper === 'Tiny Mushroom') { P(10, ty, '#f4ecd8'); P(9, ty - 1, CAP[1]); P(10, ty - 1, CAP[2]); P(11, ty - 1, CAP[0]); P(10, ty - 2, CAP[3]); }
      if (topper === 'Crown') sprite(['y.y.y', 'yryry', 'yyyyy'], 8, ty - 2, { y: '#ffd040', r: '#e8304a' });
      drawHeld(t);
      if (legend === 'The Elder') {
        // fireflies keep the elder company; hover and they come to the pointer, a hum scatters them
        for (let i = 0; i < 5; i++) {
          const a = t * 0.45 + i * 1.257, r = 8.6 + Math.sin(t * 0.9 + i) + Math.max(0, 1.4 - (t - hmmAt)) * 3.5;
          let fx = 10 + Math.cos(a) * r, fy = 8 + Math.sin(a) * r * 0.7;
          if (ffPull > 0) { fx += (hoverX + Math.cos(t * 2 + i * 1.3) * 1.6 - fx) * ffPull; fy += (hoverY + Math.sin(t * 2 + i * 1.3) * 1.6 - fy) * ffPull; }
          P(Math.round(fx), Math.round(fy), Math.sin(t * 3 + i * 2) > -0.3 ? '#fff27a' : '#b8b050');
        }
      }
    }

    // what the viewer grows: sprouts on the moss and drifting spores
    let poofAt = -9, giggleAt = -9;
    // the legendaries' and the clover's own state
    let chimeAt = -9, hmmAt = -9, luckAt = -9, hovering = false, hoverX = 10, hoverY = 8, ffPull = 0, lastFeel = 0;
    const sprouts = [], spores = [];
    function drawLife(t) {
      for (const sp of sprouts) {
        const h = Math.min(3, 1 + Math.floor((t - sp.t0) * 3));
        for (let k = 1; k < h; k++) P(sp.x, sp.y - k, STEM[k === 1 ? 1 : 2]);
        if (h >= 2) { P(sp.x - 1, sp.y - h, CAP[2]); P(sp.x, sp.y - h, CAP[3]); P(sp.x + 1, sp.y - h, CAP[1]); }
        if (h >= 3) P(sp.x, sp.y - h - 1, CAP[2]);
      }
      for (let i = spores.length - 1; i >= 0; i--) {
        const sp = spores[i], k = t - sp.t0;
        if (k > 2.4) { spores.splice(i, 1); continue; }
        const px = Math.round(sp.x + sp.vx * k + Math.sin(k * 2 + sp.p) * 0.7), py = Math.round(sp.y - sp.vy * k);
        if ((k < 1.8 || (Math.floor(k * 6) + i) % 2) && py >= -BR) P(px, py, capCol === 'Rainbow' ? RAINBOW[i % 6] : legend === 'Crystal' ? (i % 2 ? '#ffffff' : '#d8c4ff') : k < 1 ? CAP[3] : CAP[2]);
      }
    }
    // a pentatonic keyed from the hash's tail (no draw above changes)
    const seedNote = 57 + parseInt(c.hash.slice(-11, -9), 16) % 7, PENT = [0, 2, 4, 7, 9];
    const pn = k => seedNote + 12 * Math.floor(k / 5) + PENT[((k % 5) + 5) % 5];
    let ver = 0;
    function feel(t) {
      const inp = c.input, dtf = Math.min(0.1, Math.max(0, t - lastFeel));
      lastFeel = t;
      hovering = !!legend && inp.inside;
      if (hovering) { hoverX = (inp.x * S - off) / cell; hoverY = (inp.y * S - off) / cell; }
      ffPull = Math.max(0, Math.min(0.85, ffPull + (hovering ? dtf * 0.8 : -dtf * 1.2)));
      for (const p of inp.taps()) {
        const gx = Math.floor((p.x * S - off) / cell), gy = Math.floor((p.y * S - off) / cell);
        if (holding === 'Four-Leaf Clover' && gx >= 12 && gx <= 19 && gy >= 1 && gy <= 15) {
          if (t - luckAt < 0.6) continue;
          luckAt = t; ver++;
          [7, 9, 12, 14].forEach((n, i) => c.sound.note(pn(n), { dur: 0.35, vel: 0.11, wave: 'sine', at: i * 0.07 }));
          continue;
        }
        if (legend === 'Crystal' && gy <= 10 && gx >= 0 && gx < N && capTest(gx, Math.max(0, gy))) {
          // a crystal chime: a ringing chord and a scatter of glints
          if (t - chimeAt < 0.5) continue;
          chimeAt = t; poofAt = t; ver++;
          for (let j = 0; j < 9; j++) spores.push({ x: 2 + j * 2, y: 1 + (j % 3) * 2, vx: (j - 4) * 0.7, vy: 1.5 + (j % 4) * 0.5, p: j * 1.3, t0: t });
          [5, 7, 9, 12].forEach((n, i) => c.sound.note(pn(n), { dur: 1.4 - i * 0.2, vel: 0.1, wave: 'sine', attack: 0.005, at: i * 0.05 }));
          continue;
        }
        if (legend === 'The Elder' && gy <= 19 && gx >= 1 && gx <= 18 && (gy <= 10 ? capTest(gx, Math.max(0, gy)) : gx >= 5 && gx <= 15)) {
          // a slow, low hum, and the beard wags
          if (t - hmmAt < 1.2) continue;
          hmmAt = t; ver++;
          c.sound.note(pn(0) - 12, { dur: 0.6, vel: 0.15, wave: 'triangle', cutoff: 700, attack: 0.06 });
          c.sound.note(pn(2) - 12, { dur: 0.9, vel: 0.13, wave: 'triangle', cutoff: 700, attack: 0.06, at: 0.55 });
          continue;
        }
        if (gy <= 10 && gx >= 0 && gx < N && capTest(gx, Math.max(0, gy))) {
          if (t - poofAt < 0.4) continue;
          poofAt = t; ver++;
          for (let j = 0; j < 9; j++) spores.push({ x: 4 + j * 1.5, y: 2 + (j % 3), vx: (j - 4) * 0.5, vy: 2 + (j % 4) * 0.6, p: j * 1.7, t0: t });
          c.sound.hit('noise', 0.18, { cutoff: 600, dur: 0.35 });
          c.sound.note(pn(5 + (ver % 3)), { dur: 0.6, vel: 0.14, wave: 'sine', attack: 0.04, at: 0.05 });
        } else if (gy > 10 && gy < 19 && gx >= 5 && gx <= 14) {
          // a giggle: three quick rising notes and a wobble
          if (t - giggleAt < 0.7) continue;
          giggleAt = t; ver++;
          for (let k = 0; k < 3; k++) c.sound.note(pn(6 + k + (ver % 2)), { dur: 0.09, vel: 0.13, wave: 'triangle', cutoff: 2400, at: k * 0.11 });
        } else if (gy >= 15) {
          const x = Math.max(-2, Math.min(N + 1, gx));
          // the mound's surface at this column
          let y = 15;
          while (y < N + 2 && ((x + 0.5 - 10) / 10.5) ** 2 + ((y + 0.5 - 20) / 4.6) ** 2 > 1) y++;
          if (y >= N + 2 || (x >= 4 && x <= 15)) continue;
          if (sprouts.length >= 8) sprouts.shift();
          sprouts.push({ x, y: y + 1, t0: t }); ver++;
          c.sound.note(pn(Math.round((x + 3) / 3)), { dur: 0.45, vel: 0.2, wave: 'triangle', cutoff: 1800 });
          c.sound.hit('blip', 0.12, { freq: 1400, at: 0.3 });
        }
      }
    }

    const ctx = c.ctx;
    const cell = Math.max(1, Math.floor(S / N)), off = Math.floor((S - cell * N) / 2);
    // ---------- the legendaries: two one-of-ones, each its own picture on the same 20-cell grid ----------
    // (every roll and trait above is untouched; they only take over the drawing)
    // ===== The Elder (redesign): an Art Nouveau poster after Mucha, on its own block of 48 dots. The elder stands
    // framed by an arch of whiplash mushroom stems before a great halo disc ringed in ochre, the disc patterned in
    // its Woods' own colours, its long beard flowing down in curls, holding its lantern before it; its Ground runs
    // along the foot as an ornamental frieze and its Cheeks show on its face, all in muted sage, ochre and rose
    // with a dark brown line. Fireflies circle it: press and sweep through them to catch them (they glow on your
    // finger), carry them into the halo or to the lantern and let go (each lights a bead on the halo's ring); seven, and it wakes
    // and a ring of light runs out from the lantern across the poster
    if (legend === 'The Elder') return elderPoster();
    function elderPoster() {
      const inp = c.input, E = 48;
      const ce = Math.max(1, Math.floor(S / E)), oe = Math.floor((S - ce * E) / 2), M = Math.ceil(oe / ce) + 1, GE = E + 2 * M;
      const blk = document.createElement('canvas'); blk.width = blk.height = GE;
      const bctx = blk.getContext('2d'), img = bctx.createImageData(GE, GE), buf = new Uint32Array(img.data.buffer), reg = new Uint8Array(GE * GE);
      const hx = h => { const v = parseInt(h.slice(1), 16); return (255 << 24) | ((v & 255) << 16) | (v & 0xff00) | (v >> 16); };
      const mixI = (a, b, k) => { const r = (a & 255) + ((b & 255) - (a & 255)) * k, g2 = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * k, bl = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * k; return (255 << 24) | (Math.round(bl) << 16) | (Math.round(g2) << 8) | Math.round(r); };
      const P = (x, y, col, r) => { x = Math.round(x) + M; y = Math.round(y) + M; if (x >= 0 && y >= 0 && x < GE && y < GE) { buf[y * GE + x] = col; reg[y * GE + x] = r || 0; } };
      const R = (x, y) => { x += M; y += M; return x >= 0 && y >= 0 && x < GE && y < GE ? reg[y * GE + x] : 0; };
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      const spr = (rows, x0, y0, map, r) => rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (map[row[i]] !== undefined) P(x0 + i, y0 + j, map[row[i]], r); });
      const m = x => 47 - x;
      const LINE = hx('#3e2c22'), CREAM = hx('#efe2c2'), CREAM2 = hx('#e6d6b2'), OCHRE = hx('#c99a4a'), OCHRE2 = hx('#a87c36'), SAGE = hx('#8fa07a'), SAGE2 = hx('#6e8462'), ROSE = hx('#c4877a'), ROSE2 = hx('#dcae9a');
      const GOLD = hx('#f6dc8a'), LIGHT = hx('#fff4cc'), FACE = hx('#dcae84'), WHITE = hx('#f8f1e0'), WSTRAND = hx('#cbbd9e');
      // its Woods, as the disc behind it: two ring colours, the motif's colour, the motif
      const WD = { Meadow: ['#a9c2a4', '#bccfb2', '#e2c25a', 'flower'], 'Deep Forest': ['#5f7e64', '#6c8a6e', '#2f4a36', 'leaf'], Dusk: ['#c99a8e', '#b98a8e', '#7a5a78', 'rays'],
        Night: ['#56648a', '#62709a', '#efe2b0', 'moon'], Fog: ['#b4b9b4', '#c4c8c2', '#eeeee8', 'waves'], Autumn: ['#d2a272', '#c69062', '#a8442a', 'leaf'], Snowfall: ['#b2bfcc', '#c2ccd8', '#ffffff', 'snow'],
        Rainy: ['#86949e', '#94a1aa', '#cdd6dc', 'rain'], Blossom: ['#dcb0b4', '#e6c0c2', '#fbeaea', 'flower'], 'Starry Night': ['#3c446e', '#48507c', '#f0dca0', 'stars'], 'Glow Cave': ['#584876', '#645484', '#8ae6d4', 'crystal'] }[woods] || ['#a9c2a4', '#bccfb2', '#e2c25a', 'flower'];
      const DISC = [hx(WD[0]), hx(WD[1])], MOTIF = hx(WD[2]), DX = 24, DY = 19, DR = 16;
      const LX = 24, LY = 29.5, FX = 24, FY = 21;
      const flies = [];
      for (let i = 0; i < 7; i++) flies.push({ x: FX + Math.cos(i) * 17, y: FY + Math.sin(i) * 14, mode: 'free', ph: i * 1.9 });
      let stored = 0, bloomAt = -99, hmmE = -9, ver = 0, kDown = false, kPress = -9, kX = 0, kY = 0, kMoved = 0, hx0 = FX, hy0 = FY, pull = 0, lastE = 0;

      function ground(t, bl) {
        // the cream ground with faint vertical bands, the halo disc in its Woods' colours, ringed in ochre
        for (let y = -M; y < E + M; y++) for (let x = -M; x < E + M; x++) P(x, y, (x + 48) % 6 < 3 ? CREAM : CREAM2, 0);
        for (let y = DY - DR - 1; y <= DY + DR + 1; y++) for (let x = DX - DR - 1; x <= DX + DR + 1; x++) {
          const r = Math.hypot(x + 0.5 - DX, y + 0.5 - DY);
          if (r > DR) continue;
          if (r > DR - 2.2) { P(x, y, r > DR - 0.8 || r < DR - 1.8 ? OCHRE2 : OCHRE, 9); continue; }
          let col = DISC[Math.floor(r / 2.5) % 2];
          if (Math.abs(r - 11) < 0.5) { P(x, y, OCHRE, 9); continue; }
          const k = WD[3], st = Math.floor(t * 6);
          if (k === 'flower' && ((x + 60) % 6 === 0 && (y + 60) % 6 === 3 || ((x + 60) % 6 === 3 && (y + 60) % 6 === 0))) col = MOTIF;
          if (k === 'leaf' && (x + y + 60) % 7 === 0 && (x - y + 60) % 3 === 0) col = MOTIF;
          if (k === 'rays' && Math.abs(Math.sin(Math.atan2(y + 0.5 - DY, x + 0.5 - DX) * 6)) < 0.12) col = MOTIF;
          if (k === 'moon' && inE(x, y, 15, 10, 3.2, 3.2) && !inE(x, y, 16.4, 9.2, 2.8, 2.8)) col = MOTIF;
          if ((k === 'moon' || k === 'stars') && (x * 7 + y * 13) % 29 === 0 && Math.sin(t * 2 + x) > -0.3) col = k === 'stars' ? MOTIF : LIGHT;
          if (k === 'waves' && (y + 60) % 4 === 0 && Math.sin(x * 0.7 + y + t) > -0.2) col = MOTIF;
          if (k === 'snow' && (x * 5 + ((y - st) % 48 + 48) * 3) % 17 === 0) col = MOTIF;
          if (k === 'rain' && (x + 60) % 3 === 0 && ((y - st * 2 + x * 5) % 6 + 6) % 6 < 2) col = MOTIF;
          if (k === 'crystal' && (x * 3 + y * 5) % 19 === 0) col = Math.sin(t * 1.5 + x) > 0 ? MOTIF : DISC[1];
          P(x, y, col, 9);
        }
        // seven beads on the halo's ring, one lit for each firefly in the lantern
        for (let k = 0; k < 7; k++) { const a = -0.9 + k * 0.3, x = Math.round(DX - 0.5 + Math.sin(a) * (DR - 1.2)), y = Math.round(DY - 0.5 - Math.cos(a) * (DR - 1.2)); const lit = bl > 0 || k < stored; P(x, y, lit ? LIGHT : OCHRE2, 9); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(x + dx, y + dy, lit ? GOLD : LINE, 9); }
        // the arch of whiplash mushroom stems up both sides, a little cap nodding at the top of each
        for (let i = 0; i <= 400; i++) { const s2 = i / 400, x = 5.2 + Math.sin(s2 * Math.PI * 1.6) * 2.6 + s2 ** 5 * 9, y = 43 - s2 * 38; for (const [dx, col] of [[0, SAGE2], [1, SAGE], [2, SAGE]]) { P(Math.floor(x) + dx, Math.floor(y), col, 6); P(m(Math.floor(x) + dx), Math.floor(y), col, 6); } }
        for (const [x0, sd] of [[16, 1], [31, -1]]) spr(['.rrrr.', 'rRRRrr', 'rrrrrr', '..ss..'], x0 - 2, 2, { r: ROSE, R: ROSE2, s: SAGE2 }, 6);
        // its Ground, as the frieze along the foot
        for (let y = 40; y < 44; y++) for (let x = 3; x < 45; x++) P(x, y, y === 40 || y === 43 ? OCHRE2 : OCHRE, 7);
        for (let x0 = 5; x0 < 43; x0 += 7) {
          const g = ground;
          if (g === 'Moss') spr(['.ss.', 'sSSs'], x0, 41, { s: SAGE, S: SAGE2 }, 7);
          else if (g === 'Clover') spr(['s.s', '.S.'], x0, 41, { s: SAGE, S: SAGE2 }, 7);
          else if (g === 'Pebbles') spr(['.cc.', 'cCCc'], x0, 41, { c: CREAM, C: CREAM2 }, 7);
          else if (g === 'Fallen Leaves') spr(['rR.', '.rR'], x0, 41, { r: hx('#b8582e'), R: hx('#8a3a1e') }, 7);
          else if (g === 'Daisies') spr(['w.w', '.y.'], x0, 41, { w: WHITE, y: GOLD }, 7);
          else if (g === 'Roots') spr(['l..l', '.ll.'], x0, 41, { l: LINE }, 7);
          else if (g === 'Puddle') spr([Math.floor(t * 2 + x0) % 2 ? 'bb.b' : 'b.bb', '.bb.'], x0, 41, { b: hx('#6a8eae') }, 7);
          else if (g === 'Glowing Moss') spr(['.g.', 'gGg'], x0, 41, { g: Math.sin(t * 1.4 + x0) > 0 ? hx('#7ae0cc') : SAGE2, G: hx('#c8fff4') }, 7);
          else if (g === 'Fairy Ring') spr(['rr', 'cc'], x0, 41, { r: ROSE, c: CREAM }, 7);
          else spr(['.ss.', 'sSSs'], x0, 41, { s: SAGE, S: SAGE2 }, 7);
        }
      }
      function figure(t, bl) {
        const wakeE = bl > 0;
        // its robe, sage with an ochre hem, behind the beard
        for (let y = 21; y < 40; y++) { const w = 4.5 + (y - 21) * 0.42; for (let x = 10; x < 38; x++) { const X = x + 0.5 - 24; if (Math.abs(X) > w) continue; const fold = Math.abs((Math.abs(X) - (y - 21) * 0.18 + 40) % 3.2 - 1.6) < 0.5; P(x, y, Math.abs(X) > w - 1.2 ? OCHRE : fold ? SAGE2 : SAGE, 4); } }
        // the face, serene, its eyes shut (open when it wakes), a knot of a nose, its cheeks, heavy white brows
        for (let y = 13; y < 24; y++) for (let x = 18; x < 30; x++) if (inE(x, y, 24, 18.6, 4.6, 3.8)) P(x, y, FACE, 2);
        for (const [x, y] of [[20, 15], [21, 15], [22, 15], [19, 16], [20, 16]]) { P(x, y - (wakeE ? 1 : 0), WHITE, 2); P(m(x), y - (wakeE ? 1 : 0), WHITE, 2); }
        // (its eyes: dark heavy lids while it sleeps; two wide dark eyes with a gold light, under raised brows, when it wakes)
        if (wakeE) for (const [x, y, col] of [[20, 16, LINE], [21, 16, LINE], [20, 17, LINE], [21, 17, GOLD], [20, 18, LINE], [21, 18, LINE]]) { P(x, y, col, 2); P(m(x), y, col, 2); }
        else for (const [x, y] of [[19, 17], [20, 17], [21, 17], [22, 17], [20, 18], [21, 18]]) { P(x, y, LINE, 2); P(m(x), y, LINE, 2); }
        for (const [x, y] of [[23, 17], [23, 18], [23, 19], [24, 20]]) P(x, y, hx('#7a4e32'), 2);
        P(23, 20, hx('#7a4e32'), 2);
        const CH = { Rosy: [[20, 20, ROSE], [21, 20, ROSE]], 'Big Blush': [[19, 20, ROSE], [20, 20, ROSE2], [21, 20, ROSE], [20, 21, ROSE], [21, 21, ROSE]], Freckled: [[19, 20, OCHRE2], [21, 20, OCHRE2], [20, 21, OCHRE2]],
          Hearts: [[19, 20, hx('#c8505e')], [21, 20, hx('#c8505e')], [20, 21, hx('#c8505e')], [20, 20, hx('#e07a84')]], 'Glow Spots': [[20, 20, Math.sin(t * 1.5) > 0 ? hx('#8af0dc') : hx('#5ab8a8')]] }[cheekStyle] || [];
        for (const [x, y, col] of CH) { P(x, y, col, 2); P(m(x), y, col, 2); }
        // the cap: broad, rose with a pale crown, an ochre band of lichen rings round it, the gills beneath
        for (let y = 4; y < 20; y++) for (let x = 9; x < 39; x++) {
          const X = x + 0.5 - 24, Y = y + 0.5, top = 6.6 + (X / 10) ** 2 * 4.6, bot = 13.8 + (X / 10) ** 2 * 2;
          if (Math.abs(X) > 10.2 || Y < top || Y > bot) continue;
          const d = bot - Y;
          let col = Y - top < 2.4 ? ROSE2 : ROSE;
          if (d < 3.2 && d >= 1.4) col = (Math.floor(X + 40) % 3 === 0) ? SAGE : OCHRE;
          if (d < 1.4) col = (x % 2) ? OCHRE2 : LINE;
          P(x, y, col, 1);
        }
        // the moustache and the long beard, flowing down in waves and curling out at the foot (it wags when it hums)
        const wag = t - hmmE < 1.6 ? Math.round(Math.sin((t - hmmE) * 7)) : 0;
        for (let x = 20; x < 28; x++) P(x, 21, WHITE, 3);
        for (const x of [19, 20, 21]) { P(x, 22, WHITE, 3); P(m(x), 22, WHITE, 3); }
        for (let y = 22; y < 40; y++) { const hw = 3 + (y - 22) * 0.3, sh = y > 30 ? wag : 0; for (let x = 10; x < 38; x++) { const X = x + 0.5 - 24; if (Math.abs(X) > hw) continue; P(x + sh, y, (Math.round(X + Math.sin(y * 0.5) * 1.6) + 40) % 3 === 0 ? WSTRAND : WHITE, 3); } }
        for (const sd of [-1, 1]) { const cx = 24 + sd * 8.5; for (let y = 34; y < 41; y++) for (let x = cx - 4; x <= cx + 4; x++) { const r = Math.hypot(x + 0.5 - cx - 0.5, y + 0.5 - 37.5); if (r < 3.4 && r > 2.2) P(x, y, WHITE, 3); else if (r <= 2.2 && r > 1.2 && (sd > 0 ? x > cx : x < cx)) P(x, y, WSTRAND, 3); } }
        // its hands, and the lantern it holds before it
        P(20, 29, FACE, 2); P(20, 30, FACE, 2); P(m(20), 29, FACE, 2); P(m(20), 30, FACE, 2);
        const fill = Math.min(1, stored / 7), on = 0.5 + 0.5 * Math.sin(t * 2.3);
        const PAP = wakeE ? LIGHT : fill > 0.5 ? (on > 0.5 ? hx('#fff0b8') : hx('#ffe6a0')) : fill > 0 ? hx('#f8d888') : hx('#ecc070'), RIB = hx('#b07a36');
        spr(['.lll.', 'lpppl', 'lpRpl', 'lpppl', 'lpRpl', 'lpppl', '.lll.'], 22, 26, { l: LINE, p: PAP, R: RIB }, 5);
        P(24, 25, LINE, 5); P(23, 25, LINE, 5);
      }
      // the line: a dark brown edge round every shape against the ground
      function keyline() {
        const sk = reg.slice();
        for (let y = 1; y < GE - 1; y++) for (let x = 1; x < GE - 1; x++) {
          const i = y * GE + x, a = sk[i];
          if (a === 4) { if (sk[i - 1] === 3 || sk[i + 1] === 3 || sk[i - GE] === 3 || sk[i + GE] === 3) buf[i] = LINE; continue; }
          if (a > 0 && a < 9) continue;
          for (const j of [i - 1, i + 1, i - GE, i + GE]) { const b = sk[j]; if (b > 0 && b < 9 && b !== a) { buf[i] = LINE; break; } }
        }
      }
      function frameP() {
        for (let y = -M; y < E + M; y++) for (let x = -M; x < E + M; x++) {
          const ring = Math.min(x, y, E - 1 - x, E - 1 - y);
          if (ring > 2) continue;
          buf[(y + M) * E + 0 + (y + M) * (GE - E) + x + M] = ring === 0 || ring === 2 ? LINE : ring < 0 ? CREAM2 : OCHRE;
        }
        for (const [cx, cy] of [[2, 2], [45, 2], [2, 45], [45, 45]]) spr(['.o.', 'oRo', '.o.'], cx - 1, cy - 1, { o: OCHRE2, R: ROSE });
      }
      function glows(t, bl) {
        const fill = Math.min(1, stored / 7), rad = 5 + fill * 4 + (bl > 0 ? 2 : 0);
        for (let y = Math.floor(LY - rad); y <= LY + rad; y++) for (let x = Math.floor(LX - rad); x <= LX + rad; x++) { const d = Math.hypot(x + 0.5 - LX, (y + 0.5 - LY) * 1.1), i = (y + M) * GE + x + M; if (d < rad && d > 2.5 && i >= 0 && i < buf.length && buf[i] !== LINE && reg[i] !== 5) buf[i] = mixI(buf[i], LIGHT, d < rad * 0.6 ? 0.4 : 0.2); }
        // the wake: one clean ring of light running out from the lantern
        if (t - bloomAt < 3) { const rr = Math.min((t - bloomAt) * 18, 27); for (let y = -M; y < E + M; y++) for (let x = -M; x < E + M; x++) { const d = Math.abs(Math.hypot(x + 0.5 - LX, y + 0.5 - LY) - rr); if (d < 2.2) buf[(y + M) * GE + x + M] = d < 1.3 ? hx('#e8b438') : LIGHT; } }
        for (const f of flies) {
          if (f.mode === 'lantern') continue;
          const x = Math.round(f.x - 0.5), y = Math.round(f.y - 0.5), caught = f.mode === 'caught', lit = caught || bl > 0 || Math.sin(t * 3 + f.ph) > -0.3;
          // each a 2x2 spark with a cell of glow round it; on your finger a wider glow
          const rr = caught ? 2.6 : 1.6;
          for (let dy = -3; dy <= 4; dy++) for (let dx = -3; dx <= 4; dx++) { const d = Math.hypot(dx - 0.5, dy - 0.5); if (d > rr + 0.6 || (dx >= 0 && dx <= 1 && dy >= 0 && dy <= 1)) continue; const i = (y + dy + M) * GE + x + dx + M; if (i >= 0 && i < buf.length && x + dx + M >= 0 && x + dx + M < GE) buf[i] = mixI(buf[i], lit ? (d < 1.7 ? hx('#ffe860') : GOLD) : OCHRE, lit ? (d < 1.7 ? 0.85 : 0.55) : 0.4); }
          for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) P(x + dx, y + dy, lit ? hx('#fffde8') : OCHRE2, 0);
        }
      }
      function feelE(t) {
        const dt = Math.min(0.1, Math.max(0, t - lastE)); lastE = t;
        const hov = inp.inside;
        if (hov) { hx0 = (inp.x * S - oe) / ce; hy0 = (inp.y * S - oe) / ce; }
        pull = Math.max(0, Math.min(0.85, pull + (hov ? dt * 0.8 : -dt * 1.2)));
        const down = inp.inside && inp.down, pressed = down && !kDown, released = !down && kDown;
        if (pressed) { kPress = t; kX = hx0; kY = hy0; kMoved = 0; }
        if (down) kMoved = Math.max(kMoved, Math.hypot(hx0 - kX, hy0 - kY));
        inp.taps();
        let prev = null, caughtN = 0;
        flies.forEach((f, i) => {
          const k = t - bloomAt;
          if (f.mode === 'free' && k < 6) {
            const a = k * 2.4 + i * 0.9, r = Math.min(19, k * 14 + 2);
            f.x += (FX + Math.cos(a) * r - f.x) * 0.5; f.y += (FY + 4 + Math.sin(a) * r * 0.85 - f.y) * 0.5;
          } else if (f.mode === 'free') {
            const a = t * 0.4 + i * 0.9, r = 18.5 + Math.sin(t * 0.9 + i) * 1.6 + Math.max(0, 1.4 - (t - hmmE)) * 3;
            let tx = FX + Math.cos(a) * r, ty = FY + Math.sin(a) * r * 0.9;
            if (pull > 0 && !down) { tx += (hx0 + Math.cos(t * 2 + i * 1.3) * 2.6 - tx) * Math.min(1, pull * 1.15); ty += (hy0 + Math.sin(t * 2 + i * 1.3) * 2.6 - ty) * Math.min(1, pull * 1.15); }
            f.x += (tx - f.x) * 0.12; f.y += (ty - f.y) * 0.12;
            if (down && Math.hypot(f.x - hx0, f.y - hy0) < 7) { f.mode = 'caught'; ver++; c.sound.note(pn(10 + i % 5), { dur: 0.15, vel: 0.08, wave: 'sine' }); }
          }
          if (f.mode === 'caught') {
            const lead = prev || { x: hx0, y: hy0 };
            f.x += (lead.x + (prev ? -1.2 : 0) - f.x) * (prev ? 0.35 : 0.5); f.y += (lead.y + (prev ? 1.4 : 0) - f.y) * (prev ? 0.35 : 0.5);
            prev = f; caughtN++;
          }
        });
        if (released) {
          if (caughtN && (Math.hypot(hx0 - LX, hy0 - LY) < 7 || Math.hypot(hx0 - DX, hy0 - DY) < DR)) {
            flies.forEach(f => { if (f.mode === 'caught') { f.mode = 'lantern'; stored++; } }); ver++;
            [0, 4, 7].forEach((n, i) => c.sound.note(pn(n + stored), { dur: 0.4, vel: 0.1, wave: 'sine', at: i * 0.06 }));
            if (stored >= 7) {
              bloomAt = t;
              flies.forEach((f, i) => { f.mode = 'free'; f.x = LX + Math.cos(i) * 2; f.y = LY + Math.sin(i) * 2; });
              [0, 2, 4, 7, 9, 12, 14].forEach((n, i) => c.sound.note(pn(n), { dur: 1.2, vel: 0.09, wave: 'sine', at: i * 0.09 }));
              c.sound.note(pn(0) - 12, { dur: 1.6, vel: 0.13, wave: 'triangle', cutoff: 700, attack: 0.1 });
            }
          } else if (caughtN) flies.forEach(f => { if (f.mode === 'caught') f.mode = 'free'; });
          else if (t - kPress < 0.3 && kMoved < 2 && t - hmmE > 1.2) {
            // a tap (a short, still press): a slow, low hum, and its beard wags
            hmmE = t; ver++;
            c.sound.note(pn(0) - 12, { dur: 0.6, vel: 0.15, wave: 'triangle', cutoff: 700, attack: 0.06 });
            c.sound.note(pn(2) - 12, { dur: 0.9, vel: 0.13, wave: 'triangle', cutoff: 700, attack: 0.06, at: 0.55 });
          }
        }
        // after it has woken, the lantern lets them all go again
        if (stored >= 7 && t - bloomAt > 6) { stored = 0; ver++; }
        kDown = down;
      }
      let stepE = '';
      function renderE(t) {
        feelE(t);
        const k = Math.floor(t * 6), key = k + ':' + ver + ':' + (kDown ? Math.round(hx0) + ',' + Math.round(hy0) : '');
        if (key === stepE) return;
        stepE = key;
        const tq = k / 6, kb = t - bloomAt, bl = kb < 6 ? Math.min(1, (6 - kb) / 1.5) : 0;
        reg.fill(0);
        ground(tq, bl);
        figure(tq, bl);
        keyline();
        glows(tq, bl);
        frameP();
        bctx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(blk, oe - M * ce, oe - M * ce, GE * ce, GE * ce);
      }
      renderE(0);
      return t => renderE(t);
    }
    if (legend) return legendKin();
    function legendKin() {
      const inp = c.input;
      const bay = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], dth = (x, y) => (bay[((y + 64) & 3) * 4 + ((x + 64) & 3)] + 0.5) / 16;
      const pick = (cols, f, x, y) => cols[Math.max(0, Math.min(cols.length - 1, Math.floor(f * (cols.length - 1) + dth(x, y))))];
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      const blinkAtT = t => ((t + blinkAt) % blinkEvery) < 0.15;
      let hoverK = 0;
      function stemAndFace(t, gig) {
        for (let py = 9; py < 18; py++) for (let px = 3; px < 17; px++) {
          const hw = stemHw(py), X = px + 0.5 - 10;
          if (Math.abs(X) > hw) continue;
          const v = lit(X / hw, (py - 14) / 6) + (py === 17 ? -0.6 : 0);
          P(px, py, py === 11 ? STEM[0] : rampAt(STEM, v));
        }
        drawFace(t, gig, blinkAtT(t));
        const wave = Math.sin(t * 1.1) > 0.75 ? 1 : 0;
        P(armL, 15, STEM[1]); P(armR, 15 - (holding === 'Nothing' ? wave : 0), STEM[1]);
      }

      // ===== Crystal (pass 3): a kin grown of amethyst. Its cap is a cluster of three crystal points with hard lit and
      // shaded planes, a gem burns in its forehead, and it stands in a geode: a dark ring of crystal teeth all round
      // the frame. Your pointer is the light: the forehead gem splits it into a five-band rainbow that runs to the wall
      const AM = ['#1e0a44', '#3a1678', '#5e30aa', '#8e64dc', '#c4a6ff', '#f2e8ff'];
      const FIRE = ['#ff6a8a', '#ffd25a', '#7aff9a', '#5ac8ff', '#c88aff'];
      const BEAM = ['#ff4a5a', '#ffa030', '#ffe84a', '#4ae07a', '#4aa8ff'];
      // the geode's ring: teeth of crystal pointing in from every edge (where each one is, worked out once)
      const GEO = new Map(), geoCan = [];
      function geodeCell(x, y) {
        const key = (x + 40) * 200 + y + 40;
        let v = GEO.get(key);
        if (v !== undefined) return v;
        v = 0;
        for (let k = 0; k < 4; k++) {
          const along = [x, y, 19 - x, 19 - y][k], depth = [y, 19 - x, 19 - y, x][k];
          if (depth < 0) { v = 1; break; }
          const slot = Math.floor((along + 40 + k * 2) / 5), off = ((along + 40 + k * 2) % 5) - 2, len = 1.6 + ((slot * 7 + k * 3) % 3) * 0.9;
          if (depth === 0) v = Math.max(v, 2);
          else if (depth < len * (1 - Math.abs(off) / 2.1)) { const tip = len > 2.4 && Math.abs(off) < 0.6 && depth >= len * (1 - Math.abs(off) / 2.1) - 1; v = Math.max(v, tip ? 4 : off < 0 ? 3 : 2); }
        }
        GEO.set(key, v);
        return v;
      }
      function geode(x, y, t) {
        const v = geodeCell(x, y);
        if (v === 1) return '#0e0718';
        if (v === 4) return AM[3];
        if (v === 3) return AM[1];
        if (v === 2) return '#140a24';
        // the hollow: deep violet, glowing toward the middle, a few points of light
        const g = Math.max(0, 1.1 - Math.hypot(x + 0.5 - 10, (y + 0.5 - 6) * 0.9) / 11) + 0.06 * (Math.round(Math.sin(t * 1.3)));
        return pick(['#1a0c3a', '#2e1660', '#4a2a8c', '#6a44b8', '#8a64d4'], g, x, y);
      }
      // the cap: three crystal points [x, tip row, half width], each a hexagonal prism with a lit and a shaded plane
      const PRISMS = [[4.4, 3, 2.6], [15.6, 2, 2.6], [10, 0, 3.4]];
      const inPrism = (pr, X, Y) => Y >= pr[1] && Y < 9.6 && Math.abs(X - pr[0]) <= pr[2] * Math.min(1, (Y - pr[1]) / (pr[2] * 0.9) + 0.15);
      const capW = py => { let w = -1; for (const pr of PRISMS) { const Y = py + 0.5; if (Y >= pr[1] && Y < 9.6) w = Math.max(w, Math.abs(pr[0] - 10) + pr[2]); } return w; };
      const onCap = (x, y) => PRISMS.some(pr => inPrism(pr, x + 0.5, y + 0.5));
      function crystal(t) {
        // (the geode is painted once for each of its three pulse levels, then copied in)
        const lvl = Math.round(Math.sin(t * 1.3)) + 1;
        if (!geoCan[lvl]) { const cv = document.createElement('canvas'); cv.width = cv.height = W; const gg = cv.getContext('2d'); for (let py = -BR; py < N + BR; py++) for (let px = -BR; px < N + BR; px++) { gg.fillStyle = geode(px, py, (lvl - 1) * Math.PI / 2 / 1.3); gg.fillRect(px + BR, py + BR, 1, 1); } geoCan[lvl] = cv; }
        g.drawImage(geoCan[lvl], 0, 0);
        // the light: your pointer, or left alone a light drifting over the geode; its beam strikes the forehead gem
        const lx = hovering ? hoverX : 10 + Math.cos(t * 0.35) * 8, ly = hovering ? hoverY : 3 + Math.sin(t * 0.5) * 2;
        const gx0 = 10, gy0 = 10.5, ddx = gx0 - lx, ddy = gy0 - ly, dl = Math.hypot(ddx, ddy) || 1;
        // (the rainbow runs on from the gem, away from the light, but kept to the sides so it crosses the hollow)
        const ux = dl > 1.5 ? ddx / dl : 0.7, uy = dl > 1.5 ? ddy / dl : 0.7;
        const gig = t - giggleAt < 0.6;
        stemAndFace(t, gig);
        drawHeld(t);
        drawGround(t);
        // the forehead gem, and the light's beam to it
        for (let s2 = 0; s2 < dl - 1.5; s2 += 1) { const x = Math.round(lx + (ddx / dl) * s2), y = Math.round(ly + (ddy / dl) * s2); if (!onCap(x, y) && (x + y + Math.floor(t * 6)) % 2) P(x, y, '#fff6d8'); }
        P(9, 10, '#5af0ff'); P(10, 10, '#c8ffff'); P(9, 11, '#2ab0d8'); P(10, 11, '#5af0ff');
        // the cap: three crystal points, each lit on the side the light comes from and shaded on the other; a gleam
        // sweeps up them, and they flash white when chimed
        const sq = t - poofAt < 0.3 ? 1 : 0, chime = t - chimeAt < 0.8, litLeft = lx < 10;
        for (const pr of PRISMS) {
          for (let y = -1; y < 11; y++) for (let x = 0; x < N; x++) {
            const X = x + 0.5, Y = y + 0.5 - sq;
            if (!inPrism(pr, X, Y)) continue;
            const lp = (X < pr[0]) === litLeft, edge = !inPrism(pr, X - 1, Y) || !inPrism(pr, X + 1, Y) || !inPrism(pr, X, Y - 1);
            let col = Y < pr[1] + pr[2] * 0.9 ? (lp ? AM[5] : AM[3]) : lp ? AM[4] : AM[2];
            if (lp && Math.abs(X - pr[0]) < 0.5) col = AM[5];
            if (edge) col = AM[0];
            const gl = ((Math.floor(t * 5) + Math.round(pr[0])) % 14) - 2;
            if (!edge && lp && Math.abs(X - pr[0]) < 0.5 && y === gl) col = '#ffffff';
            P(x, y, col);
          }
          if (chime) {
            // a sparkle running up the point, from its foot to its tip
            const k = (t - chimeAt) / 0.8, sy = Math.round(9 - k * (9 - pr[1])) + sq, sx = Math.round(pr[0] - 0.5);
            P(sx, sy, '#ffffff'); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(sx + dx, sy + dy, AM[5]);
          }
        }
        // the rainbow, last and on top: five bands side by side, one colour each, from the forehead gem to the wall,
        // turning with your light (it passes behind the eyes and mouth); grown crystals it crosses flash and ring
        const hit = new Set();
        for (let b = 0; b < 5; b++) {
          const ox = -uy * (b - 2), oy = ux * (b - 2);
          for (let s2 = 1.5; s2 < 30; s2 += 0.5) {
            const x = Math.round(gx0 - 0.5 + ux * s2 + ox), y = Math.round(gy0 - 0.5 + uy * s2 + oy);
            if (x < -BR || y < -BR || x >= N + BR || y >= N + BR) break;
            if (geodeCell(x, y) > 0) { P(x, y, b === 2 ? '#ffffff' : BEAM[b]); break; }
            hit.add(x + ',' + y);
            if (x >= 6 && x <= 14 && y >= 10 && y <= 15) continue;
            P(x, y, BEAM[b]);
          }
        }
        for (const g2 of grown) {
          const k = Math.min(1, (t - g2.t0) / 0.5);
          let lit = false;
          for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]]) if (hit.has((g2.x + dx) + ',' + (g2.y + dy))) lit = true;
          if (lit && !g2.lit) { g2.flash = t; c.sound.note(pn(5 + g2.n), { dur: 0.9, vel: 0.09, wave: 'sine', attack: 0.005 }); }
          g2.lit = lit;
          const h3 = k < 1 ? 2 : 3, y0 = g2.y + 3 - h3, white = t - g2.flash < 0.17;
          for (let j = -1; j <= h3; j++) for (let i = -1; i <= 2; i++) if (j < 0 || j >= h3 || i < 0 || i > 1) P(g2.x + i, y0 + j, '#120826');
          const ROWS = ['wl', 'lm', 'md'].slice(3 - h3), CC = { w: AM[5], l: AM[4], m: AM[3], d: AM[2] };
          ROWS.forEach((r, j) => { for (let i = 0; i < 2; i++) P(g2.x + i, y0 + j, white ? '#ffffff' : lit && j === 0 ? '#ffffff' : CC[r[i]]); });
          const rk = (t - g2.flash) / 0.5;
          if (rk >= 0 && rk < 1) { const rr = 1.5 + rk * 2.5; for (let a2 = 0; a2 < 12; a2++) { const an = a2 * Math.PI / 6; P(Math.round(g2.x + 1 + Math.cos(an) * rr), Math.round(y0 + 1 + Math.sin(an) * rr), BEAM[a2 % 5]); } }
        }
        // sparks of colour in the crystal, and four-point twinkles off it
        for (let i = 0; i < 3; i++) { const k = Math.floor(t * 3 + i * 7.3); if ((k + i) % 2) continue; const fx = 3 + (k * 7 + i * 5) % 14, fy = 3 + (k * 3 + i) % 5; if (onCap(fx, fy)) P(fx, fy + sq, FIRE[(k + i) % 5]); }
        for (const [x, y, ph] of [[1, 1, 0], [18, 1, 2.1], [13, 0, 4.2]]) { if (Math.sin(t * 2.4 + ph) < 0.4) continue; P(x, y, '#ffffff'); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(x + dx, y + dy, AM[4]); }
      }

      // ===== The Elder: the old one of the wood, too big for the frame, under a cap grown over with moss and fungi =====
      const BARK = ['#3a2e24', '#54442f', '#6e5c40', '#8e7a58'], ELD = ['#3a2620', '#54382a', '#6e4c36', '#8e6a4c', '#b08c6a'];
      const TRUNK = shadeHex(SKY[3], 0.45), TRUNK2 = shadeHex(SKY[3], 0.3), RAY = '#fff6d0';
      function shadeHex(h, f) { const v = parseInt(h.slice(1), 16); return '#' + [16, 8, 0].map(s => Math.round(((v >> s) & 255) * f).toString(16).padStart(2, '0')).join(''); }
      function mixHex(a, b, k) { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); return '#' + [16, 8, 0].map(s => Math.round(((A >> s) & 255) * (1 - k) + ((B >> s) & 255) * k).toString(16).padStart(2, '0')).join(''); }
      const capAt = (px, py) => { const X = px + 0.5 - 10.2, Y = py + 0.5; const top = 1.6 + (X / 13) ** 2 * 7.5, bot = 9.4 + (X / 12.5) ** 2 * 4.2; return Y >= top && Y <= bot && Math.abs(X) < 13.4; };
      // the elder's scenery and its body don't move (except in the moment the wood wakes): each is painted once and
      // copied in; what moves is drawn over them every step
      let eldA = null, eldB = null;
      const snap = () => { const cv = document.createElement('canvas'); cv.width = cv.height = W; cv.getContext('2d').drawImage(can, 0, 0); return cv; };
      function elderScenery(t) {
        // the woods behind, in its own Woods' colours: calm bands of dusk and two great trunks
        // (each band's colour, and its colour in a shaft of light, worked out once per frame)
        const BC = [0, 0, 2, 2, 4].map(k2 => mixHex(SKY[k2], '#06080e', bloom > 0 ? 0.35 - 0.25 * bloom : 0.5)), RC = BC.map(c0 => mixHex(c0, RAY, 0.1));
        // (painted a row at a time: the band, the two trunks, and the one faint shaft of light)
        for (let py = -BR; py < N + BR; py++) {
          const band = py < 4 ? 0 : py < 9 ? 1 : py < 15 ? 2 : py < 17 ? 3 : 4, tl = Math.ceil(1 - (py > 14 ? (py - 14) * 0.6 : 0)), tr = Math.floor(19 + (py > 14 ? (py - 14) * 0.6 : 0));
          g.fillStyle = BC[band]; g.fillRect(0, py + BR, W, 1);
          g.fillStyle = TRUNK; g.fillRect(0, py + BR, Math.max(0, tl + BR), 1); g.fillRect(tr + 1 + BR, py + BR, Math.max(0, W - (tr + 1 + BR)), 1);
          for (let px = -BR; px < N + BR; px++) if ((px < tl || px > tr) && (px + py) % 4 === 0) P(px, py, TRUNK2);
        }
        // mossy ground with roots
        for (let py = 15; py < N + BR; py++) for (let px = -BR; px < N + BR; px++) { const e = ((px + 0.5 - 10) / 13) ** 2 + ((py + 0.5 - 21) / 5.6) ** 2; if (e <= 1) P(px, py, e < 0.5 ? MOSS[0] : MOSS[1]); }
        for (const [px, py] of [[2, 17], [1, 18], [0, 18], [17, 17], [18, 18], [19, 18], [3, 18]]) P(px, py, BARK[1]);
      }
      function elderBody(t) {
        // its stem: wide old bark
        for (let py = 9; py < 19; py++) for (let px = 3; px < 17; px++) {
          const hw = 4.6 + Math.max(0, py - 15) * 0.5, X = px + 0.5 - 10;
          if (Math.abs(X) > hw) continue;
          let col = pick(BARK, 0.62 - X / hw * 0.4 - (py - 9) * 0.02, px, py);
          if ((px * 3 + Math.floor(py / 2)) % 5 === 0) col = BARK[0];
          P(px, py, col);
        }
        // the cap: broad and drooping, weathered, lichen on it, moss over its top, toadstools and shelf fungi growing
        // on it, moss hanging from its rim
        for (let py = -2; py < 15; py++) for (let px = -BR; px < N + BR; px++) {
          if (!capAt(px, py)) continue;
          const X = px + 0.5 - 10.2, top = 1.6 + (X / 13) ** 2 * 7.5, bot = 9.4 + (X / 12.5) ** 2 * 4.2, v = (py + 0.5 - top) / (bot - top);
          let col = v < 0.5 ? ELD[3] : ELD[2];
          if (py + 0.5 - top < 1.2) col = MOSS[0];
          if (((px - 3) ** 2 / 4 + (py - 6) ** 2 / 1.5 < 1) || ((px - 13) ** 2 / 3 + (py - 5) ** 2 / 1.2 < 1) || ((px - 17) ** 2 / 1.6 + (py - 9) ** 2 < 1)) col = '#a8b48a';
          if (bot - (py + 0.5) < 1) col = ELD[0];
          P(px, py, col);
        }
        for (const [mx, h] of [[2, 2], [6, 3], [11, 2], [15, 3], [19, 1]]) { let top = -3; while (top < 12 && !capAt(mx, top)) top++; for (let k = 1; k <= h; k++) P(mx + (k === h && h > 1 ? (mx < 10 ? -1 : 1) : 0), top - k, k === h ? '#a8d870' : '#6aa84a'); }
        // two little toadstools and a shelf fungus on its cap
        const TS = { r: '#e8484a', w: '#fff6ea', s: '#f0e2c8' };
        if (bloom > 0 && Math.floor(t * 4) % 2) { TS.r = '#ff9a9a'; TS.w = '#ffffff'; }
        for (const [x0, y0] of [[8, 0], [13, 0]]) { let top = -3; while (top < 12 && !capAt(x0 + 1, top)) top++; [['.rr.', 'rwrr'], ['.s..']].flat().forEach((r, j) => { for (let i = 0; i < 4; i++) if (TS[r[i]]) P(x0 + i - 1, top - 3 + j + (x0 === 13 ? 1 : 0), TS[r[i]]); }); }
        for (const [x, y] of [[-1, 9], [0, 9], [1, 9], [-1, 10], [0, 10], [0, 8]]) P(x, y, y === 8 ? '#e8c890' : y === 9 ? '#d8a868' : '#a87840');
      }
      function elder(t) {
        if (bloom > 0) {
          elderScenery(t); drawGround(t); elderBody(t);
          const k = t - bloomAt, wr = k * 8, fade = Math.min(1, (5 - k) / 1.5), op = g.globalCompositeOperation;
          g.globalCompositeOperation = 'lighter';
          for (let py = -BR; py < N + BR; py++) for (let px = -BR; px < N + BR; px++) {
            const d = Math.hypot(px + 0.5 - 16.5, (py + 0.5 - 12.5) * 1.1);
            if (d > wr) continue;
            g.globalAlpha = (Math.abs(d - wr) < 1.5 ? 0.9 : 0.55) * fade;
            g.fillStyle = Math.abs(d - wr) < 1.5 ? '#b8ff70' : (px + py) % 5 === 0 ? '#5a6a20' : '#3a5a18';
            g.fillRect(px + BR, py + BR, 1, 1);
          }
          g.globalAlpha = 1; g.globalCompositeOperation = op;
        }
        else {
          if (!eldA) { g.clearRect(0, 0, W, W); elderScenery(t); eldA = snap(); g.clearRect(0, 0, W, W); elderBody(t); eldB = snap(); }
          g.drawImage(eldA, 0, 0); drawGround(t); g.drawImage(eldB, 0, 0);
        }
        // the face: deep-set eyes glowing under heavy white brows
        const bl = blinkAtT(t), glowE = 0.5 + 0.5 * Math.sin(t * 1.7);
        for (const ex of [7, 12]) {
          P(ex, 12, '#1a120c'); P(ex + 1, 12, '#1a120c');
          if (bloom > 0) { P(ex, 12, '#ffffff'); P(ex + 1, 12, '#ffffff'); P(ex, 13, '#ffffff'); P(ex + 1, 13, '#ffffff'); P(ex + (ex < 10 ? 1 : 0), 13, '#1a120c'); P(ex + (ex < 10 ? 1 : 0), 12, '#3a2a1a'); }
          else if (!bl) P(ex + (ex < 10 ? 1 : 0), 12, glowE > 0.5 ? '#fff4a0' : '#e8c860');
          for (let k = -1; k < 3; k++) P(ex + k, 11, '#f6f2ea');
          P(ex + (ex < 10 ? -1 : 2), 12, '#e2ddd2');
        }
        // the long white beard, down to the moss, swaying (it wags when it hums)
        const wag = t - hmmAt < 1.6 ? Math.round(Math.sin((t - hmmAt) * 7)) : Math.sin(t * 0.8) > 0.85 ? 1 : 0;
        const BW = [[6, 13], [6, 13], [6, 13], [7, 12], [7, 12], [8, 11], [9, 10]];
        BW.forEach(([a, b], j) => { const off = j > 2 ? wag : 0; for (let px = a; px <= b; px++) P(px + off, 14 + j, j === 0 ? '#ffffff' : (px + j) % 3 === 0 ? '#cfcac0' : px > 10 ? '#e2ddd2' : '#f6f2ea'); });
        P(9, 14, '#8e5a48'); P(10, 14, '#8e5a48');
        P(armL - 1, 15, BARK[2]);
        // moss hanging from the rim, swaying
        for (const [px, len] of [[1, 3], [4, 2], [16, 3], [19, 2], [21, 3]]) { let bot = 15; while (bot > -2 && !capAt(px, bot)) bot--; for (let k = 1; k <= len; k++) P(px + (k > 1 && Math.sin(t * 1.2 + px) > 0.3 ? 1 : 0), bot + k, k === len ? MOSS[2] : MOSS[1]); }
        // the walking stick in its other hand, and the lantern hanging from its crook, below the cap's rim
        for (let py = 8; py < 20; py++) P(18, py, py % 3 ? '#6a4a2a' : '#8a6a42');
        P(17, 8, '#6a4a2a'); P(16, 8, '#5a3a20'); P(16, 9, '#3a2a1a'); P(15, 15, BARK[2]); P(16, 15, BARK[2]); P(17, 15, BARK[2]);
        // the lantern: its light grows with every firefly you bring it and pools warm on the elder and the moss; seven
        // dots on the moss under it count them in
        const fill = Math.min(1, stored / 7), lg = 0.6 + 0.4 * Math.sin(t * 2.3), lx = 15, ly = 10, lcx = lx + 1.5, lcy = ly + 2.5;
        const rad = 3 + fill * 8 + (bloom > 0 ? 8 : 0);
        for (let py = Math.max(-2, Math.floor(lcy - rad)); py < Math.min(21, lcy + rad); py++) for (let px = Math.max(-BR, Math.floor(lcx - rad)); px < Math.min(N + BR, lcx + rad); px++) { const d = Math.hypot(px + 0.5 - lcx, (py + 0.5 - lcy) * 1.1); if (d < rad && d > 2.5) { g.globalAlpha = Math.round((1 - d / rad) * 3) / 3 * (0.12 + fill * 0.22); g.fillStyle = '#ffd878'; g.fillRect(px + BR, py + BR, 1, 1); g.globalAlpha = 1; } }
        const LAMP = ['.kk.', 'kyyk', 'kYYk', 'kyyk', '.kk.'], glass = fill > 0 ? (lg > 0.6 ? '#fff4b0' : '#ffe070') : '#c89030', core = fill > 0.5 || bloom > 0 ? '#ffffff' : fill > 0 ? '#fff4b0' : '#ffd060';
        LAMP.forEach((r, j) => { for (let i = 0; i < 4; i++) { const ch = r[i]; if (ch === '.') continue; P(lx + i, ly + j, ch === 'k' ? '#3a2a1a' : ch === 'Y' ? core : glass); } });
        for (let i = 0; i < 7; i++) P(12 + i, 19, i < stored ? (Math.sin(t * 4 + i) > 0 ? '#fff6a0' : '#ffe070') : '#2a3020');
        // the fireflies: drifting round it, trailing your finger when you catch them, glowing in the lantern
        for (const f of flies) {
          if (f.mode === 'lantern') continue;
          const x = Math.round(f.x), y = Math.round(f.y), on = f.mode === 'caught' || bloom > 0 || Math.sin(t * 3 + f.ph) > -0.3;
          if (f.trail) f.trail.forEach(([tx, ty3], j) => P(tx, ty3, j === f.trail.length - 1 ? '#c8c860' : '#6a6a30'));
          if (!on) { P(x, y, '#6a6a30'); continue; }
          if (bloom === 0) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(x + dx, y + dy, f.mode === 'caught' ? '#c8b040' : '#7a7a30');
          P(x, y, bloom > 0 ? '#ffffc0' : '#fff6a0');
        }
      }

      // ---------- the pointer, and painting ----------
      // Crystal: the light follows your pointer and the gem splits it into a rainbow across the geode; tap the geode's
      // wall to grow a crystal there (it rings when the rainbow touches it); tap the gem to chime it, the face to giggle.
      // The Elder: press and sweep through the fireflies to catch them on your finger, carry them to its lantern and
      // let go to fill it; fill it with all seven and the elder wakes and the wood lights up
      const grown = [], flies = [];
      for (let i = 0; i < 7; i++) flies.push({ x: 10 + Math.cos(i) * 8, y: 8 + Math.sin(i) * 5, mode: 'free', ph: i * 1.9 });
      let stored = 0, bloomAt = -99, bloom = 0, kDown = false, kPress = -9, caughtN = 0, kX = 0, kY = 0, kMoved = 0;
      function feelL(t) {
        const dtf = Math.min(0.1, Math.max(0, t - lastFeel));
        lastFeel = t;
        hovering = inp.inside;
        if (hovering) { hoverX = (inp.x * S - off) / cell; hoverY = (inp.y * S - off) / cell; }
        ffPull = Math.max(0, Math.min(0.85, ffPull + (hovering ? dtf * 0.8 : -dtf * 1.2)));
        const down = inp.inside && inp.down, pressed = down && !kDown, released = !down && kDown;
        if (pressed) { kPress = t; kX = hoverX; kY = hoverY; kMoved = 0; }
        if (down) kMoved = Math.max(kMoved, Math.hypot(hoverX - kX, hoverY - kY));
        inp.taps();
        // (a tap is a short, still press: the gallery reports every press as a tap, drags included)
        for (const p of released && t - kPress < 0.3 && kMoved < 1 ? [[kX, kY]] : []) {
          const gx = Math.floor(p[0]), gy = Math.floor(p[1]);
          if (legend !== 'Crystal') continue;
          if (onCap(gx, gy)) {
            if (t - chimeAt < 0.5) continue;
            chimeAt = t; poofAt = t; ver++;
            for (let j = 0; j < 9; j++) spores.push({ x: 2 + j * 2, y: 1 + (j % 3) * 2, vx: (j - 4) * 0.7, vy: 1.5 + (j % 4) * 0.5, p: j * 1.3, t0: t });
            [5, 7, 9, 12].forEach((n, i) => c.sound.note(pn(n), { dur: 1.4 - i * 0.2, vel: 0.1, wave: 'sine', attack: 0.005, at: i * 0.05 }));
          } else if (gy > 10 && gy < 19 && gx >= 5 && gx <= 14) {
            if (t - giggleAt < 0.7) continue;
            giggleAt = t; ver++;
            for (let k = 0; k < 3; k++) c.sound.note(pn(6 + k + (ver % 2)) + 12, { dur: 0.12, vel: 0.1, wave: 'sine', at: k * 0.11 });
          } else {
            // near the geode's wall: a crystal grows there
            if (Math.min(gx, gy, 19 - gx, 19 - gy) <= 4 && grown.length < 16) {
              grown.push({ x: Math.max(0, Math.min(18, gx)), y: Math.max(0, Math.min(17, gy - 1)), t0: t, lit: false, flash: t, n: grown.length % 5 }); ver++;
              c.sound.note(pn(9 + grown.length % 5), { dur: 0.5, vel: 0.1, wave: 'sine' }); c.sound.hit('blip', 0.08, { freq: 1600, at: 0.05 });
            }
          }
        }
        if (legend === 'The Elder') {
          // the fireflies: free ones circle the elder (drifting to the pointer when it hovers); caught ones trail your finger
          let prev = null; caughtN = 0;
          flies.forEach((f, i) => {
            const last = f.trail ? f.trail[f.trail.length - 1] : null, cur = [Math.round(f.x), Math.round(f.y)];
            if (!last || last[0] !== cur[0] || last[1] !== cur[1]) { f.trail = (f.trail || []).concat([cur]).slice(-3); }
            if (f.mode === 'free' && t - bloomAt < 5) {
              const a = (t - bloomAt) * 2.6 + i * 0.9, r = Math.min(9.5, (t - bloomAt) * 6 + 1.5);
              f.x += (10 + Math.cos(a) * r - f.x) * 0.5; f.y += (10 + Math.sin(a) * r * 0.95 - f.y) * 0.5;
            } else if (f.mode === 'free') {
              const sw2 = Math.max(0, 1 - (t - bloomAt) / 3), a = t * (0.45 + sw2 * 2.5) + i * 0.9, r = 8.2 + Math.sin(t * 0.9 + i) + Math.max(0, 1.4 - (t - hmmAt)) * 3.5 - sw2 * 4 * Math.sin(Math.PI * Math.min(1, (t - bloomAt) / 3));
              let tx = 10 + Math.cos(a) * r, ty2 = 8 + Math.sin(a) * r * 0.7;
              if (ffPull > 0 && !down) { tx += (hoverX + Math.cos(t * 2 + i * 1.3) * 2 - tx) * ffPull * 0.6; ty2 += (hoverY + Math.sin(t * 2 + i * 1.3) * 2 - ty2) * ffPull * 0.6; }
              f.x += (tx - f.x) * 0.12; f.y += (ty2 - f.y) * 0.12;
              if (down && Math.hypot(f.x - hoverX, f.y - hoverY) < 2.6) { f.mode = 'caught'; c.sound.note(pn(10 + i % 5), { dur: 0.15, vel: 0.08, wave: 'sine' }); }
            }
            if (f.mode === 'caught') {
              const lead = prev || { x: hoverX, y: hoverY };
              f.x += (lead.x + (prev ? -0.6 : 0) - f.x) * (prev ? 0.35 : 0.5); f.y += (lead.y + (prev ? 0.8 : 0) - f.y) * (prev ? 0.35 : 0.5);
              prev = f; caughtN++;
            }
          });
          if (released) {
            const atLantern = Math.hypot(hoverX - 16.5, hoverY - 12.5) < 4;
            if (caughtN && atLantern) {
              flies.forEach(f => { if (f.mode === 'caught') { f.mode = 'lantern'; stored++; } }); ver++;
              [0, 4, 7].forEach((n, i) => c.sound.note(pn(n + stored), { dur: 0.4, vel: 0.1, wave: 'sine', at: i * 0.06 }));
              if (stored >= 7) { bloomAt = t; flies.forEach((f, i) => { f.mode = 'free'; f.x = 16.5 + Math.cos(i) * 1.5; f.y = 12.5 + Math.sin(i) * 1.5; }); [0, 2, 4, 7, 9, 12, 14].forEach((n, i) => c.sound.note(pn(n), { dur: 1.2, vel: 0.09, wave: 'sine', at: i * 0.09 })); c.sound.note(pn(0) - 12, { dur: 1.6, vel: 0.13, wave: 'triangle', cutoff: 700, attack: 0.1 }); }
            } else if (caughtN) flies.forEach(f => { if (f.mode === 'caught') f.mode = 'free'; });
            else if (t - kPress < 0.35 && t - hmmAt > 1.2) {
              // a plain tap: a slow, low hum, and the beard wags
              hmmAt = t; ver++;
              c.sound.note(pn(0) - 12, { dur: 0.6, vel: 0.15, wave: 'triangle', cutoff: 700, attack: 0.06 });
              c.sound.note(pn(2) - 12, { dur: 0.9, vel: 0.13, wave: 'triangle', cutoff: 700, attack: 0.06, at: 0.55 });
            }
          }
          // after the wood has lit up, the lantern lets them all go again
          if (stored >= 7 && t - bloomAt > 5) { stored = 0; ver++; }
        }
        kDown = down;
      }
      let stepL = -1;
      function renderL(t) {
        feelL(t);
        const k = Math.floor(t * 6);
        // (it steps six times a second, like the ordinary kin; a tap or a catch redraws at once)
        const key = k + ':' + ver;
        if (key === stepL) return;
        stepL = key;
        if (legend === 'Crystal') crystal(k / 6); else { bloom = t - bloomAt < 5 ? 1 - (t - bloomAt) / 5 : 0; elder(k / 6); }
        drawLife(k / 6);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(can, off - BR * cell, off - BR * cell, W * cell, W * cell);
      }
      renderL(0);
      return t => renderL(t);
    }
    let step = -1;
    function render(t) {
      feel(t);
      const k = Math.floor(t * 6);
      const busy = sprouts.length || spores.length || t - poofAt < 0.5 || t - giggleAt < 0.7 || hovering || t - hmmAt < 2 || t - luckAt < 1 || ffPull > 0;
      const key = busy ? k + ':' + ver + ':' + (hovering ? Math.round(hoverX) + ',' + Math.round(hoverY) : '') : k;
      if (key === step) return;
      step = key;
      draw(k / 6);
      if (busy) drawLife(k / 6);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(can, off - BR * cell, off - BR * cell, W * cell, W * cell);
    }
    render(0);
    return t => render(t);
  },
});

})(window.Proto);
