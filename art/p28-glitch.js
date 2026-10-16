// Set 3 · Glitch: one small generated picture per piece, broken in a different way each time.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Glitch' }, def));

  // The picture each glitch breaks, one of six: a sunset landscape, test-card
  // colour bars, a big pixel face, a night skyline, a word over stripes, or a
  // turning checker ball, in one palette. draw(t, out) repaints it, moving.
  // The og path (the opening variation and most rolls, chosen from g.alt, never R) is the
  // original landscape exactly; other rolls may get one of the newer pictures.
  function scene(R, n, g) {
    const og = !g || (g.ogScene ??= g.home || g.alt() < 0.6);
    if (!og) { const kind = R.pick(['land', 'bars', 'face', 'city', 'word', 'ball']); if (kind !== 'land') return other(R, n, kind); }
    const sc = U.scheme(R, 0.45), nz = U.noise(R), cols = sc.cols, k = cols.length;
    const skyA = cols[0], skyB = cols[Math.floor(k / 2)], sunC = U.mix(cols[k - 1], [255, 250, 230], 0.5), lake = Math.round(n * R.range(0.68, 0.78));
    const ridges = [0, 1, 2].map(r => ({ h: Array.from({ length: n }, (_, x) => lake - n * (0.32 - r * 0.09) - nz.fbm(x / n * (2 + r * 1.5), r * 5, 0, 4) * n * 0.14), c: U.pk(U.mix(cols[(r + 1) % k], [10, 10, 20], 0.25 + r * 0.2)) }));
    const bands = 7, sky = Array.from({ length: bands }, (_, b) => U.pk(U.mix(skyA, skyB, b / (bands - 1)))), sunX = R.range(0.3, 0.7), sunR = n * R.range(0.1, 0.15);
    return {
      cols,
      draw(t, out) {
        const sx = n * (sunX + 0.08 * Math.sin(t * 0.07)), sy = lake - n * (0.3 + 0.06 * Math.sin(t * 0.05));
        for (let y = 0; y < n; y++) {
          const yy = y < lake ? y : 2 * lake - y, wob = y < lake ? 0 : Math.round(Math.sin(y * 1.3 + t * 1.5) * 1.5);
          for (let x = 0; x < n; x++) {
            const xx = Math.max(0, Math.min(n - 1, x + wob));
            let c = sky[Math.min(bands - 1, Math.floor(yy / lake * bands))];
            const dx = xx + 0.5 - sx, dy = yy + 0.5 - sy;
            if (dx * dx + dy * dy < sunR * sunR && !(Math.floor(yy / 3) % 3 === 0 && yy > sy)) c = U.pk(sunC);
            for (const r of ridges) if (yy > r.h[xx]) c = r.c;
            if (y >= lake) c = (y - lake) % 4 === 0 ? X.shade(c, 0.55) : X.shade(c, 0.8);
            out[y * n + x] = c;
          }
        }
      },
    };
  }
  function other(R, n, kind) {
    const sc = U.scheme(R, 0.4), cols = sc.cols, k = cols.length, P = cols.map(U.pk);
    if (kind === 'bars') {
      const bars = [[192, 192, 192], [192, 192, 0], [0, 192, 192], [0, 192, 0], [192, 0, 192], [192, 0, 0], [0, 0, 192]].map(c => X.rgb(c[0], c[1], c[2]));
      return { cols, draw(t, out) {
        const bx = Math.round(n * (0.5 + 0.3 * Math.sin(t * 0.6))), by = Math.round(n * 0.72);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = y < n * 0.66 ? bars[Math.floor(x / n * 7)] : y < n * 0.74 ? bars[6 - Math.floor(x / n * 7)] : Math.floor(x / n * 6) % 2 ? X.rgb(16, 16, 16) : x < n * 0.2 ? X.rgb(0, 30, 80) : WHITE;
          if (Math.abs(x - bx) < n * 0.08 && Math.abs(y - by) < n * 0.06) c = P[(Math.floor(t) % k)];
          out[y * n + x] = c;
        }
      } };
    }
    if (kind === 'face') {
      const s = X.outline(X.mirrorSprite(R, 9, 10, 0.62, 0.22)), sc2 = Math.max(1, Math.floor(n * 0.62 / s.length)), bg = [P[0], P[Math.floor(k / 2)]], body = P[k - 1], acc = P[1 % k];
      return { cols, draw(t, out) {
        const ox = Math.round((n - s[0].length * sc2) / 2 + Math.sin(t * 0.8) * n * 0.05), oy = Math.round((n - s.length * sc2) / 2 + Math.abs(Math.sin(t * 1.6)) * -n * 0.04);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) out[y * n + x] = bg[(Math.floor((y + t * 6) / (n / 8)) & 1)];
        for (let r = 0; r < s.length; r++) for (let q = 0; q < s[0].length; q++) { const v = s[r][q]; if (!v) continue; const c = v === 9 ? X.rgb(12, 12, 18) : v === 2 ? acc : body; for (let a = 0; a < sc2; a++) for (let b = 0; b < sc2; b++) { const x = ox + q * sc2 + b, y = oy + r * sc2 + a; if (x >= 0 && y >= 0 && x < n && y < n) out[y * n + x] = c; } }
      } };
    }
    if (kind === 'city') {
      const towers = []; for (let x = 0; x < n;) { const w = R.int(4, 10), h = R.range(0.25, 0.75) * n; towers.push({ x, w, h, c: X.shade(P[R.int(0, k - 1)], 0.35) }); x += w + R.int(0, 2); }
      const sky = [X.rgb(8, 8, 24), U.pk(U.mix(cols[0], [10, 10, 30], 0.5))];
      return { cols, draw(t, out) {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) out[y * n + x] = sky[y > n * 0.5 + X.dith4(x, y) * n * 0.2 ? 1 : 0];
        const mx = n * 0.75, my = n * 0.2;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if ((x - mx) ** 2 + (y - my) ** 2 < (n * 0.08) ** 2) out[y * n + x] = X.rgb(240, 236, 210);
        for (const tw of towers) for (let y = Math.round(n - tw.h); y < n; y++) for (let x = tw.x; x < Math.min(n, tw.x + tw.w); x++) {
          const lit = (x - tw.x) % 2 === 1 && y % 3 === 1 && ((x * 7 + y * 13 + Math.floor(t * 0.7) * (tw.x + 1)) % 5 < 2);
          out[y * n + x] = lit ? P[(x + y) % k] : tw.c;
        }
      } };
    }
    if (kind === 'word') {
      const word = R.pick(['SYNAE', 'HUE', 'PRISM', 'TEMPO', 'DAWN', 'NEON']), scale = Math.max(1, Math.floor(n * 0.9 / (word.length * 6)));
      return { cols, draw(t, out) {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) out[y * n + x] = P[Math.floor((x + y + t * 8) / (n / 10)) % k];
        const g2 = { n, d: out }, w = X.textWidth(word, scale), x0 = Math.round((n - w) / 2), y0 = Math.round((n - 7 * scale) / 2 + Math.sin(t) * n * 0.06);
        X.rect(g2, x0 - scale, y0 - scale, w + 2 * scale, 9 * scale, X.rgb(12, 12, 18));
        X.text(g2, word, x0, y0, WHITE, scale);
      } };
    }
    return { cols, draw(t, out) {   // a checker ball turning over a floor
      const cx = n / 2, cy = n * 0.45, r = n * 0.3, sp = t * 0.8;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, q = dx * dx + dy * dy;
        let c = y > n * 0.78 ? P[((x >> 3) + (y >> 2)) & 1 ? 0 : 1 % k] : X.shade(P[k - 1], 0.25);
        if (q < 1) { const z = Math.sqrt(1 - q), lon = Math.atan2(dx, z) + sp, lat = Math.asin(dy); c = (Math.floor(lon / (Math.PI / 6)) + Math.floor(lat / (Math.PI / 6))) & 1 ? P[Math.floor(k / 2)] : WHITE; c = X.shade(c, 0.5 + 0.5 * z); }
        out[y * n + x] = c;
      }
    } };
  }

  // ---------- traits ----------
  // scene() with the picture and palette it rolled named as traits. R is wrapped only to
  // watch the first pick (the picture's kind on the newer-picture path); every draw is R's own.
  function sceneT(R, n, g) {
    let first = null;
    const R2 = Object.assign(() => R(), R, { pick: a => { const v = R.pick(a); if (first === null) first = v; return v; } });
    const sc = scene(R2, n, g), land = g.ogScene || first === 'land';
    g.trait('Picture', land ? 'Sunset' : { bars: 'Test card', face: 'Pixel face', city: 'Night city', word: 'Word', ball: 'Checker ball' }[first] || 'Sunset');
    const p = U.PALETTES.find(p => p.cols.length === sc.cols.length && p.cols[0].every((v, i) => v === sc.cols[0][i]));
    g.trait('Palette', p ? p.name : 'Spectrum');
    g.trait('Grid', g.n);
    return sc;
  }
  const roll = (g, vals, w) => { if (g.home) return vals[0]; let u = g.alt() * (w ? w.reduce((a, b) => a + b, 0) : vals.length); for (let i = 0; i < vals.length; i++) { u -= w ? w[i] : 1; if (u < 0) return vals[i]; } return vals[vals.length - 1]; };
  const compass = a => { const k = Math.round(((a % TAU) + TAU) % TAU / (Math.PI / 4)) % 4; return ['Across', 'Diagonal', 'Down', 'Diagonal'][k]; };

  add({
    name: 'Pixel Sort', sizes: [80, 100], fps: 10,
    recipe: 'Every column of the picture is cut into runs wherever brightness falls inside a window, and each run is sorted dark to light. The window breathes, so the sorted streaks grow down the sky and melt back.',
    make(R, U, g) {
      const { n, d } = g, sc = scene(R, n), img = new Uint32Array(n * n), horiz = R.bool(0.35), up = R.bool(0.5), lo0 = R.range(0.15, 0.3), tmp = [];
      return t => {
        sc.draw(t, img);
        const hi = 0.45 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.25)), lo = lo0;
        for (let a = 0; a < n; a++) {
          let start = -1;
          for (let b = 0; b <= n; b++) {
            const i = horiz ? a * n + b : b * n + a, v = b < n ? X.lum(img[i]) : -1, inside = v >= lo && v <= hi;
            if (inside && start < 0) start = b;
            if (!inside && start >= 0) {
              tmp.length = 0;
              for (let q = start; q < b; q++) tmp.push(img[horiz ? a * n + q : q * n + a]);
              tmp.sort((p, q) => up ? X.lum(p) - X.lum(q) : X.lum(q) - X.lum(p));
              for (let q = start; q < b; q++) img[horiz ? a * n + q : q * n + a] = tmp[q - start];
              start = -1;
            }
          }
        }
        d.set(img);
      };
    },
  });

  add({
    name: 'Datamosh', sizes: [80, 100], fps: 10,
    recipe: 'A video with its keyframes dropped: the picture is pushed around block by block by its own motion vectors and smears into itself, until a fresh keyframe wipes in from the top and it all begins to melt again.',
    make(R, U, g) {
      const { n, d } = g, sc = scene(R, n), cur = new Uint32Array(n * n), nxt = new Uint32Array(n * n), src = new Uint32Array(n * n), nz = U.noise(R), b = R.pick([4, 5, 8]);
      const cycle = R.range(12, 16), angle = R.range(0, TAU);
      sc.draw(0, cur);
      let wipe = n;
      return (t, dt) => {
        const ph = t % cycle;
        if (ph < dt) wipe = 0;
        sc.draw(t, src);
        for (let by = 0; by < n; by += b) for (let bx = 0; bx < n; bx += b) {
          const v = nz.n3(bx / n * 2, by / n * 2, t * 0.08), w = nz.n3(bx / n * 2 + 9, by / n * 2, t * 0.08);
          const mx = Math.round(Math.cos(angle + v * 3) * 1.4 * (0.5 + w)), my = Math.round(Math.sin(angle + v * 3) * 1.4 * (0.5 + w));
          for (let y = by; y < Math.min(n, by + b); y++) for (let x = bx; x < Math.min(n, bx + b); x++) {
            const sx = (x - mx + n) % n, sy = (y - my + n) % n;
            nxt[y * n + x] = cur[sy * n + sx];
          }
        }
        if (wipe < n) { const to = Math.min(n, wipe + Math.ceil(n / 12)); nxt.set(src.subarray(0, to * n), 0); wipe = to; }
        cur.set(nxt); d.set(cur);
      };
    },
  });

  add({
    name: 'Blocks', sizes: [40, 80], fps: 10,
    listens: 'Make some noise and the picture crushes into blocks.',
    recipe: 'The picture is stored as 8 by 8 cosine blocks, the way a JPEG is, and each block keeps only its first few frequencies. A slow wave of bad quality travels across, so blocks go flat and ringing and then sharpen again.',
    make(R, U, g) {
      const { n, d } = g, sc = sceneT(R, n, g), img = new Uint32Array(n * n), B = 8, nb = n / B, C = [];
      for (let u = 0; u < B; u++) { C.push(new Float32Array(B)); for (let x = 0; x < B; x++) C[u][x] = (u ? Math.sqrt(2 / B) : Math.sqrt(1 / B)) * Math.cos((2 * x + 1) * u * Math.PI / (2 * B)); }
      const zig = []; for (let v = 0; v < B; v++) for (let u = 0; u < B; u++) zig.push([u, v]); zig.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[0] - b[0]);
      sc.draw(0, img);
      const coef = new Float32Array(nb * nb * 3 * 64), shown = new Int8Array(nb * nb).fill(-1), q = R.pick([1, 2]), dir = R.range(0, TAU), wl = R.range(0.8, 1.5);
      g.trait('Wave', compass(dir)); g.trait('Quantiser', q === 1 ? 'Fine' : 'Coarse'); g.trait('Wavelength', wl < 1.15 ? 'Long' : 'Short');
      for (let by = 0; by < nb; by++) for (let bx = 0; bx < nb; bx++) for (let ch = 0; ch < 3; ch++) for (let v = 0; v < B; v++) for (let u = 0; u < B; u++) {
        let s = 0;
        for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) s += ((img[(by * B + y) * n + bx * B + x] >> (ch * 8)) & 255) * C[u][x] * C[v][y];
        coef[(((by * nb + bx) * 3 + ch) * 64) + v * 8 + u] = Math.round(s / (q * 8)) * q * 8;
      }
      let crush = 0;
      return (t, dt) => {
        crush += ((g.input.listening ? Math.min(1, g.input.level * 1.5) : 0) - crush) * Math.min(1, dt * 4);
        for (let by = 0; by < nb; by++) for (let bx = 0; bx < nb; bx++) {
          const w = Math.sin((bx * Math.cos(dir) + by * Math.sin(dir)) / nb * TAU * wl - t * 0.5) + crush * 1.7, k = w > 0.55 ? 1 : w > 0.2 ? 3 : w > -0.2 ? 6 : w > -0.6 ? 15 : 64, bi = by * nb + bx;
          if (shown[bi] === k) continue;
          shown[bi] = k;
          for (let y = 0; y < B; y++) for (let x = 0; x < B; x++) {
            const rgb = [0, 0, 0];
            for (let ch = 0; ch < 3; ch++) { const base = (bi * 3 + ch) * 64; let s = 0; for (let z = 0; z < k; z++) { const [u, v] = zig[z]; s += coef[base + v * 8 + u] * C[u][x] * C[v][y]; } rgb[ch] = s; }
            d[(by * B + y) * n + bx * B + x] = X.rgb(Math.max(0, rgb[0]), Math.max(0, rgb[1]), Math.max(0, rgb[2]));
          }
        }
      };
    },
  });

  add({
    name: 'Horizontal Hold', sizes: [80, 100, 200], fps: 12,
    listens: 'A clap knocks the picture out of hold.',
    recipe: 'An old set losing its sync: the picture leans into a diagonal and wraps round on itself, the blanking bar slides through, and every so often it snaps back upright for a moment before slipping again.',
    make(R, U, g) {
      const { n, d } = g, sc = sceneT(R, n, g), img = new Uint32Array(n * n), roll = R.range(1.5, 4) * R.sign(), skewMax = R.range(0.3, 0.9) * R.sign();
      g.trait('Roll', roll > 0 ? 'Up' : 'Down'); g.trait('Lean', (Math.abs(skewMax) > 0.6 ? 'Hard ' : 'Slight ') + (skewMax > 0 ? 'left' : 'right'));
      // the hold is lost most of the time and snaps back upright only for a few seconds each cycle
      let kick = 0, jolt = 0;
      return (t, dt) => {
        sc.draw(t, img);
        if (g.input.listening) for (let b = Math.min(2, g.input.beats()); b > 0; b--) kick = 1;
        if (kick > 0) { jolt += kick * n * 0.6 * dt * 4; kick = Math.max(0, kick - dt * 4); }
        const e = 0.5 + 0.5 * Math.sin(t * 0.18), env = U.smooth(U.clamp((e - 0.05) / 0.25));
        const s = skewMax * env * (0.35 + 0.65 * Math.max(0, Math.sin(t * 0.18)) ** 2) + skewMax * kick * 0.8, ro = Math.round(t * roll * Math.max(0, Math.sin(t * 0.11 + 1)) + jolt);
        for (let y = 0; y < n; y++) {
          const yy = ((y + ro) % (n + 6) + n + 6) % (n + 6);
          const blank = yy >= n, off = Math.round(y * s + t * 0.5 * s * 10);
          for (let x = 0; x < n; x++) {
            const xx = ((x + off) % (n + 4) + n + 4) % (n + 4);
            d[y * n + x] = blank || xx >= n ? (xx >= n && xx < n + 2 && !blank ? X.rgb(40, 40, 40) : BLACK) : img[yy * n + xx];
          }
        }
      };
    },
  });

  add({
    name: 'Tracking', sizes: [80, 100], fps: 12,
    listens: 'The louder the room, the worse the tracking.',
    recipe: 'A worn tape on PLAY: colour bleeds to the right of every edge, a band of tracking noise crawls up the screen tearing the rows it crosses, and the counter keeps time in the corner.',
    make(R, U, g) {
      const { n, d } = g, sc = sceneT(R, n, g), img = new Uint32Array(n * n), speed = R.range(2, 5), bandH = R.range(0.06, 0.12) * n, bleed = R.pick([3, 4, 6]);
      g.trait('Band', bandH / n < 0.09 ? 'Thin' : 'Wide'); g.trait('Bleed', bleed === 3 ? 'Light' : bleed === 4 ? 'Medium' : 'Heavy');
      let loud = 0;
      return (t, dt, f) => {
        sc.draw(t, img);
        loud += ((g.input.listening ? Math.min(1, g.input.level * 1.4) : 0) - loud) * Math.min(1, dt * 5);
        const bh = bandH * (1 + 2.2 * loud), by = n - ((t * speed) % (n + bandH * 2)) + bandH;
        for (let y = 0; y < n; y++) {
          const dist = Math.abs(y - by), inBand = dist < bh, tear = inBand ? Math.round((1 - dist / bh) * 4 * (1 + 2 * loud) * Math.sin(y * 0.7 + t * 3)) : 0;
          let cr = 0, cg = 0, cb = 0;
          for (let x = 0; x < n; x++) {
            const v = img[y * n + Math.max(0, Math.min(n - 1, x - tear))], r = v & 255, gg = v >> 8 & 255, b = v >> 16 & 255, l = 0.3 * r + 0.59 * gg + 0.11 * b;
            cr += (r - l - cr) / bleed; cg += (gg - l - cg) / bleed; cb += (b - l - cb) / bleed;
            let o = X.rgb(l + cr, l + cg, l + cb);
            if (inBand && ((x * 7 + y * 13 + f * 5) % 23) < 3 * (1 - dist / bh)) o = X.rgb(230, 230, 230);
            d[y * n + x] = o;
          }
        }
        const s = Math.floor(t), tc = `${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
        X.text(g, 'PLAY', 4, 4, WHITE); X.text(g, tc, n - X.textWidth(tc) - 4, n - 11, WHITE);
      };
    },
  });

  add({
    name: 'Wrong Stride', sizes: [80, 100, 200], fps: 10,
    recipe: 'The picture read back with the wrong row width, the classic decoding mistake: each row starts a few cells early or late, so it shears into repeating diagonal ribbons. The error drifts through zero and the picture is briefly whole.',
    make(R, U, g) {
      const { n, d } = g, sc = scene(R, n), img = new Uint32Array(n * n), amp = R.range(2, 6), rate = R.range(0.1, 0.18);
      return t => {
        sc.draw(t * 0.3, img);
        const delta = Math.round(amp * Math.sin(t * rate)), stride = n + delta, N = n * n;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = img[((y * stride + x) % N + N) % N];
      };
    },
  });

  add({
    name: 'Subpixels', seed: 1, sizes: [100, 200], fps: 10,
    recipe: 'A tiny screen under a magnifier: every pixel is three stripes of red, green and blue light with dark gaps between, a handful are stuck or dead, and the little landscape on it moves as normal.',
    make(R, U, g) {
      const { n, d } = g, w = Math.floor(n / 3), h = w, sc = sceneT(R, w, g), img = new Uint32Array(w * w), stuck = new Map();
      for (let k = 0; k < R.int(2, 5); k++) stuck.set(R.int(0, w * w - 1), R.pick([0, 1, 2, 3]));
      // the same picture as ever, without allocating per cell: a gamma table and a flat stuck-pixel map
      const GAM = Float32Array.from({ length: 256 }, (_, c) => 255 * Math.pow(c / 255, 0.55)), stuckA = new Int8Array(w * w).fill(-1), ch = new Float32Array(3);
      for (const [i, v] of stuck) stuckA[i] = v;
      const slot = g.trait('Mask', roll(g, ['Aperture grille', 'Slot mask'], [2, 1])) === 'Slot mask';
      g.trait('Dead pixels', stuck.size);
      return t => {
        sc.draw(t * 2, img);
        d.fill(X.rgb(6, 6, 8));
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const v = img[Math.floor(y * w / h) * w + x], s = stuckA[y * w + x];
          ch[0] = GAM[v & 255]; ch[1] = GAM[v >> 8 & 255]; ch[2] = GAM[v >> 16 & 255];
          if (s >= 0) { if (s === 3) ch.fill(0); else { ch[s] = 255; } }
          for (let k = 0; k < 3; k++) {
            const lo = (ch[0] + ch[1] + ch[2]) / 3 * 0.6, c = k === 0 ? X.rgb(ch[0], lo, lo * 0.8) : k === 1 ? X.rgb(lo, ch[1], lo * 0.8) : X.rgb(lo * 0.8, lo, ch[2]);
            if (slot) { X.rect(g, x * 3 + k, y * 3 + (x & 1), 1, 2, X.shade(c, 1.2)); continue; }   // staggered slots with a dark gap
            X.rect(g, x * 3 + k, y * 3, 1, 3, c);
            if (k === 2 && (y & 1)) X.put(g, x * 3 + k, y * 3 + 2, X.shade(c, 0.6));
          }
        }
      };
    },
  });

  add({
    name: 'Censor', seed: 3, sizes: [100, 200], fps: 10,
    recipe: 'Mosaic censor squares of different coarseness drift across the picture; under each, the scene is averaged into big blocks, and where two overlap the coarser one wins.',
    make(R, U, g) {
      const { n, d } = g, sc = scene(R, n), img = new Uint32Array(n * n), boxes = Array.from({ length: R.int(2, 3) }, () => ({ x: R.range(0, n), y: R.range(0, n), w: R.range(0.4, 0.6) * n, h: R.range(0.3, 0.5) * n, b: R.pick([n / 10, n / 10, n / 5].filter(b => n % b === 0)), vx: R.range(-1, 1) * n * 0.02, vy: R.range(-1, 1) * n * 0.012 }));
      boxes.sort((a, b) => a.b - b.b);
      return t => {
        sc.draw(t, img); d.set(img);
        for (const bx of boxes) {
          const x0 = ((bx.x + t * bx.vx) % (n + bx.w) + n + bx.w) % (n + bx.w) - bx.w, y0 = ((bx.y + t * bx.vy) % (n + bx.h) + n + bx.h) % (n + bx.h) - bx.h, B = bx.b;
          for (let by = Math.floor(y0 / B) * B; by < y0 + bx.h; by += B) for (let bxx = Math.floor(x0 / B) * B; bxx < x0 + bx.w; bxx += B) {
            if (by < 0 || bxx < 0 || by >= n || bxx >= n) continue;
            let r = 0, gg = 0, b = 0, c = 0;
            for (let y = by; y < Math.min(n, by + B); y++) for (let x = bxx; x < Math.min(n, bxx + B); x++) { const v = img[y * n + x]; r += v & 255; gg += v >> 8 & 255; b += v >> 16 & 255; c++; }
            X.rect(g, bxx, by, B, B, X.rgb(r / c, gg / c, b / c));
            X.rect(g, bxx, by, B, 1, X.rgb(r / c * 0.8, gg / c * 0.8, b / c * 0.8)); X.rect(g, bxx, by, 1, B, X.rgb(r / c * 0.8, gg / c * 0.8, b / c * 0.8));
          }
        }
      };
    },
  });

  add({
    name: 'Misregistration', sizes: [80, 100, 200], fps: 12,
    listens: 'Sound shakes the three plates further apart.',
    recipe: 'The red, green and blue plates of the picture each drift on their own slow loop, so edges split into coloured fringes and the plates only come back into register now and then, where they add up to the true picture.',
    make(R, U, g) {
      const { n, d } = g, sc = sceneT(R, n, g), img = new Uint32Array(n * n), amp = R.range(2, 5) * n / 100, ws = [0, 1, 2].map(() => [R.range(0.15, 0.35), R.range(0.15, 0.35), R.range(0, TAU)]);
      const ox = new Int32Array(3), oy = new Int32Array(3), print = g.trait('Process', roll(g, ['Screen', 'Print'], [2, 1])) === 'Print';
      g.trait('Drift', amp / n * 100 < 3.5 ? 'Slight' : 'Wide');
      let loud = 0;
      return (t, dt) => {
        sc.draw(t * 0.5, img);
        loud += ((g.input.listening ? Math.min(1, g.input.level * 1.5) : 0) - loud) * Math.min(1, dt * 6);
        const a2 = amp * (1 + 2.5 * loud);
        for (let k = 0; k < 3; k++) { const [a, b, p] = ws[k]; ox[k] = Math.round(Math.sin(t * a + p) * a2); oy[k] = Math.round(Math.cos(t * b + p * 2) * a2); }
        // each plate read from its own offset (no allocations per cell)
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let v = 0xff000000;
          if (print) {   // ink on paper: each plate screened to three tones, white paper where a plate has slid off
            for (let k = 0; k < 3; k++) { const xx = x - ox[k], yy = y - oy[k]; let cv = xx >= 0 && yy >= 0 && xx < n && yy < n ? (img[yy * n + xx] >> (k * 8)) & 255 : 255; cv = Math.min(2, Math.floor(cv / 255 * 2 + X.dith4(x + k, y + 2 * k))) * 127.5; v |= (cv | 0) << (k * 8); }
          } else
          for (let k = 0; k < 3; k++) { const xx = x - ox[k], yy = y - oy[k]; if (xx >= 0 && yy >= 0 && xx < n && yy < n) v |= img[yy * n + xx] & (255 << (k * 8)); }
          d[y * n + x] = v >>> 0;
        }
      };
    },
  });

  add({
    name: 'Bit Rot', sizes: [80, 100], fps: 10,
    listens: 'Clap and fresh bad cells start to rot.',
    recipe: 'The picture held in failing memory: corrupted words spread from a few bad cells along the rows, each flipping a bit of the colour index so runs of wrong palette colours creep across the image, until a clean copy is written back.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, sc = sceneT(R, n, g), img = new Uint32Array(N), rot = new Uint8Array(N), word = R.pick([4, 6, 8]), pal = [...new Set(sc.cols.map(U.pk))];
      const extra = sc.cols.map(c => U.pk(U.mix(c, [255, 255, 255], 0.4))).concat(sc.cols.map(c => U.pk(U.mix(c, [0, 0, 0], 0.6)))), all = pal.concat(extra);
      const cycle = R.range(16, 22);
      g.trait('Word', word + ' cells'); const st = g.trait('Spread', roll(g, ['Along rows', 'Down columns'], [2, 1])) === 'Down columns' ? n : 1;
      let last = -1;
      return (t, dt) => {
        const c = Math.floor(t / cycle);
        if (c !== last) { rot.fill(0); for (let k = 0; k < R.int(3, 7); k++) rot[R.int(0, N - 1)] = R.int(1, 7); last = c; }
        if (g.input.listening) for (let b = Math.min(3, g.input.beats()); b > 0; b--) for (let q = 0; q < 2; q++) rot[Math.floor(g.alt() * N)] = 1 + Math.floor(g.alt() * 7);
        sc.draw(t * 0.5, img);
        // spread: a corrupt word infects its neighbours along the row and, rarely, the row below
        for (let k = 0; k < N / 40; k++) {
          const i = R.int(0, N - 1);
          if (!rot[i]) continue;
          const j = R.bool(0.85) ? i + R.pick([-word, word]) * st : i + (st === 1 ? n : 1);
          if (j >= 0 && j < N && !rot[j]) for (let q = 0; q < word && j + q * st < N; q++) rot[j + q * st] = rot[i];
        }
        for (let i = 0; i < N; i++) {
          if (!rot[i]) { d[i] = img[i]; continue; }
          const v = img[i]; let idx = 0, best = 1e9;
          for (let k = 0; k < all.length; k++) { const dd = Math.abs((all[k] & 255) - (v & 255)) + Math.abs((all[k] >> 8 & 255) - (v >> 8 & 255)) + Math.abs((all[k] >> 16 & 255) - (v >> 16 & 255)); if (dd < best) { best = dd; idx = k; } }
          d[i] = all[(idx ^ rot[i]) % all.length];
        }
      };
    },
  });
})();
