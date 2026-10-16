// Set 4 · Sport: games and races, drawn as bold pixel scenes. Each plays
// itself; in the large view several let you take part (aim, shoot, steer).
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Sport' }, def));
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const rgb = X.rgb;
  const sprite = rows => rows.map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : parseInt(ch, 36)));
  // a 3 x 5 font for scoreboards
  const F3 = {
    A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7], F: [7, 4, 6, 4, 4], G: [3, 4, 5, 5, 3],
    H: [5, 5, 7, 5, 5], I: [7, 2, 2, 2, 7], K: [5, 5, 6, 5, 5], L: [4, 4, 4, 4, 7], M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2],
    P: [6, 5, 6, 4, 4], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7], V: [5, 5, 5, 5, 2], W: [5, 5, 7, 7, 5],
    X: [5, 5, 2, 5, 5], Y: [5, 5, 2, 2, 2], 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1],
    5: [7, 4, 6, 1, 6], 6: [3, 4, 7, 5, 7], 7: [7, 1, 1, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 6], ' ': [0, 0, 0, 0, 0], '-': [0, 0, 7, 0, 0],
    '/': [1, 1, 2, 4, 4], '!': [2, 2, 2, 0, 2], ':': [0, 2, 0, 2, 0], '.': [0, 0, 0, 0, 2],
  };
  function txt(g, s, x, y, c) {
    x = Math.round(x); y = Math.round(y);
    for (let k = 0; k < s.length; k++) { const rows = F3[s[k]] || F3[' ']; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) X.put(g, x + b, y + r, c); x += 4; }
    return x;
  }
  const tw = s => s.length * 4 - 1;
  function ellipse(g, cx, cy, rx, ry, c) {
    const { n, d } = g;
    for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(n - 1, Math.ceil(cy + ry)); y++) {
      const v = (y + 0.5 - cy) / ry, w = v * v < 1 ? rx * Math.sqrt(1 - v * v) : -1;
      if (w < 0) continue;
      const x0 = Math.max(0, Math.round(cx - w)), x1 = Math.min(n, Math.round(cx + w));
      for (let x = x0; x < x1; x++) d[y * n + x] = typeof c === 'function' ? c(x, y, d[y * n + x]) : c;
    }
  }
  // a ball in three flat tones, lit from the upper left
  function orb(g, cx, cy, r, col) {
    const { n, d } = g, hi = X.mixPk(col, WHITE, 0.45), lo = X.shade(col, 0.62);
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      if (x < 0 || y < 0 || x >= n || y >= n) continue;
      const nx = (x + 0.5 - cx) / r, ny = (y + 0.5 - cy) / r, q = nx * nx + ny * ny;
      if (q > 1) continue;
      d[y * n + x] = nx + ny < -0.7 ? hi : nx + ny > 0.5 ? lo : col;
    }
  }
  // the pointer in cells; `active` while the viewer is using it, and a few seconds after
  function pointer(g) {
    const st = { px: -1, py: -1, idle: 99, down: false };
    return (dt, n) => {
      const I = g.input, taps = I.taps(), x = I.x * n, y = I.y * n;
      const moved = I.inside && (Math.abs(x - st.px) > 0.05 || Math.abs(y - st.py) > 0.05);
      if (moved || taps.length || I.down) st.idle = 0; else st.idle += dt;
      st.px = x; st.py = y;
      const released = !I.down && st.down; st.down = I.down;
      return { active: st.idle < 5, inside: I.inside, x, y, down: I.down, released, taps: taps.map(q => [q.x * n, q.y * n]) };
    };
  }
  // the microphone, when the viewer has it on: { level, bands, beats } once a frame, else null
  const hear = g => { const I = g.input; return I.listening ? { level: I.level, bands: I.bands, beats: I.beats() } : null; };
  const KITS = [[rgb(230, 40, 50), WHITE], [rgb(30, 90, 220), rgb(255, 220, 40)], [rgb(250, 250, 250), rgb(30, 30, 40)], [rgb(40, 180, 90), rgb(250, 250, 250)], [rgb(255, 150, 30), rgb(40, 30, 90)], [rgb(170, 60, 200), rgb(250, 230, 120)], [rgb(30, 200, 210), rgb(20, 40, 60)], [rgb(250, 210, 40), rgb(200, 20, 40)]];
  const KIT_NAMES = ['Red', 'Blue', 'White', 'Green', 'Orange', 'Purple', 'Teal', 'Yellow'];
  const kitName = k => KIT_NAMES[KITS.indexOf(k)];
  const inkName = cols => { for (const p of U.PALETTES) if (cols.includes(U.pk(p.cols[0]))) return p.name; return 'Spectrum'; };
  // falling snow over a frame (slow, steady flakes; the same pace on every roll)
  function snowfall(g, t, count) {
    const { n } = g;
    for (let k = 0; k < count; k++) { const h = Math.imul(k + 1, 2654435761) >>> 0, x = ((h & 1023) / 1024 * n + Math.sin(t * 0.8 + k) * 1.5 + n) % n, y = ((h >>> 10 & 1023) / 1024 * n + t * (4 + (k % 3) * 2) * n / 80) % n; X.put(g, x, y, k % 4 ? WHITE : rgb(210, 220, 240)); }
  }
  const mirror = (d, n) => { for (let y = 0; y < n; y++) d.subarray(y * n, y * n + n).reverse(); };
  const SKIN = [rgb(255, 214, 170), rgb(230, 170, 120), rgb(170, 110, 70), rgb(110, 70, 45), rgb(250, 200, 160)];

  // ======================================================================
  add({
    name: 'Rally', seed: 2, sizes: [80], fps: 12,
    interactive: 'Move the pointer left and right to run the near player into the ball; it swings by itself when the ball arrives.',
    listens: 'The crowd jumps up when the room gets loud.',
    recipe: 'A tennis rally from behind the baseline that really plays: every shot is aimed, bounces in or goes long or into the net, the players run to meet it, and the scoreboard keeps the game. Grass, clay, hard court or night under lights.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g);
      const SURF = [
        { inC: rgb(84, 160, 70), out: rgb(60, 128, 56), stands: rgb(30, 70, 40), sky: rgb(120, 190, 240) },
        { inC: rgb(210, 104, 58), out: rgb(186, 88, 48), stands: rgb(40, 60, 50), sky: rgb(130, 200, 240) },
        { inC: rgb(46, 104, 196), out: rgb(46, 150, 96), stands: rgb(24, 36, 70), sky: rgb(110, 180, 240) },
        { inC: rgb(112, 70, 176), out: rgb(50, 150, 170), stands: rgb(34, 24, 60), sky: rgb(255, 170, 120) },
        { inC: rgb(36, 84, 160), out: rgb(26, 44, 80), stands: rgb(12, 14, 30), sky: rgb(8, 10, 24), night: true },
      ];
      const surfI = R.int(0, SURF.length - 1), S = SURF[surfI], kitA = R.pick(KITS), kitB = R.pick(KITS.filter(k => k !== kitA)), skinA = R.pick(SKIN), skinB = R.pick(SKIN);
      g.trait('Court', ['Grass', 'Clay', 'Hard', 'Carpet', 'Floodlit'][surfI]); g.trait('Near kit', kitName(kitA)); g.trait('Far kit', kitName(kitB));
      // how full the stands are
      const crowdK = g.trait('Crowd', g.home ? 'Packed' : g.alt.pick(['Packed', 'Packed', 'Sparse', 'Empty'])), fill = crowdK === 'Packed' ? 11 : crowdK === 'Sparse' ? 4 : -1;
      const top = 26, bot = 72, cx = n / 2, wT = 34, wB = 78;
      const pv = v => v / (0.62 + 0.38 * v);          // depth squash: the far half is shorter
      const yOf = v => bot - (bot - top) * pv(v), wOf = y => wB + (wT - wB) * (bot - y) / (bot - top);
      const proj = (u, v, h = 0) => { const y = yOf(v), w = wOf(y); return [cx + u * w / 2, y - h * 26 * (w / wB), w / wB]; };
      // the court, drawn once: stands and crowd, surround, court, lines, net
      const bg = new Uint32Array(n * n), fans = [];
      const crowd = [rgb(240, 80, 80), rgb(250, 220, 90), rgb(90, 160, 250), WHITE, rgb(250, 150, 60), rgb(160, 230, 120)];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = S.out;
        if (y < 8) c = S.sky;
        else if (y < top - 4) { const row = (y - 8) >> 1; const fan = (x + row * 3) % 3 === 0 && (Math.imul(x * 31 + row * 17, 2654435761) >>> 28) < fill; c = fan ? crowd[(x * 7 + row) % crowd.length] : S.stands; if ((y & 1) && x % 2) c = X.shade(c, 0.8); if (fan && !(y & 1) && y > 8) fans.push(y * n + x); }
        else if (y < top - 2) c = rgb(30, 30, 30);
        bg[y * n + x] = c;
      }
      if (S.night) for (const lx of [6, n - 7]) for (let k = 0; k < 4; k++) { bg[(1 + k) * n + lx] = rgb(255, 250, 200); bg[(1 + k) * n + lx + 1] = rgb(255, 250, 200); }
      for (let y = top; y <= bot; y++) {
        const w = wOf(y), x0 = Math.round(cx - w * 0.56), x1 = Math.round(cx + w * 0.56);
        for (let x = x0; x <= x1; x++) bg[y * n + x] = S.inC;
      }
      const vline = (u, v0, v1) => { for (let y = Math.round(yOf(v1)); y <= Math.round(yOf(v0)); y++) { const x = Math.round(cx + u * wOf(y) / 2); if (x >= 0 && x < n) bg[y * n + x] = WHITE; } };
      const hline = (v, u0, u1) => { const y = Math.round(yOf(v)), w = wOf(y); for (let x = Math.round(cx + u0 * w / 2); x <= Math.round(cx + u1 * w / 2); x++) bg[y * n + x] = WHITE; };
      hline(0, -1, 1); hline(1, -1, 1); vline(-1, 0, 1); vline(1, 0, 1); vline(-0.75, 0, 1); vline(0.75, 0, 1);
      hline(0.27, -0.75, 0.75); hline(0.73, -0.75, 0.75); vline(0, 0.27, 0.73);
      const ny = Math.round(yOf(0.5)), nW = wOf(ny);
      // players: little sprites, the near one larger
      const BIG = sprite(['..444..', '..333..', '..333..', '...3...', '.11111.', '1111111', '3.111.3', '3.111.3', '..222..', '..222..', '..3.3..', '..5.5..', '.44.44.']);
      const SMALL = sprite(['.444.', '.333.', '11111', '.111.', '.222.', '.3.3.', '.3.3.', '.4.4.']);
      const hair = [rgb(40, 30, 20), rgb(230, 190, 90), rgb(120, 60, 30), rgb(20, 20, 20)];
      const hA = R.pick(hair), hB = R.pick(hair);
      const pl = [{ u: 0, v: -0.06, col: kitA, skin: skinA, swing: 0 }, { u: 0, v: 1.06, col: kitB, skin: skinB, swing: 0 }];
      let shot = null, score = [0, 0], games = [R.int(0, 5), R.int(0, 5)], server = 0, pause = 1, banner = '', bannerT = 0;
      const PTS = ['0', '15', '30', '40', 'AD'];
      function hit(by, t, serve) {
        const to = 1 - by, err = R() < (serve ? 0.08 : 0.13);
        const tu = R.range(-0.7, 0.7), tv = to === 1 ? R.range(0.62, 0.95) : R.range(0.05, 0.38);
        const bu = serve ? (to === 1 ? R.range(0.05, 0.7) * (server ? -1 : 1) : R.range(-0.7, -0.05)) : tu;
        const bv = serve ? (to === 1 ? R.range(0.52, 0.7) : R.range(0.3, 0.48)) : tv;
        const out = err ? R.pick(['long', 'net', 'wide']) : null;
        const B = out === 'long' ? [bu, to === 1 ? R.range(1.04, 1.15) : R.range(-0.15, -0.04)] : out === 'wide' ? [bu > 0 ? R.range(1.05, 1.2) : R.range(-1.2, -1.05), bv] : out === 'net' ? [bu, 0.5] : [bu, bv];
        const A = [pl[by].u + (by ? -0.1 : 0.12), pl[by].v];
        const C = [B[0] + (B[0] - A[0]) * 0.35, B[1] + (B[1] - A[1]) * 0.35];
        const T1 = R.range(0.75, 1.05) * (serve ? 0.8 : 1), T2 = T1 * 0.45;
        pl[by].swing = 0.35;
        shot = { by, A, B, C, t0: t, T1, T2, out };
      }
      const pointWon = (who, t, why) => {
        const a = who, b = 1 - who;
        banner = why || '';
        if (score[a] === 4 || (score[a] === 3 && score[b] < 3)) { games[a]++; score = [0, 0]; banner = 'GAME'; server = 1 - server; if (games[a] >= 6 && games[a] - games[b] >= 2) { games = [0, 0]; banner = 'SET'; } }
        else if (score[b] === 4) score[b] = 3;
        else score[a]++;
        if (score[0] === 3 && score[1] === 3 && !banner) banner = 'DEUCE';
        bannerT = t; shot = null; pause = 1.4; cheer = Math.max(cheer, banner === 'GAME' || banner === 'SET' ? 1.6 : 0.9);
        pl[0].v = -0.06; pl[1].v = 1.06;
      };
      let cheer = 0;
      return (t, dt) => {
        const p = ptr(dt, n);
        if (!shot) { pause -= dt; if (pause <= 0) { banner = ''; hit(server, t, true); } }
        const ear = hear(g);
        cheer = Math.max(0, cheer - dt);
        if (ear && ear.level > 0.25) cheer = Math.max(cheer, 0.3 + ear.level);
        let bx = 0, by = 0, bh = 0, sx = 0, sy = 0, sc = 1, show = false;
        if (shot) {
          const tt = t - shot.t0, q = shot;
          let u, v, h;
          if (tt < q.T1) { const s = tt / q.T1; u = q.A[0] + (q.B[0] - q.A[0]) * s; v = q.A[1] + (q.B[1] - q.A[1]) * s; h = 0.45 * (1 - s) + 4 * 0.55 * s * (1 - s) + (q.out === 'net' ? -0.3 * s * s : 0); }
          else { const s = (tt - q.T1) / q.T2; u = q.B[0] + (q.C[0] - q.B[0]) * s; v = q.B[1] + (q.C[1] - q.B[1]) * s; h = 4 * 0.32 * s * (1 - s) + 0.25 * s; }
          if (q.out === 'net' && tt >= q.T1) { u = q.B[0]; v = 0.5 - (q.by ? -0.02 : 0.02); h = Math.max(0, 0.2 - (tt - q.T1)); }
          [bx, by, sc] = proj(u, v, Math.max(0, h)); [sx, sy] = proj(u, v, 0); bh = h; show = true;
          // the receiver runs to where the ball will be met
          const rc = pl[1 - q.by];
          if (!(rc === pl[0] && p.active)) rc.u += U.clamp(q.C[0] - rc.u, -dt * 1.3, dt * 1.3);
          else rc.u = U.clamp((p.x - cx) / (wB / 2), -1.3, 1.3);
          if (tt >= q.T1 + q.T2) {
            if (q.out) pointWon(1 - q.by, t, q.out === 'net' ? 'NET' : 'OUT');
            else if (Math.abs(rc.u - q.C[0]) < 0.32) hit(1 - q.by, t, false);
            else pointWon(q.by, t, 'WINNER');
          }
        } else if (p.active) pl[0].u = U.clamp((p.x - cx) / (wB / 2), -1.3, 1.3);
        for (const o of pl) o.swing = Math.max(0, o.swing - dt);
        d.set(bg);
        // the stands: after a point (or while the room is loud) fans hop up out of their seats, a few at a time
        if (cheer > 0) {
          const beat = Math.floor(t * 8), share = Math.min(1, cheer);
          for (let i = 0; i < fans.length; i++) {
            const q = fans[i], h = Math.imul(i + beat * 977, 2654435761) >>> 24;
            if (h < 255 * share * 0.6) { d[q - n] = bg[q]; d[q] = bg[q + n]; d[q + n] = S.stands; }
          }
        }
        // far player, net, ball (behind or in front of the net), near player
        const drawPlayer = (o, near) => {
          const [x, y] = proj(o.u, o.v, 0), spr = near ? BIG : SMALL, w = spr[0].length, h = spr.length;
          ellipse(g, x, y, near ? 4 : 2, near ? 1.4 : 1, X.shade(S.inC, 0.7));
          const x0 = Math.round(x - w / 2), y0 = Math.round(y - h);
          X.stamp(g, spr, x0, y0, [0, o.col[0], o.col[1], o.skin, o === pl[0] ? hA : hB, WHITE]);
          // the racket: held low on the backhand side, swung across on the hit
          const side = o.swing > 0.15 ? 1 : -1, frameC = rgb(30, 30, 40), str = rgb(230, 230, 220);
          if (near) { const rx = side > 0 ? x0 + w : x0 - 3, ry = y0 + (o.swing > 0.15 ? 2 : 5); X.rect(g, rx, ry, 3, 4, frameC); X.put(g, rx + 1, ry + 1, str); X.put(g, rx + 1, ry + 2, str); X.put(g, rx + 1, ry + 4, frameC); }
          else { const rx = side > 0 ? x0 + w : x0 - 1, ry = y0 + 2; X.put(g, rx, ry, frameC); X.put(g, rx, ry + 1, frameC); }
        };
        const ballDraw = () => {
          if (!show) return;
          const big = sc > 0.68, sh = X.shade(S.inC, 0.55), bc = rgb(220, 255, 60);
          X.put(g, sx, sy, sh); if (big) X.put(g, sx + 1, sy, sh);
          X.put(g, bx, by, bc); if (big) { X.put(g, bx + 1, by, bc); X.put(g, bx, by - 1, rgb(250, 255, 180)); X.put(g, bx + 1, by - 1, bc); } else if (sc > 0.5) X.put(g, bx + 1, by, bc);
        };
        drawPlayer(pl[1], false);
        const ballFar = shot && ((t - shot.t0 < shot.T1 ? shot.A[1] + (shot.B[1] - shot.A[1]) * (t - shot.t0) / shot.T1 : shot.B[1]) > 0.5);
        if (ballFar) ballDraw();
        for (let x = Math.round(cx - nW * 0.56); x <= Math.round(cx + nW * 0.56); x++) { X.put(g, x, ny - 3, WHITE); for (let k = 1; k <= 2; k++) if ((x + k) & 1) X.put(g, x, ny - 3 + k, rgb(30, 30, 30)); }
        for (const s2 of [-1, 1]) X.rect(g, Math.round(cx + s2 * nW * 0.57), ny - 4, 1, 4, rgb(60, 60, 60));
        if (!ballFar) ballDraw();
        drawPlayer(pl[0], true);
        // scoreboard
        X.rect(g, 1, 1, 27, 13, rgb(10, 20, 30)); X.rect(g, 1, 1, 27, 1, rgb(255, 200, 40));
        for (let k = 0; k < 2; k++) { X.rect(g, 3, 3 + k * 6, 2, 4, (k ? kitB : kitA)[0]); txt(g, String(games[k]), 7, 3 + k * 6, WHITE); txt(g, PTS[score[k]], 13, 3 + k * 6, rgb(255, 220, 60)); if (server === k) X.put(g, 26, 5 + k * 6, rgb(220, 255, 60)); }
        if (banner && t - bannerT < 1.2) { const w = tw(banner) + 4; X.rect(g, Math.round(cx - w / 2), 15, w, 9, rgb(255, 220, 40)); txt(g, banner, Math.round(cx - w / 2) + 2, 17, BLACK); }
      };
    },
  });

  // ======================================================================
  add({
    name: 'Ten Pin', seed: 4, sizes: [80], fps: 12,
    interactive: 'Click to bowl: where you click across the lane is where the ball is aimed.',
    listens: 'Clap to bowl.',
    recipe: 'Down the lane from behind the bowler: the ball hooks toward the pocket, the pins scatter and fall, the sweep clears the deck and a fresh rack drops, while a clean scoreboard keeps all ten frames. Some lanes glow under black light.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), cosmic = R.bool(0.35);
      const woodI = cosmic ? -1 : R.int(0, 2), wood = cosmic ? [rgb(30, 20, 60), rgb(40, 26, 80)] : [[rgb(222, 170, 110), rgb(206, 152, 94)], [rgb(240, 200, 140), rgb(226, 184, 124)], [rgb(196, 140, 86), rgb(180, 124, 72)]][woodI];
      const ballI = R.int(0, 5), ballCol = [rgb(230, 40, 60), rgb(40, 120, 255), rgb(150, 60, 220), rgb(30, 200, 140), rgb(255, 140, 20), rgb(20, 20, 30)][ballI];
      const glowI = cosmic ? R.int(0, 2) : -1, glow = cosmic ? [rgb(80, 255, 220), rgb(255, 80, 220), rgb(160, 255, 60)][glowI] : null;
      g.trait('Lane', cosmic ? 'Cosmic ' + ['Cyan', 'Magenta', 'Lime'][glowI] : ['Maple', 'Pine', 'Cherry'][woodI]); g.trait('Ball', ['Red', 'Blue', 'Purple', 'Jade', 'Orange', 'Black'][ballI]);
      // bumpers padded along the gutters (a kids' lane), and the pins: the usual ten or thin candlepins
      const bumpers = g.trait('Bumpers', g.home ? 'Off' : g.alt.pick(['Off', 'Off', 'Off', 'On'])) === 'On';
      const candle = g.trait('Pins', g.home ? 'Ten-pin' : g.alt.pick(['Ten-pin', 'Ten-pin', 'Ten-pin', 'Candlepin'])) === 'Candlepin';
      const BUMP = [rgb(255, 80, 120), rgb(255, 220, 60), rgb(60, 200, 255)];
      const yF = 24, yN = n - 1, wF = 14, wN = 44, cx = n / 2;
      const wAt = y => wF + (wN - wF) * (y - yF) / (yN - yF);
      const bg = new Uint32Array(n * n), wall = cosmic ? rgb(10, 6, 24) : rgb(40, 34, 48);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = y < yF ? wall : (cosmic ? rgb(16, 10, 34) : rgb(70, 60, 70));
        if (y >= yF) {
          const w = wAt(y), u = (x - cx) / (w / 2);
          if (Math.abs(u) <= 1) { const board = Math.floor((u + 1) * 9); c = wood[board & 1]; if (cosmic && board % 4 === 0 && ((y + board * 3) % 9) < 2) c = X.shade(glow, 0.6); }
          else if (Math.abs(u) <= 1.25) c = bumpers ? X.shade(BUMP[(y >> 2) % 3], Math.abs(u) < 1.12 ? 1 : 0.7) : cosmic ? rgb(8, 4, 18) : rgb(30, 26, 34);
          else if (Math.abs(u) <= 1.3) c = cosmic ? glow : rgb(120, 110, 120);
        }
        bg[y * n + x] = c;
      }
      // arrows a third of the way down, and the foul line
      const ay = Math.round(yF + (yN - yF) * 0.55);
      for (let k = -3; k <= 3; k++) { const x = Math.round(cx + k * wAt(ay) / 8); for (let r = 0; r < 3; r++) for (let c2 = -r; c2 <= r; c2++) bg[(ay + r) * n + x + c2] = cosmic ? glow : rgb(140, 70, 40); }
      const fy = n - 9; for (let x = Math.round(cx - wAt(fy) / 2); x <= Math.round(cx + wAt(fy) / 2); x++) bg[fy * n + x] = cosmic ? glow : rgb(40, 40, 40);
      // the pin deck: ten pins in a triangle, back row first
      const PIN = sprite(candle ? ['.1.', '.1.', '.2.', '.1.', '.1.', '.1.', '.1.'] : ['.1.', '111', '.2.', '111', '111', '111', '.1.']);
      const LYING = sprite(candle ? ['.........', '.11112111', '.........'] : ['.1111.2.1', '111112111', '.1111.2..'].map(r => r.slice(0, 9)));
      const spots = []; for (let row = 3; row >= 0; row--) for (let k = 0; k <= row; k++) spots.push({ row, x: cx + (k - row / 2) * 4, y: yF - 1 + (3 - row) * 2 });
      let pins, frames = [], frame = 0, roll = 0, ball = null, state = 'aim', timer = 1.2, sweep = 0, flash = '', flashT = 0, aimU = 0;
      const rack = () => { pins = spots.map(s => ({ ...s, up: true, fall: 0, dx: 0, dy: 0 })); };
      rack();
      const standing = () => pins.filter(q => q.up).length;
      function bowl(u) {
        const hook = R.range(0.2, 0.55) * (R.bool(0.85) ? -1 : 1);
        ball = { u0: U.clamp(u, -0.85, 0.85) + 0.25 * hook * -1, hook, s: 0, speed: R.range(0.55, 0.75) };
        state = 'roll';
      }
      function knock() {
        const imp = ball.u0 + ball.hook, pocket = 0.12 * Math.sign(-ball.hook || 1);
        const acc = Math.abs(imp - pocket);
        for (const q of pins) {
          if (!q.up) continue;
          const pu = (q.x - cx) / (wF / 2);
          const fall = acc < 0.08 ? true : Math.abs(pu - imp) < 0.55 - acc * 0.6 + R.range(-0.15, 0.25);
          if (fall) { q.up = false; q.fall = R.range(0, 0.3); q.dx = (pu - imp) * R.range(1.5, 4) + R.range(-1, 1); q.dy = R.range(-2, 0.5); }
        }
      }
      function record(k) {
        const f = frames[frame] || (frames[frame] = []);
        f.push(k);
        const first = f[0];
        const done = frame < 9 ? (first === 10 || f.length === 2) : (f.length === 3 || (f.length === 2 && f[0] + f[1] < 10));
        if (done) { frame++; roll = 0; if (frame >= 10) { frame = 0; frames = []; } return true; }
        roll++; return false;
      }
      const mark = (f, i) => { const v = f[i]; if (v === undefined) return ''; if (v === 10 && (i === 0 || f[i - 1] === 10 || (i === 2 && f[0] + f[1] === 10))) return 'X'; if (i > 0 && f[i - 1] !== 10 && f[i - 1] + v === 10 && (i === 1 || i === 2)) return '/'; return v ? String(v) : '-'; };
      return (t, dt) => {
        const p = ptr(dt, n);
        const ear = hear(g);
        if (state === 'aim') {
          if (ear && ear.beats) bowl(p.active ? aimU : g.alt.range(-0.5, 0.5));
          else if (p.active) { aimU = U.clamp((p.x - cx) / (wN / 2), -1, 1); for (const [x] of p.taps) { bowl((x - cx) / (wN / 2)); break; } }
          else { timer -= dt; if (timer <= 0) bowl(R.range(-0.5, 0.5)); }
        } else if (state === 'roll') {
          ball.s += ball.speed * dt * (0.6 + ball.s * 0.8);
          if (ball.s >= 1) { const before = standing(); knock(); state = 'settle'; timer = 1.6; ball.done = before - standing(); }
        } else if (state === 'settle') {
          timer -= dt;
          if (timer <= 0) {
            const k = ball.done, firstRoll = (frames[frame] || []).length === 0, left = standing();
            flash = k === 10 && firstRoll ? 'STRIKE!' : left === 0 ? 'SPARE!' : k === 0 ? 'GUTTER' : ''; flashT = t;
            const frameDone = record(k);
            ball = null; state = 'sweep'; sweep = 0; timer = frameDone || left === 0 ? 1 : 0;
          }
        } else if (state === 'sweep') {
          sweep += dt * 1.6;
          if (sweep >= 1) { if (timer > 0 || standing() === 0) rack(); else pins = pins.filter(q => q.up).concat(pins.filter(q => !q.up).map(q => ({ ...q, gone: true }))); state = 'aim'; timer = 1.2; }
        }
        for (const q of pins) if (!q.up && !q.gone) { q.fall += dt; if (q.fall < 1) { q.x += q.dx * dt * 6; q.y += q.dy * dt * 3; } }
        d.set(bg);
        if (cosmic) for (let x = 0; x < n; x += 8) { const h = 2 + ((x * 7 + (t * 3 | 0)) % 5); X.rect(g, x + 2, 3, 3, h, X.shade(glow, 0.5 + 0.1 * (x % 3))); }
        // pins: fallen ones lying, standing ones upright
        for (const q of pins) {
          if (q.gone) continue;
          const body = cosmic ? rgb(240, 250, 255) : WHITE, neck = rgb(230, 30, 40);
          if (q.up) X.stamp(g, PIN, Math.round(q.x - 1), Math.round(q.y - 6), [0, body, neck]);
          else if (q.fall < 1.4 && !(state === 'sweep' && sweep > 0.5)) X.stamp(g, LYING, Math.round(q.x - 4), Math.round(q.y - 2), [0, X.shade(body, 0.85), neck], q.dx < 0);
        }
        if (state === 'sweep') { const y = Math.round(yF - 12 + sweep * 18); X.rect(g, Math.round(cx - wF / 2 - 3), y, wF + 6, 2, rgb(70, 70, 80)); }
        // the ball, shrinking with distance along a hooking path
        if (ball) {
          const s = Math.min(1, ball.s), y = yN - 6 - (yN - 6 - yF) * s, w = wAt(y), u = ball.u0 + ball.hook * s * s, r = 1.2 + 2.8 * (1 - s);
          const x = cx + u * w / 2;
          orb(g, x, y, r, ballCol);
          if (r > 2.5) { const a = t * 9; X.put(g, x + Math.cos(a) * 1.2, y + Math.sin(a) * 1.2, BLACK); }
        } else if (state === 'aim') {
          const x = Math.round(cx + aimU * wN / 2 * 0.8);
          for (let y = n - 14; y > n - 30; y -= 3) X.put(g, x + (y - (n - 14)) * aimU * 0.1, y, cosmic ? glow : rgb(120, 70, 40));
          orb(g, cx + aimU * wN / 2 * 0.8, n - 6, 4, ballCol);
        }
        // scoreboard: ten frames of marks, then the total
        X.rect(g, 0, 0, n, 11, rgb(14, 16, 26)); X.rect(g, 0, 11, n, 1, cosmic ? glow : rgb(255, 200, 40));
        for (let f = 0; f < 10; f++) {
          const fr = frames[f] || [], x0 = f * 8;
          if (f === frame) X.rect(g, x0, 0, 7, 11, rgb(40, 50, 100));
          if (f < 9) X.rect(g, x0 + 7, 0, 1, 11, rgb(84, 92, 124));
          txt(g, String((f + 1) % 10), x0 + 2, 6, rgb(90, 100, 130));
          for (let i = 0; i < 2; i++) { const m = mark(fr, i); if (m) txt(g, m, x0 + (i ? 4 : 0), 1, m === 'X' || m === '/' ? rgb(255, 220, 60) : WHITE); }
        }
        if (flash && t - flashT < 1.6 && (t * 5 | 0) & 1) { const w = tw(flash) + 4; X.rect(g, Math.round(cx - w / 2), 14, w, 9, cosmic ? glow : rgb(255, 220, 40)); txt(g, flash, Math.round(cx - w / 2) + 2, 16, BLACK); }
      };
    },
  });

  // ======================================================================
  add({
    name: 'Break', seed: 4, sizes: [80], fps: 12,
    interactive: 'Point from the cue ball and click to shoot: the farther the pointer, the harder the shot.',
    recipe: 'A pool table from above, filling the frame: the break scatters the rack, then shot after shot is lined up on a ghost ball and played, balls kiss, rebound off the cushions and drop into the pockets, collecting in the tray beside the table.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g);
      const clothI = R.int(0, 4), railI = R.int(0, 3), floorI = R.int(0, 2);
      // the game on the table: eight-ball (the original), nine-ball from a diamond rack, or snooker on green baize
      const game = g.trait('Game', g.home ? 'Eight-ball' : g.alt.pick(['Eight-ball', 'Eight-ball', 'Nine-ball', 'Snooker']));
      const cloth = game === 'Snooker' ? rgb(24, 112, 56) : [rgb(20, 120, 70), rgb(30, 80, 160), rgb(150, 30, 50), rgb(90, 50, 140), rgb(20, 110, 120)][clothI], rail = [rgb(110, 60, 30), rgb(60, 36, 24), rgb(40, 40, 46), rgb(150, 100, 50)][railI];
      const floor = [rgb(40, 24, 30), rgb(26, 30, 40), rgb(50, 40, 30)][floorI];
      g.trait('Cloth', game === 'Snooker' ? 'Baize' : ['Green', 'Blue', 'Red', 'Purple', 'Teal'][clothI]); g.trait('Rails', ['Mahogany', 'Walnut', 'Ebony', 'Oak'][railI]); g.trait('Floor', ['Wine', 'Slate', 'Tan'][floorI]);
      const X0 = 15, X1 = 65, Y0 = 4, Y1 = 76, r = 2.3, PR = 3.2;
      const pockets = [[X0, Y0], [X1, Y0], [X0 - 0.5, (Y0 + Y1) / 2], [X1 + 0.5, (Y0 + Y1) / 2], [X0, Y1], [X1, Y1]];
      const COLS = [rgb(255, 210, 0), rgb(20, 70, 220), rgb(230, 30, 30), rgb(110, 40, 180), rgb(255, 120, 0), rgb(20, 150, 60), rgb(140, 20, 30), BLACK];
      // snooker: reds are 101.., the colours 201 yellow, 202 green, 203 brown, 204 blue, 205 pink, 206 black
      const SNK = [rgb(250, 210, 30), rgb(20, 150, 70), rgb(130, 70, 30), rgb(30, 80, 220), rgb(250, 130, 170), rgb(20, 20, 24)];
      const colOf = id => id === 0 ? rgb(250, 250, 240) : id > 200 ? SNK[id - 201] : id > 100 ? rgb(200, 20, 30) : COLS[(id - 1) % 8];
      const striped = id => id > 8 && id < 16;
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = ((x >> 2) + (y >> 2)) & 1 ? floor : X.shade(floor, 1.2);
        if (x >= X0 - 4 && x <= X1 + 4 && y >= Y0 - 4 && y <= Y1 + 4) c = (x < X0 - 2 || x > X1 + 2 || y < Y0 - 2 || y > Y1 + 2) ? rail : X.shade(cloth, 0.75);
        if (x >= X0 && x <= X1 && y >= Y0 && y <= Y1) c = cloth;
        bg[y * n + x] = c;
      }
      for (const [px, py] of pockets) for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= 9) { const xx = Math.round(px + x), yy = Math.round(py + y); if (xx >= 0 && yy >= 0 && xx < n && yy < n) bg[yy * n + xx] = BLACK; }
      for (const k of [1, 2, 3]) for (const side of [X0 - 3, X1 + 3]) { const y = Math.round(Y0 + (Y1 - Y0) * k / 4); bg[y * n + side] = rgb(250, 240, 210); }
      const headY = Y0 + (Y1 - Y0) * 0.75, footY = Y0 + (Y1 - Y0) * 0.34, mx = (X0 + X1) / 2;
      bg[Math.round(footY) * n + Math.round(mx)] = X.shade(cloth, 1.4);
      let balls, potted, cue, shots, state, timer, aim = null;
      function rackUp() {
        balls = []; potted = []; shots = 0;
        const put = (id, x, y) => balls.push({ id, x, y, vx: 0, vy: 0, in: 0 });
        if (game === 'Nine-ball') {
          // a diamond: the one at the front, the nine in the middle
          const order = R.shuffle([2, 3, 4, 5, 6, 7, 8]), rows = [[1], [0, 0], [0, 9, 0], [0, 0], [0]];
          let k = 0;
          rows.forEach((row, ri) => row.forEach((id, i) => put(id || order[k++], mx + (i - (row.length - 1) / 2) * (2 * r + 0.15), footY - ri * (2 * r * 0.88))));
        } else if (game === 'Snooker') {
          let k = 101;
          for (let row = 0; row < 4; row++) for (let i = 0; i <= row; i++) put(k++, mx + (i - row / 2) * (2 * r + 0.15), footY - 2 * r - row * (2 * r * 0.88));
          const baulk = Y0 + (Y1 - Y0) * 0.8;
          put(201, mx + 7, baulk); put(202, mx - 7, baulk); put(203, mx, baulk); put(204, mx, (Y0 + Y1) / 2); put(205, mx, footY + 1.5 * r); put(206, mx, Y0 + 7);
        } else {
          const order = R.shuffle([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15]); order.splice(4, 0, 8);
          let k = 0;
          for (let row = 0; row < 5; row++) for (let i = 0; i <= row; i++) put(order[k++], mx + (i - row / 2) * (2 * r + 0.15), footY - row * (2 * r * 0.88));
        }
        cue = { id: 0, x: mx + R.range(-6, 6), y: game === 'Snooker' ? Y0 + (Y1 - Y0) * 0.86 : headY, vx: 0, vy: 0, in: 0 };
        balls.push(cue);
        state = 'line'; timer = 1.2; aim = { dx: mx - cue.x, dy: footY - cue.y, pow: R.range(70, 85), pull: 0 };
      }
      rackUp();
      const moving = () => balls.some(b => !b.in && Math.abs(b.vx) + Math.abs(b.vy) > 0.4);
      function plan() {
        const left = balls.filter(o => o.id && !o.in), reds = left.some(o => o.id > 100 && o.id < 200);
        const targets = game === 'Snooker' ? left.filter(b => reds ? b.id < 200 : true) : game === 'Nine-ball' ? left : left.filter(b => b.id !== 8 || left.length === 1);
        if (!targets.length) return null;
        let best = null;
        for (const b of targets) for (const [px, py] of pockets) {
          const tx = px - b.x, ty = py - b.y, tl = Math.hypot(tx, ty), gx = b.x - tx / tl * 2 * r, gy = b.y - ty / tl * 2 * r;
          const cx = gx - cue.x, cy = gy - cue.y, cl = Math.hypot(cx, cy), cut = (cx * tx + cy * ty) / (cl * tl);
          if (cut < 0.35) continue;
          const score = cut * 2 - tl / 80 - cl / 120 + R() * 0.5;
          if (!best || score > best.score) best = { score, dx: gx - cue.x, dy: gy - cue.y, pow: 30 + tl * 0.5 + cl * 0.4 };
        }
        if (!best) { const b = R.pick(targets); best = { dx: b.x - cue.x, dy: b.y - cue.y, pow: 45 }; }
        best.dx += R.range(-0.6, 0.6); best.pull = 0;
        return best;
      }
      function shoot(a) { const l = Math.hypot(a.dx, a.dy) || 1; cue.vx = a.dx / l * a.pow; cue.vy = a.dy / l * a.pow; shots++; state = 'run'; aim = null; }
      function physics(dt) {
        const steps = 8, h = dt / steps;
        for (let s = 0; s < steps; s++) {
          for (const b of balls) {
            if (b.in) continue;
            b.x += b.vx * h; b.y += b.vy * h;
            const sp = Math.hypot(b.vx, b.vy), dec = Math.max(0, sp - 22 * h);
            if (sp > 0) { b.vx *= dec / sp; b.vy *= dec / sp; }
            for (const [px, py] of pockets) if (Math.hypot(b.x - px, b.y - py) < PR) { b.in = 1; b.vx = b.vy = 0; if (b.id) potted.push(b.id); }
            if (b.in) continue;
            if (b.x < X0 + r) { b.x = X0 + r; b.vx = Math.abs(b.vx) * 0.8; } if (b.x > X1 - r) { b.x = X1 - r; b.vx = -Math.abs(b.vx) * 0.8; }
            if (b.y < Y0 + r) { b.y = Y0 + r; b.vy = Math.abs(b.vy) * 0.8; } if (b.y > Y1 - r) { b.y = Y1 - r; b.vy = -Math.abs(b.vy) * 0.8; }
          }
          for (let i = 0; i < balls.length; i++) for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i], b = balls[j]; if (a.in || b.in) continue;
            const dx = b.x - a.x, dy = b.y - a.y, dd = dx * dx + dy * dy;
            if (dd >= 4 * r * r || dd === 0) continue;
            const l = Math.sqrt(dd), nx = dx / l, ny = dy / l, ov = 2 * r - l;
            a.x -= nx * ov / 2; a.y -= ny * ov / 2; b.x += nx * ov / 2; b.y += ny * ov / 2;
            const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
            if (rel > 0) { a.vx -= rel * nx * 0.96; a.vy -= rel * ny * 0.96; b.vx += rel * nx * 0.96; b.vy += rel * ny * 0.96; }
          }
        }
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        if (state === 'run') {
          physics(dt);
          if (!moving()) {
            for (const b of balls) { b.vx = b.vy = 0; }
            if (cue.in) { cue.in = 0; cue.x = mx; cue.y = headY; }
            const left = balls.filter(b => b.id && !b.in).length;
            const last = game === 'Eight-ball' ? 8 : game === 'Nine-ball' ? 9 : 0;
            if (!left || (last && balls.find(b => b.id === last).in) || shots > 30) { state = 'end'; timer = 2; }
            else { state = 'line'; timer = 0.9; aim = plan(); }
          }
        } else if (state === 'line') {
          if (p.active) {
            const dx = p.x - cue.x, dy = p.y - cue.y, l = Math.hypot(dx, dy);
            aim = { dx, dy, pow: U.clamp(l * 2.2, 20, 110), pull: 0 };
            for (const _ of p.taps) { aim.pull = 1; shoot(aim); break; }
          } else {
            if (!aim) aim = plan();
            timer -= dt;
            if (!aim) { state = 'end'; timer = 1; }
            else { aim.pull = U.clamp(1 - timer / 0.9, 0, 1); if (timer <= 0) shoot(aim); }
          }
        } else { timer -= dt; if (timer <= 0) rackUp(); }
        d.set(bg);
        // aim: a dotted line ahead and the cue behind
        if (state === 'line' && aim) {
          const l = Math.hypot(aim.dx, aim.dy) || 1, ux = aim.dx / l, uy = aim.dy / l;
          for (let k = 4; k < 40; k += 3) { const x = cue.x + ux * k, y = cue.y + uy * k; if (x > X0 && x < X1 && y > Y0 && y < Y1) X.put(g, x, y, X.shade(cloth, 1.6)); }
          const back = 3 + (p.active ? aim.pow / 12 : 2 + 5 * Math.sin(aim.pull * Math.PI));
          for (let k = 0; k < 30; k++) { const x = cue.x - ux * (back + k), y = cue.y - uy * (back + k); X.put(g, x, y, k < 2 ? rgb(90, 160, 255) : k < 4 ? rgb(250, 240, 220) : k < 20 ? rgb(200, 150, 90) : rgb(70, 40, 20)); }
        }
        for (const b of balls) {
          if (b.in) continue;
          const col = colOf(b.id);
          X.put(g, b.x + 1, b.y + 2, X.shade(cloth, 0.6)); X.put(g, b.x + 2, b.y + 1, X.shade(cloth, 0.6));
          if (striped(b.id)) { orb(g, b.x, b.y, r, rgb(250, 250, 240)); X.rect(g, Math.round(b.x - r) + 1, Math.round(b.y) - 1, 3, 2, col); }
          else orb(g, b.x, b.y, r, col);
          if (b.id && b.id < 100) X.put(g, b.x, b.y, b.id === 8 ? WHITE : X.mixPk(col, WHITE, 0.7));
        }
        // the trays: potted balls down the sides
        const per = game === 'Snooker' ? 10 : 8;
        potted.forEach((id, k) => { if (k >= 2 * per) return; const side = k < per ? 0 : 1, x = side ? n - 5 : 4, y = 6 + (k % per) * 7; orb(g, x, y, 2.4, striped(id) ? rgb(250, 250, 240) : colOf(id)); if (striped(id)) X.rect(g, x - 1, y - 1, 3, 2, colOf(id)); });
      };
    },
  });

  // ======================================================================
  add({
    name: 'Curling', seed: 1, sizes: [50], fps: 12,
    interactive: 'Click on the ice to throw a stone there; it curls toward the side you clicked.',
    recipe: 'The house end of a curling sheet from above: stones glide up the pebbled ice and curl into the rings while two sweepers scrub ahead of them, knock each other out, and the end is counted in the scoreboard.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g);
      const ringI = R.int(0, 3), RINGS = [[rgb(30, 90, 220), WHITE, rgb(230, 30, 40)], [rgb(230, 30, 40), WHITE, rgb(30, 90, 220)], [rgb(20, 150, 90), WHITE, rgb(250, 190, 0)], [rgb(130, 50, 200), WHITE, rgb(250, 120, 30)]][ringI];
      const TEAMS = [rgb(240, 200, 0), rgb(220, 30, 40), rgb(30, 110, 230), rgb(40, 180, 90)], teams = R.shuffle(TEAMS.slice()).slice(0, 2);
      g.trait('Rings', ['Blue and red', 'Red and blue', 'Green and gold', 'Purple and orange'][ringI]);
      g.trait('Teams', teams.map(c => ['Yellow', 'Red', 'Blue', 'Green'][TEAMS.indexOf(c)]).join(' v '));
      // where the sheet is (an indoor rink, a frozen pond between snowbanks, or the rink at night under
      // a spotlight), and how big the house is painted
      const A = g.alt, place = g.trait('Setting', g.home ? 'Rink' : A.pick(['Rink', 'Rink', 'Pond', 'Night'])), houseK = g.trait('House', g.home ? 'Standard' : A.pick(['Standard', 'Standard', 'Wide', 'Tight']));
      const hs = houseK === 'Wide' ? 1.22 : houseK === 'Tight' ? 0.8 : 1;
      const L = 4, Rr = n - 5, hx = n / 2, hy = houseK === 'Wide' ? 16 : 14, ice = place === 'Pond' ? rgb(204, 222, 236) : place === 'Night' ? rgb(150, 168, 200) : rgb(232, 242, 250), pebble = place === 'Rink' ? rgb(214, 230, 244) : X.shade(ice, 0.93);
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = ((x * 13 + y * 7) % 11 === 0) ? pebble : ice;
        const q = Math.hypot(x + 0.5 - hx, y + 0.5 - hy);
        if (place === 'Night') { const k = U.clamp(1.35 - q / 30, 0.75, 1.3); c = X.shade(c, k); }
        if (q < 12 * hs) c = RINGS[0]; if (q < 9 * hs) c = place === 'Night' ? X.shade(ice, 1.3) : ice; if (q < 6 * hs) c = RINGS[2]; if (q < 2.4 * hs) c = place === 'Night' ? X.shade(ice, 1.3) : ice;
        if (y === hy || (x === hx && y < hy + 13)) c = X.shade(c, 0.75);
        if (y === hy + 22) c = rgb(220, 40, 50);
        if (x < L || x >= Rr) c = place === 'Pond' ? (X.dith4(x, y) < 0.3 ? rgb(200, 214, 236) : rgb(244, 248, 255)) : place === 'Night' ? (x < L - 1 || x > Rr ? ((y % 9 === 4) ? rgb(255, 230, 150) : rgb(12, 14, 26)) : rgb(60, 66, 90)) : x < L - 1 || x > Rr ? rgb(30, 34, 50) : rgb(160, 170, 190);
        bg[y * n + x] = c;
      }
      // a pond's ice has a few long cracks
      if (place === 'Pond') { const G = { n, d: bg }; for (let k = 0; k < 4; k++) { let x = A.range(L + 2, Rr - 2), y = A.range(0, n); for (let j = 0; j < 6; j++) { const nx = x + A.range(-5, 5), ny = y + A.range(-6, 6); X.line(G, x, y, nx, ny, (px, py) => { if (px >= L && px < Rr && py >= 0 && py < n) bg[py * n + px] = X.shade(bg[py * n + px], 0.86); }); x = nx; y = ny; } } }
      const SWEEP = sprite(['.33.', '.11.', '1111', '.11.', '.2.2']);
      let stones = [], end = R.int(0, 5), thrown = 0, score = [R.int(0, 4), R.int(0, 4)], state = 'wait', timer = 1, last = null, endPts = null;
      // the end is already under way: a few stones lie in and around the house
      for (let k = R.int(2, 5); k > 0; k--) { stones.push({ x: hx + R.range(-10, 10), y: hy + R.range(-8, 14), vx: 0, vy: 0, team: thrown % 2, curl: 1, moving: false }); thrown++; }
      function throwTo(tx, ty) {
        const side = tx < hx ? -1 : 1, team = thrown % 2;
        const st = { x: hx - side * R.range(2, 5), y: n + 2, vx: 0, vy: 0, team, curl: side, moving: true };
        // speed to reach about the target given the friction, then aim off the curl
        const dist = st.y - ty, speed = Math.sqrt(2 * 7 * Math.max(4, dist)) * R.range(0.96, 1.05);
        st.vy = -speed; st.vx = (tx - st.x) / (dist / speed * 1.6) - side * 0.6;
        stones.push(st); last = st; thrown++; state = 'run';
      }
      function step(dt) {
        for (const s of stones) {
          if (!s.moving) continue;
          const sp = Math.hypot(s.vx, s.vy);
          if (sp < 0.3) { s.vx = s.vy = 0; s.moving = false; continue; }
          s.vx += s.curl * 2.6 / (sp + 2) * dt; s.x += s.vx * dt; s.y += s.vy * dt;
          const dec = Math.max(0, sp - 7 * dt); s.vx *= dec / sp; s.vy *= dec / sp;
          if (s.x < L + 2 || s.x > Rr - 2 || s.y < -3) { s.out = true; s.moving = false; }
        }
        stones = stones.filter(s => !s.out);
        for (let i = 0; i < stones.length; i++) for (let j = i + 1; j < stones.length; j++) {
          const a = stones[i], b = stones[j], dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy);
          if (l >= 4 || l === 0) continue;
          const nx = dx / l, ny = dy / l, rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
          a.x -= nx * (4 - l) / 2; a.y -= ny * (4 - l) / 2; b.x += nx * (4 - l) / 2; b.y += ny * (4 - l) / 2;
          if (rel > 0) { a.vx -= rel * nx; a.vy -= rel * ny; b.vx += rel * nx; b.vy += rel * ny; a.moving = b.moving = true; }
        }
      }
      function count() {
        const inHouse = stones.map(s => ({ s, q: Math.hypot(s.x - hx, s.y - hy) })).filter(o => o.q < 14).sort((a, b) => a.q - b.q);
        if (!inHouse.length) return [0, 0];
        const team = inHouse[0].s.team, other = inHouse.find(o => o.s.team !== team), k = inHouse.filter(o => o.s.team === team && (!other || o.q < other.q)).length;
        return team ? [0, k] : [k, 0];
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        if (state === 'wait') {
          if (p.active) { for (const [x, y] of p.taps) if (y < n - 6) { throwTo(x, y); break; } }
          else { timer -= dt; if (timer <= 0) { const tx = hx + R.range(-8, 8), ty = hy + R.range(-6, 10); throwTo(tx, ty); } }
        } else if (state === 'run') { step(dt); if (!stones.some(s => s.moving)) { state = thrown >= 8 ? 'count' : 'wait'; timer = thrown >= 8 ? 2.5 : 0.8; if (thrown >= 8) endPts = count(); } }
        else { timer -= dt; if (timer <= 0) { score[0] += endPts[0]; score[1] += endPts[1]; end++; stones = []; thrown = 0; state = 'wait'; timer = 1; if (end >= 8) { end = 0; score = [0, 0]; } } }
        d.set(bg);
        for (const s of stones) {
          const x = s.x, y = s.y;
          X.disc(g, x + 0.6, y + 0.8, 2.3, X.shade(ice, 0.8));
          X.disc(g, x, y, 2.3, rgb(110, 110, 120)); X.disc(g, x, y, 1.6, teams[s.team]);
          X.rect(g, Math.round(x) - 1, Math.round(y) - 1, 2, 1, X.mixPk(teams[s.team], WHITE, 0.5));
          if (s.moving && s === last) {
            // two sweepers scrubbing ahead
            const fr = Math.floor(t * 8) & 1;
            for (const sd of [-1, 1]) { const sx = Math.round(x + sd * 4) - 2, sy = Math.round(y - 7); X.stamp(g, SWEEP, sx, sy, [0, teams[s.team], rgb(40, 40, 50), rgb(250, 220, 180)]); X.rect(g, Math.round(x - 1 + sd * (fr ? 1 : -1)), sy + 4, 3, 1, rgb(60, 60, 70)); }
          }
        }
        if (state === 'count' && endPts) { const w = 26; X.rect(g, hx - w / 2, 31, w, 9, BLACK); const k = Math.max(endPts[0], endPts[1]); X.rect(g, hx - w / 2 + 2, 33, 4, 5, teams[endPts[0] ? 0 : 1]); txt(g, k ? '+' + k : '0', hx - w / 2 + 8, 33, WHITE); }
        // scoreboard on the boards
        X.rect(g, L, n - 7, Rr - L, 7, rgb(20, 22, 34));
        for (let k = 0; k < 2; k++) { X.rect(g, L + 2 + k * 22, n - 5, 3, 3, teams[k]); txt(g, String(score[k]), L + 7 + k * 22, n - 6, WHITE); }
        for (let k = 0; k < 8 - thrown; k++) X.put(g, Rr - 3 - k * 2, n - 4, teams[(thrown + k) % 2]);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Lanes', seed: 5, sizes: [80], fps: 12,
    interactive: 'Click a lane to cheer that swimmer on: they sprint for a few strokes.',
    recipe: 'A swimming pool from above, with sunlight netting the water: swimmers stroke down their lanes between the buoyed ropes, tumble-turn at the wall in a burst of spray, and touch home while the lane blocks show their places.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), lanes = R.pick([5, 6, 7]), LH = Math.floor((n - 12) / lanes), top = n - lanes * LH - 2;
      const waterI = R.int(0, 2);
      let water = [[rgb(30, 130, 220), rgb(110, 200, 255)], [rgb(20, 150, 170), rgb(120, 230, 230)], [rgb(16, 60, 140), rgb(70, 140, 240)]][waterI];
      const stroke = R.pick(['free', 'free', 'back', 'fly']), laps = R.int(2, 4), caps = R.shuffle(KITS.map(k => k[0])), deck = R.pick([rgb(220, 210, 190), rgb(200, 205, 215), rgb(240, 230, 210)]);
      const L0 = 6, L1 = n - 6;
      g.trait('Lanes', lanes); g.trait('Stroke', { free: 'Freestyle', back: 'Backstroke', fly: 'Butterfly' }[stroke]); g.trait('Distance', laps * 50 + 'M'); g.trait('Water', ['Blue', 'Teal', 'Deep'][waterI]);
      // where the pool is (an indoor hall, an open-air pool on terracotta tiles, or a night meet with
      // underwater lights) and how the sunlight nets the water (the usual net, broad swells or a fine mesh)
      const A = g.alt, place = g.trait('Pool', g.home ? 'Indoor' : A.pick(['Indoor', 'Indoor', 'Open-air', 'Night'])), net = g.trait('Caustics', g.home ? 'Net' : A.pick(['Net', 'Net', 'Broad', 'Fine']));
      const fk = net === 'Broad' ? 0.55 : net === 'Fine' ? 1.6 : 1;
      if (place === 'Night') water = [X.shade(water[0], 0.55), X.shade(water[1], 0.75)];
      const deckBg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = deck;
        if (place === 'Open-air') c = y < top - 1 ? ((x * 7 + y * 13) % 29 === 0 ? rgb(250, 230, 90) : (x + y) % 3 ? rgb(80, 160, 70) : rgb(64, 140, 58)) : ((x >> 2) + (y >> 2)) & 1 ? rgb(204, 124, 84) : rgb(186, 108, 72);
        else if (place === 'Night') c = y < top - 1 ? rgb(22, 24, 36) : ((x >> 2) + (y >> 2)) & 1 ? rgb(40, 44, 60) : rgb(34, 38, 52);
        else if (y < top - 1) c = X.shade(deck, 0.9);
        deckBg[y * n + x] = c;
      }
      const label = place === 'Indoor' ? rgb(60, 60, 80) : rgb(240, 240, 230);
      const sw = Array.from({ length: lanes }, (_, i) => ({ x: L0 + 1, dir: 1, lap: 0, v: R.range(10, 13), boost: 0, done: 0, place: 0, ph: R() * TAU, splash: 0 }));
      let finished = 0, hold = 0;
      const SX = new Float32Array(n), SY = new Float32Array(n), SD = new Float32Array(2 * n);
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) for (const [, y] of p.taps) { const k = Math.floor((y - top) / LH); if (sw[k] && !sw[k].done) sw[k].boost = 1.8; }
        for (const s of sw) {
          if (s.done) continue;
          s.boost = Math.max(0, s.boost - dt);
          s.x += s.dir * (s.v + (s.boost ? 7 : 0) + Math.sin(t * 2 + s.ph) * 1.2) * dt;
          if (s.dir > 0 && s.x > L1 - 5) { s.dir = -1; s.splash = 0.6; s.lap++; }
          if (s.dir < 0 && s.x < L0 + 2) { s.lap++; if (s.lap >= laps * 2) { s.done = 1; s.place = ++finished; s.x = L0 + 1; } else { s.dir = 1; s.splash = 0.6; } }
          s.splash = Math.max(0, s.splash - dt);
        }
        if (finished === lanes) { hold += dt; if (hold > 3) { hold = 0; finished = 0; sw.forEach(s => { s.x = L0 + 1; s.dir = 1; s.lap = 0; s.done = 0; s.place = 0; s.v = R.range(10, 13); }); } }
        // deck, water with moving caustics, lane lines, ropes
        d.set(deckBg);
        for (let x = 0; x < n; x++) SX[x] = Math.sin(x * 0.55 * fk + t * 1.3);
        for (let y = 0; y < n; y++) SY[y] = Math.sin(y * 0.7 * fk - t * 0.9);
        for (let k = 0; k < 2 * n; k++) SD[k] = Math.sin((k - n) * 0.33 * fk + t * 1.7);
        for (let y = top; y < top + lanes * LH; y++) for (let x = L0; x < L1; x++) {
          const a = SX[x] + SY[y] + SD[x - y + n];
          d[y * n + x] = a < 0.16 && a > -0.16 ? water[1] : water[0];
        }
        for (let k = 0; k < lanes; k++) {
          const yc = top + k * LH + (LH >> 1);
          for (let x = L0 + 4; x < L1 - 4; x++) d[yc * n + x] = X.shade(water[0], 0.55);
          for (const xe of [L0 + 4, L1 - 5]) for (let dy = -1; dy <= 1; dy++) d[(yc + dy) * n + xe] = X.shade(water[0], 0.55);
          if (k) { const yr = top + k * LH; for (let x = L0; x < L1; x++) d[yr * n + x] = (x - L0 < 6 || L1 - x < 7) ? ((x >> 1) & 1 ? rgb(230, 30, 40) : WHITE) : ((x >> 1) & 1 ? rgb(250, 210, 30) : rgb(30, 60, 200)); }
        }
        // blocks with lane numbers at the start end
        for (let k = 0; k < lanes; k++) { const y = top + k * LH + 1; X.rect(g, 0, y, 5, LH - 2, rgb(70, 74, 90)); txt(g, String(k + 1), 1, y + Math.floor((LH - 7) / 2), WHITE); }
        // a night meet: each lane glows from lights set in the end walls
        if (place === 'Night') for (let k = 0; k < lanes; k++) { const yc = top + k * LH + (LH >> 1); for (const ex of [L0 + 1, L1 - 2]) for (let dy = -2; dy <= 2; dy++) for (let dx = -3; dx <= 3; dx++) { const x = ex + dx, y = yc + dy; if (x < L0 || x >= L1 || y < top || y >= top + lanes * LH || dx * dx / 9 + dy * dy / 4 > 1 || X.dith4(x, y) > 0.6) continue; d[y * n + x] = X.mixPk(d[y * n + x], rgb(170, 230, 255), 0.45); } }
        txt(g, (stroke === 'free' ? 'FREE' : stroke === 'back' ? 'BACK' : 'FLY') + ' ' + laps * 2 * 25 + 'M', 2, 1, label);
        // swimmers
        sw.forEach((s, k) => {
          const yc = top + k * LH + (LH >> 1), x = Math.round(s.x), ph = t * (s.boost ? 9 : 6) + s.ph, arm = Math.sin(ph) > 0;
          const body = X.shade(water[0], 0.45), skin = rgb(240, 190, 150), cap = caps[k % caps.length], hx = x + (s.dir > 0 ? 5 : -1);
          X.rect(g, x, yc - 1, 6, 3, body); X.rect(g, x + (s.dir > 0 ? 0 : 5), yc, 1, 1, X.shade(water[0], 0.6));
          X.rect(g, hx, yc - 1, 2, 3, cap); X.put(g, hx + (s.dir > 0 ? 1 : 0), yc, stroke === 'back' ? skin : X.shade(cap, 0.7));
          if (stroke === 'fly') { const reach = arm ? 3 : 1; X.put(g, hx + s.dir * reach, yc - 2, skin); X.put(g, hx + s.dir * reach, yc + 2, skin); }
          else X.put(g, hx + s.dir * (arm ? 2 : -1), yc + (arm ? -2 : 2), skin);
          if (!s.done) for (let k2 = 1; k2 <= 3; k2++) X.put(g, x - s.dir * k2 + (s.dir < 0 ? 5 : 0), yc + ((Math.floor(ph * 2) + k2) % 3) - 1, k2 === 1 ? WHITE : X.mixPk(water[1], WHITE, 0.5));
          if (s.splash > 0) for (let q = 0; q < 6; q++) X.put(g, (s.dir < 0 ? L1 - 4 : L0 + 2) + Math.cos(q + t * 9) * 2, yc + Math.sin(q * 2 + t * 7) * 2, WHITE);
          if (s.place) { const c = s.place === 1 ? rgb(255, 210, 40) : s.place === 2 ? rgb(220, 220, 230) : s.place === 3 ? rgb(220, 130, 60) : rgb(120, 130, 150); X.rect(g, 0, top + k * LH + 1, 5, LH - 2, c); txt(g, String(s.place), 1, top + k * LH + 1 + Math.floor((LH - 7) / 2), BLACK); }
        });
      };
    },
  });

  // ======================================================================
  // Slalom: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogSlalom(R, U, g) {
      const { n, d } = g, s = n / 100, gap = R.range(26, 34) * s, amp = R.range(14, 22) * s, v = R.range(24, 32) * s, sky = R.bool(0.3);
      g.trait('Style', 'Fine'); g.trait('Course', amp > 18 * s ? 'Wide' : 'Tight'); g.trait('Gates', gap < 30 * s ? 'Close' : 'Spaced');
      const suitK = g.home ? null : g.alt.pick([null, null, ...KITS]), snowing = g.trait('Weather', g.home ? 'Clear' : g.alt.pick(['Clear', 'Clear', 'Clear', 'Snowfall'])) === 'Snowfall';
      g.trait('Skier', suitK ? kitName(suitK) : 'Crimson');
      const gx = i => n / 2 + (i % 2 ? 1 : -1) * amp * (0.8 + 0.4 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1));
      // the line: smooth in y through each gate's turning point
      const lineX = wy => { const i = Math.floor(wy / gap), u = wy / gap - i; return gx(i) + (gx(i + 1) - gx(i)) * (0.5 - 0.5 * Math.cos(Math.PI * u)); };
      const hash = (a, b) => { const v2 = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v2 - Math.floor(v2); };
      const snowA = X.rgb(240, 244, 250), snowB = X.rgb(214, 224, 240), tree = X.rgb(30, 90, 60), trunk = X.rgb(90, 60, 40);
      const fy = Math.round(n * 0.62), ptr = pointer(g);
      let steer = 0;
      return (t, dt, f) => {
        const camY = t * v, p = ptr(dt, n);
        steer += ((p.active ? U.clamp(p.x - lineX(camY), -n * 0.4, n * 0.4) : 0) - steer) * Math.min(1, dt * 4);
        for (let y = 0; y < n; y++) {
          const wy = camY + y - fy, row = Math.floor(wy);
          for (let x = 0; x < n; x++) d[y * n + x] = X.dith8(x * 3, row * 5) > 0.82 ? snowB : (x < 6 * s || x > n - 6 * s ? snowB : snowA);
          // tracks: only behind the skier
          if (y < fy) { const lx = lineX(wy); for (const o of [-1.2 * s, 1.2 * s]) { const xx = Math.round(lx + o); if (xx >= 0 && xx < n) d[y * n + xx] = X.rgb(170, 186, 210); } }
        }
        // pines down both sides and a few on the piste edges
        for (let y = -10; y < n + 10; y++) {
          const wy = Math.floor(camY + y - fy);
          for (const side of [0, 1]) {
            if (hash(wy, side) > 0.08) continue;
            const x = side ? n - 4 * s - hash(wy, 9) * 10 * s : 4 * s + hash(wy, 7) * 10 * s, h = 6 * s + hash(wy, 3) * 6 * s, sy = y;
            for (let k = 0; k < h; k++) { const w = (k / h) * h * 0.45; X.rect(g, x - w, sy - h + k, 2 * w + 1, 1, k % 3 === 2 ? X.shade(tree, 0.75) : tree); }
            X.rect(g, x - 0.5 * s, sy, s + 1, 2 * s, trunk);
          }
        }
        // gates: a pair of flags at each turning point
        const i0 = Math.floor((camY - fy) / gap) - 1;
        for (let i = i0; i < i0 + n / gap + 3; i++) {
          const y = i * gap + gap * 0.5 - camY + fy, x = gx(i) + (i % 2 ? 1 : -1) * 3 * s, col = i % 2 ? X.rgb(40, 80, 220) : X.rgb(220, 40, 40);
          for (const o of [0, (i % 2 ? 1 : -1) * 8 * s]) { X.rect(g, x + o, y - 4 * s, Math.max(1, 0.7 * s), 5 * s, X.rgb(60, 60, 60)); X.rect(g, x + o + 0.7 * s, y - 4 * s, 2.5 * s, 2.5 * s, col); }
        }
        // the skier
        const sx = lineX(camY) + steer, dx = lineX(camY + 1) - lineX(camY - 1), lean = U.clamp(dx / (2 * s) + (p.active ? (p.x - sx) * 0.05 : 0), -1, 1);
        for (const o of [-1.2, 1.2]) X.line(g, sx + o * s - lean * 3 * s, fy - 3 * s, sx + o * s + lean * 3 * s, fy + 3 * s, X.rgb(240, 200, 20));
        ellipse(g, sx, fy, 2.2 * s, 2.2 * s, suitK ? suitK[0] : X.rgb(220, 30, 60));
        ellipse(g, sx - lean * 0.5 * s, fy - 0.5 * s, 1.2 * s, 1.2 * s, X.rgb(30, 30, 40));
        if (snowing) snowfall(g, t, n);
        void sky; void f;
      };
  }
  // Slalom: the rework, chosen on the other rolls
  function reSlalom(R, U, g) {
      const { n, d } = g, ptr = pointer(g), s = n / 50, sc = Math.max(2, Math.round(2 * s));
      const snowI = R.int(0, 2), snow = [[rgb(236, 244, 255), rgb(214, 228, 246)], [rgb(252, 252, 252), rgb(228, 232, 240)], [rgb(255, 236, 240), rgb(240, 210, 220)]][snowI];
      const gateI = R.int(0, 1), gateCols = [[rgb(230, 30, 40), rgb(30, 80, 230)], [rgb(255, 120, 0), rgb(0, 160, 120)]][gateI], suit = R.pick(KITS);
      g.trait('Style', 'Chunky'); g.trait('Snow', ['Morning', 'Noon', 'Sunset'][snowI]); g.trait('Gates', ['Red and blue', 'Orange and green'][gateI]); g.trait('Skier', kitName(suit));
      const snowing = g.trait('Weather', g.alt.pick(['Clear', 'Clear', 'Clear', 'Snowfall'])) === 'Snowfall';
      const GAP = Math.round(18 * s), trees = [], tracks = [];
      let world = 0, sx = n / 2, svx = 0, gates = [];
      const gateAt = k => ({ k, y: k * GAP, x: n / 2 + (k % 2 ? 1 : -1) * R.range(5, 10) * s });
      for (let k = 0; k < 10; k++) gates.push(gateAt(k));
      for (let k = 0; k < 16; k++) trees.push({ x: R.bool(0.5) ? R.range(-2, 5) * s : n - R.range(6, 12) * s, y: R.range(0, n * 3), kind: R.pick(['pine', 'pine', 'birch']) });
      const PINE = sprite(['..1..', '.111.', '..1..', '.111.', '11111', '.111.', '11111', '..2..']);
      const BIRCH = sprite(['.11.', '1111', '1111', '.11.', '.2..', '.2..']);
      const SKIER = [sprite(['.3.', '111', '.1.', '2.2', '4.4']), sprite(['.3.', '111', '.1.', '.2.', '44.']), sprite(['.3.', '111', '.1.', '.2.', '.44'])];
      return (t, dt) => {
        const p = ptr(dt, n), speed = 18 * s;
        world += speed * dt;
        // the next gate below decides where to steer
        while (gates.length && gates[0].y < world - 4) { gates.shift(); gates.push(gateAt(gates[gates.length - 1].k + 1)); }
        const sy = n * 0.3, next = gates.find(q => q.y > world + sy - 1) || gates[0];
        const target = p.active ? p.x : next.x;
        svx += (U.clamp(target - sx, -12, 12) * 1.4 - svx) * Math.min(1, dt * 3);
        sx = U.clamp(sx + svx * dt, 3, n - 4);
        tracks.push([sx, world + sy]); if (tracks.length > 120) tracks.shift();
        d.fill(snow[0]);
        // sparkle and light shading of the slope
        for (let y = 0; y < n; y++) { const wy = Math.floor(y + world); for (let x = 0; x < n; x++) { const h = Math.imul(x * 73 + wy * 151, 2654435761) >>> 24; if (h < 6) d[y * n + x] = snow[1]; else if (h === 7) d[y * n + x] = WHITE; } }
        for (let i = 1; i < tracks.length; i++) {
          const [x0, y0] = tracks[i - 1], [x1, y1] = tracks[i];
          for (const o of [-1, 1]) X.line(g, x0 + o, y0 - world, x1 + o, y1 - world, X.shade(snow[1], 0.9));
        }
        for (const q of gates) { const y = Math.round(q.y - world), c = gateCols[q.k % 2]; for (const sd of [-1, 1]) { const px = Math.round(q.x + sd * 6 * s), fw = Math.round(3 * s); X.rect(g, px, y - 1, Math.max(1, Math.round(s)), Math.round(5 * s), X.shade(c, 0.7)); X.rect(g, sd < 0 ? px + 1 : px - fw, y - 1, fw, fw, c); } }
        for (const tr of trees) {
          let y = tr.y - world; while (y < -10) { tr.y += n * 3; y = tr.y - world; }
          if (y > n) continue;
          X.stamp(g, tr.kind === 'pine' ? PINE : BIRCH, Math.round(tr.x) - 2, Math.round(y), [0, tr.kind === 'pine' ? rgb(30, 110, 70) : rgb(120, 180, 60), tr.kind === 'pine' ? rgb(90, 60, 40) : WHITE], false, sc);
        }
        const spr = SKIER[Math.abs(svx) < 2 ? 0 : svx > 0 ? 2 : 1];
        X.stamp(g, spr, Math.round(sx - 1.5 * sc), Math.round(sy - 2.5 * sc), [0, suit[0], suit[1], rgb(250, 210, 60), rgb(30, 30, 40)], false, sc);
        if (snowing) snowfall(g, t, n);
      };
  }
  add({
    name: 'Slalom', seed: 1, sizes: [80, 100], fps: 12,
    interactive: 'Move the pointer left and right to steer the skier through the gates.',
    recipe: 'Looking down on a skier carving through red and blue gates as the slope scrolls past; the twin tracks of every turn stay in the snow behind, between pines, birches and the odd mogul. Snow in morning blue, noon white or sunset pink.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogSlalom(R, U, g) : reSlalom(R, U, g); },
  });

  // ======================================================================
  // Peloton: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogPeloton(R, U, g) {
      const { n, d } = g, s = n / 100, v = R.range(18, 26) * s, roadW = 13 * s;
      const a1 = R.range(0.012, 0.02) / s, a2 = R.range(0.03, 0.05) / s, A1 = R.range(14, 22) * s, A2 = R.range(3, 7) * s;
      const cxw = wy => n / 2 + A1 * Math.sin(wy * a1) + A2 * Math.sin(wy * a2 + 1);
      const fields = [X.rgb(120, 160, 70), X.rgb(150, 180, 80), X.rgb(190, 170, 90), X.rgb(100, 140, 60)];
      const VERGE = [X.rgb(250, 230, 90), X.rgb(245, 245, 235), X.rgb(200, 120, 220)];   // wildflowers along the verge
      const hash = (a, b) => { const v2 = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v2 - Math.floor(v2); };
      const jerseys = X.inks(R, 6, 0.6);
      g.trait('View', 'Close'); g.trait('Jerseys', inkName(jerseys)); g.trait('Land', 'Farmland');
      const riders = Array.from({ length: g.trait('Riders', R.int(16, 24)) }, (_, i) => ({ dy: R.range(-6, 30) * s, lat: R.range(-0.7, 0.7), col: jerseys[i % jerseys.length], ph: R.range(0, TAU), w: R.range(0.2, 0.5) }));
      const front = riders.slice(0, 2), ptr = pointer(g);
      let attacker = null, ao = 0, until = 0, nextAttacker = 2;
      return (t, dt, f) => {
        const p = ptr(dt, n);
        if (p.active && p.taps.length) { attacker = riders[nextAttacker++ % riders.length]; until = t + 5; }
        ao += ((attacker && t < until ? 22 * s : 0) - ao) * Math.min(1, dt * 1.5);
        if (attacker && t >= until && ao < 0.2) { attacker = null; ao = 0; }
        const camY = -t * v;
        for (let y = 0; y < n; y++) {
          const wy = camY + y, cx = cxw(wy), band = Math.floor(wy / (18 * s));
          for (let x = 0; x < n; x++) {
            const dxr = x + 0.5 - cx;
            let c;
            if (Math.abs(dxr) < roadW / 2) c = Math.abs(dxr) < 0.5 && Math.floor(wy / (3 * s)) % 2 ? X.rgb(240, 240, 240) : X.rgb(70, 72, 78);
            else if (Math.abs(dxr) < roadW / 2 + 1.5 * s) c = hash(Math.floor(wy), Math.floor(x / 2)) < 0.16 ? VERGE[Math.floor(hash(x, Math.floor(wy)) * 3)] : X.rgb(90, 130, 60);
            else if (Math.abs(dxr) < roadW / 2 + 3 * s) c = X.rgb(50, 100, 50);
            else { const fc = fields[(band * 3 + (dxr > 0 ? 1 : 0)) & 3]; c = (Math.floor(x / (2 * s)) + band) % 3 === 0 ? X.shade(fc, 0.85) : fc; }
            d[y * n + x] = c;
          }
        }
        // riders hold a place in the bunch relative to the lead car
        const leadY = n * 0.3;
        for (const r of riders) {
          r.dy += Math.sin(t * r.w + r.ph) * 1.2 * s * dt; r.lat += Math.sin(t * r.w * 1.3 + r.ph * 2) * 0.12 * dt;
          r.lat = U.clamp(r.lat, -0.75, 0.75);
        }
        front.forEach((r, i) => { r.dy = -4 * s - 6 * s * (0.5 + 0.5 * Math.sin(t * 0.25 + i)); });
        const sorted = riders.slice().sort((a, b) => a.dy - b.dy);
        for (const r of sorted) {
          const y = leadY + r.dy - (r === attacker ? ao : 0), wy = camY + y, x = cxw(wy) + r.lat * roadW / 2, step = (Math.floor(t * 6 + r.ph) & 1);
          X.rect(g, x - 0.5 * s, y - 3 * s, Math.max(1, s), 6 * s, 0xff151515);
          X.rect(g, x - 1.2 * s, y - 1.5 * s, 2.4 * s, 3 * s, r.col);
          X.rect(g, x - 0.8 * s, y - 2.6 * s, 1.6 * s, 1.2 * s, X.rgb(240, 240, 240));
          X.put(g, x + (step ? 1.3 : -1.3) * s, y + 0.5 * s, X.rgb(220, 170, 140));
        }
        // the motorbike and lead car
        const ly = leadY - 18 * s, lx = cxw(camY + ly);
        X.rect(g, lx - 2.5 * s, ly - 4 * s, 5 * s, 8 * s, X.rgb(220, 30, 40)); X.rect(g, lx - 2 * s, ly - 2 * s, 4 * s, 3 * s, X.rgb(40, 50, 70));
        void f;
      };
  }
  // Peloton: the rework, chosen on the other rolls
  function rePeloton(R, U, g) {
      const { n, d } = g, ptr = pointer(g), land = R.pick(['fields', 'coast', 'mountain', 'vines']), nz = U.noise(R).n2;
      g.trait('View', 'Helicopter'); g.trait('Land', { fields: 'Farmland', coast: 'Coast road', mountain: 'Mountains', vines: 'Vineyards' }[land]);
      const fieldCols = land === 'mountain' ? [rgb(110, 130, 90), rgb(90, 110, 80), rgb(140, 140, 130)] : land === 'vines' ? [rgb(120, 150, 60), rgb(160, 120, 70)] : [rgb(130, 180, 70), rgb(200, 190, 90), rgb(90, 150, 60), rgb(170, 140, 80), rgb(110, 170, 110)];
      const A = R.range(10, 18), f1 = R.range(0.02, 0.035), f2 = R.range(0.05, 0.09), ph = R() * 10;
      const road = y => n / 2 + A * Math.sin(y * f1 + ph) + 6 * Math.sin(y * f2);
      const teams = R.shuffle(KITS).slice(0, 5);
      const riders = Array.from({ length: g.trait('Riders', R.int(22, 32)) }, (_, i) => ({ off: R.range(4, 26), lat: R.range(-2.5, 2.5), team: i % teams.length, ph: R() * TAU }));
      const breakaway = Array.from({ length: g.trait('Breakaway', R.int(1, 4)) }, (_, i) => ({ off: R.range(-22, -14) + i * 1.5, lat: R.range(-1.5, 1.5), team: R.int(0, teams.length - 1), ph: R() * TAU }));
      let cam = 0, attack = null;
      const rows = new Map();
      function terrainRow(wy) {
        const out = new Uint32Array(n), rx = road(wy);
        for (let x = 0; x < n; x++) {
          const dx = Math.abs(x - rx);
          let c;
          if (dx < 3.2) c = rgb(70, 72, 80);
          else if (dx < 4.2) c = rgb(200, 200, 190);
          else if (land === 'coast' && x - rx > 10 + 4 * nz(wy * 0.03, 1)) c = (x - rx) < 13 + 4 * nz(wy * 0.03, 1) ? rgb(240, 220, 160) : ((x + wy) % 7 === 0 ? rgb(90, 170, 230) : rgb(40, 120, 200));
          else {
            const cell = Math.floor((x + 200) / 11) * 31 + Math.floor((wy + 2000) / 13) * 17, k = (Math.imul(cell, 2654435761) >>> 24) % fieldCols.length;
            c = fieldCols[k];
            if (land === 'vines' && (x + Math.floor(wy / 3)) % 3 === 0) c = X.shade(c, 0.75);
            else if (land !== 'mountain' && ((x + 200) % 11 === 0 || (wy + 2000) % 13 === 0)) c = rgb(70, 110, 50);
            if (land === 'mountain') c = X.shade(c, [0.8, 0.95, 1.1][Math.floor((nz(x * 0.08, wy * 0.08) + 1) * 1.5) % 3]);
          }
          if (dx < 0.6 && wy % 6 < 3) c = WHITE;
          out[x] = c;
        }
        return out;
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        cam += dt * 14;
        if (p.active) for (const _ of p.taps) { attack = { off: 4, lat: R.range(-2, 2), team: R.int(0, teams.length - 1), ph: 0, v: 9 }; break; }
        else if (!attack && R() < dt * 0.05) attack = { off: 4, lat: R.range(-2, 2), team: R.int(0, teams.length - 1), ph: 0, v: 8 };
        if (attack) { attack.off -= attack.v * dt; if (attack.off < -16) { breakaway.push({ ...attack }); if (breakaway.length > 5) breakaway.shift(); attack = null; } }
        const viewY = cam - n * 0.55;
        for (let y = 0; y < n; y++) {
          const wy = Math.floor(y + viewY);
          let row = rows.get(wy);
          if (!row) { row = terrainRow(wy); rows.set(wy, row); }
          d.set(row, y * n);
        }
        for (const k of rows.keys()) if (k < viewY - 2) rows.delete(k);
        // trees along the verges
        for (let wy = Math.floor(viewY / 9) * 9; wy < viewY + n; wy += 9) { const y = Math.round(wy - viewY), side = ((wy / 9) & 1) ? 1 : -1, x = Math.round(road(wy) + side * 8); X.disc(g, x, y, 2.2, rgb(40, 100, 50)); X.put(g, x - 1, y - 1, rgb(80, 150, 70)); }
        const drawRider = (o, y0) => {
          const wy = cam + o.off, y = Math.round(wy - viewY), x = Math.round(road(wy) + o.lat + Math.sin(t * 2 + o.ph) * 0.4);
          const k = teams[o.team];
          X.put(g, x, y + 1, rgb(30, 30, 30)); X.put(g, x, y, k[0]); X.put(g, x, y - 1, k[1]);
          void y0;
        };
        const lead = breakaway.reduce((a, o) => Math.min(a, o.off), 0);
        { const wy = cam + lead - 4, y = Math.round(wy - viewY), x = Math.round(road(wy) + 1.5); X.rect(g, x, y, 1, 2, rgb(30, 30, 30)); X.put(g, x, y - 1, rgb(250, 250, 250)); }
        for (const o of breakaway) drawRider(o);
        if (attack) drawRider(attack);
        for (const o of riders) drawRider(o);
        for (let k = 0; k < 3; k++) { const wy = cam + 30 + k * 5, y = Math.round(wy - viewY), x = Math.round(road(wy) + 1.5); X.rect(g, x - 1, y, 3, 4, teams[k][0]); X.rect(g, x - 1, y + 1, 3, 1, rgb(40, 60, 80)); X.rect(g, x - 1, y - 1, 3, 1, rgb(40, 40, 40)); }
        const gap = Math.round(-lead * 2.2) + 's';
        X.rect(g, 1, 1, tw('GAP ' + gap) + 3, 7, rgb(20, 20, 30)); txt(g, 'GAP ' + gap, 2, 2, rgb(255, 220, 40));
      };
  }
  add({
    name: 'Peloton', seed: 2, sizes: [80, 100], fps: 12,
    interactive: 'Click to launch an attack: a rider jumps off the front.',
    recipe: 'A road race from the helicopter: the bunch flows round the bends of a country road, jerseys shuffling, a breakaway dangling ahead with its motorbike, the team cars behind, over patchwork fields, a coast road or mountain switchbacks.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogPeloton(R, U, g) : rePeloton(R, U, g); },
  });

  // ======================================================================
  add({
    name: 'Free Throws', seed: 3, sizes: [50, 80], fps: 12,
    interactive: 'Click to shoot.',
    listens: 'Clap to shoot; the crowd jumps when the room gets loud.',
    recipe: 'A player at the line puts up shot after shot: the ball spins along its arc to a clean swish that snaps the net, a rattle in off the rim, or a miss that caroms away, in a packed arena, a sunset street court or an old school gym.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), s = n / 50;
      const SET = R.pick([
        { name: 'arena', back: [rgb(16, 18, 40), rgb(26, 30, 64)], crowd: [rgb(240, 80, 80), rgb(250, 220, 90), rgb(90, 160, 250), WHITE], floor: [rgb(232, 160, 90), rgb(210, 136, 72)], line: WHITE, paint: rgb(30, 70, 200) },
        { name: 'street', back: [rgb(70, 40, 120), rgb(240, 120, 90)], crowd: null, floor: [rgb(120, 110, 120), rgb(100, 92, 104)], line: rgb(250, 220, 60), paint: rgb(220, 60, 90) },
        { name: 'gym', back: [rgb(40, 110, 80), rgb(56, 130, 96)], crowd: [rgb(250, 250, 250), rgb(250, 200, 60)], floor: [rgb(244, 200, 120), rgb(226, 182, 104)], line: rgb(200, 40, 40), paint: rgb(240, 120, 40) },
        { name: 'neon', back: [rgb(10, 4, 20), rgb(30, 10, 50)], crowd: [rgb(255, 60, 200), rgb(60, 240, 255)], floor: [rgb(30, 20, 50), rgb(40, 26, 70)], line: rgb(60, 240, 255), paint: rgb(255, 60, 200) },
      ]);
      const kit = R.pick(KITS), skin = R.pick(SKIN), fy = Math.round(n * 0.8);
      g.trait('Venue', SET.name[0].toUpperCase() + SET.name.slice(1)); g.trait('Kit', kitName(kit));
      // which end the basket is at, and the net: cord, or the chain of a park court
      const flip = g.trait('Basket', g.home ? 'Right' : g.alt.pick(['Right', 'Left'])) === 'Left', chain = g.trait('Net', g.home ? 'Cord' : g.alt.pick(['Cord', 'Cord', 'Chain'])) === 'Chain';
      const bg = new Uint32Array(n * n), fanI = [], fanR = [], fanH = [];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c;
        if (y < fy) {
          if (SET.name === 'street') c = y < fy * 0.55 ? (y / (fy * 0.55) > X.dith4(x, y) ? SET.back[1] : SET.back[0]) : (((x >> 2) + (y >> 1)) & 1 ? rgb(120, 70, 60) : rgb(140, 84, 70));
          else {
            c = SET.back[0];
            const row = Math.floor(y / 5), ry = y % 5, cx2 = (x + (row & 1) * 2) % 4, seat = Math.floor((x + (row & 1) * 2) / 4) * 31 + row * 17, h = Math.imul(seat, 2654435761) >>> 24;
            if (SET.crowd && y < fy - 8 && h < 200) {
              let fan = 0;
              if (ry === 1 && (cx2 === 1 || cx2 === 2)) fan = SKIN[h % SKIN.length]; else if (ry >= 2 && ry <= 3 && cx2 >= 1) fan = SET.crowd[h % SET.crowd.length];
              // the back rows sit in the gloom, the front rows in the light, so the court reads first
              if (fan) { c = X.mixPk(SET.back[0], fan, 0.45 + 0.45 * y / (fy - 8)); fanI.push(y * n + x); fanR.push(ry); fanH.push(seat); }
            }
            if (y >= fy - 8) c = SET.back[1];
          }
        } else c = SET.floor[((x + (y - fy) * 3) >> 2) & 1];
        bg[y * n + x] = c;
      }
      for (let x = 0; x < n; x++) bg[fy * n + x] = SET.line;
      const hx = Math.round(n * 0.78), rimY = Math.round(n * 0.38), pole = n - 3;
      // backboard, pole, rim (drawn every frame for the net)
      const px = Math.round(n * 0.25);
      let state = 'dribble', timer = R.range(0.8, 1.6), shot = null, made = 0, taken = 0, net = 0, streak = 0;
      const PLAYER = [sprite(['.33.', '.33.', '1111', '1111', '.11.', '.22.', '.2.2', '.4.4']), sprite(['3...', '33..', '.111', '.111', '.11.', '.22.', '.2.2', '.4.4'])];
      function shoot() {
        const roll = R(), outcome = roll < 0.55 ? 'swish' : roll < 0.75 ? 'rattle' : 'miss';
        shot = { t0: 0, T: 1.05, outcome, x0: px + 3 * s, y0: fy - 10 * s, spin: 0 };
        state = 'flight'; taken++;
      }
      let cheer = 0;
      return (t, dt) => {
        const p = ptr(dt, n), ear = hear(g);
        cheer = Math.max(0, cheer - dt);
        if (ear && ear.level > 0.25) cheer = Math.max(cheer, 0.3 + ear.level);
        if (state === 'dribble' || state === 'set') {
          if ((p.active && p.taps.length) || (ear && ear.beats && state === 'dribble')) { state = 'set'; timer = 0.15; }
          timer -= dt;
          if (timer <= 0) { if (state === 'dribble') { state = 'set'; timer = 0.45; } else shoot(); }
        }
        d.set(bg);
        // a made basket (or a loud room) brings the crowd up out of its seats, a few at a time
        if (cheer > 0 && fanI.length) {
          const beat = Math.floor(t * 8), share = Math.min(1, cheer) * 0.7;
          for (let i = 0; i < fanI.length; i++) {
            if ((Math.imul(fanH[i] + beat * 977, 2654435761) >>> 24) >= 255 * share) continue;
            const q = fanI[i];
            if (q - n >= 0) d[q - n] = bg[q];
            if (fanR[i] === 3) d[q] = SET.back[0];
          }
        }
        X.rect(g, pole, rimY - 8 * s, 2, fy - rimY + 8 * s, rgb(90, 90, 100));
        X.rect(g, hx + 5 * s, rimY - 9 * s, 2, 12 * s, WHITE); X.rect(g, hx + 5 * s, rimY - 9 * s, 2, 1, rgb(200, 30, 40));
        X.rect(g, hx + 4 * s, rimY - 4 * s, 1, 4 * s, X.shade(SET.paint, 0.8));
        // the shot
        let bx = px + 3 * s, by = fy - 6 * s;
        if (state === 'dribble') by = fy - 3 * s - Math.abs(Math.sin(t * 7)) * 3 * s;
        if (state === 'set') by = fy - 11 * s;
        if (state === 'flight' || state === 'after') {
          shot.t0 += dt;
          const u = Math.min(1, shot.t0 / shot.T), ex = hx + (shot.outcome === 'miss' ? 2 * s : 0), ey = rimY - s;
          if (state === 'flight') {
            bx = shot.x0 + (ex - shot.x0) * u; by = shot.y0 + (ey - shot.y0) * u - Math.sin(Math.PI * u) * 16 * s;
            if (u >= 1) {
              state = 'after'; shot.t1 = 0;
              if (shot.outcome !== 'miss') { made++; net = 0.6; streak++; cheer = shot.outcome === 'swish' ? 1.5 : 1.1; } else streak = 0;
            }
          } else {
            shot.t1 += dt;
            const v = shot.t1;
            if (shot.outcome === 'swish') { bx = hx; by = rimY + v * 30 * s; }
            else if (shot.outcome === 'rattle') { const k = Math.min(1, v / 0.6); bx = hx + Math.sin(v * 18) * 2 * s * (1 - k); by = rimY - 2 * s + Math.abs(Math.sin(v * 9)) * -3 * s * (1 - k) + k * v * 20 * s; }
            else { bx = hx + 2 * s - v * 18 * s; by = rimY - v * 12 * s + v * v * 40 * s; }
            if (by > fy - 2 * s) by = fy - 2 * s;
            if (v > 1.2) { state = 'dribble'; timer = R.range(0.8, 1.5); }
          }
        }
        // the player: crouched while dribbling, arms up to shoot
        const sp = PLAYER[state === 'dribble' ? 0 : 1], sc = Math.max(1, Math.round(s * 1.25));
        X.stamp(g, sp, Math.round(px - 2 * sc), fy - sp.length * sc, [0, kit[0], kit[1], skin, rgb(30, 30, 30)], false, sc);
        // rim and net: the net jumps when it snaps
        const rimL = hx - 3 * s, rimR = hx + 4 * s;
        X.rect(g, rimL, rimY, rimR - rimL + 1, Math.max(1, Math.round(s * 0.6)), rgb(250, 90, 20));
        net = Math.max(0, net - dt);
        for (let k = 0; k <= 6 * s; k++) { const w = (rimR - rimL) * (1 - k / (8 * s)), y = rimY + 1 + k + (net > 0 ? Math.round(Math.sin(net * 20) * s) : 0); for (let x = Math.round(hx + 0.5 - w / 2); x <= Math.round(hx + 0.5 + w / 2); x += 2) X.put(g, x + (k & 1), y, chain ? (k & 1 ? rgb(150, 150, 160) : rgb(210, 210, 220)) : rgb(250, 250, 250)); }
        orb(g, bx, by, 1.7 * s, rgb(240, 120, 30));
        X.put(g, bx, by, rgb(90, 40, 20));
        if (flip) mirror(d, n);
        // scoreboard
        X.rect(g, 1, 1, 23 * Math.max(1, s * 0.8), 8, BLACK);
        txt(g, made + '/' + taken, 3, 2, rgb(255, 60, 40));
        if (streak >= 3) txt(g, 'HOT', 3 + tw(made + '/' + taken) + 4, 2, rgb(255, 200, 40));
      };
    },
  });

  // ======================================================================
  // Eights: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogEights(R, U, g) {
      const { n, d } = g, s = n / 100, boats = R.int(2, 3), v0 = R.range(10, 14) * s;
      g.trait('View', 'Overhead'); g.trait('Boats', boats); g.trait('River', 'Green banks');
      const water = [X.rgb(40, 90, 120), X.rgb(50, 110, 140)], bank = X.rgb(70, 120, 60);
      const lanes = Array.from({ length: boats }, (_, i) => ({ x: n * (0.5 + (i - (boats - 1) / 2) * 0.27), col: X.inks(R, 3, 0.6)[0], rate: R.range(0.55, 0.7), ph: R.range(0, 1), y: n * R.range(0.35, 0.55), oar: X.rgb(240, 240, 240) }));
      const puddles = [], ptr = pointer(g);
      for (const b of lanes) { b.extra = 0; b.push = 0; }
      const hash = (a, b) => { const v2 = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v2 - Math.floor(v2); };
      return (t, dt) => {
        const camY = -t * v0, p = ptr(dt, n);
        if (p.active) for (const [x] of p.taps) { const b = lanes.reduce((a2, b2) => Math.abs(b2.x - x) < Math.abs(a2.x - x) ? b2 : a2); b.push = 4; }
        for (let y = 0; y < n; y++) {
          const wy = Math.floor(camY + y);
          for (let x = 0; x < n; x++) {
            const edge = 7 * s + 3 * s * Math.sin(wy * 0.05 / s);
            let c = x < edge || x > n - edge ? (hash(wy >> 2, x >> 2) < 0.15 ? X.rgb(40, 90, 40) : bank) : ((x * 3 + wy * 7) % 23 === 0 ? water[1] : water[0]);
            d[y * n + x] = c;
          }
        }
        for (let i = puddles.length - 1; i >= 0; i--) { const p = puddles[i]; p.age += dt; if (p.age > 3) { puddles.splice(i, 1); continue; } const y = p.wy - camY, r = 1 + p.age * 1.4 * s; for (let k = 0; k < 10; k++) { const a = k / 10 * TAU + p.age; X.put(g, p.x + Math.cos(a) * r, y + Math.sin(a) * r * 0.7, X.mixPk(water[0], WHITE, 0.6 * (1 - p.age / 3))); } }
        for (const b of lanes) {
          if (b.push > 0) { b.push -= dt; b.extra += dt * b.rate * 0.6; }
          const ph = (t * b.rate + b.ph + b.extra) % 1, drive = ph < 0.4, surge = drive ? Math.sin(ph / 0.4 * Math.PI) : 0;
          b.y += (-surge * 1.2 * s + 0.15 * s * Math.sin(t * 0.2 + b.ph * 9)) * dt * 12 * 0.1;
          b.y = U.clamp(b.y, n * 0.25, n * 0.7);
          const L = 42 * s, top = b.y - L / 2;
          // wake
          for (let k = 0; k < 14; k++) for (const side of [-1, 1]) X.put(g, b.x + side * (1 + k * 0.5) * s, b.y + L / 2 + k * 1.3 * s, X.mixPk(water[0], WHITE, 0.5 - k * 0.03));
          // oars: an angle that sweeps back on the drive and forward on the recovery
          const sweep = drive ? -0.7 + 1.4 * (ph / 0.4) : 0.7 - 1.4 * ((ph - 0.4) / 0.6), inWater = drive;
          for (let k = 0; k < 8; k++) {
            const oy = top + (k + 1) * L / 9.5, side = k % 2 ? 1 : -1, len = 12 * s, ex = b.x + side * Math.cos(sweep) * len, ey = oy + Math.sin(sweep) * len * 0.8;
            X.line(g, b.x, oy, ex, ey, b.oar);
            X.rect(g, ex - s, ey - s, 2 * s, 2 * s, inWater ? b.col : X.mixPk(b.col, WHITE, 0.4));
            if (ph < 0.03 + dt * b.rate && ph >= 0) puddles.push({ x: ex, wy: ey + camY, age: 0 });
          }
          X.rect(g, b.x - 1.5 * s, top, 3 * s, L, b.col);
          X.rect(g, b.x - 0.6 * s, top - 3 * s, 1.2 * s, L + 5 * s, b.col);
          for (let k = 0; k < 8; k++) X.rect(g, b.x - s, top + (k + 1) * L / 9.5 - s, 2 * s, 2 * s, X.rgb(240, 200, 170));
        }
      };
  }
  // Eights: the rework, chosen on the other rolls
  function reEights(R, U, g) {
      const { n, d } = g, ptr = pointer(g), boats = R.int(2, 3), waterI = R.int(0, 2), water = [[rgb(40, 90, 120), rgb(60, 120, 150)], [rgb(30, 70, 90), rgb(50, 100, 120)], [rgb(60, 110, 110), rgb(90, 140, 140)]][waterI];
      const bankI = R.int(0, 2), bank = [rgb(70, 130, 60), rgb(90, 140, 70), rgb(120, 130, 70)][bankI], lane = Math.floor((n - 20) / boats);
      const kits = R.shuffle(KITS.slice()).slice(0, boats);
      g.trait('View', 'Side-on'); g.trait('Boats', boats); g.trait('River', ['Slate', 'Dark', 'Green'][waterI] + ' water'); g.trait('Banks', ['Meadow', 'Willow', 'Hay'][bankI]); g.trait('Crews', kits.map(kitName).join(' v '));
      const crews = Array.from({ length: boats }, (_, i) => ({ y: 10 + i * lane + lane / 2, x: 0, rate: R.range(0.9, 1.1), ph: R() * TAU, push: 0, puddles: [] }));
      let cam = 0;
      const trees = Array.from({ length: 12 }, () => ({ x: R.range(0, n * 2), side: R.bool(0.5) ? 0 : 1, kind: R.pick(['willow', 'oak', 'house']) }));
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) for (const [, y] of p.taps) { const c = crews.find(o => Math.abs(o.y - y) < lane / 2); if (c) c.push = 4; }
        let lead = -1e9;
        for (const c of crews) {
          c.push = Math.max(0, c.push - dt);
          const rate = c.rate * (c.push ? 1.35 : 1);
          const prev = Math.sin(c.ph); c.ph += dt * TAU * 0.8 * rate;
          const drive = Math.max(0, Math.sin(c.ph));
          c.x += (6 + drive * 10) * rate * dt;
          if (prev < 0 && Math.sin(c.ph) >= 0) for (const sd of [-1, 1]) c.puddles.push({ x: c.x + 6, y: c.y + sd * 6, age: 0 });
          c.puddles.forEach(q => q.age += dt); c.puddles = c.puddles.filter(q => q.age < 5);
          lead = Math.max(lead, c.x);
        }
        cam += (lead - n * 0.62 - cam) * Math.min(1, dt * 2);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = water[0];
          if (((x + Math.floor(cam * 0.5) + y * 3) % 17) === 0) c = water[1];
          if (y < 8 || y > n - 9) c = (y < 6 || y > n - 7) ? bank : rgb(200, 190, 150);
          d[y * n + x] = c;
        }
        for (const tr of trees) {
          const x = Math.round(((tr.x - cam * 0.9) % (n * 2) + n * 2) % (n * 2) - n * 0.4), y = tr.side ? n - 4 : 2;
          if (tr.kind === 'house') { X.rect(g, x, y - 2, 7, 5, rgb(170, 70, 50)); X.rect(g, x + 1, y - 1, 5, 3, rgb(230, 220, 200)); }
          else X.disc(g, x, y, tr.kind === 'willow' ? 3.5 : 2.5, tr.kind === 'willow' ? rgb(110, 160, 60) : rgb(40, 100, 50));
        }
        crews.forEach((c, i) => {
          for (const q of c.puddles) { const x = Math.round(q.x - cam), a = q.age; if (a < 4) { const r = 1 + a * 0.6, col = X.mixPk(water[1], WHITE, 0.6 * (1 - a / 4)); X.put(g, x - r, q.y, col); X.put(g, x + r, q.y, col); X.put(g, x, q.y - 1, col); X.put(g, x, q.y + 1, col); } }
          const x0 = Math.round(c.x - cam), y = Math.round(c.y), k = kits[i];
          X.rect(g, x0 - 20, y, 42, 1, X.shade(k[0], 0.5)); X.rect(g, x0 - 18, y - 1, 38, 3, WHITE); X.rect(g, x0 - 16, y, 34, 1, X.shade(k[0], 0.8));
          for (let r = 0; r < 8; r++) {
            const rx = x0 - 14 + r * 4, side = r & 1 ? 1 : -1, sw = Math.cos(c.ph), ox = Math.round(sw * 3);
            X.line(g, rx, y, rx + ox, y + side * 8, rgb(240, 240, 240));
            X.rect(g, rx + ox - (side > 0 ? 0 : 1), y + side * 8 - (side > 0 ? 0 : 1), 2, 2, k[0]);
            X.put(g, rx, y, k[1]);
          }
          X.put(g, x0 + 18, y, rgb(250, 220, 60));
          if (c.push) txt(g, 'PUSH', x0 - 6, y - 7, rgb(255, 230, 60));
        });
      };
  }
  add({
    name: 'Eights', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Click a boat to have its cox call for a push: the rate goes up for a while.',
    recipe: 'Rowing eights race up a river: the oars swing together, the boats surge on each stroke, and every catch leaves a pair of puddles that drift and fade behind, between banks of willows and boathouses.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogEights(R, U, g) : reEights(R, U, g); },
  });

  // ======================================================================
  // Playbook: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogPlaybook(R, U, g) {
      const boardI = R.int(0, 2), accentI = R.int(0, 2), { n, d } = g, s = n / 100, board = [X.rgb(30, 60, 45), X.rgb(30, 34, 40), X.rgb(30, 45, 70)][boardI], chalk = X.rgb(236, 236, 226), accent = [X.rgb(250, 210, 80), X.rgb(250, 140, 160), X.rgb(130, 220, 250)][accentI];
      g.trait('Style', 'Chalk sketch'); g.trait('Board', ['Green', 'Slate', 'Navy'][boardI]); g.trait('Accent', ['Gold', 'Pink', 'Sky'][accentI]); g.trait('Sport', 'Football');
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = X.dith8(x * 5 + 3, y * 7 + 1) > 0.96 ? X.mixPk(board, chalk, 0.15) : board;
      // pitch markings in faded chalk
      const faint = X.mixPk(board, chalk, 0.35), G = { n, d: bg };
      X.line(G, 4 * s, n * 0.5, n - 4 * s, n * 0.5, faint);
      for (let a = 0; a < 40; a++) X.put(G, n / 2 + Math.cos(a / 40 * TAU) * 10 * s, n / 2 + Math.sin(a / 40 * TAU) * 10 * s, faint);
      X.line(G, n * 0.3, 4 * s, n * 0.3, n * 0.16, faint); X.line(G, n * 0.7, 4 * s, n * 0.7, n * 0.16, faint); X.line(G, n * 0.3, n * 0.16, n * 0.7, n * 0.16, faint);
      const smear = new Uint8Array(n * n), ptr = pointer(g);
      let mine = [];
      let play = null, t0 = 0;
      function newPlay(t) {
        t0 = t; smear.fill(0);
        const k = R.int(4, 5), xs = [];
        for (let i = 0; i < k; i++) {
          const x = n * (0.15 + 0.7 * (i + R.range(0.2, 0.8)) / k), y = n * R.range(0.62, 0.8), pts = [[x, y]];
          let px = x, py = y;
          for (let j = 0; j < R.int(2, 3); j++) { px = U.clamp(px + R.range(-22, 22) * s, 8 * s, n - 8 * s); py = U.clamp(py - R.range(10, 22) * s, 12 * s, n * 0.9); pts.push([px, py]); }
          xs.push({ pts, def: [x + R.range(-4, 4) * s, y - R.range(16, 26) * s] });
        }
        play = { xs, carrier: R.int(0, k - 1), recv: 0 };
        play.recv = (play.carrier + R.int(1, k - 1)) % k;
      }
      newPlay(0);
      const along = (pts, u) => { const segs = pts.length - 1, f = U.clamp(u) * segs, i = Math.min(segs - 1, Math.floor(f)), q = f - i; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * q]; };
      const crossAt = (x, y, c) => { for (let k = -2; k <= 2; k++) { X.put(g, x + k * s, y + k * s, c); X.put(g, x + k * s, y - k * s, c); } };
      const ringAt = (x, y, c) => { for (let a = 0; a < 12; a++) X.put(g, x + Math.cos(a / 12 * TAU) * 2.4 * s, y + Math.sin(a / 12 * TAU) * 2.4 * s, c); };
      return (t, dt) => {
        let tt = t - t0;
        if (tt > 12.5) { newPlay(t); tt = 0; mine = []; }
        const p = ptr(dt, n);
        if (p.active) { for (const [x, y] of p.taps) mine.push([[x, y]]); if (p.down && mine.length) { const st = mine[mine.length - 1], l = st[st.length - 1]; if (Math.hypot(p.x - l[0], p.y - l[1]) > 0.8) st.push([p.x, p.y]); } }
        for (let i = 0; i < n * n; i++) d[i] = smear[i] ? X.mixPk(bg[i], chalk, smear[i] / 255 * 0.3) : bg[i];
        const draw = U.clamp((tt - 0.5) / 3), run = U.clamp((tt - 4.5) / 3.5), wipe = tt > 9.5 ? (tt - 9.5) / 2.2 : -1;
        const wipeX = wipe >= 0 ? wipe * (n + 20 * s) - 10 * s : -1e9;
        const visible = (x) => x > wipeX + 6 * s;
        play.xs.forEach((p, i) => {
          // the route, chalked as a dotted line as the coach draws it
          const segs = p.pts.length - 1;
          for (let k = 0; k < 60; k++) { const u = k / 60; if (u > draw) break; const [x, y] = along(p.pts, u); if (k % 3 !== 2 && visible(x)) X.put(g, x, y, chalk); }
          if (draw >= 1) { const [x, y] = p.pts[segs], [ax, ay] = p.pts[segs - 1], a = Math.atan2(y - ay, x - ax); for (const da of [2.6, -2.6]) X.line(g, x, y, x + Math.cos(a + da) * 3 * s, y + Math.sin(a + da) * 3 * s, chalk); }
          const [mx, my] = run > 0 ? along(p.pts, run) : p.pts[0];
          if (visible(mx)) crossAt(mx, my, i === play.carrier ? accent : chalk);
          const dx = p.def[0] + (mx - p.pts[0][0]) * 0.7 * run, dy = p.def[1] + (my - p.pts[0][1]) * 0.5 * run;
          if (visible(dx)) ringAt(dx, dy, chalk);
        });
        // the pass: a dashed line from carrier to receiver, then the ball follows it
        if (run > 0.55) {
          const a = along(play.xs[play.carrier].pts, 0.55), b = along(play.xs[play.recv].pts, U.clamp(run)), q = U.clamp((run - 0.55) / 0.4);
          for (let k = 0; k < 40; k++) { const u = k / 40; if (u > q) break; const x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u; if ((k >> 1) % 2 === 0 && visible(x)) X.put(g, x, y, accent); }
          const bx = a[0] + (b[0] - a[0]) * q, by = a[1] + (b[1] - a[1]) * q;
          if (visible(bx)) ellipse(g, bx, by, 1.4 * s, 1.4 * s, accent);
        }
        for (const st of mine) for (let k = 1; k < st.length; k++) { if (visible(st[k][0])) X.line(g, st[k - 1][0], st[k - 1][1], st[k][0], st[k][1], accent); }
        // the eraser leaves a smear of chalk dust behind it
        if (wipe >= 0) {
          for (let y = 0; y < n; y++) for (let x = Math.max(0, Math.round(wipeX - 3 * s)); x < Math.min(n, wipeX + 6 * s); x++) { const i = y * n + x; smear[i] = Math.min(255, smear[i] + 18 + (X.dith4(x, y) * 30 | 0)); }
          const ey = n / 2 + Math.sin(t * 7) * n * 0.36;
          X.rect(g, wipeX, ey - 7 * s, 8 * s, 14 * s, X.rgb(120, 90, 60));
          X.rect(g, wipeX + s, ey - 6 * s, 6 * s, 12 * s, X.rgb(70, 70, 80));
        }
        for (let i = 0; i < n * n; i++) if (smear[i] && R() < 0.02) smear[i] = Math.max(0, smear[i] - 8);
      };
  }
  // Playbook: the rework, chosen on the other rolls
  function rePlaybook(R, U, g) {
      const { n, d } = g, ptr = pointer(g), sport = R.pick(['football', 'basket', 'soccer', 'hockey']), board = R.pick(['green', 'black', 'white']);
      g.trait('Style', 'Diagram'); g.trait('Sport', { football: 'Gridiron', basket: 'Basketball', soccer: 'Football', hockey: 'Hockey' }[sport]); g.trait('Board', { green: 'Green chalk', black: 'Black chalk', white: 'Whiteboard' }[board]);
      const B = board === 'green' ? rgb(30, 70, 50) : board === 'black' ? rgb(26, 28, 32) : rgb(240, 242, 236);
      const chalk = board === 'white' ? [rgb(30, 60, 200), rgb(220, 30, 40), rgb(20, 20, 20)] : [rgb(240, 240, 230), rgb(250, 220, 120), rgb(150, 220, 250)];
      const field = board === 'white' ? rgb(200, 205, 210) : X.mixPk(B, chalk[0], 0.22);
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = (board !== 'white' && (Math.imul(x * 17 + y * 31, 2654435761) >>> 27) === 0) ? X.mixPk(B, chalk[0], 0.12) : B;
      const fl = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) bg[y * n + x] = field; };
      if (sport === 'football') { for (let y = 8; y < n; y += 12) for (let x = 3; x < n - 3; x++) fl(x, y); for (let y = 8; y < n; y += 3) { fl(26, y); fl(n - 27, y); } }
      else if (sport === 'basket') { for (let x = 3; x < n - 3; x++) fl(x, 4); for (let a = 0; a <= 180; a += 3) { const r = a * Math.PI / 180; fl(Math.round(n / 2 + Math.cos(r) * 30), Math.round(4 + Math.sin(r) * 30)); fl(Math.round(n / 2 + Math.cos(r) * 9), Math.round(26 + Math.sin(r) * 9)); } for (let y = 4; y < 26; y++) { fl(n / 2 - 9, y); fl(n / 2 + 9, y); } }
      else if (sport === 'soccer') { for (let x = 3; x < n - 3; x++) { fl(x, 3); fl(x, n - 4); } for (let y = 3; y < n - 3; y++) { fl(3, y); fl(n - 4, y); } for (let x = 20; x < n - 20; x++) fl(x, 20); for (let y = 3; y < 20; y++) { fl(20, y); fl(n - 21, y); } for (let a = 0; a < 360; a += 4) fl(Math.round(n / 2 + Math.cos(a / 57.3) * 10), Math.round(n - 4 + Math.sin(a / 57.3) * 10)); }
      else { for (let a = 0; a < 360; a += 2) { const r = a / 57.3; fl(Math.round(n / 2 + Math.cos(r) * 12), Math.round(n / 2 + Math.sin(r) * 12)); } for (let x = 3; x < n - 3; x++) { fl(x, n / 2); fl(x, 14); fl(x, n - 15); } }
      let marks, routes, phase, prog, run, wipe, user = [], hold;
      const O = sprite(['.111.', '1...1', '1...1', '1...1', '.111.']), XS = sprite(['1...1', '.1.1.', '..1..', '.1.1.', '1...1']);
      function newPlay() {
        marks = []; routes = []; user = [];
        const k = R.int(4, 6), base = n * R.range(0.55, 0.7);
        for (let i = 0; i < k; i++) {
          const x = 10 + (n - 20) * (i + 0.5) / k, y = base + R.range(-3, 3);
          const pts = [[x, y]]; let px = x, py = y, ang = -Math.PI / 2 + R.range(-0.6, 0.6);
          for (let s = 0; s < R.int(2, 4); s++) { const len = R.range(10, 22); ang += R.pick([0, 0.9, -0.9, 1.6, -1.6]) * R.range(0.6, 1); px = U.clamp(px + Math.cos(ang) * len, 4, n - 5); py = U.clamp(py + Math.sin(ang) * len, 6, n - 6); pts.push([px, py]); }
          routes.push({ pts, col: chalk[i === 0 ? 1 : 0] });
          marks.push({ kind: 'O', x, y }); marks.push({ kind: 'X', x: x + R.range(-6, 6), y: y - R.range(8, 14) });
        }
        const qb = routes[R.int(0, routes.length - 1)];
        routes.push({ pts: [[n / 2, base + 8], qb.pts[qb.pts.length - 1]], col: chalk[2], dashed: true, late: true });
        marks.push({ kind: 'O', x: n / 2, y: base + 8 });
        phase = 'draw'; prog = 0; run = 0; wipe = 0; hold = 0;
      }
      newPlay();
      const lenOf = r => { let L = 0; for (let i = 1; i < r.pts.length; i++) L += Math.hypot(r.pts[i][0] - r.pts[i - 1][0], r.pts[i][1] - r.pts[i - 1][1]); return L; };
      const along = (r, u) => { let L = lenOf(r) * u; for (let i = 1; i < r.pts.length; i++) { const a = r.pts[i - 1], b = r.pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L <= l) return [a[0] + (b[0] - a[0]) * L / l, a[1] + (b[1] - a[1]) * L / l]; L -= l; } return r.pts[r.pts.length - 1]; };
      const chalkLine = (pts, upto, col, dashed) => {
        let walked = 0;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
          for (let s = 0; s < l; s += 0.5) { if (walked + s > upto) return; if (dashed && ((walked + s) % 4) > 2) continue; const x = a[0] + (b[0] - a[0]) * s / l, y = a[1] + (b[1] - a[1]) * s / l; if ((Math.imul(Math.round(x) * 7 + Math.round(y) * 13, 2654435761) >>> 28) > 1) X.put(g, x, y, col); }
          walked += l;
        }
        // an arrowhead at the end
        const a = pts[pts.length - 2], b = pts[pts.length - 1], an = Math.atan2(b[1] - a[1], b[0] - a[0]);
        for (const s of [-1, 1]) for (let k = 1; k <= 3; k++) X.put(g, b[0] - Math.cos(an + s * 0.6) * k, b[1] - Math.sin(an + s * 0.6) * k, col);
      };
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          for (const [x, y] of p.taps) { if (phase === 'draw' || phase === 'hold') user.push([[x, y]]); }
          if (p.down && user.length) { const s = user[user.length - 1], l = s[s.length - 1]; if (Math.hypot(p.x - l[0], p.y - l[1]) > 1) s.push([p.x, p.y]); }
          if (p.released && user.length && user[user.length - 1].length < 3 && phase !== 'run') { user.pop(); phase = 'run'; run = 0; }
          else if (p.released && user.length) { const s = user[user.length - 1]; routes.push({ pts: s, col: chalk[1], user: true }); marks.push({ kind: 'O', x: s[0][0], y: s[0][1] }); user.pop(); }
        }
        const total = routes.reduce((a, r) => a + lenOf(r), 0);
        if (phase === 'draw') { prog += dt * 60; if (prog > total) { phase = 'hold'; hold = 1.2; } }
        else if (phase === 'hold') { hold -= dt; if (hold <= 0 && !p.active) { phase = 'run'; run = 0; } }
        else if (phase === 'run') { run += dt * 0.4; if (run >= 1.3) { phase = 'wipe'; wipe = 0; } }
        else { wipe += dt * 0.8; if (wipe >= 1) newPlay(); }
        d.set(bg);
        let drawn = phase === 'draw' ? prog : 1e9;
        for (const r of routes) { const L = lenOf(r); chalkLine(r.pts, drawn, r.col, r.dashed); drawn -= L; if (drawn < 0) break; }
        for (const s of user) if (s.length > 1) chalkLine(s, 1e9, chalk[1]);
        for (let i = 0; i < marks.length; i++) {
          const m = marks[i]; let x = m.x, y = m.y;
          if (phase === 'run' || phase === 'wipe') {
            const r = routes.find(o => o.pts[0][0] === m.x && o.pts[0][1] === m.y && !o.dashed);
            if (r && m.kind === 'O') [x, y] = along(r, Math.min(1, run));
            else if (m.kind === 'X') { const tgt = marks[i - 1]; const rr = routes.find(o => o.pts[0][0] === tgt.x && o.pts[0][1] === tgt.y); if (rr) { const [qx, qy] = along(rr, Math.min(1, Math.max(0, run - 0.1))); x += (qx - x) * Math.min(1, run); y += (qy - y) * Math.min(1, run); } }
          }
          X.stamp(g, m.kind === 'O' ? O : XS, Math.round(x - 2), Math.round(y - 2), [0, m.kind === 'O' ? chalk[0] : chalk[1]]);
        }
        const pass = routes.find(r => r.dashed);
        if (pass && (phase === 'run' || phase === 'wipe') && run > 0.55) { const [x, y] = along(pass, Math.min(1, (run - 0.55) / 0.45)); X.disc(g, x, y, 1.6, board === 'white' ? rgb(150, 80, 40) : rgb(220, 140, 70)); }
        if (phase === 'wipe') {
          const xw = Math.round(wipe * (n + 16)) - 8;
          for (let y = 0; y < n; y++) for (let x = 0; x < Math.min(n, xw); x++) d[y * n + x] = bg[y * n + x];
          X.rect(g, xw - 4, Math.round(n / 2 - 8 + Math.sin(wipe * 20) * 10), 8, 5, rgb(120, 90, 60)); X.rect(g, xw - 4, Math.round(n / 2 - 8 + Math.sin(wipe * 20) * 10) + 3, 8, 2, rgb(220, 220, 210));
        }
        txt(g, sport === 'basket' ? 'PLAY 3' : sport === 'soccer' ? 'SET PIECE' : sport === 'hockey' ? 'BREAKOUT' : 'PLAY 22', 3, n - 7, chalk[1]);
      };
  }
  add({
    name: 'Playbook', seed: 2, sizes: [80, 100], fps: 12,
    interactive: 'Drag to draw your own chalk routes; click to run the play.',
    recipe: 'A coach draws a play on the board: crosses and circles, curling routes with arrowheads, a dashed pass; the marks then run their routes, and the eraser wipes it for the next one. Football, basketball, soccer or hockey, on green chalk, black chalk or a whiteboard.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogPlaybook(R, U, g) : rePlaybook(R, U, g); },
  });
})();
