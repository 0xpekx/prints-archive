// Set 2 · Physics: small simulations, stepped every frame and drawn in cells.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  P.addPixel({
    name: 'Surf', fam: 'Physics', sizes: [80, 100, 200], fps: 12,
    listens: 'The swell rises with the noise in the room; a clap throws up spray.',
    recipe: 'A beach seen side on: swells of several lengths add up and steepen, their crests spill into foam, and the depth of the water is painted in dithered bands.',
    make(R, U, g) {
      const VG = X.VG, inks = VG.inksN(R, 4, 0.35, true), waves = Array.from({ length: 4 }, (_, k) => ({ A: g.n * R.range(0.015, 0.04) / (k + 1) ** 0.5, k: R.range(0.04, 0.09) * (k + 1) * 100 / g.n, w: R.range(0.6, 1.2), p: R.range(0, 6) }));
      const { n, d } = g;
      g.trait('Sky', inks.name);
      const sw0 = waves.reduce((a, w) => a + w.A, 0) / n; g.trait('Swell', sw0 < 0.05 ? 'Gentle' : sw0 < 0.065 ? 'Rolling' : 'Heavy');
      // the hour, what stands at the shore, the water and where the horizon sits
      const time = VG.pick(g, 'Time', 'Day', ['Day', 'Day', 'Day', 'Sunset', 'Night', 'Dawn']), coast = VG.pick(g, 'Shore', 'Beach', ['Beach', 'Beach', 'Cliff', 'Pier', 'Rocks']);
      const water = VG.pick(g, 'Water', 'Blue', ['Blue', 'Blue', 'Tropical', 'Storm']), hz = VG.pick(g, 'Horizon', 'Middle', ['Middle', 'Middle', 'Low', 'High']);
      const horizon = Math.round(n * (hz === 'Low' ? 0.44 : hz === 'High' ? 0.28 : 0.36)), level = hz === 'Middle' ? n * 0.6 : horizon + n * 0.24;
      let seaC = water === 'Tropical' ? [X.rgb(150, 240, 225), X.rgb(30, 190, 190), X.rgb(10, 110, 140), X.rgb(5, 50, 80)] : water === 'Storm' ? [X.rgb(150, 170, 160), X.rgb(70, 100, 100), X.rgb(35, 55, 60), X.rgb(15, 25, 30)] : [X.mixPk(inks[2], 0xffd0c060, 0.5), 0xffa06020, 0xff602808, 0xff301004];
      let skyC = time === 'Sunset' ? [X.rgb(40, 20, 70), X.rgb(150, 50, 110), X.rgb(240, 120, 70), X.rgb(255, 200, 110)] : time === 'Night' ? [X.rgb(4, 6, 20), X.rgb(14, 22, 52), X.rgb(30, 44, 86)] : time === 'Dawn' ? [X.rgb(90, 120, 190), X.rgb(200, 170, 200), X.rgb(255, 210, 190)] : [X.shade(inks[0], 0.6), X.mixPk(inks[3], WHITE, 0.5)];
      if (time === 'Night') seaC = seaC.map(c => X.shade(c, 0.42)); else if (time === 'Sunset') seaC = seaC.map(c => X.mixPk(c, X.rgb(200, 90, 60), 0.22));
      const sea = X.rampPk(seaC, 6), sky = X.rampPk(skyC, 6), sand = time === 'Night' ? X.shade(0xff80c0e0, 0.45) : time === 'Sunset' ? X.mixPk(0xff80c0e0, X.rgb(220, 120, 90), 0.3) : 0xff80c0e0, far = X.mixPk(sea[1], sky[5], 0.35);
      // a sun or moon low over the water, and its broken reflection on the far sea
      const sunX = (g.home ? 0.5 : g.alt.range(0.25, 0.6)) * n, sunR = n * 0.06, sunY = time === 'Sunset' ? horizon - sunR * 0.3 : horizon - n * 0.16, sunC = time === 'Night' ? X.rgb(235, 235, 210) : time === 'Sunset' ? X.rgb(255, 230, 140) : X.rgb(255, 245, 220);
      const stars = time === 'Night' ? Array.from({ length: Math.round(n * 0.5) }, () => [g.alt.int(0, n - 1), g.alt.int(0, horizon - 3), g.alt()]) : [];
      const rock = time === 'Night' ? [X.rgb(18, 18, 26), X.rgb(30, 30, 40), X.rgb(46, 46, 58)] : [X.rgb(40, 34, 36), X.rgb(70, 60, 58), X.rgb(110, 96, 86)];
      const cliffTop = new Int16Array(n), rocks = coast === 'Rocks' ? Array.from({ length: 3 }, (_, k) => [n * (0.18 + k * 0.27 + g.alt.range(-0.05, 0.05)), n * g.alt.range(0.06, 0.11)]) : [];
      for (let x = 0; x < n; x++) cliffTop[x] = Math.round(horizon - n * 0.14 + Math.sin(x * 0.3) * 1.5 + (n - x) * 0.25);
      // the last of each wave running up the sand: a lace of foam, and wet sand darker behind it
      const wetSand = X.shade(sand, 0.78), wetSand2 = X.shade(sand, 0.68), lace = X.mixPk(WHITE, sea[0], 0.25);
      const foam = [], H = new Float32Array(n), S = new Float32Array(n), inp = g.input;
      let amp = 1;
      return (t, dt, f) => {
        // listening, the swell follows the room's loudness (eased, so it heaves rather than jumps)
        amp += ((inp.listening ? 1 + inp.level * 1.6 : 1) - amp) * 0.15;
        const claps = inp.listening ? inp.beats() : 0;
        for (let y = 0; y < n; y++) { const z = Math.min(5.99, y / horizon * 5.99); for (let x = 0; x < n; x++) d[y * n + x] = y >= horizon ? ((y - horizon) % 4 === 0 && (x + y * 3 + Math.floor(t * 3)) % 9 < 3 ? X.mixPk(far, WHITE, 0.25) : X.mixPk(far, sea[2], (y - horizon) / (level - horizon) * 0.6)) : sky[Math.min(5, Math.floor(z) + (X.dith4(x, y) < z % 1 ? 1 : 0))]; }
        if (time !== 'Day') {
          for (const [x, y, b] of stars) d[y * n + x] = b > 0.85 ? WHITE : X.rgb(110, 120, 160);
          for (let y = Math.max(0, Math.floor(sunY - sunR)); y < Math.min(horizon, sunY + sunR); y++) for (let x = Math.max(0, Math.floor(sunX - sunR)); x < Math.min(n, sunX + sunR); x++) if ((x + 0.5 - sunX) ** 2 + (y + 0.5 - sunY) ** 2 < sunR * sunR) d[y * n + x] = sunC;
          // the glitter path: short bright dashes under the sun that come and go
          for (let y = horizon + 1; y < level; y++) { const wdt = (y - horizon) * 0.35 + sunR * 0.6; for (let x = Math.max(0, Math.floor(sunX - wdt)); x < Math.min(n, sunX + wdt); x++) if ((x * 7 + y * 13 + Math.floor(t * 4) * 5) % 9 < 2) d[y * n + x] = X.mixPk(sunC, far, 0.35); }
        }
        for (let x = 0; x < n; x++) {
          let h = 0, s = 0;
          for (const w of waves) { const ph = w.k * x - w.w * t + w.p; h += w.A * Math.sin(ph); s += w.A * w.k * Math.cos(ph); }
          H[x] = level - h * amp; S[x] = s * amp;
        }
        // rocks stand in the surf: drawn before the water, so each wave washes over their feet
        for (const [rx, rr] of rocks) for (let x = Math.max(0, Math.floor(rx - rr)); x < Math.min(n, rx + rr); x++) {
          const top = Math.round(level - Math.sqrt(Math.max(0, rr * rr - (x + 0.5 - rx) ** 2)) * 0.8);
          for (let y = Math.max(0, top); y < n; y++) d[y * n + x] = y === top ? rock[2] : x > rx + rr * 0.2 ? rock[0] : rock[1];
        }
        for (let x = 0; x < n; x++) {
          const top = Math.round(H[x]), beach = n - Math.round((x / n) * n * 0.18) - 3, sw = Math.round(1.5 + 1.5 * Math.sin(t * 1.1 - x * 0.08) * (n / 100));
          for (let y = Math.max(0, top); y < n; y++) {
            if (y >= beach) { const wet = y - beach; d[y * n + x] = wet < 2 ? wetSand2 : wet < 4 + (sw > 1 ? 1 : 0) ? wetSand : (x * 3 + y * 7) % 11 ? sand : X.shade(sand, 0.85); continue; }
            if (y >= beach - 1 - sw) { d[y * n + x] = (x + y + (f >> 1)) % 3 ? lace : sea[1]; continue; }
            const z = (y - top) / (n - level) * 5;
            d[y * n + x] = sea[Math.min(5, Math.floor(z) + (X.dith4(x, y) < z % 1 ? 1 : 0))];
          }
          if (S[x] < -0.55 && R() < 0.5 && (amp === 1 || foam.length < 900)) foam.push({ x, y: top, life: 1, vx: -0.4 - R() * 0.6, vy: -R() * 0.4 });
          if (claps && foam.length < 600 && x % 2 === 0) foam.push({ x, y: top, life: 1, vx: g.alt.range(-0.8, 0.4), vy: -g.alt.range(0.6, 1.6) * n / 100 });
          if (S[x] < -0.3) { X.put(g, x, top, WHITE); X.put(g, x, top + 1, 0xffe0e0e0); }
        }
        // a headland: a lit grassy top edge, strata, a shadowed face toward the sea
        if (coast === 'Cliff') for (let x = Math.floor(n * 0.78); x < n; x++) for (let y = Math.max(0, cliffTop[x]); y < n; y++) d[y * n + x] = y - cliffTop[x] < 2 ? rock[2] : (x * 5 + (y >> 2) * 3) % 7 === 0 || x < n * 0.8 ? rock[0] : rock[1];
        if (coast === 'Cliff') for (let k = 0; k < 3; k++) { const x = Math.floor(n * 0.78) - 1 - k, y = Math.round(H[Math.max(0, x)]) - ((f + k * 3) % 6); if (y > 0) X.put(g, x, y, WHITE); }
        if (coast === 'Pier') {
          const deckY = Math.round(horizon + n * 0.08), x0 = Math.round(n * 0.4), sp = Math.max(4, Math.round(n / 14));
          for (let x = x0; x < n; x += sp) for (let y = deckY; y < n; y++) for (let xx = x; xx < Math.min(n, x + (n >= 100 ? 2 : 1)); xx++) d[y * n + xx] = y > H[xx] ? X.shade(rock[1], 0.7) : xx > x ? rock[0] : rock[1];
          X.rect(g, x0 - 1, deckY - 2, n - x0 + 1, 2, rock[2]); X.rect(g, x0 - 1, deckY, n - x0 + 1, 1, rock[0]);
          for (let x = x0; x < n; x += 3) X.put(g, x, deckY - 4, rock[1]); X.rect(g, x0 - 1, deckY - 5, n - x0 + 1, 1, rock[1]);
        }
        // spray where the swell meets a rock
        for (const [rx, rr] of rocks) for (let x = Math.max(0, Math.floor(rx - rr)); x < Math.min(n, rx + rr); x++) { const top = Math.round(level - Math.sqrt(Math.max(0, rr * rr - (x + 0.5 - rx) ** 2)) * 0.8); if (H[x] < top + 3 && (x + f) % 3 === 0) X.put(g, x, top - 1 - ((x + f) & 1), WHITE); }
        for (const p of foam) { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= 0.04; if (p.life > 0) X.put(g, p.x, p.y, p.life > 0.5 ? WHITE : 0xffd0c8c0); }
        for (let k = foam.length - 1; k >= 0; k--) if (foam[k].life <= 0) foam.splice(k, 1);
      };
    },
  });

  P.addPixel({
    name: 'Ball Pit', fam: 'Physics', sizes: [80, 100], fps: 12,
    interactive: 'Click to drop a ball where you point.',
    listens: 'A clap makes every ball jump; a loud room keeps them bouncing.',
    recipe: 'Balls of every size poured into a box, falling, bouncing off one another and settling into a heap; when the box is full it tips them out and fills again.',
    make(R, U, g) {
      // the original palette on the opening variation and at least half the rolls; a curated pixel scheme otherwise
      const VG = X.VG;
      if (g.home || g.alt() < 0.5) { const inks = VG.inksN(R, 6, 0.5); g.trait('Palette', inks.name); return pit(R, g, inks, X.shade(inks[0], 0.15), X.shade(inks[1], 0.08)); }
      const sc = X.PIX.scheme(R);
      g.trait('Palette', sc.name);
      return pit(R, g, sc.ramps.map(r => r[1]), sc.ground[2], sc.ground[0]);
      function pit(R, g, inks, floorC, bg) {
        const { n, d } = g, balls = [], inp = g.input;
        g.trait('Grid', n);
        // where the balls pour in, how big they run, and the wall behind the box
        const pour = VG.pick(g, 'Pour', 'Middle', ['Middle', 'Middle', 'Left', 'Right', 'Two spouts']), sizes = VG.pick(g, 'Balls', 'Mixed', ['Mixed', 'Mixed', 'Marbles', 'Beach balls']);
        const wall = VG.pick(g, 'Wall', 'Plain', ['Plain', 'Plain', 'Tiles', 'Stripes', 'Dots']), SZ = sizes === 'Marbles' ? 0.62 : sizes === 'Beach balls' ? 1.45 : 1, cap = n * 0.9 / (SZ * SZ);
        const wallC = X.mixPk(bg, X.shade(inks[2 % inks.length], 0.5), 0.22), wallP = new Uint32Array(n * n).fill(bg);
        if (wall !== 'Plain') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (wall === 'Tiles' ? x % 10 === 0 || y % 10 === 0 : wall === 'Stripes' ? (x >> 2) % 3 === 0 : x % 7 === 3 && y % 7 === 3) wallP[y * n + x] = wallC;
        let tip = 0;
        // the smallest balls are kept big enough to read as balls, not specks
        const add = (x, y, vx, r, c) => balls.push({ x, y, vx, vy: 0, r: Math.max(2.5, r) * n / 100, c });
        let spout = 0;
        const sim = f => {
          if (!tip && f % 3 === 0 && balls.length < cap) { let x = n / 2 + R.range(-n * 0.2, n * 0.2); if (pour === 'Left') x = n * 0.2 + (x - n / 2) * 0.5; else if (pour === 'Right') x = n * 0.8 + (x - n / 2) * 0.5; else if (pour === 'Two spouts') x = ((spout++) & 1 ? n * 0.75 : n * 0.25) + (x - n / 2) * 0.4; add(x, -4, R.range(-0.5, 0.5), R.pick([2, 2.5, 3, 3.5, 4.5, 5.5]) * SZ, inks[R.int(0, inks.length - 1)]); }
          if (balls.length >= cap && !tip) tip = 1;
          const floorY = tip ? n * 3 : n - 2;
          for (let it = 0; it < 3; it++) {
            for (const b of balls) {
              if (it === 0) { b.vy += 0.12; b.x += b.vx; b.y += b.vy; b.vx *= 0.99; }
              if (b.y > floorY - b.r) { b.y = floorY - b.r; b.vy *= -0.3; b.vx *= 0.9; }
              if (b.x < b.r) { b.x = b.r; b.vx *= -0.5; } if (b.x > n - b.r) { b.x = n - b.r; b.vx *= -0.5; }
            }
            for (let i = 0; i < balls.length; i++) for (let j = i + 1; j < balls.length; j++) {
              const a = balls[i], b = balls[j], dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy), m = a.r + b.r;
              if (dist < m && dist > 0) {
                const push = (m - dist) / 2, ux = dx / dist, uy = dy / dist;
                a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push;
                const rel = (b.vx - a.vx) * ux + (b.vy - a.vy) * uy;
                if (rel < 0) { a.vx += ux * rel * 0.5; a.vy += uy * rel * 0.5; b.vx -= ux * rel * 0.5; b.vy -= uy * rel * 0.5; }
              }
            }
          }
          if (tip) { for (const b of balls) b.vx += 0.02; if (balls.every(b => b.y > n + 8 || b.x > n + 8)) { balls.length = 0; tip = 0; } }
        };
        // the box is already filling when the piece opens
        const WARM = 120;
        for (let k = 0; k < WARM; k++) sim(k);
        return (t, dt, f) => {
          // taps drop balls (a burst of remembered taps is capped by the box: past full they wait for the next fill)
          for (const tap of inp.taps()) if (!tip && balls.length < cap + 6) add(tap.x * n, tap.y * n, 0, g.alt.pick([3, 4, 5.5]), inks[g.alt.int(0, inks.length - 1)]);
          if (inp.listening) {
            // a clap kicks every ball upward; a loud room keeps the top of the heap jostling
            const claps = inp.beats();
            if (claps) for (const b of balls) { b.vy -= g.alt.range(0.7, 1.5) * n / 100; b.vx += g.alt.range(-0.6, 0.6); }
            if (inp.level > 0.25) for (const b of balls) if (g.alt() < inp.level * 0.08) b.vy -= g.alt.range(0.3, 1) * inp.level * n / 100;
          }
          sim(f + WARM);
          if (wall === 'Plain') d.fill(bg); else d.set(wallP);
          // the floor is a trapdoor: when the box tips it swings open from the middle
          if (!tip) X.rect(g, 0, n - 2, n, 2, floorC); else { X.rect(g, 0, n - 2, 3, 2, floorC); X.rect(g, n - 3, n - 2, 3, 2, floorC); }
          for (const b of balls) X.disc(g, b.x, b.y, b.r, (x, y) => { const lx = (x + 0.5 - b.x) / b.r, ly = (y + 0.5 - b.y) / b.r; return lx < -0.2 && ly < -0.2 && lx * lx + ly * ly < 0.5 ? X.mixPk(b.c, WHITE, 0.5) : lx + ly > 0.7 ? X.shade(b.c, 0.65) : b.c; });
        };
      }
    },
  });

  P.addPixel({
    name: 'Ink Drop', seed: 2, fam: 'Physics', sizes: [50, 80], fps: 12,
    interactive: 'Drag through the water to stir in ink; click to let a drop fall.',
    recipe: 'Ink in water, solved as a real fluid: jets that slowly turn push the water, the ink rides the current and curls into eddies, and the colours are kept to a few flat inks.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, inks = X.VG.inksN(R, 4, 0.5), cols = inks.map(X.unpk), inp = g.input;
      let lpx = null, lpy = null, stir = 0, drops = 0;
      const VG = X.VG;
      let u = new Float32Array(N), v = new Float32Array(N), u2 = new Float32Array(N), v2 = new Float32Array(N), p = new Float32Array(N), div = new Float32Array(N);
      let dr = new Float32Array(N), dg = new Float32Array(N), db = new Float32Array(N), dr2 = new Float32Array(N), dg2 = new Float32Array(N), db2 = new Float32Array(N);
      const jets = Array.from({ length: R.int(2, 3) }, (_, k) => ({ a: R.range(0, U.TAU), r: R.range(0.2, 0.35), spin: R.range(0.15, 0.3) * R.sign(), col: cols[k % cols.length] }));
      g.trait('Palette', inks.name); g.trait('Grid', n); g.trait('Jets', jets.length);
      // how the jets are set (circling, facing each other across the tank, or rising from the floor), what the water is
      // (dark, or milk the ink clouds on), and how many steps of strength the ink is cut to
      const layout = VG.pick(g, 'Jets set', 'Circling', ['Circling', 'Circling', 'Facing', 'Fountain']), water = VG.pick(g, 'Water', 'Dark', ['Dark', 'Dark', 'Milk', 'Deep blue']), shades = VG.pick(g, 'Shades', 4, [4, 4, 2, 6]);
      const paper = water === 'Milk' ? [240, 236, 226] : water === 'Deep blue' ? [6, 14, 34] : [0, 0, 0], QS = 256 / shades;
      const I = (x, y) => Math.max(0, Math.min(n - 1, y)) * n + Math.max(0, Math.min(n - 1, x));
      const sample = (f, x, y) => { x = Math.max(0, Math.min(n - 1.001, x)); y = Math.max(0, Math.min(n - 1.001, y)); const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, i = y0 * n + x0; return (f[i] * (1 - fx) + f[i + 1] * fx) * (1 - fy) + (f[i + n] * (1 - fx) + f[i + n + 1] * fx) * fy; };
      // ink and push laid down in a soft round spot, so a nozzle is a bead of colour, not a square stamp
      const spot = (cx, cy, rad, c, fx, fy) => {
        for (let y = Math.ceil(-rad); y <= rad; y++) for (let x = Math.ceil(-rad); x <= rad; x++) {
          const q = 1 - (x * x + y * y) / (rad * rad + 0.5);
          if (q <= 0) continue;
          const i = I(Math.round(cx + x), Math.round(cy + y)), w = Math.min(1, q * 1.6);
          u[i] += fx * w; v[i] += fy * w; dr[i] += (c[0] - dr[i]) * w; dg[i] += (c[1] - dg[i]) * w; db[i] += (c[2] - db[i]) * w;
        }
      };
      const step = t => {
        jets.forEach((j, k) => {
          const a = j.a + t * j.spin;
          let cx = n / 2 + Math.cos(a) * n * j.r, cy = n / 2 + Math.sin(a) * n * j.r, dir = a + Math.PI / 2 + 0.6;
          if (layout === 'Facing') { const b = j.a * 0.2 + k * U.TAU / jets.length + Math.sin(a) * 0.35; cx = n / 2 + Math.cos(b) * n * 0.36; cy = n / 2 + Math.sin(b) * n * 0.36; dir = b + Math.PI + Math.sin(a * 1.3) * 0.5; }
          else if (layout === 'Fountain') { cx = n * (k + 1) / (jets.length + 1) + Math.sin(a) * n * 0.08; cy = n * 0.86; dir = -Math.PI / 2 + Math.sin(a * 1.3) * 0.6; }
          // the round spot covers ~15 cells' worth of weight where the original square stamp
          // covered 25, so each cell is pushed 1.0 (not 0.6): the same total push, the original pace
          spot(cx, cy, 2.5, j.col, Math.cos(dir), Math.sin(dir));
        });
        // advect velocity and dye backwards along the flow
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, sx = x - u[i], sy = y - v[i];
          u2[i] = sample(u, sx, sy) * 0.995; v2[i] = sample(v, sx, sy) * 0.995;
          dr2[i] = sample(dr, sx, sy) * 0.996; dg2[i] = sample(dg, sx, sy) * 0.996; db2[i] = sample(db, sx, sy) * 0.996;
        }
        [u, u2] = [u2, u]; [v, v2] = [v2, v]; [dr, dr2] = [dr2, dr]; [dg, dg2] = [dg2, dg]; [db, db2] = [db2, db];
        // make it incompressible
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; div[i] = -0.5 * (u[i + 1] - u[i - 1] + v[i + n] - v[i - n]); p[i] = 0; }
        for (let k = 0; k < 16; k++) for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; p[i] = (div[i] + p[i - 1] + p[i + 1] + p[i - n] + p[i + n]) / 4; }
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; u[i] -= 0.5 * (p[i + 1] - p[i - 1]); v[i] -= 0.5 * (p[i + n] - p[i - n]); }
      };
      // the water already holds a few seconds of ink when the piece opens
      const WARM = 2.5, dt0 = 1 / 12;
      for (let k = 0; k < WARM * 12; k++) step(k * dt0);
      return t => {
        // a click lets a drop of ink fall: it lands as a bead and blooms outward
        for (const tap of inp.taps()) {
          const c = cols[(drops++) % cols.length], cx = tap.x * n, cy = tap.y * n;
          for (let a = 0; a < 8; a++) { const ang = a / 8 * U.TAU; spot(cx + Math.cos(ang) * 1.5, cy + Math.sin(ang) * 1.5, 1.5, c, Math.cos(ang) * 0.5, Math.sin(ang) * 0.5); }
          spot(cx, cy, 2.2, c, 0, 0);
        }
        if (inp.down) {   // the viewer stirs: push along the drag and lay down ink
          const px = inp.x * n, py = inp.y * n;
          if (lpx !== null) { const vx = Math.max(-2, Math.min(2, px - lpx)), vy = Math.max(-2, Math.min(2, py - lpy)), c = cols[(stir >> 4) % cols.length]; spot(px, py, 2.5, c, vx * 0.84, vy * 0.84); stir++; }
          lpx = px; lpy = py;
        } else lpx = null;
        step(t + WARM);
        // each cell keeps the hue of the ink in it and only its strength is cut to four
        // dithered steps, so thin ink fades in clean grains of its own colour
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, r = dr[i], gg = dg[i], b = db[i], m = Math.max(r, gg, b);
          if (water === 'Dark' && shades === 4) {
            if (m < 1) { d[i] = BLACK; continue; }
            const L = Math.min(4, Math.floor(m / 64 + X.dith4(x, y))) * 64, k = Math.min(255, L) / m;
            d[i] = X.rgb(Math.min(255, r * k), Math.min(255, gg * k), Math.min(255, b * k));
            continue;
          }
          // the ink's strength in a few dithered steps, laid over the water's own colour
          const a = m < 1 ? 0 : Math.min(shades, Math.floor(m * (water === 'Milk' ? 1.6 : 1) / QS + X.dith4(x, y))) / shades, k = m < 1 ? 0 : (water === 'Milk' ? 175 : 255) / m;
          d[i] = X.rgb(paper[0] + (Math.min(255, r * k) - paper[0]) * a, paper[1] + (Math.min(255, gg * k) - paper[1]) * a, paper[2] + (Math.min(255, b * k) - paper[2]) * a);
        }
      };
    },
  });

  P.addPixel({
    name: 'Window', fam: 'Physics', sizes: [80, 100], fps: 12,
    interactive: 'Drag across the glass to wipe it clear; a click wipes a spot.',
    listens: 'The rain comes down harder as the room gets louder.',
    recipe: 'Rain on a window at night, with the city out of focus behind it. Small drops cling; big ones grow, give way and run down, swallowing the drops in their path and leaving a clear trail.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, VG = X.VG, inks = VG.inksN(R, 5, 0.4), bg = new Uint32Array(N), inp = g.input;
      g.trait('Lights', inks.name); g.trait('Grid', n);
      // what is out there (a city, a street, a harbour or a fair), the hour, and the window's own frame
      const scene = VG.pick(g, 'View', 'City', ['City', 'City', 'Street', 'Harbour', 'Fairground']), hour = VG.pick(g, 'Hour', 'Night', ['Night', 'Night', 'Dusk']), frame = VG.pick(g, 'Frame', 'None', ['None', 'None', 'Cross bars', 'Sash']);
      const duskA = X.rgb(70, 60, 120), duskB = X.rgb(150, 90, 110);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = hour === 'Dusk' ? X.mixPk(X.mixPk(duskA, duskB, y / n), X.shade(inks[0], 0.3), 0.35) : X.shade(inks[0], 0.06 + 0.06 * y / n);
      const hzY = Math.round(n * 0.52);
      if (scene === 'Harbour') for (let y = hzY; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = X.shade(bg[y * n + x], 0.55);
      // the city's lights out of focus: discs of light that add up where they overlap, each with the
      // slightly brighter rim a lens gives them
      const glowAdd = (i, c, k) => { const v = bg[i]; bg[i] = X.rgb(Math.min(255, (v & 255) + (c & 255) * k), Math.min(255, (v >> 8 & 255) + (c >> 8 & 255) * k), Math.min(255, (v >> 16 & 255) + (c >> 16 & 255) * k)); };
      for (let k = 0; k < 40; k++) {
        let cx = R.range(0, n), cy = R.range(n * 0.2, n), r = R.range(2, 6) * n / 100, c = X.shade(inks[R.int(0, inks.length - 1)], R.range(0.35, 0.8));
        // the same lights, set out as a street of lamps and tail-lights, a waterfront, or a wheel of bulbs
        if (scene === 'Street') { cy = n * 0.55 + (cy / n - 0.2) / 0.8 * n * 0.3; if (k % 3 === 0) c = X.rgb(255, 60, 40); else if (k % 3 === 1) c = X.rgb(255, 235, 200); r *= 0.8; }
        else if (scene === 'Harbour') { cy = n * 0.36 + (cy / n - 0.2) / 0.8 * n * 0.14; r *= 0.75; }
        else if (scene === 'Fairground') { const a = cx / n * U.TAU, rr = n * (k % 2 ? 0.3 : 0.18); cx = n * 0.5 + Math.cos(a) * rr; cy = n * 0.5 + Math.sin(a) * rr; r *= 0.6; }
        X.disc({ n, d: bg }, cx, cy, r, (x, y) => { const q = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; glowAdd(y * n + x, c, q > 0.72 ? 0.9 : 0.68); return bg[y * n + x]; });
        // on the water, each harbour light trails a broken column of reflection
        if (scene === 'Harbour') for (let y = hzY + 1; y < n; y += 2) { const w = Math.max(0.6, r * 0.6), sx = cx + Math.sin(y * 0.7 + k) * 1.2; for (let x = Math.floor(sx - w); x < sx + w; x++) if (x >= 0 && x < n) glowAdd(y * n + x, c, 0.3 * (1 - (y - hzY) / (n - hzY) * 0.7)); }
      }
      if (scene === 'Fairground') for (let y = Math.round(n * 0.5); y < n; y++) for (let x = Math.round(n * 0.5) - 1; x <= Math.round(n * 0.5); x++) glowAdd(y * n + x, inks[1], 0.15);
      // far lights too small to blur: a scatter of pin-points low in the view
      for (let k = 0; k < n * 0.4; k++) { const x = g.alt.int(0, n - 1), y = g.alt.int(Math.round(n * 0.45), n - 1); glowAdd(y * n + x, inks[g.alt.int(0, inks.length - 1)], 0.5); }
      // the fogged glass: the same view softened and lifted, so wiped and run-down glass shows it sharp
      const fogBg = new Uint32Array(N), haze = X.mixPk(X.shade(inks[0], 0.3), 0xff504840, 0.6);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let r = 0, gg = 0, b = 0, c = 0;
        for (let v = -2; v <= 2; v++) for (let u = -2; u <= 2; u++) { const xx = x + u, yy = y + v; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue; const q = bg[yy * n + xx]; r += q & 255; gg += q >> 8 & 255; b += q >> 16 & 255; c++; }
        fogBg[y * n + x] = X.mixPk(X.rgb(r / c, gg / c, b / c), haze, 0.32);
      }
      const drops = [], fog = new Float32Array(N).fill(1);
      const wipe = (cx, cy, r) => { for (let y = Math.max(0, Math.floor(cy - r)); y < Math.min(n, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x < Math.min(n, cx + r); x++) if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) fog[y * n + x] = 0; for (const a of drops) if ((a.x - cx) ** 2 + (a.y - cy) ** 2 < r * r) a.dead = true; };
      const sim = rain => {
        for (let k = 0; k < rain; k++) drops.push({ x: R.range(0, n), y: R.range(0, n), r: R.range(0.6, 1.4) * n / 100, vy: 0 });
        for (const a of drops) {
          if (a.r > 2.2 * n / 100) { a.vy = Math.min(1.2, a.vy + 0.05); a.y += a.vy; a.x += Math.sin(a.y * 0.3) * 0.15; for (let k = -1; k <= 1; k++) { const i = Math.floor(a.y - a.r) * n + Math.floor(a.x) + k; if (i >= 0 && i < N) fog[i] = 0; } }
          else a.r += 0.004;
        }
        for (let i = 0; i < drops.length; i++) for (let j = i + 1; j < drops.length; j++) {
          const a = drops[i], b = drops[j];
          if (a.dead || b.dead) continue;
          if (Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) { const big = a.r >= b.r ? a : b, small = big === a ? b : a; big.r = Math.sqrt(big.r * big.r + small.r * small.r); small.dead = true; }
        }
        for (let k = drops.length - 1; k >= 0; k--) if (drops[k].dead || drops[k].y > n + 5) drops.splice(k, 1);
        while (drops.length > 260) drops.shift();
        for (let i = 0; i < N; i++) fog[i] = Math.min(1, fog[i] + 0.002);
      };
      // it has been raining for a while when the piece opens
      for (let k = 0; k < 90; k++) sim(2);
      return (t, dt, f) => {
        // listening, the rain thickens with the room's loudness
        sim(inp.listening ? 2 + Math.round(inp.level * 9) : 2);
        if (inp.down) wipe(inp.x * n, inp.y * n, n * 0.06);
        for (const tap of inp.taps()) wipe(tap.x * n, tap.y * n, n * 0.06);
        for (let i = 0; i < N; i++) d[i] = X.mixPk(bg[i], fogBg[i], fog[i] * 0.88);
        for (const a of drops) X.disc(g, a.x, a.y, Math.max(0.7, a.r), (x, y) => {
          const lx = (x + 0.5 - a.x) / a.r, ly = (y + 0.5 - a.y) / a.r, sx = Math.round(a.x - lx * a.r * 2.5), sy = Math.round(a.y - ly * a.r * 2.5);
          if (lx < -0.3 && ly < -0.3) return 0xffe0e0e0;
          const seen = bg[Math.max(0, Math.min(n - 1, sy)) * n + Math.max(0, Math.min(n - 1, sx))];
          // each drop is a little lens: the view through it, upside down and gathered brighter, lit along its lower rim
          return X.mixPk(seen, WHITE, 0.24 + (ly > 0.5 ? 0.22 : 0));
        });
        // the window's frame, in front of everything: dark wood with a lit inner edge
        if (frame !== 'None') {
          const fw = Math.max(2, Math.round(n * 0.03)), wood = X.rgb(26, 20, 18), edge = X.rgb(64, 52, 44);
          if (frame === 'Cross bars') { X.rect(g, Math.round(n / 2 - fw / 2), 0, fw, n, wood); X.rect(g, 0, Math.round(n / 2 - fw / 2), n, fw, wood); X.rect(g, Math.round(n / 2 - fw / 2), 0, 1, n, edge); X.rect(g, 0, Math.round(n / 2 - fw / 2), n, 1, edge); }
          else { const y0 = Math.round(n * 0.4); X.rect(g, 0, y0, n, fw + 1, wood); X.rect(g, 0, y0, n, 1, edge); X.rect(g, 0, 0, fw, n, wood); X.rect(g, n - fw, 0, fw, n, wood); X.rect(g, fw, 0, 1, n, edge); }
        }
      };
    },
  });

  P.addPixel({
    name: 'Galton', fam: 'Physics', sizes: [80, 100], fps: 12,
    interactive: 'Click to pour in a handful of beads.',
    recipe: 'Beads poured through a triangle of pegs, each knocked left or right at every row by chance, collect in columns that grow into the bell curve, or a lopsided one when the board leans.',
    make(R, U, g) {
      // the original palette on the opening variation and at least half the rolls; a curated scheme and a leaning board otherwise
      const VG = X.VG;
      if (g.home || g.alt() < 0.5) { const inks = VG.inksN(R, 5, 0.5); g.trait('Palette', inks.name); return board(inks, 0xff8a8a8a, 0xff101010, g.home ? 0.5 : g.alt.pick([0.5, 0.5, 0.5, 0.36, 0.64])); }
      const sc = X.PIX.scheme(R);
      g.trait('Palette', sc.name);
      return board(sc.ramps.map(r => r[1]), sc.ramps[0][2], sc.ground[0], R.pick([0.5, 0.5, 0.5, 0.35, 0.65]));
      function board(inks, peg, bg, lean) {
        g.trait('Board', lean < 0.45 ? 'Leans right' : lean > 0.55 ? 'Leans left' : 'Level'); g.trait('Grid', g.n);
        // how fine the pins are set, how the beads are coloured, and the case the board is built in
        const pins = VG.pick(g, 'Pins', 'Standard', ['Standard', 'Standard', 'Fine', 'Coarse']), fill = VG.pick(g, 'Beads', 'Bands', ['Bands', 'Bands', 'Confetti', 'By column']), cased = VG.pick(g, 'Case', 'Plain', ['Plain', 'Plain', 'Wood', 'Glass']);
        const { n, d } = g, sp = pins === 'Fine' ? 3 : pins === 'Coarse' ? 5 : 4, rows = pins === 'Standard' ? Math.floor(n / 10) : Math.floor(n * 0.4 / sp), top = 6, cx = n / 2, bins = new Uint16Array(rows + 1), stacks = Array.from({ length: rows + 1 }, () => []), inp = g.input;
        // coarser pins take a frame longer per row, so the beads never fall faster than on the standard board
        const SUBN = sp === 5 ? 3 : 2;
        const wall = cased === 'Wood' ? X.rgb(110, 70, 40) : cased === 'Glass' ? X.rgb(90, 120, 140) : 0xff404040, floorC = cased === 'Wood' ? X.rgb(150, 100, 60) : cased === 'Glass' ? X.rgb(150, 180, 200) : 0xff606060;
        if (cased === 'Wood') { bg = X.rgb(46, 28, 18); peg = X.rgb(230, 190, 90); } else if (cased === 'Glass') { bg = X.rgb(14, 24, 34); peg = X.rgb(190, 225, 240); }
        const beads = [], floorY = n - 2, binTop = top + rows * sp + 6;
        let col = 0, draining = false, poured = 0;
        const sim = f => {
          if (f % 2 === 0) beads.push({ row: -1, k: 0, sub: 0, c: fill === 'Confetti' ? inks[g.alt.int(0, inks.length - 1)] : inks[(col++ >> 4) % inks.length] });
          for (const b of beads) {
            if (b.row < rows) { if (++b.sub >= SUBN) { b.sub = 0; b.row++; if (b.row > 0) b.k += (b.alt ? g.alt() : R()) < lean ? 0 : 1; } }
            else if (!b.done) { b.done = true; bins[b.k]++; stacks[b.k].push(fill === 'By column' && !b.alt ? inks[Math.abs(b.k - (rows >> 1)) % inks.length] : b.c); }
          }
          for (let k = beads.length - 1; k >= 0; k--) if (beads[k].done) { if (beads[k].alt) poured--; beads.splice(k, 1); }
          // a full board is not wiped: a gate in the floor opens and the columns run out from the bottom
          if (!draining && Math.max(...bins) > floorY - binTop - 2) draining = true;
          if (draining) { let left = 0; stacks.forEach((s, k) => { s.splice(0, 2); bins[k] = s.length; left += s.length; }); if (!left) draining = false; }
        };
        // the columns have been filling for a while when the piece opens
        const WARM = 160;
        for (let k = 0; k < WARM; k++) sim(k);
        return (t, dt, f) => {
          // each tap pours a handful of white beads; a burst of remembered taps is capped at a few handfuls in flight
          for (const tap of inp.taps()) if (poured < 48) for (let k = 0; k < 12; k++) { beads.push({ row: -1 - k, k: 0, sub: 0, c: WHITE, alt: true }); poured++; }
          sim(f + WARM);
          d.fill(bg);
          for (let r = 0; r < rows; r++) for (let k = 0; k <= r; k++) X.put(g, cx + (k - r / 2) * sp * 2, top + r * sp, peg);
          for (let k = 0; k <= rows; k++) {
            const x = Math.round(cx + (k - rows / 2) * sp * 2);
            X.rect(g, x - sp, binTop, 1, floorY - binTop, wall);
            stacks[k].forEach((c, j) => X.rect(g, x - sp + 1, floorY - 1 - j, sp * 2 - 1, 1, c));
          }
          X.rect(g, 0, floorY, n, 2, floorC);
          if (draining) for (let k = 0; k <= rows; k++) { const x = Math.round(cx + (k - rows / 2) * sp * 2); X.rect(g, x - sp + 2, floorY, sp * 2 - 3, 2, bg); }
          for (const b of beads) {
            const r = Math.max(0, b.row), x = cx + (b.k - r / 2) * sp * 2 + (b.sub ? ((b.alt ? g.alt() : R()) < 0.5 ? -1 : 1) : 0), y = top + r * sp - 2 + b.sub * 2;
            X.rect(g, x, y, 2, 2, b.c);
          }
        };
      }
    },
  });

  P.addPixel({
    name: 'Thermal', seed: 2, fam: 'Physics', sizes: [80, 100], fps: 10,
    interactive: 'Your pointer is a warm hand in front of the camera; touch the wall to leave a handprint.',
    recipe: 'A room seen through a heat camera: figures walk in and out, a cup steams on the table, a cat sleeps by the radiator, and the warmth they leave spreads and fades.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, T = new Float32Array(N), T2 = new Float32Array(N), VG = X.VG;
      // the camera's false colour (ironbow, rainbow, white-hot or arctic), the pet and what heats the room
      const cam = VG.pick(g, 'Camera', 'Ironbow', ['Ironbow', 'Ironbow', 'Rainbow', 'White hot', 'Arctic']), pet = VG.pick(g, 'Pet', 'Cat', ['Cat', 'Cat', 'Dog', 'Two cats']), heater = VG.pick(g, 'Heater', 'Radiator', ['Radiator', 'Radiator', 'Fireplace']);
      const iron = X.rampPk(cam === 'Rainbow' ? [X.rgb(10, 0, 40), X.rgb(40, 0, 160), X.rgb(0, 120, 220), X.rgb(0, 200, 120), X.rgb(240, 230, 0), X.rgb(255, 90, 0), X.rgb(255, 255, 255)] : cam === 'White hot' ? [X.rgb(8, 8, 10), X.rgb(50, 50, 56), X.rgb(120, 120, 126), X.rgb(200, 200, 204), WHITE] : cam === 'Arctic' ? [X.rgb(4, 10, 40), X.rgb(20, 60, 140), X.rgb(60, 160, 220), X.rgb(200, 240, 255), X.rgb(255, 210, 120), X.rgb(255, 140, 40)] : [0xff200000, 0xff802040, 0xffa020c0, 0xff2050f0, 0xff20b0ff, 0xffa0f0ff, WHITE], 64);
      // o: the warmest skin, x: clothed body, l: legs, cooler still
      const mask = (x0, y0, spr, s, heat) => { for (let r = 0; r < spr.length; r++) for (let c = 0; c < spr[r].length; c++) { const ch = spr[r][c]; if (ch !== '.') { const h = heat * (ch === 'o' ? 1 : ch === 'l' ? 0.7 : 0.8); for (let v = 0; v < s; v++) for (let u = 0; u < s; u++) { const x = Math.round(x0 + c * s + u), y = Math.round(y0 + r * s + v); if (x >= 0 && y >= 0 && x < n && y < n) T[y * n + x] = Math.max(T[y * n + x], h); } } } };
      // two strides, so the figures walk instead of gliding
      const person = [['.oo.', '.oo.', 'xxxx', 'xxxx', 'xxxx', '.xx.', '.ll.', '.l.l', '.l.l'], ['.oo.', '.oo.', 'xxxx', 'xxxx', 'xxxx', '.xx.', '.ll.', '.ll.', '.ll.']], cat = ['x..x...', 'xxxx...', 'xxxxxxx', '.xxxxxx', '.x...x.'], cup = ['xxx', 'xxxx', 'xxx'];
      const lens = VG.pick(g, 'Lens', 'Wide', ['Wide', 'Wide', 'Close']), s = Math.max(1, Math.round(n / 40)) + (lens === 'Close' ? 1 : 0), walkers = Array.from({ length: R.int(1, 3) }, () => ({ x: R.range(-20, n), v: R.range(0.2, 0.45) * R.sign() }));
      const radX = R.pick([4, n - 10]), catX = radX < n / 2 ? radX + 8 : radX - 8 * s - 4, tableX = R.range(0.3, 0.55) * n, inp = g.input;
      g.trait('People', walkers.length);
      const dog = ['......xo', 'x....xxx', 'xxxxxxx.', 'xxxxxxx.', 'l.l..l.l', 'l.l..l.l'], fireW = 12 * s / 2 | 0;
      // which room the camera looks into: a lounge with a cup on the table, a bedroom with a sleeper, or a kitchen with the hob on
      const room0 = VG.pick(g, 'Room', 'Lounge', ['Lounge', 'Lounge', 'Bedroom', 'Kitchen']);
      const sleeper = ['.....oo', 'xxxxxoo', 'xxxxxxx'], pot = ['x....x', 'xxxxxx', 'xxxxxx'];
      const petX = heater === 'Radiator' ? catX : radX < n / 2 ? 2 + fireW + 2 : n - 2 - fireW - 8 * s - 2;
      // the room itself, faintly: walls a touch warmer than the cold window glass, the floor warmer again,
      // and a lamp overhead; laid under everything else as the temperature nothing falls below
      const room = new Float32Array(N), winW = Math.round(n * 0.26), winX = radX < n / 2 ? Math.round(n * 0.62) : Math.round(n * 0.12), winY = Math.round(n * 0.14), winH = Math.round(n * 0.26), lampX = Math.round(n * g.alt.range(0.3, 0.7));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let v = 0.022 + 0.012 * y / n;
        if (y > n - 3) v = 0.07;
        if (x >= winX && x < winX + winW && y >= winY && y < winY + winH) v = x === winX || x === winX + winW - 1 || y === winY || y === winY + winH - 1 || x === winX + (winW >> 1) ? 0.05 : 0.0;
        const ly = y - 3, lx = x - lampX;
        if (ly >= 0 && ly < 2 * s && Math.abs(lx) <= s) v = 0.62; else if (y < 3 && lx === 0) v = 0.14;
        room[y * n + x] = v;
      }
      // handprints the viewer leaves on the wall, fading over half a minute
      const prints = [], palm = ['.l.l.', 'llll.', 'lxxxl', 'xxxx.', '.xx..'];
      return (t, dt, f) => {
        for (const tap of inp.taps()) { prints.push({ x: tap.x * n - 2.5 * s, y: tap.y * n - 2.5 * s, h: 0.9 }); if (prints.length > 10) prints.shift(); }
        for (let i = 0; i < N; i++) { const v = T[i] * 0.9; T[i] = v > room[i] ? v : room[i]; }
        for (let k = prints.length - 1; k >= 0; k--) { const p = prints[k]; p.h *= 0.994; if (p.h < 0.14) prints.splice(k, 1); else mask(p.x, p.y, palm, s, p.h); }
        if (inp.inside) X.disc({ n, d: T }, inp.x * n, inp.y * n, 3 * s, 0.95);
        if (heater === 'Radiator') for (let y = Math.round(n * 0.55); y < n * 0.85; y++) for (let x = radX; x < radX + 5; x++) T[y * n + x] = Math.max(T[y * n + x], (y & 2) ? 0.75 : 0.6);
        else {
          // a hearth: a warm surround and flames that lick and flicker inside it
          const fx0 = radX < n / 2 ? 2 : n - 2 - fireW, fy1 = n - 2, fy0 = Math.round(n * 0.62);
          for (let y = fy0; y < fy1; y++) for (let x = fx0; x < fx0 + fireW; x++) { const edge = x < fx0 + s || x >= fx0 + fireW - s || y < fy0 + s; T[y * n + x] = Math.max(T[y * n + x], edge ? 0.45 : 0.2); }
          for (let x = fx0 + s; x < fx0 + fireW - s; x++) { const h = (fy1 - fy0 - s) * (0.45 + 0.35 * Math.sin(t * 5 + x * 1.7) * Math.sin(t * 3.1 + x * 0.6)); for (let y = fy1 - 1; y > fy1 - h; y--) T[y * n + x] = Math.max(T[y * n + x], 0.98 - (fy1 - y) / (fy1 - fy0) * 0.35); }
        }
        if (pet === 'Dog') mask(petX - (radX < n / 2 ? 0 : s), n - 6 * s - 2, dog, s, 0.66);
        else { mask(petX, n - 6 * s - 2, cat, s, 0.62); if (pet === 'Two cats') mask(petX + (radX < n / 2 ? 9 * s : -9 * s), n - 6 * s - 2, cat, s, 0.6); }
        if (room0 === 'Bedroom') {
          // a bed with someone asleep in it, breathing slowly; the duvet keeps most of their warmth in
          const bx = tableX - 6 * s, by = Math.round(n * 0.7);
          X.rect({ n, d: T }, bx, by, 16 * s, 2 * s, 0.28); X.rect({ n, d: T }, bx, by - 3 * s, s, 5 * s, 0.25);
          mask(bx + 2 * s, by - 3 * s, sleeper, 2 * s / 2 | 0 || 1, 0.62 + 0.04 * Math.sin(t * 1.2));
          mask(bx + 2 * s, by - 3 * s, ['xxxxx'], 2 * s / 2 | 0 || 1, 0.4);
        } else {
          const kitchen = room0 === 'Kitchen';
          if (kitchen) { mask(tableX, n * 0.62 - 3 * s, pot, s, 0.75); X.rect({ n, d: T }, tableX - s, n * 0.62 - s, 8 * s, s, 0.98); X.rect({ n, d: T }, tableX + 9 * s, n * 0.62 - s, 3 * s, s, 0.9); }
          else mask(tableX, n * 0.62 - 3 * s, cup, s, 0.9);
          for (let k = 0; k < (kitchen ? 4 : 2); k++) { const y = Math.round(n * 0.62 - 3 * s - 2 - ((t * 6 + k * 7) % 14)); X.put({ n, d: T }, tableX + (kitchen ? 2 * s + (k & 1) * 2 * s : s) + Math.round(Math.sin(t * 2 + k + y * 0.4) * 1.5), y, 0.7); }
          X.rect({ n, d: T }, tableX - 6 * s, n * 0.62, 14 * s, s, 0.3);
          if (kitchen) X.rect({ n, d: T }, tableX - 6 * s, n * 0.62, 14 * s, n * 0.38, 0.12);
        }
        for (const w of walkers) { w.x += w.v; if (w.x > n + 10) w.x = -6 * s; if (w.x < -6 * s - 10) w.x = n + 4; const st = (Math.floor(w.x) >> 2) & 1; mask(w.x, n - 9 * s - 2 + st, person[st], s, 0.85); }
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; T2[i] = (T[i] * 4 + T[i - 1] + T[i + 1] + T[i - n] + T[i + n]) / 8; }
        for (let i = 0; i < N; i++) { const v = Math.max(T[i], T2[i]) * 0.92 + 0.06; d[i] = iron[Math.min(63, Math.floor(v * 64 + X.dith4(i % n, i / n | 0) * 2))]; }
        const cx = n >> 1, cy = n >> 1;
        for (let k = 3; k < 7; k++) { X.put(g, cx + k, cy, WHITE); X.put(g, cx - k, cy, WHITE); X.put(g, cx, cy + k, WHITE); X.put(g, cx, cy - k, WHITE); }
        X.text(g, (20 + T[cy * n + cx] * 18).toFixed(1).replace('.', '.'), 2, 2, WHITE);
      };
    },
  });

  P.addPixel({
    name: 'Erosion', seed: 1, fam: 'Physics', sizes: [80, 100], fps: 10,
    interactive: 'Hold the button to rain a storm where you point; a click is a cloudburst that cuts a gully.',
    recipe: 'Hills worn down by rain: thousands of drops run downhill, picking up soil where they speed up and dropping it where they slow, so valleys cut deeper and the fresh paths glint blue.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, H = new Float32Array(N), H0 = new Float32Array(N), flow = new Float32Array(N), nz = U.noise(R), VG = X.VG, inks = VG.inksN(R, 5, 0, true), ramp = X.rampPk(inks, 48), inp = g.input;
      g.trait('Palette', inks.name); g.trait('Grid', n);
      // the shape of the land before the rain (a dome, a ridge, a basin or a mesa), its grain, and what runs in the streams
      const form = VG.pick(g, 'Land', 'Dome', ['Dome', 'Dome', 'Ridge', 'Basin', 'Terraces']), grain = VG.pick(g, 'Relief', 'Hills', ['Hills', 'Hills', 'Mountains', 'Downs']), F = grain === 'Mountains' ? 2 : grain === 'Downs' ? 0.75 : 1.2;
      const streams = VG.pick(g, 'Streams', 'Water', ['Water', 'Water', 'Water', 'Water', 'Silver', 'Lava']), wc1 = streams === 'Lava' ? X.rgb(255, 80, 20) : streams === 'Silver' ? X.rgb(200, 210, 225) : 0xffff9a30, wc2 = streams === 'Lava' ? X.rgb(255, 220, 90) : streams === 'Silver' ? WHITE : 0xffffc070;
      const ra = g.alt.range(0, Math.PI);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const u = x / n - 0.5, v = y / n - 0.5, r = Math.hypot(u, v), b = nz.fbm(x / n * F, y / n * F, 4, 4) + 0.5;
        H0[y * n + x] = form === 'Dome' ? b - r * 0.4 : form === 'Ridge' ? b * 0.8 + 0.2 - Math.abs(u * Math.cos(ra) + v * Math.sin(ra)) * 0.9 : form === 'Basin' ? b * 0.8 + r * 0.55 : (Math.floor((b - r * 0.4) * 7) / 7) * 0.85 + (b - r * 0.4) * 0.15;
      }
      H.set(H0);
      let age = 0, uplift = 0;
      const bursts = [];
      // one drop rolled downhill from (x, y): it digs where it speeds up and drops soil where it slows
      const roll = (x, y) => {
        let vx = 0, vy = 0, sed = 0, w = 1;
        for (let s = 0; s < 40; s++) {
          const xi = Math.min(n - 2, Math.max(0, Math.floor(x))), yi = Math.min(n - 2, Math.max(0, Math.floor(y))), i0 = yi * n + xi, h0 = H[i0];
          vx = vx * 0.3 - (H[i0 + 1] - h0); vy = vy * 0.3 - (H[i0 + n] - h0);
          const l = Math.hypot(vx, vy); if (l < 1e-6) break;
          const nx = x + vx / l, ny = y + vy / l;
          if (nx < 1 || ny < 1 || nx > n - 2 || ny > n - 2) break;
          const h1 = H[Math.min(n - 2, Math.max(0, Math.floor(ny))) * n + Math.min(n - 2, Math.max(0, Math.floor(nx)))], dh = h1 - h0, i = Math.floor(y) * n + Math.floor(x), cap = Math.max(-dh, 0.002) * l * w * 4;
          if (sed > cap || dh > 0) { const drop = dh > 0 ? Math.min(dh, sed) : (sed - cap) * 0.3; sed -= drop; H[i] += drop; }
          else { const take = Math.min((cap - sed) * 0.3, -dh); sed += take; H[i] -= take; }
          flow[i] += w; x = nx; y = ny; w *= 0.97;
        }
      };
      // streams are already running when the piece opens
      for (let k = 0; k < 12; k++) { for (let j = 0; j < 400; j++) roll(R.range(1, n - 2), R.range(1, n - 2)); for (let i = 0; i < N; i++) flow[i] *= 0.8; }
      return (t, dt) => {
        // after a minute the land is lifted again: it rises back to its first shape over a few seconds
        // (the rain never stops), instead of being swapped in at once
        if ((age += dt) > 60) { age = 0; uplift = 30; }
        if (uplift > 0) { uplift--; for (let i = 0; i < N; i++) H[i] += (H0[i] - H[i]) * 0.12; }
        for (const tap of inp.taps()) { bursts.push({ x: tap.x * n, y: tap.y * n, left: 240 }); if (bursts.length > 6) bursts.shift(); }
        for (let k = 0; k < 400; k++) {
          let x = R.range(1, n - 2), y = R.range(1, n - 2);
          if (inp.down && k & 1) { x = Math.max(1, Math.min(n - 2, inp.x * n + g.alt.range(-6, 6))); y = Math.max(1, Math.min(n - 2, inp.y * n + g.alt.range(-6, 6))); }
          roll(x, y);
        }
        for (const b of bursts) for (let k = 0; k < 80 && b.left > 0; k++, b.left--) roll(Math.max(1, Math.min(n - 2, b.x + g.alt.range(-3, 3))), Math.max(1, Math.min(n - 2, b.y + g.alt.range(-3, 3))));
        while (bursts.length && bursts[0].left <= 0) bursts.shift();
        // loose soil slumps: no slope steeper than the talus, so the cuts stay clean instead of speckled
        for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) {
          const i = y * n + x;
          for (let j = i + 1, k = 0; k < 2; k++, j = i + n) { const dh = H[i] - H[j], ex = dh > 0.03 ? dh - 0.03 : dh < -0.03 ? dh + 0.03 : 0; if (ex) { H[i] -= ex * 0.25; H[j] += ex * 0.25; } }
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, sx = Math.min(x, n - 2), sy = Math.min(y, n - 2), si = sy * n + sx, sl = (H[si] - H[si + n + 1]) * n * 0.5, h = Math.max(0, Math.min(47, Math.floor((H[i] - 0.1) * 48)));
          let c = X.shade(ramp[h], Math.max(0.5, Math.min(1.35, 1 + sl)));
          // water glints where many drops have run lately: the streams, brightest along the valley floors
          const w = flow[i];
          if (w > 1.2) c = X.mixPk(c, w > 9 ? wc2 : wc1, Math.min(0.85, (w - 1.2) * 0.1));
          flow[i] = w * 0.8;
          d[i] = c;
        }
      };
    },
  });

  P.addPixel({
    name: 'Formicary', seed: 2, fam: 'Physics', sizes: [80, 100], fps: 12,
    interactive: 'Click to drop a pile of food.',
    listens: 'A clap startles the colony: every ant scatters, then finds its trail again.',
    recipe: 'Ants leave the nest at random, and the ones that find food carry it home, laying scent that others follow; trails form, strengthen and fade as each pile runs out.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, toFood = new Float32Array(N), toHome = new Float32Array(N), food = new Uint8Array(N), VG = X.VG, inks = VG.inksN(R, 4, 0.4);
      const nest = [n / 2 + R.range(-0.15, 0.15) * n, n / 2 + R.range(-0.15, 0.15) * n];
      g.trait('Trails', inks.name); g.trait('Grid', n);
      // how big the colony is, how many piles of food are out, what the food is and what the ground is
      const colony = VG.pick(g, 'Colony', 'Busy', ['Busy', 'Busy', 'Swarm', 'Scouts']), nPiles = VG.pick(g, 'Piles', 3, [3, 3, 2, 5]);
      const foodK = VG.pick(g, 'Food', 'Leaves', ['Leaves', 'Leaves', 'Sugar', 'Berries', 'Seeds']), groundK = VG.pick(g, 'Ground', 'Earth', ['Earth', 'Earth', 'Sand', 'Moss', 'Slate']);
      const inp = g.input, piles = (px, py) => { const cx = px ?? R.range(0.12, 0.88) * n, cy = py ?? R.range(0.12, 0.88) * n; for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y < 10) { const i = Math.round(cy + y) * n + Math.round(cx + x); if (i >= 0 && i < N) food[i] = 8; } };
      for (let k = 0; k < nPiles; k++) piles();
      const ants = Array.from({ length: Math.round(n * (colony === 'Swarm' ? 2.2 : colony === 'Scouts' ? 0.7 : 1.4)) }, () => ({ x: nest[0], y: nest[1], a: R.range(0, U.TAU), carry: false, panic: 0 }));
      const ground = groundK === 'Sand' ? X.rgb(150, 122, 82) : groundK === 'Moss' ? X.rgb(24, 46, 22) : groundK === 'Slate' ? X.rgb(40, 44, 52) : X.shade(inks[0], 0.12), trailF = inks[1], trailH = inks[2 % inks.length];
      const foodC = foodK === 'Sugar' ? X.rgb(240, 240, 232) : foodK === 'Berries' ? X.rgb(220, 40, 70) : foodK === 'Seeds' ? X.rgb(230, 180, 60) : 0xff40c060, antC = groundK === 'Sand' ? X.rgb(30, 18, 14) : 0xffd0e0f0;
      // a grain to the soil (fixed, so it sits still under the moving trails)
      const soil = new Uint32Array(N);
      for (let i = 0; i < N; i++) { const hsh = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b) >>> 0, k = (hsh >>> 24) / 255; soil[i] = k < 0.12 ? X.shade(ground, groundK === 'Sand' ? 1.1 : 1.45) : k > 0.9 ? X.shade(ground, groundK === 'Sand' ? 0.88 : 0.7) : ground; }
      // a pile darkens as it is carried away, so each one visibly runs down
      const foodLv = Array.from({ length: 9 }, (_, k) => X.mixPk(X.shade(foodC, 0.45), foodC, k / 8));
      const sense = (f, x, y, a) => { const i = Math.round(y + Math.sin(a) * 3) * n + Math.round(x + Math.cos(a) * 3); return i >= 0 && i < N ? f[i] : -1; };
      const sim = () => {
        for (const ant of ants) {
          const field = ant.carry ? toHome : toFood, l = sense(field, ant.x, ant.y, ant.a - 0.5), c = sense(field, ant.x, ant.y, ant.a), r = sense(field, ant.x, ant.y, ant.a + 0.5);
          if (c >= l && c >= r) {} else if (l > r) ant.a -= 0.3; else ant.a += 0.3;
          ant.a += R.range(-0.25, 0.25);
          if (ant.carry) { const ha = Math.atan2(nest[1] - ant.y, nest[0] - ant.x); let da = ha - ant.a; while (da > Math.PI) da -= U.TAU; while (da < -Math.PI) da += U.TAU; ant.a += da * 0.05; }
          const sp = ant.panic > 0 ? (ant.panic--, 1.5) : 0.7;
          ant.x += Math.cos(ant.a) * sp; ant.y += Math.sin(ant.a) * sp;
          if (ant.x < 1 || ant.x > n - 2) { ant.a = Math.PI - ant.a; ant.x = Math.max(1, Math.min(n - 2, ant.x)); }
          if (ant.y < 1 || ant.y > n - 2) { ant.a = -ant.a; ant.y = Math.max(1, Math.min(n - 2, ant.y)); }
          const i = Math.round(ant.y) * n + Math.round(ant.x);
          if (ant.carry) { toFood[i] = Math.min(1, toFood[i] + 0.25); if (Math.hypot(ant.x - nest[0], ant.y - nest[1]) < 3) { ant.carry = false; ant.a += Math.PI; } }
          else { toHome[i] = Math.min(1, toHome[i] + 0.12); if (food[i]) { food[i]--; ant.carry = true; ant.a += Math.PI; } }
        }
        let left = 0; for (let i = 0; i < N; i++) { toFood[i] *= 0.985; toHome[i] *= 0.99; left += food[i]; }
        if (left < 200) piles();
      };
      // the colony has been out for a while when the piece opens
      for (let k = 0; k < 90; k++) sim();
      return (t, dt, f) => {
        // food dropped by taps is capped (a burst of remembered taps lays a few piles, not a carpet)
        for (const tap of inp.taps()) { let left = 0; for (let i = 0; i < N; i++) left += food[i]; if (left < 2400) piles(tap.x * n, tap.y * n); }
        if (inp.listening && inp.beats()) for (const ant of ants) { ant.a = g.alt.range(0, U.TAU); ant.panic = g.alt.int(5, 12); }
        sim();
        for (let i = 0; i < N; i++) d[i] = food[i] ? foodLv[food[i]] : X.mixPk(X.mixPk(soil[i], trailH, Math.min(1, toHome[i]) * 0.35), trailF, Math.min(1, toFood[i]) * 0.9);
        // the nest: a ring of thrown-up earth round a dark entrance
        X.disc(g, nest[0], nest[1], 4.2, X.mixPk(0xff1a2a40, 0xff4a6a8a, 0.5)); X.disc(g, nest[0], nest[1], 3, 0xff1a2a40); X.disc(g, nest[0], nest[1], 1.4, 0xff050a10);
        for (const ant of ants) X.put(g, ant.x, ant.y, ant.carry ? foodC : antC);
      };
    },
  });

  P.addPixel({
    name: 'Fireworks', seed: 2, fam: 'Physics', sizes: [80, 100, 200], fps: 12,
    interactive: 'Click to send a rocket up to where you point.',
    listens: 'Every clap sends up a rocket; a loud room keeps the show going.',
    recipe: 'Rockets climb from behind the rooftops and burst into sparks that fall under gravity and drag: rings, peonies, willows and double shells, each a colour of its own.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, VG = X.VG, inks = VG.inksN(R, 6, 0.6), glow = new Float32Array(N * 3), roofs = [], inp = g.input;
      for (let x = 0; x < n;) { const w = R.int(5, 12) * n / 100, h = R.range(0.06, 0.18) * n; roofs.push([x, w, h]); x += w; }
      g.trait('Palette', inks.name); g.trait('Grid', n);
      // what the show is seen over (rooftops, a harbour, hills or towers), which shells it fires, and the sky
      const skyline = VG.pick(g, 'Over', 'Rooftops', ['Rooftops', 'Rooftops', 'Harbour', 'Hills', 'Towers']), shells = VG.pick(g, 'Shells', 'Mixed', ['Mixed', 'Mixed', 'Rings', 'Willows', 'Peonies']), skyK = VG.pick(g, 'Sky', 'Night', ['Night', 'Night', 'Dusk', 'Moonlit']);
      const SHAPE = { Rings: 'ring', Willows: 'willow', Peonies: 'ball' }[shells];
      if (skyline === 'Towers') roofs.forEach(r => { r[2] = r[2] * (1.4 + g.alt() * 1.6); });
      if (skyline === 'Hills') roofs.length = 0;
      const waterY = Math.round(n * 0.84), hillH = Float32Array.from({ length: n }, (_, x) => n * (0.1 + 0.05 * Math.sin(x / n * 5 + 1) + 0.03 * Math.sin(x / n * 13)));
      if (skyline === 'Harbour') roofs.forEach(r => { r[2] = Math.min(r[2], n * 0.1); });
      const sparks = [], rockets = [], TRAIL = [255, 220, 180], WHITE3 = [255, 255, 255];
      // the night sky, lifted near the horizon by the town's own light, so the roofs stand out against it
      const skyR = new Float32Array(n), skyG = new Float32Array(n), skyB = new Float32Array(n);
      for (let y = 0; y < n; y++) { const sky = 12 + y / n * 18, low = Math.max(0, (y / n - 0.55) / 0.45); skyR[y] = sky * 0.5 + low * low * 26; skyG[y] = sky * 0.4 + low * low * 14; skyB[y] = sky + low * low * 8; if (skyK === 'Dusk') { skyR[y] += 30 + 50 * low; skyG[y] += 10 + 20 * low; skyB[y] += 40 - 10 * low; } else if (skyK === 'Moonlit') { skyR[y] += 14; skyG[y] += 18; skyB[y] += 30; } }
      const moon = skyK === 'Moonlit' ? [n * (g.home ? 0.8 : g.alt.range(0.15, 0.85)), n * 0.16, n * 0.045] : null;
      const spark = (x, y, c, life) => { const i = Math.round(y) * n + Math.round(x); if (x >= 0 && y >= 0 && x < n && y < n) { glow[i * 3] += c[0] * life; glow[i * 3 + 1] += c[1] * life; glow[i * 3 + 2] += c[2] * life; } };
      const launch = (x, vy, fuse, c, shape, mine) => rockets.push({ x, y: n, vy, fuse, c, shape, mine });
      const sim = () => {
        if (R() < 0.06 || !rockets.length && !sparks.length) { const x = R.range(0.2, 0.8) * n, vy = -R.range(1.6, 2.2) * n / 100, fuse = R.range(0.3, 0.55) * n, c = X.unpk(inks[R.int(0, inks.length - 1)]), sh = R.pick(['ring', 'ball', 'willow', 'double']); launch(x, vy, skyline === 'Towers' ? fuse * 0.7 : fuse, c, SHAPE || sh); }
        for (const r of rockets) {
          r.y += r.vy; r.vy += 0.012 * n / 100; spark(r.x, r.y, TRAIL, 0.3);
          if (r.y < r.fuse || r.vy > 0) {
            r.dead = true;
            const k = r.shape === 'willow' ? 70 : 90, sp = R.range(0.9, 1.4) * n / 100;
            for (let i = 0; i < k; i++) {
              const a = i / k * U.TAU + R.range(-0.05, 0.05), m = r.shape === 'ring' ? sp : r.shape === 'double' ? (i & 1 ? sp : sp * 0.5) : sp * Math.sqrt(R());
              const decay = r.shape === 'willow' ? 0.008 : R.range(0.015, 0.025);
              // a sky already crowded with sparks takes no more (a burst of remembered taps stays a show, not a white-out)
              if (sparks.length < 4000) sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * m, vy: Math.sin(a) * m, life: 1, decay, c: i % 3 === 0 && r.shape === 'double' ? WHITE3 : r.c, drag: r.shape === 'willow' ? 0.96 : 0.985 });
            }
          }
        }
        for (const s of sparks) { s.vx *= s.drag; s.vy = s.vy * s.drag + 0.02 * n / 100; s.x += s.vx; s.y += s.vy; s.life -= s.decay; if (s.life > 0) spark(s.x, s.y, s.c, Math.min(1, s.life * 1.5)); }
        for (let k = rockets.length - 1; k >= 0; k--) if (rockets[k].dead) rockets.splice(k, 1);
        for (let k = sparks.length - 1; k >= 0; k--) if (sparks[k].life <= 0) sparks.splice(k, 1);
      };
      // the show is already on when the piece opens: the first shell has just burst
      for (let k = 0; k < 120; k++) { sim(); for (let i = 0; i < N * 3; i++) glow[i] *= 0.8; if (sparks.length && sparks[0].life < 0.74) break; }
      return (t, dt, f) => {
        for (const tap of inp.taps()) if (rockets.length < 16) launch(tap.x * n, -Math.sqrt(2 * 0.012 * n / 100 * (n - tap.y * n)) * 1.05, tap.y * n, X.unpk(inks[g.alt.int(0, inks.length - 1)]), g.alt.pick(['ring', 'ball', 'double']), true);
        if (inp.listening) {
          // a clap is a rocket; loudness raises the chance of more
          const claps = Math.min(3, inp.beats());
          for (let k = 0; k < claps; k++) launch(g.alt.range(0.15, 0.85) * n, -g.alt.range(1.7, 2.3) * n / 100, g.alt.range(0.25, 0.5) * n, X.unpk(inks[g.alt.int(0, inks.length - 1)]), g.alt.pick(['ring', 'ball', 'willow', 'double']), true);
          if (rockets.length < 10 && g.alt() < inp.level * 0.1) launch(g.alt.range(0.15, 0.85) * n, -g.alt.range(1.7, 2.3) * n / 100, g.alt.range(0.25, 0.5) * n, X.unpk(inks[g.alt.int(0, inks.length - 1)]), g.alt.pick(['ring', 'ball', 'willow']), true);
        }
        sim();
        for (let i = 0; i < N; i++) {
          glow[i * 3] *= 0.8; glow[i * 3 + 1] *= 0.8; glow[i * 3 + 2] *= 0.8;
          const y = (i / n) | 0;
          d[i] = X.rgb(Math.min(255, skyR[y] + glow[i * 3]), Math.min(255, skyG[y] + glow[i * 3 + 1]), Math.min(255, skyB[y] + glow[i * 3 + 2]));
        }
        if (moon) X.disc(g, moon[0], moon[1], moon[2], (x, y) => X.mixPk(d[y * n + x], X.rgb(230, 230, 210), 0.85));
        // the harbour mirrors the bursts in broken, darkened rows
        if (skyline === 'Harbour') for (let y = waterY; y < n; y++) { const sy = 2 * waterY - y - 1; for (let x = 0; x < n; x++) { const xx = Math.min(n - 1, Math.max(0, x + Math.round(Math.sin(y * 1.3 + x * 0.2) * 1.2))), o = (sy * n + xx) * 3, k = (y - waterY) & 1 ? 0.25 : 0.45; d[y * n + x] = X.rgb(Math.min(255, 6 + glow[o] * k), Math.min(255, 8 + glow[o + 1] * k), Math.min(255, 18 + glow[o + 2] * k)); } }
        if (skyline === 'Hills') for (let x = 0; x < n; x++) for (let y = Math.round(n - hillH[x]); y < n; y++) d[y * n + x] = y === Math.round(n - hillH[x]) ? X.rgb(40, 26, 30) : (x * 7 + y * 3) % 23 === 0 ? X.rgb(220, 170, 90) : X.rgb(14, 10, 12);
        for (const [x, w, h0] of roofs) {
          const h = skyline === 'Harbour' ? h0 + n * 0.16 : h0;
          X.rect(g, x, n - h, w, skyline === 'Harbour' ? h0 : h, 0xff100808); for (let yy = n - h + 3; yy < (skyline === 'Harbour' ? waterY - 1 : n - 2); yy += 4) for (let xx = x + 2; xx < x + w - 1; xx += 3) if ((xx * 7 + yy * 3) % 5 === 0) X.put(g, xx, yy, 0xff40a0d0);
          // the roof's top edge catches the light of whatever is bursting above it
          const y0 = Math.round(n - h);
          if (y0 > 2) for (let xx = Math.max(0, Math.round(x)); xx < Math.min(n, Math.round(x + w)); xx++) { let r = 0, gg = 0, b = 0; for (let k = 2; k <= 10 && y0 - k >= 0; k += 2) { const o = ((y0 - k) * n + xx) * 3; r += glow[o]; gg += glow[o + 1]; b += glow[o + 2]; } d[y0 * n + xx] = X.rgb(Math.min(255, 16 + r * 0.25), Math.min(255, 8 + gg * 0.25), Math.min(255, 8 + b * 0.25)); }
        }
      };
    },
  });

  P.addPixel({
    name: 'Jelly', fam: 'Physics', sizes: [80, 100], fps: 12,
    interactive: 'Click to drop a jelly where you point.',
    listens: 'The jellies hop at every clap.',
    recipe: 'Soft bodies made of a ring of weights, springs and the pressure inside, dropped onto shelves: they squash, wobble, slide off and fall again.',
    make(R, U, g) {
      const { n } = g;
      // the original palette on the opening variation and at least half the rolls; a curated scheme otherwise
      if (g.home || g.alt() < 0.5) {
        const inks = X.VG.inksN(R, 4, 0.5), shelves = Array.from({ length: 3 }, (_, k) => ({ x: R.range(0, 0.6) * n, y: (0.35 + k * 0.2) * n, w: R.range(0.3, 0.45) * n, tilt: R.range(-0.18, 0.18) }));
        g.trait('Palette', inks.name);
        return jelly(inks, shelves, X.shade(inks[3 % inks.length], 0.1), [0xffd0d0d0, 0xff9a9a9a, 0xff5a5a5a]);
      }
      const sc = X.PIX.scheme(R), inks = sc.ramps.map(r => r[1]), shelves = Array.from({ length: R.int(2, 4) }, (_, k) => ({ x: R.range(0, 0.6) * n, y: (0.3 + k * 0.18) * n, w: R.range(0.3, 0.45) * n, tilt: R.range(-0.18, 0.18) }));
      const sr = sc.ramps[sc.ramps.length - 1];
      g.trait('Palette', sc.name);
      return jelly(inks, shelves, sc.ground[0], [sr[2], sr[1], sr[0]]);
      function jelly(inks, shelves, bg, shelfC) {
        const { d } = g, K = 16, inp = g.input, VG = X.VG;
        g.trait('Grid', n);
        // how many jellies, how big, and how the shelves are hung (as rolled, a staircase or a funnel)
        const count = VG.pick(g, 'Jellies', 3, [3, 3, 4, 5]), size = VG.pick(g, 'Size', 'Medium', ['Medium', 'Medium', 'Big', 'Small']), SZ = size === 'Big' ? 1.3 : size === 'Small' ? 0.7 : 1;
        const hang = VG.pick(g, 'Shelves', 'Staggered', ['Staggered', 'Staggered', 'Staircase', 'Funnel']);
        if (hang === 'Staircase') shelves.forEach((s, k) => { s.x = n * (0.05 + k * 0.55 / shelves.length); s.y = n * (0.3 + k * 0.6 / shelves.length); s.w = n * 0.32; s.tilt = 0.12; });
        else if (hang === 'Funnel') shelves.forEach((s, k) => { const left = k % 2 === 0; s.w = n * 0.38; s.x = left ? n * 0.02 : n * 0.6; s.y = n * (0.32 + Math.floor(k / 2) * 0.3); s.tilt = left ? 0.2 : -0.2; });
        g.trait('Shelves', hang === 'Staggered' ? shelves.length + ' shelves' : hang);
        const make = k => { const r = n * R.range(0.06, 0.1) * SZ, cx = R.range(0.2, 0.8) * n, cy = -r * 2 - k * n * 0.4; return { r, pts: Array.from({ length: K }, (_, i) => { const a = i / K * U.TAU; return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, px: cx + Math.cos(a) * r, py: cy + Math.sin(a) * r }; }), c: inks[k % inks.length], cx: cx, cy: cy }; };
        const bodies = Array.from({ length: count }, (_, k) => make(k));
        const area = b => { let s = 0; for (let i = 0; i < K; i++) { const a = b.pts[i], c = b.pts[(i + 1) % K]; s += a.x * c.y - c.x * a.y; } return s / 2; };
        const centre = b => { let cx = 0, cy = 0; for (const p of b.pts) { cx += p.x / K; cy += p.y / K; } b.cx = cx; b.cy = cy; };
        // a click drops the oldest jelly back in where the viewer points
        const drop = (px, py) => { const b = bodies.shift(); b.pts.forEach((p, i) => { const a = i / K * U.TAU; p.x = p.px = px + Math.cos(a) * b.r; p.y = p.py = py + Math.sin(a) * b.r; }); bodies.push(b); };
        const sim = () => {
          for (const b of bodies) centre(b);
          for (const b of bodies) {
            for (const p of b.pts) { const vx = (p.x - p.px) * 0.99, vy = (p.y - p.py) * 0.99 + 0.08; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy; }
            for (let it = 0; it < 6; it++) {
              const seg = 2 * b.r * Math.sin(Math.PI / K), A0 = Math.PI * b.r * b.r, A = area(b), press = (A0 - Math.abs(A)) / A0 * 0.5;
              for (let i = 0; i < K; i++) {
                const a = b.pts[i], c = b.pts[(i + 1) % K], dx = c.x - a.x, dy = c.y - a.y, l = Math.hypot(dx, dy) || 1, k = (l - seg) / l * 0.5;
                a.x += dx * k; a.y += dy * k; c.x -= dx * k; c.y -= dy * k;
                a.x += dy / l * press * b.r * 0.1; a.y -= dx / l * press * b.r * 0.1;
              }
              // weak springs across the middle keep a jelly from folding inside out or twisting into a knot
              for (let i = 0; i < K / 2; i++) {
                const a = b.pts[i], c = b.pts[i + K / 2], dx = c.x - a.x, dy = c.y - a.y, l = Math.hypot(dx, dy) || 1, k = (l - 2 * b.r) / l * 0.03;
                a.x += dx * k; a.y += dy * k; c.x -= dx * k; c.y -= dy * k;
              }
              for (const p of b.pts) {
                if (p.x < 1) p.x = 1; if (p.x > n - 2) p.x = n - 2;
                for (const s of shelves) { const sy = s.y + (p.x - s.x) * s.tilt; if (p.x > s.x && p.x < s.x + s.w && p.y > sy - 1 && p.py <= sy + 1) { p.y = sy - 1; p.px += (p.x - p.px) * 0.3; } }
                // jellies are solid to each other: a point inside another body is pushed back to its skin
                for (const o of bodies) {
                  if (o === b) continue;
                  const dx = p.x - o.cx, dy = p.y - o.cy, rr = o.r * 0.92, q = dx * dx + dy * dy;
                  if (q < rr * rr && q > 1e-6) { const l = Math.sqrt(q), k = (rr - l) / l * 0.5; p.x += dx * k; p.y += dy * k; }
                }
              }
            }
            if (b.pts.every(p => p.y > n + 4)) Object.assign(b, make(0));
          }
        };
        // the first jelly has already landed when the piece opens
        for (let k = 0; k < 40; k++) sim();
        return () => {
          for (const tap of inp.taps()) drop(tap.x * n, tap.y * n);
          // a clap: every jelly springs up, its base pushed hardest, so it squashes and stretches as it leaves
          if (inp.listening && inp.beats()) for (const b of bodies) { centre(b); if (b.cy < n * 0.25) continue; for (const p of b.pts) p.py += (0.38 + (p.y > b.cy ? 0.22 : 0)) * n / 100; }
          sim();
          d.fill(bg);
          for (const s of shelves) { X.line(g, s.x, s.y, s.x + s.w, s.y + s.w * s.tilt, shelfC[1]); X.line(g, s.x, s.y - 1, s.x + s.w, s.y - 1 + s.w * s.tilt, shelfC[0]); X.line(g, s.x, s.y + 1, s.x + s.w, s.y + 1 + s.w * s.tilt, shelfC[2]); }
          for (const b of bodies) {
            const pts = b.pts.flatMap(p => [p.x, p.y]);
            let cx = 0, cy = 0; for (const p of b.pts) { cx += p.x / K; cy += p.y / K; }
            X.poly(g, pts, (x, y) => (Math.hypot(x - (cx - b.r * 0.35), y - (cy - b.r * 0.35)) < b.r * 0.22 ? X.mixPk(b.c, WHITE, 0.6) : y > cy + b.r * 0.3 ? X.shade(b.c, 0.7) : b.c));
            for (let i = 0; i < K; i++) X.line(g, b.pts[i].x, b.pts[i].y, b.pts[(i + 1) % K].x, b.pts[(i + 1) % K].y, X.shade(b.c, 0.4));
          }
        };
      }
    },
  });
})();
