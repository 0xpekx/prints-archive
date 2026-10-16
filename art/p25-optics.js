// Set 3 · Optics: light bent, split, reflected and projected, on the cell grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Optics' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // Variety: a weighted pick from g.alt for a new trait; the opening variation always gets the first
  // value (the original look), so it never changes. list = [[value, weight], ...]
  const vary = (g, list) => { if (g.home) return list[0][0]; let tot = 0; for (const e of list) tot += e[1]; let r = g.alt() * tot; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
  // the name of the palette X.inks rolled (any order), or Rainbow for the native hue wheel
  const inkName = cols => { for (const p of U.PALETTES) { const s = p.cols.map(U.pk); if (s.length === cols.length && s.every(c => cols.includes(c))) return p.name; } return 'Rainbow'; };
  const spectrum = (k, b = 100) => X.hsbPk(k * 80, 90, b);   // red .. violet

  add({
    name: 'Pool Floor', seed: 1, sizes: [100], fps: 12,
    recipe: 'The bottom of a swimming pool: sunlight focused by the moving surface into a net of bright caustic lines that wanders over the tiles and the lane stripes. Tiles, mosaics, lane markings and the hour change with every variation, down to a night pool lit from below.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, tile = R.pick([[90, 190, 220], [120, 210, 200], [80, 150, 230], [240, 230, 210]]), ws = Array.from({ length: 3 }, () => ({ a: R() * U.TAU, k: R.range(0.08, 0.16), s: R.range(0.6, 1.2) })), lane = R.int(n * 0.3, n * 0.7);
      // the original path varies too (from g.alt): tile size, lane lines, the colour of the light
      const tsK = g.trait('Tile size', vary(g, [['Standard', 3], ['Small', 1.2], ['Large', 1.2]])), laneK = vary(g, [[1, 3], [2, 1.3], [0, 1]]), lightK = g.trait('Hour', vary(g, [['Day', 3], ['Evening', 1.2]]));
      const ts = Math.round((n >= 200 ? 8 : 5) * (tsK === 'Small' ? 0.8 : tsK === 'Large' ? 1.6 : 1)), lanesX = laneK === 1 ? [lane] : laneK === 2 ? [Math.round(n * 0.3), Math.round(n * 0.7)] : [], sunL = lightK === 'Evening' ? X.rgb(255, 214, 160) : WHITE;
      g.trait('Tiles', ['Aqua', 'Mint', 'Blue', 'Sand'][[90, 120, 80, 240].indexOf(tile[0])]); g.trait('Lanes', laneK); g.trait('Floor', 'Plain'); g.trait('Ripple', ws[0].k < 0.12 ? 'Long' : 'Short');
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let u = x, v = y;
          for (const w of ws) { const p = (x * Math.cos(w.a) + y * Math.sin(w.a)) * w.k + t * w.s; u += Math.sin(p) * 3; v += Math.cos(p * 1.3) * 3; }
          const c = Math.abs(Math.sin(u * 0.18) + Math.sin(v * 0.18 + 1.3)) , line = c < 0.12 ? 2 : c < 0.3 ? 1 : 0;
          const grout = x % ts === 0 || y % ts === 0, stripe = lanesX.length === 1 ? Math.abs(x - lanesX[0]) < ts * 0.6 : lanesX.some(lx => Math.abs(x - lx) < ts * 0.6);
          let base = X.rgb(tile[0], tile[1], tile[2]);
          if (stripe) base = X.rgb(20, 40, 110); if (grout) base = X.shade(base, 0.82);
          d[y * n + x] = line === 2 ? X.mixPk(base, sunL, 0.7) : line === 1 ? X.mixPk(base, sunL, 0.3) : X.shade(base, 0.85);
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, ws = Array.from({ length: 3 }, () => ({ a: R() * U.TAU, k: R.range(0.08, 0.16), s: R.range(0.6, 1.2) })), ts = R.pick([4, 5, 5, 6]);
      const looks = [
        { tile: [90, 190, 220], lane: [20, 40, 110], light: [255, 255, 255] }, { tile: [120, 210, 200], lane: [20, 60, 90], light: [255, 255, 240] },
        { tile: [80, 150, 230], lane: [230, 230, 240], light: [255, 255, 255] }, { tile: [240, 230, 210], lane: [30, 60, 140], light: [255, 250, 220] },
        { tile: [20, 60, 120], lane: [250, 220, 90], light: [120, 230, 255], night: true }, { tile: [40, 120, 110], lane: [10, 30, 40], light: [220, 255, 230] },
      ];
      const L = R.pick(looks), mosaic = R.bool(0.3), lanes = R.pick([1, 1, 2]), laneX = Array.from({ length: lanes }, (_, k) => Math.round(n * (lanes === 1 ? R.range(0.3, 0.7) : 0.3 + 0.4 * k))), cross = R.bool(0.5);
      const tileC = X.rgb(...L.tile), laneC = X.rgb(...L.lane), light = X.rgb(...L.light), base = new Uint32Array(n * n), sat = R.range(0.15, 0.3);
      g.trait('Tiles', ['Aqua', 'Mint', 'Blue', 'Sand', 'Deep blue', 'Green'][looks.indexOf(L)]); g.trait('Hour', L.night ? 'Night' : 'Day'); g.trait('Lanes', lanes); g.trait('Floor', mosaic ? 'Mosaic' : 'Plain'); g.trait('Ripple', ws[0].k < 0.12 ? 'Long' : 'Short'); g.trait('Crossing', cross ? 'Yes' : 'No');
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const grout = x % ts === 0 || y % ts === 0, stripe = laneX.some(lx => Math.abs(x - lx) < ts * 0.6) && (!cross || Math.abs(y - n * 0.5) > ts * 0.6 || laneX.some(lx => Math.abs(x - lx) < ts * 2));
        let c = mosaic ? X.mixPk(tileC, ((x / ts | 0) * 7 + (y / ts | 0) * 13) % 5 === 0 ? WHITE : X.shade(tileC, 0.75), sat) : tileC;
        if (stripe) c = laneC;
        if (grout) c = X.shade(c, 0.82);
        base[y * n + x] = c;
      }
      const lamp = L.night ? [n * 0.5, n * 0.1] : null;
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let u = x, v = y;
          for (const w of ws) { const p = (x * Math.cos(w.a) + y * Math.sin(w.a)) * w.k + t * w.s; u += Math.sin(p) * 3; v += Math.cos(p * 1.3) * 3; }
          const c = Math.abs(Math.sin(u * 0.18) + Math.sin(v * 0.18 + 1.3)), line = c < 0.12 ? 2 : c < 0.3 ? 1 : 0, b = base[y * n + x];
          let o = line === 2 ? X.mixPk(b, light, 0.7) : line === 1 ? X.mixPk(b, light, 0.3) : X.shade(b, 0.85);
          if (lamp) { const k = Math.max(0, 1 - Math.hypot(x - lamp[0], (y - lamp[1]) * 1.4) / (n * 0.7)); o = X.shade(o, 0.45 + k * 0.9); }
          d[y * n + x] = o;
        }
      };
    }),
  });

  // floor schemes for the glass ball: strong, deliberate pairs and trios
  const FLOORS = [
    [[246, 242, 232], [24, 24, 30]], [[248, 236, 214], [206, 40, 50], [236, 150, 140]], [[244, 248, 250], [0, 150, 160], [140, 210, 214]],
    [[255, 214, 70], [24, 36, 90]], [[255, 170, 210], [110, 40, 160], [200, 110, 220]], [[20, 20, 26], [80, 255, 160]], [[236, 220, 190], [60, 120, 70], [150, 180, 110]],
  ];
  add({
    name: 'Glass Ball', seed: 2, sizes: [100, 200], fps: 12,
    interactive: 'Drag the ball around the floor.',
    recipe: 'One, two or three glass spheres rolling over a patterned floor, bouncing off the walls and off each other (checks, gingham, tiles, stripes, rings or polka dots), the pattern seen through each flipped and magnified by refraction, with a hard highlight, a bright rim and a caustic spot in its tinted shadow. Drag a ball to move it, or throw it into the others.',
    make: fork(function og(R, U, g) {
      const F = FLOORS[Math.floor(g.alt() * FLOORS.length)].map(c => X.rgb(c[0], c[1], c[2]));   // colours only
      const { n, d } = g, inks = X.inks(R, 2, 0.5), cell = R.pick([6, 8, 10]) * n / 100, pat = R.int(0, 2), rad = n * R.range(0.2, 0.28), ior = R.range(1.3, 1.6);
      g.trait('Floor', ['Ink', 'Poppy', 'Lagoon', 'Navy gold', 'Orchid', 'Neon', 'Garden'][FLOORS.findIndex(q => X.rgb(...q[0]) === F[0] && X.rgb(...q[1]) === F[1])]); g.trait('Pattern', ['Checks', 'Diagonals', 'Scatter'][pat]); g.trait('Balls', 1); g.trait('Ball size', rad > n * 0.24 ? 'Large' : 'Medium'); g.trait('Glass', 'Clear');
      const floor = (x, y) => { const a = Math.floor(x / cell), b = Math.floor(y / cell); const v = pat === 0 ? (a + b) & 1 : pat === 1 ? (Math.floor((x + y) / cell) & 1) : ((a * a + b) % 3 === 0 ? 1 : 0); return v ? F[0] : F[1]; };
      let held = null;
      return (t) => {
        const inp = g.input; inp.taps();
        if (inp.down && inp.inside && (held || Math.hypot(inp.x * n - (held ? held[0] : n / 2 + Math.sin(t * 0.3) * n * 0.22), inp.y * n - (held ? held[1] : n / 2 + Math.sin(t * 0.21 + 1) * n * 0.18)) < rad)) held = [inp.x * n, inp.y * n];   // drag the ball; it stays where you leave it
        const cx = held ? held[0] : n / 2 + Math.sin(t * 0.3) * n * 0.22, cy = held ? held[1] : n / 2 + Math.sin(t * 0.21 + 1) * n * 0.18, sx = cx + rad * 0.35, sy = cy + rad * 0.45;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - cx, dy = y - cy, r2 = (dx * dx + dy * dy) / (rad * rad);
          const shd = ((x - sx) ** 2 + (y - sy) ** 2) / (rad * rad);
          let c = floor(x + t * 3, y + t * 2);
          if (shd < 1 && r2 >= 1) c = shd < 0.08 ? X.mixPk(c, WHITE, 0.6) : X.shade(c, 0.6);
          if (r2 < 1) { const z = Math.sqrt(1 - r2), k = -(1 - 1 / ior) * 1.6 / (0.3 + z); c = floor(cx + dx * k + t * 3, cy + dy * k + t * 2); c = X.mixPk(c, WHITE, 0.08 + (r2 > 0.93 ? 0.5 : r2 > 0.82 ? 0.25 : 0)); if (((dx / rad + 0.4) ** 2 + (dy / rad + 0.45) ** 2) < 0.02) c = WHITE; }
          d[y * n + x] = c;
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, F = R.pick(FLOORS).map(c => X.rgb(c[0], c[1], c[2])), cell = R.pick([6, 8, 10, 12]), pat = R.pick(['check', 'gingham', 'tiles', 'stripes', 'rings', 'dots']);
      const tints = [[255, 255, 255], [150, 210, 255], [255, 200, 120], [160, 255, 190], [255, 160, 220]], aberr = R.bool(0.35);
      const balls = Array.from({ length: R.pick([1, 1, 2, 3]) }, (_, i) => ({ rad: n * R.range(0.14, 0.26) * (i ? 0.75 : 1), ior: R.range(1.3, 1.7), tint: X.rgb(...R.pick(tints)), fx: R.range(0.2, 0.35), fy: R.range(0.15, 0.3), ph: R.range(0, 6), cx: 0, cy: 0, held: 0 }));
      const c2 = F[2] ?? X.mixPk(F[0], F[1], 0.5), drift = [R.range(1, 4) * R.sign(), R.range(0.5, 3) * R.sign()], rx = R.range(0, n), ry = R.range(0, n);
      g.trait('Floor', ['Ink', 'Poppy', 'Lagoon', 'Navy gold', 'Orchid', 'Neon', 'Garden'][FLOORS.findIndex(q => X.rgb(...q[0]) === F[0] && X.rgb(...q[1]) === F[1])]); g.trait('Pattern', { check: 'Checks', gingham: 'Gingham', tiles: 'Tiles', stripes: 'Stripes', rings: 'Rings', dots: 'Dots' }[pat]); g.trait('Balls', balls.length); g.trait('Ball size', balls[0].rad > n * 0.21 ? 'Large' : 'Medium'); g.trait('Glass', aberr ? 'Prismatic' : 'Clear');
      const floor = (x, y) => {
        const a = Math.floor(x / cell), b = Math.floor(y / cell);
        switch (pat) {
          case 'check': return (a + b) & 1 ? F[0] : F[1];
          case 'gingham': return (a & 1) && (b & 1) ? F[1] : (a & 1) || (b & 1) ? c2 : F[0];
          case 'tiles': return ((x % cell + cell) % cell < 1 || (y % cell + cell) % cell < 1) ? F[1] : (a * 7 + b * 3) % 5 === 0 ? c2 : F[0];
          case 'stripes': return Math.floor((x + y) / cell) % 3 === 0 ? F[1] : Math.floor((x + y) / cell) % 3 === 1 ? c2 : F[0];
          case 'rings': return Math.floor(Math.hypot(x - rx, y - ry) / cell) % 2 ? F[1] : F[0];
          default: { const u = (x % cell + cell) % cell - cell / 2, v = (y % cell + cell) % cell - cell / 2; return u * u + v * v < cell * cell * 0.12 ? F[1] : F[0]; }
        }
      };
      // real physics: each ball rolls at its own pace, bounces off the walls and off the others (elastic, heavier balls push harder)
      for (const b of balls) {
        b.m = b.rad * b.rad;
        for (let k = 0; k < 60; k++) { b.cx = R.range(b.rad, n - b.rad); b.cy = R.range(b.rad, n - b.rad); if (balls.every(o => o === b || !o.m || o.cx === undefined || Math.hypot(o.cx - b.cx, o.cy - b.cy) > o.rad + b.rad + 1)) break; }
        const a0 = R.range(0, Math.PI * 2), sp = n * R.range(0.06, 0.1); b.vx = Math.cos(a0) * sp; b.vy = Math.sin(a0) * sp; b.cruise = sp;
      }
      let grab = null;
      const physics = (h) => {
        for (const b of balls) if (!b.held) {
          b.cx += b.vx * h; b.cy += b.vy * h;
          if (b.cx < b.rad) { b.cx = b.rad; b.vx = Math.abs(b.vx); } else if (b.cx > n - b.rad) { b.cx = n - b.rad; b.vx = -Math.abs(b.vx); }
          if (b.cy < b.rad) { b.cy = b.rad; b.vy = Math.abs(b.vy); } else if (b.cy > n - b.rad) { b.cy = n - b.rad; b.vy = -Math.abs(b.vy); }
        }
        for (let i = 0; i < balls.length; i++) for (let j = i + 1; j < balls.length; j++) {
          const p = balls[i], q = balls[j], dx = q.cx - p.cx, dy = q.cy - p.cy, dist = Math.hypot(dx, dy) || 0.001, over = p.rad + q.rad - dist;
          if (over <= 0 || (p.held && q.held)) continue;
          const nx = dx / dist, ny = dy / dist, ip = p.held ? 0 : 1 / p.m, iq = q.held ? 0 : 1 / q.m, w = ip + iq;   // a held ball is an immovable hand
          p.cx -= nx * over * ip / w; p.cy -= ny * over * ip / w; q.cx += nx * over * iq / w; q.cy += ny * over * iq / w;
          const vn = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (vn < 0) { const j2 = -2 * vn / w; p.vx -= j2 * ip * nx; p.vy -= j2 * ip * ny; q.vx += j2 * iq * nx; q.vy += j2 * iq * ny; }
        }
      };
      return (t, dt) => {
        const inp = g.input, step = Math.min(dt || 1 / 12, 0.25);
        if (inp.down && inp.inside) {
          if (!grab) grab = balls.find(b => Math.hypot(inp.x * n - b.cx, inp.y * n - b.cy) < b.rad) || null;
          if (grab) { const x = U.clamp(inp.x * n, grab.rad, n - grab.rad), y = U.clamp(inp.y * n, grab.rad, n - grab.rad); grab.vx = (x - grab.cx) / step; grab.vy = (y - grab.cy) / step; grab.held = 1; grab.cx = x; grab.cy = y; }
        } else if (grab) { grab.held = 0; grab = null; }   // let go: it is thrown with the speed of the drag
        for (let k = 0; k < 6; k++) physics(step / 6);
        for (const b of balls) if (!b.held) {   // thrown balls ease back to their own rolling pace, a stopped one starts rolling again
          const sp = Math.hypot(b.vx, b.vy) || 0.001, e = 1 + (b.cruise / sp - 1) * Math.min(1, step * 0.8);
          if (sp < 0.01) { b.vx = b.cruise * 0.1; } else { b.vx *= e; b.vy *= e; }
        }
        inp.taps();
        const ox = t * drift[0], oy = t * drift[1];
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = floor(x + ox, y + oy);
          for (const b of balls) {   // shadow and caustic, cast down and to the right
            const sx = b.cx + b.rad * 0.35, sy = b.cy + b.rad * 0.45, shd = ((x - sx) ** 2 + (y - sy) ** 2) / (b.rad * b.rad);
            if (shd < 1) c = shd < 0.06 ? X.mixPk(c, X.mixPk(b.tint, WHITE, 0.5), 0.75) : X.mixPk(X.shade(c, 0.55), b.tint, 0.08);
          }
          for (const b of balls) {
            const dx = x + 0.5 - b.cx, dy = y + 0.5 - b.cy, r2 = (dx * dx + dy * dy) / (b.rad * b.rad);
            if (r2 >= 1) continue;
            const z = Math.sqrt(1 - r2), k = -(1 - 1 / b.ior) * 1.6 / (0.3 + z);
            c = floor(b.cx + dx * k + ox, b.cy + dy * k + oy);
            if (aberr && r2 > 0.6) { const k2 = k * 1.08; if (floor(b.cx + dx * k2 + ox, b.cy + dy * k2 + oy) !== c) c = X.mixPk(c, X.rgb(255, 60, 120), 0.45); }
            c = X.mixPk(c, b.tint, 0.18);
            if (r2 > 0.82) c = X.mixPk(c, WHITE, r2 > 0.93 ? 0.55 : 0.25);
            const hx = dx / b.rad + 0.4, hy = dy / b.rad + 0.45;
            if (hx * hx + hy * hy < 0.025) c = WHITE; else if ((dx / b.rad - 0.45) ** 2 + (dy / b.rad - 0.4) ** 2 < 0.01) c = X.mixPk(c, WHITE, 0.6);
          }
          d[y * n + x] = c;
        }
      };
    }, g => g.n === 100),
  });

  // Prism traits shared by both paths: the fan drawn as lines or filled, which side the light comes from, the beam
  function prismLook(g) {
    const fan = g.trait('Fan', vary(g, [['Rays', 3], ['Filled', 1.5]])), side = g.trait('Light from', vary(g, [['Left', 3], ['Right', 1.5]])), beam = g.trait('Beam', vary(g, [['Thin', 3], ['Broad', 1.2]]));
    const flip = d => { const n = g.n; for (let y = 0; y < n; y++) { const o = y * n; for (let a = 0, b = n - 1; a < b; a++, b--) { const v = d[o + a]; d[o + a] = d[o + b]; d[o + b] = v; } } };
    return { filled: fan === 'Filled', right: side === 'Right', broad: beam === 'Broad', flip };
  }
  add({
    name: 'Prism', seed: 3, sizes: [100, 200], fps: 12,
    interactive: 'Move the pointer up and down to aim the beam.',
    listens: 'The spectrum becomes the sound of the room: each colour reaches as far as its band is loud, bass in red, treble in violet.',
    recipe: 'A thin white beam enters a slowly turning glass prism and leaves it fanned out into a spectrum, the fan sweeping across the wall as the prism turns. Prism size, the wall, the number of bands and a second prism that folds the colours back to white change with every variation; move the pointer to aim the beam.',
    make: fork(function og(R, U, g) {
      const L = prismLook(g), sizeK = g.trait('Prism', vary(g, [['Medium', 3], ['Small', 1.2], ['Large', 1.2]])), wallK = g.trait('Wall', vary(g, [['Dark', 3], ['Indigo', 1.2], ['Slate', 1.2]]));
      const { n, d } = g, c = n / 2, s = n * (sizeK === 'Small' ? 0.15 : sizeK === 'Large' ? 0.27 : 0.21), bg = wallK === 'Indigo' ? X.rgb(16, 14, 40) : wallK === 'Slate' ? X.rgb(28, 32, 38) : X.rgb(10, 10, 16), ior = 1.5, spread = R.range(0.06, 0.12);
      g.trait('Bands', 7); g.trait('Spread', spread < 0.08 ? 'Narrow' : spread < 0.1 ? 'Medium' : 'Wide'); g.trait('Second prism', 'No');
      let aim = n * 0.62;   // the pointer aims the beam; left alone it rests where it always did
      const lvl = new Float32Array(12);
      return (t) => {
        d.fill(bg);
        const a = Math.sin(t * 0.15) * 0.25;
        const pts = [0, 1, 2].map(k => [c + s * Math.cos(a + k * U.TAU / 3 - Math.PI / 2), c + s * Math.sin(a + k * U.TAU / 3 - Math.PI / 2)]);
        const hit = [c - s * 0.45, c + s * 0.05];
        g.input.taps();
        if (g.input.inside) aim += (g.input.y * n - aim) * 0.3; else if (aim !== n * 0.62) aim += Math.abs(n * 0.62 - aim) < 0.5 ? n * 0.62 - aim : (n * 0.62 - aim) * 0.05;
        X.line(g, 0, aim, hit[0], hit[1], WHITE); X.line(g, 0, aim + 1, hit[0], hit[1] + 1, X.rgb(200, 200, 210));
        if (L.broad) { X.line(g, 0, aim - 1, hit[0], hit[1] - 1, X.rgb(150, 150, 165)); X.line(g, 0, aim + 2, hit[0], hit[1] + 1, X.rgb(120, 120, 135)); }
        const exit = [c + s * 0.42, c + s * 0.12];
        const hear = g.input.listening;
        if (L.filled) for (let k = 0; k < 6; k++) { const a0 = 0.15 + a * 1.8 + k * spread, a1 = a0 + spread; X.poly(g, [exit[0], exit[1], exit[0] + Math.cos(a0) * n * 1.5, exit[1] + Math.sin(a0) * n * 1.5, exit[0] + Math.cos(a1) * n * 1.5, exit[1] + Math.sin(a1) * n * 1.5], X.shade(spectrum((k + 0.5) / 7), 0.45)); }
        for (let k = 0; k < 7; k++) {
          // listening, each band of the fan is one band of the room's sound: its reach and brightness
          const v = hear ? (lvl[k] += (g.input.bands[Math.min(7, Math.floor(k * 8 / 7))] - lvl[k]) * 0.5) : 1;
          const ang = 0.15 + a * 1.8 + k * spread, len = hear ? n * (0.12 + 0.88 * U.clamp(v * 1.2)) : n, bright = hear ? 0.4 + 0.8 * U.clamp(v) : 1;
          for (let w = 0; w < 3; w++) X.line(g, exit[0], exit[1] + w * 0.6, exit[0] + Math.cos(ang) * len, exit[1] + Math.sin(ang) * len + w, X.shade(spectrum(k / 7), (0.75 + 0.25 * (w === 1)) * bright));
        }
        X.line(g, hit[0], hit[1], exit[0], exit[1], X.rgb(230, 230, 240));
        X.poly(g, pts.flat(), (x, y) => X.mixPk(d[y * n + x], X.rgb(180, 220, 240), 0.35));
        for (let k = 0; k < 3; k++) X.line(g, ...pts[k], ...pts[(k + 1) % 3], X.rgb(200, 230, 255));
        if (L.right) L.flip(d);
      };
    }, function alt(R, U, g) {
      const { n, d } = g, c = n / 2, s = n * R.range(0.16, 0.26), walls = [X.rgb(10, 10, 16), X.rgb(14, 12, 30), X.rgb(24, 20, 18), X.rgb(232, 228, 220)], bg = R.pick(walls), lightWall = X.lum(bg) > 0.5;
      const spread = R.range(0.05, 0.12), bands = R.pick([6, 7, 7, 12]), second = R.bool(0.3), turn = R.range(0.1, 0.25), cx = c - (second ? n * 0.15 : 0);
      const L = prismLook(g);
      g.trait('Prism', s < n * 0.19 ? 'Small' : s > n * 0.23 ? 'Large' : 'Medium'); g.trait('Wall', ['Dark', 'Indigo', 'Brown', 'Paper'][walls.indexOf(bg)]); g.trait('Bands', bands); g.trait('Spread', spread < 0.08 ? 'Narrow' : spread < 0.1 ? 'Medium' : 'Wide'); g.trait('Second prism', second ? 'Yes' : 'No');
      let aim = n * 0.62;
      const lvl = new Float32Array(12);
      const prism = (px, py, a, size) => {
        const pts = [0, 1, 2].map(k => [px + size * Math.cos(a + k * U.TAU / 3 - Math.PI / 2), py + size * Math.sin(a + k * U.TAU / 3 - Math.PI / 2)]);
        X.poly(g, pts.flat(), (x, y) => X.mixPk(d[y * n + x], lightWall ? X.rgb(120, 170, 200) : X.rgb(180, 220, 240), 0.35));
        for (let k = 0; k < 3; k++) X.line(g, ...pts[k], ...pts[(k + 1) % 3], lightWall ? X.rgb(60, 90, 120) : X.rgb(200, 230, 255));
      };
      return (t) => {
        g.input.taps();
        if (g.input.inside) aim += (g.input.y * n - aim) * 0.3; else aim += (n * 0.62 - aim) * 0.02;
        d.fill(bg);
        if (lightWall) for (let y = 0; y < n; y += 2) for (let x = (y >> 1) & 1; x < n; x += 6) d[y * n + x] = X.shade(bg, 0.94);
        const a = Math.sin(t * turn) * 0.25, hit = [cx - s * 0.45, c + s * 0.05], exit = [cx + s * 0.42, c + s * 0.12];
        const beamC = lightWall ? X.rgb(250, 240, 180) : WHITE;
        X.line(g, 0, aim, hit[0], hit[1], beamC); X.line(g, 0, aim + 1, hit[0], hit[1] + 1, X.shade(beamC, 0.8));
        if (L.broad) { X.line(g, 0, aim - 1, hit[0], hit[1] - 1, X.shade(beamC, 0.6)); X.line(g, 0, aim + 2, hit[0], hit[1] + 1, X.shade(beamC, 0.5)); }
        const tilt = (aim - n * 0.62) / n * 0.6;
        const hear = g.input.listening;
        if (L.filled && !second) for (let k = 0; k < bands - 1; k++) { const a0 = 0.15 + a * 1.8 + tilt + k * spread * 7 / bands, a1 = a0 + spread * 7 / bands; X.poly(g, [exit[0], exit[1], exit[0] + Math.cos(a0) * n * 1.5, exit[1] + Math.sin(a0) * n * 1.5, exit[0] + Math.cos(a1) * n * 1.5, exit[1] + Math.sin(a1) * n * 1.5], lightWall ? X.mixPk(bg, spectrum((k + 0.5) / bands), 0.45) : X.shade(spectrum((k + 0.5) / bands), 0.45)); }
        for (let k = 0; k < bands; k++) {
          const v = hear ? (lvl[k] += (g.input.bands[Math.min(7, Math.floor(k * 8 / bands))] - lvl[k]) * 0.5) : 1, bright = hear ? 0.4 + 0.8 * U.clamp(v) : 1;
          const ang = 0.15 + a * 1.8 + tilt + k * spread * 7 / bands, len = (second ? n * 0.36 : n) * (hear && !second ? 0.12 + 0.88 * U.clamp(v * 1.2) : 1);
          for (let w = 0; w < 3; w++) X.line(g, exit[0], exit[1] + w * 0.6, exit[0] + Math.cos(ang) * len, exit[1] + Math.sin(ang) * len + w, X.shade(spectrum(k / bands), (0.75 + 0.25 * (w === 1)) * bright));
          if (second) { const ex = exit[0] + Math.cos(ang) * len, ey = exit[1] + Math.sin(ang) * len; X.line(g, ex, ey, cx + n * 0.42, c + n * 0.18, X.shade(spectrum(k / bands), 0.8)); }
        }
        if (second) { X.line(g, cx + n * 0.42, c + n * 0.18, n, c + n * 0.3, beamC); prism(cx + n * 0.42, c + n * 0.16, Math.PI - a, s * 0.8); }
        X.line(g, hit[0], hit[1], exit[0], exit[1], X.rgb(230, 230, 240));
        prism(cx, c, a, s);
        if (L.right) L.flip(d);
      };
    }),
  });

  add({
    name: 'Venetian', seed: 4, sizes: [100, 200], fps: 12,
    recipe: 'Afternoon sun through venetian blinds: bars of light lie slanted across a wall, a houseplant\'s leaves sway through them, and the bars creep down the wall as the sun sinks.',
    make(R, U, g) {
      const { n, d } = g, wall = R.pick([[226, 200, 170], [180, 190, 200], [200, 170, 190], [210, 210, 190]]), sun = X.rgb(255, 214, 140), slant = R.range(0.2, 0.5) * R.sign();
      const leaves = Array.from({ length: R.int(6, 10) }, () => ({ x: R.range(0.2, 0.8) * n, y: R.range(0.4, 0.9) * n, a: R.range(-1.3, 1.3), l: R.range(0.15, 0.3) * n, w: R.range(0.04, 0.07) * n, p: R() * 6 }));
      const base = X.rgb(wall[0], wall[1], wall[2]), shade = X.shade(base, 0.55);
      return (t) => {
        const drop = (t * 0.6) % (n * 0.2), pitch = n * 0.1, open = 0.55 + 0.1 * Math.sin(t * 0.2);
        const mask = new Uint8Array(n * n), m = { n, d: mask };
        for (const lf of leaves) { const a = lf.a + Math.sin(t * 0.8 + lf.p) * 0.08, ex = lf.x + Math.cos(a - Math.PI / 2) * lf.l, ey = lf.y + Math.sin(a - Math.PI / 2) * lf.l, mx = (lf.x + ex) / 2, my = (lf.y + ey) / 2, nx = -Math.sin(a - Math.PI / 2) * lf.w, ny = Math.cos(a - Math.PI / 2) * lf.w; X.poly(m, [lf.x, lf.y, mx + nx, my + ny, ex, ey, mx - nx, my - ny], 1); X.line(m, lf.x, lf.y, lf.x, n, 1); }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const v = ((y - x * slant - drop) % pitch + pitch) % pitch / pitch, lit = v < open && !mask[y * n + x] && y > n * 0.06 && x > n * 0.08 && x < n * 0.92;
          d[y * n + x] = lit ? X.mixPk(base, sun, 0.55 + (v < 0.05 ? 0.2 : 0)) : X.dith4(x, y) < 0.1 ? X.shade(shade, 0.95) : shade;
        }
      };
    },
  });

  const HALO = [[-1, 0], [2, 0], [0, -1], [0, 2], [1, -1], [1, 2], [-1, 1], [2, 1]];
  add({
    name: 'Infinity Mirror', seed: 5, sizes: [100, 200], fps: 12,
    listens: 'More lamps light as the room gets louder, and every beat sends a flash racing down the tunnel.',
    recipe: 'Two facing mirrors with a ring of lamps between them: the frame repeats into a tunnel of shrinking reflections, each a little dimmer and greener, and the lamps chase round them all.',
    make(R, U, g) {
      const { n, d } = g, h0 = R.range(0, 100), span = R.pick([0, 30, 100]), k = R.range(0.8, 0.86), lamps = R.int(10, 18), shape0 = R.int(0, 1);
      // traits: the frame's shape (two new ones join circle and square), how the tunnel sways, the lamps' colours and count, its depth
      const shapeK = g.trait('Frame', vary(g, [[shape0 ? 'Square' : 'Circle', 3], ['Hexagon', 1.2], ['Diamond', 1.2]])), shape = shapeK === 'Square' ? 1 : shapeK === 'Circle' ? 0 : 2;
      const sway = g.trait('Tunnel', vary(g, [['Gentle', 3], ['Swaying', 1.4]])) === 'Swaying' ? 3 : 1, sides = shapeK === 'Hexagon' ? 6 : 4, rot = shapeK === 'Hexagon' ? 0 : Math.PI / 4;
      g.trait('Lamps', lamps * 4); g.trait('Colours', span === 0 ? ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Violet', 'Pink'][Math.floor(h0 / 12.5) % 8] : span === 30 ? 'Neighbouring' : 'Rainbow'); g.trait('Depth', k < 0.82 ? 'Shallow' : k < 0.84 ? 'Medium' : 'Deep');
      const polyAt = (cx, cy, s, u) => { const e = u * sides, i = Math.floor(e), f = e - i, a0 = rot + i / sides * U.TAU - Math.PI / 2, a1 = rot + (i + 1) / sides * U.TAU - Math.PI / 2; return [cx + s * (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * f), cy + s * (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * f)]; };
      const kicks = [];   // times of the beats heard, each a flash travelling into the mirror
      let loud = 0;
      return (t) => {
        const inp = g.input, hear = inp.listening;
        if (hear) { loud += (inp.level - loud) * 0.4; if (inp.beats()) { kicks.push(t); if (kicks.length > 4) kicks.shift(); } }
        d.fill(X.rgb(6, 8, 10));
        let s = n * 0.47;
        for (let depth = 0; depth < 22 && s > 1.5; depth++, s *= k) {
          let flash = 0;
          if (hear) for (const t0 of kicks) { const z = depth - (t - t0) * 14; flash = Math.max(flash, Math.exp(-z * z / 2)); }
          const thr = hear ? 0.3 - loud * 0.9 : 0.3;
          const fade = Math.pow(0.86, depth), cx = n / 2 + Math.sin(t * 0.3) * depth * 0.25 * sway, cy = n / 2 + Math.cos(t * 0.23) * depth * 0.2 * sway;
          const per = lamps * 4, frame = X.mixPk(X.rgb(6, 8, 10), X.rgb(84, 116, 104), fade * 0.75);
          if (shape === 2) for (let q = 0; q < sides; q++) { const [ax, ay] = polyAt(cx, cy, s, q / sides), [bx, by] = polyAt(cx, cy, s, (q + 0.999) / sides); X.line(g, ax, ay, bx, by, frame); }
          else if (shape) { X.line(g, cx - s, cy - s, cx + s, cy - s, frame); X.line(g, cx + s, cy - s, cx + s, cy + s, frame); X.line(g, cx + s, cy + s, cx - s, cy + s, frame); X.line(g, cx - s, cy + s, cx - s, cy - s, frame); }
          else for (let q = 0; q < 64; q++) X.put(g, cx + Math.cos(q / 64 * U.TAU) * s, cy + Math.sin(q / 64 * U.TAU) * s, frame);
          for (let i = 0; i < per; i++) {
            const u = i / per, on = Math.sin(u * U.TAU * 3 - t * 2 + depth * 0.4) > thr || flash > 0.5;
            let x, y;
            if (shape === 0) { const a = u * U.TAU; x = cx + Math.cos(a) * s; y = cy + Math.sin(a) * s; }
            else if (shape === 2) [x, y] = polyAt(cx, cy, s, u);
            else { const e = u * 4, side = Math.floor(e), f = e - side; x = cx + s * (side === 0 ? -1 + 2 * f : side === 1 ? 1 : side === 2 ? 1 - 2 * f : -1); y = cy + s * (side === 0 ? -1 : side === 1 ? -1 + 2 * f : side === 2 ? 1 : 1 - 2 * f); }
            let lc = X.mixPk(X.rgb(6, 8, 10), X.mixPk(X.hsbPk(h0 + span * u, 80, 100), X.rgb(80, 255, 160), depth * 0.03), on ? fade : fade * 0.2);
            if (flash > 0.05) lc = X.mixPk(lc, WHITE, flash * 0.6 * fade);
            if (on && depth < 6) {   // a soft halo round each lit lamp in the nearer frames
              const hx = Math.round(x), hy = Math.round(y), hk = 0.32 * fade;
              for (const [ax, ay] of HALO) { const xx = hx + ax, yy = hy + ay; if (xx >= 0 && yy >= 0 && xx < n && yy < n) d[yy * n + xx] = X.mixPk(d[yy * n + xx], lc, hk); }
            }
            if (depth < 4 && on) X.rect(g, x - 0.5, y - 0.5, 2, 2, lc); else X.put(g, x, y, lc);
          }
        }
      };
    },
  });

  add({
    name: 'Camera Obscura', seed: 6, sizes: [100, 200], fps: 12,
    recipe: 'A dark room with a pinhole in one wall: outside, clouds pass a sun over a tree; inside, the same scene is thrown upside down onto the far wall in dim, warm light.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, sky = X.inks(R, 2, 0.6), half = n >> 1, tree = R.range(0.3, 0.7);
      const scene = (u, v, t) => {
        if (v > 0.72 + 0.03 * Math.sin(u * 7)) return X.rgb(70, 120, 60);
        const tx = u - tree, ty = v - 0.5;
        if (Math.abs(tx) < 0.02 && v > 0.5) return X.rgb(80, 50, 30);
        if (tx * tx + (ty * 1.3) ** 2 < 0.02) return X.rgb(40, 100, 50);
        const sunx = 0.75, suny = 0.25; if ((u - sunx) ** 2 + (v - suny) ** 2 < 0.004) return X.rgb(255, 240, 180);
        if (nz(u * 4 - t * 0.05, v * 6) > 0.35) return X.rgb(240, 240, 250);
        return X.mixPk(sky[0], sky[1], v);
      };
      const bx0 = Math.ceil(n * 0.58), bw = n - bx0 - 3;
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (x < n * 0.32) { d[i] = scene(x / (n * 0.32), y / n, t); continue; }
          if (x < n * 0.36) { d[i] = Math.abs(y - half) < 1 ? X.rgb(255, 240, 200) : X.rgb(60, 50, 44); continue; }
          const k = (x - n * 0.36) / (bx0 - n * 0.36), cone = Math.abs(y - half) < k * (half - 4);
          d[i] = cone && X.dith8(x, y) < 0.1 + 0.08 * k ? X.rgb(64, 54, 42) : X.rgb(22, 18, 16);
        }
        // the projection: the outside view, flipped both ways across the back wall
        for (let y = 4; y < n - 4; y++) for (let x = bx0; x < bx0 + bw; x++) {
          const u = 1 - (x - bx0) / bw, v = 1 - (y - 4) / (n - 8);
          d[y * n + x] = X.mixPk(X.rgb(24, 20, 18), scene(u, v, t), 0.42 + 0.12 * (X.dith4(x, y) > 0.5));
        }
        X.rect(g, bx0 - 1, 3, 1, n - 6, X.rgb(46, 38, 32));
      };
    },
  });

  add({
    name: 'Rainbow', seed: 7, sizes: [100, 200], fps: 12,
    recipe: 'A rain shower drifting over hills with the sun behind you: a rainbow stands in the falling rain, its secondary bow faint outside it, bright where the rain is thickest.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, cx = n * R.range(0.35, 0.65), cy = n * R.range(0.85, 1.05), r1 = n * 0.42, r2 = n * 0.52, sky = X.mixPk(X.inks(R, 1, 0.3)[0], X.rgb(120, 130, 150), 0.6);
      const hills = Float32Array.from({ length: n }, (_, x) => n * 0.78 + nz(x * 0.03, 1) * n * 0.06);
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (y > hills[x]) { d[i] = X.mixPk(X.rgb(60, 110, 50), X.rgb(30, 60, 30), (y - hills[x]) / (n * 0.2)); continue; }
          const rain = U.clamp(nz(x * 0.03 - t * 0.06, 2) * 0.8 + 0.5), r = Math.hypot(x - cx, y - cy);
          let c = X.mixPk(sky, X.rgb(90, 95, 110), rain * 0.6);
          if (((x * 3 + y * 7 + Math.floor(t * 20) * 5) % 13) === 0 && rain > 0.4) c = X.mixPk(c, WHITE, 0.25);
          const b1 = (r - r1) / (n * 0.07), b2 = (r2 - r) / (n * 0.07);
          if (b1 > 0 && b1 < 1) c = X.mixPk(c, spectrum(1 - b1), rain * 0.85);
          else if (b2 > 0 && b2 < 1) c = X.mixPk(c, spectrum(1 - b2), rain * 0.35);
          else if (r < r1) c = X.mixPk(c, WHITE, rain * 0.12);
          d[i] = c;
        }
      };
    },
  });

  add({
    name: 'Soap Film', seed: 8, sizes: [100], fps: 12,
    recipe: 'A soap film in a wire loop, seen against black: as the film drains and thins, interference paints it in swirling bands of magenta, gold and green, going dark near the top where it is thinnest.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, c = n / 2, rad = n * 0.44;
      const film = th => { const k = th * 6; return [Math.max(0, Math.cos(k * 1.0)) , Math.max(0, Math.cos(k * 1.25 + 1)), Math.max(0, Math.cos(k * 1.55 + 2))]; };
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, r = Math.hypot(x - c, y - c);
          if (r > rad) { d[i] = Math.abs(r - rad) < 1.2 ? X.rgb(150, 150, 160) : BLACK; continue; }
          const th = (y / n) * 1.4 + 0.35 * nz(x * 0.025 + t * 0.04, y * 0.03 - t * 0.08) + 0.08 * nz(x * 0.07, y * 0.07 + t * 0.15);
          const thin = y / n < 0.12 + 0.03 * Math.sin(x * 0.2 + t);
          const hq = Math.floor(th * 14) / 14;
          d[i] = thin ? X.rgb(12, 12, 18) : X.hsbPk(70 + hq * 90, 55 + 20 * Math.sin(hq * 9), 92);
        }
      };
    },
  });

  const lighthouseAlt = function (R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, left = R.bool(0.7), lx0 = n * R.range(0.22, 0.36), lx = left ? lx0 : n - lx0, ly0 = n * R.range(0.36, 0.46), sea = Math.round(n * R.range(0.55, 0.64)), ly = Math.round(Math.min(ly0, sea - 10 - n * 0.16));   // never a stub of a tower
      const SK = [[[6, 8, 24], [20, 26, 50], [4, 10, 24], [4, 10, 44]], [[20, 30, 30], [50, 64, 60], [10, 24, 24], [26, 44, 44]], [[40, 20, 60], [200, 90, 80], [24, 14, 40], [80, 40, 70]], [[10, 16, 40], [40, 60, 110], [8, 14, 34], [30, 50, 90]],
        [[70, 80, 130], [240, 170, 140], [40, 50, 84], [96, 96, 130]], [[110, 120, 132], [184, 190, 196], [56, 74, 86], [96, 116, 128]]];   // dawn, and a grey day
      const sk = R.pick(SK), beam = X.rgb(...R.pick([[255, 240, 180], [255, 255, 255], [255, 220, 140]])), moon = sk === SK[3] || R.bool(0.3);
      const sky = Array.from({ length: sea }, (_, y) => X.mixPk(X.rgb(...sk[0]), X.rgb(...sk[1]), Math.floor(y / sea * 6) / 6)), water = [X.rgb(...sk[2]), X.rgb(...sk[3])];
      const bands = R.pick([[[220, 220, 220], [200, 40, 40]], [[230, 230, 230], [30, 30, 34]], [[240, 236, 220], [40, 120, 70]], [[250, 250, 250], [250, 250, 250]]]), rock = X.shade(X.rgb(...sk[0]), 0.7);
      const fog = R.range(0.4, 1), speed = R.range(0.35, 0.7) * R.sign(), stars = Array.from({ length: 24 }, () => [R.int(0, n - 1), R.int(0, sea - 20)]), mx = n * R.range(0.55, 0.85), my = n * R.range(0.1, 0.25);
      const ship = { x: -10, v: R.range(1.5, 3) };
      // traits: the sky, the tower's paint, which side, how many beams, the weather, what it stands on, a ship
      g.trait('Sky', ['Night', 'Storm', 'Dusk', 'Moonlight', 'Dawn', 'Grey day'][SK.indexOf(sk)]); g.trait('Tower', ['Red bands', 'Black bands', 'Green bands', 'White'][[220, 230, 240, 250].indexOf(bands[0][0])]); g.trait('Side', left ? 'Left' : 'Right'); g.trait('Fog', fog < 0.6 ? 'Thin' : fog < 0.8 ? 'Patchy' : 'Thick');
      const four = g.trait('Beams', vary(g, [['Two', 3], ['Four', 1.4]])) === 'Four', rain = g.trait('Weather', vary(g, [['Clear', 3], ['Rain', 1.4]])) === 'Rain', islet = g.trait('Stands on', vary(g, [['Headland', 3], ['Islet', 1.4]])) === 'Islet';
      const drops = rain ? Array.from({ length: 70 }, () => ({ x: g.alt() * n, y: g.alt() * n, v: 5 + g.alt() * 3 })) : null, rainC = X.mixPk(X.rgb(...sk[1]), WHITE, 0.25);
      const LENS = four ? [0, Math.PI / 2] : [0], darkSky = SK.indexOf(sk) < 4;
      return (t, dt) => {
        const a = t * speed, ts = (t * 3) | 0, dirx = Math.cos(a), depth = Math.sin(a);
        ship.x += ship.v * dt; if (ship.x > n + 20) ship.x = -20;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          const crest = y >= sea && (x * 7 + y * 3 + ts) % 9 === 0;
          let c = y < sea ? sky[y] : water[crest ? 1 : 0];
          if (crest) { const al = (x - lx) * dirx; if (al > 0 && depth > -0.4 && nz(x * 0.12, y * 0.35 + t * 0.6) > 0.1) c = X.mixPk(c, beam, 0.5 * (0.35 + 0.65 * Math.min(1, depth + 0.4)) * Math.min(1, al / (n * 0.15)) * Math.exp(-al / (n * 0.45)) * (1 - 0.6 * (y - sea) / (n - sea))); }   // wave crests catch the passing beam
          const dx = x - lx, dy = y - ly;
          let k = 0;
          for (const o of LENS) for (let sgn = 1; sgn >= -1; sgn -= 2) {
            const dX = o ? -depth : dirx, dP = o ? dirx : depth, along = sgn * dx * dX, dep = sgn * dP;
            if (!(along > 0 && dep > -0.4)) continue;
            const off = Math.abs(dy - along * 0.05), w = 3.5 + 1.6 * Math.abs(along) * 0.12;
            if (off < w) k = Math.max(k, 2 * (1 - off / w) * Math.max(0, 1 - along / (n * 1.4)) * (0.35 + 0.65 * Math.max(0, dep + 0.4)));
          }
          if (k > 0) k *= (0.4 + 0.6 * (nz(x * 0.03 - t * 0.1, y * 0.06) * 0.5 + 0.5)) * fog;
          if (k > 0) c = X.mixPk(c, beam, U.clamp(Math.floor(k * 5 + X.dith4(x, y)) / 5));
          d[i] = c;
        }
        if (darkSky) for (const [sx, sy] of stars) if (d[sy * n + sx] === sky[sy]) d[sy * n + sx] = X.mixPk(sky[sy], WHITE, 0.6);
        if (moon && darkSky) { X.disc(g, mx, my, 4, X.rgb(236, 232, 210)); X.disc(g, mx + 1.5, my - 1, 3.5, sky[Math.round(my)]); for (let y = sea + 1; y < n; y += 2) if ((y * 5) % 3 === 0) X.rect(g, mx - 2 + ((y * 3) % 3), y, 3, 1, X.rgb(200, 196, 170)); }
        const sxp = Math.round(ship.x), sy0 = sea + 3;
        X.rect(g, sxp, sy0, 9, 2, X.rgb(20, 20, 26)); X.rect(g, sxp + 2, sy0 - 3, 4, 3, X.rgb(20, 20, 26)); X.put(g, sxp + 3, sy0 - 2, X.rgb(255, 210, 120)); X.put(g, sxp + 8, sy0 - 1, X.rgb(255, 60, 60));
        const hx = islet ? [lx - 13, sea + 3, lx - 9, sea - 7, lx - 2, sea - 11, lx + 7, sea - 10, lx + 13, sea + 3] : left ? [0, sea + 2, 0, sea - 6, lx - 6, sea - 12, lx + 10, sea - 10, lx + 22, sea + 2] : [n, sea + 2, n, sea - 6, lx + 6, sea - 12, lx - 10, sea - 10, lx - 22, sea + 2];
        X.poly(g, hx, rock);
        if (islet) for (let x = Math.round(lx - 14); x <= lx + 14; x += 3) X.put(g, x, sea + 3 + ((x * 7) & 1), X.mixPk(water[1], WHITE, 0.35));   // surf round the rock
        X.poly(g, [lx - 3, ly, lx + 3, ly, lx + 4, sea - 10, lx - 4, sea - 10], X.rgb(...bands[0]));
        for (let y = ly + 4; y < sea - 10; y += 6) X.rect(g, lx - 4, y, 9, 3, X.rgb(...bands[1]));
        X.rect(g, lx - 2, ly - 3, 5, 3, Math.abs(depth) > 0.3 ? beam : X.rgb(200, 170, 90));
        X.rect(g, lx - 3, ly - 5, 7, 2, X.rgb(30, 30, 30)); X.put(g, lx, ly - 6, X.rgb(30, 30, 30));
        if (drops) for (const q of drops) { q.y += q.v; q.x -= q.v * 0.35; if (q.y > n) { q.y = -4; q.x = g.alt() * n * 1.3; } X.line(g, q.x, q.y, q.x + 1, q.y - 3, rainC); }
      };
  };
  add({
    name: 'Lighthouse', seed: 9, sizes: [100], fps: 12,
    recipe: 'A lighthouse on a headland, its twin beams sweeping slowly round through sea fog: the fog lights up along each beam, and the waves catch it as it passes over them. Night, storm, dusk or moonlight, the tower’s colours, the headland and a passing ship change with every variation.',
    make: fork(function og(R, U, g) {
      // the original look keeps a third of its rolls; the rest go to the reworked scenes with their traits
      if (!g.home && g.alt() < 0.5) return lighthouseAlt(R, U, g);
      g.trait('Sky', 'Night'); g.trait('Tower', 'Red bands');
      const mirror = g.trait('Side', vary(g, [['Left', 3], ['Right', 2]])) === 'Right'; g.trait('Fog', 'Patchy'); g.trait('Beams', 'Two'); g.trait('Weather', 'Clear'); g.trait('Stands on', 'Headland');
      // the lamp sits high enough that a real tower stands under it on the headland
      const { n, d } = g, nz = U.noise(R).n2, lx = n * R.range(0.22, 0.36), ly = Math.round(n * 0.33), sea = Math.round(n * 0.58), beam = X.rgb(255, 240, 180);
      const sky = Array.from({ length: sea }, (_, y) => X.mixPk(X.rgb(6, 8, 24), X.rgb(20, 26, 50), y / sea)), water = [X.rgb(4, 10, 24), X.rgb(4, 10, 44)];   // fixed per row
      return (t) => {
        const a = t * 0.5, ts = (t * 3) | 0;
        const dirx = Math.cos(a), depth = Math.sin(a);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          const crest = y >= sea && (x * 7 + y * 3 + ts) % 9 === 0;
          let c = y < sea ? sky[y] : water[crest ? 1 : 0];
          if (crest) { const al = (x - lx) * dirx; if (al > 0 && depth > -0.4 && nz(x * 0.12, y * 0.35 + t * 0.6) > 0.1) c = X.mixPk(c, beam, 0.5 * (0.35 + 0.65 * Math.min(1, depth + 0.4)) * Math.min(1, al / (n * 0.15)) * Math.exp(-al / (n * 0.45)) * (1 - 0.6 * (y - sea) / (n - sea))); }   // wave crests catch the passing beam
          // two lenses back to back, so one beam is always crossing the frame
          const dx = x - lx, dy = y - ly;
          let k = 0;
          for (let sgn = 1; sgn >= -1; sgn -= 2) {
            const along = sgn * dx * dirx, dep = sgn * depth;
            if (!(along > 0 && dep > -0.4)) continue;
            const off = Math.abs(dy - along * 0.05), w = 3.5 + 1.6 * Math.abs(along) * 0.12;
            if (off < w) k = Math.max(k, 2 * (1 - off / w) * Math.max(0, 1 - along / (n * 1.4)) * (0.35 + 0.65 * Math.max(0, dep + 0.4)));
          }
          if (k > 0) k *= 0.4 + 0.6 * (nz(x * 0.03 - t * 0.1, y * 0.06) * 0.5 + 0.5);
          if (k > 0) c = X.mixPk(c, beam, U.clamp(Math.floor(k * 5 + X.dith4(x, y)) / 5));
          d[i] = c;
        }
        X.poly(g, [0, sea + 2, 0, sea - 6, lx - 6, sea - 12, lx + 10, sea - 10, lx + 22, sea + 2], X.rgb(16, 16, 20));
        X.poly(g, [lx - 3, ly, lx + 3, ly, lx + 4, sea - 10, lx - 4, sea - 10], X.rgb(220, 220, 220));
        for (let y = ly + 4; y < sea - 10; y += 6) X.rect(g, lx - 4, y, 9, 3, X.rgb(200, 40, 40));
        X.poly(g, [lx + 1, ly, lx + 3, ly, lx + 4, sea - 10, lx + 2, sea - 10], (x, y) => X.shade(d[y * n + x], 0.72));   // the shaded side of the tower
        X.rect(g, lx - 4, ly, 9, 1, X.rgb(30, 30, 30));   // the gallery rail
        X.rect(g, lx - 2, ly - 3, 5, 3, Math.abs(depth) > 0.3 ? beam : X.rgb(200, 170, 90));
        X.rect(g, lx - 3, ly - 5, 7, 2, X.rgb(30, 30, 30)); X.put(g, lx, ly - 6, X.rgb(30, 30, 30));
        if (mirror) for (let y = 0; y < n; y++) { const r = y * n; for (let a = 0, b = n - 1; a < b; a++, b--) { const v = d[r + a]; d[r + a] = d[r + b]; d[r + b] = v; } }
      };
    }, lighthouseAlt),
  });

  add({
    name: 'Fibre Lamp', seed: 10, sizes: [100, 200], fps: 12,
    listens: 'The fibres glow with the loudness of the room, and each beat sends a bright pulse up every thread.',
    recipe: 'A spray of optical fibres fanning out of a base, each a curved thread carrying pulses of light from the turning colour wheel below out to a bright tip.',
    make(R, U, g) {
      // traits: the shape of the spray, how many fibres, the base, the room behind, the colours
      const shape = g.trait('Shape', vary(g, [['Fan', 3], ['Fountain', 1.3], ['Dandelion', 1.2], ['Bouquet', 1.2]])), count = g.trait('Fibres', vary(g, [['Many', 3], ['Few', 1.2], ['Lush', 1.2]]));
      const baseK = g.trait('Base', shape === 'Dandelion' ? 'Stem' : vary(g, [['Cone', 3], ['Globe', 1.3]])), room = g.trait('Room', vary(g, [['Dark', 3], ['Midnight', 1.2], ['Plum', 1], ['Glow', 1.2]]));
      const { n, d } = g, M = Math.round((n >= 200 ? 70 : 40) * (count === 'Few' ? 0.55 : count === 'Lush' ? 1.6 : 1)), bx = n / 2, by = n * 0.88, fibres = Array.from({ length: M }, () => ({ a: R.range(-1.2, 1.2), l: R.range(0.45, 0.75) * n, bend: R.range(0.6, 1.4), p: R() })), h0 = R.range(0, 100), span = R.pick([40, 100]);
      g.trait('Colours', span === 100 ? 'Rainbow' : ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Violet', 'Pink'][Math.floor((h0 + 20) / 12.5) % 8]);
      const roomC = room === 'Midnight' ? X.rgb(8, 12, 34) : room === 'Plum' ? X.rgb(22, 8, 26) : X.rgb(6, 6, 12), hx = bx, hy = n * 0.46;
      const back = new Uint32Array(n * n).fill(roomC);
      if (room === 'Glow') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x - bx, (y - n * 0.55) * 1.2) / (n * 0.55); back[y * n + x] = X.mixPk(roomC, X.hsbPk(h0 + span / 2, 60, 40), Math.floor(Math.max(0, 1 - r) * 5 + X.dith4(x, y) * 0.9) / 5 * 0.6); }
      // where a fibre is at u (0..1 along it), for each shape
      const at = shape === 'Fountain' ? (f, u) => [bx + Math.sin(f.a * f.bend) * f.l * u * 0.75 + f.a * u * 6, by - f.l * 1.1 * (u - u * u * (0.72 + 0.2 * Math.abs(f.a)))]
        : shape === 'Dandelion' ? (f, u) => { const a2 = f.a * 2.6 + (f.p > 0.5 ? Math.PI : 0); return [hx + Math.cos(a2) * f.l * 0.55 * u + Math.sin(u * 3 + f.a) * 1.2, hy + Math.sin(a2) * f.l * 0.55 * u]; }
        : shape === 'Bouquet' ? (f, u) => [bx + Math.sin(f.a * 0.4 * f.bend) * f.l * u * u * 0.9 + f.a * 0.4 * u * 6, by - f.l * 1.12 * (u - 0.2 * u * u * Math.abs(f.a))]
        : null;
      const kicks = [];
      let loud = 0;
      return (t) => {
        const inp = g.input, hear = inp.listening;
        if (hear) { loud += (inp.level - loud) * 0.4; if (inp.beats()) { kicks.push(t); if (kicks.length > 5) kicks.shift(); } }
        d.set(back);
        if (shape === 'Dandelion') { X.rect(g, hx - 1, hy, 2, n - hy, X.rgb(40, 40, 50)); X.disc(g, hx, hy, 3, X.rgb(50, 50, 62)); }
        for (const f of fibres) {
          const steps = Math.floor(f.l), hue = h0 + span * (0.5 + 0.5 * Math.sin(t * 0.3 + f.a * 2));
          let px = at ? at(f, 0)[0] : bx, py = at ? at(f, 0)[1] : by;
          for (let s = 0; s <= steps; s++) {
            const u = s / steps, p = at && at(f, u), x = p ? p[0] : bx + Math.sin(f.a * f.bend) * f.l * u * u * 0.9 + f.a * u * 6, y = p ? p[1] : by - f.l * (u - 0.35 * u * u * Math.abs(f.a));
            let pulse = Math.max(0, Math.sin((u - t * 0.4 - f.p) * 12));
            if (hear) { pulse = Math.min(1, pulse * (0.6 + loud) + loud * 0.3); for (const t0 of kicks) { const z = u - (t - t0) * 1.1; pulse = Math.max(pulse, Math.exp(-z * z * 120)); } }
            if (s) X.line(g, px, py, x, y, X.mixPk(X.rgb(20, 20, 30), X.hsbPk(hue, 70, 100), 0.15 + 0.75 * pulse * pulse));
            px = x; py = y; if (s === steps) { X.put(g, x, y, X.mixPk(X.hsbPk(hue, 60, 100), WHITE, 0.5)); X.put(g, x + 1, y, X.hsbPk(hue, 80, 80)); }
          }
        }
        if (baseK === 'Cone') { X.poly(g, [bx - n * 0.12, n, bx - n * 0.06, by, bx + n * 0.06, by, bx + n * 0.12, n], X.rgb(40, 40, 50)); X.rect(g, bx - n * 0.06, by - 1, n * 0.12, 2, X.hsbPk(h0 + t * 3, 60, 100)); }
        else if (baseK === 'Globe') { X.disc(g, bx, n + n * 0.02, n * 0.14, X.rgb(44, 44, 56)); X.disc(g, bx, by + 1, n * 0.05, X.hsbPk(h0 + t * 3, 60, 100)); X.disc(g, bx - n * 0.04, n * 0.94, n * 0.025, X.rgb(70, 70, 84)); }
        else X.disc(g, hx, hy, 2, X.hsbPk(h0 + t * 3, 60, 100));
      };
    },
  });
})();
