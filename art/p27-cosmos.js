// Set 3 · Cosmos: skies, orbits and bodies, rasterised onto the cell grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Cosmos' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // a fixed sky of faint stars: [x, y, brightness]
  const starfield = (R, n, k) => Array.from({ length: k }, () => [R.int(0, n - 1), R.int(0, n - 1), R.range(0.15, 1), R.range(0, TAU)]);
  // Spiral Galaxy: arms in the scheme's first colour, a warm white core, black space.
  function galaxyHeat(sc) {
    const a = sc.cols[0], b = sc.cols[Math.floor(sc.cols.length / 2)];
    return U.lut([[0, 0, 0], U.mix(a, [0, 0, 0], 0.6), U.mix(a, [0, 0, 0], 0.15), U.mix(U.mix(a, b, 0.35), [255, 236, 205], 0.45), [255, 246, 230], [255, 255, 250]], false);
  }
  // a soft dithered glow round a bright body (sun, coma), mixed over what is already there
  function glow(g, cx, cy, r, col, k) {
    const { n, d } = g, y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(n - 1, Math.ceil(cy + r));
    for (let y = y0; y <= y1; y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(n - 1, Math.ceil(cx + r)); x++) {
      const q = 1 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r;
      if (q > 0) d[y * n + x] = X.mixPk(d[y * n + x], col, Math.min(1, q * q * k + (X.dith4(x, y) < q ? 0.12 : 0)));
    }
  }
  const SUNC = X.rgb(255, 236, 170), CORONA = X.rgb(255, 250, 235);
  // run a piece's first few seconds before its first frame (no empty warm-up)
  const warmUp = (frame, k, fps = 12) => { let w = true; return (t, dt, f) => { if (w) { w = false; for (let j = k; j > 0; j--) frame(t - j / fps, 1 / fps, 0); } frame(t, dt, f); }; };
  // Ringed World: belts from three neighbouring colours of the scheme and a cream, not the whole wheel
  function ringBands(sc) {
    const L = sc.cols.length, a = sc.cols[0], b = sc.cols[(sc.native ? 2 : 1) % L], c = sc.cols[(sc.native ? 5 : 2) % L], cream = [232, 222, 202];
    return U.lut([U.mix(a, cream, 0.35), U.mix(a, cream, 0.72), U.mix(b, cream, 0.42), U.mix(a, [40, 30, 30], 0.25), U.mix(c, cream, 0.5), U.mix(b, cream, 0.78)], true);
  }
  // ---------- traits: what a variation rolled, named for the viewer ----------
  const HUES = [[5, 'Red'], [10, 'Orange'], [17, 'Amber'], [22, 'Yellow'], [28, 'Lime'], [40, 'Green'], [47, 'Teal'], [56, 'Cyan'], [65, 'Blue'], [75, 'Indigo'], [85, 'Violet'], [95, 'Magenta']];
  const hueName = h => { h = ((h % 100) + 100) % 100; for (const [lim, nm] of HUES) if (h < lim) return nm; return 'Red'; };
  const palName = sc => sc.native ? 'Spectrum' : sc.name;
  // hue (0..100) and saturation (0..1) of an [r, g, b] or packed colour
  const hueSat = c => {
    const [r, g, b] = Array.isArray(c) ? c : [c & 255, c >> 8 & 255, c >> 16 & 255], mx = Math.max(r, g, b), mn = Math.min(r, g, b), dd = mx - mn;
    if (!dd) return [0, 0];
    const h = mx === r ? ((g - b) / dd + 6) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4;
    return [h / 6 * 100, dd / mx];
  };
  const colName = (c, grey = 'Grey') => { const [h, sa] = hueSat(c); return sa < 0.12 ? grey : hueName(h); };
  // a new roll from g.alt for other variations; the opening variation keeps the first value
  const roll = (g, vals, w) => { if (g.home) return vals[0]; let u = g.alt() * (w ? w.reduce((a, b) => a + b, 0) : vals.length); for (let i = 0; i < vals.length; i++) { u -= w ? w[i] : 1; if (u < 0) return vals[i]; } return vals[vals.length - 1]; };
  const gaussA = g => { let u = 0; while (!u) u = g.alt(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * g.alt()); };
  // Spiral Galaxy: the view (as rolled, or rarely edge-on with a dust lane) and the type
  // (spiral, barred spiral, ring, elliptical), now and then with a small companion.
  function galView(g, tl) {
    if (roll(g, ['', 'Edge-on'], [8, 1]) === 'Edge-on') { g.trait('View', 'Edge-on'); return 0.17; }
    g.trait('View', tl > 0.8 ? 'Face-on' : 'Tilted'); return tl;
  }
  function galShape(g, st, arms, tilt, rot, n, c) {
    const type = g.trait('Type', roll(g, ['Spiral', 'Barred spiral', 'Ring', 'Elliptical'], [6, 3, 1, 1]));
    const N = st.length;
    if (type === 'Barred spiral') for (let i = 0; i < N * 0.22; i++) st[i] = [Math.min(0.34, Math.abs(gaussA(g)) * 0.16), (g.alt() < 0.5 ? 0 : Math.PI) + gaussA(g) * 0.07, 0.9, 1];
    else if (type === 'Ring') for (let i = 0; i < N * 0.6; i++) st[i] = [Math.min(0.95, 0.56 + gaussA(g) * 0.045), g.alt() * TAU, st[i][2]];
    else if (type === 'Elliptical') for (let i = 0; i < N; i++) st[i] = [Math.min(0.92, Math.abs(gaussA(g)) * 0.3), g.alt() * TAU, st[i][2]];
    if (g.trait('Companion', roll(g, ['None', 'Satellite'], [5, 1])) === 'Satellite') {
      const rc = 0.78 + g.alt() * 0.12, ac = g.alt() * TAU;
      for (let i = 0; i < N * 0.03; i++) st.push([rc + gaussA(g) * 0.035, ac + gaussA(g) * 0.045, 1.1]);
    }
    if (tilt > 0.2) return null;
    // edge-on: a dark dust lane along the disc's major axis
    const lane = new Float32Array(n * n), cs = Math.cos(rot), sn = Math.sin(rot);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const dx = x + 0.5 - c[0], dy = y + 0.5 - c[1], along = dx * cs + dy * sn, across = -dx * sn + dy * cs - 0.7;
      lane[y * n + x] = Math.abs(along) > n * 0.45 * c[2] ? 1 : 1 - 0.82 * Math.exp(-((across / (n * 0.014)) ** 2));
    }
    return lane;
  }
  // Orrery: the star at the centre (the original yellow sun, a red giant, a blue star or a
  // binary pair), an asteroid belt in some systems, and a ringed planet in others.
  function orreryStar(g, kind, CC, n, t, tilt) {
    if (kind === 'Red giant') { glow(g, CC.cx, CC.cy, n * 0.17, X.rgb(255, 70, 40), 0.6); X.disc(g, CC.cx, CC.cy, n * 0.075, X.rgb(220, 64, 36)); X.disc(g, CC.cx, CC.cy, n * 0.058, X.rgb(255, 120, 64)); X.disc(g, CC.cx - n * 0.015, CC.cy - n * 0.015, n * 0.022, X.rgb(255, 180, 130)); return; }
    if (kind === 'Blue star') { glow(g, CC.cx, CC.cy, n * 0.11, X.rgb(110, 160, 255), 0.6); X.disc(g, CC.cx, CC.cy, n * 0.04, X.rgb(140, 180, 255)); X.disc(g, CC.cx, CC.cy, n * 0.027, X.rgb(225, 236, 255)); return; }
    if (kind === 'Binary') {
      const a = t * 0.9, pts = [[CC.cx + Math.cos(a) * n * 0.045, CC.cy + Math.sin(a) * n * 0.045 * tilt, n * 0.032, X.rgb(255, 210, 110)], [CC.cx - Math.cos(a) * n * 0.045, CC.cy - Math.sin(a) * n * 0.045 * tilt, n * 0.022, X.rgb(255, 120, 70)]];
      pts.sort((p, q) => p[1] - q[1]);
      for (const [x, y, r, col] of pts) { glow(g, x, y, r * 2.4, col, 0.5); X.disc(g, x, y, r, col); X.disc(g, x - r * 0.25, y - r * 0.25, r * 0.45, X.mixPk(col, WHITE, 0.6)); }
      return;
    }
    glow(g, CC.cx, CC.cy, n * 0.12, X.rgb(255, 150, 40), 0.55);
    X.disc(g, CC.cx, CC.cy, n * 0.05, X.rgb(255, 160, 40)); X.disc(g, CC.cx, CC.cy, n * 0.035, X.rgb(255, 220, 120)); X.disc(g, CC.cx - n * 0.008, CC.cy - n * 0.008, n * 0.015, X.rgb(255, 250, 220));
  }
  function orreryBelt(g, pl, c) {
    if (g.trait('Belt', roll(g, ['None', 'Asteroids'], [2, 1])) === 'None' || pl.length < 3) return [];
    const i = Math.floor(pl.length / 2), r0 = pl[i - 1].a, r1 = pl[i].a, out = [];
    for (let k = 0; k < 140; k++) { const r = r0 + (r1 - r0) * (0.35 + 0.3 * g.alt()); out.push({ r, a: g.alt() * TAU, w: 9 * Math.pow(r / c, -1.5) * 0.05, c: X.rgb(110 + g.alt() * 60, 96 + g.alt() * 40, 80) }); }
    return out;
  }
  function orreryRing(g, pl, n) {
    if (g.trait('Rings', roll(g, ['None', 'Ringed giant'], [2, 1])) === 'None') return;
    const p = pl.reduce((a, b) => b.size > a.size ? b : a);
    p.size = Math.max(p.size, 2 * n / 100); p.ring = true;
  }
  function orreryRingArc(g, x, y, p, tilt, back) {
    const R = p.size * 1.3 * 2.1, col = X.mixPk(p.col, X.rgb(235, 225, 200), 0.55);
    for (let k = 0; k < 64; k++) { const a = k / 64 * TAU, s = Math.sin(a); if ((s < 0) === back) X.put(g, x + Math.cos(a) * R, y + s * R * tilt * 0.45, col); }
  }
  // Nebula: a planetary shell (gas in a ring round a hot white star), dark pillars, or the original cloud
  function nebShell(shape, n) {
    if (shape !== 'Shell') return null;
    const out = new Float32Array(n * n), m = n / 2;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x + 0.5 - m, (y + 0.5 - m) * 1.12) / m; out[y * n + x] = 0.12 + 1.35 * Math.exp(-(((r - 0.56) / 0.17) ** 2)) + 0.5 * Math.exp(-((r / 0.16) ** 2)); }
    return out;
  }
  // Comet: the colour of its coma (the classic blue and gold, the green of a carbon-rich comet,
  // or pale), how tight its orbit is, the kind of sun, and sometimes the Milky Way behind.
  function cometLook(g, ion, dust, n) {
    const coma = g.trait('Coma', roll(g, ['Blue and gold', 'Green', 'Pale'], [5, 2, 2]));
    if (coma === 'Green') { const gr = U.hsb(36, 60, 100).map(v => v * 2.2); for (let k = 0; k < 3; k++) ion[k] = ion[k] * 0.5 + gr[k] * 0.5; }
    if (coma === 'Pale') for (let k = 0; k < 3; k++) { ion[k] = ion[k] * 0.45 + 230 * 2.2 * 0.55; dust[k] = dust[k] * 0.5 + 220 * 2.2 * 0.5; }
    const k = g.trait('Orbit', roll(g, ['Long', 'Tight'], [3, 1])) === 'Tight' ? 0.78 : 1;
    const sun = g.trait('Sun', roll(g, ['Yellow', 'White', 'Red'], [4, 1, 1]));
    const SUN = { Yellow: [[255, 170, 50], [255, 240, 180], [255, 150, 40]], White: [[190, 210, 255], [248, 250, 255], [140, 170, 255]], Red: [[240, 80, 40], [255, 170, 120], [255, 70, 30]] }[sun];
    let band = null;
    if (g.trait('Sky', roll(g, ['Dark', 'Milky Way'], [3, 1])) === 'Milky Way') {
      band = new Uint32Array(n * n); const a = g.alt() * Math.PI, cs = Math.cos(a), sn = Math.sin(a), nz = U.noise(g.alt);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const dd = (-(x - n / 2) * sn + (y - n / 2) * cs) / (n * 0.16), q = Math.exp(-dd * dd) * (0.6 + 0.4 * nz.n2(x / n * 6, y / n * 6));
        band[y * n + x] = X.dith4(x, y) < q * 0.35 ? X.rgb(46 * q + 8, 42 * q + 8, 64 * q + 12) : X.rgb(18 * q + 1, 16 * q + 1, 30 * q + 2);
      }
    }
    return { k, coma: { 'Blue and gold': X.rgb(190, 230, 255), Green: X.rgb(150, 255, 170), Pale: X.rgb(235, 240, 245) }[coma], sunA: X.rgb(...SUN[0]), sunB: X.rgb(...SUN[1]), halo: X.rgb(...SUN[2]), band };
  }
  // Star Trails: what stands against the sky (the original pines, mountains, desert with cacti,
  // or a shore whose water mirrors the trails)
  function trailsLand(g, nz, n, line, trees) {
    const fg = g.trait('Foreground', roll(g, ['Forest', 'Mountains', 'Desert', 'Shore'], [4, 2, 2, 2]));
    if (fg === 'Mountains') for (let x = 0; x < n; x++) { line[x] = n * 0.86 - Math.abs(nz.fbm(x / n * 3, 4.2, 0, 4)) * n * 0.5; trees[x] = 0; }
    else if (fg === 'Desert') { for (let x = 0; x < n; x++) { line[x] = n * 0.86 + nz.fbm(x / n * 1.5, 7, 0, 2) * n * 0.04; trees[x] = 0; } for (let k = 2 + Math.floor(g.alt() * 3); k > 0; k--) trees[Math.floor(n * (0.08 + 0.84 * g.alt()))] = n * (0.07 + 0.08 * g.alt()); }
    else if (fg === 'Shore') for (let x = 0; x < n; x++) { const head = x < n * 0.3 ? (n * 0.3 - x) * 0.35 : 0; line[x] = Math.min(Math.round(n * 0.8), n * 0.8 - head - (head ? Math.abs(nz.fbm(x / n * 6, 9, 0, 2)) * n * 0.03 : 0)); trees[x] = 0; }
    return fg;
  }
  function cactus(g, x, base, h) {
    const c = X.rgb(4, 4, 8), top = Math.round(base - h), a1 = Math.round(base - h * 0.55), a2 = Math.round(base - h * 0.75), arm = Math.max(2, Math.round(h * 0.22));
    X.rect(g, x, top, 2, base - top, c);
    X.rect(g, x - arm, a1, arm, 1, c); X.rect(g, x - arm, a1 - Math.round(h * 0.25), 1, Math.round(h * 0.25) + 1, c);
    X.rect(g, x + 2, a2, arm, 1, c); X.rect(g, x + 1 + arm, a2 - Math.round(h * 0.2), 1, Math.round(h * 0.2) + 1, c);
  }
  // Constellations: the colour of the night, and sometimes the faint band of the Milky Way
  const SKIES = { Navy: [6, 8, 20], Black: [2, 2, 4], Indigo: [14, 8, 30], Teal: [4, 16, 22] };
  const conSky = g => X.rgb(...SKIES[g.trait('Sky', roll(g, ['Navy', 'Black', 'Indigo', 'Teal'], [4, 2, 2, 1]))]);
  function conBand(g, stars, W, n) {
    if (g.trait('Band', roll(g, ['None', 'Milky Way'], [2, 1])) === 'None') return;
    const y0 = n * (0.25 + 0.5 * g.alt()), sl = (g.alt() - 0.5) * 0.4;
    for (let k = 0; k < n * 7; k++) { const x = g.alt() * W, y = y0 + Math.sin(x / W * TAU) * n * 0.12 + sl * (x % n) + gaussA(g) * n * 0.07; if (y >= 0 && y < n) stars.push([x, y, g.alt() * 0.06]); }
  }
  // Ringed World: the ring system (broad, narrow, or many fine ringlets), the light (lit by day,
  // or rarely a thin crescent lit from behind), and sometimes a great storm turning with the planet
  function ringRoll(g) {
    const rings = g.trait('Rings', roll(g, ['Broad', 'Narrow', 'Ringlets'], [4, 2, 2]));
    const crescent = g.trait('Light', roll(g, ['Day', 'Crescent'], [6, 1])) === 'Crescent';
    const storm = g.trait('Storm', roll(g, ['None', 'Great spot'], [3, 1])) === 'Great spot';
    return { r0: rings === 'Narrow' ? 1.55 : rings === 'Ringlets' ? 1.25 : 1.3, r1: rings === 'Narrow' ? 1.85 : rings === 'Ringlets' ? 2.5 : 2.15, lets: rings === 'Ringlets', crescent, storm, ph: g.home ? 0 : g.alt() * TAU, lat: g.home ? 0.3 : (g.alt() < 0.5 ? -1 : 1) * (0.2 + 0.2 * g.alt()), spot: X.rgb(200, 90, 60) };
  }
  function stormAt(RW, nx, ny, t, b) {
    const sp = t * 0.06 + RW.ph, cz = Math.cos(sp);
    if (cz < 0.1) return b;
    const dx = (nx - Math.sin(sp) * 0.72) / (0.24 * cz), dy = (ny - RW.lat) / 0.1, q = dx * dx + dy * dy;
    return q < 1 ? X.mixPk(b, RW.spot, q < 0.45 ? 0.8 : 0.5) : q < 1.5 ? X.mixPk(b, WHITE, 0.25) : b;
  }
  // Accretion: the disc's width, twin jets along the spin axis, and rarely a companion star
  // whose gas streams down onto the disc
  function accRoll(g) {
    const disc = g.trait('Disc', roll(g, ['Standard', 'Thin', 'Wide'], [3, 1, 1]));
    const jets = g.trait('Jets', roll(g, ['None', 'Twin jets'], [2, 1])) === 'Twin jets';
    const mate = g.trait('Companion', roll(g, ['None', 'Blue star'], [6, 1])) === 'Blue star';
    return { disc: { Standard: 4.2, Thin: 3.1, Wide: 5.4 }[disc], jets, mate, side: g.home ? 1 : g.alt() < 0.5 ? -1 : 1 };
  }
  function accMate(g, n, c, r1, tilt, t, heat) {
    const sx = c + n * 0.36, sy = c - n * 0.3, ex = c + r1 * 0.8, ey = c - r1 * tilt * 0.4, mx = (sx + ex) / 2 + n * 0.08, my = (sy + ey) / 2 - n * 0.06;
    for (let k = 0; k <= 60; k++) { const u = k / 60, x = (1 - u) * (1 - u) * sx + 2 * u * (1 - u) * mx + u * u * ex, y = (1 - u) * (1 - u) * sy + 2 * u * (1 - u) * my + u * u * ey, pulse = 0.5 + 0.5 * Math.sin(u * 18 - t * 3); X.put(g, x, y, heat[Math.min(255, 90 + 120 * pulse * (0.4 + 0.6 * u) | 0)]); }
    glow(g, sx, sy, n * 0.09, X.rgb(120, 160, 255), 0.6); X.disc(g, sx, sy, n * 0.04, X.rgb(170, 200, 255)); X.disc(g, sx - n * 0.01, sy - n * 0.01, n * 0.02, X.rgb(235, 242, 255));
  }
  // Moon Phases: the page the calendar is printed on (the original night, a navy almanac with
  // gold rules and dates, or a starfield)
  const DIG = { 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [7, 1, 7, 4, 7], 3: [7, 1, 3, 1, 7], 4: [5, 5, 7, 1, 1], 5: [7, 4, 7, 1, 7], 6: [7, 4, 7, 5, 7], 7: [7, 1, 2, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 7] };
  function moonStyle(g, n, k, cell, bg) {
    const style = g.trait('Page', roll(g, ['Night', 'Almanac', 'Starfield'], [4, 2, 2]));
    if (style === 'Night') return {};
    const back = new Uint32Array(n * n);
    if (style === 'Starfield') {
      back.fill(X.rgb(2, 2, 6));
      for (let i = 0; i < n * n * 0.03; i++) { const b = g.alt(); back[Math.floor(g.alt() * n * n)] = X.rgb(60 + b * 160, 60 + b * 160, 70 + b * 170); }
      return { back, dark: U.lut([[0, 0, 0], [22, 24, 34]], false) };
    }
    const page = X.rgb(18, 26, 54), rule = X.rgb(150, 124, 60), gold = X.rgb(214, 180, 96);
    back.fill(page);
    for (let j = 1; j < k; j++) { const p = Math.round(j * cell); for (let q = 1; q < n - 1; q++) { back[p * n + q] = rule; back[q * n + p] = rule; } }
    for (let q = 0; q < n; q++) { back[q] = back[(n - 1) * n + q] = back[q * n] = back[q * n + n - 1] = rule; }
    if (cell >= 30) for (let j = 0; j < k * k; j++) {   // the date in each square's corner
      let x = Math.round((j % k) * cell) + 2; const y = Math.round(Math.floor(j / k) * cell) + 2;
      for (const ch of String(j + 1)) { const rows = DIG[ch]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) back[(y + r) * n + x + b] = gold; x += 4; }
    }
    return { back, dark: U.lut([[0, 0, 0], [30, 40, 78]], false), ring: X.rgb(110, 92, 52) };
  }
  // Framing for a single body: centred as rolled, closer (filling the frame), or distant and off-centre
  function framing(g, n, close = 1.3, far = 0.62) {
    const f = g.trait('Framing', roll(g, ['Centred', 'Close', 'Distant'], [4, 2, 2]));
    if (f === 'Close') return { S: close, cx: n / 2, cy: n / 2 };
    if (f === 'Distant') return { S: far, cx: n * (0.5 + (g.alt() < 0.5 ? -1 : 1) * (0.1 + 0.06 * g.alt())), cy: n * (0.5 + (g.alt() - 0.5) * 0.2) };
    return { S: 1, cx: n / 2, cy: n / 2 };
  }
  // a faint coloured nebula behind a dark sky, now and then
  function backdrop(g, n) {
    const b = g.trait('Backdrop', roll(g, ['Black', 'Nebula'], [2, 1]));
    if (b === 'Black') return null;
    const out = new Uint32Array(n * n), nz = U.noise(g.alt), h = g.alt() * 100, col = U.hsb(h, 70, 60), col2 = U.hsb(h + 12 + g.alt() * 10, 60, 50);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const v = Math.max(0, nz.fbm(x / n * 2.2, y / n * 2.2, 3.3, 4) * 1.4 + 0.12), w = Math.max(0, nz.fbm(x / n * 3 + 9, y / n * 3, 1.1, 3));
      const q = Math.min(1, v * v * 1.6), k = q * 0.32 + (X.dith4(x, y) < q * 0.5 ? 0.05 : 0);
      out[y * n + x] = X.rgb(col[0] * k + col2[0] * w * 0.12, col[1] * k + col2[1] * w * 0.12, col[2] * k + col2[2] * w * 0.12);
    }
    return out;
  }
  const addPk = (a, b) => X.rgb(Math.min(255, (a & 255) + (b & 255)), Math.min(255, (a >> 8 & 255) + (b >> 8 & 255)), Math.min(255, (a >> 16 & 255) + (b >> 16 & 255)));

  add({
    name: 'Spiral Galaxy', sizes: [100, 200], fps: 12,
    recipe: 'Thousands of stars laid along two to four logarithmic arms and counted into cells. The inner disc turns faster than the rim, so the arms wind ever so slowly as you watch.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, c = n / 2, arms = R.pick([2, 2, 3, 4]), wind = R.range(2.2, 3.6) * R.sign(), tilt = galView(g, R.range(0.45, 1)), rot = R.range(0, TAU), GF = framing(g, n, 1.32, 0.6), BG = backdrop(g, n);
      const sc = U.scheme(R, 0.4), heat = galaxyHeat(sc), count = n * n * 0.45 | 0;
      const st = Array.from({ length: count }, () => {
        const r = Math.min(0.98, -Math.log(1 - R() * 0.95) * 0.22), arm = R.int(0, arms - 1);
        return [r, arm * TAU / arms + Math.log(r + 0.02) * wind + R.gauss() * (0.25 + 0.3 * (1 - r)), R.range(0.5, 1.2)];
      });
      const dens = new Float32Array(N), sky = starfield(R, n, n * 0.6 | 0), core = new Float32Array(N);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) core[y * n + x] = Math.exp(-((x - GF.cx) ** 2 + ((y - GF.cy) / tilt) ** 2) / (n * n * 0.004 * GF.S * GF.S)) * 3;
      const lane = galShape(g, st, arms, tilt, rot, n, [GF.cx, GF.cy, GF.S]);
      g.trait('Palette', palName(sc));
      return t => {
        dens.fill(0);
        const cr = Math.cos(rot), sr = Math.sin(rot);
        for (const [r, a0, w, rigid] of st) {
          const a = a0 + t * (rigid ? 0.12 : 0.03 + 0.09 / (0.15 + r)), x = Math.cos(a) * r * c * GF.S, y = Math.sin(a) * r * c * GF.S * tilt;
          const px = GF.cx + x * cr - y * sr | 0, py = GF.cy + x * sr + y * cr | 0;
          if (px >= 0 && py >= 0 && px < n && py < n) dens[py * n + px] += w;
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          // a light blur so the arms read as glowing gas, not single-cell speckle
          const i = y * n + x, bl = dens[i] * 0.44 + 0.14 * ((x > 0 ? dens[i - 1] : 0) + (x < n - 1 ? dens[i + 1] : 0) + (y > 0 ? dens[i - n] : 0) + (y < n - 1 ? dens[i + n] : 0));
          const v = Math.min(1, Math.sqrt((bl + core[i]) * (lane ? lane[i] : 1)) * 0.34);
          d[i] = heat[v * 255 | 0];
        }
        for (const [x, y, b] of sky) if (d[y * n + x] === heat[0]) d[y * n + x] = X.rgb(b * 120, b * 120, b * 140);
        if (BG) for (let i = 0; i < N; i++) if (d[i] === heat[0]) d[i] = BG[i];
      };
    },
  });

  add({
    name: 'Orrery', sizes: [100, 200], fps: 12,
    recipe: 'A tilted clockwork solar system: planets on dotted orbits, inner ones fast and outer ones slow by Kepler’s law, some with moons, each leaving a short fading wake.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, c = n / 2, tilt = 0.5 + (R.range(0.4, 0.85) - 0.4) * 0.8, sc = U.scheme(R, 0.5), k = R.int(4, 7), OS = { Full: 1, Wide: 1.35, Inner: 0.72 }[g.trait('Span', roll(g, ['Full', 'Wide', 'Inner'], [4, 2, 2]))], BG = backdrop(g, n), OF = { cx: n / 2, cy: n / 2 };
      if (g.trait('Framing', roll(g, ['Centred', 'Corner'], [3, 1])) === 'Corner') { OF.cx = n * (g.alt() < 0.5 ? 0.24 : 0.76); OF.cy = n * (g.alt() < 0.5 ? 0.28 : 0.72); }
      const pl = Array.from({ length: k }, (_, i) => {
        const a = (0.16 + 0.8 * (i + R.range(0.2, 0.8)) / k) * c * OS;
        return { a, w: 9 * Math.pow(a / (c * OS), -1.5) * 0.05, ph: R.range(0, TAU), size: R.pick([1, 1.5, 2, 2.5]) * n / 100, col: U.pk(sc.cols[i % sc.cols.length]), moon: R.bool(0.35) };
      });
      const trail = new Float32Array(N), tcol = new Uint32Array(N), orbit = new Uint8Array(N), sky = starfield(R, n, n * 0.5 | 0);
      const star = g.trait('Star', roll(g, ['Yellow sun', 'Red giant', 'Blue star', 'Binary'], [5, 2, 2, 1])), belt = orreryBelt(g, pl, c * OS);
      orreryRing(g, pl, n);
      for (const p of pl) for (let s = 0; s < 360; s += 2) { const a = s / 180 * Math.PI, x = OF.cx + Math.cos(a) * p.a | 0, y = OF.cy + Math.sin(a) * p.a * tilt | 0; if (x >= 0 && y >= 0 && x < n && y < n && (s / 2) % 3 === 0) orbit[y * n + x] = 1; }
      return (t, dt) => {
        for (let i = 0; i < N; i++) {
          trail[i] *= 0.92;
          d[i] = trail[i] > 0.05 ? X.shade(tcol[i], trail[i] * 0.7) : orbit[i] ? X.rgb(40, 40, 56) : BG ? BG[i] : BLACK;
        }
        for (const [x, y, b] of sky) if (d[y * n + x] === (BG ? BG[y * n + x] : BLACK)) d[y * n + x] = X.rgb(b * 90, b * 90, b * 110);
        for (const b of belt) X.put(g, OF.cx + Math.cos(b.a + t * b.w) * b.r, OF.cy + Math.sin(b.a + t * b.w) * b.r * tilt, b.c);
        orreryStar(g, star, OF, n, t, tilt);
        const draw = [];
        for (const p of pl) {
          const a = p.ph + t * p.w, x = OF.cx + Math.cos(a) * p.a, y = OF.cy + Math.sin(a) * p.a * tilt;
          const i = (y | 0) * n + (x | 0); if (i >= 0 && i < N) { trail[i] = 1; tcol[i] = p.col; }
          draw.push([y, () => {
            if (p.ring) orreryRingArc(g, x, y, p, tilt, true);
            // lit on the side that faces the sun, with a dark night side
            const r = p.size * 1.3, dl = Math.hypot(OF.cx - x, OF.cy - y) || 1, ux = (OF.cx - x) / dl, uy = (OF.cy - y) / dl, hi = X.mixPk(p.col, WHITE, 0.4), lo = X.shade(p.col, 0.4);
            X.disc(g, x, y, r, (xx, yy) => { const l = ((xx + 0.5 - x) * ux + (yy + 0.5 - y) * uy) / r; return l > 0.4 ? hi : l < -0.25 ? lo : p.col; });
            if (p.ring) orreryRingArc(g, x, y, p, tilt, false);
            if (p.moon) { const ma = t * 1.7 + p.ph; X.put(g, x + Math.cos(ma) * (p.size * 1.3 + 3), y + Math.sin(ma) * (p.size * 1.3 + 3) * tilt, X.rgb(220, 220, 230)); }
          }]);
        }
        draw.sort((a, b) => a[0] - b[0]).forEach(e => e[1]());
      };
    },
  });

  add({
    name: 'Eclipse', seed: 5, sizes: [80, 100], fps: 12,
    recipe: 'The moon slides across the sun. The sky dims, the corona flares out in streamers, stars come out, a diamond ring flashes at second contact, and the day returns. The sky, the sun, the path of the moon and the land below (hills, a city, the sea or mountains) change with every variation.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, N = n * n, sx = n * R.range(0.4, 0.6), sy = n * R.range(0.32, 0.45), rs = n * R.range(0.1, 0.14), nz = U.noise(R);
      const day = U.hsb(R.pick([55, 58, 60, 8]), 55, 85), dusk = U.hsb(R.pick([70, 75, 0]), 70, 22), sky = starfield(R, n, n * 0.7 | 0);
      const ground = U.hsb(R.range(0, 100), 40, 12), hills = Array.from({ length: n }, (_, x) => n * 0.82 + nz.fbm(x / n * 3, 5, 0, 3) * n * 0.1);
      const streak = Array.from({ length: 360 }, (_, a) => 0.6 + 0.8 * Math.max(0, nz.fbm(Math.cos(a / 180 * Math.PI) * 2, Math.sin(a / 180 * Math.PI) * 2, 3, 3) + 0.3));
      const period = 24, rowC = new Uint32Array(n), groundPk = U.pk(ground), groundRim = X.shade(groundPk, 1.9);
      g.trait('Sky', colName(day, 'Pale')); g.trait('Land', 'Hills'); g.trait('Path', 'Level'); g.trait('Sun', rs / n < 0.13 ? 'Small' : 'Medium');
      const frame = t => {
        const u = ((t + period * 0.3) % period) / period, mx = sx + (u - 0.5) * rs * 6, my = sy + (u - 0.5) * rs * 0.8;
        const gap = Math.hypot(mx - sx, my - sy), cover = Math.max(0, Math.min(1, 1 - gap / (2 * rs))), dark = Math.pow(cover, 4);
        const skyc = U.pk(U.mix(day, dusk, dark));
        for (let y = 0; y < n; y++) rowC[y] = X.shade(skyc, 0.8 + 0.3 * y / n);   // darker overhead, paler at the horizon
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, dx = x + 0.5 - sx, dy = y + 0.5 - sy, r = Math.hypot(dx, dy);
          let col = rowC[y];
          if (r > rs && dark > 0.3) {
            const a = ((Math.atan2(dy, dx) * 180 / Math.PI | 0) + 360) % 360, cor = streak[a] * Math.exp(-(r - rs) / (rs * 0.55)) * (dark - 0.3) * 1.6;
            if (cor > 0.12) col = X.mixPk(col, CORONA, Math.min(1, cor));
          }
          if (r <= rs) col = X.mixPk(SUNC, WHITE, (1 - r / rs) * 0.6);
          else if (r < rs * 1.7 && dark < 0.6) { const q = 1 - (r - rs) / (rs * 0.7); col = X.mixPk(col, SUNC, q * q * 0.5 * (1 - dark)); }
          if (Math.hypot(x + 0.5 - mx, y + 0.5 - my) <= rs * 1.01) col = X.rgb(8, 8, 12);
          if (y > hills[x]) col = y - 1 <= hills[x] ? groundRim : groundPk;
          d[i] = col;
        }
        if (dark > 0.55) for (const [x, y, b, ph] of sky) if (y < hills[x] && Math.hypot(x - sx, y - sy) > rs * 2.4) d[y * n + x] = X.shade(X.rgb(255, 255, 255), b * (dark - 0.5) * 2);
        // diamond ring: a bright bead where the limbs nearly touch
        if (cover > 0.93 && cover < 0.995) {
          const a = Math.atan2(sy - my, sx - mx), bx = sx + Math.cos(a) * rs, by = sy + Math.sin(a) * rs;
          X.disc(g, bx, by, 1.8, WHITE); X.line(g, bx - 4, by, bx + 4, by, X.rgb(255, 250, 220)); X.line(g, bx, by - 4, bx, by + 4, X.rgb(255, 250, 220));
        }
      };
      frame.period = period;
      return frame;
    }, function alt(R, U, g) {
      const { n, d } = g, N = n * n, sx = n * R.range(0.38, 0.62), sy = n * R.range(0.3, 0.45), rs = n * R.range(0.11, 0.19), nz = U.noise(R), dir = R.sign(), slope = R.range(-0.3, 0.3);
      const SKIES = [[[55, 55, 85], [70, 70, 22]], [[58, 40, 90], [75, 80, 20]], [[8, 60, 90], [0, 70, 22]], [[90, 30, 75], [80, 80, 18]], [[45, 35, 70], [55, 90, 14]], [[12, 50, 95], [95, 70, 20]]];
      const [dd, kk] = R.pick(SKIES), day = U.hsb(...dd), dusk = U.hsb(...kk), sky = starfield(R, n, n * 0.7 | 0);
      const land = R.pick(['hills', 'city', 'sea', 'peaks']), ground = U.hsb(R.range(0, 100), 40, 12);
      const hills = Array.from({ length: n }, (_, x) => land === 'hills' ? n * 0.82 + nz.fbm(x / n * 3, 5, 0, 3) * n * 0.1 : land === 'city' ? n * 0.86 - (((x / 5 | 0) * 37) % 13) - (((x / 3 | 0) * 11) % 3) : land === 'sea' ? n * 0.86 : n * 0.8 - Math.abs(nz.fbm(x / n * 4, 2, 0, 4)) * n * 0.3);
      const streak = Array.from({ length: 360 }, (_, a) => 0.6 + 0.8 * Math.max(0, nz.fbm(Math.cos(a / 180 * Math.PI) * 2, Math.sin(a / 180 * Math.PI) * 2, 3, 3) + 0.3));
      const period = 24, rowC = new Uint32Array(n), groundPk = U.pk(ground), groundRim = X.shade(groundPk, 1.9);
      g.trait('Sky', colName(day, 'Pale')); g.trait('Land', { hills: 'Hills', city: 'City', sea: 'Sea', peaks: 'Peaks' }[land]); g.trait('Path', Math.abs(slope) < 0.1 ? 'Level' : (slope * dir > 0) ? 'Falling' : 'Rising'); g.trait('Sun', rs / n < 0.13 ? 'Small' : rs / n > 0.16 ? 'Large' : 'Medium');
      const frame = t => {
        const u = ((t + period * 0.3) % period) / period, mx = sx + dir * (u - 0.5) * rs * 6, my = sy + (u - 0.5) * rs * 6 * slope;
        const gap = Math.hypot(mx - sx, my - sy), cover = Math.max(0, Math.min(1, 1 - gap / (2 * rs))), dark = Math.pow(cover, 4);
        const skyc = U.pk(U.mix(day, dusk, dark));
        for (let y = 0; y < n; y++) rowC[y] = X.shade(skyc, 0.8 + 0.3 * y / n);   // darker overhead, paler at the horizon
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, dx = x + 0.5 - sx, dy = y + 0.5 - sy, r = Math.hypot(dx, dy);
          let col = rowC[y];
          if (r > rs && dark > 0.3) {
            const a = ((Math.atan2(dy, dx) * 180 / Math.PI | 0) + 360) % 360, cor = streak[a] * Math.exp(-(r - rs) / (rs * 0.55)) * (dark - 0.3) * 1.6;
            if (cor > 0.12) col = X.mixPk(col, CORONA, Math.min(1, cor));
          }
          if (r <= rs) col = X.mixPk(SUNC, WHITE, (1 - r / rs) * 0.6);
          else if (r < rs * 1.7 && dark < 0.6) { const q = 1 - (r - rs) / (rs * 0.7); col = X.mixPk(col, SUNC, q * q * 0.5 * (1 - dark)); }
          if (Math.hypot(x + 0.5 - mx, y + 0.5 - my) <= rs * 1.01) col = X.rgb(8, 8, 12);
          if (y > hills[x]) col = land === 'sea' ? (Math.abs(x - sx) < rs * (1 - dark) * 0.8 && (y + x) % 3 === 0 ? X.rgb(255, 236, 170) : X.shade(skyc, 0.45)) : land === 'city' && (x * 7 + y * 3) % 11 === 0 && dark > 0.4 ? X.rgb(255, 214, 120) : y - 1 <= hills[x] ? groundRim : groundPk;
          d[i] = col;
        }
        if (dark > 0.55) for (const [x, y, b, ph] of sky) if (y < hills[x] && Math.hypot(x - sx, y - sy) > rs * 2.4) d[y * n + x] = X.shade(X.rgb(255, 255, 255), b * (dark - 0.5) * 2);
        // diamond ring: a bright bead where the limbs nearly touch
        if (cover > 0.93 && cover < 0.995) {
          const a = Math.atan2(sy - my, sx - mx), bx = sx + Math.cos(a) * rs, by = sy + Math.sin(a) * rs;
          X.disc(g, bx, by, 1.8, WHITE); X.line(g, bx - 4, by, bx + 4, by, X.rgb(255, 250, 220)); X.line(g, bx, by - 4, bx, by + 4, X.rgb(255, 250, 220));
        }
      };
      frame.period = period;
      return frame;
    }),
  });

  add({
    name: 'Nebula', sizes: [80, 100], fps: 10,
    recipe: 'Three warped noise clouds, one per gas (sulphur, hydrogen, oxygen), each posterised to a few levels and mapped to its own colour channel. The layers drift past one another behind dark dust pillars and stars.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R), zoom = R.range(1.1, 1.8), lv = R.pick([3, 4]), sky = starfield(R, n, n * 0.4 | 0), shape = g.trait('Shape', roll(g, ['Cloud', 'Pillars', 'Shell'], [5, 2, 2])), dustT = shape === 'Pillars' ? 0.04 : 0.22;
      const map = R.pick([[0, 1, 2], [2, 1, 0], [0, 2, 1], [1, 0, 2]]), m = n * 2, fields = [0, 1, 2, 3].map(() => new Float32Array(m * m));
      for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
        const u = x / n * zoom, v = y / n * zoom, wx = nz.fbm(u, v, 0, 3), wy = nz.fbm(u + 7, v + 3, 0, 3), i = y * m + x;
        fields[0][i] = nz.fbm(u + wx * 1.5, v + wy * 1.5, 1, 4) * 1.6 + 0.35;
        fields[1][i] = nz.fbm(u + wx * 2 + 5, v + wy * 2, 2, 4) * 1.6 + 0.3;
        fields[2][i] = nz.fbm(u - wy + 9, v + wx, 3, 3) * 1.4 + 0.25;
        fields[3][i] = nz.fbm(u * 1.4 + 20, v * 1.4, 0, 4) > dustT ? 0.15 : 1;
      }
      const sc = U.scheme(R, 0.3), half = Math.max(1, Math.floor(sc.cols.length / 2)), _t = [g.trait('Palette', palName(sc)), g.trait('Levels', lv), g.trait('Scale', zoom < 1.45 ? 'Close' : 'Wide')], L0 = sc.cols.length, hA = U.heat([sc.cols[0], sc.cols[1 % L0]]), hB = U.heat([sc.cols[half % L0], sc.cols[(half + 1) % L0]]);   // two colours per gas, not the whole palette
      const shell = nebShell(shape, n), q = v => Math.round(Math.max(0, Math.min(1, v)) * lv) / lv, vel = [0, 1, 2, 3].map(() => [R.range(-1, 1) * n * 0.012, R.range(-1, 1) * n * 0.012]);
      return t => {
        const off = vel.map(([vx, vy]) => [((Math.round(t * vx) % m) + m) % m, ((Math.round(t * vy) % m) + m) % m]), ch = [0, 0, 0];
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          for (let k = 0; k < 3; k++) ch[k] = q((k === 2 ? 0.75 : 1) * fields[k][((y + off[k][1]) % m) * m + (x + off[k][0]) % m]);
          const dust = fields[3][((y + off[3][1]) % m) * m + (x + off[3][0]) % m];
          const v = Math.min(255, Math.max(0, (ch[0] * 0.8 + ch[2] * 0.35) * dust * (shell ? shell[y * n + x] : 1) - 0.1) * 290 | 0); d[y * n + x] = (ch[1] > 0.5 ? hB : hA)[v];
        }
        for (const [x, y, b, ph] of sky) {
          const tw = b * (0.75 + 0.25 * Math.sin(t * 1.3 + ph)), c1 = X.rgb(255 * tw, 250 * tw, 235 * tw), c2 = X.rgb(150 * tw, 150 * tw, 165 * tw);
          d[y * n + x] = c1;
          if (b > 0.94) { X.put(g, x + 1, y, c2); X.put(g, x - 1, y, c2); X.put(g, x, y + 1, c2); X.put(g, x, y - 1, c2); }
        }
        if (shell) { const m = n / 2, cc = X.rgb(255, 255, 255), c2 = X.rgb(200, 220, 255); X.rect(g, m - 1, m - 1, 2, 2, cc); X.put(g, m - 2, m - 1, c2); X.put(g, m + 1, m, c2); X.put(g, m, m - 2, c2); X.put(g, m - 1, m + 1, c2); }
      };
    },
  });

  add({
    name: 'Comet', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'A comet swings round the sun on a long ellipse. Near perihelion it sheds two tails: a straight blue ion tail blown directly away from the sun, and a curved golden dust tail lagging along its path.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, N = n * n, sx = n * R.range(0.42, 0.58), sy = n * R.range(0.42, 0.58), e = R.range(0.55, 0.7), a = n * R.range(0.24, 0.3), rot = R.range(0, TAU);
      const ion = U.hsb(R.pick([55, 52, 48]), 70, 100).map(v => v * 2.2), dust = U.hsb(R.pick([12, 10, 8]), 65, 100).map(v => v * 2.2), buf = new Float32Array(N * 3), sky = starfield(R, n, n * 0.5 | 0), look = cometLook(g, ion, dust, n);
      const parts = [], period = 20;
      let M = R.range(0, TAU), last = null;
      const frame = (t, dt) => {
        // Kepler: mean anomaly to position, sun at a focus
        M = (t / period) * TAU + Math.PI;
        let E = M; for (let k = 0; k < 6; k++) E = M + e * Math.sin(E);
        const px = a * look.k * (Math.cos(E) - e), py = a * look.k * Math.sqrt(1 - e * e) * Math.sin(E), cx = sx + px * Math.cos(rot) - py * Math.sin(rot), cy = sy + px * Math.sin(rot) + py * Math.cos(rot);
        const rx = cx - sx, ry = cy - sy, r = Math.hypot(rx, ry), act = Math.max(0.35, Math.min(1.5, (n * 0.22) / r) ** 2);
        if (last) {
          const vx = (cx - last[0]) / dt, vy = (cy - last[1]) / dt;
          for (let k = 0; k < 14 * act; k++) {
            parts.push({ x: cx, y: cy, vx: rx / r * 18 + R.gauss() * 1.5, vy: ry / r * 18 + R.gauss() * 1.5, life: 1, ion: 1 });
            parts.push({ x: cx, y: cy, vx: rx / r * 3 - vx * 0.25 + R.gauss() * 1.2, vy: ry / r * 3 - vy * 0.25 + R.gauss() * 1.2, life: 1, ion: 0 });
          }
        }
        last = [cx, cy];
        for (let i = 0; i < buf.length; i++) buf[i] *= 0.8;
        for (const p of parts) {
          p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * (p.ion ? 0.5 : 0.25);
          const i = (p.y | 0) * n + (p.x | 0);
          if (p.x >= 0 && p.y >= 0 && p.x < n && p.y < n && p.life > 0) { const col = p.ion ? ion : dust; buf[i * 3] += col[0] * p.life * 0.5; buf[i * 3 + 1] += col[1] * p.life * 0.5; buf[i * 3 + 2] += col[2] * p.life * 0.5; }
        }
        for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life <= 0) parts.splice(i, 1);
        for (let i = 0; i < N; i++) d[i] = X.rgb(Math.min(255, buf[i * 3]), Math.min(255, buf[i * 3 + 1]), Math.min(255, buf[i * 3 + 2]));
        if (look.band) for (let i = 0; i < N; i++) if ((d[i] & 0xffffff) === 0) d[i] = look.band[i];
        for (const [x, y, b] of sky) if ((d[y * n + x] & 0xffffff) === 0) d[y * n + x] = X.rgb(b * 110, b * 110, b * 130);
        glow(g, sx, sy, n * 0.1, look.halo, 0.5);
        X.disc(g, sx, sy, n * 0.045, look.sunA); X.disc(g, sx, sy, n * 0.03, look.sunB);
        glow(g, cx, cy, n * 0.035 + 1.5, look.coma, 0.7);
        X.disc(g, cx, cy, 1.2, WHITE);
      };
      return warmUp(frame, 48);
    }, function alt(R, U, g) {
      const { n, d } = g, N = n * n, sx = n * R.range(0.42, 0.58), sy = n * R.range(0.42, 0.58), e = R.range(0.55, 0.7), a = n * R.range(0.24, 0.3), rot = R.range(0, TAU);
      const ion = U.hsb(R.pick([55, 52, 48]), 70, 100).map(v => v * 2.2), dust = U.hsb(R.pick([12, 10, 8]), 65, 100).map(v => v * 2.2), buf = new Float32Array(N * 3), sky = starfield(R, n, n * 0.5 | 0), look = cometLook(g, ion, dust, n);
      const parts = [], period = 20;
      let M = R.range(0, TAU), last = null;
      const frame = (t, dt) => {
        // Kepler: mean anomaly to position, sun at a focus
        M = (t / period) * TAU + Math.PI;
        let E = M; for (let k = 0; k < 6; k++) E = M + e * Math.sin(E);
        const px = a * look.k * (Math.cos(E) - e), py = a * look.k * Math.sqrt(1 - e * e) * Math.sin(E), cx = sx + px * Math.cos(rot) - py * Math.sin(rot), cy = sy + px * Math.sin(rot) + py * Math.cos(rot);
        const rx = cx - sx, ry = cy - sy, r = Math.hypot(rx, ry), act = Math.max(0.35, Math.min(1.5, (n * 0.22) / r) ** 2);
        if (last) {
          const vx = (cx - last[0]) / dt, vy = (cy - last[1]) / dt;
          for (let k = 0; k < 14 * act; k++) {
            parts.push({ x: cx, y: cy, vx: rx / r * 18 + R.gauss() * 1.5, vy: ry / r * 18 + R.gauss() * 1.5, life: 1, ion: 1 });
            parts.push({ x: cx, y: cy, vx: rx / r * 3 - vx * 0.25 + R.gauss() * 1.2, vy: ry / r * 3 - vy * 0.25 + R.gauss() * 1.2, life: 1, ion: 0 });
          }
        }
        last = [cx, cy];
        for (let i = 0; i < buf.length; i++) buf[i] *= 0.8;
        for (const p of parts) {
          p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * (p.ion ? 0.5 : 0.25);
          const i = (p.y | 0) * n + (p.x | 0);
          if (p.x >= 0 && p.y >= 0 && p.x < n && p.y < n && p.life > 0) { const col = p.ion ? ion : dust; buf[i * 3] += col[0] * p.life * 0.5; buf[i * 3 + 1] += col[1] * p.life * 0.5; buf[i * 3 + 2] += col[2] * p.life * 0.5; }
        }
        for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life <= 0) parts.splice(i, 1);
        for (let i = 0; i < N; i++) d[i] = X.rgb(Math.min(255, buf[i * 3]), Math.min(255, buf[i * 3 + 1]), Math.min(255, buf[i * 3 + 2]));
        if (look.band) for (let i = 0; i < N; i++) if ((d[i] & 0xffffff) === 0) d[i] = look.band[i];
        for (const [x, y, b] of sky) if ((d[y * n + x] & 0xffffff) === 0) d[y * n + x] = X.rgb(b * 110, b * 110, b * 130);
        X.disc(g, sx, sy, n * 0.075, (x, y) => (x + y) & 1 ? X.mixPk(d[y * n + x], look.halo, 0.5) : d[y * n + x]);
        X.disc(g, sx, sy, n * 0.055, look.sunA); X.disc(g, sx, sy, n * 0.038, look.sunB);
        glow(g, cx, cy, n * 0.04 + 1.5, look.coma, 0.7);
        X.disc(g, cx, cy, 1.8, WHITE); X.put(g, cx, cy, X.rgb(200, 240, 255));
      };
      return warmUp(frame, 48);
    }),
  });

  add({
    name: 'Star Trails', sizes: [100, 200], fps: 12,
    recipe: 'A long exposure: the sky turns about a pole off the top of the frame and every star scratches its arc into the plate behind a dark treeline, until the plate is changed and it starts again.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, px = n * R.range(0.2, 0.8), py = -n * R.range(0.05, 0.4), plate = new Uint32Array(N), sky = U.hsb(R.pick([62, 66, 70, 75]), 70, 14);
      const nz = U.noise(R), k = n * 3, st = Array.from({ length: k }, () => { const r = Math.sqrt(R()) * n * 1.6; return { r, a: R.range(0, TAU), col: U.pk(U.mix([255, 255, 255], U.hsb(R.pick([5, 10, 55, 60, 15]), 60, 100), R.range(0, 0.7))), b: R.range(0.25, 1) }; });
      const line = Array.from({ length: n }, (_, x) => n * 0.78 + nz.fbm(x / n * 2.5, 1, 0, 2) * n * 0.12), trees = Array.from({ length: n }, (_, x) => R.bool(0.12) ? R.range(3, 12) * n / 100 : 0);
      const speed = R.range(0.012, 0.022) * R.sign(), cycle = 40, fg = trailsLand(g, nz, n, line, trees), water = Math.round(n * 0.8);
      g.trait('Pole', px < n * 0.4 ? 'Left' : px > n * 0.6 ? 'Right' : 'Centre'); g.trait('Sky', colName(sky)); g.trait('Turn', speed > 0 ? 'Clockwise' : 'Anticlockwise');
      let start = -1, first = true;
      const scratch = t => {
        for (const s of st) {
          const a = s.a + t * speed, x = px + Math.cos(a) * s.r, y = py + Math.sin(a) * s.r;
          if (x >= 0 && y >= 0 && x < n && y < n) { const i = (y | 0) * n + (x | 0); plate[i] = X.mixPk(plate[i], s.col, s.b); }
        }
      };
      return t0 => {
        // the exposure is already some way in when the piece opens: the plate shows arcs from the first frame
        const t = t0 + 14, cyc = Math.floor(t / cycle);
        if (cyc !== start) { start = cyc; for (let y = 0; y < n; y++) plate.fill(U.pk(U.mix(sky, [0, 0, 0], y / n * 0.6)), y * n, y * n + n); }
        if (first) { first = false; for (let tt = cyc * cycle; tt < t; tt += 1 / 12) scratch(tt); }
        scratch(t);
        d.set(plate);
        const fade = Math.min(1, (t % cycle) / 2, (cycle - t % cycle) / 2);
        if (fade < 1) for (let i = 0; i < N; i++) d[i] = X.shade(d[i], fade);
        for (let x = 0; x < n; x++) {
          for (let y = Math.round(line[x]); y < n; y++) d[y * n + x] = fg === 'Shore' && y >= water ? X.mixPk(X.rgb(4, 5, 12), d[Math.max(0, 2 * water - y - 1) * n + x], (y & 1) ? 0.18 : 0.38) : X.rgb(4, 4, 8);
          if (trees[x] && fg === 'Desert') cactus(g, x, Math.round(line[x]), trees[x]);
          else if (trees[x]) { const h = trees[x]; for (let y = 0; y < h * 2.2; y++) { const w = Math.round((y / (h * 2.2)) * h * 0.5); X.rect(g, x - w, Math.round(line[x]) - h * 2.2 + y, w * 2 + 1, 1, X.rgb(4, 4, 8)); } }
        }
      };
    },
  });

  add({
    name: 'Constellations', sizes: [100, 200], fps: 12,
    recipe: 'The view drifts across an invented sky. In each patch a pen finds the brightest stars, joins them with a spanning tree one line at a time, names the figure, and lets it fade as the sky moves on.',
    make(R, U, g) {
      const { n, d } = g, W = n * 4, stars = Array.from({ length: n * 10 }, () => [R.range(0, W), R.range(0, n), Math.pow(R(), 3)]);
      const sc = U.scheme(R, 0.4), ink0 = U.pk(sc.cols[R.int(0, sc.cols.length - 1)]), ink = X.lum(ink0) < 0.55 ? X.mixPk(ink0, WHITE, 0.45) : ink0, bg = conSky(g), speed = n / 20, style = g.trait('Style', roll(g, ['Lines', 'Dotted', 'Star chart'], [4, 2, 2]));
      conBand(g, stars, W, n); g.trait('Ink', colName(ink, 'White'));
      const SY = ['AR', 'VEL', 'ON', 'IS', 'KA', 'LYR', 'TH', 'EA', 'MOR', 'SE', 'UN', 'DRA', 'CY', 'NOX', 'RA'];
      const figures = [];
      const make = cx => {
        const pick = stars.filter(s => Math.abs(s[0] - cx) < n * 0.35 && s[1] > n * 0.15 && s[1] < n * 0.85).sort((a, b) => b[2] - a[2]).slice(0, R.int(6, 9));
        const edges = [], inT = [pick[0]];
        while (inT.length < pick.length) {
          let best = null;
          for (const a of inT) for (const b of pick) if (!inT.includes(b)) { const dd = Math.hypot(a[0] - b[0], a[1] - b[1]); if (!best || dd < best[2]) best = [a, b, dd]; }
          inT.push(best[1]); edges.push(best);
        }
        return { edges, name: R.pick(SY) + R.pick(SY).toLowerCase() + R.pick(['A', 'IS', 'US', 'ON', 'E']).toLowerCase(), born: null, cx };
      };
      let nextX = n * 0.8, warm = true;
      const frame = t => {
        const off = t * speed;
        while (nextX < off + n * 1.6) { figures.push(make(nextX % W)); nextX += n * R.range(0.55, 0.8); }
        d.fill(bg);
        if (style === 'Star chart') { const grid = X.mixPk(bg, X.rgb(120, 140, 200), 0.38), st = n / 4; for (let gx = -((off % st) + st) % st; gx < n; gx += st) for (let y = 0; y < n; y += 2) X.put(g, gx, y, grid); for (let gy = st / 2; gy < n; gy += st) for (let x = 0; x < n; x += 2) X.put(g, x, gy, grid); }
        let labR = -1e9;
        for (const [x0, y, b] of stars) { const x = ((x0 - off) % W + W) % W; if (x < n) d[(y | 0) * n + (x | 0)] = X.rgb(80 + b * 175, 80 + b * 175, 100 + b * 155); }
        for (const fg of figures) {
          const sx = ((fg.cx - off) % W + W) % W;
          if (sx > n * 1.3 || sx < -n * 0.5) continue;
          if (fg.born === null && sx < n * 0.85) fg.born = t;
          if (fg.born === null) continue;
          const age = t - fg.born, drawn = age * 2.2, fade = Math.max(0, Math.min(1, (sx + n * 0.2) / (n * 0.4)));
          fg.edges.forEach(([a, b], k) => {
            const u = Math.max(0, Math.min(1, drawn - k)); if (!u) return;
            const ax = ((a[0] - off) % W + W) % W, bx = ((b[0] - off) % W + W) % W;
            if (Math.abs(ax - bx) > n) return;
            { const lc = X.shade(ink, 0.75 * fade); X.line(g, ax, a[1], ax + (bx - ax) * u, a[1] + (b[1] - a[1]) * u, style === 'Dotted' ? (x, y, i) => { if (!(i % 3 === 2)) X.put(g, x, y, lc); } : lc); }
          });
          for (const [a, b] of fg.edges) for (const s of [a, b]) { const x = ((s[0] - off) % W + W) % W; X.rect(g, x - 1, s[1] - 1, 2, 2, X.shade(WHITE, fade)); }
          if (drawn > fg.edges.length) {   // names never overlap: one that would run into its left neighbour waits
            const ts = n >= 200 ? 2 : 1, w = fg.name.length * 6 * ts, lx = Math.max(1, Math.min(n - w, sx - w / 2));
            if (lx >= labR + 3 * ts) { X.text(g, fg.name.toUpperCase(), lx, n * 0.9 - (ts - 1) * 6, X.shade(ink, fade * Math.min(1, drawn - fg.edges.length)), ts); labR = lx + w; }
          }
        }
      };
      // a few seconds of drift are played before the first frame, so a figure is already being drawn
      return t => { if (warm) { warm = false; for (let k = 0; k < 60; k++) frame(k / 12); } frame(t + 5); };
    },
  });

  add({
    name: 'Ringed World', sizes: [80, 100], fps: 12,
    recipe: 'A banded gas giant, lit from one side and dithered at the terminator, inside a tilted system of rings with gaps; the rings pass behind and in front, the planet throws its shadow across them, and moons go round.',
    make(R, U, g) {
      const { n, d } = g, RF = framing(g, n, 1.32, 0.6), c = n / 2, rp = n * R.range(0.2, 0.26) * RF.S, tilt = R.range(0.18, 0.35), sc = U.scheme(R, 0.35), nz = U.noise(R), sky = starfield(R, n, n * 0.5 | 0);
      const band = ringBands(sc), lx = R.range(-0.9, -0.4), ly = R.range(-0.6, 0.1), lz0 = Math.sqrt(Math.max(0.05, 1 - lx * lx - ly * ly)), RW = ringRoll(g), lz = RW.crescent ? -lz0 * 0.92 : lz0;
      const r0 = rp * RW.r0, r1 = rp * RW.r1, gaps = [R.range(0.3, 0.45), R.range(0.6, 0.75)], ringCol = U.mix(sc.cols[1 % sc.cols.length], [235, 225, 205], 0.6), lean = R.range(-0.35, 0.35);
      const moons = Array.from({ length: R.int(1, 3) }, () => ({ r: rp * R.range(2.4, 3.2), w: R.range(0.15, 0.3), ph: R.range(0, TAU) }));
      const BG = backdrop(g, n);
      g.trait('Bands', palName(sc));
      return t => {
        const cl = Math.cos(lean), sl = Math.sin(lean);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, X0 = x + 0.5 - RF.cx, Y0 = y + 0.5 - RF.cy, u = X0 * cl + Y0 * sl, v = -X0 * sl + Y0 * cl;
          let col = BLACK;
          const rr = Math.hypot(u, v / tilt), q = (rr - r0) / (r1 - r0);
          const inRing = q > 0 && q < 1 && Math.abs(q - gaps[0]) > 0.025 && Math.abs(q - gaps[1]) > 0.015;
          const ringC = () => { const k = RW.lets ? (Math.sin(q * 95) > 0.15 ? 0.95 : 0.12) : 0.55 + 0.45 * Math.sin(q * 60) * Math.sin(q * 23); let cc = U.mix([0, 0, 0], ringCol, 0.45 + 0.4 * k); if (u * lx + 0 < 0 && Math.abs(v / tilt * 0 + u * ly - v * lx) < rp && u * lx < 0 && false) cc = U.mix(cc, [0, 0, 0], 0.7); return U.pk(cc); };
          const pd = u * u + v * v;
          if (inRing && v < 0) col = ringC();                     // far half of the rings, behind
          if (pd < rp * rp) {
            const z = Math.sqrt(rp * rp - pd), nx = u / rp, ny = v / rp, nzz = z / rp, lit = nx * lx + ny * ly + nzz * lz;
            const lat = ny + 0.08 * nz.n2(nx * 3 + t * 0.05, ny * 12); let b = band[((lat * 3 + 5) * 256 | 0) & 255]; if (RW.storm) b = stormAt(RW, nx, ny, t, b);
            const level = lit > 0.25 ? 1 : lit > 0.05 ? (X.dith4(x, y) < 0.5 ? 0.6 : 0.25) : lit > -0.08 ? (X.dith4(x, y) < 0.25 ? 0.2 : 0.05) : 0.05;
            col = X.shade(b, level * (0.7 + 0.3 * nzz));   // limb darkening
          }
          if (inRing && v >= 0) {
            col = ringC();
            // the planet's shadow falls on the rings away from the light
            if ((u * -lx > 0) && Math.abs(u * ly - v * lx) < rp * 0.9 && v > 0) col = X.shade(col, 0.3);
          }
          d[i] = col;
        }
        for (const [x, y, b] of sky) if (d[y * n + x] === BLACK) d[y * n + x] = X.rgb(b * 110, b * 110, b * 130);
        if (BG) for (let i = 0; i < n * n; i++) if (d[i] === BLACK) d[i] = BG[i];
        for (const m of moons) {
          const a = m.ph + t * m.w, u = Math.cos(a) * m.r, v = Math.sin(a) * m.r * tilt, x = RF.cx + u * cl - v * sl, y = RF.cy + u * sl + v * cl;
          if (v < 0 && u * u + v * v < rp * rp) continue;
          X.disc(g, x, y, n * 0.012 + 0.6, X.rgb(220, 215, 200));
        }
      };
    },
  });

  add({
    name: 'Accretion', sizes: [80, 100], fps: 12,
    recipe: 'A black hole’s shadow ringed by a thin photon ring. The hot disc streams round it, brighter on the side coming towards you, and the far side of the disc is bent up over the top into a glowing arc.',
    make(R, U, g) {
      const { n, d } = g, AS = { Standard: 1, Close: 1.4, Far: 0.66 }[g.trait('Scale', roll(g, ['Standard', 'Close', 'Far'], [4, 2, 2]))], c = n / 2, rh = n * R.range(0.09, 0.12) * AS, tilt = R.range(0.12, 0.25), nz = U.noise(R), dir = R.sign();
      const sc = U.scheme(R, 0.3), heat = U.heat(R.bool(0.5) ? [[160, 30, 0], [255, 140, 20]] : [sc.cols[0], sc.cols[1 % sc.cols.length]]), sky = starfield(R, n, n * 0.5 | 0);
      const AC = accRoll(g), r0 = rh * 1.6, r1 = rh * AC.disc;
      const BG = backdrop(g, n); g.trait('Palette', colName(heat[170]));
      const tex = (r, a, t) => { const q = (r - r0) / (r1 - r0); return (0.55 + 0.45 * nz.n2(a * 3 + dir * t * 1.2 / (q + 0.4), q * 6)) * (1 - q) * 1.25; };
      return t => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, u = x + 0.5 - c, v = y + 0.5 - c, rr = Math.hypot(u, v / tilt);
          let val = 0;
          if (rr > r0 && rr < r1) { const a = Math.atan2(v / tilt, u); val = tex(rr, a, t) * (1 + 0.6 * dir * Math.cos(a + Math.PI / 2) * 0); val *= 1 + 0.55 * Math.sign(u) * dir; }
          // the lensed far side: an arc above the shadow
          const rs = Math.hypot(u, v);
          if (v < 0 && rs > rh * 1.15 && rs < rh * 2.1) { const a = Math.atan2(v, u), q = (rs - rh * 1.15) / (rh * 0.95); const lv = tex(r0 + q * (r1 - r0) * 0.6, -a, t) * (1 - q) * 0.9 * (1 + 0.4 * Math.sign(u) * dir); val = Math.max(val * (v < -rh * 0.3 ? 0.25 : 1), lv); }
          if (rs < rh) val = v > 0 && rr > r0 && rr < r1 ? val : -1;
          if (Math.abs(rs - rh * 1.05) < 0.6 && val >= 0) val = Math.max(val, 0.95);
          if (AC.jets && val >= 0 && Math.abs(v) > rh * 1.05) { const jw = 0.7 + Math.abs(v) * 0.05, au = Math.abs(u); if (au < jw) val = Math.max(val, (1 - au / jw) * Math.exp(-Math.abs(v) / (n * 0.42)) * (0.55 + 0.45 * nz.n2(v * 0.18 - t * 2.5 * Math.sign(v), 7.7)) * 1.1); }
          d[i] = val < 0 ? BLACK : heat[Math.min(255, Math.max(0, val * 255 | 0))];
        }
        for (const [x, y, b] of sky) if (d[y * n + x] === heat[0]) d[y * n + x] = X.rgb(b * 110, b * 110, b * 130);
        if (BG) for (let i = 0; i < n * n; i++) if (d[i] === heat[0]) d[i] = BG[i];
        if (AC.mate) accMate(g, n, c, r1, tilt, t, heat);
      };
    },
  });

  add({
    name: 'Moon Phases', sizes: [100, 200], fps: 10,
    recipe: 'A calendar of cratered moons, one per night, each lit by a sun that swings round month by month; the shadow line is dithered and the dark side keeps a faint earthshine.',
    make(R, U, g) {
      const { n, d } = g, k = R.pick([3, 4, 5]), cell = n / k, rm = cell * 0.4, nz = U.noise(R), bg = X.rgb(8, 8, 14);
      const tint = U.mix([235, 232, 220], U.hsb(R.range(0, 100), 30, 100), R.range(0, 0.4)), craters = Array.from({ length: 14 }, () => [R.range(-1, 1), R.range(-1, 1), R.range(0.08, 0.25)]);
      const speed = R.range(0.12, 0.2), step = R.pick([1, 1, 2]) / (k * k);
      const albedo = (u, v) => { let a = 0.75 + 0.2 * nz.fbm(u * 2, v * 2, 0, 3); for (const [cx, cy, r] of craters) { const dd = Math.hypot(u - cx, v - cy); if (dd < r) a *= dd > r * 0.75 ? 1.15 : 0.82; } return Math.min(1, a); };
      const tex = new Float32Array(Math.ceil(rm * 2 + 2) ** 2), tw = Math.ceil(rm * 2 + 2), litL = U.lut([[0, 0, 0], tint], false), MP = moonStyle(g, n, k, cell, bg), darkL = MP.dark || U.lut([[0, 0, 0], [17.5, 20, 27.5]], false);
      g.trait('Nights', k * k); g.trait('Moon', colName(tint, 'Silver')); g.trait('Spacing', step * k * k > 1.5 ? 'Every other night' : 'Nightly');
      for (let y = 0; y < tw; y++) for (let x = 0; x < tw; x++) tex[y * tw + x] = albedo((x - tw / 2) / rm, (y - tw / 2) / rm);
      return t => {
        d.fill(bg);
        if (MP.back) d.set(MP.back);
        for (let j = 0; j < k * k; j++) {
          const cx = (j % k + 0.5) * cell, cy = (Math.floor(j / k) + 0.5) * cell, ph = (t * speed + j * step) * TAU, lx = Math.sin(ph), lz = -Math.cos(ph);
          for (let y = Math.floor(cy - rm); y <= cy + rm; y++) for (let x = Math.floor(cx - rm); x <= cx + rm; x++) {
            const u = (x + 0.5 - cx) / rm, v = (y + 0.5 - cy) / rm, q = u * u + v * v;
            if (q > 1 || x < 0 || y < 0 || x >= n || y >= n) continue;
            if (MP.ring && q > 0.86) { d[y * n + x] = MP.ring; continue; }
            const z = Math.sqrt(1 - q), lit = u * lx + z * lz, a = tex[Math.min(tw * tw - 1, ((y - Math.floor(cy - rm)) * tw + (x - Math.floor(cx - rm))))];
            const on = lit > 0.08 ? 1 : lit > -0.08 ? (X.dith4(x, y) < (lit + 0.08) / 0.16 ? 1 : 0) : 0;
            d[y * n + x] = on ? litL[Math.max(0, Math.min(255, a * (0.55 + 0.45 * Math.min(1, lit * 2 + 0.3)) * 255 | 0))] : darkL[Math.max(0, Math.min(255, a * 255 | 0))];
          }
        }
      };
    },
  });
})();
