// Set 5 · Chroma II: the Synaesthesia rule once more. Every piece starts from the
// originals' remainder of time times x over y, on hard square cells with black
// voids where the hue runs off the wheel, and adds one new rule on top of it.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Chroma II' }, def));
  const mod = (a, m) => ((a % m) + m) % m;
  const SIN = Float32Array.from({ length: 1024 }, (_, i) => Math.sin(i / 1024 * 2 * Math.PI));

  // Colouring as in the originals: hue outside 1..95 is a void when voids are on.
  function colourer(R, voidShare = 0.75) {
    const sc = U.scheme(R, 0.65), voids = R.bool(voidShare);
    const lut = sc.native ? U.hueLut(R.bool(0.3) ? 100 : 88, R.bool(0.3) ? 100 : 92, 256) : U.lut(sc.cols, true);
    const at = h => (h !== h || (voids && (h > 95 || h < 1))) ? BLACK : lut[(mod(h, 100) * 2.56) | 0];
    return { at, voids, lut, isVoid: h => h !== h || (voids && (h > 95 || h < 1)) };
  }
  // The originals' field on an n-cell grid, in their own 800-pixel units:
  // u = ((T * X * a) mod (Y / yd)) / (Y / yd), then one of their curves.
  // `epoch` sets how far the clock has already run, as in the originals: early
  // clocks draw broad rays, late ones the fine interference the sketches are known for.
  function field(R, n, epoch) {
    const px = 800 / n, ys = R.int(200, 500), yd = R.pick([1, 2, 3]), a = R.pick([0.01, 0.02, 0.03, 0.05]);
    const kind = R.pick(['raw', 'log', 'log', 'acos', 'sin', 'sqrt']), h0 = R.range(0, 30), k = R.range(0.8, 1.3), c = R.int(1, 3);
    const curve = {
      raw: u => 100 * u * k, log: u => 100 + Math.log(u + 0.004) * 18 * k, acos: u => Math.acos(2 * u - 1) / Math.PI * 100 * k,
      sin: u => 50 + 50 * Math.sin(u * 2 * Math.PI * c) * k, sqrt: u => 100 * Math.sqrt(u) * k,
    }[kind];
    const T0 = epoch === 'calm' ? R.range(15, 70) : epoch === 'early' ? R.range(60, 300) : epoch === 'late' ? R.range(6000, 30000) : R.pick([R.range(400, 1500), R.range(1500, 6000)]), Xa = new Float64Array(n + 1), M = new Float64Array(n + 1);
    for (let i = 0; i <= n; i++) { Xa[i] = (i + 0.5) * px * a; M[i] = ((i + 0.5) * px + ys) / yd; }
    // whole cells read the tables; shifted (fractional) places are worked out in full
    const u = (x, y, T) => {
      if ((x | 0) === x && (y | 0) === y && x >= 0 && y >= 0 && x <= n && y <= n) { const m = M[y]; return ((T * Xa[x]) % m) / m; }
      const m = ((y + 0.5) * px + ys) / yd; return mod(T * (x + 0.5) * px * a, m) / m;
    };
    return { kind, a, yd, ys, px, u, hue: (x, y, T) => h0 + curve(u(x, y, T)), T: (t, rate) => T0 + t * rate, curve, h0 };
  }

  add({
    name: 'Two Clocks', seed: 2, sizes: [50, 80, 100], fps: 12,
    recipe: 'Two of the original clocks at once, one running along x and one along y. Their two remainders are multiplied, so colour only survives where both clocks are part-way round, and black lattices open wherever either one wraps.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.95), f1 = field(R, n, 'early'), f2 = field(R, n, 'early'), op = R.pick(['product', 'product', 'min', 'gap']), rate = R.range(1.5, 3), h0 = R.range(-2, 10), k = R.range(110, 160);
      return t => {
        const T1 = f1.T(t, rate), T2 = f2.T(t, rate * 0.8);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const u1 = f1.u(x, y, T1), u2 = f2.u(y, x, T2);
          const v = op === 'product' ? u1 * u2 * 1.6 : op === 'min' ? Math.min(u1, u2) : Math.abs(u1 - u2);
          d[y * n + x] = col.at(h0 + v * k);
        }
      };
    },
  });

  add({
    name: 'Hue Fall', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'The field is poured in at the top one row at a time; its coloured cells fall like grains and its voids fall through as air. The colours settle into strata, and when the jar is full the floor opens and the whole pile sinks.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 1), f = field(R, n), rate = R.range(2, 5), every = 1, slide = R.range(0.3, 0.8);
      const occ = new Uint8Array(n * n), c = new Uint32Array(n * n);
      let draining = 0, filled = 0, frame = 0;
      return (t, dt) => {
        frame++;
        if (draining > 0) {                                     // floor open: everything moves down one row
          draining--;
          for (let y = n - 1; y > 0; y--) for (let x = 0; x < n; x++) { occ[y * n + x] = occ[(y - 1) * n + x]; c[y * n + x] = c[(y - 1) * n + x]; }
          for (let x = 0; x < n; x++) occ[x] = 0;
        } else {
          for (let y = n - 2; y >= 0; y--) {
            const dir = (frame + y) & 1 ? 1 : -1;
            for (let k = 0; k < n; k++) {
              const x = dir > 0 ? k : n - 1 - k, i = y * n + x;
              if (!occ[i]) continue;
              const b = i + n;
              if (!occ[b]) { occ[b] = 1; c[b] = c[i]; occ[i] = 0; continue; }
              const s = x + (R() < 0.5 ? 1 : -1);
              if (s >= 0 && s < n && !occ[b - x + s] && !occ[i - x + s] && R() < slide) { occ[b - x + s] = 1; c[b - x + s] = c[i]; occ[i] = 0; }
            }
          }
          if (frame % every === 0) {
            const T = f.T(t, rate);
            for (let x = 0; x < n; x++) { const h = f.hue(x, (frame / every) % n, T); if (!col.isVoid(h) && !occ[x]) { occ[x] = 1; c[x] = col.at(h); } }
          }
          if (frame % 12 === 0) { filled = 0; for (let i = 0; i < n * n; i++) filled += occ[i]; if (filled > n * n * 0.72) draining = Math.floor(n * 0.45); }
        }
        for (let i = 0; i < n * n; i++) d[i] = occ[i] ? c[i] : BLACK;
      };
    },
  });

  add({
    name: 'Self Warp', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'The field is read twice: the first reading pushes every cell sideways by an amount set by its own colour, and the second reading, taken at that shifted place, is what you see. Bands fold over themselves like cloth in a current.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.8), f = field(R, n, 'early'), g2 = field(R, n, 'early'), rate = R.range(1.2, 2.6), amp = R.range(0.04, 0.12) * n, vert = R.bool(0.4), turns = R.int(1, 3);
      return t => {
        const T = f.T(t, rate), T2 = g2.T(t, rate * 0.6);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const w = SIN[(g2.u(x, y, T2) * 1024 * turns) & 1023] * amp;
          const xs = vert ? x : mod(x + w, n), yy = vert ? mod(y + w, n) : y;
          d[y * n + x] = col.at(f.hue(xs, yy, T));
        }
      };
    },
  });

  add({
    name: 'Ensemble', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'One field cut into tiles, each tile on its own clock. The clocks pull on each other: the tiles slide out of step until the picture is a patchwork, then lock back together into one seamless field, until a jolt scatters them again.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.85), f = field(R, n), rate = R.range(1.5, 3), k = R.pick([2, 3, 4, 5]), off = new Float32Array(k * k), vel = new Float32Array(k * k), pull = R.range(0.25, 0.6);
      const kick = () => { for (let i = 0; i < k * k; i++) vel[i] = R.range(-1, 1) * R.range(0.5, 1.6); };
      let next = 6;
      kick();
      return (t, dt) => {
        if (t > next) { kick(); next = t + R.range(9, 15); }
        let mean = 0; for (let i = 0; i < k * k; i++) mean += off[i]; mean /= k * k;
        for (let i = 0; i < k * k; i++) { vel[i] += (-(off[i] - mean) * pull - vel[i] * 0.6) * dt; off[i] += vel[i] * dt; }
        const T = f.T(t, rate);
        for (let y = 0; y < n; y++) {
          const ty = Math.floor(y * k / n);
          for (let x = 0; x < n; x++) d[y * n + x] = col.at(f.hue(x, y, T + off[ty * k + Math.floor(x * k / n)] * 4));
        }
      };
    },
  });

  add({
    name: 'Time Split', seed: 5, sizes: [50, 80, 100], fps: 12,
    recipe: 'Red, green and blue each read the field at a different moment, a little apart. Where the three moments agree the cells go white or black; where they disagree the colour splits into echoes, and the gap between the moments slowly opens and closes.',
    make(R, U, g) {
      const { n, d } = g, f = field(R, n), rate = R.range(1.4, 2.8), gap = R.range(3, 8), voids = R.bool(0.7), order = R.shuffle([0, 8, 16]);
      return t => {
        const T = f.T(t, rate), lag = gap * (0.5 - 0.5 * Math.cos(t * 0.25));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let v = 0xff000000;
          for (let c = 0; c < 3; c++) {
            const h = f.hue(x, y, T - lag * c);
            const on = voids ? (h >= 1 && h <= 95) : true, lvl = on ? 70 + 185 * U.clamp(mod(h, 100) / 95) : 0;
            v |= (lvl | 0) << order[c];
          }
          d[y * n + x] = v >>> 0;
        }
      };
    },
  });

  add({
    name: 'Beat Frequency', seed: 3, sizes: [50, 80, 100], fps: 12,
    recipe: 'Two copies of the same field race far too fast to watch, one a hair quicker than the other. Only their difference is shown, so what you see is the slow beat between them: calm bands sliding where each copy alone would flicker.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.8), f = field(R, n), fast = R.range(30, 60), eps = R.range(0.02, 0.05), h0 = R.range(0, 20);
      return t => {
        const T1 = f.T(t, fast), T2 = T1 * (1 + eps) - f.T(0, 0) * eps;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = col.at(h0 + mod(f.hue(x, y, T1) - f.hue(x, y, T2), 100) * 0.97);
      };
    },
  });

  add({
    name: 'Swing', seed: 5, sizes: [50, 80, 100], fps: 12,
    recipe: 'Time swings instead of running: each row’s clock rocks back and forth, a little later than the row above, so a wave of past and future travels down the grid and the bands open and close like bellows.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.85), f = field(R, n), base = f.T(0, 0), amp = R.range(1.5, 5), w = R.range(0.25, 0.5), lag = R.range(0.02, 0.08) * R.sign(), drift = R.range(0.1, 0.5);
      return t => {
        for (let y = 0; y < n; y++) {
          const T = base + t * drift + amp * Math.sin(t * w + y * lag * Math.PI);
          for (let x = 0; x < n; x++) d[y * n + x] = col.at(f.hue(x, y, T));
        }
      };
    },
  });

  add({
    name: 'Hue Current', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'The field is carried along by a slow current that is itself one of the original clocks, read as a direction round the wheel. Each cell remembers where its colour came from, so the remainder bands are drawn out along the current, bend and fold, and slowly relax back.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.75), f = field(R, n, 'calm'), steer = field(R, n, 'calm'), rate = R.range(1.2, 2.2), speed = R.range(0.35, 0.7), relax = R.range(0.006, 0.015);
      // how far each cell's colour has travelled to get here
      const ox = new Float32Array(n * n), oy = new Float32Array(n * n), nx = new Float32Array(n * n), ny = new Float32Array(n * n);
      return t => {
        const Ts = steer.T(t * 0.08, rate), T = f.T(t, rate);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, k = (steer.u(x, y, Ts) * 1024) & 1023;
          // look one step upstream, between cells, for where this fluid was
          const sx = x - SIN[(k + 256) & 1023] * speed, sy = y - SIN[k] * speed, x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0;
          const a = mod(y0, n) * n + mod(x0, n), b = mod(y0, n) * n + mod(x0 + 1, n), c = mod(y0 + 1, n) * n + mod(x0, n), e = mod(y0 + 1, n) * n + mod(x0 + 1, n);
          const px = (ox[a] * (1 - fx) + ox[b] * fx) * (1 - fy) + (ox[c] * (1 - fx) + ox[e] * fx) * fy, py = (oy[a] * (1 - fx) + oy[b] * fx) * (1 - fy) + (oy[c] * (1 - fx) + oy[e] * fx) * fy;
          // the journey so far, plus this step; it fades a little, so the folding never runs away
          nx[i] = (sx - x + px) * (1 - relax); ny[i] = (sy - y + py) * (1 - relax);
        }
        ox.set(nx); oy.set(ny);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; d[i] = col.at(f.hue(mod(x + ox[i], n), mod(y + oy[i], n), T)); }
      };
    },
  });

  add({
    name: 'Void Tunnel', seed: 6, sizes: [50, 80, 100], fps: 12,
    recipe: 'The field’s black voids become windows onto the frame before, shrunk a little toward the middle and dimmed, and that frame’s voids show the one before it. Every void is a tunnel of echoes of the field receding into the dark.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 1), f = field(R, n, 'early'), rate = R.range(1, 2), zoom = R.range(0.86, 0.94), spin = R.range(-0.04, 0.04), fade = R.range(0.8, 0.9);
      const prev = new Uint32Array(n * n), c = (n - 1) / 2, co = Math.cos(spin) / zoom, si = Math.sin(spin) / zoom;
      // where each cell looks in the frame before: a little further out from the middle
      const look = new Int32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const dx = x - c, dy = y - c, sx = Math.round(c + co * dx - si * dy), sy = Math.round(c + si * dx + co * dy);
        look[y * n + x] = sx >= 0 && sy >= 0 && sx < n && sy < n ? sy * n + sx : -1;
      }
      return t => {
        const T = f.T(t, rate);
        prev.set(d);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, h = f.hue(x, y, T);
          if (!col.isVoid(h)) { d[i] = col.at(h); continue; }
          const j = look[i], v = j < 0 ? BLACK : prev[j];
          d[i] = (0xff000000 | (((v >>> 16 & 255) * fade) | 0) << 16 | (((v >>> 8 & 255) * fade) | 0) << 8 | ((v & 255) * fade) | 0) >>> 0;
        }
      };
    },
  });

  add({
    name: 'Relief', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'The field read as height: each remainder band is a terrace, lit by a low sun that walks slowly round, so every step of the hue throws a bright edge on one side and a dark one on the other.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.7), f = field(R, n), rate = R.range(1.2, 2.2), depth = R.range(0.025, 0.05), turn = R.range(0.15, 0.3) * R.sign();
      const h = new Float32Array(n * n), c = new Uint32Array(n * n);
      return t => {
        const T = f.T(t, rate), lx = Math.cos(t * turn), ly = Math.sin(t * turn);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = f.hue(x, y, T), i = y * n + x; c[i] = col.at(v); h[i] = col.isVoid(v) ? 0 : mod(v, 100); }
        for (let y = 0; y < n; y++) {
          const up = (y > 0 ? y - 1 : 0) * n, dn = (y < n - 1 ? y + 1 : y) * n;
          for (let x = 0; x < n; x++) {
            const i = y * n + x, v = c[i];
            if (v === BLACK) { d[i] = BLACK; continue; }
            const gx = h[y * n + (x < n - 1 ? x + 1 : x)] - h[y * n + (x > 0 ? x - 1 : 0)], gy = h[dn + x] - h[up + x];
            let s = 0.75 - (gx * lx + gy * ly) * depth; s = s < 0.25 ? 0.25 : s > 1.6 ? 1.6 : s;
            let r = ((v & 255) * s) | 0, gg = ((v >>> 8 & 255) * s) | 0, bb = ((v >>> 16 & 255) * s) | 0;
            if (r > 255) r = 255; if (gg > 255) gg = 255; if (bb > 255) bb = 255;
            d[i] = (0xff000000 | bb << 16 | gg << 8 | r) >>> 0;
          }
        }
      };
    },
  });
})();
