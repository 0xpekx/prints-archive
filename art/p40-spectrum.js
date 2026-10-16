// Set 4 · Spectrum: more new rules on the Synaesthesia idea. Each turns cell
// position and time into a hue through whole-number arithmetic, on hard square
// cells, with the originals' black voids where the hue runs off the wheel.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Spectrum' }, def));
  // hue 0..100 to a colour, as in the originals: outside 1..95 is a void when voids are on
  function colourer(R, voidShare = 0.75, nativeShare = 0.65) {
    const sc = U.scheme(R, nativeShare), voids = R.bool(voidShare), neon = R.bool(0.25);
    const lut = sc.native ? U.hueLut(neon ? 100 : 85, neon ? 100 : 90, 256) : U.lut(sc.cols, true);
    const at = h => (voids && (h > 95 || h < 1)) ? BLACK : lut[((h % 100 + 100) % 100) * 2.56 | 0];
    return { at, voids, lut, name: sc.native ? (neon ? 'Neon wheel' : 'Wheel') : sc.name };
  }
  // The variety the other rolls get (the opening variation is untouched): more often one of the
  // collection's palettes instead of the rainbow wheel, named either way; and the grain, the size of
  // the arithmetic's cells (1 = every cell, 2 or 3 = chunkier blocks).
  function variety(g, col, voidShare, grains = [1, 1, 2, 3]) {
    const A = g.alt;
    if (!g.home && A.bool(0.4)) col = colourer(A, voidShare, 0);
    g.trait('Palette', col.name); g.trait('Voids', col.voids ? 'On' : 'Off');
    const gr = grains.length > 1 ? g.trait('Grain', g.home ? 1 : A.pick(grains)) : 1;
    return { col, gr };
  }
  const mod = (a, m) => ((a % m) + m) % m;
  // the room's sound when the viewer has the microphone on: eight bands, eased so they
  // don't jitter, or null (tiles, GIFs, microphone off: the piece is exactly as before)
  function earBands(g) {
    const sm = new Float32Array(8);
    return () => { const I = g.input; if (!I.listening) { sm.fill(0); return null; } for (let b = 0; b < 8; b++) sm[b] += (I.bands[b] - sm[b]) * 0.45; return sm; };
  }
  function pointer(g) {
    const st = { px: -1, py: -1, idle: 99, down: false };
    return (dt, n) => {
      const I = g.input, taps = I.taps(), x = I.x * n, y = I.y * n;
      const moved = I.inside && (Math.abs(x - st.px) > 0.05 || Math.abs(y - st.py) > 0.05);
      if (moved || taps.length || I.down) st.idle = 0; else st.idle += dt;
      st.px = x; st.py = y; st.down = I.down;
      return { active: st.idle < 5, inside: I.inside, x, y, down: I.down, taps: taps.map(q => [q.x * n, q.y * n]) };
    };
  }

  add({
    name: 'Carries', seed: 3, sizes: [80, 100, 200], fps: 12,
    recipe: 'Each cell adds two numbers, its column plus a running clock and its row times a constant, in a small base, and counts how many times a digit carries. No carries is a void; the count picks the hue. The pattern is self-similar and slides as the clock runs.',
    make(R, U, g) {
      const { n, d } = g, base = R.pick([2, 2, 3, 3, 4, 5]), m = R.int(2, 9), col = colourer(R, 0.9), k = R.range(9, 16), h0 = R.range(-6, 2), r1 = R.pick([2, 3, 4]), r2 = R.pick([0, 0, 1]), dig = Math.ceil(Math.log(n * 40) / Math.log(base)) + 2;
      g.trait('Base', base); g.trait('Rows', 'x' + m);
      const V = variety(g, col, 0.9), C = V.col, gr = V.gr;
      const carries = (a, b) => { let c = 0, cnt = 0; for (let i = 0; i < dig && (a || b || c); i++) { const s = a % base + b % base + c; c = s >= base ? 1 : 0; cnt += c; a = (a / base) | 0; b = (b / base) | 0; } return cnt; };
      return t => {
        const T1 = Math.floor(t * r1), T2 = Math.floor(t * r2);
        for (let y = 0; y < n; y++) { const B = (y - y % gr) * m + T2; for (let x = 0; x < n; x++) { const c = carries(x - x % gr + T1, B); d[y * n + x] = C.at(c ? h0 + c * k : -5); } }
      };
    },
  });

  add({
    name: 'Sawtooth', seed: 1, sizes: [80, 100], fps: 12,
    recipe: 'Three ramps of hue, one across, one down and one on the diagonal, each wrapping back to zero at its own period, are added together and slid along at different speeds; every wrap is a hard edge, so the field is a moving patchwork of faceted gradients with voids wherever the sum runs off the wheel.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.8), s0 = n / 100;
      const P1 = R.range(14, 40) * s0, P2 = R.range(14, 40) * s0, P3 = R.range(20, 60) * s0, v1 = R.range(2, 6) * s0 * R.sign(), v2 = R.range(2, 6) * s0 * R.sign(), v3 = R.range(1, 4) * s0 * R.sign();
      const k = R.range(28, 40), h0 = R.range(-8, 4), dg = R.pick([1, -1]);
      g.trait('Facets', (P1 + P2) / 2 < 27 * s0 ? 'Small' : 'Large'); g.trait('Diagonal', dg > 0 ? 'Falling' : 'Rising');
      const V = variety(g, col, 0.8), C = V.col, gr = V.gr;
      return t => {
        for (let y = 0; y < n; y++) { const yq = y - y % gr, b = mod(yq - t * v2, P2) / P2; for (let x = 0; x < n; x++) { const xq = x - x % gr, a = mod(xq + t * v1, P1) / P1, c = mod(xq + dg * yq + t * v3, P3) / P3; d[y * n + x] = C.at(h0 + (a + b + c) * k); } }
      };
    },
  });

  add({
    name: 'Tongues', seed: 5, sizes: [80, 100, 200], fps: 10,
    recipe: 'The circle map run in every cell: across, the turn per step; down, how hard the circle is kicked. Where the motion locks to a simple fraction of a turn the cell takes that fraction’s hue, forming tongues that widen downward; where it never settles, a void. The colours turn slowly round the wheel.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0), N = 64, kmax = R.range(1, 1.25), o0 = R.range(0, 0.2), o1 = o0 + R.range(0.4, 0.8), qmax = R.int(5, 9);
      const rho = new Float32Array(n * n), lock = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const Om = o0 + (o1 - o0) * x / n, K = kmax * (y + 0.5) / n;
        let th = 0;
        for (let i = 0; i < N; i++) th = th + Om - K / TAU * Math.sin(TAU * th);
        const r = th / N; rho[y * n + x] = r;
        let best = 1; for (let q = 1; q <= qmax; q++) { const p = Math.round(r * q), e = Math.abs(r - p / q); if (e < best) best = e * (1 + q * 0.05); }
        lock[y * n + x] = best;
      }
      const k = R.range(150, 400), h0 = R.range(0, 100);
      g.trait('Kick', kmax > 1.12 ? 'Hard' : 'Gentle'); g.trait('Order', qmax);
      // the tongues widen downward (the original), or hang from the top like icicles
      const V = variety(g, col, 0, [1]), C = V.col, hang = g.trait('Tongues', g.home ? 'Rising' : g.alt.pick(['Rising', 'Rising', 'Hanging'])) === 'Hanging';
      if (hang) for (let y = 0; y < n / 2; y++) for (let x = 0; x < n; x++) { const a = y * n + x, b = (n - 1 - y) * n + x; let q = rho[a]; rho[a] = rho[b]; rho[b] = q; q = lock[a]; lock[a] = lock[b]; lock[b] = q; }
      return t => {
        const eps = 0.006 + 0.004 * Math.sin(t * 0.3), sh = t * 3;
        for (let i = 0; i < n * n; i++) d[i] = lock[i] > eps ? BLACK : C.at(h0 + rho[i] * k + sh);
      };
    },
  });

  add({
    name: 'Bleed', seed: 3, sizes: [50, 80], fps: 12,
    interactive: 'Click or drag to add wells of colour; they bleed into their neighbours, and stay.',
    listens: 'Clap to sink new wells.',
    recipe: 'A loose grid of wells is told the original remainder hue; every cell takes the circular average of its neighbours several times a frame, so the colours bleed into broad, flat bands that meet in clean seams, and where opposite hues meet they cancel to a black void. The wells glow as bright points.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.5), a = R.range(0.3, 1.5), yd = R.pick([1, 2, 3]), k = R.range(1, 4), h0 = R.range(0, 30), speed = R.pick([5, 10, 20]);
      const bands = R.pick([8, 10, 12, 16]), gap = R.pick([5, 6, 8]), src = new Uint8Array(n * n);
      g.trait('Bands', bands); g.trait('Wells', gap === 5 ? 'Dense' : gap === 6 ? 'Even' : 'Loose');
      // wells on a jittered grid, so the bleeding is even across the frame
      for (let y = 2; y < n; y += gap) for (let x = 2; x < n; x += gap) { const xx = Math.min(n - 1, x + R.int(-1, 2)), yy = Math.min(n - 1, y + R.int(-1, 2)); src[yy * n + xx] = 1; }
      let cx = new Float32Array(n * n), cy = new Float32Array(n * n), nx = new Float32Array(n * n), ny = new Float32Array(n * n);
      const C = variety(g, col, 0.5, [1]).col;
      const cosL = new Float32Array(1000), sinL = new Float32Array(1000), palette = Array.from({ length: bands }, (_, b) => C.at((b + 0.5) * 100 / bands));
      for (let i = 0; i < 1000; i++) { cosL[i] = Math.cos(i / 1000 * TAU); sinL[i] = Math.sin(i / 1000 * TAU); }
      const ptr = pointer(g), added = [];
      // wells the viewers sink stay (the oldest of 80 dry up first), so a variation keeps its visitors' marks
      const sink = (x, y) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x >= n || y >= n) return; const i = y * n + x; if (src[i]) return; src[i] = 1; added.push(i); if (added.length > 80) src[added.shift()] = 0; };
      let warm = true;
      return (t, dt) => {
        const p = ptr(dt, n), tt = 3 + t * 10 / speed;
        if (p.active) { for (const [x, y] of p.taps) sink(x, y); if (p.down) sink(p.x, p.y); }
        if (g.input.listening) { const b = g.input.beats(); for (let q = 0; q < Math.min(3, b * 3); q++) sink(g.alt.range(0, n), g.alt.range(0, n)); }
        // the first frame already shows the colours bled out (no black warm-up): the wells are
        // re-told their hue and bled many times over before it is drawn
        for (let rep = 0, reps = warm ? 120 : 1; rep < reps; rep++) {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (src[i]) { const h = mod(h0 + Math.log(mod(tt * a * (x + 1), y / yd + 1) + 1) * k * 12, 100), j = (h * 10) | 0; cx[i] = cosL[j]; cy[i] = sinL[j]; }
        }
        for (let it = 0; it < 3; it++) {
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const i = y * n + x, l = x ? i - 1 : i, r = x < n - 1 ? i + 1 : i, u = y ? i - n : i, dn = y < n - 1 ? i + n : i;
            nx[i] = (cx[i] * 2 + cx[l] + cx[r] + cx[u] + cx[dn]) / 6; ny[i] = (cy[i] * 2 + cy[l] + cy[r] + cy[u] + cy[dn]) / 6;
          }
          [cx, nx] = [nx, cx]; [cy, ny] = [ny, cy];
          for (let i = 0; i < n * n; i++) if (src[i]) { nx[i] = cx[i]; ny[i] = cy[i]; }
        }
        }
        warm = false;
        for (let i = 0; i < n * n; i++) {
          const m2 = cx[i] * cx[i] + cy[i] * cy[i];
          if (m2 < 0.02) { d[i] = BLACK; continue; }
          const h = (Math.atan2(cy[i], cx[i]) / TAU + 1) % 1;
          d[i] = palette[Math.min(bands - 1, (h * bands) | 0)];
        }
        // seams between bands drawn dark, wells drawn bright
        for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) { const i = y * n + x; if (d[i] !== BLACK && (d[i + 1] !== d[i] || d[i + n] !== d[i]) && d[i + 1] !== BLACK && d[i + n] !== BLACK) d[i] = X.shade(d[i], 0.7); }
        for (let i = 0; i < n * n; i++) if (src[i]) d[i] = X.mixPk(d[i], WHITE, 0.6);
      };
    },
  });
  add({
    name: 'Times Table', seed: 2, sizes: [80, 100], fps: 12,
    recipe: 'The grid is cut into blocks whose widths and heights slowly breathe; each block takes its column number times its row number, modulo a small count, as its hue, with multiples of the count as voids. A multiplication table that keeps resizing itself.',
    make(R, U, g) {
      const { n, d } = g, col0 = colourer(R, 0), m = R.pick([7, 9, 11, 12, 13, 16]), h0 = R.range(0, 100), span = R.pick([100, 70, 45]), w0 = R.range(3, 6) * n / 100, amp = R.range(0.3, 0.6), ph = R.range(0, TAU), skew = R.pick([0, 0, 1]);
      g.trait('Modulus', m); g.trait('Blocks', skew ? 'Slanted' : 'Square'); g.trait('Hues', span === 100 ? 'Full wheel' : span === 70 ? 'Wide' : 'Narrow');
      const col = variety(g, col0, 0, [1]).col;
      return t => {
        const bw = w0 * (1 + amp * Math.sin(t * 0.07)), bh = w0 * (1 + amp * Math.sin(t * 0.055 + ph)), off = t * 0.8;
        for (let y = 0; y < n; y++) { const j = Math.floor((y + off * 0.5) / bh) + 1; for (let x = 0; x < n; x++) { const i = Math.floor((x + off + skew * y * 0.5) / bw) + 1, v = (i * j) % m; d[y * n + x] = v === 0 ? BLACK : col.at(h0 + span * v / m); } }
      };
    },
  });

  add({
    name: 'Quadtree', seed: 4, sizes: [80, 100], fps: 12,
    recipe: 'The original field drawn with an adaptive grain: the canvas is split into squares, and a square is only split again where the hue inside it disagrees. Calm stretches become big flat tiles framed in black; busy ones break down to single cells.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.6), a = R.range(0.2, 1), yd = R.pick([1, 2, 3, 4]), k = R.range(2, 5), h0 = R.range(0, 30), speed = R.pick([20, 40]), thr = R.range(6, 14), frame = R.bool(0.7);
      // the field at a lower frequency than the grid, so there are calm stretches to merge
      const zoom = R.pick([5, 7, 9]), F = new Float32Array(n * n);
      g.trait('Zoom', zoom); g.trait('Frames', frame ? 'Black' : 'None'); g.trait('Detail', thr < 9 ? 'Fine' : thr > 11.5 ? 'Coarse' : 'Medium');
      const C = variety(g, col, 0.6, [1]).col;
      const at = (x, y) => F[Math.min(n - 1, y) * n + Math.min(n - 1, x)];
      return t => {
        const tt = 3 + t * 10 / speed;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) F[y * n + x] = h0 + Math.log(mod(tt * a * (x / zoom + 1), y / (yd * zoom) + 1) + 1) * k * 12;
        const leaf = (x, y, s) => {
          const c = at(x + (s >> 1), y + (s >> 1));
          if (s > 1) {
            const e = s - 1;
            if (Math.abs(at(x, y) - c) > thr || Math.abs(at(x + e, y) - c) > thr || Math.abs(at(x, y + e) - c) > thr || Math.abs(at(x + e, y + e) - c) > thr) { const h = s >> 1; leaf(x, y, h); leaf(x + h, y, s - h); leaf(x, y + h, h); leaf(x + h, y + h, s - h); return; }
          }
          const cc = C.at(c);
          for (let yy = y; yy < Math.min(n, y + s); yy++) d.fill(cc, yy * n + x, yy * n + Math.min(n, x + s));
          if (frame && s >= 4) { for (let xx = x; xx < Math.min(n, x + s); xx++) d[y * n + xx] = BLACK; for (let yy = y; yy < Math.min(n, y + s); yy++) d[yy * n + x] = BLACK; }
        };
        const top = n >= 200 ? 50 : n >= 100 ? 25 : 20;
        for (let y = 0; y < n; y += top) for (let x = 0; x < n; x += top) leaf(x, y, top);
      };
    },
  });

  // Remainder Rain: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogRemainderRain(R, U, g) {
      const { n, d } = g, col0 = colourer(R, 1), a = R.range(0.3, 1.5), md = R.range(6, 30), k = R.range(1.5, 4), h0 = R.range(0, 30), speed = R.pick([10, 20]), v0 = R.range(8, 14) * n / 100, gap = R.range(0.35, 0.8);
      const col = variety(g, col0, 1, [1]).col;
      g.trait('Rain', gap < 0.5 ? 'Heavy' : gap > 0.65 ? 'Light' : 'Steady'); g.trait('Columns', md < 14 ? 'Few hues' : 'Many hues');
      // a wind can slant the rain one way or the other (the drops fall at the same pace)
      const wind = g.trait('Wind', g.home ? 'Still' : g.alt.pick(['Still', 'Still', 'From left', 'From right'])), slope = wind === 'From left' ? 0.3 : wind === 'From right' ? -0.3 : 0;
      const drops = [], next = Float32Array.from({ length: n }, () => R() * gap), fade = new Float32Array(n * n), hue = new Float32Array(n * n);
      let warm = true;
      const step = (t, dt) => {
        const tt = 3 + t * 10 / speed, loud = g.input.listening ? g.input.level : 0;
        for (let x = 0; x < n; x++) if (t >= next[x]) { const h = h0 + Math.log(mod(tt * a * (x + 1), md) + 1) * k * 12; next[x] = t + gap * (0.7 + 0.6 * R()) / (1 + 2 * loud); if (!(col.voids && (h > 95 || h < 1))) drops.push({ x, y: -1, h, v: v0 * (2.2 - mod(h, 100) / 70) * (1 + 0.8 * loud) }); }
        for (let i = 0; i < n * n; i++) fade[i] *= 0.82;
        for (let j = drops.length - 1; j >= 0; j--) {
          const p = drops[j], y0 = p.y; p.y += p.v * dt;
          if (p.y >= n) { drops.splice(j, 1); continue; }
          for (let y = Math.max(0, Math.floor(y0)); y <= Math.floor(p.y); y++) { const i = y * n + (slope ? ((p.x + Math.round(y * slope)) % n + n) % n : p.x); fade[i] = 1; hue[i] = p.h; }
        }
        for (let i = 0; i < n * n; i++) { const f = fade[i]; d[i] = f > 0.12 ? X.shade(col.at(hue[i]), Math.ceil(f * 4) / 4) : BLACK; }
      };
      // the opening frame is already mid-shower rather than black
      return (t, dt) => { if (warm) { warm = false; for (let x = 0; x < n; x++) next[x] -= 4; for (let q = 48; q > 0; q--) step(t - q / 12, 1 / 12); } step(t, dt); };
  }
  // Remainder Rain: the rework, chosen on the other rolls
  function reRemainderRain(R, U, g) {
      const { n, d } = g, col0 = colourer(R, 1), a = R.range(0.3, 1.5), md = R.range(6, 30), k = R.range(1.5, 4), h0 = R.range(0, 30), speed = R.pick([10, 20]), v0 = R.range(8, 14) * n / 100, gap = R.range(0.35, 0.8);
      const col = variety(g, col0, 1, [1]).col;
      g.trait('Rain', gap < 0.5 ? 'Heavy' : gap > 0.65 ? 'Light' : 'Steady'); g.trait('Columns', md < 14 ? 'Few hues' : 'Many hues');
      // a wind can slant the rain one way or the other (the drops fall at the same pace)
      const wind = g.trait('Wind', g.home ? 'Still' : g.alt.pick(['Still', 'Still', 'From left', 'From right'])), slope = wind === 'From left' ? 0.3 : wind === 'From right' ? -0.3 : 0;
      const drops = [], next = Float32Array.from({ length: n }, () => R() * gap), fade = new Float32Array(n * n), hue = new Float32Array(n * n);
      let warm = true;
      const step = (t, dt) => {
        const tt = 3 + t * 10 / speed, loud = g.input.listening ? g.input.level : 0;
        for (let x = 0; x < n; x++) if (t >= next[x]) { const h = h0 + Math.log(mod(tt * a * (x + 1), md) + 1) * k * 12; next[x] = t + gap * (0.7 + 0.6 * R()) / (1 + 2 * loud); if (!(col.voids && (h > 95 || h < 1))) drops.push({ x, y: -1, h, v: v0 * (2.2 - mod(h, 100) / 70) * (1 + 0.8 * loud) }); }
        for (let i = 0; i < n * n; i++) fade[i] *= 0.82;
        for (let j = drops.length - 1; j >= 0; j--) {
          const p = drops[j], y0 = p.y; p.y += p.v * dt;
          if (p.y >= n) { drops.splice(j, 1); continue; }
          for (let y = Math.max(0, Math.floor(y0)); y <= Math.floor(p.y); y++) { const i = y * n + (slope ? ((p.x + Math.round(y * slope)) % n + n) % n : p.x); fade[i] = 1; hue[i] = p.h; }
        }
        for (let i = 0; i < n * n; i++) { const f = fade[i]; d[i] = f > 0.12 ? X.shade(col.at(hue[i]), Math.ceil(f * 4) / 4) : BLACK; }
      };
      // the first frame begins mid-shower: a few seconds are run at once
      // (run on a clock that really advances, so the colours change down each column as they do later)
      return (t, dt) => { if (warm) { warm = false; for (let x = 0; x < n; x++) next[x] -= 4; for (let q = 48; q > 0; q--) step(t - q / 12, 1 / 12); } step(t, dt); };
  }
  add({
    name: 'Remainder Rain', seed: 4, sizes: [50, 80, 100], fps: 12,
    recipe: 'Each column lets fall a drop now and then, coloured by the original remainder for that column at the moment it leaves the top; warm drops fall slowly and cool ones fast, so the falling colours sort themselves into a slanted rain with fading tails. Void hues fall as gaps.',
    listens: 'The rain falls harder and faster as the room gets louder.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogRemainderRain(R, U, g) : reRemainderRain(R, U, g); },
  });

  add({
    name: 'Polyrhythm', seed: 2, sizes: [50, 80], fps: 12,
    recipe: 'Every row is a drum with its own period: row r strikes every r + 2 beats, starting one beat later at each column. A strike lights the cell in the row’s hue and leaves a decaying echo, so the grid fills with diagonal phrases that line up and fall apart.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0), bpm = R.range(3, 5.5), h0 = R.range(0, 100), span = R.pick([100, 60, 35]), q = R.pick([2, 3, 4]), skew = R.pick([1, 2, 3]);
      const echo = new Float32Array(n * n), beatOf = new Int32Array(n * n).fill(-1);
      let last = -1;
      return t => {
        const beat = Math.floor(t * bpm);
        if (beat !== last) {
          for (let i = 0; i < n * n; i++) echo[i] *= 0.86;
          for (let b = last + 1; b <= beat; b++) for (let y = 0; y < n; y++) { const p = Math.floor(y / q) + 2; for (let x = 0; x < n; x++) if (mod(b - x * skew, p) === 0) { echo[y * n + x] = 1; beatOf[y * n + x] = b; } }
          last = beat;
        }
        for (let y = 0; y < n; y++) { const hue = h0 + span * (Math.floor(y / q) % 24) / 24; for (let x = 0; x < n; x++) { const i = y * n + x, e = echo[i]; d[i] = e > 0.1 ? X.shade(col.at(hue), e > 0.9 ? 1.1 : Math.ceil(e * 4) / 4 * 0.8) : BLACK; } }
      };
    },
  });

  add({
    name: 'Phase Curtain', seed: 2, sizes: [80, 100, 200], fps: 12,
    recipe: 'Each column carries the fractional part of time times the square of its number, and hangs a ramp of hue shifted by that phase. The folds crowd together across the curtain like a chirp; as time swings back and forth they open and close, and where they pass near a simple fraction broad bands appear. Wraps are voids.',
    make(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.85), c = R.range(2, 5) / n, k = R.range(96, 130), h0 = R.range(-14, -2), rows = R.range(1.5, 4), grain = R.pick([2, 3, 4]);
      const phase = new Float32Array(n);
      return t => {
        // time swings slowly back and forth, so the folds never run away into noise
        const tt = 3 + 2.5 * Math.sin(t * 0.04 - 1.2);
        for (let x = 0; x < n; x++) { const xx = Math.floor(x / grain) * grain + 1; phase[x] = mod(tt * c * xx * xx / n, 1); }
        for (let y = 0; y < n; y++) { const v = y / n * rows; for (let x = 0; x < n; x++) d[y * n + x] = col.at(h0 + mod(v + phase[x], 1) * k); }
      };
    },
  });

  // Terraces' variety: the land's shape (the original full block, a round island, a stepped pyramid or
  // a slope rising to one side), the number of steps and the palette; all named as traits
  function terraceShape(g, G, Hm, steps, col) {
    const A = g.alt, c = (G - 1) / 2;
    const shape = g.trait('Shape', g.home ? 'Block' : A.pick(['Block', 'Island', 'Pyramid', 'Slope', 'Crater', 'Ridges', 'Atoll']));
    // relief: how far the hue lifts the columns (the original, a low plain or towering)
    // (towering only where the shape adds no lift of its own, so nothing rises out of the frame)
    const flat = shape === 'Block' || shape === 'Island' || shape === 'Atoll';
    const relief = g.trait('Relief', g.home ? 'Standard' : A.pick(flat ? ['Standard', 'Standard', 'Low', 'Tall'] : ['Standard', 'Standard', 'Low']));
    g.trait('Steps', steps); g.trait('Columns', G + 'x' + G);
    const col2 = variety(g, col, 0.9, [1]).col;
    const step = Hm / steps;
    return {
      col: col2,
      k: relief === 'Low' ? 0.45 : relief === 'Tall' ? 1.12 : 1,
      keep: (i, j) => { const r2 = (i - c) ** 2 + (j - c) ** 2; return shape === 'Island' || shape === 'Crater' ? r2 <= (G / 2) ** 2 : shape === 'Atoll' ? r2 <= (G / 2) ** 2 && r2 >= (G / 4.5) ** 2 : true; },
      lift: (i, j) => {
        const r = Math.hypot(i - c, j - c) / (G / 2);
        if (shape === 'Pyramid') return Math.round((1 - Math.max(Math.abs(i - c), Math.abs(j - c)) / (G / 2)) * steps * 0.5) * step;
        if (shape === 'Slope') return Math.round(i / G * steps * 0.5) * step;
        if (shape === 'Crater') return Math.round(Math.min(1, r) * steps * 0.55) * step;
        if (shape === 'Ridges') return Math.round((0.5 + 0.5 * Math.cos((i + j) / G * Math.PI * 3)) * steps * 0.45) * step;
        return 0;
      },
    };
  }
  // Terraces: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogTerraces(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.9), a = R.range(0.2, 0.9), yd = R.pick([1, 2, 3]), k = R.range(1.5, 3.5), h0 = R.range(0, 25), speed = R.pick([20, 40]);
      const G = n >= 100 ? 22 : 18, tw = Math.max(2, Math.floor(n / (G * 2))), th = Math.max(1, tw >> 1), Hm = n * 0.34, cx = n / 2, top = Math.round(n * 0.38), steps = R.pick([6, 8, 10]);
      const back = X.rgb(12, 12, 16), H = new Float32Array(G * G);
      const ear = earBands(g), sh = terraceShape(g, G, Hm, steps, col);
      return t => {
        d.fill(back);
        const tt = 3 + t * 10 / speed;
        for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) H[j * G + i] = h0 + Math.log(mod(tt * a * (i + 1), j / yd + 1) + 1) * k * 12;
        const sb = ear(), lift = (i, j) => sb ? Math.round(sb[Math.min(7, Math.floor((i - j + G) / (2 * G) * 8))] * steps * 0.6) / steps * Hm : 0;
        for (let sum = 0; sum < 2 * G - 1; sum++) for (let i = Math.max(0, sum - G + 1); i <= Math.min(G - 1, sum); i++) {
          const j = sum - i;
          if (!sh.keep(i, j)) continue;
          const hv = H[j * G + i], c = sh.col.at(hv), pit = c === BLACK;
          const ht = pit ? 0 : Math.round(Math.floor(U.clamp(mod(hv, 100) / 100) * steps) / steps * Hm * sh.k + lift(i, j) + sh.lift(i, j));
          const x0 = Math.round(cx + (i - j) * tw), y0 = Math.round(top + (i + j) * th - ht);
          const topC = pit ? 0xff050507 : c, left = pit ? back : X.shade(c, 0.6), right = pit ? back : X.shade(c, 0.4);
          // the two side walls, then the diamond top
          for (let x = Math.max(0, x0 - tw); x < Math.min(n, x0 + tw); x++) { const cc = x < x0 ? left : right; for (let y = Math.max(0, y0); y < Math.min(n, y0 + ht + th); y++) d[y * n + x] = cc; }
          for (let r = 0; r <= th; r++) { const w = Math.round(tw * (1 - Math.abs(r - th / 2) / (th / 2 + 0.5))); X.rect(g, x0 - w, y0 - th / 2 + r, 2 * w, 1, topC); }
        }
      };
  }
  // Terraces: the rework, chosen on the other rolls
  function reTerraces(R, U, g) {
      const { n, d } = g, col = colourer(R, 0.9), a = R.range(0.2, 0.9), yd = R.pick([1, 2, 3]), k = R.range(1.5, 3.5), h0 = R.range(0, 25), speed = R.pick([20, 40]);
      const G = n >= 80 ? 19 : 12, tw = 2, th = 1, Hm = n * 0.42, cx = n / 2, top = Math.round(n * 0.44), steps = R.pick([6, 8, 10]);
      const back = X.rgb(12, 12, 16), H = new Float32Array(G * G);
      const ear = earBands(g), sh = terraceShape(g, G, Hm, steps, col);
      return t => {
        d.fill(back);
        const tt = 3 + t * 10 / speed;
        for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) H[j * G + i] = h0 + Math.log(mod(tt * a * (i + 1), j / yd + 1) + 1) * k * 12;
        const sb = ear(), lift = (i, j) => sb ? Math.round(sb[Math.min(7, Math.floor((i - j + G) / (2 * G) * 8))] * steps * 0.6) / steps * Hm : 0;
        for (let sum = 0; sum < 2 * G - 1; sum++) for (let i = Math.max(0, sum - G + 1); i <= Math.min(G - 1, sum); i++) {
          const j = sum - i;
          if (!sh.keep(i, j)) continue;
          const hv = H[j * G + i], c = sh.col.at(hv), pit = c === BLACK;
          const ht = pit ? 0 : Math.round(Math.floor(U.clamp(mod(hv, 100) / 100) * steps) / steps * Hm * sh.k + lift(i, j) + sh.lift(i, j));
          const x0 = Math.round(cx + (i - j) * tw), y0 = Math.round(top + (i + j) * th - ht);
          const topC = pit ? 0xff050507 : c, left = pit ? back : X.shade(c, 0.6), right = pit ? back : X.shade(c, 0.4);
          // the two side walls, then the diamond top
          for (let x = Math.max(0, x0 - tw); x < Math.min(n, x0 + tw); x++) { const cc = x < x0 ? left : right; for (let y = Math.max(0, y0); y < Math.min(n, y0 + ht + th); y++) d[y * n + x] = cc; }
          for (let r = 0; r <= th; r++) { const w = Math.round(tw * (1 - Math.abs(r - th / 2) / (th / 2 + 0.5))); X.rect(g, x0 - w, y0 - th / 2 + r, 2 * w, 1, topC); }
        }
      };
  }
  add({
    name: 'Terraces', seed: 4, sizes: [80, 100], fps: 12,
    recipe: 'The original remainder read as a height: a block of square columns seen from the corner, each raised in steps by its hue and painted with it, voids sunk to black pits. As time runs the landscape heaves slowly up and down.',
    listens: 'The terraces rise with the sound of the room: low notes on the left, high on the right.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogTerraces(R, U, g) : reTerraces(R, U, g); },
  });
})();
