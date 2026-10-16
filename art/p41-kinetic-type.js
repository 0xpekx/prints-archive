// Set 5 · Kinetic Type: the collection's own words set by rules. Sand, swarms,
// sorting, evolution and distance fields do the typesetting; the letters are
// always built from the hard cells of the grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Kinetic Type' }, def));
  const WORDS = ['PRISM', 'HUE', 'ECHO', 'VOID', 'DEEP', 'NEON', 'DAWN', 'NOON', 'CALM', 'VIVID', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'CASCADE', 'AXON', 'BLOOM', 'PULSE', 'HALO', 'IRIS', 'RIPPLE', 'TREBLE', 'BASS', 'CITRUS', 'VELVET', 'STATIC', 'LATTICE', 'GLACIAL', 'MONOLITH', 'SYNAE', 'COMET', 'GRAIN', 'TEMPO'];
  const SHORT = WORDS.filter(w => w.length <= 5);
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

  // a word as a bit mask, s cells per font pixel
  function glyphs(word, s) {
    const w = Math.max(1, word.length * 6 * s - s), h = 7 * s, m = new Uint8Array(w * h);
    for (let k = 0; k < word.length; k++) {
      const rows = X.FONT[word[k]] || X.FONT['?'];
      for (let r = 0; r < 7; r++) for (let b = 0; b < 5; b++) if (rows[r] >> (4 - b) & 1)
        for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) m[(r * s + yy) * w + k * 6 * s + b * s + xx] = 1;
    }
    return { w, h, m };
  }
  // the word centred on the n-grid, as large as fits `fill` of the width
  function placed(word, n, fill = 0.86, dy = 0) {
    const s = Math.max(1, Math.min(Math.floor(n * fill / (word.length * 6 - 1)), Math.floor(n * 0.7 / 7)));
    const gm = glyphs(word, s), ox = (n - gm.w) >> 1, oy = ((n - gm.h) >> 1) + Math.round(dy * n), M = new Uint8Array(n * n);
    for (let y = 0; y < gm.h; y++) for (let x = 0; x < gm.w; x++) {
      const X0 = ox + x, Y0 = oy + y;
      if (gm.m[y * gm.w + x] && X0 >= 0 && X0 < n && Y0 >= 0 && Y0 < n) M[Y0 * n + X0] = 1;
    }
    return { M, s };
  }

  // several words stacked, one per line, all at the largest size that fits
  function placedLines(lines, n, fill = 0.88) {
    const k = lines.length, long = Math.max(...lines.map(w => w.length));
    const s = Math.max(1, Math.min(Math.floor(n * fill / (long * 6 - 1)), Math.floor(n * 0.86 / (k * 7 + (k - 1) * 3))));
    const M = new Uint8Array(n * n), H = k * 7 * s + (k - 1) * 3 * s, top = (n - H) >> 1;
    lines.forEach((w, j) => {
      const gm = glyphs(w, s), ox = (n - gm.w) >> 1, oy = top + j * 10 * s;
      for (let y = 0; y < gm.h; y++) for (let x = 0; x < gm.w; x++) if (gm.m[y * gm.w + x] && oy + y < n && ox + x >= 0 && ox + x < n) M[(oy + y) * n + ox + x] = 1;
    });
    return { M, s };
  }

  // the pointer's cell on an n grid, or null
  const at = (inp, n) => inp.inside ? [Math.min(n - 1, Math.max(0, inp.x * n | 0)), Math.min(n - 1, Math.max(0, inp.y * n | 0))] : null;
  // cells of a mask that touch the outside: a one-cell rim
  function rimOf(M, n) {
    const E = new Uint8Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      if (M[i] && (!x || !M[i - 1] || x === n - 1 || !M[i + 1] || !y || !M[i - n] || y === n - 1 || !M[i + n])) E[i] = 1;
    }
    return E;
  }

  add({
    name: 'Poured Type', seed: 6, sizes: [80, 100], fps: 12,
    interactive: 'Press and hold to pour sand from the pointer; a tap tips in a handful.',
    recipe: 'Sand pours from moving spouts and settles round words that are only a mould: grains pile on the letters’ shoulders and fill their counters, laid down in flat strata by the moment they fell, while the letters stand clear with a bright rim. When the box is full the floor opens and it drains for the next words.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, inp = g.input, words = R.shuffle(SHORT.slice()), k = R.pick([1, 2, 2, 3]);
      // the sand: flat bands of a few colours, each grain lit a little lighter or darker
      const hr = R.range(0, 100), mode = R.pick(['bands', 'bands', 'rainbow', 'duo']), cols = mode === 'rainbow' ? Array.from({ length: 12 }, (_, i) => X.hsbPk(hr + i * 100 / 12, 88, 95)) : X.inks(R, R.int(4, 7), 0.4);
      if (mode === 'duo') { const a = cols[0], b = cols[cols.length - 1]; cols.length = 0; cols.push(a, b, a, b, a, b, X.mixPk(a, WHITE, 0.6)); }
      const L = cols.length, light = cols.map(c => X.mixPk(c, WHITE, 0.18)), dark = cols.map(c => X.shade(c, 0.78)), tex = Uint8Array.from({ length: N }, () => R() < 0.22 ? 1 : R() < 0.2 ? 2 : 0);
      const bandSec = R.range(0.7, 2.2), groundCol = R.bool(0.6) ? X.rgb(8, 8, 12) : X.shade(cols[R.int(0, L - 1)], 0.1);
      const style = R.pick(['rim', 'rim', 'solid', 'outline']), ink = R.bool(0.6) ? WHITE : X.mixPk(cols[R.int(0, L - 1)], WHITE, 0.5);
      const spouts = R.pick([1, 2, 3, 4, 5]), sp = Array.from({ length: spouts }, () => [R.range(0.05, 0.2) * R.sign(), R.range(0, 6), R.range(0.3, 0.48)]), width = Math.max(2, Math.round(n / R.pick([6, 10, 16])));
      const rain = R.bool(0.2), slide = R.range(0.35, 1), pour = 0.425;
      g.trait('Sand', { bands: 'Strata', rainbow: 'Rainbow', duo: 'Duo' }[mode]); g.trait('Palette', mode === 'rainbow' ? 'Rainbow' : palName(cols));
      g.trait('Pour', rain ? 'Rain' : spouts === 1 ? 'One spout' : spouts + ' spouts'); g.trait('Letters', { rim: 'Rim', solid: 'Solid', outline: 'Outline' }[style]);
      g.trait('Lines', k); g.trait('Grid', n);
      const S = new Uint8Array(N);   // 0 empty, else 1 + band
      let solid, rim, wi = 0, phase = 0, clock = 0, f = 0, band = 0, bandClock = 0;
      const next = () => { solid = placedLines(Array.from({ length: k }, () => words[wi++ % words.length]), n, 0.84).M; rim = rimOf(solid, n); phase = 0; clock = 0; };
      const drop = (x, y) => { if (x >= 0 && x < n && y >= 0 && y < n) { const i = y * n + x; if (!S[i] && !solid[i]) S[i] = 1 + band; } };
      const step = (t, dt) => {
        clock += dt; f++; bandClock += dt;
        if (bandClock > bandSec) { bandClock = 0; band = (band + 1) % L; }
        if (phase === 0) {
          if (rain) for (let x = 0; x < n; x++) { if (R() < 0.18) drop(x, 0); }
          else for (const [w, ph, amp] of sp) {
            // each spout sweeps (and pours) at the original pace, its 0.85 a cell split over the
            // top two rows so its stream falls as loose grains rather than in bars
            const cx = Math.floor(n * (0.5 + 2 * amp * Math.sin(t * w + ph)) * 0.98);
            for (let q = -width; q <= width; q++) { if (R() < pour) drop(cx + q, 0); if (R() < pour) drop(cx + q, 1); }
          }
        }
        const p = at(inp, n);
        if (p && inp.down && phase !== 1) for (let q = -2; q <= 2; q++) for (let r = -1; r <= 1; r++) if (R() < 0.7) drop(p[0] + q, p[1] + r);
        // a tap tips a handful of sand in at that point (a burst of replayed taps is capped per frame)
        const tp = inp.taps();
        if (phase !== 1) for (let k = 0; k < tp.length && k < 6; k++) { const hx = tp[k].x * n | 0, hy = tp[k].y * n | 0; for (let q = -3; q <= 3; q++) for (let r = -2; r <= 2; r++) if (q * q + r * r * 2 <= 10 && g.alt() < 0.8) drop(hx + q, hy + r); }
        for (let pass = 0; pass < 2; pass++) {
          if (phase === 1) for (let x = 0; x < n; x++) S[(n - 1) * n + x] = 0;   // the floor is open
          for (let y = n - 2; y >= 0; y--) {
            const ltr = (y + f) & 1;
            for (let q = 0; q < n; q++) {
              const x = ltr ? q : n - 1 - q, i = y * n + x, v = S[i];
              if (!v) continue;
              const b = i + n;
              if (!S[b] && !solid[b]) { S[b] = v; S[i] = 0; continue; }
              if (R() > slide) continue;
              const dl = x > 0 && !S[b - 1] && !solid[b - 1], dr = x < n - 1 && !S[b + 1] && !solid[b + 1];
              if (dl && (!dr || R() < 0.5)) { S[b - 1] = v; S[i] = 0; } else if (dr) { S[b + 1] = v; S[i] = 0; }
            }
          }
        }
        if (f % 12 === 0) {
          let all = 0;
          for (let i = 0; i < N; i++) if (S[i]) all++;
          if (phase === 0 && (all > N * 0.7 || clock > 40)) { phase = 2; clock = 0; }
          else if (phase === 2 && clock > 4) { phase = 1; clock = 0; }   // a full box holds a moment before draining
          else if (phase === 1 && (all < N * 0.04 || clock > 9)) next();
        }
      };
      next();
      for (let q = 0; q < 110; q++) step(q / 12, 1 / 12);   // open on a box already well poured
      return (t, dt) => {
        step(t + 110 / 12, dt);
        for (let i = 0; i < N; i++) {
          const v = S[i];
          if (v) { const c = v - 1, tx = tex[i]; d[i] = tx === 1 ? light[c] : tx === 2 ? dark[c] : cols[c]; }
          else if (solid[i]) d[i] = style === 'solid' ? ink : rim[i] ? ink : style === 'outline' ? groundCol : BLACK;
          else d[i] = groundCol;
        }
      };
    },
  });

  add({
    name: 'Swarm Lettering', seed: 1, sizes: [100, 200], fps: 12,
    interactive: 'Move over the swarm to push it aside; hold to pull it toward the pointer; tap to blow it apart.',
    listens: 'A clap bursts the swarm apart; loudness makes the letters shiver.',
    recipe: 'A swarm of points flies in and settles into words, each point taking the colour of the place it lands. It holds, shivers, then the swarm breaks up (in a current, a burst, a spiral or a downpour) and gathers again into the next words, trailing light.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, sc = U.scheme(R, 0.55), lut = sc.lut, words = R.shuffle(SHORT.slice()), nz = U.noise(R).n2, big = n >= 200;
      const N = Math.round((big ? 1500 : 620) * R.pick([0.7, 1, 1.35])), k = R.pick([1, 2, 2, 3]);
      const style = R.pick(['spark', 'ember', 'neon', 'dust']), fade = { spark: 0.7, ember: 0.86, neon: 0.8, dust: 0.45 }[style];
      const breakup = R.pick(['current', 'burst', 'spiral', 'rain']), hold = R.range(3, 6), core = style === 'neon' || style === 'spark';
      const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N), tx = new Float32Array(N), ty = new Float32Array(N), hue = new Uint8Array(N);
      for (let i = 0; i < N; i++) { px[i] = R() * n; py[i] = R() * n; }
      const h0 = R.range(0, 256), span = R.pick([256, 256, 128, 64]), across = R.bool(0.6);
      g.trait('Palette', schemeName(sc)); g.trait('Swarm', N); g.trait('Trail', style[0].toUpperCase() + style.slice(1)); g.trait('Breakup', { current: 'Current', burst: 'Burst', spiral: 'Spiral', rain: 'Downpour' }[breakup]); g.trait('Lines', k); g.trait('Grid', n);
      let wi = 0, clock = 0;
      const assign = () => {
        const { M } = placedLines(Array.from({ length: k }, () => words[wi++ % words.length]), n, 0.86), pts = [];
        for (let i = 0; i < n * n; i++) if (M[i]) pts.push(i);
        const key = i => across ? (i % n) + 0.3 * (i / n | 0) : (i / n | 0) + 0.3 * (i % n);
        const order = Array.from({ length: N }, (_, i) => i).sort((a, b) => (across ? px[a] + 0.3 * py[a] : py[a] + 0.3 * px[a]) - (across ? px[b] + 0.3 * py[b] : py[b] + 0.3 * px[b]));
        pts.sort((a, b) => key(a) - key(b));
        order.forEach((i, j) => { const c = pts[Math.floor(j * pts.length / N)]; tx[i] = c % n + 0.5; ty[i] = (c / n | 0) + 0.5; hue[i] = (h0 + (across ? tx[i] : ty[i]) / n * span) & 255; });
        clock = 0;
      };
      assign();
      const settle = 3.2 + hold, scatterEnd = settle + 3;
      // kicks: a tap blows the swarm apart round that point; with Listen on, a clap
      // bursts the whole word and loudness makes the settled letters shiver
      const kicks = [];
      let shake = 0;
      const frame = (t, dt) => {
        clock += dt;
        const gather = clock < settle;
        if (clock > scatterEnd) assign();
        U.fadePx(d, fade);
        const p = inp.inside ? [inp.x * n, inp.y * n] : null, cx = n / 2, cy = n / 2;
        kicks.length = 0;
        for (const tp of inp.taps()) if (kicks.length < 16) kicks.push(tp.x * n, tp.y * n, 1.6, n * 0.22);
        if (inp.listening) {
          const b = inp.beats();
          if (b) kicks.push(cx, cy, Math.min(2.4, 1 + b * 0.6), n);
          shake = shake * 0.8 + inp.level * 0.2;
        } else shake = 0;
        if (kicks.length) for (let i = 0; i < N; i++) for (let q = 0; q < kicks.length; q += 4) {
          const dx = px[i] - kicks[q], dy = py[i] - kicks[q + 1], r = Math.sqrt(dx * dx + dy * dy) + 0.5, reach = kicks[q + 3];
          if (r < reach) { const s = kicks[q + 2] * (1 - r / reach * 0.6); vx[i] += dx / r * s; vy[i] += dy / r * s; }
        }
        for (let i = 0; i < N; i++) {
          if (shake > 0.02) { vx[i] += (g.alt() - 0.5) * shake * 0.9; vy[i] += (g.alt() - 0.5) * shake * 0.9; }
          if (gather) { vx[i] = vx[i] * 0.86 + (tx[i] - px[i]) * 0.022; vy[i] = vy[i] * 0.86 + (ty[i] - py[i]) * 0.022; }
          else if (breakup === 'current') { const a = nz(px[i] * 0.025, py[i] * 0.025 + t * 0.05) * 7; vx[i] = vx[i] * 0.94 + Math.cos(a) * 0.09; vy[i] = vy[i] * 0.94 + Math.sin(a) * 0.09; }
          else if (breakup === 'burst') { const dx = px[i] - cx, dy = py[i] - cy, r = Math.hypot(dx, dy) + 1; vx[i] = vx[i] * 0.96 + dx / r * 0.08; vy[i] = vy[i] * 0.96 + dy / r * 0.08; }
          else if (breakup === 'spiral') { const dx = px[i] - cx, dy = py[i] - cy, r = Math.hypot(dx, dy) + 1; vx[i] = vx[i] * 0.95 + (-dy / r * 0.12 + dx / r * 0.02); vy[i] = vy[i] * 0.95 + (dx / r * 0.12 + dy / r * 0.02); }
          else { vy[i] = vy[i] * 0.97 + 0.06; vx[i] *= 0.97; }
          if (p) {
            const dx = px[i] - p[0], dy = py[i] - p[1], r2 = dx * dx + dy * dy + 1, R0 = n * 0.12;
            if (inp.down) { vx[i] -= dx / Math.sqrt(r2) * 0.12; vy[i] -= dy / Math.sqrt(r2) * 0.12; }
            else if (r2 < R0 * R0) { const s = (1 - Math.sqrt(r2) / R0) * 0.9; vx[i] += dx / Math.sqrt(r2) * s; vy[i] += dy / Math.sqrt(r2) * s; }
          }
          px[i] = mod(px[i] + vx[i], n); py[i] = mod(py[i] + vy[i], n);
          const spd = Math.min(1, Math.hypot(vx[i], vy[i]) * 0.6), c = core ? X.mixPk(lut[hue[i]], WHITE, spd * 0.6) : style === 'ember' ? X.mixPk(lut[hue[i]], X.rgb(255, 120, 30), spd * 0.5) : lut[hue[i]];
          const x = px[i] | 0, y = py[i] | 0;
          d[y * n + x] = c;
          if (big) { if (x + 1 < n) d[y * n + x + 1] = c; if (y + 1 < n) { d[(y + 1) * n + x] = c; if (x + 1 < n) d[(y + 1) * n + x + 1] = c; } }
        }
      };
      // open with the swarm already streaming in toward its words, trails and all
      for (let k = 0; k < 22; k++) frame(k / 12, 1 / 12);
      return (t, dt) => frame(t + 22 / 12, dt);
    },
  });

  add({
    name: 'Word Plasma', seed: 3, sizes: [100, 200], fps: 10,
    interactive: 'Move over the page: the pointer is a fifth wave in the plasma.',
    recipe: 'A page of the collection’s words in text mode, set on a clean character grid and scrolling a line at a time, coloured by a slow plasma of four interfering waves in a few flat steps. Where the plasma runs low the letters go dark; where it peaks the cell floods with colour and the letter is cut out of it.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, sc = U.scheme(R, 0.55), z = n >= 200 ? R.pick([1, 2, 2]) * 2 : R.pick([1, 1, 2]), cw = 6 * z, ch = R.pick([8, 9]) * z;
      const cols = Math.floor((n - z) / cw), rows = Math.floor((n - z) / ch), ox = (n - cols * cw + z) >> 1, oy = (n - rows * ch + (ch - 7 * z)) >> 1;
      const steps = R.pick([5, 6, 8, 12]), lut = sc.lut, mode = R.pick(['glow', 'cut', 'cut', 'tile']), dark = X.rgb(10, 10, 14);
      // the text, wrapped into lines that never break a word
      const linesOut = [], centred = R.bool(0.5);
      let lastW = '';
      g.trait('Palette', schemeName(sc)); g.trait('Plasma', { glow: 'Glow', cut: 'Cut out', tile: 'Tiles' }[mode]); g.trait('Steps', steps); g.trait('Type', z * (n >= 200 ? 1 : 2) <= 2 ? 'Small' : 'Large'); g.trait('Align', centred ? 'Centred' : 'Left'); g.trait('Grid', n);
      for (let guard = 0; linesOut.length < 200 && guard < 2000; guard++) {
        let line = '';
        while (true) { let w = R.pick(WORDS); if (w === lastW) w = WORDS[(WORDS.indexOf(w) + 7) % WORDS.length]; if ((line + (line ? ' ' : '') + w).length > cols) break; line += (line ? ' ' : '') + w; lastW = w; }
        linesOut.push(centred ? line.padStart(cols - ((cols - line.length) >> 1)).padEnd(cols) : line.padEnd(cols));
      }
      const a = R.range(0.3, 0.7), b = R.range(0.3, 0.8), c1 = R.range(0.15, 0.45), c2 = R.range(-0.25, 0.25), e = R.range(0.4, 0.9), mx = R.range(0, cols), my = R.range(0, rows);
      const s1 = R.range(0.2, 0.5), s2 = R.range(0.15, 0.4), s3 = R.range(0.1, 0.3), s4 = R.range(0.2, 0.5), h0 = R.range(0, 256), span = R.pick([256, 180, 90]), lo = R.range(-0.45, -0.25), hi = R.range(0.25, 0.5), rowSec = R.range(1.2, 3);
      const levels = Array.from({ length: steps }, (_, i) => lut[(h0 + i / steps * span) & 255]), dims = levels.map(c => X.shade(c, 0.22));
      return t => {
        inp.taps();
        d.fill(BLACK);
        const top = Math.floor(t / rowSec), p = inp.inside ? [(inp.x * n - ox) / cw, (inp.y * n - oy) / ch] : null;
        for (let cy = 0; cy < rows; cy++) {
          const line = linesOut[(top + cy) % linesOut.length];
          for (let cx = 0; cx < cols; cx++) {
            let v = (Math.sin(cx * a + t * s1) + Math.sin(cy * b - t * s2) + Math.sin(cx * c1 + cy * c2 + t * s3) + Math.sin(Math.hypot(cx - mx, cy - my) * e - t * s4)) / 4;
            if (p) v = v * 0.7 + 0.5 * Math.cos(Math.hypot(cx - p[0], cy - p[1]) * 0.9 - t * 4) * Math.exp(-Math.hypot(cx - p[0], cy - p[1]) * 0.12);
            const chr = line[cx], rowsF = X.FONT[chr] || X.FONT[' '], q = Math.max(0, Math.min(steps - 1, Math.floor((v + 1) / 2 * steps))), col = levels[q];
            const x0 = ox + cx * cw, y0 = oy + cy * ch;
            if (mode === 'tile') X.rect(g, x0 - z, y0 - z, cw, 7 * z + 2 * z, v < lo ? dark : dims[q]);
            else if (mode === 'cut' && v > hi) X.rect(g, x0 - z, y0 - z, cw, 7 * z + 2 * z, col);
            const ink = mode === 'cut' && v > hi ? BLACK : v < lo ? dims[q] : col;
            for (let r = 0; r < 7; r++) for (let bb = 0; bb < 5; bb++) if (rowsF[r] >> (4 - bb) & 1) X.rect(g, x0 + bb * z, y0 + r * z, z, z, ink);
          }
        }
      };
    },
  });

  // chamfer distance from the set cells of M; (a, b) are the straight and diagonal
  // steps: (3, 4) is round, (1, 1) square, (1, 2) diamond
  function distance(M, n, a = 3, b = 4) {
    const D = new Float32Array(n * n), INF = 1e6;
    for (let i = 0; i < n * n; i++) D[i] = M[i] ? 0 : INF;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x; let v = D[i];
      if (x) v = Math.min(v, D[i - 1] + a);
      if (y) { v = Math.min(v, D[i - n] + a); if (x) v = Math.min(v, D[i - n - 1] + b); if (x < n - 1) v = Math.min(v, D[i - n + 1] + b); }
      D[i] = v;
    }
    for (let y = n - 1; y >= 0; y--) for (let x = n - 1; x >= 0; x--) {
      const i = y * n + x; let v = D[i];
      if (x < n - 1) v = Math.min(v, D[i + 1] + a);
      if (y < n - 1) { v = Math.min(v, D[i + n] + a); if (x < n - 1) v = Math.min(v, D[i + n + 1] + b); if (x) v = Math.min(v, D[i + n - 1] + b); }
      D[i] = v;
    }
    for (let i = 0; i < n * n; i++) D[i] /= a;
    return D;
  }

  add({
    name: 'Contour Type', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Move over the field: the pointer is a source of contours too; a tap sets a stone that keeps rippling.',
    listens: 'The contours stream out faster as the room gets louder; a clap sends out a white ring.',
    recipe: 'The hue of every cell is its distance from the nearest letter (measured round, square or diamond), run through the originals’ remainder with black voids, so bands of colour stream outward from the words like contour lines. Every few seconds the distances flow into the shape of the next words.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, inp = g.input, sc = U.scheme(R, 0.6), words = R.shuffle(SHORT.slice()), k = R.pick([1, 1, 2]);
      const metric = R.pick([[3, 4], [3, 4], [1, 1], [1, 2]]), kk = R.range(2.5, 6), sp = R.range(8, 18) * R.pick([1, 1, -1]), gap = R.range(4, 18), h0 = R.range(0, 100);
      const steps = R.pick([0, 0, 8, 12]), lut = steps ? Uint32Array.from({ length: 256 }, (_, i) => sc.lut[Math.floor(i / 256 * steps) * 256 / steps | 0]) : sc.lut;
      const letter = R.pick([WHITE, WHITE, X.mixPk(sc.lut[R.int(0, 255)], WHITE, 0.55)]), scale = 100 / n;
      g.trait('Palette', schemeName(sc)); g.trait('Distance', metric[1] === 4 ? 'Round' : metric[1] === 1 ? 'Square' : 'Diamond'); g.trait('Bands', steps ? steps : 'Smooth');
      g.trait('Flow', sp > 0 ? 'Outward' : 'Inward'); g.trait('Letters', letter === WHITE ? 'White' : 'Tinted'); g.trait('Lines', k); g.trait('Grid', n);
      const make = () => { const p = placedLines(Array.from({ length: k }, () => words[wi++ % words.length]), n, 0.84); return { D: distance(p.M, n, metric[0], metric[1]), M: p.M }; };
      let wi = 0, A = make(), B = A, since = 0;
      const Dm = new Float32Array(N);
      // stones set by taps stay and ripple for good (the last eight); `ph` is the
      // flow's phase, so loudness can hurry it without a jump
      const stones = [];
      let ph = 0, ring = -1;
      const rowMax = new Float32Array(n);
      const source = (sx, sy, r0) => {
        for (let y = 0; y < n; y++) {
          const dy = y + 0.5 - sy, m = rowMax[y] - r0;
          if (dy * dy >= m * m || m <= 0) continue;
          const half = Math.sqrt(m * m - dy * dy), x0 = Math.max(0, Math.floor(sx - half)), x1 = Math.min(n, Math.ceil(sx + half));
          for (let x = x0; x < x1; x++) { const i = y * n + x, dx = x + 0.5 - sx, q = Math.sqrt(dx * dx + dy * dy) + r0; if (q < Dm[i]) Dm[i] = q; }
        }
      };
      return (t, dt) => {
        since += dt;
        if (since > 11) { A = B; B = make(); since = 0; }
        for (const tp of inp.taps()) { stones.push(tp.x * n, tp.y * n); if (stones.length > 16) stones.splice(0, 2); }
        let flow = 1;
        if (inp.listening) { flow = 1 + 3 * inp.level; if (inp.beats()) ring = 0; }
        ph += dt * sp * flow;
        const w = U.smooth(U.clamp(since / 3)), p = inp.inside ? [inp.x * n, inp.y * n] : null;
        for (let i = 0; i < N; i++) Dm[i] = A.D[i] + (B.D[i] - A.D[i]) * w;
        if (p || stones.length) for (let y = 0; y < n; y++) { let m = 0; for (let x = y * n, e = x + n; x < e; x++) if (Dm[x] > m) m = Dm[x]; rowMax[y] = m; }
        for (let k = 0; k < stones.length; k += 2) source(stones[k], stones[k + 1], 1.2);
        if (p) source(p[0], p[1], 0.6);
        const MB = w > 0.5 ? B.M : A.M, rw = ring >= 0 ? ring * n * 0.9 : -99, P = ph, per = 100 + gap, sk = scale * kk;
        if (ring >= 0 && (ring += dt * 0.8) > 1.2) ring = -1;
        for (let i = 0; i < N; i++) {
          const D = Dm[i];
          if (D < 0.5 && MB[i]) { d[i] = letter; continue; }
          if (D < 1.6) { d[i] = BLACK; continue; }
          let v = (D * sk - P) % per; if (v < 0) v += per;
          d[i] = v > 95 || v < 1 ? BLACK : rw > 0 && D - rw < 1.5 && rw - D < 1.5 ? WHITE : lut[mod(h0 + v * 2.56, 256) | 0];
        }
        for (let k = 0; k < stones.length; k += 2) { const sx = stones[k] | 0, sy = stones[k + 1] | 0; if (sx >= 0 && sy >= 0 && sx < n && sy < n) d[sy * n + sx] = letter; }
      };
    },
  });

  add({
    name: 'Anagrams', seed: 3, sizes: [100, 200], fps: 12,
    interactive: 'Click a row to shuffle it again.',
    recipe: 'Rows of shuffled letter tiles in a tray, each row a word from the collection. Every row sorts itself by swapping neighbours; as it sorts its tiles fall into a clean gradient, and once the word reads it lights up and holds, then shuffles into another.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, C = 8, rowsN = R.pick([4, 5, 6, 8]), T = Math.floor(n / C), s = Math.max(1, Math.floor((T - 4) / 7)), sc = U.scheme(R, 0.6);
      const ox = (n - C * T) >> 1, oy = (n - rowsN * T) >> 1, pool = WORDS.filter(w => w.length <= C), style = R.pick(['bright', 'bright', 'wood', 'dark']), h0 = R.range(0, 256), span = R.pick([256, 160, 96]);
      const tray = style === 'wood' ? X.rgb(46, 30, 20) : X.rgb(14, 14, 20), socket = style === 'wood' ? X.rgb(34, 22, 14) : X.rgb(24, 24, 32), cream = X.rgb(236, 220, 176);
      const rows = Array.from({ length: rowsN }, () => ({ word: '', perm: [], xs: null, every: R.range(0.2, 0.36), next: R.range(0, 1), parity: 0, hold: 0, glow: 0 }));
      g.trait('Tiles', { bright: 'Bright', wood: 'Wood', dark: 'Dark' }[style]); g.trait('Palette', schemeName(sc)); g.trait('Rows', rowsN); g.trait('Grid', n);
      const deal = row => {
        const w = R.pick(pool), l = (C - w.length) >> 1;
        row.word = (' '.repeat(l) + w + ' '.repeat(C)).slice(0, C);
        const letters = [];
        for (let i = 0; i < C; i++) if (row.word[i] !== ' ') letters.push(i);
        // only the letters move; the gaps either side stay
        const sh = R.shuffle(letters.slice());
        row.perm = Array.from({ length: C }, (_, i) => i);
        letters.forEach((slot, j) => { row.perm[slot] = sh[j]; });
        row.xs = new Float32Array(C); row.perm.forEach((target, slot) => { row.xs[target] = slot; });
        row.hold = 0; row.glow = 0;
      };
      rows.forEach(deal);
      const tile = (x0, y0, base, lit) => {
        const hiC = X.mixPk(base, WHITE, 0.35 + lit * 0.3), loC = X.shade(base, 0.6);
        X.rect(g, x0 + 1, y0 + 1, T - 2, T - 2, X.mixPk(base, WHITE, lit * 0.3));
        X.rect(g, x0 + 1, y0 + 1, T - 2, 1, hiC); X.rect(g, x0 + 1, y0 + 1, 1, T - 2, hiC);
        X.rect(g, x0 + 1, y0 + T - 2, T - 2, 1, loC); X.rect(g, x0 + T - 2, y0 + 1, 1, T - 2, loC);
      };
      return (t, dt) => {
        for (const tap of inp.taps()) { const r = Math.floor((tap.y * n - oy) / T); if (r >= 0 && r < rowsN) deal(rows[r]); }
        d.fill(tray);
        rows.forEach((row, r) => {
          row.next -= dt;
          const sorted = row.perm.every((v, i) => v === i);
          if (sorted) { row.hold += dt; row.glow = Math.min(1, row.glow + dt * 2); if (row.hold > 2.8) deal(row); }
          else if (row.next <= 0) {
            row.next = row.every;
            for (let j = row.parity; j + 1 < C; j += 2) if (row.perm[j] > row.perm[j + 1]) { const a = row.perm[j]; row.perm[j] = row.perm[j + 1]; row.perm[j + 1] = a; }
            row.parity ^= 1;
          }
          row.perm.forEach((target, slot) => { row.xs[target] += (slot - row.xs[target]) * 0.4; });
          const y0 = oy + r * T;
          for (let c = 0; c < C; c++) X.rect(g, ox + c * T + 2, y0 + 2, T - 4, T - 4, socket);
          for (let target = 0; target < C; target++) {
            const chr = row.word[target]; if (chr === ' ') continue;
            const x0 = ox + Math.round(row.xs[target] * T), grad = sc.lut[(h0 + target / (C - 1) * span) & 255];
            const base = style === 'wood' ? (sorted ? X.mixPk(cream, grad, 0.35) : cream) : style === 'dark' ? X.rgb(20, 20, 28) : grad;
            tile(x0, y0, base, sorted ? row.glow : 0);
            const ink = style === 'dark' ? X.mixPk(grad, WHITE, row.glow * 0.5) : style === 'wood' ? X.rgb(50, 30, 18) : BLACK;
            const rws = X.FONT[chr], lx = x0 + ((T - 5 * s) >> 1), ly = y0 + ((T - 7 * s) >> 1);
            for (let y = 0; y < 7; y++) for (let x = 0; x < 5; x++) if (rws[y] >> (4 - x) & 1) X.rect(g, lx + x * s, ly + y * s, s, s, ink);
          }
        });
      };
    },
  });

  add({
    name: 'Xor Type', seed: 3, sizes: [100, 200], fps: 12,
    interactive: 'Drag to slide the second wall of words.',
    recipe: 'Two walls of repeated words at different sizes slide past each other. Cells where only one wall has ink take that wall’s colour (or a hue running across the grid), so the two texts interfere into shifting lattices of letters.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, sc = U.scheme(R, 0.6), lut = sc.lut, big = n / 100;
      const layer = (w, s, gap) => { const gm = glyphs(w + ' ', s), W = gm.w + s, H = gm.h + gap; return { gm, W, H, w }; };
      const A = layer(R.pick(SHORT), Math.max(2, Math.round(R.int(2, 3) * big)), Math.round(R.int(1, 3) * big)), B = layer(R.pick(SHORT), Math.max(3, Math.round(R.int(3, 5) * big)), Math.round(R.int(2, 4) * big));
      const va = [R.range(2, 5) * R.sign(), R.range(-1, 1)], vb = [R.range(-1.5, 1.5), R.range(1.5, 4) * R.sign()], brickA = R.bool(0.5), brickB = R.bool(0.5);
      const mode = R.pick(['duo', 'duo', 'xor', 'and']), kx = R.range(0.3, 1.2) * 100 / n, ky = R.range(-0.8, 0.8) * 100 / n, h0 = R.range(0, 256);
      let ca = lut[R.int(0, 255)], cb = lut[(R.int(0, 255) + 128) & 255];
      g.trait('Palette', schemeName(sc)); g.trait('Mode', { duo: 'Duo', xor: 'Xor', and: 'And' }[mode]); g.trait('Words', A.w + ' / ' + B.w);
      g.trait('Bond', brickA && brickB ? 'Brick' : brickA || brickB ? 'Mixed' : 'Stack'); g.trait('Grid', n);
      const ground = R.bool(0.6) ? BLACK : X.shade(lut[R.int(0, 255)], 0.12), both = mode === 'and' ? WHITE : R.bool(0.5) ? BLACK : X.rgb(235, 235, 235);
      // two walls that always read apart: the second takes the scheme colour furthest
      // from the first when they are too alike, and the first is lifted to a clear light
      const far = (a, b) => { const p = X.unpk(a), q = X.unpk(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
      if (far(ca, cb) < 150) for (const c of sc.cols) { const k = U.pk(c); if (far(ca, k) > far(ca, cb)) cb = k; }
      if (X.lum(ca) < 0.55) ca = X.mixPk(ca, WHITE, 0.55 - X.lum(ca));
      if (X.lum(cb) < 0.3) cb = X.mixPk(cb, WHITE, 0.3 - X.lum(cb));
      g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted');
      const dull = X.mixPk(ground, X.mixPk(X.mixPk(ca, cb, 0.5), WHITE, 0.35), 0.34);
      const lit = mode === 'and' ? lut.map(c => X.mixPk(c, WHITE, U.clamp(0.6 - X.lum(c)) * 0.6)) : lut;
      const rowOf = (L, y, ox, brick) => { const row = Math.floor(y / L.H), yy = mod(y, L.H); return [yy < L.gm.h ? yy * L.gm.w : -1, mod(ox + (brick && row & 1 ? L.W >> 1 : 0), L.W)]; };
      let dragX = 0, dragY = 0, last = null;
      return t => {
        if (inp.down && inp.inside) { const p = [inp.x * n, inp.y * n]; if (last) { dragX -= p[0] - last[0]; dragY -= p[1] - last[1]; } last = p; } else last = null;
        const ax = Math.floor(t * va[0]), ay = Math.floor(t * va[1]), bx = Math.floor(t * vb[0] + dragX), by = Math.floor(t * vb[1] + dragY), hs = t * 6, mA = A.gm.m, mB = B.gm.m;
        for (let y = 0; y < n; y++) {
          let [ra, xa] = rowOf(A, y + ay, ax, brickA), [rb, xb] = rowOf(B, y + by, bx, brickB);
          const hy = h0 + y * ky + hs;
          for (let x = 0; x < n; x++) {
            const a = ra >= 0 && xa < A.gm.w ? mA[ra + xa] : 0, b = rb >= 0 && xb < B.gm.w ? mB[rb + xb] : 0;
            let c;
            if (mode === 'duo') c = a && b ? both : a ? ca : b ? cb : ground;
            else if (mode === 'and') c = a && b ? lit[(hy + x * kx) & 255] : a || b ? dull : ground;
            else c = a ^ b ? lut[(hy + x * kx) & 255] : a ? both : ground;
            d[y * n + x] = c;
            if (++xa === A.W) xa = 0;
            if (++xb === B.W) xb = 0;
          }
        }
      };
    },
  });

  add({
    name: 'Hill Climb', seed: 6, sizes: [100, 200], fps: 12,
    interactive: 'Click letters to scramble them back into noise.',
    recipe: 'A page of letter slots starts as random bits. Each slot flips one bit at a time and keeps the change if it looks more like its target letter, sometimes even when it doesn’t; the collection’s words crystallise out of the noise, then the targets change and the page evolves into new words.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, s = n >= 200 ? 3 : 2, sw = 6 * s, sh = 9 * s, cols = Math.floor(n / sw), rows = Math.floor(n / sh), ox = (n - cols * sw + s) >> 1, oy = (n - rows * sh + 2 * s) >> 1;
        const sc0 = U.scheme(R, 0.6), lut = sc0.lut, h0 = R.range(0, 256), span = R.pick([256, 160, 90]), K = cols * rows;
        g.trait('Palette', schemeName(sc0)); g.trait('Colour by', 'Column'); g.trait('Type', 'Medium'); g.trait('Ghosts', 'Dim'); g.trait('Grid', n);
        const cur = Array.from({ length: K }, () => Uint8Array.from({ length: 35 }, () => R.bool(0.45) ? 1 : 0)), tgt = Array.from({ length: K }, () => new Uint8Array(35));
        let since = 0, hold = 0;
        const phrase = () => {
          let str = '';
          while (str.length < K) str += R.pick(WORDS) + ' ';
          // break lines at word ends where possible
          const lines = []; let line = '';
          for (const w of str.trim().split(' ')) { if ((line + w).length > cols) { lines.push(line.slice(0, cols).padEnd(cols)); line = ''; } if (w.length <= cols) line += w + ' '; }
          lines.push(line.slice(0, cols).padEnd(cols));
          const txt = lines.join('').slice(0, K).padEnd(K);
          for (let k = 0; k < K; k++) { const rws = X.FONT[txt[k]] || X.FONT[' ']; for (let b = 0; b < 35; b++) tgt[k][b] = rws[b / 5 | 0] >> (4 - b % 5) & 1; }
          since = 0; hold = 0;
        };
        phrase();
        const fr = (t, dt) => {
          for (const tap of g.input.taps()) {
            const cx = Math.floor((tap.x * n - ox) / sw), cy = Math.floor((tap.y * n - oy) / sh);
            for (let k = 0; k < K; k++) if (Math.abs(k % cols - cx) <= 2 && Math.abs((k / cols | 0) - cy) <= 1) for (let b = 0; b < 35; b++) cur[k][b] = g.alt() < 0.45 ? 1 : 0;
            since = Math.min(since, 1.5); hold = 0;
          }
          since += dt;
          const temp = 0.3 * Math.exp(-since / 2.5);
          let wrong = 0;
          for (let k = 0; k < K; k++) {
            const c = cur[k], tg = tgt[k];
            for (let rep = 0; rep < 2; rep++) {
              const b = R.int(0, 34);
              if (c[b] !== tg[b] || R() < temp) c[b] ^= 1;
            }
            for (let b = 0; b < 35; b++) if (c[b] !== tg[b]) wrong++;
          }
          if (!wrong) { hold += dt; if (hold > 3) phrase(); }
          d.fill(BLACK);
          for (let k = 0; k < K; k++) {
            const cx = ox + (k % cols) * sw, cy = oy + (k / cols | 0) * sh, col = lut[(h0 + (k % cols) / cols * span + (k / cols | 0) * 9) & 255], dim = X.shade(col, 0.28);
            for (let b = 0; b < 35; b++) if (cur[k][b]) X.rect(g, cx + (b % 5) * s, cy + (b / 5 | 0) * s, s, s, tgt[k][b] ? col : dim);
          }
        };
        // open a moment in: the words are already surfacing from the noise
        for (let k = 0; k < 7; k++) fr(k / 12, 1 / 12);
        return (t, dt) => fr(t + 7 / 12, dt);
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, s = n >= 200 ? R.pick([2, 3, 3, 4]) : R.pick([1, 2, 2]), sw = 6 * s, sh = 9 * s, cols = Math.floor(n / sw), rows = Math.floor(n / sh), ox = (n - cols * sw + s) >> 1, oy = (n - rows * sh + 2 * s) >> 1;
      const sc = U.scheme(R, 0.6), lut = sc.lut, h0 = R.range(0, 256), span = R.pick([256, 160, 90]), K = cols * rows, cmode = R.pick(['column', 'word', 'mono', 'heat']), speed = R.pick([1, 2, 2, 3]), ghost = R.range(0.15, 0.35);
      const mono = R.pick([X.rgb(90, 255, 120), X.rgb(255, 176, 40), X.rgb(120, 220, 255), WHITE]);
      g.trait('Palette', cmode === 'mono' ? ['Phosphor', 'Amber', 'Ice', 'White'][[X.rgb(90, 255, 120), X.rgb(255, 176, 40), X.rgb(120, 220, 255), WHITE].indexOf(mono)] : schemeName(sc));
      g.trait('Colour by', { column: 'Column', word: 'Word', mono: 'One ink', heat: 'Error' }[cmode]); g.trait('Type', s * 100 / n < 1.5 ? 'Small' : s * 100 / n < 2.5 ? 'Medium' : 'Large');
      g.trait('Ghosts', ghost < 0.22 ? 'Faint' : ghost < 0.29 ? 'Dim' : 'Bright'); g.trait('Grid', n);
      const cur = Array.from({ length: K }, () => Uint8Array.from({ length: 35 }, () => R.bool(0.45) ? 1 : 0)), tgt = Array.from({ length: K }, () => new Uint8Array(35)), wordId = new Uint16Array(K), err = new Uint8Array(K);
      let since = 0, hold = 0;
      const phrase = () => {
        const lines = []; let line = '', id = 0;
        while (lines.length < rows) { const w = R.pick(WORDS); if (w.length > cols) continue; if ((line + w).length > cols) { lines.push(line.padEnd(cols)); line = ''; } line += w + ' '; }
        const txt = lines.join('').slice(0, K).padEnd(K);
        for (let k = 0; k < K; k++) { if (txt[k] === ' ') id++; wordId[k] = id; const rws = X.FONT[txt[k]] || X.FONT[' ']; for (let b = 0; b < 35; b++) tgt[k][b] = rws[b / 5 | 0] >> (4 - b % 5) & 1; }
        since = 0; hold = 0;
      };
      phrase();
      const fr = (t, dt) => {
        for (const tap of inp.taps()) {
          const cx = Math.floor((tap.x * n - ox) / sw), cy = Math.floor((tap.y * n - oy) / sh);
          for (let k = 0; k < K; k++) if (Math.abs(k % cols - cx) <= 2 && Math.abs((k / cols | 0) - cy) <= 1) for (let b = 0; b < 35; b++) cur[k][b] = R.bool(0.45) ? 1 : 0;
          since = Math.min(since, 1.5); hold = 0;
        }
        since += dt;
        const temp = 0.3 * Math.exp(-since / 2.5);
        let wrong = 0;
        for (let k = 0; k < K; k++) {
          const c = cur[k], tg = tgt[k];
          for (let rep = 0; rep < speed; rep++) { const b = R.int(0, 34); if (c[b] !== tg[b] || R() < temp) c[b] ^= 1; }
          let e = 0;
          for (let b = 0; b < 35; b++) if (c[b] !== tg[b]) e++;
          err[k] = e; wrong += e;
        }
        if (!wrong) { hold += dt; if (hold > 3) phrase(); }
        d.fill(BLACK);
        for (let k = 0; k < K; k++) {
          const cx = ox + (k % cols) * sw, cy = oy + (k / cols | 0) * sh;
          const col = cmode === 'mono' ? mono : cmode === 'word' ? lut[(h0 + wordId[k] * 37) & 255] : cmode === 'heat' ? lut[(h0 + Math.min(1, err[k] / 12) * span) & 255] : lut[(h0 + (k % cols) / cols * span + (k / cols | 0) * 9) & 255];
          const dim = X.shade(col, ghost);
          for (let b = 0; b < 35; b++) if (cur[k][b]) X.rect(g, cx + (b % 5) * s, cy + (b / 5 | 0) * s, s, s, tgt[k][b] ? col : dim);
        }
      };
      for (let k = 0; k < 7; k++) fr(k / 12, 1 / 12);
      return (t, dt) => fr(t + 7 / 12, dt);
    },
  });

  add({
    name: 'Vigenère', seed: 4, sizes: [200], fps: 12,
    recipe: 'The square table of a Vigenère cipher, every row the alphabet shifted one place, coloured by letter so its diagonals run as rainbow bands. It slides slowly while a message from the collection is enciphered letter by letter, each cipher letter lighting its whole diagonal in white.',
    make(R, U, g) {
      const { n, d } = g, T = 8, lut = U.scheme(R, 0.65).lut, h0 = R.range(0, 256), v = R.range(3, 7), msg = R.shuffle(WORDS.slice()).join(''), key = R.pick(WORDS);
      const glyph = Array.from({ length: 26 }, (_, L) => X.FONT[String.fromCharCode(65 + L)]), bgOf = glyph.map((_, L) => lut[(h0 + L * 256 / 26) & 255]), edgeOf = bgOf.map(c => X.shade(c, 0.7));
      // tile by tile: every tile is one letter on its own colour, with a darker edge
      return t => {
        const off = Math.floor(t * v), step = Math.floor(t / 0.75), p = msg.charCodeAt(step % msg.length) - 65, kk = key.charCodeAt(step % key.length) - 65, c = mod(p + kk, 26);
        const lit = 1 - (t / 0.75 - step), hotBg = X.mixPk(bgOf[c], WHITE, 0.45 + 0.55 * lit), hotEdge = X.shade(hotBg, 0.7), c0 = Math.floor(off / T), sx = c0 * T - off;
        for (let r = 0; r * T < n; r++) for (let k = 0; sx + k * T < n; k++) {
          const L = mod(c0 + k + r, 26), bg = L === c ? hotBg : bgOf[L], edge = L === c ? hotEdge : edgeOf[L], gl = glyph[L], x0 = sx + k * T, y0 = r * T;
          for (let yy = 0; yy < T; yy++) {
            const Y = y0 + yy; if (Y >= n) break;
            const bits = yy >= 1 && yy <= 7 ? gl[yy - 1] : 0;
            for (let xx = 0; xx < T; xx++) {
              const Xp = x0 + xx; if (Xp < 0 || Xp >= n) continue;
              d[Y * n + Xp] = xx >= 1 && xx <= 5 && (bits >> (5 - xx) & 1) ? BLACK : xx === 0 || yy === 0 ? edge : bg;
            }
          }
        }
      };
    },
  });

  add({
    name: 'Morph', seed: 4, sizes: [80, 100], fps: 12,
    interactive: 'Click to send the letters on to the next words.',
    recipe: 'One set of words turns into the next by growth and erosion alone: cells outside the new words are eaten from their edges, cells inside them grow from their neighbours. Every cell keeps the colour of the moment it was born, so each word is striped with the history of its making.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, sc0 = U.scheme(R, 0.6), lut = sc0.lut, words = R.shuffle(SHORT.slice()), h0 = R.range(0, 256), rate = R.range(25, 60);
        g.trait('Palette', schemeName(sc0)); g.trait('Lines', 3); g.trait('Embers', 'Yes'); g.trait('Ground', 'Black'); g.trait('Grid', n);
        const cur = new Uint8Array(N), prev = new Uint8Array(N), born = new Float32Array(N), died = new Float32Array(N).fill(-99);
        let wi = 0;
        const three = () => placedLines([words[wi++ % words.length], words[wi++ % words.length], words[wi++ % words.length]], n, 0.9).M;
        let tgt = three(), since = 0;
        cur.set(tgt);
        for (let i = 0; i < N; i++) born[i] = -2 * ((i % n) * 0.35 + (i / n | 0)) / (1.35 * n);   // the opening words as if grown from the top down: smooth stripes, not speckle
        return (t, dt) => {
          if (g.input.taps().length && since > 1) since = 99;
          since += dt;
          if (since > 9) { tgt = three(); since = 0; }
          prev.set(cur);
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const i = y * n + x, c = prev[i];
            if (c === tgt[i] || R() > 0.3) continue;
            if (c) { if ((x && !prev[i - 1]) || (x < n - 1 && !prev[i + 1]) || (y && !prev[i - n]) || (y < n - 1 && !prev[i + n]) || R() < 0.004) { cur[i] = 0; died[i] = t; } }
            else {
              let nb = 0;
              for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < n && yy < n && prev[yy * n + xx]) nb++; }
              if (nb || R() < 0.003) { cur[i] = 1; born[i] = t; }
            }
          }
          for (let i = 0; i < N; i++) {
            if (cur[i]) d[i] = lut[(h0 + born[i] * rate) & 255];
            else { const a = t - died[i]; d[i] = a < 1.2 ? X.shade(lut[(h0 + died[i] * rate) & 255], 0.4 * (1 - a / 1.2)) : BLACK; }
          }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, N = n * n, inp = g.input, sc0 = U.scheme(R, 0.6), lut = sc0.lut, words = R.shuffle(SHORT.slice()), h0 = R.range(0, 256), rate = R.range(25, 60) * R.pick([1, 1, 0.4]);
      const k = R.pick([1, 2, 3, 3]), eat = R.range(0.15, 0.4), wait = R.range(6, 11), embers = R.bool(0.6), bg = R.bool(0.7) ? BLACK : X.shade(lut[R.int(0, 255)], 0.1);
      g.trait('Palette', schemeName(sc0)); g.trait('Lines', k); g.trait('Embers', embers ? 'Yes' : 'No'); g.trait('Ground', bg === BLACK ? 'Black' : 'Tinted'); g.trait('Grid', n);
      const cur = new Uint8Array(N), prev = new Uint8Array(N), born = new Float32Array(N), died = new Float32Array(N).fill(-99);
      let wi = 0;
      const lines = () => placedLines(Array.from({ length: k }, () => words[wi++ % words.length]), n, 0.9).M;
      let tgt = lines(), since = 0;
      cur.set(tgt);
      for (let i = 0; i < N; i++) born[i] = -2 * ((i % n) * 0.35 + (i / n | 0)) / (1.35 * n);
      return (t, dt) => {
        if (inp.taps().length && since > 1) since = 99;
        since += dt;
        if (since > wait) { tgt = lines(); since = 0; }
        prev.set(cur);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, c = prev[i];
          if (c === tgt[i] || R() > eat) continue;
          if (c) { if ((x && !prev[i - 1]) || (x < n - 1 && !prev[i + 1]) || (y && !prev[i - n]) || (y < n - 1 && !prev[i + n]) || R() < 0.004) { cur[i] = 0; died[i] = t; } }
          else {
            let nb = 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < n && yy < n && prev[yy * n + xx]) nb++; }
            if (nb || R() < 0.003) { cur[i] = 1; born[i] = t; }
          }
        }
        for (let i = 0; i < N; i++) {
          if (cur[i]) d[i] = lut[(h0 + born[i] * rate) & 255];
          else { const a = t - died[i]; d[i] = embers && a < 1.2 ? X.shade(lut[(h0 + died[i] * rate) & 255], 0.4 * (1 - a / 1.2)) : bg; }
        }
      };
    },
  });

  add({
    name: 'Specimen', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'A type specimen in motion: the collection’s words repeated in bands from the smallest size to the largest, each band sliding at a speed set by its size, so the page moves like parallax. Bands alternate between coloured letters on black and black letters cut from colour.',
    make(R, U, g) {
      const { n, d } = g, lut = U.scheme(R, 0.6).lut, h0 = R.range(0, 256), dh = R.range(18, 45), base = R.range(1.5, 3.5), unit = n / 100;
      const bands = [];
      let y = 1, k = 0;
      while (y < n) {
        const s = Math.max(1, Math.round((1 + (k % 5)) * unit)), w = R.pick(WORDS), gm = glyphs(w + '  ', s), h = gm.h + Math.max(1, Math.round(1.5 * unit));
        bands.push({ y, s, gm, h, v: base * s * (k & 1 ? -1 : 1), inv: R.bool(0.35), col: lut[(h0 + k * dh) & 255] });
        y += h; k++;
      }
      return t => {
        d.fill(BLACK);
        for (const b of bands) {
          const off = Math.floor(t * b.v);
          for (let yy = 0; yy < b.h; yy++) {
            const Y = b.y + yy; if (Y >= n) break;
            for (let x = 0; x < n; x++) {
              const gx = mod(x + off, b.gm.w), on = yy < b.gm.h && b.gm.m[yy * b.gm.w + gx];
              d[Y * n + x] = b.inv ? (on ? BLACK : yy < b.gm.h ? b.col : BLACK) : on ? b.col : BLACK;
            }
          }
        }
      };
    },
  });
})();
