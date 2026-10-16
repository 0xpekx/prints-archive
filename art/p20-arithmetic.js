// Set 2 · Arithmetic: tables of whole numbers, one number per cell.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  // Steps through a list of tables, holding each and dissolving into the next
  // through an 8 x 8 ordered threshold, the way old screens changed pictures.
  function sequence(n, count, build, hold, fade) {
    const cache = new Map();
    const table = k => { k = ((k % count) + count) % count; if (!cache.has(k)) { if (cache.size > 3) cache.delete(cache.keys().next().value); cache.set(k, build(k)); } return cache.get(k); };
    return t => {
      const ph = t / hold, k = Math.floor(ph), local = ph - k, a = table(k);
      const p = local > 1 - fade ? (local - (1 - fade)) / fade : 0;
      if (!p) return { a, b: a, p: 0 };
      return { a, b: table(k + 1), p };
    };
  }
  const pick = (s, i, x, y) => (s.p && X.dith8(x, y) < s.p ? s.b : s.a)[i];

  P.addPixel({
    name: 'Euclid Steps', seed: 2, fam: 'Arithmetic', sizes: [80, 100],
    recipe: 'Each cell runs Euclid’s algorithm on its two coordinates; colour is the number of steps, and pairs that share a factor sink into shadow.',
    make(R, U, g) {
      const { n, d } = g, k = R.int(5, 8), cols = X.inks(R, k, 0.45), dark = cols.map(c => X.shade(c, 0.28));
      const ox = R.int(0, 3), oy = R.int(0, 3), spd = R.range(0.25, 0.5), z0 = R.range(0.6, 1.6), zr = R.range(0.6, 1.4), rate = R.range(0.04, 0.08);
      const mirror = R.bool(0.6);
      return t => {
        const z = z0 * Math.pow(2, zr * Math.sin(t * rate)), hd = Math.floor(t * spd);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const xx = mirror ? Math.abs(x - n / 2 + 0.5) : x, yy = mirror ? Math.abs(y - n / 2 + 0.5) : y;
          let a = Math.round(xx * z) + 1 + ox, b = Math.round(yy * z) + 1 + oy, s = 0;
          while (b) { const r = a % b; a = b; b = r; s++; }
          const v = (s + hd) % k;
          d[i] = a === 1 ? cols[v] : a === 2 ? dark[v] : BLACK;
        }
      };
    },
  });

  P.addPixel({
    name: 'Goldbach Comet', seed: 2, fam: 'Arithmetic', sizes: [100, 200],
    recipe: 'For every even number, the count of ways it splits into two primes, plotted as one dot; or for every number its totient, the sum of its divisors or its largest prime factor. The dots form comets and fans whose strands are the remainders on division by three, five and seven.',
    make(R, U, g) {
      // Goldbach counts on the opening variation and at least half the rolls; otherwise totients, divisor sums or largest factors too
      const og = g.home || g.alt() < 0.5;
      const { n, d } = g, M = R.pick([12000, 20000, 30000]), sieve = new Uint8Array(M + 1).fill(1);
      sieve[0] = sieve[1] = 0;
      for (let p = 2; p * p <= M; p++) if (sieve[p]) for (let q = p * p; q <= M; q += p) sieve[q] = 0;
      const primes = [];
      for (let p = 3; p <= M; p++) if (sieve[p]) primes.push(p);
      const half = M >> 1, G = new Uint16Array(half + 1);
      const kind = og ? 'goldbach' : R.pick(['goldbach', 'goldbach', 'totient', 'sigma', 'factor']);
      if (kind === 'goldbach') for (let m = 3; m <= half; m++) { let c = 0; for (const p of primes) { if (p > m) break; if (sieve[2 * m - p]) c++; } G[m] = c; }
      else if (kind === 'totient') { const phi = Float64Array.from({ length: half + 1 }, (_, i) => i); for (let p = 2; p <= half; p++) if (phi[p] === p) for (let q = p; q <= half; q += p) phi[q] -= phi[q] / p; for (let m = 3; m <= half; m++) G[m] = phi[m]; }
      else if (kind === 'sigma') { const S = new Float64Array(half + 1); for (let i = 1; i <= half; i++) for (let q = i; q <= half; q += i) S[q] += i; let mx = 0; for (let m = 3; m <= half; m++) mx = Math.max(mx, S[m]); for (let m = 3; m <= half; m++) G[m] = Math.round(S[m] / mx * 60000); }
      else { for (let p = 2; p <= half; p++) if (sieve[p]) for (let q = p; q <= half; q += p) G[q] = p; }
      let gmax = 0;
      for (let m = 3; m <= half; m++) gmax = Math.max(gmax, G[m]);
      const cols = X.VG.inksN(R, 6, 0.45), classes = R.shuffle([3, 5, 7, 15, 105]), bg = R.bool(0.4) ? X.shade(cols[0], 0.12) : BLACK;
      const hits = new Uint16Array(n * n), cls = new Uint8Array(n * n), ghost = new Uint8Array(n * n), cell = new Int32Array(half + 1);
      g.trait('Function', { goldbach: 'Goldbach', totient: 'Totient', sigma: 'Divisor sum', factor: 'Largest factor' }[kind]); g.trait('Up to', M); g.trait('Palette', cols.name); g.trait('Ground', bg === BLACK ? 'Black' : 'Tinted'); g.trait('Grid', n);
      // how the plot is drawn: straight axes, a logarithmic rise, a fan swept round a centre, or a mirrored pair
      const plot = X.VG.pick(g, 'Plot', 'Linear', ['Linear', 'Linear', 'Logarithmic', 'Fan', 'Mirrored']), lmax = Math.log(1 + gmax);
      // every number's cell is worked out once
      for (let m = 3; m <= half; m++) {
        const u = (m - 3) / (half - 2), v = plot === 'Logarithmic' ? Math.log(1 + G[m]) / lmax : G[m] / gmax;
        let x = Math.min(n - 1, Math.floor(u * n)), y = n - 2 - Math.floor(v * (n - 4));
        if (plot === 'Fan') { const a = Math.PI * (1.05 - u * 1.1), r = (0.1 + 0.88 * Math.sqrt(v)) * (n * 0.62); x = Math.round(n / 2 + Math.cos(a) * r); y = Math.round(n * 0.86 - Math.sin(a) * r * 1.1); }
        else if (plot === 'Mirrored') { y = Math.round(n / 2 - (m & 1 ? 1 : -1) * v * (n * 0.46)); }
        cell[m] = Math.max(0, Math.min(n - 1, y)) * n + Math.max(0, Math.min(n - 1, x));
      }
      const sweep = R.range(7, 10), hold = 4, cycle = sweep + hold + 1.5;
      const gcd = (a, b) => { while (b) { const r = a % b; a = b; b = r; } return a; }, classOf = new Map();
      const classes2 = mod => { if (!classOf.has(mod)) { const a = new Uint8Array(half + 1), divs = []; for (let q = 1; q <= mod; q++) if (mod % q === 0) divs.push(q); for (let m = 3; m <= half; m++) { const c = gcd(2 * m, mod); a[m] = divs.filter(q => c % q === 0).length - 1; } classOf.set(mod, a); } return classOf.get(mod); };
      // colour of a cell by how many numbers landed on it, worked out once per class colour and fade step
      const tone = Array.from({ length: cols.length }, (_, c) => Array.from({ length: 8 }, (_, h) => X.mixPk(bg, cols[c], Math.min(1, 0.55 + h * 0.15))));
      const faint = cols.map(c => X.mixPk(bg, c, 0.22));
      return t => {
        // the clock starts on a finished comet, so the first frame is already the picture; each next sweep
        // draws over a faint ghost of the last instead of over nothing
        t += sweep;
        const k = Math.floor(t / cycle), local = t - k * cycle, mod = classes[k % classes.length], ca = classes2(mod), pa = classes2(classes[(k + classes.length - 1) % classes.length]);
        const upto = Math.min(1, local / sweep) * (half - 2);
        hits.fill(0); ghost.fill(0);
        for (let m = 3; m <= half; m++) {
          const i = cell[m];
          if (m - 3 < upto) { hits[i]++; cls[i] = ca[m]; } else if (k > 0) ghost[i] = pa[m] + 1;
        }
        const fade = local > sweep + hold ? 1 - (local - sweep - hold) / 1.5 * 0.6 : 1, fk = Math.max(0, Math.min(1, fade));
        for (let i = 0; i < n * n; i++) d[i] = hits[i] ? (fk === 1 ? tone[(cls[i] + 1) % cols.length][Math.min(7, hits[i])] : X.mixPk(bg, cols[(cls[i] + 1) % cols.length], Math.min(1, 0.55 + hits[i] * 0.15) * fk)) : ghost[i] ? faint[ghost[i] % cols.length] : bg;
      };
    },
  });

  P.addPixel({
    name: 'Thue–Morse', fam: 'Arithmetic', sizes: [80, 100],
    recipe: 'Count the ones in the binary of each coordinate and add them up: the fair-sharing sequence spread over a plane, recombined every few seconds.',
    make(R, U, g) {
      const { n, d } = g, k = R.int(3, 4), cols = X.inks(R, k, 0.45), pc = v => { let c = 0; while (v) { v &= v - 1; c++; } return c; };
      const forms = R.shuffle([
        (x, y) => pc(x) + pc(y), (x, y) => pc(x) + 2 * pc(y), (x, y) => pc(x ^ y), (x, y) => pc(x & y) + pc(x | y) * 2,
        (x, y) => pc(x ^ (y << 1)) + pc(y), (x, y) => 2 * pc(x & y) + pc(x ^ y),
      ]);
      const ox = R.pick([0, 0, 64, R.int(0, 255)]), oy = R.pick([0, 0, 128, R.int(0, 255)]), z = R.pick([1, 2, 2]);
      const seq = sequence(n, forms.length, j => {
        const out = new Uint8Array(n * n), f = forms[j];
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) out[i] = f(Math.floor(x / z) + ox, Math.floor(y / z) + oy) % k;
        return out;
      }, R.range(4, 6), 0.35);
      const rot = R.range(0.15, 0.4) * R.sign();
      return t => {
        const s = seq(t), sh = Math.floor(t * rot * k);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) d[i] = cols[(((pick(s, i, x, y) + sh) % k) + k) % k];
      };
    },
  });

  P.addPixel({
    name: 'Rauzy', seed: 1, fam: 'Arithmetic', sizes: [100, 200],
    recipe: 'The word made by 1→12, 2→13, 3→1, walked as steps in three directions and seen end-on: a fractal of three interlocking pieces, slowly turning.',
    make(R, U, g) {
      const { n, d } = g, cols0 = X.VG.inksN(R, 3, 0.4), cols = cols0.slice(0, 3);
      // the word
      let w = [1];
      while (w.length < 40000) w = w.flatMap(c => (c === 1 ? [1, 2] : c === 2 ? [1, 3] : [1]));
      const N = 40000;
      // expanding direction of the substitution: root of b^3 = b^2 + b + 1
      const b = 1.839286755214161, u = [b * b, b, 1], ul = Math.hypot(...u), e = u.map(v => v / ul);
      const p1 = [1, -1, 0], dot = (a, c) => a[0] * c[0] + a[1] * c[1] + a[2] * c[2];
      const q1 = p1.map((v, i) => v - dot(p1, e) * e[i]), l1 = Math.hypot(...q1), A = q1.map(v => v / l1);
      const B = [e[1] * A[2] - e[2] * A[1], e[2] * A[0] - e[0] * A[2], e[0] * A[1] - e[1] * A[0]];
      const px = new Float32Array(N), py = new Float32Array(N), lt = new Uint8Array(N);
      const v = [0, 0, 0];
      let cx = 0, cy = 0;
      for (let i = 0; i < N; i++) { v[w[i] - 1]++; px[i] = dot(v, A); py[i] = dot(v, B); lt[i] = w[i] - 1; cx += px[i]; cy += py[i]; }
      cx /= N; cy /= N;
      let rad = 0;
      for (let i = 0; i < N; i++) rad = Math.max(rad, Math.hypot(px[i] - cx, py[i] - cy));
      const sc0 = n * 0.47 / rad, spin = R.range(0.04, 0.09) * R.sign(), ground = R.bool(0.3) ? X.shade(cols[0], 0.18) : BLACK;
      g.trait('Palette', cols0.name); g.trait('Turning', spin > 0 ? 'Clockwise' : 'Anticlockwise'); g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('Grid', n);
      // how close we look, how the points are coloured (by which of the three pieces, or in bands across the tile), and whether we see one tile or its neighbours
      const zoom = X.VG.pick(g, 'View', 'Whole', n >= 200 ? ['Whole', 'Whole', 'Close'] : ['Whole', 'Whole', 'Close', 'Tiling']), paint = X.VG.pick(g, 'Colour', 'Pieces', ['Pieces', 'Pieces', 'Bands', 'Pieces']);
      const sc = zoom === 'Close' ? sc0 * (n >= 200 ? 1.2 : 1.7) : zoom === 'Tiling' ? sc0 * 0.62 : sc0;
      // the tile repeats along the lattice spanned by the projected unit steps; the tiling view draws its six neighbours too
      const e1 = [dot([1, -1, 0], A), dot([1, -1, 0], B)], e2 = [dot([0, 1, -1], A), dot([0, 1, -1], B)], OFF = zoom === 'Tiling' ? [[0, 0], e1, [-e1[0], -e1[1]], e2, [-e2[0], -e2[1]], [e1[0] + e2[0], e1[1] + e2[1]], [-e1[0] - e2[0], -e1[1] - e2[1]]] : [[0, 0]];
      if (paint === 'Bands') for (let i = 0; i < N; i++) lt[i] = Math.floor(((px[i] - cx) * 0.8 + (py[i] - cy) * 0.6) / rad * 4 + 40) % 3;
      const shadeCols = cols.map(c => [X.shade(c, 0.55), c, X.mixPk(c, 0xffffffff, 0.35)]), seam = cols.map(c => X.shade(c, 0.42));
      const lid = new Int8Array(n * n);
      return t => {
        d.fill(ground); lid.fill(-1);
        const a = t * spin, ca = Math.cos(a), sa = Math.sin(a), wave = (t * 2400) % N;
        // the tiling view draws its tiles smaller, so every second point is enough to cover them
        const STEP = OFF.length > 1 ? 2 : 1;
        for (let o = 0; o < OFF.length; o++) for (let i = 0; i < N; i += STEP) {
          const x = px[i] - cx + OFF[o][0], y = py[i] - cy + OFF[o][1], X0 = Math.round(n / 2 + (x * ca - y * sa) * sc - 0.5), Y0 = Math.round(n / 2 + (x * sa + y * ca) * sc - 0.5);
          if (X0 < 0 || Y0 < 0 || X0 >= n || Y0 >= n) continue;
          const age = (i - wave + N) % N, tone = age < 1600 ? 2 : age > N - 6000 ? 0 : 1, l = OFF.length > 1 ? (lt[i] + o) % 3 : lt[i];
          d[Y0 * n + X0] = shadeCols[l][tone]; lid[Y0 * n + X0] = l;
        }
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
          const i = y * n + x, k = lid[i];
          // on the finer grid the points don't quite cover the tiles: a cell left empty inside a tile takes its neighbour's colour
          if (k < 0) { if (lid[i - 1] >= 0 && lid[i + 1] >= 0 && lid[i - n] >= 0 && lid[i + n] >= 0) d[i] = d[i - 1]; continue; }
          // a dark seam where two of the three pieces meet, so they read as an interlocking tiling
          if (lid[i + 1] >= 0 && lid[i + 1] !== k || lid[i + n] >= 0 && lid[i + n] !== k) d[i] = seam[k];
        }
      };
    },
  });

  // nim products below 256, worked out once
  let NIM = null;
  function nimTable() {
    if (NIM) return NIM;
    const mul = (x, y, L) => {
      if (x < 2 || y < 2) return x * y;
      const h = L >> 1, m = (1 << h) - 1, xh = x >> h, xl = x & m, yh = y >> h, yl = y & m;
      const hh = mul(xh, yh, h);
      return ((hh ^ mul(xh, yl, h) ^ mul(xl, yh, h)) << h) ^ mul(xl, yl, h) ^ mul(hh, 1 << (h - 1), h);
    };
    NIM = new Uint8Array(65536);
    for (let a = 0; a < 256; a++) for (let c = 0; c < 256; c++) NIM[a * 256 + c] = mul(a, c, 8);
    return NIM;
  }
  P.addPixel({
    name: 'Nim Table', seed: 2, fam: 'Arithmetic', sizes: [80, 100],
    recipe: 'The multiplication table of the game of Nim, where adding is exclusive-or. A window of values sweeps through it, lighting curves that only this arithmetic draws.',
    make(R, U, g) {
      const { n, d } = g, T = nimTable(), sc = U.scheme(R), dark = U.dim(sc.lut, 0.3), ox = R.pick([2, 2, 64, 128, R.int(2, 255 - n)]), oy = R.pick([2, 2, 32, R.int(2, 255 - n)]);
      const width = R.int(40, 90), spd = R.range(6, 14);
      const mapX = x => Math.min(255, x + ox), mapY = y => Math.min(255, y + oy);
      return t => {
        const c = t * spd;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const v = T[mapX(x) * 256 + mapY(y)], off = ((v - c) % 256 + 256) % 256;
          d[i] = off < width ? sc.lut[v] : dark[v];
        }
      };
    },
  });

  P.addPixel({
    name: 'Kaprekar', seed: 2, fam: 'Arithmetic', sizes: [100],
    recipe: 'Every four-digit number, laid out by its digits, sorts its digits high-to-low and low-to-high and subtracts; colour is how many rounds it takes to reach 6174.',
    make(R, U, g) {
      const { n, d } = g, cols = X.inks(R, 8, 0.45);
      const steps = new Uint8Array(10000);
      for (let v = 0; v < 10000; v++) {
        let a = v, s = 0;
        const dg = [];
        while (a !== 6174 && s < 9) {
          dg.length = 0; for (let k = 0, b = a; k < 4; k++, b = (b / 10) | 0) dg.push(b % 10);
          if (dg[0] === dg[1] && dg[1] === dg[2] && dg[2] === dg[3]) { s = 9; break; }
          dg.sort((p, q) => p - q);
          a = (dg[3] * 1000 + dg[2] * 100 + dg[1] * 10 + dg[0]) - (dg[0] * 1000 + dg[1] * 100 + dg[2] * 10 + dg[3]); s++;
        }
        steps[v] = s;
      }
      // four ways of laying the digits out: which two digits pick the row
      const layouts = R.shuffle([[0, 1, 2, 3], [0, 2, 1, 3], [3, 1, 2, 0], [1, 3, 0, 2], [2, 0, 3, 1]]);
      const seq = sequence(n, layouts.length, j => {
        const L = layouts[j], out = new Uint8Array(n * n);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const dig = [(y / 10) | 0, y % 10, (x / 10) | 0, x % 10], v = dig[L[0]] * 1000 + dig[L[1]] * 100 + dig[L[2]] * 10 + dig[L[3]];
          out[i] = steps[v];
        }
        return out;
      }, R.range(6, 9), 0.3);
      const spd = R.range(0.6, 1.2);
      return t => {
        const s = seq(t), lit = (t * spd) % 9;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const v = pick(s, i, x, y);
          d[i] = v === 9 ? BLACK : v === 0 ? 0xffffffff : Math.abs(v - lit) < 0.8 ? X.mixPk(cols[v % cols.length], 0xffffffff, 0.45) : cols[v % cols.length];
        }
      };
    },
  });

  P.addPixel({
    name: 'Digit Quilt', fam: 'Arithmetic', sizes: [80, 100],
    recipe: 'Write both coordinates in a small base and add up their digits; the sums tile the plane into squares within squares, like a quilt pieced by a counting rule.',
    make(R, U, g) {
      const { n, d } = g, base = R.pick([2, 3, 3, 4, 5]), inks = X.inks(R, 5, 0.45, true), k = 24, cols = X.rampPk(inks, k, true);
      const ds = v => { let s = 0; while (v) { s += v % base; v = (v / base) | 0; } return s; };
      const forms = R.shuffle([(x, y) => ds(x) + ds(y), (x, y) => ds(x) + 2 * ds(y), (x, y) => Math.abs(ds(x) - ds(y)) * 2, (x, y) => ds(x) + ds(y) + ds(x + y), (x, y) => 2 * Math.max(ds(x), ds(y))]);
      const ox = R.pick([0, 0, R.int(0, 40)]), oy = R.pick([0, 0, R.int(0, 40)]);
      const seq = sequence(n, forms.length, j => {
        const out = new Uint8Array(n * n), f = forms[j];
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) out[i] = f(x + ox, y + oy) % k;
        return out;
      }, R.range(5, 7), 0.35);
      const flow = R.range(1.5, 3) * R.sign();
      return t => {
        const s = seq(t), sh = Math.floor(t * flow);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) d[i] = cols[(((pick(s, i, x, y) + sh) % k) + k) % k];
      };
    },
  });

  P.addPixel({
    name: 'Diatomic', seed: 2, fam: 'Arithmetic', sizes: [100, 200],
    recipe: 'Stern’s sequence, where each term is the sum of two before it at half the distance, stood up as columns: a mountain range that repeats itself at every scale.',
    make(R, U, g) {
      const { n, d } = g, M = 1 << 14, s = new Uint16Array(M);
      s[1] = 1;
      for (let i = 2; i < M; i++) s[i] = i & 1 ? s[i >> 1] + s[(i >> 1) + 1] : s[i >> 1];
      const cols = X.VG.inksN(R, 6, 0.5), lvl = R.pick([10, 11, 12]), sky = R.bool(0.5), mirror = R.bool(0.5), flow = R.range(3, 7);
      const bg = sky ? X.shade(cols[0], 0.14) : BLACK;
      g.trait('Palette', cols.name); g.trait('Detail', lvl === 10 ? 'Coarse' : lvl === 11 ? 'Medium' : 'Fine'); g.trait('Reflection', mirror ? 'Mirrored' : 'None'); g.trait('Grid', n);
      // how the range is stood up (columns, hanging from the top, round a circle, or terraced), and how deep the colour bands run
      const form = X.VG.pick(g, 'Form', 'Columns', ['Columns', 'Columns', 'Hanging', 'Ring', 'Terraced']), bands = X.VG.pick(g, 'Bands', 'Narrow', ['Narrow', 'Narrow', 'Wide', 'Hairline']);
      // bands three cells deep; each column's top cell is a lighter cap, so the ridge line reads crisply
      const bw = bands === 'Wide' ? 7 : bands === 'Hairline' ? 1 : 3, hs = new Float32Array(n), caps = cols.map(c => X.mixPk(c, 0xffffffff, 0.4));
      const RA = new Int16Array(n * n).fill(-1), RR = new Float32Array(n * n);
      if (form === 'Ring') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const dx = x + 0.5 - n / 2, dy = y + 0.5 - n / 2, r = Math.hypot(dx, dy) / (n * 0.48); if (r > 0.25 && r <= 1) { RA[y * n + x] = Math.min(n - 1, Math.floor((Math.atan2(dy, dx) / U.TAU + 0.5) * n)); RR[y * n + x] = (r - 0.25) / 0.75; } }
      return t => {
        // walk through the level slowly, wrapping, so the range slides by
        const lo = 1 << lvl, span = lo, off = Math.floor(t * 4) % span, ph = t * flow * 3 / bw;
        let mx = 0;
        for (let x = 0; x < n; x++) {
          let v = 0;
          const a = lo + ((off + Math.floor(x * span / n)) % span), b = lo + ((off + Math.floor((x + 1) * span / n)) % span);
          for (let k = a; k !== b && k < 2 * lo; k++) v = Math.max(v, s[k]);
          if (!v) v = s[a];
          hs[x] = v; mx = Math.max(mx, v);
        }
        d.fill(bg);
        if (form === 'Ring') {
          // the range wrapped round a circle: each column becomes a spoke rising outward from the inner rim
          for (let i = 0; i < n * n; i++) { const a = RA[i]; if (a < 0) continue; const h = hs[a] / mx, r = RR[i]; if (r <= h) { const k = Math.floor(r * (n * 0.36)), hh = Math.floor(h * (n * 0.36)), ci = (Math.floor((hh - k) / bw + ph) % cols.length + cols.length) % cols.length; d[i] = k >= hh - 1 ? caps[ci] : mirror && r < h * 0.5 ? X.shade(cols[ci], 0.6) : cols[ci]; } }
          return;
        }
        const H = mirror ? n / 2 : n;
        for (let x = 0; x < n; x++) {
          let h = Math.round(hs[x] / mx * (H - 2));
          if (form === 'Terraced') h = Math.round(h / 6) * 6;
          for (let k = 0; k < h; k++) {
            const ci = (Math.floor((h - k) / bw + ph) % cols.length + cols.length) % cols.length, c = k === h - 1 ? caps[ci] : cols[ci];
            if (mirror) { d[(n / 2 - 1 - k) * n + x] = c; d[(n / 2 + k) * n + x] = X.shade(c, 0.5); }
            else if (form === 'Hanging') d[k * n + x] = c;
            else d[(n - 1 - k) * n + x] = c;
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Polyominoes', fam: 'Arithmetic', sizes: [100, 200], fps: 10,
    recipe: 'Every shape that can be made from five, six or seven squares joined edge to edge, each counted once however it is turned or flipped, laid out in rows and each turning a quarter at its own moment.',
    make(R, U, g) {
      // the 108 seven-square shapes only fit the finer grid; on the coarser one they would be single-cell scribbles
      const { n, d } = g, K = Math.min(R.pick([5, 6, 6, 7]), n >= 200 ? 7 : 6);
      const norm = cells => { const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(([x, y]) => [x - mx, y - my]).sort((p, q) => p[0] - q[0] || p[1] - q[1]); };
      const key = cells => norm(cells).map(c => c.join(',')).join(';');
      const forms = cells => { const out = []; let c = cells; for (let f = 0; f < 2; f++) { for (let r = 0; r < 4; r++) { out.push(norm(c)); c = c.map(([x, y]) => [-y, x]); } c = c.map(([x, y]) => [-x, y]); } return out; };
      const canon = cells => forms(cells).map(key).sort()[0];
      let set = new Map([[canon([[0, 0]]), [[0, 0]]]]);
      for (let s = 1; s < K; s++) {
        const next = new Map();
        for (const cells of set.values()) for (const [x, y] of cells) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          if (cells.some(c => c[0] === x + dx && c[1] === y + dy)) continue;
          const grown = [...cells, [x + dx, y + dy]], k = canon(grown);
          if (!next.has(k)) next.set(k, norm(grown));
        }
        set = next;
      }
      // as many rows as the pieces need, so the sheet fills the frame top to bottom
      const pieces = [...set.values()];
      // the order the pieces are set out in, how each square is drawn, and how the sheet is coloured
      const order = X.VG.pick(g, 'Order', 'As found', ['As found', 'As found', 'Long to round', 'Shuffled']), style = X.VG.pick(g, 'Squares', 'Bevelled', ['Bevelled', 'Bevelled', 'Hollow', 'Flat']), colour = X.VG.pick(g, 'Colour', 'Cycling', ['Cycling', 'Cycling', 'By row', 'One ink']);
      if (order === 'Long to round') { const spread = p => { let mx = 0; for (const [a, b] of p) for (const [c, e] of p) mx = Math.max(mx, Math.abs(a - c) + Math.abs(b - e)); return mx; }; pieces.sort((p, q) => spread(q) - spread(p)); }
      else if (order === 'Shuffled') g.alt.shuffle(pieces);
      const cols = Math.ceil(Math.sqrt(pieces.length)), rows = Math.ceil(pieces.length / cols), bwx = Math.floor(n / cols), bwy = Math.floor(n / rows), box = Math.min(bwx, bwy), scale = Math.max(1, Math.floor((box - 2) / K)), inks = X.VG.inksN(R, 8, 0.5);
      const ox = Math.floor((n - cols * bwx) / 2), oy = Math.floor((n - rows * bwy) / 2);
      const state = pieces.map((p, i) => ({ p, r: R.int(0, 3), next: R.range(1, 6), c: colour === 'By row' ? inks[Math.floor(i / cols) % inks.length] : colour === 'One ink' ? inks[2 % inks.length] : inks[i % inks.length], flash: 0, turns: [] }));
      g.trait('Size', K + ' squares'); g.trait('Palette', inks.name); g.trait('Grid', n);
      // each piece's four turns, worked out once
      for (const st of state) { let c = st.p; for (let k = 0; k < 4; k++) { const cn = norm(c); st.turns.push({ c: cn, w: Math.max(...cn.map(q => q[0])) + 1, h: Math.max(...cn.map(q => q[1])) + 1 }); c = c.map(([x, y]) => [-y, x]); } }
      const ground = R.bool(0.5) ? BLACK : X.shade(inks[0], 0.12);
      return t => {
        d.fill(ground);
        state.forEach((s, i) => {
          // a piece that turns flashes light for a moment, so the eye catches each quarter turn
          if (t > s.next) { s.r = (s.r + 1) % 4; s.next = t + R.range(2, 6); s.flash = 1; }
          const { c, w, h } = s.turns[s.r], bx = ox + (i % cols) * bwx + Math.floor((bwx - w * scale) / 2), by = oy + Math.floor(i / cols) * bwy + Math.floor((bwy - h * scale) / 2);
          const col = s.flash > 0.05 ? X.mixPk(s.c, WHITE, s.flash * 0.55) : s.c;
          s.flash *= 0.7;
          for (const [x, y] of c) { X.rect(g, bx + x * scale, by + y * scale, scale, scale, col); if (style === 'Hollow' && scale > 2) { X.rect(g, bx + x * scale + 1, by + y * scale + 1, scale - 2, scale - 2, X.mixPk(ground, col, 0.25)); continue; } if (style === 'Bevelled' && scale > 2) { X.rect(g, bx + x * scale, by + y * scale, scale, 1, X.mixPk(col, WHITE, 0.35)); X.rect(g, bx + x * scale, by + y * scale + scale - 1, scale, 1, X.shade(col, 0.6)); } }
        });
      };
    },
  });

  P.addPixel({
    name: 'Wythoff', seed: 2, fam: 'Arithmetic', sizes: [80, 100],
    recipe: 'A queen may only move left, down or diagonally toward the corner. Each cell holds the game value of a queen standing there; a window of values sweeps the board.',
    make(R, U, g) {
      const { n, d } = g, G = new Uint16Array(n * n), seen = new Uint8Array(4 * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        seen.fill(0);
        for (let k = 0; k < x; k++) seen[G[y * n + k]] = 1;
        for (let k = 0; k < y; k++) seen[G[k * n + x]] = 1;
        for (let k = 1; k <= Math.min(x, y); k++) seen[G[(y - k) * n + x - k]] = 1;
        let m = 0; while (seen[m]) m++;
        G[y * n + x] = m;
      }
      const sc = U.scheme(R), dark = U.dim(sc.lut, 0.32), width = R.int(8, 18), spd = R.range(4, 9), flipX = R.bool(), flipY = R.bool(0.7), hm = R.pick([2, 3, 5]);
      return t => {
        const c = (t * spd) % (2 * n);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const v = G[(flipY ? n - 1 - y : y) * n + (flipX ? n - 1 - x : x)];
          d[i] = v === 0 ? 0xffffffff : ((v - c) % (2 * n) + 2 * n) % (2 * n) < width ? sc.lut[(v * hm) & 255] : dark[(v * hm) & 255];
        }
      };
    },
  });
})();
