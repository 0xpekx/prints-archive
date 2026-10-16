// Set 2 · Terrain: places, drawn the way old games drew them.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const hex = X.PIX.hex, ramp = a => a.map(hex);
  // for traits: which collection palette a list of packed inks (X.inks) came from, or Spectrum
  const inkName = cols => { const p = U.PALETTES.find(pl => cols.every(c => pl.cols.some(q => U.pk(q) === c))); return p ? p.name : 'Spectrum'; };
  const cap = w => w[0].toUpperCase() + w.slice(1);

  // midpoint displacement ridge of length len (power of two + 1), values ~0..1
  function ridge(R, len, rough) {
    const h = new Float32Array(len);
    h[0] = R(); h[len - 1] = h[0];
    for (let step = len - 1, amp = 0.5; step > 1; step >>= 1, amp *= rough) for (let i = step >> 1; i < len; i += step) h[i] = (h[i - (step >> 1)] + h[i + (step >> 1)]) / 2 + (R() - 0.5) * amp;
    let lo = Infinity, hi = -Infinity;
    for (const v of h) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
    for (let i = 0; i < len; i++) h[i] = (h[i] - lo) / (hi - lo || 1);
    return h;
  }
  // a sky of flat bands with a dithered seam between each
  function skyBands(d, n, cols, top, bottom, x0 = 0, x1 = n) {
    for (let y = top; y < bottom; y++) {
      const z = (y - top) / Math.max(1, bottom - top) * (cols.length - 1), k = Math.floor(z), f = z - k;
      for (let x = x0; x < x1; x++) d[y * n + x] = cols[Math.min(cols.length - 1, k + (X.dith4(x, y) < f ? 1 : 0))];
    }
  }
  // Height bands seen from above (Archipelago): the land shaded by its slope, lit from the
  // north-west, and short wave crests drifting across the open sea instead of lone specks.
  function relief(g, nz, sc, drift, dir, bands, levels, isSea, waveCol, foam, lift = 0.05) {
    const { n, d } = g, N = n * n, H = new Float32Array(N), K = new Uint8Array(N);
    const lit = bands.map(c => X.mixPk(c, WHITE, 0.22)), dark = bands.map(c => X.mixPk(c, BLACK, 0.24));
    return t => {
      const tide = Math.sin(t * 0.35) * 0.035, ox = Math.cos(dir) * t * drift * n, oy = Math.sin(dir) * t * drift * n, ph = Math.floor(t * 3);
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
        const h = nz.fbm((x + ox) * sc, (y + oy) * sc, 3.7, 3) + lift - tide;
        let k = 0; while (k < levels.length && h > levels[k]) k++;
        H[i] = h; K[i] = k;
      }
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
        const k = K[i];
        let c = bands[k];
        if (isSea(k)) { const u = x + ph; if (k <= 1 && u % 11 < 2 && (y * 5 + Math.floor(u / 11) * 7) % 13 === 0) c = waveCol(c, k); }
        else if (k === 3) { if (H[i] > levels[2] + 0.025) c = foam; }
        else if (k >= 5 && x > 0 && y > 0) { const s = H[i] - H[i - n - 1]; if (s > 0.017) c = lit[k]; else if (s < -0.017) c = dark[k]; }
        d[i] = c;
      }
    };
  }

  // Grotto, drawn once into a still layer and lit each frame: rock lit from above (bright
  // ledges, dark undersides) with strata deeper in, stalactites, air that lightens toward the
  // pool, crystals whose glow spills onto the rock around them, drips that ring the water.
  // P: { stone: 6 packed light to dark, air, airLow, water: [surface, mid, deep], drip, crystals, ceilings }
  function grottoView(g, rock, depth, water, P, nz, alt) {
    const { n, d } = g, N = n * n, base = new Uint32Array(N), st = P.stone;
    const ledge = X.mixPk(st[0], WHITE, 0.22), under = st[2];
    // stalactites hang from a few ceilings (drawn, not solid, so drips still fall from them)
    const hang = new Uint8Array(N);
    for (let i = n; i < N - 3 * n; i++) if (rock[i] && !rock[i + n] && alt() < 0.22) { const L = 1 + Math.floor(alt() * 3); for (let k = 1; k <= L && !rock[i + k * n] && (i + k * n) / n < water - 2; k++) hang[i + k * n] = k === L ? 2 : 1; }
    for (let i = 0; i < N; i++) {
      const x = i % n, y = (i / n) | 0;
      if (rock[i]) {
        const dep = depth[i];
        if (dep <= 1) { const up = y > 0 && !rock[i - n], dn = y < n - 1 && !rock[i + n]; base[i] = up ? ledge : dn && !up ? under : st[0]; continue; }
        const k = Math.min(5, dep - 1), v = nz.n2(x * 0.22, y * 0.55);
        base[i] = v > 0.45 && k > 1 ? st[k - 1] : v < -0.55 && k < 5 ? st[k + 1] : st[k];
      } else if (y >= water) {
        base[i] = y === water ? P.water[0] : X.dith4(x, y) < (y - water) / Math.max(1, n - water) * 1.4 ? P.water[2] : P.water[1];
      } else if (hang[i]) base[i] = hang[i] === 2 ? st[1] : st[2];
      else { const q = y / water; base[i] = X.dith8(x, y) < q * q * 0.9 ? P.airLow : P.air; }
    }
    // each crystal lights a small pool around it; the weights are worked out once
    const halo = P.crystals.map(c => {
      const cx = c.i % n, cy = (c.i / n) | 0, cells = [], ws = [];
      for (let y = cy - 5; y <= cy + 5; y++) for (let x = cx - 5; x <= cx + 5; x++) { if (x < 0 || y < 0 || x >= n || y >= n) continue; const r = Math.hypot(x - cx, y - cy); if (r > 5.5 || r < 0.5) continue; const j = y * n + x; cells.push(j); ws.push((1 - r / 5.5) ** 1.6 * (rock[j] ? 0.5 : 0.75)); }
      // the shard points out into the air: two cells, the outer one brightest
      let tip = -1, tip2 = -1;
      for (const o of [-n, -1, 1, n]) { const j = c.i + o; if (j >= 0 && j < N && !rock[j]) { tip = j; const j2 = j + o; if (j2 >= 0 && j2 < N && !rock[j2] && Math.abs((j2 % n) - cx) <= 2) tip2 = j2; break; } }
      return { c, cells, ws, tip, tip2 };
    });
    const drips = [], rings = [], wC = P.water[0], wHi = X.mixPk(P.water[0], WHITE, 0.45);
    return (t, dt, f) => {
      d.set(base);
      for (const h of halo) {
        const c = h.c, glow = 0.55 + 0.45 * Math.sin(t * 1.3 + c.ph);
        for (let k = 0; k < h.cells.length; k++) { const j = h.cells[k]; d[j] = X.mixPk(d[j], c.col, h.ws[k] * glow); }
        d[c.i] = X.mixPk(c.col, BLACK, 0.3 - glow * 0.3);
        if (h.tip >= 0) d[h.tip] = X.mixPk(c.col, WHITE, 0.15 + glow * 0.35);
        if (h.tip2 >= 0) d[h.tip2] = X.mixPk(c.col, WHITE, 0.35 + glow * 0.5);
      }
      // the pool holds a dim, wavering reflection of the cave above, and its surface glints
      const wy = water * n;
      for (let y = water + 1; y < n; y++) { const sy = 2 * water - y, sh = Math.round(Math.sin(y * 1.9 + t * 2.2)); if (sy < 0) break; for (let x = 0; x < n; x++) { const i = y * n + x; if (rock[i]) continue; const sx = Math.min(n - 1, Math.max(0, x + sh)); d[i] = X.mixPk(d[i], d[sy * n + sx], 0.3); } }
      if (water < n) for (let x = 0; x < n; x++) { if (Math.sin(x * 0.7 + t * 1.6) + Math.sin(x * 0.23 - t * 0.9) > 1.2 && !rock[wy + x]) d[wy + x] = wHi; }
      if (P.ceilings.length && f % 4 === 0) drips.push({ i: P.ceilings[(f * 7919 >>> 2) % P.ceilings.length] + n, y: 0 });
      for (let k = drips.length - 1; k >= 0; k--) {
        const dr = drips[k]; dr.y += 1;
        const x = dr.i % n, y = ((dr.i / n) | 0) + dr.y;
        if (y >= n || rock[y * n + x]) { drips.splice(k, 1); continue; }
        if (y >= water) { if (rings.length < 24) rings.push({ x, a: 0 }); drips.splice(k, 1); continue; }
        X.put(g, x, y, P.drip); X.put(g, x, y - 1, X.mixPk(P.drip, d[(y - 1) * n + x] || P.air, 0.6));
      }
      for (let k = rings.length - 1; k >= 0; k--) {
        const r = rings[k]; r.a++;
        const rr = r.a >> 1;
        if (rr > 4) { rings.splice(k, 1); continue; }
        for (const x of [r.x - rr, r.x + rr]) if (x >= 0 && x < n && !rock[wy + x]) d[wy + x] = rr < 3 ? wHi : X.mixPk(wC, wHi, 0.5);
        if (rr === 0 && water > 0) X.put(g, r.x, water - 1, P.drip);
      }
    };
  }

  // A square texture and its smaller copies, each cell the average of four below it, so a
  // floor seen far off is drawn from a smoothed copy instead of shimmering (Mode Seven).
  function mipChain(tex, T, levels) {
    const out = [tex];
    for (let L = 1; L <= levels; L++) {
      const src = out[L - 1], S = T >> (L - 1), D = S >> 1, dst = new Uint32Array(D * D);
      for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
        const a = src[(2 * y) * S + 2 * x], b = src[(2 * y) * S + 2 * x + 1], c = src[(2 * y + 1) * S + 2 * x], e = src[(2 * y + 1) * S + 2 * x + 1];
        dst[y * D + x] = X.rgb(((a & 255) + (b & 255) + (c & 255) + (e & 255)) >> 2, ((a >> 8 & 255) + (b >> 8 & 255) + (c >> 8 & 255) + (e >> 8 & 255)) >> 2, ((a >> 16 & 255) + (b >> 16 & 255) + (c >> 16 & 255) + (e >> 16 & 255)) >> 2);
      }
      out.push(dst);
    }
    return out;
  }
  // the floor of Mode Seven, one row at a time, each row read from the mip level its distance needs
  function modeSevenFloor(g, mip, horizon, cx, cy, ca, sa, fogC) {
    const { n, d } = g;
    for (let y = horizon; y < n; y++) {
      const z = 18 * n / (y - horizon + 0.5), fogk = Math.min(1, z / (n * 14)), dz = z - 18 * n / (y - horizon + 1.5), fp = Math.max(z * 1.4 / n, dz);
      const L = Math.max(0, Math.min(mip.length - 1, Math.floor(Math.log2(Math.max(1, fp)) - 0.4))), sh = L, S = 256 >> L, m = S - 1, tex = mip[L];
      for (let x = 0; x < n; x++) {
        const s = (x / n - 0.5) * z * 1.4, wx = cx + ca * z + -sa * s, wy = cy + sa * z + ca * s;
        const c = tex[(((Math.floor(wy) >> sh) & m) * S) + ((Math.floor(wx) >> sh) & m)];
        d[y * n + x] = fogk > 0.08 ? X.mixPk(c, fogC, fogk * 0.8) : c;
      }
    }
  }

  // Aurora's sound: loudness lifts every curtain; each clap sends a band of light running along them
  function auroraEar(g) {
    const inp = g.input, waves = [];
    let lift = 0;
    return {
      step(dt) {
        if (!inp.listening) { lift = 0; waves.length = 0; return; }
        lift += (inp.level - lift) * 0.3;
        if (inp.beats() && waves.length < 6) waves.push({ x: g.alt(), a: 0, dir: g.alt() < 0.5 ? -1 : 1 });
        for (let k = waves.length - 1; k >= 0; k--) if ((waves[k].a += dt) > 2.2) waves.splice(k, 1);
      },
      at(u) { let b = 1 + lift * 1.1; for (const w of waves) { const c = w.x + w.dir * w.a * 0.7, q = (u - c) / 0.08; b += 1.4 * Math.exp(-q * q) * (1 - w.a / 2.2); } return b; },
    };
  }
  // a snowy range lit from the sky: a bright crest, snowfields that thin with depth, rock on the
  // slopes facing away, all with a little of the aurora's colour in the snow
  function auroraRange(g, peaks, snowLine, floor, cols, glow, amp = 0.25) {
    const { n, d } = g, snowHi = X.mixPk(cols.snow, glow, 0.12), snowLo = X.mixPk(cols.snowLo, glow, 0.06);
    return () => {
      for (let x = 0; x < n; x++) {
        const hx = peaks[(x * 2) & 255], top = Math.round(snowLine - hx * n * amp), slope = peaks[(x * 2 + 10) & 255] - peaks[(x * 2 - 10) & 255], away = slope > 0.04;
        const cap = 3 + Math.round(hx * n * 0.07);
        for (let y = Math.max(0, top); y < floor; y++) {
          const k = y - top, q = (y - top) / Math.max(1, floor - top);
          d[y * n + x] = k < 2 ? snowHi : k < cap ? (away && X.dith8(x, y) < 0.5 ? cols.rockHi : snowLo) : X.dith8(x, y) < 0.75 - q * 1.5 ? cols.rockHi : X.dith8(x, y) < 1.4 - q * 1.5 ? cols.rock : cols.rockLo;
        }
      }
    };
  }

  // Archipelago's land: scattered islands (the original), one great continent, or a sea of atolls
  function landmass(g) {
    const land = g.home ? 'Islands' : g.alt.pick(['Islands', 'Islands', 'Islands', 'Continent', 'Atolls']);
    return { land, lift: land === 'Continent' ? 0.15 : land === 'Atolls' ? -0.07 : 0.05 };
  }

  // times of day for landscapes: sky top to horizon, a sun or moon, and the far and near land
  const DAYS = {
    dawn: { sky: ['#2b2350', '#5a3a6b', '#c4527a', '#f5a37a', '#ffd9a0'], sun: '#fff1c0', far: '#c48aa0', near: '#2b1a3a' },
    day: { sky: ['#29366f', '#3b5dc9', '#41a6f6', '#73eff7', '#c4fbff'], sun: '#fff1e8', far: '#94b0c2', near: '#1a2a3a' },
    dusk: { sky: ['#1a1c2c', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75'], sun: '#fff1c0', far: '#7a3a5a', near: '#170c10' },
    night: { sky: ['#05070f', '#0b1021', '#121a33', '#1d2b4a', '#2a3d66'], sun: '#f0f0d0', far: '#3a4a6a', near: '#05070f' },
    alien: { sky: ['#0b3d2a', '#1a6b4a', '#4fb87a', '#b8f0a0', '#f0ffd0'], sun: '#ff77a8', far: '#2a6b6b', near: '#0b1a1a' },
    ember: { sky: ['#170c10', '#3e1418', '#a22633', '#e43b44', '#feae34'], sun: '#fee761', far: '#5a2028', near: '#0f0608' },
  };

  P.addPixel({
    name: 'Parallax', seed: 2, fam: 'Terrain', sizes: [80, 100], fps: 12,
    recipe: 'Ranges of mountains, each paler with distance and each sliding at its own speed, over a still lake that holds their reflection, at dawn, noon, dusk, night or under an alien sky.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 4, 0.35, true), L = 6, lake = Math.round(n * R.range(0.68, 0.78));
      const skyTop = X.shade(inks[0], 0.35), haze = X.mixPk(inks[inks.length - 1], WHITE, 0.35);
      const sky = X.rampPk([skyTop, X.mixPk(skyTop, haze, 0.5), haze], 6);
      const layers = Array.from({ length: L }, (_, k) => ({ h: ridge(R, 513, R.range(0.5, 0.62)), col: X.mixPk(X.shade(inks[1], 0.18), haze, Math.pow(1 - k / (L - 1), 1.3) * 0.82), base: lake - (L - 1 - k) * n * 0.035, amp: n * (0.1 + 0.16 * (L - k) / L), v: 0.04 + k * 0.08, zoom: 1.2 + (L - k) * 0.5 }));
      const sun = { x: R.range(0.2, 0.8) * n, y: n * R.range(0.18, 0.35), r: n * R.range(0.07, 0.12), col: X.mixPk(inks[inks.length - 1], WHITE, 0.6) };
      const rimC = X.mixPk(sun.col, haze, 0.35), lakeOf = lakeFor(g, lake, sun, 0.62, null);
      g.trait('Sky', 'Painted'); g.trait('Palette', inkName(inks)); g.trait('Ranges', L); g.trait('Lake', lake < n * 0.72 ? 'Wide' : 'Narrow'); g.trait('Birds', 'None'); g.trait('Grid', n);
      return (t, dt, f) => {
        skyBands(d, n, sky, 0, lake);
        for (let y = Math.floor(sun.y - sun.r); y <= sun.y + sun.r; y++) {
          if (y > lake - 1 || ((y - sun.y) > sun.r * 0.2 && (y >> 1) % 2)) continue;
          const w = Math.sqrt(Math.max(0, sun.r * sun.r - (y - sun.y) ** 2));
          X.rect(g, sun.x - w, y, w * 2, 1, sun.col);
        }
        for (const ly of layers) {
          const off = t * ly.v * 12;
          for (let x = 0; x < n; x++) {
            const i = Math.floor((x + off) * ly.zoom) % 512, top = Math.round(ly.base - ly.h[i] * ly.amp);
            for (let y = Math.max(0, top); y < lake; y++) d[y * n + x] = ly.col;
            // a rim of light along each crest, brightest on the slopes that face the sun
            if (top >= 0 && top < lake) { const facing = (x < sun.x) === (ly.h[(i + 3) % 512] > ly.h[i]); d[top * n + x] = X.mixPk(ly.col, rimC, facing ? 0.38 : 0.16); }
          }
        }
        lakeOf(t);
      };
      }
      // the lake: the scene upside down, darker, broken by drifting ripple lines, and the
      // sun's glitter path running down it toward you
      function lakeFor(g, lake, sun, shadeK, mixRipple) {
        const { n, d } = g;
        return t => {
          for (let y = lake; y < n; y++) {
            const src = lake - 1 - (y - lake) * 1.2, row = Math.max(0, Math.round(src)), ripple = Math.sin(y * 1.7 + t * 1.2) > 0.82;
            for (let x = 0; x < n; x++) {
              const sx = ripple ? Math.min(n - 1, x + 1) : x;
              d[y * n + x] = mixRipple && ripple ? mixRipple(d[row * n + sx]) : X.shade(d[row * n + sx], ripple ? 0.9 : shadeK);
            }
            const u = (y - lake) / Math.max(1, n - lake), half = sun.r * (0.45 + 0.9 * u);
            for (let x = Math.max(0, Math.floor(sun.x - half)); x <= Math.min(n - 1, sun.x + half); x++) {
              // glints are short horizontal strokes that wink on and off
              const k = 1 - Math.abs(x + 0.5 - sun.x) / half, seg = Math.floor((x + y * 2) / 3), s = Math.sin(seg * 2.7 + y * 5.1 + t * 2.6) + Math.sin(y * 1.3 - t * 1.9);
              if (s > 1.25 - k * 1.1) d[y * n + x] = X.mixPk(d[y * n + x], sun.col, 0.4 + 0.35 * k);
            }
          }
        };
      }
      function rework(R, U, g) {
      const { n, d } = g, D = DAYS[R.pick(Object.keys(DAYS))], L = R.int(4, 7), lake = Math.round(n * R.range(0.66, 0.8));
      const sky = ramp(D.sky), far = hex(D.far), near = hex(D.near), haze = sky[sky.length - 1];
      const layers = Array.from({ length: L }, (_, k) => ({ h: ridge(R, 513, R.range(0.45, 0.62)), col: X.mixPk(near, far, Math.pow(1 - k / (L - 1), 1.1)), base: lake - (L - 1 - k) * n * 0.04, amp: n * (0.08 + 0.18 * (L - k) / L), v: 0.04 + k * 0.08, zoom: 1.2 + (L - k) * 0.5, snow: k < 2 && R.bool(0.5) }));
      const sun = { x: R.range(0.2, 0.8) * n, y: n * R.range(0.15, 0.38), r: n * R.range(0.06, 0.12), col: hex(D.sun) };
      const stars = D === DAYS.night || D === DAYS.alien ? Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, lake * 0.7)]) : [];
      const birds = R.bool(0.5) ? Array.from({ length: R.int(3, 7) }, () => ({ x: R.range(0, n), y: R.range(0.1, 0.4) * n, v: R.range(0.15, 0.35) })) : [];
      const rimC = X.mixPk(sun.col, haze, 0.35), lakeOf = lakeFor(g, lake, sun, 0.62, c => X.mixPk(c, haze, 0.25));
      g.trait('Sky', cap(Object.keys(DAYS).find(k => DAYS[k] === D))); g.trait('Ranges', L); g.trait('Lake', lake < n * 0.72 ? 'Wide' : 'Narrow'); g.trait('Snow caps', layers.some(l => l.snow) ? 'Yes' : 'None'); g.trait('Birds', birds.length || 'None'); g.trait('Grid', n);
      return (t, dt, f) => {
        skyBands(d, n, sky, 0, lake);
        for (const [x, y] of stars) if ((x + y + (f >> 3)) % 9) X.put(g, x, y, (x * y) % 5 ? 0xff9a9a9a : WHITE);
        for (let y = Math.floor(sun.y - sun.r); y <= sun.y + sun.r; y++) {
          if (y > lake - 1 || ((y - sun.y) > sun.r * 0.2 && (y >> 1) % 2)) continue;
          const w = Math.sqrt(Math.max(0, sun.r * sun.r - (y - sun.y) ** 2));
          X.rect(g, sun.x - w, y, w * 2, 1, sun.col);
        }
        for (const b of birds) { b.x = (b.x + b.v) % (n + 4); const w = (f >> 2) & 1; X.put(g, b.x - 1, b.y - w, near); X.put(g, b.x, b.y, near); X.put(g, b.x + 1, b.y - w, near); }
        for (const ly of layers) {
          const off = t * ly.v * 12;
          for (let x = 0; x < n; x++) {
            const i = Math.floor((x + off) * ly.zoom) % 512, top = Math.round(ly.base - ly.h[i] * ly.amp);
            for (let y = Math.max(0, top); y < lake; y++) d[y * n + x] = ly.snow && y - top < 2 + (ly.h[i] > 0.7 ? 2 : 0) ? X.mixPk(ly.col, WHITE, 0.55) : ly.col;
            if (top >= 0 && top < lake && !ly.snow) { const facing = (x < sun.x) === (ly.h[(i + 3) % 512] > ly.h[i]); d[top * n + x] = X.mixPk(ly.col, rimC, facing ? 0.38 : 0.16); }
          }
        }
        lakeOf(t);
      };
      }

    },
  });

  P.addPixel({
    name: 'Archipelago', seed: 1, fam: 'Terrain', sizes: [80, 100], fps: 10,
    recipe: 'Islands from a height field cut into bands, deep water to peaks, with the tide rising and falling round their coasts and the sea drifting past: tropical, arctic, volcanic or alien.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, nz = U.noise(R), sc = R.range(2.2, 4) / n, drift = R.range(0.006, 0.014), dir = R.range(0, U.TAU);
      const bands = [0xff6a2a10, 0xff8a4416, 0xffb06a20, 0xffc89a50, 0xff8cd4f0, 0xff40b060, 0xff2a8040, 0xff6a7a80, 0xffeef0f4];
      if (R.bool(0.4)) {
        // a palette green for the lowlands, unless it is a sea colour (blue land read as more water)
        const p = X.inks(R, 4, 1, true), c = p[1], r = c & 255, gg = c >> 8 & 255, b = c >> 16 & 255;
        if (!(b > r && b > gg * 0.9)) { bands[5] = c; bands[6] = X.shade(c, 0.7); }
      }
      const levels = [-0.3, -0.12, 0.0, 0.05, 0.11, 0.3, 0.46, 0.6], lm = landmass(g);
      g.trait('World', 'Temperate'); g.trait('Land', lm.land); g.trait('Scale', sc * n < 2.8 ? 'Broad' : sc * n < 3.4 ? 'Medium' : 'Fine'); g.trait('Grid', n);
      return relief(g, nz, sc, drift, dir, bands, levels, k => k <= 2, (c, k) => k <= 1 ? X.shade(c, 1.35) : X.shade(c, 1.25), 0xffe0f0ff, lm.lift);
      }
      function rework(R, U, g) {
      const { n, d } = g, nz = U.noise(R), sc = R.range(2.2, 4.5) / n, drift = R.range(0.006, 0.014), dir = R.range(0, U.TAU);
      const WORLDS = {
        tropical: ['#0b2a5a', '#14468a', '#1d6bb0', '#3a9ad0', '#f0d890', '#4fb84f', '#2e8a3e', '#6a6a5a', '#f4f4f4'],
        arctic: ['#0b1a33', '#14304f', '#1d4a6b', '#3a7a9a', '#c4d4e0', '#e0ecf4', '#a8c0d4', '#7a90a8', '#ffffff'],
        volcanic: ['#0b0b14', '#14141f', '#1f1f2e', '#2e2e42', '#3e2731', '#5a2a28', '#a22633', '#e43b44', '#feae34'],
        alien: ['#2a0a3a', '#3e1458', '#5a2a7a', '#7a4fa0', '#f0c4ff', '#9dff00', '#4fb84f', '#00e5ff', '#fff1e8'],
        autumn: ['#0b1f2a', '#163a4a', '#1f5a6b', '#3a8a9a', '#e0c48a', '#d18f4a', '#be4a2f', '#733e39', '#f4f4f4'],
      };
      const world = R.pick(Object.keys(WORLDS)), bands = ramp(WORLDS[world]);
      const levels = [-0.3, -0.12, 0.0, 0.05, 0.11, 0.3, 0.46, 0.6], lm = landmass(g);
      g.trait('World', cap(world)); g.trait('Land', lm.land); g.trait('Scale', sc * n < 2.9 ? 'Broad' : sc * n < 3.7 ? 'Medium' : 'Fine'); g.trait('Grid', n);
      return relief(g, nz, sc, drift, dir, bands, levels, k => k <= 2, c => X.mixPk(c, WHITE, 0.25), X.mixPk(bands[3], WHITE, 0.6), lm.lift);
      }

    },
  });

  P.addPixel({
    name: 'Grotto', fam: 'Terrain', sizes: [80, 100], fps: 10,
    recipe: 'A cave grown by smoothing noise until it holds together, shaded by depth into the rock, lit by crystals that pulse and water that drips into a still pool.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, N = n * n, inks = X.inks(R, 5, 0.4);
      // the cave and its pool (second stream): as before, or a tight passage or a great cavern; a dry floor or a flooded one
      const cave = g.home ? 'Open' : g.alt.pick(['Open', 'Open', 'Tight', 'Cavern']), caveT = cave === 'Tight' ? 0.36 : cave === 'Cavern' ? 0.5 : 0.42;
      const pool = g.home ? 'Shallow' : g.alt.pick(['Shallow', 'Shallow', 'Dry', 'Flooded']);
      let rock = new Uint8Array(N);
      const coarse = U.noise(R);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) rock[y * n + x] = x === 0 || y === 0 || x === n - 1 || y === n - 1 || coarse.n2(x / n * 3.2, y / n * 3.2) * 0.55 + R() * 0.6 > caveT ? 1 : 0;
      for (let it = 0; it < 7; it++) {
        const nx = new Uint8Array(N);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; c += xx < 0 || yy < 0 || xx >= n || yy >= n ? 1 : rock[yy * n + xx]; }
          nx[y * n + x] = c >= 5 ? 1 : 0;
        }
        rock = nx;
      }
      // depth of each rock cell into the wall
      const depth = new Uint8Array(N).fill(99), q = [];
      for (let i = 0; i < N; i++) if (!rock[i]) { depth[i] = 0; q.push(i); }
      for (let h = 0; h < q.length; h++) { const i = q[h], x = i % n; for (const j of [i - 1, i + 1, i - n, i + n]) { if (j < 0 || j >= N || (j % n !== x && Math.abs(j % n - x) !== 1)) continue; if (depth[j] > depth[i] + 1) { depth[j] = depth[i] + 1; q.push(j); } } }
      const stone = X.rampPk([X.mixPk(inks[0], WHITE, 0.15), X.shade(inks[0], 0.7), X.shade(inks[0], 0.42), X.shade(inks[0], 0.3)], 6), air = X.shade(inks[1], 0.07);
      // the pool fills the lowest open cells
      const water = pool === 'Dry' ? n : pool === 'Flooded' ? Math.round(n * 0.66) : Math.round(n * 0.86);
      const crystals = [], drips = [];
      for (let i = 0; i < N; i++) if (rock[i] && depth[i] === 1 && R() < 0.06) crystals.push({ i, ph: R.range(0, 6), col: inks[R.int(1, inks.length - 1)] });
      const ceilings = []; for (let i = n; i < N - n; i++) if (rock[i] && !rock[i + n] && R() < 0.15) ceilings.push(i);
      const wA = 0xffa06a30, wB = 0xff7a4a20;
      g.trait('Palette', inkName(inks)); g.trait('Pool', pool); g.trait('Cave', cave); g.trait('Crystals', crystals.length < n * 0.4 ? 'Few' : crystals.length < n * 0.55 ? 'Some' : 'Many'); g.trait('Grid', n);
      return grottoView(g, rock, depth, water, { stone, air, airLow: X.mixPk(air, wA, 0.1), water: [X.mixPk(wA, WHITE, 0.3), wA, wB], drip: 0xffe0c890, crystals, ceilings }, coarse, g.alt);
      }
      function rework(R, U, g) {
      const { n, d } = g, N = n * n, sc = X.PIX.scheme(R, ['Sweetie', 'Ice', 'Dusk', 'Ember', 'Neon', 'Candy']);
      let rock = new Uint8Array(N);
      const coarse = U.noise(R), open = R.range(0.38, 0.46);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) rock[y * n + x] = x === 0 || y === 0 || x === n - 1 || y === n - 1 || coarse.n2(x / n * 3.2, y / n * 3.2) * 0.55 + R() * 0.6 > open ? 1 : 0;
      for (let it = 0; it < 7; it++) {
        const nx = new Uint8Array(N);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; c += xx < 0 || yy < 0 || xx >= n || yy >= n ? 1 : rock[yy * n + xx]; }
          nx[y * n + x] = c >= 5 ? 1 : 0;
        }
        rock = nx;
      }
      // depth of each rock cell into the wall
      const depth = new Uint8Array(N).fill(99), q = [];
      for (let i = 0; i < N; i++) if (!rock[i]) { depth[i] = 0; q.push(i); }
      for (let h = 0; h < q.length; h++) { const i = q[h], x = i % n; for (const j of [i - 1, i + 1, i - n, i + n]) { if (j < 0 || j >= N || (j % n !== x && Math.abs(j % n - x) !== 1)) continue; if (depth[j] > depth[i] + 1) { depth[j] = depth[i] + 1; q.push(j); } } }
      const rk = R.pick(sc.ramps), stone = [rk[2], rk[1], X.mixPk(rk[1], rk[0], 0.5), rk[0], X.mixPk(rk[0], sc.ground[0], 0.5), sc.ground[0]], air = sc.ground[0] === BLACK ? hex('#05050a') : X.mixPk(sc.ground[0], BLACK, 0.5);
      const pool = g.alt.pick(['Shallow', 'Shallow', 'Dry', 'Flooded']), water0 = Math.round(n * R.range(0.8, 0.9)), water = pool === 'Dry' ? n : pool === 'Flooded' ? Math.round(n * 0.66) : water0, wat = R.pick(sc.ramps);
      const crystals = [], drips = [];
      for (let i = 0; i < N; i++) if (rock[i] && depth[i] === 1 && R() < 0.06) crystals.push({ i, ph: R.range(0, 6), col: R.pick(sc.ramps)[2] });
      const ceilings = []; for (let i = n; i < N - n; i++) if (rock[i] && !rock[i + n] && R() < 0.15) ceilings.push(i);
      g.trait('Palette', sc.name); g.trait('Pool', pool === 'Shallow' && water < n * 0.85 ? 'Deep' : pool); g.trait('Crystals', crystals.length < n * 0.4 ? 'Few' : crystals.length < n * 0.55 ? 'Some' : 'Many'); g.trait('Cave', open > 0.43 ? 'Cavern' : 'Open'); g.trait('Grid', n);
      return grottoView(g, rock, depth, water, { stone, air, airLow: X.mixPk(air, wat[0], 0.12), water: [wat[2], wat[1], wat[0]], drip: wat[2], crystals, ceilings }, coarse, g.alt);
      }

    },
  });

  // ---------- 114 Night Shift ----------
  const CITY = {
    warm: { sky: ['#05040d', '#0d0b1e', '#1b1736', '#2b2350'], bld: ['#08070f', '#0f0d1c', '#17142b'], rim: '#3d2c6b', win: ['#ffd27a', '#ffb04a', '#fff1c0'], neon: ['#ff2a6d', '#00e5ff'], moon: true },
    cyber: { sky: ['#07020f', '#140829', '#2a0a4a', '#4a0b5e'], bld: ['#06030c', '#0d0719', '#160c28'], rim: '#6b1a8a', win: ['#00e5ff', '#ff2a6d', '#c4fbff'], neon: ['#ff2a6d', '#00e5ff', '#9dff00', '#ffd000'], moon: false },
    noir: { sky: ['#030508', '#070b12', '#0d141f', '#16212f'], bld: ['#040609', '#080c12', '#0d131c'], rim: '#2a3a52', win: ['#e0f0ff', '#9ad1ff', '#ffe9b0'], neon: ['#ff3b3b'], moon: true, rain: true },
    dusk: { sky: ['#1a1c2c', '#5d275d', '#b13e53', '#ef7d57'], bld: ['#0d0b14', '#16121f', '#201a2e'], rim: '#7a3a5a', win: ['#ffcd75', '#ffe9b0', '#ef7d57'], neon: ['#73eff7'], moon: false },
  };
  P.addPixel({
    name: 'Night Shift', fam: 'Terrain', sizes: [80, 100], fps: 10,
    listens: 'The neon flashes on every beat, and the louder the room the more windows light up.',
    recipe: 'A city after dark in a few chosen colours: dark towers rimmed by the moon or the last of the sunset, warm windows switching on and off, neon signs, spires and water towers, red lights on the masts, and traffic below. Warm, neon, rainy noir or dusk.',
    make(R, U, g) {
      const cityK = R.pick(Object.keys(CITY)), { n, d } = g, C = CITY[cityK], road = n - 9;
      // the skyline (from the second stream): midtown as before, low-rise streets or a cluster of towers
      const skyline = g.home ? 'Midtown' : g.alt.pick(['Midtown', 'Midtown', 'Low-rise', 'Towers']), hk = skyline === 'Towers' ? 1.38 : skyline === 'Low-rise' ? 0.52 : 1;
      const sky = ramp(C.sky), bld = ramp(C.bld), rim = hex(C.rim), wins = ramp(C.win), neon = ramp(C.neon);
      const stars = C.rain ? [] : Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, n * 0.45)]);
      const moon = C.moon ? { x: R.range(0.15, 0.85) * n, y: R.range(0.1, 0.22) * n, r: n * R.range(0.04, 0.07) } : null;
      const layer = (depth) => {
        const out = [];
        for (let x = -2; x < n;) {
          const w = R.int(7, 15) - depth * 2, h = Math.min(road - 10, R.int(n * 0.18, n * 0.62) * (1 + depth * 0.2) * hk);
          out.push({ x, w, h, depth, roof: R.pick(['flat', 'flat', 'tank', 'spire', 'step', 'mast']), win: R.pick(wins), wstep: R.pick([2, 3]), sign: depth === 0 && R.bool(0.3) ? { col: R.pick(neon), y: R.int(4, 12), len: R.int(3, 7), side: R.bool(0.5) } : null });
          x += w + R.int(0, 2);
        }
        return out;
      };
      const back = layer(1), front = layer(0), all = [...back, ...front];
      const lit = all.map(tw => { const a = []; for (let y = 3; y < tw.h - 2; y += 3) for (let x = 2; x < tw.w - 1; x += tw.wstep) a.push({ x, y, on: R() < (tw.depth ? 0.25 : 0.35) }); return a; });
      const cars = Array.from({ length: R.int(3, 6) }, () => ({ x: R.range(0, n), v: R.range(0.5, 1.2) * R.sign() }));
      g.trait('City', { warm: 'Warm', cyber: 'Cyber', noir: 'Rainy noir', dusk: 'Dusk' }[cityK]); g.trait('Skyline', skyline); g.trait('Signs', front.filter(t => t.sign).length || 'None'); g.trait('Traffic', cars.length); g.trait('Moon', moon ? 'Yes' : 'None'); g.trait('Grid', n);
      const rain = C.rain ? Array.from({ length: n }, () => ({ x: R.range(0, n), y: R.range(0, n), v: R.range(2, 3) })) : [];
      const inp = g.input, alt = g.alt, asphalt = hex('#08080c'), laneC = hex('#3a3a46'), carC = hex('#1a1a24'), lampC = hex('#fff1c0'), beamC = hex('#8a8060'), tailC = hex('#ff3b3b'), dropA = hex('#3a4a62'), dropB = hex('#2a3a52'), glowC = X.mixPk(sky[sky.length - 1], rim, 0.5);
      let beat = 0;
      return (t, dt, f) => {
        // Listen: every beat flashes the neon; loudness switches windows on across the city
        let loud = 0;
        if (inp.listening) { if (inp.beats()) beat = 1; beat = Math.max(0, beat - dt * 3); loud = inp.level; } else beat = 0;
        skyBands(d, n, sky, 0, road);
        // the glow of the city's own light low in the sky
        for (let y = Math.round(road - n * 0.3); y < road; y++) { const q = (y - (road - n * 0.3)) / (n * 0.3); for (let x = 0; x < n; x++) if (X.dith8(x, y) < q * 0.45) d[y * n + x] = glowC; }
        for (const [x, y] of stars) if ((x * 7 + y + (f >> 3)) % 23) X.put(g, x, y, (x + y) % 3 ? 0xff6a6a7a : 0xffc0c0d0);
        if (moon) X.disc(g, moon.x, moon.y, moon.r, (x, y) => ((x + 0.5 - moon.x) / moon.r + 0.35) ** 2 + ((y + 0.5 - moon.y) / moon.r - 0.2) ** 2 < 0.25 ? hex('#d8d0b0') : hex('#f5eccc'));
        for (let k = 0; k < 2; k++) { const tw = R.int(0, lit.length - 1), w = lit[tw]; if (w.length) { const c = R.pick(w); c.on = !c.on; } }
        for (let k = Math.round(loud * 8); k > 0; k--) { const w = lit[Math.floor(alt() * lit.length)]; if (w.length) w[Math.floor(alt() * w.length)].on = true; }
        all.forEach((tw, k) => {
          const top = road - Math.round(tw.h), base = bld[tw.depth ? 1 : 0], face = tw.depth ? bld[1] : bld[2];
          X.rect(g, tw.x, top, tw.w, road - top, tw.depth ? base : face);
          // the side toward the light keeps a thin rim
          X.rect(g, tw.x, top, 1, road - top, tw.depth ? X.mixPk(base, rim, 0.4) : rim);
          X.rect(g, tw.x, top, tw.w, 1, tw.depth ? X.mixPk(base, rim, 0.5) : rim);
          const mid = tw.x + (tw.w >> 1);
          if (tw.roof === 'tank') { X.rect(g, mid - 2, top - 4, 4, 3, base); X.rect(g, mid - 2, top - 1, 1, 1, base); X.rect(g, mid + 1, top - 1, 1, 1, base); }
          if (tw.roof === 'spire') for (let y = 1; y < 7; y++) X.rect(g, mid - Math.max(0, 2 - (y >> 1)), top - y, 1 + 2 * Math.max(0, 2 - (y >> 1)), 1, base);
          if (tw.roof === 'step') X.rect(g, tw.x + 2, top - 3, tw.w - 4, 3, base);
          if (tw.roof === 'mast') { X.rect(g, mid, top - 7, 1, 7, base); if ((f >> 3) & 1) X.put(g, mid, top - 8, hex('#ff3b3b')); }
          for (const w of lit[k]) if (w.on) { const c = tw.depth ? X.mixPk(tw.win, base, 0.55) : tw.win; X.put(g, tw.x + w.x, top + w.y, c); if (!tw.depth && tw.wstep === 3) X.put(g, tw.x + w.x + 1, top + w.y, X.mixPk(c, face, 0.35)); }
          if (tw.sign) {
            const on = inp.listening ? beat > 0.15 || loud > 0.35 || (f + k * 5) % 40 > 30 : (f + k * 5) % 40 > 3, sx = tw.sign.side ? tw.x + tw.w : tw.x - 2;
            const sc0 = beat ? X.mixPk(tw.sign.col, WHITE, beat * 0.5) : tw.sign.col;
            for (let y = 0; y < tw.sign.len; y++) { X.put(g, sx, top + tw.sign.y + y, on ? sc0 : X.mixPk(tw.sign.col, BLACK, 0.7)); X.put(g, sx + 1, top + tw.sign.y + y, on ? X.mixPk(sc0, WHITE, 0.4) : X.mixPk(tw.sign.col, BLACK, 0.7)); }
            // a lit sign throws a little of its colour onto the wall beside it
            if (on) for (let y = -1; y <= tw.sign.len; y++) { const yy = top + tw.sign.y + y, xx = tw.sign.side ? sx - 1 : sx + 2; if (yy >= 0 && yy < road && xx >= 0 && xx < n) d[yy * n + xx] = X.mixPk(d[yy * n + xx], tw.sign.col, 0.35 + beat * 0.3); }
          }
        });
        X.rect(g, 0, road, n, n - road, asphalt);
        // a wet street holds a dim, wavering copy of the lights above it
        for (let y = road + 1; y < n; y++) { const sy = 2 * road - y, k = C.rain ? 0.42 : 0.2, sh = Math.round(Math.sin(y * 2.1 + t * 1.7)); for (let x = 0; x < n; x++) { const c = d[sy * n + Math.min(n - 1, Math.max(0, x + sh))]; d[y * n + x] = X.mixPk(asphalt, c, k * (1 - (y - road) / (n - road)) ); } }
        X.rect(g, 0, road, n, 1, rim);
        for (let x = 0; x < n; x += 7) X.rect(g, (x + f) % n, road + 5, 3, 1, laneC);
        for (const c of cars) {
          c.x += c.v; if (c.x < -8) c.x = n + 6; if (c.x > n + 8) c.x = -6;
          const y = road + (c.v > 0 ? 6 : 2), cx = Math.round(c.x), dir = Math.sign(c.v);
          X.rect(g, cx, y, 5, 2, carC); X.rect(g, cx + 1, y - 1, 3, 1, carC);
          X.put(g, dir > 0 ? cx + 5 : cx - 1, y + 1, lampC); X.put(g, dir > 0 ? cx + 6 : cx - 2, y + 1, beamC);
          for (let k = 3; k < 6; k++) { const bx = dir > 0 ? cx + 4 + k : cx - k, i = (y + 1) * n + bx; if (bx >= 0 && bx < n && y + 1 < n) d[i] = X.mixPk(d[i], beamC, 0.5 - k * 0.07); }
          X.put(g, dir > 0 ? cx - 1 : cx + 5, y + 1, tailC);
        }
        for (const r of rain) { r.y += r.v; r.x -= 0.5; if (r.y > n) { r.y = 0; r.x = R.range(0, n + 20); } X.put(g, r.x, r.y, dropA); X.put(g, r.x + 0.5, r.y - 1, dropB); }
      };
    },
  });

  // ---------- 115 Snowfall ----------
  const WINTER = {
    night: { sky: ['#05070f', '#0b1021', '#121a33', '#1d2b4a'], snow: ['#6a80a8', '#a8bcdc', '#e0ecff'], walls: [['#2e1a24', '#4a2a36', '#6b3e4a'], ['#1d2433', '#2e3a4f', '#46546b'], ['#2e2418', '#4a3a26', '#6b5636']], roofs: [['#2a0f16', '#4a1a26'], ['#121a26', '#1f2c3d']], win: ['#ffb04a', '#ffe08a'], pine: ['#06140d', '#0d2618', '#163a26'], moon: true, ground: '#0d1426' },
    dusk: { sky: ['#1a1c2c', '#3d2c5a', '#7a4f8a', '#c4708a'], snow: ['#8a7aa8', '#c4b4dc', '#f4ecff'], walls: [['#2e1a2e', '#4a2a46', '#6b3e66'], ['#24203a', '#363052', '#4f4870']], roofs: [['#3a1424', '#5a2038'], ['#1a1a2e', '#2a2a46']], win: ['#ffcd75', '#fff1c0'], pine: ['#0f1a1f', '#1a2e33', '#264247'], moon: false, ground: '#1d1a33' },
    day: { sky: ['#3b5dc9', '#5a8ad8', '#8ab4ea', '#c4dcf8'], snow: ['#9aaed0', '#d0dcf0', '#ffffff'], walls: [['#7a2a2a', '#a83c3c', '#d05a4a'], ['#5a4a2e', '#8a7046', '#b0925e'], ['#2e4a5a', '#466e86', '#6a96b0']], roofs: [['#2a1a1a', '#4a2a26'], ['#26303a', '#3a4a5a']], win: ['#3a4a6a', '#5a6e96'], pine: ['#14331f', '#1f4d2e', '#2e6b3e'], moon: false, ground: '#c4d4ec' },
  };
  P.addPixel({
    name: 'Snowfall', seed: 1, fam: 'Terrain', sizes: [80, 100], fps: 10,
    listens: 'The louder the room, the harder the wind blows the snow.',
    recipe: 'A hamlet of houses and pines at night, at dusk or by day, drawn in one cold palette: lit windows, smoking chimneys, tiered firs. Snow drifts down flake by flake and settles where it lands, roofs and branches whitening until the scene is buried and begins again.',
    make(R, U, g) {
      const tod = R.pick(['night', 'night', 'dusk', 'day']), { n, d } = g, N = n * n, W = WINTER[tod], ground = n - Math.round(n * 0.12), k = n / 60;
      // what stands in the snow and how hard it falls (second stream): a hamlet as before, a pine wood or a village street
      const place = g.home ? 'Hamlet' : g.alt.pick(['Hamlet', 'Hamlet', 'Pine wood', 'Village']), houseP = place === 'Pine wood' ? 0.1 : place === 'Village' ? 0.8 : 0.45;
      const fall = g.home ? 'Steady' : g.alt.pick(['Steady', 'Steady', 'Light', 'Heavy']), perFrame = n / (fall === 'Light' ? 70 : fall === 'Heavy' ? 26 : 40);
      // behind it: open sky as before, snowy mountains, or a dark forest edge
      const backdrop = g.home ? 'Open sky' : g.alt.pick(['Open sky', 'Open sky', 'Mountains', 'Forest edge']), bk = backdrop === 'Open sky' ? null : ridge(g.alt, 129, backdrop === 'Mountains' ? 0.58 : 0.8);
      const sky = ramp(W.sky), snowC = ramp(W.snow), pine = ramp(W.pine), wins = ramp(W.win), groundC = hex(W.ground);
      const solid = new Uint8Array(N), paint = new Uint32Array(N), chimneys = [];
      const stars = W.moon ? Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, n * 0.5)]) : [];
      const moon = W.moon ? { x: R.range(0.15, 0.85) * n, y: n * R.range(0.1, 0.2), r: n * 0.05 } : null;
      const scene = () => {
        solid.fill(0); paint.fill(0); chimneys.length = 0;
        for (let y = ground; y < n; y++) for (let x = 0; x < n; x++) { solid[y * n + x] = 1; paint[y * n + x] = snowC[1]; }
        let x = R.int(-2, 4);
        while (x < n - 6) {
          if (R.bool(houseP)) {
            const w = Math.round(R.int(11, 17) * k), h = Math.round(R.int(7, 11) * k), wall = R.pick(W.walls).map(hex), roof = R.pick(W.roofs).map(hex), win = R.pick(wins);
            for (let y = ground - h; y < ground; y++) for (let u = 0; u < w; u++) {
              if (x + u < 0 || x + u >= n) continue;
              const wy = y - (ground - h), wa = Math.round(3 * k), ww = Math.max(2, Math.round(2 * k)), isWin = ((u >= wa && u < wa + ww) || (u >= w - wa - ww && u < w - wa)) && wy >= Math.round(2 * k) && wy < Math.round(2 * k) + ww, door = Math.abs(u - (w >> 1)) <= (k > 1.4 ? 1 : 0) && wy >= h - Math.round(4 * k);
              solid[y * n + x + u] = 1;
              paint[y * n + x + u] = isWin ? win : door ? wall[0] : u === 0 ? wall[2] : u === w - 1 ? wall[0] : wall[1];
            }
            for (let r = 0; r <= (w >> 1) + 1; r++) for (let u = r - 1; u <= w - r; u++) { const yy = ground - h - r; if (yy > 0 && x + u >= 0 && x + u < n) { solid[yy * n + x + u] = 1; paint[yy * n + x + u] = u < w / 2 ? roof[1] : roof[0]; } }
            if (R.bool(0.7)) { const cxp = x + w - 4, cy0 = ground - h - Math.round(w / 2) + 1; for (let y = cy0 - 3; y < ground - h; y++) for (let u = 0; u < 2; u++) if (cxp + u >= 0 && cxp + u < n && y > 0) { solid[y * n + cxp + u] = 1; paint[y * n + cxp + u] = wall[0]; } chimneys.push({ x: cxp, y: cy0 - 4 }); }
            x += w + R.int(2, 6);
          } else {
            const h = Math.round(R.int(10, 24) * k), tiers = R.int(3, 5);
            for (let y = 0; y < h; y++) {
              const tier = Math.floor(y / h * tiers), within = (y / h * tiers) % 1, w = Math.round((1 + within * (2 + tier * 1.5)) * Math.min(1.5, k));
              for (let u = -w; u <= w; u++) { const i = (ground - h + y) * n + x + 4 + u; if (i >= 0 && x + 4 + u < n && x + 4 + u >= 0) { solid[i] = 1; paint[i] = u < -w / 2 ? pine[2] : u > w / 2 ? pine[0] : pine[1]; } }
            }
            for (let y = ground - 2; y < ground; y++) { const i = y * n + x + 4; if (x + 4 >= 0 && x + 4 < n) { solid[i] = 1; paint[i] = hex('#3a2416'); } }
            x += Math.round(R.int(7, 11) * Math.min(1.5, k));
          }
        }
      };
      scene();
      const snow = new Uint8Array(N), flakes = [], smoke = [], inp = g.input;
      const free = i => !solid[i] && !snow[i];
      let fade = 1, wind = 0;
      g.trait('Time', cap(tod)); g.trait('Place', place); g.trait('Backdrop', backdrop); g.trait('Snowfall', fall); g.trait('Chimneys', chimneys.length || 'None'); g.trait('Moon', moon ? 'Yes' : 'None'); g.trait('Grid', n);
      return (t, dt, f) => {
        // Listen: loudness becomes a wind that drives the snow sideways
        wind += ((inp.listening ? inp.level * 1.6 : 0) - wind) * 0.1;
        for (let k = 0; k < Math.round(perFrame); k++) flakes.push({ x: R.range(0, n) - wind * n * 0.3, y: 0, v: R.range(0.3, 0.7), ph: R.range(0, 6) });
        for (const fl of flakes) {
          const nx = fl.x + Math.sin(t * 0.8 + fl.ph) * 0.25 + wind * fl.v * 1.5, ny = fl.y + fl.v, xi = Math.floor(((nx % n) + n) % n), yi = Math.floor(ny);
          if (yi >= n - 1 || solid[(yi + 1) * n + xi] || snow[(yi + 1) * n + xi]) {
            // settle like real snow: slide off any peak toward the lower side, so it heaps into drifts, not spires
            const s1 = (fl.ph * 7 | 0) & 1 ? 1 : -1;
            let moved = false;
            for (const sx of [xi + s1, xi - s1]) if (sx >= 0 && sx < n && yi + 1 < n && free(yi * n + sx) && free((yi + 1) * n + sx)) { fl.x = sx; fl.y = yi + 1; moved = true; break; }
            if (moved) continue;
            if (!solid[yi * n + xi]) snow[yi * n + xi] = 1;
            fl.dead = true;
          } else { fl.x = ((nx % n) + n) % n; fl.y = ny; }
        }
        for (let k = flakes.length - 1; k >= 0; k--) if (flakes[k].dead) flakes.splice(k, 1);
        let top = 0; for (let x = 0; x < n; x++) if (snow[(n * 0.3 | 0) * n + x]) top++;
        if (top > n * 0.2) fade -= 0.04;
        if (fade <= 0) { snow.fill(0); flakes.length = 0; fade = 1; scene(); }
        skyBands(d, n, sky, 0, ground);
        for (const [x, y] of stars) if ((x + y + (f >> 4)) % 11) X.put(g, x, y, (x * 3 + y) % 4 ? hex('#4a5a7a') : hex('#c4d4f0'));
        if (moon) X.disc(g, moon.x, moon.y, moon.r, hex('#f0f0d8'));
        if (bk) {
          const far = X.mixPk(sky[sky.length - 1], pine[0], backdrop === 'Mountains' ? 0.25 : 0.7), cap = X.mixPk(snowC[1], sky[sky.length - 1], 0.35);
          for (let x = 0; x < n; x++) {
            const h = backdrop === 'Mountains' ? n * (0.12 + 0.3 * bk[x * 128 / n | 0]) : n * (0.1 + 0.08 * bk[x * 128 / n | 0]) + ((x * 7) % 5 < 2 ? 2 : 0), top = Math.round(ground - h);
            for (let y = Math.max(0, top); y < ground; y++) d[y * n + x] = backdrop === 'Mountains' && y - top < 2 + ((x * 13) % 3) ? cap : far;
          }
        }
        for (let i = 0; i < N; i++) {
          if (paint[i]) d[i] = paint[i];
          if (snow[i]) d[i] = i >= n && !snow[i - n] ? snowC[2] : (X.dith4(i % n, i / n | 0) < 0.25 ? snowC[0] : snowC[1]);
        }
        // once the drifts rise past a house or a tree, it disappears into them: a run of solid cells
        // with snow on both sides is drawn under the snow, a shade darker so its shape still shows
        for (let y = 0; y < ground; y++) for (let x = 0; x < n;) {
          const i = y * n + x;
          if (!solid[i]) { x++; continue; }
          let e = x; while (e < n && solid[y * n + e]) e++;
          if ((x === 0 || snow[i - 1]) && (e === n || snow[y * n + e])) for (let k = x; k < e; k++) d[y * n + k] = X.mixPk(snowC[1], paint[y * n + k] || snowC[0], 0.18);
          x = e;
        }
        X.rect(g, 0, n - 2, n, 2, groundC === snowC[1] ? snowC[0] : X.mixPk(snowC[0], groundC, 0.5));
        if (f % 6 === 0) for (const c of chimneys) smoke.push({ x: c.x + 1, y: c.y, a: 0 });
        for (let k = smoke.length - 1; k >= 0; k--) { const s = smoke[k]; s.a++; s.y -= 0.4; s.x += Math.sin(s.a * 0.2) * 0.3 + 0.15; if (s.a > 40) { smoke.splice(k, 1); continue; } if (X.dith4(s.x | 0, s.y | 0) < 1 - s.a / 40) X.put(g, s.x, s.y, s.a < 15 ? snowC[1] : snowC[0]); }
        for (const fl of flakes) X.put(g, fl.x, fl.y, fl.v > 0.55 ? WHITE : snowC[2]);
        if (fade < 1) U.fadePx(d, fade);
      };
    },
  });

  P.addPixel({
    name: 'Voxel Flight', seed: 2, fam: 'Terrain', sizes: [80, 100], fps: 12,
    recipe: 'Low flight over generated land drawn the way early flight games did it: one column at a time, near to far, each slice of ground only painted where nothing nearer already stands. Green hills, desert canyons, snowfields, alien moors or lava fields.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, M = 256, nz = U.noise(R), hm = new Float32Array(M * M), cm = new Uint32Array(M * M);
      const inks0 = X.inks(R, 5, 0.45, true), pal = X.rampPk(inks0, 32), sc = R.range(3, 6) / M;
      g.trait('Land', 'Painted'); g.trait('Palette', inkName(inks0)); g.trait('Relief', sc * M < 4 ? 'Broad' : sc * M < 5 ? 'Rolling' : 'Rugged'); g.trait('Grid', n);
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
        // tileable by sampling a torus in 4D through two noise planes
        const a = x / M * U.TAU, b = y / M * U.TAU, r = M * sc / U.TAU * 3.5;
        let h = nz.n3(Math.cos(a) * r, Math.sin(a) * r, Math.cos(b) * r * 0.9 + 5) * 0.6 + nz.n3(Math.sin(b) * r * 2, Math.cos(b) * r * 2, Math.cos(a) * r * 2 + 9) * 0.3;
        h = Math.max(-0.25, h);
        hm[y * M + x] = h * 2.6;
        cm[y * M + x] = h <= -0.25 ? ((x + y) % 5 ? 0xffa0601a : 0xffc08030) : pal[Math.max(0, Math.min(31, Math.floor((h + 0.3) * 40)))];
      }
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) { const i = y * M + x; if (hm[i] > -0.6) { const sl = hm[i] - hm[y * M + ((x + 1) & 255)]; cm[i] = X.shade(cm[i], Math.max(0.55, Math.min(1.3, 1 + sl * 6))); } }
      const skyA = X.shade(pal[4], 0.5), skyB = X.mixPk(pal[28], WHITE, 0.4), sky = X.rampPk([skyA, skyB], 16), fog = skyB;
      const speed = R.range(4, 7), turn = R.range(0.04, 0.09);
      const ybuf = new Int32Array(n);
      let camH = 2.2;
      return t => {
        skyBands(d, n, sky, 0, n);
        const px = t * speed * 2, py = t * speed * 4, ang = Math.sin(t * turn) * 0.8 + t * 0.03, ca = Math.cos(ang), sa = Math.sin(ang), horizon = n * 0.3, dist = 90;
        let ground = 0;
        for (let k = 0; k < 12; k++) ground = Math.max(ground, hm[((Math.floor(py + sa * 0 + ca * k * 2) & 255) << 8) | (Math.floor(px - sa * 0 - sa * k * 2) & 255)]);
        camH += ((Math.max(1.6, ground + 1.1)) - camH) * 0.08;
        const height = camH;
        ybuf.fill(n);
        for (let z = 1; z < dist; z += z < 20 ? 0.5 : 1) {
          const lx = -z, rx = z, fogk = Math.pow(z / dist, 1.4);
          for (let x = 0; x < n; x++) {
            const u = lx + (rx - lx) * x / n, wx = px + ca * u - sa * z, wy = py + sa * u + ca * z;
            let h, c;
            if (z < 24) {   // close by, blend the four nearest samples so the ground rolls instead of stepping in blocks
              const fx = Math.floor(wx), fy = Math.floor(wy), ax = wx - fx, ay = wy - fy, r0 = (fy & 255) << 8, r1 = ((fy + 1) & 255) << 8, c0 = fx & 255, c1 = (fx + 1) & 255;
              h = (hm[r0 | c0] * (1 - ax) + hm[r0 | c1] * ax) * (1 - ay) + (hm[r1 | c0] * (1 - ax) + hm[r1 | c1] * ax) * ay;
              // colours blend only across land; at the shore keep the nearest so water never goes muddy
              const lo = Math.min(hm[r0 | c0], hm[r0 | c1], hm[r1 | c0], hm[r1 | c1]);
              c = lo > -0.64 ? X.mixPk(X.mixPk(cm[r0 | c0], cm[r0 | c1], ax), X.mixPk(cm[r1 | c0], cm[r1 | c1], ax), ay) : cm[(ay < 0.5 ? r0 : r1) | (ax < 0.5 ? c0 : c1)];
            } else { const i = ((Math.floor(wy) & 255) << 8) | (Math.floor(wx) & 255); h = hm[i]; c = cm[i]; }
            const sy = Math.round((height - h) / z * n * 0.9 + horizon);
            if (sy < ybuf[x]) {
              const col = fogk > 0.05 ? X.mixPk(c, fog, fogk) : c;
              for (let y = Math.max(0, sy); y < ybuf[x]; y++) d[y * n + x] = col;
              ybuf[x] = Math.max(0, sy);
            }
          }
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, M = 256, nz = U.noise(R), hm = new Float32Array(M * M), cm = new Uint32Array(M * M);
      const LANDS = {
        hills: { ramp: ['#1d4a6b', '#e0c48a', '#4fb84f', '#2e8a3e', '#1f5a2e', '#6a6a5a', '#9a9a8a', '#f4f4f4'], sky: ['#3b5dc9', '#c4fbff'] },
        desert: { ramp: ['#3a6b8a', '#feae34', '#d77643', '#be4a2f', '#733e39', '#a0613f', '#d9956a', '#fcd9bd'], sky: ['#ef7d57', '#fff1c0'] },
        snow: { ramp: ['#1d3a6b', '#9ad1ff', '#c4dcf0', '#8aa0c0', '#5a6e8a', '#c4d4e8', '#e8f0ff', '#ffffff'], sky: ['#566c86', '#e0ecff'] },
        alien: { ramp: ['#0b3d4a', '#9dff00', '#4fb84f', '#2a6b6b', '#5a2a7a', '#b026ff', '#f0a8ff', '#fff1e8'], sky: ['#3b0a5e', '#ffb3c9'] },
        lava: { ramp: ['#feae34', '#e43b44', '#3e2731', '#2b1418', '#1f1418', '#3e3a46', '#5a5a6a', '#8a8a9a'], sky: ['#170c10', '#be4a2f'] },
      };
      const landK = R.pick(Object.keys(LANDS)), land = LANDS[landK], pal = X.rampPk(ramp(land.ramp), 32), sc = R.range(3, 6) / M;
      g.trait('Land', { hills: 'Green hills', desert: 'Canyons', snow: 'Snowfield', alien: 'Alien moor', lava: 'Lava field' }[landK]); g.trait('Relief', sc * M < 4 ? 'Broad' : sc * M < 5 ? 'Rolling' : 'Rugged'); g.trait('Grid', n);
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
        // tileable by sampling a torus through two noise planes
        const a = x / M * U.TAU, b = y / M * U.TAU, r = M * sc / U.TAU * 3.5;
        let h = nz.n3(Math.cos(a) * r, Math.sin(a) * r, Math.cos(b) * r * 0.9 + 5) * 0.6 + nz.n3(Math.sin(b) * r * 2, Math.cos(b) * r * 2, Math.cos(a) * r * 2 + 9) * 0.3;
        h = Math.max(-0.25, h);
        hm[y * M + x] = h * 2.6;
        cm[y * M + x] = h <= -0.25 ? ((x + y) % 5 ? pal[0] : pal[3]) : pal[Math.max(4, Math.min(31, Math.floor((h + 0.3) * 40)))];
      }
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) { const i = y * M + x; if (hm[i] > -0.6) { const sl = hm[i] - hm[y * M + ((x + 1) & 255)]; cm[i] = X.shade(cm[i], Math.max(0.55, Math.min(1.3, 1 + sl * 6))); } }
      const sky = X.rampPk(ramp(land.sky), 16), fog = sky[15];
      const speed = R.range(4, 7), turn = R.range(0.04, 0.09);
      const ybuf = new Int32Array(n);
      let camH = 2.2;
      return t => {
        skyBands(d, n, sky, 0, n);
        const px = t * speed * 2, py = t * speed * 4, ang = Math.sin(t * turn) * 0.8 + t * 0.03, ca = Math.cos(ang), sa = Math.sin(ang), horizon = n * 0.3, dist = 90;
        let ground = 0;
        for (let k = 0; k < 12; k++) ground = Math.max(ground, hm[((Math.floor(py + ca * k * 2) & 255) << 8) | (Math.floor(px - sa * k * 2) & 255)]);
        camH += ((Math.max(1.6, ground + 1.1)) - camH) * 0.08;
        const height = camH;
        ybuf.fill(n);
        for (let z = 1; z < dist; z += z < 20 ? 0.5 : 1) {
          const lx = -z, rx = z, fogk = Math.pow(z / dist, 1.4);
          for (let x = 0; x < n; x++) {
            const u = lx + (rx - lx) * x / n, wx = px + ca * u - sa * z, wy = py + sa * u + ca * z;
            let h, c;
            if (z < 24) {   // close by, blend the four nearest samples so the ground rolls instead of stepping in blocks
              const fx = Math.floor(wx), fy = Math.floor(wy), ax = wx - fx, ay = wy - fy, r0 = (fy & 255) << 8, r1 = ((fy + 1) & 255) << 8, c0 = fx & 255, c1 = (fx + 1) & 255;
              h = (hm[r0 | c0] * (1 - ax) + hm[r0 | c1] * ax) * (1 - ay) + (hm[r1 | c0] * (1 - ax) + hm[r1 | c1] * ax) * ay;
              // colours blend only across land; at the shore keep the nearest so water never goes muddy
              const lo = Math.min(hm[r0 | c0], hm[r0 | c1], hm[r1 | c0], hm[r1 | c1]);
              c = lo > -0.64 ? X.mixPk(X.mixPk(cm[r0 | c0], cm[r0 | c1], ax), X.mixPk(cm[r1 | c0], cm[r1 | c1], ax), ay) : cm[(ay < 0.5 ? r0 : r1) | (ax < 0.5 ? c0 : c1)];
            } else { const i = ((Math.floor(wy) & 255) << 8) | (Math.floor(wx) & 255); h = hm[i]; c = cm[i]; }
            const sy = Math.round((height - h) / z * n * 0.9 + horizon);
            if (sy < ybuf[x]) {
              const col = fogk > 0.05 ? X.mixPk(c, fog, fogk) : c;
              for (let y = Math.max(0, sy); y < ybuf[x]; y++) d[y * n + x] = col;
              ybuf[x] = Math.max(0, sy);
            }
          }
        }
      };
      }

    },
  });

  // Seasons' variety (second stream; the opening variation keeps spring, day, the hill, the centre):
  // the season it opens in, the hour (dawn, dusk or a moonlit night graded over the whole scene),
  // the ground (hill, flat meadow, high knoll or a lakeside that holds the tree's reflection) and
  // where the tree stands. The year turns at the same pace in every one.
  function seasonsLook(g, n, segs, leaves) {
    const A = g.alt, home = g.home;
    const season = home ? 'Spring' : A.pick(['Spring', 'Spring', 'Summer', 'Autumn', 'Winter']);
    const light = home ? 'Day' : A.pick(['Day', 'Day', 'Day', 'Dawn', 'Dusk', 'Night']);
    const ground = home ? 'Hill' : A.pick(['Hill', 'Hill', 'Meadow', 'Knoll', 'Lakeside']);
    const place = home ? 'Centre' : A.pick(['Centre', 'Centre', 'Left', 'Right']);
    const dx = place === 'Left' ? -0.2 * n : place === 'Right' ? 0.2 * n : 0;
    if (dx) { for (const sg of segs) { sg.x += dx; sg.x1 += dx; } for (const lf of leaves) lf.x = Math.round(lf.x + dx); }
    const stars = light === 'Night' ? Array.from({ length: n }, () => [Math.floor(A() * n), Math.floor(A() * n * 0.55)]) : [];
    const moon = { x: (dx > 0 ? 0.22 : 0.76) * n, y: 0.17 * n, r: n * 0.045 };
    const lake = Math.round(n * 0.9), { d } = g, hillY = Math.round(n * 0.78);
    const grad = (light === 'Dusk' ? ['#1a1c3c', '#3d2c5a', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75'] : ['#3a4a8a', '#6a6ab0', '#b08ac0', '#f0a0b0', '#ffd0a0', '#fff0c0']).map(hex);
    g.trait('Opens in', season); g.trait('Light', light); g.trait('Ground', ground); g.trait('Stands', place);
    return {
      phase: { Spring: 0.12, Summer: 0.37, Autumn: 0.62, Winter: 0.87 }[season],
      bump: ground === 'Meadow' ? 0.015 : ground === 'Knoll' ? 0.11 : ground === 'Lakeside' ? 0.03 : 0.06,
      post(t) {
        if (ground === 'Lakeside') for (let y = lake; y < n; y++) { const sy = 2 * lake - y - 1, sh = Math.round(Math.sin(y * 1.9 + t * 1.4)); for (let x = 0; x < n; x++) { const c = d[sy * n + Math.min(n - 1, Math.max(0, x + sh))]; d[y * n + x] = y === lake ? X.mixPk(c, WHITE, 0.4) : X.mixPk(X.shade(c, 0.7), 0xffa06030, 0.25); } }
        if (light === 'Day') return;
        if (light === 'Night') {
          for (let i = 0; i < n * n; i++) { const c = d[i]; d[i] = X.rgb((c & 255) * 0.26, (c >> 8 & 255) * 0.32, (c >> 16 & 255) * 0.55); }
          for (const [x, y] of stars) { const i = y * n + x; if (X.lum(d[i]) < 0.2 && (x + y) % 3) d[i] = (x * y) % 5 ? 0xff9a9a8a : WHITE; }
          X.disc(g, moon.x, moon.y, moon.r, 0xffd8f0f4);
          return;
        }
        // the sky is repainted where it shows (each row's own sky colour), the rest is warmed a little
        const refX = dx > 0 ? 0 : n - 1, tint = light === 'Dusk' ? 0xff5d275d : 0xffc0c0ff, k = light === 'Dusk' ? 0.22 : 0.12, sh = light === 'Dusk' ? 0.86 : 1;
        for (let y = 0; y < n; y++) {
          const ref = y < hillY ? d[y * n + refX] : -1, row = y * n;
          for (let x = 0; x < n; x++) { const i = row + x; d[i] = d[i] === ref ? grad[Math.min(grad.length - 1, Math.floor(y / hillY * grad.length + X.dith4(x, y) - 0.5))] || grad[0] : X.shade(X.mixPk(d[i], tint, k), sh); }
        }
      },
    };
  }

  P.addPixel({
    name: 'Seasons', fam: 'Terrain', sizes: [80, 100], fps: 10,
    recipe: 'One tree on one hill through a whole year: blossom, full leaf, leaves turning and falling, then bare branches under snow. Oak, birch, willow or a blossoming cherry, each grown fresh.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, hill = n * 0.82, segs = [], tips = [];
      const grow = (x, y, a, len, depth) => {
        const x1 = x + Math.cos(a) * len, y1 = y - Math.sin(a) * len;
        segs.push({ x, y, x1, y1, w: depth });
        if (depth <= 0) { tips.push({ x: x1, y: y1 }); return; }
        const k = R.int(2, 3);
        for (let i = 0; i < k; i++) grow(x1, y1, a + R.range(-0.75, 0.75), len * R.range(0.62, 0.78), depth - 1);
      };
      grow(n / 2, hill, Math.PI / 2 + R.range(-0.1, 0.1), n * R.range(0.16, 0.2), 5);
      const leaves = [];
      for (const tp of tips) for (let k = 0; k < 10; k++) { const lx = Math.round(tp.x + R.gauss() * n * 0.03), ly = Math.round(tp.y + R.gauss() * n * 0.025); leaves.push({ x: lx, y: ly, k: R(), fall: null, low: ly > tp.y + 1 }); }
      // a denser core to each clump (from the second stream, so the tree itself is unchanged)
      for (const tp of tips) for (let k = 0; k < 6; k++) { const ly = Math.round(tp.y + g.alt.gauss() * n * 0.016); leaves.push({ x: Math.round(tp.x + g.alt.gauss() * n * 0.02), y: ly, k: g.alt(), fall: null, low: ly > tp.y + 1 }); }
      const YEAR = 40, bark = 0xff1a2a3a, V = seasonsLook(g, n, segs, leaves);
      g.trait('Tree', 'Elm');
      const skies = [0xffe8c8a0, 0xfff0b060, 0xff7090c0, 0xff605050], ground = [0xff40a060, 0xff309040, 0xff2a6aa0, 0xfff0f0f0];
      const leafCol = [0xffc0a0ff, 0xff30a040, 0xff1a80e0, 0];
      return t => {
        t += YEAR * V.phase;   // open with the blossom already out (or in the season this variation opens in)
        const yr = (t % YEAR) / YEAR * 4, s = Math.floor(yr), u = yr - s, nxt = (s + 1) % 4, blend = u > 0.8 ? (u - 0.8) / 0.2 : 0;
        const sky = X.mixPk(skies[s], skies[nxt], blend);
        for (let y = 0; y < n; y++) { const c = X.shade(sky, 0.75 + 0.25 * y / n); d.fill(c, y * n, y * n + n); }
        const gc = X.mixPk(ground[s], ground[nxt], blend), gHi = X.mixPk(gc, WHITE, 0.18), gShadow = X.shade(gc, 0.82);
        for (let x = 0; x < n; x++) { const top = Math.round(hill - Math.cos((x / n - 0.5) * 2.2) * n * V.bump); for (let y = top; y < n; y++) d[y * n + x] = y === top ? gHi : gc; }
        // the tree's shadow pooled on the hill
        for (let y = 0; y < 3; y++) { const w = n * (0.14 - y * 0.03), cy = Math.round(hill) + y; X.rect(g, segs[0].x - w * 0.6, cy, w * 1.6, 1, gShadow); }
        for (const sg of segs) X.line(g, sg.x, sg.y, sg.x1, sg.y1, (x, y) => { for (let k = -Math.floor(sg.w / 2); k <= Math.ceil(sg.w / 2) - 1; k++) X.put(g, x + k, y, bark); if (s === 3 && u > 0.2 && sg.w < 3) X.put(g, x, y - 1, 0xfff4f4f4); });
        for (const lf of leaves) {
          let col = 0, x = lf.x, y = lf.y;
          if (s === 0) col = u > lf.k * 0.6 ? (lf.k < 0.6 ? 0xffd0b8ff : 0xff70c070) : 0;
          else if (s === 1) col = lf.k < 0.15 ? 0xff50b060 : lf.low ? X.shade(leafCol[1], 0.75) : leafCol[1];
          else if (s === 2) {
            col = X.mixPk(leafCol[1], lf.k < 0.5 ? leafCol[2] : 0xff2050c8, Math.min(1, u * 2));
            if (u > 0.35 + lf.k * 0.5) { const fall = (u - 0.35 - lf.k * 0.5) * YEAR / 4 * 6; y = Math.min(hill + 2, lf.y + fall); x = lf.x + Math.round(Math.sin(fall * 0.4 + lf.k * 9) * 2); if (y >= hill + 2) col = X.shade(col, 0.6); }
          }
          if (col) X.put(g, x, y, col);
        }
        if (s === 3) for (let k = 0; k < n / 2; k++) X.put(g, (k * 37 + Math.floor(t * 3) * (k % 5 + 1)) % n, (k * 53 + Math.floor(t * 10 * (1 + k % 3))) % n, 0xffffffff);
        V.post(t);
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, hill = n * R.range(0.78, 0.86), segs = [], tips = [], kind = R.pick(['oak', 'birch', 'willow', 'cherry']);
      const spread = kind === 'birch' ? 0.45 : kind === 'willow' ? 0.9 : 0.75;
      const grow = (x, y, a, len, depth) => {
        const x1 = x + Math.cos(a) * len, y1 = y - Math.sin(a) * len;
        segs.push({ x, y, x1, y1, w: depth });
        if (depth <= 0) { tips.push({ x: x1, y: y1 }); return; }
        const k = R.int(2, 3);
        for (let i = 0; i < k; i++) grow(x1, y1, a + R.range(-spread, spread), len * R.range(0.62, 0.78), depth - 1);
      };
      grow(n / 2 + R.range(-0.1, 0.1) * n, hill, Math.PI / 2 + R.range(-0.12, 0.12), n * R.range(0.15, 0.2), 5);
      const leaves = [];
      for (const tp of tips) for (let k = 0; k < 10; k++) { const dy = kind === 'willow' ? Math.abs(R.gauss()) * n * 0.06 : R.gauss() * n * 0.025; leaves.push({ x: Math.round(tp.x + R.gauss() * n * 0.03), y: Math.round(tp.y + dy), k: R(), fall: null, low: dy > 1 }); }
      for (const tp of tips) for (let k = 0; k < 6; k++) { const dy = kind === 'willow' ? Math.abs(g.alt.gauss()) * n * 0.05 : g.alt.gauss() * n * 0.016; leaves.push({ x: Math.round(tp.x + g.alt.gauss() * n * 0.02), y: Math.round(tp.y + dy), k: g.alt(), fall: null, low: dy > 1 }); }
      const YEAR = R.int(32, 48), bark = kind === 'birch' ? [hex('#e8e8e0'), hex('#1a1a1a')] : [hex('#3a2416'), hex('#5a3a22')];
      const S = { 0: { sky: '#c4dcf8', ground: '#5fbf5f' }, 1: { sky: '#73c4f6', ground: '#38a048' }, 2: { sky: '#e0a070', ground: '#8a7a3a' }, 3: { sky: '#7a86a8', ground: '#f0f4ff' } };
      const leafCol = kind === 'cherry' ? ['#ffb3c9', '#3e8948', '#e43b44'] : kind === 'birch' ? ['#d0f0a0', '#7ab83a', '#ffd000'] : ['#c4f0a0', '#2e8a3e', '#d77643'];
      const lc = leafCol.map(hex), V = seasonsLook(g, n, segs, leaves);
      g.trait('Tree', cap(kind));
      return t => {
        t += YEAR * V.phase;   // open with the blossom already out (or in the season this variation opens in)
        const yr = (t % YEAR) / YEAR * 4, s = Math.floor(yr), u = yr - s, nxt = (s + 1) % 4, blend = u > 0.8 ? (u - 0.8) / 0.2 : 0;
        const sky = X.mixPk(hex(S[s].sky), hex(S[nxt].sky), blend), gr = X.mixPk(hex(S[s].ground), hex(S[nxt].ground), blend);
        for (let y = 0; y < n; y++) { const k = y / n + (X.dith4(y, y) - 0.5) * 0.08; d.fill(k < 0.35 ? X.shade(sky, 0.8) : k < 0.6 ? X.shade(sky, 0.9) : sky, y * n, y * n + n); }
        for (let x = 0; x < n; x++) { const top = Math.round(hill - Math.cos((x / n - 0.5) * 2.2) * n * V.bump); for (let y = top; y < n; y++) d[y * n + x] = y === top ? X.mixPk(gr, WHITE, 0.2) : (x * 7 + y * 3) % 13 === 0 ? X.shade(gr, 0.85) : gr; }
        const grS = X.shade(gr, 0.8), tx = segs[0].x;
        for (let y = 0; y < 3; y++) { const w = n * (0.14 - y * 0.03), cy = Math.round(hill) + y; X.rect(g, tx - w * 0.6, cy, w * 1.6, 1, grS); }
        for (const sg of segs) X.line(g, sg.x, sg.y, sg.x1, sg.y1, (x, y) => { for (let k = -Math.floor(sg.w / 2); k <= Math.ceil(sg.w / 2) - 1; k++) X.put(g, x + k, y, kind === 'birch' && (y % 5 === 0) ? bark[1] : k < 0 ? bark[1] : bark[0]); if (s === 3 && u > 0.2 && sg.w < 3) X.put(g, x, y - 1, 0xfff4f4f4); });
        for (const lf of leaves) {
          let col = 0, x = lf.x, y = lf.y;
          if (s === 0) col = u > lf.k * 0.6 ? (lf.k < 0.6 ? lc[0] : X.mixPk(lc[1], lc[0], 0.5)) : 0;
          else if (s === 1) col = lf.k < 0.2 ? X.mixPk(lc[1], WHITE, 0.25) : lf.k > 0.85 || lf.low ? X.shade(lc[1], 0.74) : lc[1];
          else if (s === 2) {
            col = X.mixPk(lc[1], lf.k < 0.5 ? lc[2] : hex('#be4a2f'), Math.min(1, u * 2));
            if (u > 0.35 + lf.k * 0.5) { const fall = (u - 0.35 - lf.k * 0.5) * YEAR / 4 * 6; y = Math.min(hill + 2, lf.y + fall); x = lf.x + Math.round(Math.sin(fall * 0.4 + lf.k * 9) * 2); if (y >= hill + 2) col = X.shade(col, 0.6); }
          }
          if (col) X.put(g, x, y, col);
        }
        if (s === 3) for (let k = 0; k < n / 2; k++) X.put(g, (k * 37 + Math.floor(t * 3) * (k % 5 + 1)) % n, (k * 53 + Math.floor(t * 10 * (1 + k % 3))) % n, 0xffffffff);
        V.post(t);
      };
      }

    },
  });

  P.addPixel({
    name: 'Mode Seven', seed: 2, fam: 'Terrain', sizes: [80, 100], fps: 12,
    recipe: 'A flat world tilted into perspective, as old consoles did it, one row at a time. The ground is the collection’s own modulo field, and the camera circles slowly over it.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, T = 256, tex = new Uint32Array(T * T), sc = U.scheme(R);
      const m1 = R.int(3, 9), yd = R.int(20, 60), road = R.bool(0.5);
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
        const v = ((x * m1) % (y % yd + 7)) / (y % yd + 7);
        let c = sc.lut[Math.floor(v * 255) & 255];
        if ((x & 31) === 0 || (y & 31) === 0) c = X.shade(c, 0.4);
        if (road && (Math.abs(x - 128) < 6 || Math.abs(y - 128) < 6)) c = (x + y) & 4 ? 0xff303030 : 0xff3a3a3a;
        tex[y * T + x] = c;
      }
      // (the scheme's colours are plain triples: pack them, or the sky came out grey)
      const horizon = Math.round(n * 0.3), skyCols = X.rampPk([X.shade(U.pk(sc.cols[0]), 0.3), X.mixPk(U.pk(sc.cols[3 % sc.cols.length]), WHITE, 0.4)], 5);
      const hills = ridge(R, 257, 0.55), rad = R.range(60, 110), spd = R.range(0.05, 0.1), mip = mipChain(tex, T, 4);
      g.trait('Palette', sc.native ? 'Rainbow' : sc.name); g.trait('Field', 'Mod ' + m1); g.trait('Road', road ? 'Crossroads' : 'None'); g.trait('Grid lines', 32); g.trait('Horizon', 'High'); g.trait('Turn', 'Left');
      return t => {
        const a = t * spd, cx = 128 + Math.cos(a) * rad, cy = 128 + Math.sin(a) * rad, heading = a + Math.PI / 2, ca = Math.cos(heading), sa = Math.sin(heading);
        skyBands(d, n, skyCols, 0, horizon);
        for (let x = 0; x < n; x++) {
          const u = (x / n * 64 + heading / U.TAU * 256 * 2) & 255, h = Math.round(hills[u] * n * 0.12);
          for (let y = horizon - h; y < horizon; y++) d[y * n + x] = X.shade(skyCols[2], 0.55);
        }
        modeSevenFloor(g, mip, horizon, cx, cy, ca, sa, skyCols[4]);
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, T = 256, tex = new Uint32Array(T * T), sc = U.scheme(R);
      const m1 = R.int(3, 9), yd = R.int(20, 60), road = R.bool(0.5), grid = R.pick([16, 32, 64]);
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
        const v = ((x * m1) % (y % yd + 7)) / (y % yd + 7);
        let c = sc.lut[Math.floor(v * 255) & 255];
        if ((x % grid) === 0 || (y % grid) === 0) c = X.shade(c, 0.4);
        if (road && (Math.abs(x - 128) < 6 || Math.abs(y - 128) < 6)) c = (x + y) & 4 ? 0xff303030 : 0xff3a3a3a;
        tex[y * T + x] = c;
      }
      const horizon = Math.round(n * R.range(0.25, 0.38)), skyCols = X.rampPk([X.shade(U.pk(sc.cols[0]), 0.3), X.mixPk(U.pk(sc.cols[3 % sc.cols.length]), WHITE, 0.4)], 5);
      const hills = ridge(R, 257, 0.55), rad = R.range(60, 110), spd = R.range(0.05, 0.1) * R.sign(), mip = mipChain(tex, T, 4);
      g.trait('Palette', sc.native ? 'Rainbow' : sc.name); g.trait('Field', 'Mod ' + m1); g.trait('Road', road ? 'Crossroads' : 'None'); g.trait('Grid lines', grid); g.trait('Horizon', horizon < n * 0.31 ? 'High' : 'Low'); g.trait('Turn', spd > 0 ? 'Left' : 'Right');
      return t => {
        const a = t * spd, cx = 128 + Math.cos(a) * rad, cy = 128 + Math.sin(a) * rad, heading = a + Math.PI / 2 * Math.sign(spd), ca = Math.cos(heading), sa = Math.sin(heading);
        skyBands(d, n, skyCols, 0, horizon);
        for (let x = 0; x < n; x++) {
          const u = (x / n * 64 + heading / U.TAU * 256 * 2) & 255, h = Math.round(hills[u] * n * 0.12);
          for (let y = horizon - h; y < horizon; y++) d[y * n + x] = X.shade(skyCols[2], 0.55);
        }
        modeSevenFloor(g, mip, horizon, cx, cy, ca, sa, skyCols[4]);
      };
      }

    },
  });

  // ---------- 119 Planetoid ----------
  // Worlds of every kind: earth-like, desert, ocean, ice, lava, gas giant,
  // toxic, cratered moon and storm world, each with its own surface rule.
  const WORLDS = {
    terran: { sea: ['#0b1f4a', '#163d7a', '#2a6bb0'], land: ['#2e6b2a', '#4f8f3a', '#a08a5a', '#e8e0d0'], ice: 1.15, clouds: 0.3, atmo: '#8ac4ff', lights: true },
    desert: { land: ['#5a2414', '#8a3a1c', '#b85a2a', '#d9884a', '#f0c08a'], ice: 1.35, craters: 8, atmo: '#ffb08a' },
    ocean: { sea: ['#06183a', '#0b2f66', '#1a5aa0'], land: ['#e0c48a', '#4fb84f', '#2e8a3e', '#2e8a3e'], sea0: 0.32, ice: 1.3, clouds: 0.1, atmo: '#a0e0ff' },
    ice: { land: ['#4a6a8a', '#7a9ab8', '#b0cce4', '#e8f4ff', '#ffffff'], cracks: '#2a4a6a', atmo: '#e0f0ff' },
    lava: { land: ['#140c0c', '#24161a', '#3a2228', '#4a2e30', '#5a3a36'], lava: ['#a22633', '#ff6a1a', '#ffd04a'], atmo: '#ff6a3a' },
    gas: { bands: true, atmo: null },
    toxic: { sea: ['#2a0a3a', '#4a1a6a', '#6b2a8a'], land: ['#3a6a1a', '#7ab02a', '#c4f05a', '#efffd1'], ice: 9, clouds: 0.2, atmo: '#c4ff8a' },
    moon: { land: ['#2e2e36', '#4a4a56', '#6e6e7a', '#9a9aa6', '#c4c4d0'], craters: 22, atmo: null },
  };
  P.addPixel({
    name: 'Planetoid', seed: 2, fam: 'Terrain', sizes: [80, 100], fps: 10,
    interactive: 'Drag sideways to spin the world; click to strike it with a meteor (the craters stay for the next visitor).',
    recipe: 'A small world turning in space, and every kind of world: earth-like with city lights on the night side, rusty desert, ocean, cracked ice, glowing lava, banded gas giant with a storm, toxic jungle or a cratered moon. Night falls across it in an ordered dither; rings and moons on their rounds.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R), nz2 = U.noise(R), kind = R.pick(Object.keys(WORLDS)), Wd = WORLDS[kind], inp = g.input;
      let r = n * (kind === 'gas' ? R.range(0.3, 0.38) : R.range(0.26, 0.36)), cx = n / 2, cy = n / 2, tilt = R.range(-0.45, 0.45), spin = R.range(0.08, 0.16) * (kind === 'gas' ? 1.6 : 1), sun = [R.range(-0.9, -0.3), R.range(-0.6, 0.2)], sl = Math.hypot(sun[0], sun[1], 0.7);
      const L = [sun[0] / sl, sun[1] / sl, 0.7 / sl];
      // the view (second stream): the world centred as before, seen close up filling the frame, far off,
      // or set to one side; and the sky behind it: stars, a nebula, or the glare of its sun
      const view = g.home ? 'Centred' : g.alt.pick(['Centred', 'Centred', 'Close', 'Far', 'Aside']);
      if (view === 'Close') { r *= 1.85; cx = n * 0.64; cy = n * 0.66; } else if (view === 'Far') r *= 0.58; else if (view === 'Aside') { cx = n * 0.4; cy = n * 0.44; r *= 0.86; }
      const skyK = g.home ? 'Stars' : g.alt.pick(['Stars', 'Stars', 'Nebula', 'Sunrise']);
      const sea = Wd.sea ? ramp(Wd.sea) : null, land = Wd.land ? ramp(Wd.land) : null, lava = Wd.lava ? ramp(Wd.lava) : null, atmo = Wd.atmo ? hex(Wd.atmo) : null;
      const gasRamp = kind === 'gas' ? R.pick([['#3e2731', '#733e39', '#be4a2f', '#d77643', '#f0c08a', '#fff1e8'], ['#1d2b53', '#29366f', '#3b5dc9', '#73eff7', '#c4fbff', '#f4f4f4'], ['#3d2c6b', '#7a4fb8', '#c4527a', '#f5a3bd', '#ffe0ec', '#ffffff'], ['#24402a', '#4f7a3a', '#b5c96a', '#e0dca0', '#f5f0d0', '#ffffff']]).map(hex) : null;
      const storm = { lon: R.range(0, U.TAU), lat: R.range(-0.5, 0.5), size: R.range(0.12, 0.22) };
      const craters = Array.from({ length: Wd.craters || 0 }, () => { const a = R.range(0, U.TAU), b = Math.asin(R.range(-1, 1)); return { x: Math.cos(b) * Math.cos(a), y: Math.sin(b), z: Math.cos(b) * Math.sin(a), r: R.range(0.06, 0.25) }; });
      for (const cr of craters) cr.cos = Math.cos(cr.r);
      // meteor strikes from the viewer's clicks: lasting craters (storms on a gas giant), at most 24
      const hits = [], pending = [];
      const ring = kind === 'gas' ? R.bool(0.7) : R.bool(0.2), ringCol = gasRamp ? gasRamp[3] : land ? land[land.length - 1] : hex('#c4c4d0');
      const stars = Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, n - 1), R.bool(0.2)]);
      let back = null;
      if (skyK !== 'Stars') {
        back = new Uint32Array(n * n);
        const [c1, c2] = skyK === 'Nebula' ? g.alt.pick([['#3a0a4a', '#0a3a5a'], ['#4a0a1a', '#3a1a5a'], ['#0a3a2a', '#1a1a5a'], ['#3a2a0a', '#4a0a3a']]).map(hex) : [hex('#ffe0a0'), hex('#ff7040')];
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = BLACK;
          if (skyK === 'Nebula') { const v = nz2.fbm(x / n * 2.2 + 9, y / n * 2.2, 5.5, 4) + 0.15, w = nz2.n2(x / n * 1.4 - 4, y / n * 1.4); if (v > 0) c = X.mixPk(BLACK, w > 0 ? c1 : c2, Math.min(1, v * 2.4) * (0.55 + 0.45 * (X.dith4(x, y) < v * 3 ? 1 : 0.6))); }
          else { const q = Math.hypot(x + 0.5 - L[0] * n * 0.9 - n * 0.06, y + 0.5 - L[1] * n * 0.9 - n * 0.06) / n; if (q < 0.55) c = X.mixPk(BLACK, q < 0.12 ? c1 : c2, Math.pow(1 - q / 0.55, 2.2) * (X.dith4(x, y) * 0.25 + 0.75)); if (q < 0.06) c = X.mixPk(c1, WHITE, 0.6); }
          back[y * n + x] = c;
        }
      }
      const moons = Array.from({ length: R.int(0, 2) }, (_, k) => ({ r: r * R.range(0.1, 0.18), dist: r * R.range(1.4, 1.9) + k * r * 0.3, v: R.range(0.15, 0.3) * R.sign(), ph: R.range(0, 6), col: R.pick([hex('#b0b0b8'), hex('#d9b38a'), hex('#9ad1ff')]) }));
      const seaLevel = Wd.sea0 ?? 0.05;
      g.trait('World', { terran: 'Earthlike', desert: 'Desert', ocean: 'Ocean', ice: 'Ice', lava: 'Lava', gas: 'Gas giant', toxic: 'Toxic', moon: 'Cratered' }[kind]); g.trait('Rings', ring ? 'Yes' : 'None'); g.trait('Moons', moons.length || 'None'); g.trait('View', view); g.trait('Sky', skyK); g.trait('Grid', n);
      let extra = 0, lastX = null;
      // the thin air round the lit limb, drawn just outside the disc
      const halo = [];
      if (atmo) for (let y = Math.floor(cy - r - 3); y <= cy + r + 3; y++) for (let x = Math.floor(cx - r - 3); x <= cx + r + 3; x++) {
        const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, q = Math.hypot(dx, dy);
        if (q <= 1 || q > 1 + 1.8 / r * (n / 80) || x < 0 || y < 0 || x >= n || y >= n) continue;
        const lit = (dx * L[0] + dy * L[1]) / q;
        if (lit > -0.2) halo.push(y * n + x, Math.min(1, (lit + 0.2) * 0.9) * (1 - (q - 1) / (1.8 / r * (n / 80))));
      }
      // a click: the surface point under it, at this moment of the spin
      const strike = (tx, ty, rot) => {
        const sx = (tx * n - cx) / r, sy = (ty * n - cy) / r, q = sx * sx + sy * sy;
        if (q >= 0.97) return;
        const sz = Math.sqrt(1 - q), yy = sy * Math.cos(tilt) - sz * Math.sin(tilt), zz = sy * Math.sin(tilt) + sz * Math.cos(tilt);
        const lon = Math.atan2(sx, zz) + rot, lat = Math.asin(Math.max(-1, Math.min(1, yy))), rr = 0.07 + 0.05 * g.alt();
        hits.push({ x: Math.cos(lon) * Math.cos(lat), y: Math.sin(lat), z: Math.sin(lon) * Math.cos(lat), r: rr, cos: Math.cos(rr), flash: 1, fx: tx * n, fy: ty * n });
        if (hits.length > 24) hits.shift();
      };
      return (t, dt) => {
        if (inp.down) { if (lastX !== null) extra += (inp.x - lastX) * Math.PI * 2; lastX = inp.x; } else lastX = null;
        const rot = t * spin + extra;
        // a tap made while pressing may be the start of a drag: it only strikes if the pointer stays put
        for (const tp of inp.taps()) { if (inp.down) { if (pending.length < 8) pending.push({ x: tp.x, y: tp.y, x0: inp.x, k: 0 }); } else strike(tp.x, tp.y, rot); }
        for (let k = pending.length - 1; k >= 0; k--) { const p = pending[k]; if (Math.abs(inp.x - p.x0) > 0.02) { pending.splice(k, 1); continue; } if (!inp.down || ++p.k > 5) { strike(p.x, p.y, rot); pending.splice(k, 1); } }
        if (back) d.set(back); else d.fill(BLACK);
        for (const [x, y, b] of stars) X.put(g, x, y, b ? 0xffc0c0c0 : 0xff505050);
        const moonAt = m => ({ x: cx + Math.cos(t * m.v + m.ph) * m.dist, y: cy + Math.sin(t * m.v + m.ph) * m.dist * 0.3, behind: Math.sin(t * m.v + m.ph) < 0 });
        const drawMoon = m => { const p = moonAt(m); X.disc(g, p.x, p.y, m.r, (x, y) => { const lx = (x + 0.5 - p.x) / m.r, ly = (y + 0.5 - p.y) / m.r, lit = lx * L[0] + ly * L[1] + Math.sqrt(Math.max(0, 1 - lx * lx - ly * ly)) * L[2]; return lit > 0.75 ? X.mixPk(m.col, WHITE, 0.35) : lit > 0.3 ? m.col : lit > 0.12 && X.dith4(x, y) < 0.5 ? X.shade(m.col, 0.6) : X.shade(m.col, 0.28); }); };
        const ringPass = front => { if (!ring) return; for (let a = 0; a < U.TAU; a += 0.008) for (const rr of [1.35, 1.45, 1.55, 1.62]) { const x = cx + Math.cos(a) * r * rr, y = cy + Math.sin(a) * r * rr * 0.28 + Math.cos(a) * tilt * r * 0.3; if ((Math.sin(a) > 0) === front) X.put(g, x, y, rr > 1.6 ? X.shade(ringCol, 0.6) : rr < 1.4 ? X.shade(ringCol, 0.85) : ringCol); } };
        for (const m of moons) if (moonAt(m).behind) drawMoon(m);
        ringPass(false);
        X.disc(g, cx, cy, r, (x, y) => {
          const sx = (x + 0.5 - cx) / r, sy = (y + 0.5 - cy) / r, sz = Math.sqrt(Math.max(0, 1 - sx * sx - sy * sy));
          const yy = sy * Math.cos(tilt) - sz * Math.sin(tilt), zz = sy * Math.sin(tilt) + sz * Math.cos(tilt);
          const lon = Math.atan2(sx, zz) + rot, lat = Math.asin(Math.max(-1, Math.min(1, yy)));
          const px = Math.cos(lon) * Math.cos(lat), pz = Math.sin(lon) * Math.cos(lat), py = Math.sin(lat);
          let c, night = 0;
          if (kind === 'gas') {
            const turb = nz.fbm(px * 2, pz * 2, py * 6, 3) * 0.35, b = py * 5 + turb;
            c = gasRamp[Math.max(0, Math.min(5, Math.floor((Math.sin(b * 2.2) * 0.5 + 0.5) * 5.99)))];
            const dl = Math.atan2(Math.sin(lon - storm.lon), Math.cos(lon - storm.lon)), ds = (dl / storm.size) ** 2 + ((lat - storm.lat) / (storm.size * 0.55)) ** 2;
            if (ds < 1) c = ds < 0.35 ? gasRamp[0] : gasRamp[1];
            for (const cr of hits) { const dot = px * cr.x + py * cr.y + pz * cr.z; if (dot > cr.cos) c = dot > Math.cos(cr.r * 0.45) ? gasRamp[5] : gasRamp[2]; }
          } else {
            const h = nz.fbm(px * 1.6, pz * 1.6, py * 1.6 + 3, 4);
            if (sea && h <= seaLevel) c = sea[h > seaLevel - 0.07 ? 2 : h > seaLevel - 0.2 ? 1 : 0];
            else { const k = Math.max(0, Math.min(land.length - 1, Math.floor((h - (sea ? seaLevel : -0.4)) * (sea ? 9 : 5)))); c = land[k]; night = 1; }
            if (lava) { const v = Math.abs(nz2.fbm(px * 2.2, pz * 2.2, py * 2.2, 3)); if (v < 0.07) c = lava[v < 0.022 ? 2 : v < 0.045 ? 1 : 0]; }
            if (Wd.cracks) { const v = Math.abs(nz2.fbm(px * 2.5, pz * 2.5, py * 2.5, 2)); if (v < 0.018) c = hex(Wd.cracks); }
            for (const cr of craters) { const dot = px * cr.x + py * cr.y + pz * cr.z; if (dot > cr.cos) { const q = Math.acos(Math.min(1, dot)) / cr.r; c = q > 0.82 ? land[land.length - 1] : q > 0.6 ? land[0] : land[1]; } }
            for (const cr of hits) { const dot = px * cr.x + py * cr.y + pz * cr.z; if (dot > cr.cos) { const q = Math.acos(Math.min(1, dot)) / cr.r; c = q > 0.8 ? (lava ? lava[1] : land[land.length - 1]) : q > 0.55 ? land[0] : lava ? lava[0] : land[1]; } }
            if (Wd.ice && Math.abs(lat) > Wd.ice - h * 0.4) c = hex('#f4f8ff');
            if (Wd.clouds && nz2.fbm(px * 2 + t * 0.02, pz * 2, py * 3, 3) > Wd.clouds) c = X.mixPk(c, WHITE, 0.8);
          }
          const lit = sx * L[0] + sy * L[1] + sz * L[2];
          if (lit < 0.25) {
            const dark = X.dith4(x, y) < (lit + 0.1) / 0.35;
            c = dark ? X.shade(c, 0.5) : X.shade(c, 0.14);
            if (lava && c && !dark) { /* lava still glows */ }
            if (Wd.lights && night && !dark && ((x * 7 + y * 13) % 11 === 0) && nz2.n2(px * 9, pz * 9) > 0.1) c = hex('#ffd27a');
          }
          if (atmo && sx * sx + sy * sy > 0.84) c = X.mixPk(c, atmo, 0.45);
          return c;
        });
        for (let k = 0; k < halo.length; k += 2) { const i = halo[k]; d[i] = X.mixPk(d[i], atmo, 0.5 * halo[k + 1]); }
        ringPass(true);
        for (const m of moons) if (!moonAt(m).behind) drawMoon(m);
        // the flash of a fresh strike
        for (const h of hits) if (h.flash > 0) { const rr = (1 - h.flash) * r * 0.35 + 1; for (let a = 0; a < 16; a++) X.put(g, h.fx + Math.cos(a / 16 * U.TAU) * rr, h.fy + Math.sin(a / 16 * U.TAU) * rr, h.flash > 0.5 ? WHITE : 0xff40c0ff); h.flash -= dt * 2.5; }
      };
    },
  });

  P.addPixel({
    name: 'Aurora', seed: 2, fam: 'Terrain', sizes: [80, 100, 200], fps: 10,
    listens: 'The curtains brighten with the sound in the room, and a clap sends a ripple of light along them.',
    recipe: 'Curtains of light over snowy peaks: each column of sky glows by a slowly folding noise, from the hem to a different crown, with the stars showing through and the curtains mirrored in a lake or falling on a frozen plain.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, nz = U.noise(R), peaks = ridge(R, 257, 0.55), snowLine = n * 0.7;
      const HEMS = [0xff70f070, 0xffa0f040, 0xffd0f060, 0xffe0e040], CROWNS = [0xffe060c0, 0xfff050a0, 0xffd08060, 0xfff0a040];
      const hem = R.pick(HEMS), crown = R.pick(CROWNS);
      g.trait('Hem', ['Green', 'Jade', 'Teal', 'Aqua'][HEMS.indexOf(hem)]); g.trait('Crown', ['Violet', 'Purple', 'Blue', 'Sky'][CROWNS.indexOf(crown)]); g.trait('Ground', 'Plain'); g.trait('Grid', n);
      // the mountains and how far the curtains hang (second stream): as before, tall peaks or low hills; high or long curtains
      const mts = g.home ? 'Range' : g.alt.pick(['Range', 'Range', 'Peaks', 'Hills']), amp = mts === 'Peaks' ? 0.42 : mts === 'Hills' ? 0.1 : 0.25, drape = g.home ? 1 : g.alt.pick([1, 1, 0.72, 1.22]);
      g.trait('Mountains', mts); g.trait('Curtains', drape > 1 ? 'Long' : drape < 1 ? 'High' : 'Middle');
      const cur = X.rampPk([BLACK, X.shade(hem, 0.5), hem, X.mixPk(hem, crown, 0.5), crown], 10);
      const stars = Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, snowLine)]);
      const ear = auroraEar(g), field = Math.round(n * 0.85);
      const range = auroraRange(g, peaks, snowLine, field, { snow: 0xfff0f0f0, snowLo: 0xffd8c8c0, rockHi: 0xff7a6a60, rock: 0xff6a5a50, rockLo: 0xff4a3e38 }, hem, amp);
      return (t, dt) => {
        ear.step(dt || 0.1);
        for (let y = 0; y < n; y++) d.fill(y < n * 0.3 ? 0xff1a0805 : 0xff221006, y * n, y * n + n);
        for (const [x, y] of stars) X.put(g, x, y, 0xff808080);
        for (let x = 0; x < n; x++) {
          const fold = nz.n3(x / n * 2.5, t * 0.05, 1), base = n * (0.42 * drape + 0.12 * nz.n3(x / n * 1.3, t * 0.04, 4)), bright = Math.max(0, nz.n3(x / n * 6 + fold * 2, t * 0.12, 7) * 0.8 + 0.45) * ear.at(x / n);
          for (let y = 0; y < base; y++) {
            const v = (y / base), k = bright * Math.pow(v, 2.5) * (1 - Math.max(0, (v - 0.94) * 16));
            const lv = Math.floor(k * 10 + X.dith8(x, y) * 1.3);
            if (lv > 0) { const c = cur[Math.min(9, lv + Math.floor((1 - v) * (lv > 1 ? 4 : 1.5)))]; d[y * n + x] = c; }
          }
        }
        range();
        // the frozen plain in front, a little lit by the sky
        for (let y = field; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y === field ? 0xfff0f0f0 : X.dith8(x, y) < (y - field) / (n - field) * 0.5 ? 0xffd8c8c0 : 0xffe8e0d8;
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, nz = U.noise(R), peaks = ridge(R, 257, 0.55), snowLine = n * R.range(0.62, 0.74), lake = R.bool(0.4);
      const PAIRS = [['#70f070', '#e060c0'], ['#a0f040', '#f050a0'], ['#40e0d0', '#7a4fb8'], ['#e0e040', '#d08060'], ['#73eff7', '#b026ff'], ['#ff6fae', '#6b2fad']];
      const pair = R.pick(PAIRS), [hem, crown] = pair.map(hex);
      g.trait('Hem', ['Green', 'Lime', 'Turquoise', 'Gold', 'Ice', 'Rose'][PAIRS.indexOf(pair)]); g.trait('Crown', ['Magenta', 'Pink', 'Violet', 'Amber', 'Purple', 'Plum'][PAIRS.indexOf(pair)]); g.trait('Ground', lake ? 'Lake' : 'Plain'); g.trait('Grid', n);
      const mts = g.alt.pick(['Range', 'Range', 'Peaks', 'Hills']), amp = mts === 'Peaks' ? 0.42 : mts === 'Hills' ? 0.1 : 0.25, drape = g.alt.pick([1, 1, 0.72, 1.22]);
      g.trait('Mountains', mts); g.trait('Curtains', drape > 1 ? 'Long' : drape < 1 ? 'High' : 'Middle');
      const cur = X.rampPk([BLACK, X.shade(hem, 0.5), hem, X.mixPk(hem, crown, 0.5), crown], 10);
      const skyA = hex(R.pick(['#05070f', '#0b0814', '#060b0b'])), skyB = X.mixPk(skyA, crown, 0.08);
      const stars = Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, snowLine)]);
      const rock = R.pick([['#2a2a3a', '#4a4a5e'], ['#1a2433', '#2e3a4f'], ['#2e2418', '#4a3a26']]).map(hex);
      const ear = auroraEar(g), floor = lake ? Math.round(snowLine + n * 0.1) : n, field = lake ? floor : Math.round(n * 0.88);
      const range = auroraRange(g, peaks, snowLine, field, { snow: 0xfff0f0f0, snowLo: X.mixPk(rock[1], WHITE, 0.6), rockHi: rock[1], rock: X.mixPk(rock[0], rock[1], 0.4), rockLo: rock[0] }, hem, amp);
      return (t, dt) => {
        ear.step(dt || 0.1);
        for (let y = 0; y < n; y++) d.fill(y < n * 0.3 ? skyA : skyB, y * n, y * n + n);
        for (const [x, y] of stars) X.put(g, x, y, 0xff808080);
        for (let x = 0; x < n; x++) {
          const fold = nz.n3(x / n * 2.5, t * 0.05, 1), base = n * (0.42 * drape + 0.12 * nz.n3(x / n * 1.3, t * 0.04, 4)), bright = Math.max(0, nz.n3(x / n * 6 + fold * 2, t * 0.12, 7) * 0.8 + 0.45) * ear.at(x / n);
          for (let y = 0; y < base; y++) {
            const v = (y / base), k = bright * Math.pow(v, 2.5) * (1 - Math.max(0, (v - 0.94) * 16));
            const lv = Math.floor(k * 10 + X.dith8(x, y) * 1.3);
            if (lv > 0) d[y * n + x] = cur[Math.min(9, lv + Math.floor((1 - v) * (lv > 1 ? 4 : 1.5)))];
          }
        }
        range();
        if (!lake) for (let y = field; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y === field ? 0xfff0f0f0 : X.dith8(x, y) < (y - field) / (n - field) * 0.5 ? X.mixPk(rock[1], WHITE, 0.6) : 0xffe8e0d8;
        if (lake) for (let y = floor; y < n; y++) { const src = floor - 1 - (y - floor) * 1.4, sh = Math.round(Math.sin(y * 1.7 + t * 1.3) * 0.8); for (let x = 0; x < n; x++) d[y * n + x] = X.shade(d[Math.max(0, Math.round(src)) * n + Math.min(n - 1, Math.max(0, x + sh))], (y & 1) ? 0.55 : 0.7); }
      };
      }

    },
  });
})();
