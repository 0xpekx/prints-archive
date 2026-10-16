// Residue: cell fields made from modular arithmetic and number theory.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);

  // A cell grid for the newer variations of plot prototypes: drawn into pixels, then laid crisp over the stage.
  function pixelStage(g, n) {
    const off = document.createElement('canvas'); off.width = off.height = n;
    const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
    const pg = { n, d, S: g.S, input: g.input, sound: g.sound, home: g.home, alt: g.alt, trait: g.trait };
    pg.flush = () => { octx.putImageData(img, 0, 0); g.ctx.imageSmoothingEnabled = false; g.ctx.drawImage(off, 0, 0, 1000, 1000); };
    return pg;
  }

  // The pointer in the large view (0..1), held a few seconds after it leaves; null when idle.
  function pointer(g) {
    let idle = 99, x = 0.5, y = 0.5;
    return dt => {
      const p = g.input;
      if (p.inside) { idle = 0; x = p.x; y = p.y; } else idle += dt || 0.05;
      return idle < 3 ? { x, y, down: p.down } : null;
    };
  }

  // The pointer blended over a piece's own motion: w eases to 1 while the pointer is in and back to 0 a couple of
  // seconds after it leaves, so nothing jumps when a hand comes and goes (and with no pointer the piece runs exactly as before).
  function hand(g) {
    const h = { w: 0, x: 0.5, y: 0.5, idle: 99 };
    h.update = dt => { const p = g.input; if (p.inside) { h.idle = 0; h.x = p.x; h.y = p.y; h.w += (1 - h.w) * 0.12; } else if ((h.idle += dt || 1 / 12) > 2) { h.w *= 0.93; if (h.w < 0.002) h.w = 0; } return h; };
    h.mix = (own, theirs) => h.w ? own + (theirs - own) * h.w : own;
    return h;
  }

  P.add({
    name: 'Quadratic Residue', fam: 'Residue', type: 'px', n: 100,
    interactive: 'Move the pointer to move the centre of the rings.',
    recipe: 'Each cell is a polynomial of its distance from a centre, taken mod m, with m slowly swelling so the rings breathe outward. The polynomial (circles, ellipses, hyperbolas, cubics or diamonds) and its centres change with every seed.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), ptr = pointer(g);
      const form = R.pick(['quad', 'quad', 'hyper', 'cubic', 'diamond', 'twin', 'product']);
      const ky = R.pick([1, 1, 2, -1, 0.5, 3]), kxy = R.pick([0, 0, 0, 1, -1]);
      const m0 = form === 'cubic' ? R.range(800, 4000) : form === 'diamond' ? R.range(14, 40) : form === 'product' ? R.range(20, 90) : R.range(26, 110);
      const rate = R.range(0.0005, 0.0011) * R.sign(), drift = R.range(3, 8) * R.sign(), voids = R.pick([0.93, 0.93, 0.85, 0.75]), sym = R.pick([1, 1, 2, 4]);
      const hx = n / 2 + R.pick([0, 0, R.range(-35, 35)]), hy = n / 2 + R.pick([0, 0, R.range(-35, 35)]), sep = R.range(12, 30);
      let cx = hx, cy = hy;
      const f = (dx, dy) => {
        if (sym > 1) { dx = Math.abs(dx); if (sym > 2) dy = Math.abs(dy); }
        switch (form) {
          case 'hyper': return dx * dx - ky * dy * dy + kxy * dx * dy;
          case 'cubic': return dx * dx * dx + ky * dy * dy * dy;
          case 'diamond': { const a = Math.abs(dx) + Math.abs(dy); return a * a / 6 + kxy * dx; }
          case 'twin': { const a = (dx - sep) * (dx - sep) + dy * dy, b = (dx + sep) * (dx + sep) + dy * dy; return Math.sqrt(a * b) / 2; }
          case 'product': return dx * dy;
          default: return dx * dx + ky * dy * dy + kxy * dx * dy;
        }
      };
      return (t, dt) => {
        const p = ptr(dt), tx = p ? p.x * n : hx, ty = p ? p.y * n : hy;
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        const m = m0 * (1 + rate * t), hd = t * drift;
        for (let y = 0, i = 0; y < n; y++) {
          const dy = y - cy + 0.5;
          for (let x = 0; x < n; x++, i++) {
            const fr = (Math.abs(f(x - cx + 0.5, dy)) % m) / m;
            d[i] = fr > voids || fr < 0.012 ? BLACK : sc.lut[(fr * 256 + hd) & 255];
          }
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer to move the origin of the fans.',
    name: 'Continued Fraction', seed: 1, fam: 'Residue', type: 'px', n: 120,
    recipe: 'Every direction from an origin is a ratio; its continued fraction picks the colour, fans within fans. The origin wanders, or repeats across a lattice of tiles, or mirrors into a kaleidoscope, depending on the seed.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, 0.45);
        const w = [R.int(20, 60), R.int(30, 90), R.int(40, 110), R.int(20, 70)], depth = R.pick([3, 3, 4]), voidAt = R.pick([1, 1, 2]);
        const ax = R.range(0.04, 0.08), ay = R.range(0.04, 0.08), ph = R.range(0, 6), drift = R.range(3, 7) * R.sign(), reach = R.range(0.15, 0.6), fold = R.bool(0.5);
        const hnd = hand(g);
        g.trait('Palette', palName(sc)); g.trait('Layout', 'Single'); g.trait('Depth', depth); g.trait('Fold', fold ? 'Folded' : 'Open');
        return t => {
          const hh = hnd.update(), ox = hh.mix(n * (0.5 + reach * Math.sin(t * ax + ph)), hh.x * n), oy = hh.mix(n * (0.5 + reach * Math.cos(t * ay)), hh.y * n), hd = t * drift;
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            let a = Math.abs(x + 0.5 - ox), b = Math.abs(y + 0.5 - oy), s = 0, last = 0;
            if (fold && a < b) { const tmp = a; a = b; b = tmp; }
            let r = (b + 0.02) / (a + 0.02);
            for (let k = 0; k < depth; k++) { const q = Math.min(9, Math.floor(r)); s += q * w[k]; last = q; r -= q; if (r < 1e-3) break; r = 1 / r; }
            d[i] = last === voidAt ? BLACK : (last & 1 ? low : sc.lut)[(s + hd) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, R.pick([0.25, 0.45, 0.6])), ptr = pointer(g);
      const w = [R.int(20, 60), R.int(30, 90), R.int(40, 110), R.int(20, 70), R.int(10, 50)], depth = R.pick([2, 3, 3, 4, 5]), voidAt = R.pick([1, 1, 2, 0, 3]);
      const ax = R.range(0.04, 0.08), ay = R.range(0.04, 0.08), ph = R.range(0, 6), drift = R.range(3, 7) * R.sign(), reach = R.range(0.15, 0.6), fold = R.bool(0.5);
      const layout = R.pick(['one', 'one', 'tiles', 'tiles', 'kaleido']), tile = R.pick([24, 30, 40, 60]), cap = R.pick([5, 9, 9, 15]);
      let ox = n / 2, oy = n / 2;
      g.trait('Palette', palName(sc)); g.trait('Layout', { one: 'Single', tiles: 'Tiles', kaleido: 'Kaleidoscope' }[layout]); g.trait('Depth', depth); g.trait('Fold', fold ? 'Folded' : 'Open');
      return (t, dt) => {
        const p = ptr(dt);
        const tx = p ? p.x * n : n * (0.5 + reach * Math.sin(t * ax + ph)), ty = p ? p.y * n : n * (0.5 + reach * Math.cos(t * ay));
        ox += (tx - ox) * 0.2; oy += (ty - oy) * 0.2;
        const hd = t * drift;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let a, b;
          if (layout === 'tiles') { a = Math.abs((((x - ox) % tile) + tile) % tile - tile / 2 + 0.5); b = Math.abs((((y - oy) % tile) + tile) % tile - tile / 2 + 0.5); }
          else if (layout === 'kaleido') { a = Math.abs(Math.abs(x + 0.5 - n / 2) - Math.abs(ox - n / 2)); b = Math.abs(Math.abs(y + 0.5 - n / 2) - Math.abs(oy - n / 2)); }
          else { a = Math.abs(x + 0.5 - ox); b = Math.abs(y + 0.5 - oy); }
          let s = 0, last = 0;
          if (fold && a < b) { const tmp = a; a = b; b = tmp; }
          let r = (b + 0.02) / (a + 0.02);
          for (let k = 0; k < depth; k++) { const q = Math.min(cap, Math.floor(r)); s += q * w[k]; last = q; r -= q; if (r < 1e-3) break; r = 1 / r; }
          d[i] = last === voidAt ? BLACK : (last & 1 ? low : sc.lut)[(s + hd) & 255];
        }
      };
    },
  });
  P.add({
    name: 'Reciprocals', fam: 'Residue', type: 'px', n: 72,
    recipe: 'Each band is the endless expansion of 1/n in a small base, one colour per digit, sliding past at its own period. Bands run across or down, mirror about the middle or weave both ways, in bases from two to ten.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), b = R.pick([2, 3, 3, 4, 5]), y0 = R.int(3, 9), tall = R.pick([2, 3]), rows = Math.ceil(n / tall);
        const dens = Array.from({ length: rows }, (_, i) => y0 + i), rem = new Float64Array(rows).fill(1);
        const drift = R.range(1.5, 4) * R.sign(), speed = R.range(3, 5), byRow = R.bool(0.5);
        let pos = 0;
        g.trait('Palette', palName(sc)); g.trait('Base', b); g.trait('Band', tall); g.trait('Layout', 'Across'); g.trait('Colour', byRow ? 'By row' : 'By digit');
        return t => {
          const want = Math.floor(t * speed), hd = t * drift;
          for (; pos < want; pos++) for (let k = 0; k < rows; k++) rem[k] = (rem[k] * b) % dens[k];
          for (let y = 0; y < n; y++) {
            const k = Math.floor(y / tall), den = dens[k];
            let r = rem[k];
            for (let x = 0; x < n; x++) {
              const digit = Math.floor(r * b / den);
              r = (r * b) % den;
              d[y * n + x] = digit === 0 ? BLACK : sc.lut[((byRow ? k * 9 : 0) + digit * 256 / b + hd) & 255];
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), b = R.pick([2, 3, 3, 4, 5, 7]), y0 = R.int(3, 19), tall = R.pick([2, 3, 3, 4]), rows = Math.ceil(n / tall);
      const step = R.pick([1, 1, 2, 3]), dens = Array.from({ length: rows }, (_, i) => y0 + i * step), rem = new Float64Array(rows).fill(1);
      const drift = R.range(1.5, 4) * R.sign(), speed = R.range(3, 5), byRow = R.bool(0.5), layout = R.pick(['across', 'across', 'down', 'mirror', 'quad']);
      const zero = R.pick(['void', 'void', 'dim']), dimLut = U.dim(sc.lut, 0.3);
      const grid = new Uint8Array(n * n);
      let pos = 0;
      g.trait('Palette', palName(sc)); g.trait('Base', b); g.trait('Band', tall); g.trait('Layout', { across: 'Across', down: 'Down', mirror: 'Mirror', quad: 'Quad' }[layout]); g.trait('Colour', byRow ? 'By row' : 'By digit'); g.trait('Zeros', zero === 'void' ? 'Void' : 'Dim');
      return t => {
        const want = Math.floor(t * speed), hd = t * drift;
        for (; pos < want; pos++) for (let k = 0; k < rows; k++) rem[k] = (rem[k] * b) % dens[k];
        for (let y = 0; y < n; y++) {
          const k = Math.floor(y / tall), den = dens[k];
          let r = rem[k];
          for (let x = 0; x < n; x++) { grid[y * n + x] = Math.floor(r * b / den); r = (r * b) % den; }
        }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let gx = x, gy = y, digit;
          if (layout === 'down') { gx = y; gy = x; }
          else if (layout === 'mirror') gx = Math.abs(x - (n >> 1));
          else if (layout === 'quad') { gx = Math.abs(x - (n >> 1)); gy = Math.abs(y - (n >> 1)) * 2; }
          digit = grid[Math.min(n - 1, gy) * n + gx];
          const k = Math.floor(gy / tall), c = ((byRow ? k * 9 : 0) + digit * 256 / b + hd) & 255;
          d[i] = digit === 0 ? (zero === 'void' ? BLACK : dimLut[c]) : sc.lut[c];
        }
      };
    },
  });
  P.add({
    interactive: 'Move the pointer to pan across the primes.',
    name: 'Gaussian Primes', seed: 2, fam: 'Residue', type: 'px', n: 121,
    recipe: 'The primes of the complex integers lit on black, on the square lattice or, for Eisenstein primes, on a lattice of hexagons; at several zooms, coloured by distance, by angle or by which prime they are.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, 0.22), reach = 40, lim = 2 * (n / 2 + reach + 2) ** 2 | 0;
        const comp = new Uint8Array(lim + 1); comp[0] = comp[1] = 1;
        for (let i = 2; i * i <= lim; i++) if (!comp[i]) for (let j = i * i; j <= lim; j += i) comp[j] = 1;
        const semi = new Uint8Array(lim + 1);   // exactly two prime factors: a faint ground
        for (let i = 2; i * i <= lim; i++) if (!comp[i]) for (let j = i; i * j <= lim; j++) if (!comp[j]) semi[i * j] = 1;
        const k = R.range(5, 12), speed = R.range(10, 22), ax = R.range(0.03, 0.07), ay = R.range(0.03, 0.07), ph = R.range(0, 6), ghosts = R.bool(0.6);
        const hnd = hand(g);
        g.trait('Palette', palName(sc)); g.trait('Lattice', 'Square'); g.trait('Zoom', 1); g.trait('Colour', 'Rings'); g.trait('Ghosts', ghosts ? 'Shown' : 'None');
        return t => {
          const hh = hnd.update(), px = Math.round(hh.mix(reach * Math.sin(t * ax + ph), (hh.x - 0.5) * 2 * reach)), py = Math.round(hh.mix(reach * Math.sin(t * ay), (hh.y - 0.5) * 2 * reach)), hd = t * speed, h = n >> 1;
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const a = Math.abs(x - h + px), b = Math.abs(y - h + py), norm = a * a + b * b;
            const prime = a && b ? !comp[norm] : !comp[a + b] && (a + b) % 4 === 3;
            const c = (Math.sqrt(norm) * k - hd) & 255;
            d[i] = prime ? sc.lut[c] : ghosts && semi[norm] ? low[c] : BLACK;
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, 0.22), ptr = pointer(g);
      const lattice = R.pick(['gauss', 'gauss', 'eisen']), zoom = R.pick([1, 1, 2, 3, 4]), colourBy = R.pick(['ring', 'ring', 'angle', 'norm']);
      const reach = 40, span = Math.ceil(n / zoom) + 2 * reach + 8, lim = 2 * span * span;
      const comp = new Uint8Array(lim + 1); comp[0] = comp[1] = 1;
      for (let i = 2; i * i <= lim; i++) if (!comp[i]) for (let j = i * i; j <= lim; j += i) comp[j] = 1;
      const semi = new Uint8Array(lim + 1);   // exactly two prime factors: a faint ground
      for (let i = 2; i * i <= lim; i++) if (!comp[i]) for (let j = i; i * j <= lim; j++) if (!comp[j]) semi[i * j] = 1;
      const k = R.range(5, 12) * zoom, speed = R.range(10, 22), ax = R.range(0.03, 0.07), ay = R.range(0.03, 0.07), ph = R.range(0, 6), ghosts = R.bool(0.6);
      const gaussPrime = (a, b) => { a = Math.abs(a); b = Math.abs(b); return a && b ? !comp[a * a + b * b] : !comp[a + b] && (a + b) % 4 === 3; };
      // a + b·ω (ω a cube root of one): norm a² - ab + b²; prime if the norm is prime, or an associate of a prime 2 mod 3
      const eisenPrime = (a, b) => {
        const nm = a * a - a * b + b * b;
        if (nm < 0 || nm > lim) return false;
        if (!comp[nm]) return true;
        const r = Math.round(Math.sqrt(nm));
        if (r * r !== nm || comp[r] || r % 3 !== 2) return false;
        return a === 0 || b === 0 || a === b;
      };
      const S3 = Math.sqrt(3) / 2;
      let px = 0, py = 0;
      g.trait('Palette', palName(sc)); g.trait('Lattice', lattice === 'gauss' ? 'Square' : 'Hexagonal'); g.trait('Zoom', zoom); g.trait('Colour', { ring: 'Rings', angle: 'Angle', norm: 'Size' }[colourBy]); g.trait('Ghosts', ghosts ? 'Shown' : 'None');
      return (t, dt) => {
        const p = ptr(dt);
        const tx = p ? (p.x - 0.5) * 2 * reach : reach * Math.sin(t * ax + ph), ty = p ? (p.y - 0.5) * 2 * reach : reach * Math.sin(t * ay);
        px += (tx - px) * 0.15; py += (ty - py) * 0.15;
        const hd = t * speed, h = n / 2;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const u = (x - h + 0.5) / zoom + px, v = (y - h + 0.5) / zoom + py;
          let a, b, prime, nm, ang;
          if (lattice === 'gauss') { a = Math.round(u); b = Math.round(v); prime = gaussPrime(a, b); nm = a * a + b * b; ang = Math.atan2(b, a); }
          else {
            b = Math.round(v / S3); a = Math.round(u + b / 2);
            prime = eisenPrime(a, b); nm = a * a - a * b + b * b; ang = Math.atan2(b * S3, a - b / 2);
          }
          const c = (colourBy === 'angle' ? ang * 40.7 + hd : colourBy === 'norm' ? nm * 0.37 + hd * 0.2 : Math.sqrt(nm) * k / zoom - hd) & 255;
          d[i] = prime ? sc.lut[c] : ghosts && nm <= lim && semi[nm] ? low[c] : BLACK;
        }
      };
    },
  });
  P.add({
    name: 'Sieve', seed: 2, fam: 'Residue', type: 'px', n: 90,
    recipe: 'The numbers laid out in rows or wound into Ulam’s square spiral, struck out prime by prime as Eratosthenes did; each takes the colour of the first prime to reach it, and what is left stays white.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), WHITE = 0xffffffff, DIM = U.pk(U.mix(U.ramp(sc.cols, 0.5, true), [24, 24, 30], 0.66));   // undecided numbers: a dusky tint of the palette, not a flat grey
        let W, N, cell, mark, p, pk, m, state, hold, born = 0, cols, step;
        const reset = t => {
          W = R.pick([18, 30, 30, 40, 42, 44, 45, 84, 88, 90]); cell = Math.floor(n / W); N = W * Math.floor(n / cell);
          mark = new Uint8Array(N + 1); for (let v = 4; v <= N; v += 2) mark[v] = 1; p = 3; pk = 2; m = 9; state = 'run'; hold = 0; born = t; step = R.int(23, 61);
          cols = [BLACK, ...Array.from({ length: 40 }, (_, i) => sc.lut[(i * step) & 255])];
          cols[1] = BLACK;                        // multiples of two are left as void
        };
        const strike = budget => {
          while (budget > 0 && state === 'run') {
            if (m > N) { do p++; while (p * p <= N && mark[p]); if (p * p > N) { state = 'hold'; break; } pk++; m = p * p; continue; }
            if (!mark[m]) { mark[m] = Math.min(40, pk); budget--; }
            m += p;
          }
        };
        reset(0);
        g.trait('Palette', palName(sc)); g.trait('Layout', 'Rows'); g.trait('First board', W + ' wide'); g.trait('Struck', 'Bright');
        return (t, dt) => {
          if (state === 'run') strike(Math.max(20, Math.round(N / 150)));
          else if ((hold += dt) > 6) reset(t);
          const off = Math.floor((n - W * cell) / 2);
          d.fill(BLACK);
          for (let v = 2; v <= N; v++) {
            const c = mark[v] ? cols[mark[v]] : v < p * p || state === 'hold' ? WHITE : DIM, x0 = off + ((v - 1) % W) * cell, y0 = Math.floor((v - 1) / W) * cell;
            if (c === BLACK) continue;
            for (let yy = 0; yy < cell; yy++) for (let xx = 0; xx < cell; xx++) d[(y0 + yy) * n + x0 + xx] = c;
          }
          if (state === 'run' && m <= N) { const x0 = off + ((m - 1) % W) * cell, y0 = Math.floor((m - 1) / W) * cell; if (y0 < n) d[y0 * n + x0] = WHITE; }
          U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, state === 'hold' ? (6 - hold) / 1.2 : 1));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), WHITE = 0xffffffff, DIM = U.pk(U.mix(U.ramp(sc.cols, 0.5, true), [24, 24, 30], 0.66));   // undecided numbers: a dusky tint of the palette, not a flat grey
      let W, N, cell, mark, p, pk, m, state, hold, born = 0, cols, step, X, Y, spiral;
      // Ulam's spiral: number v sits at (X[v], Y[v]) in a side x side grid
      const wind = side => {
        const xs = new Int16Array(side * side + 1), ys = new Int16Array(side * side + 1);
        let x = Math.floor((side - 1) / 2), y = Math.floor(side / 2), dx = 1, dy = 0, run = 1, v = 1;
        xs[1] = x; ys[1] = y;
        while (v < side * side) {
          for (let rep = 0; rep < 2 && v < side * side; rep++) {
            for (let s = 0; s < run && v < side * side; s++) { x += dx; y += dy; v++; xs[v] = x; ys[v] = y; }
            const ndx = dy, ndy = -dx; dx = ndx; dy = ndy;
          }
          run++;
        }
        return [xs, ys];
      };
      const reset = t => {
        spiral = R.bool(0.5);
        if (spiral) { cell = R.pick([1, 2, 2, 3]); W = Math.floor(n / cell); N = W * W; [X, Y] = wind(W); }
        else { W = R.pick([18, 30, 30, 40, 42, 44, 45, 84, 88, 90]); cell = Math.floor(n / W); N = W * Math.floor(n / cell); }
        mark = new Uint8Array(N + 1); for (let v = 4; v <= N; v += 2) mark[v] = 1; p = 3; pk = 2; m = 9; state = 'run'; hold = 0; born = t; step = R.int(23, 61);
        // on the spiral the struck numbers stay dim, so the primes' diagonals stand out as they are left behind
        const lut = spiral ? U.dim(sc.lut, 0.4) : sc.lut;
        cols = [BLACK, ...Array.from({ length: 40 }, (_, i) => lut[(i * step) & 255])];
        cols[1] = spiral ? U.dim(sc.lut, 0.18)[(step * 3) & 255] : BLACK;   // multiples of two: void, or a faint ground on the spiral
      };
      const strike = budget => {
        while (budget > 0 && state === 'run') {
          if (m > N) { do p++; while (p * p <= N && mark[p]); if (p * p > N) { state = 'hold'; break; } pk++; m = p * p; continue; }
          if (!mark[m]) { mark[m] = Math.min(40, pk); budget--; }
          m += p;
        }
      };
      const at = v => spiral ? [X[v] * cell, Y[v] * cell] : [((v - 1) % W) * cell, Math.floor((v - 1) / W) * cell];
      reset(0);
      g.trait('Palette', palName(sc)); g.trait('Layout', 'Rows or spiral'); g.trait('First board', spiral ? 'Ulam spiral' : W + ' wide'); g.trait('Struck', spiral ? 'Dim' : 'Bright');
      return (t, dt) => {
        if (state === 'run') strike(Math.max(20, Math.round(N / 150)));
        else if ((hold += dt) > 6) reset(t);
        const off = Math.floor((n - W * cell) / 2);
        d.fill(BLACK);
        for (let v = 2; v <= N; v++) {
          const c = mark[v] ? cols[mark[v]] : v < p * p || state === 'hold' ? WHITE : DIM;
          if (c === BLACK) continue;
          const [x0, y0] = at(v);
          for (let yy = 0; yy < cell; yy++) for (let xx = 0; xx < cell; xx++) { const yv = y0 + yy + (spiral ? off : 0), xv = off + x0 + xx; if (yv < n && xv < n) d[yv * n + xv] = c; }
        }
        if (state === 'run' && m <= N) { const [x0, y0] = at(m), yv = y0 + (spiral ? off : 0); if (yv < n) d[yv * n + off + x0] = WHITE; }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, state === 'hold' ? (6 - hold) / 1.2 : 1));
      };
    },
  });
  P.add({
    name: 'Collatz Strata', seed: 2, fam: 'Residue', type: 'px', n: 100,
    recipe: 'Each column is a number falling through the 3n+1 rule (or a cousin of it); height sets the colour and the run ends in black. The columns hang, stand, lie on their side or mirror, and the starting numbers count up, leap or run through squares.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, 0.55);
        const start = R.int(3, 400), speed = R.range(1.5, 3), band = R.range(3, 7), drift = R.range(2, 6) * R.sign(), mul = 3, up = R.bool();
        g.trait('Palette', palName(sc)); g.trait('Rule', '3n+1'); g.trait('Direction', up ? 'Rising' : 'Hanging'); g.trait('Starts', 'Counting'); g.trait('Mirror', 'None');
        return t => {
          const off = start + Math.floor(t * speed), hd = t * drift;
          for (let x = 0; x < n; x++) {
            let v = off + x;
            for (let y = 0; y < n; y++) {
              const i = (up ? n - 1 - y : y) * n + x;
              if (v <= 1 || v > 1e12) { d[i] = BLACK; continue; }
              d[i] = (v & 1 ? sc.lut : low)[(Math.log2(v) * band + hd) & 255];
              v = v % 2 === 0 ? v / 2 : (mul * v + 1) / 2;
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), low = U.dim(sc.lut, R.pick([0.35, 0.55, 0.7]));
      const rule = R.pick(['3n+1', '3n+1', '3n+1', '3n-1', '5n+1', '7n+1']), mul = +rule[0], add = rule[2] === '-' ? -1 : 1;
      const start = R.int(3, 400), speed = R.range(1.5, 3), band = R.range(3, 7), drift = R.range(2, 6) * R.sign(), up = R.bool(), side = R.bool(0.3), mirror = R.bool(0.25);
      const stride = R.pick([1, 1, 1, 2, 3, 7]), squares = R.bool(0.15);
      g.trait('Palette', palName(sc)); g.trait('Rule', rule); g.trait('Direction', side ? 'Sideways' : up ? 'Rising' : 'Hanging'); g.trait('Starts', squares ? 'Squares' : stride === 1 ? 'Counting' : 'Every ' + stride); g.trait('Mirror', mirror ? 'Mirrored' : 'None');
      return t => {
        const off = start + Math.floor(t * speed), hd = t * drift, cols = mirror ? n >> 1 : n;
        for (let x = 0; x < cols; x++) {
          let v = squares ? (off + x) * (off + x) : off + x * stride;
          for (let y = 0; y < n; y++) {
            const yy = up ? n - 1 - y : y;
            const c = v <= 1 || v > 1e12 || !Number.isFinite(v) ? BLACK : (v & 1 ? sc.lut : low)[(Math.log2(v) * band + hd) & 255];
            d[side ? x * n + yy : yy * n + x] = c;
            if (mirror) d[side ? (n - 1 - x) * n + yy : yy * n + n - 1 - x] = c;
            if (v > 1) v = v % 2 === 0 ? v / 2 : (mul * v + add) / 2;
            if (v === 1 && add < 0) v = 0;   // 3n - 1 has other cycles; end the run at one
          }
        }
      };
    },
  });
  P.add({
    name: 'Hyperbola Bits', seed: 1, fam: 'Residue', type: 'px', n: 112,
    recipe: 'Three binary digits of a product of the coordinates pick the colour, so the bands follow hyperbolas (or circles, saddles or diamonds, depending on the seed) and slide as the product counts up.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), shift = R.int(5, 9), ox = R.int(0, 60), oy = R.int(0, 60);
      const op = R.pick(['xy', 'xy', 'sq', 'saddle', 'xor', 'diamond', 'cube']), sym = R.pick(['mirror', 'mirror', 'none', 'quad']);
      const speed = R.range(5, 12) * (1 << Math.max(0, shift - 5)) * R.sign(), levels = R.pick([4, 8, 8, 16]);
      const cols = new Uint32Array(levels), soft = new Uint32Array(levels), dark = R.bool(0.7);
      for (let i = 1; i < levels; i++) { const c = U.ramp(sc.cols, (i - 1) / (levels - 1), true); cols[i] = U.pk(c); soft[i] = U.pk(U.mix(c, [0, 0, 0], 0.35)); }
      cols[0] = soft[0] = dark ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.8));
      const prod = (a, b) => op === 'sq' ? (a * a + b * b) / 4 : op === 'saddle' ? Math.abs(a * a - b * b) / 2 : op === 'xor' ? (a ^ b) * (a + b) / 8 : op === 'diamond' ? (a + b) * (a + b) / 3 : op === 'cube' ? a * b * (a + b) / 64 : a * b;
      const lb = Math.log2(levels);
      return t => {
        const off = Math.floor(t * speed) + (1 << 20);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const cx = Math.abs(x - n / 2 + 0.5), cy = Math.abs(y - n / 2 + 0.5);
          const a = (sym === 'none' ? x : sym === 'quad' ? Math.min(cx, cy) : cx) + ox, b = (sym === 'quad' ? Math.max(cx, cy) : sym === 'none' ? y : cy) + oy;
          const v = Math.floor(prod(a | 0, b | 0)) + off;
          d[i] = ((v >> (shift - 2)) & 1 ? cols : soft)[(v >> (shift + 3 - lb)) & (levels - 1)];
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer across to zoom in on the road to chaos.',
    name: 'Bifurcation', seed: 1, fam: 'Residue', type: 'px', n: 160,
    recipe: 'A population map run in every column at a slightly higher growth rate: order forks, then dissolves into chaos.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols);
        const map = R.pick(['logistic', 'logistic', 'sine', 'cubic']), flip = R.bool(0.4), vertical = R.bool(0.3);
        const [lo, hi, top] = map === 'logistic' ? [2.95, 4, 1] : map === 'sine' ? [0.71, 1, 1] : [1.95, 2.598, 1.02];
        const hist = new Float32Array(n * n), state = new Float32Array(n).map(() => R.range(0.2, 0.8));
        const l0 = R.range(0.05, 0.3), l1 = R.range(0.5, 0.72), rate = R.range(0.05, 0.09), ph = R.range(0, 6);
        g.trait('Palette', palName(sc)); g.trait('Map', { logistic: 'Logistic', sine: 'Sine', cubic: 'Cubic' }[map]); g.trait('Orientation', vertical ? 'Upright' : 'Level'); g.trait('Mirror', flip ? 'Flipped' : 'Plain');
        const feed = left => {
          for (let i = 0; i < hist.length; i++) hist[i] *= 0.88;
          for (let x = 0; x < n; x++) {
            const r = left + (hi - left) * (x + 0.5) / n;
            let v = state[x];
            for (let k = 0; k < 90; k++) {
              v = map === 'logistic' ? r * v * (1 - v) : map === 'sine' ? r * Math.sin(Math.PI * v) : r * v * (1 - v * v);
              if (!(v > 0 && v < top)) v = 0.3 + 0.4 * ((x * 7 + k) % 10) / 10;
              const yy = Math.min(n - 1, Math.floor(v / top * (n - 6)) + 3);
              hist[(flip ? yy : n - 1 - yy) * n + x] += 1;
            }
            state[x] = v;
          }
        };
        // the picture builds up over a few frames: build it before the first one
        for (let k = 0; k < 30; k++) feed(lo + (hi - lo) * U.lerp(l0, l1, 0.5 - 0.5 * Math.cos(ph)));
        const hnd = hand(g);
        return t => {
          const hh = hnd.update();
          feed(lo + (hi - lo) * hh.mix(U.lerp(l0, l1, 0.5 - 0.5 * Math.cos(t * rate + ph)), Math.min(0.97, hh.x)));
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const h = vertical ? hist[x * n + y] : hist[i];
            d[i] = h < 0.5 ? BLACK : heat[Math.min(255, 50 + Math.log(1 + h) * 34) | 0];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols);
      const map = R.pick(['logistic', 'logistic', 'sine', 'cubic', 'logistic']), flip = R.bool(0.4), vertical = R.bool(0.3);
      const [lo, hi, top] = map === 'logistic' ? [2.95, 4, 1] : map === 'sine' ? [0.71, 1, 1] : map === 'cubic' ? [1.95, 2.598, 1.02] : [1, 2, 1];
      const hist = new Float32Array(n * n), state = new Float32Array(n).map(() => R.range(0.2, 0.8));
      const l0 = R.range(0.05, 0.3), l1 = R.range(0.5, 0.72), rate = R.range(0.05, 0.09), ph = R.range(0, 6);
      let left = lo + (hi - lo) * l0;
      g.trait('Palette', palName(sc)); g.trait('Map', { logistic: 'Logistic', sine: 'Sine', cubic: 'Cubic' }[map] || 'Logistic'); g.trait('Orientation', vertical ? 'Upright' : 'Level'); g.trait('Mirror', flip ? 'Flipped' : 'Plain');
      const feed = () => {
        for (let i = 0; i < hist.length; i++) hist[i] *= 0.88;
        for (let x = 0; x < n; x++) {
          const r = left + (hi - left) * (x + 0.5) / n;
          let v = state[x];
          for (let k = 0; k < 90; k++) {
            if (map === 'logistic') v = r * v * (1 - v);
            else if (map === 'sine') v = r * Math.sin(Math.PI * v);
            else if (map === 'cubic') v = r * v * (1 - v * v);
            else v = r * Math.min(v, 1 - v);
            if (!(v > 0 && v < top)) v = 0.3 + 0.4 * ((x * 7 + k) % 10) / 10;
            const yy = Math.min(n - 1, Math.floor(v / top * (n - 6)) + 3);
            hist[(flip ? yy : n - 1 - yy) * n + x] += 1;
          }
          state[x] = v;
        }
      };
      left = lo + (hi - lo) * U.lerp(l0, l1, 0.5 - 0.5 * Math.cos(ph));
      for (let k = 0; k < 30; k++) feed();
      const hnd = hand(g);
      return t => {
        const hh = hnd.update(), zoomTo = hh.mix(U.lerp(l0, l1, 0.5 - 0.5 * Math.cos(t * rate + ph)), Math.min(0.97, hh.x));
        left += ((lo + (hi - lo) * zoomTo) - left) * (hh.w ? 0.2 : 1);
        feed();
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const h = vertical ? hist[x * n + y] : hist[i];
          d[i] = h < 0.5 ? BLACK : heat[Math.min(255, 50 + Math.log(1 + h) * 34) | 0];
        }
      };
    },
  });
  P.add({
    interactive: 'Click to drop a new thread into the loom.',
    name: 'Pascal Loom', seed: 3, fam: 'Residue', type: 'px', n: 96,
    recipe: 'Each new row is a sum of its neighbours above, modulo a small prime: Pascal’s triangle woven as cloth. The weave (two neighbours, three, or weighted), the modulus and the direction it grows change with the seed.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), m = R.pick([2, 3, 3, 5, 5, 7]), wide = R.bool(0.4), speed = R.range(6, 9), hueStep = R.range(0.6, 1.8) * R.sign();
        const rows = new Uint8Array(n * n), born = new Float32Array(n);
        let row = new Uint8Array(n), made = 0, until = 0, tb = 2;   // tb: threads a click may drop (a burst of replayed taps would weave pure noise)
        const seed = () => { row.fill(0); const k = R.pick([1, 1, 2, 3]); for (let i = 0; i < k; i++) row[R.int(0, n - 1)] = R.int(1, m - 1); until = made + R.int(n * 0.7, n * 1.6); };
        seed();
        const next = () => {
          if (made >= until) seed();
          else { const nx = new Uint8Array(n); for (let i = 0; i < n; i++) nx[i] = (row[(i + n - 1) % n] + row[(i + 1) % n] + (wide ? row[i] : 0)) % m; row = nx; }
          rows.copyWithin(0, n); rows.set(row, n * (n - 1)); born.copyWithin(0, 1); born[n - 1] = made++;
        };
        for (let i = 0; i < n; i++) next();
        g.trait('Palette', palName(sc)); g.trait('Modulus', m); g.trait('Weave', wide ? 'Three threads' : 'Two threads'); g.trait('Growth', 'Down');
        return t => {
          tb = Math.min(2, tb + 0.12);
          for (const p of g.input.taps()) if (tb >= 1) { tb--; const x = Math.min(n - 1, Math.floor(p.x * n)); row[x] = (row[x] + 1) % m || 1; until = Math.max(until, made + n); }
          const want = n + Math.floor(t * speed);
          while (made < want) next();
          for (let y = 0, i = 0; y < n; y++) {
            const h = born[y] * hueStep;
            for (let x = 0; x < n; x++, i++) d[i] = rows[i] ? sc.lut[(h + (rows[i] - 1) * 200 / m) & 255] : BLACK;
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), m = R.pick([2, 3, 3, 5, 5, 7, 11]), speed = R.range(6, 9), hueStep = R.range(0.6, 1.8) * R.sign();
      const wl = R.pick([1, 1, 1, 2]), wc = R.pick([0, 0, 1, 1, 2]), wr = R.pick([1, 1, 1, 2, m - 1]), grow = R.pick(['down', 'down', 'up', 'side', 'mirror']);
      const rows = new Uint8Array(n * n), born = new Float32Array(n), shade = R.bool(0.4) ? U.dim(sc.lut, 0.5) : sc.lut;
      let row = new Uint8Array(n), made = 0, until = 0, tb = 2;   // tb: threads a click may drop (a burst of replayed taps would weave pure noise)
      const seed = () => { row.fill(0); const k = R.pick([1, 1, 2, 3]); for (let i = 0; i < k; i++) row[R.int(0, n - 1)] = R.int(1, m - 1); until = made + R.int(n * 0.7, n * 1.6); };
      seed();
      const next = () => {
        if (made >= until) seed();
        else { const nx = new Uint8Array(n); for (let i = 0; i < n; i++) nx[i] = (wl * row[(i + n - 1) % n] + wr * row[(i + 1) % n] + wc * row[i]) % m; row = nx; }
        rows.copyWithin(0, n); rows.set(row, n * (n - 1)); born.copyWithin(0, 1); born[n - 1] = made++;
      };
      for (let i = 0; i < n; i++) next();
      g.trait('Palette', palName(sc)); g.trait('Modulus', m); g.trait('Weave', (wc ? 'Three threads' : 'Two threads') + (wl !== 1 || wr !== 1 || wc > 1 ? ', weighted' : '')); g.trait('Growth', { down: 'Down', up: 'Up', side: 'Sideways', mirror: 'Mirror' }[grow]);
      return t => {
        tb = Math.min(2, tb + 0.12);
        for (const p of g.input.taps()) if (tb >= 1) { tb--; const x = Math.min(n - 1, Math.floor((grow === 'side' ? p.y : p.x) * n)); row[x] = (row[x] + 1) % m || 1; until = Math.max(until, made + n); }
        const want = n + Math.floor(t * speed);
        while (made < want) next();
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let sy = y, sx = x;
          if (grow === 'up') sy = n - 1 - y;
          else if (grow === 'side') { sy = x; sx = y; }
          else if (grow === 'mirror') sy = y < n / 2 ? n - 1 - 2 * y : 2 * y - n + 1;
          sy = Math.max(0, Math.min(n - 1, sy));
          const v = rows[sy * n + sx];
          d[i] = v ? (v & 1 ? sc.lut : shade)[(born[sy] * hueStep + (v - 1) * 200 / m) & 255] : BLACK;
        }
      };
    },
  });
  P.add({
    name: 'Hilbert Flow', fam: 'Residue', type: 'px', n: 65,
    recipe: 'One unbroken line that visits every corner of the square (a Hilbert curve, or the closed Moore loop, at one of three depths), with colour pumped along its whole length.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), order = 32, len = order * order, path = new Int32Array(len * 2 - 1);
        const rot = R.int(0, 3), flip = R.bool();
        const at = k => {             // Hilbert index -> grid point
          let x = 0, y = 0, tt = k;
          for (let s = 1; s < order; s *= 2) {
            const rx = 1 & (tt / 2), ry = 1 & (tt ^ rx);
            if (ry === 0) { if (rx === 1) { x = s - 1 - x; y = s - 1 - y; } const tmp = x; x = y; y = tmp; }
            x += s * rx; y += s * ry; tt = Math.floor(tt / 4);
          }
          for (let r = 0; r < rot; r++) { const tmp = x; x = order - 1 - y; y = tmp; }
          return [flip ? order - 1 - x : x, y];
        };
        let prev = at(0);
        path[0] = (2 * prev[1] + 1) * n + 2 * prev[0] + 1;
        for (let k = 1; k < len; k++) {
          const p = at(k);
          path[2 * k - 1] = (prev[1] + p[1] + 1) * n + prev[0] + p[0] + 1;
          path[2 * k] = (2 * p[1] + 1) * n + 2 * p[0] + 1;
          prev = p;
        }
        const cycles = R.pick([3, 5, 8, 13]), speed = R.range(14, 30) * R.sign(), dash = R.pick([24, 40, 64]), gap = R.pick([3, 5, 8]);
        // one turn of the colour wheel is the period; the dashes advance a whole number of dash lengths in it
        const period = 256 / Math.abs(speed), crawl = dash * R.int(2, 5) / period * R.sign();
        const total = path.length;
        g.trait('Palette', palName(sc)); g.trait('Curve', 'Hilbert'); g.trait('Order', order); g.trait('Dashes', dash); g.trait('Colour turns', cycles);
        return Object.assign(t => {
          const hd = t * speed, cd = Math.floor(t * crawl + 1e-6);
          d.fill(BLACK);
          for (let k = 0; k < total; k++) {
            if (((k + cd) % dash + dash) % dash < gap) continue;
            d[path[k]] = sc.lut[(k * cycles * 256 / total + hd) & 255];
          }
        }, { period });
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), order = R.pick([8, 16, 32, 32]), moore = R.bool(0.35), step = 64 / order;
      const rot = R.int(0, 3), flip = R.bool(), fat = step >= 4 ? R.pick([1, 2, Math.floor(step / 2)]) : 1;
      const hil = (k, o) => {             // Hilbert index -> grid point in an o x o square
        let x = 0, y = 0, tt = k;
        for (let s = 1; s < o; s *= 2) {
          const rx = 1 & (tt / 2), ry = 1 & (tt ^ rx);
          if (ry === 0) { if (rx === 1) { x = s - 1 - x; y = s - 1 - y; } const tmp = x; x = y; y = tmp; }
          x += s * rx; y += s * ry; tt = Math.floor(tt / 4);
        }
        return [x, y];
      };
      // Moore's curve (the closed loop of four Hilbert quarters), by its L-system
      let loop = null;
      if (moore) {
        let s = 'LFL+F+LFL';
        for (let i = 1; i < Math.log2(order); i++) s = s.replace(/[LR]/g, c => c === 'L' ? '-RF+LFL+FR-' : '+LF-RFR-FL+');
        let x = 0, y = 0, dx = 0, dy = 1;
        loop = [[0, 0]];
        for (const c of s) { if (c === 'F') { x += dx; y += dy; loop.push([x, y]); } else if (c === '+') { const t = dx; dx = dy; dy = -t; } else if (c === '-') { const t = dx; dx = -dy; dy = t; } }
        const mx = Math.min(...loop.map(p => p[0])), my = Math.min(...loop.map(p => p[1]));
        loop = loop.map(([a, b]) => [a - mx, b - my]);
      }
      const at = k => {
        let x, y;
        if (!moore) [x, y] = hil(k, order);
        else [x, y] = loop[k];
        for (let r = 0; r < rot; r++) { const tmp = x; x = order - 1 - y; y = tmp; }
        return [flip ? order - 1 - x : x, y];
      };
      // the path, cell by cell, through the centres of the order x order squares
      const cells = [];
      const centre = v => Math.round(v * step + step / 2);
      let prev = at(0);
      cells.push([centre(prev[0]), centre(prev[1])]);
      for (let k = 1; k < order * order; k++) {
        const p = at(k), x0 = centre(prev[0]), y0 = centre(prev[1]), x1 = centre(p[0]), y1 = centre(p[1]), len = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
        for (let s = 1; s <= len; s++) cells.push([Math.round(x0 + (x1 - x0) * s / len), Math.round(y0 + (y1 - y0) * s / len)]);
        prev = p;
      }
      const total = cells.length, path = new Int32Array(total);
      cells.forEach(([x, y], k) => { path[k] = Math.min(n - 1, y) * n + Math.min(n - 1, x); });
      const cycles = R.pick([1, 3, 5, 8, 13]), speed = R.range(14, 30) * R.sign(), dash = R.pick([24, 40, 64, 1e9]), gap = R.pick([3, 5, 8]);
      const ground = R.bool(0.3) ? U.dim(sc.lut, 0.18) : null;
      // one turn of the colour wheel is the period; the dashes advance a whole number of dash lengths in it
      const period = 256 / Math.abs(speed), crawl = dash < 1e8 ? dash * R.int(2, 5) / period * R.sign() : 0;
      g.trait('Palette', palName(sc)); g.trait('Curve', moore ? 'Moore' : 'Hilbert'); g.trait('Order', order); g.trait('Dashes', dash < 1e8 ? dash : 'None'); g.trait('Colour turns', cycles); g.trait('Ground', ground ? 'Glow' : 'Black');
      return Object.assign(t => {
        const hd = t * speed, cd = Math.floor(t * crawl + 1e-6);
        if (ground) for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) d[i] = ground[((x ^ y) * 4 + hd) & 255];
        else d.fill(BLACK);
        for (let k = 0; k < total; k++) {
          if (dash < 1e8 && ((k + cd) % dash + dash) % dash < gap) continue;
          const c = sc.lut[(k * cycles * 256 / total + hd) & 255], i = path[k];
          d[i] = c;
          if (fat > 1) { const x = i % n, y = (i / n) | 0; for (let a = 0; a < fat; a++) for (let b = 0; b < fat; b++) { const xx = x + a - (fat >> 1), yy = y + b - (fat >> 1); if (xx >= 0 && yy >= 0 && xx < n && yy < n) d[yy * n + xx] = c; } }
        }
      }, { period });
    },
  });
  P.add({
    name: 'Recamán', fam: 'Residue', type: 'vec',
    recipe: 'A sequence that steps back when it can and forward when it must, drawn as arcs between each pair of terms. Some rolls draw it instead as pixel arcs, outlined or filled, upright or turned.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, ink = U.inkSet(R), sc = U.scheme(R, 0.5), coloured = R.bool(0.65);
        const ground = coloured ? [0, 0, 0] : ink.ground;
        const mult = R.pick([1, 1, 1, 2, 3]), total = R.int(90, 150), rate = R.range(5, 9), tilt = R.pick([0, 0, Math.PI / 2, Math.PI / 4, -Math.PI / 4]);
        const seq = [0], used = new Set([0]);
        for (let i = 1; i <= total; i++) { const s = i * mult, back = seq[i - 1] - s, v = back > 0 && !used.has(back) ? back : seq[i - 1] + s; seq.push(v); used.add(v); }
        const tex = coloured ? null : U.paper(R, ink, 512);
        // the first frame opens a third of the way into the drawing, so it is never an empty page
        const lead = total * 0.3 / rate; let reach = 20; for (let i = 0; i <= Math.ceil(total * 0.3); i++) reach = Math.max(reach, seq[i]);
        g.trait('Palette', coloured ? palName(sc) : 'Ink'); g.trait('Ground', coloured ? 'Black' : ink.name); g.trait('Style', 'Arcs'); g.trait('Step', mult); g.trait('Tilt', tilt === 0 ? 'Level' : Math.abs(tilt) > 1 ? 'Upright' : 'Diagonal');
        return t => {
          const cycle = total / rate + 6, tt = (t + lead) % cycle, shown = Math.min(total, tt * rate), fade = U.clamp((cycle - tt) / 1.5);
          let far = 20;
          for (let i = 0; i <= Math.ceil(shown); i++) far = Math.max(far, seq[i]);
          reach += (far - reach) * 0.06;
          if (tex) ctx.drawImage(tex, 0, 0, 1000, 1000); else { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000); }
          ctx.save();
          ctx.translate(500, 500); ctx.rotate(tilt);
          const span = tilt % (Math.PI / 2) === 0 ? 880 : 1100, k = span / reach;
          ctx.translate(-span / 2, 0);
          ctx.lineWidth = g.lw(3);
          for (let i = 1; i <= Math.ceil(shown); i++) {
            const a = seq[i - 1] * k, b = seq[i] * k, part = U.clamp(shown - (i - 1)), r = Math.abs(b - a) / 2, up = i % 2 === 0;
            const col = coloured ? U.ramp(sc.cols, i / 40, true) : ink.ink;
            ctx.strokeStyle = U.css(U.mix(ground, col, fade * (coloured ? 1 : 0.9)));
            ctx.beginPath();
            const from = a < b ? Math.PI : 0, sweep = Math.PI * part * (a < b ? 1 : -1) * (up ? 1 : -1);
            ctx.arc((a + b) / 2, 0, r, from, from + sweep, sweep < 0);
            ctx.stroke();
          }
          ctx.restore();
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100]));
      const fr = (function (g) {
        const { n, d } = g, sc = U.scheme(R, 0.5), X = U.X;
        const mult = R.pick([1, 1, 1, 2, 3]), total = R.int(70, 140), rate = R.range(5, 9), filled = R.bool(0.4), side = R.bool(0.35);
        const seq = [0], used = new Set([0]);
        for (let i = 1; i <= total; i++) { const s = i * mult, back = seq[i - 1] - s, v = back > 0 && !used.has(back) ? back : seq[i - 1] + s; seq.push(v); used.add(v); }
        const ground = R.bool(0.3) ? U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.85)) : BLACK;
        // the first frame opens a third of the way into the drawing, so it is never an empty page
        const lead = total * 0.3 / rate; let reach = 20; for (let i = 0; i <= Math.ceil(total * 0.3); i++) reach = Math.max(reach, seq[i]);
        g.trait('Palette', palName(sc)); g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('Style', filled ? 'Pixel, filled' : 'Pixel arcs'); g.trait('Step', mult); g.trait('Tilt', side ? 'Upright' : 'Level');
        return t => {
          const cycle = total / rate + 6, tt = (t + lead) % cycle, shown = Math.min(total, tt * rate), fade = U.clamp((cycle - tt) / 1.5);
          let far = 20;
          for (let i = 0; i <= Math.ceil(shown); i++) far = Math.max(far, seq[i]);
          reach += (far - reach) * 0.06;
          d.fill(ground);
          const k = (n - 6) / reach, mid = n / 2;
          for (let i = 1; i <= Math.ceil(shown); i++) {
            const a = 3 + seq[i - 1] * k, b = 3 + seq[i] * k, part = U.clamp(shown - (i - 1)), r = Math.abs(b - a) / 2, up = i % 2 === 0, c0 = (a + b) / 2;
            const col = U.pk(U.mix([0, 0, 0], U.ramp(sc.cols, i / 40, true), fade)), dark = U.pk(U.mix([0, 0, 0], U.ramp(sc.cols, i / 40, true), fade * 0.45));
            const steps = Math.max(4, Math.ceil(r * 3.2 * part)), dir = a < b ? 1 : -1;
            let lx = null, ly = null;
            for (let s = 0; s <= steps; s++) {
              const th = Math.PI * part * s / steps, x = c0 - dir * r * Math.cos(th), y = mid + (up ? -1 : 1) * r * Math.sin(th);
              const px = side ? y : x, py = side ? x : y;
              if (filled) X.line(g, side ? mid : px, side ? py : mid, px, py, dark);
              if (lx !== null) X.line(g, lx, ly, px, py, col);
              lx = px; ly = py;
            }
          }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
})();
