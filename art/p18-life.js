// Set 2 · Life: cellular automata on a wrapping grid, one cell per pixel.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  // live-neighbour counts on a torus (Moore neighbourhood)
  function count8(a, n, out) {
    for (let y = 0; y < n; y++) {
      const up = ((y + n - 1) % n) * n, mid = y * n, dn = ((y + 1) % n) * n;
      for (let x = 0; x < n; x++) {
        const l = (x + n - 1) % n, r = (x + 1) % n;
        out[mid + x] = a[up + l] + a[up + x] + a[up + r] + a[mid + l] + a[mid + r] + a[dn + l] + a[dn + x] + a[dn + r];
      }
    }
  }
  const bits = list => list.reduce((m, v) => m | 1 << v, 0);
  // the viewer draws live cells where they press (the grid wraps); a tap draws the same mark,
  // so the touches a variation remembers replay as marks for the next visitor
  function draw(g, arr, v = 1) {
    const inp = g.input, n = g.n;
    const mark = (px, py) => { const cx = Math.floor(px * n), cy = Math.floor(py * n); for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) arr[((cy + y + n) % n) * n + (cx + x + n) % n] = v; };
    for (const tap of inp.taps()) mark(tap.x, tap.y);
    if (inp.down) mark(inp.x, inp.y);
  }
  // how a board starts, for the variations that don't open on plain soup: a soup mirrored four ways,
  // a few islands of soup, or a scatter of methuselahs (small shapes that churn for hundreds of steps)
  const SHAPES = { r: [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]], acorn: [[1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]], pi: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
  function start(kind, a, n, rnd, p = 0.33, v = 1) {
    const at = (x, y) => ((y % n + n) % n) * n + (x % n + n) % n;
    a.fill(0);
    if (kind === 'Mirrored') { const h = n >> 1; for (let y = 0; y < h; y++) for (let x = 0; x < h; x++) if (rnd() < p * (Math.hypot(x - h, y - h) < h * 0.85 ? 1 : 0.15)) { a[at(x, y)] = v; a[at(n - 1 - x, y)] = v; a[at(x, n - 1 - y)] = v; a[at(n - 1 - x, n - 1 - y)] = v; } }
    else if (kind === 'Islands') for (let k = 0; k < 5; k++) { const cx = Math.floor(rnd() * n), cy = Math.floor(rnd() * n), r = Math.round(n * (0.07 + rnd() * 0.06)); for (let y = -r; y < r; y++) for (let x = -r; x < r; x++) if (x * x + y * y < r * r && rnd() < p + 0.05) a[at(cx + x, cy + y)] = v; }
    else { const names = Object.keys(SHAPES); for (let k = 0; k < 8; k++) { const sh = SHAPES[names[k % names.length]], cx = Math.floor(rnd() * n), cy = Math.floor(rnd() * n), fl = rnd() < 0.5; for (const [x, y] of sh) a[at(cx + (fl ? -x : x), cy + y)] = v; } }
  }
  const VG = () => U.X.VG;
  // runs a few steps before the first frame, so a piece opens on a grown pattern instead of raw noise
  function warm(frame, k) { for (let i = 0; i < k; i++) frame(0, 0.1, i, true); }

  P.addPixel({
    name: 'Life Echo', seed: 1, fam: 'Life', sizes: [80, 100], fps: 10,
    interactive: 'Press and drag to draw live cells.',
    recipe: 'Conway’s Game of Life, with every cell that dies leaving a fading echo of the colour it had, so each glider drags a comet tail.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, cols = U.X.VG.inksN(R, 6, 0.45), a = new Uint8Array(N), c = new Uint8Array(N), age = new Uint16Array(N), echo = new Float32Array(N), last = new Uint8Array(N);
      const fade = R.range(0.86, 0.93), ground = R.bool(0.3) ? X.shade(cols[0], 0.1) : BLACK;
      const tails = cols.map(col => Array.from({ length: 16 }, (_, k) => X.mixPk(ground, col, Math.pow(k / 15, 1.4) * 0.8)));
      const soup = (cx, cy, r, p) => { for (let y = -r; y < r; y++) for (let x = -r; x < r; x++) if (R() < p) a[((cy + y + n) % n) * n + (cx + x + n) % n] = 1; };
      soup(n >> 1, n >> 1, n >> 1, 0.33);
      g.trait('Palette', cols.name); g.trait('Grid', n); g.trait('Echo', fade < 0.895 ? 'Short' : 'Long');
      // how the board starts, and whether the colour tells a cell's age or where it is
      const st = VG().pick(g, 'Start', 'Soup', ['Soup', 'Soup', 'Mirrored', 'Islands', 'Methuselahs']), colour = VG().pick(g, 'Colour', 'By age', ['By age', 'By age', 'By region']);
      if (st !== 'Soup') start(st, a, n, g.alt);
      const REG = new Uint8Array(N);
      if (colour === 'By region') { const ph = g.alt.range(0, 6); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) REG[y * n + x] = Math.floor((Math.sin(x / n * U.TAU + ph) + Math.sin(y / n * U.TAU * 2 - ph) + 2) / 4 * cols.length * 0.999); }
      let quiet = 0, pop0 = 0;
      const frame = (t, dt, f, cold) => {
        if (!cold) draw(g, a);
        count8(a, n, c);
        let pop = 0;
        for (let i = 0; i < N; i++) {
          const k = c[i], alive = a[i] ? k === 2 || k === 3 : k === 3;
          if (a[i] && !alive) { echo[i] = 1; last[i] = colour === 'By region' ? REG[i] : Math.min(cols.length - 1, age[i] >> 2); }
          a[i] = alive ? 1 : 0;
          age[i] = alive ? Math.min(age[i] + 1, 999) : 0;
          if (!alive) echo[i] *= fade;
          pop += a[i];
        }
        quiet = Math.abs(pop - pop0) < 3 ? quiet + 1 : 0; pop0 = pop;
        // a board gone quiet gets a good-sized patch of fresh soup, so the glider traffic never dies down to ash
        if (quiet > 30 || pop < N * (st === 'Methuselahs' ? 0.004 : 0.04)) { soup(R.int(0, n - 1), R.int(0, n - 1), R.int(10, Math.round(n / 4)), 0.4); quiet = 0; }
        for (let i = 0; i < N; i++) d[i] = a[i] ? X.mixPk(cols[colour === 'By region' ? REG[i] : Math.min(cols.length - 1, age[i] >> 2)], 0xffffffff, age[i] < 2 ? 0.5 : 0) : tails[last[i]][Math.floor(echo[i] * 15)];
      };
      warm(frame, 36);
      return frame;
    },
  });

  P.addPixel({
    name: 'Brian’s Brain', seed: 2, fam: 'Life', sizes: [80, 100], fps: 10,
    interactive: 'Press and drag to draw live cells.',
    listens: 'Every clap fires a burst of sparks; a loud room keeps the brain busy.',
    recipe: 'Cells fire, then rest for one step, then are ready again, firing only when exactly two neighbours fire: a brain that never settles, full of travelling sparks.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, cols = X.VG.inksN(R, 4, 0.5), on = new Uint8Array(N), rest = new Uint8Array(N), c = new Uint8Array(N), glow = new Float32Array(N);
      for (let i = 0; i < N; i++) on[i] = R() < 0.12 ? 1 : 0;
      g.trait('Palette', cols.name); g.trait('Grid', n);
      // how the brain starts firing, how long a spark's afterglow lasts, and what it fires on (dark, a tinted ground, or paper)
      const st = X.VG.pick(g, 'Start', 'Static', ['Static', 'Static', 'Mirrored', 'Islands']), glowK = X.VG.pick(g, 'Afterglow', 'Short', ['Short', 'Short', 'Long', 'None']), field = X.VG.pick(g, 'Ground', 'Black', ['Black', 'Black', 'Tinted', 'Paper']);
      if (st !== 'Static') start(st, on, n, g.alt, 0.3);
      const GF = glowK === 'Long' ? 0.9 : glowK === 'None' ? 0.4 : 0.8, paper = field === 'Paper';
      const ground = field === 'Tinted' ? X.shade(cols[3 % cols.length], 0.16) : paper ? X.mixPk(WHITE, cols[3 % cols.length], 0.12) : BLACK;
      const hot = paper ? X.shade(cols[0], 0.45) : X.mixPk(cols[0], 0xffffffff, 0.3), warmC = paper ? X.mixPk(cols[1 % cols.length], ground, 0.35) : cols[1 % cols.length], trail = Array.from({ length: 12 }, (_, k) => X.mixPk(ground, paper ? X.shade(cols[2 % cols.length], 0.7) : cols[2 % cols.length], k / 11 * 0.55)), inp = g.input;
      const frame = (t, dt, f, cold) => {
        if (!cold) {
          draw(g, on);
          if (inp.listening) {
            // a clap is a ring of cells firing at once somewhere: it breaks into sparks that race outward
            const claps = Math.min(3, inp.beats());
            for (let c = 0; c < claps; c++) { const cx = g.alt.int(0, n - 1), cy = g.alt.int(0, n - 1), r = g.alt.range(3, 6); for (let k = 0; k < 40; k++) { const a = k / 40 * U.TAU, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); on[((y + n) % n) * n + (x + n) % n] = 1; } }
            for (let k = 0; k < inp.level * 6; k++) { const i = g.alt.int(0, N - 2); on[i] = on[i + 1] = 1; }
          }
        }
        count8(on, n, c);
        let pop = 0;
        for (let i = 0; i < N; i++) {
          const was = on[i];
          on[i] = !was && !rest[i] && c[i] === 2 ? 1 : 0;
          rest[i] = was;
          glow[i] = on[i] ? 1 : glow[i] * GF;
          pop += on[i];
        }
        if (pop < N * 0.01) for (let k = 0; k < 40; k++) on[R.int(0, N - 1)] = 1;
        for (let i = 0; i < N; i++) d[i] = on[i] ? hot : rest[i] ? warmC : trail[Math.floor(glow[i] * 11)];
      };
      warm(frame, 24);
      return frame;
    },
  });

  P.addPixel({
    name: 'Bugs', seed: 1, fam: 'Life', sizes: [80, 100], fps: 10,
    interactive: 'Press and drag to draw live cells.',
    recipe: 'Life with a reach of five cells instead of one: each cell counts a whole neighbourhood, and the survivors gather into soft-bodied creatures that crawl and divide.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, r = 5, a = new Uint8Array(N), m = n + 2 * r, SP = new Int32Array((m + 1) * (m + 1));
      const RULES = [[34, 45, 34, 58], [34, 45, 33, 57], [33, 46, 34, 58]], rule = R.pick(RULES), [b0, b1, s0, s1] = rule;
      for (let i = 0; i < N; i++) a[i] = R() < 0.5 ? 1 : 0;
      const inks = X.VG.inksN(R, 5, 0.45, true), ramp0 = X.rampPk(inks, 32);
      g.trait('Palette', inks.name); g.trait('Grid', n); g.trait('Strain', ['Crawlers', 'Grazers', 'Splitters'][RULES.indexOf(rule)]);
      // how the dish is seeded, how the creatures are drawn, and the dish itself
      const st = X.VG.pick(g, 'Start', 'Soup', ['Soup', 'Soup', 'Mirrored', 'Islands']), body = X.VG.pick(g, 'Bodies', 'Rimmed', ['Rimmed', 'Rimmed', 'Solid', 'Outlined']), dish = X.VG.pick(g, 'Dish', 'Black', ['Black', 'Black', 'Agar', 'Glass']);
      if (st !== 'Soup') start(st, a, n, g.alt, 0.5);
      const ground = dish === 'Agar' ? X.rgb(58, 46, 22) : dish === 'Glass' ? X.rgb(18, 30, 40) : BLACK, ramp = body === 'Solid' ? ramp0.map((c, k) => ramp0[Math.min(31, 10 + (k >> 2))]) : ramp0, rim = body === 'Outlined' ? ramp0[30] : X.shade(ramp0[8], 0.6);
      const dot = X.mixPk(ground, WHITE, 0.08);
      const sum = new Uint8Array(N);
      let still = 0, pop0 = 0;
      const frame = (t, dt, f, cold) => {
        if (!cold) draw(g, a);
        // neighbourhood sums from one summed table over the grid padded by its own wrap (no per-cell work beyond four lookups)
        for (let y = 0; y < m; y++) {
          let row = 0;
          const sy = (y - r + n) % n;
          for (let x = 0; x < m; x++) { row += a[sy * n + (x - r + n) % n]; SP[(y + 1) * (m + 1) + x + 1] = SP[y * (m + 1) + x + 1] + row; }
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const y1 = y + 2 * r + 1, x1 = x + 2 * r + 1;
          sum[y * n + x] = SP[y1 * (m + 1) + x1] - SP[y * (m + 1) + x1] - SP[y1 * (m + 1) + x] + SP[y * (m + 1) + x];
        }
        let pop = 0;
        for (let i = 0; i < N; i++) { const s = sum[i]; a[i] = a[i] ? (s >= s0 && s <= s1 ? 1 : 0) : (s >= b0 && s <= b1 ? 1 : 0); pop += a[i]; }
        if (pop < N * 0.03) for (let i = 0; i < N; i++) if (R() < 0.08) a[i] = 1;
        // creatures that have all settled into still rings get a stir of new life somewhere
        still = Math.abs(pop - pop0) < N * 0.002 ? still + 1 : 0; pop0 = pop;
        if (still > 50) { still = 0; const cx = g.alt.int(0, n - 1), cy = g.alt.int(0, n - 1), rr = Math.round(n / 7); for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) if (x * x + y * y < rr * rr && g.alt() < 0.5) a[((cy + y + n) % n) * n + (cx + x + n) % n] = 1; }
        if (body === 'Outlined') for (let i = 0; i < N; i++) d[i] = a[i] ? X.shade(ramp[Math.min(31, Math.max(0, sum[i] - 34))], 0.35) : sum[i] > 20 ? rim : ground;
        else for (let i = 0; i < N; i++) d[i] = a[i] ? ramp[Math.min(31, Math.max(0, sum[i] - 34))] : sum[i] > 20 ? rim : dish === 'Glass' && (i % n + (i / n | 0) * 3) % 11 === 0 ? dot : ground;
      };
      warm(frame, 22);
      return frame;
    },
  });

  P.addPixel({
    name: 'Rule Scroll', fam: 'Life', sizes: [80, 100, 200], fps: 12,
    recipe: 'A row of cells and a rule that reads three neighbours to write the next row; the rows stack into a scrolling tapestry, coloured by the pattern each cell read.',
    make(R, U, g) {
      const { n, d } = g, [rule, soup] = R.pick([[30, 0], [45, 0], [22, 0], [150, 0], [18, 0], [126, 0], [105, 0], [90, 0], [110, 1], [54, 1], [73, 1], [110, 1]]);
      const inks = X.inks(R, 4, 0.45), cols = Array.from({ length: 8 }, (_, k) => inks[[0, 1, 2, 1, 3, 2, 1, 0][k] % inks.length]), dark = cols.map(c => X.shade(c, 0.16)), ground = BLACK;
      let row = new Uint8Array(n);
      if (soup) for (let x = 0; x < n; x++) row[x] = R() < 0.5 ? 1 : 0; else row[n >> 1] = 1;
      const rows = [];
      const next = () => {
        const out = new Uint8Array(n), drawn = new Uint32Array(n);
        for (let x = 0; x < n; x++) {
          const k = row[(x + n - 1) % n] << 2 | row[x] << 1 | row[(x + 1) % n];
          out[x] = rule >> k & 1;
          drawn[x] = out[x] ? cols[k] : dark[k];
        }
        row = out;
        rows.push(drawn);
        if (rows.length > n) rows.shift();
        let s = 0; for (let x = 0; x < n; x++) s += row[x];
        if (s === 0 || s === n) for (let k = 0; k < 3; k++) row[R.int(0, n - 1)] ^= 1;
      };
      for (let k = 0; k < n; k++) next();
      return () => {
        next();
        for (let y = 0; y < n; y++) d.set(rows[y], y * n);
      };
    },
  });

  P.addPixel({
    name: 'Generations', seed: 2, fam: 'Life', sizes: [80, 100], fps: 10,
    interactive: 'Press and drag to draw live cells.',
    recipe: 'Life where a dying cell takes several steps to go, fading through the palette as it does; each rule here breeds its own kind of travelling wreckage.',
    make(R, U, g) {
      const { n, d } = g, N = n * n;
      const RULES = [[[3, 4, 5], [2], 4], [[3, 4, 5], [2], 4], [[2, 3, 4], [3, 4, 5], 6], [[3, 4, 5, 6], [2], 6], [[3, 4, 5], [2], 6]], rule = R.pick(RULES), [S, B, C] = rule;
      const sm = bits(S), bm = bits(B), st = new Uint8Array(N), live = new Uint8Array(N), c = new Uint8Array(N);
      for (let i = 0; i < N; i++) if (R() < 0.3) st[i] = 1;
      const inks = X.VG.inksN(R, 5, 0.45);
      g.trait('Palette', inks.name); g.trait('Grid', n); g.trait('Rule', ['Star Wars', 'Star Wars', 'Lattice', 'Fireworks', 'Comets'][RULES.indexOf(rule)]);
      // how the board starts, how a dying cell's colour falls away, and the ground
      const start0 = X.VG.pick(g, 'Start', 'Soup', ['Soup', 'Soup', 'Mirrored', 'Islands']), decay = X.VG.pick(g, 'Decay', 'Through the palette', ['Through the palette', 'Through the palette', 'Embers', 'One ink']), groundK = X.VG.pick(g, 'Ground', 'Black', ['Black', 'Black', 'Tinted']);
      if (start0 !== 'Soup') start(start0, st, n, g.alt, 0.3);
      const ground = groundK === 'Tinted' ? X.shade(inks[inks.length - 1], 0.14) : BLACK;
      const states = decay === 'Embers' ? [ground, X.rgb(255, 250, 220), ...Array.from({ length: C - 2 }, (_, k) => X.mixPk(X.rgb(255, 160, 40), X.mixPk(ground, X.rgb(120, 10, 10), 0.6), k / Math.max(1, C - 3)))]
        : decay === 'One ink' ? [ground, X.mixPk(inks[0], 0xffffffff, 0.35), ...Array.from({ length: C - 2 }, (_, k) => X.mixPk(ground, inks[0], 0.85 - k / (C - 1) * 0.6))]
        : [ground, X.mixPk(inks[0], 0xffffffff, 0.25), ...Array.from({ length: C - 2 }, (_, k) => X.shade(inks[(k + 1) % inks.length], 1 - k / (C - 1) * 0.6))];
      const frame = (t, dt, f, cold) => {
        if (!cold) draw(g, st);
        for (let i = 0; i < N; i++) live[i] = st[i] === 1 ? 1 : 0;
        count8(live, n, c);
        let pop = 0;
        for (let i = 0; i < N; i++) {
          const s = st[i];
          if (s === 0) st[i] = bm >> c[i] & 1 ? 1 : 0;
          else if (s === 1) st[i] = sm >> c[i] & 1 ? 1 : C > 2 ? 2 : 0;
          else st[i] = s + 1 >= C ? 0 : s + 1;
          pop += st[i] === 1;
        }
        // a dying board is reseeded with one patch of life, not a sprinkle over everything
        if (pop < N * 0.01) { const cx = R.int(0, n - 1), cy = R.int(0, n - 1), rr = Math.round(n / 6); for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) if (x * x + y * y < rr * rr && R() < 0.3) st[((cy + y + n) % n) * n + (cx + x + n) % n] = 1; }
        for (let i = 0; i < N; i++) d[i] = states[st[i]];
      };
      warm(frame, 24);
      return frame;
    },
  });

  P.addPixel({
    name: 'Critters', seed: 2, fam: 'Life', sizes: [80, 100], fps: 10,
    recipe: 'A reversible rule on two-by-two blocks. A picture dissolves into a gas of gliders and then, run exactly backwards, gathers itself again.',
    make(R, U, g) {
      const { n, d } = g, N = n * n;
      // the block map: two set cells stay; otherwise invert, and three also turn half a turn
      const F = new Uint8Array(16), Finv = new Uint8Array(16);
      for (let b = 0; b < 16; b++) {
        const k = (b & 1) + (b >> 1 & 1) + (b >> 2 & 1) + (b >> 3 & 1);
        let o = k === 2 ? b : b ^ 15;
        if (k === 1) o = (o & 1) << 3 | (o & 2) << 1 | (o & 4) >> 1 | (o & 8) >> 3; // 3 after inversion: rotate
        F[b] = o;
      }
      for (let b = 0; b < 16; b++) Finv[F[b]] = b;
      const a = new Uint8Array(N), seen = new Float32Array(N);
      // the picture: a big mirrored glyph
      const spr = X.mirrorSprite(R, 7, 7, 0.55, 0), sz = Math.floor(n * 0.6 / 7), ox = (n - 7 * sz) >> 1;
      for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (spr[y][x]) for (let v = 0; v < sz; v++) for (let u = 0; u < sz; u++) a[(ox + y * sz + v) * n + ox + x * sz + u] = 1;
      const step = (phase, M) => {
        const o = phase & 1;
        for (let y = o; y < n + o; y += 2) for (let x = o; x < n + o; x += 2) {
          const i0 = (y % n) * n + x % n, i1 = (y % n) * n + (x + 1) % n, i2 = ((y + 1) % n) * n + x % n, i3 = ((y + 1) % n) * n + (x + 1) % n;
          const b = M[a[i0] | a[i1] << 1 | a[i2] << 2 | a[i3] << 3];
          a[i0] = b & 1; a[i1] = b >> 1 & 1; a[i2] = b >> 2 & 1; a[i3] = b >> 3 & 1;
        }
      };
      const T = R.pick([90, 120, 150]), cols = X.VG.inksN(R, 6, 0.5);
      g.trait('Palette', cols.name); g.trait('Cycle', T === 90 ? 'Short' : T === 120 ? 'Medium' : 'Long');
      // the picture that dissolves and gathers again, how the cells are coloured, how long the gas glows, and the ground
      const pic = X.VG.pick(g, 'Picture', 'Glyph', ['Glyph', 'Glyph', 'Twin glyphs', 'Rings', 'Diamond', 'Window']), tint = X.VG.pick(g, 'Colour', 'Diagonals', ['Diagonals', 'Diagonals', 'Bands', 'Rings']);
      const gas = X.VG.pick(g, 'Gas', 'Faint', ['Faint', 'Faint', 'Glowing']), groundK = X.VG.pick(g, 'Ground', 'Black', ['Black', 'Black', 'Tinted']), ground = groundK === 'Tinted' ? X.shade(cols[0], 0.14) : BLACK;
      if (pic !== 'Glyph') {
        a.fill(0);
        const c0 = n >> 1, put = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) a[y * n + x] = 1; };
        if (pic === 'Twin glyphs') { const s2 = Math.floor(n * 0.36 / 7), sp2 = X.mirrorSprite(g.alt, 7, 7, 0.55, 0); for (const [gx, gy, sp] of [[n * 0.08, n * 0.3, spr], [n * 0.54, n * 0.3, sp2]]) for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (sp[y][x]) for (let v = 0; v < s2; v++) for (let u = 0; u < s2; u++) put(Math.round(gx) + x * s2 + u, Math.round(gy) + y * s2 + v); }
        else for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const dx = x + 0.5 - c0, dy = y + 0.5 - c0, r = Math.hypot(dx, dy); if (pic === 'Rings' ? r < n * 0.34 && Math.floor(r / (n * 0.05)) % 2 === 0 : pic === 'Diamond' ? Math.abs(dx) + Math.abs(dy) < n * 0.34 && Math.floor((Math.abs(dx) + Math.abs(dy)) / (n * 0.07)) % 2 === 0 : Math.max(Math.abs(dx), Math.abs(dy)) < n * 0.32 && (Math.abs(dx) > n * 0.03 && Math.abs(dy) > n * 0.03) && Math.max(Math.abs(dx), Math.abs(dy)) > n * 0.06) put(x, y); }
      }
      const CI = new Uint8Array(N);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) CI[y * n + x] = tint === 'Bands' ? Math.floor(y / n * cols.length * 2) % cols.length : tint === 'Rings' ? Math.floor(Math.hypot(x - n / 2, y - n / 2) / n * cols.length * 2.5) % cols.length : (x + y) % cols.length;
      const GF = gas === 'Glowing' ? 0.88 : 0.75, trail = Array.from({ length: 16 }, (_, k) => X.mixPk(ground, cols[1 % cols.length], k / 15 * (gas === 'Glowing' ? 0.65 : 0.5)));
      let s = 0; // steps taken so far in this cycle (0..T forward, then back)
      const frame = (t, dt, f) => {
        const c = f % (2 * T);
        if (c < T) { step(c, F); s = c + 1; } else { const k = 2 * T - 1 - c; step(k, Finv); s = k; }
        const flip = s & 1;
        // the inverse of a step at phase k is the inverse map at the same phase
        const near = 1 - Math.min(1, s / 25);
        for (let i = 0; i < N; i++) {
          const on = a[i] ^ flip;
          seen[i] = on ? 1 : seen[i] * GF;
          d[i] = on ? X.mixPk(cols[CI[i]], 0xffffffff, near * 0.6) : trail[Math.floor(seen[i] * 15)];
        }
      };
      // run one whole cycle first, so the fading trails are already what they will be at every later cycle and the loop is exact
      for (let k = 0; k < 2 * T; k++) frame(0, 0, k);
      frame.periodSteps = 2 * T;
      return frame;
    },
  });

  P.addPixel({
    name: 'Day & Night', fam: 'Life', sizes: [80, 100], fps: 10,
    interactive: 'Press and drag to draw live cells.',
    recipe: 'A rule that treats live and dead cells exactly alike, so islands of each grow, shrink and swap places; colour is how long a cell has been on its side.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, a = new Uint8Array(N), c = new Uint8Array(N), age = new Uint16Array(N);
      const B = bits([3, 6, 7, 8]), S = bits([3, 4, 6, 7, 8]);
      for (let i = 0; i < N; i++) a[i] = R() < R.pick([0.5, 0.52, 0.55]) ? 1 : 0;
      const inks = X.VG.inksN(R, 5, 0.45, true);
      g.trait('Palette', inks.name); g.trait('Grid', n);
      // how the two sides start out, how the day side is drawn, and what the night side is
      const start0 = X.VG.pick(g, 'Start', 'Noise', ['Noise', 'Noise', 'Mirrored', 'Halves']), look = X.VG.pick(g, 'Day side', 'Gradient', ['Gradient', 'Gradient', 'Contours', 'Flat']), nightK = X.VG.pick(g, 'Night side', 'Dark', ['Dark', 'Dark', 'Ink', 'Pale']);
      if (start0 === 'Mirrored') start('Mirrored', a, n, g.alt, 0.5);
      else if (start0 === 'Halves') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) a[y * n + x] = g.alt() < (Math.sin(x / n * U.TAU) > 0 ? 0.62 : 0.4) ? 1 : 0;
      const day0 = nightK === 'Pale' ? X.rampPk(inks, 24).map(c => X.shade(c, 0.5)) : X.rampPk(inks, 24), day = look === 'Flat' ? day0.map(() => day0[16]) : look === 'Contours' ? day0.map((c, k) => k % 6 === 5 ? X.shade(c, 0.55) : c) : day0;
      const night = nightK === 'Pale' ? X.rampPk([X.mixPk(inks[0], WHITE, 0.55), X.mixPk(inks[1], WHITE, 0.8)], 24) : nightK === 'Ink' ? X.rampPk([X.shade(inks[1], 0.25), X.shade(inks[0], 0.7)], 24) : X.rampPk([BLACK, X.shade(inks[0], 0.5)], 24);
      let calm = 0;
      const frame = (t, dt, f, cold) => {
        if (!cold) draw(g, a);
        count8(a, n, c);
        let flips = 0, pop = 0;
        for (let i = 0; i < N; i++) {
          const v = a[i] ? S >> c[i] & 1 : B >> c[i] & 1;
          if (v !== a[i]) flips++;
          pop += v;
          age[i] = v === a[i] ? Math.min(age[i] + 1, 999) : 0;
          a[i] = v;
          d[i] = v ? day[Math.min(23, age[i] >> 1)] : night[Math.min(23, age[i] >> 2)];
        }
        // once the islands have settled, or one side has swallowed most of the board, a storm of noise
        // breaks out somewhere and new coasts draw themselves
        calm = flips < N * 0.002 || pop > N * 0.72 || pop < N * 0.28 ? calm + 1 : 0;
        if (calm > 60) { calm = 0; const cx = g.alt.int(0, n - 1), cy = g.alt.int(0, n - 1), rr = Math.round(n * g.alt.range(0.12, 0.2)); for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) if (x * x + y * y < rr * rr) a[((cy + y + n) % n) * n + (cx + x + n) % n] = g.alt() < 0.5 ? 1 : 0; }
      };
      warm(frame, 28);
      return frame;
    },
  });

  P.addPixel({
    name: 'Ulam–Warburton', seed: 1, fam: 'Life', sizes: [80, 100, 200], fps: 10,
    recipe: 'A cell switches on when exactly one of its four neighbours is on, and never switches off. From a single seed, squares of squares unfold, coloured by generation.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, born = new Int16Array(N), inks = X.inks(R, 6, 0.5), cyc = X.rampPk(inks, 36, true);
      const seeds = R.pick([1, 1, 1, 2, 4]);
      let gen = 0, front = [];
      const reset = () => {
        born.fill(-1); gen = 0; front = [];
        for (let k = 0; k < seeds; k++) {
          const x = seeds === 1 ? n >> 1 : seeds === 2 ? (n >> 1) + (k ? n >> 3 : -(n >> 3)) : (k & 1 ? 3 : 1) * n >> 2, y = seeds === 4 ? (k & 2 ? 3 : 1) * n >> 2 : n >> 1;
          born[y * n + x] = 0; front.push(y * n + x);
        }
      };
      reset();
      let hold = 0;
      return () => {
        if (front.length) {
          gen++;
          const cand = new Map();
          for (const i of front) {
            const x = i % n, y = (i / n) | 0;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
              const xx = x + dx, yy = y + dy;
              if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
              const j = yy * n + xx;
              if (born[j] >= 0) continue;
              let k = 0;
              if (xx > 0 && born[j - 1] >= 0) k++; if (xx < n - 1 && born[j + 1] >= 0) k++; if (yy > 0 && born[j - n] >= 0) k++; if (yy < n - 1 && born[j + n] >= 0) k++;
              if (k === 1) cand.set(j, 1);
            }
          }
          front = [...cand.keys()];
          for (const j of front) born[j] = gen;
        } else if (++hold > 40) { hold = 0; reset(); }
        const sh = gen;
        for (let i = 0; i < N; i++) d[i] = born[i] < 0 ? BLACK : cyc[((born[i] - sh) % 36 + 36) % 36];
      };
    },
  });

  P.addPixel({
    name: 'Replicator', fam: 'Life', sizes: [80, 100], fps: 8,
    interactive: 'Press and drag to draw live cells.',
    recipe: 'A cell is on when an odd number of its neighbours were. Any shape you start with comes back as copies of itself, eight, then sixty-four, at every power of two.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, a = new Uint8Array(N), b = new Uint8Array(N), heat = new Float32Array(N);
      const spr = X.mirrorSprite(R, 5, 5, 0.5, 0), cols = X.VG.inksN(R, 5, 0.5, true);
      g.trait('Palette', cols.name); g.trait('Grid', n);
      // which cells count as neighbours (all eight, the four beside, or six as on a hex grid), what is seeded, and the ground
      const hood = X.VG.pick(g, 'Neighbours', 'Eight', ['Eight', 'Eight', 'Four', 'Six']), seedK = X.VG.pick(g, 'Seed', 'Glyph', ['Glyph', 'Glyph', 'Big glyph', 'Twin glyphs', 'Dot']), field = X.VG.pick(g, 'Ground', 'Black', ['Black', 'Black', 'Ink', 'Paper']);
      const ground = field === 'Ink' ? X.shade(cols[0], 0.3) : field === 'Paper' ? X.mixPk(WHITE, cols[4], 0.1) : BLACK, ramp = X.rampPk([ground, ...(field === 'Paper' ? cols.slice().reverse().map(c => X.shade(c, 0.75)) : cols)], 20);
      const spr2 = seedK === 'Big glyph' || seedK === 'Twin glyphs' ? X.mirrorSprite(g.alt, 7, 7, 0.5, 0) : null;
      const stamp = (sp, ox, oy) => { for (let y = 0; y < sp.length; y++) for (let x = 0; x < sp[0].length; x++) if (sp[y][x]) a[((oy + y + n) % n) * n + (ox + x + n) % n] = 1; };
      const seed = () => {
        a.fill(0); heat.fill(0);
        if (seedK === 'Glyph') { const o = (n >> 1) - 2; for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (spr[y][x]) a[(o + y) * n + o + x] = 1; }
        else if (seedK === 'Big glyph') stamp(spr2, (n >> 1) - 3, (n >> 1) - 3);
        else if (seedK === 'Twin glyphs') { stamp(spr, (n >> 2) - 2, (n >> 1) - 2); stamp(spr2, (3 * n >> 2) - 3, (n >> 1) - 3); }
        else { a[(n >> 1) * n + (n >> 1)] = 1; a[(n >> 1) * n + (n >> 1) + 1] = 1; }
      };
      seed();
      let k = 0;
      const life = Math.pow(2, Math.floor(Math.log2(n / 5)));
      return () => {
        draw(g, a);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let s = 0;
          if (hood === 'Eight') { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (dx || dy) s += a[((y + dy + n) % n) * n + (x + dx + n) % n]; }
          else { const up = ((y + n - 1) % n) * n, dn = ((y + 1) % n) * n, row = y * n, l = (x + n - 1) % n, r = (x + 1) % n; s = a[up + x] + a[dn + x] + a[row + l] + a[row + r]; if (hood === 'Six') s += (y & 1) ? a[up + r] + a[dn + r] : a[up + l] + a[dn + l]; }
          b[y * n + x] = s & 1;
        }
        a.set(b);
        if (++k >= life * 2) { k = 0; seed(); }
        const pow = (k & (k - 1)) === 0;
        for (let i = 0; i < N; i++) { heat[i] = Math.max(heat[i] * 0.7, a[i] ? (pow ? 1 : 0.6) : 0); d[i] = ramp[Math.round(heat[i] * 19)]; }
      };
    },
  });

  P.addPixel({
    name: 'Maze Rule', fam: 'Life', sizes: [80, 100, 200], fps: 10,
    recipe: 'Life’s birth rule with a survival rule so lenient that almost nothing dies: a scrap of noise grows into a maze of corridors, coloured by when each wall was laid.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, a = new Uint8Array(N), c = new Uint8Array(N), born = new Int32Array(N);
      const S = R.pick([bits([1, 2, 3, 4, 5]), bits([1, 2, 3, 4])]), B = bits([3]), cyc = X.rampPk(X.inks(R, 5, 0.5), 48, true), floor = R.bool(0.4);
      let gen = 0, still = 0, fade = 1;
      const seed = () => {
        a.fill(0); born.fill(-1); gen = 0; still = 0; fade = 1;
        const cx = R.int(n >> 2, 3 * n >> 2), cy = R.int(n >> 2, 3 * n >> 2), r = R.int(3, 6);
        for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (R() < 0.45) { const i = ((cy + y + n) % n) * n + (cx + x + n) % n; a[i] = 1; born[i] = 0; }
      };
      seed();
      return () => {
        if (still > 30) { fade *= 0.85; if (fade < 0.05) seed(); }
        else {
          count8(a, n, c);
          gen++;
          let changed = 0;
          for (let i = 0; i < N; i++) {
            const v = a[i] ? S >> c[i] & 1 : B >> c[i] & 1;
            if (v !== a[i]) { changed++; if (v && born[i] < 0) born[i] = gen; }
            a[i] = v;
          }
          still = changed < 4 ? still + 1 : 0;
        }
        for (let i = 0; i < N; i++) {
          const col = born[i] < 0 ? BLACK : cyc[(born[i] * 2 + gen) % 48];
          d[i] = a[i] ? (fade < 1 ? X.shade(col, fade) : col) : born[i] >= 0 && floor ? X.shade(col, 0.18 * fade) : BLACK;
        }
      };
    },
  });
})();
