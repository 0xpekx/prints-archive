// Flood Fill: from D:/code/synaesthesia/public/drop03/pieces/204.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Flood Fill: ducks doodled with a mouse in a nineties paint program: jaggy one-dot
// lines, bucket fills, the ellipse tool and the spray can, inside the program's window.
Proto.add({
  num: 204,
  name: 'Flood Fill',
  fam: 'Pixel Portraits III',
  fps: 20,
  seed: 5,
  interactive: 'Tap to bucket-fill, drag to spray, tap a swatch to pick a colour.',
  music: true,
  recipe: 'A duck doodled with a mouse in an old desktop paint program, 64 dots across: jaggy one-dot outlines, the ellipse tool, bucket fills that stop at every line, spray-can speckle, all inside the program\'s window with its palette along the bottom. Pose, feathers, bill, what it carries in it, eyes, headwear, neckwear, a friend, the scene, a corner doodle, how steady the hand was, the window colours, the cursor and the odd Image-menu command (flip, skew, invert, tile, zoom) vary; about 1 in 375 is a legendary, a picture in a style of its own (Transparent: an X-ray film of the duck, its bones glowing; Phoenix: a tarot card, XX, The Phoenix, displayed in flame before a burning sun; or Mandarin: a cloisonne enamel plaque, the drake mandarin in gold wire cells of bright enamel on a turquoise ground), and about 1 in 200 sits by the coveted Golden Egg; each one is drawn again stroke by stroke, then it blinks and the cursor rests.',
  make(c) {
    const S = c.size, g = c.ctx;
    // splitmix32 over a seed folded from the hash: the original traits and the strokes' wobble
    let sm = 0;
    for (let i = 2; i < 66; i += 4) sm = (sm * 31 + parseInt(c.hash.slice(i, i + 4), 16)) >>> 0;
    const R = () => {
      sm = (sm + 0x9e3779b9) >>> 0;
      let z = sm;
      z = Math.imul(z ^ (z >>> 16), 0x85ebca6b);
      z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35);
      return ((z ^ (z >>> 16)) >>> 0) / 4294967296;
    };
    const W8 = o => { const k = Object.keys(o); let s = 0; for (const x of k) s += o[x]; let r = R() * s; for (const x of k) { r -= o[x]; if (r < 0) return x; } return k[0]; };

    // the program's palette
    const P = ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
      '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040']
      .map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
    const BLACK = 0, GREY = 1, WHITE = 14, SILVER = 15, YEL = 17, ORANGE = 27, NAVY = 6, PINK = 26, RED = 16, BROWN = 13, LIME = 18, SKYB = 10, BLUE = 20;

    // ---- the original rolls, in their original order ----
    let feathers = W8({ Yellow: 30, White: 22, Mallard: 18, Brown: 14, Black: 8, Pink: 5, Rainbow: 3 });
    let bill = W8({ Orange: 44, Yellow: 26, Red: 18, Black: 8, Gold: 4 });
    let eyes = W8({ Dot: 30, Googly: 24, Angry: 14, Sleepy: 12, Shades: 12, Star: 8 });
    let hat = W8({ None: 34, 'Top Hat': 14, 'Sailor Cap': 14, Beanie: 14, 'Party Hat': 12, Flower: 8, Crown: 4 });
    let neck = W8({ None: 40, 'Bow Tie': 20, Scarf: 18, Medal: 12, Bell: 10 });
    let scene = W8({ Pond: 30, Sky: 24, Meadow: 20, Night: 14, Bathtub: 8, Lava: 4 });
    let doodle = W8({ Sun: 30, Rainbow: 18, Hearts: 16, Stars: 14, Raincloud: 14, None: 8 });
    const hand = W8({ Steady: 36, Shaky: 34, 'Very Shaky': 18, 'Pixel Perfect': 12 });

    // ---- a second stream from the hash's back half, for everything added later ----
    let q2 = (parseInt(c.hash.slice(34, 42), 16) ^ (parseInt(c.hash.slice(58, 66), 16) >>> 3) ^ 0x2e2ac0ea) >>> 0;
    const R2 = () => {
      q2 ^= q2 << 7; q2 >>>= 0;
      q2 ^= q2 >>> 9;
      q2 = (Math.imul(q2, 0x2c1b3c6d) + 0x297a2d39) >>> 0;
      const v = (q2 ^ (q2 >>> 11)) >>> 0;
      return (v % 16777216) / 16777216;
    };
    for (let i = 0; i < 7; i++) R2();
    const W2 = list => { let tot = 0; for (const e of list) tot += e[1]; let r = R2() * tot; for (const e of list) { r -= e[1]; if (r < 0) return e[0]; } return list[0][0]; };
    let pose = W2([['Sitting', 36], ['Swimming', 20], ['Standing', 19], ['Flapping', 15], ['Bottoms Up', 3]]);
    const facing = W2([['Left', 56], ['Right', 44]]);
    let friend = W2([['None', 42], ['Duckling', 16], ['Frog', 10], ['Fish', 9], ['Bee', 10], ['Snail', 9], ['Computer Mouse', 2]]);
    let inBill = W2([['Nothing', 62], ['Worm', 9], ['Flower', 9], ['Bread', 8], ['Letter', 6], ['Bubblegum', 4], ['Fish', 2]]);
    const cursorKind = W2([['Arrow', 40], ['Pencil', 18], ['Bucket', 16], ['Spray Can', 12], ['Brush', 10], ['Hourglass', 4]]);
    let theme = W2([['Navy', 36], ['Teal', 16], ['Maroon', 13], ['Olive', 10], ['Graphite', 12], ['Plum', 10], ['Hot Dog', 3]]);
    const image = W2([['Plain', 85], ['Skewed', 6], ['Inverted', 5], ['Tiled', 2], ['Zoomed', 2]]);
    // no pose or window over three in ten: a share of the sitting ducks and the navy windows trade for another, on their own
    // little stream (two hash slices), so nothing else moves
    { let q6 = (parseInt(c.hash.slice(6, 14), 16) ^ Math.imul(parseInt(c.hash.slice(46, 54), 16), 0x85ebca6b) ^ 0x3c6ef372) >>> 0 || 0x6a09e667;
      const R6 = () => { q6 ^= q6 << 13; q6 >>>= 0; q6 ^= q6 >>> 17; q6 ^= q6 << 5; q6 >>>= 0; return q6 / 4294967296; };
      R6(); R6();
      const a = R6(), b = R6(), a2 = R6(), b2 = R6();
      if (pose === 'Sitting' && a < 0.25) pose = ['Swimming', 'Standing', 'Flapping'][Math.floor(b * 3)];
      if (theme === 'Navy' && a2 < 0.22) theme = ['Teal', 'Maroon', 'Olive', 'Graphite', 'Plum'][Math.floor(b2 * 5)]; }
    // a share of mints trade an original value for a newer one
    const trade = (p, list) => (R2() < p ? W2(list) : null);
    eyes = trade(0.42, [['Hearts', 16], ['Happy', 20], ['Dizzy', 14], ['Glasses', 18], ['Teary', 14], ['Lashes', 18]]) || eyes;
    hat = trade(0.45, [['Cowboy Hat', 16], ['Chef Hat', 14], ['Propeller Cap', 16], ['Headphones', 16], ['Wizard Hat', 14], ['Viking Helmet', 14], ['Halo', 4]]) || hat;
    neck = trade(0.4, [['Pearls', 16], ['Lei', 16], ['Necktie', 18], ['Bandana', 18], ['Life Ring', 14], ['Camera', 14]]) || neck;
    scene = trade(0.36, [['Snow', 26], ['Sunset', 28], ['Beach', 30], ['Space', 6]]) || scene;
    doodle = trade(0.4, [['Moon', 20], ['Balloons', 20], ['Lightning', 16], ['Spiral', 18], ['Kite', 20], ['UFO', 3]]) || doodle;
    feathers = trade(0.25, [['Blue', 30], ['Green', 28], ['Spotted', 30], ['Tie-Dye', 6]]) || feathers;
    bill = trade(0.25, [['Pink', 40], ['Blue', 34], ['Purple', 26]]) || bill;

    // ---- the legendaries: a Park-Miller stream on two more hash slices, so no other roll moves ----
    let pm = ((parseInt(c.hash.slice(10, 18), 16) ^ parseInt(c.hash.slice(50, 58), 16) ^ 0x6c8e9cf5) >>> 0) % 2147483646 + 1;
    const PM = () => { pm = Number(BigInt(pm) * 48271n % 2147483647n); return (pm - 1) / 2147483646; };
    for (let i = 0; i < 4; i++) PM();
    const lu = PM();
    const LEG = lu < 0.0009 ? 'Transparent' : lu < 0.0018 ? 'Phoenix' : lu < 0.0027 ? 'Mandarin' : '';
    const goldEgg = !LEG && lu < 0.0077;          // the coveted one, about one in two hundred
    if (LEG) { c.trait('Legendary', LEG); if (pose === 'Bottoms Up') pose = 'Sitting'; }
    if (LEG === 'Transparent') feathers = 'Transparent';
    if (LEG === 'Phoenix') { feathers = 'Flame'; bill = 'Gold'; hat = 'Flame Crest'; neck = 'None'; scene = 'Night'; if (inBill !== 'Nothing') inBill = 'Nothing'; }
    if (LEG === 'Mandarin') { feathers = 'Mandarin'; bill = 'Red'; hat = 'Crest'; neck = 'None'; scene = 'Pond'; if (eyes === 'Shades' || eyes === 'Glasses') eyes = 'Dot'; }
    if (goldEgg) { friend = 'None'; inBill = 'Nothing'; if (feathers === 'Yellow') feathers = 'White'; }
    // ---- a fourth stream (two more hash slices, xorshift32) for the body's shape, so no other roll moves ----
    let q3 = (parseInt(c.hash.slice(18, 26), 16) ^ Math.imul(parseInt(c.hash.slice(42, 50), 16), 0x9e3779b1) ^ 0x7f4a7c15) >>> 0 || 0x1234567;
    const R3 = () => { q3 ^= q3 << 13; q3 >>>= 0; q3 ^= q3 >>> 17; q3 ^= q3 << 5; q3 >>>= 0; return q3 / 4294967296; };
    for (let i = 0; i < 5; i++) R3();
    let body = 'Classic';
    { let r = R3() * 100; for (const [v, p] of [['Classic', 28], ['Plump', 20], ['Sleek', 18], ['Duckling', 17], ['Long Neck', 17]]) { r -= p; if (r < 0) { body = v; break; } } }
    if (LEG || pose === 'Bottoms Up') body = 'Classic';
    c.trait('Feathers', feathers); c.trait('Bill', bill); c.trait('Eyes', eyes); c.trait('Headwear', hat);
    c.trait('Neckwear', neck); c.trait('Scene', scene); c.trait('Corner Doodle', doodle); c.trait('Hand', hand);
    c.trait('Pose', pose); c.trait('Facing', facing); c.trait('Friend', friend); c.trait('In Bill', inBill);
    if (goldEgg) c.trait('Nest', 'Golden Egg');
    c.trait('Cursor', cursorKind); c.trait('Window', theme); c.trait('Image', image); c.trait('Body', body);
    const jit = { Steady: 0.45, Shaky: 0.9, 'Very Shaky': 1.5, 'Pixel Perfect': 0 }[hand];

    const N = 64, buf = new Uint8Array(N * N), tmp = new Uint8Array(N * N);
    const CX0 = 2, CY0 = 5, CX1 = 61, CY1 = 55; // the drawing area
    const inCanvas = (x, y) => x >= CX0 && y >= CY0 && x <= CX1 && y <= CY1;
    // every stroke remembers where it was placed (the duck can sit higher or lower)
    let OX = 0, OY = 0, curOX = 0, curOY = 0;
    const dot = (x, y, k) => { x = Math.round(x + curOX); y = Math.round(y + curOY); if (inCanvas(x, y)) buf[y * N + x] = k; };
    const line = (xa, ya, xb, yb, k) => {
      xa = Math.round(xa); ya = Math.round(ya); xb = Math.round(xb); yb = Math.round(yb);
      const dx = Math.abs(xb - xa), dy = -Math.abs(yb - ya), sx = xa < xb ? 1 : -1, sy = ya < yb ? 1 : -1;
      let e = dx + dy, guard = 0;
      while (guard++ < 300) {
        dot(xa, ya, k);
        if (xa === xb && ya === yb) break;
        const e2 = 2 * e;
        if (e2 >= dy) { e += dy; xa += sx; }
        if (e2 <= dx) { e += dx; ya += sy; }
      }
    };
    // the bucket: a four-way flood that stops at any other colour; says how much it filled
    const fill = (x, y, k, raw) => {
      x = Math.round(x + (raw ? 0 : curOX)); y = Math.round(y + (raw ? 0 : curOY));
      if (!inCanvas(x, y)) return 0;
      const from = buf[y * N + x];
      if (from === k) return 0;
      const st = [y * N + x];
      let n = 0;
      while (st.length) {
        const i = st.pop();
        if (buf[i] !== from) continue;
        buf[i] = k; n++;
        const px = i % N, py = (i / N) | 0;
        if (px > CX0) st.push(i - 1);
        if (px < CX1) st.push(i + 1);
        if (py > CY0) st.push(i - N);
        if (py < CY1) st.push(i + N);
      }
      return n;
    };

    // ---- the drawing, as a list of tool operations ----
    const ops = [];
    let J = R;                  // whose wobble the next strokes use
    const op = (fn, ax, ay) => ops.push({ fn, ax: ax + OX, ay: ay + OY, ox: OX, oy: OY });
    // the ellipse tool with a wobbly hand: outline, optional solid fill
    const ellTool = (cx, cy, rx, ry, outline, solid) => {
      const n = Math.max(12, Math.round((rx + ry) * 1.3));
      const pts = [];
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, j = 1 + (J() - 0.5) * jit * 0.08; pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]); }
      if (tracing && outline === OUT) again(pts, outline, true);
      op(() => {
        if (solid !== undefined) for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
          const dx = (x - cx) / rx, dy = (y - cy) / ry; if (dx * dx + dy * dy < 0.97) dot(x, y, solid);
        }
        if (outline !== undefined) for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; line(p[0], p[1], q[0], q[1], outline); }
      }, cx + rx * 0.7, cy + ry * 0.7);
    };
    // the second pass of a very shaky hand: its own little stream, so no other roll moves
    let q5 = (parseInt(c.hash.slice(26, 34), 16) ^ 0x51a3c9e7) >>> 0 || 0x2545f491;
    const R5 = () => { q5 ^= q5 << 13; q5 >>>= 0; q5 ^= q5 >>> 17; q5 ^= q5 << 5; q5 >>>= 0; return q5 / 4294967296; };
    const retrace = [];
    let tracing = false;
    const again = (pts, k, closed) => {
      if (!tracing || hand !== 'Very Shaky') return;
      const dx = R5() < 0.5 ? -1 : 1, dy = R5() < 0.5 ? -1 : 1;
      retrace.push({ pts: pts.map(p => [p[0] + dx * (0.6 + R5() * 0.5), p[1] + dy * (0.6 + R5() * 0.5)]), k, closed, ox: OX, oy: OY });
    };
    const pen = (pts, k, closed) => {
      if (tracing && k === OUT) again(pts, k, closed);
      const pp = pts.map(p => [p[0] + (J() - 0.5) * jit, p[1] + (J() - 0.5) * jit]);
      op(() => { for (let i = 0; i < pp.length - 1; i++) line(pp[i][0], pp[i][1], pp[i + 1][0], pp[i + 1][1], k); if (closed) line(pp[pp.length - 1][0], pp[pp.length - 1][1], pp[0][0], pp[0][1], k); }, pp[pp.length - 1][0], pp[pp.length - 1][1]);
    };
    const bucket = (x, y, k) => op(() => fill(x, y, k), x, y);
    const spray = (cx, cy, r, k, n) => {
      const d = [];
      for (let i = 0; i < n; i++) { const a = J() * 6.283, rr = Math.sqrt(J()) * r; d.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
      op(() => { for (const p of d) dot(p[0], p[1], k); }, cx, cy);
    };
    // a filled box with the rectangle tool
    const box = (x0, y0, x1, y1, k, edge) => op(() => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) dot(x, y, edge !== undefined && (x === x0 || x === x1 || y === y0 || y === y1) ? edge : k); }, x1, y1);
    let TT = 0;                 // the clock, for the few strokes that move
    let sailUp = 0, eggAt = -9, legAt = -9;
    const EGX = 10, EGY = 44;   // where the golden egg sits   // the legendaries' and the golden egg's moments

    // scene
    const SKY = { Pond: 24, Sky: 24, Meadow: 24, Night: NAVY, Bathtub: 19, Lava: 2, Snow: 25, Sunset: 27, Beach: 24, Space: 7 }[scene];
    const wet = scene === 'Pond' || scene === 'Bathtub' || scene === 'Beach';
    op(() => { for (let y = CY0; y <= CY1; y++) for (let x = CX0; x <= CX1; x++) dot(x, y, WHITE); }, 30, 30);
    if (scene === 'Pond' || scene === 'Meadow' || scene === 'Lava') {
      const hz = scene === 'Pond' ? 38 : 42, pts = [];
      for (let x = CX0 - 4; x <= CX1 + 6; x += 6) pts.push([x, hz + Math.sin(x * 0.3) * (scene === 'Pond' ? 0.5 : 2)]);
      pen(pts, BLACK);
      bucket(4, 8, SKY);
      bucket(4, CY1 - 1, scene === 'Pond' ? 10 : scene === 'Meadow' ? 18 : 16);
      if (scene === 'Pond') for (let i = 0; i < 4; i++) { const y = 44 + i * 3, x = 6 + R() * 40; pen([[x, y], [x + 5, y]], WHITE); }
      if (scene === 'Meadow') for (let i = 0; i < 5; i++) { const x = 5 + R() * 52; spray(x, 50 + R() * 3, 1.6, [16, 17, 21, 14][i % 4], 6); }
      if (scene === 'Lava') { spray(12, 50, 4, 17, 20); spray(50, 48, 4, 27, 20); }
    } else if (scene === 'Snow' || scene === 'Sunset' || scene === 'Beach') {
      J = R2;
      const hz = scene === 'Beach' ? 33 : 40, pts = [];
      for (let x = CX0 - 4; x <= CX1 + 6; x += 6) pts.push([x, hz + Math.sin(x * 0.25 + 1) * (scene === 'Snow' ? 2.5 : 0.4)]);
      pen(pts, BLACK);
      bucket(4, 8, SKY);
      bucket(4, CY1 - 1, scene === 'Snow' ? WHITE : scene === 'Sunset' ? NAVY : SKYB);
      if (scene === 'Sunset') {
        op(() => { for (let y = CY0; y < 16; y++) for (let x = CX0; x <= CX1; x++) if (buf[y * N + x] === SKY) dot(x, y, y < 10 ? PINK : RED); }, 30, 12);
        for (let i = 0; i < 5; i++) { const y = 43 + i * 2.6, x = 30 + (R2() - 0.5) * 14; pen([[x - 6 + i, y], [x + 6 - i, y]], i % 2 ? YEL : ORANGE); }
      }
      if (scene === 'Snow') { for (let i = 0; i < 26; i++) { const x = CX0 + 1 + R2() * 58, y = CY0 + 1 + R2() * 34; op(() => dot(x, y, WHITE), x, y); } spray(10, 50, 3, SILVER, 10); }
      if (scene === 'Beach') {
        pen([[CX0 - 2, 44], [20, 42.5], [40, 44.5], [CX1 + 2, 43]], BLACK);
        bucket(4, CY1 - 1, 22);
        for (let i = 0; i < 3; i++) { const x = 8 + i * 9 + R2() * 4; pen([[x, 38], [x + 4, 38]], WHITE); }
        spray(50, 51, 2.5, BROWN, 8);
      }
      J = R;
    } else if (scene === 'Space') {
      J = R2;
      bucket(4, 8, SKY);
      for (let i = 0; i < 30; i++) { const x = CX0 + 1 + R2() * 58, y = CY0 + 1 + R2() * 49, k = R2() < 0.3 ? YEL : WHITE; op(() => dot(x, y, k), x, y); }
      ellTool(9, 47, 5, 5, BLACK, 21); pen([[1, 50], [17, 44]], YEL); spray(8, 46, 2.5, 7, 7);
      J = R;
    } else {
      bucket(4, 8, SKY);
    }
    if (scene === 'Sky') { spray(14, 14, 5, WHITE, 40); spray(20, 12, 4, WHITE, 26); spray(46, 44, 5, WHITE, 36); }
    if (scene === 'Night') { for (let i = 0; i < 12; i++) { const x = CX0 + 2 + R() * 56, y = CY0 + 2 + R() * 28; op(() => { dot(x, y, YEL); }, x, y); } }
    if (scene === 'Bathtub') {
      pen([[CX0 - 3, 44], [CX1 + 3, 44]], BLACK); bucket(30, 50, WHITE);
      for (let i = 0; i < 6; i++) ellTool(6 + i * 10 + R() * 3, 41 + R() * 3, 2.5, 2.5, 25);
    }
    // corner doodle
    const dX = 51, dY = 14;
    if (doodle === 'Sun') { ellTool(dX, dY, 5, 5, BLACK); bucket(dX, dY, YEL); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; pen([[dX + Math.cos(a) * 7, dY + Math.sin(a) * 7], [dX + Math.cos(a) * 10, dY + Math.sin(a) * 10]], ORANGE); } }
    if (doodle === 'Rainbow') { const cols = [16, 27, 17, 18, 20]; cols.forEach((k, i) => { const pts = []; for (let a = 0; a <= 10; a++) { const t = Math.PI + a / 10 * Math.PI; pts.push([dX + Math.cos(t) * (10 - i), dY + 6 + Math.sin(t) * (10 - i)]); } pen(pts, k); }); }
    if (doodle === 'Hearts') for (const [hx, hy] of [[47, 10], [54, 16]]) { pen([[hx, hy + 4], [hx - 3, hy + 1], [hx - 3, hy - 1], [hx - 1, hy - 2], [hx, hy - 1], [hx + 1, hy - 2], [hx + 3, hy - 1], [hx + 3, hy + 1]], 16, true); bucket(hx, hy + 1, 16); }
    if (doodle === 'Stars') for (const [sx, sy, r] of [[50, 11, 4], [56, 19, 2.5]]) { const pts = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; pts.push([sx + Math.cos(a) * r, sy + Math.sin(a) * r]); } pen(pts, YEL, true); }
    if (doodle === 'Raincloud') { spray(dX, dY - 2, 5, SILVER, 40); spray(dX - 4, dY, 3.5, GREY, 18); for (let i = 0; i < 5; i++) { const x = dX - 6 + i * 3; pen([[x, dY + 5], [x - 1, dY + 8]], 20); } }
    J = R2;
    if (doodle === 'Moon') { ellTool(dX, dY, 6, 6, BLACK, YEL); ellTool(dX + 3.5, dY - 2, 5, 5, undefined, SKY); spray(dX - 8, dY + 6, 1.2, WHITE, 3); }
    if (doodle === 'Balloons') for (const [bx, by, k] of [[47, 11, RED], [54, 14, BLUE], [50, 19, YEL]]) { ellTool(bx, by, 3, 3.8, BLACK, k); op(() => dot(bx - 1, by - 2, WHITE), bx, by); pen([[bx, by + 4], [bx + 1, by + 7], [50, 30]], BLACK); }
    if (doodle === 'Lightning') { pen([[52, 6], [46, 16], [51, 16], [45, 27], [56, 13], [51, 13], [56, 6]], BLACK, true); bucket(51, 10, YEL); }
    if (doodle === 'Spiral') { const pts = []; for (let i = 0; i <= 28; i++) { const a = i * 0.48, r = 0.4 + i * 0.27; pts.push([dX + Math.cos(a) * r, dY + Math.sin(a) * r]); } pen(pts, 12); }
    if (doodle === 'Kite') { pen([[51, 6], [57, 13], [51, 22], [45, 13]], BLACK, true); bucket(51, 10, RED); bucket(51, 17, YEL); pen([[45, 13], [57, 13]], BLACK); pen([[51, 22], [48, 27], [52, 31], [47, 36]], BLACK); for (const [x, y] of [[48, 27], [52, 31]]) op(() => { dot(x, y, BLUE); dot(x + 1, y, BLUE); }, x, y); }
    if (doodle === 'UFO') { ellTool(dX, dY, 8, 2.4, BLACK, SILVER); ellTool(dX, dY - 2.5, 3.5, 2.5, BLACK, 24); for (let i = -1; i <= 1; i++) op(() => dot(dX + i * 4, dY, [16, 18, 17][i + 1]), dX, dY); op(() => { for (let y = dY + 3; y < dY + 13; y++) for (let x = dX - 2 - (y - dY) * 0.3; x <= dX + 2 + (y - dY) * 0.3; x++) if ((x + y) % 2 === 0) dot(x, y, 22); }, dX, dY + 8); }
    J = R;

    // the duck's colours
    const FE = {
      Yellow: [YEL, 22, 27], White: [WHITE, SILVER, 15], Mallard: [13, 8, 1], Brown: [13, 8, 2], Black: [0, 1, 9], Pink: [21, 26, 7], Rainbow: [16, 18, 20],
      Blue: [SKYB, 25, 11], Green: [LIME, 23, 4], Spotted: [WHITE, SILVER, 1], 'Tie-Dye': [21, 19, 17],
      Transparent: [8, 9, 1], Flame: [16, 17, 27], Mandarin: [22, 13, 2],
    }[feathers];
    const headK = feathers === 'Mallard' ? 4 : feathers === 'Rainbow' ? 21 : feathers === 'Flame' ? ORANGE : feathers === 'Mandarin' ? 4 : FE[0];
    const bodyK = feathers === 'Mallard' ? 15 : FE[0];
    const OUT = feathers === 'Black' ? GREY : BLACK;
    const BK = { Orange: ORANGE, Yellow: YEL, Red: 16, Black: 0, Gold: 3, Pink: PINK, Blue: SKYB, Purple: 12 }[bill];
    const HO = { Sitting: [0, 0], Swimming: [0, 4], Standing: [0, -4], Flapping: [0, 0], 'Bottoms Up': [0, 0] }[pose];
    // the body's shape: body and wing ellipses, the wing line, the tail and where its fill goes,
    // and how far the body and the head sit from where they always were (the long neck lifts the head, the others drop it to meet the body)
    const BD = {
      Classic: { b: [35, 45, 18, 11], w: [41, 46, 9, 5], wl: [[36, 46], [44, 48]], tail: [[49, 39], [60, 29], [55, 45]], tb: [55, 38], bd: 0, hd: 0 },
      Plump: { b: [34, 44.5, 21.5, 13], w: [42, 45.5, 10.5, 6], wl: [[35, 46], [46, 49]], tail: [[52, 37], [61, 27], [58, 44]], tb: [57, 36], bd: 0, hd: 1 },
      Sleek: { b: [37, 47, 20, 7.5], w: [43, 47, 8.5, 3.4], wl: [[38, 47], [47, 48.5]], tail: [[52, 43], [61, 34], [57, 48]], tb: [56, 42], bd: 0, hd: 3 },
      Duckling: { b: [36, 48, 12.5, 8], w: [40, 48.5, 6, 3.5], wl: [[37, 48.5], [42, 50]], tail: [[45, 43], [53, 36], [50, 48]], tb: [49, 42], bd: 0, hd: 3 },
      'Long Neck': { b: [36, 45, 18, 10], w: [42, 46, 8.5, 4.6], wl: [[37, 46], [45, 48]], tail: [[50, 39], [60, 29], [56, 45]], tb: [55, 38], bd: pose === 'Standing' ? 0 : 3, hd: -5 },
    }[body];
    const HDY = HO[1] + BD.hd;           // where the head (and all it wears) sits

    // the friend, down in the lower corner under the bill
    J = R2;
    if (friend === 'Duckling') { ellTool(11, 50, 4.2, 3.2, BLACK, YEL); ellTool(7.5, 45.5, 2.8, 2.6, BLACK, YEL); ellTool(4, 46.5, 1.8, 1, BLACK, ORANGE); op(() => dot(7, 44.6, BLACK), 7, 45); pen([[10, 48], [13, 49]], BLACK); }
    if (friend === 'Frog') { ellTool(10, 51, 5.5, 3.2, BLACK, LIME); ellTool(7, 47.5, 1.8, 1.8, BLACK, WHITE); ellTool(13, 47.5, 1.8, 1.8, BLACK, WHITE); op(() => { dot(7, 47.5, BLACK); dot(13, 47.5, BLACK); }, 10, 47); pen([[7, 52], [10, 53], [13, 52]], BLACK); }
    if (friend === 'Fish') { ellTool(10, 49, 4.5, 2.4, BLACK, ORANGE); pen([[14, 49], [18, 46], [18, 52]], BLACK, true); bucket(16.5, 49, ORANGE); op(() => dot(8, 48.4, BLACK), 8, 48); pen([[4, 44], [6, 42]], SKYB); pen([[3, 46], [5, 46]], SKYB); }
    if (friend === 'Bee') { ellTool(9, 46, 3, 2, BLACK, YEL); pen([[9, 44], [9, 48]], BLACK); pen([[11, 44.5], [11, 47.5]], BLACK); ellTool(8, 43, 1.8, 1.3, BLACK, WHITE); ellTool(11, 43, 1.8, 1.3, BLACK, WHITE); op(() => { for (let i = 0; i < 14; i++) if (i % 2 === 0) { const a = i * 0.45; dot(13 + i * 0.9, 47 + Math.sin(a) * 3, BLACK); } }, 20, 47); }
    if (friend === 'Snail') { ellTool(10, 53.5, 7, 1.5, BLACK, 22); ellTool(11, 49.5, 4, 4, BLACK, ORANGE); const pts = []; for (let i = 0; i <= 14; i++) { const a = i * 0.6, r = 0.3 + i * 0.2; pts.push([11 + Math.cos(a) * r, 49.5 + Math.sin(a) * r]); } pen(pts, BLACK); pen([[4, 52], [3, 48]], BLACK); pen([[5, 52], [5.5, 48]], BLACK); }
    if (friend === 'Computer Mouse') { ellTool(10, 48, 4, 5.5, BLACK, SILVER); pen([[6, 46], [14, 46]], BLACK); pen([[10, 42.5], [10, 46]], BLACK); pen([[10, 42.5], [8, 39], [4, 39], [2, 36]], GREY); }
    J = R;
    const opsBeforeDuck = ops.length;   // the scene, the doodle and the friend (the Transparent legendary shows them through its glass)

    // the duck
    if (pose !== 'Bottoms Up') {
      OX = 0; OY = HO[1] + BD.bd;
      tracing = true;
      if (LEG === 'Phoenix') {
        // a glow of embers round it, and a tail of flame, drawn with the pen and the bucket, licked with the spray can
        spray(34, 34, 27, 2, 150);
        pen([[44, 46], [48, 31], [52, 37], [55, 21], [58, 32], [61, 25], [61, 46], [53, 51]], OUT, true);
        bucket(56, 41, YEL); spray(55, 41, 4, ORANGE, 34); spray(57, 32, 2.5, RED, 12); spray(52, 47, 2, RED, 8);
      } else {
        pen(BD.tail, OUT, true);
        bucket(BD.tb[0], BD.tb[1], bodyK);
      }
      ellTool(BD.b[0], BD.b[1], BD.b[2], BD.b[3], OUT, bodyK);
      ellTool(BD.w[0], BD.w[1], BD.w[2], BD.w[3], OUT, FE[1]);
      pen(BD.wl, OUT);
      J = R2;
      if (pose === 'Standing') {
        op(() => { line(30, 55, 30, 59, ORANGE); line(31, 55, 31, 59, ORANGE); line(40, 55, 41, 59, ORANGE); line(41, 55, 42, 59, ORANGE); }, 41, 58);
        op(() => { for (let k = 0; k < 3; k++) { line(25 + k, 59 - k * 0.4, 33, 59, ORANGE); line(36 + k, 59 - k * 0.4, 44, 59, ORANGE); } line(25, 59, 33, 59, BLACK); line(36, 59, 44, 59, BLACK); }, 44, 59);
      }
      if (pose === 'Flapping') {
        pen([[38, 41], [42, 26], [47, 22], [49, 27], [53, 24], [53, 30], [57, 29], [53, 38], [46, 44]], OUT, true);
        bucket(47, 34, FE[1]);
        pen([[44, 32], [50, 29]], OUT); pen([[45, 37], [52, 34]], OUT);
      }
      if (feathers === 'Spotted') for (let i = 0; i < 7; i++) spray(24 + R2() * 26, 40 + R2() * 12, 1.4, BLACK, 7);
      if (feathers === 'Tie-Dye') { spray(27, 44, 6, 17, 40); spray(40, 50, 6, 19, 40); spray(47, 40, 5, 18, 30); }
      if (pose === 'Swimming') {
        const wy = 45;
        op(() => { for (let y = wy; y <= CY1 - curOY; y++) for (let x = 12; x <= 62; x++) { const e = ((x - 36) / 27) ** 2 + ((y - wy) / 10) ** 2; if (e < 1 || wet) dot(x, y, y === wy ? WHITE : e > 0.86 && !wet ? BLACK : SKYB); } }, 50, 52);
        for (let i = 0; i < 3; i++) { const x = 16 + i * 14 + R2() * 4; pen([[x, wy + 2 + i % 2 * 2], [x + 6, wy + 2 + i % 2 * 2]], WHITE); }
      }
      J = R;
      if (LEG === 'Phoenix') {
        // a tail of flame, drawn with the pen and the bucket, licked with the spray can
        pen([[35, 45], [38, 33], [42, 39], [45, 29], [48, 37], [53, 31], [51, 46]], OUT, true); bucket(45, 42, ORANGE); spray(45, 40, 3, YEL, 22); spray(46, 33, 1.5, RED, 5);
        spray(28, 50, 6, ORANGE, 30); spray(40, 52, 5, YEL, 22);
      }
      if (LEG === 'Mandarin') {
        // the sails: two orange fans standing up off the back, and the striped purple chest
        op(() => { const h = sailUp ? 4 : 0; for (const [bx, w] of [[44, 4], [50, 3.5]]) { for (let y = 26 - h; y <= 40; y++) { const half = (y - 26 + h) / (14 + h) * w; for (let x = Math.round(bx - half); x <= bx + half; x++) dot(x, y, (x + y) % 5 === 0 ? 13 : ORANGE); } line(bx, 26 - h, bx - w, 40, BLACK); line(bx, 26 - h, bx + w, 40, BLACK); } }, 50, 30);
        ellTool(25, 43, 7.5, 8, OUT, 7);
        pen([[22, 37], [21, 49]], WHITE); pen([[23, 37], [22, 49]], BLACK); pen([[28, 37], [27, 49]], WHITE); pen([[29, 37], [28, 49]], BLACK);
        spray(42, 48, 4, 13, 18);
      }
      if (LEG === 'Transparent') { spray(44, 52, 4, 15, 10); }
      // the neck between them: a long one lifting the head, or a short stub under a duckling's big head
      if (body === 'Long Neck') { J = R3; ellTool(30.5, 33.5, 4.6, 8.5, OUT, headK); J = R; }
      if (body === 'Duckling' || body === 'Sleek') { J = R3; OY = HDY; ellTool(30.5, 36.5, 5.5, 3.5, OUT, headK); J = R; }
      OY = HDY;
      // head and bill
      ellTool(28, 25, 10.5, 10, OUT, headK);
      if (feathers === 'Mallard') pen([[21, 34], [28, 36], [35, 34]], WHITE);
      ellTool(15, 29, 7, 3.2, OUT, BK);
      pen([[9, 29], [19, 29]], OUT);
      tracing = false;
      // a little dab of blush (the spray can's draws are still taken, so every later stroke lands where it did)
      for (let i = 0; i < 14; i++) J();
      op(() => { dot(31, 30, PINK); dot(32, 30, PINK); }, 32, 30);
      if (LEG === 'Phoenix') {
        // a crest of flame and embers that rise for ever
        pen([[20, 18], [17, 8], [22, 12], [23, 2], [27, 10], [31, 1], [33, 10], [39, 5], [37, 18]], OUT, true);
        bucket(24, 14, YEL); bucket(30, 13, YEL); bucket(35, 15, YEL); spray(28, 14, 3, ORANGE, 14); spray(25, 8, 1.5, RED, 5); spray(32, 8, 1.5, RED, 5);
        op(() => { for (let k = 0; k < 14; k++) { const ph = (TT * 0.35 + k * 0.137) % 1, x = 20 + (k * 7.3) % 40 + Math.sin(TT * 2 + k) * 2, y = 52 - ph * 46; dot(x, y, ph < 0.3 ? YEL : ph < 0.65 ? ORANGE : RED); } }, 40, 20);
      }
      if (LEG === 'Mandarin') {
        // the crest swept back, the white crescent over the eye, the orange whiskers
        pen([[19, 21], [24, 14], [32, 13], [40, 16], [47, 23], [41, 24], [36, 20], [30, 18], [24, 19]], OUT, true);
        bucket(43, 21, 4); bucket(36, 17, 4); spray(38, 18, 3, 7, 14); spray(27, 15, 2.5, 2, 8);
        pen([[23, 20], [30, 19], [37, 22], [41, 26], [35, 25], [29, 23], [24, 23]], BLACK, true); bucket(32, 22, WHITE);
        pen([[19, 28], [28, 29], [35, 32], [37, 36], [27, 36], [20, 33]], OUT, true); bucket(28, 32, ORANGE);
        for (let i = 0; i < 4; i++) pen([[23 + i * 3, 30], [26 + i * 3, 35]], 22);
      }
      J = R2;
      if (feathers === 'Tie-Dye') spray(30, 20, 5, 19, 22);
      if (feathers === 'Spotted') { spray(31, 20, 1.3, BLACK, 6); spray(34, 27, 1.2, BLACK, 5); }
      // in the bill
      if (inBill === 'Worm') { pen([[9, 31], [7, 34], [10, 37], [8, 40], [10, 42]], PINK); pen([[10, 31], [8, 34], [11, 37], [9, 40], [11, 42]], PINK); }
      if (inBill === 'Flower') { pen([[10, 30], [5, 35]], 4); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; ellTool(4 + Math.cos(a) * 2.2, 37 + Math.sin(a) * 2.2, 1.4, 1.4, BLACK, WHITE); } ellTool(4, 37, 1.2, 1.2, undefined, YEL); }
      if (inBill === 'Bread') { ellTool(7, 31.5, 3.6, 2.4, BROWN, 22); op(() => { dot(6, 31, BROWN); dot(8, 32, BROWN); }, 7, 31); }
      if (inBill === 'Letter') { box(3, 30, 10, 35, WHITE, BLACK); pen([[3, 30], [6.5, 33], [10, 30]], BLACK); op(() => dot(9, 34, RED), 9, 34); }
      if (inBill === 'Bubblegum') ellTool(5, 28, 4.2, 4, 21, PINK);
      if (inBill === 'Fish') { ellTool(7, 31.5, 3.5, 1.8, BLACK, BLUE); pen([[3.5, 31.5], [1.5, 29.5], [1.5, 33.5]], BLACK, true); op(() => dot(9, 31, WHITE), 9, 31); }
      J = R;
      // eyes
      const ex = 25, ey = 22;
      if (eyes === 'Dot') { ellTool(ex, ey, 1.6, 1.6, BLACK, BLACK); op(() => dot(ex - 1, ey - 1, WHITE), ex, ey); }
      if (eyes === 'Googly') { ellTool(ex, ey, 3.4, 3.4, BLACK, WHITE); ellTool(ex - 1, ey + 1, 1.3, 1.3, BLACK, BLACK); }
      if (eyes === 'Angry') { ellTool(ex, ey, 1.6, 1.6, BLACK, BLACK); pen([[ex - 4, ey - 4], [ex + 3, ey - 2]], OUT); }
      if (eyes === 'Sleepy') pen([[ex - 3, ey], [ex - 1, ey + 1], [ex + 1, ey + 1], [ex + 3, ey]], BLACK);
      if (eyes === 'Shades') { op(() => { for (let y = ey - 2; y <= ey + 1; y++) for (let x = ex - 5; x <= ex + 7; x++) dot(x, y, BLACK); dot(ex - 3, ey - 1, WHITE); dot(ex + 4, ey - 1, WHITE); }, ex, ey); }
      if (eyes === 'Star') { const pts = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; pts.push([ex + Math.cos(a) * 3.2, ey + Math.sin(a) * 3.2]); } pen(pts, 16, true); op(() => dot(ex, ey, 16), ex, ey); }
      J = R2;
      if (eyes === 'Hearts') { pen([[ex, ey + 3], [ex - 3, ey], [ex - 3, ey - 2], [ex - 1, ey - 3], [ex, ey - 2], [ex + 1, ey - 3], [ex + 3, ey - 2], [ex + 3, ey]], RED, true); bucket(ex, ey, RED); }
      if (eyes === 'Happy') { pen([[ex - 3, ey + 1], [ex - 1, ey - 1], [ex + 1, ey - 1], [ex + 3, ey + 1]], BLACK); pen([[ex - 3, ey + 2], [ex - 1, ey], [ex + 1, ey], [ex + 3, ey + 2]], BLACK); }
      if (eyes === 'Dizzy') { const pts = []; for (let i = 0; i <= 16; i++) { const a = i * 0.75, r = 0.3 + i * 0.2; pts.push([ex + Math.cos(a) * r, ey + Math.sin(a) * r]); } pen(pts, BLACK); }
      if (eyes === 'Glasses') { ellTool(ex, ey, 3.8, 3.6, BLACK, 24); ellTool(ex - 0.5, ey + 0.5, 1.2, 1.2, BLACK, BLACK); pen([[ex + 4, ey - 1], [ex + 10, ey - 2]], BLACK); op(() => dot(ex - 2, ey - 2, WHITE), ex, ey); }
      if (eyes === 'Teary') { ellTool(ex, ey, 1.8, 1.8, BLACK, BLACK); op(() => dot(ex - 1, ey - 1, WHITE), ex, ey); ellTool(ex - 1, ey + 5, 1.2, 1.8, BLUE, 19); pen([[ex - 3, ey - 4], [ex + 2, ey - 3]], OUT); }
      if (eyes === 'Lashes') { ellTool(ex, ey, 2, 2, BLACK, BLACK); op(() => dot(ex - 1, ey - 1, WHITE), ex, ey); pen([[ex - 2, ey - 2], [ex - 4, ey - 4]], BLACK); pen([[ex, ey - 2.5], [ex - 0.5, ey - 5]], BLACK); pen([[ex + 2, ey - 2], [ex + 3, ey - 4.5]], BLACK); }
      J = R;
      // headwear
      if (hat === 'Top Hat') { op(() => { for (let y = 5; y <= 13; y++) for (let x = 23; x <= 33; x++) dot(x, y, BLACK); for (let x = 20; x <= 36; x++) { dot(x, 14, BLACK); dot(x, 15, BLACK); } for (let x = 23; x <= 33; x++) dot(x, 12, 16); }, 33, 10); }
      if (hat === 'Sailor Cap') { ellTool(29, 15, 7, 3, BLACK, WHITE); pen([[22, 16], [36, 16]], NAVY); pen([[22, 17], [36, 17]], NAVY); }
      if (hat === 'Beanie') { ellTool(28, 16, 9, 5, OUT, 16); op(() => { for (let x = 19; x <= 37; x++) { dot(x, 18, WHITE); dot(x, 19, WHITE); } }, 37, 18); ellTool(28, 9, 2.2, 2.2, OUT, WHITE); }
      if (hat === 'Party Hat') { pen([[23, 16], [30, 2], [34, 15]], OUT, true); bucket(29, 12, 21); pen([[26, 11], [32, 9]], YEL); spray(30, 2, 1.6, YEL, 8); }
      if (hat === 'Flower') { for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; ellTool(34 + Math.cos(a) * 2.6, 15 + Math.sin(a) * 2.6, 1.7, 1.7, OUT, WHITE); } ellTool(34, 15, 1.4, 1.4, OUT, YEL); }
      if (hat === 'Crown') { pen([[21, 16], [21, 8], [25, 12], [28, 6], [31, 12], [35, 8], [35, 16]], OUT, true); bucket(28, 14, YEL); op(() => { dot(28, 12, 16); dot(24, 14, 10); dot(32, 14, 18); }, 28, 12); }
      J = R2;
      if (hat === 'Cowboy Hat') { pen([[21, 15], [22, 7], [26, 9], [28, 7], [30, 9], [34, 7], [35, 15]], BLACK, true); bucket(28, 12, BROWN); ellTool(28, 16, 13, 2.2, BLACK, BROWN); pen([[22, 13], [34, 13]], 22); }
      if (hat === 'Chef Hat') { ellTool(23.5, 9, 4, 3.5, BLACK, WHITE); ellTool(32.5, 9, 4, 3.5, BLACK, WHITE); ellTool(28, 7.5, 4.5, 3.5, BLACK, WHITE); box(22, 11, 34, 16, WHITE, BLACK); }
      if (hat === 'Propeller Cap') {
        ellTool(28, 16, 8.5, 5, BLACK, RED); pen([[28, 11], [28, 21]], BLACK); bucket(31, 15, BLUE); pen([[28, 11], [28, 7]], BLACK);
        op(() => { const a = Math.cos(TT * 9), L = 6 * Math.abs(a) + 1; line(28 - L, 6, 27, 6, YEL); line(29, 6, 28 + L, 6, a > 0 ? 18 : YEL); dot(28, 6, BLACK); }, 28, 6);
      }
      if (hat === 'Headphones') { pen([[19, 24], [19, 15], [23, 11], [33, 11], [37, 15], [37, 24]], BLACK); pen([[20, 24], [20, 15], [24, 12], [32, 12], [36, 15], [36, 24]], BLACK); ellTool(19.5, 25, 2.4, 3.6, BLACK, RED); ellTool(37, 24, 2.4, 3.6, BLACK, RED); }
      if (hat === 'Wizard Hat') { pen([[19, 16], [33, 3], [37, 16]], BLACK, true); bucket(30, 13, 12); ellTool(28, 16, 11, 2, BLACK, 12); op(() => { dot(30, 9, YEL); dot(27, 13, YEL); dot(33, 12, YEL); dot(31, 6, WHITE); }, 30, 9); }
      if (hat === 'Viking Helmet') { ellTool(28, 16, 9, 5.5, BLACK, SILVER); pen([[19, 17], [37, 17]], BLACK); op(() => { for (let x = 20; x <= 36; x += 3) dot(x, 18, GREY); }, 36, 18); pen([[20, 13], [14, 4], [17, 14]], BLACK, true); bucket(17, 11, WHITE); pen([[36, 13], [42, 4], [39, 14]], BLACK, true); bucket(39, 11, WHITE); }
      if (hat === 'Halo') { ellTool(28, 9, 8, 2, YEL); ellTool(28, 9, 7, 1.3, 22); }
      J = R;
      // neckwear
      if (neck === 'Bow Tie') { pen([[27, 35], [22, 32], [22, 38]], OUT, true); pen([[29, 35], [34, 32], [34, 38]], OUT, true); bucket(24, 35, 16); bucket(32, 35, 16); }
      if (neck === 'Scarf') { pen([[19, 32], [27, 36], [37, 32], [37, 35], [27, 39], [19, 35]], OUT, true); bucket(28, 37, 20); pen([[33, 36], [35, 44], [38, 43], [36, 35]], OUT); bucket(36, 40, 20); }
      if (neck === 'Medal') { pen([[24, 33], [28, 39], [32, 33]], 16); ellTool(28, 41, 2.6, 2.6, OUT, YEL); }
      if (neck === 'Bell') { pen([[21, 33], [28, 36], [35, 33]], 16); ellTool(28, 39, 2.6, 2.4, OUT, YEL); op(() => dot(28, 41, BLACK), 28, 41); }
      J = R2;
      if (neck === 'Pearls') for (let i = 0; i < 6; i++) { const a = Math.PI * (0.15 + i * 0.14); ellTool(28 + Math.cos(a) * 8, 31 + Math.sin(a) * 5, 1.3, 1.3, GREY, WHITE); }
      if (neck === 'Lei') for (let i = 0; i < 7; i++) { const a = Math.PI * (0.1 + i * 0.13); ellTool(28 + Math.cos(a) * 9, 31 + Math.sin(a) * 5.5, 1.7, 1.7, BLACK, [21, YEL, RED, WHITE][i % 4]); }
      if (neck === 'Necktie') { ellTool(28, 35.5, 1.8, 1.5, BLACK, RED); pen([[27, 37], [25, 44], [28, 47], [31, 44], [29, 37]], BLACK, true); bucket(28, 42, RED); pen([[26, 41], [30, 39]], YEL); }
      if (neck === 'Bandana') { pen([[19, 32], [37, 32], [28, 41]], BLACK, true); bucket(28, 35, BLUE); spray(28, 35, 4, WHITE, 8); }
      if (neck === 'Life Ring') { ellTool(28, 37, 10, 4, BLACK, RED); op(() => { for (const a of [0.5, 2.1, 3.7, 5.3]) for (let k = -1; k <= 1; k++) dot(28 + Math.cos(a + k * 0.12) * 8.5, 37 + Math.sin(a + k * 0.12) * 3.2, WHITE); }, 36, 38); ellTool(28, 37, 6, 1.6, BLACK, bodyK); }
      if (neck === 'Camera') { pen([[21, 32], [28, 37], [35, 32]], BLACK); box(23, 37, 33, 43, BLACK); ellTool(28, 40, 2.2, 2.2, GREY, SILVER); op(() => { dot(32, 38, WHITE); dot(27, 39, WHITE); }, 32, 38); }
      J = R;
    } else {
      // bottoms up: tail and feet out of the water, head down after weed
      J = R2;
      OX = 0; OY = 0;
      ellTool(33, 45, 15, 10, OUT, bodyK);
      pen([[29, 37], [32, 29], [35, 27], [37, 31], [37, 37]], OUT, true); bucket(34, 33, bodyK);
      pen([[35, 27], [37, 24], [40, 25]], OUT);
      pen([[27, 38], [24, 31]], ORANGE); pen([[28, 38], [25, 31]], ORANGE);
      pen([[40, 38], [43, 31]], ORANGE); pen([[41, 38], [44, 31]], ORANGE);
      pen([[20, 31], [24, 25], [28, 31]], BLACK, true); bucket(24, 29, ORANGE);
      pen([[40, 31], [44, 25], [48, 31]], BLACK, true); bucket(44, 29, ORANGE);
      const wy = 46;
      op(() => { for (let y = wy; y <= CY1; y++) for (let x = 4; x <= 62; x++) { const e = ((x - 33) / 29) ** 2 + ((y - wy) / 10) ** 2; if (e < 1 || wet) dot(x, y, y === wy ? WHITE : e > 0.88 && !wet ? BLACK : SKYB); } }, 50, 50);
      ellTool(33, wy, 20, 2.5, WHITE); ellTool(33, wy + 1, 25, 4, 24);
      spray(15, 43, 2, WHITE, 8); spray(52, 43, 2, WHITE, 8);
      J = R;
    }
    OX = 0; OY = 0;
    // the very shaky hand's second go over the duck's outlines
    for (const rt of retrace) ops.push({ fn: () => { const p = rt.pts; for (let i = 0; i < p.length - 1; i++) line(p[i][0], p[i][1], p[i + 1][0], p[i + 1][1], rt.k); if (rt.closed) line(p[p.length - 1][0], p[p.length - 1][1], p[0][0], p[0][1], rt.k); }, ax: rt.pts[0][0] + rt.ox, ay: rt.pts[0][1] + rt.oy, ox: rt.ox, oy: rt.oy });
    if (goldEgg) {
      // the coveted golden egg, twice the size, beside the duck in a scribbled nest: gold with a shine, a star glint
      // that blinks like the program's own sparkle; it wobbles when tapped
      J = R2;
      spray(EGX, 53, 6, BROWN, 40); pen([[EGX - 9, 50], [EGX - 4, 54], [EGX + 4, 54.5], [EGX + 9, 50]], BROWN); pen([[EGX - 8, 53], [EGX, 55], [EGX + 8, 53]], 13);
      J = R;
      op(() => {
        const w = TT - eggAt < 0.8 ? Math.round(Math.sin((TT - eggAt) * 30) * (1 - (TT - eggAt) / 0.8) * 2) : 0;
        for (let y = -11; y <= 9; y++) for (let x = -8; x <= 8; x++) {
          const ry = y < 0 ? 10 : 8.2, e = (x / 6.9) ** 2 + (y / ry) ** 2, X = EGX + x + Math.round(-y * w * 0.12), Y = EGY + y;
          if (e < 1) {
            const lit = (x + 2.5) ** 2 / 9 + (y + 4.5) ** 2 / 16;
            dot(X, Y, lit < 0.35 ? WHITE : lit < 1 ? 22 : x + y * 0.6 > 3.2 ? (x + y + 40) % 2 ? 3 : 8 : YEL);
          } else if (e < 1.28) dot(X, Y, BLACK);
        }
        // the glint: a four-pointed star at the shoulder of the egg, on and off
        const on = Math.floor(TT * 2.2) % 3 !== 2 || TT - eggAt < 1, big = Math.floor(TT * 2.2) % 3 === 1 || TT - eggAt < 1;
        if (on) {
          const gx = EGX + 6, gy = EGY - 9;
          dot(gx, gy, WHITE);
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { dot(gx + dx, gy + dy, WHITE); if (big) dot(gx + dx * 2, gy + dy * 2, YEL); }
          if (big) for (const [dx, dy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) dot(gx + dx, gy + dy, 22);
        }
      }, EGX, EGY);
    }

    const nOps = ops.length;
    const blinkAt = R() * 4;
    const sprayRand = (() => { let s = sm ^ 0x5bd1e995; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; }; })();
    const user = []; // the viewer's own fills and sprays
    let colourAt = 0, lastSpray = 0, picked = -1;
    const userCols = [16, 17, 18, 19, 20, 21, 27, 10, 22, 26, 14, 0];
    const curColour = () => (picked >= 0 ? picked : userCols[colourAt % userCols.length]);

    // ---- window chrome ----
    const TH = { Navy: [NAVY, 11, SILVER], Teal: [5, 9, SILVER], Maroon: [2, BROWN, SILVER], Olive: [3, 8, SILVER], Graphite: [1, 0, SILVER], Plum: [7, 12, SILVER], 'Hot Dog': [RED, 2, YEL] }[theme];
    function chrome(cur) {
      const face = TH[2];
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inCanvas(x, y)) buf[y * N + x] = face;
      for (let x = 0; x < N; x++) for (let y = 0; y < 4; y++) buf[y * N + x] = x < 44 ? TH[0] : TH[1];
      // the program's little palette icon
      buf[1 * N + 1] = RED; buf[1 * N + 2] = YEL; buf[2 * N + 1] = BLUE; buf[2 * N + 2] = WHITE;
      for (const bx of [50, 54, 58]) for (let y = 1; y <= 2; y++) for (let x = bx; x <= bx + 2; x++) buf[y * N + x] = face;
      buf[1 * N + 59] = BLACK; buf[2 * N + 58] = BLACK; buf[2 * N + 51] = BLACK; buf[2 * N + 52] = BLACK;
      for (let x = 1; x <= 62; x++) { buf[4 * N + x] = GREY; buf[56 * N + x] = WHITE; }
      for (let y = 4; y <= 56; y++) { buf[y * N + 1] = GREY; buf[y * N + 62] = WHITE; }
      // current colour box and swatches
      for (let y = 58; y <= 62; y++) for (let x = 2; x <= 6; x++) buf[y * N + x] = (y === 58 || y === 62 || x === 2 || x === 6) ? GREY : cur;
      for (let i = 0; i < 28; i++) {
        const sx = 9 + (i % 14) * 3, sy = i < 14 ? 58 : 61;
        for (let y = sy; y < sy + 2; y++) for (let x = sx; x < sx + 2; x++) buf[y * N + x] = i;
      }
    }
    // the cursors: X black, o white; then the hot spot
    const CUR = {
      Arrow: [['X', 'XX', 'XoX', 'XooX', 'XoooX', 'XooooX', 'XoooooX', 'XooooXXX', 'XoXoX', 'XX XoX', 'X  XoX', '    XX'], 0, 0],
      Pencil: [['        XX', '       XooX', '      XoXX', '     XooX', '    XooX', '   XooX', '  XooX', ' XXoX', ' XXX', 'XX'], 0, 9],
      Bucket: [['   XXX', '  X   X', ' XXXXXXX', 'XoooooooX', 'XooooooX', ' XoooooX', ' XooooX', '  XXXX', '        X', '        X'], 8, 9],
      'Spray Can': [[' X X', 'X X  XX', ' X X XX', '    XXXX', '    XooX', '    XooX', '    XooX', '    XooX', '    XXXX'], 0, 1],
      Brush: [['      XX', '     XooX', '    XooX', '   XooX', '  XXXX', ' XoX', 'XoX', 'XX'], 0, 7],
      Hourglass: [['XXXXXXX', 'XXXXXXX', ' XXXXX', '  XoX', ' XoooX', 'XoooooX', 'XXXXXXX'], 3, 3],
    };
    const HOURB = ['XXXXXXX', 'XoooooX', ' XoooX', '  XoX', ' XXXXX', 'XXXXXXX', 'XXXXXXX'];
    function cursor(x, y, t) {
      const [rows0, hx, hy] = CUR[cursorKind];
      const rows = cursorKind === 'Hourglass' && Math.floor(t / 0.7) % 2 ? HOURB : rows0;
      x = Math.round(x) - hx; y = Math.round(y) - hy;
      for (let r = 0; r < rows.length; r++) for (let q = 0, L = rows[r].length; q < L; q++) {
        const ch = rows[r][q], px = x + q, py = y + r;
        if (px < 0 || py < 0 || px >= N || py >= N || ch === ' ') continue;
        buf[py * N + px] = ch === 'X' ? BLACK : WHITE;
      }
    }

    // ---- the Image menu: flip, skew, tile, zoom (invert happens in the colours) ----
    const W = CX1 - CX0 + 1;
    function flipX() {
      for (let y = CY0; y <= CY1; y++) for (let i = 0; i < W / 2; i++) { const a = y * N + CX0 + i, b = y * N + CX1 - i, k = buf[a]; buf[a] = buf[b]; buf[b] = k; }
    }
    function imageMenu() {
      if (image === 'Plain' || image === 'Inverted') return;
      tmp.set(buf);
      const zx = facing === 'Right' ? CX0 + CX1 - 26 : 26, zy = 26 + HDY;
      for (let y = CY0; y <= CY1; y++) for (let x = CX0; x <= CX1; x++) {
        let sx = x, sy = y;
        // skewed about the middle row; the edge colour of each row runs on into the gap, so there is no blank wedge
        if (image === 'Skewed') sx = Math.min(CX1, Math.max(CX0, x + Math.round((y - (CY0 + CY1) / 2) * 0.36)));
        else if (image === 'Tiled') {
          // four whole pictures at half size; a one-dot line anywhere in a 2 x 2 block survives the shrink
          const lx = (x - CX0) % 30, ly = y - CY0 < 26 ? y - CY0 : y - CY0 - 26;
          const bx = CX0 + lx * 2, by = Math.min(CY1 - 1, CY0 + ly * 2), j = by * N + bx;
          const a = tmp[j], b = tmp[j + 1], d = tmp[j + N], e = tmp[j + N + 1];
          buf[y * N + x] = a === OUT || b === OUT || d === OUT || e === OUT ? OUT : a;
          continue;
        }
        else if (image === 'Zoomed') { sx = Math.min(CX1, Math.max(CX0, zx - 15 + ((x - CX0) >> 1))); sy = Math.min(CY1, Math.max(CY0, zy - 13 + ((y - CY0) >> 1))); }
        buf[y * N + x] = sx >= CX0 && sx <= CX1 && sy >= CY0 && sy <= CY1 ? tmp[sy * N + sx] : WHITE;
      }
    }

    const off = document.createElement('canvas');
    off.width = off.height = N;
    const oc = off.getContext('2d');
    const img = oc.createImageData(N, N);
    const REPLAY = 2.5;
    const MODE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];
    const root = 55 + ((sm >>> 5) % 7);
    let replayAt = 0, quackAt = -9;
    const ghostMask = new Uint8Array(N * N);
    // ================= the legendaries, each in a style of its own (drawn whole on their own grid, 96 dots across) ====
    // Transparent: an X-ray film; Phoenix: a tarot card; Mandarin: a woodblock print. They share the duck's own
    // shape and the drawing of what it wears and carries (so every trait shows, each in its style's colours).
    const LG = 96;
    // the duck, facing left, as shape tests on the 96 grid; its pose moves the body, the wings and the legs
    const DUCK = (() => {
      const by = pose === 'Swimming' ? 64 : pose === 'Standing' ? 54 : 60, hy = pose === 'Swimming' ? 38 : pose === 'Standing' ? 30 : 34;
      const H = [31, hy], R = 11;
      const body = (x, y) => ((x - 54) / 27) ** 2 + ((y - by) / 15) ** 2 <= 1;
      const neck = (x, y) => ((x - 37) / 8) ** 2 + ((y - (hy + by) / 2 + 2) / ((by - hy) / 2 + 1)) ** 2 <= 1;
      const head = (x, y) => (x - H[0]) ** 2 + (y - H[1]) ** 2 <= R * R;
      const bill = (x, y) => { const u = (H[0] - 9 - x) / 13; if (u < 0 || u > 1) return false; return Math.abs(y - (H[1] + 3 + u * 2)) < 3.6 * (1 - u * 0.55); };
      const tail = (x, y) => { const ax = 78, ay = by - 4; const u = (x - ax) / 10; return u >= 0 && u <= 1 && y > ay - 8 * u - 1 && y < ay + 4 - u * 2; };
      const wingUp = pose === 'Flapping';
      const wing = (x, y) => wingUp ? ((x - 62) / 9) ** 2 + ((y - (by - 18)) / 16) ** 2 <= 1 && y < by - 2 : ((x - 60) / 16) ** 2 + ((y - by + 1) / 8) ** 2 <= 1;
      const legs = (x, y) => pose === 'Standing' && y > by + 12 && y < by + 24 && (Math.abs(x - 48) < 1.5 || Math.abs(x - 58) < 1.5) || (pose === 'Standing' && y >= by + 23 && y <= by + 25 && ((x > 42 && x < 50) || (x > 52 && x < 60)));
      const any = (x, y) => body(x, y) || neck(x, y) || head(x, y) || bill(x, y) || tail(x, y) || wing(x, y) || legs(x, y);
      return { by, hy, H, R, body, neck, head, bill, tail, wing, legs, any, eye: [H[0] - 3, H[1] - 3], tip: [H[0] - 22, H[1] + 5], hatAt: [H[0] + 1, H[1] - R + 1], neckAt: [38, by - 12] };
    })();
    // a little pixel art kit: rows of characters, each mapped to a colour (or skipped)
    const SPR = (put, art, x0, y0, map) => art.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const k = map[r[i]]; if (k !== undefined) put(x0 + i, y0 + j, k); } });
    // (a sprite that must read the right way round on screen, at a screen position, on a grid that is shown mirrored
    // when the duck faces right)
    const SPRS = (put, art, sx, sy, map) => facing === 'Right' ? SPR(put, art.map(r => [...r].reverse().join('')), LG - sx - art[0].length, sy, map) : SPR(put, art, sx, sy, map);
    const HATS = {
      'Top Hat': ['..KKKKK..', '..KAAAK..', '..KAAAK..', '..KBBBK..', 'KKKKKKKKK'], 'Sailor Cap': ['..KKKKK..', '.KLLLLLK.', 'KLLLLLLLK', 'KKAAAAAKK'], Beanie: ['....A....', '..KKKKK..', '.KAAAAAK.', 'KABABABAK', 'KKKKKKKKK'],
      'Party Hat': ['....A....', '...KBK...', '...KAK...', '..KBAAK..', '..KAABK..', '.KBAAABK.', 'KKKKKKKKK'], Flower: ['.A.A.', 'AABAA', '.A.A.', '..K..'], Crown: ['A.A.A.A', 'AAAAAAA', 'ABAAABA', 'AAAAAAA'],
      'Cowboy Hat': ['...KKK...', '..KAAAK..', 'KKKAAAKKK', '.KKKKKKK.'], 'Chef Hat': ['.LL.LL.', 'LLLLLLL', 'LLLLLLL', '.LLLLL.', '.KKKKK.'], 'Propeller Cap': ['AA.K.BB', '...K...', '.KAAAK.', 'KABABAK', 'KKKKKKK'],
      Headphones: ['..KKKKK..', '.K.....K.', 'K.......K', 'AA.....AA', 'AA.....AA'], 'Wizard Hat': ['.....K...', '....KA...', '...KAAK..', '..KABAK..', '..KAAAAK.', 'KKKKKKKKK'], 'Viking Helmet': ['L.......L', 'L.KKKKK.L', '.LKAAAKL.', '..KAAAK..', 'KKKKKKKKK'],
      Halo: ['.AAAAA.', 'A.....A', '.AAAAA.'], 'Flame Crest': ['..A..A.', '.ABA.AB', 'ABBAABA', '.AAAAA.'], Crest: ['....AA', '..AAB.', 'AABB..', 'BB....'],
    };
    const NECKS = {
      'Bow Tie': ['A...A', 'AAKAA', 'A...A'], Scarf: ['AAAAAAA', 'ABABABA', '....AB.', '....BA.'], Medal: ['K.K', '.K.', 'AAA', 'ABA', 'AAA'], Bell: ['.K.', 'AAA', 'AAA', 'AKA'],
      Pearls: ['L.L.L.L.L'], Lei: ['ABABABAB', '.BABABA.'], Necktie: ['AAA', '.A.', 'AAA', 'ABA', '.A.'], Bandana: ['AAAAAAA', '.ABABA.', '..AAA..', '...A...'], 'Life Ring': ['.LAAL.', 'A....A', 'L....L', '.LAAL.'], Camera: ['.K.K.', 'KKKKK', 'KLAKK', 'KKKKK'],
    };
    const BILLS = { Worm: ['AA.AA', '.AAA.'], Flower: ['.A.', 'ABA', '.A.', '.K.'], Bread: ['.LLL.', 'LLLLL', 'LLLLL'], Letter: ['LLLLL', 'LKLKL', 'LLKLL', 'LLLLL'], Bubblegum: ['.AAA.', 'AAAAA', 'AAAAA', '.AAA.'], Fish: ['A..AA.', 'AAAAAB', 'A..AA.'] };
    const FRIENDS = { Duckling: ['.AA..', 'AAAB.', '.AAA.', 'AAAA.'], Frog: ['A.A.A', 'AAAAA', 'ABBBA', 'A...A'], Fish: ['..AA..A', '.AAAAAA', 'ABAAAAA', '.AAAAAA', '..AA..A'], Bee: ['..L.L', '.ABAB', 'ABABA', '.ABA.'], Snail: ['..AA.', '.ABBA', 'AABAA', 'KKKKK'], 'Computer Mouse': ['..K..', '.LLL.', 'LLKLL', 'LLLLL', '.LLL.'] };
    const DOODLES = { Sun: ['A.A.A', '.AAA.', 'AAAAA', '.AAA.', 'A.A.A'], Rainbow: ['.AAAA.', 'ABBBBA', 'AB..BA', 'A....A'], Hearts: ['AA.AA', 'AAAAA', '.AAA.', '..A..'], Stars: ['..A..', 'AAAAA', '.AAA.', 'A...A'], Raincloud: ['.LLL.', 'LLLLL', '.A.A.', 'A.A..'], Moon: ['.AA..', 'AA...', 'AA...', '.AA..'], Balloons: ['AA.BB', 'AA.BB', '.K.K.', '..K..'], Lightning: ['..AA', '.AA.', 'AAAA', '.AA.', 'AA..'], Spiral: ['AAAAA', 'A...A', 'A.A.A', 'A.AAA'], Kite: ['..A..', '.ABA.', 'ABBBA', '.ABA.', '..K..', '.K...'], UFO: ['..A..', '.LLL.', 'AAAAA'] };
    const CURSORS2 = { Arrow: ['K....', 'KK...', 'KLK..', 'KLLK.', 'KLLLK', 'KLKK.', 'K..K.'], Pencil: ['....KK', '...KAK', '..KAK.', '.KAK..', 'KLK...', 'KK....'], Bucket: ['.KKK..', 'KLLLK.', 'KLLLKA', 'KLLLKA', '.KKK.A'], 'Spray Can': ['..L.L', '.KK..', 'KAAK.', 'KAAK.', 'KAAK.', 'KKKK.'], Brush: ['....KA', '...KA.', '..KA..', '.LK...', 'LL....'], Hourglass: ['KKKKK', '.KAK.', '..K..', '.KLK.', 'KKKKK'] };
    // the Image trait, laid over a finished picture: skewed (sheared), inverted (each style says how), tiled, zoomed
    const IMGFX = (px, inv) => {
      if (image === 'Skewed') { const o = px.slice(); for (let y = 0; y < LG; y++) { const s = Math.round((y - 48) * 0.12); for (let x = 0; x < LG; x++) px[y * LG + x] = o[y * LG + Math.max(0, Math.min(LG - 1, x + s))]; } }
      if (image === 'Tiled') { const o = px.slice(); for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) px[y * LG + x] = o[((y * 2) % LG) * LG + (x * 2) % LG]; }
      if (image === 'Zoomed') { const o = px.slice(); for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) px[y * LG + x] = o[(24 + (y >> 1)) * LG + 20 + (x >> 1)]; }
      if (image === 'Inverted' && inv) inv(px);
    };
    // the finished grid onto the canvas, through a palette (mirrored when it faces right)
    const LCV = document.createElement('canvas'); LCV.width = LCV.height = LG;
    const LCX = LCV.getContext('2d'), LIM = LCX.createImageData(LG, LG);
    const LSHOW = (px, pal, mir = facing === 'Right') => {
      const d = LIM.data;
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const p = pal[px[y * LG + (mir ? LG - 1 - x : x)]], j = (y * LG + x) * 4; d[j] = p[0]; d[j + 1] = p[1]; d[j + 2] = p[2]; d[j + 3] = 255; }
      LCX.putImageData(LIM, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(LCV, 0, 0, S, S);
    };
    // a press: a short still one is a tap; longer, a hold; and where it went down
    const LPR = { at: -9, x: 0, y: 0, mv: 0, was: false };
    const lpress = (inp, t) => {
      inp.taps();
      let tap = false, rel = false;
      if (inp.down && !LPR.was) { LPR.at = t; LPR.x = inp.x; LPR.y = inp.y; LPR.mv = 0; }
      if (inp.down) LPR.mv = Math.max(LPR.mv, Math.hypot(inp.x - LPR.x, inp.y - LPR.y) * LG);
      if (!inp.down && LPR.was) { rel = true; tap = t - LPR.at < 0.3 && LPR.mv < 2; }
      LPR.was = inp.down;
      return { tap, rel, hold: inp.down && t - LPR.at > 0.3 && LPR.mv < 2, held: t - LPR.at, drag: inp.down && LPR.mv >= 2 };
    };
    // (the pointer in the grid's own unmirrored dots)
    const lpt = inp => [(facing === 'Right' ? 1 - inp.x : inp.x) * LG, inp.y * LG];
    // ---- Transparent: an X-ray film. The duck seen straight through: a faint glow of flesh and, in it, its bones,
    // bright on the black film (skull, eye socket, the bones of its bill, the chain of its neck, spine, ribs, wing,
    // legs) and whatever metal it wears shining solid. Your pointer is the scanner: under its ring the bones blaze
    // out; with no pointer a scan line sweeps the film. A quick tap takes an exposure (a white flash, then every bone
    // at once); hold and its heart shows, beating, with a trace running along the bottom of the film.
    // Its traits, the film's way: the lightbox's tint (Scene), the ID label (Window, with the bill's colour), the lead
    // L or R marker (Facing), the doodle as a marker stuck to the film, the friend's ghost in the corner, the eyes,
    // headwear, neckwear and what's in its bill seen through, the hand's tremble as a doubled exposure, Inverted as a
    // negative, the cursor at your pointer.
    const XR = LEG === 'Transparent' ? (() => {
      const TIS = new Uint8Array(LG * LG), BONE = new Uint8Array(LG * LG), ACC = new Uint8Array(LG * LG), FILM = new Uint8Array(LG * LG);
      const WOB = hand === 'Very Shaky' ? 1.4 : hand === 'Shaky' ? 0.8 : 0;
      const D = DUCK;
      // the film: near black, a faint grain and a couple of scratches
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const h = ((x * 73856093) ^ (y * 19349663)) >>> 0; FILM[y * LG + x] = (h % 23 === 0) ? 1 : (Math.abs(x - 70 - y * 0.18) < 0.5 && y > 8 && y < 40) ? 1 : 0; }
      // the flesh: a soft glow, denser toward its edge
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        const X = x + Math.sin(y * 0.8) * WOB * 0.3;
        if (!D.any(X, y)) continue;
        const e = !D.any(X - 2, y) || !D.any(X + 2, y) || !D.any(X, y - 2) || !D.any(X, y + 2);
        TIS[y * LG + x] = e ? 3 : D.bill(X, y) ? 3 : 2;
      }
      // the bones: 1 dim, 2 bone, 3 a joint or the brightest edge
      const bput = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < LG && y < LG && BONE[y * LG + x] < v) BONE[y * LG + x] = v; };
      const bline = (pts, w, v) => { for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.ceil(Math.hypot(bx - ax, by - ay) * 2); for (let k = 0; k <= n; k++) { const x = ax + (bx - ax) * k / n, y = ay + (by - ay) * k / n; for (let dy = -w; dy <= w; dy++) for (let dx = -w; dx <= w; dx++) if (dx * dx + dy * dy <= w * w + 0.3) bput(x + dx, y + dy, v); } } };
      const ring = (cx, cy, rx, ry, v, a0 = 0, a1 = 6.283) => { const n = Math.ceil((rx + ry) * 3); for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; bput(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, v); } };
      const [hx, hy] = D.H;
      ring(hx, hy, 8, 7.5, 2); ring(hx, hy, 7, 6.5, 1);                                   // the skull
      bline([[hx - 7, hy + 1], [D.tip[0] + 2, D.tip[1] - 2]], 0, 2); bline([[hx - 6, hy + 4], [D.tip[0] + 3, D.tip[1] + 1]], 0, 2);   // the bill's bones
      const neck = []; for (let k = 0; k <= 6; k++) neck.push([hx + 5 + k * 1.4, hy + 7 + k * ((D.by - hy - 14) / 6)]);
      for (const [x, y] of neck) { bline([[x - 1.5, y], [x + 1.5, y]], 0.6, 2); bput(x, y, 3); }        // the vertebrae
      const sp = []; for (let k = 0; k <= 10; k++) sp.push([40 + k * 3.8, D.by - 9 + Math.sin(k / 10 * Math.PI) * -3 + k * 0.3]);
      bline(sp, 0.6, 2);                                                                          // the spine
      for (let k = 1; k <= 6; k++) { const [x, y] = sp[k]; ring(x - 1, y + 6, 3, 6, 2, -1.6, 1.4); }     // the ribs
      ring(70, D.by - 3, 6, 4, 2, 2.4, 6.0);                                                       // the pelvis
      // the wing's bones (raised if it flaps)
      if (pose === 'Flapping') bline([[52, D.by - 8], [60, D.by - 22], [66, D.by - 32], [72, D.by - 30]], 0.5, 2);
      else bline([[46, D.by - 4], [58, D.by - 2], [70, D.by - 2], [76, D.by - 5]], 0.5, 2);
      // the legs: standing, the long bones and toes; otherwise folded under it
      if (pose === 'Standing') for (const lx of [48, 58]) { bline([[lx + 2, D.by + 6], [lx, D.by + 14], [lx, D.by + 23]], 0.5, 2); bline([[lx - 3, D.by + 24], [lx + 3, D.by + 24]], 0, 3); }
      else for (const lx of [50, 60]) bline([[lx, D.by + 6], [lx - 4, D.by + 10], [lx + 2, D.by + 12]], 0.5, 1);
      // its eyes (Eyes) as the X-ray sees them; glasses and shades shine as metal does
      const [ex, ey] = D.eye, A = (x, y, v) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < LG && y < LG) ACC[y * LG + x] = v; };
      const EY = {
        Glasses: () => { ring(ex, ey, 3, 3, 3); ring(ex + 6, ey + 1, 2.5, 2.5, 3); bline([[ex + 3, ey], [ex + 4, ey]], 0, 3); },
        Shades: () => { for (let y = -1; y <= 1; y++) for (let x = -3; x <= 7; x++) A(ex + x, ey + y, 8); },
        Hearts: () => SPR(A, ['AA.AA', 'AAAAA', '.AAA.', '..A..'], ex - 2, ey - 2, { A: 10 }),
        Star: () => SPR(A, ['..A..', 'AAAAA', '.AAA.', 'A...A'], ex - 2, ey - 2, { A: 7 }),
        Googly: () => { ring(ex, ey, 3.5, 3.5, 3); A(ex + 1, ey + 1, 8); },
        Dizzy: () => { for (let k = 0; k < 14; k++) A(ex + Math.cos(k * 0.9) * k * 0.25, ey + Math.sin(k * 0.9) * k * 0.25, 7); },
        Sleepy: () => bline([[ex - 2, ey], [ex + 2, ey]], 0, 3), Happy: () => ring(ex, ey + 1, 2.5, 2, 3, 3.4, 6.0),
        Teary: () => { ring(ex, ey, 2.5, 2.5, 2); A(ex, ey + 4, 8); A(ex, ey + 5, 8); }, Angry: () => { ring(ex, ey, 2.5, 2.5, 2); bline([[ex - 3, ey - 4], [ex + 2, ey - 2]], 0, 3); },
        Lashes: () => { ring(ex, ey, 2.5, 2.5, 2); for (const d of [-2, 0, 2]) A(ex + d, ey - 4, 7); },
      }[eyes];
      if (EY) EY(); else ring(ex, ey, 2.5, 2.5, 3);
      // what it wears: fabric faint, the metal (crowns, buckles, the bell, the camera, the medal) solid white
      const XM = { K: 6, A: 5, B: 8, L: 5 };
      const ht = HATS[hat]; if (ht) SPR(A, ht, D.hatAt[0] - (ht[0].length >> 1), D.hatAt[1] - ht.length + 1, hat === 'Crown' || hat === 'Halo' || hat === 'Viking Helmet' ? { A: 8, B: 7, K: 7, L: 8 } : XM);
      const nk = NECKS[neck]; if (nk) SPR(A, nk, D.neckAt[0] - (nk[0].length >> 1), D.neckAt[1], neck === 'Medal' || neck === 'Bell' || neck === 'Camera' || neck === 'Pearls' ? { A: 8, B: 7, K: 7, L: 8 } : XM);
      const ib = BILLS[inBill]; if (ib) SPR(A, ib, D.tip[0] - 4, D.tip[1] - 1, inBill === 'Fish' ? { A: 7, B: 8 } : { A: 6, B: 7, L: 6, K: 5 });
      // the friend's faint ghost in the corner, the doodle stuck on as a lead marker, the L or R marker, the ID label
      // its organs, seen only under the scanner's lens: lungs, the heart, the gizzard
      const ORG = new Uint8Array(LG * LG);
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        const lung = ((x - 52) / 8) ** 2 + ((y - D.by + 4) / 3.5) ** 2 <= 1, giz = ((x - 64) / 5) ** 2 + ((y - D.by - 3) / 4) ** 2 <= 1, gizE = giz && ((x - 64) / 5) ** 2 + ((y - D.by - 3) / 4) ** 2 > 0.6;
        if (lung) ORG[y * LG + x] = 4; if (gizE) ORG[y * LG + x] = 6; else if (giz) ORG[y * LG + x] = 3;
      }
      // the duck made bigger on the film (it fills it), before the markers go on
      const up = L => { const o = L.slice(); for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const sx = Math.round(48 + (x - 48) / 1.34), sy = Math.round(50 + (y - 52) / 1.34); L[y * LG + x] = sx >= 0 && sy >= 0 && sx < LG && sy < LG ? o[sy * LG + sx] : 0; } };
      up(TIS); up(BONE); up(ACC); up(ORG);
      // the film's edge: a lighter base strip along the foot with its edge numbers and notches (as film reads)
      const D3 = { 1: ['010', '110', '010', '010', '111'], 2: ['111', '001', '111', '100', '111'], 4: ['101', '101', '111', '001', '001'], A: ['010', '101', '111', '101', '101'] };
      for (let y = LG - 8; y < LG; y++) for (let x = 0; x < LG; x++) A(x, y, y === LG - 8 ? 2 : (y === LG - 3 && x % 6 < 3) ? 6 : 1);
      let ex2 = 14; for (const ch of '24A') { SPRS(A, D3[ch], ex2, LG - 7, { 1: 6 }); ex2 += 4; }
      ex2 = 66; for (const ch of '21') { SPRS(A, D3[ch], ex2, LG - 7, { 1: 6 }); ex2 += 4; }
      for (const nx of [4, 8]) for (let y = 0; y < 4; y++) A(nx, y, 1);
      const fr = FRIENDS[friend]; if (fr) SPR(A, fr, 84, 76, { A: 4, B: 6, L: 5, K: 5 });
      const dd = DOODLES[doodle]; if (dd) SPRS(A, dd, 84, 6, { A: 8, B: 7, L: 7, K: 7 });
      SPRS(A, facing === 'Right' ? ['XXX.', 'X..X', 'XXX.', 'X.X.', 'X..X'] : ['X...', 'X...', 'X...', 'X...', 'XXXX'], 6, 78, { X: 10 });
      for (let y = 4; y < 14; y++) for (let x = 4; x < 32; x++) A(x, y, y === 4 || y === 13 || x === 4 || x === 31 ? 9 : (y === 7 || y === 10) && x > 6 && x < 27 && (x * 7 % 5) ? 7 : x > 26 && x < 30 && y > 5 && y < 12 ? 12 : 0);
      // the theme's colour for the label, the bill's colour on it, the scene's tint over the whole film
      const TINT = { Pond: [0.4, 1, 1], Sky: [0.5, 0.8, 1.2], Meadow: [0.6, 1.1, 0.7], Night: [0.6, 0.6, 1.2], Bathtub: [0.5, 1.05, 1.15], Lava: [1.25, 0.6, 0.45], Snow: [0.9, 1, 1.15], Sunset: [1.2, 0.85, 0.6], Beach: [0.7, 1.1, 1], Space: [0.9, 0.6, 1.25] }[scene] || [0.5, 1, 1.1];
      const tn = (r, gg, b) => [Math.min(255, r * TINT[0]) | 0, Math.min(255, gg * TINT[1]) | 0, Math.min(255, b * TINT[2]) | 0];
      const THC = { Navy: [40, 60, 160], Teal: [30, 140, 140], Maroon: [150, 40, 50], Olive: [130, 130, 40], Graphite: [110, 110, 120], Plum: [140, 60, 150], 'Hot Dog': [230, 60, 40] }[theme] || [40, 60, 160];
      const BLC = { Orange: [255, 140, 40], Yellow: [255, 220, 60], Red: [230, 50, 50], Black: [40, 40, 40], Gold: [230, 180, 60], Pink: [255, 120, 180], Blue: [60, 140, 255], Purple: [150, 80, 230] }[bill] || [255, 140, 40];
      const pal = [tn(4, 10, 14), tn(14, 26, 32), tn(20, 54, 64), tn(34, 92, 106), tn(52, 130, 146), tn(96, 170, 186), tn(170, 226, 236), tn(226, 250, 255), [255, 255, 255], THC, [255, 70, 60], tn(40, 70, 80), BLC];
      const neg = pal.map(p => [255 - p[0], 255 - p[1], 255 - p[2]]);
      const px = new Uint8Array(LG * LG);
      return { TIS, BONE, ACC, ORG, FILM, pal, neg, px, flashAt: -9, wasHold: false };
    })() : null;
    function xrayFrame(t) {
      const K = XR, inp = c.input, px = K.px, pr = lpress(inp, t), [pX, pY] = lpt(inp);
      if (pr.tap) { K.flashAt = t; c.sound.hit('click', 0.6); c.sound.hit('noise', 0.12, { cutoff: 7000, dur: 0.15 }); c.sound.note(root + 31, { dur: 0.4, vel: 0.06, wave: 'sine', at: 0.05 }); }
      const ft = t - K.flashAt, hold = pr.hold, beat = hold ? (pr.held * 1.6) % 1 : 1;
      if (hold && Math.floor(pr.held * 1.6) !== Math.floor((pr.held - 0.05) * 1.6)) { c.sound.note(root + 24, { dur: 0.08, vel: 0.08, wave: 'square', cutoff: 2000 }); c.sound.hit('kick', 0.35); }
      // the scan: under the scanner's ring (or near the sweeping line) the bones blaze out
      // the scanner is a lens: inside it the bones blaze white and the organs show; outside, only faint
      // (an exposure: a white flash held a few frames, then every bone and organ glowing, fading back)
      const scanY = 10 + ((t * 22) % 76), r2 = 22 * 22, all = ft < 0.22 ? 1 : ft < 2.2 ? 1 - (ft - 0.22) / 2 : 0;
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        const i = y * LG + x, a = K.ACC[i];
        const lit = all > 0.35 || (inp.inside ? (x - pX) ** 2 + (y - pY) ** 2 < r2 : Math.abs(y - scanY) < 8);
        if (a) { px[i] = lit || a > 8 ? a : Math.min(a, 5); continue; }
        const b = K.BONE[i], ts = K.TIS[i], o = K.ORG[i];
        if (b) { px[i] = lit ? (b === 1 ? 7 : 8) : inp.inside ? (b === 1 ? 3 : 4) : b === 1 ? 5 : 6; continue; }   // (no scanner on it: the whole skeleton shows, the scan line brighter)
        if (o && lit) { px[i] = o; continue; }
        px[i] = ts ? (lit ? ts + 1 : ts - 1) : K.FILM[i];
      }
      // the scanner's ring, or the scan line
      if (inp.inside) for (let k = 0; k < 64; k++) { const a = k / 64 * 6.283, x = Math.round(pX + Math.cos(a) * 20), y = Math.round(pY + Math.sin(a) * 20); if (x >= 0 && y >= 0 && x < LG && y < LG && (k + Math.floor(t * 12)) % 4 < 2) px[y * LG + x] = 6; }
      else for (let x = 0; x < LG; x++) if (px[Math.round(scanY) * LG + x] < 5) px[Math.round(scanY) * LG + x] = x % 2 ? 4 : 3;
      // held: its heart, beating, and a trace along the bottom of the film
      if (hold) {
        const hx = 46, hy = DUCK.by - 2, sz = 2.5 + (beat < 0.15 ? 1.5 : 0);
        for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= sz * sz) px[(hy + y) * LG + hx + x] = beat < 0.15 ? 10 : 6;
        for (let x = 0; x < LG; x++) { const u = ((x / LG + pr.held * 0.8) % 0.33) / 0.33, yy = 84 - (u > 0.4 && u < 0.45 ? 7 : u > 0.45 && u < 0.5 ? -3 : 0); if (x < (pr.held * 60) % LG + 40) px[Math.round(yy) * LG + x] = 7; }
      }
      // the cursor at your pointer
      const cu = CURSORS2[cursorKind]; if (inp.inside && cu) SPRS((x, y, k) => { if (x >= 0 && y >= 0 && x < LG && y < LG) px[y * LG + x] = k; }, cu, Math.round(inp.x * LG), Math.round(pY), { K: 8, L: 1, A: 10 });
      IMGFX(px, null);
      LSHOW(px, ft < 0.2 ? K.pal.map((p, i) => i < 3 ? [235, 245, 250] : [255, 255, 255]) : image === 'Inverted' ? K.neg : K.pal);
    }
    // ---- Phoenix: a tarot card, XX, THE PHOENIX. On a midnight field strewn with stars, the phoenix displayed as on a
    // coat of arms: body upright, wings spread wide in tiers of flame feathers, head turned in profile under its crest,
    // a burning sun behind it and a nest of flames below; a gilt border, a numeral above, its name below. Hold it and
    // the fire takes hold (the flames rise, embers fly, the border glows); let go after a long hold and the card burns
    // away to ash and is born again; a quick tap turns the card over and back.
    // Its traits, the card's way: the border's colour (Window), the doodle in the four corner roundels, its eyes, its
    // pose (how it holds its wings), the friend at its feet, the hand's line, Inverted as a card dealt reversed, the
    // cursor at your pointer.
    const TA = LEG === 'Phoenix' ? (() => {
      const CARD = new Uint8Array(LG * LG), WOB = hand === 'Very Shaky' ? 0.9 : hand === 'Shaky' ? 0.5 : 0;
      const put = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < LG && y < LG) CARD[y * LG + x] = k; };
      // the card: a dark table at its rounded corners, the border (theme colour, gilt lines), the midnight field
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        const d = Math.min(x, y, LG - 1 - x, LG - 1 - y), cn = Math.min(Math.hypot(x - 3, y - 3), Math.hypot(LG - 4 - x, y - 3), Math.hypot(x - 3, LG - 4 - y), Math.hypot(LG - 4 - x, LG - 4 - y));
        let k = 1;
        if (d < 1) k = 0; else if (d < 4) k = 9; else if (d === 4) k = 3; else if (d === 6) k = 3;
        if ((x < 4 || x > LG - 5) && (y < 4 || y > LG - 5) && cn > 3) k = 0;
        if (k === 1 && ((x * 37 + y * 17) % 61 === 0 || (x * 11 + y * 29) % 97 === 0) && y < 70) k = 2;
        CARD[y * LG + x] = k;
      }
      // the numeral's banner and the name plate
      for (let y = 8; y < 17; y++) for (let x = 36; x < 60; x++) put(x, y, y === 8 || y === 16 || x === 36 || x === 59 ? 3 : 8);
      SPR(put, ['X...X.X...X', '.X.X...X.X.', '..X.....X..', '.X.X...X.X.', 'X...X.X...X'], 42, 10, { X: 7 });
      for (let y = 80; y < 91; y++) for (let x = 9; x < 87; x++) put(x, y, y === 80 || y === 90 || x === 9 || x === 86 ? 3 : 8);
      const F5 = { T: ['111', '010', '010', '010', '010'], H: ['101', '101', '111', '101', '101'], E: ['111', '100', '110', '100', '111'], P: ['110', '101', '110', '100', '100'], O: ['111', '101', '101', '101', '111'], N: ['101', '111', '111', '111', '101'], I: ['111', '010', '010', '010', '111'], X: ['101', '101', '010', '101', '101'] };
      let lx = 48 - Math.round(('THE PHOENIX'.length * 4 - 1) / 2);
      for (const ch of 'THE PHOENIX') { const gl = F5[ch]; if (gl) gl.forEach((r, j) => { for (let q = 0; q < 3; q++) if (r[q] === '1') put(lx + q, 83 + j, 7); }); lx += 4; }
      // the doodle in the four corner roundels
      const dd = DOODLES[doodle];
      for (const [cx, cy] of [[13, 13], [82, 13], [13, 70], [82, 70]]) { for (let a = 0; a < 28; a++) put(cx + Math.cos(a / 28 * 6.283) * 5.5, cy + Math.sin(a / 28 * 6.283) * 5.5, 3); if (dd) SPR(put, dd, cx - (dd[0].length >> 1), cy - (dd.length >> 1), { A: 4, B: 5, L: 8, K: 3 }); }
      // the friend at its feet, by the name plate
      const fr = FRIENDS[friend]; if (fr) SPR(put, fr, 70, 72, { A: 4, B: 5, L: 8, K: 7 });
      // the shapes that move (sun, wings, flames) are laid each frame; here, where the wings stand for each pose
      const WING = { Flapping: [-1.25, 0.55], Sitting: [-0.55, 0.5], Swimming: [-0.15, 0.45], Standing: [-0.85, 0.5] }[pose] || [-0.85, 0.5];
      const px = new Uint8Array(LG * LG);
      const pal = [[8, 4, 14], [16, 24, 72], [255, 243, 192], [242, 192, 64], [255, 232, 144], [240, 122, 32], [200, 40, 30], [26, 10, 20], [244, 230, 196], { Navy: [40, 50, 140], Teal: [20, 120, 120], Maroon: [130, 30, 40], Olive: [120, 110, 30], Graphite: [70, 70, 80], Plum: [110, 40, 120], 'Hot Dog': [220, 50, 30] }[theme] || [40, 50, 140], [200, 52, 40], [236, 150, 50], [255, 255, 255], [106, 96, 112], [255, 64, 32], [10, 18, 54]];
      return { CARD, WOB, WING, px, pal, burnAt: -9, flipAt: -9 };
    })() : null;
    function tarotFrame(t) {
      const K = TA, inp = c.input, px = K.px, pr = lpress(inp, t);
      if (pr.tap && t - K.burnAt > 3.4 && t - K.flipAt > 1.6) { K.flipAt = t; c.sound.hit('noise', 0.06, { cutoff: 3000, dur: 0.12 }); c.sound.note(root + 24, { dur: 0.2, vel: 0.06, wave: 'triangle', at: 0.3 }); }
      if (pr.rel && !pr.tap && pr.held > 0.9 && !pr.drag) { K.burnAt = t; for (let i = 0; i < 8; i++) c.sound.hit('noise', 0.1, { cutoff: 700 + i * 350, dur: 0.14, at: i * 0.08 }); MODE.slice(0, 8).forEach((d, i) => c.sound.note(root + d, { dur: 0.16, vel: 0.14, wave: 'triangle', at: 2.0 + i * 0.1 })); c.sound.note(root + 24, { dur: 1.2, vel: 0.1, wave: 'triangle', at: 2.9 }); }
      const stoke = pr.hold && t - K.burnAt > 3.4 ? Math.min(1, (pr.held - 0.3) / 2.2) : 0;
      if (stoke && Math.floor(pr.held * 6) !== Math.floor((pr.held - 0.05) * 6)) c.sound.hit('noise', 0.03 + stoke * 0.05, { cutoff: 600 + stoke * 1200, dur: 0.15 });
      px.set(K.CARD);
      const put = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 5 && y >= 5 && x < LG - 5 && y < 79) px[y * LG + x] = k; };
      const cyc = Math.floor(t * (8 + stoke * 14)), W = K.WOB;
      // the burning sun behind it, its rays turning by a step
      const rr = Math.floor(t * 1.5) % 2;
      for (let y = 18; y < 78; y++) for (let x = 6; x < 90; x++) {
        const dx = x - 48, dy = y - 44, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx), ray = ((a / 6.283 * 24 + rr * 0.5) % 1 + 1) % 1;
        if (r < 19) put(x, y, r > 17.8 ? 11 : 10);
        else if (r < 34 && ray < (Math.floor(a / 6.283 * 24 + rr * 0.5) % 2 ? 0.3 : 0.18) && r < (Math.floor(a / 6.283 * 24 + 99) % 2 ? 34 : 28)) put(x, y, 11);
      }
      // the nest of flames below, licking up (higher as you stoke it)
      for (let k = 0; k < 9; k++) {
        const fx = 22 + k * 6.5, h = 9 + ((k * 5 + cyc) % 4) + stoke * 8, w = 3.2;
        for (let y = 0; y < h; y++) for (let x = -w; x <= w; x++) { const lim = w * (1 - y / h) ** 0.7; if (Math.abs(x + Math.sin(y * 0.6 + cyc * 0.9 + k) * 1.2 * (y / h)) <= lim) put(fx + x, 78 - y, Math.abs(x) > lim - 1 ? 7 : y > h * 0.6 ? 6 : y > h * 0.3 ? 5 : 4); }
      }
      // the wings: tiers of flame feathers fanning out from its shoulders
      const [w0, sp] = K.WING, flap = Math.sin(t * (2 + stoke * 6)) * 0.08;
      for (const s of [-1, 1]) for (let tier = 0; tier < 3; tier++) for (let f = 0; f < 6; f++) {
        const a = w0 + flap + (f - 2.5) * sp * 0.38 + tier * 0.06, len = 34 - tier * 9 - Math.abs(f - 1.5) * 1.8 + stoke * 3, ang = s < 0 ? Math.PI - a : a;
        const bx = 48 + s * 6, by = 46, col = [6, 5, 3][tier];
        for (let r = 7; r < len; r++) {
          const wdt = 2.6 * Math.sin(Math.min(1, r / len) * Math.PI) * (1 - tier * 0.15) + 0.6;
          const cx = bx + Math.cos(ang) * r, cy = by - Math.sin(ang) * r * -1 * -1 + Math.sin(r * 0.5 + W * Math.sin(r)) * W;
          for (let q = -wdt; q <= wdt; q += 0.5) { const x = cx - Math.sin(ang) * q, y = cy - Math.cos(ang) * q; put(x, y, Math.abs(q) > wdt - 0.6 ? 7 : col); }
        }
      }
      // its shoulders, where the wings join
      for (const s of [-1, 1]) for (let y = -6; y <= 6; y++) for (let x = -7; x <= 7; x++) if ((x / 7) ** 2 + (y / 6) ** 2 <= 1) put(48 + s * 8 + x, 46 + y, ((x / 7) ** 2 + (y / 6) ** 2 > 0.7) ? 7 : 6);
      // its body upright, its tail of three flames, its head in profile with the crest and the gold bill
      for (let y = 30; y < 80; y++) for (let x = 30; x < 66; x++) {
        const X = x + Math.sin(y * 0.7) * W * 0.5;
        const body = ((X - 48) / 8.5) ** 2 + ((y - 56) / 15) ** 2 <= 1, head = (X - 45) ** 2 + (y - 32) ** 2 <= 49, neck = Math.abs(X - 47) < 4.5 && y > 34 && y < 46;
        const tail = [-1, 0, 1].some(k => { const u = (y - 68) / 12; return u > 0 && u < 1 && Math.abs(X - 48 - k * 5 * u - Math.sin(u * 5 + cyc + k) * 1.2) < 2.6 * (1 - u); });
        if (!(body || head || neck || tail)) continue;
        put(x, y, tail ? (y % 3 ? 5 : 6) : body ? (y < 50 ? 4 : (x + y) % 5 === 0 ? 5 : 3) : 4);
      }
      // the outline round body and head
      for (let y = 22; y < 80; y++) for (let x = 30; x < 66; x++) {
        const i = y * LG + x, v = px[i]; if (v !== 3 && v !== 4 && v !== 5) continue;
        if ([i - 1, i + 1, i - LG, i + LG].some(j => px[j] === 10 || px[j] === 11 || px[j] === 1 || px[j] === 2 || px[j] === 15)) px[i] = 7;
      }
      // the crest of flames (Flame Crest), the gold bill, its eye (Eyes)
      for (let k = 0; k < 4; k++) { const fx = 42 + k * 3, h = 6 + ((k + cyc) % 3) + stoke * 3; for (let y = 0; y < h; y++) for (let x = -1.5; x <= 1.5; x++) if (Math.abs(x) <= 1.5 * (1 - y / h) + 0.3) put(fx + x - y * 0.25, 26 - y, y > h * 0.5 ? 6 : 5); }
      for (let x = 30; x <= 39; x++) { const u = (39 - x) / 9; for (let y = -2; y <= 2; y++) if (Math.abs(y) <= 2.2 * (1 - u * 0.6)) put(x, 34 + y + u, Math.abs(y) > 1.6 * (1 - u * 0.6) ? 7 : 3); }
      const ex = 43, ey = 31;
      const EY = { Star: ['.X.', 'XXX', '.X.'], Glasses: ['XXXXX', 'X.X.X', 'XXXXX'], Shades: ['XXXX', 'XXXX'], Hearts: ['X.X', 'XXX', '.X.'], Googly: ['XXX', 'X.X', 'XXX'], Sleepy: ['XXX'], Happy: ['X.X', '.X.'], Angry: ['X..', '.XX'], Dizzy: ['XX.', '.X.', '.XX'], Teary: ['XX', 'XX', '.T'], Lashes: ['X.X', 'XXX', 'XXX'] }[eyes] || ['XX', 'XX'];
      SPR(put, EY, ex - 1, ey - 1, { X: 7, T: 12 });
      // stoked: the fire climbs the card from its foot (behind the bird), the border scorches from the bottom up, embers fly
      if (stoke) {
        const fh = stoke * 72;
        for (let x = 5; x < LG - 5; x++) {
          const h = fh * (0.75 + 0.25 * Math.sin(x * 0.7 + cyc * 0.9) * Math.sin(x * 0.23 - cyc * 0.4));
          for (let y = Math.max(5, Math.round(79 - h)); y < 79; y++) {
            const i = y * LG + x, v = px[i]; if (!(v === 1 || v === 2 || v === 10 || v === 11 || v === 15)) continue;
            const u = (79 - y) / Math.max(1, h);
            px[i] = u > 0.85 ? ((x + y + cyc) % 2 ? 4 : 1) : u > 0.55 ? 5 : u > 0.25 ? 6 : 14;
          }
        }
        const sc = stoke * 100;
        for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const i = y * LG + x, d = Math.min(x, y, LG - 1 - x, LG - 1 - y); if (d < 1 || d > 6 || K.CARD[i] === 0) continue; const up = LG - 1 - y + (((x * 7) % 5) - 2) * 2; if (up < sc - 6) px[i] = (x * 3 + y) % 5 ? 7 : 13; else if (up < sc) px[i] = (x + y + cyc) % 2 ? 14 : 4; }
        for (let k = 0; k < 30; k++) { const u = (t * (0.6 + stoke) + k * 0.137) % 1; put(48 + Math.sin(k * 2.4) * 34 * u, 76 - u * 66, u < 0.5 ? 14 : 4); }
      }
      // the burning (after a long hold): a front of fire eating in from the edges; then the ash crumbles away and
      // falls; then, out of the dark, a ring of light opens from the bird and the card is reborn inside it, the
      // phoenix rising into place
      const bt = t - K.burnAt;
      if (bt < 3.4) {
        if (bt < 1.2) {
          const front = bt / 1.2 * 52;
          for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const d = Math.min(x, y, LG - 1 - x, LG - 1 - y) + (((x * 7 + y * 13) % 5) - 2) * 0.6; if (d < front - 2) px[y * LG + x] = (x * 3 + y * 5) % 7 ? 13 : 7; else if (d < front) px[y * LG + x] = (x + y + cyc) % 2 ? 14 : 4; }
        } else if (bt < 2.0) {
          const u = (bt - 1.2) / 0.8;
          for (let y = LG - 1; y >= 0; y--) for (let x = 0; x < LG; x++) {
            const fall = u * u * (60 + ((x * 37 + Math.floor(y / 3) * 11) % 30)), sy = Math.round(y - fall);
            px[y * LG + x] = sy >= 0 && ((x * 3 + sy * 5) % 4) && sy < LG - 2 ? ((x * 3 + sy * 5) % 7 ? 13 : 7) : 0;
          }
        } else {
          const u = Math.min(1, (bt - 2.0) / 1.4), R = u * 80, rise = Math.round((1 - Math.min(1, u * 1.6)) * 22), o = px.slice();
          for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
            const r = Math.hypot(x - 48, y - 46), i = y * LG + x;
            if (r > R + 2) px[i] = ((x * 13 + y * 7) % 41 === 0) ? 13 : 0;
            else if (r > R - 1) px[i] = r > R ? 4 : 12;
            else { const sy = y + rise; px[i] = sy < LG ? o[sy * LG + x] : 0; }
          }
          for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283 + t, x = Math.round(48 + Math.cos(a) * (R + 4)), y = Math.round(46 + Math.sin(a) * (R + 4)); if (x >= 0 && y >= 0 && x < LG && y < LG) px[y * LG + x] = 14; }
        }
      }
      // turned over: a full turn (the face narrowing to its edge, the back opening out, held, and back again)
      const ft = t - K.flipAt;
      let sq = 1, back = false;
      if (ft < 1.6) { const u = ft / 1.6; if (u < 0.22) sq = 1 - u / 0.22; else if (u < 0.44) { sq = (u - 0.22) / 0.22; back = true; } else if (u < 0.7) back = true; else if (u < 0.85) { sq = 1 - (u - 0.7) / 0.15; back = true; } else sq = (u - 0.85) / 0.15; sq = Math.max(0.03, sq); }
      if (back) for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        // the card's back: navy, a gilt border, a lattice, a ring of stars round a gold sun with its rays
        const i = y * LG + x; if (K.CARD[i] === 0) { px[i] = 0; continue; }
        const d = Math.min(x, y, LG - 1 - x, LG - 1 - y), r = Math.hypot(x - 47.5, y - 47.5), a = Math.atan2(y - 47.5, x - 47.5);
        let k = 15;
        if (((x + y) % 10 === 0 || (x - y + 100) % 10 === 0) && r > 26) k = 1;
        if (Math.abs(r - 24) < 0.6) k = 3;
        if (r < 24 && r > 20 && Math.abs(((a / 6.283 * 12) % 1 + 1) % 1 - 0.5) < 0.12) k = 4;
        if (r < 9) k = r > 8 ? 11 : 10; else if (r < 17 && Math.abs(((a / 6.283 * 16) % 1 + 1) % 1 - 0.5) < 0.18 - (r - 9) * 0.015) k = 3;
        if (d < 4) k = 9; else if (d === 4 || d === 6) k = 3;
        px[i] = k;
      }
      if (sq < 1) { const o = px.slice(); for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const sx = 48 + (x - 48) / sq; px[y * LG + x] = sx < 0 || sx >= LG ? 0 : (Math.abs(x - 48) >= 48 * sq - 0.5 && Math.abs(x - 48) < 48 * sq + 0.5 ? 3 : o[y * LG + Math.floor(sx)]); } }
      // the cursor at your pointer
      if (facing === 'Right') for (let y = 18; y < 43; y++) for (let x = 29; x < 48; x++) { const a = y * LG + x, b = y * LG + 96 - x, v = px[a]; px[a] = px[b]; px[b] = v; }   // facing right: its head turned the other way
      // Inverted: the card dealt reversed, upside down
      IMGFX(px, p => { const o = p.slice(); for (let i = 0; i < LG * LG; i++) p[i] = o[LG * LG - 1 - i]; });
      const cu = CURSORS2[cursorKind]; if (inp.inside && cu) SPR((x, y, k) => { if (x >= 0 && y >= 0 && x < LG && y < LG) px[y * LG + x] = k; }, cu, Math.round(inp.x * LG), Math.round(inp.y * LG), { K: 7, L: 12, A: 3 });
      LSHOW(px, K.pal, false);
    }
    // ---- Mandarin: cloisonne enamel. A plaque of gold wire cells filled with flat, glossy enamel: the drake mandarin
    // in its brightest colours (each colour its own cell, gold wire between them all), on a turquoise ground with gold
    // cloud scrolls, cobalt water laid with gold wave scrolls, a plum branch in flower, a gold rim. A gloss slides over
    // the enamel now and then. Tap the water and gold rings spread and the drake paddles over, a wake behind it (drag
    // along the water to lead it); tap the blossom and the petals come down onto the water; tap the drake and it opens
    // its bill and calls.
    // Its traits, the plaque's way: the sky's motif (Corner Doodle) in enamel, the medallion's colour (Window), its eyes,
    // its pose, what's in its bill, the friend on the water, the wire's hand, Inverted as a night enamel, the cursor.
    const EN = LEG === 'Mandarin' ? (() => {
      const W = 56, BACK = new Uint8Array(LG * LG), WIRE = hand === 'Very Shaky' ? 1 : hand === 'Shaky' ? 0.5 : 0;
      const put = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < LG && y < LG) BACK[y * LG + x] = k; };
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) {
        let k = 0;
        if (y >= W) {
          // the water: rows of wave scrolls, each a gold wire arc, cobalt and blue cells in turn
          const row = Math.floor((y - W) / 7), ry = (y - W) % 7, xo = x + (row % 2) * 7, cell = Math.floor(xo / 14), cx = xo % 14 - 7, r = Math.hypot(cx, ry - 7);
          k = Math.abs(r - 6.5) < 0.7 ? 5 : Math.abs(r - 3.8) < 0.6 ? 3 : 2;
        } else if (((x * 7 + y * 13) % 37) === 0) k = 16;            // an enamel pit here and there
        BACK[y * LG + x] = k;
      }
      // gold cloud scrolls on the sky
      for (const [cx, cy, s] of [[30, 16, 1], [54, 30, -1], [16, 38, 1]]) for (let k = 0; k < 40; k++) { const a = k / 40 * 6.283 * 1.6, r = 1 + k * 0.12; put(cx + Math.cos(a) * r * s, cy + Math.sin(a) * r * 0.7, 5); }
      // the sky's motif (Corner Doodle), in enamel with its wire
      const MOT = { Sun: () => { for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const r = Math.hypot(x, y); if (r < 7.5) put(72 + x, 18 + y, r > 6.6 ? 5 : 8); } },
        Moon: () => { for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const r = Math.hypot(x, y), r2 = Math.hypot(x - 3, y - 2); if (r < 7.5 && r2 > 5.5) put(72 + x, 18 + y, r > 6.6 || r2 < 6.3 ? 5 : 10); } } };
      const mt = MOT[doodle]; if (mt) mt(); else { const dd = DOODLES[doodle]; if (dd) for (const [ox, oy] of [[64, 12], [76, 20]]) SPRS(put, dd, ox, oy, { A: 8, B: 10, L: 7, K: 5 }); }
      // the plum branch, brown cells edged in gold, its flowers pink round white hearts
      for (const pts of [[[96, 6], [82, 12], [70, 12], [62, 18]], [[82, 12], [86, 22], [80, 28]]]) for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.ceil(Math.hypot(bx - ax, by - ay) * 2); for (let k = 0; k <= n; k++) { const x = ax + (bx - ax) * k / n, y = ay + (by - ay) * k / n; put(x, y - 1, 5); put(x, y, 15); put(x, y + 1, 15); put(x, y + 2, 5); } }
      const BLOS = [[76, 8], [68, 15], [88, 14], [84, 25], [62, 20], [92, 9]];
      for (const [bx, by] of BLOS) for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const r = Math.hypot(x, y); if (r < 3.4) put(bx + x, by + y, r > 2.7 ? 5 : r < 1.2 ? 10 : 13); }
      // the medallion in the window's colour, with a wire glyph; the maker's gold mark
      const THK = { Navy: 2, Teal: 12, Maroon: 8, Olive: 10, Graphite: 14, Plum: 11, 'Hot Dog': 9 }[theme] || 2;
      for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const r = Math.hypot(x, y); if (r < 7.5) put(13 + x, 14 + y, r > 6.5 ? 5 : (Math.abs(x) < 0.6 || Math.abs(y + x * 0.5) < 0.6) && r < 5 ? 5 : THK); }
      for (let y = 84; y < 91; y++) for (let x = 82; x < 89; x++) put(x, y, y === 84 || y === 90 || x === 82 || x === 88 || (x + y) % 3 === 0 ? 5 : 6);
      // the gold rim, its black enamel band
      for (let y = 0; y < LG; y++) for (let x = 0; x < LG; x++) { const d = Math.min(x, y, LG - 1 - x, LG - 1 - y); if (d < 2) BACK[y * LG + x] = d === 0 ? 6 : 5; else if (d < 4) BACK[y * LG + x] = 14; else if (d === 4) BACK[y * LG + x] = 5; }
      const pal = [[42, 168, 160], [72, 200, 188], [28, 60, 156], [58, 108, 212], [122, 168, 232], [240, 194, 74], [176, 132, 42], [246, 242, 226], [216, 52, 46], [240, 134, 42], [242, 204, 58], [122, 58, 160], [46, 154, 78], [244, 162, 178], [26, 22, 32], [138, 84, 40], [30, 138, 132], [20, 32, 74], [255, 255, 255]];
      const night = pal.map((p, i) => i === 0 ? [20, 32, 74] : i === 1 ? [36, 52, 104] : i === 16 ? [14, 22, 56] : p);
      return { BACK, W, WIRE, pal, night, px: new Uint8Array(LG * LG), dx: 0, tx: 0, rings: [], petalsAt: -9, callAt: -9, lastT: 0, vx: 0 };
    })() : null;
    // the drake's cells, facing left: the colour of each part (the wire is laid where two cells meet); open: its bill
    function drakeCell(x, y, open) {
      const W = EN.W, by = pose === 'Standing' ? 44 : pose === 'Swimming' ? 52 : 50, hx = 30, hy = by - 20;
      const body = ((x - 56) / 23) ** 2 + ((y - by + 1) / 11) ** 2 <= 1 && y < W + 3;
      const head = ((x - hx) / 9) ** 2 + ((y - hy) / 8.5) ** 2 <= 1;
      const crest = y < hy + 2 && x > hx - 2 && x < hx + 21 && y > hy - 10 + (x - hx) * 0.38 && y < hy - 1 + (x - hx) * 0.55;
      const neck = ((x - 36) / 5.5) ** 2 + ((y - (by - 11)) / 8) ** 2 <= 1;
      const bu = x < hx - 6 && x > hx - 16 && Math.abs(y - hy - 1 - (hx - 6 - x) * 0.1 + (open ? 1.2 : 0)) < 2 - (hx - 6 - x) * 0.1;
      const bl = x < hx - 6 && x > hx - 15 && Math.abs(y - hy - 3 - (hx - 6 - x) * (open ? 0.35 : 0.15)) < 1.4 - (hx - 6 - x) * 0.08;
      const sailUp = pose === 'Flapping' ? 8 : 0;
      const sail = x > 57 && x < 71 && y > by - 24 - sailUp + Math.abs(x - 64) * 1.15 && y < by - 7;
      const tail = x > 77 && x < 88 && y > by - 7 - (x - 77) * 0.6 && y < by + 1 - (x - 77) * 0.3;
      if (bu) return x < hx - 14 ? 7 : 8;
      if (bl) return 8;
      if (sail) return x < 64 ? 9 : 8;
      if (head || crest) { const stripe = Math.abs(y - (hy - 2 + (x - hx) * 0.38)) < 1.7 && x > hx - 4; if (stripe) return 7; if (y < hy - 2 + (x - hx) * 0.38) return x > hx + 6 ? 11 : 12; return x < hx - 1 ? 7 : 9; }
      if (neck && x < 43) return 9;
      if (tail) return 15;
      if (!body) return -1;
      const bx = 43 + (y - by) * 0.25;
      if (x < bx) return 11;
      if (x < bx + 6) return Math.floor((x - bx) / 3) % 2 ? 14 : 7;
      if (y < by - 4 + (x - 60) * 0.12) return 15;
      return y > by + 5 ? 7 : 9;
    }
    function enamelFrame(t) {
      const K = EN, inp = c.input, px = K.px, pr = lpress(inp, t), dt = Math.min(0.1, Math.max(0, t - K.lastT)); K.lastT = t;
      const [qx, qy] = lpt(inp), ox0 = Math.round(K.dx);
      if (pr.tap) {
        const onDuck = drakeCell(qx - ox0, qy, false) >= 0;
        if (qy < 30 && qx > 58) { K.petalsAt = t; [7, 12, 14, 19].forEach((d, i) => c.sound.note(root + 24 + d, { dur: 0.3, vel: 0.06, wave: 'sine', at: i * 0.09 })); }
        else if (onDuck) { K.callAt = t; c.sound.note(root + 26, { dur: 0.18, vel: 0.12, wave: 'sine', attack: 0.04 }); c.sound.note(root + 31, { dur: 0.3, vel: 0.12, wave: 'sine', attack: 0.05, at: 0.16 }); }
        else if (qy > K.W - 2) { K.rings.push([qx, qy, t]); if (K.rings.length > 6) K.rings.shift(); K.tx = Math.max(-20, Math.min(12, qx - 50)); c.sound.hit('blip', 0.2, { freq: 300 }); }
      }
      if (pr.drag && qy > K.W - 4) K.tx = Math.max(-20, Math.min(12, qx - 50));
      const v = Math.max(-14, Math.min(14, (K.tx - K.dx) * 2.5)); K.dx += v * dt; K.vx = v;
      const ox = Math.round(K.dx), bob = Math.sin(t * 1.6) > 0.3 ? 1 : 0, open = t - K.callAt < 0.7;
      px.set(K.BACK);
      // the drake: each pixel its cell's enamel, gold wire where cells meet and all round; its reflection below
      const cellAt = (x, y) => drakeCell(x - ox + Math.sin(y * 0.9) * K.WIRE * 0.5, y - bob, open);
      for (let y = 4; y < K.W + 4; y++) for (let x = 4; x < 92; x++) {
        const k = cellAt(x, y); if (k < 0) continue;
        const wire = cellAt(x + 1, y) !== k || cellAt(x, y + 1) !== k || cellAt(x - 1, y) < 0 || cellAt(x, y - 1) < 0;   // (one wire between two cells, and one all round)
        if (y >= K.W) continue;
        px[y * LG + x] = wire ? 5 : k;
        const ry = 2 * K.W - y + 1;
        if (ry < LG - 5 && ry > K.W && (ry - K.W) % 2 === 1 && ry - K.W < 16 && !wire) px[ry * LG + x + Math.round(Math.sin(ry + t * 3))] = k === 7 ? 4 : 3;
      }
      const by = pose === 'Standing' ? 44 : pose === 'Swimming' ? 52 : 50;
      if (pose === 'Standing') for (const lx of [50, 60]) for (let y = by + 10; y < K.W + 2; y++) px[y * LG + lx + ox] = 9;
      // a wake fanning out behind it while it swims
      if (Math.abs(K.vx) > 0.8) { const bx = (K.vx < 0 ? 84 : 24) + ox, dir = K.vx < 0 ? 1 : -1; for (let k = 0; k < 22; k++) for (const s of [-1, 1]) { const x = Math.round(bx + dir * k * 1.5), y = Math.round(K.W + 2 + (s > 0 ? k * 0.7 : -k * 0.1)); if (x >= 5 && x < LG - 6 && y < LG - 6 && y > K.W) { px[y * LG + x] = k < 4 ? 18 : 5; px[y * LG + x + 1] = k < 4 ? 18 : 5; px[(y + 1) * LG + x] = 6; } } }
      // its eye (Eyes), what's in its bill
      const ex = 28 + ox, ey = by - 22 + bob, P = (x, y, k) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < LG && y < LG) px[y * LG + x] = k; };
      const EY = { Star: ['.X.', 'XXX', '.X.'], Hearts: ['X.X', 'XXX', '.X.'], Googly: ['XXX', 'XWX', 'XXX'], Sleepy: ['XXX'], Happy: ['X.X', '.X.'], Angry: ['XX.', '.XX'], Dizzy: ['XX.', '.X.', '.XX'], Teary: ['XX', 'XX', '.T'], Lashes: ['XXX', 'XX.'] }[eyes] || ['XX', 'XW'];
      SPR(P, EY, ex - 1, ey - 1, { X: 14, W: 18, T: 4 });
      const ib = BILLS[inBill]; if (ib && !open) SPR(P, ib, 11 + ox, by - 19 + bob, { A: 8, B: 10, L: 7, K: 5 });
      const fr = FRIENDS[friend]; if (fr) SPR(P, fr, 12, K.W + 10, { A: 10, B: 9, L: 7, K: 5 });
      // the rings on the water
      for (const [rx, ry, rt] of K.rings) { const u = t - rt; if (u > 2.4) continue; for (const [dr, col] of [[0, 5], [1, 6], [-8, 5]]) { const r = u * 13 + dr; if (r < 1) continue; for (let a = 0; a < 120; a++) { const x = Math.round(rx + Math.cos(a / 120 * 6.283) * r), y = Math.round(ry + Math.sin(a / 120 * 6.283) * r * 0.32); if (y > K.W && x >= 5 && x < LG - 5 && y < LG - 5) px[y * LG + x] = col; } } }   // (bold gold wire rings, an inner one following)
      // petals: a few drifting always; after a tap, a flurry falling onto the water, each ringing it where it lands
      const pf = t - K.petalsAt, flurry = pf < 3.6, np = flurry ? 40 : 5;
      for (let k = 0; k < np; k++) {
        const u = flurry ? Math.min(1, pf * (0.38 + (k % 5) * 0.07)) : (t * 0.08 + k * 0.2) % 1, x = Math.round(84 - u * (26 + (k % 7) * 6) + Math.sin(t * 2 + k) * 2), y = Math.round(12 + u * (K.W - 8 + (k % 4) * 3));
        if (flurry && u >= 1) { const lt = pf - 1 / (0.38 + (k % 5) * 0.07); if (lt < 0.9) for (let a = 0; a < 24; a++) P(x + Math.cos(a / 24 * 6.283) * lt * 8, y + Math.sin(a / 24 * 6.283) * lt * 2.4, 5); P(x, y, 13); P(x + 1, y, 13); continue; }
        for (const [a, b] of [[0, -1], [-1, 0], [1, 0], [0, 1]]) P(x + a, y + b, 13); P(x, y, 10); P(x + 1, y + 1, 5);
      }
      // it calls: the bill open, and a little gold glyph rising
      if (open) { const u = t - K.callAt; SPR(P, ['.XXX', '.X.X', '.X.X', 'XX.X', 'XXXX', '...X'], 14 + ox - Math.round(u * 4), Math.round(by - 34 - u * 10), { X: 5 }); }
      // the gloss: a soft streak of light sliding over the enamel now and then
      // (a broad band in which every enamel shows its lighter twin)
      const gs = ((t * 0.22) % 2.2) * 150 - 50, LT = [1, 1, 3, 4, 7, 10, 5, 18, 13, 10, 7, 13, 1, 7, 15, 9, 0, 2, 18];
      for (let y = 5; y < LG - 5; y++) { const x0 = Math.round(gs - y * 0.6); for (let x = Math.max(5, x0); x < Math.min(LG - 5, x0 + 14); x++) px[y * LG + x] = LT[px[y * LG + x]]; }
      const cu = CURSORS2[cursorKind]; if (inp.inside && cu) SPRS((x, y, k) => { if (x >= 0 && y >= 0 && x < LG && y < LG) px[y * LG + x] = k; }, cu, Math.round(inp.x * LG), Math.round(inp.y * LG), { K: 14, L: 7, A: 5 });
      IMGFX(px, null);
      LSHOW(px, image === 'Inverted' ? K.night : K.pal);
    }
    // (a legendary never reaches the paint program below: frame() hands it to its own style first)
    const legTap = () => {}, legend = () => ({ done: true });
    let lastBuf = new Uint8Array(N * N), wasNear = false;
    function frame(t) {
      TT = t;
      if (LEG === 'Transparent') return xrayFrame(t);
      if (LEG === 'Phoenix') return tarotFrame(t);
      if (LEG === 'Mandarin') return enamelFrame(t);
      const inp = c.input;
      const gx = Math.floor(inp.x * N), gy = Math.floor(inp.y * N);
      for (const tp of inp.taps()) {
        const tx = Math.floor(tp.x * N), ty = Math.floor(tp.y * N);
        if (ty <= 3 && tx >= 49) {
          // a title-bar button: the window shuts and the duck is drawn again
          replayAt = t; user.length = 0;
          for (let i = 0; i < 4; i++) c.sound.note(root + MODE[8 - i * 2], { dur: 0.08, vel: 0.2, wave: 'triangle', at: i * 0.07 });
        } else if (ty >= 57 && tx >= 8 && tx <= 51) {
          picked = Math.max(0, Math.min(13, Math.floor((tx - 9) / 3))) + (ty >= 60 ? 14 : 0);
          c.sound.hit('blip', 0.25, { freq: 600 + picked * 40 });
        } else if (inCanvas(tx, ty) && LEG) {
          legTap(t, facing === 'Right' ? CX0 + CX1 - tx : tx, ty);
        } else if (goldEgg && Math.hypot((facing === 'Right' ? CX0 + CX1 - tx : tx) - EGX, (ty - EGY) * 0.75) < 8) {
          if (t - eggAt > 0.8) { eggAt = t; [0, 4, 7, 12].forEach((d, i) => c.sound.note(root + 24 + MODE[i * 2], { dur: 0.3, vel: 0.12, wave: 'triangle', at: i * 0.07 })); }
        } else if (inCanvas(tx, ty)) {
          const k = curColour();
          if (picked < 0) colourAt++;
          const under = buf[ty * N + tx];
          user.push({ type: 'fill', x: tx, y: ty, k });
          // how much it filled decides the note: big fields low, little gaps high
          const area = fill(tx, ty, k, true);
          const step = Math.max(0, Math.min(MODE.length - 1, 9 - Math.round(Math.log2(Math.max(1, area)) * 0.85)));
          c.sound.note(root + MODE[step], { dur: 0.16, vel: 0.3, wave: 'triangle' });
          if (pose !== 'Bottoms Up' && (under === headK || under === bodyK || under === FE[1])) {
            quackAt = t;
            c.sound.note(root + 3, { dur: 0.06, vel: 0.22, wave: 'sawtooth', cutoff: 1100, at: 0.04 });
            c.sound.note(root - 2, { dur: 0.1, vel: 0.2, wave: 'sawtooth', cutoff: 900, at: 0.11 });
          }
        }
      }
      if (!LEG && inp.inside && inp.down && gy > 4 && gy < 56 && t - lastSpray > 0.05) {
        lastSpray = t;
        const k = curColour(), d = [];
        for (let i = 0; i < 6; i++) { const a = sprayRand() * 6.283, rr = Math.sqrt(sprayRand()) * 3.2; d.push([gx + Math.cos(a) * rr, gy + Math.sin(a) * rr]); }
        user.push({ type: 'spray', d, k });
        if (user.length > 600) user.splice(0, 1);
        c.sound.hit('noise', 0.04, { cutoff: 2600, dur: 0.05 });
      }
      let n = nOps, done, legCur = null;
      buf.fill(WHITE);
      if (LEG) {
        // a legendary is its own painting (below), with its own way of being drawn in
        const r = legend(t, t - replayAt, t - legAt, inp, facing === 'Right' ? CX0 + CX1 - gx : gx, gy);
        done = r.done; legCur = r.cur;
      } else {
        n = Math.min(nOps, Math.floor((t - replayAt) / REPLAY * nOps) + 1);
        for (let i = 0; i < n; i++) { curOX = ops[i].ox; curOY = ops[i].oy; ops[i].fn(); }
        done = n >= nOps;
        curOX = 0; curOY = HDY;
        const ex = 25, ey = 22;
        const quack = pose !== 'Bottoms Up' && done && t - quackAt < 0.35;
        if (done && pose !== 'Bottoms Up' && ((t + blinkAt) % 4.2) < 0.16 && eyes !== 'Shades' && eyes !== 'Sleepy' && eyes !== 'Happy' && eyes !== 'Dizzy' && eyes !== 'Hearts') {
          for (let y = ey - 4; y <= ey + 4; y++) for (let x = ex - 4; x <= ex + 4; x++) if ((x - ex) ** 2 + (y - ey) ** 2 <= (eyes === 'Googly' || eyes === 'Glasses' ? 15 : 6)) dot(x, y, headK);
          line(ex - 3, ey, ex + 3, ey, BLACK);
        }
        if (quack) {
          for (let x = 7; x <= 19; x++) { const h = (19 - x) / 12 * 3; for (let y = Math.round(29 - h); y <= Math.round(29 + h * 0.6); y++) dot(x, y, BLACK); }
          dot(12, 29, PINK); dot(13, 29, PINK);
        }
        curOX = 0; curOY = 0;
      }
      if (facing === 'Right') flipX();
      if (done) imageMenu();
      for (const u of user) { if (u.type === 'fill') fill(u.x, u.y, u.k, true); else for (const p of u.d) dot(p[0], p[1], u.k); }
      lastBuf.set(buf);
      chrome(curColour());
      if (inp.inside) cursor(gx, gy, t);
      else if (!done) { const o = legCur ? { ax: legCur[0], ay: legCur[1] } : ops[n - 1]; cursor(facing === 'Right' ? CX0 + CX1 - o.ax : o.ax, o.ay, t); }
      else cursor(55 + Math.sin(t * 0.4) * 1.5, 46 + Math.cos(t * 0.3) * 1.5, t);
      const dd = img.data, inv = image === 'Inverted' && done;
      for (let i = 0, M = N * N; i < M; i++) {
        const p = P[buf[i]];
        let r = p[0], gg = p[1], b = p[2];
        if (inv) { const x = i % N, y = (i / N) | 0; if (inCanvas(x, y)) { r = 255 - r; gg = 255 - gg; b = 255 - b; } }
        dd[i * 4] = r; dd[i * 4 + 1] = gg; dd[i * 4 + 2] = b; dd[i * 4 + 3] = 255;
      }
      oc.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = false;
      g.drawImage(off, 0, 0, S, S);
    }
    frame(REPLAY + 1);
    return frame;
  },
});

})(window.Proto);
