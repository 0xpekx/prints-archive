// Clash Beetles: from D:/code/synaesthesia/public/drop03/pieces/201.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Clash Beetles: a beetle drawn under the rules of an early-eighties British home
// computer screen, where every 8 x 8 cell may hold just one ink and one paper colour.
Proto.add({
  num: 201,
  name: 'Clash Beetles',
  fam: 'Pixel Portraits III',
  fps: 12,
  interactive: 'Tap its head to make it hop, its shell to buzz its wings, the paper to change the border.',
  music: true,
  seed: 4908,
  recipe: 'A beetle facing you, 48 dots across inside a coloured screen border, where every 8 x 8 cell may show only one ink and one paper from eight colours, so colours snap to the cells and clash where they meet. Build, pose, what it holds, shell, markings, horns, eyes, mouth, extra, paper, border, a one-ink companion sprite and the screen itself vary (some screens load from tape every half minute, glitch or turn negative; the rarest lifts the clash to single rows); about 1 in 375 is a legendary (a winged Sun Scarab in gold and lapis, a wind-up Clockwork tin toy, or a black Lantern beetle whose light spills into the paper cell by cell), and about 1 in 200 holds the coveted Golden Dung Ball; it blinks, twitches and bobs a dot, and the clash shifts with it.',
  make(c) {
    const S = c.size, g = c.ctx;
    // sfc32: the first stream (the hash's first four words) rolls the original traits,
    // the second (its last four words) everything added since, so old mints keep their looks
    const w = i => parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
    const sfc = (a, b, q, d) => () => {
      a >>>= 0; b >>>= 0; q >>>= 0; d >>>= 0;
      let t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (q + (q << 3)) | 0;
      q = (q << 21) | (q >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      q = (q + t) | 0;
      return (t >>> 0) / 4294967296;
    };
    const rnd = sfc(w(0), w(1), w(2), w(3));
    for (let i = 0; i < 12; i++) rnd();
    const pickBy = (r, list) => {
      let tot = 0; for (const e of list) tot += e[1];
      let x = r() * tot;
      for (const e of list) { x -= e[1]; if (x < 0) return e[0]; }
      return list[0][0];
    };
    const pick = list => pickBy(rnd, list);
    const ri = n => Math.floor(rnd() * n);

    // the eight colours: 0 black 1 blue 2 red 3 magenta 4 green 5 cyan 6 yellow 7 white
    const RGB = (k, br) => { const v = br ? 255 : 205; return [(k & 2) ? v : 0, (k & 4) ? v : 0, (k & 1) ? v : 0]; };
    const NAMES = ['Black', 'Blue', 'Red', 'Magenta', 'Green', 'Cyan', 'Yellow', 'White'];

    // ---------- the original rolls (first stream, in their original order) ----------
    let shellName = pick([['Green', 26], ['Blue', 14], ['Red', 16], ['Magenta', 12], ['Cyan', 12], ['Yellow', 12], ['Rainbow', 4], ['White', 4]]);
    let shellK = { Green: 4, Blue: 1, Red: 2, Magenta: 3, Cyan: 5, Yellow: 6, White: 7, Rainbow: 4 }[shellName];
    let marks = pick([['Plain', 30], ['Spots', 26], ['Stripes', 18], ['Bands', 14], ['Jewelled', 6], ['Skull', 6]]);
    let horns = pick([['Feelers', 28], ['Rhino Horn', 22], ['Stag Jaws', 18], ['Twin Horns', 14], ['Hercules', 12], ['Crown', 6]]);
    let eyes = pick([['Round', 34], ['Sleepy', 18], ['Glare', 16], ['Faceted', 14], ['Shades', 12], ['Cyclops', 6]]);
    let mouth = pick([['Grin', 34], ['Pincers', 26], ['Fangs', 16], ['Whistle', 14], ['Tongue', 10]]);
    let extra = pick([['None', 56], ['Gem', 16], ['Bow', 12], ['Monocle', 10], ['Flashing Gem', 6]]);
    let paperName = pick([['Plain', 30], ['Stars', 22], ['Stripes', 16], ['Checker', 14], ['Rain', 10], ['Bricks', 8]]);
    let paperK = pick([[0, 36], [1, 22], [3, 8], [2, 8], [5, 8], [7, 10], [6, 8]]);
    if (paperK === shellK) paperK = shellK === 1 ? 0 : 1;
    if ((paperK === 5 && shellK === 4) || (paperK === 6 && shellK === 7) || (paperK === 7 && shellK === 6)) paperK = 0;
    let patK = paperK === 0 ? pick([[1, 3], [3, 1], [2, 1]]) : (paperK === 1 ? 0 : pick([[0, 2], [1, 1]]));
    if (patK === shellK) patK = 0;
    let borderK = ri(8);
    if (borderK === paperK) borderK = (borderK + 2) % 8;
    let hiK = shellK === 7 ? 5 : 7;
    const rainbow = [4, 5, 6, 3, 2, 5, 6, 4, 3, 2, 6, 5].filter(k => k !== paperK);
    const rainOrder = Array.from({ length: 36 }, () => rainbow[ri(rainbow.length)]);
    const spots = Array.from({ length: 6 }, () => [rnd(), rnd()]);
    const stars = Array.from({ length: 34 }, () => [ri(48), ri(48), rnd() < 0.3]);
    const glanceSeed = rnd() * 10, blinkSeed = rnd() * 7;
    // calmer colours, from a fifth stream (xorshift32 on its own mix of the hash) so no other roll moves:
    // about three in ten shells are Dim (no BRIGHT attribute), and green is cut back to about one shell in seven
    let x5 = (w(2) ^ Math.imul(w(7), 0x2c1b3c6d) ^ Math.imul(w(1) ^ (w(4) >>> 3), 0x297a2d39) ^ 0x6a09e667) >>> 0 || 0x7f4a7c15;
    const r5 = () => { x5 ^= x5 << 13; x5 >>>= 0; x5 ^= x5 >>> 17; x5 ^= x5 << 5; x5 >>>= 0; return x5 / 4294967296; };
    for (let i = 0; i < 4; i++) r5();
    let dim = r5() < 0.3;
    if (shellName === 'Green' && r5() < 0.42) {
      shellName = pickBy(r5, [['Blue', 30], ['Red', 22], ['Magenta', 18], ['Cyan', 18], ['White', 12]]);
      shellK = { Blue: 1, Red: 2, Magenta: 3, Cyan: 5, White: 7 }[shellName];
      const p0 = paperK;
      if (paperK === shellK) paperK = shellK === 1 ? 0 : 1;
      if ((paperK === 6 && shellK === 7) || (paperK === 7 && shellK === 6)) paperK = 0;
      if (paperK !== p0) patK = paperK === 0 ? 1 : 0;
      if (patK === shellK || patK === paperK) patK = [0, 1, 2, 3].find(k => k !== shellK && k !== paperK);
      if (borderK === paperK) borderK = (borderK + 2) % 8;
    }

    // ---------- the newer rolls (second stream) ----------
    const r2 = sfc(w(4) ^ 0x8d12dfd0, w(5), w(6), w(7));
    for (let i = 0; i < 15; i++) r2();
    const pick2 = list => pickBy(r2, list);
    let build = pick2([['Scarab', 26], ['Dome', 18], ['Burly', 15], ['Slender', 14], ['Shieldback', 10], ['Tiny', 11], ['Titan', 6]]);
    let pose = pick2([['Standing', 30], ['Holding', 30], ['Arms Up', 11], ['Waving', 12], ['Wings Open', 12], ['Flexing', 5]]);
    const heldRoll = pick2([['Dung Ball', 18], ['Leaf', 14], ['Berry', 12], ['Flower', 12], ['Mushroom', 10], ['Joystick', 10], ['Cassette', 9], ['Lolly', 8], ['Sword', 5], ['Star', 2]]);
    let held = pose === 'Holding' ? heldRoll : 'Nothing';
    let companion = pick2([['None', 40], ['Fly', 14], ['Spider', 12], ['Firefly', 12], ['Ant', 9], ['Baby Beetle', 7], ['Moth', 4.5], ['UFO', 1.5]]);
    const screen = pick2([['Clean', 73], ['Tape Load', 13], ['Inverse', 7], ['Glitch', 5], ['Multicolour', 2]]);
    // a share of mints trade an original value for one of the newer ones
    const trade = (p, list) => (r2() < p ? pick2(list) : null);
    eyes = trade(0.45, [['Hearts', 16], ['Spiral', 12], ['Wink', 16], ['Tearful', 14], ['Big Shiny', 20], ['Dizzy', 12], ['Laser', 4]]) || eyes;
    mouth = trade(0.45, [['Smile', 22], ['Gasp', 16], ['Teeth', 16], ['Moustache', 14], ['Buck Tooth', 16], ['Bubblegum', 12]]) || mouth;
    horns = trade(0.38, [['Antlers', 30], ['Trident', 22], ['Forked', 30], ['Unicorn', 4]]) || horns;
    marks = trade(0.42, [['Zigzag', 16], ['Chevrons', 16], ['Seven Spot', 18], ['Racing Stripe', 16], ['Heart', 12], ['Lightning', 12], ['Flames', 5]]) || marks;
    extra = trade(0.35, [['Headband', 22], ['Scarf', 18], ['Freckles', 24], ['Tiny Hat', 18], ['Halo', 6]]) || extra;
    paperName = trade(0.4, [['Waves', 18], ['Diamonds', 16], ['Polka', 18], ['Hearts', 12], ['Zigzag', 16], ['Moon', 14]]) || paperName;
    const cs = r2() < 0.5 ? -1 : 1;               // which top corner the companion keeps
    const compPh = r2() * 9, gumPh = r2() * 5, laserPh = r2() * 4;
    const MODES = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 9, 10], [0, 4, 7, 11, 14]];
    const mode = MODES[Math.floor(r2() * MODES.length)], root = 57 + Math.floor(r2() * 8);
    const glitchPairs = Array.from({ length: 48 }, () => [Math.floor(r2() * 36), Math.floor(r2() * 8), Math.floor(r2() * 8)]);

    // ---------- the legendaries: a third stream (xorshift32 seeded from the odd words), so no other roll moves ----------
    let lx = (w(1) ^ Math.imul(w(3), 0x9e3779b1) ^ Math.imul(w(5) ^ (w(7) >>> 7), 0x85ebca6b) ^ 0x51ed270b) >>> 0 || 0x2545f491;
    const lr = () => { lx ^= lx << 13; lx >>>= 0; lx ^= lx >>> 17; lx ^= lx << 5; lx >>>= 0; return lx / 4294967296; };
    for (let i = 0; i < 6; i++) lr();
    const lu = lr();
    const LEG = lu < 0.0008 ? 'Lantern' : lu < 0.0017 ? 'Sun Scarab' : lu < 0.0027 ? 'Clockwork' : '';
    const golden = !LEG && lu < 0.0077;          // the coveted item: about one in two hundred
    const boxTune = Array.from({ length: 8 }, () => Math.floor(lr() * 7));
    // a fourth stream (also xorshift32) for what came after the legendaries: head shapes and the golden ball's backdrop
    let x3 = (w(0) ^ Math.imul(w(2) ^ (w(6) >>> 5), 0x27d4eb2f) ^ Math.imul(w(4), 0x165667b1) ^ 0x3c6ef372) >>> 0 || 0x1b873593;
    const r3 = () => { x3 ^= x3 << 13; x3 >>>= 0; x3 ^= x3 >>> 17; x3 ^= x3 << 5; x3 >>>= 0; return x3 / 4294967296; };
    for (let i = 0; i < 5; i++) r3();
    let head = pickBy(r3, [['Round', 26], ['Wide', 20], ['Narrow', 18], ['Shovel', 20], ['Horned Plate', 16]]);
    if (golden) {
      pose = 'Holding'; held = 'Golden Dung Ball';
      // the gold must stand alone: never on a yellow or rainbow shell, never on yellow, white or cyan paper
      if (shellName === 'Yellow' || shellName === 'Rainbow') { shellName = ['Blue', 'Red', 'Magenta', 'Green'][Math.floor(r3() * 4)]; shellK = { Blue: 1, Red: 2, Magenta: 3, Green: 4 }[shellName]; }
      if (paperK === 5 || paperK === 6 || paperK === 7 || paperK === shellK) { paperK = 0; patK = shellK === 1 ? 2 : 1; }
      if (patK === shellK) patK = 0;
      if (borderK === paperK) borderK = (borderK + 2) % 8;
    }
    if (LEG === 'Clockwork') {
      shellName = 'Tin'; shellK = 2; marks = 'Rivets'; horns = 'Springs'; eyes = 'Round'; mouth = 'Grille'; extra = 'Wind-Up Key';
      if (pose === 'Wings Open' || pose === 'Flexing') pose = 'Standing';
      // shown on black, like a toy in a shop window at night
      paperK = 0; patK = 1; if (paperName === 'Moon') paperName = 'Stars';
      if (borderK === 0 || borderK === 2) borderK = 6;
    }
    if (LEG === 'Sun Scarab') {
      shellName = 'Lapis'; shellK = 1; build = 'Slender'; pose = 'Sun'; held = 'Nothing'; marks = 'Cloisonne'; horns = 'Short';
      eyes = 'Kohl'; mouth = 'None'; extra = 'None'; paperK = 0; patK = 1;
      // each scarab still has its own night, frame and attendant
      paperName = ['Stars', 'Diamonds', 'Zigzag', 'Waves', 'Polka', 'Plain'][Math.floor(lr() * 6)];
      head = 'Round';
      borderK = [6, 6, 1, 2, 3, 5, 7][Math.floor(lr() * 7)];
      if (companion === 'Spider' || companion === 'UFO') companion = 'Firefly';
    }
    if (LEG === 'Lantern') {
      shellName = 'Night Black'; shellK = 0; marks = 'Lantern'; eyes = 'Big Shiny'; extra = 'None'; companion = 'Fireflies';
      paperK = 1; patK = 5; if (paperName === 'Moon' || paperName === 'Hearts') paperName = 'Stars'; borderK = 0;
      if (horns === 'Crown' || horns === 'Unicorn') horns = 'Feelers';
      if (pose === 'Wings Open') pose = 'Standing';
      if (build === 'Titan' || build === 'Burly' || build === 'Shieldback' || build === 'Tiny') build = 'Scarab';
    }
    hiK = shellK === 7 ? 5 : 7;
    if (LEG) dim = false;
    const HEADK = horns === 'Crown' || LEG === 'Clockwork' || LEG === 'Sun Scarab' ? 6 : shellK;
    // the beetle never stands on its own colour: not the paper, not the ink of the paper's pattern, not the border
    // round the screen; and a dim blue shell never goes on black paper, where its face is lost. Any paper rerolled
    // comes from the fifth stream, past its last roll, so nothing else moves.
    if (!LEG) {
      const own = k => k === shellK || k === HEADK;
      if (own(paperK) || (dim && shellK === 1 && paperK === 0)) {
        paperK = pickBy(r5, [[0, 36], [1, 22], [3, 8], [2, 8], [5, 8], [7, 10], [6, 8]].filter(([k]) => !own(k) && !(dim && shellK === 1 && k === 0) && !(golden && k >= 5)));
        patK = paperK === 0 ? 1 : 0;
      }
      if (own(patK) || patK === paperK) patK = [paperK === 0 ? 1 : 0, 1, 3, 2, 0].find(k => k !== paperK && !own(k));
      if (own(borderK) || borderK === paperK) borderK = [2, 3, 5, 6].map(d => (borderK + d) % 8).find(k => !own(k) && k !== paperK);
    }

    if (LEG) c.trait('Legendary', LEG);
    {
      c.trait('Shell', (dim ? 'Dim ' : '') + shellName);
      c.trait('Markings', marks);
      c.trait('Horns', horns === 'Short' ? 'Feelers' : horns);
      c.trait('Eyes', eyes);
      c.trait('Mouth', mouth);
      c.trait('Extra', extra);
      c.trait('Paper', NAMES[paperK] + ' ' + paperName);
      c.trait('Border', NAMES[borderK]);
      c.trait('Build', build);
      c.trait('Pose', pose === 'Sun' ? 'Holding the Sun' : pose);
      c.trait('Holding', held);
      c.trait('Companion', String(companion));
      c.trait('Screen', screen);
      c.trait('Head', head);
    }

    // body plans: head, pronotum and wing cases (centre y, half sizes), plus eye size
    const BL = {
      Scarab: { hy: 19, hrx: 9, hry: 7, py: 29, pw: 15, ph: 6, pp: 3.2, ecy: 46, ew: 17, eh: 13 },
      Dome: { hy: 19.5, hrx: 8, hry: 6.2, py: 28.5, pw: 12.5, ph: 5, pp: 2.6, ecy: 45, ew: 19.5, eh: 16 },
      Burly: { hy: 19, hrx: 10, hry: 7.5, py: 30, pw: 18.5, ph: 7, pp: 4.6, ecy: 47, ew: 18.5, eh: 12 },
      Slender: { hy: 18, hrx: 8.2, hry: 7, py: 29, pw: 10.5, ph: 7, pp: 2.4, ecy: 48, ew: 13, eh: 16 },
      Shieldback: { hy: 20.5, hrx: 7.6, hry: 5.8, py: 30.5, pw: 20, ph: 6, pp: 2.2, ecy: 46, ew: 21.5, eh: 14 },
      Tiny: { hy: 20, hrx: 11, hry: 9, py: 32.5, pw: 11, ph: 4, pp: 2.6, ecy: 46.5, ew: 14, eh: 10 },
      Titan: { hy: 19, hrx: 10.5, hry: 8, py: 31.5, pw: 21, ph: 7.5, pp: 3.8, ecy: 50, ew: 23, eh: 16 },
    }[build];
    // the sun scarab sits a little lower and narrower, so its sun has the top cells to itself
    if (LEG === 'Sun Scarab') Object.assign(BL, { hy: 21.5, hrx: 7.8, hry: 5.6, py: 31.5, pw: 10.5, ph: 6, pp: 2.4, ecy: 50, ew: 13.5, eh: 15 });
    // the head's own shape: width and height scale, superellipse power, taper (wider at the top when negative)
    const HS = { Round: [1, 1, 2.3, -0.08], Wide: [1.3, 0.84, 3, -0.16], Narrow: [0.8, 1.1, 2, -0.24], Shovel: [1, 0.9, 2.3, -0.08], 'Horned Plate': [1.04, 0.94, 3.6, 0.06] }[head];
    BL.hrx = head === 'Narrow' ? Math.max(6.6, BL.hrx * HS[0]) : BL.hrx * HS[0]; BL.hry *= HS[1];
    const er = BL.hrx * 0.37, es = BL.hrx * 0.47;
    // the eyes are centred in a row of attribute cells, so their whites clash as little as possible
    const EYB = Math.round((BL.hy - BL.hry * 0.05 - 3.5) / 8) * 8 + 3.5;

    const N = 48, B = 5, T = N + B * 2;
    const col = new Uint8Array(N * N), wt = new Uint8Array(N * N), mask = new Uint8Array(N * N), zone = new Uint8Array(N * N);
    const lm = new Uint8Array(N * N), lit = new Uint8Array(N * N), patM = new Uint8Array(N * N), edgeM = new Uint8Array(N * N);
    let Z = 0, boost = 0;      // what is being drawn: 0 paper and friends, 1 head, 2 body; boost keeps small props from losing their cells
    const put = (x, y, k, v = 1) => {
      x = Math.round(x); y = Math.round(y);
      if (x < 0 || x >= N || y < 0 || y >= N) return;
      const i = y * N + x; col[i] = k; wt[i] = Math.max(Z ? v * 2 + 2 : v * 2, boost * 2); patM[i] = 0;
      if (Z) { mask[i] = 1; zone[i] = Z; }
    };
    // an oval, optionally turned, with an optional one-dot outline
    const oval = (cx, cy, rx, ry, ang, k, ok, v = 1) => {
      const ca = Math.cos(ang), sa = Math.sin(ang), R = Math.max(rx, ry) + 1.5;
      for (let y = Math.floor(cy - R); y <= Math.ceil(cy + R); y++)
        for (let x = Math.floor(cx - R); x <= Math.ceil(cx + R); x++) {
          const dx = x - cx, dy = y - cy, u = dx * ca + dy * sa, q = -dx * sa + dy * ca;
          if ((u / rx) ** 2 + (q / ry) ** 2 <= 1) put(x, y, k, v);
          else if (ok !== undefined && (u / (rx + 1)) ** 2 + (q / (ry + 1)) ** 2 <= 1) put(x, y, ok, 3);
        }
    };
    const seg = (x0, y0, x1, y1, k, th = 0, v = 3) => {
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1) * 2;
      for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n;
        put(x, y, k, v);
        if (th) { put(x + 1, y, k, v); put(x, y + 1, k, v); }
      }
    };
    // a shaded body part: superellipse, black rim, dithered shadow to the lower right,
    // a curved shine to the upper left; taper widens it towards the back
    const part = (cx, cy, rx, ry, k, p, taper, rim, flat) => {
      for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++) {
        const v = (y - cy) / ry, rxx = rx * (1 + taper * Math.max(-1, Math.min(1, v)));
        for (let x = Math.floor(cx - rxx - 1); x <= Math.ceil(cx + rxx + 1); x++) {
          const u = (x - cx) / rxx, n = Math.pow(Math.abs(u), p) + v * v;
          const no = Math.pow(Math.abs(x - cx) / (rxx + 1), p) + ((y - cy) / (ry + 1)) ** 2;
          if (n <= 1) {
            const sh = u * 0.45 + v * 0.7 + n * 0.55;
            if (rim && n > 0.66) put(x, y, (x + y) & 1 ? hiK : k, 1);
            else if (!flat && sh > 0.9 && u > 0.4 && n > 0.62 && (x + y) & 1) put(x, y, 0, 1);
            else put(x, y, k, flat ? 2 : 1);
            const rr = u * u + v * v;
            if (!rim && !flat && u < -0.18 && v < -0.12 && rr > 0.3 && rr < 0.52) put(x, y, hiK, 2);
          } else if (no <= 1) put(x, y, 0, 3);
        }
      }
    };
    // limbs: polylines rasterised together, then outlined in one pass
    const limbs = (lines, k) => {
      lm.fill(0);
      const mark = (x, y) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) lm[y * N + x] = 1; };
      for (const L of lines) for (let j = 1; j < L.length; j++) {
        const a = L[j - 1], b = L[j], th = b[2] || 1;
        const n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]), 1) * 2;
        for (let i = 0; i <= n; i++) {
          const x = a[0] + (b[0] - a[0]) * i / n, y = a[1] + (b[1] - a[1]) * i / n;
          mark(x, y); if (th > 1) { mark(x + 1, y); mark(x, y + 1); }
        }
      }
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x; if (lm[i]) continue;
        if ((x > 0 && lm[i - 1]) || (x < N - 1 && lm[i + 1]) || (y > 0 && lm[i - N]) || (y < N - 1 && lm[i + N])) put(x, y, 0, 1);
      }
      for (let i = 0; i < N * N; i++) if (lm[i]) put(i % N, (i / N) | 0, k, 1);
    };
    const heart = (cx, cy, r, k, ok) => {
      for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++)
        for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
          const f = (sx, sy) => { const X = (x - cx) / sx, Y = -(y - cy) / sy + 0.15, q = X * X + Y * Y - 1; return q * q * q - X * X * Y * Y * Y <= 0; };
          if (f(r, r)) put(x, y, k, 3); else if (ok !== undefined && f(r + 1, r + 1)) put(x, y, ok, 3);
        }
    };

    // ---------- the paper ----------
    const HEARTS = [' X X ', 'XXXXX', ' XXX ', '  X  '];
    const moonK = paperK < 4 ? 6 : 1;
    function paper() {
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x; let on = false;
        if (paperName === 'Stripes') on = y % 8 < 2;
        else if (paperName === 'Checker') on = ((x >> 3) + (y >> 3)) % 2 === 1;
        else if (paperName === 'Rain') on = (x + y * 2) % 11 === 0 && y % 7 < 4;
        else if (paperName === 'Bricks') { const o = (y >> 2) % 2 ? 4 : 0; on = y % 4 === 3 || (x + o) % 8 === 7; }
        else if (paperName === 'Waves') on = (y + Math.round(Math.sin(x * 0.75) * 1.4)) % 6 === 0;
        else if (paperName === 'Diamonds') on = Math.abs((x % 8) - 4) + Math.abs((y % 8) - 4) === 4;
        else if (paperName === 'Polka') on = (x + ((y / 6 | 0) % 2) * 3) % 6 < 2 && y % 6 < 2;
        else if (paperName === 'Zigzag') on = y % 8 === Math.abs((x % 8) - 4) + 2;
        else if (paperName === 'Hearts') { const lx = (x + ((y / 12 | 0) % 2) * 6) % 12, ly = y % 12; on = lx < 5 && ly < 4 && HEARTS[ly][lx] === 'X'; }
        if (on) { col[i] = patK; wt[i] = 1; patM[i] = 1; }
      }
      if (paperName === 'Stars') for (const s of stars) { put(s[0], s[1], s[2] ? 7 : patK || 1); if (s[0] < N && s[1] < N) patM[s[1] * N + s[0]] = 1; }
      if (paperName === 'Moon') {
        const mx = 24 - cs * 17, my = 8;
        for (let y = 1; y < 16; y++) for (let x = mx - 7; x <= mx + 7; x++) {
          const a = (x - mx) ** 2 + (y - my) ** 2, b = (x - mx - cs * 2.6) ** 2 + (y - my + 1.6) ** 2;
          if (a <= 30 && b > 22) put(x, y, moonK, 2);
        }
        for (let k = 0; k < 7; k++) put(stars[k][0], stars[k][1] % 20, moonK, 1);
      }
    }

    // ---------- the companion: a one-ink sprite in its top corner, two frames each ----------
    const SPR = {
      Fly: [['XX.....XX', 'X.X...X.X', '.X.XXX.X.', '...XXX...', '..X.X.X..'], ['.........', '.XX...XX.', 'X.XXXXX.X', '.X.XXX.X.', '..X.X.X..']],
      Spider: [['X.X...X.X', '.X.XXX.X.', 'X.XXXXX.X', '.X.XXX.X.', 'X.X...X.X'], ['.X.....X.', 'X.XXXXX.X', '.XXXXXXX.', 'X.XXXXX.X', '.X.....X.']],
      Firefly: [['..X.X..', '...X...', '.XXXXX.', 'X.XXX.X', '..XXX..', '..X.X..'], ['..X.X..', '...X...', '.XXXXX.', 'X.XXX.X', '..XXX..', '..X.X..']],
      Ant: [['.......X', 'XX..XX.X', 'XXX.XXXX', 'XX..XX..', '.X.X.X..'], ['......X.', 'XX..XX.X', 'XXX.XXXX', 'XX..XX..', 'X.X.X.X.']],
      'Baby Beetle': [['.X.....X.', '..X...X..', '...XXX...', '..X.X.X..', '.XXXXXXX.', 'XXXX.XXXX', 'XXXX.XXXX', '.XXX.XXX.'], ['.X.....X.', '..X...X..', '...XXX...', '..XXXXX..', '.XXXXXXX.', 'XXXX.XXXX', 'XXXX.XXXX', '.XXX.XXX.']],
      Moth: [['XXX...XXX', 'XXXX.XXXX', 'XX.XXX.XX', '.XXXXXXX.', '..XX.XX..', '..X...X..'], ['.........', '...X.X...', '..XX.XX..', '..XXXXX..', '...XXX...', '...X.X...']],
      UFO: [['....XXX....', '...X...X...', '.XXXXXXXXX.', 'XX.X.X.X.XX', '.XXXXXXXXX.'], ['....XXX....', '...X...X...', '.XXXXXXXXX.', 'XXX.X.X.XXX', '.XXXXXXXXX.']],
    };
    // an ink that shows on this paper (and, for the little one, its parent's colour when it can)
    const ck = paperK === 7 || paperK === 6 || paperK === 5 ? 0 : paperK === 4 ? 0 : (paperK === 0 ? 7 : 6);
    const ccx = 24 + cs * 17.5, ccy = 6;
    let forceBright = -1;
    const sprite = (rows, x0, y0, k) => {
      for (let r = 0; r < rows.length; r++) for (let q = 0; q < rows[r].length; q++) if (rows[r][q] === 'X') { put(x0 + q, y0 + r, k, 3); const x = x0 + q, y = y0 + r; if (x >= 0 && y >= 0 && x < N && y < N) lit[y * N + x] = 1; }
    };
    function friend(st) {
      Z = 0;
      if (companion === 'None' || companion === 'Fireflies') return;
      const fr = SPR[companion], k = companion === 'Baby Beetle' && shellK !== paperK && dist(shellK, paperK) > 2 ? shellK : companion === 'Firefly' ? (paperK === 6 || paperK === 7 ? 2 : 6) : ck;
      let x = ccx, y = ccy, f = 0;
      if (companion === 'Fly') { const q = st.cf / 12 * Math.PI * 2; x += Math.cos(q) * 2.5; y += Math.sin(q * 2) * 1.5; f = st.cf % 2; }
      else if (companion === 'Spider') { y = 5 + st.csp; f = Math.floor(st.csp / 2) % 2; for (let yy = 0; yy < y; yy++) put(ccx, yy, ck, 2); }
      else if (companion === 'Firefly') { x += Math.round(Math.sin(st.ffa) * 2.5); y += Math.round(Math.sin(st.ffb) * 2); }
      else if (companion === 'Ant') { x = (st.ca % 64) - 8; y = 2; f = st.ca % 2; }
      else if (companion === 'Baby Beetle') { y += 2 + st.bbob; f = st.bblink; }
      else if (companion === 'Moth') { x += st.mdx; f = st.flap; }
      else if (companion === 'UFO') { x += st.ux; y += st.uy - 1; f = st.ul % 2; }
      const rows = fr[f], w0 = rows[0].length;
      x = Math.round(x - w0 / 2); y = Math.round(y - rows.length / 2);
      sprite(rows, x, y, k);
      if (companion === 'Firefly' && st.glow) {
        for (let q = 0; q < 10; q++) { const a2 = q / 10 * Math.PI * 2; put(x + 3 + Math.cos(a2) * 4.5, y + 4 + Math.sin(a2) * 3.6, k, 2); }
        forceBright = ((y + 4) >> 3) * 6 + ((x + 3) >> 3);
      }
    }

    // ---------- the wing cases, with their markings ----------
    const markAt = (qx, qy, s, pb) => {
      const mx = qx - 24, ax = Math.abs(mx), my = qy - pb, sc = BL.ew / 17;
      if (marks === 'Spots') {
        for (const sp of spots) {
          const side = sp[0] < 0.5 ? -1 : 1, x = 24 + side * (4 + Math.abs(sp[0] - 0.5) * 2 * 9) * sc, y = pb + 3 + sp[1] * 8;
          if ((qx - x) ** 2 + (qy - y) ** 2 <= 2.4) return 0;
        }
      } else if (marks === 'Stripes') { const r = Math.round(ax); if (r === Math.round(5 * sc) || r === Math.round(10 * sc)) return 0; }
      else if (marks === 'Bands') { const r = Math.round(my); if (r === 5 || r === 6 || r === 9 || r === 10) return hiK; }
      else if (marks === 'Jewelled') {
        for (let k = 0; k < 9; k++) {
          const x = Math.round(24 + ((k * 11) % 28 - 14) * sc), y = Math.round(pb + 3 + (k * 5) % 8);
          if (Math.round(qy) === y && (Math.round(qx) === x || Math.round(qx) === x + 1)) return Math.round(qx) === x ? 7 : 5;
        }
      } else if (marks === 'Skull') {
        const x = 24 + s * BL.ew * 0.47, y = pb + 6, dx = qx - x, dy = qy - y;
        if (Math.round(dy) === 0 && Math.abs(Math.round(dx)) === 1) return 0;
        if (Math.round(dy) === 3 && Math.abs(Math.round(dx)) === 1) return 7;
        if ((dx / 3) ** 2 + (dy / 2.5) ** 2 <= 1) return 7;
      } else if (marks === 'Zigzag') { const zz = Math.abs((ax % 6) - 3); if (Math.abs(my - 4 - zz) < 0.75) return hiK; }
      else if (marks === 'Chevrons') { const q = (my + 20 - ax * 0.7) % 5; if (my > 1 && q >= 0 && q < 1.1) return 0; }
      else if (marks === 'Seven Spot') {
        const ps = [[0, 1.5, 2.6], [0.38, 3.5, 1.9], [0.66, 7, 1.9], [0.32, 10.5, 1.9]];
        for (const p of ps) { const x = 24 + s * p[0] * BL.ew, y = pb + p[1]; if ((qx - x) ** 2 + (qy - y) ** 2 <= p[2] * p[2]) return 0; }
      } else if (marks === 'Racing Stripe') { const r = Math.round(ax); if (r >= 2 && r <= 4) return r === 3 ? hiK : 0; }
      else if (marks === 'Heart') {
        const hk = shellK === 2 ? 7 : 2, X = mx / 7, Y = -(qy - pb - 6) / 6 + 0.15, q = X * X + Y * Y - 1;
        if (q * q * q - X * X * Y * Y * Y <= 0) return hk;
      } else if (marks === 'Lightning') {
        const bk = shellK === 6 ? 7 : 6, bx = 24 + s * BL.ew * 0.48, t = (qy - pb - 1) / 11;
        if (t >= 0 && t <= 1) { const zx = bx + s * (t < 0.45 ? -t * 6 : t < 0.55 ? (t - 0.5) * 30 - 2.7 + 3 : -(t - 0.55) * 6 + 1.5); if (Math.abs(qx - zx) < 1.1) return bk; }
      } else if (marks === 'Rivets') {
        // a brass band across the tin, two rows of rivets, and a little window onto the turning clockwork
        const gx = 32.5, gy = pb + 8.5, gdx = qx - gx, gdy = qy - gy, gr = Math.hypot(gdx, gdy);
        if (s > 0 && gr < 3.6) {
          if (gr > 2.9) return 0;
          if (gr > 1.4) { const a = Math.atan2(gdy, gdx) + gearPh; return (((a / (Math.PI / 4)) % 2) + 2) % 2 < 1 ? 6 : 0; }
          return 6;
        }
        if (Math.round(my) === 3 && Math.round(qx) % 4 === 0) return 6;
        if (Math.round(my) === 11 && Math.round(qx) % 4 === 2) return 6;
      } else if (marks === 'Lantern') {
        // the wing cases are the lantern: glowing segments, white-hot at the heart, ribbed in black
        if (my < 2) return -1;
        const dl = Math.hypot((qx - 24) / BL.ew, (qy - BL.ecy + BL.eh * 0.3) / BL.eh);
        if (Math.round(my) % 4 === 1 && dl > 0.25) return 0;
        return dl < 0.32 + glowPh * 0.08 ? 7 : 6;
      } else if (marks === 'Cloisonne') {
        // gold cloisons fanning down the lapis wing cases, crossed by two arcs
        const dx = qx - 24, dy = qy - (pb - 3), r = Math.hypot(dx, dy), ang = Math.atan2(dx, dy), k = Math.round(ang / 0.55);
        if (r > 9 && Math.abs(ang - k * 0.55) * r < 0.55) return 6;
        if (Math.abs(r - 9.5) < 0.6) return 6;
      } else if (marks === 'Flames') {
        const h = 7 + Math.sin(ax * 0.95) * 2.6 + Math.sin(ax * 0.37 + 1) * 1.5, d = 48 - qy;
        if (d < h * 0.55) return 2; if (d < h) return 6;
      }
      return -1;
    };
    let gearPh = 0, glowPh = 0;
    function elytra(oy, open, flut) {
      const ew = BL.ew, eh = BL.eh, ecy = BL.ecy + oy, pb = BL.py + BL.ph + oy;
      const gap = open * 0.6, ang = open * (0.08 + flut * 0.05);
      const sa = Math.sin(ang), ca = Math.cos(ang);
      for (let y = Math.max(0, Math.floor(pb - 4)); y < N; y++) for (let x = 0; x < N; x++) {
        for (const s of [-1, 1]) {
          let qx = x - s * gap, qy = y;
          if (ang) { const dx = qx - (24 + s), dy = qy - pb; qx = 24 + s + dx * ca - dy * sa * s; qy = pb + dx * sa * s + dy * ca; }
          if (s * (qx - 24) < -0.5) continue;
          const u = (qx - 24) / ew, v = (qy - ecy) / eh;
          const no = Math.pow(Math.abs(qx - 24) / (ew + 1), 2.2) + ((qy - ecy) / (eh + 1)) ** 2;
          if (no > 1) continue;
          const n = Math.pow(Math.abs(u), 2.2) + v * v;
          if (n > 1 || Math.abs(qx - 24) < 0.5) { put(x, y, 0, 3); break; }
          const m = markAt(qx, qy, s, pb);
          if (m >= 0) { put(x, y, m, 3); break; }
          const lu = (qx - (24 + s * ew * 0.5)) / (ew * 0.5);
          if (build === 'Shieldback' && n > 0.72) { put(x, y, (x + y) & 1 ? hiK : shellK, 1); break; }
          const sh = lu * 0.5 + v * 0.6 + n * 0.55;
          if (sh > 0.85 && lu > 0.35 && n > 0.5 && (x + y) & 1) { put(x, y, 0, 1); break; }
          const rr = lu * lu + ((qy - pb - 7) / 7) ** 2;
          if (lu < -0.12 && qy < pb + 5.5 && rr > 0.4 && rr < 0.66 && marks !== 'Bands') { put(x, y, hiK, 2); break; }
          put(x, y, shellK, 1);
          break;
        }
      }
      if (!open) { const sy = pb + 1; seg(21, sy, 24, sy + 3, 0, 0, 3); seg(24, sy + 3, 27, sy, 0, 0, 3); }
    }
    // the hind wings, unfolded from under the wing cases and swept up and out
    function hindWings(oy, open, flut) {
      const py1 = BL.py + oy - BL.ph * 0.4;
      for (const s of [-1, 1]) {
        const a = -0.62 + flut * 0.22 + (1 - open) * 0.9, dx = s * Math.cos(a), dy = Math.sin(a);
        const L = 16 + BL.ew * 0.3, hw = 5, px0 = 24 + s * BL.pw * 0.62;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const rx = x - px0, ry = y - py1, u = rx * dx + ry * dy, q = (-rx * dy + ry * dx) * s;
          if (u < -1 || u > L + 1.5) continue;
          const t = Math.min(1, Math.max(0, u / L)), sn = Math.sin(Math.PI * Math.pow(t, 0.75));
          const up = 1.9 * Math.sqrt(sn), lo = hw * Math.pow(sn, 0.6);
          if (q < -up || q > lo || u < 0 || u > L) continue;
          if (Math.abs(q - t * lo * 0.5) < 0.45 && t > 0.2 && t < 0.8) continue;
          put(x, y, q < -up + 1.2 ? 5 : 7, 2);
        }
      }
    }

    // ---------- horns and feelers ----------
    function hornsAndFeelers(oy, htop, twitch) {
      const dy = htop - 11, fx = BL.hrx * 0.55;
      const feeler = (s, len) => {
        const bx = 24 + s * fx, by = htop + 4;
        const ex = bx + s * (len * 0.45 + twitch), ey = by - len;
        seg(bx, by, ex, ey, shellK, 0, 1); seg(ex, ey, ex + s * 3, ey - 2, shellK, 0, 1);
        oval(ex + s * 3.5, ey - 2.5, 1.5, 1.5, 0, shellK);
      };
      if (horns === 'Feelers') { feeler(-1, 10); feeler(1, 10); } else if (horns !== 'Springs') { feeler(-1, 4); feeler(1, 4); }
      if (horns === 'Springs') for (const s of [-1, 1]) {
        // the tin toy's feelers: coiled wire springs that wobble, with brass knobs
        const bx = 24 + s * fx, by = htop + 3, wob = twitch * 0.6;
        for (let k = 0; k < 10; k++) { const x = bx + s * (k * 0.5 + (k & 1 ? 1 : 0) + wob * k * 0.1); put(x, by - k, 6, 2); if (k & 1) put(x - s, by - k, 6, 2); }
        oval(bx + s * 5.6 + wob, by - 11, 1.3, 1.3, 0, 6);
      }
      const span = (y, cx, wdt, k) => { for (let x = Math.floor(cx - wdt); x <= Math.ceil(cx + wdt); x++) put(x, y, k, 1); };
      if (horns === 'Rhino Horn') {
        for (let y = 1; y <= 14; y++) { const t = (14 - y) / 13; span(y + dy, 24 + t * t * 5, 3.4 * (1 - t) + 0.6, shellK); }
      } else if (horns === 'Stag Jaws') {
        for (const s of [-1, 1]) {
          let px = 24 + s * 6, py = 15 + dy;
          for (let i = 0; i < 13; i++) {
            const ang = -Math.PI / 2 + s * (0.95 - i * 0.11), nx = px + Math.cos(ang) * 1.3, ny = py + Math.sin(ang) * 1.3;
            seg(px, py, nx, ny, 2, 1, 1); px = nx; py = ny;
          }
          seg(px, py, px - s * 3, py + 1, 2, 0, 1);
          put(24 + s * 10, 8 + dy, 2); put(24 + s * 11, 8 + dy, 2);
        }
      } else if (horns === 'Twin Horns') {
        for (const s of [-1, 1]) for (let y = 3; y <= 14; y++) { const t = (14 - y) / 11; span(y + dy, 24 + s * (5 + t * 5), 2.2 * (1 - t) + 0.5, shellK); }
      } else if (horns === 'Hercules') {
        for (let y = 0; y <= 14; y++) { const t = (14 - y) / 14; span(y + dy, 24 + Math.sin(t * 2.4) * 3, 2.6 * (1 - t) + 0.7, shellK === 6 ? 2 : 6); }
        put(27, 2 + dy, 6); put(21, 5 + dy, 6);
      } else if (horns === 'Antlers') {
        const ak = shellK;
        for (const s of [-1, 1]) {
          seg(24 + s * 4, htop + 3, 24 + s * 9, htop - 3, ak, 1, 1); seg(24 + s * 9, htop - 3, 24 + s * 12, htop - 9, ak, 1, 1);
          seg(24 + s * 9, htop - 3, 24 + s * 5, htop - 7, ak, 1, 1); seg(24 + s * 11, htop - 6, 24 + s * 16, htop - 7, ak, 1, 1);
          seg(24 + s * 12, htop - 9, 24 + s * 10, htop - 11, ak, 1, 1);
        }
      } else if (horns === 'Trident') {
        const tk = shellK === 6 ? 7 : 6;
        for (let y = htop - 6; y <= htop + 3; y++) span(y, 24, 1.1, tk);
        span(htop - 7, 24, 5, tk);
        for (const x of [19, 24, 29]) for (let y = htop - 11 - (x === 24 ? 1 : 0); y <= htop - 7; y++) put(x, y, tk);
        put(19, htop - 12, tk); put(29, htop - 12, tk);
      } else if (horns === 'Forked') {
        const fk = shellK === 7 ? 6 : 7;
        for (let y = htop - 3; y <= htop + 3; y++) span(y, 24, 1.6, fk);
        for (const s of [-1, 1]) { seg(24 + s, htop - 3, 24 + s * 6, htop - 9, fk, 1, 1); seg(24 + s * 2, htop - 3, 24 + s * 6.5, htop - 8, fk, 0, 1); }
      } else if (horns === 'Unicorn') {
        for (let y = -1; y <= htop + 3; y++) {
          const t = (htop + 3 - y) / (htop + 4), wdt = 3 * (1 - t) + 0.8;
          for (let x = Math.floor(24 - wdt); x <= Math.ceil(24 + wdt); x++) put(x, y, ((x + y * 2) % 5 + 5) % 5 === 0 ? 0 : 7, 2);
        }
      }
    }

    // ---------- the face ----------
    function face(st, hy, htop) {
      const ey = hy - BL.hy + EYB, headK = HEADK;
      const ball = (ex, r, k = 7) => oval(ex, ey, r, r, 0, k, 0, 3);
      const pupil = (ex, r, big) => {
        const px = Math.round(ex + st.gx * (r - 1.7) - (big ? 1 : 0.5)), py = Math.round(ey + st.gy * (r - 2) - (big ? 1 : 0.5));
        const n = big ? 3 : 2;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) put(px + x, py + y, 0, 5);
        if (big) put(px, py, 7, 3);
      };
      const shut = (ex, r) => { oval(ex, ey, r + 0.4, r + 0.4, 0, headK, undefined, 3); seg(ex - r, ey, ex + r, ey, 0, 0, 3); };
      const eye = (ex, r, side) => {
        const canBlink = eyes !== 'Kohl' && eyes !== 'Hearts' && eyes !== 'Spiral' && eyes !== 'Dizzy' && eyes !== 'Laser' && eyes !== 'Faceted' && !(eyes === 'Wink' && side > 0);
        if (st.blink && canBlink) { shut(ex, r); return; }
        if (eyes === 'Kohl') {
          // an almond of black lined out to a flick, with a gold glint that follows the pointer
          for (let x = -2; x <= 2; x++) { const hh = Math.abs(x) === 2 ? 0 : 1; for (let y = -hh; y <= hh; y++) put(ex + x, ey + y, 0, 3); }
          put(ex + side * 3, ey + 1, 0, 3); put(ex + side * 4, ey + 2, 0, 3);
          put(ex + st.gx * 0.6, ey - 0.4, 6, 4);
        } else if (eyes === 'Faceted') {
          oval(ex, ey, r, r, 0, 0, undefined, 3);
          for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if ((x + y) % 2 === 0 && x * x + y * y < r * r - 1) put(ex + x, ey + y, x < 0 && y < 0 || dim ? 7 : 2, 3);
        } else if (eyes === 'Hearts') heart(ex, ey, r + st.pulse * 0.6, shellK === 2 ? 3 : 2, 0);
        else if (eyes === 'Spiral') {
          ball(ex, r);
          for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; if (((k / 5 | 0) + st.spin) % 4 !== 0) put(ex + Math.cos(a) * (r - 1.2), ey + Math.sin(a) * (r - 1.2), 0, 3); }
          put(ex, ey, 0, 3);
        } else if ('Dizzy' === eyes) {
          const d = r * 0.75; seg(ex - d, ey - d, ex + d, ey + d, 0, 0, 3); seg(ex - d, ey + d, ex + d, ey - d, 0, 0, 3);
        } else if (eyes === 'Wink' && side > 0) {
          seg(ex - r, ey + 1, ex, ey - 1.2, 0, 0, 3); seg(ex, ey - 1.2, ex + r, ey + 1, 0, 0, 3);
        } else if ('Laser' === eyes) {
          ball(ex, r, 2); put(ex, ey, 7, 3); put(ex - 1, ey - 1, 7, 3);
        } else {
          const big = eyes === 'Tearful' || eyes === 'Big Shiny';
          ball(ex, big ? r + 0.5 : r);
          pupil(ex, big ? r + 0.5 : r, big);
          if (eyes === 'Big Shiny') put(ex + st.gx + 1.2, ey + 1.5, 7, 3);
          if (eyes === 'Sleepy') {
            for (let y = Math.floor(ey - r - 1); y < ey; y++) for (let x = Math.floor(ex - r - 1); x <= ex + r + 1; x++) if ((x - ex) ** 2 + (y - ey) ** 2 <= (r + 1) ** 2) put(x, y, headK, 3);
            seg(ex - r, ey, ex + r, ey, 0, 0, 3);
          }
          if (eyes === 'Glare') {
            const a = side < 0 ? -1 : 2, b = side < 0 ? 2 : -1;
            for (let x = Math.floor(ex - r - 1); x <= ex + r + 1; x++) {
              const ly = ey - r + a + (b - a) * (x - ex + r) / (2 * r);
              for (let y = Math.floor(ey - r - 1); y < ly; y++) if ((x - ex) ** 2 + (y - ey) ** 2 <= (r + 1) ** 2) put(x, y, headK, 3);
            }
            seg(ex - r, ey - r + a, ex + r, ey - r + b, 0, 1, 3);
          }
        }
      };
      if (eyes === 'Cyclops') { eye(24, er * 1.35, 0); }
      else if (eyes === 'Shades') {
        if (!st.blink) {
          const x0 = Math.round(24 - es - er - 0.5), x1 = Math.round(24 + es + er + 0.5);
          if (dim) for (let x = x0 - 1; x <= x1 + 1; x++) for (let y = Math.round(ey) - 3; y <= Math.round(ey) + 2; y++) put(x, y, 7, 3);
          for (let x = x0; x <= x1; x++) for (let y = Math.round(ey) - 2; y <= Math.round(ey) + 1; y++) put(x, y, 0, 3);
          put(x0 - 1, ey - 2, 0, 3); put(x1 + 1, ey - 2, 0, 3);
          if (st.glint >= 0) { const gx = x0 + 1 + st.glint * (x1 - x0 - 2) / 7; put(gx, ey - 1, 7, 3); put(gx + 1, ey - 2, 7, 3); }
          else { put(x0 + 2, ey - 1, 7, 3); put(x0 + 3, ey - 1, 7, 3); put(24 + es - 1, ey - 1, 7, 3); put(24 + es, ey - 1, 7, 3); }
        } else seg(24 - es - er, ey, 24 + es + er, ey, 0, 0, 3);
      } else { eye(24 - es, er, -1); eye(24 + es, er, 1); }
      // on a dim shell the eyes are lit bright (their cells take the BRIGHT attribute), so their whites stay white
      if (dim) {
        const x0 = Math.max(0, Math.floor(24 - es - er - 3)), x1 = Math.min(N - 1, Math.ceil(24 + es + er + 3));
        for (let y = Math.max(0, Math.floor(ey - er - 3)); y <= Math.min(N - 1, Math.ceil(ey + er + 3)); y++) for (let x = x0; x <= x1; x++) if (zone[y * N + x] === 1 && col[y * N + x] === 7) lit[y * N + x] = 1;
      }
      if (eyes === 'Tearful') { const ty = ey + er + 1 + st.tear * 0.9, tx = 24 - es - er * 0.4; put(tx, ty, 5, 3); put(tx, ty + 1, 5, 3); put(tx - 1, ty + 1, 5, 3); }

      // mouth
      const my = Math.round(Math.max(hy + BL.hry * 0.62, ey + er + 1.3));
      if (mouth === 'Grille') { for (let x = 21; x <= 27; x++) for (let y = my - 1; y <= my + 2; y++) put(x, y, x === 21 || x === 27 || y === my - 1 || y === my + 2 ? 0 : (x & 1 ? 0 : 7), 3); }
      else if (mouth === 'Grin') { seg(21, my, 22, my + 1, 0); seg(22, my + 1, 26, my + 1, 0); seg(26, my + 1, 27, my, 0); }
      else if (mouth === 'Whistle') {
        put(24, my, 0, 3); put(23, my + 1, 0, 3); put(25, my + 1, 0, 3); put(24, my + 2, 0, 3);
        if (st.note >= 0) { const nx = 24 + BL.hrx + 2 + st.note * 0.5, ny = my - 2 - st.note * 1.6; put(nx, ny, 7, 3); put(nx + 1, ny, 7, 3); put(nx + 1, ny - 1, 7, 3); put(nx + 1, ny - 2, 7, 3); put(nx + 2, ny - 2, 7, 3); }
      } else if (mouth === 'Fangs') { seg(21, my, 27, my, 0); put(22, my + 1, 7, 3); put(26, my + 1, 7, 3); }
      else if (mouth === 'Tongue') { seg(21, my, 27, my, 0); put(24, my + 1, 2, 3); put(25, my + 1, 2, 3); put(24, my + 2, 2, 3); }
      else if (mouth === 'Pincers') for (const s of [-1, 1]) { seg(24 + s * 4.5, my - 1, 24 + s * 4, my + 3, 0, 1, 3); seg(24 + s * 4, my + 3, 24 + s * 1.5, my + 4, 0, 0, 3); }
      else if (mouth === 'Smile') { seg(20, my - 1, 21.5, my + 1, 0); seg(21.5, my + 1, 26.5, my + 1, 0); seg(26.5, my + 1, 28, my - 1, 0); put(24, my + 2, 2, 3); put(25, my + 2, 2, 3); }
      else if (mouth === 'Gasp') { oval(24, my + 0.6, 1.4, 1.8, 0, 2, 0, 3); }
      else if (mouth === 'Teeth') {
        for (let x = 21; x <= 27; x++) for (let y = my - 1; y <= my + 2; y++) put(x, y, x === 21 || x === 27 || y === my - 1 || y === my + 2 || x === 24 ? 0 : 7, 3);
      } else if (mouth === 'Moustache') {
        for (const s of [-1, 1]) { seg(24, my - 1, 24 + s * 3, my - 1, 0, 1, 3); seg(24 + s * 3, my, 24 + s * 5, my, 0, 0, 3); put(24 + s * 6, my - 1, 0, 3); put(24 + s * 6, my - 2, 0, 3); }
        put(24, my + 2, 0, 3); put(25, my + 2, 0, 3);
      } else if (mouth === 'Buck Tooth') { seg(22, my, 26, my, 0); put(24, my + 1, 7, 3); put(25, my + 1, 7, 3); put(24, my + 2, 7, 3); put(25, my + 2, 7, 3); put(23, my + 1, 0, 3); put(26, my + 1, 0, 3); }
      else if (mouth === 'Bubblegum') {
        const gk = shellK === 3 ? 2 : 3;
        put(24, my, 0, 3);
        if (st.gum > 0.9) { oval(24, my + 0.8 + st.gum * 0.5, st.gum, st.gum * 0.92, 0, gk, 0, 3); put(24 - st.gum * 0.45, my + st.gum * 0.2, 7, 3); }
        else if (st.gum < 0) for (const [dx, dy] of [[-3, 0], [3, 1], [-2, 2], [2, -1], [0, 2], [-4, 2], [4, 2]]) put(24 + dx, my + 1 + dy, gk, 3);
      }

      // extras
      const gemY = htop + 2;
      if (extra === 'Gem' || extra === 'Flashing Gem') { oval(24, gemY, 1.5, 1.5, 0, extra === 'Gem' ? 5 : 2, undefined, 3); put(23, gemY - 1, 7, 3); }
      else if (extra === 'Bow') {
        const bx = Math.round(24 + BL.hrx * 0.78), by = htop + 1;
        for (let y = -2; y <= 2; y++) for (let x = 0; x <= Math.abs(y) + 1; x++) { put(bx + x, by + y, 2, 3); put(bx - x, by + y, 2, 3); }
        put(bx, by, 7, 3);
      } else if (extra === 'Monocle' && eyes !== 'Shades' && eyes !== 'Cyclops') {
        const mx = 24 + es, rr = er + 1.1;
        for (let k = 0; k < 24; k++) { const t = k / 24 * Math.PI * 2; put(mx + Math.cos(t) * rr, ey + Math.sin(t) * rr, 6, 3); }
        seg(mx + rr * 0.7, ey + rr * 0.7, mx + rr + 1.5, ey + rr + 8, 6, 0, 2);
      } else if (extra === 'Headband') {
        const hk = shellK === 2 ? 7 : 2;
        for (let y = htop + 2; y <= htop + 3; y++) for (let x = 0; x < N; x++) if (Math.abs(x - 24) <= BL.hrx * Math.sqrt(Math.max(0, 1 - ((y - hy) / BL.hry) ** 2)) - 0.5) put(x, y, (y === htop + 3 && x % 3 === 0) ? 7 : hk, 3);
        const kx = 24 - BL.hrx; put(kx - 1, htop + 3, hk, 3); put(kx - 2, htop + 4, hk, 3); put(kx - 2, htop + 5, hk, 3); put(kx - 1, htop + 4, hk, 3);
      } else if ('Scarf' === extra) {
        const sk = shellK === 2 || shellK === 3 ? 5 : 2, sy = Math.round(hy + BL.hry) - 1, half = Math.min(BL.pw * 0.62, BL.hrx + 2);
        for (let y = sy; y <= sy + 2; y++) for (let x = Math.floor(24 - half); x <= 24 + half; x++) put(x, y, (x + y) % 4 === 0 ? 0 : sk, 3);
        for (let k = 0; k < 7; k++) { put(27 + k * 0.4, sy + 3 + k, sk, 3); put(28 + k * 0.4, sy + 3 + k, sk, 3); put(29 + k * 0.4, sy + 3 + k, k === 6 ? 7 : 0, 2); }
      } else if (extra === 'Freckles') {
        const by = ey + er + 1.5;
        for (const s of [-1, 1]) { put(24 + s * (es + 1.5), by, 0, 3); put(24 + s * (es - 0.5), by + 0.6, 0, 3); put(24 + s * (es + 0.5), by + 1.8, 0, 3); }
      } else if (extra === 'Tiny Hat') {
        const hx = Math.round(24 - BL.hrx * 0.5), hb = htop + 1;
        for (let x = hx - 4; x <= hx + 4; x++) put(x, hb, 0, 3);
        for (let y = hb - 5; y < hb; y++) for (let x = hx - 2; x <= hx + 2; x++) put(x, y, y === hb - 1 ? 2 : (x === hx - 2 ? 1 : 0), 3);
        put(hx - 2, hb - 4, 7, 3);
      } else if (extra === 'Halo') {
        const hy2 = Math.max(2.5, htop - 8) + st.halo;
        for (let y = Math.floor(hy2 - 3); y <= hy2 + 3; y++) for (let x = 13; x <= 35; x++) {
          const n = ((x - 24) / 8.5) ** 2 + ((y - hy2) / 2.2) ** 2;
          if (n >= 0.45 && n <= 1.2) put(x, y, shellK === 6 ? 7 : 6, 3);
        }
      }
      if (eyes === 'Laser' && st.laser) {
        for (const s of [-1, 1]) { const ex = 24 + s * es; for (let k = 2; k < 60; k++) { const x = ex + s * k * 0.75, y = ey + k; if (x < 0 || x >= N || y >= N) break; put(x, y, 2, 3); put(x + s, y, 6, 2); } }
      }
    }

    // ---------- what it holds ----------
    const HANDX = { 'Dung Ball': 5.4, Leaf: 4, Berry: 4.2, Flower: 1.6, Mushroom: 2.2, Joystick: 5.4, Cassette: 6.6, Lolly: 1.6, Sword: 1.6, Star: 5, 'Golden Dung Ball': 7.6 };
    const alt = (k, k2) => (k === shellK || (shellName === 'Rainbow' && k !== 0 && k !== 7) ? k2 : k);
    let ballAt = null;
    function prop(st, pcy) {
      Z = 2;
      if (held === 'Dung Ball') {
        const bk = alt(2, 3);          // never yellow: gold belongs to the golden one alone
        oval(24, pcy - 2, 5.2, 5, 0, bk, 0);
        for (const [x, y] of [[-2, -1], [2, 1], [0, 3], [3, -3], [-3, 2]]) put(24 + x, pcy - 2 + y, 0, 3);
        put(22, pcy - 5, 7, 3); put(21, pcy - 4, 7, 3);
      } else if (held === 'Leaf') {
        const lk = alt(4, 5);
        oval(24, pcy - 4, 7, 3.4, -0.75, lk, 0);
        seg(19.5, pcy + 0.5, 28.5, pcy - 8.5, 0, 0, 3); seg(23, pcy - 3, 21, pcy - 6, 0, 0, 3); seg(26, pcy - 6, 28, pcy - 3, 0, 0, 3);
        put(18, pcy + 2, 0, 3); put(19, pcy + 1, 0, 3);
      } else if (held === 'Berry') {
        const bk = alt(2, 3);
        oval(24, pcy - 2, 4.3, 4.3, 0, bk, 0); put(22, pcy - 4, 7, 3); put(23, pcy - 5, 7, 3);
        const lk = alt(4, 5); put(24, pcy - 7, lk, 3); put(25, pcy - 8, lk, 3); put(23, pcy - 7, lk, 3); put(26, pcy - 8, lk, 3);
      } else if ('Flower' === held) {
        seg(24, pcy + 3, 24, pcy - 5, alt(4, 5), 0, 3);
        const pk = alt(3, 7), ck = alt(6, 2), fy = pcy - 9;
        for (let i = 0; i < 6; i++) { const q = i / 6 * Math.PI * 2; oval(24 + Math.cos(q) * 3.6, fy + Math.sin(q) * 3.6, 2.1, 2.1, 0, pk, 0); }
        oval(24, fy, 2, 2, 0, ck);
      } else if (held === 'Mushroom') {
        for (let y = pcy - 2; y <= pcy + 3; y++) for (let x = 22; x <= 26; x++) put(x, y, x === 22 || x === 26 || y === pcy + 3 ? 0 : 7, 3);
        const ck = alt(2, 3);
        for (let y = pcy - 10; y <= pcy - 1; y++) for (let x = 15; x <= 33; x++) {
          const n = ((x - 24) / 8) ** 2 + ((y - pcy + 1.5) / 8) ** 2;
          if (y > pcy - 2) { if (n <= 1.2) put(x, y, 0, 3); continue; }
          if (n <= 1) put(x, y, (Math.hypot(x - 20, y - pcy + 5) < 1.6 || Math.hypot(x - 27.5, y - pcy + 6) < 1.6 || Math.hypot(x - 24, y - pcy + 8.5) < 1.1) ? 7 : ck, 3);
          else if (n <= 1.28) put(x, y, 0, 3);
        }
      } else if (held === 'Joystick') {
        for (let y = pcy - 1; y <= pcy + 3; y++) for (let x = 18; x <= 30; x++) put(x, y, y === pcy - 1 ? 7 : 0, 3);
        seg(24, pcy - 1, 24, pcy - 8, 0, 1, 3); oval(24.5, pcy - 10, 2.4, 2.4, 0, alt(2, 3), 0); put(23, pcy - 11, 7, 3);
        put(20, pcy - 2, alt(2, 3), 3); put(21, pcy - 2, alt(2, 3), 3);
      } else if (held === 'Cassette') {
        for (let y = pcy - 5; y <= pcy + 2; y++) for (let x = 17; x <= 31; x++) {
          const label = y >= pcy - 4 && y <= pcy - 1 && x >= 19 && x <= 29, win = y >= pcy - 3 && y <= pcy - 2 && x >= 21 && x <= 27;
          put(x, y, win ? ((x === 22 || x === 26) ? 7 : 0) : label ? 7 : 0, 3);
        }
        put(21, pcy + 1, 7, 3); put(27, pcy + 1, 7, 3);
      } else if (held === 'Lolly') {
        seg(24, pcy + 3, 24, pcy - 3, 7, 0, 3); put(25, pcy + 3, 0, 3);
        const lk = alt(3, 2);
        for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) {
          const r = Math.hypot(x, y); if (r > 5.2) continue;
          const q = Math.atan2(y, x); put(24 + x, pcy - 8 + y, ((q / (Math.PI * 2) + r / 3.6 + 2) % 1) < 0.5 ? lk : 7, 3);
        }
      } else if (held === 'Sword') {
        // held in the right hand, blade up and out over the paper
        const hx = 24 + HANDX.Sword, bk = alt(7, 5);
        for (let i = 2; i <= 17; i++) { const x = hx + i * 0.62, y = pcy - i; put(x, y, bk, 3); if (i < 16) put(x + 1, y, bk, 3); }
        seg(hx - 3, pcy - 0.5, hx + 3.5, pcy - 2.5, alt(6, 2), 1, 3);
        put(hx, pcy + 1, 2, 3); put(hx - 0.5, pcy + 2, 2, 3); put(hx - 1, pcy + 3, alt(6, 2), 3);
      } else if (held === 'Golden Dung Ball') {
        // the coveted one: a big ball of BRIGHT gold, dithered round, with a white sparkle cross that reaches
        // out into the neighbouring cells, a glint that travels, and a burst of sparks when tapped
        const cy = pcy + 2, R = 7;
        const glow = (x, y) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < N && y < N) lit[y * N + x] = 1; };
        for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) {
          const r = Math.hypot(x, y), sh = (x * 0.55 + y * 0.8) / R;
          if (r <= R) { put(24 + x, cy + y, (sh > 0.62 && (x + y) & 1) || sh > 0.92 ? 0 : 6, 3); glow(24 + x, cy + y); }
          else if (r <= R + 1) put(24 + x, cy + y, 0, 3);
        }
        put(20, cy - 4, 7, 3); put(21, cy - 4, 7, 3); put(20, cy - 3, 7, 3);
        const star = (x, y, arm, v = 4) => {
          for (let d = -arm; d <= arm; d++) { put(x + d, y, 7, v); put(x, y + d, 7, v); glow(x + d, y); glow(x, y + d); }
          if (arm > 2) { put(x - 1, y - 1, 7, 3); put(x + 1, y - 1, 7, 3); put(x - 1, y + 1, 7, 3); put(x + 1, y + 1, 7, 3); }
        };
        // the big sparkle, always there, just off the ball's upper shoulder in the next cell; it breathes between two sizes
        star(Math.round(24 + R + 2), Math.round(cy - R), st.twinkle % 2 ? 4 : 3, 8);
        const n = st.shine ? 8 : 3;
        for (let k = 0; k < n; k++) {
          const a = (k / n + st.twinkle * 0.0625) * Math.PI * 2 + (st.shine ? 0.4 : 0), rr = st.shine ? 11 : 9.6, x = Math.round(24 + Math.cos(a) * rr), y = Math.round(cy + Math.sin(a) * rr);
          if (k === st.twinkle % n || st.shine) star(x, y, st.shine ? 2 : 1);
        }
        ballAt = [24, cy];
      } else if (held === 'Star') {
        const R = 6.4, cy = pcy - 4, sk = alt(6, 7);
        for (let y = -8; y <= 8; y++) for (let x = -8; x <= 8; x++) {
          const q = Math.atan2(y, x) + Math.PI / 2, r = Math.hypot(x, y), m = ((q / (Math.PI * 2 / 5)) % 1 + 1) % 1, lim = R * (0.45 + 0.55 * Math.abs(m - 0.5) * 2);
          if (r <= lim) put(24 + x, cy + y, sk, 3);
        }
        const sp = [[-9, -6], [9, -5], [-8, 5], [10, 2]][st.twinkle];
        put(24 + sp[0], cy + sp[1], 7, 3); put(24 + sp[0] + 1, cy + sp[1], 7, 3); put(24 + sp[0] - 1, cy + sp[1], 7, 3); put(24 + sp[0], cy + sp[1] - 1, 7, 3); put(24 + sp[0], cy + sp[1] + 1, 7, 3);
      }
    }

    // ---------- the legendaries' own pieces ----------
    // the sun scarab: winged like a pectoral, with the sun it rolls across the sky held up in its forelegs
    function scarabWings(oy) {
      for (const s of [-1, 1]) for (let y = 8; y < 42; y++) for (let x = 0; x < N; x++) {
        const d = s * (x - 24); if (d < 8) continue;
        const t = (d - 8) / 16, top = 21 + oy - t * 7, len = 16 + t * 4 + (d % 3 === 1 ? 1 : 0), yy = y - top;
        if (yy < 0 || yy > len) continue;
        // a colour per attribute row: gold coverts, turquoise feathers, carnelian tips
        const k = y < 24 ? 6 : y < 32 ? 5 : 2;
        const div = y < 24 ? (d + y) % 4 === 0 : d % 3 === 0;
        put(x, y, div || yy > len - 0.6 ? 0 : k, 2);
      }
    }
    function sunRays(st) {
      const cx = 24, cy = 6 + st.bob, n = 12;
      for (let k = 0; k < n; k++) {
        const a = k / n * Math.PI * 2 + st.rayPh, L = (k & 1 ? 12 : 17) + st.flare * 34;
        for (let r = 9; r < L; r += 0.5) { const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (!(x >= 15.5 && x < 31.5 && y < 15.5)) put(x, y, 6, 2); }
      }
      if (st.hov) {
        // a long ray reaches out to the pointer
        const a = Math.atan2(st.hov[1] - cy, st.hov[0] - cx), L = Math.hypot(st.hov[0] - cx, st.hov[1] - cy);
        if (L > 8) { seg(cx + Math.cos(a) * 8, cy + Math.sin(a) * 8, st.hov[0], st.hov[1], 7, 0, 2); put(st.hov[0], st.hov[1] - 1, 7, 2); put(st.hov[0], st.hov[1] + 1, 7, 2); put(st.hov[0] - 1, st.hov[1], 7, 2); put(st.hov[0] + 1, st.hov[1], 7, 2); }
      }
    }
    function sunDisk(st, oy) {
      // the disk fills its own two-by-two block of cells: red sun, gold halo for paper
      const cx = 23.5, cy = 6.5 + oy, R = 5.6 + st.flare * 1.4;
      for (let y = 0; y < 16; y++) for (let x = 16; x < 32; x++) {
        const r = Math.hypot(x - cx, (y - cy) * 1.05);
        if (r <= R) put(x, y, st.flare > 0.6 ? 7 : (x - cx) + (y - cy) < -5 && r > R - 2.2 ? 6 : 2, 4);
        else put(x, y, 6, 3);
      }
    }
    // the clockwork tin: a brass wind-up key in its flank that turns as it runs down
    function windKey(st, oy) {
      const v = -0.5, ky = Math.round(BL.ecy + oy + v * BL.eh), ex = Math.round(24 + BL.ew * Math.pow(1 - v * v, 1 / 2.2));
      for (let x = ex - 3; x <= ex + 2; x++) { put(x, ky, 6, 4); put(x, ky + 1, 0, 3); }
      const cw = [1, 0.62, 0.12, 0.62][st.key], bx = ex + 4.5;
      for (const ly of [-3.2, 3.2]) for (let y = -6; y <= 6; y++) for (let x = -4; x <= 4; x++) {
        const rx = Math.max(0.55, 2.8 * cw), e = (x / rx) ** 2 + ((y - ly) / 2.9) ** 2;
        if (e <= 1 && (e > 0.36 || cw < 0.5)) put(bx + x, ky + y, 6, 4);
        else if (e <= 1.5 && e > 1) put(bx + x, ky + y, 0, 3);
      }
      put(bx, ky, 6, 4); put(bx - 1, ky, 6, 4);
    }
    // the lantern: its light spills into the paper one attribute cell at a time, dithered at the edge
    const flies = Array.from({ length: 6 }, (_, k) => [lr() * 6.283, 0.7 + lr() * 0.9, 9 + lr() * 12]);
    function lantern(st, oy) {
      const lx0 = st.lc[0], ly0 = st.lc[1] + oy, R = st.glow;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x; if (mask[i]) continue;
        const d = Math.hypot(x - lx0, (y - ly0) * 1.15);
        if (d < R * 0.5) { col[i] = col[i] === 1 || col[i] === patK ? 6 : 7; wt[i] = 3; }
        else if (d < R * 0.78 ? (x + y) & 1 : d < R && (x & 1) && (y & 1)) { col[i] = 6; wt[i] = 2; }
      }
      // the black shell is rim-lit wherever the light reaches its edge
      for (let y = 1; y < N - 1; y++) for (let x = 1; x < N - 1; x++) {
        const i = y * N + x;
        if (!mask[i] || col[i] !== 0) continue;
        let n = 0;
        for (const j of [i - 1, i + 1, i - N, i + N]) if (!mask[j] && col[j] === 6) n++;
        if (n && Math.hypot(x - lx0, (y - ly0) * 1.15) < R * 0.78) col[i] = 6;
      }
    }
    function fireflies(st) {
      for (let k = 0; k < flies.length; k++) {
        const f = flies[k], a = f[0] + st.tt * f[1] * (st.burst ? 3 : 1);
        let x = 24 + Math.cos(a) * f[2] * (1 + st.burst), y = 22 + Math.sin(a * 1.3) * f[2] * 0.7 * (1 + st.burst);
        if (st.hov) { x = st.hov[0] + Math.cos(a * 2) * (2 + k); y = st.hov[1] + Math.sin(a * 2) * (1.5 + k * 0.6); }
        if ((k + st.twinkle) % 4 === 0 && !st.burst) continue;
        put(x, y, 4, 3); put(x + 1, y, 4, 3); put(x, y + 1, 6, 3); lit[Math.max(0, Math.min(N - 1, Math.round(y))) * N + Math.max(0, Math.min(N - 1, Math.round(x)))] = 1;
      }
    }

    // ---------- the head plate: round as ever, or wide, narrow, shovel-fronted, or with a point out from each cheek ----------
    function headPart(hy, htop) {
      if (head === 'Round') { part(24, hy, BL.hrx, BL.hry, HEADK, 2.3, -0.08, false, true); return; }
      const rx = BL.hrx, ry = BL.hry, p = HS[2], tp = HS[3];
      const sy0 = hy + ry * 0.1, sw = rx * 1.4, sh = ry * 1.05;
      const inside = (x, y) => {
        const v = (y - hy) / ry, rxx = rx * (1 + tp * Math.max(-1, Math.min(1, v)));
        if (Math.pow(Math.abs(x - 24) / rxx, p) + v * v <= 1) return true;
        if (head === 'Shovel' && y >= sy0) {
          // a broad scoop under the eyes, toothed along its front edge
          const q = ((x - 24) / sw) ** 2 + ((y - sy0) / sh) ** 2;
          if (q <= 1) return true;
          if (q <= 1.3 && y > sy0 + sh * 0.55 && x % 3 === 0) return true;
        }
        if (head === 'Horned Plate') for (const s of [-1, 1]) {
          const bx = 24 + s * rx * 0.7, by = hy - ry * 0.15, tx = 24 + s * (rx + 6), ty = hy - ry * 0.75;
          const ux = tx - bx, uy = ty - by, L2 = ux * ux + uy * uy, t = ((x - bx) * ux + (y - by) * uy) / L2;
          if (t >= 0 && t <= 1 && Math.abs((x - bx) * uy - (y - by) * ux) / Math.sqrt(L2) <= 2.8 * (1 - t) + 0.35) return true;
        }
        return false;
      };
      const y0 = Math.max(0, Math.floor(htop - 5)), y1 = Math.min(N - 1, Math.ceil(hy + ry * 2.3));
      for (let y = y0; y <= y1; y++) for (let x = 0; x < N; x++) {
        if (inside(x, y)) put(x, y, HEADK, 2);
        else if (inside(x - 1, y) || inside(x + 1, y) || inside(x, y - 1) || inside(x, y + 1)) put(x, y, 0, 3);
      }
    }

    // ---------- the whole drawing, one frame ----------
    let flashCell = -1;
    const headCells = new Uint8Array(36);   // the cells behind the head: plain paper, and never glitched
    function paint(st) {
      const oy = st.bob;
      col.fill(paperK); wt.fill(2); mask.fill(0); zone.fill(0); lit.fill(0); patM.fill(0); edgeM.fill(0);
      Z = 0; forceBright = -1;
      paper();
      friend(st);
      if (LEG === 'Sun Scarab') sunRays(st);
      if (LEG === 'Lantern') fireflies(st);
      gearPh = st.gear; glowPh = LEG === 'Lantern' ? Math.min(3, (st.glow - 29) / 3) : 0;
      const hy = BL.hy + oy, htop = hy - BL.hry, py = BL.py + oy, pb = py + BL.ph;
      Z = 1;
      hornsAndFeelers(oy, htop, st.twitch);
      // outline round the horns and feelers
      const edge = [];
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x; if (mask[i]) continue;
        if ((x > 0 && mask[i - 1]) || (x < N - 1 && mask[i + 1]) || (y > 0 && mask[i - N]) || (y < N - 1 && mask[i + N])) edge.push(i);
      }
      for (const i of edge) { col[i] = 0; wt[i] = 2; patM[i] = 0; edgeM[i] = 1; }
      if (LEG === 'Sun Scarab') sunDisk(st, oy);
      Z = 2;
      if (LEG === 'Sun Scarab') scarabWings(oy);
      else if (st.open > 0) hindWings(oy, st.open, st.flut);
      // middle and hind legs, behind the body
      const back = [];
      for (const s of [-1, 1]) {
        const mb = [24 + s * BL.pw * 0.9, pb - 0.5];
        back.push([mb, [mb[0] + s * 6, mb[1] - 1.5, 2], [mb[0] + s * 7.5, mb[1] + 4.5, 1], [mb[0] + s * 8.7, mb[1] + 5.2, 1]]);
        back.push([[mb[0] + s * 6.8, mb[1] + 1.5], [mb[0] + s * 7.8, mb[1] + 1.2, 1]]);
        const hb = [24 + s * BL.ew * 0.78, pb + 6 + oy * 0];
        back.push([hb, [hb[0] + s * 4.5, hb[1] + 3, 2], [hb[0] + s * 5.5, hb[1] + 8.5, 1], [hb[0] + s * 6.7, hb[1] + 9.2, 1]]);
      }
      limbs(back, shellK);
      // front legs, posed: tucked under the pronotum, or over the body when they hold something
      const front = [], pcy = Math.round(pb + 2);
      let bulge = null;
      for (const s of [-1, 1]) {
        const fb = [24 + s * BL.pw * 0.78, py - BL.ph * 0.15];
        let knee, foot, tip;
        const mode = pose === 'Waving' && s > 0 ? 'wave' : pose === 'Waving' ? 'stand' : pose;
        if (mode === 'Arms Up') { knee = [fb[0] + s * 4.5, fb[1] - 7]; foot = [knee[0] + s * (st.sway - 1), knee[1] - 8]; tip = [foot[0] + s, foot[1] - 1.5]; }
        else if (mode === 'wave') {
          knee = [fb[0] + 5.5, fb[1] - 6.5]; const a = [0, 0.45, 0.9, 0.45][st.wave];
          foot = [knee[0] + Math.sin(a) * 7, knee[1] - Math.cos(a) * 7]; tip = [foot[0] + Math.sin(a) * 1.6, foot[1] - Math.cos(a) * 1.6];
        } else if (mode === 'Holding') { knee = [fb[0] + s * 3.5, fb[1] + 5]; foot = [24 + s * HANDX[held], pcy]; tip = [foot[0] - s * 1.2, foot[1] - 0.5]; }
        else if (mode === 'Sun') { knee = [24 + s * 13.5, 20 + oy]; foot = [24 + s * 9.3, 12.5 + oy]; tip = [24 + s * 8.8, 10 + oy]; }
        else if (mode === 'Flexing') { knee = [fb[0] + s * 7, fb[1] + 0.5]; foot = [knee[0] - s * 0.5, knee[1] - 7 - st.flex]; tip = [foot[0] - s * 1.3, foot[1] - 0.6]; bulge = bulge || []; bulge.push([(fb[0] + knee[0]) / 2, fb[1] - 0.6]); }
        else { knee = [fb[0] + s * 5, fb[1] - 5]; foot = [fb[0] + s * 6.5, fb[1] - 10.5]; tip = [foot[0] + s * 1.5, foot[1] - 1]; }
        front.push([fb, [knee[0], knee[1], 2], [foot[0], foot[1], 1], [tip[0], tip[1], 1]]);
        const mx = (knee[0] + foot[0]) / 2, mY = (knee[1] + foot[1]) / 2;
        front.push([[mx, mY], [mx + s * 1, mY + 0.2, 1]]);
      }
      if (pose !== 'Holding') limbs(front, shellK);
      if (st.open > 0) {
        for (let y = Math.floor(pb); y < N; y++) for (let x = 0; x < N; x++) {
          const u = (x - 24) / (BL.ew * 0.5), v = (y - BL.ecy - oy) / BL.eh;
          if (u * u + v * v <= 1) put(x, y, (y - Math.floor(pb)) % 3 === 2 || Math.abs(u) > 0.92 ? 0 : shellK, 1);
        }
      }
      elytra(oy, st.open, st.flut);
      part(24, py, BL.pw, BL.ph, shellK, BL.pp, 0.1, build === 'Shieldback');
      if (LEG === 'Clockwork') windKey(st, oy);
      Z = 1;
      headPart(hy, htop);
      if (horns === 'Crown') {
        const d = htop - 11;
        for (const px of [16, 20, 24, 28, 32]) { put(px, 11 + d, 6, 2); put(px, 10 + d, 6, 2); put(px, 9 + d, 7, 2); }
        for (let x = 17; x <= 31; x++) { put(x, 12 + d, 6); put(x, 13 + d, 6); }
        put(24, 12 + d, 2, 2);
      }
      if (LEG === 'Sun Scarab') {
        // gold partitions across the lapis shoulders
        for (let y = Math.floor(py - BL.ph); y <= py + BL.ph; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x; if (y < 0 || y >= N || col[i] !== shellK || zone[i] !== 2) continue;
          if (Math.abs(x - 23.5) < 0.6 || Math.abs((x - 24) ** 2 / (BL.pw * 0.62) ** 2 + (y - py - BL.ph * 0.5) ** 2 / (BL.ph * 0.7) ** 2 - 1) < 0.16) col[i] = 6;
        }
        // cloisonne: the silhouette's black rim becomes gold wire
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (!mask[i] || col[i] !== 0) continue;
          if ((x > 0 && !mask[i - 1]) || (x < N - 1 && !mask[i + 1]) || (y > 0 && !mask[i - N]) || (y < N - 1 && !mask[i + N])) col[i] = 6;
        }
        // and inside the body the black seams give way to lapis, so each cell is gold on blue
        for (let y = Math.ceil(py - BL.ph); y < N; y++) for (let x = 13; x <= 35; x++) { const i = y * N + x; if (zone[i] > 0 && col[i] === 0) col[i] = zone[i] === 1 ? HEADK : shellK; }
      }
      if (LEG === 'Lantern') lantern(st, oy);
      face(st, hy, htop);
      flashCell = extra === 'Flashing Gem' ? ((Math.round(htop + 2) >> 3) * 6 + 3) : -1;
      Z = 2;
      boost = 3;
      if (held !== 'Nothing') prop(st, pcy);
      boost = 0;
      if (pose === 'Holding') limbs(front, shellK);
      if (bulge) for (const b of bulge) oval(b[0], b[1], 2 + st.flex * 0.6, 1.5 + st.flex * 0.5, 0, shellK, 0);
      if (shellName === 'Rainbow') for (let i = 0; i < N * N; i++) if (col[i] === 4 && mask[i]) { const k = screen === 'Multicolour' ? rainbow[((i / N | 0) >> 1) % rainbow.length] : rainOrder[((i / N | 0) >> 3) * 6 + ((i % N) >> 3)]; col[i] = k === 4 || k === paperK ? (paperK === 1 ? 3 : 1) : k; }
      // busy paper never crowds it: plain paper in every cell behind its head, and in a one-dot ring round its outline
      const hc = headCells; hc.fill(0);
      for (let y = Math.max(0, Math.floor(htop) - 1); y < N; y++) for (let x = 0; x < N; x++) if (zone[y * N + x] === 1) hc[(y >> 3) * 6 + (x >> 3)] = 1;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (!patM[i]) continue;
        let near = hc[(y >> 3) * 6 + (x >> 3)];
        for (let dy = -1; dy <= 1 && !near; dy++) for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < N && yy < N && (mask[yy * N + xx] || edgeM[yy * N + xx])) { near = 1; break; }
        }
        if (near) { col[i] = paperK; wt[i] = 2; }
      }
    }

    // the loading stripes only play in the large view; a tile loads quietly with a plain border
    const LARGE = 360;
    // ---------- the attribute pass: every cell cut to the ink and paper pair that loses least ----------
    const off = document.createElement('canvas');
    off.width = off.height = T;
    const oc = off.getContext('2d');
    const img = oc.createImageData(T, T), px = img.data;
    const ink = new Uint8Array(N * N), outK = new Uint8Array(N * N), bright = new Uint8Array(36);
    const bits = k => (k & 1) + ((k >> 1) & 1) + ((k >> 2) & 1);
    const dist = (p, q) => bits(p ^ q) * 2 + (bits(p) !== bits(q) ? 1 : 0);
    const ROWS = [];
    for (let th = 0; th < 3; th++) for (let l = 0; l < 8; l++) for (let r = 0; r < 2; r++) ROWS.push(th * 16 + r * 8 + l);
    const rowAt = new Uint8Array(N); ROWS.forEach((r, i) => { rowAt[r] = i; });
    const used = [], seen = new Uint8Array(8), cnt = new Uint16Array(8);
    function attribute(st) {
      for (let cy = 0; cy < 6; cy++) for (let cx = 0; cx < 6; cx++) {
        let b = 0, l = 0;
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const i = (cy * 8 + y) * N + cx * 8 + x; b += mask[i]; l += lit[i]; }
        bright[cy * 6 + cx] = (b >= 24 && !dim) || l >= 4 || cy * 6 + cx === forceBright || LEG === 'Lantern' ? 1 : 0;
      }
      const ch = screen === 'Multicolour' ? 1 : 8;
      const glitchOn = screen === 'Glitch' ? new Map() : null;
      if (glitchOn) for (let k = 0; k < 9 && glitchOn.size < 3; k++) { const gp = glitchPairs[(st.gstep * 9 + k) % glitchPairs.length]; if ((bright[gp[0]] === 0 || gp[0] >= 30) && !headCells[gp[0]]) glitchOn.set(gp[0], gp); }
      for (let by = 0; by < N; by += ch) for (let bx = 0; bx < N; bx += 8) {
        used.length = 0; seen.fill(0); cnt.fill(0);
        for (let y = by; y < by + ch; y++) for (let x = bx; x < bx + 8; x++) { const k = col[y * N + x]; cnt[k]++; if (!seen[k]) { seen[k] = 1; used.push(k); } }
        let best = 1e9, P = used[0], Q = used[0];
        for (let u = 0; u < used.length; u++) for (let v = u; v < used.length; v++) {
          let err = 0;
          for (let y = by; y < by + ch && err < best; y++) for (let x = bx; x < bx + 8; x++) {
            const i = y * N + x, k = col[i];
            err += Math.min(dist(k, used[u]), dist(k, used[v])) * wt[i];
          }
          if (err < best) { best = err; P = used[u]; Q = used[v]; }
        }
        // the paper is whichever of the pair covers more of the cell
        let paperC = P, inkC = Q;
        if (cnt[Q] > cnt[P]) { paperC = Q; inkC = P; }
        const cell = (by >> 3) * 6 + (bx >> 3);
        let swapIt = false;
        if (st.flash && cell === flashCell) swapIt = !swapIt;
        const gl = glitchOn && glitchOn.get(cell);
        for (let y = by; y < by + ch; y++) for (let x = bx; x < bx + 8; x++) {
          const i = y * N + x, k = col[i];
          let isInk = dist(k, inkC) < dist(k, paperC) ? 1 : 0;
          if (inkC === paperC) isInk = 0;
          if (swapIt) isInk ^= 1;
          ink[i] = isInk;
          let o = isInk ? (swapIt ? paperC : inkC) : (swapIt ? inkC : paperC);
          if (swapIt && inkC === paperC) o = paperC === 0 ? 7 : 0;
          if (gl) o = isInk ? gl[1] : gl[2];
          outK[i] = o;
        }
      }
      // the tape loader: pixels arrive in the machine's interleaved line order, then the colours
      const lp = st.load;
      const bc = RGB(st.border, 0);
      for (let i = 0; i < T * T; i++) { px[i * 4] = bc[0]; px[i * 4 + 1] = bc[1]; px[i * 4 + 2] = bc[2]; px[i * 4 + 3] = 255; }
      const rowsIn = lp < 0.7 ? Math.floor(lp / 0.7 * 48) : 48, cellsIn = lp < 0.7 ? 0 : Math.floor((lp - 0.7) / 0.3 * 36);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = y * N + x, cell = (y >> 3) * 6 + (x >> 3), j = ((y + B) * T + x + B) * 4;
        let rgb;
        if (lp >= 1 || cell < cellsIn) rgb = RGB(screen === 'Inverse' ? 7 - outK[i] : outK[i], bright[cell]);
        else if (rowAt[y] < rowsIn) rgb = ink[i] ? RGB(0, 0) : RGB(7, 0);
        else rgb = RGB(7, 0);
        px[j] = rgb[0]; px[j + 1] = rgb[1]; px[j + 2] = rgb[2];
      }
      oc.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(off, 0, 0, T, T, 0, 0, S, S);
      // loading stripes in the border while the tape plays
      if (lp < 1 && S >= LARGE) {
        const pilot = lp < 0.08, h = S / (pilot ? 36 : 54), ka = pilot ? 2 : 1, kb2 = pilot ? 5 : 6, bw = S * B / T;
        const offY = (st.tt * S * 0.35) % (h * 2);
        for (let y = -h * 2 + offY, n = 0; y < S; y += h, n++) {
          const a = RGB(n % 2 ? ka : kb2, 0);
          g.fillStyle = 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')';
          const y0 = Math.max(0, y), y1 = Math.min(S, y + h);
          if (y1 <= y0) continue;
          g.fillRect(0, y0, S, Math.max(0, Math.min(y1, bw) - y0));
          if (y1 > S - bw) g.fillRect(0, Math.max(y0, S - bw), S, y1 - Math.max(y0, S - bw));
          const m0 = Math.max(y0, bw), m1 = Math.min(y1, S - bw);
          if (m1 > m0) { g.fillRect(0, m0, bw, m1 - m0); g.fillRect(S - bw, m0, bw, m1 - m0); }
        }
      }
    }

    // ---------- the clock, the pointer and the beeper ----------
    let last = '', hopAt = -9, wingAt = -9, loadAt = 0, hops = 0, border = borderK;
    let legAt = -9, shineAt = -9, wasIn = false, tickAt = 0;
    // each legendary answers a tap on itself in its own way
    function legTap(t) {
      if (LEG === 'Lantern') {
        if (t - legAt < 1.6) return;
        legAt = t;
        // the light blooms over the whole screen: a soft swelling chord, then the fireflies scatter in little blips
        for (const d of [0, 2, 4, 7]) c.sound.note(tone(d) + 12, { dur: 1.1, vel: 0.1, wave: 'triangle', attack: 0.25 });
        for (let i = 0; i < 6; i++) c.sound.note(tone(7 + i) + 12, { dur: 0.05, vel: 0.1, wave: 'square', cutoff: 3200, at: 0.6 + i * 0.09 });
      } else if (LEG === 'Sun Scarab') {
        if (t - legAt < 1.4) return;
        legAt = t;
        const HJ = [0, 1, 4, 5, 7, 8, 11, 12];
        for (let i = 0; i < 8; i++) c.sound.note(root + HJ[i], { dur: 0.13, vel: 0.17, wave: 'square', cutoff: 2200, at: i * 0.09 });
        for (const d of [12, 16, 19]) c.sound.note(root + d, { dur: 0.7, vel: 0.1, wave: 'triangle', at: 0.75 });
      } else if (LEG === 'Clockwork') {
        if (t - legAt < 2.3) return;
        legAt = t;
        // the ratchet as it is wound, then the music box inside plays its tune
        for (let i = 0; i < 6; i++) c.sound.note(tone(6) + 24 + (i & 1), { dur: 0.015, vel: 0.14, wave: 'square', cutoff: 4000, at: i * 0.07 });
        boxTune.forEach((d, i) => c.sound.note(tone(d) + 12, { dur: 0.5, vel: 0.13, wave: 'sine', at: 0.5 + i * 0.2 }));
      }
    }
    const tone = d => root + mode[((d % mode.length) + mode.length) % mode.length] + 12 * Math.floor(d / mode.length);
    function frame(t) {
      const inp = c.input;
      for (const tp of inp.taps()) {
        const tx = Math.floor(tp.x * T) - B, ty = Math.floor(tp.y * T) - B;
        const inside = tx >= 0 && ty >= 0 && tx < N && ty < N, z = inside ? zone[ty * N + tx] : -1;
        if (LEG && inside && z > 0) { legTap(t); continue; }
        if (golden && ballAt && inside && Math.hypot(tx - ballAt[0], ty - ballAt[1]) < 9.5) {
          if (t - shineAt > 0.6) { shineAt = t; [0, 4, 7, 12].forEach((d, i) => c.sound.note(tone(d) + 24, { dur: 0.25, vel: 0.12, wave: 'triangle', at: i * 0.06 })); }
          continue;
        }
        if (z === 1) {
          if (t - hopAt > 0.35) {
            hopAt = t;
            for (let i = 0; i < 3; i++) c.sound.note(tone(hops + i * 2) + 12, { dur: 0.06, vel: 0.22, wave: 'square', cutoff: 2600, at: i * 0.055 });
            hops = (hops + 1) % (mode.length * 2);
          }
        } else if (z === 2) {
          if (t - wingAt > 0.5) {
            wingAt = t;
            for (let i = 0; i < 9; i++) c.sound.note(tone(i % 2 ? 1 : 0) - 12, { dur: 0.035, vel: 0.14, wave: 'sawtooth', cutoff: 900, at: i * 0.045 });
            c.sound.note(tone(4), { dur: 0.08, vel: 0.12, wave: 'square', cutoff: 2000, at: 0.42 });
          }
        } else if (z === -1 && screen === 'Tape Load') {
          if (t - loadAt > 2.8) { loadAt = t; for (let i = 0; i < 4; i++) c.sound.note(tone(8 - i * 2), { dur: 0.07, vel: 0.15, wave: 'square', cutoff: 1800, at: i * 0.08 }); }
        } else {
          border = (border + 1) % 8; if (border === paperK) border = (border + 1) % 8;
          c.sound.note(tone(border), { dur: 0.1, vel: 0.18, wave: 'square', cutoff: 1600 });
        }
      }
      const ht = t - hopAt, wt2 = t - wingAt, lt = t - legAt;
      let bob = Math.floor(t / 1.1 + blinkSeed) % 2;
      if (ht < 0.42) bob = -Math.round(Math.sin(ht / 0.42 * Math.PI) * 4);
      // the legendaries' hover: the lantern and the sun scarab answer with soft notes, the tin toy ticks three times
      if (inp.inside && !wasIn) {
        if (LEG === 'Lantern') [0, 4].forEach((d, i) => c.sound.note(tone(d) + 24, { dur: 0.3, vel: 0.07, wave: 'sine', at: i * 0.12 }));
        if (LEG === 'Sun Scarab') c.sound.note(root + 24, { dur: 0.6, vel: 0.08, wave: 'sine' });
        if (LEG === 'Clockwork') for (let i = 0; i < 3; i++) c.sound.hit('click', 0.12, { at: i * 0.5 });
      }
      wasIn = inp.inside;
      const winding = LEG === 'Clockwork' && lt < 2.2;
      if (winding && lt > 0.5) bob = -(Math.floor((lt - 0.5) / 0.2) % 2);

      const gp = Math.floor((t + glanceSeed) / 2.6) % 4;
      let gx = gp === 1 ? -1 : gp === 3 ? 1 : 0, gy = 0;
      if (inp.inside) { gx = inp.x < 0.4 ? -1 : inp.x > 0.6 ? 1 : 0; gy = inp.y < 0.25 ? -1 : inp.y > 0.65 ? 1 : 0; }
      const buzzing = wt2 < 0.9;
      const open = pose === 'Wings Open' || buzzing ? 1 : 0;
      const ct = t + compPh;
      const gu = ((t + gumPh) % 5) / 5;
      const gl = (t + laserPh * 3) % 5;
      const st = {
        bob, gx, gy, open,
        blink: (t + blinkSeed) % 4.3 < 0.18 ? 1 : 0,
        twitch: Math.floor(t * 1.7 + glanceSeed) % 5 === 0 ? 1 : 0,
        flash: extra === 'Flashing Gem' ? Math.floor(t / 0.8) % 2 : 0,
        flut: open ? (buzzing ? Math.floor(t / 0.16) % 2 : Math.floor(t / 0.55) % 2) : 0,
        wave: Math.floor(t * 3) % 4, sway: Math.floor(t / 0.7) % 2, flex: (t % 2.4) < 0.9 ? 1 : 0,
        cf: Math.floor(ct * 6) % 12, csp: Math.round((Math.sin(ct * 0.9) + 1) * 2),
        ffa: Math.round(ct * 2.4) / 4, ffb: Math.round(ct * 3.6) / 4, glow: ct % 1.8 < 0.8 ? 1 : 0,
        ca: Math.floor(ct * 4), bbob: Math.floor(ct / 0.9) % 2, bblink: ct % 3.7 < 0.2 ? 1 : 0,
        flap: Math.floor(ct / 0.4) % 2, mdx: Math.round(Math.sin(ct * 0.5) * 2),
        ux: Math.round(Math.sin(ct * 0.5) * 2), uy: Math.round(Math.sin(ct * 1.3)), ul: Math.floor(ct * 3) % 3,
        gum: gu < 0.72 ? Math.round(gu / 0.72 * 9) / 2 : gu < 0.8 ? -1 : 0,
        tear: Math.floor((t % 3) * 2), spin: Math.floor(t * 2) % 4, pulse: Math.floor(t / 0.6) % 2,
        laser: gl < 1.2 ? 1 : 0, halo: Math.floor(t / 1.3) % 2,
        note: mouth === 'Whistle' ? ((t % 2.8) < 2 ? Math.floor((t % 2.8) * 2.5) : -1) : -1,
        glint: eyes === 'Shades' && (t + glanceSeed) % 6 < 0.8 ? Math.floor(((t + glanceSeed) % 6) / 0.1) : -1,
        twinkle: Math.floor(t / 0.5) % 4,
        gstep: Math.floor(t / 2.5),
        load: screen === 'Tape Load' ? Math.min(1, Math.round((t - Math.max(loadAt, Math.floor(t / 30) * 30)) / 2.6 * 120) / 120) : 1,
        border, tt: t,
        flare: LEG === 'Sun Scarab' ? Math.max(0, Math.round((1 - lt / 1.2) * 4) / 4) : 0,
        glow: LEG === 'Lantern' ? (lt < 1.4 ? 30 + Math.round(Math.sin(lt / 1.4 * Math.PI) * 30) : 29 + (Math.floor(t / 0.9) % 2) * 2 + (inp.inside ? 5 : 0)) : 0,
        lc: [24, BL.ecy - BL.eh * 0.3],
        burst: LEG === 'Lantern' && lt > 0.5 && lt < 2.2 ? 1 : 0,
        rayPh: (Math.floor(t * 2) % 16) * Math.PI / 48,
        hov: (LEG === 'Sun Scarab' || LEG === 'Lantern') && inp.inside ? [Math.round(inp.x * T - B), Math.round(inp.y * T - B)] : null,
        gear: (Math.floor(t * (winding ? 10 : 1.5)) % 8) * Math.PI / 16,
        key: Math.floor(t * (winding ? 9 : 1)) % 4,
        shine: t - shineAt < 0.9 ? 1 : 0,
      };
      if (LEG === 'Sun Scarab') st.open = 0;
      const key = [bob, gx, gy, open, st.blink, st.twitch, st.flash, st.flut, pose === 'Waving' ? st.wave : 0, pose === 'Arms Up' ? st.sway : 0, pose === 'Flexing' ? st.flex : 0,
        companion === 'None' ? 0 : [st.cf, st.csp, st.ffa, st.ffb, st.glow, st.ca, st.bbob, st.bblink, st.flap, st.mdx, st.ux, st.uy, st.ul].join(':'),
        mouth === 'Bubblegum' ? st.gum : 0, eyes === 'Tearful' ? st.tear : 0, eyes === 'Spiral' ? st.spin : 0, eyes === 'Hearts' ? st.pulse : 0,
        eyes === 'Laser' ? st.laser : 0, extra === 'Halo' ? st.halo : 0, st.note, st.glint, held === 'Star' ? st.twinkle : 0,
        screen === 'Glitch' ? st.gstep : 0, st.load, border, st.load < 1 && S >= LARGE ? Math.floor(t * 8) : 0,
        st.flare, LEG === 'Sun Scarab' ? st.rayPh + ':' + st.hov : 0, LEG === 'Lantern' ? st.glow + ':' + st.hov + ':' + Math.floor(t * 6) : 0,
        LEG === 'Clockwork' ? st.gear + ':' + st.key : 0, golden ? st.shine + ':' + st.twinkle : 0].join(',');
      if (key === last) return;
      last = key;
      paint(st);
      attribute(st);
    }
    frame(0);
    return frame;
  },
});

})(window.Proto);
