// Set 5 · Lasers: beams of light on black, added together so crossings burn
// white. Every beam is rasterised cell by cell; mirrors, splitters, guides and
// scanners decide where the light goes.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Lasers' }, def));
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

  // An additive light buffer: beams add colour, fade() leaves an afterglow, and
  // flush() maps it to the grid so strong overlaps run to white.
  function light(n) {
    const N = n * n, r = new Float32Array(N), gr = new Float32Array(N), b = new Float32Array(N);
    const L = {
      n, r, g: gr, b,
      fade(k) { for (let i = 0; i < N; i++) { r[i] *= k; gr[i] *= k; b[i] *= k; } },
      clear() { r.fill(0); gr.fill(0); b.fill(0); },
      add(x, y, c, a) {
        x |= 0; y |= 0;
        if (x < 0 || y < 0 || x >= n || y >= n) return;
        const i = y * n + x; r[i] += c[0] * a; gr[i] += c[1] * a; b[i] += c[2] * a;
      },
      // a beam: a bright core with a faint halo either side
      // skip: leave out the first cell, so a path drawn as a chain of beams has no doubled joints
      beam(x0, y0, x1, y1, c, a, halo = 0.18, skip = false) {
        if (!(x0 > -1e4 && x0 < 1e4 && y0 > -1e4 && y0 < 1e4 && x1 > -1e4 && x1 < 1e4 && y1 > -1e4 && y1 < 1e4)) { L.bad = (L.bad || 0) + 1; return; }   // never trace a runaway line
        x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
        const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, steep = dx < -dy;
        let err = dx + dy, guard = 4 * n + dx - dy;
        for (;;) {
          if (skip) skip = false;
          else {
            L.add(x0, y0, c, a);
            if (halo) { if (steep) { L.add(x0 - 1, y0, c, a * halo); L.add(x0 + 1, y0, c, a * halo); } else { L.add(x0, y0 - 1, c, a * halo); L.add(x0, y0 + 1, c, a * halo); } }
          }
          if ((x0 === x1 && y0 === y1) || guard-- < 0) break;
          const e2 = 2 * err;
          if (e2 >= dy) { err += dy; x0 += sx; }
          if (e2 <= dx) { err += dx; y0 += sy; }
        }
      },
      flush(d) {
        for (let i = 0; i < N; i++) {
          let R0 = r[i], G0 = gr[i], B0 = b[i];
          if (R0 > 255 || G0 > 255 || B0 > 255) {   // past full, spill toward white
            const m = R0 > G0 ? (R0 > B0 ? R0 : B0) : (G0 > B0 ? G0 : B0), w = m > 655 ? 1 : (m - 255) / 400;
            R0 = R0 >= 255 ? 255 : R0 + (255 - R0) * w; G0 = G0 >= 255 ? 255 : G0 + (255 - G0) * w; B0 = B0 >= 255 ? 255 : B0 + (255 - B0) * w;
          }
          d[i] = 0xff000000 | B0 << 16 | G0 << 8 | R0;
        }
      },
    };
    return L;
  }
  // a plate of brushed metal: faint horizontal grain round its base colour
  const brush = (c, n) => {
    const out = new Uint32Array(n * n), h = (a, b) => { let v = Math.imul(a, 374761393) + Math.imul(b, 668265263) | 0; v = Math.imul(v ^ v >>> 13, 1274126177); return ((v ^ v >>> 16) >>> 0) / 4294967296; };
    for (let y = 0; y < n; y++) { const row = h(y, 7) * 0.12; for (let x = 0; x < n; x++) out[y * n + x] = X.shade(c, 0.92 + row + h(y, x >> 3) * 0.08); }
    return out;
  };
  // a fibre junction: a small dim knot at rest; a crossing packet lights it as a cross, then a block
  const junction = (g, x, y, f) => {
    const v = 70 + 185 * f, c = X.rgb(v, v, v + (255 - v) * 0.2);
    if (f > 0.45) X.rect(g, x - 1, y - 1, 3, 3, c);
    else { X.put(g, x, y, X.rgb(v + 20, v + 22, v + 40)); const e = f > 0.12 ? c : X.rgb(44, 46, 60); X.put(g, x - 1, y, e); X.put(g, x + 1, y, e); X.put(g, x, y - 1, e); X.put(g, x, y + 1, e); }
  };
  // a mirror cell: dim while no light falls on it, glinting toward white where a beam strikes
  const HALF = X.rgb(80, 86, 104), FULL = X.rgb(165, 165, 180);
  const glint = (c, L, i) => { const e = L.r[i] + L.g[i] + L.b[i]; return e < 60 ? X.shade(c, 0.62) : X.mixPk(X.shade(c, 1.15), WHITE, Math.min(0.85, (e - 60) / 500)); };
  // Listen for a laser show: the clock of a piece that steps through figures every
  // `hold` seconds, where a beat (once the last change has settled) skips to the
  // next figure; `size` and `flash` follow the loudness and the beats
  function beatLive(inp) {
    let skip = 0, last = 0;
    const f = (t, hold) => {
      const dt = Math.max(0, t - last); last = t;
      f.flash *= Math.pow(0.15, dt);
      if (inp.listening) {
        const b = inp.beats(), u = t / hold + skip;
        if (b) { f.flash = Math.min(1.2, f.flash + 0.7); if (u - Math.floor(u) > 0.32) skip += Math.ceil(u) - u; }
        f.size += (1 + 0.28 * inp.level - f.size) * Math.min(1, dt * 6);
      } else f.size += (1 - f.size) * Math.min(1, dt * 3);
      return t / hold + skip;
    };
    f.flash = 0; f.size = 1;
    return f;
  }
  // one row of lit haze: each sheet's haze quantised to lv steps through a 4 x 4 dither,
  // its colours added; and the floor below the horizon, a dark striped reflection
  const DTH = Float32Array.from({ length: 16 }, (_, i) => X.dith4(i & 3, i >> 2) * 0.9);
  function skyRow(d, n, y, V, K, lv, fadeZ, cols) {
    const row = (y & 3) * 4;
    for (let x = 0, i = y * n; x < n; x++, i++) {
      const th = DTH[row + (x & 3)], xb = x >> 1;
      let r = 0, gg = 0, b = 0;
      for (let k = 0; k < K; k++) {
        let q = Math.floor(V[k][xb] * lv + th) / lv;
        if (q <= 0) continue;
        if (q > 1) q = 1;
        const a = q * fadeZ, c = cols[k];
        r += c[0] * a; gg += c[1] * a; b += c[2] * a;
      }
      d[i] = (0xff000000 | (b > 255 ? 255 : b) << 16 | (gg > 255 ? 255 : gg) << 8 | (r > 255 ? 255 : r)) >>> 0;
    }
  }
  function skyFloor(d, n, hz) {
    d.fill(X.rgb(240, 240, 255), hz * n, hz * n + n);
    for (let y = hz + 1; y < n; y++) {
      if ((y - hz) % 2) { d.fill(BLACK, y * n, y * n + n); continue; }
      const src = (2 * hz - y) * n;
      for (let x = 0; x < n; x++) { const m = src >= 0 ? d[src + x] : BLACK; d[y * n + x] = X.shade(m, 0.18); }
    }
  }
  // Listen for a haze piece: its own clock runs faster with loudness (and is exactly
  // the time while nobody listens); `gain` lifts the haze with the level and each beat
  function hazeLive(inp) {
    let tt = 0, last = 0, flash = 0, lvl = 0;
    const f = t => {
      const dt = Math.max(0, t - last); last = t;
      if (!inp.listening) { tt += dt; flash = 0; lvl = 0; f.gain = 1; return tt; }
      lvl += (inp.level - lvl) * Math.min(1, dt * 5);
      const b = inp.beats(); if (b) flash = Math.min(1, flash + 0.6 * b);
      flash *= Math.pow(0.08, dt);
      tt += dt * (1 + 2.4 * lvl);
      f.gain = 1 + 0.7 * lvl + 0.8 * flash;
      return tt;
    };
    f.gain = 1;
    return f;
  }
  // beam colours: saturated hues that still whiten when they pile up
  const beamCols = (R, k) => { const sc = U.scheme(R, 0.55), o = R(); return Array.from({ length: k }, (_, i) => U.ramp(sc.cols, o + i / k, true)).map(c => { const m = Math.max(c[0], c[1], c[2]) || 1; return [c[0] * 255 / m, c[1] * 255 / m, c[2] * 255 / m]; }); };

  add({
    name: 'Splitters', seed: 4, sizes: [50, 80], fps: 12,
    interactive: 'Click a cell to place a mirror, click again to turn it, a third time to clear it.',
    recipe: 'Lasers enter a grid scattered with half-silvered and full mirrors. At each half mirror a beam splits in two, one part passing and one turning, so the light branches into a circuit of ever fainter lines with pulses running along them. Now and then a mirror turns and the whole network rewires.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), N = n * n, E = new Uint8Array(N), cols = beamCols(R, 3), dens = R.range(0.022, 0.04), full = R.range(0.15, 0.35);
        g.trait('Palette', palName(cols)); g.trait('Mirrors', dens < 0.026 ? 'Sparse' : dens < 0.036 ? 'Scattered' : 'Crowded'); g.trait('Silvering', full < 0.22 ? 'Mostly half' : full < 0.36 ? 'Mixed' : 'Mostly full'); g.trait('Frames', 'Steel'); g.trait('Grid', n);
        const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1], SLASH = [3, 2, 1, 0], BACK = [1, 0, 3, 2];
        for (let i = 0; i < N; i++) if (R() < dens) E[i] = (R() < full ? 3 : 1) + (R() < 0.5 ? 0 : 1);
        const srcs = Array.from({ length: R.int(3, 5) }, (_, k) => { const side = R.int(0, 3), p = R.int(2, n - 3); return side === 0 ? [0, p, 0, k % 3] : side === 1 ? [p, 0, 1, k % 3] : side === 2 ? [n - 1, p, 2, k % 3] : [p, n - 1, 3, k % 3]; });
        g.trait('Lasers', srcs.length);
        const seen = new Uint8Array(N * 4), sp = R.range(5, 10);
        let turn = 0;
        return (t, dt) => {
          turn += dt;
          for (const tap of g.input.taps()) { const i = Math.min(n - 1, tap.y * n | 0) * n + Math.min(n - 1, tap.x * n | 0); E[i] = E[i] === 0 ? 3 : E[i] === 3 ? 4 : E[i] === 4 ? 1 : E[i] === 1 ? 2 : 0; turn = -4; }
          if (turn > 1.1) { turn = 0; let i; do i = R.int(0, N - 1); while (!E[i] && R() < 0.995); if (E[i]) E[i] = E[i] % 2 ? E[i] + 1 : E[i] - 1; }
          L.fade(0.45); seen.fill(0);
          const stack = srcs.map(([x, y, dir, k]) => [x, y, dir, 1, 0, k]);
          let guard = 0;
          while (stack.length && guard++ < 6000) {
            let [x, y, dir, I, s, k] = stack.pop();
            for (;;) {
              if (x < 0 || y < 0 || x >= n || y >= n || I < 0.04) break;
              const i = y * n + x, key = i * 4 + dir;
              if (seen[key]) break;
              seen[key] = 1;
              const pulse = 0.45 + 0.55 * Math.pow(Math.max(0, Math.cos((s - t * sp) * 0.3)), 6);
              L.add(x, y, cols[k], 1.5 * Math.sqrt(I) * pulse);
              const e = E[i];
              if (e) {
                const turned = e <= 2 ? (e === 1 ? SLASH[dir] : BACK[dir]) : (e === 3 ? SLASH[dir] : BACK[dir]);
                if (e <= 2) { stack.push([x + DX[turned], y + DY[turned], turned, I * 0.5, s + 1, k]); I *= 0.5; }
                else dir = turned;
              }
              x += DX[dir]; y += DY[dir]; s++;
            }
          }
          L.flush(d);
          for (let i = 0; i < N; i++) if (E[i]) d[i] = glint(E[i] <= 2 ? HALF : FULL, L, i);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, L = light(n), N = n * n, E = new Uint8Array(N), cols = beamCols(R, R.int(2, 4)), dens = R.range(0.015, 0.05), full = R.range(0.1, 0.5);
      const mirrorCol = R.pick([[80, 86, 104, 165, 165, 180], [70, 50, 40, 220, 190, 120], [40, 80, 70, 160, 230, 210]]), mHalf = X.rgb(mirrorCol[0], mirrorCol[1], mirrorCol[2]), mFull = X.rgb(mirrorCol[3], mirrorCol[4], mirrorCol[5]);
      g.trait('Palette', palName(cols)); g.trait('Mirrors', dens < 0.026 ? 'Sparse' : dens < 0.036 ? 'Scattered' : 'Crowded'); g.trait('Silvering', full < 0.22 ? 'Mostly half' : full < 0.36 ? 'Mixed' : 'Mostly full'); g.trait('Frames', ['Steel', 'Brass', 'Jade'][mirrorCol[0] === 80 ? 0 : mirrorCol[0] === 70 ? 1 : 2]); g.trait('Grid', n);
      const DX = [1, 0, -1, 0], DY = [0, 1, 0, -1], SLASH = [3, 2, 1, 0], BACK = [1, 0, 3, 2];
      for (let i = 0; i < N; i++) if (R() < dens) E[i] = (R() < full ? 3 : 1) + (R() < 0.5 ? 0 : 1);
      const srcs = Array.from({ length: R.int(2, 6) }, (_, k) => { const side = R.int(0, 3), p = R.int(2, n - 3), c = k % cols.length; return side === 0 ? [0, p, 0, c] : side === 1 ? [p, 0, 1, c] : side === 2 ? [n - 1, p, 2, c] : [p, n - 1, 3, c]; });
      g.trait('Lasers', srcs.length);
      const seen = new Uint8Array(N * 4), sp = R.range(5, 10);
      let turn = 0;
      return (t, dt) => {
        turn += dt;
        for (const tap of inp.taps()) { const i = Math.min(n - 1, tap.y * n | 0) * n + Math.min(n - 1, tap.x * n | 0); E[i] = E[i] === 0 ? 3 : E[i] === 3 ? 4 : E[i] === 4 ? 1 : E[i] === 1 ? 2 : 0; turn = -4; }
        if (turn > 1.1) { turn = 0; let i; do i = R.int(0, N - 1); while (!E[i] && R() < 0.995); if (E[i]) E[i] = E[i] % 2 ? E[i] + 1 : E[i] - 1; }
        L.fade(0.45); seen.fill(0);
        const stack = srcs.map(([x, y, dir, k]) => [x, y, dir, 1, 0, k]);
        let guard = 0;
        while (stack.length && guard++ < 6000) {
          let [x, y, dir, I, s, k] = stack.pop();
          for (;;) {
            if (x < 0 || y < 0 || x >= n || y >= n || I < 0.04) break;
            const i = y * n + x, key = i * 4 + dir;
            if (seen[key]) break;
            seen[key] = 1;
            const pulse = 0.45 + 0.55 * Math.pow(Math.max(0, Math.cos((s - t * sp) * 0.3)), 6);
            L.add(x, y, cols[k], 1.5 * Math.sqrt(I) * pulse);
            const e = E[i];
            if (e) {
              const turned = e <= 2 ? (e === 1 ? SLASH[dir] : BACK[dir]) : (e === 3 ? SLASH[dir] : BACK[dir]);
              if (e <= 2) { stack.push([x + DX[turned], y + DY[turned], turned, I * 0.5, s + 1, k]); I *= 0.5; }
              else dir = turned;
            }
            x += DX[dir]; y += DY[dir]; s++;
          }
        }
        L.flush(d);
        for (let i = 0; i < N; i++) if (E[i]) d[i] = glint(E[i] <= 2 ? mHalf : mFull, L, i);
      };
    },
  });

  add({
    name: 'Billiard Beam', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Point to aim the beam from where it starts.',
    recipe: 'One beam trapped in a mirrored square or a round mirror, bouncing sixty times and shifting colour at every wall. Its angle turns very slowly, so the path keeps closing into woven lattices or star polygons whenever it passes a simple fraction, then dissolving into a fine weave again.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), cols = beamCols(R, 8), K = n >= 200 ? 70 : 55, x0 = R.range(0.2, 0.8) * (n - 1), y0 = R.range(0.2, 0.8) * (n - 1), a0 = R.range(0, TAU), w = R.range(0.004, 0.01) * R.sign(), dh = R.range(0.4, 1.2);
        g.trait('Palette', palName(cols)); g.trait('Table', 'Square'); g.trait('Bounces', K); g.trait('Afterglow', 'Medium'); g.trait('Grid', n);
        return t => {
          L.fade(0.55);
          const a = g.input.inside ? Math.atan2(g.input.y * n - y0, g.input.x * n - x0) : a0 + t * w, M = n - 1;
          let x = x0, y = y0, vx = Math.cos(a), vy = Math.sin(a);
          for (let k = 0; k < K; k++) {
            const tx = vx > 0 ? (M - x) / vx : vx < 0 ? -x / vx : Infinity, ty = vy > 0 ? (M - y) / vy : vy < 0 ? -y / vy : Infinity, s = Math.min(tx, ty);
            if (!isFinite(s)) break;
            const nx = x + vx * s, ny = y + vy * s;
            L.beam(x, y, nx, ny, cols[Math.floor(k * dh) % cols.length], 0.55 * Math.pow(0.975, k), 0.12);
            x = nx; y = ny;
            if (tx <= ty) vx = -vx; if (ty <= tx) vy = -vy;
          }
          L.flush(d);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, L = light(n), cols = beamCols(R, R.int(3, 8)), K = (n >= 200 ? 70 : 55) * R.pick([0.6, 1, 1.4]) | 0, round = R.bool(0.4), x0 = R.range(0.3, 0.7) * (n - 1), y0 = R.range(0.3, 0.7) * (n - 1), a0 = R.range(0, TAU), w = R.range(0.004, 0.01) * R.sign(), dh = R.range(0.4, 1.2), afterglow = R.pick([0.3, 0.55, 0.75]);
      g.trait('Palette', palName(cols)); g.trait('Table', round ? 'Round' : 'Square'); g.trait('Bounces', K); g.trait('Afterglow', ['Short', 'Medium', 'Long'][[0.3, 0.55, 0.75].indexOf(afterglow)]); g.trait('Grid', n);
      const cx = (n - 1) / 2, cy0 = (n - 1) / 2, Rr = (n - 1) / 2 - 0.5;
      return t => {
        L.fade(afterglow);
        const M = n - 1, a = inp.inside ? Math.atan2(inp.y * n - y0, inp.x * n - x0) : a0 + t * w;
        let x = x0, y = y0, vx = Math.cos(a), vy = Math.sin(a);
        if (round) {
          for (let k = 0; k < K; k++) {
            // chord to the circle, then mirror the direction in the radius
            const ox = x - cx, oy = y - cy0, b = ox * vx + oy * vy, c = ox * ox + oy * oy - Rr * Rr, s = -b + Math.sqrt(Math.max(0, b * b - c));
            const nx = x + vx * s, ny = y + vy * s;
            L.beam(x, y, nx, ny, cols[Math.floor(k * dh) % cols.length], 0.55 * Math.pow(0.975, k), 0.12);
            const rl = Math.hypot(nx - cx, ny - cy0) || 1, ux = (nx - cx) / rl, uy = (ny - cy0) / rl, dot = vx * ux + vy * uy;
            vx -= 2 * dot * ux; vy -= 2 * dot * uy;
            const vl = Math.hypot(vx, vy) || 1; vx /= vl; vy /= vl;   // keep it a unit step, and on the mirror
            x = cx + ux * (Rr - 0.01); y = cy0 + uy * (Rr - 0.01);
          }
          for (let k = 0; k < 360; k++) L.add(cx + Math.cos(k / 360 * TAU) * (Rr + 1), cy0 + Math.sin(k / 360 * TAU) * (Rr + 1), [120, 130, 160], 0.15);
          L.flush(d);
          return;
        }
        for (let k = 0; k < K; k++) {
          const tx = vx > 0 ? (M - x) / vx : vx < 0 ? -x / vx : Infinity, ty = vy > 0 ? (M - y) / vy : vy < 0 ? -y / vy : Infinity, s = Math.min(tx, ty);
          if (!isFinite(s)) break;
          const nx = x + vx * s, ny = y + vy * s;
          L.beam(x, y, nx, ny, cols[Math.floor(k * dh) % cols.length], 0.55 * Math.pow(0.975, k), 0.12);
          x = nx; y = ny;
          if (tx <= ty) vx = -vx; if (ty <= tx) vy = -vy;
        }
        L.flush(d);
      };
    },
  });

  add({
    name: 'Laser Harp', seed: 3, sizes: [100], fps: 12, music: true,
    interactive: 'Sweep across the beams or tap them to pluck; the harp plays on by itself when you stop.',
    listens: 'Claps and beats pluck the strings; loudness brightens the beams.',
    recipe: 'A harp of laser beams, fanned from one point on the floor or standing in a row. A slow melody plucks them one at a time: the plucked beam flares, swings in a standing wave and settles, its colour set by its note round the circle of fifths. With sound on, every pluck is a note.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), S = R.int(9, 13), sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256), ox = n / 2, oy = n - 3, spread = R.range(0.8, 0.95), beat = R.range(0.35, 0.6);
        const strings = Array.from({ length: S }, (_, i) => { const u = i / (S - 1), c = lut[(h0 + (i * 7 % 12) / 12 * 256) & 255]; return { tx: n / 2 + (u - 0.5) * n * spread, amp: 0, ph: 0, col: [c & 255, c >> 8 & 255, c >> 16 & 255] }; });
        let cur = R.int(0, S - 1), next = 0;
        // sound: each string a note of one scale, low to high; plucks by the melody or by the pointer
        const inp = g.input, snd = g.sound, scales = [[0, 2, 4, 7, 9], [0, 2, 3, 7, 8], [0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 9, 10]], sc = g.alt.pick(scales), root = g.alt.int(48, 55), wave = g.alt.pick(['triangle', 'triangle', 'square', 'sine']), cutoff = g.alt.range(1200, 3200);
        const noteOf = i => root + 12 * Math.floor(i / sc.length) + sc[i % sc.length];
        g.trait('Palette', schemeName(sc0)); g.trait('Strings', S); g.trait('Layout', 'Fan'); g.trait('Scale', ['Pentatonic', 'Hirajoshi', 'Major', 'Dorian'][scales.indexOf(sc)]); g.trait('Tone', wave[0].toUpperCase() + wave.slice(1));
        const xAt = (s, y) => ox + (s.tx - ox) * (oy - y) / (oy - 1);
        const pluck = (i, t, vel) => { strings[i].amp = 1; strings[i].ph = t; snd.note(noteOf(i), { dur: 1.4, vel, wave, cutoff, pan: (i / (S - 1) - 0.5) * 1.2 }); };
        let idle = 99, lastX = null, glow = 0;
        return (t, dt) => {
          idle += dt;
          if (inp.inside) {
            const px = inp.x * n, py = inp.y * n;
            if (lastX != null && Math.abs(px - lastX) > 0.2) for (let i = 0; i < S; i++) { const xb = xAt(strings[i], py); if ((xb - lastX) * (xb - px) < 0 && strings[i].amp < 0.6) { pluck(i, t, 0.5); idle = 0; } }
            lastX = px;
          } else lastX = null;
          let tc = 0;
          for (const tap of inp.taps()) { if (tc++ >= 3) continue; let best = 0, bd = 1e9; strings.forEach((s, i) => { const dd = Math.abs(xAt(s, tap.y * n) - tap.x * n); if (dd < bd) { bd = dd; best = i; } }); pluck(best, t, 0.55); idle = 0; }
          // Listen: every clap or beat in the room plucks the next string of the tune
          glow = inp.listening ? glow * 0.7 + inp.level * 0.3 : 0;
          if (inp.listening) { const b = inp.beats(); if (b) { cur = U.clamp(cur + g.alt.pick([-2, -1, 1, 1, 2, 3, -3]), 0, S - 1) | 0; pluck(cur, t, 0.45); if (b > 1) pluck(U.clamp(cur + 2, 0, S - 1), t, 0.3); idle = 1.5; } }
          next -= dt;
          if (next <= 0 && idle > 3) { next = beat * R.pick([1, 1, 1, 2]); cur = U.clamp(cur + R.pick([-2, -1, -1, 1, 1, 2, 3, -3]), 0, S - 1) | 0; strings[cur].amp = 1; strings[cur].ph = t; snd.note(noteOf(cur), { dur: 1.4, vel: 0.38, wave, cutoff, pan: (cur / (S - 1) - 0.5) * 1.2 }); }
          L.fade(0.5);
          for (const s of strings) {
            s.amp *= 0.965;
            const A = s.amp * n * 0.035, I = 0.28 + 0.9 * s.amp + glow * 0.45;
            let px = ox, py = oy;
            for (let k = 1; k <= 24; k++) {
              const u = k / 24, x = ox + (s.tx - ox) * u + A * Math.sin(Math.PI * u) * Math.sin((t - s.ph) * 7), y = oy + (1 - oy) * u;
              L.beam(px, py, x, y, s.col, I, 0.25 * s.amp + 0.08, k > 1);
              px = x; py = y;
            }
            L.add(s.tx, 1, s.col, 0.6 + s.amp);
          }
          for (let x = 0; x < n; x++) L.add(x, n - 2, [255, 255, 255], 0.1);
          L.flush(d);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, snd = g.sound, L = light(n), S = R.int(7, 13), sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256);
      const layout = R.pick(['fan', 'fan', 'row', 'arch']), ox = n / 2, oy = n - 3, spread = R.range(0.75, 0.95), beat = R.range(0.3, 0.6), sway = R.range(5, 9);
      const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], penta: [0, 2, 4, 7, 9], dorian: [0, 2, 3, 5, 7, 9, 10], hira: [0, 2, 3, 7, 8] };
      const scale = SCALES[R.pick(Object.keys(SCALES))], root = R.int(48, 57), wave = R.pick(['triangle', 'triangle', 'square', 'sawtooth', 'sine']), cutoff = R.range(1200, 3200);
      g.trait('Palette', schemeName(sc0)); g.trait('Strings', S); g.trait('Layout', layout[0].toUpperCase() + layout.slice(1)); g.trait('Scale', { major: 'Major', minor: 'Minor', penta: 'Pentatonic', dorian: 'Dorian', hira: 'Hirajoshi' }[Object.keys(SCALES).find(k => SCALES[k] === scale)]); g.trait('Tone', wave[0].toUpperCase() + wave.slice(1));
      const strings = Array.from({ length: S }, (_, i) => {
        const u = i / (S - 1), note = root + 12 * Math.floor(i / scale.length) + scale[i % scale.length], c = lut[(h0 + (note * 7 % 12) / 12 * 256) & 255];
        const base = layout === 'fan' ? [ox, oy] : layout === 'row' ? [n * (0.08 + 0.84 * u), oy] : [n / 2 + Math.cos(Math.PI * (1 - u)) * n * 0.42, oy];
        const tip = layout === 'fan' ? [n / 2 + (u - 0.5) * n * spread, 1] : layout === 'row' ? [n * (0.08 + 0.84 * u), 1] : [n / 2 + Math.cos(Math.PI * (1 - u)) * n * 0.2, n * 0.08];
        return { base, tip, u, note, amp: 0, ph: 0, col: [c & 255, c >> 8 & 255, c >> 16 & 255] };
      });
      // where beam i crosses the height y (for plucking by the pointer)
      const xAt = (s, y) => { const v = (s.base[1] - y) / (s.base[1] - s.tip[1]); return s.base[0] + (s.tip[0] - s.base[0]) * v; };
      const pluck = (i, t, vel) => { const s = strings[i]; s.amp = 1; s.ph = t; snd.note(s.note, { dur: 1.4, vel, wave, cutoff, pan: (s.u - 0.5) * 1.2 }); };
      let cur = R.int(0, S - 1), next = 0, idle = 99, lastX = null, glow = 0;
      return (t, dt) => {
        idle += dt;
        // the pointer plucks every beam it sweeps across, and any beam it taps
        if (inp.inside) {
          const px = inp.x * n, py = inp.y * n;
          if (lastX != null && Math.abs(px - lastX) > 0.2) for (let i = 0; i < S; i++) { const xb = xAt(strings[i], py); if ((xb - lastX) * (xb - px) < 0 && strings[i].amp < 0.6) { pluck(i, t, 0.5); idle = 0; } }
          lastX = px;
        } else lastX = null;
        let tc = 0;
        for (const tap of inp.taps()) { if (tc++ >= 3) continue; let best = 0, bd = 1e9; strings.forEach((s, i) => { const dd = Math.abs(xAt(s, tap.y * n) - tap.x * n); if (dd < bd) { bd = dd; best = i; } }); pluck(best, t, 0.55); idle = 0; }
        glow = inp.listening ? glow * 0.7 + inp.level * 0.3 : 0;
        if (inp.listening) { const b = inp.beats(); if (b) { cur = U.clamp(cur + g.alt.pick([-2, -1, 1, 1, 2, 3, -3]), 0, S - 1) | 0; pluck(cur, t, 0.45); if (b > 1) pluck(U.clamp(cur + 2, 0, S - 1) | 0, t, 0.3); idle = 1.5; } }
        next -= dt;
        if (next <= 0 && idle > 3) { next = beat * R.pick([1, 1, 1, 2, 0.5]); cur = U.clamp(cur + R.pick([-2, -1, -1, 1, 1, 2, 3, -3]), 0, S - 1) | 0; pluck(cur, t, 0.38); if (R() < 0.18) pluck(U.clamp(cur + R.pick([2, 4, -3]), 0, S - 1) | 0, t, 0.25); }
        L.fade(0.5);
        for (const s of strings) {
          s.amp *= 0.965;
          const A = s.amp * n * 0.035, I = 0.28 + 0.9 * s.amp + glow * 0.45;
          let px = s.base[0], py = s.base[1];
          for (let k = 1; k <= 24; k++) {
            const u = k / 24, x = s.base[0] + (s.tip[0] - s.base[0]) * u + A * Math.sin(Math.PI * u) * Math.sin((t - s.ph) * sway), y = s.base[1] + (s.tip[1] - s.base[1]) * u;
            L.beam(px, py, x, y, s.col, I, 0.25 * s.amp + 0.08, k > 1);
            px = x; py = y;
          }
          L.add(s.tip[0], s.tip[1], s.col, 0.6 + s.amp);
        }
        for (let x = 0; x < n; x++) L.add(x, n - 2, [255, 255, 255], 0.1);
        L.flush(d);
      };
    },
  });

  add({
    name: 'Galvo', seed: 2, sizes: [100, 200], fps: 12,
    interactive: 'Move the pointer to turn the figure in space.',
    listens: 'The figure swells with the music; a clap moves the show on to the next figure.',
    recipe: 'A scanning laser draws figures in the air, turning slowly in depth as if on a stage: star polygons, Lissajous knots, roses and spirograph loops. The figure steps from one to the next, each stretch in its own colour, the trace leaving a short afterglow.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), cols = beamCols(R, 6), Rad = n * 0.4, D = 3.2, tilt = R.range(0.2, 0.5), spin = R.range(0.15, 0.3) * R.sign();
        const stars = R.shuffle([[5, 2], [7, 2], [7, 3], [8, 3], [9, 2], [9, 4], [10, 3], [11, 3], [11, 4], [12, 5]]);
        g.trait('Palette', palName(cols)); g.trait('Show', 'Star polygons'); g.trait('Figures', stars.length); g.trait('Afterglow', 'Medium'); g.trait('Grid', n);
        const live = beatLive(g.input);
        return t => {
          L.fade(0.72);
          const tt = live(t, 7), k = Math.floor(tt), u = U.smooth(U.clamp((tt - k) * 3.5)), [p1, q1] = stars[k % stars.length], [p2, q2] = stars[(k + 1) % stars.length];
          // morph: each figure as 60 points round its path, blended between the two stars
          // j-th of 60 points along the star's path, which visits every q-th corner
          const pt = (p, q, j) => { const u = j / 60 * p, e = Math.floor(u), f = u - e, A = TAU * e * q / p, B = TAU * (e + 1) * q / p; return [Math.cos(A) * (1 - f) + Math.cos(B) * f, Math.sin(A) * (1 - f) + Math.sin(B) * f]; };
          const yaw = g.input.inside ? (g.input.x - 0.5) * 2.4 : Math.sin(t * spin) * 0.75, tl = g.input.inside ? (g.input.y - 0.5) * 2 : tilt, cy = Math.cos(yaw), sy = Math.sin(yaw), ct = Math.cos(tl), st = Math.sin(tl);
          let prev = null;
          for (let j = 0; j <= 60; j++) {
            const [ax, ay] = pt(p2, q2, j % 60), [bx, by] = pt(p1, q1, j % 60), x0 = bx + (ax - bx) * u, y0 = by + (ay - by) * u;
            const x1 = x0 * cy, z1 = x0 * sy, y1 = y0 * ct - z1 * st, z2 = y0 * st + z1 * ct, sc = D / (D + z2);
            const P2 = [n / 2 + x1 * Rad * live.size * sc, n / 2 + y1 * Rad * live.size * sc];
            if (prev) L.beam(prev[0], prev[1], P2[0], P2[1], cols[Math.floor(j / 60 * cols.length * 2) % cols.length], 0.85 + live.flash * 0.5, 0.15 + live.flash * 0.1, j > 1);
            prev = P2;
          }
          L.flush(d);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, L = light(n), cols = beamCols(R, R.int(2, 6)), Rad = n * 0.4, D = 3.2, tilt0 = R.range(0.2, 0.5), spin = R.range(0.15, 0.3) * R.sign(), hold = R.range(5, 9), glow = R.pick([0.6, 0.72, 0.85]);
      const M = 90;
      const star = (p, q) => u => { const v = u * p, e = Math.floor(v), f = v - e, A = TAU * e * q / p, B = TAU * (e + 1) * q / p; return [Math.cos(A) * (1 - f) + Math.cos(B) * f, Math.sin(A) * (1 - f) + Math.sin(B) * f]; };
      const liss = (p, q, ph) => u => [Math.sin(p * u * TAU + ph), Math.sin(q * u * TAU)];
      const rose = k => u => { const th = u * TAU * (k % 2 ? 1 : 2) / 2 * 2, r = Math.cos(k * th); return [r * Math.cos(th), r * Math.sin(th)]; };
      const spiro = (Rr, r, dd) => u => { const th = u * TAU * r, x = (Rr - r) * Math.cos(th) + dd * Math.cos((Rr - r) / r * th), y = (Rr - r) * Math.sin(th) - dd * Math.sin((Rr - r) / r * th), m = Rr - r + dd; return [x / m, y / m]; };
      const pool = [star(5, 2), star(7, 2), star(7, 3), star(8, 3), star(9, 4), star(11, 4), star(12, 5), liss(3, 2, 0.5), liss(5, 4, 0.3), liss(3, 4, 1), liss(5, 6, 0.2), rose(3), rose(5), rose(4), rose(7), spiro(5, 3, 2), spiro(7, 3, 2.5), spiro(8, 5, 3)];
      const figs = R.shuffle(pool).slice(0, R.int(4, 8)), live = beatLive(inp);
      g.trait('Palette', palName(cols)); g.trait('Show', figs.every(f => pool.indexOf(f) < 7) ? 'Star polygons' : figs.filter(f => pool.indexOf(f) < 7).length ? 'Mixed figures' : 'Curves'); g.trait('Figures', figs.length); g.trait('Afterglow', ['Short', 'Medium', 'Long'][[0.6, 0.72, 0.85].indexOf(glow)]); g.trait('Grid', n);
      return t => {
        L.fade(glow);
        const tt = live(t, hold), k = Math.floor(tt), u = U.smooth(U.clamp((tt - k) * 3.5)), f1 = figs[k % figs.length], f2 = figs[(k + 1) % figs.length];
        const yaw = inp.inside ? (inp.x - 0.5) * 2.4 : Math.sin(t * spin) * 0.75, tilt = inp.inside ? (inp.y - 0.5) * 2 : tilt0;
        const cy = Math.cos(yaw), sy = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
        let prev = null;
        for (let j = 0; j <= M; j++) {
          const [ax, ay] = f2((j % M) / M), [bx, by] = f1((j % M) / M), x0 = bx + (ax - bx) * u, y0 = by + (ay - by) * u;
          const x1 = x0 * cy, z1 = x0 * sy, y1 = y0 * ct - z1 * st, z2 = y0 * st + z1 * ct, sc = D / (D + z2);
          const P2 = [n / 2 + x1 * Rad * live.size * sc, n / 2 + y1 * Rad * live.size * sc];
          if (prev) L.beam(prev[0], prev[1], P2[0], P2[1], cols[Math.floor(j / M * cols.length * 2) % cols.length], 0.85 + live.flash * 0.5, 0.15 + live.flash * 0.1, j > 1);
          prev = P2;
        }
        L.flush(d);
      };
    },
  });

  add({
    name: 'Raster Burn', seed: 6, sizes: [80, 100], fps: 12,
    interactive: 'Click to load a new plate.',
    recipe: 'A laser head sweeps back and forth across a dark plate, burning in a picture one row at a time: the originals’ remainder field, a word from the collection, rings, or a woven plaid. Fresh burns glow white and cool through orange into their final colour; when the plate is done it fades and a new one is loaded.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, burnT = new Float32Array(N).fill(-1), tgt = new Uint32Array(N), plate = X.rgb(26, 26, 30), hot = [255, 250, 230], warm = [255, 140, 40];
        g.trait('Plate', 'Steel'); g.trait('Laser', 'Orange'); g.trait('Pictures', 'Remainder fields'); g.trait('Grid', n);
        let row = 0, hx = 0, dir = 1, hold = 0, fade = 1, loadedAt = -9, byTap = false;
        const brushed = brush(plate, n);
        const load = (Q = R) => {
          const sc = U.scheme(Q, 0.6), a = Q.range(0.3, 1), yd = Q.pick([1, 2, 3]), k = Q.range(1, 3.5), tt = Q.range(1.5, 6), h0 = Q.range(0, 100), voids = Q.bool(0.7);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const h = mod(h0 + Math.log(mod(tt * a * x, y / yd + 1) + 1) * k * 12, 100);
            tgt[y * n + x] = voids && (h > 92) ? plate : sc.lut[(h * 2.56) | 0];
          }
          burnT.fill(-1); row = 0; hx = 0; dir = 1; hold = 0;
        };
        load();
        // open on a plate already part burned
        for (; row < Math.floor(n * 0.45); row++) for (let x = 0; x < n; x++) burnT[row * n + x] = -5;
        dir = row % 2 ? -1 : 1; hx = dir > 0 ? 0 : n - 1;
        return (t, dt) => {
          // a tap fades this plate out and loads the next (one at a time, however many taps arrive)
          if (g.input.taps().length && t - loadedAt > 1.2 && hold < 3) { row = n; hold = 3; byTap = true; loadedAt = t; }
          if (row >= n) { hold += dt; fade = U.clamp(1 - (hold - 3) / 1.5); if (hold > 4.6) { load(byTap ? g.alt : R); byTap = false; fade = 1; } }
          else for (let s = 0; s < Math.ceil(n / 3); s++) { burnT[row * n + hx] = t; hx += dir; if (hx < 0 || hx >= n) { dir = -dir; hx += dir; row++; break; } }
          for (let i = 0; i < N; i++) {
            const b = burnT[i];
            if (b === -1) { d[i] = brushed[i]; continue; }
            const age = b < -1 ? 9 : t - b, c = tgt[i];
            if (age > 1.6) d[i] = c;
            else {
              const u = age / 1.6, fin = [c & 255, c >> 8 & 255, c >> 16 & 255], m = u < 0.35 ? U.mix(hot, warm, u / 0.35) : U.mix(warm, fin, (u - 0.35) / 0.65);
              d[i] = U.pk(m);
            }
          }
          if (fade < 1) U.fadePx(d, fade);
          if (row < n) {
            X.rect(g, 0, row, n, 1, X.mixPk(d[row * n], X.rgb(60, 60, 70), 0.5));
            X.rect(g, hx - 1, row - 1, 3, 3, X.rgb(255, 255, 220)); X.put(g, hx, row, WHITE);
          }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, N = n * n, burnT = new Float32Array(N).fill(-1), tgt = new Uint32Array(N), plate = R.pick([X.rgb(26, 26, 30), X.rgb(40, 30, 22), X.rgb(14, 22, 30)]), hot = [255, 250, 230], warm = R.pick([[255, 140, 40], [255, 60, 90], [120, 200, 255]]);
      const kinds = R.shuffle(['field', 'field', 'word', 'rings', 'plaid']), WORDS2 = ['PRISM', 'HUE', 'ECHO', 'VOID', 'NEON', 'HALO', 'IRIS', 'BLOOM', 'AXON', 'SYNAE'];
      g.trait('Plate', ['Steel', 'Bronze', 'Slate'][[X.rgb(26, 26, 30), X.rgb(40, 30, 22), X.rgb(14, 22, 30)].indexOf(plate)]); g.trait('Laser', warm[0] === 255 ? (warm[1] === 140 ? 'Orange' : 'Rose') : 'Ice'); g.trait('Pictures', 'Fields, words, rings, plaid'); g.trait('First plate', { field: 'Field', word: 'Word', rings: 'Rings', plaid: 'Plaid' }[kinds[0]]); g.trait('Grid', n);
      let plates = 0;
      let row = 0, hx = 0, dir = 1, hold = 0, fade = 1, loadedAt = -9;
      const brushed = brush(plate, n);
      const load = () => {
        const sc = U.scheme(R, 0.6), a = R.range(0.3, 1), yd = R.pick([1, 2, 3]), k = R.range(1, 3.5), tt = R.range(1.5, 6), h0 = R.range(0, 100), voids = R.bool(0.7), kind = kinds[plates++ % kinds.length];
        const word = R.pick(WORDS2), sz = Math.max(1, Math.floor(n * 0.9 / (word.length * 6 - 1))), wx = (n - (word.length * 6 - 1) * sz) >> 1, wy = (n - 7 * sz) >> 1, rcx = R.range(0.3, 0.7) * n, rcy = R.range(0.3, 0.7) * n, rw = R.range(3, 7), pw = R.int(4, 10);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c;
          if (kind === 'field') { const h = mod(h0 + Math.log(mod(tt * a * x, y / yd + 1) + 1) * k * 12, 100); c = voids && h > 92 ? plate : sc.lut[(h * 2.56) | 0]; }
          else if (kind === 'rings') { const r = Math.hypot(x - rcx, y - rcy) / rw; c = (r | 0) % 3 === 2 ? plate : sc.lut[(h0 * 2.56 + (r | 0) * 23) & 255]; }
          else if (kind === 'plaid') { const a1 = ((x / pw) | 0) % 4, b1 = ((y / pw) | 0) % 4, warp = (x + y) % 2; c = sc.lut[((warp ? a1 : b1) * 64 + h0 * 2.56) & 255]; if ((a1 === 3 && b1 === 3)) c = plate; }
          else { const lx = Math.floor((x - wx) / sz), ly = Math.floor((y - wy) / sz), ch = word[Math.floor(lx / 6)], bx = lx % 6, on = lx >= 0 && ly >= 0 && ly < 7 && ch && bx < 5 && (X.FONT[ch][ly] >> (4 - bx) & 1); c = on ? sc.lut[(h0 * 2.56 + x * 2) & 255] : (x + y) % 4 === 0 ? X.shade(sc.lut[(h0 * 2.56 + y * 2) & 255], 0.35) : plate; }
          tgt[y * n + x] = c;
        }
        burnT.fill(-1); row = 0; hx = 0; dir = 1; hold = 0;
      };
      load();
      // open on a plate already part burned
      for (; row < Math.floor(n * 0.45); row++) for (let x = 0; x < n; x++) burnT[row * n + x] = -5;
      dir = row % 2 ? -1 : 1; hx = dir > 0 ? 0 : n - 1;
      return (t, dt) => {
        if (inp.taps().length && t - loadedAt > 1.2 && hold < 3) { row = n; hold = 3; loadedAt = t; }
        if (row >= n) { hold += dt; fade = U.clamp(1 - (hold - 3) / 1.5); if (hold > 4.6) { load(); fade = 1; } }
        else for (let s = 0; s < Math.ceil(n / 3); s++) { burnT[row * n + hx] = t; hx += dir; if (hx < 0 || hx >= n) { dir = -dir; hx += dir; row++; break; } }
        for (let i = 0; i < N; i++) {
          const b = burnT[i];
          if (b === -1) { d[i] = brushed[i]; continue; }
          const age = b < -1 ? 9 : t - b, c = tgt[i];
          if (age > 1.6) d[i] = c;
          else {
            const u = age / 1.6, fin = [c & 255, c >> 8 & 255, c >> 16 & 255], m = u < 0.35 ? U.mix(hot, warm, u / 0.35) : U.mix(warm, fin, (u - 0.35) / 0.65);
            d[i] = U.pk(m);
          }
        }
        if (fade < 1) U.fadePx(d, fade);
        if (row < n) {
          X.rect(g, 0, row, n, 1, X.mixPk(d[row * n], X.rgb(60, 60, 70), 0.5));
          X.rect(g, hx - 1, row - 1, 3, 3, X.rgb(255, 255, 220)); X.put(g, hx, row, WHITE);
        }
      };
    },
  });

  add({
    name: 'Light Guide', seed: 2, sizes: [100, 200], fps: 12,
    interactive: 'Hold the pointer over the glass to press the channels out of shape.',
    recipe: 'A stack of wavy glass channels, each carrying one beam that zigzags along it by bouncing off its walls. The channels undulate slowly, so every bounce point slides and the zigzags tighten and loosen, with pulses of light running down each guide.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), G = R.int(4, 6), cols = beamCols(R, G), lam = R.range(0.5, 1.4), sp = R.range(10, 22);
        g.trait('Palette', palName(cols)); g.trait('Guides', G); g.trait('Run', 'Across'); g.trait('Glass', 'Wavy'); g.trait('Grid', n);
        const guides = Array.from({ length: G }, (_, k) => ({ yc: (k + 0.5) * n / G, A: n / G * R.range(0.12, 0.3), kx: TAU / (n * lam) * R.range(0.7, 1.5), ph: R.range(0, TAU), w: R.range(0.1, 0.25) * TAU * R.sign(), hw: n / G * R.range(0.18, 0.26), ang: R.range(0.25, 0.6) * R.sign(), col: cols[k] }));
        return t => {
          L.fade(0.35);
          for (const gd of guides) {
            const ph = gd.ph + t * gd.w * 0.08, P = g.input.down && g.input.inside ? [g.input.x * n, g.input.y * n] : null;
            const bump = x => P ? Math.sign(gd.yc - P[1]) * n * 0.12 * Math.exp(-((x - P[0]) ** 2) / (n * n * 0.01) - ((gd.yc - P[1]) ** 2) / (n * n * 0.03)) : 0;
            const yc = x => gd.yc + gd.A * Math.sin(x * gd.kx + ph) + bump(x), slope = x => gd.A * gd.kx * Math.cos(x * gd.kx + ph) + (P ? bump(x + 0.5) - bump(x - 0.5) : 0);
            for (let x = 0; x < n; x++) { const y0 = yc(x); for (let e = -gd.hw; e <= gd.hw; e++) L.add(x, y0 + e, gd.col, 0.05); for (const e of [-1, 1]) L.add(x, y0 + e * (gd.hw + 1), gd.col, 0.3); }
            let x = 0, y = yc(0), dx = Math.cos(gd.ang), dy = Math.sin(gd.ang), s = 0, steps = 0;
            while (x < n && steps++ < 10 * n) {
              const off = y - yc(x);
              if (Math.abs(off) > gd.hw) {
                const nx = -slope(x), ny = 1, nl = Math.hypot(nx, ny), ux = nx / nl, uy = ny / nl, dot = dx * ux + dy * uy;
                dx -= 2 * dot * ux; dy -= 2 * dot * uy;
                y = yc(x) + Math.sign(off) * (gd.hw - 0.01);
              }
              const pulse = 0.4 + 0.6 * Math.pow(Math.max(0, Math.cos((s - t * sp) * 0.12)), 8);
              L.add(x, y, gd.col, 0.8 * pulse); L.add(x, y + 1, gd.col, 0.35 * pulse); L.add(x, y - 1, gd.col, 0.35 * pulse);
              x += dx * 0.5; y += dy * 0.5; s += 0.5;
            }
          }
          L.flush(d);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, L = light(n), G = R.int(3, 7), cols = beamCols(R, G), lam = R.range(0.5, 1.4), sp = R.range(10, 22), vert = R.bool(0.35), zig = R.bool(0.35), tmp = new Uint32Array(n * n);
      g.trait('Palette', palName(cols)); g.trait('Guides', G); g.trait('Run', vert ? 'Down' : 'Across'); g.trait('Glass', zig ? 'Zigzag' : 'Wavy'); g.trait('Grid', n);
      const wav = v => zig ? 2 / Math.PI * Math.asin(Math.sin(v)) : Math.sin(v), dwav = v => zig ? Math.sign(Math.cos(v)) * 2 / Math.PI : Math.cos(v);
      const guides = Array.from({ length: G }, (_, k) => ({ yc: (k + 0.5) * n / G, A: n / G * R.range(0.12, 0.3), kx: TAU / (n * lam) * R.range(0.7, 1.5), ph: R.range(0, TAU), w: R.range(0.1, 0.25) * TAU * R.sign(), hw: n / G * R.range(0.18, 0.26), ang: R.range(0.25, 0.6) * R.sign(), col: cols[k] }));
      return t => {
        L.fade(0.35);
        for (const gd of guides) {
          const ph = gd.ph + t * gd.w * 0.08, P = inp.down && inp.inside ? (vert ? [inp.y * n, inp.x * n] : [inp.x * n, inp.y * n]) : null;
          const bump = x => P ? Math.sign(gd.yc - P[1]) * n * 0.12 * Math.exp(-((x - P[0]) ** 2) / (n * n * 0.01) - ((gd.yc - P[1]) ** 2) / (n * n * 0.03)) : 0;
          const yc = x => gd.yc + gd.A * wav(x * gd.kx + ph) + bump(x), slope = x => gd.A * gd.kx * dwav(x * gd.kx + ph) + (bump(x + 0.5) - bump(x - 0.5));
          for (let x = 0; x < n; x++) { const y0 = yc(x); for (let e = -gd.hw; e <= gd.hw; e++) L.add(x, y0 + e, gd.col, 0.05); for (const e of [-1, 1]) L.add(x, y0 + e * (gd.hw + 1), gd.col, 0.3); }
          let x = 0, y = yc(0), dx = Math.cos(gd.ang), dy = Math.sin(gd.ang), s = 0, steps = 0;
          while (x < n && steps++ < 10 * n) {
            const off = y - yc(x);
            if (Math.abs(off) > gd.hw) {
              const nx = -slope(x), ny = 1, nl = Math.hypot(nx, ny), ux = nx / nl, uy = ny / nl, dot = dx * ux + dy * uy;
              dx -= 2 * dot * ux; dy -= 2 * dot * uy;
              y = yc(x) + Math.sign(off) * (gd.hw - 0.01);
            }
            const pulse = 0.4 + 0.6 * Math.pow(Math.max(0, Math.cos((s - t * sp) * 0.12)), 8);
            L.add(x, y, gd.col, 0.8 * pulse); L.add(x, y + 1, gd.col, 0.35 * pulse); L.add(x, y - 1, gd.col, 0.35 * pulse);
            x += dx * 0.5; y += dy * 0.5; s += 0.5;
          }
        }
        L.flush(d);
        if (vert) { tmp.set(d); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[x * n + y] = tmp[y * n + x]; }
      };
    },
  });

  add({
    name: 'Glow Wall', seed: 4, sizes: [100], fps: 12,
    interactive: 'Draw on the wall with the laser; it goes back to writing when you stop.',
    recipe: 'A laser writes the collection’s words on a glow-in-the-dark wall, a few dots at a time, stroke by stroke. Each fresh dot flares white and fades slowly through the phosphor’s colour, so the page holds a fading memory of every line written over it.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, G = new Float32Array(N), s = 2, cw = 6 * s, chh = 10 * s, cols = Math.floor(n / cw), rows = Math.floor(n / chh), ox = (n - cols * cw + s) >> 1, oy = (n - rows * chh + 3 * s) >> 1;
        const sc = U.scheme(R, 0.5), ph = U.ramp(sc.cols, R(), true), glow = U.lut([[0, 0, 0], U.mix(ph, [0, 0, 0], 0.6), ph, U.mix(ph, [255, 255, 255], 0.6), [255, 255, 255]], false);
        g.trait('Phosphor', hueWord(ph)); g.trait('Type', 'Medium'); g.trait('Memory', 'Medium');
        const text = ['PRISM', 'HUE', 'ECHO', 'VOID', 'DEEP', 'NEON', 'DAWN', 'NOON', 'CALM', 'VIVID', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'AXON', 'BLOOM', 'PULSE', 'HALO', 'IRIS', 'RIPPLE', 'TREBLE', 'BASS', 'STATIC', 'COMET'];
        const words = R.shuffle(text.slice());
        // the queue of dots to write: each letter column by column, serpentine
        let queue = [], wi = 0, cr = 0, cc = 0;
        const feed = () => {
          let w = words[wi++ % words.length] + ' ';
          if (cc + w.length - 1 > cols) { cr = (cr + 1) % rows; cc = 0; }
          for (const ch of w) {
            const rws = X.FONT[ch] || X.FONT[' '], x0 = ox + cc * cw, y0 = oy + cr * chh;
            // the old letter in this place is dimmed first, so new lines never read over old ones
            for (let yy = 0; yy < 7 * s; yy++) for (let xx = 0; xx < 6 * s; xx++) { const i = (y0 + yy) * n + x0 + xx; if (i >= 0 && i < N) G[i] *= 0.15; }
            for (let b = 0; b < 5; b++) for (let r0 = 0; r0 < 7; r0++) { const r = b & 1 ? 6 - r0 : r0; if (rws[r] >> (4 - b) & 1) queue.push([x0 + b * s, y0 + r * s]); }
            cc++;
            if (cc >= cols) { cr = (cr + 1) % rows; cc = 0; }
          }
        };
        let dot = [n / 2, n / 2];
        const write = k => { for (let j = 0; j < k; j++) { if (!queue.length) feed(); const [x, y] = queue.shift(); dot = [x, y]; for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) G[(y + yy) * n + x + xx] = 1; } };
        for (let k = 0; k < 300; k++) { write(2); for (let i = 0; i < N; i++) G[i] *= 0.996; }
        let idle = 99, lastP = null;
        const burn = (x, y) => { for (let yy = 0; yy < s + 1; yy++) for (let xx = 0; xx < s + 1; xx++) { const X0 = (x | 0) + xx, Y0 = (y | 0) + yy; if (X0 >= 0 && Y0 >= 0 && X0 < n && Y0 < n) G[Y0 * n + X0] = 1; } };
        return (t, dt) => {
          for (let i = 0; i < N; i++) G[i] *= 0.993;
          idle += dt;
          let tc = 0;
          for (const tp of g.input.taps()) if (tc++ < 8) { const x = tp.x * n, y = tp.y * n; for (let k = -2; k <= 2; k++) { burn(x + k, y); burn(x, y + k); } dot = [x, y]; idle = 0; }
          if (g.input.down && g.input.inside) {
            const p = [g.input.x * n, g.input.y * n], q = lastP || p, steps = Math.max(1, Math.ceil(Math.hypot(p[0] - q[0], p[1] - q[1])));
            for (let k = 0; k <= steps; k++) burn(q[0] + (p[0] - q[0]) * k / steps, q[1] + (p[1] - q[1]) * k / steps);
            dot = p; lastP = p; idle = 0;
          } else lastP = null;
          if (idle > 2.5) write(3);
          for (let i = 0; i < N; i++) d[i] = glow[Math.min(255, G[i] * 255) | 0];
          X.line(g, n / 2, n - 1, dot[0], dot[1], X.rgb(70, 20, 20));
          X.rect(g, dot[0] - 1, dot[1] - 1, s + 2, s + 2, X.rgb(255, 80, 80)); X.rect(g, dot[0], dot[1], s, s, WHITE);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, N = n * n, G = new Float32Array(N), s = R.pick([1, 2, 2, 3]), decay = R.pick([0.985, 0.993, 0.997]), speed = R.pick([2, 3, 5]), cw = 6 * s, chh = 10 * s, cols = Math.floor(n / cw), rows = Math.floor(n / chh), ox = (n - cols * cw + s) >> 1, oy = (n - rows * chh + 3 * s) >> 1;
      const sc = U.scheme(R, 0.5), ph = U.ramp(sc.cols, R(), true), glow = U.lut([[0, 0, 0], U.mix(ph, [0, 0, 0], 0.6), ph, U.mix(ph, [255, 255, 255], 0.6), [255, 255, 255]], false);
      g.trait('Phosphor', hueWord(ph)); g.trait('Type', ['', 'Small', 'Medium', 'Large'][s]); g.trait('Memory', ['Short', 'Medium', 'Long'][[0.985, 0.993, 0.997].indexOf(decay)]);
      const text = ['PRISM', 'HUE', 'ECHO', 'VOID', 'DEEP', 'NEON', 'DAWN', 'NOON', 'CALM', 'VIVID', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'AXON', 'BLOOM', 'PULSE', 'HALO', 'IRIS', 'RIPPLE', 'TREBLE', 'BASS', 'STATIC', 'COMET'];
      const words = R.shuffle(text.slice());
      // the queue of dots to write: each letter column by column, serpentine
      let queue = [], wi = 0, cr = 0, cc = 0;
      const feed = () => {
        let w = words[wi++ % words.length] + ' ';
        if (cc + w.length - 1 > cols) { cr = (cr + 1) % rows; cc = 0; }
        for (const ch of w) {
          const rws = X.FONT[ch] || X.FONT[' '], x0 = ox + cc * cw, y0 = oy + cr * chh;
          // the old letter in this place is dimmed first, so new lines stay legible
          for (let yy = 0; yy < 7 * s; yy++) for (let xx = 0; xx < 6 * s; xx++) { const i = (y0 + yy) * n + x0 + xx; if (i >= 0 && i < N) G[i] *= 0.15; }
          for (let b = 0; b < 5; b++) for (let r0 = 0; r0 < 7; r0++) { const r = b & 1 ? 6 - r0 : r0; if (rws[r] >> (4 - b) & 1) queue.push([x0 + b * s, y0 + r * s]); }
          cc++;
          if (cc >= cols) { cr = (cr + 1) % rows; cc = 0; }
        }
      };
      let dot = [n / 2, n / 2];
      const write = k => { for (let j = 0; j < k; j++) { if (!queue.length) feed(); const [x, y] = queue.shift(); dot = [x, y]; for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) G[(y + yy) * n + x + xx] = 1; } };
      for (let k = 0; k < 300; k++) { write(2); for (let i = 0; i < N; i++) G[i] *= 0.996; }
      let idle = 99, lastP = null;
      const burn = (x, y) => { for (let yy = 0; yy < s + 1; yy++) for (let xx = 0; xx < s + 1; xx++) { const X0 = (x | 0) + xx, Y0 = (y | 0) + yy; if (X0 >= 0 && Y0 >= 0 && X0 < n && Y0 < n) G[Y0 * n + X0] = 1; } };
      return (t, dt) => {
        for (let i = 0; i < N; i++) G[i] *= decay;
        idle += dt;
        let tc = 0;
        for (const tp of inp.taps()) if (tc++ < 8) { const x = tp.x * n, y = tp.y * n; for (let k = -2; k <= 2; k++) { burn(x + k, y); burn(x, y + k); } dot = [x, y]; idle = 0; }
        if (inp.down && inp.inside) {
          const p = [inp.x * n, inp.y * n], q = lastP || p, steps = Math.max(1, Math.ceil(Math.hypot(p[0] - q[0], p[1] - q[1])));
          for (let k = 0; k <= steps; k++) burn(q[0] + (p[0] - q[0]) * k / steps, q[1] + (p[1] - q[1]) * k / steps);
          dot = p; lastP = p; idle = 0;
        } else lastP = null;
        if (idle > 2.5) write(speed);
        for (let i = 0; i < N; i++) d[i] = glow[Math.min(255, G[i] * 255) | 0];
        X.line(g, n / 2, n - 1, dot[0], dot[1], X.rgb(70, 20, 20));
        X.rect(g, dot[0] - 1, dot[1] - 1, s + 2, s + 2, X.rgb(255, 80, 80)); X.rect(g, dot[0], dot[1], s, s, WHITE);
      };
    },
  });

  add({
    name: 'Liquid Sky', seed: 4, sizes: [80, 100], fps: 12,
    listens: 'The haze rolls and glows with the music; beats flash through the sheets.',
    recipe: 'Two laser sheets fanned flat overhead through drifting haze, seen from below: the haze lights up wherever it crosses a sheet, so slow waves of smoke roll across the ceiling in bands of beam colour that thin out toward the horizon.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, nz = U.noise(R).n2, cols = beamCols(R, 2), hz = Math.round(n * R.range(0.6, 0.7)), H = R.range(10, 18), lv = R.pick([3, 4, 5]), drift = R.range(0.04, 0.1), off2 = R.range(1, 3);
        const zrow = new Float32Array(n);
        g.trait('Palette', palName(cols)); g.trait('Sheets', 2); g.trait('Haze', lv + ' steps'); g.trait('Horizon', hz / n < 0.63 ? 'Low' : hz / n < 0.67 ? 'Middle' : 'High'); g.trait('Haze scale', 'Medium'); g.trait('Grid', n);
        for (let y = 0; y < hz; y++) zrow[y] = H / Math.max(0.6, hz - y);   // depth of the sheet seen at this row
        const half = (n >> 1) + 1, V = [new Float32Array(half), new Float32Array(half)], live = hazeLive(g.input);
        return t0 => {
          const t = live(t0), gain = live.gain;
          d.fill(BLACK);
          for (let y = 0; y < hz; y++) {
            const z = zrow[y], fadeZ = U.clamp(1.4 - z / 9);
            // the haze is sampled once per 2 x 2 cells; the dither stays per cell
            if (!(y & 1)) for (let k = 0; k < 2; k++) for (let xb = 0; xb < half; xb++) { const xw = (xb * 2 - n / 2) / n * z, v = nz(xw * 1.2 + t * drift * (k ? -1 : 1), z * 0.5 - t * 0.15 + k * off2) * 0.5 + 0.5; V[k][xb] = v * v * 1.6 * gain; }
            skyRow(d, n, y, V, 2, lv, fadeZ, cols);
          }
          skyFloor(d, n, hz);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, nz = U.noise(R).n2, K = R.pick([1, 2, 2, 3]), cols = beamCols(R, K), hz = Math.round(n * R.range(0.55, 0.72)), H = R.range(8, 20), lv = R.pick([2, 3, 4, 5]), drift = R.range(0.04, 0.12), off2 = R.range(1, 3), scale = R.range(0.8, 1.8), bright = 1.8 / K + 0.2;
      const zrow = new Float32Array(n);
      g.trait('Palette', palName(cols)); g.trait('Sheets', K); g.trait('Haze', lv + ' steps'); g.trait('Horizon', hz / n < 0.6 ? 'Low' : hz / n < 0.67 ? 'Middle' : 'High'); g.trait('Haze scale', scale < 1.1 ? 'Broad' : scale < 1.45 ? 'Medium' : 'Fine'); g.trait('Grid', n);
      for (let y = 0; y < hz; y++) zrow[y] = H / Math.max(0.6, hz - y);   // depth of the sheet seen at this row
      const half = (n >> 1) + 1, V = Array.from({ length: K }, () => new Float32Array(half)), live = hazeLive(g.input);
      return t0 => {
        const t = live(t0), gain = live.gain;
        d.fill(BLACK);
        for (let y = 0; y < hz; y++) {
          const z = zrow[y], fadeZ = U.clamp(1.4 - z / 9);
          // the haze is sampled once per 2 x 2 cells; the dither stays per cell
          if (!(y & 1)) for (let k = 0; k < K; k++) for (let xb = 0; xb < half; xb++) { const xw = (xb * 2 - n / 2) / n * z, v = nz(xw * scale + t * drift * (k & 1 ? -1 : 1), z * 0.5 * scale - t * 0.15 + k * off2) * 0.5 + 0.5; V[k][xb] = v * v * bright * gain; }
          skyRow(d, n, y, V, K, lv, fadeZ, cols);
        }
        skyFloor(d, n, hz);
      };
    },
  });

  add({
    name: 'Light Packets', seed: 4, sizes: [80, 100], fps: 12,
    interactive: 'Click a junction to fire a burst of packets from it.',
    recipe: 'A mesh of optical fibres on a square grid, with packets of light racing from junction to junction. At every junction a packet picks a new route, the fibres it has passed keep a dim afterglow, and junctions flash as packets cross them.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), sp = R.pick([8, 10]), G = Math.floor((n - 4) / sp) + 1, off = (n - (G - 1) * sp) >> 1, cols = beamCols(R, 5);
        const id = (i, j) => j * G + i, nb = Array.from({ length: G * G }, () => []);
        // a random spanning tree plus extra links, so every junction is reachable and there are loops
        const seen = new Uint8Array(G * G), stack = [R.int(0, G * G - 1)]; seen[stack[0]] = 1;
        const link = (a, b) => { if (!nb[a].includes(b)) { nb[a].push(b); nb[b].push(a); } };
        while (stack.length) {
          const c = stack[stack.length - 1], i = c % G, j = c / G | 0, opts = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < G && b < G && !seen[id(a, b)]);
          if (!opts.length) { stack.pop(); continue; }
          const [a, b] = R.pick(opts), e = id(a, b); seen[e] = 1; link(c, e); stack.push(e);
        }
        for (let k = 0; k < G * G * 0.35; k++) { const c = R.int(0, G * G - 1), i = c % G, j = c / G | 0, [a, b] = R.pick([[i + 1, j], [i, j + 1]]); if (a < G && b < G) link(c, id(a, b)); }
        const pos = c => [off + (c % G) * sp, off + (c / G | 0) * sp];
        g.trait('Palette', palName(cols)); g.trait('Mesh', sp === 8 ? 'Fine' : 'Medium'); g.trait('Loops', 'Some'); g.trait('Traffic', 'Steady'); g.trait('Fibre', 'Blue'); g.trait('Packets', 'White-hot'); g.trait('Comets', 'Short'); g.trait('Fibres', 'Dim'); g.trait('Grid', n);
        const packets = Array.from({ length: Math.round(G * G * 0.6) }, () => { const a = R.int(0, G * G - 1); return { a, b: R.pick(nb[a]), s: R() * sp, v: R.range(0.5, 1.1), col: R.pick(cols) }; });
        const flash = new Float32Array(G * G), cap = packets.length + 80;
        return () => {
          for (const tap of g.input.taps()) {
            if (packets.length > cap) break;   // a burst of taps never floods the mesh
            const i = U.clamp(Math.round((tap.x * n - off) / sp), 0, G - 1), j = U.clamp(Math.round((tap.y * n - off) / sp), 0, G - 1), c = id(i, j), col = g.alt.pick(cols);
            flash[c] = 1;
            for (const e of nb[c]) for (let k = 0; k < 2; k++) packets.push({ a: c, b: e, s: k * 2, v: g.alt.range(0.8, 1.3), col, life: 60, alt: true });
          }
          for (let k = packets.length - 1; k >= 0; k--) if (packets[k].life !== undefined && --packets[k].life <= 0) packets.splice(k, 1);
          L.fade(0.82);
          for (let c = 0; c < G * G; c++) for (const e of nb[c]) if (e > c) { const [x0, y0] = pos(c), [x1, y1] = pos(e); L.beam(x0, y0, x1, y1, [90, 100, 140], 0.08, 0); }
          for (const p of packets) {
            p.s += p.v;
            if (p.s >= sp) { p.s -= sp; flash[p.b] = 1; const back = p.a; p.a = p.b; const opts = nb[p.a].filter(e => e !== back); p.b = opts.length ? (p.alt ? g.alt : R).pick(opts) : back; }
            const [x0, y0] = pos(p.a), [x1, y1] = pos(p.b), ux = Math.sign(x1 - x0), uy = Math.sign(y1 - y0);
            for (let k = 0; k < 5; k++) { const s = p.s - k * 0.8; if (s < 0) break; L.add(x0 + ux * s, y0 + uy * s, p.col, (1 - k / 5) * 1.3); }
          }
          L.flush(d);
          for (let c = 0; c < G * G; c++) { flash[c] *= 0.8; const [x, y] = pos(c); junction(g, x, y, flash[c]); }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, L = light(n), sp = R.pick([6, 8, 10, 12]), G = Math.floor((n - 4) / sp) + 1, off = (n - (G - 1) * sp) >> 1, cols = beamCols(R, R.int(2, 6)), extra = R.range(0.1, 0.6), fill = R.range(0.3, 1);
      const fibre = R.pick([[90, 100, 140], [60, 120, 100], [130, 90, 60], [110, 110, 110]]);
      const id = (i, j) => j * G + i, nb = Array.from({ length: G * G }, () => []);
      // a random spanning tree plus extra links, so every junction is reachable and there are loops
      const seen = new Uint8Array(G * G), stack = [R.int(0, G * G - 1)]; seen[stack[0]] = 1;
      const link = (a, b) => { if (!nb[a].includes(b)) { nb[a].push(b); nb[b].push(a); } };
      while (stack.length) {
        const c = stack[stack.length - 1], i = c % G, j = c / G | 0, opts = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < G && b < G && !seen[id(a, b)]);
        if (!opts.length) { stack.pop(); continue; }
        const [a, b] = R.pick(opts), e = id(a, b); seen[e] = 1; link(c, e); stack.push(e);
      }
      for (let k = 0; k < G * G * extra; k++) { const c = R.int(0, G * G - 1), i = c % G, j = c / G | 0, [a, b] = R.pick([[i + 1, j], [i, j + 1]]); if (a < G && b < G) link(c, id(a, b)); }
      const pos = c => [off + (c % G) * sp, off + (c / G | 0) * sp];
      g.trait('Palette', palName(cols)); g.trait('Mesh', { 6: 'Dense', 8: 'Fine', 10: 'Medium', 12: 'Open' }[sp]); g.trait('Loops', extra < 0.25 ? 'Few' : extra < 0.45 ? 'Some' : 'Many'); g.trait('Traffic', fill < 0.55 ? 'Light' : fill < 0.8 ? 'Steady' : 'Heavy'); g.trait('Fibre', ['Blue', 'Green', 'Copper', 'Grey'][[90, 60, 130, 110].indexOf(fibre[0])]);
      // new looks: packets that keep their colour (or run white-hot), longer comets, and fibres that glow
      const heat = g.alt.pick([1.3, 0.3, 0.3, 0.3]), tail = g.alt.pick([5, 5, 9]), fibreA = g.alt.pick([0.08, 0.08, 0.2]);
      g.trait('Packets', heat > 1 ? 'White-hot' : 'Coloured'); g.trait('Comets', tail > 5 ? 'Long' : 'Short'); g.trait('Fibres', fibreA > 0.1 ? 'Glowing' : 'Dim'); g.trait('Grid', n);
      const packets = Array.from({ length: Math.round(G * G * fill) }, () => { const a = R.int(0, G * G - 1); return { a, b: R.pick(nb[a]), s: R() * sp, v: R.range(0.5, 1.1), col: R.pick(cols) }; });
      const flash = new Float32Array(G * G), cap = packets.length + 80;
      return () => {
        for (const tap of inp.taps()) {
          if (packets.length > cap) break;
          const i = U.clamp(Math.round((tap.x * n - off) / sp), 0, G - 1), j = U.clamp(Math.round((tap.y * n - off) / sp), 0, G - 1), c = id(i, j), col = R.pick(cols);
          flash[c] = 1;
          for (const e of nb[c]) for (let k = 0; k < 2; k++) packets.push({ a: c, b: e, s: k * 2, v: R.range(0.8, 1.3), col, life: 60 });
        }
        for (let k = packets.length - 1; k >= 0; k--) if (packets[k].life !== undefined && --packets[k].life <= 0) packets.splice(k, 1);
        L.fade(0.82);
        for (let c = 0; c < G * G; c++) for (const e of nb[c]) if (e > c) { const [x0, y0] = pos(c), [x1, y1] = pos(e); L.beam(x0, y0, x1, y1, fibre, fibreA, 0); }
        for (const p of packets) {
          p.s += p.v;
          if (p.s >= sp) { p.s -= sp; flash[p.b] = 1; const back = p.a; p.a = p.b; const opts = nb[p.a].filter(e => e !== back); p.b = opts.length ? R.pick(opts) : back; }
          const [x0, y0] = pos(p.a), [x1, y1] = pos(p.b), ux = Math.sign(x1 - x0), uy = Math.sign(y1 - y0);
          for (let k = 0; k < tail; k++) { const s = p.s - k * 0.8; if (s < 0) break; L.add(x0 + ux * s, y0 + uy * s, p.col, (1 - k / tail) * heat); }
        }
        L.flush(d);
        for (let c = 0; c < G * G; c++) { flash[c] *= 0.8; const [x, y] = pos(c); junction(g, x, y, flash[c]); }
      };
    },
  });

  add({
    name: 'Mirror Box', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Point to aim the laser.',
    recipe: 'A beam fired into a box of slowly turning mirrors. It ricochets forty times, changing colour at each mirror and fading a little, so the path is a long folded figure that keeps re-folding as the mirrors turn.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, L = light(n), cols = beamCols(R, 7), M = R.int(5, 8), Mx = n - 1;
        const mirrors = Array.from({ length: M }, () => ({ cx: R.range(0.15, 0.85) * Mx, cy: R.range(0.15, 0.85) * Mx, h: R.range(0.07, 0.16) * n, a: R.range(0, Math.PI), w: R.range(0.05, 0.15) * R.sign() }));
        g.trait('Palette', palName(cols)); g.trait('Mirrors', M); g.trait('Bounces', 40); g.trait('Afterglow', 'Medium'); g.trait('Grid', n);
        const ex = 1, ey = R.range(0.2, 0.8) * Mx, ea = R.range(-0.6, 0.6), ew = R.range(0.04, 0.1);
        return t => {
          L.fade(0.5);
          const segs = mirrors.map(m => { const a = m.a + t * m.w, c = Math.cos(a) * m.h, s = Math.sin(a) * m.h; return [m.cx - c, m.cy - s, m.cx + c, m.cy + s]; });
          let x = ex, y = ey, a = g.input.inside ? Math.atan2(g.input.y * n - ey, g.input.x * n - ex) : ea + Math.sin(t * ew) * 0.5, vx = Math.cos(a), vy = Math.sin(a), last = -1;
          for (let k = 0; k < 40; k++) {
            let best = Infinity, hit = -1;
            segs.forEach(([x1, y1, x2, y2], j) => {
              if (j === last) return;
              const ex2 = x2 - x1, ey2 = y2 - y1, den = vx * ey2 - vy * ex2;
              if (Math.abs(den) < 1e-9) return;
              const s = ((x1 - x) * ey2 - (y1 - y) * ex2) / den, u = ((x1 - x) * vy - (y1 - y) * vx) / den;
              if (s > 1e-6 && u >= 0 && u <= 1 && s < best) { best = s; hit = j; }
            });
            const tx = vx > 0 ? (Mx - x) / vx : vx < 0 ? -x / vx : Infinity, ty = vy > 0 ? (Mx - y) / vy : vy < 0 ? -y / vy : Infinity, wall = Math.min(tx, ty);
            const s = Math.min(best, wall);
            if (!isFinite(s)) break;
            const nx = x + vx * s, ny = y + vy * s;
            L.beam(x, y, nx, ny, cols[k % cols.length], 1.1 * Math.pow(0.95, k), 0.3);
            if (best < wall) {
              const [x1, y1, x2, y2] = segs[hit], l = Math.hypot(x2 - x1, y2 - y1), px = -(y2 - y1) / l, py = (x2 - x1) / l, dot = vx * px + vy * py;
              vx -= 2 * dot * px; vy -= 2 * dot * py; last = hit;
            } else { if (tx <= ty) vx = -vx; if (ty <= tx) vy = -vy; last = -1; }
            x = nx; y = ny;
          }
          L.flush(d);
          for (const [x1, y1, x2, y2] of segs) X.line(g, x1, y1, x2, y2, X.rgb(235, 235, 245));
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, L = light(n), cols = beamCols(R, R.int(3, 8)), M = R.int(3, 10), Mx = n - 1, bounces = R.pick([25, 40, 60]), glow = R.pick([0.35, 0.5, 0.7]);
      const mirrors = Array.from({ length: M }, () => ({ cx: R.range(0.15, 0.85) * Mx, cy: R.range(0.15, 0.85) * Mx, h: R.range(0.07, 0.16) * n, a: R.range(0, Math.PI), w: R.range(0.05, 0.15) * R.sign() }));
      g.trait('Palette', palName(cols)); g.trait('Mirrors', M); g.trait('Bounces', bounces); g.trait('Afterglow', ['Short', 'Medium', 'Long'][[0.35, 0.5, 0.7].indexOf(glow)]); g.trait('Grid', n);
      const ex = 1, ey = R.range(0.2, 0.8) * Mx, ea = R.range(-0.6, 0.6), ew = R.range(0.04, 0.1);
      return t => {
        L.fade(glow);
        const segs = mirrors.map(m => { const a = m.a + t * m.w, c = Math.cos(a) * m.h, s = Math.sin(a) * m.h; return [m.cx - c, m.cy - s, m.cx + c, m.cy + s]; });
        let x = ex, y = ey, a = inp.inside ? Math.atan2(inp.y * n - ey, inp.x * n - ex) : ea + Math.sin(t * ew) * 0.5, vx = Math.cos(a), vy = Math.sin(a), last = -1;
        for (let k = 0; k < bounces; k++) {
          let best = Infinity, hit = -1;
          segs.forEach(([x1, y1, x2, y2], j) => {
            if (j === last) return;
            const ex2 = x2 - x1, ey2 = y2 - y1, den = vx * ey2 - vy * ex2;
            if (Math.abs(den) < 1e-9) return;
            const s = ((x1 - x) * ey2 - (y1 - y) * ex2) / den, u = ((x1 - x) * vy - (y1 - y) * vx) / den;
            if (s > 1e-6 && u >= 0 && u <= 1 && s < best) { best = s; hit = j; }
          });
          const tx = vx > 0 ? (Mx - x) / vx : vx < 0 ? -x / vx : Infinity, ty = vy > 0 ? (Mx - y) / vy : vy < 0 ? -y / vy : Infinity, wall = Math.min(tx, ty);
          const s = Math.min(best, wall);
          if (!isFinite(s)) break;
          const nx = x + vx * s, ny = y + vy * s;
          L.beam(x, y, nx, ny, cols[k % cols.length], 1.1 * Math.pow(0.95, k), 0.3);
          if (best < wall) {
            const [x1, y1, x2, y2] = segs[hit], l = Math.hypot(x2 - x1, y2 - y1), px = -(y2 - y1) / l, py = (x2 - x1) / l, dot = vx * px + vy * py;
            vx -= 2 * dot * px; vy -= 2 * dot * py; last = hit;
          } else { if (tx <= ty) vx = -vx; if (ty <= tx) vy = -vy; last = -1; }
          x = nx; y = ny;
        }
        L.flush(d);
        for (const [x1, y1, x2, y2] of segs) X.line(g, x1, y1, x2, y2, X.rgb(235, 235, 245));
      };
    },
  });
})();
