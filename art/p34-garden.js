// Set 4 · Garden: plants that grow, turn, unroll and get pruned, cell by cell.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Garden' }, def));
  const { rgb, mixPk: mix, shade, put, line, rect, disc } = X;
  const TAU = Math.PI * 2, B4 = X.bayer(4);
  const dth = (x, y) => B4[(y & 3) * 4 + (x & 3)];
  const rows = (n, top, bot) => Array.from({ length: n }, (_, y) => { const v = y / (n - 1); return rgb(top[0] + (bot[0] - top[0]) * v, top[1] + (bot[1] - top[1]) * v, top[2] + (bot[2] - top[2]) * v); });
  const lerp3 = (a, b, u) => a.map((c, j) => c + (b[j] - c) * u);
  const K = U.K4, hx = K.hx;

  const ogLook = g => g.home || g.alt() < 0.5;
  // Traits: T names what a variation rolled; alt() rolls a new trait from g.alt (the opening variation keeps `home`)
  const T = (g, k, v) => (g.trait ? g.trait(k, v) : v);
  const alt = (g, home, opts) => { if (g.home) return home; let sum = 0; for (const o of opts) sum += o[1]; let r = g.alt() * sum; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };
  const CAP = w => w.charAt(0).toUpperCase() + w.slice(1);

  // Fairy Ring: the original, exactly, with input hooks that never draw from R
  function fairyOG(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R), arr = new Float32Array(n * n), stripe = new Uint8Array(n * n);
      const lawn = [rgb(70, 140, 60), rgb(80, 156, 66)], lush = [rgb(30, 100, 40), rgb(40, 116, 46)], dead = [rgb(170, 150, 90), rgb(150, 130, 80)], heal = [rgb(100, 150, 70), rgb(110, 160, 76)];
      T(g, 'Look', 'Classic'); T(g, 'Grid', n);
      // new traits: how the lawn is mown, and the hour
      const mow = T(g, 'Lawn', alt(g, 'Striped', [['Striped', 3], ['Checked', 1], ['Unmown', 1]])), hour = T(g, 'Hour', alt(g, 'Day', [['Day', 3], ['Dusk', 1], ['Autumn', 1]]));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) stripe[y * n + x] = mow === 'Checked' ? (((x / (10 * s)) | 0) + ((y / (10 * s)) | 0)) & 1 : mow === 'Unmown' ? (nz.n2(x * 0.09 / s + 40, y * 0.09 / s) > 0.15 ? 1 : 0) : (((x / (10 * s)) | 0) + (dth(x, y) < 0.1 ? 1 : 0)) & 1;
      const tint = hour === 'Dusk' ? c => mix(shade(c, 0.5), rgb(30, 30, 80), 0.25) : hour === 'Autumn' ? c => mix(c, rgb(170, 120, 50), 0.3) : null;
      if (tint) for (const A of [lawn, lush, dead, heal]) for (let k = 0; k < 2; k++) A[k] = tint(A[k]);
      let rings, shrooms, born = -99;
      const pend = [];
      function plant() {
        rings = Array.from({ length: R.int(2, 4) }, () => ({ x: R.range(0.15, 0.85) * n, y: R.range(0.15, 0.85) * n, t0: R.range(0, 6), v: R.range(2.2, 3.5) * s }));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let best = Infinity;
          for (const r of rings) best = Math.min(best, r.t0 + (Math.hypot(x - r.x, y - r.y) + nz.n2(x * 0.06, y * 0.06) * 5 * s) / r.v);
          arr[y * n + x] = best;
        }
        // a mushroom may only stand where its own ring is the first to arrive
        shrooms = [];
        const cap = [rgb(240, 236, 220), rgb(170, 120, 80), rgb(200, 50, 40), rgb(230, 190, 120)][R.int(0, 3)];
        for (let k = 0; k < 700 && shrooms.length < 90; k++) { const x = R.range(2, n - 3), y = R.range(2, n - 3); shrooms.push({ x, y, a: arr[(y | 0) * n + (x | 0)] + R.range(0.2, 1.2), r: R.range(1.2, 2.2) * s, c: cap }); }
        shrooms.sort((a, b) => a.y - b.y);
      }
      // a click adds a ring: the arrival times are worked out again and each mushroom keeps its own delay (no draws from R)
      function addRing(x, y, age) {
        const old = Float32Array.from(arr);
        rings.push({ x, y, t0: age, v: 3 * s });
        for (let yy = 0; yy < n; yy++) for (let xx = 0; xx < n; xx++) { const i = yy * n + xx; arr[i] = Math.min(arr[i], age + (Math.hypot(xx - x, yy - y) + nz.n2(xx * 0.06, yy * 0.06) * 5 * s) / (3 * s)); }
        for (const m of shrooms) { const i = (m.y | 0) * n + (m.x | 0); m.a = arr[i] + (m.a - old[i]); }
      }
      return (t) => {
        if (t - born > 40) { plant(); born = born < -50 ? t - 6 : t; }
        const age = t - born;
        // at most three new rings a frame (a replayed burst spreads over a few frames), and 24 visitor rings a lawn
        const tps = g.input.taps(); for (const tp of tps) pend.push(tp);
        for (let k = 0; k < 3 && pend.length; k++) { const tp = pend.shift(); if (rings.length < 28) addRing(tp.x * n, tp.y * n, age); }
        for (let i = 0; i < n * n; i++) {
          const D = age - arr[i], st = stripe[i];
          d[i] = D < 0 ? lawn[st] : D < 2 ? lush[st] : D < 4.5 ? dead[st] : D < 9 ? (B4[((i / n | 0) & 3) * 4 + (i % n & 3)] < (D - 4.5) / 4.5 ? heal[st] : dead[st]) : heal[st];
        }
        for (const m of shrooms) {
          const D = age - m.a;
          if (D < 0 || D > 4) continue;
          const r = m.r * Math.min(1, D * 2, (4 - D) * 1.2);
          if (r < 0.5) continue;
          disc(g, m.x + s * 0.6, m.y + s * 0.6, r, rgb(20, 60, 24));
          disc(g, m.x, m.y, r, m.c); put(g, m.x - r * 0.35, m.y - r * 0.35, mix(m.c, WHITE, 0.6));
          if (m.c === rgb(200, 50, 40) && r > 1.5) put(g, m.x + r * 0.3, m.y, WHITE);
        }
        if (hour === 'Dusk') for (let k = 0; k < 24; k++) { const on = Math.sin(t * 1.3 + k * 2.1) > 0.4; if (on) put(g, (K.hash(k, 1) * n + Math.sin(t * 0.3 + k) * 3 * s + n) % n, (K.hash(k, 2) * n + Math.cos(t * 0.25 + k) * 3 * s + n) % n, rgb(220, 255, 120)); }
        if (hour === 'Autumn') for (let k = 0; k < 30; k++) { const x = K.hash(k, 3) * n, y = K.hash(k, 4) * n; put(g, x, y, [rgb(200, 90, 30), rgb(230, 170, 40), rgb(160, 50, 30)][k % 3]); if (s > 1.5) put(g, x + 1, y, [rgb(200, 90, 30), rgb(230, 170, 40), rgb(160, 50, 30)][k % 3]); }
        if (age > 38.5) U.fadePx(d, (40 - age) / 1.5);
      };
  }
  // Fairy Ring: the reworked look, an extra mode
  function fairyNew(R, U, g) {
      const { n, d } = g, s = n / 50, nz = U.noise(R), arr = new Float32Array(n * n), stripe = new Uint8Array(n * n);
      const LAWNS = [[['#46903c', '#509c42'], ['#1e6428', '#28742e'], ['#aa965a', '#968250'], ['#64964a', '#6ea04c']], [['#5aa04a', '#64ac50'], ['#2a7a34', '#348a3c'], ['#b4a070', '#a08c60'], ['#78aa5a', '#82b464']], [['#3a7a5a', '#428460'], ['#1a5a3a', '#226444'], ['#9a8a6a', '#8a7a5a'], ['#5a8a6a', '#64946e']]];
      const [lawn, lush, dead, heal] = R.pick(LAWNS).map(p => p.map(hx));
      const CAPS = ['#f0ecdc', '#aa7850', '#c83228', '#e6be78', '#8a5aa0'].map(hx), cap = R.pick(CAPS), sw = R.pick([4, 5, 6]) * s, diag = R.bool(0.3);
      T(g, 'Look', 'Chunky'); T(g, 'Lawn', diag ? 'Diagonal Stripes' : 'Striped'); T(g, 'Caps', ['White', 'Brown', 'Red', 'Tan', 'Violet'][CAPS.indexOf(cap)]);
      const hourN = T(g, 'Hour', alt(g, 'Day', [['Day', 3], ['Dusk', 1], ['Autumn', 1]]));
      if (hourN !== 'Day') for (const A of [lawn, lush, dead, heal]) for (let k = 0; k < 2; k++) A[k] = hourN === 'Dusk' ? mix(shade(A[k], 0.5), rgb(30, 30, 80), 0.25) : mix(A[k], rgb(170, 120, 50), 0.3);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) stripe[y * n + x] = (((diag ? x + y : x) / sw) | 0) & 1;
      let rings = [], shrooms = [], born = -99;
      function build() {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let best = Infinity;
          for (const r of rings) best = Math.min(best, r.t0 + (Math.hypot(x - r.x, y - r.y) + nz.n2(x * 0.06, y * 0.06) * 3 * s) / r.v);
          arr[y * n + x] = best;
        }
        shrooms = [];
        for (let k = 0; k < 900 && shrooms.length < 110; k++) { const x = R.range(2, n - 3), y = R.range(2, n - 3); shrooms.push({ x, y, a: arr[(y | 0) * n + (x | 0)] + R.range(0.2, 1.2), r: R.range(1, 1.8) * s }); }
        shrooms.sort((a, b) => a.y - b.y);
      }
      function plant() { rings = Array.from({ length: R.int(2, 4) }, () => ({ x: R.range(0.15, 0.85) * n, y: R.range(0.15, 0.85) * n, t0: R.range(0, 6), v: R.range(2.2, 3.5) * s })); build(); }
      return (t) => {
        if (t - born > 40) { plant(); born = born < -50 ? t - 6 : t; }
        const age = t - born;
        let grew = false;
        for (const tp of g.input.taps()) { rings.push({ x: tp.x * n, y: tp.y * n, t0: age, v: R.range(2.5, 3.5) * s }); if (rings.length > 8) rings.shift(); grew = true; }
        if (grew) build();   // once per frame however many clicks arrive
        for (let i = 0; i < n * n; i++) {
          const D = age - arr[i], st = stripe[i];
          d[i] = D < 0 ? lawn[st] : D < 2 ? lush[st] : D < 4.5 ? dead[st] : D < 9 ? (K.hash(i % n, i / n | 0, 1) < (D - 4.5) / 4.5 ? heal[st] : dead[st]) : heal[st];
        }
        for (const m of shrooms) {
          const D = age - m.a;
          if (D < 0 || D > 4) continue;
          const r = m.r * Math.min(1, D * 2, (4 - D) * 1.2);
          if (r < 0.5) continue;
          K.ell(g, m.x + 0.6, m.y + 0.6, r, r, shade(lush[0], 0.6));
          K.ell(g, m.x, m.y, r, r, (x, y, nx, ny) => nx < -0.2 && ny < -0.2 ? mix(cap, WHITE, 0.5) : cap);
          if (cap === CAPS[2] && r > 1.2) put(g, m.x + r * 0.3, m.y, WHITE);
        }
        if (hourN === 'Dusk') for (let k = 0; k < 14; k++) if (Math.sin(t * 1.3 + k * 2.1) > 0.4) put(g, (K.hash(k, 1) * n + Math.sin(t * 0.3 + k) * 2 + n) % n, (K.hash(k, 2) * n + Math.cos(t * 0.25 + k) * 2 + n) % n, rgb(220, 255, 120));
        if (age > 38.5) U.fadePx(d, (40 - age) / 1.5);
      };
  }

  add({
    name: 'Cactus Garden', seed: 3, sizes: [40, 50], fps: 12,
    interactive: 'Click a cactus to make it flower.',
    recipe: 'A desert garden under a banded sky: saguaros with ribbed arms, round barrels, organ pipes and prickly-pear paddles, each crisply outlined with white spines and the odd flower, mesas on the horizon. The sun or moon crosses as the sky changes. Click a cactus to make it flower.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#1a120a'), seed = R.int(1, 99);
      const SK = R.pick([['#ff9a5a', '#ffc07a', '#ffe0a0', '#7a3a3a'], ['#5aa8e8', '#8cc8f0', '#d0ecff', '#a85a3a'], ['#2a1a4a', '#5a2a6a', '#c85a7a', '#2a1a2a'], ['#0a1430', '#142050', '#24306a', '#141020']]).map(hx);
      const night = SK[0] === hx('#0a1430'), sand = K.tones(hx(R.pick(['#e0b070', '#d89a5a', '#c8a888', '#e8c890']))), horizon = Math.round(n * R.range(0.55, 0.62));
      const GREENS = [['#3a8a4a', '#5ab05a', '#24603a'], ['#5a9a3a', '#7ac04a', '#3a6a24'], ['#4a8a7a', '#6ab09a', '#2a5a4a']].map(a => a.map(hx));
      // under the night sky the sand and the cacti take the moonlight: a step darker and cooler
      if (night) { for (let i = 0; i < sand.length; i++) sand[i] = mix(shade(sand[i], 0.55), hx('#3a4a7a'), 0.25); for (const G of GREENS) for (let i = 0; i < 3; i++) G[i] = mix(shade(G[i], 0.7), hx('#2a3a6a'), 0.15); }
      const FLOW = ['#ff5a8a', '#ffd23a', '#ff3a3a', '#ffffff', '#c85aff'].map(hx);
      const stoneC = ['#5a4a3e', '#8a7866', '#b8a68e'].map(hx);
      const pm = R.int(3, 5), plants = Array.from({ length: pm }, (_, k) => ({ kind: R.pick(['saguaro', 'saguaro', 'barrel', 'pear', 'organ']), x: n * (0.12 + 0.76 * (k + R.range(0.25, 0.75)) / pm), base: horizon + R.range(0.15, 0.4) * (n - horizon), h: R.range(0.2, 0.46) * n, c: R.pick(GREENS), flower: R.bool(0.35) ? R.pick(FLOW) : 0, arms: [R.range(0.3, 0.6), R.range(0.25, 0.55)].map((v, i) => ({ v, side: i ? 1 : -1, len: R.range(0.15, 0.3) })) })).sort((a, b) => a.base - b.base);
      T(g, 'Sky', ['Sunrise', 'Day', 'Dusk', 'Night'][['#ff9a5a', '#5aa8e8', '#2a1a4a', '#0a1430'].map(hx).indexOf(SK[0])]); T(g, 'Cacti', pm); T(g, 'In Flower', plants.filter(p => p.flower).length);
      // new traits: the land behind (mesas, dunes or mountains) and where the sun or moon starts its arc
      const land = T(g, 'Horizon', alt(g, 'Mesas', [['Mesas', 3], ['Dunes', 1], ['Mountains', 1]])), arcOff = { Rising: 0, High: 0.35, Setting: 0.7 }[T(g, 'Sun', alt(g, 'Rising', [['Rising', 2], ['High', 1], ['Setting', 1]]))];
      // a ribbed vertical stem: columns alternate lit and shaded, with a dark edge and white spines
      function stem(x0, y0, w, h, c) {
        for (let y = Math.round(y0); y < y0 + h; y++) for (let x = Math.round(x0 - w); x < x0 + w; x++) {
          const u = (x - (x0 - w)) / (2 * w), rib = Math.round(u * 2 * w) % 2;
          Lr.d[y * n + x] = u < 0.2 ? c[2] : u > 0.75 ? c[2] : rib ? c[0] : c[1];
          if (K.hash(x, y, seed) < 0.05) Lr.d[y * n + x] = hx('#f2f0e0');
        }
        K.ell(Lr, x0, y0, w, w * 0.9, (x, y, nx, ny) => ny < 0 ? (nx < 0 ? c[1] : c[0]) : 0);
      }
      return (t) => {
        for (const tp of g.input.taps()) for (const p of plants) if (Math.abs(tp.x * n - p.x) < 5 * s && tp.y * n > p.base - p.h && tp.y * n < p.base) p.flower = p.flower ? 0 : R.pick(FLOW);
        K.bands(g, 0, horizon, SK.slice(0, 3));
        const a = (t * 0.02 + arcOff) % 1, bx = a * n, by = horizon * (0.8 - Math.sin(a * Math.PI) * 0.6);
        K.ell(g, bx, by, 3 * s, 3 * s, night ? hx('#f4f0d8') : hx('#fff2b0'));
        if (night) for (let k = 0; k < 30; k++) put(g, K.hash(k, 1, seed) * n, K.hash(k, 2, seed) * horizon * 0.9, WHITE);
        // mesas
        for (let x = 0; x < n; x++) {
          const h = land === 'Dunes' ? Math.round((2.5 + 2 * Math.sin(x * 0.16 + seed) + Math.sin(x * 0.37)) * s) : land === 'Mountains' ? Math.round((4 + 7 * Math.abs(((x * 0.09 + seed * 0.1) % 2) - 1) + 2 * K.hash(x >> 2, 6, seed)) * s) : Math.round((K.hash(x >> 3, 5, seed) > 0.5 ? 6 : 2) * s + Math.sin(x * 0.1) * s);
          for (let y = horizon - h; y < horizon; y++) d[y * n + x] = land === 'Dunes' ? (y === horizon - h ? mix(SK[3], sand[2], 0.55) : mix(SK[3], sand[2], 0.35)) : land === 'Mountains' && y < horizon - h + 2 * s && h > 8 * s ? mix(SK[3], WHITE, 0.45) : SK[3];
        }
        for (let y = horizon; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (y - horizon) % 5 === 0 && ((x + y) % 9) < 5 ? sand[1] : y < horizon + 2 ? sand[3] : sand[2];
        // stones scattered in the foreground, lit from above
        for (let k = 0; k < 3; k++) { const x = (0.12 + 0.76 * (k + K.hash(k, 11, seed)) / 3) * n, y = horizon + (0.62 + 0.3 * K.hash(k, 12, seed)) * (n - horizon), r = (1.6 + 1.2 * K.hash(k, 13, seed)) * s; K.ell(g, x + 0.8 * s, y + 0.6 * s, r * 1.1, r * 0.55, shade(sand[2], 0.7)); K.ell(Lr, x, y, r, r * 0.62, (xx, yy, nx, ny) => ny < -0.25 && nx < 0.3 ? stoneC[2] : nx > 0.35 || ny > 0.45 ? stoneC[0] : stoneC[1]); K.commit(g, Lr, ink); }
        // every cactus casts a flat shadow across the sand, away from the sun (or the moon)
        for (const p of plants) { const dir = p.x >= bx ? 1 : -1, len = Math.min(p.h * 0.6, 3 * s + p.h * 0.5 * (1 - Math.sin(a * Math.PI))), w = p.kind === 'barrel' ? p.h * 0.28 : p.kind === 'pear' ? p.h * 0.3 : 2.2 * s; K.ell(g, p.x + dir * len * 0.5, p.base + 0.3 * s, len * 0.5 + w, 1.5 * s, (xx, yy) => yy >= horizon ? shade(d[yy * n + xx], 0.72) : 0); }
        for (const p of plants) {
          const sw = Math.max(1.5, 2.2 * s), sc = p.h / n;
          if (p.kind === 'saguaro') {
            stem(p.x, p.base - p.h, sw, p.h, p.c);
            for (const ar of p.arms) { const ay = p.base - p.h * ar.v, ax = p.x + ar.side * (sw + 2.5 * s); rect(Lr, Math.min(p.x, ax), ay, Math.abs(ax - p.x), 2 * sw * 0.7, p.c[1]); stem(ax, ay - p.h * ar.len, sw * 0.8, p.h * ar.len + 1.5 * sw, p.c); }
          } else if (p.kind === 'barrel') {
            const r = p.h * 0.28; K.ell(Lr, p.x, p.base - r, r, r * 1.05, (x, y, nx, ny) => { const rib = Math.round((nx + 1) * r) % 2; return K.hash(x, y, seed) < 0.06 ? hx('#f2f0e0') : nx > 0.5 ? p.c[2] : rib ? p.c[0] : p.c[1]; });
          } else if (p.kind === 'pear') {
            const pads = [[0, -0.3, 0.22], [-0.25, -0.6, 0.17], [0.22, -0.65, 0.16], [0.02, -0.9, 0.13]];
            for (const [dx, dy, r] of pads) K.ell(Lr, p.x + dx * p.h, p.base + dy * p.h, r * p.h * 0.75, r * p.h, (x, y, nx, ny) => K.hash(x, y, seed) < 0.08 ? hx('#f2f0e0') : nx > 0.45 ? p.c[2] : ny < -0.4 ? p.c[1] : p.c[0]);
          } else for (let k = -2; k <= 2; k++) stem(p.x + k * sw * 1.6, p.base - p.h * (1 - Math.abs(k) * 0.18), sw * 0.75, p.h * (1 - Math.abs(k) * 0.18), p.c);
          K.commit(g, Lr, ink);
          if (p.flower) { const fy = p.base - p.h - (p.kind === 'barrel' ? -p.h * 0.45 : 1); for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 0]]) put(g, p.x + dx, fy + dy, dx === 0 && dy === 0 ? hx('#ffe060') : p.flower); }
        }
      };
    },
  });

  add({
    name: 'Bonsai', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click the foliage to prune it; it grows back.',
    recipe: 'A bonsai in a glazed pot, big in the frame: a twisting tapered trunk carrying cloud-pads of foliage in two or three flat tones, as a juniper, a pine, a red maple or a cherry in blossom, whose leaves and petals drift down. The pads slowly fill out. Click to prune them.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#120c08'), seed = R.int(1, 99);
      const TREE = R.pick([{ k: 'juniper', c: ['#2e6a3a', '#4a8a46', '#7ab05a'], fall: 0 }, { k: 'pine', c: ['#24503a', '#3a7048', '#5a9a5a'], fall: 0 }, { k: 'maple', c: ['#8a1e1e', '#c8382a', '#f0703a'], fall: 1 }, { k: 'cherry', c: ['#c86a8a', '#f09ab8', '#ffd0e0'], fall: 1 }]);
      const leaf = TREE.c.map(hx), bark = K.tones(hx(R.pick(['#6a4a34', '#5a4a40', '#7a5a3a']))), potC = K.tones(hx(R.pick(['#3a5a8a', '#8a3a2a', '#2a2a30', '#c8b090', '#3a7a6a'])));
      const BG = R.pick([['#e8dcc0', '#d8c8a0'], ['#20242a', '#2a3038'], ['#c8d8d0', '#b0c8bc'], ['#f2c8b0', '#e0b098']]).map(hx);
      const potY = Math.round(n * 0.76), potW = n * R.range(0.24, 0.32), cx = n / 2;
      // the trunk: a wandering, tapering path; pads hang off its turns
      const pts = [[cx + R.range(-2, 2) * s, potY]];
      for (let k = 1; k <= 6; k++) { const [px, py] = pts[k - 1]; pts.push([Math.max(4 * s, Math.min(n - 4 * s, px + R.range(-5, 5) * s)), py - R.range(3, 6) * s]); }
      const pads = [];
      for (let k = 2; k < pts.length; k++) { pads.push({ x: pts[k][0] + R.range(-6, 6) * s, y: pts[k][1] - s, rx: R.range(4, 8) * s, ry: R.range(2.2, 3.5) * s, cut: 0 }); if (R.bool(0.6)) pads.push({ x: pts[k][0] + R.sign() * R.range(6, 10) * s, y: pts[k][1] + R.range(-1, 3) * s, rx: R.range(3, 6) * s, ry: R.range(1.8, 3) * s, cut: 0 }); }
      const falling = [];
      T(g, 'Tree', CAP(TREE.k)); T(g, 'Pot', ['Blue', 'Red', 'Black', 'Stone', 'Celadon'][['#3a5a8a', '#8a3a2a', '#2a2a30', '#c8b090', '#3a7a6a'].map(hx).indexOf(potC[2])]); T(g, 'Wall', ['Parchment', 'Slate', 'Sage', 'Peach'][['#e8dcc0', '#20242a', '#c8d8d0', '#f2c8b0'].map(hx).indexOf(BG[0])]);
      // new traits: the style it is trained in, and what hangs behind it
      const style = T(g, 'Style', alt(g, 'Upright', [['Upright', 3], ['Windswept', 1], ['Literati', 1], ['Cascade', 0.8]])), back = T(g, 'Backdrop', alt(g, 'Plain', [['Plain', 3], ['Moon', 1], ['Scroll', 1], ['Screen', 0.8]]));
      const lean = pts[6][0] >= cx ? 1 : -1, near = y => pts.reduce((b, q) => Math.abs(q[1] - y) < Math.abs(b[1] - y) ? q : b, pts[0]);
      if (style === 'Windswept') { for (let k = 1; k < pts.length; k++) pts[k][0] = Math.max(4 * s, Math.min(n - 4 * s, pts[k][0] + lean * k * 2.2 * s)); for (const p of pads) { const q = near(p.y); p.x = q[0] + lean * Math.abs(p.x - q[0]) * 0.9; p.ry *= 0.8; } }
      if (style === 'Literati') { for (let k = 1; k < pts.length; k++) pts[k][1] = potY - (potY - pts[k][1]) * 1.28; pads.splice(0, pads.length, ...pads.slice(-2)); for (const p of pads) { const q = near(p.y * 1.0); p.y = potY - (potY - p.y) * 1.28; p.rx *= 0.8; } }
      if (style === 'Cascade') { for (let k = 3; k < pts.length; k++) { pts[k][0] = Math.max(3 * s, Math.min(n - 3 * s, pts[2][0] + lean * (k - 2) * 4.5 * s)); pts[k][1] = pts[2][1] + (k - 3) * 3.5 * s; } for (let k = 0; k < pads.length; k++) { const q = pts[Math.min(pts.length - 1, 2 + k)]; pads[k].x = q[0]; pads[k].y = q[1] - s; } }
      return (t) => {
        for (const tp of g.input.taps()) for (const p of pads) if (Math.hypot((tp.x * n - p.x) / p.rx, (tp.y * n - p.y) / p.ry) < 1.1) p.cut = Math.min(0.8, p.cut + 0.4);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y > potY + 4 * s ? BG[1] : ((x + y * 2) % 11 === 0 ? BG[1] : BG[0]);
        if (back === 'Moon') K.ell(g, n / 2 - lean * n * 0.18, n * 0.3, n * 0.2, n * 0.2, (x, y, nx, ny) => mix(BG[0], hx('#fff4d8'), nx < -0.3 && ny < -0.2 ? 0.75 : 0.6));
        if (back === 'Scroll') { const sx = Math.round(n / 2 - lean * n * 0.28), sw = Math.round(n * 0.2); rect(g, sx - sw / 2, 2 * s, sw, potY - 4 * s, hx('#efe6cc')); rect(g, sx - sw / 2 - s, 2 * s, sw + 2 * s, s, hx('#5a3a22')); rect(g, sx - sw / 2 - s, potY - 2 * s, sw + 2 * s, s, hx('#5a3a22')); for (let k = 0; k < 5; k++) rect(g, sx - 1, 6 * s + k * 3 * s, 2, 2 * s, hx('#2a2420')); rect(g, sx + sw * 0.25, potY - 6 * s, 2 * s, 2 * s, hx('#c8281e')); }
        if (back === 'Screen') for (let y = 0; y < potY + 4 * s; y++) for (let x = 0; x < n; x++) if (x % Math.round(8 * s) === 0 || y % Math.round(8 * s) === 0) d[y * n + x] = shade(BG[1], 0.82);
        // trunk and branches, tapering toward the top
        for (let k = 0; k + 1 < pts.length; k++) { const w = Math.max(1, Math.round((1 - k / pts.length) * 3.2 * s)); K.thick(Lr, pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], w, k % 2 ? bark[2] : bark[1]); }
        for (const p of pads) line(Lr, p.x, p.y + p.ry * 0.5, pts[Math.min(pts.length - 1, Math.max(0, Math.round((potY - p.y) / (5 * s))))][0], p.y + p.ry, bark[1]);
        K.commit(g, Lr, ink);
        // foliage pads: three flat tones, lit from the upper left, bumpy edge
        for (const p of pads) {
          p.cut = Math.max(0, p.cut - 0.0008);
          const g2 = 1 - p.cut + Math.sin(t * 0.1) * 0.03;
          K.ell(Lr, p.x, p.y, p.rx * g2, p.ry * g2, (x, y, nx, ny) => {
            if (nx * nx + ny * ny > 0.75 && K.hash(x, y, seed) < 0.35) return 0;
            return ny < -0.3 && nx < 0.3 ? leaf[2] : ny > 0.35 ? leaf[0] : K.hash(x >> 1, y, seed) < 0.15 ? leaf[2] : leaf[1];
          });
          K.commit(g, Lr, ink);
          if (TREE.fall && R() < 0.01) falling.push({ x: p.x + R.range(-1, 1) * p.rx, y: p.y + p.ry, c: leaf[R.int(1, 2)] });
        }
        // the pot: rim, glazed body, feet, a little moss
        rect(Lr, cx - potW, potY - s, potW * 2, 2 * s, potC[3]); rect(Lr, cx - potW * 0.92, potY + s, potW * 1.84, 4 * s, potC[2]); rect(Lr, cx - potW * 0.92, potY + 4 * s, potW * 1.84, s, potC[1]);
        rect(Lr, cx - potW * 0.8, potY + 5 * s, 2 * s, s, potC[0]); rect(Lr, cx + potW * 0.8 - 2 * s, potY + 5 * s, 2 * s, s, potC[0]);
        K.commit(g, Lr, ink);
        for (let x = Math.round(cx - potW * 0.9); x < cx + potW * 0.9; x++) if (K.hash(x, 3, seed) < 0.5) put(g, x, potY - s - 1, hx('#5a8a3a'));
        for (let k = falling.length - 1; k >= 0; k--) { const f = falling[k]; f.y += 0.25 * s; f.x += Math.sin(t * 2 + k) * 0.3; if (f.y > potY + 6 * s) { falling.splice(k, 1); continue; } put(g, f.x, f.y, f.c); }
      };
    },
  });

  add({
    name: 'Espalier', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'A fruit tree trained flat against a brick wall in a formal pattern: tiers, a fan, a candelabra or a lattice. Its shoots grow out along the wires, blossom, swell into fruit, and the season starts over.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, bg = new Uint32Array(n * n);
      const brick = R.pick([[160, 70, 50], [180, 110, 80], [130, 120, 110], [200, 170, 130]]);
      const bw = Math.round(8 * s), bh = Math.round(4 * s);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const row = (y / bh) | 0, off = row % 2 ? bw >> 1 : 0, col = ((x + off) / bw) | 0, mortar = y % bh === 0 || (x + off) % bw === 0;
        const k = 0.85 + ((row * 7 + col * 13) % 5) * 0.06;
        bg[y * n + x] = mortar ? rgb(200, 190, 170) : rgb(brick[0] * k, brick[1] * k, brick[2] * k);
      }
      const ground = Math.round(90 * s);
      for (let y = ground; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = (x * 5 + y) % 7 === 0 ? rgb(60, 44, 30) : rgb(84, 62, 42);
      let paths, born = -99, fruitC, kind;
      function design() {
        kind = R.pick(['tiers', 'fan', 'candelabra', 'lattice']);
        fruitC = R.pick([rgb(200, 40, 40), rgb(220, 200, 60), rgb(170, 200, 60), rgb(230, 120, 40)]);
        const cx = n / 2, P2 = [];
        if (kind === 'tiers') { const k = R.int(3, 4); const trunk = [[cx, ground], [cx, ground - (k * 16 + 4) * s]]; P2.push(trunk); for (let q = 0; q < k; q++) { const y = ground - (12 + q * 16) * s; P2.push([[cx, y], [cx - 40 * s, y]]); P2.push([[cx, y], [cx + 40 * s, y]]); } }
        else if (kind === 'fan') { const k = R.int(5, 8); for (let q = 0; q < k; q++) { const a = -Math.PI / 2 + (q / (k - 1) - 0.5) * 2.4; P2.push([[cx, ground], [cx + Math.cos(a) * 70 * s, ground + Math.sin(a) * 70 * s]]); } }
        else if (kind === 'candelabra') { const k = R.pick([4, 6]), y = ground - 16 * s; P2.push([[cx, ground], [cx, y]]); for (let q = 0; q < k; q++) { const x = cx + (q - (k - 1) / 2) * (70 / k) * s; P2.push([[cx, y], [x, y], [x, 12 * s]]); } }
        else { for (let q = 0; q < 5; q++) { const x = (q + 0.5) / 5 * n; P2.push([[x, ground], [x - 40 * s, ground - 40 * s * 1.6]]); P2.push([[x, ground], [x + 40 * s, ground - 40 * s * 1.6]]); } }
        paths = P2.map(pts => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, total: cum[cum.length - 1], delay: R.range(0, 3) }; });
      }
      return (t) => {
        if (t - born > 44) { design(); born = born < -50 ? t - 9 : t; }
        const age = t - born;
        d.set(bg);
        for (let k = 1; k <= 5; k++) { const y = ground - k * 16 * s + 4 * s; for (let x = 4 * s; x < n - 4 * s; x++) put(g, x, y, rgb(150, 150, 150)); }
        const bark = rgb(80, 56, 36), leaf = [rgb(50, 120, 50), rgb(90, 160, 60)];
        for (const p of paths) {
          const grown = Math.min(p.total, Math.max(0, age - p.delay) * 7.5 * s);
          let walked = 0;
          for (let i = 1; i < p.pts.length; i++) {
            const [ax, ay] = p.pts[i - 1], [bx, by] = p.pts[i], L = p.cum[i] - p.cum[i - 1];
            if (walked >= grown) break;
            const f = Math.min(1, (grown - walked) / L), ex = ax + (bx - ax) * f, ey = ay + (by - ay) * f;
            line(g, ax, ay, ex, ey, (x, y, j) => {
              rect(g, x - (s > 1 ? 1 : 0), y - (s > 1 ? 1 : 0), Math.max(2, Math.round(2 * s)), Math.max(2, Math.round(2 * s)), bark);
              if (j % Math.max(2, Math.round(2.5 * s)) === 0 && j > 2) {
                const side = (j / Math.round(3 * s)) % 2 ? 1 : -1, nx = (by - ay) / L, ny = -(bx - ax) / L;
                const lk = Math.max(1, Math.round(s)); rect(g, x + nx * side * 3 * s, y + ny * side * 3 * s, lk + 1, lk, leaf[j % 2]); rect(g, x + nx * side * 2 * s, y + ny * side * 2 * s, lk, lk, leaf[1]);
                const node = (j / Math.round(3 * s)) | 0;
                if (node % 3 === 1 && age > 20 && age < 27) put(g, x - nx * side * 2 * s, y - ny * side * 2 * s, (node + j) % 2 ? rgb(250, 220, 230) : WHITE);
                if (node % 4 === 2 && age > 26) { const r = Math.min(2.4 * s, (age - 26) * 0.25 * s); if (r > 0.6) disc(g, x - nx * side * 2.5 * s, y - ny * side * 2.5 * s + r * 0.6, r, mix(rgb(120, 170, 60), fruitC, U.clamp((age - 28) / 8))); }
              }
            });
            walked += L;
          }
        }
        if (age > 42) U.fadePx(d, 44 - age);
      };
    },
  });

  add({
    name: 'Fairy Ring', seed: 2, sizes: [100, 200], fps: 12,
    interactive: 'Click the lawn to start a new ring there.',
    recipe: 'A mown lawn from above. Rings of mushrooms spread outward from hidden centres, a lush green band at their edge and dead brown grass behind; where two rings meet they stop, and the lawn slowly heals. Click to start a ring of your own; some variations are drawn in chunkier cells with other lawns and caps.',
    make(R, U, g) {
      if (ogLook(g)) return fairyOG(R, U, g);
      return K.chunky(g, 50, g2 => { g2.trait = g.trait; return fairyNew(R, U, g2); });
    },
  });

  add({
    name: 'Meadow', seed: 0, sizes: [40, 50], fps: 12,
    interactive: 'Move the pointer through the grass and it bends away from you.',
    listens: 'Your voice or music is the wind: the louder it is, the harder the grass blows.',
    recipe: 'A wildflower meadow under a big banded sky with flat pixel clouds: tall blades of grass in front, poppies, cornflowers, daisies and buttercups as crisp sprites, smaller and paler toward the hills, butterflies over it. Gusts roll through the grass, and the pointer pushes it aside.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, seed = R.int(1, 99);
      const SK = R.pick([['#4a98e0', '#7ab8ec', '#b8dcf8'], ['#ff8a5a', '#ffb07a', '#ffe0a8'], ['#7a8a9a', '#9aa8b4', '#c0c8d0'], ['#5a6ad8', '#9a8ae0', '#f0b0c8']]).map(hx);
      const GR = R.pick([['#2e7a2e', '#4a9a3a', '#7ac04a', '#1e5a24'], ['#5a8a2a', '#7aa83a', '#a8c84a', '#3a6018'], ['#3a7a5a', '#5a9a6a', '#8ac08a', '#245a3a']]).map(hx);
      const horizon = Math.round(n * R.range(0.38, 0.5));
      const FL = { poppy: ['#e8322a', '#1a1018'], corn: ['#3a6ad8', '#1a1a50'], daisy: ['#ffffff', '#f2c230'], butter: ['#f2d23a', '#c8901a'], pink: ['#f08ab8', '#c84a7a'] };
      const kinds = R.shuffle(Object.keys(FL)).slice(0, R.int(2, 4));
      const blades = Array.from({ length: n * 2 }, () => ({ x: R.range(0, n), h: R.range(0.15, 0.4) * n, c: R.int(0, 2), ph: R.range(0, TAU) }));
      const flowers = Array.from({ length: R.int(25, 50) }, () => { const y = R.range(horizon + 2, n); return { x: R.range(0, n), y, k: R.pick(kinds), big: (y - horizon) / (n - horizon) > 0.6 }; }).sort((a, b) => a.y - b.y);
      const clouds = Array.from({ length: R.int(2, 4) }, () => ({ x: R.range(0, n), y: R.range(0.05, 0.6) * horizon, w: R.range(6, 12) * s, v: R.range(0.05, 0.15) }));
      let windPh = 0, windAmp = 1;
      T(g, 'Sky', ['Blue', 'Sunset', 'Overcast', 'Lilac'][['#4a98e0', '#ff8a5a', '#7a8a9a', '#5a6ad8'].map(hx).indexOf(SK[0])]); T(g, 'Grass', ['Green', 'Hay', 'Sage'][['#2e7a2e', '#5a8a2a', '#3a7a5a'].map(hx).indexOf(GR[0])]);
      T(g, 'Flowers', kinds.map(k => ({ poppy: 'Poppies', corn: 'Cornflowers', daisy: 'Daisies', butter: 'Buttercups', pink: 'Campion' }[k])).slice(0, 2).join(' and ')); T(g, 'Clouds', clouds.length);
      // new trait: what lies beyond the field
      const far = T(g, 'Beyond', alt(g, 'Hills', [['Hills', 3], ['Mountains', 1], ['Sea', 1], ['Windmill', 0.6]])), farC = mix(SK[1], GR[3], 0.45), snowC = mix(SK[2], WHITE, 0.6);
      const flies = Array.from({ length: R.int(1, 4) }, () => ({ x: R.range(0, n), y: R.range(horizon, n * 0.8), c: hx(R.pick(['#ffffff', '#f2c230', '#5ac8ff', '#ff8a2a'])), ph: R.range(0, TAU) }));
      return (t) => {
        K.bands(g, 0, horizon, SK);
        for (const c of clouds) { const cx = ((c.x + t * c.v * s) % (n + c.w * 2)) - c.w; K.ell(g, cx, c.y, c.w, c.w * 0.35, (x, y, nx, ny) => ny > 0.2 ? mix(SK[2], WHITE, 0.4) : WHITE); K.ell(g, cx + c.w * 0.3, c.y - c.w * 0.2, c.w * 0.5, c.w * 0.3, WHITE); }
        // what lies beyond: mountains or the sea behind the far hill, or a windmill on it
        if (far === 'Mountains') for (let x = 0; x < n; x++) { const h = Math.round((5 + 6 * Math.abs(((x * 0.07 + seed * 0.13) % 2) - 1) + 1.5 * Math.sin(x * 0.31)) * s); for (let y = horizon - h; y < horizon; y++) d[y * n + x] = y < horizon - h + 1.5 * s && h > 7 * s ? snowC : farC; }
        if (far === 'Sea') for (let y = horizon - Math.round(4 * s); y < horizon; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((x + y * 3 + (t * 2 | 0)) % 13 === 0) ? mix(SK[2], WHITE, 0.5) : mix(SK[0], hx('#1a4a8a'), 0.5);
        // far hill and the field
        for (let x = 0; x < n; x++) { const hy = horizon - Math.round((Math.sin(x * 0.08 + seed) * 0.5 + 0.5) * 3 * s); for (let y = hy; y < n; y++) d[y * n + x] = y < horizon + 2 ? GR[3] : (y - horizon) % 4 === 0 && ((x + y) % 7) < 3 ? GR[0] : GR[1]; }
        if (far === 'Windmill') {
          const mx = Math.round(n * 0.72), my = horizon - Math.round(3 * s), mc = shade(GR[3], 0.6);
          for (let q = 0; q < 8 * s; q++) rect(g, mx - Math.round((1.6 - q / (8 * s)) * 1.5 * s), my - q, Math.round((1.6 - q / (8 * s)) * 3 * s) + 1, 1, mc);
          const hy = my - 8 * s, a0 = t * 0.6; put(g, mx, hy, WHITE);
          for (let k = 0; k < 4; k++) { const a = a0 + k * Math.PI / 2; line(g, mx, hy, mx + Math.cos(a) * 6 * s, hy + Math.sin(a) * 6 * s, mix(mc, WHITE, 0.35)); }
        }
        // Listen: the room's loudness is the wind; it pushes the gusts along faster and bends the grass further
        const loud = g.input.listening ? g.input.level : 0;
        windPh += loud * 0.25; windAmp += ((1 + loud * 1.6) - windAmp) * 0.15;
        const gust = t * 0.8 + windPh, px = g.input.inside ? g.input.x * n : -99, py = g.input.inside ? g.input.y * n : -99;
        for (const f of flowers) {
          const lean = Math.sin(gust - f.x * 0.12) * 1.2 * windAmp + (Math.abs(f.x - px) < 6 * s && Math.abs(f.y - py) < 8 * s ? Math.sign(f.x - px) * 2 : 0), c = FL[f.k].map(hx);
          const fx = Math.round(f.x + lean), fy = Math.round(f.y - (f.big ? 4 : 2) * s);
          line(g, f.x, f.y, fx, fy, GR[0]);
          if (f.big) { put(g, fx, fy - 1, c[0]); put(g, fx - 1, fy, c[0]); put(g, fx + 1, fy, c[0]); put(g, fx, fy + 1, c[0]); put(g, fx, fy, c[1]); if (s > 1.1) { put(g, fx - 1, fy - 1, c[0]); put(g, fx + 1, fy + 1, c[0]); } }
          else put(g, fx, fy, c[0]);
        }
        // tall blades in front, bending with the gusts and away from the pointer
        for (const b of blades) {
          const push = Math.abs(b.x - px) < 7 * s && py > n - b.h - 4 * s ? Math.sign(b.x - px) * 4 * s : 0;
          const bend = Math.sin(gust - b.x * 0.12 + b.ph * 0.3) * 2.5 * s * windAmp + push;
          for (let q = 0; q < b.h; q++) { const u = q / b.h; put(g, b.x + bend * u * u, n - 1 - q, b.c === 2 ? GR[2] : u > 0.7 ? GR[2] : GR[b.c]); }
        }
        for (const f of flies) { f.x += Math.sin(t * 0.5 + f.ph) * 0.3; f.y += Math.cos(t * 0.7 + f.ph) * 0.2; f.x = (f.x + n) % n; const flap = (t * 10 + f.ph | 0) & 1; put(g, f.x, f.y, f.c); put(g, f.x + 1, f.y - flap, f.c); put(g, f.x - 1, f.y - flap, f.c); }
      };
    },
  });

  add({
    name: 'Fiddleheads', seed: 4, sizes: [100, 200], fps: 12,
    recipe: 'Fern fronds rise from a crown as tight spirals, each a coiled crozier that unrolls from the base upward, its leaflets opening as the coil passes them, until the whole fern stands open; then the next spring begins.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100;
      const bg = rows(n, R.pick([[30, 50, 40], [40, 46, 36], [20, 36, 40]]), [12, 18, 14]);
      const young = rgb(170, 210, 90), old = rgb(60, 130, 50), fuzz = rgb(150, 110, 70);
      let fronds, born = -99;
      function sprout() {
        const m = R.int(5, 7);
        fronds = Array.from({ length: m }, (_, k) => ({ a: -Math.PI / 2 + (k / (m - 1) - 0.5) * 1.5 + R.range(-0.1, 0.1), N: R.int(36, 44), ds: R.range(2.1, 2.5) * s, t0: R.range(0, 10), rate: R.range(1.6, 2.4), lean: R.range(0.015, 0.03) * ((k / (m - 1) - 0.5) < 0 ? -1 : 1) }));
      }
      return (t) => {
        if (t - born > 44) { sprout(); born = t; }
        const age = t - born;
        for (let y = 0; y < n; y++) d.fill(bg[y], y * n, y * n + n);
        for (let y = Math.round(88 * s); y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (x * 7 + y * 3) % 9 === 0 ? rgb(70, 50, 30) : rgb(46, 34, 24);
        const cx = n / 2, cy = 88 * s;
        for (const F of fronds) {
          const front = Math.max(0, (age - F.t0) * F.rate);
          let x = cx, y = cy, a = F.a;
          const pts = [];
          for (let i = 0; i < F.N; i++) {
            const open = i < front, coil = 0.55 / Math.max(0.6, (F.N - i) * 0.12) + 0.08;
            a += open ? F.lean * (1 + i * 0.03) : coil * (F.lean < 0 ? -1 : 1);
            x += Math.cos(a) * F.ds; y += Math.sin(a) * F.ds;
            pts.push([x, y, a, open, i]);
          }
          let px = cx, py = cy;
          for (const [x2, y2, a2, open, i] of pts) {
            const c = mix(young, old, U.clamp(age * 0.03 - i * 0.01));
            line(g, px, py, x2, y2, c);
            if (!open) { if (i % 2) put(g, x2 + Math.cos(a2 + 1.6) * s, y2 + Math.sin(a2 + 1.6) * s, fuzz); }
            else {
              const op = U.clamp((front - i) / 3), len = Math.sin(Math.PI * Math.min(1, (i + 2) / F.N)) * 13 * s * op;
              if (i % 2 === 0 && len > 0.8) for (const sd of [1, -1]) { const pa = a2 + sd * (1.1 - 0.4 * op), ex = x2 + Math.cos(pa) * len, ey = y2 + Math.sin(pa) * len; line(g, x2, y2, ex, ey, c); put(g, (x2 + ex) / 2 + Math.cos(pa + sd) * s, (y2 + ey) / 2 + Math.sin(pa + sd) * s, c); }
            }
            px = x2; py = y2;
          }
        }
        if (age > 42) U.fadePx(d, 44 - age);
      };
    },
  });

  add({
    name: 'Allotment', seed: 4, sizes: [100, 200], fps: 12,
    recipe: 'Vegetable beds from above: cabbages, lettuces, carrots, tomatoes and onions in rows. Each bed grows, is harvested row by row, dug over dark and sown again, while a sprinkler darkens the soil in passing.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, beds = [], B = R.int(3, 4), gap = 5 * s, bh = (n - gap * (B + 1)) / B;
      const CROPS = ['cabbage', 'lettuce', 'carrot', 'tomato', 'onion', 'red'];
      for (let k = 0; k < B; k++) beds.push({ y: gap + k * (bh + gap), crop: R.pick(CROPS), t0: R.range(-30, 0), rows: R.int(2, 3) });
      const wet = new Float32Array(n * n);
      const soil = [rgb(90, 60, 40), rgb(70, 46, 30)], path = rgb(190, 180, 160), path2 = shade(path, 0.85);
      // [dug][furrow][wetness 0..4]
      const SOIL = [0, 1].map(dug => [0, 1].map(fu => Array.from({ length: 5 }, (_, w) => shade(soil[fu], (dug ? 0.7 : 1) * (1 - w / 4 * 0.35)))));
      return (t, dt) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (x * 3 + y * 7) % 11 === 0 ? path2 : path;
        // the sprinkler sweeps a slow arc
        const sa = Math.sin(t * 0.3) * 1.2, sx = n * 0.5, sy = n * 0.98;
        for (let r = 0; r < n * 0.9; r += 1.5) { const x = sx + Math.sin(sa) * r, y = sy - Math.cos(sa) * r; if (x >= 0 && y >= 0 && x < n && y < n) for (let q = -2; q <= 2; q++) { const xx = (x + q) | 0; if (xx >= 0 && xx < n) wet[(y | 0) * n + xx] = 1; } }
        for (const b of beds) {
          const cyc = ((t - b.t0) % 40) / 40, grow = U.clamp(cyc / 0.6), harvest = U.clamp((cyc - 0.65) / 0.15), y0 = b.y, dug = cyc > 0.8 && cyc < 0.9 ? 1 : 0, fRow = Math.max(1, Math.round(bh / b.rows / 2));
          for (let y = Math.floor(y0); y < y0 + bh; y++) for (let x = Math.floor(gap); x < n - gap; x++) {
            const i = y * n + x, furrow = ((y - y0) % fRow) === 0 ? 1 : 0, w = wet[i];
            d[i] = SOIL[dug][furrow][w > 0.05 ? Math.min(4, 1 + (w * 3.99) | 0) : 0];
          }
          const rh = bh / b.rows, sp = rh * 0.9;
          for (let r = 0; r < b.rows; r++) {
            const yy = y0 + rh * (r + 0.5);
            if (harvest > (r + 1) / b.rows - 0.001 && cyc < 0.92) continue;
            for (let x = gap + sp / 2; x < n - gap; x += sp) {
              const gr = cyc > 0.92 ? 0.08 : grow, R0 = rh * 0.42 * gr;
              if (R0 < 0.8) { put(g, x, yy, rgb(120, 180, 80)); continue; }
              if (b.crop === 'cabbage') { disc(g, x, yy, R0, rgb(70, 120, 110)); disc(g, x, yy, R0 * 0.7, rgb(110, 160, 140)); disc(g, x - R0 * 0.2, yy - R0 * 0.2, R0 * 0.35, rgb(170, 210, 180)); }
              else if (b.crop === 'lettuce' || b.crop === 'red') { const c = b.crop === 'red' ? [rgb(130, 40, 60), rgb(170, 70, 90)] : [rgb(90, 170, 60), rgb(150, 210, 90)]; for (let q = 0; q < 10; q++) { const a = q / 10 * TAU; disc(g, x + Math.cos(a) * R0 * 0.55, yy + Math.sin(a) * R0 * 0.55, R0 * 0.5, c[q % 2]); } disc(g, x, yy, R0 * 0.4, c[1]); }
              else if (b.crop === 'carrot') { for (let q = 0; q < 7; q++) { const a = q / 7 * TAU + Math.sin(t + x) * 0.1; line(g, x, yy, x + Math.cos(a) * R0, yy + Math.sin(a) * R0, q % 2 ? rgb(80, 150, 50) : rgb(110, 180, 60)); } if (gr > 0.9) put(g, x, yy, rgb(240, 130, 30)); }
              else if (b.crop === 'tomato') { disc(g, x, yy, R0, rgb(50, 110, 40)); if (gr > 0.6) for (let q = 0; q < 4; q++) put(g, x + Math.cos(q * 1.9) * R0 * 0.6, yy + Math.sin(q * 1.9) * R0 * 0.6, mix(rgb(120, 170, 60), rgb(220, 40, 30), U.clamp((gr - 0.6) * 2.5))); }
              else { for (let q = 0; q < 4; q++) put(g, x + (q - 1.5) * s * 0.8, yy - (q % 2) * s, rgb(120, 170, 90)); disc(g, x, yy, Math.max(0.8, R0 * 0.35), rgb(230, 220, 190)); }
            }
          }
        }
        for (let i = 0; i < wet.length; i++) if (wet[i] > 0) wet[i] = Math.max(0, wet[i] - dt * 0.05);
        put(g, n * 0.5, n * 0.98, rgb(200, 200, 210));
      };
    },
  });

  add({
    name: 'Raked Gravel', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Drag across the gravel to rake your own grooves.',
    recipe: 'A dry garden from above: pale gravel raked into grooves that ring each mossy stone and run straight between them, while a rake slowly redraws a stretch at a time. Drag across it to rake your own lines; left alone, it smooths them back.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, seed = R.int(1, 99);
      const GV = R.pick([['#e8e4d8', '#c8c2b2', '#a8a292'], ['#d8dcd8', '#b0b6b2', '#8a908c'], ['#e8dcc0', '#c8b898', '#a89878'], ['#3a3a40', '#2a2a30', '#1c1c22']]).map(hx);
      const stones = Array.from({ length: R.int(2, 5) }, () => ({ x: R.range(0.15, 0.85) * n, y: R.range(0.15, 0.85) * n, r: R.range(2.5, 5.5) * s, c: K.tones(hx(R.pick(['#6a6a72', '#7a6a5a', '#4a4a50', '#8a8478']))), moss: R.bool(0.6) }));
      const straight = R.pick(['h', 'v', 'd']), gap = Math.max(2, Math.round(2 * s));
      // the groove phase of every cell: rings round the nearest stone, straight lines elsewhere
      const base = new Float32Array(n * n), user = new Float32Array(n * n).fill(-1), age = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let best = 1e9, ph = 0;
        for (const st of stones) { const dd = Math.hypot(x + 0.5 - st.x, y + 0.5 - st.y) - st.r; if (dd < best) { best = dd; ph = dd; } }
        base[y * n + x] = best < 7 * s ? ph : straight === 'h' ? y : straight === 'v' ? x : (x + y) * 0.7;
      }
      let lx = -1, ly = -1, rk = 0;
      T(g, 'Gravel', ['White', 'Grey', 'Sand', 'Charcoal'][['#e8e4d8', '#d8dcd8', '#e8dcc0', '#3a3a40'].map(hx).indexOf(GV[0])]); T(g, 'Stones', stones.length); T(g, 'Raked', { h: 'Across', v: 'Down', d: 'Diagonal' }[straight]); T(g, 'Moss', stones.filter(st => st.moss).length ? 'Yes' : 'No');
      // new traits: what the season has dropped on the gravel, and an ornament at the edge
      const fall = T(g, 'Season', alt(g, 'Bare', [['Bare', 3], ['Maple Leaves', 1], ['Cherry Petals', 1], ['First Snow', 0.6]])), orn = T(g, 'Ornament', alt(g, 'None', [['None', 3], ['Stone Lantern', 1], ['Water Basin', 1]]));
      const ox = n * (stones[0] && stones[0].x < n / 2 ? 0.86 : 0.14), oy = n * 0.84, FALLC = { 'Maple Leaves': ['#c8321e', '#e8622a', '#a81e1e'], 'Cherry Petals': ['#f8c8d8', '#ffffff', '#f0a8c0'], 'First Snow': ['#ffffff', '#f0f4f8', '#e0e8f0'] }[fall];
      function rake(x0, y0, x1, y1) {
        const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
        if (len < 0.3) return;
        const ux = dx / len, uy = dy / len, w = 3.5 * s;
        for (let y = Math.max(0, Math.floor(Math.min(y0, y1) - w)); y <= Math.min(n - 1, Math.ceil(Math.max(y0, y1) + w)); y++) for (let x = Math.max(0, Math.floor(Math.min(x0, x1) - w)); x <= Math.min(n - 1, Math.ceil(Math.max(x0, x1) + w)); x++) {
          const px = x + 0.5 - x0, py = y + 0.5 - y0, along = px * ux + py * uy, across = px * uy - py * ux;
          if (along < -1 || along > len + 1 || Math.abs(across) > w) continue;
          user[y * n + x] = across + 50; age[y * n + x] = 0;
        }
      }
      return (t) => {
        // the pointer rakes while pressed; with no pointer, a slow rake wanders
        if (g.input.down) { const x = g.input.x * n, y = g.input.y * n; if (lx >= 0) rake(lx, ly, x, y); lx = x; ly = y; }
        else lx = -1;
        if (!g.input.inside) { const a = t * 0.15, x = n / 2 + Math.cos(a) * n * 0.35, y = n / 2 + Math.sin(a * 1.3) * n * 0.35; if (rk) rake(rk[0], rk[1], x, y); rk = [x, y]; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (user[i] >= 0) { age[i] += 1; if (age[i] > 400 + K.hash(x, y, seed) * 200) user[i] = -1; }
          const ph = user[i] >= 0 ? user[i] : base[i], k = Math.round(ph) % gap;
          d[i] = k === 0 ? GV[2] : k === 1 && gap > 2 ? GV[0] : GV[1];
          if (K.hash(x, y, seed) < 0.04) d[i] = GV[0];
        }
        for (const st of stones) {
          K.ell(g, st.x + 0.8 * s, st.y + 0.8 * s, st.r, st.r * 0.85, shade(GV[2], 0.75));
          K.ell(g, st.x, st.y, st.r, st.r * 0.85, (x, y, nx, ny) => st.moss && ny < -0.2 && K.hash(x, y, seed) < 0.6 ? hx(K.hash(x, y, 2) < 0.5 ? '#4a7a2a' : '#6a9a3a') : K.cel(nx, ny, [-0.5, -0.6, 0.6], st.c.slice(1)));
        }
        if (FALLC) for (let k = 0; k < (fall === 'First Snow' ? 70 : 26); k++) { const x = K.hash(k, 1, seed) * n, y = K.hash(k, 2, seed) * n, c = hx(FALLC[k % 3]); put(g, x, y, c); if (fall === 'Maple Leaves' && k % 2) put(g, x + 1, y, c); }
        if (orn === 'Stone Lantern') { const c = K.tones(hx('#8a8478')); K.ell(g, ox + s, oy + 3 * s, 3 * s, 1.2 * s, shade(GV[2], 0.7)); rect(g, ox - s, oy - 2 * s, 2 * s, 5 * s, c[1]); rect(g, ox - 2 * s, oy - 4 * s, 4 * s, 2 * s, c[2]); put(g, ox, oy - 3 * s, hx('#ffd27a')); rect(g, ox - 3 * s, oy - 5 * s, 6 * s, s, c[3]); rect(g, ox - s, oy - 6 * s, 2 * s, s, c[2]); }
        if (orn === 'Water Basin') { K.ell(g, ox + s, oy + s, 3.4 * s, 2.4 * s, shade(GV[2], 0.7)); K.ell(g, ox, oy, 3.2 * s, 2.4 * s, hx('#7a7468')); K.ell(g, ox, oy, 2.2 * s, 1.5 * s, (x, y, nx, ny) => nx < -0.3 && ny < -0.2 ? hx('#8ac0d8') : hx('#2a5a7a')); line(g, ox + 2 * s, oy - 4 * s, ox + 0.5 * s, oy - s, hx('#6a8a3a')); if (((t * 2) | 0) % 3 === 0) put(g, ox + 0.5 * s, oy - 0.5 * s, WHITE); }
        if (!g.input.inside && rk) { put(g, rk[0], rk[1], hx('#8a5a2a')); put(g, rk[0] + 1, rk[1], hx('#8a5a2a')); }
      };
    },
  });

  add({
    name: 'Sunflowers', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Move the pointer: it is the sun, and every head turns to follow it.',
    recipe: 'A row of sunflowers over one day, big heads of petals round a seed-spiral centre, broad leaves on tall stems, a field of smaller ones behind. The heads follow the sun across the sky, foreshortening as they turn. Move the pointer and you are the sun.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#1a120a'), seed = R.int(1, 99);
      const SK = R.pick([['#4a98e0', '#7ab8ec', '#b8dcf8'], ['#ff8a5a', '#ffb07a', '#ffe0a8'], ['#5a6ad8', '#9a8ae0', '#f0b0c8']]).map(hx);
      const PET = R.pick([['#f2c230', '#e8962a'], ['#f2c230', '#e8962a'], ['#e8622a', '#a8321a'], ['#fff07a', '#e0c040']]).map(hx), core = [hx('#5a3418'), hx('#3a2010'), hx('#8a5a28')];
      const horizon = Math.round(n * 0.62), m = R.int(2, 4);
      const flowers = Array.from({ length: m }, (_, k) => ({ x: n * (k + 0.5) / m + R.range(-2, 2) * s, h: R.range(0.42, 0.72) * n, r: R.range(4, 6.5) * s, ph: R.range(0, 1) }));
      let sx = n / 2, sy = n * 0.2;
      T(g, 'Sky', ['Blue', 'Sunset', 'Lilac'][['#4a98e0', '#ff8a5a', '#5a6ad8'].map(hx).indexOf(SK[0])]); T(g, 'Petals', ['Gold', 'Gold', 'Red', 'Lemon'][PET[0] === hx('#e8622a') ? 2 : PET[0] === hx('#fff07a') ? 3 : 0]); T(g, 'Heads', m);
      // new traits: what stands behind the row, and who visits the heads
      const back = T(g, 'Behind', alt(g, 'Field', [['Field', 3], ['Barn', 1], ['Fence', 1], ['Hills', 1]])), vis = T(g, 'Visitors', alt(g, 'None', [['None', 3], ['Bees', 1], ['Finches', 1]]));
      const dayOff = { Morning: 0, Noon: 0.4, Evening: 0.75 }[T(g, 'Sun', alt(g, 'Morning', [['Morning', 2], ['Noon', 1], ['Evening', 1]]))];
      return (t) => {
        const day = (t * 0.03 + dayOff) % 1;
        const tx = g.input.inside ? g.input.x * n : day * n, ty = g.input.inside ? g.input.y * n : horizon * (0.85 - Math.sin(day * Math.PI) * 0.7);
        sx += (tx - sx) * 0.1; sy += (ty - sy) * 0.1;
        K.bands(g, 0, horizon, SK);
        K.ell(g, sx, sy, 3 * s, 3 * s, hx('#fff2a8')); K.glow(g, sx, sy, 7 * s, hx('#fff2a8'), 2, 0.35);
        // the field of small flowers behind
        if (back === 'Hills') for (let x = 0; x < n; x++) { const h = Math.round((3 + 3 * Math.sin(x * 0.09 + 1) + 2 * Math.sin(x * 0.23)) * s + 2 * s); for (let y = horizon - h; y < horizon; y++) d[y * n + x] = mix(SK[1], hx('#3a6a24'), 0.5); }
        for (let y = horizon; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (y - horizon) < 3 * s ? ((x + (y & 1)) % 3 === 0 ? PET[0] : hx('#3a6a24')) : ((x + y) % 5 === 0 ? hx('#2a5a1a') : hx('#3a7a2a'));
        if (back === 'Barn') { const bx0 = Math.round(seed & 1 ? n * 0.7 : n * 0.12), bw = Math.round(9 * s), bh = Math.round(6 * s); rect(g, bx0, horizon - bh, bw, bh, hx('#a8321e')); for (let k = 0; k < bw / 2 + 1; k++) rect(g, bx0 + k - 1, horizon - bh - Math.round(k * 0.6) - 1, bw - 2 * k + 2, 1, hx('#5a2a1a')); rect(g, bx0 + bw / 2 - s, horizon - 3 * s, 2 * s, 3 * s, hx('#f2ece0')); }
        if (back === 'Fence') for (let x = 0; x < n; x++) { put(g, x, horizon + 2 * s, hx('#8a6a4a')); put(g, x, horizon + 4 * s, hx('#8a6a4a')); if (x % Math.round(5 * s) === 0) rect(g, x, horizon + s, Math.max(1, s), 4 * s, hx('#a88a62')); }
        for (const f of flowers) {
          const base = n, top = n - f.h, turn = Math.max(-1, Math.min(1, (sx - f.x) / (n * 0.4))), face = Math.cos(turn * 1.1);
          K.thick(Lr, f.x, base, f.x + turn * 2 * s, top, Math.max(1, Math.round(1.2 * s)), hx('#3a7a2a'));
          for (const side of [-1, 1]) { const ly = top + f.h * (side < 0 ? 0.45 : 0.62); K.ell(Lr, f.x + side * 3 * s, ly, 3 * s, 1.5 * s, (x, y, nx, ny) => ny < 0 ? hx('#5aa03a') : hx('#3a7a2a')); }
          K.commit(g, Lr, ink);
          const hx2 = f.x + turn * 2.5 * s, hy = top, rx = f.r * Math.max(0.35, face), ry = f.r;
          // petals: a ring of points round the head, then the seed head with its spiral
          for (let k = 0; k < 14; k++) { const a = k / 14 * TAU + t * 0.02; K.ell(Lr, hx2 + Math.cos(a) * rx * 1.25, hy + Math.sin(a) * ry * 1.25, 1.3 * s, 1.3 * s, k & 1 ? PET[0] : PET[1]); }
          K.ell(Lr, hx2, hy, rx * 0.95, ry * 0.95, (x, y, nx, ny) => { const r = Math.hypot(nx, ny), a = Math.atan2(ny, nx); return Math.sin(a * 5 + r * 12) > 0.3 ? core[0] : r > 0.8 ? core[1] : core[2]; });
          K.commit(g, Lr, ink);
        }
        if (vis === 'Bees') for (let k = 0; k < 6; k++) { const f = flowers[k % m], a = t * 2.4 + k * 1.7, x = f.x + Math.cos(a) * f.r * 1.6, y = n - f.h + Math.sin(a * 1.3) * f.r * 1.2; put(g, x, y, hx('#f2c230')); put(g, x + 1, y, hx('#1a120a')); if ((t * 16 + k | 0) & 1) put(g, x, y - 1, WHITE); }
        if (vis === 'Finches') for (let k = 0; k < Math.min(3, m); k++) { const f = flowers[k], x = Math.round(f.x + (k % 2 ? 1 : -1) * f.r * 0.6), y = Math.round(n - f.h - f.r - s), hop = Math.sin(t * 2 + k * 3) > 0.85 ? 1 : 0; rect(g, x - s, y - s - hop, 2 * s, 1.5 * s, hx('#f2d23a')); put(g, x - s, y - 1.5 * s - hop, hx('#1a1a1a')); put(g, x + s, y - s - hop, hx('#e88a2a')); put(g, x - 1.5 * s, y - hop, hx('#3a3a2a')); }
      };
    },
  });

  add({
    name: 'Lily Pond', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Click the water: ripples spread and the koi come to feed.',
    recipe: 'A pond from above: koi in orange, white and black slide under round lily pads with a notch and a few veins, pink and white flowers open on them, and the sky is reflected in the dark water. Click the water and the koi come to feed.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), seed = R.int(1, 99);
      const W = R.pick([['#1a4a4a', '#245a58', '#2e6a66'], ['#14303e', '#1c4050', '#26505e'], ['#2a3a24', '#34482c', '#405834']]).map(hx);
      const PAD = R.pick([['#3a8a3a', '#5ab04a', '#24602a'], ['#5a9a3a', '#7ac04a', '#3a6a24'], ['#2e7a5a', '#4a9a6a', '#1e5a40']]).map(hx);
      const pads = [];
      for (let k = 0; k < 300 && pads.length < R.int(6, 11); k++) { const x = R.range(0.08, 0.92) * n, y = R.range(0.08, 0.92) * n, r = R.range(3.5, 6.5) * s; if (!pads.some(p => Math.hypot(p.x - x, p.y - y) < p.r + r)) pads.push({ x, y, r, a: R.range(0, TAU), flower: R.bool(0.35) ? hx(R.pick(['#f08ab8', '#ffffff', '#f8d0e0'])) : 0 }); }
      const KOI = [['#f2701a', '#ffffff'], ['#ffffff', '#e8321a'], ['#1a1a20', '#f2a01a'], ['#f2c230', '#ffffff'], ['#e8321a', '#1a1a20']].map(a => a.map(hx));
      const fish = Array.from({ length: R.int(3, 7) }, () => ({ x: R.range(0, n), y: R.range(0, n), a: R.range(0, TAU), c: R.pick(KOI), len: R.range(5, 8) * s, ph: R.range(0, TAU) }));
      const rings = [];
      let food = null;
      T(g, 'Water', ['Jade', 'Ink', 'Moss'][['#1a4a4a', '#14303e', '#2a3a24'].map(hx).indexOf(W[0])]); T(g, 'Pads', pads.length); T(g, 'Blooms', pads.filter(p => p.flower).length); T(g, 'Koi', fish.length);
      // new trait: the weather on the pond
      const wthr = T(g, 'Weather', alt(g, 'Calm', [['Calm', 3], ['Rain', 1], ['Falling Petals', 1], ['Dragonflies', 1]]));
      return (t) => {
        for (const tp of g.input.taps()) { food = { x: tp.x * n, y: tp.y * n, t }; if (rings.length < 10) rings.push({ x: food.x, y: food.y, r: 0 }); }
        if (food && t - food.t > 8) food = null;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = Math.sin(x * 0.15 + y * 0.1 + t * 0.2) + Math.sin(y * 0.22 - t * 0.15); d[y * n + x] = v > 1.2 ? W[2] : v < -1.2 ? W[0] : W[1]; }
        // koi under the pads
        for (const f of fish) {
          const tx = food ? food.x : n / 2 + Math.cos(t * 0.1 + f.ph) * n * 0.4, ty = food ? food.y : n / 2 + Math.sin(t * 0.13 + f.ph * 2) * n * 0.4;
          const want = Math.atan2(ty - f.y, tx - f.x), diff = Math.atan2(Math.sin(want - f.a), Math.cos(want - f.a));
          f.a += Math.max(-0.08, Math.min(0.08, diff)) + Math.sin(t * 2 + f.ph) * 0.02;
          const sp = food && Math.hypot(tx - f.x, ty - f.y) < 3 * s ? 0.05 : 0.25 * s; f.x += Math.cos(f.a) * sp; f.y += Math.sin(f.a) * sp;
          for (let q = 0; q < f.len; q++) {
            const u = q / f.len, wig = Math.sin(t * 6 + f.ph - q * 0.6) * u * 0.8, x = f.x - Math.cos(f.a) * q - Math.sin(f.a) * wig, y = f.y - Math.sin(f.a) * q + Math.cos(f.a) * wig, w = u < 0.2 ? 1.3 : u < 0.7 ? 1.5 : 0.7;
            K.ell(g, x, y, w * s * 0.8, w * s * 0.8, K.hash(q, 1, f.ph * 9) < 0.4 ? f.c[1] : f.c[0]);
          }
        }
        // ripples
        for (let k = rings.length - 1; k >= 0; k--) { const r = rings[k]; r.r += 0.4 * s; if (r.r > 10 * s) { rings.splice(k, 1); continue; } for (let a = 0; a < TAU; a += 0.6 / Math.max(1, r.r)) put(g, r.x + Math.cos(a) * r.r, r.y + Math.sin(a) * r.r, mix(W[2], WHITE, 0.5)); }
        // pads with a notch and veins, and flowers
        for (const p of pads) {
          K.ell(Lr, p.x, p.y, p.r, p.r, (x, y, nx, ny) => {
            const a = Math.atan2(ny, nx), da = Math.atan2(Math.sin(a - p.a), Math.cos(a - p.a));
            if (Math.abs(da) < 0.28) return 0;
            const vein = Math.abs(Math.sin((a - p.a) * 3.5)) < 0.12 && nx * nx + ny * ny > 0.1;
            return vein ? PAD[2] : nx * nx + ny * ny > 0.72 ? PAD[2] : nx < -0.2 && ny < -0.2 ? PAD[1] : PAD[0];
          });
          K.commit(g, Lr, shade(W[0], 0.6));
          if (p.flower) { const cx = p.x + Math.cos(p.a + Math.PI) * p.r * 0.4, cy = p.y + Math.sin(p.a + Math.PI) * p.r * 0.4, open = 1.4 + 0.3 * Math.sin(t * 0.3 + p.a); for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; K.ell(g, cx + Math.cos(a) * open * s, cy + Math.sin(a) * open * s, 0.9 * s, 0.9 * s, p.flower); } put(g, cx, cy, hx('#f2d23a')); }
        }
        if (wthr === 'Rain') for (let k = 0; k < 7; k++) { const ph = t * 0.6 + k / 7, cyc = Math.floor(ph), r = (ph - cyc) * 3.5 * s, x = K.hash(k, cyc, seed) * n, y = K.hash(k + 9, cyc, seed) * n; for (let a = 0; a < TAU; a += 0.7 / Math.max(1, r)) put(g, x + Math.cos(a) * r, y + Math.sin(a) * r, mix(W[2], WHITE, 0.45 * (1 - (ph - cyc)))); }
        if (wthr === 'Falling Petals') for (let k = 0; k < 10; k++) put(g, (K.hash(k, 1, seed) * n + t * 0.4 * s + Math.sin(t + k) * 2) % n, (K.hash(k, 2, seed) * n + t * 0.25 * s) % n, hx(k % 2 ? '#f8c8d8' : '#ffffff'));
        if (wthr === 'Dragonflies') for (let k = 0; k < 2; k++) { const x = n * 0.5 + Math.sin(t * 0.37 + k * 3) * n * 0.38, y = n * 0.5 + Math.sin(t * 0.53 + k * 5) * n * 0.36, c = hx(k ? '#3ac8e8' : '#e8322a'); rect(g, x - 1.5 * s, y, 3 * s, 1, c); put(g, x - 0.5, y - 1, mix(W[2], WHITE, 0.7)); put(g, x - 0.5, y + 1, mix(W[2], WHITE, 0.7)); }
        if (food && t - food.t < 6) for (let k = 0; k < 4; k++) put(g, food.x + K.hash(k, 1, seed) * 3 - 1.5, food.y + K.hash(k, 2, seed) * 3 - 1.5, hx('#c89a5a'));
      };
    },
  });
})();
