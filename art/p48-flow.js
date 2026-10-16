// Set 5 · Flow: fluids and transport run as cell processes, in bold colour.
// Dye is carried from cell to cell by real flow rules (vortices, convection
// rolls, shear, percolation, wind-blown sand), so the grid shows the motion itself.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  // def.prewarm: run that many frames on a clock before zero, so the first frame shown is already under way
  const add = def => {
    const w = def.prewarm; delete def.prewarm;
    if (w) { const mk = def.make; def.make = function (R, U, g) { const f = mk.call(this, R, U, g); for (let k = w; k > 0; k--) f(-k / 12, 1 / 12, -k); return f; }; }
    P.addPixel(Object.assign({ set: 5, fam: 'Flow' }, def));
  };
  // A crisp pixel dissolve from the last frame into the next, for resets that used to pop.
  function dissolver(n) {
    const prev = new Uint32Array(n * n); let k = 1, dur = 1;
    return {
      start(d, secs = 0.9) { prev.set(d); k = 0; dur = secs; },
      apply(d, dt) { if (k >= 1) return; k = Math.min(1, k + dt / dur); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (X.dith8(x, y) > k) d[y * n + x] = prev[y * n + x]; },
    };
  }
  // two passes of a 3 x 3 blur (wrapping sideways), to settle a noisy starting field
  function settle(T, n) {
    const t2 = new Float32Array(n * n);
    for (let p = 0; p < 2; p++) {
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0; for (let dy = -1; dy <= 1; dy++) { const yy = Math.min(n - 1, Math.max(0, y + dy)); for (let dx = -1; dx <= 1; dx++) s += T[yy * n + mod(x + dx, n)]; } t2[y * n + x] = s / 9; }
      T.set(t2);
    }
  }
  // the post in the stream: lit from the top left
  function post(g, cx, cy, D) { X.disc(g, cx, cy, D, 0xff383838); X.disc(g, cx - D * 0.14, cy - D * 0.14, D * 0.8, 0xff686868); X.disc(g, cx - D * 0.38, cy - D * 0.38, Math.max(0.8, D * 0.24), 0xffa0a0a0); }
  const mod = (a, m) => ((a % m) + m) % m;
  const dimPk = (v, k) => (0xff000000 | (((v >>> 16 & 255) * k) | 0) << 16 | (((v >>> 8 & 255) * k) | 0) << 8 | ((v & 255) * k) | 0) >>> 0;
  const bold = R => U.hueLut(R.bool(0.5) ? 100 : 88, 100, 256, R.range(0, 100), R.pick([100, 70, -70, 45]));
  // names for traits (naming never draws from the dice)
  const HUES = [[0, 'Red'], [7, 'Orange'], [13, 'Amber'], [17, 'Yellow'], [24, 'Lime'], [32, 'Green'], [44, 'Teal'], [51, 'Cyan'], [59, 'Azure'], [66, 'Blue'], [74, 'Violet'], [83, 'Magenta'], [92, 'Rose'], [100, 'Red']];
  const hueName = h => { h = ((h % 100) + 100) % 100; let b = HUES[0]; for (const e of HUES) if (Math.abs(e[0] - h) < Math.abs(b[0] - h)) b = e; return b[1]; };
  // bold() with the same draws, and a name for the palette it rolled
  const boldN = (R, g, label = 'Palette') => { const s = R.bool(0.5) ? 100 : 88, from = R.range(0, 100), span = R.pick([100, 70, -70, 45]); if (g) g.trait(label, Math.abs(span) >= 100 ? 'Rainbow from ' + hueName(from) : hueName(from) + ' to ' + hueName(from + span)); return U.hueLut(s, 100, 256, from, span); };
  const glowPk = (v, k) => { const f = c => (c + (255 - c) * k) | 0; return (0xff000000 | f(v >>> 16 & 255) << 16 | f(v >>> 8 & 255) << 8 | f(v & 255)) >>> 0; };
  const VIEWS = { none: 'Upright', tr: 'Sideways', fx: 'Mirrored', fy: 'Upside down' };
  // The flow seen another way round: turned on its side or mirrored. view() hands
  // the piece the pointer in its own coordinates; apply() turns the finished grid.
  function orient(R, n, d, input, opts = ['none', 'none', 'tr', 'fx', 'fy']) {
    const m = R.pick(opts), tmp = new Uint32Array(n * n);
    const map = p => m === 'tr' ? { x: p.y, y: p.x } : m === 'fx' ? { x: 1 - p.x, y: p.y } : m === 'fy' ? { x: p.x, y: 1 - p.y } : p;
    const view = { get inside() { return input.inside; }, get down() { return input.down; }, get x() { return map(input).x; }, get y() { return map(input).y; }, taps: () => input.taps().map(map) };
    return {
      m, input: view,
      apply() {
        if (m === 'none') return;
        tmp.set(d);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = m === 'tr' ? tmp[x * n + y] : m === 'fx' ? tmp[y * n + n - 1 - x] : tmp[(n - 1 - y) * n + x];
      },
    };
  }

  // nearest-cell advection of a dye field by a velocity field (u, v in cells per step), wrapping or clamping
  function advect(src, dst, n, u, v, wrapX, wrapY) {
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      let sx = Math.round(x - u[i]), sy = Math.round(y - v[i]);
      sx = wrapX ? mod(sx, n) : sx < 0 ? 0 : sx >= n ? n - 1 : sx;
      sy = wrapY ? mod(sy, n) : sy < 0 ? 0 : sy >= n ? n - 1 : sy;
      dst[i] = src[sy * n + sx];
    }
  }

  // Smooth transport for dye that must stay crisp: every cell remembers where its fluid
  // started (x, y), and each step looks that up one velocity back, between cells.
  // Fluid arriving from outside a non-wrapping edge simply starts where it is.
  function flowMap(n) {
    const x = new Float32Array(n * n), y = new Float32Array(n * n), nx = new Float32Array(n * n), ny = new Float32Array(n * n);
    const near = (a, b, wrap) => wrap ? b + (b - a > n / 2 ? -n : b - a < -n / 2 ? n : 0) : b;
    return {
      x, y,
      reset() { for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { x[j * n + i] = i; y[j * n + i] = j; } },
      step(u, v, wrapX, wrapY) {
        for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
          const k = j * n + i; let sx = i - u[k], sy = j - v[k];
          if ((!wrapX && (sx < 0 || sx > n - 1)) || (!wrapY && (sy < 0 || sy > n - 1))) { nx[k] = sx; ny[k] = wrapY ? mod(sy, n) : sy; continue; }
          const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0;
          const X0 = wrapX ? mod(x0, n) : x0, X1 = wrapX ? mod(x0 + 1, n) : Math.min(n - 1, x0 + 1), Y0 = wrapY ? mod(y0, n) : y0, Y1 = wrapY ? mod(y0 + 1, n) : Math.min(n - 1, y0 + 1);
          const a = Y0 * n + X0, b = Y0 * n + X1, c = Y1 * n + X0, e = Y1 * n + X1;
          const ax = x[a], bx = near(ax, x[b], wrapX), cx = near(ax, x[c], wrapX), ex = near(ax, x[e], wrapX);
          const ay = y[a], by = near(ay, y[b], wrapY), cy = near(ay, y[c], wrapY), ey = near(ay, y[e], wrapY);
          const ox = (ax * (1 - fx) + bx * fx) * (1 - fy) + (cx * (1 - fx) + ex * fx) * fy, oy = (ay * (1 - fx) + by * fx) * (1 - fy) + (cy * (1 - fx) + ey * fx) * fy;
          nx[k] = wrapX ? mod(ox, n) : ox; ny[k] = wrapY ? mod(oy, n) : oy;
        }
        x.set(nx); y.set(ny);
      },
    };
  }

  add({
    interactive: 'Hold to heat the fluid under the pointer.',
    listens: 'The louder the room, the harder it boils.',
    name: 'Convection', seed: 3, sizes: [50, 80, 100], fps: 12, prewarm: 18,
    recipe: 'A layer of fluid heated from below and cooled from above turns over in rolling cells: hot plumes rise between the rolls, spread under the lid and sink again, and the rolls slowly wander, as in a pan of soup or the surface of the sun.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), bands = R.int(6, 12), rolls = R.int(2, 5), amp0 = R.range(0.6, 1.1) * n / 50;
        let T = new Float32Array(n * n), T2 = new Float32Array(n * n);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) T[y * n + x] = 1 - y / n + R.range(-0.05, 0.05);
        settle(T, n); let heard = 0;
        g.trait('Rolls', rolls); g.trait('Tiers', 1); g.trait('Bands', bands); g.trait('Shading', 'Flat bands'); g.trait('View', 'Upright');
        return t => {
          if (g.input.listening) heard += (g.input.level - heard) * 0.3; else heard = 0;
          const amp = amp0 * (1 + heard * 1.4), ph = t * 0.15, kx = Math.PI * rolls / n, ky = Math.PI / n;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            // stream function psi = A sin(kx x + ph) sin(ky y): u = dpsi/dy, v = -dpsi/dx
            const u = amp / rolls * Math.sin(kx * x + ph) * Math.cos(ky * y), v = -amp * Math.cos(kx * x + ph) * Math.sin(ky * y);
            let sx = x - u, sy = y - v; sx = mod(sx, n); sy = sy < 0 ? 0 : sy > n - 1 ? n - 1 : sy;
            const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0, x1 = (x0 + 1) % n, y1 = Math.min(n - 1, y0 + 1);
            T2[y * n + x] = (T[y0 * n + x0] * (1 - fx) + T[y0 * n + x1] * fx) * (1 - fy) + (T[y1 * n + x0] * (1 - fx) + T[y1 * n + x1] * fx) * fy;
          }
          for (let x = 0; x < n; x++) { T2[(n - 1) * n + x] = 1; T2[x] = 0; }
          if (g.input.down && g.input.inside) { const px = g.input.x * n, py = g.input.y * n, r = n * 0.06; for (let y = Math.max(0, py - r | 0); y < Math.min(n, py + r + 1); y++) for (let x = Math.max(0, px - r | 0); x < Math.min(n, px + r + 1); x++) if ((x - px) ** 2 + (y - py) ** 2 < r * r) T2[y * n + x] = 1; }
          const s = T; T = T2; T2 = s;
          for (let i = 0; i < n * n; i++) d[i] = lut[(Math.floor(U.clamp(T[i], 0, 0.999) * bands) / bands * 255) | 0];
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, lut = boldN(R, g), bands0 = R.int(4, 14), rolls = R.int(1, 6), amp0 = R.range(0.5, 1.2) * n / 50, O = orient(R, n, d, g.input), inp = O.input, lines = R.bool(0.35);
      // stacked tiers of rolls, and smooth shading instead of bands, are this variation's own
      const A = g.alt, tiers = +g.trait('Tiers', A() < 0.7 ? 1 : 2), smoothShade = !lines && A() < 0.18, bands = smoothShade ? 40 : bands0;
      g.trait('Rolls', rolls * tiers); g.trait('Bands', smoothShade ? 'Many' : bands); g.trait('Shading', lines ? 'Outlined' : smoothShade ? 'Smooth' : 'Flat bands'); g.trait('View', VIEWS[O.m]);
      let T = new Float32Array(n * n), T2 = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) T[y * n + x] = 1 - y / n + R.range(-0.05, 0.05);
        settle(T, n); let heard = 0;
      return t => {
        if (g.input.listening) heard += (g.input.level - heard) * 0.3; else heard = 0;
          const amp = amp0 * (1 + heard * 1.4), ph = t * 0.15, kx = Math.PI * rolls / n, ky = Math.PI * tiers / n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          // stream function psi = A sin(kx x + ph) sin(ky y): u = dpsi/dy, v = -dpsi/dx
          const u = amp / rolls * Math.sin(kx * x + ph) * Math.cos(ky * y), v = -amp * Math.cos(kx * x + ph) * Math.sin(ky * y);
          let sx = x - u, sy = y - v; sx = mod(sx, n); sy = sy < 0 ? 0 : sy > n - 1 ? n - 1 : sy;
          const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0, x1 = (x0 + 1) % n, y1 = Math.min(n - 1, y0 + 1);
          T2[y * n + x] = (T[y0 * n + x0] * (1 - fx) + T[y0 * n + x1] * fx) * (1 - fy) + (T[y1 * n + x0] * (1 - fx) + T[y1 * n + x1] * fx) * fy;
        }
        for (let x = 0; x < n; x++) { T2[(n - 1) * n + x] = 1; T2[x] = 0; }
        if (inp.down && inp.inside) { const px = inp.x * n, py = inp.y * n, r = n * 0.06; for (let y = Math.max(0, py - r | 0); y < Math.min(n, py + r + 1); y++) for (let x = Math.max(0, px - r | 0); x < Math.min(n, px + r + 1); x++) if ((x - px) ** 2 + (y - py) ** 2 < r * r) T2[y * n + x] = 1; }
        const s = T; T = T2; T2 = s;
        for (let i = 0; i < n * n; i++) {
          const q = Math.floor(U.clamp(T[i], 0, 0.999) * bands);
          d[i] = lines && i % n < n - 1 && i + n < n * n && (Math.floor(U.clamp(T[i + 1], 0, 0.999) * bands) !== q || Math.floor(U.clamp(T[i + n], 0, 0.999) * bands) !== q) ? BLACK : lut[(q / bands * 255) | 0];
        }
        O.apply();
      };
    },
  });

  add({
    interactive: 'Click to drop a new whirl into the layer.',
    name: 'Shear Layer', seed: 5, sizes: [50, 80], fps: 12,
    recipe: 'Two streams slide past each other in opposite directions. The boundary between them is a row of tiny vortices; they pull on one another and roll the striped fluid up into curls like breaking waves, which pair off and merge into fewer, larger curls.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), stripes = R.int(4, 8), N = R.int(10, 16), G = n * R.range(2.4, 3.4) / N, delta = n * 0.035, waves = R.int(1, 3);
        const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
        let vx, vy, age;
        const reset = () => {
          fl.reset();
          vx = []; vy = []; for (let k = 0; k < N; k++) { vx.push((k + 0.5) * n / N + R.range(-0.5, 0.5)); vy.push(n / 2 + Math.sin(k / N * TAU * waves) * n * 0.02 + R.range(-0.5, 0.5)); }
          age = 0;
        };
        reset();
        const vel = (x, y, out) => {
          let ux = 0, uy = 0;
          for (let k = 0; k < vx.length; k++) for (let w = -1; w <= 1; w++) { const dx = x - vx[k] - w * n, dy = y - vy[k], r2 = dx * dx + dy * dy + delta * delta; ux += -dy / r2; uy += dx / r2; }
          out[0] = ux * G / TAU; out[1] = uy * G / TAU;
        };
        const tmp = [0, 0];
        g.trait('Layers', 'One'); g.trait('Whirls', N); g.trait('Stripes', stripes); g.trait('Ground', 'Black'); g.trait('View', 'Upright');
        return (t, dt) => {
          if ((age += dt) > 28) { diss.start(d); reset(); }
          for (const tp of g.input.taps()) if (vx.length < N + 8) { vx.push(tp.x * n); vy.push(tp.y * n); }
          for (let k = 0; k < vx.length; k++) { vel(vx[k], vy[k], tmp); vx[k] = mod(vx[k] + tmp[0] * 0.4, n); vy[k] += tmp[1] * 0.4; }
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, tmp); u[y * n + x] = tmp[0] * 0.4; v[y * n + x] = tmp[1] * 0.4; }
          fl.step(u, v, true, false);
          for (let i = 0; i < n * n; i++) { const k = Math.floor(fl.y[i] / n * stripes * 2); d[i] = k & 1 ? lut[(k * 255 / (stripes * 2)) | 0] : BLACK; }
          diss.apply(d, dt);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, lut = boldN(R, g), stripes = R.int(3, 10), N = R.int(8, 18), G = n * R.range(2.2, 3.6) / N, delta = n * 0.035, waves = R.int(1, 3), O = orient(R, n, d, g.input, ['none', 'tr', 'fy']), full = R.bool(0.35);
      const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
      // one shear layer (the original) or two facing each other, like a jet
      const A = g.alt, twin = g.trait('Layers', A() < 0.65 ? 'One' : 'Two') === 'Two', N1 = twin ? Math.min(N, 11) : N;
      g.trait('Whirls', N1 * (twin ? 2 : 1)); g.trait('Stripes', stripes); g.trait('Ground', full ? 'Filled' : 'Black'); g.trait('View', VIEWS[O.m]);
      let vx, vy, sg, age;
      const reset = () => {
        fl.reset();
        vx = []; vy = []; sg = []; for (let k = 0; k < N; k++) { const x = (k + 0.5) * n / N1 + R.range(-0.5, 0.5), y = Math.sin(k / N1 * TAU * waves) * n * 0.02 + R.range(-0.5, 0.5); if (k >= N1) continue; if (twin) { vx.push(x); vy.push(n * 0.32 + y); sg.push(1); vx.push(mod(x + n / N1 / 2, n)); vy.push(n * 0.68 - y); sg.push(-1); } else { vx.push(x); vy.push(n / 2 + y); sg.push(1); } }
        age = 0;
      };
      reset();
      const vel = (x, y, out) => {
        let ux = 0, uy = 0;
        for (let k = 0; k < vx.length; k++) for (let w = -1; w <= 1; w++) { const dx = x - vx[k] - w * n, dy = y - vy[k], r2 = dx * dx + dy * dy + delta * delta; ux += -dy * sg[k] / r2; uy += dx * sg[k] / r2; }
        out[0] = ux * G / TAU; out[1] = uy * G / TAU;
      };
      const tmp = [0, 0];
      return (t, dt) => {
        if ((age += dt) > 28) { diss.start(d); reset(); }
        for (const tp of O.input.taps()) if (vx.length < (twin ? 2 * N1 : N) + 8) { vx.push(tp.x * n); vy.push(tp.y * n); sg.push(twin && tp.y > 0.5 ? -1 : 1); }
        for (let k = 0; k < vx.length; k++) { vel(vx[k], vy[k], tmp); vx[k] = mod(vx[k] + tmp[0] * 0.4, n); vy[k] += tmp[1] * 0.4; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, tmp); u[y * n + x] = tmp[0] * 0.4; v[y * n + x] = tmp[1] * 0.4; }
        fl.step(u, v, true, false);
        for (let i = 0; i < n * n; i++) { const k = Math.floor(fl.y[i] / n * stripes * 2); d[i] = k & 1 ? lut[(k * 255 / (stripes * 2)) | 0] : full ? dimPk(lut[(k * 255 / (stripes * 2) + 128) & 255], 0.55) : BLACK; }
        O.apply();
        diss.apply(d, dt);
      };
    },
  });

  add({
    interactive: 'Click to blow a fresh pair of rings.',
    listens: 'Clap to blow a fresh pair of rings.',
    name: 'Smoke Rings', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'Two smoke rings, seen edge-on as pairs of spinning vortices, travel the same way down the frame. The one behind narrows, speeds up and slips through the one ahead, which widens and slows, and they keep leapfrogging, each dragging its oval of coloured smoke along.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), G = n * R.range(0.9, 1.3), delta = n * 0.05, y0 = n / 2, rings = R.int(4, 7);
        g.trait('Rings', 'Two'); g.trait('Air', 'Clear'); g.trait('Bands', rings); g.trait('View', 'Upright');
        const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
        let vs, cx0, life = 0;
        const reset = () => { fl.reset(); vs = [[n * 0.2, y0 - n * 0.12, G], [n * 0.2, y0 + n * 0.12, -G], [n * 0.45, y0 - n * 0.12, G], [n * 0.45, y0 + n * 0.12, -G]]; cx0 = [n * 0.2, n * 0.45]; life = 0; };
        reset();
        const vel = (x, y, skip, out) => {
          let ux = 0, uy = 0;
          for (let k = 0; k < 4; k++) { if (k === skip) continue; for (let w = -1; w <= 1; w++) { const dx = x - vs[k][0] - w * n, dy = y - vs[k][1], r2 = dx * dx + dy * dy + delta * delta; ux += -dy * vs[k][2] / r2; uy += dx * vs[k][2] / r2; } }
          return out ? (out[0] = ux / TAU, out[1] = uy / TAU, out) : [ux / TAU, uy / TAU];
        };
        // smoke starts as two ovals of rings round each pair; anything else is clear air
        const smoke = (x, y) => {
          for (let k = 0; k < 2; k++) {
            let dx = mod(x - cx0[k] + n / 2, n) - n / 2; const dy = y - y0, e = (dx / (n * 0.12)) ** 2 + (dy / (n * 0.21)) ** 2;
            if (e < 1) return lut[((k * 128 + Math.floor(e * rings) * (128 / rings)) | 0) & 255];
          }
          return BLACK;
        };
        return (t, dt) => {
          life += dt; const tapped = g.input.taps().length > 0, clap = g.input.listening && g.input.beats() > 0 && life > 4;
          if (life > 40) { diss.start(d); reset(); } else if (tapped || clap) reset();
          const mv = vs.map((p, k) => vel(p[0], p[1], k));
          vs.forEach((p, k) => { p[0] = mod(p[0] + mv[k][0] * 0.35, n); p[1] += mv[k][1] * 0.35; });
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, -1, tmpv); u[y * n + x] = tmpv[0] * 0.35; v[y * n + x] = tmpv[1] * 0.35; }
          fl.step(u, v, true, true);
          for (let i = 0; i < n * n; i++) d[i] = smoke(fl.x[i], fl.y[i]);
          diss.apply(d, dt);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, lut = boldN(R, g), G = n * R.range(0.8, 1.4), delta = n * R.range(0.04, 0.07), y0 = n / 2, rings = R.int(2, 9), O = orient(R, n, d, g.input), sep = R.range(0.09, 0.16), lenR = R.range(0.1, 0.16);
      const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
      // two rings leapfrogging (the original) or three; clear or hazy air
      const A = g.alt, three = g.trait('Rings', A() < 0.65 ? 'Two' : 'Three') === 'Three', haze = g.trait('Air', A() < 0.65 ? 'Clear' : 'Hazy') === 'Hazy' ? dimPk(lut[160], 0.16) : BLACK;
      g.trait('Bands', rings); g.trait('View', VIEWS[O.m]);
      let vs, cx0, life = 0;
      const reset = () => { fl.reset(); const xs = three ? [0.12, 0.34, 0.56] : [0.2, 0.45]; vs = []; for (const x of xs) vs.push([n * x, y0 - n * sep, G], [n * x, y0 + n * sep, -G]); cx0 = xs.map(x => n * x); life = 0; };
      reset();
      const vel = (x, y, skip, out) => {
        let ux = 0, uy = 0;
        for (let k = 0; k < vs.length; k++) { if (k === skip) continue; for (let w = -1; w <= 1; w++) { const dx = x - vs[k][0] - w * n, dy = y - vs[k][1], r2 = dx * dx + dy * dy + delta * delta; ux += -dy * vs[k][2] / r2; uy += dx * vs[k][2] / r2; } }
        return out ? (out[0] = ux / TAU, out[1] = uy / TAU, out) : [ux / TAU, uy / TAU];
      };
      // smoke starts as two ovals of rings round each pair; anything else is clear air
      const smoke = (x, y) => {
        for (let k = 0; k < cx0.length; k++) {
          let dx = mod(x - cx0[k] + n / 2, n) - n / 2; const dy = y - y0, e = (dx / (n * lenR)) ** 2 + (dy / (n * (sep + 0.09))) ** 2;
          if (e < 1) return lut[((k * (256 / cx0.length) + Math.floor(e * rings) * (128 / rings)) | 0) & 255];
        }
        return haze;
      };
      return (t, dt) => {
        life += dt; const tapped = O.input.taps().length > 0, clap = g.input.listening && g.input.beats() > 0 && life > 4;
        if (life > 40) { diss.start(d); reset(); } else if (tapped || clap) reset();
        const mv = vs.map((p, k) => vel(p[0], p[1], k));
        vs.forEach((p, k) => { p[0] = mod(p[0] + mv[k][0] * 0.35, n); p[1] += mv[k][1] * 0.35; });
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, -1, tmpv); u[y * n + x] = tmpv[0] * 0.35; v[y * n + x] = tmpv[1] * 0.35; }
        fl.step(u, v, true, true);
        for (let i = 0; i < n * n; i++) d[i] = smoke(fl.x[i], fl.y[i]);
        O.apply();
        diss.apply(d, dt);
      };
    },
  });

  add({
    interactive: 'Click to drop ink on the bath.',
    name: 'Marbling', seed: 2, sizes: [50, 80, 100], fps: 12,
    recipe: 'Paper marbling done by its exact fluid rule: drops of ink land on the bath and each one pushes every ring already there outward to make room, then a comb is drawn through and drags the rings into feathers. Nothing is random once the drops fall; the pattern is the flow.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g;
        let lut, ops, ground, timer, cur, hold, inks, gen = 0, lastKey = -1; const diss = dissolver(n), cache = new Uint32Array(n * n);   // the bath is only redrawn when it changes
        const reset = () => {
          gen++; lut = boldN(R, g); inks = R.int(3, 5); ground = X.hsbPk(R.range(0, 100), 40, 14); ops = []; timer = 0; cur = null; hold = 0;
          g.trait('Pattern', 'Stone'); g.trait('Bath', 'Dark'); g.trait('Inks', inks);
          for (let k = 0; k < R.int(3, 5); k++) { const o = next(); o.r = o.target; ops.push(o); }   // the bath starts with a few drops already down
        };
        // where a point on the bath now came from, undoing the operations newest first; returns ink index or -1
        const inkAt = (px, py) => {
          for (let k = ops.length - 1; k >= 0; k--) {
            const o = ops[k];
            if (o.kind === 'drop') {
              const dx = px - o.x, dy = py - o.y, r2 = dx * dx + dy * dy, rr = o.r * o.r;
              if (r2 < rr) return o.ink;
              const s = Math.sqrt(1 - rr / r2); px = o.x + dx * s; py = o.y + dy * s;
            } else {
              const dist = Math.abs((px - o.x) * o.ny - (py - o.y) * o.nx), z = o.a * o.l / (dist + o.l);
              px -= o.nx * z; py -= o.ny * z;
            }
          }
          return -1;
        };
        const next = () => {
          const drops = ops.filter(o => o.kind === 'drop').length;
          if (drops < R.int(10, 18) && !(drops > 6 && R() < 0.3)) {
            // marblers drop ink again and again on the same spot, which is what makes the rings
            const last = ops.filter(o => o.kind === 'drop').pop(), same = last && R() < 0.65;
            return { kind: 'drop', x: same ? last.x : R.range(0.15, 0.85) * n, y: same ? last.y : R.range(0.15, 0.85) * n, r: 0, target: n * R.range(0.08, 0.16), ink: ops.length % inks, nx: 0, ny: 0, a: 0, l: 1 };
          }
          const a = R.pick([0, Math.PI / 2, R.range(0, Math.PI)]);
          const tx = R.range(0.3, 0.7) * n, ty = R.range(0.3, 0.7) * n, tt = n * R.range(0.15, 0.35) * R.sign();
          return { kind: 'tine', x: tx, y: ty, r: 0, target: tt, ink: -1, nx: Math.cos(a), ny: Math.sin(a), a: 0, l: n * R.range(0.04, 0.1) };
        };
        reset();
        return (t, dt) => {
          const was = cur, opsN = ops.length, g0 = gen; for (const tp of g.input.taps()) { if (ops.length > 40) ops.splice(0, ops.length - 40); const o = { kind: 'drop', x: tp.x * n, y: tp.y * n, r: 0, target: n * g.alt.range(0.06, 0.12), ink: ops.length % inks, nx: 0, ny: 0, a: 0, l: 1 }; if (cur) { cur.r = cur.target; cur.a = cur.target; } ops.push(o); cur = o; hold = 0; }
          if (hold > 0) { if ((hold -= dt) <= 0) { diss.start(d); reset(); } }
          else if (!cur) { if ((timer += dt) > 0.15) { timer = 0; if (ops.length > 28) hold = 3; else { cur = next(); ops.push(cur); } } }
          else if (cur.kind === 'drop') { cur.r = Math.min(cur.target, cur.r + cur.target * dt * 2.2); if (cur.r >= cur.target) cur = null; }
          else { cur.a += (cur.target - cur.a) * dt * 2.5; if (Math.abs(cur.target - cur.a) < 0.3) { cur.a = cur.target; cur = null; } }
          const dirty = cur || was || gen !== g0 || ops.length !== opsN || lastKey < 0;
          if (!dirty) d.set(cache);
          else for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const k = inkAt(x + 0.5, y + 0.5);
            d[y * n + x] = k < 0 ? ground : lut[((k * 256 / inks) + 20) & 255];
          }
          if (dirty) { lastKey = 1; cache.set(d); }
          diss.apply(d, dt);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g;
      let lut, ops, ground, timer, cur, hold, inks, gen = 0, lastKey = -1; const diss = dissolver(n), cache = new Uint32Array(n * n);   // the bath is only redrawn when it changes
      const reset = () => {
        gen++; lut = boldN(R, g); inks = R.int(3, 5); const gh = R.range(0, 100); ground = pale ? X.hsbPk(gh, 14, 90) : X.hsbPk(gh, 40, 14); ops = []; timer = 0; cur = null; hold = 0; fk = 0;
        g.trait('Inks', inks);
        for (let k = 0; k < R.int(3, 5); k++) { const o = next(); o.r = o.target; ops.push(o); }   // the bath starts with a few drops already down
      };
      // how the marbler works this bath, and whether the bath is dark or pale
      const A = g.alt, pattern = g.trait('Pattern', A() < 0.45 ? 'Stone' : A() < 0.35 ? 'Bullseye' : A() < 0.6 ? 'Feathered' : 'Scattered'), pale = g.trait('Bath', A() < 0.7 ? 'Dark' : 'Pale') === 'Pale', fa = A() < 0.5 ? 0 : Math.PI / 2;
      let fk = 0;
      // where a point on the bath now came from, undoing the operations newest first; returns ink index or -1
      const inkAt = (px, py) => {
        for (let k = ops.length - 1; k >= 0; k--) {
          const o = ops[k];
          if (o.kind === 'drop') {
            const dx = px - o.x, dy = py - o.y, r2 = dx * dx + dy * dy, rr = o.r * o.r;
            if (r2 < rr) return o.ink;
            const s = Math.sqrt(1 - rr / r2); px = o.x + dx * s; py = o.y + dy * s;
          } else {
            const dist = Math.abs((px - o.x) * o.ny - (py - o.y) * o.nx), z = o.a * o.l / (dist + o.l);
            px -= o.nx * z; py -= o.ny * z;
          }
        }
        return -1;
      };
      const next = () => {
        const drops = ops.filter(o => o.kind === 'drop').length;
        if (drops < R.int(10, 18) && !(drops > 6 && R() < 0.3)) {
          // marblers drop ink again and again on the same spot, which is what makes the rings
          const last = ops.filter(o => o.kind === 'drop').pop(), same = last && (pattern === 'Bullseye' || (pattern !== 'Scattered' && R() < 0.65));
          return { kind: 'drop', x: same ? last.x : R.range(0.15, 0.85) * n, y: same ? last.y : R.range(0.15, 0.85) * n, r: 0, target: n * R.range(0.08, 0.16) * (pattern === 'Scattered' ? 0.6 : 1), ink: ops.length % inks, nx: 0, ny: 0, a: 0, l: 1 };
        }
        let a = R.pick([0, Math.PI / 2, R.range(0, Math.PI)]);
        let tx = R.range(0.3, 0.7) * n, ty = R.range(0.3, 0.7) * n, tt = n * R.range(0.15, 0.35) * R.sign();
        if (pattern === 'Feathered') {   // a comb: parallel strokes across the whole bath, alternating direction
          const off = (-0.42 + 0.84 * ((fk % 7) / 6)) * n; a = fa; tx = n / 2 - Math.sin(a) * off; ty = n / 2 + Math.cos(a) * off; tt = n * 0.18 * (fk & 1 ? -1 : 1); fk++;
        }
          return { kind: 'tine', x: tx, y: ty, r: 0, target: tt, ink: -1, nx: Math.cos(a), ny: Math.sin(a), a: 0, l: n * R.range(0.04, 0.1) };
      };
      reset();
      return (t, dt) => {
        const was = cur, opsN = ops.length, g0 = gen; for (const tp of g.input.taps()) { if (ops.length > 40) ops.splice(0, ops.length - 40); const o = { kind: 'drop', x: tp.x * n, y: tp.y * n, r: 0, target: n * R.range(0.06, 0.12), ink: ops.length % inks, nx: 0, ny: 0, a: 0, l: 1 }; if (cur) cur.r = cur.target, cur.a = cur.target; ops.push(o); cur = o; hold = 0; }
        if (hold > 0) { if ((hold -= dt) <= 0) { diss.start(d); reset(); } }
        else if (!cur) { if ((timer += dt) > 0.15) { timer = 0; if (ops.length > 28) hold = 3; else { cur = next(); ops.push(cur); } } }
        else if (cur.kind === 'drop') { cur.r = Math.min(cur.target, cur.r + cur.target * dt * 2.2); if (cur.r >= cur.target) cur = null; }
        else { cur.a += (cur.target - cur.a) * dt * 2.5; if (Math.abs(cur.target - cur.a) < 0.3) { cur.a = cur.target; cur = null; } }
        const dirty = cur || was || gen !== g0 || ops.length !== opsN || lastKey < 0;
        if (!dirty) d.set(cache);
        else for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const k = inkAt(x + 0.5, y + 0.5);
          d[y * n + x] = k < 0 ? ground : lut[((k * 256 / inks) + 20) & 255];
        }
        if (dirty) { lastKey = 1; cache.set(d); }
        diss.apply(d, dt);
      };
    },
  });

  add({
    interactive: 'Click to pour a heap of sand for the wind to work on.',
    listens: 'The room is the wind: the louder it is, the more sand moves.',
    name: 'Dune Field', seed: 4, sizes: [50, 80], fps: 12,
    recipe: 'Sand moved by wind, one slab at a time: the wind lifts slabs and drops them downwind, sand sticks more easily on sand, the lee of every crest is sheltered, and steep faces avalanche. Out of that, rows of dunes form and march across the frame.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), h = new Int16Array(n * n), L = R.int(3, 6), ps = 0.6, pb = 0.4, shadow = 0.27, per = n * n * R.range(0.25, 0.4), bands = R.int(2, 4);
        g.trait('Sand', 'Neon bands'); g.trait('Wind from', 'West'); g.trait('Grain', n === 50 ? 'Coarse' : 'Fine'); g.trait('Wind', L === 3 ? 'Light' : L === 6 ? 'Strong' : 'Brisk'); g.trait('Contours', bands);
        for (let i = 0; i < n * n; i++) h[i] = R.int(3, 4) + Math.round(1.4 + 1.4 * Math.sin(TAU * (i % n) / (n / 5) + 1.4 * Math.sin(TAU * (i / n | 0) / n * 2)));
        const at = (x, y) => mod(y, n) * n + mod(x, n);
        const inShadow = (x, y) => { const hh = h[at(x, y)]; for (let k = 1; k < 10; k++) if (h[at(x - k, y)] - k * shadow > hh + 0.5) return true; return false; };
        const slide = (x, y) => {   // avalanche: a slab rolls off any face steeper than two slabs a cell
          for (let s = 0; s < 8; s++) {
            let best = -1, drop = 2; const hh = h[at(x, y)];
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const dd = hh - h[at(x + dx, y + dy)]; if (dd > drop) { drop = dd; best = dx * 3 + dy; } }
            if (best < 0) return;
            const dx = best === 3 ? 1 : best === -3 ? -1 : 0, dy = best === 1 ? 1 : best === -1 ? -1 : 0;
            h[at(x, y)]--; x += dx; y += dy; h[at(x, y)]++;
          }
        };
        const sm = new Float32Array(n * n); let gust = 1, heard = 0;
        const blow = () => {
          for (let k = 0; k < per * gust; k++) {
            let x = R.int(0, n - 1), y = R.int(0, n - 1);
            if (!h[at(x, y)] || inShadow(x, y)) continue;
            h[at(x, y)]--; slide(x, y);
            for (let hop = 0; hop < 40; hop++) {
              x += L;
              if (inShadow(x, y) || R() < (h[at(x, y)] ? ps : pb)) break;
            }
            h[at(x, y)]++; slide(x, y);
          }
        };
        for (let k = 0; k < 50; k++) blow();
        return t => {
          for (const tp of g.input.taps()) { const cx = tp.x * n | 0, cy = tp.y * n | 0, r = Math.max(2, n / 12 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) h[at(cx + x, cy + y)] += Math.round(4 * (1 - Math.hypot(x, y) / (r + 1))) + 1; }
          if (g.input.listening) { heard += (g.input.level - heard) * 0.3; gust = 1 + Math.min(1, heard * 1.3); } else { heard = 0; gust = 1; }
          blow();
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += h[at(x + dx, y + dy)]; sm[y * n + x] = s / 9; }
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const i = y * n + x, lee = sm[i] < sm[at(x - 1, y)] - 0.25, c = lut[((Math.floor(sm[i] * 2) / 2 * 256 / (bands * 8)) | 0) & 255];
            d[i] = lee ? dimPk(c, 0.6) : c;
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, lut0 = boldN(R, g), h = new Int16Array(n * n), L = R.int(3, 6), ps = 0.6, pb = 0.4, shadow = 0.27, per = n * n * R.range(0.25, 0.4), bands = R.int(2, 4);
      // the colour of the sand and the side the wind comes from
      const A = g.alt, sand = g.trait('Sand', A() < 0.45 ? 'Neon bands' : A() < 0.45 ? 'Desert' : A() < 0.5 ? 'Moonlit' : A() < 0.6 ? 'Ash' : 'Rose'), from = g.trait('Wind from', A() < 0.5 ? 'West' : A() < 0.35 ? 'East' : A() < 0.5 ? 'North' : 'South');
      g.trait('Wind', L === 3 ? 'Light' : L === 6 ? 'Strong' : 'Brisk'); g.trait('Contours', bands); g.trait('Grain', n === 50 ? 'Coarse' : 'Fine'); if (sand !== 'Neon bands') g.trait('Palette', sand);
      const SANDS = { Desert: ['#f7e2b0', '#ecc887', '#dba962', '#c78a45', '#dba962', '#ecc887'], Moonlit: ['#c4cff0', '#9aa9dc', '#7383c0', '#5363a0', '#7383c0', '#9aa9dc'], Ash: ['#efebe4', '#d4cfc6', '#b5afa6', '#958f87', '#b5afa6', '#d4cfc6'], Rose: ['#ffe0e8', '#f7b9cb', '#e890ad', '#d06a8e', '#e890ad', '#f7b9cb'] };
      const lut = sand === 'Neon bands' ? lut0 : U.lut(SANDS[sand].map(U.hex), true), tmpD = new Uint32Array(n * n);
      for (let i = 0; i < n * n; i++) h[i] = R.int(3, 4) + Math.round(1.4 + 1.4 * Math.sin(TAU * (i % n) / (n / 5) + 1.4 * Math.sin(TAU * (i / n | 0) / n * 2)));
      const at = (x, y) => mod(y, n) * n + mod(x, n);
      const inShadow = (x, y) => { const hh = h[at(x, y)]; for (let k = 1; k < 10; k++) if (h[at(x - k, y)] - k * shadow > hh + 0.5) return true; return false; };
      const slide = (x, y) => {   // avalanche: a slab rolls off any face steeper than two slabs a cell
        for (let s = 0; s < 8; s++) {
          let best = -1, drop = 2; const hh = h[at(x, y)];
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const dd = hh - h[at(x + dx, y + dy)]; if (dd > drop) { drop = dd; best = dx * 3 + dy; } }
          if (best < 0) return;
          const dx = best === 3 ? 1 : best === -3 ? -1 : 0, dy = best === 1 ? 1 : best === -1 ? -1 : 0;
          h[at(x, y)]--; x += dx; y += dy; h[at(x, y)]++;
        }
      };
      const sm = new Float32Array(n * n); let gust = 1, heard = 0;
      const blow = () => {
        for (let k = 0; k < per * gust; k++) {
          let x = R.int(0, n - 1), y = R.int(0, n - 1);
          if (!h[at(x, y)] || inShadow(x, y)) continue;
          h[at(x, y)]--; slide(x, y);
          for (let hop = 0; hop < 40; hop++) {
            x += L;
            if (inShadow(x, y) || R() < (h[at(x, y)] ? ps : pb)) break;
          }
          h[at(x, y)]++; slide(x, y);
        }
      };
      for (let k = 0; k < 50; k++) blow();
      return t => {
        for (const tp of g.input.taps()) { const cx = tp.x * n | 0, cy = tp.y * n | 0, r = Math.max(2, n / 12 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) h[at(cx + x, cy + y)] += Math.round(4 * (1 - Math.hypot(x, y) / (r + 1))) + 1; }
        if (g.input.listening) { heard += (g.input.level - heard) * 0.3; gust = 1 + Math.min(1, heard * 1.3); } else { heard = 0; gust = 1; }
        blow();
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += h[at(x + dx, y + dy)]; sm[y * n + x] = s / 9; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, lee = sm[i] < sm[at(x - 1, y)] - 0.25, c = lut[((Math.floor(sm[i] * 2) / 2 * 256 / (bands * 8)) | 0) & 255];
          d[i] = lee ? dimPk(c, sand === 'Neon bands' ? 0.6 : 0.86) : c;
        }
        if (from !== 'West') { tmpD.set(d); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = from === 'East' ? tmpD[y * n + n - 1 - x] : from === 'North' ? tmpD[x * n + y] : tmpD[(n - 1 - x) * n + y]; }
      };
    },
  });

  add({
    interactive: 'Click to lay down fresh blocks of dye.',
    name: 'Sine Flow', seed: 5, sizes: [50, 80, 100], fps: 12,
    recipe: 'Blocks of coloured dye are stirred by the simplest chaotic flow: the fluid shears sideways in a sine wave, then up and down in another, turn and turn about. Each stroke stretches and folds the dye, and within seconds it is drawn out into fine marbled filaments.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), A = R.range(0.6, 1.2) * n / 50, half = R.range(1, 1.8), blocks = R.pick([2, 3, 4]);
        g.trait('Dye', blocks + ' x ' + blocks + ' blocks'); g.trait('Edges', 'Plain'); g.trait('Ink', 'Bold');
        const mx = new Float32Array(n * n), my = new Float32Array(n * n), nx2 = new Float32Array(n * n), ny2 = new Float32Array(n * n), diss = dissolver(n);
        let p1, p2, age;
        const reset = (Q = R) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { mx[y * n + x] = x; my[y * n + x] = y; } p1 = Q.range(0, TAU); p2 = Q.range(0, TAU); age = 0; };
        reset();
        const colourAt = (x, y) => { const bx = Math.floor(mod(x, n) / n * blocks), by = Math.floor(mod(y, n) / n * blocks); return lut[(((bx + by * blocks) * 256 / (blocks * blocks)) + ((bx + by) & 1) * 30) & 255]; };
        return (t, dt) => {
          age += dt;
          if (age > 22) { diss.start(d); reset(); }
          if (g.input.taps().length) reset(g.alt);
          const phaseB = Math.floor(age / half) & 1, k = A * 0.25;
          // compose the backward map: each cell remembers where its fluid started
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const sx = phaseB ? x : x - k * Math.sin(TAU * y / n + p1), sy = phaseB ? y - k * Math.sin(TAU * x / n + p2) : y;
            const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0, a = mod(y0, n) * n + mod(x0, n), b = mod(y0, n) * n + mod(x0 + 1, n), c = mod(y0 + 1, n) * n + mod(x0, n), e = mod(y0 + 1, n) * n + mod(x0 + 1, n);
            const ax = mx[a], bxx = mx[b] + (mx[b] - mx[a] > n / 2 ? -n : mx[b] - mx[a] < -n / 2 ? n : 0), cx = mx[c] + (mx[c] - mx[a] > n / 2 ? -n : mx[c] - mx[a] < -n / 2 ? n : 0), ex = mx[e] + (mx[e] - mx[a] > n / 2 ? -n : mx[e] - mx[a] < -n / 2 ? n : 0);
            const ay = my[a], byy = my[b] + (my[b] - my[a] > n / 2 ? -n : my[b] - my[a] < -n / 2 ? n : 0), cy = my[c] + (my[c] - my[a] > n / 2 ? -n : my[c] - my[a] < -n / 2 ? n : 0), ey = my[e] + (my[e] - my[a] > n / 2 ? -n : my[e] - my[a] < -n / 2 ? n : 0);
            nx2[y * n + x] = mod((ax * (1 - fx) + bxx * fx) * (1 - fy) + (cx * (1 - fx) + ex * fx) * fy, n);
            ny2[y * n + x] = mod((ay * (1 - fx) + byy * fx) * (1 - fy) + (cy * (1 - fx) + ey * fx) * fy, n);
          }
          mx.set(nx2); my.set(ny2);
          for (let i = 0; i < n * n; i++) d[i] = colourAt(mx[i], my[i]);
          diss.apply(d, dt);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, lut0 = boldN(R, g), A = R.range(0.5, 1.5) * n / 50, half = R.range(0.8, 2), blocks = R.pick([2, 3, 4, 5, 6]), lay = R.pick(['blocks', 'blocks', 'stripes', 'checker', 'rings']);
      // outlined dye edges and a softer ink are this variation's own
      const Q = g.alt, inked = g.trait('Edges', Q() < 0.65 ? 'Plain' : 'Inked') === 'Inked', ink = g.trait('Ink', Q() < 0.7 ? 'Bold' : Q() < 0.5 ? 'Pastel' : 'Deep');
      const lut = ink === 'Pastel' ? lut0.map(c => glowPk(c, 0.45)) : ink === 'Deep' ? lut0.map(c => dimPk(c, 0.62)) : lut0;
      g.trait('Dye', lay === 'blocks' ? blocks + ' x ' + blocks + ' blocks' : lay === 'stripes' ? blocks + ' stripes' : lay === 'checker' ? 'Checker' : blocks + ' rings');
      const mx = new Float32Array(n * n), my = new Float32Array(n * n), nx2 = new Float32Array(n * n), ny2 = new Float32Array(n * n), diss = dissolver(n);
      let p1, p2, age;
      const reset = () => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { mx[y * n + x] = x; my[y * n + x] = y; } p1 = R.range(0, TAU); p2 = R.range(0, TAU); age = 0; };
      reset();
      const colourAt = (x, y) => {
        const bx = Math.floor(mod(x, n) / n * blocks), by = Math.floor(mod(y, n) / n * blocks);
        if (lay === 'stripes') return lut[((bx * 256 / blocks) + (bx & 1) * 40) & 255];
        if (lay === 'checker') return (bx + by) & 1 ? lut[(bx * 37) & 255] : BLACK;
        if (lay === 'rings') { const r = Math.hypot(mod(x, n) - n / 2, mod(y, n) - n / 2) / (n / 2) * blocks | 0; return r & 1 ? lut[(r * 40) & 255] : BLACK; }
        return lut[(((bx + by * blocks) * 256 / (blocks * blocks)) + ((bx + by) & 1) * 30) & 255];
      };
      return (t, dt) => {
        age += dt;
        if (age > 22) { diss.start(d); reset(); } else if (g.input.taps().length) reset();
        const phaseB = Math.floor(age / half) & 1, k = A * 0.25;
        // compose the backward map: each cell remembers where its fluid started
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const sx = phaseB ? x : x - k * Math.sin(TAU * y / n + p1), sy = phaseB ? y - k * Math.sin(TAU * x / n + p2) : y;
          const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0, a = mod(y0, n) * n + mod(x0, n), b = mod(y0, n) * n + mod(x0 + 1, n), c = mod(y0 + 1, n) * n + mod(x0, n), e = mod(y0 + 1, n) * n + mod(x0 + 1, n);
          const ax = mx[a], bxx = mx[b] + (mx[b] - mx[a] > n / 2 ? -n : mx[b] - mx[a] < -n / 2 ? n : 0), cx = mx[c] + (mx[c] - mx[a] > n / 2 ? -n : mx[c] - mx[a] < -n / 2 ? n : 0), ex = mx[e] + (mx[e] - mx[a] > n / 2 ? -n : mx[e] - mx[a] < -n / 2 ? n : 0);
          const ay = my[a], byy = my[b] + (my[b] - my[a] > n / 2 ? -n : my[b] - my[a] < -n / 2 ? n : 0), cy = my[c] + (my[c] - my[a] > n / 2 ? -n : my[c] - my[a] < -n / 2 ? n : 0), ey = my[e] + (my[e] - my[a] > n / 2 ? -n : my[e] - my[a] < -n / 2 ? n : 0);
          nx2[y * n + x] = mod((ax * (1 - fx) + bxx * fx) * (1 - fy) + (cx * (1 - fx) + ex * fx) * fy, n);
          ny2[y * n + x] = mod((ay * (1 - fx) + byy * fx) * (1 - fy) + (cy * (1 - fx) + ey * fx) * fy, n);
        }
        mx.set(nx2); my.set(ny2);
        for (let i = 0; i < n * n; i++) d[i] = colourAt(mx[i], my[i]);
        if (inked) for (let i = 0; i < n * n - n; i++) if (i % n < n - 1 && (d[i] !== d[i + 1] || d[i] !== d[i + n])) d[i] = BLACK;
        diss.apply(d, dt);
      };
    },
  });

  add({
    interactive: 'Drag the post through the stream.',
    name: 'Karman Street', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'Flow past a post sheds vortices from alternate sides, spinning opposite ways, into two staggered rows that drift downstream: a von Kármán vortex street. The oncoming fluid is striped by height, so the street winds the stripes into a chain of curls.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, lut = boldN(R, g), U0 = n * R.range(0.12, 0.18), D = n * R.range(0.05, 0.08), period = R.range(1.4, 2.2), G = U0 * D * TAU * 0.8, delta = D * 0.5, stripes = R.int(6, 12);
        const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
        fl.reset(); let vs = [], next = 0, side = 1, cx = n * 0.16, cy = n / 2;
        g.trait('Posts', 'One'); g.trait('Post', 'Round'); g.trait('Stripes', stripes); g.trait('Ground', 'Black'); g.trait('View', 'Upright');
        return (t, dt) => {
          if (g.input.down && g.input.inside) { cx += (Math.min(n * 0.8, Math.max(D, g.input.x * n)) - cx) * 0.3; cy += (Math.min(n - D, Math.max(D, g.input.y * n)) - cy) * 0.3; }
          if (t >= next) { vs.push([cx + D, cy + side * D * 0.6, -side * G]); side = -side; next = t + period / 2; }
          const vel = (x, y, skip, out) => { let ux = U0, uy = 0; for (let k = 0; k < vs.length; k++) { if (k === skip) continue; const dx = x - vs[k][0], dy = y - vs[k][1], r2 = dx * dx + dy * dy + delta * delta; ux += -dy * vs[k][2] / (TAU * r2); uy += dx * vs[k][2] / (TAU * r2); } return out ? (out[0] = ux, out[1] = uy, out) : [ux, uy]; };
          const mv = vs.map((p, k) => vel(p[0], p[1], k));
          vs.forEach((p, k) => { p[0] += mv[k][0] * dt; p[1] += mv[k][1] * dt; });
          vs = vs.filter(p => p[0] < n * 1.3);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, -1, tmpv); u[y * n + x] = tmpv[0] * dt; v[y * n + x] = tmpv[1] * dt; }
          fl.step(u, v, false, false);
          for (let i = 0; i < n * n; i++) { const k = Math.floor(fl.y[i] / n * stripes * 2); d[i] = k & 1 ? lut[((k * 255 / (stripes * 2)) + t * 8) & 255] : BLACK; }
          post(g, cx, cy, D);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, O = orient(R, n, d, g.input, ['none', 'none', 'tr', 'fx']), inp = O.input, full = R.bool(0.35), lut = boldN(R, g), U0 = n * R.range(0.1, 0.2), D = n * R.range(0.04, 0.09), period = R.range(1.4, 2.2), G = U0 * D * TAU * 0.8, delta = D * 0.5, stripes = R.int(6, 12);
      const u = new Float32Array(n * n), v = new Float32Array(n * n), fl = flowMap(n), diss = dissolver(n), tmpv = [0, 0];
      fl.reset(); let vs = [], next = 0, side = 1, cx = n * 0.16, cy = n / 2;
      // one post (the original) or two staggered ones, round or square
      const A = g.alt, two = g.trait('Posts', A() < 0.65 ? 'One' : 'Two') === 'Two', square = g.trait('Post', A() < 0.7 ? 'Round' : 'Square') === 'Square';
      g.trait('Stripes', stripes); g.trait('Ground', full ? 'Filled' : 'Black'); g.trait('View', VIEWS[O.m]);
      const posts = two ? [[0, -0.2 * n], [n * 0.07, 0.2 * n]] : [[0, 0]];
      return (t, dt) => {
        if (inp.down && inp.inside) { cx += (Math.min(n * 0.8, Math.max(D, inp.x * n)) - cx) * 0.3; cy += (Math.min(n - D, Math.max(D, inp.y * n)) - cy) * 0.3; }
        if (t >= next) { posts.forEach(([px, py], k) => vs.push([cx + px + D, cy + py + (k ? -side : side) * D * 0.6, -(k ? -side : side) * G])); side = -side; next = t + period / 2; }
        const vel = (x, y, skip, out) => { let ux = U0, uy = 0; for (let k = 0; k < vs.length; k++) { if (k === skip) continue; const dx = x - vs[k][0], dy = y - vs[k][1], r2 = dx * dx + dy * dy + delta * delta; ux += -dy * vs[k][2] / (TAU * r2); uy += dx * vs[k][2] / (TAU * r2); } return out ? (out[0] = ux, out[1] = uy, out) : [ux, uy]; };
        const mv = vs.map((p, k) => vel(p[0], p[1], k));
        vs.forEach((p, k) => { p[0] += mv[k][0] * dt; p[1] += mv[k][1] * dt; });
        vs = vs.filter(p => p[0] < n * 1.3);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { vel(x, y, -1, tmpv); u[y * n + x] = tmpv[0] * dt; v[y * n + x] = tmpv[1] * dt; }
        fl.step(u, v, false, false);
        for (let i = 0; i < n * n; i++) { const k = Math.floor(fl.y[i] / n * stripes * 2); d[i] = k & 1 ? lut[((k * 255 / (stripes * 2)) + t * 8) & 255] : full ? dimPk(lut[((k * 255 / (stripes * 2)) + 128) & 255], 0.5) : BLACK; }
        for (const [px, py] of posts) { if (square) { X.rect(g, Math.round(cx + px - D), Math.round(cy + py - D), Math.round(2 * D), Math.round(2 * D), 0xff383838); X.rect(g, Math.round(cx + px - D), Math.round(cy + py - D), Math.round(2 * D) - 1, Math.round(2 * D) - 1, 0xff686868); X.rect(g, Math.round(cx + px - D), Math.round(cy + py - D), Math.round(2 * D) - 1, 1, 0xff9a9a9a); } else post(g, cx + px, cy + py, D); }
        O.apply();
      };
    },
  });

  add({
    interactive: 'Click to open a new spring in the rock.',
    name: 'Seep', seed: 3, sizes: [50, 80, 100], fps: 12, prewarm: 24,
    recipe: 'Fluid forces its way down through rock with pores of random sizes, always breaking into the easiest pore on its edge next. It advances in fingers and sudden bursts, coloured by when each pore was reached, until it breaks through at the bottom.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, th = new Float32Array(N), when = new Int32Array(N), inQ = new Uint8Array(N), heap = [], diss = dissolver(n);
        let lut, count, hold, rock;
        const push = i => { heap.push(i); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (th[heap[p]] <= th[i]) break; heap[k] = heap[p]; k = p; } heap[k] = i; };
        const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { let k = 0; for (;;) { let c = 2 * k + 1; if (c >= heap.length) break; if (c + 1 < heap.length && th[heap[c + 1]] < th[heap[c]]) c++; if (th[heap[c]] >= th[last]) break; heap[k] = heap[c]; k = c; } heap[k] = last; } return top; };
        const reset = () => { lut = boldN(R, g); rock = X.hsbPk(R.range(0, 100), 30, 16); for (let i = 0; i < N; i++) th[i] = R(); when.fill(-1); inQ.fill(0); heap.length = 0; for (let x = 0; x < n; x++) { inQ[x] = 1; push(x); } count = 0; hold = 0; };
        reset(); g.trait('Source', 'Top edge'); g.trait('Rock', 'Even'); g.trait('Grain', n === 50 ? 'Coarse' : n === 80 ? 'Medium' : 'Fine');
        const per = Math.max(2, Math.round(N / 180));
        return (t, dt) => {
          for (const tp of g.input.taps()) { const i = Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0); if (!inQ[i]) { inQ[i] = 1; th[i] = -1; push(i); } }
          if (hold > 0) { if ((hold -= dt) <= 0) { diss.start(d); reset(); } }
          else for (let s = 0; s < per && heap.length; s++) {
            const i = pop(); when[i] = count++;
            if (i >= N - n) { hold = 3.5; break; }
            const x = i % n;
            for (const j of [i - n, i + n, x > 0 ? i - 1 : -1, x < n - 1 ? i + 1 : -1]) if (j >= 0 && j < N && !inQ[j]) { inQ[j] = 1; push(j); }
          }
          const span = Math.max(1, count);
          for (let i = 0; i < N; i++) d[i] = when[i] < 0 ? rock : lut[(when[i] * 255 / span) | 0];
          diss.apply(d, dt);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, N = n * n, th = new Float32Array(N), when = new Int32Array(N), inQ = new Uint8Array(N), heap = [], diss = dissolver(n);
      let lut, count, hold, rock;
      const push = i => { heap.push(i); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (th[heap[p]] <= th[i]) break; heap[k] = heap[p]; k = p; } heap[k] = i; };
      const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { let k = 0; for (;;) { let c = 2 * k + 1; if (c >= heap.length) break; if (c + 1 < heap.length && th[heap[c + 1]] < th[heap[c]]) c++; if (th[heap[c]] >= th[last]) break; heap[k] = heap[c]; k = c; } heap[k] = last; } return top; };
      // where the fluid comes in, and the grain of the rock it breaks through
      const A = g.alt, source = g.trait('Source', A() < 0.45 ? 'Top edge' : A() < 0.35 ? 'Left edge' : A() < 0.6 ? 'Spring' : 'Two springs'), rockKind = g.trait('Rock', A() < 0.45 ? 'Even' : A() < 0.55 ? 'Layered' : 'Cracked');
      g.trait('Grain', n === 50 ? 'Coarse' : n === 80 ? 'Medium' : 'Fine');
      const seed = i => { if (!inQ[i]) { inQ[i] = 1; push(i); } };
      const done = i => { const x = i % n, y = (i / n) | 0; return source === 'Top edge' ? y === n - 1 : source === 'Left edge' ? x === n - 1 : (x === 0 || y === 0 || x === n - 1 || y === n - 1); };
      const reset = () => {
        lut = boldN(R, g); rock = X.hsbPk(R.range(0, 100), 30, 16); for (let i = 0; i < N; i++) th[i] = R(); when.fill(-1); inQ.fill(0); heap.length = 0;
        if (rockKind === 'Layered') { const ph = A() * 6, f = (3 + A() * 4) * Math.PI * 2 / n; for (let i = 0; i < N; i++) { const y = (i / n) | 0, x = i % n; th[i] = th[i] * 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(y * f + Math.sin(x * 0.07 + ph) * 1.5)); } }
        if (rockKind === 'Cracked') for (let k = 0; k < 5 + (A() * 4 | 0); k++) X.line({ n, d: th }, A() * n, A() * n, A() * n, A() * n, (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) th[y * n + x] *= 0.15; });
        if (source === 'Top edge') for (let x = 0; x < n; x++) seed(x);
        else if (source === 'Left edge') for (let y = 0; y < n; y++) seed(y * n);
        else if (source === 'Spring') seed((n >> 1) * n + (n >> 1));
        else { seed(((n * (0.25 + A() * 0.15)) | 0) * n + ((n * (0.2 + A() * 0.2)) | 0)); seed(((n * (0.6 + A() * 0.15)) | 0) * n + ((n * (0.6 + A() * 0.2)) | 0)); }
        count = 0; hold = 0;
      };
      reset();
      const per = Math.max(2, Math.round(N / 180));
      return (t, dt) => {
        for (const tp of g.input.taps()) { const i = Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0); if (!inQ[i]) { inQ[i] = 1; th[i] = -1; push(i); } }
        if (hold > 0) { if ((hold -= dt) <= 0) { diss.start(d); reset(); } }
        else for (let s = 0; s < per && heap.length; s++) {
          const i = pop(); when[i] = count++;
          if (done(i)) { hold = 3.5; break; }
          const x = i % n;
          for (const j of [i - n, i + n, x > 0 ? i - 1 : -1, x < n - 1 ? i + 1 : -1]) if (j >= 0 && j < N && !inQ[j]) { inQ[j] = 1; push(j); }
        }
        const span = Math.max(1, count);
        for (let i = 0; i < N; i++) d[i] = when[i] < 0 ? (rockKind === 'Even' ? rock : X.mixPk(rock, 0xff000000, Math.min(1, th[i]) * 0.5)) : lut[(when[i] * 255 / span) | 0];
        diss.apply(d, dt);
      };
    },
  });

  add({
    name: 'Unmixing', seed: 5, sizes: [50, 80, 100], fps: 12,
    recipe: 'Blobs of dye sit in thick syrup between two cylinders. The inner one turns, and the shear smears the blobs into thin rings that seem hopelessly mixed; then it turns back exactly as far, and because syrup flow runs backwards just as well, every blob reassembles.',
    make(R, U, g) {
      const { n, d } = g, lut = bold(R), c = (n - 1) / 2, r1 = n * R.range(0.08, 0.16), r2 = n * 0.48, S = R.range(8, 16) * Math.PI, per = R.range(16, 22), wall = 0xff505050;
      const blobs = Array.from({ length: R.int(3, 5) }, (_, k) => ({ r: R.range(r1 + n * 0.08, r2 - n * 0.08), a: k / 5 * TAU + R.range(0, 1), s: n * R.range(0.08, 0.14), c: lut[(k * 51 + R.int(0, 30)) & 255] })), syrup = X.hsbPk(R.range(0, 100), 70, 22);
      return t => {
        const ph = (t % per) / per, turn = S * (ph < 0.45 ? ph / 0.45 : ph < 0.55 ? 1 : (1 - ph) / 0.45);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - c, dy = y - c, r = Math.hypot(dx, dy), i = y * n + x;
          if (r < r1 - 1 || r > r2 + 1) { d[i] = BLACK; continue; }
          if (r < r1 || r > r2) { d[i] = wall; continue; }
          const a = Math.atan2(dy, dx) - turn * (r2 - r) / (r2 - r1);   // the inner wall turns, the outer stands still
          let col = syrup;
          for (const b of blobs) { const bx = Math.cos(b.a) * b.r, by = Math.sin(b.a) * b.r, px = Math.cos(a) * r, py = Math.sin(a) * r; if ((px - bx) ** 2 + (py - by) ** 2 < b.s * b.s) { col = b.c; break; } }
          d[i] = col;
        }
      };
    },
  });

  add({
    interactive: 'Move across to slide the vent; hold to turn up the heat.',
    listens: 'It roars with the room; a clap throws up a puff.',
    name: 'Plume', seed: 1, sizes: [50, 80, 100], fps: 12, prewarm: 36,
    recipe: 'A jet of hot gas rises from a vent: each parcel is lifted by its own heat and kicked by a slowly turning swirl, so the column wavers, breaks into eddies and spreads out at the top. Parcels cool from white to deep colour as they climb, and leave fading trails.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, nz = U.noise(R).n2, lut = boldN(R, g), vent0 = n * R.range(0.3, 0.7), M = Math.round(n * 9), buf = new Float32Array(n * n * 3), wind = R.range(-0.3, 0.3);
        let vent = vent0, heard = 0, puff = 0;
        g.trait('Vents', 'One'); g.trait('Vent', vent0 < n * 0.43 ? 'Left' : vent0 > n * 0.57 ? 'Right' : 'Middle'); g.trait('Wind', wind < -0.1 ? 'From the right' : wind > 0.1 ? 'From the left' : 'Still'); g.trait('Trails', 'Long'); g.trait('Core', 'White hot');
        const ps = Array.from({ length: M }, () => ({ x: vent0, y: n, vx: 0, vy: 0, age: R.range(0, 6) }));
        const ramp = Array.from({ length: 64 }, (_, k) => { const c = k < 6 ? WHITE : lut[((k - 6) * 4) & 255]; return [c & 255, c >> 8 & 255, c >> 16 & 255]; });
        return (t, dt) => {
          if (g.input.inside) vent += (g.input.x * n - vent) * 0.2;
          if (g.input.listening) { heard += (g.input.level - heard) * 0.3; puff = Math.min(1.5, puff * 0.8 + g.input.beats() * 0.9); } else { heard = 0; puff = 0; }
          const boost = (g.input.down && g.input.inside ? 1.6 : 1) * (1 + heard * 1.2);
          for (let i = 0; i < buf.length; i++) buf[i] *= 0.86;
          for (const p of ps) {
            p.age += dt;
            if (p.y < -2 || p.age > 6) { p.x = vent + R.range(-1.5, 1.5) * (1 + puff * 4); p.y = n - 1; p.vx = R.range(-0.2, 0.2); p.vy = -R.range(0.8, 1.4) * n / 50 * boost; p.age = 0; }
            const sw = n * 0.015, a = nz(p.x * 0.04, p.y * 0.04 + t * 0.3) * TAU * 2;
            p.vx += (Math.cos(a) * sw * 0.1 + wind * 0.02) * (1 + p.age); p.vy += Math.sin(a) * sw * 0.05 + 0.02;
            p.vx *= 0.92; p.vy *= 0.985;
            p.x += p.vx; p.y += p.vy;
            const x = Math.round(p.x), y = Math.round(p.y); if (x < 0 || y < 0 || x >= n || y >= n) continue;
            const c = ramp[Math.min(63, (p.age * 12) | 0)], k = (y * n + x) * 3;
            buf[k] = Math.max(buf[k], c[0]); buf[k + 1] = Math.max(buf[k + 1], c[1]); buf[k + 2] = Math.max(buf[k + 2], c[2]);
          }
          for (let i = 0; i < n * n; i++) d[i] = (0xff000000 | (buf[i * 3 + 2] | 0) << 16 | (buf[i * 3 + 1] | 0) << 8 | (buf[i * 3] | 0)) >>> 0;
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, nz = U.noise(R).n2, lut = boldN(R, g), vent0 = n * R.range(0.3, 0.7), M = Math.round(n * 9), buf = new Float32Array(n * n * 3), wind = R.range(-0.3, 0.3);
      const ps = Array.from({ length: M }, () => ({ x: vent0, y: n, vx: 0, vy: 0, age: R.range(0, 6) }));
      // one vent or two, how long the trails hang, and whether the core burns white
      const A = g.alt, two = g.trait('Vents', A() < 0.65 ? 'One' : 'Two') === 'Two', trails = g.trait('Trails', A() < 0.5 ? 'Long' : A() < 0.5 ? 'Short' : 'Lingering'), white = g.trait('Core', A() < 0.65 ? 'White hot' : 'Coloured') === 'White hot';
      const decay = trails === 'Short' ? 0.74 : trails === 'Lingering' ? 0.92 : 0.86, gap = (vent0 < n / 2 ? 1 : -1) * n * 0.32;
      g.trait('Vent', two ? 'Pair' : vent0 < n * 0.43 ? 'Left' : vent0 > n * 0.57 ? 'Right' : 'Middle'); g.trait('Wind', wind < -0.1 ? 'From the right' : wind > 0.1 ? 'From the left' : 'Still');
      const ramp = Array.from({ length: 64 }, (_, k) => { const c = k < 6 && white ? WHITE : lut[((Math.max(0, k - (white ? 6 : 0))) * 4) & 255]; return [c & 255, c >> 8 & 255, c >> 16 & 255]; });
      let vent = vent0, heard = 0, puff = 0, pi = 0;
      return (t, dt) => {
        if (g.input.inside) vent += (g.input.x * n - vent) * 0.2;
        if (g.input.listening) { heard += (g.input.level - heard) * 0.3; puff = Math.min(1.5, puff * 0.8 + g.input.beats() * 0.9); } else { heard = 0; puff = 0; }
          const boost = (g.input.down && g.input.inside ? 1.6 : 1) * (1 + heard * 1.2);
        for (let i = 0; i < buf.length; i++) buf[i] *= decay;
        for (const p of ps) {
          p.age += dt;
          if (p.y < -2 || p.age > 6) { p.x = vent + (two && (pi++ & 1) ? gap : 0) + R.range(-1.5, 1.5) * (1 + puff * 4); p.y = n - 1; p.vx = R.range(-0.2, 0.2); p.vy = -R.range(0.8, 1.4) * n / 50 * boost; p.age = 0; }
          const sw = n * 0.015, a = nz(p.x * 0.04, p.y * 0.04 + t * 0.3) * TAU * 2;
          p.vx += (Math.cos(a) * sw * 0.1 + wind * 0.02) * (1 + p.age); p.vy += Math.sin(a) * sw * 0.05 + 0.02;
          p.vx *= 0.92; p.vy *= 0.985;
          p.x += p.vx; p.y += p.vy;
          const x = Math.round(p.x), y = Math.round(p.y); if (x < 0 || y < 0 || x >= n || y >= n) continue;
          const c = ramp[Math.min(63, (p.age * 12) | 0)], k = (y * n + x) * 3;
          buf[k] = Math.max(buf[k], c[0]); buf[k + 1] = Math.max(buf[k + 1], c[1]); buf[k + 2] = Math.max(buf[k + 2], c[2]);
        }
        for (let i = 0; i < n * n; i++) d[i] = (0xff000000 | (buf[i * 3 + 2] | 0) << 16 | (buf[i * 3 + 1] | 0) << 8 | (buf[i * 3] | 0)) >>> 0;
      };
    },
  });
})();
