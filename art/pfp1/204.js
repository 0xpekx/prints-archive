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
  recipe: 'A duck doodled with a mouse in an old desktop paint program, 64 dots across: jaggy one-dot outlines, the ellipse tool, bucket fills that stop at every line, spray-can speckle, all inside the program\'s window with its palette along the bottom. Pose, feathers, bill, what it carries in it, eyes, headwear, neckwear, a friend, the scene, a corner doodle, how steady the hand was, the window colours, the cursor and the odd Image-menu command (flip, skew, invert, tile, zoom) vary; about 1 in 375 is a legendary (a Transparent duck made of the see-through checkerboard of the program, a Phoenix of flame with embers rising for ever, or a Mandarin in full plumage), and about 1 in 200 sits by the coveted Golden Egg; each one is drawn again stroke by stroke, then it blinks and the cursor rests.',
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
    const FLAME = [16, 17, 27, 3, ORANGE, YEL];
    // a tap on a legendary itself: the ghost says boo, the phoenix burns and is drawn again from its ashes, the mandarin whistles
    function legendHit(tx, ty) {
      if (!LEG) return false;
      const x = facing === 'Right' ? CX0 + CX1 - tx : tx, i = ty * N + x;
      if (LEG === 'Transparent') return !!ghostMask[i];
      const k = lastBuf[ty * N + tx];
      if (LEG === 'Phoenix') return FLAME.includes(k) && ty > CY0 && x > 12 && x < 62;
      return [22, 13, 4, 7, ORANGE, WHITE].includes(k) && x > 14 && x < 56 && ty > 10 && ty < 56;
    }
    function legTap(t) {
      if (LEG === 'Transparent' && t - legAt > 1) {
        legAt = t;
        [12, 8, 3].forEach((d, i) => c.sound.note(root + d, { dur: 0.6, vel: 0.14, wave: 'sine', attack: 0.18, at: i * 0.22 }));
      } else if (LEG === 'Phoenix' && t - legAt > 3.4) {
        legAt = t;
        for (let i = 0; i < 6; i++) c.sound.hit('noise', 0.08, { cutoff: 900 + i * 300, dur: 0.12, at: i * 0.09 });
        MODE.slice(0, 8).forEach((d, i) => c.sound.note(root + d, { dur: 0.16, vel: 0.16, wave: 'triangle', at: 0.8 + i * 0.1 }));
        c.sound.note(root + 24, { dur: 0.8, vel: 0.14, wave: 'triangle', at: 1.65 });
      } else if (LEG === 'Mandarin' && t - legAt > 0.7) {
        legAt = t;
        c.sound.note(root + 26, { dur: 0.18, vel: 0.12, wave: 'sine', attack: 0.04 });
        c.sound.note(root + 31, { dur: 0.3, vel: 0.12, wave: 'sine', attack: 0.05, at: 0.16 });
        c.sound.note(root + 24, { dur: 0.25, vel: 0.1, wave: 'sine', at: 0.42 });
      }
    }
    let lastBuf = new Uint8Array(N * N), wasNear = false;
    function frame(t) {
      TT = t;
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
        } else if (inCanvas(tx, ty) && legendHit(tx, ty)) {
          legTap(t);
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
      if (inp.inside && inp.down && gy > 4 && gy < 56 && t - lastSpray > 0.05) {
        lastSpray = t;
        const k = curColour(), d = [];
        for (let i = 0; i < 6; i++) { const a = sprayRand() * 6.283, rr = Math.sqrt(sprayRand()) * 3.2; d.push([gx + Math.cos(a) * rr, gy + Math.sin(a) * rr]); }
        user.push({ type: 'spray', d, k });
        if (user.length > 600) user.splice(0, 1);
        c.sound.hit('noise', 0.04, { cutoff: 2600, dur: 0.05 });
      }
      // the phoenix burns for a moment, then is drawn again from the start
      const lt = t - legAt;
      if (LEG === 'Phoenix' && lt < 0.8) replayAt = t + 0.05;
      sailUp = LEG === 'Mandarin' && ((inp.inside && gy > 4 && gy < 56) || lt < 0.8) ? 1 : 0;
      const n = Math.min(nOps, Math.floor((t - replayAt) / REPLAY * nOps) + 1);
      buf.fill(WHITE);
      for (let i = 0; i < n; i++) { curOX = ops[i].ox; curOY = ops[i].oy; ops[i].fn(); }
      const done = n >= nOps;
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
      if (LEG === 'Transparent') {
        // the duck is the paint program's see-through checkerboard; touch it and even its outline fades
        const px = facing === 'Right' ? CX0 + CX1 - gx : gx;
        let near = false;
        if (inp.inside) for (let dy = -3; dy <= 3 && !near; dy++) for (let dx = -3; dx <= 3; dx++) { const yy = gy + dy, xx = px + dx; if (inCanvas(xx, yy) && ghostMask[yy * N + xx]) { near = true; break; } }
        if (near && !wasNear) c.sound.note(root + 19, { dur: 0.5, vel: 0.06, wave: 'sine', attack: 0.12 });
        wasNear = near;
        ghostMask.fill(0);
        const boo = lt < 0.5;
        for (let y = CY0; y <= CY1; y++) for (let x = CX0; x <= CX1; x++) {
          const i = y * N + x, k = buf[i];
          if (k !== 8 && k !== 9) continue;
          ghostMask[i] = 1;
          const ch = ((x >> 1) + (y >> 1)) & 1;
          buf[i] = boo ? WHITE : k === 8 ? (ch ? SILVER : WHITE) : (ch ? GREY : SILVER);
        }
        if (near && !boo) for (let y = CY0 + 1; y < CY1; y++) for (let x = CX0 + 1; x < CX1; x++) {
          const i = y * N + x;
          if (buf[i] === OUT && (ghostMask[i - 1] || ghostMask[i + 1] || ghostMask[i - N] || ghostMask[i + N])) buf[i] = ((x >> 1) + (y >> 1)) & 1 ? SILVER : WHITE;
        }
      }
      if (LEG === 'Phoenix' && (lt < 0.8 || inp.inside)) {
        // burning up, or embers gathering round the pointer
        const cnt = lt < 0.8 ? 260 : 10, cx = lt < 0.8 ? 33 : gx, cy = lt < 0.8 ? 34 : gy, r = lt < 0.8 ? 26 : 5;
        for (let i = 0; i < cnt; i++) { const a = sprayRand() * 6.283, rr = Math.sqrt(sprayRand()) * r, x = Math.round(cx + Math.cos(a) * rr), y = Math.round(cy + Math.sin(a) * rr * (lt < 0.8 ? 0.8 : 1) - (lt < 0.8 ? 0 : sprayRand() * 4)); if (inCanvas(x, y)) buf[y * N + x] = [RED, ORANGE, YEL, ORANGE][i & 3]; }
      }
      if (facing === 'Right') flipX();
      if (done) imageMenu();
      for (const u of user) { if (u.type === 'fill') fill(u.x, u.y, u.k, true); else for (const p of u.d) dot(p[0], p[1], u.k); }
      lastBuf.set(buf);
      chrome(curColour());
      if (inp.inside) cursor(gx, gy, t);
      else if (!done) { const o = ops[n - 1]; cursor(facing === 'Right' ? CX0 + CX1 - o.ax : o.ax, o.ay, t); }
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
