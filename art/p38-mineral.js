// Set 4 · Mineral: stones, crystals and caves growing, catching light and turning, drawn in cells.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Mineral' }, def));
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const rgb = X.rgb;
  // the pointer in cells; `active` while the viewer is using it, and a few seconds after
  function pointer(g) {
    const st = { px: -1, py: -1, idle: 99, down: false };
    return (dt, n) => {
      const I = g.input, taps = I.taps(), x = I.x * n, y = I.y * n;
      const moved = I.inside && (Math.abs(x - st.px) > 0.05 || Math.abs(y - st.py) > 0.05);
      if (moved || taps.length || I.down) st.idle = 0; else st.idle += dt;
      st.px = x; st.py = y;
      const released = !I.down && st.down; st.down = I.down;
      return { active: st.idle < 5, inside: I.inside, x, y, down: I.down, released, taps: taps.map(q => [q.x * n, q.y * n]) };
    };
  }
  const cap = w => w[0].toUpperCase() + w.slice(1);
  // the microphone, when the viewer has it on: { level, bands, beats } once a frame, else null
  const hear = g => { const I = g.input; return I.listening ? { level: I.level, bands: I.bands, beats: I.beats() } : null; };
  // irregular regions: multi-source growth with random per-region speed, so
  // edges wander instead of the straight cuts of a Voronoi diagram
  function regions(R, n, k, stretch = 1) {
    const id = new Int16Array(n * n).fill(-1), seeds = [], q = [];
    for (let i = 0; i < k; i++) { const x = R.int(0, n - 1), y = R.int(0, n - 1); seeds.push({ x, y, sp: R.range(0.6, 1.4) }); }
    const cost = new Float32Array(n * n).fill(Infinity), heap = [];
    const push = (c, i, r) => { heap.push([c, i, r]); let j = heap.length - 1; while (j > 0) { const p = (j - 1) >> 1; if (heap[p][0] <= heap[j][0]) break; [heap[p], heap[j]] = [heap[j], heap[p]]; j = p; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let j = 0; for (;;) { const l = 2 * j + 1, r = l + 1; let m = j; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === j) break; [heap[m], heap[j]] = [heap[j], heap[m]]; j = m; } } return top; };
    seeds.forEach((s, r) => { const i = s.y * n + s.x; cost[i] = 0; push(0, i, r); });
    const noise = new Float32Array(n * n); for (let i = 0; i < n * n; i++) noise[i] = 0.6 + R() * 0.8;
    while (heap.length) {
      const [c, i, r] = pop();
      if (id[i] !== -1) continue;
      id[i] = r;
      const x = i % n, y = (i / n) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
        const j = yy * n + xx; if (id[j] !== -1) continue;
        const nc = c + noise[j] / seeds[r].sp * (dx ? 1 : stretch);
        if (nc < cost[j]) { cost[j] = nc; push(nc, j, r); }
      }
    }
    void q;
    return { id, k };
  }

  add({
    name: 'Geode', seed: 3, sizes: [80, 100], fps: 10,
    recipe: 'A geode sawn in half: a rough rind, a few bands of agate, and inside them crystal points growing in toward the dark hollow, with a glint of light travelling round their faces.',
    make(R, U, g) {
      const { n, d } = g, cx = n / 2, cy = n / 2, R0 = n * 0.44, a = R.range(0, TAU), b = R.range(0, TAU);
      const rad = th => R0 * (1 + 0.1 * Math.sin(2 * th + a) + 0.06 * Math.sin(3 * th + b));
      const hue = R.pick([78, 75, 12, 55, 92, 8]), crys = [X.hsbPk(hue, 55, 45), X.hsbPk(hue, 65, 70), X.hsbPk(hue, 40, 92), X.hsbPk(hue, 15, 100)];
      const bands = [X.rgb(140, 130, 120), X.rgb(220, 215, 205), X.hsbPk(hue, 30, 60), X.rgb(240, 238, 230), X.hsbPk(hue + 5, 45, 75)];
      const bg = new Uint32Array(n * n), back = X.rgb(24, 22, 26);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy, rho = Math.hypot(dx, dy) / rad(Math.atan2(dy, dx));
        let c = back;
        if (rho < 1) c = rho > 0.93 ? (X.dith4(x * 3, y) < 0.5 ? X.rgb(110, 96, 84) : X.rgb(90, 78, 68)) : rho > 0.78 ? bands[Math.floor((rho - 0.78) / 0.15 * 9) % bands.length] : X.rgb(18, 12, 22);
        bg[y * n + x] = c;
      }
      // crystal points: a ring of triangles rooted at the band, pointing inward
      const pts = [];
      for (let ring = 0; ring < 2; ring++) for (let k = 0, m = ring ? 34 : 46; k < m; k++) {
        const th = (k + R.range(-0.3, 0.3) + ring * 0.5) / m * TAU, r0 = rad(th) * (ring ? 0.72 : 0.79);
        pts.push({ th, r0, w: (ring ? 0.06 : 0.07) * R.range(0.8, 1.3), L: rad(th) * R.range(0.18, 0.34) * (ring ? 0.8 : 1), at: R.range(0, 7) + ring * 3, skew: R.range(-0.25, 0.25) });
      }
      pts.sort((p, q) => p.at - q.at);
      const T = 22;
      const frame = t => {
        d.set(bg);
        const tt = t % T, grow = tt < 15 ? tt : 15, glint = t * 0.6;
        for (const p of pts) {
          const u = ease((grow - p.at) / 4); if (u <= 0) continue;
          const L = p.L * u, bx = cx + Math.cos(p.th) * p.r0, by = cy + Math.sin(p.th) * p.r0, dir = p.th + Math.PI + p.skew;
          const tx = bx + Math.cos(dir) * L, ty = by + Math.sin(dir) * L, half = p.w * p.r0;
          const lx = bx + Math.cos(p.th + Math.PI / 2) * half, ly = by + Math.sin(p.th + Math.PI / 2) * half, rx = bx - Math.cos(p.th + Math.PI / 2) * half, ry = by - Math.sin(p.th + Math.PI / 2) * half;
          const lit = 0.5 + 0.5 * Math.cos(dir - glint), sh = Math.min(3, Math.floor(lit * 3.2));
          X.poly(g, [lx, ly, tx, ty, bx, by], crys[sh]); X.poly(g, [bx, by, tx, ty, rx, ry], crys[Math.max(0, sh - 1)]);
          if (lit > 0.97) X.put(g, tx, ty, WHITE);
        }
      };
      frame.period = T;
      return frame;
    },
  });

  add({
    name: 'Quartz', seed: 4, sizes: [80, 100, 200], fps: 10,
    recipe: 'A cluster of six-sided quartz points grows up from a lump of rock, each prism showing three flat faces and a pointed tip, their shading turning as the light slowly circles the cluster.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, base = n * 0.86, kind = R.pick(['clear', 'smoky', 'rose', 'amethyst', 'citrine']);
      const tint = { clear: X.rgb(225, 230, 245), smoky: X.rgb(150, 125, 110), rose: X.rgb(245, 190, 205), amethyst: X.rgb(170, 120, 220), citrine: X.rgb(245, 200, 90) }[kind];
      const back = X.shade(R.pick(X.inks(R, 4, 0.3)), 0.2), bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x - n / 2, y - n * 0.55) / n; bg[y * n + x] = X.shade(back, U.clamp(1.6 - r * 1.8 + (X.dith4(x, y) - 0.5) * 0.25, 0.3, 1.6)); }
      for (let x = 0; x < n; x++) { const h = base + 4 * s * Math.sin(x * 0.11) + 3 * s * Math.sin(x * 0.27 + 1); for (let y = Math.max(0, Math.floor(h)); y < n; y++) bg[y * n + x] = X.dith4(x * 2, y) < 0.5 ? X.rgb(80, 72, 66) : X.rgb(64, 58, 54); }
      const xs = Array.from({ length: R.int(7, 11) }, (_, i, ) => i);
      const cr = xs.map(i => ({ x: n * R.range(0.22, 0.78), ang: R.range(-0.75, 0.75), w: R.range(4, 7.5) * s, L: R.range(26, 52) * s, at: i * 1.2 + R.range(0, 1) })).sort((a, b) => b.L - a.L);
      const T = 26;
      const frame = t => {
        d.set(bg);
        const tt = t % T, lightA = t * 0.35;
        for (const c of cr) {
          const u = ease((Math.min(tt, 18) - c.at) / 5); if (u <= 0) continue;
          const L = c.L * u, ax = Math.sin(c.ang), ay = -Math.cos(c.ang), px = -ay, py = ax, bx = c.x, by = base + 2 * s;
          const tipL = c.w * 1.4, bodyL = Math.max(0, L - tipL);
          // three visible prism faces, then the tip facets
          const edges = [-1, -0.45, 0.45, 1];
          for (let f = 0; f < 3; f++) {
            const e0 = edges[f] * c.w, e1 = edges[f + 1] * c.w, faceN = (f - 1) * 0.9 + c.ang, lit = 0.45 + 0.55 * Math.max(0, Math.cos(faceN - Math.cos(lightA) * 1.2));
            const col = X.mixPk(X.shade(tint, 0.35 + 0.75 * lit), WHITE, f === 1 ? 0.12 : 0);
            X.poly(g, [bx + px * e0, by + py * e0, bx + px * e1, by + py * e1, bx + px * e1 + ax * bodyL, by + py * e1 + ay * bodyL, bx + px * e0 + ax * bodyL, by + py * e0 + ay * bodyL], col);
            const tx = bx + ax * L, ty = by + ay * L;
            X.poly(g, [bx + px * e0 + ax * bodyL, by + py * e0 + ay * bodyL, bx + px * e1 + ax * bodyL, by + py * e1 + ay * bodyL, tx, ty], X.shade(col, f === 1 ? 1.15 : 0.9));
            if (lit > 0.96 && f === 1) X.line(g, bx + ax * bodyL * 0.2, by + ay * bodyL * 0.2, bx + ax * bodyL * 0.9, by + ay * bodyL * 0.9, WHITE);
          }
        }
      };
      frame.period = T;
      return frame;
    },
  });

  add({
    name: 'Agate', seed: 2, sizes: [80, 100, 200], fps: 10,
    recipe: 'A polished slab of agate: bands of colour are laid down layer on layer, each following the shape of the one before, inward from the rind until a little pocket of quartz is left at the heart.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, cx = n / 2, cy = n / 2, f = R.range(1.5, 3);
      const inside = new Uint8Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const dx = (x - cx) / n, dy = (y - cy) / n, r = Math.hypot(dx, dy) * 2.3 + nz(dx * f, dy * f) * 0.35; inside[y * n + x] = r < 0.95 ? 1 : 0; }
      // distance inward from the rind (chamfer passes)
      const dist = new Float32Array(n * n);
      for (let i = 0; i < n * n; i++) dist[i] = inside[i] ? 1e9 : 0;
      const pass = (x, y, dx, dy, w) => { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) return; const v = dist[yy * n + xx] + w; if (v < dist[y * n + x]) dist[y * n + x] = v; };
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { pass(x, y, -1, 0, 1); pass(x, y, 0, -1, 1); pass(x, y, -1, -1, 1.414); pass(x, y, 1, -1, 1.414); }
      for (let y = n - 1; y >= 0; y--) for (let x = n - 1; x >= 0; x--) { pass(x, y, 1, 0, 1); pass(x, y, 0, 1, 1); pass(x, y, 1, 1, 1.414); pass(x, y, -1, 1, 1.414); }
      let max = 0; for (let i = 0; i < n * n; i++) if (dist[i] < 1e8 && dist[i] > max) max = dist[i];
      const sc = U.scheme(R, 0.4), bands = [X.rgb(245, 240, 232), ...sc.cols.slice(0, 5).map(U.pk), X.rgb(250, 250, 250), X.rgb(70, 60, 60)];
      const bw = n / 100 * R.range(1.2, 2.2), wobble = R.range(0.4, 1.2), core = max * R.range(0.72, 0.85), T = 24, back = X.rgb(22, 20, 24), hollow = X.rgb(30, 26, 34);
      // everything but the deposition front and the sheen is fixed: work it out once
      const dd = new Float32Array(n * n), col = new Uint32Array(n * n), diag = new Float32Array(n * n), dh = new Uint8Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x; diag[i] = (x + y) / (2 * n); dh[i] = X.dith4(x, y) < 0.5 ? 1 : 0;
        if (!inside[i]) { col[i] = back; dd[i] = -1; continue; }
        const v = dist[i] + wobble * nz(x * 0.15, y * 0.15); dd[i] = Math.max(0, v);
        if (v > core) col[i] = X.dith4(x, y) < 0.3 ? X.rgb(240, 240, 250) : X.rgb(200, 205, 220);
        else { const k = Math.floor(v / bw); col[i] = v < 1.5 ? X.rgb(120, 100, 90) : k % 3 === 2 ? bands[0] : bands[1 + (Math.floor(k / 3) % (bands.length - 1))]; }
      }
      const frame = t => {
        const tt = t % T, front = Math.min(1, tt / 16) * max, sheen = (t * 0.07) % 1.6 - 0.3;
        for (let i = 0; i < n * n; i++) {
          if (dd[i] < 0) { d[i] = back; continue; }
          let c = dd[i] > front ? hollow : col[i];
          const sd = diag[i] - sheen;
          if (sd > 0 && sd < 0.04 && dh[i]) c = X.mixPk(c, WHITE, 0.35);
          d[i] = c;
        }
      };
      frame.period = T;
      return frame;
    },
  });

  add({
    name: 'Step Cut', seed: 2, sizes: [50], fps: 10,
    interactive: 'Move the pointer to move the light over the stone.',
    recipe: 'A cut gem from above in flat, hard-edged facets: emerald, princess, oval, trillion or round brilliant, in emerald, ruby, sapphire, amethyst, citrine or diamond. Each facet flips between dark, mid and bright as the lamp circles, the table catches a window, and stars of light glint at the brightest corners.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), cx = n / 2 - 0.5, cy = n / 2 - 0.5;
      const STONES = [
        { name: 'emerald', c: [rgb(4, 40, 24), rgb(10, 110, 60), rgb(40, 190, 110), rgb(150, 255, 200)] },
        { name: 'ruby', c: [rgb(50, 0, 14), rgb(150, 10, 40), rgb(240, 40, 80), rgb(255, 170, 190)] },
        { name: 'sapphire', c: [rgb(4, 10, 50), rgb(20, 50, 170), rgb(60, 120, 250), rgb(180, 210, 255)] },
        { name: 'amethyst', c: [rgb(30, 6, 50), rgb(100, 30, 160), rgb(170, 90, 240), rgb(230, 200, 255)] },
        { name: 'citrine', c: [rgb(60, 26, 0), rgb(190, 110, 0), rgb(255, 190, 30), rgb(255, 240, 170)] },
        { name: 'diamond', c: [rgb(40, 50, 70), rgb(140, 160, 190), rgb(220, 230, 245), WHITE], fire: true },
      ];
      const st = R.pick(STONES), cut = R.pick(['emerald', 'emerald', 'princess', 'oval', 'trillion', 'round']);
      const clothI = R.int(0, 3), cloth = [[rgb(20, 14, 30), rgb(28, 20, 42)], [rgb(10, 10, 12), rgb(18, 18, 22)], [rgb(60, 10, 20), rgb(74, 16, 28)], [rgb(10, 30, 40), rgb(14, 40, 52)]][clothI];
      g.trait('Stone', cap(st.name)); g.trait('Cut', cut === 'round' ? 'Round brilliant' : cap(cut)); g.trait('Cloth', ['Plum', 'Black', 'Wine', 'Teal'][clothI]);
      // loose on the cloth, or held in a setting by gold or silver claws
      const claws = g.trait('Setting', g.home ? 'Loose' : g.alt.pick(['Loose', 'Loose', 'Gold claws', 'Silver claws']));
      const metal = claws === 'Gold claws' ? [rgb(140, 90, 20), rgb(230, 180, 60), rgb(255, 240, 170)] : [rgb(110, 116, 130), rgb(200, 206, 220), WHITE];
      // the outline as a convex polygon in -1..1, then its edges' normals and distances
      let poly;
      if (cut === 'emerald') { const a = 0.95, b = R.range(0.62, 0.78), c = 0.24; poly = [[-a + c, -b], [a - c, -b], [a, -b + c], [a, b - c], [a - c, b], [-a + c, b], [-a, b - c], [-a, -b + c]]; }
      else if (cut === 'princess') poly = [[-0.86, -0.86], [0.86, -0.86], [0.86, 0.86], [-0.86, 0.86]];
      else if (cut === 'trillion') poly = [[0, -0.95], [0.92, 0.7], [-0.92, 0.7]];
      else { const k = cut === 'oval' ? 12 : 16, ex = cut === 'oval' ? 0.95 : 0.9, ey = cut === 'oval' ? 0.7 : 0.9; poly = Array.from({ length: k }, (_, i) => [Math.cos(i / k * TAU) * ex, Math.sin(i / k * TAU) * ey]); }
      const edges = poly.map((p, i) => { const q = poly[(i + 1) % poly.length], ex = q[0] - p[0], ey = q[1] - p[1], l = Math.hypot(ex, ey), nx = ey / l, ny = -ex / l, h = nx * p[0] + ny * p[1]; return h < 0 ? [-nx, -ny, -h] : [nx, ny, h]; });
      const K = cut === 'round' || cut === 'oval' ? 3 : 4, S = n * 0.47;
      const fid = new Int16Array(n * n).fill(-1), facets = [], keys = new Map(), tableFlag = [], seam = [];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const u = (x - cx) / S, v = (y - cy) / S;
        let rho = 0, e = 0;
        for (let k = 0; k < edges.length; k++) { const r = (edges[k][0] * u + edges[k][1] * v) / edges[k][2]; if (r > rho) { rho = r; e = k; } }
        if (rho >= 1) continue;
        const ring = Math.min(K, Math.floor((1 - rho) * K * 2.4));
        // brilliants split each ring facet in two along its edge, so the stone sparkles finer
        const half = (cut === 'round' || cut === 'oval' || cut === 'princess') && ring < K ? ((Math.atan2(v, u) * edges.length / TAU * 2 + 100) | 0) & 1 : 0;
        const key = ring === K ? 'T' : ring + ':' + e + ':' + half;
        if (!keys.has(key)) {
          keys.set(key, facets.length);
          const tl = ring === K ? 0 : [0.75, 0.55, 0.38, 0.22][ring], ex = edges[e][0], ey = edges[e][1], tw2 = half ? 0.18 : -0.18;
          facets.push([ex * tl + -ey * tw2 * tl, ey * tl + ex * tw2 * tl]);
          tableFlag.push(ring === K); seam.push(ring === K ? -1 : ring * 64 + e);
        }
        fid[y * n + x] = keys.get(key);
      }
      const val = new Float32Array(facets.length);
      // where the claws grip: walk out from the centre along the corner directions to the girdle
      const prongs = [];
      for (const deg of cut === 'trillion' ? [-90, 30, 150] : cut === 'emerald' ? [-28, 28, 152, 208] : [45, 135, 225, 315]) {
        const a = deg * Math.PI / 180;
        let r = 0; while (r < n && fid[Math.round(cy + Math.sin(a) * r) * n + Math.round(cx + Math.cos(a) * r)] >= 0) r += 0.5;
        prongs.push([Math.round(cx + Math.cos(a) * (r - 0.5)), Math.round(cy + Math.sin(a) * (r - 0.5))]);
      }
      let lx = 0.5, ly = -0.5;
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active && p.inside) { lx += ((p.x - cx) / S - lx) * Math.min(1, dt * 6); ly += ((p.y - cy) / S - ly) * Math.min(1, dt * 6); }
        else { lx += (Math.cos(t * 0.5) * 0.8 - lx) * Math.min(1, dt * 2); ly += (Math.sin(t * 0.5) * 0.8 - ly) * Math.min(1, dt * 2); }
        const lz = 0.7, ll = Math.hypot(lx, ly, lz);
        for (let k = 0; k < facets.length; k++) { const [nx, ny] = facets[k], dot = (nx * lx + ny * ly + lz) / Math.hypot(nx, ny, 1) / ll; val[k] = Math.pow(Math.max(0, dot), 5); }
        for (let i = 0; i < n * n; i++) {
          const k = fid[i], x = i % n, y = (i / n) | 0;
          if (k < 0) { d[i] = cloth[((x + y * 2) >> 3) & 1]; continue; }
          let v = val[k];
          if (tableFlag[k]) v = 0.35 + 0.5 * (((x - y + Math.floor(t * 6)) % 14 + 14) % 14 < 3 ? 1 : 0) + 0.15 * v;
          d[i] = v > 0.82 ? st.c[3] : v > 0.45 ? st.c[2] : v > 0.18 ? st.c[1] : st.c[0];
        }
        // facet edges: a light line wherever two facets meet; the girdle in dark
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
          const i = y * n + x, k = fid[i];
          if (k < 0) { if (fid[i + 1] >= 0 || fid[i - 1] >= 0 || fid[i + n] >= 0 || fid[i - n] >= 0) d[i] = X.shade(st.c[0], 0.6); continue; }
          // (the two halves of a brilliant's facet share a seam id, so no line splits them: the
          // stone reads as clean facets rather than a mesh of little squares)
          const a = fid[i + 1], b = fid[i + n];
          if (a >= 0 && seam[a] !== seam[k] || b >= 0 && seam[b] !== seam[k]) d[i] = X.mixPk(d[i], st.c[3], 0.35);
        }
        // glints: four-pointed stars on the brightest facets, coloured fire on a diamond
        let best = -1, bi = 0;
        for (let k = 0; k < facets.length; k++) if (!tableFlag[k] && val[k] > best) { best = val[k]; bi = k; }
        if (best > 0.7) {
          let sx = 0, sy = 0, c = 0; for (let i = 0; i < n * n; i += 3) if (fid[i] === bi) { sx += i % n; sy += (i / n) | 0; c++; }
          if (c) { const gx = Math.round(sx / c), gy = Math.round(sy / c), L = 1 + Math.round((best - 0.7) * 10); for (let q = -L; q <= L; q++) { X.put(g, gx + q, gy, WHITE); X.put(g, gx, gy + q, WHITE); } }
        }
        if (claws !== 'Loose') for (const a of prongs) { const [x, y] = a; X.disc(g, x + 0.5, y + 0.5, 1.9, metal[0]); X.disc(g, x + 0.2, y + 0.2, 1.3, metal[1]); X.put(g, x - 1 + 1, y - 1 + 1, metal[2]); }
        if (st.fire) for (let k = 0; k < 6; k++) { const a = t * 0.7 + k, i = Math.floor((Math.sin(a * 3.1) * 0.5 + 0.5) * n * n) % (n * n); if (fid[i] >= 0 && val[fid[i]] > 0.4) X.put(g, i % n, (i / n) | 0, X.hsbPk(k * 17 + t * 30, 90, 100)); }
      };
    },
  });

  add({
    name: 'Dripstone', seed: 5, sizes: [80, 100], fps: 12,
    interactive: 'Move the pointer to carry the lantern through the cave; click to shake a drop loose.',
    listens: 'Clap and drops shake loose from the roof.',
    recipe: 'A lantern-lit cave: stalactites hang from the roof and stalagmites rise to meet them, drops fall from the tips and ring the still pool, and both slowly lengthen toward each other.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R).n2, pool = n * 0.86, ptr = pointer(g);
      let lx = n * R.range(0.15, 0.85), ly = n * 0.55, litX = -1, litY = -1;
      const rockI = R.int(0, 2), ROCKS = [[X.rgb(70, 52, 40), X.rgb(120, 90, 66), X.rgb(190, 150, 110), X.rgb(240, 210, 160)], [X.rgb(40, 46, 60), X.rgb(80, 90, 110), X.rgb(140, 150, 170), X.rgb(210, 220, 230)], [X.rgb(60, 40, 50), X.rgb(120, 70, 80), X.rgb(190, 120, 120), X.rgb(240, 190, 170)],
        [X.rgb(30, 60, 80), X.rgb(60, 120, 150), X.rgb(130, 200, 220), X.rgb(220, 248, 255)], [X.rgb(30, 60, 44), X.rgb(60, 110, 80), X.rgb(120, 180, 130), X.rgb(200, 240, 200)], [X.rgb(80, 44, 10), X.rgb(150, 90, 30), X.rgb(220, 150, 60), X.rgb(255, 220, 140)]];
      // the stone: the cave's own three, or (now and then) an ice cave, a jade grotto or amber flowstone;
      // lit by a lantern or by glow-worms on the roof; a still pool on the floor or dry rock
      const A = g.alt, rockN = g.home ? rockI : A.bool(0.3) ? A.int(3, 5) : rockI, rock = ROCKS[rockN];
      g.trait('Rock', ['Sandstone', 'Granite', 'Rose', 'Ice', 'Jade', 'Amber'][rockN]);
      const worms = g.trait('Light', g.home ? 'Lantern' : A.pick(['Lantern', 'Lantern', 'Glow-worms'])) === 'Glow-worms';
      const dry = g.trait('Floor', g.home ? 'Pool' : A.pick(['Pool', 'Pool', 'Dry'])) === 'Dry';
      if (worms) ly = n * 0.3;
      const roof = x => n * 0.12 + 8 * s * nz(x * 0.04, 1), floor = x => n * 0.78 + 5 * s * nz(x * 0.05, 4);
      const tites = Array.from({ length: g.trait('Formations', R.int(7, 11)) }, () => ({ x: R.range(0.06, 0.94) * n, w: R.range(2, 5) * s, L0: R.range(6, 24) * s, rate: R.range(0.15, 0.4) * s, ph: R.range(0, 5), mite: R.bool(0.75) }));
      const drops = [];
      const ellipse = (cx, cy, rx, ry, fn) => { for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(n - 1, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(n - 1, Math.ceil(cx + rx)); x++) { const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry; if (u * u + v * v < 1) d[y * n + x] = fn(x, y, d[y * n + x]); } };
      const light = (x, y) => U.clamp((worms ? 1.05 : 1.25) - Math.hypot(x - lx, (y - ly) * (worms ? 0.8 : 1.3)) / (n * 0.75));
      const bg = new Uint32Array(n * n), grain = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) grain[y * n + x] = nz(x * 0.2, y * 0.2) * 0.4 + X.dith4(x, y) * 0.6;
      // the cave lit from the lantern, recomputed only when the lantern moves
      function relight() {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const r = roof(x), fl = floor(x);
          let c;
          if (y < r || (y > fl && (y < pool || dry))) { const v = light(x, y) * 3.2 + grain[y * n + x]; c = rock[Math.max(0, Math.min(3, Math.floor(v)))]; }
          else if (y >= pool) { const ry = 2 * pool - y; c = ry > fl ? X.rgb(10, 20, 30) : X.shade(rock[1], 0.4 + light(x, ry) * 0.5); }
          else c = X.shade(X.rgb(30, 24, 30), 0.4 + light(x, y) * 1.2);
          bg[y * n + x] = c;
        }
        litX = lx; litY = ly;
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active && p.inside) { lx += (p.x - lx) * Math.min(1, dt * 5); ly += (U.clamp(p.y, n * 0.2, n * 0.75) - ly) * Math.min(1, dt * 5); }
        if (p.active) for (const [x] of p.taps) { const s2 = tites.reduce((a, b) => Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a); s2.ph = (3.4 - t % 3.4) + 0.001; }
        const ear = hear(g);
        if (ear && ear.beats) for (let q = 0; q < 3; q++) { const s2 = tites[g.alt.int(0, tites.length - 1)]; if ((t + s2.ph) % 3.4 > 0.5) s2.ph = (3.4 - t % 3.4) + 0.001 + q * 0.12; }
        if (Math.abs(lx - litX) + Math.abs(ly - litY) > 0.7) relight();
        d.set(bg);
        if (!dry) for (let y = Math.ceil(pool); y < n; y += 3) for (let x = (Math.floor(t * 4) % 9 + 9) % 9; x < n; x += 9) d[y * n + x] = X.rgb(80, 110, 140);
        // glow-worms: blue-green points along the roof, each brightening and fading on its own
        if (worms) for (let k = 0; k < 40; k++) { const h = Math.imul(k + 7, 2654435761) >>> 0, x = h % n, y = Math.round(roof(x)) + 1 + (h >>> 12) % 4, on = Math.sin(t * (0.6 + (h >>> 20) % 5 * 0.15) + k) > -0.2; if (on) X.put(g, x, y, (h >>> 8) & 1 ? X.rgb(120, 255, 230) : X.rgb(60, 200, 210)); }
        for (const s2 of tites) {
          // they lengthen slowly and ever more slowly (never snapping back to a stub)
          const L = s2.L0 + 22 * s * (1 - Math.exp(-s2.rate * t / (22 * s))), top = roof(s2.x) - 2, tipY = top + L, v = light(s2.x, tipY);
          for (let k = 0; k < L; k++) { const w = s2.w * (1 - k / L); X.rect(g, s2.x - w, top + k, 2 * w + 1, 1, rock[Math.max(0, Math.min(3, Math.floor(light(s2.x, top + k) * 3.4 + (k % 4 === 0 ? 0.6 : 0))))]); }
          if (s2.mite) { const fb = floor(s2.x) + 1, H = L * 0.8; for (let k = 0; k < H; k++) { const w = s2.w * 1.3 * (1 - k / H); X.rect(g, s2.x - w, fb - k, 2 * w + 1, 1, rock[Math.max(0, Math.min(3, Math.floor(light(s2.x, fb - k) * 3.4)))]); } }
          // drops gather at the tip and fall
          const cyc = (t + s2.ph) % 3.4;
          if (cyc < dt && t > 0.1) drops.push({ x: s2.x, y: tipY, vy: 0, to: s2.mite ? floor(s2.x) + 1 - L * 0.8 : dry ? floor(s2.x) + 1 : pool, ring: 0 });
          if (cyc > 2.4) X.put(g, s2.x, tipY + 1, X.rgb(200, 230, 255));
          void v;
        }
        for (let k = drops.length - 1; k >= 0; k--) {
          const p = drops[k];
          if (p.ring) { p.ring += dt * 6; const rr = p.ring * s; for (let a = 0; a < 12; a++) X.put(g, p.x + Math.cos(a / 12 * TAU) * rr, p.y + Math.sin(a / 12 * TAU) * rr * 0.3, X.rgb(150, 190, 220)); if (p.ring > 5) drops.splice(k, 1); continue; }
          p.vy += 120 * s * dt; p.y += p.vy * dt;
          if (p.y >= p.to) { if (p.to >= pool - 1) { p.y = pool; p.ring = 1; } else drops.splice(k, 1); continue; }
          X.put(g, p.x, p.y, X.rgb(210, 235, 255)); X.put(g, p.x, p.y - 1, X.rgb(140, 180, 210));
        }
        // the lantern: a warm halo, caps, a handle and a bright flame behind the glass
        if (!worms) {
        const LX = Math.round(lx), LY = Math.round(ly), lw = Math.max(1, Math.round(s)), warm = X.rgb(255, 200, 110);
        ellipse(LX + 0.5, LY + 0.5, 5 * s, 5 * s, (x, y, v) => X.dith4(x, y) < 0.5 ? X.mixPk(v, warm, 0.22) : v);
        X.rect(g, LX - lw, LY - 2 * lw, 3 * lw, 4 * lw, warm);
        X.rect(g, LX - lw - 1, LY - 2 * lw - 1, 3 * lw + 2, 1, X.rgb(60, 42, 30)); X.rect(g, LX - lw - 1, LY + 2 * lw, 3 * lw + 2, 1, X.rgb(60, 42, 30));
        X.put(g, LX - lw, LY - 2 * lw - 2, X.rgb(60, 42, 30)); X.put(g, LX + 2 * lw - 1, LY - 2 * lw - 2, X.rgb(60, 42, 30)); X.rect(g, LX - lw + 1, LY - 2 * lw - 3, 3 * lw - 2, 1, X.rgb(60, 42, 30));
        X.rect(g, LX, LY - lw, lw, 2 * lw, X.rgb(255, 250, 220));
        }
      };
    },
  });

  add({
    name: 'Opal', seed: 3, sizes: [80, 100, 200], fps: 12,
    interactive: 'Move the pointer to tilt the stone and watch the colour flash.',
    recipe: 'Play of colour in an opal: a milky (or black) stone made of patches, each a tiny diffraction grating at its own angle, flashing a pure spectral colour only when the light swings into line with it.',
    make(R, U, g) {
      const area = R.range(22, 40), { n, d } = g, k = Math.round(n * n / area), reg = regions(R, n, k, R.range(2, 3.2)), dark = R.bool(0.55);
      const ori = Float32Array.from({ length: k }, () => R() * Math.PI), sp = Float32Array.from({ length: k }, () => R.range(0, 100)), sharp = R.range(1.6, 3);
      // the body: black or milky (the original two), or now and then a clear crystal opal or a boulder
      // opal, where the colour only lives in veins through brown ironstone
      const bodyK = g.trait('Body', g.home ? (dark ? 'Black' : 'Milky') : g.alt.bool(0.3) ? g.alt.pick(['Crystal', 'Boulder']) : dark ? 'Black' : 'Milky');
      const body = bodyK === 'Black' ? [X.rgb(16, 18, 30), X.rgb(26, 30, 46)] : bodyK === 'Milky' ? [X.rgb(222, 228, 236), X.rgb(200, 210, 222)] : bodyK === 'Crystal' ? [X.rgb(120, 140, 166), X.rgb(104, 124, 150)] : [X.rgb(96, 62, 36), X.rgb(74, 46, 28)];
      const vein = Uint8Array.from({ length: k }, (_, r) => bodyK !== 'Boulder' || (Math.imul(r + 3, 2654435761) >>> 28) < 5 ? 1 : 0);
      g.trait('Pattern', area < 28 ? 'Pinfire' : area > 34 ? 'Harlequin' : 'Flash'); g.trait('Fire', sharp > 2.3 ? 'Sharp' : 'Soft');
      const lut = U.hueLut(90, 100, 256), speck = new Uint8Array(n * n), hi = new Uint8Array(n * n);
      for (let i = 0; i < n * n; i++) { const x = i % n, y = (i / n) | 0; speck[i] = (x * 7 + y * 3) % 9 === 0 ? 1 : 0; hi[i] = X.dith4(x, y) < 0.5 ? 1 : 0; }
      const lo = new Uint32Array(3 * k), up = new Uint32Array(3 * k), on = new Uint8Array(k), ptr = pointer(g);
      // a milky stone veils its colours a little, so the flashes sit under the surface
      const veil = bodyK === 'Milky' ? 0.8 : bodyK === 'Crystal' ? 0.92 : 1;
      // each patch flashes in fine bands across its grating (three neighbouring hues), not one flat colour
      const band = new Uint8Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x, o = ori[reg.id[i]]; band[i] = ((Math.floor((x * Math.cos(o) + y * Math.sin(o)) / 2.2) % 3) + 3) % 3; }
      let off = 0;   // the viewer's tilt, added to the original's own swing and fading back to nothing
      return (t, dt) => {
        const p = ptr(dt, n), base = t * 0.32 + 0.6 * Math.sin(t * 0.13);
        if (p.active && p.inside) off += ((p.x / n - 0.5) * 3 + (p.y / n - 0.5) * 1.5 - off) * Math.min(1, dt * 6); else off *= Math.max(0, 1 - dt * 1.5);
        if (Math.abs(off) < 1e-4) off = 0;
        const la = base + off;
        // one colour pair per patch per frame; cells only pick between them
        for (let r = 0; r < k; r++) {
          const a = Math.cos(2 * (ori[r] - la)), v = Math.pow(Math.max(0, a), sharp);
          on[r] = v > 0.04 && vein[r] ? 1 : 0; if (!on[r]) continue;
          for (let b = 0; b < 3; b++) {
            const col = lut[(((sp[r] + (1 - a) * 60 + b * 5) % 100 + 100) % 100 * 2.56) | 0], vb = v * (1 - 0.12 * b);
            lo[3 * r + b] = X.mixPk(body[0], col, U.clamp(vb * 1.3 - 0.15) * veil); up[3 * r + b] = X.mixPk(body[0], col, U.clamp(vb * 1.3 + 0.15) * veil);
          }
        }
        for (let i = 0; i < n * n; i++) { const r = reg.id[i]; d[i] = on[r] ? (hi[i] ? up[3 * r + band[i]] : lo[3 * r + band[i]]) : body[speck[i]]; }
      };
    },
  });

  add({
    name: 'Mother Lode', seed: 1, sizes: [80, 100], fps: 12,
    interactive: 'Click underground to blast a chamber open.',
    listens: 'Clap to set off a blast somewhere underground.',
    recipe: 'A cut-away hillside: miners sink a shaft and drive galleries along glinting veins of gold, the cage rides up and down, and carts trundle the ore back along the levels.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R).n2, surf = Math.round(n * 0.18), shaftX = Math.round(n * R.range(0.3, 0.7));
      // the ore in the veins, the rock of the hill, the sky over it, how many levels are driven and how
      // many veins run through (the original is gold in brown loam on a clear day, three levels, five veins)
      const A = g.alt, H0 = g.home;
      const ore = g.trait('Ore', H0 ? 'Gold' : A.pick(['Gold', 'Gold', 'Silver', 'Copper', 'Emerald']));
      let rockK = g.trait('Ground', H0 ? 'Loam' : A.pick(['Loam', 'Loam', 'Red rock', 'Slate', 'Chalk']));
      if (ore === 'Silver' && rockK === 'Chalk') rockK = g.trait('Ground', 'Slate');   // silver would vanish in chalk
      const skyK = g.trait('Sky', H0 ? 'Day' : A.pick(['Day', 'Day', 'Dusk', 'Night']));
      const nLev = g.trait('Levels', H0 ? 3 : A.pick([3, 3, 2, 4])), nVein = g.trait('Veins', H0 ? 5 : A.pick([5, 5, 3, 8]));
      const strata = { Loam: [X.rgb(140, 100, 70), X.rgb(120, 86, 62), X.rgb(100, 76, 60), X.rgb(84, 70, 64), X.rgb(70, 62, 66)], 'Red rock': [X.rgb(196, 100, 60), X.rgb(170, 84, 52), X.rgb(140, 70, 50), X.rgb(110, 56, 46), X.rgb(84, 46, 44)], Slate: [X.rgb(90, 96, 110), X.rgb(74, 80, 96), X.rgb(62, 66, 82), X.rgb(50, 54, 70), X.rgb(40, 42, 56)], Chalk: [X.rgb(226, 220, 200), X.rgb(206, 198, 176), X.rgb(180, 172, 152), X.rgb(150, 144, 130), X.rgb(120, 116, 108)] }[rockK];
      const gold = { Gold: X.rgb(250, 210, 60), Silver: X.rgb(220, 230, 240), Copper: X.rgb(230, 120, 60), Emerald: X.rgb(60, 230, 140) }[ore];
      const dugOre = ore === 'Gold' ? X.rgb(120, 100, 40) : X.shade(gold, 0.48);
      const sky = { Day: [X.rgb(120, 180, 230), X.rgb(190, 220, 240)], Dusk: [X.rgb(90, 70, 140), X.rgb(240, 150, 110)], Night: [X.rgb(10, 14, 36), X.rgb(24, 30, 64)] }[skyK];
      const turf = rockK === 'Red rock' ? X.rgb(200, 150, 90) : rockK === 'Slate' ? X.rgb(60, 100, 60) : X.rgb(70, 140, 60);
      const levels = (nLev === 2 ? [0.44, 0.68] : nLev === 4 ? [0.34, 0.48, 0.62, 0.76] : [0.38, 0.56, 0.74]).map(v => Math.round(n * v)), lastL = levels[levels.length - 1];
      // veins: wandering lines, one or two crossing each level
      const vein = new Uint8Array(n * n);
      for (let v = 0; v < nVein; v++) { let x = R.range(0.05, 0.95) * n, y = surf + 4; const dx = R.range(-0.5, 0.5); for (let k = 0; k < n * 1.2; k++) { x += dx + nz(k * 0.08, v) * 0.8; y += 0.7; if (x < 0 || x >= n || y >= n) break; vein[(y | 0) * n + (x | 0)] = 1; if (R() < 0.3) vein[(y | 0) * n + Math.min(n - 1, (x | 0) + 1)] = 1; } }
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, ground = surf + 2 * s * nz(x * 0.05, 0);
        bg[i] = y < ground ? (skyK === 'Night' && (Math.imul(x * 7919 + y * 104729, 2654435761) >>> 0) % 37 === 0 ? X.rgb(230, 230, 200) : sky[y < surf * 0.5 ? 0 : 1]) : vein[i] ? gold : strata[Math.max(0, Math.min(4, Math.floor((y - ground) / n * 6 + nz(x * 0.06, y * 0.06) * 0.5)))];
        if (y >= ground && y < ground + 2 * s) bg[i] = turf;
      }
      // the excavation plan: shaft first, then each level outward, in order
      const plan = [], H = Math.max(3, Math.round(4 * s));
      for (let y = surf; y < lastL + H; y++) plan.push([shaftX, y, 'shaft']);
      for (const ly of levels) { const L = R.int(18, 40) * s, Rr = R.int(18, 40) * s; for (let k = 1; k < Math.max(L, Rr); k++) { if (k < L && shaftX - k > 2) plan.push([shaftX - k, ly, 'drift']); if (k < Rr && shaftX + k < n - 3) plan.push([shaftX + k, ly, 'drift']); } }
      const T = 34, dug = new Uint8Array(n * n), blasts = [], ptr = pointer(g);
      return (t, dt, f) => {
        const p = ptr(dt, n);
        if (p.active) for (const [x, y] of p.taps) if (y > surf + 3) blasts.push({ x, y, age: 0, r: g.alt.range(3, 6) * s });
        const ear = hear(g);
        if (ear && ear.beats) blasts.push({ x: g.alt.range(0.1, 0.9) * n, y: g.alt.range(surf + 8 * s, n - 6 * s), age: 0, r: g.alt.range(3, 6) * s });
        while (blasts.length > 24) blasts.shift();   // a burst of clicks: the oldest chambers are already open in `dug`
        const tt = t % T, upto = Math.min(plan.length, Math.floor(plan.length * Math.min(1, tt / 24)));
        if (tt < dt * 1.5) { dug.fill(0); blasts.length = 0; }
        // before the hill starts over, the workings slowly fill back in rather than vanishing at once
        const refill = tt > T - 3 ? (tt - (T - 3)) / 3 : 0;
        for (const b of blasts) { b.age += dt; if (b.age > 0.6) continue; const r = b.r * Math.min(1, b.age * 3); for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) if (xx * xx + yy * yy * 1.6 <= r * r) { const X0 = Math.round(b.x + xx), Y0 = Math.round(b.y + yy); if (X0 >= 0 && Y0 > surf && X0 < n && Y0 < n) dug[Y0 * n + X0] = 1; } }
        for (let k = 0; k < upto; k++) { const [x, y, kind] = plan[k]; for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < (kind === 'shaft' ? H : 1); xx++) { const X0 = x + xx - (kind === 'shaft' ? H >> 1 : 0), Y0 = y - yy; if (X0 >= 0 && X0 < n && Y0 >= 0 && Y0 < n) dug[Y0 * n + X0] = 1; } }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { let c = bg[i]; if (dug[i] && !(refill && X.dith4(x, y) < refill)) c = c === gold ? dugOre : X.rgb(26, 20, 18); else if (c === gold && (i * 13 + Math.floor(t * 2)) % 37 === 0) c = WHITE; d[i] = c; }
        for (const b of blasts) if (b.age < 0.6) for (let q = 0; q < 10; q++) { const a = q / 10 * TAU + b.age * 3, r = b.age * 20 * s; X.put(g, b.x + Math.cos(a) * r, b.y + Math.sin(a) * r, q & 1 ? X.rgb(255, 220, 80) : X.rgb(255, 120, 30)); }
        // headframe over the shaft
        X.line(g, shaftX - 5 * s, surf, shaftX, surf - 10 * s, X.rgb(60, 50, 40)); X.line(g, shaftX + 5 * s, surf, shaftX, surf - 10 * s, X.rgb(60, 50, 40)); X.rect(g, shaftX - s, surf - 11 * s, 2 * s, 2 * s, X.rgb(60, 50, 40));
        // miners at the faces still being dug
        if (upto < plan.length) {
          const [x, y] = plan[upto], dir = x < shaftX ? -1 : 1;
          X.rect(g, x - dir * 2 * s, y - 3 * s, 2 * s, 3 * s, X.rgb(60, 90, 160)); X.put(g, x - dir * s, y - 4 * s, X.rgb(240, 220, 60));
          if ((f >> 1) & 1) X.put(g, x, y - 2 * s, X.rgb(220, 220, 220));
        }
        // the cage rides the shaft
        const cageY = surf + (lastL - surf) * (0.5 - 0.5 * Math.cos(t * 0.5));
        if (upto > lastL - surf && refill < 0.3) X.rect(g, shaftX - H / 2, cageY - H, H, H, X.rgb(170, 170, 180));
        // carts on finished levels
        levels.forEach((ly, j) => {
          const reach = plan.filter((p, k) => k < upto && p[1] === ly && p[2] === 'drift');
          if (reach.length < 8 || refill > 0.3) return;
          const xs = reach.map(p => p[0]), lo = Math.min(...xs), hi = Math.max(...xs), cx = lo + (hi - lo) * (0.5 + 0.5 * Math.sin(t * 0.3 + j * 2));
          X.rect(g, cx - 2 * s, ly - 2 * s, 4 * s, 2 * s, X.rgb(120, 120, 130)); X.put(g, cx - s, ly - 2.5 * s, gold); X.put(g, cx + s, ly - 2.5 * s, gold);
        });
      };
    },
  });

  add({
    name: 'Bismuth', seed: 5, sizes: [50], fps: 10,
    interactive: 'Click to seed a new crystal there; your seeds grow again in every new cluster.',
    recipe: 'A cluster of bismuth hopper crystals filling the frame: stepped square spirals, terrace inside terrace, each step lit on two edges and shadowed on two, its oxide film painting it gold, magenta, blue or green and slowly shifting as the film thickens. They grow, hold, and re-melt for the next cluster.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g);
      const FILMS = [[rgb(240, 190, 40), rgb(230, 60, 160), rgb(60, 110, 240), rgb(40, 210, 170)], [rgb(250, 140, 40), rgb(170, 60, 220), rgb(40, 180, 240), rgb(240, 220, 80)], [rgb(80, 220, 240), rgb(60, 80, 230), rgb(220, 50, 180), rgb(250, 200, 60)]];
      const filmI = R.int(0, 2), film = FILMS[filmI], backI = R.int(0, 2), back = [rgb(20, 18, 26), rgb(32, 30, 36), rgb(12, 16, 22)][backI];
      g.trait('Film', ['Sunset', 'Peacock', 'Lagoon'][filmI]); g.trait('Ground', ['Soot', 'Pewter', 'Ink'][backI]);
      // the habit: the original mix of stepped squares and diamonds, or all squares, or all diamonds
      const habit = g.trait('Habit', g.home ? 'Mixed' : g.alt.pick(['Mixed', 'Mixed', 'Squares', 'Diamonds']));
      const filmAt = h => { h = ((h % 4) + 4) % 4; const i = Math.floor(h), f = h - i; return f < 0.5 ? film[i] : film[(i + 1) % 4]; };
      let crystals = [], t0 = 0, old = null, meltT = -9;
      const seeds = [];   // the viewers' seed points (the last eight), regrown in each new cluster
      const seedCrystal = (x, y, at) => ({ x, y, step: 2, max: g.alt.int(5, 9), at, h0: g.alt.range(0, 4), diag: g.alt.bool(0.25), skew: 0, mine: true });
      // a cluster on a loose grid so the crystals cover the frame; the first one starts already grown
      function grow(t, head) {
        t0 = t - head; crystals = [];
        const cells = R.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, R.int(6, 9));
        cells.forEach((c, i) => crystals.push({ x: ((c % 3) + 0.5 + R.range(-0.3, 0.3)) * n / 3, y: (Math.floor(c / 3) + 0.5 + R.range(-0.3, 0.3)) * n / 3, step: R.pick([2, 2, 3]), max: R.int(5, 9), at: i * 0.6, h0: R.range(0, 4), diag: R.bool(0.2), skew: R.int(0, 1) }));
        if (habit !== 'Mixed') for (const c of crystals) c.diag = habit === 'Diamonds';
        if (!g.traits.some(q => q[0] === 'Crystals')) g.trait('Crystals', crystals.length);
        crystals.sort((a, b) => b.max * b.step - a.max * a.step);
        seeds.forEach(([x, y], i) => crystals.push(seedCrystal(x, y, 1 + i * 0.5)));
      }
      grow(0, 9);
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) for (const [x, y] of p.taps) {
          seeds.push([x, y]); if (seeds.length > 8) seeds.shift();
          crystals.push(seedCrystal(x, y, t - t0));
          // a burst of clicks: keep only the newest dozen of the viewers' crystals growing
          let mine = 0; for (let i = crystals.length - 1; i >= 0; i--) if (crystals[i].mine && ++mine > 12) crystals.splice(i, 1);
        }
        const tt = t - t0;
        // the cluster re-melts: the old one dissolves away through a dither as the new one starts
        if (tt > 36 && !p.active) { old = d.slice(); meltT = t; grow(t, 2); }
        d.fill(back);
        for (let i = 0; i < n * n; i += 5) d[i] = X.shade(back, 1.3);
        for (const c of crystals) {
          const k = Math.min(c.max, Math.floor(Math.max(0, tt - c.at) * 1.1));
          for (let r = k; r >= 0; r--) {
            const h = c.h0 + r * 0.35 + tt * 0.04, col = filmAt(h), hi = X.mixPk(col, WHITE, 0.5), lo = X.shade(col, 0.4);
            const half = (r + 1) * c.step;
            if (!c.diag) {
              const x0 = Math.round(c.x - half) + (c.skew ? r % 2 : 0), y0 = Math.round(c.y - half), w = 2 * half;
              X.rect(g, x0, y0, w, w, col);
              X.rect(g, x0, y0, w, 1, hi); X.rect(g, x0, y0, 1, w, hi);
              X.rect(g, x0, y0 + w - 1, w, 1, lo); X.rect(g, x0 + w - 1, y0, 1, w, lo);
            } else {
              const P2 = (o, cl) => X.poly(g, [c.x, c.y - half + o, c.x + half - o, c.y, c.x, c.y + half - o, c.x - half + o, c.y], cl);
              P2(0, lo); P2(1, hi); P2(2, col);
            }
          }
          // the hopper's hollow: the innermost steps sunk dark
          if (k > 1 && !c.diag) { const hh = c.step; X.rect(g, Math.round(c.x - hh), Math.round(c.y - hh), 2 * hh, 2 * hh, X.shade(filmAt(c.h0 + tt * 0.04), 0.25)); }
        }
        if (old) { const k = (t - meltT) / 1.6; if (k >= 1) old = null; else for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) if (X.dith4(x, y) >= k) d[i] = old[i]; }
      };
    },
  });

  add({
    name: 'Thin Section', seed: 1, sizes: [80], fps: 10,
    interactive: 'Drag round the circle to turn the stage; click to swap crossed and plain light.',
    recipe: 'A slice of rock under a polarising microscope: grains of two or three minerals glow their own interference colours, from first-order greys and straw to vivid second-order blues, greens and magentas; each goes black four times a turn of the stage, twinned crystals flicker stripe by stripe, and opaque grains stay dark. A crosshair and a scale bar sit over the view.',
    make(R, U, g) {
      const area = R.range(500, 1000), { n, d } = g, ptr = pointer(g), M = 2 * n, k = Math.round(M * M / area), reg = regions(R, M, k, R.range(0.7, 1.6));
      g.trait('Grain', area > 800 ? 'Coarse' : area < 650 ? 'Fine' : 'Medium');
      // the view: the round field of the microscope, or a square field from the camera port (closer in)
      const square = g.trait('Field', g.home ? 'Round' : g.alt.pick(['Round', 'Round', 'Square'])) === 'Square', zoom = square ? 1.34 : 1.9;
      // interference colours by retardation order, as flat steps
      const ORDER = [rgb(20, 20, 24), rgb(90, 90, 100), rgb(170, 175, 185), rgb(240, 240, 230), rgb(250, 230, 110), rgb(250, 160, 50), rgb(230, 50, 80), rgb(150, 40, 200), rgb(40, 90, 240), rgb(40, 180, 230), rgb(50, 210, 110), rgb(220, 240, 60), rgb(250, 120, 140), rgb(170, 90, 230), rgb(90, 220, 210)];
      const MINERALS = [{ lo: 1, hi: 4, plain: rgb(240, 238, 232) }, { lo: 5, hi: 12, plain: rgb(200, 230, 170) }, { lo: 11, hi: 14, plain: rgb(250, 248, 240) }, { lo: 3, hi: 7, plain: rgb(160, 110, 60) }];
      const mins = R.shuffle(MINERALS.slice()).slice(0, R.int(2, 3));
      g.trait('Minerals', mins.map(m => ['Quartz', 'Olivine', 'Calcite', 'Biotite'][MINERALS.indexOf(m)]).join(', ')); g.trait('Count', mins.length);
      const th = Float32Array.from({ length: k }, () => R() * Math.PI), grain = Array.from({ length: k }, () => { const m = R.pick(mins); return { m, o: R.int(m.lo, m.hi), kind: R() < 0.08 ? 2 : R() < 0.3 ? 1 : 0 }; });
      const cx = n / 2, cy = n / 2, rr = n * 0.47;
      const edgeM = new Uint8Array(M * M), twin = new Uint8Array(M * M);
      for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) { const j = y * M + x, r = reg.id[j]; edgeM[j] = (x + 1 < M && reg.id[j + 1] !== r) || (y + 1 < M && reg.id[j + M] !== r) ? 1 : 0; twin[j] = ((x + y * 0.6) / 6 | 0) % 2; }
      const colA = new Uint32Array(k), colB = new Uint32Array(k);
      let stage = R() * TAU, crossed = true, dragA = null, plainT = 0;
      const tone = (r, a) => { const s2 = Math.pow(Math.sin(2 * a), 2), G = grain[r]; if (s2 < 0.12) return rgb(8, 8, 10); return s2 < 0.45 ? X.shade(ORDER[G.o], 0.55) : ORDER[G.o]; };
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          for (const [x, y] of p.taps) { if (Math.hypot(x - cx, y - cy) < rr * 0.35) crossed = !crossed; }
          if (p.down && Math.hypot(p.x - cx, p.y - cy) > rr * 0.35) { const a = Math.atan2(p.y - cy, p.x - cx); if (dragA !== null) stage += a - dragA; dragA = a; } else dragA = null;
          plainT = 0;
        } else {
          stage += dt * 0.22;
          // left in plain light, the microscope goes back to crossed polars after a while
          if (!crossed && (plainT += dt) > 8) crossed = true;
        }
        for (let r = 0; r < k; r++) {
          const G = grain[r];
          if (G.kind === 2) { colA[r] = colB[r] = rgb(10, 10, 12); continue; }
          if (!crossed) { colA[r] = colB[r] = X.shade(G.m.plain, 0.85 + 0.15 * Math.cos(th[r] * 3)); continue; }
          colA[r] = tone(r, th[r] + stage); colB[r] = G.kind === 1 ? tone(r, th[r] + stage + 0.6) : colA[r];
        }
        const c = Math.cos(stage), sn = Math.sin(stage);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, dx = x + 0.5 - cx, dy = y + 0.5 - cy, q = dx * dx + dy * dy;
          if (square ? Math.max(Math.abs(dx), Math.abs(dy)) > rr : q > rr * rr) { d[i] = (square ? Math.max(Math.abs(dx), Math.abs(dy)) < rr + 2 : q < (rr + 2) * (rr + 2)) ? rgb(70, 70, 80) : rgb(8, 8, 10); continue; }
          const sx = Math.round(M / 2 + (dx * c - dy * sn) * zoom), sy = Math.round(M / 2 + (dx * sn + dy * c) * zoom);
          if (sx < 0 || sy < 0 || sx >= M || sy >= M) { d[i] = BLACK; continue; }
          const j = sy * M + sx, r = reg.id[j];
          d[i] = edgeM[j] ? (crossed ? rgb(16, 12, 12) : rgb(120, 110, 100)) : twin[j] ? colB[r] : colA[r];
        }
        // crosshair and scale bar
        const cc = crossed ? rgb(220, 220, 220) : rgb(30, 30, 30);
        for (let k2 = -rr + 3; k2 < rr - 3; k2 += 1) { if (Math.abs(k2) < 2) continue; X.put(g, cx + k2, cy, cc); X.put(g, cx, cy + k2, cc); }
        X.rect(g, n - 18, n - 5, 12, 1, WHITE); X.rect(g, n - 18, n - 6, 1, 3, WHITE); X.rect(g, n - 7, n - 6, 1, 3, WHITE);
        X.rect(g, 2, 2, 3, 3, crossed ? rgb(240, 200, 60) : rgb(120, 120, 130)); X.rect(g, 6, 2, 3, 3, crossed ? rgb(240, 200, 60) : BLACK);
      };
    },
  });

  add({
    name: 'Basalt', seed: 4, sizes: [80, 100], fps: 12,
    interactive: 'Click to send a big wave in over the columns.',
    listens: 'The swell rises with the noise of the room; clap to send a wave in.',
    recipe: 'Six-sided basalt columns packed into a causeway, seen from above at an angle; the sea washes in and out between them, filling the low ones and leaving foam along their edges.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R).n2, hr0 = R.range(5.5, 7.5) * s;
      // the causeway: column size (now and then giant columns), which way the shore rises, the stone,
      // and the sea's light (the original is a grey-blue day with the land at the top)
      const A = g.alt, H0 = g.home, giant = !H0 && A.bool(0.2), hr = giant ? hr0 * 1.45 : hr0, rows = Math.ceil(n / (hr * 1.2)) + 4, cols = Math.ceil(n / (hr * 1.75)) + 2;
      g.trait('Columns', giant ? 'Giant' : hr0 < 6.4 * s ? 'Fine' : 'Coarse');
      const shore = g.trait('Land', H0 ? 'Behind' : A.pick(['Behind', 'Behind', 'Left', 'Ridge']));
      const stoneI = R.int(0, 2), STONES = [[X.rgb(60, 60, 66), X.rgb(90, 90, 98), X.rgb(130, 130, 136)], [X.rgb(66, 54, 50), X.rgb(100, 84, 76), X.rgb(150, 128, 112)], [X.rgb(40, 50, 56), X.rgb(70, 86, 92), X.rgb(120, 140, 140)], [X.rgb(110, 104, 96), X.rgb(160, 152, 140), X.rgb(210, 202, 188)], [X.rgb(80, 36, 30), X.rgb(130, 64, 50), X.rgb(180, 104, 80)]];
      const stoneN = H0 ? stoneI : A.bool(0.25) ? A.int(3, 4) : stoneI, stone = STONES[stoneN];
      g.trait('Stone', ['Basalt', 'Ironstone', 'Bluestone', 'Pale tuff', 'Red scoria'][stoneN]);
      const seaK = g.trait('Sea', H0 ? 'Day' : A.pick(['Day', 'Day', 'Storm', 'Sunset', 'Night']));
      const sea = { Day: [X.rgb(30, 70, 110), X.rgb(50, 100, 140), X.rgb(220, 235, 240)], Storm: [X.rgb(40, 62, 66), X.rgb(64, 90, 92), X.rgb(200, 210, 206)], Sunset: [X.rgb(70, 50, 100), X.rgb(200, 110, 110), X.rgb(255, 220, 180)], Night: [X.rgb(10, 20, 44), X.rgb(30, 50, 90), X.rgb(170, 190, 220)] }[seaK];
      const cells = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = i * hr * 1.75 + (j & 1 ? hr * 0.87 : 0), y = j * hr * 1.0 - 2 * hr;
        const rise = shore === 'Left' ? 1 - x / n : shore === 'Ridge' ? 1 - Math.abs(x - n / 2) / (n * 0.5) : 1 - y / n;
        const h = Math.max(0, rise * 14 * s + nz(x * 0.03, y * 0.03) * 8 * s + R.range(-2, 2) * s);
        cells.push({ x, y, h });
      }
      cells.sort((a, b) => a.y - b.y);
      const hex = (cx, cy) => { const pts = []; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; pts.push(cx + Math.cos(a) * hr, cy + Math.sin(a) * hr * 0.55); } return pts; };
      const ptr = pointer(g);
      let surge = 0, swell = 0;
      const foam = (x, y, i) => { if ((i + (x >> 1)) % 3 !== 2) X.put(g, x, y, sea[2]); };   // broken, lacy foam
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active && p.taps.length) surge = 1;
        const ear = hear(g);
        if (ear && ear.beats && surge < 0.2) surge = 0.75;
        surge = Math.max(0, surge - dt * 0.5);
        swell += ((ear ? ear.level * 3.5 * s : 0) - swell) * Math.min(1, dt * 1.5);
        const level = 4 * s + 3 * s * Math.sin(t * 0.45) + 1.2 * s * Math.sin(t * 1.1) + Math.sin(surge * Math.PI) * 9 * s + swell;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((x + Math.floor(t * 3) + (y >> 1) * 5) % 13 === 0) ? sea[1] : sea[0];
        for (const c of cells) {
          const top = c.y - c.h, wet = c.h < level;
          // side wall down to the water, then the top
          const pts = hex(c.x, top);
          const foot = c.y - Math.min(level, c.h), lowr = hex(c.x, foot);
          if (foot > top) X.poly(g, [pts[0], pts[1], lowr[0], lowr[1], lowr[2], lowr[3], lowr[4], lowr[5], lowr[6], lowr[7], pts[6], pts[7], pts[8], pts[9], pts[10], pts[11]], stone[0]);
          X.poly(g, pts, wet ? X.mixPk(stone[1], sea[1], 0.6) : X.mixPk(stone[1], stone[2], 0.35 + 0.3 * ((c.x * 7 + c.y * 3 | 0) % 3) / 2));
          // crisp edges: the far rim catches the light, the near rim is a dark arris over the wall
          if (!wet) { for (const k of [3, 4, 5]) X.line(g, pts[2 * k], pts[2 * k + 1], pts[(2 * k + 2) % 12], pts[(2 * k + 3) % 12], stone[2]); for (const k of [0, 1, 2]) X.line(g, pts[2 * k], pts[2 * k + 1], pts[2 * k + 2], pts[2 * k + 3], X.shade(stone[0], 0.75)); }
          else if (level - c.h < 1.5 * s) for (let k = 0; k < 6; k++) X.line(g, pts[2 * k], pts[2 * k + 1], pts[(2 * k + 2) % 12], pts[(2 * k + 3) % 12], foam);
          // foam where the sea meets a dry column, along its near edges at the waterline
          if (!wet && c.h - level < 3 * s) { const lw = hex(c.x, c.y - level); for (const k of [0, 1, 2]) X.line(g, lw[2 * k], lw[2 * k + 1], lw[2 * k + 2], lw[2 * k + 3], foam); }
        }
      };
    },
  });
})();
