// Set 2 · Raster: lines, polygons and worlds turned into cells by the
// algorithms that first drew them on screens.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  const inkName = cols => { const p = U.PALETTES.find(pl => cols.every(c => pl.cols.some(q => U.pk(q) === c))); return p ? p.name : 'Spectrum'; };

  // Road's hour (second stream): day as before, a warm dusk, or night with the stars out
  function roadHour(g, n) {
    const hour = g.home ? 'Day' : g.alt.pick(['Day', 'Day', 'Dusk', 'Night']), A = g.alt, d = g.d;
    const stars = hour === 'Night' ? Array.from({ length: n }, () => [Math.floor(A() * n), Math.floor(A() * n * 0.4)]) : [];
    return {
      hour,
      grade() {
        if (hour === 'Day') return;
        if (hour === 'Night') { for (let i = 0; i < n * n; i++) { const c = d[i], l = X.lum(c); d[i] = l > 0.85 ? X.shade(c, 0.85) : X.rgb((c & 255) * 0.24, (c >> 8 & 255) * 0.28, (c >> 16 & 255) * 0.5); } for (const [x, y] of stars) if (X.lum(d[y * n + x]) < 0.15) d[y * n + x] = (x + y) % 4 ? 0xff8a8a8a : WHITE; return; }
        for (let i = 0; i < n * n; i++) d[i] = X.shade(X.mixPk(d[i], 0xff4a70f0, 0.22), 0.88);
      },
    };
  }

  // Raycaster's walker: it plans a route to a far, open part of the maze (never into a dead end)
  // and walks it without stopping, the view swinging round early at each corner so it looks down
  // the next corridor instead of staring at the wall in front.
  function walker(R, map, M) {
    const route = [];
    const plan = st => {
      const sx = Math.floor(st.cx), sy = Math.floor(st.cy), start = sy * M + sx, prev = new Int32Array(M * M).fill(-1), dist = new Int32Array(M * M), q = [start];
      prev[start] = start;
      for (let h = 0; h < q.length; h++) { const i = q[h]; for (const o of [1, -1, M, -M]) { const j = i + o; if (j >= 0 && j < M * M && !map[j] && prev[j] < 0) { prev[j] = i; dist[j] = dist[i] + 1; q.push(j); } } }
      const deg = i => (map[i + 1] ? 0 : 1) + (map[i - 1] ? 0 : 1) + (map[i + M] ? 0 : 1) + (map[i - M] ? 0 : 1);
      const far = q.filter(i => dist[i] >= 6 && deg(i) >= 2), goal = far.length ? R.pick(far) : q[q.length - 1];
      route.length = 0; route.push([sx + 0.5, sy + 0.5]);
      const path = []; for (let i = goal; i !== start && i >= 0; i = prev[i]) path.unshift(i);
      for (const i of path) route.push([i % M + 0.5, (i / M | 0) + 0.5]);
    };
    return {
      reset() { route.length = 0; },
      // face down the first stretch of the route from the start
      aim(st) { plan(st); const a = route[1] || route[0]; st.dir = Math.atan2(a[1] - st.cy, a[0] - st.cx) || 0; },
      step(st) {
        if (route.length && route.length < 2 && Math.hypot(route[0][0] - st.cx, route[0][1] - st.cy) < 0.06) route.shift();
        if (!route.length) plan(st);
        const target = route[0], ahead = route[1] || route[0], dist = Math.hypot(target[0] - st.cx, target[1] - st.cy), k = Math.max(0, 1 - dist / 0.5);
        const lx = target[0] + (ahead[0] - target[0]) * k * 1.5, ly = target[1] + (ahead[1] - target[1]) * k * 1.5;
        if (Math.hypot(lx - st.cx, ly - st.cy) > 0.02) {
          let da = Math.atan2(ly - st.cy, lx - st.cx) - st.dir; while (da > Math.PI) da -= U.TAU; while (da < -Math.PI) da += U.TAU;
          st.dir += Math.sign(da) * Math.min(Math.abs(da), 0.16);
        }
        if (dist < 0.06) { st.cx = target[0]; st.cy = target[1]; route.shift(); }
        else { st.cx += (target[0] - st.cx) / dist * 0.06; st.cy += (target[1] - st.cy) / dist * 0.06; }
      },
    };
  }

  P.addPixel({
    name: 'Fibonacci Word', seed: 1, fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'Read the word 0100101001001… one digit at a time: step forward, and on every 0 turn left or right by whether the step is even or odd. The path is a fractal of nested corners.',
    make(R, U, g) {
      const { n, d } = g, dir0 = R.int(0, 3);
      let step = n >= 200 ? 3 : 2;
      const walk = word => {
        const out = [[0, 0]];
        let x = 0, y = 0, dir = dir0;
        for (let k = 1; k <= word.length; k++) {
          x += [1, 0, -1, 0][dir]; y += [0, 1, 0, -1][dir]; out.push([x, y]);
          if (word[k - 1] === '0') dir = (dir + (k % 2 === 0 ? 1 : 3)) % 4;
        }
        return out;
      };
      const box = p => { let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity; for (const [px, py] of p) { x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py); } return [x0, x1, y0, y1]; };
      // the largest whole Fibonacci word whose drawing fits the canvas
      let a = '0', b = '01', pts = walk(b), bb = box(pts);
      for (;;) {
        const c = b + a, p = walk(c), q = box(p);
        if (Math.max(q[1] - q[0], q[3] - q[2]) * step > n - 4) break;
        a = b; b = c; pts = p; bb = q;
      }
      const [x0, x1, y0, y1] = bb, m = pts.length - 1;
      step = Math.max(step, Math.floor((n - 6) / Math.max(x1 - x0, y1 - y0)));
      // the drawing is a long strip, so lay copies of it side by side across the canvas
      const w = (x1 - x0) * step, h = (y1 - y0) * step, across = w < h, size = across ? w : h, copies = Math.max(1, Math.floor((n - 4) / (size + 4)));
      const gap = ((n - copies * size) / (copies + 1));
      const origins = Array.from({ length: copies }, (_, c) => across ? [Math.round(gap + c * (size + gap) - x0 * step), Math.round((n - h) / 2 - y0 * step)] : [Math.round((n - w) / 2 - x0 * step), Math.round(gap + c * (size + gap) - y0 * step)]);
      const ramp = X.rampPk(X.inks(R, 5, 0.5), 64, true), bg = BLACK, draw = R.range(10, 16), hold = 4, cycle = draw + hold;
      return t => {
        d.fill(bg);
        origins.forEach(([ox, oy], c) => {
          const k = (t + c * cycle / copies * 0.5) % cycle, upto = Math.min(m, Math.floor(m * k / draw));
          for (let i = 1; i <= upto; i++) {
            const col = ramp[Math.floor(i / m * 64 * 2 + c * 11 + t * 6) & 63];
            X.line(g, ox + pts[i - 1][0] * step, oy + pts[i - 1][1] * step, ox + pts[i][0] * step, oy + pts[i][1] * step, col);
          }
          if (upto < m && upto > 0) X.put(g, ox + pts[upto][0] * step, oy + pts[upto][1] * step, WHITE);
        });
      };
    },
  });

  P.addPixel({
    name: 'Even-Odd', seed: 2, fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'Several star polygons turning at different speeds, filled by the even-odd rule: every cell counts which stars cover it, and that count of overlaps picks the colour.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, k = R.int(3, 4), cnt = new Uint8Array(N), inks = X.inks(R, 1 << k, 0.5), cols = Array.from({ length: 1 << k }, (_, i) => (i === 0 ? BLACK : inks[i % inks.length]));
      const stars = Array.from({ length: k }, (_, j) => { const p = R.pick([5, 7, 8, 9, 11]), q = R.pick([2, 3]); return { p, q: p === 8 && q === 2 ? 3 : q, r: n * R.range(0.28, 0.5), v: R.range(0.05, 0.15) * R.sign(), cx: n / 2 + R.range(-0.08, 0.08) * n, cy: n / 2 + R.range(-0.08, 0.08) * n, bit: 1 << j }; });
      const layout = g.home ? 'Centred' : g.alt.pick(['Centred', 'Centred', 'Scattered', 'Nested']);
      if (layout === 'Scattered') for (const st of stars) { st.cx = n * (0.25 + g.alt() * 0.5); st.cy = n * (0.25 + g.alt() * 0.5); st.r *= 0.72; }
      if (layout === 'Nested') stars.forEach((st, j) => { st.cx = st.cy = n / 2; st.r = n * (0.5 - j * 0.38 / k); });
      g.trait('Layout', layout); g.trait('Stars', k); g.trait('Points', stars.map(s => s.p).join(' ')); g.trait('Palette', inkName(inks)); g.trait('Grid', n);
      // like stained glass: where more stars overlap the light is stronger, and a darker leading
      // runs round every region where the count changes
      const pop = m => { let c = 0; while (m) { c += m & 1; m >>= 1; } return c; };
      const lit = cols.map((c, m) => m ? X.mixPk(c, WHITE, 0.1 * (pop(m) - 1)) : c), lead = lit.map((c, m) => m ? X.shade(c, 0.5) : c);
      return t => {
        cnt.fill(0);
        for (const s of stars) {
          const pts = [];
          for (let i = 0; i < s.p; i++) { const a = (i * s.q / s.p) * U.TAU + t * s.v; pts.push(s.cx + Math.cos(a) * s.r, s.cy + Math.sin(a) * s.r); }
          X.poly({ n, d: cnt }, pts, (x, y) => cnt[y * n + x] | s.bit);
        }
        for (let i = 0; i < N; i++) { const m = cnt[i], x = i % n; d[i] = m && ((x < n - 1 && cnt[i + 1] !== m) || (i < N - n && cnt[i + n] !== m)) ? lead[m] : lit[m]; }
      };
    },
  });

  P.addPixel({
    name: 'Low Poly', seed: 1, fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'A mesh of triangles whose corners drift, each filled flat with the colour of a landscape sampled at its centre: a sunset rendered the way early 3D hardware would have.',
    make(R, U, g) {
      const { n, d } = g, G = R.int(6, 10), nz = U.noise(R), inks0 = X.inks(R, 5, 0.4, true);
      // palettes with fewer than five colours left gaps here (a grey sun, grey skies): spread five over what there is
      const inks = Array.from({ length: 5 }, (_, k) => inks0[Math.round(k / 4 * (inks0.length - 1))]);
      const sky = X.rampPk([X.shade(inks[0], 0.4), inks[2], X.mixPk(inks[4], WHITE, 0.5)], 32), land = X.rampPk([X.shade(inks0[1], 0.25), inks0[3] === undefined ? BLACK : X.shade(inks0[3], 0.6)], 32);
      const jit = Array.from({ length: (G + 1) * (G + 1) }, () => [R.range(0, 6), R.range(0, 6), R.range(0.3, 0.6)]), flips = Array.from({ length: G * G }, () => R.bool());
      const horizon = R.range(0.5, 0.65), sunX = R.range(0.3, 0.7);
      // the land (second stream): rolling hills as before, high peaks or open plains
      const terrain = g.home ? 'Hills' : g.alt.pick(['Hills', 'Hills', 'Peaks', 'Plains']), relief = terrain === 'Peaks' ? 0.34 : terrain === 'Plains' ? 0.05 : 0.15;
      g.trait('Mesh', G + 'x' + G); g.trait('Palette', inkName(inks0)); g.trait('Land', terrain); g.trait('Horizon', horizon < 0.57 ? 'High' : 'Low'); g.trait('Sun', sunX < 0.43 ? 'Left' : sunX > 0.57 ? 'Right' : 'Centre'); g.trait('Grid', n);
      const picture = (u, v) => {
        const ridge = horizon - relief * (nz.n2(u * 2.5, 1) * 0.6 + 0.4) ;
        if (v > ridge) return land[Math.min(31, Math.floor((v - ridge) / (1 - ridge) * 32))];
        const sun = Math.hypot(u - sunX, v - horizon + 0.1) < 0.12;
        return sun ? X.mixPk(inks[4], WHITE, 0.7) : sky[Math.min(31, Math.floor(v / ridge * 31))];
      };
      // each facet is lit as if it tilted: corners sit at heights from a smooth noise, and the
      // facet's slope toward the light (upper left) brightens or darkens its flat colour a little
      const facet = (tr, c) => {
        const z = p => nz.n2(p[0] / n * 3 + 7, p[1] / n * 3) * n * 0.12;
        const ux = tr[1][0] - tr[0][0], uy = tr[1][1] - tr[0][1], uz = z(tr[1]) - z(tr[0]), vx = tr[2][0] - tr[0][0], vy = tr[2][1] - tr[0][1], vz = z(tr[2]) - z(tr[0]);
        let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nzz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nzz) || 1; if (nzz < 0) { nx = -nx; ny = -ny; nzz = -nzz; }
        const k = (-nx * 0.6 - ny * 0.7) / l;
        return k > 0 ? X.mixPk(c, WHITE, Math.min(0.15, k * 0.4)) : X.shade(c, Math.max(0.84, 1 + k * 0.4));
      };
      return t => {
        const at = (i, j) => { const q = jit[j * (G + 1) + i], edgeX = i === 0 || i === G, edgeY = j === 0 || j === G; return [(i + (edgeX ? 0 : Math.sin(t * q[2] + q[0]) * 0.35)) * n / G, (j + (edgeY ? 0 : Math.cos(t * q[2] + q[1]) * 0.35)) * n / G]; };
        for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
          const a = at(i, j), b = at(i + 1, j), c = at(i + 1, j + 1), e = at(i, j + 1);
          const tris = flips[j * G + i] ? [[a, b, c], [a, c, e]] : [[a, b, e], [b, c, e]];
          for (const tr of tris) {
            const cx = (tr[0][0] + tr[1][0] + tr[2][0]) / 3 / n, cy = (tr[0][1] + tr[1][1] + tr[2][1]) / 3 / n;
            X.poly(g, [tr[0][0], tr[0][1], tr[1][0], tr[1][1], tr[2][0], tr[2][1]], facet(tr, picture(cx, cy)));
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Raycaster', fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    interactive: 'Point left or right to turn, hold the button to walk forward.',
    recipe: 'A first-person walk through a generated maze, drawn as the first such games drew it: one ray per column of the screen, and each wall slice as tall as the ray was short. Brick, stone or panelled walls over a plain or chequered floor.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, M = 15, map = new Uint8Array(M * M).fill(1), inks = X.inks(R, 4, 0.4);
      const carve = (x, y) => { map[y * M + x] = 0; for (const [dx, dy] of R.shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]])) { const xx = x + dx, yy = y + dy; if (xx > 0 && yy > 0 && xx < M - 1 && yy < M - 1 && map[yy * M + xx]) { map[(y + dy / 2) * M + x + dx / 2] = 0; carve(xx, yy); } } };
      carve(1, 1);
      for (let k = 0; k < 12; k++) { const x = R.int(1, M - 2), y = R.int(1, M - 2); if (map[y * M + x] && (x + y) & 1) map[y * M + x] = 0; }
      for (let i = 0; i < M * M; i++) if (map[i]) map[i] = R.int(1, 3);
      const wallTex = [0, ...[0, 1, 2].map(k => { const c = inks[k % inks.length], tex = new Uint32Array(64); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) tex[y * 8 + x] = (y % 4 === 0 || (x + (y >> 2) * 4) % 8 === 0) ? X.shade(c, 0.45) : X.shade(c, 0.85 + ((x * 7 + y * 3) % 5) * 0.04); return tex; })];
      const ceil = X.shade(inks[3 % inks.length], 0.2), flr = X.shade(inks[0], 0.3);
      g.trait('Maze', M + 'x' + M); g.trait('Walls', inkName(inks)); g.trait('Floor', 'Plain'); g.trait('Roof', 'Ceiling'); g.trait('Grid', n);
      // a walk: from cell to neighbouring open cell, preferring not to turn back
      let cx = 1.5, cy = 1.5, dir = 0, target = null, prev = -1, ahead = null;
      const open = (x, y) => x >= 0 && y >= 0 && x < M && y < M && !map[y * M + x];
      const pickNext = () => {
        const x = Math.floor(cx), y = Math.floor(cy), opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => open(x + dx, y + dy) && (y + dy) * M + x + dx !== prev);
        const o = opts.length ? R.pick(opts) : [[1, 0], [-1, 0], [0, 1], [0, -1]].find(([dx, dy]) => open(x + dx, y + dy));
        prev = y * M + x; target = [x + o[0] + 0.5, y + o[1] + 0.5];
      };
      pickNext();
      const walk = walker(R, map, M), walkSt = { cx, cy, dir };
      walk.aim(walkSt); dir = walkSt.dir;
      const inp = g.input;
      let idle = 99;
      return (t, dt) => {
        inp.taps();
        if (inp.inside && inp.live && (inp.down || Math.abs(inp.x - 0.5) > 0.12)) idle = 0; else idle += dt || 0;
        if (idle < 3) {   // the viewer walks: turn toward the pointer, walk while held
          dir += (inp.x - 0.5) * 0.12;
          if (inp.down) { const sx = Math.cos(dir), sy = Math.sin(dir), nx = cx + sx * 0.08, ny = cy + sy * 0.08; if (open(Math.floor(nx + Math.sign(sx) * 0.3), Math.floor(cy))) cx = nx; if (open(Math.floor(cx), Math.floor(ny + Math.sign(sy) * 0.3))) cy = ny; }
          walk.reset();
        } else {
          const st = walkSt; st.cx = cx; st.cy = cy; st.dir = dir;
          walk.step(st); cx = st.cx; cy = st.cy; dir = st.dir;
        }
        for (let y = 0; y < n; y++) d.fill(y < n / 2 ? X.shade(ceil, 1 - y / n) : X.shade(flr, 0.4 + (y / n - 0.5) * 1.2), y * n, y * n + n);
        for (let x = 0; x < n; x++) {
          const cam = 2 * x / n - 1, rdx = Math.cos(dir) - Math.sin(dir) * cam * 0.66, rdy = Math.sin(dir) + Math.cos(dir) * cam * 0.66;
          let mx = Math.floor(cx), my = Math.floor(cy);
          const ddx = Math.abs(1 / rdx), ddy = Math.abs(1 / rdy), sx = rdx < 0 ? -1 : 1, sy = rdy < 0 ? -1 : 1;
          let sdx = (rdx < 0 ? cx - mx : mx + 1 - cx) * ddx, sdy = (rdy < 0 ? cy - my : my + 1 - cy) * ddy, side = 0, hit = 0;
          for (let s = 0; s < 64 && !hit; s++) { if (sdx < sdy) { sdx += ddx; mx += sx; side = 0; } else { sdy += ddy; my += sy; side = 1; } hit = mx < 0 || my < 0 || mx >= M || my >= M ? 1 : map[my * M + mx]; }
          const dist = side ? sdy - ddy : sdx - ddx, h = Math.min(n * 4, Math.floor(n / Math.max(0.05, dist)));
          let wx = side ? cx + dist * rdx : cy + dist * rdy; wx -= Math.floor(wx);
          const tx = Math.floor(wx * 8), tex = wallTex[hit] || wallTex[1], fog = Math.max(0.2, 1 - dist / 9) * (side ? 0.75 : 1);
          const top = Math.floor((n - h) / 2);
          for (let y = Math.max(0, top); y < Math.min(n, top + h); y++) d[y * n + x] = X.shade(tex[Math.min(7, Math.floor((y - top) / h * 8)) * 8 + tx], fog);
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, M = R.pick([11, 15, 15, 21]), map = new Uint8Array(M * M).fill(1), sc = X.PIX.scheme(R), inks = R.shuffle(sc.ramps.map(r => r[1])), inp = g.input, checker = R.bool(0.5);
      const carve = (x, y) => { map[y * M + x] = 0; for (const [dx, dy] of R.shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]])) { const xx = x + dx, yy = y + dy; if (xx > 0 && yy > 0 && xx < M - 1 && yy < M - 1 && map[yy * M + xx]) { map[(y + dy / 2) * M + x + dx / 2] = 0; carve(xx, yy); } } };
      carve(1, 1);
      for (let k = 0; k < 12; k++) { const x = R.int(1, M - 2), y = R.int(1, M - 2); if (map[y * M + x] && (x + y) & 1) map[y * M + x] = 0; }
      for (let i = 0; i < M * M; i++) if (map[i]) map[i] = R.int(1, 3);
      const wallTex = [0, ...[0, 1, 2].map(k => { const c = inks[k % inks.length], tex = new Uint32Array(64); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) tex[y * 8 + x] = (y % 4 === 0 || (x + (y >> 2) * 4) % 8 === 0) ? X.shade(c, 0.45) : X.shade(c, 0.85 + ((x * 7 + y * 3) % 5) * 0.04); return tex; })];
      const ceil = X.mixPk(sc.ground[0], inks[3 % inks.length], 0.25), flr = X.mixPk(sc.ground[1], inks[0], 0.3);
      const roof = g.alt.pick(['Ceiling', 'Ceiling', 'Open sky']), skyR = X.rampPk([X.mixPk(sc.ramps[0][1], BLACK, 0.55), X.mixPk(sc.ramps[sc.ramps.length - 1][2], WHITE, 0.2)], Math.ceil(n / 2)); g.trait('Maze', M + 'x' + M); g.trait('Walls', sc.name); g.trait('Floor', checker ? 'Chequered' : 'Plain'); g.trait('Roof', roof); g.trait('Grid', n);
      let idle = 99;
      // a walk: from cell to neighbouring open cell, preferring not to turn back
      let cx = 1.5, cy = 1.5, dir = 0, target = null, prev = -1, ahead = null;
      const open = (x, y) => x >= 0 && y >= 0 && x < M && y < M && !map[y * M + x];
      const pickNext = () => {
        const x = Math.floor(cx), y = Math.floor(cy), opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => open(x + dx, y + dy) && (y + dy) * M + x + dx !== prev);
        const o = opts.length ? R.pick(opts) : [[1, 0], [-1, 0], [0, 1], [0, -1]].find(([dx, dy]) => open(x + dx, y + dy));
        prev = y * M + x; target = [x + o[0] + 0.5, y + o[1] + 0.5];
      };
      pickNext();
      const walk = walker(R, map, M), walkSt = { cx, cy, dir };
      walk.aim(walkSt); dir = walkSt.dir;
      return (t, dt) => {
        inp.taps();
        if (inp.inside && inp.live && (inp.down || Math.abs(inp.x - 0.5) > 0.12)) idle = 0; else idle += dt;
        if (idle < 3) {   // the viewer walks: turn toward the pointer, walk while held
          dir += (inp.x - 0.5) * 0.12;
          if (inp.down) { const sx = Math.cos(dir), sy = Math.sin(dir), nx = cx + sx * 0.08, ny = cy + sy * 0.08; if (open(Math.floor(nx + Math.sign(sx) * 0.3), Math.floor(cy))) cx = nx; if (open(Math.floor(cx), Math.floor(ny + Math.sign(sy) * 0.3))) cy = ny; }
          walk.reset();
        } else {
          const st = walkSt; st.cx = cx; st.cy = cy; st.dir = dir;
          walk.step(st); cx = st.cx; cy = st.cy; dir = st.dir;
        }
        for (let y = 0; y < n; y++) {
          if (y < n / 2) { d.fill(roof === 'Open sky' ? skyR[y] : X.shade(ceil, 1 - y / n), y * n, y * n + n); continue; }
          const k = 0.4 + (y / n - 0.5) * 1.2;
          if (!checker) { d.fill(X.shade(flr, k), y * n, y * n + n); continue; }
          const z = n / (2 * y - n + 1);
          for (let x = 0; x < n; x++) { const cam = 2 * x / n - 1, fx = cx + (Math.cos(dir) - Math.sin(dir) * cam * 0.66) * z, fy = cy + (Math.sin(dir) + Math.cos(dir) * cam * 0.66) * z; d[y * n + x] = X.shade((Math.floor(fx * 2) + Math.floor(fy * 2)) & 1 ? flr : X.mixPk(flr, inks[1], 0.3), k); }
        }
        for (let x = 0; x < n; x++) {
          const cam = 2 * x / n - 1, rdx = Math.cos(dir) - Math.sin(dir) * cam * 0.66, rdy = Math.sin(dir) + Math.cos(dir) * cam * 0.66;
          let mx = Math.floor(cx), my = Math.floor(cy);
          const ddx = Math.abs(1 / rdx), ddy = Math.abs(1 / rdy), sx = rdx < 0 ? -1 : 1, sy = rdy < 0 ? -1 : 1;
          let sdx = (rdx < 0 ? cx - mx : mx + 1 - cx) * ddx, sdy = (rdy < 0 ? cy - my : my + 1 - cy) * ddy, side = 0, hit = 0;
          for (let s = 0; s < 64 && !hit; s++) { if (sdx < sdy) { sdx += ddx; mx += sx; side = 0; } else { sdy += ddy; my += sy; side = 1; } hit = mx < 0 || my < 0 || mx >= M || my >= M ? 1 : map[my * M + mx]; }
          const dist = side ? sdy - ddy : sdx - ddx, h = Math.min(n * 4, Math.floor(n / Math.max(0.05, dist)));
          let wx = side ? cx + dist * rdx : cy + dist * rdy; wx -= Math.floor(wx);
          const tx = Math.floor(wx * 8), tex = wallTex[hit] || wallTex[1], fog = Math.max(0.2, 1 - dist / 9) * (side ? 0.75 : 1);
          const top = Math.floor((n - h) / 2);
          for (let y = Math.max(0, top); y < Math.min(n, top + h); y++) d[y * n + x] = X.shade(tex[Math.min(7, Math.floor((y - top) / h * 8)) * 8 + tx], fog);
        }
      };
      }

    },
  });

  P.addPixel({
    name: 'Synthwave', fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'A striped sun setting behind wireframe mountains, and a glowing grid floor rushing toward you, every line of it laid down cell by cell.',
    make(R, U, g) {
      const { n, d } = g, horizon = Math.round(n * R.range(0.55, 0.62)), inks = X.inks(R, 4, 0.3), grid = R.pick([0xffff40ff, 0xffffe040, 0xff40ffff, inks[0]]);
      const sky = X.rampPk([0xff200410, X.shade(inks[1], 0.5), inks[2]], horizon), sunTop = X.mixPk(inks[3], WHITE, 0.4), sunBot = inks[1], r = n * R.range(0.18, 0.25);
      const ridgeL = Array.from({ length: 9 }, (_, i) => [i / 8 * 0.42 * n, horizon - (i % 2 ? R.range(0.08, 0.2) : R.range(0, 0.05)) * n]), ridgeR = Array.from({ length: 9 }, (_, i) => [n - i / 8 * 0.42 * n, horizon - (i % 2 ? R.range(0.08, 0.2) : R.range(0, 0.05)) * n]);
      const stars = Array.from({ length: n }, () => [R.int(0, n - 1), R.int(0, horizon - 10)]);
      return t => {
        for (let y = 0; y < horizon; y++) d.fill(sky[y], y * n, y * n + n);
        for (const [x, y] of stars) if (d[y * n + x] === sky[y]) X.put(g, x, y, 0xff808080);
        const sy = horizon - r * 0.55;
        for (let y = Math.floor(sy - r); y < horizon; y++) {
          const k = (y - (sy - r)) / (2 * r), gap = k > 0.45 && (y % Math.max(2, Math.round(6 - k * 4))) < k * 3 - 1;
          if (gap) continue;
          const w = Math.sqrt(Math.max(0, r * r - (y - sy) ** 2));
          X.rect(g, n / 2 - w, y, w * 2, 1, X.mixPk(sunTop, sunBot, k));
        }
        for (const rid of [ridgeL, ridgeR]) {
          X.poly(g, [...rid.flat(), rid[8][0], horizon, rid[0][0], horizon], 0xff1a0a10);
          for (let i = 1; i < rid.length; i++) X.line(g, rid[i - 1][0], rid[i - 1][1], rid[i][0], rid[i][1], X.shade(grid, 0.7));
        }
        for (let y = horizon; y < n; y++) d.fill(0xff12040a, y * n, y * n + n);
        for (let k = -12; k <= 12; k++) X.line(g, n / 2 + k * n * 0.02, horizon, n / 2 + k * n * 0.35, n, X.shade(grid, 0.8));
        const off = (t * 0.6) % 1;
        for (let k = 0; k < 14; k++) { const z = 1 / (k + 1 - off), y = Math.round(horizon + (n - horizon) * Math.min(1, z * 0.9)); if (y < n) X.rect(g, 0, y, n, 1, X.shade(grid, Math.min(1, 0.4 + z))); }
        X.rect(g, 0, horizon, n, 1, X.mixPk(grid, WHITE, 0.4));
      };
    },
  });

  P.addPixel({
    name: 'Road', seed: 2, fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    interactive: 'Point left or right to steer the car.',
    recipe: 'A drive down an endless road drawn one strip at a time, as arcade racers faked depth: curves slide each strip sideways, hills lift them, and the trees grow as they come near. By day, at sunset or at night, with your car in front.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 5, 0.35), SEG = 4000, curve = new Float32Array(SEG), hill = new Float32Array(SEG);
      for (let i = 0, c = 0, h = 0; i < SEG; i++) { if (i % 150 === 0) { c = R.range(-2.2, 2.2); h = R.range(-1.5, 1.5); } curve[i] = c; hill[i] = h; }
      for (let it = 0; it < 4; it++) for (let i = 1; i < SEG - 1; i++) { curve[i] = (curve[i - 1] + curve[i] + curve[i + 1]) / 3; hill[i] = (hill[i - 1] + hill[i] + hill[i + 1]) / 3; }
      const horizon = Math.round(n * 0.45), sky = X.rampPk([X.shade(inks[0], 0.5), X.mixPk(inks[1], WHITE, 0.4)], horizon), grassA = X.shade(inks[2], 0.55), grassB = X.shade(inks[2], 0.45), rumbleA = WHITE, rumbleB = 0xff3030e0, roadA = 0xff505050, roadB = 0xff585858, tree = 0xff2a6a2a;
      const far = Array.from({ length: 64 }, () => R.range(0.05, 0.15));
      const hr = roadHour(g, n); g.trait('Palette', inkName(inks)); g.trait('Hour', hr.hour); g.trait('Trees', 'Both sides'); g.trait('Grid', n);
      let carX = 0, idle = 99;
      return t => {
        const pos = t * 35, base = Math.floor(pos);
        let bend = 0;
        for (let k = 0; k < 40; k++) bend += curve[(base + k) % SEG];
        for (let y = 0; y < horizon; y++) d.fill(sky[y], y * n, y * n + n);
        for (let x = 0; x < n; x++) { const h = far[Math.floor(((x + bend * 3 + t * 0) / n * 16) % 64 + 64) % 64]; for (let y = Math.round(horizon - h * n); y < horizon; y++) d[y * n + x] = X.shade(inks[3], 0.5); }
        let dx = 0, xoff = 0, lift = 0, maxY = n;
        // the ground under the far hills, so a crest never leaves a black gap above the road
        for (let y = horizon; y < n; y++) d.fill(grassB, y * n, y * n + n);
        const trees = [];
        for (let y = n - 1; y >= horizon; y--) {
          const z = (n - horizon) / (y - horizon + 1), seg = (base + Math.floor(z * 3)) % SEG;
          dx += curve[seg] * 0.0025 * (n - y) / n * 4; xoff += dx;
          lift += hill[seg] * 0.05;
          const yy = Math.round(y - lift);
          if (yy >= maxY || yy < 0) continue;
          // the road's width now leaves verge and trees in view on both sides
          const stripe = Math.floor(z * 3 + pos * 0.25) & 1, w = n * 0.3 / z * 2, cx = n / 2 + xoff * n * 0.12 - bend * 0.5 / z;
          for (let y2 = yy; y2 < maxY; y2++) for (let x = 0; x < n; x++) {
            const ax = Math.abs(x - cx);
            d[y2 * n + x] = ax < w ? (ax < w * 0.03 && stripe ? WHITE : stripe ? roadA : roadB) : ax < w * 1.12 ? (stripe ? rumbleA : rumbleB) : stripe ? grassA : grassB;
          }
          if (seg % 6 === 0 && z < 18) trees.push([seg % 12 === 0 ? cx + w * 1.6 : cx - w * 1.6, yy, Math.max(1, Math.round(8 / z))]);
          maxY = yy;
        }
        // trees drawn far to near, each with a darker shaded side and a trunk
        for (let k = trees.length - 1; k >= 0; k--) { const [tx0, yy, s] = trees[k], tx = Math.round(tx0); X.rect(g, tx - s, yy - s * 4, s * 2, s * 3, tree); if (s > 1) X.rect(g, tx + (s >> 1), yy - s * 4, s - (s >> 1), s * 3, X.shade(tree, 0.7)); X.rect(g, tx - Math.max(1, s >> 2), yy - s, Math.max(1, s >> 1), s, 0xff203050); }
        hr.grade();
        // a car appears once the viewer takes the wheel
        if (g.input.inside && g.input.live) idle = 0; else idle += 1 / 12;
        if (idle < 3) {
          carX += ((g.input.x - 0.5) * 1.4 - carX) * 0.2;
          const cw = Math.max(6, Math.round(n * 0.16)), ch = Math.max(3, Math.round(cw * 0.45)), cxp = Math.round(n / 2 + carX * n * 0.5 - cw / 2), cyp = n - ch - 2;
          X.rect(g, cxp, cyp, cw, ch, 0xff3030e0); X.rect(g, cxp + 2, cyp - Math.round(ch * 0.6), cw - 4, Math.round(ch * 0.6), X.shade(0xff3030e0, 0.8));
          X.rect(g, cxp + 3, cyp - Math.round(ch * 0.5), cw - 6, Math.max(1, Math.round(ch * 0.3)), 0xff402010);
          X.rect(g, cxp - 1, cyp + ch - 2, 2, 2, BLACK); X.rect(g, cxp + cw - 1, cyp + ch - 2, 2, 2, BLACK);
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 5, 0.35), SEG = 4000, curve = new Float32Array(SEG), hill = new Float32Array(SEG), inp = g.input;
      const CARS = [0xff3030e0, 0xffe0a030, 0xff30c0f0, 0xfff0f0f0, 0xff40d040], carCol = R.pick(CARS);
      g.trait('Car', ['Red', 'Blue', 'Yellow', 'White', 'Green'][CARS.indexOf(carCol)]);
      let carX = 0, idle = 99;
      for (let i = 0, c = 0, h = 0; i < SEG; i++) { if (i % 150 === 0) { c = R.range(-2.2, 2.2); h = R.range(-1.5, 1.5); } curve[i] = c; hill[i] = h; }
      for (let it = 0; it < 4; it++) for (let i = 1; i < SEG - 1; i++) { curve[i] = (curve[i - 1] + curve[i] + curve[i + 1]) / 3; hill[i] = (hill[i - 1] + hill[i] + hill[i + 1]) / 3; }
      const horizon = Math.round(n * 0.45), sky = X.rampPk([X.shade(inks[0], 0.5), X.mixPk(inks[1], WHITE, 0.4)], horizon), grassA = X.shade(inks[2], 0.55), grassB = X.shade(inks[2], 0.45), rumbleA = WHITE, rumbleB = 0xff3030e0, roadA = 0xff505050, roadB = 0xff585858, tree = 0xff2a6a2a;
      const far = Array.from({ length: 64 }, () => R.range(0.05, 0.15));
      const hr = roadHour(g, n); g.trait('Palette', inkName(inks)); g.trait('Hour', hr.hour); g.trait('Trees', 'Both sides'); g.trait('Grid', n);
      return t => {
        const pos = t * 35, base = Math.floor(pos);
        let bend = 0;
        for (let k = 0; k < 40; k++) bend += curve[(base + k) % SEG];
        for (let y = 0; y < horizon; y++) d.fill(sky[y], y * n, y * n + n);
        for (let x = 0; x < n; x++) { const h = far[Math.floor(((x + bend * 3 + t * 0) / n * 16) % 64 + 64) % 64]; for (let y = Math.round(horizon - h * n); y < horizon; y++) d[y * n + x] = X.shade(inks[3], 0.5); }
        let dx = 0, xoff = 0, lift = 0, maxY = n;
        // the ground under the far hills, so a crest never leaves a black gap above the road
        for (let y = horizon; y < n; y++) d.fill(grassB, y * n, y * n + n);
        const trees = [];
        for (let y = n - 1; y >= horizon; y--) {
          const z = (n - horizon) / (y - horizon + 1), seg = (base + Math.floor(z * 3)) % SEG;
          dx += curve[seg] * 0.0025 * (n - y) / n * 4; xoff += dx;
          lift += hill[seg] * 0.05;
          const yy = Math.round(y - lift);
          if (yy >= maxY || yy < 0) continue;
          // the road's width now leaves verge and trees in view on both sides
          const stripe = Math.floor(z * 3 + pos * 0.25) & 1, w = n * 0.3 / z * 2, cx = n / 2 + xoff * n * 0.12 - bend * 0.5 / z;
          for (let y2 = yy; y2 < maxY; y2++) for (let x = 0; x < n; x++) {
            const ax = Math.abs(x - cx);
            d[y2 * n + x] = ax < w ? (ax < w * 0.03 && stripe ? WHITE : stripe ? roadA : roadB) : ax < w * 1.12 ? (stripe ? rumbleA : rumbleB) : stripe ? grassA : grassB;
          }
          if (seg % 6 === 0 && z < 18) trees.push([seg % 12 === 0 ? cx + w * 1.6 : cx - w * 1.6, yy, Math.max(1, Math.round(8 / z))]);
          maxY = yy;
        }
        // trees drawn far to near, each with a darker shaded side and a trunk
        for (let k = trees.length - 1; k >= 0; k--) { const [tx0, yy, s] = trees[k], tx = Math.round(tx0); X.rect(g, tx - s, yy - s * 4, s * 2, s * 3, tree); if (s > 1) X.rect(g, tx + (s >> 1), yy - s * 4, s - (s >> 1), s * 3, X.shade(tree, 0.7)); X.rect(g, tx - Math.max(1, s >> 2), yy - s, Math.max(1, s >> 1), s, 0xff203050); }
        hr.grade();
        // your car: it follows the road on its own, or the pointer when there is one
        if (inp.inside && inp.live) idle = 0; else idle += 1 / 12;
        const want = idle < 3 ? (inp.x - 0.5) * 1.4 : -curve[base % SEG] * 0.05;
        carX += (want - carX) * 0.2;
        const cw = Math.max(6, Math.round(n * 0.16)), ch = Math.max(3, Math.round(cw * 0.45)), cxp = Math.round(n / 2 + carX * n * 0.5 - cw / 2), cyp = n - ch - 2, bump = (Math.floor(t * 12) & 1) && Math.abs(carX) > 0.45 ? 1 : 0;
        X.rect(g, cxp, cyp - bump, cw, ch, carCol); X.rect(g, cxp + 2, cyp - Math.round(ch * 0.6) - bump, cw - 4, Math.round(ch * 0.6), X.shade(carCol, 0.8));
        X.rect(g, cxp + 3, cyp - Math.round(ch * 0.5) - bump, cw - 6, Math.max(1, Math.round(ch * 0.3)), 0xff402010);
        X.rect(g, cxp, cyp + ch - 1 - bump, cw, 1, X.shade(carCol, 0.5)); X.rect(g, cxp + 1, cyp + 1 - bump, 2, 1, 0xff2020ff); X.rect(g, cxp + cw - 3, cyp + 1 - bump, 2, 1, 0xff2020ff);
        X.rect(g, cxp - 1, cyp + ch - 2, 2, 2, BLACK); X.rect(g, cxp + cw - 1, cyp + ch - 2, 2, 2, BLACK);
      };
      }

    },
  });

  P.addPixel({
    name: 'Shadowcast', seed: 2, fam: 'Raster', sizes: [80, 100], fps: 12,
    interactive: 'Point to carry the first lamp yourself; a click sets a block down where you touch (it stays).',
    recipe: 'Two coloured lamps wander among blocks. From each, rays are cast cell by cell until they strike a wall, so every block throws a hard shadow and the colours mix where both reach.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, wall = new Uint8Array(N), inks = X.inks(R, 4, 0.5);
      for (let k = 0; k < R.int(10, 18); k++) { const w = R.int(2, Math.round(n * 0.1)), h = R.int(2, Math.round(n * 0.1)), x = R.int(2, n - w - 2), y = R.int(2, n - h - 2); for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) wall[yy * n + xx] = 1; }
      const inp = g.input, seen = new Uint8Array(N), lamps = [0, 1].map(k => ({ col: X.unpk(inks[k * 2 % inks.length]), a: R.range(0.15, 0.3), b: R.range(0.15, 0.3), p: R.range(0, 6) }));
      // the blocks (second stream): scattered as before, a grid of pillars, or long broken walls; and sometimes a third lamp
      const A = g.alt, layout = g.home ? 'Scattered' : A.pick(['Scattered', 'Scattered', 'Pillars', 'Ruins']);
      if (layout !== 'Scattered') {
        wall.fill(0);
        if (layout === 'Pillars') { const step = Math.round(n / A.pick([5, 6, 7])), s2 = Math.max(2, Math.round(step * 0.28)); for (let y = step >> 1; y < n - 2; y += step) for (let x = step >> 1; x < n - 2; x += step) for (let yy = y; yy < y + s2; yy++) for (let xx = x; xx < x + s2; xx++) wall[yy * n + xx] = 1; }
        else for (let k = 0; k < 7; k++) { const hor = A() < 0.5, len = Math.round(n * (0.2 + A() * 0.35)), x0 = Math.floor(A() * (n - (hor ? len : 2))), y0 = Math.floor(A() * (n - (hor ? 2 : len))); for (let q = 0; q < len; q++) { if (A() < 0.08) continue; const x = hor ? x0 + q : x0, y = hor ? y0 : y0 + q; wall[y * n + x] = 1; wall[(y + (hor ? 1 : 0)) * n + x + (hor ? 0 : 1)] = 1; } }
      }
      if (!g.home && A() < 0.3) lamps.push({ col: X.unpk(inks[1]), a: 0.12 + A() * 0.15, b: 0.12 + A() * 0.15, p: A() * 6 });
      g.trait('Blocks', layout); g.trait('Lamps', lamps.length); g.trait('Palette', inkName(inks)); g.trait('Grid', n);
      const lr = new Float32Array(N), lg = new Float32Array(N), lb = new Float32Array(N), floor = X.unpk(X.shade(inks[1], 0.12)), RAYS = 4 * n;
      // blocks the viewer sets down (kept, at most forty; the oldest is lifted away)
      const base = wall.slice(), placed = [], bs = Math.max(2, Math.round(n * 0.04));
      const rebuild = () => { wall.set(base); for (const [x0, y0] of placed) for (let y = y0; y < y0 + bs; y++) for (let x = x0; x < x0 + bs; x++) if (x >= 0 && y >= 0 && x < n && y < n) wall[y * n + x] = 1; };
      return t => {
        let moved = false;
        for (const tp of inp.taps()) { placed.push([Math.round(tp.x * n - bs / 2), Math.round(tp.y * n - bs / 2)]); if (placed.length > 40) placed.shift(); moved = true; }
        if (moved) rebuild();
        lr.fill(0); lg.fill(0); lb.fill(0);
        const at = [];
        for (const L of lamps) {
          let lx = n / 2 + Math.sin(t * L.a + L.p) * n * 0.4, ly = n / 2 + Math.sin(t * L.b * 1.3 + L.p * 2) * n * 0.4;
          if (L === lamps[0] && inp.inside) { lx = Math.max(0.5, Math.min(n - 0.5, inp.x * n)); ly = Math.max(0.5, Math.min(n - 0.5, inp.y * n)); }
          if (wall[Math.floor(ly) * n + Math.floor(lx)]) { lx += 0.5; }
          at.push([lx, ly, L.col]);
          seen.fill(0);
          for (let r = 0; r < RAYS; r++) {
            const a = r / RAYS * U.TAU, dx = Math.cos(a), dy = Math.sin(a);
            for (let s = 0; s < n * 1.5; s += 0.7) {
              const x = Math.floor(lx + dx * s), y = Math.floor(ly + dy * s);
              if (x < 0 || y < 0 || x >= n || y >= n) break;
              const i = y * n + x;
              if (!seen[i]) { seen[i] = 1; const f = Math.max(0, 1 - s / (n * 0.75)); lr[i] += L.col[0] * f; lg[i] += L.col[1] * f; lb[i] += L.col[2] * f; }
              if (wall[i]) break;
            }
          }
        }
        // light in finer steps (twenty-four, not forty-eight) so the falloff is smooth rather than a coarse checker
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, th = X.dith4(x, y), q = v => Math.min(255, Math.floor(v / 24 + th) * 24);
          if (wall[i]) { const top = y > 0 && !wall[i - n]; d[i] = top ? X.rgb(Math.min(255, 40 + lr[i] * 0.6), Math.min(255, 40 + lg[i] * 0.6), Math.min(255, 40 + lb[i] * 0.6)) : X.rgb(20 + lr[i] * 0.25, 20 + lg[i] * 0.25, 20 + lb[i] * 0.25); }
          else d[i] = X.rgb(q(floor[0] + lr[i] * 0.85), q(floor[1] + lg[i] * 0.85), q(floor[2] + lb[i] * 0.85));
        }
        // the lamps: a hot white core in a ring of their own colour
        for (const [lx, ly, c] of at) { const x = Math.floor(lx), y = Math.floor(ly), cc = X.rgb(c[0], c[1], c[2]); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) X.put(g, x + dx, y + dy, X.mixPk(cc, WHITE, 0.4)); X.put(g, x, y, WHITE); }
      };
    },
  });

  P.addPixel({
    name: 'Mystify', seed: 2, fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'Two four-cornered shapes whose corners bounce off the edges of the screen, each leaving a trail of its last outlines in fading colour, after the old screen saver.',
    make(R, U, g) {
      // at the small grids the trail lines were closer than a cell and ran into stippled ribbons: space them
      const { n, d } = g, inks = X.inks(R, 4, 0.5), K0 = R.int(10, 18), gap = n >= 200 ? 2 : 3, K = n >= 200 ? K0 : Math.ceil(K0 * 2 / 3);
      const shapes = [0, 1].map(k => ({ pts: Array.from({ length: 4 }, () => ({ x: R.range(0, n), y: R.range(0, n), vx: R.range(0.3, 0.8) * R.sign() * n / 100, vy: R.range(0.3, 0.8) * R.sign() * n / 100 })), hist: [], col: k ? inks[2 % inks.length] : inks[0] }));
      // corners and shapes (second stream): four corners and two shapes as before, or triangles, pentagons, a third shape
      const A = g.alt, corners = g.home ? 4 : A.pick([4, 4, 3, 5]), pt = () => ({ x: A() * n, y: A() * n, vx: (0.3 + A() * 0.5) * (A() < 0.5 ? -1 : 1) * n / 100, vy: (0.3 + A() * 0.5) * (A() < 0.5 ? -1 : 1) * n / 100 });
      if (!g.home && A() < 0.3) shapes.push({ pts: Array.from({ length: 4 }, pt), hist: [], col: inks[1 % inks.length] });
      for (const sh of shapes) { while (sh.pts.length > corners) sh.pts.pop(); while (sh.pts.length < corners) sh.pts.push(pt()); }
      g.trait('Shapes', shapes.length); g.trait('Corners', corners); g.trait('Trail', K > 12 ? 'Long' : K > 8 ? 'Medium' : 'Short'); g.trait('Palette', inkName(inks)); g.trait('Grid', n);
      return (t, dt, f) => {
        d.fill(BLACK);
        for (const s of shapes) {
          for (const p of s.pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > n - 1) { p.vx = -p.vx; p.x = Math.max(0, Math.min(n - 1, p.x)); } if (p.y < 0 || p.y > n - 1) { p.vy = -p.vy; p.y = Math.max(0, Math.min(n - 1, p.y)); } }
          if (f % gap === 0) { s.hist.unshift(s.pts.map(p => [p.x, p.y])); if (s.hist.length > K) s.hist.pop(); }
          // oldest first, so the newest and brightest outline is always on top
          for (let k = s.hist.length - 1; k >= 0; k--) { const q = s.hist[k], c = X.shade(X.mixPk(s.col, inks[(k >> 2) % inks.length], 0.3), 1 - k / K); for (let i = 0, m = q.length; i < m; i++) X.line(g, q[i][0], q[i][1], q[(i + 1) % m][0], q[(i + 1) % m][1], c); }
        }
      };
    },
  });

  P.addPixel({
    name: 'Paint Bucket', fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'Straight lines thrown across the canvas cut it into pieces, then a paint bucket floods each piece in turn, cell by cell outward from where it was dropped.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, inks = X.inks(R, 6, 0.5), line = WHITE, wallC = X.shade(inks[0], 0.15);
      let walls, paint, queue, regions, cur, done, hold;
      const reset = () => {
        walls = new Uint8Array(N); paint = new Uint32Array(N); queue = []; done = 0; hold = 0;
        for (let k = 0; k < R.int(6, 11); k++) {
          const a = R.range(0, Math.PI), cx = R.range(0.2, 0.8) * n, cy = R.range(0.2, 0.8) * n, dx = Math.cos(a) * n * 2, dy = Math.sin(a) * n * 2;
          X.line({ n, d: walls }, cx - dx, cy - dy, cx + dx, cy + dy, 1);
        }
        for (let x = 0; x < n; x++) { walls[x] = walls[(n - 1) * n + x] = walls[x * n] = walls[x * n + n - 1] = 1; }
        regions = []; const seen = new Uint8Array(N);
        for (let i = 0; i < N; i++) if (!walls[i] && !seen[i]) { regions.push(i); const q = [i]; seen[i] = 1; for (let h = 0; h < q.length; h++) { const j = q[h]; for (const o of [1, -1, n, -n]) { const m = j + o; if (m >= 0 && m < N && !walls[m] && !seen[m]) { seen[m] = 1; q.push(m); } } } }
        R.shuffle(regions); cur = -1;
      };
      reset();
      const next = () => { cur++; if (cur >= regions.length) return false; const s = regions[cur]; queue = [s]; paint[s] = inks[cur % inks.length]; return true; };
      next();
      return () => {
        if (done) { if (++hold > 30) { reset(); next(); } }
        else {
          let budget = Math.round(N / 50);
          while (budget > 0) {
            if (!queue.length && !next()) { done = 1; break; }
            const nq = [];
            for (const j of queue) for (const o of [1, -1, n, -n]) { const m = j + o; if (m >= 0 && m < N && !walls[m] && !paint[m]) { paint[m] = paint[j]; nq.push(m); budget--; } }
            queue = nq;
            if (budget > 0 && queue.length) continue; else break;
          }
        }
        for (let i = 0; i < N; i++) d[i] = walls[i] ? line : paint[i] || wallC;
      };
    },
  });

  P.addPixel({
    name: 'Flat Shade', fam: 'Raster', sizes: [80, 100, 200], fps: 12,
    recipe: 'Solids made of a few dozen triangles, turning under a fixed light, each triangle filled with one flat tone and sorted back to front, as the first polygon games were drawn.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, A = g.alt, inks0 = X.inks(R, 4, 0.45);
      const ico = () => { const t = (1 + Math.sqrt(5)) / 2, v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(p => { const l = Math.hypot(...p); return p.map(c => c / l); }); const f = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]]; return { v, f }; };
      const torus = () => { const v = [], f = [], A = 10, B = 6; for (let i = 0; i < A; i++) for (let j = 0; j < B; j++) { const a = i / A * U.TAU, b = j / B * U.TAU; v.push([(1 + 0.4 * Math.cos(b)) * Math.cos(a) * 0.75, 0.4 * Math.sin(b) * 0.75, (1 + 0.4 * Math.cos(b)) * Math.sin(a) * 0.75]); } for (let i = 0; i < A; i++) for (let j = 0; j < B; j++) { const a = i * B + j, b = ((i + 1) % A) * B + j, c = ((i + 1) % A) * B + (j + 1) % B, e = i * B + (j + 1) % B; f.push([a, b, c], [a, c, e]); } return { v, f }; };
      const cube = () => ({ v: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]].map(p => p.map(c => c * 0.6)), f: [[0, 2, 1], [0, 3, 2], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4], [2, 3, 7], [2, 7, 6], [1, 2, 6], [1, 6, 5], [0, 4, 7], [0, 7, 3]] });
      // more solids for the other rolls: every face is wound outward below, so their order here does not matter
      const octa = () => ({ v: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], f: [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]] });
      // a solid of revolution with k sides from a profile of [radius, height] rings (radius 0 is a point), capped flat at the ends
      const lathe = (k, prof) => () => {
        const v = [], f = [], rows = prof.map(([r, y]) => { const s = v.length; if (r === 0) { v.push([0, y, 0]); return [s]; } for (let i = 0; i < k; i++) v.push([Math.cos(i / k * U.TAU) * r, y, Math.sin(i / k * U.TAU) * r]); return Array.from({ length: k }, (_, i) => s + i); });
        for (let j = 0; j + 1 < rows.length; j++) { const a = rows[j], b = rows[j + 1]; for (let i = 0; i < k; i++) { const i2 = (i + 1) % k; if (a.length === 1) f.push([a[0], b[i], b[i2]]); else if (b.length === 1) f.push([a[i], a[i2], b[0]]); else f.push([a[i], a[i2], b[i2]], [a[i], b[i2], b[i]]); } }
        for (const row of [rows[0], rows[rows.length - 1]]) if (row.length > 1) { const c = v.length; v.push([0, v[row[0]][1], 0]); for (let i = 0; i < k; i++) f.push([c, row[i], row[(i + 1) % k]]); }
        return { v, f };
      };
      const star = () => { const v = [], f = [], K = 10; for (const z of [-0.28, 0.28]) { for (let i = 0; i < K; i++) { const a = i / K * U.TAU - Math.PI / 2, r = i & 1 ? 0.42 : 1; v.push([Math.cos(a) * r, Math.sin(a) * r, z]); } v.push([0, 0, z]); } for (let i = 0; i < K; i++) { const j = (i + 1) % K; f.push([K, i, j], [2 * K + 1, K + 1 + i, K + 1 + j], [i, j, K + 1 + j], [i, K + 1 + j, K + 1 + i]); } return { v, f }; };
      const ball = () => { const { v, f } = ico(), V = v.slice(), F = [], mid = new Map(), m = (a, b) => { const k = a < b ? a + ',' + b : b + ',' + a; if (!mid.has(k)) { const p = V[a].map((c, i) => c + V[b][i]), l = Math.hypot(...p); mid.set(k, V.push(p.map(c => c / l)) - 1); } return mid.get(k); }; for (const [a, b, c] of f) { const ab = m(a, b), bc = m(b, c), ca = m(c, a); F.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]); } return { v: V, f: F }; };
      // a trefoil knot: a five-sided tube round the curve, each face wound out from the curve rather than the centre
      const knot = () => {
        const v = [], f = [], refs = [], S = 40, Q = 5, C = [], c = u => [(Math.sin(u) + 2 * Math.sin(2 * u)) * 0.3, (Math.cos(u) - 2 * Math.cos(2 * u) + 0.5) * 0.3, -Math.sin(3 * u) * 0.3];
        for (let i = 0; i < S; i++) {
          const u = i / S * U.TAU, p = c(u), q = c(u + 0.01), T = q.map((x, k) => x - p[k]), Nn = [T[1], -T[0], 0], ln = Math.hypot(...Nn), Nv = Nn.map(x => x / ln), lt = Math.hypot(...T), Tv = T.map(x => x / lt), B = [Tv[1] * Nv[2] - Tv[2] * Nv[1], Tv[2] * Nv[0] - Tv[0] * Nv[2], Tv[0] * Nv[1] - Tv[1] * Nv[0]];
          C.push(p);
          for (let j = 0; j < Q; j++) { const a = j / Q * U.TAU; v.push(p.map((x, k) => x + (Nv[k] * Math.cos(a) + B[k] * Math.sin(a)) * 0.14)); }
        }
        for (let i = 0; i < S; i++) for (let j = 0; j < Q; j++) { const i2 = (i + 1) % S, j2 = (j + 1) % Q, m = C[i].map((x, k) => (x + C[i2][k]) / 2); f.push([i * Q + j, i2 * Q + j, i2 * Q + j2], [i * Q + j, i2 * Q + j2, i * Q + j2]); refs.push(m, m); }
        return { v, f, refs };
      };
      const SOL = { Icosahedron: ico, Torus: torus, Cube: cube, Octahedron: octa, Prism: lathe(6, [[0.85, -0.6], [0.85, 0.6]]), Cylinder: lathe(14, [[0.7, -0.7], [0.7, 0.7]]), Cone: lathe(14, [[0, -0.95], [0.8, 0.6]]), Pyramid: lathe(4, [[0, -0.9], [0.95, 0.6]]), Gem: lathe(8, [[0.45, -0.6], [0.8, -0.28], [0, 0.95]]), Star: star, Ball: ball, Knot: knot };
      const nameOf = mk => Object.keys(SOL).find(k => SOL[k] === mk);
      let objs, arr, cam = { D: 3.5, F: 0.95, pitch: 0, roll: 0 }, camName = 'Level', light = 'Sun', back = 'Gradient', inks = inks0, ground = 0, spin = 0;
      if (g.home) {
        // the opening variation, exactly as before: one to three solids in a row, level camera, one sun, a gradient behind
        objs = R.shuffle([ico, torus, cube, ico]).slice(0, R.int(1, 3)).map((mk, k, arr) => ({ ...mk(), name: nameOf(mk), col: inks[k % inks.length], x: arr.length === 1 ? 0 : (k - (arr.length - 1) / 2) * (arr.length === 3 ? 1.22 : 1.5), y: 0, z: 0, s: arr.length === 1 ? 1.1 : arr.length === 3 ? 0.56 : 0.7, ax: R.range(0.2, 0.5), ay: R.range(0.3, 0.7), pa: 0, pb: 0, torus: mk === torus }));
        arr = ['Single', 'Pair', 'Row'][objs.length - 1];
      } else {
        // every other roll draws a scene from the second stream: the solids, how they are arranged, the camera, the light, the backdrop
        if (A() < 0.12) { inks = [inks0[0], inks0[0], inks0[0], inks0[1 % inks0.length]]; }
        const pickSolid = (pool = ['Icosahedron', 'Icosahedron', 'Octahedron', 'Cube', 'Torus', 'Torus', 'Prism', 'Cylinder', 'Cone', 'Pyramid', 'Gem', 'Gem', 'Star', 'Ball', 'Knot']) => A.pick(pool);
        const distinct = (k, pool) => { const out = []; while (out.length < k) { const s = pickSolid(pool); if (!out.includes(s) || out.length >= 6) out.push(s); } return out; };
        const mk = (name, col, o) => ({ ...SOL[name](), name, col, x: 0, y: 0, z: 0, s: 1, ax: A.range(0.2, 0.5) * A.sign(), ay: A.range(0.3, 0.7) * A.sign(), pa: A.range(0, 6), pb: A.range(0, 6), torus: name === 'Torus', ...o });
        arr = A.pick(['Single', 'Single', 'Pair', 'Row', 'Orbit', 'Orbit', 'Stack', 'Stack', 'Field', 'Scene']);
        if (arr === 'Single') { const s = pickSolid(); objs = [mk(s, inks[0], { s: s === 'Knot' ? 1.2 : 1.05 })]; }
        else if (arr === 'Pair') objs = distinct(2).map((s, k) => mk(s, inks[k], { x: k ? 0.8 : -0.8, s: 0.66 }));
        else if (arr === 'Row') objs = distinct(3).map((s, k) => mk(s, inks[k], { x: (k - 1) * 1.22, s: 0.55 }));
        else if (arr === 'Orbit') {
          const k = A.int(3, 5), moon = pickSolid(['Icosahedron', 'Octahedron', 'Cube', 'Gem', 'Pyramid', 'Ball', 'Star']), w = A.range(0.35, 0.6) * A.sign(), tilt = A.range(0.2, 0.45);
          objs = [mk(pickSolid(), inks[0], { s: 0.62 }), ...Array.from({ length: k }, (_, j) => mk(moon, inks[1 + (j & 1)], { s: 0.24, orbit: { r: 1.28, w, a0: j / k * U.TAU, tilt } }))];
        } else if (arr === 'Stack') {
          const sp = A.range(0.35, 0.7);
          objs = distinct(3, ['Cube', 'Cylinder', 'Prism', 'Octahedron', 'Gem', 'Torus', 'Ball', 'Cone', 'Pyramid', 'Icosahedron']).map((s, k) => mk(s, inks[k], { y: (k - 1) * 0.9, s: 0.47, ax: 0, pa: 0.3, ay: k & 1 ? -sp : sp * 1.3 }));
        } else if (arr === 'Field') {
          const G = n >= 200 ? 4 : 3, s = pickSolid(['Cube', 'Octahedron', 'Icosahedron', 'Gem', 'Pyramid', 'Star', 'Prism']), ax = A.range(0.3, 0.5), ay = A.range(0.4, 0.7);
          objs = [];
          for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) objs.push(mk(s, inks[(i + j) % inks.length], { x: (i / (G - 1) - 0.5) * 2.3, y: (j / (G - 1) - 0.5) * 2.3, s: 1.2 / G, ax, ay, pa: (i + j) * 0.55, pb: (i + j) * 0.55 }));
        } else {
          // a little still life on the ground, turning slowly on a turntable
          ground = 0.95; spin = A.range(0.15, 0.28) * A.sign();
          const slots = [[-0.95, 0.25], [0.9, 0.4], [0.05, -0.6], [0.15, 1.15]];
          objs = distinct(A.int(3, 4), ['Cube', 'Pyramid', 'Ball', 'Cylinder', 'Cone', 'Prism', 'Gem', 'Torus', 'Icosahedron', 'Star']).map((s, k) => {
            const o = mk(s, inks[k % inks.length], { x: slots[k][0], z: slots[k][1], s: A.range(0.42, 0.58), ax: 0, ay: 0, pa: 0 });
            if (s === 'Star') o.pa = Math.PI / 2;   // a star lies on its back
            const ext = Math.max(...o.v.map(([, y, z]) => y * Math.cos(o.pa) - z * Math.sin(o.pa)));
            o.y = ground - o.s * ext; return o;
          });
        }
        camName = A.pick(['Level', 'Level', 'Close', 'Far', 'Tilted', 'Tilted', 'High']);
        cam = camName === 'Close' ? { D: 2.9, F: 0.95, pitch: 0.12, roll: 0 } : camName === 'Far' ? { D: 5.6, F: 0.95, pitch: 0.18, roll: 0 } : camName === 'Tilted' ? { D: 3.8, F: 0.95, pitch: 0.42, roll: A.sign() * A.range(0.14, 0.26) } : camName === 'High' ? { D: 4.1, F: 0.95, pitch: 1.05, roll: 0 } : cam;
        light = A.pick(['Sun', 'Sun', 'Two lights', 'Rim', 'Bands']);
        back = arr === 'Scene' ? A.pick(['Floor', 'Floor', 'Grid']) : A.pick(['Gradient', 'Gradient', 'Black', 'Sky', 'Sky', 'Floor', 'Floor', 'Grid', 'Stars']);
      }
      // wind every face outward (from the solid's centre, from the tube's centre on a torus, from the curve on a knot), so the
      // far side can be culled and the near side lit consistently: no holes or flicker
      for (const o of objs) o.f = o.f.map(([a, b, c], fi) => {
        const A = o.v[a], B = o.v[b], C = o.v[c], m = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3, (A[2] + B[2] + C[2]) / 3];
        let out = m;
        if (o.torus) { const r = Math.hypot(m[0], m[2]) || 1; out = [m[0] - m[0] / r * 0.75, m[1], m[2] - m[2] / r * 0.75]; }
        if (o.refs) out = m.map((x, k) => x - o.refs[fi][k]);
        const ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        return nx * out[0] + ny * out[1] + nz * out[2] >= 0 ? [a, b, c] : [a, c, b];
      });
      const shades = objs.map(o => X.rampPk([X.shade(o.col, 0.18), o.col, X.mixPk(o.col, WHITE, 0.55)], 6));
      const bands = objs.map(o => [X.shade(o.col, 0.3), o.col, X.mixPk(o.col, WHITE, 0.45)]);
      const LIGHTS = [[[255, 170, 80], [60, 200, 255]], [[255, 90, 180], [60, 255, 200]], [[255, 220, 120], [150, 90, 255]]], pair = A.pick(LIGHTS), RIM = A.pick([WHITE, 0xffffe0a0, 0xffa0ffff]);
      const names = [...new Set(objs.map(o => o.name))];
      g.trait('Arrangement', arr); g.trait('Solid', names.length === 1 ? names[0] : 'Mixed'); g.trait('Camera', camName); g.trait('Light', light); g.trait('Backdrop', back);
      g.trait('Palette', inks !== inks0 ? 'Monochrome' : inkName(inks)); g.trait('Grid', n);
      // the floor sits under the lowest point any solid can reach
      const rad = o => Math.max(...o.v.map(p => Math.hypot(...p)));
      const F = ground || Math.max(...objs.map(o => o.y + (o.orbit ? o.orbit.r * Math.sin(o.orbit.tilt) : 0) + o.s * rad(o))) + 0.06;
      const L = [0.5, 0.6, 0.62], L2 = [-0.68, 0.12, 0.72].map(x => x / Math.hypot(-0.68, 0.12, 0.72));
      const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch), cr = Math.cos(cam.roll), sr = Math.sin(cam.roll), camY = -cam.D * sp, camZ = -cam.D * cp;
      // the backdrop, worked out once (the camera never moves); floors cast rays from the camera to the ground plane
      const bgBuf = new Uint32Array(N), shBuf = new Uint32Array(N), floorIx = [], fx = [], fz = [], fw = [], gOn = [], gOff = [];
      const SKIES = { Dusk: [X.rgb(30, 16, 60), X.rgb(120, 50, 120), X.rgb(240, 120, 90), X.rgb(255, 200, 130)], Day: [X.rgb(40, 90, 190), X.rgb(110, 170, 235), X.rgb(215, 236, 250)], Night: [X.rgb(2, 2, 12), X.rgb(14, 16, 48), X.rgb(44, 44, 96)], Synth: [X.rgb(0, 0, 0), X.rgb(36, 0, 66), X.rgb(190, 30, 140), X.rgb(255, 150, 70)] };
      const skyName = back === 'Grid' ? 'Synth' : A.pick(['Dusk', 'Day', 'Night']), sky = X.rampPk(SKIES[skyName], 64), neon = A.pick([0xffff40ff, 0xffffff40, 0xff40ff60, inks[0]]);
      if (back === 'Sky' || back === 'Floor' || back === 'Grid') g.trait('Sky', skyName);
      const cell = 0.5, dark = X.rgb(8, 0, 22), glow = sky[63];
      if (back === 'Gradient') { const bg = X.rampPk([X.shade(inks[3 % inks.length], 0.1), X.shade(inks[3 % inks.length], 0.25)], n); for (let y = 0; y < n; y++) bgBuf.fill(bg[y], y * n, y * n + n); }
      else if (back === 'Sky') for (let y = 0; y < n; y++) bgBuf.fill(sky[Math.round(y / (n - 1) * 63)], y * n, y * n + n);
      else if (back === 'Black' || back === 'Stars') bgBuf.fill(BLACK);
      else {
        const nf = n * cam.F, base = X.mixPk(inks[3 % inks.length], 0xff808080, 0.5), fA = X.shade(base, 0.62), fB = X.shade(base, 0.44);
        const ray = (px, py) => { const u0 = px - n / 2, v0 = py - n / 2, a = (u0 * cr + v0 * sr) / nf, b = (-u0 * sr + v0 * cr) / nf; return [a, b * cp + sp, -b * sp + cp]; };
        const hit = (px, py) => { const r = ray(px, py); if (r[1] < 1e-3) return null; const t = (F - camY) / r[1]; return [r[0] * t, camZ + r[2] * t, t]; };
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, r = ray(x + 0.5, y + 0.5), h = hit(x + 0.5, y + 0.5);
          if (!h) { bgBuf[i] = sky[Math.round(U.clamp(1 + r[1] / Math.hypot(...r) / 0.6) * 63)]; continue; }
          const fog = U.clamp((h[2] - 3) / 16);
          if (back === 'Floor') { const c = (Math.floor(h[0] / 0.7) + Math.floor(h[1] / 0.7)) & 1 ? fA : fB; bgBuf[i] = X.mixPk(c, sky[63], fog); shBuf[i] = X.mixPk(X.shade(c, 0.5), sky[63], fog); }
          else { const hx = hit(x + 1.5, y + 0.5) || h, hy = hit(x + 0.5, y + 1.5) || h; const wx = Math.max(Math.abs(hx[0] - h[0]), Math.abs(hy[0] - h[0])), wz = Math.max(Math.abs(hx[1] - h[1]), Math.abs(hy[1] - h[1])), far = U.clamp((Math.max(wx, wz) / cell - 0.1) * 4), k2 = Math.max(far * 0.8, fog * 0.5);
            fw.push(wx * 0.6 + 0.005, wz * 0.6 + 0.005); fx.push(h[0] / cell); fz.push(h[1]); gOn.push(X.mixPk(X.mixPk(neon, dark, fog * 0.6), glow, k2)); gOff.push(X.mixPk(dark, glow, k2)); }
          floorIx.push(i);
        }
      }
      const FI = Int32Array.from(floorIx), FX = Float64Array.from(fx), FZ = Float64Array.from(fz), FW = Float64Array.from(fw), ON = Uint32Array.from(gOn), OFF = Uint32Array.from(gOff), FL = FI.length;
      const stars = back === 'Stars' ? Array.from({ length: Math.round(N / 60) }, () => [Math.floor(A() * N), A() * 6, A.range(1, 3)]) : [];
      const mask = (back === 'Floor' || back === 'Grid') ? new Uint8Array(N) : null, mg = { n, d: mask };
      const toCam = p => { if (!cam.pitch) return p; const y = p[1] * cp - p[2] * sp, z = p[1] * sp + p[2] * cp; return [p[0], y, z]; };
      const proj = p => { const D = cam.D, Fc = cam.F; let u = p[0] / (D + p[2]) * n * Fc, v = p[1] / (D + p[2]) * n * Fc; if (cam.roll) { const u1 = u * cr - v * sr; v = u * sr + v * cr; u = u1; } return [n / 2 + u, n / 2 + v]; };
      // the grid floor scrolls towards the eye: only the line test runs each frame
      const gridFloor = off => {
        for (let k = 0; k < FL; k++) {
          const gx = FX[k], gz = (FZ[k] + off) / cell, ex = gx - Math.floor(gx + 0.5), ez = gz - Math.floor(gz + 0.5);
          d[FI[k]] = (ex < 0 ? -ex : ex) * cell < FW[2 * k] || (ez < 0 ? -ez : ez) * cell < FW[2 * k + 1] ? ON[k] : OFF[k];
        }
      };
      return t => {
        d.set(bgBuf);
        if (back === 'Grid') gridFloor(t * 0.6);
        for (const [i, ph, w] of stars) { const b = Math.sin(t * w + ph); d[i] = b > 0.6 ? WHITE : b > -0.2 ? 0xff9a9a9a : 0xff4a4a4a; }
        const tris = [];
        if (mask) mask.fill(0);
        objs.forEach((o, k) => {
          const ca = Math.cos(t * o.ax + o.pa), sa = Math.sin(t * o.ax + o.pa), cb = Math.cos(t * o.ay + o.pb), sb = Math.sin(t * o.ay + o.pb);
          let ox = o.x, oy = o.y, oz = o.z;
          if (o.orbit) { const a = o.orbit.a0 + t * o.orbit.w; ox = Math.cos(a) * o.orbit.r; oz = Math.sin(a) * o.orbit.r; oy = oz * Math.sin(o.orbit.tilt); oz *= Math.cos(o.orbit.tilt); }
          const cs = Math.cos(t * spin), ss = Math.sin(t * spin);
          const pv = o.v.map(([x, y, z]) => {
            let x1 = x * cb + z * sb, z1 = -x * sb + z * cb, y1 = y * ca - z1 * sa; z1 = y * sa + z1 * ca;
            const w = [x1 * o.s + ox, y1 * o.s + oy, z1 * o.s + oz];
            return spin ? [w[0] * cs + w[2] * ss, w[1], -w[0] * ss + w[2] * cs] : w;
          });
          const pc = cam.pitch ? pv.map(toCam) : pv;
          for (const [a, b, c] of o.f) {
            const A = pv[a], B = pv[b], C = pv[c], ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
            let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
            const sun = -nx * L[0] - ny * L[1] - nz * L[2];
            // a shadow on the floor: the faces turned to the sun, dropped along its rays to the ground
            if (mask && sun > 0) {
              const sh = [A, B, C].map(p => { const q = p[1] < F ? (F - p[1]) / L[1] : 0; return toCam([p[0] + L[0] * q, F, p[2] + L[2] * q]); });
              if (sh.every(p => cam.D + p[2] > 0.2)) X.poly(mg, sh.flatMap(proj), 1);
            }
            const sx = A[0] + B[0] + C[0], sy = A[1] + B[1] + C[1], mz = (A[2] + B[2] + C[2]) / 3 - camZ, view = nx * sx / 3 + ny * sy / 3 + nz * mz - ny * camY;
            if (view >= 0) continue;   // facing away from the eye
            let col;
            if (light === 'Sun') col = shades[k][Math.min(5, Math.floor((0.12 + 0.88 * Math.max(0, sun)) * 6))];   // a little ambient light, so the shadow side keeps its shape
            else if (light === 'Bands') col = bands[k][sun < 0.25 ? 0 : sun < 0.7 ? 1 : 2];
            else if (light === 'Rim') {
              const rim = 1 + view / Math.hypot(sx / 3, sy / 3 - camY, mz), base = shades[k][Math.min(5, Math.floor((0.06 + 0.5 * Math.max(0, sun)) * 6))];
              col = rim > 0.72 ? X.mixPk(base, RIM, 0.85) : rim > 0.5 ? X.mixPk(base, RIM, 0.4) : base;
            } else {
              const q = x => Math.round(Math.max(0, x) * 3) / 3, k1 = q(sun), k2 = q(-nx * L2[0] - ny * L2[1] - nz * L2[2]), c0 = X.mixPk(o.col, WHITE, 0.3);
              col = X.rgb(...[0, 8, 16].map((sh, ch) => Math.min(255, (c0 >> sh & 255) * (0.1 + 0.9 * k1 * pair[0][ch] / 255 + 0.75 * k2 * pair[1][ch] / 255))));
            }
            tris.push({ z: pc[a][2] + pc[b][2] + pc[c][2], pts: [...proj(pc[a]), ...proj(pc[b]), ...proj(pc[c])], c: col });
          }
        });
        if (mask) for (let k = 0; k < FL; k++) { const i = FI[k]; if (mask[i]) d[i] = back === 'Floor' ? shBuf[i] : X.shade(d[i], 0.45); }
        tris.sort((a, b) => b.z - a.z);
        for (const tr of tris) X.poly(g, tr.pts, tr.c);
      };
    },
  });
})();
