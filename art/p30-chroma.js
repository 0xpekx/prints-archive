// Set 3 · Chroma: the Synaesthesia idea pushed further. Each piece is a new rule
// turning time and cell position into a hue through modular arithmetic, on hard
// square cells, with the originals' black voids where the hue runs off the wheel.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Chroma' }, def));
  // A colouring for raw hue values, as in the originals: hue outside 1..95 is a
  // void (black) when `voids` is on; otherwise it wraps round the wheel.
  function colourer(R, voidShare = 0.7) {
    const sc = U.scheme(R, 0.65), voids = R.bool(voidShare), lut = sc.native ? U.hueLut(R.bool(0.25) ? 100 : 85, R.bool(0.25) ? 100 : 90, 256) : U.lut(sc.cols, true);
    const at = h => (voids && (h > 95 || h < 1)) ? BLACK : lut[((h % 100 + 100) % 100) * 2.56 | 0];
    return { at, voids, lut };
  }
  const mod = (a, m) => ((a % m) + m) % m;

  add({
    name: 'Nested Remainder', seed: 2, sizes: [50, 80, 100], fps: 10,
    recipe: 'Square rings nested round the centre, each running its own clock: a ring’s hue is time times its number modulo a small count, plus a second remainder walking round its perimeter. The rings turn at different speeds and voids open where a ring overflows the wheel.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.9), c = (n - 1) / 2, a = R.range(0.2, 0.6), b = R.range(0.05, 0.2), m = R.pick([5, 7, 9]), k = R.range(8, 13), k2 = R.range(15, 35), h0 = R.range(-4, 8), rate = R.range(0.5, 1), w = R.pick([1, 2, 2, 3]);
      return t => {
        const tt = 3 + t * rate;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - c, dy = y - c, r = Math.floor(Math.max(Math.abs(dx), Math.abs(dy)) / w), per = 8 * (r + 1);
          const p = dy <= -Math.abs(dx) ? dx + c : dx >= Math.abs(dy) ? dy + c + 2 * c : dy >= Math.abs(dx) ? -dx + c + 4 * c : -dy + c + 6 * c;
          const v = mod(tt * a * (r + 1), m) * k + mod(p / w + tt * b * (r % 2 ? 1 : -1) * per, per) / per * k2;
          d[y * n + x] = col.at(h0 + v);
        }
      };
    },
  });

  add({
    name: 'Interlace Echo', sizes: [50, 80, 100], fps: 12,
    recipe: 'The original field, but each frame only repaints the cells on one slanted comb of the grid; the rest keep the colour of an earlier moment, so time is woven into the picture as diagonal echoes.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R), a = R.range(0.5, 2), yd = R.pick([1, 2, 3]), k = R.range(1, 4), h0 = R.range(0, 30), p = R.int(1, 4), q = R.int(1, 5), m = R.pick([3, 4, 5, 6, 7]), speed = R.pick([2, 5, 10]);
      let first = true;
      return (t, dt, f) => {
        const tt = 3 + t * 10 / speed;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          if (!first && (x * p + y * q + f) % m) continue;
          d[y * n + x] = col.at(h0 + Math.log(mod(tt * a * x, y / yd + 1) + 1) * k * 12);
        }
        first = false;
      };
    },
  });

  add({
    name: 'Time Lag', sizes: [50, 80, 100], fps: 12,
    recipe: 'Every row runs on its own clock, a little behind the row above. The same remainder of time times x then arrives row by row, so its bands slide down the grid as slanted waves.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R), a = R.range(0.004, 0.02), m = R.range(4, 12), k = R.range(6, 12), h0 = R.range(0, 30), lag = R.range(0.05, 0.3) * R.sign(), vert = R.bool(0.4), rate = R.range(0.6, 1.4);
      return t => {
        for (let y = 0; y < n; y++) {
          const tt = 50 + t * rate - (vert ? 0 : y * lag);
          for (let x = 0; x < n; x++) {
            const ttt = vert ? tt - x * lag : tt;
            d[y * n + x] = col.at(h0 + mod(ttt * a * (vert ? y + 1 : x + 1) * (vert ? x + 1 : y + 1) * 0.1, m) * k);
          }
        }
      };
    },
  });

  add({
    name: 'Running Sum', sizes: [50, 80, 100], fps: 10,
    recipe: 'Each cell’s hue is the sum of the hue to its left and the hue above it plus a small push from time, wrapped round the wheel. One slow clock at the corner unfolds into a whole field of carried colour.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.5), H = new Float32Array(n * n), w1 = R.range(0.3, 0.7), w2 = 1 - w1, push = R.range(0.5, 3), mask = R.pick([3, 5, 7, 15]), rate = R.range(0.5, 1.5), h0 = R.range(0, 100);
      return t => {
        const tt = t * rate;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const l = x ? H[y * n + x - 1] : h0 + tt * 3 + y * 0.9, u = y ? H[(y - 1) * n + x] : h0 + tt * 2 + x * 1.3;
          const v = mod(l * w1 + u * w2 + push * ((x ^ y) & mask) * 0.06, 100);
          H[y * n + x] = v;
          d[y * n + x] = col.at(col.voids ? v * 1.04 - 2 : v);
        }
      };
    },
  });

  add({
    name: 'Band Xor', sizes: [50, 80, 100], fps: 12,
    recipe: 'The grid is cut into vertical and horizontal bands whose widths slowly breathe; the two band numbers are xored and the result picks the hue, so a plaid of nested squares keeps rebuilding itself.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.5), k = R.range(3, 9), h0 = R.range(0, 100), b1 = R.range(2, 6), b2 = R.range(2, 6), r1 = R.range(0.08, 0.2), r2 = R.range(0.08, 0.2), voidEvery = R.pick([0, 7, 11, 13]);
      return t => {
        const w1 = b1 * (1.4 + Math.sin(t * r1)), w2 = b2 * (1.4 + Math.sin(t * r2 + 2)), ox = t * 0.8, oy = t * 0.5;
        for (let y = 0; y < n; y++) { const by = Math.floor((y + oy) / w2); for (let x = 0; x < n; x++) { const v = Math.floor((x + ox) / w1) ^ by; d[y * n + x] = voidEvery && v % voidEvery === 0 ? BLACK : col.lut[mod(h0 + v * k, 100) * 2.56 | 0]; } }
      };
    },
  });

  add({
    name: 'Grain Within Grain', seed: 3, sizes: [80, 100, 200], fps: 10,
    recipe: 'Two grains at once: big cells take their hue from the original remainder at their own coarse position, and inside each big cell a fixed little motif, chosen by that hue, is drawn in a lighter and darker shade of it.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.6), B = R.pick([10, 20].filter(b => n % b === 0)), a = R.range(0.3, 1), yd = R.pick([1, 2]), k = R.range(14, 24), h0 = R.range(0, 30), rate = R.range(0.3, 0.7);
      const motifs = Array.from({ length: 6 }, () => X.mirrorSprite(R, B / 2, B / 2, 0.4, 0.3));
      return t => {
        const tt = 10 + t * rate;
        for (let by = 0; by < n / B; by++) for (let bx = 0; bx < n / B; bx++) {
          const V = mod(tt * a * (bx + 1), by / yd + 1), base = col.at(h0 + V * k), m = motifs[Math.floor(V * 3) % motifs.length];
          for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) {
            const v = m[y >> 1][x >> 1];
            d[(by * B + y) * n + bx * B + x] = base === BLACK ? BLACK : v === 1 ? X.mixPk(base, WHITE, 0.35) : v === 2 ? X.shade(base, 0.45) : base;
          }
        }
      };
    },
  });

  add({
    name: 'Wandering Modulus', sizes: [50, 80, 100], fps: 12,
    recipe: 'The modulus is no longer a row number but the street distance from a point that wanders over the grid. Around the point the field shatters into fine voids; far away it opens into wide calm bands.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.8), a = R.range(0.01, 0.04), k = R.range(2, 6), h0 = R.range(0, 30), rate = R.range(0.6, 1.2), f1 = R.range(0.05, 0.12), f2 = R.range(0.05, 0.12), cheb = R.bool(0.4);
      return t => {
        const px = n * (0.5 + 0.35 * Math.sin(t * f1)), py = n * (0.5 + 0.35 * Math.sin(t * f2 + 1)), tt = 20 + t * rate;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = Math.abs(x - px), dy = Math.abs(y - py), m = (cheb ? Math.max(dx, dy) : dx + dy) / 2 + 1;
          d[y * n + x] = col.at(h0 + mod(tt * a * (x + 1) * (y + 1) * 0.05, m) * k);
        }
      };
    },
  });

  add({
    name: 'Void Edges', sizes: [50, 80, 100], fps: 10,
    recipe: 'A remainder of time times x times y over x plus y, with the originals’ voids, but every void is outlined in a single white cell, so the black shapes read as cut-outs drawn with a pen.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0), a = R.range(0.002, 0.008), k = R.range(4, 8), h0 = R.range(-12, 0), rate = R.range(0.5, 1.2), N = n * n, isVoid = new Uint8Array(N), ink = R.bool(0.7) ? WHITE : X.rgb(20, 20, 20);
      return t => {
        const tt = 30 + t * rate;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const h = h0 + mod(tt * a * (x + 1) * (y + 1), (x + y) / 4 + 2) * k, i = y * n + x;
          isVoid[i] = h > 95 || h < 1 ? 1 : 0;
          d[i] = isVoid[i] ? BLACK : col.lut[mod(h, 100) * 2.56 | 0];
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (isVoid[i] || !((x && isVoid[i - 1]) || (x < n - 1 && isVoid[i + 1]) || (y && isVoid[i - n]) || (y < n - 1 && isVoid[i + n]))) continue;
          d[i] = ink;
        }
      };
    },
  });

  add({
    name: 'Afterimage', sizes: [50, 80, 100], fps: 12,
    recipe: 'The field is computed every frame but a cell only lights when its colour band changes, and then sinks quickly back to black. Hard black holds wherever the field is still; colour flares only where it moves.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.3), N = n * n, prev = new Int16Array(N).fill(-1), glow = new Float32Array(N);
      const a = R.range(0.3, 1), yd = R.pick([1, 2, 3, 4]), k = R.range(2, 5), h0 = R.range(0, 40), speed = R.pick([10, 20, 40]), bands = R.pick([8, 10, 12]);
      return t => {
        const tt = 2 + t * 10 / speed;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, h = h0 + Math.log(mod(tt * a * (x + 1), y / yd + 1) + 1) * k * 10, q = Math.floor(mod(h, 100) / 100 * bands);
          if (q !== prev[i]) { glow[i] = prev[i] < 0 ? 0 : 1; prev[i] = q; } else glow[i] *= 0.72;
          d[i] = glow[i] < 0.3 ? BLACK : col.lut[(q * 256 / bands) | 0];
        }
      };
    },
  });

  add({
    name: 'Woven Field', sizes: [80, 100, 200], fps: 10,
    recipe: 'Warp threads take their hue from a remainder in x, weft threads from a remainder in y, and a twill decides which passes over; the cloth shimmers as the two remainders run at different speeds.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.4), T = R.pick([3, 4, 5]), a = R.range(0.02, 0.06), b = R.range(0.02, 0.06), m1 = R.range(5, 20), m2 = R.range(5, 20), k = R.range(4, 9), h0 = R.range(0, 40), twill = R.pick([1, 2, 3]), rate = R.range(0.5, 1);
      return t => {
        const tt = 10 + t * rate;
        for (let y = 0; y < n; y++) {
          const ty = Math.floor(y / T), weft = col.at(h0 + 30 + mod(tt * b * (ty + 1), m2) * k);
          for (let x = 0; x < n; x++) {
            const tx = Math.floor(x / T), over = mod(tx + ty * twill, 4) < 2, warp = col.at(h0 + mod(tt * a * (tx + 1), m1) * k);
            const edge = over ? x % T === T - 1 : y % T === T - 1;
            d[y * n + x] = X.shade(over ? warp : weft, edge ? 0.55 : 1);
          }
        }
      };
    },
  });
})();
