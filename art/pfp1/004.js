// Hedge Wizards: from D:/code/synaesthesia/public/drop03/pieces/004.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Hedge Wizards: dithered wizards on a 40 x 40 grid. Every gradient is an ordered dither.
Proto.add({
  num: 4,
  name: 'Hedge Wizards',
  seed: 35,
  fam: 'Pixel Portraits',
  interactive: 'Tap anywhere to cast a spell. Tap the wizard to make them chuckle.',
  music: true,
  recipe: 'A village wizard on a 40-cell grid where every bit of light and shade is an ordered dither, lit by the orb on their staff. Robes, hat, beard, eyes, familiar, orb, sky and the hand that holds the staff vary; a rare few wear an aura of turning runes. About 1 in 330 is a legendary (robes that open onto the night sky, a wizard grown out of a hedge, a wizard of living flame, or a familiar that has put on the hat, robe and beard of the wizard while the wizard rides tiny on its shoulder) and 1 in 200 keeps an hourglass that can stop time.',
  make(c) {
    const S = c.size, N = 40, B = 4, W = N + 2 * B;
    // splitmix32 over a seed folded from the hash
    let z = 0;
    for (let i = 2; i < c.hash.length; i++) z = (Math.imul(z, 31) + c.hash.charCodeAt(i)) | 0;
    function sm() {
      z = (z + 0x9e3779b9) | 0;
      let q = z ^ (z >>> 16); q = Math.imul(q, 0x21f0aaad);
      q ^= q >>> 15; q = Math.imul(q, 0x735a2d97);
      q ^= q >>> 15;
      return (q >>> 0) / 4294967296;
    }
    function weighted(entries) {
      const sum = entries.reduce((a, e) => a + e[2], 0);
      let r = sm() * sum;
      for (const e of entries) if ((r -= e[2]) < 0) return e;
      return entries[0];
    }
    // colours are parsed once and reused, so a redrawn frame makes no garbage (no GC spikes)
    const HEXES = new Map(), RAMPS = new Map();
    const hex = h => { let v = HEXES.get(h); if (!v) HEXES.set(h, v = [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]); return v; };
    const ramp = list => { const k = list.join(); let v = RAMPS.get(k); if (!v) RAMPS.set(k, v = list.map(hex)); return v; };

    let robes = weighted([
      ['Indigo', ['#15123a', '#332d86', '#6a62d4'], 24], ['Crimson', ['#3e0c1a', '#8a2034', '#d6495b'], 18], ['Moss', ['#11281a', '#2c6538', '#62a85a'], 18],
      ['Plum', ['#30113a', '#6a2a76', '#b25cba'], 16], ['Teal', ['#0c2a30', '#1d6b70', '#41b6aa'], 14], ['Starlight', ['#4a2e08', '#a8721a', '#f2c64a'], 6], ['Ash', ['#1a1a1e', '#4a4a52', '#8e8e98'], 8],
    ]);
    let hat = weighted([['Pointed', 0, 30], ['Crooked', 0, 26], ['Curled Tip', 0, 18], ['Wide Brim', 0, 18], ['Towering', 0, 8]]);
    let beard = weighted([['Long', 0, 30], ['Forked', 0, 18], ['Braided', 0, 16], ['Short', 0, 16], ['Clean Shaven', 0, 14], ['Ember Beard', 0, 6]]);
    let hairCol = weighted([
      ['Snow', ['#7c7c88', '#c4c4ce', '#f6f6fa'], 30], ['Pewter', ['#3e3e46', '#74747e', '#aeaeb8'], 22], ['Ginger', ['#5a220c', '#b05420', '#f08e48'], 16],
      ['Raven', ['#100c14', '#2a2230', '#4c4054'], 16], ['Chestnut', ['#2e180c', '#64381c', '#a0643a'], 12], ['Enchanted Blue', ['#183466', '#3a78cc', '#8ad0ff'], 4],
    ]);
    let eyes = weighted([['Kind', 0, 34], ['Squint', 0, 22], ['Spectacles', 0, 22], ['Wide', 0, 14], ['Glowing', 0, 8]]);
    let familiar = weighted([['None', 0, 34], ['Owl', 0, 18], ['Toad', 0, 16], ['Moth', 0, 14], ['Mouse', 0, 12], ['Tiny Dragon', 0, 6]]);
    const orb = weighted([
      ['Frost Orb', ['#1c4a8a', '#5ab0ff', '#e0f4ff'], 26], ['Wisp Orb', ['#1a6a3a', '#5ef08a', '#e4ffe8'], 22], ['Rose Orb', ['#7a1a5a', '#ff6ac0', '#ffe0f4'], 18],
      ['Candle Orb', ['#8a3a08', '#ffa030', '#fff2c0'], 22], ['Void Orb', ['#100018', '#6a1aa0', '#e0b0ff'], 6], ['No Staff', null, 6],
    ]);
    let sky = weighted([
      ['Night', ['#05061a', '#15183c', '#2e2a62'], 28], ['Dusk', ['#22102e', '#6e2a4c', '#d8784a'], 20], ['Forest', ['#040f08', '#10301c', '#2a5a32'], 18],
      ['Storm', ['#0c1014', '#262e38', '#525c6a'], 14], ['Dawn', ['#2e3060', '#8a5a86', '#eab094'], 12], ['Aurora', ['#04101c', '#106a5a', '#8af0b0'], 8],
    ]);
    const skins = [
      ['#8a5a3e', '#c48a62', '#f2c49a'], ['#6a3e26', '#a8683e', '#dca070'], ['#4a2614', '#7c4426', '#b0703e'],
      ['#2e180c', '#56301a', '#86522e'], ['#9a6a50', '#d8a888', '#fcdcc0'], ['#7a4a2a', '#b67c4a', '#e8b07a'],
    ].map(ramp);
    let skin = skins[Math.floor(sm() * skins.length)];
    const bend = sm() < 0.5 ? -1 : 1;
    const stars = [];
    for (let i = 0; i < 18; i++) stars.push([Math.floor(sm() * W) - B, Math.floor(sm() * 14) - B, sm() * 6.28]);
    const blinkAt = sm() * 4, blinkEvery = 3 + sm() * 2.5;

    c.trait('Robes', robes[0]);
    c.trait('Hat', hat[0]);
    c.trait('Beard', beard[0]);
    c.trait('Hair', hairCol[0]);
    c.trait('Eyes', eyes[0]);
    c.trait('Familiar', familiar[0]);
    c.trait('Staff', orb[0]);
    c.trait('Sky', sky[0]);
    // later additions, from a Weyl-stepped hash of the hash's tail so every draw above stays as it was
    let wy = parseInt(c.hash.slice(-12, -4), 16) >>> 0;
    const weyl = () => { wy = (wy + 0x9e3779b9) >>> 0; let q = Math.imul(wy ^ (wy >>> 15), 0x2c1b3c6d); q ^= q >>> 12; q = Math.imul(q, 0x297a2d39); q ^= q >>> 15; return (q >>> 0) / 4294967296; };
    const lefty = weyl() < 0.45;
    const sigil = weyl() < 0.022; // the rare one: spellbound inside a ring of turning runes
    c.trait('Stance', sigil ? 'Spellbound' : lefty ? 'Staff Left' : 'Staff Right');
    // the drawn faces and the wider wardrobe, from the same Weyl stream (nothing above moves)
    const pickY = list => { let sum = 0; for (const e of list) sum += e[1]; let r = weyl() * sum; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
    const faceShape = pickY([['Long', 22], ['Round', 20], ['Gaunt', 16], ['Broad', 18], ['Heart', 14]]);
    const noseW = pickY([['Hooked', 22], ['Bulbous', 20], ['Long', 18], ['Button', 12], ['Crooked', 14], ['Pointy', 14]]);
    const brow = pickY([['Bushy', 28], ['Wild', 18], ['Drooping', 18], ['Arched', 18], ['Knitted', 18]]);
    const stache = pickY([['Walrus', 30], ['Handlebar', 22], ['Droopy', 26], ['Wispy', 22]]);
    const age = weyl() < 0.55;
    const hairDo = pickY([['Bushy', 30], ['Long Locks', 30], ['Tucked', 26], ['Braided Locks', 14]]);
    const IRIS = hex(['#2a1a10', '#1a3a6a', '#1e4a2a', '#3a3a44'][Math.floor(weyl() * 4)]);
    let trinket = pickY([['None', 46], ['Long Pipe', 14], ['Spellbook', 12], ['Feather', 12], ['Bell on Tip', 10], ['Potion', 6]]);
    if (weyl() < 0.45) eyes = [pickY([['Kind', 14], ['Squint', 9], ['Spectacles', 9], ['Wide', 6], ['Glowing', 4], ['Wise', 16], ['Twinkling', 16], ['Mismatched', 10], ['Starry', 3]])];
    if (weyl() < 0.4) beard = [pickY([['Long', 12], ['Forked', 8], ['Braided', 7], ['Short', 7], ['Clean Shaven', 6], ['Ember Beard', 3], ['Spade', 16], ['Wispy', 14], ['Plaited', 12]])];
    let shapeH = hat[0];
    if (weyl() < 0.42) shapeH = pickY([['Pointed', 12], ['Crooked', 10], ['Curled Tip', 8], ['Wide Brim', 8], ['Towering', 4], ['Hood', 18], ['Floppy', 16], ['Star-Spangled', 12]]);
    if (weyl() < 0.3) robes = pickY([[robes, 30], [['Midnight', ['#0a0c24', '#1c2458', '#3c4aa0']], 20], [['Rust', ['#3a1608', '#8a3a14', '#d0702a']], 18], [['Patchwork', ['#11281a', '#2c6538', '#62a85a']], 4]]);
    if (familiar[0] === 'None' && weyl() < 0.4) familiar = [pickY([['Raven', 30], ['Snail', 26], ['Wisp', 24], ['Bat', 20]])];
    if (weyl() < 0.35) sky = pickY([[sky, 50], [['Moonlit', ['#03051a', '#14204a', '#3a5a9a']], 25], [['Library', ['#1a0e08', '#3a2414', '#6a4428']], 25]]);
    c.trait('Robes', robes[0]);
    c.trait('Hat', shapeH);
    c.trait('Beard', beard[0]);
    c.trait('Eyes', eyes[0]);
    c.trait('Familiar', familiar[0]);
    c.trait('Sky', sky[0]);
    c.trait('Face', faceShape);
    c.trait('Nose', noseW);
    c.trait('Brows', brow);
    c.trait('Mustache', beard[0] === 'Clean Shaven' ? 'None' : stache);
    c.trait('Trinket', trinket);
    c.trait('Hair Style', hairDo);
    // the badge on the hat, from an FNV hash of the hash text so no roll above moves
    let bh = 0x811c9dc5 ^ 0x626467;
    for (let i = 2; i < c.hash.length; i++) bh = Math.imul(bh ^ c.hash.charCodeAt(i), 0x01000193);
    bh ^= bh >>> 13; bh = Math.imul(bh, 0x5bd1e995); bh ^= bh >>> 15;
    let badge = 'None';
    { let r = (bh >>> 0) / 4294967296 * 100; for (const [v, wgt] of [['Crescent', 22], ['Star', 22], ['Eye', 16], ['Rune', 16], ['Buckle', 16], ['None', 8]]) if ((r -= wgt) < 0) { badge = v; break; } }
    if (shapeH === 'Hood' || shapeH === 'Star-Spangled') badge = 'None';
    c.trait('Hat Badge', badge);
    // the legendaries and the coveted hourglass: a xorwow stream of their own on five slices of the hash,
    // so every roll above, and every ordinary wizard, stays as it was
    const slice = (a, k) => (parseInt(c.hash.slice(a, a + 8), 16) ^ k) >>> 0 || k;
    const xw = [slice(2, 0x2545f491), slice(14, 0x9e3779b9), slice(30, 0x7f4a7c15), slice(42, 0x6a09e667), slice(58, 0xbb67ae85)];
    let wd = 6615241;
    const xorwow = () => {
      let q = xw[4];
      const s0 = xw[0];
      xw[4] = xw[3]; xw[3] = xw[2]; xw[2] = xw[1]; xw[1] = s0;
      q ^= q >>> 2; q ^= q << 1; q ^= s0 ^ (s0 << 4);
      xw[0] = q >>> 0; wd = (wd + 362437) >>> 0;
      return ((xw[0] + wd) >>> 0) / 4294967296;
    };
    for (let i = 0; i < 10; i++) xorwow();
    const lroll = xorwow(), hroll = xorwow(), kroll = xorwow();
    const legend = lroll < 0.0008 ? 'Starweave' : lroll < 0.0016 ? 'Hedge Born' : lroll < 0.0022 ? 'Living Flame' : lroll < 0.003 ? 'Swapped' : 'None';
    // Swapped: the familiar has put on the wizard's hat, robe and beard, and the wizard rides tiny on its shoulder
    const swapped = legend === 'Swapped', creature = ['Toad', 'Mouse', 'Raven'][Math.floor(kroll * 3)];
    const realSkin = skin;
    if (legend === 'None' && hroll < 0.005) trinket = 'Hourglass';
    if (legend === 'Starweave') {
      // robes and hat cut from the night sky itself, beard and hair of silver starlight, under a twilight
      robes = ['Starweave', ['#06061a', '#12123e', '#262670']]; hairCol = ['Starlight', ['#7a80b8', '#c4ccf0', '#ffffff']];
      sky = ['Twilight', ['#170a2a', '#6a2a5a', '#ea8a5a']];
    } else if (legend === 'Hedge Born') {
      // the hedge that became a wizard: bark for skin, leaves for robes, hair and beard
      robes = ['Hedge', ['#0c2410', '#285a22', '#5aa040']]; hairCol = ['Leaves', ['#1c3a12', '#4a7a2a', '#8ac050']];
      skin = ramp(['#2e1a0c', '#5a3a1e', '#8a6038']);
      if (beard[0] === 'Ember Beard') beard = ['Long'];
    } else if (legend === 'Living Flame') {
      // a wizard made of fire, burning in a dark night
      robes = ['Flame', ['#3a0804', '#a8200a', '#f0601a']]; hairCol = ['Flame', ['#a8200a', '#f0601a', '#ffb030']];
      sky = ['Ashen Night', ['#040208', '#120814', '#2a1222']];
      if (beard[0] === 'Ember Beard') beard = ['Long'];
    }
    if (swapped) {
      skin = ramp({ Toad: ['#24401a', '#4a8a34', '#8ad05a'], Mouse: ['#4a4048', '#8a7e86', '#c8bec4'], Raven: ['#08080e', '#22223a', '#4a4a6a'] }[creature]);
      if (beard[0] === 'Clean Shaven') beard = ['Long'];
      c.trait('Face', creature); c.trait('Eyes', creature + ' Eyes'); c.trait('Nose', 'None'); c.trait('Brows', 'None'); c.trait('Familiar', 'Tiny Wizard');
    }
    if (legend !== 'None') {
      c.trait('Robes', robes[0]); c.trait('Hair', hairCol[0]); c.trait('Sky', sky[0]); c.trait('Beard', beard[0]);
      c.trait('Legendary', legend);
    }
    c.trait('Trinket', trinket);
    const HEAD = { Long: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 4, 3], Round: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 5, 4, 3], Gaunt: [6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 4, 3, 2],
      Broad: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 4], Heart: [7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 5, 5, 4, 3, 2, 1] }[swapped ? { Toad: 'Broad', Mouse: 'Heart', Raven: 'Round' }[creature] : faceShape];

    const R = ramp(robes[1]), H = ramp(hairCol[1]), SK = ramp(sky[1]), O = orb[1] ? ramp(orb[1]) : null;
    const BEARD = beard[0] === 'Ember Beard' ? ramp(['#7a1c08', '#f06a1a', '#ffe070']) : H;
    const INK = hex('#0a0610'), GOLD = ramp(['#6a4208', '#d09a24', '#ffe27a']);
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const th = (x, y) => (bayer[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
    // a value 0..1 across a 3-colour ramp, dithered
    // flat colour with a dithered seam: most of a face is one tone, the turn between tones is an ordered dither
    const soft = (rmp, v, x, y, seam) => {
      const p = Math.max(0, Math.min(1.999, v * 2)), i = Math.floor(p), f = p - i, a = 0.5 - (seam || 0.18);
      if (f < a) return rmp[i];
      if (f > 1 - a) return rmp[Math.min(2, i + 1)];
      return (f - a) / (1 - 2 * a) > th(x, y) ? rmp[Math.min(2, i + 1)] : rmp[i];
    };
    const tone = (rmp, v, x, y) => {
      const p = Math.max(0, Math.min(1.999, v * 2));
      const i = Math.floor(p);
      return rmp[(p - i) > th(x, y) ? i + 1 : i];
    };

    const col = new Array(W * W);
    const solid = new Uint8Array(W * W);
    // which part of the wizard each solid cell belongs to (1 robe, 2 hair, 3 skin, 4 beard, 5 hat; 0 anything else), for the orb's light
    const part = new Uint8Array(W * W);
    let cp = 0;
    const put = (x, y, rgb, s) => { const X = x + B, Y = y + B; if (X >= 0 && Y >= 0 && X < W && Y < W) { col[Y * W + X] = rgb; solid[Y * W + X] = s ? 1 : 0; part[Y * W + X] = s ? cp : 0; } };
    const isSolid = (x, y) => { const X = x + B, Y = y + B; return X >= 0 && Y >= 0 && X < W && Y < W && solid[Y * W + X] === 1; };
    const LX = 0.62, LY = -0.5; // light from the orb, upper right
    // fill an ellipse-ish mask with lit, dithered colour
    function body(test, rmp, cx, cy, rx, ry, bias) {
      for (let y = -B; y < N + B; y++) for (let x = -B; x < N + B; x++) {
        if (!test(x + 0.5, y + 0.5)) continue;
        const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
        put(x, y, tone(rmp, 0.45 + (bias || 0) + 0.55 * (nx * LX + ny * LY), x, y), true);
      }
    }
    const ell = (cx, cy, rx, ry) => (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

    // spells the viewer casts, and how close the pointer is to the orb
    const spells = [];
    let near = 0, chuckleUntil = -1;
    const SKIN0 = swapped ? realSkin : skin, FAMSKIN = skin; // (the swapped familiar's own hide, and the wizard's face under it)
    const ROSY = [Math.min(255, SKIN0[2][0] + 18), Math.round(SKIN0[2][1] * 0.78), Math.round(SKIN0[2][2] * 0.78)];
    const BOOKS = ['#6a1a1a', '#1a3a5a', '#2a4a1e', '#5a4a1a', '#3a1a4a'].map(hex);
    // on the deepest skins (and the hedge's bark) dark ink lines vanish: closed eyes and the mouth switch to a
    // light line, and dark brows get a lit ridge above them so the expression always reads
    const lum = v => 0.3 * v[0] + 0.59 * v[1] + 0.11 * v[2];
    const darkFace = lum(SKIN0[1]) < 100;
    const EYEL = darkFace ? hex('#f2dcc6') : INK, MOUTHC = darkFace ? hex('#e0b4a0') : INK;
    const browRidge = darkFace && lum(H[2]) - lum(SKIN0[1]) < 60;
    const RIDGE = [SKIN0[2][0] + (255 - SKIN0[2][0]) * 0.35, SKIN0[2][1] + (255 - SKIN0[2][1]) * 0.3, SKIN0[2][2] + (255 - SKIN0[2][2]) * 0.25].map(Math.round);
    function compose(t) {
      solid.fill(0); cp = 0;
      // the swapped familiar wears the face, except for the second after a tap when the two swap back
      const asFam = swapped && !(realT < swapUntil);
      if (swapped) skin = asFam ? FAMSKIN : SKIN0;
      // sky: a dithered vertical gradient, with aurora bands or stars
      for (let y = -B; y < N + B; y++) for (let x = -B; x < N + B; x++) {
        let v = (y + B) / (W - 1);
        if (sky[0] === 'Night' || sky[0] === 'Forest' || sky[0] === 'Storm') v = 1 - v * 0.9;
        if (sky[0] === 'Aurora') v = Math.max(0, 0.25 + 0.5 * Math.sin(x * 0.22 + y * 0.12 + t * 0.4) - y * 0.012);
        if (sky[0] === 'Moonlit') v = 0.75 - v * 0.6 + Math.max(0, 0.5 - Math.hypot(x - 8, y - 5) / 16);
        if (sky[0] === 'Library') {
          // shelves of old books behind, warmer where the orb's light falls
          const row = Math.floor((y + B) / 9), sr = (y + B) % 9, bi = Math.floor((x + B + row * 5) / 2);
          const lit = Math.max(0, 1 - Math.hypot(x - 34, y - 8) / 26);
          if (sr === 0) put(x, y, tone(SK, 0.15 + lit * 0.5, x, y), false);
          else if (sr >= 2 + ((bi * 7 + row) % 3)) { const bc = BOOKS[(bi * 7 + row * 3) % 5]; put(x, y, (x + B) % 2 === 0 && lit < 0.35 ? SK[0] : bc, false); }
          else put(x, y, tone(SK, 0.3 + lit * 0.6, x, y), false);
          continue;
        }
        put(x, y, tone(SK, v * 0.95, x, y), false);
      }
      if (sky[0] === 'Moonlit') for (let y = 0; y < 11; y++) for (let x = 2; x < 14; x++) { const d = Math.hypot(x + 0.5 - 8, y + 0.5 - 5); if (d < 4.6) put(x, y, d > 3.8 && (x + y) % 2 ? hex('#c8d4f0') : (x - 7) ** 2 + (y - 4) ** 2 < 1.5 || (x - 9) ** 2 + (y - 7) ** 2 < 1 ? hex('#c8d0e8') : hex('#eef2ff'), false); }
      if (sky[0] !== 'Dawn' && sky[0] !== 'Dusk' && sky[0] !== 'Library') for (const s of stars) if (Math.sin(t * 1.1 + s[2]) > -0.6) put(s[0], s[1], hex('#e8e8ff'), false);
      // orb glow behind everything: dithered falloff
      const ox = 34, oy = 8;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.1);
      if (O) for (let y = oy - 9; y <= oy + 9; y++) for (let x = ox - 9; x <= ox + 9; x++) {
        const d = Math.hypot(x + 0.5 - ox, y + 0.5 - oy);
        const g = 1 - d / (7.5 + pulse * 1.2 + near * 3.5);
        if (g > th(x, y) * 0.9 + 0.08) put(x, y, g > 0.55 ? O[1] : O[0], false);
      }
      // staff
      if (O) {
        for (let y = oy + 2; y < N + B; y++) { put(34, y, tone(ramp(['#2a1608', '#6a4220', '#a87444']), 0.35, 34, y), true); put(33, y, hex('#2a1608'), true); }
        body(ell(ox, oy, 2.7, 2.7), O, ox - 0.8, oy - 0.8, 2.6, 2.6, 0.35);
        put(ox - 1, oy - 2, O[2], true);
      }
      // the rare aura: a ring of runes turning slowly behind the head
      if (sigil) {
        const RUNE = O ? O : GOLD, spin = t * 0.25;
        for (let k = 0; k < 64; k++) {
          const a = k / 64 * Math.PI * 2 + spin;
          for (const r of [12.5, 15.5]) put(Math.round(20 + Math.cos(a) * r), Math.round(19 + Math.sin(a) * r), RUNE[k % 4 === 0 ? 2 : 1], false);
        }
        for (let k = 0; k < 8; k++) {
          const a = k / 8 * Math.PI * 2 - spin * 1.5, gx = 20 + Math.cos(a) * 14, gy = 19 + Math.sin(a) * 14;
          const g = [[0, -1], [0, 0], [0, 1], [-1, k % 2 ? -1 : 1], [1, k % 3 ? 0 : 1]];
          for (const [dx, dy] of g) put(Math.round(gx) + dx, Math.round(gy) + dy, RUNE[2], false);
        }
      }
      // robe and shoulders
      cp = 1;
      body(ell(20, 47, 19.5, 17), R, 24, 38, 18, 12, 0);
      if (robes[0] === 'Midnight') for (const [sx, sy] of [[6, 38], [11, 33], [29, 34], [34, 39], [9, 42], [31, 42], [26, 38]]) if (isSolid(sx, sy)) put(sx, sy, GOLD[(sx + sy) % 2 + 1], true);
      if (robes[0] === 'Patchwork') {
        const P1 = ramp(['#3e0c1a', '#8a2034', '#d6495b']), P2 = ramp(['#4a2e08', '#a8721a', '#f2c64a']);
        for (const [px1, py1, pr] of [[3, 36, P1], [28, 33, P2], [10, 41, P2], [32, 40, P1]]) for (let y = py1; y < py1 + 4; y++) for (let x = px1; x < px1 + 5; x++) if (isSolid(x, y)) put(x, y, (x === px1 || y === py1) && (x + y) % 2 ? hex('#f0e0c0') : tone(pr, 0.5 + (x - 20) * 0.02, x, y), true);
      }
      // a clasp at the collar
      cp = 0;
      body(ell(20, 31.5, 1.6, 1.6), GOLD, 20.6, 31, 1.6, 1.6, 0.2);
      // the face sits under a raised brim: rows 12 to 27, brows at 14, eyes at 16, nose to 21, mouth at 23, beard below
      const FY = 12;
      const hwF = y => y >= FY && y < FY + HEAD.length ? HEAD[y - FY] : 0;
      // hair behind the face (a hood hides it; the swapped familiar has its own ears or none)
      cp = 2;
      if (asFam && creature === 'Mouse') for (const ex of [11.5, 28.5]) { cp = 3; body(ell(ex, 14.5, 3.2, 3.2), skin, ex + 1, 13.5, 3, 3, 0); for (let y = 13; y < 17; y++) for (let x = Math.floor(ex) - 1; x <= Math.floor(ex) + 1; x++) if (Math.hypot(x + 0.5 - ex, y + 0.5 - 14.8) < 1.7) put(x, y, hex('#e8a8b0'), true); }
      else if (shapeH !== 'Hood' && !asFam) {
        if (hairDo === 'Bushy') body(ell(20, 19.5, 9.8, 9.4), H, 21, 19, 9, 9, -0.1);
        else if (hairDo === 'Long Locks') body((x, y) => { const w = hwF(Math.min(Math.floor(y), 24)) || 6; const dx = Math.abs(x - 20); return y > 11.5 && y < 32 - (Math.floor(x) % 3) && dx > w - 1 && dx < w + 2.2; }, H, 21, 20, 8, 10, -0.05);
        else if (hairDo === 'Braided Locks') for (const sd of [-1, 1]) for (let y = 13; y < 35; y++) { const x = sd < 0 ? 20 - hwF(Math.min(y, 22)) - 2 : 19 + hwF(Math.min(y, 22)) + 1; put(x, y, (y % 2 ? H[1] : H[2]), true); put(x + 1, y, (y % 2 ? H[2] : H[1]), true); if (y === 34) { put(x, y, GOLD[1], true); put(x + 1, y, GOLD[2], true); } }
      }
      // a neck between the chin and the collar
      cp = 3;
      for (let y = 25; y < 32; y++) for (let x = 18; x < 22; x++) put(x, y, x > 20 || y > 29 ? skin[1] : skin[0], true);
      // the face: a drawn profile per head shape, flat light from the orb with a dithered seam,
      // the brim's shadow across the brow, and a darker jaw and cheek line so it keeps its own shape
      for (let y = FY; y < FY + HEAD.length; y++) {
        const w = hwF(y), below = hwF(y + 1);
        for (let x = 20 - w; x < 20 + w; x++) {
          const nx = (x + 0.5 - 20) / 7, ny = (y + 0.5 - 19) / 8;
          let v = 0.62 + 0.45 * (nx * LX + ny * LY);
          if (y < 14 && shapeH !== 'Hood') v -= 0.34;
          const edge = y >= 17 && (x === 20 - w || x === 19 + w || x < 20 - below || x > 19 + below);
          put(x, y, edge ? skin[0] : soft(skin, v, x, y, 0.07), true);
        }
      }
      // ears, when the hair is tucked away
      if (hairDo === 'Tucked' && shapeH !== 'Hood' && !asFam) for (const sd of [-1, 1]) { const x = sd < 0 ? 20 - hwF(17) - 1 : 19 + hwF(17) + 1; put(x, 16, skin[1], true); put(x, 17, skin[0], true); put(x, 18, skin[1], true); put(x + sd, 16, skin[0], true); }
      // cheeks: rosy on the round and heart faces, hollow on the gaunt
      if (!asFam && (faceShape === 'Round' || faceShape === 'Heart')) for (const cx0 of [15, 23]) { put(cx0, 20, ROSY, true); put(cx0 + 1, 21, ROSY, true); if (faceShape === 'Round') put(cx0 + 1, 20, ROSY, true); }
      if (!asFam && faceShape === 'Gaunt') for (const cx0 of [15, 24]) for (let y = 20; y < 23; y++) put(cx0, y, skin[0], true);
      // a sprite painter for the features: K ink, W white, S shade, M mid, L lit, G gold, C glow, H/h brow, B/b/T beard
      cp = 0;
      const FEAT = { Y: hex('#e8c020'), K: INK, W: hex('#f4f2ec'), S: skin[0], M: skin[1], L: skin[2], G: GOLD[2], g: GOLD[1], C: hex('#9af8ff'), H: H[2], h: H[1], B: BEARD[1], b: BEARD[0], T: BEARD[2], P: IRIS, R: ROSY };
      // kc, when given, is the colour of the K lines (a light line on the deepest skins)
      const draw = (rows, x0, y0, flip, kc) => rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const ch = r[flip ? r.length - 1 - i : i]; if (ch !== '.') put(x0 + i, y0 + j, ch === 'K' && kc ? kc : FEAT[ch], true); } });
      const openEye = rows => rows.some(r => r.includes('W'));
      // eyes (the left one as drawn, the right one mirrored)
      const blink = ((t + blinkAt) % blinkEvery) < 0.16;
      const e = t < chuckleUntil ? 'Kind' : eyes[0];
      const EYE = {
        Kind: [['.K.', 'K.K'], 16], Squint: [['SSS', 'KKK'], 16], Spectacles: [['.KK', 'WPW'], 16], Wide: [['.K.', 'WWW', 'WPW'], 15], Glowing: [['.C.', 'CWC'], 16],
        Wise: [['SSS', 'WPK'], 16], Twinkling: [['KKK', 'WPW'], 16], Mismatched: [['KKK', 'WPW'], 16], Starry: [['.G.', 'GWG', '.G.'], 15],
      };
      if (asFam) famFace(t, blink, draw);
      else {
      for (const [ex, left] of [[15, true], [22, false]]) {
        if (blink && e !== 'Glowing') { draw(['...', 'KKK'], ex, 16, !left, EYEL); continue; }
        if (e === 'Mismatched' && !left) { draw(['...', '.PK'], ex, 16, true, EYEL); continue; }
        draw(EYE[e][0], ex, EYE[e][1], !left, openEye(EYE[e][0]) ? 0 : EYEL);
        if (e === 'Twinkling' && Math.sin(t * 2.6 + (left ? 0 : 1.7)) > 0.55) put(left ? ex : ex + 2, 15, hex('#ffffff'), true);
        if (e === 'Spectacles') for (let y = 15; y <= 18; y++) for (let x = ex - 1; x <= ex + 3; x++) if ((y === 15 || y === 18 || x === ex - 1 || x === ex + 3) && !((y === 15 || y === 18) && (x === ex - 1 || x === ex + 3))) put(x, y, GOLD[2], true);
      }
      if (e === 'Spectacles') { put(19, 16, GOLD[2], true); put(20, 16, GOLD[2], true); }
      // crow's feet for the old ones
      if (age) for (const [x, y] of [[13, 16], [13, 18], [26, 16], [26, 18]]) if (hwF(y) && x >= 20 - hwF(y) && x < 20 + hwF(y)) put(x, y, skin[0], true);
      // brows: big, characterful, the hair's colour
      const BROWS = { Bushy: ['HHH.', '.hHH'], Wild: ['H.H.', 'HhHH'], Drooping: ['.HHH', 'Hh..', 'h...'], Arched: ['.HH.', 'H..h'], Knitted: ['H...', '.hHH'] };
      for (const left of [true, false]) {
        const rows = BROWS[brow], x0 = left ? 14 : 22;
        // dark brows on a deep skin: a lit ridge along the top of each brow
        if (browRidge) for (let i = 0; i < 4; i++) { const ch = left ? i : 3 - i; let j = 0; while (j < rows.length && rows[j][ch] === '.') j++; if (j < rows.length) put(x0 + i, 13 + j, RIDGE, true); }
        draw(rows, x0, 14, !left);
      }
      // the nose: lit on the orb's side, shaded on the other
      draw({ Hooked: ['.ML.', '.MLL', '.SML', 'SMMM', '.KSK'], Bulbous: ['.ML.', '.ML.', 'SMLL', 'SMML', '.SMK'], Long: ['.ML.', '.ML.', '.ML.', '.MLL', 'SMMK'],
        Button: ['....', '.ML.', '.ML.', 'SMLK', '....'], Crooked: ['ML..', '.ML.', '..ML', '.SMK', '....'], Pointy: ['.ML.', '.ML.', '.SML', '..SL', '...S'] }[noseW], 18, 17);
      }
      // beard: below the mouth, wrapping the jaw, combed into strands, with a darker rim where it meets the robe
      const bd = beard[0];
      cp = 4;
      if (bd !== 'Clean Shaven') {
        const W0 = hwF(25) + 0.6;
        const beardTest = (x, y) => {
          if (y < 24) return false;
          const dx = x - 20, k = y - 24.5;
          if (y < 25) return Math.abs(dx) >= 3.4 && Math.abs(dx) <= hwF(24) + 0.3;
          if (bd === 'Short') return ((dx / W0) ** 2 + ((y - 25) / 4.6) ** 2) <= 1;
          if (bd === 'Braided') return k < 4 ? Math.abs(dx) <= W0 - k * 0.9 : (Math.abs(dx) <= 1.6 && y < 41);
          if (bd === 'Forked') { if (k < 7) return Math.abs(dx) <= W0 - k * 0.4; const ex2 = Math.abs(Math.abs(dx) - 2.6 - (k - 7) * 0.2); return ex2 <= 1.8 - (k - 7) * 0.12; }
          if (bd === 'Spade') return k < 6 ? Math.abs(dx) <= W0 + k * 0.12 : Math.abs(dx) <= W0 + 0.7 - (k - 6) * 2.4;
          if (bd === 'Wispy') return k < 2 ? Math.abs(dx) <= 3.2 : Math.abs(dx - Math.sin(k * 0.5 + t) * 0.4 * (k / 12)) <= 2.3 - k * 0.12;
          if (bd === 'Plaited') return k < 3 ? Math.abs(dx) <= W0 - k * 0.6 : [-3, 0, 3].some(cx0 => Math.abs(dx - cx0) <= 0.9) && k < 15 - Math.abs(dx) * 0.5;
          const sway = bd === 'Ember Beard' ? Math.sin(y * 0.8 + t * 3) * 0.7 : 0;
          return Math.abs(dx - sway * (k / 16)) <= W0 - k * 0.42;
        };
        const inB = (x, y) => beardTest(x + 0.5, y + 0.5);
        for (let y = 24; y < N + B; y++) for (let x = 8; x < 33; x++) {
          if (!inB(x, y)) continue;
          const rim = !inB(x - 1, y) || !inB(x + 1, y) || !inB(x, y + 1);
          const v = 0.55 + 0.4 * ((x + 0.5 - 20) / 7 * LX) - ((x + Math.floor(y / 3)) % 3 === 0 ? 0.28 : 0) - (y - 24) * 0.012;
          put(x, y, rim ? BEARD[0] : soft(BEARD, v, x, y), true);
        }
        if (bd === 'Braided') for (const by of [33, 37]) for (let x = 18; x <= 21; x++) put(x, by, GOLD[1], true);
        if (bd === 'Plaited') for (const cx0 of [17, 20, 23]) put(cx0, 35, GOLD[2], true);
        // the mustache over the upper lip, then the mouth below it
        if (!asFam) draw({ Walrus: ['bBTBBTBb', 'b......b'], Handlebar: ['B......B', '.BBTTBB.'], Droopy: ['.BBTTBB.', 'B......B', 'b......b'], Wispy: ['.bB..Bb.'] }[stache], 16, stache === 'Handlebar' ? 21 : 22);
        cp = 0;
        if (!asFam) draw(['.MKKM.', '..LL..'], 17, 23, false, MOUTHC);
      } else {
        // a clean-shaven smile with dimples, and a chin
        cp = 0;
        draw(['S....S', '.SKKS.', '..LL..'], 17, 22, false, MOUTHC);
      }
      cp = 0;
      if (asFam) famFace(t, blink, draw, true);
      if (trinket === 'Long Pipe') {
        for (let k = 0; k < 6; k++) put(22 + k, 23 + (k >> 1), hex('#6a4220'), true);
        draw(['GG', 'gg'], 28, 24);
        const r = ((t * 0.5) % 1) * 5;
        for (let a = 0; a < 6; a++) { const ang = a / 6 * 6.283; put(Math.round(29 + Math.cos(ang) * r * 0.6), Math.round(22 - r * 2.2 + Math.sin(ang) * r * 0.35), hex('#d8d4e0'), false); }
      }
      // hat: brim then cone, or a hood around the face
      const shape = shapeH;
      cp = 5;
      if (shape === 'Hood') {
        const hood = (x, y) => (((x - 20) / 11) ** 2 + ((y - 19.5) / 13.5) ** 2 <= 1 || (y < 9 && y > -1.5 && Math.abs(x - 20 - bend * (9 - y) * 0.35) <= (y + 1.5) * 0.75)) && !(((x - 20) / 7.6) ** 2 + ((y - 20.5) / 9) ** 2 <= 1 && y > 11.2);
        cp = 5;
        body(hood, R, 22, 8, 10, 13, 0.02);
        for (let y = 11; y < 31; y++) for (let x = 11; x < 29; x++) { const inner = ((x + 0.5 - 20) / 7.6) ** 2 + ((y + 0.5 - 20.5) / 9) ** 2; if (inner > 1 && inner < 1.28 && isSolid(x, y)) put(x, y, R[0], true); }
      } else {
        const brimRx = shape === 'Wide Brim' ? 16 : shape === 'Floppy' ? 13.5 : 12.5, brimY = 10.4;
        const tip = shape === 'Towering' ? -B + 0.5 : shape === 'Wide Brim' ? 0 : shape === 'Floppy' ? 0.5 : -2.5;
        const bendAmt = shape === 'Crooked' ? 6 : shape === 'Curled Tip' ? 9 : shape === 'Towering' ? 3 : shape === 'Floppy' ? 7 : 1.2;
        const coneTest = (x, y) => {
          if (y > brimY || y < tip) return false;
          const k = (brimY - y) / (brimY - tip);
          const cxx = 20 + bend * bendAmt * k * k * (shape === 'Curled Tip' ? 1.2 : 1);
          const hw = (shape === 'Floppy' ? 8.6 : 7.8) * (1 - k) + (shape === 'Floppy' ? 1.6 : 0.6) + (shape === 'Curled Tip' && k > 0.6 ? 0.8 : 0);
          return Math.abs(x - cxx) <= hw;
        };
        body(coneTest, R, 22, 1, 9, 11, 0.05);
        if (shape === 'Curled Tip') {
          // the tip flops over and hangs down
          const fx = 20 + bend * 11, fy = 0;
          for (let i = 0; i < 6; i++) {
            const hx = Math.round(fx + bend * (i < 3 ? i * 0.6 : 1.6));
            put(hx, fy + i, tone(R, 0.55, hx, fy + i), true); put(hx - bend, fy + i, tone(R, 0.3, hx - bend, fy + i), true);
          }
          const px0 = Math.round(fx + bend * 1.6);
          put(px0, fy + 6, GOLD[2], true); put(px0 - bend, fy + 6, GOLD[1], true); put(px0, fy + 7, GOLD[1], true); put(px0 - bend, fy + 7, GOLD[0], true);
        }
        if (shape === 'Floppy') for (const [px1, py1] of [[16, 5], [23, 2]]) { for (let y = py1; y < py1 + 2; y++) for (let x = px1; x < px1 + 3; x++) if (coneTest(x + 0.5, y + 0.5)) put(x, y, tone(R, 0.2, x, y), true); put(px1 + 1, py1 + 1, GOLD[1], true); }
        if (shape === 'Star-Spangled') for (const [sx, sy] of [[18, 2], [22, 4], [16, 6], [21, 0], [24, 7]]) if (coneTest(sx + 0.5, sy + 0.5)) { put(sx, sy, GOLD[2], true); if (sy % 2) { put(sx - 1, sy, GOLD[1], true); put(sx + 1, sy, GOLD[1], true); } }
        body(ell(20, brimY, brimRx, 2.4), R, 22, 8, brimRx, 4, 0.1);
        // band and badge
        cp = 0;
        for (let x = 12; x < 29; x++) for (let y = 6; y <= 7; y++) if (coneTest(x + 0.5, y + 0.5)) put(x, y, tone(GOLD, 0.3 + (x - 12) * 0.03, x, y), true);
        const emx = 20 + Math.round(bend * bendAmt * 0.02);
        // the badge: a moon and star, a star, an eye, a rune or a buckle on the band (never a lone crescent that reads as a letter)
        const BADGE = { Crescent: [['..W..', 'G...G', 'GG.GG', '.GGG.'], 2], Star: [['..W..', 'GGGGG', '.GgG.', '.G.G.'], 2], Eye: [['.ggg.', 'gWPWg', '.ggg.'], 3], Rune: [['..G..', '.G.G.', '..G..', 'G.g.G'], 2], Buckle: [['GGGGG', 'G.g.G', 'G.g.G', 'gGGGg'], 5] }[badge];
        if (BADGE) BADGE[0].forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] !== '.') put(emx - 2 + i, BADGE[1] + j, row[i] === 'G' ? GOLD[2] : row[i] === 'g' ? GOLD[1] : row[i] === 'W' ? hex('#ffffff') : INK, true); });
        if (shape === 'Towering') for (let y = -3; y < 5; y += 3) put(20 + Math.round(bend * 3 * ((brimY - y) / (brimY - tip)) ** 2) - 1, y, GOLD[2], true);
        if (trinket === 'Feather') {
          // a curling plume tucked into the band, its tip nodding
          const nod = Math.sin(t * 1.2) > 0.5 ? 1 : 0;
          [[13, 7], [12, 6], [11, 5], [11, 4], [10, 3], [10, 2], [10 + nod, 1], [11 + nod, 0]].forEach(([fx, fy], k) => { put(fx, fy, k < 2 ? hex('#f4ecd8') : hex('#c8402e'), true); if (k > 1) put(fx - 1, fy, k > 5 ? hex('#ff8a6a') : hex('#8a2418'), true); });
        }
        if (trinket === 'Bell on Tip') {
          const k = 1, tx = Math.round(20 + bend * bendAmt * k * k * (shape === 'Curled Tip' ? 1.2 : 1)), ty = Math.max(-B, Math.round(tip) - 1);
          const sw = Math.sin(t * 2.4) > 0.3 ? 1 : 0;
          put(tx + sw, ty, GOLD[2], true); put(tx - 1 + sw, ty + 1, GOLD[1], true); put(tx + sw, ty + 1, GOLD[2], true); put(tx + 1 + sw, ty + 1, GOLD[0], true);
        }
      }
      if (trinket === 'Spellbook') {
        body((x, y) => x > 3 && x < 10 && y > 34 && y < 42, R, 5, 36, 4, 4, -0.15);
        for (let y = 35; y < 42; y++) put(4, y, GOLD[1], true);
        for (let x = 5; x < 10; x++) put(x, 41, hex('#f0e8d0'), true);
        put(7, 37, GOLD[2], true); put(6, 38, GOLD[2], true); put(8, 38, GOLD[2], true); put(7, 39, GOLD[2], true);
      }
      if (trinket === 'Potion') {
        const bub = Math.floor(t * 3) % 3;
        body((x, y) => ((x - 30.5) / 2.4) ** 2 + ((y - 38) / 2.4) ** 2 <= 1 || (Math.abs(x - 30.5) < 0.9 && y > 34 && y < 37), ramp(['#1a4a2a', '#3ad06a', '#b8ffcc']), 31, 37, 3, 3, 0.1);
        put(30, 34, hex('#8a5a2a'), true); put(31, 34, hex('#8a5a2a'), true);
        put(30 + (bub & 1), 37 - bub, hex('#e8fff0'), true);
      }
      // beard sparkles while the wizard chuckles
      if (t < chuckleUntil) for (let k = 0; k < 5; k++) { const a = (t * 7 + k * 2.3); put(Math.round(20 + Math.sin(a) * 5), Math.round(28 + Math.cos(a * 1.3) * 4), GOLD[2], true); }
      if (trinket === 'Hourglass') {
        // the coveted hourglass: sand runs down over eight seconds; tapped, it flips and time stands still
        const hx0 = 2, hy0 = 13 + (Math.sin(realT * 1.1) > 0.6 ? -1 : 0), flipping = realT < flipUntil;
        const ph = Math.min(1, Math.max(0, (realT - sandFrom) / 8));
        const W1 = [5, 4, 3, 2], up = flipping && Math.floor(realT * 8) % 2;
        for (let k = -1; k <= 7; k++) { put(hx0 + k, hy0, GOLD[k === -1 || k === 7 ? 1 : 2], true); put(hx0 + k, hy0 + 10, GOLD[1], true); }
        for (let k = 1; k < 10; k++) { put(hx0, hy0 + k, GOLD[1], true); put(hx0 + 6, hy0 + k, GOLD[0], true); }
        const GL = [hex('#9cc8e8'), hex('#d8f0ff')], SAND = [hex('#c8902a'), hex('#f4cc62')];
        for (let r = 0; r < 4; r++) for (let q = 0; q < W1[r]; q++) {
          const xq = hx0 + 3 - Math.floor(W1[r] / 2) + q + (W1[r] % 2 ? 0 : 0);
          const topRow = hy0 + 1 + r, botRow = hy0 + 9 - r;
          const sandTop = r >= Math.floor(ph * 4) + (up ? 0 : 0), sandBot = r < Math.ceil(ph * 4);
          put(xq, up ? botRow : topRow, sandTop && ph < 1 ? SAND[(xq + r) % 2] : GL[q === 0 ? 1 : 0], true);
          put(xq, up ? topRow : botRow, sandBot ? SAND[(xq + r + 1) % 2] : GL[q === 0 ? 1 : 0], true);
        }
        put(hx0 + 3, hy0 + 5, ph < 1 ? SAND[1] : GL[0], true);
        if (ph < 1 && !flipping) put(hx0 + 3, hy0 + 6 + Math.floor(realT * 6) % 2, SAND[1], true);
      }
      // familiar (the swapped one wears the clothes; the wizard rides tiny on its shoulder, or for a second they swap back)
      cp = 0;
      const fam = swapped ? (asFam ? 'Tiny Wizard' : creature) : familiar[0];
      if (fam === 'Tiny Wizard') tinyWizard(t);
      const hop = Math.sin(t * 1.7) > 0.7 ? -1 : 0;
      if (fam === 'Owl') {
        const ax = 5, ay = 25 + hop;
        body(ell(ax + 2.5, ay + 3, 3, 3.6), ramp(['#3a2414', '#7a5030', '#c09060']), ax + 3, ay + 2, 3, 3, 0);
        put(ax + 1, ay + 2, hex('#ffe070'), true); put(ax + 4, ay + 2, hex('#ffe070'), true);
        put(ax + 1, ay + 2 + 0, blink ? hex('#7a5030') : hex('#ffe070'), true);
        put(ax + 2, ay + 3, hex('#e0a020'), true); put(ax + 3, ay + 3, hex('#e0a020'), true);
        put(ax, ay - 1, hex('#3a2414'), true); put(ax + 5, ay - 1, hex('#3a2414'), true);
      } else if (fam === 'Toad') {
        const ax = 8, ay = 5 + hop;
        body(ell(ax + 2.5, ay + 2, 3, 1.8), ramp(['#24401a', '#4a8a34', '#8ad05a']), ax + 3, ay + 1, 3, 2, 0);
        put(ax + 1, ay, hex('#ffe070'), true); put(ax + 4, ay, hex('#ffe070'), true);
        put(ax + 1, ay + 1, INK, true); put(ax + 4, ay + 1, INK, true);
      } else if (fam === 'Moth') {
        const ax = 6 + Math.round(Math.sin(t * 0.8) * 1.5), ay = 7 + Math.round(Math.cos(t * 1.1));
        const flap = Math.sin(t * 9) > 0;
        put(ax, ay, hex('#e8dcc0'), true); put(ax, ay + 1, hex('#a89070'), true);
        for (const s of [-1, 1]) { put(ax + s, ay, hex('#f4ecd8'), true); if (flap) { put(ax + 2 * s, ay - 1, hex('#f4ecd8'), true); put(ax + s, ay - 1, hex('#e8dcc0'), true); } else put(ax + s, ay + 1, hex('#e8dcc0'), true); }
      } else if (fam === 'Mouse') {
        const ax = 27, ay = 26 + hop;
        body(ell(ax + 2, ay + 2, 2.6, 1.8), ramp(['#4a4048', '#8a7e86', '#c8bec4']), ax + 2, ay + 1, 3, 2, 0);
        put(ax, ay, hex('#e8a8b0'), true); put(ax + 3, ay, hex('#e8a8b0'), true);
        put(ax + 1, ay + 2, INK, true); put(ax + 3, ay + 2, INK, true); put(ax + 2, ay + 3, hex('#e86a8a'), true);
      } else if (fam === 'Raven') {
        const ax = 4, ay = 25 + hop;
        body(ell(ax + 3, ay + 3, 2.8, 3.4), ramp(['#08080e', '#22223a', '#4a4a6a']), ax + 4, ay + 2, 3, 3, 0);
        put(ax + 4, ay, hex('#22223a'), true); put(ax + 5, ay, hex('#22223a'), true); put(ax + 6, ay + 1, hex('#c8a040'), true); put(ax + 7, ay + 1, hex('#8a6a20'), true);
        put(ax + 4, ay + 1, blink ? hex('#22223a') : hex('#ffe070'), true);
      } else if (fam === 'Snail') {
        const ax = 26 + Math.round(Math.sin(t * 0.2) * 1), ay = 28;
        body(ell(ax + 2, ay + 1.5, 2.2, 2.2), ramp(['#5a3010', '#b06a2a', '#f0b060']), ax + 3, ay, 2, 2, 0);
        put(ax + 2, ay + 1, hex('#5a3010'), true); put(ax + 1, ay + 2, hex('#5a3010'), true);
        for (let x = ax - 1; x < ax + 5; x++) put(x, ay + 4, hex('#b8c890'), true);
        put(ax - 1, ay + 3, hex('#b8c890'), true); put(ax - 2, ay + 2, hex('#b8c890'), true); put(ax - 2, ay + 1, INK, true);
      } else if (fam === 'Wisp') {
        const ax = 6 + Math.round(Math.sin(t * 0.7) * 1.5), ay = 10 + Math.round(Math.cos(t * 0.9) * 1.5), fl = Math.floor(t * 6) % 2;
        const WP = O || GOLD;
        put(ax, ay - 2 - fl, WP[2], false); put(ax, ay - 1, WP[2], true); put(ax - 1, ay, WP[1], true); put(ax, ay, hex('#ffffff'), true); put(ax + 1, ay, WP[1], true); put(ax, ay + 1, WP[1], true); put(ax + fl * 2 - 1, ay - 1, WP[0], false);
      } else if (fam === 'Bat') {
        const ax = 6, ay = 13 + (Math.sin(t * 0.8) > 0.6 ? 1 : 0);
        const BT = ramp(['#14101a', '#3a3044', '#6a5a74']);
        body(ell(ax + 0.5, ay + 2, 1.6, 2.2), BT, ax, ay + 1, 2, 2, 0);
        put(ax - 2, ay + 1, BT[1], true); put(ax - 1, ay, BT[1], true); put(ax + 2, ay + 1, BT[1], true); put(ax + 1, ay, BT[1], true);
        put(ax, ay + 3, hex('#ffd060'), true); put(ax - 1, ay - 1, BT[0], true); put(ax + 1, ay - 1, BT[0], true);
      } else if (fam === 'Tiny Dragon') {
        const ax = 4, ay = 24 + hop;
        body(ell(ax + 3, ay + 3, 3.4, 2.4), ramp(['#5a0a10', '#c02a2a', '#ff7a4a']), ax + 3, ay + 2, 3, 2, 0);
        put(ax + 6, ay + 1, hex('#c02a2a'), true); put(ax + 7, ay, hex('#ff7a4a'), true);
        put(ax + 6, ay + 2, hex('#ffe070'), true);
        put(ax + 1, ay, hex('#ff7a4a'), true); put(ax + 2, ay + 1, hex('#ff7a4a'), true); put(ax, ay - 1, hex('#ffb070'), true);
        if (Math.sin(t * 1.3) > 0.85) { put(ax + 8, ay + 1, hex('#ffe070'), false); put(ax + 9, ay + 1, hex('#ff9a30'), false); }
      }
      // outline: background cells touching the figure
      for (let Y = 0; Y < W; Y++) for (let X = 0; X < W; X++) {
        if (solid[Y * W + X]) continue;
        const x = X - B, y = Y - B;
        if (isSolid(x - 1, y) || isSolid(x + 1, y) || isSolid(x, y - 1) || isSolid(x, y + 1)) col[Y * W + X] = INK;
      }
      legendPass(t);
      orbLight(t);
      // spells: a dithered bolt from the orb (or the hat's emblem) that bursts into a ring of sparks
      const SP = O || ramp(['#6a4208', '#d09a24', '#ffe27a']);
      for (let i = spells.length - 1; i >= 0; i--) {
        const sp = spells[i], u = (t - sp.t0) / 0.45;
        if (u > 2.2) { spells.splice(i, 1); continue; }
        if (u < 1) {
          const e = 1 - (1 - u) * (1 - u);
          for (let k = 7; k >= 0; k--) {
            const w = Math.max(0, e - k * 0.05);
            const bx = Math.round(sp.x0 + (sp.x1 - sp.x0) * w + Math.sin(w * 9 + k) * (1 - w) * 1.5);
            const by = Math.round(sp.y0 + (sp.y1 - sp.y0) * w - Math.sin(w * 3.14) * 5);
            if (k === 0) { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) put(bx + dx, by + dy, SP[1], false); put(bx, by, hex('#ffffff'), false); }
            else if ((k + Math.floor(t * 8)) % 3) put(bx, by, SP[k < 4 ? 2 : 1], false);
          }
        } else {
          const r = 1 + (u - 1) * 4.5;
          for (let a = 0; a < 12; a++) {
            const ang = a * 0.5236 + sp.spin, rr = r * (a % 2 ? 0.7 : 1);
            const px = Math.round(sp.x1 + Math.cos(ang) * rr), py = Math.round(sp.y1 + Math.sin(ang) * rr);
            if (u < 1.8 || (a + Math.floor(u * 8)) % 2) { put(px, py, a % 2 ? SP[2] : SP[1], false); if (u < 1.5 && a % 2 === 0) put(Math.round(sp.x1 + Math.cos(ang) * (rr - 1)), Math.round(sp.y1 + Math.sin(ang) * (rr - 1)), SP[0], false); }
          }
          if (u < 1.35) for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) put(Math.round(sp.x1) + dx, Math.round(sp.y1) + dy, dx || dy ? SP[2] : hex('#ffffff'), false);
        }
      }
    }

    // ---------- the legendaries, laid over the finished figure ----------
    let realT = 0, flipUntil = -1, sandFrom = 0, freezeUntil = -1, freezeAt = 0;
    let overFig = false, lean = 0, bloomUntil = -1, shootAt = -9, flareUntil = -1;
    const NEB = [hex('#3a1a6a'), hex('#123a5a')], STAR = hex('#ffffff'), STAR2 = hex('#aab4ff'), LINE = hex('#4a4aa8'), LINEG = hex('#ffe27a');
    const PUFF = [hex('#ffffff'), hex('#cfcade')], PETAL = hex('#ffc0dc'), POLLEN = hex('#ffe070'), BERRY = hex('#d0283a');
    const FIRE = ramp(['#2a0602', '#8a1806', '#e0501a', '#ffa82a', '#fff0a0']), HOT = hex('#ffffff');
    const CONST = [[6, 38], [11, 34], [16, 39], [23, 35], [28, 39], [32, 34]];
    const DEEP = ramp(['#02020c', '#0a0a2c', '#1a1a52']), MOON = [hex('#c8c0a0'), hex('#f6f0d4')];
    function legendPass(t) {
      if (legend === 'None') return;
      if (legend === 'Living Flame') {
        // fire: every robe, hair and beard cell burns in an ordered-dither flame that rises and leans
        const flare = t < flareUntil ? (flareUntil - t) / 0.7 : 0;
        const heat = (x, y) => 0.5 + 0.22 * Math.sin(x * 0.9 + lean * y * 0.12 + y * 0.5 + t * 7) + 0.18 * Math.sin(x * 0.37 - y * 1.1 + t * 9.3) + 0.12 * Math.sin((y + t * 11) * 0.8);
        const tops = [];
        for (let Y = 0; Y < W; Y++) for (let X = 0; X < W; X++) {
          const i = Y * W + X, x = X - B, y = Y - B, cc = col[i];
          if (!solid[i]) continue;
          if (R.includes(cc) || H.includes(cc) || BEARD.includes(cc)) {
            let h = heat(x, y) * 0.75 + (y / N) * 0.3 + flare * 0.35 + (cc === R[2] || cc === H[2] ? 0.1 : 0);
            if (!isSolid(x, y - 1)) { h -= 0.15; tops.push([x, y]); }
            const p = Math.max(0, Math.min(3.999, h * 4)), k = Math.floor(p);
            col[i] = FIRE[Math.min(4, (p - k) > th(x, y) ? k + 1 : k)];
          } else if (skin.includes(cc)) col[i] = FIRE[cc === skin[0] ? 2 : cc === skin[1] ? 3 : 4];
          else if (cc === INK) col[i] = FIRE[0];
        }
        // tongues of flame licking up off the top edges into the night
        for (const [x, y] of tops) {
          const L = Math.floor((heat(x * 1.7, y - 3) - 0.25) * 4 + flare * 3);
          for (let k = 1; k <= L; k++) if (!isSolid(x + Math.round(lean * k * 0.4), y - k)) put(x + Math.round(lean * k * 0.4), y - k, FIRE[Math.max(1, 3 - k)], false);
        }
        return;
      }
      for (let Y = 0; Y < W; Y++) for (let X = 0; X < W; X++) {
        const i = Y * W + X, x = X - B, y = Y - B, cc = col[i];
        if (!solid[i]) continue;
        if (legend === 'Starweave' && R.includes(cc)) {
          // not cloth at all: a hole cut into the deep sky, flat and unshaded, with a nebula, a slowly turning
          // field of stars and a moon, all sliding a little the other way when the pointer moves (parallax)
          const px = x - lean * 2.4, py = y;
          col[i] = tone(DEEP, 0.1 + (py + B) / W * 0.42, x, y);
          const neb = Math.sin(px * 0.31 + py * 0.17 + 1.3 + t * 0.05) + Math.sin(px * 0.11 - py * 0.27) * 0.8;
          if (neb > 0.95 && th(x, y) < (neb - 0.95) * 1.2) col[i] = NEB[0];
          else if (neb < -1.05 && th(x, y) < (-neb - 1.05) * 1.2) col[i] = NEB[1];
          const ca = Math.cos(t * 0.03), sa = Math.sin(t * 0.03), rx = (px - 20) * ca - (py - 46) * sa, ry = (px - 20) * sa + (py - 46) * ca;
          const sh = ((Math.floor(rx + 400) * 73856093) ^ (Math.floor(ry + 400) * 19349663)) >>> 0;
          if (sh % 15 === 0) col[i] = Math.sin(t * 2.2 + (sh % 7)) > -0.3 ? STAR : STAR2;
          else if (sh % 15 === 7 && sh % 2 === 0) col[i] = STAR2;
          const mx = 29 - lean * 1.2, my = 37, dm = Math.hypot(x + 0.5 - mx, y + 0.5 - my);
          if (dm < 3.4 && Math.hypot(x + 0.5 - mx - 1.5, y + 0.5 - my + 1) > 2.9) col[i] = dm > 2.6 ? MOON[0] : MOON[1];
        }
        if (legend === 'Hedge Born') {
          if (R.includes(cc) || H.includes(cc) || BEARD.includes(cc)) {
            // leaves in clusters, a few blossoms and berries; they rustle when the viewer comes near
            const rmp = R.includes(cc) ? R : H, ru = overFig ? Math.floor(t * 8) % 2 : 0;
            const v = (x * 5 + y * 3 + ru * 2 + 700) % 7;
            if (v === 0) col[i] = rmp[2]; else if (v === 3 || (v === 4 && (x + y) % 2)) col[i] = rmp[0];
            const fl = (x * 7 + y * 13 + 900) % (t < bloomUntil ? 11 : 37);
            if (fl === 0) col[i] = PETAL; else if (fl === 5 && t < bloomUntil) col[i] = POLLEN;
            if ((x * 11 + y * 5 + 300) % 53 === 0) col[i] = BERRY;
          } else if (skin.includes(cc) && cc !== skin[0] && (x + 900) % 3 === 0) col[i] = skin[0];
        }
      }
      if (swapped) {
        // a puff of smoke whenever the two swap places
        for (const p0 of [swapAt, swapUntil]) {
          const u = (realT - p0) / 0.45;
          if (u < 0 || u > 1) continue;
          for (const [cx0, cy0, r0] of [[20, 19, 10], [10, 27, 5]]) for (let y = Math.floor(cy0 - r0); y <= cy0 + r0; y++) for (let x = Math.floor(cx0 - r0); x <= cx0 + r0; x++) {
            const d = Math.hypot(x + 0.5 - cx0, y + 0.5 - cy0) / r0 + 0.25 * Math.sin(x * 1.7 + y * 2.3);
            if (d < 0.35 + 0.65 * u && th(x, y) < 1.05 - u) { const X = x + B, Y = y + B; if (X >= 0 && Y >= 0 && X < W && Y < W) col[Y * W + X] = th(x, y) < 0.35 ? PUFF[0] : PUFF[1]; }
          }
        }
      }
      if (legend === 'Starweave') {
        // a constellation stitched across the chest; it lights up gold when the pointer is over the wizard
        const lit = overFig;
        for (let k = 0; k + 1 < CONST.length; k++) {
          const [ax, ay] = CONST[k], [bx, by] = CONST[k + 1], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay));
          for (let j = 1; j < n; j++) { const x = Math.round(ax + (bx - ax) * j / n), y = Math.round(ay + (by - ay) * j / n); if (isSolid(x, y) && (lit || j % 2 === 0)) put(x, y, lit ? LINEG : LINE, true); }
        }
        CONST.forEach(([x, y], k) => {
          if (!isSolid(x, y)) return;
          put(x, y, STAR, true);
          if (lit || Math.sin(t * 1.5 + k * 1.9) > 0.6) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (isSolid(x + a, y + b)) put(x + a, y + b, lit ? LINEG : STAR2, true);
        });
        // hair and beard stream away from the orb like a comet's tail: off the hair into the night on the left,
        // and down off the beard into the sky of the robe
        for (let Y = 0; Y < W; Y++) for (let X = W - 1; X >= 1; X--) {
          const i = Y * W + X, x = X - B, y = Y - B;
          if (!solid[i] || !H.includes(col[i]) || solid[i - 1]) continue;
          const L = 2 + Math.floor((Math.sin(y * 0.9 + t * 3) + 1) * 2);
          for (let k = 1; k <= L && X - k >= 0; k++) { const j = i - k; if (solid[j]) break; if (th(x - k, y) < 1 - k / (L + 1)) col[j] = k < 2 ? H[2] : k < 4 ? H[1] : H[0]; }
        }
        for (let X = 0; X < W; X++) for (let Y = W - 2; Y >= 0; Y--) {
          const i = Y * W + X, x = X - B, y = Y - B;
          if (!solid[i] || part[i] !== 4 || part[i + W] !== 1) continue;
          const L = 2 + Math.floor((Math.sin(x * 1.3 + t * 2.4) + 1) * 1.5);
          for (let k = 1; k <= L && Y + k < W; k++) { const j = i + k * W; if (part[j] !== 1) break; if (th(x, y + k) < 1 - k / (L + 1)) col[j] = k < 2 ? H[2] : k < 3 ? H[1] : H[0]; }
          break;
        }
        // a shooting star, sent across the sky by a tap
        const u = (t - shootAt) / 0.7;
        if (u >= 0 && u < 1) for (let k = 0; k < 7; k++) { const w = u - k * 0.03; if (w < 0) continue; put(Math.round(-2 + w * 44), Math.round(4 + w * 30), k === 0 ? STAR : k < 3 ? LINEG : STAR2, isSolid(Math.round(-2 + w * 44), Math.round(4 + w * 30))); }
      }
    }

    // the swapped familiar's face: big eyes and a nose, whiskers or beak of its own (late: the parts drawn over the beard)
    let swapAt = -9, swapUntil = -1;
    function famFace(t, blink, draw, late) {
      const SK = skin;
      if (creature === 'Toad') {
        if (late) { for (let x = 14; x <= 25; x++) put(x, x === 14 || x === 25 ? 21 : 22, SK[0], true); for (let x = 15; x <= 24; x++) put(x, 21, INK, true); return; }
        for (const cx0 of [14, 21]) draw(blink ? ['.LLL.', 'LMMML', 'LSSSL', '.LLL.'] : ['.LLL.', 'LYYYL', 'LKKKL', '.LYL.'], cx0, 13, false);
        put(19, 19, SK[0], true); put(20, 19, SK[0], true);
        for (const [x, y] of [[15, 19], [24, 18], [17, 23], [23, 23], [13, 21]]) if (isSolid(x, y)) put(x, y, SK[0], true);
      } else if (creature === 'Mouse') {
        if (late) return;
        for (const ex of [16, 22]) draw(blink ? ['..', 'KK'] : ['WK', 'KK'], ex, 16, false);
        for (let y = 19; y < 23; y++) for (let x = 17; x < 23; x++) if (isSolid(x, y) && Math.hypot(x + 0.5 - 20, y + 0.5 - 20.5) < 2.9) put(x, y, SK[2], true);
        put(19, 19, hex('#ff9ab0'), true); put(20, 19, hex('#e86a8a'), true); put(19, 20, hex('#e86a8a'), true); put(20, 20, hex('#c84a6a'), true);
        put(19, 22, hex('#ffffff'), true); put(20, 22, hex('#e8e4ec'), true);
        const WH = hex('#f4f0f8');
        for (const [x, y] of [[16, 21], [15, 21], [14, 20], [13, 20], [16, 22], [15, 22], [14, 23], [13, 23]]) { put(x, y, WH, true); put(39 - x, y, WH, true); }
      } else {
        if (!late) { for (const [ex, fl] of [[15, false], [22, true]]) draw(blink ? ['...', 'MMM'] : ['MWM', 'WWK', '.M.'], ex, 15, fl); return; }
        // the raven's great beak, over the beard's top
        ['.LM.', 'LLMS', 'LLMS', '.LMS', '.LS.', '..S.'].forEach((row, j) => { for (let i = 0; i < 4; i++) if (row[i] !== '.') put(18 + i, 18 + j, row[i] === 'L' ? hex('#8a8a98') : row[i] === 'M' ? hex('#5a5a66') : hex('#2a2a34'), true); });
      }
    }
    // the wizard, shrunk and in a nightshirt, waving from the familiar's shoulder
    function tinyWizard(t) {
      const wave = Math.floor(t * 3) % 2, x0 = 7, y0 = 22 + (Math.sin(t * 1.7) > 0.7 ? -1 : 0);
      const C = { S: SKIN0[1], s: SKIN0[0], K: INK, W: H[2], w: H[1], U: hex('#ece4d4'), u: hex('#c8bca8') };
      ['..SSS..', '.SSSSS.', 'WSKSKSW', 'WSSsSSW', '.WWWWW.', wave ? 'U.WwW.U' : '.UWwWU.', wave ? '.UWWWU.' : 'UUWWWUU', '.UUUUU.', '.UuUuU.', '.s...s.', '.K...K.']
        .forEach((row, j) => { for (let i = 0; i < 7; i++) if (row[i] !== '.') put(x0 + i, y0 + j, C[row[i]], true); });
    }
    // the orb lights the wizard: its colour in the cells on the orb's side, and a dithered rim wherever the
    // silhouette faces it, stronger as the pointer comes near the orb. Skin and beard get no dither: only the one
    // edge cell facing the orb, a smooth blend toward the light (a warm light, never pink, on the two deepest skins)
    const LT = O ? [0, 1, 2].map(k => Math.round((O[1][k] + O[2][k]) / 2)) : null, TINT = new Map();
    const FACE_LT = darkFace ? hex('#ffc27a') : LT, FTINT = new Map();
    const tint = (c0, k) => { let m = TINT.get(k); if (!m) TINT.set(k, m = new Map()); let v = m.get(c0); if (!v) m.set(c0, v = [0, 1, 2].map(j => Math.round(c0[j] + (LT[j] - c0[j]) * k))); return v; };
    const ftint = (c0, k) => { let m = FTINT.get(k); if (!m) FTINT.set(k, m = new Map()); let v = m.get(c0); if (!v) m.set(c0, v = [0, 1, 2].map(j => Math.round(c0[j] + (FACE_LT[j] - c0[j]) * k))); return v; };
    function orbLight(t) {
      if (!O || legend === 'Living Flame') return;
      const lv = Math.round(near * 4) / 4, str = 0.6 + 0.4 * lv, k = 0.4 + 0.2 * lv;
      for (let Y = 0; Y < W; Y++) for (let X = 0; X < W; X++) {
        const i = Y * W + X, p = part[i];
        if (!p || !solid[i] || (legend === 'Starweave' && (p === 1 || p === 5))) continue;
        // how far this cell is from the edge that faces the orb: open air, or a part that sits behind it
        // (robe, then hair, skin, beard, hat in front); features inside a part don't break it
        let d = 0;
        for (let q = 1; q <= 3; q++) {
          if (X + q >= W) { d = q; break; }
          const j = i + q, pj = part[j];
          if (!solid[j] || (pj && pj < p)) { d = q; break; }
          if (pj && pj !== p) break;
        }
        if (!d) continue;
        const x = X - B, y = Y - B, fall = Math.max(0.2, Math.min(1, 1.25 - Math.hypot(x - 34, y - 8) / 34)), dd = th(x, y);
        if (p === 3 || p === 4) { if (d === 1) col[i] = ftint(col[i], Math.round(8 * Math.min(0.8, (k + 0.15) * Math.min(1, fall * 1.15))) / 8); continue; }
        if (dd >= fall * str * (d === 1 ? 1 : d === 2 ? 0.7 : 0.4)) continue;
        col[i] = d === 1 && p !== 3 ? (dd < 0.3 * str ? O[2] : O[1]) : tint(col[i], d === 1 ? k + 0.15 : k);
      }
    }

    const ctx = c.ctx;
    // the view: cells -2..41 across and -4..39 down, so the tallest hats keep their tips in the frame
    // (nearest whole cell size; any spare pixels go to the bottom, where the robe carries on, and when the whole
    // drawing is smaller than the canvas it sits centred)
    const VW = N + 4, cell = Math.max(1, Math.round(S / VW)), off = Math.floor((S - cell * VW) / 2);
    const small = W * cell <= S, mid = Math.floor((S - W * cell) / 2) + B * cell;
    const X0 = small ? mid : Math.min(off + 2 * cell, B * cell), Y0 = small ? mid : Math.min(off + 4 * cell, B * cell); // where grid cell (0, 0) lands
    const can = document.createElement('canvas');
    can.width = can.height = W;
    const cx2 = can.getContext('2d');
    const img = cx2.createImageData(W, W);
    // the spell's song: a lydian arpeggio on a key set by the last bytes of the hash
    const home = 55 + parseInt(c.hash.slice(-3), 16) % 10, LYD = [0, 2, 4, 6, 7, 9, 11];
    const lyd = k => home + 12 * Math.floor(k / 7) + LYD[((k % 7) + 7) % 7];
    const wave = orb[0] === 'Frost Orb' || orb[0] === 'Wisp Orb' ? 'sine' : 'triangle';
    let lastCast = -9;
    // the familiar's own voice: a croak, a squeak or a caw
    const famCall = (vel, at = 0) => {
      if (creature === 'Toad') [0, 0.16].forEach(d => c.sound.note(lyd(-12), { dur: 0.11, vel: vel * 1.6, wave: 'triangle', cutoff: 500, at: at + d }));
      else if (creature === 'Mouse') [14, 16, 14].forEach((k, i) => c.sound.note(lyd(k), { dur: 0.05, vel, wave: 'sine', at: at + i * 0.06 }));
      else [0, 0.22].forEach(d => c.sound.note(lyd(-3), { dur: 0.16, vel: vel * 1.2, wave: 'sawtooth', cutoff: 1400, at: at + d }));
    };
    function feel(t) {
      const inp = c.input;
      const tx = (lefty ? 1 - inp.x : inp.x) * S, ty = inp.y * S, ox = X0 + 34.5 * cell, oy = Y0 + 8.5 * cell;
      near = O && inp.inside ? Math.max(0, 1 - Math.hypot(tx - ox, ty - oy) / (S * 0.3)) : 0;
      if (O && t - lastCast < 0.4) near = Math.max(near, 1 - (t - lastCast) / 0.4);
      // the legendaries: is the pointer over the wizard, which way does the fire lean
      const gx = ((lefty ? 1 - inp.x : inp.x) * S - X0) / cell, gy = (inp.y * S - Y0) / cell;
      const wasOver = overFig;
      overFig = inp.inside && isSolid(Math.floor(gx), Math.floor(gy)) && Math.hypot(gx - 34, gy - 8) > 4;
      if (overFig && !wasOver) {
        if (legend === 'Starweave') CONST.forEach((q, i) => c.sound.note(lyd(7 + i * 2), { dur: 0.8, vel: 0.05, wave: 'sine', at: i * 0.08 }));
        if (legend === 'Hedge Born') { c.sound.hit('noise', 0.05, { cutoff: 2600, dur: 0.4 }); c.sound.note(lyd(9), { dur: 0.15, vel: 0.06, wave: 'triangle', at: 0.1 }); c.sound.note(lyd(11), { dur: 0.2, vel: 0.05, wave: 'triangle', at: 0.22 }); }
        if (legend === 'Living Flame') c.sound.hit('noise', 0.06, { cutoff: 700, dur: 0.6 });
        if (swapped) famCall(0.06);
      }
      lean += ((inp.inside ? Math.max(-1, Math.min(1, (gx - 20) / 14)) : 0) - lean) * 0.15;
      for (const p of inp.taps()) {
        const x1 = ((lefty ? 1 - p.x : p.x) * S - X0) / cell, y1 = (p.y * S - Y0) / cell;
        if (trinket === 'Hourglass' && x1 >= 0.5 && x1 <= 9.5 && y1 >= 11.5 && y1 <= 24.5) {
          // the hourglass flips and the whole world holds still while it does
          if (t < flipUntil) continue;
          flipUntil = t + 0.5; sandFrom = t + 0.5; freezeAt = Math.round(t * 8) / 8; freezeUntil = t + 2;
          for (let k = 0; k < 4; k++) c.sound.hit('click', 0.22, { at: k * 0.5 });
          c.sound.note(lyd(-7), { dur: 1.8, vel: 0.14, wave: 'sine', at: 0.05 });
          c.sound.note(lyd(-3), { dur: 1.6, vel: 0.06, wave: 'sine', at: 0.1 });
          continue;
        }
        if (legend === 'Starweave' && t - shootAt > 0.8) {
          shootAt = t;
          [11, 9, 7, 4].forEach((k, i) => c.sound.note(lyd(k + 7), { dur: 0.5, vel: 0.06, wave: 'sine', at: 0.05 + i * 0.09 }));
        }
        if (legend === 'Hedge Born' && isSolid(Math.floor(x1), Math.floor(y1))) {
          if (t > bloomUntil - 1) [0, 4, 7, 11].forEach((k, i) => c.sound.note(lyd(k + 7), { dur: 0.4, vel: 0.08, wave: 'triangle', cutoff: 1800, at: 0.2 + i * 0.12 }));
          bloomUntil = t + 2.5;
        }
        if (legend === 'Living Flame' && isSolid(Math.floor(x1), Math.floor(y1))) {
          flareUntil = t + 0.7;
          c.sound.hit('noise', 0.14, { cutoff: 900, dur: 0.7 });
          c.sound.note(lyd(-7), { dur: 0.9, vel: 0.16, wave: 'triangle', cutoff: 600 });
        }
        if (swapped && isSolid(Math.floor(x1), Math.floor(y1)) && Math.hypot(x1 - 34, y1 - 8) > 4) {
          // a puff, and for a second the wizard is the wizard again and the familiar is back on the shoulder
          if (t > swapUntil + 0.2) {
            swapAt = t; swapUntil = t + 1.1;
            c.sound.hit('noise', 0.14, { cutoff: 2600, dur: 0.3 });
            [4, 2, 0].forEach((k, i) => c.sound.note(lyd(k - 7), { dur: 0.14, vel: 0.18, wave: 'triangle', cutoff: 900, at: 0.15 + i * 0.17 }));
            famCall(0.1, 1.2);
          }
          continue;
        }
        // tapping the wizard: a chuckle, the eyes crinkle and the beard sparkles
        if (isSolid(Math.floor(x1), Math.floor(y1)) && Math.hypot(x1 - 34, y1 - 8) > 4 && y1 > 14) {
          if (t > chuckleUntil - 0.3) [4, 2, 0].forEach((k, i) => c.sound.note(lyd(k - 7), { dur: 0.14, vel: 0.2, wave: 'triangle', cutoff: 900, at: i * 0.17 }));
          chuckleUntil = t + 0.9;
          continue;
        }
        if (t - lastCast < 0.15 || spells.length > 5) continue;
        lastCast = t;
        spells.push({ x0: O ? 34 : 20, y0: O ? 8 : 9, x1, y1, t0: t, spin: (x1 + y1) * 0.3 });
        const top = Math.round((1 - p.y) * 7);
        c.sound.note(lyd(top), { dur: 0.3, vel: 0.22, wave, pan: p.x - 0.5 });
        c.sound.note(lyd(top + 2), { dur: 0.3, vel: 0.2, wave, pan: p.x - 0.5, at: 0.09 });
        c.sound.note(lyd(top + 4), { dur: 0.9, vel: 0.2, wave, pan: p.x - 0.5, at: 0.45 });
        c.sound.note(lyd(top + 7), { dur: 1.2, vel: 0.1, wave: 'sine', pan: p.x - 0.5, at: 0.5 });
      }
    }
    let last = '';
    function render(t) {
      feel(t);
      realT = t;
      // while the hourglass holds time still, the world keeps its frame and only the hourglass moves
      const frozen = t < freezeUntil, q = frozen ? Math.round(freezeAt * 8) : Math.round(t * 8);
      const key = q + (trinket === 'Hourglass' ? ':' + Math.round(t * 8) : '') + (legend !== 'None' ? ':' + overFig + Math.round(lean * 4) + (swapped ? ':' + (t < swapUntil) + (t - swapAt < 0.5 || Math.abs(t - swapUntil) < 0.5 ? Math.floor(t * 16) : '') : '') : '') + (near || spells.length || t < chuckleUntil + 0.2 ? ':' + Math.round(near * 6) + ':' + spells.length + ':' + (t < chuckleUntil) : '');
      if (key === last) return;
      last = key;
      compose(q / 8);
      const d = img.data;
      for (let i = 0; i < W * W; i++) { const v = col[i]; d[i * 4] = v[0]; d[i * 4 + 1] = v[1]; d[i * 4 + 2] = v[2]; d[i * 4 + 3] = 255; }
      cx2.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = false; // hard square cells
      if (lefty) { ctx.save(); ctx.translate(S, 0); ctx.scale(-1, 1); }
      ctx.drawImage(can, 0, 0, W, W, X0 - B * cell, Y0 - B * cell, W * cell, W * cell);
      if (lefty) ctx.restore();
    }
    render(0);
    return t => render(t);
  },
});

})(window.Proto);
