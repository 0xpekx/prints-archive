// Set 3 · Tabletop: board, card and tile games that play themselves, in pixels,
// and that the viewer can take over in the large view.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Tabletop' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  const spr = rows => rows.map(r => Uint8Array.from(r, ch => ch === '#' ? 1 : ch === 'o' ? 2 : ch === '+' ? 3 : 0));
  const rgbA = a => X.rgb(a[0], a[1], a[2]);

  // The viewer's hand: taps this frame, press and release edges, and whether
  // they have touched the piece recently (the machine waits while they do).
  function hand(g, hold = 10) {
    let t = 0, last = -1e9, was = false;
    const h = { taps: [], pressed: false, released: false, get active() { return t - last < hold; } };
    h.step = dt => {
      t += dt;
      const inp = g.input;
      h.taps = inp.taps();
      if (h.taps.length || inp.down) last = t;
      h.pressed = inp.down && !was; h.released = !inp.down && was; was = inp.down;
      return h;
    };
    return h;
  }

  // ---------- traits: what a variation rolled, named for the viewer ----------
  const palName = sc => sc.native ? 'Spectrum' : sc.name;
  const roll = (g, vals, w) => { if (g.home) return vals[0]; let u = g.alt() * (w ? w.reduce((a, b) => a + b, 0) : vals.length); for (let i = 0; i < vals.length; i++) { u -= w ? w[i] : 1; if (u < 0) return vals[i]; } return vals[vals.length - 1]; };
  const named = (list, names, v) => names[list.findIndex(c => rgbA(c) === v)] || names[0];

  // ---------- pictures for the puzzles: small pixel scenes ----------
  const SCENES = [
    ['#0b1d51', '#5c2a9d', '#d94f8a', '#ff9a5a', '#ffd166', '#16324f', '#0a1931'],   // dusk
    ['#3a86ff', '#6fb1ff', '#bde0fe', '#ffffff', '#ffe066', '#2d6a4f', '#1b4332'],   // day
    ['#03045e', '#023e8a', '#0077b6', '#90e0ef', '#f1faee', '#14213d', '#000814'],   // night
    ['#9d0208', '#dc2f02', '#f48c06', '#ffba08', '#fff3b0', '#6a040f', '#370617'],   // desert
    ['#1a1a2e', '#16213e', '#e94560', '#f9ed69', '#08d9d6', '#252a34', '#0f0e17'],   // neon
    ['#264653', '#2a9d8f', '#8ab17d', '#e9c46a', '#f4a261', '#e76f51', '#1d3557'],   // earth
  ].map(s => s.map(c => U.pk(U.hex(c))));
  // picture() with its scene and subject named as traits (R is wrapped only to watch its first two picks)
  function pictureT(R, n, g) {
    const seen = [];
    const R2 = Object.assign(() => R(), R, { pick: a => { const v = R.pick(a); if (seen.length < 2) seen.push(v); return v; } });
    const out = picture(R2, n);
    g.trait('Picture', { land: 'Landscape', synth: 'Synthwave', blocks: 'Blocks', creature: 'Creature', rays: 'Sunburst' }[seen[1]] || 'Landscape');
    g.trait('Colours', ['Dusk', 'Day', 'Night', 'Desert', 'Neon', 'Earth'][SCENES.indexOf(seen[0])] || 'Dusk');
    return out;
  }
  function picture(R, n) {
    const out = new Uint32Array(n * n), P7 = R.pick(SCENES), kind = R.pick(['land', 'land', 'synth', 'blocks', 'creature', 'rays']);
    const set = (x, y, c) => { if (x >= 0 && y >= 0 && x < n && y < n) out[y * n + x] = c; };
    if (kind === 'land' || kind === 'synth') {
      const hz = Math.round(n * R.range(0.5, 0.65));
      for (let y = 0; y < hz; y++) {   // sky in flat bands, dithered at each seam
        const u = y / hz * 3.999, b = Math.floor(u), f = u - b;
        for (let x = 0; x < n; x++) out[y * n + x] = P7[Math.min(4, b + (f > X.dith4(x, y) * 1.0 + 0.0 ? 1 : 0))];
      }
      const sx = Math.round(n * R.range(0.25, 0.75)), sr = n * R.range(0.12, 0.2), sy = hz - sr * R.range(0.1, 0.9);
      for (let y = 0; y < hz; y++) for (let x = 0; x < n; x++) {
        const dd = Math.hypot(x + 0.5 - sx, y + 0.5 - sy);
        if (dd < sr && !(kind === 'synth' && y > sy && ((y - Math.round(sy)) % 3 === 0))) out[y * n + x] = dd < sr * 0.7 ? P7[4] : P7[3];
      }
      if (kind === 'synth') for (let k = 0; k < n / 3; k++) set(R.int(0, n - 1), R.int(0, hz * 0.5), WHITE);
      const nz = U.noise(R), ranges = R.int(2, 3);
      for (let r = 0; r < ranges; r++) {
        const col = X.mixPk(P7[5], P7[6], r / ranges), base = hz - n * (0.05 + 0.18 * (ranges - r) / ranges), amp = n * R.range(0.06, 0.14);
        for (let x = 0; x < n; x++) { const top = Math.round(base - Math.abs(nz.fbm(x / n * (2 + r), r * 7, 0, 3)) * amp * 2.2); for (let y = top; y < hz; y++) set(x, y, col); }
      }
      for (let y = hz; y < n; y++) for (let x = 0; x < n; x++) {
        if (kind === 'synth') { const dz = y - hz + 1, line = (n - 1 - y) % Math.max(2, Math.round(dz / 3)) === 0 || Math.abs(((x - n / 2) * 6 / dz) % 3) < 0.25; out[y * n + x] = line ? P7[2] : P7[6]; }
        else { const my = 2 * hz - y - 1, src = my >= 0 ? out[my * n + x] : P7[0]; out[y * n + x] = (y + x * 0) % 3 === 0 && R() < 0.5 ? X.shade(src, 1.25) : X.shade(src, 0.62); }
      }
    } else if (kind === 'blocks') {
      const cells = [[0, 0, n, n]], fills = [P7[1], P7[2], P7[3], P7[4], P7[0], WHITE, WHITE];
      for (let k = 0; k < 9; k++) {
        const i = R.int(0, cells.length - 1), [x, y, w, h] = cells[i];
        if (w < 8 || h < 8) continue;
        cells.splice(i, 1);
        if (w > h ? R.bool(0.8) : R.bool(0.2)) { const c = Math.round(w * R.range(0.3, 0.7)); cells.push([x, y, c, h], [x + c, y, w - c, h]); }
        else { const c = Math.round(h * R.range(0.3, 0.7)); cells.push([x, y, w, c], [x, y + c, w, h - c]); }
      }
      for (const [x, y, w, h] of cells) { const c = R.pick(fills); for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) set(xx, yy, xx === x || yy === y ? P7[6] : c); }
    } else if (kind === 'creature') {
      const ga = P7[R.int(2, 4)], gb = X.shade(ga, 0.8), sq = Math.max(2, Math.round(n / 10));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) out[y * n + x] = ((x / sq | 0) + (y / sq | 0)) & 1 ? ga : gb;
      const s = X.outline(X.mirrorSprite(R, 9, 9, 0.6, 0.25)), k = Math.max(1, Math.floor(n * 0.8 / s.length)), o = Math.round((n - s.length * k) / 2);
      const cols = [0, P7[R.pick([0, 1, 5])], P7[R.pick([2, 3, 4])], , , , , , , P7[6]];
      for (let r = 0; r < s.length; r++) for (let q = 0; q < s[0].length; q++) { const v = s[r][q]; if (v && cols[v] !== undefined) for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) set(o + q * k + b, o + r * k + a, cols[v]); }
    } else {
      const cx = n * R.range(0.35, 0.65), cy = n * R.range(0.35, 0.65), rays = R.pick([12, 16, 20]);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const a = Math.atan2(y - cy, x - cx), r = Math.hypot(x - cx, y - cy);
        out[y * n + x] = r < n * 0.12 ? P7[4] : r < n * 0.16 ? P7[3] : Math.floor((a / TAU + 1) * rays) & 1 ? P7[1] : P7[2 + (Math.floor(r / (n * 0.12)) & 1)];
      }
    }
    return out;
  }

  // ---------- chess ----------
  const PIECES = {
    p: spr(['........', '...##...', '..####..', '...##...', '..####..', '..####..', '.######.', '........']),
    n: spr(['........', '..###...', '.#####..', '.##.###.', '....###.', '...####.', '.######.', '........']),
    b: spr(['...#....', '..###...', '..#.##..', '..####..', '...##...', '..####..', '.######.', '........']),
    r: spr(['........', '.#.##.#.', '.######.', '..####..', '..####..', '..####..', '.######.', '........']),
    q: spr(['.#.#.#..', '.#.#.#..', '.######.', '..####..', '..####..', '..####..', '.######.', '........']),
    k: spr(['...#....', '..###...', '...#....', '.#####..', '..###...', '..###...', '.#####..', '........']),
  };
  // Chess: how far the game has got when the piece opens (a few dozen greedy moves are played at once)
  const chessStage = g => ({ Opening: 0, Middlegame: 60, Endgame: 130 })[g.trait('Stage', roll(g, ['Opening', 'Middlegame', 'Endgame'], [2, 2, 2]))];
  const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
  const BOARDS = [
    [[240, 217, 181], [181, 136, 99]], [[238, 238, 210], [118, 150, 86]], [[222, 227, 230], [140, 162, 173]],
    [[255, 206, 158], [209, 139, 71]], [[230, 220, 240], [130, 100, 170]], [[40, 40, 52], [12, 12, 18]],
  ];
  add({
    name: 'Chess', sizes: [80], fps: 12,
    interactive: 'Play white: click a piece, then a square. The machine answers as black.',
    recipe: 'Two greedy players who take whatever is worth most and otherwise wander, on boards and armies that change with every game; click a piece and a square to take white yourself, and the machine plays black.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, s = 10, sc = U.scheme(R, 0.4), light = U.pk(U.mix(sc.cols[0], [238, 232, 218], 0.76)), dark = U.pk(U.mix(U.mix(sc.cols[1 % sc.cols.length], [140, 104, 80], 0.6), [40, 40, 50], 0.25));   // the scheme's hue, quietened toward wood
      const side = [X.rgb(245, 240, 228), X.rgb(30, 26, 34)], rim = [X.rgb(60, 50, 50), X.rgb(200, 190, 180)];
      let board, turn, moving, moves, pause;
      const setup = () => {
        board = new Array(64).fill(null); const back = 'rnbqkbnr';
        for (let x = 0; x < 8; x++) { board[x] = { t: back[x], c: 1 }; board[8 + x] = { t: 'p', c: 1 }; board[48 + x] = { t: 'p', c: 0 }; board[56 + x] = { t: back[x], c: 0 }; }
        turn = 0; moving = null; moves = 0; pause = 1;
      };
      const gen = c => {
        const out = [], at = (x, y) => x >= 0 && y >= 0 && x < 8 && y < 8 ? board[y * 8 + x] : undefined;
        for (let i = 0; i < 64; i++) {
          const p = board[i]; if (!p || p.c !== c) continue;
          const x = i % 8, y = i >> 3, push = (tx, ty) => { const q = at(tx, ty); if (q === undefined || (q && q.c === c)) return false; out.push([i, ty * 8 + tx, q ? VAL[q.t] : 0]); return !q; };
          if (p.t === 'p') {
            const dy = c ? 1 : -1;
            if (at(x, y + dy) === null) { out.push([i, (y + dy) * 8 + x, 0.1]); if ((c ? y === 1 : y === 6) && at(x, y + 2 * dy) === null) out.push([i, (y + 2 * dy) * 8 + x, 0.2]); }
            for (const dx of [-1, 1]) { const q = at(x + dx, y + dy); if (q && q.c !== c) out.push([i, (y + dy) * 8 + x + dx, VAL[q.t]]); }
          } else if (p.t === 'n') { for (const [a, b] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) push(x + a, y + b); }
          else if (p.t === 'k') { for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) push(x + a, y + b); }
          else {
            const dirs = p.t === 'r' ? [[1, 0], [-1, 0], [0, 1], [0, -1]] : p.t === 'b' ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
            for (const [a, b] of dirs) for (let k = 1; k < 8; k++) if (!push(x + a * k, y + b * k)) break;
          }
        }
        return out;
      };
      setup();
      let lastTap = -1e9, clock = 0;   // the viewer's hand: the machine waits on their side while they play
      let sel = -1, legal = [];
      g.trait('Board', palName(sc)); g.trait('Pieces', 'Ivory and ebony'); g.trait('Players', 'Greedy');
      const warm = chessStage(g);
      return function frame(t, dt) {
        if (!frame.w) { frame.w = 1; for (let k = 0; k < warm; k++) frame(t, 0.4); }
        clock += dt;
        const taps = g.input.taps(); if (taps.length) lastTap = clock;
        const human = clock - lastTap < 8;
        for (const tp of taps) {
          if (moving || turn !== 0 || pause > 0.2) break;
          const sq = Math.min(7, tp.y * 8 | 0) * 8 + Math.min(7, tp.x * 8 | 0), hit = legal.find(m => m[1] === sq);
          if (hit) { moving = { from: hit[0], to: hit[1], u: 0, p: board[hit[0]] }; board[hit[0]] = null; sel = -1; legal = []; }
          else if (board[sq] && board[sq].c === 0) { sel = sq; legal = gen(0).filter(m => m[0] === sq); }
          else { sel = -1; legal = []; }
        }
        if (pause > 0) pause -= dt;
        else if (!moving && !(turn === 0 && human)) {
          const ms = gen(turn);
          if (!ms.length || moves > 120) { setup(); }
          else {
            const best = Math.max(...ms.map(m => m[2])), pool = best >= 1 && R.bool(0.85) ? ms.filter(m => m[2] === best) : ms;
            const m = R.pick(pool); moving = { from: m[0], to: m[1], u: 0, p: board[m[0]] }; board[m[0]] = null;
          }
        } else if (moving) {
          moving.u += dt * 3;
          if (moving.u >= 1) {
            const cap = board[moving.to]; board[moving.to] = moving.p;
            if (moving.p.t === 'p' && (moving.to >> 3 === 0 || moving.to >> 3 === 7)) moving.p.t = 'q';
            moving = null; turn ^= 1; moves++; pause = 0.15;
            if (cap && cap.t === 'k') pause = 3, moves = 999;
          }
        }
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) X.rect(g, x * s, y * s, s, s, (x + y) & 1 ? dark : light);
        if (sel >= 0) X.rect(g, (sel % 8) * s, (sel >> 3) * s, s, s, X.mixPk((((sel % 8) + (sel >> 3)) & 1) ? dark : light, X.rgb(120, 220, 255), 0.6));
        for (const m of legal) X.rect(g, (m[1] % 8) * s + 4, (m[1] >> 3) * s + 4, 2, 2, board[m[1]] ? X.rgb(230, 70, 60) : X.rgb(90, 180, 220));
        const draw = (p, px, py) => { X.stamp(g, X.outline(PIECES[p.t]), Math.round(px), Math.round(py), [0, side[p.c], side[p.c], , , , , , , rim[p.c]]); };
        for (let i = 0; i < 64; i++) if (board[i]) draw(board[i], (i % 8) * s, (i >> 3) * s);
        if (moving) {
          const e = U.smooth(Math.min(1, moving.u)), fx = moving.from % 8, fy = moving.from >> 3, tx = moving.to % 8, ty = moving.to >> 3;
          X.rect(g, fx * s, fy * s, s, 1, sc.native ? WHITE : U.pk(sc.cols[2 % sc.cols.length])); X.rect(g, tx * s, ty * s + s - 1, s, 1, sc.native ? WHITE : U.pk(sc.cols[2 % sc.cols.length]));
          draw(moving.p, (fx + (tx - fx) * e) * s, (fy + (ty - fy) * e) * s - Math.sin(e * Math.PI) * 3);
        }
      };
    }, function alt(R, U, g) {
      const { d } = g, s = 10, me = hand(g, 8);
      const style = R.int(0, BOARDS.length - 1), neon = style === BOARDS.length - 1, [lc, dc] = BOARDS[style];
      const light = rgbA(lc), dark = rgbA(dc), grain = R.bool(0.35) && !neon;
      const sc = U.scheme(R, 0.5), armies = R.bool(0.35) || neon;
      const side = armies ? [U.pk(U.mix(sc.cols[0], [255, 255, 255], 0.25)), U.pk(U.mix(sc.cols[Math.floor(sc.cols.length / 2)], [0, 0, 0], 0.15))] : [X.rgb(250, 246, 236), X.rgb(34, 30, 40)];
      const rim = [X.shade(side[0], 0.35), neon ? X.shade(side[1], 1.8) : X.rgb(205, 196, 186)];
      const hiFrom = X.rgb(246, 222, 90), pick = X.rgb(120, 220, 255), greed = R.range(0.6, 0.95);
      let board, turn, moving, moves, pause, last, sel = -1, legal = [];
      const setup = () => {
        board = new Array(64).fill(null); const back = R.bool(0.15) ? R.shuffle('rnbqkbnr'.split('')).join('') : 'rnbqkbnr';
        for (let x = 0; x < 8; x++) { board[x] = { t: back[x], c: 1 }; board[8 + x] = { t: 'p', c: 1 }; board[48 + x] = { t: 'p', c: 0 }; board[56 + x] = { t: back[x], c: 0 }; }
        turn = 0; moving = null; moves = 0; pause = 1; last = null; sel = -1; legal = [];
      };
      const gen = c => {
        const out = [], at = (x, y) => x >= 0 && y >= 0 && x < 8 && y < 8 ? board[y * 8 + x] : undefined;
        for (let i = 0; i < 64; i++) {
          const p = board[i]; if (!p || p.c !== c) continue;
          const x = i % 8, y = i >> 3, push = (tx, ty) => { const q = at(tx, ty); if (q === undefined || (q && q.c === c)) return false; out.push([i, ty * 8 + tx, q ? VAL[q.t] : 0]); return !q; };
          if (p.t === 'p') {
            const dy = c ? 1 : -1;
            if (at(x, y + dy) === null) { out.push([i, (y + dy) * 8 + x, 0.1]); if ((c ? y === 1 : y === 6) && at(x, y + 2 * dy) === null) out.push([i, (y + 2 * dy) * 8 + x, 0.2]); }
            for (const dx of [-1, 1]) { const q = at(x + dx, y + dy); if (q && q.c !== c) out.push([i, (y + dy) * 8 + x + dx, VAL[q.t]]); }
          } else if (p.t === 'n') { for (const [a, b] of [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]) push(x + a, y + b); }
          else if (p.t === 'k') { for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) push(x + a, y + b); }
          else {
            const dirs = p.t === 'r' ? [[1, 0], [-1, 0], [0, 1], [0, -1]] : p.t === 'b' ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
            for (const [a, b] of dirs) for (let k = 1; k < 8; k++) if (!push(x + a * k, y + b * k)) break;
          }
        }
        return out;
      };
      const start = m => { moving = { from: m[0], to: m[1], u: 0, p: board[m[0]] }; board[m[0]] = null; sel = -1; legal = []; };
      setup();
      g.trait('Board', ['Walnut', 'Tournament', 'Slate', 'Maple', 'Lilac', 'Neon'][style] + (grain ? ' grain' : '')); g.trait('Pieces', armies ? 'Painted' : 'Ivory and ebony'); g.trait('Players', greed > 0.8 ? 'Greedy' : 'Wanderers');
      const warm = chessStage(g);
      return function frame(t, dt) {
        if (!frame.w) { frame.w = 1; for (let k = 0; k < warm; k++) frame(t, 0.4); }
        me.step(dt);
        // the viewer plays white: pick a piece, then one of its squares
        for (const tp of me.taps) {
          if (moving || turn !== 0 || pause > 0.2) break;
          const sq = Math.min(7, tp.y * 8 | 0) * 8 + Math.min(7, tp.x * 8 | 0), hit = legal.find(m => m[1] === sq);
          if (hit) start(hit);
          else if (board[sq] && board[sq].c === 0) { sel = sq; legal = gen(0).filter(m => m[0] === sq); }
          else { sel = -1; legal = []; }
        }
        if (pause > 0) pause -= dt;
        else if (!moving && !(turn === 0 && me.active)) {
          const ms = gen(turn);
          if (!ms.length || moves > 140) setup();
          else {
            const best = Math.max(...ms.map(m => m[2])), pool = best >= 1 && R() < greed ? ms.filter(m => m[2] === best) : ms;
            start(R.pick(pool));
          }
        } else if (moving) {
          moving.u += dt * 3.2;
          if (moving.u >= 1) {
            const cap = board[moving.to]; board[moving.to] = moving.p;
            if (moving.p.t === 'p' && (moving.to >> 3 === 0 || moving.to >> 3 === 7)) moving.p.t = 'q';
            last = [moving.from, moving.to]; moving = null; turn ^= 1; moves++; pause = 0.2;
            if (cap && cap.t === 'k') pause = 3, moves = 999;
          }
        }
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
          const i = y * 8 + x, base = (x + y) & 1 ? dark : light;
          let c = last && (i === last[0] || i === last[1]) ? X.mixPk(base, hiFrom, 0.45) : base;
          if (i === sel) c = X.mixPk(base, pick, 0.6);
          if (neon) { X.rect(g, x * s, y * s, s, s, (x + y) & 1 ? dark : X.rgb(18, 18, 26)); if (!((x + y) & 1)) { X.rect(g, x * s, y * s, s, 1, X.shade(c, 1.6)); X.rect(g, x * s, y * s, 1, s, X.shade(c, 1.6)); } if (c !== base) X.rect(g, x * s + 1, y * s + 1, s - 1, s - 1, X.shade(c, 0.6)); }
          else {
            X.rect(g, x * s, y * s, s, s, c);
            if (grain) for (let k = 0; k < s; k += 3) X.rect(g, x * s, y * s + k + ((x * 7 + y) % 3), s, 1, X.shade(c, 0.93));
          }
        }
        for (const m of legal) { const x = m[1] % 8, y = m[1] >> 3; X.rect(g, x * s + 4, y * s + 4, 2, 2, board[m[1]] ? X.rgb(230, 70, 60) : X.shade(pick, 0.8)); }
        const draw = (p, px, py) => X.stamp(g, X.outline(PIECES[p.t]), Math.round(px), Math.round(py), [0, side[p.c], side[p.c], , , , , , , rim[p.c]]);
        for (let i = 0; i < 64; i++) if (board[i]) draw(board[i], (i % 8) * s, (i >> 3) * s);
        if (moving) {
          const e = U.smooth(Math.min(1, moving.u)), fx = moving.from % 8, fy = moving.from >> 3, tx = moving.to % 8, ty = moving.to >> 3;
          draw(moving.p, (fx + (tx - fx) * e) * s, (fy + (ty - fy) * e) * s - Math.sin(e * Math.PI) * 3);
        }
      };
    }),
  });

  // ---------- go ----------
  const WOODS = [[226, 184, 112], [240, 205, 140], [196, 140, 80], [150, 104, 64], [170, 178, 170], [90, 140, 110]];
  // Go: how many stones are on the board when the piece opens
  const goStage = (g, base, L) => { const st = g.trait('Stage', roll(g, ['Opening', 'Middle game', 'Late'], [3, 2, 1])); return st === 'Opening' ? base : Math.min(Math.round(base * (st === 'Late' ? 5 : 3)), Math.round(L * L * 0.45)); };
  add({
    name: 'Go', sizes: [100], fps: 12,
    interactive: 'Click an intersection to play a stone; the machine answers.',
    recipe: 'Stones go down one at a time on a nine, thirteen or nineteen line board, mostly near the fighting; groups that lose their last liberty are lifted off, and a crowded board is cleared for a new game. Click to play a stone yourself.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, L = 19, sp = 5, o = 3, wood = U.pk(U.mix([214, 170, 100], U.hsb(R.range(0, 100), 40, 80), R.range(0, 0.35))), line = X.shade(wood, 0.45);
      const bs = new Int8Array(L * L), fade = new Float32Array(L * L), nb = i => { const x = i % L, y = (i / L) | 0, r = []; if (x) r.push(i - 1); if (x < L - 1) r.push(i + 1); if (y) r.push(i - L); if (y < L - 1) r.push(i + L); return r; };
      const group = i => { const c = bs[i], seen = new Set([i]), st = [i]; let lib = 0; const libs = new Set(); while (st.length) { const j = st.pop(); for (const k of nb(j)) { if (!bs[k]) libs.add(k); else if (bs[k] === c && !seen.has(k)) { seen.add(k); st.push(k); } } } return [seen, libs.size]; };
      let turn = 1, timer = 0, count = 0, clearing = 0;
      let lastTap = -1e9, clock = 0;   // the viewer's hand: the machine waits on their side while they play
      g.trait('Board', '19 x 19'); g.trait('Wood', 'Kaya'); g.trait('Stones', 'Slate and shell');
      const warm = goStage(g, 26, L);
      const humanPlay = i => {
        if (bs[i]) return;
        bs[i] = turn;
        for (const k of nb(i)) if (bs[k] === -turn) { const [gp, lb] = group(k); if (!lb) for (const j of gp) { bs[j] = 0; fade[j] = 1; } }
        if (!group(i)[1]) { bs[i] = 0; return; }
        fade[i] = -1; turn = -turn; count++; timer = 0;
      };
      const stone = (cx, cy, c, a) => {
        const body = c === 1 ? X.rgb(24, 24, 28) : X.rgb(236, 232, 222), hl = c === 1 ? X.rgb(90, 90, 100) : WHITE;
        X.disc(g, cx + 0.5, cy + 0.5, 2.4, a < 1 ? X.mixPk(wood, body, a) : body); if (a >= 1) X.put(g, cx - 1, cy - 1, hl);
      };
      // the first frame already shows a game under way: a couple of dozen moves are played at once
      return function frame(t, dt) {
        if (!frame.w) { frame.w = 1; for (let k = 0; k < warm; k++) frame(t, 0.36); }
        timer += dt; clock += dt;
        const taps = g.input.taps(); if (taps.length) lastTap = clock;
        for (const tp of taps) { if (clearing > 0) break; const ix = Math.round((tp.x * n - o) / sp), iy = Math.round((tp.y * n - o) / sp); if (ix >= 0 && iy >= 0 && ix < L && iy < L) humanPlay(iy * L + ix); }
        if (clearing > 0) { clearing -= dt; if (clearing <= 0) { bs.fill(0); count = 0; } }
        else if (timer > 0.35 && !(clock - lastTap < 8 && turn === 1)) {
          timer = 0;
          for (let tries = 0; tries < 40; tries++) {
            let i = R.int(0, L * L - 1);
            if (count > 4 && R.bool(0.85)) { const occ = []; for (let k = 0; k < L * L; k++) if (bs[k]) occ.push(k); const a = R.pick(occ); const ns = nb(a).concat(nb(a).flatMap(nb)); i = R.pick(ns); }
            if (bs[i]) continue;
            bs[i] = turn;
            for (const k of nb(i)) if (bs[k] === -turn) { const [gp, lb] = group(k); if (!lb) for (const j of gp) { bs[j] = 0; fade[j] = 1; } }
            if (!group(i)[1]) { bs[i] = 0; continue; }
            fade[i] = -1; turn = -turn; count++; break;
          }
          if (count > L * L * 0.55) clearing = 3;
        }
        d.fill(wood);
        for (let k = 0; k < L; k++) { X.rect(g, o + k * sp, o, 1, (L - 1) * sp + 1, line); X.rect(g, o, o + k * sp, (L - 1) * sp + 1, 1, line); }
        for (const a of [3, 9, 15]) for (const b of [3, 9, 15]) X.rect(g, o + a * sp - 1, o + b * sp - 1, 3, 3, line);
        for (let i = 0; i < L * L; i++) {
          const cx = o + (i % L) * sp, cy = o + ((i / L) | 0) * sp, cl = clearing > 0 ? Math.min(1, clearing / 2.5) : 1;
          if (bs[i]) { let a = fade[i] < 0 ? Math.min(1, -fade[i] < 0 ? 1 : 1) : 1; if (fade[i] < 0) { fade[i] = Math.min(0, fade[i] + dt * 4); a = 1 + fade[i] * 0.6; } stone(cx, cy, bs[i], a * cl); }
          else if (fade[i] > 0) { fade[i] -= dt * 1.2; X.put(g, cx, cy, X.shade(wood, 0.8)); }
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g, 8), L = R.pick([9, 13, 19, 19]), sp = L === 9 ? 11 : L === 13 ? 7 : 5, o = Math.round((n - (L - 1) * sp) / 2);
      const wood0 = R.pick(WOODS), wood = U.pk(U.mix(wood0, U.hsb(R.range(0, 100), 40, 80), R.range(0, 0.25))), line = X.shade(wood, 0.45), grainC = X.shade(wood, 0.92);
      const sc = U.scheme(R, 0.3), colourStones = R.bool(0.25);
      const body = colourStones ? [0, U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.35)), , U.pk(U.mix(sc.cols[sc.cols.length - 1], [255, 255, 255], 0.35))] : [0, X.rgb(26, 26, 30), , X.rgb(238, 234, 224)];
      const rad = Math.max(2.2, sp * 0.47), stars = L === 9 ? [2, 4, 6] : L === 13 ? [3, 6, 9] : [3, 9, 15];
      const bs = new Int8Array(L * L), fade = new Float32Array(L * L), nb = i => { const x = i % L, y = (i / L) | 0, r = []; if (x) r.push(i - 1); if (x < L - 1) r.push(i + 1); if (y) r.push(i - L); if (y < L - 1) r.push(i + L); return r; };
      const group = i => { const c = bs[i], seen = new Set([i]), st = [i], libs = new Set(); while (st.length) { const j = st.pop(); for (const k of nb(j)) { if (!bs[k]) libs.add(k); else if (bs[k] === c && !seen.has(k)) { seen.add(k); st.push(k); } } } return [seen, libs.size]; };
      let turn = 1, timer = 0, count = 0, clearing = 0, lastAt = -1;
      g.trait('Board', L + ' x ' + L); g.trait('Wood', ['Kaya', 'Honey', 'Walnut', 'Dark walnut', 'Slate', 'Jade'][WOODS.indexOf(wood0)]); g.trait('Stones', colourStones ? 'Coloured' : 'Slate and shell');
      const warm = goStage(g, L === 9 ? 14 : L === 13 ? 22 : 26, L);
      const play = i => {
        if (bs[i]) return false;
        bs[i] = turn;
        for (const k of nb(i)) if (bs[k] === -turn) { const [gp, lb] = group(k); if (!lb) for (const j of gp) { bs[j] = 0; fade[j] = 1; } }
        if (!group(i)[1]) { bs[i] = 0; return false; }
        fade[i] = -1; turn = -turn; count++; lastAt = i; return true;
      };
      // a stone lit from the top left: a highlight, the body, a darker lower rim
      const stone = (cx, cy, c, a) => {
        const b = body[c + 2], hl = c === 1 ? X.shade(b, 3.4) : WHITE, sh = X.shade(b, c === 1 ? 0.6 : 0.78), ox = cx + 0.5, oy = cy + 0.5;
        X.disc(g, ox + 1, oy + 1, rad, X.shade(wood, 0.62));
        X.disc(g, ox, oy, rad, (x, y) => {
          const l = -(x + 0.5 - ox + y + 0.5 - oy) / rad, col = rad > 3 && l > 0.75 ? hl : l < -0.7 ? sh : b;
          return a < 1 ? X.mixPk(wood, col, a) : col;
        });
        if (rad <= 3 && a >= 1) X.put(g, cx - 1, cy - 1, hl);
      };
      return function frame(t, dt) {
        if (!frame.w) { frame.w = 1; for (let k = 0; k < warm; k++) frame(t, L === 19 ? 0.36 : 0.61); }
        me.step(dt);
        for (const tp of me.taps) {
          if (clearing > 0 || turn !== 1) break;
          const ix = Math.round((tp.x * n - o) / sp), iy = Math.round((tp.y * n - o) / sp);
          if (ix >= 0 && iy >= 0 && ix < L && iy < L && play(iy * L + ix)) timer = -0.2;
        }
        timer += dt;
        if (clearing > 0) { clearing -= dt; if (clearing <= 0) { bs.fill(0); count = 0; turn = 1; lastAt = -1; } }
        else if (timer > (L === 19 ? 0.35 : 0.6) && !(turn === 1 && me.active)) {
          timer = 0;
          for (let tries = 0; tries < 60; tries++) {
            let i = R.int(0, L * L - 1);
            if (count > 3 && R.bool(0.85)) { const occ = []; for (let k = 0; k < L * L; k++) if (bs[k]) occ.push(k); const a = lastAt >= 0 && R.bool(0.5) ? lastAt : R.pick(occ); const ns = nb(a).concat(nb(a).flatMap(nb)); i = R.pick(ns); }
            if (play(i)) break;
          }
          if (count > L * L * 0.6) clearing = 3;
        }
        d.fill(wood);
        for (let y = 1; y < n; y += 4) X.rect(g, 0, y + ((y * 13) % 3), n, 1, grainC);
        for (let k = 0; k < L; k++) { X.rect(g, o + k * sp, o, 1, (L - 1) * sp + 1, line); X.rect(g, o, o + k * sp, (L - 1) * sp + 1, 1, line); }
        for (const a of stars) for (const b of stars) X.rect(g, o + a * sp - 1, o + b * sp - 1, 3, 3, line);
        const cl = clearing > 0 ? Math.min(1, clearing / 2.5) : 1;
        for (let i = 0; i < L * L; i++) {
          const cx = o + (i % L) * sp, cy = o + ((i / L) | 0) * sp;
          if (bs[i]) { let a = 1; if (fade[i] < 0) { fade[i] = Math.min(0, fade[i] + dt * 4); a = 1 + fade[i] * 0.6; } stone(cx, cy, bs[i], a * cl); if (i === lastAt && cl >= 1) X.rect(g, cx - 1, cy - 1, 2, 2, bs[i] === 1 ? X.rgb(230, 80, 70) : X.rgb(200, 50, 50)); }
          else if (fade[i] > 0) { fade[i] -= dt * 1.2; X.put(g, cx, cy, X.shade(wood, 0.8)); }
        }
        if (g.input.inside && turn === 1 && clearing <= 0) {   // the viewer's ghost stone
          const ix = Math.round((g.input.x * n - o) / sp), iy = Math.round((g.input.y * n - o) / sp);
          if (ix >= 0 && iy >= 0 && ix < L && iy < L && !bs[iy * L + ix]) X.disc(g, o + ix * sp + 0.5, o + iy * sp + 0.5, rad * 0.6, X.mixPk(wood, body[3], 0.5));
        }
      };
    }),
  });

  // ---------- dominoes ----------
  // pip positions on a 3 x 3 layout for 0..6
  const PIPS3 = [[], [4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8]];
  add({
    name: 'Dominoes', sizes: [50], fps: 15,
    interactive: 'Click near a standing domino to push it over.',
    recipe: 'A long line of standing dominoes seen from above, laid in a snake, a square spiral or a staircase. A push runs along it and each tile topples onto the next and lies there showing its pips; then a hand stands them all up again. Click to push one yourself.',
    make(R, U, g) {
      const { n, d } = g, me = hand(g, 6), W = 5, T = 2, Lf = 11, spc = R.pick([5, 6, 6, 7]);
      const felts = [[18, 70, 44], [24, 40, 80], [80, 22, 34], [22, 22, 28], [60, 40, 26], [30, 70, 80]], felt = rgbA(R.pick(felts)), feltD = X.shade(felt, 0.8);
      const style = R.pick(['ivory', 'ivory', 'black', 'rainbow', 'palette']), sc = U.scheme(R, 0.6);
      // the path, axis-aligned so every tile sits square on the grid
      const way = [], kind = R.pick(['snake', 'spiral', 'stairs', 'snake']);
      if (kind === 'snake') { const rows = R.int(3, 4), x0 = 5, x1 = n - 6, gap = (n - 14) / (rows - 1); for (let r = 0; r < rows; r++) { const y = Math.round(9 + r * gap); way.push(r % 2 ? [x1, y] : [x0, y], r % 2 ? [x0, y] : [x1, y]); } }
      else if (kind === 'spiral') { let x0 = 5, y0 = 5, x1 = n - 6, y1 = n - 6; way.push([x0, y0]); while (x1 - x0 > 12 && y1 - y0 > 12) { way.push([x1, y0], [x1, y1], [x0, y1], [x0, y0 + 11]); x0 += 11; y0 += 11; x1 -= 11; y1 -= 11; way.push([x0, y0]); } }
      else { let x = 5, y = 5; way.push([x, y]); const stepL = R.int(10, 14); while (x < n - 8 && y < n - 8) { x = Math.min(n - 6, x + stepL); way.push([x, y]); y = Math.min(n - 6, y + stepL); way.push([x, y]); } }
      const dom = [];
      for (let w = 1; w < way.length; w++) {
        const [ax, ay] = way[w - 1], [bx, by] = way[w], len = Math.abs(bx - ax) + Math.abs(by - ay), dx = Math.sign(bx - ax), dy = Math.sign(by - ay);
        for (let k = dom.length ? spc : 0; k < len - 2; k += spc) dom.push({ x: ax + dx * k, y: ay + dy * k, dx, dy, a: R.int(0, 6), b: R.int(0, 6), f: 0, go: false });
      }
      const N = dom.length;
      dom.forEach((D, i) => {
        if (style === 'ivory') { D.face = X.rgb(244, 238, 222); D.pip = X.rgb(28, 26, 32); }
        else if (style === 'black') { D.face = X.rgb(28, 26, 34); D.pip = X.rgb(244, 240, 228); }
        else if (style === 'rainbow') { D.face = X.hsbPk(i / N * 100, 70, 95); D.pip = X.rgb(255, 255, 255); }
        else { D.face = U.pk(sc.cols[i % sc.cols.length]); D.pip = X.lum(D.face) > 0.55 ? X.rgb(24, 24, 30) : WHITE; }
        D.edge = style === 'black' ? X.rgb(150, 146, 160) : X.shade(D.face, 0.62);
      });
      const fallT = 0.22, rate = R.range(0.04, 0.07);
      g.trait('Layout', { snake: 'Snake', spiral: 'Spiral', stairs: 'Staircase' }[kind]); g.trait('Tiles', { ivory: 'Ivory', black: 'Black', rainbow: 'Rainbow', palette: palName(sc) }[style]); g.trait('Felt', named(felts, ['Billiard', 'Navy', 'Burgundy', 'Charcoal', 'Walnut', 'Teal'], felt)); g.trait('Count', N); g.trait('Spacing', spc === 5 ? 'Tight' : spc === 6 ? 'Even' : 'Wide');
      let phase = 'ready', clock = 0, resetAt = 0;
      const push = i => { if (dom[i] && !dom[i].go) dom[i].go = true; };
      // draw a tile lying (or tipping) from its base along its direction: len along, W across
      const tile = (D, len, showPips) => {
        const px = -D.dy, py = D.dx;   // across
        const ax = D.x - px * 2, ay = D.y - py * 2, bx = ax + D.dx * (len - 1) + px * (W - 1), by = ay + D.dy * (len - 1) + py * (W - 1);
        const x0 = Math.min(ax, bx), y0 = Math.min(ay, by), w = Math.abs(bx - ax) + 1, h = Math.abs(by - ay) + 1;
        X.rect(g, x0 + 1, y0 + 1, w, h, X.shade(felt, 0.55));
        if (!showPips) X.rect(g, x0 + 2, y0 + 2, w, h, X.shade(felt, 0.7));   // a standing tile is tall: a longer, softer shadow
        X.rect(g, x0, y0, w, h, D.edge);
        if (w > 2 && h > 2) X.rect(g, x0 + (D.dx < 0 ? 0 : D.dx ? 0 : 0), y0, w - (D.dx ? 1 : 0), h - (D.dy ? 1 : 0), D.face);
        if (!showPips) { // the standing tile's top edge, catching the light
          X.rect(g, x0, y0, D.dy ? w : 1, D.dx ? h : 1, X.shade(D.face, 1.15)); return;
        }
        const at = (u, v) => [D.x - px * 2 + D.dx * u + px * v, D.y - py * 2 + D.dy * u + py * v];
        for (let v = 0; v < W; v++) { const [x, y] = at(5, v); X.put(g, x, y, D.edge); }
        for (const [half, val] of [[0, D.a], [6, D.b]]) for (const p of PIPS3[val]) { const [x, y] = at(half + 1 + p % 3, 1 + (p / 3 | 0)); X.put(g, x, y, D.pip); }
      };
      return (t, dt) => {
        me.step(dt); clock += dt;
        for (const tp of me.taps) {
          let best = -1, bd = 1e9;
          dom.forEach((D, i) => { const dd = Math.hypot(D.x - tp.x * n, D.y - tp.y * n); if (!D.go && dd < bd) { bd = dd; best = i; } });
          if (best >= 0 && bd < 8) { push(best); phase = 'run'; }
        }
        if (phase === 'ready' && clock > 1.6 && !me.active) { push(0); phase = 'run'; }
        let moving = false, fallen = 0;
        for (let i = 0; i < N; i++) {
          const D = dom[i];
          if (D.go && D.f < 1) { D.f = Math.min(1, D.f + dt / fallT); moving = true; if (D.f > 0.6 && i + 1 < N && !dom[i + 1].go && phase !== 'reset') { const gap = Math.abs(dom[i + 1].x - D.x) + Math.abs(dom[i + 1].y - D.y); if (gap <= spc) push(i + 1); } }
          if (D.f >= 1) fallen++;
        }
        if (phase === 'run' && !moving) { phase = 'rest'; clock = 0; }
        if (phase === 'rest' && clock > (fallen === N ? 2.2 : 4) && !me.active) { phase = 'reset'; resetAt = 0; }
        if (phase === 'reset') {
          resetAt += dt / rate;
          for (let i = N - 1; i >= 0; i--) if (N - 1 - i < resetAt) { dom[i].go = false; dom[i].f = Math.max(0, dom[i].f - dt * 6); }
          if (resetAt > N + 4) { phase = 'ready'; clock = 0; }
        }
        d.fill(felt);
        for (let y = 0; y < n; y += 2) for (let x = (y >> 1) & 1; x < n; x += 4) d[y * n + x] = feltD;
        for (let i = N - 1; i >= 0; i--) {
          const D = dom[i], e = Math.sin(D.f * Math.PI / 2), len = Math.round(T + (Lf - T) * e);
          tile(D, len, D.f > 0.9);
        }
      };
    },
  });

  // ---------- solitaire ----------
  // 3 x 5 rank glyphs and 3 x 3 / 5 x 5 suits for small cards
  const R35 = { A: [2, 5, 7, 5, 5], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1], 5: [7, 4, 6, 1, 6], 6: [3, 4, 6, 5, 2], 7: [7, 1, 2, 2, 2], 8: [2, 5, 2, 5, 2], 9: [2, 5, 3, 1, 6], 0: [2, 5, 5, 5, 2], 1: [2, 6, 2, 2, 7], J: [1, 1, 1, 5, 2], Q: [2, 5, 5, 6, 3], K: [5, 6, 4, 6, 5] };
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const SUIT5 = [spr(['.#.#.', '#####', '#####', '.###.', '..#..']), spr(['..#..', '.###.', '#####', '.###.', '..#..']), spr(['..#..', '.###.', '#####', '..#..', '.###.']), spr(['..#..', '#.#.#', '#####', '..#..', '.###.'])];
  const SUIT3 = [spr(['#.#', '###', '.#.']), spr(['.#.', '###', '.#.']), spr(['.#.', '###', '#.#']), spr(['###', '###', '.#.'])];
  const CROWN = spr(['#.#.#', '#####', '.....', '.###.', '#+#+#', '.###.', '.#.#.']);
  function glyph35(g, ch, x, y, c) { const rows = R35[ch]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) X.put(g, x + b, y + r, c); }
  // Klondike: the rules, and a small depth-first solver (forced safe foundation moves, moves that
  // reveal a hidden card first, one empty column standing for all, a memo of seen positions).
  // A deal is only played if the solver wins it, so every game on screen ends in a win.
  const KR = c => c % 13, KS = c => (c / 13) | 0, KRED = c => c < 26;
  function klDeal(deck, draw) {
    const S = { tab: [[], [], [], [], [], [], []], down: [0, 0, 0, 0, 0, 0, 0], stock: [], waste: [], fnd: [0, 0, 0, 0], draw };
    let k = 0;
    for (let c = 0; c < 7; c++) for (let r = c; r < 7; r++) S.tab[r].push(deck[k++]);
    for (let c = 0; c < 7; c++) S.down[c] = c;
    S.stock = deck.slice(k).reverse();
    return S;
  }
  const klClone = S => ({ tab: S.tab.map(t => t.slice()), down: S.down.slice(), stock: S.stock.slice(), waste: S.waste.slice(), fnd: S.fnd.slice(), draw: S.draw });
  const klFits = (S, c, col) => { const t = S.tab[col]; if (!t.length) return KR(c) === 12; const top = t[t.length - 1]; return KR(top) === KR(c) + 1 && KRED(top) !== KRED(c); };
  // a move: [kind, a, b, i, score, card]; kinds 0 tab to foundation, 1 waste to foundation,
  // 2 run tab to tab (from a at index i to b), 3 waste to tab b, 4 draw, 5 turn the waste over
  function klMoves(S) {
    const out = [], { tab, down, fnd, waste } = S;
    const safe = c => { const r = KR(c); if (r <= 1) return true; return KRED(c) ? fnd[2] >= r - 1 && fnd[3] >= r - 1 : fnd[0] >= r - 1 && fnd[1] >= r - 1; };
    for (let a = 0; a < 7; a++) { const t = tab[a]; if (t.length) { const c = t[t.length - 1]; if (fnd[KS(c)] === KR(c)) { const m = [0, a, 0, 0, 200, c]; if (safe(c)) return [m]; out.push(m); } } }
    if (waste.length) { const c = waste[waste.length - 1]; if (fnd[KS(c)] === KR(c)) { const m = [1, 0, 0, 0, 190, c]; if (safe(c)) return [m]; out.push(m); } }
    for (let a = 0; a < 7; a++) {
      const t = tab[a], L = t.length;
      for (let i = down[a]; i < L; i++) {
        const c = t[i];
        if (i > down[a]) { const below = t[i - 1]; if (fnd[KS(below)] !== KR(below)) continue; }
        for (let b = 0; b < 7; b++) {
          if (b === a || !klFits(S, c, b)) continue;
          if (!tab[b].length && i === 0) continue;
          out.push([2, a, b, i, i === down[a] ? (down[a] > 0 ? 100 + down[a] : 20) : 60, c]);
          if (!tab[b].length) break;
        }
      }
    }
    if (waste.length) { const c = waste[waste.length - 1]; for (let b = 0; b < 7; b++) if (klFits(S, c, b)) { out.push([3, 0, b, 0, tab[b].length ? 50 : 40, c]); if (!tab[b].length) break; } }
    if (S.stock.length) out.push([4, 0, 0, 0, 1, -1]); else if (waste.length) out.push([5, 0, 0, 0, 0, -1]);
    out.sort((p, q) => q[4] - p[4]);
    return out;
  }
  function klApply(S, m) {
    const { tab, down, fnd } = S;
    let flip = 0, k = 0;
    if (m[0] === 0) fnd[KS(tab[m[1]].pop())]++;
    else if (m[0] === 1) fnd[KS(S.waste.pop())]++;
    else if (m[0] === 2) { const run = tab[m[1]].splice(m[3]); for (const c of run) tab[m[2]].push(c); k = run.length; }
    else if (m[0] === 3) tab[m[2]].push(S.waste.pop());
    else if (m[0] === 4) { k = Math.min(S.draw, S.stock.length); for (let j = 0; j < k; j++) S.waste.push(S.stock.pop()); }
    else { k = S.waste.length; while (S.waste.length) S.stock.push(S.waste.pop()); }
    if ((m[0] === 0 || m[0] === 2) && tab[m[1]].length && tab[m[1]].length === down[m[1]]) { down[m[1]]--; flip = 1; }
    return [flip, k];
  }
  function klUndo(S, m, u) {
    const { tab, down, fnd } = S;
    if (u[0]) down[m[1]]++;
    if (m[0] === 0) { fnd[KS(m[5])]--; tab[m[1]].push(m[5]); }
    else if (m[0] === 1) { fnd[KS(m[5])]--; S.waste.push(m[5]); }
    else if (m[0] === 2) { const run = tab[m[2]].splice(tab[m[2]].length - u[1]); for (const c of run) tab[m[1]].push(c); }
    else if (m[0] === 3) S.waste.push(tab[m[2]].pop());
    else if (m[0] === 4) { for (let j = 0; j < u[1]; j++) S.stock.push(S.waste.pop()); }
    else { while (S.stock.length) S.waste.push(S.stock.pop()); }
  }
  const klKey = S => S.tab.map((t, a) => S.down[a] + String.fromCharCode(...t.map(c => 48 + c))).sort().join('|') + '/' + String.fromCharCode(...S.waste.map(c => 48 + c)) + '/' + S.stock.length;
  const klWon = S => S.fnd[0] + S.fnd[1] + S.fnd[2] + S.fnd[3] === 52;
  // a winning line of play from S (S is left as it was), or null within the node limit
  function klSolve(S0, limit = 1500) {
    const S = klClone(S0), seen = new Set(), path = [];
    let nodes = 0;
    const dfs = () => {
      if (klWon(S)) return true;
      const k = klKey(S);
      if (seen.has(k) || ++nodes > limit) return false;
      seen.add(k);
      for (const m of klMoves(S)) {
        const u = klApply(S, m); path.push(m);
        if (dfs()) return true;
        path.pop(); klUndo(S, m, u);
      }
      return false;
    };
    return dfs() ? path : null;
  }
  // card faces: a rank and suit index in the corner (readable when stacked), a big suit or a crown
  const PIP_COL = { Classic: [X.rgb(214, 36, 48), X.rgb(214, 36, 48), X.rgb(24, 24, 30), X.rgb(24, 24, 30)], 'Four colour': [X.rgb(214, 36, 48), X.rgb(40, 96, 210), X.rgb(30, 130, 64), X.rgb(24, 24, 30)] };
  function cardSprites(cw, ch, style, face, edge, backA, backB, backKind) {
    const put = (a, x, y, c) => { if (x >= 0 && y >= 0 && x < cw && y < ch) a[y * cw + x] = c; };
    const blank = col => { const a = new Uint32Array(cw * ch); for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) { const corner = (x === 0 || x === cw - 1) && (y === 0 || y === ch - 1); if (!corner) a[y * cw + x] = x === 0 || y === 0 || x === cw - 1 || y === ch - 1 ? edge : col; } return a; };
    const glyph = (a, chr, x, y, c) => { const rows = R35[chr]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) put(a, x + b, y + r, c); };
    const stampA = (a, spr, x, y, cols) => { for (let r = 0; r < spr.length; r++) for (let q = 0; q < spr[0].length; q++) { const v = spr[r][q]; if (v && cols[v] !== undefined) put(a, x + q, y + r, cols[v]); } };
    const faces = [];
    for (let id = 0; id < 52; id++) {
      const s = KS(id), r = KR(id), col = PIP_COL[style][s], a = blank(face), rk = RANKS[r];
      if (rk === '10') { glyph(a, '1', 1, 1, col); glyph(a, '0', 4, 1, col); stampA(a, SUIT3[s], 8, 2, [0, col]); }
      else { glyph(a, rk, 1, 1, col); stampA(a, SUIT3[s], 5, 2, [0, col]); }
      if (r >= 10) { for (let y = 7; y < 15; y++) for (let x = 2; x < 10; x++) put(a, x, y, X.rgb(250, 214, 80)); stampA(a, CROWN, 4, 8, [0, col, , X.rgb(250, 250, 250)]); }
      else stampA(a, SUIT5[s], 4, 8, [0, col]);
      faces.push(a);
    }
    const back = blank(backA);
    for (let y = 2; y < ch - 2; y++) for (let x = 2; x < cw - 2; x++) {
      const on = backKind === 0 ? (x + y) % 3 === 0 : backKind === 1 ? ((x >> 1) + (y >> 1)) & 1 : backKind === 2 ? Math.abs(x - cw / 2 + 0.5) + Math.abs(y - ch / 2 + 0.5) < 4 || (x + y) % 4 === 0 : y % 2 === 0;
      back[y * cw + x] = on ? backB : backA;
    }
    for (let y = 1; y < ch - 1; y++) for (let x = 1; x < cw - 1; x++) if ((x === 1 || x === cw - 2 || y === ch - 2) && y > 1) back[y * cw + x] = face;
    return { faces, back };
  }
  add({
    name: 'Solitaire', sizes: [100], fps: 20,
    interactive: 'Click a card to send it to its best place, or the stock to draw; the machine plays on when you stop.',
    recipe: 'A real game of Klondike, dealt, played and won: seven columns, the stock and waste, four foundations. The machine draws, moves runs, turns up hidden cards and builds the suits, one move at a time; every deal is solved before it is played, so each game ends in a win and the old victory cascade, cards bouncing off the felt and stamping their trails. Then it shuffles and deals again. Click cards to play yourself.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, me = hand(g, 8), cw = 12, ch = 16;
      const felts = [[0, 128, 0], [0, 100, 70], [20, 60, 140], [120, 20, 40], [24, 24, 30], [0, 110, 120]], felt = rgbA(R.pick(felts)), feltD = X.shade(felt, 0.85);
      const sc = U.scheme(R, 0.4), backA = U.pk(sc.cols[0]), backB = U.pk(U.mix(sc.cols[1 % sc.cols.length], [255, 255, 255], 0.3));
      const backKind = R.int(0, 3), mode = R.pick(['classic', 'classic', 'fountain', 'ribbons']), bounce = R.range(0.7, 0.88), grav = R.range(1.1, 1.8) * n;
      const draw = R.bool(0.65) ? 1 : 3, style = R.pick(['Classic', 'Classic', 'Four colour']), faceC = R.pick([X.rgb(250, 250, 248), X.rgb(250, 250, 248), X.rgb(244, 234, 210)]);
      g.trait('Felt', named(felts, ['Green', 'Pine', 'Royal blue', 'Burgundy', 'Charcoal', 'Teal'], felt)); g.trait('Backs', ['Diagonal', 'Checks', 'Diamond', 'Stripes'][backKind]);
      g.trait('Back colours', palName(sc)); g.trait('Draw', 'Draw ' + draw); g.trait('Cards', style === 'Four colour' ? 'Four colour' : faceC === X.rgb(244, 234, 210) ? 'Ivory' : 'Classic');
      g.trait('Cascade', { classic: 'Classic', fountain: 'Fountain', ribbons: 'Ribbons' }[mode]);
      const edge = X.rgb(40, 40, 46), { faces, back } = cardSprites(cw, ch, style, faceC, edge, backA, backB, backKind);
      // the table: stock, waste, four foundations along the top, seven columns below
      const SX = 4, SY = 3, WX = 17, FX = [43, 56, 69, 82], TY = 22, colX = a => 4 + a * 13;
      const bg = new Uint32Array(N), slot = X.shade(felt, 0.72);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = (x + y * 3) % 7 === 0 ? feltD : felt;
      const outline = (x, y) => { for (let q = 1; q < cw - 1; q++) { bg[y * n + x + q] = slot; bg[(y + ch - 1) * n + x + q] = slot; } for (let q = 1; q < ch - 1; q++) { bg[(y + q) * n + x] = slot; bg[(y + q) * n + x + cw - 1] = slot; } };
      outline(SX, SY); outline(WX, SY); for (let a = 0; a < 7; a++) outline(colX(a), TY);
      FX.forEach((fx, s) => { outline(fx, SY); const spr = SUIT5[s]; for (let r = 0; r < 5; r++) for (let q = 0; q < 5; q++) if (spr[r][q]) bg[(SY + 5 + r) * n + fx + 3 + q] = slot; });
      const plate = new Uint32Array(N);
      // the game
      let S, plan, pi;
      const newGame = () => {
        for (let tries = 0; tries < 80; tries++) {
          const deck = R.shuffle(Array.from({ length: 52 }, (_, i) => i)), s0 = klDeal(deck, draw), p = klSolve(s0, 1500);
          if (p) { S = s0; plan = p; pi = 0; return; }
        }
        S = klDeal(Array.from({ length: 52 }, (_, i) => i), draw); plan = klSolve(S, 20000) || []; pi = 0;   // (never needed in practice)
      };
      // where every card lies in a position, face up or down, and in what order to draw them
      const LX = new Float32Array(52), LY = new Float32Array(52), LU = new Uint8Array(52), order = [];
      const layout = () => {
        order.length = 0;
        const at = (c, x, y, up) => { LX[c] = x; LY[c] = y; LU[c] = up; order.push(c); };
        S.stock.forEach((c, i) => at(c, SX, SY - Math.floor(i / 12), 0));
        const wl = S.waste.length;
        S.waste.forEach((c, i) => at(c, WX + (draw === 3 ? Math.max(0, i - (wl - 3)) * 4 : 0), SY, 1));
        for (let s = 0; s < 4; s++) for (let r = 0; r < S.fnd[s]; r++) at(s * 13 + r, FX[s], SY, 1);
        for (let a = 0; a < 7; a++) {
          const t = S.tab[a], dn = S.down[a], ups = t.length - dn, off = ups > 1 ? Math.max(2, Math.min(6, Math.floor((n - 2 - TY - ch - dn * 2) / (ups - 1)))) : 6;
          t.forEach((c, i) => at(c, colX(a), TY + (i < dn ? i * 2 : dn * 2 + (i - dn) * off), i >= dn ? 1 : 0));
        }
      };
      // the cards on screen ease from where they were to where the position puts them
      const DX = new Float32Array(52), DY = new Float32Array(52), DU = new Uint8Array(52), FXa = new Float32Array(52), FYa = new Float32Array(52), FU = new Uint8Array(52), delay = new Float32Array(52);
      let animT = 1, animDur = 0.26, pause = 0;
      const settle = () => { layout(); for (let c = 0; c < 52; c++) { DX[c] = LX[c]; DY[c] = LY[c]; DU[c] = LU[c]; } animT = animDur = 1; };
      const morph = (dur, stagger = 0) => {
        for (let c = 0; c < 52; c++) { FXa[c] = DX[c]; FYa[c] = DY[c]; FU[c] = DU[c]; }
        layout(); delay.fill(0);
        if (stagger) order.forEach((c, k) => { delay[c] = k * stagger; });
        animT = 0; animDur = dur;
      };
      const play = (m, dur = 0.3, rest = 0.28) => { klApply(S, m); morph(m[0] === 4 ? 0.22 : m[0] === 5 ? 0.4 : dur); pause = m[0] === 4 ? 0.14 : rest; };
      let phase = 'deal', timer = 0, dirty = null;
      newGame();
      // open mid-game: part of the winning line is played before the first frame
      const pre = Math.floor(plan.length * R.range(0.3, 0.55));
      for (; pi < pre; pi++) klApply(S, plan[pi]);
      settle(); phase = 'play';
      // the viewer's move for a card they clicked: home to its foundation if it can go, else onto a column
      const best = (src, a, i) => {
        if (src === 'waste') {
          const c = S.waste[S.waste.length - 1];
          if (S.fnd[KS(c)] === KR(c)) return [1, 0, 0, 0, 0, c];
          for (const pass of [1, 0]) for (let b = 0; b < 7; b++) if (!!S.tab[b].length === !!pass && klFits(S, c, b)) return [3, 0, b, 0, 0, c];
          return null;
        }
        const t = S.tab[a], c = t[i];
        if (i === t.length - 1 && S.fnd[KS(c)] === KR(c)) return [0, a, 0, 0, 0, c];
        for (const pass of [1, 0]) for (let b = 0; b < 7; b++) if (b !== a && !!S.tab[b].length === !!pass && klFits(S, c, b) && !(pass === 0 && i === 0)) return [2, a, b, i, 0, c];
        return null;
      };
      const tapAt = (x, y) => {
        if (x >= SX && x < SX + cw && y >= SY - 4 && y < SY + ch) return S.stock.length ? [4, 0, 0, 0, 0, -1] : S.waste.length ? [5, 0, 0, 0, 0, -1] : null;
        for (let k = order.length - 1; k >= 0; k--) {
          const c = order[k];
          if (!LU[c] || x < LX[c] || y < LY[c] || x >= LX[c] + cw || y >= LY[c] + ch) continue;
          if (S.waste.length && S.waste[S.waste.length - 1] === c) return best('waste');
          for (let a = 0; a < 7; a++) { const i = S.tab[a].indexOf(c); if (i >= S.down[a]) return best('tab', a, i); }
          return null;
        }
        return null;
      };
      // the win cascade, as in the old game: cards leap off the foundations king first and bounce away
      let flying = [], dealt = 0, wipe = -1, gapT = 0;
      const launch = (x, y, vx, vy) => {
        if (dealt >= 52) return;
        const pile = mode === 'fountain' ? dealt % 4 : 3 - (dealt % 4), rank = 12 - Math.floor(dealt / 4);
        flying.push({ x: x ?? FX[pile], y: y ?? SY, vx: vx ?? R.range(0.25, 0.9) * R.sign() * n * 0.4, vy: vy ?? -R.range(0, 0.45) * n, id: pile * 13 + rank });
        dealt++;
      };
      const blit = (spr, x, y) => {
        x = Math.round(x); y = Math.round(y);
        for (let r = 0; r < ch; r++) { const yy = y + r; if (yy < 0 || yy >= n) continue; for (let q = 0; q < cw; q++) { const xx = x + q, v = spr[r * cw + q]; if (v && xx >= 0 && xx < n) d[yy * n + xx] = v; } }
      };
      const drawTable = () => {
        d.set(bg);
        const p = c => Math.max(0, Math.min(1, (animT - delay[c]) / animDur));
        const moving = [];
        for (const c of order) {
          if (animT < 1e9 && (FXa[c] !== LX[c] || FYa[c] !== LY[c]) && p(c) < 1) { moving.push(c); continue; }
          DX[c] = LX[c]; DY[c] = LY[c]; DU[c] = LU[c];
          blit(DU[c] ? faces[c] : back, DX[c], DY[c]);
        }
        for (const c of moving) {
          const e = U.smooth(p(c));
          DX[c] = FXa[c] + (LX[c] - FXa[c]) * e; DY[c] = FYa[c] + (LY[c] - FYa[c]) * e - Math.sin(e * Math.PI) * 2;
          DU[c] = e > 0.5 ? LU[c] : FU[c];
          blit(DU[c] ? faces[c] : back, DX[c], DY[c]);
        }
      };
      return (t, dt) => {
        me.step(dt);
        if (phase === 'play') {
          animT += dt;
          const idle = animT >= animDur + Math.max(...delay) + pause;   // a short rest after each move lands
          // the viewer: one move per click, only while nothing is moving (a burst of remembered clicks is played a move at a time)
          if (me.taps.length && idle) {
            const tp = me.taps[0], m = tapAt(tp.x * n, tp.y * n);
            if (m) { if (!dirty) dirty = { S: klClone(S), pi }; play(m, 0.22, 0.05); }
          } else if (idle && klWon(S)) { phase = 'won'; timer = 0; }
          else if (idle && !me.active) {
            if (dirty) {
              // take over: carry on from the viewer's position if it can still be won, otherwise put their moves back
              const p = klSolve(S, 1500);
              if (p) { plan = p; pi = 0; } else { S = dirty.S; pi = dirty.pi; morph(0.6); pause = 0.4; }
              dirty = null;
            } else if (pi < plan.length) play(plan[pi++]);
          }
          drawTable();
        } else if (phase === 'won') {
          timer += dt; drawTable();
          if (timer > 1) { phase = 'cascade'; plate.set(d); for (let s = 0; s < 4; s++) for (let y = SY - 1; y < SY + ch + 1; y++) for (let x = FX[s] - 1; x < FX[s] + cw + 1; x++) plate[y * n + x] = bg[y * n + x]; flying = []; dealt = 0; wipe = -1; gapT = 0; }
        } else if (phase === 'cascade') {
          for (const tp of me.taps) if (flying.length < 12) launch(tp.x * n - cw / 2, tp.y * n - ch / 2, (tp.x < 0.5 ? 1 : -1) * R.range(0.3, 0.8) * n * 0.4, -R.range(0.2, 0.6) * n);
          if (wipe >= 0) {   // the felt is swept clean, then a new game is dealt
            wipe += dt;
            const rows = Math.min(n, Math.floor(wipe / 0.7 * n));
            for (let y = 0; y < rows; y++) for (let x = 0; x < n; x++) plate[y * n + x] = bg[y * n + x];
            d.set(plate);
            if (wipe > 0.9) {
              newGame();
              for (const c of S.stock) { DX[c] = SX; DY[c] = SY; DU[c] = 0; }
              for (let a = 0; a < 7; a++) for (const c of S.tab[a]) { DX[c] = SX; DY[c] = SY; DU[c] = 0; }
              morph(0.3, 0.035); pause = 0.6; phase = 'play';
            }
            return;
          }
          gapT += dt;
          // a card leaves every third of a second or so (a few in the air at once), so the cascade lasts about twenty seconds
          if (flying.length < (mode === 'fountain' ? 8 : 5) && gapT > (mode === 'fountain' ? 0.2 : 0.32)) { launch(); gapT = 0; }
          if (dealt >= 52 && !flying.length) wipe = 0;
          d.set(plate);
          for (const c of flying) { c.vy += grav * dt; c.x += c.vx * dt; c.y += c.vy * dt; if (c.y + ch > n) { c.y = n - ch; c.vy *= -bounce; } blit(faces[c.id], c.x, c.y); }
          if (mode === 'ribbons') { for (let i = 0; i < N; i++) plate[i] = X.mixPk(d[i], felt, 0.035); } else plate.set(d);
          flying = flying.filter(c => c.x > -cw && c.x < n);
          for (let s = 0; s < 4; s++) { const left = 13 - Math.floor((dealt + (mode === 'fountain' ? 3 - s : s)) / 4); if (left > 0) blit(faces[s * 13 + left - 1], FX[s], SY); }
        }
      };
    },
  });

  // ---------- dice ----------
  const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  add({
    name: 'Dice', sizes: [100], fps: 15,
    interactive: 'Click to throw the dice toward that spot.',
    recipe: 'A handful of dice thrown into a felt tray: they skid, spin and tumble through their faces, knock off the walls and each other, settle square with their total shown, and are scooped up and thrown again. Click to throw them yourself.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.4), felt = U.pk(U.mix(sc.cols[0], [10, 30, 20], 0.6)), rim = X.shade(felt, 0.5), k = R.int(3, 6), sz = n * 0.11;
      const bodies = Array.from({ length: k }, (_, i) => ({ col: U.pk(U.mix(sc.cols[(i + 1) % sc.cols.length], [255, 255, 255], R.range(0.1, 0.6))), x: 0, y: 0, vx: 0, vy: 0, a: 0, va: 0, face: 1 }));
      const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
      g.trait('Dice', k); g.trait('Style', 'Pastel'); g.trait('Felt', palName(sc)); g.trait('Size', 'Medium');
      let rest = 0;
      const toss = () => bodies.forEach(b => { b.x = n * 0.15 + R.range(0, 0.15) * n; b.y = n * R.range(0.2, 0.8); b.vx = R.range(0.8, 1.5) * n; b.vy = R.range(-0.6, 0.6) * n; b.a = R.range(0, TAU); b.va = R.range(-12, 12); });
      toss();
      // the viewer's throw, from its own stream: the dice fly in from the far side toward the tap
      const tossAlt = (tx, ty) => bodies.forEach(b => { const A = g.alt; b.x = tx > n / 2 ? n * 0.15 : n * 0.85; b.y = n * (0.2 + A() * 0.6); b.vx = (tx - b.x) * (1.8 + A() * 0.8); b.vy = (ty - b.y) * (1.8 + A() * 0.8); b.a = A() * TAU; b.va = (A() * 2 - 1) * 12; });
      return (t, dt) => {
        for (const tp of g.input.taps()) { tossAlt(tp.x * n, tp.y * n); rest = 0; }
        let moving = false;
        for (const b of bodies) {
          b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
          const fr = Math.pow(0.25, dt); b.vx *= fr; b.vy *= fr; b.va *= fr;
          const m = sz * 0.75; if (b.x < m || b.x > n - m) { b.vx *= -0.7; b.x = Math.max(m, Math.min(n - m, b.x)); } if (b.y < m || b.y > n - m) { b.vy *= -0.7; b.y = Math.max(m, Math.min(n - m, b.y)); }
          const sp = Math.hypot(b.vx, b.vy);
          if (sp > n * 0.08) { moving = true; if (R() < sp / n * dt * 8) b.face = R.int(1, 6); }
          else { b.vx = b.vy = 0; b.va = 0; b.a += (Math.round(b.a / (Math.PI / 2)) * Math.PI / 2 - b.a) * 0.3; }
        }
        for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) { const A = bodies[i], B = bodies[j], dx = B.x - A.x, dy = B.y - A.y, dd = Math.hypot(dx, dy); if (dd < sz && dd > 0) { const push = (sz - dd) / 2, ux = dx / dd, uy = dy / dd; A.x -= ux * push; A.y -= uy * push; B.x += ux * push; B.y += uy * push; const tvx = A.vx; A.vx = B.vx * 0.8; B.vx = tvx * 0.8; const tvy = A.vy; A.vy = B.vy * 0.8; B.vy = tvy * 0.8; } }
        if (!moving) { rest += dt; if (rest > 3) { rest = 0; toss(); } } else rest = 0;
        d.fill(felt); X.rect(g, 0, 0, n, 2, rim); X.rect(g, 0, n - 2, n, 2, rim); X.rect(g, 0, 0, 2, n, rim); X.rect(g, n - 2, 0, 2, n, rim);
        for (const b of bodies) {
          const c = Math.cos(b.a), s = Math.sin(b.a), h = sz / 2, pts = [];
          for (const [u, v] of [[-h, -h], [h, -h], [h, h], [-h, h]]) pts.push(b.x + u * c - v * s, b.y + u * s + v * c);
          X.poly(g, pts.map((v, i) => v + (i % 2 ? 1.5 : 1.5)), X.rgb(0, 0, 0)); X.poly(g, pts, b.col);
          for (const [u, v] of PIPS[b.face]) { const pu = u * sz * 0.27, pv = v * sz * 0.27; X.rect(g, b.x + pu * c - pv * s - 0.8, b.y + pu * s + pv * c - 0.8, 2, 2, X.rgb(20, 20, 26)); }
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g, 5), sc = U.scheme(R, 0.4), k = R.int(2, 7), sz = R.pick([10, 12, 14]);
      const felts = [[16, 92, 56], [22, 50, 110], [110, 26, 40], [40, 30, 60], [30, 30, 34]], felt = rgbA(R.pick(felts)), feltD = X.shade(felt, 0.88), rim = X.rgb(70, 44, 26), rimL = X.rgb(120, 80, 46);
      const style = R.pick(['classic', 'casino', 'black', 'palette']);
      const bodies = Array.from({ length: k }, (_, i) => {
        const col = style === 'classic' ? X.rgb(246, 242, 232) : style === 'casino' ? X.rgb(200, 24, 40) : style === 'black' ? X.rgb(30, 28, 36) : U.pk(U.mix(sc.cols[i % sc.cols.length], [255, 255, 255], 0.2));
        const pip = style === 'classic' ? (i === 0 && R.bool(0.5) ? X.rgb(200, 30, 40) : X.rgb(24, 24, 30)) : style === 'palette' ? (X.lum(col) > 0.55 ? X.rgb(24, 24, 30) : WHITE) : WHITE;
        return { col, pip, x: 0, y: 0, vx: 0, vy: 0, a: 0, va: 0, face: R.int(1, 6) };
      });
      let rest = 0, total = 0;
      g.trait('Dice', k); g.trait('Style', { classic: 'Classic', casino: 'Casino', black: 'Black', palette: palName(sc) }[style]); g.trait('Felt', named(felts, ['Green', 'Blue', 'Red', 'Purple', 'Charcoal'], felt)); g.trait('Size', sz === 10 ? 'Small' : sz === 12 ? 'Medium' : 'Large');
      const toss = (tx, ty) => bodies.forEach(b => {
        const fromLeft = tx === undefined ? R.bool() : tx > n / 2;
        b.x = fromLeft ? n * 0.12 : n * 0.88; b.y = n * R.range(0.25, 0.75);
        const gx = tx ?? n * R.range(0.4, 0.7), gy = ty ?? n * R.range(0.3, 0.7);
        b.vx = (gx - b.x) * R.range(1.8, 2.6); b.vy = (gy - b.y) * R.range(1.8, 2.6) + R.range(-0.2, 0.2) * n; b.a = R.range(0, TAU); b.va = R.range(-14, 14);
      });
      toss();
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) { toss(tp.x * n, tp.y * n); rest = 0; }
        let moving = false;
        for (const b of bodies) {
          b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
          const fr = Math.pow(0.12, dt); b.vx *= fr; b.vy *= fr; b.va *= fr;
          const m = sz * 0.7 + 3; if (b.x < m || b.x > n - m) { b.vx *= -0.7; b.va += R.range(-6, 6); b.x = Math.max(m, Math.min(n - m, b.x)); } if (b.y < m || b.y > n - m) { b.vy *= -0.7; b.va += R.range(-6, 6); b.y = Math.max(m, Math.min(n - m, b.y)); }
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > n * 0.07) { moving = true; if (R() < spd / n * dt * 9) b.face = R.int(1, 6); }
          else { b.vx = b.vy = 0; b.va = 0; const q = Math.round(b.a / (Math.PI / 2)) * Math.PI / 2; b.a += (q - b.a) * Math.min(1, dt * 10); }
        }
        for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) { const A = bodies[i], B = bodies[j], dx = B.x - A.x, dy = B.y - A.y, dd = Math.hypot(dx, dy); if (dd < sz * 1.15 && dd > 0) { const push = (sz * 1.15 - dd) / 2, ux = dx / dd, uy = dy / dd; A.x -= ux * push; A.y -= uy * push; B.x += ux * push; B.y += uy * push; const tvx = A.vx; A.vx = B.vx * 0.8; B.vx = tvx * 0.8; const tvy = A.vy; A.vy = B.vy * 0.8; B.vy = tvy * 0.8; } }
        if (!moving) { rest += dt; total = bodies.reduce((s, b) => s + b.face, 0); if (rest > 3.5 && !me.active) { rest = 0; toss(); } } else { rest = 0; total = 0; }
        d.fill(felt);
        for (let y = 0; y < n; y += 3) for (let x = (y / 3 & 1) * 2; x < n; x += 4) d[y * n + x] = feltD;
        X.rect(g, 0, 0, n, 3, rim); X.rect(g, 0, n - 3, n, 3, rim); X.rect(g, 0, 0, 3, n, rim); X.rect(g, n - 3, 0, 3, n, rim);
        X.rect(g, 0, 0, n, 1, rimL); X.rect(g, 0, 0, 1, n, rimL);
        for (const b of bodies) {
          const settled = Math.abs(b.a - Math.round(b.a / (Math.PI / 2)) * Math.PI / 2) < 0.03, h = sz / 2;
          if (settled) {   // square on the grid: shadow, rounded body, a lit top edge, pips
            const x0 = Math.round(b.x - h), y0 = Math.round(b.y - h);
            X.rect(g, x0 + 2, y0 + 2, sz, sz, X.shade(felt, 0.5));
            X.rect(g, x0 + 1, y0, sz - 2, sz, X.shade(b.col, 0.6)); X.rect(g, x0, y0 + 1, sz, sz - 2, X.shade(b.col, 0.6));
            X.rect(g, x0 + 1, y0 + 1, sz - 2, sz - 2, b.col); X.rect(g, x0 + 1, y0 + 1, sz - 2, 1, X.shade(b.col, 1.2));
            const ps = sz >= 14 ? 2 : sz >= 12 ? 2 : 1, step = Math.round(sz * 0.28);
            for (const [u, v] of PIPS[b.face]) X.rect(g, Math.round(b.x + u * step - ps / 2), Math.round(b.y + v * step - ps / 2), ps, ps, b.pip);
          } else {
            const c = Math.cos(b.a), s = Math.sin(b.a), pts = [];
            for (const [u, v] of [[-h, -h], [h, -h], [h, h], [-h, h]]) pts.push(b.x + u * c - v * s, b.y + u * s + v * c);
            X.poly(g, pts.map(v => v + 2), X.shade(felt, 0.5)); X.poly(g, pts, b.col);
            for (const [u, v] of PIPS[b.face]) { const pu = u * sz * 0.27, pv = v * sz * 0.27; X.rect(g, b.x + pu * c - pv * s - 0.8, b.y + pu * s + pv * c - 0.8, 2, 2, b.pip); }
          }
        }
        if (total) { const str = String(total), w = X.textWidth(str); X.rect(g, n / 2 - w / 2 - 2, 4, w + 4, 10, X.shade(felt, 0.55)); X.text(g, str, n / 2 - w / 2, 5, X.rgb(250, 230, 120)); }
      };
    }),
  });

  add({
    name: 'Mahjong', sizes: [100, 200], fps: 12,
    recipe: 'A pyramid of thick tiles with generated faces of dots, sticks and glyphs. Matching free tiles are found, lit and lifted away in pairs until the table is clear, and a new pyramid is laid.',
    make(R, U, g) {
      const { n, d } = g, tw = Math.round(n * 0.085), th = Math.round(n * 0.11), dep = Math.max(1, Math.round(n * 0.012)), sc = U.scheme(R, 0.4);
      const table = U.pk(U.mix(sc.cols[0], [12, 40, 30], 0.7)), faceC = X.rgb(244, 238, 222), sideC = X.rgb(200, 186, 150), backC = U.pk(sc.cols[1 % sc.cols.length]);
      const inkC = [X.rgb(200, 40, 40), X.rgb(30, 110, 60), X.rgb(30, 60, 160), X.rgb(30, 30, 30)];
      let tiles, order, step, timer;
      const layout = () => {
        tiles = []; const layers = [[10, 6], [6, 4], [4, 2], [2, 1]];
        layers.forEach(([w, h], z) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) tiles.push({ i: i + (10 - w) / 2, j: j + (6 - h) / 2, z, alive: true, face: null, lit: 0 }); });
        const freeOf = live => live.filter(a => !live.some(b => b !== a && b.z === a.z + 1 && Math.abs(b.i - a.i) < 1 && Math.abs(b.j - a.j) < 1) && (!live.some(b => b.z === a.z && b.j === a.j && b.i === a.i - 1) || !live.some(b => b.z === a.z && b.j === a.j && b.i === a.i + 1)));
        order = []; let live = tiles.slice();
        while (live.length > 1) { const fr = freeOf(live); if (fr.length < 2) break; R.shuffle(fr); const pair = [fr[0], fr[1]], face = { suit: R.int(0, 3), k: R.int(1, 6), g: R.pick('AEKMRSWXZ#*+'.split('')) }; pair.forEach(p => p.face = face); order.push(pair); live = live.filter(x => !pair.includes(x)); }
        for (const tl of tiles) if (!tl.face) tl.alive = false;
        step = 0; timer = -1;
      };
      layout();
      const ox = (n - 10 * tw) / 2, oy = (n - 6 * th) / 2 + dep * 2;
      return (t, dt) => {
        timer += dt;
        if (timer > 1.1) { timer = 0; if (step < order.length) { order[step].forEach(tl => tl.alive = false); step++; } else layout(); }
        if (step < order.length && timer > 0.5) order[step].forEach(tl => tl.lit = 1);
        d.fill(table);
        const live = tiles.filter(tl => tl.alive).sort((a, b) => a.z - b.z || a.j - b.j || a.i - b.i);
        for (const tl of live) {
          const x = Math.round(ox + tl.i * tw - tl.z * dep * 2), y = Math.round(oy + tl.j * th - tl.z * dep * 2), lit = tl.lit && step < order.length && order[step].includes(tl);
          X.rect(g, x + dep, y + dep, tw, th, sideC); X.rect(g, x + dep * 2, y + dep * 2, tw - dep, th - dep, backC);
          X.rect(g, x, y, tw - 1, th - 1, lit ? X.rgb(255, 250, 190) : faceC);
          const f = tl.face, col = inkC[f.suit], cx = x + (tw - 1) / 2, cy = y + (th - 1) / 2;
          if (n >= 200 || f.suit === 3) { if (f.suit === 3) X.text(g, f.g, cx - 2, cy - 3, col); }
          if (f.suit === 0) for (let k = 0; k < f.k; k++) X.put(g, x + 1 + (k % 3) * Math.max(1, (tw - 3) / 2.5), y + 2 + Math.floor(k / 3) * 2, col);
          if (f.suit === 1) for (let k = 0; k < Math.min(f.k, tw - 3); k++) X.rect(g, x + 1 + k * 1, y + 2, 1, th - 5, k % 2 ? col : X.shade(col, 0.6));
          if (f.suit === 2) { X.disc(g, cx, cy, Math.min(tw, th) * 0.3, col); X.put(g, cx, cy, faceC); }
        }
      };
    },
  });

  // ---------- mancala ----------
  // Mancala (the plank board): seeds per pit, the kind of bead (glass, big marbles or river
  // pebbles) and the cloth under the board
  function mancalaRoll(g) {
    g.trait('Board', 'Plank');
    const seeds = g.trait('Seeds', roll(g, [4, 3, 5, 6], [4, 1, 1, 1]));
    const kind = g.trait('Beads', roll(g, ['Glass', 'Marbles', 'Pebbles'], [4, 2, 2]));
    const cloth = g.trait('Cloth', roll(g, ['Umber', 'Indigo', 'Baize', 'Wine'], [4, 1, 1, 1]));
    const up = g.trait('Orientation', roll(g, ['Across', 'Upright'], [2, 1])) === 'Upright';
    return {
      seeds, up, size: kind === 'Marbles' ? 1.34 : 1,
      col: kind === 'Pebbles' ? (c, dx) => X.shade(X.mixPk(X.rgb(150, 142, 128), c, 0.15), 0.75 + 0.25 * (dx + 1)) : c => c,
      cloth: { Umber: [X.rgb(18, 14, 12), X.rgb(28, 22, 20)], Indigo: [X.rgb(12, 14, 28), X.rgb(22, 26, 48)], Baize: [X.rgb(10, 28, 18), X.rgb(18, 44, 30)], Wine: [X.rgb(30, 10, 16), X.rgb(46, 18, 26)] }[cloth],
    };
  }
  add({
    name: 'Mancala', seed: 4, sizes: [100, 200], fps: 12,
    interactive: 'Your pits are the bottom row: click one to sow its beads.',
    recipe: 'Kalah on a carved board of twelve pits and two stores filled with glass beads: a pit is emptied and its beads sown one at a time round the board, a last bead in your own store earns another turn, and one in your own empty pit captures the pit opposite. Click a bottom pit to play.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.6), wood = U.pk(U.mix([150, 90, 40], sc.cols[0], R.range(0, 0.3))), pitC = X.shade(wood, 0.5), grain = X.shade(wood, 0.85), MK = mancalaRoll(g);
      const pitR = n * 0.075, bs = Math.round(Math.max(3, Math.round(n / 30)) * MK.size), cy = [n * 0.37, n * 0.63], px = k => n * (0.2 + 0.6 * k / 5);
      const centre = i => i < 6 ? [px(i), cy[1]] : i === 6 ? [n * 0.91, n * 0.5] : i < 13 ? [px(12 - i), cy[0]] : [n * 0.09, n * 0.5];
      let pits, hand, side, idle;
      const bead = () => { const c = U.pk(sc.cols[R.int(0, sc.cols.length - 1)]), dx = R.range(-1, 1), dy = R.range(-1, 1); return { c: MK.col(c, dx), dx, dy }; };
      const reset = () => { pits = Array.from({ length: 14 }, (_, i) => i === 6 || i === 13 ? [] : Array.from({ length: MK.seeds }, bead)); hand = null; side = 0; idle = 1; };
      reset();
      let lastTap = -1e9, clock = 0;   // the viewer's hand: the machine waits on their side while they play
      return (t, dt) => {
        clock += dt;
        const taps = MK.up ? g.input.taps().map(p => ({ x: p.y, y: p.x })) : g.input.taps(); if (taps.length) lastTap = clock;
        for (const tp of taps) { if (hand || side !== 0) break; for (let i = 0; i < 6; i++) { const [cx, cy0] = centre(i); if (Math.hypot(tp.x * n - cx, tp.y * n - cy0) < pitR + 2 && pits[i].length) { hand = { beads: pits[i].splice(0), at: i, timer: 0 }; break; } } }
        idle -= dt;
        if (!hand && idle <= 0 && !(side === 0 && clock - lastTap < 8)) {
          const mine = [0, 1, 2, 3, 4, 5].map(k => k + side * 7).filter(i => pits[i].length);
          if (!mine.length) reset();
          else { const from = R.pick(mine); hand = { beads: pits[from].splice(0), at: from, timer: 0 }; }
        } else if (hand && (hand.timer += dt) > 0.22) {
          hand.timer = 0; hand.at = (hand.at + 1) % 14;
          if (hand.at === (side ? 6 : 13)) hand.at = (hand.at + 1) % 14;
          pits[hand.at].push(hand.beads.shift());
          if (!hand.beads.length) { hand = null; side ^= 1; idle = 0.6; }
        }
        d.fill(MK.cloth[0]);
        for (let y = 0; y < n; y += 2) for (let x = (y >> 1) & 1; x < n; x += 3) d[y * n + x] = MK.cloth[1];   // a woven tablecloth
        X.rect(g, n * 0.02 + 1, n * 0.22 + 2, n * 0.96, n * 0.56, X.rgb(8, 6, 6));   // the board's shadow
        X.rect(g, n * 0.02, n * 0.22, n * 0.96, n * 0.56, wood);
        for (let y = Math.round(n * 0.24); y < n * 0.76; y += 3) X.rect(g, n * 0.02, y, n * 0.96, 1, grain);
        for (let i = 0; i < 14; i++) {
          const [cx, cy0] = centre(i), store = i === 6 || i === 13;
          if (store) X.poly(g, [cx - pitR, n * 0.3, cx + pitR, n * 0.3, cx + pitR, n * 0.7, cx - pitR, n * 0.7], pitC); else X.disc(g, cx, cy0, pitR, pitC);
          pits[i].forEach((b, k) => { const spread = store ? [pitR * 0.55, n * 0.16] : [pitR * 0.45, pitR * 0.45]; const bx = cx + b.dx * spread[0], by = cy0 + b.dy * spread[1]; X.rect(g, bx - bs / 2 + 1, by - bs / 2 + 1, bs, bs, X.shade(b.c, 0.35)); X.rect(g, bx - bs / 2, by - bs / 2, bs, bs, b.c); X.put(g, bx - bs / 2, by - bs / 2, X.mixPk(b.c, WHITE, 0.7)); });
        }
        if (hand) { const [cx, cy0] = centre(hand.at); hand.beads.forEach((b, k) => X.rect(g, cx + (k % 4) * bs - bs * 2, cy0 - pitR - bs - 2 - Math.floor(k / 4) * bs, bs - 1, bs - 1, b.c)); }
        X.rect(g, side ? n * 0.1 : n * 0.1, side ? n * 0.25 : n * 0.74, n * 0.8, 1, WHITE);
        if (MK.up) for (let y = 0; y < n; y++) for (let x = y + 1; x < n; x++) { const a = d[y * n + x]; d[y * n + x] = d[x * n + y]; d[x * n + y] = a; }   // the board stood upright
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g, 8), sc = U.scheme(R, 0.5);
      const woods = [[166, 104, 52], [120, 72, 40], [200, 150, 92], [80, 50, 34]], paint = R.bool(0.25), wood = paint ? U.pk(U.mix(sc.cols[0], [40, 30, 30], 0.45)) : rgbA(R.pick(woods));
      const pitC = X.shade(wood, 0.48), pitL = X.shade(wood, 1.25), grain = X.shade(wood, 0.88), table = X.rgb(20, 16, 18);
      const beadKind = R.pick(['glass', 'sides', 'gems']), per = R.int(3, 5);
      const bx0 = 3, by0 = 16, bw = n - 6, bh = n - 32, pitR = 6.5, beadS = 3;
      const px = k => bx0 + 18 + k * ((bw - 36) / 5), rowY = [by0 + bh * 0.72, by0 + bh * 0.28];
      const centre = i => i < 6 ? [px(i), rowY[0]] : i === 6 ? [bx0 + bw - 8, by0 + bh / 2] : i < 13 ? [px(12 - i), rowY[1]] : [bx0 + 8, by0 + bh / 2];
      const glass = sc.cols.map(U.pk), sideC = [U.pk(sc.cols[0]), U.pk(sc.cols[Math.floor(sc.cols.length / 2)])];
      let pits, handB, side, idle, msg = 0;
      g.trait('Board', 'Carved'); g.trait('Wood', paint ? 'Painted' : named(woods, ['Teak', 'Walnut', 'Maple', 'Ebony'], wood)); g.trait('Beads', { glass: 'Glass', sides: 'Two colours', gems: 'Gems' }[beadKind]); g.trait('Seeds', per);
      const bead = i => ({ c: beadKind === 'sides' ? sideC[i < 7 ? 0 : 1] : beadKind === 'gems' ? R.pick([X.rgb(220, 40, 60), X.rgb(40, 180, 90), X.rgb(50, 110, 230), X.rgb(240, 200, 60)]) : R.pick(glass), dx: R.range(-1, 1), dy: R.range(-1, 1) });
      const reset = () => { pits = Array.from({ length: 14 }, (_, i) => i === 6 || i === 13 ? [] : Array.from({ length: per }, () => bead(i))); handB = null; side = 0; idle = 1; };
      reset();
      const store = s => s ? 13 : 6;
      const sow = from => { handB = { beads: pits[from].splice(0), at: from, timer: 0 }; };
      // after the last bead lands: another turn, a capture, or the other side's go
      const land = at => {
        const own = side ? at > 6 && at < 13 : at < 6;
        if (at === store(side)) { idle = 0.5; return; }
        if (own && pits[at].length === 1 && pits[12 - at].length) { pits[store(side)].push(...pits[at].splice(0), ...pits[12 - at].splice(0)); msg = 1; }
        side ^= 1; idle = 0.6;
      };
      const choose = () => {
        const mine = [0, 1, 2, 3, 4, 5].map(k => k + side * 7).filter(i => pits[i].length);
        const lands = i => (i + pits[i].length) % 14;
        return mine.find(i => lands(i) === store(side)) ?? mine.find(i => { const l = lands(i); return pits[i].length < 13 && (side ? l > 6 && l < 13 : l < 6) && !pits[l].length && pits[12 - l].length; }) ?? R.pick(mine);
      };
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) {
          if (handB || side !== 0) break;
          for (let i = 0; i < 6; i++) { const [cx, cy] = centre(i); if (Math.hypot(tp.x * n - cx, tp.y * n - cy) < pitR + 2 && pits[i].length) { sow(i); break; } }
        }
        idle -= dt; msg = Math.max(0, msg - dt);
        if (side === -1) { if (idle <= 0) reset(); }
        else if (!handB && idle <= 0 && !(side === 0 && me.active)) {
          const mine = [0, 1, 2, 3, 4, 5].map(k => k + side * 7).filter(i => pits[i].length);
          if (!mine.length) { idle = 3; pits.forEach((p, i) => { if (i !== 6 && i !== 13 && p.length) pits[i < 6 ? 6 : 13].push(...p.splice(0)); }); side = -1; }
          else sow(choose());
        } else if (handB && (handB.timer += dt) > 0.2) {
          handB.timer = 0; handB.at = (handB.at + 1) % 14;
          if (handB.at === store(side ^ 1)) handB.at = (handB.at + 1) % 14;
          pits[handB.at].push(handB.beads.shift());
          if (!handB.beads.length) { const at = handB.at; handB = null; land(at); }
        }
        d.fill(table);
        for (let y = 0; y < n; y += 2) for (let x = (y >> 1) & 1; x < n; x += 3) d[y * n + x] = X.rgb(28, 22, 24);
        X.rect(g, bx0 + 1, by0 + 2, bw, bh, X.rgb(8, 6, 8));
        X.rect(g, bx0 + 2, by0, bw - 4, bh, wood); X.rect(g, bx0, by0 + 2, bw, bh - 4, wood);
        if (!paint) for (let y = by0 + 2; y < by0 + bh - 2; y += 3) X.rect(g, bx0 + 1, y + ((y * 7) % 2), bw - 2, 1, grain);
        X.rect(g, bx0 + 2, by0, bw - 4, 1, pitL);
        for (let i = 0; i < 14; i++) {
          const [cx, cy] = centre(i), isStore = i === 6 || i === 13;
          if (isStore) { X.rect(g, cx - 5, by0 + 7, 11, bh - 14, pitC); X.rect(g, cx - 4, by0 + 6, 9, bh - 12, pitC); X.rect(g, cx - 4, by0 + bh - 7, 9, 1, pitL); }
          else { X.disc(g, cx, cy, pitR, pitC); X.disc(g, cx + 0.5, cy + 1, pitR - 1.2, X.shade(pitC, 0.85)); }
          const sp = isStore ? [3, bh / 2 - 9] : [pitR * 0.42, pitR * 0.42];
          pits[i].forEach(b => { const bx = Math.round(cx + b.dx * sp[0] - 1), by = Math.round(cy + b.dy * sp[1] - 1); X.rect(g, bx + 1, by + 1, beadS, beadS, X.shade(b.c, 0.35)); X.rect(g, bx, by, beadS, beadS, b.c); X.put(g, bx, by, X.mixPk(b.c, WHITE, 0.7)); });
          const cnt = String(pits[i].length), yy = isStore ? (i === 6 ? by0 + bh + 3 : by0 - 9) : i < 6 ? by0 + bh + 3 : by0 - 9;
          let xx = Math.round(cx - (cnt.length * 4 - 1) / 2);
          for (const chd of cnt) { glyph35(g, chd, xx, yy, i < 7 ? X.rgb(240, 230, 210) : X.rgb(170, 160, 150)); xx += 4; }
        }
        if (handB) { const [cx, cy] = centre(handB.at); handB.beads.forEach((b, k) => X.rect(g, cx + (k % 4) * 4 - 7, cy - pitR - 4 - Math.floor(k / 4) * 4, beadS, beadS, b.c)); }
        if (side >= 0) X.rect(g, bx0 + 14, side ? by0 + 2 : by0 + bh - 3, bw - 28, 1, msg > 0 ? X.rgb(255, 220, 90) : X.rgb(240, 236, 226));
        if (g.input.inside && side === 0 && !handB) for (let i = 0; i < 6; i++) { const [cx, cy] = centre(i); if (Math.hypot(g.input.x * n - cx, g.input.y * n - cy) < pitR + 2) X.disc(g, cx, cy, pitR + 1, (x, y) => Math.hypot(x + 0.5 - cx, y + 0.5 - cy) > pitR ? X.rgb(255, 230, 120) : d[y * n + x]); }
      };
    }, g => g.n === 100),
  });

  // ---------- memory ----------
  // the original dotted card back, diagonal stripes, or an inset frame round a diamond
  function memBack(g, kind, x0, y, w, cw, c) {
    if (kind === 'Dotted') { for (let yy = y + 2; yy < y + cw - 2; yy += 2) for (let xx = x0 + ((yy >> 1) & 1); xx < x0 + w; xx += 2) X.put(g, xx, yy, c); return; }
    for (let yy = y + 2; yy < y + cw - 2; yy++) for (let xx = x0 + 1; xx < x0 + w - 1; xx++) {
      const u = xx - x0, v = yy - y;
      const on = kind === 'Striped' ? (u + v) % 4 < 2 : (u === 2 || v === 3 || u === w - 3 || v === cw - 4) && u >= 2 && v >= 3 && u <= w - 3 && v <= cw - 4 || Math.abs(u - w / 2 + 0.5) + Math.abs(v - cw / 2 + 0.5) < cw * 0.18;
      if (on) X.put(g, xx, yy, c);
    }
  }
  const ICONS = [
    spr(['..#..', '.###.', '#####', '.###.', '..#..']), spr(['#...#', '.#.#.', '..#..', '.#.#.', '#...#']), spr(['.###.', '#...#', '#...#', '#...#', '.###.']),
    spr(['#####', '#...#', '#...#', '#...#', '#####']), spr(['..#..', '..#..', '#####', '..#..', '..#..']), spr(['.#.#.', '#####', '#####', '.###.', '..#..']),
    spr(['..#..', '.#.#.', '#...#', '#####', '.....']), spr(['#.#.#', '.#.#.', '#.#.#', '.#.#.', '#.#.#']), spr(['###..', '#....', '###..', '..#..', '###..']),
  ];
  add({
    name: 'Memory', sizes: [100, 200], fps: 12,
    interactive: 'Click cards to turn them over and find the pairs.',
    recipe: 'Concentration played by a player with a perfect memory: two cards are turned at a time with a flip that squeezes them edgeways, pairs it has seen are claimed at once, and the table fills with matched faces. Grid, card backs and faces change with every deal; click the cards to play yourself.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, k = 6, cw = Math.floor(n / k), sc = U.scheme(R, 0.5), backC = U.pk(sc.cols[0]), backD = X.shade(backC, 0.6), table = X.rgb(26, 22, 30);
      let cards, known, picks, timer, phase;
      const backs = g.trait('Backs', roll(g, ['Dotted', 'Striped', 'Framed'], [3, 2, 2])); g.trait('Grid', '6 x 6'); g.trait('Faces', 'Creatures'); g.trait('Palette', palName(sc));
      const newGame = () => {
        const faces = Array.from({ length: k * k / 2 }, () => ({ s: X.mirrorSprite(R, 5, 5, 0.55, 0.2), c: U.pk(sc.cols[R.int(0, sc.cols.length - 1)]) }));
        cards = R.shuffle(faces.concat(faces).map((f, i) => ({ f, id: faces.indexOf(f), up: 0, target: 0, done: false })));
        known = new Map(); picks = []; timer = 0; phase = 0;
      };
      newGame();
      let lastTap = -1e9, clock = 0;   // the viewer's hand: the machine waits on their side while they play
      return (t, dt) => {
        clock += dt;
        const taps = g.input.taps(); if (taps.length) lastTap = clock;
        const human = clock - lastTap < 8;
        for (const tp of taps) {
          if (picks.length === 2) { const [a, b] = picks; if (cards[a].id === cards[b].id) cards[a].done = cards[b].done = true; else cards[a].target = cards[b].target = 0; picks = []; }
          const i = Math.min(k - 1, tp.y * k | 0) * k + Math.min(k - 1, tp.x * k | 0);
          if (!cards[i].done && !picks.includes(i)) { picks.push(i); cards[i].target = 1; known.set(i, cards[i].id); timer = 0; }
        }
        timer += dt;
        if (timer > (human ? 0.8 : 0.5) && !(human && picks.length < 2)) {
          timer = 0;
          if (cards.every(c => c.done)) { if (phase++ > 3) newGame(); }
          else if (picks.length === 2) {
            const [a, b] = picks;
            if (cards[a].id === cards[b].id) { cards[a].done = cards[b].done = true; } else { cards[a].target = cards[b].target = 0; }
            picks = [];
          } else {
            const hidden = cards.map((c, i) => i).filter(i => !cards[i].done && !picks.includes(i));
            let pick = null;
            if (picks.length === 1) { const want = cards[picks[0]].id; for (const i of hidden) if (known.get(i) === want) pick = i; }
            else for (const [i, id] of known) if (!cards[i].done) for (const [j, id2] of known) if (j !== i && id2 === id && !cards[j].done) pick = i;
            if (pick === null) { const unseen = hidden.filter(i => !known.has(i)); pick = R.pick(unseen.length ? unseen : hidden); }
            picks.push(pick); cards[pick].target = 1; known.set(pick, cards[pick].id);
          }
        }
        d.fill(table);
        cards.forEach((c, i) => {
          c.up += (c.target || c.done ? 1 : 0) > c.up ? Math.min(dt * 4, 1 - c.up) : -Math.min(dt * 4, c.up);
          const x = (i % k) * cw, y = Math.floor(i / k) * cw, w = Math.max(1, Math.round((cw - 2) * Math.abs(Math.cos(c.up * Math.PI)))), showFace = c.up > 0.5;
          const x0 = x + 1 + Math.round(((cw - 2) - w) / 2);
          X.rect(g, x0, y + 1, w, cw - 2, showFace ? (c.done ? X.rgb(205, 200, 190) : X.rgb(245, 242, 232)) : backC);
          if (!showFace) memBack(g, backs, x0, y, w, cw, backD);
          else if (w > 6) X.stamp(g, c.f.s, x + Math.round((cw - 5 * Math.max(1, Math.floor(cw / 8))) / 2), y + Math.round((cw - 5 * Math.max(1, Math.floor(cw / 8))) / 2), [0, c.f.c, X.shade(c.f.c, 0.5)], false, Math.max(1, Math.floor(cw / 8)));
          if (w > 2) { const cc = showFace ? (c.done ? X.rgb(205, 200, 190) : X.rgb(245, 242, 232)) : backC; X.rect(g, x0, y + 1, w, 1, X.mixPk(cc, WHITE, 0.35)); X.rect(g, x0, y + cw - 2, w, 1, X.shade(cc, 0.62)); }
        });
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g, 8), k = R.pick([4, 4, 6, 6]), cw = Math.floor(n / k), off = Math.floor((n - cw * k) / 2), sc = U.scheme(R, 0.5);
      const backA = U.pk(sc.cols[0]), backB = U.pk(U.mix(sc.cols[0], R.bool() ? [255, 255, 255] : [0, 0, 0], 0.35)), backKind = R.int(0, 3);
      const tables = [[26, 22, 30], [14, 40, 30], [40, 20, 24], [16, 22, 44]], table = rgbA(R.pick(tables)), faceKind = R.pick(['creatures', 'icons', 'creatures']);
      const scale = Math.max(1, Math.floor((cw - 6) / (faceKind === 'icons' ? 5 : 7)));
      let cards, known, picks, timer, phase;
      g.trait('Grid', k + ' x ' + k); g.trait('Backs', ['Diagonal', 'Checks', 'Dots', 'Diamond'][backKind]); g.trait('Faces', faceKind === 'icons' ? 'Icons' : 'Creatures'); g.trait('Table', named(tables, ['Plum', 'Green', 'Wine', 'Navy'], table));
      const newGame = () => {
        const faces = Array.from({ length: k * k / 2 }, (_, i) => ({ s: faceKind === 'icons' ? ICONS[i % ICONS.length] : X.mirrorSprite(R, 7, 7, 0.55, 0.25), c: U.pk(sc.cols[(i + 1) % sc.cols.length]), c2: U.pk(sc.cols[(i + 3) % sc.cols.length]) }));
        if (faceKind === 'icons') faces.forEach((f, i) => { f.c = X.hsbPk(i / faces.length * 100, 75, 85); });
        cards = R.shuffle(faces.concat(faces).map(f => ({ f, id: faces.indexOf(f), up: 0, target: 0, done: false })));
        known = new Map(); picks = []; timer = 0; phase = 0;
      };
      newGame();
      const settle = () => {
        const [a, b] = picks;
        if (cards[a].id === cards[b].id) cards[a].done = cards[b].done = true; else cards[a].target = cards[b].target = 0;
        picks = [];
      };
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) {
          if (picks.length === 2) { settle(); timer = 0; }
          const cx = Math.floor((tp.x * n - off) / cw), cy = Math.floor((tp.y * n - off) / cw), i = cy * k + cx;
          if (cx >= 0 && cy >= 0 && cx < k && cy < k && !cards[i].done && !picks.includes(i)) { picks.push(i); cards[i].target = 1; known.set(i, cards[i].id); timer = 0; }
        }
        timer += dt;
        if (picks.length === 2 && timer > 0.8) { settle(); timer = 0; }
        else if (timer > 0.5 && !me.active) {
          timer = 0;
          if (cards.every(c => c.done)) { if (phase++ > 4) newGame(); }
          else if (picks.length < 2) {
            const hidden = cards.map((c, i) => i).filter(i => !cards[i].done && !picks.includes(i));
            let pick = null;
            if (picks.length === 1) { const want = cards[picks[0]].id; for (const i of hidden) if (known.get(i) === want) pick = i; }
            else for (const [i, id] of known) if (!cards[i].done) for (const [j, id2] of known) if (j !== i && id2 === id && !cards[j].done) pick = i;
            if (pick === null) { const unseen = hidden.filter(i => !known.has(i)); pick = R.pick(unseen.length ? unseen : hidden); }
            picks.push(pick); cards[pick].target = 1; known.set(pick, cards[pick].id);
          }
        } else if (me.active && cards.every(c => c.done) && timer > 3) newGame();
        d.fill(table);
        cards.forEach((c, i) => {
          c.up += (c.target || c.done ? 1 : 0) > c.up ? Math.min(dt * 5, 1 - c.up) : -Math.min(dt * 5, c.up);
          const x = off + (i % k) * cw, y = off + Math.floor(i / k) * cw, w = Math.max(1, Math.round((cw - 2) * Math.abs(Math.cos(c.up * Math.PI)))), showFace = c.up > 0.5;
          const x0 = x + 1 + Math.round(((cw - 2) - w) / 2), hover = g.input.inside && Math.floor((g.input.x * n - off) / cw) === i % k && Math.floor((g.input.y * n - off) / cw) === Math.floor(i / k);
          X.rect(g, x0 + 1, y + 2, w, cw - 2, X.shade(table, 0.5));
          if (showFace) {
            X.rect(g, x0, y + 1, w, cw - 2, c.done ? X.rgb(222, 216, 204) : X.rgb(248, 245, 236));
            if (w > cw * 0.6) { const fs = faceKind === 'icons' ? 5 : 7, o = Math.round((cw - fs * scale) / 2); X.stamp(g, c.f.s, x + o, y + o, [0, c.f.c, c.f.c2], false, scale); }
          } else {
            X.rect(g, x0, y + 1, w, cw - 2, hover ? X.shade(backA, 1.25) : backA);
            for (let yy = y + 3; yy < y + cw - 3; yy++) for (let xx = x0 + 2; xx < x0 + w - 2; xx++) {
              const u = xx - x0, v = yy - y, on = backKind === 0 ? (u + v) % 4 < 2 : backKind === 1 ? (u >> 1 ^ v >> 1) & 1 : backKind === 2 ? u % 3 === 1 && v % 3 === 1 : Math.abs(u - w / 2) + Math.abs(v - cw / 2) < cw * 0.3;
              if (on) d[yy * n + xx] = backB;
            }
            X.rect(g, x0, y + 1, w, 1, X.shade(backA, 1.3));
          }
        });
      };
    }),
  });

  // ---------- jigsaw ----------
  add({
    name: 'Jigsaw', seed: 2, sizes: [50], fps: 12,
    interactive: 'Drag a loose piece onto its place.',
    recipe: 'A pixel picture (a landscape, a synthwave sunset, blocks, a creature or a sunburst) cut into tabbed jigsaw pieces. The pieces lie scattered over the table and fly in one by one until the picture is whole; then it is broken up and done again. Drag the pieces in yourself.',
    make(R, U, g) {
      const { n, d } = g, me = hand(g, 6), m = 40, o = 5, k = R.pick([3, 4, 4, 5]), s = m / k, img = pictureT(R, m, g), tr = s * 0.22;
      const owner = new Int16Array(m * m), hT = Array.from({ length: k * (k - 1) }, () => R.sign()), vT = Array.from({ length: k * (k - 1) }, () => R.sign());
      for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
        let i = Math.floor(x / s), j = Math.floor(y / s);
        const lx = x + 0.5 - i * s, ly = y + 0.5 - j * s;
        if (i < k - 1 && Math.hypot(lx - s, ly - s / 2) < tr && hT[j * (k - 1) + i] < 0) i++;
        else if (i > 0 && Math.hypot(lx, ly - s / 2) < tr && hT[j * (k - 1) + i - 1] > 0) i--;
        else if (j < k - 1 && Math.hypot(lx - s / 2, ly - s) < tr && vT[i * (k - 1) + j] < 0) j++;
        else if (j > 0 && Math.hypot(lx - s / 2, ly) < tr && vT[i * (k - 1) + j - 1] > 0) j--;
        owner[y * m + x] = j * k + i;
      }
      const pieces = Array.from({ length: k * k }, (_, p) => ({ px: [], hx: o + (p % k) * s, hy: o + Math.floor(p / k) * s, x: 0, y: 0, fx: 0, fy: 0, placed: false, fly: -1 }));
      for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
        const q = owner[y * m + x], pc = pieces[q], edge = (x && owner[y * m + x - 1] !== q) || (y && owner[(y - 1) * m + x] !== q), edge2 = (x < m - 1 && owner[y * m + x + 1] !== q) || (y < m - 1 && owner[(y + 1) * m + x] !== q);
        pc.px.push(Math.round(o + x - pc.hx), Math.round(o + y - pc.hy), edge ? X.shade(img[y * m + x], 1.3) : edge2 ? X.shade(img[y * m + x], 0.6) : img[y * m + x]);
      }
      const tables = [[120, 84, 54], [92, 98, 104], [60, 92, 70], [128, 70, 64], [70, 76, 120]], table = rgbA(R.pick(tables)), slot = X.shade(table, 0.55);
      let order = [], phase = 'scatter', timer = 0, held = null, top = [];
      g.trait('Pieces', k + ' x ' + k); g.trait('Table', named(tables, ['Oak', 'Slate', 'Green', 'Clay', 'Blue'], table));
      const scatter = () => {
        pieces.forEach(p => { const a = R.range(0, TAU), r = R.range(0.3, 0.42) * n; p.fx = p.x; p.fy = p.y; p.tx = Math.round(n / 2 - s / 2 + Math.cos(a) * r * 0.9); p.ty = Math.round(n / 2 - s / 2 + Math.sin(a) * r * 0.9); p.placed = false; p.fly = 0; });
        order = R.shuffle(pieces.slice()); top = order.slice(); phase = 'scatter'; timer = 0;
      };
      pieces.forEach(p => { p.x = p.hx; p.y = p.hy; });
      scatter();
      const hit = (p, x, y) => { const u = Math.floor(x - p.x), v = Math.floor(y - p.y); for (let q = 0; q < p.px.length; q += 3) if (p.px[q] === u && p.px[q + 1] === v) return true; return false; };
      const drawP = (p, lift) => { const x = Math.round(p.x), y = Math.round(p.y); if (lift) for (let q = 0; q < p.px.length; q += 3) X.put(g, x + p.px[q] + 1, y + p.px[q + 1] + 1, X.shade(table, 0.45)); for (let q = 0; q < p.px.length; q += 3) X.put(g, x + p.px[q], y + p.px[q + 1], p.px[q + 2]); };
      return (t, dt) => {
        me.step(dt); timer += dt;
        const inp = g.input, mx = inp.x * n, my = inp.y * n;
        if (me.pressed && !held) { for (let i = top.length - 1; i >= 0; i--) { const p = top[i]; if (!p.placed && hit(p, mx, my)) { held = { p, ox: mx - p.x, oy: my - p.y }; top.splice(i, 1); top.push(p); break; } } }
        if (held) {
          held.p.fly = -1; held.p.x = mx - held.ox; held.p.y = my - held.oy;
          if (me.released || !inp.down) { const p = held.p; if (Math.hypot(p.x - p.hx, p.y - p.hy) < 3.5) { p.x = p.hx; p.y = p.hy; p.placed = true; } held = null; }
        }
        if (phase === 'scatter') {
          let busy = false;
          pieces.forEach(p => { if (p.fly >= 0) { p.fly = Math.min(1, p.fly + dt * 1.6); const e = U.smooth(p.fly); p.x = p.fx + (p.tx - p.fx) * e; p.y = p.fy + (p.ty - p.fy) * e - Math.sin(e * Math.PI) * 4; if (p.fly >= 1) p.fly = -1; else busy = true; } });
          if (!busy && timer > 1.2) { phase = 'solve'; timer = 0; }
        } else if (phase === 'solve') {
          const flying = pieces.find(p => p.fly >= 0);
          if (flying) { flying.fly = Math.min(1, flying.fly + dt * 1.5); const e = U.smooth(flying.fly); flying.x = flying.fx + (flying.hx - flying.fx) * e; flying.y = flying.fy + (flying.hy - flying.fy) * e - Math.sin(e * Math.PI) * s * 0.5; if (flying.fly >= 1) { flying.fly = -1; flying.placed = true; flying.x = flying.hx; flying.y = flying.hy; } }
          else if (timer > 0.5 && !me.active) { const next = order.find(p => !p.placed && (!held || held.p !== p)); if (next) { next.fly = 0; next.fx = next.x; next.fy = next.y; top.splice(top.indexOf(next), 1); top.push(next); timer = 0; } }
          if (pieces.every(p => p.placed)) { phase = 'done'; timer = 0; }
        } else if (phase === 'done' && timer > 3 && !me.active) scatter();
        d.fill(table);
        for (let y = 0; y < n; y += 2) for (let x = (y >> 1) & 1; x < n; x += 3) d[y * n + x] = X.shade(table, 0.9);
        X.rect(g, o - 1, o - 1, m + 2, m + 2, X.shade(table, 0.55)); X.rect(g, o, o, m, m, slot);
        const done = phase === 'done';
        for (const p of pieces) if (p.placed && !(held && held.p === p)) { const x = Math.round(p.x), y = Math.round(p.y); for (let q = 0; q < p.px.length; q += 3) X.put(g, x + p.px[q], y + p.px[q + 1], done ? img[(y + p.px[q + 1] - o) * m + x + p.px[q] - o] : p.px[q + 2]); }
        for (const p of top) if (!p.placed && !(held && held.p === p)) drawP(p, p.fly >= 0);
        if (held) drawP(held.p, true);
      };
    },
  });

  // ---------- sliding puzzle ----------
  add({
    name: 'Sliding Puzzle', sizes: [40, 50], fps: 12,
    interactive: 'Click a tile in line with the gap to slide it.',
    recipe: 'A fifteen puzzle made from a pixel picture: it scrambles itself with a long random walk of the gap, then plays the walk backwards, tiles gliding into place, until the picture is whole for a moment. Click tiles to slide them; the machine undoes your moves too when it takes over.',
    make(R, U, g) {
      const { n, d } = g, me = hand(g, 6), k = n === 50 ? 5 : R.pick([4, 4, 5]), s = n / k, img = pictureT(R, n, g), mt = 0.16, edgeKind = R.int(0, 2);
      g.trait('Tiles', k + ' x ' + k); g.trait('Edges', ['Numbered', 'Dark seams', 'Bevelled'][edgeKind]);
      const at = Array.from({ length: k * k }, (_, i) => i), hist = [];
      let gap = k * k - 1, phase = 'solved', timer = 0, anim = null, queue = [], target = R.int(40, 90), prev = -1;
      at[gap] = -1;
      const nbrs = c => { const x = c % k, y = Math.floor(c / k), o = []; if (x) o.push(c - 1); if (x < k - 1) o.push(c + 1); if (y) o.push(c - k); if (y < k - 1) o.push(c + k); return o; };
      // move the gap to a neighbouring cell: the tile there glides into the old gap
      const slide = (c, record) => { anim = { tile: at[c], from: c, to: gap, u: 0 }; at[gap] = at[c]; at[c] = -1; if (record) hist.push(gap); prev = gap; gap = c; };
      return (t, dt) => {
        me.step(dt); timer += dt;
        for (const tp of me.taps) {
          const cx = Math.min(k - 1, tp.x * k | 0), cy = Math.min(k - 1, tp.y * k | 0), gx = gap % k, gy = Math.floor(gap / k);
          if (phase === 'solved') { phase = 'play'; at[gap] = -1; }
          if (queue.length > 12) continue;
          if (cx === gx && cy !== gy) { const st = Math.sign(cy - gy); for (let y = gy + st; y !== cy + st; y += st) queue.push(y * k + gx); }
          else if (cy === gy && cx !== gx) { const st = Math.sign(cx - gx); for (let x = gx + st; x !== cx + st; x += st) queue.push(gy * k + x); }
        }
        if (anim) { anim.u += dt / mt; if (anim.u >= 1) anim = null; }
        if (!anim && queue.length) { const c = queue.shift(); if (nbrs(gap).includes(c)) slide(c, true); }
        else if (!anim && !me.active) {
          if (phase === 'solved' && timer > 2.2) { phase = 'scramble'; target = R.int(40, 90); }
          else if (phase === 'scramble') { if (hist.length >= target) { phase = 'hold'; timer = 0; } else slide(R.pick(nbrs(gap).filter(c => c !== prev)), true); }
          else if ((phase === 'hold' && timer > 0.8) || phase === 'play') phase = 'solve';
          else if (phase === 'solve') { if (hist.length) slide(hist.pop(), false); else { phase = 'solved'; timer = 0; } }
        }
        const whole = phase === 'solved' && !anim;
        d.fill(BLACK);
        for (let c = 0; c < k * k; c++) {
          let tile = at[c];
          if (tile < 0) { if (!whole) continue; tile = k * k - 1; }
          let x = (c % k) * s, y = Math.floor(c / k) * s;
          if (anim && anim.tile === tile) { const e = U.smooth(Math.min(1, anim.u)); x = ((anim.from % k) + ((anim.to % k) - (anim.from % k)) * e) * s; y = (Math.floor(anim.from / k) + (Math.floor(anim.to / k) - Math.floor(anim.from / k)) * e) * s; }
          const sx = (tile % k) * s, sy = Math.floor(tile / k) * s; x = Math.round(x); y = Math.round(y);
          for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) {
            let c0 = img[(sy + yy) * n + sx + xx];
            if (!whole) {
              if (xx === 0 || yy === 0) c0 = edgeKind === 2 ? X.rgb(20, 20, 24) : X.shade(c0, 1.45);
              else if (xx === s - 1 || yy === s - 1) c0 = edgeKind === 1 ? X.rgb(12, 12, 16) : X.shade(c0, 0.5);
            }
            X.put(g, x + xx, y + yy, c0);
          }
          if (!whole && edgeKind === 0 && s >= 10) {   // the tile's number, lightly printed so the picture still shows through
            const num = String(tile + 1); let tx = x + 1;
            for (const ch of num) { const rows = R35[ch]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) { const px = tx + b, py = y + 1 + r; if (px >= 0 && py >= 0 && px < n && py < n) d[py * n + px] = X.mixPk(d[py * n + px], WHITE, 0.6); } tx += 4; }
          }
        }
      };
    },
  });
})();
