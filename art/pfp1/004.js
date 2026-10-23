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
      skin = ramp({ Toad: ['#24401a', '#4a8a34', '#8ad05a'], Mouse: ['#4a4048', '#8a7e86', '#c8bec4'], Raven: ['#0c0c1a', '#282846', '#545482'] }[creature]);
      if (beard[0] === 'Clean Shaven') beard = ['Long'];
      c.trait('Face', creature); c.trait('Eyes', creature + ' Eyes'); c.trait('Nose', 'None'); c.trait('Brows', 'None'); c.trait('Familiar', 'Tiny Wizard');
    }
    if (legend !== 'None') {
      c.trait('Robes', robes[0]); c.trait('Hair', hairCol[0]); c.trait('Sky', sky[0]); c.trait('Beard', beard[0]);
      c.trait('Legendary', legend);
    }
    c.trait('Trinket', trinket);
    // the legendaries drawn as 1/1 pictures of their own (legendWizard, below); every other wizard is drawn as before.
    // A type left out of this list falls back to the older drawing further down.
    const ONE_OF_ONE = ['Starweave', 'Hedge Born', 'Living Flame', 'Swapped'];
    if (legend === 'Hedge Born') return hedgeSampler();
    if (ONE_OF_ONE.includes(legend)) return legendWizard();

    // ---------- Hedge Born, redrawn as a claymation still: the hedge wizard sculpted in plasticine on a little
    // stop-motion set (80 x 80 pixels). Every lump is shaded as rounded clay from its own shape (lit from the top left,
    // a soft shadow where one lump sits on another and on the backdrop), with big clay eyeballs, a big clay nose and a
    // beard of leaf-green clay; the shading boils from frame to frame the way hand-moved clay does. Every trait the print
    // lists is sculpted: the sky as the set's backdrop (clay stars, moon, sun, pines, clouds, aurora or a bookcase), the
    // hat's shape, band and badge, the face, eyes, brows, nose, moustache, beard and hair, the familiar on his shoulder,
    // the staff and its orb, the trinket, the stance. The toy: tap to poke a fingerprint dent into the clay (the clay
    // keeps it a while); drag to drag a finger through it, a groove the animator smooths away when you let go (he winces
    // while you do); a tap on the orb makes it flare. ----------
    function hedgeSampler() {
      const M = 80, N = M * M, g = c.ctx, cel = Math.max(1, Math.floor(S / M)), of = Math.floor((S - cel * M) / 2);
      const can = document.createElement('canvas');
      can.width = can.height = M;
      const cx2 = can.getContext('2d'), img = cx2.createImageData(M, M), OUT = new Uint32Array(img.data.buffer);
      const mk = (r, gg, b) => ((255 << 24) | (b << 16) | (gg << 8) | r) >>> 0;
      const U = h => mk(parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16));
      const lyd3 = k => 55 + parseInt(c.hash.slice(-3), 16) % 10 + 12 * Math.floor(k / 7) + [0, 2, 4, 6, 7, 9, 11][((k % 7) + 7) % 7];
      // clay colours, each with a ramp of five tones (deep shadow, shadow, clay, lit, highlight)
      const RAMPS = [], RIDX = new Map();
      const rampOf = col => {
        let k = RIDX.get(col);
        if (k === undefined) {
          const r = col & 255, gg = (col >>> 8) & 255, b = (col >>> 16) & 255;
          const tone = f => f <= 1 ? mk(r * f | 0, gg * f | 0, b * f | 0) : mk(r + (255 - r) * (f - 1) | 0, gg + (255 - gg) * (f - 1) | 0, b + (255 - b) * (f - 1) | 0);
          RAMPS.push(Uint32Array.of(tone(0.5), tone(0.74), tone(1), tone(1.22), tone(1.5)));
          k = RAMPS.length - 1; RIDX.set(col, k);
        }
        return k;
      };
      const K = U('#1c1612'), RED = U('#d8402e'), YEL = U('#f2c234'), WHITE = U('#f4efe2'), HATC = U('#25633e'), ROBEC = U('#4a9a3a'), SLEEVEC = U('#3d8a34'),
        LEAFC = U('#b4da58'), LEAF2 = U('#4e8a2c'), FACEC = U('#e6a674'), NOSEC = U('#d8684a'), STAFFC = U('#8a5a2e'), BLUE = U('#3a78d0'), ORANGE = U('#f08a2e'),
        PINK = U('#f28aa4'), GREY = U('#e2e2e6'), MOUTH = U('#5a2418');
      const Z = new Uint8Array(N), C = new Uint32Array(N), FL = new Uint8Array(N);
      let zc = 0, SC = 1;
      // the wizard is modelled at 80 x 80 and set on the stage a fifth bigger, hat tip at the top
      const FX = x => 38 + (x - 38) * SC, FY = y => 2 + (y - 2) * SC;
      // paint a lump (a test per pixel centre, in the model's units; the test may return a colour of its own) on top of what's there
      const paint = (col, f, flat) => { zc++; const bb = f.bb, xa = bb ? Math.max(0, Math.floor(FX(bb[0])) - 1) : 0, xb = bb ? Math.min(M - 1, Math.ceil(FX(bb[2])) + 1) : M - 1, ya = bb ? Math.max(0, Math.floor(FY(bb[1])) - 1) : 0, yb = bb ? Math.min(M - 1, Math.ceil(FY(bb[3])) + 1) : M - 1; for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) { const v = f(38 + (x + 0.5 - 38) / SC, 2 + (y + 0.5 - 2) / SC, x + 0.5, y + 0.5); if (v) { const i = y * M + x; Z[i] = zc; C[i] = v === true ? col : v; FL[i] = flat ? 1 : 0; } } return zc; };
      const withBB = (f, bb) => { f.bb = bb; return f; };
      const disc = (cx, cy, r) => withBB((X, Y) => (X - cx) * (X - cx) + (Y - cy) * (Y - cy) <= r * r, [cx - r, cy - r, cx + r, cy + r]);
      const ell = (cx, cy, rx, ry) => withBB((X, Y) => ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2 <= 1, [cx - rx, cy - ry, cx + rx, cy + ry]);
      const segD = (X, Y, ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy, u = l ? Math.max(0, Math.min(1, ((X - ax) * dx + (Y - ay) * dy) / l)) : 0; return Math.hypot(X - ax - dx * u, Y - ay - dy * u); };
      const seg = (ax, ay, bx, by, r) => withBB((X, Y) => segD(X, Y, ax, ay, bx, by) <= r, [Math.min(ax, bx) - r, Math.min(ay, by) - r, Math.max(ax, bx) + r, Math.max(ay, by) + r]);
      const any = (...fs) => withBB((X, Y) => { for (const f of fs) if (f(X, Y)) return true; return false; }, fs.every(f => f.bb) ? [Math.min(...fs.map(f => f.bb[0])), Math.min(...fs.map(f => f.bb[1])), Math.max(...fs.map(f => f.bb[2])), Math.max(...fs.map(f => f.bb[3]))] : undefined);
      const mirror = f => withBB((X, Y) => f(76 - X, Y), f.bb && [76 - f.bb[2], f.bb[1], 76 - f.bb[0], f.bb[3]]);
      const at = (x, y) => (x >= 0 && y >= 0 && x < M && y < M ? y * M + x : -1);
      const sk = sky[0], hasStaff = !!orb[1], SX = 63.5, OY = 9;
      // ---- the set's backdrop, as rolled ----
      const SKYC = { Night: '#26346e', Moonlit: '#1e2c62', Dusk: '#e0704c', Dawn: '#f2b08c', Forest: '#2e5a3a', Storm: '#5e6878', Aurora: '#173246', Library: '#6a4024' }[sk] || '#26346e';
      const zSky = paint(U(SKYC), () => true);
      const star5 = (cx, cy, R) => withBB((X, Y) => { const dx = X - cx, dy = Y - cy; return Math.hypot(dx, dy) <= R * (0.62 + 0.38 * Math.cos(5 * (Math.atan2(dy, dx) + Math.PI / 2))); }, [cx - R, cy - R, cx + R, cy + R]);
      if (sk === 'Night' || sk === 'Moonlit') for (const [a, b, r] of [[9, 12, 3.6], [22, 5, 3], [72, 30, 3.4], [7, 38, 3], [73, 50, 3.2], [58, 4, 2.8]]) if (!(sk === 'Moonlit' && a < 26 && b < 20)) paint(YEL, star5(a, b, r));
      if (sk === 'Moonlit') paint(U('#f4e6a8'), (X, Y) => disc(14, 14, 7)(X, Y) && !disc(17.5, 11.5, 6)(X, Y));
      if (sk === 'Dusk') paint(U('#ffb040'), disc(66, 44, 11));
      if (sk === 'Dawn') { paint(U('#ffe070'), disc(14, 50, 10)); paint(U('#a8c8ec'), (X, Y) => Y < 14 + Math.sin(X * 0.2) * 2); }
      if (sk === 'Forest') for (const [tx, ty] of [[8, 14], [18, 22], [70, 16], [60, 26]]) paint(U('#1d4a2a'), (X, Y) => Y > ty && Y < ty + 34 && Math.abs(X - tx) < ((Y - ty) % 8 + 2) * 0.9 + (Y - ty) * 0.12);
      if (sk === 'Storm') { paint(U('#d8dce4'), any(disc(10, 10, 6), disc(19, 7, 6), disc(28, 9, 4), disc(56, 8, 5), disc(66, 6, 6), disc(74, 11, 5))); paint(YEL, any(seg(15, 14, 10, 26, 1.6), seg(10, 26, 16, 26, 1.6), seg(16, 26, 9, 40, 1.6))); }
      if (sk === 'Aurora') { paint(U('#6ff0a4'), (X, Y) => Math.abs(Y - (12 + 4 * Math.sin(X * 0.18))) < 2.4); paint(U('#f07ac8'), (X, Y) => Math.abs(Y - (21 + 4 * Math.sin(X * 0.18 + 1.6))) < 1.6); }
      if (sk === 'Library') { const BK = [RED, BLUE, YEL, U('#45903e'), U('#9a4ab0')]; for (const s of [20, 40, 60]) { paint(U('#4a2a14'), (X, Y) => Y > s && Y < s + 3); paint(0, (X, Y) => { const bk = Math.floor(X / 4), h = 9 + (bk * 7 + s) % 5; return Y < s + 0.5 && Y > s - h && X % 4 < 3.2 && X % 4 > 0.4 ? BK[(bk + s) % 5] : false; }); } }
      const skyTop = zc;
      SC = 1.2;
      // ---- the wizard, back to front ----
      if (hasStaff) paint(STAFFC, seg(SX, 12, SX, 80, 1.8));
      const zRobe = paint(ROBEC, (X, Y) => Y > 49 && Math.abs(X - 38) <= Math.min(36, 15 + (Y - 49) * 1.1));
      const FR = { Long: [7.5, 10], Round: [9.5, 8.6], Gaunt: [7, 10], Broad: [10.5, 8.6], Heart: [9.5, 9.6] }[faceShape] || [8.5, 9.6];
      const faceHW = Y => { const dy = (Y - 36) / FR[1]; if (Math.abs(dy) > 1) return -1; let w = FR[0] * Math.sqrt(1 - dy * dy); if (faceShape === 'Heart' && dy > 0) w *= 1 - dy * 0.5; if (faceShape === 'Gaunt' && dy > 0.2) w *= 0.84; return w; };
      const hs = shapeH, hood = hs === 'Hood';
      if (hood) paint(HATC, (X, Y) => Y < 53 && (ell(38, 34, FR[0] + 7.5, 17)(X, Y) || (Y < 24 && Math.abs(X - 38) < (Y - 5) * 0.75)));
      const hd = hairDo, hEnd = { 'Long Locks': 57, 'Braided Locks': 57, Tucked: 36, Bushy: 45 }[hd] || 45, hW = { Bushy: 5.8, 'Long Locks': 3.8, Tucked: 2.8, 'Braided Locks': 3.4 }[hd] || 3.5;
      const zHair = paint(LEAF2, (X, Y) => { const d = Math.abs(X - 38); return Y > 25 && Y < hEnd && d > FR[0] - 2.5 && d < FR[0] + hW + (hd === 'Bushy' ? Math.sin(Y * 1.1) * 1.4 : 0) - (Y > hEnd - 3 ? (Y - hEnd + 3) * 1.2 : 0); });
      if (hd === 'Braided Locks') paint(RED, (X, Y, x, y) => Math.abs(Y - (hEnd - 4)) < 1 && Z[at(Math.floor(x), Math.floor(y))] === zHair);
      const zFace = paint(FACEC, (X, Y) => { const w = faceHW(Y); return w > 0 && Math.abs(X - 38) <= w; });
      // the beard, of leaf-green clay
      const bn = beard[0];
      const BP = { Long: [24, 10], Forked: [24, 10], Braided: [12, 9], Short: [10, 9.5], Spade: [19, 11], Wispy: [20, 6.5], Plaited: [10, 9.5] }[bn] || (bn === 'Clean Shaven' ? null : [24, 10]);
      let zBeard = -1;
      if (BP) {
        const [len, bw] = BP, bTop = 40;
        zBeard = paint(LEAFC, (X, Y) => {
          if (Y < bTop) return false;
          const v = (Y - bTop) / len;
          let dx = X - 38;
          if (bn === 'Wispy') dx -= Math.sin(v * 3) * 1.5 * v;
          let w = -1;
          if (v <= 1) {
            if (bn === 'Short' || bn === 'Braided' || bn === 'Plaited') w = bw * Math.sqrt(Math.max(0, 1 - v * v));
            else if (bn === 'Spade') w = v < 0.55 ? bw * (0.85 + v * 0.3) : bw * (1 - v) / 0.45;
            else if (bn === 'Wispy') w = bw * (1 - v * 0.9);
            else w = v < 0.3 ? bw : bw * (1 - (v - 0.3) / 0.7 * 0.85);
          }
          if (bn === 'Forked' && v > 0.55 && Math.abs(dx) < (v - 0.55) * 9) return false;
          if (Math.abs(dx) <= w) return true;
          if (bn === 'Braided' && Y < 65 && Math.abs(dx) < 2.6) return true;
          if (bn === 'Plaited' && Y < 62 && Math.abs(Math.abs(dx) - 4.5) < 2.2) return true;
          return false;
        });
        if (bn === 'Braided') paint(RED, ell(38, 61.5, 3.2, 1.3));
        if (bn === 'Plaited') paint(RED, any(ell(33.5, 57.5, 2.8, 1.2), ell(42.5, 57.5, 2.8, 1.2)));
        // blossoms and berries in it, little clay balls
        paint(WHITE, any(disc(33, 48, 1.3), disc(43, 52, 1.3), disc(38, 57, 1.3)));
        paint(RED, any(disc(40.5, 46.5, 1.1), disc(35.5, 53.5, 1.1)));
        const MU = { Walrus: ell(38, 42.2, 6.8, 2.7), Handlebar: any(seg(33.5, 42, 42.5, 42, 1.6), seg(33.5, 42, 30.5, 39, 1.3), seg(42.5, 42, 45.5, 39, 1.3)), Droopy: any(seg(34, 42, 42, 42, 1.8), seg(34, 42, 32.5, 47, 1.5), seg(42, 42, 43.5, 47, 1.5)), Wispy: seg(35, 42, 41, 42, 1.4) }[stache];
        if (MU) paint(LEAFC, MU);
        if (stache !== 'Walrus') paint(MOUTH, seg(36.5, 44.6, 39.5, 44.6, 0.8), 1);
      } else {
        paint(MOUTH, any(seg(35, 42.6, 38, 43.8, 0.7), seg(38, 43.8, 41, 42.6, 0.7)), 1);
        paint(WHITE, any(disc(29, 33, 1.3), disc(47.5, 38, 1.3)));
      }
      // the eyes, as rolled: big clay eyeballs with dark pupils and a glint (lids for kind, wise and squinting eyes)
      const EYES = eyes[0], EX = [33.4, 42.6], EYc = 34.8, SEX = EX.map(FX), SEY = FY(EYc);
      const ER = k => EYES === 'Wide' ? 3.7 : EYES === 'Mismatched' ? (k ? 3.7 : 2.7) : 3.2;
      const zEye = paint(EYES === 'Glowing' ? U('#ffe060') : WHITE, any(disc(EX[0], EYc, ER(0)), disc(EX[1], EYc, ER(1))));
      if (EYES !== 'Glowing') {
        const pr = EYES === 'Wide' ? 1.3 : EYES === 'Starry' ? 1.25 : 1.55;
        paint(0, (X, Y) => { for (let k = 0; k < 2; k++) if (Math.hypot(X - EX[k] - (k ? -0.4 : 0.4), Y - EYc - 0.4) <= (EYES === 'Mismatched' && k ? 1.7 : pr)) return EYES === 'Starry' ? YEL : EYES === 'Mismatched' && k ? BLUE : K; return false; }, 1);
      }
      const lid = (top, bot) => paint(FACEC, (X, Y) => { for (let k = 0; k < 2; k++) { const r = ER(k) + 0.6; if (Math.hypot(X - EX[k], Y - EYc) <= r && (Y < EYc - r + top * 2 * r || Y > EYc + r - bot * 2 * r)) return true; } return false; });
      if (EYES === 'Kind') lid(0.3, 0);
      if (EYES === 'Wise') lid(0.5, 0);
      if (EYES === 'Squint') lid(0.42, 0.28);
      if (EYES === 'Spectacles') paint(YEL, (X, Y) => { for (let k = 0; k < 2; k++) { const d = Math.hypot(X - EX[k], Y - EYc); if (d > ER(k) + 0.5 && d < ER(k) + 1.5) return true; } return Math.abs(Y - EYc) < 0.6 && X > 36.5 && X < 39.5; });
      // the brows, clay rolls by their kind (the right one mirrors the left)
      const BRW = { Bushy: seg(29.5, 30.6, 36.5, 29.8, 1.8), Wild: any(seg(30.5, 28.5, 36.5, 31, 1.3), seg(30.5, 28.5, 29, 27, 1)), Drooping: seg(29.5, 32, 36.5, 29.8, 1.3), Arched: any(seg(30, 31.4, 33.5, 29, 1.2), seg(33.5, 29, 37, 31, 1.2)), Knitted: seg(30, 29.2, 37, 31.8, 1.3) }[brow] || seg(30.5, 30.5, 36.5, 30.5, 1.3);
      paint(LEAF2, any(BRW, mirror(BRW)));
      // the nose, big, as claymation noses are
      const NOSE = { Button: disc(38, 38.6, 2.1), Bulbous: disc(38, 38.8, 3.5), Long: seg(38, 35.5, 38, 41.2, 1.8), Hooked: any(seg(37.6, 35.5, 40.2, 39, 1.7), seg(40.2, 39, 38.4, 41.4, 1.6)), Crooked: any(seg(37, 35.5, 40.2, 38.2, 1.7), seg(40.2, 38.2, 38.8, 41, 1.6)), Pointy: seg(38, 35.5, 41.8, 40.2, 1.7) }[noseW] || disc(38, 38.6, 2.6);
      const zNose = paint(NOSEC, NOSE);
      // the hat, by its shape: a cone swept along its own curve, a red band, a brim, the badge; or a hood
      let tip = [38, 4];
      if (!hood) {
        const top = { Towering: 1, Pointed: 4, Crooked: 5, 'Curled Tip': 6, 'Wide Brim': 5, Floppy: 4, 'Star-Spangled': 4 }[hs] ?? 4;
        const CL = u => hs === 'Crooked' ? [38 + bend * 8 * u * u, 24 - (24 - top) * u] : hs === 'Floppy' ? [38 + bend * 15 * u ** 1.7, 24 - 21 * Math.sin(u * Math.PI * 0.8)] : hs === 'Curled Tip' ? [38 + bend * 3 * u, 24 - (24 - top) * u] : [38, 24 - (24 - top) * u];
        const pts = [];
        for (let k = 0; k <= 80; k++) { const u = k / 80, [x, y] = CL(u); pts.push([x, y, 1 + 10.4 * (1 - u)]); }
        tip = CL(1);
        if (hs === 'Curled Tip') { const [qx, qy] = tip; for (let k = 0; k <= 30; k++) { const a = k / 30 * Math.PI * 1.7, r = 3 - k / 30 * 1.6; pts.push([qx + bend * (r - Math.cos(a) * r), qy + 1 - Math.sin(a) * r * 1.1, 1.2]); } tip = [qx + bend * 3, qy + 2]; }
        const zCone = paint(HATC, withBB((X, Y) => { if (Y > 25) return false; for (const [x, y, r] of pts) if ((X - x) * (X - x) + (Y - y) * (Y - y) <= r * r) return true; return false; }, [0, -3, 76, 25]));
        paint(RED, (X, Y, x, y) => Y > 16.5 && Y < 22.5 && Z[Math.floor(y) * M + Math.floor(x)] === zCone);
        paint(HATC, ell(38, 25.2, hs === 'Wide Brim' ? 22 : 17, 2.9));
        const BY = 19.5;
        if (badge === 'Crescent') paint(YEL, (X, Y) => disc(38, BY, 3.2)(X, Y) && !disc(39.6, BY - 1, 2.5)(X, Y));
        else if (badge === 'Star') paint(YEL, star5(38, BY, 4));
        else if (badge === 'Eye') { paint(WHITE, ell(38, BY, 3.8, 2.5)); paint(BLUE, disc(38, BY, 1.4)); }
        else if (badge === 'Rune') { paint(YEL, ell(38, BY, 3, 3.3)); paint(RED, any(seg(38, BY - 2, 38, BY + 2, 0.6), seg(38, BY - 0.5, 36.5, BY - 2, 0.6), seg(38, BY - 0.5, 39.5, BY - 2, 0.6)), 1); }
        else if (badge === 'Buckle') { paint(YEL, (X, Y) => Math.abs(X - 38) < 3.4 && Math.abs(Y - BY) < 2.8); paint(RED, (X, Y) => Math.abs(X - 38) < 1.5 && Math.abs(Y - BY) < 1); }
        if (hs === 'Star-Spangled') paint(YEL, (X, Y, x, y) => { if (Z[at(Math.floor(x), Math.floor(y))] !== zCone) return false; for (const [a, b] of [[34, 14], [41, 9], [36, 6], [44, 15]]) if (star5(a, b, 2.1)(X, Y)) return true; return false; });
        if (trinket === 'Feather') { paint(RED, seg(47, 19, 53, 8, 1.9)); paint(WHITE, disc(53, 8, 1.6)); }
        if (trinket === 'Bell on Tip') paint(YEL, disc(tip[0], tip[1] + 1, 2.6));
      }
      if (hood) paint(YEL, disc(38, 48.5, 1.6));
      // the arm on the staff
      if (hasStaff) { paint(SLEEVEC, seg(51, 58, 58.5, 54.8, 4.6)); paint(FACEC, disc(SX, 52.5, 3)); }
      // the familiar on his other shoulder, a little clay critter
      const spr = (rows, pal, x0, y0) => paint(0, (X, Y) => { const r = rows[Math.floor((Y - y0) / 2)]; if (!r || Y < y0) return false; const ch = X < x0 ? null : r[Math.floor((X - x0) / 2)]; return ch && ch !== '.' ? pal[ch] : false; });
      const FAM = {
        Owl: [['b.....b', 'bb...bb', 'bbbbbbb', 'bwwbwwb', 'bwkbkwb', 'bbbybbb', 'blllllb', 'blllllb', '.bbbbb.', '.y...y.'], { b: U('#8a5a2e'), l: U('#e0bc84'), w: YEL, k: K, y: ORANGE }],
        Toad: [['.yy.yy.', 'ykyyky.', 'ggggggg', 'gdddddg', 'ggggggg', 'gyyyyyg', 'g.g.g.g'], { g: U('#5aa032'), d: U('#3a6a22'), y: YEL, k: K }],
        Moth: [['k.....k', '.k...k.', 'ww.k.ww', 'wtwkwtw', 'wwwkwww', 'wtwkwtw', '.ww.ww.'], { w: WHITE, t: U('#c8a070'), k: K }],
        Mouse: [['gg...gg', 'gpg.gpg', 'ggggggg', '.gkgkg.', '.ggggg.', '..gpg..', '.ggggg.'], { g: U('#a0a0aa'), p: PINK, k: K }],
        'Tiny Dragon': [['r.....r', 'rr.r.rr', 'rrrrrrr', '.ryryr.', '.rkrkr.', '.rrrrr.', '..ooo..', '.r...r.'], { r: RED, y: YEL, k: K, o: ORANGE }],
        Raven: [['..kkk..', '.kkkkk.', '.kwkkkk', '.kkkkyy', 'kkbkkk.', 'kkbbkk.', '.kkkk..', '..y.y..'], { k: U('#2a2836'), y: YEL, b: U('#4a4a6a'), w: WHITE }],
        Snail: [['..aaaa..', '.adddda.', 'ada..da.', 'ada.dda.', 'adaada.k', '.aaaa.gk', 'gggggggg'], { a: U('#e89a30'), d: U('#a8601a'), g: U('#c4d070'), k: K }],
        Wisp: [['...b...', '..bb...', '.bbbb..', 'bbbbbb.', 'blkblkb', 'bbbbbbb', '.bbbbb.'], { b: U('#5ab0ff'), l: U('#e0f4ff'), k: K }],
        Bat: [['k.......k', 'kk.k.k.kk', 'kkkkkkkkk', '.kkrkrkk.', '..kkkkk..', '..k...k..'], { k: U('#2a2836'), r: RED }],
      }[familiar[0]];
      if (FAM) spr(FAM[0], FAM[1], 7, 53 - FAM[0].length * 2);
      // the trinket, in his other hand or his mouth
      if (trinket === 'Spellbook') { paint(RED, (X, Y) => X > 21 && X < 31 && Y > 57 && Y < 66); paint(WHITE, (X, Y) => X > 29.6 && X < 31.4 && Y > 58 && Y < 65); paint(YEL, disc(25.5, 61.5, 1.3)); paint(FACEC, disc(31, 62, 2.6)); }
      if (trinket === 'Potion') { paint(0, (X, Y) => (disc(26, 62.5, 3.8)(X, Y) || seg(26, 56, 26, 59.5, 1.6)(X, Y)) ? (Y < 60.5 ? U('#cfe8f0') : U('#4ab0e0')) : false); paint(STAFFC, seg(26, 54.6, 26, 55.4, 1.4)); paint(FACEC, disc(30.5, 63.5, 2.5)); }
      if (trinket === 'Long Pipe') { paint(STAFFC, seg(41, 43.5, 49, 46, 1.1)); paint(STAFFC, (X, Y) => X > 48.5 && X < 53.5 && Y > 41.5 && Y < 47); }
      const O = hasStaff ? orb[1].map(U) : null;
      const zOrb = hasStaff ? paint(O[1], disc(SX, OY, 5.4)) : -1;
      // ---- the clay shading: each lump rounded from the distance to its own edge, lit from the top left; a soft shadow
      // where a lump sits on another and where the wizard stands in front of the backdrop; three takes of it, so it boils ----
      const DT = new Float32Array(N);
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
        const i = y * M + x, z = Z[i];
        DT[i] = (x > 0 && Z[i - 1] !== z) || (x < M - 1 && Z[i + 1] !== z) || (y > 0 && Z[i - M] !== z) || (y < M - 1 && Z[i + M] !== z) ? 1 : 99;
      }
      const CH = [[1, 0, 1], [0, 1, 1], [1, 1, 1.41], [-1, 1, 1.41]];
      for (let pass = 0; pass < 2; pass++) for (let s = 0; s < N; s++) {
        const i = pass ? N - 1 - s : s, x = i % M, y = (i / M) | 0, z = Z[i], d = pass ? 1 : -1;
        if (DT[i] <= 1) continue;
        let v = DT[i];
        for (const [a, b, w] of CH) { const j = at(x + a * d, y + b * d); if (j >= 0 && Z[j] === z && DT[j] + w < v) v = DT[j] + w; }
        DT[i] = v;
      }
      const HQ = new Float32Array(N);
      for (let i = 0; i < N; i++) HQ[i] = 8 * Math.sqrt(Math.min(DT[i], 8) / 8);
      const SH3 = [[3, 4], [2, 3], [4, 5]], SH2 = [[1, 1], [2, 2], [1, 2], [2, 1]];
      const LX = -0.48, LY = -0.62, LZ = 0.62, LL = Math.hypot(LX, LY, LZ);
      const RID = new Uint16Array(N), SHADE = new Float32Array(N);
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
        const i = y * M + x, z = Z[i];
        RID[i] = rampOf(C[i]);
        if (z <= skyTop && z === zSky) {
          // the backdrop: a smoothed sheet of clay, lighter towards the bottom, the wizard's shadow cast on it
          let s = 0.5 + y / M * 0.26 + Math.sin(x * 0.31 + y * 0.17) * 0.04 - ((x - 40) ** 2 + (y - 36) ** 2) / 3600 * 0.3;
          for (const [a, b] of SH3) { const j = at(x - a, y - b); if (j >= 0 && Z[j] > skyTop) { s -= 0.22; break; } }
          SHADE[i] = s; continue;
        }
        const hi = HQ[i], hl = x > 0 ? (Z[i - 1] === z ? HQ[i - 1] : 0) : hi, hr = x < M - 1 ? (Z[i + 1] === z ? HQ[i + 1] : 0) : hi, hu = y > 0 ? (Z[i - M] === z ? HQ[i - M] : 0) : hi, hd2 = y < M - 1 ? (Z[i + M] === z ? HQ[i + M] : 0) : hi;
        const gx = (hr - hl) * 0.5, gy = (hd2 - hu) * 0.5;
        const nx = -gx * 0.8, ny = -gy * 0.8, nl = Math.hypot(nx, ny, 1);
        let s = FL[i] ? 0.6 : (nx * LX + ny * LY + LZ) / nl / LL;
        // a soft shadow under the lumps that sit on this one
        for (const [a, b] of SH2) { const j = at(x - a, y - b); if (j >= 0 && Z[j] > z && !FL[j]) { s -= 0.12; break; } }
        SHADE[i] = s;
      }
      const toneOf = s => s < 0.2 ? 0 : s < 0.42 ? 1 : s < 0.74 ? 2 : s < 0.93 ? 3 : 4;
      const TAKES = [0, 1, 2].map(v => {
        const B = new Uint32Array(N), T = new Uint8Array(N);
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
          const i = y * M + x, h = (((x * 73856093) ^ (y * 19349663) ^ (v * 83492791)) >>> 0) % 1000 / 1000;
          const t = toneOf(SHADE[i] + (h - 0.5) * 0.07);
          T[i] = t; B[i] = RAMPS[RID[i]][t];
        }
        // a thumbprint or two pressed into the clay, different in each take
        for (let k = 0; k < 2; k++) {
          const q = (((v * 7 + k * 13 + 3) * 2654435761) >>> 0), fx = 14 + q % 52, fy = 54 + (q >>> 8) % 22;
          for (let y = fy - 5; y <= fy + 5; y++) for (let x = fx - 5; x <= fx + 5; x++) { const i = at(x, y); if (i < 0 || Z[i] !== zRobe) continue; const d = Math.hypot(x - fx, (y - fy) * 1.3); if (d < 5 && Math.abs(d % 2 - 1) < 0.35 && T[i] < 4) B[i] = RAMPS[RID[i]][T[i] + 1]; }
        }
        // the blush on his cheeks, the glints in his eyes
        for (const [a, b] of [[29.6, 38], [30.6, 38], [45.4, 38], [46.4, 38], [30, 38.9], [46, 38.9]]) { const i = at(Math.floor(FX(a)), Math.floor(FY(b))); if (i >= 0 && Z[i] === zFace) B[i] = U('#e07a5a'); }
        if (EYES !== 'Glowing') for (let k = 0; k < 2; k++) { const i = at(Math.floor(SEX[k] - (k ? 1.4 : 0.2)), Math.floor(SEY - 0.8)); if (i >= 0 && (Z[i] === zEye || Z[i] === zEye + 1)) B[i] = WHITE; }
        return [B, T];
      });
      // the stance: the set as sculpted, or mirrored with the staff in his left hand
      const flipA = A => { const F = new A.constructor(N); for (let i = 0; i < N; i++) { const x = i % M; F[i] = A[i - x + (lefty ? M - 1 - x : x)]; } return F; };
      const TK = TAKES.map(([B, T]) => [flipA(B), flipA(T)]), RIDF = flipA(RID);
      // ---- the toy ----
      const mx = x => (lefty ? M - 1 - x : x), SSX = FX(SX), SOY = FY(OY);
      const P = (x, y, col) => { x = Math.floor(x); y = Math.floor(y); if (x >= 0 && y >= 0 && x < M && y < M) OUT[y * M + x] = col; };
      const PM = (x, y, col) => P(mx(Math.floor(x)), y, col);
      const FR5 = RAMPS[rampOf(FACEC)];
      const GD = new Float32Array(N), SQ = [[0, 0], [1, 0], [0, 1], [1, 1]], KS = [0, 1];
      let grooves = [], cur = null, dents = [], pressT = -1, pressP = null, moved = 0, dragging = false, lastSq = -9, flareAt = -9, nPoke = 0;
      const tapAt = (q, t) => {
        if (hasStaff && Math.hypot(q[0] - (mx(Math.floor(SSX)) + 0.5), q[1] - SOY) < 7) { flareAt = t; [0, 2, 4, 7].forEach((k, i) => c.sound.note(lyd3(k + 7), { dur: 0.4, vel: 0.06, wave: 'triangle', at: i * 0.05 })); return; }
        dents.push([q[0], q[1], t]); nPoke++;
        if (dents.length > 14) dents.shift();
        c.sound.hit('noise', 0.03, { cutoff: 700, dur: 0.07 });
        c.sound.note(lyd3(nPoke % 5), { dur: 0.12, vel: 0.07, wave: 'sine' });
      };
      const feel = t => {
        const ip = c.input, down = ip.inside && ip.down, px0 = (ip.x * S - of) / cel, py0 = (ip.y * S - of) / cel;
        for (const q0 of ip.taps()) { const q = [(q0.x * S - of) / cel, (q0.y * S - of) / cel]; pressT = t; pressP = q; moved = 0; if (!down) { tapAt(q, t); pressT = -1; } }
        if (pressT >= 0) {
          if (down) moved = Math.max(moved, Math.hypot(px0 - pressP[0], py0 - pressP[1]));
          else { if (!dragging && t - pressT < 0.35 && moved < 1.5) tapAt(pressP, t); pressT = -1; }
        }
        // a press that moves, or is held, drags a finger through the clay
        if (down && pressT >= 0 && !dragging && (moved >= 1.5 || t - pressT >= 0.35)) { dragging = true; cur = { pts: [pressP.slice()], end: -1 }; grooves.push(cur); if (grooves.length > 3) grooves.shift(); }
        if (dragging) {
          if (down) {
            const L = cur.pts[cur.pts.length - 1], d = Math.hypot(px0 - L[0], py0 - L[1]);
            for (let k = 1; k <= Math.min(40, Math.floor(d / 0.7)) && cur.pts.length < 400; k++) cur.pts.push([L[0] + (px0 - L[0]) * k * 0.7 / d, L[1] + (py0 - L[1]) * k * 0.7 / d]);
            if (d > 0.3 && t - lastSq > 0.14) { lastSq = t; c.sound.hit('noise', 0.025, { cutoff: 500, dur: 0.12 }); }
          } else { dragging = false; cur.end = t; cur = null; }
        }
        if (grooves.length && grooves[0].end >= 0 && t - grooves[0].end > 2.6) grooves = grooves.filter(s => s.end < 0 || t - s.end <= 2.6);
        if (dents.length && t - dents[0][2] > 12) dents = dents.filter(s => t - s[2] <= 12);
      };
      // a little clay ball, shaded as a sphere
      const ball = (x0, y0, r, col) => { const R = RAMPS[rampOf(col)]; for (let y = Math.floor(y0 - r); y <= y0 + r; y++) for (let x = Math.floor(x0 - r); x <= x0 + r; x++) { const dx = (x + 0.5 - x0) / r, dy = (y + 0.5 - y0) / r, q = dx * dx + dy * dy; if (q > 1) continue; const s = (dx * LX + dy * LY + Math.sqrt(1 - q) * LZ) / LL; PM(x, y, R[toneOf(s)]); } };
      function draw(t) {
        const st = Math.floor(t * 12), take = Math.floor(t * 8) % 3, [TB, TT] = TK[take];
        OUT.set(TB);
        const blink = ((t + 1.3) % 4.4) < 0.14;
        // the eyes: a blink, a wince while you drag, a twinkle or a glow
        if (blink || dragging) for (const k of KS) {
          const r = ER(k) * SC + 0.4, ex = SEX[k];
          for (let y = Math.floor(SEY - r); y <= SEY + r; y++) for (let x = Math.floor(ex - r); x <= ex + r; x++) { const dx = x + 0.5 - ex, dy = y + 0.5 - SEY; if (dx * dx + dy * dy <= r * r) PM(x, y, FR5[dy < -0.5 ? 3 : dy < 1 ? 2 : 1]); }
          if (dragging) { const d = k ? -1 : 1; for (const [a, b] of [[-d, -1], [0, 0], [d, 0], [-d, 1]]) PM(ex - 0.5 + a, Math.floor(SEY) + b, K); }
          else for (let dx = -2; dx <= 1; dx++) PM(ex + dx, Math.floor(SEY) + 1, FR5[0]);
        } else for (const k of KS) {
          const ex = SEX[k];
          if (EYES === 'Twinkling' && (st + k * 5) % 14 < 7) { PM(ex - 1, Math.floor(SEY) - 2, WHITE); PM(ex, Math.floor(SEY) - 1, WHITE); PM(ex - 2, Math.floor(SEY) - 1, WHITE); }
          if (EYES === 'Starry' && st % 10 < 5) PM(ex - 0.2, Math.floor(SEY), WHITE);
          if (EYES === 'Glowing' && st % 12 < 6) for (let a = 0; a < 8; a++) PM(ex + Math.cos(a * 0.785) * 5, SEY + Math.sin(a * 0.785) * 5, U('#fff4a0'));
        }
        // the orb: a soft pulse of its light; a tap on it makes it flare
        if (hasStaff) {
          const fl = t - flareAt < 0.9 ? 1 - (t - flareAt) / 0.9 : 0, pulse = (st >> 2) % 2;
          const rr = 7.6 + pulse * 0.9 + fl * 6;
          for (let y = Math.floor(SOY - rr - 1); y <= SOY + rr + 1; y++) for (let x = Math.floor(SSX - rr - 1); x <= SSX + rr + 1; x++) { const d = Math.hypot(x + 0.5 - SSX, y + 0.5 - SOY); if (d > 5.4 * SC && d < rr && ((x + y) % 2 === 0 || d < 7.4)) PM(x, y, O[2]); }
          if (fl > 0.4) ball(SSX, SOY, 5.4 * SC, O[2]);
        }
        // the pipe's smoke, clay puffs moved a frame at a time
        if (trinket === 'Long Pipe') for (let j = 0; j < 3; j++) { const q = (Math.floor(t * 8) / 8 * 0.45 + j / 3) % 1; if (q > 0.85) continue; ball(FX(51 + Math.sin(q * 6 + j) * 1.5 + q * 2), FY(40 - q * 15), (1 + q * 1.6) * SC, GREY); }
        // spellbound: clay runes going round him
        if (sigil) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + Math.floor(t * 8) / 8 * 0.5; ball(39 + Math.cos(a) * 33, 40 + Math.sin(a) * 33, 2, k % 2 ? YEL : U('#b06ad8')); }
        // the dents and grooves: a depth in the clay, shaded from its slope with the clay's own colours
        if (dents.length || grooves.length) {
          GD.fill(0);
          let x0 = M, y0 = M, x1 = -1, y1 = -1;
          const press = (px, py, r, depth) => { for (let y = Math.max(0, Math.floor(py - r)); y <= Math.min(M - 1, py + r); y++) for (let x = Math.max(0, Math.floor(px - r)); x <= Math.min(M - 1, px + r); x++) { const d = Math.hypot(x + 0.5 - px, y + 0.5 - py); if (d < r) { const v = depth * (1 - (d / r) ** 2), i = y * M + x; if (v > GD[i]) GD[i] = v; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } } };
          for (const [px, py, t0] of dents) { const age = t - t0; press(px, py, age < 0.12 ? 2.6 : 4.4, age > 10 ? 4 * (12 - age) / 2 : 4); }
          for (const s of grooves) { const age = s.end < 0 ? 0 : Math.floor((t - s.end) * 8) / 8, dep = age < 1 ? 3 : 3 * Math.max(0, 1 - (age - 1) / 1.6); if (dep <= 0) continue; for (const [px, py] of s.pts) press(px, py, 3, dep); }
          for (let y = Math.max(0, y0 - 1); y <= Math.min(M - 1, y1 + 1); y++) for (let x = Math.max(0, x0 - 1); x <= Math.min(M - 1, x1 + 1); x++) {
            const i = y * M + x;
            const gx = (x < M - 1 ? GD[i + 1] : 0) - (x > 0 ? GD[i - 1] : 0), gy = (y < M - 1 ? GD[i + M] : 0) - (y > 0 ? GD[i - M] : 0);
            if (!GD[i] && !gx && !gy) continue;
            const s = (gx * 1.1 * LX + gy * 1.1 * LY + LZ) / Math.hypot(gx * 1.1, gy * 1.1, 1) / LL;
            const tt = s < 0.5 ? 0 : s > 0.8 ? 4 : Math.max(0, TT[i] - 1);
            OUT[i] = RAMPS[RIDF[i]][tt];
          }
        }
        // the fingertip while it drags
        if (dragging && cur) { const [x, y] = cur.pts[cur.pts.length - 1]; const R = RAMPS[rampOf(U('#e8b08c'))]; for (let yy = Math.floor(y - 4); yy <= y + 1; yy++) for (let xx = Math.floor(x - 1); xx <= x + 5; xx++) { const dx = (xx + 0.5 - x - 2) / 3, dy = (yy + 0.5 - y + 1.5) / 2.6; if (dx * dx + dy * dy <= 1 && yy < y + 0.5) P(xx, yy, R[dy < -0.3 ? 3 : 2]); } }
      }
      let last = '';
      const frame = t => {
        const key = Math.floor(t * 12) + ':' + (dragging ? 1 : 0) + ':' + grooves.length + ':' + (cur ? cur.pts.length : 0) + ':' + dents.length + ':' + nPoke + ':' + flareAt;
        if (key === last) return;
        last = key;
        draw(t);
        cx2.putImageData(img, 0, 0);
        g.imageSmoothingEnabled = false;
        // whole pixels only: the set is drawn at a whole multiple of its size, in a dark frame
        if (of > 0) { g.fillStyle = '#120e0a'; g.fillRect(0, 0, S, S); }
        g.drawImage(can, 0, 0, M, M, of, of, M * cel, M * cel);
      };
      frame(0);
      return t => { feel(t); frame(t); };
    }

    // ---------- the legendaries: each its own 1/1 on the same 40-cell grid and view, every gradient an ordered dither ----------
    function legendWizard() {
      const g = c.ctx;
      const VW = N + 4, cel = Math.max(1, Math.round(S / VW)), ofs = Math.floor((S - cel * VW) / 2);
      const small = W * cel <= S, mid = Math.floor((S - W * cel) / 2) + B * cel;
      const X0 = small ? mid : Math.min(ofs + 2 * cel, B * cel), Y0 = small ? mid : Math.min(ofs + 4 * cel, B * cel);
      const can = document.createElement('canvas');
      can.width = can.height = W;
      const cx2 = can.getContext('2d'), img = cx2.createImageData(W, W), D = img.data;
      const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const th = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
      const hv = (x, y, k) => { let h = Math.imul(x + 97, 0x9e3779b1) ^ Math.imul(y + 61, 0x85ebca6b) ^ Math.imul(k + 7, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
      const lv = [];
      for (let i = 0; i < 16; i++) lv.push(xorwow());
      const INK2 = hex('#0a0610');
      // a ramp of colours and a dithered pick along it (v 0..1)
      const rampOf = list => list.map(hex);
      const dith = (rmp, v, x, y) => { const p = Math.max(0, Math.min(rmp.length - 1.001, v * (rmp.length - 1))), i = Math.floor(p); return rmp[(p - i) > th(x, y) ? i + 1 : i]; };
      const P = (x, y, rgb) => { x = Math.round(x); y = Math.round(y); const X = x + B, Y = y + B; if (X >= 0 && Y >= 0 && X < W && Y < W) { const k = (Y * W + X) * 4; D[k] = rgb[0]; D[k + 1] = rgb[1]; D[k + 2] = rgb[2]; D[k + 3] = 255; } };
      const each = f => { for (let y = -B; y < N + B; y++) for (let x = -B; x < N + B; x++) f(x, y); };
      const home2 = 55 + parseInt(c.hash.slice(-3), 16) % 10, LYD2 = [0, 2, 4, 6, 7, 9, 11];
      const lyd2 = k => home2 + 12 * Math.floor(k / 7) + LYD2[((k % 7) + 7) % 7];
      // taps in grid cells (mirrored for a wizard who holds the staff on the left)
      const tapsNow = () => c.input.taps().map(p => [((lefty ? 1 - p.x : p.x) * S - X0) / cel, (p.y * S - Y0) / cel]);
      // the pointer in grid cells, mirrored like the picture (only the large view has one)
      const ptr = () => { const i = c.input; return { x: ((lefty ? 1 - i.x : i.x) * S - X0) / cel, y: (i.y * S - Y0) / cel, in: i.inside, down: i.inside && i.down }; };
      // a tap that is only a tap: the gallery sends one on every press, so for the toys that also hold or drag, a tap
      // counts on a short, still release (or a press and release inside one frame)
      let pressT = -1, pressP = null, pressMoved = 0;
      const pressNow = t => {
        const p = ptr(), click = [], down = tapsNow();
        if (down.length) { if (p.down) { pressT = t; pressP = down[down.length - 1]; pressMoved = 0; } else click.push(...down); }
        if (pressT >= 0) {
          if (p.down) pressMoved = Math.max(pressMoved, Math.hypot(p.x - pressP[0] - 0.5, p.y - pressP[1] - 0.5));
          else { if (t - pressT < 0.35 && pressMoved < 1.6) click.push(pressP); pressT = -1; }
        }
        return { down, click };
      };
      // the wizard's outline, shared by the fire, the stars and the hedge: 1 hat, 2 brim, 3 face, 4 beard, 5 robe
      const bendW = bend * 3.2;
      const shape = (x, y) => {
        const px = x + 0.5, py = y + 0.5;
        if (py >= -3 && py < 8.4) {
          const u = (py + 3) / 11.4, mx = 20 + bendW * (1 - u) * (1 - u);
          if (Math.abs(px - mx) <= 0.6 + u * 7.4) return 1;
        }
        if (((px - 20) / 13.4) ** 2 + ((py - 9.2) / 1.7) ** 2 <= 1) return 2;
        if (((px - 20) / 5.6) ** 2 + ((py - 14.4) / 5.2) ** 2 <= 1 && py > 10) return 3;
        if (py >= 16 && py < 34 && Math.abs(px - 20) <= 5.6 - (py - 16) * 0.3) return 4;
        if (py >= 18.5 && Math.abs(px - 20) <= Math.min(19.5, 7.5 + (py - 18.5) * 1.15)) return 5;
        return 0;
      };
      const SH = new Uint8Array(W * W);
      each((x, y) => { SH[(y + B) * W + x + B] = shape(x, y); });
      const S0 = (x, y) => { const X = x + B, Y = y + B; return X >= 0 && Y >= 0 && X < W && Y < W ? SH[Y * W + X] : 0; };
      const scene = legend === 'Living Flame' ? flameScene() : legend === 'Starweave' ? starScene() : swapScene();
      let last = -1;
      const render = t => {
        scene.feel(t);
        const q = Math.round(t * 8), key = q + ':' + (scene.extra ? scene.extra(t) : '');
        if (key === last) return;
        last = key;
        scene.draw(q / 8, q);
        cx2.putImageData(img, 0, 0);
        g.imageSmoothingEnabled = false;
        if (lefty) { g.save(); g.translate(S, 0); g.scale(-1, 1); }
        g.drawImage(can, 0, 0, W, W, X0 - B * cel, Y0 - B * cel, W * cel, W * cel);
        if (lefty) g.restore();
      };
      render(0);
      return render;

      // ----- Living Flame: a wizard who is nothing but fire, burning against the dark, a blue flame on the staff.
      // Your pointer is a breath of wind the flames lean away from; hold to pump the bellows, let go for a burst -----
      function flameScene() {
        const FIRE = rampOf(['#000000', '#1a0404', '#4a0806', '#8a1408', '#c8300a', '#f0601a', '#ffa030', '#ffe070', '#fffbe0']);
        const BLUE = rampOf(['#04081a', '#0a2a6a', '#1a5ad0', '#5ab0ff', '#d0f0ff', '#ffffff']);
        const NIGHT = rampOf(['#030206', '#0a0610', '#140a18', '#22101c']);
        const heat = new Float32Array(W * W), nxt = new Float32Array(W * W);
        const sparks = [];
        for (let i = 0; i < 9; i++) sparks.push([hv(i, 1, 2), hv(i, 2, 2), 0.6 + hv(i, 3, 2)]);
        let flareUntil = -1, step = 0, wind = null, pump = 0, lastT = 0, burstAt = -9, lean = 0;
        const burst = [];
        for (let i = 0; i < 28; i++) burst.push([-Math.PI / 2 + (hv(i, 4, 2) - 0.5) * 2.6, 10 + hv(i, 5, 2) * 22]);
        // how far the flame leans at a height (the top leans most): it bends away from your pointer
        const shiftAt = y => Math.round(lean * Math.max(0, Math.min(1, (34 - y) / 34)));
        // one step of the fire: every cell takes the heat of the cell below (drifting a little side to side) and
        // cools; the wizard's own shape keeps burning from within
        const burn = (q, flare) => {
          for (let Y = 0; Y < W; Y++) for (let X = 0; X < W; X++) {
            const i = Y * W + X, x = X - B, y = Y - B;
            const r = hv(X, Y, q);
            let sx = X + (r < 0.2 ? -1 : r > 0.8 ? 1 : 0), cool = 0;
            if (wind) {
              // the wind: near the pointer the heat is carried away from it, and blown cooler
              const dx = x + 0.5 - wind[0], dy = y + 0.5 - wind[1], d = Math.hypot(dx, dy * 0.7);
              if (d < 12) { sx -= Math.sign(dx) * (d < 6 ? 2 : 1); cool = Math.max(0, 1 - d / 5) * 0.14; }
            }
            const below = Y + 1 < W && sx >= 0 && sx < W ? heat[(Y + 1) * W + sx] : 0;
            let h = below - 0.035 - hv(X, Y, q + 99) * 0.07 - cool;
            const SX = X - shiftAt(y), s = SX >= 0 && SX < W ? SH[Y * W + SX] : 0;
            if (s) {
              // the body burns hottest in the middle, the hat and robe edges cooler so the shape reads; columns of
              // it burn hotter by turns, so tongues of flame lick up off the top
              const core = s === 3 ? 0.78 : s === 4 ? 0.84 : s === 5 ? 0.62 - Math.min(0.3, (y - 18) * 0.012) : s === 2 ? 0.55 : 0.7;
              h = Math.max(h, core - hv(X, Y, q + 7) * 0.18 + 0.1 * Math.sin(SX * 1.7 + q * 0.35) + flare * 0.2 + pump * 0.22);
            }
            nxt[i] = Math.max(0, h);
          }
          heat.set(nxt);
        };
        for (let k = 0; k < 24; k++) burn(-k - 1, 0);
        return {
          extra: t => (wind ? Math.round(wind[0]) + ',' + Math.round(wind[1]) : '') + ':' + Math.round(pump * 8) + ':' + Math.round(lean) + ':' + (t - burstAt < 1.3 ? Math.floor(t * 16) : ''),
          feel: t => {
            const dt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t;
            const p = ptr();
            tapsNow();
            wind = p.in ? [p.x, p.y] : null;
            // the whole flame bends away from the pointer, more the closer it is
            const want = p.in ? Math.max(-1, Math.min(1, (20 - p.x) / 8)) * 5 * Math.max(0.4, 1 - Math.abs(p.y - 18) / 30) : 0;
            lean += (want - lean) * Math.min(1, dt * 5);
            // held down, the bellows pump it hotter and hotter; let go and it bursts
            if (p.down) {
              if (pump === 0) c.sound.hit('noise', 0.06, { cutoff: 600, dur: 1.5 });
              pump = Math.min(1, pump + dt / 1.6);
            } else if (pump > 0) {
              if (pump > 0.25) {
                flareUntil = t + 0.9; burstAt = t;
                c.sound.hit('noise', 0.2 * pump, { cutoff: 900, dur: 0.9 });
                c.sound.note(lyd2(-7), { dur: 0.9, vel: 0.18, wave: 'triangle', cutoff: 600 });
              }
              pump = 0;
            }
          },
          draw: (t, q) => {
            const flare = t < flareUntil ? 1 : 0;
            while (step < q) { step++; burn(step, flare); }
            // the night behind it, a red glow round the fire, embers drifting up
            each((x, y) => {
              const i = (y + B) * W + x + B, h = heat[i];
              // tongues: a wavering vertical streak pattern rising through the heat
              if (h > 0.08) { P(x, y, dith(FIRE, Math.min(1, h * (0.9 + 0.17 * Math.sin(x * 1.9 + Math.sin((y + t * 11) * 0.5) * 1.6 + hv(x, 0, 51) * 2))), x, y)); return; }
              // the flash: a smooth wash of light, white then warm, over the dark
              if (t - burstAt < 0.16) { P(x, y, t - burstAt < 0.08 ? FIRE[8] : FIRE[6]); return; }
              const d = Math.hypot(x + 0.5 - 20, (y + 0.5 - 18) * 0.7);
              P(x, y, dith(NIGHT, Math.max(0, 1 - d / 26) * 1.1 + (y > 34 ? 0.3 : 0), x, y));
            });
            // the ground under it scorched and glowing
            for (let x = -B; x < N + B; x++) for (let y = 37; y < N + B; y++) if (!S0(x, y) && th(x, y) < 0.5 - Math.abs(x - 20) / 50) P(x, y, FIRE[3]);
            for (const s of sparks) {
              const u = (t * 0.25 * s[2] + s[0]) % 1, x = Math.round(6 + s[1] * 28 + Math.sin(t * 2 + s[0] * 9) * 2), y = Math.round(36 - u * 42);
              if (!S0(x, y)) P(x, y, u < 0.6 ? FIRE[7] : FIRE[5]);
            }
            // the burst: sparks thrown out from the body when the bellows let go
            if (t - burstAt < 1.3) {
              const u = (t - burstAt) / 1.3, rr = 3 + u * 26;
              // a ring of light rushing outwards
              each((x, y) => { const d = Math.hypot(x + 0.5 - 20, y + 0.5 - 18); if (Math.abs(d - rr) < 1.3 - u * 0.6 && th(x, y) < 1 - u * 0.7) P(x, y, u < 0.4 ? FIRE[8] : FIRE[6]); });
              // and a fountain of sparks, up and out, falling back
              for (const [a, r] of burst) { const x = 20 + Math.cos(a) * r * u, y = 14 + Math.sin(a) * r * u + u * u * 14; P(x, y, u < 0.5 ? FIRE[8] : u < 0.8 ? FIRE[7] : FIRE[5]); P(x, y + 1, FIRE[5]); }
            }
            // a face in the fire: two white-hot eyes and a dark mouth that flickers (squeezed shut against the wind)
            const blink = ((t + 0.5) % 4.1) < 0.15, fx = shiftAt(14), squint = wind && Math.hypot(wind[0] - 19, wind[1] - 14) < 9;
            for (const ex of [16, 22]) {
              for (let y = 12; y <= 14; y++) for (let x = ex - 1; x <= ex + 2; x++) if (!((y === 12 || y === 14) && (x === ex - 1 || x === ex + 2))) P(x + fx, y, FIRE[1]);
              if (squint) { P(ex + fx, 13, FIRE[6]); P(ex + 1 + fx, 13, FIRE[6]); }
              else if (!blink) { P(ex + fx, 13, FIRE[8]); P(ex + 1 + fx, 13, FIRE[8]); }
            }
            const mo = Math.floor(t * 4) % 3, fm = shiftAt(17);
            for (let x = 18; x <= 22; x++) P(x + fm, 17, FIRE[1]);
            for (let x = 19; x <= 21; x++) P(x + fm, 18, mo ? FIRE[1] : FIRE[2]);
            // the staff: charred wood, crowned with a cold blue flame
            for (let y = 6; y < N + B; y++) P(34, y, y % 3 ? hex('#1a1010') : hex('#2e1c14'));
            for (let y = -3; y < 7; y++) for (let x = 30; x < 39; x++) {
              const fx = x + 0.5 - 34 - Math.sin(t * 5 + y) * 0.5 * (6 - y) / 6, fy = y + 0.5 - 5;
              const v = 1 - Math.hypot(fx * 1.1, fy * (fy < 0 ? 0.4 : 1.1)) / 3.8 + Math.sin(t * 9 + y) * 0.08 + pump * 0.2;
              if (v > 0.05) P(x, y, dith(BLUE, Math.min(1, v * 1.2), x, y));
            }
          },
        };
      }

      // ----- Starweave: the wizard is a hole cut in the evening, and through it the whole night sky turns.
      // Drag across the robe to set new stars and join them into a constellation of your own; let go and it shines, then flies -----
      function starScene() {
        const DUSK = rampOf(['#170a2a', '#3a1640', '#6a2a5a', '#b04a5a', '#ea8a5a', '#ffc890']);
        const NEB = lv[0] < 0.5 ? rampOf(['#03031a', '#0c0c3a', '#24186a', '#52288a', '#9a4aa8', '#f0a0d8']) : rampOf(['#02081a', '#06203a', '#0e4a6a', '#1a7a8a', '#4ac0b0', '#c0fff0']);
        const SILVER = rampOf(['#4a4e80', '#7a80b8', '#c4ccf0', '#ffffff']);
        const MOONC = rampOf(['#8a7a40', '#e8d890', '#fffbe0']);
        const stars = [];
        for (let i = 0; i < 46; i++) stars.push([hv(i, 1, 4) * W, hv(i, 2, 4) * W, hv(i, 3, 4), i % 3 === 0 ? 1.6 : 0.8]);
        // two constellations stitched across the robe
        const CON = [[[8, 24], [11, 22], [14, 25], [12, 29], [16, 31]], [[26, 23], [29, 26], [33, 25], [31, 30]]];
        let shootAt = -9, setAt = -9, drawing = false;
        const nodes = [];
        const sky = (x, y) => { const k = S0(Math.floor(x), Math.floor(y)); return k === 1 || k === 2 || k === 5; };
        return {
          extra: t => nodes.length + ':' + (drawing ? Math.floor(t * 16) : '') + ':' + (t - setAt < 4 ? Math.floor(t * 12) : ''),
          feel: t => {
            const p = ptr();
            for (const [x, y] of pressNow(t).click) {
              if (sky(x, y) || x < -2 || y < -4 || x >= N + 2 || y >= N || t - shootAt < 0.8) continue;
              // a tap on the evening: a shooting star
              shootAt = t;
              [11, 9, 7, 4].forEach((k, i) => c.sound.note(lyd2(k + 7), { dur: 0.5, vel: 0.06, wave: 'sine', at: 0.05 + i * 0.09 }));
            }
            if (p.down && sky(p.x, p.y)) {
              // dragging over the night: a new star wherever the stroke has gone far enough from the last
              if (!drawing) { drawing = true; if (t - setAt > 2.5) nodes.length = 0; }
              const l = nodes[nodes.length - 1];
              if (nodes.length < 12 && (!l || Math.hypot(p.x - l[0], p.y - l[1]) > 3.2)) {
                nodes.push([Math.floor(p.x), Math.floor(p.y)]);
                c.sound.note(lyd2(14 - Math.round(p.y / 4)), { dur: 0.7, vel: 0.07, wave: 'sine', pan: p.x / N - 0.5 });
              }
            } else if (drawing && !p.down) {
              // let go: the new constellation shines
              drawing = false;
              if (nodes.length > 1) { setAt = t; nodes.forEach((n, i) => c.sound.note(lyd2(7 + i), { dur: 1.2, vel: 0.05, wave: 'sine', at: i * 0.07 })); }
              else nodes.length = 0;
            }
            if (!drawing && nodes.length && t - setAt > 3.6) nodes.length = 0;
          },
          draw: (t, q) => {
            const drift = t * 0.6;
            const shoot = (t - shootAt) < 0.9 ? (t - shootAt) / 0.9 : (((t + 3) % 5.5) < 0.9 ? ((t + 3) % 5.5) / 0.9 : -1);
            each((x, y) => {
              const s = S0(x, y);
              if (!s) {
                // the evening outside: a dusk gradient, a few soft clouds
                let v = 0.05 + (y + B) / (W - 1) * 0.95;
                v += Math.max(0, Math.sin(x * 0.2 + y * 0.9 + t * 0.15) - 0.75) * 0.6;
                P(x, y, dith(DUSK, v, x, y));
                return;
              }
              if (s === 3) { P(x, y, (x * 7 + y * 5) % 23 === 0 ? hex('#2a2a5a') : th(x, y) < 0.15 ? hex('#0a0a24') : hex('#05051a')); return; }
              if (s === 4) {
                // a beard of starlight, combed into strands
                const v = 0.55 + 0.35 * Math.sin(x * 1.7 + Math.floor(y / 3)) + (y > 28 ? -0.3 : 0) + Math.sin(t * 2 + y * 0.6 + x) * 0.12;
                P(x, y, dith(SILVER, Math.max(0, Math.min(1, v)), x, y));
                return;
              }
              // the night: a nebula drifting through the cut-out, deep and slow
              const u = x - drift, nv = 0.12 + 0.3 * (Math.sin(u * 0.21 + y * 0.13) + Math.sin(u * 0.09 - y * 0.27 + 1.3) + 0.6 * Math.sin((u + y) * 0.33)) * 0.5 + 0.2;
              P(x, y, dith(NEB, Math.max(0, Math.min(1, nv)), x, y));
            });
            // stars in the cut-out, drifting at two depths, twinkling
            for (const [sx, sy, ph, sp] of stars) {
              const x = Math.floor(((sx - drift * sp) % W + W) % W) - B, y = Math.floor(sy) - B, s = S0(x, y);
              if (!s || s === 3 || s === 4) continue;
              const tw = Math.sin(t * 2.3 + ph * 20);
              P(x, y, tw > 0.3 ? hex('#ffffff') : hex('#b8c0f0'));
              if (sp > 1 && tw > 0.8) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (S0(x + a, y + b) === 5 || S0(x + a, y + b) === 1) P(x + a, y + b, hex('#8a90d0'));
            }
            // the constellations, their stars lighting one after another
            CON.forEach((pts, k) => pts.forEach(([x, y], i) => {
              if (i) { const [a, b] = pts[i - 1]; for (let f = 0.25; f < 1; f += 0.25) { const lx = Math.round(a + (x - a) * f), ly = Math.round(b + (y - b) * f); if (S0(lx, ly) === 5 && (lx + ly) % 2) P(lx, ly, hex('#3a4a8a')); } }
              if (S0(x, y) === 5) P(x, y, (Math.floor(t * 2) + i + k) % pts.length === 0 ? hex('#fff6c0') : hex('#d0d8ff'));
            }));
            // your constellation: its stars joined by faint lines, shining once it's set, then streaking away
            const age = t - setAt, gone = !drawing && age > 2.4 ? Math.min(1, (age - 2.4) / 1.2) : 0;
            nodes.forEach(([x, y], i) => {
              if (i && !gone) { const [a, b] = nodes[i - 1], n = Math.max(1, Math.round(Math.hypot(x - a, y - b))); for (let k = 1; k < n; k++) { const lx = Math.round(a + (x - a) * k / n), ly = Math.round(b + (y - b) * k / n); if (sky(lx, ly) && (k % 2 || !drawing)) P(lx, ly, !drawing && age < 2.4 ? hex('#8ac8ff') : hex('#4a6ab0')); } }
              const nx = x + gone * (14 + i * 2), ny = y - gone * (9 + i);
              if (gone) for (let k = 1; k < 4; k++) P(nx - k, ny + k * 0.6, SILVER[3 - k]);
              const tw = !drawing && age < 2.4 && (Math.floor(t * 6) + i) % 3 === 0;
              P(nx, ny, hex('#ffffff'));
              if (tw || (drawing && i === nodes.length - 1)) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(nx + a, ny + b, hex('#c8e0ff'));
            });
            // a shooting star across the robe now and then (and whenever the viewer taps the evening)
            if (shoot >= 0) for (let k = 0; k < 5; k++) { const x = Math.round(4 + shoot * 30 - k), y = Math.round(20 + shoot * 12 - k * 0.4); if (S0(x, y) === 5) P(x, y, k ? SILVER[3 - Math.min(3, k)] : hex('#ffffff')); }
            // a gold band round the hat, a rim of evening light along the shoulders
            for (let x = -B; x < N + B; x++) for (let y = -B; y < N + B; y++) {
              const s = S0(x, y);
              if (s === 1 && S0(x, y + 1) === 2 && (x + q) % 4) P(x, y, hex('#ffd860'));
              if ((s === 5 || s === 1 || s === 2) && !S0(x, y - 1)) P(x, y, hex('#e8a8a0'));
            }
            // the eyes: two stars in the shadow under the brim
            const blink = ((t + 0.8) % 4.6) < 0.15, tw = Math.floor(t * 3) % 2;
            for (const ex of [17, 23]) {
              if (blink) { P(ex, 14, SILVER[1]); continue; }
              P(ex, 14, hex('#ffffff'));
              if (tw) { P(ex - 1, 14, SILVER[1]); P(ex + 1, 14, SILVER[1]); P(ex, 13, SILVER[1]); P(ex, 15, SILVER[1]); }
            }
            // the staff: silver, a crescent moon on its head
            if (orb[0] !== 'No Staff') {
              for (let y = 8; y < N + B; y++) P(34, y, y % 4 ? SILVER[1] : SILVER[2]);
              for (let y = -1; y < 8; y++) for (let x = 30; x < 39; x++) {
                const d = Math.hypot(x + 0.5 - 34, y + 0.5 - 3.5), d2 = Math.hypot(x + 0.5 - 35.6, y + 0.5 - 2.6);
                if (d < 3.8 && d2 > 3.1) P(x, y, dith(MOONC, 1 - d / 5 + 0.2, x, y));
              }
            }
          },
        };
      }

      // ----- Swapped: the familiar has taken over: hat, robe, beard and all, out in a mushroom ring by moonlight,
      // the wizard riding tiny on its shoulder, fireflies rising and a ring of spell sparks round them. It breathes, sways
      // and blinks (the founder, 2026-10-23: "kinda breathe and sway/move a bit"); the hat's tip swings. A tap: the tiny
      // wizard flicks his wand and sparks burst off it; the pointer draws the fireflies (the hat stays put: the founder,
      // 2026-10-23) -----
      function swapScene() {
        const FOREST = rampOf(['#03080e', '#08182a', '#10283a', '#1e4458']);
        const GLOW = rampOf(['#0a2a3a', '#1a7a9a', '#4ad8e8', '#d0ffff']);
        const ROBE = ramp(robes[1]), HAIR = ramp(hairCol[1]), HIDE = skin, TINY = realSkin;
        let wave = -1, castAt = -9;
        const bursts = [];
        // (the tiny wizard: sat on the right shoulder; his sprite's top-left corner, and his wand's tip)
        const TX = 26, TY = 12, WX = TX + 8, WY = TY + 6;
        let OX = 0, OY = 0;
        const PO = (x, y, cl) => P(x + OX, y + OY, cl);
        const hb0 = creature === 'Mouse' ? 9 : creature === 'Toad' ? 6.8 : 7.6;
        // is a cell on the hat (cone or brim), with the hat moved by (ox, oy)?
        const onHat = (x, y, ox, oy, hb, sw = 0) => {
          const px = x + 0.5 - ox, py = y + 0.5 - oy;
          if (py < hb - 12 || py > hb + 1.4) return 0;
          const u = (py - (hb - 12)) / 12, mx = 20 + (bendW + sw) * (1 - u) * (1 - u);
          if (py <= hb && Math.abs(px - mx) <= 0.5 + u * 6.4) return Math.abs(py - hb + 1) < 0.6 ? 3 : 1;
          return ((px - 20) / 11) ** 2 + ((py - hb - 0.4) / 1.3) ** 2 <= 1 ? 2 : 0;
        };
        const callOf = at => {
          if (creature === 'Toad') [0, 0.16].forEach(d => c.sound.note(lyd2(-12), { dur: 0.11, vel: 0.16, wave: 'triangle', cutoff: 500, at: at + d }));
          else if (creature === 'Mouse') [14, 16, 14].forEach((k, i) => c.sound.note(lyd2(k), { dur: 0.05, vel: 0.1, wave: 'sine', at: at + i * 0.06 }));
          else [0, 0.22].forEach(d => c.sound.note(lyd2(-3), { dur: 0.16, vel: 0.12, wave: 'sawtooth', cutoff: 1400, at: at + d }));
        };
        // a dither that's solid in the middle of each step and grainy only at the seams (the robe and the sky read clean
        // at 64 px instead of as checkerboard)
        const sdith = (rmp, v, x, y, soft = 0.3) => { const p = Math.max(0, Math.min(rmp.length - 1.001, v * (rmp.length - 1))), i = Math.floor(p), f = Math.max(0, Math.min(1, (p - i - 0.5) / soft + 0.5)); return rmp[f > th(x, y) ? i + 1 : i]; };
        // the robe: round, broad shoulders (the tiny wizard sits on one)
        const robeHalf = y => (y < 19 ? -1 : Math.min(17.5, 8 + 9.5 * Math.sqrt(Math.min(1, (y - 19) / 7))));
        const onRobe = (x, y) => Math.abs(x + 0.5 - 20) <= robeHalf(y);
        const MOON = rampOf(['#8a8a78', '#d8d2b4', '#f6f0d8', '#fffdf2']), MX = 8.5, MY = 3.5, MR = 5.4;
        const VIOLET = rampOf(['#2a0a3a', '#7a2aaa', '#d07aff', '#ffe0ff']), GOLD = rampOf(['#4a2a08', '#a8701a', '#ffd25a']);
        const STARS = [];
        for (let i = 0; i < 14; i++) STARS.push([-3 + Math.floor(hv(i, 1, 41) * 47), -4 + Math.floor(hv(i, 2, 41) * 22), hv(i, 3, 41) * 6.28, 1 + hv(i, 4, 41) * 2]);
        // the creature's head: 1 hide, 2 the paler bits (belly, inner ear, beak), 3 eye white, 4 dark
        const head = (x, y) => {
          const px = x + 0.5, py = y + 0.5;
          if (creature === 'Toad') {
            // a broad flat toad's head with two great eye domes on top
            if (((px - 14.2) / 3.4) ** 2 + ((py - 10.2) / 3.2) ** 2 <= 1 || ((px - 25.8) / 3.4) ** 2 + ((py - 10.2) / 3.2) ** 2 <= 1) return 1;
            if (((px - 20) / 10.4) ** 2 + ((py - 15.6) / 5.6) ** 2 <= 1) return py > 18.2 ? 2 : 1;
          } else if (creature === 'Mouse') {
            // big round ears, pink inside, and a round head
            const ear = (cx2, cy2, r) => ((px - cx2) / r) ** 2 + ((py - cy2) / r) ** 2 <= 1;
            if (ear(11.2, 8.4, 4.8) || ear(28.8, 8.4, 4.8)) return ear(11.2, 8.4, 3.1) || ear(28.8, 8.4, 3.1) ? 2 : 1;
            if (((px - 20) / 7.4) ** 2 + ((py - 15) / 6.6) ** 2 <= 1) return 1;
          } else {
            // a raven's round black head with a ruff of feathers
            if (((px - 20) / 7.6) ** 2 + ((py - 13.6) / 7.2) ** 2 <= 1) return 1;
            if (py > 17 && py < 22 && Math.abs(px - 20) < 8.6 - (py - 17) * 0.6 && (Math.floor(px) % 2 === 0)) return 1;
          }
          return 0;
        };
        return {
          // (the motes and sparks move all the time: drawn 16 times a second)
          extra: t => Math.floor(t * 16) + (t < wave ? 'w' : ''),
          feel: t => {
            for (const [x, y] of tapsNow()) {
              if (x < -2 || y < -4 || x >= N + 2 || y >= N) continue;
              // a tap: the tiny wizard flicks his wand, a burst of sparks flies from its tip, the familiar calls
              wave = t + 1.2; castAt = t;
              const n0 = bursts.length;
              for (let k = 0; k < 34; k++) {
                const a = -Math.PI / 2 + 0.45 + (hv(k, Math.floor(t * 30), 21) - 0.5) * 2.4, v = 9 + hv(k, Math.floor(t * 30), 22) * 17;
                bursts.push([WX, WY, Math.cos(a) * v, Math.sin(a) * v, t, 1 + hv(k, Math.floor(t * 30), 23) * 0.9, k % 3]);
              }
              if (bursts.length > 120) bursts.splice(0, bursts.length - 120);
              c.sound.hit('noise', 0.08, { cutoff: 4200, dur: 0.12 });
              [7, 9, 11, 14].forEach((k, i) => c.sound.note(lyd2(k), { dur: 0.18, vel: 0.08, wave: 'triangle', cutoff: 2400, at: 0.03 + i * 0.05 }));
              callOf(0.3);
              void n0;
            }
            for (let k = bursts.length - 1; k >= 0; k--) if (t - bursts[k][4] > bursts[k][5]) bursts.splice(k, 1);
          },
          draw: (t, q) => {
            // it breathes (its chest and head rise a cell on the breath in) and sways (its head leans a cell, the hat's tip
            // swings further, lagging), slow, out of step with each other
            const br = Math.sin(t * 1.75), swv = Math.sin(t * 1.15 + 0.6), lag = Math.sin(t * 1.15 + 0.1);
            const down = br > 0.3 ? -1 : 0, lean = swv > 0.5 ? 1 : swv < -0.5 ? -1 : 0, tipS = lag * 2.4 + br * 0.3;
            // (never in the first seconds: a still or a thumbnail is drawn from the start, eyes open)
            const blink = (t % 4.3) > 4.17 || ((t + 0.4) % 11.7) > 11.58;
            const onRobeB = (x, y) => onRobe(x, y - down);
            const hb = hb0, pp = ptr();
            // the particles: fireflies rising off the mushrooms (drawn toward the pointer), a ring of spell sparks round
            // the familiar (behind it, then in front), stars, the wand's trickle, and a tap's burst
            const motes = [], ring = [];
            for (let i = 0; i < 26; i++) {
              const sp = 0.05 + hv(i, 4, 31) * 0.06, u = (t * sp + hv(i, 5, 31)) % 1;
              let mx = -3 + hv(i, 6, 31) * 46 + Math.sin(t * (0.6 + hv(i, 7, 31)) + i) * 2.4, my = 40 - u * 50;
              if (pp.in) { const dx = pp.x - mx, dy = pp.y - my, d = Math.hypot(dx, dy); if (d < 14 && d > 0.5) { const f = (1 - d / 14) * 0.55; mx += dx * f; my += dy * f; } }
              const tw = 0.5 + 0.5 * Math.sin(t * (2 + hv(i, 8, 31) * 3) + i * 1.7), fade = Math.min(1, u * 5, (1 - u) * 4);
              motes.push([mx, my, tw * fade, i % 3 === 0 ? 1 : 0, i % 2]);
            }
            for (let i = 0; i < 8; i++) {
              const a = t * 0.9 + i * Math.PI * 2 / 8 + Math.sin(t * 0.5 + i) * 0.15;
              ring.push([a, Math.sin(a)]);
            }
            const moteAt = (m, front) => {
              if (m[4] !== front || m[2] < 0.12 || (front && head(Math.round(m[0]), Math.round(m[1])))) return;
              const cl = m[3] ? VIOLET : GLOW;
              if (m[2] > 0.45) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(m[0] + dx, m[1] + dy, m[2] > 0.8 ? cl[2] : cl[1]);
              P(m[0], m[1], m[2] > 0.55 ? cl[3] : cl[2]);
            };
            const ringAt = front => {
              for (const [a, z] of ring) {
                if ((z > 0) !== front) continue;
                const at = b => [20 + Math.cos(b) * 17, 25 + Math.sin(b) * 3.4 - Math.cos(b) * 1.4];
                for (let k = 5; k >= 1; k--) { const [x, y] = at(a - k * 0.08); P(x, y, k < 2 ? GOLD[2] : k < 4 ? GOLD[1] : GOLD[0]); }
                const [x, y] = at(a);
                if (front) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) P(x + dx, y + dy, GOLD[2]);
                P(x, y, front ? hex('#fffbe0') : GOLD[2]);
              }
            };
            // the figure's shape, once a frame (for its dark edge and the glow round it)
            const FM = new Uint8Array(W * W), fm = (x, y) => { const X = x + B, Y = y + B; return X >= 0 && Y >= 0 && X < W && Y < W && FM[Y * W + X] === 1; };
            each((x, y) => { if (onRobeB(x, y) || head(x - lean, y - down) || onHat(x - lean, y - down, 0, 0, hb0, tipS)) FM[(y + B) * W + x + B] = 1; });
            const aura = 0.3 + 0.2 * Math.sin(t * 1.6);
            // the clearing: dark trees all round, moonlight, a ring of glowing mushrooms on the moss
            each((x, y) => {
              const dm = Math.hypot(x + 0.5 - MX, y + 0.5 - MY);
              let col = sdith(FOREST, 0.72 - (y + B) / W * 0.5 + Math.max(0, 0.42 - dm / 26) + Math.max(0, 0.3 - Math.hypot(x - 20, y + 6) / 34), x, y, 0.45);
              // the moon, a few craters, and its rim
              if (dm < MR) col = dm > MR - 0.9 && x + 0.5 > MX ? MOON[1] : sdith(MOON, 0.95 - dm / MR * 0.35 - (hv(x >> 1, y >> 1, 11) < 0.18 ? 0.3 : 0), x, y, 0.2);
              else if (Math.abs(dm - MR - 2.6) < 0.5 && th(x, y) < 0.35 + 0.15 * Math.sin(t * 0.8)) col = FOREST[3];
              const trunk = (x + 64) % 13 < 3 && (Math.abs(x - 20) > 13);
              if (trunk && y < 32) col = (x + 64) % 13 === 2 && dm < 16 ? FOREST[1] : FOREST[0];
              if (y >= 32) col = dith(rampOf(['#04100a', '#0c2a16', '#1a4a22']), 0.35 + hv(x, y, 3) * 0.4, x, y);
              // a dark edge round the figure, so it stands off the night at any size
              if (!fm(x, y)) {
                if (fm(x - 1, y) || fm(x + 1, y) || fm(x, y + 1) || fm(x, y - 1)) col = INK2;
                else if (y < 32 && (fm(x - 2, y) || fm(x + 2, y) || fm(x, y - 2) || fm(x - 1, y - 1) || fm(x + 1, y - 1) || fm(x - 1, y + 1) || fm(x + 1, y + 1)) && th(x, y) < aura) col = GLOW[th(x + 1, y) < aura * 0.5 ? 1 : 0];
              }
              P(x, y, col);
            });
            // stars between the trees, twinkling
            for (const [sx, sy, ph, sp] of STARS) {
              if (Math.hypot(sx - MX, sy - MY) < MR + 3.5 || fm(sx, sy) || fm(sx, sy + 1)) continue;
              const b = Math.sin(t * sp + ph);
              if (b > -0.3) P(sx, sy, b > 0.6 ? hex('#ffffff') : FOREST[3]);
              if (b > 0.85) { P(sx - 1, sy, FOREST[3]); P(sx + 1, sy, FOREST[3]); P(sx, sy - 1, FOREST[3]); P(sx, sy + 1, FOREST[3]); }
            }
            // glowing mushrooms in the moss behind
            for (const [mx, my, k] of [[-2, 31, 1], [42, 31, 0], [1, 33, 0], [39, 33, 1]]) mushroom(mx, my, k, 0.8);
            // what's behind the figure: half the fireflies, the far half of the spell ring
            for (const m of motes) moteAt(m, 0);
            ringAt(false);
            // the robe, wide on its shoulders, a star clasp
            each((x, y) => {
              if (!onRobeB(x, y)) return;
              const px = x + 0.5 - 20, fold = y > 23 && Math.abs(Math.abs(px) - (4 + (y - 23) * 0.55)) < 0.6 ? 0.2 : 0;
              let col = sdith(ROBE, 0.62 - px * 0.032 - (y - down - 19) * 0.012 - fold, x, y);
              if (!onRobeB(x - 1, y)) col = ROBE[ROBE.length - 1];
              else if (!onRobeB(x + 1, y) || (y - down > 19 && !onRobeB(x, y - 1) && px > 0)) col = ROBE[0];
              P(x, y, col);
            });
            // where the tiny wizard sits, his shadow on the shoulder
            for (let x = TX + 1; x < TX + 6; x++) if (onRobe(x, TY + 11)) P(x, TY + 11 + down, ROBE[0]);
            P(20, 21 + down, hex('#ffe27a')); P(19, 22 + down, hex('#d09a24')); P(21, 22 + down, hex('#d09a24'));
            // the creature's head under the wizard's hat
            each((x, y) => {
              const k = head(x - lean, y - down);
              if (!k) return;
              const lit = 0.55 + (20 - x) * 0.02 - (y - 12) * 0.02 + (!head(x - 1 - lean, y - down) || !head(x - lean, y - 1 - down) ? 0.35 : 0);
              P(x, y, k === 2 ? HIDE[2] : dith(HIDE, Math.max(0, Math.min(1, lit)), x, y));
            });
            OX = lean; OY = down;
            const Y = 0;
            if (creature === 'Toad') {
              // golden eyes with a bar of a pupil, a wide toad's grin, warts
              for (const ex of [14, 25]) { if (blink) rows4(['.ggg.', 'ggggg', 'kkkkk', 'ggggg', '.ggg.'], ex - 2, 8 + Y, { g: HIDE[1], k: hex('#100808') }); else { rows4(['.yyy.', 'yyyyy', 'kkkkk', 'yyyyy', '.yyy.'], ex - 2, 8 + Y, { y: hex('#ffd040'), k: hex('#100808') }); PO(ex - 1, 8 + Y, hex('#fff4b0')); } }
              for (let x = 11; x <= 29; x++) PO(x, 18 + Y + (x < 13 || x > 27 ? -1 : 0), INK2);
              PO(18, 14 + Y, HIDE[0]); PO(22, 14 + Y, HIDE[0]);
              for (const [a, b] of [[12, 14], [27, 15], [16, 12], [24, 12], [13, 16], [26, 13]]) PO(a, b + Y, HIDE[2]);
            } else if (creature === 'Mouse') {
              // big black shining eyes, a pink nose, buck teeth, long whiskers
              for (const ex of [16, 23]) { if (blink) { PO(ex - 1, 13 + Y, INK2); PO(ex, 13 + Y, INK2); PO(ex + 1, 13 + Y, INK2); PO(ex + 2, 13 + Y, INK2); } else { PO(ex, 12 + Y, INK2); PO(ex + 1, 12 + Y, INK2); PO(ex, 13 + Y, INK2); PO(ex + 1, 13 + Y, INK2); PO(ex, 12 + Y, hex('#ffffff')); } }
              PO(19, 16 + Y, hex('#ff7aa0')); PO(20, 16 + Y, hex('#ff7aa0')); PO(19, 17 + Y, hex('#d05a7a')); PO(20, 17 + Y, hex('#d05a7a'));
              PO(19, 18 + Y, hex('#ffffff')); PO(20, 18 + Y, hex('#ffffff'));
              for (const sd of [-1, 1]) for (const dy of [-1, 0, 1]) for (let k = 0; k < 5; k++) PO(20 + sd * (3 + k) - (sd < 0 ? 1 : 0), 17 + Y + dy + (k > 2 ? dy : 0), hex('#f4eef4'));
            } else {
              // white-ringed eyes and a great grey beak
              for (const ex of [14, 24]) { if (blink) rows4(['.ww.', 'wkkw', 'wwww', '.ww.'], ex - 1, 10 + Y, { w: hex('#3a3a5a'), k: INK2 }); else rows4(['.ww.', 'wyyw', 'wykw', '.ww.'], ex - 1, 10 + Y, { w: hex('#e8e8f0'), y: hex('#ffe070'), k: INK2 }); }
              rows4(['.kkkkkkk.', 'kWGGGGggk', 'kGGGGGggk', '.kGGGggk.', '.kGGGgk..', '..kGGgk..', '..kGgk...', '...kgk...', '...kk....'], 16, 13 + Y, { k: INK2, g: hex('#5a5a70'), G: hex('#a4a4ba'), W: hex('#e4e4f4') });
              for (const [a, b] of [[16, 6], [17, 5], [18, 6], [21, 6], [22, 5], [14, 9], [26, 9], [13, 13], [27, 13], [15, 8], [25, 8], [19, 7], [20, 7]]) PO(a, b + Y, hex('#6a7ac0'));
              for (const ex of [14, 24]) { PO(ex - 1, 9 + Y, hex('#8a9ae0')); PO(ex + 2, 9 + Y, hex('#8a9ae0')); }
            }
            // the beard it has put on, the hat it wears
            // (its tip swings a little behind the head)
            OX = 0; OY = 0;
            each((x, y) => {
              const py = y + 0.5 - down, top = creature === 'Toad' ? 19.5 : 20, px = x + 0.5 - 20 - lean - (py - top > 4 ? Math.round(-lag * 0.8) : 0);
              if (py >= top && py < top + 9 && Math.abs(px) <= 4.4 - (py - top) * 0.45) P(x, y, dith(HAIR, 0.6 + Math.sin((x - lean) * 1.9) * 0.3 - (py - top) * 0.03, x, y));
            });
            // the string that holds the false beard on
            OX = lean; OY = down;
            for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) PO(20 + sd * (4 + k), 19 + Y - Math.round(k * 0.8), hex('#d8ccb0'));
            // the tiny wizard rides the shoulder up and down with its breath
            OX = 0;
            // the wizard, tiny, on its shoulder: hat, face, white beard, an arm up when it waves
            const tw = t < wave && Math.floor(t * 6) % 2;
            rows4(['...y...', '..ggy..', '..ggg..', '.ggggg.', 'yyyyyyy', '.fsfsf.', '.fbbbf.', '..bbb..', '.rrbrr.', '.rrrrr.', 'rrrrrrr'], TX, TY, { y: hex('#ffe27a'), g: hex('#3a8aff'), r: hex('#e8e0f0'), f: TINY[2], s: INK2, b: hex('#ffffff') });
            // his hand and a little wand, raised while he casts; its tip glows and lets a spark fall now and then
            const up = tw ? 2 : 0, wx = WX + (tw ? 1 : 0), wy = WY - up;
            PO(TX + 6, TY + 9 - up, TINY[2]); PO(TX + 7, TY + 8 - up, hex('#6a4a2a')); PO(wx, wy + 1, hex('#6a4a2a'));
            const tip = 0.5 + 0.5 * Math.sin(t * 5);
            PO(wx, wy, tip > 0.5 || t < wave ? hex('#fff6c0') : GOLD[2]);
            if (tip > 0.8 || t < wave) { PO(wx - 1, wy, GOLD[1]); PO(wx + 1, wy, GOLD[1]); PO(wx, wy - 1, GOLD[1]); }
            for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1; if (u < 0.85) PO(wx + Math.sin(u * 9 + k) * 1.2, wy + 1 + u * 7, u < 0.4 ? GOLD[2] : GOLD[1]); }
            OX = 0; OY = 0;
            for (const [mx, my, k] of [[0, 37, 1], [3, 39, 0], [37, 39, 1], [40, 37, 0]]) mushroom(mx, my, k, 1);
            // what's in front: the near half of the ring, the other fireflies
            ringAt(true);
            for (const m of motes) moteAt(m, 1);
            // the hat, on its head
            each((x, y) => {
              const k = onHat(x, y, lean, down, hb, tipS);
              if (!k) return;
              const u = (y + 0.5 - down - (hb - 12)) / 12, mx = 20 + lean + (bendW + tipS) * (1 - u) * (1 - u);
              let col = k === 3 ? hex('#d09a24') : sdith(ROBE, k === 2 ? 0.3 : 0.62 - (x + 0.5 - mx) * 0.06, x, y);
              if (k === 1 && !onHat(x - 1, y, lean, down, hb, tipS)) col = ROBE[ROBE.length - 1];
              if (k === 2 && !onHat(x, y + 1, lean, down, hb, tipS)) col = ROBE[0];
              P(x, y, col);
            });
            // a star glinting on the hat band now and then (and as a spell is cast)
            if ((t % 2.2) < 0.25 || t - castAt < 0.5) { const gx = Math.round(20 + 2 + lean), gy = Math.round(hb - 1 + down); P(gx, gy, hex('#ffffff')); P(gx - 1, gy, hex('#fff0a0')); P(gx + 1, gy, hex('#fff0a0')); P(gx, gy - 1, hex('#fff0a0')); P(gx, gy + 1, hex('#fff0a0')); }
            // a tap's burst: sparks thrown up from the wand, slowing, falling, going out
            for (const [x0, y0, vx, vy, b0, life, k] of bursts) {
              const a = t - b0;
              if (a < 0 || a > life) continue;
              const x = x0 + vx * a * (1 - a * 0.35), y = y0 + vy * a + 9 * a * a, u = a / life;
              const cl = k === 0 ? GOLD : k === 1 ? GLOW : VIOLET;
              P(x, y, u < 0.35 ? (k === 0 ? hex('#fff6c0') : cl[3]) : u < 0.7 ? cl[2] : cl[1]);
              if (u < 0.3) P(x - vx * 0.03, y - vy * 0.03, cl[1]);
            }
            // a glowing mushroom: a dome cap, a pale stem, a soft glow that breathes
            function mushroom(mx, my, k, sc) {
              const glow = 0.55 + 0.45 * Math.sin(t * 1.4 + mx), cap = k ? GLOW : VIOLET;
              for (let y = my - 6; y < my + 3; y++) for (let x = mx - 6; x < mx + 7; x++) { const d = Math.hypot(x - mx, (y - my + 1) * 1.2); if (d > 2.5 && d < 5.5 * sc && th(x, y) < (5.5 * sc - d) / 9 * glow) P(x, y, cap[0]); }
              P(mx, my, hex('#e8e0d0')); P(mx, my + 1, hex('#c8c0b0')); P(mx, my + 2, hex('#a89e8e'));
              P(mx - 2, my - 1, cap[1]); P(mx - 1, my - 1, cap[3]); P(mx, my - 1, cap[2]); P(mx + 1, my - 1, cap[2]); P(mx + 2, my - 1, cap[1]);
              P(mx - 1, my - 2, cap[2]); P(mx, my - 2, cap[3]); P(mx + 1, my - 2, cap[2]);
            }
          },
        };
        function rows4(map, x0, y0, pal) { map.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.') PO(x0 + i, y0 + j, pal[r[i]]); }); }
      }
    }
    // (the legendaries end here)
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
