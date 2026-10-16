// Growth: things that build themselves, then start again.
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
  // The cell under each tap in the large view (an empty list in tiles).
  const tapsAt = (g, n) => g.input.taps().map(p => ({ x: Math.min(n - 1, Math.max(0, Math.floor(p.x * n))), y: Math.min(n - 1, Math.max(0, Math.floor(p.y * n))) }));

  P.add({
    interactive: 'Click to plant a new seed for the wanderers to stick to.',
    name: 'Aggregate', seed: 1, fam: 'Growth', type: 'px', n: 84,
    recipe: 'Wanderers drift at random until they touch a cluster and stick, so it grows by its tips; colour is the order of arrival. One seed in the middle, a scatter of seeds, a floor that grows coral, a ring that grows inward or a line down the middle, until the frame is full of branches.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, occ = new Int32Array(N), c = n >> 1;
        const mode = R.pick(['point', 'point', 'floor', 'ring']), hue = R.range(0.05, 0.14), drift = R.range(3, 7);
        let count, reach, born = 0, hold, full;
        const reset = t => {
          occ.fill(0); count = 1; hold = 0; full = false; born = t;
          if (mode === 'point') { occ[c * n + c] = 1; reach = 1; }
          else if (mode === 'floor') { for (let x = 0; x < n; x++) occ[(n - 1) * n + x] = 1; reach = n - 1; }
          else { reach = n * 0.46; for (let a = 0; a < 2000; a++) occ[Math.round(c + reach * Math.sin(a / 2000 * U.TAU)) * n + Math.round(c + reach * Math.cos(a / 2000 * U.TAU))] = 1; }
        };
        const stick = () => {
          let x, y;
          if (mode === 'point') { const th = R() * U.TAU; x = Math.round(c + (reach + 5) * Math.cos(th)); y = Math.round(c + (reach + 5) * Math.sin(th)); }
          else if (mode === 'floor') { x = R.int(0, n - 1); y = Math.max(1, reach - 6); }
          else { x = c + R.int(-2, 2); y = c + R.int(-2, 2); }
          for (let s = 0; s < 6000; s++) {
            const m = R() * 4 | 0;
            if (m === 0) x++; else if (m === 1) x--; else if (m === 2) y++; else y--;
            if (mode === 'floor') { x = (x + n) % n; if (y < 1) y = 1; if (y < reach - 14) y = reach - 14; }
            else if (mode === 'point') { const dx = x - c, dy = y - c; if (dx * dx + dy * dy > (reach + 16) * (reach + 16)) return false; }
            if (x < 1 || y < 1 || x > n - 2 || y > n - 2) return false;
            const i = y * n + x;
            if (occ[i - 1] || occ[i + 1] || occ[i - n] || occ[i + n] || occ[i - n - 1] || occ[i - n + 1] || occ[i + n - 1] || occ[i + n + 1]) {
              occ[i] = ++count;
              const r = Math.hypot(x - c, y - c);
              if (mode === 'point') { reach = Math.max(reach, r); if (reach > c - 7) full = true; }
              else if (mode === 'floor') { reach = Math.min(reach, y); if (reach < 10) full = true; }
              else { reach = Math.min(reach, r); if (r < 5) full = true; }
              return true;
            }
          }
          return false;
        };
        reset(0);
        const grownEnough = () => (mode === 'point' ? reach > (c - 7) * 0.55 : mode === 'floor' ? reach < n * 0.62 : reach < n * 0.32);
        for (let k = 0; k < 450 && !full && !grownEnough(); k++) stick();   // opens on a fuller cluster, but well short of full
        g.trait('Palette', palName(sc)); g.trait('Seed', { point: 'Point', floor: 'Floor', ring: 'Ring' }[mode]); g.trait('Grip', 'Sticky'); g.trait('Tips', 'Lit'); g.trait('Ground', 'Black');
        return (t, dt, f) => {
          for (const p of tapsAt(g, n)) if (!full && !occ[p.y * n + p.x]) occ[p.y * n + p.x] = ++count;
          if (full) { if ((hold += dt) > 6) { reset(t); for (let k = 0; k < 250 && !full && !grownEnough(); k++) stick(); } }
          else for (let got = 0, tries = 0; got < (f % 2 ? 2 : 1) && tries < 12; tries++) if (stick()) got++;
          const hd = t * drift;
          for (let i = 0; i < N; i++) { const v = occ[i]; d[i] = v === 0 ? BLACK : v > 1 && count - v < 10 && !full ? WHITE : sc.lut[(v * hue + hd) & 255]; }
          U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, full ? (6 - hold) / 1.2 : 1));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, occ = new Int32Array(N), c = n >> 1;
      const mode = R.pick(['point', 'seeds', 'seeds', 'floor', 'ring', 'line']), hue = R.range(0.02, 0.09), drift = R.range(3, 7), stickiness = R.pick([1, 1, 0.5, 0.25]);
      const ground = R.bool(0.35) ? U.pk(U.mix(sc.cols[R.int(0, sc.cols.length - 1)], [0, 0, 0], 0.88)) : BLACK, tips = R.bool(0.7), shade = U.dim(sc.lut, 0.6);
      const target = N * R.range(0.22, 0.34);
      let count, born = 0, hold, full;
      const reset = t => {
        occ.fill(0); count = 1; hold = 0; full = false; born = t;
        if (mode === 'point') occ[c * n + c] = 1;
        else if (mode === 'seeds') for (let k = R.int(3, 9); k > 0; k--) occ[R.int(4, n - 5) * n + R.int(4, n - 5)] = 1;
        else if (mode === 'floor') for (let x = 0; x < n; x++) occ[(n - 1) * n + x] = 1;
        else if (mode === 'line') for (let y = 4; y < n - 4; y++) occ[y * n + c] = 1;
        else for (let a = 0; a < 4000; a++) occ[Math.round(c + c * 0.92 * Math.sin(a / 4000 * U.TAU)) * n + Math.round(c + c * 0.92 * Math.cos(a / 4000 * U.TAU))] = 1;
      };
      // a wanderer set down on a free cell, walked until it touches (or gives up)
      const stick = () => {
        let x = R.int(1, n - 2), y = mode === 'floor' ? R.int(1, n - 2) : R.int(1, n - 2);
        if (mode === 'ring') { const a = R() * U.TAU, r = c * 0.92 * Math.sqrt(R()); x = Math.round(c + r * Math.cos(a)); y = Math.round(c + r * Math.sin(a)); }
        if (occ[y * n + x]) return false;
        for (let s = 0; s < 3000; s++) {
          const m = R() * 4 | 0;
          if (m === 0) x++; else if (m === 1) x--; else if (m === 2) y++; else y--;
          if (x < 1) x = 1; else if (x > n - 2) x = n - 2;
          if (y < 1) y = 1; else if (y > n - 2) y = n - 2;
          const i = y * n + x;
          if (occ[i]) { if (m === 0) x--; else if (m === 1) x++; else if (m === 2) y--; else y++; continue; }
          if ((occ[i - 1] || occ[i + 1] || occ[i - n] || occ[i + n] || occ[i - n - 1] || occ[i - n + 1] || occ[i + n - 1] || occ[i + n + 1]) && R() < stickiness) {
            occ[i] = ++count;
            if (count > target) full = true;
            return true;
          }
        }
        return false;
      };
      reset(0);
      for (let k = 0; k < target * 0.6; k++) stick();
      const per = Math.max(2, Math.round(N / 1600));
      g.trait('Palette', palName(sc)); g.trait('Seed', { point: 'Point', seeds: 'Scatter', floor: 'Floor', ring: 'Ring', line: 'Line' }[mode]); g.trait('Grip', stickiness === 1 ? 'Sticky' : stickiness === 0.5 ? 'Loose' : 'Slippery'); g.trait('Tips', tips ? 'Lit' : 'Dark'); g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted');
      return (t, dt) => {
        for (const p of tapsAt(g, n)) if (!full) occ[p.y * n + p.x] = occ[p.y * n + p.x] || ++count;
        if (full) { if ((hold += dt) > 6) { reset(t); for (let k = 0; k < target * 0.2; k++) stick(); } }
        else for (let got = 0, tries = 0; got < per && tries < per * 4; tries++) if (stick()) got++;
        const hd = t * drift;
        for (let i = 0; i < N; i++) {
          const v = occ[i];
          d[i] = v === 0 ? ground : tips && v > 1 && count - v < per * 3 && !full ? WHITE : (v & 1 ? sc.lut : shade)[(v * hue + hd) & 255];
        }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, full ? (6 - hold) / 1.2 : 1));
      };
    },
  });
  P.add({
    name: 'Venation', seed: 4, fam: 'Growth', type: 'vec',
    recipe: 'Veins grow toward the nearest unfed points of a leaf and stop feeding them as they arrive; trunks thicken, tips fork.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.55), D = 80, KILL = 17, SEG = 9;
      let ax, ay, nx, ny, np, grid, iter, state, hold, shape;
      const key = (x, y) => Math.floor(x / D) * 64 + Math.floor(y / D);
      const addNode = (x, y, parent) => { nx.push(x); ny.push(y); np.push(parent); const k = key(x, y); (grid.get(k) || grid.set(k, []).get(k)).push(nx.length - 1); };
      const reset = () => {
        sh.paint(); ax = []; ay = []; nx = []; ny = []; np = []; grid = new Map(); iter = 0; state = 'grow'; hold = 0;
        shape = R.pick(['disc', 'disc', 'leaf', 'ring', 'square']);
        for (let tries = 0; ax.length < 520 && tries < 20000; tries++) {
          const x = R.range(60, 940), y = R.range(60, 940), dx = x - 500, dy = y - 500, r = Math.hypot(dx, dy);
          const ok = shape === 'disc' ? r < 430 : shape === 'ring' ? r < 440 && r > 170 : shape === 'leaf' ? Math.abs(dx) < 330 * Math.sin(Math.PI * (y - 60) / 880) ** 0.8 : true;
          if (ok) { ax.push(x); ay.push(y); }
        }
        const roots = shape === 'leaf' ? [[500, 930]] : shape === 'ring' ? [0, 1, 2].map(i => [500 + 445 * Math.cos(i * 2.1), 500 + 445 * Math.sin(i * 2.1)]) : R.bool() ? [[500, 500]] : [[500, 935]];
        for (const [x, y] of roots) addNode(x, y, -1);
      };
      const grow = () => {
        const dx = new Map(), dy = new Map();
        for (let a = ax.length - 1; a >= 0; a--) {
          let best = -1, bd = D * D;
          const cx = Math.floor(ax[a] / D), cy = Math.floor(ay[a] / D);
          for (let u = -1; u <= 1; u++) for (let v = -1; v <= 1; v++) for (const j of grid.get((cx + u) * 64 + cy + v) || []) { const q = (nx[j] - ax[a]) ** 2 + (ny[j] - ay[a]) ** 2; if (q < bd) { bd = q; best = j; } }
          if (best < 0) continue;
          if (bd < KILL * KILL) { ax.splice(a, 1); ay.splice(a, 1); continue; }
          const dist = Math.sqrt(bd);
          dx.set(best, (dx.get(best) || 0) + (ax[a] - nx[best]) / dist); dy.set(best, (dy.get(best) || 0) + (ay[a] - ny[best]) / dist);
        }
        let grew = 0;
        iter++;
        ctx.lineWidth = g.lw(1 + 5 * Math.exp(-iter / 28));
        ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, iter / 90, true));
        ctx.beginPath();
        for (const [j, vx] of dx) {
          const vy = dy.get(j), m = Math.hypot(vx, vy) || 1, x = nx[j] + vx / m * SEG, y = ny[j] + vy / m * SEG;
          let dup = false;
          for (const q of grid.get(key(x, y)) || []) if ((nx[q] - x) ** 2 + (ny[q] - y) ** 2 < 4) { dup = true; break; }
          if (dup) continue;
          ctx.moveTo(nx[j], ny[j]); ctx.lineTo(x, y); addNode(x, y, j); grew++;
        }
        ctx.stroke();
        if (!grew || !ax.length || nx.length > 6000) state = 'hold';
      };
      reset();
      return (t, dt) => {
        if (state === 'grow') grow();
        else if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
        else { sh.paint(0.16); if ((hold += dt) > 1.3) reset(); }
      };
    },
  });

  P.add({
    name: 'Differential Growth', seed: 4, fam: 'Growth', type: 'vec',
    recipe: 'A loop that keeps adding length but may never cross itself, so it buckles; each stage is left behind as a growth ring.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.35), REP = 29, MAXE = 15, CAP = 1300;
      let xs, ys, iter, state, hold, lim;
      const reset = () => {
        sh.paint(); xs = []; ys = []; iter = 0; state = 'grow'; hold = 0; lim = R.range(380, 450);
        const k = 28, r0 = R.range(30, 60), lobes = R.int(2, 5), bump = R.range(0, 0.3);
        for (let i = 0; i < k; i++) { const a = i / k * U.TAU, r = r0 * (1 + bump * Math.sin(a * lobes)); xs.push(500 + r * Math.cos(a)); ys.push(500 + r * Math.sin(a)); }
      };
      const step = () => {
        const n = xs.length, grid = new Map(), fx = new Float32Array(n), fy = new Float32Array(n);
        for (let i = 0; i < n; i++) { const k = Math.floor(xs[i] / REP) * 128 + Math.floor(ys[i] / REP); (grid.get(k) || grid.set(k, []).get(k)).push(i); }
        for (let i = 0; i < n; i++) {
          const p = (i + n - 1) % n, q = (i + 1) % n, x = xs[i], y = ys[i];
          fx[i] += ((xs[p] + xs[q]) / 2 - x) * 0.45; fy[i] += ((ys[p] + ys[q]) / 2 - y) * 0.45;
          const cx = Math.floor(x / REP), cy = Math.floor(y / REP);
          for (let u = -1; u <= 1; u++) for (let v = -1; v <= 1; v++) for (const j of grid.get((cx + u) * 128 + cy + v) || []) {
            if (j === i) continue;
            const dx = x - xs[j], dy = y - ys[j], dd = dx * dx + dy * dy;
            if (dd < REP * REP && dd > 1e-6) { const dist = Math.sqrt(dd), f = (REP - dist) / REP * 1.8; fx[i] += dx / dist * f; fy[i] += dy / dist * f; }
          }
          const r = Math.hypot(x - 500, y - 500);
          if (r > lim) { fx[i] -= (x - 500) / r * (r - lim) * 0.3; fy[i] -= (y - 500) / r * (r - lim) * 0.3; }
        }
        for (let i = 0; i < n; i++) { xs[i] += Math.max(-4, Math.min(4, fx[i])); ys[i] += Math.max(-4, Math.min(4, fy[i])); }
        if (n < CAP) for (let i = xs.length - 1; i >= 0; i--) {
          const q = (i + 1) % xs.length, len = Math.hypot(xs[q] - xs[i], ys[q] - ys[i]);
          if (len > MAXE || (len > MAXE * 0.55 && R() < 0.05)) { xs.splice(i + 1, 0, (xs[i] + xs[q]) / 2 + R.range(-0.5, 0.5)); ys.splice(i + 1, 0, (ys[i] + ys[q]) / 2 + R.range(-0.5, 0.5)); }
        }
        iter++;
      };
      const ring = () => {
        ctx.lineWidth = g.lw(1.3);
        ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, iter / 260, true), sh.paper ? 0.55 : 0.9);
        ctx.beginPath(); ctx.moveTo(xs[0], ys[0]);
        for (let i = 1; i < xs.length; i++) ctx.lineTo(xs[i], ys[i]);
        ctx.closePath(); ctx.stroke();
      };
      reset();
      for (let i = 0; i < 160; i++) step();
      return (t, dt) => {
        if (state === 'grow') {
          for (let k = 0; k < 3; k++) { step(); if (iter % (sh.paper ? 44 : 22) === 0) ring(); }
          if (xs.length >= CAP && (hold += dt) > 9) { state = 'hold'; hold = 0; }
        } else if (state === 'hold') { if ((hold += dt) > 4) { state = 'fade'; hold = 0; } }
        else { sh.paint(0.16); if ((hold += dt) > 1.3) { reset(); for (let i = 0; i < 160; i++) step(); } }
      };
    },
  });

  P.add({
    name: 'Substrate', fam: 'Growth', type: 'vec',
    recipe: 'Cracks run straight until they hit another crack, and new ones branch off at right angles, washing one bank with colour.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.5), sc = sh.scheme, G = 334, C = 1000 / G, EMPTY = 1e4;
      const grid = new Float32Array(G * G);
      let cracks, state, hold, filled, curl, snap, taken;
      const spawn = () => {
        for (let tries = 0; tries < 20; tries++) {
          const cell = taken[R.int(0, taken.length - 1)], x = cell % G, y = (cell / G) | 0, a = grid[cell];
          const t = a + (R.bool() ? 90 : -90) + (snap ? 0 : R.range(-2, 2));
          return { x: x + 0.61 * Math.cos(t * Math.PI / 180), y: y + 0.61 * Math.sin(t * Math.PI / 180), t, col: R.pick(sc.cols), side: R.sign(), bend: curl ? R.range(-0.35, 0.35) : 0 };
        }
        return null;
      };
      const reset = () => {
        sh.paint(); grid.fill(EMPTY); cracks = []; taken = []; state = 'grow'; hold = 0; filled = 0; curl = R.bool(0.3); snap = R.bool(0.3);
        for (let k = 0; k < 6; k++) { const cell = R.int(20, G - 21) * G + R.int(20, G - 21); grid[cell] = snap ? R.pick([0, 90]) : R.range(0, 360); taken.push(cell); }
        for (let k = 0; k < 4; k++) { const c = spawn(); if (c) cracks.push(c); }
      };
      const move = c => {
        const px = c.x, py = c.y, rad = c.t * Math.PI / 180;
        c.t += c.bend; c.x += 0.5 * Math.cos(rad); c.y += 0.5 * Math.sin(rad);
        const cx = Math.floor(c.x + R.range(-0.2, 0.2)), cy = Math.floor(c.y + R.range(-0.2, 0.2));
        if (cx < 0 || cy < 0 || cx >= G || cy >= G) return false;
        const cur = grid[cy * G + cx];
        if (cur !== EMPTY && Math.abs(cur - c.t) > 2 + Math.abs(c.bend) * 3) return false;
        if (cur === EMPTY) { filled++; taken.push(cy * G + cx); }
        grid[cy * G + cx] = c.t;
        // wash: a faint stroke from the crack to the first crack across its bank
        const sx = -Math.sin(rad) * c.side, sy = Math.cos(rad) * c.side;
        let len = 2;
        for (; len < 110; len++) { const qx = Math.floor(c.x + sx * len), qy = Math.floor(c.y + sy * len); if (qx < 0 || qy < 0 || qx >= G || qy >= G || grid[qy * G + qx] !== EMPTY) break; }
        const reach = len * R.range(0.15, 0.9);
        ctx.strokeStyle = U.css(c.col, sh.paper ? 0.05 : 0.07); ctx.lineWidth = C * 1.6;
        ctx.beginPath(); ctx.moveTo(c.x * C, c.y * C); ctx.lineTo((c.x + sx * reach) * C, (c.y + sy * reach) * C); ctx.stroke();
        ctx.strokeStyle = U.css(sh.ink, 0.95); ctx.lineWidth = g.lw(1.5);
        ctx.beginPath(); ctx.moveTo(px * C, py * C); ctx.lineTo(c.x * C, c.y * C); ctx.stroke();
        return true;
      };
      reset();
      return (t, dt) => {
        if (state === 'grow') {
          for (let s = 0; s < 7; s++) for (let i = cracks.length - 1; i >= 0; i--) if (!move(cracks[i])) {
            const a = spawn(), b = cracks.length < 70 && R.bool(0.6) ? spawn() : null;
            if (a) cracks[i] = a; else cracks.splice(i, 1);
            if (b) cracks.push(b);
          }
          if (filled > G * G * 0.11 || !cracks.length) { state = 'hold'; hold = 0; }
        } else if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
        else { sh.paint(0.16); if ((hold += dt) > 1.3) reset(); }
      };
    },
  });

  P.add({
    interactive: 'Click to start a new maze (on the pixel mazes, click a cell to send the thread there).',
    name: 'Labyrinth', seed: 2, fam: 'Growth', type: 'vec',
    recipe: 'A round maze carved by a random walk that never revisits a cell, then a thread finds the one way out from the middle. Some rolls carve a pixel maze instead, inside a square, a circle, a diamond, a ring or a cross, where a click sends the thread.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.6), sc = sh.scheme;
        let rings, w, counts, first, open, path, exit, born, len;
        const id = (r, i) => first[r] + ((i % counts[r]) + counts[r]) % counts[r];
        const link = (a, b) => (a < b ? a * 4096 + b : b * 4096 + a);
        const reset = t => {
          born = t; rings = R.int(9, 13); w = 450 / (rings + 0.35); counts = [1, R.pick([5, 6, 8])]; first = [0, 1];
          for (let r = 2; r < rings; r++) { const arc = U.TAU * (r + 0.35) * w / counts[r - 1]; counts.push(counts[r - 1] * (arc > 1.7 * w ? 2 : 1)); first.push(first[r - 1] + counts[r - 1]); }
          const total = first[rings - 1] + counts[rings - 1], where = new Array(total), seen = new Uint8Array(total), from = new Int32Array(total).fill(-1);
          for (let r = 0; r < rings; r++) for (let i = 0; i < counts[r]; i++) where[id(r, i)] = [r, i];
          const near = c => {
            const [r, i] = where[c], out = [];
            if (r === 0) { for (let k = 0; k < counts[1]; k++) out.push(id(1, k)); return out; }
            out.push(id(r, i + 1), id(r, i - 1), r === 1 ? 0 : id(r - 1, Math.floor(i * counts[r - 1] / counts[r])));
            if (r < rings - 1) { const ratio = counts[r + 1] / counts[r]; for (let k = 0; k < ratio; k++) out.push(id(r + 1, i * ratio + k)); }
            return out;
          };
          open = new Set();
          const stack = [0]; seen[0] = 1;
          while (stack.length) {
            const c = stack[stack.length - 1], opts = near(c).filter(q => !seen[q]);
            if (!opts.length) { stack.pop(); continue; }
            const q = R.pick(opts); seen[q] = 1; from[q] = c; open.add(link(c, q)); stack.push(q);
          }
          exit = id(rings - 1, R.int(0, counts[rings - 1] - 1));
          const cells = []; for (let c = exit; c !== -1; c = from[c]) cells.push(c);
          cells.reverse();
          // the thread, as points in (radius, angle), following each ring's curve
          path = [[0, 0]];
          let ang = null;
          for (const c of cells.slice(1)) {
            const [r, i] = where[c], a0 = (i + 0.5) / counts[r] * U.TAU, rad = (r + 0.35) * w;
            if (ang === null) ang = a0;
            let da = a0 - ang; da -= Math.round(da / U.TAU) * U.TAU;
            const last = path[path.length - 1], steps = Math.max(2, Math.ceil(Math.abs(da) * rad / 12));
            for (let s = 1; s <= steps; s++) path.push([U.lerp(last[0], rad, s / steps), ang + da * s / steps]);
            ang += da;
          }
          path.push([rings * w + 30, ang]); len = path.length;
          reset.where = where;
        };
        reset(0);
        born = -2;   // the first maze opens already mostly drawn
        const speed = R.range(26, 40);
        g.trait('Ground', groundName(sh)); g.trait('Palette', palName(sc)); g.trait('Shape', 'Round'); g.trait('First rings', rings); g.trait('Spokes', counts[1]);
        return t => {
          if (g.input.taps().length && t - born > 2.6) born = t - 1e4;   // a click finishes this maze; the next one is carved
          const age = t - born, solve = Math.max(0, age - 2.6) * speed, end = 2.6 + len / speed + 4.5;
          if (age > end) { reset(t); return; }
          const fade = U.clamp((end - age) / 1.2), where = reset.where;
          sh.paint();
          ctx.save(); ctx.translate(500, 500);
          ctx.strokeStyle = U.css(sh.ink, 0.9 * fade); ctx.lineWidth = g.lw(2.4);
          ctx.beginPath();
          const shown = Math.min(rings, age / 2.4 * rings);
          for (let r = 1; r < shown; r++) for (let i = 0; i < counts[r]; i++) {
            const a0 = i / counts[r] * U.TAU, a1 = (i + 1) / counts[r] * U.TAU, rin = (r - 0.15) * w, rout = (r + 0.85) * w, c = id(r, i);
            const inner = r === 1 ? 0 : id(r - 1, Math.floor(i * counts[r - 1] / counts[r]));
            if (!open.has(link(c, inner))) { ctx.moveTo(rin * Math.cos(a0), rin * Math.sin(a0)); ctx.arc(0, 0, rin, a0, a1); }
            if (!open.has(link(c, id(r, i + 1)))) { ctx.moveTo(rin * Math.cos(a1), rin * Math.sin(a1)); ctx.lineTo(rout * Math.cos(a1), rout * Math.sin(a1)); }
            if (r === rings - 1 && c !== exit) { ctx.moveTo(rout * Math.cos(a0), rout * Math.sin(a0)); ctx.arc(0, 0, rout, a0, a1); }
          }
          ctx.stroke();
          if (solve > 0) {
            const upto = Math.min(len - 1, solve);
            ctx.lineWidth = g.lw(w * 0.3);
            for (let k = 1; k <= Math.floor(upto); k++) {
              ctx.strokeStyle = U.css(U.ramp(sc.cols, k / 60, true), fade);
              ctx.beginPath();
              ctx.moveTo(path[k - 1][0] * Math.cos(path[k - 1][1]), path[k - 1][0] * Math.sin(path[k - 1][1]));
              ctx.lineTo(path[k][0] * Math.cos(path[k][1]), path[k][0] * Math.sin(path[k][1]));
              ctx.stroke();
            }
          }
          ctx.restore();
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([50, 80, 80, 100]));
      const fr = (function (g) {
        const { n, d } = g, sc = U.scheme(R);
        let born, m, k, walls, inMask, order, path, state, hold, carved, goal, from, start, mask, algo, wallC, floorC, groundC;
        const reset = t => {
          born = t; state = 'carve'; hold = 0; carved = 0;
          k = R.pick([2, 2, 3, n >= 80 ? 4 : 3]); m = Math.floor((n - 1) / k);
          mask = R.pick(['square', 'circle', 'circle', 'diamond', 'ring', 'cross']); algo = R.pick(['walk', 'walk', 'grow']);
          const ink = R.bool(0.5);
          wallC = ink ? U.pk(U.ramp(sc.cols, R(), true)) : 0xffeeeeee;
          floorC = R.bool(0.6) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.85)); groundC = R.bool(0.5) ? floorC : U.pk(U.mix(sc.cols[1 % sc.cols.length], [0, 0, 0], 0.7));
          const cm = (m - 1) / 2;
          inMask = new Uint8Array(m * m);
          for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
            const u = (x - cm) / (cm + 0.5), v = (y - cm) / (cm + 0.5), r = Math.hypot(u, v);
            inMask[y * m + x] = mask === 'square' ? 1 : mask === 'circle' ? r <= 1 : mask === 'diamond' ? Math.abs(u) + Math.abs(v) <= 1 : mask === 'ring' ? r <= 1 && r > 0.38 : (Math.abs(u) < 0.36 || Math.abs(v) < 0.36) ? 1 : 0;
          }
          walls = new Uint8Array(m * m).fill(15);   // bits: 1 east, 2 south, 4 west, 8 north
          const cells = []; for (let i = 0; i < m * m; i++) if (inMask[i]) cells.push(i);
          const seen = new Uint8Array(m * m), nbr = i => { const x = i % m, y = (i / m) | 0, out = []; if (x < m - 1) out.push([i + 1, 1, 4]); if (y < m - 1) out.push([i + m, 2, 8]); if (x > 0) out.push([i - 1, 4, 1]); if (y > 0) out.push([i - m, 8, 2]); return out.filter(q => inMask[q[0]]); };
          order = [];
          const first = R.pick(cells); seen[first] = 1;
          if (algo === 'walk') {
            const stack = [first];
            while (stack.length) { const c = stack[stack.length - 1], opts = nbr(c).filter(q => !seen[q[0]]); if (!opts.length) { stack.pop(); continue; } const [q, a, b] = R.pick(opts); walls[c] &= ~a; walls[q] &= ~b; seen[q] = 1; order.push(c, q); stack.push(q); }
          } else {
            const front = nbr(first).map(q => [first, ...q]);
            while (front.length) { const j = R.int(0, front.length - 1), [c, q, a, b] = front[j]; front[j] = front[front.length - 1]; front.pop(); if (seen[q]) continue; walls[c] &= ~a; walls[q] &= ~b; seen[q] = 1; order.push(c, q); for (const e of nbr(q)) if (!seen[e[0]]) front.push([q, ...e]); }
          }
          // entrance and exit: the two cells of the mask farthest apart along one axis
          start = cells[0]; goal = cells[cells.length - 1];
          solve(goal);
        };
        const solve = to => {
          from = new Int32Array(m * m).fill(-1); from[start] = start;
          const q = [start];
          for (let h = 0; h < q.length; h++) { const c = q[h]; const x = c % m, y = (c / m) | 0; for (const [nb, bit] of [[c + 1, 1], [c + m, 2], [c - 1, 4], [c - m, 8]]) { if (walls[c] & bit) continue; if (nb < 0 || nb >= m * m || from[nb] >= 0) continue; if ((bit === 1 && x === m - 1) || (bit === 4 && x === 0)) continue; from[nb] = c; q.push(nb); } }
          path = []; if (from[to] < 0) return;
          for (let c = to; c !== start; c = from[c]) path.push(c);
          path.push(start); path.reverse(); goal = to;
        };
        reset(0);
        born = -0.6; carved = order.length * 0.6;   // the first maze opens already mostly carved
        let shown = 0;
        g.trait('Ground', floorC === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Shape', { square: 'Square', circle: 'Circle', diamond: 'Diamond', ring: 'Ring', cross: 'Cross' }[mask]); g.trait('Carving', algo === 'walk' ? 'Winding' : 'Branching'); g.trait('Walls', wallC === 0xffeeeeee ? 'White' : 'Coloured'); g.trait('Grid', n);
        return (t, dt) => {
          for (const p of g.input.taps()) {
            const x = Math.floor(p.x * n / k), y = Math.floor(p.y * n / k);
            if (x >= 0 && y >= 0 && x < m && y < m && inMask[y * m + x] && state !== 'carve') { solve(y * m + x); state = 'solve'; shown = 0; hold = 0; }
          }
          const age = t - born;
          if (state === 'carve') { carved = Math.min(order.length, carved + Math.max(4, order.length / 60)); if (carved >= order.length) { state = 'solve'; shown = 0; } }
          else if (state === 'solve') { shown += Math.max(1, path.length / 70); if (shown >= path.length) { state = 'hold'; hold = 0; } }
          else if ((hold += dt) > 5) reset(t);
          // draw: every cell is k x k pixels; walls are the left and top pixel row of each cell
          d.fill(groundC);
          const open = new Uint8Array(m * m);
          for (let j = 0; j < carved; j++) open[order[j]] = 1;
          const lit = new Map();
          for (let j = 0; j < Math.min(shown, path.length); j++) lit.set(path[j], j);
          for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
            const c = y * m + x;
            if (!inMask[c]) continue;
            const x0 = x * k, y0 = y * k, w = walls[c], shownC = state === 'carve' && !open[c];
            if (shownC) continue;   // cells not carved yet stay bare ground: the maze appears as the walk carves it
            for (let yy = 0; yy <= k; yy++) for (let xx = 0; xx <= k; xx++) {
              const px = x0 + xx, py = y0 + yy;
              if (px >= n || py >= n) continue;
              const edge = (xx === 0 && (w & 4 || shownC)) || (yy === 0 && (w & 8 || shownC)) || (xx === k && w & 1) || (yy === k && w & 2) || ((xx === 0 || xx === k) && (yy === 0 || yy === k));
              if (edge) d[py * n + px] = wallC;
              else if (xx > 0 && yy > 0) d[py * n + px] = lit.has(c) ? U.pk(U.ramp(sc.cols, lit.get(c) / Math.max(30, path.length), true)) : shownC ? groundC : floorC;
            }
          }
          if (state !== 'carve' && path.length) { const e = path[Math.min(Math.floor(shown), path.length - 1)]; d[Math.min(n - 1, ((e / m) | 0) * k + (k >> 1) + 1) * n + Math.min(n - 1, (e % m) * k + (k >> 1) + 1)] = WHITE; }
          U.fadePx(d, Math.min(age / 0.6, state === 'hold' ? (5 - hold) / 1.2 : 1));
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Pythagoras Tree', seed: 2, fam: 'Growth', type: 'vec',
    recipe: 'Every square carries two smaller squares on its roof, forever; the roof angle sways and the wave travels up the branches.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.4), DEPTH = 9, base = R.range(0.62, 0.95), amp = R.range(0.12, 0.3), w = R.range(0.35, 0.7), lag = R.range(0.25, 0.6), size = R.range(125, 150), filled = !sh.paper && R.bool(0.6);
      const paths = [];
      const grow = (x, y, s, a, depth, t) => {
        const ux = Math.cos(a) * s, uy = Math.sin(a) * s, vx = uy, vy = -ux;      // u along the base, v up
        const p = paths[depth];
        p.moveTo(x, y); p.lineTo(x + ux, y + uy); p.lineTo(x + ux + vx, y + uy + vy); p.lineTo(x + vx, y + vy); p.closePath();
        if (depth === DEPTH) return;
        const th = base + amp * Math.sin(t * w - depth * lag), l = Math.cos(th), r = Math.sin(th);
        grow(x + vx, y + vy, s * l, a - th, depth + 1, t);
        grow(x + vx + Math.cos(a - th) * s * l, y + vy + Math.sin(a - th) * s * l, s * r, a - th + Math.PI / 2, depth + 1, t);
      };
      return Object.assign(t => {
        sh.paint();
        for (let k = 0; k <= DEPTH; k++) paths[k] = new Path2D();
        grow(500 - size / 2, 955, size, 0, 0, t);
        ctx.lineWidth = g.lw(1.4);
        for (let k = 0; k <= DEPTH; k++) {
          const col = sh.paper ? sh.ink : U.ramp(sh.cols, k / DEPTH * 0.9, true);
          if (filled) { ctx.fillStyle = U.css(col, 0.85); ctx.fill(paths[k]); }
          else { ctx.strokeStyle = U.css(col, 0.95); ctx.stroke(paths[k]); }
        }
      }, { period: U.TAU / w });
    },
  });

  P.add({
    interactive: 'Click a shape to pop it; new ones swell into the gap.',
    name: 'Circle Packing', seed: 1, fam: 'Growth', type: 'vec',
    recipe: 'Circles appear wherever there is room and swell until they touch a neighbour; rings then ripple inside each one. Some rolls pack pixel circles, squares or diamonds instead, ringed, solid or with a dot.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.45), drafted = sh.paper || R.bool(0.3), gap = R.range(2, 5), flow = R.range(0.25, 0.6) * R.sign();
        let cs, misses, state, hold, maxR;
        const reset = () => { cs = []; misses = 0; state = 'grow'; hold = 0; maxR = R.range(70, 150); };
        const grow = () => {
          for (let k = 0; k < 3; k++) {
            const x = R.range(30, 970), y = R.range(30, 970);
            if (cs.some(c => Math.hypot(c.x - x, c.y - y) < c.r + gap + 3)) { misses++; continue; }
            cs.push({ x, y, r: 2, live: true, c: R(), ph: R() });
          }
          for (const c of cs) if (c.live) {
            c.r += 1.4;
            if (c.r > maxR || c.x - c.r < 14 || c.y - c.r < 14 || c.x + c.r > 986 || c.y + c.r > 986) c.live = false;
            else for (const o of cs) if (o !== c && Math.hypot(o.x - c.x, o.y - c.y) < o.r + c.r + gap) { c.live = false; break; }
          }
          if (misses > 1800 || cs.length > 380) { state = 'hold'; hold = 0; }
        };
        reset();
        for (let k = 0; k < 70; k++) grow();
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Shape', 'Circle'); g.trait('Look', drafted ? 'Drafted' : 'Ringed'); g.trait('First sizes', maxR > 110 ? 'Large' : 'Small');
        return (t, dt) => {
          for (const p of g.input.taps()) { const x = p.x * 1000, y = p.y * 1000, j = cs.findIndex(c => Math.hypot(c.x - x, c.y - y) <= c.r); if (j >= 0) { cs.splice(j, 1); state = 'grow'; misses = 0; for (const c of cs) c.live = true; } }
          if (state === 'grow') grow();
          else if ((hold += dt) > 9) reset();
          const fade = state === 'hold' ? U.clamp((9 - hold) / 1.2) : 1;
          sh.paint();
          ctx.lineWidth = g.lw(1.5);
          for (const c of cs) {
            const col = sh.paper ? sh.ink : U.ramp(sh.cols, c.c, true);
            ctx.strokeStyle = U.css(col, 0.95 * fade);
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, U.TAU);
            if (drafted) {
              if (c.r > 9) { ctx.moveTo(c.x - 4, c.y); ctx.lineTo(c.x + 4, c.y); ctx.moveTo(c.x, c.y - 4); ctx.lineTo(c.x, c.y + 4); const a = c.ph * U.TAU + t * flow; ctx.moveTo(c.x, c.y); ctx.lineTo(c.x + c.r * Math.cos(a), c.y + c.r * Math.sin(a)); }
            } else {
              const step = Math.max(7, c.r / 5), shift = ((t * flow * 8 + c.ph * step) % step + step) % step;
              for (let r = shift; r < c.r - 2; r += step) if (r > 1.5) { ctx.moveTo(c.x + r, c.y); ctx.arc(c.x, c.y, r, 0, U.TAU); }
            }
            ctx.stroke();
          }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100, 100]));
      const fr = (function (g) {
        const { n, d } = g, sc = U.scheme(R), N = n * n;
        const shape = R.pick(['circle', 'circle', 'square', 'diamond']), look = R.pick(['rings', 'rings', 'solid', 'target']), gap = R.pick([1, 1, 2]), flow = R.range(0.25, 0.6) * R.sign();
        const ground = R.bool(0.5) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.85)), outline = R.bool(0.5);
        const dist = (dx, dy) => shape === 'circle' ? Math.sqrt(dx * dx + dy * dy) : shape === 'square' ? Math.max(Math.abs(dx), Math.abs(dy)) : (Math.abs(dx) + Math.abs(dy)) * 0.75;
        let cs, misses, state, hold, maxR;
        const reset = () => { cs = []; misses = 0; state = 'grow'; hold = 0; maxR = n * R.range(0.08, 0.2); };
        const grow = () => {
          for (let k = 0; k < 4; k++) {
            const x = R.range(2, n - 2), y = R.range(2, n - 2);
            if (cs.some(c => dist(c.x - x, c.y - y) < c.r + gap + 1)) { misses++; continue; }
            cs.push({ x, y, r: 0.5, live: true, c: R.int(0, 255), ph: R() });
          }
          for (const c of cs) if (c.live) {
            c.r += 0.25;
            if (c.r > maxR || c.x - c.r < 1 || c.y - c.r < 1 || c.x + c.r > n - 1 || c.y + c.r > n - 1) c.live = false;
            else for (const o of cs) if (o !== c && dist(o.x - c.x, o.y - c.y) < o.r + c.r + gap) { c.live = false; break; }
          }
          if (misses > 2500 || cs.length > 500) { state = 'hold'; hold = 0; }
        };
        reset();
        for (let k = 0; k < 160; k++) grow();
        g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Shape', { circle: 'Circle', square: 'Square', diamond: 'Diamond' }[shape]); g.trait('Look', { rings: 'Ringed', solid: 'Solid', target: 'Target' }[look] + (outline ? ', outlined' : '')); g.trait('Gap', gap); g.trait('Grid', n);
        return (t, dt) => {
          for (const p of g.input.taps()) {
            const x = p.x * n, y = p.y * n, j = cs.findIndex(c => dist(c.x - x, c.y - y) <= c.r);
            if (j >= 0) { cs.splice(j, 1); state = 'grow'; misses = 0; for (const c of cs) c.live = true; }
          }
          if (state === 'grow') grow();
          else if ((hold += dt) > 9) reset();
          const fade = state === 'hold' ? U.clamp((9 - hold) / 1.2) : 1;
          d.fill(ground);
          for (const c of cs) {
            const r = c.r, x0 = Math.max(0, Math.floor(c.x - r - 1)), x1 = Math.min(n - 1, Math.ceil(c.x + r + 1)), y0 = Math.max(0, Math.floor(c.y - r - 1)), y1 = Math.min(n - 1, Math.ceil(c.y + r + 1));
            const step = Math.max(2, Math.round(r / 4)), shift = t * flow * 3 + c.ph * step;
            for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
              const q = dist(x + 0.5 - c.x, y + 0.5 - c.y);
              if (q > r) continue;
              let col;
              if (outline && q > r - 1) col = sc.lut[(c.c + 80) & 255];
              else if (look === 'solid') col = sc.lut[(c.c + q * 3) & 255];
              else if (look === 'target') col = q < Math.max(1, r * 0.25) ? WHITE : sc.lut[c.c];
              else col = ((((q - shift) % step) + step) % step) < step / 2 ? sc.lut[c.c] : U.X.shade(sc.lut[c.c], 0.45);
              d[y * n + x] = col;
            }
          }
          if (fade < 1) U.fadePx(d, fade);
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    interactive: 'Click to start a new bus of traces there.',
    name: 'Traces', fam: 'Growth', type: 'px', sizes: [80, 100], fps: 24,
    recipe: 'Routes laid in pixels on a circuit board, in buses, turning only by 45° and never crossing, each ending in a pad when it runs out of board: green with gold, blue with white, copper, or black with neon.',
    make(R, U, g) {
      // pixels only (the founder asked for it): every variation is the cell-grid version
      // the grid size comes from the def (sizes), chosen by the gallery from the same dice as before
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.3);
        const pitch = R.pick([2, 2, 3]), G = Math.floor((n - 2) / pitch), DX = [1, 1, 0, -1, -1, -1, 0, 1], DY = [0, 1, 1, 1, 0, -1, -1, -1];
        const board = R.pick(['green', 'black', 'blue', 'copper', 'palette']);
        const BOARDS = { green: [[18, 70, 34], [[214, 180, 70], [236, 206, 110]]], black: [[8, 8, 10], null], blue: [[20, 40, 110], [[230, 236, 255], [170, 190, 240]]], copper: [[40, 24, 16], [[220, 130, 70], [250, 180, 110]]], palette: [U.mix(sc.cols[0], [0, 0, 0], 0.85), null] };
        const [bg, inkSet] = BOARDS[board], inks = (inkSet || sc.cols).map(U.pk), groundPk = U.pk(bg), hatch = R.bool(0.4) ? U.pk(U.mix(bg, [255, 255, 255], 0.06)) : groundPk;
        const img = new Uint32Array(n * n), occ = new Uint8Array(G * G), diag = new Uint8Array(G * G);
        let walkers, free, misses, state, hold, fadeK;
        const pos = v => 1 + v * pitch;
        const pad = (x, y, col) => { const px = pos(x), py = pos(y); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) { const i = (py + b) * n + px + a; if (i >= 0 && i < n * n) img[i] = col; } img[py * n + px] = groundPk; };
        const reset = () => {
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) img[i] = (x + y) % 4 === 0 ? hatch : groundPk;
          occ.fill(0); diag.fill(0); walkers = []; free = G * G; misses = 0; state = 'grow'; hold = 0; fadeK = 1;
        };
        const launch = (x0 = R.int(1, G - 2), y0 = R.int(1, G - 2)) => {
          const dir = R.pick([0, 2, 4, 6, 0, 2, 4, 6, 1, 3, 5, 7]), k = R.int(1, 6), col = R.pick(inks);
          const px = DX[(dir + 2) & 7], py = DY[(dir + 2) & 7];
          let made = 0;
          for (let i = 0; i < k; i++) {
            const x = x0 + px * i, y = y0 + py * i;
            if (x < 0 || y < 0 || x >= G || y >= G || occ[y * G + x]) break;
            occ[y * G + x] = 1; free--; pad(x, y, col); walkers.push({ x, y, dir, col, len: 0, life: R.int(6, 50) }); made++;
          }
          if (!made) misses++; else misses = 0;
        };
        const advance = w => {
          const opts = [w.dir, w.dir, w.dir, w.dir, w.dir, w.dir, (w.dir + 1) & 7, (w.dir + 7) & 7];
          for (let tries = 0; tries < 4; tries++) {
            const dir = tries === 0 ? R.pick(opts) : [w.dir, (w.dir + 1) & 7, (w.dir + 7) & 7][tries - 1], x = w.x + DX[dir], y = w.y + DY[dir];
            if (x < 0 || y < 0 || x >= G || y >= G || occ[y * G + x]) continue;
            const sq = Math.min(w.y, y) * G + Math.min(w.x, x);
            if (dir & 1) { if (diag[sq]) continue; diag[sq] = 1; }
            X.line({ n, d: img }, pos(w.x), pos(w.y), pos(x), pos(y), w.col);
            occ[y * G + x] = 1; free--; w.x = x; w.y = y; w.dir = dir; w.len++;
            return w.len < w.life || R.bool(0.9);
          }
          return false;
        };
        reset();
        for (let k = 0; k < 40; k++) { if (walkers.length < 9) launch(); for (let i = walkers.length - 1; i >= 0; i--) if (!advance(walkers[i])) { pad(walkers[i].x, walkers[i].y, walkers[i].col); walkers.splice(i, 1); } }
        g.trait('Board', { green: 'Green', black: 'Black', blue: 'Blue', copper: 'Copper', palette: 'Tinted' }[board]); g.trait('Palette', inkSet ? 'Board metal' : palName(sc)); g.trait('Pitch', pitch === 2 ? 'Fine' : 'Coarse'); g.trait('Hatching', hatch === groundPk ? 'None' : 'Fine lines'); g.trait('Grid', n);
        return (t, dt) => {
          for (const p of g.input.taps()) if (state === 'grow' && walkers.length < 40) launch(Math.min(G - 1, Math.floor((p.x * n - 1) / pitch)), Math.min(G - 1, Math.floor((p.y * n - 1) / pitch)));
          for (let rep = 1; rep > 0 && state === 'grow'; rep--) {
            if (walkers.length < 9) launch();
            for (let i = walkers.length - 1; i >= 0; i--) if (!advance(walkers[i])) { pad(walkers[i].x, walkers[i].y, walkers[i].col); walkers.splice(i, 1); }
            if (free < G * G * 0.2 || misses > 50) { state = 'hold'; hold = 0; }
          }
          if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
          else if (state === 'fade') { fadeK = U.clamp(1 - (hold += dt) / 1.3); if (hold > 1.3) reset(); }
          d.set(img);
          for (const w of walkers) { const i = pos(w.y) * n + pos(w.x); if (i < n * n) d[i] = WHITE; }
          if (fadeK < 1) U.fadePx(d, fadeK);
        };
      })(g);
      return fr;
    },
  });
  P.add({
    interactive: 'Hold the pointer over the hills to make it rain there.',
    name: 'Watershed', seed: 2, fam: 'Growth', type: 'px', n: 120,
    recipe: 'Rain falls on slowly shifting hills and always runs downhill; the cells most walked over light up as rivers, over contour lines, flat terraces or shaded relief.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, noise = U.noise(R);
        const hgt = new Float32Array(N), flow = new Float32Array(N), count = 700, px = new Int32Array(count), py = new Int32Array(count), age = new Int32Array(count);
        const scale = R.range(50, 80), rate = R.range(0.012, 0.022), contour = R.range(5, 8), low = U.dim(sc.lut, 0.3);
        const height = (x, y, z) => noise.fbm(x / scale, y / scale, z, 2);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) hgt[i] = height(x, y, 0);
        const drop = k => {
          px[k] = R.int(1, n - 2); py[k] = R.int(1, n - 2); age[k] = 0;
          // rain under the pointer: the same dice are thrown, then the drop is moved
          if (g.input.inside && k % 3 === 0) { px[k] = Math.min(n - 2, Math.max(1, Math.floor(g.input.x * n) + (k % 13) - 6)); py[k] = Math.min(n - 2, Math.max(1, Math.floor(g.input.y * n) + (k % 11) - 5)); }
        };
        for (let k = 0; k < count; k++) drop(k);
        let row = 0;
        const tick = t => {
          for (let k = 0; k < 15; k++, row = (row + 1) % n) for (let x = 0; x < n; x++) hgt[row * n + x] = height(x, row, t * rate);
          for (let k = 0; k < count; k++) {
            const x = px[k], y = py[k], i = y * n + x;
            let best = hgt[i], bx = 0, by = 0;
            for (let m = 0; m < 8; m++) { const dx = [1, -1, 0, 0, 1, 1, -1, -1][m], dy = [0, 0, 1, -1, 1, -1, 1, -1][m], h = hgt[i + dy * n + dx]; if (h < best) { best = h; bx = dx; by = dy; } }
            flow[i] += 1;
            px[k] += bx; py[k] += by;
            if ((!bx && !by) || ++age[k] > 160 || px[k] < 1 || py[k] < 1 || px[k] > n - 2 || py[k] > n - 2) drop(k);
          }
          for (let i = 0; i < N; i++) flow[i] *= 0.985;
        };
        for (let k = 0; k < 200; k++) tick(0);
        g.trait('Palette', palName(sc)); g.trait('Ground', 'Contours'); g.trait('Hills', scale > 65 ? 'Broad' : 'Tight'); g.trait('Contour spacing', contour > 6.5 ? 'Close' : 'Wide');
        return t => {
          tick(t);
          for (let i = 0; i < N; i++) {
            const f = flow[i], lvl = (hgt[i] + 2) * contour;
            d[i] = f > 3 ? heat[Math.min(255, 60 + Math.log(f) * 58) | 0] : lvl % 1 < 0.1 ? BLACK : low[(Math.floor(lvl) * 37) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, noise = U.noise(R);
      const hgt = new Float32Array(N), flow = new Float32Array(N), count = 700, px = new Int32Array(count), py = new Int32Array(count), age = new Int32Array(count);
      const scale = R.range(30, 90), rate = R.range(0.012, 0.022), contour = R.range(4, 9), low = U.dim(sc.lut, R.pick([0.2, 0.3, 0.45])), look = R.pick(['contour', 'contour', 'terrace', 'relief']);
      const height = (x, y, z) => noise.fbm(x / scale, y / scale, z, 2);
      for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) hgt[i] = height(x, y, 0);
      const drop = k => {
        if (g.input.inside && k % 3 === 0) { px[k] = Math.min(n - 2, Math.max(1, Math.floor(g.input.x * n) + R.int(-6, 6))); py[k] = Math.min(n - 2, Math.max(1, Math.floor(g.input.y * n) + R.int(-6, 6))); }
        else { px[k] = R.int(1, n - 2); py[k] = R.int(1, n - 2); }
        age[k] = 0;
      };
      for (let k = 0; k < count; k++) drop(k);
      let row = 0;
      const tick = t => {
        for (let k = 0; k < 15; k++, row = (row + 1) % n) for (let x = 0; x < n; x++) hgt[row * n + x] = height(x, row, t * rate);
        for (let k = 0; k < count; k++) {
          const x = px[k], y = py[k], i = y * n + x;
          let best = hgt[i], bx = 0, by = 0;
          for (let m = 0; m < 8; m++) { const dx = [1, -1, 0, 0, 1, 1, -1, -1][m], dy = [0, 0, 1, -1, 1, -1, 1, -1][m], h = hgt[i + dy * n + dx]; if (h < best) { best = h; bx = dx; by = dy; } }
          flow[i] += 1;
          px[k] += bx; py[k] += by;
          if ((!bx && !by) || ++age[k] > 160 || px[k] < 1 || py[k] < 1 || px[k] > n - 2 || py[k] > n - 2) drop(k);
        }
        for (let i = 0; i < N; i++) flow[i] *= 0.985;
      };
      for (let k = 0; k < 200; k++) tick(0);
      g.trait('Palette', palName(sc)); g.trait('Ground', { contour: 'Contours', terrace: 'Terraces', relief: 'Relief' }[look]); g.trait('Hills', scale > 65 ? 'Broad' : scale < 45 ? 'Small' : 'Tight'); g.trait('Contour spacing', contour > 6.5 ? 'Close' : 'Wide');
      return t => {
        tick(t);
        for (let i = 0; i < N; i++) {
          const f = flow[i], lvl = (hgt[i] + 2) * contour;
          if (f > 3) { d[i] = heat[Math.min(255, 60 + Math.log(f) * 58) | 0]; continue; }
          if (look === 'relief') { const s = (hgt[i] - hgt[i - n - 1 < 0 ? i : i - n - 1]) * 40; d[i] = low[(Math.floor(lvl) * 37 + s * 8) & 255]; }
          else d[i] = look === 'contour' && lvl % 1 < 0.1 ? BLACK : low[(Math.floor(lvl) * 37) & 255];
        }
      };
    },
  });
  P.add({
    name: 'Phyllotaxis', seed: 1, fam: 'Growth', type: 'vec',
    recipe: 'Each seed sits a fixed turn on from the last; a hair’s change in that angle and the spirals rearrange themselves.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.5), count = R.int(600, 900), fam = R.pick([5, 8, 13, 21, 34]), swing = R.range(0.004, 0.012), w = R.range(0.06, 0.12), ph = R.range(0, 6), golden = Math.PI * (3 - Math.sqrt(5)), centre = R.pick([golden, golden, golden, U.TAU * 0.2764, U.TAU / 3.1415]), spin = R.range(0.01, 0.03) * R.sign();
      const cols = Array.from({ length: fam }, (_, i) => U.css(U.ramp(sc.cols, i / fam, true)));
      const k = 440 / Math.sqrt(count);
      return t => {
        const ang = centre + swing * Math.sin(t * w + ph);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        for (let f = 0; f < fam; f++) {
          ctx.fillStyle = cols[f];
          ctx.beginPath();
          for (let i = f + 1; i < count; i += fam) {
            const r = k * Math.sqrt(i), a = i * ang + t * spin, x = 500 + r * Math.cos(a), y = 500 + r * Math.sin(a), s = Math.max(g.px * 0.9, 2.5 + 7 * i / count);
            ctx.moveTo(x + s, y); ctx.arc(x, y, s, 0, U.TAU);
          }
          ctx.fill();
        }
      };
    },
  });
})();
