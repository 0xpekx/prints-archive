// Automata: discrete rules stepped on a grid of cells.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000, WHITE = 0xffffffff;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);

  // The cell under each tap in the large view (an empty list in tiles).
  const tapsAt = (g, n) => g.input.taps().map(p => ({ x: Math.min(n - 1, Math.max(0, Math.floor(p.x * n))), y: Math.min(n - 1, Math.max(0, Math.floor(p.y * n))) }));
  // Listen (large view, microphone on): claps or beats heard since the last frame, and how loud the room is; 0 otherwise.
  const heard = g => g.input.listening ? g.input.beats() : 0;
  const loudness = g => g.input.listening ? g.input.level : 0;

  P.add({
    interactive: 'Click or drag to splash fresh noise; it gets eaten into spirals.',
    name: 'Cyclic', seed: 1, fam: 'Automata', type: 'px', n: 110,
    recipe: 'Every cell is eaten by the next colour in a ring of colours; noise organises itself into turning spirals, crystals or turbulence, depending on the neighbourhood, the threshold and the number of colours.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n;
        const [rad, moore, thr, k] = R.pick([[1, true, 1, R.int(12, 16)], [1, true, 1, R.int(12, 16)], [1, false, 1, R.int(9, 12)], [2, true, 3, R.int(8, 10)]]);
        let a = new Uint8Array(N).map(() => R.int(0, k - 1)), b = new Uint8Array(N);
        const offs = [];
        for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) if ((dx || dy) && (moore || Math.abs(dx) + Math.abs(dy) <= rad)) offs.push(dx, dy);
        const step = () => {
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const s = a[i], want = s + 1 === k ? 0 : s + 1;
            let c = 0;
            for (let o = 0; o < offs.length && c < thr; o += 2) {
              let xx = x + offs[o], yy = y + offs[o + 1];
              if (xx < 0) xx += n; else if (xx >= n) xx -= n;
              if (yy < 0) yy += n; else if (yy >= n) yy -= n;
              if (a[yy * n + xx] === want) c++;
            }
            b[i] = c >= thr ? want : s;
          }
          const tmp = a; a = b; b = tmp;
        };
        for (let i = 0; i < 70; i++) step();
        const drift = R.range(2, 5) * R.sign(), slow = k < 11 ? 2 : 1;
        const splash = (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) a[((cy + y + n) % n) * n + (cx + x + n) % n] = g.alt.int(0, k - 1); };
        g.trait('Palette', palName(sc)); g.trait('Neighbourhood', rad === 2 ? 'Wide' : moore ? 'Square' : 'Cross'); g.trait('Colours', k); g.trait('Threshold', thr); g.trait('Look', 'Wheel');
        return (t, dt, f) => {
          for (const p of tapsAt(g, n)) splash(p.x, p.y, 8);
          if (g.input.down && g.input.inside) splash(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 4);
          if (f % slow === 0) step();
          const hd = t * drift, m = 256 / k;
          for (let i = 0; i < N; i++) d[i] = sc.lut[(a[i] * m + hd) & 255];
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n;
      const [rad, moore, thr, k] = R.pick([[1, true, 1, R.int(12, 16)], [1, true, 1, R.int(12, 16)], [1, false, 1, R.int(9, 12)], [2, true, 3, R.int(8, 10)],
        [1, true, 2, R.int(5, 8)], [2, false, 2, R.int(5, 7)], [3, true, 5, R.int(6, 8)], [2, true, 4, R.int(4, 6)]]);
      let a = new Uint8Array(N).map(() => R.int(0, k - 1)), b = new Uint8Array(N);
      const offs = [];
      for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) if ((dx || dy) && (moore || Math.abs(dx) + Math.abs(dy) <= rad)) offs.push(dx, dy);
      const step = () => {
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const s = a[i], want = s + 1 === k ? 0 : s + 1;
          let c = 0;
          for (let o = 0; o < offs.length && c < thr; o += 2) {
            let xx = x + offs[o], yy = y + offs[o + 1];
            if (xx < 0) xx += n; else if (xx >= n) xx -= n;
            if (yy < 0) yy += n; else if (yy >= n) yy -= n;
            if (a[yy * n + xx] === want) c++;
          }
          b[i] = c >= thr ? want : s;
        }
        const tmp = a; a = b; b = tmp;
      };
      for (let i = 0; i < 70; i++) step();
      const drift = R.range(2, 5) * R.sign(), slow = k < 11 ? 2 : 1, look = R.pick(['wheel', 'wheel', 'bands', 'edges']), dimLut = U.dim(sc.lut, 0.35);
      const splash = (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) a[((cy + y + n) % n) * n + (cx + x + n) % n] = R.int(0, k - 1); };
      g.trait('Palette', palName(sc)); g.trait('Neighbourhood', rad === 3 ? 'Widest' : rad === 2 ? 'Wide' : moore ? 'Square' : 'Cross'); g.trait('Colours', k); g.trait('Threshold', thr); g.trait('Look', { wheel: 'Wheel', bands: 'Bands', edges: 'Edges' }[look]);
      return (t, dt, f) => {
        for (const p of tapsAt(g, n)) splash(p.x, p.y, 8);
        if (g.input.down && g.input.inside) splash(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 4);
        if (f % slow === 0) step();
        const hd = t * drift, m = 256 / k;
        for (let i = 0; i < N; i++) {
          const v = a[i], c = (v * m + hd) & 255;
          d[i] = look === 'bands' ? (v & 1 ? sc.lut : dimLut)[c] : look === 'edges' && a[(i + 1) % N] !== v ? BLACK : sc.lut[c];
        }
      };
    },
  });
  P.add({
    interactive: 'Click or hold to pour sand where you point.',
    listens: 'Clap and a handful of sand lands on the piles; the louder the room, the faster it pours.',
    name: 'Sandpile', fam: 'Automata', type: 'px', n: 101,
    recipe: 'Grains pour onto one point, a few, a line, a ring or a lattice of them; any cell holding four topples onto its neighbours, and fractal carpets spread until they grow into each other.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.38) return (function () {   // (the original look: still more than a third of the rolls)
        const { n, d } = g, sc = U.scheme(R), N = n * n, h = new Int32Array(N);
        const cols = [BLACK, U.pk(U.ramp(sc.cols, 0.1, true)), U.pk(U.ramp(sc.cols, 0.45, true)), U.pk(U.ramp(sc.cols, 0.8, true))];
        let src, rate, lost, born;
        const reset = t => {
          h.fill(0); lost = 0; born = t;
          const k = R.pick([1, 1, 2, 3, 4]), c = n >> 1, spread = R.int(8, 26), turn = R.range(0, 6);
          src = k === 1 ? [c * n + c] : Array.from({ length: k }, (_, i) => (c + Math.round(spread * Math.sin(turn + i * U.TAU / k))) * n + c + Math.round(spread * Math.cos(turn + i * U.TAU / k)));
          rate = Math.max(2, Math.round(R.range(10, 16) / k));
        };
        const relax = sweeps => {
          for (let s = 0; s < sweeps; s++) {
            let any = false;
            for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) {
              const v = h[i];
              if (v >= 4) { const q = v >> 2; h[i] = v & 3; h[i - 1] += q; h[i + 1] += q; h[i - n] += q; h[i + n] += q; any = true; }
            }
            for (let i = 0; i < n; i++) { lost += h[i] + h[N - 1 - i] + h[i * n] + h[i * n + n - 1]; h[i] = h[N - 1 - i] = h[i * n] = h[i * n + n - 1] = 0; }
            if (!any) break;
          }
        };
        reset(0);
        for (let k = 0; k < 24; k++) { for (const s of src) h[s] += Math.round(420 / src.length); relax(600); }
        let endAt = 0;
        g.trait('Palette', palName(sc)); g.trait('Layout', src.length === 1 ? 'Single pile' : 'Piles'); g.trait('First piles', src.length); g.trait('Topple', 'Four ways'); g.trait('Grains', 'Fine'); g.trait('Look', 'Levels');
        return t => {
          for (const p of tapsAt(g, n)) h[p.y * n + p.x] += 300;
          if (g.input.down && g.input.inside) h[Math.min(n - 1, Math.floor(g.input.y * n)) * n + Math.min(n - 1, Math.floor(g.input.x * n))] += 24;
          if (endAt && t > endAt) { reset(t); for (const s of src) h[s] += Math.round(900 / src.length); endAt = 0; }
          for (let b = heard(g); b > 0; b--) h[src[g.alt.int(0, src.length - 1)]] += 500;   // a clap drops a handful on a pile
          const loud = 1 + loudness(g) * 4;
          for (const s of src) h[s] += loud > 1 ? Math.round(rate * loud) : rate;
          relax(40);
          if (!endAt && lost > 400) endAt = t + 6;
          for (let i = 0; i < N; i++) d[i] = h[i] > 3 ? WHITE : cols[h[i]];
          if (endAt) U.fadePx(d, (endAt - t) / 1.2);
          else U.fadePx(d, (t - born) / 0.8 + (born ? 0 : 1));
        };
      })();
      // otherwise one of the newer variations
      // big grains (a rarer kind): the pile is simulated at half the resolution and drawn two cells to a grain
      const G = g.n, big = g.alt.bool(0.3), n = big ? Math.ceil(G / 2) : G, d = g.d, sc = U.scheme(R), N = n * n, h = new Int32Array(N);
      const mode = R.pick(['piles', 'scatter', 'lattice', 'line', 'ring']);
      // eight-way piles (a rarer kind) topple onto all eight neighbours at eight grains and grow octagonal carpets
      const eight = g.alt.bool(0.4), K = eight ? 8 : 4, look = g.alt.pick(['levels', 'levels', 'lace']);
      const cols = eight ? [BLACK, ...Array.from({ length: 7 }, (_, i) => U.pk(U.ramp(sc.cols, 0.05 + i * 0.13, true)))] : [BLACK, U.pk(U.ramp(sc.cols, 0.1, true)), U.pk(U.ramp(sc.cols, 0.45, true)), U.pk(U.ramp(sc.cols, 0.8, true))];
      const lace = U.pk(U.mix(U.ramp(sc.cols, 0.3, true), [0, 0, 0], 0.78));   // the lace look: only full cells lit, over a faint ground
      let src, rate, lost, born;
      const reset = t => {
        h.fill(0); lost = 0; born = t;
        const c = n >> 1;
        if (mode === 'piles') {
          const k = R.pick([1, 1, 2, 3, 4, 5]), spread = Math.round(n * R.range(0.1, 0.28)), turn = R.range(0, 6);
          src = k === 1 ? [c * n + c] : Array.from({ length: k }, (_, i) => (c + Math.round(spread * Math.sin(turn + i * U.TAU / k))) * n + c + Math.round(spread * Math.cos(turn + i * U.TAU / k)));
        } else if (mode === 'line') { const y = c + R.int(-n >> 3, n >> 3), m = R.int(3, 7); src = Array.from({ length: m }, (_, i) => y * n + Math.round(n * (i + 1) / (m + 1))); }
        else if (mode === 'scatter') { const m = R.int(4, 8); src = Array.from({ length: m }, () => R.int(Math.round(n * 0.15), Math.round(n * 0.85)) * n + R.int(Math.round(n * 0.15), Math.round(n * 0.85))); }
        else if (mode === 'ring') { const m = R.int(6, 12), r = n * R.range(0.18, 0.32); src = Array.from({ length: m }, (_, i) => Math.round(c + r * Math.sin(i * U.TAU / m)) * n + Math.round(c + r * Math.cos(i * U.TAU / m))); }
        else { const k = R.pick([2, 3]), m = n / k; src = []; for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) src.push(Math.round(m * (a + 0.5)) * n + Math.round(m * (b + 0.5))); }
        rate = Math.max(2, Math.round(R.range(10, 16) * (n / 100) ** 2 * 3 / Math.max(1, src.length) * (eight ? 1.8 : 1)));
      };
      const relax = sweeps => {
        for (let s = 0; s < sweeps; s++) {
          let any = false;
          for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) {
            const v = h[i];
            if (v >= K) { const q = eight ? v >> 3 : v >> 2; h[i] = v & (K - 1); h[i - 1] += q; h[i + 1] += q; h[i - n] += q; h[i + n] += q; if (eight) { h[i - n - 1] += q; h[i - n + 1] += q; h[i + n - 1] += q; h[i + n + 1] += q; } any = true; }
          }
          for (let i = 0; i < n; i++) { lost += h[i] + h[N - 1 - i] + h[i * n] + h[i * n + n - 1]; h[i] = h[N - 1 - i] = h[i * n] = h[i * n + n - 1] = 0; }
          if (!any) break;
        }
      };
      reset(0);
      const warm = Math.round(n * n * (mode === 'piles' ? 1.1 : 0.45) * (eight ? 1.8 : 1));
      for (let k = 0; k < 24; k++) { for (const s of src) h[s] += Math.round(warm / 24 / src.length); relax(n * 6); }
      let endAt = 0;
      g.trait('Palette', palName(sc)); g.trait('Layout', { piles: src.length === 1 ? 'Single pile' : 'Piles', lattice: 'Lattice', line: 'Line', ring: 'Ring', scatter: 'Scatter' }[mode]); g.trait('First piles', src.length); g.trait('Topple', eight ? 'Eight ways' : 'Four ways'); g.trait('Grains', big ? 'Large' : 'Fine'); g.trait('Look', look === 'lace' ? 'Lace' : 'Levels');
      return (t, dt) => {
        if (endAt && t > endAt) { reset(t); for (const s of src) h[s] += Math.round(warm / 2 / src.length); endAt = 0; }
        for (const p of tapsAt(g, n)) h[p.y * n + p.x] += 300;
        if (g.input.down && g.input.inside) h[Math.min(n - 1, Math.floor(g.input.y * n)) * n + Math.min(n - 1, Math.floor(g.input.x * n))] += 24;
        for (let b = heard(g); b > 0; b--) h[src[g.alt.int(0, src.length - 1)]] += 500;   // a clap drops a handful on a pile
        const loud = 1 + loudness(g) * 4;
        for (const s of src) h[s] += loud > 1 ? Math.round(rate * loud) : rate;
        relax(40);
        if (!endAt && lost > N * 0.05) endAt = t + 6;
        if (G === n && look === 'levels') for (let i = 0; i < N; i++) d[i] = h[i] >= K ? WHITE : cols[h[i]];
        else for (let y = 0, i = 0; y < G; y++) for (let x = 0; x < G; x++, i++) { const v = h[(G === n ? y : y >> 1) * n + (G === n ? x : x >> 1)]; d[i] = v >= K ? WHITE : look === 'lace' ? (v === K - 1 ? cols[K - 1] : v ? lace : BLACK) : cols[v]; }
        if (endAt) U.fadePx(d, (endAt - t) / 1.2);
        else U.fadePx(d, (t - born) / 0.8 + (born ? 0 : 1));
      };
    },
  });
  P.add({
    interactive: 'Click to set a new ant down.',
    name: 'Turmites', seed: 2, fam: 'Automata', type: 'px', n: 120,
    recipe: 'A few ants turn left or right by the colour underfoot and repaint it; simple rules grow into highways, spirals, filled squares and architecture, and ants that meet build on each other’s work.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, cell = new Uint8Array(N);
        const rule = R.pick(['LLRR', 'LLRR', 'RLLR', 'LRRRRRLLR', 'LLRRRLRLRLLR', 'RRLLLRLLLRRR']), k = rule.length;
        const cols = new Uint32Array(k);
        for (let i = 1; i < k; i++) cols[i] = U.pk(U.ramp(sc.cols, (i - 1) / (k - 1), true));
        cols[0] = BLACK;
        const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], speed = R.int(250, 600);
        let ants, born = 0;
        const reset = t => {
          cell.fill(0); born = t;
          const c = R.pick([1, 2, 2, 3]);
          ants = Array.from({ length: c }, (_, i) => ({ x: (n >> 1) + (c === 1 ? 0 : Math.round(22 * Math.cos(i * U.TAU / c))), y: (n >> 1) + (c === 1 ? 0 : Math.round(22 * Math.sin(i * U.TAU / c))), dir: (i * 4 / c) & 3 }));
        };
        const walk = steps => {
          for (let s = 0; s < steps; s++) for (const a of ants) {
            const i = a.y * n + a.x, c = cell[i];
            a.dir = (a.dir + (rule[c] === 'R' ? 1 : 3)) & 3;
            cell[i] = (c + 1) % k;
            a.x = (a.x + DX[a.dir] + n) % n; a.y = (a.y + DY[a.dir] + n) % n;
          }
        };
        reset(0);
        walk(30000);
        const life0 = R.range(50, 70);
        let life = life0;   // cut short when the board has gone to noise
        g.trait('Palette', palName(sc)); g.trait('Rule', rule); g.trait('First ants', ants.length); g.trait('Start', ants.length === 1 ? 'Centre' : 'Ring'); g.trait('Ground', 'Black');
        return t => {
          if (t - born > life) { reset(t); walk(4000); life = life0; }
          for (const p of tapsAt(g, n)) if (ants.length < 12) ants.push({ x: p.x, y: p.y, dir: g.alt.int(0, 3) });
          walk(speed);
          let full = 0;
          for (let i = 0; i < N; i++) { const c = cell[i]; d[i] = cols[c]; if (c) full++; }
          if (full > N * 0.8 && t - born > 12 && life - (t - born) > 1.6) life = t - born + 1.6;   // a board churned to noise fades out for a fresh one
          for (const a of ants) d[a.y * n + a.x] = WHITE;
          U.fadePx(d, Math.min((t - born) / 0.8 + (born ? 0 : 1), (life - (t - born)) / 1.5));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, cell = new Uint8Array(N);
      const rule = R.pick(['LLRR', 'LLRR', 'RLLR', 'LRRRRRLLR', 'LLRRRLRLRLLR', 'RRLLLRLLLRRR', 'RL', 'RLR', 'LRRL', 'RRLRR', 'LRRRRLLLRRR', 'RRLLLRLLLLLLLLL']), k = rule.length;
      const cols = new Uint32Array(k), dark = R.bool(0.75);
      for (let i = 1; i < k; i++) cols[i] = U.pk(U.ramp(sc.cols, (i - 1) / (k - 1), true));
      cols[0] = dark ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.82));
      const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], speed = R.int(250, 900), start = R.pick(['centre', 'ring', 'scatter', 'line']);
      let ants, born = 0;
      const reset = t => {
        cell.fill(0); born = t;
        const c = R.pick([1, 2, 2, 3, 4, 6]);
        ants = Array.from({ length: c }, (_, i) => {
          const th = i * U.TAU / c;
          const [x, y] = c === 1 || start === 'centre' ? [(n >> 1) + i, n >> 1] : start === 'ring' ? [(n >> 1) + Math.round(n * 0.2 * Math.cos(th)), (n >> 1) + Math.round(n * 0.2 * Math.sin(th))]
            : start === 'line' ? [Math.round(n * (i + 1) / (c + 1)), n >> 1] : [R.int(0, n - 1), R.int(0, n - 1)];
          return { x: (x + n) % n, y: (y + n) % n, dir: (i * 4 / c) & 3 };
        });
      };
      const walk = steps => {
        for (let s = 0; s < steps; s++) for (const a of ants) {
          const i = a.y * n + a.x, c = cell[i];
          a.dir = (a.dir + (rule[c] === 'R' ? 1 : 3)) & 3;
          cell[i] = (c + 1) % k;
          a.x = (a.x + DX[a.dir] + n) % n; a.y = (a.y + DY[a.dir] + n) % n;
        }
      };
      reset(0);
      walk(R.int(20000, 60000));
      const life0 = R.range(50, 70);
        let life = life0;   // cut short when the board has gone to noise
      g.trait('Palette', palName(sc)); g.trait('Rule', rule); g.trait('First ants', ants.length); g.trait('Start', ants.length === 1 ? 'Centre' : { centre: 'Centre', ring: 'Ring', scatter: 'Scatter', line: 'Line' }[start]); g.trait('Ground', dark ? 'Black' : 'Tinted');
      return t => {
        if (t - born > life) { reset(t); walk(4000); life = life0; }
        for (const p of tapsAt(g, n)) if (ants.length < 12) ants.push({ x: p.x, y: p.y, dir: R.int(0, 3) });
        walk(speed);
        let full = 0;
          for (let i = 0; i < N; i++) { const c = cell[i]; d[i] = cols[c]; if (c) full++; }
          if (full > N * 0.8 && t - born > 12 && life - (t - born) > 1.6) life = t - born + 1.6;   // a board churned to noise fades out for a fresh one
        for (const a of ants) d[a.y * n + a.x] = WHITE;
        U.fadePx(d, Math.min((t - born) / 0.8 + (born ? 0 : 1), (life - (t - born)) / 1.5));
      };
    },
  });
  P.add({
    interactive: 'Click a wire to send an electron down it.',
    name: 'Wireworld', seed: 1, fam: 'Automata', type: 'px', n: 96,
    recipe: 'Wires carry electrons: a head, then a tail, then wire again. Loops, a lattice of crossings or rings joined by spokes fill the board; where wires meet, signals split, collide and cancel.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n;
        let s = new Uint8Array(N), nx = new Uint8Array(N);
        const tint = new Uint8Array(N), loops = R.int(9, 13), wires = [];
        const snap = v => Math.round(v / 3) * 3;
        for (let l = 0; l < loops; l++) {
          const w = snap(R.int(12, 54)), hh = snap(R.int(12, 54)), x0 = snap(R.int(3, n - w - 4)), y0 = snap(R.int(3, n - hh - 4));
          for (let x = x0; x <= x0 + w; x++) for (const y of [y0, y0 + hh]) { s[y * n + x] = 1; tint[y * n + x] = l; }
          for (let y = y0; y <= y0 + hh; y++) for (const x of [x0, x0 + w]) { s[y * n + x] = 1; tint[y * n + x] = l; }
          for (let e = 0, m = R.int(1, 3); e < m; e++) { const x = x0 + 2 + R.int(0, w - 4); s[y0 * n + x] = 2; s[y0 * n + x - 1] = 3; }
        }
        for (let i = 0; i < N; i++) if (s[i]) wires.push(i);
        const dimc = [], lit = [];
        for (let l = 0; l < loops; l++) { const c = U.ramp(sc.cols, l / loops, true); dimc.push(U.pk(U.mix([0, 0, 0], c, 0.45))); lit.push(U.pk(c)); }
        const nb = [-n - 1, -n, -n + 1, -1, 1, n - 1, n, n + 1];
        g.trait('Palette', palName(sc)); g.trait('Layout', 'Loops'); g.trait('Circuits', loops); g.trait('Wires', 'Plain');
        return () => {
          for (const p of tapsAt(g, n)) {
            let best = -1, bd = 26;
            for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const i = (p.y + y) * n + p.x + x; if (p.y + y >= 0 && p.y + y < n && p.x + x >= 0 && p.x + x < n && s[i] === 1 && x * x + y * y < bd) { bd = x * x + y * y; best = i; } }
            if (best >= 0) s[best] = 2;
          }
          let heads = 0;
          for (const i of wires) {
            const v = s[i];
            if (v === 2) nx[i] = 3;
            else if (v === 3) nx[i] = 1;
            else { let c = 0; for (let k = 0; k < 8; k++) if (s[i + nb[k]] === 2) c++; nx[i] = c === 1 || c === 2 ? 2 : 1; }
            if (nx[i] === 2) heads++;
          }
          if (heads === 0) { const i = wires[R.int(0, wires.length - 1)]; if (nx[i] === 1) nx[i] = 2; }
          const tmp = s; s = nx; nx = tmp;
          d.fill(BLACK);
          for (const i of wires) d[i] = s[i] === 2 ? WHITE : s[i] === 3 ? lit[tint[i]] : dimc[tint[i]];
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n;
      let s = new Uint8Array(N), nx = new Uint8Array(N);
      const tint = new Uint8Array(N), layout = R.pick(['loops', 'loops', 'lattice', 'rings', 'comb']);
      let groups = 1;
      const wire = (x, y, l) => { if (x >= 1 && y >= 1 && x < n - 1 && y < n - 1) { s[y * n + x] = 1; tint[y * n + x] = l; } };
      const box = (x0, y0, w, hh, l) => { for (let x = x0; x <= x0 + w; x++) { wire(x, y0, l); wire(x, y0 + hh, l); } for (let y = y0; y <= y0 + hh; y++) { wire(x0, y, l); wire(x0 + w, y, l); } };
      const spark = (x, y) => { if (s[y * n + x] && s[y * n + x + 1]) { s[y * n + x + 1] = 2; s[y * n + x] = 3; } };
      if (layout === 'loops') {
        groups = R.int(7, 12);
        const snap = v => Math.round(v / 2) * 2;
        for (let l = 0; l < groups; l++) {
          const w = snap(R.int(n * 0.15, n * 0.6)), hh = snap(R.int(n * 0.15, n * 0.6)), x0 = snap(R.int(2, n - w - 3)), y0 = snap(R.int(2, n - hh - 3));
          box(x0, y0, w, hh, l);
          for (let e = 0, m = R.int(1, 3); e < m; e++) spark(x0 + 2 + R.int(0, w - 4), y0);
        }
      } else if (layout === 'lattice') {
        const gap = R.pick([5, 6, 8]), off = R.int(1, gap);
        groups = Math.ceil(n / gap) * 2;
        for (let y = off; y < n - 1; y += gap) for (let x = 1; x < n - 1; x++) wire(x, y, (y / gap) | 0);
        for (let x = off; x < n - 1; x += gap) for (let y = 1; y < n - 1; y++) wire(x, y, ((x / gap) | 0) + (groups >> 1));
        for (let e = 0; e < R.int(3, 8); e++) spark(R.int(2, n - 3), off + gap * R.int(0, Math.floor((n - off - 2) / gap)));
      } else if (layout === 'rings') {
        const c = n >> 1, step = R.pick([3, 4, 5]);
        groups = Math.floor(c / step);
        for (let r = step, l = 0; r < c - 1; r += step, l++) box(c - r, c - r, 2 * r, 2 * r, l);
        const spokes = R.pick([1, 2, 4]);
        for (let sp = 0; sp < spokes; sp++) for (let r = 0; r < c - 1; r++) { const dx = [1, 0, -1, 0][sp], dy = [0, 1, 0, -1][sp]; wire(c + dx * r, c + dy * r, groups - 1); }
        for (let e = 0; e < R.int(2, 5); e++) { const r = step * R.int(1, groups - 1); spark(c - r + R.int(1, 2 * r - 2), c - r); }
      } else {
        // a bus of parallel wires with rungs between them
        const gap = R.pick([3, 4]), rung = R.pick([7, 9, 12]);
        groups = Math.floor(n / gap);
        for (let y = 2, l = 0; y < n - 2; y += gap, l++) { for (let x = 1; x < n - 1; x++) wire(x, y, l); for (let x = 3 + (l % 2) * (rung >> 1); x < n - 2; x += rung) for (let k = 1; k < gap; k++) wire(x, y + k, l); }
        for (let e = 0; e < R.int(3, 7); e++) spark(R.int(2, n - 4), 2 + gap * R.int(0, groups - 2));
      }
      const wires = [];
      for (let i = 0; i < N; i++) if (s[i]) wires.push(i);
      const dimc = [], lit = [], glow = R.bool(0.5);
      for (let l = 0; l < groups; l++) { const c = U.ramp(sc.cols, l / groups, true); dimc.push(U.pk(U.mix([0, 0, 0], c, glow ? 0.3 : 0.5))); lit.push(U.pk(c)); }
      const nb = [-n - 1, -n, -n + 1, -1, 1, n - 1, n, n + 1];
      const ground = R.bool(0.3) ? U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.9)) : BLACK;
      g.trait('Palette', palName(sc)); g.trait('Layout', { loops: 'Loops', lattice: 'Lattice', rings: 'Rings', comb: 'Bus' }[layout]); g.trait('Circuits', groups); g.trait('Wires', glow ? 'Glowing' : 'Plain'); g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted');
      return () => {
        for (const p of tapsAt(g, n)) {
          let best = -1, bd = 26;
          for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const i = (p.y + y) * n + p.x + x; if (p.y + y >= 0 && p.y + y < n && p.x + x >= 0 && p.x + x < n && s[i] === 1 && x * x + y * y < bd) { bd = x * x + y * y; best = i; } }
          if (best >= 0) s[best] = 2;
        }
        let heads = 0;
        for (const i of wires) {
          const v = s[i];
          if (v === 2) nx[i] = 3;
          else if (v === 3) nx[i] = 1;
          else { let c = 0; for (let k = 0; k < 8; k++) if (s[i + nb[k]] === 2) c++; nx[i] = c === 1 || c === 2 ? 2 : 1; }
          if (nx[i] === 2) heads++;
        }
        if (heads < 2) { const i = wires[R.int(0, wires.length - 1)]; if (nx[i] === 1) nx[i] = 2; }
        const tmp = s; s = nx; nx = tmp;
        d.fill(ground);
        for (const i of wires) d[i] = s[i] === 2 ? WHITE : s[i] === 3 ? lit[tint[i]] : dimc[tint[i]];
      };
    },
  });
  P.add({
    interactive: 'Click to plant a seed crystal.',
    name: 'Snow Crystal', fam: 'Automata', type: 'px', n: 160,
    recipe: 'A cell freezes when the right number of its neighbours already have; colour is the day it froze. On a six-sided grid it grows snowflakes, on a square grid carpets and crosses, from one seed or several that grow into each other.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), RH = 44, W = 2 * RH + 3, gen = new Int16Array(W * W), inside = new Uint8Array(W * W);
        const at = (q, r) => (r + RH + 1) * W + q + RH + 1, nb = [1, -1, W, -W, 1 - W, W - 1];
        for (let r = -RH; r <= RH; r++) for (let q = -RH; q <= RH; q++) if (Math.abs(q + r) <= RH) inside[at(q, r)] = 1;
        const map = new Int32Array(n * n), scale = n / (2 * RH + 2) / 1.0;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const py = (y - n / 2 + 0.5) / scale, px = (x - n / 2 + 0.5) / scale, rf = py / 0.866, qf = px - rf / 2;
          let q = Math.round(qf), r = Math.round(rf);
          const sf = -qf - rf, s = Math.round(sf), dq = Math.abs(q - qf), dr = Math.abs(r - rf), ds = Math.abs(s - sf);
          if (dq > dr && dq > ds) q = -r - s; else if (dr > ds) r = -q - s;
          map[y * n + x] = Math.abs(q) <= RH && Math.abs(r) <= RH && Math.abs(q + r) <= RH ? at(q, r) : -1;
        }
        const RULES = [[1], [1, 3], [1, 3, 5], [1, 4], [1, 5], [1, 6], [1, 3, 6]];
        let ruleA, ruleB, now, grown, hold, hue, born = 0;
        const reset = t => {
          gen.fill(0); gen[at(0, 0)] = 1; now = 1; grown = false; hold = 0; born = t;
          ruleA = R.pick(RULES); ruleB = R.bool(0.5) ? ruleA : R.pick(RULES); hue = R.range(3, 9);
        };
        reset(0);
        const grow = () => {
          const rule = now % 2 ? ruleA : ruleB, fresh = [];
          let edge = false;
          for (let r = -RH; r <= RH; r++) for (let q = -RH; q <= RH; q++) {
            const i = at(q, r);
            if (!inside[i] || gen[i]) continue;
            let c = 0;
            for (let k = 0; k < 6; k++) if (gen[i + nb[k]]) c++;
            if (c && rule.includes(c)) { fresh.push(i); if (Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)) >= RH - 1) edge = true; }
          }
          now++;
          for (const i of fresh) gen[i] = now;
          if (edge || !fresh.length) grown = true;
        };
        for (let k = 0; k < RH * 0.3 && !grown; k++) grow();   // open on a small crystal, not a single dot
        const drift = R.range(3, 6);
        g.trait('Palette', palName(sc)); g.trait('Grid', 'Hexagonal'); g.trait('Size', RH); g.trait('First rule', ruleA.join('·') + (ruleB === ruleA ? '' : ' / ' + ruleB.join('·'))); g.trait('Seeds', 1);
        return (t, dt, f) => {
          for (const p of g.input.taps()) { const m = map[Math.min(n - 1, Math.floor(p.y * n)) * n + Math.min(n - 1, Math.floor(p.x * n))]; if (m >= 0 && !grown && !gen[m]) gen[m] = now; }
          if (!grown) { if (f % 2 === 0) grow(); } else if ((hold += dt) > 7) reset(t);
          const hd = t * drift;
          for (let i = 0; i < n * n; i++) {
            const m = map[i], v = m < 0 ? 0 : gen[m];
            d[i] = v === 0 ? BLACK : v === now && !grown ? WHITE : sc.lut[(v * hue + hd) & 255];
          }
          U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, grown ? (7 - hold) / 1.2 : 1));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), grid = R.pick(['hex', 'hex', 'hex', 'square']);
      const RH = R.pick([28, 36, 44, 44]), W = 2 * RH + 3, gen = new Int16Array(W * W), inside = new Uint8Array(W * W);
      const at = (q, r) => (r + RH + 1) * W + q + RH + 1;
      const nbHex = [1, -1, W, -W, 1 - W, W - 1], nbSq = [1, -1, W, -W], nbSq8 = [1, -1, W, -W, W + 1, W - 1, -W + 1, -W - 1];
      const eight = R.bool(0.4), nb = grid === 'hex' ? nbHex : eight ? nbSq8 : nbSq;
      for (let r = -RH; r <= RH; r++) for (let q = -RH; q <= RH; q++) if (grid === 'square' || Math.abs(q + r) <= RH) inside[at(q, r)] = 1;
      const map = new Int32Array(n * n), scale = n / (2 * RH + 2);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        if (grid === 'square') { const q = Math.round((x - n / 2 + 0.5) / scale), r = Math.round((y - n / 2 + 0.5) / scale); map[y * n + x] = Math.abs(q) <= RH && Math.abs(r) <= RH ? at(q, r) : -1; continue; }
        const py = (y - n / 2 + 0.5) / scale, px = (x - n / 2 + 0.5) / scale, rf = py / 0.866, qf = px - rf / 2;
        let q = Math.round(qf), r = Math.round(rf);
        const sf = -qf - rf, s = Math.round(sf), dq = Math.abs(q - qf), dr = Math.abs(r - rf), ds = Math.abs(s - sf);
        if (dq > dr && dq > ds) q = -r - s; else if (dr > ds) r = -q - s;
        map[y * n + x] = Math.abs(q) <= RH && Math.abs(r) <= RH && Math.abs(q + r) <= RH ? at(q, r) : -1;
      }
      const RULES = grid === 'hex' ? [[1], [1, 3], [1, 3, 5], [1, 4], [1, 5], [1, 6], [1, 3, 6], [1, 2], [2, 4]] : eight ? [[1], [1, 3], [1, 5], [1, 2], [1, 3, 5, 7]] : [[1], [1], [1, 3], [1, 2]];
      const coreOnly = new Set(['2,4']);
      let ruleA, ruleB, now, grown, hold, hue, born = 0, plant = null, idle = 0;
      const reset = t => {
        gen.fill(0); now = 1; grown = false; hold = 0; born = t; idle = 0;
        ruleA = R.pick(RULES); ruleB = R.bool(0.5) ? ruleA : R.pick(RULES); hue = R.range(3, 9);
        if (coreOnly.has(ruleA.join()) && coreOnly.has(ruleB.join())) ruleB = [1];
        if (plant) { gen[plant] = 1; plant = null; return; }
        const seeds = R.pick([1, 1, 1, 2, 3, 4]);
        if (seeds === 1) gen[at(0, 0)] = 1;
        else for (let k = 0; k < seeds; k++) { const q = R.int(-RH * 0.6, RH * 0.6), r = R.int(-RH * 0.6, RH * 0.6); if (inside[at(q, r)]) gen[at(q, r)] = 1; }
      };
      reset(0);
      const grow = () => {
        const rule = now % 2 ? ruleA : ruleB, fresh = [];
        let edge = false;
        for (let r = -RH; r <= RH; r++) for (let q = -RH; q <= RH; q++) {
          const i = at(q, r);
          if (!inside[i] || gen[i]) continue;
          let c = 0;
          for (let k = 0; k < nb.length; k++) if (gen[i + nb[k]]) c++;
          if (c && rule.includes(c)) { fresh.push(i); if (Math.max(Math.abs(q), Math.abs(r), grid === 'hex' ? Math.abs(q + r) : 0) >= RH - 1) edge = true; }
        }
        now++;
        for (const i of fresh) gen[i] = now;
        idle = fresh.length ? 0 : idle + 1;   // the two alternating rules may each stall for a step
        if (edge || idle > 2) grown = true;
      };
      // start part-grown, so the first frame is already a crystal; rules that cannot grow from a seed are rolled again
      const start = t => {
        for (let tries = 0; tries < 6; tries++) {
          const keep = plant; reset(t);
          for (let k = 0; k < RH * 0.5 && !grown; k++) grow();
          let frozen = 0; for (let i = 0; i < gen.length; i++) if (gen[i]) frozen++;
          if (frozen > RH * 4 || keep) return;
        }
      };
      start(0);
      const drift = R.range(3, 6), bands = R.bool(0.3) ? U.dim(sc.lut, 0.45) : sc.lut;
      g.trait('Palette', palName(sc)); g.trait('Grid', grid === 'hex' ? 'Hexagonal' : eight ? 'Square, 8 sides' : 'Square, 4 sides'); g.trait('Size', RH); g.trait('First rule', ruleA.join('·') + (ruleB === ruleA ? '' : ' / ' + ruleB.join('·'))); g.trait('Rings', bands === sc.lut ? 'Plain' : 'Banded');
      return (t, dt, f) => {
        for (const p of g.input.taps()) {
          const m = map[Math.min(n - 1, Math.floor(p.y * n)) * n + Math.min(n - 1, Math.floor(p.x * n))];
          if (m >= 0) { if (grown) { if (hold > 0) { plant = m; start(t); } } else if (!gen[m]) gen[m] = now; }   // (one restart per frame, however many taps arrive)
        }
        if (!grown) { if (f % 2 === 0) grow(); } else if ((hold += dt) > 7) start(t);
        const hd = t * drift;
        for (let i = 0; i < n * n; i++) {
          const m = map[i], v = m < 0 ? 0 : gen[m];
          d[i] = v === 0 ? BLACK : v === now && !grown ? WHITE : (v & 1 ? sc.lut : bands)[(v * hue + hd) & 255];
        }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, grown ? (7 - hold) / 1.2 : 1));
      };
    },
  });
  P.add({
    interactive: 'Click or drag to paint in a new territory.',
    name: 'Potts Quench', fam: 'Automata', type: 'px', n: 100,
    recipe: 'A grid of random colours cooled to zero: each cell sides with its neighbourhood, and territories smooth and merge, with or without inked borders, in three colours or a dozen.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, q = R.int(4, 7), s = new Uint8Array(N).map(() => R.int(0, q - 1));
        const cols = Array.from({ length: q }, (_, i) => U.pk(U.ramp(sc.cols, i / q, true)));
        const wrap = v => (v + n) % n, lead = R.bool(0.75);
        const update = () => {
          const x = R.int(0, n - 1), y = R.int(0, n - 1), i = y * n + x, k = R.int(0, 7);
          const dx = [-1, 0, 1, -1, 1, -1, 0, 1], dy = [-1, -1, -1, 0, 0, 1, 1, 1];
          const cand = s[wrap(y + dy[k]) * n + wrap(x + dx[k])], cur = s[i];
          if (cand === cur) return;
          let a = 0, b = 0;
          for (let m = 0; m < 8; m++) { const v = s[wrap(y + dy[m]) * n + wrap(x + dx[m])]; if (v === cur) a++; else if (v === cand) b++; }
          if (b > a || (b === a && R() < 0.25)) s[i] = cand;
        };
        for (let i = 0; i < N * 25; i++) update();
        let heatAt = R.range(4, 8);
        let brush = 0;
        const paint = (cx, cy, r) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) s[wrap(cy + y) * n + wrap(cx + x)] = brush; };
        g.trait('Palette', palName(sc)); g.trait('States', q); g.trait('Borders', lead ? 'Inked' : 'None'); g.trait('Grain', 'Even'); g.trait('Texture', 'Plain');
        return t => {
          for (const p of tapsAt(g, n)) { brush = (s[p.y * n + p.x] + 1 + g.alt.int(0, q - 2)) % q; paint(p.x, p.y, 7); }
          if (g.input.down && g.input.inside) paint(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 4);
          for (let i = 0; i < N * 0.7; i++) update();
          if (t > heatAt) {
            heatAt = t + R.range(4, 9);
            const cx = R.int(0, n - 1), cy = R.int(0, n - 1), r = R.int(10, 24);
            for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) s[wrap(cy + y) * n + wrap(cx + x)] = R.int(0, q - 1);
          }
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const v = s[i];
            d[i] = lead && (v !== s[y * n + wrap(x + 1)] || v !== s[wrap(y + 1) * n + x]) ? BLACK : cols[v];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, q = R.pick([3, 4, 5, 6, 7, 9, 12]), s = new Uint8Array(N).map(() => R.int(0, q - 1));
      const cols = Array.from({ length: q }, (_, i) => U.pk(U.ramp(sc.cols, i / q, true)));
      const wrap = v => (v + n) % n, lead = R.bool(0.65), stripes = R.bool(0.2), aniso = R.bool(0.25);
      const dx = [-1, 0, 1, -1, 1, -1, 0, 1], dy = [-1, -1, -1, 0, 0, 1, 1, 1];
      const update = () => {
        const x = R.int(0, n - 1), y = R.int(0, n - 1), i = y * n + x, k = R.int(0, 7);
        const cand = s[wrap(y + dy[k]) * n + wrap(x + dx[k])], cur = s[i];
        if (cand === cur) return;
        let a = 0, b = 0;
        for (let m = 0; m < 8; m++) { const w = aniso && dy[m] === 0 ? 2 : 1, v = s[wrap(y + dy[m]) * n + wrap(x + dx[m])]; if (v === cur) a += w; else if (v === cand) b += w; }
        if (b > a || (b === a && R() < 0.25)) s[i] = cand;
      };
      for (let i = 0; i < N * 25; i++) update();
      let heatAt = R.range(4, 8), brush = 0;
      const paint = (cx, cy, r, v) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) s[wrap(cy + y) * n + wrap(cx + x)] = v; };
      g.trait('Palette', palName(sc)); g.trait('States', q); g.trait('Borders', lead ? 'Inked' : 'None'); g.trait('Grain', aniso ? 'Stretched' : 'Even'); g.trait('Texture', stripes ? 'Hatched' : 'Plain');
      return t => {
        for (const p of tapsAt(g, n)) { brush = (s[p.y * n + p.x] + 1 + R.int(0, q - 2)) % q; paint(p.x, p.y, 7, brush); }
        if (g.input.down && g.input.inside) paint(Math.floor(g.input.x * n), Math.floor(g.input.y * n), 4, brush);
        for (let i = 0; i < N * 0.7; i++) update();
        if (t > heatAt) {
          heatAt = t + R.range(4, 9);
          const cx = R.int(0, n - 1), cy = R.int(0, n - 1), r = R.int(10, 24);
          for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) s[wrap(cy + y) * n + wrap(cx + x)] = R.int(0, q - 1);
        }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const v = s[i];
          d[i] = lead && (v !== s[y * n + wrap(x + 1)] || v !== s[wrap(y + 1) * n + x]) ? BLACK : stripes && (x + y) % 4 === 0 ? U.X.shade(cols[v], 0.7) : cols[v];
        }
      };
    },
  });
  P.add({
    interactive: 'Hold the pointer over the picture to pour from it.',
    name: 'Sediment', seed: 3, fam: 'Automata', type: 'px', n: 100,
    recipe: 'Grains fall from swinging spouts and pile at their angle of rest, laying down bands of colour that slowly sink; each spout pours its own colour, or all of them change with time.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, cell = new Uint8Array(N);
        const spouts = Array.from({ length: R.int(1, 3) }, () => ({ w: R.range(0.15, 0.5), ph: R.range(0, 6), amp: R.range(0.25, 0.46), hue: R.int(0, 255), rate: R.int(3, 5) }));
        const colourRate = R.range(10, 26);
        let clock = 0;
        const tick = (boost = 1) => {
          clock += 1 / 12;
          for (const s of spouts) {
            const x = Math.round(n * (0.5 + s.amp * Math.sin(clock * s.w + s.ph)));
            for (let k = 0; k < s.rate * boost; k++) { const xx = x + R.int(-2 * boost, 2 * boost); if (xx >= 0 && xx < n && !cell[xx]) cell[xx] = 1 + ((s.hue + clock * colourRate) % 255 | 0); }
          }
          for (let pass = 0; pass < 2; pass++) for (let y = n - 2; y >= 0; y--) for (let k = 0; k < n; k++) {
            const x = (y + pass) & 1 ? k : n - 1 - k, i = y * n + x, v = cell[i];
            if (!v) continue;
            if (!cell[i + n]) { cell[i + n] = v; cell[i] = 0; continue; }
            const dir = R() < 0.5 ? -1 : 1;
            if (x + dir >= 0 && x + dir < n && !cell[i + n + dir]) { cell[i + n + dir] = v; cell[i] = 0; }
            else if (x - dir >= 0 && x - dir < n && !cell[i + n - dir]) { cell[i + n - dir] = v; cell[i] = 0; }
          }
          let full = 0, peak = 0;
          for (let i = 0; i < N; i++) if (cell[i]) full++;
          for (let x = 0, row = Math.round(n * 0.2) * n; x < n; x++) if (cell[row + x] && cell[row + x + n]) peak++;
          if (full > N * 0.52 || peak > 2) { cell.copyWithin(n, 0, N - n); cell.fill(0, 0, n); }
        };
        for (let i = 0; i < 240; i++) tick(4);
        g.trait('Palette', palName(sc)); g.trait('Spouts', spouts.length); g.trait('Colour', 'Changing'); g.trait('Wind', 'Still');
        return () => {
          if (g.input.inside) { const x = Math.floor(g.input.x * n); for (let j = 0; j < 6; j++) { const xx = x + g.alt.int(-2, 2); if (xx >= 0 && xx < n && !cell[xx]) cell[xx] = 1 + ((clock * colourRate * 2) % 255 | 0); } }
          tick();
          for (let i = 0; i < N; i++) d[i] = cell[i] ? sc.lut[cell[i]] : BLACK;
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, cell = new Uint8Array(N);
      const spouts = Array.from({ length: R.int(1, 5) }, (_, k) => ({ w: R.range(0.15, 0.5), ph: R.range(0, 6), amp: R.range(0.15, 0.46), hue: R.int(0, 255), rate: R.int(2, 5), own: k * 51 }));
      const colourRate = R.range(10, 26), byHue = R.bool(0.35), slide = R.pick([1, 1, 2]), wind = R.pick([0, 0, 0.5, -0.5]);
      let clock = 0;
      const pour = (x, v, k, spread) => { for (let j = 0; j < k; j++) { const xx = x + R.int(-spread, spread); if (xx >= 0 && xx < n && !cell[xx]) cell[xx] = v; } };
      const tick = (boost = 1) => {
        clock += 1 / 12;
        for (const s of spouts) {
          const x = Math.round(n * (0.5 + s.amp * Math.sin(clock * s.w + s.ph)));
          pour(x, 1 + ((byHue ? s.own + Math.sin(clock * 0.3) * 20 : s.hue + clock * colourRate) % 255 + 255) % 255 | 0, s.rate * boost, 2 * boost);
        }
        if (g.input.inside && boost === 1) pour(Math.floor(g.input.x * n), 1 + ((clock * colourRate * 2) % 255 | 0), 6, 2);
        for (let pass = 0; pass < 2; pass++) for (let y = n - 2; y >= 0; y--) for (let k = 0; k < n; k++) {
          const x = (y + pass) & 1 ? k : n - 1 - k, i = y * n + x, v = cell[i];
          if (!v) continue;
          if (!cell[i + n]) { cell[i + n] = v; cell[i] = 0; continue; }
          const dir = R() < 0.5 + wind ? -1 : 1;
          if (x + dir >= 0 && x + dir < n && !cell[i + n + dir]) { cell[i + n + dir] = v; cell[i] = 0; }
          else if (slide > 1 && x - dir >= 0 && x - dir < n && !cell[i + n - dir]) { cell[i + n - dir] = v; cell[i] = 0; }
        }
        let full = 0, peak = 0;
        for (let i = 0; i < N; i++) if (cell[i]) full++;
        for (let x = 0, row = Math.round(n * 0.2) * n; x < n; x++) if (cell[row + x] && cell[row + x + n]) peak++;
        if (full > N * 0.52 || peak > 2) { cell.copyWithin(n, 0, N - n); cell.fill(0, 0, n); }
      };
      for (let i = 0; i < 240; i++) tick(4);
      g.trait('Palette', palName(sc)); g.trait('Spouts', spouts.length); g.trait('Colour', byHue ? 'One per spout' : 'Changing'); g.trait('Wind', wind > 0 ? 'From the right' : wind < 0 ? 'From the left' : 'Still'); g.trait('Slopes', slide > 1 ? 'Both ways' : 'One way');
      return () => {
        tick();
        for (let i = 0; i < N; i++) d[i] = cell[i] ? sc.lut[cell[i]] : BLACK;
      };
    },
  });
  P.add({
    interactive: 'Click to strike lightning.',
    listens: 'Every clap or beat is a lightning strike; a loud room keeps the storm going.',
    name: 'Wildfire', seed: 2, fam: 'Automata', type: 'px', n: 110,
    recipe: 'Growth spreads from its own edges and ages through the palette; lightning starts fronts that burn it back to black.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n;
        let age = new Uint16Array(N), fire = new Uint8Array(N), fire2 = new Uint8Array(N);
        for (let k = 0; k < 30; k++) age[R.int(0, N - 1)] = 1;
        const grow = R.range(0.035, 0.06), strike = R.range(1.2, 2.4), ripe = R.int(18, 34), hue = R.range(0.5, 1.1), ember = [WHITE, U.pk([255, 236, 160]), U.pk([255, 150, 40]), U.pk([150, 40, 10]), U.pk([60, 12, 4])];
        const nb = [-1, 1, -n, n, -n - 1, -n + 1, n - 1, n + 1];
        const tick = quiet => {
          fire2.fill(0);
          for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) {
            if (fire[i]) { if (fire[i] < 5) fire2[i] = fire[i] + 1; continue; }
            if (age[i]) {
              if (age[i] < 60000) age[i]++;
              if (age[i] > ripe && (fire[i - 1] === 1 || fire[i + 1] === 1 || fire[i - n] === 1 || fire[i + n] === 1 || ((fire[i - n - 1] === 1 || fire[i + n + 1] === 1 || fire[i - n + 1] === 1 || fire[i + n - 1] === 1) && R() < 0.5))) { fire2[i] = 1; age[i] = 0; }
            } else {
              let c = 0;
              for (let k = 0; k < 8; k++) if (age[i + nb[k]]) c++;
              if (c && R() < grow * c) age[i] = 1;
            }
          }
          const tmp = fire; fire = fire2; fire2 = tmp;
          if (!quiet && R() < strike / 12) { const i = R.int(n, N - n - 1); if (age[i] > 40) { fire[i] = 1; age[i] = 0; } }
          if (R() < 0.05) { const i = R.int(n + 1, N - n - 2); if (!age[i] && !fire[i]) age[i] = 1; }
        };
        for (let i = 0; i < 420; i++) tick(i < 120);
        const base = R.int(0, 255);
        g.trait('Palette', palName(sc)); g.trait('Flame', 'Fire'); g.trait('Growth', grow > 0.048 ? 'Lush' : 'Sparse'); g.trait('Storms', strike > 1.8 ? 'Frequent' : 'Rare');
        return () => {
          for (const p of tapsAt(g, n)) for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) { const i = Math.min(n - 2, Math.max(1, p.y + y)) * n + Math.min(n - 2, Math.max(1, p.x + x)); if (age[i]) { fire[i] = 1; age[i] = 0; } }
          for (let b = heard(g) + (g.input.listening && g.alt() < loudness(g) * 0.4 ? 1 : 0); b > 0; b--) for (let k = 0; k < 60; k++) { const i = g.alt.int(n + 1, N - n - 2); if (age[i] > ripe) { fire[i] = 1; age[i] = 0; break; } }
          tick(false);
          for (let i = 0; i < N; i++) d[i] = fire[i] ? ember[fire[i] - 1] : age[i] ? sc.lut[(base + age[i] * hue) & 255] : BLACK;
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n;
      let age = new Uint16Array(N), fire = new Uint8Array(N), fire2 = new Uint8Array(N);
      for (let k = 0; k < 30; k++) age[R.int(0, N - 1)] = 1;
      const grow = R.range(0.025, 0.07), strike = R.range(0.8, 2.6), ripe = R.int(14, 40), hue = R.range(0.3, 1.4);
      const flame = R.pick([[WHITE, [255, 236, 160], [255, 150, 40], [150, 40, 10], [60, 12, 4]], [WHITE, [200, 240, 255], [90, 160, 255], [40, 50, 160], [20, 10, 60]], [WHITE, [255, 200, 255], [255, 60, 160], [120, 10, 80], [40, 0, 30]]]);
      const ember = flame.map(c => typeof c === 'number' ? c : U.pk(c));
      const nb = [-1, 1, -n, n, -n - 1, -n + 1, n - 1, n + 1];
      const tick = quiet => {
        fire2.fill(0);
        for (let y = 1; y < n - 1; y++) for (let x = 1, i = y * n + 1; x < n - 1; x++, i++) {
          if (fire[i]) { if (fire[i] < 5) fire2[i] = fire[i] + 1; continue; }
          if (age[i]) {
            if (age[i] < 60000) age[i]++;
            if (age[i] > ripe && (fire[i - 1] === 1 || fire[i + 1] === 1 || fire[i - n] === 1 || fire[i + n] === 1 || ((fire[i - n - 1] === 1 || fire[i + n + 1] === 1 || fire[i - n + 1] === 1 || fire[i + n - 1] === 1) && R() < 0.5))) { fire2[i] = 1; age[i] = 0; }
          } else {
            let c = 0;
            for (let k = 0; k < 8; k++) if (age[i + nb[k]]) c++;
            if (c && R() < grow * c) age[i] = 1;
          }
        }
        const tmp = fire; fire = fire2; fire2 = tmp;
        if (!quiet && R() < strike / 12) { const i = R.int(n, N - n - 1); if (age[i] > 40) { fire[i] = 1; age[i] = 0; } }
        if (R() < 0.05) { const i = R.int(n + 1, N - n - 2); if (!age[i] && !fire[i]) age[i] = 1; }
      };
      for (let i = 0; i < 420; i++) tick(i < 120);
      const base = R.int(0, 255);
      g.trait('Palette', palName(sc)); g.trait('Flame', flame[2][2] === 40 ? 'Fire' : flame[2][2] === 255 ? 'Ice' : 'Plasma'); g.trait('Growth', grow > 0.048 ? 'Lush' : 'Sparse'); g.trait('Storms', strike > 1.8 ? 'Frequent' : 'Rare');
      return () => {
        for (const p of tapsAt(g, n)) for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) { const i = Math.min(n - 2, Math.max(1, p.y + y)) * n + Math.min(n - 2, Math.max(1, p.x + x)); if (age[i]) { fire[i] = 1; age[i] = 0; } }
        for (let b = heard(g) + (g.input.listening && g.alt() < loudness(g) * 0.4 ? 1 : 0); b > 0; b--) for (let k = 0; k < 60; k++) { const i = g.alt.int(n + 1, N - n - 2); if (age[i] > ripe) { fire[i] = 1; age[i] = 0; break; } }
        tick(false);
        for (let i = 0; i < N; i++) d[i] = fire[i] ? ember[fire[i] - 1] : age[i] ? sc.lut[(base + age[i] * hue) & 255] : BLACK;
      };
    },
  });
  P.add({
    name: 'Sorting', seed: 3, fam: 'Automata', type: 'px', n: 80,
    interactive: 'Click a row to scramble it again.',
    recipe: 'Every row is a scrambled spectrum being put back in order one neighbour-swap at a time; disorder sweeps down, order follows.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.6), rows = Array.from({ length: n }, () => Uint8Array.from({ length: n }, (_, i) => i));
      const kind = R.pick(['reverse', 'riffle', 'rotate', 'blocks', 'shuffle']), period = (n + R.int(20, 50)) & ~1, delay = R.pick([1, 1.5, 2, 3]), twist = R.pick([0, 0, 1, 2, -1]), down = R.bool(0.7);
      // the two scrambles that need no dice repeat exactly, so they hold their colours still
      const drift = kind === 'reverse' || kind === 'riffle' ? 0 : R.range(1, 3) * R.sign();
      const scramble = (row, how = kind, rng = R) => {
        const src = Array.from(row).sort((a, b) => a - b);
        if (how === 'reverse') src.reverse();
        else if (how === 'rotate') { const k = R.int(n * 0.3, n * 0.7); src.push(...src.splice(0, k)); }
        else if (how === 'riffle') { const half = n >> 1, out = []; for (let i = 0; i < half; i++) out.push(src[i + half], src[i]); src.splice(0, n, ...out); }
        else if (how === 'blocks') { const b = 8, blocks = []; for (let i = 0; i < n; i += b) blocks.push(src.slice(i, i + b)); src.splice(0, n, ...R.shuffle(blocks).flat()); }
        else rng.shuffle(src);
        row.set(src);
      };
      const tick = f => {
        for (let r = 0; r < n; r++) {
          const row = rows[r], local = f - Math.round(r * delay);
          if (local >= 0 && local % period === 0) { scramble(row); continue; }
          for (let i = (f + r) & 1; i < n - 1; i += 2) if (row[i] > row[i + 1]) { const tmp = row[i]; row[i] = row[i + 1]; row[i + 1] = tmp; }
        }
      };
      let f = 0;
      for (; f < period * 2; f++) tick(f);
      g.trait('Palette', palName(sc)); g.trait('Scramble', { reverse: 'Reversed', riffle: 'Riffled', rotate: 'Rotated', blocks: 'Blocks', shuffle: 'Shuffled' }[kind]); g.trait('Twist', twist ? twist : 'None'); g.trait('Direction', down ? 'Down' : 'Up'); g.trait('Lag', delay);
      return Object.assign(t => {
        for (const p of tapsAt(g, n)) for (let k = -3; k <= 3; k++) { const r = down ? p.y + k : n - 1 - p.y + k; if (r >= 0 && r < n) scramble(rows[r], 'shuffle', g.alt); }
        tick(f++);
        const hd = t * drift, m = (sc.native ? 256 : 256 * (1 - 1 / sc.cols.length)) / n;
        for (let r = 0; r < n; r++) {
          const row = rows[r], y = down ? r : n - 1 - r;
          for (let x = 0; x < n; x++) d[y * n + x] = sc.lut[(row[x] * m + r * twist + hd) & 255];
        }
      }, { periodSteps: kind === 'reverse' || kind === 'riffle' ? period : 0 });
    },
  });

  P.add({
    interactive: 'Click on the road to make a driver brake.',
    name: 'Phantom Jam', seed: 3, fam: 'Automata', type: 'px', n: 120,
    recipe: 'Cars on a ring road, one row per moment. Each keeps its colour, so every jam shows as a kink rolling back through the traffic.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.38) return (function () {   // (the original look: still more than a third of the rolls)
        const { n, d } = g, sc = U.scheme(R, 0.55), N = n * n, rows = new Uint16Array(N);
        const cars = Math.round(n * R.range(0.16, 0.3)), vmax = R.pick([3, 4, 5]), p = R.range(0.12, 0.3), flip = R.bool(), drift = R.range(2, 5) * R.sign();
        const pos = R.shuffle(Array.from({ length: n }, (_, i) => i)).slice(0, cars).sort((a, b) => a - b), vel = new Uint8Array(cars);
        const brake = new Uint8Array(cars);
        const tick = () => {
          const row = new Uint16Array(n);
          for (let i = 0; i < cars; i++) {
            const gap = (pos[(i + 1) % cars] - pos[i] - 1 + n) % n;
            let v = Math.min(vel[i] + 1, vmax, gap);
            if (v > 0 && R() < p) v--;
            if (brake[i]) { brake[i]--; v = 0; }
            vel[i] = v;
          }
          for (let i = 0; i < cars; i++) { for (let k = 0; k <= vel[i]; k++) row[(pos[i] + k) % n] = i + 1; pos[i] = (pos[i] + vel[i]) % n; }
          rows.copyWithin(0, n); rows.set(row, N - n);
        };
        for (let i = 0; i < n * 2; i++) tick();
        g.trait('Palette', palName(sc)); g.trait('Cars', cars); g.trait('Top speed', vmax); g.trait('Lanes', 1); g.trait('Time runs', flip ? 'Up' : 'Down');
        return t => {
          for (const q of g.input.taps()) {
            const x = Math.floor(q.x * n);
            let best = 0, bd = n;
            for (let i = 0; i < cars; i++) { const dd = Math.min(Math.abs(pos[i] - x), n - Math.abs(pos[i] - x)); if (dd < bd) { bd = dd; best = i; } }
            brake[best] = 6;
          }
          tick();
          const hd = t * drift, m = 256 / cars;
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const v = rows[flip ? (n - 1 - y) * n + x : i];
            d[i] = v ? sc.lut[(v * m + hd) & 255] : BLACK;
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R, 0.55), N = n * n, rows = new Uint16Array(N), row = new Uint16Array(n);
      const cars = Math.round(n * R.range(0.12, 0.34)), vmax = R.pick([2, 3, 4, 5]), p = R.range(0.08, 0.32), flip = R.bool(), drift = R.range(2, 5) * R.sign();
      const lanes = R.pick([1, 1, 2]), road = lanes === 2 ? U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.88)) : BLACK;
      // traffic lights (some rolls): a red light holds the queue at its line, so the jams stand in columns
      const RED = 65535, GREEN = 65534, redC = U.pk([190, 40, 40]), greenC = U.pk([40, 150, 80]);
      const lights = g.alt.bool(0.4) ? Array.from({ length: g.alt.int(1, 2) }, (_, k) => ({ x: Math.floor(n * (0.3 + 0.4 * k)) + g.alt.int(-6, 6), green: g.alt.int(30, 48), red: g.alt.int(12, 22), ph: g.alt.int(0, 40) })) : [];
      let clock = 0;
      const pos = R.shuffle(Array.from({ length: n }, (_, i) => i)).slice(0, cars).sort((a, b) => a - b), vel = new Uint8Array(cars), brake = new Uint8Array(cars);
      const tick = () => {
        row.fill(0);
        for (let i = 0; i < cars; i++) {
          let gap = (pos[(i + 1) % cars] - pos[i] - 1 + n) % n;
          for (const L of lights) if ((clock + L.ph) % (L.green + L.red) >= L.green) { const ahead = (L.x - pos[i] - 1 + n) % n; if (ahead < gap) gap = ahead; }
          let v = Math.min(vel[i] + 1, vmax, gap);
          if (v > 0 && R() < p) v--;
          if (brake[i]) { brake[i]--; v = 0; }
          vel[i] = v;
        }
        for (let i = 0; i < cars; i++) { for (let k = 0; k <= vel[i]; k++) row[(pos[i] + k) % n] = i + 1; pos[i] = (pos[i] + vel[i]) % n; }
        for (const L of lights) if (!row[L.x]) row[L.x] = (clock + L.ph) % (L.green + L.red) >= L.green ? RED : GREEN;
        clock++;
        rows.copyWithin(0, n); rows.set(row, N - n);
      };
      for (let i = 0; i < n * 2; i++) tick();
      g.trait('Palette', palName(sc)); g.trait('Cars', cars); g.trait('Top speed', vmax); g.trait('Lanes', lanes); g.trait('Signals', lights.length || 'None'); g.trait('Time runs', flip ? 'Up' : 'Down');
      return t => {
        for (const q of g.input.taps()) {
          const x = Math.floor(q.x * n);
          let best = 0, bd = n;
          for (let i = 0; i < cars; i++) { const dd = Math.min(Math.abs(pos[i] - x), n - Math.abs(pos[i] - x)); if (dd < bd) { bd = dd; best = i; } }
          brake[best] = 6;
        }
        tick();
        const hd = t * drift, m = 256 / cars;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const v = rows[flip ? (n - 1 - y) * n + x : i];
          d[i] = v === RED ? redC : v === GREEN ? greenC : v ? sc.lut[(v * m + hd) & 255] : lanes === 2 && x % 8 < 4 && y % 2 ? road : BLACK;
        }
      };
    },
  });
})();
