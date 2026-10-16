// Waves and reactions: continuous fields simulated or summed on a grid.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000, WHITE = 0xffffffff;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);
  const gsName = fc => ({ 0.0367: 'Dividing cells', 0.0545: 'Coral', 0.03: 'Spots', 0.042: 'Worms', 0.026: 'Mazes', 0.029: 'Fingerprints', 0.022: 'Pulses', 0.018: 'Bubbles' })[fc] || 'Mixed';
  // The cell under each tap in the large view (an empty list in tiles).
  const tapsAt = (g, n) => g.input.taps().map(p => ({ x: Math.min(n - 1, Math.max(0, Math.floor(p.x * n))), y: Math.min(n - 1, Math.max(0, Math.floor(p.y * n))) }));
  // Listen (large view, microphone on): beats heard since the last frame and the loudness; 0 otherwise.
  const heard = g => g.input.listening ? g.input.beats() : 0;
  const loudness = g => g.input.listening ? g.input.level : 0;
  const NONE = [];
  // a stone dropped at random for every clap or beat heard
  const rain = (g, n) => { let b = heard(g); if (!b) return NONE; const out = []; while (b-- > 0) out.push({ x: g.alt.int(8, n - 9), y: g.alt.int(8, n - 9) }); return out; };
  // the room's sound as a place on the plate: x from its pitch (the balance of the bands), y from its loudness; null when quiet or not listening
  const tuning = g => {
    const p = g.input;
    if (!p.listening || p.level < 0.03) return null;
    let s = 0, w = 0;
    for (let i = 0; i < 8; i++) { s += p.bands[i] * i; w += p.bands[i]; }
    return { x: Math.min(1, 0.1 + (w ? s / w / 7 : 0.5) * 0.9), y: Math.min(1, 0.2 + p.level * 1.2) };
  };
  // a stone is a smooth round dent (a square block of it rang on as grainy noise for minutes)
  const SPLASH = Float32Array.from({ length: 49 }, (_, i) => Math.exp(-(((i % 7) - 3) ** 2 + (((i / 7) | 0) - 3) ** 2) / 3.2));
  // Ripple Tank: taps and claps drop stones, but only a few a second, so a burst of replayed taps cannot boil the tank
  const stones = (g, n, st) => { st.b = Math.min(3, st.b + 0.2); const out = []; for (const p of tapsAt(g, n).concat(rain(g, n))) if (st.b >= 1) { st.b--; out.push(p); } return out; };
  // The pointer blended over a piece's own motion: w eases to 1 while the pointer is in and back to 0 a couple of
  // seconds after it leaves, so nothing jumps when a hand comes and goes (and with no pointer the piece runs exactly as before).
  function hand(g) {
    const h = { w: 0, x: 0.5, y: 0.5, idle: 99 };
    h.update = dt => { const p = g.input; if (p.inside) { h.idle = 0; h.x = p.x; h.y = p.y; h.w += (1 - h.w) * 0.12; } else if ((h.idle += dt || 1 / 12) > 2) { h.w *= 0.93; if (h.w < 0.002) h.w = 0; } return h; };
    h.mix = (own, theirs) => h.w ? own + (theirs - own) * h.w : own;
    return h;
  }
  // The pointer in the large view (0..1), held a few seconds after it leaves; null when idle.
  function pointer(g) {
    let idle = 99, x = 0.5, y = 0.5;
    return dt => {
      const p = g.input;
      if (p.inside) { idle = 0; x = p.x; y = p.y; } else idle += dt || 0.05;
      return idle < 3 ? { x, y, down: p.down } : null;
    };
  }

  P.add({
    interactive: 'Click or drag to drop in more of the second chemical.',
    name: 'Gray-Scott', seed: 4, fam: 'Waves', type: 'px', n: 96,
    recipe: 'Two chemicals, one feeding on the other, with the feed rate changing across the canvas: spots, worms, coral, splitting cells or mazes, drawn as glowing heat, flat posterised bands or inked contours.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n;
        let A = new Float32Array(N).fill(1), B = new Float32Array(N), A2 = new Float32Array(N), B2 = new Float32Array(N);
        const [fc, kc] = R.pick([[0.0367, 0.0649], [0.0545, 0.062], [0.03, 0.06], [0.042, 0.061], [0.026, 0.0565]]);
        const fs = R.range(0.006, 0.02) * R.sign(), ks = R.range(0.002, 0.005) * R.sign(), swap = R.bool();
        const F = new Float32Array(N), K = new Float32Array(N);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const u = (swap ? y : x) / n - 0.5, v = (swap ? x : y) / n - 0.5;
          F[i] = fc + fs * u; K[i] = kc + ks * v;
        }
        const blob = (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) { const i = ((cy + y + n) % n) * n + (cx + x + n) % n; B[i] = 1; A[i] = 0.4; } };
        for (let k = 0; k < 26; k++) blob(R.int(0, n - 1), R.int(0, n - 1), R.int(2, 5));
        const step = () => {
          for (let y = 0; y < n; y++) {
            const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
            for (let x = 0; x < n; x++) {
              const l = x === 0 ? n - 1 : x - 1, r = x === n - 1 ? 0 : x + 1, i = row + x, a = A[i], b = B[i];
              const la = 0.2 * (A[row + l] + A[row + r] + A[up + x] + A[dn + x]) + 0.05 * (A[up + l] + A[up + r] + A[dn + l] + A[dn + r]) - a;
              const lb = 0.2 * (B[row + l] + B[row + r] + B[up + x] + B[dn + x]) + 0.05 * (B[up + l] + B[up + r] + B[dn + l] + B[dn + r]) - b;
              const rr = a * b * b;
              A2[i] = a + la - rr + F[i] * (1 - a);
              B2[i] = b + 0.5 * lb + rr - (K[i] + F[i]) * b;
            }
          }
          let tmp = A; A = A2; A2 = tmp; tmp = B; B = B2; B2 = tmp;
        };
        for (let i = 0; i < 500; i++) step();
        let dropAt = R.range(3, 6);
        g.trait('Palette', palName(sc)); g.trait('Pattern', gsName(fc)); g.trait('Gradient', swap ? 'Down' : 'Across'); g.trait('Look', 'Glow');
        return t => {
          for (const p of tapsAt(g, n)) blob(p.x, p.y, 4);
          if (g.input.down && g.input.inside) blob(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 2);
          if (t > dropAt) { dropAt = t + R.range(2.5, 6); blob(R.int(0, n - 1), R.int(0, n - 1), R.int(2, 4)); }
          for (let i = 0; i < 5; i++) step();
          for (let i = 0; i < N; i++) { const v = B[i] * 3.1; d[i] = v < 0.12 ? BLACK : heat[Math.min(255, 30 + v * 225) | 0]; }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n;
      let A = new Float32Array(N).fill(1), B = new Float32Array(N), A2 = new Float32Array(N), B2 = new Float32Array(N);
      const [fc, kc] = R.pick([[0.0367, 0.0649], [0.0545, 0.062], [0.03, 0.06], [0.042, 0.061], [0.026, 0.0565], [0.029, 0.057], [0.022, 0.051], [0.018, 0.051]]);
      const look = R.pick(['heat', 'heat', 'bands', 'contour']), levels = R.int(3, 6), flat = Array.from({ length: levels }, (_, i) => U.pk(U.ramp(sc.cols, i / (levels - 1), false)));
      const fs = R.range(0.006, 0.02) * R.sign(), ks = R.range(0.002, 0.005) * R.sign(), swap = R.bool();
      const F = new Float32Array(N), K = new Float32Array(N);
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
        const u = (swap ? y : x) / n - 0.5, v = (swap ? x : y) / n - 0.5;
        F[i] = fc + fs * u; K[i] = kc + ks * v;
      }
      const blob = (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) { const i = ((cy + y + n) % n) * n + (cx + x + n) % n; B[i] = 1; A[i] = 0.4; } };
      for (let k = 0; k < 40; k++) blob(R.int(0, n - 1), R.int(0, n - 1), R.int(2, 5));
      const step = () => {
        for (let y = 0; y < n; y++) {
          const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
          for (let x = 0; x < n; x++) {
            const l = x === 0 ? n - 1 : x - 1, r = x === n - 1 ? 0 : x + 1, i = row + x, a = A[i], b = B[i];
            const la = 0.2 * (A[row + l] + A[row + r] + A[up + x] + A[dn + x]) + 0.05 * (A[up + l] + A[up + r] + A[dn + l] + A[dn + r]) - a;
            const lb = 0.2 * (B[row + l] + B[row + r] + B[up + x] + B[dn + x]) + 0.05 * (B[up + l] + B[up + r] + B[dn + l] + B[dn + r]) - b;
            const rr = a * b * b;
            A2[i] = a + la - rr + F[i] * (1 - a);
            B2[i] = b + 0.5 * lb + rr - (K[i] + F[i]) * b;
          }
        }
        let tmp = A; A = A2; A2 = tmp; tmp = B; B = B2; B2 = tmp;
      };
      for (let i = 0; i < 500; i++) step();
      let dropAt = R.range(3, 6);
      g.trait('Palette', palName(sc)); g.trait('Pattern', gsName(fc)); g.trait('Gradient', swap ? 'Down' : 'Across'); g.trait('Look', { heat: 'Glow', bands: levels + ' bands', contour: 'Contours' }[look]);
      return t => {
        for (const p of tapsAt(g, n)) blob(p.x, p.y, 4);
        if (g.input.down && g.input.inside) blob(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 2);
        if (t > dropAt) { dropAt = t + R.range(2.5, 6); blob(R.int(0, n - 1), R.int(0, n - 1), R.int(2, 4)); }
        for (let i = 0; i < 5; i++) step();
        for (let i = 0; i < N; i++) {
          const v = B[i] * 3.1;
          if (look === 'heat') d[i] = v < 0.12 ? BLACK : heat[Math.min(255, 30 + v * 225) | 0];
          else {
            const q = Math.min(levels - 1, Math.floor(v * levels * 0.8));
            d[i] = v < 0.12 ? BLACK : look === 'contour' && Math.min(levels - 1, Math.floor(B[(i + 1) % N] * 3.1 * levels * 0.8)) !== q ? BLACK : flat[q];
          }
        }
      };
    },
  });
  P.add({
    interactive: 'Click to scramble the clocks in a patch and watch them pull back together.',
    name: 'Kuramoto', seed: 4, fam: 'Waves', type: 'px', n: 80,
    recipe: 'A lattice of clocks, each nudged toward its neighbours’ time. Colour is the hour; the knots are where they can never agree.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, noise = U.noise(R);
        let th = new Float32Array(N).map(() => R.range(0, U.TAU)), nx = new Float32Array(N);
        const om = new Float32Array(N), spread = R.range(0.04, 0.14), base = R.range(0.04, 0.09) * R.sign(), K = R.range(0.5, 0.7), bands = R.pick([1, 1, 2]), line = R.pick([0, 0.06, 0.1]);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) om[i] = base + spread * noise.n2(x / 30, y / 30);
        const step = dt => {
          for (let y = 0; y < n; y++) {
            const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
            for (let x = 0; x < n; x++) {
              const i = row + x, v = th[i];
              nx[i] = v + dt * (om[i] + K * (Math.sin(th[row + (x === 0 ? n - 1 : x - 1)] - v) + Math.sin(th[row + (x === n - 1 ? 0 : x + 1)] - v) + Math.sin(th[up + x] - v) + Math.sin(th[dn + x] - v)));
            }
          }
          const tmp = th; th = nx; nx = tmp;
        };
        for (let i = 0; i < 110; i++) step(0.3);
        const k = 256 * bands / U.TAU;
        g.trait('Palette', palName(sc)); g.trait('Start', 'Noise'); g.trait('Colour cycles', bands); g.trait('Lines', line ? 'Inked' : 'None'); g.trait('Coupling', K > 0.6 ? 'Strong' : 'Loose');
        return () => {
          for (const p of tapsAt(g, n)) for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) if (x * x + y * y <= 36) th[((p.y + y + n) % n) * n + (p.x + x + n) % n] = g.alt.range(0, U.TAU);
          step(0.3);
          for (let i = 0; i < N; i++) {
            const f = th[i] * k, fr = f / 256 - Math.floor(f / 256);
            d[i] = line && fr < line ? BLACK : sc.lut[f & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, noise = U.noise(R);
      const start = R.pick(['noise', 'noise', 'spirals', 'stripes']), sp = Array.from({ length: R.int(2, 5) }, () => [R.range(0, n), R.range(0, n), R.sign() * R.int(1, 2)]);
      let th = new Float32Array(N).map((_, i) => {
        const x = i % n, y = (i / n) | 0;
        if (start === 'spirals') { let a = 0; for (const [cx, cy, w] of sp) a += w * Math.atan2(y - cy, x - cx); return a; }
        if (start === 'stripes') return (x + y * 0.3) * 0.25 + R.range(0, 0.6);
        return R.range(0, U.TAU);
      }), nx = new Float32Array(N);
      const om = new Float32Array(N), spread = R.range(0.02, 0.16), base = R.range(0.04, 0.09) * R.sign(), K = R.range(0.35, 0.9), bands = R.pick([1, 1, 2, 3]), line = R.pick([0, 0.06, 0.1, 0.2]);
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) om[i] = base + spread * noise.n2(x / 30, y / 30);
      const step = dt => {
        for (let y = 0; y < n; y++) {
          const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
          for (let x = 0; x < n; x++) {
            const i = row + x, v = th[i];
            nx[i] = v + dt * (om[i] + K * (Math.sin(th[row + (x === 0 ? n - 1 : x - 1)] - v) + Math.sin(th[row + (x === n - 1 ? 0 : x + 1)] - v) + Math.sin(th[up + x] - v) + Math.sin(th[dn + x] - v)));
          }
        }
        const tmp = th; th = nx; nx = tmp;
      };
      for (let i = 0; i < 110; i++) step(0.3);
      const k = 256 * bands / U.TAU;
      g.trait('Palette', palName(sc)); g.trait('Start', { noise: 'Noise', spirals: sp.length + ' spirals', stripes: 'Stripes' }[start]); g.trait('Colour cycles', bands); g.trait('Lines', line ? (line > 0.15 ? 'Heavy' : 'Inked') : 'None'); g.trait('Coupling', K > 0.6 ? 'Strong' : 'Loose');
      return () => {
        for (const p of tapsAt(g, n)) for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) if (x * x + y * y <= 36) th[((p.y + y + n) % n) * n + (p.x + x + n) % n] = R.range(0, U.TAU);
        step(0.3);
        for (let i = 0; i < N; i++) {
          const f = th[i] * k, fr = f / 256 - Math.floor(f / 256);
          d[i] = line && fr < line ? BLACK : sc.lut[f & 255];
        }
      };
    },
  });
  P.add({
    interactive: 'Click to drop a stone in; hold to keep tapping.',
    listens: 'Every clap drops a stone in; the louder the room, the higher the waves.',
    name: 'Ripple Tank', seed: 1, fam: 'Waves', type: 'px', n: 120,
    recipe: 'A few points tap the surface at slightly different rates; crests take one colour, troughs another, and still water stays black. Some tanks have a wall with slits, a row of posts or a round island for the waves to bend round.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n;
        let u = new Float32Array(N), v = new Float32Array(N);
        const edge = new Float32Array(N);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { const m = Math.min(x, y, n - 1 - x, n - 1 - y); edge[i] = m < 10 ? 0.9 + 0.1 * m / 10 : 0.9995; }
        const taps = Array.from({ length: R.int(2, 4) }, () => ({ i: R.int(18, n - 19) * n + R.int(18, n - 19), w: R.range(0.2, 0.32), ph: R.range(0, 6) }));
        const hi = U.lut([[0, 0, 0], ...sc.cols.slice(0, Math.ceil(sc.cols.length / 2)), [255, 255, 255]]), lo = U.lut([[0, 0, 0], ...sc.cols.slice(Math.floor(sc.cols.length / 2))]);
        let clock = 0;
        const step = () => {
          clock++;
          for (const s of taps) u[s.i] = 1.6 * (1 + loudness(g) * 1.5) * Math.sin(clock * s.w + s.ph);
          if (g.input.down && g.input.inside) u[Math.min(n - 2, Math.max(1, Math.floor(g.input.y * n))) * n + Math.min(n - 2, Math.max(1, Math.floor(g.input.x * n)))] = 1.6 * Math.sin(clock * 0.3);
          for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) v[i] = (v[i] + 0.24 * (u[i - 1] + u[i + 1] + u[i - n] + u[i + n] - 4 * u[i])) * edge[i];
          for (let i = 0; i < N; i++) u[i] += v[i];
        };
        for (let i = 0; i < 200; i++) step();
        const st = { b: 3 };
        g.trait('Palette', palName(sc)); g.trait('Sources', taps.length); g.trait('Waves', taps.reduce((a, q) => a + q.w, 0) / taps.length > 0.26 ? 'Short' : 'Long'); g.trait('Obstacle', 'None');
        return () => {
          for (const p of stones(g, n, st)) for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const xx = p.x + x, yy = p.y + y; if (xx > 0 && yy > 0 && xx < n - 1 && yy < n - 1) u[yy * n + xx] -= 2.6 * SPLASH[(y + 3) * 7 + x + 3]; }
          step();
          for (let i = 0; i < N; i++) { const a = u[i] * 520; d[i] = a > 14 ? hi[Math.min(255, a) | 0] : a < -14 ? lo[Math.min(255, -a) | 0] : BLACK; }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n;
      let u = new Float32Array(N), v = new Float32Array(N);
      const edge = new Float32Array(N);
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { const m = Math.min(x, y, n - 1 - x, n - 1 - y); edge[i] = m < 10 ? 0.9 + 0.1 * m / 10 : 0.9995; }
      const taps = Array.from({ length: R.int(1, 4) }, () => ({ i: R.int(18, n - 19) * n + R.int(18, n - 19), w: R.range(0.15, 0.36), ph: R.range(0, 6) }));
      // obstacles: cells that hold the surface still
      const solid = new Uint8Array(N), obst = R.pick(['none', 'none', 'slits', 'posts', 'island']);
      if (obst === 'slits') { const x0 = Math.round(n * R.range(0.4, 0.6)), k = R.int(1, 3), w = R.int(3, 6); for (let y = 0; y < n; y++) { let open = false; for (let s2 = 0; s2 < k; s2++) if (Math.abs(y - n * (s2 + 1) / (k + 1)) < w) open = true; if (!open) solid[y * n + x0] = solid[y * n + x0 + 1] = 1; } for (const s2 of taps) s2.i = R.int(18, n - 19) * n + R.int(12, x0 - 8); }
      else if (obst === 'posts') { const gap = R.int(9, 14); for (let y = 6; y < n - 6; y += gap) for (let x = 6; x < n - 6; x += gap) if (R() < 0.7) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) solid[(y + a) * n + x + b] = 1; }
      else if (obst === 'island') { const cx = n * R.range(0.35, 0.65), cy = n * R.range(0.35, 0.65), r = n * R.range(0.08, 0.16); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) solid[y * n + x] = 1; }
      for (const s2 of taps) solid[s2.i] = 0;
      const stone = R.bool(0.5) ? 0xff2a2a2a : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.6));
      const hi = U.lut([[0, 0, 0], ...sc.cols.slice(0, Math.ceil(sc.cols.length / 2)), [255, 255, 255]]), lo = U.lut([[0, 0, 0], ...sc.cols.slice(Math.floor(sc.cols.length / 2))]);
      let clock = 0;
      const step = () => {
        clock++;
        for (const s of taps) u[s.i] = 1.6 * (1 + loudness(g) * 1.5) * Math.sin(clock * s.w + s.ph);
        if (g.input.down && g.input.inside) u[Math.min(n - 2, Math.max(1, Math.floor(g.input.y * n))) * n + Math.min(n - 2, Math.max(1, Math.floor(g.input.x * n)))] = 1.6 * Math.sin(clock * 0.3);
        for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) v[i] = (v[i] + 0.24 * (u[i - 1] + u[i + 1] + u[i - n] + u[i + n] - 4 * u[i])) * edge[i];
        for (let i = 0; i < N; i++) { if (solid[i]) { u[i] = 0; v[i] = 0; } else u[i] += v[i]; }
      };
      for (let i = 0; i < 200; i++) step();
      const st = { b: 3 };
      g.trait('Palette', palName(sc)); g.trait('Sources', taps.length); g.trait('Waves', taps.reduce((a, q) => a + q.w, 0) / taps.length > 0.26 ? 'Short' : 'Long'); g.trait('Obstacle', { none: 'None', slits: 'Slit wall', posts: 'Posts', island: 'Island' }[obst]);
      return () => {
        for (const p of stones(g, n, st)) for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const xx = p.x + x, yy = p.y + y; if (xx > 0 && yy > 0 && xx < n - 1 && yy < n - 1) u[yy * n + xx] -= 2.6 * SPLASH[(y + 3) * 7 + x + 3]; }
        step();
        for (let i = 0; i < N; i++) { const a = u[i] * 520; d[i] = solid[i] ? stone : a > 14 ? hi[Math.min(255, a) | 0] : a < -14 ? lo[Math.min(255, -a) | 0] : BLACK; }
      };
    },
  });
  P.add({
    interactive: 'Move the pointer across the plate to tune it.',
    listens: 'Sing, hum or play: the pitch and loudness of the room tune the plate.',
    name: 'Chladni', fam: 'Waves', type: 'px', n: 128,
    recipe: 'A vibrating square plate. The lines are where it stands still, and they redraw as the pitch slides; shown as sand on the nodal lines, as banded displacement, or folded into a mirrored plate.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), sand = R.bool(0.4);
        const m0 = R.range(2, 6), n0 = R.range(3, 8), wm = R.range(0.03, 0.06), wn = R.range(0.03, 0.06), wa = R.range(0.05, 0.1), ph = R.range(0, 6), drift = R.range(2, 5), bands = R.pick([1, 2, 3]);
        let pm = 0, pn = 0;
        const sx = new Float32Array(n), sy = new Float32Array(n), tx = new Float32Array(n), ty = new Float32Array(n);
        g.trait('Palette', palName(sc)); g.trait('Look', sand ? 'Sand' : 'Bands'); g.trait('Bands', sand ? 'None' : bands); g.trait('Plate', 'Square');
        return t => {
          const tn = g.input.inside ? g.input : tuning(g);
          pm += ((tn ? (tn.x - 0.5) * 8 : 0) - pm) * 0.1; pn += ((tn ? (tn.y - 0.5) * 8 : 0) - pn) * 0.1;
          const m = m0 + pm + 1.2 * Math.sin(t * wm + ph), k = n0 + pn + 1.2 * Math.cos(t * wn), a = Math.cos(t * wa), b = Math.sin(t * wa), hd = t * drift;
          for (let x = 0; x < n; x++) { const p = Math.PI * (x + 0.5) / n; sx[x] = Math.cos(m * p); sy[x] = Math.cos(k * p); tx[x] = Math.cos(k * p); ty[x] = Math.cos(m * p); }
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const s = a * sx[x] * sy[y] + b * tx[x] * ty[y], mag = Math.abs(s);
            if (sand) d[i] = mag < 0.07 ? sc.lut[(mag * 1400 + hd + x + y) & 255] : BLACK;
            else d[i] = mag < 0.045 ? BLACK : sc.lut[(mag * 256 * bands + (s > 0 ? 128 : 0) + hd) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), sand = R.bool(0.4), ptr = pointer(g), fold = R.pick([false, false, true]);
      let pm = 0, pn = 0;
      const m0 = R.range(2, 6), n0 = R.range(3, 8), wm = R.range(0.03, 0.06), wn = R.range(0.03, 0.06), wa = R.range(0.05, 0.1), ph = R.range(0, 6), drift = R.range(2, 5), bands = R.pick([1, 2, 3]);
      const sx = new Float32Array(n), sy = new Float32Array(n), tx = new Float32Array(n), ty = new Float32Array(n);
      g.trait('Palette', palName(sc)); g.trait('Look', sand ? 'Sand' : 'Bands'); g.trait('Bands', sand ? 'None' : bands); g.trait('Plate', fold ? 'Mirrored' : 'Square');
      return t => {
        const p = ptr(1 / 12) || tuning(g);
        pm += ((p ? (p.x - 0.5) * 8 : 0) - pm) * 0.1; pn += ((p ? (p.y - 0.5) * 8 : 0) - pn) * 0.1;
        const m = m0 + pm + 1.2 * Math.sin(t * wm + ph), k = n0 + pn + 1.2 * Math.cos(t * wn), a = Math.cos(t * wa), b = Math.sin(t * wa), hd = t * drift;
        for (let x = 0; x < n; x++) { const q = Math.PI * (fold ? Math.abs(x + 0.5 - n / 2) * 2 : x + 0.5) / n; sx[x] = Math.cos(m * q); sy[x] = Math.cos(k * q); tx[x] = Math.cos(k * q); ty[x] = Math.cos(m * q); }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const s = a * sx[x] * sy[y] + b * tx[x] * ty[y], mag = Math.abs(s);
          if (sand) d[i] = mag < 0.07 ? sc.lut[(mag * 1400 + hd + x + y) & 255] : BLACK;
          else d[i] = mag < 0.045 ? BLACK : sc.lut[(mag * 256 * bands + (s > 0 ? 128 : 0) + hd) & 255];
        }
      };
    },
  });
  P.add({
    interactive: 'Move the pointer to drag one of the points.',
    name: 'Cassini', seed: 3, fam: 'Waves', type: 'px', n: 120,
    recipe: 'Colour is the logarithm of the product of the distances to a few orbiting points, banded with a modulo. Some points repel instead of attract, so saddles open between them.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), k = R.int(2, 5), bands = R.range(4, 8), flow = R.range(0.15, 0.35) * R.sign(), gap = R.range(0.08, 0.16);
        const foci = Array.from({ length: k }, (_, i) => ({ r: R.range(0.12, 0.42), w: R.range(0.05, 0.14) * R.sign(), ph: i * U.TAU / k + R.range(-0.4, 0.4), e: R.range(0.6, 1) }));
        const fx = new Float32Array(k), fy = new Float32Array(k); const hnd = hand(g);
        g.trait('Palette', palName(sc)); g.trait('Points', k); g.trait('Saddles', 0); g.trait('Contours', 'Inked');
        return t => {
          for (let j = 0; j < k; j++) { const f = foci[j]; fx[j] = n * (0.5 + f.r * Math.cos(t * f.w + f.ph)); fy[j] = n * (0.5 + f.r * f.e * Math.sin(t * f.w + f.ph)); }
          const hh = hnd.update(); if (hh.w) { fx[0] = hh.mix(fx[0], hh.x * n); fy[0] = hh.mix(fy[0], hh.y * n); }
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            let s = 0;
            for (let j = 0; j < k; j++) { const dx = x - fx[j], dy = y - fy[j]; s += Math.log(dx * dx + dy * dy + 0.5); }
            const f = s / (2 * k) * bands - t * flow, fr = f - Math.floor(f);
            d[i] = fr > 1 - gap ? BLACK : sc.lut[(f * 256 / 3) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), k = R.int(2, 6), bands = R.range(3, 9), flow = R.range(0.15, 0.35) * R.sign(), gap = R.pick([0, R.range(0.08, 0.16), R.range(0.08, 0.16), 0.3]), ptr = pointer(g);
      const sign = Array.from({ length: k }, (_, i) => i && R.bool(0.25) ? -1 : 1);
      const foci = Array.from({ length: k }, (_, i) => ({ r: R.range(0.12, 0.42), w: R.range(0.05, 0.14) * R.sign(), ph: i * U.TAU / k + R.range(-0.4, 0.4), e: R.range(0.6, 1) }));
      const fx = new Float32Array(k), fy = new Float32Array(k); const hnd = hand(g);
      g.trait('Palette', palName(sc)); g.trait('Points', k); g.trait('Saddles', sign.filter(v => v < 0).length); g.trait('Contours', gap === 0 ? 'None' : gap > 0.2 ? 'Heavy' : 'Inked');
      return t => {
        for (let j = 0; j < k; j++) { const f = foci[j]; fx[j] = n * (0.5 + f.r * Math.cos(t * f.w + f.ph)); fy[j] = n * (0.5 + f.r * f.e * Math.sin(t * f.w + f.ph)); }
        const hh = hnd.update(1 / 24); if (hh.w) { fx[0] = hh.mix(fx[0], hh.x * n); fy[0] = hh.mix(fy[0], hh.y * n); }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let s = 0;
          for (let j = 0; j < k; j++) { const dx = x - fx[j], dy = y - fy[j]; s += sign[j] * Math.log(dx * dx + dy * dy + 0.5); }
          const f = s / (2 * k) * bands - t * flow, fr = f - Math.floor(f);
          d[i] = fr > 1 - gap ? BLACK : sc.lut[(f * 256 / 3) & 255];
        }
      };
    },
  });
  P.add({
    interactive: 'Hold the pointer still to lay food; the network reroutes to reach it.',
    name: 'Physarum', seed: 4, fam: 'Waves', type: 'px', n: 140,
    recipe: 'Thousands of blind agents follow and reinforce each other’s scent, and a network of veins keeps rerouting itself: fine lace, thick cords or a wide sparse web, depending on how far they sniff and how fast the scent fades.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, count = 4200;
        let trail = new Float32Array(N), tmp = new Float32Array(N);
        const ax = new Float32Array(count), ay = new Float32Array(count), aa = new Float32Array(count);
        const sa = R.range(0.35, 0.8), sd = R.range(5, 11), ra = R.range(0.3, 0.7), decay = R.range(0.86, 0.92), ring = false;
        for (let i = 0; i < count; i++) {
          const th = R.range(0, U.TAU), r = ring ? n * 0.36 * Math.sqrt(R()) : 0;
          ax[i] = ring ? n / 2 + r * Math.cos(th) : R.range(0, n); ay[i] = ring ? n / 2 + r * Math.sin(th) : R.range(0, n); aa[i] = ring ? th + Math.PI : R.range(0, U.TAU);
        }
        const sense = (x, y) => trail[((y + n) % n | 0) * n + ((x + n) % n | 0)];
        // once the network has pulled itself into a few cords for a while (or settled into stripes), the agents scatter as spores and a new web grows round the old cords, so it never dies down
        let thin = 0, since = 0;
        const renew = () => { let lit = 0; for (let i = 0; i < N; i += 7) if (trail[i] >= 0.25) lit++; thin = lit < N / 7 * 0.2 ? thin + 1 : 0; if (thin > 8 || ++since > 40) { thin = since = 0; for (let j = 0; j < count; j++) { ax[j] = g.alt.range(0, n); ay[j] = g.alt.range(0, n); aa[j] = g.alt.range(0, U.TAU); } } };
        const step = () => {
          for (let i = 0; i < count; i++) {
            const a = aa[i], x = ax[i], y = ay[i];
            const f = sense(x + Math.cos(a) * sd, y + Math.sin(a) * sd), l = sense(x + Math.cos(a - sa) * sd, y + Math.sin(a - sa) * sd), r = sense(x + Math.cos(a + sa) * sd, y + Math.sin(a + sa) * sd);
            if (f < l && f < r) aa[i] += R() < 0.5 ? ra : -ra; else if (l > f) aa[i] -= ra; else if (r > f) aa[i] += ra;
            ax[i] = (x + Math.cos(aa[i]) + n) % n; ay[i] = (y + Math.sin(aa[i]) + n) % n;
            trail[(ay[i] | 0) * n + (ax[i] | 0)] += 1;
          }
          for (let y = 0; y < n; y++) {
            const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
            for (let x = 0; x < n; x++) {
              const l = x === 0 ? n - 1 : x - 1, r = x === n - 1 ? 0 : x + 1;
              tmp[row + x] = (trail[up + l] + trail[up + x] + trail[up + r] + trail[row + l] + trail[row + x] + trail[row + r] + trail[dn + l] + trail[dn + x] + trail[dn + r]) / 9 * decay;
            }
          }
          const s = trail; trail = tmp; tmp = s;
        };
        for (let i = 0; i < 60; i++) step();
        let fc = 0;
        g.trait('Palette', palName(sc)); g.trait('Network', 'Cords'); g.trait('Agents', count); g.trait('Look', 'Glow');
        return () => {
          if (g.input.inside) { const cx = Math.floor(g.input.x * n), cy = Math.floor(g.input.y * n); for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) trail[((cy + y + n) % n) * n + (cx + x + n) % n] += 6; }
          step();
          if (++fc % 12 === 0) renew();
          for (let i = 0; i < N; i++) { const v = trail[i]; d[i] = v < 0.25 ? BLACK : heat[Math.min(255, 40 + v * 55) | 0]; }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, kind = R.pick(['cords', 'lace', 'lace', 'web']), count = kind === 'cords' ? 4200 : kind === 'lace' ? 7000 : 9000;
      let trail = new Float32Array(N), tmp = new Float32Array(N);
      const ax = new Float32Array(count), ay = new Float32Array(count), aa = new Float32Array(count);
      const sa = kind === 'lace' ? R.range(0.3, 0.5) : kind === 'web' ? R.range(0.2, 0.3) : R.range(0.35, 0.8);
      const sd = kind === 'lace' ? R.range(9, 16) : kind === 'web' ? R.range(16, 24) : R.range(5, 11), ra = kind === 'cords' ? R.range(0.3, 0.7) : R.range(0.15, 0.3);
      const decay = kind === 'cords' ? R.range(0.88, 0.93) : R.range(0.91, 0.95), mixK = kind === 'cords' ? 1 : kind === 'lace' ? 0.35 : 0.2, ring = false, levels = R.pick([0, 0, 4, 6]);
      const flat = levels ? Array.from({ length: levels }, (_, i) => U.pk(U.ramp(sc.cols, i / (levels - 1), false))) : null;
      for (let i = 0; i < count; i++) {
        const th = R.range(0, U.TAU), r = ring ? n * 0.36 * Math.sqrt(R()) : 0;
        ax[i] = ring ? n / 2 + r * Math.cos(th) : R.range(0, n); ay[i] = ring ? n / 2 + r * Math.sin(th) : R.range(0, n); aa[i] = ring ? th + Math.PI : R.range(0, U.TAU);
      }
      const sense = (x, y) => trail[((y + n) % n | 0) * n + ((x + n) % n | 0)];
        // once the network has pulled itself into a few cords for a while (or settled into stripes), the agents scatter as spores and a new web grows round the old cords, so it never dies down
        let thin = 0, since = 0;
        const renew = () => { let lit = 0; for (let i = 0; i < N; i += 7) if (trail[i] >= 0.25) lit++; thin = lit < N / 7 * 0.2 ? thin + 1 : 0; if (thin > 8 || ++since > 40) { thin = since = 0; for (let j = 0; j < count; j++) { ax[j] = g.alt.range(0, n); ay[j] = g.alt.range(0, n); aa[j] = g.alt.range(0, U.TAU); } } };
      const step = () => {
        for (let i = 0; i < count; i++) {
          const a = aa[i], x = ax[i], y = ay[i];
          const f = sense(x + Math.cos(a) * sd, y + Math.sin(a) * sd), l = sense(x + Math.cos(a - sa) * sd, y + Math.sin(a - sa) * sd), r = sense(x + Math.cos(a + sa) * sd, y + Math.sin(a + sa) * sd);
          if (f < l && f < r) aa[i] += R() < 0.5 ? ra : -ra; else if (l > f) aa[i] -= ra; else if (r > f) aa[i] += ra;
          ax[i] = (x + Math.cos(aa[i]) + n) % n; ay[i] = (y + Math.sin(aa[i]) + n) % n;
          trail[(ay[i] | 0) * n + (ax[i] | 0)] += 1;
        }
        for (let y = 0; y < n; y++) {
          const up = (y === 0 ? n - 1 : y - 1) * n, dn = (y === n - 1 ? 0 : y + 1) * n, row = y * n;
          for (let x = 0; x < n; x++) {
            const l = x === 0 ? n - 1 : x - 1, r = x === n - 1 ? 0 : x + 1;
            const blur = (trail[up + l] + trail[up + x] + trail[up + r] + trail[row + l] + trail[row + x] + trail[row + r] + trail[dn + l] + trail[dn + x] + trail[dn + r]) / 9;
            tmp[row + x] = (trail[row + x] + (blur - trail[row + x]) * mixK) * decay;
          }
        }
        const s = trail; trail = tmp; tmp = s;
      };
      for (let i = 0; i < 60; i++) step();
      let fc = 0;
      g.trait('Palette', palName(sc)); g.trait('Network', { cords: 'Cords', lace: 'Lace', web: 'Web' }[kind]); g.trait('Agents', count); g.trait('Look', levels ? levels + ' bands' : 'Glow');
      return () => {
        if (g.input.inside) { const cx = Math.floor(g.input.x * n), cy = Math.floor(g.input.y * n); for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) trail[((cy + y + n) % n) * n + (cx + x + n) % n] += 6; }
        step();
        if (++fc % 12 === 0) renew();
        for (let i = 0; i < N; i++) { const v = trail[i]; d[i] = v < 0.25 ? BLACK : flat ? flat[Math.min(levels - 1, Math.floor(Math.log(1 + v) * 1.4))] : heat[Math.min(255, 40 + v * 55) | 0]; }
      };
    },
  });
  P.add({
    name: 'Geodesic', seed: 1, fam: 'Waves', type: 'px', n: 120,
    interactive: 'Click to start another walker from there.',
    recipe: 'Colour is the time it takes to walk there from a few starting points across rough ground; the fronts bend around what is slow.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), N = n * n, noise = U.noise(R);
      const time = new Float32Array(N), cost = new Float32Array(N), done = new Uint8Array(N), keys = new Float32Array(N * 5), ids = new Int32Array(N * 5);
      let size, count, hold, born = 0, z = 0, band, gap;
      const push = (k, i) => { let c = size++; while (c > 0) { const p = (c - 1) >> 1; if (keys[p] <= k) break; keys[c] = keys[p]; ids[c] = ids[p]; c = p; } keys[c] = k; ids[c] = i; };
      const pop = () => {
        const top = ids[0], k = keys[--size], id = ids[size];
        let c = 0;
        for (;;) { let m = 2 * c + 1; if (m >= size) break; if (m + 1 < size && keys[m + 1] < keys[m]) m++; if (keys[m] >= k) break; keys[c] = keys[m]; ids[c] = ids[m]; c = m; }
        keys[c] = k; ids[c] = id;
        return top;
      };
      const reset = t => {
        z += 7.3; size = 0; count = 0; hold = 0; born = t; done.fill(0); time.fill(Infinity);
        const sc2 = R.range(14, 34), rough = R.range(1.2, 2.4);
        reset.rough = rough;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) cost[i] = Math.exp(rough * noise.fbm(x / sc2, y / sc2, z, 3));
        for (let k = R.int(1, 4); k > 0; k--) { const i = R.int(10, n - 11) * n + R.int(10, n - 11); time[i] = 0; push(0, i); }
        band = R.range(3, 7); gap = R.pick([0, 0.1, 0.14]);
      };
      reset(0);
      const drift = R.range(4, 9) * R.sign(), rate = 110;
      let warm = 2600;
      g.trait('Palette', palName(sc)); g.trait('Terrain', reset.rough > 1.8 ? 'Rugged' : 'Rolling'); g.trait('First ground', gap ? 'Contoured' : 'Smooth'); g.trait('First walkers', size);
      return (t, dt) => {
        for (const p of tapsAt(g, n)) { const i = p.y * n + p.x; if (!done[i]) { time[i] = 0; push(0, i); } }
        const quota = rate + warm; warm = 0;
        for (let k = 0; k < quota && size; k++) {
          const i = pop();
          if (done[i]) { k--; continue; }
          done[i] = 1; count++;
          const x = i % n, y = (i / n) | 0, tv = time[i];
          for (let m = 0; m < 8; m++) {
            const dx = [1, -1, 0, 0, 1, 1, -1, -1][m], dy = [0, 0, 1, -1, 1, -1, 1, -1][m], xx = x + dx, yy = y + dy;
            if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
            const j = yy * n + xx, nt = tv + cost[j] * (m < 4 ? 1 : 1.414);
            if (!done[j] && nt < time[j]) { time[j] = nt; push(nt, j); }
          }
        }
        if (count >= N && (hold += dt) > 6) reset(t);
        const hd = t * drift;
        for (let i = 0; i < N; i++) {
          if (!done[i]) { d[i] = time[i] < Infinity ? WHITE : BLACK; continue; }
          const f = time[i] * band / 30, fr = f - Math.floor(f);
          d[i] = fr < gap ? BLACK : sc.lut[(f * 64 - hd) & 255];
        }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, count >= N ? (6 - hold) / 1.2 : 1));
      };
    },
  });

  P.add({
    interactive: 'Move the pointer to carry one of the seeds.',
    name: 'Voronoi Drift', fam: 'Waves', type: 'px', n: 120,
    recipe: 'Every cell belongs to its nearest wandering point and is ringed by its distance to it, under a metric chosen by the seed.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), k = R.int(9, 18), metric = R.pick(['euclid', 'euclid', 'manhattan', 'chebyshev']), ring = R.range(5, 11), edge = R.range(1.2, 2.2), flow = R.range(1.5, 4) * R.sign();
        const pts = Array.from({ length: k }, () => ({ x: R(), y: R(), r: R.range(0.04, 0.16), w: R.range(0.06, 0.2) * R.sign(), ph: R.range(0, 6), c: R.int(0, 255) }));
        const px = new Float32Array(k), py = new Float32Array(k); const hnd = hand(g);
        const shade = [0.55, 0.7, 0.85, 1].map(s => U.dim(sc.lut, s));
        g.trait('Palette', palName(sc)); g.trait('Seeds', k); g.trait('Metric', { euclid: 'Round', manhattan: 'Diamond', chebyshev: 'Square' }[metric]); g.trait('Rings', ring < 8 ? 'Tight' : 'Loose');
        return t => {
          for (let j = 0; j < k; j++) { const p = pts[j]; px[j] = n * (p.x + p.r * Math.cos(t * p.w + p.ph)); py[j] = n * (p.y + p.r * Math.sin(t * p.w * 1.3 + p.ph)); }
          const hh = hnd.update(); if (hh.w) { px[0] = hh.mix(px[0], hh.x * n); py[0] = hh.mix(py[0], hh.y * n); }
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            let d1 = 1e9, d2 = 1e9, who = 0;
            for (let j = 0; j < k; j++) {
              const dx = Math.abs(x - px[j]), dy = Math.abs(y - py[j]);
              const dist = metric === 'euclid' ? Math.sqrt(dx * dx + dy * dy) : metric === 'manhattan' ? dx + dy : Math.max(dx, dy);
              if (dist < d1) { d2 = d1; d1 = dist; who = j; } else if (dist < d2) d2 = dist;
            }
            d[i] = d2 - d1 < edge ? BLACK : shade[((d1 - t * flow) / ring & 3)][(pts[who].c + d1 * 1.2) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const ptr = pointer(g);
      const { n, d } = g, sc = U.scheme(R), k = R.int(5, 24), metric = R.pick(['euclid', 'euclid', 'manhattan', 'chebyshev']), ring = R.range(5, 11), edge = R.range(1.2, 2.2), flow = R.range(1.5, 4) * R.sign();
      const pts = Array.from({ length: k }, () => ({ x: R(), y: R(), r: R.range(0.04, 0.16), w: R.range(0.06, 0.2) * R.sign(), ph: R.range(0, 6), c: R.int(0, 255) }));
      const px = new Float32Array(k), py = new Float32Array(k); const hnd = hand(g);
      const shade = [0.55, 0.7, 0.85, 1].map(s => U.dim(sc.lut, s));
      g.trait('Palette', palName(sc)); g.trait('Seeds', k); g.trait('Metric', { euclid: 'Round', manhattan: 'Diamond', chebyshev: 'Square' }[metric]); g.trait('Rings', ring < 8 ? 'Tight' : 'Loose');
      return t => {
        for (let j = 0; j < k; j++) { const p = pts[j]; px[j] = n * (p.x + p.r * Math.cos(t * p.w + p.ph)); py[j] = n * (p.y + p.r * Math.sin(t * p.w * 1.3 + p.ph)); }
        const hh = hnd.update(); if (hh.w) { px[0] = hh.mix(px[0], hh.x * n); py[0] = hh.mix(py[0], hh.y * n); }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let d1 = 1e9, d2 = 1e9, who = 0;
          for (let j = 0; j < k; j++) {
            const dx = Math.abs(x - px[j]), dy = Math.abs(y - py[j]);
            const dist = metric === 'euclid' ? Math.sqrt(dx * dx + dy * dy) : metric === 'manhattan' ? dx + dy : Math.max(dx, dy);
            if (dist < d1) { d2 = d1; d1 = dist; who = j; } else if (dist < d2) d2 = dist;
          }
          d[i] = d2 - d1 < edge ? BLACK : shade[((d1 - t * flow) / ring & 3)][(pts[who].c + d1 * 1.2) & 255];
        }
      };
    },
  });
  P.add({
    name: 'Quasicrystal', seed: 2, fam: 'Waves', type: 'px', n: 128,
    interactive: 'Move the pointer to slide the centre of symmetry.',
    recipe: 'Five to twelve sets of straight waves crossing at equal angles: an order that never quite repeats, slipping as the phases turn.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), N = n * n, waves = R.pick([5, 5, 7, 8, 9, 11, 12]), freq = R.range(0.22, 0.5), bands = R.pick([1, 2, 3]), gap = R.range(0.05, 0.12);
      const TS = 2048, cosT = new Float32Array(TS).map((_, i) => Math.cos(i / TS * U.TAU)), proj = [], rate = [];
      const cx = n * R.range(0.3, 0.7), cy = n * R.range(0.3, 0.7), turn = R.range(0, 3);
      for (let w = 0; w < waves; w++) {
        const a = turn + w * Math.PI / waves, p = new Float32Array(N);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) p[i] = ((x - cx) * Math.cos(a) + (y - cy) * Math.sin(a)) * freq / U.TAU * TS;
        proj.push(p); rate.push(R.range(0.04, 0.12) * R.sign() * TS);
      }
      const drift = R.range(2, 5), ptr = pointer(g), offs = new Float32Array(waves);
      let ox = 0, oy = 0;
      g.trait('Palette', palName(sc)); g.trait('Waves', waves); g.trait('Bands', bands); g.trait('Scale', freq > 0.36 ? 'Fine' : 'Broad');
      return (t, dt) => {
        const p = ptr(dt);
        ox += ((p ? p.x * n - cx : 0) - ox) * 0.15; oy += ((p ? p.y * n - cy : 0) - oy) * 0.15;
        for (let w = 0; w < waves; w++) { const a = turn + w * Math.PI / waves; offs[w] = t * rate[w] - (ox * Math.cos(a) + oy * Math.sin(a)) * freq / U.TAU * TS; }
        const hd = t * drift;
        for (let i = 0; i < N; i++) {
          let s = 0;
          for (let w = 0; w < waves; w++) s += cosT[(proj[w][i] + offs[w]) & (TS - 1)];
          const f = (s / waves * 0.5 + 0.5) * bands * 2.2, fr = f - Math.floor(f);
          d[i] = fr < gap ? BLACK : sc.lut[(f * 110 + hd) & 255];
        }
      };
    },
  });

  P.add({
    interactive: 'Click to throw a new wave packet from there.',
    name: 'Double Slit', seed: 2, fam: 'Waves', type: 'px', n: 110,
    recipe: 'A single quantum wave packet thrown at a wall with slits in it, a grating of posts or a round barrier. Hue is its phase, brightness is where it is likely to be found.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R, 0.7), N = n * n, re = new Float32Array(N), im = new Float32Array(N), V = new Float32Array(N), damp = new Float32Array(N), WALL = 0xff3c3c3c;
        const lr = new Uint8Array(256), lg = new Uint8Array(256), lb = new Uint8Array(256);
        for (let i = 0; i < 256; i++) { const v = sc.lut[i]; lr[i] = v & 255; lg[i] = v >> 8 & 255; lb[i] = v >> 16 & 255; }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { const m = Math.min(x, y, n - 1 - x, n - 1 - y); damp[i] = m < 8 ? 1 - 0.06 * (1 - m / 8) : 1; }
        let born = 0, life, turned;
        const reset = t => {
          born = t; life = R.range(9.5, 12); turned = R.bool(0.4);
          re.fill(0); im.fill(0); V.fill(0);
          const slits = R.pick([1, 2, 2, 2, 3, 4]), width = R.int(3, 5), gap = R.int(9, 16), wall = Math.round(n * R.range(0.44, 0.52)), mid = n / 2 + R.range(-4, 4);
          reset.slits = slits;
          for (let y = 0; y < n; y++) {
            let open = false;
            for (let s = 0; s < slits; s++) if (Math.abs(y - (mid + (s - (slits - 1) / 2) * gap)) < width / 2) open = true;
            if (!open) for (let x = wall; x < wall + 2; x++) V[turned ? x * n + y : y * n + x] = 2.2;
          }
          const k0 = R.range(0.6, 0.85), sig = R.range(8, 12), cx = n * 0.2, cy = n / 2 + R.range(-10, 10); reset.k0 = reset.k0 || k0;
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const u = turned ? y : x, v = turned ? x : y, a = Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (4 * sig * sig));
            re[i] = a * Math.cos(k0 * u); im[i] = a * Math.sin(k0 * u);
          }
        };
        const step = dt => {
          for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) re[i] = (re[i] + dt * (-0.5 * (im[i - 1] + im[i + 1] + im[i - n] + im[i + n] - 4 * im[i]) + V[i] * im[i])) * damp[i];
          for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) im[i] = (im[i] - dt * (-0.5 * (re[i - 1] + re[i + 1] + re[i - n] + re[i + n] - 4 * re[i]) + V[i] * re[i])) * damp[i];
        };
        reset(0);
        for (let k = 0; k < 60; k++) step(0.2);
        g.trait('Palette', palName(sc)); g.trait('Barrier', reset.slits + (reset.slits === 1 ? ' slit' : ' slits')); g.trait('Direction', turned ? 'Downward' : 'Across'); g.trait('Wavelength', reset.k0 > 0.75 ? 'Short' : 'Long');
        return t => {
          for (const p of tapsAt(g, n).slice(-1)) {   // (a burst of taps: the last one wins)
            born = t; re.fill(0); im.fill(0);
            const cx = turned ? p.y : Math.min(p.x, n * 0.4), cy = turned ? Math.min(p.x, n * 0.4) : p.y, k0 = 0.75, sig = 10;
            for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { if (V[i]) continue; const u = turned ? y : x, v = turned ? x : y, a = Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (4 * sig * sig)); re[i] = a * Math.cos(k0 * u); im[i] = a * Math.sin(k0 * u); }
          }
          if (t - born > life) reset(t);
          for (let k = 0; k < 6; k++) step(0.2);
          for (let i = 0; i < N; i++) {
            if (V[i]) { d[i] = WALL; continue; }
            const p = re[i] * re[i] + im[i] * im[i];
            if (p < 0.0006) { d[i] = BLACK; continue; }
            const b = Math.min(1, Math.pow(p, 0.3) * 1.7), h = ((Math.atan2(im[i], re[i]) / U.TAU + 1) * 256) & 255;
            d[i] = (255 << 24 | (lb[h] * b) << 16 | (lg[h] * b) << 8 | (lr[h] * b)) >>> 0;
          }
          U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, (life - (t - born)) / 1.2));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R, 0.7), N = n * n, re = new Float32Array(N), im = new Float32Array(N), V = new Float32Array(N), damp = new Float32Array(N), WALL = 0xff3c3c3c;
      const lr = new Uint8Array(256), lg = new Uint8Array(256), lb = new Uint8Array(256);
      for (let i = 0; i < 256; i++) { const v = sc.lut[i]; lr[i] = v & 255; lg[i] = v >> 8 & 255; lb[i] = v >> 16 & 255; }
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { const m = Math.min(x, y, n - 1 - x, n - 1 - y); damp[i] = m < 8 ? 1 - 0.06 * (1 - m / 8) : 1; }
      let born = 0, life, turned;
      const reset = (t, from) => {
        born = t; life = R.range(9.5, 12); turned = from ? false : R.bool(0.4);
        re.fill(0); im.fill(0); V.fill(0);
        const barrier = R.pick(['slits', 'slits', 'slits', 'posts', 'ring']), wall = Math.round(n * R.range(0.44, 0.52)), mid = n / 2 + R.range(-4, 4);
        reset.kind = barrier;
        if (barrier === 'slits') {
          const slits = R.pick([1, 2, 2, 2, 3, 4, 6]), width = R.int(2, 5), gap = R.int(7, 16);
          reset.slits = slits;
          for (let y = 0; y < n; y++) {
            let open = false;
            for (let s = 0; s < slits; s++) if (Math.abs(y - (mid + (s - (slits - 1) / 2) * gap)) < width / 2) open = true;
            if (!open) for (let x = wall; x < wall + 2; x++) V[turned ? x * n + y : y * n + x] = 2.2;
          }
        } else if (barrier === 'posts') {
          const gap = R.int(6, 10), cols = R.int(1, 3);
          for (let c = 0; c < cols; c++) for (let y = 3; y < n - 3; y += gap) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) { const x = wall + c * gap + a, yy = y + b + (c % 2) * (gap >> 1); if (yy < n) V[turned ? x * n + yy : yy * n + x] = 2.2; }
        } else {
          const r = R.range(6, 12);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if ((x - wall - r) ** 2 + (y - mid) ** 2 < r * r) V[turned ? x * n + y : y * n + x] = 2.2;
        }
        const k0 = R.range(0.5, 0.95), sig = R.range(7, 13), cx = from ? from.x : n * 0.2, cy = from ? from.y : n / 2 + R.range(-10, 10); reset.k0 = reset.k0 || k0;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const u = turned ? y : x, v = turned ? x : y, a = Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (4 * sig * sig));
          re[i] = a * Math.cos(k0 * u); im[i] = a * Math.sin(k0 * u);
        }
      };
      const step = dt => {
        for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) re[i] = (re[i] + dt * (-0.5 * (im[i - 1] + im[i + 1] + im[i - n] + im[i + n] - 4 * im[i]) + V[i] * im[i])) * damp[i];
        for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) im[i] = (im[i] - dt * (-0.5 * (re[i - 1] + re[i + 1] + re[i - n] + re[i + n] - 4 * re[i]) + V[i] * re[i])) * damp[i];
      };
      reset(0);
      for (let k = 0; k < 60; k++) step(0.2);
      g.trait('Palette', palName(sc)); g.trait('Barrier', reset.kind === 'slits' ? reset.slits + (reset.slits === 1 ? ' slit' : ' slits') : reset.kind === 'posts' ? 'Grating' : 'Round barrier'); g.trait('Direction', turned ? 'Downward' : 'Across'); g.trait('Wavelength', reset.k0 > 0.75 ? 'Short' : 'Long');
      return t => {
        for (const p of tapsAt(g, n).slice(-1)) reset(t, { x: Math.min(p.x, n * 0.4), y: p.y });   // (a burst of taps: the last one wins)
        if (t - born > life) reset(t);
        for (let k = 0; k < 6; k++) step(0.2);
        for (let i = 0; i < N; i++) {
          if (V[i]) { d[i] = WALL; continue; }
          const p = re[i] * re[i] + im[i] * im[i];
          if (p < 0.0006) { d[i] = BLACK; continue; }
          const b = Math.min(1, Math.pow(p, 0.3) * 1.7), h = ((Math.atan2(im[i], re[i]) / U.TAU + 1) * 256) & 255;
          d[i] = (255 << 24 | (lb[h] * b) << 16 | (lg[h] * b) << 8 | (lr[h] * b)) >>> 0;
        }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, (life - (t - born)) / 1.2));
      };
    },
  });
})();
