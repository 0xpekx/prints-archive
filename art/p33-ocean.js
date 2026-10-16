// Set 4 · Ocean: kelp, whales, the abyss and the tideline, in pixels.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Ocean' }, def));
  const { rgb, mixPk: mix, shade, put, line, rect, disc } = X;
  const TAU = Math.PI * 2, B4 = X.bayer(4);
  const dth = (x, y) => B4[(y & 3) * 4 + (x & 3)];
  const dim75 = v => ((v >> 1 & 0x7f7f7f) + (v >> 2 & 0x3f3f3f) | 0xff000000) >>> 0;
  // a vertical water ramp as one packed colour per row
  const waterRows = (n, top, bot, curve = 1) => Array.from({ length: n }, (_, y) => { const v = Math.pow(y / (n - 1), curve); return rgb(top[0] + (bot[0] - top[0]) * v, top[1] + (bot[1] - top[1]) * v, top[2] + (bot[2] - top[2]) * v); });
  // Light shafts slanting down from the surface: a 1D pattern along u = x + 0.35y,
  // rebuilt each frame, so the per-cell cost is one lookup.
  function shafts(n) {
    const len = Math.ceil(n * 1.4) + 2, a = new Float32Array(len);
    return {
      a,
      update(t, s) { for (let u = 0; u < len; u++) { const v = Math.sin(u * 0.09 / s + Math.sin(u * 0.017 / s + t * 0.21) * 2.2 + t * 0.12); a[u] = v > 0.55 ? (v - 0.55) / 0.45 : 0; } },
      at(x, y) { return a[(x + y * 0.35) | 0]; },
    };
  }
  // the water background with shafts, faded with depth; `lit` is a brighter copy per row
  function paintWater(d, n, rows, lit, sh, depthFade) {
    for (let y = 0; y < n; y++) {
      const base = rows[y], hi = lit[y], k = 1 - y / (n * depthFade);
      for (let x = 0; x < n; x++) d[y * n + x] = k > 0 && sh.at(x, y) * k > dth(x, y) * 0.9 + 0.05 ? hi : base;
    }
  }

  // ---- chunky water for the reworked pieces ----
  const K = U.K4, hx = K.hx;
  // seas: five depth tones, light to dark
  const SEAS = [
    ['#7fe0e0', '#3ab0c8', '#1a7aa8', '#0c4a78', '#06243e'], ['#5aa8d8', '#2a78b8', '#18508a', '#0c2e5a', '#061630'],
    ['#8ad0a0', '#3a9a7a', '#1e6a5a', '#0e3e3a', '#061e1e'], ['#a8d8f0', '#78b0d8', '#4a80b0', '#2a5080', '#142848'],
    ['#3ac0b0', '#1e8a9a', '#14507a', '#0e2a5a', '#0a1230'], ['#5ad0d0', '#2a90b8', '#2a5a9a', '#2a2a6a', '#140c30'],
  ].map(a => a.map(hx));
  // hard depth bands, slanted light shafts one step lighter, and drifting specks
  function sea(g, S, t, y0 = 0, specks = 30, shaftsOn = true) {
    const { n, d } = g, k = S.length - 1;
    for (let y = y0; y < n; y++) {
      const v = (y - y0) / (n - y0) * k, b = Math.min(k - 1, Math.floor(v)), seam = b > 0 && y === Math.ceil(y0 + b * (n - y0) / k);
      for (let x = 0; x < n; x++) {
        let idx = (seam && ((x + y) & 1) ? b - 1 : b) + 1;
        if (shaftsOn && v < k * 0.7 && ((x + y * 0.45 + t * 1.5) % (n * 0.33)) < n * 0.06 * (1 - v / k)) idx--;
        d[y * n + x] = S[idx];
      }
    }
    for (let q = 0; q < specks; q++) {
      const x = (K.hash(q, 1) * n + Math.sin(t * 0.3 + q) * 2) % n, y = y0 + ((K.hash(q, 2) * (n - y0) + t * (0.6 + K.hash(q, 3))) % (n - y0));
      put(g, x, y, mix(d[(y | 0) * n + (x | 0)], WHITE, 0.4));
    }
  }

  const ogLook = g => g.home || g.alt() < 0.5;
  // Traits: T names what a variation rolled; alt() rolls a new trait from g.alt (the opening variation keeps `home`)
  const T = (g, k, v) => (g.trait ? g.trait(k, v) : v);
  const alt = (g, home, opts) => { if (g.home) return home; let sum = 0; for (const o of opts) sum += o[1]; let r = g.alt() * sum; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };
  const CAP = w => w.charAt(0).toUpperCase() + w.slice(1);
  const SEA_NAMES = ['Lagoon', 'Atlantic', 'Kelp Green', 'Pale', 'Tropic', 'Twilight'];
  // a visitor crossing slowly through the scene: a seal or a turtle, at scale k cells
  function visitor(g, kind, t, y, k, dir) {
    const { n } = g, span = n + 30 * k, x = dir > 0 ? ((t * 1.6 * k) % span) - 15 * k : n + 15 * k - ((t * 1.6 * k) % span), fl = Math.sin(t * 3) > 0 ? 1 : 0;
    if (kind === 'Seal') {
      K.ell(g, x, y, 7 * k, 2.2 * k, (xx, yy, nx, ny) => ny < -0.3 ? hx('#7a7a84') : ny > 0.4 ? hx('#a8a8b0') : hx('#5a5a64'));
      K.ell(g, x + dir * 6.5 * k, y - 0.6 * k, 2.4 * k, 1.9 * k, hx('#6a6a74')); put(g, x + dir * 7.5 * k, y - 1.2 * k, hx('#101014'));
      K.ell(g, x - dir * 7.5 * k, y + (fl ? -1 : 1) * k, 2.2 * k, 0.9 * k, hx('#4a4a54')); K.ell(g, x + dir * 1.5 * k, y + 2.2 * k, 1.8 * k, 0.8 * k, hx('#4a4a54'));
    } else if (kind === 'Turtle') {
      K.ell(g, x, y, 5 * k, 3 * k, (xx, yy, nx, ny) => ((Math.round(nx * 3) + Math.round(ny * 2)) & 1) ? hx('#5a7a3a') : hx('#7a9a4a'));
      K.ell(g, x + dir * 6 * k, y - 0.5 * k, 1.8 * k, 1.4 * k, hx('#a8b878'));
      for (const sd of [-1, 1]) K.ell(g, x + dir * 2 * k, y + sd * (3 + fl) * k, 2.4 * k, 1 * k, hx('#8aa060'));
      K.ell(g, x - dir * 4 * k, y + 2.4 * k, 1.4 * k, 0.8 * k, hx('#8aa060'));
    }
  }

  // Kelp Forest: the original, exactly, with input hooks that never draw from R
  function kelpOG(R, U, g) {
      const { n, d } = g, s = n / 100, sh = shafts(n);
      const top = R.pick([[70, 180, 170], [90, 190, 200], [110, 170, 140]]), rows = waterRows(n, top, [6, 26, 50], 0.8), lit = rows.map(c => mix(c, rgb(220, 250, 240), 0.22));
      const bed = Array.from({ length: n }, (_, x) => n - (6 + 3 * Math.sin(x * 0.11 / s) + 2 * Math.sin(x * 0.31 / s + 1)) * s);
      const stalks = [];
      for (let k = 0; k < R.int(7, 11); k++) { const far = k < 3; stalks.push({ x: R.range(0.05, 0.95) * n, h: R.range(far ? 0.5 : 0.65, far ? 0.75 : 0.98) * n, ph: R() * TAU, far, c: far ? rgb(40, 60, 40) : R.pick([rgb(110, 110, 40), rgb(130, 100, 40), rgb(90, 110, 40)]) }); }
      stalks.sort((a, b) => b.far - a.far);
      const school = Array.from({ length: 26 }, () => [R.range(-1, 1), R.range(-0.5, 0.5), R() * TAU]);
      const sp = R.range(0.07, 0.11), sy = R.range(0.3, 0.6) * n;
      const bubbles = Array.from({ length: 10 }, () => [R() * n, R() * n, R.range(4, 8)]), follow = { x: n / 2, y: sy, on: 0 };
      T(g, 'Look', 'Classic'); T(g, 'Water', ['Jade', 'Blue', 'Moss'][[180, 190, 170].indexOf(top[1])]);
      // new traits: how thick the forest is, the school, and a rare visitor passing through
      const dens = T(g, 'Forest', alt(g, 'Tall Forest', [['Tall Forest', 3], ['Sparse', 1], ['Thicket', 1]])), shoal = T(g, 'School', alt(g, 'Silver', [['Silver', 3], ['Golden', 1], ['Big Shoal', 1]])), vis = T(g, 'Visitor', alt(g, 'None', [['None', 4], ['Seal', 1], ['Turtle', 1]]));
      if (dens === 'Sparse') stalks.splice(0, stalks.length, ...stalks.filter((st, k) => st.far || k % 2 === 0));
      if (dens === 'Thicket') { const A = g.alt; for (let k = 0; k < 6; k++) stalks.push({ x: A.range(0.05, 0.95) * n, h: A.range(0.6, 0.98) * n, ph: A() * TAU, far: false, c: A.pick([rgb(110, 110, 40), rgb(130, 100, 40), rgb(90, 110, 40)]) }); }
      if (shoal === 'Big Shoal') { const A = g.alt; for (let k = 0; k < 30; k++) school.push([A.range(-1.6, 1.6), A.range(-0.8, 0.8), A() * TAU]); }
      const FC = shoal === 'Golden' ? [rgb(250, 210, 80), rgb(200, 140, 40), rgb(170, 110, 30)] : [rgb(210, 220, 225), rgb(140, 150, 160), rgb(90, 110, 130)];
      // new trait: the scene (the forest floor, a clearing, looking up into the canopy, a rocky slope, or night)
      const scene = T(g, 'Scene', alt(g, 'Forest Floor', [['Forest Floor', 1.6], ['Clearing', 1], ['Canopy', 1], ['Rocky Slope', 1], ['Night', 1]]));
      if (scene === 'Clearing') for (const st of stalks) st.x = st.x < n / 2 ? st.x * 0.55 : n - (n - st.x) * 0.55;
      if (scene === 'Canopy') for (const st of stalks) st.h = Math.min(n * 1.05, st.h * 1.3);
      if (scene === 'Rocky Slope') { const dir = g.alt() < 0.5 ? 1 : -1; for (let x = 0; x < n; x++) { const u = dir > 0 ? x / n : 1 - x / n; bed[x] = n - (6 + 45 * u * u + 3 * Math.sin(x * 0.4 / s)) * s; } }
      if (scene === 'Night') { const nr = waterRows(n, [20, 50, 90], [2, 6, 16], 0.8); for (let y = 0; y < n; y++) { rows[y] = nr[y]; lit[y] = mix(nr[y], rgb(120, 150, 200), 0.12); } for (const st of stalks) st.c = shade(st.c, 0.45); }
      T(g, 'Stalks', stalks.length); T(g, 'Grid', n);
      return (t, dt) => {
        sh.update(t, s);
        paintWater(d, n, rows, lit, sh, 0.85);
        if (scene === 'Canopy') {
          // looking up: the bright underside of the surface and the sun through it
          const sy0 = Math.round(n * 0.16), sx = n * 0.5 + Math.sin(t * 0.05) * n * 0.1;
          for (let y = 0; y < sy0; y++) for (let x = 0; x < n; x++) { const k = 1 - y / sy0, rip = Math.sin(x * 0.3 / s + t * 1.2 + y * 0.5) > 0.6; d[y * n + x] = mix(rows[y], WHITE, (rip ? 0.55 : 0.32) * k + 0.08); }
          disc(g, sx, n * 0.06, 6 * s, mix(rows[0], WHITE, 0.85)); disc(g, sx, n * 0.06, 3.5 * s, WHITE);
        }
        for (let x = 0; x < n; x++) for (let y = Math.floor(bed[x]); y < n; y++) d[y * n + x] = (x * 5 + y * 3) % 7 === 0 ? rgb(90, 80, 60) : y - bed[x] < 1.5 ? rgb(70, 70, 56) : rgb(50, 46, 40);
        for (const st of stalks) {
          const base = bed[Math.min(n - 1, Math.max(0, st.x | 0))], w = st.far ? 1 : Math.max(1, Math.round(1.5 * s));
          for (let j = 1; j < st.h; j++) {
            const f = j / st.h, x = st.x + Math.pow(f, 1.4) * 9 * s * Math.sin(t * 0.55 + st.ph - j * 0.03 / s) + f * 4 * s * Math.sin(t * 0.21), y = base - j;
            rect(g, x - (w >> 1), y, w, 1, st.c);
            if (!st.far && j % Math.round(6 * s) === 0) {
              const side = (j / Math.round(6 * s)) % 2 ? 1 : -1, bl = (4 + 3 * Math.sin(j)) * s, sw = Math.sin(t * 0.9 + j * 0.1) * 0.4;
              line(g, x, y, x + side * bl * Math.cos(0.7 + sw), y - bl * Math.sin(0.7 + sw), mix(st.c, rgb(200, 180, 80), 0.35));
              rect(g, x + side * s - (s > 1 ? 1 : 0), y - s, Math.max(1, s), Math.max(1, s), rgb(210, 170, 60));
            }
          }
        }
        // the school wheels round a slow figure eight
        let lx = n / 2 + Math.sin(t * sp) * n * 0.45, ly = sy + Math.sin(t * sp * 2) * n * 0.12, dir = Math.cos(t * sp) >= 0 ? 1 : -1;
        // the pointer leads the school (no draws from R)
        if (g.input.inside) { follow.x += (g.input.x * n - follow.x) * 0.06; follow.y += (g.input.y * n - follow.y) * 0.06; follow.on = 1; }
        else follow.on = Math.max(0, follow.on - dt * 0.4);
        if (follow.on > 0) { const k = Math.min(1, follow.on); dir = follow.x >= lx ? 1 : -1; lx += (follow.x - lx) * k; ly += (follow.y - ly) * k; } else { follow.x = lx; follow.y = ly; }
        for (const [a, b, ph] of school) {
          const x = lx + a * 12 * s + Math.sin(t * 2 + ph) * s, y = ly + b * 8 * s + Math.cos(t * 1.7 + ph) * s;
          rect(g, x, y, 2 * s, s, FC[0]); put(g, x + (dir > 0 ? 2 * s : -1), y, FC[1]); rect(g, x, y - (s > 1 ? 0 : 0), 2 * s, Math.max(1, s >> 1), FC[2]);
        }
        if (vis !== 'None') visitor(g, vis, t, n * 0.28, 1.4 * s, 1);
        if (scene === 'Night') for (let q = 0; q < 40; q++) { if (Math.sin(t * 1.7 + q * 2.3) < 0.5) continue; put(g, K.hash(q, 11) * n, K.hash(q, 12) * n * 0.9, rgb(120, 230, 255)); }
        if (scene === 'Canopy') for (const st of stalks) if (!st.far) { const x = st.x + 9 * s * Math.sin(t * 0.55 + st.ph - st.h * 0.03 / s) + 4 * s * Math.sin(t * 0.21), y = bed[Math.min(n - 1, Math.max(0, st.x | 0))] - st.h; if (y > -3 * s) disc(g, x, Math.max(1, y), 1.6 * s, rgb(200, 170, 70)); }
        for (const b of bubbles) { b[1] -= b[2] * dt * s; if (b[1] < 0) { b[1] = n; b[0] = R() * n; } put(g, b[0] + Math.sin(t * 3 + b[2]) * s, b[1], rgb(200, 240, 250)); }
      };
  }
  // Kelp Forest: the reworked look, an extra mode
  function kelpNew(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SEAS);
      const KC = R.pick([['#8a8a2a', '#b0a83a', '#5a5a1a'], ['#7a5a2a', '#a8803a', '#4a3418'], ['#3a8a3a', '#5ab04a', '#1e5a24'], ['#a83a3a', '#d06a4a', '#6a1e1e']]).map(hx);
      const FISH = R.pick([['#d8e0e8', '#8a9aa8'], ['#f2c230', '#e8722a'], ['#5ac8ff', '#2a6ad8'], ['#ff8a6a', '#c84a3a']]).map(hx);
      const bed = Array.from({ length: n }, (_, x) => Math.round(n - (3 + 1.5 * Math.sin(x * 0.25) + K.hash(x >> 1, 3) * 2) * s));
      const stalks = Array.from({ length: R.int(5, 9) }, (_, k) => ({ x: R.range(0.04, 0.96) * n, h: R.range(0.6, 1) * n, ph: R.range(0, TAU), far: k < 2, blade: R.int(3, 5) }));
      // (the Scene trait below may move them)
      stalks.sort((a, b) => b.far - a.far);
      const school = Array.from({ length: R.int(10, 24) }, () => ({ a: R.range(-1, 1), b: R.range(-0.6, 0.6), ph: R.range(0, TAU) }));
      let fx = n / 2, fy = n * 0.45, dir = 1;
      T(g, 'Look', 'Chunky'); T(g, 'Water', SEA_NAMES[SEAS.indexOf(S)]); T(g, 'Kelp', ['Olive', 'Brown', 'Green', 'Red'][['#8a8a2a', '#7a5a2a', '#3a8a3a', '#a83a3a'].map(hx).indexOf(KC[0])]);
      T(g, 'School', ['Silver', 'Yellowtail', 'Blue', 'Coral'][['#d8e0e8', '#f2c230', '#5ac8ff', '#ff8a6a'].map(hx).indexOf(FISH[0])]); T(g, 'Stalks', stalks.length);
      const vis = T(g, 'Visitor', alt(g, 'None', [['None', 4], ['Seal', 1], ['Turtle', 1]]));
      const scene = T(g, 'Scene', alt(g, 'Forest Floor', [['Forest Floor', 1.6], ['Clearing', 1], ['Canopy', 1], ['Rocky Slope', 1], ['Night', 1]]));
      if (scene === 'Clearing') for (const st of stalks) st.x = st.x < n / 2 ? st.x * 0.55 : n - (n - st.x) * 0.55;
      if (scene === 'Rocky Slope') { const dir = g.alt() < 0.5 ? 1 : -1; for (let x = 0; x < n; x++) { const u = dir > 0 ? x / n : 1 - x / n; bed[x] = Math.round(n - (3 + 18 * u * u + K.hash(x >> 1, 3) * 2) * s); } }
      const SN = scene === 'Night' ? S.map(c => mix(shade(c, 0.35), hx('#0a1030'), 0.3)) : S;
      if (scene === 'Night') for (let i = 0; i < 3; i++) KC[i] = shade(KC[i], 0.5);
      return (t) => {
        sea(g, SN, t, 0, 24);
        if (scene === 'Canopy') { const sy0 = Math.round(n * 0.16), sx = n * 0.5 + Math.sin(t * 0.05) * n * 0.1; for (let y = 0; y < sy0; y++) for (let x = 0; x < n; x++) d[y * n + x] = mix(S[0], WHITE, Math.sin(x * 0.6 + t * 1.2 + y) > 0.5 ? 0.6 : 0.35); K.ell(g, sx, n * 0.06, 3 * s, 3 * s, WHITE); }
        if (scene === 'Night') for (let q = 0; q < 16; q++) if (Math.sin(t * 1.7 + q * 2.3) > 0.5) put(g, K.hash(q, 11) * n, K.hash(q, 12) * n * 0.9, hx('#7ae8ff'));
        for (let x = 0; x < n; x++) for (let y = bed[x]; y < n; y++) d[y * n + x] = y === bed[x] ? hx('#6a6050') : K.hash(x >> 1, y >> 1, 4) < 0.25 ? hx('#4a4236') : hx('#3a342c');
        for (const st of stalks) {
          const base = bed[Math.min(n - 1, Math.max(0, st.x | 0))], c = st.far ? S[3] : KC[0];
          for (let j = 1; j < st.h; j++) {
            const f = j / st.h, x = st.x + Math.pow(f, 1.3) * 4 * s * Math.sin(t * 0.6 + st.ph - j * 0.05) + f * 2 * s * Math.sin(t * 0.2), y = base - j;
            if (y < 0) break;
            put(g, x, y, c); if (!st.far && s > 1.1) put(g, x + 1, y, KC[2]);
            if (!st.far && j % st.blade === 0) {
              const side = (j / st.blade) % 2 ? 1 : -1, sw = Math.sin(t * 0.9 + j * 0.2) * 0.5, bl = (3 + (j % 3)) * s;
              for (let q = 1; q <= bl; q++) put(g, x + side * q, y - q * (0.5 + sw * 0.3), q === 1 ? KC[0] : KC[1]);
              if (j % (st.blade * 2) === 0) put(g, x + side, y + 1, hx('#e0c050'));
            }
          }
        }
        // the school chases the pointer when there is one, else a slow figure of eight
        const tx = g.input.inside ? g.input.x * n : n / 2 + Math.sin(t * 0.09) * n * 0.4, ty = g.input.inside ? g.input.y * n : n * 0.45 + Math.sin(t * 0.18) * n * 0.15;
        const ox = fx; fx += (tx - fx) * 0.04; fy += (ty - fy) * 0.04; if (Math.abs(fx - ox) > 0.02) dir = fx > ox ? 1 : -1;
        for (const f of school) {
          const x = Math.round(fx + f.a * 9 * s + Math.sin(t * 2 + f.ph) * s), y = Math.round(fy + f.b * 6 * s + Math.cos(t * 1.7 + f.ph) * s);
          put(g, x, y, FISH[0]); put(g, x + dir, y, FISH[0]); put(g, x - dir, y, FISH[1]); put(g, x - 2 * dir, y + ((t * 6 + f.ph | 0) & 1 ? -1 : 1), FISH[1]);
        }
        if (vis !== 'None') visitor(g, vis, t, n * 0.25, 0.8, -1);
      };
  }

  // Tide Pool: the original, exactly, with input hooks that never draw from R
  function tideOG(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R), H = new Float32Array(n * n), rock = new Uint32Array(n * n), ph = new Float32Array(n * n);
      const f = 2.4 / n, rc = R.pick([[120, 100, 84], [100, 100, 104], [140, 110, 90]]);
      const RT = [0.45, 0.65, 0.85, 1.05, 1.2].map(k => rgb(rc[0] * k, rc[1] * k, rc[2] * k));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; H[i] = nz.fbm(x * f, y * f, 0.5, 4) + 0.25 * nz.n2(x * f * 4, y * f * 4) * 0.4; ph[i] = nz.n2(x * 0.08, y * 0.08) * 3; }
      for (let y = 1; y < n; y++) for (let x = 1; x < n; x++) { const i = y * n + x, sl = (H[i] - H[i - n - 1]) * 30 / s; rock[i] = RT[Math.max(0, Math.min(4, (2 + sl + dth(x, y) - 0.5) | 0))]; }
      for (let k = 0; k < n; k++) { rock[k] = rock[n + k] || RT[2]; rock[k * n] = rock[k * n + 1] || RT[2]; }   // the first row and column copy their neighbours (they were left empty)
      T(g, 'Look', 'Classic'); T(g, 'Rock', ['Sandstone', 'Granite', 'Red Rock'][[120, 100, 140].indexOf(rc[0])]);
      const tide = T(g, 'Tide', alt(g, 'Mid Tide', [['Mid Tide', 3], ['Low Tide', 1], ['High Tide', 1]]));
      const lvl0 = R.range(-0.02, 0.06) + { 'Mid Tide': 0, 'Low Tide': -0.07, 'High Tide': 0.08 }[tide], W = [rgb(150, 210, 200), rgb(80, 170, 170), rgb(40, 120, 140), rgb(20, 80, 110)], WB = W.map(c => mix(c, WHITE, 0.4));
      const SIN = new Float32Array(1024); for (let k = 0; k < 1024; k++) SIN[k] = Math.sin(k / 1024 * TAU);
      const sn = v => SIN[((v / TAU * 1024) | 0) & 1023];
      const spots = [];
      for (let k = 0; k < 400 && spots.length < 9; k++) { const x = R.int(6, n - 7), y = R.int(6, n - 7); if (H[y * n + x] < lvl0 - 0.08 && !spots.some(p => Math.hypot(p[0] - x, p[1] - y) < 12 * s)) spots.push([x, y]); }
      const life = spots.map((p, k) => ({ x: p[0], y: p[1], kind: k % 3, c: R.pick([rgb(80, 200, 120), rgb(230, 100, 140), rgb(240, 140, 60), rgb(150, 80, 200)]), ph: R() * TAU, a: R() * TAU }));
      { const mixK = T(g, 'Life', alt(g, 'Mixed', [['Mixed', 3], ['Anemone Garden', 1], ['Starfish', 1]])); if (mixK !== 'Mixed') for (const L of life) L.kind = mixK === 'Starfish' ? 1 : 0; T(g, 'Creatures', life.length); }
      const crabs = Array.from({ length: 2 }, () => ({ x: R() * n, y: R() * n, a: R() * TAU, wait: 0 }));
      const rings = [];
      let Rc = R;   // after the first click the crabs take their chances from g.alt, so R stays the original's
      return (t, dt) => {
        for (const tp of g.input.taps()) { if (rings.length < 12) rings.push({ x: tp.x * n, y: tp.y * n, r: 0 }); Rc = g.alt; for (const c of crabs) { c.a = Math.atan2(c.y - tp.y * n, c.x - tp.x * n); c.wait = 0; } }
        const lv = lvl0 + 0.05 * Math.sin(t * 0.25), ct = t * 0.9;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, h = H[i];
          if (h > lv) { d[i] = rock[i]; continue; }
          const dep = lv - h, k = dep < 0.015 ? 0 : dep < 0.06 ? 1 : dep < 0.14 ? 2 : 3;
          const c = sn(x * 0.28 / s + ph[i] + ct) + sn(y * 0.24 / s - ph[i] * 0.7 - ct * 0.8);
          d[i] = (c > -0.18 && c < 0.18 && k > 0 && dth(x, y) < 0.8) ? WB[k] : W[k];
        }
        for (let k = rings.length - 1; k >= 0; k--) { const r = rings[k]; r.r += 0.6 * s; if (r.r > 14 * s) { rings.splice(k, 1); continue; } for (let a = 0; a < TAU; a += 0.5 / Math.max(1, r.r)) { const x = Math.round(r.x + Math.cos(a) * r.r), y = Math.round(r.y + Math.sin(a) * r.r); if (x >= 0 && y >= 0 && x < n && y < n && H[y * n + x] < lv) d[y * n + x] = WHITE; } }
        for (const L of life) {
          if (H[L.y * n + L.x] > lv) continue;
          if (L.kind === 0) { const open = 0.55 + 0.45 * Math.sin(t * 0.7 + L.ph); for (let q = 0; q < 12; q++) { const a = q / 12 * TAU + Math.sin(t + q) * 0.1; line(g, L.x, L.y, L.x + Math.cos(a) * 5 * s * open, L.y + Math.sin(a) * 5 * s * open, q % 2 ? L.c : mix(L.c, WHITE, 0.4)); } disc(g, L.x, L.y, 1.5 * s, shade(L.c, 0.6)); }
          else if (L.kind === 1) { L.a += dt * 0.05; for (let q = 0; q < 5; q++) { const a = L.a + q / 5 * TAU; line(g, L.x, L.y, L.x + Math.cos(a) * 5 * s, L.y + Math.sin(a) * 5 * s, (x, y) => rect(g, x, y, Math.max(1, s), Math.max(1, s), L.c)); } disc(g, L.x, L.y, 1.6 * s, mix(L.c, WHITE, 0.25)); }
          else { const k = Math.floor(t * 0.5 + L.ph) % 3; for (let q = 0; q < 3; q++) rect(g, L.x + q * 2 * s, L.y + Math.sin(t * 0.3 + q) * s, s, s, q === k ? rgb(250, 240, 200) : rgb(40, 40, 50)); }
        }
        for (const c of crabs) {
          if (c.wait > 0) c.wait -= dt;
          else { c.x += Math.cos(c.a) * 6 * s * dt; c.y += Math.sin(c.a) * 6 * s * dt; if (Rc() < dt * 0.5) { c.wait = Rc.range(0.5, 2); c.a = Rc() * TAU; } }
          if (c.x < 2 || c.y < 2 || c.x > n - 3 || c.y > n - 3) { c.a += Math.PI; c.x = U.clamp(c.x, 3, n - 4); c.y = U.clamp(c.y, 3, n - 4); }
          const k = Math.max(1, Math.round(s));
          rect(g, c.x - k, c.y - k, 3 * k, 2 * k, rgb(200, 60, 40)); put(g, c.x - 2 * k, c.y - 2 * k, rgb(220, 80, 50)); put(g, c.x + 2 * k, c.y - 2 * k, rgb(220, 80, 50));
          if (Math.floor(t * 8) % 2 && c.wait <= 0) { put(g, c.x - 2 * k, c.y + k, rgb(160, 50, 30)); put(g, c.x + 2 * k, c.y + k, rgb(160, 50, 30)); }
        }
      };
  }
  // Tide Pool: the reworked look, an extra mode
  function tideNew(R, U, g) {
      const { n, d } = g, s = n / 50, nz = U.noise(R), H = new Float32Array(n * n), rock = new Uint32Array(n * n), ph = new Float32Array(n * n);
      const f = 2.4 / n, RT = K.tones(hx(R.pick(['#7a6a5a', '#6a6a72', '#8a6a52', '#5a5048']))), W = R.pick([['#a0e0d0', '#58b8b8', '#2a8aa0', '#145a7a'], ['#a0d8f0', '#5aa8d8', '#2a72b0', '#143e70'], ['#b8e8c0', '#6ac0a0', '#2a8a80', '#145a5a']]).map(hx), WB = W.map(c => mix(c, WHITE, 0.45));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; H[i] = nz.fbm(x * f, y * f, 0.5, 4); ph[i] = nz.n2(x * 0.08, y * 0.08) * 3; }
      for (let y = 1; y < n; y++) for (let x = 1; x < n; x++) { const i = y * n + x, sl = (H[i] - H[i - n - 1]) * 18 / s; rock[i] = RT[Math.max(0, Math.min(4, Math.round(2 + sl)))]; }
      for (let k = 0; k < n; k++) { rock[k] = rock[n + k] || RT[2]; rock[k * n] = rock[k * n + 1] || RT[2]; }
      T(g, 'Look', 'Chunky'); T(g, 'Rock', ['Sandstone', 'Granite', 'Ochre', 'Basalt'][['#7a6a5a', '#6a6a72', '#8a6a52', '#5a5048'].map(hx).indexOf(RT[2])]); T(g, 'Water', ['Aqua', 'Blue', 'Green'][['#a0e0d0', '#a0d8f0', '#b8e8c0'].map(hx).indexOf(W[0])]);
      const tide = T(g, 'Tide', alt(g, 'Mid Tide', [['Mid Tide', 3], ['Low Tide', 1], ['High Tide', 1]]));
      const lvl0 = R.range(-0.02, 0.06) + { 'Mid Tide': 0, 'Low Tide': -0.07, 'High Tide': 0.08 }[tide], spots = [];
      for (let k = 0; k < 600 && spots.length < 10; k++) { const x = R.int(4, n - 5), y = R.int(4, n - 5); if (H[y * n + x] < lvl0 - 0.06 && !spots.some(p => Math.hypot(p[0] - x, p[1] - y) < 8 * s)) spots.push([x, y]); }
      const life = spots.map((p, k) => ({ x: p[0], y: p[1], kind: k % 3, c: hx(R.pick(['#5ad07a', '#e8649a', '#f08a3a', '#9a5ad0', '#e8d040'])), ph: R() * TAU, a: R() * TAU }));
      { const mixK = T(g, 'Life', alt(g, 'Mixed', [['Mixed', 3], ['Anemone Garden', 1], ['Starfish', 1]])); if (mixK !== 'Mixed') for (const L of life) L.kind = mixK === 'Starfish' ? 1 : 0; T(g, 'Creatures', life.length); }
      const crabs = Array.from({ length: R.int(1, 3) }, () => ({ x: R() * n, y: R() * n, a: R() * TAU, wait: 0 })), rings = [];
      return (t, dt) => {
        for (const tp of g.input.taps()) { if (rings.length < 12) rings.push({ x: tp.x * n, y: tp.y * n, r: 0 }); for (const c of crabs) { c.a = Math.atan2(c.y - tp.y * n, c.x - tp.x * n); c.wait = 0; } }
        const lv = lvl0 + 0.05 * Math.sin(t * 0.25), ct = t * 0.9;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, h = H[i];
          if (h > lv) { d[i] = rock[i]; continue; }
          const dep = lv - h, k = dep < 0.015 ? 0 : dep < 0.06 ? 1 : dep < 0.14 ? 2 : 3;
          const c = Math.sin(x * 0.5 / s + ph[i] + ct) + Math.sin(y * 0.45 / s - ph[i] * 0.7 - ct * 0.8);
          d[i] = (c > -0.2 && c < 0.2 && k > 0) ? WB[k] : W[k];
        }
        for (let k = rings.length - 1; k >= 0; k--) { const r = rings[k]; r.r += 0.5 * s; if (r.r > 12 * s) { rings.splice(k, 1); continue; } for (let a = 0; a < TAU; a += 0.5 / Math.max(1, r.r)) { const x = Math.round(r.x + Math.cos(a) * r.r), y = Math.round(r.y + Math.sin(a) * r.r); if (x >= 0 && y >= 0 && x < n && y < n && H[y * n + x] < lv) d[y * n + x] = WHITE; } }
        for (const L of life) {
          if (H[L.y * n + L.x] > lv) continue;
          if (L.kind === 0) { const open = 0.55 + 0.45 * Math.sin(t * 0.7 + L.ph); for (let q = 0; q < 10; q++) { const a = q / 10 * TAU + Math.sin(t + q) * 0.1; line(g, L.x, L.y, L.x + Math.cos(a) * 3.5 * s * open, L.y + Math.sin(a) * 3.5 * s * open, q % 2 ? L.c : mix(L.c, WHITE, 0.4)); } K.ell(g, L.x + 0.5, L.y + 0.5, 1.2 * s, 1.2 * s, shade(L.c, 0.6)); }
          else if (L.kind === 1) { L.a += dt * 0.05; for (let q = 0; q < 5; q++) { const a = L.a + q / 5 * TAU; line(g, L.x, L.y, L.x + Math.cos(a) * 3.5 * s, L.y + Math.sin(a) * 3.5 * s, L.c); } K.ell(g, L.x + 0.5, L.y + 0.5, 1.2 * s, 1.2 * s, mix(L.c, WHITE, 0.25)); }
          else { const k = Math.floor(t * 0.5 + L.ph) % 3; for (let q = 0; q < 3; q++) rect(g, L.x + q * 2, L.y + Math.sin(t * 0.3 + q), 1, 1, q === k ? hx('#faf0c8') : hx('#282832')); }
        }
        for (const c of crabs) {
          if (c.wait > 0) c.wait -= dt;
          else { c.x += Math.cos(c.a) * 5 * s * dt; c.y += Math.sin(c.a) * 5 * s * dt; if (R() < dt * 0.5) { c.wait = R.range(0.5, 2); c.a = R() * TAU; } }
          if (c.x < 2 || c.y < 2 || c.x > n - 3 || c.y > n - 3) { c.a += Math.PI; c.x = U.clamp(c.x, 3, n - 4); c.y = U.clamp(c.y, 3, n - 4); }
          const k = Math.max(1, Math.round(s));
          rect(g, c.x - k, c.y - k, 3 * k, 2 * k, hx('#c83c28')); put(g, c.x - 2 * k, c.y - 2 * k, hx('#dc5032')); put(g, c.x + 2 * k, c.y - 2 * k, hx('#dc5032'));
          if (Math.floor(t * 8) % 2 && c.wait <= 0) { put(g, c.x - 2 * k, c.y + k, hx('#a0321e')); put(g, c.x + 2 * k, c.y + k, hx('#a0321e')); }
        }
      };
  }

  add({
    name: 'Kelp Forest', seed: 0, sizes: [100, 200], fps: 12,
    interactive: 'Move the pointer and the school of fish follows it.',
    recipe: 'Tall kelp sways from a rocky bed toward a bright surface, its blades and floats rocking in the swell, while light shafts move through the water and a school of silver fish wheels past. Move the pointer and the school follows you; some variations are drawn in chunkier cells with other water and kelp colours.',
    make(R, U, g) {
      if (ogLook(g)) return kelpOG(R, U, g);
      return K.chunky(g, 40, g2 => { g2.trait = g.trait; return kelpNew(R, U, g2); });
    },
  });

  add({
    name: 'Whale', seed: 1, sizes: [40, 50], fps: 12,
    recipe: 'A whale glides across the frame through banded blue water: a humpback with long white flippers, a blue whale, an orca, a sperm whale, a beluga or a narwhal, sometimes with its calf, each drawn big in flat tones with one dark outline. Its tail beats as it goes and bubbles rise.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SEAS), Lr = K.layer(n), ink = hx('#050a14');
      const KIND = R.pick(['humpback', 'humpback', 'blue', 'orca', 'sperm', 'beluga', 'narwhal']);
      const SP = {
        humpback: { back: '#2a3440', belly: '#d8dce0', len: 0.82, th: 0.24, fin: 0.34, finC: '#e8ecef', grooves: true, knobs: true },
        blue: { back: '#4a6a8a', belly: '#8aa8c0', len: 0.92, th: 0.16, fin: 0.12, finC: '#4a6a8a', mottle: true },
        orca: { back: '#101418', belly: '#f2f4f6', len: 0.7, th: 0.24, fin: 0.14, finC: '#101418', orca: true },
        sperm: { back: '#4a4448', belly: '#6a6266', len: 0.86, th: 0.26, fin: 0.1, finC: '#4a4448', box: true },
        beluga: { back: '#e8eef2', belly: '#ffffff', len: 0.62, th: 0.26, fin: 0.12, finC: '#d8e0e6' },
        narwhal: { back: '#6a6a74', belly: '#c8c8cc', len: 0.62, th: 0.22, fin: 0.1, finC: '#6a6a74', tusk: true, mottle: true },
      }[KIND];
      const back = hx(SP.back), belly = hx(SP.belly), finC = hx(SP.finC), L = SP.len * n, calf = R.bool(0.35), dir = R.sign(), speed = R.range(0.6, 1.1);
      // a whale's side profile, tail (u = 0) to nose (u = 1): a slim tail stock swelling to the
      // deepest point just behind the head, then a blunt, rounded snout (never a fish's point)
      const cap = KIND === 'beluga' || KIND === 'narwhal' ? 0.84 : KIND === 'orca' ? 0.87 : 0.9;
      const thick = u => {
        if (SP.box && u > 0.55) return SP.th * n * (u > 0.97 ? 0.82 : 0.95);
        const a = u < 0.6 ? 0.13 + 0.87 * Math.pow(Math.sin(Math.PI / 2 * u / 0.6), 1.25) : u < cap ? 1 - 0.12 * (u - 0.6) / (cap - 0.6) : 0.88 * Math.sqrt(Math.max(0, 1 - ((u - cap) / (1 - cap)) ** 2));
        return SP.th * n * a;
      };
      function whale(cx, cy, sc, t, ph) {
        const len = L * sc;
        for (let k = 0; k <= len; k++) {
          const u = k / len, x = Math.round(cx + (u - 0.5) * len * dir), wave = Math.sin(u * 3.2 - t * 2.2 + ph) * 2.2 * s * sc * Math.pow(1 - u, 2), th = thick(u) * sc;
          const top = Math.round(cy - th * 0.55 + wave), bot = Math.round(cy + th * 0.45 + wave);
          for (let y = top; y <= bot; y++) {
            if (x < 0 || x >= n || y < 0 || y >= n) continue;
            const v = (y - top) / Math.max(1, bot - top);
            let c = v < 0.58 ? back : belly;
            if (y === top) c = mix(back, WHITE, 0.25);
            if (SP.orca) c = (v > 0.62 || (u > 0.72 && u < 0.84 && v > 0.22 && v < 0.42)) ? belly : back;
            if (SP.grooves && u > 0.62 && v > 0.62 && (y & 1)) c = shade(belly, 0.75);
            if (SP.mottle && K.hash(x >> 1, y, 7) < 0.12 && v < 0.6) c = mix(c, WHITE, 0.25);
            if (SP.knobs && u > 0.86 && v < 0.3 && K.hash(x, y, 2) < 0.3) c = shade(back, 0.6);
            Lr.d[y * n + x] = c;
          }
          // flukes at the tail: seen edge-on they are a flat, lens-shaped paddle that tilts up and down as it beats
          if (k === 0) {
            const fl = 7 * s * sc, fy = cy + wave + th * -0.05, tilt = Math.cos(-t * 2.2 + ph) * 0.55;
            for (let q = 1; q < fl; q++) {
              const f = q / fl, h = Math.max(0.6, 1.7 * s * sc * Math.sin(Math.PI * Math.pow(f, 0.6))), yc = fy + tilt * q, xx = x - q * dir;
              for (let yy = Math.round(yc - h); yy <= Math.round(yc + h * 0.6); yy++) if (xx >= 0 && xx < n && yy >= 0 && yy < n) Lr.d[yy * n + xx] = yy < yc - h * 0.3 ? mix(back, WHITE, 0.18) : back;
            }
          }
        }
        // pectoral fin, rowing slowly
        const fu = 0.72, fx = cx + (fu - 0.5) * len * dir, fy = cy + thick(fu) * sc * 0.3, fa = 0.9 + Math.sin(t * 0.9 + ph) * 0.35, fl = SP.fin * n * sc;
        for (let q = 0; q < fl; q++) { const w = Math.max(1, Math.round((1 - 0.7 * q / fl) * 2.4 * s * sc)); rect(Lr, fx - Math.cos(fa) * q * dir - w / 2, fy + Math.sin(fa) * q * 0.7, w, w, q < 1.5 * s ? shade(finC, 0.85) : finC); }
        if (SP.orca || KIND === 'humpback' || KIND === 'blue') { const dx = cx + (0.35 - 0.5) * len * dir, dy = cy - thick(0.35) * sc * 0.55, hgt = (SP.orca ? 7 : 2) * s * sc; for (let q = 0; q < hgt; q++) rect(Lr, dx - q * 0.35 * dir, dy - q, Math.max(1, Math.round((SP.orca ? 3 : 2) * s * sc * (1 - q / (hgt + 1)))), 1, back); }
        if (SP.tusk) line(Lr, cx + 0.5 * len * dir, cy, cx + (0.5 * len + 12 * s * sc) * dir, cy - 2 * s * sc, hx('#f2ece0'));
        K.commit(g, Lr, ink);
        // the mouth line runs back from the snout and the small eye sits just above its corner
        const mu0 = SP.box ? 0.93 : 0.985, mu1 = SP.box ? 0.7 : KIND === 'humpback' || KIND === 'blue' ? 0.74 : 0.84;
        for (let k = Math.round(mu1 * len); k <= mu0 * len; k++) {
          const u = k / len, x = Math.round(cx + (u - 0.5) * len * dir), th = thick(u) * sc, y = Math.round(cy + th * (SP.box ? 0.3 : 0.1 + 0.18 * (u - mu1) / (mu0 - mu1)));
          if (x >= 0 && x < n && y >= 0 && y < n) put(g, x, y, shade(belly, 0.55));
        }
        const eu = mu1 - 0.03, ex = Math.round(cx + (eu - 0.5) * len * dir), ey = Math.round(cy + thick(eu) * sc * (SP.box ? -0.1 : -0.04));
        put(g, ex, ey, ink); if (SP.orca) { put(g, ex - dir, ey - 1, belly); put(g, ex, ey - 1, belly); }
      }
      const bubbles = [];
      T(g, 'Species', { humpback: 'Humpback', blue: 'Blue Whale', orca: 'Orca', sperm: 'Sperm Whale', beluga: 'Beluga', narwhal: 'Narwhal' }[KIND]); T(g, 'Water', SEA_NAMES[SEAS.indexOf(S)]); T(g, 'Calf', calf ? 'Yes' : 'No'); T(g, 'Heading', dir > 0 ? 'East' : 'West');
      // new traits: how deep we are (under the surface, open water, or the dark deep) and who swims along
      const depth = T(g, 'Depth', alt(g, 'Open Water', [['Open Water', 3], ['Under the Surface', 1.2], ['Deep', 1]])), comp = T(g, 'Company', alt(g, 'Alone', [['Alone', 3], ['Shoal', 1], ['Remoras', 0.8]]));
      const skyH = Math.round(n * 0.16), shoal = comp === 'Shoal' ? Array.from({ length: 22 }, (_, k) => ({ a: K.hash(k, 1, 7) * TAU, r: 0.5 + K.hash(k, 2, 7), y: K.hash(k, 3, 7) - 0.5 })) : [];
      return (t) => {
        sea(g, S, t, 0, 30);
        if (depth === 'Deep') { for (let i = 0; i < n * n; i++) d[i] = mix(d[i], hx('#020814'), 0.55); for (let q = 0; q < 30; q++) put(g, K.hash(q, 5) * n, (K.hash(q, 6) * n + t * 0.7) % n, hx('#4a6a8a')); }
        if (depth === 'Under the Surface') {
          // the underside of the surface: sky above a bright, rippling waterline
          for (let y = 0; y < skyH; y++) for (let x = 0; x < n; x++) d[y * n + x] = mix(S[0], WHITE, y < skyH * 0.5 ? 0.75 : 0.55);
          for (let x = 0; x < n; x++) { const y = skyH + Math.round(Math.sin(x * 0.5 + t * 1.5) * 0.8); put(g, x, y, WHITE); put(g, x, y + 1, mix(S[0], WHITE, 0.5)); if ((x + (t * 2 | 0)) % 7 < 2) put(g, x, y + 3, mix(S[1], WHITE, 0.35)); }
        }
        const cx = n / 2 + Math.sin(t * 0.07 * speed) * n * 0.06, cy = n * 0.5 + Math.sin(t * 0.3) * 2 * s + (depth === 'Under the Surface' ? 3 * s : 0);
        for (const f of shoal) { const a = f.a + t * 0.25, x = cx + dir * L * 0.55 + Math.cos(a) * 6 * s * f.r, y = cy - L * 0.1 + f.y * 10 * s + Math.sin(a) * 2 * s, fd = Math.sin(a) > 0 ? -1 : 1; put(g, x, y, hx('#d8e0e8')); put(g, x + fd, y, hx('#d8e0e8')); put(g, x - fd, y, hx('#8a9aa8')); }
        if (calf) whale(cx - dir * L * 0.15, cy + thick(0.5) * 0.95, 0.45, t * 1.3, 1);
        whale(cx, cy, 1, t, 0);
        if (comp === 'Remoras') for (let k = 0; k < 3; k++) { const u = 0.45 + k * 0.08, x = Math.round(cx + (u - 0.5) * L * dir), y = Math.round(cy + thick(u) * 0.45 + 1 + Math.sin(t + k) * 0.4); rect(g, x - 1, y, 3, 1, hx('#8a8a7a')); put(g, x - dir * 2, y, hx('#5a5a50')); }
        if (R() < 0.15) bubbles.push({ x: cx + 0.4 * L * dir, y: cy - thick(0.8) * 0.5 });
        for (let k = bubbles.length - 1; k >= 0; k--) { const b = bubbles[k]; b.y -= 0.5 * s; b.x += Math.sin(t * 4 + k) * 0.2; if (b.y < 0) { bubbles.splice(k, 1); continue; } put(g, b.x, b.y, mix(S[0], WHITE, 0.5)); }
      };
    },
  });

  add({
    name: 'Anglerfish', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Move the pointer to swing the lure; small fish chase it and the jaws snap.',
    recipe: 'In the black of the deep an anglerfish hangs almost invisible, a big crisp shape with needle teeth, lit only by the lure on its rod. Little fish drift in toward the light and the jaws snap shut. Move the pointer to swing the lure yourself.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#010103');
      const body = K.tones(hx(R.pick(['#5a4034', '#3e3e4c', '#4e3058', '#5a2626', '#2a4040']))), lureC = hx(R.pick(['#5af0ff', '#7aff6a', '#ff6aa8', '#fff06a', '#ff8a2a'])), deep = hx(R.pick(['#02040a', '#04020a', '#020806']));
      // new trait: how close we are (the usual view, a close-up of the jaws, or a small fish far off in the dark)
      const view = T(g, 'View', alt(g, 'Portrait', [['Portrait', 3], ['Close-up', 1], ['Far Off', 1]])), RS = { Portrait: 1, 'Close-up': 1.38, 'Far Off': 0.62 }[view];
      const cx0 = n * R.range(0.4, 0.5), cy = n * R.range(0.55, 0.62) + (view === 'Far Off' ? n * 0.06 : 0), r = n * R.range(0.24, 0.3) * RS, flip = R.bool() ? -1 : 1, teeth = R.int(4, 7);
      const cx = view === 'Close-up' ? cx0 - flip * n * 0.1 : cx0;
      const prey = Array.from({ length: R.int(2, 5) }, () => ({ x: R.range(0, n), y: R.range(0, n), c: hx(R.pick(['#c8d8e8', '#f2c230', '#ff8a6a', '#8affc8'])), alive: true }));
      const extras = R.pick(['none', 'jelly', 'jelly', 'none']);
      let snap = 0, lx = cx + r * 1.2 * flip, ly = cy - r * 1.3;
      const gullet = mix(deep, hx('#5a0a1a'), 0.6);
      T(g, 'Body', ['Rust', 'Slate', 'Plum', 'Blood', 'Teal'][['#5a4034', '#3e3e4c', '#4e3058', '#5a2626', '#2a4040'].map(hx).indexOf(body[2])]); T(g, 'Lure', ['Cyan', 'Green', 'Pink', 'Yellow', 'Orange'][['#5af0ff', '#7aff6a', '#ff6aa8', '#fff06a', '#ff8a2a'].map(hx).indexOf(lureC)]); T(g, 'Prey', prey.length); T(g, 'Jellyfish', extras === 'jelly' ? 'Yes' : 'No');
      // new trait: where in the deep it hunts
      const hab = T(g, 'Habitat', alt(g, 'Open Abyss', [['Open Abyss', 3], ['Black Smoker', 1], ['Sea Floor', 1]])), hx0 = flip > 0 ? n * 0.84 : n * 0.16;
      return (t) => {
        for (let i = 0; i < n * n; i++) d[i] = deep;
        for (let q = 0; q < 25; q++) put(g, (K.hash(q, 1) * n + Math.sin(t * 0.3 + q)) % n, (K.hash(q, 2) * n + t * 0.8) % n, hx('#2a2a34'));
        if (hab === 'Black Smoker') {
          // a hydrothermal chimney: dark rock, a hot orange throat and black smoke boiling up
          for (let y = Math.round(n * 0.66); y < n; y++) { const w = Math.round((1.4 + (y - n * 0.66) / (n * 0.34) * 3.2) * s); rect(g, hx0 - w, y, 2 * w, 1, K.hash(y >> 1, 4) < 0.3 ? hx('#2a2420') : hx('#1a1614')); }
          rect(g, hx0 - s, n * 0.66 - 1, 2 * s, 1, hx('#ff6a1a')); K.glow(g, hx0, n * 0.66, 4 * s, hx('#ff6a1a'), 2, 0.25);
          for (let k = 0; k < 14; k++) { const a = (t * 0.6 + k / 14) % 1, y = n * 0.66 - a * n * 0.5, x = hx0 + Math.sin(a * 6 + k) * a * 4 * s; K.ell(g, x, y, (0.8 + a * 1.6) * s, (0.8 + a * 1.4) * s, mix(hx('#1a1614'), deep, a)); }
        } else if (hab === 'Sea Floor') {
          for (let x = 0; x < n; x++) { const y0 = Math.round(n * 0.9 + Math.sin(x * 0.3) * s); for (let y = y0; y < n; y++) d[y * n + x] = y === y0 ? hx('#1e1a24') : hx('#100e14'); }
          for (let k = 0; k < 4; k++) { const x = (k + 0.5) / 4 * n, h = (3 + k % 2 * 2) * s, on = 0.5 + 0.5 * Math.sin(t * 1.3 + k * 2); for (let q = 0; q < h; q++) put(g, x + Math.sin(t + q * 0.5) * 0.4, n * 0.9 - q, mix(hx('#100e14'), hx('#ff6aa8'), on * (0.4 + 0.6 * q / h))); }
        }
        // the lure follows the pointer within reach of the rod, else it bobs
        const tx = g.input.inside ? g.input.x * n : cx + r * 1.25 * flip + Math.sin(t * 0.7) * 3 * s, ty = g.input.inside ? g.input.y * n : cy - r * 1.3 + Math.cos(t * 0.5) * 2 * s;
        lx += (tx - lx) * 0.15; ly += (ty - ly) * 0.15;
        const rx0 = cx + r * 0.3 * flip, ry0 = cy - r * 0.85, reach = r * 2.2, dd = Math.hypot(lx - rx0, ly - ry0);
        if (dd > reach) { lx = rx0 + (lx - rx0) / dd * reach; ly = ry0 + (ly - ry0) / dd * reach; }
        K.glow(g, lx, ly, n * 0.4, lureC, 6, 0.34);
        // body: a dark lump lit from the lure side in hard steps, the mouth cut out
        const Lv = [(lx - cx) / n * 2, (ly - cy) / n * 2, 0.45];
        K.ell(Lr, cx, cy, r, r * 0.85, (x, y, nx, ny) => {
          // the open mouth is a dark red gullet (not a hole to the water behind)
          if (flip * nx > 0.15 && Math.abs(ny - 0.15) < 0.12 + (snap > 0 ? 0 : 0.18) * (flip * nx)) return flip * nx > 0.8 ? 0 : gullet;
          return K.cel(nx, ny, Lv, [body[0], body[1], body[2], body[3]]);
        });
        for (let q = 0; q < r * 0.6; q++) rect(Lr, cx - flip * (r + q), cy - q * 0.8, 1, q * 1.6 + 1, body[1]);
        K.ell(Lr, cx - flip * r * 0.2, cy + r * 0.65, r * 0.3, r * 0.18, body[1]);
        K.commit(g, Lr, ink);
        // teeth, top and bottom
        const my = cy + r * 0.13, open = snap > 0 ? 0.15 : 1;
        for (let k = 0; k < teeth; k++) {
          const u = (k + 0.5) / teeth, x = Math.round(cx + flip * r * (0.18 + 0.78 * u));
          // needle teeth, long and short in turn, each fading to a darker tip
          const L = ((k & 1 ? 1.2 : 2.2) * s * open) + 1;
          for (let q = 0; q < L; q++) { const c = q + 1 >= L ? hx('#b8b0a0') : hx('#f2f0e8'); put(g, x, my - r * 0.12 * open + q, c); if (k < teeth - 1 || open > 0.5) put(g, x + flip, my + r * 0.3 * open - q, c); }
        }
        K.ell(g, cx + flip * r * 0.45, cy - r * 0.32, 1.6 * s, 1.6 * s, hx('#e8e0c0')); put(g, cx + flip * r * 0.45 + flip * 0.5, cy - r * 0.32, ink);
        // the rod and its lure
        const kx = (rx0 + lx) / 2 + flip * 3 * s, ky = Math.min(ry0, ly) - 3 * s;
        line(g, rx0, ry0, kx, ky, body[2]); line(g, kx, ky, lx, ly, body[2]);
        K.ell(g, lx, ly, 1.6 * s, 1.6 * s, (x, y, nx, ny) => nx * nx + ny * ny < 0.3 ? WHITE : lureC);
        // prey drift toward the light; near the mouth they are eaten
        snap = Math.max(0, snap - 1);
        const mx = cx + flip * r * 0.55;
        for (const p of prey) {
          if (!p.alive) { if (R() < 0.01) { p.alive = true; p.x = flip > 0 ? n + 2 : -2; p.y = R.range(0.1, 0.9) * n; } continue; }
          p.x += (lx - p.x) * 0.012 + Math.sin(t + p.y) * 0.1; p.y += (ly - p.y) * 0.012;
          if (Math.hypot(p.x - mx, p.y - my) < r * 0.35) { p.alive = false; snap = 6; }
          const fd = lx > p.x ? 1 : -1;
          put(g, p.x, p.y, p.c); put(g, p.x + fd, p.y, p.c); put(g, p.x - fd, p.y, shade(p.c, 0.6));
        }
        if (extras === 'jelly') {
          const jx = flip > 0 ? n * 0.16 : n * 0.84, jy = n * 0.2 + Math.sin(t * 0.4) * 3 * s, jc = mix(deep, hx('#ff6af0'), 0.7);
          K.ell(g, jx, jy, 3 * s, 2 * s, (x, y, nx, ny) => ny > 0.2 ? 0 : ny < -0.4 ? mix(jc, WHITE, 0.3) : jc);
          // four trailing tentacles, each a wavy line that fades as it trails
          for (let k = -1.5; k <= 1.5; k++) for (let q = 0; q < 7 * s; q++) put(g, jx + k * 1.6 * s + Math.sin(t * 2 + q * 0.35 + k) * (0.4 + q * 0.12), jy + 1 + q, mix(deep, hx('#ff6af0'), 0.6 - 0.45 * q / (7 * s)));
        }
      };
    },
  });

  add({
    name: 'Bioluminescence', seed: 2, sizes: [100, 200], fps: 12,
    recipe: 'A night beach seen from above. Every wave that breaks lights up blue along its edge, a kayak paddles across leaving glowing strokes and a shining wake, and fish streak sparks under the surface.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, G = new Float32Array(n * n), side = R.bool();
      const shore = Array.from({ length: n }, (_, y) => n * 0.28 + 4 * s * Math.sin(y * 0.05 / s) + 2 * s * Math.sin(y * 0.13 / s + 1));
      const glowC = rgb(...R.pick([[60, 220, 255], [80, 255, 200], [120, 160, 255]]));
      const WL = Array.from({ length: 8 }, (_, k) => mix(rgb(4, 10, 26), glowC, Math.pow(k / 7, 1.2)));
      const SL = Array.from({ length: 8 }, (_, k) => mix(rgb(30, 30, 36), glowC, Math.pow(k / 7, 1.2) * 0.8));
      const waves = Array.from({ length: 4 }, (_, k) => ({ ph: k / 4, wig: R() * TAU }));
      const P = n * 0.7, kay = { y: R.range(0.3, 0.7) * n, dir: R.sign(), x0: R() };
      const stars = Array.from({ length: 30 }, () => [R() * n, R() * n]);
      const fish = [];
      return (t, dt) => {
        for (const w of waves) {
          const D = ((w.ph - t * 0.035) % 1 + 1) % 1 * P;
          if (D > 20 * s) continue;
          const k = (1 - D / (20 * s)) * 0.5;
          for (let y = 0; y < n; y++) {
            const x = Math.round(shore[y] + D + 2 * s * Math.sin(y * 0.09 / s + w.wig + t * 0.3));
            for (let q = 0; q < 2 * s; q++) if (x + q >= 0 && x + q < n) G[y * n + x + q] += k * (0.6 + 0.4 * Math.sin(y * 0.3 + t * 5));
          }
        }
        // the kayak, its paddle strokes and wake
        const kx = (((kay.x0 + t * 0.02 * kay.dir) % 1) + 1) % 1 * n * 0.65 + n * 0.32, ky = kay.y + Math.sin(t * 0.15) * 10 * s;
        const stroke = Math.floor(t * 1.6), sideK = stroke % 2 ? 1 : -1, tt = t * 1.6 - stroke;
        if (tt < 0.25) for (let a = 0; a < 10; a++) { const px = kx - kay.dir * 2 * s + Math.cos(a) * 2 * s, py = ky + sideK * 5 * s + Math.sin(a) * 2 * s; if (px >= 0 && py >= 0 && px < n && py < n) G[(py | 0) * n + (px | 0)] += 0.5; }
        for (let k = 0; k < 4; k++) { const px = kx - kay.dir * (7 + k) * s, py = ky + (k % 2 ? 1 : -1) * s; if (px >= 0 && px < n) G[(py | 0) * n + (px | 0)] += 0.25; }
        if (R() < dt * 0.6) fish.push({ x: R.range(0.4, 0.95) * n, y: R() * n, a: R() * TAU, life: 1 });
        for (let k = fish.length - 1; k >= 0; k--) { const f = fish[k]; f.x += Math.cos(f.a) * 30 * s * dt; f.y += Math.sin(f.a) * 30 * s * dt; f.life -= dt * 1.5; if (f.life < 0 || f.x < 0 || f.y < 0 || f.x >= n || f.y >= n) { fish.splice(k, 1); continue; } G[(f.y | 0) * n + (f.x | 0)] += 0.6; }
        for (let y = 0; y < n; y++) {
          const sx = shore[y];
          for (let x = 0; x < n; x++) {
            const i = y * n + x, v = G[i], k = v < 0.01 ? 0 : Math.min(7, (v * 9 + dth(x, y)) | 0);
            G[i] = v * 0.9;
            const px = side ? n - 1 - x : x;
            d[y * n + px] = x < sx ? SL[k] : WL[k];
          }
        }
        for (const [a, b] of stars) { const px = side ? n - 1 - a : a; if (a > shore[b | 0] + 4 && (Math.floor(t + a) % 5)) put(g, px, b, rgb(70, 80, 110)); }
        const kxp = side ? n - 1 - kx : kx, dir = side ? -kay.dir : kay.dir;
        rect(g, kxp - 6 * s, ky - s, 12 * s, 2 * s, rgb(30, 22, 18)); rect(g, kxp - s, ky - s, 2 * s, 2 * s, rgb(70, 60, 50));
        line(g, kxp - dir * 2 * s, ky - 5 * s * sideK * -1, kxp + dir * 2 * s, ky + 5 * s * sideK, rgb(50, 40, 34));
      };
    },
  });

  add({
    name: 'Tide Pool', seed: 0, sizes: [100, 200], fps: 12,
    interactive: 'Click the water to make ripples; the crabs scuttle away.',
    recipe: 'A rock pool from above as the tide breathes in and out. Anemones open and close, a starfish creeps, crabs scuttle along the waterline and the sun throws a net of caustic light across the sandy floor. Click the water to make ripples and the crabs run; some variations are drawn in chunkier cells with other rock and water colours.',
    make(R, U, g) {
      if (ogLook(g)) return tideOG(R, U, g);
      return K.chunky(g, 50, g2 => { g2.trait = g.trait; return tideNew(R, U, g2); });
    },
  });

  add({
    name: 'Shipwreck', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Click to scatter the fish.',
    listens: 'Clap and the fish scatter.',
    recipe: 'A wreck lies tilted in the sand: a wooden galleon, a rusting steamer, a yellow submarine or a sunken rowboat with its anchor, drawn big and plank by plank. Weed grows from the deck, a chest glints in the sand, a school of fish circles it and air still trickles from the hold. Click to scatter the fish.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SEAS), Lr = K.layer(n), ink = hx('#050a10'), kind = R.pick(['galleon', 'galleon', 'steamer', 'sub', 'rowboat']), flip = R.sign();
      const sandC = K.tones(hx(R.pick(['#d8c08a', '#c0a878', '#e0d0a8', '#a89878']))), floor = Math.round(n * 0.78), ang = R.range(0.1, 0.25) * R.sign();
      const HULL = { galleon: ['#6a4428', '#8a5a34', '#4a2e1a'], steamer: ['#7a3020', '#9a4a2a', '#2a2a30'], sub: ['#d8b030', '#f0d050', '#8a7020'], rowboat: ['#7a5030', '#9a6a40', '#5a3a22'] }[kind].map(hx);
      const cx = n * 0.5, cy = floor - (kind === 'rowboat' ? 3 : 5) * s, hw = (kind === 'rowboat' ? 0.25 : 0.42) * n, hh = (kind === 'rowboat' ? 0.1 : 0.2) * n;
      const rot = (x, y) => { const c = Math.cos(ang), sn = Math.sin(ang); return [cx + flip * ((x - cx) * c - (y - cy) * sn), cy + (x - cx) * sn + (y - cy) * c]; };
      const school = Array.from({ length: R.int(8, 18) }, () => ({ a: R.range(0, TAU), r: R.range(0.15, 0.32) * n, y: R.range(0.15, 0.55) * n, sp: R.range(0.15, 0.3) * R.sign(), c: hx(R.pick(['#f2c230', '#5ac8ff', '#ff8a6a', '#e8eef2'])) }));
      const weeds = Array.from({ length: R.int(3, 7) }, () => ({ u: R.range(-0.8, 0.8), h: R.range(3, 9) * s, ph: R.range(0, TAU) }));
      let scatter = 0;
      const bubbles = [];
      T(g, 'Wreck', { galleon: 'Galleon', steamer: 'Steamer', sub: 'Submarine', rowboat: 'Rowboat' }[kind]); T(g, 'Water', SEA_NAMES[SEAS.indexOf(S)]); T(g, 'Fish', school.length);
      // new traits: what lies in the sand, and who comes by
      const loot = T(g, 'Treasure', alt(g, 'Chest', [['Chest', 3], ['Amphorae', 1], ['Cannon', 1], ['Anchor', 0.8]])), who = T(g, 'Visitor', alt(g, 'None', [['None', 3], ['Shark', 1], ['Diver', 1]]));
      return (t) => {
        if (g.input.taps().length) scatter = 1;
        // Listen: a clap scatters the school too, and a loud room keeps them jumpy
        if (g.input.listening) { if (g.input.beats()) scatter = 1; scatter = Math.max(scatter, g.input.level * 0.5); }
        scatter *= 0.97;
        sea(g, S, t, 0, 30);
        for (let y = floor; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((y - floor) % 3 === 0 && ((x + y) % 7) < 4) ? sandC[1] : y === floor ? sandC[3] : sandC[2];
        // the hull: a curved bottom under a flat deck, planked
        // the hull, drawn by walking the screen cells and turning each back into hull space,
        // so the tilted hull has no holes (no stray single cells inside it)
        { const c0 = Math.cos(ang), s0 = Math.sin(ang), ext = hw + hh + 2, yTop = Math.round(-hh), yBot = Math.floor(hh * 0.2);
          for (let Y0 = Math.max(0, Math.floor(cy - ext)); Y0 <= Math.min(n - 1, Math.ceil(cy + ext)); Y0++) for (let X0 = Math.max(0, Math.floor(cx - ext)); X0 <= Math.min(n - 1, Math.ceil(cx + ext)); X0++) {
            const a = (X0 + 0.5 - cx) * flip, b = Y0 + 0.5 - cy, xx = a * c0 + b * s0, yy = Math.round(-a * s0 + b * c0);
            if (xx < -hw || xx > hw || yy < yTop || yy > yBot) continue;
            const u = xx / hw, v = (yy + hh) / (hh * 1.2);
            const bottom = kind === 'sub' ? Math.sqrt(Math.max(0, 1 - u * u)) : 1 - 0.55 * Math.pow(Math.abs(u), 2.5) - (u > 0.6 ? (u - 0.6) * 0.8 : 0);
            if (kind === 'sub' ? Math.abs(yy + hh * 0.4) > hh * 0.6 * bottom : v > bottom) continue;
            const seam = (yy + 100) % (kind === 'sub' ? 5 : 2) === 0;
            let c = seam ? HULL[2] : HULL[0];
            if (kind === 'steamer' && v < 0.3) c = HULL[2];
            if (kind === 'sub') { if (seam && (Math.round(xx) & 3) === 0) c = HULL[1]; }
            else if (!seam && K.hash(Math.round(xx), yy, 5) < 0.05) c = HULL[1];
            Lr.d[Y0 * n + X0] = c;
          } }
        // superstructure: mast, funnel, tower
        const [mx, my] = rot(cx + (kind === 'steamer' ? 0.1 : -0.1) * hw, cy - hh);
        if (kind === 'galleon') { K.thick(Lr, mx, my, mx + flip * 3 * s, my - 0.28 * n, Math.max(1, Math.round(s)), HULL[2]); const [sx, sy] = rot(cx + 0.6 * hw, cy - hh); rect(Lr, sx - 3 * s, sy - 5 * s, 6 * s, 5 * s, HULL[0]); for (let k = 0; k < 4; k++) put(Lr, mx + flip * (1 + k * 0.5) * s, my - 0.2 * n + k * 2 * s, hx('#d8d0b0')); }
        if (kind === 'steamer') { rect(Lr, mx - 2 * s, my - 7 * s, 4 * s, 7 * s, hx('#2a2a30')); rect(Lr, mx - 2 * s, my - 6 * s, 4 * s, s, hx('#c83a2a')); }
        if (kind === 'sub') { rect(Lr, mx - 3 * s, my - 4 * s, 6 * s, 5 * s, HULL[0]); rect(Lr, mx, my - 7 * s, s, 3 * s, hx('#3a3a40')); }
        if (kind === 'rowboat') { const [ax, ay] = rot(cx + hw * 1.3, floor - 1); K.thick(Lr, ax, ay - 6 * s, ax, ay, 1, hx('#5a5a62')); rect(Lr, ax - 2 * s, ay - s, 4 * s, s, hx('#5a5a62')); line(Lr, ax, ay - 6 * s, cx + hw * 0.8, cy - hh * 0.5, hx('#8a7a5a')); }
        K.commit(g, Lr, ink);
        // portholes
        if (kind !== 'rowboat') for (let k = -2; k <= 2; k++) { const [px, py] = rot(cx + k * hw * 0.3, cy - hh * 0.45); K.ell(g, px, py, 1.2 * s, 1.2 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.4 ? hx('#c9a227') : hx('#0a0e14')); }
        // weed on the deck, swaying
        for (const w of weeds) { const [wx, wy] = rot(cx + w.u * hw, cy - hh); for (let q = 0; q < w.h; q++) put(g, wx + Math.sin(t * 1.2 + w.ph + q * 0.4) * q * 0.15, wy - q, q & 1 ? hx('#3a8a3a') : hx('#5ab04a')); }
        // the chest
        const chx = flip > 0 ? n * 0.12 : n * 0.8, chy = floor + 1;
        if (loot === 'Chest') { rect(g, chx, chy - 4 * s, 6 * s, 4 * s, hx('#6a4022')); rect(g, chx, chy - 4 * s, 6 * s, s, hx('#c9a227')); rect(g, chx + 2.5 * s, chy - 3 * s, s, s, hx('#c9a227'));
          if ((t * 2 | 0) % 5 === 0) put(g, chx + 1.5 * s, chy - 5 * s, WHITE); }
        else if (loot === 'Amphorae') for (let k = 0; k < 3; k++) { const ax = chx + k * 2.6 * s, tilt = k === 1 ? 1 : 0; K.ell(g, ax + 1, chy - 2 * s + tilt, 1.2 * s, 2 * s, (x, y, nx) => nx < -0.3 ? hx('#d8804a') : hx('#b0582a')); rect(g, ax + 1 - 0.5 * s, chy - 4.6 * s + tilt, s, s, hx('#8a4020')); }
        else if (loot === 'Cannon') { K.thick(g, chx, chy - 1.5 * s, chx + 7 * s, chy - 2.5 * s, Math.max(2, Math.round(1.6 * s)), hx('#2a2e34')); K.ell(g, chx + 1.5 * s, chy - 0.8 * s, 1.4 * s, 1.4 * s, hx('#5a3a22')); put(g, chx + 7 * s, chy - 2.5 * s, hx('#0a0c10')); }
        else { K.thick(g, chx + 3 * s, chy - 7 * s, chx + 3 * s, chy, 1, hx('#4a4a52')); K.thick(g, chx, chy - 2 * s, chx + 6 * s, chy - 2 * s, 1, hx('#4a4a52')); put(g, chx, chy - 3 * s, hx('#4a4a52')); put(g, chx + 6 * s, chy - 3 * s, hx('#4a4a52')); K.ell(g, chx + 3 * s, chy - 7.5 * s, s, s, hx('#5a5a62')); }
        // fish circle the wreck, and scatter when startled
        for (const f of school) {
          f.a += f.sp * 0.05 * (1 + scatter * 4);
          const rr = f.r * (1 + scatter * 1.2), x = cx + Math.cos(f.a) * rr, y = f.y + Math.sin(f.a * 2) * 3 * s, fd = Math.sign(-Math.sin(f.a) * f.sp) || 1;
          put(g, x, y, f.c); put(g, x + fd, y, f.c); put(g, x - fd, y, shade(f.c, 0.6));
        }
        if (who === 'Shark') {
          // a shark cruising across, high in the water
          const span = n + 30 * s, x = ((t * 2.2 * s) % span) - 15 * s, y = n * 0.22 + Math.sin(t * 0.5) * s, tb = Math.sin(t * 4) * s;
          K.ell(g, x, y, 7 * s, 1.8 * s, (xx, yy, nx, ny) => ny > 0.3 ? hx('#c8ccd0') : hx('#5a6470')); for (let q = 0; q < 3 * s; q++) rect(g, x - q * 0.6, y - 1.8 * s - q, Math.max(1, Math.round(2 * s - q * 0.5)), 1, hx('#5a6470'));
          for (let q = 0; q < 3 * s; q++) { put(g, x - 7 * s - q, y - q * 0.8 + tb * q / (3 * s), hx('#5a6470')); put(g, x - 7 * s - q, y + q * 0.6 + tb * q / (3 * s), hx('#5a6470')); } put(g, x + 5 * s, y - 0.5 * s, hx('#0a0c10'));
        } else if (who === 'Diver') {
          const span = n + 20 * s, x = n + 10 * s - ((t * 1.2 * s) % span), y = n * 0.3 + Math.sin(t * 0.7) * 2 * s, kick = Math.sin(t * 3) > 0 ? 1 : -1;
          rect(g, x, y, 6 * s, 1.5 * s, hx('#1a1a22')); rect(g, x + 1.5 * s, y - 1.2 * s, 3 * s, 1.2 * s, hx('#e8c040')); K.ell(g, x - 0.5 * s, y + 0.5 * s, 1.2 * s, 1.2 * s, hx('#1a1a22')); put(g, x - 1.2 * s, y + 0.3 * s, hx('#8ad0ff'));
          K.thick(g, x + 6 * s, y + 0.5 * s, x + 9 * s, y + 0.5 * s + kick * s, 1, hx('#2a6aff'));
          if (((t * 3) | 0) % 2 === 0 && bubbles.length < 80) bubbles.push({ x: x - s, y: y - s });
        }
        if (R() < 0.12) { const [bx, by] = rot(cx + 0.2 * hw, cy - hh); bubbles.push({ x: bx, y: by }); }
        for (let k = bubbles.length - 1; k >= 0; k--) { const b = bubbles[k]; b.y -= 0.4 * s; b.x += Math.sin(t * 4 + k) * 0.25; if (b.y < 0) { bubbles.splice(k, 1); continue; } put(g, b.x, b.y, mix(S[0], WHITE, 0.55)); }
      };
    },
  });

  add({
    name: 'Night Ascent', seed: 0, sizes: [100, 200], fps: 12,
    recipe: 'A slice through the ocean from the surface to the abyss over one day. At dusk a cloud of small creatures rises from the twilight zone to feed near the surface, glowing as they go, and sinks again at dawn: the largest migration on Earth.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, sky = Math.round(n * 0.07);
      const zones = [[0.07, [60, 170, 210], [10, 30, 60]], [0.25, [30, 90, 160], [8, 22, 48]], [0.5, [12, 36, 80], [5, 14, 32]], [0.78, [4, 10, 26], [3, 8, 20]], [1, [2, 4, 10], [2, 4, 10]]];
      const rowsDay = new Uint32Array(n), rowsNight = new Uint32Array(n);
      for (let y = 0; y < n; y++) {
        const v = y / n; let k = 1; while (k < zones.length - 1 && zones[k][0] < v) k++;
        const a = zones[k - 1], b = zones[k], u = U.clamp((v - a[0]) / (b[0] - a[0])), mixc = (p, q) => rgb(...p.map((c, j) => c + (q[j] - c) * u));
        rowsDay[y] = mixc(a[1], b[1]); rowsNight[y] = mixc(a[2], b[2]);
      }
      const glowC = rgb(...R.pick([[90, 220, 255], [120, 255, 200], [150, 170, 255]]));
      const crowd = Array.from({ length: Math.round(190 * s) }, () => ({ x: R() * n, y: R.range(0.35, 0.55) * n, off: R.gauss() * 0.05, sp: R.range(0.5, 1.3), blink: R() * 40 }));
      const squid = Array.from({ length: 3 }, () => ({ x: R() * n, y: R.range(0.3, 0.6) * n }));
      const floor = Array.from({ length: n }, (_, x) => n - (4 + 3 * Math.sin(x * 0.07 / s) + 2 * Math.sin(x * 0.23 / s)) * s);
      return (t, dt) => {
        const f = (t / 50) % 1, sun = Math.sin(f * TAU), day = U.clamp(sun * 1.5 + 0.5);
        for (let y = 0; y < n; y++) {
          const c = day >= 1 ? rowsDay[y] : day <= 0 ? rowsNight[y] : null;
          for (let x = 0; x < n; x++) d[y * n + x] = c || (dth(x, y) < day ? rowsDay[y] : rowsNight[y]);
        }
        const skyC = mix(rgb(10, 12, 30), rgb(140, 190, 240), day);
        rect(g, 0, 0, n, sky, skyC);
        const bx = (f * 1.3 % 1) * n;
        disc(g, bx, sky * 0.5, 2 * s, day > 0.5 ? rgb(255, 240, 160) : rgb(230, 230, 210));
        for (let x = 0; x < n; x++) { put(g, x, sky + Math.round(Math.sin(x * 0.3 + t * 2) * 0.6), mix(skyC, WHITE, 0.4)); for (let y = Math.floor(floor[x]); y < n; y++) d[y * n + x] = rgb(30, 26, 24); }
        // the crowd heads for the surface at night and back to the twilight at day
        const target = n * (0.12 + 0.3 * day);
        for (const c of crowd) {
          const ty = target + c.off * n;
          c.y += (ty - c.y) * 0.015 * c.sp + (R() - 0.5) * 0.3; c.x = (c.x + (0.4 + c.off * 3) * dt * s + n) % n;
          const deep = c.y / n, lightHere = day * U.clamp(1 - deep * 2.5);
          const col = lightHere > 0.35 ? rgb(20, 30, 40) : ((Math.floor(t * 3 + c.blink) % 13) ? mix(glowC, BLACK, 0.4) : glowC);
          rect(g, c.x, c.y, Math.max(1, s), Math.max(1, s), col);
        }
        for (const q of squid) {
          q.y += ((target + 6 * s) - q.y) * 0.01; q.x = (q.x + 3 * s * dt) % n;
          const c = day > 0.5 && q.y < n * 0.25 ? rgb(170, 60, 50) : rgb(200, 70, 60);
          rect(g, q.x, q.y, 3 * s, 2 * s, c); for (let k = 0; k < 3; k++) put(g, q.x - 1 - k * s, q.y + (k % 2) * s + Math.sin(t * 4 + k), c);
        }
        for (const [frac, label] of [[0.25, '200'], [0.5, '1000'], [0.78, '4000']]) {
          const y = Math.round(frac * n), c = rgb(120, 140, 170);
          for (let x = n - 4 * s; x < n; x++) put(g, x, y, c);
          let x = n - 5 * s - label.length * 4;
          for (const ch of label) { const r = { 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [7, 1, 7, 4, 7], 4: [5, 5, 7, 1, 1] }[ch]; for (let j = 0; j < 5; j++) for (let b = 0; b < 3; b++) if (r[j] >> (2 - b) & 1) put(g, x + b, y - 6 + j, c); x += 4; }
        }
      };
    },
  });

  add({
    name: 'Atoll', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'A coral atoll from the air: deep blue swell, surf breaking white on the reef, a turquoise lagoon with sand banks and palm-topped islets. Cloud shadows slide over it and a small boat crosses the lagoon.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R), Rr = n * R.range(0.32, 0.38), cx = n * R.range(0.45, 0.55), cy = n * R.range(0.45, 0.55);
      const zone = new Uint8Array(n * n), base = new Uint32Array(n * n), crest = new Uint8Array(n * n), sa = R() * TAU, ca = Math.cos(sa), saS = Math.sin(sa);
      const deep = [rgb(16, 50, 110), rgb(20, 60, 126)], swellHi = [mix(rgb(16, 50, 110), WHITE, 0.18), mix(rgb(20, 60, 126), WHITE, 0.18)], slope = rgb(30, 110, 170), reef = [rgb(140, 130, 90), rgb(110, 140, 100)], lag = [rgb(80, 210, 210), rgb(110, 225, 215), rgb(200, 230, 200)], sandC = rgb(240, 228, 190), palm = [rgb(40, 120, 50), rgb(70, 160, 60)];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, r = Math.hypot(x - cx, (y - cy) * 1.1) / Rr + nz.n2(x * 2.5 / n, y * 2.5 / n) * 0.12, isle = nz.n2(x * 6 / n + 9, y * 6 / n) > 0.25;
        let z;
        if (r > 1.25) z = 0; else if (r > 1.06) z = 1; else if (r > 0.97) z = isle ? 5 : 2; else z = 3;
        zone[i] = z;
        if (z === 0) base[i] = deep[(x * 3 + y * 7) % 13 === 0 ? 1 : 0];
        else if (z === 1) base[i] = dth(x, y) < (1.25 - r) / 0.19 ? slope : deep[0];
        else if (z === 2) { base[i] = reef[(x + y) & 1]; crest[i] = 1; }
        else if (z === 5) base[i] = nz.n2(x * 0.5, y * 0.5) > 0.2 ? palm[(x * 5 + y) % 3 === 0 ? 1 : 0] : sandC;
        else { const b = nz.n2(x * 4 / n + 3, y * 4 / n); base[i] = b > 0.45 ? lag[2] : b > 0.05 ? lag[1] : lag[0]; }
      }
      const clouds = Array.from({ length: 2 }, () => ({ x: R() * n, y: R() * n, r: R.range(4, 7) * s }));
      const U0 = Math.min(0, ca * n) + Math.min(0, saS * n), UL = Math.ceil(Math.abs(ca) * n + Math.abs(saS) * n) + 2, swell = new Float32Array(UL), uIdx = new Uint16Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) uIdx[y * n + x] = Math.round(x * ca + y * saS - U0);
      return (t, dt) => {
        for (let u = 0; u < UL; u++) swell[u] = Math.sin((u + U0) * 0.25 / s - t * 1.1);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, z = zone[i];
          let c = base[i];
          if (z === 0 && swell[uIdx[i]] > 0.93) c = swellHi[c === deep[1] ? 1 : 0];
          else if (z === 2) { if (swell[uIdx[i]] > 0.2 + dth(x, y) * 0.5) c = WHITE; }
          else if (z === 3 && ((x * 13 + y * 7 + Math.floor(t * 6)) % 61 === 0)) c = mix(c, WHITE, 0.6);
          d[i] = c;
        }
        // cloud shadows, then the clouds a little up-sun
        for (const c of clouds) {
          c.x = (c.x + 2 * s * dt) % (n + 30 * s); const cxp = c.x - 15 * s;
          for (let y = Math.floor(c.y - c.r); y < c.y + c.r; y++) for (let x = Math.floor(cxp - c.r * 1.5); x < cxp + c.r * 1.5; x++) {
            if (x < 0 || y < 0 || x >= n || y >= n) continue;
            const q = ((x - cxp) / (c.r * 1.5)) ** 2 + ((y - c.y) / c.r) ** 2;
            if (q < 1) d[y * n + x] = dim75(d[y * n + x]);
          }
          for (let y = Math.floor(c.y - c.r - 6 * s); y < c.y + c.r - 6 * s; y++) for (let x = Math.floor(cxp - 5 * s - c.r * 1.5); x < cxp - 5 * s + c.r * 1.5; x++) {
            if (x < 0 || y < 0 || x >= n || y >= n) continue;
            const q = ((x - cxp + 5 * s) / (c.r * 1.5)) ** 2 + ((y - c.y + 6 * s) / c.r) ** 2;
            if (q < 1 && (q < 0.7 || dth(x, y) > (q - 0.7) / 0.3)) d[y * n + x] = q < 0.4 ? WHITE : rgb(230, 236, 240);
          }
        }
        const ba = t * 0.08, bx = cx + Math.cos(ba) * Rr * 0.5, by = cy + Math.sin(ba) * Rr * 0.45;
        for (let k = 1; k < 9; k++) { const a = ba - k * 0.03; put(g, cx + Math.cos(a) * Rr * 0.5 + Math.sin(a) * k * 0.3 * s, cy + Math.sin(a) * Rr * 0.45 - Math.cos(a) * k * 0.3 * s, mix(lag[0], WHITE, 0.5)); put(g, cx + Math.cos(a) * Rr * 0.5 - Math.sin(a) * k * 0.3 * s, cy + Math.sin(a) * Rr * 0.45 + Math.cos(a) * k * 0.3 * s, mix(lag[0], WHITE, 0.5)); }
        rect(g, bx - s, by - s, 2 * s, 2 * s, WHITE);
      };
    },
  });

  add({
    name: 'Octopus', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Point and the arms reach for you; click to startle it into a puff of ink.',
    recipe: 'An octopus on a rock fills the frame: a cel-shaded mantle with barred eyes and eight tapering arms that curl and uncurl in slow waves, suckers along their undersides, the skin shimmering with spots. Point and the near arms reach for you; click and it flashes pale and puffs ink.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SEAS), Lr = K.layer(n), ink = hx('#08060a');
      const SKIN = R.pick([['#c8402a', '#e8704a'], ['#e8822a', '#f2b05a'], ['#7a3a9a', '#b070c8'], ['#e0c040', '#3a6aff'], ['#e8dcc8', '#6a4a30'], ['#3a8a6a', '#7ac8a0']]).map(hx);
      const skin = K.tones(SKIN[0]), spot = SKIN[1], ringed = SKIN[1] === hx('#3a6aff'), striped = SKIN[0] === hx('#e8dcc8');
      const cx = n * R.range(0.42, 0.58), cy = n * R.range(0.32, 0.42), mr = n * R.range(0.15, 0.2), rockY = Math.round(n * 0.78);
      const arms = Array.from({ length: 8 }, (_, k) => ({ a0: Math.PI * (0.05 + 0.9 * k / 7), ph: R.range(0, TAU), len: R.int(10, 16) * s, curl: R.range(0.12, 0.3) * R.sign() }));
      let flash = 0;
      const puffs = [];
      T(g, 'Skin', ['Red', 'Orange', 'Violet', 'Blue-Ringed', 'Mimic', 'Green'][[0, 1, 2, 3, 4, 5].find(i => SKIN[0] === hx(['#c8402a', '#e8822a', '#7a3a9a', '#e0c040', '#e8dcc8', '#3a8a6a'][i]))]); T(g, 'Water', SEA_NAMES[SEAS.indexOf(S)]);
      // new traits: its den, how it holds its arms, and a neighbour
      const den = T(g, 'Den', alt(g, 'Rock', [['Rock', 3], ['Coral Reef', 1.2], ['Sand and Shells', 1], ['Old Jar', 0.6]])), pose = T(g, 'Arms', alt(g, 'Curling', [['Curling', 3], ['Spread', 1], ['Coiled', 1]])), nb = T(g, 'Neighbour', alt(g, 'None', [['None', 3], ['Crab', 1], ['Wrasse', 1]]));
      if (pose !== 'Curling') for (const a of arms) a.curl *= pose === 'Spread' ? 0.35 : 1.7;
      const CORAL = ['#ff6a8a', '#ff9a3a', '#b05ae0', '#f2d23a', '#5ad0c0'].map(hx), SHL = ['#f2e6d0', '#e8a0b0', '#f0d080'].map(hx);
      const ground = (x, top, y) => den === 'Sand and Shells' ? (y === top ? hx('#e8d8a8') : K.hash(x >> 1, y, 3) < 0.15 ? hx('#b8a070') : hx('#d0b888')) : den === 'Coral Reef' ? (y === top ? hx('#8a7a6a') : K.hash(x >> 1, y >> 1, 3) < 0.3 ? hx('#6a5a50') : hx('#5a4a44')) : (y === top ? hx('#6a6a62') : K.hash(x >> 1, y >> 1, 3) < 0.3 ? hx('#4a4a44') : hx('#3a3a36'));
      return (t) => {
        for (const tp of g.input.taps()) { flash = 1; if (puffs.length < 4) puffs.push({ x: cx, y: cy + mr * 0.3, r: 1 }); }
        flash *= 0.94;
        sea(g, S, t, 0, 25);
        for (let x = 0; x < n; x++) { const top = rockY - Math.round((Math.sin(x * 0.2) * 0.5 + 0.5) * 3 * s); for (let y = top; y < n; y++) d[y * n + x] = ground(x, top, y); }
        if (den === 'Coral Reef') for (let k = 0; k < 6; k++) { const x = (k + 0.3 + 0.4 * K.hash(k, 1, 9)) / 6 * n, c = CORAL[k % 5], h = (3 + 3 * K.hash(k, 2, 9)) * s; if (k % 2) K.ell(g, x, rockY - h * 0.4, h * 0.6, h * 0.5, (xx, yy, nx, ny) => ny < -0.3 ? mix(c, WHITE, 0.3) : ((xx + yy) & 1) ? c : shade(c, 0.8)); else for (let b = -1; b <= 1; b++) line(g, x, rockY, x + b * h * 0.5, rockY - h + Math.abs(b) * s, c); }
        if (den === 'Sand and Shells') for (let k = 0; k < 5; k++) K.ell(g, (k + 0.5) / 5 * n + K.hash(k, 4) * 3, rockY + (2 + 4 * K.hash(k, 5)) * s, 1.2 * s, 0.8 * s, SHL[k % 3]);
        if (den === 'Old Jar') { const jx = cx, jy = rockY + 2 * s; K.ell(g, jx, jy, mr * 1.1, 5 * s, (xx, yy, nx, ny) => ny < -0.6 ? hx('#5a2e18') : nx < -0.4 ? hx('#d8804a') : nx > 0.5 ? hx('#7a3a1a') : hx('#b0582a')); }
        if (nb === 'Crab') { const x = n * 0.82 + Math.sin(t * 0.4) * 3 * s, y = rockY - 1, k = Math.max(1, Math.round(s)); rect(g, x - 1.5 * k, y - k, 3 * k, 1.5 * k, hx('#d84a2a')); put(g, x - 2 * k, y - 2 * k, hx('#e86a3a')); put(g, x + 2 * k, y - 2 * k, hx('#e86a3a')); }
        if (nb === 'Wrasse') { const x = n * 0.5 + Math.sin(t * 0.25) * n * 0.4, y = n * 0.14 + Math.sin(t * 0.6) * 2 * s, fd = Math.cos(t * 0.25) > 0 ? 1 : -1; rect(g, x - 2 * s, y, 4 * s, 1.4 * s, hx('#3ab0e0')); rect(g, x - s, y, 2 * s, 0.7 * s, hx('#f2d23a')); put(g, x - fd * 2.5 * s, y, hx('#2a7ab0')); put(g, x + fd * 1.5 * s, y, hx('#0a0c10')); }
        const px = g.input.inside ? g.input.x * n : null, py = g.input.inside ? g.input.y * n : null, base = flash > 0.3 ? mix(skin[2], WHITE, flash * 0.6) : skin[2];
        // arms first, behind the mantle
        for (const [k, a] of arms.entries()) {
          let x = cx + Math.cos(a.a0) * mr * 0.7, y = cy + Math.sin(a.a0) * mr * 0.6 + mr * 0.2, ang = a.a0;
          if (px !== null) { const want = Math.atan2(py - y, px - x), diff = Math.atan2(Math.sin(want - ang), Math.cos(want - ang)); if (Math.abs(diff) < 1.6) ang += diff * 0.5; }
          for (let q = 0; q < a.len; q++) {
            const u = q / a.len, w = Math.max(0.5, (1 - u) * 2.4 * s);
            ang += a.curl * Math.sin(t * 0.8 + a.ph + q * 0.25) * (0.4 + u);
            x += Math.cos(ang); y += Math.sin(ang);
            if (y > rockY - 1) { y = rockY - 1; ang = -ang; }
            K.ell(Lr, x, y, w, w, (xx, yy, nx, ny) => ny > 0.3 && (q & 1) && w > 1 ? mix(base, WHITE, 0.55) : striped && ((q >> 1) & 1) ? skin[0] : nx < -0.3 ? skin[3] : base);
          }
          K.commit(g, Lr, ink);
        }
        // the mantle: cel shaded, spotted, breathing
        const breathe = 1 + Math.sin(t * 1.4) * 0.04;
        K.ell(Lr, cx, cy - mr * 0.25, mr * 0.9 * breathe, mr * 1.15 * breathe, (x, y, nx, ny) => {
          if (ringed && ((Math.round(x * 0.7) + Math.round(y * 0.7)) % 4 === 0)) return spot;
          if (!ringed && !striped && K.hash(x >> 1, y >> 1, (t * 2 | 0)) < 0.14) return shade(spot, 0.9);
          return K.cel(nx, ny, [-0.5, -0.6, 0.6], [skin[1], base, skin[3], skin[4]]);
        });
        K.commit(g, Lr, ink);
        for (const side of [-1, 1]) {
          const ex = cx + side * mr * 0.55, ey = cy + mr * 0.25;
          K.ell(g, ex, ey, 2 * s, 1.6 * s, hx('#f2e6b0'));
          rect(g, ex - 1.2 * s, ey - 0.2, 2.4 * s, 1, ink);
          K.ell(Lr, ex, ey - 1.6 * s, 2.2 * s, 1 * s, skin[1]); K.commit(g, Lr, 0);
        }
        // ink puffs
        for (let k = puffs.length - 1; k >= 0; k--) { const p = puffs[k]; p.r += 0.6 * s; p.y += 0.2 * s; if (p.r > 14 * s) { puffs.splice(k, 1); continue; } K.ell(g, p.x, p.y, p.r, p.r * 0.8, (x, y) => K.hash(x, y, 1) < 1 - p.r / (14 * s) ? hx('#0a0810') : 0); }
      };
    },
  });

  add({
    name: 'Iceberg', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Click the ice to break a chunk off.',
    recipe: 'An iceberg cut in half by the waterline: a faceted white peak above, a great pale-blue mass below, every facet a flat tone lit from one side. It bobs in the swell under a day, dusk or aurora sky, sometimes with penguins on top. Click the ice to break off a chunk.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, ink = hx('#0a1420'), wl = Math.round(n * R.range(0.36, 0.46));
      const SK = R.pick([['#5aa8e8', '#8cc8f0', '#c8e8ff'], ['#ff8a6a', '#ffb08a', '#ffe0b8'], ['#0a1430', '#142050', '#1e3a66'], ['#2a1a4a', '#4a2a6a', '#e86a8a']]).map(hx), aurora = SK[0] === hx('#0a1430') && R.bool(0.7);
      const S = R.pick(SEAS), shape = R.pick(['tabular', 'pinnacle', 'dome', 'twin']), seed = R.int(1, 99);
      const above = x => { const u = (x - n * 0.5) / (n * 0.3); if (Math.abs(u) > 1) return 0; return shape === 'tabular' ? (Math.abs(u) < 0.85 ? 0.2 : 0.2 * (1 - (Math.abs(u) - 0.85) / 0.15)) * n : shape === 'pinnacle' ? Math.pow(1 - Math.abs(u), 1.4) * 0.3 * n : shape === 'dome' ? Math.sqrt(1 - u * u) * 0.2 * n : (Math.pow(Math.max(0, 1 - Math.abs(u + 0.4) * 2.2), 1) * 0.28 + Math.pow(Math.max(0, 1 - Math.abs(u - 0.45) * 2.5), 1) * 0.22) * n; };
      const below = x => { const u = (x - n * 0.5) / (n * 0.44); return Math.abs(u) > 1 ? 0 : Math.pow(1 - u * u, 0.6) * (n - wl) * 0.85; };
      // facets: each cell belongs to its nearest seed point; each facet gets one tone
      const pts = Array.from({ length: 18 }, () => [R.range(0.1, 0.9) * n, R.range(0.1, 0.95) * n, R()]);
      const facet = (x, y) => { let best = 1e9, v = 0; for (const p of pts) { const dd = (x - p[0]) ** 2 + (y - p[1]) ** 2; if (dd < best) { best = dd; v = p[2]; } } return v; };
      const facetMap = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) facetMap[y * n + x] = facet(x, y);
      const ICE = ['#ffffff', '#e0f0ff', '#b8dcf8', '#88c0e8'].map(hx), UND = ['#9ae0f0', '#6ac0e0', '#3a98c8', '#2a78b0'].map(hx);
      const penguins = R.bool(0.5) ? R.int(1, 4) : 0, chunks = [], rings = [];
      T(g, 'Sky', ['Day', 'Sunset', 'Polar Night', 'Dusk'][['#5aa8e8', '#ff8a6a', '#0a1430', '#2a1a4a'].map(hx).indexOf(SK[0])]); T(g, 'Berg', CAP(shape)); T(g, 'Penguins', penguins); T(g, 'Water', SEA_NAMES[SEAS.indexOf(S)]); if (aurora) T(g, 'Aurora', 'Yes');
      // new traits: floes on the water and who else is about
      const floes = T(g, 'Floes', alt(g, 'None', [['None', 3], ['Drifting', 1.2], ['Pack Ice', 0.7]])), who = T(g, 'Company', alt(g, 'None', [['None', 3], ['Orca', 1], ['Seal', 1]]));
      const FL = floes === 'None' ? [] : Array.from({ length: floes === 'Pack Ice' ? 9 : 3 }, (_, k) => ({ x: K.hash(k, 1, seed) * n, w: (2 + 3 * K.hash(k, 2, seed)) * s, v: (K.hash(k, 3, seed) - 0.5) * 0.6 }));
      const bites = [], cut = x => { let a = above(x); if (a <= 0) return 0; for (const b of bites) a -= b.d * Math.max(0, 1 - Math.abs(x - b.x) / b.w); return Math.max(0.5, a); };
      return (t) => {
        const bob = Math.round(Math.sin(t * 0.6) * 1.2 * s);
        // a click breaks a chunk off the top, and the berg keeps the notch (the newest 12 notches stay)
        for (const tp of g.input.taps()) { const x = tp.x * n; if (cut(x) > 1.5 * s && chunks.length < 16) { chunks.push({ x, y: wl - cut(x) * 0.6 + bob, vy: 0, r: (1.5 + K.hash(x * 7, chunks.length, seed)) * s }); bites.push({ x, d: 1.6 * s, w: 2.6 * s }); if (bites.length > 12) bites.shift(); } }
        K.bands(g, 0, wl, SK);
        if (aurora) for (let x = 0; x < n; x++) { const y0 = Math.round(wl * (0.2 + 0.1 * Math.sin(x * 0.15 + t * 0.4))); for (let k = 0; k < 6 * s; k++) if (y0 + k >= 0) d[(y0 + k) * n + x] = mix(d[(y0 + k) * n + x], hx(k < 2 * s ? '#7affb0' : '#5ad0a0'), 0.6 - k / (12 * s)); }
        if (SK[0] === hx('#0a1430') || SK[0] === hx('#2a1a4a')) for (let k = 0; k < 20; k++) put(g, K.hash(k, 1, seed) * n, K.hash(k, 2, seed) * wl * 0.8, WHITE);
        sea(g, S, t, wl, 20, true);
        for (let x = 0; x < n; x++) {
          const a = cut(x), b = below(x);
          for (let y = Math.round(wl - a + bob); y < wl; y++) if (y >= 0) { const f = facetMap[y * n + x], lit = f + (x < n * 0.5 ? 0.25 : -0.15); d[y * n + x] = ICE[lit > 0.75 ? 0 : lit > 0.45 ? 1 : lit > 0.2 ? 2 : 3]; }
          for (let y = wl; y < wl + b + bob && y < n; y++) { const f = facetMap[y * n + x], dep = (y - wl) / (n - wl), k = Math.min(3, Math.floor(dep * 2.5 + (f > 0.5 ? 0 : 1))); d[y * n + x] = UND[k]; }
          if (a > 0) put(g, x, Math.round(wl - a + bob) - 1, ink);
        }
        // waterline foam
        for (let x = 0; x < n; x++) if (((x + (t * 3 | 0)) % 5) < 3) put(g, x, wl, mix(S[0], WHITE, 0.6));
        for (const f of FL) { const x = ((f.x + t * f.v * s) % (n + 10 * s) + n + 10 * s) % (n + 10 * s) - 5 * s; if (Math.abs(x - n / 2) < n * 0.32) continue; rect(g, x - f.w, wl - 1 + bob * 0.5, 2 * f.w, 1, ICE[0]); rect(g, x - f.w + 1, wl + bob * 0.5, 2 * f.w - 2, 1, UND[0]); }
        if (who === 'Orca') { const span = n + 20 * s, x = n + 10 * s - ((t * 1.5 * s) % span), up = Math.sin(t * 0.8) > -0.2; if (up) { for (let q = 0; q < 4 * s; q++) rect(g, x - q * 0.35, wl - q - 1, Math.max(1, Math.round(2 * s * (1 - q / (4 * s)))), 1, hx('#101418')); rect(g, x - 3 * s, wl - 1, 6 * s, 1, hx('#101418')); } }
        if (who === 'Seal') { const x = Math.round(n * 0.12), y = wl - 1 + bob * 0.5; rect(g, x - 3 * s, y, 8 * s, 1, ICE[0]); K.ell(g, x + s, y - s, 3 * s, 1.1 * s, hx('#6a6a74')); put(g, x + 3.5 * s, y - 1.8 * s, hx('#7a7a84')); put(g, x + 4 * s, y - 2 * s, hx('#101014')); }
        // penguins on top
        for (let k = 0; k < penguins; k++) { const x = Math.round(n * (0.42 + k * 0.06)), y = Math.round(wl - cut(x) + bob); rect(g, x, y - 3 * s, Math.max(1, s), 3 * s, hx('#101418')); put(g, x + 1, y - 2 * s, WHITE); put(g, x, y - 3 * s, hx('#f2a020')); }
        // chunks falling and splashing
        for (let k = chunks.length - 1; k >= 0; k--) {
          const c = chunks[k]; c.vy += 0.15 * s; c.y += c.vy;
          if (c.y > wl + 2) { rings.push({ x: c.x, r: 1 }); chunks.splice(k, 1); continue; }
          K.ell(g, c.x, c.y, c.r, c.r, (x, y, nx) => nx < 0 ? ICE[0] : ICE[2]);
        }
        for (let k = rings.length - 1; k >= 0; k--) { const r = rings[k]; r.r += 0.5 * s; if (r.r > 8 * s) { rings.splice(k, 1); continue; } put(g, r.x - r.r, wl, WHITE); put(g, r.x + r.r, wl, WHITE); put(g, r.x, wl - r.r * 0.6, WHITE); }
      };
    },
  });
})();
