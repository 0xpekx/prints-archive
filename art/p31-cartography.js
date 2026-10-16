// Set 4 · Cartography: maps that draw themselves, cell by cell.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Cartography' }, def));
  const { rgb, mixPk: mix, shade, put, line, rect, disc, text } = X;
  const TAU = Math.PI * 2;
  const D8 = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  // 3 x 5 digits for soundings, mileages and clocks
  const DIG = { 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [7, 1, 7, 4, 7], 3: [7, 1, 3, 1, 7], 4: [5, 5, 7, 1, 1], 5: [7, 4, 7, 1, 7], 6: [7, 4, 7, 5, 7], 7: [7, 1, 1, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 7] };
  function digits(g, str, x, y, c) {
    for (const ch of String(str)) { const r = DIG[ch]; if (r) for (let j = 0; j < 5; j++) for (let b = 0; b < 3; b++) if (r[j] >> (2 - b) & 1) put(g, x + b, y + j, c); x += 4; }
    return x;
  }
  // a w x w square at every Bresenham step
  function thick(g, x0, y0, x1, y1, w, c) { const h = w >> 1; line(g, x0, y0, x1, y1, (x, y) => rect(g, x - h, y - h, w, w, c)); }
  // value 0..1 to one of k levels, with ordered dither between them
  const lvl = (v, k, x, y) => Math.max(0, Math.min(k - 1, Math.floor(v * (k - 1) + X.dith4(x, y))));
  // 2D fbm from the 2D simplex (cheaper than the 3D one in lib)
  const fbm2 = (nz, x, y, oct) => { let v = 0, a = 0.5, f = 1; for (let o = 0; o < oct; o++) { v += a * nz.n2(x * f, y * f); a *= 0.5; f *= 2.03; } return v; };
  // a dissolve between cycles: cells drop to `c` in ordered-dither order as k goes 0 -> 1
  function dissolve(g, k, c) { if (k <= 0) return; const { n, d } = g; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (X.dith8(x, y) < k) d[y * n + x] = c; }

  // ---------- K4: a small pixel-art kit shared by the Set 4 files p31–p35 ----------
  // Chunky flat-colour pixel art: hex palettes, ASCII sprites, cel shading with
  // hard tone steps, stepped glows, 1-cell outlines and banded skies. p32–p35
  // load after this file and use it as U.K4.
  U.K4 = (() => {
    const hx = h => { const v = parseInt(h.replace('#', ''), 16); return rgb(v >> 16 & 255, v >> 8 & 255, v & 255); };
    const pal = s => s.trim().split(/\s+/).map(hx);
    // a sprite from rows of characters; '.' and ' ' are see-through
    const spr = rows => { const h = rows.length, w = Math.max(...rows.map(r => r.length)), c = new Uint8Array(w * h); rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) c[y * w + x] = r.charCodeAt(x); }); return { w, h, c }; };
    // map: { char: colour } (or a function of char, x, y); chars it lacks are skipped
    function blit(g, s, x, y, map, flip = false, sc = 1) {
      const { n, d } = g, fn = typeof map === 'function';
      x = Math.round(x); y = Math.round(y);
      for (let r = 0; r < s.h; r++) for (let q = 0; q < s.w; q++) {
        const ch = s.c[r * s.w + (flip ? s.w - 1 - q : q)];
        if (!ch || ch === 46 || ch === 32) continue;
        const col = fn ? map(ch, q, r) : map[String.fromCharCode(ch)];
        if (!col) continue;
        for (let yy = 0; yy < sc; yy++) { const py = y + r * sc + yy; if (py < 0 || py >= n) continue; for (let xx = 0; xx < sc; xx++) { const px = x + q * sc + xx; if (px >= 0 && px < n) d[py * n + px] = col; } }
      }
    }
    // filled ellipse; c is a colour or fn(x, y, nx, ny) -> colour (0 skips)
    function ell(g, cx, cy, rx, ry, c) {
      const { n, d } = g, fn = typeof c === 'function';
      for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(n - 1, Math.ceil(cy + ry)); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(n - 1, Math.ceil(cx + rx)); x++) {
        const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
        if (nx * nx + ny * ny > 1) continue;
        const v = fn ? c(x, y, nx, ny) : c;
        if (v) d[y * n + x] = v;
      }
    }
    // cel shading on a sphere normal: tones T = [shadow, mid, lit, highlight], hard steps
    function cel(nx, ny, L, T) {
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), l = nx * L[0] + ny * L[1] + nz * L[2];
      return l > 0.9 ? T[3] : l > 0.5 ? T[2] : l > 0.05 ? T[1] : T[0];
    }
    // a stepped halo: rings toward `col`, strongest in the middle (pixel-art glow, no blur)
    function glow(g, cx, cy, r, col, steps = 4, a = 0.6) {
      const { n, d } = g;
      for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(n - 1, Math.ceil(cy + r)); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(n - 1, Math.ceil(cx + r)); x++) {
        const t = 1 - Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r;
        if (t <= 0) continue;
        const k = Math.ceil(t * steps) / steps, i = y * n + x;
        d[i] = mix(d[i], col, k * a);
      }
    }
    // 1-cell outline in `col` round every cell where mask is set, drawn outside it
    function edge(g, mask, col) {
      const { n, d } = g;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x;
        if (mask[i]) continue;
        if ((x > 0 && mask[i - 1]) || (x < n - 1 && mask[i + 1]) || (y > 0 && mask[i - n]) || (y < n - 1 && mask[i + n])) d[i] = col;
      }
    }
    const hash = (x, y, s = 0) => { let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 1274126177) | 0; h = Math.imul(h ^ h >>> 13, 1103515245); return ((h ^ h >>> 16) >>> 0) / 4294967296; };
    // bands of flat colour from y0 to y1 (top to bottom) with a one-row checker at each seam
    function bands(g, y0, y1, cols) {
      const { n, d } = g, k = cols.length;
      for (let y = Math.max(0, y0); y < Math.min(n, y1); y++) {
        const v = (y - y0) / (y1 - y0) * k, b = Math.min(k - 1, Math.floor(v)), seam = b > 0 && y === Math.ceil(y0 + b * (y1 - y0) / k);
        for (let x = 0; x < n; x++) d[y * n + x] = seam && ((x + y) & 1) ? cols[b - 1] : cols[b];
      }
    }
    function thick(g, x0, y0, x1, y1, w, c) { const h = (w - 1) / 2; line(g, x0, y0, x1, y1, (x, y) => rect(g, x - Math.floor(h), y - Math.floor(h), w, w, c)); }
    // a short ramp of hard tones from one colour: [deep, shadow, base, lit, highlight]
    const tones = c => [shade(c, 0.35), shade(c, 0.62), c, mix(c, WHITE, 0.3), mix(c, WHITE, 0.7)];
    // A scratch layer the size of the grid: draw one object into it with the
    // usual helpers (it has n and d), then commit() it onto the picture with a
    // 1-cell ink outline round it, so overlapping objects stay readable.
    function layer(n) { return { n, d: new Uint32Array(n * n) }; }
    function commit(g, L, ink) {
      const { n, d } = g, s = L.d;
      if (ink) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x;
        if (s[i]) continue;
        if ((x > 0 && s[i - 1]) || (x < n - 1 && s[i + 1]) || (y > 0 && s[i - n]) || (y < n - 1 && s[i + n])) d[i] = ink;
      }
      for (let i = 0; i < n * n; i++) if (s[i]) { d[i] = s[i]; s[i] = 0; }
    }
    // a turned solid (cup, vase, bottle): half-width prof(v) for v = 0 (top) .. 1 (bottom), cel shaded across
    function lathe(g, cx, y0, y1, prof, T, side = -0.6) {
      const { n, d } = g;
      for (let y = Math.max(0, Math.ceil(y0)); y < Math.min(n, Math.ceil(y1)); y++) {
        const r = prof((y + 0.5 - y0) / (y1 - y0));
        if (r < 0.5) continue;
        for (let x = Math.max(0, Math.round(cx - r)); x < Math.min(n, Math.round(cx + r)); x++) {
          const nx = (x + 0.5 - cx) / r;
          d[y * n + x] = cel(nx, 0, [side, -0.3, 0.75], [T[1], T[1], T[2], T[3]]);
          if (nx > side * 0.55 - 0.12 && nx < side * 0.55 + 0.1 && T[4]) d[y * n + x] = T[4];
        }
      }
    }
    // An alternative mode drawn on a coarser grid of about m cells, blown up into
    // the stage's own grid (whose size the original's R draws decide), so the
    // reworked modes keep their chunky look. build(g2) returns the frame function.
    function chunky(g, m, build) {
      const k = Math.max(1, Math.round(g.n / m)), mm = Math.floor(g.n / k);
      const g2 = { n: mm, d: new Uint32Array(mm * mm), S: g.S, input: g.input, sound: g.sound, alt: g.alt, home: g.home };
      const f = build(g2);
      return (t, dt, fi) => {
        f(t, dt, fi);
        const { n, d } = g, s = g2.d;
        for (let y = 0; y < n; y++) { const sy = Math.min(mm - 1, (y / k) | 0) * mm; for (let x = 0; x < n; x++) d[y * n + x] = s[sy + Math.min(mm - 1, (x / k) | 0)]; }
      };
    }
    return { hx, pal, spr, blit, ell, cel, glow, edge, hash, bands, thick, tones, layer, commit, lathe, chunky };
  })();
  const K = U.K4;
  // the original look: always on a prototype's opening variation, and on half the
  // others; the other half get an extra mode. Drawn from g.alt, never from R.
  const ogLook = g => g.home || g.alt() < 0.5;
  // Traits: T names what a variation rolled (shown in the large view); alt() rolls a new trait from
  // g.alt with weights, after every existing draw, and the opening variation always keeps `home`
  const T = (g, k, v) => (g.trait ? g.trait(k, v) : v);
  const alt = (g, home, opts) => { if (g.home) return home; let sum = 0; for (const o of opts) sum += o[1]; let r = g.alt() * sum; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };

  add({
    name: 'Metro', seed: 0, sizes: [100, 200], fps: 12,
    interactive: 'Click to start a new line from where you click.',
    recipe: 'A transit diagram that lays itself out in fat pixel lines: lines run only at right angles and diagonals, grow stop by stop beside a river, meet at interchanges, and then the trains start to run. Light, night, blueprint or sepia. Click to start a new line.',
    make(R, U, g) {
      const { n } = g, off = n * 0.08;
      let m = 14, u = (n - 2 * off) / m, w = Math.max(2, Math.round(n / 45));
      const COLS = [rgb(220, 36, 31), rgb(0, 40, 168), rgb(0, 128, 52), rgb(250, 200, 0), rgb(130, 24, 100), rgb(239, 123, 16), rgb(137, 78, 36), rgb(236, 140, 170), rgb(0, 160, 226), rgb(110, 190, 160)];
      const dark = R.bool(0.3), scheme = ogLook(g) ? (dark ? 'dark' : 'light') : g.alt.pick(['blue', 'sepia', dark ? 'light' : 'dark']), SCH = { light: ['#f6f2e8', '#b6d6ec', '#1e1e28', '#ffffff'], dark: ['#16181e', '#1c304a', '#ececec', '#16181e'], blue: ['#1a3a7a', '#24488a', '#e8f0ff', '#1a3a7a'], sepia: ['#ecdcb8', '#c8b48a', '#3a2a18', '#f6ead0'] }[scheme].map(K.hx);
      const [ground, river, ink, stop] = SCH;
      T(g, 'Scheme', { light: 'Day', dark: 'Night', blue: 'Blueprint', sepia: 'Sepia' }[scheme]);
      // new traits: how fine the network's lattice is, and what water it is drawn beside
      const net = T(g, 'Network', alt(g, 'City', [['City', 3], ['Dense', 1.2], ['Bold', 1.2]])), water = T(g, 'Water', alt(g, 'River', [['River', 3], ['Canal', 1], ['Two Rivers', 1], ['Dry', 0.6]]));
      if (net === 'Dense') m = 18; else if (net === 'Bold') { m = 10; w = Math.max(3, Math.round(n / 32)); }
      u = (n - 2 * off) / m; T(g, 'Grid', n);
      if (scheme === 'blue') COLS.splice(0, COLS.length, ...['#ffffff', '#ffd23a', '#7ad0ff', '#ff8a8a', '#a8ffa8', '#ffb07a'].map(K.hx));
      if (scheme === 'sepia') COLS.splice(0, COLS.length, ...['#8a2a1a', '#2a4a6a', '#3a6a2a', '#c8901a', '#6a3a6a', '#1a1a1a'].map(K.hx));
      const at = p => [Math.round(off + p[0] * u), Math.round(off + p[1] * u)];
      let map = null, born = 0;
      function build() {
        const cols = R.shuffle(COLS.slice()), L = R.int(4, 7), seen = new Map(), lines = [];
        for (let l = 0; l < L; l++) {
          let x = R.int(1, m - 1), y = R.int(1, m - 1), di = R.int(0, 7);
          const pts = [[x, y]];
          for (let s = 0; s < 60 && pts.length < 11; s++) {
            if (R() < 0.4) di = (di + R.sign() + 8) % 8;
            const len = R.int(1, 3), nx = x + D8[di][0] * len, ny = y + D8[di][1] * len;
            if (nx < 1 || ny < 1 || nx > m - 1 || ny > m - 1) { di = (di + R.pick([2, 3, 5, 6])) % 8; continue; }
            x = nx; y = ny; pts.push([x, y]);
          }
          const cum = [0];
          for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.max(Math.abs(pts[i][0] - pts[i - 1][0]), Math.abs(pts[i][1] - pts[i - 1][1])));
          for (const p of pts) { const k = p[0] * 100 + p[1]; seen.set(k, (seen.get(k) || 0) + 1); }
          lines.push({ pts, cum, c: cols[l % cols.length], start: 0.6 + l * 1.4, trains: [R(), R()] });
        }
        const rv = [];
        for (let i = 0; i <= 7; i++) rv.push([-0.5 + i * (m + 1) / 7, m * 0.5 + R.range(-3.5, 3.5)]);
        // a canal runs dead straight with one right-angled step; a second river mirrors the first
        if (water === 'Canal') { const y0 = Math.round(rv[2][1]), y1 = Math.round(rv[5][1]); rv.forEach((p, i) => { p[1] = i < 4 ? y0 : y1; }); rv.splice(4, 0, [rv[3][0], y1]); }
        const rv2 = water === 'Two Rivers' ? rv.map(([x, y]) => [x, m - y + (y > m / 2 ? -1.5 : 1.5)]) : null;
        return { lines, seen, rv, rv2 };
      }
      // the point `s` lattice units along a line
      function along(L, s) {
        const { pts, cum } = L;
        let i = 1;
        while (i < pts.length - 1 && cum[i] < s) i++;
        const f = U.clamp((s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1));
        return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f];
      }
      // a short bar across a line's end, the way transit maps mark a terminus
      function terminus(p, q, c) {
        const [x, y] = at(p), dx = Math.sign(q[0] - p[0]), dy = Math.sign(q[1] - p[1]), h = w >> 1;
        // perpendicular to the last segment, w thick and 3w long
        for (let k = -w; k <= w; k++) rect(g, x - h - dy * k, y - h + dx * k, w, w, c);
      }
      return (t) => {
        // the first map opens already a few seconds into its drawing, so the first frame is never empty
        if (!map || t - born > 34) { const first = !map; map = build(); born = first ? t - 5 : t; }
        const age = t - born;
        for (const tp of g.input.taps()) {
          // a new line grows from the clicked lattice point
          const A = g.alt;   // a click never draws from R
          let x = Math.max(1, Math.min(m - 1, Math.round((tp.x * n - off) / u))), y = Math.max(1, Math.min(m - 1, Math.round((tp.y * n - off) / u))), di = A.int(0, 7);
          const pts = [[x, y]];
          for (let q = 0; q < 60 && pts.length < 10; q++) { if (A() < 0.4) di = (di + A.sign() + 8) % 8; const len = A.int(1, 3), nx = x + D8[di][0] * len, ny = y + D8[di][1] * len; if (nx < 1 || ny < 1 || nx > m - 1 || ny > m - 1) { di = (di + A.pick([2, 3, 5, 6])) % 8; continue; } x = nx; y = ny; pts.push([x, y]); }
          const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.max(Math.abs(pts[i][0] - pts[i - 1][0]), Math.abs(pts[i][1] - pts[i - 1][1])));
          // visitors' lines join the map; only the newest four are kept, the map's own lines always stay
          map.lines.push({ pts, cum, c: A.pick(COLS), start: age, trains: [A(), A()], user: true });
          if (map.lines.filter(L => L.user).length > 4) map.lines.splice(map.lines.findIndex(L => L.user), 1);
          map.seen.clear();
          for (const L of map.lines) for (const p of L.pts) { const k = p[0] * 100 + p[1]; map.seen.set(k, (map.seen.get(k) || 0) + 1); }
        }
        g.d.fill(ground);
        if (water !== 'Dry') for (const rv of [map.rv, map.rv2]) if (rv) for (let i = 1; i < rv.length; i++) { const a = at(rv[i - 1]), b = at(rv[i]); thick(g, a[0], a[1], b[0], b[1], Math.round(w * 2.2), river); }
        for (const L of map.lines) {
          const grown = Math.min(L.cum[L.cum.length - 1], (age - L.start) * 3.2);
          if (grown <= 0) continue;
          for (let i = 1; i < L.pts.length && L.cum[i - 1] < grown; i++) {
            const a = at(L.pts[i - 1]), b = at(L.cum[i] <= grown ? L.pts[i] : along(L, grown));
            thick(g, a[0], a[1], b[0], b[1], w, L.c);
          }
          const last = L.pts.length - 1;
          if (last > 0) { terminus(L.pts[0], L.pts[1], L.c); if (grown >= L.cum[last]) terminus(L.pts[last], L.pts[last - 1], L.c); }
          // stations: a tick beside the line, or an interchange ring where lines meet
          for (let i = 0; i < L.pts.length && L.cum[i] <= grown; i++) {
            const p = L.pts[i], [x, y] = at(p);
            if (map.seen.get(p[0] * 100 + p[1]) > 1) continue;
            const q = L.pts[Math.min(i + 1, L.pts.length - 1)], r0 = L.pts[Math.max(i - 1, 0)], dx = Math.sign(q[0] - r0[0]), dy = Math.sign(q[1] - r0[1]);
            rect(g, x - (w >> 1) - dy * w, y - (w >> 1) + dx * w, w, w, L.c);
          }
        }
        for (const L of map.lines) {
          const total = L.cum[L.cum.length - 1], grown = (age - L.start) * 3.2;
          for (let i = 0; i < L.pts.length && L.cum[i] <= grown; i++) {
            const p = L.pts[i];
            if (map.seen.get(p[0] * 100 + p[1]) < 2) continue;
            const [x, y] = at(p);
            disc(g, x + 0.5, y + 0.5, w * 1.25, ink); disc(g, x + 0.5, y + 0.5, w * 0.7, stop);
          }
          if (grown < total + 1) continue;
          for (const ph of L.trains) {
            let s = ((age - L.start - total / 3.2) * 1.1 + ph * total * 2) % (total * 2);
            if (s > total) s = total * 2 - s;
            const [x, y] = at(along(L, s));
            rect(g, x - w + 1, y - w + 1, w * 2 - 1, w * 2 - 1, ink); rect(g, x - (w >> 1), y - (w >> 1), w, w, stop);
          }
        }
        dissolve(g, (age - 32) / 2, ground);
      };
    },
  });

  add({
    name: 'Treasure Map', seed: 0, sizes: [40, 50], fps: 12,
    interactive: 'Click the island to move the X; the route walks to it.',
    recipe: 'A treasure map in chunky pixels: one to three islands in flat sand and jungle with mountains, palms and a skull rock, inked coastlines and wave marks on a scorched parchment border, a compass rose and a sea serpent or a ship. A dotted red route walks from the boat to the X. Click the island to move the X.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, bg = new Uint32Array(n * n), land = new Uint8Array(n * n), H = new Float32Array(n * n);
      const SCH = R.pick([
        { nm: 'Parchment', p: ['#e8cf98', '#d6b47a', '#a8783c', '#5a3416'], sand: '#f0dca8', green: ['#6a8a3a', '#4a6a2a'], ink: '#3a2210', red: '#c0281e' },
        { nm: 'Old Hide', p: ['#d8c090', '#c0a070', '#8a6030', '#3a2010'], sand: '#e8d8a8', green: ['#5a7a3a', '#3a5a2a'], ink: '#2a1808', red: '#a82018' },
        { nm: 'Night Chart', p: ['#1e3a6a', '#16305a', '#0e2244', '#060e1e'], sand: '#e8e0c8', green: ['#c8d8e8', '#a8b8c8'], ink: '#e8eef8', red: '#ff5a4a' },
        { nm: 'Vellum', p: ['#f2e6c8', '#e0cfa0', '#b8955a', '#6a4422'], sand: '#f6e8b8', green: ['#7a9a4a', '#5a7a34'], ink: '#4a2a14', red: '#d23020' },
      ]);
      T(g, 'Map', SCH.nm);
      const P = SCH.p.map(K.hx), sand = K.hx(SCH.sand), G = SCH.green.map(K.hx), ink = K.hx(SCH.ink), red = K.hx(SCH.red);
      const nz = U.noise(R), isl = Array.from({ length: R.int(1, 3) }, (_, k) => ({ x: n * R.range(0.3, 0.7) + (k ? R.sign() * n * 0.22 : 0), y: n * R.range(0.38, 0.62) + (k ? R.sign() * n * 0.18 : 0), r: (k ? R.range(0.12, 0.18) : R.range(0.27, 0.34)) * n }));
      const f = 3 / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let h = -1;
        for (const I of isl) h = Math.max(h, 1 - Math.hypot((x - I.x) / I.r, (y - I.y) / (I.r * 0.85)) + nz.fbm(x * f, y * f, 0.5, 3) * 0.55);
        const i = y * n + x, e = Math.min(x, y, n - 1 - x, n - 1 - y);
        H[i] = h; land[i] = h > 0 ? 1 : 0;
        // parchment: flat, a scorched ragged border, a few stains
        let c = P[0];
        // stains are soft-edged blots from the noise field (not square blocks)
        if (e < 1 + K.hash(x + y, 1) * 2.2 * s) c = P[3]; else if (e < 2.5 * s + K.hash(x, y, 2) * 1.5) c = P[2]; else if (nz.n2(x * 4.5 / n + 17, y * 4.5 / n + 3) > 0.62 || (e < 4 * s && K.hash(x, y, 9) < 0.18)) c = P[1];
        if (land[i] && e > 2) c = h > 0.55 ? G[1] : h > 0.22 ? G[0] : sand;
        bg[i] = c;
      }
      // ink: coastline, wave marks, a second shoreline ring
      for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
        const i = y * n + x;
        if (land[i] && (!land[i - 1] || !land[i + 1] || !land[i - n] || !land[i + n])) bg[i] = ink;
        else if (!land[i] && Math.min(x, y, n - 1 - x, n - 1 - y) > 3 * s) {
          let near = false;
          for (const [dx, dy] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) if (land[(y + dy) * n + x + dx]) near = true;
          if (near && (x + y) % 2 === 0) bg[i] = P[2];
        }
      }
      // wave marks: little inked crests on a staggered grid, kept clear of the land and the border
      for (let y = Math.round(4 * s); y < n - 4 * s; y += 6) for (let x0 = Math.round(4 * s) + ((y / 6 | 0) & 1) * 4; x0 < n - 5 * s; x0 += 8) {
        let clear = true;
        for (let dy = -2; dy <= 2 && clear; dy++) for (let dx = -2; dx <= 4; dx++) if (land[(y + dy) * n + x0 + dx]) { clear = false; break; }
        if (!clear) continue;
        bg[y * n + x0] = P[2]; bg[(y - 1) * n + x0 + 1] = P[2]; bg[y * n + x0 + 2] = P[2];
      }
      // landmarks: mountains, palms, skull rock
      const spots = [];
      for (let k = 0; k < 600 && spots.length < 14; k++) { const x = R.int(3, n - 4), y = R.int(3, n - 4), h = H[y * n + x]; if (h > 0.2 && !spots.some(p => Math.hypot(p.x - x, p.y - y) < 4 * s)) spots.push({ x, y, kind: h > 0.55 ? 'mount' : R.bool(0.15) ? 'skull' : 'palm' }); }
      const MOUNT = K.spr(['..o..', '.oLo.', 'oLLDo', 'LLDDD']), PALM = K.spr(['g.g.g', '.ggg.', '..t..', '..t..']), SKULL = K.spr(['.www.', 'wkwkw', '.www.', '.w.w.']);
      // a compass rose with a red north arm and an N over it (an ink star, so it never reads as the X)
      const ROSE = K.spr(['....R....', '....R....', '...iRi...', '.d.iRi.d.', 'KKKKoKKKK', '.d.iki.d.', '...iki...', '....k....', '....k....']), NN = K.spr(['k..k', 'kk.k', 'k.kk', 'k..k', 'k..k']);
      const BOAT = K.spr(['..w..', '..ww.', '..m..', 'hhhhh', '.hhh.']);
      // the rose goes in whichever corner has the least land (top right when it is clear)
      const RC = [[n - 12 * s, 3 * s + 6], [3 * s, 3 * s + 6], [n - 12 * s, n - 3 * s - 9], [3 * s, n - 3 * s - 9]].map(([x, y]) => [Math.round(x), Math.round(y)]);
      let rose = RC[0], roseLand = 1e9;
      for (const [x, y] of RC) { let c = 0; for (let yy = y - 7; yy < y + 10; yy++) for (let xx = x - 1; xx < x + 10; xx++) if (xx >= 0 && yy >= 0 && xx < n && yy < n && land[yy * n + xx]) c++; if (c < roseLand) { roseLand = c; rose = [x, y]; } }
      const beaches = []; for (let y = 2; y < n - 2; y++) for (let x = 2; x < n - 2; x++) { const i = y * n + x; if (!land[i] && (land[i + 1] || land[i - 1])) beaches.push([x, y]); }
      const boat = beaches.length ? beaches[R.int(0, beaches.length - 1)] : [4, 4];
      const inland = spots.filter(p => p.kind !== 'mount');
      let X = inland.length ? { x: inland[inland.length - 1].x + 2, y: inland[inland.length - 1].y + 2 } : { x: n / 2, y: n / 2 };
      let route = [], born = 0;
      function plot(t) {
        route = []; born = t;
        const via = inland.slice(0, R.int(1, 3));
        const pts = [boat, ...via.map(p => [p.x + 1, p.y + 3]), [X.x, X.y]];
        for (let k = 1; k < pts.length; k++) { const [ax, ay] = pts[k - 1], [bx, by] = pts[k], L = Math.hypot(bx - ax, by - ay); for (let q = 0; q < L; q += 1) route.push([ax + (bx - ax) * q / L + Math.sin(q * 0.7 + k) * 0.8, ay + (by - ay) * q / L]); }
      }
      plot(0);
      const extra = R.pick(['serpent', 'ship', 'none']), ex = n * (R.bool() ? 0.18 : 0.78), ey = n * (R.bool() ? 0.2 : 0.8);
      T(g, 'Islands', isl.length); { const mt = spots.filter(p => p.kind === 'mount').length; T(g, 'Terrain', mt === 0 ? 'Lowland' : mt < 3 ? 'Hills' : 'Mountains'); } T(g, 'At Sea', { serpent: 'Sea Serpent', ship: 'Galleon', none: 'Calm' }[extra]); T(g, 'Grid', n);
      return (t) => {
        for (const tp of g.input.taps()) { const x = Math.round(tp.x * n), y = Math.round(tp.y * n); if (land[y * n + x]) { X = { x, y }; plot(t); } }
        if (t - born > 30) { X = inland.length ? { x: R.pick(inland).x + 2, y: R.pick(inland).y + 2 } : X; plot(t); }
        d.set(bg);
        for (const p of spots) K.blit(g, p.kind === 'mount' ? MOUNT : p.kind === 'palm' ? PALM : SKULL, p.x - 2, p.y - 3, p.kind === 'mount' ? { o: ink, L: P[1], D: P[2] } : p.kind === 'palm' ? { g: G[1], t: ink } : { w: K.hx('#f2ece0'), k: ink });
        { const [rx, ry] = rose; if (roseLand) rect(g, rx - 1, ry - 7, 11, 17, P[0]); K.blit(g, ROSE, rx, ry, { R: red, k: ink, K: ink, i: P[1], d: P[2], o: P[0] }); K.blit(g, NN, rx + 3, ry - 6, { k: ink }); }
        if (extra === 'serpent') for (let k = 0; k < 4; k++) { const x = ex + k * 2.5 * s, y = ey + Math.sin(t * 2 + k) * s; K.ell(g, x, y, 1.2 * s, 1.2 * s, (xx, yy, nx, ny) => ny > 0.2 ? 0 : G[0]); }
        if (extra === 'ship') { const x = ex + Math.sin(t * 0.3) * 2 * s; rect(g, x - 3 * s, ey, 6 * s, 1.5 * s, ink); line(g, x, ey, x, ey - 5 * s, ink); rect(g, x - 2 * s, ey - 4.5 * s, 3 * s, 3 * s, P[0]); }
        // the route walks itself in red dashes, then the X
        const walked = Math.min(route.length, ((t - born) * 6) | 0);
        for (let k = 0; k < walked; k += 2) put(g, route[k][0], route[k][1], red);
        K.blit(g, BOAT, boat[0] - 2, boat[1] - 3, { w: K.hx('#f2ece0'), m: ink, h: K.hx('#6a4022') }, boat[0] > n / 2);
        if (walked >= route.length - 1 || (t * 3 | 0) % 2) { line(g, X.x - 1.5 * s, X.y - 1.5 * s, X.x + 1.5 * s, X.y + 1.5 * s, red); line(g, X.x - 1.5 * s, X.y + 1.5 * s, X.x + 1.5 * s, X.y - 1.5 * s, red); }
      };
    },
  });

  add({
    name: 'Coastline', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'How long is a coast? A pair of dividers walks round an island with a long stride, then a shorter one and a shorter one, each pass in a new colour; the measured length keeps growing as the ruler shrinks.',
    make(R, U, g) {
      const { n, d } = g, bg = new Uint32Array(n * n), c = n / 2;
      const CSL = [['#0a1630', '#102242', '#968458', '#b09e70', '#ece2c4'], ['#0e2a2a', '#143838', '#5a8a3a', '#6aa048', '#e8f0d0'], ['#e8dcc0', '#dccfae', '#a88a5a', '#c0a070', '#3a2a1a'], ['#14261c', '#182c20', '#d8d2b8', '#e6e0c8', '#ffffff']];
      const og = ogLook(g), csi = og ? 0 : g.alt.pick([0, 1, 2, 3]), CS = CSL[csi].map(K.hx);
      T(g, 'Chart', ['Night Sea', 'Fen', 'Paper', 'Chalk'][csi]);
      // new traits: how ragged the coast is and the island's overall form
      const rough = T(g, 'Coast', alt(g, 'Rocky', [['Rocky', 3], ['Fjords', 1], ['Smooth', 1]])), form = T(g, 'Form', alt(g, 'Round', [['Round', 3], ['Long', 1], ['Tall', 1]])), T2 = T(g, 'Grid', n);
      const kExp = { Rocky: -1.15, Fjords: -0.9, Smooth: -1.5 }[rough], kAmp = { Rocky: 0.42, Fjords: 0.36, Smooth: 0.5 }[rough], fx = { Round: 1, Long: 1.16, Tall: 0.74 }[form], fy = { Round: 0.92, Long: 0.66, Tall: 1.08 }[form];
      const sea = og ? [rgb(10, 22, 48), rgb(16, 34, 66)] : [CS[0], CS[1]], sand = og ? [rgb(150, 132, 92), rgb(176, 158, 112)] : [CS[2], CS[3]], coast = og ? rgb(236, 226, 196) : CS[4];
      // on a light chart the dividers and passes are inked dark; on a dark sea they shine
      const paperSea = X.lum(sea[0]) > 0.5, metal = paperSea ? rgb(60, 52, 44) : rgb(200, 206, 214), tip = paperSea ? rgb(30, 24, 20) : WHITE, passB = paperSea ? 62 : 100, big = n >= 200 ? 2 : 1;
      // digits drawn `big` cells per pixel so the tallies stay readable on the fine grid
      const tally = (str, x, y, c) => { for (const ch of String(str)) { const r = DIG[ch]; if (r) for (let j = 0; j < 5; j++) for (let b = 0; b < 3; b++) if (r[j] >> (2 - b) & 1) rect(g, x + b * big, y + j * big, big, big, c); x += 4 * big; } };
      let passes, born = -99, h0;
      function build() {
        const K = 48, amp = [], ph = [], N = 900, R0 = n * 0.34;
        for (let k = 2; k < K; k++) { amp[k] = R.range(0.4, 1) * Math.pow(k, kExp) * kAmp; ph[k] = R() * TAU; }
        const pts = [];
        for (let i = 0; i < N; i++) {
          const a = i / N * TAU; let r = 1;
          for (let k = 2; k < K; k++) r += amp[k] * Math.sin(k * a + ph[k]);
          pts.push([c + Math.cos(a) * R0 * r * fx, c + Math.sin(a) * R0 * r * fy]);
        }
        const G = { n, d: bg };
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = sea[(x * 3 + y * 5) % 11 === 0 ? 1 : 0];
        X.poly(G, pts.flat(), (x, y) => sand[og ? (X.dith4(x, y) < 0.3 ? 1 : 0) : (x + y) % 5 === 0 ? 1 : 0]);
        for (let i = 0; i < N; i++) put(G, pts[i][0], pts[i][1], coast);
        h0 = R.range(0, 100);
        passes = [];
        let start = 1.5;
        for (const step of [n / 3, n / 6, n / 12, n / 24, n / 48].filter(s => s >= 2.5)) {
          const ch = [pts[0]];
          let j = 0;
          for (;;) {
            const p = ch[ch.length - 1];
            let k = j + 1;
            while (k < N && Math.hypot(pts[k][0] - p[0], pts[k][1] - p[1]) < step) k++;
            if (k >= N) { ch.push(pts[0]); break; }
            ch.push(pts[k]); j = k;
          }
          const dt = Math.min(0.5, 7 / ch.length);
          passes.push({ step, ch, start, dt, col: X.hsbPk(h0 + passes.length * 19, 75, passB) });
          start += ch.length * dt + 1.2;
        }
        passes.end = start + 3;
      }
      return (t) => {
        if (!passes || t - born > passes.end) { build(); born = t; }
        const age = t - born;
        d.set(bg);
        let row = 2 + big;
        for (const p of passes) {
          if (age < p.start) break;
          const k = Math.min(p.ch.length - 1, Math.floor((age - p.start) / p.dt)), done = k >= p.ch.length - 1;
          const col = done ? X.mixPk(p.col, sea[0], 0.35) : p.col;
          // on the fine grid every pass is 2 cells wide so it holds up at tile size
          for (let i = 1; i <= k; i++) { if (big > 1) thick(g, p.ch[i - 1][0], p.ch[i - 1][1], p.ch[i][0], p.ch[i][1], 2, col); else line(g, p.ch[i - 1][0], p.ch[i - 1][1], p.ch[i][0], p.ch[i][1], col); }
          for (let i = 0; i <= k; i++) put(g, p.ch[i][0], p.ch[i][1], tip);
          if (!done && k >= 1) {
            // the dividers: two legs up to a hinge outside the chord
            const [ax, ay] = p.ch[k - 1], [bx, by] = p.ch[k], mx = (ax + bx) / 2, my = (ay + by) / 2, ox = mx - c, oy = my - c, ol = Math.hypot(ox, oy) || 1, hl = p.step * 0.7;
            const hx = mx + ox / ol * hl, hy = my + oy / ol * hl;
            if (big > 1) { thick(g, ax, ay, hx, hy, 2, metal); thick(g, bx, by, hx, hy, 2, metal); } else { line(g, ax, ay, hx, hy, metal); line(g, bx, by, hx, hy, metal); }
            rect(g, hx - big, hy - big, 2 * big, 2 * big, tip);
          }
          const len = Math.round((done ? p.ch.length - 1 : k) * p.step * 10 / n * 10);
          // the tally: a swatch of the pass colour on a small plate, then the measured length
          rect(g, 1, row - 1, (4 + String(len).length * 4) * big + 2, 5 * big + 2, sea[0]);
          rect(g, 2, row, 2 * big, 5 * big, p.col); tally(len, 2 + 4 * big, row, done ? X.mixPk(p.col, tip, 0.5) : tip);
          row += 7 * big;
        }
        // the island dissolves into open sea before the next one is charted
        dissolve(g, (age - (passes.end - 1.4)) / 1.2, sea[0]);
      };
    },
  });

  add({
    name: 'Desire Paths', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Click the lawn to plant a tree in the way.',
    recipe: 'A walled park lawn crossed all day by people going gate to gate. Each walker leans toward ground that is already worn, so bare earth paths emerge, merge and fade as the grass grows back.',
    make(R, U, g) {
      const { n, d } = g, wear = new Float32Array(n * n), block = new Uint8Array(n * n), base = new Uint32Array(n * n);
      const sni = ogLook(g) ? -1 : g.alt.pick([0, 1, 2, 3]), SEASON = sni < 0 ? null : [
        [['#40803a', '#5c8c3c', '#969654', '#b6a070', '#ccba92'], ['#1e4622', '#2a582c']],
        [['#8a8a3a', '#a08a3a', '#b4844a', '#c09a6a', '#d0b48a'], ['#6a3a1a', '#8a4a20']],
        [['#e8eef4', '#d8e0ea', '#a8b0bc', '#8a8a90', '#6a6a70'], ['#2a3a3a', '#3a4a4a']],
        [['#4a9a5a', '#5aa868', '#8ab070', '#b0a070', '#c8b890'], ['#2a5a3a', '#346a44']],
      ][sni];
      T(g, 'Season', ['Summer', 'Midsummer', 'Autumn', 'Snow', 'Spring'][sni + 1]);
      // new traits: what stands in the middle of the park, and how busy it is
      const centre = T(g, 'Centre', alt(g, 'Fountain', [['Fountain', 3], ['Pond', 1], ['Bandstand', 1], ['Statue', 0.8], ['Open Lawn', 0.6]])), crowd = T(g, 'Crowd', alt(g, 'Steady', [['Steady', 3], ['Quiet', 1], ['Busy', 1]]));
      const turf = SEASON ? SEASON[0].map(K.hx) : [rgb(64, 128, 52), rgb(92, 140, 60), rgb(150, 150, 84), rgb(182, 160, 112), rgb(204, 186, 146)], turf0 = shade(turf[0], 0.92), B4 = X.bayer(4);
      const hedge = SEASON ? SEASON[1].map(K.hx) : [rgb(30, 70, 34), rgb(42, 88, 44)], gates = [];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (x < 2 || y < 2 || x > n - 3 || y > n - 3) block[y * n + x] = 1;
      const G = R.int(4, 6);
      for (let k = 0; k < G; k++) {
        const side = k % 4, p = R.int(8, n - 9);
        const [x, y] = side === 0 ? [p, 0] : side === 1 ? [n - 1, p] : side === 2 ? [p, n - 1] : [0, p];
        for (let a = -2; a <= 2; a++) for (let b = 0; b < 3; b++) { const xx = side % 2 ? (side === 1 ? n - 1 - b : b) : x + a, yy = side % 2 ? y + a : (side === 2 ? n - 1 - b : b); if (xx >= 0 && yy >= 0 && xx < n && yy < n) block[yy * n + xx] = 0; }
        gates.push([side % 2 ? (side === 1 ? n - 4 : 3) : x, side % 2 ? y : (side === 2 ? n - 4 : 3)]);
      }
      const obst = [];
      const fx = n * R.range(0.38, 0.62), fy = n * R.range(0.38, 0.62), fr = n * { Fountain: 0.07, Pond: 0.11, Bandstand: 0.075, Statue: 0.035, 'Open Lawn': 0 }[centre];
      if (fr) obst.push([fx, fy, fr, centre === 'Fountain' ? 'fountain' : centre]);
      for (let k = 0; k < R.int(2, 5); k++) obst.push([R.range(0.15, 0.85) * n, R.range(0.15, 0.85) * n, n * R.range(0.03, 0.05), 'tree']);
      T(g, 'Trees', obst.filter(o => o[3] === 'tree').length); T(g, 'Gates', G);
      const stampAll = () => {
        for (let i = 0; i < n * n; i++) if (block[i] === 2) block[i] = 0;
        for (const [ox, oy, r] of obst) for (let y = Math.floor(oy - r); y <= oy + r; y++) for (let x = Math.floor(ox - r); x <= ox + r; x++) if (x >= 2 && y >= 2 && x < n - 2 && y < n - 2 && Math.hypot(x + 0.5 - ox, y + 0.5 - oy) < r) block[y * n + x] = 2;
      };
      for (const [ox, oy, r] of obst) for (let y = Math.floor(oy - r); y <= oy + r; y++) for (let x = Math.floor(ox - r); x <= ox + r; x++) if (x >= 0 && y >= 0 && x < n && y < n && Math.hypot(x + 0.5 - ox, y + 0.5 - oy) < r) block[y * n + x] = 2;
      const planted = obst.length;   // trees after these were planted by visitors (kept, at most 14)
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) base[y * n + x] = ((x >> 3) & 1) ? 0 : 1;
      const people = [], CL = [rgb(220, 60, 60), rgb(240, 200, 60), rgb(60, 110, 220), WHITE, rgb(240, 120, 40), rgb(160, 70, 200)];
      const spawn = p => { const a = R.int(0, gates.length - 1); let b = R.int(0, gates.length - 2); if (b >= a) b++; p.x = gates[a][0]; p.y = gates[a][1]; p.tx = gates[b][0]; p.ty = gates[b][1]; p.life = 0; p.c = R.pick(CL); };
      for (let k = 0; k < Math.round(n * { Steady: 0.28, Quiet: 0.16, Busy: 0.42 }[crowd]); k++) { const p = {}; spawn(p); p.x += R.range(-1, 1); people.push(p); }
      const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && !block[(y | 0) * n + (x | 0)];
      const wearAt = (x, y) => (x >= 0 && y >= 0 && x < n && y < n) ? wear[(y | 0) * n + (x | 0)] : 0;
      function walk(p) {
        const dx = p.tx - p.x, dy = p.ty - p.y;
        if (dx * dx + dy * dy < 4 || ++p.life > n * 6) return spawn(p);
        const h = Math.atan2(dy, dx);
        let best = -1e9, ba = h;
        for (const k of [-0.9, -0.5, -0.25, 0, 0.25, 0.5, 0.9]) {
          const a = h + k, px = p.x + Math.cos(a) * 2.5, py = p.y + Math.sin(a) * 2.5;
          if (!free(px, py)) continue;
          const w = wearAt(px, py), s = Math.cos(k) + 0.55 * w / (w + 3) + R() * 0.08;
          if (s > best) { best = s; ba = a; }
        }
        if (best < -1e8) ba = h + R.range(-2, 2);
        const nx = p.x + Math.cos(ba) * 0.8, ny = p.y + Math.sin(ba) * 0.8;
        if (free(nx, ny)) { p.x = nx; p.y = ny; }
        const i = (p.y | 0) * n + (p.x | 0);
        wear[i] = Math.min(24, wear[i] + 1);
      }
      for (let s = 0; s < 700; s++) for (const p of people) walk(p);
      let tick = 0;
      return () => {
        let added = false;
        for (const tp of g.input.taps()) {
          // a tree planted where you click stays (a visitor's mark); the oldest planted one goes past 14
          const ox = tp.x * n, oy = tp.y * n;
          if (ox < 3 || oy < 3 || ox > n - 3 || oy > n - 3) continue;
          obst.push([ox, oy, n * 0.04, 'tree']); added = true;
          if (obst.length - planted > 14) obst.splice(planted, 1);
        }
        if (added) stampAll();
        if (++tick % 6 === 0) for (let i = 0; i < wear.length; i++) wear[i] *= 0.9892;   // 0.9982 per frame, applied every sixth
        for (const p of people) walk(p);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, b = block[i];
          if (b === 1) { d[i] = hedge[(x * 7 + y * 3) % 5 === 0 ? 1 : 0]; continue; }
          if (b === 2) { d[i] = 0; continue; }
          // a worn path frays a cell into the grass on either side (drawn only; the walkers see the true wear)
          let w = wear[i];
          if (w < 6 && x > 0 && y > 0 && x < n - 1 && y < n - 1) { const m = Math.max(wear[i - 1], wear[i + 1], wear[i - n], wear[i + n]) * 0.42; if (m > w) w = m; }
          const q = w >= 9 ? 4 : (w * 0.4445 + B4[(y & 3) * 4 + (x & 3)]) | 0;
          d[i] = q === 0 && base[i] ? turf0 : turf[q];
        }
        for (const [ox, oy, r, kind] of obst) {
          if (kind === 'fountain') {
            disc(g, ox + 1, oy + 1, r, shade(turf[0], 0.6)); disc(g, ox, oy, r, rgb(190, 190, 180)); disc(g, ox, oy, r - 1.2, rgb(70, 130, 190)); disc(g, ox, oy, r * 0.3, rgb(220, 236, 250));
            // the jet glints as it plays
            const a = tick * 0.9; put(g, ox + Math.cos(a) * r * 0.55, oy + Math.sin(a) * r * 0.55, rgb(200, 226, 250));
          }
          else if (kind === 'Pond') { disc(g, ox + 1, oy + 1, r, shade(turf[0], 0.6)); disc(g, ox, oy, r, rgb(60, 110, 70)); disc(g, ox, oy, r - 1, rgb(50, 100, 150)); disc(g, ox - r * 0.3, oy - r * 0.25, r * 0.35, rgb(80, 140, 190)); for (let k = 0; k < 3; k++) disc(g, ox + Math.cos(k * 2.2 + 1) * r * 0.5, oy + Math.sin(k * 2.2 + 1) * r * 0.5, 1.2, rgb(70, 150, 60)); }
          else if (kind === 'Bandstand') { disc(g, ox + 1.5, oy + 1.5, r, shade(turf[0], 0.6)); for (let k = 0; k < 8; k++) put(g, ox + Math.cos(k * TAU / 8) * (r - 0.5), oy + Math.sin(k * TAU / 8) * (r - 0.5), rgb(240, 236, 226)); disc(g, ox, oy, r * 0.75, rgb(170, 60, 50)); disc(g, ox, oy, r * 0.45, rgb(200, 80, 64)); disc(g, ox - r * 0.2, oy - r * 0.2, r * 0.2, rgb(230, 120, 100)); put(g, ox, oy, rgb(250, 220, 120)); }
          else if (kind === 'Statue') { disc(g, ox + 1, oy + 1, r + 1, shade(turf[0], 0.6)); disc(g, ox, oy, r + 1, rgb(170, 166, 156)); disc(g, ox, oy, r * 0.6, rgb(110, 140, 120)); put(g, ox - 1, oy - 1, rgb(160, 200, 170)); }
          else { disc(g, ox + 1, oy + 1, r, rgb(30, 50, 26)); disc(g, ox, oy, r, rgb(40, 100, 40)); disc(g, ox - r * 0.3, oy - r * 0.3, r * 0.45, rgb(70, 140, 56)); }
        }
        for (const p of people) put(g, p.x, p.y, p.c);
      };
    },
  });

  add({
    name: 'Night Flights', seed: 1, sizes: [50, 80], fps: 12,
    interactive: 'Click the map to send a plane there from the nearest city.',
    recipe: 'A world map in a few flat colours panning slowly while a hard line between day and night sweeps across it. Cities light up as single cells on the dark side, and planes trace great-circle arcs between them, trailing dotted wakes. Click to send a plane where you click.',
    make(R, U, g) {
      const { n, d } = g, W = 2 * n, H = n, nz = U.noise(R), day = new Uint32Array(W * H), night = new Uint32Array(W * H), isLand = new Uint8Array(W * H);
      const sinP = new Float32Array(H), cosP = new Float32Array(H), cosL = new Float32Array(W), sinL = new Float32Array(W);
      // map schemes: deep sea, shallow sea, land, high land, dry land, ice; night sea, night land; city light, plane
      const SCH = R.pick([
        ['#1c4a8c', '#2a62a8', '#4e8a40', '#76783e', '#c4aa70', '#e2eaf0', '#050a1a', '#101416', '#ffd27a', '#ffffff'],
        ['#0a2a2a', '#124040', '#c8b070', '#a89058', '#e0c890', '#f0f0e8', '#020a0a', '#141008', '#ffb02a', '#e8fff8'],
        ['#000000', '#141008', '#c87a1a', '#a85a10', '#f0a030', '#ffd080', '#000000', '#1a0e04', '#ffd27a', '#fff0c0'],
        ['#021408', '#04200e', '#1a8a3a', '#2aa04a', '#3ac05a', '#8affa0', '#000802', '#021006', '#aaffaa', '#e8ffe8'],
        ['#2a1a4a', '#3a2a6a', '#e86a8a', '#c84a7a', '#f2a07a', '#fff0f0', '#0a0614', '#1a0a14', '#ffe07a', '#ffffff'],
      ]);
      T(g, 'Map', ['#1c4a8c', '#0a2a2a', '#000000', '#021408', '#2a1a4a'].indexOf(SCH[0]) >= 0 ? ['Atlas', 'Verdigris', 'Amber', 'Phosphor', 'Sunset'][['#1c4a8c', '#0a2a2a', '#000000', '#021408', '#2a1a4a'].indexOf(SCH[0])] : 'Atlas');
      SCH.splice(0, SCH.length, ...SCH.map(hx => { const v = parseInt(hx.slice(1), 16); return rgb(v >> 16 & 255, v >> 8 & 255, v & 255); }));
      for (let j = 0; j < H; j++) { const lat = Math.PI / 2 - (j + 0.5) / H * Math.PI; sinP[j] = Math.sin(lat); cosP[j] = Math.cos(lat); }
      const dusk = SCH[8];
      for (let i = 0; i < W; i++) { const lon = i / W * TAU - Math.PI; cosL[i] = Math.cos(lon); sinL[i] = Math.sin(lon); }
      const thr = R.range(0.06, 0.12), cities = [];
      // night land sits a step above the night sea so the continents still read in the dark
      const nightLand = mix(SCH[7], SCH[2], 0.16), nightIce = mix(SCH[6], SCH[5], 0.22);
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const x = cosP[j] * cosL[i], y = cosP[j] * sinL[i], z = sinP[j], k = W * H;
        const v = nz.fbm(x * 1.15, y * 1.15, z * 1.15, 4), dry = nz.n3(x * 1.6 + 9, y * 1.6, z * 1.6), idx = j * W + i;
        const ice0 = Math.abs(sinP[j]) > 0.94;   // the original cap: still decides where cities may stand
        // the polar ice is ragged, reaching further down over land, so it never reads as a band
        const alat = Math.abs(Math.asin(sinP[j])) * 57.3, ice = alat > (v > thr ? 70 + 9 * nz.n3(x * 3 + 4, y * 3, z * 3) : 85 + 4 * nz.n3(x * 4, y * 4 + 2, z * 4));
        if (ice) { day[idx] = SCH[5]; night[idx] = nightIce; isLand[idx] = 1; }
        else if (v > thr) {
          isLand[idx] = 1;
          day[idx] = dry > 0.15 ? SCH[4] : v > thr + 0.18 ? SCH[3] : SCH[2];
          night[idx] = nightLand;
        } else { day[idx] = v > thr - 0.07 ? SCH[1] : SCH[0]; night[idx] = SCH[6]; }
        if ((v > thr || ice0) && !ice0 && Math.abs(sinP[j]) < 0.8 && R() < 30 / k * 2) cities.push({ j, i, b: R.range(0.5, 1) });
      }
      // the coast is one cell of shallow-sea tint on the day side, so land meets water crisply
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const idx = j * W + i;
        if (isLand[idx]) continue;
        const l = isLand[j * W + (i + 1) % W] || isLand[j * W + (i + W - 1) % W] || (j > 0 && isLand[idx - W]) || (j < H - 1 && isLand[idx + W]);
        if (l) { day[idx] = SCH[1]; night[idx] = mix(SCH[6], nightLand, 0.45); }
      }
      const vec = c => { const lat = Math.asin(sinP[c.j]), lon = c.i / W * TAU - Math.PI; return [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)]; };
      const flights = [];
      const launch = (f, from) => {
        f.a = from || R.pick(cities); f.b = R.pick(cities);
        const A = vec(f.a), B = vec(f.b), dot = U.clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1);
        f.A = A; f.B = B; f.om = Math.acos(dot); f.s = 0; f.v = 0.12 / Math.max(0.3, f.om);
        if (f.om < 0.2) f.s = 1;
      };
      T(g, 'Land', thr < 0.08 ? 'Continents' : thr < 0.1 ? 'Coasts' : 'Islands'); T(g, 'Cities', cities.length);
      // new traits: how many planes are up, and the season (how far the sun's path tilts the day/night line)
      const traffic = T(g, 'Traffic', alt(g, 'Steady', [['Steady', 3], ['Quiet', 1], ['Rush Hour', 1]])), season = T(g, 'Sun', alt(g, 'Turning Year', [['Turning Year', 3], ['Equinox', 1], ['Midnight Sun', 1]])); T(g, 'Grid', n);
      if (cities.length > 2) for (let k = 0; k < { Steady: 16, Quiet: 7, 'Rush Hour': 28 }[traffic]; k++) { const f = {}; launch(f); f.s = R(); flights.push(f); }
      const slerp = (f, s) => {
        const so = Math.sin(f.om) || 1, a = Math.sin((1 - s) * f.om) / so, b = Math.sin(s * f.om) / so;
        const x = a * f.A[0] + b * f.B[0], y = a * f.A[1] + b * f.B[1], z = a * f.A[2] + b * f.B[2];
        return [Math.atan2(y, x), Math.asin(U.clamp(z, -1, 1))];
      };
      const kk = 1;
      let offT = 0;
      return (t, dt) => {
        for (const tp of g.input.taps()) if (cities.length > 2) {
          // the nearest city to the click becomes the destination of a new flight from a random city
          const off0 = Math.floor(offT) % W, tx = (Math.floor(tp.x * n) + off0) % W, ty = Math.floor(tp.y * n);
          let best = cities[0], bd = 1e9;
          for (const c of cities) { const dx = Math.min(Math.abs(c.i - tx), W - Math.abs(c.i - tx)), dd = dx * dx + (c.j - ty) ** 2; if (dd < bd) { bd = dd; best = c; } }
          const f = {}; launch(f); f.b = best; const A = vec(f.a), B = vec(f.b); f.A = A; f.B = B; f.om = Math.acos(U.clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1)); f.s = 0; f.v = 0.25 / Math.max(0.3, f.om); flights.push(f); if (flights.length > 36) flights.shift();
        }
        offT = t * 1.2;
        const off = Math.floor(t * 1.2) % W, lonL = off / W * TAU - Math.PI;
        const sl = -t * 0.18, dec = season === 'Equinox' ? 0.02 : season === 'Midnight Sun' ? 0.4 : 0.38 * Math.sin(t * 0.03), sd = Math.sin(dec), cd = Math.cos(dec), csl = Math.cos(sl), ssl = Math.sin(sl);
        for (let y = 0; y < n; y++) {
          const a = sinP[y] * sd, b = cosP[y] * cd, row = y * W;
          for (let x = 0; x < n; x++) {
            const i = (x + off) % W, cz = a + b * (cosL[i] * csl + sinL[i] * ssl);
            // a hard terminator: full day, one warm sunset step, one dusk step, then night
            d[y * n + x] = cz > 0.07 ? day[row + i] : cz > 0 ? mix(day[row + i], dusk, 0.32) : cz > -0.07 ? mix(night[row + i], day[row + i], 0.22) : night[row + i];
          }
        }
        const toView = (lon, lat) => { let x = ((lon - lonL) % TAU + TAU) % TAU * n / Math.PI; return [x, (Math.PI / 2 - lat) * n / Math.PI]; };
        for (const c of cities) {
          const x = ((c.i - off) % W + W) % W;
          if (x >= n) continue;
          const cz = sinP[c.j] * sd + cosP[c.j] * cd * (cosL[c.i] * csl + sinL[c.i] * ssl);
          if (cz < -0.04) {
            const w = 0.6 + 0.4 * Math.sin(t * 2 + c.i), col = X.mixPk(shade(SCH[8], 0.5), SCH[8], c.b * w);
            // the bigger cities spill a little light into the cells round them
            if (c.b > 0.72) for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + ox, yy = c.j + oy; if (xx >= 0 && xx < n && yy >= 0 && yy < n) d[yy * n + xx] = X.mixPk(d[yy * n + xx], SCH[8], 0.3 * w); }
            put(g, x, c.j, col);
          }
        }
        for (const f of flights) {
          f.s += f.v * dt;
          if (f.s >= 1) { launch(f, f.b); continue; }
          let px = null;
          for (let q = 0; q <= 24; q++) {
            const s = f.s - 0.2 * (1 - q / 24);
            if (s < 0) continue;
            const [lon, lat] = slerp(f, s), [x, y] = toView(lon, lat);
            if (x < n && q % 3 === 0) put(g, x, y, X.mixPk(SCH[0], SCH[9], q / 24));
            px = [x, y];
          }
          if (px && px[0] < n) rect(g, px[0], px[1], kk, kk, SCH[9]);
        }
      };
    },
  });

  add({
    name: 'Sea Chart', seed: 0, sizes: [50, 80], fps: 12,
    interactive: 'Click the water to set the ship a new course.',
    recipe: 'A nautical chart in chunky flat tints: buff land, banded shallows, dotted depth contours, a few soundings, a compass rose and a lighthouse sweeping its sector. A ship steams along its pencilled course. Click the water to set it a new heading.',
    make(R, U, g) {
      const { n, d } = g, s = n / 50, bg = new Uint32Array(n * n), H = new Float32Array(n * n), nz = U.noise(R), f = 2.6 / n;
      const SCH = R.pick([
        ['#f0dca0', '#c8b070', '#a8d4ec', '#cde6f4', '#f6fafc', '#1a2a4a', '#c8281e'],
        ['#e8e0cc', '#c0b090', '#9ec8c0', '#c4e0da', '#f4f8f4', '#2a2a2a', '#b82a20'],
        ['#d8c8a0', '#b0a078', '#8ab0c8', '#b4d0e0', '#e8f0f4', '#3a2a1a', '#d03a2a'],
      ]);
      T(g, 'Chart', ['Admiralty', 'Survey', 'Antique'][['#f0dca0', '#e8e0cc', '#d8c8a0'].indexOf(SCH[0])]);
      SCH.splice(0, SCH.length, ...SCH.map(K.hx));
      const [landC, landD, sh1, sh2, deep, ink, red] = SCH;
      const lvl = R.range(0.02, 0.12), off = R.range(0, 9);
      // new traits: the lie of the land (a mainland shore along one side, or islands) and the scale of the coast
      const lie = T(g, 'Waters', alt(g, 'Islands', [['Islands', 3], ['Mainland West', 0.8], ['Mainland East', 0.8], ['Strait', 0.8], ['Open Sea', 0.6]])), sc = T(g, 'Scale', alt(g, 'Harbour', [['Harbour', 3], ['Archipelago', 1], ['Bay', 1]]));
      const ff = f * { Harbour: 1, Archipelago: 1.7, Bay: 0.62 }[sc], slope = (x, y) => lie === 'Mainland West' ? (0.5 - x / n) * 0.55 : lie === 'Mainland East' ? (x / n - 0.5) * 0.55 : lie === 'Strait' ? Math.abs(y / n - 0.5) * 0.7 - 0.12 : lie === 'Open Sea' ? -0.08 : 0;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, h = nz.fbm(x * ff + off, y * ff, 0.5, 4) + (x / n - 0.5) * R.range(-0.4, 0.4) * 0 + slope(x, y);
        H[i] = h;
        bg[i] = h > lvl ? ((x + y) % 4 === 0 && h > lvl + 0.15 ? landD : landC) : h > lvl - 0.08 ? sh1 : h > lvl - 0.18 ? sh2 : deep;
      }
      // coast in ink, depth contours dotted
      for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
        const i = y * n + x, a = H[i] > lvl;
        if (a && (H[i - 1] <= lvl || H[i + 1] <= lvl || H[i - n] <= lvl || H[i + n] <= lvl)) bg[i] = ink;
        for (const c of [lvl - 0.08, lvl - 0.18, lvl - 0.3]) if (H[i] <= c && (H[i + 1] > c || H[i + n] > c) && (x + y) % 2 === 0) bg[i] = mix(ink, deep, 0.45);
      }
      // a few soundings, a light, a rose
      const sound = []; for (let k = 0; k < 200 && sound.length < R.int(4, 8); k++) { const x = R.int(3, n - 8), y = R.int(3, n - 7); if (H[y * n + x] < lvl - 0.1 && H[(y + 4) * n + x + 4] < lvl - 0.1 && !sound.some(p => Math.abs(p.x - x) < 8 && Math.abs(p.y - y) < 7)) sound.push({ x, y, v: String(Math.round((lvl - H[y * n + x]) * 90)) }); }
      // a sounding is only printed where every cell of its digits is open water
      for (let k = sound.length - 1; k >= 0; k--) { const p = sound[k], w = p.v.length * 4; let ok = true; for (let y = p.y; y < p.y + 5 && ok; y++) for (let x = p.x; x < p.x + w - 1; x++) if (x < 1 || y < 1 || x >= n - 1 || y >= n - 1 || H[y * n + x] > lvl - 0.02) { ok = false; break; } if (!ok) sound.splice(k, 1); }
      T(g, 'Soundings', sound.length); T(g, 'Grid', n);
      const coastPts = []; for (let y = 2; y < n - 2; y++) for (let x = 2; x < n - 2; x++) if (bg[y * n + x] === ink) coastPts.push([x, y]);
      const light = coastPts.length ? coastPts[R.int(0, coastPts.length - 1)] : [n / 2, n / 2];
      const ROSE = K.spr(['....i....', '...iri...', '..i.r.i..', '.i..r..i.', 'irrrkrrri', '.i..r..i.', '..i.r.i..', '...iri...', '....i....']);
      const rx = R.bool() ? 3 : n - 12, ry = R.bool() ? 3 : n - 12;
      const water = []; for (let k = 0; k < 500 && water.length < 6; k++) { const x = R.int(4, n - 5), y = R.int(4, n - 5); if (H[y * n + x] < lvl - 0.12) water.push([x, y]); }
      let ship = water[0] ? { x: water[0][0], y: water[0][1] } : { x: n / 2, y: n / 2 }, wp = 1, target = water[1] || [n / 2, n / 2];
      const trail = [];
      return (t) => {
        for (const tp of g.input.taps()) { const x = tp.x * n, y = tp.y * n; if (H[(y | 0) * n + (x | 0)] < lvl) target = [x, y]; }
        d.set(bg);
        for (const p of sound) digits(g, p.v, p.x, p.y, mix(ink, deep, 0.25));
        K.blit(g, ROSE, rx, ry, { i: ink, r: red, k: deep });
        // the lighthouse sweeps a sector of light
        const la = t * 0.9;
        for (let r = 2; r < 9 * s; r++) for (let k = -2; k <= 2; k++) { const a = la + k * 0.05; const x = Math.round(light[0] + Math.cos(a) * r), y = Math.round(light[1] + Math.sin(a) * r); if (x >= 0 && y >= 0 && x < n && y < n && H[y * n + x] < lvl) d[y * n + x] = mix(d[y * n + x], K.hx('#fff2a0'), 0.55); }
        rect(g, light[0] - 1, light[1] - 1, 3, 3, red); put(g, light[0], light[1], K.hx('#fff2a0'));
        // the ship heads for its target, leaving a pencil line
        const dx = target[0] - ship.x, dy = target[1] - ship.y, dd = Math.hypot(dx, dy);
        if (dd < 1.5) { wp = (wp + 1) % water.length; target = water[wp] || target; }
        else { const nx = ship.x + dx / dd * 0.12 * s, ny = ship.y + dy / dd * 0.12 * s; if (H[(ny | 0) * n + (nx | 0)] < lvl) { ship.x = nx; ship.y = ny; } else { wp = (wp + 1) % water.length; target = water[wp] || target; } }
        if ((t * 4 | 0) !== (trail.lastT || -1)) { trail.push([ship.x, ship.y]); trail.lastT = t * 4 | 0; if (trail.length > 60) trail.shift(); }
        for (let k = 0; k < trail.length; k += 2) put(g, trail[k][0], trail[k][1], mix(ink, deep, 0.3));
        for (let q = 0; q < dd; q += 3) put(g, ship.x + dx / dd * q, ship.y + dy / dd * q, mix(red, deep, 0.4));
        // the ship: a hull pointing where it is going, a white sail and its wake
        { const sx = Math.round(ship.x), sy = Math.round(ship.y), fd = dx >= 0 ? 1 : -1;
          put(g, sx - fd * 2, sy + 1, mix(deep, WHITE, 0.6)); put(g, sx - fd * 3, sy + 1, mix(deep, ink, 0.15));
          rect(g, sx - 1, sy, 3, 1, ink); put(g, sx + fd * 2, sy, ink); put(g, sx, sy + 1, ink); put(g, sx - fd, sy + 1, ink);
          put(g, sx, sy - 1, ink); put(g, sx, sy - 2, ink); put(g, sx - fd, sy - 1, WHITE); put(g, sx - fd, sy - 2, WHITE); }
        line(g, target[0] - 1, target[1] - 1, target[0] + 1, target[1] + 1, red); line(g, target[0] - 1, target[1] + 1, target[0] + 1, target[1] - 1, red);
      };
    },
  });

  add({
    name: 'Fog of War', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Click a seen floor cell and the explorer walks there.',
    recipe: 'A dungeon minimap that starts black. An explorer heads for the nearest unknown edge each time, lighting what it can see; rooms, treasure and lurking things are remembered dimly behind it until the level is clear.',
    make(R, U, g) {
      const { n, d } = g;
      let map, seen, lit, items, px, py, path, trail, level = 0, doneAt = -1;
      const FWi = ogLook(g) ? -1 : g.alt.pick([0, 1, 2]), FW = FWi < 0 ? [rgb(150, 128, 96), rgb(52, 46, 44), rgb(214, 196, 160), rgb(96, 88, 80)] : [['#5a8a5a', '#1e2e22', '#a8d0a0', '#3e5a44'], ['#7a9ac8', '#1e2638', '#d0e0ff', '#4a5a78'], ['#c8603a', '#3a1a14', '#ffb07a', '#7a3a2a']][FWi].map(K.hx);
      T(g, 'Dungeon', ['Sandstone', 'Mossy', 'Frozen', 'Lava'][FWi + 1]);
      // new traits: the floor plan (a few great halls, rooms, or a warren of cells) and how far the explorer sees
      const plan = T(g, 'Plan', alt(g, 'Rooms', [['Rooms', 3], ['Great Halls', 1], ['Warren', 1]])), torch = T(g, 'Light', alt(g, 'Torch', [['Torch', 3], ['Candle', 1], ['Lantern', 1]])); T(g, 'Grid', n);
      const PL = { Rooms: [9, 7, 8, 5, 4], 'Great Halls': [15, 4.5, 5.5, Math.round(n / 9), Math.round(n / 10)], Warren: [6, 10, 11, 4, 3] }[plan];
      // and what the unexplored map is: black fog, blank vellum, or blueprint squares
      const fog = T(g, 'Unknown', alt(g, 'Black', [['Black', 3], ['Vellum', 1], ['Blueprint', 1]])), FOG = { Black: [0xff000000, 0xff000000], Vellum: [rgb(214, 198, 160), rgb(196, 178, 138)], Blueprint: [rgb(20, 40, 72), rgb(34, 58, 96)] }[fog];
      const fogAt = (x, y) => fog === 'Vellum' ? ((x + y) % 5 === 0 ? FOG[1] : FOG[0]) : fog === 'Blueprint' ? (x % 5 === 0 || y % 5 === 0 ? FOG[1] : FOG[0]) : FOG[0];
      function build() {
        map = new Uint8Array(n * n); seen = new Uint8Array(n * n); lit = new Uint8Array(n * n); items = []; trail = []; path = [];
        const rooms = [];
        for (let k = 0; k < 120 && rooms.length < Math.round(n / PL[0]); k++) {
          const w = R.int(PL[3], Math.round(n / PL[1])), h = R.int(PL[4], Math.round(n / PL[2])), x = R.int(2, n - w - 3), y = R.int(6, n - h - 3);
          if (rooms.some(r => x < r.x + r.w + 2 && x + w + 2 > r.x && y < r.y + r.h + 2 && y + h + 2 > r.y)) continue;
          rooms.push({ x, y, w, h, cx: x + (w >> 1), cy: y + (h >> 1) });
        }
        rooms.sort((a, b) => a.cx - b.cx);
        for (const r of rooms) for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) map[y * n + x] = 1;
        const carve = (a, b) => {
          let x = a.cx, y = a.cy;
          const hFirst = R.bool();
          const go = (tx, ty) => { while (x !== tx) { x += Math.sign(tx - x); map[y * n + x] = 1; } while (y !== ty) { y += Math.sign(ty - y); map[y * n + x] = 1; } };
          if (hFirst) { go(b.cx, y); go(b.cx, b.cy); } else { go(x, b.cy); go(b.cx, b.cy); }
        };
        for (let i = 1; i < rooms.length; i++) carve(rooms[i - 1], rooms[i]);
        for (let k = 0; k < 2 && rooms.length > 3; k++) carve(R.pick(rooms), R.pick(rooms));
        for (const r of rooms.slice(1)) if (R() < 0.7) items.push({ x: R.int(r.x, r.x + r.w - 1), y: R.int(r.y, r.y + r.h - 1), kind: R() < 0.55 ? 'gold' : 'foe', got: false });
        px = rooms[0].cx; py = rooms[0].cy; level++; doneAt = -1;
      }
      function look() {
        lit.fill(0);
        const rv = Math.round(n / { Torch: 11, Candle: 15, Lantern: 8 }[torch]);
        for (let a = 0; a < 96; a++) {
          const ex = px + Math.cos(a / 96 * Math.PI * 2) * rv, ey = py + Math.sin(a / 96 * Math.PI * 2) * rv;
          let stop = false;
          line(g, px, py, ex, ey, (x, y) => {
            if (stop || x < 0 || y < 0 || x >= n || y >= n) { stop = true; return; }
            const i = y * n + x; seen[i] = 1; lit[i] = 1;
            if (!map[i]) stop = true;
          });
        }
      }
      function frontier() {
        const prev = new Int32Array(n * n).fill(-1), q = [py * n + px];
        prev[q[0]] = q[0];
        for (let h = 0; h < q.length; h++) {
          const i = q[h], x = i % n, y = (i / n) | 0;
          let edge = false;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const j = (y + dy) * n + x + dx; if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < n && !seen[j]) edge = true; }
          if (edge && h > 0) { const out = []; let k = i; while (k !== q[0]) { out.push(k); k = prev[k]; } return out.reverse(); }
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const x2 = x + dx, y2 = y + dy, j = y2 * n + x2;
            if (x2 < 0 || y2 < 0 || x2 >= n || y2 >= n || !map[j] || prev[j] >= 0) continue;
            prev[j] = i; q.push(j);
          }
        }
        return null;
      }
      build(); look();
      const [floorL, floorD, wallL, wallD] = FW;
      function pathTo(goal) {
        const prev = new Int32Array(n * n).fill(-1), q = [py * n + px]; prev[q[0]] = q[0];
        for (let h = 0; h < q.length; h++) {
          const i = q[h]; if (i === goal) { const out = []; let k = i; while (k !== q[0]) { out.push(k); k = prev[k]; } return out.reverse(); }
          const x = i % n, y = (i / n) | 0;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x2 = x + dx, y2 = y + dy, j = y2 * n + x2; if (x2 < 0 || y2 < 0 || x2 >= n || y2 >= n || !map[j] || prev[j] >= 0) continue; prev[j] = i; q.push(j); }
        }
        return null;
      }
      function explore(t, steps) {
        for (let s = 0; s < steps; s++) {
          if (doneAt >= 0) break;
          if (!path || !path.length) { path = frontier(); if (!path) { doneAt = t; break; } }
          const i = path.shift(); px = i % n; py = (i / n) | 0;
          trail.push(i); if (trail.length > 40) trail.shift();
          for (const it of items) if (!it.got && it.x === px && it.y === py) it.got = true;
          look();
        }
      }
      // the first level opens a little way in, so the first frame already shows a few rooms
      explore(0, Math.round(n * 0.5));
      return (t) => {
        // only the last click of a frame counts (a burst of replayed clicks costs one search)
        let goal = -1;
        for (const tp of g.input.taps()) { const j = Math.floor(Math.min(0.999, tp.y) * n) * n + Math.floor(Math.min(0.999, tp.x) * n); if (map[j] && seen[j]) goal = j; }
        if (goal >= 0) { const p = pathTo(goal); if (p) path = p; }
        explore(t, 2);
        if (doneAt >= 0 && t - doneAt > 4) { build(); look(); }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (!seen[i]) { d[i] = fogAt(x, y); continue; }
          if (map[i]) d[i] = lit[i] ? (Math.hypot(x - px, y - py) > n / 16 && X.dith4(x, y) < 0.4 ? X.mixPk(floorL, floorD, 0.5) : floorL) : floorD;
          else {
            let edge = false;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) { const x2 = x + dx, y2 = y + dy; if (x2 >= 0 && y2 >= 0 && x2 < n && y2 < n && map[y2 * n + x2]) edge = true; }
            d[i] = edge ? (lit[i] ? wallL : wallD) : fogAt(x, y);
          }
        }
        trail.forEach((i, k) => { if (k % 2 === 0) d[i] = X.mixPk(floorD, rgb(240, 200, 80), 0.25 + 0.4 * k / trail.length); });
        for (const it of items) {
          if (!seen[it.y * n + it.x] || it.got) continue;
          const c = it.kind === 'gold' ? rgb(250, 210, 40) : (Math.floor(t * 3) % 2 ? rgb(230, 50, 50) : rgb(150, 30, 40));
          put(g, it.x, it.y, c);
        }
        put(g, px, py, Math.floor(t * 4) % 2 ? WHITE : rgb(255, 230, 90));
        text(g, 'LV' + level, 2, 2, fog === 'Vellum' ? rgb(60, 40, 24) : rgb(220, 210, 180));
        if (doneAt >= 0) text(g, 'CLEAR', (n - X.textWidth('CLEAR')) >> 1, n >> 1, rgb(255, 230, 90));
      };
    },
  });

  add({
    name: 'Isochrone', seed: 1, sizes: [100, 200], fps: 12,
    interactive: 'Click a street to start the clock from there.',
    recipe: 'A city of streets, blocks, parks and a river crossed by a few bridges. Travel time spreads from one doorstep, fast along the roads and slow through the blocks, painted as hue bands cut by hard black lines.',
    make(R, U, g) {
      const { n, d } = g, cost = new Float32Array(n * n), kind = new Uint8Array(n * n), T = new Float32Array(n * n), col = new Uint32Array(n * n);
      const roads = [];
      for (let p = R.int(2, 6); p < n; p += R.int(6, 12)) roads.push(p);
      const rows = [];
      for (let p = R.int(2, 6); p < n; p += R.int(6, 12)) rows.push(p);
      const ry = n * R.range(0.45, 0.65), ra = n * R.range(0.06, 0.12), rf = R.range(2, 4) * TAU / n, rp = R() * TAU, rw = Math.max(2, n / 30);
      const parks = Array.from({ length: R.int(1, 3) }, () => [R.int(0, n - 20), R.int(0, n - 20), R.int(10, 22), R.int(8, 18)]);
      const bridged = roads.filter(() => R() < 0.4).concat([R.pick(roads)]), diag = R.bool(0.7), dk = R.range(-0.6, 0.6), d0 = R.range(0.2, 0.8) * n;
      g.trait('Avenue', diag ? 'Diagonal' : 'None'); g.trait('Parks', parks.length);
      // new traits: the colours the time bands run through, and the river (none, the usual, or a wide one)
      const pal = g.trait('Palette', alt(g, 'Spectrum', [['Spectrum', 3], ['Heat', 1], ['Tide', 1], ['Neon', 0.8], ['Mono', 0.6]])), riv = g.trait('River', alt(g, 'River', [['River', 3], ['Broad River', 1], ['No River', 0.8]])); g.trait('Grid', n);
      const rwv = riv === 'Broad River' ? rw * 1.9 : rw, STOPS = { Heat: ['#3a0a12', '#a8201a', '#f0702a', '#ffd23a', '#fff4c0'], Tide: ['#0a2a4a', '#1a6a8a', '#3ab0b0', '#a8e8d0', '#f0fff8'], Neon: ['#7700a6', '#fe00fe', '#defe47', '#00b3fe', '#0016ee'], Mono: ['#2a2a34', '#6a6a7a', '#b0b0bc', '#f0f0f4'] }[pal];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x;
        let k = 1; // block
        if (parks.some(([a, b, w, h]) => x >= a && x < a + w && y >= b && y < b + h)) k = 2;
        if (roads.includes(x) || rows.includes(y) || (diag && Math.abs(y - (d0 + (x - n / 2) * dk)) < 0.8)) k = 3;
        if (riv !== 'No River' && Math.abs(y - (ry + ra * Math.sin(x * rf + rp))) < rwv) k = bridged.includes(x) ? 5 : 4;
        kind[i] = k; cost[i] = [0, 5, 2.4, 1, Infinity, 1.2][k];
      }
      // bridges stay passable everywhere along a chosen road
      const SH = X.hsbPk, base = [0, rgb(30, 30, 36), rgb(26, 44, 30), rgb(62, 62, 72), rgb(18, 34, 60), rgb(90, 80, 70)];
      let born = -99, maxT = 1, h0 = R.range(0, 100), band = 1, lut;
      let HK = new Float64Array(4096), HV = new Int32Array(4096);
      // rng: R for the original timing; a click re-solves with g.alt so it never draws from R
      function solve(o, rng = R) {
        if (o === undefined) for (let k = 0; k < 200; k++) { o = R.int(0, n * n - 1); if (kind[o] === 3) break; }
        T.fill(Infinity); T[o] = 0;
        // a binary heap in typed arrays (no allocation per push), same shortest times as before
        let hn = 0;
        const push = (k, v) => { if (hn >= HK.length) { const k2 = new Float64Array(HK.length * 2), v2 = new Int32Array(HK.length * 2); k2.set(HK); v2.set(HV); HK = k2; HV = v2; } let i = hn++; while (i > 0) { const p = (i - 1) >> 1; if (HK[p] <= k) break; HK[i] = HK[p]; HV[i] = HV[p]; i = p; } HK[i] = k; HV[i] = v; };
        let popK = 0;
        const pop = () => { const top = HV[0]; popK = HK[0]; const k = HK[--hn], v = HV[hn]; let i = 0; for (;;) { const l = 2 * i + 1; if (l >= hn) break; const m = l + 1 < hn && HK[l + 1] < HK[l] ? l + 1 : l; if (HK[m] >= k) break; HK[i] = HK[m]; HV[i] = HV[m]; i = m; } HK[i] = k; HV[i] = v; return top; };
        push(0, o);
        maxT = 0;
        while (hn) {
          const i = pop(), tt = popK;
          if (tt > T[i]) continue;
          maxT = Math.max(maxT, tt);
          const x = i % n, y = (i / n) | 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const x2 = x + dx, y2 = y + dy;
            if (x2 < 0 || y2 < 0 || x2 >= n || y2 >= n) continue;
            const j = y2 * n + x2, c = (cost[i] + cost[j]) * 0.5 * (dx && dy ? 1.414 : 1), nt = tt + c;
            if (nt < T[j]) { T[j] = nt; push(nt, j); }
          }
        }
        h0 = (h0 + rng.range(20, 50)) % 100; band = maxT / rng.int(9, 15);
        lut = STOPS ? Array.from({ length: 64 }, (_, k) => { const c = U.pk(U.ramp(STOPS.map(U.hex), (h0 / 100 + k * 0.09) % 1, true)); return [c, shade(c, 0.62)]; }) : Array.from({ length: 64 }, (_, k) => [SH(h0 + k * 7, 80, 95), SH(h0 + k * 7, 85, 62)]);
        for (let i = 0; i < n * n; i++) {
          const tt = T[i];
          if (tt === Infinity) { col[i] = base[kind[i]] || 0xff000000; continue; }
          const b = Math.floor(tt / band), f = tt / band - b;
          col[i] = f < 0.1 ? 0xff000000 : lut[b % 64][kind[i] === 3 || kind[i] === 5 ? 0 : 1];
        }
        return o;
      }
      let origin;
      return (t) => {
        // the nearest street cell to the click; of a burst of clicks only the last one is solved
        let pick = -1;
        for (const tp of g.input.taps()) {
          const cx = Math.floor(tp.x * n), cy = Math.floor(tp.y * n);
          let best = -1, bd = 1e9;
          for (let y = Math.max(0, cy - 8); y < Math.min(n, cy + 9); y++) for (let x = Math.max(0, cx - 8); x < Math.min(n, cx + 9); x++) if (kind[y * n + x] === 3) { const dd = (x - cx) ** 2 + (y - cy) ** 2; if (dd < bd) { bd = dd; best = y * n + x; } }
          if (best >= 0) pick = best;
        }
        if (pick >= 0) { origin = solve(pick, g.alt); born = t; }
        // the first clock opens a few seconds in, so the first frame already shows the spread
        if (t - born > 19) { const first = born < -50; origin = solve(); born = first ? t - 3.5 : t; }
        const now = (t - born) / 14 * maxT;
        const glow = band * 0.25;
        for (let i = 0; i < n * n; i++) {
          const tt = T[i];
          d[i] = tt > now ? (base[kind[i]] || 0xff000000) : now - tt < glow && col[i] !== 0xff000000 ? WHITE : col[i];
        }
        const ox = origin % n, oy = (origin / n) | 0, s = Math.floor(t * 3) % 2 ? 3 : 2;
        rect(g, ox - s + 1, oy - s + 1, 2 * s - 1, 2 * s - 1, WHITE);
        if (t - born > 18) U.fadePx(d, 1 - (t - born - 18));
      };
    },
  });

  add({
    name: 'Train Graph', seed: 0, sizes: [100, 200], fps: 12,
    recipe: 'A timetable drawn as a Marey chart: stations down the side, time running right. Locals stair-step through every stop, expresses cut steep lines and freight crawls; the chart scrolls past a bright line marking now.',
    make(R, U, g) {
      const { n, d } = g, S = R.int(8, 12), big = n >= 200, left = big ? 22 : 6, top = Math.round(n * 0.1), bot = Math.round(n * 0.94);
      const gaps = Array.from({ length: S - 1 }, () => R.range(0.5, 1.6)), tot = gaps.reduce((a, b) => a + b, 0);
      const sy = [top]; gaps.forEach(gp => sy.push(sy[sy.length - 1] + gp / tot * (bot - top)));
      const pal = R.pick([
        { bg: rgb(240, 236, 224), grid: rgb(214, 208, 192), hour: rgb(180, 170, 150), ink: rgb(60, 50, 40), kinds: [rgb(30, 60, 160), rgb(200, 40, 30), rgb(40, 110, 50)] },
        { bg: rgb(20, 24, 34), grid: rgb(40, 46, 60), hour: rgb(70, 80, 100), ink: rgb(200, 200, 210), kinds: [rgb(90, 170, 255), rgb(255, 90, 80), rgb(150, 220, 120)] },
      ]), EXTRA = [
        { bg: rgb(26, 58, 122), grid: rgb(40, 76, 144), hour: rgb(90, 130, 200), ink: rgb(230, 240, 255), kinds: [rgb(255, 255, 255), rgb(255, 210, 60), rgb(120, 220, 255)] },
        { bg: rgb(8, 6, 2), grid: rgb(40, 26, 6), hour: rgb(90, 60, 14), ink: rgb(255, 176, 42), kinds: [rgb(255, 176, 42), rgb(255, 230, 140), rgb(200, 110, 20)] },
      ];
      const paperNm = pal.bg === rgb(240, 236, 224) ? 'Paper' : 'Night';
      if (!ogLook(g)) { const e = g.alt.pick([0, 1]); Object.assign(pal, EXTRA[e]); T(g, 'Timetable', ['Blueprint', 'Amber Screen'][e]); } else T(g, 'Timetable', paperNm);
      T(g, 'Stations', S);
      // new trait: the kind of service on the line (the mix of locals, expresses and freight, and how often they run)
      const service = T(g, 'Service', alt(g, 'Mixed', [['Mixed', 3], ['Express Line', 1], ['Freight', 1], ['Commuter', 1]])), SV = { Mixed: [0.5, 0.7, 3, 9], 'Express Line': [0.25, 0.92, 4, 9], Freight: [0.3, 0.25, 4, 10], Commuter: [0.86, 0.85, 2.5, 6] }[service]; T(g, 'Grid', n);
      const names = Array.from({ length: S }, () => { const C = 'BCDFGHKLMNPRSTVW', V = 'AEIOU'; return C[R.int(0, 15)] + V[R.int(0, 4)] + C[R.int(0, 15)]; });
      const span = 90, kx = (n - left - 2) / span;
      const trains = [];
      let nextDep = -span, flip = 0;
      function make(dep) {
        const kind = R() < SV[0] ? 0 : R() < SV[1] ? 1 : 2, down = (flip++ + R.int(0, 1)) % 2 === 0;
        const speed = [1.3, 2.4, 0.8][kind], dwell = [2, 0, 4][kind];
        const order = down ? [...Array(S).keys()] : [...Array(S).keys()].reverse(), pts = [[dep, sy[order[0]]]];
        let tt = dep;
        for (let k = 1; k < S; k++) {
          const a = sy[order[k - 1]], b = sy[order[k]];
          tt += Math.abs(b - a) / (bot - top) * 60 / speed;
          pts.push([tt, b]);
          const stops = kind === 0 || (kind === 1 && k % 3 === 0) || (kind === 2 && R() < 0.25);
          if (stops && k < S - 1) { tt += kind === 2 ? R.range(3, 9) : dwell; pts.push([tt, b]); }
        }
        return { kind, pts, end: tt };
      }
      return (t) => {
        const t0 = t * 1.6, now = t0 + span * 0.72;
        while (nextDep < t0 + span) { trains.push(make(nextDep)); nextDep += R.range(SV[2], SV[3]); }
        for (let k = trains.length - 1; k >= 0; k--) if (trains[k].end < t0) trains.splice(k, 1);
        d.fill(pal.bg);
        for (const y of sy) for (let x = left; x < n; x++) put(g, x, y, pal.grid);
        for (let m = Math.ceil(t0 / 10) * 10; m < t0 + span; m += 10) {
          const x = left + (m - t0) * kx, hour = m % 60 === 0;
          for (let y = top - 2; y <= bot; y += hour ? 1 : 2) put(g, x, y, hour ? pal.hour : pal.grid);
          if (hour) digits(g, (m / 60 | 0) % 24, x + 2, top - 7, pal.hour);
        }
        const X2 = tm => left + (tm - t0) * kx;
        for (const tr of trains) {
          const c = pal.kinds[tr.kind];
          for (let k = 1; k < tr.pts.length; k++) {
            const [ta, ya] = tr.pts[k - 1], [tb, yb] = tr.pts[k];
            if (tb < t0 || ta > t0 + span) continue;
            line(g, X2(ta), ya, X2(tb), yb, (x, y, i) => { if (x < left || x >= n) return; const fut = (x - left) / kx + t0 > now; if (!fut || i % 3 === 0) put(g, x, y, fut ? X.mixPk(c, pal.bg, 0.3) : c); });
          }
          // where each train is now
          for (let k = 1; k < tr.pts.length; k++) {
            const [ta, ya] = tr.pts[k - 1], [tb, yb] = tr.pts[k];
            if (now >= ta && now <= tb) { const y = ya + (yb - ya) * ((now - ta) / ((tb - ta) || 1)); rect(g, X2(now) - 1, y - 1, 3, 3, c); put(g, X2(now), y, WHITE); }
          }
        }
        const nx = Math.round(X2(now));
        for (let y = top - 2; y <= bot + 1; y++) put(g, nx, y, X.mixPk(pal.ink, pal.bg, 0.2));
        rect(g, 0, 0, left, n, pal.bg);
        for (let k = 0; k < S; k++) { if (big) text(g, names[k], 2, sy[k] - 3, pal.ink); else rect(g, 2, sy[k] - 1, 3, 3, pal.ink); }
      };
    },
  });

  add({
    name: 'Strip Map', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'An old road-book strip map that never ends: one road climbs the scroll past towns with red churches, bridges over rivers, woods, hills drawn in hachures and numbered milestones, all in ink on parchment.',
    make(R, U, g) {
      const { n, d } = g, k = Math.max(1, Math.round(n / 100)), a = Math.round(n * 0.2), b = Math.round(n * 0.8), cx = (a + b) / 2;
      const parch = rgb(236, 220, 180), parch2 = rgb(226, 206, 160), ink = rgb(70, 50, 30), red = rgb(170, 50, 40), blue = rgb(80, 120, 170), green = rgb(100, 124, 60);
      const f1 = R.range(0.02, 0.04), f2 = R.range(0.006, 0.012), p1 = R() * TAU, p2 = R() * TAU, A1 = n * 0.05, A2 = n * 0.12;
      const roadX = yw => cx + A1 * Math.sin(yw * f1 + p1) + A2 * Math.sin(yw * f2 + p2);
      const chunks = new Map(), CH = 40;
      const margin = Array.from({ length: 8 }, (_, y) => Uint32Array.from({ length: n }, (_, x) => (x < a - 2 || x > b + 2) && X.dith8(x, y) < 0.12 ? parch2 : parch));
      function chunk(c) {
        if (chunks.has(c)) return chunks.get(c);
        const fs = [], y0 = c * CH;
        const kind = R.pick(['town', 'river', 'wood', 'hill', 'branch', 'town', 'wood']);
        const y = y0 + R.int(8, CH - 8);
        if (kind === 'town') { const m = R.int(4, 8); for (let q = 0; q < m; q++) fs.push({ k: 'house', y: y + R.int(-6, 6), dx: R.sign() * R.int(4, 14) * k }); fs.push({ k: 'church', y, dx: R.sign() * R.int(5, 10) * k }); }
        if (kind === 'river') fs.push({ k: 'river', y, ph: R() * TAU });
        if (kind === 'wood') { const s = R.sign(), m = R.int(5, 10); for (let q = 0; q < m; q++) fs.push({ k: 'tree', y: y + R.int(-7, 7), dx: s * R.int(5, 20) * k }); }
        if (kind === 'hill') fs.push({ k: 'hill', y, dx: R.sign() * R.int(8, 16) * k, w: R.int(6, 12) * k });
        if (kind === 'branch') fs.push({ k: 'branch', y, s: R.sign() });
        chunks.set(c, fs);
        return fs;
      }
      return (t) => {
        const s = t * 2.2 * k, Y = yw => Math.round(s + n - yw);
        const sf = Math.floor(s);
        for (let y = 0; y < n; y++) d.set(margin[(y + sf) & 7], y * n);
        const c0 = Math.floor(s / CH) - 1, c1 = Math.floor((s + n) / CH) + 1;
        for (const c of [...chunks.keys()]) if (c < c0 - 2) chunks.delete(c);
        for (let c = c0; c <= c1; c++) for (const f of chunk(c)) {
          const y = Y(f.y), rx = roadX(f.y);
          if (f.k === 'river') { for (let x = a; x <= b; x++) { const yy = y + Math.round(2 * k * Math.sin(x * 0.15 + f.ph)); rect(g, x, yy, 1, 2 * k, blue); } }
          else if (f.k === 'house') { const x = rx + f.dx; if (x > a + 2 && x < b - 4) { rect(g, x, y, 3 * k, 2 * k, ink); put(g, x + k, y - k, red); rect(g, x, y - k, 3 * k, k, red); } }
          else if (f.k === 'church') { const x = rx + f.dx; if (x > a + 2 && x < b - 4) { rect(g, x, y, 4 * k, 3 * k, red); rect(g, x + k, y - 4 * k, k, 4 * k, ink); put(g, x + k, y - 5 * k, ink); } }
          else if (f.k === 'tree') { const x = rx + f.dx; if (x > a + 2 && x < b - 3) { disc(g, x + k, y, 1.6 * k, green); put(g, x + k, y + 2 * k, ink); } }
          else if (f.k === 'hill') { const x0 = rx + f.dx; for (let q = -f.w; q <= f.w; q++) { const h = Math.round((1 - (q / f.w) ** 2) * 4 * k), x = x0 + q; if (x > a && x < b && q % 2 === 0) for (let j = 0; j < h; j++) put(g, x, y - j, ink); } }
          else if (f.k === 'branch') { line(g, rx, y, f.s > 0 ? b : a, y - 14 * k, (x, yy, i) => { if (i % 3 < 2) put(g, x, yy, ink); }); }
        }
        // the road: a double line, with milestones
        for (let y = 0; y < n; y++) {
          const yw = s + n - y, x = Math.round(roadX(yw));
          put(g, x - k - 1, y, ink); put(g, x + k + 1, y, ink);
          for (let q = -k; q <= k; q++) put(g, x + q, y, parch);
        }
        const mile = 20 * k;
        for (let m = Math.ceil(s / mile) * mile; m < s + n; m += mile) { const y = Y(m), x = Math.round(roadX(m)); digits(g, Math.round(m / mile), x + 3 * k, y - 2, red); put(g, x + k + 2, y, red); }
        for (const x of [a - 2, a, b, b + 2]) for (let y = 0; y < n; y++) put(g, x, y, ink);
        // compass in the margin
        const qx = Math.round(b + (n - b) / 2), qy = Math.round(n * 0.12);
        line(g, qx, qy - 5 * k, qx, qy + 5 * k, ink); line(g, qx - 3 * k, qy, qx + 3 * k, qy, ink); rect(g, qx - k, qy - 6 * k, 2 * k + 1, 2 * k, red);
      };
    },
  });
})();
