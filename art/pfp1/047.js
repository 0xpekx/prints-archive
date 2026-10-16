// Wobble Folk: from D:/code/synaesthesia/public/drop03/pieces/047.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// 047 Wobble Folk: little people drawn with one marker and one or two highlighters,
// the way you'd doodle in a margin, set as pixel art on a 64 x 64 grid. The line
// "boils" (three takes, each a cell off here and there, cycling slowly), felt pens
// double their main strokes, the highlighter fills in banded cells that slip a cell
// outside the line, and the eyes are set by hand, cell by cell.
Proto.add({
  num: 47,
  name: 'Wobble Folk',
  fam: 'Faces & People',
  recipe: 'Each hash is a new margin doodle in pixels: a marker head and shoulders coloured in with banded highlighter cells, on notebook, graph, kraft, napkin or sticky-note paper, its line gently boiling. About one in 200 has a gold star from the teacher; about one in 360 is legendary: drawn in neon gel, cut out as a holo sticker, or hopping in a flipbook. Paper, pen, highlighters, age, head shape, skin wash, eyes, brows, nose, mouth, ears, hair, hat, outfit, face extras, what it holds, its pose and the margin doodles all vary.',
  interactive: 'Tap the face to make it react. Tap or drag on the paper to doodle.',
  music: true,
  fps: 24,
  seed: 2,
  make(c) {
    const S = c.size, ctx = c.ctx, Z = S / 1000, P = Math.PI;

    // every draw hashes the hash string with a counter (FNV-1a, then a final avalanche)
    const base = c.hash;
    let draws = 0;
    const roll = () => {
      let h = 0x811c9dc5;
      const key = base + ':' + (draws++);
      for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 0x01000193);
      h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h = h ^ (h >>> 15);
      return (h >>> 0) * 2.3283064365386963e-10;
    };
    const amid = (lo, hi) => lo + (hi - lo) * roll();
    const one = list => { let tot = 0; for (const it of list) tot += it[1]; let r = roll() * tot; for (const it of list) if ((r -= it[1]) < 0) return it[0]; return list[0][0]; };

    // ---------- the first eight picks, kept in their original order so earlier doodles keep their bones ----------
    const paper0 = one([['Plain', 26], ['Notebook', 26], ['Graph', 22], ['Sticky note', 18], ['Chalkboard', 8]]);
    // the notebook look: ballpoint blue and pencil grey are the usual pens, black felt the odd one out
    const marker0 = paper0 === 'Chalkboard' ? 'Chalk' : one([['Black felt', 28], ['Blue ballpoint', 36], ['Red pen', 10], ['Pencil', 26]]);
    const head0 = one([['Circle', 34], ['Egg', 22], ['Bean', 22], ['Square', 14], ['Triangle', 8]]);
    const face0 = one([['Smile', 28], ['Flat', 16], ['Grin', 16], ['Wink', 12], ['Shades', 14], ['Surprised', 14]]);
    const hair0 = one([['Bald', 14], ['Three hairs', 16], ['Spikes', 18], ['Curly', 20], ['Ponytail', 16], ['Fringe', 16]]);
    const hat0 = one([['None', 46], ['Beanie', 16], ['Cap', 14], ['Top hat', 10], ['Antenna', 8], ['Crown', 6]]);
    const held0 = one([['Nothing', 40], ['Balloon', 16], ['Flower', 14], ['Mug', 16], ['Tiny flag', 8], ['Star wand', 6]]);
    const hi0 = one([['Yellow', 30], ['Pink', 26], ['Green', 22], ['Orange', 22]]);
    const hx = 500 + amid(-20, 20), hy0 = amid(400, 430), r0 = amid(200, 225);

    // ---------- everything the polish added rolls from a Jenkins small-fast generator over the
    // hash's fourth and fifth words, so the eight picks above keep their order ----------
    let ja = 0xf1ea5eed, jb = parseInt(c.hash.slice(26, 34), 16) | 0, jc = parseInt(c.hash.slice(34, 42), 16) | 0, jd = jb ^ jc ^ 0x2545f491;
    const jsf = () => {
      const e = (ja - (jb << 27 | jb >>> 5)) | 0;
      ja = jb ^ ((jc << 17) | jc >>> 15);
      jb = jc + jd | 0; jc = jd + e | 0; jd = e + ja | 0;
      return (jd >>> 0) / 0x100000000;
    };
    for (let w = 0; w < 24; w++) jsf();
    const jr = (lo, hi) => lo + (hi - lo) * jsf();
    const jp = list => { let s = 0; for (const it of list) s += it[1]; let v = jsf() * s; for (const it of list) if ((v -= it[1]) < 0) return it[0]; return list[0][0]; };
    const dir = jsf() < 0.5 ? -1 : 1;   // which way the doodle's asymmetries lean

    // paper and pen
    let paper = jsf() < 0.42 ? jp([['Dot grid', 30], ['Index card', 22], ['Kraft', 18], ['Napkin', 14], ['Blueprint', 8], ['Black card', 7]]) : paper0;
    if (paper === 'Sticky note' && jsf() < 0.45) paper = jp([['Pink sticky note', 1], ['Blue sticky note', 1], ['Green sticky note', 1]]);
    const dark = paper === 'Chalkboard' || paper === 'Blueprint' || paper === 'Black card';
    let marker = paper === 'Chalkboard' ? 'Chalk' : paper === 'Blueprint' ? 'White pencil' : paper === 'Black card' ? (jsf() < 0.4 ? 'Gold gel' : 'Silver gel') : marker0 === 'Chalk' ? 'Black felt' : marker0;
    if (!dark && jsf() < 0.45) marker = jp([['Brush pen', 30], ['Fineliner', 24], ['Purple gel', 15], ['Green felt', 14], ['Crayon', 17]]);
    // colour, width, taper length, end thickness, pressure wobble
    const pens = {
      'Black felt': ['#1d1c22', 16, 22, 0.78, 0.08], 'Brush pen': ['#141318', 19, 95, 0.14, 0.3],
      'Blue ballpoint': ['#24379a', 10, 14, 0.6, 0.14], Fineliner: ['#202027', 8, 8, 0.9, 0.05],
      'Red pen': ['#b8262b', 11, 14, 0.6, 0.12], Pencil: ['#4b4c53', 10, 26, 0.45, 0.22],
      'Green felt': ['#1e6a43', 15, 22, 0.75, 0.1], 'Purple gel': ['#5b2d8e', 11, 12, 0.72, 0.1],
      Crayon: [jp([['#2f3f9a', 1], ['#a3322b', 1], ['#2c6b3a', 1], ['#3a2a24', 1]]), 21, 30, 0.6, 0.18],
      Chalk: ['#ecebe4', 17, 30, 0.6, 0.15], 'White pencil': ['#eaf2ff', 11, 26, 0.5, 0.2],
      'Gold gel': ['#e2ba5e', 12, 12, 0.75, 0.1], 'Silver gel': ['#cfd4dd', 12, 12, 0.75, 0.1],
    };
    const pen = pens[marker], ink = pen[0], lw = pen[1];
    const grainy = marker === 'Pencil' || marker === 'Crayon' || marker === 'Chalk' || marker === 'White pencil';

    // highlighters: one or two of them, or (rarely) the whole pencil case
    const hiName = jsf() < 0.42 ? jp([['Blue', 18], ['Lilac', 16], ['Yellow and pink', 18], ['Green and blue', 16], ['Orange and pink', 16], ['Rainbow', 6]]) : hi0;
    const HL = { Yellow: [255, 222, 40, 0.62], Pink: [255, 92, 170, 0.5], Green: [80, 226, 110, 0.5], Orange: [255, 150, 40, 0.56], Blue: [70, 170, 255, 0.48], Lilac: [168, 120, 255, 0.46] };
    const tint = (k, m) => { const v = HL[k]; return `rgba(${v[0]},${v[1]},${v[2]},${(v[3] * (m || 1) * (dark ? 0.85 : 1)).toFixed(3)})`; };
    const hiPair = hiName === 'Rainbow' ? null : hiName.includes(' and ') ? hiName.split(' and ').map(s => s[0].toUpperCase() + s.slice(1)) : [hiName, hiName];
    const spectrum = ['Yellow', 'Pink', 'Blue', 'Green', 'Orange', 'Lilac'];
    let specAt = Math.floor(jsf() * 6);
    // Rainbow is three pens taken in turn (flat colour per part), so it never reads as the holo foil
    const three = [spectrum[specAt], spectrum[(specAt + 2) % 6], spectrum[(specAt + 4) % 6]];
    const hiA = () => hiPair ? tint(hiPair[0]) : tint(three[specAt++ % 3]);
    const hiB = () => hiPair ? tint(hiPair[1]) : tint(three[specAt++ % 3]);

    // who it is
    const age = jp([['Grown-up', 50], ['Kid', 24], ['Elder', 20], ['Baby', 4]]);
    const ageK = { 'Grown-up': [1, 0, 1, 1], Kid: [1.08, 22, 0.8, 1.26], Elder: [0.98, 0, 1, 0.9], Baby: [1.16, 40, 0.62, 1.42] }[age];
    const R = r0 * ageK[0], hy = hy0 + ageK[1], bw0 = ageK[2] * jr(0.9, 1.08), es = ageK[3];
    // the body's build changes the outline under the head; it hashes its own key, so no other pick moves
    const build = (() => { let h = 0x811c9dc5; const key = base + ':build'; for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 0x01000193); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15; let v = (h >>> 0) / 4294967296 * 100; for (const [k, w] of [['Regular', 28], ['Slim', 16], ['Broad', 16], ['Round', 14], ['Dress', 14], ['Tiny', 12]]) if ((v -= w) < 0) return k; return 'Regular'; })();
    // later additions roll on their own keys too (same hash as the Body), so the picks above keep their order
    const own = key => { let h = 0x811c9dc5; const k2 = base + ':' + key; for (let i = 0; i < k2.length; i++) h = Math.imul(h ^ k2.charCodeAt(i), 0x01000193); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15; return (h >>> 0) / 4294967296; };
    const ownPick = (key, list) => { let s = 0; for (const it of list) s += it[1]; let v = own(key) * s; for (const it of list) if ((v -= it[1]) < 0) return it[0]; return list[0][0]; };
    const bw = bw0 * (build === 'Slim' ? 0.74 : build === 'Broad' ? 1.24 : build === 'Tiny' ? 0.5 : build === 'Dress' ? 0.82 : 1);
    const head = jsf() < 0.58 ? jp([['Pear', 14], ['Long', 14], ['Melon', 12], ['Squircle', 12], ['V jaw', 10], ['Lightbulb', 12], ['Peanut', 10], ['Potato', 14]]) : head0;
    const skin = jp([['None', 15], ['Light', 14], ['Medium', 14], ['Tan', 14], ['Brown', 14], ['Deep brown', 14], ['Mint', 7.5], ['Lavender', 7.5]]);
    const skinCol = { Light: 'rgba(248,186,146,0.42)', Medium: 'rgba(226,178,118,0.44)', Tan: 'rgba(194,134,84,0.46)', Brown: 'rgba(146,92,56,0.52)', 'Deep brown': 'rgba(92,56,34,0.58)', Mint: 'rgba(110,222,178,0.42)', Lavender: 'rgba(186,156,244,0.42)' }[skin];

    // the face's parts start from the original face pick and often swap for one of the new ones
    const eyeFrom = { Smile: 'Dots', Flat: 'Dots', Grin: 'Big dots', Wink: 'Wink', Shades: 'Dots', Surprised: 'Rings' }[face0];
    const mouthFrom = { Smile: 'Smile', Flat: 'Flat', Grin: 'Grin', Wink: 'Smile', Shades: 'Smile', Surprised: 'Open O' }[face0];
    let eyes = jsf() < 0.62 ? jp([['Dots', 12], ['Big dots', 12], ['Beady', 10], ['Rings', 8], ['Sleepy', 11], ['Squint', 8], ['Lashes', 10], ['Uneven', 8], ['Ovals', 9], ['Wink', 5], ['Spirals', 2], ['Stars', 2], ['Hearts', 2]]) : eyeFrom;
    let mouth = jsf() < 0.62 ? jp([['Smile', 10], ['Big smile', 8], ['Flat', 6], ['Grin', 7], ['Open O', 6], ['Tongue out', 6], ['Smirk', 9], ['Wobbly', 7], ['Frown', 5], ['Buck teeth', 6], ['Gap grin', 5], ['Whistle', 4], ['Laugh', 6], ['W mouth', 5], ['Gritted', 4]]) : mouthFrom;
    // two dots and a curve were a third of all faces: most of them now get a mood, eyes and mouth that go together
    const MOODS = [['Happy', 'Toothy'], ['Tall', 'Tiny smile'], ['Googly', 'Fang'], ['Sparkly', 'Pout']];
    if (eyes === 'Dots' && own('mood') < 0.6) { const m = MOODS[Math.floor(own('mood-kind') * 4)]; eyes = m[0]; if (mouth === 'Smile') mouth = m[1]; }
    if (mouth === 'Smile' && own('mouth2') < 0.55) mouth = MOODS[Math.floor(own('mouth2-kind') * 4)][1];
    const brows = jp([['None', 22], ['Flat', 16], ['Raised', 14], ['Cross', 9], ['Worried', 10], ['Unibrow', 6], ['Bushy', 11], ['One raised', 9]]);
    const nose = jp([['None', 14], ['Dot', 12], ['Hook', 13], ['L', 12], ['Button', 11], ['Bulb', 8], ['Long', 8], ['Triangle', 8], ['Nostrils', 8], ['Snub', 6]]);
    let extra = jp([['None', 34], ['Blush', 13], ['Freckles', 11], ['Round glasses', 9], ['Square glasses', 6], ['Shades', 3.5], ['Moustache', 7], ['Beard', 5], ['Stubble', 4], ['Goatee', 3], ['Bandaid', 4], ['Mole', 3], ['Sweat drop', 3], ['Monocle', 1.5], ['Eye patch', 1.5]]);
    if (face0 === 'Shades' && jsf() < 0.3) extra = 'Shades';
    if ((age === 'Kid' || age === 'Baby') && /Moustache|Beard|Stubble|Goatee|Monocle/.test(extra)) extra = age === 'Kid' ? 'Freckles' : 'Blush';
    if (extra === 'Shades' && (head === 'Triangle' || head === 'V jaw')) extra = 'None';   // shades fill a pointed face edge to edge
    let hair = jsf() < 0.56 ? jp([['Afro', 11], ['Bob', 11], ['Pigtails', 8], ['Mohawk', 6], ['Side part', 11], ['Bun', 9], ['Long', 11], ['Comb-over', 6], ['Quiff', 9], ['Buzz', 8]]) : hair0;
    if (age === 'Baby') hair = 'Single curl';
    if (age === 'Elder' && hair === 'Mohawk') hair = 'Comb-over';
    let hat = hat0 === 'None' ? (jsf() < 0.38 ? 'new' : 'None') : (jsf() < 0.5 ? 'new' : hat0);
    if (hat === 'new') hat = jp([['Party hat', 10], ['Bucket hat', 9], ['Beret', 9], ['Paper hat', 8], ['Bow', 9], ['Propeller cap', 5], ['Chef hat', 5], ['Wizard hat', 5], ['Flower crown', 7], ['Bandana', 8], ['Halo', 2.5]]);
    const covering = /^(Beanie|Top hat|Bucket hat|Chef hat|Wizard hat|Paper hat)$/.test(hat);
    const longHair = /^(Long|Bob|Pigtails)$/.test(hair);
    if (covering && !/^(Long|Bob|Pigtails|Ponytail|Fringe|Curly|Side part)$/.test(hair)) hair = 'Under hat';
    let hairFill = /^(Spikes|Curly|Ponytail|Fringe|Afro|Bob|Pigtails|Mohawk|Side part|Bun|Long|Quiff)$/.test(hair)
      ? jp(age === 'Elder' ? [['Inked', 14], ['Blank', 60], ['Highlighted', 26]] : [['Inked', 40], ['Blank', 26], ['Highlighted', 34]]) : 'None';
    if (paper === 'Blueprint' && hairFill === 'Inked') hairFill = 'Highlighted';   // white-pencil hatching on blueprint buries the face in scribble
    const ears = longHair || hair === 'Afro' ? 'Under hair' : jp([['Hidden', 30], ['Little Cs', 30], ['Jug ears', 13], ['Pointy', 8], ['Hoops', 11], ['Studs', 8]]);
    const outfit = jp([['Plain', 18], ['Stripes', 11], ['Collar', 9], ['Tie', 7], ['Bowtie', 7], ['Overalls', 7], ['Hoodie', 8], ['Scarf', 7], ['Pocket', 7], ['Turtleneck', 6], ['Star tee', 5], ['Buttons', 6], ['Zigzag jumper', 6], ['Suspenders', 5], ['Heart tee', 4], ['Medal', 2], ['Cape', 2]]);
    let held = held0 === 'Nothing' ? (jsf() < 0.3 ? 'new' : 'Nothing') : (jsf() < 0.5 ? 'new' : held0);
    if (held === 'new') held = jp([['Ice cream', 12], ['Pencil', 10], ['Umbrella', 9], ['Fish', 7], ['Book', 10], ['Lollipop', 11], ['Paper plane', 9], ['Potted plant', 8], ['Bubble wand', 8], ['Heart balloon', 3]]);
    let pose = jp([['Straight', 50], ['Head tilt', 28], ['Waving', 14], ['Shrug', 8]]);
    if (pose === 'Shrug' && held !== 'Nothing') pose = 'Head tilt';
    let tilt = pose === 'Head tilt' ? (jsf() < 0.5 ? -1 : 1) * jr(0.09, 0.16) : pose === 'Waving' ? jr(-0.06, 0.06) : 0;
    // more waving, shrugging and crossed arms: some of the straight ones change, on their own key
    const pr = own('pose2');
    if (pose === 'Straight') {
      if (pr < 0.26) pose = 'Waving';
      else if (pr < 0.5 && held === 'Nothing') pose = 'Shrug';
      else if (pr >= 0.5 && pr < 0.78 && held === 'Nothing' && build !== 'Tiny') pose = 'Arms crossed';
      if (pose === 'Waving') tilt = (own('tilt2') - 0.5) * 0.12;
    }

    // margins: the original xorshift over the hash's second word picks the first set, and the polish adds more
    let mx = (parseInt(c.hash.slice(10, 18), 16) | 1) >>> 0;
    const mr = () => { mx ^= mx << 13; mx >>>= 0; mx ^= mx >>> 17; mx ^= mx << 5; mx >>>= 0; return mx / 4294967296; };
    const mroll = mr(), mflip = mr() < 0.5 ? -1 : 1, mside = held !== 'Nothing' ? -1 : pose === 'Waving' || pose === 'Shrug' ? 1 : mflip;
    let margin = mroll < 0.3 ? 'Clean' : mroll < 0.48 ? 'Stars' : mroll < 0.62 ? 'Hearts' : mroll < 0.76 ? 'Arrow' : mroll < 0.88 ? 'Spiral' : mroll < 0.96 ? 'Coffee ring' : 'Little buddy';
    if (jsf() < 0.5) margin = jp([['Lightning', 14], ['Sun', 15], ['Clouds', 13], ['Frame', 12], ['Washi tape', 15], ['Speech bubble', 12], ['Music notes', 13], ['Eraser ghost', 4]]);

    // ---------- the legendaries and the gold star: a mulberry32 on the hash's last-but-one words ----------
    // (their own stream, so ordinary doodles and the opening one keep every pick)
    let mb = (parseInt(c.hash.slice(50, 58), 16) ^ 0x6c8e9cf5) >>> 0;
    const mul = () => { mb = (mb + 0x6d2b79f5) >>> 0; let z = mb; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; };
    mul();
    const lr = mul(), legend = lr < 0.0008 ? 'Neon' : lr < 0.0016 ? 'Holo Sticker' : lr < 0.0024 ? 'Flipbook' : null;
    const starOwned = mul() < 0.005;
    const neonRGB = [[255, 74, 178], [70, 236, 255], [178, 255, 72]][Math.floor(mul() * 3)];

    // how the body is coloured in: highlighter bands, or a ballpoint-and-highlighter scribble, or only the accents
    let colouring = ownPick('colouring', [['Bands', 30], ['Scribble', 20], ['Zigzag', 16], ['Scrubbed', 14], ['Accents only', 20]]);
    if (legend === 'Holo Sticker') colouring = 'Bands';   // the foil needs a filled shirt to sit on
    // the page itself: punched holes and a red margin, a coffee ring, washi tape or eraser smudges
    let page = ownPick('page', [['Fresh', 30], ['Hole punched', 22], ['Coffee ring', 18], ['Taped', 16], ['Smudged', 14]]);
    if (page === 'Hole punched' && !/^(Plain|Notebook|Graph|Dot grid|Index card)$/.test(paper)) page = paper === 'Chalkboard' ? 'Smudged' : 'Taped';
    if ((page === 'Coffee ring' && margin === 'Coffee ring') || (page === 'Taped' && margin === 'Washi tape') || (page === 'Smudged' && margin === 'Eraser ghost') || legend === 'Neon') page = 'Fresh';

    c.trait('Paper', paper);
    c.trait('Pen', marker);
    c.trait('Highlighter', hiName);
    c.trait('Age', age);
    c.trait('Head', head);
    c.trait('Skin wash', skin);
    c.trait('Eyes', extra === 'Shades' ? 'Behind shades' : eyes);
    c.trait('Brows', brows);
    c.trait('Nose', nose);
    c.trait('Mouth', mouth);
    c.trait('Ears', ears);
    c.trait('Hair', hair);
    c.trait('Hair fill', hairFill);
    c.trait('Hat', hat);
    c.trait('Outfit', outfit);
    c.trait('Face extra', extra);
    c.trait('Holding', held);
    c.trait('Pose', pose);
    c.trait('Body', build);
    c.trait('Margin', margin);
    c.trait('Colouring', colouring);
    c.trait('Page', page);

    // ---------- the head: one polar outline per shape ----------
    const ph1 = jr(0, 6.28), ph2 = jr(0, 6.28);
    const tri = (a, a0) => { const sec = P * 2 / 3, m = (((a - a0 + sec / 2) % sec) + sec) % sec - sec / 2; return Math.pow(0.5 / Math.cos(m), 0.8); };
    const se = (a, n) => Math.pow(Math.pow(Math.abs(Math.cos(a)), n) + Math.pow(Math.abs(Math.sin(a)), n), -1 / n);
    // x stretch, y stretch, radius by angle, centre drop, eye drop (all in head radii)
    const shapes = {
      Circle: [1, 0.98, () => 1, 0, 0],
      Egg: [0.9, 1.06, a => 1 - 0.1 * Math.sin(a), 0, -0.02],
      Bean: [1.04, 0.95, a => 1 + 0.06 * Math.cos(2 * a) - 0.12 * Math.pow(Math.max(0, Math.cos(a + 0.9 * dir)), 3), 0, 0],
      Square: [0.95, 0.95, a => se(a, 8), 0, 0],
      Triangle: [1.12, 1.26, a => tri(a, -P / 2 + P / 3), 0.14, 0.22],
      Pear: [0.96, 1, a => 1 + 0.15 * Math.sin(a), 0, 0.05],
      Long: [0.78, 1.13, () => 1, 0, -0.02],
      Melon: [1.18, 0.84, () => 1, 0.04, 0.02],
      Squircle: [0.98, 0.98, a => se(a, 3.4), 0, 0],
      'V jaw': [1.08, 1.12, a => tri(a, -P / 2), -0.1, -0.16],
      Lightbulb: [1, 1.04, a => 1 - 0.3 * Math.pow(Math.max(0, Math.sin(a)), 2), -0.04, -0.06],
      Peanut: [0.98, 1.1, a => 1 - 0.15 * Math.exp(-Math.sin(a) * Math.sin(a) / 0.05), 0, 0],
      Potato: [1.02, 0.97, a => 1 + 0.055 * Math.sin(3 * a + ph1) + 0.035 * Math.sin(2 * a + ph2), 0, 0],
    };
    const shp = shapes[head], hcy = hy + shp[3] * R;
    const hp = (a, k) => { const f = shp[2](a) * R * (k || 1); return [hx + Math.cos(a) * f * shp[0], hcy + Math.sin(a) * f * shp[1]]; };
    const rim = []; for (let i = 0; i < 96; i++) rim.push(hp(i / 96 * P * 2));
    let headTop = 1e9, chin = -1e9; for (const p of rim) { headTop = Math.min(headTop, p[1]); chin = Math.max(chin, p[1]); }
    const crossAt = (poly, y) => { let lo = 1e9, hi = -1e9; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; if ((p[1] - y) * (q[1] - y) <= 0 && p[1] !== q[1]) { const x = p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]); if (x < lo) lo = x; if (x > hi) hi = x; } } return lo > hi ? [hx - 10, hx + 10] : [lo, hi]; };
    const spanAt = y => crossAt(rim, y);

    // where the features sit
    const eyeY = hy + R * (-0.08 + shp[4] + ageK[1] / 400 + jr(-0.05, 0.05));
    const eSpan = spanAt(eyeY), fcx = (eSpan[0] + eSpan[1]) / 2, ex = (eSpan[1] - eSpan[0]) / 2 * jr(0.33, 0.47);
    const eyeTilt = jr(-5, 5);
    const mouthY = Math.min(eyeY + R * jr(0.42, 0.56), chin - R * 0.2);
    const mSpan = spanAt(mouthY), mw = Math.max(34, (mSpan[1] - mSpan[0]) / 2 * jr(0.3, 0.48)), mcx = (mSpan[0] + mSpan[1]) / 2 + jr(-12, 12);
    const noseY = eyeY + (mouthY - eyeY) * jr(0.45, 0.6), nx = fcx + jr(-8, 8);
    const patchSide = dir;

    // ---------- the display list: everything baked into the three takes ----------
    const pivot = [hx, chin], tc = Math.cos(tilt), ts = Math.sin(tilt);
    const tiltP = p => [pivot[0] + (p[0] - pivot[0]) * tc - (p[1] - pivot[1]) * ts, pivot[1] + (p[0] - pivot[0]) * ts + (p[1] - pivot[1]) * tc];
    let T = p => p;
    const ops = [];
    let sid = 0;
    const dens = pts => {
      const out = [];
      for (let i = 0; i + 1 < pts.length; i++) {
        const a = pts[i], b = pts[i + 1], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 22));
        for (let k = 0; k < n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
      }
      out.push(pts[pts.length - 1]);
      return out;
    };
    const ring = (cx, cy, rx, ry, n, from, to) => { const out = []; for (let i = 0; i <= n; i++) { const a = (from || 0) + ((to == null ? P * 2 : to) - (from || 0)) * i / n; out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return out; };
    const ln = (pts, w) => ops.push({ t: 'ink', pts: dens(pts.map(p => T(p))), w: (w || 1) * lw, id: sid++ });
    const loop = (pts, w) => { const a = pts[0], b = pts[1]; ln(pts.concat([a, [a[0] + (b[0] - a[0]) * 0.4, a[1] + (b[1] - a[1]) * 0.4]]), w); };
    const spot = (x, y, rr) => { const p = T([x, y]); ops.push({ t: 'dot', x: p[0], y: p[1], r: rr, id: sid++ }); };
    const hl = (outline, col, angle, gap) => ops.push({ t: 'hi', o: outline.map(p => T(p)), col, a: angle == null ? jr(-0.6, 0.6) : angle, gap: gap || 32 });
    const hatch = (outline, angle, gap) => ops.push({ t: 'hatch', o: outline.map(p => T(p)), a: angle, gap: gap || 16, id: sid++ });
    const knock = outline => ops.push({ t: 'knock', o: outline.map(p => T(p)) });
    const region = (outline, fillKind, angle) => {   // knock out what's behind, then colour in by the hair-fill rule
      knock(outline);
      if (fillKind === 'Inked') hatch(outline, angle == null ? 0.9 : angle, 15);
      else if (fillKind === 'Highlighted') hl(outline, hiB(), angle, 26);
    };
    const skinIn = outline => { if (skinCol) ops.push({ t: 'hi', o: outline.map(p => T(p)), col: skinCol, a: 1.1 + jr(-0.2, 0.2), gap: 30, wide: 2, skin: 1 }); };
    const starPts = (x, y, ro, ri, n) => { const p = []; for (let i = 0; i <= n * 2; i++) { const a = -P / 2 + i * P / n; p.push([x + Math.cos(a) * (i % 2 ? ri : ro), y + Math.sin(a) * (i % 2 ? ri : ro)]); } return p; };
    const heartPts = (x, y, s) => { const p = []; for (let i = 0; i <= 26; i++) { const a = i / 26 * P * 2; p.push([x + Math.pow(Math.sin(a), 3) * s, y - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * s / 16]); } return p; };
    const mitt = (x, y, ang, sc) => { const p = []; for (let i = 0; i <= 22; i++) { const a = i / 22 * P * 2, d = ((a - 2.3 + P) % (P * 2)) - P, bump = 1 + 0.45 * Math.exp(-d * d / 0.12), ux = Math.cos(a) * 30 * bump, uy = Math.sin(a) * 34; p.push([x + (ux * Math.cos(ang) - uy * Math.sin(ang)) * sc, y + (ux * Math.sin(ang) + uy * Math.cos(ang)) * sc]); } return p; };

    // an open hand: a palm, four fingers fanned around the angle it points, and a thumb on the side `th`
    const palm = (x, y, ang, sc, th) => { const out = [ring(x, y, 24 * sc, 22 * sc, 12)]; for (let f = 0; f < 4; f++) { const fa = ang - 0.48 + f * 0.32; out.push([[x + Math.sin(fa) * 20 * sc, y - Math.cos(fa) * 18 * sc], [x + Math.sin(fa) * 50 * sc, y - Math.cos(fa) * 48 * sc]]); } const ta = ang + th * 1.35; out.push([[x + Math.sin(ta) * 20 * sc, y - Math.cos(ta) * 18 * sc], [x + Math.sin(ta) * 42 * sc, y - Math.cos(ta) * 36 * sc]]); return out; };
    // ---------- body ----------
    const neckLen = age === 'Baby' ? 30 : age === 'Kid' ? 52 : 68, nw = age === 'Baby' ? 24 : 30;
    const sh = chin + neckLen, slope = jr(30, 55) + (build === 'Slim' ? 16 : build === 'Broad' ? -12 : 0);
    // Tiny: a little body that ends in a hem, with stick legs, under the full-size head
    const hem = build === 'Tiny' ? sh + 0.55 * (1000 - sh) : 1040, shoulderY = build === 'Tiny' ? Math.min(sh + slope + 85, hem - 10) : sh + slope + 85, armY = build === 'Tiny' ? Math.min(shoulderY + 55, hem - 24) : shoulderY + 55;
    let shirt = [[hx - nw - 4, sh], [hx - 200 * bw, sh + slope], [hx - 322 * bw, sh + slope + 85], [hx - 362 * bw, 1040], [hx + 362 * bw, 1040], [hx + 322 * bw, sh + slope + 85], [hx + 200 * bw, sh + slope - 2], [hx + nw + 2, sh - 4]];
    if (build === 'Round') {   // a round tummy: the sides bulge out below the shoulders
      const L = [[hx - nw - 4, sh], [hx - 200 * bw, sh + slope]], Rt = [[hx + nw + 2, sh - 4], [hx + 200 * bw, sh + slope - 2]];
      for (let i = 0; i <= 8; i++) { const u = i / 8, y = sh + slope + 40 + u * (1040 - sh - slope - 40), w = (300 + 125 * Math.sin(Math.PI * u)) * bw; L.push([hx - w, y]); Rt.push([hx + w, y]); }
      shirt = L.concat(Rt.reverse());
    } else if (build === 'Dress') shirt = [[hx - nw - 4, sh], [hx - 170 * bw, sh + slope], [hx - 205 * bw, sh + slope + 70], [hx - 560 * bw, 1040], [hx + 560 * bw, 1040], [hx + 205 * bw, sh + slope + 68], [hx + 170 * bw, sh + slope - 2], [hx + nw + 2, sh - 4]];
    else if (build === 'Tiny') shirt = [[hx - nw - 4, sh], [hx - 200 * bw, sh + slope], [hx - 322 * bw, shoulderY], [hx - 350 * bw, hem], [hx + 350 * bw, hem], [hx + 322 * bw, shoulderY], [hx + 200 * bw, sh + slope - 2], [hx + nw + 2, sh - 4]];
    if (outfit === 'Cape') { const cp = [[hx - 190 * bw, sh + slope], [hx - 470 * bw, 1040], [hx + 470 * bw, 1040], [hx + 190 * bw, sh + slope]]; hl(cp, hiB(), 0.3, 34); ln([[hx - 190 * bw, sh + slope], [hx - 470 * bw, 1040]]); ln([[hx + 190 * bw, sh + slope], [hx + 470 * bw, 1040]]); knock(shirt); }
    const shirtCol = hiA(), shirtAng = jr(-0.5, 0.5);
    const colourIn = o => { if (colouring !== 'Accents only') ops.push({ t: 'hi', o: o.map(p => T(p)), col: shirtCol, a: shirtAng, gap: 30, style: colouring }); };
    colourIn(shirt);
    const neckQ = [[hx - nw, chin - 8], [hx + nw, chin - 8], [hx + nw + 2, sh + 6], [hx - nw - 2, sh + 6]];
    skinIn(neckQ);
    const across = (y, inset) => { const s = crossAt(shirt, y); return [[s[0] + inset, y], [s[1] - inset, y]]; };
    // outfit details
    if (outfit === 'Stripes') for (let i = 0; i < 6; i++) ln(across(shoulderY + 10 + i * 68, 16), 0.55);
    else if (outfit === 'Collar' || outfit === 'Tie') {
      for (const sd of [-1, 1]) { const f = [[hx + sd * (nw + 4), sh - 6], [hx + sd * 104, sh + 26], [hx + sd * 66, sh + 92], [hx + sd * 6, sh + 44]]; knock(f); loop(f, 0.8); }
      if (outfit === 'Tie') { const tie = [[hx - 18, sh + 46], [hx + 18, sh + 46], [hx + 40, sh + 300], [hx, sh + 350], [hx - 40, sh + 300]]; hl(tie, hiB(), 0.9, 18); loop(tie, 0.8); ln([[hx - 18, sh + 70], [hx + 18, sh + 70]], 0.6); }
    } else if (outfit === 'Bowtie') { const l = [[hx, sh + 40], [hx - 70, sh + 10], [hx - 70, sh + 76]], r = [[hx, sh + 40], [hx + 70, sh + 10], [hx + 70, sh + 76]]; hl(l, hiB(), 0.2, 16); hl(r, hiB(), -0.2, 16); loop(l, 0.8); loop(r, 0.8); ln(ring(hx, sh + 42, 14, 16, 10), 0.8); }
    else if (outfit === 'Overalls') { const bib = [[hx - 130 * bw, shoulderY + 30], [hx + 130 * bw, shoulderY + 30], [hx + 150 * bw, 1040], [hx - 150 * bw, 1040]]; hl(bib, hiB(), -0.4, 26); ln([[hx - 130 * bw, 1040], [hx - 130 * bw, shoulderY + 30], [hx + 130 * bw, shoulderY + 30], [hx + 130 * bw, 1040]], 0.8); for (const sd of [-1, 1]) { ln([[hx + sd * 118 * bw, shoulderY + 32], [hx + sd * 170 * bw, sh + slope + 4]], 0.8); spot(hx + sd * 112 * bw, shoulderY + 56, lw * 0.6); } loop([[hx - 60, shoulderY + 110], [hx + 60, shoulderY + 110], [hx + 56, shoulderY + 190], [hx - 56, shoulderY + 190]], 0.6); }
    else if (outfit === 'Hoodie') { ln(ring(hx, sh + 6, 160 * bw, 70, 14, 0.15, P - 0.15), 0.9); for (const sd of [-1, 1]) { ln([[hx + sd * 40, sh + 66], [hx + sd * 46, sh + 220]], 0.5); spot(hx + sd * 46, sh + 226, lw * 0.6); } loop([[hx - 160 * bw, 1040], [hx - 120 * bw, 880], [hx + 120 * bw, 880], [hx + 160 * bw, 1040]], 0.8); }
    else if (outfit === 'Scarf') { const band = [[hx - 120, sh - 34], [hx + 120, sh - 38], [hx + 132, sh + 40], [hx - 128, sh + 44]], tail = [[hx + 30 * dir, sh + 30], [hx + 110 * dir, sh + 30], [hx + 126 * dir, sh + 250], [hx + 46 * dir, sh + 256]]; knock(band); knock(tail); hl(band, hiB(), 0.5, 22); hl(tail, hiB(), 0.5, 22); loop(band); loop(tail); for (let i = 0; i < 4; i++) { const fx = hx + (50 + i * 22) * dir; ln([[fx, sh + 258], [fx + 4 * dir, sh + 300]], 0.5); } ln([[hx + 40 * dir, sh + 110], [hx + 118 * dir, sh + 106]], 0.5); ln([[hx + 42 * dir, sh + 180], [hx + 122 * dir, sh + 176]], 0.5); }
    else if (outfit === 'Pocket') { const px = hx - 160 * bw * dir; const pk = [[px - 50, shoulderY + 30], [px + 50, shoulderY + 30], [px + 46, shoulderY + 130], [px - 46, shoulderY + 132]]; hl(pk, hiB(), 0.7, 18); loop(pk, 0.8); ln([[px + 16, shoulderY + 30], [px + 22, shoulderY - 40]], 1.1); ln([[px + 30, shoulderY + 30], [px + 34, shoulderY - 4]], 0.5); }
    else if (outfit === 'Turtleneck') { const tn = [[hx - nw - 30, sh - 60], [hx + nw + 30, sh - 62], [hx + nw + 40, sh + 24], [hx - nw - 40, sh + 26]]; knock(tn); hl(tn, hiA(), 0.1, 20); loop(tn); ln([[hx - nw - 34, sh - 32], [hx + nw + 34, sh - 34]], 0.5); ln([[hx - nw - 36, sh - 4], [hx + nw + 36, sh - 6]], 0.5); }
    else if (outfit === 'Star tee') { const st = starPts(hx + 10 * dir, shoulderY + 140, 88 * bw, 38 * bw, 5); hl(st, hiB(), 0.2, 20); ln(st, 0.9); }
    else if (outfit === 'Heart tee') { const ht = heartPts(hx + 10 * dir, shoulderY + 130, 80 * bw); hl(ht, hiB(), 0.6, 20); ln(ht, 0.9); }
    else if (outfit === 'Buttons') { ln([[hx, sh + 30], [hx + 4, 1040]], 0.6); for (let i = 0; i < 4; i++) ln(ring(hx + 22, sh + 90 + i * 80, 9, 9, 10), 0.6); }
    else if (outfit === 'Zigzag jumper') { const zt = [], zb = []; for (let i = 0; i <= 12; i++) { const x = hx - 330 * bw + i * 55 * bw, y = shoulderY + 60 + (i % 2 ? -26 : 26); zt.push([x, y]); zb.push([x, y + 70]); } hl(zt.concat(zb.slice().reverse()), hiB(), 0.3, 20); ln(zt, 0.8); ln(zb, 0.8); }
    else if (outfit === 'Suspenders') for (const sd of [-1, 1]) { ln([[hx + sd * 150 * bw, sh + slope + 6], [hx + sd * 120 * bw, 1040]], 0.9); loop([[hx + sd * 140 * bw, shoulderY + 30], [hx + sd * 164 * bw, shoulderY + 30], [hx + sd * 162 * bw, shoulderY + 70], [hx + sd * 138 * bw, shoulderY + 70]], 0.5); }
    else if (outfit === 'Medal') { ln([[hx - 40, sh + 10], [hx, sh + 190], [hx + 40, sh + 10]], 0.7); const md = ring(hx, sh + 240, 50, 50, 18); hl(md, tint('Yellow', 1.2), 0.4, 18); loop(md); ln(starPts(hx, sh + 240, 28, 12, 5), 0.5); }
    if (build === 'Tiny') {   // clear what ran past the hem, then the hem and two stick legs with little feet
      knock([[0, hem + 8], [1000, hem + 8], [1000, 1040], [0, 1040]]);
      ln([shirt[3], shirt[4]]);
      const footY = hem + (985 - hem) * 0.72;
      for (const sd of [-1, 1]) { const lx = hx + sd * Math.max(40, 120 * bw); ln([[lx, hem], [lx + sd * 6, footY]]); loop(ring(lx + sd * 22, footY + 4, 30, 13, 10), 0.85); }
    }
    ln(shirt.slice(0, shirt.length / 2)); ln(shirt.slice(shirt.length / 2));
    ln([[hx - nw - 4, sh], [hx, sh + 30], [hx + nw + 2, sh - 4]], 0.8);
    ln([[hx - nw, chin - 8], [hx - nw - 4, sh]]);
    ln([[hx + nw, chin - 8], [hx + nw + 2, sh - 4]]);
    if (pose === 'Arms crossed') {   // folded arms: one rounded band across the chest, a fist at each end, a line where one forearm lies over the other
      const yC = Math.min(sh + slope + 150, 925), s = crossAt(shirt, yC), s0 = crossAt(shirt, sh + slope + 20), x0 = s[0] + 22, x1 = s[1] - 22, hh = 60;
      const band = ring(x1 - hh, yC, hh, hh, 10, -P / 2, P / 2).concat(ring(x0 + hh, yC, hh, hh, 10, P / 2, P * 1.5));
      for (const sd of [-1, 1]) ln([[sd < 0 ? s0[0] + 40 : s0[1] - 40, sh + slope + 20], [sd < 0 ? x0 + 40 : x1 - 40, yC - hh + 4]], 0.7);
      knock(band); colourIn(band); loop(band, 0.95);
      ln([[hx - 46 * dir, yC - hh + 8], [hx + 34 * dir, yC + hh - 8]], 0.85);
      for (const sd of [-1, 1]) { const fx = sd < 0 ? x0 + 74 : x1 - 74, hand = ring(fx, yC - 6, 30, 32, 12); knock(hand); skinIn(hand); loop(hand, 0.85); }
    }

    // ---------- hair behind the head ----------
    T = tiltP;
    const arc = (a0, a1, k, n) => { const p = []; for (let i = 0; i <= n; i++) p.push(hp(a0 + (a1 - a0) * i / n, k)); return p; };
    let frontHair = null;
    if (hair === 'Afro') {
      const out = []; for (let i = 0; i <= 64; i++) { const a = P * (0.86 + i / 64 * 1.28); out.push(hp(a, 1.3 + 0.09 * Math.abs(Math.sin(i * P / 5)))); }
      const band = out.concat(arc(P * 2.14, P * 0.86, 0.96, 30));
      region(band, hairFill, 0.7); ln(out);
    } else if (hair === 'Bob') {
      const fy = hcy - R * jr(0.4, 0.5), l = spanAt(fy);
      const out = arc(P * 0.66, P * 2.34, 1.13, 40), band = out.concat(arc(P * 2.36, P * 1.9, 0.93, 12), [[l[1] - 20, fy], [hx, fy + 10], [l[0] + 20, fy]], arc(P * 1.1, P * 0.64, 0.93, 12));
      region(band, hairFill, 1.1); loop(band);
    } else if (hair === 'Long') {
      const lb = chin + R * 0.55, a = hp(P * 0.92, 1.12), b = hp(P * 2.08, 1.12), part = [hx + dir * R * 0.18, headTop + R * 0.14];
      const band = [[a[0] - 24, lb]].concat(arc(P * 0.92, P * 2.08, 1.12, 36), [[b[0] + 24, lb], [b[0] - 54, lb]], arc(P * 0.3, -P * 0.12, 0.95, 10), [part], arc(P * 1.12, P * 0.7, 0.95, 10), [[a[0] + 54, lb]]);
      region(band, hairFill, 1.3); loop(band); ln([part, [part[0] - dir * 6, part[1] + R * 0.12]], 0.6);
    } else if (hair === 'Pigtails') {   // puffs behind, the parted cap in front
      for (const sd of [-1, 1]) { const c0 = hp(sd < 0 ? P * 0.98 : P * 0.02, 1.32), puff = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * P * 2, rr = R * (0.26 + 0.03 * Math.abs(Math.sin(a * 3.5))); puff.push([c0[0] + Math.cos(a) * rr * 0.85, c0[1] + Math.sin(a) * rr]); } region(puff, hairFill, 0.4); loop(puff); const tie = hp(sd < 0 ? P * 1.02 : P * 1.98, 1.1); ln(ring(tie[0], tie[1], 16, 16, 10), 0.7); }
      frontHair = () => { const cap = arc(P * 0.98, P * 2.02, 1.05, 30), band = cap.concat(arc(P * 2.02, P * 0.98, 0.95, 30)); region(band, hairFill, 0.4); ln(cap); ln([hp(P * 1.5, 1.05), hp(P * 1.5, 0.8)], 0.6); };
    }

    // ---------- ears ----------
    if (ears !== 'Hidden' && ears !== 'Under hair') for (const sd of [-1, 1]) {
      const ey = eyeY + 14, s = spanAt(ey), x = sd < 0 ? s[0] + 6 : s[1] - 6, flipX = p => [x + (p[0] - x) * sd, p[1]];
      let e;
      if (ears === 'Jug ears') e = ring(x + 22, ey, 40, 54, 14, -P / 2 - 0.3, P / 2 + 0.3).map(flipX);
      else if (ears === 'Pointy') e = [[x, ey - 30], [x + sd * 52, ey - 70], [x + sd * 34, ey + 10], [x, ey + 34]];
      else e = ring(x, ey, 26, 34, 10, -P / 2 - 0.2, P / 2 + 0.2).map(flipX);
      skinIn(e.concat([[x - sd * 6, ey]]));
      ln(e, 0.9);
      if (ears === 'Jug ears') ln(ring(x + 14, ey, 16, 26, 8, -P / 2, P / 2).map(flipX), 0.45);
      if (ears === 'Hoops') ln(ring(x + sd * 14, ey + 58, 18, 22, 14), 0.6);
      if (ears === 'Studs') spot(x + sd * 14, ey + 30, lw * 0.75);
    }

    // ---------- the head itself ----------
    const headLine = []; for (let i = 0; i <= 50; i++) headLine.push(hp(-1.4 + i / 50 * P * 2.08));
    skinIn(rim);
    ln(headLine);
    const crease = (pts, w) => ln(pts, w || 0.42);
    if (age === 'Elder') {
      const fy = (headTop + eyeY) / 2 + R * 0.06, f = spanAt(fy);
      if (!covering && hair !== 'Bob' && hair !== 'Long' && hair !== 'Quiff' && hair !== 'Fringe') for (let k = 0; k < 2; k++) { const y = fy + k * 26, w = (f[1] - f[0]) * (0.24 - k * 0.05); crease([[hx - w, y + 4], [hx - w / 3, y - 4], [hx + w / 3, y + 3], [hx + w, y - 3]]); }
      for (const sd of [-1, 1]) { const x = fcx + sd * ex; crease([[x + sd * 40 * es, eyeY - 12], [x + sd * 58 * es, eyeY - 20]]); crease([[x + sd * 40 * es, eyeY + 6], [x + sd * 58 * es, eyeY + 12]]); crease(ring(x, eyeY + 18, 22, 10, 6, 0.4, P - 0.4)); }
      for (const sd of [-1, 1]) crease([[mcx + sd * (mw + 14), mouthY - 50], [mcx + sd * (mw + 22), mouthY - 16], [mcx + sd * (mw + 14), mouthY + 6]]);
    }
    if (age === 'Baby') { const cy0 = headTop + 6; ln([[hx, cy0 + 4], [hx + 6 * dir, cy0 - 34], [hx + 34 * dir, cy0 - 50], [hx + 44 * dir, cy0 - 26], [hx + 24 * dir, cy0 - 14], [hx + 16 * dir, cy0 - 30]], 0.8); }

    // nose (it stays put while the face reacts)
    const nd = dir;
    if (nose === 'Dot') spot(nx, noseY, lw * 0.75);
    else if (nose === 'Hook') ln([[nx, noseY - 52], [nx + nd * 10, noseY - 24], [nx + nd * 30, noseY + 4], [nx + nd * 4, noseY + 12]], 0.85);
    else if (nose === 'L') ln([[nx, noseY - 50], [nx - nd * 4, noseY + 10], [nx + nd * 24, noseY + 8]], 0.85);
    else if (nose === 'Button') ln(ring(nx, noseY, 15, 13, 12), 0.8);
    else if (nose === 'Bulb') { const b = ring(nx, noseY, 32, 25, 16); hl(b, tint('Pink', 1.2), 0.4, 14); loop(b, 0.85); }
    else if (nose === 'Long') ln([[nx, noseY - 74], [nx + nd * 8, noseY + 6], [nx + nd * 26, noseY + 16], [nx + nd * 10, noseY + 30]], 0.85);
    else if (nose === 'Triangle') loop([[nx, noseY - 34], [nx + nd * 26, noseY + 14], [nx - nd * 10, noseY + 14]], 0.8);
    else if (nose === 'Nostrils') { spot(nx - 12, noseY + 4, lw * 0.5); spot(nx + 12, noseY + 4, lw * 0.5); }
    else if (nose === 'Snub') ln(ring(nx, noseY - 6, 22, 18, 8, 0.2, P - 0.2), 0.85);

    // face extras that don't move with the expression
    const cheek = sd => [fcx + sd * (ex + 24 * es), (eyeY + mouthY) / 2 + 6];
    if (extra === 'Blush') for (const sd of [-1, 1]) { const [x, y] = cheek(sd); hl(ring(x, y, 40, 24, 14), tint('Pink', 1.1), 0.3, 18); for (let k = 0; k < 3; k++) ln([[x - 20 + k * 18, y - 14], [x - 30 + k * 18, y + 12]], 0.4); }
    else if (extra === 'Freckles') for (const sd of [-1, 1]) { const [x, y] = cheek(sd); for (let k = 0; k < 5; k++) spot(x + jr(-30, 30) - sd * 10, y + jr(-18, 18), lw * 0.32); }
    else if (extra === 'Moustache') { const my = mouthY - mw * 0.32 - 14; for (const sd of [-1, 1]) ln([[mcx, my - 4], [mcx + sd * mw * 0.55, my - 6], [mcx + sd * mw * 1.0, my + 12], [mcx + sd * mw * 1.1, my - 10]], 1.35); }
    else if (extra === 'Beard') { const lowY = mouthY + 34, b = arc(P * 0.04, P * 0.96, 1.0, 30).concat([[mcx - mw - 20, lowY - 6], [mcx, lowY + 4], [mcx + mw + 20, lowY - 6]]); region(b, age === 'Elder' ? 'Blank' : 'Inked', 0.5); ln(b.slice(30)); }
    else if (extra === 'Stubble') { for (let k = 0; k < 26; k++) { const p = hp(P * jr(0.15, 0.85), jr(0.72, 0.92)); if (p[1] > mouthY - 20) spot(p[0], p[1], lw * 0.22); } }
    else if (extra === 'Goatee') { const g = [[mcx - mw * 0.4, mouthY + 26], [mcx + mw * 0.4, mouthY + 26], [mcx + 4, Math.min(chin + 34, mouthY + 110)]]; region(g, 'Inked', 0.9); loop(g, 0.8); }
    else if (extra === 'Bandaid') { const [x, y] = cheek(dir), bd = [[x - 44, y - 6], [x + 34, y - 30], [x + 44, y + 2], [x - 34, y + 26]]; knock(bd); loop(bd, 0.7); spot(x - 4, y - 6, lw * 0.25); spot(x + 8, y - 1, lw * 0.25); spot(x + 2, y + 6, lw * 0.25); }
    else if (extra === 'Mole') spot(mcx + dir * (mw + 10), mouthY - 30, lw * 0.4);
    else if (extra === 'Sweat drop') { const s = spanAt(eyeY - 60), x = dir > 0 ? s[1] - 30 : s[0] + 30, y = eyeY - 70, d = [[x, y - 34], [x + 18, y], [x, y + 18], [x - 18, y]]; hl(d, tint('Blue', 1.2), 0.2, 12); loop([[x, y - 34], [x + 16, y - 2], [x + 8, y + 16], [x - 8, y + 16], [x - 16, y - 2]], 0.6); }

    // ---------- hair on top ----------
    const hairBand = (outer, a0, a1, k, angle) => { const band = outer.concat(arc(a1, a0, k, 24)); region(band, hairFill, angle); ln(outer); };
    if (hair === 'Three hairs') for (let k = -1; k <= 1; k++) { const b0 = hp(P * 1.5 + k * 0.18, 0.99); ln([b0, [b0[0] + k * 34 + 10, b0[1] - 60], [b0[0] + k * 52, b0[1] - 92]], 0.85); }
    else if (hair === 'Spikes') { const z = []; for (let i = 0; i <= 10; i++) z.push(hp(P * (1.06 + i / 10 * 0.88), i % 2 ? 1.32 : 1.0)); hairBand(z, P * 1.06, P * 1.94, 0.97, 0.3); }
    else if (hair === 'Curly') { const z = []; for (let i = 0; i <= 70; i++) { const a = P * (1.0 + i / 70), p = hp(a, 1.1 + 0.12 * Math.sin(i * 0.9)); z.push([p[0] + Math.cos(i * 0.9) * 20, p[1]]); } hairBand(z, P, P * 2, 0.97, 1.2); }
    else if (hair === 'Ponytail') {
      const p0 = hp(P * 1.5 + dir * 0.36 * P, 1.02), tail = [p0, [p0[0] + dir * 90, p0[1] - 30], [p0[0] + dir * 145, p0[1] + 60], [p0[0] + dir * 116, p0[1] + 175], [p0[0] + dir * 64, p0[1] + 214], [p0[0] + dir * 70, p0[1] + 120]];
      region(tail, hairFill, 0.9); loop(tail); ln(ring(p0[0] + dir * 6, p0[1] + 4, 20, 20, 10), 0.8);
      hairBand(arc(P * 1.02, P * 1.98, 1.06, 26), P * 1.02, P * 1.98, 0.96, 0.9);
    } else if (hair === 'Fringe') { const fy = hcy - R * jr(0.38, 0.5), l = spanAt(fy), cap = arc(P * 0.95, P * 2.05, 1.05, 30), z = []; for (let i = 0; i <= 8; i++) z.push([l[1] - 10 - i * (l[1] - l[0] - 20) / 8, fy - (i % 2 ? R * 0.14 : 0)]); const band = cap.concat(z); region(band, hairFill, 0.8); loop(band); }
    else if (hair === 'Mohawk') { const z = []; for (let i = 0; i <= 8; i++) z.push(hp(P * (1.34 + i / 8 * 0.32), i % 2 ? 1.55 : 0.99)); hairBand(z, P * 1.34, P * 1.66, 0.97, 1.4); for (let k = 0; k < 12; k++) { const p = hp(P * (k < 6 ? jr(1.12, 1.3) : jr(1.7, 1.88)), jr(0.78, 0.95)); spot(p[0], p[1], lw * 0.2); } }
    else if (hair === 'Side part') { const out = arc(P * 0.94, P * 2.06, 1.1, 30), partP = hp(P * 1.5 - dir * 0.2 * P, 0.97), inner = dir > 0 ? [hp(P * 2.06, 0.95), hp(P * 1.92, 0.82), [hx + R * 0.2, hcy - R * 0.5], partP, hp(P * 1.12, 0.86), hp(P * 0.94, 0.95)] : [hp(P * 2.06, 0.95), hp(P * 1.88, 0.86), partP, [hx - R * 0.2, hcy - R * 0.5], hp(P * 1.08, 0.82), hp(P * 0.94, 0.95)]; const band = out.concat(inner); region(band, hairFill, 0.6 * dir); loop(band); ln([partP, hp(P * 1.5 - dir * 0.2 * P, 1.1)], 0.6); }
    else if (hair === 'Bun') { const fy = hcy - R * 0.5, l = spanAt(fy), cap = arc(P * 0.97, P * 2.03, 1.04, 28), band = cap.concat([[l[1] - 6, fy], [hx + dir * 20, fy - 22], [l[0] + 6, fy]]); region(band, hairFill, 0.5); loop(band); const bn = hp(P * 1.5 + dir * 0.1, 1.24), bun = ring(bn[0], bn[1], R * 0.27, R * 0.24, 18); region(bun, hairFill, 1.1); loop(bun); ln(ring(bn[0], bn[1], R * 0.12, R * 0.1, 10, 0.5, 4), 0.5); }
    else if (hair === 'Comb-over') for (let i = 0; i < 5; i++) { const a = hp(P * (1.02 + i * 0.03), 0.98 - i * 0.02), b = hp(P * (1.9 - i * 0.04), 0.96 - i * 0.03); ln([a, [hx - dir * 20, headTop + R * (0.04 + i * 0.07)], b], 0.5); }
    else if (hair === 'Quiff') { const top = headTop, q = [hp(P * (dir > 0 ? 1.1 : 1.9), 1.0), [hx - dir * R * 0.35, top - R * 0.32], [hx + dir * R * 0.2, top - R * 0.52], [hx + dir * R * 0.66, top - R * 0.24], [hx + dir * R * 0.5, top + R * 0.04], [hx + dir * R * 0.22, top + R * 0.12], [hx + dir * R * 0.34, top - R * 0.08]]; const band = q.concat(dir > 0 ? arc(P * 1.72, P * 1.1, 0.97, 16) : arc(P * 1.28, P * 1.9, 0.97, 16)); region(band, hairFill, 0.6); ln(q); ln([[hx - dir * R * 0.1, top - R * 0.28], [hx + dir * R * 0.36, top - R * 0.3]], 0.5); ln([[hx - dir * R * 0.24, top - R * 0.08], [hx + dir * R * 0.04, top - R * 0.3], [hx + dir * R * 0.44, top - R * 0.14]], 0.45); ln([[hx + dir * R * 0.3, top - R * 0.02], [hx + dir * R * 0.5, top - R * 0.1]], 0.4); }
    else if (hair === 'Buzz') for (let k = 0; k < 34; k++) { const p = hp(P * jr(1.08, 1.92), jr(0.62, 0.95)); if (p[1] < hcy - R * 0.32) spot(p[0], p[1], lw * 0.24); }
    else if (hair === 'Bald') { ln(ring(hx + dir * R * 0.36, headTop + R * 0.36, R * 0.22, R * 0.18, 6, P * 1.12, P * 1.58), 0.45); ln(ring(hx + dir * R * 0.36, headTop + R * 0.36, R * 0.12, R * 0.1, 4, P * 1.15, P * 1.5), 0.45); }
    if (frontHair) frontHair();

    // ---------- hats ----------
    const bandY = headTop + R * 0.42, bs0 = spanAt(bandY), bwid = (bs0[1] - bs0[0]) / 2, bc = (bs0[0] + bs0[1]) / 2;
    const hatSolid = (outline, col, angle) => { knock(outline); if (col) hl(outline, col, angle, 26); };
    let propAt = null;
    if (hat === 'Beanie') { const dome = [[bc - bwid - 10, bandY]].concat(ring(bc, bandY, bwid + 10, R * 0.74, 16, P, P * 2), [[bc + bwid + 10, bandY]]), cuff = [[bc - bwid - 16, bandY - R * 0.16], [bc + bwid + 16, bandY - R * 0.17], [bc + bwid + 18, bandY + R * 0.08], [bc - bwid - 18, bandY + R * 0.09]]; hatSolid(dome, hiB(), 1.2); hatSolid(cuff, hiB(), -0.3); ln(dome); loop(cuff); for (let k = 1; k < 8; k++) { const x = bc - bwid + k * bwid * 2 / 8; ln([[x, bandY - R * 0.12], [x, bandY + R * 0.04]], 0.4); } const pom = ring(bc, bandY - R * 0.74 - 34, 38, 36, 14); hatSolid(pom, null); loop(pom); }
    else if (hat === 'Cap') { const dome = ring(bc, bandY + 10, bwid, R * 0.62, 16, P, P * 2), brim = [[bc + dir * bwid, bandY + 10], [bc + dir * (bwid + R * 0.7), bandY + 26], [bc + dir * (bwid + R * 0.62), bandY - 8], [bc + dir * bwid * 0.6, bandY - 6]]; hatSolid(dome.concat([dome[0]]), hiB(), -0.6); hatSolid(brim, hiB(), 0.2); ln(dome.concat([dome[0]])); loop(brim); spot(bc, bandY + 10 - R * 0.62, lw * 0.6); }
    else if (hat === 'Top hat') { const box = [[bc - bwid * 0.62, bandY - 2], [bc - bwid * 0.58, bandY - R * 1.0], [bc + bwid * 0.58, bandY - R * 1.02], [bc + bwid * 0.62, bandY - 4]]; hatSolid(box, hiB(), 0.4); ln(box); ln([[bc - bwid - 34, bandY + 2], [bc + bwid + 34, bandY - 6]]); ln([[bc - bwid * 0.6, bandY - R * 0.2], [bc + bwid * 0.6, bandY - R * 0.22]], 0.6); }
    else if (hat === 'Antenna') for (const sd of [-1, 1]) { const b0 = hp(P * 1.5 + sd * 0.16, 0.99), tip = [b0[0] + sd * 52, b0[1] - 120]; ln([b0, [b0[0] + sd * 10, b0[1] - 60], tip], 0.85); const ball = ring(tip[0] + sd * 4, tip[1] - 22, 26, 26, 12); hl(ball, hiB(), 0.5, 14); loop(ball); }
    else if (hat === 'Crown') { const cw = bwid * 0.8, by = headTop + R * 0.12, cr = [[bc - cw, by], [bc - cw * 1.08, by - R * 0.55], [bc - cw * 0.5, by - R * 0.25], [bc, by - R * 0.62], [bc + cw * 0.5, by - R * 0.25], [bc + cw * 1.08, by - R * 0.55], [bc + cw, by]]; hatSolid(cr, hiB(), 0.3); loop(cr); for (const p of [cr[1], cr[3], cr[5]]) spot(p[0], p[1] - 10, lw * 0.6); }
    else if (hat === 'Party hat') { const ap = [bc + dir * R * 0.12, headTop - R * 0.95], l = [bc - bwid * 0.58, headTop + R * 0.24], r = [bc + bwid * 0.58, headTop + R * 0.2], cone = [l, ap, r]; hatSolid(cone, hiB(), 0.9); loop(cone); for (let k = 1; k < 4; k++) { const f = k / 4; ln([[l[0] + (ap[0] - l[0]) * f, l[1] + (ap[1] - l[1]) * f], [r[0] + (ap[0] - r[0]) * f, r[1] + (ap[1] - r[1]) * f]], 0.5); } ln(starPts(ap[0], ap[1] - 10, 30, 14, 6), 0.6); }
    else if (hat === 'Bucket hat') { const crown = [[bc - bwid * 0.8, bandY], [bc - bwid * 0.62, bandY - R * 0.64], [bc + bwid * 0.62, bandY - R * 0.66], [bc + bwid * 0.8, bandY - 2]], brim = [[bc - bwid * 0.84, bandY - 6], [bc - bwid - 64, bandY + 48], [bc + bwid + 64, bandY + 44], [bc + bwid * 0.84, bandY - 8]]; hatSolid(crown, hiB(), 0.6); hatSolid(brim, hiB(), -0.4); loop(crown); loop(brim); ln([[bc - bwid - 30, bandY + 32], [bc + bwid + 30, bandY + 28]], 0.4); }
    else if (hat === 'Beret') { const b = ring(bc + dir * bwid * 0.28, headTop + R * 0.1, bwid * 0.98, R * 0.3, 22); hatSolid(b, hiB(), 0.8); loop(b); ln([[bc + dir * bwid * 0.2, headTop - R * 0.2], [bc + dir * bwid * 0.26, headTop - R * 0.3]], 0.9); }
    else if (hat === 'Paper hat') { const tp = [[bc - bwid * 1.02, bandY + 8], [bc + dir * bwid * 0.06, headTop - R * 0.78], [bc + bwid * 1.02, bandY + 2]]; hatSolid(tp, null); loop(tp); ln([[bc - bwid * 0.96, bandY - 30], [bc + bwid * 0.96, bandY - 36]], 0.7); for (let k = 0; k < 4; k++) { const y = bandY - 70 - k * 34, w = bwid * (0.5 - k * 0.1), z = []; for (let i = 0; i <= 8; i++) z.push([bc - w + i * w / 4, y + (i % 2 ? -4 : 4)]); ln(z, 0.32); } }
    else if (hat === 'Bow') { const c0 = hp(P * 1.5 + dir * 0.55, 1.02), l = [[c0[0], c0[1]], [c0[0] - 70, c0[1] - 46], [c0[0] - 66, c0[1] + 42]], r = [[c0[0], c0[1]], [c0[0] + 70, c0[1] - 42], [c0[0] + 64, c0[1] + 46]]; hatSolid(l, hiB(), 0.3); hatSolid(r, hiB(), -0.3); loop(l, 0.85); loop(r, 0.85); const kn = ring(c0[0], c0[1], 16, 18, 10); knock(kn); loop(kn, 0.8); }
    else if (hat === 'Propeller cap') { const dome = ring(bc, bandY + 10, bwid * 0.96, R * 0.6, 16, P, P * 2); hatSolid(dome.concat([dome[0]]), hiB(), 0.5); ln(dome.concat([dome[0]])); for (let k = 1; k < 4; k++) ln([[bc, bandY + 10 - R * 0.6], hp(P * (1.0 + k * 0.25), 0.9)], 0.4); const st = [bc, bandY + 10 - R * 0.6]; ln([st, [st[0], st[1] - 50]], 0.8); propAt = T([st[0], st[1] - 54]); }
    else if (hat === 'Chef hat') { const bandP = [[bc - bwid * 0.78, bandY + 4], [bc - bwid * 0.74, bandY - R * 0.3], [bc + bwid * 0.74, bandY - R * 0.32], [bc + bwid * 0.78, bandY + 2]], puff = []; for (let i = 0; i <= 40; i++) { const a = P * (0.92 + i / 40 * 1.16), rr = 1 + 0.12 * Math.abs(Math.sin(i * P / 10)); puff.push([bc + Math.cos(a) * bwid * 1.05 * rr, bandY - R * 0.62 + Math.sin(a) * R * 0.5 * rr]); } const all = [bandP[0], bandP[1]].concat(puff, [bandP[2], bandP[3]]); hatSolid(all, null); loop(all); ln([bandP[1], bandP[2]], 0.7); ln([[bc - 30, bandY - R * 0.36], [bc - 40, bandY - R * 0.7]], 0.4); ln([[bc + 34, bandY - R * 0.36], [bc + 44, bandY - R * 0.68]], 0.4); }
    else if (hat === 'Wizard hat') { const ap = [bc + dir * R * 0.62, headTop - R * 1.05], cone = [[bc - bwid * 0.7, bandY - 6], [bc - dir * bwid * 0.05, headTop - R * 0.52], ap, [bc + dir * bwid * 0.2, headTop - R * 0.4], [bc + bwid * 0.7, bandY - 8]]; const brim = ring(bc, bandY, bwid + 64, 30, 22); hatSolid(brim, hiB(), 0.3); hatSolid(cone, hiB(), 1.0); loop(brim); loop(cone); for (let k = 0; k < 3; k++) ln(starPts(bc + (k - 1) * bwid * 0.36, bandY - R * (0.3 + 0.18 * (k % 2)), 15, 6, 5), 0.4); }
    else if (hat === 'Flower crown') for (let k = 0; k < 6; k++) { const p = hp(P * (1.12 + k * 0.76 / 5), 1.04), fl = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * P * 2, rr = 13 + 11 * Math.abs(Math.cos(a * 2.5)); fl.push([p[0] + Math.cos(a) * rr, p[1] + Math.sin(a) * rr]); } hl(fl, k % 2 ? hiA() : hiB(), 0.5, 12); ln(fl, 0.55); spot(p[0], p[1], lw * 0.4); }
    else if (hat === 'Bandana') { const bd = [[bs0[0] - 8, bandY + 6], [bs0[1] + 8, bandY], [bs0[1] + 6, bandY + 50], [bs0[0] - 6, bandY + 56]]; hatSolid(bd, hiB(), 0.2); loop(bd); const kx = dir > 0 ? bs0[1] + 6 : bs0[0] - 6; loop([[kx, bandY + 24], [kx + dir * 70, bandY - 6], [kx + dir * 60, bandY + 30]], 0.7); loop([[kx, bandY + 30], [kx + dir * 64, bandY + 70], [kx + dir * 30, bandY + 76]], 0.7); for (let k = 0; k < 5; k++) spot(bc - bwid * 0.7 + k * bwid * 0.35, bandY + 28, lw * 0.3); }
    else if (hat === 'Halo') { const h = ring(bc, headTop - R * 0.3, bwid * 0.78, R * 0.14, 24), hin = ring(bc, headTop - R * 0.3, bwid * 0.5, R * 0.06, 24); hl(h, tint('Yellow', 1.3), 0.2, 14); ln(h, 0.9); ln(hin, 0.45); for (let k = 0; k < 7; k++) { const a = P * (1.08 + k * 0.84 / 6), p = [bc + Math.cos(a) * bwid * 0.95, headTop - R * 0.34 + Math.sin(a) * R * 0.3]; ln([p, [p[0] + Math.cos(a) * 28, p[1] + Math.sin(a) * 22]], 0.4); } }

    // ---------- arms and what the hands hold ----------
    T = p => p;
    const H = [hx + Math.max(290 * bw, R * 1.12 + 60), sh + 50];
    if (held !== 'Nothing') {
      ln([[hx + 318 * bw, armY], [H[0] + 8, H[1] + 34]]);
      const m = mitt(H[0], H[1], -0.3, 1); skinIn(m); loop(m, 0.9); for (let f = 0; f < 2; f++) ln([[H[0] - 4 + f * 4, H[1] - 8 + f * 16], [H[0] + 22 + f * 2, H[1] - 12 + f * 16]], 0.38);
    }
    const [ux, uy] = H;
    if (held === 'Balloon') { ln([[ux, uy - 30], [ux + 30, uy - 160], [ux + 10, uy - 300]], 0.6); const b = ring(ux + 20, uy - 400, 90, 110, 22); hl(b, hiB(), 0.9, 26); loop(b); ln([[ux + 10, uy - 290], [ux + 26, uy - 290], [ux + 18, uy - 300]], 0.6); }
    else if (held === 'Flower') { ln([[ux, uy - 30], [ux - 10, uy - 200]]); for (let k = 0; k < 6; k++) { const a = k / 6 * P * 2; loop(ring(ux - 10 + Math.cos(a) * 46, uy - 220 + Math.sin(a) * 46, 30, 30, 10), 0.8); } const ctr = ring(ux - 10, uy - 220, 26, 26, 12); hl(ctr, hiB(), 0.5, 14); loop(ctr); ln(ring(ux + 26, uy - 120, 40, 18, 8, P, P * 2), 0.6); }
    else if (held === 'Mug') { const m = [[ux - 60, uy - 150], [ux + 50, uy - 150], [ux + 44, uy - 20], [ux - 54, uy - 20]]; hl(m, hiB(), -0.3, 24); loop(m); ln(ring(ux + 60, uy - 90, 34, 36, 12, -P / 2, P / 2)); for (let k = 0; k < 2; k++) ln([[ux - 20 + k * 30, uy - 180], [ux - 30 + k * 30, uy - 220], [ux - 15 + k * 30, uy - 260]], 0.55); }
    else if (held === 'Tiny flag') { ln([[ux, uy - 20], [ux, uy - 300]]); const f = [[ux, uy - 300], [ux + 150, uy - 260], [ux, uy - 210]]; hl(f, hiB(), 0.2, 20); loop(f); }
    else if (held === 'Star wand') { ln([[ux, uy - 20], [ux - 20, uy - 240]]); const st = starPts(ux - 22, uy - 300, 80, 34, 5); hl(st, hiB(), 0.1, 18); ln(st); for (let k = 0; k < 3; k++) ln([[ux + 60 + k * 10, uy - 360 + k * 50], [ux + 84 + k * 10, uy - 372 + k * 50]], 0.4); }
    else if (held === 'Ice cream') { const cone = [[ux - 42, uy - 40], [ux + 42, uy - 40], [ux + 2, uy + 60]]; hl(cone, tint('Orange', 0.8), 0.6, 16); loop(cone); ln([[ux - 24, uy - 30], [ux + 8, uy + 30]], 0.4); ln([[ux + 24, uy - 30], [ux - 8, uy + 30]], 0.4); const s1 = ring(ux, uy - 84, 50, 44, 18), s2 = ring(ux + 8, uy - 150, 42, 38, 18); hl(s1, hiB(), 0.4, 16); hl(s2, hiA(), -0.4, 16); loop(s1); loop(s2); ln([[ux + 30, uy - 52], [ux + 34, uy - 22]], 0.6); }
    else if (held === 'Pencil') { const pb = [[ux - 18, uy - 10], [ux + 18, uy - 10], [ux + 18, uy - 300], [ux - 18, uy - 300]]; hl(pb, hiB(), 0.1, 18); loop(pb, 0.85); loop([[ux - 18, uy - 300], [ux, uy - 360], [ux + 18, uy - 300]], 0.85); spot(ux, uy - 352, lw * 0.6); ln([[ux - 18, uy - 50], [ux + 18, uy - 50]], 0.6); ln([[ux, uy - 50], [ux, uy - 300]], 0.35); }
    else if (held === 'Umbrella') { const tip = [ux + 80, uy - 300]; ln([[ux - 4, uy + 40], [ux, uy - 10], tip], 0.9); ln(ring(ux - 20, uy + 40, 18, 18, 8, 0, P), 0.8); const can = []; for (let i = 0; i <= 24; i++) { const a = P + i / 24 * P; can.push([tip[0] + Math.cos(a) * 150, tip[1] + 10 + Math.sin(a) * 110]); } for (let i = 4; i >= 0; i--) { const x0 = tip[0] - 150 + i * 60; can.push([x0 + 30, tip[1] + 2], [x0, tip[1] + 10]); } hl(can, hiB(), 0.7, 26); loop(can); for (let i = 1; i < 5; i++) ln([[tip[0], tip[1] - 100], [tip[0] - 150 + i * 60, tip[1] + 10]], 0.4); }
    else if (held === 'Fish') { const f = ring(ux, uy - 150, 42, 104, 22); hl(f, hiB(), 0.6, 18); loop(f); loop([[ux, uy - 46], [ux - 34, uy - 6], [ux + 34, uy - 6]], 0.8); spot(ux + 10, uy - 220, lw * 0.5); ln(ring(ux, uy - 210, 34, 22, 8, 0.2, P - 0.2), 0.5); }
    else if (held === 'Book') { const bk = [[ux - 74, uy - 168], [ux + 62, uy - 180], [ux + 72, uy - 6], [ux - 62, uy + 6]]; hl(bk, hiB(), -0.5, 24); loop(bk); ln([[ux - 60, uy - 168], [ux - 50, uy + 4]], 0.6); for (let k = 0; k < 3; k++) ln([[ux - 24, uy - 140 + k * 36], [ux + 40, uy - 146 + k * 36]], 0.4); }
    else if (held === 'Lollipop') { ln([[ux, uy - 10], [ux - 6, uy - 220]], 0.85); const d = ring(ux - 6, uy - 290, 72, 72, 22); hl(d, hiB(), 0.3, 20); loop(d); const sp = []; for (let i = 0; i <= 40; i++) { const a = i * 0.42, rr = 4 + i * 1.6; sp.push([ux - 6 + Math.cos(a) * rr, uy - 290 + Math.sin(a) * rr]); } ln(sp, 0.55); }
    else if (held === 'Paper plane') { const pl = [[ux - 40, uy - 60], [ux + 150, uy - 170], [ux + 10, uy - 40], [ux + 40, uy + 10]]; hl(pl, hiB(), 0.2, 18); loop(pl, 0.85); ln([[ux + 10, uy - 40], [ux + 150, uy - 170]], 0.5); for (let k = 0; k < 3; k++) ln([[ux + 120 + k * 22, uy - 230 - k * 12], [ux + 170 + k * 22, uy - 256 - k * 12]], 0.35); }
    else if (held === 'Potted plant') { const pot = [[ux - 56, uy - 70], [ux + 56, uy - 70], [ux + 40, uy + 20], [ux - 40, uy + 20]]; hl(pot, tint('Orange', 0.9), 0.4, 18); loop(pot); ln([[ux - 62, uy - 70], [ux + 62, uy - 70]], 0.9); ln([[ux, uy - 70], [ux - 6, uy - 200], [ux + 8, uy - 260]], 0.8); for (let k = 0; k < 3; k++) { const ly = uy - 110 - k * 50, sd = k % 2 ? 1 : -1, lf = [[ux, ly], [ux + sd * 50, ly - 40], [ux + sd * 80, ly - 10], [ux + sd * 30, ly + 8]]; hl(lf, tint('Green', 1.1), 0.5, 12); loop(lf, 0.6); } }
    else if (held === 'Bubble wand') { ln([[ux, uy - 10], [ux - 10, uy - 200]], 0.85); ln(ring(ux - 12, uy - 236, 34, 36, 14), 0.8); for (let k = 0; k < 3; k++) { const b = ring(ux + 60 + k * 50, uy - 330 - k * 70, 30 - k * 4, 30 - k * 4, 14); hl(b, hiB(), 0.6, 10); ln(b, 0.5); ln(ring(ux + 52 + k * 50, uy - 338 - k * 70, 12, 12, 4, P, P * 1.5), 0.3); } }
    else if (held === 'Heart balloon') { ln([[ux, uy - 30], [ux + 30, uy - 160], [ux + 10, uy - 290]], 0.6); const hb = heartPts(ux + 16, uy - 380, 104); hl(hb, tint('Pink', 1.2), 0.8, 22); ln(hb); }
    if (pose === 'Shrug') for (const sd of [-1, 1]) { const el = [hx + sd * 380 * bw, shoulderY + 90], hd = [hx + sd * 400 * bw, shoulderY - 40]; ln([[hx + sd * 318 * bw, armY], el, hd], 1); const pl = palm(hd[0], hd[1] - 16, sd * 0.9, 0.9, -sd); skinIn(pl[0]); pl.forEach((q, i) => ln(q, i ? 0.6 : 0.85)); ln([[hd[0] + sd * 50, hd[1] - 60], [hd[0] + sd * 66, hd[1] - 80]], 0.4); }
    // the waving hand changes with each take, so the wave plays at the line's boil
    const waver = pose === 'Waving' ? { from: [hx - 318 * bw, armY], hand: [hx - Math.max(330 * bw, R * 1.05 + 70), sh - 70] } : null;

    // ---------- margin doodles ----------
    const mx0 = mside > 0 ? 840 : 160;
    if (margin === 'Stars') for (let k = 0; k < 3; k++) { const sx = mx0 + (mr() - 0.5) * 120, sy = 140 + k * 170 + mr() * 60, r = 28 + mr() * 22, st = []; for (let i = 0; i <= 10; i++) { const a = -P / 2 + i * P * 4 / 5; st.push([sx + Math.cos(a) * r, sy + Math.sin(a) * r]); } ln(st, 0.7); }
    else if (margin === 'Hearts') for (let k = 0; k < 3; k++) { const sx = mx0 + (mr() - 0.5) * 120, sy = 150 + k * 160 + mr() * 50, r = 22 + mr() * 16; ln(heartPts(sx, sy, r), 0.7); }
    else if (margin === 'Arrow') { const y0 = 200 + mr() * 120, tipX = hx + mside * (R * 1.1 + 40), tipY = hy - 40; ln([[mx0 + mside * 60, y0 - 80], [mx0, y0], [tipX + mside * 90, tipY - 30], [tipX, tipY]], 0.7); ln([[tipX + mside * 50, tipY - 50], [tipX, tipY], [tipX + mside * 60, tipY + 18]], 0.7); }
    else if (margin === 'Spiral') { const sx = mx0, sy = 220 + mr() * 120, sp = []; for (let i = 0; i <= 50; i++) { const a = i / 50 * P * 6, rr = 6 + i * 1.6; sp.push([sx + Math.cos(a) * rr, sy + Math.sin(a) * rr]); } ln(sp, 0.7); }
    else if (margin === 'Little buddy') { const sx = mx0, sy = 260; loop(ring(sx, sy, 46, 44, 16), 0.7); spot(sx - 16, sy - 6, 7); spot(sx + 16, sy - 6, 7); ln(ring(sx, sy + 10, 20, 14, 8, 0.3, P - 0.3), 0.6); ln([[sx, sy + 44], [sx, sy + 150]], 0.7); ln([[sx - 50, sy + 80], [sx + 50, sy + 80]], 0.7); ln([[sx, sy + 150], [sx - 34, sy + 220]], 0.7); ln([[sx, sy + 150], [sx + 34, sy + 220]], 0.7); }
    else if (margin === 'Lightning') { const bx = mx0, by = 180 + mr() * 80, bolt = [[bx + 20, by - 90], [bx - 40, by + 10], [bx, by + 10], [bx - 30, by + 110], [bx + 50, by - 20], [bx + 10, by - 20], [bx + 40, by - 90]]; hl(bolt, tint('Yellow', 1.2), 0.3, 16); loop(bolt, 0.7); }
    else if (margin === 'Sun') { const sx = mside > 0 ? 880 : 120, sy = 120, s = ring(sx, sy, 56, 56, 18); hl(s, tint('Yellow', 1.2), 0.5, 18); loop(s, 0.8); for (let k = 0; k < 9; k++) { const a = k / 9 * P * 2 + 0.2; ln([[sx + Math.cos(a) * 76, sy + Math.sin(a) * 76], [sx + Math.cos(a) * 112, sy + Math.sin(a) * 112]], 0.6); } }
    else if (margin === 'Clouds') for (let k = 0; k < 2; k++) { const cx = mx0 + (k ? -30 : 30) * mside, cy = 150 + k * 210, cl = []; for (let i = 0; i <= 36; i++) { const a = i / 36 * P * 2, rr = 1 + 0.18 * Math.abs(Math.sin(a * 2.5)); cl.push([cx + Math.cos(a) * 80 * rr, cy + Math.sin(a) * 40 * rr]); } ln(cl, 0.6); }
    else if (margin === 'Frame') ln([[60, 70], [940, 52], [954, 940], [52, 952], [62, 40]], 0.7);
    else if (margin === 'Speech bubble') { const bx = mside > 0 ? 815 : 185, by = 150, b = ring(bx, by, 130, 82, 24, 0.5 * mside + P / 2, 0.5 * mside + P / 2 + P * 1.82); ln(b.concat([[hx + mside * R * 0.5, headTop + 20], b[0]]), 0.7); for (let k = 0; k < 3; k++) { const z = []; for (let i = 0; i <= 10; i++) z.push([bx - 80 + i * 16, by - 34 + k * 30 + Math.sin(i * 1.4 + k) * 6]); ln(k === 2 ? z.slice(0, 7) : z, 0.35); } }
    else if (margin === 'Music notes') for (let k = 0; k < 3; k++) { const x = mx0 + (k - 1) * 50 * mside, y = 160 + k * 110 + (k % 2) * 30; spot(x, y + 60, 15); ln([[x + 13, y + 58], [x + 13, y - 20]], 0.6); ln([[x + 13, y - 20], [x + 40, y + 6], [x + 34, y + 30]], 0.6); }


    if (legend === 'Neon') { c.trait('Paper', 'Night card'); c.trait('Pen', 'Neon gel'); }
    if (starOwned) c.trait('Coveted', 'Gold Star');
    if (legend) c.trait('Legendary', legend);

    // ================= the pixel page =================
    // A fixed 64 x 64 grid of hard square cells: the paper, the marker line and the
    // highlighter are all set in whole cells, written into ImageData and scaled up
    // unsmoothed. The line still boils: three takes, each a cell off here and there.
    const N = 64, NN = N * N, CU = N / 1000;
    const paperCol = legend === 'Neon' ? '#100d18' : { Plain: '#f7f4ec', Notebook: '#f9f7f0', Graph: '#f4f6f2', 'Sticky note': '#fbe97a', 'Pink sticky note': '#ffbcd6', 'Blue sticky note': '#abdcf4', 'Green sticky note': '#c9ef9e', Chalkboard: '#2d3b33', 'Dot grid': '#f6f4ef', 'Index card': '#fdfcf8', Kraft: '#c8a676', Napkin: '#f7f5f0', Blueprint: '#21508f', 'Black card': '#1b1a1f' }[paper];
    const rgba = s => {
      if (s[0] === '#') { const h = s.length === 4 ? s[1] + s[1] + s[2] + s[2] + s[3] + s[3] : s.slice(1, 7), v = parseInt(h, 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255, 1]; }
      const m = s.match(/[\d.]+/g).map(Number); return [m[0], m[1], m[2], m.length > 3 ? m[3] : 1];
    };
    const blend = (a, b, k) => [Math.round(a[0] + (b[0] - a[0]) * k), Math.round(a[1] + (b[1] - a[1]) * k), Math.round(a[2] + (b[2] - a[2]) * k)];
    const pack = q => (0xff000000 | (q[2] << 16) | (q[1] << 8) | q[0]) >>> 0;
    const PB = rgba(paperCol), INKRGB = legend === 'Neon' ? neonRGB : rgba(ink);
    const INK = pack(INKRGB), GRAIN = pack(blend(INKRGB, PB, 0.45)), SOFT = pack(blend(INKRGB, PB, 0.42));
    const P0 = new Uint32Array(NN);
    // on the Brown and Deep brown washes a pen's own colour (a grey pencil, a red or green pen) sinks into the face, so the
    // eyes, brows and mouth are drawn pressed harder: the same pen darkened, never grainy
    const FACEINK = (skin === 'Brown' || skin === 'Deep brown') && !dark && legend !== 'Neon' ? pack(blend(INKRGB, [16, 12, 14], 0.55)) : 0;
    let faceOn = false;
    // the face is drawn pressed harder on dark washes, and without grain on dark papers (white pencil and chalk faces read clean)
    const FACEV = FACEINK || INK, faceClean = !!FACEINK || dark;
    const tone = (q, k) => pack(blend(PB, q, k));
    {
      P0.fill(pack(PB));
      const row = (y, v) => { if (y >= 0 && y < N) for (let x = 0; x < N; x++) P0[y * N + x] = v; };
      const col = (x, v) => { if (x >= 0 && x < N) for (let y = 0; y < N; y++) P0[y * N + x] = v; };
      if (legend === 'Neon') { /* a night card: nothing on it but the line */ }
      else if (paper === 'Notebook') { const rl = tone([90, 140, 210], 0.42); for (let y = 6; y < N; y += 4) row(y, rl); col(7, tone([220, 70, 80], 0.6)); }
      else if (paper === 'Graph') { const gl = tone([80, 160, 150], 0.09); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (x % 4 === 1 || y % 4 === 1) P0[y * N + x] = gl; }
      else if (paper.includes('ticky')) {
        const glue = tone([150, 120, 40], 0.14), curl = tone([70, 50, 0], 0.18);
        for (let y = 0; y < 4; y++) row(y, glue);
        for (let y = N - 12; y < N; y++) for (let x = N - 12; x < N; x++) if (x + y > 2 * N - 13 && ((x + y) & 1)) P0[y * N + x] = curl;
      } else if (paper === 'Chalkboard') {
        const sm = tone([255, 255, 255], 0.07);
        for (let i = 0; i < 6; i++) { const y0 = (i * 37 + 5) % N, h = 3 + i % 3; for (let y = y0; y < y0 + h && y < N; y++) for (let x = 0; x < N; x++) if (((x + y * 3 + i) % 4) === 0) P0[y * N + x] = sm; }
      } else if (paper === 'Dot grid') { const d = tone([70, 80, 110], 0.34); for (let y = 1; y < N; y += 3) for (let x = 1; x < N; x += 3) P0[y * N + x] = d; }
      else if (paper === 'Index card') { const rl = tone([80, 130, 210], 0.38); for (let y = 13; y < N; y += 4) row(y, rl); row(8, tone([214, 72, 90], 0.62)); }
      else if (paper === 'Napkin') {
        const em = tone([150, 140, 120], 0.12), fold = tone([90, 80, 60], 0.12);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if ((x + y) % 6 === 0 || (x - y + 60) % 6 === 0) P0[y * N + x] = em;
        for (let y = 0; y < N; y += 2) P0[y * N + (N >> 1)] = fold;
      } else if (paper === 'Blueprint') {
        const g1 = tone([255, 255, 255], 0.04), g2 = tone([255, 255, 255], 0.09);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (x % 16 === 0 || y % 16 === 0) P0[y * N + x] = g2; else if (x % 4 === 0 || y % 4 === 0) P0[y * N + x] = g1;
      }
      // paper tooth: a few cells a shade off, from a coordinate hash
      const toothV = dark ? tone([255, 255, 255], 0.06) : paper === 'Kraft' ? tone([70, 45, 15], 0.16) : tone([90, 70, 30], 0.06);
      for (let i = 0; i < NN; i++) { let q = Math.imul(i + 3, 0x85ebca6b) ^ 0x3c6ef372; q = Math.imul(q ^ (q >>> 13), 0xc2b2ae35); q ^= q >>> 16; if (((q >>> 0) & 1023) < (paper === 'Kraft' ? 70 : 30)) P0[i] = toothV; }
      if (margin === 'Coffee ring') {
        const r = 150 + mr() * 40, cx = mside > 0 ? 830 : 170, cy = 820 + mr() * 60, rim = tone([130, 80, 30], 0.32), stain = tone([150, 100, 40], 0.1);
        for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) {
          const ux = (x + 0.5) / CU - cx, uy = (y + 0.5) / CU - cy, d = Math.hypot(ux, uy / 0.96), a = Math.atan2(uy, ux);
          if (Math.abs(d - r) < 9 && Math.sin(a * 1.0 + 1.3) > -0.85) P0[y * N + x] = rim;
          else if (d < r - 9 && ((x + y) & 3) === 0) P0[y * N + x] = stain;
        }
      } else if (margin === 'Washi tape') {
        const tp = hiPair ? HL[hiPair[1]] : HL.Pink, tA = tone(tp, 0.5), tB = tone(tp, 0.28);
        for (const sd of [-1, 1]) {
          const ox = 500 + sd * 450, ang = sd * -0.7, ca = Math.cos(ang), sa = Math.sin(ang);
          for (let y = 0; y < 14; y++) for (let x = 0; x < N; x++) {
            const ux = (x + 0.5) / CU - ox, uy = (y + 0.5) / CU - 40, lx = ux * ca + uy * sa, ly = -ux * sa + uy * ca;
            if (Math.abs(lx) < 110 && Math.abs(ly) < 32) P0[y * N + x] = (Math.floor((lx + 200) / 30) & 1) ? tA : tB;
          }
        }
      } else if (margin === 'Eraser ghost') {
        const gh = dark ? tone([255, 255, 255], 0.13) : tone([70, 70, 80], 0.14), cx = hx - mside * 110, cy = hy - 50;
        for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) {
          const ux = (x + 0.5) / CU, uy = (y + 0.5) / CU, d = Math.hypot((ux - cx) / (R * 0.9), (uy - cy) / (R * 0.95));
          const eye = Math.hypot(ux - (hx - mside * 150), uy - (hy - 70)) < 16 || Math.hypot(ux - (hx - mside * 70), uy - (hy - 76)) < 16;
          if ((Math.abs(d - 1) < 0.07 || eye) && ((x * 7 + y * 3) % 5)) P0[y * N + x] = gh;
        }
      }
    }

    // ---------- the page's own marks, under everything: holes and a red margin, a mug ring, tape, eraser smudges ----------
    if (page !== 'Fresh') {
      let ps = Math.floor(own('page-at') * 4294967295) >>> 0 || 7;
      const pr2 = () => { ps ^= ps << 13; ps >>>= 0; ps ^= ps >>> 17; ps ^= ps << 5; ps >>>= 0; return ps / 4294967296; };
      const put = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) P0[y * N + x] = v; };
      const area = (cx, cy, fn) => { for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) fn(x, y, (x + 0.5) / CU - cx, (y + 0.5) / CU - cy); };
      if (page === 'Hole punched') {
        const hole = pack(blend(PB, [58, 50, 46], 0.8)), rimC = tone([0, 0, 0], 0.18);
        if (paper !== 'Notebook') for (let y = 0; y < N; y++) put(8, y, tone([220, 70, 80], 0.6));   // a ruled red margin
        for (const y0 of [12, 32, 52]) for (let j = -3; j <= 2; j++) for (let i = -3; i <= 2; i++) { const d = (i + 0.5) ** 2 + (j + 0.5) ** 2; if (d <= 2.6) put(3 + i, y0 + j, hole); else if (d <= 5 && i + j < -1) put(3 + i, y0 + j, rimC); }   // round holes, a shadow on the upper edge
      } else if (page === 'Coffee ring') {
        const cx = mside > 0 ? 70 : 930, cy = 80 + pr2() * 70, r = 150 + pr2() * 30, rimC = tone([130, 80, 30], 0.34), rim2 = tone([130, 80, 30], 0.2), stain = tone([150, 100, 40], 0.1), ph = pr2() * 6;
        area(cx, cy, (x, y, ux, uy) => {
          const d = Math.hypot(ux, uy), a = Math.atan2(uy, ux), d2 = Math.hypot(ux - 46 * mside, uy - 30);
          if (Math.abs(d - r) < 9 && Math.sin(a + ph) > -0.8) P0[y * N + x] = rimC;
          else if (Math.abs(d2 - r * 0.96) < 7 && Math.sin(a * 1.3 + ph + 2) > 0.1) P0[y * N + x] = rim2;   // where the mug was set down a second time
          else if (d < r - 9 && ((x + y) & 3) === 0) P0[y * N + x] = stain;
        });
      } else if (page === 'Taped') {
        const pal = [[110, 196, 176], [238, 136, 116], [232, 188, 70], [130, 166, 232], [198, 146, 222]], tc0 = pal[Math.floor(pr2() * 5)], dots = pr2() < 0.5;
        const tA = tone(tc0, 0.5), tB = tone(tc0, 0.8);
        for (const [cx, cy] of [[mside > 0 ? 40 : 960, 40], [mside > 0 ? 960 : 40, 960]]) {
          const ang = (cx < 500) === (cy < 500) ? -P / 4 : P / 4, ca = Math.cos(ang), sa = Math.sin(ang);
          area(cx, cy, (x, y, ux, uy) => {
            const lx = ux * ca + uy * sa, ly = -ux * sa + uy * ca;
            if (Math.abs(ly) >= 38 || Math.abs(lx) >= 150 - ((Math.floor(ly / 12) & 1) ? 10 : 0)) return;   // torn ends
            const u = Math.floor((lx + 300) / 22), v = Math.floor((ly + 300) / 22);
            P0[y * N + x] = dots ? ((u & 1) && (v & 1) ? tB : tA) : (u % 3 === 0 ? tB : tA);
          });
        }
      } else if (page === 'Smudged') {
        const sm = dark ? tone([255, 255, 255], 0.1) : tone([96, 92, 104], 0.13), crumb = dark ? tone([255, 255, 255], 0.3) : tone([190, 120, 130], 0.5);
        for (const [cx, cy] of [[mside > 0 ? 150 : 850, 560 + pr2() * 120], [500 + (pr2() - 0.5) * 300, 70 + pr2() * 30]]) {
          const rx = 95 + pr2() * 40, ry = 30 + pr2() * 14, ang = (pr2() - 0.5) * 0.6, ca = Math.cos(ang), sa = Math.sin(ang);
          area(cx, cy, (x, y, ux, uy) => { const lx = ux * ca + uy * sa, ly = -ux * sa + uy * ca; if ((lx / rx) ** 2 + (ly / ry) ** 2 < 1 && (x * 5 + y * 3) % 4) P0[y * N + x] = sm; });
          for (let k = 0; k < 4; k++) { const x = Math.floor((cx + (pr2() - 0.5) * rx * 2.6) * CU), y = Math.floor((cy + ry + 10 + pr2() * 40) * CU); put(x, y, crumb); put(x + 1, y, crumb); }
        }
      }
    }

    // ---------- the cell engine ----------
    const wob = (i, k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return (v - Math.floor(v)) * 2 - 1; };
    const AMP = 7;   // the boil: about half a cell, so each take moves a few cells
    const penKind = /Fineliner|ballpoint|Red pen|gel|Pencil|White pencil/.test(marker) || legend === 'Neon' ? 'thin' : marker === 'Brush pen' ? 'brush' : 'felt';
    // cells a polyline passes through (DDA in half-cell steps), with the elbows taken out
    const trail = pts => {
      const raw = [];
      let px = 0, py = 0;
      pts.forEach((p, i) => {
        const x = p[0] * CU, y = p[1] * CU;
        if (!i) raw.push([Math.floor(x), Math.floor(y)]);
        else {
          const n = Math.max(1, Math.ceil(Math.max(Math.abs(x - px), Math.abs(y - py)) * 2));
          for (let s = 1; s <= n; s++) { const cx = Math.floor(px + (x - px) * s / n), cy = Math.floor(py + (y - py) * s / n), l = raw[raw.length - 1]; if (cx !== l[0] || cy !== l[1]) raw.push([cx, cy]); }
        }
        px = x; py = y;
      });
      const out = [];
      for (const q of raw) { const m = out.length; if (m > 1 && Math.abs(out[m - 2][0] - q[0]) === 1 && Math.abs(out[m - 2][1] - q[1]) === 1) out.pop(); out.push(q); }
      return out;
    };
    const setCell = (b, tg, x, y, v, tag) => { if (x < 0 || y < 0 || x >= N || y >= N) return; b[y * N + x] = v; if (tg) tg[y * N + x] = tag; };
    // a marker line: one cell for fine pens and fine details; felt and crayon double their
    // main strokes across the direction of travel; the brush pen swells in the middle
    const strokeCells = (b, tg, cells, w, k, colv, fine) => {
      const n = cells.length, main = !fine && w >= lw * 0.95;
      for (let i = 0; i < n; i++) {
        const [x, y] = cells[i];
        let v = colv || (faceOn ? FACEV : INK);
        if (!colv && grainy && !(faceOn && faceClean)) { let h = Math.imul(x * 73856093 ^ y * 19349663 ^ k * 83492791, 0x27d4eb2d); h ^= h >>> 15; if (((h >>> 0) & 15) < 3) v = GRAIN; }
        setCell(b, tg, x, y, v, 1);
        const wide = main && (penKind === 'felt' ? n > 3 : penKind === 'brush' ? n > 8 && i > n * 0.2 && i < n * 0.8 : false);
        if (wide) { const a = cells[i > 1 ? i - 2 : 0], z = cells[i < n - 2 ? i + 2 : n - 1]; if (Math.abs(z[1] - a[1]) > Math.abs(z[0] - a[0])) setCell(b, tg, x + 1, y, v, 1); else setCell(b, tg, x, y + 1, v, 1); }
      }
    };
    // closed outline -> cells whose centres fall inside (crossing number, per cell in the box)
    const inPoly = (poly, fn, ox, oy) => {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      const pc = poly.map(p => [p[0] * CU + (ox || 0), p[1] * CU + (oy || 0)]);
      for (const p of pc) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
      for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(N - 1, Math.floor(y1)); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(N - 1, Math.floor(x1)); x++) {
        const cx = x + 0.5, cy = y + 0.5; let c2 = false;
        for (let i = 0, j = pc.length - 1; i < pc.length; j = i++) { const a = pc[i], b = pc[j]; if ((a[1] > cy) !== (b[1] > cy) && cx < (b[0] - a[0]) * (cy - a[1]) / (b[1] - a[1]) + a[0]) c2 = !c2; }
        if (c2) fn(x, y);
      }
    };
    // the highlighter: flat cells in bands, the third row of each band a little paler, and the
    // whole fill nudged a cell off the line (it never quite stays inside)
    const misX = jr(-12, 12), misY = jr(-10, 10), offX = Math.round(misX / 10), offY = Math.round(misY / 10);
    const hiCache = new Map();
    const hiTones = s => { if (!hiCache.has(s)) { const q = rgba(s), a = Math.min(1, q[3] * (dark ? 1.25 : 1.15)); hiCache.set(s, [pack(blend(PB, q, a)), pack(blend(PB, q, a * 0.5)), pack(blend(PB, blend(q, [255, 255, 255], 0.2), 0.75))]); } return hiCache.get(s); };
    const bandOf = (x, y, a) => { const q = Math.max(-2, Math.min(2, Math.round(Math.tan(Math.max(-1.2, Math.min(1.2, a))) * 2))); return ((((2 * y + q * x) % 6) + 6) % 6) >= 4; };
    const runOp = (b, tg, op, k, rot) => {
      const R2 = rot || (p => p);
      if (op.t === 'ink') {
        const pts = op.pts.map((p, i) => R2([p[0] + wob(op.id * 97 + i, k) * AMP, p[1] + wob(op.id * 97 + i, k + 5) * AMP]));
        const cells = trail(pts), light = !op.col && op.w < lw * 0.5;
        if (light && cells.length <= 4) return;   // a flick shorter than a few cells would only be a speck: leave it out
        strokeCells(b, tg, cells, op.w, k, op.col ? pack(rgba(op.col)) : light ? (faceOn && FACEINK ? FACEINK : SOFT) : 0, !!rot);   // light-pressure lines go in a softer tone
      } else if (op.t === 'dot') {
        const [x, y] = R2([op.x + wob(op.id, k) * AMP * 0.5, op.y + wob(op.id, k + 5) * AMP * 0.5]), rc = op.r * CU, v = op.col ? pack(rgba(op.col)) : INK;
        const cx = Math.floor(x * CU), cy = Math.floor(y * CU);
        if (rc < 0.75) setCell(b, tg, cx, cy, v, 1);
        else if (rc < 1.3) { const sx = x * CU - cx < 0.5 ? -1 : 0, sy = y * CU - cy < 0.5 ? -1 : 0; for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) setCell(b, tg, cx + sx + i, cy + sy + j, v, 1); }
        else for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (Math.hypot(i, j) <= rc - 0.2) setCell(b, tg, cx + i, cy + j, v, 1);
      } else if (op.t === 'spr') {
        const [x, y] = R2([op.x, op.y]), rows = op.rows, w = rows[0].length, ox = Math.floor(x * CU) - (w >> 1), oy = Math.floor(y * CU) - (rows.length >> 1);
        rows.forEach((r, j) => { for (let i = 0; i < w; i++) { const ch = r[op.flip ? w - 1 - i : i]; if (ch !== '.') setCell(b, tg, ox + i, oy + j, ch === '#' ? (faceOn ? FACEV : INK) : SPR[ch], ch === '#' ? 1 : 2); } });
      } else if (op.t === 'blob') {
        const v = op.col ? (rgba(op.col)[3] < 1 ? hiTones(op.col)[0] : pack(rgba(op.col))) : faceOn ? FACEV : INK;
        inPoly(op.pts.map(R2), (x, y) => setCell(b, tg, x, y, v, op.col ? 2 : 1));
      } else if (op.t === 'hi') {
        const [full, pale] = hiTones(op.col), solid = !!op.wide, st = op.style, tag = op.skin ? 3 : 2;
        inPoly(op.o, (x, y) => {
          if (tg && tg[y * N + x] === 1) return;
          const band = bandOf(x, y, op.a);
          if (legend === 'Neon') { if (band) setCell(b, tg, x, y, hiTones(op.col)[2], 2); return; }   // on the night card the colour glows in thin bands
          if (st === 'Scribble') { const d = ((x - y) % 4 + 4) % 4; if (d > 1) return; setCell(b, tg, x, y, d ? pale : full, 2); return; }   // diagonal back-and-forth strokes, the paper showing between
          if (st === 'Zigzag') { const d = ((y + Math.abs(((x % 6) + 6) % 6 - 3)) % 4 + 4) % 4; if (d > 1) return; setCell(b, tg, x, y, d ? pale : full, 2); return; }
          if (st === 'Scrubbed') { const row = Math.floor(y / 5), u = ((x + (row & 1) * 2) % 5 + 5) % 5, v = y % 5, ringC = (u === 0 || u === 4) ? v > 0 && v < 4 : v === 0 || v === 4; setCell(b, tg, x, y, ringC ? full : pale, 2); return; }   // little scrubbed circles
          setCell(b, tg, x, y, solid || !band ? full : pale, tag);
        }, offX, offY);
      } else if (op.t === 'hatch') inPoly(op.o, (x, y) => { if (((op.a > 0 ? x + y : x - y + 64) % 3) === 0) setCell(b, tg, x, y, INK, 1); });
      else if (op.t === 'knock') inPoly(op.o, (x, y) => setCell(b, tg, x, y, P0[y * N + x], 0));
    };
    const SPR = { w: pack(PB), y: pack(blend(PB, [255, 214, 40], 0.85)), p: pack(blend(PB, [255, 92, 170], 0.7)), Y: pack([255, 244, 190]), g: pack([226, 170, 40]), G: pack([150, 100, 20]) };
    const handWave = [-0.5, 0, 0.5];
    const propCol = hiA();
    // the three takes, each with its own map of what is line (1), colour (2) or paper (0)
    const takes = [], tags = [];
    for (let k = 0; k < 3; k++) {
      const b = P0.slice(), tg = new Uint8Array(NN);
      for (const op of ops) runOp(b, tg, op, k);
      if (waver) {
        const a = handWave[k], hd = [waver.hand[0] + Math.sin(a) * 60, waver.hand[1] + (1 - Math.cos(a)) * 30], el = [waver.from[0] - 60, waver.from[1] - 30];
        runOp(b, tg, { t: 'ink', pts: dens([waver.from, el, [hd[0], hd[1] + 30]]), w: lw, id: 7001 }, k);
        const pl = palm(hd[0], hd[1], a * 0.8, 1, 1);
        if (skinCol) runOp(b, tg, { t: 'hi', o: pl[0], col: skinCol, a: 1, gap: 30, wide: 2, skin: 1 }, k);
        pl.forEach((q, i) => runOp(b, tg, { t: 'ink', pts: dens(q), w: lw * (i ? 0.62 : 0.85), id: 7020 + i }, k));
      }
      if (propAt) for (const sd of [-1, 1]) { const a = k * 1.05, bl = ring(propAt[0] + sd * Math.cos(a) * 40, propAt[1] + sd * Math.sin(a) * 6, 40 * Math.abs(Math.cos(a)) + 8, 11, 12); runOp(b, tg, { t: 'hi', o: bl, col: propCol, a: 0.3, gap: 10 }, k); runOp(b, tg, { t: 'ink', pts: dens(bl), w: lw * 0.6, id: 7010 + sd }, k); }
      // neon: every line cell throws a dim glow onto the card around it
      if (legend === 'Neon') { const glow = pack(blend(PB, neonRGB, 0.26)); for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) { const i = y * N + x; if (tg[i] || ((x + y) & 1)) continue; if ((x > 0 && tg[i - 1] === 1) || (x < N - 1 && tg[i + 1] === 1) || (y > 0 && tg[i - N] === 1) || (y < N - 1 && tg[i + N] === 1)) b[i] = glow; } }
      takes.push(b); tags.push(tg);
    }

    // ---------- the face: drawn live, since it blinks and reacts ----------
    // eyes are set by hand, cell by cell ('#' line, 'w' paper glint, 'y' and 'p' highlighter)
    const EYES = {
      Dots: ['##', '##'], 'Big dots': ['.##.', '#w##', '####', '.##.'], Beady: ['#'],
      Rings: ['.###.', '#...#', '#.#.#', '#...#', '.###.'], Sleepy: ['#####', '.###.'], Squint: ['.###.', '#...#'],
      Lashes: ['#.#.#', '.....', '.##..', '.##..'], Ovals: ['.##.', '#..#', '#..#', '#.##', '.##.'],
      Spirals: ['#####', '....#', '###.#', '#...#', '#####'], Stars: ['..#..', '.#y#.', '#yyy#', '.#y#.', '#...#'],
      Hearts: ['.#.#.', '#p#p#', '#ppp#', '.#p#.', '..#..'], Shut: ['#...#', '.###.'],
      Happy: ['.###.', '#...#'], Tall: ['.#.', '#w#', '###', '###', '.#.'], Googly: ['.###.', '#...#', '#..##', '#..##', '.###.'],
      Sparkly: ['.###.', '#ww##', '#w###', '#####', '.###.'],
    };
    const facePlan = (st, shut, idBase) => {
      const o = []; let id = idBase;
      const L = (pts, w, col) => o.push({ t: 'ink', pts: dens(pts), w: (w || 1) * lw, id: id++, col });
      const Dt = (x, y, rr, col) => o.push({ t: 'dot', x, y, r: rr, col, id: id++ });
      const B = (pts, col) => o.push({ t: 'blob', pts, col, id: id++ });
      const Sp = (rows, x, y, flip) => o.push({ t: 'spr', rows, x, y, flip });
      const E = st.eyes, s = es, eyeAt = [];
      for (const sd of [-1, 1]) {
        const x = fcx + sd * ex, y = eyeY + sd * eyeTilt;
        eyeAt.push([x, y]);
        if (extra === 'Shades' || (extra === 'Eye patch' && sd === patchSide)) continue;
        if (shut && E !== 'Squint' && E !== 'Happy' && !(E === 'Wink' && sd > 0)) { Sp(EYES.Shut, x, y + 4, false); continue; }
        if (E === 'Uneven') Sp(sd < 0 ? EYES.Rings : EYES.Dots, x, y + (sd < 0 ? -4 : 6), false);
        else if (E === 'Wink') Sp(sd > 0 ? EYES.Squint : EYES.Dots, x, y, false);
        else if (E === 'Big dots' && s > 1.2) Sp(['.###.', '#w###', '#####', '#####', '.###.'], x, y, sd > 0);
        else Sp(EYES[E] || EYES.Dots, x, y, E === 'Googly' ? dir < 0 : sd > 0 && (E === 'Lashes' || E === 'Spirals' || E === 'Big dots' || E === 'Sparkly'));
      }
      // eyewear sits over the eyes
      const es0 = spanAt(eyeY);
      if (extra === 'Round glasses' || extra === 'Square glasses') {
        const gr = 40 * s;
        for (const [x, y] of eyeAt) L(extra === 'Round glasses' ? ring(x, y, gr, gr * 0.95, 18) : [[x - gr, y - gr * 0.8], [x + gr, y - gr * 0.84], [x + gr * 0.96, y + gr * 0.8], [x - gr * 0.98, y + gr * 0.82], [x - gr, y - gr * 0.8], [x - gr * 0.2, y - gr * 0.82]], 0.6);
        L(ring((eyeAt[0][0] + eyeAt[1][0]) / 2, eyeAt[0][1] + 4, Math.max(8, ex - gr), 14, 6, P * 1.15, P * 1.85), 0.55);
        L([[eyeAt[0][0] - gr, eyeAt[0][1] - 6], [es0[0] + 4, eyeY - 14]], 0.5); L([[eyeAt[1][0] + gr, eyeAt[1][1] - 6], [es0[1] - 4, eyeY - 14]], 0.5);
      } else if (extra === 'Shades') {
        for (const [x, y] of eyeAt) { const lens = [[x - 52 * s, y - 26 * s], [x + 50 * s, y - 28 * s], [x + 42 * s, y + 22 * s], [x - 40 * s, y + 26 * s]]; B(lens); L([[x - 30 * s, y - 14 * s], [x - 12 * s, y - 16 * s]], 0.35, dark ? '#000' : 'rgba(255,255,255,0.75)'); }
        L([[eyeAt[0][0] + 48 * s, eyeAt[0][1] - 20 * s], [eyeAt[1][0] - 50 * s, eyeAt[1][1] - 20 * s]], 0.7);
      } else if (extra === 'Monocle') {
        const [x, y] = eyeAt[1]; L(ring(x, y, 42 * s, 42 * s, 18), 0.6); L([[x + 20, y + 40 * s], [x + 50, y + 120], [x + 30, y + 200]], 0.35);
      } else if (extra === 'Eye patch') {
        const [x, y] = eyeAt[patchSide > 0 ? 1 : 0]; B(ring(x, y, 36 * s, 30 * s, 16)); L([[x - 30 * s, y - 20 * s], [patchSide > 0 ? es0[0] + 6 : es0[1] - 6, y - 70]], 0.5); L([[x + 30 * s, y - 20 * s], [patchSide > 0 ? es0[1] - 6 : es0[0] + 6, y - 50]], 0.5);
      }
      // brows
      const Br = st.brows, by = eyeY - 48 * s - (E === 'Rings' || E === 'Uneven' || E === 'Ovals' || /glasses|Monocle/.test(extra) ? 12 : 0);
      for (const sd of [-1, 1]) {
        const x = fcx + sd * ex, yb = by + sd * eyeTilt;
        if (Br === 'Flat') L([[x - 26, yb], [x + 26, yb + 2]], 0.8);
        else if (Br === 'Raised') L(ring(x, yb + 14, 28, 22, 8, P + 0.4, P * 2 - 0.4), 0.8);
        else if (Br === 'Cross') L([[x + sd * 30, yb - 12], [x - sd * 22, yb + 10]], 0.9);
        else if (Br === 'Worried') L([[x + sd * 30, yb + 8], [x - sd * 22, yb - 12]], 0.8);
        else if (Br === 'Bushy') L([[x - 30, yb + 2], [x + 30, yb - 2]], 1.7);
        else if (Br === 'One raised') { if (sd > 0) L(ring(x, yb + 4, 28, 28, 8, P + 0.3, P * 2 - 0.3), 0.8); else L([[x - 26, yb + 4], [x + 26, yb + 4]], 0.8); }
      }
      if (Br === 'Unibrow') L([[fcx - ex - 34, by + 4], [fcx - ex + 10, by - 6], [fcx, by + 2], [fcx + ex - 10, by - 6], [fcx + ex + 34, by + 4]], 1.1);
      // mouth
      const M = st.mouth, X = mcx, Y = mouthY, W = mw, tongue = tint('Pink', 1.4);
      if (M === 'Smile') L(ring(X, Y - W * 0.6, W, W * 0.75, 10, 0.55, P - 0.55));
      else if (M === 'Big smile') { const p = [[X - W, Y - W * 0.2]].concat(ring(X, Y - W * 0.2, W, W * 0.7, 12, P, 0)); L(p.concat([[X - W, Y - W * 0.2]])); L(ring(X, Y + W * 0.42, W * 0.36, W * 0.16, 8, P, P * 2), 0.5); }
      else if (M === 'Flat') L([[X - W * 0.7, Y], [X + W * 0.7, Y - W * 0.06]]);
      else if (M === 'Grin') { const g = ring(X, Y - W * 0.36, W * 1.1, W * 0.78, 12, 0.2, P - 0.2); L(g.concat([g[0]])); L([[X - W * 0.82, Y + W * 0.1], [X + W * 0.82, Y + W * 0.1]], 0.55); }
      else if (M === 'Open O') L(ring(X, Y + 4, W * 0.32, W * 0.42, 14));
      else if (M === 'Tongue out') { L(ring(X, Y - W * 0.6, W, W * 0.75, 10, 0.5, P - 0.5)); const tg = ring(X + W * 0.24, Y + W * 0.14, W * 0.24, W * 0.34, 8, 0, P); B(tg, tongue); L(tg, 0.7); }
      else if (M === 'Smirk') L([[X - W * 0.6, Y + 4], [X + W * 0.2, Y + 2], [X + W * 0.68, Y - W * 0.26]]);
      else if (M === 'Wobbly') { const p = []; for (let i = 0; i <= 12; i++) p.push([X - W * 0.8 + i * W * 1.6 / 12, Y + Math.sin(i * 1.6) * 7]); L(p, 0.85); }
      else if (M === 'Frown') L(ring(X, Y + W * 0.55, W * 0.8, W * 0.55, 10, P + 0.6, P * 2 - 0.6));
      else if (M === 'Buck teeth') { L(ring(X, Y - W * 0.9, W * 0.95, W * 0.9, 10, 0.75, P - 0.75)); L([[X - 22, Y - 4], [X - 22, Y + 30], [X + 22, Y + 30], [X + 22, Y - 4]], 0.6); L([[X, Y - 2], [X, Y + 30]], 0.5); }
      else if (M === 'Gap grin') { const g = ring(X, Y - W * 0.36, W * 1.05, W * 0.75, 12, 0.2, P - 0.2); L(g.concat([g[0]])); L([[X - W * 0.82, Y + W * 0.08], [X + W * 0.82, Y + W * 0.08]], 0.5); B([[X - 12 + dir * 26, Y - W * 0.1], [X + 12 + dir * 26, Y - W * 0.1], [X + 12 + dir * 26, Y + W * 0.08], [X - 12 + dir * 26, Y + W * 0.08]]); }
      else if (M === 'Whistle') L(ring(X + W * 0.15, Y, W * 0.2, W * 0.22, 10), 0.8);
      else if (M === 'Laugh') { const p = [[X - W, Y - W * 0.25]].concat(ring(X, Y - W * 0.25, W, W * 0.8, 14, P, 0)); B(p); B(ring(X, Y + W * 0.42, W * 0.42, W * 0.14, 10, P, P * 2).concat([[X - W * 0.42, Y + W * 0.5]]), tongue); L(p.concat([[X - W, Y - W * 0.25]])); }
      else if (M === 'W mouth') { L(ring(X - W * 0.26, Y, W * 0.26, W * 0.26, 6, 0.2, P - 0.1), 0.85); L(ring(X + W * 0.26, Y, W * 0.26, W * 0.26, 6, 0.1, P - 0.2), 0.85); }
      else if (M === 'Gritted') { L([[X - W * 0.7, Y - W * 0.2], [X + W * 0.7, Y - W * 0.22], [X + W * 0.72, Y + W * 0.2], [X - W * 0.68, Y + W * 0.22], [X - W * 0.7, Y - W * 0.2], [X - W * 0.2, Y - W * 0.21]], 0.85); L([[X - W * 0.7, Y], [X + W * 0.7, Y]], 0.45); for (let k = -1; k <= 1; k++) L([[X + k * W * 0.32, Y - W * 0.2], [X + k * W * 0.32, Y + W * 0.2]], 0.45); }
      else if (M === 'Toothy') { L(ring(X, Y - W * 0.6, W, W * 0.75, 10, 0.5, P - 0.5)); const ty = Y + W * 0.15; L([[X - 16, ty - 6], [X - 16, ty + 26], [X + 16, ty + 26], [X + 16, ty - 6]], 0.7); }
      else if (M === 'Tiny smile') L(ring(X, Y - W * 0.3, W * 0.45, W * 0.38, 8, 0.45, P - 0.45));
      else if (M === 'Fang') { L(ring(X, Y - W * 0.6, W, W * 0.75, 10, 0.55, P - 0.55)); const fx = X + dir * W * 0.42, fy = Y + W * 0.06; B([[fx - 14, fy - 6], [fx + 14, fy - 8], [fx + 2, fy + 34]], '#fbfaf4'); L([[fx - 14, fy - 6], [fx + 2, fy + 34], [fx + 14, fy - 8]], 0.7); }
      else if (M === 'Pout') { L(ring(X, Y + W * 0.2, W * 0.36, W * 0.26, 8, P + 0.5, P * 2 - 0.5)); L(ring(X, Y + W * 0.22, W * 0.2, W * 0.12, 6, 0.5, P - 0.5), 0.8); }
      if (st.blush) for (const sd of [-1, 1]) { const [x, y] = cheek(sd); B(ring(x, y, 40, 22, 14), tint('Pink', 1.3)); for (let k = 0; k < 3; k++) L([[x - 20 + k * 18, y - 14], [x - 30 + k * 18, y + 12]], 0.4); }
      return o;
    };
    const baseFace = { eyes, brows, mouth };
    const reactions = {
      Gasp: { eyes: 'Rings', brows: 'Raised', mouth: 'Open O', tune: [[4, 0, 'sine'], [7, 0.1, 'sine']] },
      Laugh: { eyes: 'Squint', brows: 'Raised', mouth: 'Laugh', tune: [[9, 0, 'triangle'], [8, 0.1, 'triangle'], [7, 0.2, 'triangle'], [5, 0.3, 'triangle']] },
      Wink: { eyes: 'Wink', brows: 'One raised', mouth: 'Smirk', tune: [[7, 0, 'sine'], [11, 0.09, 'sine']] },
      Blush: { eyes: eyes === 'Spirals' ? 'Dots' : eyes, brows: 'Worried', mouth: 'Wobbly', blush: true, tune: [[2, 0, 'sine'], [1, 0.16, 'sine']] },
      Grump: { eyes: 'Sleepy', brows: 'Cross', mouth: 'Frown', tune: [[1, 0, 'triangle'], [0, 0.14, 'triangle']] },
      Song: { eyes: 'Squint', brows: 'Raised', mouth: 'Whistle', tune: [[4, 0, 'sine'], [5, 0.16, 'sine'], [7, 0.32, 'sine'], [9, 0.48, 'sine']] },
    };
    const reactNames = Object.keys(reactions);
    const plans = new Map();
    const planFor = (name, shut) => {
      const key = name + (shut ? '-' : '+');
      if (!plans.has(key)) plans.set(key, facePlan(name === 'base' ? baseFace : reactions[name], shut, 9000 + 200 * (reactNames.indexOf(name) + 1)));
      return plans.get(key);
    };

    // ---------- the viewer ----------
    // A Park-Miller generator from the hash's sixth word (the doodle's own counter-hash is untouched)
    // picks the key, the voice and the order the faces come in.
    let pm = (parseInt(c.hash.slice(42, 50), 16) % 2147483646) + 1;
    const pmr = () => (pm = pm * 16807 % 2147483647, (pm - 1) / 2147483646);
    const hum = 57 + Math.floor(pmr() * 7);
    const keyScale = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 9, 10]][Math.floor(pmr() * 4)];
    const deg = d => hum + keyScale[d % keyScale.length] + 12 * Math.floor(d / keyScale.length);
    const order = reactNames.slice();
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(pmr() * (i + 1)); const sw = order[i]; order[i] = order[j]; order[j] = sw; }
    let nextReact = 0, react = null, reactAt = -9;
    const doodles = [];
    let cur = null, inkRun = 0, lastNote = -9;
    const mine = [];
    const inHead = (x, y) => {
      const lx = pivot[0] + (x - pivot[0]) * tc + (y - pivot[1]) * ts, ly = pivot[1] - (x - pivot[0]) * ts + (y - pivot[1]) * tc;
      let inside = false;
      for (let i = 0, j = rim.length - 1; i < rim.length; j = i++) if ((rim[i][1] > ly) !== (rim[j][1] > ly) && lx < (rim[j][0] - rim[i][0]) * (ly - rim[i][1]) / (rim[j][1] - rim[i][1]) + rim[i][0]) inside = !inside;
      return inside;
    };
    const doodleShapes = ['star', 'heart', 'spiral', 'flower', 'sparkle'];
    const tap = (u, v, t) => {
      const x = 1000 * u, y = 1000 * v;
      if (inHead(x, y)) {
        react = order[nextReact++ % order.length]; reactAt = t;
        for (const [d, at, wave] of reactions[react].tune) c.sound.note(deg(d + 5), { dur: 0.16, vel: 0.22, wave, at, cutoff: 2400, pan: (u - 0.5) * 0.6 });
        return;
      }
      const kind = doodleShapes[doodles.length % doodleShapes.length], sc = 30 + (doodles.length % 3) * 6;
      let pts;
      if (kind === 'star') pts = starPts(x, y, sc, sc * 0.42, 5);
      else if (kind === 'heart') pts = heartPts(x, y, sc * 0.9);
      else if (kind === 'spiral') { pts = []; for (let i = 0; i <= 30; i++) { const a = i * 0.55, rr = 2 + i * sc / 30; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } }
      else if (kind === 'flower') { pts = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * P * 2, rr = sc * (0.5 + 0.5 * Math.abs(Math.cos(a * 2.5))); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } }
      else pts = [[x, y - sc], [x + sc * 0.2, y - sc * 0.2], [x + sc, y], [x + sc * 0.2, y + sc * 0.2], [x, y + sc], [x - sc * 0.2, y + sc * 0.2], [x - sc, y], [x - sc * 0.2, y - sc * 0.2], [x, y - sc]];
      doodles.push({ pts: dens(pts), id: 8000 + doodles.length % 40 });
      if (doodles.length > 16) doodles.shift();
      c.sound.note(deg(Math.max(0, Math.min(9, Math.floor((1 - v) * 10)))) + 12, { dur: 0.22, vel: 0.18, wave: 'triangle', cutoff: 1800, pan: (u - 0.5) });
      c.sound.hit('click', 0.12);
    };
    const penMove = t => {
      const inp = c.input;
      if (!(inp.down && inp.inside)) { cur = null; return; }
      const x = inp.x * 1e3, y = inp.y * 1e3;
      if (!cur) { cur = []; mine.push(cur); if (mine.length > 14) mine.shift(); cur.push([x, y]); return; }
      const last = cur[cur.length - 1], d = Math.hypot(x - last[0], y - last[1]);
      if (d < 14 || cur.length > 400) return;
      cur.push([x, y]); inkRun += d;
      if (inkRun > 110 && t - lastNote > 0.11) {
        inkRun = 0; lastNote = t;
        c.sound.note(deg(Math.max(0, Math.min(8, Math.floor((1 - inp.y) * 9)))) + 12, { dur: 0.2, vel: 0.16, wave: 'triangle', cutoff: 2200, pan: (inp.x - 0.5) });
      }
    };

    const gap = amid(3.4, 5);
    const userHi = hiPair ? tint(hiPair[0]) : tint('Yellow');
    const seq = [0, 1, 2, 1];
    planFor('base', false); planFor('base', true);   // the resting face is ready before the first frame

    // ---------- the legendary and coveted extras ----------
    const off = document.createElement('canvas'); off.width = off.height = N;
    const octx = off.getContext('2d'), img = octx.createImageData(N, N), F = new Uint32Array(img.data.buffer), FT = new Uint8Array(NN);
    const userTone = hiTones(userHi), hiMask = new Uint8Array(NN);
    const pivotRot = p => [pivot[0] + (p[0] - pivot[0]) * tc - (p[1] - pivot[1]) * ts, pivot[1] + (p[0] - pivot[0]) * ts + (p[1] - pivot[1]) * tc];
    // the holo sticker: a die-cut white border two cells out from the drawing, and a grey shadow
    let cut = null;
    if (legend === 'Holo Sticker') {
      cut = new Uint8Array(NN);
      const t0 = tags[0], grow = (src, r) => { const o = new Uint8Array(NN); for (let y = 0; y < N; y += 1) for (let x = 0; x < N; x += 1) { if (!src[y * N + x]) continue; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const xx = x + i, yy = y + j; if (xx >= 0 && yy >= 0 && xx < N && yy < N && Math.abs(i) + Math.abs(j) <= r + 1) o[yy * N + xx] = 1; } } return o; };
      const body = grow(t0, 2), shade = new Uint8Array(NN);
      for (let y = 1; y < N; y++) for (let x = 1; x < N; x++) if (body[(y - 1) * N + x - 1] && !body[y * N + x]) shade[y * N + x] = 1;
      for (let i = 0; i < NN; i++) cut[i] = shade[i] ? 3 : body[i] && !t0[i] ? 2 : t0[i] ? 1 : 0;
    }
    // the face stays plain ink on the sticker: no foil from the brows down inside the head
    const faceMask = new Uint8Array(NN);
    if (legend === 'Holo Sticker') {
      const faceTop = eyeY - 48 * es - 40;
      inPoly(rim.map(tiltP), (x, y) => { const ux = (x + 0.5) / CU - pivot[0], uy = (y + 0.5) / CU - pivot[1]; if (pivot[1] - ux * ts + uy * tc >= faceTop) faceMask[y * N + x] = 1; });
    }
    const HOLO = [[255, 120, 200], [255, 220, 110], [140, 255, 170], [110, 210, 255], [190, 150, 255], [255, 255, 255]].map(q => pack(blend(PB, q, 0.8)));
    const HOLOEDGE = [[255, 120, 200], [255, 220, 110], [140, 255, 170], [110, 210, 255], [190, 150, 255], [255, 255, 255]].map(q => pack(blend([252, 252, 248], q, 0.55)));
    const WHITE = pack([252, 252, 248]), SHADOW = pack(blend(PB, [0, 0, 0], 0.22));
    // the gold star: a teacher's foil star stuck in the corner, opposite the margin doodles
    const STAR = ['...#...', '..#Y#..', '###yy##', '#yyyyy#', '.#yyy#.', '.#y#y#.', '.##.##.'], STAR_EDGE = ['...#...', '...#...', '..#y#..', '..#y#..', '..#y#..', '..#y#..', '..#.#..'];
    const starAt = [mside > 0 ? 6 : N - 7, held !== 'Nothing' && mside < 0 ? N - 9 : 6];
    const starMap = { '#': pack([150, 100, 20]), y: pack([238, 186, 52]), Y: pack([255, 236, 150]) };
    let spinAt = -9, hopAt = -9, buzzAt = -9;
    // pixel digits, 3 x 5, for the flipbook's page number
    const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];

    return (t) => {
      const inp = c.input;
      for (const press of inp.taps()) {
        const cx = Math.floor(press.x * N), cy = Math.floor(press.y * N);
        if (starOwned && Math.abs(cx - starAt[0]) <= 4 && Math.abs(cy - starAt[1]) <= 4) { spinAt = t; c.sound.note(deg(7) + 12, { dur: 0.3, vel: 0.16, wave: 'sine' }); c.sound.note(deg(9) + 12, { dur: 0.5, vel: 0.14, wave: 'sine', at: 0.12 }); c.sound.note(deg(12) + 12, { dur: 0.7, vel: 0.1, wave: 'triangle', at: 0.24, cutoff: 3000 }); continue; }
        tap(press.x, press.y, t);
        if (legend === 'Flipbook') { hopAt = t; for (let i = 0; i < 4; i++) c.sound.hit('click', 0.08 + i * 0.02); }
        if (legend === 'Neon') { buzzAt = t; c.sound.note(hum - 24, { dur: 0.5, vel: 0.12, wave: 'square', cutoff: 500 }); }
        if (legend === 'Holo Sticker') [0, 2, 4, 7].forEach((d, i) => c.sound.note(deg(d + 7), { dur: 0.25, vel: 0.1, wave: 'sine', at: i * 0.06 }));
      }
      penMove(t);
      const k = seq[Math.floor(t * 4) % 4];
      F.set(takes[k]); FT.set(tags[k]);
      // the viewer's highlighter goes under the line, never over it
      for (const m of mine) for (let i = 0; i < m.length; i++) {
        const a = m[Math.max(0, i - 1)], b = m[i], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * CU * 2));
        for (let s2 = 0; s2 <= n; s2++) { const x = Math.floor((a[0] + (b[0] - a[0]) * s2 / n) * CU), y = Math.floor((a[1] + (b[1] - a[1]) * s2 / n) * CU); for (const [u, v] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + u, yy = y + v; if (xx >= 0 && yy >= 0 && xx < N && yy < N) hiMask[yy * N + xx] = 1; } }
      }
      for (const m of mine) m.splice(0, Math.max(0, m.length - 2));   // keep only the tail of each stroke: the cells stay painted in hiMask
      for (let i = 0; i < NN; i++) if (hiMask[i] && FT[i] !== 1) F[i] = ((i % N + Math.floor(i / N) * 2) % 6) >= 4 ? userTone[1] : userTone[0];
      if (react && t - reactAt > 1.8) react = null;
      const shut = !react && t > 0.4 && (t + 1.7) % gap < 0.18;
      faceOn = true;
      for (const op of planFor(react || 'base', shut)) runOp(F, FT, op, k, pivotRot);
      faceOn = false;
      if (react === 'Song') {
        const f = (t - reactAt) / 1.8, nx0 = mcx - dir * mw * 1.5, ny0 = mouthY - 40 - f * 120;
        if (f < 0.9) runOp(F, FT, { t: 'spr', rows: ['..##', '..#.', '..#.', '###.', '##..'], x: nx0, y: ny0, flip: dir < 0 }, k, pivotRot);
      }
      for (const d of doodles) runOp(F, FT, { t: 'ink', pts: d.pts, w: lw * 0.65, id: d.id }, k);

      // legendaries
      const pcx = Math.floor(inp.x * N), pcy = Math.floor(inp.y * N);
      if (legend === 'Neon') {
        // the gel glows white-hot where the pointer is, and a tap makes the whole line buzz for a moment
        const hot = pack(blend(neonRGB, [255, 255, 255], 0.65)), buzz = t - buzzAt < 0.5 && Math.floor(t * 16) % 2 === 0;
        for (let i = 0; i < NN; i++) if (FT[i] === 1) { const x = i % N, y = (i - x) / N; if ((inp.inside && Math.abs(x - pcx) + Math.abs(y - pcy) < 7) || buzz) F[i] = hot; }
      }
      if (cut) {
        // the holo foil: rainbow bands that slide with the pointer (or drift by themselves)
        const sh = inp.inside ? pcx * 0.6 + pcy * 0.3 : t * 2.2;
        for (let i = 0; i < NN; i++) {
          const x = i % N, y = (i - x) / N, cc = cut[i];
          if (cc === 3) F[i] = SHADOW;
          else if (cc === 2 && FT[i] !== 1) F[i] = (((x - y + Math.floor(sh * 2)) % 14) + 14) % 14 < 2 ? HOLOEDGE[(Math.floor((x + y) / 4 + sh) % 6 + 6) % 6] : WHITE;   // a glint runs round the die-cut edge
          else if (faceMask[i] || FT[i] === 3 || FT[i] === 1) continue;   // face, skin and every line stay as drawn
          else if (FT[i] === 2 || (cc === 1 && FT[i] !== 0)) F[i] = HOLO[(Math.floor((x + y) / 3 + sh) % 6 + 6) % 6];
        }
      }
      if (legend === 'Flipbook') {
        // the doodle hops page by page; a tap makes it jump higher; the page number counts on
        const page = Math.floor(t * 8), hop = [0, 0, 1, 2, 3, 3, 2, 1][page % 8] + (t - hopAt < 1 ? [2, 4, 5, 5, 4, 2, 1, 0][Math.min(7, Math.floor((t - hopAt) * 8))] : 0);
        if (hop) { F.copyWithin(0, hop * N); FT.copyWithin(0, hop * N); for (let y = N - hop; y < N; y++) for (let x = 0; x < N; x++) F[y * N + x] = P0[y * N + x]; }
        const edge = pack(blend(PB, [0, 0, 0], 0.18)), edge2 = pack(blend(PB, [0, 0, 0], 0.32));
        for (let y = 0; y < N; y++) { F[y * N + N - 1] = edge2; F[y * N + N - 2] = (y & 1) ? edge : F[y * N + N - 2]; }
        for (let x = 0; x < N; x++) { F[(N - 1) * N + x] = edge2; }
        const curl = inp.inside && pcx > N - 16 && pcy > N - 16 ? 9 : 4;
        for (let y = N - curl; y < N - 1; y++) for (let x = N - curl; x < N - 1; x++) if (x + y >= 2 * N - curl - 2) F[y * N + x] = x + y === 2 * N - curl - 2 ? edge2 : pack(blend(PB, [0, 0, 0], 0.08));
        const num = String(page % 1000 + 1), DIGC = edge2;
        for (let d = 0; d < num.length; d++) { const g = DIG[+num[d]], ox = N - 6 - (num.length - d) * 4, oy = N - 8; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') F[(oy + j) * N + ox + i] = DIGC; }
      }
      if (starOwned) {
        const spin = t - spinAt < 0.9 && Math.floor((t - spinAt) * 8) % 2 === 0, rows = spin ? STAR_EDGE : STAR, glint = inp.inside && Math.abs(pcx - starAt[0]) <= 6 && Math.abs(pcy - starAt[1]) <= 6;
        rows.forEach((r, j) => { for (let i = 0; i < 7; i++) { const ch = r[i]; if (ch === '.') continue; const x = starAt[0] - 3 + i, y = starAt[1] - 3 + j; if (x >= 0 && y >= 0 && x < N && y < N) F[y * N + x] = ch === 'Y' || (glint && ch === 'y' && (i + j + Math.floor(t * 6)) % 5 === 0) ? pack([255, 250, 214]) : starMap[ch]; } });
      }

      octx.putImageData(img, 0, 0);
      ctx.resetTransform();
      ctx.imageSmoothingEnabled = false;   // nearest cell, never a blur
      ctx.drawImage(off, 0, 0, N, N, 0, 0, S, S);
    };
  },
});

})(window.Proto);
