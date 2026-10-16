// Strands and motion: things that leave a line behind them.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);

  // A cell grid for the newer variations of plot prototypes: drawn into pixels, then laid crisp over the stage.
  function pixelStage(g, n) {
    const off = document.createElement('canvas'); off.width = off.height = n;
    const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
    const pg = { n, d, S: g.S, input: g.input, sound: g.sound, home: g.home, alt: g.alt, trait: g.trait };
    pg.flush = () => { octx.putImageData(img, 0, 0); g.ctx.imageSmoothingEnabled = false; g.ctx.drawImage(off, 0, 0, 1000, 1000); };
    return pg;
  }

  P.add({
    name: 'Field Lines', fam: 'Strands', type: 'px', n: 80,
    recipe: 'Fat pixel strands, as in Filaments, but steered by the pull between slowly circling positive and negative charges.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), N = n * n, ink = new Uint32Array(N), life = new Float32Array(N), count = R.int(110, 190);
      const charges = Array.from({ length: R.int(3, 6) }, (_, i) => ({ q: i % 2 ? -1 : 1, r: R.range(0.12, 0.4), w: R.range(0.03, 0.09) * R.sign(), ph: R.range(0, 6) }));
      const cols = sc.cols.map(U.pk), fat = R.pick([0.8, 1.1, 1.1, 1.5]), keep = R.range(0.972, 0.988), turn = R.pick([0, 0, 0.5, 1.57]);
      const ps = Array.from({ length: count }, () => ({ x: R() * n, y: R() * n, c: R.pick(cols), age: R.int(0, 80), dir: R.sign() }));
      const cx = new Float32Array(charges.length), cy = new Float32Array(charges.length);
      const tick = t => {
        for (let j = 0; j < charges.length; j++) { const c = charges[j]; cx[j] = n * (0.5 + c.r * Math.cos(t * c.w + c.ph)); cy[j] = n * (0.5 + c.r * Math.sin(t * c.w * 1.2 + c.ph)); }
        for (let i = 0; i < N; i++) life[i] *= keep;
        for (const p of ps) {
          let ex = 0, ey = 0, hit = false;
          for (let j = 0; j < charges.length; j++) { const dx = p.x - cx[j], dy = p.y - cy[j], rr = dx * dx + dy * dy + 0.5; if (rr < 2.5) hit = true; ex += charges[j].q * dx / rr; ey += charges[j].q * dy / rr; }
          const m = Math.hypot(ex, ey) || 1, c = Math.cos(turn), s = Math.sin(turn);
          p.x += (ex * c - ey * s) / m * 0.55 * p.dir; p.y += (ex * s + ey * c) / m * 0.55 * p.dir;
          if (hit || ++p.age > 220 || p.x < -2 || p.y < -2 || p.x > n + 2 || p.y > n + 2) { p.x = R() * n; p.y = R() * n; p.age = 0; continue; }
          const r = Math.ceil(fat);
          for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) {
            const qx = Math.round(p.x) + xx, qy = Math.round(p.y) + yy;
            if (xx * xx + yy * yy <= fat * fat + 0.3 && qx >= 0 && qy >= 0 && qx < n && qy < n) { ink[qy * n + qx] = p.c; life[qy * n + qx] = 1; }
          }
        }
      };
      for (let k = 0; k < 160; k++) tick(k / 12 - 14);
      return t => {
        tick(t);
        for (let i = 0; i < N; i++) {
          const k = life[i] > 0.5 ? 1 : life[i] * 2, v = ink[i];
          d[i] = k < 0.06 ? BLACK : (255 << 24 | ((v >> 16 & 255) * k) << 16 | ((v >> 8 & 255) * k) << 8 | (v & 255) * k) >>> 0;
        }
      };
    },
  });

  P.add({
    name: 'Streamlines', seed: 3, fam: 'Strands', type: 'vec',
    recipe: 'A flow field combed into lines that keep an even distance from one another, each drawn until it would crowd a neighbour.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.6), noise = U.noise(R);
      let sep, cell, grid, queue, line, state, hold, zoom, swirl, z = 0, lines;
      const key = (x, y) => Math.floor(x / cell) * 256 + Math.floor(y / cell);
      const angle = (x, y) => noise.n3(x * zoom, y * zoom, z) * Math.PI * 1.6 + swirl * Math.atan2(y - 500, x - 500);
      const clear = (x, y, dist, own) => {
        if (x < 30 || y < 30 || x > 970 || y > 970) return false;
        const cx = Math.floor(x / cell), cy = Math.floor(y / cell);
        for (let u = -1; u <= 1; u++) for (let v = -1; v <= 1; v++) for (const p of grid.get((cx + u) * 256 + cy + v) || []) if (p[2] !== own && (p[0] - x) ** 2 + (p[1] - y) ** 2 < dist * dist) return false;
        return true;
      };
      const put = (x, y, id) => { const k = key(x, y); (grid.get(k) || grid.set(k, []).get(k)).push([x, y, id]); };
      const reset = () => {
        sh.paint(); z += 3.7; sep = R.range(13, 24); cell = sep; grid = new Map(); queue = [[R.range(300, 700), R.range(300, 700)]]; line = null; state = 'grow'; hold = 0; lines = 0;
        zoom = R.range(0.0012, 0.0028); swirl = R.pick([0, 0, 1, -1, 2]);
      };
      const begin = () => {
        while (queue.length) {
          const [x, y] = queue.splice(R.int(0, queue.length - 1), 1)[0];
          if (clear(x, y, sep, -1)) { line = { id: ++lines, x, y, sx: x, sy: y, dir: 1, len: 0, col: sh.paper ? sh.ink : U.ramp(sh.cols, (angle(x, y) / U.TAU % 1 + 1) % 1, true) }; put(x, y, line.id); return true; }
        }
        return false;
      };
      const advance = () => {
        const a = angle(line.x, line.y), nx = line.x + Math.cos(a) * 5 * line.dir, ny = line.y + Math.sin(a) * 5 * line.dir;
        if (line.len > 260 || !clear(nx, ny, sep * 0.55, line.id)) {
          if (line.dir === 1) { line.dir = -1; line.x = line.sx; line.y = line.sy; line.len = 0; return true; }
          return false;
        }
        ctx.beginPath(); ctx.moveTo(line.x, line.y); ctx.lineTo(nx, ny); ctx.stroke();
        put(nx, ny, line.id); line.x = nx; line.y = ny; line.len++;
        if (line.len % 3 === 0) queue.push([nx - Math.sin(a) * sep, ny + Math.cos(a) * sep], [nx + Math.sin(a) * sep, ny - Math.cos(a) * sep]);
        return true;
      };
      reset();
      return (t, dt) => {
        if (state === 'grow') {
          ctx.lineWidth = g.lw(sep * 0.16);
          for (let k = 0; k < 150; k++) {
            if (!line && !begin()) { state = 'hold'; break; }
            ctx.strokeStyle = U.css(line.col);
            if (!advance()) line = null;
          }
        } else if (state === 'hold') { if ((hold += dt) > 5) { state = 'fade'; hold = 0; } }
        else { sh.paint(0.16); if ((hold += dt) > 1.3) reset(); }
      };
    },
  });

  P.add({
    name: 'Tresses', seed: 3, fam: 'Strands', type: 'vec',
    recipe: 'Ribbons of parallel hairlines that pinch, swell and pass over one another as their spines slowly undulate.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.3), SEG = 44;
      const bundles = Array.from({ length: R.int(4, 6) }, (_, b) => ({
        strands: R.int(14, 26), gap: R.range(3.5, 6.5), y: R.range(150, 850), tilt: R.range(-0.5, 0.5), col: sh.paper ? sh.ink : sh.cols[b % sh.cols.length],
        waves: [1, 2, 3].map(k => ({ a: R.range(40, 130) / k, f: k * R.range(0.5, 1.1), w: R.range(0.08, 0.22) * R.sign(), ph: R.range(0, 6) })),
        pinch: R.range(1.5, 4), pw: R.range(0.1, 0.3) * R.sign(), pp: R.range(0, 6), vertical: R.bool(0.4),
      }));
      const px = new Float32Array(SEG + 1), py = new Float32Array(SEG + 1), nx = new Float32Array(SEG + 1), ny = new Float32Array(SEG + 1), wd = new Float32Array(SEG + 1);
      return t => {
        sh.paint();
        ctx.lineWidth = g.lw(1.3);
        for (const b of bundles) {
          for (let s = 0; s <= SEG; s++) {
            const u = s / SEG, x = -60 + 1120 * u;
            let y = b.y + b.tilt * (x - 500);
            for (const w of b.waves) y += w.a * Math.sin(u * w.f * U.TAU + t * w.w + w.ph);
            px[s] = b.vertical ? y : x; py[s] = b.vertical ? x : y;
            wd[s] = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(u * b.pinch * U.TAU + t * b.pw + b.pp));
          }
          for (let s = 0; s <= SEG; s++) {
            const a = Math.max(0, s - 1), c = Math.min(SEG, s + 1), dx = px[c] - px[a], dy = py[c] - py[a], m = Math.hypot(dx, dy) || 1;
            nx[s] = -dy / m; ny[s] = dx / m;
          }
          const half = (b.strands - 1) / 2 * b.gap + 3;
          ctx.fillStyle = U.css(sh.ground);
          ctx.beginPath();
          for (let s = 0; s <= SEG; s++) ctx.lineTo(px[s] + nx[s] * half * wd[s], py[s] + ny[s] * half * wd[s]);
          for (let s = SEG; s >= 0; s--) ctx.lineTo(px[s] - nx[s] * half * wd[s], py[s] - ny[s] * half * wd[s]);
          ctx.fill();
          ctx.strokeStyle = U.css(b.col);
          ctx.beginPath();
          for (let k = 0; k < b.strands; k++) {
            const off = (k - (b.strands - 1) / 2) * b.gap;
            for (let s = 0; s <= SEG; s++) { const x = px[s] + nx[s] * off * wd[s], y = py[s] + ny[s] * off * wd[s]; if (s) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
          }
          ctx.stroke();
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer into the flock: it is a falcon, and they scatter.',
    name: 'Murmuration', seed: 3, fam: 'Strands', type: 'px', sizes: [80, 100, 100], fps: 24,
    recipe: 'A flock in which each bird only matches its nearest neighbours, in chunky pixels: the fading wake of every wing across a night sky, or a dark flock wheeling against a dithered dusk, dawn or winter sky over hills, water or trees.',
    make(R, U, g) {
      // pixels only (the founder asked for it): every variation is the cell-grid version
      // the grid size comes from the def (sizes), chosen by the gallery from the same dice as before
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.5), count = R.pick([260, 340, 420]), N = n * n;
        const x = new Float32Array(count), y = new Float32Array(count), vx = new Float32Array(count), vy = new Float32Array(count);
        for (let i = 0; i < count; i++) { x[i] = R.range(0.25, 0.75) * n; y[i] = R.range(0.2, 0.6) * n; const a = R.range(0, U.TAU); vx[i] = Math.cos(a) * 0.4; vy[i] = Math.sin(a) * 0.4; }
        const s = n / 1000, view = R.range(60, 95) * s, cohere = R.range(0.003, 0.006), align = R.range(0.04, 0.07), keepApart = R.range(0.035, 0.06), near2 = 500 * s * s;
        const night = R.bool(0.5);   // the night wake (the original look) about half the time
        const SKIES = [[[255, 196, 120], [236, 120, 110], [120, 70, 130], [40, 30, 70]], [[200, 230, 255], [150, 190, 235], [90, 120, 190], [40, 50, 110]], [[250, 240, 220], [220, 210, 200], [170, 170, 180], [110, 110, 130]], [[255, 236, 160], [250, 170, 90], [190, 80, 80], [70, 30, 60]], sc.cols.slice(0, 4)];
        const sky = R.pick(SKIES), floor = R.pick(['hills', 'water', 'none', 'trees']), horizon = Math.round(n * R.range(0.78, 0.9));
        const bands = R.int(5, 9), bird = night ? null : X.rgb(18, 14, 24), birdLight = night ? null : X.rgb(60, 46, 70);
        const back = new Uint32Array(N), trail = night ? new Float32Array(N) : null, heading = night ? new Uint8Array(N) : null, cols = Array.from({ length: 64 }, (_, i) => U.pk(U.ramp(sc.cols, i / 64, true)));
        // the sky: flat bands, dithered where they meet, down to the horizon
        for (let yy = 0; yy < n; yy++) for (let xx = 0; xx < n; xx++) {
          const i = yy * n + xx;
          if (night) { back[i] = BLACK; continue; }
          const f = yy / horizon * (bands - 1), b = Math.floor(f), fr = f - b, k = Math.min(bands - 1, b + (fr > X.dith4(xx, yy) ? 1 : 0));
          back[i] = U.pk(U.ramp(sky, k / (bands - 1), false));
        }
        const hill = Array.from({ length: n }, (_, xx) => horizon + Math.round(n * 0.04 * Math.sin(xx * 0.07 + R.range(0, 6)) + n * 0.025 * Math.sin(xx * 0.19)));
        for (let xx = 0; xx < n; xx++) for (let yy = 0; yy < n; yy++) {
          const i = yy * n + xx;
          if (floor === 'none') continue;
          if (floor === 'water' && yy >= horizon) back[i] = yy % 3 === 0 && (xx + yy) % 7 < 3 ? back[(2 * horizon - yy) * n + xx] || back[i] : U.X.shade(back[Math.max(0, (2 * horizon - yy)) * n + xx] || BLACK, 0.55);
          else if (floor === 'hills' && yy >= hill[xx]) back[i] = night ? X.rgb(12, 12, 16) : X.rgb(24, 20, 30);
          else if (floor === 'trees' && yy >= horizon - ((xx * 7 % 11 < 3) ? Math.round(n * 0.06) : 0) - (xx % 13 < 2 ? Math.round(n * 0.03) : 0)) back[i] = X.rgb(20, 18, 26);
        }
        const fly = (k, fx, fy) => {
          for (let i = 0; i < count; i++) {
            let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, m = 0;
            for (let j = 0; j < count; j++) {
              if (j === i) continue;
              const dx = x[j] - x[i], dy = y[j] - y[i], dd = dx * dx + dy * dy;
              if (dd > view * view) continue;
              cx += dx; cy += dy; ax += vx[j]; ay += vy[j]; m++;
              if (dd < near2) { sx -= dx; sy -= dy; }
            }
            if (m) { vx[i] += (cx / m * cohere + (ax / m - vx[i]) * align + sx * keepApart) * k; vy[i] += (cy / m * cohere + (ay / m - vy[i]) * align + sy * keepApart) * k; }
            const ex = x[i] - fx, ey = y[i] - fy, ee = ex * ex + ey * ey, fear = (n * 0.18) ** 2;
            if (ee < fear) { vx[i] += ex / Math.sqrt(ee + 1) * 0.06 * k; vy[i] += ey / Math.sqrt(ee + 1) * 0.06 * k; }
            const rx = x[i] - n / 2, ry = y[i] - n * 0.42, rr = Math.hypot(rx, ry), lim = n * 0.36;
            if (rr > lim) { vx[i] -= rx / rr * (rr - lim) * 0.004 * k; vy[i] -= ry / rr * (rr - lim) * 0.004 * k; }
            const sp = Math.hypot(vx[i], vy[i]) || 1, want = Math.min(5.5 * s, Math.max(3 * s, sp));
            vx[i] *= want / sp; vy[i] *= want / sp;
            x[i] += vx[i] * k; y[i] += vy[i] * k;
          }
        };
        const wake = () => {
          for (let i = 0; i < N; i++) trail[i] *= 0.82;
          for (let i = 0; i < count; i++) { const xx = x[i] | 0, yy = y[i] | 0; if (xx >= 0 && yy >= 0 && xx < n && yy < n) { trail[yy * n + xx] = 1; heading[yy * n + xx] = ((Math.atan2(vy[i], vx[i]) / U.TAU + 1) * 64) & 63; } }
        };
        // the flock has found its shape (and, at night, left its wake) by the first frame
        for (let k = 0; k < 100; k++) { fly(1, -1e9, -1e9); if (night && k >= 86) wake(); }
        g.trait('Palette', night ? palName(sc) : 'Silhouette'); g.trait('View', night ? 'Wake' : 'Flock'); g.trait('Sky', night ? 'Night' : ['Dusk', 'Winter', 'Overcast', 'Sunset', 'Painted'][SKIES.indexOf(sky)]); g.trait('Ground', { hills: 'Hills', water: 'Water', none: 'None', trees: 'Trees' }[floor]); g.trait('Flock', count);
        return (t, dt) => {
          const k = Math.min(2.4, dt * 24), fx = g.input.inside ? g.input.x * n : -1e9, fy = g.input.inside ? g.input.y * n : -1e9;
          fly(k, fx, fy);
          if (night) {
            wake();
            for (let i = 0; i < N; i++) d[i] = trail[i] > 0.15 ? (trail[i] > 0.9 ? cols[heading[i]] : U.X.shade(cols[heading[i]], trail[i])) : back[i];
          } else {
            d.set(back);
            for (let i = 0; i < count; i++) {
              const xx = x[i] | 0, yy = y[i] | 0;
              if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
              d[yy * n + xx] = bird;
              const wing = (t * 9 + i) % 2 < 1, sx = vy[i] > 0 ? 1 : -1;
              if (wing && xx + 1 < n) d[yy * n + xx + 1] = birdLight; else if (yy - 1 >= 0) d[(yy - 1) * n + xx] = birdLight;
              if (n >= 100 && xx - sx >= 0 && xx - sx < n) d[yy * n + xx - sx] = bird;
            }
          }
        };
      })(g);
      return fr;
    },
  });
  P.add({
    interactive: 'Move the pointer to bend the constants of the equation.',
    name: 'Clifford Dust', seed: 2, fam: 'Strands', type: 'px', n: 160,
    recipe: 'One point hopping under four sines and cosines (Clifford’s, de Jong’s or Svensson’s equations), thousands of times a frame; the dust it leaves is the shape of the equation, as glowing heat or flat bands.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, hist = new Float32Array(N);
        // how many cells of a coarse grid the point visits: small means it has fallen into a short cycle
        const spread = (a, b, c, e) => { let px = 0.1, py = 0.1; const seen = new Set(); for (let i = 0; i < 8000; i++) { const nx = Math.sin(a * py) + c * Math.cos(a * px); py = Math.sin(b * px) + e * Math.cos(b * py); px = nx; if (i > 6400) seen.add(((px * 9) | 0) * 64 + ((py * 9) | 0)); } return seen.size; };
        let base, w, ph, amp, tries = 0;
        let bx = 0, by = 0;   // the pointer bends the first two constants
        const at = t => base.map((v, k) => v + amp * Math.sin(t * w[k] + ph[k]) + (k === 0 ? bx : k === 1 ? by : 0));
        do {
          base = R.pick([[-1.4, 1.6, 1.0, 0.7], [1.7, 1.7, 0.6, 1.2], [-1.7, 1.3, -0.1, -1.2], [-1.8, -2.0, -0.5, -0.9], [1.5, -1.8, 1.6, 0.9]]);
          w = [0, 1, 2, 3].map(() => R.range(0.05, 0.11)); ph = [0, 1, 2, 3].map(() => R.range(0, 6)); amp = R.range(0.05, 0.11);
        } while (++tries < 20 && [0, 6, 12, 18, 24, 30, 36, 42].some(t => spread(...at(t)) < 150));
        let x = 0.1, y = 0.1;
        const dust = (t, pts) => {
          const [a, b, c, e] = at(t);
          const span = 1 + Math.max(Math.abs(c), Math.abs(e)), k = n * 0.47 / span, h = n / 2;
          for (let i = 0; i < pts; i++) {
            const nx = Math.sin(a * y) + c * Math.cos(a * x), ny = Math.sin(b * x) + e * Math.cos(b * y);
            x = nx; y = ny;
            hist[((h + y * k) | 0) * n + ((h + x * k) | 0)] += 1;
          }
        };
        for (let k = 0; k < 12; k++) dust(0, 20000);
        g.trait('Palette', palName(sc)); g.trait('Equation', 'Clifford'); g.trait('Form', 'No. ' + ({ '-1.4': 1, '1.7': 2, '-1.7': 3, '-1.8': 4, '1.5': 5 })[base[0]]); g.trait('Look', 'Glow');
        return t => {
          bx += ((g.input.inside ? (g.input.x - 0.5) * 0.6 : 0) - bx) * 0.1; by += ((g.input.inside ? (g.input.y - 0.5) * 0.6 : 0) - by) * 0.1;
          if (Math.abs(bx) < 1e-9) bx = 0; if (Math.abs(by) < 1e-9) by = 0;
          // if the drifting constants pass through a window where the orbit is a short cycle, hold the last picture
          if (spread(...at(t)) < 60) return;
          for (let i = 0; i < N; i++) hist[i] *= 0.93;
          dust(t, 9000);
          for (let i = 0; i < N; i++) { const v = hist[i]; d[i] = v < 0.7 ? BLACK : heat[Math.min(255, 30 + Math.log(1 + v) * 46) | 0]; }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), heat = U.heat(sc.cols), N = n * n, hist = new Float32Array(N);
      // how many cells of a coarse grid the point visits: small means it has fallen into a short cycle
      const fam = R.pick(['clifford', 'clifford', 'dejong', 'svensson']);
      const map = fam === 'dejong' ? (a, b, c, e, px, py) => [Math.sin(a * py) - Math.cos(b * px), Math.sin(c * px) - Math.cos(e * py)]
        : fam === 'svensson' ? (a, b, c, e, px, py) => [e * Math.sin(a * px) - Math.sin(b * py), c * Math.cos(a * px) + Math.cos(b * py)]
        : (a, b, c, e, px, py) => [Math.sin(a * py) + c * Math.cos(a * px), Math.sin(b * px) + e * Math.cos(b * py)];
      const PRESETS = { clifford: [[-1.4, 1.6, 1.0, 0.7], [1.7, 1.7, 0.6, 1.2], [-1.7, 1.3, -0.1, -1.2], [-1.8, -2.0, -0.5, -0.9], [1.5, -1.8, 1.6, 0.9]],
        dejong: [[1.4, -2.3, 2.4, -2.1], [2.01, -2.53, 1.61, -0.33], [-2.7, -0.09, -0.86, -2.2], [-0.827, -1.637, 1.659, -0.943], [1.641, 1.902, 0.316, 1.525]],
        svensson: [[1.4, 1.56, 1.4, -6.56], [-0.91, -1.29, -1.98, -1.4], [1.5, -1.8, 1.6, 2.0], [-1.6, 1.4, 1.4, 1.7]] };
      const spread = (a, b, c, e) => { let px = 0.1, py = 0.1; const seen = new Set(); for (let i = 0; i < 8000; i++) { [px, py] = map(a, b, c, e, px, py); if (i > 6400) seen.add(((px * 9) | 0) * 64 + ((py * 9) | 0)); } return seen.size; };
      const look = R.pick(['heat', 'heat', 'bands']), levels = R.int(4, 7), flat = Array.from({ length: levels }, (_, i) => U.pk(U.ramp(sc.cols, i / (levels - 1), false)));
      let bx = 0, by = 0;
      let base, w, ph, amp, tries = 0;
      const at = t => base.map((v, k) => v + amp * Math.sin(t * w[k] + ph[k]) + (k === 0 ? bx : k === 1 ? by : 0));
      do {
        base = R.pick(PRESETS[fam]).map(v => v + R.range(-0.08, 0.08));
        w = [0, 1, 2, 3].map(() => R.range(0.05, 0.11)); ph = [0, 1, 2, 3].map(() => R.range(0, 6)); amp = R.range(0.05, 0.11);
      } while (++tries < 20 && [0, 6, 12, 18, 24, 30, 36, 42].some(t => spread(...at(t)) < 150));
      let x = 0.1, y = 0.1;
      const dust = (t, pts) => {
        const [a, b, c, e] = at(t);
        const span = fam === 'clifford' ? 1 + Math.max(Math.abs(c), Math.abs(e)) : fam === 'dejong' ? 2 : 1 + Math.max(Math.abs(e), Math.abs(c)), k = n * 0.47 / span, h = n / 2;
        for (let i = 0; i < pts; i++) {
          const q = map(a, b, c, e, x, y);
          x = q[0]; y = q[1];
          const xx = (h + x * k) | 0, yy = (h + y * k) | 0;
          if (xx >= 0 && yy >= 0 && xx < n && yy < n) hist[yy * n + xx] += 1;
        }
      };
      for (let k = 0; k < 12; k++) dust(0, 20000);
      g.trait('Palette', palName(sc)); g.trait('Equation', { clifford: 'Clifford', dejong: 'de Jong', svensson: 'Svensson' }[fam]); { const ds = PRESETS[fam].map(q => q.reduce((a, v, i) => a + Math.abs(v - base[i]), 0)); g.trait('Form', 'No. ' + (ds.indexOf(Math.min(...ds)) + 1)); } g.trait('Look', look === 'heat' ? 'Glow' : levels + ' bands');
      return t => {
        bx += ((g.input.inside ? (g.input.x - 0.5) * 0.6 : 0) - bx) * 0.1; by += ((g.input.inside ? (g.input.y - 0.5) * 0.6 : 0) - by) * 0.1;
        // if the drifting constants pass through a window where the orbit is a short cycle, hold the last picture
        if (spread(...at(t)) < 60) return;
        for (let i = 0; i < N; i++) hist[i] *= 0.93;
        dust(t, 9000);
        for (let i = 0; i < N; i++) { const v = hist[i]; d[i] = v < 0.7 ? BLACK : look === 'bands' ? flat[Math.min(levels - 1, Math.floor(Math.log(1 + v) * 1.1))] : heat[Math.min(255, 30 + Math.log(1 + v) * 46) | 0]; }
      };
    },
  });
  P.add({
    interactive: 'Hold the pointer down to stir with a whirlpool of your own.',
    name: 'Vortices', fam: 'Strands', type: 'px', n: 120,
    recipe: 'Stripes or checks of dye stirred by a handful of whirlpools that also push each other around, winding the bands into each other.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, PERIOD = 18;
        const vs = Array.from({ length: R.int(3, 6) }, (_, i) => ({ x: R.range(0.25, 0.75) * n, y: R.range(0.25, 0.75) * n, g: R.range(14, 34) * (i % 2 ? -1 : 1) }));
        const layers = [0, 1].map(k => ({ u: new Float32Array(N), v: new Float32Array(N), age: k * PERIOD / 2 }));
        const fresh = L => { for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { L.u[i] = x; L.v[i] = y; } L.age = 0; };
        layers.forEach(L => { const a = L.age; fresh(L); L.age = a; });
        const bands = R.int(7, 13), diagonal = R.pick([0, 0, 1, -1]), stripe = sc.cols.map(U.pk), tu = new Float32Array(N), tv = new Float32Array(N);
        const fu = new Float32Array(N), fv = new Float32Array(N);
        const hand = { x: 0, y: 0, g: 0 };   // a whirlpool of the viewer's own while the pointer is held
        const tick = dt => {
          if (g.input.down && g.input.inside) { hand.x = g.input.x * n; hand.y = g.input.y * n; hand.g = 40; if (!vs.includes(hand)) vs.push(hand); }
          else if (vs.includes(hand)) vs.splice(vs.indexOf(hand), 1);
          for (const q of vs) {
            if (q === hand) continue;
            let u = 0, v = 0;
            for (const o of vs) if (o !== q) { const dx = q.x - o.x, dy = q.y - o.y, rr = dx * dx + dy * dy + 30; u += -dy / rr * o.g; v += dx / rr * o.g; }
            q.x += (u + (n / 2 - q.x) * 0.004) * dt * 12; q.y += (v + (n / 2 - q.y) * 0.004) * dt * 12;
          }
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            let u = 0, v = 0;
            for (let k = 0; k < vs.length; k++) { const q = vs[k], dx = x - q.x, dy = y - q.y, rr = dx * dx + dy * dy + 30; u -= dy / rr * q.g; v += dx / rr * q.g; }
            fu[i] = u; fv[i] = v;
          }
          for (const L of layers) {
            for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
              const sx = Math.min(n - 1.001, Math.max(0, x - fu[i] * dt * 12)), sy = Math.min(n - 1.001, Math.max(0, y - fv[i] * dt * 12));
              const x0 = sx | 0, y0 = sy | 0, fx = sx - x0, fy = sy - y0, j = y0 * n + x0;
              tu[i] = (L.u[j] * (1 - fx) + L.u[j + 1] * fx) * (1 - fy) + (L.u[j + n] * (1 - fx) + L.u[j + n + 1] * fx) * fy;
              tv[i] = (L.v[j] * (1 - fx) + L.v[j + 1] * fx) * (1 - fy) + (L.v[j + n] * (1 - fx) + L.v[j + n + 1] * fx) * fy;
            }
            L.u.set(tu); L.v.set(tv);
            if ((L.age += dt) > PERIOD) fresh(L);
          }
        };
        for (let k = 0; k < 50; k++) tick(1 / 12);
        const shade = (L, i) => { const s = Math.floor((L.v[i] + diagonal * L.u[i]) / n * bands + 64); return s & 1 ? BLACK : stripe[(s >> 1) % stripe.length]; };
        g.trait('Palette', palName(sc)); g.trait('Whirlpools', vs.length); g.trait('Dye', diagonal ? 'Diagonal stripes' : 'Stripes'); g.trait('Bands', bands);
        return (t, dt) => {
          tick(Math.min(0.1, dt));
          const A = layers[0], B = layers[1], wa = 1 - Math.abs(A.age / PERIOD * 2 - 1);
          for (let i = 0; i < N; i++) {
            const ca = shade(A, i), cb = shade(B, i);
            if (ca === cb) { d[i] = ca; continue; }
            const wb = 1 - wa;
            d[i] = (255 << 24 | ((ca >> 16 & 255) * wa + (cb >> 16 & 255) * wb) << 16 | ((ca >> 8 & 255) * wa + (cb >> 8 & 255) * wb) << 8 | ((ca & 255) * wa + (cb & 255) * wb)) >>> 0;
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, PERIOD = 18;
      const vs = Array.from({ length: R.int(2, 7) }, (_, i) => ({ x: R.range(0.25, 0.75) * n, y: R.range(0.25, 0.75) * n, g: R.range(14, 34) * (i % 2 ? -1 : 1) }));
      const hand = { x: 0, y: 0, g: 0 }, checks = R.bool(0.3);
      const layers = [0, 1].map(k => ({ u: new Float32Array(N), v: new Float32Array(N), age: k * PERIOD / 2 }));
      const fresh = L => { for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { L.u[i] = x; L.v[i] = y; } L.age = 0; };
      layers.forEach(L => { const a = L.age; fresh(L); L.age = a; });
      const bands = R.int(7, 13), diagonal = R.pick([0, 0, 1, -1]), stripe = sc.cols.map(U.pk), tu = new Float32Array(N), tv = new Float32Array(N);
      const fu = new Float32Array(N), fv = new Float32Array(N);
      const tick = dt => {
        if (g.input.down && g.input.inside) { hand.x = g.input.x * n; hand.y = g.input.y * n; hand.g = 40; if (!vs.includes(hand)) vs.push(hand); }
        else if (vs.includes(hand)) vs.splice(vs.indexOf(hand), 1);
        for (const q of vs) {
          if (q === hand) continue;
          let u = 0, v = 0;
          for (const o of vs) if (o !== q) { const dx = q.x - o.x, dy = q.y - o.y, rr = dx * dx + dy * dy + 30; u += -dy / rr * o.g; v += dx / rr * o.g; }
          q.x += (u + (n / 2 - q.x) * 0.004) * dt * 12; q.y += (v + (n / 2 - q.y) * 0.004) * dt * 12;
        }
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let u = 0, v = 0;
          for (let k = 0; k < vs.length; k++) { const q = vs[k], dx = x - q.x, dy = y - q.y, rr = dx * dx + dy * dy + 30; u -= dy / rr * q.g; v += dx / rr * q.g; }
          fu[i] = u; fv[i] = v;
        }
        for (const L of layers) {
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            const sx = Math.min(n - 1.001, Math.max(0, x - fu[i] * dt * 12)), sy = Math.min(n - 1.001, Math.max(0, y - fv[i] * dt * 12));
            const x0 = sx | 0, y0 = sy | 0, fx = sx - x0, fy = sy - y0, j = y0 * n + x0;
            tu[i] = (L.u[j] * (1 - fx) + L.u[j + 1] * fx) * (1 - fy) + (L.u[j + n] * (1 - fx) + L.u[j + n + 1] * fx) * fy;
            tv[i] = (L.v[j] * (1 - fx) + L.v[j + 1] * fx) * (1 - fy) + (L.v[j + n] * (1 - fx) + L.v[j + n + 1] * fx) * fy;
          }
          L.u.set(tu); L.v.set(tv);
          if ((L.age += dt) > PERIOD) fresh(L);
        }
      };
      for (let k = 0; k < 50; k++) tick(1 / 12);
      const shade = (L, i) => { const s = Math.floor((L.v[i] + diagonal * L.u[i]) / n * bands + 64) + (checks ? Math.floor(L.u[i] / n * bands + 64) : 0); return s & 1 ? BLACK : stripe[(s >> 1) % stripe.length]; };
      g.trait('Palette', palName(sc)); g.trait('Whirlpools', vs.length); g.trait('Dye', checks ? 'Checks' : diagonal ? 'Diagonal stripes' : 'Stripes'); g.trait('Bands', bands);
      return (t, dt) => {
        tick(Math.min(0.1, dt));
        const A = layers[0], B = layers[1], wa = 1 - Math.abs(A.age / PERIOD * 2 - 1);
        for (let i = 0; i < N; i++) {
          const ca = shade(A, i), cb = shade(B, i);
          if (ca === cb) { d[i] = ca; continue; }
          const wb = 1 - wa;
          d[i] = (255 << 24 | ((ca >> 16 & 255) * wa + (cb >> 16 & 255) * wb) << 16 | ((ca >> 8 & 255) * wa + (cb >> 8 & 255) * wb) << 8 | ((ca & 255) * wa + (cb & 255) * wb)) >>> 0;
        }
      };
    },
  });
  P.add({
    name: 'Harmonograph', seed: 4, fam: 'Strands', type: 'vec',
    recipe: 'Two pendulums swing the pen and two swing the table, each slightly out of tune, and the figure drifts as they slip.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.5), [fa, fb] = R.pick([[2, 3], [3, 4], [1, 2], [3, 5], [2, 5], [4, 5], [1, 3]]);
      const f = [fa + R.range(-0.012, 0.012), fb + R.range(-0.012, 0.012), fb + R.range(-0.012, 0.012), fa + R.range(-0.012, 0.012)], ph = [0, 1, 2, 3].map(() => R.range(0, U.TAU)), w = [0, 1, 2, 3].map(() => R.range(0.02, 0.07) * R.sign());
      const decay = R.range(0.006, 0.014), turns = R.int(26, 44), PTS = 2200, GROUPS = 22;
      return t => {
        sh.paint();
        ctx.lineWidth = g.lw(1.2);
        const p = ph.map((v, i) => v + t * w[i]);
        for (let gq = 0; gq < GROUPS; gq++) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, gq / GROUPS + t * 0.01, true), sh.paper ? 0.8 : 0.95);
          ctx.beginPath();
          for (let k = gq * PTS / GROUPS; k <= (gq + 1) * PTS / GROUPS; k++) {
            const s = k / PTS * turns * U.TAU, e = Math.exp(-decay * s);
            const x = 500 + e * (215 * Math.sin(f[0] * s + p[0]) + 215 * Math.sin(f[1] * s + p[1])), y = 500 + e * (215 * Math.sin(f[2] * s + p[2]) + 215 * Math.sin(f[3] * s + p[3]));
            if (k === gq * PTS / GROUPS) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      };
    },
  });

  P.add({
    name: 'Braid', seed: 1, fam: 'Strands', type: 'vec',
    recipe: 'Cords running side by side that keep swapping places, one passing over and one under, in an endless random plait.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.35), count = R.int(5, 9), ROW = R.range(90, 130), gap = 760 / (count - 1), thick = Math.min(26, gap * R.range(0.24, 0.42)), speed = R.range(26, 46), sideways = R.bool(0.3);
      const cols = Array.from({ length: count }, (_, i) => sh.paper ? sh.ink : U.ramp(sh.cols, i / count, true));
      let order = Array.from({ length: count }, (_, i) => i), rows = [], made = 0;
      const more = () => {
        const cross = [];
        for (let i = 0; i < count - 1; i++) if (R.bool(0.42)) { cross.push([i, R.bool()]); i++; }
        const before = order.slice();
        for (const [i] of cross) { const tmp = order[i]; order[i] = order[i + 1]; order[i + 1] = tmp; }
        rows.push({ k: made++, cross, before });
      };
      const lane = i => 120 + i * gap;
      const cord = (x0, x1, y0, col, halo) => {
        ctx.beginPath(); ctx.moveTo(x0, y0 - 1); ctx.bezierCurveTo(x0, y0 + ROW * 0.5, x1, y0 + ROW * 0.5, x1, y0 + ROW + 1);
        if (halo) { ctx.strokeStyle = U.css(sh.ground); ctx.lineWidth = thick + 12; ctx.stroke(); }
        ctx.strokeStyle = U.css(col); ctx.lineWidth = thick; ctx.stroke();
        if (!sh.paper) { ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = g.lw(thick * 0.14); ctx.stroke(); }
      };
      return t => {
        const scroll = t * speed, firstRow = Math.floor(scroll / ROW) - 1;
        while (made < firstRow + 12) more();
        rows = rows.filter(r => r.k >= firstRow);
        sh.paint();
        ctx.save(); ctx.lineCap = 'butt';
        if (sideways) { ctx.translate(500, 500); ctx.rotate(-Math.PI / 2); ctx.translate(-500, -500); }
        for (const r of rows) {
          const y0 = 1000 - (r.k + 1) * ROW + scroll, moved = new Set();
          for (const [i] of r.cross) { moved.add(i); moved.add(i + 1); }
          for (let i = 0; i < count; i++) if (!moved.has(i)) cord(lane(i), lane(i), y0, cols[r.before[i]], false);
          for (const [i, leftOver] of r.cross) {
            const under = leftOver ? i + 1 : i, over = leftOver ? i : i + 1;
            cord(lane(under), lane(under === i ? i + 1 : i), y0, cols[r.before[under]], false);
            cord(lane(over), lane(over === i ? i + 1 : i), y0, cols[r.before[over]], true);
          }
        }
        ctx.restore();
      };
    },
  });

  P.add({
    interactive: 'Click to release the pendulums again from there (on the maps, to zoom in).',
    name: 'Double Pendulum', fam: 'Strands', type: 'vec',
    recipe: 'A hundred double pendulums released a hair apart. They move as one, then fan out, then never agree again. Some rolls show a map instead, every cell a pendulum released from its own angles.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sc = U.scheme(R, 0.6), count = 64, L = 205;
        const cols = Array.from({ length: count }, (_, i) => U.css(U.ramp(sc.cols, i / count * (sc.native ? 0.85 : 1), !sc.native), 0.9));
        let a1, a2, w1, w2, born = 0, life;
        const reset = t => {
          born = t; life = R.range(20, 26);
          const s1 = R.range(1.9, 3.0) * R.sign(), s2 = R.range(1.5, 3.1) * R.sign(), eps = R.range(2e-6, 9e-6);
          a1 = Float64Array.from({ length: count }, () => s1); a2 = Float64Array.from({ length: count }, (_, i) => s2 + i * eps); w1 = new Float64Array(count); w2 = new Float64Array(count);
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        };
        const G = 9.81;
        const step = h => {
          for (let i = 0; i < count; i++) {
            const dl = a1[i] - a2[i], den = 3 - Math.cos(2 * dl);
            const d1 = (-3 * G * Math.sin(a1[i]) - G * Math.sin(a1[i] - 2 * a2[i]) - 2 * Math.sin(dl) * (w2[i] * w2[i] + w1[i] * w1[i] * Math.cos(dl))) / den;
            const d2 = (2 * Math.sin(dl) * (2 * w1[i] * w1[i] + 2 * G * Math.cos(a1[i]) + w2[i] * w2[i] * Math.cos(dl))) / den;
            w1[i] += d1 * h; w2[i] += d2 * h; a1[i] += w1[i] * h; a2[i] += w2[i] * h;
          }
        };
        reset(0);
        g.trait('Palette', palName(sc)); g.trait('View', 'Fan'); g.trait('Pendulums', count); g.trait('Style', 'Lines');
        return (t, dt) => {
          for (const p of g.input.taps()) {   // release them all again from the angle of the click
            const th = Math.atan2(p.x * 1000 - 500, p.y * 1000 - 470);
            for (let i = 0; i < count; i++) { a1[i] = th; a2[i] = th * 0.8 + i * 5e-6; w1[i] = w2[i] = 0; }
            born = t; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
          }
          if (t - born > life) reset(t);
          const k = Math.min(2.4, dt * 24), end = U.clamp((life - (t - born)) / 1.5);
          for (let s = 0; s < 6; s++) step(0.0065 * k);
          ctx.fillStyle = `rgba(0,0,0,${Math.min(1, 0.06 * k + (1 - end))})`; ctx.fillRect(0, 0, 1000, 1000);
          ctx.lineWidth = g.lw(2.2);
          for (let i = 0; i < count; i++) {
            const x1 = 500 + L * Math.sin(a1[i]), y1 = 470 + L * Math.cos(a1[i]), x2 = x1 + L * Math.sin(a2[i]), y2 = y1 + L * Math.cos(a2[i]);
            ctx.strokeStyle = cols[i];
            ctx.beginPath(); ctx.moveTo(500, 470); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([50, 80, 80, 100]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.6), N = n * n, G = 9.81, mode = R.pick(['map', 'map', 'flip', 'fan']);
        const a1 = new Float64Array(mode === 'fan' ? 80 : N), a2 = new Float64Array(a1.length), w1 = new Float64Array(a1.length), w2 = new Float64Array(a1.length), flip = new Float32Array(a1.length);
        const step = h => {
          for (let i = 0; i < a1.length; i++) {
            const dl = a1[i] - a2[i], den = 3 - Math.cos(2 * dl), sd = Math.sin(dl), cd = Math.cos(dl);
            const d1 = (-3 * G * Math.sin(a1[i]) - G * Math.sin(a1[i] - 2 * a2[i]) - 2 * sd * (w2[i] * w2[i] + w1[i] * w1[i] * cd)) / den;
            const d2 = (2 * sd * (2 * w1[i] * w1[i] + 2 * G * Math.cos(a1[i]) + w2[i] * w2[i] * cd)) / den;
            w1[i] += d1 * h; w2[i] += d2 * h; a1[i] += w1[i] * h; a2[i] += w2[i] * h;
          }
        };
        let born = 0, life, cx, cy, half, clock;
        const reset = (t, zoom) => {
          born = t; clock = 0; life = mode === 'fan' ? R.range(20, 26) : R.range(18, 28);
          if (zoom) { cx = zoom.x; cy = zoom.y; half = Math.max(0.05, half / 3); }
          else { cx = R.pick([0, 0, R.range(-2, 2)]); cy = R.pick([0, 0, R.range(-2, 2)]); half = R.pick([Math.PI, Math.PI, 1.6, 0.8]); }
          if (mode === 'fan') {
            const s1 = zoom ? zoom.x : R.range(1.9, 3.0) * R.sign(), s2 = zoom ? zoom.y : R.range(1.5, 3.1) * R.sign(), eps = R.range(2e-6, 9e-6);
            for (let i = 0; i < a1.length; i++) { a1[i] = s1; a2[i] = s2 + i * eps; w1[i] = w2[i] = 0; }
            d.fill(BLACK);
          } else for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) { a1[i] = cx + (x / (n - 1) * 2 - 1) * half; a2[i] = cy + (y / (n - 1) * 2 - 1) * half; w1[i] = w2[i] = 0; flip[i] = 0; }
        };
        reset(0);
        const ground = mode === 'flip' ? U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.9)) : BLACK, bands = R.pick([1, 1, 2]), cols = Array.from({ length: 64 }, (_, i) => U.pk(U.ramp(sc.cols, i / 64, !sc.native)));
        const L = n * 0.21, px0 = n / 2, py0 = n * 0.47;
        if (mode !== 'fan') for (let k = 0; k < 30; k++) { step(0.01); clock += 0.01; }
        g.trait('Palette', palName(sc)); g.trait('View', { map: 'Angle map', flip: 'Flip map', fan: 'Fan' }[mode]); g.trait('Pendulums', mode === 'fan' ? a1.length : n * n); g.trait('Style', 'Pixel'); if (mode !== 'fan') g.trait('Zoom', half > 3 ? 'Whole' : half > 1 ? 'Half' : 'Close'); g.trait('Grid', n);
        return (t, dt) => {
          for (const p of g.input.taps()) {
            if (mode === 'fan') reset(t, { x: Math.atan2(p.x * n - px0, p.y * n - py0), y: Math.atan2(p.x * n - px0, p.y * n - py0) * 0.8 });
            else reset(t, { x: cx + (p.x * 2 - 1) * half, y: cy + (p.y * 2 - 1) * half });
          }
          if (t - born > life) { half = Math.PI; reset(t); }
          const end = U.clamp((life - (t - born)) / 1.5), k = Math.min(2.4, dt * 24);
          for (let s2 = 0; s2 < (mode === 'fan' ? 6 : 2); s2++) { step(mode === 'fan' ? 0.0065 * k : 0.012); clock += 0.012; }
          if (mode === 'fan') {
            U.fadePx(d, 0.78);
            for (let i = 0; i < a1.length; i++) {
              const x1 = px0 + L * Math.sin(a1[i]), y1 = py0 + L * Math.cos(a1[i]), x2 = x1 + L * Math.sin(a2[i]), y2 = y1 + L * Math.cos(a2[i]), c = cols[(i * 64 / a1.length) | 0];
              X.line(g, px0, py0, x1, y1, c); X.line(g, x1, y1, x2, y2, c);
            }
          } else if (mode === 'flip') {
            for (let i = 0; i < N; i++) {
              if (!flip[i] && (Math.abs(a2[i]) > Math.PI || Math.abs(a1[i]) > Math.PI)) flip[i] = clock;
              d[i] = flip[i] ? cols[(Math.log(1 + flip[i]) * 24) & 63] : U.X.shade(cols[((a2[i] / U.TAU + 64) * 64) & 63], 0.28);
            }
          } else {
            for (let i = 0; i < N; i++) d[i] = cols[((a2[i] / U.TAU * bands + 64) * 64) & 63];
          }
          if (end < 1) U.fadePx(d, end);
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Pendulum Wave', fam: 'Strands', type: 'vec',
    recipe: 'A row of pendulums, each a little shorter than the last. They fall out of step into waves and knots, then all return at once.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.6), count = R.int(22, 36), cycle = R.range(50, 80), base = R.int(18, 30), amp = R.range(300, 400), across = R.bool(0.5), strings = R.bool(0.6);
      const cols = Array.from({ length: count }, (_, i) => U.css(U.ramp(sc.cols, i / count * (sc.native ? 0.85 : 1), !sc.native)));
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
      return (t, dt) => {
        const k = Math.min(2.4, dt * 24);
        ctx.fillStyle = `rgba(0,0,0,${0.08 * k})`; ctx.fillRect(0, 0, 1000, 1000);
        ctx.save();
        if (across) { ctx.translate(500, 500); ctx.rotate(Math.PI / 2); ctx.translate(-500, -500); }
        const pts = [];
        for (let i = 0; i < count; i++) pts.push([500 + amp * Math.cos(U.TAU * (base + i) * (t + 3) / cycle), 90 + 820 * i / (count - 1)]);
        if (strings) {
          ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = g.lw(1);
          ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
        }
        const r = Math.max(7, 400 / count);
        pts.forEach(([x, y], i) => { ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(x, y, r, 0, U.TAU); ctx.fill(); });
        ctx.restore();
      };
    },
  });
})();
