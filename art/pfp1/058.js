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
    if (legend === 'Gold') { FIELD = '#1c1330'; TINT = '#291c46'; FILL = '#f5bd2e'; LINE = '#3d2205'; MARK = '#fff0a0'; XC = ['#b8760c', '#ffe680', '#fffbe0', '#7a4806']; }
    else if (legend === 'Cosmos') { FIELD = '#06081a'; TINT = '#0d1236'; FILL = '#e5e9f1'; LINE = '#151a3a'; MARK = '#ff5fa8'; XC = ['#ffffff', '#7f8ad8', '#3a2a88', '#b04ab0']; }
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

    // ---------- the legendaries: each one a picture of its own (2026-10-19, pass 2 the same day) ----------
    // Gold: the figure cast as a polished gold trophy on a black marble plinth under a spotlight on a red stage
    // curtain, confetti falling. The spotlight follows the pointer; hold for a drumroll (the house lights dim and the
    // light closes in), let go for the cannons; tap for a camera flash.
    // Cosmos: the figure as an astronaut in a white suit, its head (in its own fill colour) in a glass fishbowl
    // helmet, a ringed planet and drifting stars. Drag to fly (the stars and the planet stream past the other way),
    // hold still to jump to warp, tap to fire the thrusters.
    // X-Ray: the figure's film clipped to a lightbox: soft tissue in blue, a whole skeleton dancing, something it
    // swallowed glowing in its belly. The pointer is a scanner that shows the figure in colour; tap to rattle the
    // bones; hold on what it swallowed to pull it out, and drag it away.
    const LG = !legend ? null : (() => {
      const add = (h) => { PAL.push(h); P32.push((0xff000000 | parseInt(h.slice(5, 7), 16) << 16 | parseInt(h.slice(3, 5), 16) << 8 | parseInt(h.slice(1, 3), 16)) >>> 0); return PAL.length - 1; };
      const at = (x, y) => x >= 0 && y >= 0 && x < N && y < N;
      const BG = new Uint8Array(N * N), BGT = new Uint8Array(N * N), D = new Uint8Array(N * N), HM = new Uint8Array(N * N);
      // how far each figure cell lies from the outside, for rounded shading
      const depth = () => {
        for (let i = 0; i < N * N; i++) D[i] = fig[i] ? 99 : 0;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; if (D[i]) D[i] = Math.min(D[i], (x ? D[i - 1] : 0) + 1, (y ? D[i - N] : 0) + 1); }
        for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) { const i = y * N + x; if (D[i]) D[i] = Math.min(D[i], (x < N - 1 ? D[i + 1] : 0) + 1, (y < N - 1 ? D[i + N] : 0) + 1); }
      };
      const headMask = (hs) => { HM.fill(0); for (const h of hs) for (let r = 0; r < len; r++) { const y = h.top + r; if (y < 0 || y >= N) continue; for (let x = h.x - prof[r] + shift[r]; x < h.x + prof[r] + shift[r]; x++) if (x >= 0 && x < N) HM[y * N + x] = 1; } };
      const isOut = (i) => !fig[i];
      // the scenery's own small stream (from the stars already rolled)
      let sr = Math.floor(starSeed[2][2] * 4294967296) >>> 0 || 7;
      const rnd = () => { sr ^= sr << 13; sr >>>= 0; sr ^= sr >>> 17; sr ^= sr << 5; sr >>>= 0; return sr / 4294967296; };
      // the pointer as gestures (press, drag, hold, release; a click is a short press that didn't move)
      const g = { down: false, t0: 0, x0: 0, y0: 0, x: 0.5, y: 0.5, px: 0.5, py: 0.5, moved: 0, last: -1, dt: 1 / 30, press: false, release: false, hold: 0, held: 0, click: false };
      let tapsSeen = 0;
      const track = (t, inp) => {
        if (t === g.last) return;
        g.dt = Math.max(0.001, Math.min(0.1, t - g.last)); g.last = t; g.press = g.release = g.click = false;
        g.px = g.x; g.py = g.y;
        if (inp.inside || inp.down) { g.x = inp.x; g.y = inp.y; }
        if (inp.down && !g.down) { g.down = true; g.press = true; g.t0 = t; g.x0 = g.px = g.x; g.y0 = g.py = g.y; g.moved = 0; }
        else if (!inp.down && g.down) { g.down = false; g.release = true; g.held = t - g.t0; g.click = g.moved < 0.03 && g.held < 0.35; }
        else if (!inp.down && zaps !== tapsSeen) { g.click = true; g.held = 0; g.moved = 0; }   // a tap that came and went between frames
        tapsSeen = zaps;
        if (g.down) g.moved = Math.max(g.moved, Math.hypot(g.x - g.x0, g.y - g.y0));
        g.hold = g.down && g.moved < 0.03 ? t - g.t0 : 0;
      };
      const stamp = (rows, x0, y0, map) => { for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) { const v = map[rows[j][i]]; if (v !== undefined && at(x0 + i, y0 + j)) buf[(y0 + j) * N + x0 + i] = v; } };
      let o;
      if (legend === 'Gold') {
        // pass 3: a gold bust on a narrow pedestal on a dark stage, a visible beam of light and its pool on the boards
        const C = {
          cur: [add('#1d0508'), add('#28070b'), add('#340a0f'), add('#410d14')], lit: [add('#6a1822'), add('#84202c'), add('#a02a37'), add('#bd3a46')], hot: [add('#a8343f'), add('#c2484f'), add('#d9605f'), add('#ec7a72')], beam: add('#5a141c'),
          val: add('#160307'), valL: add('#2a070d'), fringe: add('#c9962a'), g: [add('#5c3404'), add('#985b09'), add('#d08e16'), add('#f4bb2c'), add('#ffe07a'), add('#fffbe3')],
          mar: add('#18171d'), marL: add('#3a3946'), marV: add('#2b2a33'), marD: add('#09090c'), conf: ['#ff3b30', '#1f6fff', '#ffd400', '#00b86b', '#ff7ac4', '#ffffff'].map(add),
          board: add('#24120b'), boardL: add('#1a0c07'), pool: add('#6e3c20'), poolL: add('#a0643a'), black: add('#0b0204'), flash: add('#fff4ec'),
        };
        const FOLD = new Uint8Array(N * N);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          // stage curtain folds; a valance with a gold fringe on top (253-255 mark the valance and fringe)
          const f = Math.sin(x * 0.62 + Math.sin(y * 0.09) * 0.8) + 0.45 * Math.sin(x * 1.3 + 1.7);
          const vb = 3 + (Math.abs(((x + 4) % 8) - 4) < 2 ? 1 : 0);
          FOLD[y * N + x] = y < vb ? (y === 1 ? 253 : 255) : y === vb && (x & 1) === 0 ? 254 : f > 0.9 ? 3 : f > 0.1 ? 2 : f > -0.7 ? 1 : 0;
        }
        const FLOOR = 41, P0 = 15, P1 = 32;   // the stage boards start at row 41; the pedestal's columns
        // pass 4: a gold statuette of the figure (its own head shape, a headband, an embossed face) raising a cup in
        // both hands, standing on a pedestal with a plaque: 1 gold, 2 engraved, 3 the headband
        const SM = new Uint8Array(N * N), SO = new Uint8Array(N * N), SD = new Uint8Array(N * N), SN = [];
        {
          const fill = (fn, v, x0, y0, x1, y1) => { for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(N - 1, y1); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(N - 1, x1); x++) if (fn(x + 0.5, y + 0.5)) SM[y * N + x] = v; };
          const cap = (ax, ay, bx, by, r) => fill((x, y) => { const dx = bx - ax, dy = by - ay, u = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1))); return (x - ax - u * dx) ** 2 + (y - ay - u * dy) ** 2 <= r * r; }, 1, Math.min(ax, bx) - r - 1, Math.min(ay, by) - r - 1, Math.max(ax, bx) + r + 1, Math.max(ay, by) + r + 1);
          const disc = (cx, cy, r, v) => fill((x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r, v, cx - r - 1, cy - r - 1, cx + r + 1, cy + r + 1);
          const L2 = Math.min(len, 14), HT = 27 - L2, cy0 = HT - 11;
          // the cup, held up: a bowl with a lip, a stem, a foot, and a handle each side for the hands
          for (let y = cy0; y <= cy0 + 5; y++) { const hw = y === cy0 ? 6 : 5.2 - (y - cy0) * 0.6; for (let x = Math.round(24 - hw); x < Math.round(24 + hw); x++) if (y >= 0) SM[y * N + x] = 1; }
          for (let y = cy0 + 6; y <= cy0 + 7; y++) for (let x = 23; x <= 24; x++) if (y >= 0) SM[y * N + x] = 1;
          for (let x = 21; x <= 26; x++) if (cy0 + 8 >= 0) SM[(cy0 + 8) * N + x] = 1;
          for (const sd of [-1, 1]) fill((x, y) => { const d = Math.hypot(x - 24 - sd * 6.2, y - cy0 - 2.5); return d <= 1.8 && d > 0.8; }, 1, 24 + sd * 6.2 - 3, cy0, 24 + sd * 6.2 + 3, cy0 + 5);
          // two arms raised from the shoulders, out at the elbow and up to the cup's handles
          for (const sd of [-1, 1]) { cap(24 + sd * 6, 30, 24 + sd * 11.5, 22, 1.7); cap(24 + sd * 11.5, 22, 24 + sd * 7.5, cy0 + 3, 1.5); disc(24 + sd * 7.5, cy0 + 2.8, 1.9, 1); }
          // the body: shoulders, a chest narrowing to the base, a neck
          fill((x, y) => y >= 28 && y < 38 && Math.abs(x - 24) < 6.5 - (y - 28) * 0.25, 1, 16, 28, 32, 38);
          for (const sd of [-1, 1]) disc(24 + sd * 5.5, 30, 2.2, 1);
          for (let y = 26; y <= 28; y++) for (let x = 22; x <= 25; x++) SM[y * N + x] = 1;
          // the head: the print's own profile, at most fourteen rows and seven cells either side
          for (let r = 0; r < L2; r++) { const src = Math.floor(r * len / L2), w = Math.min(7, prof[src]); for (let x = 24 - w; x < 24 + w; x++) SM[(HT + r) * N + x] = 1; }
          // the headband, and a face embossed in the gold: two eyes and a smile
          for (let r = 2; r <= 3; r++) for (let x = 0; x < N; x++) if (SM[(HT + r) * N + x] === 1) SM[(HT + r) * N + x] = 3;
          const er = HT + Math.round(L2 * 0.48), mr = er + 4;
          for (const [x, y] of [[20, er], [21, er], [20, er + 1], [21, er + 1], [26, er], [27, er], [26, er + 1], [27, er + 1], [21, mr], [22, mr + 1], [23, mr + 1], [24, mr + 1], [25, mr + 1], [26, mr]]) if (SM[y * N + x]) SM[y * N + x] = 2;
          // a little gold base under its feet
          for (let x = 17; x <= 30; x++) SM[38 * N + x] = 1;
          for (let i = 0; i < N * N; i++) if (SM[i]) { SN.push(i); const x = i % N, y = (i - x) / N; for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) if (at(x + a, y + b) && !SM[(y + b) * N + x + a]) SO[(y + b) * N + x + a] = 1; }
          // how deep each cell sits inside the statuette, for rounded shading
          for (let i = 0; i < N * N; i++) SD[i] = SM[i] ? 99 : 0;
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; if (SD[i]) SD[i] = Math.min(SD[i], (x ? SD[i - 1] : 0) + 1, (y ? SD[i - N] : 0) + 1); }
          for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) { const i = y * N + x; if (SD[i]) SD[i] = Math.min(SD[i], (x < N - 1 ? SD[i + 1] : 0) + 1, (y < N - 1 ? SD[i + N] : 0) + 1); }
        }
        const OUTL = add('#200e02');
        let spot = 24, drum = 0, drumNext = 0, boomAt = -9, flashAt = -9, flashX = 24, flashY = 12, nFlash = 0, cx = 24;
        const cannon = []; for (let i = 0; i < 72; i++) cannon.push([i % 2 ? 1 : -1, 0.3 + rnd() * 1.1, 30 + rnd() * 18, Math.floor(rnd() * 6), rnd(), Math.floor(i / 24) * 0.3]);
        const conf = []; for (let i = 0; i < 14; i++) conf.push([rnd() * N, rnd() * 58, 3.5 + rnd() * 3, rnd() * 6.28, Math.floor(rnd() * 6)]);
        let burstT = -9, bx0 = 24, by0 = 24;
        const burst = []; for (let i = 0; i < 18; i++) burst.push([rnd() * 6.28, 9 + rnd() * 12, Math.floor(rnd() * 6)]);
        const shimmer = []; for (let i = 0; i < 24; i++) shimmer.push([rnd(), rnd(), rnd()]);
        // the light: a round pool on the curtain behind the bust, and a faint shaft down to it from the lamp above
        const pool = (x, y) => ((x + 0.5 - cx) / (14 - drum * 4)) ** 2 + ((y + 0.5 - 19) / (17 - drum * 4)) ** 2;
        const inBeam = (x, y) => pool(x, y) < 1;
        const inShaft = (x, y) => y < 8 && Math.abs(x + 0.5 - cx) < 1.5 + y * 0.9;
        o = {
          bg(t) {
            // the beam follows the pointer; held, a drumroll darkens the house to just the beam closing in on the bust
            const inp = c.input; track(t, inp);
            const goal = inp.inside && !g.down ? inp.x * N : 24;
            spot += (goal - spot) * Math.min(1, g.dt * 6);
            drum = g.hold > 0.25 ? Math.min(1, drum + g.dt * 0.8) : Math.max(0, drum - g.dt * 3);
            if (g.hold > 0.25 && t >= drumNext) { c.sound.hit('snare', 0.12 + drum * 0.25); drumNext = t + 0.16 - drum * 0.1; }
            if (g.release && g.held > 0.6) { boomAt = t; c.sound.hit('kick', 0.6); c.sound.hit('noise', 0.35, { cutoff: 4000, dur: 0.9 }); [0, 4, 7, 12, 16].forEach((k, i) => c.sound.note(zapRoot + 12 + k, { dur: 0.8, vel: 0.08, wave: 'triangle', at: 0.05 + i * 0.04 })); [0.3, 0.6].forEach(a => c.sound.hit('kick', 0.4, { at: a })); }
            if (g.click) { flashAt = t; nFlash++; flashX = 4 + ((nFlash * 37 + 11) % 40); flashY = 8 + ((nFlash * 23 + 5) % 28); c.sound.hit('click', 0.3); }
            cx = spot + (24 - spot) * drum;
            const fl = t - flashAt < 0.08 || (t - boomAt < 0.1);
            for (let i = 0; i < N * N; i++) {
              const k = FOLD[i], x = i % N, y = (i - x) / N;
              if (y >= FLOOR) {
                // the boards, with the pool of light on them
                const px = (x + 0.5 - cx) / (11 - drum * 3), py = (y + 0.5 - 44.5) / 3;
                const d = px * px + py * py;
                BG[i] = d < 0.45 ? C.poolL : d < 1 ? C.pool : drum > 0.4 ? C.black : x % 7 === 0 ? C.boardL : C.board;
                continue;
              }
              if (k >= 253) { BG[i] = k === 254 ? C.fringe : k === 253 ? C.valL : C.val; continue; }
              const pd = pool(x, y);
              BG[i] = fl && k > 0 ? C.hot[3] : pd < 0.45 ? C.hot[k] : pd < 1 ? C.lit[k] : inShaft(x, y) && (x + y) % 2 ? C.beam : drum > 0.4 ? C.black : C.cur[k];
            }
            if (t - flashAt < 0.25) for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]) if (at(flashX + a, flashY + b) && (t - flashAt < 0.12 || Math.abs(a) + Math.abs(b) < 2)) BG[(flashY + b) * N + flashX + a] = C.flash;
            return BG;
          },
          skin(t) {
            if (g.click) { burstT = t; bx0 = g.x * N; by0 = g.y * N; }
          },
          over(t) {
            // the stage, then the statuette in place of the figure, a pedestal and its plaque below
            buf.set(BG);
            for (let y = 39; y < N; y++) for (let x = P0; x <= P1; x++) {
              let col = y === 39 ? (x < P0 + 4 ? C.g[5] : x > P1 - 3 ? C.g[2] : C.g[4]) : y === 40 ? C.g[1] : x === P0 ? C.marL : x === P1 ? C.marD : ((x * 2 + y * 3 + (x >> 2)) % 11 === 0) ? C.marV : C.mar;
              if (x >= P0 + 3 && x <= P1 - 3 && y >= 42 && y <= 45) {
                col = y === 42 ? C.g[4] : y === 45 ? C.g[1] : C.g[3];
                if ((y === 43 || y === 44) && (x === 23 || x === 24)) col = C.g[1];
                if (y === 43 && (x === 22 || x === 25)) col = C.g[1];
              }
              buf[y * N + x] = col;
            }
            // gold: lit from the upper left, darker at its edges, a bright rim on the side the light comes from,
            // dimmer outside the pool of light, a glint band, and a shimmer while the drum rolls
            const band = c.input.inside && !g.down ? (c.input.x + c.input.y) * N - 1 : ((t * 9) % 130) - 30;
            const out = (i) => !SM[i];
            for (const i of SN) {
              const x = i % N, y = (i - x) / N, v = SM[i];
              if (v === 2) { buf[i] = C.g[0]; continue; }
              let s2 = SD[i] === 1 ? 2 : 3;
              if ((x && out(i - 1)) || (y && out(i - N)) || (x && y && out(i - N - 1))) s2 = 4;
              else if ((x < N - 1 && out(i + 1)) || (y < N - 1 && out(i + N)) || (x < N - 1 && y < N - 1 && out(i + N + 1))) s2 = 1;
              if (SD[i] === 1) { const nx = (out(i + 1) ? 1 : 0) - (out(i - 1) ? 1 : 0), ny = (out(i + N) ? 1 : 0) - (out(i - N) ? 1 : 0); if (nx * (cx - x) + ny * (19 - y) > 2) s2 = 5; }
              if (v === 3) s2 = Math.max(0, Math.min(2, s2 - 2));
              if (pool(x, y) >= 1 && s2 > 1 && s2 < 5) s2--;
              const d = x + y - band;
              if (d >= 0 && d < 2) s2 = 5; else if (d >= -1 && d < 3) s2 = Math.max(s2, 4);
              buf[i] = C.g[s2];
            }
            for (let i = 0; i < N * N; i++) if (SO[i]) buf[i] = OUTL;
            if (drum > 0.2) for (const [u, v, ph] of shimmer) {
              if (((t * 3 + ph * 7) % 1) > drum * 0.8) continue;
              const x = Math.floor(u * N), y = Math.floor(v * 38);
              if (!at(x, y) || !SM[y * N + x]) continue;
              for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) if (at(x + a, y + b) && SM[(y + b) * N + x + a]) buf[(y + b) * N + x + a] = a || b ? C.g[4] : C.g[5];
            }
            // the cup catches a star of light now and then
            if (((t + 0.3) % 2.2) < 0.35) { const sx = 21, sy = Math.max(1, 27 - Math.min(len, 14) - 10); for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0]]) if (at(sx + a, sy + b)) buf[(sy + b) * N + sx + a] = C.g[5]; }
            // a little confetti still drifting down, behind the statuette; and a handful thrown where a tap lands
            const put = (x, y, v, front) => { x = Math.round(x); y = Math.round(y); if (!at(x, y)) return; const i = y * N + x; if (!front && (SM[i] || SO[i] || (y >= 39 && x >= P0 && x <= P1))) return; buf[i] = v; };
            for (const [x0, y0, sp, ph, ci] of conf) {
              const y = (y0 + t * sp) % 58 - 6, x = x0 + Math.sin(t * 1.7 + ph) * 1.6, flip = Math.floor(t * 5 + ph) % 2;
              put(x, y, C.conf[ci]); put(flip ? x + 1 : x, flip ? y : y + 1, C.conf[ci]);
            }
            const bu = t - burstT;
            if (bu >= 0 && bu < 1.4) for (const [a, v, ci] of burst) { const x = bx0 + Math.cos(a) * v * bu, y = by0 + Math.sin(a) * v * bu + 9 * bu * bu; put(x, y, C.conf[ci], true); put(x + 1, y, C.conf[ci], true); }
            // the cannons: three bursts from each wing, over everything
            const cb0 = t - boomAt;
            if (cb0 >= 0 && cb0 < 3.2) for (const [sd, sp, v, ci, ph, delay] of cannon) {
              const cb = cb0 - delay; if (cb < 0 || cb > 2.6) continue;
              const vx = -sd * sp * 10, vy = -v, x = (sd > 0 ? 46 : 1) + vx * cb + Math.sin(cb * 6 + ph * 6) * 1.2, y = FLOOR + vy * cb + 18 * cb * cb;
              put(x, y, C.conf[ci], true); if (Math.floor(cb * 8 + ph * 3) % 2) put(x + 1, y, C.conf[ci], true); else put(x, y + 1, C.conf[ci], true);
            }
            if (cb0 >= 0 && cb0 < 0.9) for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { if (cb0 < k * 0.3 || cb0 > k * 0.3 + 0.12) continue; const x0 = sd > 0 ? 45 : 2; for (const [a, b] of [[0, 0], [1, 0], [-1, 0], [0, -1], [0, -2]]) put(x0 + a, FLOOR - 1 + b, C.flash, true); }
          },
        };
      } else if (legend === 'Cosmos') {
        const HEADC = BODY[bodyName] || '#f4f1e8';   // a chalk figure's head is chalk white
        const C = {
          sp: [add('#03040d'), add('#060819'), add('#0a0d24'), add('#0e1130')], neb: [add('#140e33'), add('#1f1244'), add('#33195f')],
          st: add('#ffffff'), stM: add('#a9b2e6'), stD: add('#4c5494'),
          suit: [add('#535c77'), add('#8790a8'), add('#bcc3d3'), add('#e5e9f1'), add('#ffffff')],
          glass: add('#0d1838'), rim: add('#b4c2dd'), shine: add('#eef5ff'), shine2: add('#9fb4dc'), collar: add('#646d82'), collarL: add('#a6afc2'), cord: add('#c6ccd8'),
          head: [add(shade(HEADC, 0.55)), add(shade(HEADC, 0.8)), add(HEADC), add(whiten(HEADC, 0.35))],
        };
        // three planets: each warp jump arrives at the next one, in a new field of stars
        const PLANS = [['#f0b26a', '#c97a3a', '#8a4a20', '#ffe3b0'], ['#6fd6c9', '#3a8f9a', '#1d5560', '#c4fff6'], ['#e38ac2', '#a04c94', '#5e2560', '#ffd0ee']].map(p => p.map(add));
        const plan0 = Math.floor(rnd() * 3);
        let PLAN = PLANS[plan0], sector = 0;
        const ringC = add('#e2d3a8'), ringD = add('#8f845f');
        let pcx = waveSide > 0 ? 8.5 : 39.5, pcy = 9.5, pr = 7.2;
        const flame = [add('#ffffff'), add('#ffe36a'), add('#ff9a2a'), add('#e0461e')];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const v = y / N * 3.6, b = Math.min(3, Math.floor(v));
          const n = Math.sin(x * 0.21 + y * 0.13 + starSeed[0][2] * 6) + Math.sin(y * 0.27 - x * 0.09 + starSeed[1][2] * 6) * 0.8;
          let col = n > 1.62 ? C.neb[1] : n > 1.3 ? C.neb[0] : n > 1.1 && ((x + y) & 1) ? C.neb[0] : C.sp[b];
          BG[y * N + x] = col;
        }
        // a tether from the suit's hip curling away off the edge
        const ts = -waveSide, cord = [];
        for (let k = 0; k <= 40; k++) { const u = k / 40; cord.push([24 + ts * (14 + u * 14), 46 - u * 10 + Math.sin(u * Math.PI) * -6]); }
        let OX = 0, OY = 0, VX = -0.8, VY = 0, warp = 0, jumpAt = -9, puffAt = -9;
        o = {
          noBuzz: true,
          bg(t) {
            const inp = c.input; track(t, inp);
            // drag to fly: the stars (and, slowly, the planet) stream past the other way; hold still to jump to warp
            const tvx = g.down && g.moved > 0.03 ? -(g.x - 0.5) * 34 : -0.8, tvy = g.down && g.moved > 0.03 ? -(g.y - 0.5) * 34 : 0;
            VX += (tvx - VX) * Math.min(1, g.dt * 3); VY += (tvy - VY) * Math.min(1, g.dt * 3);
            OX += VX * g.dt; OY += VY * g.dt;
            warp = g.hold > 0.3 ? Math.min(1, warp + g.dt * 0.9) : Math.max(0, warp - g.dt * 2.5);
            if (g.hold > 0.3 && Math.floor((t - g.dt) * 4) !== Math.floor(t * 4)) c.sound.note(zapRoot + 12 + Math.floor(warp * 12), { dur: 0.2, vel: 0.05, wave: 'sine' });
            if (g.release && g.held > 1) {
              // the jump: a white flash, then somewhere else entirely (new stars, the next planet, on the other side)
              jumpAt = t; sector++; PLAN = PLANS[(plan0 + sector) % 3]; pcx = (sector + (waveSide > 0 ? 0 : 1)) % 2 ? 39.5 : 8.5; pcy = 7.5 + (sector % 3) * 3; pr = 5.5 + (sector % 3) * 1.5;
              [0, 7, 12, 19].forEach((k, i) => c.sound.note(zapRoot + 12 + k, { dur: 1, vel: 0.07, wave: 'sine', at: i * 0.05 }));
            }
            // a tap fires the thrusters: flame from the pack and a kick that throws the stars back
            if (g.click) { puffAt = t; VY += 14; VX += (g.x - 0.5) * -10; c.sound.hit('noise', 0.16, { cutoff: 900, dur: 0.5 }); c.sound.hit('kick', 0.15); }
            // the body leans into the flight
            if (g.down && g.moved > 0.03) sway = Math.max(-0.16, Math.min(0.16, (g.x - 0.5) * 0.4));
            BGT.set(BG);
            const jf = t - jumpAt;
            if (jf >= 0 && jf < 0.12) { BGT.fill(C.st); return BGT; }
            if (jf >= 0.12 && jf < 0.3) { BGT.fill(C.sp[0]); for (let k = 0; k < 40; k++) BGT[(k * 997 + sector * 131) % (N * N)] = C.stM; return BGT; }
            for (const [cx, cy] of cord) { const x = Math.round(cx + Math.sin(t * 0.8 + cy * 0.3) * 0.6), y = Math.round(cy); if (at(x, y)) BGT[y * N + x] = C.cord; }
            // the planet, lit from the upper left, banded, its ring's far half behind it; it drifts a little with the flight
            const qx = pcx + Math.max(-9, Math.min(9, OX * 0.06)), qy = pcy + Math.max(-6, Math.min(6, OY * 0.06));
            for (let y = Math.floor(qy - 4); y <= qy + 4; y++) for (let x = Math.floor(qx - 11); x <= qx + 11; x++) {
              if (!at(x, y)) continue;
              const dx = x + 0.5 - qx, dy = y + 0.5 - qy, rx = dx * Math.cos(-0.3) - dy * Math.sin(-0.3), ry = dx * Math.sin(-0.3) + dy * Math.cos(-0.3);
              const ringD2 = (rx / 11.5) ** 2 + (ry / 2.7) ** 2, onRing = ringD2 > 0.72 && ringD2 < 1.12;
              if (onRing && ry < 0) BGT[y * N + x] = ringD;
            }
            for (let y = Math.floor(qy - pr - 3); y <= qy + pr + 3; y++) for (let x = Math.floor(qx - 12); x <= qx + 12; x++) {
              if (!at(x, y)) continue;
              const dx = x + 0.5 - qx, dy = y + 0.5 - qy, rx = dx * Math.cos(-0.3) - dy * Math.sin(-0.3), ry = dx * Math.sin(-0.3) + dy * Math.cos(-0.3);
              if (dx * dx + dy * dy <= pr * pr) { const band = Math.floor((ry + 8) / 2.6) % 3, lit = dx + dy < -4 ? 3 : dx + dy > 4.5 ? 2 : band === 1 ? 1 : 0; BGT[y * N + x] = PLAN[lit]; }
              const ringD2 = (rx / 11.5) ** 2 + (ry / 2.7) ** 2;
              if (ringD2 > 0.72 && ringD2 < 1.12 && ry >= 0) BGT[y * N + x] = ringC;
            }
            // the stars: drifting with the flight, nearer ones faster; at warp they stretch into streaks from the middle
            for (let k = 3; k < starSeed.length; k++) {
              const [sx0, sy0, q] = starSeed[k], sx = sx0 + sector * 17 * (k % 5 + 1), sy = sy0 + sector * 23 * (k % 3 + 1), f = 0.4 + q * 0.9, x = Math.floor((((sx + OX * f) % N) + N) % N), y = Math.floor((((sy + OY * f) % N) + N) % N), i = y * N + x;
              const col = q > 0.85 ? C.st : ((t * 0.7 + q * 9) % 3) < 2.2 ? C.stM : C.stD;
              if (warp > 0.05) {
                const dx = x + 0.5 - 24, dy = y + 0.5 - 22, d = Math.hypot(dx, dy) || 1, L = warp * (3 + d * 0.5);
                for (let s2 = 0; s2 <= L; s2 += 0.7) { const xx = Math.floor(x + dx / d * s2), yy = Math.floor(y + dy / d * s2); if (at(xx, yy)) BGT[yy * N + xx] = s2 < 1 ? C.st : s2 < L * 0.5 ? C.stM : C.stD; }
                continue;
              }
              BGT[i] = col;
              if (q > 0.93 && ((t * 0.7 + q * 9) % 3) < 1.6) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (at(x + a, y + b)) BGT[(y + b) * N + x + a] = C.stD;
            }
            return BGT;
          },
          skin(t, hs) {
            depth(); headMask(hs);
            for (let i = 0; i < N * N; i++) {
              if (!fig[i] || edge[i]) continue;
              const x = i % N, y = (i - x) / N;
              const lit = (x && isOut(i - 1)) || (y && isOut(i - N)), dark = (x < N - 1 && isOut(i + 1)) || (y < N - 1 && isOut(i + N));
              if (HM[i]) buf[i] = C.head[lit ? 3 : dark ? 0 : D[i] === 2 ? 1 : 2];
              else { let s = D[i] === 1 ? 2 : D[i] === 2 ? 3 : 4; if (lit) s = 4; else if (dark) s = 1; if (D[i] > 2 && ((x * 5 + y * 3) % 23 === 0)) s = 2; buf[i] = C.suit[s]; }
            }
          },
          over(t, hs) {
            // thrusters: a jet of flame from the pack behind each shoulder, then a puff of smoke drifting off
            const pu = t - puffAt;
            if (pu >= 0 && pu < 0.9) for (const sd of [-1, 1]) {
              const ox = 24 + sd * (SHW + 4), oy = TY0 - 1, L = pu < 0.45 ? 9 * Math.min(1, pu / 0.12) : 0, fl = Math.floor(t * 20) % 2;
              for (let k = 0; k <= L; k++) { const w = Math.floor(k / 3.5) + fl; for (let a = -w; a <= w; a++) { const x = Math.round(ox + sd * k * 0.75 + a * 0.6), y = Math.round(oy + k * 0.7 - a * sd * 0.6); if (at(x, y) && !fig[y * N + x] && !edge[y * N + x]) buf[y * N + x] = flame[Math.min(3, Math.floor(k / L * 4 + Math.abs(a) * 0.5))]; } }
              if (pu > 0.3) { const q = pu - 0.3, cx = ox + sd * (8 + q * 10), cy = oy + 7 + q * 4, r = 1.5 + q * 5; for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (at(x, y) && d < r && !fig[y * N + x] && (x + y) % 2) buf[y * N + x] = C.suit[1]; } }
            }
            for (const h of hs) {
              // a glare across the visor (the head), top left; the planet mirrored small at its upper right; at warp,
              // the streaking stars slide across it
              { const r = 2, x0 = h.x - prof[r] + shift[r] + 2, y0 = h.top + r; for (const [a, b] of [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]]) if (at(x0 + a, y0 + b) && HM[(y0 + b) * N + x0 + a] && fig[(y0 + b) * N + x0 + a]) buf[(y0 + b) * N + x0 + a] = C.shine; }
              const vis = (x, y) => at(x, y) && HM[y * N + x] && fig[y * N + x] && !edge[y * N + x] && buf[y * N + x] !== K_;
              { const r = 3, rx = h.x + prof[r] + shift[r] - 4 - Math.round(Math.max(-2, Math.min(2, (pcx - 24) * -0.05 + OX * 0.01))), ry = h.top + r + Math.round(Math.max(-1, Math.min(2, OY * 0.01)));
                for (const [a, b, k] of [[0, 0, 0], [1, 0, 0], [0, 1, 1], [1, 1, 2], [-1, 0, 3], [2, 1, 3]]) if (vis(rx + a, ry + b)) buf[(ry + b) * N + rx + a] = a === -1 || a === 2 ? C.shine2 : PLAN[k]; }
              if (warp > 0.05) for (let s2 = 0; s2 < 3; s2++) { const off = Math.floor((t * 30 + s2 * 7) % (len + 6)) - 3; for (let k = 0; k < 3 + warp * 4; k++) { const x = h.x - 6 + k + s2 * 3, y = h.top + off + Math.floor(k * 0.4); if (vis(x, y)) buf[y * N + x] = k > 2 ? C.stM : C.st; } }
              // a collar where the helmet seals to the suit
              const cy = h.top + len - 1;
              for (let y = cy; y <= cy + 1; y++) for (let x = h.x - NECK - 3; x < h.x + NECK + 3; x++) if (at(x, y) && !armM[y * N + x]) buf[y * N + x] = y === cy ? C.collarL : C.collar;
              // the fishbowl: glass over whatever was field inside it, a thin rim, and a curved shine at its upper left
              const hx = h.x + shift[len >> 1], hy = h.top + len / 2 - 0.5, R = Math.max(hwMax + 2.4, len / 2 + 2);
              for (let y = Math.floor(hy - R - 1); y <= hy + R + 1; y++) for (let x = Math.floor(hx - R - 1); x <= hx + R + 1; x++) {
                if (!at(x, y) || y >= cy) continue;
                const i = y * N + x, d = Math.hypot(x + 0.5 - hx, y + 0.5 - hy), free = buf[i] === BGT[i] || (!fig[i] && !edge[i] && !propM[i] && (buf[i] === C.st || buf[i] === C.stM));
                if (!free) continue;
                if (Math.abs(d - R) < 0.6) buf[i] = C.rim;
                else if (d < R) {
                  const a = Math.atan2(y + 0.5 - hy, x + 0.5 - hx);
                  buf[i] = d > R - 2.4 && d < R - 0.9 && a > -2.75 && a < -1.75 ? C.shine : d > R - 2.4 && d < R - 0.9 && a > 0.2 && a < 0.7 ? C.shine2 : C.glass;
                }
              }
            }
          },
        };
      } else {
        const C = {
          wall: add('#15191e'), fr: add('#8b939d'), frL: add('#c3cad3'), frD: add('#5a616a'), panel: add('#e3f4fa'), panel2: add('#cbe6f0'),
          film: add('#061420'), filmE: add('#0d2433'), tis: add('#112c40'), tisE: add('#225068'), tisS: add('#336a86'),
          bone: add('#b7dceb'), boneB: add('#f1fbff'), boneD: add('#78a9bf'), hole: add('#081a28'), metal: add('#ffffff'), metalD: add('#c9d6dc'),
          clip: add('#22262c'), clipL: add('#59616c'), mark: add('#e6f6fb'),
        };
        const F0 = 4, F1 = 43, G0 = 5, G1 = 50;   // the film's cells
        const inFilm = (x, y) => x >= F0 && x <= F1 && y >= G0 && y <= G1 && !((x === F0 || x === F1) && y === G0);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) BG[y * N + x] = inFilm(x, y) ? (x === F0 || x === F1 || y === G0 || y === G1 ? C.filmE : C.film) : C.panel;
        const items = {
          Key: ['.MM.......', 'M..MMMMMMM', '.MM...M.M.'], Coin: ['.MMM.', 'MmmmM', 'MmmmM', 'MmmmM', '.MMM.'], Ring: ['.MMM.', 'M...M', 'M...M', 'M...M', '.MMM.'],
          Pin: ['.MMMMMMM.', 'M.......M', '.MMMMMMMM'], Die: ['MMMMM', 'M.MMM', 'MMMMM', 'MMM.M', 'MMMMM'], Battery: ['.MM.', 'MMMM', 'MmmM', 'MmmM', 'MmmM', 'MMMM'],
        };
        const itemName = Object.keys(items)[Math.floor(rnd() * 6)], itemSide = rnd() < 0.5 ? -1 : 1;
        // the scanner's view: the figure as it really looks (its own fill, ink outline and field)
        const FLESH = add(BODY[bodyName] || '#f4f1e8'), FLESHD = add(shade(BODY[bodyName] || '#f4f1e8', 0.78)), REALF = add(FIELDS[fieldName][0]), INKC = add('#141414'), RIM = add('#c9d6dc'), RIML = add('#ffffff');
        let rattleAt = -9, item = 'in', itemX = 0, itemY = 0, itemT = -9, fallV = 0, grip = 0;
        const itemAt = () => { const it = items[itemName]; return [24 + itemSide * 5 - (it[0].length >> 1), TY0 + 6, it[0].length, it.length]; };
        o = {
          noBuzz: true,
          bg(t) {
            const inp = c.input; track(t, inp);
            if (g.click) rattleAt = t;
            // hold on what it swallowed and it comes loose; then it follows the pointer until let go, and drops away
            const [ix, iy, iw, ih] = itemAt();
            if (item === 'in' && g.hold > 0 && g.x0 * N > ix - 2 && g.x0 * N < ix + iw + 2 && g.y0 * N > iy - 2 && g.y0 * N < iy + ih + 2) {
              grip = g.hold;
              if (grip > 0.6) { item = 'out'; c.sound.note(zapRoot + 19, { dur: 0.4, vel: 0.1, wave: 'triangle' }); }
            } else grip = 0;
            if (item === 'out') { itemX = g.x * N - iw / 2; itemY = g.y * N - ih / 2; if (!g.down) { item = 'fall'; itemT = t; fallV = -6; c.sound.hit('click', 0.3); } }
            if (item === 'fall') { fallV += 60 * g.dt; itemY += fallV * g.dt; if (itemY > N + 2) { item = 'gone'; itemT = t; } }
            if (item === 'gone' && t - itemT > 8) item = 'in';
            return BG;
          },
          skin(t, hs, inp, hoverX, hoverY, bones, hands) {
            depth();
            // a tap rattles the bones: each group jumps a cell this way and that for a moment
            let grp = 0;
            const rat = t - rattleAt < 0.7, jig = () => { grp++; return rat ? (((Math.floor(t * 18) + grp) & 1) ? 1 : -1) : 0; };
            let jx = 0, jy = 0;
            const bone = (x, y, v) => { x += jx; y += jy; if (at(x, y) && fig[y * N + x] && !edge[y * N + x]) buf[y * N + x] = v; };
            for (let i = 0; i < N * N; i++) { if (edge[i]) buf[i] = BG[i]; else if (fig[i]) buf[i] = D[i] === 1 ? C.tisE : C.tis; }
            // the skull: a bright rim and a paler vault, two sockets, a nose, two rows of teeth
            for (const h of hs) {
              jx = jig(); jy = rat ? jig() : 0;
              for (let r = 1; r < len - 1; r++) {
                const w = prof[r] - 1, y = h.top + r; if (w <= 0) continue;
                for (let x = h.x - w + shift[r]; x < h.x + w + shift[r]; x++) bone(x, y, r === 1 || x === h.x - w + shift[r] || x === h.x + w + shift[r] - 1 ? C.boneB : C.bone);
              }
              const er = h.top + Math.round(len * eyeK), ri = er - h.top, sx = h.x + shift[ri], e = Math.max(2, Math.round(prof[ri] * 0.3)), mr = er + Math.max(3, Math.round(len * 0.28));
              for (const x0 of [sx - e - 3, sx + e - 1]) for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) if (j === 1 || (k > 0 && k < 3)) bone(x0 + k, er + j, C.hole);
              bone(sx - 1, er + 3, C.hole); bone(sx, er + 3, C.hole); bone(sx - 1, er + 4, C.boneD); bone(sx, er + 4, C.boneD);
              const tw = Math.max(2, e + 1);
              for (let x = sx - tw; x < sx + tw; x++) { bone(x, mr, x % 2 ? C.boneB : C.boneD); bone(x, mr + 1, C.hole); if (mr + 2 < h.top + len - 1) bone(x, mr + 2, x % 2 ? C.boneD : C.boneB); }
            }
            // the spine, a vertebra at a time, and the neck(s) above it
            jx = 0; jy = rat ? jig() : 0;
            const neckTop = head === 'Twin' ? TY0 - 4 : hs[0].top + len - 1;
            for (let y = neckTop; y < N; y++) { const v = (y - neckTop) % 3 === 2 ? C.boneD : C.bone; bone(23, y, v); bone(24, y, v); }
            if (head === 'Twin') for (const h of hs) for (let y = h.top + len - 1; y < TY0 - 3; y++) { const x = h.x - Math.round(h.ox * (y - h.top - len + 2) / (TY0 - h.top - len + 3)); bone(x - 1, y, (y & 1) ? C.boneD : C.bone); bone(x, y, (y & 1) ? C.boneD : C.bone); }
            // collarbones, then ribs curving down and round from the spine
            for (const s of [-1, 1]) walk(24 - (s < 0 ? 1 : 0), TY0 + 2, 24 + s * (SHW + 1), TY0 + 1, (x, y) => bone(x, y, C.boneB));
            for (let k = 0; k < 5; k++) {
              const y0 = TY0 + 5 + Math.round(k * 2.4), W = Math.max(3, TORSO[Math.min(TORSO.length - 1, y0 - TY0)] - 3 - (k > 2 ? k - 2 : 0));
              for (let dx = 2; dx <= W; dx++) { const yy = y0 + Math.round((dx / W) ** 2 * 2.2); bone(24 + dx - 1, yy, dx === W ? C.boneD : C.bone); bone(24 - dx, yy, dx === W ? C.boneD : C.bone); }
            }
            // the arm bones (two cells thick), with knobbly joints, and the little bones of each hand
            for (const [x0, y0, x1, y1] of bones) {
              jx = jig(); jy = rat ? jig() : 0;
              const thick = Math.abs(x1 - x0) > Math.abs(y1 - y0) ? [0, 1] : [1, 0];
              walk(x0, y0, x1, y1, (x, y) => { bone(x, y, C.boneB); bone(x + thick[0], y + thick[1], C.bone); });
              for (const [jx, jy] of [[x0, y0], [x1, y1]]) for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) bone(Math.floor(jx) + a - 1 + 1, Math.floor(jy) + b - 1 + 1, C.boneB);
            }
            for (const [s, hx, hy] of hands) for (let f = 0; f < 4; f++) { const a = -Math.PI / 2 + (f - 1.5) * 0.45 + s * 0.2; for (const r of [1.5, 2.6]) bone(Math.floor(hx + Math.cos(a) * r), Math.floor(hy + Math.sin(a) * r), r > 2 ? C.boneD : C.bone); }
            // what it swallowed (shaking as it's pulled loose)
            jx = grip > 0.1 ? ((Math.floor(t * 20) & 1) ? 1 : -1) : 0; jy = 0;
            const it = items[itemName], [ix, iy] = itemAt();
            if (item === 'in') for (let j = 0; j < it.length; j++) for (let i = 0; i < it[j].length; i++) { const ch = it[j][i]; if (ch !== '.') bone(ix + i, iy + j, ch === 'm' ? C.metalD : C.metal); }
            jx = jy = 0;
            // the reading light: a band that follows the pointer or drifts down, and a flash on a tap
            const scanY = Math.floor((t * 5) % 64) - 8, flash = t - rattleAt < 0.15;
            for (let i = 0; i < N * N; i++) if (fig[i] && !edge[i]) {
              const y = (i / N) | 0, v = buf[i];
              if (flash || y === scanY || y === scanY + 1) buf[i] = v === C.tis || v === C.tisE ? C.tisS : v === C.bone || v === C.boneD ? C.boneB : v;
            }
          },
          over(t, hs) {
            // the prop shows as metal and plastic: white where it's hard, grey where it's not
            for (let i = 0; i < N * N; i++) if (propM[i] && buf[i] !== BG[i]) buf[i] = buf[i] === K_ ? C.metal : C.boneD;
            for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
              if (inFilm(x, y)) continue;
              const i = y * N + x;
              buf[i] = y === 0 ? C.wall : x === 0 || y === 1 ? C.frL : x === N - 1 ? C.frD : (x + y) % 2 && (x < 2 || x > N - 3 || y < 3) ? C.panel2 : C.panel;
            }
            // a binder clip holding the film at the top, and an R marker
            stamp(['..MMMMMM..', '..M....M..', '..M....M..', 'CCCCCCCCCC', 'KKKKKKKKKK', 'KKKKKKKKKK', '.KKKKKKKK.'], 19, 0, { M: C.clipL, C: C.clipL, K: C.clip });
            stamp(['MMM', 'M.M', 'MM.', 'M.M', 'M.M'], 7, 8, { M: C.boneD });
            // the scanner: a round window that shows the figure in colour, ringed in steel
            const inp = c.input;
            if (inp.inside && item !== 'out') {
              const cx = inp.x * N, cy = inp.y * N, R = 7;
              for (let y = Math.floor(cy - R - 1); y <= cy + R + 1; y++) for (let x = Math.floor(cx - R - 1); x <= cx + R + 1; x++) {
                if (!at(x, y)) continue;
                const i = y * N + x, d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
                if (d < R - 0.7) buf[i] = edge[i] ? INKC : fig[i] ? (D[i] === 1 ? FLESHD : FLESH) : REALF;
                else if (d < R + 0.4) buf[i] = Math.atan2(y + 0.5 - cy, x + 0.5 - cx) < -1.2 && Math.atan2(y + 0.5 - cy, x + 0.5 - cx) > -2.6 ? RIML : RIM;
              }
              // its face shows in the window too
              for (const h of hs) { const er = h.top + Math.round(len * eyeK), ri = er - h.top, sx = h.x + shift[ri], e = Math.max(2, Math.round(prof[ri] * 0.3)); for (const x0 of [sx - e - 2, sx + e]) for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const x = x0 + a, y = er + b; if (at(x, y) && Math.hypot(x + 0.5 - cx, y + 0.5 - cy) < R - 0.7) buf[y * N + x] = INKC; } }
            }
            // the swallowed thing, pulled out and carried, or falling away
            if (item === 'out' || item === 'fall') { const it = items[itemName]; for (let j = 0; j < it.length; j++) for (let i = 0; i < it[j].length; i++) { const ch = it[j][i], x = Math.round(itemX) + i, y = Math.round(itemY) + j; if (ch !== '.' && at(x, y)) buf[y * N + x] = ch === 'm' ? C.metalD : C.metal; } }
          },
        };
      }
      return o;
    })();
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
      buf.set(LG ? LG.bg(t) : bg); fig.fill(0); edge.fill(0); armM.fill(0);

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
      if (LG) LG.skin(t, hs, inp, hoverX, hoverY, bones, hands);

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
      if (buzz !== 'Silent' && !(LG && LG.noBuzz)) {
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
      if (LG) LG.over(t, hs);
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
