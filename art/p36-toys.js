// Set 4 · Toys: playthings that spin, swing, roll and stack, drawn in cells.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Toys' }, def));
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  // a vertical gradient of k bands with ordered dither between them, precomputed
  function gradient(n, cols, top = 0, bot = n) {
    const out = new Uint32Array(n * n);
    for (let y = 0; y < n; y++) {
      const v = U.clamp((y - top) / Math.max(1, bot - top)) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(v)), f = v - i;
      for (let x = 0; x < n; x++) out[y * n + x] = f > X.dith4(x, y) ? cols[i + 1] : cols[i];
    }
    return out;
  }
  // filled ellipse, scanline
  function ellipse(g, cx, cy, rx, ry, c) {
    const { n, d } = g;
    for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(n - 1, Math.ceil(cy + ry)); y++) {
      const v = (y + 0.5 - cy) / ry, w = v * v < 1 ? rx * Math.sqrt(1 - v * v) : -1;
      if (w < 0) continue;
      const x0 = Math.max(0, Math.round(cx - w)), x1 = Math.min(n, Math.round(cx + w));
      for (let x = x0; x < x1; x++) d[y * n + x] = typeof c === 'function' ? c(x, y, d[y * n + x]) : c;
    }
  }
  // a shaded ball: light from the upper left, `levels` flat tones, a white glint
  function ball(g, cx, cy, r, col, levels = 4) {
    const { n, d } = g, tones = Array.from({ length: levels }, (_, i) => X.shade(col, 0.35 + 0.85 * i / (levels - 1)));
    for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(n - 1, Math.ceil(cy + r)); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(n - 1, Math.ceil(cx + r)); x++) {
      const nx = (x + 0.5 - cx) / r, ny = (y + 0.5 - cy) / r, q = nx * nx + ny * ny;
      if (q > 1) continue;
      const nz = Math.sqrt(1 - q), lit = U.clamp(-0.5 * nx - 0.6 * ny + 0.62 * nz);
      d[y * n + x] = lit > 0.93 ? WHITE : tones[Math.min(levels - 1, Math.floor(lit * (levels - 1) + X.dith4(x, y)))];
    }
  }
  // sprite from strings: '.' empty, digits index into cols
  const sprite = rows => rows.map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : +ch));
  const rgb = X.rgb;
  const F3 = { A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7], H: [5, 5, 7, 5, 5], J: [1, 1, 1, 5, 2], K: [5, 5, 6, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2], P: [6, 5, 6, 4, 4], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7], Y: [5, 5, 2, 2, 2], Z: [7, 1, 2, 4, 7] };
  // the name of a palette made by X.inks: one of the collection's palettes, or the native wheel
  const inkName = cols => { for (const p of U.PALETTES) if (cols.includes(U.pk(p.cols[0]))) return p.name; return 'Spectrum'; };
  // flip the finished frame left to right (a mirrored layout costs no extra drawing)
  const mirror = (d, n) => { for (let y = 0; y < n; y++) d.subarray(y * n, y * n + n).reverse(); };
  // the microphone, when the viewer has it on: { level, bands, beats } once a frame, else null
  const hear = g => { const I = g.input; return I.listening ? { level: I.level, bands: I.bands, beats: I.beats() } : null; };
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

  add({
    name: 'Spinning Tops', seed: 5, sizes: [80, 100], fps: 12,
    interactive: 'Click to drop a fresh top where you clicked.',
    recipe: 'Striped tops drop onto a plank floor and spin, their bands racing round; as each one slows its wobble grows until it topples, and a new top drops in.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, fy = Math.round(n * 0.7), inks = X.inks(R, 5, 0.5);
      const wall = X.shade(X.mixPk(R.pick(inks), X.rgb(40, 40, 60), 0.7), 0.5), plank = R.pick([[X.rgb(150, 98, 58), X.rgb(122, 78, 44)], [X.rgb(196, 160, 112), X.rgb(168, 132, 90)], [X.rgb(90, 70, 70), X.rgb(70, 54, 56)]]);
      const bg = gradient(n, [X.shade(wall, 0.55), wall, X.shade(wall, 1.3)], 0, fy);
      const floorKind = g.home || g.alt() < 0.5 ? 'planks' : g.alt.pick(['tiles', 'rug']), rugC = X.inks(g.alt, 3, 0.5);
      // the tops' build: the classic pear, a wide flat disc or a tall narrow spindle
      const build = g.trait('Tops', g.home ? 'Classic' : g.alt.pick(['Classic', 'Classic', 'Disc', 'Spindle']));
      g.trait('Floor', { planks: 'Planks', tiles: 'Tiles', rug: 'Rug' }[floorKind]); g.trait('Palette', inkName(inks));
      for (let y = fy; y < n; y++) {
        const row = Math.floor((y - fy) / Math.max(2, 5 * s)), seam = (y - fy) % Math.max(2, Math.round(5 * s)) === 0, off = (row * 37) % 23;
        for (let x = 0; x < n; x++) {
          let c = seam || (x + off * 3) % Math.round(31 * s) === 0 ? X.shade(plank[1], 0.7) : plank[(row & 1)];
          if (floorKind === 'tiles') c = ((x >> 3) + ((y - fy) >> 2)) & 1 ? rgb(230, 230, 236) : rgb(40, 40, 50);
          if (floorKind === 'rug') c = Math.abs(x - n / 2) > n * 0.42 || y > n - 3 ? plank[0] : X.mixPk(rugC[((Math.abs(x - n / 2) >> 2) + ((y - fy) >> 1)) % rugC.length], plank[1], 0.45);
          bg[y * n + x] = c;
        }
      }
      for (let x = 0; x < n; x++) bg[fy * n + x] = X.shade(plank[0], 1.25);
      const H = Math.round((build === 'Disc' ? 25 : build === 'Spindle' ? 42 : 34) * s), W = (build === 'Disc' ? 15.5 : build === 'Spindle' ? 9.5 : 12.5) * s;
      const prof = Array.from({ length: H + 1 }, (_, h) => { const u = h / H; return u < 0.6 ? Math.max(0.6, W * Math.pow(u / 0.6, 0.75)) : u < 0.8 ? W * (1 - (u - 0.6) / 0.2 * 0.78) : W * 0.16; });
      const k = g.trait('Bands', R.pick([3, 4, 5, 6]));
      const nTops = g.trait('Count', R.pick([3, 3, 4])), tops = Array.from({ length: nTops }, (_, i) => ({ slot: (i + 0.5) / nTops, start: -i * 4.3, life: 0 }));
      function renew(o, t, r = R) {
        o.born = t; o.L = r.range(13, 20); o.x = n * (0.1 + 0.8 * o.slot) + r.range(-4, 4) * s;
        const sh = r.shuffle(inks.slice()); o.cols = Array.from({ length: k }, (_, j) => sh[j % sh.length]); o.w0 = r.range(1.2, 2.4); o.phi = r(); o.psi = r() * TAU; o.side = r.sign();
      }
      tops.forEach(o => renew(o, o.start));
      const ptr = pointer(g);
      const frame = (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) for (const [x] of p.taps) { const o = tops.reduce((a, b) => Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a); renew(o, t, g.alt); o.x = U.clamp(x, W, n - W); }
        d.set(bg);
        for (const o of tops) {
          let tau = t - o.born;
          if (tau > o.L + 2.2) { renew(o, t); tau = 0; }
          const life = tau / o.L, spin = Math.max(0, 1 - life);
          o.phi += o.w0 * Math.sqrt(spin) * dt; o.psi += (0.8 + 2.4 * (1 - spin)) * dt;
          let tilt = (0.03 + 0.42 * life * life * life) * Math.cos(o.psi), drop = 0;
          if (tau < 0.7) drop = (1 - tau / 0.7) ** 2 * n * 0.8;
          if (life > 0.93) tilt = o.side * (0.5 + 0.95 * ease((tau - 0.93 * o.L) / 0.6));
          if (tau > o.L + 1.8) continue;   // gone for a moment before the next drops
          const tipx = o.x + Math.sin(o.psi * 0.5) * 2 * s * (1 - spin), tipy = fy - drop;
          const ax = Math.sin(tilt), ay = -Math.cos(tilt), px = Math.cos(tilt), py = Math.sin(tilt);
          if (drop < 2) ellipse(g, tipx + ax * H * 0.3, fy + 1, W * 1.1 + Math.abs(ax) * H * 0.5, 1.6 * s, (x, y, v) => X.dith4(x, y) < 0.6 ? X.shade(v, 0.55) : v);
          for (let h = 0; h < H; h++) {
            const c0x = tipx + ax * h, c0y = tipy + ay * h, c1x = tipx + ax * (h + 1), c1y = tipy + ay * (h + 1), w0 = prof[h], w1 = prof[h + 1], band = Math.floor(h / H * 5);
            const w = Math.max(w0, w1, 0.6), cx = (c0x + c1x) / 2, cy = (c0y + c1y) / 2;
            X.poly(g, [c0x - px * w0, c0y - py * w0, c0x + px * w0, c0y + py * w0, c1x + px * w1, c1y + py * w1, c1x - px * w1, c1y - py * w1], (x, y) => {
              const u = U.clamp(((x + 0.5 - cx) * px + (y + 0.5 - cy) * py) / w, -1, 1), a = Math.asin(u);
              const idx = (Math.floor(((a / Math.PI + 0.5) * 0.5 + o.phi) * k) + band) % k;
              return X.shade(o.cols[(idx + k) % k], 0.5 + 0.6 * Math.cos(a + 0.6) * (h > H * 0.8 ? 0.8 : 1));
            });
          }
        }
      };
      return frame;
    },
  });

  add({
    name: "Newton's Cradle", seed: 6, sizes: [50], fps: 12,
    interactive: 'Grab an end ball (or two, or three) and pull it out; let go and the click runs through the row.',
    listens: 'Clap to set the balls swinging (clap twice or three times for more balls).',
    recipe: 'Five fat balls on threads in a heavy chrome frame: one, two or three swing in from the side, the click runs through the row and the same number swing out the other end, slowly losing height, mirrored in the polished desk below.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g);
      const STYLES = [
        { name: 'chrome', ball: [rgb(70, 76, 90), rgb(150, 158, 175), rgb(220, 226, 236), WHITE], frame: [rgb(90, 96, 110), rgb(200, 206, 220)] },
        { name: 'gold', ball: [rgb(110, 70, 10), rgb(200, 140, 30), rgb(250, 210, 80), rgb(255, 250, 200)], frame: [rgb(60, 40, 20), rgb(160, 110, 40)] },
        { name: 'candy', ball: null, frame: [rgb(40, 40, 60), rgb(240, 240, 250)] },
        { name: 'glass', ball: [rgb(20, 90, 110), rgb(60, 180, 200), rgb(150, 240, 240), WHITE], frame: [rgb(30, 40, 50), rgb(120, 200, 210)] },
        { name: 'black', ball: [rgb(10, 10, 14), rgb(40, 40, 50), rgb(90, 90, 110), rgb(220, 220, 240)], frame: [rgb(120, 30, 30), rgb(230, 60, 60)] },
      ];
      const st = R.pick(STYLES), backI = R.int(0, 4), back = [rgb(24, 26, 44), rgb(40, 20, 40), rgb(14, 40, 44), rgb(236, 226, 206), rgb(30, 30, 30)][backI];
      g.trait('Finish', { chrome: 'Chrome', gold: 'Gold', candy: 'Candy', glass: 'Glass', black: 'Black' }[st.name]); g.trait('Room', ['Navy', 'Plum', 'Teal', 'Cream', 'Charcoal'][backI]);
      // how many balls hang in the row, and what the cradle stands on
      const N = g.trait('Balls', g.home ? 5 : g.alt.pick([5, 5, 4, 6])), deskKind = g.trait('Desk', g.home ? 'Mirror' : g.alt.pick(['Mirror', 'Mirror', 'Walnut', 'Baize']));
      const candy = [rgb(240, 60, 80), rgb(255, 170, 30), rgb(250, 230, 60), rgb(60, 200, 110), rgb(60, 140, 250)];
      const r = 3.2, swingK = N > 5 ? 0.72 : 1, cx = n / 2, top = 8, len = 21, desk = 39, mid = (N - 1) / 2;
      const tones = i => st.ball || [X.shade(candy[i % 5], 0.45), X.shade(candy[i % 5], 0.8), candy[i % 5], X.mixPk(candy[i % 5], WHITE, 0.6)];
      const bg = new Uint32Array(n * n);
      const woodC = deskKind === 'Walnut' ? [rgb(110, 70, 44), rgb(94, 58, 36)] : [rgb(40, 110, 70), rgb(34, 96, 60)];
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = y < desk ? back : deskKind !== 'Mirror' ? (deskKind === 'Walnut' ? woodC[((x + (y - desk) * 7) >> 3) & 1] : (X.dith4(x, y) < 0.2 ? woodC[1] : woodC[0])) : ((x + y) % 9 === 0 ? X.shade(back, 0.7) : X.shade(back, 0.5));
      for (let x = 0; x < n; x++) bg[desk * n + x] = X.mixPk(back, WHITE, 0.3);
      // swing state: k balls out at angle a on one side, then the other
      let k = R.int(1, 3), amp = R.range(0.4, 0.55), side = -1, ph = 0, grab = null, ghostT = 0, claps = 0, clapT = 0, boost = 0;
      const T = 1.25;
      const angles = () => { const out = new Float32Array(N); if (grab) { for (let i = 0; i < grab.k; i++) out[grab.side < 0 ? i : N - 1 - i] = grab.a; return out; } const s = Math.sin(ph * Math.PI); for (let i = 0; i < k; i++) out[side < 0 ? i : N - 1 - i] = side * amp * swingK * s; return out; };
      function ballAt(i, a, flip) {
        const px = cx + (i - mid) * 2 * r, bx = px + len * Math.sin(a), by = top + len * Math.cos(a);
        return [px, bx, flip ? 2 * desk - by : by];
      }
      function shadeBall(x0, y0, cols, dim) {
        for (let y = Math.floor(y0 - r); y <= Math.ceil(y0 + r); y++) for (let x = Math.floor(x0 - r); x <= Math.ceil(x0 + r); x++) {
          const nx = (x + 0.5 - x0) / r, ny = (y + 0.5 - y0) / r, q = nx * nx + ny * ny;
          if (q > 1) continue;
          const lit = -0.55 * nx - 0.6 * ny + 0.55 * Math.sqrt(1 - q);
          let c = lit > 0.78 ? cols[3] : lit > 0.4 ? cols[2] : lit > 0 ? cols[1] : cols[0];
          if (dim) c = X.mixPk(c, back, 0.55);
          X.put(g, x, y, c);
        }
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        // the viewer pulls balls out by dragging an end ball
        if (p.active) {
          for (const [x, y] of p.taps) {
            const a0 = angles();
            for (let i = 0; i < N; i++) { const [, bx, by] = ballAt(i, a0[i]); if (Math.hypot(x - bx, y - by) < r + 1.5) { const kk = i <= mid ? i + 1 : N - i; grab = { k: Math.min(3, kk), side: i <= mid ? -1 : 1, a: 0 }; } }
          }
          if (grab && p.down) grab.a = U.clamp(Math.asin(U.clamp((p.x - (cx + (grab.side < 0 ? -mid : mid) * 2 * r)) / len, -0.95, 0.95)), grab.side < 0 ? -0.6 : 0, grab.side < 0 ? 0 : 0.6);
          if (grab && !p.down) { k = grab.k; amp = Math.abs(grab.a); side = grab.side; ph = 0.5; grab = null; }
        }
        // claps: from rest the end balls swing out (one per clap, up to three); mid-swing
        // the next swing out goes higher
        const ear = hear(g);
        clapT -= dt;
        if (ear && ear.beats && !grab) {
          claps = clapT > 0 ? Math.min(3, claps + ear.beats) : Math.min(3, ear.beats); clapT = 0.7;
          if (amp < 0.18) { k = claps; amp = 0.5; ph = 0; side = g.alt.sign(); ghostT = 0; }
          else if (claps === 1 || k === claps) boost = 0.55;
        }
        if (!grab) {
          const before = ph;
          ph += dt / (T / 2);
          if (ph >= 1) { ph -= 1; side = -side; amp *= 0.93; if (boost) { amp = Math.max(amp, boost); boost = 0; } if (amp < 0.18 && !p.active) { ghostT = 0.6; amp = 0; } }
          if (before < 1 && ph < before) { /* wrapped */ }
          if (amp < 0.18) { ghostT -= dt; if (ghostT <= 0 && !p.active) { k = R.int(1, 3); amp = R.range(0.4, 0.55); side = R.sign(); ph = 0.5; } }
        }
        const a = angles();
        d.set(bg);
        // reflection first, dimmed, then the frame and the balls
        for (const flip of deskKind === 'Mirror' ? [true, false] : [false]) {
          const fy = v => flip ? 2 * desk - v : v;
          const F = st.frame.map(c => flip ? X.mixPk(c, back, 0.6) : c);
          const L = cx - 21, Rt = cx + 21;
          X.rect(g, L - 1, Math.min(fy(top - 2), fy(desk)), 3, Math.abs(fy(desk) - fy(top - 2)), F[0]); X.rect(g, L - 1, Math.min(fy(top - 2), fy(desk)), 1, Math.abs(fy(desk) - fy(top - 2)), F[1]);
          X.rect(g, Rt - 1, Math.min(fy(top - 2), fy(desk)), 3, Math.abs(fy(desk) - fy(top - 2)), F[0]); X.rect(g, Rt - 1, Math.min(fy(top - 2), fy(desk)), 1, Math.abs(fy(desk) - fy(top - 2)), F[1]);
          X.rect(g, L - 1, fy(top - 2) - (flip ? 2 : 0), Rt - L + 3, 3, F[0]); X.rect(g, L - 1, fy(top - 2) - (flip ? 2 : 0), Rt - L + 3, 1, F[1]);
          if (!flip) { X.rect(g, L - 4, desk - 2, Rt - L + 9, 2, F[0]); X.rect(g, L - 4, desk - 2, Rt - L + 9, 1, F[1]); X.rect(g, L - 3, desk, Rt - L + 7, 1, X.shade(back, 0.35)); }
          for (let i = 0; i < N; i++) {
            const [px, bx, by] = ballAt(i, a[i], flip), tc = X.mixPk(rgb(200, 200, 210), back, 0.4);
            if (!flip) { X.line(g, px - 2, top - 1, bx, by - r, tc); X.line(g, px + 2, top - 1, bx, by - r, tc); }
            if (flip && by - r > n) continue;
            shadeBall(bx, by, tones(i), flip);
          }
        }
        // the click: a white spark between the touching balls when a swing ends
        if (!grab && ph < 0.12 && amp > 0.2) { const i0 = side > 0 ? N - k : k - 1, [, bx, by] = ballAt(i0, 0, false), x = bx + (side > 0 ? -r : r); X.put(g, x, by, WHITE); X.put(g, x, by - 1, WHITE); X.put(g, x, by + 1, WHITE); }
      };
    },
  });

  add({
    name: 'Slinky', seed: 3, sizes: [50], fps: 12,
    interactive: 'Click to make the coil hurry.',
    recipe: 'A fat rainbow coil walks down an endless staircase, each end arching over the other in turn, ring by ring; the view follows it down past the banister. Coils in rainbow, steel, neon or pastel; stairs in oak, carpet or stone.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), dir = R.sign();
      const PALS = [
        Array.from({ length: 12 }, (_, i) => X.hsbPk(i / 12 * 100, 90, 100)),
        Array.from({ length: 12 }, (_, i) => [rgb(150, 156, 170), rgb(200, 206, 220), rgb(236, 240, 248)][i % 3]),
        Array.from({ length: 12 }, (_, i) => [rgb(255, 40, 200), rgb(40, 240, 255), rgb(180, 255, 40)][Math.floor(i / 4) % 3]),
        Array.from({ length: 12 }, (_, i) => X.hsbPk(i / 12 * 100, 48, 100)),
      ];
      const coilI = R.int(0, PALS.length - 1);
      let coils = PALS[coilI];
      const NC = coils.length;
      const STAIRS = [
        { tread: rgb(186, 128, 74), nose: rgb(226, 170, 104), riser: rgb(140, 92, 52), wall: [rgb(60, 50, 90), rgb(70, 60, 104)] },
        { tread: rgb(170, 40, 60), nose: rgb(210, 70, 90), riser: rgb(236, 230, 220), wall: [rgb(30, 70, 70), rgb(36, 82, 80)] },
        { tread: rgb(150, 150, 160), nose: rgb(196, 196, 206), riser: rgb(110, 110, 120), wall: [rgb(230, 214, 180), rgb(220, 200, 164)] },
        { tread: rgb(60, 60, 70), nose: rgb(240, 200, 40), riser: rgb(40, 40, 50), wall: [rgb(20, 24, 40), rgb(26, 30, 50)] },
      ];
      const stairI = R.int(0, STAIRS.length - 1), S = STAIRS[stairI], SW = 12, SH = 7, Tbase = R.range(1.3, 1.7);
      // a rare brass coil; and the coil's gauge: the usual fat rings, chunkier ones or a slim spring
      if (!g.home && g.alt.bool(0.1)) coils = Array.from({ length: 12 }, (_, i) => [rgb(200, 150, 40), rgb(240, 200, 80), rgb(255, 236, 160)][i % 3]);
      g.trait('Coil', coils === PALS[coilI] ? ['Rainbow', 'Steel', 'Neon', 'Pastel'][coilI] : 'Brass');
      g.trait('Stairs', ['Oak', 'Carpet', 'Stone', 'Night'][stairI]); g.trait('Heading', dir > 0 ? 'Right' : 'Left');
      const gauge = g.trait('Gauge', g.home ? 'Standard' : g.alt.pick(['Standard', 'Standard', 'Fat', 'Slim'])), RW = gauge === 'Fat' ? 5.6 : gauge === 'Slim' ? 3.4 : 4.6, RH = gauge === 'Fat' ? 2 : gauge === 'Slim' ? 1.3 : 1.6;
      let Pp = 0, hurry = 0;
      const ox = n * 0.42, oy = n * 0.6;
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active && p.taps.length) hurry = 2.5;
        hurry = Math.max(0, hurry - dt);
        Pp += dt / Tbase * (hurry ? 1.8 : 1);
        const camx = Pp * SW, camy = Pp * SH;
        // stairs: wall stripes, banister, treads with a light nosing, risers
        for (let x = 0; x < n; x++) {
          const wx = (x - ox) * dir + camx, k = Math.floor(wx / SW), ty = Math.round(k * SH - camy + oy), sx = ((wx % SW) + SW) % SW;
          const rail = Math.round(wx * SH / SW - camy + oy - 16), post = sx < 1;
          for (let y = 0; y < n; y++) {
            let c;
            if (y < ty) c = y === rail || y === rail + 1 ? rgb(90, 56, 30) : (post && y > rail && y < ty) ? rgb(120, 80, 44) : S.wall[(Math.floor(wx / 4) & 1)];
            else if (y === ty) c = S.nose;
            else if (y < ty + 2) c = S.tread;
            else c = sx < 1 ? X.shade(S.riser, 0.8) : S.riser;
            d[y * n + x] = c;
          }
        }
        // the coil: rings along an arch from the back end to the front end
        const k = Math.floor(Pp), u = Pp - k, rev = k & 1;
        const Ax = (k + 0.5) * SW, Ay = k * SH, Bx = Ax + SW, By = Ay + SH, stack = NC * 1.2;
        let e1x, e1y, e2x, e2y, hh;
        if (u < 0.5) { const q = ease(u / 0.5); e1x = Ax; e1y = Ay; e2x = Ax + q * SW; e2y = (Ay - stack) + (By - (Ay - stack)) * q - Math.sin(Math.PI * q) * 4; hh = stack * 1.1 * Math.sin(Math.PI * q); }
        else { const q = ease((u - 0.5) / 0.5); e2x = Bx; e2y = By; e1x = Ax + q * SW; e1y = Ay + ((By - stack) - Ay) * q - Math.sin(Math.PI * q) * 4; hh = stack * 1.1 * Math.sin(Math.PI * q); }
        const mx = (e1x + e2x) / 2, my = (e1y + e2y) / 2 - hh;
        const pts = [];
        for (let i = 0; i < NC; i++) {
          const v = i / (NC - 1), a = (1 - v) * (1 - v), b = 2 * v * (1 - v), c2 = v * v;
          pts.push([a * e1x + b * mx + c2 * e2x, a * e1y + b * my + c2 * e2y, coils[rev ? NC - 1 - i : i]]);
        }
        // back halves of all rings, then a dark under-edge for each front, then the
        // fronts with a glint on the lit side, so every ring reads as a round band
        for (let pass = 0; pass < 3; pass++) for (const [bx, by, col] of pts) {
          const x = (bx - camx) * dir + ox, y = by - camy + oy - 1.5;
          for (let j = 0; j < 26; j++) {
            const an = j / 26 * TAU, s = Math.sin(an), c = Math.cos(an);
            if ((s < 0) !== (pass === 0)) continue;
            const c2 = pass === 0 ? X.shade(col, 0.5) : pass === 1 ? X.shade(col, 0.42) : c < -0.25 && c > -0.75 ? X.mixPk(col, WHITE, 0.5) : col;
            X.put(g, x + c * RW, y + s * RH + (pass === 1 ? 1 : 0), c2);
          }
        }
      };
    },
  });

  add({
    name: 'Marble Run', seed: 5, sizes: [80, 100], fps: 12,
    interactive: 'Click to drop another marble in at the top.',
    recipe: 'Glass marbles roll down zig-zag rails on a pegboard, drop from rail to rail, and ride a little lift back to the top to roll again.',
    make(R, U, g) {
      const L0 = R.int(4, 5);
      const boardI = R.int(0, 3), board = [X.rgb(190, 150, 100), X.rgb(130, 96, 62), X.rgb(60, 70, 90), X.rgb(220, 205, 175)][boardI], hole = X.shade(board, 0.65), railI = R.int(0, 3), railc = [X.rgb(230, 200, 140), X.rgb(200, 60, 50), X.rgb(70, 130, 200), X.rgb(240, 240, 240)][railI];
      // how many rails zig-zag down, and which side the lift runs up
      const L = g.trait('Rails', g.home ? L0 : g.alt.pick([L0, L0, 3, 6])), flip = g.trait('Lift', g.home ? 'Right' : g.alt.pick(['Right', 'Right', 'Left'])) === 'Left';
      g.trait('Board', ['Maple', 'Walnut', 'Slate', 'Birch'][boardI]); g.trait('Track', ['Brass', 'Red', 'Blue', 'White'][railI]);
      const { n, d } = g, s = n / 100, x0 = Math.round(n * 0.1), x1 = Math.round(n * 0.7), lx = Math.round(n * 0.84), yTop = Math.round(n * 0.14), gap = Math.round(n * 0.74 / L), drop = 4 * s;
      const bg = new Uint32Array(n * n).fill(board), pitch = Math.max(3, Math.round(6 * s));
      for (let y = 2; y < n; y += pitch) for (let x = 2; x < n; x += pitch) bg[y * n + x] = hole;
      // the path: rails left-right-left..., drops between them, a floor run, the lift, a top chute
      const pts = [], segs = [];
      const seg = (ax, ay, bx, by, kind) => segs.push({ ax, ay, bx, by, kind, len: Math.hypot(bx - ax, by - ay) });
      const rails = [];
      for (let j = 0; j < L; j++) {
        const y = yTop + j * gap, ltr = j % 2 === 0, a = ltr ? x0 : x1, b = ltr ? x1 : x0;
        rails.push([a, y, b, y + drop]);
        seg(a, y, b, y + drop, 'roll');
        if (j < L - 1) seg(b, y + drop, b, yTop + (j + 1) * gap, 'fall');
      }
      const last = rails[L - 1], floorY = Math.round(n * 0.93);
      seg(last[2], last[3], last[2], floorY, 'fall');
      seg(last[2], floorY, lx, floorY, 'roll');
      seg(lx, floorY, lx, yTop - 6 * s, 'lift');
      seg(lx, yTop - 6 * s, x0, yTop, 'roll');
      const v = 26 * s, vl = 14 * s;
      for (const q of segs) q.dur = q.kind === 'fall' ? Math.sqrt(2 * Math.max(1, q.len) / (220 * s)) : q.len / (q.kind === 'lift' ? vl : v);
      const T = segs.reduce((a, q) => a + q.dur, 0), M = g.trait('Marbles', R.int(5, 8)), cols = X.inks(R, M, 0.5), r = 3.4 * s, offs = Array.from({ length: M }, (_, i) => i * T / M), ptr = pointer(g), extraM = [];
      let nextIn = 0;
      g.trait('Glass', inkName(cols));
      const where = tt => {
        tt = ((tt % T) + T) % T;
        for (const q of segs) {
          if (tt <= q.dur) { let u = tt / q.dur; if (q.kind === 'fall') u = u * u; return [q.ax + (q.bx - q.ax) * u, q.ay + (q.by - q.ay) * u, q.kind, q.len * u]; }
          tt -= q.dur;
        }
        return [x0, yTop, 'roll', 0];
      };
      const frame = (t, dt) => {
        const p = ptr(dt, n);
        // the viewer's marbles go in one after another, half a second apart (a burst of clicks
        // queues up rather than piling into one spot); at most eight extra, the oldest leave first
        if (p.active) for (const _ of p.taps) { const at = Math.max(t, nextIn); nextIn = at + 0.5; extraM.push(at); if (extraM.length > 8) extraM.shift(); }
        d.set(bg);
        // lift shaft and its moving chain
        X.rect(g, lx - r - 2 * s, yTop - 9 * s, 2 * r + 4 * s, floorY - yTop + 12 * s, X.shade(board, 0.8));
        const link = 4 * s, off = (t * vl) % link;
        for (let y = floorY + 2 * s - off; y > yTop - 9 * s; y -= link) X.rect(g, lx + r + 0.5 * s, y, 1.2 * s, 2 * s, X.shade(railc, 0.6));
        const dusk = (x, y) => X.put(g, x, y, X.shade(X.get(g, x, y), 0.72));
        for (const [ax, ay, bx, by] of rails) {
          // a soft shadow on the board, brackets holding each rail at both ends and the middle
          X.line(g, ax, ay + r + 3 + s, bx, by + r + 3 + s, dusk);
          for (const u of [0, 0.5, 1]) { const qx = ax + (bx - ax) * u, qy = ay + (by - ay) * u; X.rect(g, qx - s, qy + r + 1, 2 * s, 5 * s, X.shade(railc, 0.5)); X.rect(g, qx - s, qy + r + 1, Math.max(1, s * 0.6), 5 * s, X.shade(railc, 0.75)); }
          X.line(g, ax, ay + r + 1, bx, by + r + 1, X.mixPk(railc, WHITE, 0.4));
          X.line(g, ax, ay + r + 2, bx, by + r + 2, railc);
          X.line(g, ax, ay + r + 3, bx, by + r + 3, X.shade(railc, 0.55));
        }
        X.line(g, segs[segs.length - 1].ax, segs[segs.length - 1].ay + r + 1, x0, yTop + r + 1, railc);
        X.line(g, last[2], floorY + r + 1, lx + r, floorY + r + 1, railc);
        for (let i = 0; i < offs.length + extraM.length; i++) {
          if (i >= offs.length && t < extraM[i - offs.length]) continue;
          const [bx, by, kind, dist] = where(i < offs.length ? t + offs[i] : t - extraM[i - offs.length]);
          if (kind === 'lift') X.rect(g, bx - r - s, by + r - s, 2 * r + 2 * s, 1.5 * s, X.shade(railc, 0.8));
          X.disc(g, bx + 1.3 * s, by + 1.3 * s, r, (x, y) => X.shade(d[y * n + x], 0.7));
          ball(g, bx, by, r, cols[i % cols.length], 4);
          const a = dist / r;
          X.put(g, bx + Math.cos(a) * r * 0.45, by + Math.sin(a) * r * 0.45, X.shade(cols[i % cols.length], 0.3));
        }
        if (flip) mirror(d, n);
      };
      frame.period = T;
      return frame;
    },
  });

  add({
    name: 'Puzzle Cube', seed: 2, sizes: [80, 100, 200], fps: 12,
    interactive: 'Drag to turn the cube round.',
    recipe: 'A six-colour cube turns its layers, one quarter turn at a time, until it is thoroughly scrambled, then plays every move backwards until it is whole again, while it slowly revolves.',
    make(R, U, g) {
      // the puzzle: the usual 3 x 3, or a pocket 2 x 2, or a 4 x 4 (same overall size)
      const sizeName = g.trait('Size', g.home ? '3x3' : g.alt.pick(['3x3', '3x3', '3x3', '2x2', '4x4'])), NC = sizeName === '2x2' ? 2 : sizeName === '4x4' ? 4 : 3, half = (NC - 1) / 2;
      const { n, d } = g, s = n / 100, cx = n / 2, cy = n * 0.47, sc0 = 13.5 * s, sc = sc0 * 3 / NC;
      const classic = R.bool(0.6), faces = classic ? [[255, 255, 255], [255, 210, 0], [200, 20, 30], [255, 120, 0], [0, 70, 200], [0, 160, 70]].map(U.pk) : X.inks(R, 6, 1);
      g.trait('Stickers', classic ? 'Classic' : inkName(faces));
      const backs = X.inks(R, 3, 0.3), back = X.shade(R.pick(backs), 0.3), bg = gradient(n, [X.shade(back, 0.6), back, X.shade(back, 1.4)], 0, n);
      g.trait('Backdrop', inkName(backs));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const dx = (x - cx) / (sc0 * 2.6), dy = (y - n * 0.86) / (sc0 * 0.45); if (dx * dx + dy * dy < 1 && X.dith4(x, y) < 0.7) bg[y * n + x] = X.shade(back, 0.45); }
      // stickers: centre, normal and two in-plane axes; face colours by starting normal
      const base = [];
      const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      axes.forEach((ax, a) => [-1, 1].forEach(sg => {
        const nn = ax.map(v => v * sg), u = axes[(a + 1) % 3], w = axes[(a + 2) % 3];
        for (let i = -half; i <= half; i++) for (let j = -half; j <= half; j++) base.push({ p: [0, 1, 2].map(k => nn[k] * NC / 2 + u[k] * i + w[k] * j), nrm: nn, u, w, col: faces[a * 2 + (sg > 0 ? 1 : 0)] });
      }));
      const M = g.trait('Moves', R.int(9, 13)), moves = [], LAYER = NC === 3 ? { '-1': -1, 0: 0, 1: 1 } : NC === 2 ? { '-1': -0.5, 0: 0.5, 1: 0.5 } : { '-1': -1.5, 0: 0.5, 1: 1.5 };
      for (let i = 0; i < M; i++) { let a; do a = R.int(0, 2); while (moves.length && moves[moves.length - 1].a === a); moves.push({ a, l: LAYER[R.pick([-1, 1, 1, 0])], dir: R.sign() }); }
      const seq = [...moves, ...moves.slice().reverse().map(m => ({ a: m.a, l: m.l, dir: -m.dir }))], md = 0.5, pause = 0.12, hold = 1.2;
      const T = seq.length * (md + pause) + 2 * hold;
      const rot = (v, a, th) => { const c = Math.cos(th), sn = Math.sin(th), [x, y, z] = v; return a === 0 ? [x, y * c - z * sn, y * sn + z * c] : a === 1 ? [x * c + z * sn, y, -x * sn + z * c] : [x * c - y * sn, x * sn + y * c, z]; };
      // the layer a sticker belongs to along axis a (a sticker on a face perpendicular to a sits on the outer layer)
      const layerOf = (p, a) => Math.abs(p[a]) > half + 0.25 ? Math.sign(p[a]) * half : p[a];
      const light = [-0.4, 0.75, 0.55], ptr = pointer(g);
      let yawOff = 0, pitchOff = 0, lastX = null, lastY = null;
      const frame = (t, dt) => {
        const p = ptr(dt, n);
        if (p.active && p.down) { if (lastX !== null) { yawOff += (p.x - lastX) * 0.08; pitchOff = U.clamp(pitchOff + (p.y - lastY) * 0.05, -0.5, 0.9); } lastX = p.x; lastY = p.y; } else { lastX = null; lastY = null; }
        d.set(bg);
        let tt = ((t % T) + T) % T, done = 0, part = null;
        for (let i = 0; i < seq.length; i++) {
          const start = i * (md + pause) + (i >= M ? hold : 0);
          if (tt >= start + md) done = i + 1; else { if (tt > start) part = { m: seq[i], th: ease((tt - start) / md) }; break; }
        }
        const st = base.map(b => ({ p: b.p.slice(), nrm: b.nrm.slice(), u: b.u.slice(), w: b.w.slice(), col: b.col }));
        const apply = (m, th, snap) => {
          for (const q of st) if (Math.abs(layerOf(q.p, m.a) - m.l) < 0.25) {
            for (const key of ['p', 'nrm', 'u', 'w']) { let v = rot(q[key], m.a, th * m.dir * Math.PI / 2); if (snap) v = v.map(x => Math.round(x * 2) / 2); q[key] = v; }
          }
        };
        for (let i = 0; i < done; i++) apply(seq[i], 1, true);
        if (part) apply(part.m, part.th, false);
        const yaw = TAU * t / T + 0.6 + yawOff, pitch = 0.55 + pitchOff;
        const view = v => { const a = rot(v, 1, yaw); return rot(a, 0, pitch); };
        const quads = [];
        for (const q of st) {
          const nv = view(q.nrm);
          if (nv[2] <= 0.02) continue;
          const pc = view(q.p), u = view(q.u), w = view(q.w);
          const lit = 0.55 + 0.5 * Math.max(0, nv[0] * light[0] + nv[1] * light[1] + nv[2] * light[2]);
          quads.push({ z: pc[2], pc, u, w, col: X.shade(q.col, lit) });
        }
        quads.sort((a, b) => a.z - b.z);
        const proj = (c, u, w, h) => [[-1, -1], [1, -1], [1, 1], [-1, 1]].flatMap(([i, j]) => [cx + (c[0] + (u[0] * i + w[0] * j) * h) * sc, cy - (c[1] + (u[1] * i + w[1] * j) * h) * sc]);
        for (const q of quads) { X.poly(g, proj(q.pc, q.u, q.w, 0.5), 0xff141414); X.poly(g, proj(q.pc, q.u, q.w, 0.4), q.col); }
      };
      frame.period = T;
      return frame;
    },
  });

  add({
    name: 'Wind-Up Parade', seed: 4, sizes: [50, 80], fps: 12,
    interactive: 'Click a toy to wind it up (it turns round); click the table to set down another.',
    recipe: 'Clockwork robots, mice and ducks march along a tabletop, turning back at the edges; as each spring runs down it slows to a stop, its key whirls round, and off it goes again.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, top = Math.round(n * 0.66);
      const KINDS = [
        { rows: ['....2....', '....4....', '.1111111.', '.1311131.', '.1111111.', '.1144411.', '..11111..', '.2111112.', '.2111112.', '..11111..'], legs: ['..4...4..', '...4.4...'], key: [1, 4] },
        { rows: ['...........', '.....111...', '...1111111.', '..111111131', '.1111111111', '41111111114'], legs: ['..4....4...', '...4..4....'], key: [5, 0] },
        { rows: ['.....111.', '....11131', '....11122', '.11111111', '1111111..', '.111111..', '..1111...'], legs: ['...2.2...', '..2...2..'], key: [3, 2] },
      ].map(k => ({ ...k, a: sprite([...k.rows, k.legs[0]]), b: sprite([...k.rows, k.legs[1]]) }));
      const inks = X.inks(R, 6, 0.5), wall = X.shade(R.pick(inks), 0.3), tableI = R.int(0, 2), table = [X.rgb(170, 112, 66), X.rgb(120, 84, 60), X.rgb(220, 200, 160)][tableI];
      g.trait('Paint', inkName(inks)); g.trait('Table', ['Oak', 'Walnut', 'Pine'][tableI]);
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c;
        if (y < top) c = y > top - 10 * s ? X.shade(wall, 0.8) : ((x + y) % Math.round(8 * s) === 0 || (x - y + 1000) % Math.round(8 * s) === 0) ? X.shade(wall, 1.25) : wall;
        else if (y < top + 2 * s) c = X.shade(table, 1.2);
        else c = (y - top) % Math.round(6 * s) === 0 ? X.shade(table, 0.8) : (y > n * 0.86 ? X.shade(table, 0.6) : table);
        bg[y * n + x] = c;
      }
      // a window on the wall (sky, a cloud or stars, mullions, a sill), so the wall is a room
      {
        const A = g.alt, ww = Math.round(n * 0.32), wh = Math.round(n * 0.3), wx = Math.round(A.range(0.08, 0.6) * n), wy = Math.round(n * 0.1);
        const skyI = A.int(0, 2), sky = [[rgb(110, 170, 235), rgb(196, 228, 250)], [rgb(236, 140, 110), rgb(255, 214, 150)], [rgb(22, 30, 70), rgb(60, 70, 130)]][skyI], night = X.lum(sky[0]) < 0.2;
        g.trait('Window', ['Day', 'Sunset', 'Night'][skyI]);
        const fr = X.mixPk(wall, WHITE, 0.72), frD = X.shade(fr, 0.7), cl = A.range(0.2, 0.7);
        for (let y = wy; y < wy + wh; y++) for (let x = wx; x < wx + ww; x++) {
          const u = (x - wx) / ww, v = (y - wy) / wh;
          let c = (v + 0.25 * X.dith4(x, y)) < 0.55 ? sky[0] : sky[1];
          if (night && (x * 7 + y * 11) % 23 === 0) c = rgb(240, 240, 200);
          if (!night && Math.abs(v - 0.35) < 0.08 && Math.abs(u - cl) < 0.18 - Math.abs(v - 0.35)) c = WHITE;
          if (x === wx || y === wy || x === wx + ww - 1 || y === wy + wh - 1 || Math.abs(x - (wx + ww / 2 - 0.5)) < 0.6 || Math.abs(y - (wy + wh / 2 - 0.5)) < 0.6) c = fr;
          if (x === wx + 1 && y > wy && y < wy + wh - 1 || y === wy + 1 && x > wx && x < wx + ww - 1) c = c === fr ? fr : X.shade(c, 0.8);
          bg[y * n + x] = c;
        }
        for (let x = wx - 2; x < wx + ww + 2; x++) { if (x < 0 || x >= n) continue; bg[(wy + wh) * n + x] = fr; bg[(wy + wh + 1) * n + x] = frD; bg[(wy + wh + 2) * n + x] = X.shade(wall, 0.75); }
      }
      const toys = Array.from({ length: R.int(4, 6) }, (_, i) => ({ kind: KINDS[R.int(0, 2)], col: inks[i % inks.length], acc: inks[(i + 2) % inks.length], x: R.range(0.1, 0.85) * n, lane: R.int(0, 2), dir: R.sign(), E: R.range(0.3, 1), v: R.range(6, 11) * s, wind: 0, ph: R.int(0, 7) }));
      // the troupe: a mixed box of toys, or all robots, all mice or all ducks
      const troupe = g.trait('Troupe', g.home ? 'Mixed' : g.alt.pick(['Mixed', 'Mixed', 'Robots', 'Mice', 'Ducks']));
      if (troupe !== 'Mixed') for (const o of toys) o.kind = KINDS[['Robots', 'Mice', 'Ducks'].indexOf(troupe)];
      g.trait('Toys', toys.length);
      toys.sort((a, b) => a.lane - b.lane);
      const ptr = pointer(g);
      return (t, dt, f) => {
        const p = ptr(dt, n);
        if (p.active) for (const [x, y] of p.taps) {
          const o = toys.find(q => { const w = q.kind.a[0].length, yy = top + 3 * s + q.lane * 4 * s - q.kind.a.length; return x >= q.x - 1 && x <= q.x + w + 1 && y >= yy - 2 && y <= yy + q.kind.a.length + 1; });
          if (o) { o.wind = 0.6; o.dir = -o.dir; }
          else if (y > top && toys.length < 9) { toys.push({ kind: KINDS[g.alt.int(0, 2)], col: inks[toys.length % inks.length], acc: inks[(toys.length + 2) % inks.length], x: U.clamp(x, 2, n - 12), lane: g.alt.int(0, 2), dir: g.alt.sign(), E: 1, v: g.alt.range(6, 11) * s, wind: 0, ph: g.alt.int(0, 7) }); toys.sort((a, b) => a.lane - b.lane); }
        }
        d.set(bg);
        for (const o of toys) {
          const w = o.kind.a[0].length, y = top + 3 * s + o.lane * 4 * s - o.kind.a.length;
          if (o.wind > 0) { o.wind -= dt; if (o.wind <= 0) o.E = 1; }
          else { o.E -= dt * 0.07; if (o.E < 0.08) o.wind = 2.2; }
          const sp = o.wind > 0 ? 0 : o.v * Math.min(1, o.E * 1.6);
          o.x += o.dir * sp * dt;
          if (o.x < 2 * s) { o.x = 2 * s; o.dir = 1; } if (o.x > n - w - 2 * s) { o.x = n - w - 2 * s; o.dir = -1; }
          const step = sp > 0 ? ((f + o.ph) >> 1) & 1 : 0, spr = step ? o.kind.b : o.kind.a, flip = o.dir < 0;
          ellipse(g, o.x + w / 2, y + spr.length, w * 0.55, 1.2 * s, (x, yy, v) => X.shade(v, 0.6));
          X.stamp(g, spr, Math.round(o.x), Math.round(y - (step && o.kind === KINDS[2] ? 1 : 0)), [0, o.col, o.acc, WHITE, 0xff202020], flip);
          // the key on its back: a little cross that turns, fast while rewinding
          const kx = Math.round(o.x + (flip ? w - 1 - o.kind.key[1] : o.kind.key[1]) + (flip ? 2 : -2)), ky = Math.round(y + o.kind.key[0]);
          const turn = Math.floor((o.wind > 0 ? t * 14 : t * 3 * o.E) ) & 1, kc = X.rgb(230, 190, 60);
          X.put(g, kx, ky, kc);
          if (turn) { X.put(g, kx, ky - 1, kc); X.put(g, kx, ky + 1, kc); } else { X.put(g, kx - 1, ky, kc); X.put(g, kx + 1, ky, kc); }
        }
      };
    },
  });

  add({
    name: 'Alphabet Blocks', seed: 5, sizes: [50], fps: 12,
    interactive: 'Click the tower to knock it over; click the floor to drop a block there (your blocks stay, up to eight).',
    listens: 'Clap to knock the tower down.',
    recipe: 'Chunky painted letter blocks drop one by one and stack into words of the collection, wobble as they land, stand for a moment, then tumble across a nursery floor for the next words. Wallpapers, paints and woods vary.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), B = 9, floor = 44;
      const STACKS = [['HUE', 'GLOW'], ['VOID', 'ECHO'], ['NEON', 'TONE'], ['DUSK', 'SKY'], ['MIND', 'AXON'], ['PRISM'], ['DRIFT'], ['BLOOM'], ['EMBER'], ['GRAIN'], ['SYNAE'], ['DECAY'], ['HUE', 'SEE', 'ME']];
      const order = R.shuffle(STACKS.slice()), PAINTS = [[rgb(230, 40, 50), rgb(40, 110, 230), rgb(250, 200, 30), rgb(40, 170, 80)], [rgb(240, 120, 150), rgb(120, 200, 230), rgb(250, 220, 120), rgb(170, 230, 150)], [rgb(30, 30, 40), rgb(240, 240, 240), rgb(230, 40, 50)], X.inks(R, 4, 0.5)], paintI = R.int(0, 3);
      let paints = PAINTS[paintI];
      const wallI = R.int(0, 4), wallA = [rgb(250, 236, 200), rgb(200, 230, 250), rgb(60, 50, 90), rgb(250, 210, 220), rgb(210, 240, 210)][wallI], wallB = X.shade(wallA, 0.9), pattern = R.pick(['stripes', 'dots', 'stars', 'plain']);
      const woodI = R.int(0, 2), woods = [[rgb(200, 140, 80), rgb(176, 120, 64)], [rgb(230, 190, 130), rgb(210, 170, 110)], [rgb(130, 84, 50), rgb(110, 70, 40)]][woodI];
      // the blocks: painted all over, or bare wood with only the letters painted
      const bare = g.trait('Blocks', g.home ? 'Painted' : g.alt.pick(['Painted', 'Painted', 'Bare wood'])) === 'Bare wood';
      g.trait('Paint', ['Primary', 'Pastel', 'Mono', inkName(PAINTS[3])][paintI]); g.trait('Wall', ['Cream', 'Sky', 'Night', 'Pink', 'Mint'][wallI]);
      g.trait('Wallpaper', pattern[0].toUpperCase() + pattern.slice(1)); g.trait('Floor', ['Oak', 'Pine', 'Walnut'][woodI]); g.trait('First words', order[0].join(' '));
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = wallA;
        if (pattern === 'stripes' && (x >> 2) & 1) c = wallB;
        if (pattern === 'dots' && x % 6 === 2 && y % 6 === (x % 12 < 6 ? 2 : 5)) c = X.shade(wallA, 0.75);
        if (pattern === 'stars' && ((x * 7 + y * 13) % 47 === 0)) c = rgb(250, 230, 120);
        if (y >= floor) c = woods[((x + (y - floor) * 5) >> 3) & 1];
        if (y === floor) c = X.shade(woods[0], 0.7);
        bg[y * n + x] = c;
      }
      // bunting across the top, and a little framed picture
      const flags = X.inks(R, 5, 0.6);
      for (let x = 0; x < n; x++) { const y = Math.round(3 + 3 * Math.sin(x / n * Math.PI)); bg[y * n + x] = rgb(90, 70, 60); if (x % 7 === 2) for (let r2 = 1; r2 <= 4; r2++) for (let c2 = -Math.floor((4 - r2) / 2 + 0.5); c2 <= Math.floor((4 - r2) / 2 + 0.5); c2++) bg[(y + r2) * n + x + 1 + c2] = flags[(x / 7 | 0) % flags.length]; }
      const fx = R.int(4, n - 18), fy2 = R.int(12, 16), fh0 = R.range(0, 100);
      // the framed picture: a little painted landscape (sky in the picture's hue, a sun, two hills)
      const skyP = X.hsbPk(fh0, 30, 96), sunP = rgb(255, 214, 60), hillA = X.hsbPk(fh0 + 30, 60, 70), hillB = X.hsbPk(fh0 + 30, 70, 52);
      for (let y = 0; y < 12; y++) for (let x = 0; x < 14; x++) {
        let c = skyP;
        if ((x - 9.5) ** 2 + (y - 3.5) ** 2 < 4.5) c = sunP;
        if (y > 6 + Math.round(1.6 * Math.sin(x * 0.55 + fh0))) c = hillA;
        if (y > 8 + Math.round(1.2 * Math.sin(x * 0.8 + 2 + fh0))) c = hillB;
        if (y === 0 || x === 0 || y === 11 || x === 13) c = y === 0 || x === 0 ? rgb(150, 104, 56) : rgb(100, 66, 34);
        bg[(fy2 + y) * n + fx + x] = c;
      }
      for (let x = 1; x < 15; x++) bg[(fy2 + 12) * n + fx + x] = X.shade(bg[(fy2 + 12) * n + fx + x], 0.82);
      // blocks: `keep` < 1 dissolves one away through an ordered dither
      let keep = 1;
      const put = (x, y, c) => { if (keep >= 1 || X.dith4(x, y) < keep) X.put(g, x, y, c); };
      const drawBlock = (b, x, y) => {
        x = Math.round(x); y = Math.round(y);
        const fr = bare ? rgb(222, 184, 132) : b.col, light = X.mixPk(fr, WHITE, 0.35), dark = X.shade(fr, 0.6), letter = bare ? (X.lum(b.col) > 0.75 ? X.shade(b.col, 0.5) : b.col) : X.lum(fr) > 0.6 ? rgb(40, 30, 30) : WHITE;
        for (let v = 0; v < B; v++) for (let u = 0; u < B; u++) put(x + u, y + v, v === 0 || u === 0 ? light : v === B - 1 || u === B - 1 ? dark : fr);
        const rows = X.FONT[b.ch] || X.FONT['?'];
        for (let r = 0; r < 7; r++) for (let q = 0; q < 5; q++) if (rows[r] >> (4 - q) & 1) put(x + 2 + q, y + 1 + r, letter);
      };
      let blocks = [], cyc = -1, t0 = 0, tumble = false, extra = [], old = [], oldT = 0;
      function build(t) {
        cyc++; t0 = t; tumble = false;
        // the last tower's blocks, wherever they came to rest, melt away as the next one drops in
        old = blocks.map(b => ({ ...b, x: b.fx, y: b.fy })); oldT = t; blocks = [];
        const words = order[cyc % order.length];
        let i = 0;
        words.forEach((w, row) => {
          const x0 = Math.round(n / 2 - (w.length * B) / 2);
          for (let k = 0; k < w.length; k++) blocks.push({ ch: w[k], x: x0 + k * B, y: floor - (row + 1) * B, at: 0.3 + 0.4 * i++, col: paints[(row * 2 + k) % paints.length], vx: 0, vy: 0, fx: 0, fy: 0 });
        });
      }
      build(0);
      t0 = -(blocks[blocks.length - 1].at + 0.6);   // the first tower is already standing
      const knock = () => { if (tumble) return; tumble = true; for (const b of blocks) { b.vx = (b.x - n / 2) * 1.2 + R.range(-6, 6); b.vy = -R.range(6, 22); b.fx = b.x; b.fy = b.y; } };
      return (t, dt) => {
        const p = ptr(dt, n);
        let tt = t - t0;
        const all = blocks[blocks.length - 1].at + 0.6;
        if (p.active) for (const [x, y] of p.taps) {
          if (y < floor && blocks.some(b => tt > b.at && x >= b.x && x < b.x + B && y >= b.y && y < b.y + B)) knock();
          else {
            // the viewer's own blocks stack where they land and stay through every tower (the oldest of twelve goes)
            const bx = U.clamp(Math.round(x - B / 2), 0, n - B);
            if (extra.length >= 8) extra.shift();
            const under = extra.filter(e => Math.abs(e.x - bx) < B).length;
            extra.push({ ch: String.fromCharCode(65 + g.alt.int(0, 25)), x: bx, y: -B, vy: 0, col: g.alt.pick(paints), land: floor - B * (1 + Math.min(1, under)) });
          }
        }
        const ear = hear(g);
        if (ear && ear.beats && tt > all) knock();
        if (!tumble && tt > all + 3.5 && !p.active) knock();
        if (tumble && tt > all + 7) { build(t); tt = 0; }
        d.set(bg);
        for (let i = 0; i < extra.length; i++) {
          const e = extra[i]; let under = 0;
          for (let j = 0; j < i; j++) if (Math.abs(extra[j].x - e.x) < B) under++;
          e.land = floor - B * (1 + Math.min(1, under));
          e.vy += 70 * dt; e.y = Math.min(e.land, e.y + e.vy * dt); if (e.y >= e.land) e.vy = 0; drawBlock(e, e.x, e.y);
        }
        if (old.length) { keep = 1 - (t - oldT) / 0.9; if (keep <= 0) old = []; else for (const b of old) drawBlock(b, b.x, b.y); keep = 1; }
        for (const b of blocks) {
          if (tt < b.at) continue;
          let x = b.x, y = b.y;
          if (!tumble) { b.fx = b.x; b.fy = b.y; const u = (tt - b.at) / 0.4; if (u < 1) y = b.y - (1 - u * u) * n; else if (u < 1.6) y = b.y - Math.abs(Math.sin((u - 1) * TAU)) * 1.5 * (1.6 - u); }
          else {
            // tumble: bounce on the floor, off the walls, then slide to rest
            b.vy += 70 * dt; b.fx += b.vx * dt; b.fy += b.vy * dt;
            if (b.fy > floor - B && b.vy > 0) { b.fy = floor - B; b.vy = Math.abs(b.vy) > 8 ? b.vy * -0.35 : 0; b.vx *= 0.8; }
            if (b.fy >= floor - B - 0.01) b.vx *= Math.max(0, 1 - 2.5 * dt);
            if (b.fx < 0) { b.fx = 0; b.vx = Math.abs(b.vx) * 0.5; } if (b.fx > n - B) { b.fx = n - B; b.vx = -Math.abs(b.vx) * 0.5; }
            x = b.fx; y = b.fy;
          }
          drawBlock(b, x, y);
        }
      };
    },
  });

  add({
    name: 'Etching Screen', seed: 4, sizes: [80, 100], fps: 12,
    interactive: 'Move over the grey screen to draw with the knobs; click the red frame to shake it clean.',
    recipe: 'A red drawing toy draws by itself, the two white knobs turning as one continuous grey line builds a skyline, a meander, mountains or a square spiral; then it is shaken clean and starts over.',
    make(R, U, g) {
      // the classic red, or one of a few toy-shop enamels (the roll still picks among them)
      const TOYC = [X.rgb(30, 92, 200), X.rgb(236, 180, 24), X.rgb(16, 146, 136), X.rgb(44, 44, 54), X.rgb(236, 104, 26), X.rgb(120, 60, 170), X.rgb(36, 160, 70), X.rgb(220, 90, 150)];
      const nearest = c => TOYC.reduce((a, b) => { const dist = q => ((q & 255) - (c & 255)) ** 2 + ((q >> 8 & 255) - (c >> 8 & 255)) ** 2 + ((q >> 16 & 255) - (c >> 16 & 255)) ** 2; return dist(b) < dist(a) ? b : a; });
      const fcPick = R.bool(0.7) ? null : R.pick(X.inks(R, 4, 0.5));
      // new looks for the other rolls: a fine or bold stylus, the screen's tint, a pocket-size toy, more subjects
      const A = g.alt, bold = g.trait('Line', g.home ? 'Fine' : A.pick(['Fine', 'Fine', 'Bold'])) === 'Bold';
      const tint = g.trait('Screen', g.home ? 'Grey' : A.pick(['Grey', 'Grey', 'Silver', 'Mint']));
      const pocket = g.trait('Toy', g.home ? 'Classic' : A.pick(['Classic', 'Classic', 'Pocket'])) === 'Pocket';
      const extra = g.trait('Subjects', g.home ? 'Classic' : A.pick(['Classic', 'More'])) === 'More';
      const { n, d } = g, s = n / 100, frameCol = fcPick === null ? X.rgb(200, 24, 40) : nearest(fcPick), screen = tint === 'Silver' ? X.rgb(214, 214, 210) : tint === 'Mint' ? X.rgb(196, 210, 192) : X.rgb(196, 196, 186), inkc = X.rgb(70, 72, 74);
      g.trait('Frame', fcPick === null ? 'Red' : ['Blue', 'Yellow', 'Teal', 'Black', 'Orange', 'Purple', 'Green', 'Pink'][TOYC.indexOf(frameCol)]);
      const mg = pocket ? 15 : 10, sx0 = Math.round(mg * s), sy0 = Math.round(mg * s), sx1 = n - Math.round(mg * s), sy1 = Math.round(n * (pocket ? 0.74 : 0.78)), W = sx1 - sx0, H = sy1 - sy0;
      const ink = new Uint8Array(W * H), bg = new Uint32Array(n * n);
      let rng = R;   // the piece's own stream, until the viewer shakes it (then the alt stream, so R is never drawn for them)
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const inS = x >= sx0 && x < sx1 && y >= sy0 && y < sy1;
        const corner = Math.min(x, n - 1 - x) < 4 * s && Math.min(y, n - 1 - y) < 4 * s && Math.hypot(Math.min(x, n - 1 - x) - 4 * s, Math.min(y, n - 1 - y) - 4 * s) > 4 * s;
        // bevelled frame: lit top-left rim, shaded bottom-right rim, a dark lip round the screen and a soft inner shadow
        const lip = !inS && x >= sx0 - 1 && x <= sx1 && y >= sy0 - 1 && y <= sy1;
        const inner = inS && (x - sx0 < Math.max(1, s) || y - sy0 < Math.max(1, s));
        bg[y * n + x] = corner ? 0xff181818 : inS ? X.shade(X.dith8(x * 3, y * 5) > 0.92 ? X.shade(screen, 0.94) : screen, inner ? 0.86 : 1)
          : lip ? X.shade(frameCol, 0.62) : X.shade(frameCol, y < 3 * s || x < 3 * s ? 1.25 : y > n - 1 - 2 * s || x > n - 1 - 2 * s ? 0.78 : 1);
      }
      const modes = extra ? ['skyline', 'castle', 'meander', 'zigzag', 'mountains', 'houses', 'spiral'] : ['skyline', 'meander', 'mountains', 'spiral'];
      let path = [], pi = 0, px = 0, py = 0, state = 'draw', timer = 0, kl = 0, kr = 0, cyc = R.int(0, 3);
      if (extra) cyc = [0, 2, 4, 6][cyc];   // the same first picture as before, the new ones come between
      g.trait('First', modes[cyc % modes.length][0].toUpperCase() + modes[cyc % modes.length].slice(1));
      function plan() {
        ink.fill(0); path = []; pi = 0;
        const mode = modes[cyc++ % modes.length], q = Math.max(2, Math.round(3 * s));
        if (mode === 'skyline') {
          const gy = H - 4 * q; px = 2; py = gy; let x = 2;
          while (x < W - 6 * q) { const h = rng.int(3, 11) * q, w = rng.int(2, 5) * q; path.push([x, gy - h], [x + w, gy - h], [x + w, gy]); x += w; if (rng.bool(0.4)) { path.push([x + q, gy]); x += q; } }
          path.push([W - 3, gy]);
          const mx = rng.int(W * 0.15, W * 0.8) | 0, my = 4 * q; path.push([W - 3, my + 3 * q], [mx + 3 * q, my + 3 * q], [mx + 3 * q, my], [mx, my], [mx, my + 3 * q]);
        } else if (mode === 'meander') {
          px = 2; py = H / 2 | 0; const a = 3 * q, b = 2 * q;
          for (let row = 0; row < 3; row++) {
            const y0 = 4 * q + row * (H - 8 * q) / 3 | 0;
            if (row) path.push([px, y0]); else { px = 2; py = y0; }
            for (let x = 2; x + 2 * a < W - 2; x += a + b) path.push([x + a, y0], [x + a, y0 + a], [x + b, y0 + a], [x + b, y0 + b], [x + a + b - q, y0 + b], [x + a + b - q, y0 + 0], [x + a + b, y0]);
          }
        } else if (mode === 'mountains') {
          const gy = H - 3 * q; px = 2; py = gy; let x = 2;
          while (x < W - 4) { const h = rng.int(4, 16) * q, w = Math.min(h, W - 4 - x); path.push([x + w / 2 | 0, gy - Math.min(h, w) / 1 | 0], [x + w, gy]); x += w; }
          path.push([W - 3, gy]);
        } else if (mode === 'castle') {
          // a curtain wall with battlements between two square towers, and a gate
          const gy = H - 3 * q, wallH = 8 * q, tw = 5 * q; px = 2; py = gy; let x = 2;
          const tower = x0 => { path.push([x0, gy - wallH - 4 * q]); for (let k = 0; k < 2; k++) path.push([x0 + k * 2 * q + q, gy - wallH - 4 * q], [x0 + k * 2 * q + q, gy - wallH - 5 * q], [x0 + k * 2 * q + 2 * q, gy - wallH - 5 * q], [x0 + k * 2 * q + 2 * q, gy - wallH - 4 * q]); path.push([x0 + tw, gy - wallH - 4 * q], [x0 + tw, gy - wallH]); };
          path.push([x + 2 * q, gy]); x += 2 * q; tower(x); x += tw;
          const gate = (W / 2 | 0) - 2 * q, x2 = W - 4 * q - tw;
          while (x + 2 * q < x2) { path.push([x + q, gy - wallH], [x + q, gy - wallH - q], [x + 2 * q, gy - wallH - q], [x + 2 * q, gy - wallH]); x += 2 * q; }
          path.push([x2, gy - wallH]); tower(x2); path.push([x2 + tw, gy], [gate + 4 * q, gy], [gate + 4 * q, gy - 4 * q], [gate, gy - 4 * q], [gate, gy], [2, gy]);
        } else if (mode === 'zigzag') {
          // rows of saw teeth, each row a different pitch
          px = 2; py = 4 * q;
          for (let row = 0; row < 4; row++) {
            const gapY = (H - 8 * q) / 3, y0 = 4 * q + row * gapY + gapY * 0.6 | 0, p = (2 + row) * q, h = Math.min(p, gapY * 0.55) | 0;
            if (row) path.push([row & 1 ? W - 3 : 2, y0]);
            for (let k = 0; (k + 1) * p < W - 4; k++) { const x = row & 1 ? W - 3 - k * p : 2 + k * p; path.push([x + (row & 1 ? -p / 2 : p / 2), y0 - h], [x + (row & 1 ? -p : p), y0]); }
          }
        } else if (mode === 'houses') {
          // a street of little houses with pitched roofs, a chimney now and then
          const gy = H - 3 * q; px = 2; py = gy; let x = 2;
          while (x < W - 9 * q) {
            const w = rng.int(5, 8) * q, h = rng.int(4, 8) * q;
            path.push([x, gy - h], [x + w / 2 | 0, gy - h - (w / 2 | 0)]);
            if (rng.bool(0.5)) { const cx2 = x + (w * 0.7 | 0); path.push([cx2, gy - h - (w * 0.2 | 0)]); }
            path.push([x + w, gy - h], [x + w, gy], [x + w + q, gy]); x += w + q;
          }
          path.push([W - 3, gy]);
        } else {
          px = 2; py = 2; let l = 2, r = W - 3, t = 2, b = H - 3;
          path.push([r, t]); while (r - l > 2 * q && b - t > 2 * q) { path.push([r, b], [l, b]); t += q; path.push([l, t]); l += q; r -= q; path.push([r, t]); b -= q; }
        }
        path = path.map(([x, y]) => [Math.max(1, Math.min(W - 2, Math.round(x))), Math.max(1, Math.min(H - 2, Math.round(y)))]);
        px = Math.max(1, Math.min(W - 2, Math.round(px))); py = Math.max(1, Math.min(H - 2, Math.round(py)));
        state = 'draw';
      }
      plan();
      const ptr = pointer(g);
      let userIdle = 0;
      const knob = (cx, cy, a) => { X.disc(g, cx + s, cy + s, 5 * s, X.shade(frameCol, 0.6)); X.disc(g, cx, cy, 5 * s, X.rgb(240, 238, 230)); X.disc(g, cx, cy, 3 * s, X.rgb(220, 218, 210)); X.line(g, cx, cy, cx + Math.cos(a) * 4.5 * s, cy + Math.sin(a) * 4.5 * s, X.rgb(120, 120, 120)); };
      return (t, dt) => {
        let jx = 0, jy = 0;
        const p = ptr(dt, n);
        if (p.active) {
          const inside = p.x >= sx0 && p.x < sx1 && p.y >= sy0 && p.y < sy1;
          for (const [x, y] of p.taps) if (!(x >= sx0 && x < sx1 && y >= sy0 && y < sy1)) { state = 'shake'; timer = 2.2; rng = g.alt; }
          if (inside && state !== 'shake') {
            state = 'user'; userIdle = 0;
            // the knobs only turn one way at a time: across, then up or down
            let budget = 40 * s * dt;
            const tx = U.clamp(Math.round(p.x - sx0), 1, W - 2), ty = U.clamp(Math.round(p.y - sy0), 1, H - 2);
            while (budget-- > 0 && (px !== tx || py !== ty)) { if (px !== tx) { const sg = Math.sign(tx - px); px += sg; kl += 0.35 * sg; } else { const sg = Math.sign(ty - py); py += sg; kr += 0.35 * sg; } ink[py * W + px] = 1; }
          }
        } else if (state === 'user') { userIdle += dt; if (userIdle > 6) { state = 'hold'; timer = 1; } }
        if (state === 'draw') {
          let budget = 36 * s * dt;
          while (budget > 0 && pi < path.length) {
            const [tx, ty] = path[pi], dx = Math.sign(tx - px), dy = Math.sign(ty - py);
            if (!dx && !dy) { pi++; continue; }
            px += dx; py += dy; kl += dx * 0.35; kr += dy * 0.35; budget--;
            ink[py * W + px] = 1;
          }
          if (pi >= path.length) { state = 'hold'; timer = 5; }
        } else if (state === 'hold') { timer -= dt; if (timer <= 0) { state = 'shake'; timer = 2.2; } }
        else {
          timer -= dt; jx = Math.round(Math.sin(t * 40) * 1.5 * s); jy = Math.round(Math.cos(t * 33) * s);
          const k = 0.25 * (1 - timer / 2.2);
          for (let i = 0; i < ink.length; i++) if (ink[i] && rng() < k) ink[i] = 0;
          if (timer <= 0) plan();
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const X0 = Math.min(n - 1, Math.max(0, x - jx)), Y0 = Math.min(n - 1, Math.max(0, y - jy));
          let c = bg[Y0 * n + X0];
          const ix = X0 - sx0, iy = Y0 - sy0;
          if (ix >= 0 && ix < W && iy >= 0 && iy < H && (ink[iy * W + ix] || bold && (ix && ink[iy * W + ix - 1] || iy && ink[(iy - 1) * W + ix] || ix && iy && ink[(iy - 1) * W + ix - 1]))) c = inkc;
          d[y * n + x] = c;
        }
        // the stylus: a darker dot where the line is being drawn
        if (state === 'draw') X.put(g, sx0 + px + jx, sy0 + py + jy, 0xff303030);
        knob(14 * s + jx, n - 11 * s + jy, kl);
        knob(n - 14 * s + jx, n - 11 * s + jy, kr);
      };
    },
  });

  add({
    name: 'Kites', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Move the pointer to blow the wind left or right; click a kite to make it loop.',
    listens: 'The louder the room, the harder the wind blows; clap and a kite loops.',
    recipe: 'Diamond, delta and box kites ride a gusty sky on long sagging strings, their bow-knotted tails swinging behind them while small clouds drift past.',
    make(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R).n2, inks = X.inks(R, 6, 0.5);
      const skyI = R.int(0, 2), sky = [[X.rgb(40, 110, 200), X.rgb(110, 175, 235), X.rgb(200, 230, 245)], [X.rgb(60, 50, 120), X.rgb(220, 110, 120), X.rgb(255, 200, 140)], [X.rgb(30, 140, 170), X.rgb(120, 210, 210), X.rgb(240, 250, 230)]][skyI];
      g.trait('Sky', ['Noon', 'Dusk', 'Lagoon'][skyI]); g.trait('Palette', inkName(inks));
      // the ground they fly from: a green hill, autumn grass, snow, or a beach at the sea
      const ground = g.trait('Ground', g.home ? 'Meadow' : g.alt.pick(['Meadow', 'Meadow', 'Autumn', 'Snow', 'Beach']));
      const GC = { Meadow: [X.rgb(60, 130, 60), X.rgb(80, 160, 70)], Autumn: [X.rgb(150, 100, 40), X.rgb(190, 140, 60)], Snow: [X.rgb(210, 220, 236), X.rgb(240, 244, 250)], Beach: [X.rgb(214, 190, 130), X.rgb(236, 214, 160)] }[ground];
      const hill = Math.round(n * 0.9), bg = gradient(n, sky, 0, hill);
      for (let x = 0; x < n; x++) { const h = hill - Math.round(3 * s * Math.sin(x / n * 3 + 1)); for (let y = h; y < n; y++) bg[y * n + x] = (y - h) % 3 === 0 ? GC[0] : GC[1]; }
      if (ground === 'Beach') for (let x = 0; x < n; x++) { const h = hill - Math.round(3 * s * Math.sin(x / n * 3 + 1)), sea = Math.round(hill - 6 * s); for (let y = sea; y < h; y++) bg[y * n + x] = (x + y * 3) % 11 === 0 ? X.rgb(200, 236, 250) : X.rgb(40, 120, 190); }
      const clouds = Array.from({ length: R.int(3, 5) }, () => ({ x: R.range(0, n), y: R.range(0.06, 0.45) * n, w: R.range(8, 16) * s, v: R.range(1, 3) * s }));
      const nK = g.trait('Kites', R.int(3, 4)), kites = Array.from({ length: nK }, (_, i) => {
        const k = { kind: R.pick(['diamond', 'diamond', 'delta', 'box']), bx: n * (0.15 + 0.7 * (i + 0.5) / nK) + R.range(-5, 5) * s, by: n * R.range(0.18, 0.55), size: R.range(9, 13) * s, c1: inks[i % inks.length], c2: inks[(i + 3) % inks.length], ax: n * R.range(0.3, 0.7), seed: i * 7.3, tail: [] };
        for (let j = 0; j < 12; j++) k.tail.push({ x: k.bx, y: k.by + j * 2 * s, px: k.bx, py: k.by + j * 2 * s });
        return k;
      });
      const ptr = pointer(g);
      let gust = 0;
      // the strings are thin and catch the light: a pale tint over the sky rather than solid white
      const thread = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) d[y * n + x] = X.mixPk(d[y * n + x], WHITE, 0.62); };
      return (t, dt) => {
        const p = ptr(dt, n);
        const ear = hear(g), loud = ear ? ear.level : 0;
        // the room's loudness blows from one side for a while, then the other
        const blow = ear ? loud * 20 * s * (nz(t * 0.03, 42.5) >= 0 ? 1 : -1) : 0;
        gust += ((p.active ? (p.x / n - 0.5) * 16 * s : 0) + blow - gust) * Math.min(1, dt * 2);
        if (p.active) for (const [x, y] of p.taps) { const k = kites.reduce((a, b) => Math.hypot(b.bx - x, b.by - y) < Math.hypot(a.bx - x, a.by - y) ? b : a); k.loop = 1.2; }
        if (ear && ear.beats) { const free = kites.filter(k => !k.loop); if (free.length) free[g.alt.int(0, free.length - 1)].loop = 1.2; }
        d.set(bg);
        for (const c of clouds) {
          c.x += c.v * dt * (1 + 3 * loud); if (c.x - c.w > n) c.x = -c.w * 1.5;
          ellipse(g, c.x, c.y + s, c.w, c.w * 0.32, X.rgb(200, 210, 225));
          ellipse(g, c.x, c.y, c.w, c.w * 0.3, WHITE); ellipse(g, c.x - c.w * 0.3, c.y - c.w * 0.2, c.w * 0.45, c.w * 0.3, WHITE);
        }
        for (const k of kites) {
          k.loop = Math.max(0, (k.loop || 0) - dt);
          const wx = nz(t * 0.25, k.seed) * 6 * s + gust, wy = nz(k.seed, t * 0.3) * 4 * s * (1 + 1.5 * loud), x = k.bx + wx, y = k.by + wy, tilt = nz(t * 0.4, k.seed + 3) * 0.35 + gust * 0.03 + (k.loop ? (1.2 - k.loop) / 1.2 * TAU : 0), sz = k.size;
          // the string sags down to its flyer off the bottom of the frame
          let lx = x, ly = y;
          for (let j = 1; j <= 10; j++) { const u = j / 10, qx = x + (k.ax - x) * u, qy = y + (n + 4 - y) * u + Math.sin(Math.PI * u) * 6 * s; X.line(g, lx, ly, qx, qy, thread); lx = qx; ly = qy; }
          // tail: a short rope that trails downwind
          const tl = k.tail; tl[0].x = x; tl[0].y = y + sz;
          for (let j = 1; j < tl.length; j++) {
            const p = tl[j], vx = (p.x - p.px) * 0.9, vy = (p.y - p.py) * 0.9; p.px = p.x; p.py = p.y;
            p.x += vx + (-4 + wx * 0.2) * s * dt; p.y += vy + 30 * s * dt * dt * 12;
            const q = tl[j - 1], dx = p.x - q.x, dy = p.y - q.y, l = Math.hypot(dx, dy) || 1, seg = 2.2 * s;
            p.x = q.x + dx / l * seg; p.y = q.y + dy / l * seg;
            X.line(g, q.x, q.y, p.x, p.y, X.shade(k.c2, 0.7));
            if (j % 2 === 0) { X.put(g, p.x - 1, p.y, j % 4 ? k.c1 : k.c2); X.put(g, p.x + 1, p.y, j % 4 ? k.c1 : k.c2); }
          }
          const ca = Math.cos(tilt), sa = Math.sin(tilt), pt = (u, v) => [x + u * ca - v * sa, y + u * sa + v * ca];
          if (k.kind === 'diamond') {
            const N = pt(0, -sz * 1.2), E = pt(sz * 0.8, -sz * 0.3), S = pt(0, sz), W2 = pt(-sz * 0.8, -sz * 0.3), C = pt(0, -sz * 0.3);
            X.poly(g, [...N, ...E, ...C], k.c1); X.poly(g, [...E, ...S, ...C], k.c2); X.poly(g, [...S, ...W2, ...C], k.c1); X.poly(g, [...W2, ...N, ...C], k.c2);
            X.line(g, ...N, ...S, X.shade(k.c1, 0.4)); X.line(g, ...W2, ...E, X.shade(k.c1, 0.4));
          } else if (k.kind === 'delta') {
            const N = pt(0, -sz), L2 = pt(-sz * 1.2, sz * 0.6), R2 = pt(sz * 1.2, sz * 0.6), C = pt(0, sz * 0.4);
            X.poly(g, [...N, ...L2, ...C], k.c1); X.poly(g, [...N, ...C, ...R2], X.shade(k.c1, 0.8));
            X.poly(g, [...pt(-sz * 0.4, -sz * 0.1), ...pt(sz * 0.4, -sz * 0.1), ...pt(0, sz * 0.2)], k.c2);
          } else {
            for (const [v0, v1, c] of [[-sz, -sz * 0.3, k.c1], [sz * 0.3, sz, k.c2]]) X.poly(g, [...pt(-sz * 0.5, v0), ...pt(sz * 0.5, v0), ...pt(sz * 0.5, v1), ...pt(-sz * 0.5, v1)], c);
            X.line(g, ...pt(-sz * 0.5, -sz), ...pt(-sz * 0.5, sz), X.shade(k.c1, 0.4)); X.line(g, ...pt(sz * 0.5, -sz), ...pt(sz * 0.5, sz), X.shade(k.c1, 0.4));
          }
        }
      };
    },
  });

  add({
    name: 'Peg Board', seed: 2, sizes: [50], fps: 12,
    interactive: 'Click holes to light pegs (drag to paint); click a colour on the right to change pegs. Your pegs stay in the board.',
    recipe: 'A black board of holes filled peg by glowing peg, colour by colour, until a picture shines: a flower, an emblem, a creature, a word of the collection or its own remainder pattern. It holds, the pegs come out, and another begins. Or light it yourself.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), P3 = 3, cols = 14, rows = 15, ox = 2, oy = 3;
      const boardI = R.int(0, 2), board = [rgb(8, 8, 12), rgb(14, 8, 20), rgb(6, 12, 16)][boardI], hole = X.mixPk(board, WHITE, 0.08);
      g.trait('Board', ['Black', 'Plum', 'Ink'][boardI]);
      const h0 = R.range(0, 100), wheel = R.bool(0.5), inks = wheel ? Array.from({ length: 7 }, (_, i) => X.hsbPk(h0 + i * 100 / 7, 85, 100)) : [rgb(255, 50, 60), rgb(255, 150, 30), rgb(255, 230, 40), rgb(60, 240, 90), rgb(40, 200, 255), rgb(160, 90, 255), rgb(255, 255, 255)];
      g.trait('Pegs', wheel ? 'Wheel' : 'Classic');
      const glow = g.trait('Glow', g.home ? 'Soft' : g.alt.pick(['Soft', 'Soft', 'Bright', 'None'])), glowK = glow === 'Bright' ? 0.6 : glow === 'None' ? 0 : 0.35;
      const peg = new Uint8Array(cols * rows), want = new Uint8Array(cols * rows);
      const at = (i, j) => [ox + i * P3 + ((j & 1) ? 1 : 0), oy + j * P3];
      const WORDS = ['HUE', 'SKY', 'ZEN', 'JOY', 'POP', 'ORB', 'RAY', 'DOT'];
      function picture() {
        want.fill(0);
        const mode = R.pick(['flower', 'emblem', 'creature', 'word', 'field', 'rainbow']), c = () => R.int(1, inks.length);
        if (!g.traits.some(q => q[0] === 'First picture')) g.trait('First picture', mode[0].toUpperCase() + mode.slice(1));
        if (mode === 'flower') { const k = R.int(5, 7), cA = c(), cB = c(), mid = c(), sp = R() * TAU; for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const u = i - cols / 2 + 0.5, v = j - 6, r = Math.hypot(u, v), th = Math.atan2(v, u) + sp; if (r < 1.5) want[j * cols + i] = mid; else if (r < 5.2 * (0.6 + 0.4 * Math.abs(Math.cos(k * th / 2)))) want[j * cols + i] = Math.floor((th / TAU) * k * 2 + 100) % 2 ? cA : cB; else if (Math.abs(u) < 0.6 && v > 3) want[j * cols + i] = 4; } }
        else if (mode === 'emblem' || mode === 'creature') { const spr = X.mirrorSprite(R, 11, 11, mode === 'emblem' ? 0.6 : 0.5, 0.3), cA = c(), cB = c(); for (let j = 0; j < 11; j++) for (let i = 0; i < 11; i++) if (spr[j][i]) want[(j + 2) * cols + i + 1] = spr[j][i] === 2 ? cB : cA; }
        else if (mode === 'word') { const w = R.pick(WORDS); for (let k = 0; k < w.length; k++) { const glyph = F3[w[k]]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (glyph[r] >> (2 - b) & 1) want[(5 + r) * cols + 1 + k * 4 + b] = 1 + (k * 2 % inks.length); } for (let i = 0; i < cols; i++) { want[i + cols] = 7; want[(rows - 2) * cols + i] = 7; } }
        else if (mode === 'field') { const a = R.range(0.3, 1.2), sp = R.int(2, 5); for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const v = ((i + 1) * a * 10 % (j / sp + 1.5)); if (v < 1.4) want[j * cols + i] = 1 + Math.floor(v * 4) % inks.length; } }
        else { for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const r = Math.hypot(i - cols / 2, j - rows - 2); const band = Math.floor(r - 6); if (band >= 0 && band < inks.length) want[j * cols + i] = band + 1; } }
      }
      picture();
      let state = 'fill', timer = 0, fillOrder = [], fi = 0, brush = 1, idle = 0;
      const planFill = () => { fillOrder = []; for (let c = 1; c <= inks.length; c++) for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) if (want[j * cols + i] === c) fillOrder.push(j * cols + i); fi = 0; };
      planFill();
      // the opening frame already has the first picture under way
      { const k = Math.floor(fillOrder.length * 0.4); for (; fi < k; fi++) peg[fillOrder[fi]] = want[fillOrder[fi]]; }
      // pegs the viewers set stay in the board through every picture (the oldest of 90 come out first)
      const kept = new Uint8Array(cols * rows), keptOrder = [];
      const holeAt = (x, y) => { const j = U.clamp(Math.round((y - oy - 1) / P3), 0, rows - 1), i = U.clamp(Math.round((x - ox - 1 - ((j & 1) ? 1 : 0)) / P3), 0, cols - 1); return j * cols + i; };
      const keep = (h, v) => {
        if (kept[h] !== v) { if (!kept[h]) keptOrder.push(h); kept[h] = v; }
        while (keptOrder.length > 90) kept[keptOrder.shift()] = 0;
        peg[h] = v;
      };
      const palAt = k => [n - 4, 4 + k * 6, 3, 5];
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          idle = 0;
          for (const [x, y] of p.taps) {
            let tray = false;
            for (let k = 0; k < inks.length; k++) if (x >= n - 6 && Math.abs(y - (palAt(k)[1] + 2)) < 3) { brush = k + 1; tray = true; }
            if (!tray && x < n - 7) keep(holeAt(x, y), brush);
          }
          if (p.down && p.x < n - 7) keep(holeAt(p.x, p.y), brush);
          state = 'user';
        } else if (state === 'user') { idle += dt; if (idle > 6) { state = 'pull'; timer = 1.5; } }
        else if (state === 'fill') { const k = Math.max(1, Math.round(fillOrder.length / 10 * dt)); for (let q = 0; q < k && fi < fillOrder.length; q++, fi++) if (!kept[fillOrder[fi]]) peg[fillOrder[fi]] = want[fillOrder[fi]]; if (fi >= fillOrder.length) { state = 'hold'; timer = 3.5; } }
        else if (state === 'hold') { timer -= dt; if (timer <= 0) { state = 'pull'; timer = 1.5; } }
        else if (state === 'pull') { timer -= dt; for (let i = 0; i < peg.length; i++) if (peg[i] && R() < 0.1 && !kept[i]) peg[i] = 0; if (timer <= 0) { peg.set(kept); picture(); planFill(); state = 'fill'; } }
        d.fill(board);
        // glow under every lit peg, then holes, then pegs with a highlight
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const v = peg[j * cols + i]; if (!v) continue; if (!glowK) continue; const [x, y] = at(i, j), gc = X.mixPk(board, inks[v - 1], glowK); for (let dy = -1; dy <= 2; dy++) for (let dx = -1; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < n && yy < n && d[yy * n + xx] === board) d[yy * n + xx] = gc; } }
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const v = peg[j * cols + i], [x, y] = at(i, j);
          if (!v) { X.put(g, x, y, hole); X.put(g, x + 1, y + 1, hole); continue; }
          const c = inks[v - 1];
          X.rect(g, x, y, 2, 2, c); X.put(g, x, y, X.mixPk(c, WHITE, 0.6));
        }
        // the peg tray: one of each colour, the brush marked
        for (let k = 0; k < inks.length; k++) { const r = palAt(k); X.rect(g, r[0], r[1], 2, 2, inks[k]); if (k + 1 === brush && state === 'user') X.put(g, r[0] - 1, r[1], WHITE); }
      };
    },
  });

})();
