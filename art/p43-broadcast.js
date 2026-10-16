// Set 5 · Broadcast: signals arriving. Test cards, teletext, slow-scan pictures,
// satellite swaths, constellations and eye diagrams, all built line by line or
// symbol by symbol on the cell grid, the way a receiver would build them.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Broadcast' }, def));
  const WORDS = ['PRISM', 'HUE', 'ECHO', 'VOID', 'DEEP', 'NEON', 'DAWN', 'NOON', 'CALM', 'VIVID', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'AXON', 'BLOOM', 'PULSE', 'HALO', 'IRIS', 'RIPPLE', 'TREBLE', 'BASS', 'STATIC', 'COMET', 'SYNAE'];
  const mod = (a, m) => ((a % m) + m) % m;
  // ---- trait names: words for the colours a variation already rolled (no new draws) ----
  const HUES = ['Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Jade', 'Teal', 'Cyan', 'Azure', 'Blue', 'Indigo', 'Violet', 'Purple', 'Magenta', 'Rose'];
  const hueWord = c => {
    const [r, gg, b] = typeof c === 'number' ? [c & 255, c >> 8 & 255, c >> 16 & 255] : c, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), dd = mx - mn;
    if (dd < 0.2 * mx || mx < 40) return mx > 190 ? 'White' : mx < 70 ? 'Black' : 'Grey';
    let h = mx === r ? (gg - b) / dd : mx === gg ? 2 + (b - r) / dd : 4 + (r - gg) / dd; h = (h / 6 + 1) % 1;
    return HUES[Math.round(h * 16) % 16];
  };
  const palName = cols => {
    const pk = cols.map(c => typeof c === 'number' ? c >>> 0 : U.pk(c));
    for (const p of U.PALETTES) if (p.cols.length === pk.length && p.cols.every(c => pk.includes(U.pk(c)))) return p.name;
    const words = [...new Set(pk.map(hueWord).filter(w => w !== 'Black'))];
    return words.length >= 7 ? 'Rainbow' : words.length >= 4 ? words[0] + ' to ' + words[words.length - 1] : words.length ? words.slice(0, 2).join(' and ') : 'Black';
  };
  const schemeName = sc => sc.native ? palName(sc.cols) : sc.name;
  // a cheap repeatable hash of three integers into 0..1
  const hash3 = (x, y, z) => { let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 2147483647) | 0; h = Math.imul(h ^ h >>> 13, 1274126177); return ((h ^ h >>> 16) >>> 0) / 4294967296; };
  // Listen for a receiver: the room's loudness as channel noise (0 while nobody listens),
  // with a sharp burst on every clap or beat that dies away in a fraction of a second
  function roomNoise(inp) {
    let lvl = 0, burst = 0, last = 0;
    return t => {
      const dt = Math.max(0, t - last); last = t;
      if (!inp.listening) { lvl = 0; burst = 0; return 0; }
      lvl += (inp.level - lvl) * Math.min(1, dt * 6);
      const b = inp.beats(); if (b) burst = Math.min(1.5, burst + 0.8 * b);
      burst *= Math.pow(0.02, dt);
      return lvl * 0.8 + burst;
    };
  }
  // a glowing heat buffer to the grid, then faded for the next frame (dark cells take the fast way)
  const glowOut = (heat, d, N) => {
    const a = heat[0], b = heat[1], c = heat[2];
    for (let i = 0; i < N; i++) {
      const r = a[i], gg = b[i], bl = c[i];
      if (r + gg + bl < 0.06) { if (r || gg || bl) { a[i] = 0; b[i] = 0; c[i] = 0; } d[i] = BLACK; continue; }
      d[i] = 0xff000000 | (bl > 255 ? 255 : bl) << 16 | (gg > 255 ? 255 : gg) << 8 | (r > 255 ? 255 : r);
      a[i] = r * 0.84; b[i] = gg * 0.84; c[i] = bl * 0.84;
    }
  };
  // a scope's persistence to the grid, then faded for the next frame
  const burnOut = (H, d, N, lut, keep = 0.95) => {
    const z = lut[0], gain = keep === 0.95 ? 26 : 26 * (1 - keep) / 0.05, top = keep === 0.95 ? 9.8 : 255 / gain;   // a longer hold piles up more, so it is scaled to the same brightness
    for (let i = 0; i < N; i++) {
      const h = H[i];
      if (h < 0.002) { if (h) H[i] = 0; d[i] = z; continue; }
      d[i] = lut[h > top ? 255 : h * gain | 0]; H[i] = h * keep;
    }
  };
  // a slow, smooth field f(x, y) filled into F (n x n): sampled every other cell and
  // filled in between (it is smooth at this scale, so the steps it is cut into don't change)
  const SF = new Float32Array(101 * 101);
  function smoothField(F, n, f) {
    const m = (n >> 1) + 1;
    for (let j = 0; j < m; j++) for (let i = 0; i < m; i++) SF[j * m + i] = f(i * 2, j * 2);
    for (let y = 0; y < n; y++) {
      const j = y >> 1, v = (y & 1) * 0.5, r0 = j * m, r1 = Math.min(m - 1, j + 1) * m;
      for (let x = 0; x < n; x++) {
        const i = x >> 1, u = (x & 1) * 0.5, i1 = Math.min(m - 1, i + 1);
        F[y * n + x] = (SF[r0 + i] * (1 - u) + SF[r0 + i1] * u) * (1 - v) + (SF[r1 + i] * (1 - u) + SF[r1 + i1] * u) * v;
      }
    }
  }
  // the sixteen fringe colours of a few machines (the window of four bits -> a colour)
  const machinePal = name => {
    const hexes = {
      Apple: ['#000000', '#93177e', '#2e2fbf', '#c834f5', '#00763f', '#808080', '#3297ff', '#a2a8ff', '#625100', '#f8701c', '#808080', '#ffa0d0', '#45d72b', '#d1e24d', '#6af7a7', '#ffffff'],
      Composite: ['#000000', '#00765e', '#3a2bd9', '#0d8cf2', '#a5246e', '#777777', '#e33fe0', '#a99bfb', '#3d5a00', '#13c94a', '#777777', '#4ff2d3', '#e3611f', '#c2d12e', '#ff9ac9', '#ffffff'],
      Pastel: ['#1b1626', '#b56f9c', '#6f73c9', '#c59be6', '#5c9c7c', '#9a96a6', '#79b4e6', '#c4c8f2', '#9c8a55', '#e8a07a', '#9a96a6', '#f2c2d8', '#9fd18a', '#e6e29c', '#a8ecd0', '#fbf6ee'],
    }[name];
    if (hexes) return hexes.map(s => U.pk(U.hex(s)));
    // a one-colour screen: brightness by how many of the four bits are lit, the odd ones a touch brighter
    const base = name === 'Amber' ? [255, 176, 48] : [96, 255, 128];
    return Array.from({ length: 16 }, (_, w) => { const k = ((w & 1) + (w >> 1 & 1) + (w >> 2 & 1) + (w >> 3 & 1)) / 4; return U.pk(U.mix([0, 0, 0], base, k * (0.82 + 0.18 * (w & 1)))); });
  };
  // the sea for a map: deep water, then two shelves toward the coast, in the scheme's darkest colour
  const waters = sc => { let c = sc.cols[0]; for (const k of sc.cols) if (k[0] + k[1] + k[2] < c[0] + c[1] + c[2]) c = k; const m = U.mix([16, 42, 96], c, 0.22), l = (m[0] + m[1] + m[2]) / 3 || 1; return [0.32, 0.46, 0.64].map(k => U.pk(m.map(v => v * k * 70 / l))); };
  const TT = [[0, 0, 0], [255, 40, 40], [40, 230, 40], [255, 240, 40], [40, 60, 255], [255, 40, 255], [40, 240, 255], [255, 255, 255]].map(U.pk);
  // the originals' remainder field, as a hue 0..100 (or -1 for a void)
  const field = (R, voidShare = 0.6) => {
    const a = R.range(0.3, 1.1), yd = R.pick([1, 2, 3]), k = R.range(1, 3.5), tt = R.range(2, 9), h0 = R.range(0, 100), voids = R.bool(voidShare);
    return (x, y, dt = 0) => { const h = mod(h0 + Math.log(mod((tt + dt) * a * x, y / yd + 1) + 1) * k * 12, 100); return voids && h > 93 ? -1 : h; };
  };

  add({
    name: 'Test Card', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'A test card fading in and out of reception: colour bars, a grey ramp and frequency gratings under a ringed crosshair. As the signal weakens the colour drains, snow rises, a ghost slides in beside the picture and the lines start to wave; then the station locks back in.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, card = new Uint32Array(N), word = R.pick(WORDS), bars = [[235, 235, 235], [235, 235, 40], [40, 235, 235], [40, 235, 40], [235, 40, 235], [235, 40, 40], [40, 40, 235], [16, 16, 16]];
      const order = R.bool(0.5) ? bars : bars.slice().reverse(), c = n / 2, rad = n * 0.42, grid = Math.round(n / 10);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let col;
        if (y < n * 0.58) col = order[Math.floor(x * 8 / n)];
        else if (y < n * 0.7) { const v = Math.floor(x * 6 / n) * 255 / 5; col = [v, v, v]; }
        else { const blk = Math.floor(x * 5 / n), per = [8, 5, 3, 2, 1][blk] * n / 100; col = Math.floor(x / Math.max(1, per)) % 2 ? [230, 230, 230] : [20, 20, 20]; }
        const dd = Math.hypot(x + 0.5 - c, y + 0.5 - c);
        if (Math.abs(dd - rad) < 0.8 * n / 100 + 0.3 || ((x === Math.floor(c) || y === Math.floor(c)) && dd < rad)) col = [255, 255, 255];
        else if (dd > rad && (x % grid === 0 || y % grid === 0)) col = [200, 200, 200];
        else if (dd > rad) col = U.mix(col, [60, 60, 70], 0.75);
        card[y * n + x] = U.pk(col);
      }
      const s = Math.max(1, Math.round(n / 50)), w = X.textWidth(word, s);
      const tg = { n, d: card };
      X.rect(tg, c - w / 2 - 2 * s, c - 6 * s, w + 4 * s, 11 * s, BLACK); X.text(tg, word, c - w / 2, c - 3.5 * s, WHITE, s);
      const snowGrain = n >= 200 ? 2 : 1;
      return (t, dt, f) => {
        const sig = U.clamp(0.55 + 0.75 * Math.sin(t * 0.16) + 0.2 * Math.sin(t * 0.47 + 1)), lo = 1 - sig, ghost = Math.round(n * 0.06 * lo), fr = f >> 1;
        for (let y = 0; y < n; y++) {
          const wob = Math.round(lo * lo * n * 0.05 * Math.sin(y * 0.21 + t * 2.3));
          for (let x = 0; x < n; x++) {
            const xs = mod(x - wob, n), v = card[y * n + xs], gv = ghost ? card[y * n + mod(xs - ghost, n)] : v;
            let r = (v & 255) * (1 - 0.35 * lo) + (gv & 255) * 0.35 * lo, gg = (v >> 8 & 255) * (1 - 0.35 * lo) + (gv >> 8 & 255) * 0.35 * lo, b = (v >> 16 & 255) * (1 - 0.35 * lo) + (gv >> 16 & 255) * 0.35 * lo;
            const luma = 0.3 * r + 0.59 * gg + 0.11 * b, kill = U.clamp(lo * 1.6);
            r += (luma - r) * kill; gg += (luma - gg) * kill; b += (luma - b) * kill;
            const sn = hash3(x / snowGrain | 0, y / snowGrain | 0, fr) * 255, m = U.clamp(lo * lo * 1.3);
            d[y * n + x] = X.rgb(r + (sn - r) * m, gg + (sn - gg) * m, b + (sn - b) * m);
          }
        }
      };
    },
  });

  add({
    name: 'Teletext', seed: 2, sizes: [200], fps: 10,
    interactive: 'Click to call up the next page.',
    recipe: 'Pages of teletext arriving row by row in its eight hard colours: a header with the page number and clock, a double-height title from the collection, a picture built of two-by-three mosaic blocks from the originals’ remainder field, and the coloured index keys at the foot.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, cw = 6, ch = 8, cols = 33, rows = 25;
        let page = 400 + R.int(1, 99), start = -R.range(3, 6), fld = field(R, 0.7), title = R.pick(WORDS), keys = R.shuffle(WORDS.slice()).slice(0, 4), bandC = R.int(1, 6), tick = R.shuffle(WORDS.slice()).join(' ');
        g.trait('Picture', 'Remainder field'); g.trait('Title', title); g.trait('Rule', ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'][bandC]); g.trait('Page', 'P' + page);
        const nextPage = (t, Q = R) => { page = page >= 899 ? 400 : page + Q.int(1, 7); start = t; fld = field(Q, 0.7); title = Q.pick(WORDS); keys = Q.shuffle(WORDS.slice()).slice(0, 4); bandC = Q.int(1, 6); };
        const cell = (cx, cy, chr, fg, bg, dbl = 0) => {
          const rws = X.FONT[chr] || X.FONT[' '];
          for (let y = 0; y < ch; y++) {
            const Y = cy * ch + y; if (Y >= n) return;
            const fy = dbl ? Math.floor((y + (dbl - 1) * ch) / 2) - 1 : y - 1;
            for (let x = 0; x < cw; x++) {
              const Xp = cx * cw + x; if (Xp >= n) break;
              const on = fy >= 0 && fy < 7 && x < 5 && (rws[fy] >> (4 - x) & 1);
              d[Y * n + Xp] = on ? fg : bg;
            }
          }
        };
        const textRow = (cy, str, fg, bg, dbl) => { for (let k = 0; k < cols; k++) cell(k, cy, str[k] || ' ', fg, bg, dbl); };
        return t => {
          if (t - start > 22) nextPage(t);
          else if (g.input.taps().length && t - start > 1) nextPage(t, g.alt);
          d.fill(BLACK);
          const shown = Math.floor((t - start) / 0.16), clock = new Date(Date.UTC(2000, 0, 1, 0, 0, 0) + (36000 + t) * 1000).toISOString().slice(11, 19);
          textRow(0, ('P' + page + ' SYNAE ' + clock).padStart(cols), TT[7], BLACK);
          if (shown < 1) return;
          const ttl = (' ' + title).padEnd(cols);
          for (const dbl of [1, 2]) { if (shown < dbl + 1) break; for (let k = 0; k < cols; k++) cell(k, dbl, ttl[k], TT[3], TT[4], dbl); }
          // the mosaic picture: each cell is 2 x 3 blocks in one colour
          const top = 4, bottom = 21, drift = Math.floor(t / 2) * 0.08;
          for (let cy = top; cy < bottom && cy < shown + 1; cy++) for (let cx = 0; cx < cols; cx++) {
            let fg = 0; const on = [];
            for (let j = 0; j < 6; j++) { const sx = cx * 2 + (j & 1), sy = (cy - top) * 3 + (j >> 1), h = fld(sx * 0.8, sy * 0.8, drift); const c = h < 0 ? 0 : 1 + Math.floor(h / 100 * 7) % 7; on.push(c); if (c && !fg) fg = c; }
            for (let j = 0; j < 6; j++) if (on[j]) { const x0 = cx * cw + (j & 1) * 3, y0 = cy * ch + [0, 3, 6][j >> 1]; X.rect(g, x0, y0, 3, (j >> 1) === 2 ? 2 : 3, TT[fg]); }
          }
          if (shown > 21) { const off = Math.floor(t * 3) % tick.length; textRow(22, (tick + ' ' + tick).slice(off, off + cols), TT[6], BLACK); }
          if (shown > 23) { const kc = [1, 2, 3, 6]; for (let k = 0; k < 4; k++) { const s = (' ' + keys[k]).padEnd(8).slice(0, 8); for (let j = 0; j < 8; j++) cell(k * 8 + j, 24, s[j], BLACK, TT[kc[k]]); } }
          if (shown > 2 && shown < 25) X.rect(g, 0, (shown + 1) * ch - 1, n, 1, TT[bandC]);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, cw = 6, ch = 8, cols = 33, rows = 25;
      const nz = U.noise(R).n2;
      let lastKind = '';
      const picture = () => {
        const kind = lastKind = R.pick(['field', 'field', 'rings', 'map', 'stripes']), cx = R.range(10, 56), cy = R.range(10, 40), k = R.range(3, 8), sl = R.range(-1, 1), lv = R.range(-0.2, 0.2);
        if (kind === 'rings') return (x, y, dt) => { const r = Math.hypot(x - cx, y - cy) / k + dt * 2; return (r | 0) % 4 === 3 ? -1 : (r * 14) % 100; };
        if (kind === 'map') return (x, y, dt) => { const v = nz(x * 0.05 + dt, y * 0.07); return v < lv ? -1 : (v - lv) * 120 % 100; };
        if (kind === 'stripes') return (x, y, dt) => { const v = (x + y * sl) / k + dt * 3; return (v | 0) % 5 === 4 ? -1 : ((v | 0) * 15) % 100; };
        return field(R, 0.7);
      };
      let page = 400 + R.int(1, 99), start = -R.range(3, 6), fld = picture(), title = R.pick(WORDS), keys = R.shuffle(WORDS.slice()).slice(0, 4), bandC = R.int(1, 6), tick = R.shuffle(WORDS.slice()).join(' ');
      g.trait('Picture', { field: 'Remainder field', rings: 'Rings', map: 'Map', stripes: 'Stripes' }[lastKind]); g.trait('Title', title); g.trait('Rule', ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'][bandC]); g.trait('Page', 'P' + page);
      const nextPage = t => { page = page >= 899 ? 400 : page + R.int(1, 7); start = t; fld = picture(); title = R.pick(WORDS); keys = R.shuffle(WORDS.slice()).slice(0, 4); bandC = R.int(1, 6); };
      const cell = (cx, cy, chr, fg, bg, dbl = 0) => {
        const rws = X.FONT[chr] || X.FONT[' '];
        for (let y = 0; y < ch; y++) {
          const Y = cy * ch + y; if (Y >= n) return;
          const fy = dbl ? Math.floor((y + (dbl - 1) * ch) / 2) - 1 : y - 1;
          for (let x = 0; x < cw; x++) {
            const Xp = cx * cw + x; if (Xp >= n) break;
            const on = fy >= 0 && fy < 7 && x < 5 && (rws[fy] >> (4 - x) & 1);
            d[Y * n + Xp] = on ? fg : bg;
          }
        }
      };
      const textRow = (cy, str, fg, bg, dbl) => { for (let k = 0; k < cols; k++) cell(k, cy, str[k] || ' ', fg, bg, dbl); };
      const inp = g.input;
      return t => {
        if (t - start > 22 || (inp.taps().length && t - start > 1)) nextPage(t);
        d.fill(BLACK);
        const shown = Math.floor((t - start) / 0.16), clock = new Date(Date.UTC(2000, 0, 1, 0, 0, 0) + (36000 + t) * 1000).toISOString().slice(11, 19);
        textRow(0, ('P' + page + ' SYNAE ' + clock).padStart(cols), TT[7], BLACK);
        if (shown < 1) return;
        const ttl = (' ' + title).padEnd(cols);
        for (const dbl of [1, 2]) { if (shown < dbl + 1) break; for (let k = 0; k < cols; k++) cell(k, dbl, ttl[k], TT[3], TT[4], dbl); }
        // the mosaic picture: each cell is 2 x 3 blocks in one colour
        const top = 4, bottom = 21, drift = Math.floor(t / 2) * 0.08;
        for (let cy = top; cy < bottom && cy < shown + 1; cy++) for (let cx = 0; cx < cols; cx++) {
          let fg = 0; const on = [];
          for (let j = 0; j < 6; j++) { const sx = cx * 2 + (j & 1), sy = (cy - top) * 3 + (j >> 1), h = fld(sx * 0.8, sy * 0.8, drift); const c = h < 0 ? 0 : 1 + Math.floor(h / 100 * 7) % 7; on.push(c); if (c && !fg) fg = c; }
          for (let j = 0; j < 6; j++) if (on[j]) { const x0 = cx * cw + (j & 1) * 3, y0 = cy * ch + [0, 3, 6][j >> 1]; X.rect(g, x0, y0, 3, (j >> 1) === 2 ? 2 : 3, TT[fg]); }
        }
        if (shown > 21) { const off = Math.floor(t * 3) % tick.length; textRow(22, (tick + ' ' + tick).slice(off, off + cols), TT[6], BLACK); }
        if (shown > 23) { const kc = [1, 2, 3, 6]; for (let k = 0; k < 4; k++) { const s = (' ' + keys[k]).padEnd(8).slice(0, 8); for (let j = 0; j < 8; j++) cell(k * 8 + j, 24, s[j], BLACK, TT[kc[k]]); } }
        if (shown > 2 && shown < 25) X.rect(g, 0, (shown + 1) * ch - 1, n, 1, TT[bandC]);
      };
    },
  });

  add({
    name: 'Slow Scan', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Click to tune to the next picture.',
    recipe: 'A slow-scan television receiver at work: a picture arrives one line at a time from the top, each line scanned in green, blue and then red, under a station banner, with the tone of the signal drawn as a waterfall below. A small timing error slants the image, bursts of interference streak a few lines, and each new picture (a landscape, a planet, a test card, a word, the originals’ field) scans in over the last.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, top = 10, wf = Math.round(n * 0.13), ph = n - top - wf - 3, pw = n - 4, ox = 2, oy = top + 1;
      const img = new Uint32Array(pw * ph), shown = new Uint32Array(pw * ph).fill(X.rgb(8, 8, 10)), streak = new Float32Array(ph), W = new Uint32Array(pw * wf).fill(X.rgb(4, 6, 10));
      const panel = R.pick([X.rgb(26, 28, 34), X.rgb(14, 22, 18), X.rgb(30, 24, 18)]), text = R.pick([X.rgb(120, 255, 150), X.rgb(255, 196, 80), X.rgb(150, 210, 255)]), dim = X.shade(text, 0.5);
      const modes = ['M1', 'S1', 'R36', 'PD120', 'M2'], calls = ['CQ SYN4E', 'DE PR1SM', 'CQ HU3', 'DE 3CHO', 'QSL V0ID', 'CQ AX0N'];
      const kinds = R.shuffle(['land', 'planet', 'card', 'word', 'field', 'land']), wheel = U.scheme(R, 0.55);
      g.trait('Receiver', ['Slate', 'Forest', 'Umber'][[X.rgb(26, 28, 34), X.rgb(14, 22, 18), X.rgb(30, 24, 18)].indexOf(panel)]); g.trait('Screen text', ['Green', 'Amber', 'Ice'][[X.rgb(120, 255, 150), X.rgb(255, 196, 80), X.rgb(150, 210, 255)].indexOf(text)]); g.trait('First picture', { land: 'Landscape', planet: 'Planet', card: 'Test card', word: 'Word', field: 'Remainder field' }[kinds[0]]); g.trait('Grid', n);
      let line = 0, hold = 0, slant = 0, mode = '', call = '', pics = 0;
      const load = () => {
        const kind = kinds[pics++ % kinds.length], sc = U.scheme(R, 0.6), cols = sc.cols.map(U.pk), fld = field(R, 0.5), L = cols.length;
        const sunX = R.range(0.2, 0.8) * pw, sunY = R.range(0.2, 0.45) * ph, sunR = R.range(0.08, 0.16) * pw, hills = [R.range(0.55, 0.68), R.range(0.68, 0.8), R.range(0.8, 0.92)], fr = [R.range(2, 5), R.range(4, 8), R.range(6, 12)], pp = [R(), R(), R()];
        const pr = R.range(0.3, 0.42) * ph, pcx = pw * R.range(0.4, 0.6), pcy = ph * R.range(0.45, 0.55), band = R.range(3, 7), craters = Array.from({ length: R.int(4, 9) }, () => [R.range(-0.7, 0.7), R.range(-0.7, 0.7), R.range(0.06, 0.18)]), ringed = R.bool(0.4);
        const word = R.pick(WORDS.filter(w => w.length <= 6)), ws = Math.max(1, Math.floor(pw * 0.86 / (word.length * 6 - 1))), wx = (pw - (word.length * 6 - 1) * ws) >> 1, wy = (ph - 7 * ws) >> 1;
        const bars = [WHITE, X.rgb(235, 235, 40), X.rgb(40, 235, 235), X.rgb(40, 235, 40), X.rgb(235, 40, 235), X.rgb(235, 40, 40), X.rgb(40, 40, 235), BLACK];
        const ink = (lx, ly) => { const ch = word[Math.floor(lx / 6)], bx = lx - Math.floor(lx / 6) * 6; return lx >= 0 && ly >= 0 && ly < 7 && ch && bx < 5 && (X.FONT[ch][ly] >> (4 - bx) & 1); };
        for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
          let c;
          if (kind === 'land') {
            const dsun = Math.hypot(x - sunX, y - sunY);
            c = X.mixPk(cols[0], cols[L - 1], Math.floor(y / ph * 6 + X.dith4(x, y) * 0.9) / 6);
            if (dsun < sunR) c = X.mixPk(WHITE, cols[1 % L], dsun / sunR * 0.5);
            for (let k = 0; k < 3; k++) { const hy = hills[k] * ph + Math.sin(x / pw * Math.PI * fr[k] + pp[k] * 6) * ph * 0.05; if (y > hy) c = X.shade(cols[(k + 2) % L], 0.45 + k * 0.18); }
          } else if (kind === 'planet') {
            const dx = (x - pcx) / pr, dy = (y - pcy) / pr, rr = dx * dx + dy * dy;
            const st = hash3(x, y, 53);   // scattered stars (not a lattice), a few of them bright
            c = st < 0.012 ? (st < 0.003 ? WHITE : X.rgb(120, 124, 150)) : X.rgb(6, 6, 14);
            if (rr < 1) {
              const lit = U.clamp(0.25 + 0.9 * (-dx * 0.6 - dy * 0.4 + Math.sqrt(1 - rr) * 0.6));
              let base = cols[Math.floor((dy + 1) * band) % L];
              for (const [cx0, cy0, cr] of craters) if ((dx - cx0) ** 2 + (dy - cy0) ** 2 < cr * cr) base = X.shade(base, 0.7);
              c = X.shade(base, Math.floor(lit * 5 + X.dith4(x, y) * 0.9) / 5);
            }
            if (ringed) {
              // a tilted ring round the planet: in front of it on the near (lower) side, hidden behind it on the far side
              const u = dx * 0.98 + dy * 0.2, v = (dy * 0.98 - dx * 0.2) * 3.4, q = Math.sqrt(u * u + v * v);
              if (q > 1.28 && q < 1.68 && (v > 0 || rr > 1) && !(q > 1.47 && q < 1.52)) c = X.shade(X.mixPk(cols[0], WHITE, 0.45), q < 1.47 ? 1 : 0.78);
            }
          } else if (kind === 'card') {
            const v = Math.floor(x * 6 / pw) * 51;
            c = y < ph * 0.62 ? bars[Math.floor(x * 8 / pw)] : y < ph * 0.78 ? X.rgb(v, v, v) : (Math.floor(x / (1 + Math.floor(x * 4 / pw))) % 2 ? WHITE : BLACK);
            if (Math.abs(Math.hypot(x - pw / 2, y - ph * 0.42) - ph * 0.3) < 0.7) c = WHITE;
          } else if (kind === 'word') {
            const lx = Math.floor((x - wx) / ws), ly = Math.floor((y - wy) / ws);
            c = ink(lx, ly) ? WHITE : ink(lx - 1, ly - 1) ? BLACK : X.mixPk(cols[0], cols[L - 1], Math.floor((x + y) / (pw + ph) * 5 + X.dith4(x, y) * 0.9) / 5);
          } else { const h = fld(x * 100 / pw, y * 100 / pw + 20); c = h < 0 ? BLACK : sc.lut[(h * 2.56) | 0]; }
          img[y * pw + x] = c;
        }
        slant = R.range(-0.1, 0.1) * R.pick([0, 1, 1]); line = 0; hold = 0;
        mode = R.pick(modes); call = R.pick(calls);
        const noise = R.range(0.02, 0.1);
        for (let y = 0; y < ph; y++) streak[y] = R() < noise ? R.range(0.3, 0.9) : 0;
      };
      const src = (x, y) => img[y * pw + mod(x + Math.round(y * slant), pw)];
      const scanLine = y => { for (let x = 0; x < pw; x++) { let c = src(x, y); if (streak[y] && hash3(x, y, pics) < streak[y]) c = X.mixPk(c, WHITE, hash3(x, y, 9) * 0.8); shown[y * pw + x] = c; } };
      load();
      g.trait('Station', call); g.trait('Mode', mode);
      for (; line < ph * 0.4; line++) scanLine(line);
      const per = 11 / ph;   // seconds per line
      let acc = 0, tuned = -9;
      return (t, dt) => {
        if (inp.taps().length && t - tuned > 1) { load(); tuned = t; }   // one retune a second, however many taps arrive
        if (line >= ph) { hold += dt; if (hold > 3) load(); }
        else { acc += dt; while (acc > per && line < ph) { acc -= per; scanLine(line); line++; } }
        d.fill(panel);
        X.text(g, call, 2, 2, text);
        const st = mode;
        X.text(g, st, n - 1 - X.textWidth(st), 2, dim);
        // the picture; the line now arriving is drawn in green, then cyan, then in full
        X.rect(g, ox - 1, oy - 1, pw + 2, ph + 2, X.shade(text, 0.25));
        // below the line now arriving, the last picture still shows, dimmed, until it is scanned over
        for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) { const c = shown[y * pw + x]; d[(oy + y) * n + ox + x] = y < line ? c : X.shade(c, 0.45); }
        let tone = 0, sync = false;
        if (line < ph) {
          const u = acc / per, chan = Math.min(2, Math.floor(u * 3)), cut = Math.floor((u * 3 - chan) * pw);
          for (let x = 0; x < pw; x++) {
            const c = src(x, line), G0 = X.rgb(0, c >> 8 & 255, 0), GB = X.rgb(0, c >> 8 & 255, c >> 16 & 255);
            d[(oy + line) * n + ox + x] = chan === 0 ? (x < cut ? G0 : X.rgb(8, 8, 10)) : chan === 1 ? (x < cut ? GB : G0) : (x < cut ? c : GB);
          }
          const c = src(Math.min(pw - 1, cut), line);
          tone = (chan === 0 ? (c >> 8 & 255) : chan === 1 ? (c >> 16 & 255) : (c & 255)) / 255;
          sync = u < 0.06;
          X.rect(g, ox + Math.min(pw - 1, cut), oy + line, 1, 1, WHITE);
        }
        // the waterfall: the tone (1500 to 2300 Hz) across, time running down
        W.copyWithin(pw, 0, pw * (wf - 1));
        W.fill(X.rgb(4, 6, 10), 0, pw);
        const tx = sync ? Math.round(pw * 0.06) : Math.round(pw * (0.2 + 0.7 * tone));
        for (let k = -1; k <= 1; k++) { const xx = tx + k; if (xx >= 0 && xx < pw) W[xx] = k ? X.shade(wheel.lut[(tone * 255) | 0], 0.7) : WHITE; }
        for (let x = 0; x < pw; x++) if (hash3(x, line, Math.floor(t * 12)) < 0.05) W[x] = X.rgb(26, 34, 52);
        const wy = n - wf - 1;
        X.rect(g, 0, wy - 1, n, 1, X.shade(text, 0.25));
        for (let y = 0; y < wf; y++) for (let x = 0; x < pw; x++) d[(wy + y) * n + ox + x] = W[y * pw + x];
      };
    },
  });

  add({
    name: 'Swaths', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Click to start scanning the next season.',
    recipe: 'A colour map of an imaginary world assembled from satellite passes: slanted swaths sweep down the frame one after another, out of order as orbits are, each shaded a little darker at its edges. Gaps close until the map is whole, then the next season is scanned over it.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, nz = U.noise(R).n2, sc = U.scheme(R, 0.6), A = R.range(-0.5, 0.5) + Math.PI / 2, ca = Math.cos(A), sa = Math.sin(A), K = R.int(9, 14);
        const p = new Float32Array(N), q = new Float32Array(N), paint = new Float32Array(N).fill(-1), map = new Uint32Array(N);
        let pmin = Infinity, pmax = -Infinity, qmin = Infinity, qmax = -Infinity;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; q[i] = x * ca + y * sa; p[i] = -x * sa + y * ca; pmin = Math.min(pmin, p[i]); pmax = Math.max(pmax, p[i]); qmin = Math.min(qmin, q[i]); qmax = Math.max(qmax, q[i]); }
        const W = (pmax - pmin) / K, order = Array.from({ length: K }, (_, j) => (j * 5) % K), sea = R.range(-0.15, 0.1), bands = R.int(5, 9);
        g.trait('Palette', schemeName(sc)); g.trait('Passes', K); g.trait('Contours', bands); g.trait('Orbit', A < Math.PI / 2 - 0.2 ? 'Leaning left' : A > Math.PI / 2 + 0.2 ? 'Leaning right' : 'Upright'); g.trait('Land', sea < -0.06 ? 'Continents' : sea < 0.03 ? 'Islands' : 'Archipelago'); g.trait('Grid', n);
        let season = 0, pass = 0, front = qmin, hold = 0;
        const deep = waters(sc), build = () => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = nz(x * 2.5 / n + season * 3, y * 2.5 / n) * 0.7 + nz(x * 7 / n, y * 7 / n + season) * 0.3; map[y * n + x] = v < sea ? deep[v > sea - 0.05 ? 2 : v > sea - 0.14 ? 1 : 0] : sc.lut[(Math.floor((v - sea) / (1 - sea) * bands) / bands * 256 + season * 40) & 255]; } };
        build();
        const speed = (qmax - qmin) / 3.2;
        // open with a few passes already in
        for (; pass < Math.floor(K * 0.4); pass++) { const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04; for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi) paint[i] = map[i] === BLACK ? 0 : 1 - 0.3 * Math.pow(Math.abs((p[i] - lo) / W * 2 - 1), 2); }
        const cur = new Uint32Array(N).fill(BLACK);
        for (let i = 0; i < N; i++) if (paint[i] >= 0) cur[i] = X.shade(map[i], paint[i]);
        return (t, dt) => {
          if (g.input.taps().length) { hold = 99; pass = K; }
          if (pass >= K) { hold += dt; if (hold > 3) { season++; build(); pass = 0; front = qmin; hold = 0; } }
          else {
            front += speed * dt;
            const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04;
            for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi && q[i] <= front && q[i] > front - speed * dt * 1.5 - 1) cur[i] = X.shade(map[i], 1 - 0.3 * Math.pow(Math.abs((p[i] - lo) / W * 2 - 1), 2));
            if (front > qmax) { pass++; front = qmin; }
          }
          d.set(cur);
          if (pass < K) { const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04; for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi && Math.abs(q[i] - front) < 0.8) d[i] = WHITE; }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, N = n * n, nz = U.noise(R).n2, sc = U.scheme(R, 0.6), A = R.range(-0.5, 0.5) + Math.PI / 2, ca = Math.cos(A), sa = Math.sin(A), K = R.int(9, 14);
      const p = new Float32Array(N), q = new Float32Array(N), paint = new Float32Array(N).fill(-1), map = new Uint32Array(N);
      let pmin = Infinity, pmax = -Infinity, qmin = Infinity, qmax = -Infinity;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; q[i] = x * ca + y * sa; p[i] = -x * sa + y * ca; pmin = Math.min(pmin, p[i]); pmax = Math.max(pmax, p[i]); qmin = Math.min(qmin, q[i]); qmax = Math.max(qmax, q[i]); }
      const W = (pmax - pmin) / K, order = Array.from({ length: K }, (_, j) => (j * 5) % K), sea = R.range(-0.15, 0.1), bands = R.int(5, 9);
      g.trait('Palette', schemeName(sc)); g.trait('Passes', K); g.trait('Contours', bands); g.trait('Orbit', A < Math.PI / 2 - 0.2 ? 'Leaning left' : A > Math.PI / 2 + 0.2 ? 'Leaning right' : 'Upright'); g.trait('Land', sea < -0.06 ? 'Continents' : sea < 0.03 ? 'Islands' : 'Archipelago'); g.trait('Grid', n);
      let season = 0, pass = 0, front = qmin, hold = 0;
      const deep = waters(sc), build = () => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = nz(x * 2.5 / n + season * 3, y * 2.5 / n) * 0.7 + nz(x * 7 / n, y * 7 / n + season) * 0.3; map[y * n + x] = v < sea ? deep[v > sea - 0.05 ? 2 : v > sea - 0.14 ? 1 : 0] : sc.lut[(Math.floor((v - sea) / (1 - sea) * bands) / bands * 256 + season * 40) & 255]; } };
      build();
      const speed = (qmax - qmin) / 3.2;
      // open with a few passes already in
      for (; pass < Math.floor(K * 0.4); pass++) { const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04; for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi) paint[i] = map[i] === BLACK ? 0 : 1 - 0.3 * Math.pow(Math.abs((p[i] - lo) / W * 2 - 1), 2); }
      const cur = new Uint32Array(N).fill(BLACK);
      for (let i = 0; i < N; i++) if (paint[i] >= 0) cur[i] = X.shade(map[i], paint[i]);
      return (t, dt) => {
        if (g.input.taps().length) { hold = 99; pass = K; }
        if (pass >= K) { hold += dt; if (hold > 3) { season++; build(); pass = 0; front = qmin; hold = 0; } }
        else {
          front += speed * dt;
          const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04;
          for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi && q[i] <= front && q[i] > front - speed * dt * 1.5 - 1) cur[i] = X.shade(map[i], 1 - 0.3 * Math.pow(Math.abs((p[i] - lo) / W * 2 - 1), 2));
          if (front > qmax) { pass++; front = qmin; }
        }
        d.set(cur);
        if (pass < K) { const k = order[pass], lo = pmin + k * W, hi = lo + W * 1.04; for (let i = 0; i < N; i++) if (p[i] >= lo && p[i] < hi && Math.abs(q[i] - front) < 0.8) d[i] = WHITE; }
      };
    },
  });

  add({
    name: 'QAM', seed: 6, sizes: [100, 200], fps: 12,
    interactive: 'Move down to add noise, across to turn the carrier.',
    listens: 'The room is the channel: its noise blurs the clusters, a clap scatters them.',
    recipe: 'The constellation of a digital radio signal: every received symbol lands as a dot near one of a square grid of ideal points, coloured by which point it means. Noise swells and the clusters blur into each other, the carrier drifts and the whole grid turns, then the receiver locks and it snaps square again.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, M = R.pick([16, 16, 64]), side = Math.sqrt(M), sp = n * 0.84 / side, sc0 = U.scheme(R, 0.6), lut = sc0.lut, h0 = R.range(0, 256), heat = [new Float32Array(N), new Float32Array(N), new Float32Array(N)];
        const per = R.range(14, 22), S = n >= 200 ? 600 : 260, room = roomNoise(g.input);
        g.trait('Palette', schemeName(sc0)); g.trait('Constellation', M === 4 ? 'QPSK' : M + '-QAM'); g.trait('Drift', per < 18 ? 'Restless' : 'Slow'); g.trait('Grid', n);
        const fr = t => {
          const ph = t / per % 1, sigma = 0.04 + 0.22 * Math.pow(Math.max(0, Math.sin(ph * TAU)), 2), rot = ph < 0.6 ? Math.sin(ph / 0.6 * Math.PI) * 0.45 * Math.sin(t * 0.3) : 0;
          let sg = sigma, rt = rot;
          if (g.input.inside) { sg = 0.02 + g.input.y * 0.35; rt = (g.input.x - 0.5) * 1.6; }
          sg += room(t) * 0.3;
          const cr = Math.cos(rt), sr = Math.sin(rt);
          for (let k = 0; k < S; k++) {
            const i = R.int(0, side - 1), j = R.int(0, side - 1), ix = (i - (side - 1) / 2) * sp, iy = (j - (side - 1) / 2) * sp;
            const x = n / 2 + ix * cr - iy * sr + R.gauss() * sg * sp, y = n / 2 + ix * sr + iy * cr + R.gauss() * sg * sp, xi = x | 0, yi = y | 0;
            if (xi < 0 || yi < 0 || xi >= n || yi >= n) continue;
            const c = lut[(h0 + (i * side + j) / M * 256) & 255], q = yi * n + xi;
            heat[0][q] += (c & 255) * 0.5; heat[1][q] += (c >> 8 & 255) * 0.5; heat[2][q] += (c >> 16 & 255) * 0.5;
          }
          glowOut(heat, d, N);
          const ax = X.rgb(55, 55, 70);
          for (let k = 0; k < n; k++) { if (d[(n >> 1) * n + k] === BLACK) d[(n >> 1) * n + k] = ax; if (d[k * n + (n >> 1)] === BLACK) d[k * n + (n >> 1)] = ax; }
        };
        for (let k = 0; k < 10; k++) fr(k / 12);   // open on clusters already glowing
        return t => fr(t + 10 / 12);
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, N = n * n, M = R.pick([4, 16, 16, 64, 256]), side = Math.sqrt(M), sp = n * 0.84 / side, sc0 = U.scheme(R, 0.6), lut = sc0.lut, h0 = R.range(0, 256), heat = [new Float32Array(N), new Float32Array(N), new Float32Array(N)];
      const per = R.range(14, 22), S = n >= 200 ? 600 : 260, room = roomNoise(inp);
      g.trait('Palette', schemeName(sc0)); g.trait('Constellation', M === 4 ? 'QPSK' : M + '-QAM'); g.trait('Drift', per < 18 ? 'Restless' : 'Slow'); g.trait('Grid', n);
      const fr = t => {
        const ph = t / per % 1, sigma = 0.04 + 0.22 * Math.pow(Math.max(0, Math.sin(ph * TAU)), 2), rot = ph < 0.6 ? Math.sin(ph / 0.6 * Math.PI) * 0.45 * Math.sin(t * 0.3) : 0;
        let sg = sigma, rt = rot;
        if (inp.inside) { sg = 0.02 + inp.y * 0.35; rt = (inp.x - 0.5) * 1.6; }
        sg += room(t) * 0.3;
        const cr = Math.cos(rt), sr = Math.sin(rt);
        for (let k = 0; k < S; k++) {
          const i = R.int(0, side - 1), j = R.int(0, side - 1), ix = (i - (side - 1) / 2) * sp, iy = (j - (side - 1) / 2) * sp;
          const x = n / 2 + ix * cr - iy * sr + R.gauss() * sg * sp, y = n / 2 + ix * sr + iy * cr + R.gauss() * sg * sp, xi = x | 0, yi = y | 0;
          if (xi < 0 || yi < 0 || xi >= n || yi >= n) continue;
          const c = lut[(h0 + (i * side + j) / M * 256) & 255], q = yi * n + xi;
          heat[0][q] += (c & 255) * 0.5; heat[1][q] += (c >> 8 & 255) * 0.5; heat[2][q] += (c >> 16 & 255) * 0.5;
        }
        glowOut(heat, d, N);
        const ax = X.rgb(55, 55, 70);
        for (let k = 0; k < n; k++) { if (d[(n >> 1) * n + k] === BLACK) d[(n >> 1) * n + k] = ax; if (d[k * n + (n >> 1)] === BLACK) d[k * n + (n >> 1)] = ax; }
      };
      for (let k = 0; k < 10; k++) fr(k / 12);
      return t => fr(t + 10 / 12);
    },
  });

  add({
    name: 'Eye Diagram', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Move across to change the bandwidth, down to add noise.',
    listens: 'The room’s noise gets on the line: the eyes close as it gets louder.',
    recipe: 'Thousands of bit transitions laid over each other two bits wide, the way an oscilloscope checks a data link: where traces pile up the trace burns hot. As the link’s bandwidth, jitter and noise drift, the eyes between the levels open wide and squeeze nearly shut.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, H = new Float32Array(N), lv = R.pick([2, 2, 4]), sc = U.scheme(R, 0.5), lut = U.heat(sc.cols.slice(0, 4)), per = R.range(16, 26);
        const levels = Array.from({ length: lv }, (_, k) => n * (0.15 + 0.7 * k / (lv - 1))), room = roomNoise(g.input);
        g.trait('Palette', schemeName(sc)); g.trait('Signal', lv === 2 ? 'Binary' : 'PAM-' + lv); g.trait('Eyes across', 2); g.trait('Graticule', 'None'); g.trait('Persistence', 'Medium'); g.trait('Grid', n);
        const fr = t => {
          const inp = g.input, ph = t / per, rn = room(t), bw = inp.inside ? 0.05 + inp.x * 0.6 : 0.12 + 0.3 * (0.5 + 0.5 * Math.sin(ph * TAU)), noise = n * ((inp.inside ? 0.003 + inp.y * 0.04 : 0.006 + 0.02 * (0.5 + 0.5 * Math.sin(ph * TAU * 1.3 + 2))) + rn * 0.03), jit = 0.02 + 0.06 * (0.5 + 0.5 * Math.sin(ph * TAU * 0.7 + 4)) + rn * 0.08;
          for (let tr = 0; tr < (n >= 200 ? 22 : 14); tr++) {
            const sy = [0, 1, 2, 3].map(() => levels[R.int(0, lv - 1)]), j = R.gauss() * jit, nb = R.gauss() * noise * 0.6;
            let py = -1;
            for (let x = 0; x < n; x++) {
              const u = x / n * 2 + 0.5 + j, k = Math.floor(u), f = u - k, a = sy[k] ?? sy[3], b = sy[k + 1] ?? sy[3], e = U.smooth(U.clamp((f - 0.5) / bw + 0.5));
              const y = Math.round(a + (b - a) * e + nb + R.gauss() * noise * 0.25);
              if (py >= 0) { const y0 = Math.min(py, y), y1 = Math.max(py, y); for (let yy = Math.max(0, y0); yy <= Math.min(n - 1, y1); yy++) H[yy * n + x] += 0.6 / (1 + y1 - y0); }
              py = y;
            }
          }
          burnOut(H, d, N, lut);
        };
        for (let k = 0; k < 22; k++) fr(k / 12);   // open on a trace already burnt in
        return t => fr(t + 22 / 12);
      };
      if (g.home || g.alt() < 0.35) return og(R, U, g);   // the original look on 35% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, N = n * n, H = new Float32Array(N), lv = R.pick([2, 2, 3, 4]), sc = U.scheme(R, 0.5), per = R.range(16, 26);
      // new looks: how many eyes fit across, a scope graticule, the screen's phosphor and how long it holds a trace
      const ui = g.alt.pick([2, 2, 1, 3, 4]), grat = g.alt.pick(['None', 'None', 'Dots', 'Grid', 'Frame']), screen = g.alt.pick(['Palette', 'Palette', 'Palette', 'Green', 'Amber', 'White']);
      const keep = g.alt.pick([0.95, 0.95, 0.9, 0.975]), lift = g.alt.pick([1, 1, 0.75, 1.35]);
      const lut = screen === 'Palette' ? U.heat(sc.cols.slice(0, 4)) : U.heat({ Green: [[20, 120, 40], [80, 255, 120]], Amber: [[120, 60, 0], [255, 180, 40]], White: [[60, 70, 90], [210, 220, 240]] }[screen]);
      const levels = Array.from({ length: lv }, (_, k) => n * (0.5 + (0.35 * lift) * (2 * k / (lv - 1) - 1))), room = roomNoise(inp), sy = new Float32Array(ui + 2);
      g.trait('Palette', screen === 'Palette' ? schemeName(sc) : screen + ' phosphor'); g.trait('Signal', lv === 2 ? 'Binary' : 'PAM-' + lv); g.trait('Eyes across', ui);
      g.trait('Graticule', grat); g.trait('Persistence', { 0.9: 'Short', 0.95: 'Medium', 0.975: 'Long' }[keep]); g.trait('Opening', { 1: 'Normal', 0.75: 'Narrow', 1.35: 'Tall' }[lift]); g.trait('Grid', n);
      const gc = X.rgb(46, 52, 70), gstep = n / 10;
      const graticule = () => {
        if (grat === 'None') return;
        const z = lut[0];
        for (let k = 0; k <= 10; k++) {
          const p = Math.min(n - 1, Math.round(k * gstep));
          if (grat === 'Frame' && k > 0 && k < 10) continue;
          for (let q = 0; q < n; q++) {
            if (grat === 'Dots' && q % 2) continue;
            if (grat === 'Dots' && (q % Math.round(gstep / 2))) continue;
            if (d[p * n + q] === z) d[p * n + q] = gc;
            if (d[q * n + p] === z) d[q * n + p] = gc;
          }
        }
      };
      const fr = t => {
        const ph = t / per, rn = room(t), bw = inp.inside ? 0.05 + inp.x * 0.6 : 0.12 + 0.3 * (0.5 + 0.5 * Math.sin(ph * TAU)), noise = n * ((inp.inside ? 0.003 + inp.y * 0.04 : 0.006 + 0.02 * (0.5 + 0.5 * Math.sin(ph * TAU * 1.3 + 2))) + rn * 0.03), jit = 0.02 + 0.06 * (0.5 + 0.5 * Math.sin(ph * TAU * 0.7 + 4)) + rn * 0.08;
        for (let tr = 0; tr < (n >= 200 ? 22 : 14); tr++) {
          for (let q = 0; q < ui + 2; q++) sy[q] = levels[R.int(0, lv - 1)];
          const j = R.gauss() * jit, nb = R.gauss() * noise * 0.6, last = ui + 1;
          let py = -1;
          for (let x = 0; x < n; x++) {
            const u = x / n * ui + 0.5 + j, k = Math.floor(u), f = u - k, a = k >= 0 && k <= last ? sy[k] : sy[last], b = k + 1 >= 0 && k + 1 <= last ? sy[k + 1] : sy[last], e = U.smooth(U.clamp((f - 0.5) / bw + 0.5));
            const y = Math.round(a + (b - a) * e + nb + R.gauss() * noise * 0.25);
            if (py >= 0) { const y0 = Math.min(py, y), y1 = Math.max(py, y); for (let yy = Math.max(0, y0); yy <= Math.min(n - 1, y1); yy++) H[yy * n + x] += 0.6 / (1 + y1 - y0); }
            py = y;
          }
        }
        burnOut(H, d, N, lut, keep);
        graticule();
      };
      for (let k = 0; k < 22; k++) fr(k / 12);
      return t => fr(t + 22 / 12);
    },
  });

  add({
    name: 'Frames', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'A data link drawn one frame per row: preamble stripes, address and length fields, a payload of the collection’s words spelled as coloured nibbles, and a checksum. Rows scroll up as they arrive; a corrupted frame is flagged red and its clean copy follows a few rows later with a green tick.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, c = n / 50, rows = 52, sc0 = U.scheme(R, 0.6), lut = sc0.lut, h0 = R.range(0, 256), addrs = Array.from({ length: 4 }, () => R.int(0, 255));
        g.trait('Palette', schemeName(sc0)); g.trait('Frame width', 50); g.trait('Line', 'Noisy'); g.trait('Cells', 'Tiled'); g.trait('Grid', n);
        const hist = [], pending = [];
        const frame = (retry) => {
          const w = retry ? retry.word : R.pick(WORDS) + ' ' + R.pick(WORDS), bits = [], a = retry ? retry.a : R.int(0, 3);
          for (const ch of w) { const v = ch.charCodeAt(0); bits.push(v >> 4, v & 15); }
          const bad = !retry && R() < 0.14, cells = [];
          for (let k = 0; k < 4; k++) cells.push(k & 1 ? BLACK : WHITE);
          cells.push(BLACK);
          for (let k = 0; k < 4; k++) cells.push(X.shade(lut[(h0 + a * 64) & 255], k & 1 ? 0.7 : 1));
          cells.push(BLACK, X.rgb(150, 150, 160), X.rgb(110, 110, 120), BLACK);
          for (let k = 0; k < 30; k++) { const nb = bits[k % bits.length]; cells.push(bad && R() < 0.2 ? X.rgb(255, 30, 30) : k < bits.length ? lut[(h0 + nb * 16) & 255] : X.rgb(30, 30, 36)); }
          cells.push(BLACK, X.rgb(120, 120, 130), X.rgb(90, 90, 100), X.rgb(120, 120, 130), BLACK);
          cells.push(bad ? X.rgb(255, 40, 40) : retry ? X.rgb(40, 255, 90) : X.rgb(60, 60, 70), bad ? X.rgb(255, 40, 40) : retry ? X.rgb(40, 255, 90) : X.rgb(60, 60, 70));
          while (cells.length < 50) cells.push(BLACK);
          if (bad) pending.push({ word: w, a, due: hist.length + R.int(2, 4) });
          return cells;
        };
        for (let k = 0; k < rows; k++) hist.push(frame());
        let acc = 0, every = 0.45;
        return (t, dt) => {
          acc += dt;
          if (acc > every) { acc -= every; const due = pending.findIndex(p => p.due <= hist.length); hist.push(due >= 0 ? frame(pending.splice(due, 1)[0]) : frame()); if (hist.length > rows + 2) { hist.shift(); pending.forEach(p => p.due--); } }
          const off = Math.floor(acc / every * c);
          d.fill(BLACK);
          for (let r = 0; r < hist.length; r++) {
            const y0 = n - (hist.length - r) * c + c - off;
            if (y0 + c <= 0 || y0 >= n) continue;
            hist[r].forEach((col, k) => X.rect(g, k * c, y0, c, c - (c > 2 ? 1 : 0), col));
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, Wd = R.pick([50, 40, 32]), c = n / Wd, rows = Math.ceil(n / c) + 2, sc0 = U.scheme(R, 0.6), lut = sc0.lut, h0 = R.range(0, 256), addrs = Array.from({ length: 4 }, () => R.int(0, 255));
      const errRate = g.alt.pick([0.14, 0.14, 0.05, 0.3]), solid = g.alt.bool(0.3);
      g.trait('Palette', schemeName(sc0)); g.trait('Frame width', Wd); g.trait('Line', { 0.05: 'Clean', 0.14: 'Noisy', 0.3: 'Stormy' }[errRate]); g.trait('Cells', solid ? 'Solid' : 'Tiled'); g.trait('Grid', n);
      const hist = [], pending = [];
      const frame = (retry) => {
        const w = retry ? retry.word : R.pick(WORDS) + ' ' + R.pick(WORDS), bits = [], a = retry ? retry.a : R.int(0, 3);
        for (const ch of w) { const v = ch.charCodeAt(0); bits.push(v >> 4, v & 15); }
        const bad = !retry && R() < errRate, cells = [];
        for (let k = 0; k < 4; k++) cells.push(k & 1 ? BLACK : WHITE);
        cells.push(BLACK);
        for (let k = 0; k < 4; k++) cells.push(X.shade(lut[(h0 + a * 64) & 255], k & 1 ? 0.7 : 1));
        cells.push(BLACK, X.rgb(150, 150, 160), X.rgb(110, 110, 120), BLACK);
        for (let k = 0; k < Wd - 20; k++) { const nb = bits[k % bits.length]; cells.push(bad && R() < 0.2 ? X.rgb(255, 30, 30) : k < bits.length ? lut[(h0 + nb * 16) & 255] : X.rgb(30, 30, 36)); }
        cells.push(BLACK, X.rgb(120, 120, 130), X.rgb(90, 90, 100), X.rgb(120, 120, 130), BLACK);
        cells.push(bad ? X.rgb(255, 40, 40) : retry ? X.rgb(40, 255, 90) : X.rgb(60, 60, 70), bad ? X.rgb(255, 40, 40) : retry ? X.rgb(40, 255, 90) : X.rgb(60, 60, 70));
        while (cells.length < Wd) cells.push(BLACK);
        if (bad) pending.push({ word: w, a, due: hist.length + R.int(2, 4) });
        return cells;
      };
      for (let k = 0; k < rows; k++) hist.push(frame());
      let acc = 0, every = 0.45;
      return (t, dt) => {
        acc += dt;
        if (acc > every) { acc -= every; const due = pending.findIndex(p => p.due <= hist.length); hist.push(due >= 0 ? frame(pending.splice(due, 1)[0]) : frame()); if (hist.length > rows + 2) { hist.shift(); pending.forEach(p => p.due--); } }
        const off = Math.floor(acc / every * c);
        d.fill(BLACK);
        for (let r = 0; r < hist.length; r++) {
          const y0 = n - (hist.length - r) * c + c - off;
          if (y0 + c <= 0 || y0 >= n) continue;
          hist[r].forEach((col, k) => X.rect(g, k * c, y0, c, c - (c > 2 && !solid ? 1 : 0), col));
        }
      };
    },
  });

  add({
    name: 'Artifact Colour', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Move across to slide the split between raw bits and colour.',
    recipe: 'A one-bit picture decoded the way old home computers made colour on a television: every four neighbouring bits along a line become one of sixteen fringe colours. A slow field is written as repeating bit patterns; a split sweeps across showing the raw black-and-white bits on one side and the colour the screen sees on the other.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, B = new Uint8Array(n * n), Fv = new Float32Array(n * n), nz = U.noise(R).n2, fs = R.range(1.2, 3) / n, sp = R.range(0.04, 0.09), levels = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).slice(0, R.int(5, 8));
        const PAL = ['#000000', '#93177e', '#2e2fbf', '#c834f5', '#00763f', '#808080', '#3297ff', '#a2a8ff', '#625100', '#f8701c', '#808080', '#ffa0d0', '#45d72b', '#d1e24d', '#6af7a7', '#ffffff'].map(s => U.pk(U.hex(s)));
        g.trait('Machine', 'Apple'); g.trait('Patterns', levels.length); g.trait('Field', fs * n < 1.8 ? 'Broad' : fs * n < 2.4 ? 'Medium' : 'Fine'); g.trait('Raw bits', 'White'); g.trait('Grid', n);
        return t => {
          // each cell of the field picks a 4-bit pattern; the line's bits repeat it every four cells
          smoothField(Fv, n, (x, y) => nz(x * fs + t * sp, y * fs * 1.4 - t * sp * 0.6) * 0.5 + 0.5);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const v = Fv[y * n + x], p = levels[Math.min(levels.length - 1, Math.floor(v * levels.length))];
            B[y * n + x] = p >> (3 - (x & 3)) & 1;
          }
          const split = g.input.inside ? Math.min(n - 1, Math.floor(g.input.x * n)) : Math.floor(n * (0.25 + 0.2 * Math.sin(t * 0.13)));
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const i = y * n;
            if (x < split) { d[i + x] = B[i + x] ? WHITE : BLACK; continue; }
            const w = B[i + x] << 3 | B[i + (x + 1) % n] << 2 | B[i + (x + 2) % n] << 1 | B[i + (x + 3) % n], ph = x & 3;
            d[i + x] = PAL[((w >> ph) | (w << (4 - ph))) & 15];   // turn the window back to the pattern's own phase
          }
          for (let y = 0; y < n; y++) d[y * n + split] = X.rgb(255, 60, 60);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, B = new Uint8Array(n * n), Fv = new Float32Array(n * n), nz = U.noise(R).n2, fs = R.range(1.2, 3) / n, sp = R.range(0.04, 0.09), levels = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).slice(0, R.int(5, 8));
      const machine = g.alt.pick(['Apple', 'Apple', 'Composite', 'Amber', 'Green screen', 'Pastel']);
      const PAL = machinePal(machine), rawOn = machine === 'Amber' ? X.rgb(255, 184, 60) : machine === 'Green screen' ? X.rgb(110, 255, 140) : WHITE;
      g.trait('Machine', machine); g.trait('Patterns', levels.length); g.trait('Field', fs * n < 1.8 ? 'Broad' : fs * n < 2.4 ? 'Medium' : 'Fine'); g.trait('Raw bits', machine === 'Amber' ? 'Amber' : machine === 'Green screen' ? 'Green' : 'White'); g.trait('Grid', n);
      return t => {
        // each cell of the field picks a 4-bit pattern; the line's bits repeat it every four cells
        smoothField(Fv, n, (x, y) => nz(x * fs + t * sp, y * fs * 1.4 - t * sp * 0.6) * 0.5 + 0.5);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const v = Fv[y * n + x], p = levels[Math.min(levels.length - 1, Math.floor(v * levels.length))];
          B[y * n + x] = p >> (3 - (x & 3)) & 1;
        }
        const split = g.input.inside ? Math.min(n - 1, Math.floor(g.input.x * n)) : Math.floor(n * (0.25 + 0.2 * Math.sin(t * 0.13)));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n;
          if (x < split) { d[i + x] = B[i + x] ? rawOn : BLACK; continue; }
          const w = B[i + x] << 3 | B[i + (x + 1) % n] << 2 | B[i + (x + 2) % n] << 1 | B[i + (x + 3) % n], ph = x & 3;
          d[i + x] = PAL[((w >> ph) | (w << (4 - ph))) & 15];   // turn the window back to the pattern's own phase
        }
        for (let y = 0; y < n; y++) d[y * n + split] = X.rgb(255, 60, 60);
      };
    },
  });

  add({
    name: 'Parity', seed: 4, sizes: [100], fps: 12,
    recipe: 'Four blocks of data bits spelling the collection’s words, each guarded by a parity row and column. Bits are hit by errors and turn red; the failing row and column checks light up, cross at the bad bit, and it is flipped back with a green flash.',
    make(R, U, g) {
      const { n, d } = g, lut = U.scheme(R, 0.6).lut, h0 = R.range(0, 256), cs = 4, B = 12;
      const blocks = Array.from({ length: 4 }, (_, k) => ({ x0: 1 + (k & 1) * 50, y0: 1 + (k >> 1) * 50, bits: new Uint8Array(121), err: -1, phase: 0, at: 0, fixed: -1, fixAt: -9, col: lut[(h0 + k * 64) & 255], next: R.range(0.5, 3) }));
      const write = () => {
        const w = (R.pick(WORDS.filter(s => s.length >= 4)) + R.pick(WORDS.filter(s => s.length >= 4))).slice(0, 8);
        blocks.forEach((b, k) => { b.bits.fill(0); for (let j = 0; j < 2; j++) { const rws = X.FONT[w[k * 2 + j]] || X.FONT[' ']; for (let r = 0; r < 7; r++) for (let x = 0; x < 5; x++) if (rws[r] >> (4 - x) & 1) b.bits[(r + 2) * 11 + j * 6 + x] = 1; } });
      };
      write();
      let since = 0;
      return (t, dt) => {
        since += dt; if (since > 16) { since = 0; write(); }
        d.fill(BLACK);
        for (const b of blocks) {
          b.next -= dt;
          if (b.err < 0 && b.next <= 0) { b.err = R.int(0, 120); b.bits[b.err] ^= 1; b.at = t; b.phase = 0; }
          if (b.err >= 0 && t - b.at > 0.9) b.phase = 1;
          if (b.err >= 0 && t - b.at > 1.8) { b.bits[b.err] ^= 1; b.fixed = b.err; b.fixAt = t; b.err = -1; b.next = R.range(0.6, 2.4); }
          const er = b.err >= 0 ? (b.err / 11 | 0) : -1, ec = b.err >= 0 ? b.err % 11 : -1;
          for (let r = 0; r < B; r++) for (let c = 0; c < B; c++) {
            let col;
            if (r < 11 && c < 11) {
              const i = r * 11 + c, on = b.bits[i];
              col = on ? b.col : X.shade(b.col, 0.13);
              if (i === b.err) col = X.rgb(255, 40, 40);
              else if (i === b.fixed && t - b.fixAt < 0.8) col = X.mixPk(X.rgb(60, 255, 100), col, (t - b.fixAt) / 0.8);
            } else {
              const isRow = c === 11 && r < 11, isCol = r === 11 && c < 11;
              let par = 0;
              if (isRow) for (let k = 0; k < 11; k++) par ^= b.bits[r * 11 + k];
              if (isCol) for (let k = 0; k < 11; k++) par ^= b.bits[k * 11 + c];
              const failing = b.phase === 1 && ((isRow && r === er) || (isCol && c === ec));
              col = failing ? X.rgb(255, 220, 40) : par ? X.rgb(220, 220, 230) : X.rgb(50, 50, 58);
            }
            X.rect(g, b.x0 + c * cs, b.y0 + r * cs, cs - 1, cs - 1, col);
          }
          if (b.phase === 1 && b.err >= 0) { X.rect(g, b.x0, b.y0 + er * cs + 1, B * cs - 1, 1, X.rgb(255, 220, 40)); X.rect(g, b.x0 + ec * cs + 1, b.y0, 1, B * cs - 1, X.rgb(255, 220, 40)); X.rect(g, b.x0 + ec * cs, b.y0 + er * cs, cs - 1, cs - 1, X.rgb(255, 40, 40)); }
        }
      };
    },
  });

  add({
    name: 'QR Mask', seed: 3, sizes: [100], fps: 12,
    interactive: 'Click to try the next mask.',
    recipe: 'A two-dimensional code builds itself module by module along its zigzag placement path, coloured by the order each module was placed, inside its fixed finder squares and timing lines. Then it tries all eight of its xor mask patterns in turn, the data flickering into new checks and stripes with each one.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, S = 25, cs = 4, sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256), span = R.pick([256, 256, 180]);
        g.trait('Palette', schemeName(sc0)); g.trait('Paper', 'Dark'); g.trait('Colour by', span === 256 ? 'Whole path' : 'Part of the path');
        const fixed = new Int8Array(S * S).fill(-1);
        const finder = (ox, oy) => { for (let y = -1; y <= 7; y++) for (let x = -1; x <= 7; x++) { const X0 = ox + x, Y0 = oy + y; if (X0 < 0 || Y0 < 0 || X0 >= S || Y0 >= S) continue; const m = Math.max(Math.abs(x - 3), Math.abs(y - 3)); fixed[Y0 * S + X0] = m === 4 ? 0 : m === 3 || m <= 1 ? 1 : 0; } };
        finder(0, 0); finder(S - 7, 0); finder(0, S - 7);
        for (let k = 8; k < S - 8; k++) { fixed[6 * S + k] = (k + 1) & 1; fixed[k * S + 6] = (k + 1) & 1; }
        for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) fixed[(18 + y) * S + 18 + x] = Math.max(Math.abs(x), Math.abs(y)) === 1 ? 0 : 1;
        for (let k = 0; k < 9; k++) { if (fixed[8 * S + k] < 0) fixed[8 * S + k] = 2; if (fixed[k * S + 8] < 0) fixed[k * S + 8] = 2; if (k < 8) { if (fixed[8 * S + S - 1 - k] < 0) fixed[8 * S + S - 1 - k] = 2; if (fixed[(S - 1 - k) * S + 8] < 0) fixed[(S - 1 - k) * S + 8] = 2; } }
        // placement order: two-column zigzag from the bottom right, skipping the timing column
        const path = [];
        for (let col = S - 1, up = true; col > 0; col -= 2, up = !up) {
          if (col === 6) col--;
          for (let k = 0; k < S; k++) { const y = up ? S - 1 - k : k; for (const x of [col, col - 1]) if (fixed[y * S + x] < 0) path.push(y * S + x); }
        }
        const MASKS = [(i, j) => (i + j) % 2, (i) => i % 2, (i, j) => j % 3, (i, j) => (i + j) % 3, (i, j) => ((i >> 1) + Math.floor(j / 3)) % 2, (i, j) => (i * j) % 2 + (i * j) % 3, (i, j) => ((i * j) % 2 + (i * j) % 3) % 2, (i, j) => ((i + j) % 2 + (i * j) % 3) % 2];
        const data = new Uint8Array(S * S), order = new Int32Array(S * S).fill(-1);
        path.forEach((p, k) => { order[p] = k; });
        let placed = 0, mask = 0, maskAt = 0, from = 0, phase = 0, since = 0;
        const fill = () => { const str = R.shuffle(WORDS.slice()).join(''); path.forEach((p, k) => { const ch = str.charCodeAt((k >> 3) % str.length); data[p] = ch >> (7 - (k & 7)) & 1; }); placed = 0; phase = 0; since = 0; };
        fill(); placed = Math.floor(path.length * 0.6);
        return (t, dt) => {
          since += dt;
          if (phase === 0) { placed = Math.min(path.length, placed + 6); if (placed >= path.length) { phase = 1; maskAt = t; from = mask; } }
          else if (t - maskAt > 2.2 || (g.input.taps().length && t - maskAt > 0.3)) { from = mask; mask = (mask + 1) % 8; maskAt = t; if (mask === 0 && since > 20) fill(); }
          const sweep = phase ? U.clamp((t - maskAt) / 0.6) : 1;
          d.fill(BLACK);
          for (let i = 0; i < S; i++) for (let j = 0; j < S; j++) {
            const p = i * S + j, fx = fixed[p];
            let col;
            if (fx >= 0) col = fx === 2 ? X.rgb(70, 70, 80) : fx ? WHITE : BLACK;
            else {
              const k = order[p];
              if (k >= placed) col = X.rgb(18, 18, 22);
              else {
                const m = (i + j) / (2 * S - 2) <= sweep ? mask : from, v = data[p] ^ (MASKS[m](i, j) === 0 ? 1 : 0);
                col = v ? lut[(h0 + k / path.length * span) & 255] : BLACK;
              }
            }
            X.rect(g, j * cs, i * cs, cs, cs, col);
          }
        };
      };
      if (g.home || g.alt() < 0.45) return og(R, U, g);   // the original look on 45% of rolls, new looks otherwise
      const { n, d } = g, S = 25, cs = 4, sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256), span = R.pick([256, 256, 180]);
      const paper = g.alt.bool(0.4), ink = paper ? lut.map(c => X.shade(c, 0.78)) : lut;   // a printed code: dark modules in colour on white
      g.trait('Palette', schemeName(sc0)); g.trait('Paper', paper ? 'Printed' : 'Dark'); g.trait('Colour by', span === 256 ? 'Whole path' : 'Part of the path');
      const fixed = new Int8Array(S * S).fill(-1);
      const finder = (ox, oy) => { for (let y = -1; y <= 7; y++) for (let x = -1; x <= 7; x++) { const X0 = ox + x, Y0 = oy + y; if (X0 < 0 || Y0 < 0 || X0 >= S || Y0 >= S) continue; const m = Math.max(Math.abs(x - 3), Math.abs(y - 3)); fixed[Y0 * S + X0] = m === 4 ? 0 : m === 3 || m <= 1 ? 1 : 0; } };
      finder(0, 0); finder(S - 7, 0); finder(0, S - 7);
      for (let k = 8; k < S - 8; k++) { fixed[6 * S + k] = (k + 1) & 1; fixed[k * S + 6] = (k + 1) & 1; }
      for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) fixed[(18 + y) * S + 18 + x] = Math.max(Math.abs(x), Math.abs(y)) === 1 ? 0 : 1;
      for (let k = 0; k < 9; k++) { if (fixed[8 * S + k] < 0) fixed[8 * S + k] = 2; if (fixed[k * S + 8] < 0) fixed[k * S + 8] = 2; if (k < 8) { if (fixed[8 * S + S - 1 - k] < 0) fixed[8 * S + S - 1 - k] = 2; if (fixed[(S - 1 - k) * S + 8] < 0) fixed[(S - 1 - k) * S + 8] = 2; } }
      // placement order: two-column zigzag from the bottom right, skipping the timing column
      const path = [];
      for (let col = S - 1, up = true; col > 0; col -= 2, up = !up) {
        if (col === 6) col--;
        for (let k = 0; k < S; k++) { const y = up ? S - 1 - k : k; for (const x of [col, col - 1]) if (fixed[y * S + x] < 0) path.push(y * S + x); }
      }
      const MASKS = [(i, j) => (i + j) % 2, (i) => i % 2, (i, j) => j % 3, (i, j) => (i + j) % 3, (i, j) => ((i >> 1) + Math.floor(j / 3)) % 2, (i, j) => (i * j) % 2 + (i * j) % 3, (i, j) => ((i * j) % 2 + (i * j) % 3) % 2, (i, j) => ((i + j) % 2 + (i * j) % 3) % 2];
      const data = new Uint8Array(S * S), order = new Int32Array(S * S).fill(-1);
      path.forEach((p, k) => { order[p] = k; });
      let placed = 0, mask = 0, maskAt = 0, from = 0, phase = 0, since = 0;
      const fill = () => { const str = R.shuffle(WORDS.slice()).join(''); path.forEach((p, k) => { const ch = str.charCodeAt((k >> 3) % str.length); data[p] = ch >> (7 - (k & 7)) & 1; }); placed = 0; phase = 0; since = 0; };
      fill(); placed = Math.floor(path.length * 0.6);
      return (t, dt) => {
        since += dt;
        if (phase === 0) { placed = Math.min(path.length, placed + 6); if (placed >= path.length) { phase = 1; maskAt = t; from = mask; } }
        else if (t - maskAt > 2.2 || (g.input.taps().length && t - maskAt > 0.3)) { from = mask; mask = (mask + 1) % 8; maskAt = t; if (mask === 0 && since > 20) fill(); }
        const sweep = phase ? U.clamp((t - maskAt) / 0.6) : 1;
        d.fill(paper ? X.rgb(236, 234, 226) : BLACK);
        const LIGHT = paper ? X.rgb(236, 234, 226) : BLACK, DARK = paper ? X.rgb(22, 22, 28) : WHITE;
        for (let i = 0; i < S; i++) for (let j = 0; j < S; j++) {
          const p = i * S + j, fx = fixed[p];
          let col;
          if (fx >= 0) col = fx === 2 ? (paper ? X.rgb(190, 188, 182) : X.rgb(70, 70, 80)) : fx ? DARK : LIGHT;
          else {
            const k = order[p];
            if (k >= placed) col = paper ? X.rgb(214, 212, 204) : X.rgb(18, 18, 22);
            else {
              const m = (i + j) / (2 * S - 2) <= sweep ? mask : from, v = data[p] ^ (MASKS[m](i, j) === 0 ? 1 : 0);
              col = v ? ink[(h0 + k / path.length * span) & 255] : LIGHT;
            }
          }
          X.rect(g, j * cs, i * cs, cs, cs, col);
        }
      };
    },
  });
})();
