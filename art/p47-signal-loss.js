// Set 5 · Signal Loss: pictures failing in transmission, storage and display.
// Each piece takes a clean source (colour bars, a word of the collection, or the
// Synaesthesia field) and runs one real failure on it, frame by frame.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Signal Loss' }, def));
  const mod = (a, m) => ((a % m) + m) % m;
  const rgbPk = (r, g, b) => (0xff000000 | (b < 0 ? 0 : b > 255 ? 255 : b | 0) << 16 | (g < 0 ? 0 : g > 255 ? 255 : g | 0) << 8 | (r < 0 ? 0 : r > 255 ? 255 : r | 0)) >>> 0;
  const WORDS = ['PRISM', 'HUE', 'ECHO', 'VOID', 'NEON', 'SYNAE', 'GRAIN', 'TEMPO', 'EMBER', 'AXON'];

  // A clean moving picture: draw(buf, t) fills an n x n packed buffer.
  function source(R, n, kinds = ['bars', 'word', 'field', 'rings', 'scroll', 'balls']) {
    const kind = R.pick(kinds), lut = U.hueLut(R.bool(0.4) ? 100 : 88, 100, 256, R.range(0, 100), R.pick([100, 100, 60]));
    if (kind === 'bars') {
      const bars = [[192, 192, 192], [192, 192, 0], [0, 192, 192], [0, 192, 0], [192, 0, 192], [192, 0, 0], [0, 0, 192]].map(c => rgbPk(...c));
      const rev = [bars[6], BLACK, bars[4], BLACK, bars[2], BLACK, bars[0]], word = R.pick(WORDS), s = Math.max(1, Math.floor(n / 50));
      return { kind, draw(buf, t) {
        const sh = Math.round(t * n * 0.04) % n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const k = Math.floor(mod(x + (y < n * 0.62 ? 0 : sh), n) * 7 / n);
          buf[y * n + x] = y < n * 0.62 ? bars[k] : y < n * 0.7 ? rev[k] : y < n * 0.84 ? lut[(mod(x - t * n * 0.15, n) * 256 / n) | 0] : (((x >> 2) + (y >> 2)) & 1 ? 0xff202020 : BLACK);
        }
        const cx = n / 2 + Math.cos(t * 0.6) * n * 0.25, cy = n * 0.32 + Math.sin(t * 0.8) * n * 0.1, r = n * 0.13;
        X.disc({ n, d: buf }, cx, cy, r, BLACK); X.disc({ n, d: buf }, cx, cy, r - Math.max(1, n / 40), WHITE);
        X.text({ n, d: buf }, word, cx - X.textWidth(word, s) / 2, cy - 3.5 * s, BLACK, s);
      } };
    }
    if (kind === 'word') {
      const word = R.pick(WORDS), s = Math.max(2, Math.floor(n * 0.9 / (word.length * 6))), ink = R.bool(0.5) ? WHITE : BLACK;
      return { kind, draw(buf, t) {
        for (let y = 0; y < n; y++) { const c = lut[((y * 256 / n + t * 30) | 0) & 255]; for (let x = 0; x < n; x++) buf[y * n + x] = (((x + y) / 4 | 0) & 1) ? c : X.shade(c, 0.75); }
        const w = X.textWidth(word, s), x0 = (n - w) / 2 + Math.sin(t * 0.7) * (n - w) * 0.45, y0 = n / 2 - 3.5 * s + Math.sin(t * 0.45) * n * 0.2;
        X.rect({ n, d: buf }, x0 - s, y0 - s, w + 2 * s, 9 * s, ink === WHITE ? BLACK : WHITE);
        X.text({ n, d: buf }, word, x0, y0, ink, s);
      } };
    }
    if (kind === 'rings') {
      const k = R.range(4, 9) * n / 100, cxs = R.range(0.3, 0.7), cys = R.range(0.3, 0.7);
      return { kind, draw(buf, t) {
        const cx = n * (cxs + 0.2 * Math.sin(t * 0.5)), cy = n * (cys + 0.2 * Math.cos(t * 0.37));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x - cx, y - cy) / k - t; buf[y * n + x] = (Math.floor(r) & 3) === 3 ? BLACK : lut[((Math.floor(r) * 37) & 255)]; }
      } };
    }
    if (kind === 'scroll') {
      const s = Math.max(1, Math.floor(n / 50)), lines = Array.from({ length: 24 }, () => R.pick(WORDS) + ' ' + R.pick(WORDS)), lh = 10 * s, bg = X.shade(lut[R.int(0, 255)], 0.18);
      return { kind, draw(buf, t) {
        buf.fill(bg);
        const off = t * n * 0.12, first = Math.floor(off / lh);
        for (let k = 0; k <= Math.ceil(n / lh); k++) { const y = Math.round(k * lh - (off % lh)) + 2, line = lines[mod(first + k, lines.length)]; X.text({ n, d: buf }, line, 2 * s, y, lut[((first + k) * 41) & 255], s); }
      } };
    }
    if (kind === 'balls') {
      const B = R.int(3, 7), balls = Array.from({ length: B }, (_, k) => ({ x: R.range(0.2, 0.8), y: R.range(0.2, 0.8), vx: R.range(0.15, 0.35) * R.sign(), vy: R.range(0.15, 0.35) * R.sign(), r: R.range(0.07, 0.16), c: lut[(k * 256 / B) | 0] }));
      return { kind, draw(buf, t) {
        for (let y = 0; y < n; y++) { const c = X.shade(lut[((y * 128 / n) | 0) & 255], 0.25); for (let x = 0; x < n; x++) buf[y * n + x] = ((x >> 3) + (y >> 3)) & 1 ? c : X.shade(c, 0.7); }
        for (const b of balls) { const tri = v => { v = mod(v, 2); return v < 1 ? v : 2 - v; }, x = (b.r + tri(b.x + b.vx * t) * (1 - 2 * b.r)) * n, y = (b.r + tri(b.y + b.vy * t) * (1 - 2 * b.r)) * n; X.disc({ n, d: buf }, x, y, b.r * n, b.c); X.disc({ n, d: buf }, x - b.r * n * 0.3, y - b.r * n * 0.3, b.r * n * 0.3, WHITE); }
      } };
    }
    // the Synaesthesia field, early in its clock: broad remainder bands and spirals
    const px = 800 / n, ys = R.int(200, 500), a = R.pick([0.01, 0.02, 0.05]), T0 = R.range(60, 260), rate = R.range(1, 2);
    return { kind, draw(buf, t) {
      const T = T0 + t * rate;
      for (let y = 0; y < n; y++) { const M = (y + 0.5) * px + ys; for (let x = 0; x < n; x++) { const u = ((T * (x + 0.5) * px * a) % M) / M; buf[y * n + x] = u < 0.03 ? BLACK : lut[(u * 255) | 0]; } }
    } };
  }

  // source2: the same pictures from the same dice, finished for this pass: the test
  // card's name sits in a white label that always holds the whole word. (source()
  // above is kept exactly as it was.)
  // what source2 last rolled, for naming traits (never feeds back into a picture)
  let SRC = {};
  const HUES = [[0, 'Red'], [7, 'Orange'], [13, 'Amber'], [17, 'Yellow'], [24, 'Lime'], [32, 'Green'], [44, 'Teal'], [51, 'Cyan'], [59, 'Azure'], [66, 'Blue'], [74, 'Violet'], [83, 'Magenta'], [92, 'Rose'], [100, 'Red']];
  const hueName = h => { h = ((h % 100) + 100) % 100; let b = HUES[0]; for (const e of HUES) if (Math.abs(e[0] - h) < Math.abs(b[0] - h)) b = e; return b[1]; };
  const PICTURES = { bars: 'Test card', word: 'Word', field: 'Field', rings: 'Rings', scroll: 'Scrolling text', balls: 'Balls' };
  const nameSource = (g, src) => { g.trait('Picture', PICTURES[src.kind]); if (SRC.word) g.trait('Word', SRC.word); g.trait('Palette', SRC.span >= 100 ? 'Rainbow from ' + hueName(SRC.from) : hueName(SRC.from) + ' to ' + hueName(SRC.from + SRC.span)); return src; };
  const dirName = a => ['East', 'South-east', 'South', 'South-west', 'West', 'North-west', 'North', 'North-east'][Math.round(((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI / 4)) % 8];
  function stadium(buf, n, cx, cy, rx, ry, col) {
    const y0 = Math.max(0, Math.floor(cy - ry)), y1 = Math.min(n - 1, Math.ceil(cy + ry)), core = Math.max(0, rx - ry);
    for (let y = y0; y <= y1; y++) {
      const dy = y + 0.5 - cy, w = ry * ry - dy * dy; if (w < 0) continue;
      const h = core + Math.sqrt(w), xa = Math.max(0, Math.round(cx - h)), xb = Math.min(n, Math.round(cx + h));
      for (let x = xa; x < xb; x++) buf[y * n + x] = col;
    }
  }
  function source2(R, n, kinds = ['bars', 'word', 'field', 'rings', 'scroll', 'balls']) {
    const kind = R.pick(kinds), sat = R.bool(0.4) ? 100 : 88, from = R.range(0, 100), span = R.pick([100, 100, 60]), lut = U.hueLut(sat, 100, 256, from, span);
    SRC = { from, span, word: '' };
    if (kind === 'bars') {
      const bars = [[192, 192, 192], [192, 192, 0], [0, 192, 192], [0, 192, 0], [192, 0, 192], [192, 0, 0], [0, 0, 192]].map(c => rgbPk(...c));
      const rev = [bars[6], BLACK, bars[4], BLACK, bars[2], BLACK, bars[0]], word = R.pick(WORDS), s = Math.max(1, Math.floor(n / 50)); SRC.word = word;
      return { kind, draw(buf, t) {
        const sh = Math.round(t * n * 0.04) % n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const k = Math.floor(mod(x + (y < n * 0.62 ? 0 : sh), n) * 7 / n);
          buf[y * n + x] = y < n * 0.62 ? bars[k] : y < n * 0.7 ? rev[k] : y < n * 0.84 ? lut[(mod(x - t * n * 0.15, n) * 256 / n) | 0] : (((x >> 2) + (y >> 2)) & 1 ? 0xff202020 : BLACK);
        }
        const tw = X.textWidth(word, s), r = Math.max(n * 0.13, 4.5 * s + 2), rx = Math.max(r, tw / 2 + 2 * s + 1), b = Math.max(1, n / 40);
        const cx = U.clamp(n / 2 + Math.cos(t * 0.6) * n * 0.25, rx, n - rx), cy = n * 0.32 + Math.sin(t * 0.8) * n * 0.1;
        stadium(buf, n, cx, cy, rx, r, BLACK); stadium(buf, n, cx, cy, rx - b, r - b, WHITE);
        X.text({ n, d: buf }, word, Math.round(cx - tw / 2), Math.round(cy - 3.5 * s), BLACK, s);
      } };
    }
    if (kind === 'word') {
      const word = R.pick(WORDS), s = Math.max(2, Math.floor(n * 0.9 / (word.length * 6))), ink = R.bool(0.5) ? WHITE : BLACK; SRC.word = word;
      return { kind, draw(buf, t) {
        for (let y = 0; y < n; y++) { const c = lut[((y * 256 / n + t * 30) | 0) & 255]; for (let x = 0; x < n; x++) buf[y * n + x] = (((x + y) / 4 | 0) & 1) ? c : X.shade(c, 0.75); }
        const w = X.textWidth(word, s), x0 = (n - w) / 2 + Math.sin(t * 0.7) * (n - w) * 0.45, y0 = n / 2 - 3.5 * s + Math.sin(t * 0.45) * n * 0.2;
        X.rect({ n, d: buf }, x0 - s, y0 - s, w + 2 * s, 9 * s, ink === WHITE ? BLACK : WHITE);
        X.text({ n, d: buf }, word, x0, y0, ink, s);
      } };
    }
    if (kind === 'rings') {
      const k = R.range(4, 9) * n / 100, cxs = R.range(0.3, 0.7), cys = R.range(0.3, 0.7);
      return { kind, draw(buf, t) {
        const cx = n * (cxs + 0.2 * Math.sin(t * 0.5)), cy = n * (cys + 0.2 * Math.cos(t * 0.37));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x - cx, y - cy) / k - t; buf[y * n + x] = (Math.floor(r) & 3) === 3 ? BLACK : lut[((Math.floor(r) * 37) & 255)]; }
      } };
    }
    if (kind === 'scroll') {
      const s = Math.max(1, Math.floor(n / 50)), lines = Array.from({ length: 24 }, () => R.pick(WORDS) + ' ' + R.pick(WORDS)), lh = 10 * s, bg = X.shade(lut[R.int(0, 255)], 0.18);
      return { kind, draw(buf, t) {
        buf.fill(bg);
        const off = t * n * 0.12, first = Math.floor(off / lh);
        for (let k = 0; k <= Math.ceil(n / lh); k++) { const y = Math.round(k * lh - (off % lh)) + 2, line = lines[mod(first + k, lines.length)]; X.text({ n, d: buf }, line, 2 * s, y, lut[((first + k) * 41) & 255], s); }
      } };
    }
    if (kind === 'balls') {
      const B = R.int(3, 7), balls = Array.from({ length: B }, (_, k) => ({ x: R.range(0.2, 0.8), y: R.range(0.2, 0.8), vx: R.range(0.15, 0.35) * R.sign(), vy: R.range(0.15, 0.35) * R.sign(), r: R.range(0.07, 0.16), c: lut[(k * 256 / B) | 0] }));
      return { kind, draw(buf, t) {
        for (let y = 0; y < n; y++) { const c = X.shade(lut[((y * 128 / n) | 0) & 255], 0.25); for (let x = 0; x < n; x++) buf[y * n + x] = ((x >> 3) + (y >> 3)) & 1 ? c : X.shade(c, 0.7); }
        for (const b of balls) { const tri = v => { v = mod(v, 2); return v < 1 ? v : 2 - v; }, x = (b.r + tri(b.x + b.vx * t) * (1 - 2 * b.r)) * n, y = (b.r + tri(b.y + b.vy * t) * (1 - 2 * b.r)) * n; X.disc({ n, d: buf }, x, y, b.r * n, b.c); X.disc({ n, d: buf }, x - b.r * n * 0.3, y - b.r * n * 0.3, b.r * n * 0.3, WHITE); }
      } };
    }
    // the Synaesthesia field, early in its clock: broad remainder bands and spirals
    const px = 800 / n, ys = R.int(200, 500), a = R.pick([0.01, 0.02, 0.05]), T0 = R.range(60, 260), rate = R.range(1, 2);
    return { kind, draw(buf, t) {
      const T = T0 + t * rate;
      for (let y = 0; y < n; y++) { const M = (y + 0.5) * px + ys; for (let x = 0; x < n; x++) { const u = ((T * (x + 0.5) * px * a) % M) / M; buf[y * n + x] = u < 0.03 ? BLACK : lut[(u * 255) | 0]; } }
    } };
  }

  add({
    interactive: 'Move over the picture: the compression is heaviest under the pointer.',
    name: 'Requantise', seed: 5, sizes: [80], fps: 10,
    recipe: 'The picture is cut into eight-by-eight blocks and squeezed the way JPEG does it, by rounding away its fine frequencies. A wave of heavy compression rolls across the blocks: under it detail turns to flat tiles with ringing at the edges, and behind it the picture comes back.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field'])), buf = new Uint32Array(n * n), B = n / 8, out = new Uint32Array(n * n);
        const Q = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
        const C = new Float64Array(64); for (let u = 0; u < 8; u++) for (let x = 0; x < 8; x++) C[u * 8 + x] = (u ? 0.5 : Math.SQRT1_2 * 0.5) * Math.cos((2 * x + 1) * u * Math.PI / 16);
        const blk = new Float64Array(64), tmp = new Float64Array(64), co = new Float64Array(64), r = new Float64Array(64), gg = new Float64Array(64);
        const dir = R.range(0, Math.PI * 2), speed = R.range(0.5, 0.9), qmax = R.range(2.5, 5), wave = R.range(0.25, 0.5);
        g.trait('Damage', 'Wave'); g.trait('Heading', dirName(dir)); g.trait('Strength', qmax < 3.7 ? 'Light' : 'Heavy');
        const code = (bx, by, ch, q) => {
          for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) blk[y * 8 + x] = ((buf[(by * 8 + y) * n + bx * 8 + x] >>> (ch * 8)) & 255) - 128;
          for (let y = 0; y < 8; y++) for (let u = 0; u < 8; u++) { let s = 0; for (let x = 0; x < 8; x++) s += C[u * 8 + x] * blk[y * 8 + x]; tmp[y * 8 + u] = s; }
          for (let v = 0; v < 8; v++) for (let u = 0; u < 8; u++) { let s = 0; for (let y = 0; y < 8; y++) s += C[v * 8 + y] * tmp[y * 8 + u]; const k = Q[v * 8 + u] * q; co[v * 8 + u] = Math.round(s / k) * k; }
          for (let v = 0; v < 8; v++) for (let x = 0; x < 8; x++) { let s = 0; for (let u = 0; u < 8; u++) s += C[u * 8 + x] * co[v * 8 + u]; tmp[v * 8 + x] = s; }
          for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { let s = 0; for (let v = 0; v < 8; v++) s += C[v * 8 + y] * tmp[v * 8 + x]; blk[y * 8 + x] = s + 128; }
        };
        let f = 0;
        return t => {
          src.draw(buf, t * 0.6);
          f++;
          for (let by = 0; by < B; by++) for (let bx = 0; bx < B; bx++) {
            if (f > 1 && ((bx + by + f) & 1)) continue;   // half the blocks each frame keeps it light (all of them on the first)
            const inp = g.input, p = (Math.cos(dir) * bx + Math.sin(dir) * by) * wave - t * speed, q = inp.inside ? 0.15 + qmax * 1.4 * Math.exp(-((bx + 0.5 - inp.x * B) ** 2 + (by + 0.5 - inp.y * B) ** 2) / 6) : 0.15 + qmax * Math.pow(0.5 + 0.5 * Math.sin(p), 3);
            code(bx, by, 0, q); r.set(blk); code(bx, by, 1, q); gg.set(blk); code(bx, by, 2, q);
            for (let k = 0; k < 64; k++) out[(by * 8 + (k >> 3)) * n + bx * 8 + (k & 7)] = rgbPk(r[k], gg[k], blk[k]);
          }
          d.set(out);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n)), buf = new Uint32Array(n * n), B = n / 8, out = new Uint32Array(n * n);
      const Q = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
      const C = new Float64Array(64); for (let u = 0; u < 8; u++) for (let x = 0; x < 8; x++) C[u * 8 + x] = (u ? 0.5 : Math.SQRT1_2 * 0.5) * Math.cos((2 * x + 1) * u * Math.PI / 16);
      const blk = new Float64Array(64), tmp = new Float64Array(64), co = new Float64Array(64), r = new Float64Array(64), gg = new Float64Array(64);
      const dir = R.range(0, Math.PI * 2), speed = R.range(0.5, 0.9), qmax = R.range(2.5, 5), wave = R.range(0.25, 0.5);
      // how the damage moves over the blocks: a wave (the original), a ripple from the middle, a checkerboard beat or blocks failing one by one
      const A = g.alt, dmg = g.trait('Damage', A() < 0.45 ? 'Wave' : A() < 0.4 ? 'Ripple' : A() < 0.5 ? 'Checker' : 'Scatter'), ph = Float32Array.from({ length: B * B }, () => A() * Math.PI * 2);
      g.trait('Strength', qmax < 3.7 ? 'Light' : 'Heavy'); if (dmg === 'Wave') g.trait('Heading', dirName(dir));
      const code = (bx, by, ch, q) => {
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) blk[y * 8 + x] = ((buf[(by * 8 + y) * n + bx * 8 + x] >>> (ch * 8)) & 255) - 128;
        for (let y = 0; y < 8; y++) for (let u = 0; u < 8; u++) { let s = 0; for (let x = 0; x < 8; x++) s += C[u * 8 + x] * blk[y * 8 + x]; tmp[y * 8 + u] = s; }
        for (let v = 0; v < 8; v++) for (let u = 0; u < 8; u++) { let s = 0; for (let y = 0; y < 8; y++) s += C[v * 8 + y] * tmp[y * 8 + u]; const k = Q[v * 8 + u] * q; co[v * 8 + u] = Math.round(s / k) * k; }
        for (let v = 0; v < 8; v++) for (let x = 0; x < 8; x++) { let s = 0; for (let u = 0; u < 8; u++) s += C[u * 8 + x] * co[v * 8 + u]; tmp[v * 8 + x] = s; }
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { let s = 0; for (let v = 0; v < 8; v++) s += C[v * 8 + y] * tmp[v * 8 + x]; blk[y * 8 + x] = s + 128; }
      };
      let f = 0;
      return t => {
        src.draw(buf, t * 0.6);
        f++;
        for (let by = 0; by < B; by++) for (let bx = 0; bx < B; bx++) {
          if (f > 1 && ((bx + by + f) & 1)) continue;   // half the blocks each frame keeps it light (all of them on the first)
          const inp = g.input, p = (dmg === 'Ripple' ? Math.hypot(bx + 0.5 - B / 2, by + 0.5 - B / 2) * wave * 1.5 : dmg === 'Checker' ? ((bx + by) & 1) * Math.PI : dmg === 'Scatter' ? ph[by * B + bx] : Math.cos(dir) * bx * wave + Math.sin(dir) * by * wave) - t * speed, q = inp.inside ? 0.15 + qmax * 1.4 * Math.exp(-((bx + 0.5 - inp.x * B) ** 2 + (by + 0.5 - inp.y * B) ** 2) / 6) : 0.15 + qmax * Math.pow(0.5 + 0.5 * Math.sin(p), 3);
          code(bx, by, 0, q); r.set(blk); code(bx, by, 1, q); gg.set(blk); code(bx, by, 2, q);
          for (let k = 0; k < 64; k++) out[(by * 8 + (k >> 3)) * n + bx * 8 + (k & 7)] = rgbPk(r[k], gg[k], blk[k]);
        }
        d.set(out);
      };
    },
  });

  add({
    interactive: 'Move across to pull the two fields apart.',
    listens: 'Loud sound tears the two fields apart.',
    name: 'Interlace', seed: 6, sizes: [50, 80, 100], fps: 12,
    recipe: 'Every other line of the picture is a moment older than its neighbours, as in interlaced video shown on the wrong screen. Whatever moves splits into a comb of teeth, and the gap between the two fields slowly widens and closes.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['word', 'word', 'bars'])), a = new Uint32Array(n * n), b = new Uint32Array(n * n), pitch = R.pick([1, 1, 2]), maxLag = R.range(0.25, 0.6);
        g.trait('Weave', 'Rows'); g.trait('Lines', pitch === 1 ? 'Fine' : 'Coarse'); g.trait('Tear', maxLag < 0.42 ? 'Small' : 'Wide');
        let heard = 0;
        return t => {
          const inp = g.input; if (inp.listening) heard += (inp.level - heard) * 0.35; else heard = 0;
          const lag = inp.inside ? inp.x * 0.8 : maxLag * (0.5 - 0.5 * Math.cos(t * 0.35)) + heard * 0.7;
          src.draw(a, t * 1.6); src.draw(b, (t - lag) * 1.6);
          for (let y = 0; y < n; y++) { const s = ((y / pitch) | 0) & 1 ? b : a; for (let x = 0; x < n; x++) d[y * n + x] = s[y * n + x]; }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n, ['word', 'word', 'bars', 'balls', 'scroll'])), a = new Uint32Array(n * n), b = new Uint32Array(n * n), pitch0 = R.pick([1, 1, 2]), maxLag = R.range(0.25, 0.6);
      // the two fields can be woven in rows (the original), in columns or as a checkerboard
      const A = g.alt, weave = g.trait('Weave', A() < 0.45 ? 'Rows' : A() < 0.6 ? 'Columns' : 'Checker'), pitch = A() < 0.85 ? pitch0 : 4;
      g.trait('Lines', pitch === 1 ? 'Fine' : pitch === 2 ? 'Coarse' : 'Bold'); g.trait('Tear', maxLag < 0.42 ? 'Small' : 'Wide');
      let heard = 0;
      return t => {
        const inp = g.input; if (inp.listening) heard += (inp.level - heard) * 0.35; else heard = 0;
        const lag = inp.inside ? inp.x * 0.8 : maxLag * (0.5 - 0.5 * Math.cos(t * 0.35)) + heard * 0.7;
        src.draw(a, t * 1.6); src.draw(b, (t - lag) * 1.6);
        for (let y = 0; y < n; y++) { const ry = ((y / pitch) | 0) & 1; for (let x = 0; x < n; x++) { const k = weave === 'Rows' ? ry : weave === 'Columns' ? ((x / pitch) | 0) & 1 : ry ^ (((x / pitch) | 0) & 1); d[y * n + x] = (k ? b : a)[y * n + x]; } }
      };
    },
  });

  add({
    interactive: 'Click to start a faulty run of memory where you click.',
    name: 'Palette Slip', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'The picture is stored as numbers into a sixteen-colour palette, and runs of memory start reading the palette off by a few places. Each faulty run creeps along the rows, recolouring everything it covers while the shapes stay sharp, then heals.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field'])), buf = new Uint32Array(n * n), N = n * n, K = 16, ps = R.bool(0.5) ? 100 : 85, pf = R.range(0, 100), pal = U.hueLut(ps, 100, K, pf, 100);
        g.trait('Palette', '16 hues from ' + hueName(pf)); g.trait('Colours', 16); g.trait('Faults run', 'Along rows');
        const runs = [];
        const spawn = (Q = R) => runs.push({ start: Q.int(0, N - 1), len: 0, grow: Q.range(0.004, 0.012) * N, max: Q.range(0.08, 0.3) * N, k: Q.int(1, K - 1), age: 0 });
        const idx = new Uint8Array(N), lumOf = new Float32Array(N);
        return (t, dt) => {
          src.draw(buf, t * 0.5);
          for (let i = 0; i < N; i++) {   // quantise to the palette by hue, keep darkness as its own index
            const v = buf[i], r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
            lumOf[i] = mx;
            let h = 0; if (mx !== mn) { h = mx === r ? (gg - b) / (mx - mn) : mx === gg ? 2 + (b - r) / (mx - mn) : 4 + (r - gg) / (mx - mn); h = mod(h / 6, 1); }
            idx[i] = mx - mn < 30 ? (mx > 128 ? 254 : 255) : (h * K) | 0;
          }
          for (const tp of g.input.taps()) { if (runs.length >= 8) runs.shift(); spawn(g.alt); runs[runs.length - 1].start = (Math.min(n - 1, tp.y * n | 0)) * n + Math.min(n - 1, tp.x * n | 0); }
          if (runs.length < 3 && R() < dt * 0.8) spawn();
          for (const r of runs) { r.age += dt; r.len = r.age < 4 ? Math.min(r.max, r.len + r.grow * dt * 12) : r.len - r.grow * dt * 12; }
          for (let k = runs.length - 1; k >= 0; k--) if (runs[k].age > 4 && runs[k].len <= 0) runs.splice(k, 1);
          const hv = g.input.inside ? Math.min(n - 1, g.input.y * n | 0) * n + Math.min(n - 1, g.input.x * n | 0) : -1, hl = n * 1.5;
          for (let i = 0; i < N; i++) {
            let v = idx[i], shift = 0;
            for (const r of runs) if (mod(i - r.start, N) < r.len) shift += r.k;
            if (hv >= 0 && mod(i - hv, N) < hl) shift += 5;
            d[i] = v === 255 ? BLACK : v === 254 ? (shift ? pal[shift % K] : WHITE) : pal[(v + shift) % K];
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // how many colours the memory holds, and which way a fault runs, are this variation's own
      const A = g.alt, K = +g.trait('Colours', A() < 0.5 ? 16 : A() < 0.6 ? 8 : 5), down = g.trait('Faults run', A() < 0.6 ? 'Along rows' : 'Down columns') === 'Down columns';
      const { n, d } = g, src = nameSource(g, source2(R, n)), buf = new Uint32Array(n * n), N = n * n, ps = R.bool(0.5) ? 100 : 85, pf = R.range(0, 100), pal = U.hueLut(ps, 100, K, pf, 100);
      g.trait('Palette', K + ' hues from ' + hueName(pf));
      const runs = [];
      const spawn = () => runs.push({ start: R.int(0, N - 1), len: 0, grow: R.range(0.004, 0.012) * N, max: R.range(0.08, 0.3) * N, k: R.int(1, K - 1), age: 0 });
      const idx = new Uint8Array(N), lumOf = new Float32Array(N);
      return (t, dt) => {
        src.draw(buf, t * 0.5);
        for (let i = 0; i < N; i++) {   // quantise to the palette by hue, keep darkness as its own index
          const v = buf[i], r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
          lumOf[i] = mx;
          let h = 0; if (mx !== mn) { h = mx === r ? (gg - b) / (mx - mn) : mx === gg ? 2 + (b - r) / (mx - mn) : 4 + (r - gg) / (mx - mn); h = mod(h / 6, 1); }
          idx[i] = mx - mn < 30 ? (mx > 128 ? 254 : 255) : (h * K) | 0;
        }
        for (const tp of g.input.taps()) { if (runs.length >= 8) runs.shift(); spawn(); const tx = Math.min(n - 1, tp.x * n | 0), ty = Math.min(n - 1, tp.y * n | 0); runs[runs.length - 1].start = down ? tx * n + ty : ty * n + tx; }
        if (runs.length < 3 && R() < dt * 0.8) spawn();
        for (const r of runs) { r.age += dt; r.len = r.age < 4 ? Math.min(r.max, r.len + r.grow * dt * 12) : r.len - r.grow * dt * 12; }
        for (let k = runs.length - 1; k >= 0; k--) if (runs[k].age > 4 && runs[k].len <= 0) runs.splice(k, 1);
        const hx = Math.min(n - 1, g.input.x * n | 0), hy = Math.min(n - 1, g.input.y * n | 0), hv = g.input.inside ? (down ? hx * n + hy : hy * n + hx) : -1, hl = n * 1.5;
        for (let i = 0; i < N; i++) {
          let v = idx[i], shift = 0; const ii = down ? (i % n) * n + ((i / n) | 0) : i;
          for (const r of runs) if (mod(ii - r.start, N) < r.len) shift += r.k;
          if (hv >= 0 && mod(ii - hv, N) < hl) shift += 5;
          d[i] = v === 255 ? BLACK : v === 254 ? (shift ? pal[shift % K] : WHITE) : pal[(v + shift) % K];
        }
      };
    },
  });

  add({
    interactive: 'Move across to bring the three guns together or drive them apart.',
    listens: 'The room’s loudness drives the three guns apart; a clap jolts them.',
    name: 'Convergence', seed: 4, sizes: [80, 100], fps: 12,
    recipe: 'A crosshatch test pattern on a colour tube whose three guns have drifted apart: red, green and blue land in different places, worst at the corners. An engineer’s slow adjustment pulls them together into white lines and lets them drift apart again.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, step = R.pick([n / 6, n / 8, n / 10]), dot = R.bool(0.6), c = (n - 1) / 2;
        const gun = [0, 1, 2].map(() => ({ kx: R.range(-1, 1), ky: R.range(-1, 1), sx: R.range(-1, 1), sy: R.range(-1, 1) }));
        const pattern = (x, y) => { const gx = mod(x, step), gy = mod(y, step); return gx < 1 || gy < 1 ? 1 : dot && Math.abs(gx - step / 2) < 1 && Math.abs(gy - step / 2) < 1 ? 1 : 0; };
        const drift = Math.max(...gun.map(G => Math.abs(G.sx) + Math.abs(G.kx) + Math.abs(G.sy) + Math.abs(G.ky)));
        g.trait('Pattern', dot ? 'Crosshatch and dots' : 'Crosshatch'); g.trait('Screen', 'Black'); g.trait('Grid', Math.round(n / step) + ' squares'); g.trait('Drift', drift < 2.2 ? 'Mild' : drift < 2.9 ? 'Strong' : 'Wild');
        let heard = 0, jolt = 0;
        return t => {
          const inp = g.input; let m = inp.inside ? inp.x : 0.5 - 0.5 * Math.cos(t * 0.3);
          if (inp.listening && !inp.inside) { heard += (inp.level - heard) * 0.3; jolt = jolt * 0.8 + inp.beats() * 0.45; m = Math.min(1.6, 0.08 + heard * 1.1 + jolt); } else { heard = 0; jolt = 0; }
          const amt = m * n * 0.05;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const ux = (x - c) / c, uy = (y - c) / c, r2 = ux * ux + uy * uy;
            let v = 0xff000000;
            for (let k = 0; k < 3; k++) {
              const G = gun[k], ox = Math.round((G.sx + G.kx * r2) * amt), oy = Math.round((G.sy + G.ky * r2) * amt);
              if (pattern(x - ox + 0.5, y - oy + 0.5)) v |= 0xff << (k * 8);
            }
            d[y * n + x] = v >>> 0;
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, step = R.pick([n / 5, n / 6, n / 8, n / 10]), dot = R.bool(0.6), c = (n - 1) / 2;
      const gun = [0, 1, 2].map(() => ({ kx: R.range(-1, 1), ky: R.range(-1, 1), sx: R.range(-1, 1), sy: R.range(-1, 1) }));
      // the test pattern on the tube: crosshatch (the original), dots, circles, a checkerboard or bars
      const A = g.alt, pat = A() < 0.45 ? 'Crosshatch' : A() < 0.3 ? 'Dots' : A() < 0.5 ? 'Circles' : A() < 0.6 ? 'Checker' : 'Bars', drift = Math.max(...gun.map(G => Math.abs(G.sx) + Math.abs(G.kx) + Math.abs(G.sy) + Math.abs(G.ky)));
      g.trait('Pattern', pat === 'Crosshatch' && dot ? 'Crosshatch and dots' : pat); const white = g.trait('Screen', A() < 0.75 ? 'Black' : 'White') === 'White'; g.trait('Grid', Math.round(n / step) + ' squares'); g.trait('Drift', drift < 2.2 ? 'Mild' : drift < 2.9 ? 'Strong' : 'Wild');
      const pattern = pat === 'Dots' ? (x, y) => { const gx = mod(x, step) - step / 2, gy = mod(y, step) - step / 2; return gx * gx + gy * gy < 2.3 ? 1 : 0; }
        : pat === 'Circles' ? (x, y) => { const r = Math.hypot(x - c - 0.5, y - c - 0.5); return mod(r, step * 0.5) < 1 || Math.abs(x - c - 0.5) < 0.5 || Math.abs(y - c - 0.5) < 0.5 ? 1 : 0; }
        : pat === 'Checker' ? (x, y) => ((Math.floor(x / step) + Math.floor(y / step)) & 1)
        : pat === 'Bars' ? (x, y) => mod(x, step) < step / 2 ? 1 : 0
        : (x, y) => { const gx = mod(x, step), gy = mod(y, step); return gx < 1 || gy < 1 ? 1 : dot && Math.abs(gx - step / 2) < 1 && Math.abs(gy - step / 2) < 1 ? 1 : 0; };
        let heard = 0, jolt = 0;
      return t => {
        const inp = g.input; let m = inp.inside ? inp.x : 0.5 - 0.5 * Math.cos(t * 0.3);
          if (inp.listening && !inp.inside) { heard += (inp.level - heard) * 0.3; jolt = jolt * 0.8 + inp.beats() * 0.45; m = Math.min(1.6, 0.08 + heard * 1.1 + jolt); } else { heard = 0; jolt = 0; }
          const amt = m * n * 0.05;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const ux = (x - c) / c, uy = (y - c) / c, r2 = ux * ux + uy * uy;
          let v = 0xff000000;
          for (let k = 0; k < 3; k++) {
            const G = gun[k], ox = Math.round((G.sx + G.kx * r2) * amt), oy = Math.round((G.sy + G.ky * r2) * amt);
            if (pattern(x - ox + 0.5, y - oy + 0.5)) v |= 0xff << (k * 8);
          }
          d[y * n + x] = white ? (~v | 0xff000000) >>> 0 : v >>> 0;
        }
      };
    },
  });

  add({
    interactive: 'Click to send a keyframe and clean the picture.',
    listens: 'Every clap knocks slices out of the picture.',
    name: 'Concealment', seed: 5, sizes: [50, 80, 100], fps: 12,
    recipe: 'Video arrives in slices, and slices go missing. A lost block is patched with the block above it, so holes stretch downward as smears of stale colour and pile into a patchwork, until a keyframe arrives and the whole picture snaps clean.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field'])), buf = new Uint32Array(n * n), bs = n / 10, B = 10, loss = R.range(0.04, 0.1), every = R.range(5, 8);
        g.trait('Slices', 'Blocks'); g.trait('Patch', 'From above'); g.trait('Loss', loss < 0.07 ? 'Light' : 'Heavy'); g.trait('Keyframes', every < 6.5 ? 'Often' : 'Seldom');
        let since = 0, first = true, burst = 0;
        return (t, dt) => {
          const inp = g.input, hx = inp.inside ? inp.x * B | 0 : -9, hy = inp.inside ? inp.y * B | 0 : -9;
          if (inp.listening && inp.beats()) burst = 0.5;
          burst = Math.max(0, burst - dt);
          src.draw(buf, t * 0.8);
          since += dt;
          if (first || since > every || inp.taps().length) { d.set(buf); since = 0; first = false; return; }
          let lost = 0;
          for (let k = 0; k < B * B; k++) {
            const bx = k % B, by = (k / B) | 0;
            if (!lost && Math.abs(bx - hx) <= 1 && Math.abs(by - hy) <= 1) lost = 1;
            if (!lost && burst > 0 && g.alt() < 0.3) lost = 3;
            if (!lost && R() < loss) lost = R.int(2, 9);
            for (let y = by * bs; y < (by + 1) * bs; y++) for (let x = bx * bs; x < (bx + 1) * bs; x++) {
              const i = y * n + x;
              if (!lost) d[i] = buf[i];
              else if (by > 0) d[i] = d[i - bs * n];   // copy the block above: the smear runs downward
            }
            if (lost) lost--;
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n)), buf = new Uint32Array(n * n), bs = n / 10, B = 10, loss = R.range(0.04, 0.1), every = R.range(5, 8);
      // how the picture is sliced and how a lost slice is patched
      const A = g.alt, slices = g.trait('Slices', A() < 0.45 ? 'Blocks' : A() < 0.5 ? 'Big blocks' : 'Wide slices'), patch = g.trait('Patch', A() < 0.5 ? 'From above' : A() < 0.5 ? 'From the left' : 'Frozen');
      g.trait('Loss', loss < 0.07 ? 'Light' : 'Heavy'); g.trait('Keyframes', every < 6.5 ? 'Often' : 'Seldom');
      const BX = slices === 'Big blocks' ? 5 : slices === 'Wide slices' ? 2 : 10, BY = slices === 'Big blocks' ? 5 : 10, bw = n / BX, bh = n / BY;
      let since = 0, first = true, burst = 0;
      return (t, dt) => {
        const inp = g.input, hx = inp.inside ? inp.x * BX | 0 : -9, hy = inp.inside ? inp.y * BY | 0 : -9;
        if (inp.listening && inp.beats()) burst = 0.5;
        burst = Math.max(0, burst - dt);
        src.draw(buf, t * 0.8);
        since += dt;
        if (first || since > every || inp.taps().length) { d.set(buf); since = 0; first = false; return; }
        let lost = 0;
        for (let k = 0; k < BX * BY; k++) {
          const bx = k % BX, by = (k / BX) | 0;
          if (!lost && Math.abs(bx - hx) <= 1 && Math.abs(by - hy) <= 1) lost = 1;
          if (!lost && burst > 0 && g.alt() < 0.3) lost = 3;
          if (!lost && R() < loss * (100 / (BX * BY)) ** 0.5) lost = R.int(2, 9);
          if (lost && patch === 'Frozen') { lost--; continue; }   // a frozen slice keeps whatever it last showed
          for (let y = Math.round(by * bh); y < Math.round((by + 1) * bh); y++) for (let x = Math.round(bx * bw); x < Math.round((bx + 1) * bw); x++) {
            const i = y * n + x;
            if (!lost) d[i] = buf[i];
            else if (patch === 'From the left') { if (bx > 0) d[i] = d[i - Math.round(bw)]; }
            else if (by > 0) d[i] = d[i - Math.round(bh) * n];   // copy the block above: the smear runs downward
          }
          if (lost) lost--;
        }
      };
    },
  });

  add({
    interactive: 'Drag the word around; click to wipe a patch clean.',
    name: 'Hall of Mirrors', seed: 3, sizes: [50, 80, 100], fps: 12,
    recipe: 'A word bounces round the screen but nothing erases where it has been, so every frame is left behind as a trail. Now and then a rectangle of the screen is repainted and wiped clean, and the trails grow back over it.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, word = R.pick(WORDS), s = Math.max(1, Math.floor(n / 40)), w = X.textWidth(word, s) + 2 * s, h = 9 * s, lut = U.hueLut(100, 100, 256, R.range(0, 100), 100), gh = R.range(0, 100), ground = X.hsbPk(gh, 60, 18);
        g.trait('Logo', 'Word box'); g.trait('Word', word); g.trait('Ground', hueName(gh)); g.trait('Edge', 'Lit');
        let x = R.range(0, n - w), y = R.range(0, n - h), vx = R.range(9, 16) * R.sign() * n / 100, vy = R.range(7, 13) * R.sign() * n / 100, hue = R.range(0, 256), wipe = null;
        d.fill(ground);
        const inp = g.input, sp0 = Math.hypot(vx, vy);
        let dragged = false;
        return (t, dt) => {
          for (const tp of inp.taps()) if (!wipe) wipe = { x: Math.max(0, tp.x * n - n * 0.15) | 0, y: Math.max(0, tp.y * n - n * 0.15) | 0, w: n * 0.3 | 0, h: n * 0.3 | 0, k: 0 };
          if (inp.down && inp.inside) { const nx = inp.x * n - w / 2, ny = inp.y * n - h / 2; vx = (nx - x) / Math.max(dt, 0.02); vy = (ny - y) / Math.max(dt, 0.02); x = nx; y = ny; hue = (hue + 2) % 256; dragged = true; }
          else if (inp.inside) { vx += (inp.x * n - w / 2 - x) * dt * 0.9; vy += (inp.y * n - h / 2 - y) * dt * 0.9; const sp = Math.hypot(vx, vy); if (sp > sp0 * 1.3) { vx *= sp0 * 1.3 / sp; vy *= sp0 * 1.3 / sp; } dragged = true; }
          else if (dragged) { const sp = Math.hypot(vx, vy); if (sp > sp0) { vx *= 0.9; vy *= 0.9; } else dragged = false; }
          x += vx * dt; y += vy * dt;
          if (x < 0 || x > n - w) { vx = -vx; x = Math.max(0, Math.min(n - w, x)); hue = (hue + 40) % 256; }
          if (y < 0 || y > n - h) { vy = -vy; y = Math.max(0, Math.min(n - h, y)); hue = (hue + 40) % 256; }
          if (!wipe && R() < dt * 0.5) wipe = { x: R.int(0, n * 0.6), y: R.int(0, n * 0.6), w: R.int(n * 0.2, n * 0.5), h: R.int(n * 0.2, n * 0.5), k: 0 };
          if (wipe) { const rows = Math.ceil(wipe.h * dt * 3); X.rect(g, wipe.x, wipe.y + wipe.k, wipe.w, rows, ground); wipe.k += rows; if (wipe.k >= wipe.h) wipe = null; }
          const c = lut[(hue + t * 20) & 255];
          X.rect(g, x, y, w, h, X.shade(c, 0.35)); X.text(g, word, x + s, y + s, c, s);
          X.rect(g, x, y, w, 1, WHITE); X.rect(g, x, y + h - 1, w, 1, X.shade(c, 0.2));
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // what bounces (a word box, a ball or a rounded tag) and how its edge catches the light
      const A = g.alt, logo = g.trait('Logo', A() < 0.45 ? 'Word box' : A() < 0.5 ? 'Ball' : 'Tag'), lit = g.trait('Edge', A() < 0.6 ? 'Lit' : 'Plain') === 'Lit';
      const { n, d } = g, word = R.pick(WORDS), s = Math.max(1, Math.floor(n / 40)), w0 = X.textWidth(word, s) + 2 * s, h0 = 9 * s, lut = U.hueLut(100, 100, 256, R.range(0, 100), 100), gh = R.range(0, 100), ground = X.hsbPk(gh, 60, 18);
      const w = logo === 'Ball' ? Math.round(n * 0.26) : logo === 'Tag' ? w0 + 4 * s : w0, h = logo === 'Ball' ? w : logo === 'Tag' ? h0 + 2 * s : h0;
      g.trait('Ground', hueName(gh)); if (logo !== 'Ball') g.trait('Word', word);
      let x = R.range(0, n - w), y = R.range(0, n - h), vx = R.range(9, 16) * R.sign() * n / 100, vy = R.range(7, 13) * R.sign() * n / 100, hue = R.range(0, 256), wipe = null;
      d.fill(ground);
      const inp = g.input;
      return (t, dt) => {
        for (const tp of inp.taps()) if (!wipe) wipe = { x: Math.max(0, tp.x * n - n * 0.15) | 0, y: Math.max(0, tp.y * n - n * 0.15) | 0, w: n * 0.3 | 0, h: n * 0.3 | 0, k: 0 };
        if (inp.down && inp.inside) { const nx = inp.x * n - w / 2, ny = inp.y * n - h / 2; vx = (nx - x) / Math.max(dt, 0.02); vy = (ny - y) / Math.max(dt, 0.02); x = nx; y = ny; hue = (hue + 2) % 256; }
        else { if (inp.inside) { vx += (inp.x * n - w / 2 - x) * dt * 0.9; vy += (inp.y * n - h / 2 - y) * dt * 0.9; } const sp = Math.hypot(vx, vy), want = 12 * n / 100; if (sp > want * 1.5) { vx *= 0.9; vy *= 0.9; } }
        x += vx * dt; y += vy * dt;
        if (x < 0 || x > n - w) { vx = -vx; x = Math.max(0, Math.min(n - w, x)); hue = (hue + 40) % 256; }
        if (y < 0 || y > n - h) { vy = -vy; y = Math.max(0, Math.min(n - h, y)); hue = (hue + 40) % 256; }
        if (!wipe && R() < dt * 0.5) wipe = { x: R.int(0, n * 0.6), y: R.int(0, n * 0.6), w: R.int(n * 0.2, n * 0.5), h: R.int(n * 0.2, n * 0.5), k: 0 };
        if (wipe) { const rows = Math.ceil(wipe.h * dt * 3); X.rect(g, wipe.x, wipe.y + wipe.k, wipe.w, rows, ground); wipe.k += rows; if (wipe.k >= wipe.h) wipe = null; }
        const c = lut[(hue + t * 20) & 255];
        if (logo === 'Ball') { const r = w / 2; X.disc(g, x + r, y + r, r, X.shade(c, 0.45)); X.disc(g, x + r - r * 0.1, y + r - r * 0.1, r * 0.82, c); if (lit) X.disc(g, x + r * 0.6, y + r * 0.6, Math.max(1, r * 0.22), WHITE); }
        else if (logo === 'Tag') { stadium(d, n, x + w / 2, y + h / 2, w / 2, h / 2, lit ? WHITE : X.shade(c, 0.2)); stadium(d, n, x + w / 2, y + h / 2 + (lit ? 1 : 0), w / 2 - 1, h / 2 - 1, X.shade(c, 0.35)); X.text(g, word, Math.round(x + 3 * s), Math.round(y + 2 * s), c, s); }
        else { X.rect(g, x, y, w, h, X.shade(c, 0.35)); X.text(g, word, x + s, y + s, c, s); if (lit) X.rect(g, x, y, w, 1, WHITE); X.rect(g, x, y + h - 1, w, 1, X.shade(c, 0.2)); }
      };
    },
  });

  add({
    interactive: 'Move across to choose how coarse the colour is.',
    name: 'Subsampling', seed: 6, sizes: [80, 100], fps: 12,
    recipe: 'Brightness is kept for every pixel but colour only for blocks of them, as video codecs do. The colour blocks grow from one pixel to eight and slide out of line with the picture, so hues bleed past the edges of the shapes they belong to.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'word'])), buf = new Uint32Array(n * n), Y = new Float32Array(n * n), Cb = new Float32Array(n * n), Cr = new Float32Array(n * n), sizes = [1, 2, 4, 8, 4, 2];
        g.trait('Colour blocks', 'Square'); g.trait('Brightness', 'Smooth');
        return t => {
          src.draw(buf, t * 0.5);
          const k = g.input.inside ? [1, 2, 4, 8, 16][Math.min(4, g.input.x * 5 | 0)] : sizes[Math.floor(t / 2.5) % sizes.length], ox = Math.round(Math.sin(t * 0.4) * k * 1.5), oy = Math.round(Math.cos(t * 0.3) * k);
          for (let i = 0; i < n * n; i++) { const v = buf[i], r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255; Y[i] = 0.299 * r + 0.587 * gg + 0.114 * b; Cb[i] = b - Y[i]; Cr[i] = r - Y[i]; }
          for (let by = 0; by < n; by += k) for (let bx = 0; bx < n; bx += k) {
            let cb = 0, cr = 0, m = 0;
            for (let y = by; y < by + k && y < n; y++) for (let x = bx; x < bx + k && x < n; x++) { cb += Cb[y * n + x]; cr += Cr[y * n + x]; m++; }
            cb /= m; cr /= m;
            for (let y = by; y < by + k; y++) for (let x = bx; x < bx + k; x++) {
              const xx = x + ox, yy = y + oy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
              const i = yy * n + xx, L = Y[i], r = L + cr, b = L + cb, gg = (L - 0.299 * r - 0.114 * b) / 0.587;
              d[i] = rgbPk(r, gg, b);
            }
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'word', 'balls', 'rings'])), buf = new Uint32Array(n * n), Y = new Float32Array(n * n), Cb = new Float32Array(n * n), Cr = new Float32Array(n * n), sizes = [1, 2, 4, 8, 4, 2];
      // the shape of the colour blocks (square as in the original, wide like 4:2:2, or tall) and how brightness is kept
      const A = g.alt, shape = g.trait('Colour blocks', A() < 0.45 ? 'Square' : A() < 0.6 ? 'Wide' : 'Tall'), poster = g.trait('Brightness', A() < 0.75 ? 'Smooth' : 'Banded') === 'Banded';
      return t => {
        src.draw(buf, t * 0.5);
        const k = g.input.inside ? [1, 2, 4, 8, 16][Math.min(4, g.input.x * 5 | 0)] : sizes[Math.floor(t / 2.5) % sizes.length], ox = Math.round(Math.sin(t * 0.4) * k * 1.5), oy = Math.round(Math.cos(t * 0.3) * k);
        const kx = shape === 'Wide' ? k * 2 : shape === 'Tall' ? Math.max(1, k >> 1) : k, ky = shape === 'Wide' ? Math.max(1, k >> 1) : shape === 'Tall' ? k * 2 : k;
        for (let i = 0; i < n * n; i++) { const v = buf[i], r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255; Y[i] = 0.299 * r + 0.587 * gg + 0.114 * b; Cb[i] = b - Y[i]; Cr[i] = r - Y[i]; if (poster) Y[i] = Math.round(Y[i] / 51) * 51; }
        for (let by = 0; by < n; by += ky) for (let bx = 0; bx < n; bx += kx) {
          let cb = 0, cr = 0, m = 0;
          for (let y = by; y < by + ky && y < n; y++) for (let x = bx; x < bx + kx && x < n; x++) { cb += Cb[y * n + x]; cr += Cr[y * n + x]; m++; }
          cb /= m; cr /= m;
          for (let y = by; y < by + ky; y++) for (let x = bx; x < bx + kx; x++) {
            const xx = x + ox, yy = y + oy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
            const i = yy * n + xx, L = Y[i], r = L + cr, b = L + cb, gg = (L - 0.299 * r - 0.114 * b) / 0.587;
            d[i] = rgbPk(r, gg, b);
          }
        }
      };
    },
  });

  add({
    interactive: 'Move the pointer to place the echo: across for its delay, down for its strength.',
    listens: 'The ghosts swell and stretch with the sound in the room.',
    name: 'Multipath', seed: 2, sizes: [50, 80, 100], fps: 12,
    recipe: 'A broadcast picture arrives twice, once direct and once bounced off a distant building a moment later, so a faint second image hangs beside the first. The echoes drift in and out and sometimes arrive inverted, outlining every edge in negative.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field'])), buf = new Uint32Array(n * n), echoes = [0, 1].map(() => ({ d0: R.range(0.06, 0.2) * n, amp: R.range(0.3, 0.6) * (R.bool(0.4) ? -1 : 1), w: R.range(0.15, 0.35), ph: R.range(0, 6) }));
        let heard = 0;
        g.trait('Path', 'Sideways'); g.trait('Echo', echoes[0].amp < 0 ? 'Inverted' : 'Positive'); g.trait('Distance', echoes[0].d0 < n * 0.13 ? 'Near' : 'Far');
        return t => {
          src.draw(buf, t * 0.4);
          const inp = g.input, off = echoes.map((e, k) => inp.inside ? Math.round(inp.x * n * 0.4 * (k + 1)) : Math.round(e.d0 * (1 + 0.5 * Math.sin(t * e.w + e.ph)))), amp = echoes.map((e, k) => inp.inside ? (inp.y - 0.5) * 1.6 / (k + 1) : e.amp * (0.6 + 0.4 * Math.sin(t * e.w * 0.7 + k)));
          if (inp.listening && !inp.inside) { heard += (inp.level - heard) * 0.35; for (let k = 0; k < 2; k++) { amp[k] *= 0.25 + heard * 1.6; off[k] = Math.round(off[k] * (0.7 + heard)); } } else heard = 0;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const v = buf[y * n + x]; let r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255;
            for (let k = 0; k < 2; k++) { const xs = x - off[k]; if (xs < 0) continue; const e = buf[y * n + xs], a = amp[k]; r += a * (e & 255); gg += a * (e >> 8 & 255); b += a * (e >> 16 & 255); }
            d[y * n + x] = rgbPk(r, gg, b);
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field', 'balls', 'scroll'])), buf = new Uint32Array(n * n), echoes = [0, 1].map(() => ({ d0: R.range(0.06, 0.2) * n, amp: R.range(0.3, 0.6) * (R.bool(0.4) ? -1 : 1), w: R.range(0.15, 0.35), ph: R.range(0, 6) }));
        let heard = 0;
      // which way the bounced copy arrives from, and whether it is a plain or a coloured ghost
      const A = g.alt, path = g.trait('Path', A() < 0.45 ? 'Sideways' : A() < 0.5 ? 'From above' : 'Diagonal'), tint = g.trait('Ghost', A() < 0.65 ? 'Plain' : A() < 0.5 ? 'Red shift' : 'Blue shift');
      const tr = tint === 'Red shift' ? 1.3 : tint === 'Blue shift' ? 0.5 : 1, tb = tint === 'Red shift' ? 0.5 : tint === 'Blue shift' ? 1.3 : 1;
      g.trait('Echo', echoes[0].amp < 0 ? 'Inverted' : 'Positive'); g.trait('Distance', echoes[0].d0 < n * 0.13 ? 'Near' : 'Far');
      return t => {
        src.draw(buf, t * 0.4);
        const inp = g.input, off = echoes.map((e, k) => inp.inside ? Math.round(inp.x * n * 0.4 * (k + 1)) : Math.round(e.d0 * (1 + 0.5 * Math.sin(t * e.w + e.ph)))), amp = echoes.map((e, k) => inp.inside ? (inp.y - 0.5) * 1.6 / (k + 1) : e.amp * (0.6 + 0.4 * Math.sin(t * e.w * 0.7 + k)));
          if (inp.listening && !inp.inside) { heard += (inp.level - heard) * 0.35; for (let k = 0; k < 2; k++) { amp[k] *= 0.25 + heard * 1.6; off[k] = Math.round(off[k] * (0.7 + heard)); } } else heard = 0;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const v = buf[y * n + x]; let r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255;
          for (let k = 0; k < 2; k++) {
            const o2 = path === 'Diagonal' ? Math.round(off[k] * 0.7) : off[k], xs = path === 'From above' ? x : x - o2, ys = path === 'Sideways' ? y : y - o2; if (xs < 0 || ys < 0) continue;
            const e = buf[ys * n + xs], a = amp[k]; r += a * (e & 255) * tr; gg += a * (e >> 8 & 255); b += a * (e >> 16 & 255) * tb;
          }
          d[y * n + x] = rgbPk(r, gg, b);
        }
      };
    },
  });

  add({
    name: 'Aliasing', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'A chirp, a pattern whose stripes get finer and finer across the frame, is sampled once per pixel. Past the point the pixels can follow, false stripes appear that are not in the pattern at all, and as its scale breathes those phantom bands sweep and swirl.',
    make(R, U, g) {
      const { n, d } = g, lut = U.hueLut(R.bool(0.5) ? 100 : 85, 100, 256, R.range(0, 100), R.pick([100, 50, -50])), kx = R.range(0.6, 1.4), ky = R.range(0.6, 1.4) * R.pick([1, -1, 0.5, 0]), cx = R.range(0, 0.3) * n, cy = R.range(0, 0.3) * n, two = R.bool(0.5);
      // the stripes reach one per two pixels (the most the grid can show) about a third of the way across
      const c = 0.25 / (Math.max(kx, Math.abs(ky)) * 0.35 * n);
      return t => {
        const s = 1 + 0.06 * Math.sin(t * 0.25), drift = t * 0.6;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const X0 = (x - cx) * s, Y0 = (y - cy) * s, ph = (X0 * X0 * kx + Y0 * Y0 * ky) * c + drift, v = ph - Math.floor(ph);
          d[y * n + x] = two ? (v < 0.5 ? lut[(((X0 + Y0) * 2 + drift * 40) | 0) & 255] : BLACK) : lut[(v * 256) | 0];
        }
      };
    },
  });

  add({
    interactive: 'Click to load a fresh original.',
    name: 'Generation Loss', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'The same picture is turned a few degrees and back again, over and over, each time snapping to the nearest pixel and losing a little colour depth. Nothing new is added, yet the copy shatters into jagged shards and stairs, until a fresh original is loaded.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, src = nameSource(g, source2(R, n, ['bars', 'word', 'field'])), a = new Uint32Array(n * n), b = new Uint32Array(n * n);
        let c = (n - 1) / 2, cx = c, cy = c, wipe = n;
        const old = new Uint32Array(n * n);
        let ang = R.range(0.08, 0.2), passes = 0;
        const rotate = (from, to, th) => {
          const co = Math.cos(th), si = Math.sin(th);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const dx = x - cx, dy = y - cy, sx = Math.round(cx + co * dx + si * dy), sy = Math.round(cy - si * dx + co * dy);
            to[y * n + x] = (from[mod(sy, n) * n + mod(sx, n)] & 0xfff0f0f0 | 0xff000000) >>> 0;   // wraps round, so nothing is lost off the edge but detail
          }
        };
        const fresh = (t, Q = R) => { old.set(d); wipe = 0; src.draw(a, t); passes = 0; ang = Q.range(0.08, 0.2) * Q.sign(); };
        fresh(0); wipe = n; g.trait('Copy', 'Turn'); g.trait('Colour depth', 'Twelve bits'); g.trait('Strength', Math.abs(ang) < 0.14 ? 'Gentle' : 'Steep');
        return (t, dt) => {
          if (passes > 150) fresh(t);
          if (g.input.taps().length) fresh(t, g.alt);
          // a slightly different turn and pivot each pass, so the copy never settles into a fixed point
          const th = ang * (1 + 0.35 * Math.sin(passes * 0.37)); c = (n - 1) / 2 + Math.sin(passes * 0.21) * n * 0.1;
          if (g.input.inside) { cx = g.input.x * n; cy = g.input.y * n; } else { cx = c; cy = c; }   // the copy turns about the pointer
          rotate(a, b, th); rotate(b, a, -th); passes++;
          d.set(a);
          if (wipe < n) { const w = wipe | 0; d.set(old.subarray(w * n), w * n); X.rect(g, 0, w, n, 1, 0xffd8d8d8); wipe += n * dt * 2.2; }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, src = nameSource(g, source2(R, n)), a = new Uint32Array(n * n), b = new Uint32Array(n * n);
      // what each copy does to the picture: turn it (the original), shear it, zoom it or ripple it; and how many bits each copy keeps
      const A = g.alt, copy = g.trait('Copy', A() < 0.45 ? 'Turn' : A() < 0.35 ? 'Shear' : A() < 0.55 ? 'Zoom' : 'Ripple'), mask = g.trait('Colour depth', A() < 0.75 ? 'Twelve bits' : 'Nine bits') === 'Nine bits' ? 0xffe0e0e0 : 0xfff0f0f0;
      let c = (n - 1) / 2, cx = c, cy = c, wipe = n;
        const old = new Uint32Array(n * n);
      let ang = R.range(0.08, 0.2), passes = 0;
      const rotate = (from, to, th) => {
        const co = Math.cos(th), si = Math.sin(th), zs = 1 / (1 + th * 0.3);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - cx, dy = y - cy;
          let sx, sy;
          if (copy === 'Shear') { sx = Math.round(x + th * 1.4 * dy); sy = Math.round(y + th * 0.22 * dx); }
          else if (copy === 'Zoom') { sx = Math.round(cx + dx * zs); sy = Math.round(cy + dy * zs); }
          else if (copy === 'Ripple') { sx = Math.round(x + Math.sin(y * 0.35 + passes * 0.3) * th * 9); sy = Math.round(y + Math.sin(x * 0.35 + passes * 0.2) * th * 4); }
          else { sx = Math.round(cx + co * dx + si * dy); sy = Math.round(cy - si * dx + co * dy); }
          to[y * n + x] = (from[mod(sy, n) * n + mod(sx, n)] & mask | 0xff000000) >>> 0;   // wraps round, so nothing is lost off the edge but detail
        }
      };
      const fresh = t => { old.set(d); wipe = 0; src.draw(a, t); passes = 0; ang = R.range(0.08, 0.2) * R.sign(); };
      fresh(0); wipe = n; g.trait('Strength', Math.abs(ang) < 0.14 ? 'Gentle' : 'Steep');
      return (t, dt) => {
        if (passes > 150 || g.input.taps().length) fresh(t);
        // a slightly different turn and pivot each pass, so the copy never settles into a fixed point
        const th = ang * (1 + 0.35 * Math.sin(passes * 0.37)); c = (n - 1) / 2 + Math.sin(passes * 0.21) * n * 0.1;
          if (g.input.inside) { cx = g.input.x * n; cy = g.input.y * n; } else { cx = c; cy = c; }   // the copy turns about the pointer
        rotate(a, b, th); rotate(b, a, -th); passes++;
        d.set(a);
        if (wipe < n) { const w = wipe | 0; d.set(old.subarray(w * n), w * n); X.rect(g, 0, w, n, 1, 0xffd8d8d8); wipe += n * dt * 2.2; }
      };
    },
  });
})();
