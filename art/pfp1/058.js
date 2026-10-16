// Buzz Heads: from D:/code/synaesthesia/public/drop03/pieces/058.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Buzz Heads: chunky outlined figures in flat colour, drawn as pixel art on a
// 48-cell grid, mostly faceless, with little buzz marks around the head that
// hum and pulse. The marks say the mood (dashes, zaps, hearts, sweat, notes,
// spirals); the arms say the rest. Heads are hand-designed row profiles, sat on
// a short neck; everything is placed cell by cell and outlined one cell wide.
Proto.add({
  num: 58,
  name: 'Buzz Heads',
  fam: 'Minimal & Geometric',
  recipe: 'A chunky pixel figure on a 48-cell grid, outlined one cell wide on a loud flat field, ringed by buzz marks that pulse and say its mood. Field and its pattern, fill, outline, head shape, pose, face, buzz and chest sign vary; rare ones are chalk on black, cut out like stickers, or have two heads.',
  interactive: 'Tap to charge it up. Hold to keep it buzzing.',
  music: true,
  seed: 0,
  make(c) {
    const S = c.size, p = c.ctx, N = 48;

    // Bob Jenkins' small fast generator (jsf32)
    let A = 0xf1ea5eed, B, C, D;
    B = C = D = parseInt(c.hash.slice(2, 10), 16) ^ parseInt(c.hash.slice(34, 42), 16);
    const jsf = () => {
      const e = A - (B << 27 | B >>> 5) | 0;
      A = B ^ (C << 17 | C >>> 15);
      B = C + D | 0;
      C = D + e | 0;
      D = e + A | 0;
      return (D >>> 0) / 4294967296;
    };
    for (let i = 0; i < 20; i++) jsf();
    const roll = (...opts) => {
      let sum = 0; for (let i = 1; i < opts.length; i += 2) sum += opts[i];
      let v = jsf() * sum;
      for (let i = 0; i < opts.length; i += 2) { v -= opts[i + 1]; if (v <= 0) return opts[i]; }
      return opts[0];
    };
    // Marsaglia's xorshift128 over four more words of the hash, for everything added later
    let X = parseInt(c.hash.slice(42, 50), 16) | 1, Y = parseInt(c.hash.slice(50, 58), 16) ^ 0x6c078965, Z = parseInt(c.hash.slice(58, 66), 16), Wd = parseInt(c.hash.slice(10, 18), 16);
    const xs = () => {
      const t = X ^ (X << 11);
      X = Y; Y = Z; Z = Wd;
      Wd = (Wd ^ (Wd >>> 19)) ^ (t ^ (t >>> 8));
      return (Wd >>> 0) / 4294967296;
    };
    for (let i = 0; i < 8; i++) xs();
    const deal = (...opts) => {
      let sum = 0; for (let i = 1; i < opts.length; i += 2) sum += opts[i];
      let v = xs() * sum;
      for (let i = 0; i < opts.length; i += 2) { v -= opts[i + 1]; if (v <= 0) return opts[i]; }
      return opts[0];
    };

    // the original rolls, in their original order (so earlier favourites keep their traits)
    let fieldName = roll('Lemon', 18, 'Hot Pink', 16, 'Lime', 14, 'Tangerine', 14, 'Sky', 14, 'Red', 10, 'Subway', 7);
    let bodyName = fieldName === 'Subway' ? 'Chalk' : roll('Red', 16, 'Blue', 16, 'Yellow', 14, 'Green', 14, 'Pink', 12, 'White', 14, 'Violet', 10);
    let pose = roll('Arms Up', 34, 'Wave', 24, 'Hands Down', 22, 'Head Clutch', 12, 'Hoop', 8);
    let buzz = roll('Dashes', 30, 'Double Dashes', 20, 'Arcs', 18, 'Zaps', 16, 'Dots', 10, 'Silent', 6);
    let face = roll('Blank', 40, 'Dot Eyes', 22, 'Shout', 14, 'Grin', 12, 'Hole', 8, 'Third Eye', 4);
    let chest = roll('Plain', 44, 'Heart', 16, 'Hole', 12, 'Stripes', 14, 'Spiral', 8, 'Star', 6);
    const headW = 0.15 + jsf() * 0.04, headH = 0.165 + jsf() * 0.03;
    const danceSpeed = 1.6 + jsf() * 0.8, ph = jsf() * 6.28;
    const waveSide = jsf() < 0.5 ? -1 : 1;
    const nBuzz = 7 + Math.floor(jsf() * 4);
    const buzzSpread = 2.1 + jsf() * 1.0;

    if (fieldName !== 'Subway' && xs() < 0.28) fieldName = deal('Cobalt', 30, 'Violet', 26, 'Mint', 26, 'Cream', 18);
    const chalkRoll = fieldName === 'Subway';
    const clash = { Lemon: 'Yellow', 'Hot Pink': 'Pink', Lime: 'Green', Sky: 'Blue', Red: 'Red', Tangerine: 'Red', Cobalt: 'Blue', Violet: 'Violet', Mint: 'Green', Cream: 'White' };
    if (clash[fieldName] === bodyName) bodyName = fieldName === 'Lemon' || fieldName === 'Tangerine' || fieldName === 'Cream' ? 'Blue' : fieldName === 'Cobalt' || fieldName === 'Violet' ? 'Yellow' : 'White';
    if (xs() < 0.35) pose = deal('Flex', 28, 'Cheer', 26, 'Point', 24, 'Shrug', 22);
    if (xs() < 0.38) buzz = deal('Hearts', 20, 'Sweat', 18, 'Notes', 18, 'Sparkles', 18, 'Spirals', 14, 'Questions', 12);
    if (xs() < 0.32) face = deal('Happy', 30, 'X Eyes', 22, 'Shades', 26, 'Cyclops', 22);
    if (xs() < 0.3) chest = deal('Bolt', 30, 'Target', 26, 'Buttons', 26, 'Eye', 18);
    let head = deal('Round', 44, 'Egg', 16, 'Box', 15, 'Bean', 12, 'Bulb', 10, 'Twin', 3);
    let pattern = chalkRoll ? 'Flat' : deal('Flat', 46, 'Halftone', 14, 'Stripes', 14, 'Rays', 14, 'Split', 12);
    let outline = chalkRoll ? 'Chalk' : deal('Ink', 80, 'Heavy', 14, 'Sticker', 6);
    const lean0 = (xs() - 0.5) * 0.04, stripeA = xs() < 0.5 ? 1 : -1;
    // the pixel pass: most plain round heads become one of four new designed shapes
    if (head === 'Round' && xs() < 0.55) head = deal('Wide', 28, 'Flat Top', 26, 'Tall', 24, 'Gumdrop', 22);
    // the legendaries and the coveted halo roll from their own stream (FNV-1a of the hash, then xorshift32)
    let lz = 0x811c9dc5;
    for (let i = 2; i < c.hash.length; i++) lz = Math.imul(lz ^ c.hash.charCodeAt(i), 0x01000193);
    lz = (lz ^ 0x5eed058) | 1;
    const lx = () => { lz ^= lz << 13; lz ^= lz >>> 17; lz ^= lz << 5; return (lz >>> 0) / 4294967296; };
    for (let i = 0; i < 6; i++) lx();
    const legendR = lx(), legendK = lx();
    const legend = legendR < 1 / 450 ? (legendK < 0.4 ? 'Gold' : legendK < 0.72 ? 'Cosmos' : 'X-Ray') : null;
    const halo = lx() < 0.005;
    // the halo floats over the head, so a haloed figure never makes the hoop (its hands would push the halo off the top)
    if (halo && pose === 'Hoop') pose = 'Arms Up';
    const starSeed = []; for (let i = 0; i < 70; i++) starSeed.push([lx() * N | 0, lx() * N | 0, lx()]);
    const chalk = chalkRoll && !legend;
    // the 4k pass: Marsaglia's multiply-with-carry on the hash's 3rd and 4th words adds
    // headwear, cheeks and a body print, and spreads the commonest pattern, outline and chest
    let mz = (parseInt(c.hash.slice(18, 26), 16) >>> 0) || 1, mw = (parseInt(c.hash.slice(26, 34), 16) >>> 0) || 2;
    const mwc = () => { mz = (36969 * (mz & 65535) + (mz >>> 16)) >>> 0; mw = (18000 * (mw & 65535) + (mw >>> 16)) >>> 0; return (((mz << 16) + mw) >>> 0) / 4294967296; };
    for (let i = 0; i < 10; i++) mwc();
    const pickM = (...opts) => { let sum = 0; for (let i = 1; i < opts.length; i += 2) sum += opts[i]; let v = mwc() * sum; for (let i = 0; i < opts.length; i += 2) { v -= opts[i + 1]; if (v <= 0) return opts[i]; } return opts[0]; };
    if (!chalkRoll && pattern === 'Flat' && mwc() < 0.55) pattern = pickM('Checker', 34, 'Grid', 33, 'Zigzag', 33);
    if (!chalkRoll && outline === 'Ink' && mwc() < 0.62) outline = pickM('Shadow', 36, 'Colour', 36, 'Neon', 28);
    if (chest === 'Plain' && mwc() < 0.45) chest = pickM('Smiley', 34, 'Pocket', 33, 'Number', 33);
    let headwear = pickM('None', 28, 'Beanie', 14, 'Party Hat', 12, 'Cap', 13, 'Bow', 10, 'Antenna', 10, 'Bandana', 9, 'Sprout', 4);
    if (face === 'Third Eye' && (headwear === 'Beanie' || headwear === 'Cap' || headwear === 'Bandana')) headwear = 'Bow';
    if (pose === 'Hoop' && (headwear === 'Party Hat' || headwear === 'Antenna' || headwear === 'Sprout')) headwear = 'Beanie';
    const cheeks = pickM('None', 26, 'Blush', 22, 'Freckles', 16, 'Band-Aid', 12, 'Tear', 10, 'Scar', 10);
    const bodyPrint = pickM('Solid', 30, 'Striped', 20, 'Spotted', 16, 'Split', 14, 'Belted', 12, 'Zip', 8);
    const tone2 = mwc(), tone3 = mwc(), numV = 1 + Math.floor(mwc() * 99);
    // the character pass: a body build, a head size, how high the head rides on its neck, and a prop in
    // one hand, from a mulberry32 stream of their own (two more words of the hash), so every figure
    // above keeps its colours, pose, face and buzz
    let bq = (parseInt(c.hash.slice(10, 18), 16) ^ parseInt(c.hash.slice(50, 58), 16) ^ 0x3c6ef372) >>> 0;
    const mb = () => { bq = (bq + 0x6d2b79f5) >>> 0; let z = bq; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    const pickB = (...opts) => { let sum = 0; for (let i = 1; i < opts.length; i += 2) sum += opts[i]; let v = mb() * sum; for (let i = 0; i < opts.length; i += 2) { v -= opts[i + 1]; if (v <= 0) return opts[i]; } return opts[0]; };
    const build = pickB('Regular', 28, 'Narrow', 18, 'Stocky', 18, 'Tall', 18, 'Round', 18);
    const headSize = head === 'Twin' ? 'Medium' : pickB('Small', 32, 'Medium', 32, 'Big', 32);
    const neckLen = pickB('Short', 33, 'Medium', 33, 'Long', 33);
    let prop = pickB('None', 22, 'Mic', 20, 'Balloon', 20, 'Can', 19, 'Pennant', 19);
    const propSide = mb() < 0.5 ? -1 : 1;
    // hands on the head or joined over it have nothing free to hold with
    if (pose === 'Head Clutch' || pose === 'Hoop') prop = 'None';

    c.trait('Field', fieldName);
    c.trait('Pattern', pattern);
    c.trait('Fill', bodyName);
    c.trait('Outline', outline);
    c.trait('Head', head);
    c.trait('Pose', pose);
    c.trait('Face', face);
    c.trait('Buzz', buzz);
    c.trait('Chest', chest);
    c.trait('Headwear', headwear);
    c.trait('Cheeks', cheeks);
    c.trait('Body', bodyPrint);
    c.trait('Build', build);
    if (head !== 'Twin') c.trait('Head Size', headSize);
    c.trait('Neck', neckLen);
    c.trait('Prop', prop);
    if (halo) c.trait('Item', 'Gold Halo');
    if (legend) c.trait('Legendary', legend);

    // ---------- the palette: a handful of flat colours per figure ----------
    const FIELDS = {
      Lemon: ['#ffe23d', '#f4c81c'], 'Hot Pink': ['#ff4fa3', '#ec3a8e'], Lime: ['#7ddc3c', '#64c42a'], Tangerine: ['#ff8a1c', '#f07210'],
      Sky: ['#3cb4ff', '#2a9bec'], Red: ['#f23b2f', '#d82b22'], Subway: ['#141414', '#202020'], Cobalt: ['#2a4bdc', '#3a5df0'],
      Violet: ['#8a4dff', '#7a3cf0'], Mint: ['#4fe3b5', '#3acb9e'], Cream: ['#f6ecd6', '#eadbbb'],
    };
    let [FIELD, TINT] = FIELDS[fieldName];
    const BODY = { Red: '#ff3b30', Blue: '#1f6fff', Yellow: '#ffd400', Green: '#00b86b', Pink: '#ff7ac4', White: '#ffffff', Violet: '#8a4dff' };
    let FILL = chalk ? FIELD : BODY[bodyName];
    let LINE = chalk ? '#f4f1e8' : '#141414';
    let MARK = chalk ? '#ff8fb0' : bodyName === 'Red' ? '#ffd400' : '#ff3b30';
    // legendary palettes: four extra colours each (x1..x4)
    let XC = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
    if (legend === 'Gold') { FIELD = '#1c1330'; TINT = '#291c46'; FILL = '#f5bd2e'; LINE = '#2b1604'; MARK = '#fff0a0'; XC = ['#b8760c', '#ffe680', '#fffbe0', '#7a4806']; }
    else if (legend === 'Cosmos') { FIELD = '#06081a'; TINT = '#0d1236'; FILL = '#161c56'; LINE = '#e9e2ff'; MARK = '#ff8fd0'; XC = ['#ffffff', '#7f8ad8', '#3a2a88', '#b04ab0']; }
    else if (legend === 'X-Ray') { FIELD = '#03101a'; TINT = '#08202f'; FILL = '#0f3858'; LINE = '#8cecff'; MARK = '#ff4a6a'; XC = ['#e8f8ff', '#8cbcd8', '#1f6c96', '#ffffff']; }
    const shade = (h, k) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('');
    const whiten = (h, k) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - k) + 255 * k).toString(16).padStart(2, '0')).join('');
    // a second body colour for the print and one for the headwear, never the fill and never lost on the field
    const others = Object.keys(BODY).filter(k => k !== bodyName && clash[fieldName] !== k);
    const PRINT = chalk ? '#5a5850' : BODY[others[Math.floor(tone2 * others.length)]];
    const HATC = BODY[others[Math.floor(tone3 * others.length)]];
    const NEON = ['Lime', 'Mint'].includes(fieldName) || bodyName === 'Green' ? '#ff3df0' : '#39ff8a';
    // the prop's own colour: the headwear colour when it stands out from the field and the body, else the body colour that stands out most
    const rgbD = (a, b) => Math.hypot(...[1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16) - parseInt(b.slice(i, i + 2), 16)));
    const propScore = h => Math.min(rgbD(h, FIELD), rgbD(h, FILL) * 1.4, rgbD(h, MARK) * 2);
    const PROPC = propScore(HATC) >= 190 ? HATC : Object.values(BODY).reduce((a, b) => (propScore(b) > propScore(a) ? b : a));
    const PAL = [FIELD, TINT, FILL, LINE, MARK,'#ffffff', '#5cc8ff', '#d8f4ff', shade(FIELD, 0.74), '#a8a59c', FILL === '#ffffff' ? '#3cb4ff' : '#ffffff', ...XC, '#ffd84a', '#b8780c',
      shade(FILL, 0.42), NEON, PRINT, HATC, whiten(HATC, 0.45), bodyName === 'Pink' || bodyName === 'Red' ? '#c21a3a' : '#ff8fb0', '#f2c08a', '#3cb43c', PROPC];
    const F_ = 0, T_ = 1, B_ = 2, K_ = 3, M_ = 4, W_ = 5, SW_ = 6, SH_ = 7, SD_ = 8, CD_ = 9, GL_ = 10, X1 = 11, X2 = 12, X3 = 13, X4 = 14, HY_ = 15, HD_ = 16;
    const FD_ = 17, NE_ = 18, P2_ = 19, HT_ = 20, HT2_ = 21, BL_ = 22, BA_ = 23, LF_ = 24, PR_ = 25;
    const P32 = PAL.map(h => (0xff000000 | parseInt(h.slice(5, 7), 16) << 16 | parseInt(h.slice(3, 5), 16) << 8 | parseInt(h.slice(1, 3), 16)) >>> 0);
    const CH = { K: K_, M: M_, W: W_, S: SW_, H: SH_, B: B_, G: GL_, Y: HY_, D: HD_, T: HT_, U: HT2_, A: BA_, L: LF_, P: PR_ };

    // ---------- the heads: half-widths per row, top to bottom, drawn as designs ----------
    const PROFILES = {
      Round: [3, 5, 6, 7, 7, 8, 8, 8, 8, 8, 8, 7, 7, 6, 5, 3],
      Egg: [3, 5, 6, 7, 8, 8, 8, 8, 8, 8, 7, 7, 6, 6, 5, 4, 2],
      Box: [7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7],
      Bean: [4, 6, 7, 8, 8, 9, 9, 9, 9, 9, 8, 8, 7, 6, 4],
      Bulb: [3, 5, 6, 7, 8, 8, 8, 8, 8, 7, 6, 5, 4, 4, 4, 3],
      Wide: [5, 7, 8, 9, 10, 10, 10, 10, 10, 10, 9, 8, 6],
      'Flat Top': [7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 6, 5, 3],
      Gumdrop: [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8, 7, 5],
      Tall: [3, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 2],
      Twin: [2, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 2],
    };
    let prof = PROFILES[head].slice();
    if (head !== 'Twin' && head !== 'Wide' && headW > 0.172) prof = prof.map(v => v + 1);
    if (head !== 'Twin' && head !== 'Bulb' && headH > 0.18) { const m = prof.length >> 1; prof.splice(m, 0, prof[m]); }
    if (headSize === 'Small') { prof = prof.map(v => Math.max(1, v - 1)); prof.splice(prof.length >> 1, 1); }
    else if (headSize === 'Big') { prof = prof.map(v => Math.min(11, v + 1)); const m = prof.length >> 1; prof.splice(m, 0, prof[m], prof[m]); }
    const len = prof.length, hwMax = Math.max(...prof);
    // a bean leans: each row slides a little toward its waving side
    const shift = prof.map((_, r) => head === 'Bean' ? Math.round((len / 2 - r) * 0.3) * waveSide : 0);
    const eyeK = { Gumdrop: 0.56, Bulb: 0.34, Tall: 0.36, Egg: 0.38, Wide: 0.4 }[head] || 0.42;
    const NECK = head === 'Wide' ? 4 : 3;
    // the torso builds: half-widths per row from the top of the shoulders (TY0) down to the bottom edge,
    // and where the arms join (SHW cells either side of the middle)
    const BUILDS = {
      Regular: [35, 13, [12, 14, 16, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18]],
      Narrow: [35, 10, [8, 10, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]],
      Stocky: [36, 16, [16, 19, 21, 22, 23, 23, 23, 23, 23, 23, 23, 23]],
      Tall: [32, 11, [9, 11, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13]],
      Round: [35, 12, [9, 12, 14, 16, 17, 18, 19, 19, 19, 19, 19, 18, 18]],
    };
    const [TY0, SHW, TORSO] = BUILDS[build];
    // the neck: short sinks the head into the shoulders, long lifts it clear (a tall body lifts it too)
    const lift0 = (neckLen === 'Short' ? 2 : neckLen === 'Long' ? -3 : 0) + (build === 'Tall' ? -3 : build === 'Stocky' ? 1 : 0);
    const baseChin = head === 'Twin' ? 31 : head === 'Bulb' ? 34 : 32;
    // never so high that a hat or the halo leaves the top of the frame
    const lift = Math.max(lift0, 10 + len - 1 - baseChin);
    const heads = head === 'Twin'
      ? [{ cx: 17, chin: 31 + lift, k: -1 }, { cx: 31, chin: 30 + lift, k: 1 }]
      : [{ cx: 24, chin: baseChin + lift, k: 0 }];

    // ---------- sprites, placed cell by cell ----------
    const HEART7 = ['.KK.KK.', 'KMWKMMK', 'KMMMMMK', '.KMMMK.', '..KMK..', '...K...'];
    const HEART8 = ['.KK..KK.', 'KMWKKMMK', 'KWMMMMMK', 'KMMMMMMK', '.KMMMMK.', '..KMMK..', '...KK...'];
    const HEART10 = ['.KKK..KKK.', 'KMWMKKMMMK', 'KWMMMMMMMK', 'KMMMMMMMMK', '.KMMMMMMK.', '..KMMMMK..', '...KMMK...', '....KK....'];
    const SWEAT = ['..K..', '.KSK.', '.KSK.', 'KSSSK', 'KSHSK', 'KSSSK', '.KKK.'];
    const NOTE = ['..KK..', '..K.K.', '..K..K', '..K...', 'KKK...', 'KKK...'];
    const SPARK = ['...K...', '...K...', '..KWK..', 'KKWWWKK', '..KWK..', '...K...', '...K...'];
    const TWINKLE = ['.K.', 'KWK', '.K.'];
    const QUEST = ['.KKK.', 'K...K', '....K', '..KK.', '..K..', '.....', '..K..'];
    const SPIRAL5 = ['KKKKK', '....K', 'KKK.K', 'K...K', 'KKKKK'];
    const SPIRAL7 = ['KKKKKKK', '......K', 'KKKKK.K', 'K...K.K', 'K.KKK.K', 'K.....K', 'KKKKKKK'];
    const STAR = ['....KK....', '...KMMK...', '...KMMK...', 'KKKKMMKKKK', 'KMMMMMMMMK', '.KMMMMMMK.', '..KMMMMK..', '.KMMKKMMK.', '.KMK..KMK.', '.KK....KK.'];
    const BOLT = ['....KKK', '...KMMK', '..KMMK.', '.KMMKKK', 'KMMMMMK', 'KKKMMK.', '..KMK..', '.KMK...', '.KK....'];
    const EYE = ['...KKKK...', '.KKWWWWKK.', 'KWWWWWWWWK', '.KKWWWWKK.', '...KKKK...'];
    const BUTTON = ['.KK.', 'KMMK', 'KMMK', '.KK.'];
    const SHOUT = [['.KK.', 'KKKK', 'KKKK', '.KK.'], ['.KK.', 'KKKK', 'KKKK', 'KKKK', '.KK.']];
    const HALO = ['...DDDDDD...', '.DD......DD.', 'Y..........Y', '.YY......YY.', '...YYYYYY...'];
    const HALO_RING = [];
    HALO.forEach((r, y) => r.split('').forEach((ch, x) => { if (ch !== '.') HALO_RING.push([x, y, Math.atan2((y - 2) * 2.4, x - 5.5)]); }));
    HALO_RING.sort((a, b) => a[2] - b[2]);
    const turn = rows => rows[0].split('').map((_, x) => rows.map(r => r[x]).reverse().join(''));
    // the props, big enough to read on a small tile: P is the prop's own colour (P for the pennant's flag, the can, the balloon, the mic's handle)
    const PROP_SPR = {
      Mic: ['.KKKKKK.', 'KWSWSWSK', 'KSWSWSWK', 'KWSWSWSK', 'KSWSWSWK', '.KKKKKK.', '.KMMMMK.', '..KPPK..', '..KPPK..', '..KPPK..', '..KPPK..', '..KPPK..', '..KKKK..'],
      Can: ['.KKKKK.', 'KHWHHHK', 'KKKKKKK', 'KPWPPPK', 'KMMMMMK', 'KMWMMMK', 'KMMMMMK', 'KPPPPPK', 'KPPPPPK', 'KKKKKKK'],
      Balloon: ['..KKKKK..', '.KPPPPPK.', 'KPWWPPPPK', 'KPWPPPPPK', 'KPPPPPPPK', 'KPPPPPPPK', 'KPPPPPPPK', '.KPPPPPK.', '..KPPPK..', '...KPK...', '....K....'],
      Pennant: [['KK........', 'KPKK......', 'KPPPKK....', 'KPPPPPKK..', 'KPPWPPPPKK', 'KPPPPPKK..', 'KPPPKK....', 'KPKK......', 'KK........'],
        ['KK........', 'KPKK......', 'KPPPKK....', 'KPPPPPKK..', 'KPPWPPPPK.', 'KPPPPPPPKK', 'KPPPKKK...', 'KPKK......', 'KK........']],
    };

    // ---------- the cell buffers ----------
    const buf = new Uint8Array(N * N), fig = new Uint8Array(N * N), armM = new Uint8Array(N * N), edge = new Uint8Array(N * N), bg = new Uint8Array(N * N), propM = new Uint8Array(N * N);
    const cv = document.createElement('canvas'); cv.width = cv.height = N;
    const cg = cv.getContext('2d'), img = cg.createImageData(N, N), px = new Uint32Array(img.data.buffer);
    let behind = false;  // buzz marks sit behind the figure, never on it
    const put = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N && !(behind && (fig[y * N + x] || edge[y * N + x] || propM[y * N + x]))) buf[y * N + x] = v; };
    const rect = (x, y, w, h, v) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(x + i, y + j, v); };
    const spr = (rows, x0, y0) => { for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) { const ch = rows[j][i]; if (ch !== '.') put(x0 + i, y0 + j, CH[ch]); } };
    const sprC = (rows, cx, cy) => spr(rows, cx - (rows[0].length >> 1), cy - (rows.length >> 1));
    const line = (x0, y0, x1, y1, v) => walk(x0, y0, x1, y1, (x, y) => put(x, y, v));
    const walk = (x0, y0, x1, y1, fn) => {
      x0 = Math.floor(x0); y0 = Math.floor(y0); x1 = Math.floor(x1); y1 = Math.floor(y1);
      const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
      let err = dx + dy;
      for (let k = 0; k < 96; k++) {
        fn(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    };
    const ringAt = (cx, cy, r0, r1, v) => {
      for (let y = Math.floor(cy - r1 - 1); y <= cy + r1 + 1; y++) for (let x = Math.floor(cx - r1 - 1); x <= cx + r1 + 1; x++) {
        const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
        if (d <= r1 && d > r0) put(x, y, v === -1 ? bg[y * N + x] : v);
      }
    };
    // a thick limb segment: every cell whose centre is within r of the segment
    const cap = (x0, y0, x1, y1, r) => {
      const dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy || 1e-9;
      const xa = Math.max(0, Math.floor(Math.min(x0, x1) - r)), xb = Math.min(N - 1, Math.ceil(Math.max(x0, x1) + r));
      const ya = Math.max(0, Math.floor(Math.min(y0, y1) - r)), yb = Math.min(N - 1, Math.ceil(Math.max(y0, y1) + r));
      for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) {
        const qx = x + 0.5 - x0, qy = y + 0.5 - y0;
        let u = (qx * dx + qy * dy) / L2; u = u < 0 ? 0 : u > 1 ? 1 : u;
        const ex = qx - u * dx, ey = qy - u * dy;
        if (ex * ex + ey * ey <= r * r) armM[y * N + x] = 1;
      }
    };
    // one ring of outline around the figure (and the rings already laid)
    const grow = (val, diag) => {
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (fig[i] || edge[i]) continue;
        let hit = false;
        for (let dy = -1; dy <= 1 && !hit; dy++) for (let dx = -1; dx <= 1; dx++) {
          if ((!dx && !dy) || (!diag && dx && dy)) continue;
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= N || yy >= N) continue;
          const j = yy * N + xx;
          if (fig[j] || (edge[j] && edge[j] !== val)) { hit = true; break; }
        }
        if (hit) edge[i] = val;
      }
    };

    // the field's own pattern, in its second colour
    const rayY = heads[0].chin - len / 2;
    const pat = legend === 'Cosmos' ? 'Flat' : pattern, outl = legend === 'Cosmos' && outline !== 'Ink' ? 'Ink' : outline;
    const paintField = spin => {
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let on = false;
        if (pat === 'Halftone') {
          const d = Math.hypot((x + 0.5) / N - (stripeA > 0 ? 0 : 1), (y + 0.5) / N), mx = x % 4, my = y % 4;
          on = d < 0.6 ? mx >= 1 && mx <= 2 && my >= 1 && my <= 2 : d < 1.1 ? mx === 1 && my === 1 : false;
        } else if (pat === 'Stripes') on = (((x + stripeA * y) % 10) + 10) % 10 < 4;
        else if (pat === 'Rays') { const a = Math.atan2(y + 0.5 - rayY, x + 0.5 - 24) - spin; on = ((Math.floor(a / (Math.PI / 7)) % 2) + 2) % 2 === 0; }
        else if (pat === 'Split') { const xx = stripeA > 0 ? x : N - 1 - x; on = y >= 29 - Math.floor(xx / 3); }
        else if (pat === 'Checker') on = (((x >> 3) + (y >> 3)) & 1) === 1;
        else if (pat === 'Grid') on = x % 8 === 3 || y % 8 === 3;
        else if (pat === 'Zigzag') { const k = x % 8; on = ((y + (k < 4 ? k : 7 - k) * stripeA + 16) % 8) < 2; }
        bg[y * N + x] = on ? T_ : F_;
      }
    };
    let raysAt = 0;
    paintField(0);

    // ---------- the viewer charges it up ----------
    // A separate splitmix over the hash's fifth word (the figure's jsf stream is untouched) picks the key.
    let zq = parseInt(c.hash.slice(34, 42), 16) >>> 0;
    const zr = () => { zq = (zq + 0x9e3779b9) >>> 0; let z = zq; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
    const zapRoot = 60 + Math.floor(zr() * 7), run = [0, 3, 5, 7, 10, 12, 15, 17];
    let charge = 0, zaps = 0, lastZap = -9, prevT = 0, extra = 0, sway = 0;
    let legT = -9, legX = 24, legY = 24, haloT = -9, haloTop = 10, haloX = 24;
    const live = (t) => {
      const inp = c.input, dt = Math.max(Math.min(t - prevT, 0.1), 0); prevT = t;
      for (const zap of inp.taps()) {
        charge = Math.min(1.6, charge + 0.8);
        const n = zapRoot + run[zaps++ % run.length];
        c.sound.note(n, { dur: 0.09, vel: 0.15, wave: 'square', cutoff: 1300, pan: (zap.x - 0.5) * 0.7 });
        c.sound.note(n + 12, { dur: 0.16, vel: 0.1, wave: 'triangle', at: 0.05, pan: (zap.x - 0.5) * 0.7 });
        lastZap = t;
        const pan = (zap.x - 0.5) * 0.6;
        if (legend) {
          // each legendary answers a tap in its own voice
          legT = t; legX = zap.x * N; legY = zap.y * N;
          if (legend === 'Gold') [0, 4, 7, 12, 16, 19].forEach((k, i) => c.sound.note(zapRoot + 24 + k, { dur: 0.35, vel: 0.08, wave: 'triangle', at: 0.08 + i * 0.06, pan }));
          else if (legend === 'Cosmos') [0, 7, 14, 19, 26].forEach((k, i) => c.sound.note(zapRoot + 12 + k, { dur: 1.4, vel: 0.06, wave: 'sine', at: 0.1 + i * 0.12, pan: pan * (i % 2 ? -1 : 1) }));
          else { for (let i = 0; i < 7; i++) c.sound.hit('click', 0.12 + (i % 3) * 0.04, { at: 0.06 + i * (0.035 + (i * 7 % 5) * 0.012) }); c.sound.note(zapRoot - 12, { dur: 0.3, vel: 0.07, wave: 'square', cutoff: 600, at: 0.08 }); }
        }
        if (halo && Math.hypot(zap.x * N - haloX, zap.y * N - haloTop) < 9) {
          haloT = t;
          [24, 31, 36].forEach((k, i) => c.sound.note(zapRoot + k, { dur: 1.1, vel: 0.07, wave: 'sine', at: 0.04 + i * 0.09, pan }));
        }
      }
      if (inp.down && inp.inside) {
        charge = Math.max(charge, 0.9);
        if (t - lastZap > 0.42) { lastZap = t; c.sound.note(zapRoot + run[zaps++ % run.length] - 12, { dur: 0.12, vel: 0.1, wave: 'square', cutoff: 900 }); }
      }
      if (charge) { charge = Math.max(0, charge - dt * 0.9); extra += dt * charge * danceSpeed * 2.2; }
      const goal = inp.inside ? Math.max(-0.08, Math.min(0.08, (inp.x - 0.5) * 0.2)) : 0;
      if (goal || sway) { sway += (goal - sway) * Math.min(1, dt * 3); if (!goal && Math.abs(sway) < 1e-4) sway = 0; }
    };

    function scene(t) {
      // the dance steps on eighths of a second, like sprite frames
      const tq = Math.floor(t * 8) / 8;
      const sw = Math.sin(tq * danceSpeed + ph + extra) * (1 + charge * 1.6);
      const bob = Math.round(Math.abs(Math.sin(tq * danceSpeed * 0.5 + ph + extra * 0.5)) * (0.62 + charge * 1.1));
      const shear = lean0 + sway;
      const XS = (x, y) => x + shear * (50 - y);
      if (pat === 'Rays') { const st = Math.floor(t * 0.04 / 0.075) * stripeA; if (st !== raysAt) { raysAt = st; paintField(st * 0.075); } }
      buf.set(bg); fig.fill(0); edge.fill(0); armM.fill(0);

      const hs = heads.map(q => {
        const top = q.chin - len + 1 - bob, hc = top + len / 2;
        const ox = Math.round(shear * (50 - hc) + sw * 0.55);
        return { k: q.k, top, hc, x: q.cx + ox, ox };
      });
      // torso, head(s), then a short neck between them
      for (let r = 0; r < TORSO.length; r++) { const y = TY0 + r, w = TORSO[r]; for (let x = 24 - w; x < 24 + w; x++) fig[y * N + x] = 1; }
      for (const h of hs) for (let r = 0; r < len; r++) {
        const y = h.top + r; if (y < 0 || y >= N) continue;
        for (let x = h.x - prof[r] + shift[r]; x < h.x + prof[r] + shift[r]; x++) if (x >= 0 && x < N) fig[y * N + x] = 1;
      }
      if (head !== 'Twin') {
        const h = hs[0], y0 = h.top + len - 2;
        for (let y = y0; y < TY0 + 1; y++) { const xc = 24 + Math.round(h.ox * (TY0 + 1 - y) / (TY0 + 1 - y0)); for (let x = xc - NECK; x < xc + NECK; x++) fig[y * N + x] = 1; }
      } else for (const h of hs) { const y0 = h.top + len - 2; for (let y = y0; y < TY0 + 1; y++) { const xc = h.x - Math.round(h.ox * (y - y0) / (TY0 + 1 - y0)); for (let x = xc - 2; x < xc + 2; x++) fig[y * N + x] = 1; } }

      // arms: shoulder, elbow, hand, with a round mitt at the end
      const ar = 2.2, bones = [];
      const seg = (a, b, r) => { cap(XS(a[0], a[1]), a[1], XS(b[0], b[1]), b[1], r); if (r > 1.5 && (a[0] !== b[0] || a[1] !== b[1])) bones.push([XS(a[0], a[1]), a[1], XS(b[0], b[1]), b[1]]); };
      const hands = [];
      const arm = (s, el, hd, mitt) => { const sh = [24 + s * SHW, TY0 + 3.5]; seg(sh, el, ar); seg(el, hd, ar); seg(hd, hd, mitt || 2.8); hands.push([s, XS(hd[0], hd[1]), hd[1]]); };
      const H0 = hs[0], spanL = Math.min(...hs.map(h => h.x - hwMax)), spanR = Math.max(...hs.map(h => h.x + hwMax));
      const topY = Math.min(...hs.map(h => h.top));
      if (pose === 'Arms Up') for (const s of [-1, 1]) arm(s, [24 + s * 19.8, 30 - sw * 0.29 * s], [24 + s * (17.4 - sw * 0.58), 17.5 - sw * 0.48 * s]);
      else if (pose === 'Wave') {
        const s = waveSide, wv = Math.sin(tq * danceSpeed * 1.4 + extra) * 1.7 * (1 + charge);
        arm(s, [24 + s * 18.7, 29.8], [24 + s * (17.8 + wv), 17.3 + Math.abs(wv) * 0.3]);
      } else if (pose === 'Head Clutch') {
        const ey = H0.top + Math.round(len * eyeK) + 1;
        arm(-1, [Math.min(9.6, spanL - 3.5), 29.8], [spanL + 0.5, ey + sw * 0.25], 2.3);
        arm(1, [Math.max(38.4, spanR + 3.5), 29.8], [spanR - 0.5, ey - sw * 0.25], 2.3);
      } else if (pose === 'Hoop') {
        // both arms up and over, hands meeting above the head
        const top = topY - 8 + sw * 0.3;
        for (const s of [-1, 1]) { const hw2 = Math.min(10, (spanR - spanL) / 2), sh = [24 + s * SHW, TY0 + 3.5], e1 = [24 + s * (hw2 + 9.6), 27], e2 = [24 + s * (hw2 + 6.5), topY - 3.5]; seg(sh, e1, ar); seg(e1, e2, ar); seg(e2, [24 + s * 1.5, top], ar); }
      } else if (pose === 'Flex') for (const s of [-1, 1]) {
        const pump = Math.max(0, Math.sin(tq * danceSpeed + ph + extra)) * 0.58 * (1 + charge);
        arm(s, [24 + s * 20.6, 33.6], [24 + s * (17.3 - pump), 24 - pump], 3.0);
      } else if (pose === 'Cheer') {
        const s = waveSide, pump = Math.max(0, Math.sin(tq * danceSpeed * 1.2 + extra)) * 0.96 * (1 + charge);
        arm(s, [24 + s * 16.3, 27.8 - pump], [24 + s * 14.9, 14.4 - pump], 2.9);
      } else if (pose === 'Point') {
        const s = waveSide, jab = Math.max(0, Math.sin(tq * danceSpeed + extra)) * 0.6;
        const fx = 24 + s * (17.8 + jab), fy = 16.3 - jab;
        arm(s, [24 + s * 19.2, 30.7], [fx, fy]);
        seg([fx, fy], [fx + s * 0.8, fy - 4.2], 1.05);
      } else if (pose === 'Shrug') for (const s of [-1, 1]) {
        const lift = Math.abs(Math.sin(tq * danceSpeed * 0.7 + ph + extra)) * 0.6;
        arm(s, [24 + s * 17.8, 38.4 - lift], [24 + s * 19.7, 30.2 - lift * 2], 2.7);
      }

      // a prop needs a hand: the one-armed poses (and hands-down) raise the free hand to hold it
      if (prop !== 'None' && (pose === 'Wave' || pose === 'Cheer' || pose === 'Point' || pose === 'Hands Down')) {
        const s = pose === 'Hands Down' ? propSide : -waveSide, lift2 = Math.round(Math.sin(tq * danceSpeed + ph + extra) * 0.6 * (1 + charge));
        arm(s, [24 + s * (SHW + 6.5), TY0 - 1], [24 + s * (SHW + 5), TY0 - 8 - lift2]);
      }
      for (let i = 0; i < N * N; i++) if (armM[i]) fig[i] = 1;
      const ringC = outl === 'Colour' ? FD_ : outl === 'Neon' ? NE_ : K_;
      // the outline: one ink cell (two when heavy; a white cut-out and a drop shadow for stickers)
      grow(1, false);
      if (outl === 'Heavy') grow(2, true);
      if (outl === 'Neon') grow(2, false);
      if (outl === 'Shadow') for (let y = N - 1; y > 1; y--) for (let x = N - 1; x > 1; x--) { const i = y * N + x; if (!fig[i] && !edge[i] && [i - N - 1, i - 2 * N - 2].some(j => fig[j] || edge[j] === 1)) edge[i] = 7; }
      if (outl === 'Sticker') {
        grow(3, false); grow(4, true);
        for (let y = N - 1; y > 0; y--) for (let x = N - 1; x > 0; x--) { const i = y * N + x, j = i - N - 1; if (!fig[i] && !edge[i] && (fig[j] || edge[j] && edge[j] !== 5)) edge[i] = 5; }
      }
      for (let i = 0; i < N * N; i++) {
        if (fig[i]) { buf[i] = B_; continue; }
        const e = edge[i];
        if (e === 1) buf[i] = chalk && ((i % N) * 3 + ((i / N) | 0) * 5) % 11 === 0 ? CD_ : ringC;
        else if (e === 2) buf[i] = K_;
        else if (e === 7) buf[i] = SD_;
        else if (e === 3 || e === 4) buf[i] = W_;
        else if (e === 5) buf[i] = SD_;
      }
      // where an arm crosses the body it keeps its own line
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (fig[i] && !armM[i] && !(y >= TY0 && Math.abs(x + 0.5 - 24) < TORSO[y - TY0]) && ((x > 0 && armM[i - 1]) || (x < N - 1 && armM[i + 1]) || (y > 0 && armM[i - N]) || (y < N - 1 && armM[i + N]))) { edge[i] = 6; buf[i] = ringC; }
      }

      // ---------- the print on its body ----------
      if (bodyPrint !== 'Solid' && !legend) for (let y = TY0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (!fig[i] || edge[i] || Math.abs(x + 0.5 - 24) >= TORSO[y - TY0]) continue;
        let v = -1;
        if (bodyPrint === 'Striped') { if ((y - 36) % 4 < 2) v = P2_; }
        else if (bodyPrint === 'Spotted') { if (y % 5 < 2 && (x + (Math.floor(y / 5) % 2) * 3) % 6 < 2) v = P2_; }
        else if (bodyPrint === 'Split') { if (x >= 24) v = P2_; }
        else if (bodyPrint === 'Belted') { if (y === 44 || y === 45) v = (x === 23 || x === 24) ? (y === 44 ? W_ : M_) : K_; }
        else if (y >= 36 && (x === 23 || x === 24)) v = x === 24 && y % 2 ? W_ : K_;
        if (v >= 0) buf[i] = chalk && v === P2_ ? CD_ : v;
      }

      // ---------- legendary skins ----------
      const inp = c.input, hoverX = inp.inside ? inp.x * N : -99, hoverY = inp.inside ? inp.y * N : -99;
      const eyeAt = h => { const er = h.top + Math.round(len * eyeK), ri = er - h.top, e = Math.max(2, Math.round(prof[ri] * 0.3)); return { er, sx: h.x + shift[ri], e, mr: er + Math.max(3, Math.round(len * 0.28)) }; };
      if (legend === 'Gold') {
        // bevelled metal: light on the upper-left edges, shadow on the lower-right, and a glint
        // band that runs across on its own, or sits under the pointer
        const band = inp.inside ? hoverX + hoverY - 1 : ((t * 8) % 150) - 30;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x; if (!fig[i] || edge[i]) continue;
          const r = x < N - 1 && !fig[i + 1], b = y < N - 1 && !fig[i + N], l = x > 0 && !fig[i - 1], u = y > 0 && !fig[i - N];
          let v = r || b ? X1 : l || u ? X2 : B_;
          const d = x + y - band;
          if (v !== X1 && d >= 0 && d < 2) v = X3; else if (v !== X1 && d >= -1 && d < 3) v = X2;
          buf[i] = v;
        }
      } else if (legend === 'Cosmos') {
        // the figure is a window onto deep space; the pointer opens it wider
        const n0 = starSeed[0][2] * 6, n1 = starSeed[1][2] * 6;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x; if (!fig[i] || edge[i]) continue;
          const neb = Math.sin(x * 0.29 + y * 0.17 + n0) + Math.sin(y * 0.23 - x * 0.13 + n1 + t * 0.05);
          const near = Math.hypot(x + 0.5 - hoverX, y + 0.5 - hoverY) < 7;
          buf[i] = neb > (near ? 0.9 : 1.3) ? X4 : neb > (near ? 0.1 : 0.6) ? X3 : B_;
        }
        for (let k = 0; k < starSeed.length; k++) {
          const [sx, sy, q] = starSeed[k], i = sy * N + sx, near = Math.hypot(sx + 0.5 - hoverX, sy + 0.5 - hoverY) < 7;
          const on = near || ((t * 0.6 + q * 7) % 3) < 2.3;
          if (fig[i] && !edge[i]) buf[i] = on ? X1 : X2;
          else if (!edge[i] && q < 0.35) buf[i] = X2;
        }
      } else if (legend === 'X-Ray') {
        // a skeleton under the skin; a scan line follows the pointer (or drifts down on its own)
        const bone = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N && fig[y * N + x] && !edge[y * N + x]) buf[y * N + x] = v; };
        for (const h of hs) {
          for (let r = 2; r < len - 1; r++) { const w = prof[r] - 2; if (w <= 0) continue; for (let x = h.x - w + shift[r]; x < h.x + w + shift[r]; x++) bone(x, h.top + r, x === h.x + w + shift[r] - 1 || r === len - 2 ? X2 : X1); }
          const { er, sx, e, mr } = eyeAt(h);
          for (const x0 of [sx - e - 3, sx + e - 1]) for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) if (j === 1 || (k > 0 && k < 3)) bone(x0 + k, er + j, B_);
          bone(sx - 1, er + 3, B_); bone(sx, er + 3, B_);
          for (let x = sx - e; x < sx + e; x++) bone(x, mr, x % 2 ? B_ : X1);
        }
        const neckTop = head === 'Twin' ? 36 : hs[0].top + len - 1;
        for (let y = neckTop; y < N; y++) { bone(23, y, y % 2 ? X1 : X2); bone(24, y, y % 2 ? X1 : X2); }
        for (let k = 0; k < 4; k++) { const y = 38 + k * 2, w = 10 - k; for (let x = 24 - w; x < 24 + w; x++) if (x < 23 || x > 24) bone(x, y, X1); bone(24 - w, y + 1, X2); bone(24 + w - 1, y + 1, X2); }
        for (const [x0, y0, x1, y1] of bones) walk(x0, y0, x1, y1, (x, y) => bone(x, y, X1));
        const scanY = inp.inside ? Math.floor(hoverY) : Math.floor((t * 5) % 64) - 8, flash = t - legT < 0.3;
        for (let i = 0; i < N * N; i++) if (fig[i] && !edge[i]) {
          const y = (i / N) | 0, v = buf[i], isBone = v === X1 || v === X2;
          if (flash || y === scanY || y === scanY + 1) buf[i] = isBone ? X4 : v === B_ ? X3 : v;
        }
      }

      // a bulb head has a screw base and a glint on the glass
      if (head === 'Bulb') for (const h of hs) {
        for (const r of [len - 4, len - 2]) { const y = h.top + r; rect(h.x - prof[r], y, prof[r] * 2, 1, K_); }
        rect(h.x - prof[3] + 2, h.top + 2, 1, 2, W_); put(h.x - prof[3] + 3, h.top + 2, W_);
      }

      // ---------- where the prop goes: in the hand, kept on the sheet and clear of the head; the buzz keeps off it ----------
      let PP = null;
      propM.fill(0);
      if (prop !== 'None' && hands.length) {
        const want = pose === 'Hands Down' || pose === 'Arms Up' || pose === 'Flex' || pose === 'Shrug' ? propSide : -waveSide;
        const hd = hands.find(q => q[0] === want) || hands[hands.length - 1];
        const hx = Math.round(hd[1]), hy = Math.round(hd[2]) - 2, s = hd[0];
        let rows, x0, y0;
        if (prop === 'Mic') { rows = PROP_SPR.Mic; x0 = hx - 4; y0 = hy - 12; }
        else if (prop === 'Can') { rows = PROP_SPR.Can; x0 = hx - 3; y0 = hy - 8; }
        else if (prop === 'Balloon') { rows = PROP_SPR.Balloon; x0 = hx - 4 + s + Math.round(Math.sin(t * 1.3 + ph) * 1.2); y0 = Math.max(0, hy - 23); }
        else { rows = PROP_SPR.Pennant[Math.floor(t * 3 + ph) % 2]; if (s < 0) rows = rows.map(r => r.split('').reverse().join('')); x0 = s > 0 ? hx : hx - rows[0].length + 1; y0 = Math.max(1, hy - 21); }
        const w = rows[0].length, h = rows.length;
        x0 = s < 0 ? Math.min(x0, Math.round(spanL) - 3 - w) : Math.max(x0, Math.round(spanR) + 3);
        x0 = Math.max(0, Math.min(N - w, x0));
        PP = { rows, x0, y0, hx, hy, s };
        for (let y = y0 - 1; y <= y0 + h; y++) for (let x = x0 - 1; x <= x0 + w; x++) if (x >= 0 && y >= 0 && x < N && y < N) propM[y * N + x] = 1;
      }

      // ---------- the buzz around the head ----------
      behind = true;
      if (buzz !== 'Silent') {
        const pulse = Math.round(0.5 + 0.5 * Math.sin(t * 5.2 + ph + extra * 3));
        const bx = (spanL + spanR) / 2, by = topY + len / 2;
        const rx = (spanR - spanL) / 2 + 2.5, ry = len / 2 + 2.5;
        const out = pulse + charge * 2.4, L = 2.4 * (1 + charge * 0.9);
        const P = (a, d) => [bx + Math.cos(a) * (rx + d), by + Math.sin(a) * (ry + d)];
        for (let i = 0; i < nBuzz; i++) {
          const a = -Math.PI / 2 + (i / (nBuzz - 1) - 0.5) * buzzSpread * 1.35;
          const ca = Math.cos(a), sa = Math.sin(a);
          if (buzz === 'Dashes' || buzz === 'Double Dashes' || buzz === 'Zaps' || buzz === 'Arcs' || buzz === 'Dots') {
            // a mark that would land in a crack beside the figure is left out
            const [mx0, my0] = P(a, out + L / 2); let crowd = 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const x = Math.floor(mx0) + dx, y = Math.floor(my0) + dy; if (x >= 0 && y >= 0 && x < N && y < N && (fig[y * N + x] || edge[y * N + x])) crowd++; }
            if (crowd > 1) continue;
          }
          if (buzz === 'Dashes') { const [x0, y0] = P(a, out), [x1, y1] = P(a, out + L); line(x0, y0, x1, y1, K_); }
          else if (buzz === 'Double Dashes') for (const o of [-1.1, 1.1]) { const [x0, y0] = P(a, out), [x1, y1] = P(a, out + L * 0.8); line(x0 - sa * o, y0 + ca * o, x1 - sa * o, y1 + ca * o, K_); }
          else if (buzz === 'Arcs') {
            if (i % 2) continue;
            for (const [d, hw] of [[out + 0.6, 0.2], [out + 2.8, 0.15]]) {
              const p0 = P(a - hw, d), p1 = P(a, d), p2 = P(a + hw, d);
              line(p0[0], p0[1], p1[0], p1[1], K_); line(p1[0], p1[1], p2[0], p2[1], K_);
            }
          } else if (buzz === 'Zaps') {
            const pts = [[out, 0], [out + L / 3, 1], [out + 2 * L / 3, -1], [out + L, 0]].map(([d, o]) => { const [x, y] = P(a, d); return [x - sa * o, y + ca * o]; });
            for (let k = 0; k < 3; k++) line(pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], K_);
          } else if (buzz === 'Dots') { const [x, y] = P(a, out + 1); rect(Math.round(x) - 1, Math.round(y) - 1, 2, 2, K_); }
          else {
            if (buzz === 'Sweat' && Math.abs(ca) < 0.35) continue;
            if ((buzz === 'Notes' || buzz === 'Questions' || buzz === 'Hearts') && i % 2) continue;
            const drift = buzz === 'Notes' || buzz === 'Hearts' ? Math.round(Math.sin(t * 1.3 + i) * 0.9) : 0;
            const [x, y] = P(a, out + 2.2), gx = Math.round(x), gy = Math.round(y) - Math.abs(drift);
            if (gx >= 0 && gy >= 0 && gx < N && gy < N && (fig[gy * N + gx] || edge[gy * N + gx])) continue;
            if (buzz === 'Hearts') sprC(HEART7, gx, gy);
            else if (buzz === 'Sweat') sprC(SWEAT, gx, gy);
            else if (buzz === 'Notes') sprC(NOTE, gx, gy);
            else if (buzz === 'Sparkles') sprC(charge > 0.4 || (Math.floor(t * 2.6) + i) % 4 ? SPARK : TWINKLE, gx, gy);
            else if (buzz === 'Spirals') { let s = SPIRAL5; for (let k = (Math.floor(t * 2) + i) % 4; k > 0; k--) s = turn(s); sprC(s, gx, gy); }
            else sprC(QUEST, gx, gy);
          }
        }
      }

      // ---------- faces, placed cell by cell ----------
      behind = false;
      const blink = ((t + ph) % 3.7) < 0.15;
      if (legend !== 'X-Ray') for (const h of hs) {
        const top = h.top, er = top + Math.round(len * eyeK), ri = er - top;
        const hwE = prof[ri], sx = h.x + shift[ri], e = Math.max(2, Math.round(hwE * 0.3));
        const mr = er + Math.max(3, Math.round(len * 0.28)), mx = h.x + shift[Math.min(len - 1, mr - top)];
        const dots = () => { for (const x0 of [sx - e - 2, sx + e]) blink ? rect(x0, er + 1, 2, 1, K_) : rect(x0, er, 2, 2, K_); };
        if (face === 'Dot Eyes' || face === 'Third Eye') dots();
        else if (face === 'Shout') { dots(); sprC(SHOUT[Math.sin(t * 4 + ph) > 0.2 || charge > 0.5 ? 1 : 0], mx, mr + 1); }
        else if (face === 'Grin') { dots(); rect(mx - e - 1, mr + 1, e * 2 + 2, 1, K_); put(mx - e - 2, mr, K_); put(mx + e + 1, mr, K_); }
        else if (face === 'Hole') ringAt(sx + 2, er + 1.5, 0, 3.6, K_), ringAt(sx + 2, er + 1.5, 0, 2.6, -1);
        else if (face === 'Happy') { spr(['.KK.', 'K..K'], sx - e - 3, er); spr(['.KK.', 'K..K'], sx + e - 1, er); spr(['K..K', '.KK.'], mx - 2, mr); }
        else if (face === 'X Eyes') {
          const X3 = ['K.K', '.K.', 'K.K'];
          spr(X3, sx - e - 2, er); spr(X3, sx + e - 1, er);
          spr(Math.sin(t * 3 + ph) > 0 ? ['.KK.', 'K..K'] : ['.KK..', 'K..KK'], mx - 2, mr);
        } else if (face === 'Shades') {
          rect(sx - hwE + 1, er - 1, hwE * 2 - 2, 1, K_);
          for (const x0 of [sx - e - 3, sx + 1]) { rect(x0, er, e + 2, 1, K_); rect(x0 + 1, er + 1, e, 1, K_); }
          put(sx - e - 2, er, GL_); put(sx + 2, er, GL_);
        } else if (face === 'Cyclops') {
          if (blink) rect(sx - 4, er + 1, 8, 1, K_);
          else {
            spr(['.KKKKKK.', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', '.KKKKKK.'], sx - 4, er - 1);
            const look = Math.max(-2, Math.min(2, Math.round(Math.sin(t * 0.6 + ph) * 1.6 + sway * 14)));
            rect(sx - 1 + look, er, 2, 3, K_);
          }
        }
        if (face === 'Third Eye') spr(['.KKKK.', 'KMKKMK', '.KKKK.'], sx - 3, top + 1);
        // cheeks
        const cr = er + 3, cl = sx - e - 3, crr = sx + e + 1;
        if (cheeks === 'Blush') { rect(cl, cr, 2, 1, BL_); rect(crr, cr, 2, 1, BL_); }
        else if (cheeks === 'Freckles') for (const x0 of [cl, crr]) { put(x0, cr, FD_); put(x0 + 2, cr, FD_); put(x0 + 1, cr + 1, FD_); }
        else if (cheeks === 'Band-Aid') spr(['AAAA', 'AWWA'], crr - 1, cr - 1);
        else if (cheeks === 'Tear') { const d = Math.floor((t * 1.6 + ph) % 3); put(sx - e - 2, er + 2 + d, SH_); put(sx - e - 2, er + 3 + d, SW_); }
        else if (cheeks === 'Scar') line(sx + e + 3, er - 2, sx + e - 1, er + 3, FD_);
        // headwear
        const span = r => [h.x - prof[r] + shift[r], h.x + prof[r] + shift[r]];
        if (headwear === 'Beanie' || headwear === 'Cap') {
          for (let r = 0; r < 3; r++) { const [a, b] = span(r); for (let x = a; x < b; x++) put(x, top + r, r === 2 && headwear === 'Beanie' ? (x % 2 ? HT2_ : HT_) : HT_); }
          if (headwear === 'Beanie') spr(['.KK.', 'KWWK', 'KWWK'], h.x - 2, top - 3);
          else {
            put(h.x - 1, top, HT2_); put(h.x, top, HT2_);
            const [a, b] = span(3), s = waveSide; for (let x = a; x < b; x++) put(x, top + 3, HT2_);
            const e0 = s > 0 ? b : a - 1;
            for (let k = 0; k < 4; k++) { put(e0 + s * k, top + 2, K_); put(e0 + s * k, top + 3, HT2_); put(e0 + s * k, top + 4, K_); }
            put(e0 + s * 4, top + 3, K_);
          }
        } else if (headwear === 'Bandana') {
          for (const r of [2, 3]) { const [a, b] = span(r); for (let x = a; x < b; x++) put(x, top + r, r === 2 && x % 3 === 0 ? W_ : HT_); }
          const [, b] = span(2); spr(['KK..', 'TTK.', 'KTTK', '.KTK', '..K.'], b, top + 1);
        } else if (headwear === 'Party Hat') spr(['....WW....', '....KK....', '...KTTK...', '...KMTK...', '..KTTTTK..', '..KTTMTK..', '.KTMTTTTK.', '.KTTTTMTK.', 'KKKKKKKKKK'], h.x - 5, top - 9);
        else if (headwear === 'Bow') spr(['KK..KK', 'KTKKTK', 'KTTUTK', 'KTKKTK', 'KK..KK'], h.x + 1, top - 3);
        else if (headwear === 'Antenna') {
          const lean = Math.round(sw * 0.7);
          for (let k = 1; k <= 4; k++) put(h.x - 1 + Math.round(lean * k / 4), top - k, K_);
          spr(['.KK.', 'KMMK', 'KMMK', '.KK.'], h.x - 2 + lean, top - 8);
        } else if (headwear === 'Sprout') spr(['KKK....KKK', 'KLLK..KLLK', 'KLLLKKLLLK', '.KLLLLLLK.', '..KKLLKK..', '...KLLK...', '...KLLK...'], h.x - 5, top - 7);
      }

      // ---------- the sign on its chest ----------
      const cx = 24, cy = 41;
      if (legend !== 'X-Ray' || chest === 'Heart') {
      if (chest === 'Heart') sprC(Math.max(0, Math.sin(t * 6.2 + ph)) > 0.8 ? HEART10 : HEART8, cx, cy);
      else if (chest === 'Hole') { ringAt(cx, cy + 0.5, 0, 3.7, K_); ringAt(cx, cy + 0.5, 0, 2.7, -1); }
      else if (chest === 'Stripes') for (let k = 0; k < 3; k++) rect(13, 38 + k * 3, 22, 1, K_);
      else if (chest === 'Spiral') { let s = SPIRAL7; for (let k = Math.floor(t * 1.3) % 4; k > 0; k--) s = turn(s); sprC(s, cx, cy); }
      else if (chest === 'Star') sprC(STAR, cx, cy);
      else if (chest === 'Bolt') sprC(BOLT, cx, cy);
      else if (chest === 'Target') { const k = charge > 0.5 ? 1 : 0; ringAt(cx, cy + 0.5, 0, 4.6 + k, K_); ringAt(cx, cy + 0.5, 0, 3.6 + k, M_); ringAt(cx, cy + 0.5, 0, 2.5 + k, B_); ringAt(cx, cy + 0.5, 0, 1.45 + k * 0.5, M_); }
      else if (chest === 'Buttons') for (let k = 0; k < 3; k++) spr(BUTTON, cx - 2, 37 + k * 4);
      else if (chest === 'Smiley') sprC(['..KKKK..', '.KMMMMK.', 'KMKMMKMK', 'KMMMMMMK', 'KMKMMKMK', 'KMMKKMMK', '.KMMMMK.', '..KKKK..'], cx, cy);
      else if (chest === 'Pocket') { rect(14, 39, 7, 1, K_); rect(14, 39, 1, 5, K_); rect(20, 39, 1, 5, K_); rect(14, 43, 7, 1, K_); rect(16, 36, 1, 3, M_); put(16, 35, K_); rect(18, 37, 1, 2, W_); }
      else if (chest === 'Number') {
        const DIG = [['KKK', 'K.K', 'K.K', 'K.K', 'KKK'], ['.K.', 'KK.', '.K.', '.K.', 'KKK'], ['KKK', '..K', 'KKK', 'K..', 'KKK'], ['KKK', '..K', '.KK', '..K', 'KKK'], ['K.K', 'K.K', 'KKK', '..K', '..K'], ['KKK', 'K..', 'KKK', '..K', 'KKK'], ['KKK', 'K..', 'KKK', 'K.K', 'KKK'], ['KKK', '..K', '.K.', '.K.', '.K.'], ['KKK', 'K.K', 'KKK', 'K.K', 'KKK'], ['KKK', 'K.K', 'KKK', '..K', 'KKK']];
        const ds = String(numV).split('').map(Number), w0 = ds.length * 4 - 1, x0 = 24 - (w0 >> 1) - 1;
        rect(x0 - 1, cy - 4, w0 + 2, 7, M_);
        ds.forEach((d, k) => spr(DIG[d], x0 + k * 4, cy - 3));
      }
      else if (chest === 'Eye') { sprC(EYE, cx, cy); rect(cx - 1 + Math.max(-2, Math.min(1, Math.round(sway * 20))), cy - 1, 2, 3, K_); }

      }

      // ---------- the prop in its hand ----------
      if (PP) {
        const { rows, x0, y0, hx, hy, s: ps } = PP, w = rows[0].length, h = rows.length;
        if (prop === 'Balloon') line(hx, hy, x0 + (w >> 1), y0 + h - 1, K_);
        else if (prop === 'Pennant') { const px = ps > 0 ? x0 : x0 + w - 1; for (let y = y0 - 1; y <= y0 + h; y++) put(px, y, K_); line(px, y0 + h, hx, hy, K_); }
        spr(rows, x0, y0);
      }

      // ---------- the coveted halo: hovers over the head, a glint runs round it ----------
      if (halo) {
        const h = hs.reduce((a, b) => (b.top < a.top ? b : a)), near = Math.hypot(hoverX - h.x, hoverY - h.top) < 12;
        const lift = Math.round(0.5 + 0.5 * Math.sin(t * 1.6)) + (near ? 1 : 0);
        const x0 = h.x - 6, y0 = Math.max(0, h.top - (pose === 'Hoop' ? 19 : 7) - lift);
        haloX = h.x; haloTop = y0 + 2;
        const lit = t - haloT < 0.35;
        spr(HALO.map(r => lit ? r.replace(/[YD]/g, 'W') : r), x0, y0);
        const g = HALO_RING[Math.floor(t * (near ? 14 : 5)) % HALO_RING.length];
        put(x0 + g[0], y0 + g[1], W_);
      }
      // ---------- legendary tap answers ----------
      const since = t - legT;
      if (legend === 'Gold' && since < 0.7) {
        const r = 2 + since * 14;
        for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + 0.3; sprC(since < 0.35 ? SPARK : TWINKLE, Math.round(legX + Math.cos(a) * r), Math.round(legY + Math.sin(a) * r)); }
      } else if (legend === 'Cosmos' && since < 0.9) {
        // a shooting star crosses where it was touched
        const hx2 = Math.round(legX - 12 + since * 30), hy2 = Math.round(legY - 7 + since * 15);
        for (let k = 0; k < 6; k++) put(hx2 - k * 2, hy2 - k, k === 0 ? W_ : k < 3 ? X1 : X2), put(hx2 - k * 2 - 1, hy2 - k, k < 2 ? X1 : X2);
      }

      for (let i = 0; i < N * N; i++) px[i] = P32[buf[i]];
      cg.putImageData(img, 0, 0);
      p.setTransform(1, 0, 0, 1, 0, 0);
      p.imageSmoothingEnabled = false;
      p.drawImage(cv, 0, 0, N, N, 0, 0, S, S);
    }
    scene(0);
    return function frame(t) { live(t); scene(t); };
  },
});

})(window.Proto);
