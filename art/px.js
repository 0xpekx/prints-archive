// Pixel helpers for set 2. Everything here draws straight into a packed cell
// grid (g.d, n x n), so shapes are rasterised cell by cell with hard edges:
// Bresenham lines, scanline fills, a 5 x 7 pixel font, sprites and dither
// matrices. Set 2 prototypes register through Proto.addPixel().
(function () {
  'use strict';
  const P = window.Proto, U = P.U;

  // Grid sizes that divide both GIF sizes (400 and 800), so exports stay crisp.
  const SIZES = [25, 40, 50, 80, 100, 200];
  P.addPixel = def => {
    for (const s of def.sizes || []) if (!SIZES.includes(s)) throw new Error(def.name + ': grid ' + s + ' does not divide 400');
    P.add(Object.assign({ set: 2, type: 'px' }, def));
  };

  const rgb = (r, g, b) => (255 << 24 | (b & 255) << 16 | (g & 255) << 8 | (r & 255)) >>> 0;
  const unpk = v => [v & 255, v >> 8 & 255, v >> 16 & 255];
  const hsbPk = (h, s, b) => U.pk(U.hsb(h, s, b));
  // a + (b - a) * t on two packed colours
  function mixPk(a, b, t) {
    const ar = a & 255, ag = a >> 8 & 255, ab = a >> 16 & 255;
    return rgb(ar + ((b & 255) - ar) * t, ag + ((b >> 8 & 255) - ag) * t, ab + ((b >> 16 & 255) - ab) * t);
  }
  const shade = (v, k) => rgb(Math.min(255, (v & 255) * k), Math.min(255, (v >> 8 & 255) * k), Math.min(255, (v >> 16 & 255) * k));
  const lum = v => (0.299 * (v & 255) + 0.587 * (v >> 8 & 255) + 0.114 * (v >> 16 & 255)) / 255;

  // A small packed palette for a piece: the native hue wheel cut into k steps,
  // or one of the earlier collections' palettes; sorted dark to light if asked.
  function inks(R, k = 6, nativeShare = 0.4, sorted = false) {
    let cols;
    if (R() < nativeShare) {
      const from = R.range(0, 100), span = R.pick([100, 100, 70, 40]) * R.sign(), neon = R.bool(0.25);
      cols = Array.from({ length: k }, (_, i) => U.hsb(from + span * i / k, neon ? 100 : 85, neon ? 100 : 90));
    } else cols = U.palette(R).cols.slice();
    const out = cols.map(U.pk);
    if (sorted) out.sort((a, b) => lum(a) - lum(b));
    return out;
  }
  // n stops between colours (packed), for shading ramps
  const rampPk = (cols, n, cyclic) => Array.from({ length: n }, (_, i) => U.pk(U.ramp(cols.map(unpk), cyclic ? i / n : i / (n - 1), cyclic)));

  // ---------- drawing into the grid ----------
  function put(g, x, y, c) {
    x |= 0; y |= 0;
    if (x >= 0 && y >= 0 && x < g.n && y < g.n) g.d[y * g.n + x] = c;
  }
  function get(g, x, y) {
    x |= 0; y |= 0;
    return x >= 0 && y >= 0 && x < g.n && y < g.n ? g.d[y * g.n + x] : 0;
  }
  // Bresenham; fn(x, y, i) instead of a colour paints along the line
  function line(g, x0, y0, x1, y1, c) {
    // NaN or runaway coordinates would make the walk below endless: skip them, and
    // never walk more than a few grid-widths however far away the ends are
    if (!(Math.abs(x0) + Math.abs(y0) + Math.abs(x1) + Math.abs(y1) < 1e7)) return;
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy, i = 0, guard = Math.min(4 * g.n + dx - dy, 64 * g.n);
    for (;;) {
      if (typeof c === 'function') c(x0, y0, i++); else put(g, x0, y0, c);
      if ((x0 === x1 && y0 === y1) || guard-- < 0) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }
  function rect(g, x, y, w, h, c) {
    const x0 = Math.max(0, Math.round(x)), y0 = Math.max(0, Math.round(y)), x1 = Math.min(g.n, Math.round(x + w)), y1 = Math.min(g.n, Math.round(y + h));
    for (let yy = y0; yy < y1; yy++) g.d.fill(c, yy * g.n + x0, yy * g.n + Math.max(x0, x1));
  }
  // filled disc on cell centres
  function disc(g, cx, cy, r, c) {
    const r2 = r * r, y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(g.n - 1, Math.ceil(cy + r));
    for (let y = y0; y <= y1; y++) {
      const dy = y + 0.5 - cy, w = r2 - dy * dy;
      if (w < 0) continue;
      const s = Math.sqrt(w), x0 = Math.max(0, Math.round(cx - s)), x1 = Math.min(g.n, Math.round(cx + s));
      for (let x = x0; x < x1; x++) g.d[y * g.n + x] = typeof c === 'function' ? c(x, y) : c;
    }
  }
  // Scanline polygon fill with the even-odd rule; pts = [x0, y0, x1, y1, ...]
  function poly(g, pts, c) {
    const n = g.n, m = pts.length / 2;
    let ylo = Infinity, yhi = -Infinity;
    for (let i = 1; i < pts.length; i += 2) { ylo = Math.min(ylo, pts[i]); yhi = Math.max(yhi, pts[i]); }
    const xs = [];
    for (let y = Math.max(0, Math.floor(ylo)); y <= Math.min(n - 1, Math.ceil(yhi)); y++) {
      const sy = y + 0.5;
      xs.length = 0;
      for (let i = 0; i < m; i++) {
        const ax = pts[2 * i], ay = pts[2 * i + 1], bx = pts[(2 * i + 2) % pts.length], by = pts[(2 * i + 3) % pts.length];
        if ((ay <= sy) !== (by <= sy)) xs.push(ax + (sy - ay) / (by - ay) * (bx - ax));
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = Math.max(0, Math.round(xs[k])), x1 = Math.min(n, Math.round(xs[k + 1]));
        for (let x = x0; x < x1; x++) g.d[y * n + x] = typeof c === 'function' ? c(x, y) : c;
      }
    }
  }

  // ---------- 5 x 7 pixel font (rows, bit 16 is the left column) ----------
  const FONT = {
    A: [14, 17, 17, 31, 17, 17, 17], B: [30, 17, 17, 30, 17, 17, 30], C: [14, 17, 16, 16, 16, 17, 14], D: [30, 17, 17, 17, 17, 17, 30],
    E: [31, 16, 16, 30, 16, 16, 31], F: [31, 16, 16, 30, 16, 16, 16], G: [14, 17, 16, 23, 17, 17, 15], H: [17, 17, 17, 31, 17, 17, 17],
    I: [14, 4, 4, 4, 4, 4, 14], J: [7, 2, 2, 2, 2, 18, 12], K: [17, 18, 20, 24, 20, 18, 17], L: [16, 16, 16, 16, 16, 16, 31],
    M: [17, 27, 21, 21, 17, 17, 17], N: [17, 17, 25, 21, 19, 17, 17], O: [14, 17, 17, 17, 17, 17, 14], P: [30, 17, 17, 30, 16, 16, 16],
    Q: [14, 17, 17, 17, 21, 18, 13], R: [30, 17, 17, 30, 20, 18, 17], S: [15, 16, 16, 14, 1, 1, 30], T: [31, 4, 4, 4, 4, 4, 4],
    U: [17, 17, 17, 17, 17, 17, 14], V: [17, 17, 17, 17, 17, 10, 4], W: [17, 17, 17, 21, 21, 21, 10], X: [17, 17, 10, 4, 10, 17, 17],
    Y: [17, 17, 17, 10, 4, 4, 4], Z: [31, 1, 2, 4, 8, 16, 31],
    0: [14, 17, 19, 21, 25, 17, 14], 1: [4, 12, 4, 4, 4, 4, 14], 2: [14, 17, 1, 2, 4, 8, 31], 3: [31, 2, 4, 2, 1, 17, 14],
    4: [2, 6, 10, 18, 31, 2, 2], 5: [31, 16, 30, 1, 1, 17, 14], 6: [6, 8, 16, 30, 17, 17, 14], 7: [31, 1, 2, 4, 8, 8, 8],
    8: [14, 17, 17, 14, 17, 17, 14], 9: [14, 17, 17, 15, 1, 2, 12],
    ' ': [0, 0, 0, 0, 0, 0, 0], '.': [0, 0, 0, 0, 0, 12, 12], '-': [0, 0, 0, 31, 0, 0, 0], '!': [4, 4, 4, 4, 4, 0, 4],
    ':': [0, 12, 12, 0, 12, 12, 0], '+': [0, 4, 4, 31, 4, 4, 0], '/': [1, 1, 2, 4, 8, 16, 16], '*': [0, 21, 14, 31, 14, 21, 0],
    '♥': [0, 10, 31, 31, 14, 4, 0], '#': [10, 10, 31, 10, 31, 10, 10], '=': [0, 0, 31, 0, 31, 0, 0], '?': [14, 17, 1, 2, 4, 0, 4], '%': [25, 25, 2, 4, 8, 19, 19], ',': [0, 0, 0, 0, 12, 4, 8], "'": [4, 4, 8, 0, 0, 0, 0],
  };
  // draws text with its top-left at (x, y); cell size `s`; c may be fn(x, y, charIndex)
  function text(g, str, x, y, c, s = 1) {
    let cx = Math.round(x);
    for (let k = 0; k < str.length; k++) {
      const rows = FONT[str[k].toUpperCase()] || FONT['?'];
      for (let r = 0; r < 7; r++) for (let b = 0; b < 5; b++) {
        if (!(rows[r] >> (4 - b) & 1)) continue;
        const col = typeof c === 'function' ? c(cx + b * s, y + r * s, k) : c;
        if (s === 1) put(g, cx + b, y + r, col); else rect(g, cx + b * s, y + r * s, s, s, col);
      }
      cx += 6 * s;
    }
    return cx;
  }
  const textWidth = (str, s = 1) => str.length * 6 * s - s;

  // ---------- dither ----------
  function bayer(k) {          // k x k ordered-dither thresholds in (0, 1)
    let m = [[0]];
    while (m.length < k) {
      const s = m.length, o = Array.from({ length: s * 2 }, () => new Array(s * 2));
      for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
        const v = 4 * m[y][x];
        o[y][x] = v; o[y][x + s] = v + 2; o[y + s][x] = v + 3; o[y + s][x + s] = v + 1;
      }
      m = o;
    }
    const n = m.length * m.length, out = new Float32Array(n);
    for (let y = 0; y < m.length; y++) for (let x = 0; x < m.length; x++) out[y * m.length + x] = (m[y][x] + 0.5) / n;
    return out;
  }
  const B4 = bayer(4), B8 = bayer(8);
  const dith4 = (x, y) => B4[(y & 3) * 4 + (x & 3)];
  const dith8 = (x, y) => B8[(y & 7) * 8 + (x & 7)];

  // ---------- sprites ----------
  // A random left-right mirrored sprite, w x h, as an array of 0/1/2 rows
  // (0 empty, 1 body, 2 accent); `fill` is the chance a cell is body.
  function mirrorSprite(R, w, h, fill = 0.5, accent = 0.12) {
    const half = Math.ceil(w / 2), s = Array.from({ length: h }, () => new Uint8Array(w));
    for (let y = 0; y < h; y++) for (let x = 0; x < half; x++) {
      const v = R() < fill ? (R() < accent ? 2 : 1) : 0;
      s[y][x] = v; s[y][w - 1 - x] = v;
    }
    return s;
  }
  // stamp a 0/1/2.. sprite: cols[v] for each non-zero value (0 = transparent)
  function stamp(g, spr, x, y, cols, flip = false, scale = 1) {
    const h = spr.length, w = spr[0].length;
    for (let r = 0; r < h; r++) for (let q = 0; q < w; q++) {
      const v = spr[r][flip ? w - 1 - q : q];
      if (!v || cols[v] === undefined) continue;
      if (scale === 1) put(g, x + q, y + r, cols[v]); else rect(g, x + q * scale, y + r * scale, scale, scale, cols[v]);
    }
  }
  // dark outline round a sprite's filled cells (returns a new, 2-larger sprite with value 9 for outline)
  function outline(spr) {
    const h = spr.length + 2, w = spr[0].length + 2, o = Array.from({ length: h }, () => new Uint8Array(w));
    for (let y = 0; y < spr.length; y++) for (let x = 0; x < spr[0].length; x++) if (spr[y][x]) o[y + 1][x + 1] = spr[y][x];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (o[y][x]) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const v = (o[y + dy] || [])[x + dx];
        if (v && v !== 9) { o[y][x] = 9; break; }
      }
    }
    return o;
  }

  U.X = { SIZES, rgb, unpk, hsbPk, mixPk, shade, lum, inks, rampPk, put, get, line, rect, disc, poly, FONT, text, textWidth, bayer, dith4, dith8, mirrorSprite, stamp, outline };
})();
