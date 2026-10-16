// Type and signal: glyphs, counters, notation and other things made to be read.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000, WHITE = 0xffffffff;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);
  const groundName = sh => (sh.paper ? (P.U.INKS.find(k => k.ground === sh.ground) || { name: 'Paper' }).name : 'Black');
  const scaleName = s => ({ '0,2,4,7,9': 'Major pentatonic', '0,3,5,7,10': 'Minor pentatonic', '0,2,3,7,8': 'Kumoi', '0,4,7,11,14': 'Major seventh', '0,2,4,5,7,9,11': 'Major', '0,2,3,5,7,8,10': 'Minor', '0,3,5,6,7,10': 'Blues' })[s.join()] || 'Mode';
  const NOTE = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];

  // A cell grid for the newer variations of plot prototypes: drawn into pixels, then laid crisp over the stage.
  function pixelStage(g, n) {
    const off = document.createElement('canvas'); off.width = off.height = n;
    const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
    const pg = { n, d, S: g.S, input: g.input, sound: g.sound, home: g.home, alt: g.alt, trait: g.trait };
    pg.flush = () => { octx.putImageData(img, 0, 0); g.ctx.imageSmoothingEnabled = false; g.ctx.drawImage(off, 0, 0, 1000, 1000); };
    return pg;
  }
  // Listen: the room's own spectrum on a piece's pitch rows (row r sounds at f0 · 2^(r / perOct) Hz), worked out
  // from the 256-sample wave the gallery hands over (taken at about 24 000 samples a second), Hann-windowed.
  function roomEar(n, perOct, f0) {
    const N = 256, rate = 24000, out = new Float32Array(n);
    let cs = null, sn = null;
    return wave => {
      if (!cs) {
        cs = new Float32Array(n * N); sn = new Float32Array(n * N);
        for (let r = 0; r < n; r++) {
          const f = f0 * Math.pow(2, r / perOct);
          if (f >= rate / 2) continue;
          for (let i = 0; i < N; i++) { const w = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)), a = 2 * Math.PI * f * i / rate; cs[r * N + i] = Math.cos(a) * w; sn[r * N + i] = Math.sin(a) * w; }
        }
      }
      let top = 1e-6;
      for (let r = 0; r < n; r++) {
        let re = 0, im = 0;
        for (let i = 0, j = r * N; i < N; i++, j++) { re += wave[i] * cs[j]; im += wave[i] * sn[j]; }
        out[r] = Math.sqrt(re * re + im * im) / 64;
        if (out[r] > top) top = out[r];
      }
      // a short window smears each tone over several rows: sharpen toward the peaks, brighter for louder sound
      const gain = Math.min(1.6, Math.sqrt(top) * 2.2);
      for (let r = 0; r < n; r++) { const q = out[r] / top; out[r] = q * q * q * gain; }
      return out;
    };
  }
  const WORDS = ['SYNAESTHESIA', 'PRISM', 'HUE', 'TEMPO', 'CHROMA', 'SPECTRUM', 'COLOUR', 'SOUND', 'LIGHT', 'ECHO', 'VOID', 'GRAIN', 'TIMBRE', 'PITCH'];
  const DIGITS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111', '111101111101101', '110101110101110', '111100100100111', '110101101101110', '111100111100111', '111100111100100'];
  const LETTERS = { S: '01111100001000001110000010000111110', Y: '10001100010101000100001000010000100', N: '10001110011010110011100011000110001', A: '01110100011000111111100011000110001', E: '11111100001000011110100001000011111', T: '11111001000010000100001000010000100', H: '10001100011000111111100011000110001', I: '11111001000010000100001000010011111' };

  P.add({
    interactive: 'Click a sign to make its neighbours its children.',
    name: 'Glyphs', fam: 'Signal', type: 'px', n: 96,
    recipe: 'An alphabet of invented signs, mirrored, turned four ways or free, three, five or seven cells tall. Each new sign is bred from the two beside it, so families of shapes spread across the page.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), size = R.pick([5, 5, 7]), G = size === 7 ? 12 : 16, bits = new Uint16Array(G * G), hue = new Uint8Array(G * G), half = (size + 1) >> 1, cellBits = half * size, pitch = n / G;
        for (let i = 0; i < G * G; i++) { bits[i] = R.int(0, (1 << Math.min(15, cellBits)) - 1); hue[i] = R.int(0, 255); }
        const breed = i => {
          const x = i % G, y = (i / G) | 0, a = y * G + (x + G - 1) % G, b = ((y + G - 1) % G) * G + x, mask = R.int(0, 32767);
          bits[i] = ((bits[a] & mask) | (bits[b] & ~mask)) ^ (R.bool(0.5) ? 1 << R.int(0, 14) : 0);
          hue[i] = ((R.bool() ? hue[a] : hue[b]) + R.int(-10, 10) + 256) & 255;
        };
        for (let k = 0; k < G * G * 6; k++) breed(R.int(0, G * G - 1));
        const off = Math.floor((pitch - size) / 2), drift = R.range(1, 3), rate = R.range(1.5, 4);
        let debt = 0;
        // a clicked sign breeds its eight neighbours, with dice from the second stream
        const breedFrom = (i, src) => { const mask = g.alt.int(0, 32767); bits[i] = (bits[src] & mask | bits[src] & ~mask) ^ (g.alt.bool(0.5) ? 1 << g.alt.int(0, 14) : 0); hue[i] = (hue[src] + g.alt.int(-10, 10) + 256) & 255; };
        g.trait('Palette', palName(sc)); g.trait('Symmetry', 'Mirror'); g.trait('Sign size', size); g.trait('Signs across', G); g.trait('Look', 'Families');
        return (t, dt) => {
          for (const p of g.input.taps()) {
            const gx = Math.min(G - 1, Math.floor(p.x * G)), gy = Math.min(G - 1, Math.floor(p.y * G)), src = gy * G + gx;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) breedFrom(((gy + dy + G) % G) * G + (gx + dx + G) % G, src);
          }
          for (debt += dt * rate; debt > 1; debt--) breed(R.int(0, G * G - 1));
          const hd = t * drift;
          d.fill(BLACK);
          for (let gy = 0; gy < G; gy++) for (let gx = 0; gx < G; gx++) {
            const i = gy * G + gx, b = bits[i], c = sc.lut[(hue[i] + hd) & 255];
            for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
              const mx = x < half ? x : size - 1 - x;
              if ((b >> ((y * half + mx) % 15)) & 1) d[(Math.floor(gy * pitch) + off + y) * n + Math.floor(gx * pitch) + off + x] = c;
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), size = R.pick([3, 5, 5, 7]), sym = R.pick(['mirror', 'mirror', 'rot', 'free']), scale = size === 3 ? R.pick([1, 2]) : R.pick([1, 1, 2]);
      const pitch0 = (size + (scale === 1 ? 1 : 0.5)) * scale + 1, G = Math.max(4, Math.floor(n / pitch0)), pitch = n / G;
      const half = (size + 1) >> 1, nb = sym === 'free' ? size * size : sym === 'rot' ? half * half : half * size, maxBits = Math.min(30, nb);
      const bits = new Uint32Array(G * G), hue = new Uint8Array(G * G);
      const look = R.pick(['family', 'family', 'ink', 'neon']), paper = look === 'ink' ? U.pk(U.mix(sc.cols[0], [255, 255, 255], 0.75)) : BLACK, inkC = look === 'ink' ? U.pk(U.mix(sc.cols[sc.cols.length - 1], [0, 0, 0], 0.5)) : 0;
      const rnd = () => (R.int(0, 32767) | (R.int(0, 32767) << 15)) >>> 0;
      for (let i = 0; i < G * G; i++) { bits[i] = rnd(); hue[i] = R.int(0, 255); }
      const breed = (i, a = -1, b = -1) => {
        const x = i % G, y = (i / G) | 0;
        if (a < 0) { a = y * G + (x + G - 1) % G; b = ((y + G - 1) % G) * G + x; }
        const mask = rnd();
        bits[i] = (((bits[a] & mask) | (bits[b] & ~mask)) ^ (R.bool(0.5) ? 1 << R.int(0, maxBits - 1) : 0)) >>> 0;
        hue[i] = ((R.bool() ? hue[a] : hue[b]) + R.int(-10, 10) + 256) & 255;
      };
      for (let k = 0; k < G * G * 6; k++) breed(R.int(0, G * G - 1));
      // which bit lights cell (x, y) of a sign, for each kind of symmetry
      const bitAt = (x, y) => {
        if (sym === 'free') return (y * size + x) % maxBits;
        if (sym === 'mirror') return (y * half + (x < half ? x : size - 1 - x)) % maxBits;
        let u = x, v = y;
        for (let r = 0; r < 4 && !(u < half && v < half); r++) { const tmp = u; u = size - 1 - v; v = tmp; }
        return (v * half + u) % maxBits;
      };
      const map = Array.from({ length: size * size }, (_, k) => bitAt(k % size, (k / size) | 0));
      const off = Math.floor((pitch - size * scale) / 2), drift = R.range(1, 3), rate = R.range(1.5, 4);
      let debt = 0;
      g.trait('Palette', palName(sc)); g.trait('Symmetry', { mirror: 'Mirror', rot: 'Turned', free: 'Free' }[sym]); g.trait('Sign size', size * scale); g.trait('Signs across', G); g.trait('Look', { family: 'Families', ink: 'Ink on paper', neon: 'Neon' }[look]);
      return (t, dt) => {
        for (const p of g.input.taps()) {
          const gx = Math.min(G - 1, Math.floor(p.x * G)), gy = Math.min(G - 1, Math.floor(p.y * G)), src = gy * G + gx;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) { const j = ((gy + dy + G) % G) * G + (gx + dx + G) % G; breed(j, src, src); }
        }
        for (debt += dt * rate; debt > 1; debt--) breed(R.int(0, G * G - 1));
        const hd = t * drift;
        d.fill(paper);
        for (let gy = 0; gy < G; gy++) for (let gx = 0; gx < G; gx++) {
          const i = gy * G + gx, b = bits[i], c = look === 'ink' ? inkC : look === 'neon' ? sc.lut[(hue[i] * 0 + gx * 9 + gy * 5 + hd * 4) & 255] : sc.lut[(hue[i] + hd) & 255];
          for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
            if (!((b >>> map[y * size + x]) & 1)) continue;
            const px = Math.floor(gx * pitch) + off + x * scale, py = Math.floor(gy * pitch) + off + y * scale;
            for (let a = 0; a < scale; a++) for (let q = 0; q < scale; q++) if (px + q < n && py + a < n) d[(py + a) * n + px + q] = c;
          }
        }
      };
    },
  });
  P.add({
    name: 'Self Portrait', seed: 1, fam: 'Signal', type: 'vec',
    recipe: 'The collection’s own hue formula, typeset as a page of code; each character is coloured by the formula’s value where it stands.',
    make(R, U, g) {
      const { ctx } = g, COLS = R.int(15, 21), ROWS = Math.round(COLS * 0.72), cw = 960 / COLS, ch = 960 / ROWS;
      const text = R.pick(['hue = h0 + log((t * x * a) % (y / yd) * b) * k; ', 'fill(i * x * 0.05 % y * 0.1, 65, 80); rect(x, y, 10, 10); ', 'hue=(t*x*a)%(y/yd); ']);
      const a = R.range(0.02, 0.07), yd = R.range(8, 14), b = R.range(3, 8), k = R.range(10, 22), h0 = R.range(0, 100), fs = R.int(2000, 30000), speed = R.range(1.2, 2.6), y0 = R.int(200, 400), neon = R.bool(0.25), hard = false;
      const cols = Array.from({ length: 50 }, (_, i) => U.css(U.hsb(i * 2, neon ? 100 : 85, neon ? 100 : 92)));
      return t => {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        ctx.font = `bold ${Math.floor(Math.min(cw * 1.5, ch * 0.92))}px ui-monospace, Menlo, Consolas, monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const tt = fs + t * speed, buckets = Array.from({ length: 51 }, () => []);
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
          const x = (c + 1) * 800 / COLS, y = y0 + (r + 1) * 800 / ROWS, v = ((tt * x * a) % (y / yd)) * b, hue = h0 + Math.log(v) * k;
          const voided = !(hue === hue) || (hard && (hue > 95 || hue < 1));
          buckets[voided ? 50 : Math.min(49, Math.floor(((hue % 100) + 100) % 100 / 2))].push(r * COLS + c);
        }
        for (let q = 0; q <= 50; q++) {
          if (!buckets[q].length) continue;
          ctx.fillStyle = q === 50 ? '#3a3a3a' : cols[q];
          for (const i of buckets[q]) { const ch1 = text[i % text.length]; if (ch1 !== ' ') ctx.fillText(ch1, 20 + (i % COLS + 0.5) * cw, 20 + (Math.floor(i / COLS) + 0.5) * ch); }
        }
      };
    },
  });

  P.add({
    interactive: 'Click a counter to spin it on.',
    name: 'Odometer', fam: 'Signal', type: 'px', n: 64,
    recipe: 'Rows of counters in different bases. Right-hand wheels spin, left-hand wheels wait for the carry; each digit has its own colour, or glows like a nixie tube, or sits on the ghost segments of an old LCD.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), ROWS = 9, WHEELS = 15;
        const rows = Array.from({ length: ROWS }, () => ({ base: R.pick([2, 3, 4, 8, 10, 10, 16, 16]), speed: R.range(0.8, 2.4), start: R.int(0, 1e6), dir: 1 }));
        const glyph = (dg, gx, gy, c, clipTop, clipBottom) => { const s = DIGITS[dg]; for (let y = 0; y < 5; y++) { const py = gy + y; if (py < clipTop || py >= clipBottom) continue; for (let x = 0; x < 3; x++) if (s[y * 3 + x] === '1') d[py * n + gx + x] = c; } };
        const drift = R.range(1, 3);
        g.trait('Palette', palName(sc)); g.trait('Style', 'Colour'); g.trait('Counters', ROWS); g.trait('Bases', new Set(rows.map(r => r.base)).size + ' kinds'); g.trait('Digits', 'Small');
        return t => {
          for (const p of g.input.taps()) { const r = Math.max(0, Math.min(ROWS - 1, Math.floor((p.y * n - 1) / 7))); rows[r].start += rows[r].base ** 3 * 2; }   // a click spins a counter on
          d.fill(BLACK);
          const hd = t * drift;
          for (let r = 0; r < ROWS; r++) {
            const row = rows[r], v = row.start + t * row.speed, top = 1 + r * 7;
            for (let k = 0; k < WHEELS; k++) {
              const unit = Math.pow(row.base, k), pos = v / unit, whole = Math.floor(pos), frac = pos - whole;
              const roll = k === 0 ? U.smooth(frac) : U.smooth(Math.max(0, frac * unit - (unit - 1)));
              const cur = whole % row.base, nxt = (cur + 1) % row.base, gx = n - 4 - k * 4, shift = Math.round(roll * 6);
              glyph(cur, gx, top - shift, sc.lut[(cur * 256 / row.base + r * 9 + hd) & 255], top, top + 5);
              if (shift) glyph(nxt, gx, top + 6 - shift, sc.lut[(nxt * 256 / row.base + r * 9 + hd) & 255], top, top + 5);
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, X = U.X, sc = U.scheme(R), scale = R.pick([1, 1, 2]), ROWS = Math.floor((n - 1) / (7 * scale)), WHEELS = Math.floor((n - 2) / (4 * scale));
      const style = R.pick(['colour', 'colour', 'nixie', 'lcd', 'mono']);
      const rows = Array.from({ length: ROWS }, () => ({ base: R.pick([2, 3, 4, 8, 10, 10, 16, 16]), speed: R.range(0.8, 2.4), start: R.int(0, 1e6), boost: 0 }));
      const nixie = [U.pk([255, 150, 50]), U.pk([90, 30, 10])], lcd = [U.pk([30, 40, 20]), U.pk([150, 170, 110]), U.pk([128, 146, 92])], mono = U.pk(sc.cols[0]);
      const ground = style === 'lcd' ? lcd[1] : BLACK;
      const glyph = (dg, gx, gy, c, clipTop, clipBottom) => { const s = DIGITS[dg]; for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) if (s[y * 3 + x] === '1') for (let a = 0; a < scale; a++) for (let b = 0; b < scale; b++) { const py = gy + y * scale + a; if (py >= clipTop && py < clipBottom) d[py * n + gx + x * scale + b] = c; } };
      const drift = R.range(1, 3);
      g.trait('Palette', style === 'colour' ? palName(sc) : style === 'mono' ? 'One colour' : 'Fixed'); g.trait('Style', { colour: 'Colour', nixie: 'Nixie', lcd: 'LCD', mono: 'Mono' }[style]); g.trait('Counters', ROWS); g.trait('Bases', new Set(rows.map(r => r.base)).size + ' kinds'); g.trait('Digits', scale === 2 ? 'Large' : 'Small');
      return (t, dt) => {
        for (const p of g.input.taps()) { const r = Math.min(ROWS - 1, Math.floor((p.y * n - 1) / (7 * scale))); rows[r].boost += R.range(30, 400); }
        d.fill(ground);
        const hd = t * drift;
        for (let r = 0; r < ROWS; r++) {
          const row = rows[r];
          row.start += row.boost * Math.min(0.1, dt) * 3; row.boost *= 0.9;
          const v = row.start + t * row.speed, top = 1 + r * 7 * scale, bottom = top + 5 * scale;
          for (let k = 0; k < WHEELS; k++) {
            const unit = Math.pow(row.base, k), pos = v / unit, whole = Math.floor(pos), frac = pos - whole;
            const roll = k === 0 ? U.smooth(frac) : U.smooth(Math.max(0, frac * unit - (unit - 1)));
            const cur = whole % row.base, nxt = (cur + 1) % row.base, gx = n - 4 * scale - k * 4 * scale, shift = Math.round(roll * 6 * scale);
            if (gx < 0) break;
            const col = dg => style === 'nixie' ? nixie[0] : style === 'lcd' ? lcd[0] : style === 'mono' ? mono : sc.lut[(dg * 256 / row.base + r * 9 + hd) & 255];
            if (style === 'nixie') glyph(8, gx, top, nixie[1], top, bottom);
            if (style === 'lcd') glyph(8, gx, top, lcd[2], top, bottom);
            glyph(cur, gx, top - shift, col(cur), top, bottom);
            if (shift) glyph(nxt, gx, top + 6 * scale - shift, col(nxt), top, bottom);
          }
        }
      };
    },
  });
  P.add({
    interactive: 'Click to start a new page.',
    name: 'Asemic', seed: 2, fam: 'Signal', type: 'vec',
    recipe: 'A letter in a script that does not exist: an invented alphabet of joined strokes, written out line by line and then begun again. Some rolls write it in pixels instead: joined, printed, runes or dots.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.8);
        let pts, shown, state, hold, weight;
        const compose = () => {
          const xh = R.range(16, 26), alphabet = Array.from({ length: R.int(9, 15) }, () => {
            const w = R.range(0.6, 1.5), mids = R.int(1, 3), out = [];
            for (let i = 0; i < mids; i++) out.push([w * (i + R.range(0.2, 0.9)) / mids, R.bool(0.22) ? R.range(-2.3, -1.3) : R.bool(0.15) ? R.range(0.5, 1.3) : R.range(-1, 0.1)]);
            out.push([w, 0]);
            return { w, out };
          });
          const lines = R.int(8, 12), lead = 840 / lines, slant = R.range(-0.45, 0.05);
          pts = []; weight = R.range(1.6, 2.6);
          for (let l = 0; l < lines; l++) {
            let x = 90 + (R.bool(0.25) ? 60 : 0);
            const y = 130 + l * lead, end = l === lines - 1 ? R.range(300, 700) : R.range(820, 910);
            while (x < end) {
              const ctrl = [[x, y]];
              for (let k = R.int(1, 7); k > 0; k--) { const a = R.pick(alphabet); for (const [px, py] of a.out) ctrl.push([x + px * xh + py * xh * slant, y + py * xh]); x += a.w * xh; }
              if (x > 930) break;
              pts.push(null);
              for (let i = 0; i < ctrl.length - 1; i++) {
                const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
                for (let s = 0; s < 6; s++) {
                  const u = s / 6, u2 = u * u, u3 = u2 * u;
                  pts.push([0.5 * (2 * p1[0] + (p2[0] - p0[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (3 * p1[0] - p0[0] - 3 * p2[0] + p3[0]) * u3), 0.5 * (2 * p1[1] + (p2[1] - p0[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (3 * p1[1] - p0[1] - 3 * p2[1] + p3[1]) * u3)]);
                }
              }
              pts.push(ctrl[ctrl.length - 1]);
              x += xh * R.range(0.9, 1.6);
            }
          }
          sh.paint(); shown = 0; state = 'write'; hold = 0;
        };
        const write = upto => {
          ctx.strokeStyle = U.css(sh.ink, 0.92); ctx.lineWidth = g.lw(weight);
          ctx.beginPath();
          for (let i = Math.max(1, shown); i < upto; i++) if (pts[i] && pts[i - 1]) { ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); }
          ctx.stroke();
          shown = upto;
        };
        compose.first = 1;
        compose();
        write(Math.floor(pts.length * 0.22));   // the first page opens with its first lines already written
        g.trait('Ground', groundName(sh)); g.trait('Palette', sh.paper ? 'Ink' : 'White ink'); g.trait('Script', 'Joined'); g.trait('Hand', weight > 2.1 ? 'Heavy' : 'Light');
        return (t, dt) => {
          if (g.input.taps().length && state !== 'fade') { state = 'fade'; hold = 0; }   // a click turns the page
          if (state === 'write') {
            write(Math.min(pts.length, shown + Math.max(6, Math.round(dt * 520))));
            if (shown >= pts.length) state = 'hold';
          } else if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
          else { sh.paint(0.16); if ((hold += dt) > 1.3) compose(); }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100, 100]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.5), img = new Uint32Array(n * n), order = [];
        let shown, state, hold, ground, ink;
        const compose = () => {
          const style = R.pick(['joined', 'joined', 'print', 'runes', 'dots']), xh = R.int(3, 6), slant = R.range(-0.35, 0.05);
          const onPaper = R.bool(0.55);
          ground = onPaper ? U.pk(R.pick([[236, 226, 200], [214, 226, 236], [240, 236, 228], [220, 205, 170]])) : BLACK;
          ink = onPaper ? U.pk(R.pick([[30, 30, 60], [90, 30, 30], [20, 40, 80], [40, 40, 40]])) : U.pk(sc.cols[R.int(0, sc.cols.length - 1)]);
          if (!compose.first) compose.first = { style, onPaper, xh };
          img.fill(ground); order.length = 0;
          const alphabet = Array.from({ length: R.int(9, 15) }, () => {
            const w = R.range(0.6, 1.5), mids = R.int(1, 3), out = [];
            for (let i = 0; i < mids; i++) out.push([w * (i + R.range(0.2, 0.9)) / mids, R.bool(0.22) ? R.range(-2.2, -1.3) : R.bool(0.15) ? R.range(0.5, 1.3) : R.range(-1, 0.1)]);
            out.push([w, 0]);
            return { w, out };
          });
          const lead = Math.round(xh * R.range(2.6, 3.4)), lines = Math.floor((n - 2 * xh) / lead);
          const mark = (x0, y0, x1, y1) => X.line({ n, d: img }, x0, y0, x1, y1, (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) order.push(y * n + x); });
          for (let l = 0; l < lines; l++) {
            let x = Math.round(n * 0.06) + (R.bool(0.25) ? xh * 2 : 0);
            const y = Math.round(xh * 2.2 + l * lead), end = l === lines - 1 ? n * R.range(0.35, 0.7) : n * R.range(0.86, 0.94);
            while (x < end) {
              let px = x, py = y, first = true;
              for (let k = R.int(1, 6); k > 0; k--) {
                const a = R.pick(alphabet);
                for (const [ax, ay] of a.out) {
                  let qx = x + ax * xh + ay * xh * slant, qy = y + ay * xh;
                  if (style === 'runes') { qx = Math.round(qx / 2) * 2; qy = Math.round(qy / 2) * 2; }
                  if (style === 'dots') order.push(Math.min(n - 1, Math.max(0, Math.round(qy))) * n + Math.min(n - 1, Math.max(0, Math.round(qx))));
                  else if (!first || style === 'joined') mark(px, py, qx, qy);
                  px = qx; py = qy; first = false;
                }
                x += a.w * xh + (style === 'print' ? xh * 0.5 : 0);
                if (style === 'print') first = true;
              }
              x += xh * R.range(1.2, 2);
            }
          }
          shown = 0; state = 'write'; hold = 0;
        };
        compose();
        for (shown = 0; shown < order.length * 0.22; shown++) img[order[shown]] = ink;   // the first page opens with its first lines already written
        let fresh = -9;
        g.trait('Ground', compose.first.onPaper ? 'Paper' : 'Black'); g.trait('Palette', compose.first.onPaper ? 'Ink' : palName(sc)); g.trait('Script', { joined: 'Joined', print: 'Print', runes: 'Runes', dots: 'Dots' }[compose.first.style]); g.trait('Hand', compose.first.xh > 4 ? 'Large' : 'Small'); g.trait('Grid', n);
        return (t, dt) => {
          if (g.input.taps().length && t - fresh > 1) { compose(); fresh = t; }   // (one new page at a time, however many taps arrive)
          if (state === 'write') { const upto = Math.min(order.length, shown + Math.max(4, Math.round(dt * order.length / 9))); for (let i = shown; i < upto; i++) img[order[i]] = ink; shown = upto; if (shown >= order.length) state = 'hold'; }
          else if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
          else if ((hold += dt) > 1.3) compose();
          d.set(img);
          if (state === 'write' && shown < order.length) d[order[shown]] = WHITE;
          if (state === 'fade') U.fadePx(d, 1 - hold / 1.3);
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Score', seed: 2, fam: 'Signal', type: 'vec',
    recipe: 'An endless piece of music scrolling past a playhead, every note printed in the colour its pitch has on Scriabin’s colour keyboard.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.45);
      const TONE = ['#ff2a2a', '#9a3ce0', '#ffe83a', '#7d7ab8', '#bfeeff', '#c2184b', '#7f8bfd', '#ff8a1c', '#bb75fc', '#3ad24a', '#d07f9a', '#7fbfff'].map(U.hex), MAJOR = [0, 2, 4, 5, 7, 9, 11];
      const staves = R.int(3, 4), gap = 880 / staves, key = R.int(0, 11), tempo = R.range(1.1, 1.9), beatW = R.range(58, 84), HEAD = 250, minor = R.bool(0.4);
      const voices = Array.from({ length: staves }, (_, s) => ({ pos: R.int(1, 7), made: 0, notes: [], density: R.range(0.6, 0.95), leap: s === staves - 1 ? 3 : 2, half: R.bool(0.3) }));
      const fill = (v, upto) => {
        while (v.made < upto) {
          const step = v.half && R.bool(0.4) ? 2 : 1;
          if (R.bool(v.density)) { v.pos = Math.max(-2, Math.min(10, v.pos + R.int(-v.leap, v.leap))); v.notes.push({ beat: v.made, pos: v.pos, len: step, chord: R.bool(0.18) }); }
          v.made += step;
        }
      };
      const pitch = p => { const oct = Math.floor(p / 7), deg = ((p % 7) + 7) % 7; return (key + MAJOR[deg] - (minor && (deg === 2 || deg === 5 || deg === 6) ? 1 : 0) + 12 * oct + 120) % 12; };
      return t => {
        const now = t * tempo;
        sh.paint();
        for (let s = 0; s < staves; s++) {
          const v = voices[s], base = 60 + gap * s + gap * 0.62;
          fill(v, now + 16); v.notes = v.notes.filter(q => q.beat > now - 6);
          ctx.strokeStyle = U.css(sh.ink, sh.paper ? 0.75 : 0.4); ctx.lineWidth = g.lw(1.2);
          ctx.beginPath();
          for (let l = 0; l < 5; l++) { ctx.moveTo(30, base - l * 16); ctx.lineTo(970, base - l * 16); }
          for (let bar = Math.ceil((now - 4) / 4) * 4; bar < now + 14; bar += 4) { const x = HEAD + (bar - now) * beatW - beatW / 2; if (x > 30 && x < 970) { ctx.moveTo(x, base); ctx.lineTo(x, base - 64); } }
          ctx.stroke();
          for (const q of v.notes) for (const p of q.chord ? [q.pos, q.pos + 2] : [q.pos]) {
            const x = HEAD + (q.beat - now) * beatW, y = base - p * 8, col = TONE[pitch(p)], past = q.beat < now, ring = U.clamp(1 - (now - q.beat) / 1.2);
            if (x < 20 || x > 985) continue;
            ctx.fillStyle = U.css(col, past ? 0.45 : 1); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = g.lw(2);
            ctx.beginPath(); ctx.ellipse(x, y, 11, 8, -0.35, 0, U.TAU);
            if (q.len === 2) { ctx.lineWidth = g.lw(2.6); ctx.stroke(); } else ctx.fill();
            ctx.lineWidth = g.lw(2); ctx.beginPath();
            if (p < 4) { ctx.moveTo(x + 10, y - 2); ctx.lineTo(x + 10, y - 56); } else { ctx.moveTo(x - 10, y + 2); ctx.lineTo(x - 10, y + 56); }
            for (let lp = -2; lp >= p; lp -= 2) { ctx.moveTo(x - 17, base - lp * 8); ctx.lineTo(x + 17, base - lp * 8); }
            for (let lp = 10; lp <= p; lp += 2) { ctx.moveTo(x - 17, base - lp * 8); ctx.lineTo(x + 17, base - lp * 8); }
            ctx.stroke();
            if (past && ring > 0) { ctx.strokeStyle = U.css(col, ring * 0.8); ctx.lineWidth = g.lw(2.4); ctx.beginPath(); ctx.arc(x, y, 12 + (1 - ring) * 34, 0, U.TAU); ctx.stroke(); }
          }
        }
        ctx.strokeStyle = U.css(sh.ink, 0.5); ctx.lineWidth = g.lw(1.5);
        ctx.beginPath(); ctx.moveTo(HEAD, 30); ctx.lineTo(HEAD, 970); ctx.stroke();
      };
    },
  });

  P.add({
    interactive: 'Click to play a note: the higher you click, the higher it sounds.',
    listens: 'Speak, sing, whistle or play: your room’s sound scrolls across with the music, every overtone on its own line.',
    name: 'Spectrogram', fam: 'Signal', type: 'px', n: 128, music: true,
    recipe: 'The picture a sound makes, and the sound itself: time runs across, pitch runs up. A bass, a melody and a slow third voice play in one scale, each note a stack of overtones that fades, with drums as noise on the beat. Unmute to hear it.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, E = new Float32Array(N), PER_OCT = R.int(16, 22);
        const scale = R.pick([[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 3, 7, 8], [0, 4, 7, 11, 14]]), beat = R.int(6, 10);
        const voices = Array.from({ length: 3 }, (_, i) => ({ f: 0, target: 0, env: 0, left: 0, lo: 1 + i * 1.1, odd: R.bool(0.4), vib: R.range(0, 0.25), glide: R.range(0.08, 0.35), overtones: R.int(5, 11) }));
        const col = new Float32Array(n), ear = roomEar(n, PER_OCT, 32.7);   // row 0 is the C two octaves below the bass clef
        let frame = 0;
        let live = false, user = null;   // sound only once the piece is on screen; a clicked note
        const tick = () => {
          col.fill(0);
          for (const v of voices) {
            if (v.left-- <= 0) {
              v.left = beat * R.pick([1, 1, 2, 2, 3, 4]); v.target = v.lo + (R.pick(scale) + 12 * R.int(0, 1)) / 12; if (!v.f) v.f = v.target; v.env = R.bool(0.8) ? 1 : 0;
              // the note it draws, heard: its pitch is the row it settles on
              if (live && v.env) g.sound.note(24 + Math.round(v.target * 12), { dur: v.left / 12 * 0.9, vel: 0.3, wave: v.odd ? 'square' : v.overtones > 8 ? 'sawtooth' : 'triangle', cutoff: 2200 });
            }
            v.f += (v.target - v.f) * v.glide; v.env *= 0.985;
            const f = v.f + v.vib * 0.04 * Math.sin(frame * 0.7);
            for (let h = 1; h <= v.overtones; h++) {
              if (v.odd && h % 2 === 0) continue;
              const row = (f + Math.log2(h)) * PER_OCT, r0 = Math.floor(row), fr = row - r0, a = v.env / Math.pow(h, 0.7);
              if (r0 >= 0 && r0 < n - 1) { col[r0] += a * (1 - fr); col[r0 + 1] += a * fr; }
            }
          }
          if (user) { for (let h = 1; h <= 8; h++) { const row = (user.f + Math.log2(h)) * PER_OCT, r0 = Math.floor(row), fr = row - r0, a = user.env / Math.pow(h, 0.7); if (r0 >= 0 && r0 < n - 1) { col[r0] += a * (1 - fr); col[r0 + 1] += a * fr; } } user.env *= 0.9; if (user.env < 0.02) user = null; }
          if (live && frame % beat === 0) g.sound.hit((frame / beat) % 2 === 1 ? 'hat' : 'kick', (frame / beat) % 2 === 1 ? 0.3 : 0.6);
          if (frame % beat === 0) { const hat = (frame / beat) % 2 === 1; for (let r = 0; r < n; r++) col[r] += hat ? (r > n * 0.6 ? R() * 0.5 : 0) : (r < n * 0.25 ? R() * 0.8 : R() * 0.12); }
          if (g.input.listening) { const room = ear(g.input.wave); for (let r = 0; r < n; r++) col[r] = col[r] * 0.35 + room[r]; }   // the room, over the piece's own music
          E.copyWithin(0, 1);
          for (let r = 0; r < n; r++) E[(n - 1 - r) * n + n - 1] = col[r];
          frame++;
        };
        for (let k = 0; k < n; k++) tick();
        g.trait('Palette', palName(sc)); g.trait('Scale', scaleName(scale)); g.trait('Tempo', beat <= 7 ? 'Brisk' : 'Easy'); g.trait('Drums', 'Kick and hat');
        return () => {
          live = true;
          for (const p of g.input.taps()) { const f = (1 - p.y) * n / PER_OCT; user = { f, env: 1.2 }; g.sound.note(24 + Math.round(f * 12), { dur: 0.6, vel: 0.5, wave: 'triangle' }); }
          tick();
          for (let i = 0; i < N; i++) { const v = E[i]; d[i] = v < 0.035 ? BLACK : heat[Math.min(255, 36 + v * 250) | 0]; }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, E = new Float32Array(N), PER_OCT = R.int(14, 20), low = R.int(28, 36), root = R.int(0, 11);
      const scale = R.pick([[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 3, 7, 8], [0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 8, 10], [0, 3, 5, 6, 7, 10]]), beat = R.int(5, 8), drums = R.pick([0, 1, 1, 2]);
      const pitchOf = deg => low + root + scale[((deg % scale.length) + scale.length) % scale.length] + 12 * Math.floor(deg / scale.length);
      const wave = R.pick(['square', 'sawtooth', 'triangle']);
      const voices = [
        { role: 'bass', deg: 0, oct: 0, beats: [2, 2, 4], left: 0, env: 0, midi: 0, decay: 0.93, overtones: 5, odd: false, wave: 'triangle', vel: 0.55 },
        { role: 'lead', deg: R.int(0, 4), oct: 2, beats: [1, 1, 1, 2, 2], left: 1, env: 0, midi: 0, decay: 0.88, overtones: wave === 'triangle' ? 5 : 9, odd: wave === 'square', wave, vel: 0.35 },
        { role: 'pad', deg: 2, oct: 1, beats: [4, 8], left: 2, env: 0, midi: 0, decay: 0.975, overtones: 3, odd: false, wave: 'sine', vel: 0.3 },
      ];
      const col = new Float32Array(n), rowOf = midi => (midi - low) / 12 * PER_OCT, ear = roomEar(n, PER_OCT, 440 * Math.pow(2, (low - 69) / 12));
      let frame = 0, user = null;
      const play = (v, now) => {
        if (v.role === 'bass') v.deg = R.pick([0, 0, 4, 3, 5]) % scale.length;
        else if (v.role === 'lead') v.deg = Math.max(-2, Math.min(scale.length * 2, v.deg + R.pick([-2, -1, -1, 1, 1, 2, 0, 3])));
        else v.deg = R.pick([0, 2, 4]);
        v.midi = pitchOf(v.deg + v.oct * scale.length);
        const len = R.pick(v.beats);
        v.left = beat * len; v.env = 1;
        if (now) g.sound.note(v.midi, { dur: len * beat / 12 * 0.9, vel: v.vel, wave: v.wave, pan: v.role === 'lead' ? 0.3 : v.role === 'pad' ? -0.3 : 0, cutoff: v.wave === 'sawtooth' ? 2400 : 0 });
      };
      const add = (midi, env, overtones, odd) => {
        for (let h = 1; h <= overtones; h++) {
          if (odd && h % 2 === 0) continue;
          const row = rowOf(midi) + Math.log2(h) * PER_OCT, r0 = Math.floor(row), fr = row - r0, a = env / Math.pow(h, 0.7);
          if (r0 >= 0 && r0 < n - 1) { col[r0] += a * (1 - fr); col[r0 + 1] += a * fr; }
        }
      };
      const tick = now => {
        col.fill(0);
        for (const v of voices) { if (v.left-- <= 0) play(v, now); v.env *= v.decay; add(v.midi, v.env, v.overtones, v.odd); }
        if (user) { add(user.midi, user.env, 8, false); user.env *= 0.9; if (user.env < 0.02) user = null; }
        if (drums && frame % beat === 0) {
          const k = (frame / beat) % 4, hat = k % 2 === 1, kick = k === 0 || (drums === 2 && k === 2);
          if (kick) { for (let r = 0; r < n * 0.22; r++) col[r] += R() * 0.9; if (now) g.sound.hit('kick', 0.7); }
          else if (hat) { for (let r = Math.floor(n * 0.62); r < n; r++) col[r] += R() * 0.45; if (now) g.sound.hit('hat', 0.35); }
          else if (drums === 2) { for (let r = 0; r < n; r++) col[r] += R() * 0.2; if (now) g.sound.hit('snare', 0.4); }
        }
        if (g.input.listening) { const room = ear(g.input.wave); for (let r = 0; r < n; r++) col[r] = col[r] * 0.35 + room[r]; }   // the room, over the piece's own music
        E.copyWithin(0, 1);
        for (let r = 0; r < n; r++) E[(n - 1 - r) * n + n - 1] = col[r];
        frame++;
      };
      for (let k = 0; k < n; k++) tick(false);
      g.trait('Palette', palName(sc)); g.trait('Scale', NOTE[root] + ' ' + scaleName(scale)); g.trait('Lead', { square: 'Square', sawtooth: 'Saw', triangle: 'Triangle' }[wave]); g.trait('Drums', ['None', 'Kick and hat', 'Full kit'][drums]);
      return () => {
        for (const p of g.input.taps()) { const midi = Math.round(low + (1 - p.y) * (n / PER_OCT) * 12); user = { midi, env: 1.2 }; g.sound.note(midi, { dur: 0.6, vel: 0.5, wave: 'triangle' }); }
        tick(true);
        for (let i = 0; i < N; i++) { const v = E[i]; d[i] = v < 0.035 ? BLACK : heat[Math.min(255, 36 + v * 250) | 0]; }
      };
    },
  });
  P.add({
    name: 'Ticker Tape', seed: 1, fam: 'Signal', type: 'vec',
    recipe: 'Punched paper tape, eight holes to the row, spelling out the names of the collections in plain ASCII as it feeds through.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.3), tapes = R.int(3, 6), across = R.bool(0.35), W = 880 / tapes, tw = W * R.range(0.72, 0.9), pitch = tw / 9.6;
      const text = 'SYNAESTHESIA  FILAMENTS  AXONS  BLU3PRINTS  ';
      const reels = Array.from({ length: tapes }, (_, i) => ({ speed: R.range(18, 60) * R.sign(), off: R.int(0, 40), col: sc.native && R.bool(0.5) ? [240, 232, 210] : sc.cols[i % sc.cols.length] }));
      return t => {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        ctx.save();
        if (across) { ctx.translate(500, 500); ctx.rotate(Math.PI / 2); ctx.translate(-500, -500); }
        for (let k = 0; k < tapes; k++) {
          const r = reels[k], x0 = 60 + k * W + (W - tw) / 2, scroll = t * r.speed, first = Math.floor(scroll / pitch) - 1;
          ctx.fillStyle = U.css(r.col); ctx.fillRect(x0, -10, tw, 1020);
          ctx.fillStyle = '#000'; ctx.beginPath();
          for (let row = first; row < first + 1000 / pitch + 3; row++) {
            const y = (row - scroll / pitch) * pitch, code = text.charCodeAt((((row + r.off) % text.length) + text.length) % text.length);
            ctx.moveTo(x0 + pitch * 4.3 + pitch * 0.17, y); ctx.arc(x0 + pitch * 4.3, y, pitch * 0.17, 0, U.TAU);
            for (let b = 0; b < 8; b++) if ((code >> b) & 1) { const x = x0 + pitch * (0.8 + b + (b > 2 ? 1 : 0)); ctx.moveTo(x + pitch * 0.34, y); ctx.arc(x, y, pitch * 0.34, 0, U.TAU); }
          }
          ctx.fill();
        }
        ctx.restore();
      };
    },
  });

  P.add({
    interactive: 'Click to change the word.',
    name: 'Grapheme', fam: 'Signal', type: 'px', n: 96,
    recipe: 'For some people every letter has a colour. One of the collection’s words, set in rows (or columns) that slide at different speeds, each letter always its own hue, in small type or large.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R, 0.6), keys = Object.keys(LETTERS), ROWS = 10;
        let word = 'SYNAESTHESIA ', period = word.length * 6, pickWord = 0;   // a click spells the next of the collection's words
        const ink = {}; keys.forEach((k, i) => { ink[k] = U.pk(U.ramp(sc.cols, i / keys.length, true)); });
        const base = R.range(1.4, 3), law = R.pick(['linear', 'alternate', 'wave', 'primes']), step = R.int(1, 5);
        const speed = r => law === 'linear' ? base * (r + 1) * 0.5 : law === 'alternate' ? base * (r % 2 ? -1 : 1) * (1 + (r >> 1)) * 0.6 : law === 'wave' ? base * 3 * Math.sin(r * 0.7) : base * [2, 3, 5, 7, 11, 13, 17, 19, 23, 29][r] * 0.15;
        g.trait('Palette', palName(sc)); g.trait('Word', 'SYNAESTHESIA'); g.trait('Type', 'Small'); g.trait('Direction', 'Rows'); g.trait('Motion', { linear: 'Ramp', alternate: 'Alternating', wave: 'Wave', primes: 'Primes' }[law]);
        return t => {
          if (g.input.taps().length) { word = WORDS[++pickWord % WORDS.length] + ' '; period = word.length * 6; }
          d.fill(BLACK);
          for (let r = 0; r < ROWS; r++) {
            const shift = Math.floor(t * speed(r)) + r * step * 6, top = 3 + r * 9;
            for (let x = 0; x < n; x++) {
              const u = ((x + shift) % period + period) % period, ch = word[Math.floor(u / 6)], cx = u % 6;
              if (ch === ' ' || cx === 5) continue;
              const s = LETTERS[ch], c = ink[ch] || U.pk(U.ramp(sc.cols, (ch.charCodeAt(0) - 65) / 26, true)), f = s ? null : U.X.FONT[ch];
              for (let y = 0; y < 7; y++) if (s ? s[y * 5 + cx] === '1' : f && (f[y] >> (4 - cx)) & 1) d[(top + y) * n + x] = c;
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, X = U.X, sc = U.scheme(R, 0.6), scale = R.pick([1, 1, 2]), vertical = R.bool(0.25);
      let word = R.pick(WORDS) + ' ', period = word.length * 6 * scale;
      const ink = {}, letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', order = R.shuffle(letters.split(''));
      order.forEach((k, i) => { ink[k] = U.pk(U.ramp(sc.cols, i / 26 * R.pick([1, 2, 3]), true)); });
      const ROWS = Math.floor((n - 3) / (9 * scale)), base = R.range(1.4, 3) * scale, law = R.pick(['linear', 'alternate', 'wave', 'primes']), step = R.int(1, 5);
      const ground = R.bool(0.7) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.88));
      const speed = r => law === 'linear' ? base * (r + 1) * 0.5 : law === 'alternate' ? base * (r % 2 ? -1 : 1) * (1 + (r >> 1)) * 0.6 : law === 'wave' ? base * 3 * Math.sin(r * 0.7) : base * [2, 3, 5, 7, 11, 13, 17, 19, 23, 29][r % 10] * 0.15;
      g.trait('Palette', palName(sc)); g.trait('Word', word.trim()); g.trait('Type', scale === 2 ? 'Large' : 'Small'); g.trait('Direction', vertical ? 'Columns' : 'Rows'); g.trait('Motion', { linear: 'Ramp', alternate: 'Alternating', wave: 'Wave', primes: 'Primes' }[law]);
      return t => {
        if (g.input.taps().length) { word = R.pick(WORDS) + ' '; period = word.length * 6 * scale; }
        d.fill(ground);
        for (let r = 0; r < ROWS; r++) {
          const shift = Math.floor(t * speed(r)) + r * step * 6 * scale, top = 3 + r * 9 * scale;
          for (let x = 0; x < n; x++) {
            const u = ((x + shift) % period + period) % period, ch = word[Math.floor(u / (6 * scale))], cx = Math.floor((u % (6 * scale)) / scale);
            if (ch === ' ' || cx === 5) continue;
            const rowsBits = X.FONT[ch], c = ink[ch] || WHITE;
            for (let y = 0; y < 7; y++) if ((rowsBits[y] >> (4 - cx)) & 1) for (let a = 0; a < scale; a++) { const yy = top + y * scale + a; if (yy < n) d[vertical ? x * n + yy : yy * n + x] = c; }
          }
        }
      };
    },
  });
  P.add({
    name: 'Clockwork', seed: 3, fam: 'Signal', type: 'vec',
    recipe: 'A wall of two-handed clocks, all turning at the same rate but set to different times, so the hands line up into passing figures.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.6), N = R.int(9, 14), C = 940 / N, law = R.pick(['diagonal', 'radial', 'rows', 'product', 'spiral']), k1 = R.pick([1, 2, 3]), k2 = R.pick([1, 2, 3, 4]), w1 = R.range(0.25, 0.5), w2 = w1 * R.pick([-1, -1, 2, -2, 0.5]), dials = R.bool(0.5);
      const phase = (i, j, k) => {
        const u = i - (N - 1) / 2, v = j - (N - 1) / 2;
        return law === 'diagonal' ? (i + j) * k * Math.PI / N : law === 'radial' ? Math.hypot(u, v) * k * 0.7 : law === 'rows' ? j * k * Math.PI / N : law === 'product' ? ((i * j) % N) * k * U.TAU / N : Math.atan2(v, u) * k + Math.hypot(u, v) * 0.5;
      };
      return Object.assign(t => {
        sh.paint();
        const r = C * 0.46;
        if (dials) { ctx.strokeStyle = U.css(sh.ink, 0.22); ctx.lineWidth = g.lw(1); ctx.beginPath(); for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const x = 30 + (i + 0.5) * C, y = 30 + (j + 0.5) * C; ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, U.TAU); } ctx.stroke(); }
        ctx.strokeStyle = U.css(sh.paper ? sh.ink : sh.cols[0]); ctx.lineWidth = g.lw(C * 0.085);
        ctx.beginPath();
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
          const x = 30 + (i + 0.5) * C, y = 30 + (j + 0.5) * C, a = t * w1 + phase(i, j, k1), b = t * w2 - phase(i, j, k2);
          ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a)); ctx.lineTo(x, y); ctx.lineTo(x + r * Math.cos(b), y + r * Math.sin(b));
        }
        ctx.stroke();
      }, { period: U.TAU / Math.abs(w1) * (Math.abs(w2 / w1) < 1 ? 2 : 1) });
    },
  });
})();
