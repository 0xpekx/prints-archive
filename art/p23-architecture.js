// Set 3 · Architecture: rooms, streets, facades and plans, built cell by cell.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Architecture' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // Variety: a weighted pick from g.alt for a new trait; the opening variation always gets the first
  // value (the original look), so it never changes. list = [[value, weight], ...]
  const vary = (g, list) => { if (g.home) return list[0][0]; let tot = 0; for (const e of list) tot += e[1]; let r = g.alt() * tot; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
  // the name of the palette X.inks rolled (any order), or Rainbow for the native hue wheel
  const inkName = cols => { for (const p of U.PALETTES) { const s = p.cols.map(U.pk); if (s.length === cols.length && s.every(c => cols.includes(c))) return p.name; } return 'Rainbow'; };
  // an isometric box: (x, y) on the floor, z up, w x l x h; s = half a tile's width in cells
  function isoBox(g, ox, oy, s, x, y, z, w, l, h, top, left, right) {
    const px = (a, b, c) => [ox + (a - b) * s, oy + (a + b) * s / 2 - c * s];
    const p = (a, b, c) => px(a, b, c);
    const A = p(x, y, z + h), B = p(x + w, y, z + h), C = p(x + w, y + l, z + h), D = p(x, y + l, z + h), E = p(x + w, y + l, z), F = p(x, y + l, z), G = p(x + w, y, z);
    X.poly(g, [...D, ...C, ...E, ...F], left);
    X.poly(g, [...C, ...B, ...G, ...E], right);
    X.poly(g, [...A, ...B, ...C, ...D], top);
  }

  // the order cells wither in when a cover of ivy dies back: top first, scattered (no R)
  const witherOrder = n => Float32Array.from({ length: n * n }, (_, i) => 0.7 * (((i * 2654435761) >>> 0) % 10007) / 10007 + 0.3 * ((i / n) | 0) / n);

  add({
    name: 'Sunlit Room', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'An isometric room furnished from the dice. A window throws a patch of light that slides across the floorboards and up the furniture as the day turns.',
    make(R, U, g) {
      const framing = g.trait('Framing', vary(g, [['Whole room', 3], ['Close', 1.4], ['Far', 1.2]]));
      const { n, d } = g, s = n / (framing === 'Close' ? 10.5 : framing === 'Far' ? 20 : 15), ox = n / 2, oy = n * (framing === 'Close' ? 0.27 : framing === 'Far' ? 0.42 : 0.36), inks = X.inks(R, 5, 0.4);
      let wall = X.mixPk(inks[0], X.rgb(230, 220, 200), 0.6), floor = X.mixPk(inks[1], X.rgb(150, 100, 60), 0.6);
      const items = [];
      for (let k = 0; k < R.int(4, 7); k++) { const w = R.int(1, 3), l = R.int(1, 3); items.push({ x: R.int(0, 8 - w), y: R.int(0, 8 - l), w, l, h: R.pick([0.6, 1, 1.5, 2.5]), c: inks[R.int(0, inks.length - 1)] }); }
      // furniture never stands inside other furniture (the dice still roll the same; overlapping pieces are left out),
      // and its colours are toned toward the room's warm light so the pieces belong together
      for (let i = items.length - 1; i > 0; i--) if (items.slice(0, i).some(o => o.x < items[i].x + items[i].w && items[i].x < o.x + o.w && o.y < items[i].y + items[i].l && items[i].y < o.y + o.l)) items.splice(i, 1);
      for (const q of items) q.c = X.mixPk(q.c, X.rgb(196, 168, 130), 0.3);
      items.sort((a, b) => (a.x + a.y) - (b.x + b.y));
      const win = R.int(2, 5);
      // traits: the floor, the walls, the light, which wall the window is in, how much furniture
      const floorK = g.trait('Floor', vary(g, [['Boards', 3], ['Tiles', 1.3], ['Rug', 1.3], ['Carpet', 1]])), wallK = g.trait('Walls', vary(g, [['Plain', 3], ['Stripes', 1.3], ['Pictures', 1.3]]));
      const lightK = g.trait('Light', vary(g, [['Afternoon', 3], ['Morning', 1.2], ['Golden hour', 1.2], ['Moonlight', 1]])), flip = g.trait('Window', vary(g, [['Left', 3], ['Right', 2]])) === 'Right';
      g.trait('Furniture', items.length); g.trait('Palette', inkName(inks));
      const dim = lightK === 'Moonlight' ? 0.5 : 1, warm = lightK === 'Golden hour' ? 0.16 : 0;
      if (dim < 1 || warm) { const tone = c => X.mixPk(X.shade(c, dim), X.rgb(255, 150, 80), warm); wall = tone(wall); floor = tone(floor); for (const q of items) q.c = tone(q.c); }
      const frameC = X.mixPk(wall, WHITE, 0.55), glass = lightK === 'Moonlight' ? X.rgb(40, 60, 110) : lightK === 'Golden hour' ? X.rgb(255, 200, 140) : X.rgb(170, 220, 255);
      const sunC = { Afternoon: X.rgb(255, 236, 170), Morning: X.rgb(226, 240, 255), 'Golden hour': X.rgb(255, 180, 100), Moonlight: X.rgb(150, 176, 255) }[lightK];
      const rugC = X.mixPk(inks[inks.length - 1], X.rgb(150, 60, 50), 0.4), voidC = lightK === 'Moonlight' ? X.rgb(6, 6, 12) : X.rgb(14, 12, 20);
      // the shaft of light: the hull of the window and its patch on the floor
      const hull = pts => { pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); const lo = [], up = []; for (const p of pts) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); } for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); } return lo.slice(0, -1).concat(up.slice(0, -1)).flat(); };
      return (t) => {
        d.fill(voidC);
        const sun = (t * 0.05) % 1, lx = 8 - sun * 10, ly = win - 1 + sun * 6;
        const P2 = (a, b, c) => [ox + (a - b) * s, oy + (a + b) * s / 2 - c * s];
        X.poly(g, [...P2(0, 0, 0), ...P2(8, 0, 0), ...P2(8, 8, 0), ...P2(0, 8, 0)], floor);
        if (floorK === 'Boards' || floorK === 'Rug') for (let k = 1; k < 8; k++) X.line(g, ...P2(k, 0, 0), ...P2(k, 8, 0), X.shade(floor, 0.85));
        else if (floorK === 'Tiles') for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) if ((a + b) & 1) X.poly(g, [...P2(a, b, 0), ...P2(a + 1, b, 0), ...P2(a + 1, b + 1, 0), ...P2(a, b + 1, 0)], X.mixPk(floor, WHITE, 0.25));
        if (floorK === 'Rug') { X.poly(g, [...P2(1.5, 2, 0), ...P2(6.5, 2, 0), ...P2(6.5, 6.5, 0), ...P2(1.5, 6.5, 0)], rugC); X.poly(g, [...P2(2, 2.5, 0), ...P2(6, 2.5, 0), ...P2(6, 6, 0), ...P2(2, 6, 0)], X.mixPk(rugC, WHITE, 0.2)); X.poly(g, [...P2(2.5, 3, 0), ...P2(5.5, 3, 0), ...P2(5.5, 5.5, 0), ...P2(2.5, 5.5, 0)], rugC); }
        X.poly(g, [...P2(0, 0, 0), ...P2(0, 0, 5), ...P2(8, 0, 5), ...P2(8, 0, 0)], X.shade(wall, 0.9));
        X.poly(g, [...P2(0, 0, 0), ...P2(0, 0, 5), ...P2(0, 8, 5), ...P2(0, 8, 0)], wall);
        if (wallK === 'Stripes') { for (let k = 0.5; k < 8; k += 1) { X.line(g, ...P2(k, 0, 0), ...P2(k, 0, 5), X.shade(wall, 0.84)); X.line(g, ...P2(0, k, 0), ...P2(0, k, 5), X.shade(wall, 0.92)); } }
        else if (wallK === 'Pictures') for (const [a, w, z0, z1, c] of [[1.5, 1.6, 2.4, 4, inks[2]], [4.5, 2.2, 2.6, 3.8, inks[3 % inks.length]]]) { X.poly(g, [...P2(a, 0, z0), ...P2(a + w, 0, z0), ...P2(a + w, 0, z1), ...P2(a, 0, z1)], X.shade(frameC, 0.45)); X.poly(g, [...P2(a + 0.25, 0, z0 + 0.25), ...P2(a + w - 0.25, 0, z0 + 0.25), ...P2(a + w - 0.25, 0, z1 - 0.25), ...P2(a + 0.25, 0, z1 - 0.25)], X.mixPk(X.shade(c, dim), wall, 0.3)); }
        X.line(g, ...P2(0, 8, 5), ...P2(0, 0, 5), X.shade(wall, 1.12)); X.line(g, ...P2(0, 0, 5), ...P2(8, 0, 5), X.shade(wall, 1.0));
        X.line(g, ...P2(0, 0, 0), ...P2(0, 0, 5), X.shade(wall, 0.75));   // the corner in shade
        X.poly(g, [...P2(0, win, 1.5), ...P2(0, win, 4), ...P2(0, win + 2, 4), ...P2(0, win + 2, 1.5)], glass);
        // the window's frame, its cross of glazing bars and the sill
        X.line(g, ...P2(0, win, 4), ...P2(0, win + 2, 4), frameC); X.line(g, ...P2(0, win, 1.5), ...P2(0, win + 2, 1.5), frameC);
        X.line(g, ...P2(0, win, 1.5), ...P2(0, win, 4), frameC); X.line(g, ...P2(0, win + 2, 1.5), ...P2(0, win + 2, 4), frameC);
        X.line(g, ...P2(0, win + 1, 1.5), ...P2(0, win + 1, 4), frameC); X.line(g, ...P2(0, win, 2.75), ...P2(0, win + 2, 2.75), frameC);
        X.line(g, ...P2(0.3, win - 0.1, 1.45), ...P2(0.3, win + 2.1, 1.45), X.shade(frameC, 0.85));
        X.poly(g, [...P2(lx, ly, 0), ...P2(lx + 2.4, ly, 0), ...P2(lx + 2.4, ly + 2, 0), ...P2(lx, ly + 2, 0)], (x, y) => X.mixPk(d[y * n + x], sunC, 0.45));
        if (lx > -2.4 && ly < 8) X.poly(g, hull([P2(0, win, 4), P2(0, win + 2, 4), P2(0, win, 1.5), P2(0, win + 2, 1.5), P2(lx, ly, 0), P2(lx + 2.4, ly, 0), P2(lx + 2.4, ly + 2, 0), P2(lx, ly + 2, 0)]), (x, y) => X.dith4(x, y) < 0.3 ? X.mixPk(d[y * n + x], sunC, 0.16) : d[y * n + x]);
        for (const q of items) {
          const lit = q.x < lx + 2.4 && q.x + q.w > lx && q.y < ly + 2 && q.y + q.l > ly ? 1.25 : 1;
          isoBox(g, ox, oy, s, q.x, q.y, 0, q.w, q.l, q.h, X.shade(q.c, 1.15 * lit), X.shade(q.c, 0.8 * lit), X.shade(q.c, 0.6 * lit));
          // crisp lit edges along the front of each top
          const hi = X.mixPk(X.shade(q.c, 1.15 * lit), WHITE, 0.3);
          X.line(g, ...P2(q.x, q.y + q.l, q.h), ...P2(q.x + q.w, q.y + q.l, q.h), hi); X.line(g, ...P2(q.x + q.w, q.y + q.l, q.h), ...P2(q.x + q.w, q.y, q.h), hi);
        }
        if (flip) for (let y = 0; y < n; y++) { const o = y * n; for (let a = 0, b = n - 1; a < b; a++, b--) { const v = d[o + a]; d[o + a] = d[o + b]; d[o + b] = v; } }
      };
    },
  });

  // city palettes: ground, road, kerb, park, tree, concrete, roofs..., window lit, window dark
  const CITIES = [
    { name: 'day', ground: [196, 188, 170], road: [72, 74, 82], line: [230, 210, 120], park: [96, 168, 80], tree: [52, 120, 60], wall: [214, 206, 190], roofs: [[200, 92, 70], [90, 130, 180], [230, 220, 200], [120, 120, 130], [210, 170, 90]], lit: [150, 200, 240], dark: [70, 90, 120], night: false },
    { name: 'night', ground: [30, 30, 40], road: [14, 14, 20], line: [90, 80, 50], park: [20, 50, 34], tree: [12, 34, 24], wall: [52, 52, 70], roofs: [[70, 70, 96], [90, 60, 80], [60, 80, 100], [100, 100, 120]], lit: [255, 214, 110], dark: [24, 24, 34], night: true },
    { name: 'dusk', ground: [150, 110, 120], road: [50, 40, 60], line: [250, 180, 100], park: [80, 110, 80], tree: [40, 70, 50], wall: [200, 150, 140], roofs: [[230, 120, 90], [120, 90, 150], [250, 200, 140], [90, 70, 110]], lit: [255, 220, 140], dark: [90, 60, 90], night: true },
    { name: 'sim', ground: [120, 170, 90], road: [90, 90, 96], line: [240, 240, 240], park: [70, 150, 60], tree: [30, 100, 40], wall: [236, 232, 220], roofs: [[230, 70, 60], [60, 120, 220], [250, 200, 60], [240, 240, 240], [120, 200, 220]], lit: [180, 230, 255], dark: [80, 110, 140], night: false },
  ];
  add({
    name: 'Boomtown', seed: 2, sizes: [50], fps: 12,
    interactive: 'Click a lot to build it taller.',
    recipe: 'A city seen from above and a little to the south, block by block in chunky pixels: lots fill with buildings that rise floor by floor, their windows lighting up, while cars run the streets and old blocks are knocked down and built again higher. Day, night, dusk or toy-town palettes; click a lot to build it taller.',
    make(R, U, g) {
      const { n, d } = g, P0 = R.pick(CITIES), C = a => X.rgb(a[0], a[1], a[2]), B = R.pick([12, 12, 16]), road = 3;
      const ground = C(P0.ground), roadC = C(P0.road), line = C(P0.line), park = C(P0.park), tree = C(P0.tree), wall = C(P0.wall), roofs = P0.roofs.map(C), lit = C(P0.lit), dark = C(P0.dark);
      const lots = [], cars = [];
      for (let by = 0; by < n; by += B) for (let bx = 0; bx < n; bx += B) {
        const sub = R.pick([1, 2, 2]), w = Math.floor((B - road) / sub);
        for (let j = 0; j < sub; j++) for (let i = 0; i < sub; i++) {
          const q = { x: bx + road + i * w, y: by + road + j * w, w: w - (sub > 1 ? 1 : 0), d: w - (sub > 1 ? 1 : 0), h: 0, max: R.pick([2, 3, 4, 6, 8, 10]), roof: R.pick(roofs), park: R.bool(0.12), when: R() * 12, seed: R.int(0, 999) };
          if (R() < 0.5) q.h = R.range(0.4, 1) * q.max;
          lots.push(q);
        }
      }
      const lanes = Math.ceil(n / B);
      for (let k = 0; k < lanes * 3; k++) cars.push({ hor: R.bool(), lane: R.int(0, lanes - 1) * B + 1, p: R() * n, v: R.range(0.25, 0.7) * R.sign(), c: R.pick([X.rgb(240, 70, 60), X.rgb(250, 220, 90), X.rgb(80, 160, 240), WHITE, X.rgb(60, 60, 70)]) });
      // traits: the palette, the block size, and the town's plan: a plain grid, a river through it, or a seafront
      g.trait('Palette', { day: 'Day', night: 'Night', dusk: 'Dusk', sim: 'Toy town' }[P0.name]); g.trait('Blocks', B === 12 ? 'Small' : 'Large');
      const plan = g.trait('Plan', vary(g, [['Grid', 3], ['River', 1.3], ['Seafront', 1.3]])), water = P0.night ? X.rgb(22, 36, 64) : X.rgb(70, 130, 190), waterHi = X.mixPk(water, WHITE, 0.3), sandC = X.mixPk(ground, X.rgb(240, 220, 160), 0.6);
      const riverY = plan === 'River' ? (1 + Math.floor(g.alt() * (Math.ceil(n / B) - 1))) * B : -1, coastY = plan === 'Seafront' ? Math.round(n * 0.72) : n;
      if (plan === 'Seafront') for (let i = lots.length - 1; i >= 0; i--) if (lots[i].y + lots[i].d > coastY - 1) lots.splice(i, 1);
      g.trait('Parks', lots.filter(q => q.park).length);
      let timer = 0;
      return (t, dt) => {
        for (const tp of g.input.taps()) { const q = lots.find(l => tp.x * n >= l.x && tp.x * n < l.x + l.w && tp.y * n >= l.y - l.h - 2 && tp.y * n < l.y + l.d); if (q) { q.park = false; q.max = Math.min(16, Math.max(q.max, Math.floor(q.h)) + 3); q.when = 0; } }
        timer += dt;
        if (timer > 4) { timer = 0; const q = R.pick(lots); if (q.h >= q.max) { q.h = 0; q.max = Math.min(16, q.max + R.int(1, 4)); q.when = t + 1; q.roof = R.pick(roofs); } }
        d.fill(ground);
        for (let y = 0; y < n; y += B) X.rect(g, 0, y, n, road, roadC);
        if (riverY > 0) { X.rect(g, 0, riverY - 1, n, road + 2, water); for (let x = ((t * 2) | 0) % 5; x < n; x += 5) X.put(g, x, riverY + 1, waterHi); }   // the river, crossed by bridges
        for (let x = 0; x < n; x += B) X.rect(g, x, 0, road, n, roadC);
        if (riverY > 0) for (let x = 0; x < n; x += B) { X.put(g, x - 1, riverY - 1, X.shade(roadC, 0.6)); X.put(g, x + road, riverY - 1, X.shade(roadC, 0.6)); X.put(g, x - 1, riverY + road, X.shade(roadC, 0.6)); X.put(g, x + road, riverY + road, X.shade(roadC, 0.6)); }
        const dash = X.mixPk(roadC, line, 0.6);
        for (let y = 0; y < n; y += B) for (let x = 0; x < n; x += 4) X.put(g, x, y + 1, dash);
        for (let x = 0; x < n; x += B) for (let y = 0; y < n; y += 4) X.put(g, x + 1, y, dash);
        for (const c of cars) { c.p = (c.p + c.v + n) % n; if (c.hor) { if (c.lane === riverY + 1) continue; X.rect(g, c.p, c.lane - (c.v > 0 ? 1 : 0), 2, 1, c.c); } else X.rect(g, c.lane - (c.v > 0 ? 0 : 1), c.p, 1, 2, c.c); }
        if (coastY < n) { X.rect(g, 0, coastY, n, 2, sandC); X.rect(g, 0, coastY + 2, n, n - coastY - 2, water); for (let y = coastY + 3; y < n; y += 3) for (let x = (y * 3 + ((t * 2) | 0)) % 6; x < n; x += 6) X.put(g, x, y, waterHi); }
        for (const q of lots) {   // back to front, so nearer buildings hide the ones behind
          if (t > q.when && q.h < q.max) q.h = Math.min(q.max, q.h + dt * 1.5);
          if (q.park) { X.rect(g, q.x, q.y, q.w, q.d, park); for (let k = 0; k < 3; k++) { const tx = q.x + 1 + ((q.seed * (k + 3)) % Math.max(1, q.w - 2)), ty = q.y + 1 + ((q.seed * (k + 7)) % Math.max(1, q.d - 2)); X.rect(g, tx, ty, 2, 2, tree); X.put(g, tx, ty, X.shade(tree, 1.5)); } continue; }
          const h = Math.floor(q.h), top = q.y - h, building = q.h < q.max;
          X.rect(g, q.x + q.w, q.y + 1, Math.min(2, Math.ceil(h / 3)), q.d - 1, X.shade(ground, 0.7));
          if (h > 0) {   // the south face: walls with rows of windows
            X.rect(g, q.x, top + q.d, q.w, h, building ? X.mixPk(wall, X.rgb(240, 180, 60), 0.25) : X.shade(wall, P0.night ? 1 : 0.85));
            for (let fy = 0; fy < h; fy += 2) for (let fx = 1; fx < q.w - 1; fx += 2) X.put(g, q.x + fx, top + q.d + fy, ((q.seed + fx * 7 + fy * 13 + (P0.night ? Math.floor(t * 0.3) * (fx + fy) : 0)) % 5) < (P0.night ? 2 : 3) ? lit : dark);
          }
          X.rect(g, q.x, top, q.w, q.d, building ? X.rgb(150, 140, 120) : q.roof);
          X.rect(g, q.x, top, q.w, 1, X.mixPk(building ? X.rgb(150, 140, 120) : q.roof, WHITE, 0.35));
          if (building && h > 1) { X.rect(g, q.x, top, 1, q.d, X.rgb(240, 200, 60)); X.put(g, q.x + q.w - 1, top - 2, X.rgb(240, 200, 60)); X.rect(g, q.x + q.w - 1, top - 2, 1, 2, X.rgb(240, 200, 60)); }
          else if (h > 5 && q.w > 3) X.rect(g, q.x + 1, top + 1, 2, 1, X.shade(q.roof, 0.7));
        }
      };
    },
  });

  const STONES = { '150,140,120': 'Sandstone', '170,120,100': 'Brick', '120,130,140': 'Granite', '200,190,170': 'Limestone', '90,84,96': 'Slate' };
  add({
    name: 'Overgrown', seed: 3, sizes: [100], fps: 12,
    interactive: 'Click the ruin to plant a new shoot.',
    recipe: 'A ruined arcade of round or pointed arches. Ivy, autumn creeper or wisteria climbs from the ground cell by cell, hugging the masonry, flowering here and there, until the ruin is covered and it starts again. Stone, sky and season change with every variation; click to plant a new shoot.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, stone = new Uint8Array(n * n), ivy = new Uint8Array(n * n), tips = [], st = R.pick([[150, 140, 120], [170, 120, 100], [120, 130, 140]]), leaf0 = X.hsbPk(R.range(22, 38), 70, 70), flower = X.inks(R, 3, 0.6);
      let leaf = leaf0;
      const arches = R.int(2, 4), aw = n / arches;
      g.trait('Arches', arches); g.trait('Arch', 'Round'); g.trait('Stone', STONES[st.join()]);
      // the original path varies too, from g.alt: the sky behind the ruin and what climbs it
      const ogSky = g.trait('Sky', vary(g, [['Dusk', 3], ['Day', 1.2], ['Night', 1], ['Sunset', 1.2]])), climber = g.trait('Climber', vary(g, [['Ivy', 3], ['Autumn creeper', 1.3], ['Wisteria', 1.2]]));
      const OGS = { Dusk: [[40, 50, 80], [240, 180, 140]], Day: [[120, 180, 230], [230, 240, 250]], Night: [[10, 12, 30], [60, 50, 110]], Sunset: [[60, 30, 80], [250, 150, 90]] }[ogSky], skyTop = X.rgb(...OGS[0]), skyLow = X.rgb(...OGS[1]);
      if (climber === 'Autumn creeper') leaf = X.hsbPk(2 + g.alt() * 8, 70, 85); else if (climber === 'Wisteria') leaf = X.hsbPk(72 + g.alt() * 8, 70, 55);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const k = Math.floor(x / aw), cx = (k + 0.5) * aw, r = aw * 0.32, top = n * 0.38;
        const inside = Math.abs(x - cx) < r && (y > top || Math.hypot(x - cx, y - top) < r);
        const crumble = y < n * 0.14 + 6 * Math.abs(Math.sin(x * 0.21 + k)) && y < n * 0.3;
        stone[y * n + x] = !inside && !crumble && y < n - 6 ? 1 : 0;
      }
      let age = 0;
      const mine = [], wither = witherOrder(n);
      const sprout = () => tips.push({ x: R.int(0, n - 1), y: n - 7 });
      for (let k = 0; k < 8; k++) sprout();
      return (t) => {
        // when the ruin is covered the ivy dies back over a few seconds, top first, and starts again
        const fall = ++age > 1200 ? (age - 1200) / 40 : 0;
        if (fall) for (let i = 0; i < n * n; i++) if (ivy[i] && wither[i] < fall) ivy[i] = 0;
        if (age > 1240) { ivy.fill(0); tips.length = 0; age = 0; for (let k = 0; k < 8; k++) sprout(); mine.length = 0; }
        // shoots the viewer plants grow on their own list from g.alt, so R is untouched
        for (const tp of g.input.taps()) if (mine.length < 40) mine.push({ x: Math.round(tp.x * (n - 1)), y: Math.round(tp.y * (n - 1)) });
        for (let s = 0; s < 6; s++) for (let i = mine.length - 1; i >= 0; i--) {
          const q = mine[i], opts = [];
          for (const [dx, dy] of [[0, -1], [0, -1], [1, 0], [-1, 0], [1, -1], [-1, -1], [0, 1]]) {
            const x = q.x + dx, y = q.y + dy; if (x < 0 || y < 0 || x >= n || y >= n || ivy[y * n + x]) continue;
            let near = 0; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) near += stone[(y + b) * n + x + a] || 0;
            if (near || y >= n - 7) opts.push([x, y]);
          }
          if (!opts.length) { mine.splice(i, 1); continue; }
          const [x, y] = opts[Math.floor(g.alt() * opts.length)]; ivy[y * n + x] = g.alt() < 0.03 ? 2 : 1; q.x = x; q.y = y;
          if (g.alt() < 0.02 && mine.length < 40) mine.push({ x, y });
        }
        for (let s = 0; s < 6; s++) for (let i = tips.length - 1; i >= 0; i--) {
          const q = tips[i], opts = [];
          for (const [dx, dy] of [[0, -1], [0, -1], [1, 0], [-1, 0], [1, -1], [-1, -1], [0, 1]]) {
            const x = q.x + dx, y = q.y + dy; if (x < 0 || y < 0 || x >= n || y >= n || ivy[y * n + x]) continue;
            let near = 0; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) near += stone[(y + b) * n + x + a] || 0;
            if (near || y >= n - 7) opts.push([x, y]);
          }
          if (!opts.length) { tips.splice(i, 1); continue; }
          const [x, y] = R.pick(opts); ivy[y * n + x] = R() < 0.03 ? 2 : 1; q.x = x; q.y = y;
          if (R() < 0.02 && tips.length < 40) tips.push({ x, y });
        }
        if (tips.length < 3) sprout();
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, v = ivy[i];
          let c = y >= n - 6 ? X.rgb(50, 60, 40) : stone[i] ? X.rgb(st[0] * (0.85 + 0.15 * (((x >> 2) + (y >> 1)) & 1)), st[1], st[2]) : X.mixPk(skyTop, skyLow, y / n);
          if (stone[i] && (y % 5 === 0 || (x + (((y / 5) | 0) & 1) * 4) % 8 === 0)) c = X.shade(c, 0.75);
          if (v) c = v === 2 ? flower[(x + y) % 3] : X.shade(leaf, 0.75 + 0.35 * ((x * 7 + y * 3) % 5) / 5);
          d[i] = c;
        }
      };
    }, function alt(R, U, g) {
      const SKY = [[[40, 50, 80], [240, 180, 140]], [[120, 180, 230], [230, 240, 250]], [[10, 12, 30], [60, 50, 110]], [[60, 30, 80], [250, 150, 90]]], sk = R.pick(SKY), skyA = X.rgb(...sk[0]), skyB = X.rgb(...sk[1]);
      const season = R.pick([[22, 38, 70], [22, 38, 70], [2, 10, 85], [72, 80, 55]]);
      const { n, d } = g, stone = new Uint8Array(n * n), ivy = new Uint8Array(n * n), tips = [], st = R.pick([[150, 140, 120], [170, 120, 100], [120, 130, 140], [200, 190, 170], [90, 84, 96]]), leaf = X.hsbPk(R.range(season[0], season[1]), 70, season[2]), flower = X.inks(R, 3, 0.6);
      const arches = R.int(2, 4), aw = n / arches, pointed = R.bool(0.4);
      g.trait('Arches', arches); g.trait('Arch', pointed ? 'Pointed' : 'Round'); g.trait('Stone', STONES[st.join()]); g.trait('Climber', ['Ivy', 'Ivy', 'Autumn creeper', 'Wisteria'][['22,38,70', '22,38,70', '2,10,85', '72,80,55'].indexOf(season.join())]); g.trait('Sky', ['Dusk', 'Day', 'Night', 'Sunset'][SKY.indexOf(sk)]);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const k = Math.floor(x / aw), cx = (k + 0.5) * aw, r = aw * 0.32, top = n * 0.38;
        const inside = Math.abs(x - cx) < r && (y > top || (pointed ? Math.hypot(Math.abs(x - cx) + r * 0.5, y - top) < r * 1.5 : Math.hypot(x - cx, y - top) < r));
        const crumble = y < n * 0.14 + 6 * Math.abs(Math.sin(x * 0.21 + k)) && y < n * 0.3;
        stone[y * n + x] = !inside && !crumble && y < n - 6 ? 1 : 0;
      }
      let age = 0;
      const sprout = () => tips.push({ x: R.int(0, n - 1), y: n - 7 }), wither = witherOrder(n);
      for (let k = 0; k < 8; k++) sprout();
      return (t) => {
        for (const tp of g.input.taps()) if (tips.length < 50) tips.push({ x: Math.round(tp.x * (n - 1)), y: Math.round(tp.y * (n - 1)) });
        const fall = ++age > 1200 ? (age - 1200) / 40 : 0;
        if (fall) for (let i = 0; i < n * n; i++) if (ivy[i] && wither[i] < fall) ivy[i] = 0;
        if (age > 1240) { ivy.fill(0); tips.length = 0; age = 0; for (let k = 0; k < 8; k++) sprout(); }
        for (let s = 0; s < 6; s++) for (let i = tips.length - 1; i >= 0; i--) {
          const q = tips[i], opts = [];
          for (const [dx, dy] of [[0, -1], [0, -1], [1, 0], [-1, 0], [1, -1], [-1, -1], [0, 1]]) {
            const x = q.x + dx, y = q.y + dy; if (x < 0 || y < 0 || x >= n || y >= n || ivy[y * n + x]) continue;
            let near = 0; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) near += stone[(y + b) * n + x + a] || 0;
            if (near || y >= n - 7) opts.push([x, y]);
          }
          if (!opts.length) { tips.splice(i, 1); continue; }
          const [x, y] = R.pick(opts); ivy[y * n + x] = R() < 0.03 ? 2 : 1; q.x = x; q.y = y;
          if (R() < 0.02 && tips.length < 40) tips.push({ x, y });
        }
        if (tips.length < 3) sprout();
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, v = ivy[i];
          let c = y >= n - 6 ? X.rgb(50, 60, 40) : stone[i] ? X.rgb(st[0] * (0.85 + 0.15 * (((x >> 2) + (y >> 1)) & 1)), st[1], st[2]) : X.mixPk(skyA, skyB, Math.floor(y / n * 6) / 6);
          if (stone[i] && (y % 5 === 0 || (x + (((y / 5) | 0) & 1) * 4) % 8 === 0)) c = X.shade(c, 0.75);
          if (v) c = v === 2 ? flower[(x + y) % 3] : X.shade(leaf, 0.75 + 0.35 * ((x * 7 + y * 3) % 5) / 5);
          d[i] = c;
        }
      };
    }),
  });

  add({
    name: 'Lancets', seed: 4, sizes: [100], fps: 10,
    recipe: 'Three pointed cathedral windows of stained glass, leaded into small panes. Light passes across them from one side to the other, and each pane brightens as it is reached.',
    make(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 6, 0.4), pane = new Int32Array(n * n).fill(-1), cols = [], lv = [];
      const W = n / 3.6, gap = (n - 3 * W) / 4;
      for (let k = 0; k < 3; k++) {
        const x0 = gap + k * (W + gap), x1 = x0 + W, top = n * 0.2, cx = (x0 + x1) / 2;
        for (let y = 0; y < n * 0.92; y++) for (let x = Math.floor(x0); x < x1; x++) {
          let inside = y > top + W * 0.5 || (Math.hypot(x - x0, y - (top + W * 0.5)) < W && Math.hypot(x - x1, y - (top + W * 0.5)) < W && y > top - W * 0.4);
          if (!inside) continue;
          const id = k * 1000 + Math.floor((x - x0) / (W / 4)) * 50 + Math.floor((y + ((Math.floor((x - x0) / (W / 4))) & 1) * 3) / 7);
          pane[y * n + x] = id;
          if (cols[id] === undefined) cols[id] = inks[R.int(0, inks.length - 1)];
        }
      }
      return (t) => {
        const sx = ((t * 0.06) % 1.4 - 0.2) * n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, p = pane[i];
          if (p < 0) { d[i] = X.rgb(36 + (y >> 4 & 1) * 6, 32, 30); continue; }
          const lead = x > 0 && pane[i - 1] !== p || y > 0 && pane[i - n] !== p;
          if (lead) { d[i] = X.rgb(20, 18, 22); continue; }
          const q = (x - sx - (n - y) * 0.3) / (n * 0.17), light = q * q < 4 ? Math.round(4 * Math.max(0, 1 - q * q / 4)) : 0;
          d[i] = lv[p * 5 + light] || (lv[p * 5 + light] = X.mixPk(X.shade(cols[p], 0.45), X.mixPk(cols[p], WHITE, 0.25), light / 4));
        }
      };
    },
  });

  const hueName = h => ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Teal', 'Cyan', 'Blue', 'Indigo', 'Violet', 'Magenta', 'Rose'][Math.floor((((h % 100) + 100) % 100) / 100 * 12) % 12];
  add({
    name: 'Tenement', seed: 5, sizes: [100], fps: 10,
    interactive: 'Click a room to switch its lamp.',
    recipe: 'A tall house cut open like a doll’s house: rooms papered in a family of related colours, furniture in silhouette, lamps going on one by one as evening comes and pools of warm light on the walls, and tiny tenants walking the floors and taking the stairs. Brick, stucco or timber, gable or flat roof, and the time of day change with every variation; click a room to switch its lamp.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, floors = 6, fh = 14, x0 = 8, x1 = n - 8, y0 = n - 4 - floors * fh, well = R.bool() ? x0 + 1 : x1 - 11, inks = X.inks(R, 6, 0.4);
      const rooms = [], hue = g.alt() * 100, spread = 8 + g.alt() * 14, night = X.rgb(20, 24, 60);   // colours only: wallpapers in one family of hues
      for (let f = 0; f < floors; f++) { let x = x0; while (x < x1) { const w = Math.min(x1 - x, R.int(16, 34)); rooms.push({ f, x, w, c: (R.int(0, inks.length - 1), X.hsbPk(hue + (g.alt() * 2 - 1) * spread, 30 + g.alt() * 25, 70 + g.alt() * 16)), lamp: R() }); x += w; } }
      const people = Array.from({ length: 9 }, () => ({ f: R.int(0, floors - 1), x: R.range(x0 + 2, x1 - 4), v: R.range(0.15, 0.4) * R.sign(), c: X.hsbPk(R.range(0, 100), 70, 70), climb: 0, dir: 1 }));
      g.trait('Floors', floors); g.trait('Facade', 'Brick'); g.trait('Roof', 'Gable'); g.trait('Wallpaper', hueName(hue)); g.trait('Tenants', people.length); g.trait('Stairs', well < n / 2 ? 'Left' : 'Right');
      return (t) => {
        for (const tp of g.input.taps()) for (const r of rooms) { const y = y0 + r.f * fh; if (tp.x * n >= r.x && tp.x * n < r.x + r.w && tp.y * n >= y && tp.y * n < y + fh) r.force = r.force ? -r.force : 0.5 + 0.5 * Math.sin(t * 0.08) > r.lamp * 0.8 + 0.1 ? -1 : 1; }
        const eve = 0.5 + 0.5 * Math.sin(t * 0.08);
        for (let y = 0; y < n; y++) d.fill(X.mixPk(X.rgb(140, 190, 230), X.rgb(14, 16, 40), eve * (0.6 + 0.4 * y / n)), y * n, y * n + n);
        X.poly(g, [x0 - 4, y0, n / 2, y0 - 18, x1 + 4, y0], X.rgb(110, 50, 40));
        for (const r of rooms) {
          const y = y0 + r.f * fh, on = r.force ? r.force > 0 : eve > r.lamp * 0.8 + 0.1;
          X.rect(g, r.x, y, r.w, fh, on ? r.c : X.mixPk(X.shade(r.c, 0.75 - 0.35 * eve), night, 0.55 * eve));
          if (on) X.disc(g, r.x + (r.w >> 1), y + 2, Math.min(r.w * 0.45, fh * 0.8), (xx, yy) => yy >= y && yy < y + fh - 2 && xx > r.x && xx < r.x + r.w ? X.mixPk(d[yy * n + xx], X.rgb(255, 236, 170), 0.3) : d[yy * n + xx]);
          X.rect(g, r.x, y + fh - 2, r.w, 2, X.rgb(90, 60, 40));
          X.rect(g, r.x, y, 1, fh - 2, X.rgb(60, 50, 50));
          if (on) X.rect(g, r.x + (r.w >> 1) - 1, y + 1, 3, 2, X.rgb(255, 240, 180));
        }
        for (let f = 0; f < floors; f++) { const y = y0 + f * fh; X.rect(g, well, y, 10, fh - 2, X.rgb(50, 46, 56)); for (let k = 0; k < 6; k++) X.rect(g, well + 2 + k, y + fh - 3 - k * 2, 2, 1, X.rgb(150, 130, 110)); }
        X.rect(g, x0 - 2, y0, 2, floors * fh, X.rgb(80, 40, 36)); X.rect(g, x1, y0, 2, floors * fh, X.rgb(80, 40, 36));
        X.rect(g, 0, n - 4, n, 4, X.rgb(40, 40, 44));
        for (const p of people) {
          if (p.climb > 0) {
            p.climb -= 1;
            const k = 1 - p.climb / fh, base = y0 + p.f * fh + fh - 6, y = base - p.dir * k * fh;
            X.rect(g, well + 2 + Math.round(k * 6), y, 2, 4, p.c); X.put(g, well + 2 + Math.round(k * 6), y - 1, X.rgb(240, 200, 170));
            if (p.climb <= 0) { p.f -= p.dir; p.x = well + 6; }
            continue;
          }
          p.x += p.v; if (p.x < x0 + 2 || p.x > x1 - 4) p.v = -p.v;
          if (Math.abs(p.x - well - 5) < 0.6 && R() < 0.4) { p.dir = p.f === 0 ? -1 : p.f === floors - 1 ? 1 : R.sign(); p.climb = fh; continue; }
          const y = y0 + p.f * fh + fh - 6;
          X.rect(g, p.x, y, 2, 4, p.c); X.put(g, p.x, y - 1, X.rgb(240, 200, 170));
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, floors = R.int(4, 6), fh = Math.floor((n - 26) / floors), x0 = 10, x1 = n - 10, y0 = n - 5 - floors * fh, stairRight = R.bool(), well = stairRight ? x1 - 11 : x0 + 1;
      const hue = R.range(0, 100), spread = R.pick([8, 14, 22]), skin = R.pick(['brick', 'stucco', 'timber']), roofKind = R.pick(['gable', 'gable', 'flat', 'mansard']);
      const outer = skin === 'brick' ? X.rgb(132, 58, 44) : skin === 'stucco' ? X.hsbPk(hue + 50, 30, 75) : X.rgb(96, 64, 40), outerD = X.shade(outer, 0.7);
      const roofC = skin === 'timber' ? X.rgb(60, 44, 40) : X.rgb(70, 74, 92), floorC = X.rgb(112, 74, 44), floorL = X.rgb(150, 104, 64);
      const rooms = [];
      for (let f = 0; f < floors; f++) {
        let x = x0;
        while (x < x1) {
          const w = Math.min(x1 - x, R.int(16, 30)), h = hue + R.range(-spread, spread), sat = R.range(30, 55), val = R.range(68, 86);
          rooms.push({ f, x, w: x1 - x - w < 10 ? x1 - x : w, wall: X.hsbPk(h, sat, val), wallD: X.hsbPk(h, sat * 0.7, val * 0.32), pat: R.int(0, 3), lamp: R(), force: 0, furn: R.pick(['bed', 'sofa', 'table', 'shelf', 'piano']) });
          x += rooms[rooms.length - 1].w;
        }
      }
      const night = X.rgb(14, 16, 40), day = X.hsbPk(R.pick([55, 58, 8, 75]), 35, 90), speed = R.range(0.05, 0.11), people = Array.from({ length: R.int(5, 11) }, () => ({ f: R.int(0, floors - 1), x: R.range(x0 + 2, x1 - 4), v: R.range(0.15, 0.4) * R.sign(), c: X.hsbPk(R.range(0, 100), 65, 75), climb: 0, dir: 1 }));
      const stars = Array.from({ length: 30 }, () => [R.int(0, n - 1), R.int(0, y0 - 10)]);
      g.trait('Floors', floors); g.trait('Facade', skin === 'brick' ? 'Brick' : skin === 'stucco' ? 'Stucco' : 'Timber'); g.trait('Roof', { gable: 'Gable', flat: 'Flat', mansard: 'Mansard' }[roofKind]); g.trait('Wallpaper', hueName(hue)); g.trait('Tenants', people.length); g.trait('Stairs', stairRight ? 'Right' : 'Left');
      const furniture = (r, y, c) => {
        const cx = r.x + Math.floor(r.w * 0.55), base = y + fh - 3;
        if (r.furn === 'bed') { X.rect(g, cx - 5, base - 3, 10, 3, c); X.rect(g, cx - 5, base - 5, 2, 2, c); }
        else if (r.furn === 'sofa') { X.rect(g, cx - 5, base - 3, 10, 3, c); X.rect(g, cx - 5, base - 5, 10, 2, c); }
        else if (r.furn === 'table') { X.rect(g, cx - 4, base - 4, 8, 1, c); X.rect(g, cx - 3, base - 3, 1, 3, c); X.rect(g, cx + 2, base - 3, 1, 3, c); }
        else if (r.furn === 'shelf') { X.rect(g, cx - 2, base - 8, 5, 8, c); }
        else { X.rect(g, cx - 4, base - 5, 8, 5, c); X.rect(g, cx - 4, base - 6, 8, 1, X.shade(c, 0.6)); }
      };
      return (t) => {
        const eve = 0.5 - 0.5 * Math.cos(t * speed + 1.2);
        for (const tp of g.input.taps()) for (const r of rooms) { const y = y0 + r.f * fh; if (tp.x * n >= r.x && tp.x * n < r.x + r.w && tp.y * n >= y && tp.y * n < y + fh) r.force = r.force === 0 ? (eve > r.lamp * 0.8 + 0.1 ? -1 : 1) : -r.force; }
        for (let y = 0; y < n; y++) { const u = Math.floor((eve * 0.8 + 0.2 * y / n) * 6) / 6; d.fill(X.mixPk(day, night, u), y * n, y * n + n); }
        if (eve > 0.55) for (const [sx, sy] of stars) X.put(g, sx, sy, X.mixPk(night, WHITE, (eve - 0.55) * 2));
        // the shell: walls either side, the roof
        X.rect(g, x0 - 4, y0 - 1, x1 - x0 + 8, floors * fh + 1, outer);
        if (skin === 'brick') for (let y = y0; y < y0 + floors * fh; y += 2) for (let x = x0 - 4 + (y % 4 ? 0 : 2); x < x1 + 4; x += 4) X.put(g, x, y, outerD);
        if (skin === 'timber') for (let y = y0; y < y0 + floors * fh; y += fh) X.rect(g, x0 - 4, y, x1 - x0 + 8, 1, outerD);
        if (roofKind === 'gable') X.poly(g, [x0 - 7, y0, n / 2, y0 - 16, x1 + 7, y0], roofC);
        else if (roofKind === 'mansard') X.poly(g, [x0 - 6, y0, x0 + 2, y0 - 10, x1 - 2, y0 - 10, x1 + 6, y0], roofC);
        else { X.rect(g, x0 - 6, y0 - 4, x1 - x0 + 12, 4, roofC); X.rect(g, x1 - 14, y0 - 10, 4, 6, outerD); }
        X.rect(g, x0 - 7, y0 - 1, x1 - x0 + 14, 1, X.shade(roofC, 0.7));
        for (const r of rooms) {
          const y = y0 + r.f * fh, on = r.force ? r.force > 0 : eve > r.lamp * 0.8 + 0.1, lightK = Math.min(1, 0.55 + (1 - eve) * 0.6);
          const base = on ? r.wall : X.mixPk(r.wallD, X.shade(r.wall, lightK), 1 - eve);
          X.rect(g, r.x, y, r.w, fh - 2, base);
          if (r.pat === 1) for (let xx = r.x + 2; xx < r.x + r.w; xx += 3) X.rect(g, xx, y, 1, fh - 2, X.shade(base, 0.92));
          else if (r.pat === 2) for (let yy = y + 1; yy < y + fh - 2; yy += 3) for (let xx = r.x + 1 + (yy % 2); xx < r.x + r.w; xx += 4) X.put(g, xx, yy, X.shade(base, 0.9));
          else if (r.pat === 3) X.rect(g, r.x, y + fh - 6, r.w, 1, X.shade(base, 0.8));
          if (on) {   // the lamp and its pool of light
            const lx = r.x + (r.w >> 1);
            X.disc(g, lx, y + 2, Math.min(r.w * 0.45, fh * 0.8), (x, yy) => yy >= y && yy < y + fh - 2 && x > r.x && x < r.x + r.w ? X.mixPk(d[yy * n + x], X.rgb(255, 236, 170), 0.3) : d[yy * n + x]);
            X.rect(g, lx - 1, y, 3, 1, X.rgb(90, 80, 70)); X.rect(g, lx - 1, y + 1, 3, 2, X.rgb(255, 240, 180));
          }
          furniture(r, y, X.shade(base, 0.55));
          X.rect(g, r.x, y + fh - 2, r.w, 2, floorC); X.rect(g, r.x, y + fh - 2, r.w, 1, floorL);
          X.rect(g, r.x, y, 1, fh - 2, X.shade(r.wallD, 0.8));
        }
        for (let f = 0; f < floors; f++) { const y = y0 + f * fh; X.rect(g, well, y, 10, fh - 2, X.rgb(46, 40, 50)); for (let k = 0; k < 6; k++) X.rect(g, well + (stairRight ? 8 - k : 2 + k), y + fh - 3 - k * 2, 2, 1, X.rgb(160, 130, 100)); }
        X.rect(g, 0, n - 5, n, 5, X.rgb(48, 46, 50)); X.rect(g, 0, n - 5, n, 1, X.rgb(90, 88, 92));
        for (const p of people) {
          const head = X.rgb(240, 200, 170);
          if (p.climb > 0) {
            p.climb -= 1;
            const k = 1 - p.climb / fh, y = y0 + p.f * fh + fh - 7 - p.dir * k * fh, x = stairRight ? well + 8 - Math.round(k * 6) : well + 2 + Math.round(k * 6);
            X.rect(g, x, y, 2, 4, p.c); X.put(g, x, y - 1, head);
            if (p.climb <= 0) { p.f -= p.dir; p.x = well + 5; }
            continue;
          }
          p.x += p.v; if (p.x < x0 + 2 || p.x > x1 - 4) p.v = -p.v;
          if (Math.abs(p.x - well - 5) < 0.6 && R() < 0.4) { p.dir = p.f === 0 ? -1 : p.f === floors - 1 ? 1 : R.sign(); p.climb = fh; continue; }
          const y = y0 + p.f * fh + fh - 7;
          X.rect(g, p.x, y, 2, 4, p.c); X.put(g, p.x, y - 1, head); X.put(g, p.x + (p.v > 0 ? 1 : 0), y - 1, head);
        }
      };
    }),
  });

  // Scaffold: the far city behind the site (from g.alt, so R is untouched), and a lattice crane
  function siteBack(g, skyAt, kind = 'City') {
    const { n } = g, back = new Uint32Array(n * n);
    for (let y = 0; y < n; y++) back.fill(skyAt(y), y * n, y * n + n);
    const far = X.mixPk(skyAt(n - 8), X.rgb(60, 62, 84), 0.32), farLit = X.mixPk(far, X.rgb(255, 230, 170), 0.35);
    if (kind === 'City') for (let x = 0; x < n;) {
      const w = 3 + Math.floor(g.alt() * 7), h = Math.round(n * (0.06 + 0.16 * g.alt()));
      for (let y = n - 6 - h; y < n - 6; y++) for (let xx = x; xx < Math.min(n, x + w - 1); xx++) back[y * n + xx] = (xx - x) % 2 === 1 && (y - (n - 6 - h)) % 3 === 1 && ((xx * 7 + y * 3) % 5 === 0) ? farLit : far;
      x += w;
    }
    else if (kind === 'Hills') { const p1 = g.alt() * 9, p2 = g.alt() * 9; for (let x = 0; x < n; x++) { const h1 = n * (0.16 + 0.06 * Math.sin(x * 0.05 + p1)), h2 = n * (0.08 + 0.04 * Math.sin(x * 0.09 + p2)); for (let y = Math.round(n - 6 - h1); y < n - 6; y++) back[y * n + x] = y > n - 6 - h2 ? X.mixPk(far, X.rgb(60, 90, 60), 0.35) : X.mixPk(far, skyAt(y), 0.35); } }
    else if (kind === 'Harbour') { const sea = X.mixPk(skyAt(n - 8), X.rgb(40, 80, 120), 0.5); for (let y = n - 14; y < n - 6; y++) for (let x = 0; x < n; x++) back[y * n + x] = (x * 5 + y * 3) % 11 === 0 ? X.mixPk(sea, WHITE, 0.3) : sea; for (let k = 0, x = Math.floor(g.alt() * 20); k < 4 && x < n; k++, x += 18 + Math.floor(g.alt() * 14)) { for (let y = n - 30; y < n - 14; y++) back[y * n + x] = far; for (let xx = x - 6; xx < x + 4; xx++) if (xx >= 0 && xx < n) back[(n - 30) * n + xx] = far; } }
    return back;
  }
  // a finished neighbour tower painted into the backdrop: (x, w, h) in cells
  function neighbour(g, back, x0, w, h, clad) {
    const { n } = g, top = n - 6 - h, lit = X.rgb(255, 220, 140), dark = X.shade(clad, 0.55);
    for (let y = top; y < n - 6; y++) for (let x = x0; x < Math.min(n, x0 + w); x++) if (x >= 0) back[y * n + x] = (x - x0) % 4 >= 2 && (y - top) % 4 >= 1 && x < x0 + w - 1 ? ((x * 7 + y * 13) % 9 === 0 ? lit : dark) : clad;
    for (let x = x0; x < x0 + w; x++) if (x >= 0 && x < n) back[(top - 1) * n + x] = X.shade(clad, 0.8);
  }
  function crane(g, mast, ground, mtop, jib, hook, loadY, loadC, t, dir = 1) {
    const yel = X.rgb(240, 200, 60), dk = X.rgb(170, 130, 30), sway = Math.sin(t * 1.3) * 1.2;
    for (let y = Math.round(mtop); y <= ground; y++) { X.put(g, mast, y, (y % 3) === 0 ? dk : yel); X.put(g, mast + 1, y, (y % 3) === 1 ? dk : yel); }
    X.line(g, mast - jib * dir, mtop, mast + 9 * dir, mtop, yel);
    for (let x = Math.round(Math.min(mast - jib * dir, mast + 9 * dir)); x <= Math.max(mast - jib * dir, mast + 9 * dir); x++) X.put(g, x, mtop + 1, (x % 3) === 0 ? yel : dk);
    X.line(g, mast, mtop - 4, mast - jib * 0.6 * dir, mtop, dk); X.line(g, mast + 1, mtop - 4, mast + 9 * dir, mtop, dk);   // the ties over the top
    X.rect(g, dir > 0 ? mast + 5 : mast - 8, mtop + 2, 4, 3, X.rgb(96, 96, 104));   // counterweight
    X.rect(g, dir > 0 ? mast - 2 : mast + 1, mtop + 2, 3, 3, X.rgb(60, 70, 90)); X.put(g, dir > 0 ? mast - 2 : mast + 3, mtop + 3, X.rgb(190, 220, 240));   // the cab and its window
    X.rect(g, hook - 1, mtop + 2, 3, 1, dk);   // trolley
    X.line(g, hook, mtop + 2, hook + sway, loadY, X.rgb(40, 40, 40));
    X.rect(g, hook + sway - 3, loadY, 6, 2, loadC); X.rect(g, hook + sway - 3, loadY + 2, 6, 1, X.shade(loadC, 0.6));
  }
  // one site, shared by both paths: the tower rising floor by floor in its scaffold, cranes, the fade at top-out
  function site(g, o) {
    const { n, d } = g, { floors, fh, w, x0, ground, inks, clad, back, shape, cranes } = o;
    let built = 0, clock = 0;
    const width = f => shape === 'Setback' ? (f >= floors * 0.8 ? Math.round(w * 0.5) : f >= floors * 0.55 ? Math.round(w * 0.75) : w) : shape === 'Tapered' ? Math.round(w * (1 - 0.45 * f / floors)) : w;
    return (t, dt) => {
      clock += dt;
      if (clock > 1.2) { clock = 0; built++; if (built > floors + 4) built = 0; }
      d.set(back);
      X.rect(g, 0, ground, n, n - ground, X.rgb(70, 60, 50)); X.rect(g, 0, ground, n, 1, X.rgb(96, 84, 70));
      const top = ground - Math.min(built, floors) * fh, ftop = Math.max(0, Math.min(built, floors) - 1), wt = width(ftop), xt = x0 + ((w - wt) >> 1);
      for (let f = 0; f < Math.min(built, floors); f++) {
        const y = ground - (f + 1) * fh, wf = width(f), xf = x0 + ((w - wf) >> 1);
        X.rect(g, xf, y, wf, fh, clad);
        if (f < built - 2) for (let x = xf + 2; x < xf + wf - 2; x += 4) X.rect(g, x, y + 2, 2, fh - 4, (x * 7 + f * 3) % 5 === 0 ? X.rgb(255, 220, 140) : X.shade(inks[0], 0.6));
      }
      const st = X.rgb(230, 170, 40);
      for (let y = ground; y >= top - fh; y -= fh) X.line(g, xt - 3, y, xt + wt + 3, y, st);
      for (let x = xt - 3; x <= xt + wt + 3; x += Math.max(4, fh)) X.line(g, x, ground, x, top - fh, st);
      // a topped-out tower fades into the haze before the next site begins
      if (built > floors + 3) { const k = U.clamp(clock / 1.2); for (let y = Math.max(0, Math.floor(top - fh * 2)); y < ground; y++) for (let x = Math.max(0, x0 - 4); x < Math.min(n, x0 + w + 5); x++) { const i = y * n + x; d[i] = X.mixPk(d[i], back[i], k); } }
      const mast = Math.round(x0 + w + 8), mtop = Math.round(Math.min(top - fh * 2, ground - n * 0.75));
      const jib = n * 0.5, sw = Math.sin(t * 0.5) * 0.5 + 0.5, hook = Math.round(mast - jib * (0.3 + 0.6 * sw));
      if (cranes === 2) { const m2 = Math.round(x0 - 10), j2 = n * 0.32, h2 = Math.round(m2 + j2 * (0.4 + 0.5 * (Math.sin(t * 0.37 + 2) * 0.5 + 0.5))); if (m2 > 2) crane(g, m2, ground, mtop - 6, j2, h2, top - fh * 2.5, inks[2 % inks.length], t + 1.7, -1); }
      crane(g, mast, ground, mtop, jib, hook, top - fh * 1.5, inks[1], t);
      if (o.flip) for (let y = 0; y < n; y++) { const r = y * n; for (let a = 0, b = n - 1; a < b; a++, b--) { const v = d[r + a]; d[r + a] = d[r + b]; d[r + b] = v; } }
    };
  }
  // traits for a site, all from g.alt; the opening variation keeps a plain block in the city with one crane
  function siteTraits(g, floors) {
    const shape = g.trait('Building', vary(g, [['Block', 3], ['Setback', 1.4], ['Tapered', 1.2]])), backdrop = g.trait('Backdrop', vary(g, [['City', 3], ['Hills', 1.2], ['Harbour', 1.2], ['Open', 0.8]]));
    const cranes = g.trait('Cranes', vary(g, [[1, 3], [2, 1.5]])), next = g.trait('Neighbour', vary(g, [['None', 3], ['Tower', 1.5]])); g.trait('Floors', floors);
    const flip = g.trait('Crane side', vary(g, [['Right', 3], ['Left', 2]])) === 'Left';
    return { shape, backdrop, cranes, next, flip };
  }

  add({
    name: 'Scaffold', seed: 6, sizes: [100, 200], fps: 12,
    recipe: 'A tower going up inside its scaffolding: a crane swings loads into place, each floor is boxed in, glazed and lit, and when the tower tops out a new site begins.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, floors = R.int(9, 14), fh = Math.floor(n * 0.7 / floors), w = Math.floor(n * R.range(0.3, 0.42)), x0 = Math.floor(n * 0.3), ground = n - 6, inks = X.inks(R, 3, 0.4), sky = X.hsbPk(R.range(50, 65), 40, 85);
      const T = siteTraits(g, floors), clad = X.rgb(120, 120, 128);
      const skyK = g.trait('Sky', vary(g, [['Haze', 3], ['Dusk', 1.2], ['Night', 1.2], ['Overcast', 1]])); g.trait('Cladding', 'Concrete');
      const OS = { Dusk: [[90, 60, 140], [255, 160, 110]], Night: [[16, 20, 50], [60, 70, 120]], Overcast: [[200, 220, 230], [240, 240, 240]] }[skyK];
      const back = siteBack(g, OS ? y => X.mixPk(X.rgb(...OS[0]), X.rgb(...OS[1]), Math.floor(y / n * 6) / 6) : y => X.mixPk(sky, X.rgb(255, 210, 170), y / n), T.backdrop);
      if (T.next === 'Tower') neighbour(g, back, x0 > n * 0.26 ? Math.round(n * 0.04) : Math.round(x0 + w + 20), Math.round(n * 0.18), Math.round(n * (0.4 + 0.15 * g.alt())), X.rgb(100, 106, 120));
      return site(g, { floors, fh, w, x0, ground, inks, clad, back, shape: T.shape, cranes: T.cranes, flip: T.flip });
    }, function alt(R, U, g) {
      const { n, d } = g, floors = R.int(9, 14), fh = Math.floor(n * 0.7 / floors), w = Math.floor(n * R.range(0.3, 0.42)), x0 = Math.floor(n * R.range(0.15, 0.35)), ground = n - 6, inks = X.inks(R, 3, 0.4);
      const SK = [[[150, 200, 240], [255, 230, 190]], [[90, 60, 140], [255, 160, 110]], [[16, 20, 50], [60, 70, 120]], [[200, 220, 230], [240, 240, 240]]], sk = R.pick(SK), sky = X.rgb(...sk[0]), skyB = X.rgb(...sk[1]), clad = R.pick([[120, 120, 128], [80, 120, 150], [170, 150, 120], [60, 60, 70]]);
      const T = siteTraits(g, floors);
      g.trait('Sky', ['Day', 'Dusk', 'Night', 'Overcast'][SK.indexOf(sk)]); g.trait('Cladding', ['Concrete', 'Blue glass', 'Sandstone', 'Dark steel'][['120,120,128', '80,120,150', '170,150,120', '60,60,70'].indexOf(clad.join())]);
      const back = siteBack(g, y => X.mixPk(sky, skyB, Math.floor(y / n * 6) / 6), T.backdrop);
      if (T.next === 'Tower') neighbour(g, back, x0 > n * 0.26 ? Math.round(n * 0.04) : Math.round(x0 + w + 20), Math.round(n * 0.18), Math.round(n * (0.4 + 0.15 * g.alt())), X.mixPk(X.rgb(...clad), skyB, 0.25));
      return site(g, { floors, fh, w, x0, ground, inks, clad: X.rgb(...clad), back, shape: T.shape, cranes: T.cranes, flip: T.flip });
    }),
  });

  add({
    name: 'Suspension', seed: 7, sizes: [100], fps: 12,
    recipe: 'A suspension bridge strung across a bay at dusk: the main cable sags between two towers, hangers drop to the deck, and the whole span shivers in the water beneath.',
    make(R, U, g) {
      const view = g.trait('Viewpoint', vary(g, [['Level', 3], ['From the hill', 1.3], ['From the water', 1.3]])), VP = view === 'From the hill' ? [0.5, 0.36, 0.07] : view === 'From the water' ? [0.8, 0.6, 0.24] : [0.66, 0.5, 0.16];
      const { n, d } = g, wl = Math.round(n * VP[0]), deck = Math.round(n * VP[1]), ttop = n * VP[2], inks = X.inks(R, 3, 0.5), sky = [X.shade(inks[0], 0.45), X.mixPk(inks[1], WHITE, 0.3)], steel = R.pick([X.rgb(220, 60, 40), X.rgb(40, 40, 50), X.rgb(240, 240, 230)]);
      const scene = new Uint32Array(n * n), G = { n, d: scene };
      // hand-picked dusks, zenith to horizon (the rolled inks still set the sequence; g.alt picks the sky)
      const DUSK = [[[24, 22, 64], [250, 150, 90]], [[18, 28, 66], [240, 190, 130]], [[50, 24, 74], [255, 120, 100]], [[12, 18, 40], [110, 140, 190]], [[36, 48, 96], [250, 206, 150]], [[60, 30, 50], [250, 170, 120]]];
      const di = Math.floor(g.alt() * DUSK.length), dk = DUSK[di]; sky[0] = X.rgb(...dk[0]); sky[1] = X.rgb(...dk[1]);
      // traits: the kind of bridge, how its towers stand, the far shore, the sun or moon, a ferry, the sky and the steel
      const kind = g.trait('Bridge', vary(g, [['Suspension', 3], ['Cable-stayed', 1.5], ['Arch', 1.3]])), span = g.trait('Span', vary(g, [['Wide', 3], ['Narrow', 1.2], ['Off-centre', 1.2]]));
      const shoreK = g.trait('Far shore', vary(g, [['Lights', 3], ['City', 1.4], ['Hills', 1.2]])), orb = g.trait('Sun', vary(g, [['Setting', 3], ['Moonrise', 1.2], ['Gone', 1]])), ferry = g.trait('Ferry', vary(g, [['None', 3], ['Crossing', 1.5]]));
      g.trait('Sky', ['Ember', 'Gold', 'Rose', 'Blue hour', 'Peach', 'Plum'][di]); g.trait('Steel', ['Red', 'Black', 'White'][[X.rgb(220, 60, 40), X.rgb(40, 40, 50), X.rgb(240, 240, 230)].indexOf(steel)]);
      const T1 = span === 'Narrow' ? n * 0.3 : span === 'Off-centre' ? n * 0.14 : n * 0.22, T2 = span === 'Narrow' ? n * 0.7 : span === 'Off-centre' ? n * 0.62 : n * 0.78;
      for (let y = 0; y < wl; y++) for (let x = 0; x < n; x++) { const v = y / wl * 6, b = Math.floor(v + (X.dith4(x, y) - 0.5) * 0.5); scene[y * n + x] = X.mixPk(sky[0], sky[1], U.clamp(b / 6)); }
      // the low sun sitting on the water, and the far shore with its first lights
      const sunX = n * (0.3 + 0.4 * g.alt()), sunR = n * 0.075, sunC = X.mixPk(sky[1], WHITE, 0.55);
      if (orb === 'Setting') X.disc(G, sunX, wl, sunR, (x, y) => y < wl - 2 ? (X.dith4(x, y) < 0.15 && Math.hypot(x + 0.5 - sunX, y + 0.5 - wl) > sunR - 1 ? X.mixPk(sunC, sky[1], 0.5) : sunC) : scene[y * n + x]);
      else if (orb === 'Moonrise') { const my = wl * 0.42, mr = n * 0.045; X.disc(G, sunX, my, mr, X.mixPk(sky[0], X.rgb(240, 236, 220), 0.85)); X.disc(G, sunX + mr * 0.5, my - mr * 0.3, mr * 0.85, (x, y) => scene[y * n + x] === X.mixPk(sky[0], X.rgb(240, 236, 220), 0.85) ? X.mixPk(sky[0], sky[1], 0.2) : scene[y * n + x]); }
      const shore = X.mixPk(sky[0], sky[1], 0.25);
      if (shoreK === 'Lights') for (let x = 0; x < n; x++) { const h = 1 + ((x * 7) % 5 === 0 ? 1 : 0) + (Math.sin(x * 0.13) > 0.4 ? 1 : 0); for (let y = wl - 1 - h; y < wl; y++) scene[y * n + x] = shore; if (x % 6 === 3) scene[(wl - 1) * n + x] = X.rgb(255, 214, 140); }
      else if (shoreK === 'City') for (let x = 0; x < n;) { const w = 2 + Math.floor(g.alt() * 5), h = 2 + Math.floor(g.alt() * n * 0.1); for (let y = wl - h; y < wl; y++) for (let xx = x; xx < Math.min(n, x + w); xx++) scene[y * n + xx] = (xx + y) % 3 === 0 && ((xx * 7 + y * 5) % 4 === 0) ? X.rgb(255, 214, 140) : shore; x += w; }
      else for (let x = 0; x < n; x++) { const h = 2 + Math.round((Math.sin(x * 0.05 + sunX) * 0.5 + 0.5) * n * 0.07 + Math.sin(x * 0.17) * 1.5); for (let y = wl - h; y < wl; y++) scene[y * n + x] = shore; }
      const t1 = T1, t2 = T2;
      const cable = x => x < t1 ? ttop + (x - t1) * (ttop - deck) / t1 * -1 : x > t2 ? ttop + (x - t2) * (deck - ttop) / (n - t2) : deck - 4 - (deck - 4 - ttop) * (1 - ((x - (t1 + t2) / 2) / ((t2 - t1) / 2)) ** 2) * -1 + 0;
      const sag = x => { if (x < t1) return ttop + (t1 - x) / t1 * (deck - ttop); if (x > t2) return ttop + (x - t2) / (n - t2) * (deck - ttop); const u = (x - t1) / (t2 - t1) * 2 - 1; return deck - 3 - (deck - 3 - ttop) * u * u; };
      X.rect(G, 0, deck, n, 2, steel); X.rect(G, 0, deck + 2, n, 1, X.shade(steel, 0.6));
      if (kind === 'Suspension') {
        for (const tx of [t1, t2]) { X.rect(G, tx - 2, ttop, 1, wl - ttop, steel); X.rect(G, tx + 1, ttop, 1, wl - ttop, steel); for (let y = ttop + 4; y < deck; y += 8) X.rect(G, tx - 2, y, 4, 1, steel); }
        for (let x = 0; x < n - 1; x++) X.line(G, x, sag(x), x + 1, sag(x + 1), steel);
        for (let x = 2; x < n; x += 3) if (Math.abs(x - t1) > 2 && Math.abs(x - t2) > 2) X.line(G, x, sag(x), x, deck, X.shade(steel, 0.8));
      } else if (kind === 'Cable-stayed') {   // single-mast towers with fans of straight stays to the deck
        for (const tx of [t1, t2]) { X.rect(G, tx - 1, ttop - 4, 3, wl - ttop + 4, steel); for (let k = 1; k <= 7; k++) { const dx = k * (t2 - t1) / 15; X.line(G, tx, ttop - 2 + k, tx - dx, deck, X.shade(steel, 0.85)); X.line(G, tx, ttop - 2 + k, tx + dx, deck, X.shade(steel, 0.85)); } }
      } else {   // a through arch between two piers, hangers dropping from it to the deck
        const arch = x => { const u = (x - t1) / (t2 - t1) * 2 - 1; return deck - (deck - ttop) * (1 - u * u); };
        for (const tx of [t1, t2]) X.rect(G, tx - 2, deck, 4, wl - deck, X.shade(steel, 0.7));
        for (let x = Math.ceil(t1); x < t2; x++) { X.line(G, x, arch(x), x + 1, arch(x + 1), steel); X.put(G, x, arch(x) + 1, steel); }
        for (let x = Math.ceil(t1) + 3; x < t2 - 2; x += 3) X.line(G, x, arch(x) + 2, x, deck, X.shade(steel, 0.8));
      }
      const lamps = Array.from({ length: Math.floor(n / 8) }, (_, k) => k * 8 + 4);
      const fy = Math.round(wl + (n - wl) * 0.55), hull = X.rgb(24, 22, 30);
      return (t) => {
        d.set(scene);
        for (const x of lamps) X.put(g, x, deck - 1, X.rgb(255, 230, 150));
        for (let y = wl; y < n; y++) {
          const k = y - wl, src = wl - 1 - k * 1.2, sh = Math.round(Math.sin(y * 0.6 + t * 2) * (1 + k * 0.06));
          for (let x = 0; x < n; x++) { const sy = Math.max(0, Math.round(src)), c = scene[sy * n + Math.min(n - 1, Math.max(0, x + sh))]; d[y * n + x] = X.mixPk(X.shade(c, 0.6), X.shade(sky[0], 0.5), 0.35 + 0.2 * (X.dith4(x, y) < 0.3)); }
        }
        if (ferry === 'Crossing') {   // a little ferry working across the bay, its lit windows trembling in the water
          const fx = Math.round(((t * 1.6) % (n + 30)) - 15);
          X.rect(g, fx, fy, 12, 2, hull); X.rect(g, fx + 2, fy - 2, 7, 2, hull); X.rect(g, fx + 4, fy - 4, 2, 2, hull);
          for (let k = 0; k < 3; k++) X.put(g, fx + 3 + k * 2, fy - 1, X.rgb(255, 214, 140));
          for (let k = 0; k < 4; k++) X.put(g, fx + 3 + k * 2 + (Math.sin(t * 3 + k) > 0 ? 1 : 0), fy + 3 + k, X.rgb(160, 130, 90));
        }
      };
    },
  });

  add({
    name: 'Brutalist', seed: 8, sizes: [100], fps: 12,
    recipe: 'A concrete facade of stacked boxes and recesses. The sun crosses the sky and every ledge drops a hard pixel shadow that slides and stretches across the face below it.',
    make(R, U, g) {
      const { n, d } = g, hgt = new Uint8Array(n * n), con = R.pick([[170, 166, 158], [190, 170, 150], [150, 160, 170]]), accent = X.inks(R, 2, 0.5);
      hgt.fill(1);
      // traits: the massing of the boxes, the windows, weathering, the concrete and the accent
      const mass = g.trait('Massing', vary(g, [['Boxes', 3], ['Towers', 1.3], ['Slabs', 1.3]])), winK = g.trait('Windows', vary(g, [['Bays', 3], ['Ribbons', 1.3], ['Slots', 1.2]])), stained = g.trait('Weathering', vary(g, [['Clean', 3], ['Rain-stained', 1.5]])) !== 'Clean';
      g.trait('Concrete', ['Grey', 'Warm', 'Cool'][[170, 190, 150].indexOf(con[0])]); g.trait('Accent', inkName(accent));
      // the boxes snap to a building module (same dice), so ledges line up the way cast concrete does
      for (let k = 0; k < 26; k++) { let w = R.int(4, n / 4), h = R.int(3, n / 6), x = R.int(0, n - w), y = R.int(0, n - h); const z = R.int(2, 4); if (mass === 'Towers') { w = Math.max(4, w >> 1); h = Math.min(n, h * 3); } else if (mass === 'Slabs') { w = Math.min(n, w * 2); h = Math.max(3, h >> 1); } x -= x % 4; y -= y % 3; w = Math.max(4, Math.round(w / 4) * 4); h = Math.max(3, Math.round(h / 3) * 3); for (let yy = y; yy < Math.min(n, y + h); yy++) for (let xx = x; xx < Math.min(n, x + w); xx++) hgt[yy * n + xx] = Math.max(hgt[yy * n + xx], z); }
      const wy = R.int(6, 10), wx = R.int(5, 9);
      const stepX = winK === 'Ribbons' ? wx * 3 : winK === 'Slots' ? 4 : wx, wideX = winK === 'Ribbons' ? wx * 3 - 2 : winK === 'Slots' ? 2 : wx - 3, tallY = winK === 'Slots' ? wy - 3 : 3;
      for (let y = 2; y < n - 3; y += wy) for (let x = 2; x < n - 3; x += stepX) if (R() < 0.8) for (let yy = y; yy < Math.min(n, y + tallY); yy++) for (let xx = x, xe = winK === 'Bays' ? x + wideX : Math.min(n, x + wideX); xx < xe; xx++) hgt[yy * n + xx] = 0;
      // rain-stained: dark streaks running down from under each ledge
      const stain = new Float32Array(n * n);
      if (stained) for (let x = 0; x < n; x++) { let s = 0; for (let y = 1; y < n; y++) { const i = y * n + x; if (hgt[i - n] > hgt[i] && hgt[i] > 0) s = 0.9 * (0.6 + 0.4 * (((x * 37) % 7) / 7)); else s *= 0.9; stain[i] = (x * 13) % 3 === 0 ? s : s * 0.4; } }
      const win = new Uint8Array(n * n); for (let i = 0; i < n * n; i++) win[i] = hgt[i] === 0 && R() < 0.003 ? 1 : 0;
      const glass = X.rgb(36, 42, 54), glassHi = X.rgb(58, 68, 86), lit = X.mixPk(accent[0], X.rgb(255, 214, 140), 0.6);
      return (t) => {
        const a = Math.sin(t * 0.12) * 0.9, sx = Math.round(Math.sin(a) * 3), sy = 2 + Math.round(Math.cos(a));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, h = hgt[i];
          let shadow = false;
          for (let k = 1; k <= 4 && !shadow; k++) { const xx = x - sx * k / 2 | 0, yy = y - sy * k / 2 | 0; if (xx >= 0 && yy >= 0 && xx < n && yy < n && hgt[yy * n + xx] > h + (k > 2 ? 1 : 0)) shadow = true; }
          const base = X.rgb(con[0] * (0.7 + h * 0.08), con[1] * (0.7 + h * 0.08), con[2] * (0.7 + h * 0.08));
          if (h === 0) {   // glazing: a dark head under the lintel, panes catching the sky, now and then a lit room
            const bay = (Math.floor((x - 2) / wx) * 31 + Math.floor((y - 2) / wy) * 17) % 13, head = y > 0 && hgt[i - n] > 0;
            d[i] = head ? X.rgb(14, 15, 20) : bay === 0 ? (shadow ? X.shade(lit, 0.75) : lit) : (x + y) % 7 === 0 ? glassHi : glass;
            continue;
          }
          const ledge = y > 0 && hgt[i - n] < h;   // the lit top edge of every projecting box
          const face = stained && stain[i] > 0.05 ? X.shade(base, 1 - 0.28 * stain[i]) : base;
          d[i] = shadow ? X.shade(face, 0.55) : ledge ? X.shade(face, 1.12) : y % 3 === 0 ? X.shade(face, 0.95) : (x % 6 === 3 && y % 6 === 1) ? X.shade(face, 0.82) : face;
        }
      };
    },
  });

  const INWARD = [[0, 1], [-1, 0], [0, -1], [1, 0]];
  // Floor Plan traits: the outline of the house and how many rooms it is split into (the opening plan is a square of twelve)
  function planShape(g, n) {
    const outline = g.trait('Outline', vary(g, [['Square', 3], ['Wide', 1.3], ['Tall', 1.2]])), rooms = g.trait('Rooms', vary(g, [[12, 3], [7, 1.3], [17, 1.3]]));
    const b = outline === 'Wide' ? [6, Math.round(n * 0.2), n - 6, Math.round(n * 0.8)] : outline === 'Tall' ? [Math.round(n * 0.2), 6, Math.round(n * 0.8), n - 6] : [6, 6, n - 6, n - 6];
    return { x0: b[0], y0: b[1], x1: b[2], y1: b[3], splits: rooms - 1 };
  }
  add({
    name: 'Floor Plan', seed: 9, sizes: [100, 200], fps: 12,
    recipe: 'A blueprint drawing itself: the outline is split into rooms, walls are inked line by line, doors swing open in each wall, and when the plan is done the sheet is cleared.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, ground = R.pick([X.rgb(18, 40, 96), X.rgb(14, 22, 48), X.rgb(236, 232, 220)]), ink = ground === X.rgb(236, 232, 220) ? X.rgb(30, 50, 130) : X.rgb(220, 232, 255), fine = X.mixPk(ground, ink, 0.18);
      const blank = new Uint32Array(n * n).fill(ground); for (let i = 0; i < n * n; i++) if ((i / n | 0) % 5 === 0 || i % n % 5 === 0) blank[i] = fine;
      const FP = planShape(g, n); g.trait('Sheet', ground === X.rgb(236, 232, 220) ? 'Paper' : ground === X.rgb(18, 40, 96) ? 'Blueprint' : 'Navy'); g.trait('Grid', 5); g.trait('Rooms tinted', 'No');
      let segs, drawn;
      const plan = () => {
        segs = []; const rooms = [[FP.x0, FP.y0, FP.x1 - FP.x0, FP.y1 - FP.y0]];
        for (let k = 0; k < FP.splits; k++) { rooms.sort((a, b) => b[2] * b[3] - a[2] * a[3]); const [x, y, w, h] = rooms.shift(); if (w > h) { const c = Math.round(w * R.range(0.35, 0.65)); rooms.push([x, y, c, h], [x + c, y, w - c, h]); segs.push({ a: [x + c, y], b: [x + c, y + h], door: R.range(0.2, 0.8) }); } else { const c = Math.round(h * R.range(0.35, 0.65)); rooms.push([x, y, w, c], [x, y + c, w, h - c]); segs.push({ a: [x, y + c], b: [x + w, y + c], door: R.range(0.2, 0.8) }); } }
        segs.unshift({ a: [FP.x0, FP.y0], b: [FP.x1, FP.y0] }, { a: [FP.x1, FP.y0], b: [FP.x1, FP.y1] }, { a: [FP.x1, FP.y1], b: [FP.x0, FP.y1] }, { a: [FP.x0, FP.y1], b: [FP.x0, FP.y0] });
        drawn = 0;
      };
      plan();
      return (t, dt) => {
        d.fill(ground);
        for (let y = 0; y < n; y += 5) for (let x = 0; x < n; x++) d[y * n + x] = fine;
        for (let x = 0; x < n; x += 5) for (let y = 0; y < n; y++) d[y * n + x] = fine;
        drawn += dt * 2.2;
        segs.forEach((s, k) => {
          const p = U.clamp(drawn - k); if (p <= 0) return;
          const [ax, ay] = s.a, [bx, by] = s.b, ex = ax + (bx - ax) * p, ey = ay + (by - ay) * p;
          X.line(g, ax, ay, ex, ey, ink);
          if (k < 4) { const [ix, iy] = INWARD[k]; X.line(g, ax + ix, ay + iy, ex + ix, ey + iy, ink); }   // the outer walls drawn double weight
          if (s.door && p >= 1) { const dx = ax + (bx - ax) * s.door, dy = ay + (by - ay) * s.door, len = 5, horiz = ay === by; X.line(g, dx, dy, dx + (horiz ? len : 0), dy + (horiz ? 0 : len), ground); const sw = U.clamp(drawn - k - 1) * Math.PI / 2; X.line(g, dx, dy, dx + len * (horiz ? Math.cos(sw) : Math.sin(sw)), dy + len * (horiz ? Math.sin(sw) : Math.cos(sw)), ink); }
        });
        // the finished plan is wiped off the sheet from left to right before the next is drawn
        if (drawn > segs.length + 3) { const wx = Math.min(n, Math.floor((drawn - segs.length - 3) * n)); for (let y = 0; y < n; y++) d.set(blank.subarray(y * n, y * n + wx), y * n); if (wx < n) for (let y = 0; y < n; y++) d[y * n + wx] = X.mixPk(blank[y * n + wx], ink, 0.5); }
        if (drawn > segs.length + 4) plan();
      };
    }, function alt(R, U, g) {
      const SHEETS = [[[18, 40, 96], [220, 232, 255]], [[14, 22, 48], [220, 232, 255]], [[236, 232, 220], [30, 50, 130]], [[10, 10, 14], [80, 255, 200]], [[226, 238, 226], [30, 110, 70]], [[250, 246, 236], [200, 40, 50]]], sh = R.pick(SHEETS);
      const { n, d } = g, ground = X.rgb(...sh[0]), ink = X.rgb(...sh[1]), fine = X.mixPk(ground, ink, 0.18), tint = R.bool(0.5), sc = U.scheme(R, 0.4), grid = R.pick([4, 5, 6]);
      const blank = new Uint32Array(n * n).fill(ground); for (let i = 0; i < n * n; i++) if ((i / n | 0) % grid === 0 || i % n % grid === 0) blank[i] = fine;
      const FP = planShape(g, n); g.trait('Sheet', ['Blueprint', 'Navy', 'Paper', 'Terminal', 'Mint', 'Red ink'][SHEETS.indexOf(sh)]); g.trait('Grid', grid); g.trait('Rooms tinted', tint ? 'Yes' : 'No');
      let segs, drawn, rooms;
      const plan = () => {
        segs = []; rooms = [[FP.x0, FP.y0, FP.x1 - FP.x0, FP.y1 - FP.y0]];
        for (let k = 0; k < FP.splits; k++) { rooms.sort((a, b) => b[2] * b[3] - a[2] * a[3]); const [x, y, w, h] = rooms.shift(); if (w > h) { const c = Math.round(w * R.range(0.35, 0.65)); rooms.push([x, y, c, h], [x + c, y, w - c, h]); segs.push({ a: [x + c, y], b: [x + c, y + h], door: R.range(0.2, 0.8) }); } else { const c = Math.round(h * R.range(0.35, 0.65)); rooms.push([x, y, w, c], [x, y + c, w, h - c]); segs.push({ a: [x, y + c], b: [x + w, y + c], door: R.range(0.2, 0.8) }); } }
        segs.unshift({ a: [FP.x0, FP.y0], b: [FP.x1, FP.y0] }, { a: [FP.x1, FP.y0], b: [FP.x1, FP.y1] }, { a: [FP.x1, FP.y1], b: [FP.x0, FP.y1] }, { a: [FP.x0, FP.y1], b: [FP.x0, FP.y0] });
        rooms.forEach(r => r.push(U.pk(U.mix(sc.cols[R.int(0, sc.cols.length - 1)], [255, 255, 255], 0.35))));
        drawn = 0;
      };
      plan();
      return (t, dt) => {
        d.fill(ground);
        for (let y = 0; y < n; y += grid) for (let x = 0; x < n; x++) d[y * n + x] = fine;
        for (let x = 0; x < n; x += grid) for (let y = 0; y < n; y++) d[y * n + x] = fine;
        if (tint && drawn > segs.length) { const k = U.clamp((drawn - segs.length) / 2); for (const [x, y, w, h, c] of rooms) for (let yy = y + 1; yy < y + h; yy++) for (let xx = x + 1; xx < x + w; xx++) if (X.dith4(xx, yy) < k * 0.5) d[yy * n + xx] = c; }
        drawn += dt * 2.2;
        segs.forEach((s, k) => {
          const p = U.clamp(drawn - k); if (p <= 0) return;
          const [ax, ay] = s.a, [bx, by] = s.b, ex = ax + (bx - ax) * p, ey = ay + (by - ay) * p;
          X.line(g, ax, ay, ex, ey, ink);
          if (k < 4) { const [ix, iy] = INWARD[k]; X.line(g, ax + ix, ay + iy, ex + ix, ey + iy, ink); }   // the outer walls drawn double weight
          if (s.door && p >= 1) { const dx = ax + (bx - ax) * s.door, dy = ay + (by - ay) * s.door, len = 5, horiz = ay === by; X.line(g, dx, dy, dx + (horiz ? len : 0), dy + (horiz ? 0 : len), ground); const sw = U.clamp(drawn - k - 1) * Math.PI / 2; X.line(g, dx, dy, dx + len * (horiz ? Math.cos(sw) : Math.sin(sw)), dy + len * (horiz ? Math.sin(sw) : Math.cos(sw)), ink); }
        });
        // the finished plan is wiped off the sheet from left to right before the next is drawn
        if (drawn > segs.length + 3) { const wx = Math.min(n, Math.floor((drawn - segs.length - 3) * n)); for (let y = 0; y < n; y++) d.set(blank.subarray(y * n, y * n + wx), y * n); if (wx < n) for (let y = 0; y < n; y++) d[y * n + wx] = X.mixPk(blank[y * n + wx], ink, 0.5); }
        if (drawn > segs.length + 4) plan();
      };
    }),
  });

  add({
    name: 'Colonnade', seed: 10, sizes: [100, 200], fps: 12,
    recipe: 'A one-point view down an endless arcade: pairs of round arches recede to the vanishing point, and the walk forward never ends, each arch growing past you as the next appears.',
    make(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 3, 0.4), stone = X.mixPk(inks[0], X.rgb(220, 210, 190), 0.6), floor = [X.shade(inks[1], 0.6), X.shade(inks[1], 0.4)], far = X.mixPk(inks[2], WHITE, 0.5);
      // traits: where the vanishing point sits, the arch, the pier weight, the floor
      const vanish = g.trait('Vanishing point', vary(g, [['Centre', 3], ['Left', 1.2], ['Right', 1.2]])), archK = g.trait('Arch', vary(g, [['Round', 3], ['Pointed', 1.4], ['Flat', 1.2]]));
      const pier = g.trait('Piers', vary(g, [['Slender', 3], ['Massive', 1.4]])) === 'Massive' ? 0.42 : 0.25, floorK = g.trait('Floor', vary(g, [['Checks', 3], ['Bands', 1.3], ['Runner', 1.3]]));
      g.trait('Palette', inkName(inks));
      const c = vanish === 'Left' ? n * 0.38 : vanish === 'Right' ? n * 0.62 : n / 2, hz = n * 0.52, runner = X.shade(inks[2], 0.5), runnerB = X.mixPk(runner, WHITE, 0.25);
      const sky = Array.from({ length: n }, (_, x) => X.shade(far, 0.4 + 0.6 * Math.max(0, 1 - Math.abs(x - c) / (n / 2)) ** 2));   // the far glow only depends on the column
      const archY = archK === 'Pointed' ? (u, aw) => Math.pow(1 - Math.abs(u), 0.55) * aw * 0.85 : archK === 'Flat' ? (u, aw) => aw * 0.3 : (u, aw) => Math.sqrt(1 - u * u) * aw * 0.6;
      return (t) => {
        for (let y = 0; y < n; y++) {
          const row = y * n;
          if (y <= hz) { for (let x = 0; x < n; x++) d[row + x] = sky[x]; continue; }
          const z = (n * 0.5) / (y - hz + 0.01), zt = Math.floor(z + t * 2), k4 = z * 4 / n;   // one depth per floor row
          if (floorK === 'Checks') for (let x = 0; x < n; x++) d[row + x] = ((zt + Math.floor((x - c) * k4 + 100)) & 1) ? floor[0] : floor[1];
          else if (floorK === 'Bands') for (let x = 0; x < n; x++) d[row + x] = (zt & 1) ? floor[0] : floor[1];
          else for (let x = 0; x < n; x++) { const u = Math.abs(x - c) * k4; d[row + x] = u < 0.9 ? (u > 0.7 ? runnerB : runner) : ((zt + Math.floor((x - c) * k4 + 100)) & 1) ? floor[0] : floor[1]; }
        }
        for (let k = 8; k >= 0; k--) {
          // skip arches that are passing the viewer: as z nears 0 the arch scale blows up
          const z = k + 1 - (t * 2 % 1); if (!(z >= 0.45)) continue; const sc = n * 0.6 / z, aw = sc * 0.9, ah = sc * 1.4, top = hz - ah * 0.6, bot = hz + sc * 0.5;
          const shade = X.shade(stone, U.clamp(1.1 - z * 0.09));
          X.rect(g, c - aw - sc * pier, top, sc * pier, bot - top, shade); X.rect(g, c + aw, top, sc * pier, bot - top, shade);
          for (let x = Math.max(0, Math.floor(c - aw - sc * pier)), xe = Math.min(n, c + aw + sc * pier); x < xe; x++) { const u = (x - c) / aw; const ay = Math.abs(u) < 1 ? top - archY(u, aw) : top; const y1 = Math.min(n, Math.round(ay)); for (let y = Math.max(0, Math.round(top - aw * (archK === 'Pointed' ? 0.85 : 0.6) - sc * 0.2)); y < y1; y++) d[y * n + x] = shade; }
        }
      };
    },
  });
})();
