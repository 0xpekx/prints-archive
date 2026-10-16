// Set 5 · Algorithms: well-known algorithms running in plain sight, in neon on
// black. Each grid is the algorithm's own memory, drawn cell by cell as it works.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  // def.prewarm: run that many frames before the first one shown, so a piece opens already under way
  const add = def => {
    const w = def.prewarm; delete def.prewarm;
    if (w) { const mk = def.make; def.make = function (R, U, g) { const f = mk.call(this, R, U, g); for (let k = w; k > 0; k--) f(-k / 12, 1 / 12, -k); return f; }; }
    P.addPixel(Object.assign({ set: 5, fam: 'Algorithms' }, def));
  };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const neon = R => U.hueLut(R.bool(0.5) ? 100 : 88, 100, 256, R.range(0, 100), R.pick([100, 100, 70, -70, 45]));
  // names for traits (naming never draws from the dice)
  const HUES = [[0, 'Red'], [7, 'Orange'], [13, 'Amber'], [17, 'Yellow'], [24, 'Lime'], [32, 'Green'], [44, 'Teal'], [51, 'Cyan'], [59, 'Azure'], [66, 'Blue'], [74, 'Violet'], [83, 'Magenta'], [92, 'Rose'], [100, 'Red']];
  const hueName = h => { h = ((h % 100) + 100) % 100; let b = HUES[0]; for (const e of HUES) if (Math.abs(e[0] - h) < Math.abs(b[0] - h)) b = e; return b[1]; };
  const spanName = (from, span) => Math.abs(span) >= 100 ? 'Rainbow' : hueName(from) + ' to ' + hueName(from + span);
  // the same draws as neon(), and a name for what came out
  const neonN = (R, spans = [100, 100, 70, -70, 45]) => { const s = R.bool(0.5) ? 100 : 88, from = R.range(0, 100), span = R.pick(spans); return { lut: U.hueLut(s, 100, 256, from, span), name: spanName(from, span) }; };
  // packed-colour helpers: scale towards black, or mix towards white
  const dimPk = (v, k) => (0xff000000 | (((v >>> 16 & 255) * k) | 0) << 16 | (((v >>> 8 & 255) * k) | 0) << 8 | ((v & 255) * k) | 0) >>> 0;
  const glowPk = (v, k) => { const f = c => (c + (255 - c) * k) | 0; return (0xff000000 | f(v >>> 16 & 255) << 16 | f(v >>> 8 & 255) << 8 | f(v & 255)) >>> 0; };

  add({
    name: 'Maze Run', seed: 2, sizes: [50, 80, 100], fps: 12, prewarm: 14,
    interactive: 'Once the flood has filled the maze, click any corridor to light the way back to the start.',
    recipe: 'A digger carves a maze, backing up whenever it boxes itself in. Then a flood pours in from the entrance and colours every corridor by its distance from the start, and when it reaches the far corner (or wherever you click) the one true path lights up.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, p = n >= 80 ? 4 : 3, w = Math.floor((n - 1) / p), off = (n - w * p - 1) >> 1, C = w * w;
        g.trait('Corridors', p === 3 ? 'Fine' : 'Medium'); g.trait('Digger', 'Backtracker'); g.trait('Start', 'Corner'); g.trait('Walls', 'Dark'); g.trait('Fresh rock', 'Plain'); g.trait('Palette', 'New each maze');
        const east = new Uint8Array(C), south = new Uint8Array(C), seen = new Uint8Array(C), dist = new Int32Array(C), onPath = new Uint8Array(C);
        let lut, phase, stack, queue, qh, head, pathAt, hold, band, floor;
        const reset = () => {
          lut = U.hueLut(R.bool(0.5) ? 100 : 88, 100, 256, R.range(0, 100), R.pick([100, 70, -70])); band = R.range(2, 5); floor = dimPk(lut[R.int(0, 255)], 0.3);
          east.fill(0); south.fill(0); seen.fill(0); dist.fill(-1); onPath.fill(0);
          phase = 'dig'; stack = [0]; seen[0] = 1; head = 0; hold = 0;
        };
        reset();
        const digPer = Math.max(1, Math.round(C / 45)), floodPer = Math.max(1, Math.round(C / 90));
        const nbrs = c => { const x = c % w, y = c / w | 0, r = []; if (x > 0 && east[c - 1]) r.push(c - 1); if (x < w - 1 && east[c]) r.push(c + 1); if (y > 0 && south[c - w]) r.push(c - w); if (y < w - 1 && south[c]) r.push(c + w); return r; };
        return (t, dt) => {
          const hx = Math.floor((g.input.x * n - off - 1) / p), hy = Math.floor((g.input.y * n - off - 1) / p), hov = g.input.inside && hx >= 0 && hy >= 0 && hx < w && hy < w ? hy * w + hx : -1;
          for (const tp of g.input.taps()) {
            const cx = Math.floor((tp.x * n - off - 1) / p), cy = Math.floor((tp.y * n - off - 1) / p), c = cy * w + cx;
            if (cx >= 0 && cy >= 0 && cx < w && cy < w && (phase === 'path' || phase === 'hold') && dist[c] >= 0) { onPath.fill(0); pathAt = c; phase = 'path'; }
          }
          if (phase === 'dig') {
            for (let s = 0; s < digPer && stack.length; s++) {
              const c = stack[stack.length - 1], x = c % w, y = c / w | 0, opts = [];
              if (x > 0 && !seen[c - 1]) opts.push(c - 1); if (x < w - 1 && !seen[c + 1]) opts.push(c + 1);
              if (y > 0 && !seen[c - w]) opts.push(c - w); if (y < w - 1 && !seen[c + w]) opts.push(c + w);
              if (!opts.length) { stack.pop(); continue; }
              const nx = R.pick(opts);
              if (nx === c + 1) east[c] = 1; else if (nx === c - 1) east[nx] = 1; else if (nx === c + w) south[c] = 1; else south[nx] = 1;
              seen[nx] = 1; stack.push(nx); head = nx;
            }
            if (!stack.length) { phase = 'flood'; queue = [0]; qh = 0; dist[0] = 0; }
          } else if (phase === 'flood') {
            for (let s = 0; s < floodPer && qh < queue.length; s++) { const c = queue[qh++]; for (const j of nbrs(c)) if (dist[j] < 0) { dist[j] = dist[c] + 1; queue.push(j); } }
            if (qh >= queue.length) { phase = 'path'; pathAt = C - 1; }
          } else if (phase === 'path') {
            for (let s = 0; s < 2 && pathAt >= 0; s++) { onPath[pathAt] = 1; if (!dist[pathAt]) { pathAt = -1; break; } const here = pathAt; pathAt = nbrs(here).find(j => dist[j] === dist[here] - 1); }
            if (pathAt < 0) { phase = 'hold'; hold = 3.5; }
          } else if ((hold -= dt) <= 0) reset();
          d.fill(BLACK);
          const colOf = c => onPath[c] ? WHITE : dist[c] < 0 ? (seen[c] ? floor : BLACK) : lut[((dist[c] * band) | 0) & 255];
          for (let c = 0; c < C; c++) {
            if (!seen[c]) continue;
            const x0 = off + (c % w) * p + 1, y0 = off + (c / w | 0) * p + 1, col = phase === 'dig' && c === head ? WHITE : colOf(c);
            X.rect(g, x0, y0, p - 1, p - 1, c === hov ? glowPk(col, 0.5) : col);
            if (east[c]) X.rect(g, x0 + p - 1, y0, 1, p - 1, onPath[c] && onPath[c + 1] ? WHITE : col);
            if (south[c]) X.rect(g, x0, y0 + p - 1, p - 1, 1, onPath[c] && onPath[c + w] ? WHITE : col);
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, p = R.pick(n >= 80 ? [3, 4, 5, 6] : [2, 3, 4]), w = Math.floor((n - 1) / p), off = (n - w * p - 1) >> 1, C = w * w;
      const A = g.alt, grow = g.trait('Digger', A() < 0.5 ? 'Backtracker' : A() < 0.7 ? 'Branching' : 'Braided'), centre = g.trait('Start', A() < 0.6 ? 'Corner' : 'Centre') === 'Centre', tinted = g.trait('Walls', A() < 0.65 ? 'Dark' : 'Tinted') === 'Tinted';
      g.trait('Corridors', ['', '', 'Hairline', 'Fine', 'Medium', 'Wide', 'Broad'][p]);
      const s0 = centre ? (w >> 1) * w + (w >> 1) : 0, aged = g.trait('Fresh rock', A() < 0.45 ? 'Plain' : 'Dig order') === 'Dig order', ageOf = new Int32Array(C); let locked = null, dug = 0;
      const east = new Uint8Array(C), south = new Uint8Array(C), seen = new Uint8Array(C), dist = new Int32Array(C), onPath = new Uint8Array(C);
      let lut, phase, stack, queue, qh, head, pathAt, hold, band, floor;
      const reset = () => {
        const nl = neonN(R, [100, 70, -70]); lut = locked || nl.lut; if (!locked) { locked = lut; g.trait('Palette', nl.name); } band = R.range(2, 5); floor = dimPk(lut[R.int(0, 255)], 0.3);
        east.fill(0); south.fill(0); seen.fill(0); dist.fill(-1); onPath.fill(0);
        phase = 'dig'; stack = [0]; seen[0] = 1; head = 0; hold = 0; dug = 0;
      };
      reset();
      const digPer = Math.max(1, Math.round(C / 45)), floodPer = Math.max(1, Math.round(C / 90));
      const nbrs = c => { const x = c % w, y = c / w | 0, r = []; if (x > 0 && east[c - 1]) r.push(c - 1); if (x < w - 1 && east[c]) r.push(c + 1); if (y > 0 && south[c - w]) r.push(c - w); if (y < w - 1 && south[c]) r.push(c + w); return r; };
      return (t, dt) => {
        const hx = Math.floor((inp.x * n - off - 1) / p), hy = Math.floor((inp.y * n - off - 1) / p), hov = inp.inside && hx >= 0 && hy >= 0 && hx < w && hy < w ? hy * w + hx : -1;
        for (const tp of inp.taps()) {
          const cx = Math.floor((tp.x * n - off - 1) / p), cy = Math.floor((tp.y * n - off - 1) / p), c = cy * w + cx;
          if (cx >= 0 && cy >= 0 && cx < w && cy < w && (phase === 'path' || phase === 'hold') && dist[c] >= 0) { onPath.fill(0); pathAt = c; phase = 'path'; }
        }
        if (phase === 'dig') {
          for (let s = 0; s < digPer && stack.length; s++) {
            // the backtracker always grows from its newest cell; the branching digger from any open one
            const ci = grow === 'Branching' ? (R() * stack.length) | 0 : stack.length - 1, c = stack[ci], x = c % w, y = c / w | 0, opts = [];
            if (x > 0 && !seen[c - 1]) opts.push(c - 1); if (x < w - 1 && !seen[c + 1]) opts.push(c + 1);
            if (y > 0 && !seen[c - w]) opts.push(c - w); if (y < w - 1 && !seen[c + w]) opts.push(c + w);
            if (!opts.length) { stack[ci] = stack[stack.length - 1]; stack.pop(); continue; }
            const nx = R.pick(opts);
            if (nx === c + 1) east[c] = 1; else if (nx === c - 1) east[nx] = 1; else if (nx === c + w) south[c] = 1; else south[nx] = 1;
            seen[nx] = 1; stack.push(nx); head = nx; ageOf[nx] = ++dug;
          }
          if (!stack.length) {
            if (grow === 'Braided') for (let k = 0; k < C * 0.07; k++) { const c = R.int(0, C - 1); if (R.bool() ? c % w < w - 1 : c < C - w) { if (c % w < w - 1 && !east[c]) east[c] = 1; else if (c < C - w) south[c] = 1; } }   // knock through a few walls: loops
            phase = 'flood'; queue = [s0]; qh = 0; dist[s0] = 0;
          }
        } else if (phase === 'flood') {
          for (let s = 0; s < floodPer && qh < queue.length; s++) { const c = queue[qh++]; for (const j of nbrs(c)) if (dist[j] < 0) { dist[j] = dist[c] + 1; queue.push(j); } }
          if (qh >= queue.length) { phase = 'path'; pathAt = C - 1; }
        } else if (phase === 'path') {
          for (let s = 0; s < 2 && pathAt >= 0; s++) { onPath[pathAt] = 1; if (!dist[pathAt]) { pathAt = -1; break; } const here = pathAt; pathAt = nbrs(here).find(j => dist[j] === dist[here] - 1); }
          if (pathAt < 0) { phase = 'hold'; hold = 3.5; }
        } else if ((hold -= dt) <= 0) reset();
        d.fill(tinted ? dimPk(lut[64], 0.16) : BLACK);
        const colOf = c => onPath[c] ? WHITE : dist[c] < 0 ? (seen[c] ? (aged ? dimPk(lut[(ageOf[c] * 255 / C) | 0], 0.5) : floor) : BLACK) : lut[((dist[c] * band) | 0) & 255];
        for (let c = 0; c < C; c++) {
          if (!seen[c]) continue;
          const x0 = off + (c % w) * p + 1, y0 = off + (c / w | 0) * p + 1, col = phase === 'dig' && c === head ? WHITE : colOf(c);
          X.rect(g, x0, y0, p - 1, p - 1, c === hov ? glowPk(col, 0.5) : col);
          if (east[c]) X.rect(g, x0 + p - 1, y0, 1, p - 1, onPath[c] && onPath[c + 1] ? WHITE : col);
          if (south[c]) X.rect(g, x0, y0 + p - 1, p - 1, 1, onPath[c] && onPath[c + w] ? WHITE : col);
        }
      };
    },
  });

  add({
    name: 'A Star', seed: 5, sizes: [50, 80], fps: 12,
    interactive: 'Click an open cell to send the traveller there.',
    recipe: 'A traveller crosses a field of obstacles by A* search: the frontier glows as it pushes toward the goal, the cells already weighed fade into a map of their cost, and once the route is found the traveller walks it and sets off for the next goal.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, nz = U.noise(R).n2, sc = R.range(0.06, 0.12), th = R.range(0.15, 0.3), nl = neonN(R), lut = nl.lut, rock = dimPk(lut[R.int(0, 255)], 0.3), N = n * n;
        g.trait('Terrain', 'Boulders'); g.trait('Rock', th < 0.22 ? 'Dense' : 'Open'); g.trait('Moves', 'Eight ways'); g.trait('Palette', nl.name);
        const block = new Uint8Array(N);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) block[y * n + x] = nz(x * sc, y * sc) > th ? 1 : 0;
        const gc = new Float32Array(N), from = new Int32Array(N), state = new Uint8Array(N), trail = new Float32Array(N);   // state: 0 new, 1 open, 2 closed
        const heap = [], hf = new Float32Array(N);
        const push = i => { heap.push(i); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (hf[heap[p]] <= hf[i]) break; heap[k] = heap[p]; k = p; } heap[k] = i; };
        const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { let k = 0; for (;;) { let c = 2 * k + 1; if (c >= heap.length) break; if (c + 1 < heap.length && hf[heap[c + 1]] < hf[heap[c]]) c++; if (hf[heap[c]] >= hf[last]) break; heap[k] = heap[c]; k = c; } heap[k] = last; } return top; };
        const free = () => { for (;;) { const i = R.int(0, N - 1); if (!block[i]) return i; } };
        let at = free(), goal, phase, path, step, wait;
        const begin = want => {
          for (let tries = 0; tries < 50; tries++) { goal = want != null ? want : free(); if (want != null) break; if (Math.hypot(goal % n - at % n, (goal / n | 0) - (at / n | 0)) > n * 0.55) break; }
          state.fill(0); heap.length = 0; gc[at] = 0; hf[at] = 0; from[at] = -1; state[at] = 1; push(at); phase = 'search'; path = []; step = 0;
        };
        begin();
        const h = (i) => { const dx = Math.abs(i % n - goal % n), dy = Math.abs((i / n | 0) - (goal / n | 0)); return Math.max(dx, dy) + 0.414 * Math.min(dx, dy); };
        const per = Math.max(6, Math.round(N / 160));
        return (t, dt) => {
          for (const tp of g.input.taps()) { const i = Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0); if (!block[i] && i !== at) begin(i); }
          if (phase === 'search') {
            for (let s = 0; s < per && heap.length; s++) {
              const i = pop(); if (state[i] === 2) continue; state[i] = 2;
              if (i === goal) { for (let k = i; k >= 0; k = from[k]) path.push(k); path.reverse(); phase = 'walk'; break; }
              const x = i % n, y = i / n | 0;
              for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue; const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
                const j = yy * n + xx; if (block[j] || state[j] === 2) continue;
                if (dx && dy && (block[y * n + xx] || block[yy * n + x])) continue;   // no cutting corners
                const ng = gc[i] + (dx && dy ? 1.414 : 1);
                if (state[j] === 1 && ng >= gc[j]) continue;
                gc[j] = ng; from[j] = i; hf[j] = ng + h(j); state[j] = 1; push(j);
              }
            }
            if (phase === 'search' && !heap.length) { at = free(); begin(); }
          } else if (phase === 'walk') {
            step += dt * 14; const k = Math.min(path.length - 1, step | 0); at = path[k]; trail[at] = 1;
            if (k >= path.length - 1) { phase = 'rest'; wait = 1; }
          } else if ((wait -= dt) <= 0) begin();
          const scale = 256 / (n * 1.6);
          for (let i = 0; i < N; i++) {
            trail[i] *= 0.985;
            if (block[i]) { d[i] = rock; continue; }
            let c = state[i] === 2 ? dimPk(lut[((gc[i] * scale) | 0) & 255], 0.5) : state[i] === 1 ? lut[((gc[i] * scale) | 0) & 255] : BLACK;
            if (trail[i] > 0.05) c = glowPk(c, trail[i] * 0.8);
            d[i] = c;
          }
          if (phase !== 'search') for (const i of path) if (state[i] === 2) d[i] = glowPk(d[i], 0.55);
          d[goal] = WHITE; d[at] = WHITE;
          if (g.input.inside) { const hx = Math.min(n - 1, g.input.x * n | 0), hy = Math.min(n - 1, g.input.y * n | 0), mk = block[hy * n + hx] ? 0xff6a6a6a : 0xffd0d0d0; for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) X.put(g, hx + dx, hy + dy, mk); }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, nz = U.noise(R).n2, sc = R.range(0.04, 0.16), th = R.range(0.05, 0.35), nl = neonN(R), lut = nl.lut, rock = dimPk(lut[R.int(0, 255)], 0.3), N = n * n;
      const block = new Uint8Array(N);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) block[y * n + x] = nz(x * sc, y * sc) > th ? 1 : 0;
      // terrain: noise boulders (the original), straight walls with doorways, or rings round a centre
      const A = g.alt, terrain = g.trait('Terrain', A() < 0.5 ? (sc < 0.08 ? 'Continents' : sc > 0.12 ? 'Gravel' : 'Boulders') : A() < 0.75 ? 'Walls' : A() < 0.92 ? 'Rings' : 'Open field'), four = g.trait('Moves', A() < 0.65 ? 'Eight ways' : 'Four ways') === 'Four ways';
      g.trait('Rock', terrain === 'Walls' || terrain === 'Rings' ? 'Thin' : terrain === 'Open field' ? 'None' : th < 0.17 ? 'Dense' : th > 0.27 ? 'Sparse' : 'Open'); g.trait('Palette', nl.name);
      if (terrain === 'Walls' || terrain === 'Rings' || terrain === 'Open field') block.fill(0);
      const rockCol = terrain === 'Walls' || terrain === 'Rings' ? dimPk(lut[R.int(0, 255)], 0.55) : rock;
      if (terrain === 'Walls') for (let k = 0; k < Math.round(n / 7); k++) {
        const hz = A() < 0.5, at0 = Math.round(A() * (n - 1)), a = Math.round(A() * n * 0.4), b = a + Math.round(n * (0.35 + A() * 0.4)), gap = a + Math.round((b - a) * A()), gw = Math.max(2, n / 20 | 0);
        for (let s = a; s < Math.min(n, b); s++) if (Math.abs(s - gap) > gw) for (let w2 = 0; w2 < (n >= 80 ? 3 : 2); w2++) { const q = Math.min(n - 1, at0 + w2); block[hz ? q * n + s : s * n + q] = 1; }
      }
      if (terrain === 'Rings') { const cx = n * (0.35 + A() * 0.3), cy = n * (0.35 + A() * 0.3), step = n / (5 + A() * 2), doors = [0, 1, 2].map(() => A() * Math.PI * 2);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot(x - cx, y - cy), k = r / step, a = Math.atan2(y - cy, x - cx); if (r > step * 0.6 && k - Math.floor(k) < (n >= 80 ? 0.3 : 0.38) && !doors.some(dd => Math.abs(Math.atan2(Math.sin(a - dd - Math.floor(k)), Math.cos(a - dd - Math.floor(k)))) < 0.32)) block[y * n + x] = 1; } }
      if (terrain === 'Open field') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) block[y * n + x] = nz(x * sc * 1.7 + 40, y * sc * 1.7) > 0.52 ? 1 : 0;
      const gc = new Float32Array(N), from = new Int32Array(N), state = new Uint8Array(N), trail = new Float32Array(N);   // state: 0 new, 1 open, 2 closed
      const heap = [], hf = new Float32Array(N);
      const push = i => { heap.push(i); let k = heap.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (hf[heap[p]] <= hf[i]) break; heap[k] = heap[p]; k = p; } heap[k] = i; };
      const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { let k = 0; for (;;) { let c = 2 * k + 1; if (c >= heap.length) break; if (c + 1 < heap.length && hf[heap[c + 1]] < hf[heap[c]]) c++; if (hf[heap[c]] >= hf[last]) break; heap[k] = heap[c]; k = c; } heap[k] = last; } return top; };
      const free = () => { for (;;) { const i = R.int(0, N - 1); if (!block[i]) return i; } };
      let at = free(), goal, phase, path, step, wait;
      const begin = want => {
        for (let tries = 0; tries < 50; tries++) { goal = want != null ? want : free(); if (want != null) break; if (Math.hypot(goal % n - at % n, (goal / n | 0) - (at / n | 0)) > n * 0.55) break; }
        state.fill(0); heap.length = 0; gc[at] = 0; hf[at] = 0; from[at] = -1; state[at] = 1; push(at); phase = 'search'; path = []; step = 0;
      };
      begin();
      const h = (i) => { const dx = Math.abs(i % n - goal % n), dy = Math.abs((i / n | 0) - (goal / n | 0)); return four ? dx + dy : Math.max(dx, dy) + 0.414 * Math.min(dx, dy); };
      const per = Math.max(6, Math.round(N / 160));
      return (t, dt) => {
        for (const tp of inp.taps()) { const i = Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0); if (!block[i] && i !== at) begin(i); }
        if (phase === 'search') {
          for (let s = 0; s < per && heap.length; s++) {
            const i = pop(); if (state[i] === 2) continue; state[i] = 2;
            if (i === goal) { for (let k = i; k >= 0; k = from[k]) path.push(k); path.reverse(); phase = 'walk'; break; }
            const x = i % n, y = i / n | 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue; const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
              const j = yy * n + xx; if (block[j] || state[j] === 2) continue;
              if (dx && dy && (four || block[y * n + xx] || block[yy * n + x])) continue;   // no cutting corners
              const ng = gc[i] + (dx && dy ? 1.414 : 1);
              if (state[j] === 1 && ng >= gc[j]) continue;
              gc[j] = ng; from[j] = i; hf[j] = ng + h(j); state[j] = 1; push(j);
            }
          }
          if (phase === 'search' && !heap.length) { at = free(); begin(); }
        } else if (phase === 'walk') {
          step += dt * 14; const k = Math.min(path.length - 1, step | 0); at = path[k]; trail[at] = 1;
          if (k >= path.length - 1) { phase = 'rest'; wait = 1; }
        } else if ((wait -= dt) <= 0) begin();
        const scale = 256 / (n * 1.6);
        for (let i = 0; i < N; i++) {
          trail[i] *= 0.985;
          if (block[i]) { d[i] = rockCol; continue; }
          let c = state[i] === 2 ? dimPk(lut[((gc[i] * scale) | 0) & 255], 0.5) : state[i] === 1 ? lut[((gc[i] * scale) | 0) & 255] : BLACK;
          if (trail[i] > 0.05) c = glowPk(c, trail[i] * 0.8);
          d[i] = c;
        }
        if (phase !== 'search') for (const i of path) if (state[i] === 2) d[i] = glowPk(d[i], 0.55);
        d[goal] = WHITE; d[at] = WHITE;
        if (inp.inside) { const hx = Math.min(n - 1, inp.x * n | 0), hy = Math.min(n - 1, inp.y * n | 0), mk = block[hy * n + hx] ? 0xff6a6a6a : 0xffd0d0d0; for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) X.put(g, hx + dx, hy + dy, mk); }
      };
    },
  });

  // A chunky tile: flat face, a lighter top-left edge and a darker bottom-right
  const tile = (g, x, y, s, c, lit = 0, style) => {
    if (style === 'Pixel') { X.rect(g, x, y, s, s, lit > 0 ? glowPk(c, lit) : c); return; }
    if (style === 'Inset') { X.rect(g, x + 1, y + 1, s - 3, s - 3, lit > 0 ? glowPk(c, lit) : c); return; }
    if (style === 'Round' && s >= 5) {
      const face = lit > 0 ? glowPk(c, lit) : c, r = (s - 1) / 2, cx = x + r, cy = y + r;
      X.disc(g, cx, cy, r, dimPk(face, 0.62)); X.disc(g, cx - r * 0.12, cy - r * 0.12, r * 0.84, face); X.disc(g, cx - r * 0.4, cy - r * 0.4, Math.max(0.7, r * 0.22), glowPk(face, 0.5));
      return;
    }
    if (s < 4) { X.rect(g, x, y, s - 1, s - 1, c); return; }
    const face = lit > 0 ? glowPk(c, lit) : c;
    X.rect(g, x, y, s - 1, s - 1, face);
    X.rect(g, x, y, s - 1, 1, glowPk(face, 0.35)); X.rect(g, x, y, 1, s - 1, glowPk(face, 0.35));
    X.rect(g, x, y + s - 2, s - 1, 1, dimPk(face, 0.62)); X.rect(g, x + s - 2, y, 1, s - 1, dimPk(face, 0.62));
  };
  // a palette for sorted values: the neon wheel, a two-ink ramp, or a collection palette
  // ramp() with a name for what it rolled (same draws)
  const rampN = R => { const k = R.pick(['neon', 'neon', 'scheme', 'duo']); if (k === 'neon') return neonN(R); if (k === 'scheme') { const sc = U.scheme(R, 0); return { lut: sc.lut, name: sc.name }; } const ha = R.range(0, 100), a = X.hsbPk(ha, 90, 100), hb = R.range(0, 100), b = X.hsbPk(hb, 90, 100); return { lut: Uint32Array.from({ length: 256 }, (_, i) => X.mixPk(dimPk(a, 0.25), glowPk(b, 0.2), i / 255)), name: hueName(ha) + ' into ' + hueName(hb) }; };
  const ramp = R => { const k = R.pick(['neon', 'neon', 'scheme', 'duo']); if (k === 'neon') return neon(R); if (k === 'scheme') return U.scheme(R, 0).lut; const a = X.hsbPk(R.range(0, 100), 90, 100), b = X.hsbPk(R.range(0, 100), 90, 100); return Uint32Array.from({ length: 256 }, (_, i) => X.mixPk(dimPk(a, 0.25), glowPk(b, 0.2), i / 255)); };

  add({
    name: 'Shear Sort', seed: 4, sizes: [40, 50, 80], fps: 12,
    interactive: 'Click to shuffle the tiles again.',
    recipe: 'A shuffled grid of chunky colour tiles sorts itself with shear sort: every row is sorted at once, snaking left then right, then every column, over and over, the pairs being compared lighting up as they swap, until the whole square reads as one ribbon of colour. Then it is shuffled again.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, m = R.pick([6, 8, 8, 10, 12]), b = Math.floor(n / m), M = m * m, v = new Int32Array(M), lit = new Float32Array(M), rn = rampN(R), lut = rn.lut, off = (n - m * b) >> 1;
      const bg = R.pick([BLACK, BLACK, 0xff181818]), pace = R.pick([1, 1, 2]), marks = R.bool(0.35);
      // tile shape is a new trait from the second stream, so every existing roll keeps its picture when it rolls Bevelled
      const A = g.alt, shape = g.trait('Tiles', g.home || A() < 0.5 ? 'Bevelled' : A() < 0.45 ? 'Round' : A() < 0.6 ? 'Pixel' : 'Inset');
      g.trait('Grid', m + ' x ' + m); g.trait('Palette', rn.name); g.trait('Ground', bg === BLACK ? 'Black' : 'Slate'); g.trait('Marks', marks ? 'Centre dots' : 'None');
      for (let i = 0; i < M; i++) v[i] = i;
      let phase = 'shuffle', k = 0, pass = 0, stepIn = 0, hold = 0, wait = 0;
      const rounds = Math.ceil(Math.log2(m)) + 1;
      const cx = (i, j) => { if (v[i] > v[j]) { const s = v[i]; v[i] = v[j]; v[j] = s; lit[i] = lit[j] = 1; } };
      return (t, dt) => {
        if (inp.taps().length) { phase = 'shuffle'; k = 0; }
        if (phase === 'shuffle') { for (let s = 0; s < M / 8; s++) { const i = R.int(0, M - 1), j = R.int(0, M - 1), q = v[i]; v[i] = v[j]; v[j] = q; lit[i] = 0.5; } if (++k > 18) { phase = 'rows'; k = 0; pass = 0; stepIn = 0; } }
        else if (phase === 'hold') { if ((hold -= dt) <= 0) { phase = 'shuffle'; k = 0; } }
        else if (++wait >= pace) {
          wait = 0;
          // one odd-even transposition step across every row (snaking) or every column
          const odd = stepIn & 1;
          if (phase === 'rows') for (let y = 0; y < m; y++) for (let x = odd; x + 1 < m; x += 2) { const a = y * m + x; if (y & 1) cx(a + 1, a); else cx(a, a + 1); }
          else for (let x = 0; x < m; x++) for (let y = odd; y + 1 < m; y += 2) cx(y * m + x, (y + 1) * m + x);
          if (++stepIn >= m) { stepIn = 0; if (phase === 'rows') { if (pass >= rounds) { phase = 'hold'; hold = 3; } else phase = 'cols'; } else { phase = 'rows'; pass++; } }
        }
        d.fill(bg);
        for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
          const i = y * m + x, c = lut[(v[i] * 255 / (M - 1)) | 0];
          lit[i] *= 0.7;
          tile(g, off + x * b, off + y * b, b, c, lit[i] * 0.6, shape);
          if (marks && b >= 6) X.rect(g, off + x * b + (b >> 1) - 1, off + y * b + (b >> 1) - 1, 2, 2, dimPk(c, 0.5));
        }
        if (phase === 'hold') for (let y = 0; y < m; y++) { const x = y & 1 ? 0 : m - 1; X.rect(g, off + x * b + (b >> 1), off + y * b + (b >> 1), 1, y < m - 1 ? b : 1, WHITE); }   // the finished snake
      };
    },
  });

  add({
    name: 'Hash Table', seed: 6, sizes: [40, 50, 80], fps: 12,
    interactive: 'Click a slot to hash a new key there and watch it probe for room.',
    recipe: 'Keys drop into a hash table one by one, each coloured by the slot it hashes to. A key that finds its slot taken hops onward along its probe sequence (linear, quadratic or a second hash, a new scheme each round), leaving a trail, so clusters of misplaced colour grow; pips under each key count how far it had to travel.',
    make(R, U, g) {
      const { n, d } = g, inp = g.input, m = R.pick([6, 8, 8, 10]), b = Math.floor(n / m), M = m * m, home = new Int32Array(M), probes = new Int32Array(M), flash = new Float32Array(M), trail = new Float32Array(M), off = (n - m * b) >> 1;
      const empty = R.pick([0xff141418, 0xff1c1c1c, 0xff101820]), hop = R.pick([1, 2]);
      const A = g.alt, shape = g.trait('Slots', g.home || A() < 0.5 ? 'Bevelled' : A() < 0.45 ? 'Round' : A() < 0.6 ? 'Pixel' : 'Inset'), hot = !g.home && A() < 0.3, spots = [0, 1, 2].map(() => (A() * M) | 0);
      g.trait('Keys', hot ? 'Clustered' : 'Scattered'); g.trait('Table', m + ' x ' + m);
      let lut, scheme, count, hold, clearAt, key = null, wait = 0, named = false;
      const reset = () => { const rn = rampN(R); lut = rn.lut; scheme = R.pick(['linear', 'linear', 'quadratic', 'double']); if (!named) { named = true; g.trait('Palette', rn.name); g.trait('Probing', scheme === 'linear' ? 'Linear first' : scheme === 'quadratic' ? 'Quadratic first' : 'Double hash first'); } home.fill(-1); probes.fill(0); count = 0; hold = 0; clearAt = -1; key = null; };
      reset();
      const slotOf = (k0, h2, k) => scheme === 'linear' ? (k0 + k) % M : scheme === 'quadratic' ? (k0 + k * (k + 1) / 2) % M : (k0 + k * h2) % M;
      const launch = h0 => { let h2 = R.int(1, M - 1); while (gcd(h2, M) !== 1) h2 = R.int(1, M - 1); key = { h0, h2, k: 0 }; };
      return (t, dt) => {
        for (const tp of inp.taps()) { const x = Math.floor((tp.x * n - off) / b), y = Math.floor((tp.y * n - off) / b); if (x >= 0 && y >= 0 && x < m && y < m && clearAt < 0 && count < M) { if (key) { const s = slotOf(key.h0, key.h2, key.k); if (home[s] < 0) { home[s] = key.h0; probes[s] = key.k; count++; } } launch(y * m + x); } }
        if (clearAt >= 0) { for (let s = 0; s < m && clearAt < M; s++, clearAt++) { home[clearAt] = -1; flash[clearAt] = 0.6; } if (clearAt >= M) reset(); }
        else if (key) {
          if (++wait >= hop) {
            wait = 0;
            const s = slotOf(key.h0, key.h2, key.k);
            flash[s] = 1; trail[s] = 1;
            if (home[s] < 0) { home[s] = key.h0; probes[s] = key.k; count++; key = null; }
            else if (++key.k >= M) key = null;
          }
        }
        else if (count >= M * 0.9) { if ((hold += dt) > 2.5) clearAt = 0; }
        else launch(hot ? (spots[(A() * 3) | 0] + ((A() * m) | 0)) % M : R.int(0, M - 1));
        d.fill(BLACK);
        for (let i = 0; i < M; i++) {
          flash[i] *= 0.75; trail[i] *= 0.9;
          const x = off + (i % m) * b, y = off + (i / m | 0) * b;
          if (home[i] < 0) { X.rect(g, x, y, b - 1, b - 1, trail[i] > 0.05 ? X.mixPk(empty, WHITE, trail[i] * 0.25) : empty); continue; }
          const c = lut[(home[i] * 255 / (M - 1)) | 0];
          tile(g, x, y, b, c, flash[i] * 0.6, shape);
          // probe count as pips along the bottom edge
          for (let p = 0; p < Math.min(probes[i], b - 3); p++) X.rect(g, x + 2 + p * 2, y + b - 4, 1, 1, p < 8 ? BLACK : WHITE);
        }
        if (key) { const s = slotOf(key.h0, key.h2, key.k), x = off + (s % m) * b, y = off + (s / m | 0) * b, c = lut[(key.h0 * 255 / (M - 1)) | 0]; X.rect(g, x - 1, y - 1, b + 1, 1, WHITE); X.rect(g, x - 1, y + b - 1, b + 1, 1, WHITE); X.rect(g, x - 1, y - 1, 1, b + 1, WHITE); X.rect(g, x + b - 1, y - 1, 1, b + 1, WHITE); X.rect(g, x + (b >> 2), y + (b >> 2), b >> 1, b >> 1, c); }
      };
    },
  });

  add({
    name: 'Edit Distance', seed: 1, sizes: [100], fps: 12,
    interactive: 'Click to compare a new pair of words.',
    recipe: 'Two of the collection’s words are compared by dynamic programming: the table of edit costs fills in one diagonal wave at a time, each cell coloured by how many changes it takes, and then the cheapest way of turning one word into the other is traced back through it.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, WORDS = ['PRISM', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'CASCADE', 'INVADER', 'AXON', 'KALEIDO', 'LATTICE', 'SUNBURST', 'MANDALA', 'CIRCUIT', 'RIPPLE', 'NEON', 'VELVET', 'STATIC', 'CYMBAL'];
        let a, b, tab, wave, lut, path, hold, timer, glow;
        g.trait('Cells', 'Squares'); g.trait('Ground', 'Black'); g.trait('Palette', 'New each pair');
        const reset = (Q = R) => {
          a = Q.pick(WORDS); do b = Q.pick(WORDS); while (b === a);
          if (!g.traits.some(t => t[0] === 'First pair')) g.trait('First pair', a + ' / ' + b);
          tab = Array.from({ length: a.length + 1 }, () => new Int16Array(b.length + 1).fill(-1));
          wave = 0; path = null; hold = 0; timer = 0; glow = 0;
          lut = U.hueLut(Q.bool(0.5) ? 100 : 85, 100, 256, Q.range(0, 100), Q.pick([100, 80, -80]));
        };
        reset();
        return (t, dt) => {
          if (g.input.taps().length) reset(g.alt);
          if (path) { glow = Math.min(1, glow + dt * 1.5); if ((hold += dt) > 4) reset(); }
          const A = a.length, B = b.length;
          if (!path && (timer += dt) > 0.22) {
            timer = 0;
            for (let i = 0; i <= A; i++) {
              const j = wave - i; if (j < 0 || j > B) continue;
              tab[i][j] = !i ? j : !j ? i : Math.min(tab[i - 1][j] + 1, tab[i][j - 1] + 1, tab[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            }
            if (++wave > A + B) {
              path = new Set(); let i = A, j = B; path.add(i * 99 + j);
              while (i || j) {
                if (i && j && tab[i][j] === tab[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) { i--; j--; }
                else if (i && tab[i][j] === tab[i - 1][j] + 1) i--; else j--;
                path.add(i * 99 + j);
              }
            }
          }
          d.fill(BLACK);
          // cells as large as the longer word allows; letters sit in the first row and column
          const cs = Math.max(7, Math.min(12, Math.floor(n / (Math.max(A, B) + 2)))), ox = Math.floor((n - (B + 2) * cs) / 2), oy = Math.floor((n - (A + 2) * cs) / 2), top = Math.max(A, B) || 1, inset = (cs - 5) >> 1;
          for (let j = 0; j < B; j++) X.text(g, b[j], ox + (j + 2) * cs + inset, oy + Math.max(0, cs - 8), 0xffe0e0e0);
          for (let i = 0; i < A; i++) X.text(g, a[i], ox + inset, oy + (i + 2) * cs + ((cs - 7) >> 1), 0xffe0e0e0);
          for (let i = 0; i <= A; i++) for (let j = 0; j <= B; j++) {
            const v = tab[i][j]; if (v < 0) continue;
            let c = lut[(v / top * 230) | 0];
            const on = path && path.has(i * 99 + j);
            if (path && !on) c = dimPk(c, 1 - glow * 0.55);
            if (on) c = glowPk(c, glow * 0.75);
            if (!path && i + j === wave - 1) c = glowPk(c, 0.5);
            X.rect(g, ox + (j + 1) * cs, oy + (i + 1) * cs, cs - 1, cs - 1, c);
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, WORDS = ['PRISM', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'CASCADE', 'INVADER', 'AXON', 'KALEIDO', 'LATTICE', 'SUNBURST', 'MANDALA', 'CIRCUIT', 'RIPPLE', 'NEON', 'VELVET', 'STATIC', 'CYMBAL'];
      let a, b, tab, wave, lut, path, hold, timer, glow;
      const A0 = g.alt, cells = g.trait('Cells', A0() < 0.45 ? 'Squares' : A0() < 0.5 ? 'Digits' : A0() < 0.7 ? 'Dots' : 'Bars'), ruled = g.trait('Ground', A0() < 0.6 ? 'Black' : 'Ruled') === 'Ruled';
      g.trait('Palette', 'New each pair');
      const reset = () => {
        a = R.pick(WORDS); do b = R.pick(WORDS); while (b === a);
        if (!g.traits.some(t => t[0] === 'First pair')) g.trait('First pair', a + ' / ' + b);
        tab = Array.from({ length: a.length + 1 }, () => new Int16Array(b.length + 1).fill(-1));
        wave = 0; path = null; hold = 0; timer = 0; glow = 0;
        lut = U.hueLut(R.bool(0.5) ? 100 : 85, 100, 256, R.range(0, 100), R.pick([100, 80, -80]));
      };
      reset();
      return (t, dt) => {
        if (g.input.taps().length) reset();
        if (path) { glow = Math.min(1, glow + dt * 1.5); if ((hold += dt) > 4) reset(); }
        const A = a.length, B = b.length;
        if (!path && (timer += dt) > 0.22) {
          timer = 0;
          for (let i = 0; i <= A; i++) {
            const j = wave - i; if (j < 0 || j > B) continue;
            tab[i][j] = !i ? j : !j ? i : Math.min(tab[i - 1][j] + 1, tab[i][j - 1] + 1, tab[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
          }
          if (++wave > A + B) {
            path = new Set(); let i = A, j = B; path.add(i * 99 + j);
            while (i || j) {
              if (i && j && tab[i][j] === tab[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) { i--; j--; }
              else if (i && tab[i][j] === tab[i - 1][j] + 1) i--; else j--;
              path.add(i * 99 + j);
            }
          }
        }
        d.fill(BLACK);
        // cells as large as the longer word allows; letters sit in the first row and column
        const cs = Math.max(7, Math.min(12, Math.floor(n / (Math.max(A, B) + 2)))), ox = Math.floor((n - (B + 2) * cs) / 2), oy = Math.floor((n - (A + 2) * cs) / 2), top = Math.max(A, B) || 1, inset = (cs - 5) >> 1;
        for (let j = 0; j < B; j++) X.text(g, b[j], ox + (j + 2) * cs + inset, oy + Math.max(0, cs - 8), 0xffe0e0e0);
        for (let i = 0; i < A; i++) X.text(g, a[i], ox + inset, oy + (i + 2) * cs + ((cs - 7) >> 1), 0xffe0e0e0);
        for (let i = 0; i <= A; i++) for (let j = 0; j <= B; j++) {
          const v = tab[i][j]; if (v < 0) continue;
          let c = lut[(v / top * 230) | 0];
          const on = path && path.has(i * 99 + j);
          if (path && !on) c = dimPk(c, 1 - glow * 0.55);
          if (on) c = glowPk(c, glow * 0.75);
          if (!path && i + j === wave - 1) c = glowPk(c, 0.5);
          const x = ox + (j + 1) * cs, y = oy + (i + 1) * cs, s = cs - 1;
          if (cells === 'Squares') X.rect(g, x, y, s, s, c);
          else if (cells === 'Digits') { X.rect(g, x, y, s, s, dimPk(c, on ? 0.45 : 0.18)); X.text(g, String(Math.min(9, v)), x + ((s - 5) >> 1), y + ((s - 7) >> 1), c); }
          else if (cells === 'Dots') X.disc(g, x + s / 2, y + s / 2, Math.max(1, s / 2 * (0.45 + 0.55 * (1 - v / top))), c);
          else { const hgt = Math.max(1, Math.round(s * (0.25 + 0.75 * v / top))); X.rect(g, x, y + s - hgt, s, hgt, c); }
        }
        if (ruled) for (let i = 0; i <= A + 1; i++) for (let j = 0; j <= B + 1; j++) X.put(g, ox + (j + 1) * cs - 1, oy + (i + 1) * cs - 1, 0xff505050);   // a dot at every cell corner
      };
    },
  });

  add({
    name: 'Four Colours', seed: 4, sizes: [50, 80], fps: 12,
    interactive: 'Click to drop a new country where you click; the map is recoloured.',
    recipe: 'A map of countries is coloured with only four colours so that no neighbours match, by trial and error: each country tries a colour, and when one is boxed in the search backs up and repaints. Then the borders shift and it starts again.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, N = n * n, own = new Int16Array(N), nl = neonN(R), lut = nl.lut, base = R.range(0, 256);
        const pal = [0, 1, 2, 3].map(k => lut[((base + k * 64) | 0) & 255]), blank = 0xff1c1c1c;
        g.trait('Map', 'Round cells'); g.trait('Colours', 'Neon'); g.trait('Borders', 'Black'); g.trait('Palette', nl.name);
        let K, sx, sy, vx, vy, adj, colour, order, pos, tried, hold, glow;
        const seeds = () => {
          K = R.int(Math.round(n * 0.45), Math.round(n * 0.7)); sx = []; sy = []; vx = []; vy = [];
          for (let k = 0; k < K; k++) { sx.push(R.range(0, n)); sy.push(R.range(0, n)); vx.push(R.range(-1, 1) * 1.5); vy.push(R.range(-1, 1) * 1.5); }
        };
        const build = (Q = R) => {
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            let best = 0, bd = 1e9;
            for (let k = 0; k < K; k++) { const dx = x - sx[k], dy = y - sy[k], dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = k; } }
            own[y * n + x] = best;
          }
          adj = Array.from({ length: K }, () => new Set());
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const a = own[y * n + x]; if (x + 1 < n && own[y * n + x + 1] !== a) { adj[a].add(own[y * n + x + 1]); adj[own[y * n + x + 1]].add(a); } if (y + 1 < n && own[(y + 1) * n + x] !== a) { adj[a].add(own[(y + 1) * n + x]); adj[own[(y + 1) * n + x]].add(a); } }
          colour = new Int8Array(K).fill(-1); glow = new Float32Array(K);
          order = Q.shuffle(Array.from({ length: K }, (_, k) => k)); pos = 0; tried = new Int8Array(K).fill(-1); hold = 0;
        };
        seeds(); build();
        let acc = 0;
        return (t, dt) => {
          let added = 0;
          for (const tp of g.input.taps()) { sx.push(tp.x * n); sy.push(tp.y * n); vx.push(g.alt.range(-1, 1) * 1.5); vy.push(g.alt.range(-1, 1) * 1.5); K++; if (K > n * 1.2) { sx.shift(); sy.shift(); vx.shift(); vy.shift(); K--; } added++; }
          if (added) build(g.alt);
          const hk = g.input.inside ? own[Math.min(n - 1, g.input.y * n | 0) * n + Math.min(n - 1, g.input.x * n | 0)] : -1;
          acc += dt;
          if (pos >= K) { if ((hold += dt) > 3) { for (let k = 0; k < K; k++) { sx[k] = Math.min(n, Math.max(0, sx[k] + vx[k] * 3)); sy[k] = Math.min(n, Math.max(0, sy[k] + vy[k] * 3)); } build(); } }
          else while (acc > 0.09 && pos < K) {
            acc -= 0.09;
            const r = order[pos];
            let c = tried[r] + 1;
            while (c < 4) { let ok = true; for (const o of adj[r]) if (colour[o] === c) { ok = false; break; } if (ok) break; c++; }
            if (c < 4) { colour[r] = c; tried[r] = c; glow[r] = 1; pos++; }
            else { colour[r] = -1; tried[r] = -1; pos--; if (pos < 0) pos = 0; const p = order[pos]; colour[p] = -1; glow[p] = -1; }
          }
          for (let k = 0; k < K; k++) glow[k] *= 0.85;
          for (let i = 0; i < N; i++) {
            const k = own[i], x = i % n;
            const edge = (x + 1 < n && own[i + 1] !== k) || (i + n < N && own[i + n] !== k);
            if (edge) { d[i] = BLACK; continue; }
            const c = k === hk ? glowPk(colour[k] < 0 ? blank : pal[colour[k]], 0.3) : colour[k] < 0 ? blank : pal[colour[k]];
            d[i] = glow[k] > 0.05 ? glowPk(c, glow[k] * 0.7) : glow[k] < -0.05 ? dimPk(0xff3030ff, -glow[k]) : c;
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, N = n * n, own = new Int16Array(N), nl = neonN(R), lut = nl.lut, base = R.range(0, 256);
      const A = g.alt, metric = g.trait('Map', A() < 0.4 ? 'Round cells' : A() < 0.4 ? 'Blocky' : A() < 0.5 ? 'Square' : A() < 0.6 ? 'Stretched' : 'Crystal');
      const inks = g.trait('Colours', A() < 0.55 ? 'Neon' : A() < 0.7 ? 'Atlas' : A() < 0.8 ? 'Earth' : 'One hue'), borders = g.trait('Borders', A() < 0.6 ? 'Black' : A() < 0.6 ? 'Paper' : 'Gold');
      const pal = inks === 'Atlas' ? [0xff8cc4f0, 0xff92d0a8, 0xff9a9ce8, 0xffe0c890] : inks === 'Earth' ? [0xff4a7ab0, 0xff3e8a6a, 0xff3050a0, 0xff7aa8c8] : inks === 'One hue' ? [0, 1, 2, 3].map(k => dimPk(lut[(base | 0) & 255], 0.35 + k * 0.21)) : [0, 1, 2, 3].map(k => lut[((base + k * 64) | 0) & 255]), blank = 0xff1c1c1c;
      const edgeCol = borders === 'Black' ? BLACK : borders === 'Paper' ? 0xffd8e4ec : 0xff40b8e8, sx2 = metric === 'Stretched' ? 0.25 : 1;
      g.trait('Palette', inks === 'Neon' || inks === 'One hue' ? nl.name : inks);
      let K, sx, sy, vx, vy, adj, colour, order, pos, tried, hold, glow;
      const seeds = () => {
        K = R.int(Math.round(n * 0.45), Math.round(n * 0.7)); sx = []; sy = []; vx = []; vy = [];
        for (let k = 0; k < K; k++) { sx.push(R.range(0, n)); sy.push(R.range(0, n)); vx.push(R.range(-1, 1) * 1.5); vy.push(R.range(-1, 1) * 1.5); }
      };
      const build = () => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let best = 0, bd = 1e9;
          for (let k = 0; k < K; k++) { const dx = x - sx[k], dy = y - sy[k], dd = metric === 'Blocky' ? Math.abs(dx) + Math.abs(dy) : metric === 'Square' ? Math.max(Math.abs(dx), Math.abs(dy)) : metric === 'Crystal' ? Math.abs(dx) + Math.abs(dy) + Math.max(Math.abs(dx), Math.abs(dy)) * 0.6 : dx * dx * sx2 + dy * dy; if (dd < bd) { bd = dd; best = k; } }
          own[y * n + x] = best;
        }
        adj = Array.from({ length: K }, () => new Set());
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const a = own[y * n + x]; if (x + 1 < n && own[y * n + x + 1] !== a) { adj[a].add(own[y * n + x + 1]); adj[own[y * n + x + 1]].add(a); } if (y + 1 < n && own[(y + 1) * n + x] !== a) { adj[a].add(own[(y + 1) * n + x]); adj[own[(y + 1) * n + x]].add(a); } }
        colour = new Int8Array(K).fill(-1); glow = new Float32Array(K);
        order = R.shuffle(Array.from({ length: K }, (_, k) => k)); pos = 0; tried = new Int8Array(K).fill(-1); hold = 0;
      };
      seeds(); build();
      let acc = 0;
      return (t, dt) => {
        let added = 0;
        for (const tp of g.input.taps()) { sx.push(tp.x * n); sy.push(tp.y * n); vx.push(R.range(-1, 1) * 1.5); vy.push(R.range(-1, 1) * 1.5); K++; if (K > n * 1.2) { sx.shift(); sy.shift(); vx.shift(); vy.shift(); K--; } added++; }
        if (added) build();
        const hk = g.input.inside ? own[Math.min(n - 1, g.input.y * n | 0) * n + Math.min(n - 1, g.input.x * n | 0)] : -1;
        acc += dt;
        if (pos >= K) { if ((hold += dt) > 3) { for (let k = 0; k < K; k++) { sx[k] = Math.min(n, Math.max(0, sx[k] + vx[k] * 3)); sy[k] = Math.min(n, Math.max(0, sy[k] + vy[k] * 3)); } build(); } }
        else while (acc > 0.09 && pos < K) {
          acc -= 0.09;
          const r = order[pos];
          let c = tried[r] + 1;
          while (c < 4) { let ok = true; for (const o of adj[r]) if (colour[o] === c) { ok = false; break; } if (ok) break; c++; }
          if (c < 4) { colour[r] = c; tried[r] = c; glow[r] = 1; pos++; }
          else { colour[r] = -1; tried[r] = -1; pos--; if (pos < 0) pos = 0; const p = order[pos]; colour[p] = -1; glow[p] = -1; }
        }
        for (let k = 0; k < K; k++) glow[k] *= 0.85;
        for (let i = 0; i < N; i++) {
          const k = own[i], x = i % n;
          const edge = (x + 1 < n && own[i + 1] !== k) || (i + n < N && own[i + n] !== k);
          if (edge) { d[i] = edgeCol; continue; }
          const c = k === hk ? glowPk(colour[k] < 0 ? blank : pal[colour[k]], 0.3) : colour[k] < 0 ? blank : pal[colour[k]];
          d[i] = glow[k] > 0.05 ? glowPk(c, glow[k] * 0.7) : glow[k] < -0.05 ? dimPk(0xff3030ff, -glow[k]) : c;
        }
      };
    },
  });

  add({
    name: 'Skyline', seed: 3, sizes: [50, 80, 100], fps: 12,
    recipe: 'Boxes of every size are packed into the square by the skyline rule: each one drops into the lowest gap that will take it, as far left as it can. The jar fills from the bottom with a jagged skyline on top, and when nothing more fits it empties.',
    make(R, U, g) {
      const { n, d } = g, top = new Int16Array(n), boxes = [];
      let lut, hue, timer = 0, falling = null, hold = 0, sinking = 0;
      const reset = () => { lut = neon(R); hue = R.range(0, 256); top.fill(0); boxes.length = 0; hold = 0; sinking = 0; };
      reset();
      const place = () => {
        for (let tries = 0; tries < 8; tries++) {
          const w = R.int(Math.max(3, Math.round(n / 10)), Math.round(n / 3)), h = R.int(Math.max(2, Math.round(n / 14)), Math.round(n / 4));
          let bx = -1, by = 1e9;
          for (let x = 0; x + w <= n; x++) { let m = 0; for (let k = x; k < x + w; k++) if (top[k] > m) m = top[k]; if (m < by) { by = m; bx = x; } }
          if (bx >= 0 && by + h <= n) { hue = (hue + R.range(9, 25)) % 256; return { x: bx, y: by, w, h, c: lut[hue | 0], fy: n + h }; }
        }
        return null;
      };
      return (t, dt) => {
        if (sinking > 0) { sinking -= dt; for (const b of boxes) b.y -= dt * n * 0.6; if (sinking <= 0) reset(); }
        else if (falling) {
          falling.fy -= dt * n * 2.5;
          if (falling.fy <= falling.y) { falling.fy = falling.y; boxes.push(falling); for (let k = falling.x; k < falling.x + falling.w; k++) top[k] = falling.y + falling.h; falling = null; }
        } else if ((timer += dt) > 0.12) { timer = 0; falling = place(); if (!falling) { if ((hold += 0.12) > 2.5) sinking = 1.8; } }
        d.fill(BLACK);
        const draw = (b, y) => { const yy = n - Math.round(y) - b.h; X.rect(g, b.x, yy, b.w, b.h, dimPk(b.c, 0.55)); X.rect(g, b.x + 1, yy + 1, b.w - 2, b.h - 2, b.c); };
        for (const b of boxes) draw(b, b.y);
        if (falling) draw(falling, falling.fy);
        if (!sinking) for (let x = 0; x < n; x++) X.put(g, x, n - 1 - top[x], 0xffffffff);
      };
    },
  });

  add({
    name: 'Back Reference', seed: 3, sizes: [100], fps: 12, prewarm: 30,
    interactive: 'Click to start a new page of text.',
    recipe: 'The collection’s words stream onto the screen while an LZ77 compressor reads them: whenever a run of letters has been seen before, both the new run and the earlier one take the same colour, so the page fills with the patterns the compressor would throw away.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, cols = Math.floor(n / 6), rows = Math.floor(n / 8), cap = cols * rows;
        const WORDS = ['PRISM', 'HUE', 'ECHO', 'VOID', 'GRAIN', 'NEON', 'TEMPO', 'SYNAE', 'DAWN', 'DEEP', 'EMBER', 'SPIRAL', 'STRATA', 'AXON', 'DECAY', 'CASCADE', 'FIELD', 'MIND'];
        let text, tint, glow, lut, hue, shown, timer, hold, pend;
        g.trait('Type', 'Small'); g.trait('Page', 'Dark'); g.trait('Matches', 'Highlight');
        const reset = (Q = R) => {
          const vocab = Q.shuffle(WORDS.slice()).slice(0, Q.int(4, 7)); text = '';
          if (!g.traits.some(t => t[0] === 'Vocabulary')) g.trait('Vocabulary', vocab.length + ' words');
          while (text.length < cap) text += Q.pick(vocab) + (Q.bool(0.2) ? '  ' : ' ');
          text = text.slice(0, cap); tint = new Int16Array(cap).fill(-1); glow = new Float32Array(cap); lut = neon(Q); hue = Q.range(0, 256); shown = 0; timer = 0; hold = 0; pend = 0;
        };
        reset();
        const encode = () => {   // longest earlier match for the text starting at `shown`
          let bl = 0, bs = -1;
          for (let s = Math.max(0, shown - 160); s < shown; s++) { let l = 0; while (shown + l < cap && l < 24 && text[s + l] === text[shown + l]) l++; if (l > bl) { bl = l; bs = s; } }
          if (bl >= 3) { hue = (hue + R.range(23, 61)) % 256; const c = hue | 0; for (let k = 0; k < bl; k++) { tint[bs + k] = c; tint[shown + k] = c; glow[bs + k] = 1; } return bl; }
          return 1;
        };
        return (t, dt) => {
          if (g.input.taps().length) reset(g.alt);
          if (shown >= cap) { if ((hold += dt) > 3) reset(); }
          else if ((timer += dt) > 0.07) { timer = 0; if (!pend) pend = encode(); shown++; pend--; }
          d.fill(BLACK);
          for (let i = 0; i < Math.min(shown, cap); i++) {
            const x = (i % cols) * 6 + 2, y = (i / cols | 0) * 8 + 2, ch = text[i];
            glow[i] *= 0.9;
            let c = tint[i] < 0 ? 0xff9a9a9a : lut[tint[i]];
            if (tint[i] >= 0) X.rect(g, x - 1, y - 1, 6, 8, dimPk(c, 0.22 + glow[i] * 0.4));
            if (glow[i] > 0.05) c = glowPk(c, glow[i] * 0.6);
            if (ch !== ' ') X.text(g, ch, x, y, c);
          }
          if (shown < cap) X.rect(g, (shown % cols) * 6 + 2, (shown / cols | 0) * 8 + 2, 5, 7, WHITE);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // type size, page and how matches are marked are this variation's own
      const A = g.alt, S = g.trait('Type', A() < 0.7 ? 'Small' : 'Large') === 'Large' ? 2 : 1, page = g.trait('Page', A() < 0.4 ? 'Dark' : A() < 0.55 ? 'Paper' : A() < 0.7 ? 'Terminal' : 'Blueprint'), mark = g.trait('Matches', A() < 0.45 ? 'Highlight' : A() < 0.55 ? 'Underline' : 'Ink');
      const { n, d } = g, cols = Math.floor(n / (6 * S)), rows = Math.floor(n / (8 * S)), cap = cols * rows, ox = (n - cols * 6 * S + S) >> 1, oy = (n - rows * 8 * S + S) >> 1;
      const ground = page === 'Paper' ? 0xffcfdde6 : page === 'Blueprint' ? 0xff6a3a1c : BLACK, plain = page === 'Paper' ? 0xff5a5a5a : page === 'Terminal' ? 0xff48b848 : page === 'Blueprint' ? 0xffe8d0b8 : 0xff9a9a9a, curCol = page === 'Paper' ? 0xff303030 : WHITE;
      const WORDS = ['PRISM', 'HUE', 'ECHO', 'VOID', 'GRAIN', 'NEON', 'TEMPO', 'SYNAE', 'DAWN', 'DEEP', 'EMBER', 'SPIRAL', 'STRATA', 'AXON', 'DECAY', 'CASCADE', 'FIELD', 'MIND'];
      let text, tint, glow, lut, hue, shown, timer, hold, pend;
      const reset = () => {
        const vocab = R.shuffle(WORDS.slice()).slice(0, R.int(4, 7)); text = '';
        while (text.length < cap) text += R.pick(vocab) + (R.bool(0.2) ? '  ' : ' ');
        if (!g.traits.some(t => t[0] === 'Vocabulary')) g.trait('Vocabulary', vocab.length + ' words');
        text = text.slice(0, cap); tint = new Int16Array(cap).fill(-1); glow = new Float32Array(cap); lut = neon(R); hue = R.range(0, 256); shown = 0; timer = 0; hold = 0; pend = 0;
      };
      reset();
      const encode = () => {   // longest earlier match for the text starting at `shown`
        let bl = 0, bs = -1;
        for (let s = Math.max(0, shown - 160); s < shown; s++) { let l = 0; while (shown + l < cap && l < 24 && text[s + l] === text[shown + l]) l++; if (l > bl) { bl = l; bs = s; } }
        if (bl >= 3) { hue = (hue + R.range(23, 61)) % 256; const c = hue | 0; for (let k = 0; k < bl; k++) { tint[bs + k] = c; tint[shown + k] = c; glow[bs + k] = 1; } return bl; }
        return 1;
      };
      return (t, dt) => {
        if (g.input.taps().length) reset();
        if (shown >= cap) { if ((hold += dt) > 3) reset(); }
        else if ((timer += dt) > 0.07) { timer = 0; if (!pend) pend = encode(); shown++; pend--; }
        d.fill(ground);
        for (let i = 0; i < Math.min(shown, cap); i++) {
          const x = ox + (i % cols) * 6 * S, y = oy + (i / cols | 0) * 8 * S, ch = text[i];
          glow[i] *= 0.9;
          let c = tint[i] < 0 ? plain : lut[tint[i]];
          if (tint[i] >= 0) {
            if (mark === 'Highlight') { X.rect(g, x - S, y - S, 6 * S, 8 * S, page === 'Paper' ? glowPk(c, 0.55 - glow[i] * 0.3) : dimPk(c, 0.22 + glow[i] * 0.4)); if (page === 'Paper') c = dimPk(c, 0.45); }
            else if (mark === 'Underline') { X.rect(g, x - S, y + 7 * S, 6 * S, S, c); if (page === 'Paper') c = dimPk(c, 0.6); }
            else if (page === 'Paper') c = dimPk(c, 0.7);
          }
          if (glow[i] > 0.05) c = page === 'Paper' ? dimPk(c, 1 - glow[i] * 0.4) : glowPk(c, glow[i] * 0.6);
          if (ch !== ' ') X.text(g, ch, x, y, c, S);
        }
        if (shown < cap) X.rect(g, ox + (shown % cols) * 6 * S, oy + (shown / cols | 0) * 8 * S, 5 * S, 7 * S, curCol);
      };
    },
  });

  add({
    name: 'Onion', seed: 3, sizes: [50, 80], fps: 12,
    interactive: 'Click to add points; the onion is peeled again.',
    recipe: 'A cloud of points is peeled like an onion by gift wrapping: a line swings round the outside from point to point to close the outermost hull, then the next one in, each layer in its own colour, until only the core is left. Then the points drift and it peels again.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, nl = neonN(R), lut = nl.lut, K0 = R.int(Math.round(n * 0.7), Math.round(n * 1.2)), px = [], py = [], vx = [], vy = [];
        g.trait('Cloud', 'Disc'); g.trait('Layers', 'Bands'); g.trait('Points', K0); g.trait('Palette', nl.name);
        let K = K0; const cap = K0 + 40;
        for (let k = 0; k < K; k++) { const r = Math.sqrt(R()) * n * 0.44, a = R() * Math.PI * 2; px.push(n / 2 + Math.cos(a) * r * R.range(0.8, 1.1)); py.push(n / 2 + Math.sin(a) * r); vx.push(R.range(-1, 1)); vy.push(R.range(-1, 1)); }
        let edges, shown, timer, hold, moving, layers, done;
        const peel = () => {
          const left = new Set(Array.from({ length: K }, (_, k) => k)); edges = []; layers = 0; done = [];
          while (left.size > 2) {
            const pts = [...left]; let start = pts[0];
            for (const p of pts) if (px[p] < px[start] || (px[p] === px[start] && py[p] < py[start])) start = p;
            let cur = start; const hull = [];
            do {
              hull.push(cur); let nxt = pts[0] === cur ? pts[1] : pts[0];
              for (const p of pts) { if (p === cur) continue; const cr = (px[nxt] - px[cur]) * (py[p] - py[cur]) - (py[nxt] - py[cur]) * (px[p] - px[cur]); if (cr < 0 || (cr === 0 && Math.hypot(px[p] - px[cur], py[p] - py[cur]) > Math.hypot(px[nxt] - px[cur], py[nxt] - py[cur]))) nxt = p; }
              cur = nxt;
            } while (cur !== start && hull.length <= pts.length);
            for (let k = 0; k < hull.length; k++) edges.push([hull[k], hull[(k + 1) % hull.length], layers]);
            hull.done = edges.length; done.push([layers, hull]);
            for (const p of hull) left.delete(p);
            layers++;
          }
          shown = 0; timer = 0; hold = 0; moving = 0;
        };
        peel();
        return (t, dt) => {
          const taps = g.input.taps();
          if (taps.length) { for (const tp of taps) { if (K >= cap) break; px.push(tp.x * n); py.push(tp.y * n); vx.push(g.alt.range(-1, 1)); vy.push(g.alt.range(-1, 1)); K++; } peel(); }
          if (moving > 0) { moving -= dt; for (let k = 0; k < K; k++) { px[k] += vx[k] * dt * 3; py[k] += vy[k] * dt * 3; if (Math.hypot(px[k] - n / 2, py[k] - n / 2) > n * 0.46) { vx[k] = -vx[k]; vy[k] = -vy[k]; } } if (moving <= 0) peel(); }
          else if (shown < edges.length) { if ((timer += dt) > 0.06) { timer = 0; shown++; } }
          else if ((hold += dt) > 3) moving = 2.5;
          d.fill(BLACK);
          const fade = moving > 0 ? Math.max(0, (moving - 1.5) / 1) : 1;
          // finished layers are filled, outermost first, so the onion reads as bands
          if (fade > 0) for (const [L, hull] of done) if (hull.done <= shown) X.poly(g, hull.flatMap(p => [px[p] + 0.5, py[p] + 0.5]), dimPk(lut[(L * 256 / Math.max(1, layers)) | 0], 0.45 * fade));
          if (fade > 0) for (let e = 0; e < shown; e++) { const [a, b, L] = edges[e]; X.line(g, px[a], py[a], px[b], py[b], dimPk(lut[(L * 256 / Math.max(1, layers)) | 0], (e === shown - 1 ? 1 : 0.85) * fade)); }
          for (let k = 0; k < K; k++) X.put(g, Math.round(px[k]), Math.round(py[k]), WHITE);
          if (shown > 0 && shown <= edges.length && moving <= 0) { const [, b] = edges[shown - 1]; X.rect(g, Math.round(px[b]) - 1, Math.round(py[b]) - 1, 3, 3, WHITE); }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, nl = neonN(R), lut = nl.lut, px = [], py = [], vx = [], vy = [];
      let K = R.int(Math.round(n * 0.5), Math.round(n * 1.3)); const cap = K + 40;
      for (let k = 0; k < K; k++) { const r = Math.sqrt(R()) * n * 0.44, a = R() * Math.PI * 2; px.push(n / 2 + Math.cos(a) * r * R.range(0.8, 1.1)); py.push(n / 2 + Math.sin(a) * r); vx.push(R.range(-1, 1)); vy.push(R.range(-1, 1)); }
      // the cloud's shape and how the layers are shown are this variation's own
      const A = g.alt, cloud = g.trait('Cloud', A() < 0.35 ? 'Disc' : A() < 0.35 ? 'Ring' : A() < 0.45 ? 'Clusters' : A() < 0.6 ? 'Square' : 'Spiral'), fill = g.trait('Layers', A() < 0.5 ? 'Bands' : A() < 0.5 ? 'Outlines' : 'Solid'), dots = A() < 0.75;
      g.trait('Points', K); g.trait('Palette', nl.name); g.trait('Pins', dots ? 'Shown' : 'Hidden');
      const cl = Array.from({ length: 3 + (A() * 3 | 0) }, () => [n * (0.28 + A() * 0.44), n * (0.28 + A() * 0.44)]), arms = 2 + (A() * 2 | 0);
      if (cloud !== 'Disc') for (let k = 0; k < K; k++) {
        const u = A(), a = A() * Math.PI * 2;
        if (cloud === 'Ring') { px[k] = n / 2 + Math.cos(a) * n * (0.26 + 0.18 * Math.sqrt(u)); py[k] = n / 2 + Math.sin(a) * n * (0.26 + 0.18 * Math.sqrt(u)); }
        else if (cloud === 'Square') { px[k] = n * (0.18 + 0.64 * u); py[k] = n * (0.18 + 0.64 * A()); }
        else if (cloud === 'Clusters') { const c = cl[(A() * cl.length) | 0], r = n * 0.12 * Math.sqrt(u); px[k] = c[0] + Math.cos(a) * r; py[k] = c[1] + Math.sin(a) * r; }
        else { const s = u, th = s * Math.PI * 3.2 + ((A() * arms) | 0) * Math.PI * 2 / arms, r = n * (0.05 + 0.38 * s) + (A() - 0.5) * n * 0.05; px[k] = n / 2 + Math.cos(th) * r; py[k] = n / 2 + Math.sin(th) * r; }
      }
      let edges, shown, timer, hold, moving, layers, done;
      const peel = () => {
        const left = new Set(Array.from({ length: K }, (_, k) => k)); edges = []; layers = 0; done = [];
        while (left.size > 2) {
          const pts = [...left]; let start = pts[0];
          for (const p of pts) if (px[p] < px[start] || (px[p] === px[start] && py[p] < py[start])) start = p;
          let cur = start; const hull = [];
          do {
            hull.push(cur); let nxt = pts[0] === cur ? pts[1] : pts[0];
            for (const p of pts) { if (p === cur) continue; const cr = (px[nxt] - px[cur]) * (py[p] - py[cur]) - (py[nxt] - py[cur]) * (px[p] - px[cur]); if (cr < 0 || (cr === 0 && Math.hypot(px[p] - px[cur], py[p] - py[cur]) > Math.hypot(px[nxt] - px[cur], py[nxt] - py[cur]))) nxt = p; }
            cur = nxt;
          } while (cur !== start && hull.length <= pts.length);
          for (let k = 0; k < hull.length; k++) edges.push([hull[k], hull[(k + 1) % hull.length], layers]);
          hull.done = edges.length; done.push([layers, hull]);
          for (const p of hull) left.delete(p);
          layers++;
        }
        shown = 0; timer = 0; hold = 0; moving = 0;
      };
      peel();
      return (t, dt) => {
        const taps = g.input.taps();
        if (taps.length) { for (const tp of taps) { if (K >= cap) break; px.push(tp.x * n); py.push(tp.y * n); vx.push(R.range(-1, 1)); vy.push(R.range(-1, 1)); K++; } peel(); }
        if (moving > 0) { moving -= dt; for (let k = 0; k < K; k++) { px[k] += vx[k] * dt * 3; py[k] += vy[k] * dt * 3; if (Math.hypot(px[k] - n / 2, py[k] - n / 2) > n * 0.46) { vx[k] = -vx[k]; vy[k] = -vy[k]; } } if (moving <= 0) peel(); }
        else if (shown < edges.length) { if ((timer += dt) > 0.06) { timer = 0; shown++; } }
        else if ((hold += dt) > 3) moving = 2.5;
        d.fill(BLACK);
        const fade = moving > 0 ? Math.max(0, (moving - 1.5) / 1) : 1;
        // finished layers are filled, outermost first, so the onion reads as bands
        if (fade > 0 && fill !== 'Outlines') for (const [L, hull] of done) if (hull.done <= shown) X.poly(g, hull.flatMap(p => [px[p] + 0.5, py[p] + 0.5]), dimPk(lut[(L * 256 / Math.max(1, layers)) | 0], (fill === 'Solid' ? 0.85 : 0.45) * fade));
        if (fade > 0) for (let e = 0; e < shown; e++) { const [a, b, L] = edges[e]; X.line(g, px[a], py[a], px[b], py[b], fill === 'Solid' ? dimPk(lut[(L * 256 / Math.max(1, layers)) | 0], 0.35 * fade) : dimPk(lut[(L * 256 / Math.max(1, layers)) | 0], (e === shown - 1 ? 1 : 0.85) * fade)); }
        if (dots || moving > 0) for (let k = 0; k < K; k++) X.put(g, Math.round(px[k]), Math.round(py[k]), WHITE);
        if (shown > 0 && shown <= edges.length && moving <= 0) { const [, b] = edges[shown - 1]; X.rect(g, Math.round(px[b]) - 1, Math.round(py[b]) - 1, 3, 3, WHITE); }
      };
    },
  });

  add({
    name: 'Sudoku', seed: 5, sizes: [100], fps: 12,
    interactive: 'Point at a square to see its row, column and box; click a blank one to make the solver try it next, or click a filled one for a new puzzle.',
    recipe: 'A sudoku solves itself by backtracking: it fills the most constrained square first, guesses when it must, and when a guess runs into a dead end the wrong digits flash red and come off again. Solved, the grid glows; then a new puzzle is set.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, s = 11, nl = neonN(R), lut = nl.lut, grid = new Int8Array(81), given = new Uint8Array(81), flash = new Float32Array(81);
        g.trait('Digits', 'Coloured'); g.trait('Grid', 'Lines'); g.trait('Puzzle', 'Medium'); g.trait('Givens', 'White'); g.trait('Palette', nl.name);
        let stack, hold, timer, solvedGlow, focus = -1;
        const inp = g.input;
        const ok = (gr, i, v) => { const r = i / 9 | 0, c = i % 9, br = r - r % 3, bc = c - c % 3; for (let k = 0; k < 9; k++) { if (gr[r * 9 + k] === v || gr[k * 9 + c] === v || gr[(br + (k / 3 | 0)) * 9 + bc + k % 3] === v) return false; } return true; };
        const fill = (gr, i, Q = R) => { if (i === 81) return true; for (const v of Q.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) if (ok(gr, i, v)) { gr[i] = v; if (fill(gr, i + 1, Q)) return true; gr[i] = 0; } return false; };
        const reset = (Q = R) => {
          const full = new Int8Array(81); fill(full, 0, Q);
          grid.set(full); given.fill(1);
          for (const i of Q.shuffle(Array.from({ length: 81 }, (_, k) => k)).slice(0, Q.int(50, 56))) { grid[i] = 0; given[i] = 0; }
          stack = []; hold = 0; timer = 0; solvedGlow = 0; flash.fill(0);
        };
        reset();
        // one step of a depth-first search: place the next digit, or take one back
        const step = () => {
          let best = -1, bestCands = null;
          for (let i = 0; i < 81; i++) if (!grid[i]) { const cands = []; for (let v = 1; v <= 9; v++) if (ok(grid, i, v)) cands.push(v); if (!bestCands || cands.length < bestCands.length) { best = i; bestCands = cands; if (!cands.length) break; } }
          if (best < 0) return true;
          let byHand = false;
          if (focus >= 0 && !grid[focus] && bestCands.length) { const cands = []; for (let v = 1; v <= 9; v++) if (ok(grid, focus, v)) cands.push(v); if (cands.length) { best = focus; bestCands = cands; byHand = true; } }
          focus = -1;
          if (bestCands.length) { const order = (byHand ? g.alt : R).shuffle(bestCands); stack.push({ i: best, order, k: 0 }); grid[best] = order[0]; flash[best] = 1; return false; }
          // dead end: take the last guess off and try its next digit, unwinding further if it has none
          while (stack.length) {
            const top = stack[stack.length - 1];
            grid[top.i] = 0; flash[top.i] = -1;
            top.k++;
            while (top.k < top.order.length && !ok(grid, top.i, top.order[top.k])) top.k++;
            if (top.k < top.order.length) { grid[top.i] = top.order[top.k]; flash[top.i] = 1; return false; }
            stack.pop();
          }
          reset(); return false;
        };
        return (t, dt) => {
          for (const tp of inp.taps()) { const i = Math.min(8, tp.y * n / s | 0) * 9 + Math.min(8, tp.x * n / s | 0); if (grid[i] && given[i]) reset(g.alt); else if (!grid[i]) { focus = i; timer = 0.13; } }
          if (hold > 0) { hold -= dt; solvedGlow = Math.min(1, solvedGlow + dt); if (hold <= 0) reset(); }
          else if ((timer += dt) > 0.13) { timer = 0; if (step()) hold = 3.5; }
          d.fill(BLACK);
          if (inp.inside) { const hx = Math.min(8, inp.x * n / s | 0), hy = Math.min(8, inp.y * n / s | 0), tint = 0xff222222; X.rect(g, hx * s, 0, s, 9 * s, tint); X.rect(g, 0, hy * s, 9 * s, s, tint); X.rect(g, (hx - hx % 3) * s, (hy - hy % 3) * s, 3 * s, 3 * s, tint); X.rect(g, hx * s, hy * s, s, s, 0xff3a3a3a); }
          for (let k = 0; k <= 9; k++) { const c = k % 3 ? 0xff303030 : 0xff6a6a6a; X.rect(g, k * s, 0, 1, 9 * s + 1, c); X.rect(g, 0, k * s, 9 * s + 1, 1, c); }
          for (let i = 0; i < 81; i++) {
            const x = (i % 9) * s, y = (i / 9 | 0) * s;
            flash[i] *= 0.88;
            if (flash[i] < -0.05) X.rect(g, x + 1, y + 1, s - 1, s - 1, dimPk(0xff2a2aff, -flash[i]));
            if (!grid[i]) continue;
            let c = given[i] ? 0xffe8e8e8 : lut[(grid[i] * 28) & 255];
            if (flash[i] > 0.05) c = glowPk(c, flash[i] * 0.7);
            if (solvedGlow > 0 && !given[i]) c = glowPk(c, solvedGlow * 0.35);
            X.text(g, String(grid[i]), x + 3, y + 2, c);
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, s = 11, nl = neonN(R), lut = nl.lut, grid = new Int8Array(81), given = new Uint8Array(81), flash = new Float32Array(81);
      let stack, hold, timer, solvedGlow, focus = -1;
      const inp = g.input, given0 = R.pick([[50, 56], [44, 50], [56, 60]]), pace = R.pick([0.09, 0.13, 0.18]), givenCol = R.pick([0xffe8e8e8, 0xffb0d8ff, 0xffffe0a0]);
      const A = g.alt, digits = g.trait('Digits', A() < 0.45 ? 'Coloured' : A() < 0.45 ? 'Tiles' : A() < 0.6 ? 'One ink' : 'Pips'), boxes = g.trait('Grid', A() < 0.55 ? 'Lines' : A() < 0.6 ? 'Shaded boxes' : 'Dots') ;
      g.trait('Puzzle', given0[0] === 44 ? 'Hard' : given0[0] === 50 ? 'Medium' : 'Easy'); g.trait('Givens', givenCol === 0xffe8e8e8 ? 'White' : givenCol === 0xffb0d8ff ? 'Gold' : 'Ice'); g.trait('Palette', digits === 'One ink' ? 'One ink' : nl.name);
      const ink1 = lut[(A() * 255) | 0];
      const ok = (gr, i, v) => { const r = i / 9 | 0, c = i % 9, br = r - r % 3, bc = c - c % 3; for (let k = 0; k < 9; k++) { if (gr[r * 9 + k] === v || gr[k * 9 + c] === v || gr[(br + (k / 3 | 0)) * 9 + bc + k % 3] === v) return false; } return true; };
      const fill = (gr, i) => { if (i === 81) return true; for (const v of R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) if (ok(gr, i, v)) { gr[i] = v; if (fill(gr, i + 1)) return true; gr[i] = 0; } return false; };
      const reset = () => {
        const full = new Int8Array(81); fill(full, 0);
        grid.set(full); given.fill(1);
        for (const i of R.shuffle(Array.from({ length: 81 }, (_, k) => k)).slice(0, R.int(given0[0], given0[1]))) { grid[i] = 0; given[i] = 0; }
        stack = []; hold = 0; timer = 0; solvedGlow = 0; flash.fill(0);
      };
      reset();
      // one step of a depth-first search: place the next digit, or take one back
      const step = () => {
        let best = -1, bestCands = null;
        for (let i = 0; i < 81; i++) if (!grid[i]) { const cands = []; for (let v = 1; v <= 9; v++) if (ok(grid, i, v)) cands.push(v); if (!bestCands || cands.length < bestCands.length) { best = i; bestCands = cands; if (!cands.length) break; } }
        if (focus >= 0 && !grid[focus] && best >= 0 && bestCands.length) { const cands = []; for (let v = 1; v <= 9; v++) if (ok(grid, focus, v)) cands.push(v); if (cands.length) { best = focus; bestCands = cands; } }
        focus = -1;
        if (best < 0) return true;
        if (bestCands.length) { const order = R.shuffle(bestCands); stack.push({ i: best, order, k: 0 }); grid[best] = order[0]; flash[best] = 1; return false; }
        // dead end: take the last guess off and try its next digit, unwinding further if it has none
        while (stack.length) {
          const top = stack[stack.length - 1];
          grid[top.i] = 0; flash[top.i] = -1;
          top.k++;
          while (top.k < top.order.length && !ok(grid, top.i, top.order[top.k])) top.k++;
          if (top.k < top.order.length) { grid[top.i] = top.order[top.k]; flash[top.i] = 1; return false; }
          stack.pop();
        }
        reset(); return false;
      };
      return (t, dt) => {
        for (const tp of inp.taps()) { const i = Math.min(8, tp.y * n / s | 0) * 9 + Math.min(8, tp.x * n / s | 0); if (grid[i] && given[i]) reset(); else if (!grid[i]) { focus = i; timer = pace; } }
        if (hold > 0) { hold -= dt; solvedGlow = Math.min(1, solvedGlow + dt); if (hold <= 0) reset(); }
        else if ((timer += dt) > pace) { timer = 0; if (step()) hold = 3.5; }
        d.fill(BLACK);
        if (boxes === 'Shaded boxes') for (let b = 0; b < 9; b++) if (b & 1) X.rect(g, (b % 3) * 3 * s, (b / 3 | 0) * 3 * s, 3 * s, 3 * s, 0xff161616);
        if (inp.inside) { const hx = Math.min(8, inp.x * n / s | 0), hy = Math.min(8, inp.y * n / s | 0), tint = 0xff222222; X.rect(g, hx * s, 0, s, 9 * s, tint); X.rect(g, 0, hy * s, 9 * s, s, tint); X.rect(g, (hx - hx % 3) * s, (hy - hy % 3) * s, 3 * s, 3 * s, tint); X.rect(g, hx * s, hy * s, s, s, 0xff3a3a3a); }
        if (boxes === 'Dots') { for (let y = 0; y <= 9; y++) for (let x = 0; x <= 9; x++) X.put(g, x * s, y * s, x % 3 || y % 3 ? 0xff484848 : 0xff9a9a9a); }
        else for (let k = 0; k <= 9; k++) { const c = k % 3 ? 0xff303030 : 0xff6a6a6a; X.rect(g, k * s, 0, 1, 9 * s + 1, c); X.rect(g, 0, k * s, 9 * s + 1, 1, c); }
        for (let i = 0; i < 81; i++) {
          const x = (i % 9) * s, y = (i / 9 | 0) * s;
          flash[i] *= 0.88;
          if (flash[i] < -0.05) X.rect(g, x + 1, y + 1, s - 1, s - 1, dimPk(0xff2a2aff, -flash[i]));
          if (!grid[i]) continue;
          let c = given[i] ? givenCol : digits === 'One ink' ? ink1 : lut[(grid[i] * 28) & 255];
          if (flash[i] > 0.05) c = glowPk(c, flash[i] * 0.7);
          if (solvedGlow > 0 && !given[i]) c = glowPk(c, solvedGlow * 0.35);
          if (digits === 'Tiles' && !given[i]) { X.rect(g, x + 2, y + 2, s - 3, s - 3, dimPk(c, 0.55)); X.text(g, String(grid[i]), x + 3, y + 2, glowPk(c, 0.6)); }
          else if (digits === 'Pips' && !given[i]) { const v = grid[i]; for (let q = 0; q < v; q++) X.rect(g, x + 2 + (q % 3) * 3, y + 2 + ((q / 3) | 0) * 3, 2, 2, c); }
          else X.text(g, String(grid[i]), x + 3, y + 2, c);
        }
      };
    },
  });
})();
