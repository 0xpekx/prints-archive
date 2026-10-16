// Drafting: plotter-style line work on paper or black, after BLU3PRINTS.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000, WHITE = 0xffffffff;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);
  const groundName = sh => (sh.paper ? (P.U.INKS.find(k => k.ground === sh.ground) || { name: 'Paper' }).name : 'Black');
  const sheetPal = sh => (sh.paper ? 'Ink' : palName(sh.scheme));

  // A cell grid for the newer variations of plot prototypes: drawn into pixels, then laid crisp over the stage.
  function pixelStage(g, n) {
    const off = document.createElement('canvas'); off.width = off.height = n;
    const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
    const pg = { n, d, S: g.S, input: g.input, sound: g.sound, home: g.home, alt: g.alt, trait: g.trait };
    pg.flush = () => { octx.putImageData(img, 0, 0); g.ctx.imageSmoothingEnabled = false; g.ctx.drawImage(off, 0, 0, 1000, 1000); };
    return pg;
  }

  // Listen (Ridgeline): a height for every point of every range. The front range takes the room's sound now (bass in
  // the middle, treble to the sides, the wave itself as grit) and each frame every range hands its sound to the one
  // behind, so what the room heard rolls away into the distance. Returns how many frames are still to roll (0 = all quiet).
  function listenRidges(inp, hs, rows, w, was) {
    hs.copyWithin(0, w);
    const base = (rows - 1) * w;
    for (let k = 0; k < w; k++) {
      let v = 0;
      if (inp.listening) {
        const u = k / (w - 1), b = Math.abs(u - 0.5) * 14, b0 = Math.min(7, Math.floor(b)), f = b - b0;
        v = (inp.bands[b0] * (1 - f) + inp.bands[Math.min(7, b0 + 1)] * f) * 1.1 + Math.abs(inp.wave[Math.floor(u * 255)]) * 0.8;
      }
      hs[base + k] = v;
    }
    return inp.listening ? rows + 1 : Math.max(0, was - 1);
  }

  P.add({
    name: 'Isoline', seed: 4, fam: 'Drafting', type: 'vec',
    recipe: 'A survey of ground that never holds still: contour lines of a drifting height field, every fifth one drawn heavier.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.65), noise = U.noise(R), G = 50, C = 1000 / G, f = new Float32Array((G + 1) * (G + 1));
      const zoom = R.range(0.035, 0.07), speed = R.range(0.03, 0.06), levels = R.int(11, 16), ridge = R.bool(0.3);
      return t => {
        sh.paint();
        for (let y = 0, i = 0; y <= G; y++) for (let x = 0; x <= G; x++, i++) { const v = noise.fbm(x * zoom, y * zoom, t * speed, 2); f[i] = ridge ? 1 - Math.abs(v) * 2.4 : v; }
        for (let l = 0; l < levels; l++) {
          const lv = ridge ? 0.05 + l / levels * 0.95 : -0.62 + l / (levels - 1) * 1.24, heavy = l % 5 === 0;
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, l / levels, true), heavy ? 1 : 0.8);
          ctx.lineWidth = g.lw(heavy ? 2.6 : 1.2);
          ctx.beginPath();
          for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
            const i = y * (G + 1) + x, a = f[i], b = f[i + 1], c = f[i + G + 2], dd = f[i + G + 1], pts = [];
            if ((a > lv) !== (b > lv)) pts.push(x + (lv - a) / (b - a), y);
            if ((b > lv) !== (c > lv)) pts.push(x + 1, y + (lv - b) / (c - b));
            if ((dd > lv) !== (c > lv)) pts.push(x + (lv - dd) / (c - dd), y + 1);
            if ((a > lv) !== (dd > lv)) pts.push(x, y + (lv - a) / (dd - a));
            if (pts.length === 4) { ctx.moveTo(pts[0] * C, pts[1] * C); ctx.lineTo(pts[2] * C, pts[3] * C); }
            else if (pts.length === 8) {
              const flip = ((a + b + c + dd) / 4 > lv) === (a > lv);
              const o = flip ? [0, 2, 4, 6] : [0, 6, 2, 4];
              ctx.moveTo(pts[o[0]] * C, pts[o[0] + 1] * C); ctx.lineTo(pts[o[1]] * C, pts[o[1] + 1] * C);
              ctx.moveTo(pts[o[2]] * C, pts[o[2] + 1] * C); ctx.lineTo(pts[o[3]] * C, pts[o[3] + 1] * C);
            }
          }
          ctx.stroke();
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer over the ranges to push up a peak beneath it.',
    listens: 'Speak, sing or play: your sound rises as the nearest range and rolls away into the distance, bass in the middle.',
    name: 'Ridgeline', seed: 4, fam: 'Drafting', type: 'vec',
    recipe: 'Slices through moving terrain stacked one behind the next, each hiding what lies beyond it. Some rolls draw the ranges in pixels instead: ink lines, coloured bands, glow or snow.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.4), noise = U.noise(R), rows = R.int(34, 56), PTS = 90;
        const zoom = R.range(1.6, 3.4), height = R.range(90, 170), speed = R.range(0.1, 0.2), env = R.pick(['centre', 'centre', 'flat', 'two']), sharp = R.bool(0.5);
        let bx = 0.5, by = 0.5, bh = 0;   // the pointer pushes up a peak where it is
        const hs = new Float32Array(rows * (PTS + 1));   // Listen: the room's sound, rising in the front range and rolling back
        let heard = 0;
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Look', 'Lines'); g.trait('Ranges', rows); g.trait('Terrain', { centre: 'One peak', flat: 'Flat', two: 'Two peaks' }[env]); g.trait('Peaks', sharp ? 'Sharp' : 'Rounded');
        return t => {
          if (g.input.inside) { bx = g.input.x; by = g.input.y; }
          bh += ((g.input.inside ? 1 : 0) - bh) * 0.08; if (bh < 1e-4) bh = 0;
          if (g.input.listening || heard) heard = listenRidges(g.input, hs, rows, PTS + 1, heard);
          sh.paint();
          ctx.lineWidth = g.lw(1.7);
          for (let r = 0; r < rows; r++) {
            const y0 = 150 + 770 * r / (rows - 1);
            ctx.beginPath(); ctx.moveTo(90, y0);
            for (let k = 0; k <= PTS; k++) {
              const u = k / PTS, x = 90 + 820 * u;
              const e = env === 'flat' ? 1 : env === 'centre' ? Math.exp(-((u - 0.5) ** 2) / 0.03) : Math.exp(-((u - 0.3) ** 2) / 0.012) + Math.exp(-((u - 0.7) ** 2) / 0.012);
              let v = noise.fbm(u * zoom, r * 0.16 - t * speed, t * 0.05, 3) * 0.5 + 0.5;
              if (sharp) v = v * v * 1.6;
              ctx.lineTo(x, y0 - (0.06 + e) * v * height - (bh ? bh * height * 1.1 * Math.exp(-((u - bx) ** 2) / 0.004 - ((y0 / 1000 - by) ** 2) / 0.006) : 0) - (heard ? hs[r * (PTS + 1) + k] * (0.25 + e) * height : 0));
            }
            ctx.lineTo(910, y0);
            ctx.fillStyle = U.css(sh.ground); ctx.fill();
            ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, r / rows, true));
            ctx.stroke();
          }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100, 100]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R), noise = U.noise(R), rows = Math.round(n * R.range(0.22, 0.42));
        const zoom = R.range(1.6, 3.6), height = n * R.range(0.12, 0.26), speed = R.range(0.1, 0.2), env = R.pick(['centre', 'centre', 'flat', 'two', 'edges']), sharp = R.bool(0.5);
        const look = R.pick(['lines', 'lines', 'bands', 'snow', 'glow']), top = n * R.range(0.14, 0.24), span = n * 0.8 - top + n * 0.12;
        const sky = look === 'bands' || look === 'snow' ? U.pk(U.mix(sc.cols[sc.cols.length - 1], [0, 0, 0], 0.8)) : BLACK;
        let bx = 0.5, by = 0.5, bh = 0, heard = 0;
        const hs = new Float32Array(rows * n);   // Listen: the room's sound, rising in the front range and rolling back
        g.trait('Ground', sky === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Look', { lines: 'Pixel lines', bands: 'Bands', snow: 'Snow', glow: 'Glow' }[look]); g.trait('Ranges', rows); g.trait('Terrain', { centre: 'One peak', flat: 'Flat', two: 'Two peaks', edges: 'Valley' }[env]); g.trait('Peaks', sharp ? 'Sharp' : 'Rounded');
        return t => {
          if (g.input.inside) { bx = g.input.x; by = g.input.y; }
          bh += ((g.input.inside ? 1 : 0) - bh) * 0.08;
          if (g.input.listening || heard) heard = listenRidges(g.input, hs, rows, n, heard);
          d.fill(sky);
          for (let r = 0; r < rows; r++) {
            const y0 = top + span * r / (rows - 1), col = U.pk(U.ramp(sc.cols, r / rows, true));
            const fill = look === 'bands' ? X.shade(col, 0.3 + 0.45 * r / rows) : look === 'glow' ? X.shade(col, 0.16) : look === 'snow' ? X.shade(col, 0.42) : BLACK;
            let prev = -1;
            for (let x = 0; x < n; x++) {
              const u = x / (n - 1);
              const e = env === 'flat' ? 1 : env === 'centre' ? Math.exp(-((u - 0.5) ** 2) / 0.03) : env === 'edges' ? 1 - 0.8 * Math.exp(-((u - 0.5) ** 2) / 0.03) : Math.exp(-((u - 0.3) ** 2) / 0.012) + Math.exp(-((u - 0.7) ** 2) / 0.012);
              let v = noise.fbm(u * zoom, r * 0.16 - t * speed, t * 0.05, 3) * 0.5 + 0.5;
              if (sharp) v = v * v * 1.6;
              let h = (0.06 + e) * v * height;
              if (bh > 0.02) { const du = u - bx, dr = y0 / n - by; h += bh * height * 1.1 * Math.exp(-du * du / 0.004 - dr * dr / 0.006); }
              if (heard) h += hs[r * n + x] * (0.25 + e) * height;
              const yt = Math.round(y0 - h);
              for (let y = Math.max(0, yt + 1); y < n; y++) d[y * n + x] = fill;
              if (prev >= 0) X.line(g, x - 1, prev, x, yt, col); else X.put(g, x, yt, col);
              if (look === 'snow' && h > height * 0.45) { X.put(g, x, yt + 1, WHITE); if (h > height * 0.6) X.put(g, x, yt + 2, WHITE); }
              prev = yt;
            }
          }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    interactive: 'Move the pointer to slide one of the gratings.',
    name: 'Moiré', seed: 2, fam: 'Drafting', type: 'vec',
    recipe: 'Two or three plain gratings laid over one another and turned a degree at a time; the pattern you see is in neither. Some rolls lay the gratings on the pixel grid instead, where they alias into new patterns.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.3), kind = R.pick(['lines', 'rings', 'rings', 'mixed', 'rays']), count = R.pick([2, 2, 3]);
        const common = R.range(0, 3), pitch = R.range(15, 22);
        const layers = Array.from({ length: count }, (_, i) => ({
          kind: kind === 'mixed' ? (i ? 'lines' : 'rings') : kind, pitch: pitch * (1 + i * R.range(0, 0.05)), a0: common + i * R.range(0.1, 0.45) * R.sign(), w: i ? R.range(0.004, 0.011) * R.sign() : 0,
          cx: i ? R.range(20, 70) : 0, cy: i ? R.range(20, 70) : 0, orbit: R.range(0.05, 0.12), col: sh.paper ? sh.ink : sh.cols[(i * 2) % sh.cols.length],
        }));
        let px = 0, py = 0;   // the pointer slides the top grating
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Gratings', count); g.trait('Kind', { lines: 'Lines', rings: 'Rings', mixed: 'Rings and lines', rays: 'Rays' }[kind]); g.trait('Look', sh.paper ? 'Ink' : 'Light');
        return t => {
          px += ((g.input.inside ? (g.input.x - 0.5) * 500 : 0) - px) * 0.1; py += ((g.input.inside ? (g.input.y - 0.5) * 500 : 0) - py) * 0.1;
          if (Math.abs(px) < 1e-6) px = 0; if (Math.abs(py) < 1e-6) py = 0;
          sh.paint();
          if (!sh.paper) ctx.globalCompositeOperation = 'lighter';
          for (const L of layers) {
            ctx.save();
            const last = L === layers[layers.length - 1];
            ctx.translate(500 + L.cx * Math.cos(t * L.orbit) + (last ? px : 0), 500 + L.cy * Math.sin(t * L.orbit * 1.3) + (last ? py : 0)); ctx.rotate(L.a0 + 0.12 * Math.sin(t * L.w * 6));
            ctx.strokeStyle = U.css(L.col, sh.paper ? 0.9 : 0.85); ctx.lineWidth = g.lw(L.pitch * 0.34);
            ctx.beginPath();
            if (L.kind === 'lines') for (let x = -760; x <= 760; x += L.pitch) { ctx.moveTo(x, -760); ctx.lineTo(x, 760); }
            else if (L.kind === 'rings') for (let r = L.pitch / 2; r < 800; r += L.pitch) { ctx.moveTo(r, 0); ctx.arc(0, 0, r, 0, U.TAU); }
            else { ctx.lineWidth = g.lw(2.2); for (let k = 0; k < 150; k++) { const a = k / 150 * Math.PI; ctx.moveTo(-800 * Math.cos(a), -800 * Math.sin(a)); ctx.lineTo(800 * Math.cos(a), 800 * Math.sin(a)); } }
            ctx.stroke();
            ctx.restore();
          }
          ctx.globalCompositeOperation = 'source-over';
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([100, 200, 200]));
      const fr = (function (g) {
        const { n, d } = g, sc = U.scheme(R), kind = R.pick(['lines', 'rings', 'rings', 'mixed', 'rays', 'spiral']), count = R.pick([2, 2, 3]);
        const pitch = n * R.range(0.022, 0.05), duty = R.pick([0.5, 0.5, 0.35]), common = R.range(0, 3), look = R.pick(['xor', 'count', 'count', 'ink']);
        const layers = Array.from({ length: count }, (_, i) => ({ kind: kind === 'mixed' ? (i ? 'lines' : 'rings') : kind, pitch: pitch * (1 + i * R.range(0, 0.06)), a0: common + i * R.range(0.05, 0.4) * R.sign(), w: i ? R.range(0.004, 0.011) * R.sign() : 0,
          cx: i ? R.range(0.02, 0.08) * n : 0, cy: i ? R.range(0.02, 0.08) * n : 0, orbit: R.range(0.05, 0.12), arms: R.int(30, 90), x: 0, y: 0, ca: 1, sa: 0, a: 0 }));
        const ground = R.bool(0.6) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.85)), A = U.pk(sc.cols[0]), B = U.pk(sc.cols[Math.min(sc.cols.length - 1, 3)]);
        const levels = Array.from({ length: count + 1 }, (_, i) => i ? U.pk(U.ramp(sc.cols, (i - 1) / count, false)) : ground);
        let px = 0, py = 0;
        g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Gratings', count); g.trait('Kind', { lines: 'Lines', rings: 'Rings', mixed: 'Rings and lines', rays: 'Rays', spiral: 'Spirals' }[kind]); g.trait('Look', { xor: 'Exclusive', count: 'Layered', ink: 'Two inks' }[look]); g.trait('Grid', n);
        return t => {
          layers.forEach((L, i) => {
            L.x = n / 2 + L.cx * Math.cos(t * L.orbit); L.y = n / 2 + L.cy * Math.sin(t * L.orbit * 1.3); L.a = L.a0 + 0.12 * Math.sin(t * L.w * 6); L.ca = Math.cos(L.a); L.sa = Math.sin(L.a);
            if (i === count - 1) { px += ((g.input.inside ? (g.input.x - 0.5) * n * 0.5 : 0) - px) * 0.1; py += ((g.input.inside ? (g.input.y - 0.5) * n * 0.5 : 0) - py) * 0.1; L.x += px; L.y += py; }
          });
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            let on = 0;
            for (let k = 0; k < count; k++) {
              const L = layers[k], dx = x + 0.5 - L.x, dy = y + 0.5 - L.y;
              let c;
              if (L.kind === 'lines') c = (dx * L.ca + dy * L.sa) / L.pitch;
              else if (L.kind === 'rings') c = Math.sqrt(dx * dx + dy * dy) / L.pitch;
              else if (L.kind === 'rays') c = (Math.atan2(dy, dx) - L.a) / U.TAU * L.arms;
              else c = Math.sqrt(dx * dx + dy * dy) / L.pitch + (Math.atan2(dy, dx) - L.a) / U.TAU * 3;
              if (c - Math.floor(c) < duty) on++;
            }
            d[i] = look === 'xor' ? (on & 1 ? A : ground) : look === 'ink' ? (on === count ? A : on ? B : ground) : levels[on];
          }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    interactive: 'Click a stitch line to start it one stitch later.',
    name: 'Hitomezashi', seed: 4, fam: 'Drafting', type: 'vec',
    recipe: 'Sashiko stitching: every row and column is a dashed line that starts either on or off. Lines slip by one stitch and the cloth changes. Some rolls stitch on a pixel grid instead and fill the regions the stitches make with two colours.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.55), N = R.int(22, 34), C = 880 / N, rule = R.pick(['random', 'random', 'word', 'primes']);
        const bit = k => (rule === 'word' ? 'synaesthesia'.charCodeAt(k % 12) & 1 : rule === 'primes' ? [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31].includes(k % 32) ? 1 : 0 : R.bool() ? 1 : 0);
        const lines = Array.from({ length: 2 * (N + 1) }, (_, k) => ({ at: bit(k), to: 0, from: 0, start: -10 }));
        lines.forEach(l => { l.to = l.from = l.at; });
        const colA = sh.paper ? sh.ink : sh.cols[0], colB = sh.paper ? sh.ink : sh.cols[Math.min(2, sh.cols.length - 1)];
        let nextFlip = 1;
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Rule', { random: 'Random', word: 'Word', primes: 'Primes' }[rule]); g.trait('Stitches', N); g.trait('Look', 'Thread');
        return t => {
          for (const p of g.input.taps()) {   // a click slips the nearest stitch line by one stitch
            const fy = (p.y * 1000 - 60) / C, fx = (p.x * 1000 - 60) / C, across = Math.abs(fy - Math.round(fy)) < Math.abs(fx - Math.round(fx));
            const k = across ? Math.max(0, Math.min(N, Math.round(fy))) : N + 1 + Math.max(0, Math.min(N, Math.round(fx))), l = lines[k];
            if (l && t - l.start > 1.6) { l.from = l.to; l.to = l.from + 1; l.start = t; }
          }
          if (t > nextFlip) { nextFlip = t + R.range(0.1, 0.3); const l = R.pick(lines); if (t - l.start > 2.2) { l.from = l.to; l.to = l.from + 1; l.start = t; } }
          sh.paint();
          ctx.save(); ctx.lineCap = 'butt'; ctx.lineWidth = g.lw(C * 0.2); ctx.setLineDash([C, C]);
          for (let k = 0; k < lines.length; k++) {
            const l = lines[k], off = U.lerp(l.from, l.to, U.smooth(U.clamp((t - l.start) / 1.6))), across = k <= N, p = 60 + (across ? k : k - N - 1) * C;
            ctx.strokeStyle = U.css(across ? colA : colB); ctx.lineDashOffset = off * C;
            ctx.beginPath();
            if (across) { ctx.moveTo(60, p); ctx.lineTo(940, p); } else { ctx.moveTo(p, 60); ctx.lineTo(p, 940); }
            ctx.stroke();
          }
          ctx.restore();
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([50, 80, 100]));
      const fr = (function (g) {
        const { n, d } = g, sc = U.scheme(R), s = R.pick([2, 3, 3, 4]), m = Math.ceil(n / s), rule = R.pick(['random', 'random', 'word', 'primes', 'sine', 'runs']);
        const freq = R.range(0.1, 0.6), runLen = R.int(2, 5), isPrime = k => { if (k < 2) return false; for (let q = 2; q * q <= k; q++) if (k % q === 0) return false; return true; };
        const bit = (k, axis) => rule === 'word' ? 'synaesthesia'.charCodeAt((k + axis * 5) % 12) & 1 : rule === 'primes' ? (isPrime(k + axis * 7) ? 1 : 0) : rule === 'sine' ? (Math.sin(k * freq + axis * 2) > 0 ? 1 : 0) : rule === 'runs' ? (Math.floor(k / runLen) + axis) & 1 : R.bool() ? 1 : 0;
        const rowBit = Uint8Array.from({ length: m + 1 }, (_, k) => bit(k, 0)), colBit = Uint8Array.from({ length: m + 1 }, (_, k) => bit(k, 1));
        const look = R.pick(['two', 'two', 'gradient', 'cloth']), pick = R.shuffle(sc.cols.slice());
        const cA = U.pk(pick[0]), cB = U.pk(look === 'cloth' ? U.mix(pick[0], [0, 0, 0], 0.15) : pick[1 % pick.length]), thread = look === 'cloth' ? WHITE : R.bool(0.5) ? BLACK : U.pk(U.mix(pick[2 % pick.length], [255, 255, 255], 0.5));
        const P2 = new Uint8Array(m * m), hst = (y, x) => ((x + rowBit[y]) & 1) === 0, vst = (x, y) => ((y + colBit[x]) & 1) === 0;
        const drift = R.range(4, 9), low = U.dim(sc.lut, 0.35);
        let nextFlip = 1;
        g.trait('Ground', 'Cloth'); g.trait('Palette', palName(sc)); g.trait('Rule', { random: 'Random', word: 'Word', primes: 'Primes', sine: 'Wave', runs: 'Runs' }[rule]); g.trait('Stitches', m); g.trait('Look', { two: 'Two colours', gradient: 'Gradient', cloth: 'Quilted' }[look]); g.trait('Grid', n);
        return t => {
          for (const p of g.input.taps()) {
            const cx = p.x * n / s, cy = p.y * n / s, fx = cx - Math.round(cx), fy = cy - Math.round(cy);
            if (Math.abs(fy) < Math.abs(fx)) rowBit[Math.min(m, Math.round(cy))] ^= 1; else colBit[Math.min(m, Math.round(cx))] ^= 1;
          }
          if (t > nextFlip) { nextFlip = t + R.range(0.3, 0.9); if (R.bool()) rowBit[R.int(0, m)] ^= 1; else colBit[R.int(0, m)] ^= 1; }
          P2[0] = 0;
          for (let x = 1; x < m; x++) P2[x] = P2[x - 1] ^ (vst(x, 0) ? 1 : 0);
          for (let y = 1; y < m; y++) for (let x = 0; x < m; x++) P2[y * m + x] = P2[(y - 1) * m + x] ^ (hst(y, x) ? 1 : 0);
          const hd = t * drift;
          for (let y = 0; y < n; y++) {
            const cy = (y / s) | 0, ey = y % s === 0;
            for (let x = 0; x < n; x++) {
              const cx = (x / s) | 0, ex = x % s === 0, par = P2[cy * m + cx];
              let c = look === 'gradient' ? (par ? sc.lut[(cx * 3 + cy * 2 + hd) & 255] : low[(cx * 3 + cy * 2 + hd) & 255]) : par ? cA : cB;
              if ((ey && hst(cy, cx)) || (ex && vst(cx, cy))) c = thread;
              d[y * n + x] = c;
            }
          }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Parquet Deformation', seed: 2, fam: 'Drafting', type: 'vec',
    recipe: 'A floor of square tiles whose shared edges bend a little more with every column, until squares have become something else.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.8), N = R.int(11, 16), C = 900 / N, SEG = 12, speed = R.range(0.02, 0.05) * R.sign(), amp = R.range(0.26, 0.4), cycles = R.pick([1, 1, 2]);
      const [pa, pb] = R.shuffle(['sine', 'zig', 'notch', 'hook']), along = R.bool(0.75);
      const profile = (kind, s) => kind === 'sine' ? Math.sin(s * U.TAU) : kind === 'zig' ? (s < 0.25 ? s * 4 : s < 0.75 ? 2 - s * 4 : s * 4 - 4) : kind === 'notch' ? (s > 0.2 && s < 0.4 ? 1 : s > 0.6 && s < 0.8 ? -1 : 0) : Math.sin(s * U.TAU) * (1 - s) * 2;
      const bend = (s, k) => { const m = k < 0.5 ? k * 2 : 2 - k * 2; return amp * (profile(pa, s) * m * (1 - k) + profile(pb, s) * m * k) * 2; };
      return Object.assign(t => {
        sh.paint();
        ctx.strokeStyle = U.css(sh.ink); ctx.lineWidth = g.lw(1.9);
        ctx.beginPath();
        for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) {
          const k = ((((along ? i : (i + j) / 2) / N * cycles + t * speed) % 1) + 1) % 1, x = 50 + i * C, y = 50 + j * C;
          if (i < N) for (let s = 0; s <= SEG; s++) { const u = s / SEG, px = x + u * C, py = y + bend(u, k) * C * 0.5; if (s) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
          if (j < N) for (let s = 0; s <= SEG; s++) { const u = s / SEG, px = x - bend(u, k) * C * 0.5, py = y + u * C; if (s) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
        }
        ctx.stroke();
      }, { period: 1 / Math.abs(speed) });
    },
  });

  P.add({
    name: 'Truchet', seed: 1, fam: 'Drafting', type: 'vec',
    recipe: 'Every tile carries the same two quarter-circles; turning a tile by a quarter reroutes the paths that run through it.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.35), N = R.int(8, 13), C = 1000 / N, h = C / 2, style = R.pick(['band', 'band', 'double', 'line']);
      const tiles = Array.from({ length: N * N }, () => ({ from: R.int(0, 1), to: 0, start: -10 }));
      tiles.forEach(tl => { tl.to = tl.from; });
      const wave = R.bool(0.5), noise = U.noise(R);
      let nextFlip = 0.5;
      return t => {
        if (t > nextFlip) {
          nextFlip = t + R.range(0.08, 0.3);
          const k = wave ? (() => { let best = 0, bv = -9; for (let q = 0; q < 6; q++) { const c = R.int(0, N * N - 1), v = noise.n3((c % N) * 0.25, Math.floor(c / N) * 0.25, t * 0.3); if (v > bv) { bv = v; best = c; } } return best; })() : R.int(0, N * N - 1);
          const tl = tiles[k]; if (t - tl.start > 1.6) { tl.from = tl.to; tl.to = tl.from + 1; tl.start = t; }
        }
        sh.paint();
        const stroke = (w, col) => {
          ctx.lineWidth = w; ctx.strokeStyle = col;
          for (let k = 0; k < tiles.length; k++) {
            const tl = tiles[k], rot = U.lerp(tl.from, tl.to, U.smooth(U.clamp((t - tl.start) / 1.2))) * Math.PI / 2;
            ctx.save(); ctx.translate((k % N) * C + h, Math.floor(k / N) * C + h); ctx.rotate(rot);
            ctx.beginPath(); ctx.arc(-h, -h, h, 0, Math.PI / 2); ctx.moveTo(0, h); ctx.arc(h, h, h, Math.PI, Math.PI * 1.5); ctx.stroke();
            ctx.restore();
          }
        };
        const col = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, t * 0.01, true));
        if (style === 'line') stroke(g.lw(C * 0.07), col);
        else { stroke(C * 0.36, col); if (style === 'double') stroke(C * 0.2, U.css(sh.ground)); if (style === 'double') stroke(g.lw(C * 0.05), col); }
      };
    },
  });

  P.add({
    name: 'Cardioid', fam: 'Drafting', type: 'vec',
    recipe: 'Points round a circle, each joined to the point k times further on. Sliding k turns a cardioid into every other curve.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.45), N = R.int(160, 260), k0 = R.range(2, 7), speed = R.range(0.012, 0.03) * R.sign(), swing = R.range(1.5, 4), GROUPS = 16, turn = R.range(0, 6);
      return t => {
        sh.paint();
        const k = k0 + swing * Math.sin(t * speed * 3) + t * speed * 0.3;
        ctx.lineWidth = g.lw(1.1);
        for (let q = 0; q < GROUPS; q++) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, q / GROUPS, true), sh.paper ? 0.7 : 0.85);
          ctx.beginPath();
          for (let i = q; i < N; i += GROUPS) {
            const a = turn + i / N * U.TAU, b = turn + i * k / N * U.TAU;
            ctx.moveTo(500 + 450 * Math.cos(a), 500 + 450 * Math.sin(a)); ctx.lineTo(500 + 450 * Math.cos(b), 500 + 450 * Math.sin(b));
          }
          ctx.stroke();
        }
        ctx.strokeStyle = U.css(sh.ink, 0.9); ctx.lineWidth = g.lw(1.6);
        ctx.beginPath(); ctx.arc(500, 500, 450, 0, U.TAU); ctx.stroke();
      };
    },
  });

  P.add({
    name: 'Halftone', seed: 2, fam: 'Drafting', type: 'vec',
    recipe: 'Two screens of dots at different angles, each swelling with its own slow cloud; where they overprint, a third colour.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.3), noise = U.noise(R), pitch = R.range(24, 34), zoom = R.range(0.0016, 0.003), speed = R.range(0.05, 0.1);
      const inks = R.shuffle(sc.cols.slice()).slice(0, 2), screens = [{ a: R.pick([0.26, 0.785, 1.3]), col: inks[0], z: 0 }, { a: R.pick([0, 0.52, 1.05]), col: inks[1] || inks[0], z: 9 }];
      return t => {
        ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        ctx.globalCompositeOperation = 'lighter';
        for (const s of screens) {
          const ca = Math.cos(s.a), sa = Math.sin(s.a), reach = Math.ceil(760 / pitch);
          ctx.fillStyle = U.css(s.col);
          ctx.beginPath();
          for (let j = -reach; j <= reach; j++) for (let i = -reach; i <= reach; i++) {
            const x = 500 + (i * ca - j * sa) * pitch, y = 500 + (i * sa + j * ca) * pitch;
            if (x < -20 || y < -20 || x > 1020 || y > 1020) continue;
            const v = noise.fbm(x * zoom, y * zoom, t * speed + s.z, 2) * 0.9 + 0.5, r = pitch * 0.68 * Math.sqrt(U.clamp(v));
            if (r > 1.2) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, U.TAU); }
          }
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
      };
    },
  });

  P.add({
    name: 'Schotter', seed: 4, fam: 'Drafting', type: 'vec',
    recipe: 'A grid of squares that starts in perfect order and loses it row by row, after the 1968 plotter drawing; here the gravel keeps shifting.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.75), noise = U.noise(R), cols = R.int(12, 18), rows = cols + R.int(0, 4), C = Math.min(860 / cols, 880 / rows), ox = 500 - cols * C / 2, oy = 500 - rows * C / 2;
      const mode = R.pick(['down', 'down', 'centre', 'wave']), speed = R.range(0.1, 0.22), nested = R.bool(0.3);
      return t => {
        sh.paint();
        ctx.lineWidth = g.lw(1.7);
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1), v = j / (rows - 1);
          const chaos = mode === 'down' ? v * v : mode === 'centre' ? Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.5) * 2.4) : 0.5 + 0.5 * Math.sin(v * 5 - t * 0.5 + u * 2);
          const rot = noise.n3(i * 0.9, j * 0.9, t * speed) * chaos * 1.5, dx = noise.n3(i * 0.9 + 40, j * 0.9, t * speed) * chaos * C * 0.75, dy = noise.n3(i * 0.9, j * 0.9 + 40, t * speed) * chaos * C * 0.75;
          ctx.save(); ctx.translate(ox + (i + 0.5) * C + dx, oy + (j + 0.5) * C + dy); ctx.rotate(rot);
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, chaos * 0.8, true));
          ctx.strokeRect(-C / 2, -C / 2, C, C);
          if (nested) ctx.strokeRect(-C / 4, -C / 4, C / 2, C / 2);
          ctx.restore();
        }
      };
    },
  });

  P.add({
    name: 'Girih', seed: 3, fam: 'Drafting', type: 'vec',
    recipe: 'From the middle of every edge of a plain tiling, two lines leave at the same angle and meet their neighbours; change the angle and the stars open and close.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.6), tiling = R.pick(['square', 'hex', 'octagon', 'octagon', 'triangle']), polys = [];
      const ngon = (cx, cy, r, k, rot) => Array.from({ length: k }, (_, i) => [cx + r * Math.cos(rot + i * U.TAU / k), cy + r * Math.sin(rot + i * U.TAU / k)]);
      if (tiling === 'square') { const N = R.int(4, 6), C = 1000 / N; for (let j = -1; j <= N; j++) for (let i = -1; i <= N; i++) polys.push(ngon((i + 0.5) * C, (j + 0.5) * C, C / Math.SQRT2, 4, Math.PI / 4)); }
      else if (tiling === 'hex') { const r = R.range(95, 140), w = Math.sqrt(3) * r; for (let j = -1; j < 1000 / (1.5 * r) + 1; j++) for (let i = -1; i < 1000 / w + 1; i++) polys.push(ngon(i * w + (j & 1 ? w / 2 : 0), j * 1.5 * r, r, 6, Math.PI / 6)); }
      else if (tiling === 'triangle') { const s = R.range(170, 240), hh = s * Math.sqrt(3) / 2; for (let j = -1; j < 1000 / hh + 1; j++) for (let i = -2; i < 2000 / s + 2; i++) { const up = (i + j) % 2 === 0, cx = i * s / 2, cy = j * hh + (up ? hh * 2 / 3 : hh / 3); polys.push(ngon(cx, cy, s / Math.sqrt(3), 3, up ? -Math.PI / 2 : Math.PI / 2)); } }
      else { const N = R.int(3, 5), C = 1000 / N, r8 = C / 2 / Math.cos(Math.PI / 8), s4 = C * (Math.SQRT2 - 1) / Math.SQRT2; for (let j = -1; j <= N + 1; j++) for (let i = -1; i <= N + 1; i++) { polys.push(ngon((i + 0.5) * C, (j + 0.5) * C, r8, 8, Math.PI / 8)); polys.push(ngon(i * C, j * C, s4, 4, 0)); } }
      const lo = R.range(0.5, 0.75), hi = R.range(1.05, 1.3), w = R.range(0.1, 0.2), strap = R.bool(0.6);
      const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
      return t => {
        const th = U.lerp(lo, hi, 0.5 - 0.5 * Math.cos(t * w));
        sh.paint();
        ctx.beginPath();
        for (const p of polys) {
          const k = p.length, cx = p.reduce((s, v) => s + v[0], 0) / k, cy = p.reduce((s, v) => s + v[1], 0) / k;
          for (let i = 0; i < k; i++) {
            const a = p[i], b = p[(i + 1) % k], c = p[(i + 2) % k], m1 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], m2 = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
            const e1 = [b[0] - a[0], b[1] - a[1]], e2 = [b[0] - c[0], b[1] - c[1]], side = Math.sign(e1[0] * (cy - m1[1]) - e1[1] * (cx - m1[0]));
            const d1 = rot(e1, side * th), d2 = rot(e2, -side * th), den = d1[0] * d2[1] - d1[1] * d2[0];
            if (Math.abs(den) < 1e-6) continue;
            const s = ((m2[0] - m1[0]) * d2[1] - (m2[1] - m1[1]) * d2[0]) / den;
            ctx.moveTo(m1[0], m1[1]); ctx.lineTo(m1[0] + d1[0] * s, m1[1] + d1[1] * s); ctx.lineTo(m2[0], m2[1]);
          }
        }
        const col = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, t * 0.012, true));
        if (strap) { ctx.lineWidth = 11; ctx.strokeStyle = col; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = U.css(sh.ground); ctx.stroke(); }
        else { ctx.lineWidth = g.lw(2.4); ctx.strokeStyle = col; ctx.stroke(); }
      };
    },
  });

  P.add({
    name: 'Two-Opt', seed: 3, fam: 'Drafting', type: 'vec',
    recipe: 'A tangled route through scattered points, improved one uncrossing at a time until it is a single clean loop; then the points move.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.5), N = R.int(110, 170), px = new Float32Array(N), py = new Float32Array(N), tx = new Float32Array(N), ty = new Float32Array(N);
      const layout = R.pick(['random', 'random', 'ring', 'grid']);
      const scatter = () => { for (let i = 0; i < N; i++) { if (layout === 'ring') { const a = R.range(0, U.TAU), r = R.range(250, 430); tx[i] = 500 + r * Math.cos(a); ty[i] = 500 + r * Math.sin(a); } else if (layout === 'grid') { tx[i] = 90 + R.int(0, 13) * 63 + R.range(-9, 9); ty[i] = 90 + R.int(0, 13) * 63 + R.range(-9, 9); } else { tx[i] = R.range(70, 930); ty[i] = R.range(70, 930); } } };
      scatter(); px.set(tx); py.set(ty);
      let tour = R.shuffle(Array.from({ length: N }, (_, i) => i)), scan = 0, idle = 0, state = 'solve', hold = 0;
      const dist = (a, b) => Math.hypot(px[a] - px[b], py[a] - py[b]);
      const improve = budget => {
        let moves = 0;
        for (let k = 0; k < budget && moves < 6; k++, scan++) {
          const i = scan % N, j = (i + 2 + ((scan / N) | 0) % (N - 3)) % N, a = tour[i], b = tour[(i + 1) % N], c = tour[j], e = tour[(j + 1) % N];
          if (a === c || b === c || a === e) continue;
          if (dist(a, c) + dist(b, e) < dist(a, b) + dist(c, e) - 0.01) {
            let lo = (i + 1) % N, hi = j, len = ((hi - lo + N) % N + 1) >> 1;
            for (let s = 0; s < len; s++) { const u = (lo + s) % N, v = (hi - s + N) % N, tmp = tour[u]; tour[u] = tour[v]; tour[v] = tmp; }
            moves++; idle = 0;
          } else idle++;
        }
      };
      return (t, dt) => {
        if (state === 'solve') { improve(2400); if (idle > N * N) { state = 'hold'; hold = 0; } }
        else if (state === 'hold') { if ((hold += dt) > 3.5) { state = 'move'; hold = 0; scatter(); R.shuffle(tour); } }
        else { for (let i = 0; i < N; i++) { px[i] += (tx[i] - px[i]) * 0.07; py[i] += (ty[i] - py[i]) * 0.07; } if ((hold += dt) > 2.2) { state = 'solve'; idle = 0; } }
        sh.paint();
        ctx.lineWidth = g.lw(1.6);
        const GROUPS = sh.paper ? 1 : 20;
        for (let q = 0; q < GROUPS; q++) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, q / GROUPS, true), 0.9);
          ctx.beginPath();
          const from = Math.floor(q * N / GROUPS), to = Math.floor((q + 1) * N / GROUPS);
          ctx.moveTo(px[tour[from]], py[tour[from]]);
          for (let k = from + 1; k <= to; k++) ctx.lineTo(px[tour[k % N]], py[tour[k % N]]);
          ctx.stroke();
        }
        ctx.fillStyle = U.css(sh.ink);
        ctx.beginPath();
        for (let i = 0; i < N; i++) { ctx.moveTo(px[i] + 4.5, py[i]); ctx.arc(px[i], py[i], Math.max(4.5, g.px * 1.4), 0, U.TAU); }
        ctx.fill();
      };
    },
  });

  P.add({
    name: 'Dragon Fold', seed: 3, fam: 'Drafting', type: 'vec',
    recipe: 'A strip of paper folded in half ten times, then every crease opened to the same angle. Past a right angle it is the dragon curve.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.5), order = R.pick([9, 10, 10, 11]), n = (1 << order) - 1, turns = new Int8Array(n);
      for (let i = 1; i <= n; i++) { let k = i; while ((k & 1) === 0) k >>= 1; turns[i - 1] = ((k >> 1) & 1) ? -1 : 1; }
      const lo = R.range(1.2, 1.5), hi = R.range(2.3, 2.9), w = R.range(0.07, 0.13), spin = R.range(0, 6), xs = new Float32Array(n + 2), ys = new Float32Array(n + 2), GROUPS = 24;
      return t => {
        const open = U.lerp(lo, hi, 0.5 - 0.5 * Math.cos(t * w)), turn = Math.PI - open;
        let a = 0, x = 0, y = 0, x0 = 0, x1 = 0, y0 = 0, y1 = 0;
        for (let i = 0; i <= n; i++) {
          x += Math.cos(a); y += Math.sin(a); xs[i + 1] = x; ys[i + 1] = y;
          if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
          if (i < n) a += turns[i] * turn;
        }
        const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, k = 640 / Math.max(x1 - x0, y1 - y0, 1);
        sh.paint();
        ctx.save(); ctx.translate(500, 500); ctx.rotate(spin + t * 0.02);
        ctx.lineWidth = g.lw(Math.max(1.2, Math.min(3, k * 0.3)));
        for (let q = 0; q < GROUPS; q++) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, q / GROUPS, true));
          ctx.beginPath();
          const from = Math.floor(q * (n + 1) / GROUPS), to = Math.floor((q + 1) * (n + 1) / GROUPS);
          ctx.moveTo((xs[from] - cx) * k, (ys[from] - cy) * k);
          for (let i = from + 1; i <= to; i++) ctx.lineTo((xs[i] - cx) * k, (ys[i] - cy) * k);
          ctx.stroke();
        }
        ctx.restore();
      };
    },
  });

  P.add({
    interactive: 'Grab a gear and drag it round to drive the whole train by hand.',
    name: 'Gear Train', fam: 'Drafting', type: 'px', sizes: [80, 100, 100], fps: 24,
    recipe: 'Meshed gears in chunky pixels that actually run: each wheel turns its neighbour the other way, slower or faster by the ratio of their teeth, in brass, steel, copper or paint on a dark plate.',
    make(R, U, g) {
      // pixels only (the founder asked for it): every variation is the cell-grid version
      // the grid size comes from the def (sizes), chosen by the gallery from the same dice as before
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R), mod = R.range(2.3, 3.4) * n / 100, gears = [];
        const metal = R.pick(['brass', 'steel', 'copper', 'paint', 'paint']);
        const MET = { brass: [[150, 108, 38], [214, 170, 70], [255, 226, 140]], steel: [[92, 102, 118], [162, 172, 186], [232, 238, 244]], copper: [[124, 56, 28], [198, 108, 58], [250, 176, 118]] };
        const plate = R.pick([[16, 18, 22], [12, 20, 40], [26, 18, 14], [8, 8, 8]]), plateC = U.pk(plate), dot = U.pk(U.mix(plate, [255, 255, 255], 0.08));
        const first = R.int(12, 22);
        gears.push({ x: R.range(0.38, 0.62) * n, y: R.range(0.38, 0.62) * n, T: first, r: mod * first / 2, ratio: 1, ph: 0, style: R.int(0, 2) });
        for (let tries = 0; tries < 600 && gears.length < 12; tries++) {
          const p = R.pick(gears), T = R.int(8, 30), r = mod * T / 2, th = R.range(0, U.TAU), x = p.x + (p.r + r) * Math.cos(th), y = p.y + (p.r + r) * Math.sin(th);
          if (x - r < 1 || y - r < 1 || x + r > n - 1 || y + r > n - 1) continue;
          if (gears.some(q => q !== p && Math.hypot(q.x - x, q.y - y) < q.r + r + mod * 2.6)) continue;
          // phase chosen so a tooth of the new wheel sits in a gap of its driver at the point of contact
          gears.push({ x, y, T, r, ratio: -p.ratio * p.T / T, ph: th + Math.PI - Math.PI / T + p.T / T * (th - p.ph), style: R.int(0, 2) });
        }
        gears.forEach((q, i) => { q.cols = metal === 'paint' ? [0.45, 1, 1.4].map(k => X.shade(U.pk(U.ramp(sc.cols, i / gears.length, true)), k)) : MET[metal].map(U.pk); });
        const w0 = R.range(0.25, 0.5) * R.sign();
        let drive = 0, grab = null, wasDown = false;
        g.trait('Plate', ['Slate', 'Navy', 'Walnut', 'Black'][[16, 12, 26, 8].indexOf(plate[0])]); g.trait('Palette', metal === 'paint' ? palName(sc) : 'Metal'); g.trait('Gears', gears.length); g.trait('Material', { brass: 'Brass', steel: 'Steel', copper: 'Copper', paint: 'Painted' }[metal]); g.trait('Grid', n);
        return (t, dt) => {
          const ip = g.input, pxp = ip.x * n, pyp = ip.y * n;
          if (ip.down && ip.inside && !wasDown) { const q = gears.find(q => Math.hypot(pxp - q.x, pyp - q.y) < q.r + mod); if (q) grab = { q, off: q.ph + q.ratio * drive - Math.atan2(pyp - q.y, pxp - q.x) }; }
          if (!ip.down) grab = null;
          wasDown = ip.down;
          if (grab) drive = (Math.atan2(pyp - grab.q.y, pxp - grab.q.x) + grab.off - grab.q.ph) / grab.q.ratio;
          else drive += w0 * Math.min(0.1, dt);
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) d[i] = (x % 6 === 3 && y % 6 === 3) ? dot : plateC;
          for (const q of gears) {
            const a0 = q.ph + q.ratio * drive, root = q.r - 1.25 * mod, tip = q.r + mod, pitch = U.TAU / q.T, hub = Math.max(1.5, q.r * 0.16), inner = root - mod * 1.4;
            const spokes = q.T % 5 === 0 ? 5 : q.T % 3 === 0 ? 6 : 4, [dark, mid, light] = q.cols;
            const x0 = Math.max(0, Math.floor(q.x - tip)), x1 = Math.min(n - 1, Math.ceil(q.x + tip)), y0 = Math.max(0, Math.floor(q.y - tip)), y1 = Math.min(n - 1, Math.ceil(q.y + tip));
            for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
              const dx = x + 0.5 - q.x, dy = y + 0.5 - q.y, r = Math.sqrt(dx * dx + dy * dy);
              if (r > tip) continue;
              const a = Math.atan2(dy, dx) - a0;
              if (r > root) { const f = ((a / pitch) % 1 + 1) % 1, allow = 0.27 - 0.09 * (r - root) / (tip - root); if (Math.abs(f - 0.5) > allow) continue; }
              if (r < hub) { d[y * n + x] = r < hub * 0.45 ? light : plateC; continue; }
              let c = mid;
              if (inner > hub * 2.2 && r < inner && r > hub * 1.5) {
                if (q.style === 0) { const sa = ((a / (U.TAU / spokes)) % 1 + 1) % 1, half = (mod * 0.9) / r / (U.TAU / spokes); if (Math.min(sa, 1 - sa) > half) { d[y * n + x] = plateC; continue; } }
                else if (q.style === 1) { const sa = ((a / (U.TAU / spokes)) % 1 + 1) % 1 - 0.5, rr = (hub * 1.5 + inner) / 2, hx = (r - rr) / ((inner - hub * 1.5) * 0.4), hy = sa * U.TAU / spokes * r / ((inner - hub * 1.5) * 0.4); if (hx * hx + hy * hy < 1) { d[y * n + x] = plateC; continue; } }
              }
              const lightDir = -(dx + dy) / (r * 1.414);
              if (r > root - 1.2 || (r > inner - 1 && r < inner + 0.6) || r < hub + 1) c = lightDir > 0.25 ? light : lightDir < -0.25 ? dark : mid;
              d[y * n + x] = c;
            }
          }
        };
      })(g);
      return fr;
    },
  });
})();
