// Set 3 · Glyphs: bitmap type used as the picture itself: boards, signs,
// terminals, tapes and grids of letters, all on the cell grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Glyphs' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // Variety: a weighted pick from g.alt for a new trait; the opening variation always gets the first
  // value (the original look), so it never changes. list = [[value, weight], ...]
  const vary = (g, list) => { if (g.home) return list[0][0]; let tot = 0; for (const e of list) tot += e[1]; let r = g.alt() * tot; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
  // the name of the palette X.inks rolled (any order), or Rainbow for the native hue wheel
  const inkName = cols => { for (const p of U.PALETTES) { const s = p.cols.map(U.pk); if (s.length === cols.length && s.every(c => cols.includes(c))) return p.name; } return 'Rainbow'; };
  const WORDS = ['HUE', 'ECHO', 'VOID', 'PRISM', 'SPIRAL', 'STRATA', 'EMBER', 'DECAY', 'CASCADE', 'AXON', 'NEON', 'DRIFT', 'BLOOM', 'PULSE', 'ORBIT', 'STATIC', 'VELVET', 'CITRUS', 'BASS', 'TREBLE', 'CYMBAL', 'TEMPO', 'GRAIN', 'DAWN', 'NOON', 'DEEP'];
  const ALPHA = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:';
  const pad = (s, k) => (s + ' '.repeat(k)).slice(0, k);
  const glyph = (ch, r, b) => ((X.FONT[ch] || X.FONT['?'])[r] >> (4 - b)) & 1;
  // a new page slides down over the old one: start() keeps the last frame, apply() runs after drawing
  const wiper = g => {
    const prev = new Uint32Array(g.n * g.n);
    let w = -1;
    return {
      start() { prev.set(g.d); w = 0; },
      apply(step) {
        if (w < 0) return;
        const n = g.n, y0 = Math.max(0, Math.floor(w));
        for (let y = y0; y < n; y++) g.d.set(prev.subarray(y * n, y * n + n), y * n);
        if (y0 < n) for (let x = 0; x < n; x++) g.d[y0 * n + x] = X.shade(g.d[y0 * n + x], 0.55);
        w += step; if (w > n) w = -1;
      },
    };
  };
  // one split-flap tile, 5 x 8 cells with its top-left glyph cell at (x0, y0): a lighter
  // upper flap, a dark hinge across the middle, a darker lower flap, a gap all round
  const flapTile = (g, x0, y0, c) => { X.rect(g, x0, y0 - 1, 5, 4, X.shade(c, 1.18)); X.rect(g, x0, y0 + 3, 5, 1, X.shade(c, 0.35)); X.rect(g, x0, y0 + 4, 5, 3, X.shade(c, 0.85)); };

  // Departures: one board for every look. Layout Board is the original sixteen-by-eleven board;
  // Split carries a second heading halfway down with its own rows; Gate is a single departure
  // on big double-size flaps. The flaps riffle at the same pace in all three.
  function departBoard(R, g, L) {
    const { n, d } = g, layout = vary(g, [['Board', 3], ['Split', 1.5], ['Gate', 1.5]]);
    g.trait('Board', L.style); g.trait('Layout', layout); g.trait('Heading', L.head.trim()); g.trait('Palette', L.palette);
    let clock = R.int(5, 20) * 60 + R.int(0, 11) * 5;
    const hhmm = () => String((clock / 60 | 0) % 24).padStart(2, '0') + ':' + String(clock % 60).padStart(2, '0');
    const line = () => { clock += R.pick([5, 5, 10, 15]); return pad(hhmm() + ' ' + R.pick(WORDS.filter(w => w.length <= 7)), 14) + R.pick('ABCDEF') + R.int(1, 9); };
    const glyphAt = (ch, x0, y0, col, s) => { for (let y = 0; y < 7; y++) for (let x = 0; x < 5; x++) if (glyph(ch, y, x)) { const c = y === 3 || (L.rail && (x + y) % 2) ? X.shade(col, 0.55) : col; if (s === 1) X.put(g, x0 + x, y0 + y, c); else X.rect(g, x0 + x * s, y0 + y * s, s, s, c); } };
    const step = (cur, target, r, c, f) => { const want = ALPHA.indexOf(target[r][c]), k = cur[r][c]; if (k !== want && (f + c + r) % 2 === 0) cur[r][c] = (k + 1) % ALPHA.length; return k !== want; };
    if (layout === 'Gate') {
      // one departure on big flaps: gate, time, destination, status, platform; then the next
      const STATUS = [['BOARDING', X.rgb(110, 230, 130)], ['ON TIME', L.platC], ['ON TIME', L.platC], ['DELAYED', X.rgb(255, 100, 80)], ['FINAL', L.amber]];
      let st = STATUS[0], hue = L.inks[0];
      const next = () => { clock += R.pick([5, 10, 15]); st = R.pick(STATUS); hue = L.inks[R.int(0, L.inks.length - 1)]; const gate = R.pick('ABCDEF') + R.int(1, 9); return [pad('GATE ' + gate, 8), pad(hhmm(), 8), pad(R.pick(WORDS.filter(w => w.length <= 8)), 8), pad(st[0], 8), pad('PLAT ' + R.int(1, 9), 8)]; };
      let target = next();
      const cur = target.map(s => [...s].map(() => R.int(0, ALPHA.length - 1)));
      let wait = 0;
      return (t, dt, f) => {
        d.fill(L.boardC);
        let moving = 0;
        for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) {
          if (step(cur, target, r, c, f)) moving++;
          const x0 = 2 + c * 12, y0 = 4 + r * 19;
          X.rect(g, x0, y0 - 1, 10, 8, X.shade(L.flapC, 1.18)); X.rect(g, x0, y0 + 7, 10, 1, X.shade(L.flapC, 0.35)); X.rect(g, x0, y0 + 8, 10, 7, X.shade(L.flapC, 0.85));
          glyphAt(ALPHA[cur[r][c]], x0, y0, r === 0 ? L.amber : r === 1 ? L.timeC : r === 2 ? hue : r === 3 ? st[1] : L.platC, 2);
        }
        if (!moving && ++wait > 72) { wait = 0; target = next(); }
      };
    }
    const cols = 16, rows = 11, split = layout === 'Split', heads = [0, split ? 6 : -1];
    const other = L.head.includes('ARRIVALS') ? '  DEPARTURES' : '   ARRIVALS';
    const target = Array.from({ length: rows }, (_, r) => r === 0 ? pad(L.head, 16) : r === heads[1] ? pad(other, 16) : line());
    const cur = target.map(s => [...s].map(() => R.int(0, ALPHA.length - 1)));
    const hues = target.map(() => L.inks[R.int(0, L.inks.length - 1)]);
    let wait = 0, half = 0;
    return (t, dt, f) => {
      d.fill(L.boardC);
      let moving = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        if (step(cur, target, r, c, f)) moving++;
        const x0 = 2 + c * 6, y0 = 2 + r * 9;   // eleven rows fit the board with a gap between tiles
        flapTile(g, x0, y0, L.flapC);
        const head = r === 0 || r === heads[1];
        glyphAt(ALPHA[cur[r][c]], x0, y0, head ? L.amber : c >= 14 ? L.platC : c < 5 ? L.timeC : hues[r], 1);
      }
      if (!moving && ++wait > 72) {   // the settled board stays readable a while before the next row leaves
        wait = 0;
        if (!split) { target.splice(1, 1); target.push(line()); hues.splice(1, 1); hues.push(L.inks[R.int(0, L.inks.length - 1)]); }
        else if ((half ^= 1)) { target.splice(1, 1); target.splice(5, 0, line()); hues.splice(1, 1); hues.splice(5, 0, L.inks[R.int(0, L.inks.length - 1)]); }
        else { target.splice(7, 1); target.push(line()); hues.splice(7, 1); hues.push(L.inks[R.int(0, L.inks.length - 1)]); }
      }
    };
  }

  add({
    name: 'Departures', seed: 1, sizes: [100], fps: 12,
    recipe: 'A split-flap board where every destination is a word from the collection. Each minute a row leaves, the rest move up, and every flap riffles through the alphabet to its new letter. Station black and white, airport blue and yellow, an orange rail board or a rainbow one.',
    make: fork(function og(R, U, g) {
      const inks = X.inks(R, 6, 0.5);
      return departBoard(R, g, { style: 'Station', inks, amber: X.rgb(255, 176, 40), boardC: X.rgb(14, 14, 16), flapC: X.rgb(30, 30, 33), timeC: WHITE, platC: X.rgb(120, 220, 255), head: '  DEPARTURES', palette: inkName(inks) });
    }, function alt(R, U, g) {
      const style = R.pick(['rainbow', 'classic', 'airport', 'rail']);
      const inks = style === 'rainbow' ? X.inks(R, 6, 0.5) : style === 'classic' ? [WHITE] : style === 'airport' ? [X.rgb(255, 214, 40)] : [X.rgb(255, 140, 30)], amber = style === 'airport' ? WHITE : X.rgb(255, 176, 40);
      const boardC = style === 'airport' ? X.rgb(8, 22, 58) : style === 'rail' ? X.rgb(6, 6, 6) : X.rgb(14, 14, 16), flapC = style === 'airport' ? X.rgb(18, 36, 80) : style === 'rail' ? X.rgb(14, 12, 10) : X.rgb(30, 30, 33);
      const timeC = style === 'rainbow' ? WHITE : inks[0], platC = style === 'rainbow' ? X.rgb(120, 220, 255) : inks[0], head = R.pick(['  DEPARTURES', '  DEPARTURES', '   ARRIVALS', '  DEPARTS AT', '  NEXT TRAINS']);
      return departBoard(R, g, { style: { rainbow: 'Rainbow', classic: 'Classic', airport: 'Airport', rail: 'Rail' }[style], inks, amber, boardC, flapC, timeC, platC, head, rail: style === 'rail', palette: style === 'rainbow' ? inkName(inks) : { classic: 'White', airport: 'Yellow', rail: 'Orange' }[style] });
    }),
  });

  add({
    name: 'Word Search', seed: 2, sizes: [100], fps: 10,
    recipe: 'A grid of letters with the collection’s words hidden across, down and diagonally. One by one each word is found and ringed in its own colour, until the page is full and a new puzzle is set.',
    make(R, U, g) {
      const { n, d } = g, C = 16, Rr = 12, ox = 2, oy = 2, paper = R.bool(0.5), inks = X.inks(R, 7, 0.6);
      // traits: how found words are marked, which ways the words run, the page and the inks
      const marker = g.trait('Marker', vary(g, [['Highlight', 3], ['Outline', 2], ['Strike', 1.5], ['Inked', 1.5]]));
      const ways = g.trait('Directions', vary(g, [['Mixed', 3], ['Across and down', 1.5], ['Diagonal', 1]]));
      const DIRS = ways === 'Mixed' ? [[1, 0], [0, 1], [1, 1], [1, -1], [-1, 0]] : ways === 'Diagonal' ? [[1, 1], [1, -1], [1, 1], [1, -1], [-1, -1]] : [[1, 0], [0, 1], [1, 0], [0, 1], [1, 0]];
      g.trait('Page', paper ? 'Paper' : 'Night'); g.trait('Palette', inkName(inks));
      let grid, found, list, step;
      const build = () => {
        grid = Array.from({ length: Rr }, () => new Array(C).fill(''));
        list = [];
        for (const w of R.shuffle(WORDS.slice())) {
          for (let tries = 0; tries < 30; tries++) {
            const [dx, dy] = R.pick(DIRS), x = R.int(0, C - 1), y = R.int(0, Rr - 1);
            const ex = x + dx * (w.length - 1), ey = y + dy * (w.length - 1);
            if (ex < 0 || ey < 0 || ex >= C || ey >= Rr) continue;
            let ok = true; for (let k = 0; k < w.length; k++) { const c = grid[y + dy * k][x + dx * k]; if (c && c !== w[k]) { ok = false; break; } }
            if (!ok) continue;
            for (let k = 0; k < w.length; k++) grid[y + dy * k][x + dx * k] = w[k];
            list.push({ w, x, y, dx, dy, col: inks[list.length % inks.length] }); break;
          }
          if (list.length >= 9) break;
        }
        for (const row of grid) for (let i = 0; i < C; i++) if (!row[i]) row[i] = String.fromCharCode(65 + R.int(0, 25));
        found = 0; step = 0;
      };
      build();
      const W = wiper(g);
      return (t, dt, f) => {
        if (found > list.length + 3) { W.start(); build(); }
        d.fill(paper ? X.rgb(236, 230, 214) : X.rgb(16, 16, 22));
        step++;
        if (step % 22 === 0) found++;
        const show = Math.min(found, list.length);
        for (let i = 0; i < show; i++) {
          const q = list[i], len = i === found - 1 ? Math.min(1, (step % 22) / 12) * (q.w.length - 1) : q.w.length - 1, col = paper ? X.mixPk(q.col, WHITE, 0.45) : X.shade(q.col, 0.45);
          const ax = ox + q.x * 6 + 2, ay = oy + q.y * 8 + 3, bx = ox + (q.x + q.dx * len) * 6 + 2, by = oy + (q.y + q.dy * len) * 8 + 3;
          if (marker === 'Highlight') for (let o = -2; o <= 2; o++) for (let p = -1; p <= 1; p++) X.line(g, ax + p, ay + o, bx + p, by + o, col);
          else if (marker === 'Outline') { const ring = paper ? X.shade(q.col, 0.8) : q.col; X.line(g, ax - 1, ay - 5, bx + 1, by - 5, ring); X.line(g, ax - 1, ay + 5, bx + 1, by + 5, ring); X.line(g, Math.min(ax, bx) - 4, ay - 4, Math.min(ax, bx) - 4, ay + 4, ring); X.line(g, Math.max(ax, bx) + 4, by - 4, Math.max(ax, bx) + 4, by + 4, ring); }
        }
        const plain = paper ? X.rgb(40, 36, 50) : X.rgb(200, 200, 210);
        let hit = null;
        if (marker === 'Inked') { hit = new Map(); for (let i = 0; i < show; i++) { const q = list[i], len = i === found - 1 ? Math.round(Math.min(1, (step % 22) / 12) * (q.w.length - 1)) : q.w.length - 1; for (let k = 0; k <= len; k++) hit.set((q.y + q.dy * k) * C + q.x + q.dx * k, paper ? X.shade(q.col, 0.75) : q.col); } }
        for (let y = 0; y < Rr; y++) for (let x = 0; x < C; x++) X.text(g, grid[y][x], ox + x * 6, oy + y * 8, hit && hit.get(y * C + x) || plain);
        if (marker === 'Strike') for (let i = 0; i < show; i++) { const q = list[i], len = i === found - 1 ? Math.min(1, (step % 22) / 12) * (q.w.length - 1) : q.w.length - 1, c = paper ? X.shade(q.col, 0.7) : q.col; X.line(g, ox + q.x * 6 + 2, oy + q.y * 8 + 3, ox + (q.x + q.dx * len) * 6 + 2, oy + (q.y + q.dy * len) * 8 + 3, c); X.line(g, ox + q.x * 6 + 2, oy + q.y * 8 + 4, ox + (q.x + q.dx * len) * 6 + 2, oy + (q.y + q.dy * len) * 8 + 4, c); }
        W.apply(9);
      };
    },
  });

  add({
    name: 'Marquee', seed: 3, sizes: [100], fps: 12,
    recipe: 'A theatre sign spelled in bulbs, each letter pixel a lamp. Waves of light roll through the letters and chase round the border.',
    make(R, U, g) {
      const { n, d } = g, msgs = R.shuffle(['SEE', 'HEAR', 'TONIGHT', 'NEON', 'LIVE', 'ECHO', 'ENCORE', 'PRISM', 'BLOOM']).slice(0, 2);
      const warm = R.bool(0.6) ? X.rgb(255, 214, 120) : X.hsbPk(R.range(0, 100), 60, 100), panel = X.hsbPk(R.range(0, 100), 75, 16), mode = R.int(0, 2), sp = R.range(1.5, 3);
      const lamp = (x, y, b) => { b = Math.min(1, b * 1.15); X.put(g, x, y, b > 0.8 ? X.mixPk(warm, WHITE, (b - 0.8) * 2.5) : X.mixPk(X.shade(warm, 0.22), warm, b / 0.8)); };
      return (t) => {
        d.fill(BLACK); X.rect(g, 3, 11, n - 6, n - 22, panel);
        let k = 0;
        for (let i = 0; i < 2; i++) {
          const m = msgs[i], wpx = m.length * 12 - 2, x0 = (n - wpx) >> 1, y0 = 22 + i * 32;
          for (let c = 0; c < m.length; c++) for (let r = 0; r < 7; r++) for (let b = 0; b < 5; b++) if (glyph(m[c], r, b)) {
            const x = x0 + c * 12 + b * 2, y = y0 + r * 2, ph = mode === 0 ? x * 0.08 : mode === 1 ? (x + y) * 0.06 : Math.hypot(x - n / 2, y - n / 2) * 0.09;
            lamp(x, y, Math.max(0.6, 0.75 + 0.5 * Math.sin(ph - t * sp))); k++;
          }
        }
        const a = n - 10, b = n - 26, per = 2 * a + 2 * b;
        for (let s = 0; s < per; s += 2) {
          let x, y;
          if (s < a) { x = 5 + s; y = 13; } else if (s < a + b) { x = n - 6; y = 13 + s - a; } else if (s < 2 * a + b) { x = n - 6 - (s - a - b); y = n - 13; } else { x = 5; y = n - 13 - (s - 2 * a - b); }
          lamp(x, y, (s / 2 + Math.floor(t * 5)) % 3 === 0 ? 1 : 0.2);
        }
      };
    },
  });

  add({
    name: 'Letter Stacks', seed: 4, sizes: [100], fps: 12,
    interactive: 'Click a chute to drop the next letter into it.',
    recipe: 'Big letters drift down eight chutes and stack. When a row fills, it glows and melts away, and the stack sinks. Letters come from the collection\'s words; click a chute to drop the next one where you want it.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, cols = 16, rows = 12, inks = X.inks(R, 6, 0.5), grid = Array.from({ length: rows }, () => new Array(cols).fill(null));
      g.trait('Letters', 'Small'); g.trait('Chutes', 16); g.trait('Style', 'Plain'); g.trait('Ground', 'Ink'); g.trait('Palette', inkName(inks));
      const fall = [];
      let src = '', fade = -1, melt = false;
      for (let r = rows - 7; r < rows; r++) for (let c = 0; c < cols; c++) if (R() < (r === rows - 1 ? 0.85 : 0.5) && (r === rows - 1 || grid[r + 1] && grid[r + 1][c] || r === rows - 1)) grid[r][c] = { ch: R.pick(ALPHA.slice(1, 27)), col: inks[R.int(0, inks.length - 1)] };
      for (let c = 0; c < cols; c++) for (let r = rows - 2; r >= 0; r--) if (grid[r][c] && !grid[r + 1][c]) { grid[r + 1][c] = grid[r][c]; grid[r][c] = null; }
      const feed = () => { if (!src.length) src = R.shuffle(WORDS.slice()).join(' ').replace(/ /g, ''); const ch = src[0]; src = src.slice(1); return ch; };
      return (t, dt, f) => {
        d.fill(X.rgb(10, 10, 14));
        // the chute under the pointer (or a waved hand) is marked, so a click lands where you expect
        if (g.input.inside) { const c = Math.min(cols - 1, Math.floor(g.input.x * cols)), x0 = 2 + c * 6; X.rect(g, x0 - 1, 0, 7, n, X.rgb(17, 17, 24)); X.rect(g, x0, 0, 5, 1, X.rgb(170, 170, 190)); X.rect(g, x0 + 1, 1, 3, 1, X.rgb(170, 170, 190)); X.put(g, x0 + 2, 2, X.rgb(170, 170, 190)); }
        for (const tp of g.input.taps()) if (fall.length < 24) fall.push({ c: Math.min(cols - 1, Math.floor(tp.x * cols)), y: -8, ch: ALPHA[1 + Math.floor(g.alt() * 26)], col: inks[Math.floor(g.alt() * inks.length)] });
        if (f % 2 === 0 && fall.length < 10 && !melt) { const c = R.int(0, cols - 1); fall.push({ c, y: -8, ch: feed(), col: inks[R.int(0, inks.length - 1)] }); }
        for (let i = fall.length - 1; i >= 0; i--) {
          const q = fall[i]; q.y += 2;
          let top = rows; while (top > 0 && grid[top - 1][q.c]) top--;
          for (let r = 0; r < rows; r++) if (grid[r][q.c]) { top = r; break; }
          const land = 4 + (top - 1) * 8;
          if (top === 0) { fall.splice(i, 1); continue; }
          if (q.y >= land) { grid[top - 1][q.c] = { ch: q.ch, col: q.col }; fall.splice(i, 1); }
          else X.text(g, q.ch, 2 + q.c * 6, q.y, X.shade(q.col, 0.7));
        }
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const s = grid[r][c]; if (s) X.text(g, s.ch, 2 + c * 6, 4 + r * 8, r === rows - 1 && fade >= 0 ? X.mixPk(s.col, WHITE, Math.sin(fade / 30 * Math.PI)) : s.col); }
        // a full row glows and melts; when the stack reaches the top, rows melt away one after another
        if (fade < 0 && (grid[rows - 1].every(Boolean) || melt && grid[rows - 1].some(Boolean))) fade = 0;
        if (fade >= 0 && (fade += melt ? 3 : 1) > 30) { grid.pop(); grid.unshift(new Array(cols).fill(null)); fade = -1; }
        if (grid[0].filter(Boolean).length > 10) melt = true;
        if (melt && !grid[rows - 1].some(Boolean)) melt = false;
      };
    }, function alt(R, U, g) {
      const { n, d } = g, cols = 8, rows = 6, inks = X.inks(R, 6, 0.5), grid = Array.from({ length: rows }, () => new Array(cols).fill(null)), bg = R.pick([X.rgb(10, 10, 14), X.rgb(18, 10, 30), X.rgb(6, 20, 24), X.rgb(240, 236, 226)]), tiles = R.bool(0.5);
      g.trait('Letters', 'Big'); g.trait('Chutes', 8); g.trait('Style', tiles ? 'Tiles' : 'Plain'); g.trait('Ground', ['Ink', 'Plum', 'Teal', 'Paper'][[X.rgb(10, 10, 14), X.rgb(18, 10, 30), X.rgb(6, 20, 24), X.rgb(240, 236, 226)].indexOf(bg)]); g.trait('Palette', inkName(inks));
      const fall = [];
      let src = '', fade = -1, melt = false;
      for (let r = rows - 3; r < rows; r++) for (let c = 0; c < cols; c++) if (R() < (r === rows - 1 ? 0.85 : 0.5) && (r === rows - 1 || grid[r + 1] && grid[r + 1][c] || r === rows - 1)) grid[r][c] = { ch: R.pick(ALPHA.slice(1, 27)), col: inks[R.int(0, inks.length - 1)] };
      for (let c = 0; c < cols; c++) for (let r = rows - 2; r >= 0; r--) if (grid[r][c] && !grid[r + 1][c]) { grid[r + 1][c] = grid[r][c]; grid[r][c] = null; }
      const feed = () => { if (!src.length) src = R.shuffle(WORDS.slice()).join(' ').replace(/ /g, ''); const ch = src[0]; src = src.slice(1); return ch; };
      const K = Math.max(1, Math.round(n / 50));   // drawn on a 50-cell layout, blown up on bigger grids
      const at = (c, r, s, col) => { if (tiles) { X.rect(g, (c * 6) * K, (r - 1) * K, 7 * K, 9 * K, X.shade(col, 0.35)); X.text(g, s, (1 + c * 6) * K, r * K, X.mixPk(col, WHITE, 0.3), K); } else X.text(g, s, (1 + c * 6) * K, r * K, col, K); };
      return (t, dt, f) => {
        d.fill(bg);
        if (g.input.inside) { const c = Math.min(cols - 1, Math.floor(g.input.x * cols)), mk = X.lum(bg) > 0.5 ? X.shade(bg, 0.6) : X.mixPk(bg, WHITE, 0.6); X.rect(g, c * 6 * K, 0, 7 * K, n, X.lum(bg) > 0.5 ? X.shade(bg, 0.95) : X.mixPk(bg, WHITE, 0.04)); for (let k = 0; k < 3; k++) X.rect(g, (c * 6 + 1 + k) * K, k * K, (5 - 2 * k) * K, K, mk); }
        for (const tp of g.input.taps()) { const c = Math.min(cols - 1, Math.floor(tp.x * cols)); if (fall.length < 16) fall.push({ c, y: -8, ch: feed(), col: inks[R.int(0, inks.length - 1)] }); }
        if (f % 4 === 0 && fall.length < 4 && !g.input.down && !melt) { const c = R.int(0, cols - 1); fall.push({ c, y: -8, ch: feed(), col: inks[R.int(0, inks.length - 1)] }); }
        for (let i = fall.length - 1; i >= 0; i--) {
          const q = fall[i]; q.y += 2;
          let top = rows; while (top > 0 && grid[top - 1][q.c]) top--;
          for (let r = 0; r < rows; r++) if (grid[r][q.c]) { top = r; break; }
          const land = 2 + (top - 1) * 8;
          if (top === 0) { fall.splice(i, 1); continue; }
          if (q.y >= land) { grid[top - 1][q.c] = { ch: q.ch, col: q.col }; fall.splice(i, 1); }
          else at(q.c, q.y, q.ch, X.shade(q.col, 0.8));
        }
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const s = grid[r][c]; if (s) at(c, 2 + r * 8, s.ch, r === rows - 1 && fade >= 0 ? X.mixPk(s.col, WHITE, Math.sin(fade / 30 * Math.PI)) : s.col); }
        if (fade < 0 && (grid[rows - 1].every(Boolean) || melt && grid[rows - 1].some(Boolean))) fade = 0;
        if (fade >= 0 && (fade += melt ? 3 : 1) > 30) { grid.pop(); grid.unshift(new Array(cols).fill(null)); fade = -1; }
        if (grid[0].filter(Boolean).length > 5) melt = true;
        if (melt && !grid[rows - 1].some(Boolean)) melt = false;
      };
    }),
  });

  add({
    name: 'Terminal', seed: 5, sizes: [100], fps: 10,
    listens: 'The meters show the sound in the room, low to high, and every clap is logged.',
    recipe: 'A text-mode screen in one phosphor: boxed panels, a scrolling log of invented process names, meters that rise and fall and a blinking cursor.',
    make(R, U, g) {
      const { n, d } = g, ink = R.pick([X.rgb(255, 180, 60), X.rgb(80, 255, 120), X.rgb(120, 200, 255), X.hsbPk(R.range(0, 100), 50, 100)]), dim = X.shade(ink, 0.35), bg = X.shade(ink, 0.06);
      const syl = ['AX', 'ON', 'HU', 'E', 'PRI', 'SM', 'DEC', 'AY', 'NE', 'ON', 'VO', 'ID', 'ST', 'RA', 'TA', 'EM', 'BER'];
      const word = () => Array.from({ length: R.int(2, 3) }, () => R.pick(syl)).join('').slice(0, 7);
      const log = Array.from({ length: 6 }, () => pad(word(), 8) + R.pick(['OK', 'RUN', 'WAIT', '...']));
      const meters = Array.from({ length: 4 }, () => ({ v: R(), s: R.range(0.3, 0.9), p: R() * 9 }));
      const box = (x, y, w, h) => { X.line(g, x, y, x + w, y, dim); X.line(g, x, y + h, x + w, y + h, dim); X.line(g, x, y, x, y + h, dim); X.line(g, x + w, y, x + w, y + h, dim); };
      // the prompt: the 5 x 7 font has no '>', so it is drawn here
      const GT = [8, 4, 2, 1, 2, 4, 8], prompt = (x, y, c) => { for (let r = 0; r < 7; r++) for (let b = 0; b < 5; b++) if (GT[r] >> (4 - b) & 1) X.put(g, x + b, y + r, c); };
      let lev = 0, clapWait = 0;
      // traits: the phosphor, how the screen is laid out, and the glass it is shown on
      const PH = [[X.rgb(255, 180, 60), 'Amber'], [X.rgb(80, 255, 120), 'Green'], [X.rgb(120, 200, 255), 'Blue']], phos = (PH.find(p => p[0] === ink) || [0, 'Tinted'])[1];
      const layout = g.trait('Layout', vary(g, [['Classic', 3], ['Monitor', 1.5], ['Split', 1.5]])), screen = g.trait('Screen', vary(g, [['Scanlines', 4], ['Clean', 2], ['Curved', 2], ['LCD', 1]]));
      g.trait('Phosphor', screen === 'LCD' ? 'LCD' : phos);
      const lcd = screen === 'LCD', INK = lcd ? X.rgb(34, 44, 40) : ink, BG = lcd ? X.mixPk(X.rgb(184, 196, 166), ink, 0.12) : bg, DIM = lcd ? X.mixPk(BG, INK, 0.45) : dim, LOW = lcd ? X.mixPk(BG, INK, 0.12) : X.shade(ink, 0.14);
      const box2 = (x, y, w, h) => { X.line(g, x, y, x + w, y, DIM); X.line(g, x, y + h, x + w, y + h, DIM); X.line(g, x, y, x, y + h, DIM); X.line(g, x + w, y, x + w, y + h, DIM); };
      const hist = new Float32Array(90);
      const glass = () => {
        if (screen === 'Scanlines') for (let y = 0; y < n; y += 2) for (let x = 0; x < n; x++) { const i = y * n + x; d[i] = X.shade(d[i], 0.82); }
        else if (screen === 'Curved') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x, u = (x - n / 2) / (n / 2), v = (y - n / 2) / (n / 2), r = u * u * u * u + v * v * v * v; d[i] = r > 1.15 ? 0xff000000 : X.shade(d[i], (y & 1 ? 1 : 0.86) * (1 - 0.45 * r)); }
        else if (lcd) for (let y = 0; y < n; y += 3) for (let x = 0; x < n; x++) { const i = y * n + x; d[i] = X.shade(d[i], 0.96); }
      };
      if (layout === 'Monitor') return (t, dt, f) => {
        // a scrolling trace of the system's load (the room's loudness while listening), the newest log line below
        const inp = g.input, hear = inp.listening;
        d.fill(BG);
        box2(1, 1, n - 3, 22); X.text(g, 'SYNAE OS', 4, 4, INK);
        if (hear) { lev += (inp.level - lev) * 0.5; X.text(g, 'MIC ' + String(Math.min(99, Math.round(lev * 99))).padStart(2, '0'), 4, 13, (f >> 2) & 1 ? INK : DIM); } else X.text(g, String(f).padStart(5, '0'), 4, 13, DIM);
        X.text(g, 'LOAD', 70, 4, DIM);
        hist.copyWithin(0, 1); hist[89] = hear ? U.clamp(lev * 1.2) : U.clamp(0.5 + 0.25 * Math.sin(t * meters[0].s * 2 + meters[0].p) + 0.15 * Math.sin(t * meters[1].s * 5 + meters[1].p) + 0.08 * Math.sin(t * 7.3 + meters[2].p));
        X.text(g, String(Math.round(hist[89] * 99)).padStart(2, '0') + '%', 70, 13, INK);
        box2(1, 26, n - 3, 54);
        for (let y = 34; y < 79; y += 9) for (let x = 4; x < 95; x += 3) X.put(g, x, y, LOW);
        for (let k = 0; k < 90; k++) { const h = Math.round(hist[k] * 48), x = 4 + k; if (h > 0) { X.rect(g, x, 78 - h, 1, h, X.mixPk(BG, INK, 0.25)); X.put(g, x, 78 - h, INK); } }
        if (hear) { clapWait--; if (inp.beats() && clapWait <= 0) { clapWait = 3; log.shift(); log.push(pad('CLAP', 8) + 'HEARD'); } }
        if (f % 14 === 0) { log.shift(); log.push(pad(word(), 8) + R.pick(['OK', 'RUN', 'WAIT', '...', 'DONE'])); }
        box2(1, 83, n - 3, 14); prompt(4, 87, INK); X.text(g, log[log.length - 1], 10, 87, INK);
        if ((f >> 3) & 1) X.rect(g, 4 + 6 * 15, 87, 5, 7, INK);
        glass();
      };
      if (layout === 'Split') return (t, dt, f) => {
        // a tall log on the left, four tall meters on the right and a spinner below them
        const inp = g.input, hear = inp.listening;
        d.fill(BG);
        box2(1, 1, 58, n - 3); X.text(g, 'SYNAE OS', 6, 4, INK); X.line(g, 2, 13, 58, 13, DIM);
        if (hear) { clapWait--; if (inp.beats() && clapWait <= 0) { clapWait = 3; log.shift(); log.push(pad('CLAP', 8) + 'HEARD'); } }
        if (f % 14 === 0) { log.shift(); log.push(pad(word(), 8) + R.pick(['OK', 'RUN', 'WAIT', '...', 'DONE'])); }
        log.forEach((s, i) => { const c = i === log.length - 1 ? INK : DIM, y = 18 + i * 13; prompt(4, y, c); X.text(g, s.slice(0, 7).trim(), 10, y, c); X.rect(g, 53, y + 2, 3, 3, /OK|DONE|HEARD/.test(s) ? INK : LOW); });
        box2(62, 1, 35, 68);
        for (let i = 0; i < 4; i++) {
          const m = meters[i], x = 65 + i * 8;
          let v = 0.5 + 0.45 * Math.sin(t * m.s + m.p);
          if (hear) { m.l = (m.l || 0) + (Math.max(inp.bands[2 * i], inp.bands[2 * i + 1]) - (m.l || 0)) * 0.6; v = U.clamp(m.l * 1.15); }
          X.rect(g, x, 66 - 62 * v, 6, 62 * v, INK); X.rect(g, x, 4, 6, 62 - 62 * v, LOW);
        }
        box2(62, 72, 35, 25);
        const a = f * 0.6; X.line(g, 72 + Math.cos(a) * 5, 84 + Math.sin(a) * 5, 72 - Math.cos(a) * 5, 84 - Math.sin(a) * 5, INK);
        X.text(g, String(f % 100).padStart(2, '0'), 82, 81, DIM);
        glass();
      };
      return (t, dt, f) => {
        const inp = g.input, hear = inp.listening;
        d.fill(BG);
        box2(1, 1, n - 3, 22); X.text(g, 'SYNAE OS', 4, 4, INK);
        if (hear) { lev += (inp.level - lev) * 0.5; X.text(g, 'MIC ' + String(Math.min(99, Math.round(lev * 99))).padStart(2, '0'), 4, 13, (f >> 2) & 1 ? INK : DIM); }
        else X.text(g, String(f).padStart(5, '0'), 4, 13, DIM);
        for (let i = 0; i < 4; i++) {
          const m = meters[i], x = 54 + i * 11;
          let v = 0.5 + 0.45 * Math.sin(t * m.s + m.p);
          if (hear) { m.l = (m.l || 0) + (Math.max(inp.bands[2 * i], inp.bands[2 * i + 1]) - (m.l || 0)) * 0.6; v = U.clamp(m.l * 1.15); }
          X.rect(g, x, 20 - 15 * v, 7, 15 * v, INK); X.rect(g, x, 5, 7, 15 - 15 * v, LOW);
        }
        box2(1, 26, n - 3, 54);
        if (hear) { clapWait--; if (inp.beats() && clapWait <= 0) { clapWait = 3; log.shift(); log.push(pad('CLAP', 8) + 'HEARD'); } }
        if (f % 14 === 0) { log.shift(); log.push(pad(word(), 8) + R.pick(['OK', 'RUN', 'WAIT', '...', 'DONE'])); }
        log.forEach((s, i) => { const c = i === log.length - 1 ? INK : DIM; prompt(4, 29 + i * 8, c); X.text(g, s, 10, 29 + i * 8, c); });
        if ((f >> 3) & 1) X.rect(g, 4 + 6 * 15, 29 + 5 * 8, 5, 7, INK);
        box2(1, 83, n - 3, 14);
        const prog = hear ? U.clamp(lev * 1.3) : (t * 0.07) % 1; X.rect(g, 4, 87, (n - 9) * prog, 7, INK);
        glass();
      };
    },
  });

  add({
    name: 'Spiral Verse', seed: 6, sizes: [200], fps: 12,
    recipe: 'A line of words set letter by letter along a slowly winding curve, each letter upright, its colour sliding along the hue wheel as the curve unwinds.',
    make(R, U, g) {
      const { n, d } = g, str = R.shuffle(WORDS.slice()).join(' · ').replace(/·/g, '-'), kind = R.int(0, 2), sp = R.range(0.05, 0.12) * R.sign();
      const h0 = R.range(0, 100), span = R.pick([30, 60, 100]), bg = R.bool(0.7) ? BLACK : X.hsbPk(h0 + 50, 60, 12);
      return (t) => {
        d.fill(bg);
        let s = 0;
        for (let i = 0; i < 260; i++) {
          let x, y;
          if (kind === 0) { const a = i * 0.11 + t * sp * 4, r = 8 + i * 0.36; x = n / 2 + r * Math.cos(a); y = n / 2 + r * Math.sin(a); }
          else if (kind === 1) { const row = (i / 32) | 0, c = i % 32; x = c * 6.2 + 2; y = 10 + row * 24 + 8 * Math.sin(c * 0.35 + row + t * 0.8); }
          else { const a = i * 0.05 + t * sp; x = n / 2 + (n * 0.44) * Math.sin(3 * a + t * 0.1); y = n / 2 + (n * 0.44) * Math.sin(2 * a); }
          if (x < -6 || y < -8 || x > n || y > n) continue;
          const ch = str[(i + s) % str.length];
          X.text(g, ch, x - 2, y - 3, X.hsbPk(h0 + span * i / 260 + t * 2, 70, 95));
        }
      };
    },
  });

  add({
    name: 'Textured Word', seed: 7, sizes: [100], fps: 12,
    recipe: 'One big bitmap word, every pixel of it a window onto a moving pattern of stripes, checks or ripples, while the background runs the inverse.',
    make(R, U, g) {
      const { n, d } = g, w = R.pick(WORDS.filter(s => s.length <= 5)), s = Math.floor((n - 6) / (w.length * 6)), inks = X.inks(R, 4, 0.5);
      // the two brightest inks go in the letters, the two darkest (dimmed) behind them
      const pat = R.int(0, 3), k = R.range(0.25, 0.6), byLum = inks.slice().sort((p, q) => X.lum(q) - X.lum(p)), a = byLum[0], b = byLum[1], c2 = X.shade(byLum[2] ?? byLum[0], 0.25), c3 = X.shade(byLum[3] ?? byLum[1], 0.35);
      const mask = new Uint8Array(n * n), m = { n, d: mask };
      // layout: one word (the original), two words stacked, or one word drawn tall
      const layout = vary(g, [['Single', 3], ['Stacked', 1.5], ['Tall', 1.5]]);
      const big = (word, x0, y0, sx, sy) => { for (let c = 0; c < word.length; c++) for (let r = 0; r < 7; r++) for (let b = 0; b < 5; b++) if (glyph(word[c], r, b)) X.rect(m, x0 + (c * 6 + b) * sx, y0 + r * sy, sx, sy, 1); };
      let w2 = '';
      if (layout === 'Stacked') {
        const FIT = WORDS.filter(q => q.length <= 5 && q !== w); w2 = FIT[Math.floor(g.alt() * FIT.length)];
        const L = Math.max(w.length, w2.length), sz = Math.max(2, Math.min(Math.floor((n - 6) / (L * 6)), Math.floor((n - 12) / 14))), gap = Math.round(sz * 1.5), top = (n - 14 * sz - gap) >> 1;
        X.text(m, w, (n - (w.length * 6 - 1) * sz) >> 1, top, 1, sz); X.text(m, w2, (n - (w2.length * 6 - 1) * sz) >> 1, top + 7 * sz + gap, 1, sz);
      } else if (layout === 'Tall') { const sy = Math.min(Math.floor((n - 8) / 7), s * 2); big(w, (n - (w.length * 6 - 1) * s) >> 1, (n - 7 * sy) >> 1, s, sy); }
      else X.text(m, w, (n - (w.length * 6 - 1) * s) >> 1, (n - 7 * s) >> 1, 1, s);
      g.trait('Layout', layout); g.trait('Word', w2 ? w + ' ' + w2 : w);
      // a dark keyline round the letters and a drop shadow down and to the right, so the word lifts off the pattern
      const at = (x, y) => x >= 0 && y >= 0 && x < n && y < n && mask[y * n + x] === 1;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        if (mask[y * n + x]) continue;
        let edge = false; for (let dy = -1; dy <= 1 && !edge; dy++) for (let dx = -1; dx <= 1; dx++) if (at(x + dx, y + dy)) { edge = true; break; }
        if (edge) mask[y * n + x] = 2; else if (at(x - 2, y - 2) || at(x - 1, y - 2) || at(x - 2, y - 1)) mask[y * n + x] = 3;
      }
      const key = X.shade(c3, 0.25), drop = 0.45;
      g.trait('Pattern', ['Stripes', 'Checks', 'Rings', 'Waves'][pat]); g.trait('Palette', inkName(inks)); if (pat >= 2) g.trait('Weave', k < 0.37 ? 'Wide' : k < 0.48 ? 'Medium' : 'Fine');
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let v;
          if (pat === 0) v = ((x + y + t * 6) / 4 | 0) & 1;
          else if (pat === 1) v = (((x + t * 3) / 4 | 0) ^ (y / 4 | 0)) & 1;
          else if (pat === 2) v = Math.sin(Math.hypot(x - n / 2, y - n / 2) * k - t * 2) > 0 ? 1 : 0;
          else v = Math.sin(x * k + Math.sin(y * 0.1 + t)) * Math.sin(y * k - t) > 0 ? 1 : 0;
          const mk = mask[y * n + x];
          d[y * n + x] = mk === 1 ? (v ? a : b) : mk === 2 ? key : mk === 3 ? X.shade(v ? c2 : c3, drop) : (v ? c2 : c3);
        }
      };
    },
  });

  add({
    name: 'Neon Script', seed: 8, sizes: [100, 200], fps: 12,
    recipe: 'Words bent from glass tube: the outline of each big letter glows with a soft halo on a dark brick wall, and the colour hums slowly along the tube.',
    make(R, U, g) {
      const { n, d } = g, w = R.pick(WORDS.filter(s => s.length <= 5)), s = Math.max(2, Math.floor((n - 8) / (w.length * 6))), h0 = R.range(0, 100), span = R.pick([0, 20, 40]);
      const mask = new Uint8Array(n * n), m = { n, d: mask }, x0 = (n - (w.length * 6 - 1) * s) >> 1, y0 = (n - 7 * s) >> 1;
      X.text(m, w, x0, y0, 1, s);
      const tube = new Float32Array(n * n).fill(-1), glow = new Float32Array(n * n);
      for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; if (mask[i] && (!mask[i - 1] || !mask[i + 1] || !mask[i - n] || !mask[i + n])) tube[i] = x / n; }
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let best = 99; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const yy = y + dy, xx = x + dx; if (yy >= 0 && xx >= 0 && yy < n && xx < n && tube[yy * n + xx] >= 0) best = Math.min(best, Math.hypot(dx, dy)); } glow[y * n + x] = best < 99 ? Math.max(0, 1 - best / 3.6) : 0; }
      const brick = (x, y) => { const row = y >> 2, off = row & 1 ? 4 : 0; return (y & 3) === 3 || ((x + off) & 7) === 7 ? X.rgb(18, 12, 14) : X.rgb(40, 22, 24); };
      return (t) => {
        const hum = 0.85 + 0.15 * Math.sin(t * 1.3), cx = Array.from({ length: n }, (_, x) => X.hsbPk(h0 + span * Math.sin(x / n * 4 - t * 0.6), 80, 100));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, col = cx[x];
          if (!glow[i] && tube[i] < 0) { d[i] = brick(x, y); continue; }
          d[i] = tube[i] >= 0 ? X.mixPk(col, WHITE, 0.45) : X.mixPk(brick(x, y), col, glow[i] * 0.55 * hum);
        }
      };
    },
  });

  add({
    name: 'Crossword', seed: 9, sizes: [100], fps: 10,
    recipe: 'A symmetric crossword grid fills itself in letter by letter with the collection\'s words, the newest letters warm, then clears and starts a new puzzle.',
    make(R, U, g) {
      const { n, d } = g, N = 11, cs = 9, off = (n - N * cs) >> 1, ink = X.inks(R, 3, 0.5);
      // traits: how many black squares, the paper, and the colour of fresh letters
      const blocks = g.trait('Blocks', vary(g, [['Some', 3], ['Few', 1.5], ['Many', 1.5]])), nb = { Few: 3, Some: 6, Many: 11 }[blocks];
      const paperK = g.trait('Paper', vary(g, [['Cream', 3], ['Newsprint', 1.5], ['Blue', 1], ['Night', 1]]));
      g.trait('Palette', inkName(ink));
      const PP = { Cream: [[20, 20, 24], [232, 228, 216], [244, 236, 200], [0, 0, 0], [30, 30, 30]], Newsprint: [[44, 44, 48], [214, 212, 204], [228, 224, 206], [24, 24, 26], [24, 24, 28]],
        Blue: [[16, 26, 48], [222, 232, 246], [236, 240, 214], [18, 34, 74], [20, 40, 92]], Night: [[10, 10, 14], [30, 32, 46], [48, 50, 70], [4, 4, 8], [216, 222, 236]] }[paperK].map(c => X.rgb(c[0], c[1], c[2]));
      let cells, order, done;
      const build = () => {
        cells = Array.from({ length: N }, () => new Array(N).fill(''));
        const black = Array.from({ length: N }, () => new Array(N).fill(false));
        for (let k = 0; k < nb; k++) { const x = R.int(0, N - 1), y = R.int(0, N - 1); black[y][x] = black[N - 1 - y][N - 1 - x] = true; }
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (black[y][x]) cells[y][x] = '#';
        for (let y = 0; y < N; y++) { let x = 0; while (x < N) { if (cells[y][x] === '#') { x++; continue; } let e = x; while (e < N && cells[y][e] !== '#') e++; while (x < e) { const fit = WORDS.filter(s => s.length <= e - x), ww = fit.length ? R.pick(fit) : ''; if (!ww) { cells[y][x++] = '#'; continue; } for (let k = 0; k < ww.length; k++) cells[y][x + k] = ww[k]; x += ww.length; if (x < e) cells[y][x++] = '#'; } } }
        order = []; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (cells[y][x] !== '#') order.push([x, y]);
        done = 0;
      };
      build();
      let age = new Map();
      const W = wiper(g), paperC = PP[1], wordC = PP[2], blockC = PP[3] === X.rgb(0, 0, 0) ? BLACK : PP[3], letterC = PP[4], cursorC = paperK === 'Night' ? X.mixPk(X.rgb(120, 96, 40), ink[0], 0.25) : X.mixPk(X.rgb(255, 214, 110), ink[0], 0.25);
      return (t, dt, f) => {
        // the finished puzzle rests, then a fresh page slides down over it
        if (f % 2 === 0 && done >= order.length && f - age.get(order.length - 1) > 60) { W.start(); build(); age = new Map(); }
        d.fill(PP[0]);
        if (f % 2 === 0 && done < order.length) { age.set(done, f); done++; }
        const shown = new Set(order.slice(0, done).map(([x, y]) => y * N + x));
        // the word being written: its row run is tinted and the newest square marked
        const cur = done > 0 && done < order.length ? order[done - 1] : null;
        let wa = -1, wb = -1;
        if (cur) { wa = cur[0]; wb = cur[0]; while (wa > 0 && cells[cur[1]][wa - 1] !== '#') wa--; while (wb < N - 1 && cells[cur[1]][wb + 1] !== '#') wb++; }
        let k = 0;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const px = off + x * cs, py = off + y * cs;
          if (cells[y][x] === '#') { X.rect(g, px, py, cs - 1, cs - 1, blockC); continue; }
          X.rect(g, px, py, cs - 1, cs - 1, cur && cur[0] === x && cur[1] === y ? cursorC : cur && cur[1] === y && x >= wa && x <= wb ? wordC : paperC);
          const idx = order.findIndex(([a, b]) => a === x && b === y);
          if (shown.has(y * N + x)) { const a = f - (age.get(idx) || 0); X.text(g, cells[y][x], px + 1, py, a < 20 ? X.mixPk(ink[0], letterC, a / 20) : letterC); }
          k++;
        }
        W.apply(8);
      };
    },
  });

  add({
    name: 'Telegraph', seed: 10, sizes: [100, 200], fps: 12,
    recipe: 'Paper tape runs through a telegraph: words punched as Morse dots and dashes, with the decoded letters printed beneath each one as it passes.',
    make(R, U, g) {
      const { n, d } = g, M = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..' };
      // traits: how many tapes, the tape stock, punched holes or inked marks, and the desk under it
      const fewer = vary(g, [[false, 3], [true, 1.5]]), lanes = g.trait('Tapes', n >= 200 ? (fewer ? 5 : 7) : (fewer ? 3 : 4));
      const stock = g.trait('Tape', vary(g, [['Cream', 3], ['White', 1], ['Pink', 1], ['Blue', 1], ['Ticker green', 1]])), marks = g.trait('Marks', vary(g, [['Punched', 3], ['Inked', 1.5]]));
      const desk = g.trait('Desk', vary(g, [['Plum', 3], ['Walnut', 1.2], ['Slate', 1.2], ['Baize', 1]])), tapes = Array.from({ length: lanes }, (_, i) => {
        const items = []; let x = 0;
        const words = R.shuffle(WORDS.slice());
        for (const w of words) { for (const ch of w) { const code = M[ch] || ''; items.push({ ch, x }); let cx = x; for (const s of code) { items.push({ s, x: cx }); cx += s === '.' ? 3 : 7; } x = Math.max(cx, x + 6) + 3; } x += 8; }
        return { items, len: x, sp: R.range(5, 9), col: X.hsbPk(R.range(0, 100), 70, 90) };
      });
      const TP = { Cream: [236, 226, 200], White: [240, 240, 236], Pink: [242, 214, 214], Blue: [214, 226, 238], 'Ticker green': [212, 230, 200] }[stock], paper = X.rgb(TP[0], TP[1], TP[2]);
      const ink = X.rgb(40, 34, 50), hole = X.rgb(24, 20, 28), DK = { Plum: [30, 26, 36], Walnut: [42, 28, 20], Slate: [24, 28, 34], Baize: [14, 40, 30] }[desk], deskC = X.rgb(DK[0], DK[1], DK[2]);
      const hiC = stock === 'Cream' ? X.rgb(250, 244, 226) : X.mixPk(paper, WHITE, 0.6), loC = stock === 'Cream' ? X.rgb(214, 202, 176) : X.shade(paper, 0.88), sprocket = stock === 'Cream' ? X.rgb(200, 190, 170) : X.shade(paper, 0.82);
      return (t) => {
        d.fill(deskC);
        const lh = Math.floor(n / lanes);
        tapes.forEach((tp, i) => {
          const y0 = i * lh + 3, off = (t * tp.sp) % tp.len;
          X.rect(g, 0, y0, n, lh - 6, paper);
          // the tape's edges catch the light along the top and curl into shadow underneath
          X.rect(g, 0, y0, n, 1, hiC); X.rect(g, 0, y0 + lh - 7, n, 1, loC); X.rect(g, 0, y0 + lh - 6, n, 1, desk === 'Plum' ? X.rgb(20, 17, 24) : X.shade(deskC, 0.6));
          for (let x = 2; x < n; x += 4) X.put(g, x, y0 + 2, sprocket);
          for (const it of tp.items) for (const rep of [0, tp.len]) {
            const x = it.x - off + rep; if (x < -8 || x > n) continue;
            if (it.s) { const c = marks === 'Inked' ? X.shade(tp.col, 0.7) : hole; if (it.s === '.') X.rect(g, x, y0 + 5, 2, 2, c); else X.rect(g, x, y0 + 5, 6, 2, c); }
            else X.text(g, it.ch, x, y0 + 10, x < n * 0.5 ? tp.col : ink);
          }
          X.rect(g, n >> 1, y0 - 2, 1, lh - 2, X.shade(tp.col, 0.8));
          X.rect(g, (n >> 1) - 1, y0 - 2, 3, 2, X.rgb(70, 64, 80)); X.put(g, n >> 1, y0 - 2, X.mixPk(tp.col, WHITE, 0.4));   // the reading head
        });
      };
    },
  });
})();
