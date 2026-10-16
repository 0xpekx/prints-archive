// Set 5 · Board Games: games playing themselves by their real rules, on bold
// pixel boards in neon on black. Every move is legal; the players are simple
// rule-of-thumb machines, so each game plays out differently.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Board Games' }, def));
  const dimPk = (v, k) => (0xff000000 | (((v >>> 16 & 255) * k) | 0) << 16 | (((v >>> 8 & 255) * k) | 0) << 8 | ((v & 255) * k) | 0) >>> 0;
  const glowPk = (v, k) => { const f = c => (c + (255 - c) * k) | 0; return (0xff000000 | f(v >>> 16 & 255) << 16 | f(v >>> 8 & 255) << 8 | f(v & 255)) >>> 0; };
  // two players in strong, clearly different colours, and a dim board ink
  function players(R) {
    const h = R.range(0, 100), gap = R.range(35, 60), s = R.bool(0.5) ? 100 : 85;
    return { a: X.hsbPk(h, s, 100), b: X.hsbPk(h + gap, s, 100), ink: X.hsbPk(h + gap * 2.2, R.range(40, 80), R.range(28, 40)) };
  }
  const best = (R, list, score) => { let top = -Infinity, out = []; for (const m of list) { const v = score(m) + R() * 0.01; if (v > top) { top = v; out = [m]; } } return out[0]; };

  // The viewer joins a game by clicking on it: from then on they play the first
  // side (or the puzzle) and the machine answers. After a while without a click
  // the machine takes over both sides again, so the tile always plays itself.
  // Every tap also leaves a quick square ripple where it landed (instant feedback,
  // even when the tap is not a legal move); at most a few at once, so a burst of
  // remembered taps replayed at speed stays cheap.
  const seat = () => ({
    on: false, idle: 0, pings: [],
    tick(dt, taps) {
      this.idle += dt; if (taps.length) { this.on = true; this.idle = 0; } if (this.idle > 8) this.on = false;
      for (const tp of taps) { if (this.pings.length >= 6) this.pings.shift(); this.pings.push({ x: tp.x, y: tp.y, a: 1 }); }
      for (let k = this.pings.length - 1; k >= 0; k--) if ((this.pings[k].a -= dt * 3) <= 0) this.pings.splice(k, 1);
    },
    ping(g) { for (const p of this.pings) { const r = Math.round((1 - p.a) * g.n * 0.05) + 1, x = Math.round(p.x * g.n), y = Math.round(p.y * g.n); box(g, x - r, y - r, 2 * r + 1, 2 * r + 1, dimPk(WHITE, 0.25 + 0.6 * p.a)); } },
  });
  const box = (g, x, y, w, h, c) => { X.rect(g, x, y, w, 1, c); X.rect(g, x, y + h - 1, w, 1, c); X.rect(g, x, y, 1, h, c); X.rect(g, x + w - 1, y, 1, h, c); };
  const HOVER = dimPk(WHITE, 0.28);
  // A playing piece with a little form: lit from the top left, a darker rim to the
  // bottom right and a glint. rx < ry squeezes it, as a disc seen turning over.
  function ball(g, cx, cy, rx, ry, col) {
    const { n, d } = g;
    if (rx < 0.6) rx = 0.6;
    const flat = ry < 1.9, lo = dimPk(col, 0.62), hi = glowPk(col, 0.55);
    const y0 = Math.max(0, Math.floor(cy - ry)), y1 = Math.min(n - 1, Math.ceil(cy + ry));
    for (let y = y0; y <= y1; y++) {
      const v = (y + 0.5 - cy) / ry, w = 1 - v * v;
      if (w < 0) continue;
      const s = rx * Math.sqrt(w), xa = Math.max(0, Math.round(cx - s)), xb = Math.min(n, Math.round(cx + s));
      for (let x = xa; x < xb; x++) {
        let c = col;
        if (!flat) {
          const u = (x + 0.5 - cx) / Math.max(rx, 0.8), e = u + v;
          if (e > 0.62 && u * u + v * v > 0.42) c = lo;
          else if ((u + 0.42) * (u + 0.42) + (v + 0.42) * (v + 0.42) < 0.07) c = hi;
        }
        d[y * n + x] = c;
      }
    }
    if (!flat && rx > 1.2) {   // make sure the glint shows even on small pieces
      const gx = Math.round(cx - rx * 0.42 - 0.5), gy = Math.round(cy - ry * 0.42 - 0.5);
      if (gx >= 0 && gy >= 0 && gx < n && gy < n && X.get(g, gx, gy) === col) d[gy * n + gx] = hi;
    }
  }
  // a square block with a lit top edge and a shaded bottom edge
  function slab(g, x, y, s, col) {
    X.rect(g, x, y, s, s, col);
    if (s < 4) return;
    X.rect(g, x, y, s, 1, glowPk(col, 0.35)); X.rect(g, x, y, 1, s, glowPk(col, 0.2));
    X.rect(g, x, y + s - 1, s, 1, dimPk(col, 0.6)); X.rect(g, x + s - 1, y + 1, 1, s - 1, dimPk(col, 0.72));
  }
  // ---------- variation traits ----------
  const HUES = [[0, 'Red'], [7, 'Orange'], [13, 'Amber'], [17, 'Yellow'], [24, 'Lime'], [32, 'Green'], [44, 'Teal'], [51, 'Cyan'], [59, 'Azure'], [66, 'Blue'], [74, 'Violet'], [83, 'Magenta'], [92, 'Rose'], [100, 'Red']];
  const hueName = h => { h = ((h % 100) + 100) % 100; let b = HUES[0]; for (const e of HUES) if (Math.abs(e[0] - h) < Math.abs(b[0] - h)) b = e; return b[1]; };
  // Colour sets a variation keeps for every game (Neon is the original: a new pair each game).
  const SKINS = [
    ['Neon', 0.42, null],
    ['Complements', 0.14, h => [X.hsbPk(h, 92, 100), X.hsbPk(h + 50, 92, 100), X.hsbPk(h + 25, 45, 32)]],
    ['Pastel', 0.12, h => [X.hsbPk(h, 38, 100), X.hsbPk(h + 40, 40, 100), X.hsbPk(h + 20, 22, 36)]],
    ['Ivory and Slate', 0.1, () => [X.rgb(236, 230, 214), X.rgb(118, 140, 176), X.rgb(78, 62, 50)]],
    ['Fire and Ice', 0.1, () => [X.rgb(255, 92, 40), X.rgb(70, 200, 255), X.rgb(64, 40, 74)]],
    ['Gold and Silver', 0.06, () => [X.rgb(255, 194, 60), X.rgb(206, 216, 232), X.rgb(70, 56, 40)]],
    ['Mono', 0.06, h => [X.hsbPk(h, 22, 100), X.hsbPk(h, 100, 82), X.hsbPk(h, 55, 30)]],
  ];
  function skin(A, g) {
    let u = A(), k = 0; while (k < SKINS.length - 1 && u > SKINS[k][1]) { u -= SKINS[k][1]; k++; }
    const [name, , f] = SKINS[k], h = A() * 100, cols = f && f(h);
    g.trait('Colours', name === 'Complements' || name === 'Pastel' || name === 'Mono' ? name + ' ' + hueName(h) : name === 'Neon' ? 'Neon, new each game' : name);
    return pl => { if (cols) { pl.a = cols[0]; pl.b = cols[1]; pl.ink = cols[2]; } return pl; };
  }
  const SHAPES = ['Round', 'Round', 'Round', 'Square', 'Gem', 'Ring'];
  // a playing piece in one of the shapes (rx < ry squeezes it, as when a disc turns over)
  function piece(g, shape, cx, cy, rx, ry, col) {
    if (shape === 'Round') return ball(g, cx, cy, rx, ry, col);
    if (shape === 'Ring') { ball(g, cx, cy, rx, ry, col); if (ry >= 2) X.disc(g, cx, cy, Math.max(0.6, Math.min(rx, ry) * 0.42), BLACK); return; }
    const { n, d } = g, lo = dimPk(col, 0.6), hi = glowPk(col, 0.4);
    if (shape === 'Square') {
      const x0 = Math.round(cx - rx), x1 = Math.round(cx + rx), y0 = Math.round(cy - ry), y1 = Math.round(cy + ry);
      X.rect(g, x0, y0, x1 - x0, y1 - y0, col);
      if (y1 - y0 >= 4 && x1 - x0 >= 2) { X.rect(g, x0, y0, x1 - x0, 1, hi); X.rect(g, x0, y1 - 1, x1 - x0, 1, lo); if (x1 - x0 >= 4) X.rect(g, x1 - 1, y0 + 1, 1, y1 - y0 - 1, lo); }
      return;
    }
    // Gem: a diamond with a lit upper-left facet and a shaded lower-right one
    const r2 = ry * 1.15, w2 = rx * 1.15;
    for (let y = Math.max(0, Math.floor(cy - r2)); y <= Math.min(n - 1, Math.ceil(cy + r2)); y++) {
      const v = (y + 0.5 - cy) / r2, half = w2 * (1 - Math.abs(v)); if (half <= 0) continue;
      for (let x = Math.max(0, Math.round(cx - half)); x < Math.min(n, Math.round(cx + half)); x++) { const u = (x + 0.5 - cx) / Math.max(w2, 0.8); d[y * n + x] = u + v < -0.15 ? hi : u + v > 0.25 ? lo : col; }
    }
  }
  // a closed one-cell ring (for noughts)
  function ring(g, cx, cy, r, col) {
    for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y++) for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) {
      const e = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) - r;
      if (e > -0.5 && e < 0.5) X.put(g, x, y, col);
    }
  }
  // the cell of a c-sized grid with origin o under a tap or the pointer
  const cellAt = (p, n, o, c, m) => { const x = Math.floor((p.x * n - o) / c), y = Math.floor((p.y * n - o) / c); return x >= 0 && y >= 0 && x < m && y < m ? y * m + x : -1; };
  // board looks: plain lines, a tinted board, or a checker of two inks
  const looks = R => R.pick(['lines', 'lines', 'felt', 'checker']);

  add({
    name: 'Othello', seed: 2, sizes: [50, 80, 100], fps: 12,
    interactive: 'Click a dotted square to play; you are the first colour, the machine answers.',
    recipe: 'Othello played to the end by two greedy players who love corners, or by you against one of them: every disc placed flips the lines it closes, and the flips ripple across the board as the colour of whole regions changes hands.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Board', 8); g.trait('Colours', 'Neon, new each game'); g.trait('Pieces', 'Round'); g.trait('Opening', 'Cross'); g.trait('Players', 'Corner lovers'); g.trait('Board look', 'Lines');
        const { n, d } = g, c = Math.floor(n / 8), o = (n - c * 8) >> 1;
        let pl, b, mix, turn, timer, hold, passes;
        const reset = () => { pl = players(R); b = new Int8Array(64); mix = new Float32Array(64); b[27] = b[36] = 1; b[28] = b[35] = -1; turn = 1; timer = 0; hold = 0; passes = 0; for (let i = 0; i < 64; i++) mix[i] = b[i]; };
        reset();
        const flipsOf = (i, who) => {
          if (b[i]) return [];
          const out = [], x0 = i % 8, y0 = i >> 3;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const run = []; let x = x0 + dx, y = y0 + dy;
            while (x >= 0 && y >= 0 && x < 8 && y < 8 && b[y * 8 + x] === -who) { run.push(y * 8 + x); x += dx; y += dy; }
            if (run.length && x >= 0 && y >= 0 && x < 8 && y < 8 && b[y * 8 + x] === who) out.push(...run);
          }
          return out;
        };
        const worth = i => { const x = i % 8, y = i >> 3, edge = x === 0 || y === 0 || x === 7 || y === 7, corner = (x === 0 || x === 7) && (y === 0 || y === 7), xsq = (x === 1 || x === 6) && (y === 1 || y === 6); return corner ? 12 : xsq ? -6 : edge ? 2 : 0; };
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 1 && hold <= 0, hm = [];
          if (mine) for (let i = 0; i < 64; i++) { const f = flipsOf(i, turn); if (f.length) hm.push([i, f]); }
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (mine && hm.length) { for (const tp of taps) { const i = cellAt(tp, n, o, c, 8), m = hm.find(mv => mv[0] === i); if (m) { passes = 0; b[m[0]] = turn; mix[m[0]] = turn; for (const k of m[1]) b[k] = turn; turn = -turn; timer = 0; break; } } }
          else if ((timer += dt) > 0.55) {
            timer = 0;
            const moves = []; for (let i = 0; i < 64; i++) { const f = flipsOf(i, turn); if (f.length) moves.push([i, f]); }
            if (!moves.length) { if (++passes >= 2) hold = 3.5; turn = -turn; }
            else { passes = 0; const [i, f] = best(R, moves, ([i, f]) => f.length + worth(i)); b[i] = turn; mix[i] = turn; for (const k of f) b[k] = turn; turn = -turn; }
          }
          d.fill(BLACK);
          for (let k = 0; k <= 8; k++) { X.rect(g, o + k * c, o, 1, c * 8 + 1, pl.ink); X.rect(g, o, o + k * c, c * 8 + 1, 1, pl.ink); }
          for (let i = 0; i < 64; i++) {
            if (!b[i]) continue;
            { const dm = b[i] - mix[i], st = dt * 4.5; mix[i] = Math.abs(dm) <= st ? b[i] : mix[i] + Math.sign(dm) * st; }
            // a flip turns the disc over: it narrows to its edge and opens in the other colour
            const m = mix[i], col = Math.abs(m) < 0.9 ? glowPk(m >= 0 ? pl.a : pl.b, 0.4) : m >= 0 ? pl.a : pl.b;
            ball(g, o + (i % 8) * c + c / 2 + 0.5, o + (i >> 3) * c + c / 2 + 0.5, c * 0.4 * Math.max(0.15, Math.abs(m)), c * 0.4, col);
          }
          if (me.on && turn === 1 && hold <= 0) {
            const q = Math.max(1, Math.round(c * 0.2));
            for (let i = 0; i < 64; i++) if (flipsOf(i, 1).length) X.rect(g, o + (i % 8) * c + ((c - q) >> 1) + 1, o + (i >> 3) * c + ((c - q) >> 1) + 1, q, q, dimPk(pl.a, 0.75));
            const h = inp.inside ? cellAt(inp, n, o, c, 8) : -1;
            if (h >= 0) box(g, o + (h % 8) * c, o + (h >> 3) * c, c + 1, c + 1, flipsOf(h, 1).length ? pl.a : dimPk(WHITE, 0.4));
          } else if (inp.inside) { const h = cellAt(inp, n, o, c, 8); if (h >= 0) box(g, o + (h % 8) * c, o + (h >> 3) * c, c + 1, c + 1, HOVER); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // a variation's own board size, opening, colours, piece shape and playing style
      const A = g.alt, S = +g.trait('Board', A() < 0.7 ? 8 : A() < 0.5 ? 6 : 10), SS = S * S, h = S >> 1;
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor(n / S), o = (n - c * S) >> 1, look = looks(R), pace = R.range(0.4, 0.7), rad = R.pick([0.36, 0.4, 0.44]);
      const fix = skin(A, g), shape = g.trait('Pieces', A() < 0.5 ? 'Round' : SHAPES[(A() * SHAPES.length) | 0]), parallel = g.trait('Opening', A() < 0.7 ? 'Cross' : 'Parallel') === 'Parallel', style = g.trait('Players', A() < 0.5 ? 'Corner lovers' : A() < 0.5 ? 'Greedy' : 'Quiet');
      g.trait('Board look', look === 'lines' ? 'Lines' : look === 'felt' ? 'Felt' : 'Checker');
      let pl, b, mix, turn, timer, hold, passes;
      const reset = () => {
        pl = fix(players(R)); b = new Int8Array(SS); mix = new Float32Array(SS);
        const a0 = (h - 1) * S + h - 1, a1 = a0 + 1, b0 = a0 + S, b1 = b0 + 1;
        if (parallel) { b[a0] = b[a1] = 1; b[b0] = b[b1] = -1; } else { b[a0] = b[b1] = 1; b[a1] = b[b0] = -1; }
        turn = 1; timer = 0; hold = 0; passes = 0; for (let i = 0; i < SS; i++) mix[i] = b[i];
      };
      reset();
      const flipsOf = (i, who) => {
        if (b[i]) return [];
        const out = [], x0 = i % S, y0 = (i / S) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const run = []; let x = x0 + dx, y = y0 + dy;
          while (x >= 0 && y >= 0 && x < S && y < S && b[y * S + x] === -who) { run.push(y * S + x); x += dx; y += dy; }
          if (run.length && x >= 0 && y >= 0 && x < S && y < S && b[y * S + x] === who) out.push(...run);
        }
        return out;
      };
      const E = S - 1, worth = i => { const x = i % S, y = (i / S) | 0, edge = x === 0 || y === 0 || x === E || y === E, corner = (x === 0 || x === E) && (y === 0 || y === E), xsq = (x === 1 || x === E - 1) && (y === 1 || y === E - 1); return corner ? 12 : xsq ? -6 : edge ? 2 : 0; };
      const value = ([i, f]) => style === 'Greedy' ? f.length * 2 + (worth(i) > 10 ? 4 : 0) : style === 'Quiet' ? -f.length + worth(i) : f.length + worth(i);
      const play = (i, f) => { b[i] = turn; mix[i] = turn; for (const k of f) b[k] = turn; turn = -turn; passes = 0; };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const mine = me.on && turn === 1 && hold <= 0;
        const moves = []; if (hold <= 0) for (let i = 0; i < SS; i++) { const f = flipsOf(i, turn); if (f.length) moves.push([i, f]); }
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (mine && moves.length) { for (const tp of taps) { const i = cellAt(tp, n, o, c, S), m = moves.find(mv => mv[0] === i); if (m) { play(m[0], m[1]); timer = 0; break; } } }
        else if ((timer += dt) > pace) {
          timer = 0;
          if (!moves.length) { if (++passes >= 2) hold = 3.5; turn = -turn; }
          else { const [i, f] = best(R, moves, value); play(i, f); }
        }
        d.fill(BLACK);
        if (look === 'felt') X.rect(g, o, o, c * S + 1, c * S + 1, dimPk(pl.ink, 0.6));
        if (look === 'checker') for (let i = 0; i < SS; i++) if (((i % S) + ((i / S) | 0)) & 1) X.rect(g, o + (i % S) * c, o + ((i / S) | 0) * c, c, c, dimPk(pl.ink, 0.7));
        if (look !== 'checker') for (let k = 0; k <= S; k++) { X.rect(g, o + k * c, o, 1, c * S + 1, pl.ink); X.rect(g, o, o + k * c, c * S + 1, 1, pl.ink); }
        for (let i = 0; i < SS; i++) {
          if (!b[i]) continue;
          { const dm = b[i] - mix[i], st = dt * 4.5; mix[i] = Math.abs(dm) <= st ? b[i] : mix[i] + Math.sign(dm) * st; }
          const m = mix[i], col = Math.abs(m) < 0.9 ? glowPk(m >= 0 ? pl.a : pl.b, 0.4) : m >= 0 ? pl.a : pl.b;
          piece(g, shape, o + (i % S) * c + c / 2 + 0.5, o + ((i / S) | 0) * c + c / 2 + 0.5, c * rad * Math.max(0.15, Math.abs(m)), c * rad, col);
        }
        if (mine) {
          for (const [i] of moves) { const q = Math.max(1, Math.round(c * 0.2)); X.rect(g, o + (i % S) * c + ((c - q) >> 1) + 1, o + ((i / S) | 0) * c + ((c - q) >> 1) + 1, q, q, dimPk(pl.a, 0.75)); }
          const hc = inp.inside ? cellAt(inp, n, o, c, S) : -1;
          if (hc >= 0) box(g, o + (hc % S) * c, o + ((hc / S) | 0) * c, c + 1, c + 1, moves.some(m => m[0] === hc) ? pl.a : dimPk(WHITE, 0.4));
        } else if (inp.inside) { const hc = cellAt(inp, n, o, c, S); if (hc >= 0) box(g, o + (hc % S) * c, o + ((hc / S) | 0) * c, c + 1, c + 1, HOVER); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Connect Four', seed: 5, sizes: [50, 80, 100], fps: 12,
    interactive: 'Click a column to drop your disc; the machine answers.',
    recipe: 'Two players drop discs into a seven-column rack, or you against the machine: each takes a win when it sees one and blocks the other’s, otherwise it plays toward the middle. Discs fall with gravity, the winning four flash, and then the rack empties out of the bottom.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Rack', '7 x 6'); g.trait('Colours', 'Neon, new each game'); g.trait('Pieces', 'Round'); g.trait('Frame', 'Ink');
        const { n, d } = g, c = Math.floor(n / 7.4), ox = (n - c * 7) >> 1, oy = n - c * 6 - Math.max(1, (n - c * 6) >> 2);
        let pl, b, fall, turn, timer, hold, win, empty;
        const reset = () => { pl = players(R); b = new Int8Array(42); fall = new Float32Array(42); turn = 1; timer = 0; hold = 0; win = null; empty = 0; };
        reset();
        const top = col => { for (let r = 5; r >= 0; r--) if (!b[r * 7 + col]) return r; return -1; };
        const fours = (who) => {
          for (let r = 0; r < 6; r++) for (let q = 0; q < 7; q++) for (const [dr, dq] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
            const cells = []; for (let k = 0; k < 4; k++) { const rr = r + dr * k, qq = q + dq * k; if (rr < 0 || rr > 5 || qq < 0 || qq > 6 || b[rr * 7 + qq] !== who) break; cells.push(rr * 7 + qq); }
            if (cells.length === 4) return cells;
          }
          return null;
        };
        const wins = (col, who) => { const r = top(col); if (r < 0) return false; b[r * 7 + col] = who; const w = !!fours(who); b[r * 7 + col] = 0; return w; };
        const colAt = p => { const q = Math.floor((p.x * n - ox) / c); return q >= 0 && q < 7 ? q : -1; };
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 1 && !hold && !empty;
          if (empty > 0) { empty += dt; if (empty > 1.6) reset(); }
          else if (hold > 0) { if ((hold -= dt) <= 0) empty = 0.001; }
          else if (mine) { for (const tp of taps) { const q = colAt(tp); if (q >= 0 && top(q) >= 0) { const r = top(q); b[r * 7 + q] = turn; fall[r * 7 + q] = -1 - r; win = fours(turn); if (win) hold = 3; turn = -turn; timer = 0; break; } } }
          else if ((timer += dt) > 0.7) {
            timer = 0;
            const cols = [0, 1, 2, 3, 4, 5, 6].filter(q => top(q) >= 0);
            if (!cols.length) hold = 2.5;
            else {
              const pick = cols.find(q => wins(q, turn)) ?? cols.find(q => wins(q, -turn)) ?? best(R, cols, q => -Math.abs(q - 3) * 0.6 + R() * 2 - (top(q) > 0 && (() => { const r = top(q); b[r * 7 + q] = turn; const bad = wins(q, -turn); b[r * 7 + q] = 0; return bad; })() ? 5 : 0));
              const r = top(pick); b[r * 7 + pick] = turn; fall[r * 7 + pick] = -1 - r;
              win = fours(turn); if (win) hold = 3;
              turn = -turn;
            }
          }
          d.fill(BLACK);
          const blink = win ? 0.5 + 0.5 * Math.sin(t * 6) : 0;
          X.rect(g, ox - 1, oy - 1, c * 7 + 2, c * 6 + 2, pl.ink); X.rect(g, ox - 1, oy - 1, c * 7 + 2, 1, glowPk(pl.ink, 0.3)); X.rect(g, ox - 1, oy + c * 6, c * 7 + 2, 1, dimPk(pl.ink, 0.6));
          for (let i = 0; i < 42; i++) {
            const q = i % 7, r = (i / 7) | 0, cx = ox + q * c + c / 2 + 0.5;
            X.disc(g, cx, oy + r * c + c / 2 + 0.5, c * 0.38, BLACK);
            if (!b[i]) continue;
            if (fall[i] < 0) fall[i] = Math.min(0, fall[i] + dt * 9);
            const y = oy + (r + fall[i]) * c + c / 2 + 0.5 + (empty > 0 ? empty * empty * n * 0.8 : 0);
            let col = b[i] > 0 ? pl.a : pl.b; if (win && win.includes(i)) col = glowPk(col, blink * 0.7);
            ball(g, cx, y, c * 0.38, c * 0.38, col);
          }
          if (!hold && !empty && inp.inside) { const q = colAt(inp), on = me.on && turn === 1; if (q >= 0 && top(q) >= 0) ball(g, ox + q * c + c / 2 + 0.5, Math.max(c * 0.4, oy - c * 0.55), c * 0.34, c * 0.34, dimPk(pl.a, on ? 0.8 : 0.4)); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // a variation's own rack size, colours and piece shape
      const A = g.alt, size = g.trait('Rack', A() < 0.62 ? '7 x 6' : A() < 0.4 ? '8 x 7' : A() < 0.6 ? '9 x 7' : '6 x 5'), W = +size[0], H = +size[4], WH = W * H;
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor(n / Math.max(W + 0.4, H + 1.4)), ox = (n - c * W) >> 1, oy = n - c * H - Math.max(1, (n - c * H) >> 2), pace = R.range(0.5, 0.8), rackStyle = R.pick(['ink', 'bright', 'dark']);
      const fix = skin(A, g), shape = g.trait('Pieces', A() < 0.5 ? 'Round' : SHAPES[(A() * SHAPES.length) | 0]), mid = (W - 1) / 2;
      g.trait('Frame', rackStyle === 'ink' ? 'Ink' : rackStyle === 'bright' ? 'Bright' : 'Dark');
      let pl, b, fall, turn, timer, hold, win, empty;
      const reset = () => { pl = fix(players(R)); b = new Int8Array(WH); fall = new Float32Array(WH); turn = 1; timer = 0; hold = 0; win = null; empty = 0; };
      reset();
      const top = col => { for (let r = H - 1; r >= 0; r--) if (!b[r * W + col]) return r; return -1; };
      const fours = (who) => {
        for (let r = 0; r < H; r++) for (let q = 0; q < W; q++) for (const [dr, dq] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
          const cells = []; for (let k = 0; k < 4; k++) { const rr = r + dr * k, qq = q + dq * k; if (rr < 0 || rr >= H || qq < 0 || qq >= W || b[rr * W + qq] !== who) break; cells.push(rr * W + qq); }
          if (cells.length === 4) return cells;
        }
        return null;
      };
      const wins = (col, who) => { const r = top(col); if (r < 0) return false; b[r * W + col] = who; const w = !!fours(who); b[r * W + col] = 0; return w; };
      const drop = pick => { const r = top(pick); b[r * W + pick] = turn; fall[r * W + pick] = -1 - r; win = fours(turn); if (win) hold = 3; turn = -turn; };
      const colAt = p => { const q = Math.floor((p.x * n - ox) / c); return q >= 0 && q < W ? q : -1; };
      const ALL = Array.from({ length: W }, (_, q) => q);
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const mine = me.on && turn === 1 && !hold && !empty;
        if (empty > 0) { empty += dt; if (empty > 1.6) reset(); }
        else if (hold > 0) { if ((hold -= dt) <= 0) empty = 0.001; }
        else if (mine) { for (const tp of taps) { const q = colAt(tp); if (q >= 0 && top(q) >= 0) { drop(q); timer = 0; break; } } }
        else if ((timer += dt) > pace) {
          timer = 0;
          const cols = ALL.filter(q => top(q) >= 0);
          if (!cols.length) hold = 2.5;
          else drop(cols.find(q => wins(q, turn)) ?? cols.find(q => wins(q, -turn)) ?? best(R, cols, q => -Math.abs(q - mid) * 0.6 + R() * 2 - (top(q) > 0 && (() => { const r = top(q); b[r * W + q] = turn; const bad = wins(q, -turn); b[r * W + q] = 0; return bad; })() ? 5 : 0)));
        }
        d.fill(BLACK);
        const blink = win ? 0.5 + 0.5 * Math.sin(t * 6) : 0, rack = rackStyle === 'bright' ? glowPk(pl.ink, 0.35) : rackStyle === 'dark' ? X.rgb(24, 24, 30) : pl.ink;
        X.rect(g, ox - 1, oy - 1, c * W + 2, c * H + 2, rack); X.rect(g, ox - 1, oy - 1, c * W + 2, 1, glowPk(rack, 0.3)); X.rect(g, ox - 1, oy + c * H, c * W + 2, 1, dimPk(rack, 0.6));
        for (let i = 0; i < WH; i++) {
          const q = i % W, r = (i / W) | 0, cx = ox + q * c + c / 2 + 0.5;
          if (shape === 'Square' || shape === 'Gem') X.rect(g, Math.round(cx - c * 0.38), Math.round(oy + r * c + c / 2 + 0.5 - c * 0.38), Math.round(c * 0.76), Math.round(c * 0.76), BLACK);
          else X.disc(g, cx, oy + r * c + c / 2 + 0.5, c * 0.38, BLACK);
          if (!b[i]) continue;
          if (fall[i] < 0) fall[i] = Math.min(0, fall[i] + dt * 9);
          const y = oy + (r + fall[i]) * c + c / 2 + 0.5 + (empty > 0 ? empty * empty * n * 0.8 : 0);
          let col = b[i] > 0 ? pl.a : pl.b; if (win && win.includes(i)) col = glowPk(col, blink * 0.7);
          piece(g, shape, cx, y, c * 0.38, c * 0.38, col);
        }
        if (!hold && !empty && inp.inside) { const q = colAt(inp); if (q >= 0 && top(q) >= 0) piece(g, shape, ox + q * c + c / 2 + 0.5, Math.max(c * 0.4, oy - c * 0.55), c * 0.34, c * 0.34, dimPk(pl.a, mine ? 0.8 : 0.4)); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Checkers', seed: 4, sizes: [50, 80, 100], fps: 12,
    interactive: 'Click one of your pieces, then where it should go; captures are compulsory.',
    recipe: 'Draughts by the book, played by two machines or by you against one: captures are compulsory, jumps chain, and a man that reaches the far row is crowned. The machine takes the longest capture it can find and otherwise pushes forward; taken pieces fade from the board.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Board', 8); g.trait('Colours', 'Neon, new each game'); g.trait('Pieces', 'Round'); g.trait('Kings', 'Crowned'); g.trait('Ground', 'Dark');
        const { n, d } = g, c = Math.floor(n / 8), o = (n - c * 8) >> 1;
        let pl, b, turn, timer, hold, moves, quiet, anim, ghosts;
        const reset = () => {
          pl = players(R); b = new Int8Array(64); turn = 1; timer = 0; hold = 0; moves = 0; quiet = 0; anim = null; ghosts = [];
          for (let i = 0; i < 64; i++) { const x = i % 8, y = i >> 3; if ((x + y) & 1) { if (y < 3) b[i] = -1; else if (y > 4) b[i] = 1; } }
        };
        reset();
        const dirs = (p) => Math.abs(p) === 2 ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : p > 0 ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]];
        const jumps = (i, p, taken) => {
          const out = [], y = i >> 3, x = i % 8;
          for (const [dy, dx] of dirs(p)) {
            const my = y + dy, mx = x + dx, ty = y + 2 * dy, tx = x + 2 * dx;
            if (ty < 0 || ty > 7 || tx < 0 || tx > 7) continue;
            const mid = my * 8 + mx, to = ty * 8 + tx;
            if (Math.sign(b[mid]) === -Math.sign(p) && !b[to] && !taken.includes(mid)) {
              const more = jumps(to, p, taken.concat(mid));
              if (more.length) for (const m of more) out.push({ path: [to, ...m.path], taken: [mid, ...m.taken] });
              else out.push({ path: [to], taken: [mid] });
            }
          }
          return out;
        };
        const legal = who => {
          const caps = [], steps = [];
          for (let i = 0; i < 64; i++) {
            if (Math.sign(b[i]) !== who) continue;
            const saved = b[i]; b[i] = 0;
            for (const j of jumps(i, saved, [])) caps.push({ from: i, ...j });
            b[i] = saved;
            for (const [dy, dx] of dirs(b[i])) { const y = (i >> 3) + dy, x = i % 8 + dx; if (y >= 0 && y < 8 && x >= 0 && x < 8 && !b[y * 8 + x]) steps.push({ from: i, path: [y * 8 + x], taken: [] }); }
          }
          return caps.length ? caps : steps;
        };
        let sel = -1;
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 1 && !hold && !anim, ms = mine ? legal(turn) : [];
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (mine && ms.length) {
            for (const tp of taps) {
              const i = cellAt(tp, n, o, c, 8);
              if (i < 0) continue;
              if (ms.some(m => m.from === i)) { sel = i; continue; }
              const opts = sel >= 0 ? ms.filter(mv => mv.from === sel && mv.path[mv.path.length - 1] === i) : [];
              if (opts.length) { anim = { m: opts.reduce((a, m) => m.taken.length > a.taken.length ? m : a), k: 0 }; sel = -1; timer = 0; break; }
            }
          }
          else if (anim) {
            anim.k += dt * 4;
            if (anim.k >= anim.m.path.length) {
              const { m } = anim, to = m.path[m.path.length - 1];
              b[to] = b[m.from]; b[m.from] = 0;
              for (const k of m.taken) { ghosts.push({ i: k, p: b[k], a: 1 }); b[k] = 0; }
              if ((to >> 3) === 0 && b[to] === 1) b[to] = 2; if ((to >> 3) === 7 && b[to] === -1) b[to] = -2;
              quiet = m.taken.length ? 0 : quiet + 1; anim = null; turn = -turn; moves++;
            }
          } else if ((timer += dt) > 0.35) {
            timer = 0;
            const ms = legal(turn);
            if (!ms.length || quiet > 40 || moves > 160) hold = 3;
            else anim = { m: best(R, ms, m => m.taken.length * 10 + (Math.abs(b[m.from]) === 1 ? (turn > 0 ? (m.from >> 3) - (m.path[0] >> 3) : (m.path[0] >> 3) - (m.from >> 3)) : 0) + R() * 3), k: 0 };
          }
          d.fill(BLACK);
          for (let i = 0; i < 64; i++) if (((i % 8) + (i >> 3)) & 1) X.rect(g, o + (i % 8) * c, o + (i >> 3) * c, c, c, pl.ink);
          const at = i => [o + (i % 8) * c + c / 2 + 0.5, o + (i >> 3) * c + c / 2 + 0.5];
          const piece = (x, y, p, k = 1) => { const col = dimPk(p > 0 ? pl.a : pl.b, k); ball(g, x, y, c * 0.38, c * 0.38, col); if (Math.abs(p) === 2) { X.disc(g, x, y, Math.max(1.2, c * 0.17), dimPk(col, 0.55)); X.disc(g, x, y, Math.max(1, c * 0.12), dimPk(WHITE, k)); } };
          for (let i = 0; i < 64; i++) if (b[i] && !(anim && anim.m.from === i)) { const [x, y] = at(i); piece(x, y, b[i]); }
          ghosts = ghosts.filter(gh => (gh.a -= dt * 1.5) > 0);
          for (const gh of ghosts) { const [x, y] = at(gh.i); piece(x, y, gh.p, gh.a); }
          if (anim) {
            const seq = [anim.m.from, ...anim.m.path], k = Math.min(anim.k, seq.length - 1.0001), s = Math.floor(k), f = k - s, [x0, y0] = at(seq[s]), [x1, y1] = at(seq[s + 1]);
            piece(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f - Math.sin(f * Math.PI) * (anim.m.taken.length ? c * 0.4 : 0), b[anim.m.from]);
          }
          if (me.on && turn === 1 && !hold && !anim) {
            for (const m of legal(1)) if (sel < 0 || m.from === sel) { const i = sel < 0 ? m.from : m.path[m.path.length - 1]; box(g, o + (i % 8) * c, o + (i >> 3) * c, c + 1, c + 1, sel < 0 ? dimPk(pl.a, 0.6) : pl.a); }
            if (sel >= 0) box(g, o + (sel % 8) * c, o + (sel >> 3) * c, c + 1, c + 1, WHITE);
          }
          if (inp.inside && !(me.on && turn === 1 && !hold && !anim)) { const h = cellAt(inp, n, o, c, 8); if (h >= 0) box(g, o + (h % 8) * c, o + (h >> 3) * c, c + 1, c + 1, HOVER); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // a variation's own board size, colours, piece shape and ground
      const A = g.alt, B = +g.trait('Board', A() < 0.65 ? 8 : A() < 0.7 ? 10 : 6), BB = B * B, rows = (B - 2) >> 1;
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor(n / B), o = (n - c * B) >> 1, pace = R.range(0.3, 0.5), light = R.bool(0.4);
      const fix = skin(A, g), shape = g.trait('Pieces', A() < 0.55 ? 'Round' : SHAPES[(A() * SHAPES.length) | 0]), stack = g.trait('Kings', A() < 0.6 ? 'Crowned' : 'Stacked') === 'Stacked';
      g.trait('Ground', light ? 'Light' : 'Dark');
      let pl, b, turn, timer, hold, moves, quiet, anim, ghosts, sel = -1;
      const reset = () => {
        pl = fix(players(R)); b = new Int8Array(BB); turn = 1; timer = 0; hold = 0; moves = 0; quiet = 0; anim = null; ghosts = []; sel = -1;
        for (let i = 0; i < BB; i++) { const x = i % B, y = (i / B) | 0; if ((x + y) & 1) { if (y < rows) b[i] = -1; else if (y >= B - rows) b[i] = 1; } }
      };
      reset();
      const dirs = (p) => Math.abs(p) === 2 ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : p > 0 ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]];
      const jumps = (i, p, taken) => {
        const out = [], y = (i / B) | 0, x = i % B;
        for (const [dy, dx] of dirs(p)) {
          const my = y + dy, mx = x + dx, ty = y + 2 * dy, tx = x + 2 * dx;
          if (ty < 0 || ty >= B || tx < 0 || tx >= B) continue;
          const mid = my * B + mx, to = ty * B + tx;
          if (Math.sign(b[mid]) === -Math.sign(p) && !b[to] && !taken.includes(mid)) {
            const more = jumps(to, p, taken.concat(mid));
            if (more.length) for (const m of more) out.push({ path: [to, ...m.path], taken: [mid, ...m.taken] });
            else out.push({ path: [to], taken: [mid] });
          }
        }
        return out;
      };
      const legal = who => {
        const caps = [], steps = [];
        for (let i = 0; i < BB; i++) {
          if (Math.sign(b[i]) !== who) continue;
          const saved = b[i]; b[i] = 0;
          for (const j of jumps(i, saved, [])) caps.push({ from: i, ...j });
          b[i] = saved;
          for (const [dy, dx] of dirs(b[i])) { const y = ((i / B) | 0) + dy, x = i % B + dx; if (y >= 0 && y < B && x >= 0 && x < B && !b[y * B + x]) steps.push({ from: i, path: [y * B + x], taken: [] }); }
        }
        return caps.length ? caps : steps;
      };
      const row = i => (i / B) | 0;
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const mine = me.on && turn === 1 && !hold && !anim, ms = mine || (!anim && !hold) ? legal(turn) : [];
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (anim) {
          anim.k += dt * 4;
          if (anim.k >= anim.m.path.length) {
            const { m } = anim, to = m.path[m.path.length - 1];
            b[to] = b[m.from]; b[m.from] = 0;
            for (const k of m.taken) { ghosts.push({ i: k, p: b[k], a: 1 }); b[k] = 0; }
            if (row(to) === 0 && b[to] === 1) b[to] = 2; if (row(to) === B - 1 && b[to] === -1) b[to] = -2;
            quiet = m.taken.length ? 0 : quiet + 1; anim = null; turn = -turn; moves++;
          }
        } else if (mine) {
          if (!ms.length) hold = 3;
          for (const tp of taps) {
            const i = cellAt(tp, n, o, c, B);
            if (i < 0) continue;
            if (ms.some(m => m.from === i)) { sel = i; continue; }
            const m = sel >= 0 && best(R, ms.filter(mv => mv.from === sel && mv.path[mv.path.length - 1] === i), mv => mv.taken.length);
            if (m) { anim = { m, k: 0 }; sel = -1; timer = 0; break; }
          }
        } else if ((timer += dt) > pace) {
          timer = 0;
          if (!ms.length || quiet > 40 || moves > 160 + (B - 8) * 40) hold = 3;
          else anim = { m: best(R, ms, m => m.taken.length * 10 + (Math.abs(b[m.from]) === 1 ? (turn > 0 ? row(m.from) - row(m.path[0]) : row(m.path[0]) - row(m.from)) : 0) + R() * 3), k: 0 };
        }
        d.fill(light ? dimPk(pl.ink, 0.35) : BLACK);
        for (let i = 0; i < BB; i++) if (((i % B) + row(i)) & 1) X.rect(g, o + (i % B) * c, o + row(i) * c, c, c, light ? glowPk(pl.ink, 0.2) : pl.ink);
        const at = i => [o + (i % B) * c + c / 2 + 0.5, o + row(i) * c + c / 2 + 0.5];
        const man = (x, y, p, k = 1) => {
          const col = dimPk(p > 0 ? pl.a : pl.b, k), king = Math.abs(p) === 2;
          if (king && stack) { piece(g, shape, x, y + c * 0.08, c * 0.38, c * 0.38, dimPk(col, 0.7)); piece(g, shape, x, y - c * 0.12, c * 0.36, c * 0.36, col); return; }
          piece(g, shape, x, y, c * 0.38, c * 0.38, col);
          if (king) { X.disc(g, x, y, Math.max(1.2, c * 0.17), dimPk(col, 0.55)); X.disc(g, x, y, Math.max(1, c * 0.12), dimPk(WHITE, k)); }
        };
        for (let i = 0; i < BB; i++) if (b[i] && !(anim && anim.m.from === i)) { const [x, y] = at(i); man(x, y, b[i]); }
        ghosts = ghosts.filter(gh => (gh.a -= dt * 1.5) > 0);
        for (const gh of ghosts) { const [x, y] = at(gh.i); man(x, y, gh.p, gh.a); }
        if (anim) {
          const seq = [anim.m.from, ...anim.m.path], k = Math.min(anim.k, seq.length - 1.0001), s = Math.floor(k), f = k - s, [x0, y0] = at(seq[s]), [x1, y1] = at(seq[s + 1]);
          man(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f - Math.sin(f * Math.PI) * (anim.m.taken.length ? c * 0.4 : 0), b[anim.m.from]);
        }
        if (mine) {
          for (const m of ms) if (sel < 0 || m.from === sel) { const i = sel < 0 ? m.from : m.path[m.path.length - 1]; box(g, o + (i % B) * c, o + row(i) * c, c + 1, c + 1, sel < 0 ? dimPk(pl.a, 0.6) : pl.a); }
          if (sel >= 0) box(g, o + (sel % B) * c, o + row(sel) * c, c + 1, c + 1, WHITE);
        } else if (inp.inside) { const h = cellAt(inp, n, o, c, B); if (h >= 0) box(g, o + (h % B) * c, o + row(h) * c, c + 1, c + 1, HOVER); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Hex', seed: 6, sizes: [100], fps: 12,
    recipe: 'The game of Hex on an eleven-by-eleven rhombus of hexagons: one colour must join top to bottom, the other left to right, and since the board can never be blocked both ways someone always wins. The winning chain lights up before the board clears.',
    make(R, U, g) {
      // cells are bricks: each row is offset half a brick, which joins them exactly like hexagons
      const { n, d } = g, L = 11, cw = 6, ch = 5, ox = 0, oy = Math.round((n - L * ch) / 2);
      let pl, b, turn, timer, hold, chain;
      const reset = () => { pl = players(R); b = new Int8Array(L * L); turn = 1; timer = 0; hold = 0; chain = null; };
      reset();
      const nb = i => { const r = (i / L) | 0, q = i % L, out = []; for (const [dr, dq] of [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0]]) { const rr = r + dr, qq = q + dq; if (rr >= 0 && rr < L && qq >= 0 && qq < L) out.push(rr * L + qq); } return out; };
      // player 1 joins rows 0 and L-1; player -1 joins columns 0 and L-1
      const winner = who => {
        const from = new Int32Array(L * L).fill(-2), q = [];
        for (let k = 0; k < L; k++) { const i = who > 0 ? k : k * L; if (b[i] === who) { from[i] = -1; q.push(i); } }
        for (let h = 0; h < q.length; h++) {
          const i = q[h];
          if ((who > 0 ? (i / L | 0) : i % L) === L - 1) { const out = []; for (let k = i; k >= 0; k = from[k]) out.push(k); return out; }
          for (const j of nb(i)) if (b[j] === who && from[j] === -2) { from[j] = i; q.push(j); }
        }
        return null;
      };
      const centre = i => { const r = (i / L) | 0, q = i % L; return [Math.round(ox + (q + r * 0.5) * cw + (n - (L + (L - 1) * 0.5) * cw) / 2), oy + r * ch]; };
      const shift = (n - ox * 2 - (L + (L - 1) * 0.5) * cw) / 2, side = new Int8Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const r = (y - oy) / ch - 0.5, q = (x - ox - shift) / cw - Math.floor(r + 0.5) * 0.5 - 0.5, er = Math.max(-0.5 - r, r - (L - 0.5)), eq = Math.max(-0.5 - q, q - (L - 0.5));
        if (er > 0 || eq > 0) side[y * n + x] = er > eq ? 1 : -1;
      }
      const hexPts = (x, y, s) => { const out = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; out.push(x + Math.cos(a) * s, y + Math.sin(a) * s); } return out; };
      return (t, dt) => {
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if ((timer += dt) > 0.3) {
          timer = 0;
          const empty = []; for (let i = 0; i < L * L; i++) if (!b[i]) empty.push(i);
          const mine = empty.filter(i => nb(i).some(j => b[j] === turn));
          const pick = mine.length && R() < 0.75 ? best(R, mine, i => { const r = (i / L) | 0, q = i % L; return (turn > 0 ? -Math.abs(q - 5) * 0.1 + R() : -Math.abs(r - 5) * 0.1 + R()); }) : R.pick(empty);
          b[pick] = turn;
          chain = winner(turn); if (chain) hold = 3.5;
          turn = -turn;
        }
        d.fill(BLACK);
        // outside the rhombus, each side takes the colour of the player who must reach it
        const ta = dimPk(pl.a, 0.28), tb = dimPk(pl.b, 0.28);
        for (let i = 0; i < n * n; i++) if (side[i]) d[i] = side[i] > 0 ? ta : tb;
        const glow = chain ? 0.5 + 0.5 * Math.sin(t * 5) : 0;
        for (let i = 0; i < L * L; i++) {
          const [x, y] = centre(i);
          let col = b[i] > 0 ? pl.a : b[i] < 0 ? pl.b : pl.ink;
          if (chain && chain.includes(i)) col = glowPk(col, 0.3 + glow * 0.5);
          X.rect(g, x, y, cw - 1, ch - 1, col);
        }
      };
    },
  });

  add({
    name: 'Lights Out', seed: 1, sizes: [50, 80, 100], fps: 12,
    recipe: 'A Lights Out board is scrambled by random presses, each one flipping a cell and its four neighbours. Then a solver works out the exact set of presses by linear algebra over two values and makes them one by one until every light is dark.',
    make(R, U, g) {
      const { n, d } = g;
      let m, c, o, on, glow, pl, queue, phase, timer, hold, pressed;
      const reset = () => {
        m = R.pick([5, 6, 7]); c = Math.floor(n / m); o = (n - c * m) >> 1; on = new Uint8Array(m * m); glow = new Float32Array(m * m); pressed = new Float32Array(m * m);
        pl = players(R); queue = []; for (let k = 0; k < R.int(m * 2, m * 4); k++) queue.push(R.int(0, m * m - 1)); phase = 'scramble'; timer = 0; hold = 0;
      };
      reset();
      const press = i => { const x = i % m, y = (i / m) | 0; for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < m && yy < m) { on[yy * m + xx] ^= 1; glow[yy * m + xx] = 1; } } pressed[i] = 1; };
      const solve = () => {   // Gaussian elimination over GF(2): which cells to press to clear the board
        const N = m * m, A = Array.from({ length: N }, (_, r) => { const row = new Uint8Array(N + 1), x = r % m, y = (r / m) | 0; for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < m && yy < m) row[yy * m + xx] = 1; } row[N] = on[r]; return row; });
        const where = new Int32Array(N).fill(-1); let row = 0;
        for (let col = 0; col < N && row < N; col++) {
          let p = row; while (p < N && !A[p][col]) p++; if (p === N) continue;
          [A[p], A[row]] = [A[row], A[p]];
          for (let r = 0; r < N; r++) if (r !== row && A[r][col]) for (let k = col; k <= N; k++) A[r][k] ^= A[row][k];
          where[col] = row++;
        }
        const out = []; for (let col = 0; col < N; col++) if (where[col] >= 0 && A[where[col]][N]) out.push(col);
        return R.shuffle(out);
      };
      return (t, dt) => {
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if ((timer += dt) > (phase === 'scramble' ? 0.18 : 0.45)) {
          timer = 0;
          if (queue.length) press(queue.shift());
          else if (phase === 'scramble') { phase = 'solve'; queue = solve(); timer = -1; }
          else hold = 2.5;
        }
        d.fill(BLACK);
        for (let i = 0; i < m * m; i++) {
          glow[i] *= 0.8; pressed[i] *= 0.85;
          const x = o + (i % m) * c, y = o + ((i / m) | 0) * c;
          let col = on[i] ? (phase === 'scramble' ? pl.b : pl.a) : dimPk(pl.ink, 0.8);
          if (glow[i] > 0.05) col = glowPk(col, glow[i] * 0.5);
          X.rect(g, x + 1, y + 1, c - 2, c - 2, col);
          if (on[i]) X.rect(g, x + 3, y + 3, c - 6, c - 6, glowPk(col, 0.35));
          if (pressed[i] > 0.1) { const w = dimPk(WHITE, pressed[i]); X.rect(g, x, y, c, 1, w); X.rect(g, x, y + c - 1, c, 1, w); X.rect(g, x, y, 1, c, w); X.rect(g, x + c - 1, y, 1, c, w); }
        }
      };
    },
  });

  add({
    name: 'Peg Solitaire', seed: 5, sizes: [50, 80, 100], fps: 12,
    interactive: 'Click a peg, then the hole it should jump into.',
    recipe: 'Peg solitaire on the English cross, the French board or a triangle of fifteen: a peg jumps a neighbour into a hole and the jumped peg is lifted out, again and again, the player favouring jumps that keep the pegs together, until no jump is left. Or solve it yourself.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Board', 'English cross'); g.trait('Pegs', 'Round'); g.trait('Holes', 'Round'); g.trait('Colours', 'Neon, new each game');
        const { n, d } = g, c = Math.floor(n / 7), o = (n - c * 7) >> 1;
        const valid = i => { const x = i % 7, y = (i / 7) | 0; return (x >= 2 && x <= 4) || (y >= 2 && y <= 4); };
        let pl, peg, timer, hold, anim, gone;
        const reset = () => { pl = players(R); peg = new Uint8Array(49); for (let i = 0; i < 49; i++) peg[i] = valid(i) && i !== 24 ? 1 : 0; timer = 0; hold = 0; anim = null; gone = []; };
        reset();
        const jumpsNow = () => {
          const out = [];
          for (let i = 0; i < 49; i++) if (peg[i]) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const x = i % 7, y = (i / 7) | 0, mx = x + dx, my = y + dy, tx = x + 2 * dx, ty = y + 2 * dy;
            if (tx < 0 || ty < 0 || tx > 6 || ty > 6) continue;
            const mid = my * 7 + mx, to = ty * 7 + tx;
            if (valid(to) && peg[mid] && !peg[to]) out.push([i, mid, to]);
          }
          return out;
        };
        let sel = -1;
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const js = me.on && !anim && hold <= 0 ? jumpsNow() : [];
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (me.on && !anim && js.length) {
            for (const tp of taps) {
              const i = cellAt(tp, n, o, c, 7); if (i < 0) continue;
              if (js.some(m => m[0] === i)) { sel = i; continue; }
              const m = js.find(mv => mv[0] === sel && mv[2] === i);
              if (m) { peg[m[0]] = 0; anim = { m, k: 0 }; sel = -1; timer = 0; break; }
            }
          }
          else if (anim) { anim.k += dt * 2.5; if (anim.k >= 1) { peg[anim.m[2]] = 1; gone.push({ i: anim.m[1], a: 1 }); peg[anim.m[1]] = 0; anim = null; } }
          else if ((timer += dt) > 0.4) {
            timer = 0;
            const js = jumpsNow();
            if (!js.length) hold = 3.5;
            else { const m = best(R, js, ([, , to]) => -Math.hypot(to % 7 - 3, ((to / 7) | 0) - 3) + R() * 1.5); peg[m[0]] = 0; anim = { m, k: 0 }; }
          }
          d.fill(BLACK);
          const at = i => [o + (i % 7) * c + c / 2 + 0.5, o + ((i / 7) | 0) * c + c / 2 + 0.5];
          const left = peg.reduce((a, v) => a + v, 0) + (anim ? 1 : 0), k = 1 - left / 32;
          for (let i = 0; i < 49; i++) {
            if (!valid(i)) continue;
            const [x, y] = at(i);
            X.disc(g, x, y, c * 0.18, pl.ink);
            if (peg[i]) ball(g, x, y, c * 0.36, c * 0.36, X.mixPk(pl.a, pl.b, k));
          }
          gone = gone.filter(gp => (gp.a -= dt * 1.6) > 0);
          for (const gp of gone) { const [x, y] = at(gp.i); X.disc(g, x, y, c * 0.36 * (0.5 + gp.a * 0.5), glowPk(dimPk(pl.b, gp.a), 0.5 * gp.a)); }
          if (anim) { const [x0, y0] = at(anim.m[0]), [x1, y1] = at(anim.m[2]), f = anim.k; ball(g, x0 + (x1 - x0) * f, y0 + (y1 - y0) * f - Math.sin(f * Math.PI) * c * 0.5, c * 0.4, c * 0.4, glowPk(X.mixPk(pl.a, pl.b, k), 0.35)); }
          if (me.on && !anim && hold <= 0) {
            for (const m of jumpsNow()) if (sel < 0 || m[0] === sel) { const i = sel < 0 ? m[0] : m[2]; box(g, o + (i % 7) * c, o + ((i / 7) | 0) * c, c + 1, c + 1, sel < 0 ? dimPk(pl.a, 0.55) : pl.a); }
            if (sel >= 0) box(g, o + (sel % 7) * c, o + ((sel / 7) | 0) * c, c + 1, c + 1, WHITE);
          } else if (inp.inside) { const h = cellAt(inp, n, o, c, 7); if (h >= 0 && valid(h)) box(g, o + (h % 7) * c, o + ((h / 7) | 0) * c, c + 1, c + 1, HOVER); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, me = seat(), shape0 = R.pick(['english', 'english', 'french', 'square']), pace = R.range(0.3, 0.5), square = R.bool(0.4);
      // a variation's own board, colours and peg shape
      const A = g.alt, shape = A() < 0.24 ? (A() < 0.65 ? 'diamond' : 'full') : shape0, fix = skin(A, g), pegShape = square ? 'Square' : A() < 0.55 ? 'Round' : A() < 0.5 ? 'Gem' : 'Ring';
      g.trait('Board', { english: 'English cross', french: 'French', square: 'Square', diamond: 'Diamond', full: 'Full grid' }[shape]); g.trait('Pegs', pegShape); g.trait('Holes', square ? 'Square' : 'Round');
      const S = 7, c = Math.floor(n / S), o = (n - c * S) >> 1;
      const valid = i => { const x = i % S, y = (i / S) | 0; if (shape === 'full') return true; if (shape === 'diamond') return Math.abs(x - 3) + Math.abs(y - 3) <= 3; if (shape === 'square') return x >= 1 && x <= 5 && y >= 1 && y <= 5; if (shape === 'french') return ((x >= 2 && x <= 4) || (y >= 2 && y <= 4)) || ((x === 1 || x === 5) && (y === 1 || y === 5)); return (x >= 2 && x <= 4) || (y >= 2 && y <= 4); };
      const holeStart = shape === 'french' ? 17 : 24;
      let pl, peg, timer, hold, anim, gone, sel = -1, total;
      const reset = () => { pl = fix(players(R)); peg = new Uint8Array(S * S); total = 0; for (let i = 0; i < S * S; i++) { peg[i] = valid(i) && i !== holeStart ? 1 : 0; total += peg[i]; } timer = 0; hold = 0; anim = null; gone = []; sel = -1; };
      reset();
      const jumpsNow = () => {
        const out = [];
        for (let i = 0; i < S * S; i++) if (peg[i]) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const x = i % S, y = (i / S) | 0, mx = x + dx, my = y + dy, tx = x + 2 * dx, ty = y + 2 * dy;
          if (tx < 0 || ty < 0 || tx >= S || ty >= S) continue;
          const mid = my * S + mx, to = ty * S + tx;
          if (valid(to) && peg[mid] && !peg[to]) out.push([i, mid, to]);
        }
        return out;
      };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const js = !anim && !hold ? jumpsNow() : [];
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (anim) { anim.k += dt * 2.5; if (anim.k >= 1) { peg[anim.m[2]] = 1; gone.push({ i: anim.m[1], a: 1 }); peg[anim.m[1]] = 0; anim = null; } }
        else if (me.on) {
          if (!js.length) hold = 3.5;
          for (const tp of taps) {
            const i = cellAt(tp, n, o, c, S); if (i < 0) continue;
            if (js.some(m => m[0] === i)) { sel = i; continue; }
            const m = js.find(mv => mv[0] === sel && mv[2] === i);
            if (m) { peg[m[0]] = 0; anim = { m, k: 0 }; sel = -1; break; }
          }
        }
        else if ((timer += dt) > pace) {
          timer = 0;
          if (!js.length) hold = 3.5;
          else { const m = best(R, js, ([, , to]) => -Math.hypot(to % S - 3, ((to / S) | 0) - 3) + R() * 1.5); peg[m[0]] = 0; anim = { m, k: 0 }; }
        }
        d.fill(BLACK);
        const at = i => [o + (i % S) * c + c / 2 + 0.5, o + ((i / S) | 0) * c + c / 2 + 0.5];
        const left = peg.reduce((a, v) => a + v, 0) + (anim ? 1 : 0), k = 1 - left / total;
        const dot = (x, y, r, col) => square ? X.rect(g, x - r, y - r, 2 * r, 2 * r, col) : X.disc(g, x, y, r, col);
        const pegAt = (x, y, r, col) => square ? (X.rect(g, x - r, y - r, 2 * r, 2 * r, dimPk(col, 0.62)), X.rect(g, x - r, y - r, 2 * r - 1, 2 * r - 1, col), X.rect(g, x - r, y - r, 2 * r - 1, 1, glowPk(col, 0.35))) : piece(g, pegShape, x, y, r, r, col);
        for (let i = 0; i < S * S; i++) {
          if (!valid(i)) continue;
          const [x, y] = at(i);
          dot(x, y, c * 0.18, pl.ink);
          if (peg[i]) pegAt(x, y, c * 0.36, X.mixPk(pl.a, pl.b, k));
        }
        gone = gone.filter(gp => (gp.a -= dt * 1.6) > 0);
        for (const gp of gone) { const [x, y] = at(gp.i); dot(x, y, c * 0.36 * (0.5 + gp.a * 0.5), glowPk(dimPk(pl.b, gp.a), 0.5 * gp.a)); }
        if (anim) { const [x0, y0] = at(anim.m[0]), [x1, y1] = at(anim.m[2]), f = anim.k; pegAt(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f - Math.sin(f * Math.PI) * c * 0.5, c * 0.4, glowPk(X.mixPk(pl.a, pl.b, k), 0.35)); }
        if (me.on && !anim && !hold) {
          for (const m of js) if (sel < 0 || m[0] === sel) { const i = sel < 0 ? m[0] : m[2]; box(g, o + (i % S) * c, o + ((i / S) | 0) * c, c + 1, c + 1, sel < 0 ? dimPk(pl.a, 0.55) : pl.a); }
          if (sel >= 0) box(g, o + (sel % S) * c, o + ((sel / S) | 0) * c, c + 1, c + 1, WHITE);
        } else if (inp.inside) { const h = cellAt(inp, n, o, c, S); if (h >= 0 && valid(h)) box(g, o + (h % S) * c, o + ((h / S) | 0) * c, c + 1, c + 1, HOVER); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Mill', seed: 5, sizes: [50, 80, 100], fps: 12,
    interactive: 'Click points to place your nine men, then click a man and a free neighbour to move; make a mill, then click an enemy man to take it.',
    recipe: 'Nine Men’s Morris, by two machines or by you against one: each player sets down nine pieces on the three nested squares and then slides them along the lines. Three in a row makes a mill, which flashes and lets its owner lift an enemy piece; a player left with two loses.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Game', 'Nine men'); g.trait('Board', 'Square'); g.trait('Lines', 'Thin'); g.trait('Ground', 'Bare'); g.trait('Pieces', 'Round'); g.trait('Colours', 'Neon, new each game');
        const { n, d } = g, o = Math.round(n * 0.08), span = n - 2 * o;
        const pts = []; for (let ring = 0; ring < 3; ring++) { const a = ring * span / 6; for (const [u, v] of [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [1, 1], [0.5, 1], [0, 1], [0, 0.5]]) pts.push([o + a + u * (span - 2 * a), o + a + v * (span - 2 * a)]); }
        const adj = Array.from({ length: 24 }, () => []), link = (a, b) => { adj[a].push(b); adj[b].push(a); };
        for (let r = 0; r < 3; r++) for (let k = 0; k < 8; k++) link(r * 8 + k, r * 8 + (k + 1) % 8);
        for (const k of [1, 3, 5, 7]) { link(k, 8 + k); link(8 + k, 16 + k); }
        const mills = []; for (let r = 0; r < 3; r++) for (const k of [0, 2, 4, 6]) mills.push([r * 8 + k, r * 8 + k + 1, r * 8 + (k + 2) % 8]);
        for (const k of [1, 3, 5, 7]) mills.push([k, 8 + k, 16 + k]);
        let pl, b, hand, turn, timer, hold, flash, lost, moves;
        const reset = () => { pl = players(R); b = new Int8Array(24); hand = { 1: 9, '-1': 9 }; turn = 1; timer = 0; hold = 0; flash = new Float32Array(24); lost = []; moves = 0; };
        reset();
        const inMill = (i, who) => mills.some(m => m.includes(i) && m.every(k => (k === i ? who : b[k]) === who));
        const count = who => b.reduce((a, v) => a + (v === who), 0);
        let sel = -1, taking = false;
        const nearest = p => { let bi = -1, bd = (n * 0.06) ** 2; pts.forEach(([x, y], i) => { const dd = (x - p.x * n) ** 2 + (y - p.y * n) ** 2; if (dd < bd) { bd = dd; bi = i; } }); return bi; };
        // the viewer's piece lands on `to`: a mill flashes and they choose a piece to take
        const landed = to => { if (inMill(to, 1)) { for (const m of mills) if (m.includes(to) && m.every(k => b[k] === 1)) for (const k of m) flash[k] = 1; taking = true; } else turn = -turn; };
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 1 && !hold;
          if (!me.on && taking) {   // the viewer left mid-mill: take the first piece that may be taken
            let tk = -1; for (let i = 0; i < 24 && tk < 0; i++) if (b[i] === -1 && !inMill(i, -1)) tk = i;
            if (tk < 0) tk = b.findIndex(v => v === -1);
            if (tk >= 0) { lost.push({ i: tk, p: -1, a: 1 }); b[tk] = 0; }
            taking = false; turn = -turn;
          }
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (mine) {
            for (const tp of taps) {
              const i = nearest(tp); if (i < 0) continue;
              if (taking) { if (b[i] === -1 && (!inMill(i, -1) || b.every((v, k) => v !== -1 || inMill(k, -1)))) { lost.push({ i, p: -1, a: 1 }); b[i] = 0; taking = false; if (hand[-1] === 0 && count(-1) < 3) hold = 3.5; turn = -turn; timer = 0; } break; }
              if (hand[1] > 0) { if (!b[i]) { b[i] = 1; hand[1]--; moves++; landed(i); timer = 0; } break; }
              if (b[i] === 1) { sel = i; continue; }
              if (sel >= 0 && !b[i] && (adj[sel].includes(i) || count(1) === 3)) { b[sel] = 0; b[i] = 1; sel = -1; moves++; landed(i); timer = 0; break; }
            }
            if (!taking && hand[1] === 0 && turn === 1) { let any = false; for (let i = 0; i < 24 && !any; i++) if (b[i] === 1) for (const j of adj[i]) if (!b[j]) any = true; if (!any) hold = 3; }
          }
          else if ((timer += dt) > 0.5) {
            timer = 0; moves++;
            let to = -1, from = -1;
            if (hand[turn] > 0) {
              const empty = []; for (let i = 0; i < 24; i++) if (!b[i]) empty.push(i);
              to = empty.find(i => inMill(i, turn)) ?? empty.find(i => inMill(i, -turn)) ?? best(R, empty, i => adj[i].length + R() * 3);
              hand[turn]--;
            } else {
              const ms = []; for (let i = 0; i < 24; i++) if (b[i] === turn) for (const j of adj[i]) if (!b[j]) ms.push([i, j]);
              if (!ms.length || moves > 220) { hold = 3; return draw(); }
              const m = best(R, ms, ([i, j]) => { b[i] = 0; const v = inMill(j, turn) ? 10 : 0; b[i] = turn; return v + R() * 2; });
              [from, to] = m; b[from] = 0;
            }
            b[to] = turn;
            if (inMill(to, turn)) {
              for (const m of mills) if (m.includes(to) && m.every(k => b[k] === turn)) for (const k of m) flash[k] = 1;
              const prey = []; for (let i = 0; i < 24; i++) if (b[i] === -turn && !inMill(i, -turn)) prey.push(i);
              const take = prey.length ? R.pick(prey) : (() => { for (let i = 0; i < 24; i++) if (b[i] === -turn) return i; return -1; })();
              if (take >= 0) { lost.push({ i: take, p: -turn, a: 1 }); b[take] = 0; }
              if (hand[-turn] === 0 && count(-turn) < 3) hold = 3.5;
            }
            turn = -turn;
          }
          return draw();
          function draw() {
            d.fill(BLACK);
            for (let a = 0; a < 24; a++) for (const b2 of adj[a]) if (b2 > a) X.line(g, pts[a][0], pts[a][1], pts[b2][0], pts[b2][1], pl.ink);
            const r = Math.max(1.6, n * 0.035);
            for (let i = 0; i < 24; i++) {
              flash[i] *= 0.93;
              X.disc(g, pts[i][0] + 0.5, pts[i][1] + 0.5, r * 0.45, glowPk(pl.ink, 0.25));
              if (!b[i]) continue;
              let col = b[i] > 0 ? pl.a : pl.b; if (flash[i] > 0.05) col = glowPk(col, flash[i] * 0.7);
              ball(g, pts[i][0] + 0.5, pts[i][1] + 0.5, r, r, col);
            }
            lost = lost.filter(l => (l.a -= dt * 1.4) > 0);
            for (const l of lost) X.disc(g, pts[l.i][0] + 0.5, pts[l.i][1] + 0.5, r * (1 + (1 - l.a)), dimPk(l.p > 0 ? pl.a : pl.b, l.a));
            // pieces still in hand, as two rows of pips along the edges
            for (const who of [1, -1]) for (let k = 0; k < hand[who]; k++) X.rect(g, o + k * Math.max(2, Math.floor(span / 18)), who > 0 ? n - Math.max(2, o / 2) - 1 : Math.max(1, o / 2 - 1), Math.max(1, Math.floor(span / 30)), Math.max(1, Math.floor(o / 3)), who > 0 ? pl.a : pl.b);
            if (me.on && turn === 1 && !hold) {
              const r = Math.max(1.6, n * 0.035), h = inp.inside ? nearest(inp) : -1;
              if (h >= 0) box(g, pts[h][0] - r - 1, pts[h][1] - r - 1, 2 * r + 3, 2 * r + 3, taking ? WHITE : pl.a);
              if (sel >= 0) box(g, pts[sel][0] - r - 2, pts[sel][1] - r - 2, 2 * r + 5, 2 * r + 5, WHITE);
            } else if (inp.inside) { const h = nearest(inp); if (h >= 0) box(g, pts[h][0] - r - 1, pts[h][1] - r - 1, 2 * r + 3, 2 * r + 3, HOVER); }
            me.ping(g);
          }
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, me = seat(), o = Math.round(n * 0.08), span = n - 2 * o, pace = R.range(0.4, 0.6), ringStyle = R.pick(['round', 'square']);
      // a variation's own game (six, nine or twelve men), board shape, line weight, colours and pieces
      const A = g.alt, game = g.trait('Game', A() < 0.5 ? 'Nine men' : A() < 0.55 ? 'Six men' : 'Twelve men'), RINGS = game === 'Six men' ? 2 : 3, MEN = game === 'Six men' ? 6 : game === 'Twelve men' ? 12 : 9, P = RINGS * 8;
      const form = g.trait('Board', A() < 0.5 ? 'Square' : A() < 0.55 ? 'Octagon' : 'Circle'), bold = g.trait('Lines', A() < 0.6 || n < 80 ? 'Thin' : 'Bold') === 'Bold', panel = g.trait('Ground', A() < 0.6 ? 'Bare' : 'Panel') === 'Panel';
      const fix = skin(A, g), shape = g.trait('Pieces', ringStyle === 'square' ? 'Square' : A() < 0.55 ? 'Round' : A() < 0.5 ? 'Gem' : 'Ring');
      const C = n / 2, step = RINGS === 2 ? span / 4 : span / 6, SQ = [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [1, 1], [0.5, 1], [0, 1], [0, 0.5]];
      const pts = []; for (let ring = 0; ring < RINGS; ring++) { const a = ring * step, rr = span / 2 - a; for (let j = 0; j < 8; j++) pts.push(form === 'Square' ? [o + a + SQ[j][0] * (span - 2 * a), o + a + SQ[j][1] * (span - 2 * a)] : [Math.round(C + Math.cos(-0.75 * Math.PI + j * Math.PI / 4) * rr), Math.round(C + Math.sin(-0.75 * Math.PI + j * Math.PI / 4) * rr)]); }
      const adj = Array.from({ length: P }, () => []), link = (a, b) => { adj[a].push(b); adj[b].push(a); };
      for (let r = 0; r < RINGS; r++) for (let k = 0; k < 8; k++) link(r * 8 + k, r * 8 + (k + 1) % 8);
      const spokes = game === 'Twelve men' ? [0, 1, 2, 3, 4, 5, 6, 7] : [1, 3, 5, 7];
      for (const k of spokes) for (let r = 0; r + 1 < RINGS; r++) link(r * 8 + k, (r + 1) * 8 + k);
      const mills = []; for (let r = 0; r < RINGS; r++) for (const k of [0, 2, 4, 6]) mills.push([r * 8 + k, r * 8 + k + 1, r * 8 + (k + 2) % 8]);
      if (RINGS === 3) for (const k of spokes) mills.push([k, 8 + k, 16 + k]);
      let pl, b, hand, turn, timer, hold, flash, lost, moves, sel = -1, taking = false;
      const reset = () => { pl = fix(players(R)); b = new Int8Array(P); hand = { 1: MEN, '-1': MEN }; turn = 1; timer = 0; hold = 0; flash = new Float32Array(P); lost = []; moves = 0; sel = -1; taking = false; };
      reset();
      const inMill = (i, who) => mills.some(m => m.includes(i) && m.every(k => (k === i ? who : b[k]) === who));
      const count = who => b.reduce((a, v) => a + (v === who), 0);
      const nearest = p => { let bi = -1, bd = (n * 0.06) ** 2; pts.forEach(([x, y], i) => { const dd = (x - p.x * n) ** 2 + (y - p.y * n) ** 2; if (dd < bd) { bd = dd; bi = i; } }); return bi; };
      const landed = (to, human) => {
        if (inMill(to, turn)) {
          for (const m of mills) if (m.includes(to) && m.every(k => b[k] === turn)) for (const k of m) flash[k] = 1;
          if (human) { taking = true; return; }
          const prey = []; for (let i = 0; i < P; i++) if (b[i] === -turn && !inMill(i, -turn)) prey.push(i);
          const tk = prey.length ? R.pick(prey) : b.findIndex(v => v === -turn);
          if (tk >= 0) { lost.push({ i: tk, p: b[tk], a: 1 }); b[tk] = 0; }
          if (hand[-turn] === 0 && count(-turn) < 3) hold = 3.5;
        }
        turn = -turn;
      };
      // the board: lines between linked points (ring edges follow the circle on a round board)
      const seg = (x0, y0, x1, y1, col) => { X.line(g, x0, y0, x1, y1, col); if (bold) { X.line(g, x0 + 1, y0, x1 + 1, y1, col); X.line(g, x0, y0 + 1, x1, y1 + 1, col); } };
      const drawBoard = () => {
        if (panel) { const col = dimPk(pl.ink, 0.45); if (form === 'Square') X.rect(g, o - 2, o - 2, span + 5, span + 5, col); else if (form === 'Circle') X.disc(g, C + 0.5, C + 0.5, span / 2 + 3, col); else X.poly(g, pts.slice(0, 8).flatMap(([x, y]) => [x + 0.5 + Math.sign(x - C) * 3, y + 0.5 + Math.sign(y - C) * 3]), col); }
        for (let a = 0; a < P; a++) for (const b2 of adj[a]) {
          if (b2 <= a) continue;
          const sameRing = (a >> 3) === (b2 >> 3);
          if (form === 'Circle' && sameRing) {
            const rr = span / 2 - (a >> 3) * step, ja = a & 7, jb = b2 & 7, a0 = -0.75 * Math.PI + ja * Math.PI / 4, a1 = a0 + ((jb - ja + 8) % 8 === 1 ? 1 : -1) * Math.PI / 4;
            let px = C + Math.cos(a0) * rr, py = C + Math.sin(a0) * rr;
            for (let s = 1; s <= 6; s++) { const an = a0 + (a1 - a0) * s / 6, qx = C + Math.cos(an) * rr, qy = C + Math.sin(an) * rr; seg(px, py, qx, qy, pl.ink); px = qx; py = qy; }
          } else seg(pts[a][0], pts[a][1], pts[b2][0], pts[b2][1], pl.ink);
        }
      };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const mine = me.on && turn === 1 && !hold;
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (mine) {
          for (const tp of taps) {
            const i = nearest(tp); if (i < 0) continue;
            if (taking) { if (b[i] === -1 && (!inMill(i, -1) || b.every((v, k) => v !== -1 || inMill(k, -1)))) { lost.push({ i, p: -1, a: 1 }); b[i] = 0; taking = false; if (hand[-1] === 0 && count(-1) < 3) hold = 3.5; turn = -turn; timer = 0; } break; }
            if (hand[1] > 0) { if (!b[i]) { b[i] = 1; hand[1]--; moves++; landed(i, true); timer = 0; } break; }
            if (b[i] === 1) { sel = i; continue; }
            if (sel >= 0 && !b[i] && (adj[sel].includes(i) || count(1) === 3)) { b[sel] = 0; b[i] = 1; sel = -1; moves++; landed(i, true); timer = 0; break; }
          }
          if (!taking && hand[1] === 0 && turn === 1) { let any = false; for (let i = 0; i < P && !any; i++) if (b[i] === 1) for (const j of adj[i]) if (!b[j]) any = true; if (!any) hold = 3; }
        }
        else if (taking) {   // the viewer left mid-mill: lift a piece for them
          const prey = []; for (let i = 0; i < P; i++) if (b[i] === -1 && !inMill(i, -1)) prey.push(i);
          const tk = prey.length ? R.pick(prey) : b.findIndex(v => v === -1);
          if (tk >= 0) { lost.push({ i: tk, p: -1, a: 1 }); b[tk] = 0; }
          taking = false; turn = -turn;
        }
        else if ((timer += dt) > pace) {
          timer = 0; moves++;
          if (hand[turn] > 0) {
            const empty = []; for (let i = 0; i < P; i++) if (!b[i]) empty.push(i);
            if (!empty.length) hold = 3;
            else { const to = empty.find(i => inMill(i, turn)) ?? empty.find(i => inMill(i, -turn)) ?? best(R, empty, i => adj[i].length + R() * 3); hand[turn]--; b[to] = turn; landed(to, false); }
          } else {
            const ms = []; for (let i = 0; i < P; i++) if (b[i] === turn) for (const j of adj[i]) if (!b[j]) ms.push([i, j]);
            if (!ms.length || moves > 220) hold = 3;
            else { const [from, to] = best(R, ms, ([i, j]) => { b[i] = 0; const v = inMill(j, turn) ? 10 : 0; b[i] = turn; return v + R() * 2; }); b[from] = 0; b[to] = turn; landed(to, false); }
          }
        }
        d.fill(BLACK);
        drawBoard();
        const r = Math.max(1.6, n * (RINGS === 2 ? 0.042 : 0.035)), dot = (x, y, rr, col) => shape === 'Square' ? X.rect(g, x - rr + 0.5, y - rr + 0.5, 2 * rr, 2 * rr, col) : X.disc(g, x + 0.5, y + 0.5, rr, col);
        for (let i = 0; i < P; i++) {
          flash[i] *= 0.93;
          dot(pts[i][0], pts[i][1], r * 0.45, glowPk(pl.ink, 0.25));
          if (!b[i]) continue;
          let col = b[i] > 0 ? pl.a : pl.b; if (flash[i] > 0.05) col = glowPk(col, flash[i] * 0.7);
          if (shape === 'Square') dot(pts[i][0], pts[i][1], r, col); else piece(g, shape, pts[i][0] + 0.5, pts[i][1] + 0.5, r, r, col);
        }
        lost = lost.filter(l => (l.a -= dt * 1.4) > 0);
        for (const l of lost) dot(pts[l.i][0], pts[l.i][1], r * (1 + (1 - l.a)), dimPk(l.p > 0 ? pl.a : pl.b, l.a));
        for (const who of [1, -1]) for (let k = 0; k < hand[who]; k++) X.rect(g, o + k * Math.max(2, Math.floor(span / (MEN * 2))), who > 0 ? n - Math.max(2, o / 2) - 1 : Math.max(1, o / 2 - 1), Math.max(1, Math.floor(span / (MEN * 3.3))), Math.max(1, Math.floor(o / 3)), who > 0 ? pl.a : pl.b);
        if (mine) {
          const h = inp.inside ? nearest(inp) : -1;
          if (h >= 0) box(g, pts[h][0] - r - 1, pts[h][1] - r - 1, 2 * r + 3, 2 * r + 3, taking ? WHITE : pl.a);
          if (sel >= 0) box(g, pts[sel][0] - r - 2, pts[sel][1] - r - 2, 2 * r + 5, 2 * r + 5, WHITE);
        } else if (inp.inside) { const h = nearest(inp); if (h >= 0) box(g, pts[h][0] - r - 1, pts[h][1] - r - 1, 2 * r + 3, 2 * r + 3, HOVER); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Battleship', seed: 5, sizes: [50, 100], fps: 12,
    interactive: 'Click squares to fire at the hidden fleet yourself.',
    recipe: 'A hidden fleet is hunted on a ten-by-ten grid: shots fall on a checkerboard until one hits, then the hunter works along the line until the ship sinks and is revealed. Misses leave ripples, hits burn, and the game ends when the last ship goes down. Take the guns yourself if you like.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Chart', 'Lines'); g.trait('Wrecks', 'Blocks'); g.trait('Fleet', 'Classic'); g.trait('Sea', 'Dark'); g.trait('Colours', 'Neon, new each game');
        const { n, d } = g, c = Math.floor(n / 10), o = (n - c * 10) >> 1;
        let pl, ship, shot, ships, targets, timer, hold, burn, sunk;
        const reset = () => {
          pl = players(R); ship = new Int8Array(100).fill(-1); shot = new Uint8Array(100); burn = new Float32Array(100); ships = []; targets = []; timer = 0; hold = 0; sunk = new Uint8Array(5);
          for (const [k, len] of [5, 4, 3, 3, 2].entries()) {
            for (;;) {
              const h = R.bool(), x = R.int(0, h ? 10 - len : 9), y = R.int(0, h ? 9 : 10 - len), cells = [];
              for (let s = 0; s < len; s++) cells.push((y + (h ? 0 : s)) * 10 + x + (h ? s : 0));
              if (cells.every(i => ship[i] < 0)) { for (const i of cells) ship[i] = k; ships.push(cells); break; }
            }
          }
        };
        reset();
        const fire = () => {
          let i;
          while (targets.length) { const j = targets.pop(); if (!shot[j]) { i = j; break; } }
          if (i === undefined) { const open = []; for (let k = 0; k < 100; k++) if (!shot[k] && ((k % 10) + ((k / 10) | 0)) % 2 === 0) open.push(k); if (!open.length) for (let k = 0; k < 100; k++) if (!shot[k]) open.push(k); i = R.pick(open); }
          shot[i] = 1; burn[i] = 1;
          if (ship[i] >= 0) {
            const s = ship[i];
            if (ships[s].every(k => shot[k])) { sunk[s] = 1; targets = targets.filter(k => ship[k] !== s || !shot[k]); }
            else { const x = i % 10, y = (i / 10) | 0; for (const [dx, dy] of R.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]])) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < 10 && yy < 10 && !shot[yy * 10 + xx]) targets.push(yy * 10 + xx); } }
          }
          if (sunk.every(Boolean)) hold = 3.5;
        };
        // the viewer's shot at cell i: the same bookkeeping as the hunter's, without its dice
        const shoot = i => {
          shot[i] = 1; burn[i] = 1;
          if (ship[i] >= 0) { const s = ship[i]; if (ships[s].every(k => shot[k])) sunk[s] = 1; }
          if (sunk.every(Boolean)) hold = 3.5;
        };
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (me.on) { for (const tp of taps) { const i = cellAt(tp, n, o, c, 10); if (i >= 0 && !shot[i]) { shoot(i); break; } } }
          else if ((timer += dt) > 0.32) { timer = 0; fire(); }
          d.fill(BLACK);
          const bgc = BLACK;
          for (let k = 0; k <= 10; k++) { X.rect(g, o + k * c, o, 1, c * 10 + 1, pl.ink); X.rect(g, o, o + k * c, c * 10 + 1, 1, pl.ink); }
          for (let i = 0; i < 100; i++) {
            burn[i] *= 0.9;
            const x = o + (i % 10) * c + 1, y = o + ((i / 10) | 0) * c + 1, s = ship[i];
            if (s >= 0 && sunk[s]) slab(g, x, y, c - 1, pl.b);
            else if (shot[i] && s >= 0) { X.rect(g, x, y, c - 1, c - 1, glowPk(pl.a, 0.2 + burn[i] * 0.6)); const q = Math.max(1, (c - 1) >> 2), f = 0.5 + 0.5 * Math.sin(t * 9 + i * 2.3); X.rect(g, x + ((c - 1 - q) >> 1), y + ((c - 1 - q) >> 1) + (f > 0.7 ? 0 : 1), q, q, glowPk(pl.a, 0.55 + 0.4 * f)); }
            else if (shot[i]) { X.disc(g, x + c / 2 - 0.5, y + c / 2 - 0.5, Math.max(0.8, c * 0.12), glowPk(pl.ink, 0.5)); if (burn[i] > 0.2) { const r = Math.min((c - 2) >> 1, Math.round((1 - burn[i]) * c * 0.45)), m = x + ((c - 2) >> 1); if (r > 0) box(g, m - r, y + ((c - 2) >> 1) - r, 2 * r + 1, 2 * r + 1, X.mixPk(bgc, WHITE, burn[i] * 0.7)); } }
          }
          if (inp.inside) { const h = cellAt(inp, n, o, c, 10), k = me.on ? 1 : 0.4; if (h >= 0) { const x = o + (h % 10) * c, y = o + ((h / 10) | 0) * c; box(g, x, y, c + 1, c + 1, dimPk(WHITE, (shot[h] ? 0.3 : 1) * k)); X.rect(g, x + (c >> 1), o, 1, c * 10, dimPk(WHITE, 0.25 * k)); X.rect(g, o, y + (c >> 1), c * 10, 1, dimPk(WHITE, 0.25 * k)); } }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor(n / 10), o = (n - c * 10) >> 1, pace = R.range(0.25, 0.4), fleet = R.pick([[5, 4, 3, 3, 2], [4, 3, 3, 2, 2, 2], [5, 4, 4, 3], [3, 3, 2, 2, 2, 2]]), sea = R.bool(0.4);
      // a variation's own chart (lines, dots or sonar rings), wrecks (blocks or hulls) and colours
      const A = g.alt, chart = g.trait('Chart', A() < 0.5 ? 'Lines' : A() < 0.5 ? 'Dots' : 'Sonar'), hulls = g.trait('Wrecks', A() < 0.5 ? 'Blocks' : 'Hulls') === 'Hulls', fix = skin(A, g);
      g.trait('Fleet', ['Classic', 'Destroyers', 'Heavy', 'Swarm'][[[5, 4, 3, 3, 2], [4, 3, 3, 2, 2, 2], [5, 4, 4, 3], [3, 3, 2, 2, 2, 2]].findIndex(f => f.join() === fleet.join())]); g.trait('Sea', sea ? 'Tinted' : 'Dark');
      let pl, ship, shot, ships, targets, timer, hold, burn, sunk;
      const reset = () => {
        pl = fix(players(R)); ship = new Int8Array(100).fill(-1); shot = new Uint8Array(100); burn = new Float32Array(100); ships = []; targets = []; timer = 0; hold = 0; sunk = new Uint8Array(fleet.length);
        for (const [k, len] of fleet.entries()) {
          for (;;) {
            const h = R.bool(), x = R.int(0, h ? 10 - len : 9), y = R.int(0, h ? 9 : 10 - len), cells = [];
            for (let s = 0; s < len; s++) cells.push((y + (h ? 0 : s)) * 10 + x + (h ? s : 0));
            if (cells.every(i => ship[i] < 0)) { for (const i of cells) ship[i] = k; ships.push(cells); break; }
          }
        }
      };
      reset();
      const fire = i => {
        if (i === undefined) {
          while (targets.length) { const j = targets.pop(); if (!shot[j]) { i = j; break; } }
          if (i === undefined) { const open = []; for (let k = 0; k < 100; k++) if (!shot[k] && ((k % 10) + ((k / 10) | 0)) % 2 === 0) open.push(k); if (!open.length) for (let k = 0; k < 100; k++) if (!shot[k]) open.push(k); i = R.pick(open); }
        }
        shot[i] = 1; burn[i] = 1;
        if (ship[i] >= 0) {
          const s = ship[i];
          if (ships[s].every(k => shot[k])) { sunk[s] = 1; targets = targets.filter(k => ship[k] !== s || !shot[k]); }
          else { const x = i % 10, y = (i / 10) | 0; for (const [dx, dy] of R.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]])) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < 10 && yy < 10 && !shot[yy * 10 + xx]) targets.push(yy * 10 + xx); } }
        }
        if (sunk.every(Boolean)) hold = 3.5;
      };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (me.on) { for (const tp of taps) { const i = cellAt(tp, n, o, c, 10); if (i >= 0 && !shot[i]) { fire(i); break; } } }
        else if ((timer += dt) > pace) { timer = 0; fire(); }
        const bgc = sea ? dimPk(pl.ink, 0.45) : BLACK;
        d.fill(bgc);
        if (chart === 'Sonar') { for (let k = 1; k < 8; k++) ring(g, o + c * 5, o + c * 5, k * c * 0.75, dimPk(pl.ink, 0.75)); X.rect(g, o + c * 5, o, 1, c * 10, dimPk(pl.ink, 0.75)); X.rect(g, o, o + c * 5, c * 10, 1, dimPk(pl.ink, 0.75)); }
        if (chart === 'Dots' || chart === 'Sonar') { for (let y = 0; y <= 10; y++) for (let x = 0; x <= 10; x++) X.put(g, o + x * c, o + y * c, glowPk(pl.ink, 0.25)); }
        else for (let k = 0; k <= 10; k++) { X.rect(g, o + k * c, o, 1, c * 10 + 1, pl.ink); X.rect(g, o, o + k * c, c * 10 + 1, 1, pl.ink); }
        if (hulls) for (let s = 0; s < ships.length; s++) if (sunk[s]) {   // the wreck as one hull with a pointed bow
          const f = Math.min(...ships[s]), l = Math.max(...ships[s]), hz = l - f < 10, x0 = o + (f % 10) * c + 1, y0 = o + ((f / 10) | 0) * c + 1, x1 = o + (l % 10) * c + c, y1 = o + ((l / 10) | 0) * c + c, tp = c * 0.7, col = pl.b;
          if (hz) { const ym = (y0 + y1) / 2; X.poly(g, [x0, ym, x0 + tp, y0, x1 - 1, y0, x1 - 1, y1 - 1, x0 + tp, y1 - 1], col); X.rect(g, x0 + tp, Math.round(ym) - 1, x1 - x0 - tp - 2, 1, glowPk(col, 0.4)); X.rect(g, x0 + tp, y1 - 2, x1 - x0 - tp - 1, 1, dimPk(col, 0.6)); }
          else { const xm = (x0 + x1) / 2; X.poly(g, [xm, y0, x1 - 1, y0 + tp, x1 - 1, y1 - 1, x0, y1 - 1, x0, y0 + tp], col); X.rect(g, Math.round(xm) - 1, y0 + tp, 1, y1 - y0 - tp - 2, glowPk(col, 0.4)); X.rect(g, x1 - 2, y0 + tp, 1, y1 - y0 - tp - 1, dimPk(col, 0.6)); }
        }
        for (let i = 0; i < 100; i++) {
          burn[i] *= 0.9;
          const x = o + (i % 10) * c + 1, y = o + ((i / 10) | 0) * c + 1, s = ship[i];
          if (s >= 0 && sunk[s]) { if (!hulls) slab(g, x, y, c - 1, pl.b); }
          else if (shot[i] && s >= 0) { X.rect(g, x, y, c - 1, c - 1, glowPk(pl.a, 0.2 + burn[i] * 0.6)); const q = Math.max(1, (c - 1) >> 2), f = 0.5 + 0.5 * Math.sin(t * 9 + i * 2.3); X.rect(g, x + ((c - 1 - q) >> 1), y + ((c - 1 - q) >> 1) + (f > 0.7 ? 0 : 1), q, q, glowPk(pl.a, 0.55 + 0.4 * f)); }
          else if (shot[i]) { X.disc(g, x + c / 2 - 0.5, y + c / 2 - 0.5, Math.max(0.8, c * 0.12), glowPk(pl.ink, 0.5)); if (burn[i] > 0.2) { const r = Math.min((c - 2) >> 1, Math.round((1 - burn[i]) * c * 0.45)), m = x + ((c - 2) >> 1); if (r > 0) box(g, m - r, y + ((c - 2) >> 1) - r, 2 * r + 1, 2 * r + 1, X.mixPk(bgc, WHITE, burn[i] * 0.7)); } }
        }
        if (inp.inside) { const h = cellAt(inp, n, o, c, 10), k = me.on ? 1 : 0.4; if (h >= 0) { const x = o + (h % 10) * c, y = o + ((h / 10) | 0) * c; box(g, x, y, c + 1, c + 1, dimPk(WHITE, (shot[h] ? 0.3 : 1) * k)); X.rect(g, x + (c >> 1), o, 1, c * 10, dimPk(WHITE, 0.25 * k)); X.rect(g, o, y + (c >> 1), c * 10, 1, dimPk(WHITE, 0.25 * k)); } }
          me.ping(g);
      };
    },
  });

  add({
    name: 'Ultimate', seed: 4, sizes: [80, 100], fps: 12,
    interactive: 'Click a square in a lit board to play your cross; the machine answers.',
    recipe: 'Ultimate tic-tac-toe, machine against machine or you against one: nine small boards inside one big one, and the square you play in decides which small board your opponent must play next. Won boards fill with their owner’s colour; three of them in a row takes the game.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Marks', 'X and O'); g.trait('Won boards', 'Tinted'); g.trait('Grid', 'Lines'); g.trait('Colours', 'Neon, new each game');
        const { n, d } = g, c = Math.floor((n - 4) / 9), o = (n - c * 9 - 4) >> 1;
        const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let pl, cell, owner, next, turn, timer, hold, last, metaLine;
        const reset = () => { pl = players(R); cell = new Int8Array(81); owner = new Int8Array(9); next = -1; turn = 1; timer = 0; hold = 0; last = -1; metaLine = null; };
        reset();
        const lineOf = (arr, who) => LINES.find(l => l.every(k => arr[k] === who));
        const full = B => { for (let k = 0; k < 9; k++) if (!cell[B * 9 + k]) return false; return true; };
        const open = B => !owner[B] && !full(B);
        const winsSmall = (B, k, who) => { cell[B * 9 + k] = who; const w = !!lineOf(cell.subarray(B * 9, B * 9 + 9), who); cell[B * 9 + k] = 0; return w; };
        const ubx = B => o + (B % 3) * (c * 3 + 2), uby = B => o + ((B / 3) | 0) * (c * 3 + 2);
        const at = p => { for (let B = 0; B < 9; B++) { const x = Math.floor((p.x * n - ubx(B)) / c), y = Math.floor((p.y * n - uby(B)) / c); if (x >= 0 && y >= 0 && x < 3 && y < 3) return [B, y * 3 + x]; } return null; };
        const allowed = () => next >= 0 && open(next) ? [next] : [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(open);
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 1 && !hold;
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (mine && allowed().length) {
            const boards = allowed();
            for (const tp of taps) {
              const p = at(tp);
              if (!p || !boards.includes(p[0]) || cell[p[0] * 9 + p[1]]) continue;
              const [B, k] = p;
              cell[B * 9 + k] = turn; last = B * 9 + k;
              if (!owner[B] && lineOf(cell.subarray(B * 9, B * 9 + 9), turn)) { owner[B] = turn; metaLine = lineOf(owner, turn); if (metaLine) hold = 4; }
              next = k; turn = -turn; timer = 0;
              break;
            }
          }
          else if ((timer += dt) > 0.4) {
            timer = 0;
            const boards = next >= 0 && open(next) ? [next] : [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(open);
            if (!boards.length) { hold = 3; }
            else {
              const ms = []; for (const B of boards) for (let k = 0; k < 9; k++) if (!cell[B * 9 + k]) ms.push([B, k]);
              const [B, k] = best(R, ms, ([B, k]) => (winsSmall(B, k, turn) ? 10 : 0) + (winsSmall(B, k, -turn) ? 6 : 0) - (open(k) && [0, 1, 2, 3, 4, 5, 6, 7, 8].some(q => !cell[k * 9 + q] && winsSmall(k, q, -turn)) ? 4 : 0) + (k === 4 ? 1 : 0) + R() * 2);
              cell[B * 9 + k] = turn; last = B * 9 + k;
              if (!owner[B] && lineOf(cell.subarray(B * 9, B * 9 + 9), turn)) { owner[B] = turn; metaLine = lineOf(owner, turn); if (metaLine) hold = 4; }
              next = k; turn = -turn;
            }
          }
          d.fill(BLACK);
          const bx = B => o + (B % 3) * (c * 3 + 2), by = B => o + ((B / 3) | 0) * (c * 3 + 2);
          const glow = metaLine ? 0.5 + 0.5 * Math.sin(t * 5) : 0;
          for (let B = 0; B < 9; B++) {
            const x0 = bx(B), y0 = by(B);
            if (owner[B]) X.rect(g, x0, y0, c * 3, c * 3, dimPk(owner[B] > 0 ? pl.a : pl.b, metaLine && metaLine.includes(B) ? 0.45 + glow * 0.3 : 0.3));
            else if (hold <= 0 && (next < 0 || !open(next) || next === B) && open(B)) X.rect(g, x0, y0, c * 3, c * 3, dimPk(pl.ink, 0.6));
            for (let k = 1; k < 3; k++) { X.rect(g, x0 + k * c, y0 + 1, 1, c * 3 - 2, pl.ink); X.rect(g, x0 + 1, y0 + k * c, c * 3 - 2, 1, pl.ink); }
            for (let k = 0; k < 9; k++) {
              const v = cell[B * 9 + k]; if (!v) continue;
              const x = x0 + (k % 3) * c, y = y0 + ((k / 3) | 0) * c, col = B * 9 + k === last ? glowPk(v > 0 ? pl.a : pl.b, 0.4) : v > 0 ? pl.a : pl.b, s = c - 4;
              if (v > 0) { X.line(g, x + 2, y + 2, x + 2 + s, y + 2 + s, col); X.line(g, x + 2 + s, y + 2, x + 2, y + 2 + s, col); }
              else ring(g, x + c / 2 + 0.5, y + c / 2 + 0.5, s / 2, col);
            }
          }
          if (inp.inside) { const p = at(inp), on = me.on && turn === 1 && !hold; if (p && (!on || (allowed().includes(p[0]) && !cell[p[0] * 9 + p[1]]))) box(g, ubx(p[0]) + (p[1] % 3) * c, uby(p[0]) + ((p[1] / 3) | 0) * c, c + 1, c + 1, on ? pl.a : HOVER); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor((n - 4) / 9), o = (n - c * 9 - 4) >> 1, pace = R.range(0.3, 0.5), marks0 = R.pick(['xo', 'xo', 'blocks']);
      // a variation's own marks, how a won board shows, the grid and the colours
      const A = g.alt, marks = marks0 === 'blocks' ? 'blocks' : A() < 0.55 ? 'xo' : A() < 0.5 ? 'discs' : 'plus', won = g.trait('Won boards', A() < 0.5 ? 'Tinted' : A() < 0.6 ? 'Big mark' : 'Solid'), grid = g.trait('Grid', A() < 0.65 ? 'Lines' : 'Dots'), fix = skin(A, g);
      g.trait('Marks', { xo: 'X and O', blocks: 'Blocks', discs: 'Discs', plus: 'Plus and diamond' }[marks]);
      const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      let pl, cell, owner, next, turn, timer, hold, last, metaLine;
      const reset = () => { pl = fix(players(R)); cell = new Int8Array(81); owner = new Int8Array(9); next = -1; turn = 1; timer = 0; hold = 0; last = -1; metaLine = null; };
      reset();
      const lineOf = (arr, who) => LINES.find(l => l.every(k => arr[k] === who));
      const full = B => { for (let k = 0; k < 9; k++) if (!cell[B * 9 + k]) return false; return true; };
      const open = B => !owner[B] && !full(B);
      const winsSmall = (B, k, who) => { cell[B * 9 + k] = who; const w = !!lineOf(cell.subarray(B * 9, B * 9 + 9), who); cell[B * 9 + k] = 0; return w; };
      const bx = B => o + (B % 3) * (c * 3 + 2), by = B => o + ((B / 3) | 0) * (c * 3 + 2);
      const at = p => { for (let B = 0; B < 9; B++) { const x = Math.floor((p.x * n - bx(B)) / c), y = Math.floor((p.y * n - by(B)) / c); if (x >= 0 && y >= 0 && x < 3 && y < 3) return [B, y * 3 + x]; } return null; };
      const place = (B, k) => { cell[B * 9 + k] = turn; last = B * 9 + k; if (!owner[B] && lineOf(cell.subarray(B * 9, B * 9 + 9), turn)) { owner[B] = turn; metaLine = lineOf(owner, turn); if (metaLine) hold = 4; } next = k; turn = -turn; };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const boards = hold > 0 ? [] : next >= 0 && open(next) ? [next] : [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(open);
        const mine = me.on && turn === 1 && !hold;
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (!boards.length) hold = 3;
        else if (mine) { for (const tp of taps) { const p = at(tp); if (p && boards.includes(p[0]) && !cell[p[0] * 9 + p[1]]) { place(p[0], p[1]); timer = 0; break; } } }
        else if ((timer += dt) > pace) {
          timer = 0;
          const ms = []; for (const B of boards) for (let k = 0; k < 9; k++) if (!cell[B * 9 + k]) ms.push([B, k]);
          const [B, k] = best(R, ms, ([B, k]) => (winsSmall(B, k, turn) ? 10 : 0) + (winsSmall(B, k, -turn) ? 6 : 0) - (open(k) && [0, 1, 2, 3, 4, 5, 6, 7, 8].some(q => !cell[k * 9 + q] && winsSmall(k, q, -turn)) ? 4 : 0) + (k === 4 ? 1 : 0) + R() * 2);
          place(B, k);
        }
        d.fill(BLACK);
        const glow = metaLine ? 0.5 + 0.5 * Math.sin(t * 5) : 0;
        for (let B = 0; B < 9; B++) {
          const x0 = bx(B), y0 = by(B);
          const ownCol = owner[B] ? (owner[B] > 0 ? pl.a : pl.b) : 0, lit = metaLine && metaLine.includes(B);
          if (owner[B]) X.rect(g, x0, y0, c * 3, c * 3, dimPk(ownCol, (lit ? 0.45 + glow * 0.3 : 0.3) * (won === 'Solid' ? 2.2 : 1)));
          else if (hold <= 0 && boards.includes(B)) X.rect(g, x0, y0, c * 3, c * 3, dimPk(pl.ink, mine ? 1 : 0.6));
          if (owner[B] && won === 'Solid') continue;
          if (grid === 'Dots') { for (let k = 1; k < 3; k++) for (let q = 1; q < 3; q++) X.put(g, x0 + k * c, y0 + q * c, glowPk(pl.ink, 0.3)); }
          else for (let k = 1; k < 3; k++) { X.rect(g, x0 + k * c, y0 + 1, 1, c * 3 - 2, pl.ink); X.rect(g, x0 + 1, y0 + k * c, c * 3 - 2, 1, pl.ink); }
          for (let k = 0; k < 9; k++) {
            const v = cell[B * 9 + k]; if (!v) continue;
            const x = x0 + (k % 3) * c, y = y0 + ((k / 3) | 0) * c, col0 = B * 9 + k === last ? glowPk(v > 0 ? pl.a : pl.b, 0.4) : v > 0 ? pl.a : pl.b, col = owner[B] && won === 'Big mark' ? dimPk(col0, 0.45) : col0, s = c - 4;
            if (marks === 'blocks') X.rect(g, x + 2, y + 2, s + 1, s + 1, col);
            else if (marks === 'discs') ball(g, x + c / 2 + 0.5, y + c / 2 + 0.5, s / 2 + 0.6, s / 2 + 0.6, col);
            else if (marks === 'plus') { if (v > 0) { X.rect(g, x + 2, y + (c >> 1), s + 1, 1, col); X.rect(g, x + (c >> 1), y + 2, 1, s + 1, col); } else { const m = c >> 1, r = s >> 1; X.line(g, x + m, y + m - r, x + m + r, y + m, col); X.line(g, x + m + r, y + m, x + m, y + m + r, col); X.line(g, x + m, y + m + r, x + m - r, y + m, col); X.line(g, x + m - r, y + m, x + m, y + m - r, col); } }
            else if (v > 0) { X.line(g, x + 2, y + 2, x + 2 + s, y + 2 + s, col); X.line(g, x + 2 + s, y + 2, x + 2, y + 2 + s, col); }
            else ring(g, x + c / 2 + 0.5, y + c / 2 + 0.5, s / 2, col);
          }
          if (owner[B] && won === 'Big mark') {   // one large mark across the whole board
            const S3 = c * 3 - 6, col = lit ? glowPk(ownCol, glow * 0.5) : ownCol;
            if (owner[B] > 0) for (let w = 0; w < 2; w++) { X.line(g, x0 + 3 + w, y0 + 3, x0 + 3 + S3 + w, y0 + 3 + S3, col); X.line(g, x0 + 3 + S3 - w, y0 + 3, x0 + 3 - w, y0 + 3 + S3, col); }
            else { ring(g, x0 + c * 1.5, y0 + c * 1.5, S3 / 2, col); ring(g, x0 + c * 1.5, y0 + c * 1.5, S3 / 2 - 1, col); }
          }
        }
        if (inp.inside) { const p = at(inp); if (p && (!mine || (boards.includes(p[0]) && !cell[p[0] * 9 + p[1]]))) box(g, bx(p[0]) + (p[1] % 3) * c, by(p[0]) + ((p[1] / 3) | 0) * c, c + 1, c + 1, mine ? pl.a : HOVER); }
        me.ping(g);
      };
    },
  });

  add({
    name: 'Halma', seed: 4, sizes: [100], fps: 12,
    interactive: 'Click one of the first army’s pieces, then where it should step or hop to; the other three armies answer.',
    recipe: 'Four armies of Halma pieces race across a sixteen-square board to the opposite corners, and you can lead one of them. A piece may step one square or chain hops over any pieces in its way, so lanes of hoppers open and close as the armies pass through each other.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        g.trait('Board', 16); g.trait('Armies', 4); g.trait('Board marks', 'Dots'); g.trait('Men', 'Round'); g.trait('Colours', 'New each race');
        const { n, d } = g, L = 16, c = Math.floor(n / L), o = (n - c * L) >> 1;
        const camp = (cx, cy) => { const out = []; for (let y = 0; y < L; y++) for (let x = 0; x < L; x++) { const dx = cx ? L - 1 - x : x, dy = cy ? L - 1 - y : y; if (dx + dy <= 4 && !(dx === 4 && dy === 0) && !(dx === 0 && dy === 4)) out.push(y * L + x); } return out; };
        const corners = [[0, 0], [1, 1], [1, 0], [0, 1]];
        let b, cols, goal, turn, timer, moves, anim, hold, ink, skips;
        const reset = () => {
          const h = R.range(0, 100); cols = [0, 1, 2, 3].map(k => X.hsbPk(h + k * 25, R.bool(0.5) ? 100 : 85, 100)); ink = X.hsbPk(h + 60, 40, 30);
          b = new Int8Array(L * L).fill(-1); goal = [];
          corners.forEach(([cx, cy], k) => { for (const i of camp(cx, cy)) b[i] = k; goal.push([cx ? 0 : L - 1, cy ? 0 : L - 1]); });
          turn = 0; timer = 0; moves = 0; anim = null; hold = 0; skips = 0;
        };
        reset();
        const dist = (i, k) => { const [gx, gy] = goal[k]; return Math.max(Math.abs(i % L - gx), Math.abs(((i / L) | 0) - gy)) + 0.3 * Math.hypot(i % L - gx, ((i / L) | 0) - gy); };
        const reach = i => {   // every square a piece can end on: one step, or any chain of hops
          const out = new Map(), x = i % L, y = (i / L) | 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if ((dx || dy) && xx >= 0 && yy >= 0 && xx < L && yy < L && b[yy * L + xx] < 0) out.set(yy * L + xx, [i, yy * L + xx]); }
          const q = [[i, [i]]], seen = new Set([i]);
          while (q.length) {
            const [j, path] = q.shift(), jx = j % L, jy = (j / L) | 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue; const mx = jx + dx, my = jy + dy, tx = jx + 2 * dx, ty = jy + 2 * dy;
              if (tx < 0 || ty < 0 || tx >= L || ty >= L) continue; const to = ty * L + tx;
              if (b[my * L + mx] >= 0 && b[to] < 0 && !seen.has(to)) { seen.add(to); const p2 = path.concat(to); out.set(to, p2); q.push([to, p2]); }
            }
          }
          return out;
        };
        let sel = -1, sReach = null;
        const me = seat(), inp = g.input;
        return (t, dt) => {
          const taps = inp.taps(); me.tick(dt, taps);
          const mine = me.on && turn === 0 && !hold && !anim;
          if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
          else if (mine) {
            for (const tp of taps) {
              const i = cellAt(tp, n, o, c, L); if (i < 0) continue;
              if (b[i] === 0) { sel = i; sReach = reach(i); continue; }
              if (sel >= 0 && sReach && sReach.has(i)) { const path = sReach.get(i); anim = { path, p: 0, k: 0 }; b[path[0]] = -1; sel = -1; sReach = null; skips = 0; break; }
            }
          }
          else if (anim) {
            anim.k += dt * 6;
            if (anim.k >= anim.path.length - 1) { b[anim.path[anim.path.length - 1]] = anim.p; anim = null; turn = (turn + 1) % 4; moves++; }
          } else if ((timer += dt) > 0.12) {
            timer = 0;
            let bestMove = null, bestGain = -Infinity;
            for (let i = 0; i < L * L; i++) if (b[i] === turn) for (const [to, path] of reach(i)) { const gain = dist(i, turn) - dist(to, turn) + R() * 0.4; if (gain > bestGain) { bestGain = gain; bestMove = path; } }
            // an army with no move that gains ground passes; when all four pass in a row the race is over
            if (!bestMove || bestGain <= 0.05) { turn = (turn + 1) % 4; if (++skips >= 4 || moves > 600) hold = 2.5; }
            else { skips = 0; anim = { path: bestMove, p: turn, k: 0 }; b[bestMove[0]] = -1; }
          }
          d.fill(BLACK);
          for (let i = 0; i < L * L; i++) { const x = o + (i % L) * c, y = o + ((i / L) | 0) * c; X.rect(g, x + c / 2 - 0.5 | 0, y + c / 2 - 0.5 | 0, 1, 1, ink); }
          corners.forEach(([cx, cy], k) => { for (const i of camp(cx, cy)) { const x = o + (i % L) * c, y = o + ((i / L) | 0) * c; X.rect(g, x, y, c, c, dimPk(cols[k ^ 1], 0.18)); } });   // each corner tinted for the army heading there
          for (let i = 0; i < L * L; i++) if (b[i] >= 0) ball(g, o + (i % L) * c + c / 2 + 0.5, o + ((i / L) | 0) * c + c / 2 + 0.5, c * 0.4, c * 0.4, cols[b[i]]);
          if (anim) {
            const k = Math.min(anim.k, anim.path.length - 1.0001), s = Math.floor(k), f = k - s, a = anim.path[s], z = anim.path[s + 1];
            const x = o + (a % L + (z % L - a % L) * f) * c + c / 2 + 0.5, y = o + (((a / L) | 0) + (((z / L) | 0) - ((a / L) | 0)) * f) * c + c / 2 + 0.5 - Math.sin(f * Math.PI) * c * 0.5;
            ball(g, x, y, c * 0.45, c * 0.45, glowPk(cols[anim.p], 0.35));
          }
          if (me.on && turn === 0 && !hold && !anim) {
            if (sel >= 0) { box(g, o + (sel % L) * c, o + ((sel / L) | 0) * c, c + 1, c + 1, WHITE); for (const to of sReach.keys()) box(g, o + (to % L) * c, o + ((to / L) | 0) * c, c + 1, c + 1, dimPk(cols[0], 0.8)); }
            else for (let i = 0; i < L * L; i++) if (b[i] === 0) box(g, o + (i % L) * c, o + ((i / L) | 0) * c, c + 1, c + 1, dimPk(cols[0], 0.5));
          } else if (inp.inside) { const h = cellAt(inp, n, o, c, L); if (h >= 0) box(g, o + (h % L) * c, o + ((h / L) | 0) * c, c + 1, c + 1, HOVER); }
          me.ping(g);
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);
      // a variation's own board size, number of armies, board marks and men
      const A = g.alt, L = +g.trait('Board', A() < 0.6 ? 16 : A() < 0.6 ? 12 : 10), ARM = +g.trait('Armies', A() < 0.6 ? 4 : 2), marksStyle = g.trait('Board marks', A() < 0.5 ? 'Dots' : A() < 0.5 ? 'Grid' : 'Checker');
      const { n, d } = g, inp = g.input, me = seat(), c = Math.floor(n / L), o = (n - c * L) >> 1, pace = R.range(0.08, 0.16), rad = R.pick([0.36, 0.42]), squareMen = R.bool(0.35);
      const menShape = g.trait('Men', squareMen ? 'Square' : A() < 0.6 ? 'Round' : A() < 0.5 ? 'Gem' : 'Ring');
      const D = (L === 16 ? 4 : 3) + (ARM === 2 ? 1 : 0);
      const camp = (cx, cy) => { const out = []; for (let y = 0; y < L; y++) for (let x = 0; x < L; x++) { const dx = cx ? L - 1 - x : x, dy = cy ? L - 1 - y : y; if (dx + dy <= D && !(dx === D && dy === 0) && !(dx === 0 && dy === D)) out.push(y * L + x); } return out; };
      const corners = [[0, 0], [1, 1], [1, 0], [0, 1]].slice(0, ARM);
      let b, cols, goal, turn, timer, moves, anim, hold, ink, skips, sel = -1, sReach = null, named = false;
      const reset = () => {
        const h = R.range(0, 100), spread = R.pick([25, 18, 32]); cols = [0, 1, 2, 3].map(k => X.hsbPk(h + k * (ARM === 2 ? 50 : spread), R.bool(0.5) ? 100 : 85, 100)); ink = X.hsbPk(h + 60, 40, 30);
        if (!named) { named = true; g.trait('Colours', ARM === 2 ? hueName(h) + ' and ' + hueName(h + 50) : hueName(h) + (spread === 18 ? ', close' : spread === 32 ? ', wide' : ', even')); }
        b = new Int8Array(L * L).fill(-1); goal = [];
        corners.forEach(([cx, cy], k) => { for (const i of camp(cx, cy)) b[i] = k; goal.push([cx ? 0 : L - 1, cy ? 0 : L - 1]); });
        turn = 0; timer = 0; moves = 0; anim = null; hold = 0; skips = 0; sel = -1; sReach = null;
      };
      reset();
      const dist = (i, k) => { const [gx, gy] = goal[k]; return Math.max(Math.abs(i % L - gx), Math.abs(((i / L) | 0) - gy)) + 0.3 * Math.hypot(i % L - gx, ((i / L) | 0) - gy); };
      const reach = i => {   // every square a piece can end on: one step, or any chain of hops
        const out = new Map(), x = i % L, y = (i / L) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if ((dx || dy) && xx >= 0 && yy >= 0 && xx < L && yy < L && b[yy * L + xx] < 0) out.set(yy * L + xx, [i, yy * L + xx]); }
        const q = [[i, [i]]], seen = new Set([i]);
        while (q.length) {
          const [j, path] = q.shift(), jx = j % L, jy = (j / L) | 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue; const mx = jx + dx, my = jy + dy, tx = jx + 2 * dx, ty = jy + 2 * dy;
            if (tx < 0 || ty < 0 || tx >= L || ty >= L) continue; const to = ty * L + tx;
            if (b[my * L + mx] >= 0 && b[to] < 0 && !seen.has(to)) { seen.add(to); const p2 = path.concat(to); out.set(to, p2); q.push([to, p2]); }
          }
        }
        return out;
      };
      return (t, dt) => {
        const taps = inp.taps(); me.tick(dt, taps);
        const mine = me.on && turn === 0 && !hold && !anim;
        if (hold > 0) { if ((hold -= dt) <= 0) reset(); }
        else if (anim) {
          anim.k += dt * 6;
          if (anim.k >= anim.path.length - 1) { b[anim.path[anim.path.length - 1]] = anim.p; anim = null; turn = (turn + 1) % ARM; moves++; }
        } else if (mine) {
          for (const tp of taps) {
            const i = cellAt(tp, n, o, c, L); if (i < 0) continue;
            if (b[i] === 0) { sel = i; sReach = reach(i); continue; }
            if (sel >= 0 && sReach && sReach.has(i)) { const path = sReach.get(i); anim = { path, p: 0, k: 0 }; b[path[0]] = -1; sel = -1; sReach = null; skips = 0; break; }
          }
        } else if ((timer += dt) > pace) {
          timer = 0;
          let bestMove = null, bestGain = -Infinity;
          for (let i = 0; i < L * L; i++) if (b[i] === turn) for (const [to, path] of reach(i)) { const gain = dist(i, turn) - dist(to, turn) + R() * 0.4; if (gain > bestGain) { bestGain = gain; bestMove = path; } }
          // an army with no move that gains ground passes; when all of them pass in a row the race is over
          if (!bestMove || bestGain <= 0.05) { turn = (turn + 1) % ARM; if (++skips >= ARM || moves > 600) hold = 2.5; }
          else { skips = 0; anim = { path: bestMove, p: turn, k: 0 }; b[bestMove[0]] = -1; }
        }
        d.fill(BLACK);
        const man = (x, y, r, col) => { if (menShape !== 'Square') return piece(g, menShape, x, y, r, r, col); const x0 = Math.round(x - r), y0 = Math.round(y - r); slab(g, x0, y0, Math.round(x - r + 2 * r) - x0, col); };
        if (marksStyle === 'Checker') { for (let i = 0; i < L * L; i++) if (((i % L) + ((i / L) | 0)) & 1) X.rect(g, o + (i % L) * c, o + ((i / L) | 0) * c, c, c, dimPk(ink, 0.45)); }
        else if (marksStyle === 'Grid') { for (let k = 0; k <= L; k++) { X.rect(g, o + k * c, o, 1, c * L + 1, dimPk(ink, 0.8)); X.rect(g, o, o + k * c, c * L + 1, 1, dimPk(ink, 0.8)); } }
        else for (let i = 0; i < L * L; i++) { const x = o + (i % L) * c, y = o + ((i / L) | 0) * c; X.rect(g, x + c / 2 - 0.5 | 0, y + c / 2 - 0.5 | 0, 1, 1, ink); }
        corners.forEach(([cx, cy], k) => { for (const i of camp(cx, cy)) { const x = o + (i % L) * c, y = o + ((i / L) | 0) * c; X.rect(g, x + (marksStyle === 'Grid' ? 1 : 0), y + (marksStyle === 'Grid' ? 1 : 0), c - (marksStyle === 'Grid' ? 1 : 0), c - (marksStyle === 'Grid' ? 1 : 0), dimPk(cols[k ^ 1], 0.18)); } });   // each corner tinted for the army heading there
        for (let i = 0; i < L * L; i++) if (b[i] >= 0) man(o + (i % L) * c + c / 2 + 0.5, o + ((i / L) | 0) * c + c / 2 + 0.5, c * rad, cols[b[i]]);
        if (anim) {
          const k = Math.min(anim.k, anim.path.length - 1.0001), s = Math.floor(k), f = k - s, a = anim.path[s], z = anim.path[s + 1];
          const x = o + (a % L + (z % L - a % L) * f) * c + c / 2 + 0.5, y = o + (((a / L) | 0) + (((z / L) | 0) - ((a / L) | 0)) * f) * c + c / 2 + 0.5 - Math.sin(f * Math.PI) * c * 0.5;
          man(x, y, c * 0.45, glowPk(cols[anim.p], 0.35));
        }
        if (mine) {
          if (sel >= 0) { box(g, o + (sel % L) * c, o + ((sel / L) | 0) * c, c + 1, c + 1, WHITE); for (const to of sReach.keys()) box(g, o + (to % L) * c, o + ((to / L) | 0) * c, c + 1, c + 1, dimPk(cols[0], 0.8)); }
          else for (let i = 0; i < L * L; i++) if (b[i] === 0) box(g, o + (i % L) * c, o + ((i / L) | 0) * c, c + 1, c + 1, dimPk(cols[0], 0.5));
        } else if (inp.inside) { const h = cellAt(inp, n, o, c, L); if (h >= 0) box(g, o + (h % L) * c, o + ((h / L) | 0) * c, c + 1, c + 1, HOVER); }
        me.ping(g);
      };
    },
  });
})();
