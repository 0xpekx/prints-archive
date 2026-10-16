// Set 5 · Particle Life: colour is the species and the rules make the picture.
// Attraction tables, segregation, opinion, crystal order, flocking headings,
// a demon at a gate and contagion: each piece is particles or cells obeying
// one local law, drawn straight into the cell grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Particle Life' }, def));
  const mod = (a, m) => ((a % m) + m) % m;
  // ---- trait names: words for the colours a variation already rolled (no new draws) ----
  const HUES = ['Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Jade', 'Teal', 'Cyan', 'Azure', 'Blue', 'Indigo', 'Violet', 'Purple', 'Magenta', 'Rose'];
  const hueWord = c => {
    const [r, gg, b] = typeof c === 'number' ? [c & 255, c >> 8 & 255, c >> 16 & 255] : c, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), dd = mx - mn;
    if (dd < 0.2 * mx || mx < 40) return mx > 190 ? 'White' : mx < 70 ? 'Black' : 'Grey';
    let h = mx === r ? (gg - b) / dd : mx === gg ? 2 + (b - r) / dd : 4 + (r - gg) / dd; h = (h / 6 + 1) % 1;
    return HUES[Math.round(h * 16) % 16];
  };
  const palName = cols => {
    const pk = cols.map(c => typeof c === 'number' ? c >>> 0 : U.pk(c));
    for (const p of U.PALETTES) if (p.cols.length === pk.length && p.cols.every(c => pk.includes(U.pk(c)))) return p.name;
    const words = [...new Set(pk.map(hueWord).filter(w => w !== 'Black'))];
    return words.length >= 7 ? 'Rainbow' : words.length >= 4 ? words[0] + ' to ' + words[words.length - 1] : words.length ? words.slice(0, 2).join(' and ') : 'Black';
  };
  const schemeName = sc => sc.native ? palName(sc.cols) : sc.name;
  // a lookup table's name: one of the collection's palettes if its stops are in it, else by its hues
  const near = (v, c) => Math.abs((v & 255) - c[0]) + Math.abs((v >> 8 & 255) - c[1]) + Math.abs((v >> 16 & 255) - c[2]) < 12;
  const lutName = lut => {
    for (const p of U.PALETTES) if (p.cols.every((c, k) => near(lut[Math.round(k * 256 / p.cols.length) & 255], c))) return p.name;
    const nm = palName([0, 32, 64, 96, 128, 160, 192, 224].map(i => lut[i])), c = lut[0];
    return nm === 'Rainbow' && Math.min(c & 255, c >> 8 & 255, c >> 16 & 255) < 3 ? 'Neon rainbow' : nm;
  };
  const few = (v, a, b, w) => v < a ? w[0] : v < b ? w[1] : w[2];
  // how many separate white blocks a lattice-gas box has (counted from its wall cells)
  let BLK = () => 0;
  const wrap = (v, n) => v > n / 2 ? v - n : v < -n / 2 ? v + n : v;

  // A torus bucket grid for neighbour searches within `cell`.
  function buckets(n, cell, N) {
    const G = Math.max(1, Math.floor(n / cell)), head = new Int32Array(G * G), next = new Int32Array(N), sz = n / G;
    return {
      G, head, next,
      build(px, py, count = N) { head.fill(-1); for (let i = 0; i < count; i++) { const c = (Math.floor(py[i] / sz) % G) * G + Math.floor(px[i] / sz) % G; next[i] = head[c]; head[c] = i; } },
      // fn(j) for every particle in the 3 x 3 buckets round (x, y)
      near(x, y, fn) {
        const cx = Math.floor(x / sz), cy = Math.floor(y / sz);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          let j = head[mod(cy + dy, G) * G + mod(cx + dx, G)];
          while (j >= 0) { fn(j); j = next[j]; }
          if (G < 3) return;
        }
      },
    };
  }
  // k well-separated species colours
  const species = (R, k) => { const o = R.range(0, 100), s = R.bool(0.3) ? 100 : 88; return Array.from({ length: k }, (_, i) => U.pk(U.hsb(o + 100 * i / k, s, 96))); };
  // Listen: the room's loudness, smoothed, and the claps or beats heard this frame
  // (both 0 while nobody listens, so a piece runs exactly as before)
  const room = inp => {
    const o = { lvl: 0, beats: 0, on: false };
    o.read = () => { o.on = inp.listening; if (!o.on) { o.lvl = 0; o.beats = 0; return o; } o.lvl += (inp.level - o.lvl) * 0.3; o.beats = inp.beats(); return o; };
    return o;
  };
  // one step of particle life (the attraction table A between types), with the
  // neighbour search inlined: the same law, no closure per particle per frame
  function lifeStep(n, N, rr, beta, fric, A, B, px, py, vx, vy, ty, inp) {
    const G = B.G, sz = n / G, head = B.head, next = B.next, half = n / 2, rr2 = rr * rr, k = 0.045 * rr / 10, small = G < 3;
    return () => {
      B.build(px, py);
      const pull = inp.down && inp.inside, mx = inp.x * n, my = inp.y * n;
      for (let i = 0; i < N; i++) {
        let fx = 0, fy = 0;
        const ai = A[ty[i]], x = px[i], y = py[i], cx = Math.floor(x / sz), cy = Math.floor(y / sz);
        for (let by = -1; by <= 1; by++) for (let bx = -1; bx <= 1; bx++) {
          let j = head[mod(cy + by, G) * G + mod(cx + bx, G)];
          while (j >= 0) {
            if (j !== i) {
              let dx = px[j] - x, dy = py[j] - y;
              if (dx > half) dx -= n; else if (dx < -half) dx += n;
              if (dy > half) dy -= n; else if (dy < -half) dy += n;
              const r2 = dx * dx + dy * dy;
              if (r2 > 0 && r2 < rr2) {
                const r = Math.sqrt(r2), q = r / rr, f = q < beta ? q / beta - 1 : ai[ty[j]] * (1 - Math.abs(2 * q - 1 - beta) / (1 - beta));
                fx += dx / r * f; fy += dy / r * f;
              }
            }
            j = next[j];
          }
          if (small) break;
        }
        vx[i] = vx[i] * fric + fx * k; vy[i] = vy[i] * fric + fy * k;
        if (pull) { const dx = wrap(mx - x, n), dy = wrap(my - y, n), r = Math.hypot(dx, dy) + 1; vx[i] += dx / r * 0.25; vy[i] += dy / r * 0.25; }
      }
      for (let i = 0; i < N; i++) { px[i] = mod(px[i] + vx[i], n); py[i] = mod(py[i] + vy[i], n); }
    };
  }
  // one step of the magnetic beads (dipole pairs in a field at angle fa, strength s),
  // with the neighbour search inlined; the same law as before
  function ferroStep(n, N, sg, rc, B, px, py, vx, vy, ang, bond) {
    const G = B.G, sz = n / G, head = B.head, next = B.next, half = n / 2, rc2 = rc * rc, bondR = sg * 1.35;
    return (fa, s, R, inp) => {
      let fx0 = Math.cos(fa), fy0 = Math.sin(fa);
      B.build(px, py);
      const on = inp.inside, mx = inp.x * n, my = inp.y * n;
      for (let i = 0; i < N; i++) {
        let fx = 0, fy = 0, best = 1e9, bdx = 0, bdy = 0;
        const x = px[i], y = py[i], cx = Math.floor(x / sz), cy = Math.floor(y / sz);
        if (on) { const dx = wrap(mx - x, n), dy = wrap(my - y, n), r = Math.hypot(dx, dy) + 1e-6; fx0 = dx / r; fy0 = dy / r; }
        for (let by = -1; by <= 1; by++) for (let bx = -1; bx <= 1; bx++) {
          let j = head[mod(cy + by, G) * G + mod(cx + bx, G)];
          while (j >= 0) {
            if (j !== i) {
              let dx = x - px[j], dy = y - py[j];
              if (dx > half) dx -= n; else if (dx < -half) dx += n;
              if (dy > half) dy -= n; else if (dy < -half) dy += n;
              const r2 = dx * dx + dy * dy;
              if (r2 > 0 && r2 <= rc2) {
                const r = Math.sqrt(r2), ux = dx / r, uy = dy / r, c = ux * fx0 + uy * fy0, q = sg / r, q2 = q * q, q4 = q2 * q2;
                // dipole pair: radial part pushes side by side apart and pulls end to end together; the tangential part turns the pair into line with the field
                const fr = s * 3 * (1 - 3 * c * c) * q4, ft = -s * 6 * c * Math.sqrt(Math.max(0, 1 - c * c)) * Math.sign(ux * fy0 - uy * fx0) * q4;
                fx += ux * fr - uy * ft; fy += uy * fr + ux * ft;
                if (r < sg) { const k = 6 * (sg - r) / sg; fx += ux * k; fy += uy * k; }
                if (r < best) { best = r; bdx = dx; bdy = dy; }
              }
            }
            j = next[j];
          }
        }
        vx[i] = vx[i] * 0.55 + Math.max(-1, Math.min(1, fx)) * 0.25 + R.gauss() * 0.03;
        vy[i] = vy[i] * 0.55 + Math.max(-1, Math.min(1, fy)) * 0.25 + R.gauss() * 0.03;
        bond[i] = best < bondR ? 1 : 0; ang[i] = mod(best < 1e9 ? Math.atan2(bdy, bdx) : 0, Math.PI);
      }
      for (let i = 0; i < N; i++) { px[i] = mod(px[i] + vx[i], n); py[i] = mod(py[i] + vy[i], n); }
    };
  }
  // one Vicsek step: every particle takes the mean heading round it plus noise eta
  // (neighbour search inlined, headings' cosines and sines worked out once a step)
  function vicsekStep(n, N, rr, v, B, px, py, th, nt) {
    const G = B.G, sz = n / G, head = B.head, next = B.next, half = n / 2, rr2 = rr * rr, CO = new Float64Array(N), SI = new Float64Array(N), small = G < 3;
    return (eta, R, inp) => {
      B.build(px, py);
      for (let i = 0; i < N; i++) { CO[i] = Math.cos(th[i]); SI[i] = Math.sin(th[i]); }
      const on = inp.inside, mx = inp.x * n, my = inp.y * n;
      for (let i = 0; i < N; i++) {
        let sx = 0, sy = 0;
        const x = px[i], y = py[i], cx = Math.floor(x / sz), cy = Math.floor(y / sz);
        for (let by = -1; by <= 1; by++) for (let bx = -1; bx <= 1; bx++) {
          let j = head[mod(cy + by, G) * G + mod(cx + bx, G)];
          while (j >= 0) {
            let dx = px[j] - x, dy = py[j] - y;
            if (dx > half) dx -= n; else if (dx < -half) dx += n;
            if (dy > half) dy -= n; else if (dy < -half) dy += n;
            if (dx * dx + dy * dy < rr2) { sx += CO[j]; sy += SI[j]; }
            j = next[j];
          }
          if (small) break;
        }
        nt[i] = Math.atan2(sy, sx) + (R() - 0.5) * eta * TAU;
        if (on) { const dx = wrap(x - mx, n), dy = wrap(y - my, n); if (dx * dx + dy * dy < 140) nt[i] = Math.atan2(dy, dx); }
      }
      for (let i = 0; i < N; i++) { th[i] = nt[i]; px[i] = mod(px[i] + Math.cos(th[i]) * v, n); py[i] = mod(py[i] + Math.sin(th[i]) * v, n); }
    };
  }
  // a burst's extra gas is taken back from random cells elsewhere, so the box keeps its
  // density: the waves stay on a calm field for good instead of boiling into confetti
  const BITS = Uint8Array.from({ length: 16 }, (_, v) => (v & 1) + (v >> 1 & 1) + (v >> 2 & 1) + (v >> 3 & 1));
  function leak(S, wall, n, added, cx, cy, r, Q) {
    for (let tries = 0, most = added * 12; added > 0 && tries < most; tries++) {
      const i = Q() * n * n | 0, x = i % n, y = i / n | 0;
      if (wall[i] || !S[i] || (Math.abs(x - cx) <= r + 2 && Math.abs(y - cy) <= r + 2)) continue;
      const v = S[i]; let b = Q() * 4 | 0;
      while (!(v >> b & 1)) b = (b + 1) & 3;
      S[i] = v & ~(1 << b); added--;
    }
  }
  // a little viscosity: a few cells a step turn their particles to new directions (same
  // count), so old waves die away over some twenty seconds and each burst rings out on a quiet field
  function calm(S, wall, N, Q) {
    for (let k = N * 0.004 | 0; k > 0; k--) {
      const i = Q() * N | 0, v = S[i];
      if (!v || v === 15 || wall[i]) continue;
      const r = 1 + (Q() * 3 | 0); S[i] = (v << r | v >> (4 - r)) & 15;
    }
  }
  // the lattice gas to the grid: each 4 x 4 block's density and flow set how brightly its
  // cells burn and in which hue (worked out once per block, not once per cell)
  const BL = new Float32Array(4096), BF = new Float32Array(4096), BC = new Uint32Array(4096), WALLC = X.rgb(230, 230, 236);
  function gasOut(g, S, wall, bx, by, bd, bs, G, rho, lut, h0) {
    const n = g.n, d = g.d;
    // the gas's own restless churn (the mean flow over the box) is taken as quiet, so only
    // real waves light up, however long it has been running
    let mf = 0, md = 0;
    for (let b = 0; b < G * G; b++) { BF[b] = Math.hypot(bx[b], by[b]) / (bs * bs); mf += BF[b]; md += bd[b]; }
    mf /= G * G; md /= G * G * bs * bs * 4;
    const base = Math.max(rho, md) * 0.8, quiet = Math.max(0, mf - 0.15);
    for (let b = 0; b < G * G; b++) { const dens = bd[b] / (bs * bs * 4), flow = Math.max(0, BF[b] - quiet); BL[b] = U.clamp((dens - base) * 3.5 + flow * 2.2); BC[b] = lut[(h0 + (Math.atan2(by[b], bx[b]) / TAU) * 256) & 255]; }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      if (wall[i]) { d[i] = WALLC; continue; }
      const b = (y / bs | 0) * G + (x / bs | 0), v = S[i], lit = BL[b] * (0.55 + 0.45 * ((v & 1) + (v >> 1 & 1) + (v >> 2 & 1) + (v >> 3 & 1)) / 2);
      d[i] = lit < 0.04 ? BLACK : X.shade(BC[b], Math.min(1, lit));
    }
  }
  // one step of the crystal: short-range repulsion to r0, and each atom's six-fold bond
  // order (the mean of e^{6i angle} over its near neighbours, as z^6, no trig) for its colour.
  // Same law as before, with the neighbour search inlined: no closure per atom per frame.
  function crystal(n, N, r0, cut, B, px, py, vx, vy, re, im) {
    const G = B.G, sz = n / G, head = B.head, next = B.next, half = n / 2, cut2 = cut * cut, rb = r0 * 1.3, melt2 = n * n * 0.02;
    return (T, R, inp) => {
      B.build(px, py);
      const hot = inp.down && inp.inside, mx = inp.x * n, my = inp.y * n;
      for (let i = 0; i < N; i++) {
        let fx = 0, fy = 0, sr = 0, si = 0, cnt = 0;
        const x = px[i], y = py[i], cx = Math.floor(x / sz), cy = Math.floor(y / sz);
        for (let by = -1; by <= 1; by++) for (let bx = -1; bx <= 1; bx++) {
          let j = head[mod(cy + by, G) * G + mod(cx + bx, G)];
          while (j >= 0) {
            if (j !== i) {
              let dx = px[j] - x, dy = py[j] - y;
              if (dx > half) dx -= n; else if (dx < -half) dx += n;
              if (dy > half) dy -= n; else if (dy < -half) dy += n;
              const r2 = dx * dx + dy * dy;
              if (r2 > 0 && r2 <= cut2) {
                const r = Math.sqrt(r2), ux = dx / r, uy = dy / r;
                if (r < r0) { const f = (r - r0) / r0; fx += ux * f; fy += uy * f; }
                if (r < rb) { const ar = ux * ux - uy * uy, ai = 2 * ux * uy, br = ar * ux - ai * uy, bi = ar * uy + ai * ux; sr += br * br - bi * bi; si += 2 * br * bi; cnt++; }
              }
            }
            j = next[j];
          }
        }
        let Ti = T;
        if (hot) { const dx = wrap(mx - x, n), dy = wrap(my - y, n); if (dx * dx + dy * dy < melt2) Ti = 0.9; }
        vx[i] = vx[i] * 0.6 + fx * 0.5 + R.gauss() * Ti; vy[i] = vy[i] * 0.6 + fy * 0.5 + R.gauss() * Ti;
        re[i] = cnt ? sr / cnt : 0; im[i] = cnt ? si / cnt : 0;
      }
      for (let i = 0; i < N; i++) { px[i] = mod(px[i] + vx[i], n); py[i] = mod(py[i] + vy[i], n); }
    };
  }
  // under the atoms of a crystal: a wider, dark disc of each grain's colour, so the gaps
  // between atoms read as the grain's shadow instead of single black specks
  const grout = (g, N, px, py, re, im, lut, h0, rad) => {
    const R2 = rad * 1.75, n = g.n, d = g.d, k = Math.ceil(R2), span = [];
    for (let dy = -k; dy <= k; dy++) span.push(Math.floor(Math.sqrt(Math.max(0, R2 * R2 - dy * dy))));
    for (let i = 0; i < N; i++) {
      const m = Math.hypot(re[i], im[i]), c = X.shade(lut[(h0 + (Math.atan2(im[i], re[i]) / TAU + 0.5) * 256) & 255], 0.14 + 0.46 * m * m), cx = px[i] | 0, cy = py[i] | 0;
      for (let q = 0; q < span.length; q++) {
        const row = ((cy + q - k + n) % n) * n, h = span[q];
        for (let x = cx - h; x <= cx + h; x++) d[row + (x < 0 ? x + n : x >= n ? x - n : x)] = c;
      }
    }
  };
  const dot = (d, n, x, y, c, big) => { x |= 0; y |= 0; d[y * n + x] = c; if (big) { const x1 = (x + 1) % n, y1 = (y + 1) % n; d[y * n + x1] = c; d[y1 * n + x] = c; d[y1 * n + x1] = c; } };

  add({
    interactive: 'Hold to pull every species toward the pointer; click to rewrite one row of the table.',
    name: 'Attraction Matrix', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'Particle life: four to six coloured species, each pulled toward or pushed from every other by its own entry in a random table. From that table alone come cells with membranes, chasing pairs and spinning clusters; every half minute one entry changes and the creatures reorganise.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, K = R.int(4, 6), N = n >= 200 ? 620 : 480, rr = n * 0.11, beta = 0.3, cols = species(R, K), big = true;
        g.trait('Species', K); g.trait('Palette', palName(cols)); g.trait('Particles', N); g.trait('Reach', 'Medium'); g.trait('Trails', 'Medium'); g.trait('Grid', n);
        const A = Array.from({ length: K }, () => Array.from({ length: K }, () => R.range(-1, 1)));
        const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), ty = new Uint8Array(N), B = buckets(n, rr, N);
        for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; ty[i] = i % K; }
        let change = 0;
        const step = lifeStep(n, N, rr, beta, 0.8, A, B, px, py, vx, vy, ty, g.input);
        for (let k = 0; k < 160; k++) step();
        return (t, dt) => {
          change += dt;
          if (change > 30) { change = 0; A[R.int(0, K - 1)][R.int(0, K - 1)] = R.range(-1, 1); }
          if (g.input.taps().length) { const r = g.alt.int(0, K - 1); for (let j = 0; j < K; j++) A[r][j] = g.alt.range(-1, 1); }
          step();
          U.fadePx(d, 0.6);
          for (let i = 0; i < N; i++) dot(d, n, px[i], py[i], cols[ty[i]], big);
        };
      };
      if (g.home || g.alt() < 0.45) return og(R, U, g);   // the original look on 45% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, K = R.int(3, 7), N = Math.round((n >= 200 ? 620 : 480) * R.pick([0.7, 0.85, 1])), rr = n * R.range(0.08, 0.12), beta = R.range(0.22, 0.38), cols = R.bool(0.7) ? species(R, K) : X.inks(R, K, 0), big = true, fric = R.pick([0.7, 0.8, 0.86]), trail = R.pick([0.35, 0.6, 0.8]);
      g.trait('Species', K); g.trait('Palette', palName(cols)); g.trait('Particles', N); g.trait('Reach', few(rr / n, 0.093, 0.107, ['Short', 'Medium', 'Long'])); g.trait('Trails', ['Short', 'Medium', 'Long'][[0.35, 0.6, 0.8].indexOf(trail)]); g.trait('Grid', n);
      const A = Array.from({ length: K }, () => Array.from({ length: K }, () => R.range(-1, 1)));
      for (let k = 0; k < K; k++) A[k][k] = 0.35 + 0.65 * Math.abs(A[k][k]);   // every species likes its own kind a little, so tables grow cells rather than gas
      const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), ty = new Uint8Array(N), B = buckets(n, rr, N);
      for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; ty[i] = i % K; }
      let change = 0;
      const step = lifeStep(n, N, rr, beta, fric, A, B, px, py, vx, vy, ty, inp);
      for (let k = 0; k < 160; k++) step();
      return (t, dt) => {
        change += dt;
        if (change > 30) { change = 0; A[R.int(0, K - 1)][R.int(0, K - 1)] = R.range(-1, 1); }
        if (inp.taps().length) { const r = R.int(0, K - 1); for (let j = 0; j < K; j++) A[r][j] = R.range(-1, 1); }
        step();
        U.fadePx(d, trail);
        for (let i = 0; i < N; i++) dot(d, n, px[i], py[i], cols[ty[i]], big);
      };
    },
  });

  add({
    interactive: 'Click to move a new crowd into a neighbourhood.',
    name: 'Schelling', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'Schelling’s segregation model on the grid: two to four colours of residents, each content if enough of its neighbours are like it. The unhappy ones move to a random empty cell; mild preferences sort the town into districts, and as the tolerance slowly rises and falls the districts melt and re-form.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, K = R.int(2, 4), cols = species(R, K), C = new Int8Array(N), empty = [], where = new Int32Array(N).fill(-1);
        for (let i = 0; i < N; i++) { if (R() < 0.1) { C[i] = -1; where[i] = empty.length; empty.push(i); } else C[i] = R.int(0, K - 1); }
        const T0 = R.range(0.3, 0.45), amp = R.range(0.1, 0.2), per = R.range(40, 70);
        g.trait('Groups', K); g.trait('Palette', palName(cols)); g.trait('Tolerance', few(T0, 0.35, 0.4, ['Easy', 'Fair', 'Strict'])); g.trait('Grid', n);
        const happy = (i, c, T) => {
          const x = i % n, y = i / n | 0;
          let same = 0, all = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const v = C[mod(y + dy, n) * n + mod(x + dx, n)]; if (v >= 0) { all++; if (v === c) same++; } }
          return !all || same / all >= T;
        };
        const flash = new Float32Array(N);
        const run = (T, m) => {
          for (let k = 0; k < m; k++) {
            const i = R.int(0, N - 1), c = C[i];
            if (c < 0 || happy(i, c, T)) continue;
            const e = R.int(0, empty.length - 1), j = empty[e];
            C[j] = c; C[i] = -1; empty[e] = i; where[i] = e; where[j] = -1; flash[j] = 1;
          }
        };
        run(T0, N * 6);
        return t => {
          const T = T0 + amp * Math.sin(t / per * TAU);
          for (const tap of g.input.taps()) { const cx = tap.x * n | 0, cy = tap.y * n | 0, c = g.alt.int(0, K - 1), r = Math.max(2, n / 12 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const i = mod(cy + y, n) * n + mod(cx + x, n); if (C[i] >= 0 && x * x + y * y <= r * r) { C[i] = c; flash[i] = 1; } } }
          run(T, Math.round(N / 18));
          for (let i = 0; i < N; i++) { flash[i] *= 0.8; d[i] = C[i] < 0 ? BLACK : flash[i] > 0.05 ? X.mixPk(cols[C[i]], WHITE, flash[i] * 0.6) : cols[C[i]]; }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, N = n * n, K = R.int(2, 5), cols = R.bool(0.6) ? species(R, K) : X.inks(R, K, 0), C = new Int8Array(N), empty = [], where = new Int32Array(N).fill(-1);
      for (let i = 0; i < N; i++) { if (R() < 0.1) { C[i] = -1; where[i] = empty.length; empty.push(i); } else C[i] = R.int(0, K - 1); }
      const T0 = R.range(0.3, 0.45), amp = R.range(0.1, 0.2), per = R.range(40, 70);
      g.trait('Groups', K); g.trait('Palette', palName(cols)); g.trait('Tolerance', few(T0, 0.35, 0.4, ['Easy', 'Fair', 'Strict'])); g.trait('Grid', n);
      const happy = (i, c, T) => {
        const x = i % n, y = i / n | 0;
        let same = 0, all = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const v = C[mod(y + dy, n) * n + mod(x + dx, n)]; if (v >= 0) { all++; if (v === c) same++; } }
        return !all || same / all >= T;
      };
      const flash = new Float32Array(N);
      const run = (T, m) => {
        for (let k = 0; k < m; k++) {
          const i = R.int(0, N - 1), c = C[i];
          if (c < 0 || happy(i, c, T)) continue;
          const e = R.int(0, empty.length - 1), j = empty[e];
          C[j] = c; C[i] = -1; empty[e] = i; where[i] = e; where[j] = -1; flash[j] = 1;
        }
      };
      run(T0, N * 6);
      return t => {
        const T = T0 + amp * Math.sin(t / per * TAU);
        for (const tap of inp.taps()) { const cx = tap.x * n | 0, cy = tap.y * n | 0, c = R.int(0, K - 1), r = Math.max(2, n / 12 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const i = mod(cy + y, n) * n + mod(cx + x, n); if (C[i] >= 0 && x * x + y * y <= r * r) { C[i] = c; flash[i] = 1; } } }
        run(T, Math.round(N / 18));
        for (let i = 0; i < N; i++) { flash[i] *= 0.8; d[i] = C[i] < 0 ? BLACK : flash[i] > 0.05 ? X.mixPk(cols[C[i]], WHITE, flash[i] * 0.6) : cols[C[i]]; }
      };
    },
  });

  add({
    interactive: 'Click to plant a new idea.',
    name: 'Bounded Confidence', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'Every cell holds an opinion, shown as a hue. Neighbours talk at random and meet halfway, but only if their hues are already close; so the rainbow of opinions settles into flat districts with sharp black borders, while now and then a new idea appears and the borders shift as the range of tolerance breathes.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, O = new Float32Array(N), lut = U.hueLut(R.bool(0.3) ? 100 : 85, 92), mu = R.range(0.3, 0.5), e0 = R.range(18, 26), ea = R.range(4, 8), per = R.range(30, 60), seedR = R.range(0.00015, 0.0005);
        g.trait('Palette', lutName(lut)); g.trait('Borders', 'Black'); g.trait('Open mind', few(e0, 20.5, 23.5, ['Narrow', 'Fair', 'Wide'])); g.trait('New ideas', few(seedR, 0.00027, 0.0004, ['Rare', 'Some', 'Often'])); g.trait('Grid', n);
        for (let i = 0; i < N; i++) O[i] = R() * 100;
        const talk = (eps, m) => {
          for (let k = 0; k < m; k++) {
            const i = R() * N | 0, x = i % n, y = i / n | 0, s = R() * 4 | 0, j = s === 0 ? y * n + (x + 1) % n : s === 1 ? y * n + (x + n - 1) % n : s === 2 ? ((y + 1) % n) * n + x : ((y + n - 1) % n) * n + x;
            const df = wrap(O[j] - O[i], 100);
            if (Math.abs(df) < eps) { O[i] = mod(O[i] + mu * df, 100); O[j] = mod(O[j] - mu * df, 100); }
          }
        };
        talk(e0, N * 220);
        return t => {
          const eps = e0 + ea * Math.sin(t / per * TAU);
          talk(eps, Math.round(N * 1.4));
          for (const tap of g.input.taps()) { const cx = tap.x * n | 0, cy = tap.y * n | 0, h = g.alt() * 100, r = Math.max(2, n / 14 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) O[mod(cy + y, n) * n + mod(cx + x, n)] = h; }
          for (let k = 0; k < N * seedR; k++) { const i = R.int(0, N - 1), h = R() * 100, x = i % n, y = i / n | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) O[mod(y + dy, n) * n + mod(x + dx, n)] = h; }
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const i = y * n + x, a = O[i], r = O[y * n + (x + 1) % n], b = O[((y + 1) % n) * n + x];
            d[i] = Math.abs(wrap(r - a, 100)) > eps || Math.abs(wrap(b - a, 100)) > eps ? BLACK : lut[(a * 2.56) | 0];
          }
        };
      };
      if (g.home || g.alt() < 0.45) return og(R, U, g);   // the original look on 45% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = n * n, O = new Float32Array(N), lut = R.bool(0.65) ? U.hueLut(R.bool(0.3) ? 100 : 85, 92) : U.scheme(R, 0).lut, border = R.pick([BLACK, BLACK, WHITE, X.rgb(30, 30, 40)]), mu = R.range(0.3, 0.5), e0 = R.range(18, 26), ea = R.range(4, 8), per = R.range(30, 60), seedR = R.range(0.00015, 0.0005);
      g.trait('Palette', lutName(lut)); g.trait('Borders', border === BLACK ? 'Black' : border === WHITE ? 'White' : 'Slate'); g.trait('Open mind', few(e0, 20.5, 23.5, ['Narrow', 'Fair', 'Wide'])); g.trait('New ideas', few(seedR, 0.00027, 0.0004, ['Rare', 'Some', 'Often'])); g.trait('Grid', n);
      for (let i = 0; i < N; i++) O[i] = R() * 100;
      const talk = (eps, m) => {
        for (let k = 0; k < m; k++) {
          const i = R() * N | 0, x = i % n, y = i / n | 0, s = R() * 4 | 0, j = s === 0 ? y * n + (x + 1) % n : s === 1 ? y * n + (x + n - 1) % n : s === 2 ? ((y + 1) % n) * n + x : ((y + n - 1) % n) * n + x;
          const df = wrap(O[j] - O[i], 100);
          if (Math.abs(df) < eps) { O[i] = mod(O[i] + mu * df, 100); O[j] = mod(O[j] - mu * df, 100); }
        }
      };
      talk(e0, N * 220);
      return t => {
        const eps = e0 + ea * Math.sin(t / per * TAU);
        talk(eps, Math.round(N * 1.4));
        for (const tap of inp.taps()) { const cx = tap.x * n | 0, cy = tap.y * n | 0, h = R() * 100, r = Math.max(2, n / 14 | 0); for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) O[mod(cy + y, n) * n + mod(cx + x, n)] = h; }
        for (let k = 0; k < N * seedR; k++) { const i = R.int(0, N - 1), h = R() * 100, x = i % n, y = i / n | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) O[mod(y + dy, n) * n + mod(x + dx, n)] = h; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, a = O[i], r = O[y * n + (x + 1) % n], b = O[((y + 1) % n) * n + x];
          d[i] = Math.abs(wrap(r - a, 100)) > eps || Math.abs(wrap(b - a, 100)) > eps ? border : lut[(a * 2.56) | 0];
        }
      };
    },
  });

  add({
    interactive: 'Hold to melt the crystal under the pointer.',
    name: 'Polycrystal', seed: 1, sizes: [100], fps: 12,
    recipe: 'A few hundred particles that like to sit a fixed distance apart, heated and cooled in turn. As they cool they lock into hexagonal crystals, each grain coloured by the angle its lattice settled at, so the frame becomes a mosaic of grains with dim, disordered boundaries; then the heat returns and it melts.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = R.int(380, 460), r0 = Math.sqrt(n * n / (N * 0.866)) * 1.02, cut = r0 * 1.45, lut = U.hueLut(R.bool(0.3) ? 100 : 88, 95), h0 = R.range(0, 256), per = R.range(28, 40);
        g.trait('Palette', lutName(lut)); g.trait('Atoms', N); g.trait('Atom size', 'Medium'); g.trait('Cycle', per < 34 ? 'Brisk' : 'Long');
        const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), re = new Float32Array(N), im = new Float32Array(N), B = buckets(n, cut, N);
        for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; }
        const cs = crystal(n, N, r0, cut, B, px, py, vx, vy, re, im), step = T => cs(T, R, g.input);
        const temp = t => { const u = mod(t / per, 1); return u < 0.1 ? 0.9 : u < 0.35 ? 0.9 * (1 - (u - 0.1) / 0.25) + 0.005 : 0.005; };
        const start = per * 1.4 - 260 / 12;   // the warm-up runs through a melt and a cooling, arriving crystalline
        for (let k = 0; k < 260; k++) step(temp(k / 12 + start));
        const rad = r0 * 0.48;
        return t => {
          const T = temp(t + per * 1.4);
          step(T);
          d.fill(BLACK);
          grout(g, N, px, py, re, im, lut, h0, rad);
          for (let i = 0; i < N; i++) {
            const m = Math.hypot(re[i], im[i]), c = X.shade(lut[(h0 + (Math.atan2(im[i], re[i]) / TAU + 0.5) * 256) & 255], 0.3 + 0.7 * m);
            X.disc(g, px[i], py[i], rad, c);
            if (px[i] < rad) X.disc(g, px[i] + n, py[i], rad, c); if (px[i] > n - rad) X.disc(g, px[i] - n, py[i], rad, c);
            if (py[i] < rad) X.disc(g, px[i], py[i] + n, rad, c); if (py[i] > n - rad) X.disc(g, px[i], py[i] - n, rad, c);
          }
        };
      };
      if (g.home || g.alt() < 0.45) return og(R, U, g);   // the original look on 45% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = R.int(260, 560), r0 = Math.sqrt(n * n / (N * 0.866)) * 1.02, cut = r0 * 1.45, lut0 = U.hueLut(R.bool(0.3) ? 100 : 88, 95), lut = g.alt.bool(0.4) ? U.scheme(g.alt, 0).lut : lut0, h0 = R.range(0, 256), per = R.range(28, 40);
      const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), re = new Float32Array(N), im = new Float32Array(N), B = buckets(n, cut, N);
      for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; }
      const cs = crystal(n, N, r0, cut, B, px, py, vx, vy, re, im), step = T => cs(T, R, inp);
      const temp = t => { const u = mod(t / per, 1); return u < 0.1 ? 0.9 : u < 0.35 ? 0.9 * (1 - (u - 0.1) / 0.25) + 0.005 : 0.005; };
      const start = per * 1.4 - 260 / 12;   // the warm-up runs through a melt and a cooling, arriving crystalline
      for (let k = 0; k < 260; k++) step(temp(k / 12 + start));
      const rad = r0 * R.pick([0.36, 0.48, 0.55]);
      g.trait('Palette', lutName(lut)); g.trait('Atoms', N); g.trait('Atom size', rad / r0 < 0.4 ? 'Small' : rad / r0 < 0.5 ? 'Medium' : 'Large'); g.trait('Cycle', per < 34 ? 'Brisk' : 'Long');
      return t => {
        const T = temp(t + per * 1.4);
        step(T);
        d.fill(BLACK);
        grout(g, N, px, py, re, im, lut, h0, rad);
        for (let i = 0; i < N; i++) {
          const m = Math.hypot(re[i], im[i]), c = X.shade(lut[(h0 + (Math.atan2(im[i], re[i]) / TAU + 0.5) * 256) & 255], 0.3 + 0.7 * m);
          X.disc(g, px[i], py[i], rad, c);
          if (px[i] < rad) X.disc(g, px[i] + n, py[i], rad, c); if (px[i] > n - rad) X.disc(g, px[i] - n, py[i], rad, c);
          if (py[i] < rad) X.disc(g, px[i], py[i] + n, rad, c); if (py[i] > n - rad) X.disc(g, px[i], py[i] - n, rad, c);
        }
      };
    },
  });

  add({
    interactive: 'Move among the flock: it turns away from the pointer.',
    listens: 'A loud room shakes the flock into confetti; in the quiet it marches again.',
    name: 'Vicsek', seed: 2, sizes: [100], fps: 12,
    recipe: 'Self-propelled particles that each steer toward the average heading of those around them, plus a little noise; colour is heading, so a flock that agrees is one hue. When the noise is low, bands of colour march across the frame; when it rises the order dissolves into confetti, then re-forms.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = 800, rr = 3.2, v = n / 160, lut = U.hueLut(R.bool(0.3) ? 100 : 85, 95), per = R.range(30, 50), big = n >= 200;
        g.trait('Palette', lutName(lut)); g.trait('Flock', N); g.trait('Reach', 'Medium'); g.trait('Stride', 'Medium'); g.trait('Trails', 'Medium');
        const px = new Float32Array(N), py = new Float32Array(N), th = new Float32Array(N), nt = new Float32Array(N), B = buckets(n, rr, N);
        for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; th[i] = R() * TAU; }
        const vs = vicsekStep(n, N, rr, v, B, px, py, th, nt), step = eta => vs(eta, R, g.input);
        const eta = t => 0.08 + 0.32 * Math.pow(0.5 + 0.5 * Math.sin(t / per * TAU - 1.2), 3), rm = room(g.input);
        for (let k = 0; k < 150; k++) step(eta(k / 12));
        return t => {
          rm.read();
          if (rm.beats) for (let i = 0; i < N; i++) th[i] += (g.alt() - 0.5) * 2.4;
          step(Math.min(0.9, eta(t + 12.5) + rm.lvl * 0.55));
          U.fadePx(d, 0.7);
          for (let i = 0; i < N; i++) dot(d, n, px[i], py[i], lut[(mod(th[i], TAU) / TAU * 256) | 0], big);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = R.pick([500, 650, 800]), rr = R.range(2.4, 4.5), v = n / R.range(120, 220), lut = R.bool(0.7) ? U.hueLut(R.bool(0.3) ? 100 : 85, 95) : U.scheme(R, 0).lut, per = R.range(30, 50), big = n >= 200, trail = R.pick([0.5, 0.7, 0.85]);
      g.trait('Palette', lutName(lut)); g.trait('Flock', N); g.trait('Reach', few(rr, 3.1, 3.8, ['Short', 'Medium', 'Long'])); g.trait('Stride', few(n / v, 150, 185, ['Long', 'Medium', 'Short'])); g.trait('Trails', ['Short', 'Medium', 'Long'][[0.5, 0.7, 0.85].indexOf(trail)]);
      const px = new Float32Array(N), py = new Float32Array(N), th = new Float32Array(N), nt = new Float32Array(N), B = buckets(n, rr, N);
      for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; th[i] = R() * TAU; }
      const vs = vicsekStep(n, N, rr, v, B, px, py, th, nt), step = eta => vs(eta, R, inp);
      const eta = t => 0.08 + 0.32 * Math.pow(0.5 + 0.5 * Math.sin(t / per * TAU - 1.2), 3), rm = room(inp);
      for (let k = 0; k < 150; k++) step(eta(k / 12));
      return t => {
        rm.read();
        if (rm.beats) for (let i = 0; i < N; i++) th[i] += (g.alt() - 0.5) * 2.4;
        step(Math.min(0.9, eta(t + 12.5) + rm.lvl * 0.55));
        U.fadePx(d, trail);
        for (let i = 0; i < N; i++) dot(d, n, px[i], py[i], lut[(mod(th[i], TAU) / TAU * 256) | 0], big);
      };
    },
  });

  add({
    interactive: 'Drag up and down to move the gate; click to change the demon’s mind.',
    name: 'Maxwell’s Demon', seed: 1, sizes: [100], fps: 12,
    recipe: 'A box of gas split by a wall with a tiny gate. A demon opens the gate only for fast particles heading right and slow ones heading left, so without any work the right side grows hot and the left cold, colour showing speed. Every forty seconds the demon changes its mind and the heat flows back.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = R.int(240, 300), wall = n >> 1, gate = [n * 0.3, n * 0.7], heat = U.lut([[40, 70, 255], [0, 200, 255], [255, 240, 90], [255, 70, 30]], false);
        g.trait('Heat', 'Thermal'); g.trait('Gas', N); g.trait('Gate', 'Wide'); g.trait('Grain', 'Medium');
        const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N);
        for (let i = 0; i < N; i++) { px[i] = R() * (n - 2) + 1; py[i] = R() * (n - 2) + 1; if (Math.abs(px[i] - wall) < 1.5) px[i] += 3; vx[i] = R.gauss() * 0.6; vy[i] = R.gauss() * 0.6; }
        let open = 0, mind = 0;
        const sp = i => Math.hypot(vx[i], vy[i]);
        const frame = t => {
          if (g.input.down && g.input.inside) { const gw = gate[1] - gate[0]; gate[0] = U.clamp(g.input.y * n - gw / 2, 0, n - gw); gate[1] = gate[0] + gw; }
          if (g.input.taps().length) mind ^= 1;
          const flip = (Math.floor(t / 40) + mind) % 2, med = (() => { let s = 0; for (let i = 0; i < N; i++) s += sp(i); return s / N; })();
          // collisions within each side, by random pairs: turn the relative velocity
          for (let k = 0; k < N / 6; k++) {
            const i = R.int(0, N - 1), j = R.int(0, N - 1);
            if (i === j || (px[i] < wall) !== (px[j] < wall)) continue;
            const cx = (vx[i] + vx[j]) / 2, cy = (vy[i] + vy[j]) / 2, rx = (vx[i] - vx[j]) / 2, ry = (vy[i] - vy[j]) / 2, m = Math.hypot(rx, ry), a = R() * TAU;
            vx[i] = cx + Math.cos(a) * m; vy[i] = cy + Math.sin(a) * m; vx[j] = cx - Math.cos(a) * m; vy[j] = cy - Math.sin(a) * m;
          }
          for (let i = 0; i < N; i++) {
            let nx = px[i] + vx[i], ny = py[i] + vy[i];
            if (ny < 0.5 || ny > n - 1.5) { vy[i] = -vy[i]; ny = py[i] + vy[i]; }
            if (nx < 0.5 || nx > n - 1.5) { vx[i] = -vx[i]; nx = px[i] + vx[i]; }
            if ((px[i] < wall) !== (nx < wall)) {
              const fast = sp(i) > med, right = vx[i] > 0, pass = ny > gate[0] && ny < gate[1] && (flip ? (right ? !fast : fast) : (right ? fast : !fast));
              if (pass) open = 1; else { vx[i] = -vx[i]; nx = px[i] + vx[i]; }
            }
            px[i] = nx; py[i] = ny;
          }
          let sl = 0, nl = 0, sr = 0, nr = 0;
          for (let i = 0; i < N; i++) if (px[i] < wall) { sl += sp(i); nl++; } else { sr += sp(i); nr++; }
          const tl = X.shade(heat[Math.min(255, (sl / Math.max(1, nl)) / (med * 2.2) * 255) | 0], 0.32), tr = X.shade(heat[Math.min(255, (sr / Math.max(1, nr)) / (med * 2.2) * 255) | 0], 0.32);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x, base = x < wall ? tl : tr; d[i] = X.mixPk(base, d[i], 0.62); }
          for (let i = 0; i < N; i++) { const c = heat[Math.min(255, sp(i) / (med * 2.2) * 255) | 0]; X.rect(g, px[i] - 0.5, py[i] - 0.5, 2, 2, c); }
          open *= 0.8;
          for (let y = 0; y < n; y++) { const inGate = y > gate[0] && y < gate[1]; d[y * n + wall] = inGate ? X.mixPk(X.rgb(40, 40, 50), WHITE, open) : X.rgb(200, 200, 210); }
        };
        for (let k = 0; k < 300; k++) frame(k / 12);   // open with the demon well at work
        return t => frame(t + 25);
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = R.int(160, 360), wall = n >> 1, gw = R.range(0.2, 0.45) * n, gate = [n / 2 - gw / 2, n / 2 + gw / 2];
      // new looks: the colour scale of speed, and the size of a molecule
      const ramp = g.alt.pick(['Thermal', 'Thermal', 'Ice', 'Ember', 'Neon', 'Ink']), grain = g.alt.pick([2, 2, 1, 3]);
      const heat = U.lut({ Thermal: [[40, 70, 255], [0, 200, 255], [255, 240, 90], [255, 70, 30]], Ice: [[30, 30, 110], [70, 120, 230], [150, 220, 255], [250, 255, 255]], Ember: [[70, 10, 20], [190, 40, 20], [255, 140, 30], [255, 240, 170]],
        Neon: [[90, 0, 200], [255, 0, 170], [0, 255, 200], [230, 255, 80]], Ink: [[60, 66, 80], [120, 130, 150], [200, 205, 215], [255, 250, 235]] }[ramp], false);
      g.trait('Heat', ramp); g.trait('Gas', N); g.trait('Gate', gw < 0.28 * n ? 'Narrow' : gw < 0.37 * n ? 'Medium' : 'Wide'); g.trait('Grain', ['', 'Fine', 'Medium', 'Coarse'][grain]);
      const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N);
      for (let i = 0; i < N; i++) { px[i] = R() * (n - 2) + 1; py[i] = R() * (n - 2) + 1; if (Math.abs(px[i] - wall) < 1.5) px[i] += 3; vx[i] = R.gauss() * 0.6; vy[i] = R.gauss() * 0.6; }
      let open = 0, mind = 0;
      const sp = i => Math.hypot(vx[i], vy[i]);
      const frame = t => {
        if (inp.down && inp.inside) { gate[0] = U.clamp(inp.y * n - gw / 2, 0, n - gw); gate[1] = gate[0] + gw; }
        if (inp.taps().length) mind ^= 1;
        const flip = (Math.floor(t / 40) + mind) % 2, med = (() => { let s = 0; for (let i = 0; i < N; i++) s += sp(i); return s / N; })();
        // collisions within each side, by random pairs: turn the relative velocity
        for (let k = 0; k < N / 6; k++) {
          const i = R.int(0, N - 1), j = R.int(0, N - 1);
          if (i === j || (px[i] < wall) !== (px[j] < wall)) continue;
          const cx = (vx[i] + vx[j]) / 2, cy = (vy[i] + vy[j]) / 2, rx = (vx[i] - vx[j]) / 2, ry = (vy[i] - vy[j]) / 2, m = Math.hypot(rx, ry), a = R() * TAU;
          vx[i] = cx + Math.cos(a) * m; vy[i] = cy + Math.sin(a) * m; vx[j] = cx - Math.cos(a) * m; vy[j] = cy - Math.sin(a) * m;
        }
        for (let i = 0; i < N; i++) {
          let nx = px[i] + vx[i], ny = py[i] + vy[i];
          if (ny < 0.5 || ny > n - 1.5) { vy[i] = -vy[i]; ny = py[i] + vy[i]; }
          if (nx < 0.5 || nx > n - 1.5) { vx[i] = -vx[i]; nx = px[i] + vx[i]; }
          if ((px[i] < wall) !== (nx < wall)) {
            const fast = sp(i) > med, right = vx[i] > 0, pass = ny > gate[0] && ny < gate[1] && (flip ? (right ? !fast : fast) : (right ? fast : !fast));
            if (pass) open = 1; else { vx[i] = -vx[i]; nx = px[i] + vx[i]; }
          }
          px[i] = nx; py[i] = ny;
        }
        let sl = 0, nl = 0, sr = 0, nr = 0;
        for (let i = 0; i < N; i++) if (px[i] < wall) { sl += sp(i); nl++; } else { sr += sp(i); nr++; }
        const tl = X.shade(heat[Math.min(255, (sl / Math.max(1, nl)) / (med * 2.2) * 255) | 0], 0.32), tr = X.shade(heat[Math.min(255, (sr / Math.max(1, nr)) / (med * 2.2) * 255) | 0], 0.32);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x, base = x < wall ? tl : tr; d[i] = X.mixPk(base, d[i], 0.62); }
        for (let i = 0; i < N; i++) { const c = heat[Math.min(255, sp(i) / (med * 2.2) * 255) | 0]; X.rect(g, px[i] + 0.5 - grain / 2, py[i] + 0.5 - grain / 2, grain, grain, c); }
        open *= 0.8;
        for (let y = 0; y < n; y++) { const inGate = y > gate[0] && y < gate[1]; d[y * n + wall] = inGate ? X.mixPk(X.rgb(40, 40, 50), WHITE, open) : X.rgb(200, 200, 210); }
      };
      for (let k = 0; k < 300; k++) frame(k / 12);   // open with the demon well at work
      return t => frame(t + 25);
    },
  });

  add({
    interactive: 'Click to push the swarm on to its next state.',
    name: 'Swarmalators', seed: 2, sizes: [100, 200], fps: 12,
    recipe: 'Swarmalators: particles that both flock and keep time, attracting most those whose phase matches their own while their phases pull each other into step. Colour is phase. As two couplings slowly change, the swarm passes through a still rainbow ring, a pulsing blob, a ring of spinning beads and a frozen phase wave.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n >= 200 ? 250 : 200, lut = U.hueLut(R.bool(0.3) ? 100 : 85, 95), big = n >= 200, per = R.range(18, 26);
        const x = new Float32Array(N), y = new Float32Array(N), th = new Float32Array(N), w = new Float32Array(N), ax = new Float32Array(N), ay = new Float32Array(N), at = new Float32Array(N), CO = new Float64Array(N), SI = new Float64Array(N);
        for (let i = 0; i < N; i++) { const a = R() * TAU, r = Math.sqrt(R()) * 1.2; x[i] = Math.cos(a) * r; y[i] = Math.sin(a) * r; th[i] = R() * TAU; w[i] = R.gauss() * 0.15; }
        const states = R.shuffle([[1, 0], [1, -0.12], [1, -0.75], [0.1, 1], [0.6, -0.3]]);
        g.trait('Palette', lutName(lut)); g.trait('Swarm', N); g.trait('Trails', 'Medium'); g.trait('First state', ['Still ring', 'Pulsing blob', 'Spinning beads', 'Phase wave', 'Drifting'][states[0][0] === 1 ? [0, -0.12, -0.75].indexOf(states[0][1]) : states[0][0] === 0.1 ? 3 : 4]); g.trait('Grid', n);
        const step = (J, K, dt) => {
          ax.fill(0); ay.fill(0); at.fill(0);
          for (let i = 0; i < N; i++) { CO[i] = Math.cos(th[i]); SI[i] = Math.sin(th[i]); }   // phase differences by the angle-difference rule, no trig per pair
          for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
            const dx = x[j] - x[i], dy = y[j] - y[i], r2 = dx * dx + dy * dy + 1e-4, r = Math.sqrt(r2), c = CO[j] * CO[i] + SI[j] * SI[i], s = SI[j] * CO[i] - CO[j] * SI[i];
            const att = (1 + J * c) / r - 1 / r2;
            ax[i] += dx * att; ay[i] += dy * att; ax[j] -= dx * att; ay[j] -= dy * att;
            at[i] += K * s / r; at[j] -= K * s / r;
          }
          for (let i = 0; i < N; i++) { x[i] += ax[i] / N * dt; y[i] += ay[i] / N * dt; th[i] += (w[i] + at[i] / N) * dt; }
        };
        let skip = 0;
        const params = t => { const u = t / per + skip, k = Math.floor(u), f = U.smooth(U.clamp((u - k) * 4)), a = states[k % states.length], b = states[(k + 1) % states.length]; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; };
        for (let k = 0; k < 120; k++) { const [J, K] = params(0); step(J, K, 0.2); }
        let skipped = -9;
        const fr = t => {
          if (g.input.taps().length && t - skipped > 1) { skip = Math.floor(t / per + skip) + 1 - t / per + 0.0001; skipped = t; }
          const [J, K] = params(t);
          step(J, K, 0.2);
          let m = 0.5;
          for (let i = 0; i < N; i++) m = Math.max(m, Math.abs(x[i]), Math.abs(y[i]));
          const sc = n * 0.44 / m;
          U.fadePx(d, 0.72);
          for (let i = 0; i < N; i++) { const X0 = n / 2 + x[i] * sc, Y0 = n / 2 + y[i] * sc; if (X0 >= 0 && Y0 >= 0 && X0 < n - 1 && Y0 < n - 1) dot(d, n, X0, Y0, lut[(mod(th[i], TAU) / TAU * 256) | 0], true); }
        };
        for (let k = 0; k < 6; k++) fr(0);   // open with the trails already drawn
        return t => fr(t);
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, N = (n >= 200 ? 250 : 200) * R.pick([0.7, 1]) | 0, lut = R.bool(0.7) ? U.hueLut(R.bool(0.3) ? 100 : 85, 95) : U.scheme(R, 0).lut, big = n >= 200, per = R.range(18, 26), trail = R.pick([0.5, 0.72, 0.86]);
      let skip = 0;
      const x = new Float32Array(N), y = new Float32Array(N), th = new Float32Array(N), w = new Float32Array(N), ax = new Float32Array(N), ay = new Float32Array(N), at = new Float32Array(N), CO = new Float64Array(N), SI = new Float64Array(N);
      for (let i = 0; i < N; i++) { const a = R() * TAU, r = Math.sqrt(R()) * 1.2; x[i] = Math.cos(a) * r; y[i] = Math.sin(a) * r; th[i] = R() * TAU; w[i] = R.gauss() * 0.15; }
      const states = R.shuffle([[1, 0], [1, -0.12], [1, -0.75], [0.1, 1], [0.6, -0.3]]);
      g.trait('Palette', lutName(lut)); g.trait('Swarm', N); g.trait('Trails', ['Short', 'Medium', 'Long'][[0.5, 0.72, 0.86].indexOf(trail)]); g.trait('First state', ['Still ring', 'Pulsing blob', 'Spinning beads', 'Phase wave', 'Drifting'][states[0][0] === 1 ? [0, -0.12, -0.75].indexOf(states[0][1]) : states[0][0] === 0.1 ? 3 : 4]); g.trait('Grid', n);
      const step = (J, K, dt) => {
        ax.fill(0); ay.fill(0); at.fill(0);
        for (let i = 0; i < N; i++) { CO[i] = Math.cos(th[i]); SI[i] = Math.sin(th[i]); }
        for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
          const dx = x[j] - x[i], dy = y[j] - y[i], r2 = dx * dx + dy * dy + 1e-4, r = Math.sqrt(r2), c = CO[j] * CO[i] + SI[j] * SI[i], s = SI[j] * CO[i] - CO[j] * SI[i];
          const att = (1 + J * c) / r - 1 / r2;
          ax[i] += dx * att; ay[i] += dy * att; ax[j] -= dx * att; ay[j] -= dy * att;
          at[i] += K * s / r; at[j] -= K * s / r;
        }
        for (let i = 0; i < N; i++) { x[i] += ax[i] / N * dt; y[i] += ay[i] / N * dt; th[i] += (w[i] + at[i] / N) * dt; }
      };
      const params = t => { const u = t / per + skip, k = Math.floor(u), f = U.smooth(U.clamp((u - k) * 4)), a = states[k % states.length], b = states[(k + 1) % states.length]; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; };
      for (let k = 0; k < 120; k++) { const [J, K] = params(0); step(J, K, 0.2); }
      let skipped = -9;
      const fr = t => {
        if (inp.taps().length && t - skipped > 1) { skip = Math.floor(t / per + skip) + 1 - t / per + 0.0001; skipped = t; }
        const [J, K] = params(t);
        step(J, K, 0.2);
        let m = 0.5;
        for (let i = 0; i < N; i++) m = Math.max(m, Math.abs(x[i]), Math.abs(y[i]));
        const sc = n * 0.44 / m;
        U.fadePx(d, trail);
        for (let i = 0; i < N; i++) { const X0 = n / 2 + x[i] * sc, Y0 = n / 2 + y[i] * sc; if (X0 >= 0 && Y0 >= 0 && X0 < n - 1 && Y0 < n - 1) dot(d, n, X0, Y0, lut[(mod(th[i], TAU) / TAU * 256) | 0], true); }
      };
      for (let k = 0; k < 6; k++) fr(0);
      return t => fr(t);
    },
  });

  add({
    name: 'Polymers', seed: 5, sizes: [40, 50], fps: 10,
    recipe: 'A melt of coloured polymer chains on the grid, each one slithering like a snake: its head steps into a free neighbouring cell and its tail follows. The chains never cross, so they knot, jam and slide past each other, filling the frame with moving braids of colour, brightest at their heads.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, occ = new Int32Array(N).fill(-1), sc0 = U.scheme(R, 0.85), lut = sc0.lut, L = R.int(18, 36), target = R.range(0.42, 0.55), chains = [];
        const nbr = (i, k) => { const x = i % n, y = i / n | 0; return k === 0 ? y * n + (x + 1) % n : k === 1 ? y * n + (x + n - 1) % n : k === 2 ? ((y + 1) % n) * n + x : ((y + n - 1) % n) * n + x; };
        let filled = 0, tries = 0;
        while (filled < N * target && tries++ < 4000) {
          let c = R.int(0, N - 1); if (occ[c] >= 0) continue;
          const id = chains.length, cells = [c]; occ[c] = id;
          for (let k = 1; k < L; k++) { const opts = [0, 1, 2, 3].map(q => nbr(c, q)).filter(q => occ[q] < 0); if (!opts.length) break; c = R.pick(opts); occ[c] = id; cells.push(c); }
          chains.push({ cells, id, col: lut[(id * 97 + R.int(0, 30)) & 255] });
          filled += cells.length;
        }
        g.trait('Palette', schemeName(sc0)); g.trait('Chain length', few(L, 22, 30, ['Short', 'Medium', 'Long'])); g.trait('Chains', chains.length); g.trait('Melt', few(target, 0.46, 0.51, ['Loose', 'Packed', 'Dense'])); g.trait('Ground', 'Black'); g.trait('Grid', n);
        return () => {
          for (const ch of R.shuffle(chains.slice())) {
            if (R() < 0.15) continue;
            if (R() < 0.5) ch.cells.reverse();
            const head = ch.cells[ch.cells.length - 1], opts = [0, 1, 2, 3].map(q => nbr(head, q)).filter(q => occ[q] < 0 || q === ch.cells[0]);
            if (!opts.length) { ch.cells.reverse(); continue; }
            const nx = R.pick(opts), tail = ch.cells.shift();
            occ[tail] = -1; occ[nx] = ch.id; ch.cells.push(nx);
          }
          d.fill(BLACK);
          for (const ch of chains) { const k = ch.cells.length; ch.cells.forEach((c, j) => { d[c] = X.shade(ch.col, 0.45 + 0.55 * (j / (k - 1 || 1))); }); }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, N = n * n, occ = new Int32Array(N).fill(-1), sc0 = U.scheme(R, 0.6), lut = sc0.lut, L = R.pick([6, 12, 24, 36, 60]), target = R.range(0.35, 0.62), chains = [], bg = R.pick([BLACK, BLACK, X.rgb(16, 16, 22)]), hueStep = R.pick([97, 37, 13]);
      const nbr = (i, k) => { const x = i % n, y = i / n | 0; return k === 0 ? y * n + (x + 1) % n : k === 1 ? y * n + (x + n - 1) % n : k === 2 ? ((y + 1) % n) * n + x : ((y + n - 1) % n) * n + x; };
      let filled = 0, tries = 0;
      while (filled < N * target && tries++ < 4000) {
        let c = R.int(0, N - 1); if (occ[c] >= 0) continue;
        const id = chains.length, cells = [c]; occ[c] = id;
        for (let k = 1; k < L; k++) { const opts = [0, 1, 2, 3].map(q => nbr(c, q)).filter(q => occ[q] < 0); if (!opts.length) break; c = R.pick(opts); occ[c] = id; cells.push(c); }
        chains.push({ cells, id, col: lut[(id * hueStep + R.int(0, 30)) & 255] });
        filled += cells.length;
      }
      g.trait('Palette', schemeName(sc0)); g.trait('Chain length', { 6: 'Beads', 12: 'Short', 24: 'Medium', 36: 'Long', 60: 'Very long' }[L]); g.trait('Chains', chains.length); g.trait('Melt', few(target, 0.44, 0.53, ['Loose', 'Packed', 'Dense'])); g.trait('Ground', bg === BLACK ? 'Black' : 'Slate'); g.trait('Grid', n);
      return () => {
        for (const ch of R.shuffle(chains.slice())) {
          if (R() < 0.15) continue;
          if (R() < 0.5) ch.cells.reverse();
          const head = ch.cells[ch.cells.length - 1], opts = [0, 1, 2, 3].map(q => nbr(head, q)).filter(q => occ[q] < 0 || q === ch.cells[0]);
          if (!opts.length) { ch.cells.reverse(); continue; }
          const nx = R.pick(opts), tail = ch.cells.shift();
          occ[tail] = -1; occ[nx] = ch.id; ch.cells.push(nx);
        }
        d.fill(bg);
        for (const ch of chains) { const k = ch.cells.length; ch.cells.forEach((c, j) => { d[c] = X.shade(ch.col, 0.45 + 0.55 * (j / (k - 1 || 1))); }); }
      };
    },
  });

  add({
    interactive: 'Click to drop a dense burst of gas.',
    listens: 'Every clap drops a burst of gas that rings out across the lattice.',
    name: 'Lattice Gas', seed: 4, sizes: [100], fps: 12,
    recipe: 'A lattice gas: particles hop one cell a step in four directions and collide head-on by turning ninety degrees, nothing more. From those rules come sound: dense bursts dropped into the gas send square pressure waves out that cross, reflect off the white blocks and fade, coloured by the direction the gas flows.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, S = new Uint8Array(N), T = new Uint8Array(N), wall = new Uint8Array(N), lut = U.hueLut(R.bool(0.3) ? 100 : 85, 92), h0 = R.range(0, 256), bs = 4, G = n / bs, bx = new Float32Array(G * G), by = new Float32Array(G * G), bd = new Float32Array(G * G);
        for (let k = 0; k < R.int(2, 5); k++) { const w = R.int(3, n / 8), h = R.int(3, n / 8), x0 = R.int(0, n - w), y0 = R.int(0, n - h); for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) wall[y * n + x] = 1; }
        const rho = R.range(0.12, 0.2);
        BLK = () => { let c = 0; for (let i = 0; i < N; i++) if (wall[i] && !(i % n && wall[i - 1]) && !(i >= n && wall[i - n])) c++; return c; };
        g.trait('Palette', lutName(lut)); g.trait('Blocks', BLK()); g.trait('Gas', few(rho, 0.147, 0.173, ['Thin', 'Medium', 'Dense']));
        for (let i = 0; i < N; i++) if (!wall[i]) for (let b = 0; b < 4; b++) if (R() < rho) S[i] |= 1 << b;
        const burst = (px, py, Q = R) => { const r = Q.int(n / 14, n / 8), cx = px != null ? U.clamp(px, r, n - r) | 0 : Q.int(r, n - r), cy = py != null ? U.clamp(py, r, n - r) | 0 : Q.int(r, n - r); let added = 0; for (let y = cy - r; y < cy + r; y++) for (let x = cx - r; x < cx + r; x++) { const i = y * n + x; if (!wall[i] && Q() < 0.85) { added += 4 - BITS[S[i]]; S[i] = 15; } } leak(S, wall, n, added, cx, cy, r, Q); };
        burst();
        let next = R.range(5, 9);
        const step = () => {
          for (let i = 0; i < N; i++) { const v = S[i]; S[i] = wall[i] ? ((v & 3) << 2 | v >> 2) : v === 5 ? 10 : v === 10 ? 5 : v; }   // collide; walls send everything back
          T.fill(0);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const v = S[y * n + x]; if (!v) continue;
            if (v & 1) T[y * n + (x + 1) % n] |= 1;
            if (v & 2) T[((y + n - 1) % n) * n + x] |= 2;
            if (v & 4) T[y * n + (x + n - 1) % n] |= 4;
            if (v & 8) T[((y + 1) % n) * n + x] |= 8;
          }
          S.set(T);
        };
        const rm = room(g.input);
        return (t, dt) => {
          let tc = 0;
          for (const tp of g.input.taps()) if (tc++ < 4) burst(tp.x * n, tp.y * n, g.alt);
          if (rm.read().beats) burst(g.alt.range(0.15, 0.85) * n, g.alt.range(0.15, 0.85) * n, g.alt);
          next -= dt; if (next <= 0) { burst(); next = R.range(6, 11); }
          step(); calm(S, wall, N, R);
          bx.fill(0); by.fill(0); bd.fill(0);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = S[y * n + x], b = (y / bs | 0) * G + (x / bs | 0); bx[b] += (v & 1) - (v >> 2 & 1); by[b] += (v >> 3 & 1) - (v >> 1 & 1); bd[b] += (v & 1) + (v >> 1 & 1) + (v >> 2 & 1) + (v >> 3 & 1); }
          gasOut(g, S, wall, bx, by, bd, bs, G, rho, lut, h0);
        };
      };
      if (g.home || g.alt() < 0.45) return og(R, U, g);   // the original look on 45% of rolls, new looks otherwise
      const { n, d } = g, N = n * n, S = new Uint8Array(N), T = new Uint8Array(N), wall = new Uint8Array(N), lut0 = U.hueLut(R.bool(0.3) ? 100 : 85, 92), lut = g.alt.bool(0.4) ? U.scheme(g.alt, 0).lut : lut0, h0 = R.range(0, 256), bs = 4, G = n / bs, bx = new Float32Array(G * G), by = new Float32Array(G * G), bd = new Float32Array(G * G);
      for (let k = 0; k < R.int(2, 5); k++) { const w = R.int(3, n / 8), h = R.int(3, n / 8), x0 = R.int(0, n - w), y0 = R.int(0, n - h); for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) wall[y * n + x] = 1; }
      const rho = R.range(0.12, 0.2);
      BLK = () => { let c = 0; for (let i = 0; i < N; i++) if (wall[i] && !(i % n && wall[i - 1]) && !(i >= n && wall[i - n])) c++; return c; };
      g.trait('Palette', lutName(lut)); g.trait('Blocks', BLK()); g.trait('Gas', few(rho, 0.147, 0.173, ['Thin', 'Medium', 'Dense']));
      for (let i = 0; i < N; i++) if (!wall[i]) for (let b = 0; b < 4; b++) if (R() < rho) S[i] |= 1 << b;
      const burst = (px, py) => { const r = R.int(n / 14, n / 8), cx = px != null ? U.clamp(px, r, n - r) | 0 : R.int(r, n - r), cy = py != null ? U.clamp(py, r, n - r) | 0 : R.int(r, n - r); let added = 0; for (let y = cy - r; y < cy + r; y++) for (let x = cx - r; x < cx + r; x++) { const i = y * n + x; if (!wall[i] && R() < 0.85) { added += 4 - BITS[S[i]]; S[i] = 15; } } leak(S, wall, n, added, cx, cy, r, R); };
      burst();
      let next = R.range(5, 9);
      const step = () => {
        for (let i = 0; i < N; i++) { const v = S[i]; S[i] = wall[i] ? ((v & 3) << 2 | v >> 2) : v === 5 ? 10 : v === 10 ? 5 : v; }   // collide; walls send everything back
        T.fill(0);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const v = S[y * n + x]; if (!v) continue;
          if (v & 1) T[y * n + (x + 1) % n] |= 1;
          if (v & 2) T[((y + n - 1) % n) * n + x] |= 2;
          if (v & 4) T[y * n + (x + n - 1) % n] |= 4;
          if (v & 8) T[((y + 1) % n) * n + x] |= 8;
        }
        S.set(T);
      };
      const rm = room(g.input);
      return (t, dt) => {
        let tc = 0;
        for (const tap of g.input.taps()) if (tc++ < 4) burst(tap.x * n, tap.y * n);
        if (rm.read().beats) burst(g.alt.range(0.15, 0.85) * n, g.alt.range(0.15, 0.85) * n);
        next -= dt; if (next <= 0) { burst(); next = R.range(6, 11); }
        step(); calm(S, wall, N, R);
        bx.fill(0); by.fill(0); bd.fill(0);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = S[y * n + x], b = (y / bs | 0) * G + (x / bs | 0); bx[b] += (v & 1) - (v >> 2 & 1); by[b] += (v >> 3 & 1) - (v >> 1 & 1); bd[b] += (v & 1) + (v >> 1 & 1) + (v >> 2 & 1) + (v >> 3 & 1); }
        gasOut(g, S, wall, bx, by, bd, bs, G, rho, lut, h0);
      };
    },
  });

  add({
    interactive: 'Move the pointer: the field points toward it like a magnet.',
    listens: 'The music drives the magnet: loud passages chain the beads, beats twist the field.',
    name: 'Ferrofluid', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'Magnetic beads in a liquid under a field that slowly turns and pulses. Each pair attracts end to end along the field and repels side by side, so the beads string themselves into chains that follow the field round, break when it fades and knit again; each bead is coloured by the direction of its chain.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n >= 200 ? 900 : 380, sg = n / R.range(38, 48), rc = sg * 2.6, lut = U.hueLut(R.bool(0.3) ? 100 : 88, 96), h0 = R.range(0, 256), w = R.range(0.03, 0.07) * R.sign(), per = R.range(24, 36), big = n >= 100;
        g.trait('Palette', lutName(lut)); g.trait('Beads', N); g.trait('Bead size', 'Medium'); g.trait('Field turns', w > 0 ? 'Clockwise' : 'Anticlockwise'); g.trait('Loose beads', 'Grey'); g.trait('Field starts', 'East'); g.trait('Grid', n);
        const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), ang = new Float32Array(N), bond = new Float32Array(N), B = buckets(n, rc, N);
        for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; }
        const fs = ferroStep(n, N, sg, rc, B, px, py, vx, vy, ang, bond), step = (fa, s) => fs(fa, s, R, g.input);
        const strength = t => 0.15 + 0.85 * Math.pow(0.5 + 0.5 * Math.sin(t / per * Math.PI * 2), 0.6);
        for (let k = 0; k < 200; k++) step(k / 12 * w, strength(k / 12));
        const rm = room(g.input);
        let kick = 0;
        return t => {
          const tt = t + 200 / 12;
          rm.read(); kick = rm.beats ? 1 : kick * 0.8;
          step(tt * w + kick * 0.5, g.input.inside ? 1 : rm.on ? U.clamp(0.1 + rm.lvl * 1.6 + kick * 0.5) : strength(tt));
          U.fadePx(d, 0.45);
          for (let i = 0; i < N; i++) { const c = bond[i] ? lut[(h0 + ang[i] / Math.PI * 256) & 255] : X.rgb(70, 70, 84); dot(d, n, px[i], py[i], c, big); }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = Math.round((n >= 200 ? 900 : 380) * R.pick([0.7, 1, 1.3])), sg = n / R.range(34, 52), rc = sg * 2.6, lut0 = U.hueLut(R.bool(0.3) ? 100 : 88, 96), lut = g.alt.bool(0.4) ? U.scheme(g.alt, 0).lut : lut0, loose = g.alt.pick([X.rgb(70, 70, 84), X.rgb(70, 70, 84), BLACK, X.rgb(150, 150, 165)]), h0 = R.range(0, 256), w = R.range(0.03, 0.07) * R.sign(), per = R.range(24, 36), big = n >= 100;
      g.trait('Palette', lutName(lut)); g.trait('Beads', N); g.trait('Bead size', few(n / sg, 40, 46, ['Large', 'Medium', 'Small'])); g.trait('Field turns', w > 0 ? 'Clockwise' : 'Anticlockwise'); g.trait('Loose beads', loose === BLACK ? 'Hidden' : loose === X.rgb(70, 70, 84) ? 'Grey' : 'Silver'); g.trait('Grid', n);
      const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), ang = new Float32Array(N), bond = new Float32Array(N), B = buckets(n, rc, N);
      for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; }
      const fs = ferroStep(n, N, sg, rc, B, px, py, vx, vy, ang, bond), step = (fa, s) => fs(fa, s, R, inp);
      const strength = t => 0.15 + 0.85 * Math.pow(0.5 + 0.5 * Math.sin(t / per * Math.PI * 2), 0.6);
      const a0 = g.alt.pick([0, 0, Math.PI / 4, Math.PI / 2, Math.PI * 3 / 4]);   // the field's starting direction
      g.trait('Field starts', ['East', 'East', 'North-east', 'North', 'North-west'][[0, 0, Math.PI / 4, Math.PI / 2, Math.PI * 3 / 4].indexOf(a0)]);
      for (let k = 0; k < 200; k++) step(a0 + k / 12 * w, strength(k / 12));
      const rm = room(inp);
      let kick = 0;
      return t => {
        const tt = t + 200 / 12;
        rm.read(); kick = rm.beats ? 1 : kick * 0.8;
        step(a0 + tt * w + kick * 0.5, inp.inside ? 1 : rm.on ? U.clamp(0.1 + rm.lvl * 1.6 + kick * 0.5) : strength(tt));
        U.fadePx(d, 0.45);
        for (let i = 0; i < N; i++) { const c = bond[i] ? lut[(h0 + ang[i] / Math.PI * 256) & 255] : loose; if (c !== BLACK) dot(d, n, px[i], py[i], c, big); }
      };
    },
  });
})();
