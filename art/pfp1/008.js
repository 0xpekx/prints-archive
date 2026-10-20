// Signal Aliens: from D:/code/synaesthesia/public/drop03/pieces/008.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Signal Aliens: visitors seen on a one-colour phosphor monitor. 28 x 28 cells with glow and scanlines.
Proto.add({
  num: 8,
  name: 'Signal Aliens',
  seed: 302,
  fam: 'Pixel Portraits',
  interactive: 'Tap to signal and it beeps back. Drag to detune the screen.',
  music: true,
  recipe: 'An alien caught on a one-colour phosphor screen, drawn on a 28-cell grid in five brightness levels with a soft glow and scanlines. Phosphor, head, eyes, antennae, mouth, markings, suit, the transmission behind, screen faults, overlays, a pet and the monitor around it vary; thermal, e-ink and brain-dome visitors are rare; a tiny earthling pet is coveted, and once in a long while the signal is a hive of nine or the crowned envoy itself.',
  make(c) {
    const S = c.size, N = 28;
    // jsf32 (a small fast generator), seeded from the hash
    let a = 0xf1ea5eed, b = 0, cc = 0, d = 0;
    for (let i = 0; i < 4; i++) {
      const w = parseInt(c.hash.slice(2 + i * 16, 10 + i * 16), 16) ^ parseInt(c.hash.slice(10 + i * 16, 18 + i * 16), 16);
      if (i === 0) b = w; else if (i === 1) cc = w; else if (i === 2) d = w; else a ^= w;
    }
    const rot = (x, k) => (x << k) | (x >>> (32 - k));
    function jsf() {
      const e = (a - rot(b, 27)) | 0;
      a = b ^ rot(cc, 17);
      b = (cc + d) | 0;
      cc = (d + e) | 0;
      d = (e + a) | 0;
      return (d >>> 0) / 4294967296;
    }
    for (let i = 0; i < 20; i++) jsf();
    const sel = (...opts) => {
      let t = 0;
      for (let i = 1; i < opts.length; i += 2) t += opts[i];
      let r = jsf() * t;
      for (let i = 0; i < opts.length; i += 2) if ((r -= opts[i + 1]) < 0) return opts[i];
      return opts[0];
    };

    let phosphor = sel('Green', 34, 'Amber', 24, 'Ice', 18, 'Paper White', 12, 'Magenta', 8, 'Red Alert', 4);
    let head = sel('Bulb', 28, 'Tall Dome', 20, 'Wide', 16, 'Squid', 14, 'Lumpy', 14, 'Shard', 8);
    let eyes = sel('Almond', 30, 'Three', 18, 'Cyclops', 16, 'Five', 12, 'Stalks', 12, 'Visor', 12);
    let antenna = sel('None', 30, 'Single', 22, 'Twin', 20, 'Ear Fins', 18, 'Signal Rings', 10);
    let mouth = sel('None', 26, 'Slit', 26, 'Oh', 16, 'Teeth', 16, 'Feelers', 16);
    let mark = sel('None', 34, 'Spots', 18, 'Chevrons', 16, 'Third Gem', 16, 'Circuit', 16);
    let suit = sel('Plain', 30, 'High Collar', 24, 'Plated', 20, 'Cables', 18, 'Medal', 8);
    let feed = sel('Grid', 24, 'Stars', 22, 'Static', 18, 'Radar', 18, 'Falling Code', 12, 'Dead Air', 6);
    const stars = [];
    for (let i = 0; i < 20; i++) stars.push([Math.floor(jsf() * N), Math.floor(jsf() * N), jsf() * 6.28]);
    const blinkEvery = 2.5 + jsf() * 3, blinkAt = jsf() * 3, gazeSpeed = 0.3 + jsf() * 0.4;
    const salt = Math.floor(jsf() * 1e6);
    // a later draw, after all the first ones: the rare visitor whose brain shows under glass
    if (jsf() < 0.022) head = 'Brain Dome';
    const bayer4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

    // the wider cast rolls from a SplitMix32 stream over another slice of the hash, so the
    // visitors above keep their looks unless this stream swaps one trait for a newer value
    let sm = (parseInt(c.hash.slice(48, 56), 16) ^ 0x6c8e9cf5) >>> 0;
    const mix = () => { sm = (sm + 0x9e3779b9) >>> 0; let zv = sm; zv = Math.imul(zv ^ (zv >>> 16), 0x85ebca6b); zv = Math.imul(zv ^ (zv >>> 13), 0xc2b2ae35); return ((zv ^ (zv >>> 16)) >>> 0) / 4294967296; };
    const mixOf = (...o) => { let tot = 0; for (let i = 1; i < o.length; i += 2) tot += o[i]; let r = mix() * tot; for (let i = 0; i < o.length; i += 2) if ((r -= o[i + 1]) < 0) return o[i]; return o[0]; };
    if (mix() < 0.3) phosphor = mixOf('Violet', 20, 'Teal', 20, 'Lime', 18, 'Rose', 16, 'Duotone', 12, 'Thermal', 8, 'E-Ink', 6);
    if (mix() < 0.34 && head !== 'Brain Dome') head = mixOf('Cone', 26, 'Crystal', 24, 'Twin Lobes', 26, 'Ringed', 24);
    if (mix() < 0.32) eyes = mixOf('Compound', 28, 'Hypno', 22, 'Lidded', 34, 'Crown of Seven', 8);
    if (mix() < 0.3) antenna = mixOf('Coil', 24, 'Dish', 22, 'Horns', 26, 'Bobbles', 20, 'Halo', 8);
    if (mix() < 0.3) mouth = mixOf('Smile', 26, 'Beak', 20, 'Zipper', 18, 'Grille', 18, 'Tendrils', 18);
    if (mix() < 0.32) mark = mixOf('Sigil', 30, 'Face Paint', 24, 'Bands', 24, 'Freckles', 22);
    if (mix() < 0.3) suit = mixOf('Neck Ring', 30, 'Ribbed', 26, 'Pauldrons', 26, 'Robe', 18);
    if (mix() < 0.34) feed = mixOf('Planet', 22, 'Waveform', 22, 'Warp', 20, 'Aurora', 20, 'Test Card', 16);
    let fault = mixOf('Clean', 44, 'Ghosting', 18, 'Interlaced', 14, 'Snow', 12, 'Burn-In', 8, 'Wobble', 6);
    let bezel = mixOf('None', 66, 'Beige CRT', 11, 'Black Bezel', 9, 'Army Green', 7, 'Woodgrain', 4, 'Chrome', 3);
    let overlay = mixOf('Live', 44, 'Subtitles', 18, 'Viewfinder', 16, 'Signal Bars', 14, 'Recording', 8);
    let pet = mixOf('None', 68, 'Saucer', 12, 'Drone', 10, 'Blob', 7, 'Mini Me', 3);
    const sigil = 1 + Math.floor(mix() * 511);
    const words = [];
    for (let i = 0; i < 12; i++) words.push(1 + Math.floor(mix() * 511));

    // more variety for a 4,000-mint collection: a 32-bit LCG on yet another slice of the hash. It only
    // swaps some of the commonest values for others and adds an accessory, so most visitors keep their looks
    let lcg4 = (parseInt(c.hash.slice(26, 34), 16) ^ 0x2545f491) >>> 0;
    const lc4 = () => { lcg4 = (Math.imul(lcg4, 1664525) + 1013904223) >>> 0; return (lcg4 >>> 8) / 16777216; };
    for (let i = 0; i < 3; i++) lc4();
    const swap4 = (cur, from, chance, list) => { const r = lc4(), p = list[Math.floor(lc4() * list.length)]; return cur === from && r < chance ? p : cur; };
    // (a monitor housing on about 40% of mints: the rest fill the whole square)
    bezel = swap4(bezel, 'None', 0.1, ['Beige CRT', 'Black Bezel', 'Army Green', 'Woodgrain', 'Red Plastic', 'Mint Plastic', 'Gunmetal', 'Red Plastic', 'Gunmetal']);
    overlay = swap4(overlay, 'Live', 0.45, ['Subtitles', 'Viewfinder', 'Signal Bars', 'Frame Counter', 'Crosshair', 'Frame Counter', 'Crosshair']);
    fault = swap4(fault, 'Clean', 0.4, ['Ghosting', 'Interlaced', 'Snow', 'Wobble', 'Burn-In']);
    pet = swap4(pet, 'None', 0.38, ['Saucer', 'Drone', 'Blob', 'Moonlet', 'Moonlet']);
    let accessory = ['None', 'None', 'None', 'Headset', 'Monocle', 'Earrings', 'Cheek Gems', 'Goggles', 'Scar', 'Nose Stud'][Math.floor(lc4() * 10)];

    // bodies, framings and this piece's own heads, eyes and mouth roll from a fourth stream (a mulberry
    // over another slice of the hash) with a fixed number of draws, so the looks above stay put
    let qs = (parseInt(c.hash.slice(18, 26), 16) ^ 0x7f4a7c15) >>> 0;
    const q = () => { qs = (qs + 0x6d2b79f5) >>> 0; let z = qs; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const qOf = (...o) => { let tot = 0; for (let i = 1; i < o.length; i += 2) tot += o[i]; let r = q() * tot; for (let i = 0; i < o.length; i += 2) if ((r -= o[i + 1]) < 0) return o[i]; return o[0]; };
    let body = qOf('Shoulders', 30, 'Hunched', 15, 'Tall Collar', 15, 'Tentacles', 13, 'Hood', 14, 'Second Head', 13);
    let framing = qOf('Centred', 32, 'Close', 30, 'Left', 19, 'Right', 19);
    const qH = q(), qHv = q(), qE = q(), qM = q(), qP = q(), qPv = q();
    if (qH < 0.14 && head !== 'Brain Dome') head = qHv < 0.5 ? 'Radio Dish' : 'Grille Face';
    if (qE < 0.1) eyes = 'Oscilloscope';
    if (qM < 0.11) mouth = 'Waveform';
    // the stock grey (a bulb head with almond eyes) is now a rare pairing
    if (head === 'Bulb' && eyes === 'Almond' && qP < 0.75) eyes = ['Oscilloscope', 'Lidded', 'Three', 'Compound', 'Hypno'][Math.floor(qPv * 5)];
    // a radio dish always has its face in the bowl: eyes there rather than on stalks over the rim, and a mouth
    if (head === 'Radio Dish') { if (eyes === 'Stalks') eyes = 'Lidded'; if (mouth === 'None') mouth = 'Smile'; }

    // legendaries and the coveted earthling roll from their own PCG-style stream on a third slice
    // of the hash, after every other draw, so ordinary visitors (and the opening one) keep their looks
    let pcs = (parseInt(c.hash.slice(34, 42), 16) ^ 0x3c6ef372) >>> 0;
    const pcg = () => {
      pcs = (Math.imul(pcs, 747796405) + 2891336453) >>> 0;
      let wv = Math.imul((pcs >>> ((pcs >>> 28) + 4)) ^ pcs, 277803737) >>> 0;
      return (((wv >>> 22) ^ wv) >>> 0) / 4294967296;
    };
    for (let i = 0; i < 4; i++) pcg();
    const lroll = pcg(), groll = pcg();
    const legend = lroll < 0.0012 ? 'Hive' : lroll < 0.002 ? 'The Envoy' : '';
    if (!legend && groll < 0.005) pet = 'Earthling';
    // the hive: a wall of nine feeds, each with its own visitor; the middle one is this mint's own
    const tiles = [];
    if (legend === 'Hive') {
      const pickL = a => a[Math.floor(pcg() * a.length)];
      const PH = ['Green', 'Amber', 'Ice', 'Paper White', 'Magenta', 'Red Alert', 'Violet', 'Teal', 'Lime', 'Rose', 'Duotone', 'Thermal'];
      for (let i = PH.length - 1; i > 0; i--) { const j = Math.floor(pcg() * (i + 1)); [PH[i], PH[j]] = [PH[j], PH[i]]; }
      if (phosphor === 'E-Ink') phosphor = 'Paper White';
      for (let i = 0; i < 9; i++) tiles.push(i === 4 ? { ph: phosphor, v: [head === 'Brain Dome' ? 'Bulb' : head, eyes, antenna, mouth, mark, suit, feed] } : {
        ph: PH.filter(p => p !== phosphor)[i % 11],
        v: [pickL(['Bulb', 'Tall Dome', 'Wide', 'Squid', 'Lumpy', 'Shard', 'Cone', 'Crystal', 'Twin Lobes', 'Ringed']), pickL(['Almond', 'Three', 'Cyclops', 'Five', 'Stalks', 'Visor', 'Compound', 'Hypno', 'Lidded', 'Crown of Seven']),
          pickL(['None', 'Single', 'Twin', 'Ear Fins', 'Signal Rings', 'Coil', 'Dish', 'Horns', 'Bobbles', 'Halo']), pickL(['None', 'Slit', 'Oh', 'Teeth', 'Feelers', 'Smile', 'Beak', 'Zipper', 'Grille', 'Tendrils']),
          pickL(['None', 'Spots', 'Chevrons', 'Third Gem', 'Circuit', 'Sigil', 'Face Paint', 'Bands', 'Freckles']), pickL(['Plain', 'High Collar', 'Plated', 'Cables', 'Medal', 'Neck Ring', 'Ribbed', 'Pauldrons', 'Robe']),
          pickL(['Grid', 'Stars', 'Static', 'Radar', 'Falling Code', 'Planet', 'Waveform', 'Warp', 'Aurora', 'Test Card'])],
      });
      head = tiles[4].v[0]; fault = 'Clean'; bezel = 'Monitor Wall'; overlay = 'Live'; pet = 'None'; accessory = 'None'; body = 'Shoulders'; framing = 'Centred';
    }
    // the envoy: a one-of-one, crowned, haloed in its own script, and it speaks. It is drawn in royal
    // purple and gold over its own phosphor, the only full-colour visitor, on a clean screen
    if (legend === 'The Envoy') { if (phosphor === 'E-Ink') phosphor = 'Paper White'; head = 'Envoy'; fault = 'Clean'; body = 'Shoulders'; framing = 'Centred'; eyes = ['Almond', 'Crown of Seven', 'Lidded', 'Cyclops'][Math.floor(pcg() * 4)]; antenna = 'Script Halo'; mouth = 'Slit'; mark = 'Third Gem'; suit = ['High Collar', 'Robe', 'Pauldrons'][Math.floor(pcg() * 3)]; if (feed === 'Test Card' || feed === 'Falling Code') feed = 'Stars'; overlay = 'Live'; pet = 'None'; accessory = 'None'; }
    if (legend) c.trait('Legendary', legend);

    c.trait('Phosphor', phosphor);
    c.trait('Head', head);
    c.trait('Eyes', eyes);
    c.trait('Antennae', antenna);
    c.trait('Mouth', mouth);
    c.trait('Marking', mark);
    c.trait('Suit', suit);
    c.trait('Body', body);
    c.trait('Feed', feed);
    c.trait('Screen Fault', fault);
    c.trait('Monitor', bezel);
    c.trait('Framing', framing);
    c.trait('Overlay', overlay);
    c.trait('Pet', pet);
    c.trait('Accessory', accessory);

    const PHOS = { 'Royal Gold': [255, 206, 90], Green: [70, 255, 120], Amber: [255, 176, 40], Ice: [110, 210, 255], 'Paper White': [230, 236, 255], Magenta: [255, 80, 220], 'Red Alert': [255, 60, 50], Violet: [176, 120, 255], Teal: [40, 236, 196], Lime: [196, 255, 70], Rose: [255, 140, 150], Duotone: [255, 90, 200], Thermal: [255, 170, 40], 'E-Ink': [40, 40, 40] }, base = PHOS[phosphor];
    let levelRgb = [0, 0.26, 0.52, 0.84, 1].map((f, i) => i === 4 ? base.map(v => Math.round(v + (255 - v) * 0.55)) : base.map(v => Math.round(v * f + (i === 0 ? 6 : 0))));
    if (phosphor === 'Duotone') levelRgb = [[10, 4, 20], [104, 28, 118], [214, 68, 168], [92, 196, 255], [206, 246, 255]];
    if (phosphor === 'Thermal') levelRgb = [[6, 4, 16], [72, 16, 112], [204, 38, 80], [255, 160, 30], [255, 248, 196]];
    if (phosphor === 'Royal Gold') levelRgb = [[14, 6, 26], [92, 44, 96], [196, 120, 64], [255, 204, 92], [255, 250, 222]];
    const ink = phosphor === 'E-Ink';
    if (ink) levelRgb = [[214, 210, 194], [166, 162, 146], [110, 106, 96], [48, 46, 42], [14, 14, 18]];
    const L = new Uint8Array(N * N);
    const solid = new Uint8Array(N * N);
    const featMask = new Uint8Array(N * N); // the radio dish face: cells its eyes and mouth drew
    // fx, fy: where the layer being drawn lands (the figure can sit off to one side, a hunched head lower);
    // paint: the envoy's colour class for what is drawn now (1 royal purple, 2 gold)
    const own = new Uint8Array(N * N);
    let fx = 0, fy = 0, paint = 0, trk = null;
    const lv = (x, y, k, s) => { x += fx; y += fy; if (x >= 0 && y >= 0 && x < N && y < N) { L[y * N + x] = k; if (s) solid[y * N + x] = 1; if (paint) own[y * N + x] = paint; if (trk) trk[y * N + x] = 1; } };
    const at = (x, y) => { x += fx; y += fy; return x >= 0 && y >= 0 && x < N && y < N ? L[y * N + x] : 0; };
    const isSolid = (x, y) => { x += fx; y += fy; return x >= 0 && y >= 0 && x < N && y < N ? solid[y * N + x] : 1; };
    const noise = (x, y, f) => { let h = Math.imul(x * 374761393 + y * 668265263 + f * 2246822519 + salt, 1) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
    const glyph = (rows, x0, y0, s) => rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] !== '.') lv(x0 + i, y0 + j, +row[i], s); });

    function halfWidth(y) {
      // (jaws end a row higher and blunter than before, so the neck below them reads short)
      if (head === 'Envoy') { if (y < 13) { const k = (y - 13) / 6.6; return k < -1 ? -1 : 9.4 * Math.sqrt(1 - k * k); } return y > 21 ? -1 : 9.4 - (y - 13) * 0.72; }
      if (head === 'Brain Dome') { if (y < 12) { const k = (y - 12) / 10; return k < -1 ? -1 : 9.2 * Math.sqrt(1 - k * k); } return y > 20 ? -1 : 9.2 - (y - 12) * 0.72; }
      if (head === 'Bulb') { if (y < 11) { const k = (y - 11) / 8; return k < -1 ? -1 : 8.6 * Math.sqrt(1 - k * k); } return y > 20 ? -1 : 8.6 - (y - 11) * 0.56; }
      // lumpy: knobbly sides that break the rim
      if (head === 'Lumpy') { if (y < 11) { const k = (y - 11) / 8; return k < -1 ? -1 : 8.6 * Math.sqrt(1 - k * k) + (y > 4 ? 1.4 * Math.max(0, Math.sin(y * 1.2 + 0.3)) : 0); } return y > 20 ? -1 : 8.6 - (y - 11) * 0.56 + (y < 16 ? 1.2 * Math.max(0, Math.sin(y * 1.2 + 0.3)) : 0); }
      // ringed: a round little planet of a head
      if (head === 'Ringed') { const k = (y + 0.5 - 11.6) / 8.4; return k <= -1 || k >= 1 || y > 19 ? -1 : 8.4 * Math.sqrt(1 - k * k); }
      if (head === 'Tall Dome') { if (y < 11) { const k = (y - 11) / 10; return k < -1 ? -1 : 7.8 * Math.sqrt(1 - k * k); } return y > 20 ? -1 : 7.8 - (y - 11) * 0.5; }
      if (head === 'Wide') { if (y < 12) { const k = (y - 12) / 7; return k < -1 ? -1 : 11.2 * Math.sqrt(1 - k * k); } return y > 20 ? -1 : 11.2 - (y - 12) * 0.95; }
      if (head === 'Squid') { const k = (y - 10) / 8; return y > 16 ? -1 : (k < -1 ? -1 : 8.4 * Math.sqrt(Math.max(0, 1 - k * k))); }
      if (head === 'Cone') { if (y < 2) return -1; if (y < 11) return 1 + (y - 2) * 0.85; return y > 20 ? -1 : 8.65 - (y - 11) * 0.55; }
      if (head === 'Crystal') { if (y < 3) return -1; if (y < 10) return 2 + (y - 3) * 1.15; return y > 20 ? -1 : 10.05 - (y - 10) * 0.66; }
      if (head === 'Twin Lobes') { if (y < 3) return -1; if (y < 8) { const dy = y + 0.5 - 8; return 5 + Math.sqrt(Math.max(0, 25 - dy * dy)); } return y > 20 ? -1 : 10 - (y - 8) * 0.5; }
      // radio dish: a wide shallow dish of a face, seated low on a two-cell mount just above the shoulders
      if (head === 'Radio Dish') { if (y < 5 || y > 21) return -1; if (y < 20) { const k = (y + 0.5 - 12.3) / 7.2; return 11.2 * Math.sqrt(Math.max(0, 1 - k * k)); } return y === 20 ? 2.1 : 3.1; }
      // grille face: a boxy cabinet of a head, a speaker grille over the lower face
      if (head === 'Grille Face') { if (y < 4 || y > 20) return -1; const r = y < 6 ? 6 - y : y > 18 ? y - 18 : 0; return 8.8 - r * 0.9; }
      return y < 4 || y > 20 ? -1 : 10 - (y - 4) * 0.52; // shard
    }
    // twin lobes part in the middle near the top
    const gapAt = y => { if (head !== 'Twin Lobes' || y >= 8 || y < 3) return 0; const dy = y + 0.5 - 8; return Math.max(0, 5 - Math.sqrt(Math.max(0, 25 - dy * dy))); };
    const topAt = x => { for (let y = 0; y < N; y++) { const hw = halfWidth(y), dx = Math.abs(x + 0.5 - 14); if (hw >= 0 && dx <= hw && dx >= gapAt(y)) return y; } return N; };
    const headIn = (x, y) => { const hw = halfWidth(y); if (hw < 0) return false; const dx = Math.abs(x + 0.5 - 14); return dx <= hw && dx >= gapAt(y); };
    // where the figure sits: shifted to one side, a hunched head lower, or pushed in close (a crop of the screen)
    const shiftX = framing === 'Left' ? -4 : framing === 'Right' ? 4 : 0;
    const twinSide = framing === 'Right' ? -1 : 1, headDx = body === 'Second Head' ? -2 * twinSide : 0, headDy = body === 'Hunched' ? 2 : 0;
    const close = framing === 'Close', vn = close ? 22 : N, vx0 = close ? 3 + (body === 'Second Head' ? twinSide : 0) : 0, vy0 = close ? 1 + headDy : 0;
    const petX = framing === 'Left' ? (pet === 'Earthling' ? 15 : 20) : 0;
    // the hood's reach round the head (squared distance to the nearest head cell, up to 5)
    const hoodNear = new Uint8Array(N * N);
    let hTop = 0;
    while (hTop < N && halfWidth(hTop) < 0) hTop++;
    if (body === 'Hood') for (let y = 0; y < 21; y++) for (let x = 0; x < N; x++) {
      if (headIn(x, y)) continue;
      let near = 99;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d2 = dx * dx + dy * dy; if (d2 <= 10 && d2 < near && headIn(x + dx, y + dy)) near = d2; }
      // and a peak over the crown, like a cowl's
      const pk = hTop - 5, hw = (y - pk) * 0.85 + 0.5, adx = Math.abs(x + 0.5 - 14);
      if (y >= pk && y < hTop + 2 && adx <= hw) near = Math.min(near, adx > hw - 1 ? 9 : 5);
      if (near <= 10) hoodNear[y * N + x] = near;
    }
    // the envoy's royal purple and gold, level by level
    const PURP = [0x12041f, 0x44166e, 0x7a34b4, 0xae68ea, 0xe8d0ff], GOLD = [0x2a1804, 0x85520e, 0xcc9020, 0xffcc48, 0xfff4c4];

    // a full-colour layer over the phosphor levels, used only by the coveted earthling
    const RGB = new Int32Array(N * N).fill(-1);
    const tint = (x, y, v) => { x += fx; y += fy; if (x >= 0 && y >= 0 && x < N && y < N) RGB[y * N + x] = v; };
    // an overlay cell: fixed to the screen; on a close-up, pinned to the edges of the crop
    const pin = v => v < 9 ? v : v > 18 ? v - 6 : 9 + Math.round((v - 9) / 3);
    const ov = (x, y, k) => close ? lv(vx0 + pin(x), vy0 + pin(y), k) : lv(x, y, k);
    const EARTH = { k: 0x1a1d2a, w: 0xf4f6fb, o: 0xff8a1e, b: 0x2f7bff, c: 0xd8f2ff, y: 0xffffff, s: 0xffe27a, O: 0xd0581a };
    function compose(t) {
      L.fill(0); solid.fill(0); RGB.fill(-1); own.fill(0); fx = fy = paint = 0;
      const tick = Math.floor(t * 4);
      // the feed behind
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let k = 0;
        if (feed === 'Grid') k = (x % 5 === 2 || y % 5 === 2) ? ((x + y) % 2 ? 1 : 0) : 0;
        else if (feed === 'Static') k = noise(x, y, tick) > 0.86 ? 1 : 0;
        else if (feed === 'Radar') { const ang = Math.atan2(y - 13.5, x - 13.5), sw = ((t * 0.9) % (Math.PI * 2)) - Math.PI; let dA = ang - sw; while (dA < -Math.PI) dA += Math.PI * 2; while (dA > Math.PI) dA -= Math.PI * 2; const r = Math.hypot(x - 13.5, y - 13.5); k = (Math.abs(r % 6 - 3) < 0.5) ? 1 : 0; if (dA < 0 && dA > -0.16) k = 1 + k; }
        else if (feed === 'Falling Code') { const col = noise(x, 0, 7); if (col > 0.45) { const head = (Math.floor(t * (2 + col * 3)) + Math.floor(col * 97)) % (N + 8); const dy = head - y; if (dy >= 0 && dy < 6) k = dy === 0 ? 2 : (noise(x, y, 3) > 0.4 ? 1 : 0); } }
        else if (feed === 'Aurora') { const wv = Math.sin(x * 0.35 + t * 0.6) * 2 + Math.sin(x * 0.13 - t * 0.3) * 2, f = 1 - Math.abs(y - 6 - wv) / 3.4, th = (bayer4[(y & 3) * 4 + (x & 3)] + 0.5) / 16; k = f > 0 ? (f * 1.5 > th ? 1 : 0) + (f > 0.55 + th * 0.4 ? 1 : 0) : 0; }
        else if (feed === 'Waveform') { const wy = Math.round(5 + Math.sin(x * 0.55 + t * 3) * 2.2 * Math.sin(t * 0.7 + x * 0.05)); k = y === wy ? 2 : y === 24 + Math.round(Math.sin(x * 0.9 - t * 4) * 1.4) ? 1 : (y % 7 === 0 && x % 2 === 0 ? 1 : 0); }
        else if (feed === 'Test Card') { const r = Math.hypot(x + 0.5 - 14, y + 0.5 - 14); k = Math.abs(r - 12.6) < 0.5 || ((x === 13 || y === 13) && (x + y) % 2 === 0) ? 1 : 0; if (y < 3 && x % 4 < 2) k = 1 + ((x >> 2) % 2); }
        else if (feed === 'Planet') {
          const px = x + 0.5 - 24.5, py = y + 0.5 - 3.5, r = Math.hypot(px, py), ry = py - px * 0.28, ring = Math.abs((px / 7.5) ** 2 + (ry / 1.4) ** 2 - 1) < 0.24;
          const th = (bayer4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
          if (r < 4.4) { k = 0.45 + (-px - py) / 9 > th ? 1 : 0; if (ring && ry > 0) k = 2; }
          else if (ring) k = 2;
          else if (noise(x, y, 11) > 0.965) k = 1;
        }
        L[y * N + x] = k;
      }
      if (feed === 'Stars') for (const s of stars) lv(s[0], s[1], Math.sin(t * 1.5 + s[2]) > 0.3 ? 2 : 1);
      if (feed === 'Warp') for (const s of stars) { const ph = (t * 0.32 + s[0] / N) % 1, r = 1 + ph * ph * 22, ca = Math.cos(s[2]), sa = Math.sin(s[2]); lv(Math.round(14 + ca * r), Math.round(14 + sa * r), ph > 0.5 ? 2 : 1); if (ph > 0.35) lv(Math.round(14 + ca * (r - 1.6)), Math.round(14 + sa * (r - 1.6)), 1); }
      if (fault === 'Burn-In') {
        for (let y = 1; y < 27; y++) for (let x = 1; x < 27; x++) if ((x === 1 || x === 26 || y === 1 || y === 26) && !L[y * N + x]) L[y * N + x] = 1;
        for (let g = 0; g < 3; g++) for (let i = 0; i < 9; i++) if (words[g] >> i & 1) lv(3 + g * 4 + (i % 3), 3 + Math.floor(i / 3), 1);
      }
      // the body, which can sit off to one side: shoulders on a short wide neck, a hunch with no neck,
      // a tall collar up to the chin, a mass of tentacles, a hooded cowl, or a second little head
      fx = shiftX; fy = 0; paint = head === 'Envoy' ? 1 : 0;
      const suitK = (x, y, k) => {
        if (suit === 'Plated' && (y === 25 || x === 7 || x === 20)) k = 2;
        if (suit === 'Cables' && (x === 10 || x === 17) && y > 22) k = (y + Math.floor(t * 3)) % 3 === 0 ? 4 : 2;
        if (suit === 'Ribbed' && k === 1 && y % 2 === 0) k = 2;
        if (suit === 'Robe' && Math.abs(Math.abs(x + 0.5 - 14) - (y - 20.5) * 0.9) < 0.6) k = 3;
        return k;
      };
      if (body !== 'Tentacles') {
        const hun = body === 'Hunched', cy0 = hun ? 29.6 : 31, rx = hun ? 14.8 : 13.5, ry = hun ? 10 : 9;
        for (let y = 18; y < N; y++) for (let x = -4; x < N + 4; x++) {
          const dx = (x + 0.5 - 14) / rx, dy = (y + 0.5 - cy0) / ry;
          if (dx * dx + dy * dy <= 1) {
            let k = 1;
            const ex = (x + 1.5 - 14) / rx, ey = (y - 0.5 - cy0) / ry, gx = (x - 0.5 - 14) / rx;
            if (ex * ex + dy * dy > 1 || gx * gx + dy * dy > 1 || dx * dx + ey * ey > 1) k = 3;
            if (hun && k === 1 && Math.abs(Math.abs(x + 0.5 - 14) - 5.5) < 0.5 && y < 24) k = 2;
            k = suitK(x, y, k);
            if (head === 'Envoy') paint = k >= 3 ? 2 : 1;
            lv(x, y, k, true);
          }
        }
        paint = head === 'Envoy' ? 1 : 0;
      } else {
        // tentacles hang from a little mantle under the chin, each curling on its own
        for (let i = 0; i < 8; i++) {
          const b = 14 + (i - 3.5) * 1.9, spread = (i - 3.5) * 0.46;
          for (let y = 19; y < N; y++) {
            const d = y - 19, x = Math.round(b + spread * d + Math.sin(t * 1.1 + i * 1.9 + y * 0.45) * d * 0.14);
            lv(x, y, d % 3 === 2 ? 3 : suitK(x, y, 2), true);
            if (d < 4) lv(x + (i < 4 ? 1 : -1), y, suitK(x, y, 1), true);
          }
        }
        for (let y = 18; y < 23; y++) for (let x = 4; x < 24; x++) { const e = ((x + 0.5 - 14) / 8) ** 2 + ((y + 0.5 - 20.5) / 2.6) ** 2; if (e <= 1) lv(x, y, e > 0.6 ? 3 : 2, true); }
      }
      if (body === 'Second Head') {
        // a second, smaller head on the right shoulder, with a blink and a mouth of its own
        const bx = 14 + twinSide * 9.5, x0 = Math.round(bx - 1.5);
        for (let y = 18; y < 23; y++) for (let x = x0; x < x0 + 4; x++) lv(x, y, x === x0 || x === x0 + 3 ? 2 : 1, true);
        for (let y = 10; y < 21; y++) for (let x = x0 - 4; x < x0 + 8; x++) { const e = ((x + 0.5 - bx) / 3.9) ** 2 + ((y + 0.5 - 15.5) / 4.4) ** 2; if (e <= 1) lv(x, y, e > 0.6 ? 3 : y < 14 ? 2 : 1, true); }
        const shut = ((t + blinkAt * 1.7 + 0.8) % (blinkEvery * 0.8)) < 0.15;
        for (const ex of [x0 - 1, x0 + 2]) { lv(ex, 15, shut ? 3 : 4, true); lv(ex, 16, shut ? 2 : 0, true); }
        lv(x0, 18, talking(t) ? 4 : 3, true); lv(x0 + 1, 18, talking(t) ? 4 : 3, true);
        lv(x0, 10, 3, true); lv(x0, 9, Math.sin(t * 3 + 1) > 0 ? 4 : 2, true);
      }
      if (suit === 'High Collar') for (let y = 15; y < 25; y++) for (const side of [-1, 1]) {
        const w = Math.floor((y - 15) * 0.35);
        for (let i = 0; i <= w; i++) lv(side < 0 ? 4 + i : 23 - i, y, i === w || i === 0 ? 3 : 1, true);
      }
      if (suit === 'Medal') { lv(18, 24, 4, true); lv(19, 25, 3, true); lv(18, 25, 3, true); lv(19, 24, 2, true); }
      if (suit === 'Pauldrons') for (const px of [4.5, 23.5]) for (let y = 21; y < 27; y++) for (let x = 0; x < N; x++) { const e = ((x + 0.5 - px) / 3.6) ** 2 + ((y + 0.5 - 24) / 2.2) ** 2; if (e <= 1) lv(x, y, e > 0.6 ? 4 : (x + y) % 2 ? 2 : 1, true); }
      // a short wide neck (only where there are shoulders to hold it)
      if ((body === 'Shoulders' || body === 'Tall Collar' || body === 'Second Head') && head !== 'Radio Dish') for (let y = 18; y < 23; y++) for (let x = 11 + headDx; x < 17 + headDx; x++) lv(x, y, x === 11 + headDx || x === 16 + headDx ? 2 : 1, true);
      if (suit === 'Neck Ring') for (let x = 10; x < 18; x++) { lv(x, 21, x === 10 || x === 17 ? 3 : 4, true); lv(x, 22, 3, true); }
      // the head and everything on it
      fx = shiftX + headDx; fy = headDy;
      let top0 = 0;
      for (let y = 0; y < N; y++) if (halfWidth(y) >= 0) { top0 = y; break; }
      if (body === 'Hood') {
        // a hood: a dark band all round the head with a lit outer edge, and a cowl draped to the shoulders
        for (let y = 17; y < N - headDy; y++) { const hw = 8.5 + (y - 17) * 1.15; for (let x = 0; x < N; x++) { const dx = Math.abs(x + 0.5 - 14); if (dx <= hw && !headIn(x, y)) lv(x, y, dx > hw - 1 ? 3 : Math.abs(dx - hw * 0.55) < 0.5 ? 1 : 2, true); } }
        for (let y = 0; y < 21; y++) for (let x = 0; x < N; x++) { const n = hoodNear[y * N + x]; if (n && !headIn(x, y)) lv(x, y, n >= 8 ? 3 : n > 2 ? 2 : 0, true); }
      }
      // head: dim fill, bright rim
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const hw = halfWidth(y);
        if (hw < 0) continue;
        const dx = Math.abs(x + 0.5 - 14), gp = gapAt(y);
        if (dx > hw || dx < gp) continue;
        const rim = dx > hw - 1 || (gp > 0 && dx < gp + 1) || halfWidth(y - 1) < 0 || Math.abs(x + 0.5 - 14) > halfWidth(y - 1) || dx < gapAt(y - 1) || (y + 1 < N && (halfWidth(y + 1) < 0 || dx > halfWidth(y + 1)));
        if (rim) { lv(x, y, 3, true); continue; }
        // the dish: a flat lit face inside a dark groove near the rim, like a reflector's
        if (head === 'Radio Dish' && y < 20) { const e = ((x + 0.5 - 14) / 11.2) ** 2 + ((y + 0.5 - 12.3) / 7.2) ** 2; lv(x, y, e > 0.7 ? 1 : 2, true); continue; }
        // the cabinet: a ribbed speaker grille across the lower face
        if (head === 'Grille Face' && y > 14) { lv(x, y, y % 2 ? 3 : (dx < 1.5 ? 1 : 0), true); continue; }
        // top-lit, in ordered dither between the phosphor's levels
        const ny = (y - top0) / Math.max(1, 21 - top0), nx = (x + 0.5 - 14) / Math.max(1, hw);
        const light = 0.95 - 0.95 * ny - 0.22 * nx + 0.12 * (1 - Math.abs(nx));
        const th = (bayer4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
        lv(x, y, Math.max(1, Math.min(3, 1 + Math.floor(light * 2 + th))), true);
      }
      if (head === 'Lumpy') {
        for (let y = 4; y < 10; y++) for (let x = 6; x < 22; x++) if (Math.abs(Math.sin((x - 14) * 0.9) * 1.4 + (y - 6)) < 0.45 && at(x, y) >= 2 && at(x, y) < 4) lv(x, y, 1, true);
        // knobs that push up through the crown
        for (const [bx, by, r] of [[9.5, 4.2, 2.3], [16.8, 2.6, 2.6], [21, 6.2, 1.9]]) for (let y = Math.floor(by - r); y <= by + r; y++) for (let x = Math.floor(bx - r); x <= bx + r; x++) {
          const e = ((x + 0.5 - bx) ** 2 + (y + 0.5 - by) ** 2) / (r * r);
          if (e <= 1 && !headIn(x, y + 1)) lv(x, y, e > 0.5 ? 3 : 2, true);
        }
      }
      if (head === 'Crystal') {
        // facets: a bright ridge down the brow and darker creases toward the jaw
        for (let y = 4; y < 11; y++) lv(13, y, 4, true);
        for (let y = 11; y < 21; y++) { const f = (10.05 - (y - 10) * 0.66) * 0.45; lv(Math.round(14 - f) - 1, y, 1, true); lv(Math.round(14 + f), y, 1, true); }
      }
      if (head === 'Brain Dome') {
        // a glass dome: dark glass, a glint, and a brain whose folds pulse with thought
        const think = Math.floor(t * 3) % 6;
        for (let y = top0 + 1; y < 11; y++) for (let x = 5; x < 23; x++) {
          const hw = halfWidth(y);
          if (Math.abs(x + 0.5 - 14) > hw - 1) continue;
          let k = 0;
          const bx = (x + 0.5 - 14) / 6.2, by = (y + 0.5 - 7.6) / 3.6;
          if (bx * bx + by * by <= 1) {
            const fold = Math.sin(x * 1.3 + Math.sin(y * 1.7) * 1.6) + Math.cos(y * 2.1 - x * 0.4);
            k = fold > 0.9 ? 1 : (x + y + think) % 6 === 0 ? 4 : 3;
            if (Math.abs(x + 0.5 - 14) < 0.6) k = 1;
          } else if ((x - y === 0 || x - y === 1) && y < 8) k = 3;
          lv(x, y, k, true);
        }
        for (let x = 5; x < 23; x++) if (Math.abs(x + 0.5 - 14) <= halfWidth(11) - 1) lv(x, 11, 3, true);
      }
      if (head === 'Squid') for (let i = 0; i < 6; i++) {
        const tx = 7 + i * 3 - (i > 2 ? 0 : 0);
        for (let y = 15; y < 23; y++) { const sw = Math.round(Math.sin(t * 1.2 + i * 1.3 + y * 0.5) * (y - 15) * 0.18); lv(tx + sw, y, y === 22 ? 2 : 3, true); }
      }
      if (head === 'Radio Dish') for (let y = 12; y < 22; y++) for (let x = 0; x < N; x++) {
        // the back of the dish showing under its front rim, so it reads as a shallow bowl, with a glint on the rim's upper left
        const ef = ((x + 0.5 - 14) / 11.2) ** 2 + ((y + 0.5 - 12.3) / 7.2) ** 2, eb = ((x + 0.5 - 14) / 10.2) ** 2 + ((y + 0.5 - 13.9) / 7) ** 2;
        if (ef > 1 && eb <= 1) lv(x, y, eb > 0.8 ? 2 : 1, true);
      }
      if (head === 'Radio Dish') for (let y = 5; y < 12; y++) for (let x = 2; x < 14; x++) { const ef = ((x + 0.5 - 14) / 11.2) ** 2 + ((y + 0.5 - 12.3) / 7.2) ** 2; if (ef <= 1 && ef > 0.78 && at(x, y) === 3) lv(x, y, 4, true); }
      if (body === 'Tall Collar') for (let y = 19; y < 25; y++) {
        // a stiff ribbed collar standing up round the jaw
        const hw = 6.4 + (y - 19) * 0.5;
        for (let x = 0; x < N; x++) { const dx = Math.abs(x + 0.5 - 14); if (dx <= hw) lv(x, y, dx > hw - 1 || y === 19 ? 3 : y % 2 ? 1 : 2, true); }
      }
      // eyes sit at a height that suits the head
      const ey = head === 'Tall Dome' ? 11 : head === 'Wide' ? 13 : head === 'Squid' ? 10 : head === 'Cone' ? 13 : head === 'Radio Dish' ? 10 : head === 'Grille Face' ? 10 : 12;
      const face = (x, y, k) => { const hw = halfWidth(y); if (hw >= 0 && Math.abs(x + 0.5 - 14) <= hw - 1) lv(x, y, k, true); };
      // markings
      if (mark === 'Spots' && head !== 'Brain Dome') for (const [x, y] of [[9, 6], [11, 4], [17, 5], [19, 7], [14, 3]]) if (at(x, y) >= 2 && at(x, y) < 4) { lv(x, y, 1, true); lv(x + 1, y, 1, true); }
      if (mark === 'Chevrons') for (let i = 0; i < 2; i++) for (let k = 0; k < 4; k++) { lv(13 - k, 5 + i * 2 + Math.floor(k / 2), 1, true); lv(14 + k, 5 + i * 2 + Math.floor(k / 2), 1, true); }
      if (mark === 'Third Gem') { if (paint) paint = 2; const g = Math.sin(t * 2) > 0 ? 4 : 3; lv(13, 7, g, true); lv(14, 7, g, true); lv(13, 6, 2, true); lv(14, 8, 2, true); lv(14, 6, 3, true); lv(13, 8, 3, true); if (paint) paint = 1; }
      if (mark === 'Circuit') { for (let x = 7; x < 12; x++) lv(x, 7, 3, true); for (let y = 4; y < 8; y++) lv(11, y, 3, true); lv(11, 4, 4, true); for (let x = 16; x < 21; x++) lv(x, 8, 3, true); lv(16, 8, 4, true); }
      // a sigil of its own, mirrored, glowing on the brow
      if (mark === 'Sigil' && head !== 'Brain Dome') for (let i = 0; i < 9; i++) if (sigil >> i & 1) { const col = i % 3, row = Math.floor(i / 3); face(11 + col, ey - 5 + row, 4); face(16 - col, ey - 5 + row, 4); }
      if (mark === 'Face Paint') for (const x of [8, 19]) for (let y = ey + 3; y < ey + 6; y++) face(x, y, 4);
      if (mark === 'Bands') for (const y of [top0 + 2, top0 + 4, top0 + 6]) { const hw = halfWidth(y); for (let x = 0; x < N; x++) { const dx = Math.abs(x + 0.5 - 14); if (dx > hw - 4 && dx < hw - 1 && dx >= gapAt(y) + 1) lv(x, y, 1, true); } }
      if (mark === 'Freckles') for (const [x, y] of [[8, 3], [10, 4], [9, 5], [19, 3], [17, 4], [18, 5]]) face(x, ey + y, 1);
      // eyes (on a radio dish, each eye and the mouth is noted, to sit in a dark surround after)
      const dishFace = head === 'Radio Dish';
      if (dishFace) { featMask.fill(0); trk = featMask; }
      const blink = ((t + blinkAt) % blinkEvery) < 0.15;
      if (eyes === 'Almond') {
        const rows = [[8, 10], [7, 11], [8, 11], [10, 11]];
        rows.forEach(([x0, x1], r) => { for (let x = x0; x <= x1; x++) { face(x, ey + r, blink ? (r === 2 ? 3 : 2) : 0); face(27 - x, ey + r, blink ? (r === 2 ? 3 : 2) : 0); } });
        if (!blink) { face(8, ey + 1, 4); face(19, ey + 1, 4); }
      } else if (eyes === 'Three') {
        for (const x of [8, 13, 18]) { const yy = x === 13 ? ey - 2 : ey; for (let dy = 0; dy < 3; dy++) { face(x, yy + dy, blink ? (dy === 1 ? 3 : 2) : 0); face(x + 1, yy + dy, blink ? (dy === 1 ? 3 : 2) : 0); } if (!blink) face(x, yy, 4); }
      } else if (eyes === 'Cyclops') {
        for (let y = ey - 2; y < ey + 3; y++) for (let x = 10; x < 18; x++) { const e = ((x + 0.5 - 14) / 4) ** 2 + ((y + 0.5 - ey - 0.5) / 2.6) ** 2; if (e <= 1) lv(x, y, blink ? (y === ey ? 3 : 2) : (e > 0.7 ? 3 : 0), true); }
        if (!blink) { const gx = 13 + Math.round(Math.sin(t * gazeSpeed * 3) * 2); lv(gx, ey, 4, true); lv(gx + 1, ey, 4, true); lv(gx, ey - 1, 3, true); lv(gx + 1, ey - 1, 2, true); }
      } else if (eyes === 'Five') {
        for (const [x, y] of [[8, ey + 1], [19, ey + 1], [10, ey - 1], [17, ey - 1], [13, ey - 2], [14, ey - 2]]) lv(x, y, blink ? 3 : 4, true);
        for (const [x, y] of [[8, ey + 2], [19, ey + 2], [10, ey], [17, ey]]) lv(x, y, blink ? 2 : 0, true);
      } else if (eyes === 'Stalks') {
        const sway = Math.round(Math.sin(t * 0.9));
        for (const side of [-1, 1]) {
          const bx = side < 0 ? 11 : 16;
          const topY = topAt(bx);
          for (let k = 1; k < 5; k++) lv(bx + side * Math.floor(k / 2) + (k > 2 ? sway : 0), topY - k, 3, true);
          const ex = bx + side * 2 + sway, eyy = topY - 6;
          for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) lv(ex + dx - (side < 0 ? 1 : 0), eyy + dy, blink ? 2 : (dx === dy ? 4 : 0), true);
        }
      } else if (eyes === 'Visor') {
        for (let x = 5; x < 23; x++) for (let y = ey; y < ey + 3; y++) if (Math.abs(x + 0.5 - 14) <= halfWidth(y) - 1) lv(x, y, y === ey + 1 ? 0 : 3, true);
        const sx = 6 + Math.floor((t * 6) % 16);
        lv(sx, ey + 1, 4, true); lv(sx + 1, ey + 1, 2, true);
      } else if (eyes === 'Compound') {
        for (const cx of [9.5, 18.5]) for (let y = ey - 2; y < ey + 4; y++) for (let x = Math.floor(cx - 4); x < cx + 4; x++) {
          const e = ((x + 0.5 - cx) / 3.2) ** 2 + ((y + 0.5 - ey - 0.7) / 2.6) ** 2;
          if (e <= 1) lv(x, y, blink ? (y === ey + 1 ? 3 : 2) : e > 0.72 ? 3 : (x + y) % 2 ? 0 : 1, true);
        }
        if (!blink) { lv(8, ey - 1, 4, true); lv(17, ey - 1, 4, true); }
      } else if (eyes === 'Hypno') {
        const RING = [[-1, -2], [0, -2], [1, -2], [2, -1], [2, 0], [2, 1], [1, 2], [0, 2], [-1, 2], [-2, 1], [-2, 0], [-2, -1]];
        const spin = Math.floor(t * 8);
        for (const [cx, dir] of [[9, 1], [18, -1]]) {
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) lv(cx + dx, ey + dy, blink ? 2 : dx || dy ? 0 : 4, true);
          RING.forEach(([dx, dy], i) => lv(cx + dx, ey + dy, blink ? (dy === 0 ? 4 : 2) : ((((i - spin * dir) % 12) + 12) % 12) < 3 ? 0 : 4, true));
        }
      } else if (eyes === 'Lidded') {
        for (const cx of [9, 17]) { for (let x = cx; x < cx + 3; x++) { face(x, ey, 3); face(x, ey + 1, blink ? 3 : 0); } face(cx - 1, ey + 1, 3); face(cx + 3, ey + 1, 2); if (!blink) face(cx + 1, ey + 1, 4); }
      } else if (eyes === 'Crown of Seven') {
        for (let i = 0; i < 7; i++) {
          const an = Math.PI * (1.12 + i * 0.1267), x = Math.floor(14 + Math.cos(an) * 7), y = Math.round(ey + 3 + Math.sin(an) * 6);
          const shut = ((t + blinkAt + i * 0.19) % blinkEvery) < 0.15;
          face(x, y, shut ? 3 : 4); face(x, y + 1, shut ? 2 : 0);
        }
      } else if (eyes === 'Oscilloscope') {
        // two round scope screens, each with a green trace running across it (it jumps when it talks)
        const amp = talking(t) ? 2 : 1.3;
        for (const [cx, ph] of [[9.5, 0], [18.5, 1.7]]) {
          for (let y = ey - 3; y < ey + 4; y++) for (let x = Math.floor(cx - 3.5); x < cx + 3.5; x++) {
            const e = ((x + 0.5 - cx) / 3.3) ** 2 + ((y - ey) / 3.1) ** 2;
            if (e <= 1) lv(x, y, e > 0.62 ? 3 : blink ? 2 : 0, true);
          }
          if (!blink) { let py = null; for (let x = Math.floor(cx - 2.5); x < cx + 2.5; x++) { const yy = ey + Math.round(Math.sin(x * 0.95 + t * 5 + ph) * amp); lv(x, yy, 4, true); if (py !== null && Math.abs(yy - py) > 1) lv(x, (yy + py) >> 1, 4, true); py = yy; } }
        }
      }
      // mouth
      const my = head === 'Squid' ? 14 : head === 'Wide' || head === 'Ringed' || head === 'Grille Face' ? 17 : head === 'Radio Dish' ? 16 : 18;
      const talk = talking(t);
      if (mouth === 'Waveform') {
        // the signal itself: a flat line with a blip at rest, a live waveform while it beeps
        for (let x = 10; x < 18; x++) {
          if (talk) { const w = Math.round(Math.sin(x * 1.4 - t * 16) * 1.4); lv(x, my + w, 4, true); if (w) lv(x, my, 2, true); }
          else lv(x, my, 2, true);
        }
        if (!talk) { const bx = 10 + Math.floor((t * 4) % 8); lv(bx, my - 1, 4, true); lv(bx, my, 4, true); }
      } else if (talk) { for (let x = 12; x < 16; x++) { lv(x, my - 1, x === 12 || x === 15 ? 3 : 4, true); lv(x, my, 4, true); lv(x, my + 1, x === 12 || x === 15 ? 3 : 4, true); } }
      else if (mouth === 'Slit') for (let x = 12; x < 16; x++) lv(x, my, 3, true);
      else if (mouth === 'Oh') { lv(13, my - 1, 3, true); lv(14, my - 1, 3, true); lv(12, my, 3, true); lv(15, my, 3, true); lv(13, my + 1, 3, true); lv(14, my + 1, 3, true); lv(13, my, 0, true); lv(14, my, 0, true); }
      else if (mouth === 'Teeth') for (let x = 11; x < 17; x++) lv(x, my - (x % 2), 3, true);
      else if (mouth === 'Feelers') { const w = Math.sin(t * 1.7) > 0 ? 1 : 0; lv(12, my, 3, true); lv(15, my, 3, true); lv(12 - w, my + 1, 3, true); lv(15 + w, my + 1, 3, true); lv(12, my + 2, 2, true); lv(15, my + 2, 2, true); }
      else if (mouth === 'Smile') { lv(11, my - 1, 3, true); lv(16, my - 1, 3, true); for (let x = 12; x < 16; x++) lv(x, my, 3, true); }
      else if (mouth === 'Beak') { for (let x = 11; x < 17; x++) lv(x, my - 1, 3, true); for (let x = 12; x < 16; x++) lv(x, my, x === 12 || x === 15 ? 3 : 4, true); lv(13, my + 1, 3, true); lv(14, my + 1, 3, true); }
      else if (mouth === 'Zipper') { for (let x = 10; x < 18; x++) { lv(x, my, 3, true); lv(x, my + (x % 2 ? 1 : -1), 1, true); } lv(17, my, 4, true); }
      else if (mouth === 'Grille') for (let x = 11; x < 17; x++) for (const dy of [-1, 1]) lv(x, my + dy, x % 2 ? 3 : 1, true);
      else if (mouth === 'Tendrils') for (const [x, len] of [[11, 3], [13, 4], [14, 4], [16, 3]]) for (let k = 0; k < len; k++) lv(x + Math.round(Math.sin(t * 1.4 + x + k * 0.6) * k * 0.3), my + k, k === len - 1 ? 2 : 3, true);
      if (dishFace) {
        trk = null;
        // a dark surround round every eye and the mouth, inside the bowl, so the face always shows
        const sur = [];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          if (featMask[y * N + x]) continue;
          const hx = x - fx, hy = y - fy;
          if (hy >= 20 || ((hx + 0.5 - 14) / 11.2) ** 2 + ((hy + 0.5 - 12.3) / 7.2) ** 2 > 0.7) continue;
          let near = false;
          for (let dy = -1; dy <= 1 && !near; dy++) for (let dx = -1; dx <= 1; dx++) { const qx = x + dx, qy = y + dy; if (qx >= 0 && qy >= 0 && qx < N && qy < N && featMask[qy * N + qx]) { near = true; break; } }
          if (near) sur.push(y * N + x);
        }
        for (const i of sur) { L[i] = 0; solid[i] = 1; }
        // the feed horn at the dish's heart, sticking out toward us with its shadow on the bowl
        lv(13, 12, 3, true); lv(14, 12, 3, true); lv(13, 13, 4, true); lv(14, 13, 4, true); lv(13, 14, 3, true); lv(14, 14, 2, true); lv(15, 14, 0, true); lv(15, 13, 0, true);
      }
      // accessories worn on the head and face
      if (accessory !== 'None') {
        const hwE = Math.max(3, halfWidth(ey + 1) < 0 ? 6 : halfWidth(ey + 1));
        if (accessory === 'Headset') {
          const x0 = Math.round(14 - hwE) - 1;
          lv(x0, ey, 4, true); lv(x0, ey + 1, 3, true); lv(x0, ey + 2, 3, true); lv(x0 + 1, ey - 1, 2, true);
          for (let k = 1; k < 6; k++) lv(Math.round(x0 + 1 + (11 - x0) * k / 6), Math.round(ey + 2 + (my - ey - 2) * k / 6), 2, true);
          lv(11, my, 4, true);
        } else if (accessory === 'Monocle') {
          for (const [dx, dy] of [[-1, -1], [0, -2], [1, -2], [2, -1], [2, 0], [2, 1], [1, 2], [0, 2], [-1, 1], [-1, 0]]) lv(18 + dx, ey + dy, 4, true);
          for (let k = 0; k < 6; k++) lv(20 + (k > 2 ? 1 : 0), ey + 2 + k, k % 2 ? 2 : 3, false);
        } else if (accessory === 'Earrings') {
          const sw = Math.round(Math.sin(t * 1.6) * 0.6), hw3 = halfWidth(ey + 3) < 0 ? hwE : halfWidth(ey + 3);
          for (const s of [-1, 1]) { const x = Math.round(14 + s * (hw3 + 0.5)) - (s > 0 ? 1 : 0); lv(x, ey + 3, 3, false); lv(x + sw, ey + 4, 2, false); lv(x + sw, ey + 5, 4, false); lv(x + sw, ey + 6, 3, false); }
        } else if (accessory === 'Cheek Gems') {
          for (const x of [9, 18]) { lv(x, my - 3, 4, true); lv(x, my - 4, 3, true); lv(x, my - 2, 3, true); lv(x - 1, my - 3, 2, true); lv(x + 1, my - 3, 2, true); }
        } else if (accessory === 'Goggles') {
          const gy = ey - 3;
          for (let x = 0; x < N; x++) if (Math.abs(x + 0.5 - 14) <= (halfWidth(gy) < 0 ? 0 : halfWidth(gy))) lv(x, gy, 2, true);
          for (const x0 of [9, 16]) for (let dy = -1; dy <= 1; dy++) for (let dx = 0; dx < 3; dx++) lv(x0 + dx, gy + dy, dy === 0 && dx === 1 ? (Math.sin(t * 2 + x0) > 0.6 ? 4 : 1) : 4, true);
        } else if (accessory === 'Scar') {
          for (let k = 0; k < 6; k++) lv(19 - k, ey - 3 + k + (k > 2 ? 1 : 0), 0, true);
          for (const k of [1, 3]) lv(19 - k + 1, ey - 3 + k, 1, true);
        } else if (accessory === 'Nose Stud') {
          lv(15, my - 3, 4, true); lv(16, my - 2, 2, true);
        }
      }
      // antennae
      let top = 0;
      for (let y = 0; y < N; y++) if (halfWidth(y) >= 0) { top = y; break; }
      const pulse = talk || Math.sin(t * 3) > 0 ? 4 : 2;
      if (antenna === 'Single') { for (let y = top - 3; y < top; y++) lv(14, y, 3, true); lv(14, top - 4, pulse, true); lv(13, top - 4, 2, true); lv(15, top - 4, 2, true); lv(14, top - 5, 2, true); }
      else if (antenna === 'Twin') for (const side of [-1, 1]) { for (let k = 1; k <= 3; k++) lv(14 + side * (2 + k), top + 2 - k, 3, true); lv(14 + side * 6, top - 2, pulse, true); }
      else if (antenna === 'Ear Fins') for (const side of [-1, 1]) for (let k = 0; k < 5; k++) for (let j = 0; j <= Math.min(k, 4 - k) + 1; j++) { const y = 8 + k, hw = halfWidth(y); lv(Math.round(14 + side * (hw + 0.5 + j)) - (side > 0 ? 1 : 0), y, j === Math.min(k, 4 - k) + 1 ? 3 : 1, true); }
      else if (antenna === 'Signal Rings') { lv(14, top - 1, 3, true); lv(13, top - 1, 3, true); for (let r = 0; r < 2; r++) { const rad = ((t * 2 + r * 2.5) % 5) + 1.5; for (let x = 6; x < 22; x++) { const dy = Math.sqrt(Math.max(0, rad * rad - (x + 0.5 - 14) ** 2)); if (dy > 0.6) lv(x, Math.round(top - 1 - dy), rad > 4.5 ? 1 : 2, false); } } }
      else if (antenna === 'Coil') { const tp = topAt(13); for (let k = 1; k <= 5; k++) { lv(k % 2 ? 12 : 15, tp - k, 3, true); lv(k % 2 ? 13 : 14, tp - k, 2, true); } lv(13, tp - 6, pulse, true); lv(14, tp - 6, pulse, true); }
      else if (antenna === 'Dish') { const tp = topAt(13); lv(13, tp - 1, 3, true); lv(13, tp - 2, 3, true); for (let x = 10; x < 17; x++) lv(x, tp - 3 - (x === 10 || x === 16 ? 1 : 0), x === 13 ? pulse : 3, true); lv(13, tp - 5, talk ? 4 : 1, false); }
      else if (antenna === 'Horns') for (const s of [-1, 1]) { const x0 = s < 0 ? 9 : 18, tp = topAt(x0); for (let k = 0; k < 5; k++) lv(x0 + s * Math.round(k * 0.6), tp - k, k === 4 ? 4 : 3, true); }
      else if (antenna === 'Bobbles') for (const [x, h] of [[9, 3], [13, 5], [14, 5], [18, 3]]) { const tp = topAt(x); for (let k = 1; k < h; k++) lv(x, tp - k, 2, true); lv(x, tp - h, (x === 13 || x === 14) ? pulse : 3, true); }
      else if (antenna === 'Halo') { const hy = top - 3 + Math.round(Math.sin(t * 1.2) * 0.6); for (let x = 9; x < 19; x++) { const dx = Math.abs(x + 0.5 - 14); if (dx < 3) { lv(x, hy - 1, 4, false); lv(x, hy + 1, 2, false); } else lv(x, hy, 4, false); } }
      // a ring like a small planet's, behind the head at the back and across it at the front
      if (head === 'Ringed') for (let y = 4; y < 14; y++) for (let x = 0; x < N; x++) {
        const e = ((x + 0.5 - 14) / 13.2) ** 2 + ((y + 0.5 - 8.6) / 2.3) ** 2;
        if (e < 0.74 || e > 1) continue;
        if (y + 0.5 > 8.6) lv(x, y, Math.abs(x + 0.5 - 14) < 9 ? 4 : 3, true);
        else if (!isSolid(x, y)) lv(x, y, 2, false);
      }
      if (head === 'Envoy') {
        // a crown of crystal spires over a jewelled band, and a halo of its own script turning round its head
        paint = 2;
        for (let x = 0; x < N; x++) if (Math.abs(x + 0.5 - 14) <= halfWidth(8)) { lv(x, 8, x % 2 ? 4 : 2, true); lv(x, 9, x % 4 === 1 ? 4 : 1, true); }
        for (const [x, h] of [[8, 5], [10, 7], [13, 9], [14, 9], [17, 7], [19, 5]]) for (let k = 1; k <= h; k++) lv(x, 8 - k, k === h ? (Math.sin(t * 2 + x) > 0.3 || envoyHover ? 4 : 3) : (k === 1 ? 2 : 3), true);
        const spd = envoyHover || talk ? 0.9 : 0.22;
        for (let k = 0; k < 12; k++) {
          const an = t * spd + k * Math.PI / 6;
          const gx = Math.round(14 + Math.cos(an) * 12.4 - 1.5), gy = Math.round(11 + Math.sin(an) * 12.4 - 1.5);
          for (let i = 0; i < 9; i++) if (words[k] >> i & 1) {
            const x = gx + (i % 3), y = gy + Math.floor(i / 3);
            if (x < 0 || y < 0 || x >= N || y >= N || solid[y * N + x]) continue;
            lv(x, y, envoyHover || talk ? (k % 3 ? 3 : 4) : k % 3 ? 2 : 3, false);
          }
        }
      }
      // pets keep to the top corner of what is on screen (the right one when the visitor stands left)
      paint = 0; fx = vx0 + petX; fy = vy0;
      // a little pet keeps the visitor company in the top corner
      const bob = Math.round(Math.sin(t * 1.3) * 0.8);
      if (pet === 'Saucer') {
        const cx = 4 + Math.round(Math.sin(t * 0.5) * 1.2), cy = 3 + bob;
        glyph(['..333..', '4404044', '.22222.'], cx - 3, cy - 1, false);
        if ((t % 6) < 1.6) for (let k = 2; k < 8; k++) for (let x = cx - Math.floor(k / 2); x <= cx + Math.floor(k / 2); x++) if ((x + k) % 2) lv(x, cy + k, 1, false);
      }
      if (pet === 'Drone') { const cy = 4 + bob, f = Math.floor(t * 8) % 2; glyph(['.3.', '3' + (talk ? 4 : 1) + '3', '.3.'], 3, cy - 1, false); lv(1 + f, cy - 2, 2, false); lv(6 - f, cy - 2, 2, false); lv(2, cy - 2, 2, false); lv(5, cy - 2, 2, false); }
      if (pet === 'Blob') { const sq = ((t * 1.6) % 2) < 0.3; glyph(sq ? ['.3333.', '303303', '333333'] : ['..33..', '.3333.', '303303', '.3333.'], 1, sq ? 4 : 2 + bob, false); }
      if (pet === 'Mini Me') glyph(['..4..', '.333.', '33333', '30303', '.333.'], 2, 1 + bob, false);
      // the coveted pet: a tiny earthling in a space suit, floating on its tether and waving
      // it is the one thing on the screen in full colour: a white suit with orange trim, a blue visor
      // with a glint that sweeps across it, and a sparkle that twinkles round it
      if (pet === 'Earthling') {
        const wave = Math.floor(t * 2.2) % 2 || talk, x0 = 1, y0 = 1 + bob;
        for (let k = 0; k < 5; k++) lv(Math.max(0, x0 - 1 + Math.round(Math.sin(k * 0.9 + t) * 0.6)), y0 + 6 + k, k % 2 ? 1 : 2, false);
        const rows = (wave ? ['.kkkkk.o', 'kwwwwwkw', 'kwbbbwkw', 'kwbbbwkw', '.kwwwkwk', 'kowwwok.', 'kwwowwk.', '.kw.wk..', '.ko.ok..']
          : ['.kkkkk..', 'kwwwwwk.', 'kwbbbwk.', 'kwbbbwk.', '.kwwwk..', 'kowwwowk', 'kwwowwko', '.kw.wk..', '.ko.ok..']).map((r, j) => (j > 1 && j < 7 ? 'O' : '.') + r);
        const g = Math.floor(t * 1.5) % 5;
        rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { let ch = row[i]; if (ch === '.') continue; if (ch === 'b' && j === 2 + (g > 2 ? 1 : 0) && i === 3 + (g % 3)) ch = 'c'; tint(x0 + i, y0 + j, EARTH[ch]); } });
        const tw = Math.floor(t * 3) % 8;
        if (tw < 3 || talk) { const sx = x0 + 10, sy = y0 + 1 + (tw === 1 ? 1 : 0); tint(sx, sy, EARTH.y); if (tw === 1 || talk) { tint(sx - 1, sy, EARTH.s); tint(sx + 1, sy, EARTH.s); tint(sx, sy - 1, EARTH.s); tint(sx, sy + 1, EARTH.s); } }
      }
      // overlays printed over the picture by whoever is sending it
      fx = fy = 0;
      if (overlay === 'Subtitles') {
        const sy = vy0 + vn - 4;
        for (let y = sy; y < sy + 4; y++) for (let x = 0; x < N; x++) { L[y * N + x] = y === sy ? 1 : 0; RGB[y * N + x] = -1; }
        const s = Math.floor(t * 2.5);
        for (let g = 0; g < 12; g++) { const gx = ((g * 4 - s) % 48 + 48) % 48 + 1; if (gx > vn - 4) continue; for (let i = 0; i < 9; i++) if (words[g] >> i & 1) lv(vx0 + gx + (i % 3), sy + 1 + Math.floor(i / 3), 3); }
      }
      if (overlay === 'Viewfinder') for (const [cx, cy, sx, sy] of [[1, 1, 1, 1], [26, 1, -1, 1], [1, 26, 1, -1], [26, 26, -1, -1]]) for (let k = 0; k < 3; k++) { ov(cx + sx * k, cy, 3); ov(cx, cy + sy * k, 3); }
      if (overlay === 'Frame Counter') for (let i = 0; i < 8; i++) { ov(2 + i, 25, (Math.floor(t * 8) >> i) & 1 ? 3 : 1); ov(2 + i, 26, i === 0 || i === 7 ? 1 : 0); }
      if (overlay === 'Crosshair') { for (const k of [2, 3, 4, 5, 22, 23, 24, 25]) { ov(14, k, 2); ov(k, 13, 2); } ov(14, 13, Math.sin(t * 3) > 0 ? 3 : 1); }
      if (pet === 'Moonlet') {
        // a little ringed moon circling the corner
        fx = vx0 + petX; fy = vy0;
        const a = t * 0.6, mx = 4 + Math.round(Math.cos(a) * 1.6), myy = 4 + Math.round(Math.sin(a) * 1.2);
        glyph(['.33.', '3443', '3433', '.33.'], mx - 2, myy - 2, false);
        for (const dx of [-3, -2, 2, 3]) lv(mx + dx, myy + (dx < 0 ? 1 : 0), 2, false);
        fx = fy = 0;
      }
      if (overlay === 'Signal Bars') { const strength = talk ? 4 : 2 + Math.round(Math.sin(t * 0.5) * 1.4); for (let i = 0; i < 4; i++) for (let h = 0; h <= i; h++) ov(22 + i, 4 - h, i < strength ? 3 : 1); }
      if (head === 'Envoy' && t < speakEnd) {
        // what the envoy says, typed in its script along the bottom of the screen
        for (let y = 23; y < N; y++) for (let x = 0; x < N; x++) { L[y * N + x] = y === 23 ? 1 : 0; own[y * N + x] = 1; }
        paint = 2;
        const shown = Math.min(speech.length, 1 + Math.floor((t - speakStart) / 0.42));
        for (let j = 0; j < shown; j++) { const gx = 2 + j * 4 + (6 - speech.length) * 2; for (let i = 0; i < 9; i++) if (speech[j] >> i & 1) lv(gx + (i % 3), 24 + Math.floor(i / 3), j === shown - 1 ? 4 : 3); }
        paint = 0;
      }
      if (overlay === 'Recording') { const on = (t % 1.2) < 0.7; for (const [x, y] of [[23, 2], [24, 2], [23, 3], [24, 3]]) ov(x, y, on ? 4 : 1); for (let i = 0; i < 9; i++) if (words[5] >> i & 1) ov(18 + (i % 3), 2 + Math.floor(i / 3), 2); }
      // the envoy alone is in colour: royal purple, with its crown, script and gem in gold
      if (head === 'Envoy') for (let i = 0; i < N * N; i++) if (own[i]) RGB[i] = (own[i] === 2 ? GOLD : PURP)[L[i]];
    }

    // where the picture sits: the whole square, or the glass of a monitor in its housing
    const BEZ = { 'Beige CRT': ['#d9cfb5', '#b4a786', '#efe8d6', '#7c7058'], 'Black Bezel': ['#2c2c31', '#141416', '#4a4a52', '#08080a'], 'Army Green': ['#5d6849', '#424b33', '#7d8964', '#2a3020'], Woodgrain: ['#80502c', '#5a3418', '#a26e42', '#341c0c'], Chrome: ['#c6cbd4', '#848a94', '#f4f6fa', '#50555e'],
      'Red Plastic': ['#c43a32', '#8e2420', '#e86a5a', '#5a1410'], 'Mint Plastic': ['#9cd8c0', '#6aa890', '#c8f0e0', '#3a6a5a'], Gunmetal: ['#4a5058', '#30353c', '#6a727c', '#1a1d22'] }[bezel];
    // the glass fills the square, or about 88% of it inside a thin monitor rim; cells stay whole numbers of
    // pixels when they are big enough to see, and stretch to fill the tile when they are not
    let cell, G, ox, oy;
    const span = BEZ ? S * 0.88 : S;
    cell = span / vn >= 8 ? Math.floor(span / vn) : span / vn; G = cell * vn;
    ox = Math.round((S - G) / 2); oy = BEZ ? Math.round((S - G) * 0.36) : Math.round((S - G) / 2);
    let shell = null, ledX = 0, ledY = 0;
    if (BEZ) {
      shell = document.createElement('canvas');
      shell.width = shell.height = S;
      const g = shell.getContext('2d');
      const body = g.createLinearGradient(0, 0, 0, S);
      body.addColorStop(0, BEZ[2]); body.addColorStop(0.45, BEZ[0]); body.addColorStop(1, BEZ[1]);
      g.fillStyle = body; g.fillRect(0, 0, S, S);
      if (bezel === 'Woodgrain') {
        g.strokeStyle = 'rgba(40,18,6,0.32)'; g.lineWidth = Math.max(1, S / 380);
        for (let i = 0; i < 26; i++) { const y0 = (i + 0.5) / 26 * S; g.beginPath(); for (let x = 0; x <= S; x += S / 40) g.lineTo(x, y0 + Math.sin(x / S * 9 + i * 1.7) * S * 0.008 + Math.sin(x / S * 23 + i) * S * 0.003); g.stroke(); }
      }
      if (bezel === 'Chrome') for (let i = 0; i < 5; i++) { g.fillStyle = `rgba(255,255,255,${0.1 + 0.06 * (i % 2)})`; g.fillRect(0, S * (0.08 + i * 0.2), S, S * 0.035); }
      const pad = Math.max(1, S * 0.008), rad = S * 0.05, hx = ox - pad, hy = oy - pad, hs = G + pad * 2, bev = S * 0.012;
      const round = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      round(hx - bev, hy - bev, hs + bev * 2, hs + bev * 2, rad + bev);
      const lip = g.createLinearGradient(0, hy - bev, 0, hy + hs + bev);
      lip.addColorStop(0, BEZ[3]); lip.addColorStop(1, BEZ[2]);
      g.fillStyle = lip; g.fill();
      round(hx, hy, hs, hs, rad);
      g.globalCompositeOperation = 'destination-out'; g.fill(); g.globalCompositeOperation = 'source-over';
      // two knobs on the chin
      const chin = (hy + hs + bev + S) / 2;
      for (const kx of [0.7, 0.78]) { g.beginPath(); g.arc(S * kx, chin, S * 0.014, 0, 6.3); g.fillStyle = BEZ[3]; g.fill(); g.beginPath(); g.arc(S * kx - S * 0.0025, chin - S * 0.0025, S * 0.01, 0, 6.3); g.fillStyle = BEZ[2]; g.fill(); }
      g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = S * 0.012; g.strokeRect(0, 0, S, S);
      ledX = S * 0.86; ledY = chin;
      // (no vent strip: just the rim, the knobs and the power light)
    }

    // paint: crisp cells, then a soft glow, then scanlines
    const ctx = c.ctx;
    const small = document.createElement('canvas');
    small.width = small.height = N;
    const sctx = small.getContext('2d');
    const img = sctx.createImageData(N, N);
    const scan = cell >= 4 ? Math.max(1, Math.round(cell * 0.28)) : 0;
    const bg = levelRgb[0];
    // the viewer's signal: replies in beeps on a scale keyed from the hash's tail, and a detuning drag
    const toneRoot = 62 + parseInt(c.hash.slice(-9, -7), 16) % 9;
    const SCALE = phosphor === 'Red Alert' ? [0, 1, 5, 6, 10] : phosphor === 'Thermal' ? [0, 2, 3, 7, 8] : [0, 3, 5, 7, 10];
    const tone = k => toneRoot + 12 * Math.floor(k / 5) + SCALE[((k % 5) + 5) % 5];
    let beeps = [], seq = (parseInt(c.hash.slice(-12, -9), 16) | 1) >>> 0, tuneAt = -1, tune = 0, wasDown = false, lastT = 0;
    const seqRand = () => { seq = (Math.imul(seq, 1103515245) + 12345) >>> 0; return (seq >>> 8) / 16777216; };
    // the legendaries' own state: what the envoy is saying, which feed of the hive is under the pointer
    let speech = [], speakStart = -9, speakEnd = -9, envoyHover = false, wasIn = false, hoverTile = -1, curTile = -1, nowT = 0;
    const tileBeeps = [[], [], [], [], [], [], [], [], []];
    function talking(t) {
      if (curTile >= 0) { for (const b of tileBeeps[curTile]) if (nowT >= b[0] && nowT < b[0] + b[1]) return true; return false; }
      for (const b of beeps) if (t >= b[0] && t < b[0] + b[1]) return true; return false;
    }
    const voice = pet === 'Mini Me' || eyes === 'Crown of Seven' ? 'triangle' : 'square';
    function feel(t) {
      const inp = c.input, dt = Math.min(0.1, Math.max(0, t - lastT));
      lastT = t;
      beeps = beeps.filter(b => b[0] + b[1] > t);
      if (legend === 'Hive') return feelHive(t, dt);
      if (legend === 'The Envoy') return feelEnvoy(t, dt);
      for (const p of inp.taps()) {
        if (beeps.length) continue;
        // a little pause, then 3 to 6 beeps of mixed lengths
        c.sound.hit('click', 0.25);
        let at = 0.35;
        const n = 3 + Math.floor(seqRand() * 4);
        for (let i = 0; i < n; i++) {
          const len = seqRand() < 0.35 ? 0.24 : 0.09;
          beeps.push([t + at, len]);
          c.sound.note(tone(Math.floor(seqRand() * 7)), { dur: len, vel: 0.18, wave: voice, cutoff: 1800, at, pan: (p.x - 0.5) * 0.4 });
          at += len + 0.07;
        }
        // the pet chirps after its owner
        if (pet === 'Earthling') { c.sound.note(tone(5) + 12, { dur: 0.12, vel: 0.08, wave: 'sine', at: at + 0.15 }); c.sound.note(tone(7) + 12, { dur: 0.22, vel: 0.07, wave: 'sine', at: at + 0.3 }); }
        else if (pet !== 'None') c.sound.note(tone(9), { dur: 0.08, vel: 0.08, wave: 'triangle', cutoff: 2400, at: at + 0.12 });
      }
      const hold = inp.inside && inp.down;
      if (hold && !wasDown) c.sound.hit('noise', 0.14, { cutoff: 2600, dur: 0.3 });
      wasDown = hold;
      if (hold) tuneAt = (inp.y * S - oy) / G;
      tune = hold ? Math.min(1, tune + dt * 3) : Math.max(0, tune - dt * 2.5);
    }
    // detuning: rows near the pointer slide sideways and fill with static
    function detune(t) {
      const cy = vy0 + tuneAt * vn, f = Math.floor(t * 15);
      const row = new Uint8Array(N), rowC = new Int32Array(N);
      for (let y = 0; y < N; y++) {
        const k = tune * Math.max(0, 1 - Math.abs(y + 0.5 - cy) / 7);
        if (k <= 0.02) continue;
        const sh = Math.round(Math.sin(y * 1.7 + t * 9) * 6 * k + (noise(y, 1, f) - 0.5) * 4 * k);
        for (let x = 0; x < N; x++) { const j = y * N + (((x - sh) % N) + N) % N; row[x] = L[j]; rowC[x] = RGB[j]; }
        for (let x = 0; x < N; x++) { const st = noise(x, y, f) < 0.18 * k; L[y * N + x] = st ? (noise(y, x, f + 1) > 0.5 ? 2 : 1) : row[x]; RGB[y * N + x] = st ? -1 : rowC[x]; }
      }
    }
    // ---------- the legendaries: one-of-ones of their own ----------
    // The Hive: a honeycomb of hexagonal screens in honey light, this mint's own visitor in the middle in its own
    // phosphor, the others round it in amber; a signal pulses out along the wax between them
    const HG = 84, Rh = 14.6;
    const SLOTS = [[42, 42, 4], [12, 42, 3], [72, 42, 5], [27, 16.5, 0], [57, 16.5, 1], [27, 67.5, 6], [57, 67.5, 2], [-3, 16.5, 7], [87, 67.5, 8],
      [87, 16.5, -1], [-3, 67.5, -1], [12, -9, -1], [42, -9, -1], [72, -9, -1], [12, 93, -1], [42, 93, -1], [72, 93, -1]];
    const HONEY = [[16, 8, 2], [92, 50, 8], [182, 104, 20], [255, 176, 44], [255, 236, 168]];
    // which hex screen a cell of the honeycomb belongs to (or -1 for the wax), and how far inside it is
    const hexAt = (x, y) => { for (let s = 0; s < SLOTS.length; s++) { const dx = Math.abs(x + 0.5 - SLOTS[s][0]), dy = Math.abs(y + 0.5 - SLOTS[s][1]); const e = Math.max(dx / (Rh * 0.866), (dy + dx * 0.5774) / Rh); if (e <= 1) return [s, e]; } return [-1, 9]; };
    let hexMap = null, hexE = null;
    const slotOfTile = i => SLOTS.findIndex(s => s[2] === i);
    const levelsOf = ph => {
      const bs = PHOS[ph] || PHOS.Green;
      if (ph === 'Duotone') return [[10, 4, 20], [104, 28, 118], [214, 68, 168], [92, 196, 255], [206, 246, 255]];
      if (ph === 'Thermal') return [[6, 4, 16], [72, 16, 112], [204, 38, 80], [255, 160, 30], [255, 248, 196]];
      return [0, 0.26, 0.52, 0.84, 1].map((f, i) => i === 4 ? bs.map(v => Math.round(v + (255 - v) * 0.55)) : bs.map(v => Math.round(v * f + (i === 0 ? 6 : 0))));
    };
    let hiveCan = null, hctx = null, hiveImg = null, hiveF = 0;
    const tileL = [];
    if (legend === 'Hive') {
      for (let i = 0; i < 9; i++) tileL.push(null);
      for (const tl of tiles) tl.lv = HONEY;
      tiles[4].lv = levelsOf(tiles[4].ph);
      hiveCan = document.createElement('canvas'); hiveCan.width = hiveCan.height = HG;
      hctx = hiveCan.getContext('2d'); hiveImg = hctx.createImageData(HG, HG);
      hexMap = new Int8Array(HG * HG); hexE = new Float32Array(HG * HG);
      for (let y = 0; y < HG; y++) for (let x = 0; x < HG; x++) { const [s, e] = hexAt(x, y); hexMap[y * HG + x] = s; hexE[y * HG + x] = e; }
    }
    function renderHive(t) {
      nowT = t;
      const dd = hiveImg.data, keep = [head, eyes, antenna, mouth, mark, suit, feed];
      const pulseR = ((t - chordAt < 2 ? (t - chordAt) * 30 : t * 9) % 60), tick = Math.floor(t * 8);
      const playing = t - playT0 < playSeq.length * 0.24 + 0.3, step = Math.floor((t - playT0) / 0.24);
      const hotSet = new Set([hoverTile]), pathSet = new Set(drawing ? hPath : playing ? playSeq : []);
      if (playing && step >= 0 && step < playSeq.length) hotSet.add(SLOTS[playSeq[step]][2]);
      if (t - chordAt < 0.6) for (let i = 0; i < 9; i++) hotSet.add(i);
      // the wax first: dark, lit honey near each screen's edge, a signal pulse running out from the middle
      for (let i = 0; i < HG * HG; i++) {
        const x = i % HG, y = (i - x) / HG, s = hexMap[i];
        let col;
        if (s < 0) {
          const r = Math.hypot(x + 0.5 - 42, y + 0.5 - 42);
          col = Math.abs(r - pulseR) < 1.6 ? [255, 210, 90] : Math.abs(r - pulseR + 3) < 1.6 ? [150, 92, 20] : (x + y) % 5 === 0 ? [26, 14, 3] : [12, 7, 2];
        } else if (SLOTS[s][2] < 0) col = (x * 7 + y * 13 + tick) % 23 === 0 ? HONEY[2] : hexE[i] > 0.88 ? HONEY[1] : [36, 20, 4];
        else continue;
        dd[i * 4] = col[0]; dd[i * 4 + 1] = col[1]; dd[i * 4 + 2] = col[2]; dd[i * 4 + 3] = 255;
      }
      // then each screen's visitor, all blinking together
      for (let i = 0; i < 9; i++) {
        const T = tiles[i], si = slotOfTile(i), [cx, cy] = SLOTS[si];
        // (the queen redraws every frame; her drones take turns, a third of them a frame)
        if (i === 4 || !tileL[i] || (hiveF + i) % 3 === 0) {
          [head, eyes, antenna, mouth, mark, suit, feed] = T.v; curTile = i;
          compose(t + (i === 4 ? 0 : 0.05 * i));
          tileL[i] = L.slice();
        }
        const TL = tileL[i];
        const hot = hotSet.has(i), onPath = pathSet.has(si), bx = Math.round(cx - 14), by = Math.round(cy - 14);
        for (let y = Math.floor(cy - Rh); y <= cy + Rh; y++) for (let x = Math.floor(cx - Rh); x <= cx + Rh; x++) {
          if (x < 0 || y < 0 || x >= HG || y >= HG) continue;
          const j = y * HG + x;
          if (hexMap[j] !== si) continue;
          const lx = x - bx, ly = y - by;
          let k = lx >= 0 && ly >= 0 && lx < N && ly < N ? TL[ly * N + lx] : 0;
          if (hot && k) k = Math.min(4, k + 1);
          const rim = hexE[j] > (i === 4 ? 0.86 : 0.92);
          const col = rim ? (hot || onPath ? T.lv[4] : i === 4 ? (Math.sin(t * 3) > 0 ? T.lv[4] : T.lv[3]) : T.lv[2]) : T.lv[k];
          dd[j * 4] = col[0]; dd[j * 4 + 1] = col[1]; dd[j * 4 + 2] = col[2]; dd[j * 4 + 3] = 255;
        }
      }
      [head, eyes, antenna, mouth, mark, suit, feed] = keep; curTile = -1; hiveF++;
      // the path you drew between the cells, and the signal running along it
      const seq = drawing ? hPath : playing ? playSeq : [];
      const plot = (x, y, col) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < HG && y < HG) { const j = (y * HG + x) * 4; dd[j] = col[0]; dd[j + 1] = col[1]; dd[j + 2] = col[2]; } };
      for (let k = 0; k + 1 < seq.length; k++) {
        const [x0, y0] = SLOTS[seq[k]], [x1, y1] = SLOTS[seq[k + 1]], n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
        for (let q = 0; q <= n; q += 2) plot(x0 + (x1 - x0) * q / n, y0 + (y1 - y0) * q / n, playing && k < step ? [120, 80, 20] : [255, 220, 120]);
        if (playing && k === step) { const a2 = ((t - playT0) / 0.24) % 1; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) plot(x0 + (x1 - x0) * a2 + dx, y0 + (y1 - y0) * a2 + dy, [255, 250, 220]); }
      }
      hctx.putImageData(hiveImg, 0, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0a0602'; ctx.fillRect(0, 0, S, S);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(hiveCan, ox, oy, G, G);
      ctx.globalCompositeOperation = 'lighter'; ctx.imageSmoothingEnabled = true;
      ctx.globalAlpha = 0.3; ctx.drawImage(hiveCan, ox - G / 168, oy - G / 168, G + G / 84, G + G / 84);
      ctx.globalAlpha = 0.05; ctx.fillStyle = '#ffd890'; ctx.fillRect(0, oy + ((t * 0.12) % 1.3 - 0.15) * G, S, G * 0.1);
      ctx.globalCompositeOperation = 'source-over';
      const hc = G / HG;
      if (hc >= 3) { ctx.globalAlpha = 0.35; ctx.fillStyle = '#000'; for (let y = 0; y < HG; y++) ctx.fillRect(0, oy + y * hc + hc * 0.7, S, hc * 0.3); }
      ctx.globalAlpha = 1;
      const vg = ctx.createRadialGradient(S / 2, S / 2, G * 0.38, S / 2, S / 2, G * 0.78);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, S + 1, S + 1);
    }

    // ---------- the legendaries' toys ----------
    // The Hive: draw a path across the cells and let go, and the signal runs it, each drone singing its own note in
    // turn (so every path is a little tune); tap the queen and the whole hive sings at once; tap a drone and it calls
    // and the hive answers
    let hPath = [], drawing = false, playT0 = -99, playSeq = [], chordAt = -9, hDown = false, hPressT = -9;
    function feelHive(t, dt) {
      const inp = c.input;
      const slotAt = (x, y) => { const hx = Math.floor((x * S - ox) / G * HG), hy = Math.floor((y * S - oy) / G * HG); if (hx < 0 || hy < 0 || hx >= HG || hy >= HG) return -1; const sl = hexMap[hy * HG + hx]; return sl >= 0 && SLOTS[sl][2] >= 0 ? sl : -1; };
      const hs = inp.inside ? slotAt(inp.x, inp.y) : -1, ht = hs >= 0 ? SLOTS[hs][2] : -1;
      if (ht >= 0 && ht !== hoverTile && !drawing) c.sound.note(tone(ht + 2), { dur: 0.06, vel: 0.05, wave: 'sine' });
      hoverTile = ht;
      for (let i = 0; i < 9; i++) tileBeeps[i] = tileBeeps[i].filter(b => b[0] + b[1] > t);
      inp.taps();
      const down = inp.inside && inp.down, pressed = down && !hDown, released = !down && hDown;
      if (pressed) { hPath = hs >= 0 ? [hs] : []; drawing = true; hPressT = t; }
      if (drawing && down && hs >= 0 && hPath[hPath.length - 1] !== hs && hPath.length < 16) { hPath.push(hs); c.sound.note(tone(ht + 2), { dur: 0.08, vel: 0.07, wave: 'square', cutoff: 1800 }); }
      if (released && drawing) {
        drawing = false;
        if (hPath.length >= 2) {
          playT0 = t + 0.15; playSeq = hPath.slice();
          playSeq.forEach((sl, k) => { const i = SLOTS[sl][2]; tileBeeps[i].push([playT0 + k * 0.24, 0.2]); c.sound.note(tone(i + 3), { dur: 0.2, vel: 0.13, wave: 'square', cutoff: 1700, at: 0.15 + k * 0.24, pan: (SLOTS[sl][0] / 84 - 0.5) * 0.8 }); });
        } else if (hPath.length === 1 && t - hPressT < 0.4) {
          const i = SLOTS[hPath[0]][2];
          if (i === 4) {
            // the queen: every drone sings at once, a ring of light runs out through the wax
            chordAt = t;
            for (let j = 0; j < 9; j++) { tileBeeps[j].push([t + 0.05, 0.5]); c.sound.note(tone([0, 2, 4, 7, 9, 11, 12, 14, 16][j]), { dur: 0.6, vel: 0.06, wave: 'triangle', cutoff: 2200, at: 0.05 }); }
          } else if (!tileBeeps[i].length) {
            c.sound.hit('click', 0.2);
            let at = 0.3;
            for (let k = 0; k < 3; k++) { const len = k === 2 ? 0.22 : 0.09; tileBeeps[i].push([t + at, len]); c.sound.note(tone(i + [0, 2, 4][k]), { dur: len, vel: 0.15, wave: 'square', cutoff: 1600, at }); at += len + 0.07; }
            const si = SLOTS[slotOfTile(i)];
            for (let j = 0; j < 9; j++) if (j !== i) { const sj = SLOTS[slotOfTile(j)], d2 = Math.hypot(sj[0] - si[0], sj[1] - si[1]) / 30, a2 = at + 0.15 + d2 * 0.22; tileBeeps[j].push([t + a2, 0.12]); c.sound.note(tone(j + 1), { dur: 0.12, vel: 0.07, wave: 'triangle', cutoff: 2200, at: a2 }); }
          }
        }
        hPath = [];
      }
      hDown = down;
    }
    // ===== The Envoy (redesign): a holographic foil trading card, on its own 56-dot grid. Its name on a silver bar, a
    // rarity star, the crowned envoy stamped in flat foil shapes in the art box over its own Feed, its skin
    // enamelled in its Phosphor, its card border in its Monitor's colour, and a foil that throws rainbow bands
    // across the card as your pointer moves. Hold and drag round its head to turn its script halo: it ratchets a
    // click at a time, and when you let go it spins on and settles on a click; land its jewel near the arrow at the
    // art box's edge and it ticks home and the card wakes: the foil blazes, beams burst from its eyes, its crown
    // flares out of the box and its words scroll along the foot of the card. A short, still tap: it blinks and
    // says a word
    const QE = 56, HX = 28, HY = 27, HR = 16, SLOT = Math.PI * 2 / 12;
    const ceE = Math.max(1, Math.floor(S / QE)), oeE = Math.floor((S - ceE * QE) / 2), ME = Math.ceil(oeE / ceE) + 1, GEe = QE + 2 * ME;
    let eCan = null, eCtx = null, eImg = null, eBuf = null, eCls = null;
    if (legend === 'The Envoy') { eCan = document.createElement('canvas'); eCan.width = eCan.height = GEe; eCtx = eCan.getContext('2d'); eImg = eCtx.createImageData(GEe, GEe); eBuf = new Uint32Array(eImg.data.buffer); eCls = new Int8Array(GEe * GEe); }
    const eRGB = a => (255 << 24) | (Math.round(a[2]) << 16) | (Math.round(a[1]) << 8) | Math.round(a[0]);
    const eArr = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)], eHex = h => eRGB(eArr(h));
    const eMix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
    const HOLO = ['#ff8ab8', '#ffc878', '#e8ff8a', '#8affc8', '#7ad8ff', '#a89aff', '#f08aff'].map(eArr), SILVER = eArr('#c4c8d4'), DARKC = eHex('#14121c'), INKC = eHex('#1c1a2c');
    const PHA = levelRgb, PH = PHA.map(eRGB), GOLDC = ['#9a6a18', '#e0a830', '#ffe080', '#ffffff'].map(eHex);
    const BAND = { Chrome: '#d8dce6', 'Beige CRT': '#d8c8a0', Woodgrain: '#7a4a28', 'Black Bezel': '#2a2a32', 'Army Green': '#55663a', Gunmetal: '#4a5260', 'Red Plastic': '#c02c26', 'Monitor Wall': '#3a3a44' }[bezel];
    const BANDA = BAND ? eArr(BAND) : null;
    let haloA = 0, haloV = 0, eDownE = false, ePress = -9, eX0 = 0, eY0 = 0, eMoved = 0, grabA = null, wokeAt = -9, blinkE = -9, sheen = 0, eHover = false, eHx = 28, eHy = 28, settled = true, homing = false, lastSlot = 0;
    const keyAt = SLOT * (3 + parseInt(c.hash.slice(-6, -3), 16) % 7);
    const jewelOff = () => { let o = ((haloA + keyAt - Math.PI / 2) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI; return o; };
    function speak(t, pan) {
      speech = [];
      const n = 4 + Math.floor(seqRand() * 3);
      let at = 0.25;
      speakStart = t + at;
      for (let j = 0; j < n; j++) {
        speech.push(1 + Math.floor(seqRand() * 511));
        const syl = 1 + Math.floor(seqRand() * 2);
        for (let s2 = 0; s2 < syl; s2++) {
          const last = j === n - 1 && s2 === syl - 1, len = last ? 0.4 : 0.14, step = last ? 0 : Math.round(3 + Math.sin(j * 1.3 + s2) * 2.5 + (seqRand() - 0.5) * 2);
          beeps.push([t + at, len]);
          c.sound.note(tone(step), { dur: len, vel: 0.13, wave: 'triangle', cutoff: 1500, at, pan });
          at += len + 0.04;
        }
        at += 0.12;
      }
      speakEnd = t + at + 1.6;
    }
    function feelEnvoy(t, dt) {
      const inp = c.input;
      eHover = inp.inside;
      if (inp.inside && !wasIn) { c.sound.note(tone(7), { dur: 0.5, vel: 0.07, wave: 'sine' }); c.sound.note(tone(9), { dur: 0.7, vel: 0.06, wave: 'sine', at: 0.14 }); }
      wasIn = inp.inside;
      inp.taps();
      const gx = (inp.x * S - oeE) / ceE, gy = (inp.y * S - oeE) / ceE, down = inp.inside && inp.down, pressed = down && !eDownE, released = !down && eDownE;
      if (inp.inside) { eHx = gx; eHy = gy; }
      if (pressed) { ePress = t; eX0 = gx; eY0 = gy; eMoved = 0; grabA = null; homing = false; }
      if (down) {
        eMoved = Math.max(eMoved, Math.hypot(gx - eX0, gy - eY0));
        const a = Math.atan2(gx - HX, -(gy - HY));
        if (eMoved > 1.5 && Math.hypot(gx - HX, gy - HY) > 2.5) {
          if (grabA !== null) { let da = a - grabA; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2; haloA += da; haloV = haloV * 0.5 + da / Math.max(dt, 0.016) * 0.5; }
          grabA = a; settled = false;
        }
      }
      if (released) {
        if (t - ePress < 0.3 && eMoved < 1.5) {
          blinkE = t; c.sound.note(tone(4), { dur: 0.16, vel: 0.11, wave: 'triangle', cutoff: 1500 }); c.sound.note(tone(2), { dur: 0.28, vel: 0.1, wave: 'triangle', cutoff: 1500, at: 0.16 });
          beeps.push([t, 0.45]);
        }
        haloV = Math.max(-10, Math.min(10, haloV));
      }
      if (!down && !settled) {
        // it spins on and slows, then settles on the nearest click; near the arrow its jewel ticks home
        haloA += haloV * dt; haloV *= Math.pow(0.3, dt);
        if (Math.abs(haloV) < 1.4) {
          const off = jewelOff();
          if (!homing && Math.abs(off) <= SLOT * 3.01) homing = true;
          const target = homing ? haloA - off : Math.round(haloA / SLOT) * SLOT;
          haloV = 0; haloA += (target - haloA) * Math.min(1, dt * (homing ? 5 : 9));
          if (Math.abs(target - haloA) < 0.01) {
            haloA = target; settled = true;
            if (homing) { wokeAt = t; homing = false; [0, 4, 7, 12, 16].forEach((k, i) => c.sound.note(tone(k + 5), { dur: 0.35, vel: 0.09, wave: 'sine', at: i * 0.07 })); if (t > speakEnd - 0.4) speak(t + 0.35, 0); }
          }
        }
      }
      // a click for every notch the halo turns past
      const sl = Math.floor(haloA / SLOT + 0.5);
      if (sl !== lastSlot) { lastSlot = sl; c.sound.hit('click', 0.06); }
      // the foil's rainbow follows the pointer, and drifts on its own
      const want = eHover ? (eHx + eHy) * 0.5 : t * 6;
      sheen += (want - sheen) * Math.min(1, dt * (eHover ? 8 : 40));
      eDownE = down;
    }
    const FONT = { T: ['111', '010', '010', '010', '010'], H: ['101', '101', '111', '101', '101'], E: ['111', '100', '110', '100', '111'], N: ['101', '111', '111', '101', '101'], V: ['101', '101', '101', '101', '010'], O: ['111', '101', '101', '101', '111'], Y: ['101', '101', '010', '010', '010'] };
    function renderEnvoy(t) {
      const tq = Math.floor(t * 12) / 12, key = tq + ':' + Math.round(haloA * 30) + ':' + Math.round(sheen * 2);
      if (key === renderEnvoy.k) return;
      renderEnvoy.k = key;
      const B = eBuf, CL = eCls, W = GEe;
      const at = (x, y) => { x = Math.round(x) + ME; y = Math.round(y) + ME; return x >= 0 && y >= 0 && x < W && y < W ? y * W + x : -1; };
      // put: a flat colour; foil: the rainbow holo (k = 0 field, 1 silver stamping, 2 bright silver)
      const put = (x, y, col) => { const i = at(x, y); if (i >= 0) { B[i] = col; CL[i] = -1; } };
      const foil = (x, y, k) => { const i = at(x, y); if (i >= 0) CL[i] = k; };
      const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
      const woke = t - wokeAt < 4 ? 1 - (t - wokeAt) / 4 : 0, talk = talking(t), fl = woke > 0.45;
      const inBox = (x, y) => x >= 4 && x <= 51 && y >= 11 && y <= 47;
      B.fill(DARKC); CL.fill(-1);
      // the card: rounded corners, its border in the Monitor's colour (holo silver with none), holo foil inside
      for (let y = -ME; y < QE + ME; y++) for (let x = -ME; x < QE + ME; x++) {
        const cx = Math.min(x, QE - 1 - x), cy = Math.min(y, QE - 1 - y);
        if (cx < 0 || cy < 0 || (cx < 3 && cy < 3 && cx + cy < 3)) continue;
        const ring = Math.min(cx, cy);
        if (ring < 3) { if (BANDA) put(x, y, eRGB(ring === 0 ? eMix(BANDA, [0, 0, 0], 0.35) : (x + y) % 9 === 0 ? eMix(BANDA, [255, 255, 255], 0.3) : BANDA)); else foil(x, y, 1); }
        else foil(x, y, 0);
      }
      // the name bar: bright silver, THE ENVOY in ink, the rarity star in holo
      for (let y = 3; y <= 9; y++) for (let x = 6; x <= 49; x++) foil(x, y, y === 3 || y === 9 ? 1 : 2);
      let tx = 9;
      for (const ch of 'THE ENVOY') { if (ch === ' ') { tx += 3; continue; } FONT[ch].forEach((row, j) => { for (let i = 0; i < 3; i++) if (row[i] === '1') put(tx + i, 4 + j, INKC); }); tx += 4; }
      for (const [dx, dy] of [[0, -2], [0, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [0, 1], [-1, 2], [1, 2]]) put(45 + dx, 6 + dy, PH[4]);
      // the art box: its Feed in the Phosphor's colours, a silver rule round it
      const f = Math.floor(tq * 12);
      for (let y = 10; y <= 48; y++) for (let x = 3; x <= 52; x++) {
        if (!inBox(x, y)) { foil(x, y, 2); continue; }
        let v = 0;
        const dx = x + 0.5 - 28, dy = y + 0.5 - 29;
        if (feed === 'Grid') { if (y > 34) { const zz = 30 / (y - 33.5), gxx = dx / (y - 33.5); v = (Math.abs(((zz + tq * 2) % 2 + 2) % 2 - 1) > 0.85 || Math.abs((gxx * 3 % 1 + 1) % 1 - 0.5) > 0.42) ? 2 : 0; } else if (y === 34) v = 2; }
        else if (feed === 'Waveform') { const wy = 19 + Math.round(Math.sin(x * 0.42 - tq * 4) * 4); v = y === wy ? 3 : Math.abs(y - wy) === 1 ? 1 : 0; }
        else if (feed === 'Static') { let h = Math.imul(x * 374761393 + y * 668265263 + f * 2246822519, 1) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); v = ((h ^ (h >>> 16)) >>> 0) % 6 === 0 ? 2 : 0; }
        else if (feed === 'Dead Air') v = y === 22 + Math.round(Math.sin(tq * 0.7) * 6) ? 2 : 0;
        else if (feed === 'Radar') { const r = Math.hypot(dx, dy), aa = ((Math.atan2(dy, dx) - tq * 2) % (Math.PI * 2) + Math.PI * 4) % (Math.PI * 2); v = Math.abs(r % 6 - 3) > 2.6 ? 1 : aa < 0.5 ? 2 : 0; }
        else if (feed === 'Planet') { const r = Math.hypot(x + 0.5 - 14, y + 0.5 - 20); v = r < 5 ? (x + y < 33 ? 3 : 2) : Math.abs(((x + 0.5 - 14) / 9) ** 2 + ((y + 0.5 - 20) / 2.2) ** 2 - 1) < 0.25 ? 3 : 0; if (!v && (x * 7 + y * 13) % 41 === 0) v = 2; }
        else if (feed === 'Aurora') { for (let k = 0; k < 3; k++) { const cy = 16 + k * 4 + Math.sin(x * 0.25 + tq * 0.9 + k * 2) * 2.5; if (Math.abs(y - cy) < 1.2) v = 3 - k; } }
        else if (feed === 'Warp') { const a = Math.atan2(dy, dx), r = Math.hypot(dx, dy), lane = Math.floor((a + Math.PI) * 12) % 24; v = lane % 3 === 0 && ((r - tq * 22 + lane * 7) % 14 + 14) % 14 < 4 ? 2 : 0; }
        else if (feed === 'Falling Code') { if (x % 3 === 0) { const col = x / 3, hd = ((tq * (6 + col % 4) + col * 7) % 34) + 13; v = y < hd && y > hd - 7 ? (y === Math.floor(hd) ? 3 : 1) : 0; } }
        else if (feed === 'Test Card') v = y < 27 ? Math.floor((x - 7) / 6) % 2 + 1 : 0;
        else { const h = (x * 73 + y * 151) % 97; v = h === 0 ? (Math.sin(tq * 2 + x) > 0 ? 3 : 2) : 0; }
        put(x, y, v ? PH[Math.min(4, v + 1)] : eRGB(eMix(PHA[0], [0, 0, 0], 0.3)));
      }
      // the arrow at the art box's right edge: where the halo's jewel must come to rest. It pulses, and burns white
      // while the jewel is within reach of it
      const near = Math.abs(jewelOff()) <= SLOT * 3.01;
      for (let dy = -4; dy <= 4; dy++) for (let dx = 0; dx <= 4 - Math.abs(dy); dx++) put(51 - dx, HY + dy, dx === 4 - Math.abs(dy) ? INKC : woke > 0 || homing || near ? eHex('#ffffff') : GOLDC[Math.floor(t * 2) % 2 ? 2 : 1]);
      // eye beams when the card wakes
      const beams = t - wokeAt < 1.3;
      // its shoulders and its Suit, stamped in silver foil
      const shW = y => Math.min(6 + (y - 40) * 2.7, 24);
      if (suit === 'High Collar') for (let y = 20; y <= 47; y++) for (let x = 4; x <= 51; x++) { const d = Math.hypot(x + 0.5 - 28, (y + 0.5 - 45) * 1.1), a = Math.atan2(y + 0.5 - 45, x + 0.5 - 28); if (d > 12.5 && d < 21 && y < 45 && inBox(x, y)) { if (Math.abs(Math.sin(a * 8)) < 0.25 || d > 20) foil(x, y, 2); else put(x, y, eRGB(eMix(PHA[1], [0, 0, 0], 0.3))); } }
      for (let y = 40; y <= 47; y++) for (let x = 4; x <= 51; x++) {
        const X = x + 0.5 - 28, w = shW(y);
        if (Math.abs(X) > w) continue;
        foil(x, y, Math.abs(X) > w - 1 || y === 40 ? 2 : 1);
        if (suit === 'Robe' && Math.abs(Math.abs(X) - (y - 40) * 0.8) < 0.7) put(x, y, PH[3]);
        if (suit === 'Robe' && Math.abs(X) < (y - 40) * 0.8 - 0.7) put(x, y, eRGB(eMix(PHA[1], [0, 0, 0], 0.2)));
      }
      if (suit === 'Pauldrons') for (const pxc of [12.5, 43.5]) for (let y = 34; y <= 44; y++) for (let x = Math.floor(pxc - 9); x <= pxc + 9; x++) { const q = ((x + 0.5 - pxc) / 8) ** 2 + ((y + 0.5 - 44) / 7.5) ** 2; if (q > 1 || y > 43 || !inBox(x, y)) continue; if (q > 0.72) put(x, y, INKC); else foil(x, y, y < 38 ? 2 : 1); if (q < 0.25 && (x + y) % 3 === 0) put(x, y, PH[4]); }
      // the halo of its script, a click at a time, and its jewel, big, ringed in gold
      for (let k = 0; k < 24; k++) {
        const a = haloA + k * Math.PI * 2 / 24, cx = HX + Math.sin(a) * HR, cy = HY - Math.cos(a) * HR;
        if (k % 2) { foil(Math.round(cx - 0.5), Math.round(cy - 0.5), 2); continue; }
        for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) foil(Math.round(cx - 0.5) + dx, Math.round(cy - 0.5) + dy, k % 4 ? 1 : 2);
      }
      { const a = haloA + keyAt, cx = Math.round(HX + Math.sin(a) * HR - 0.5), cy = Math.round(HY - Math.cos(a) * HR - 0.5); for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const d = Math.abs(dx) + Math.abs(dy); if (d > 4) continue; put(cx + 0.5 + dx, cy + 0.5 + dy, d === 4 ? INKC : d === 3 ? GOLDC[near || woke ? 3 : 2] : d === 0 ? eHex('#ffffff') : PH[4]); } }
      // the neck and the long crowned head, enamelled in its Phosphor
      const hw = y => y < 23.5 ? 10 * Math.sqrt(Math.max(0, 1 - ((23.5 - y) / 10) ** 2)) : 10 - (y - 23.5) * 0.45;
      // (one hue, from its Phosphor: two lit tones on the left, two shaded on the right, a lit cheekbone, a shadowed jaw)
      const TONES = [eMix(PHA[2], [255, 255, 255], 0.42), eMix(PHA[2], [255, 255, 255], 0.18), PHA[2], eMix(PHA[2], [0, 0, 0], 0.32), eMix(PHA[2], [0, 0, 0], 0.55)].map(eRGB), CHEEK = eRGB(eMix(PHA[2], [255, 255, 255], 0.68));
      for (let y = 36; y < 42; y++) for (let x = 24; x < 32; x++) put(x, y, x < 28 ? TONES[2] : TONES[3]);
      const inHead = (x, y) => y >= 14 && y < 40 && Math.abs(x + 0.5 - 28) <= hw(y + 0.5);
      for (let y = 13; y < 41; y++) for (let x = 16; x < 41; x++) { if (!inHead(x, y) && (inHead(x - 1, y) || inHead(x + 1, y) || inHead(x, y - 1) || inHead(x, y + 1))) put(x, y, INKC); }
      for (let y = 14; y < 40; y++) for (let x = 17; x < 40; x++) { if (!inHead(x, y)) continue; const X = (x + 0.5 - 28) / Math.max(1, hw(y + 0.5)); let k = X < -0.5 ? 0 : X < 0 ? 1 : X < 0.5 ? 2 : 3; if (y >= 34) k++; put(x, y, (y === 30 || y === 31) && X > -0.8 && X < -0.35 ? CHEEK : TONES[k]); }
      // the crown: five points of gold foil with phosphor jewels, flaring right out of the box when the card wakes
      const fx = fl ? Math.round(6 * woke) : 0;
      for (const [x0, h] of [[20, 2], [24, 3], [28, 5], [32, 3], [36, 2]]) { const hh = h + fx * (x0 === 28 ? 2 : 1); for (let k = 0; k < hh; k++) { put(x0, 15 - k, GOLDC[k === hh - 1 ? 3 : 2]); if (k < h - 1) { put(x0 - 1, 15 - k, GOLDC[1]); put(x0 + 1, 15 - k, GOLDC[2]); } } }
      for (let x = 18; x < 39; x++) { put(x, 15, GOLDC[1]); put(x, 16, GOLDC[2]); }
      for (const x of [21, 28, 35]) put(x, 16, PH[4]);
      // the third gem in its brow
      for (const [dx, dy] of [[0, -2], [-1, -1], [1, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2]]) put(28 + dx, 21 + dy, GOLDC[2]);
      for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1], [0, 0]]) put(28 + dx, 21 + dy, woke || talk ? eHex('#ffffff') : dx || dy ? PH[3] : PH[4]);
      // its eyes, as its Eyes trait says: dark almonds with a burning light (shut a moment when it blinks)
      const shut = t - blinkE < 0.25 || ((t + 1.7) % 5.3) < 0.14, glow = woke ? eHex('#ffffff') : PH[4];
      const eyeC = [];
      const almond = (ex, ey, rows, gx, wide) => {
        rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === 'k' && (!shut || j === rows.length - 1)) put(ex + i, ey + j, INKC); });
        if (!shut) { put(ex + gx, ey + 1, glow); if (wide) put(ex + gx + 1, ey + 1, glow); eyeC.push([ex + gx, ey + 1]); }
        if (eyes === 'Lidded' && !shut) for (let i = 0; i < rows[0].length; i++) put(ex + i, ey, TONES[ex < 28 ? 1 : 2]);
      };
      if (eyes === 'Cyclops') almond(24, 25, ['..kkkk..', '.kkkkkk.', 'kkkkkkkk', '.kkkkkk.'], 3, true);
      else if (eyes === 'Crown of Seven') { for (let k = 0; k < 7; k++) { const a = Math.PI * (0.12 + k * 0.76 / 6), x = Math.round(28 + Math.cos(a + Math.PI) * 7), y = Math.round(29 - Math.sin(a) * 4.5); put(x, y, shut ? INKC : glow); if (!shut) { put(x, y + 1, INKC); if (k === 1 || k === 5) eyeC.push([x, y]); } } }
      else { almond(19, 26, ['...kkk', '.kkkkk', 'kkkkk.'], 3, false); almond(31, 26, ['kkk...', 'kkkkk.', '.kkkkk'], 2, false); }
      // the slit of its mouth, glowing as it speaks
      for (let x = 25; x < 31; x++) put(x, 34, talk ? PH[4] : INKC);
      // eye beams, out to the edge of the card
      if (beams) for (const [ex, ey] of eyeC) { const dir = ex < 28 ? -1 : 1; for (let k = 1; k < 40; k++) { const x = ex + dir * k, y = ey + Math.round(k * 0.35); if (x < 2 || x > 53) break; put(x, y - 1, PH[3]); put(x, y, eHex('#ffffff')); put(x, y + 1, k % 2 ? eHex('#ffffff') : PH[4]); put(x, y + 2, PH[3]); } }
      // the foot of the card: a thin strip, an energy gem in its Phosphor and, while it speaks, its words scrolling by
      for (let y = 49; y <= 52; y++) for (let x = 4; x <= 51; x++) foil(x, y, y === 49 ? 1 : 2);
      for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]) put(5 + dx, 49 + dy, dx === 1 && dy === 1 ? eHex('#ffffff') : PH[3]);
      if (t < speakEnd && speech.length) {
        const scroll = Math.floor((t - speakStart) * 10);
        speech.forEach((g, j) => { const gx = 46 + j * 5 - scroll; for (let i = 0; i < 9; i++) if (g >> i & 1) { const x = gx + i % 3, y = 50 + Math.floor(i / 3); if (x > 9 && x < 51) put(x, y, INKC); } });
      } else for (let x = 11; x < 40; x++) put(x, 51, eRGB(eMix(SILVER, [0, 0, 0], 0.35)));
      // the holo foil: rainbow bands across the card at the pointer's angle, silver stamping catching them; a held
      // blaze when the card wakes
      const sp = sheen, blaze = woke > 0 ? 0.5 + woke * 0.5 : 0;
      for (let i = 0; i < W * W; i++) {
        const k = CL[i];
        if (k < 0) continue;
        const x = i % W - ME, y = (i / W | 0) - ME, band = Math.floor((x * 0.7 + y + sp + (blaze ? tq * 30 : 0)) / 3), hc = HOLO[((band % 7) + 7) % 7];
        let col = k === 0 ? eMix(hc, [40, 30, 70], 0.42) : k === 1 ? eMix(SILVER, hc, 0.35) : eMix([238, 240, 248], hc, 0.22);
        if (blaze) col = eMix(col, [255, 255, 255], blaze * (k === 0 ? 0.35 : 0.5));
        B[i] = eRGB(col);
      }
      // a holo band sweeping over the whole card, art and all, with the pointer (or on its own now and then)
      const bp = eHover ? eHx * 0.7 + eHy : ((tq * 18) % 150) - 30;
      for (let i = 0; i < W * W; i++) {
        const x = i % W - ME, y = (i / W | 0) - ME, d = Math.abs(x * 0.7 + y - bp);
        if (d >= 4) continue;
        const v = B[i], cur = [v & 255, v >> 8 & 255, v >> 16 & 255], hc = HOLO[((Math.floor((x - y) / 3) % 7) + 7) % 7];
        B[i] = eRGB(d < 1.5 ? eMix(cur, [255, 255, 255], 0.5) : eMix(cur, hc, 0.32));
      }
      eCtx.putImageData(eImg, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(eCan, oeE - ME * ceE, oeE - ME * ceE, W * ceE, W * ceE);
    }
    function render(t) {
      feel(t);
      if (legend === 'Hive') return renderHive(t);
      if (legend === 'The Envoy') return renderEnvoy(t);
      compose(t);
      if (tune > 0) detune(t);
      if (fault === 'Snow') { const f = Math.floor(t * 8); for (let i = 0; i < N * N; i++) if (!L[i] && noise(i % N, (i / N) | 0, f + 40) > 0.95) L[i] = 1; }
      for (let i = 0; i < N * N; i++) {
        const v = RGB[i];
        if (v >= 0) { img.data[i * 4] = v >> 16; img.data[i * 4 + 1] = (v >> 8) & 255; img.data[i * 4 + 2] = v & 255; img.data[i * 4 + 3] = 255; continue; }
        const col = levelRgb[L[i]]; img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = 255;
      }
      sctx.putImageData(img, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
      ctx.fillRect(0, 0, S, S);
      ctx.imageSmoothingEnabled = false;
      if (fault === 'Wobble') for (let y = 0; y < vn; y++) ctx.drawImage(small, vx0, vy0 + y, vn, 1, ox + Math.sin(y * 0.45 + t * 1.3) * cell * 0.35, oy + y * cell, G, cell);
      else ctx.drawImage(small, vx0, vy0, vn, vn, ox, oy, G, G);
      ctx.globalCompositeOperation = ink ? 'source-over' : 'lighter';
      ctx.imageSmoothingEnabled = true;
      if (fault === 'Ghosting') { ctx.globalAlpha = ink ? 0.12 : 0.17; ctx.drawImage(small, vx0, vy0, vn, vn, ox + cell * 1.5, oy, G, G); }
      ctx.globalAlpha = ink ? 0.1 : 0.32;
      ctx.drawImage(small, vx0, vy0, vn, vn, ox - cell * 0.5, oy - cell * 0.5, G + cell, G + cell);
      // the refresh band rolling slowly down the screen
      const band = oy + ((t * 0.12) % 1.3 - 0.15) * G;
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = ink ? '#ffffff' : `rgb(${base[0]},${base[1]},${base[2]})`;
      ctx.fillRect(0, band, S, G * 0.12);
      ctx.globalCompositeOperation = 'source-over';
      if (scan) {
        ctx.globalAlpha = ink ? 0.1 : 0.45;
        ctx.fillStyle = '#000';
        for (let y = 0; y < vn; y++) ctx.fillRect(0, oy + y * cell + cell - scan, S, scan);
        if (fault === 'Interlaced') { ctx.globalAlpha = ink ? 0.08 : 0.28; for (let y = 1; y < vn; y += 2) ctx.fillRect(0, oy + y * cell, S, cell); }
      }
      // a soft dark corner on the glass
      ctx.globalAlpha = 1;
      const cx = ox + G / 2, cy = oy + G / 2;
      const g = ctx.createRadialGradient(cx, cy, G * 0.38, cx, cy, G * 0.75);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, ink ? 'rgba(60,50,30,0.3)' : 'rgba(0,0,0,0.55)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, S, S);
      if (shell) {
        ctx.drawImage(shell, 0, 0);
        // the power light flickers while it talks
        const lit = talking(t) ? 1 : 0.35;
        ctx.beginPath(); ctx.arc(ledX, ledY, S * 0.011, 0, 6.3);
        ctx.fillStyle = ink ? `rgba(60,200,90,${lit})` : `rgba(${base[0]},${base[1]},${base[2]},${lit})`;
        ctx.fill();
      }
    }
    render(0);
    return t => render(t);
  },
});

})(window.Proto);
