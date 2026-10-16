// Set 4 · Still Life: chunky pixel still lifes with a little life in them.
// Every object is drawn in flat cel-shaded tones (hard steps, no gradients) on
// a coarse grid, outlined in one dark ink, and the room around it is chosen
// from a set of designed colour schemes. Several respond to the pointer.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, K = U.K4, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Still Life' }, def));
  const { rgb, mixPk: mix, shade, put, line, rect } = X;
  const TAU = Math.PI * 2, hx = K.hx, T5 = c => K.tones(hx(c));

  // Rooms: wall, wall pattern, table top, table front, ink (outlines) and light
  const ROOMS = [
    { wall: '#2b2840', pat: '#35314f', top: '#9a6440', front: '#5e3a26', ink: '#120e18', light: '#ffe2a8' },
    { wall: '#1d3b3c', pat: '#244a4b', top: '#d6c4a0', front: '#8f7a5f', ink: '#0b1514', light: '#fff1c9' },
    { wall: '#5c2630', pat: '#6c2e39', top: '#2e2a38', front: '#1a1822', ink: '#12080b', light: '#ffd28c' },
    { wall: '#e8d9b8', pat: '#dbc89f', top: '#3f6a92', front: '#294a68', ink: '#1a1724', light: '#ffffff' },
    { wall: '#0f1a26', pat: '#152434', top: '#b8473b', front: '#7c2b24', ink: '#04070b', light: '#bfe0ff' },
    { wall: '#3a4c2c', pat: '#455a34', top: '#e3c063', front: '#a5852b', ink: '#13180d', light: '#fff4d0' },
    { wall: '#2a1f3d', pat: '#ff6f91', top: '#1b9aaa', front: '#106d78', ink: '#0d0918', light: '#fff0f5' },
  ].map((r, i) => Object.assign(Object.fromEntries(Object.entries(r).map(([k, v]) => [k, hx(v)])), { nm: ['Plum', 'Teal', 'Wine', 'Cream', 'Midnight', 'Olive', 'Candy'][i] }));
  // Traits: T names what a variation rolled; alt() rolls a new trait from g.alt (the opening variation keeps `home`)
  const T = (g, k, v) => (g.trait ? g.trait(k, v) : v);
  const alt = (g, home, opts) => { if (g.home) return home; let sum = 0; for (const o of opts) sum += o[1]; let r = g.alt() * sum; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };
  const CAP = w => w.charAt(0).toUpperCase() + w.slice(1);
  // wall (with one of several patterns) above `edge`, table below, a lit lip along the table edge
  function room(n, R, edge, rm) {
    const bg = new Uint32Array(n * n), kind = R.pick(['plain', 'stripes', 'dots', 'diamonds', 'panel', 'check']), step = R.pick([3, 4, 5]), cloth = R.bool(0.35), clothC = R.pick(ROOMS).top;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      let c;
      if (y < edge) {
        c = rm.wall;
        if (kind === 'stripes' && x % (step * 2) < step) c = rm.pat;
        else if (kind === 'dots' && x % step === 1 && y % step === 1 + ((x / step | 0) & 1)) c = rm.pat;
        else if (kind === 'diamonds' && (Math.abs(x % (step * 2) - step) + Math.abs(y % (step * 2) - step)) === step) c = rm.pat;
        else if (kind === 'panel' && y > edge * 0.62) c = y === Math.round(edge * 0.62) + 1 || x % (step * 3) === 0 ? rm.ink : rm.pat;
        else if (kind === 'check' && ((x / step | 0) + (y / step | 0)) & 1) c = rm.pat;
      } else if (y === edge) c = mix(rm.top, WHITE, 0.25);
      else if (edge >= 0 && y > n - Math.max(2, n / 14)) c = rm.front;
      else c = cloth && (((x >> 2) + ((y - edge) >> 1)) & 1) ? mix(rm.top, clothC, 0.5) : rm.top;
      bg[y * n + x] = c;
    }
    bg.wall = kind; bg.cloth = cloth;
    return bg;
  }
  // a flat cast shadow on the table, only over background cells
  function shadow(g, bg, cx, cy, rx, ry, k = 0.65) {
    K.ell(g, cx, cy, rx, ry, (x, y) => g.d[y * g.n + x] === bg[y * g.n + x] ? shade(bg[y * g.n + x], k) : 0);
  }
  const lightDir = (t, sp = 0.12, side = 0) => { const a = Math.sin(t * sp) * 0.9 + side; return [Math.sin(a) * 0.75, -0.55, 0.6]; };

  add({
    name: 'Fruit Bowl', seed: 4, sizes: [40, 50], fps: 12,
    interactive: 'Click a fruit to take it; click above the bowl to drop a new one in.',
    recipe: 'A heap of fruit in a bowl or basket, every piece cel-shaded in hard tones with one dark outline. The light swings slowly round it and a fly does its rounds. Click a fruit to take it, or above the bowl to drop another in.',
    make(R, U, g) {
      const { n, d } = g, rm = R.pick(ROOMS), edge = Math.round(n * R.range(0.42, 0.52)), bg = room(n, R, edge, rm), Lr = K.layer(n), s = n / 40;
      const basket = R.bool(0.3), bowlC = T5(R.pick(['#e9e4d8', '#3b78c2', '#d0703c', '#3f9a7a', '#c9a227', '#7b4fb0'])), band = R.bool(0.6) ? T5(R.pick(['#c23b3b', '#1b2a4a', '#f2d36b', '#ffffff'])) : null;
      const KINDS = {
        apple: () => ({ T: T5(R.pick(['#d4322c', '#83c240', '#e8862a'])), r: R.range(4.2, 5.2), sx: 1, sy: 0.92, stem: true, leaf: R.bool(0.6) }),
        orange: () => ({ T: T5('#f28a1e'), r: R.range(4.6, 5.4), sx: 1, sy: 1, dots: true }),
        lemon: () => ({ T: T5('#f4d23a'), r: R.range(3.6, 4.2), sx: 1.35, sy: 0.85, tips: true }),
        plum: () => ({ T: T5('#6b2f8a'), r: R.range(3.4, 4), sx: 1, sy: 1, stem: true }),
        pear: () => ({ T: T5(R.pick(['#b9c43c', '#d9a43a'])), r: R.range(4, 4.6), sx: 1, sy: 1, pear: true, stem: true }),
        grapes: () => ({ T: T5(R.pick(['#5a2d78', '#9ac54a'])), r: 4.5, grapes: Array.from({ length: 9 }, (_, k) => [((k % 3) - 1) * 0.55 + (k / 3 | 0) * 0.1, (k / 3 | 0) * 0.5 - 0.4]) }),
        banana: () => ({ T: T5('#f5d547'), r: 6, banana: R.sign() }),
        cherry: () => ({ T: T5('#c8102e'), r: 2, cherry: true }),
      };
      const mixKinds = R.shuffle(Object.keys(KINDS)).slice(0, R.int(3, 6));
      const cx = n / 2 + R.range(-2, 2) * s, rim = edge + (n - edge) * 0.42, bw = n * R.range(0.34, 0.42), depth = (n - edge) * R.range(0.35, 0.5);
      const fruit = [];
      const newFruit = (x, y, fall) => { const f = Object.assign(KINDS[R.pick(mixKinds)](), { x, y, vy: 0, fall }); f.r *= s; return f; };
      for (let k = 0, m = R.int(6, 10); k < m; k++) fruit.push(newFruit(cx + R.range(-0.75, 0.75) * bw, rim - R.range(0.5, 2.6) * 4 * s, false));
      fruit.sort((a, b) => a.y - b.y);
      T(g, 'Room', rm.nm); T(g, 'Wallpaper', CAP(bg.wall)); T(g, 'Vessel', basket ? 'Basket' : 'Bowl'); T(g, 'Fruit Kinds', mixKinds.length); T(g, 'Pieces', fruit.length);
      let fly = { x: n * 0.3, y: n * 0.3, a: 0 };
      function drawFruit(f, L) {
        const { x, y, r, T } = f;
        if (f.grapes) { for (const [a, b] of f.grapes) K.ell(Lr, x + a * r, y + b * r, 1.6 * s, 1.6 * s, (px, py, nx, ny) => K.cel(nx, ny, L, [T[0], T[1], T[2], T[3]])); return; }
        if (f.cherry) { for (const o of [-1.4, 1.4]) { K.ell(Lr, x + o * s, y, r, r, (px, py, nx, ny) => K.cel(nx, ny, L, [T[0], T[1], T[2], T[4]])); line(Lr, x + o * s, y - r, x, y - r - 3 * s, hx('#4a7a2a')); } return; }
        if (f.banana) { for (let k = 0; k < 9; k++) { const u = k / 8, bx = x + (u - 0.5) * r * 2 * f.banana, by = y - Math.sin(u * Math.PI) * r * 0.5; K.ell(Lr, bx, by, 1.4 * s, 1.4 * s, (px, py, nx, ny) => ny < -0.3 ? T[3] : ny > 0.4 ? T[1] : T[2]); } put(Lr, x - r * f.banana, y, hx('#3a2a14')); return; }
        if (f.pear) { K.ell(Lr, x, y - r * 0.9, r * 0.6, r * 0.7, (px, py, nx, ny) => K.cel(nx, ny, L, [T[0], T[1], T[2], T[3]])); }
        K.ell(Lr, x, y, r * f.sx, r * f.sy, (px, py, nx, ny) => K.cel(nx, ny, L, [T[0], T[1], T[2], T[3]]));
        if (f.dots) for (let k = 0; k < 4; k++) put(Lr, x + Math.cos(k * 2.1) * r * 0.45, y + Math.sin(k * 2.7) * r * 0.45, T[1]);
        if (f.tips) { put(Lr, x - r * 1.35, y, T[1]); put(Lr, x + r * 1.35 - 1, y, T[1]); }
        if (f.stem) { const top = y - r * (f.pear ? 1.6 : 0.95); line(Lr, x, top, x + 1, top - 2 * s, hx('#4a3016')); if (f.leaf) K.ell(Lr, x + 2.2 * s, top - 1.2 * s, 1.6 * s, 0.9 * s, hx('#4e9a2c')); }
      }
      const frame = (t) => {
        const L = lightDir(t, 0.1);
        // taps: take a fruit, or drop one in from above
        for (const tp of g.input.taps()) {
          const px = tp.x * n, py = tp.y * n;
          let hit = -1;
          fruit.forEach((f, k) => { if (Math.hypot(px - f.x, py - f.y) < f.r * 1.3 && !f.fall) hit = k; });
          if (hit >= 0) fruit.splice(hit, 1);
          else if (fruit.length < 18) fruit.push(newFruit(Math.max(cx - bw * 0.8, Math.min(cx + bw * 0.8, px)), Math.min(py, rim - 6 * s), true));
        }
        for (const f of fruit) if (f.fall) {
          const floor = rim - 2 * s - fruit.filter(o => o !== f && !o.fall && Math.abs(o.x - f.x) < (o.r + f.r) * 0.8).length * 2.5 * s;
          f.vy += 0.5 * s; f.y += f.vy; if (f.y >= floor) { f.y = floor; f.fall = false; fruit.sort((a, b) => (a.fall - b.fall) || a.y - b.y); }
        }
        d.set(bg);
        shadow(g, bg, cx - L[0] * 4 * s, rim + depth * 0.95, bw * 1.05, 3 * s);
        // back of the bowl, fruit, then the front of the bowl over them
        if (!basket) { K.ell(Lr, cx, rim, bw, 2.2 * s, bowlC[0]); K.commit(g, Lr, rm.ink); }
        for (const f of fruit) { drawFruit(f, L); K.commit(g, Lr, rm.ink); }
        if (basket) {
          for (let y = Math.round(rim - 1); y < rim + depth; y++) {
            const v = (y - rim) / depth, w = bw * (1 - 0.25 * v * v);
            for (let x = Math.round(cx - w); x < cx + w; x++) Lr.d[y * n + x] = ((x + (y >> 1)) & 3) === 0 ? hx('#5a3a1a') : ((y & 1) ? hx('#b07a3a') : hx('#c89048'));
          }
        } else K.ell(Lr, cx, rim, bw, depth, (x, y, nx, ny) => ny < 0 ? 0 : band && ny > 0.25 && ny < 0.45 ? band[2] : K.cel(nx, ny * 0.6, L, [bowlC[0], bowlC[1], bowlC[2], bowlC[3]]));
        rect(Lr, cx - bw * 0.3, rim + depth - 1, bw * 0.6, 1.5 * s, bowlC[1]);
        K.commit(g, Lr, rm.ink);
        // the fly
        fly.a += R.range(-0.8, 0.8); fly.x += Math.cos(fly.a) * 0.7 * s; fly.y += Math.sin(fly.a) * 0.5 * s;
        if (fly.x < 2 || fly.x > n - 3 || fly.y < 2 || fly.y > rim) fly.a += Math.PI;
        fly.x = Math.max(1, Math.min(n - 2, fly.x)); fly.y = Math.max(1, Math.min(n - 2, fly.y));
        put(g, fly.x, fly.y, rm.ink); if ((t * 20 | 0) & 1) put(g, fly.x + 1, fly.y - 1, mix(rm.ink, WHITE, 0.6));
      };
      return frame;
    },
  });

  add({
    name: 'Morning Coffee', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click the cup to stir it.',
    recipe: 'A cup of coffee seen from the side or from above, drawn big in flat tones: mugs, tea cups, espresso cups and glasses of latte, patterned or plain, with spoon, sugar and a biscuit. Steam curls up in pixels, and a click stirs it.',
    make(R, U, g) {
      const { n, d } = g, rm = R.pick(ROOMS), s = n / 40, Lr = K.layer(n), top = R.bool(0.4);
      const cupC = T5(R.pick(['#f2efe6', '#e04a3f', '#2f6db5', '#f2c230', '#2e9c7a', '#1d1d24', '#e889b5'])), pat = R.pick(['none', 'band', 'stripes', 'dots', 'hearts']), patC = hx(R.pick(['#1b2a4a', '#ffffff', '#c23b3b', '#f2d36b']));
      const drink = R.pick(['black', 'latte', 'latte', 'tea', 'cocoa']), liquid = hx({ black: '#2a160c', latte: '#b07a46', tea: '#a5521c', cocoa: '#5c3220' }[drink]), crema = hx(drink === 'black' ? '#7a4a2a' : '#f2e3c8');
      const art = R.pick(['heart', 'rosetta', 'ring']), extra = R.pick(['spoon', 'sugar', 'biscuit', 'none']);
      let stir = 0, swirl = R.range(0, TAU);
      T(g, 'Room', rm.nm); T(g, 'View', top ? 'From Above' : 'Side'); T(g, 'Drink', CAP(drink)); T(g, 'Pattern', CAP(pat)); T(g, 'With', extra === 'none' ? 'Nothing' : CAP(extra));
      if (top) {
        const bg = room(n, R, -1, rm), cx = n / 2, cy = n / 2, r = n * R.range(0.28, 0.33);
        return (t) => {
          for (const tp of g.input.taps()) if (Math.hypot(tp.x * n - cx, tp.y * n - cy) < r * 1.6) stir = 1;
          stir *= 0.97; swirl += 0.02 + stir * 0.35;
          d.set(bg);
          shadow(g, bg, cx + 2 * s, cy + 2 * s, r * 1.75, r * 1.75, 0.7);
          K.ell(Lr, cx, cy, r * 1.7, r * 1.7, (x, y, nx, ny) => nx * nx + ny * ny > 0.8 ? cupC[1] : cupC[3]); K.commit(g, Lr, rm.ink);      // saucer
          K.ell(Lr, cx, cy, r * 1.12, r * 1.12, (x, y, nx, ny) => nx * nx + ny * ny > 0.72 ? (pat !== 'none' && ((Math.atan2(ny, nx) * 6 / Math.PI | 0) & 1) ? patC : cupC[2]) : 0);
          // handle
          K.ell(Lr, cx + r * 1.35, cy, r * 0.32, r * 0.2, cupC[1]);
          K.ell(Lr, cx, cy, r, r, (x, y, nx, ny) => {
            const rr = Math.hypot(nx, ny), a = Math.atan2(ny, nx) + swirl * (1 - rr);
            const ux = Math.cos(a) * rr, uy = Math.sin(a) * rr;
            if (drink === 'black' || drink === 'tea') return rr > 0.82 ? crema : (rr < 0.25 && ((x + y) & 1) && drink === 'black') ? mix(liquid, crema, 0.3) : liquid;
            let f = false;
            if (art === 'heart') { const hx2 = ux * 1.6, hy = -uy * 1.6 + 0.3; f = Math.pow(hx2 * hx2 + hy * hy - 1, 3) - hx2 * hx2 * hy * hy * hy < 0; }
            else if (art === 'rosetta') f = Math.abs(ux) < 0.55 - Math.abs(uy) * 0.4 && ((Math.floor((uy + 1) * 6)) & 1) || Math.abs(ux) < 0.08;
            else f = Math.abs(rr - 0.45) < 0.12 || rr < 0.12;
            return f ? crema : rr > 0.9 ? shade(liquid, 0.8) : liquid;
          });
          K.commit(g, Lr, rm.ink);
          if (extra === 'spoon') { K.thick(Lr, cx + r * 1.3, cy + r * 1.1, cx + r * 2.1, cy + r * 1.9, 1, hx('#c9ced6')); K.ell(Lr, cx + r * 1.15, cy + r * 0.95, 1.6 * s, 1.1 * s, hx('#e3e7ee')); K.commit(g, Lr, rm.ink); }
          if (extra === 'sugar') for (let k = 0; k < 2; k++) { rect(Lr, cx - r * 1.9 + k * 3.4 * s, cy + r * 1.3, 2.6 * s, 2.6 * s, WHITE); rect(Lr, cx - r * 1.9 + k * 3.4 * s, cy + r * 1.3 + 2.6 * s - 1, 2.6 * s, 1, hx('#cfd6dd')); K.commit(g, Lr, rm.ink); }
          if (extra === 'biscuit') { K.ell(Lr, cx - r * 1.55, cy - r * 1.45, 3.3 * s, 3.3 * s, (x, y) => K.hash(x, y, 3) < 0.15 ? hx('#7a4a1a') : hx('#d49a4a')); K.commit(g, Lr, rm.ink); }
        };
      }
      const edge = Math.round(n * 0.6), bg = room(n, R, edge, rm), mug = R.pick(['mug', 'teacup', 'espresso', 'glass']);
      T(g, 'Cup', { mug: 'Mug', teacup: 'Teacup', espresso: 'Espresso', glass: 'Glass' }[mug]);
      const cx = n * R.range(0.42, 0.5), base = edge + (n - edge) * 0.55, h = { mug: 0.42, teacup: 0.27, espresso: 0.22, glass: 0.5 }[mug] * n, w = { mug: 0.2, teacup: 0.24, espresso: 0.14, glass: 0.15 }[mug] * n;
      const prof = v => mug === 'teacup' ? w * (1 - 0.35 * v * v) : mug === 'glass' ? w * (0.85 + 0.15 * (1 - v)) : mug === 'espresso' ? w * (1 - 0.2 * v) : w;
      const steam = Array.from({ length: 3 }, (_, k) => ({ x: cx + (k - 1) * w * 0.45, ph: R.range(0, TAU) }));
      return (t) => {
        for (const tp of g.input.taps()) if (Math.abs(tp.x * n - cx) < w * 1.5) stir = 1;
        stir *= 0.97;
        const L = lightDir(t, 0.08, -0.4);
        d.set(bg);
        shadow(g, bg, cx + 3 * s, base + 0.5, w * 2.1, 2 * s);
        if (mug !== 'glass') { K.ell(Lr, cx, base, w * 1.9, 1.6 * s, (x, y, nx, ny) => ny < -0.3 ? cupC[3] : cupC[1]); K.commit(g, Lr, rm.ink); }
        // handle, body, then the liquid seen at the rim
        const hy = base - h * 0.55;
        K.ell(Lr, cx + prof(0.5) + 1.5 * s, hy, 2.8 * s, h * 0.24, (x, y, nx, ny) => nx * nx + ny * ny > 0.35 ? cupC[1] : 0); K.commit(g, Lr, rm.ink);
        if (mug === 'glass') {
          for (let y = Math.round(base - h); y < base; y++) {
            const v = (y - (base - h)) / h, r = prof(v), layerC = v < 0.25 ? crema : v < 0.55 ? hx('#c8945a') : liquid;
            for (let x = Math.round(cx - r); x < cx + r; x++) Lr.d[y * n + x] = Math.abs(x + 0.5 - (cx - r * 0.55)) < 0.7 ? mix(layerC, WHITE, 0.55) : layerC;
          }
        } else {
          K.lathe(Lr, cx, base - h, base, prof, cupC, -0.6);
          if (pat !== 'none') for (let y = Math.round(base - h); y < base; y++) {
            const v = (y - (base - h)) / h, r = prof(v);
            for (let x = Math.round(cx - r); x < cx + r; x++) {
              const on = pat === 'band' ? v > 0.35 && v < 0.5 : pat === 'stripes' ? ((x - Math.round(cx - r)) % 4) < 1 : pat === 'dots' ? (x % 4 === 1 && y % 4 === ((x >> 2) & 1) * 2) : (v > 0.4 && v < 0.65 && Math.abs(x - cx) < 2 && (y & 1));
              if (on) Lr.d[y * n + x] = x < cx ? patC : shade(patC, 0.75);
            }
          }
        }
        K.ell(Lr, cx, base - h, prof(0) * 0.98, 1.4 * s, (x, y, nx) => Math.abs(nx) > 0.8 ? cupC[1] : (stir > 0.1 && ((x + (t * 10 | 0)) % 3 === 0)) ? crema : (drink === 'black' ? liquid : crema));
        K.commit(g, Lr, rm.ink);
        if (extra === 'spoon') { K.thick(Lr, cx - w * 0.3, base - h - 6 * s + Math.sin(t * 4) * stir * 2, cx + w * 0.1, base - h + 1, 1, hx('#c9ced6')); K.commit(g, Lr, rm.ink); }
        if (extra === 'biscuit' || extra === 'sugar') { const bx = cx - w * 2.6; K.ell(Lr, bx, base - 1.5 * s, 3.2 * s, 1.8 * s, (x, y, nx, ny) => extra === 'sugar' ? (ny < 0 ? WHITE : hx('#cfd6dd')) : K.hash(x, y, 4) < 0.2 ? hx('#7a4a1a') : hx('#d49a4a')); K.commit(g, Lr, rm.ink); }
        // steam: three wisps of single cells, curling and thinning as they rise
        const sc = mix(rm.wall, WHITE, 0.55);
        for (const st of steam) for (let k = 0; k < 14; k++) {
          const y = base - h - 2 - k * 1.2 * s, x = st.x + Math.sin(t * 1.4 + st.ph + k * 0.45) * (1 + k * 0.18) * s;
          if (y < 0 || K.hash(k, (t * 6 | 0), st.ph * 10) < k / 18) continue;
          put(g, x, y, k > 8 ? mix(d[(y | 0) * n + (x | 0)] || sc, sc, 0.5) : sc);
        }
      };
    },
  });

  add({
    name: 'Desk at Night', seed: 3, sizes: [40, 50], fps: 12,
    interactive: 'Click the lamp to switch it off and on.',
    recipe: 'A desk in a dark room. A lamp throws a hard-edged pool of light onto the paper, where a pen writes line after line; books, a mug and a plant sit at the edge of the light, and a window shows the night. Click the lamp to switch it.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), edge = Math.round(n * 0.56);
      const warm = R.pick(['#ffd27a', '#fff1c9', '#9fe7ff', '#ffb36b', '#c4ffb0']), lampC = T5(R.pick(['#2f5f9e', '#c23b3b', '#2e9c7a', '#1d1d24', '#e0b030', '#e889b5']));
      const wall = hx(R.pick(['#141826', '#1b1424', '#10201c', '#201812'])), deskC = hx(R.pick(['#5a3420', '#3a2a22', '#24303c', '#4a3a28'])), ink = hx('#05060a');
      const right = R.bool(), lampX = right ? n * 0.78 : n * 0.22, paperX = n * 0.5 + (right ? -3 : 3) * s, paperY = edge + (n - edge) * 0.45, pw = 9 * s, ph = 5.5 * s;
      const win = { x: right ? n * 0.08 : n * 0.58, y: n * 0.08, w: n * 0.34, h: n * 0.3 }, moon = R.bool(0.7), city = R.bool(0.5);
      const books = Array.from({ length: R.int(3, 6) }, () => ({ w: R.int(2, 3) * s, h: R.int(7, 12) * s, c: T5(R.pick(['#c23b3b', '#2f6db5', '#e0b030', '#2e9c7a', '#7b4fb0', '#e8e0d0'])) }));
      const stars = Array.from({ length: 12 }, () => [R.range(0, 1), R.range(0, 1)]);
      let on = true, line0 = 0;
      T(g, 'Lamp', ['Blue', 'Red', 'Green', 'Black', 'Brass', 'Pink'][['#2f5f9e', '#c23b3b', '#2e9c7a', '#1d1d24', '#e0b030', '#e889b5'].map(hx).indexOf(lampC[2])]);
      T(g, 'Bulb', { '#ffd27a': 'Warm', '#fff1c9': 'White', '#9fe7ff': 'Cool', '#ffb36b': 'Amber', '#c4ffb0': 'Green' }[warm]);
      T(g, 'Books', books.length);
      // new traits: the weather in the window, and what else is on the desk
      const lampK = T(g, 'Lamp Type', alt(g, 'Anglepoise', [['Anglepoise', 3], ['Banker', 1.2], ['Candle', 1]]));
      const wx = T(g, 'Outside', alt(g, moon ? 'Moonlit' : 'Starry', [[moon ? 'Moonlit' : 'Starry', 3], ['Rain', 1], ['Snow', 1], ['Aurora', 0.5]])), extra = T(g, 'Desk', alt(g, 'Tidy', [['Tidy', 3], ['Plant', 1], ['Cat', 0.7], ['Globe', 0.8]]));
      return (t) => {
        for (const tp of g.input.taps()) if (Math.abs(tp.x * n - lampX) < 7 * s && tp.y * n < edge + 2 * s) on = !on;
        const k = on ? 1 : 0;
        // room
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y < edge ? wall : y === edge ? shade(deskC, 1.3) : deskC;
        // window
        rect(g, win.x - 1, win.y - 1, win.w + 2, win.h + 2, ink);
        rect(g, win.x, win.y, win.w, win.h, hx('#0b1a3a'));
        for (const [a, b] of stars) if (K.hash(a * 99, b * 99, t * 2 | 0) > 0.15) put(g, win.x + a * win.w, win.y + b * win.h * 0.7, hx('#cfe0ff'));
        if (moon) { K.ell(g, win.x + win.w * 0.7, win.y + win.h * 0.3, 2.2 * s, 2.2 * s, hx('#f4f0d8')); K.ell(g, win.x + win.w * 0.7 + 1.2 * s, win.y + win.h * 0.3 - 0.5 * s, 2 * s, 2 * s, hx('#0b1a3a')); }
        if (city) for (let x = 0; x < win.w; x += 2) { const bh = (K.hash(x, 7) * win.h * 0.5) | 0; rect(g, win.x + x, win.y + win.h - bh, 2, bh, hx('#131c30')); if (K.hash(x, 9, t | 0) > 0.6) put(g, win.x + x, win.y + win.h - bh + 2, hx('#ffd27a')); }
        // the weather in the window
        if (wx === 'Rain') for (let k = 0; k < 14; k++) { const x0 = win.x + K.hash(k, 3) * win.w, y0 = win.y + ((K.hash(k, 4) * win.h + t * 9) % win.h); for (let q = 0; q < 2; q++) if (y0 + q < win.y + win.h) put(g, x0 - q * 0.5, y0 + q, hx('#5a7ab0')); }
        else if (wx === 'Snow') for (let k = 0; k < 16; k++) put(g, win.x + ((K.hash(k, 3) * win.w + Math.sin(t * 0.8 + k) * 1.2) % win.w), win.y + ((K.hash(k, 4) * win.h + t * 2.2) % win.h), hx('#e8eef8'));
        else if (wx === 'Aurora') for (let x = 0; x < win.w; x++) { const y0 = win.y + win.h * (0.22 + 0.1 * Math.sin(x * 0.4 + t * 0.3)); for (let q = 0; q < 3 * s; q++) put(g, win.x + x, y0 + q, mix(hx('#0b1a3a'), hx(q < s ? '#8affb0' : '#3ab08a'), 0.75 - q / (6 * s))); }
        rect(g, win.x + win.w / 2 - 0.5, win.y, 1, win.h, ink); rect(g, win.x, win.y + win.h / 2, win.w, 1, ink);
        // the pool of light: stepped, hard-edged rings on wall and desk
        if (on) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = (x + 0.5 - paperX) / (n * 0.48), dy = (y + 0.5 - paperY) / (n * 0.3), r = Math.hypot(dx, dy);
          if (r < 1) { const i = y * n + x; d[i] = mix(d[i], hx(warm), r < 0.4 ? 0.5 : r < 0.7 ? 0.3 : 0.14); }
        }
        // books at the back
        let bx = right ? n * 0.06 : n * 0.68;
        for (const b of books) { rect(Lr, bx, edge - b.h + 2, b.w, b.h, b.c[on ? 2 : 1]); rect(Lr, bx, edge - b.h + 4, b.w, 1, b.c[4]); bx += b.w + 0.01; K.commit(g, Lr, ink); }
        // paper, writing, pen
        rect(Lr, paperX - pw / 2, paperY - ph / 2, pw, ph, on ? hx('#f6f1e4') : hx('#6c6a64')); K.commit(g, Lr, ink);
        const per = 9, step = (t * 6 | 0), lines = Math.max(1, Math.floor(ph / 2) - 1), cur = (step / per | 0) % (lines + 2);
        if (cur === 0) line0 = (line0 + 1) % 100;
        let px = paperX - pw / 2 + 1, py = paperY - ph / 2 + 1;
        for (let l = 0; l < lines; l++) {
          const len = l < cur ? pw - 2 : l === cur ? (step % per) / per * (pw - 2) : 0;
          for (let x = 0; x < len; x++) if (K.hash(x, l, line0) > 0.25) put(g, paperX - pw / 2 + 1 + x, paperY - ph / 2 + 1 + l * 2, hx('#2a3a6a'));
          if (l === cur) { px = paperX - pw / 2 + 1 + len; py = paperY - ph / 2 + 1 + l * 2; }
        }
        K.thick(Lr, px, py, px + 3 * s, py - 3 * s, 1, hx('#d23b3b')); put(Lr, px, py, hx('#e0b030')); K.commit(g, Lr, ink);
        // the extra thing on the desk: a plant or a globe at the back, a sleeping cat at the front
        { const ex = right ? n * 0.36 : n * 0.64, dim = c => on ? c : shade(c, 0.55);
          if (extra === 'Plant') { rect(Lr, ex - 1.5 * s, edge - 2 * s, 3 * s, 3 * s, dim(hx('#c0603a'))); for (let k = 0; k < 4; k++) K.ell(Lr, ex + (k - 1.5) * 1.3 * s, edge - 4 * s - (k % 2) * 1.5 * s, 1.1 * s, 2 * s, dim(hx(k & 1 ? '#3f8a2a' : '#5cae3a'))); K.commit(g, Lr, ink); }
          if (extra === 'Globe') { K.ell(Lr, ex, edge - 4 * s, 2.6 * s, 2.6 * s, (x, y) => dim(K.hash(x >> 1, y >> 1, 3) < 0.4 ? hx('#5cae3a') : hx('#3a7ad8'))); rect(Lr, ex - 0.5, edge - 1.5 * s, 1, 1.5 * s, dim(hx('#c9a227'))); rect(Lr, ex - 1.5 * s, edge, 3 * s, 1, dim(hx('#c9a227'))); K.commit(g, Lr, ink); }
          if (extra === 'Cat') { const cx2 = right ? n * 0.28 : n * 0.72, cy2 = n - 3 * s, breathe = Math.sin(t * 2) > 0.3 ? 0.3 : 0; K.ell(Lr, cx2, cy2, 4 * s, (1.7 + breathe) * s, dim(hx('#3a3a44'))); K.ell(Lr, cx2 + (right ? -3.4 : 3.4) * s, cy2 - 0.6 * s, 1.6 * s, 1.4 * s, dim(hx('#3a3a44'))); put(Lr, cx2 + (right ? -4.2 : 4.2) * s, cy2 - 2 * s, dim(hx('#3a3a44'))); put(Lr, cx2 + (right ? -2.8 : 2.8) * s, cy2 - 2 * s, dim(hx('#3a3a44'))); K.commit(g, Lr, ink); }
        }
        // mug
        const mx = right ? n * 0.2 : n * 0.8;
        K.lathe(Lr, mx, edge + 1, edge + 6 * s, () => 2.2 * s, K.tones(hx('#e8e4da')).map(c => on ? c : shade(c, 0.55)), right ? 0.6 : -0.6);
        K.ell(Lr, mx + (right ? -2.8 : 2.8) * s, edge + 3.5 * s, 1.2 * s, 1.5 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.3 ? hx(on ? '#d0ccc2' : '#6e6c66') : 0);
        K.commit(g, Lr, ink);
        // the lamp: base, two arm segments, the shade, the bulb
        const bxL = lampX, by = edge + 2 * s, ex = lampX + (right ? -5 : 5) * s, ey = edge - 9 * s, hx2 = ex + (right ? -4 : 4) * s, hy = edge - 6 * s;
        if (lampK === 'Banker') {
          // a banker's lamp: a brass stem and a long half-round glass shade
          K.ell(Lr, bxL, by, 3.5 * s, 1.3 * s, hx('#a8861a')); rect(Lr, bxL - 0.5, edge - 6 * s, Math.max(1, s), 7 * s, hx('#c9a227'));
          K.ell(Lr, bxL, edge - 6 * s, 5 * s, 2.2 * s, (x, y, nx, ny) => ny > 0.1 ? 0 : ny < -0.5 ? lampC[3] : lampC[2]);
        } else if (lampK === 'Candle') {
          // a candle in a brass stick
          K.ell(Lr, bxL, by, 3 * s, 1.1 * s, hx('#c9a227')); rect(Lr, bxL - 0.5 * s, edge - 2 * s, s, 3 * s, hx('#c9a227')); rect(Lr, bxL - s, edge - 8 * s, 2 * s, 6 * s, hx('#f2ece0')); rect(Lr, bxL - s, edge - 8 * s, Math.max(1, s), 6 * s, hx('#d8d0c0'));
        } else {
          K.ell(Lr, bxL, by, 3.5 * s, 1.3 * s, lampC[1]);
          K.thick(Lr, bxL, by, ex, ey, Math.max(1, s | 0), lampC[2]); K.thick(Lr, ex, ey, hx2, hy, Math.max(1, s | 0), lampC[2]);
          K.ell(Lr, hx2, hy, 3.4 * s, 2.4 * s, (x, y, nx, ny) => ny > 0.35 ? 0 : ny < -0.4 ? lampC[3] : lampC[2]);
        }
        K.commit(g, Lr, ink);
        if (on && lampK === 'Anglepoise') { rect(g, hx2 - 1.5 * s, hy + 0.6 * s, 3 * s, 1, hx(warm)); K.glow(g, hx2, hy + s, 3 * s, hx(warm), 2, 0.5); }
        if (on && lampK === 'Banker') { rect(g, bxL - 3 * s, edge - 5.6 * s, 6 * s, 1, hx(warm)); K.glow(g, bxL, edge - 4.5 * s, 4 * s, hx(warm), 2, 0.45); }
        if (on && lampK === 'Candle') { const fy = edge - 8 * s, fl = (t * 8 | 0) & 1; K.glow(g, bxL, fy - 2 * s, 5 * s, hx(warm), 3, 0.4); rect(g, bxL - 0.5 * s, fy - 3 * s + fl, Math.max(1, s), 3 * s - fl, hx('#ffb02a')); put(g, bxL, fy - 2 * s, hx('#fff4c0')); }
      };
    },
  });

  add({
    name: 'Bottles', seed: 1, sizes: [40, 50], fps: 12,
    recipe: 'Coloured glass bottles on a window sill against the sky. The glass tints whatever is behind it, a bright stripe runs down each lit side, and each one lays a coloured pool on the sill. The sky outside goes round from morning to night.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), sill = Math.round(n * R.range(0.68, 0.76)), ink = hx('#151320');
      const SH = {
        wine: v => v < 0.35 ? 1.1 + v * 0.6 : 3.2, flask: v => v < 0.4 ? 1.2 : 1.2 + (v - 0.4) * 6.5, jar: v => v < 0.12 ? 2.8 : 3.4, potion: v => v < 0.3 ? 1 : 3.6 * Math.sin(Math.min(1, (v - 0.3) / 0.7 * 1.6) * Math.PI * 0.62 + 0.3),
        vase: v => 1.6 + 2 * Math.sin(v * Math.PI * 0.95), cola: v => v < 0.3 ? 1.1 + v * 3 : 2.2 + 0.4 * Math.sin(v * 9), carafe: v => v < 0.25 ? 1.3 : 1.3 + (v - 0.25) * 5,
      };
      const GLASS = ['#3fb4d8', '#2e9c5a', '#d8483a', '#e0b030', '#7b4fb0', '#e889b5', '#2f6db5', '#a8e0d0', '#f08a2a'];
      const m = R.int(3, 6), gap = n / (m + 0.5), bottles = Array.from({ length: m }, (_, k) => ({ x: gap * (k + 0.75) + R.range(-1, 1) * s, h: R.range(0.3, 0.52) * n, prof: SH[R.pick(Object.keys(SH))], c: hx(R.pick(GLASS)), sc: R.range(0.85, 1.25) * s }));
      const SKIES = [['#7ec8f0', '#a8dcf5', '#d6efff'], ['#ff9a6b', '#ffc48a', '#ffe0a8'], ['#1c2550', '#3b3f80', '#7a5aa0'], ['#5aa0d0', '#9ac8e0', '#e6f0f0'], ['#2b2f3a', '#46505e', '#6c7684']];
      const wall = hx(R.pick(['#e8dcc0', '#2a2f4a', '#3a2a24', '#d0d8d0'])), sillC = T5(R.pick(['#f2efe6', '#9a6440', '#6a7a8a'])), frameC = hx(R.pick(['#f2efe6', '#2a2a30', '#5a7a5a']));
      const wx0 = n * 0.06, wx1 = n * 0.94, wy0 = n * 0.06;
      T(g, 'Bottles', m); T(g, 'Sill', ['White', 'Oak', 'Slate'][['#f2efe6', '#9a6440', '#6a7a8a'].map(hx).indexOf(sillC[2])]); T(g, 'Wall', ['Cream', 'Navy', 'Brown', 'Sage'][['#e8dcc0', '#2a2f4a', '#3a2a24', '#d0d8d0'].map(hx).indexOf(wall)]);
      // new traits: how the bottles stand, what is in them, and the view behind
      const arr = T(g, 'Arrangement', alt(g, 'Row', [['Row', 3], ['Huddle', 1], ['Tall and Short', 1]])), fill = T(g, 'Contents', alt(g, 'Empty', [['Empty', 3], ['Flowers', 1], ['Messages', 0.7]])), view = T(g, 'View', alt(g, 'Hills', [['Hills', 3], ['Sea', 1], ['Town', 1]]));
      const hourOff = { Morning: 0, Sunset: 0.2, Night: 0.4, Noon: 0.6, Rain: 0.8 }[T(g, 'Opens At', alt(g, 'Morning', [['Morning', 2], ['Sunset', 1], ['Night', 1], ['Noon', 1], ['Rain', 1]]))];
      if (arr === 'Huddle') bottles.forEach((b, k) => { b.x = n / 2 + (k - (m - 1) / 2) * gap * 0.62; });
      if (arr === 'Tall and Short') bottles.forEach((b, k) => { b.h = Math.min(0.56 * n, b.h * (k % 2 ? 0.7 : 1.2)); });
      const BLOOM = K.spr(['.p.', 'pyp', '.p.']), bloomC = [hx('#e8322a'), hx('#f2c230'), hx('#e889b5'), hx('#ffffff')];
      return (t) => {
        const ph = (t * 0.02 + hourOff) % 1, sky = SKIES[Math.floor(ph * SKIES.length)].map(hx);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = wall;
        K.bands(g, wy0, sill, sky.slice().reverse());
        // hills or roofs on the horizon
        for (let x = 0; x < n; x++) {
          if (view === 'Sea') { const hh = Math.round(6 * s); rect(g, x, sill - hh, 1, hh, mix(sky[0], hx('#1a4a7a'), 0.6)); if ((x + (t * 2 | 0)) % 6 < 2) put(g, x, sill - hh + 1 + (x % 3), mix(sky[2], WHITE, 0.4)); continue; }
          const hh = view === 'Town' ? Math.round((4 + 6 * K.hash(x >> 2, 7) + ((x >> 2) % 3 === 0 ? 3 : 0)) * s) : (Math.sin(x * 0.21) * 2 + Math.sin(x * 0.07 + 1) * 3 + 5) * s;
          rect(g, x, sill - hh, 1, hh, mix(sky[0], ink, 0.55));
          if (view === 'Town' && (x & 1) && K.hash(x, 9) > 0.7 && hh > 4 * s) put(g, x, sill - hh + 2 * s, ph > 0.4 ? hx('#ffd27a') : mix(sky[0], ink, 0.4));
        }
        // the window frame
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (x < wx0 || x >= wx1 || y < wy0) d[y * n + x] = wall;
        rect(g, wx0 - s, wy0 - s, s, sill - wy0 + s, frameC); rect(g, wx1, wy0 - s, s, sill - wy0 + s, frameC); rect(g, wx0 - s, wy0 - s, wx1 - wx0 + 2 * s, s, frameC); rect(g, n / 2 - s / 2, wy0, s, sill - wy0, frameC);
        // the sill
        rect(g, 0, sill, n, n - sill, sillC[2]); rect(g, 0, sill, n, Math.max(1, s), sillC[3]); rect(g, 0, n - 2 * s, n, 2 * s, sillC[1]);
        const sunX = Math.sin(t * 0.05) * 6 * s;
        for (const b of bottles) {
          const y0 = sill - b.h, hgt = b.h;
          // coloured pool of light on the sill, thrown away from the sun
          for (let y = sill + 1; y < sill + 5 * s && y < n; y++) for (let x = Math.round(b.x - 3 * b.sc + sunX * (y - sill) / (5 * s)); x < b.x + 3 * b.sc + sunX * (y - sill) / (5 * s); x++) if (x >= 0 && x < n) d[y * n + x] = mix(d[y * n + x], b.c, 0.45);
          for (let y = Math.round(y0); y < sill; y++) {
            const v = (y - y0) / hgt, r = b.prof(v) * b.sc;
            for (let x = Math.round(b.x - r); x < b.x + r; x++) {
              if (x < 0 || x >= n) continue;
              const nx = (x + 0.5 - b.x) / r, i = y * n + x;
              let c = mix(d[i], b.c, 0.5 + 0.35 * nx * nx);
              if (nx > -0.65 && nx < -0.35 && v > 0.1 && v < 0.92) c = mix(c, WHITE, 0.65);
              Lr.d[i] = c;
            }
          }
          if (fill === 'Flowers') { const bi = bottles.indexOf(b); line(Lr, b.x, y0, b.x + (bi % 2 ? 1 : -1), y0 - 5 * s, hx('#3f8a2a')); K.blit(Lr, BLOOM, b.x + (bi % 2 ? 1 : -1) - 1, y0 - 5 * s - 2, { p: bloomC[bi % 4], y: hx('#f2c230') }, false, 1); }
          else rect(Lr, b.x - b.prof(0) * b.sc, y0 - 1, b.prof(0) * b.sc * 2, 1.5 * s, hx('#8a6a4a'));
          if (fill === 'Messages' && bottles.indexOf(b) % 2 === 0) rect(Lr, b.x - 0.5, y0 + b.h * 0.45, 1.5, b.h * 0.35, mix(Lr.d[Math.round(y0 + b.h * 0.6) * n + Math.round(b.x)] || WHITE, hx('#f2e8c8'), 0.7));
          K.commit(g, Lr, ink);
        }
      };
    },
  });

  add({
    name: 'Vase', seed: 2, sizes: [40, 50], fps: 12,
    recipe: 'A bunch of flowers in a patterned vase, big in the frame: daisies, tulips, roses, poppies, lavender and cornflowers on nodding stems, every flower a crisp little sprite. Now and then a petal falls to the table.',
    make(R, U, g) {
      const { n, d } = g, rm = R.pick(ROOMS), s = n / 40, edge = Math.round(n * R.range(0.66, 0.74)), bg = room(n, R, edge, rm), Lr = K.layer(n);
      const vC = T5(R.pick(['#f2efe6', '#2f6db5', '#c23b3b', '#2e9c7a', '#e0b030', '#1d1d24', '#e889b5', '#7b4fb0'])), patC = hx(R.pick(['#1b2a4a', '#ffffff', '#f2d36b', '#c23b3b']));
      const shape = R.pick(['round', 'tall', 'urn', 'bottle']), pat = R.pick(['band', 'stripes', 'zigzag', 'dots', 'none']);
      T(g, 'Room', rm.nm); T(g, 'Vase', CAP(shape)); T(g, 'Glaze', CAP(pat));
      const prof = { round: v => 6 * Math.sin(0.25 + v * 2.6) + 1, tall: v => 3 + v * 2.2, urn: v => v < 0.2 ? 4.5 - v * 6 : 3 + 3.5 * Math.sin((v - 0.2) / 0.8 * Math.PI), bottle: v => v < 0.35 ? 1.8 : 1.8 + Math.min(1, (v - 0.35) * 3) * 4 }[shape];
      const cx = n / 2, vb = edge + (n - edge) * 0.55, vh = n * R.range(0.28, 0.36), vt = vb - vh;
      const FL = {
        daisy: { spr: K.spr(['.w.w.', 'wwyww', '.wyw.', 'ww.ww']), map: c => ({ w: hx('#ffffff'), y: hx('#f2c230') }) },
        tulip: { spr: K.spr(['p.p.p', 'ppppp', 'ppPpp', '.pPp.']), map: c => ({ p: c, P: shade(c, 0.7) }) },
        rose: { spr: K.spr(['.ppp.', 'pPpPp', 'ppPpp', '.ppp.']), map: c => ({ p: c, P: shade(c, 0.62) }) },
        poppy: { spr: K.spr(['.ppp.', 'ppppp', 'ppkpp', 'ppppp', '.ppp.']), map: c => ({ p: hx('#e8322a'), k: hx('#1a1018') }) },
        lavender: { spr: K.spr(['.p.', 'ppp', '.p.', 'ppp', '.p.', 'ppp']), map: c => ({ p: hx('#9a7ad8') }) },
        corn: { spr: K.spr(['b.b.b', '.bbb.', 'bbkbb', '.bbb.', 'b.b.b']), map: c => ({ b: hx('#3a6ad8'), k: hx('#1a1a40') }) },
        sun: { spr: K.spr(['.yyy.', 'yybyy', 'ybbby', 'yybyy', '.yyy.']), map: c => ({ y: hx('#f2c230'), b: hx('#5a3418') }) },
      };
      const kinds = R.shuffle(Object.keys(FL)).slice(0, R.int(2, 4));
      const flowers = Array.from({ length: R.int(7, 12) }, (_, k) => {
        const kind = R.pick(kinds), a = R.range(-1.05, 1.05), len = R.range(0.55, 1) * n * 0.42;
        return { kind, a, len, c: hx(R.pick(['#e8322a', '#f2c230', '#e889b5', '#ffffff', '#ff7a3a', '#c23b9a'])), ph: R.range(0, TAU), leaf: R.bool(0.6) };
      }).sort((a, b) => a.len - b.len);
      const petals = [];
      T(g, 'Flowers', kinds.map(k => ({ daisy: 'Daisies', tulip: 'Tulips', rose: 'Roses', poppy: 'Poppies', lavender: 'Lavender', corn: 'Cornflowers', sun: 'Sunflowers' }[k])).slice(0, 2).join(' and ')); T(g, 'Stems', flowers.length);
      return (t) => {
        d.set(bg);
        shadow(g, bg, cx + 3 * s, vb + 0.5, 8 * s, 1.6 * s);
        // stems and flowers behind the vase mouth
        for (const f of flowers) {
          const sway = Math.sin(t * 0.8 + f.ph) * 0.05, a = f.a * 0.62 + sway, hx2 = cx + Math.sin(a) * f.len, hy = vt - Math.cos(a) * f.len;
          const mx = cx + Math.sin(a * 0.5) * f.len * 0.5, my = vt - Math.cos(a * 0.4) * f.len * 0.55;
          line(Lr, cx, vt + 2, mx, my, hx('#3f8a2a')); line(Lr, mx, my, hx2, hy, hx('#3f8a2a'));
          if (f.leaf) K.ell(Lr, mx + (f.a > 0 ? 1.5 : -1.5) * s, my + 1, 1.8 * s, 0.9 * s, hx('#5cae3a'));
          const fl = FL[f.kind];
          K.blit(Lr, fl.spr, hx2 - fl.spr.w * Math.max(1, s | 0) / 2, hy - fl.spr.h * Math.max(1, s | 0) / 2, fl.map(f.c), false, Math.max(1, s | 0));
          K.commit(g, Lr, rm.ink);
          if (R() < 0.004 && petals.length < 6) petals.push({ x: hx2, y: hy, c: f.kind === 'daisy' ? WHITE : f.kind === 'poppy' ? hx('#e8322a') : f.c, vx: R.range(-0.2, 0.2) });
        }
        // the vase
        K.lathe(Lr, cx, vt, vb, v => prof(v) * s, vC, -0.6);
        if (pat !== 'none') for (let y = Math.round(vt); y < vb; y++) {
          const v = (y - vt) / vh, r = prof(v) * s;
          for (let x = Math.round(cx - r); x < cx + r; x++) {
            const u = x - Math.round(cx - r);
            const on = pat === 'band' ? (v > 0.42 && v < 0.5) || (v > 0.56 && v < 0.6) : pat === 'stripes' ? u % 3 === 0 && v > 0.15 : pat === 'zigzag' ? Math.abs(((u + 0) % 4) - 2) === Math.round((v * vh) % 4 / 2) && v > 0.3 && v < 0.7 : (u % 3 === 1 && (y - Math.round(vt)) % 3 === 1);
            if (on) Lr.d[y * n + x] = x < cx ? patC : shade(patC, 0.72);
          }
        }
        K.commit(g, Lr, rm.ink);
        for (let k = petals.length - 1; k >= 0; k--) {
          const p = petals[k]; p.y += 0.35 * s; p.x += p.vx + Math.sin(t * 3 + k) * 0.15;
          if (p.y > edge + (n - edge) * 0.7) { p.vx = 0; p.life = (p.life || 60) - 1; if (p.life <= 0) petals.splice(k, 1); }
          put(g, p.x, p.y, p.c);
        }
      };
    },
  });

  add({
    name: 'Breakfast', seed: 3, sizes: [40, 50], fps: 12,
    interactive: 'Click the food to take a bite.',
    recipe: 'Breakfast from above, filling the table: eggs and toast, a stack of pancakes, a croissant with jam or a bowl of yoghurt and fruit, with coffee, juice and cutlery, on wood or a checked cloth. Click the food to take a bite out of it.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#1a120e');
      const wood = R.bool(0.55), woodC = T5(R.pick(['#9a6440', '#c08a50', '#6a4228'])), clothA = hx(R.pick(['#e8e4da', '#ffffff'])), clothB = hx(R.pick(['#c23b3b', '#2f6db5', '#2e9c7a', '#e0b030']));
      const menu = R.pick(['eggs', 'pancakes', 'croissant', 'yoghurt', 'english']), plateC = T5(R.pick(['#f4f2ec', '#e6eef4', '#2a3a5a', '#f2e0b8']));
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = wood ? (y % (5 * s | 0 || 5) === 0 ? woodC[1] : K.hash(x >> 2, y, 5) < 0.08 ? woodC[1] : woodC[2]) : ((((x / (3 * s)) | 0) + ((y / (3 * s)) | 0)) & 1 ? mix(clothA, clothB, 0.5) : (((x / (3 * s)) | 0) & 1) && (((y / (3 * s)) | 0) & 1) ? clothB : clothA);
      const pcx = n * 0.46, pcy = n * 0.52, pr = n * 0.3, bites = [];
      // new traits: one more thing on the table, and the light
      const side = T(g, 'Also', alt(g, 'Nothing', [['Nothing', 3], ['Newspaper', 1], ['Flowers', 1], ['Jam Jar', 1]])), sun = T(g, 'Light', alt(g, 'Soft', [['Soft', 3], ['Sunbeam', 1]]));
      T(g, 'Menu', { eggs: 'Fried Eggs', pancakes: 'Pancakes', croissant: 'Croissant', yoghurt: 'Yoghurt', english: 'Full English' }[menu]); T(g, 'Table', wood ? 'Wood' : 'Checked Cloth'); T(g, 'Plate', ['White', 'Pale Blue', 'Navy', 'Cream'][['#f4f2ec', '#e6eef4', '#2a3a5a', '#f2e0b8'].map(hx).indexOf(plateC[2])]);
      const food = (x, y) => {
        for (const b of bites) if (Math.hypot(x + 0.5 - b[0], y + 0.5 - b[1]) < b[2]) return false;
        return true;
      };
      return (t) => {
        for (const tp of g.input.taps()) if (Math.hypot(tp.x * n - pcx, tp.y * n - pcy) < pr * 0.85) bites.push([tp.x * n, tp.y * n, R.range(2.2, 3.2) * s]);
        if (bites.length > 40) bites.splice(0, bites.length);
        // after a while, a fresh plate
        if (!g.input.down && (t % 40) < 0.1) bites.length = 0;
        d.set(bg);
        // cup of coffee, juice, cutlery
        const ccx = n * 0.84, ccy = n * 0.2;
        shadow(g, bg, ccx + 1.5 * s, ccy + 1.5 * s, 5.4 * s, 5.4 * s, 0.75);
        K.ell(Lr, ccx, ccy, 5 * s, 5 * s, hx('#f2efe6')); K.commit(g, Lr, ink);
        K.ell(Lr, ccx, ccy, 3.5 * s, 3.5 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.7 ? hx('#b07a46') : hx('#3a1e10')); K.ell(Lr, ccx + 5.4 * s, ccy, 1.4 * s, 1 * s, hx('#f2efe6')); K.commit(g, Lr, ink);
        const jx = n * 0.13, jy = n * 0.16;
        K.ell(Lr, jx, jy, 3.6 * s, 3.6 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.65 ? hx('#dfe8ee') : (nx < -0.2 && ny < -0.2) ? hx('#ffd27a') : hx('#f59a1a')); K.commit(g, Lr, ink);
        rect(Lr, n * 0.84, n * 0.42, 1.2 * s, n * 0.4, hx('#c9ced6')); K.ell(Lr, n * 0.84 + 0.6 * s, n * 0.42, 1.8 * s, 2.6 * s, hx('#c9ced6')); K.commit(g, Lr, ink);
        rect(Lr, n * 0.08, n * 0.38, 1.2 * s, n * 0.44, hx('#c9ced6')); for (let k = 0; k < 3; k++) rect(Lr, n * 0.08 - 1 + k, n * 0.38 - 3 * s, 0.6, 3 * s, hx('#c9ced6')); K.commit(g, Lr, ink);
        // plate
        shadow(g, bg, pcx + 2 * s, pcy + 2 * s, pr * 1.02, pr * 1.02, 0.75);
        K.ell(Lr, pcx, pcy, pr, pr, (x, y, nx, ny) => { const r = nx * nx + ny * ny; return r > 0.8 ? plateC[2] : r > 0.72 ? plateC[1] : plateC[3]; }); K.commit(g, Lr, ink);
        const F = (cx, cy, rx, ry, fn) => K.ell(Lr, cx, cy, rx, ry, (x, y, nx, ny) => food(x, y) ? (typeof fn === 'function' ? fn(x, y, nx, ny) : fn) : 0);
        if (menu === 'eggs' || menu === 'english') {
          for (const [ox, oy] of menu === 'eggs' ? [[-0.35, -0.2], [0.05, 0.3]] : [[-0.4, -0.3]]) {
            F(pcx + ox * pr, pcy + oy * pr, 6 * s, 5 * s, (x, y, nx, ny) => K.hash(x, y, 2) < 0.04 ? hx('#e8d8b0') : WHITE);
            F(pcx + ox * pr + 0.5 * s, pcy + oy * pr, 2.4 * s, 2.4 * s, (x, y, nx, ny) => nx < -0.3 && ny < -0.3 ? hx('#ffe07a') : hx('#f5a70a'));
          }
          K.commit(g, Lr, ink);
          for (let k = 0; k < 2; k++) { const tx = pcx + (0.25 + k * 0.08) * pr, ty = pcy + (-0.3 + k * 0.12) * pr; F(tx, ty, 5 * s, 5.5 * s, (x, y, nx, ny) => Math.abs(nx) > 0.78 || Math.abs(ny) > 0.82 ? hx('#9a5a24') : Math.abs(nx) < 0.3 && Math.abs(ny) < 0.3 ? hx('#ffe48a') : hx('#e0a85a')); K.commit(g, Lr, ink); }
          if (menu === 'english') { for (let k = 0; k < 2; k++) { F(pcx + (-0.1 + k * 0.18) * pr, pcy + 0.42 * pr, 1.6 * s, 6 * s, (x, y) => (y & 2) ? hx('#c0503a') : hx('#e88a7a')); K.commit(g, Lr, ink); } F(pcx - 0.48 * pr, pcy + 0.3 * pr, 4 * s, 3 * s, (x, y) => K.hash(x, y, 8) < 0.3 ? hx('#5a2a10') : hx('#b85a2a')); K.commit(g, Lr, ink); }
        } else if (menu === 'pancakes') {
          for (let k = 0; k < 4; k++) { F(pcx, pcy + 2 * s - k * 1.6 * s, pr * 0.62, pr * 0.5, (x, y, nx, ny) => nx * nx + ny * ny > 0.82 ? hx('#a0602a') : hx('#e2a858')); K.commit(g, Lr, ink); }
          F(pcx, pcy - 4.4 * s, pr * 0.42, pr * 0.32, (x, y, nx, ny) => K.hash(x, y, 1) < 0.1 ? hx('#c8761a') : hx('#9a4a10'));
          F(pcx - 1.5 * s, pcy - 5 * s, 2 * s, 1.5 * s, hx('#fff2a8')); K.commit(g, Lr, 0);
          for (let k = 0; k < 5; k++) F(pcx + Math.cos(k * 1.3) * pr * 0.75, pcy + Math.sin(k * 1.3) * pr * 0.65, 1.3 * s, 1.3 * s, hx(k & 1 ? '#3a4ad8' : '#d8203a'));
          K.commit(g, Lr, ink);
        } else if (menu === 'croissant') {
          for (let k = 0; k < 7; k++) { const a = Math.PI * (0.15 + k * 0.12); F(pcx + Math.cos(a) * pr * 0.42 - 2 * s, pcy - Math.sin(a) * pr * 0.25 + 3 * s, (k === 3 ? 4 : 3) * s, (k === 3 ? 4 : 3) * s, (x, y, nx, ny) => ny < -0.3 ? hx('#f0c070') : nx > 0.6 ? hx('#9a5a1a') : hx('#d8963a')); }
          K.commit(g, Lr, ink);
          F(pcx + 0.42 * pr, pcy - 0.42 * pr, 3.4 * s, 3.4 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.6 ? hx('#e6eef4') : nx < -0.2 && ny < -0.2 ? hx('#ff6a7a') : hx('#b0102a')); K.commit(g, Lr, ink);
          F(pcx - 0.45 * pr, pcy - 0.42 * pr, 3 * s, 2 * s, (x, y, nx, ny) => ny < -0.2 ? hx('#fff6c0') : hx('#f2d880')); K.commit(g, Lr, ink);
        } else {
          F(pcx, pcy, pr * 0.72, pr * 0.72, (x, y, nx, ny) => nx * nx + ny * ny > 0.8 ? hx('#3f6a92') : hx('#f6f2ea')); K.commit(g, Lr, ink);
          for (let k = 0; k < 14; k++) { const a = k * 2.4, r = pr * 0.45 * Math.sqrt(k / 14); F(pcx + Math.cos(a) * r, pcy + Math.sin(a) * r, 1.4 * s, 1.4 * s, hx(['#d8203a', '#3a4ad8', '#f2c230', '#5ab03a'][k % 4])); }
          K.commit(g, Lr, ink);
          for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.4; F(pcx + Math.cos(a) * pr * 0.2, pcy + Math.sin(a) * pr * 0.2, 1, 1, hx('#e8c070')); }
          K.commit(g, Lr, 0);
        }
        // the extra on the table, and a beam of morning sun across it
        if (side === 'Newspaper') { rect(Lr, n * 0.52, n * 0.86, n * 0.44, n * 0.16, hx('#e8e4da')); K.commit(g, Lr, ink); for (let k = 0; k < 4; k++) for (let x = Math.round(n * 0.55); x < n * 0.93; x++) if (K.hash(x, k, 4) > 0.3) put(g, x, n * 0.89 + k * 2, hx('#6a6a72')); rect(g, n * 0.55, n * 0.88, n * 0.12, 2, hx('#2a2a30')); }
        if (side === 'Flowers') { K.ell(Lr, n * 0.14, n * 0.89, 3.2 * s, 3.2 * s, hx('#3a7ab0')); K.commit(g, Lr, ink); for (let k = 0; k < 5; k++) { const a = k * 1.26, c = hx(['#e8322a', '#f2c230', '#ffffff', '#e889b5', '#f28a1e'][k]); K.ell(g, n * 0.14 + Math.cos(a) * 2 * s, n * 0.89 + Math.sin(a) * 2 * s, 1.1 * s, 1.1 * s, c); } put(g, n * 0.14, n * 0.89, hx('#f2d23a')); }
        if (side === 'Jam Jar') { K.ell(Lr, n * 0.14, n * 0.88, 3 * s, 3 * s, (x, y, nx, ny) => nx * nx + ny * ny > 0.6 ? hx('#e8e4da') : hx('#a8102a')); K.commit(g, Lr, ink); put(g, n * 0.13, n * 0.87, hx('#ff6a7a')); }
        if (sun === 'Sunbeam') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const u = x + y * 0.7 - n * 0.55; if (u > 0 && u < n * 0.22) { const i = y * n + x; d[i] = mix(d[i], hx('#fff4d0'), 0.2); } }
        // steam over the coffee
        for (let k = 0; k < 6; k++) put(g, ccx + Math.sin(t * 1.5 + k * 0.8) * 1.5 * s, ccy - 2 * s - k * s, mix(d[0], WHITE, 0.5 + 0.08 * k));
      };
    },
  });

  add({
    name: 'Bookshelf', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Click a book to pull it out.',
    recipe: 'Shelves packed edge to edge with books of every height and colour, with banded spines, a few lying flat, and a plant, a globe or a candle between them. A bar of sunlight creeps across. Click a book to pull it out and push it back.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, ink = hx('#120d0a'), Lr = K.layer(n);
      const wood = T5(R.pick(['#8a5a36', '#5a3a26', '#c0905a', '#3a3a44', '#e8e2d6']));
      const BOOKS = R.pick([['#c23b3b', '#2f6db5', '#e0b030', '#2e9c7a', '#7b4fb0', '#e8e0d0', '#1d1d24', '#e8722a'], ['#7a2e2e', '#2e4a3a', '#3a3a5a', '#8a6a3a', '#5a2a4a', '#2a2a2a'], ['#ff6f91', '#ffc75f', '#00c9a7', '#845ec2', '#4d8076', '#f9f871'], ['#e8e4da', '#1d1d24', '#c23b3b']]).map(hx);
      const rows = R.int(3, 4), shelfH = Math.floor((n - 2) / rows), books = [];
      for (let r = 0; r < rows; r++) {
        const base = (r + 1) * shelfH - 1;
        let x = 2 * s;
        while (x < n - 3 * s) {
          const roll = R();
          if (roll < 0.06) { books.push({ obj: R.pick(['plant', 'globe', 'candle', 'cat']), x, base, w: 6 * s }); x += 7 * s; continue; }
          if (roll < 0.12) { const k = R.int(2, 4), w = R.int(6, 9) * s; for (let j = 0; j < k; j++) books.push({ flat: true, x, base: base - j * 1.6 * s, w: w - j, h: 1.6 * s, c: K.tones(R.pick(BOOKS)) }); x += w + s; continue; }
          const w = R.int(2, 4) * s * 0.8, h = R.range(0.55, 0.9) * (shelfH - 2), c = K.tones(R.pick(BOOKS));
          books.push({ x, base, w, h, c, band: R.int(0, 3), lean: x > n - 8 * s && R.bool(0.3), out: 0, want: 0 });
          x += w + (R.bool(0.15) ? 0.01 : 0);
        }
      }
      let lastTap = -99;
      T(g, 'Wood', ['Oak', 'Walnut', 'Pine', 'Grey', 'White'][['#8a5a36', '#5a3a26', '#c0905a', '#3a3a44', '#e8e2d6'].map(hx).indexOf(wood[2])]);
      T(g, 'Books', ['Rainbow', 'Leather', 'Pop', 'Classic'][['#c23b3b', '#7a2e2e', '#ff6f91', '#e8e4da'].map(hx).indexOf(BOOKS[0])]); T(g, 'Shelves', rows); T(g, 'Curios', books.filter(b => b.obj).length);
      return (t) => {
        for (const tp of g.input.taps()) { lastTap = t; for (const b of books) if (!b.flat && !b.obj && tp.x * n >= b.x && tp.x * n < b.x + b.w && tp.y * n > b.base - b.h && tp.y * n <= b.base) b.want = b.want ? 0 : 1; }
        if (t - lastTap > 6) for (const b of books) { if (b.flat || b.obj) continue; if (!b.want && R() < 0.0015) b.want = 1; else if (b.want && R() < 0.02) b.want = 0; }
        // back panel and shelves
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (x & 7) === 0 ? wood[0] : wood[1];
        for (let r = 0; r < rows; r++) { const yb = (r + 1) * shelfH - 1; rect(g, 0, yb, n, Math.max(1, s), wood[3]); rect(g, 0, yb + Math.max(1, s), n, 1, wood[0]); }
        rect(g, 0, 0, Math.max(1, s), n, wood[2]); rect(g, n - Math.max(1, s), 0, Math.max(1, s), n, wood[2]);
        // the sunbeam: a slanted bar that brightens what it crosses
        const sx = ((t * 0.6) % (n * 1.6)) - n * 0.3;
        for (const b of books) {
          if (b.obj) {
            const cx = b.x + b.w / 2, by = b.base;
            if (b.obj === 'plant') { rect(Lr, cx - 2 * s, by - 3 * s, 4 * s, 3 * s, hx('#c0603a')); for (let k = 0; k < 5; k++) K.ell(Lr, cx + (k - 2) * 1.3 * s, by - 4.5 * s - Math.abs(k - 2) * -0.6 * s, 1.4 * s, 2 * s, hx(k & 1 ? '#3f8a2a' : '#5cae3a')); }
            else if (b.obj === 'globe') { K.ell(Lr, cx, by - 4.5 * s, 3 * s, 3 * s, (x, y) => K.hash(x >> 1, y >> 1, 3) < 0.4 ? hx('#5cae3a') : hx('#3a7ad8')); rect(Lr, cx - 2 * s, by - s, 4 * s, s, hx('#c9a227')); }
            else if (b.obj === 'candle') { rect(Lr, cx - s, by - 5 * s, 2 * s, 5 * s, hx('#f2ece0')); put(Lr, cx, by - 6 * s, hx((t * 8 | 0) & 1 ? '#ffd27a' : '#ff9a3a')); }
            else { K.ell(Lr, cx, by - 2 * s, 3 * s, 2 * s, hx('#2a2a2a')); K.ell(Lr, cx + 2 * s, by - 3.5 * s, 1.6 * s, 1.4 * s, hx('#2a2a2a')); put(Lr, cx + 1.5 * s, by - 5 * s, hx('#2a2a2a')); put(Lr, cx + 2.6 * s, by - 5 * s, hx('#2a2a2a')); put(Lr, cx + 2.4 * s, by - 3.6 * s, hx('#c8e040')); }
            K.commit(g, Lr, ink); continue;
          }
          if (b.flat) { rect(Lr, b.x, b.base - b.h, b.w, b.h, b.c[2]); rect(Lr, b.x, b.base - b.h, b.w, 1, b.c[3]); K.commit(g, Lr, ink); continue; }
          b.out += (b.want - b.out) * 0.2;
          const lift = Math.round(b.out * 3 * s), x0 = Math.round(b.x), w = Math.max(1, Math.round(b.w));
          for (let y = Math.round(b.base - b.h - lift); y < b.base - lift; y++) for (let x = x0; x < x0 + w; x++) {
            const v = (y - (b.base - b.h - lift)) / b.h, lit = Math.abs(x - (sx - (n - y) * 0.6)) < 3 * s;
            let c = x === x0 ? b.c[1] : b.c[2];
            if ((b.band === 1 && (v > 0.12 && v < 0.18 || v > 0.82 && v < 0.88)) || (b.band === 2 && v > 0.3 && v < 0.45)) c = b.c[4];
            if (b.band === 3 && v > 0.4 && v < 0.6 && x > x0 && ((y & 1) === 0)) c = b.c[0];
            Lr.d[y * n + x] = lit ? mix(c, WHITE, 0.3) : c;
          }
          K.commit(g, Lr, ink);
        }
      };
    },
  });

  add({
    name: 'Hourglass', seed: 2, sizes: [40, 50], fps: 15,
    interactive: 'Click to turn the hourglass over.',
    recipe: 'A big hourglass of real grains: coloured layers of sand drain through the neck one grain at a time and pile up below at their angle of rest. When the top is empty it turns over and starts again. Click to turn it whenever you like.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, ink = hx('#140f0c');
      const bgC = T5(R.pick(['#22263a', '#3a2430', '#1c3434', '#e8dcc0', '#2a2a2a'])), frameC = T5(R.pick(['#8a5a36', '#c9a227', '#3a3a44', '#d8d0c0']));
      const SANDS = [['#f2c230', '#f28a1e', '#e8322a', '#c23b9a', '#5a3ad8'], ['#e8d4a0', '#d8b880', '#c09a60', '#a07a40'], ['#ff6f91', '#ffc75f', '#00c9a7', '#845ec2'], ['#ffffff', '#c8d8e8', '#90b0d0', '#5a80b0'], ['#5cae3a', '#2e9c7a', '#3a7ad8', '#7b4fb0']].map(a => a.map(hx));
      const bgSoft = mix(bgC[1], bgC[2], 0.4), glassT = X.lum(bgC[2]) > 0.5 ? hx('#5a6a80') : hx('#9ac0e0');
      const sand = R.pick(SANDS); let bulb = R.range(0.34, 0.42) * n; const neck = Math.max(1, Math.round(s * 0.6)), top = Math.round(n * 0.1), bot = n - Math.round(n * 0.1), mid = n / 2;
      T(g, 'Sand', ['Sunset', 'Desert', 'Candy', 'Frost', 'Forest'][SANDS.indexOf(sand)]); T(g, 'Frame', ['Walnut', 'Brass', 'Iron', 'Bone'][['#8a5a36', '#c9a227', '#3a3a44', '#d8d0c0'].map(hx).indexOf(frameC[2])]);
      // new traits: the shape of the glass, the wall behind it, and how the sand is laid
      const form = T(g, 'Glass', alt(g, 'Classic', [['Classic', 3], ['Slender', 1], ['Round', 1]])), back = T(g, 'Backdrop', alt(g, 'Checks', [['Checks', 3], ['Plain', 1], ['Stripes', 1], ['Starry', 0.7]])), lay = T(g, 'Layers', alt(g, 'Bands', [['Bands', 3], ['Speckled', 1], ['Single', 0.7]]));
      if (form === 'Slender') bulb *= 0.68;
      const inside = new Uint8Array(n * n), grains = new Uint8Array(n * n), col = new Uint32Array(n * n);
      for (let y = top + 2; y < bot - 2; y++) {
        const v = Math.abs(y + 0.5 - mid) / (mid - top - 2), u = (v - 0.55) / 0.47, w = Math.max(neck / 2 + 0.5, bulb * Math.pow(Math.max(0, 1 - u * u), form === 'Round' ? 0.3 : 0.5) * (form === 'Round' ? 0.9 : 0.98));
        for (let x = Math.round(n / 2 - w); x < n / 2 + w; x++) inside[y * n + x] = 1;
      }
      function fill() {
        grains.fill(0);
        let k = 0;
        for (let y = top + 2; y < mid - 2; y++) for (let x = 0; x < n; x++) if (inside[y * n + x] && y > top + 2 + (mid - top) * 0.1) { grains[y * n + x] = 1; col[y * n + x] = lay === 'Speckled' ? sand[(K.hash(x, y, 5) * sand.length) | 0] : lay === 'Single' ? sand[1] : sand[Math.floor((y - top) / (mid - top) * sand.length * 1.4) % sand.length]; k++; }
      }
      function turn() { for (let y = 0; y < n / 2; y++) for (let x = 0; x < n; x++) { const a = y * n + x, b = (n - 1 - y) * n + x; const g1 = grains[a], c1 = col[a]; grains[a] = grains[b]; col[a] = col[b]; grains[b] = g1; col[b] = c1; } }
      fill();
      let flips = 0, idle = 0;
      return (t) => {
        if (g.input.taps().length) turn();
        // one pass bottom-up: fall, then slide diagonally; the neck lets one grain through per step
        let moved = 0;
        for (let y = bot - 3; y >= top; y--) {
          const dir = (y + flips) & 1 ? 1 : -1;
          for (let k = 0; k < n; k++) {
            const x = dir > 0 ? k : n - 1 - k, i = y * n + x;
            if (!grains[i]) continue;
            const b = i + n;
            if (inside[b] && !grains[b]) { grains[b] = 1; col[b] = col[i]; grains[i] = 0; moved++; continue; }
            const sx = x + (R() < 0.5 ? 1 : -1), bs = b - x + sx;
            if (inside[bs] && !grains[bs] && R() < 0.9) { grains[bs] = 1; col[bs] = col[i]; grains[i] = 0; moved++; }
          }
        }
        idle = moved ? 0 : idle + 1;
        if (idle > 20) { turn(); flips++; idle = 0; }
        // draw: background, glass, sand, frame
        // a quiet checked wall (two close tones), so the sand is the brightest, busiest thing in the frame
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = back === 'Checks' ? (((x >> 2) + (y >> 2)) & 1 ? bgC[1] : bgSoft) : back === 'Stripes' ? ((x >> 2) & 1 ? bgC[1] : bgSoft) : back === 'Starry' ? (K.hash(x, y, 8) < 0.03 ? mix(bgC[0], WHITE, 0.5 + 0.3 * Math.sin(t + x)) : mix(bgC[0], hx('#0a0c1a'), 0.6)) : bgSoft;
        for (let y = top; y < bot; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          // empty glass is a cool, slightly dark tint over the wall; sand grains get a lit and a shaded side
          if (inside[i]) d[i] = grains[i] ? (grains[i - 1] || !inside[i - 1] ? (grains[i + 1] || !inside[i + 1] ? col[i] : shade(col[i], 0.82)) : mix(col[i], WHITE, 0.22)) : mix(d[i], glassT, 0.32);
          else if ((x > 0 && inside[i - 1]) || (x < n - 1 && inside[i + 1]) || inside[i - n] || inside[i + n]) d[i] = mix(hx('#e8f4ff'), ink, 0.2);
        }
        // glints on the glass
        for (let y = top + 4; y < bot - 4; y += 1) { const i = y * n + Math.round(n / 2 - bulb * 0.55); if (inside[i] && Math.abs(y - mid) > 4 * s && !grains[i]) d[i] = mix(d[i], WHITE, 0.6); }
        // the frame: two plates and two posts that stand clear of the bulbs
        const pl = Math.max(1, Math.round(n / 2 - bulb - 2 * s)), pr = Math.min(n - 1, Math.round(n / 2 + bulb + 2 * s));
        rect(g, pl - s, top - 2 * s, pr - pl + 2 * s, 2 * s, frameC[2]); rect(g, pl - s, top - 2 * s, pr - pl + 2 * s, 1, frameC[3]);
        rect(g, pl - s, bot, pr - pl + 2 * s, 2 * s, frameC[1]); rect(g, pl - s, bot, pr - pl + 2 * s, 1, frameC[2]); rect(g, pl - s, bot + 2 * s, pr - pl + 2 * s, 1, frameC[0]);
        for (const px of [pl, pr - Math.max(1, s)]) { rect(g, px, top, Math.max(1, s), bot - top, frameC[1]); rect(g, px, top, 1, bot - top, frameC[3]); }
      };
    },
  });

  add({
    name: 'Shells', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click to send a wave up the beach.',
    recipe: 'Shells on rippled sand at the tideline, each one a crisp hand-drawn sprite with its own ribs, whorls and markings: scallops, moon snails, cowries, a conch, a sand dollar, a cockle and a starfish, among pebbles and weed. Waves wash up, darken the sand and slide back. Click to send one in.',
    make(R, U, g) {
      const { n, d } = g, ink = hx('#2a1c14');
      const SANDS = [['#f2dfb0', '#e2c890', '#c9a870'], ['#4a4a4e', '#3a3a3e', '#2a2a2e'], ['#f6d8d0', '#e8bfb4', '#d0a090'], ['#fff6e0', '#f0e2c0', '#dcc89c']];
      const sd = R.pick(SANDS).map(hx), sea = hx(R.pick(['#2a8ac8', '#1a6a8a', '#3ab0b0', '#2a4a8a'])), foam = WHITE;
      // o outline, a body, b ribs or shade, c inner, k dark mark
      const SH = {
        scallop: K.spr(['....ooo....', '..oaabaao..', '.oaabbbaao.', 'oaababababo', 'oababababao', 'oababababao', '.oabababao.', '..ooaaaoo..', '...ooaoo...', '....ooo....']),
        snail: K.spr(['..ooooo..', '.oaaaaao.', 'oaabbbaao', 'oabcccbao', 'oabcokbao', 'oabcccbao', 'oaabbbaao', '.oaaaaaoo', '..ooooo..']),
        cowrie: K.spr(['..ooo..', '.oaaao.', 'oaabaao', 'oabkbao', 'oabkbao', 'oabkbao', 'oabkbao', 'oaabaao', '.oaaao.', '..ooo..']),
        conch: K.spr(['.......oo..', '.....ooaao.', '...ooaabbao', '.ooaabbccao', 'oaabbccccao', '.oaabbccao.', '..ooaabao..', '....oooo...']),
        dollar: K.spr(['..ooooo..', '.oaaaaao.', 'oaakaakao', 'oaaakaaao', 'oakkbkkao', 'oaaakaaao', 'oaakaakao', '.oaaaaao.', '..ooooo..']),
        cockle: K.spr(['..ooooo..', '.oababao.', 'oabababao', 'oabababao', 'oabababao', '.oababao.', '..ooooo..']),
        star: K.spr(['....o....', '...oao...', '...obo...', 'oooobaooo', 'oabbcbbao', '.oaabaao.', '..oabao..', '.oao.oao.', 'oao...oao', 'oo.....oo']),
      };
      const COLS = [['#f4e6d0', '#e89a6a', '#fff6e8'], ['#e8c0a0', '#a0603a', '#f6dcc8'], ['#f2f0ea', '#c8b8a0', '#ffffff'], ['#e8a0b0', '#c06080', '#f8d0d8'], ['#f0d080', '#d08a3a', '#fff0c0'], ['#d8c8f0', '#8a6ac0', '#f0e8ff']];
      const kinds = R.shuffle(Object.keys(SH)).slice(0, R.int(3, 5));
      const shells = [];
      for (let k = 0; k < 200 && shells.length < R.int(4, 7); k++) {
        const kd = R.pick(kinds), sp = SH[kd], x = R.range(0.04, 0.96) * n - sp.w / 2, y = R.range(0.45, 0.88) * n - sp.h / 2;
        if (shells.some(o => Math.abs(o.x - x) < 11 && Math.abs(o.y - y) < 10)) continue;
        const c = R.pick(COLS).map(hx);
        shells.push({ k: kd, x, y, flip: R.bool(), map: kd === 'star' ? { o: ink, a: hx('#e8622a'), b: hx('#ff9a5a'), c: hx('#ffd0a0') } : { o: ink, a: c[0], b: c[1], c: c[2], k: shade(c[1], 0.55) } });
      }
      const pebbles = Array.from({ length: R.int(4, 10) }, () => ({ x: R.range(0, n), y: R.range(0.4, 1) * n, r: R.range(0.8, 1.8), c: hx(R.pick(['#8a8a90', '#6a6a70', '#b0a090', '#5a5a5e'])) }));
      T(g, 'Sand', ['Golden', 'Volcanic', 'Coral', 'White'][SANDS.map(a => hx(a[0])).indexOf(sd[0])]); T(g, 'Sea', ['Azure', 'Deep', 'Lagoon', 'Navy'][['#2a8ac8', '#1a6a8a', '#3ab0b0', '#2a4a8a'].map(hx).indexOf(sea)]); T(g, 'Shell Kinds', kinds.length); T(g, 'Shells', shells.length);
      const find = T(g, 'Also', alt(g, 'Pebbles', [['Pebbles', 3], ['Footprints', 1], ['Driftwood', 1]]));
      const weed = R.bool(0.6) ? Array.from({ length: R.int(2, 5) }, () => ({ x: R.range(0, n), y: R.range(0.4, 0.95) * n, len: R.int(4, 9) })) : [];
      let push = 0;
      return (t) => {
        if (g.input.taps().length) push = 1;
        push *= 0.985;
        const wave = (Math.sin(t * 0.45) * 0.5 + 0.5) * 0.3 + push * 0.4, shore = n * (0.18 + wave);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, sw = shore + Math.sin(x * 0.35 + t * 1.2) * 1.2;
          if (y < sw - 1.2) d[i] = ((y + Math.round(Math.sin(x * 0.4 + t))) % 4 === 0) ? mix(sea, WHITE, 0.25) : y < n * 0.12 ? shade(sea, 0.8) : sea;
          else if (y < sw) d[i] = foam;
          else {
            const ripple = ((y + Math.round(Math.sin(x * 0.25) * 1.5)) % 3 === 0), wet = y < n * (0.2 + 0.3 * Math.max(wave, 0.15)) + 2;
            d[i] = ripple ? sd[1] : wet ? sd[2] : sd[0];
          }
        }
        for (const w of weed) if (w.y > shore) for (let q = 0; q < w.len; q++) put(g, w.x + q, w.y + Math.sin(q * 0.9) * 1.2, q & 1 ? hx('#3a6a2a') : hx('#2a5a24'));
        for (const p of pebbles) if (p.y > shore + 2) K.ell(g, p.x, p.y, p.r, p.r * 0.8, (x, y, nx, ny) => nx < -0.2 && ny < -0.2 ? mix(p.c, WHITE, 0.35) : p.c);
        // footprints wander across the dry sand (each wave above them washes the wet ones away), or a driftwood log lies there
        if (find === 'Footprints') for (let k = 0; k < 14; k++) { const u = k / 13, x = n * (0.05 + 0.9 * u), y = n * (0.55 + 0.25 * Math.sin(u * 3 + 1)) + (k & 1 ? 1.5 : -1.5); if (y > shore + 3) { rect(g, x, y, 2, 1, shade(sd[0], 0.82)); put(g, x + (k & 1 ? 0 : 1), y - 1, shade(sd[0], 0.82)); } }
        if (find === 'Driftwood') { const y0 = Math.round(n * 0.62); if (y0 > shore + 2) { for (let x = Math.round(n * 0.25); x < n * 0.7; x++) { const yy = y0 + Math.round((x - n * 0.25) * 0.12); put(g, x, yy, hx('#b8a080')); put(g, x, yy + 1, hx('#8a7258')); put(g, x, yy + 2, hx('#5a4a3a')); } put(g, n * 0.45, y0 + 2, hx('#4a3a2a')); line(g, n * 0.55, y0 + 1, n * 0.6, y0 - 3, hx('#8a7258')); } }
        for (const sh of shells) { if (sh.y + SH[sh.k].h * 0.5 < shore) continue; K.blit(g, SH[sh.k], sh.x, sh.y, sh.map, sh.flip, 1); }
      };
    },
  });

  add({
    name: 'Window Sill', seed: 3, sizes: [40, 50], fps: 12,
    interactive: 'Click the cat to wake it.',
    listens: 'Clap or make a noise and the cat wakes up.',
    recipe: 'A cat asleep on a window sill beside a plant and a cup, while a whole day passes outside: dawn, noon, dusk and night over hills, a city or the sea. Its sides rise and fall, its tail twitches; click it and it wakes, looks round and settles again.',
    make(R, U, g) {
      const { n, d } = g, s = Math.max(1, Math.round(n / 40)), ink = hx('#120e14'), Lr = K.layer(n);
      const wall = T5(R.pick(['#e8dcc0', '#3a4a6a', '#6a3a3a', '#2a5a5a', '#f2c8b8'])), frameC = T5(R.pick(['#f4f2ea', '#2a2a30', '#8a5a36', '#2f6db5']));
      const CATS = [['#2a2a30', '#3e3e48', '#f2c230'], ['#e8822a', '#f2a65a', '#5cae3a'], ['#8a8a94', '#b0b0ba', '#3ab0d8'], ['#f4f2ea', '#d8d4cc', '#3ab0d8'], ['#3a2a20', '#e8822a', '#5cae3a']].map(a => a.map(hx));
      const cat = R.pick(CATS), view = R.pick(['hills', 'city', 'sea', 'trees']), curtains = R.bool(0.5) ? T5(R.pick(['#c23b3b', '#2e9c7a', '#e0b030', '#7b4fb0'])) : null;
      const wx = Math.round(n * 0.14), wy = Math.round(n * 0.08), ww = n - 2 * wx, wh = Math.round(n * 0.54), sill = wy + wh;
      const SKY = [['#ffb08a', '#ffd6a0', '#fff0c8'], ['#5ab0f0', '#8ccaf5', '#c0e4ff'], ['#ff7a5a', '#ffaa6a', '#5a3a8a'], ['#0a1430', '#142050', '#1e2c66']].map(a => a.map(hx));
      const skyline = Array.from({ length: ww }, (_, x) => view === 'city' ? Math.round((K.hash(x >> 2, 3) * 0.45 + 0.15) * wh) : view === 'trees' ? Math.round((0.25 + 0.12 * Math.sin(x * 0.7) + 0.1 * K.hash(x, 2)) * wh) : view === 'hills' ? Math.round((0.18 + 0.12 * Math.sin(x * 0.12 + 1) + 0.05 * Math.sin(x * 0.4)) * wh) : Math.round(wh * 0.35));
      let awake = 0, look = 0;
      // new traits: the wallpaper, the weather outside, and what keeps the cat company on the sill
      const paper = T(g, 'Wallpaper', alt(g, 'Diagonal', [['Diagonal', 3], ['Stripes', 1], ['Sprigs', 1], ['Plain', 0.7]])), wthr = T(g, 'Weather', alt(g, 'Fair', [['Fair', 3], ['Rain', 1], ['Snow', 0.8]])), thing = T(g, 'Beside', alt(g, 'Cup', [['Cup', 3], ['Books', 1], ['Fishbowl', 0.7]]));
      const dayOff = { Dawn: 0, Noon: 0.25, Dusk: 0.5, Night: 0.75 }[T(g, 'Opens At', alt(g, 'Dawn', [['Dawn', 2], ['Noon', 1], ['Dusk', 1], ['Night', 1]]))];
      T(g, 'Cat', ['Black', 'Ginger', 'Grey', 'White', 'Tortie'][CATS.indexOf(cat)]); T(g, 'View', CAP(view)); T(g, 'Curtains', curtains ? 'Yes' : 'None'); T(g, 'Wall', ['Cream', 'Blue', 'Red', 'Teal', 'Peach'][['#e8dcc0', '#3a4a6a', '#6a3a3a', '#2a5a5a', '#f2c8b8'].map(hx).indexOf(wall[2])]);
      const radC = K.tones(mix(wall[2], hx('#f2efe6'), 0.62));
      const catSpr = K.spr([
        '.e...e..........',
        '.ee.ee..........',
        '.hhhhh...bbbbb..',
        'hhkhkhh.bbbbbbbb',
        'hhhnhhhbbbbbbbbbb',
        '.hwwwhbbbbbbbbbbb',
        '..wwbbbbbbbbbbbbb',
        '.ttttttttttttbbb.',
      ]);
      return (t) => {
        const cx = Math.round(n * 0.52), cy = sill - 7 * s;
        for (const tp of g.input.taps()) if (Math.abs(tp.x * n - cx - 6 * s) < 9 * s && Math.abs(tp.y * n - cy - 3 * s) < 6 * s) awake = 6;
        // Listen: a clap or a bang in the room wakes the cat too
        if (g.input.listening && g.input.beats() && g.input.level > 0.12) awake = 6;
        awake = Math.max(0, awake - 1 / 12);
        const day = (t * 0.03 + dayOff) % 1, ph = Math.floor(day * 4), sky = SKY[ph], night = ph === 3;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (paper === 'Diagonal' ? (x + y) % 6 === 0 : paper === 'Stripes' ? x % 5 === 0 : paper === 'Sprigs' ? (x % 6 === 2 && y % 6 === 2) || (x % 6 === 5 && y % 6 === 5) : false) ? wall[1] : wall[2];
        // sky and view inside the window
        for (let y = 0; y < wh; y++) for (let x = 0; x < ww; x++) {
          const b = Math.min(2, Math.floor(y / wh * 3.2)), i = (wy + y) * n + wx + x;
          d[i] = sky[b];
          if (wh - y <= skyline[x]) d[i] = view === 'sea' ? (y % 3 === 0 ? mix(sky[0], hx('#2a6aa8'), 0.4) : shade(hx('#2a6aa8'), night ? 0.4 : 1)) : view === 'city' ? (night && K.hash(x >> 1, y >> 1, 9) > 0.8 ? hx('#ffd27a') : shade(hx('#3a4a6a'), night ? 0.5 : 1)) : view === 'trees' ? shade(hx('#2e7a3a'), night ? 0.4 : 1 - 0.15 * (x & 1)) : shade(hx('#5aa04a'), night ? 0.4 : 1);
        }
        // sun or moon crossing
        const a = (day * 4 % 1), bx = wx + a * ww, by = wy + wh * (0.75 - Math.sin(a * Math.PI) * 0.6);
        K.ell(g, bx, by, 2.5 * s, 2.5 * s, night ? hx('#f4f0d8') : hx('#fff2a8'));
        if (night) for (let k = 0; k < 10; k++) put(g, wx + K.hash(k, 1) * ww, wy + K.hash(k, 2) * wh * 0.5, hx('#e0e8ff'));
        for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) if (x < wx || x >= wx + ww || y < wy || y >= sill) { const i = y * n + x; if (d[i] !== wall[1] && d[i] !== wall[2]) d[i] = wall[2]; }
        // the weather outside
        if (wthr === 'Rain') for (let k = 0; k < 18; k++) { const x0 = wx + K.hash(k, 3) * ww, y0 = wy + ((K.hash(k, 4) * wh + t * 9) % wh); for (let q = 0; q < 2; q++) if (y0 + q < sill) put(g, x0, y0 + q, mix(sky[1], hx('#3a4a6a'), 0.5)); }
        else if (wthr === 'Snow') for (let k = 0; k < 20; k++) put(g, wx + ((K.hash(k, 3) * ww + Math.sin(t * 0.8 + k) * 1.5 + ww) % ww), wy + ((K.hash(k, 4) * wh + t * 2.2) % wh), WHITE);
        // frame, mullions, sill
        rect(g, wx - s, wy - s, ww + 2 * s, s, frameC[2]); rect(g, wx - s, wy, s, wh, frameC[2]); rect(g, wx + ww, wy, s, wh, frameC[1]); rect(g, wx + ww / 2, wy, s, wh, frameC[2]); rect(g, wx, wy + wh / 2, ww, s, frameC[2]);
        rect(g, wx - 3 * s, sill, ww + 6 * s, 2 * s, frameC[3]); rect(g, wx - 3 * s, sill + 2 * s, ww + 6 * s, s, frameC[1]);
        if (curtains) for (const side of [0, 1]) for (let y = wy - s; y < sill + 6 * s; y++) for (let x = 0; x < 5 * s; x++) { const px = side ? wx + ww + s - x + 2 * s : wx - 3 * s + x; put(g, px, y, ((x + (y >> 2)) & 3) === 0 ? curtains[1] : curtains[2]); }
        // under the sill: a ribbed radiator and a skirting board, so the lower wall is a room, not a gap
        { const rx0 = Math.round(wx + 3 * s), rx1 = Math.round(wx + ww - 3 * s), ry0 = Math.round(sill + 3 * s + Math.max(2, 3 * s)), ry1 = Math.round(n - 3 * s - Math.max(1, s));
          for (let y = ry0; y < ry1; y++) for (let x = rx0; x < rx1; x++) { const f = (x - rx0) % 3; Lr.d[y * n + x] = y === ry0 ? radC[3] : f === 2 ? radC[0] : f === 0 ? radC[2] : radC[1]; }
          rect(Lr, rx0 + s, ry1, Math.max(1, s), Math.max(1, s), radC[0]); rect(Lr, rx1 - 2 * s, ry1, Math.max(1, s), Math.max(1, s), radC[0]);
          K.commit(g, Lr, ink);
          rect(g, 0, n - 2 * s, n, 2 * s, frameC[2]); rect(g, 0, n - 2 * s, n, 1, frameC[3]); }
        // plant and cup
        const px = wx + 3 * s;
        rect(Lr, px, sill - 4 * s, 5 * s, 4 * s, hx('#c0603a')); rect(Lr, px, sill - 4 * s, 5 * s, s, hx('#d8804a'));
        for (let k = 0; k < 5; k++) K.ell(Lr, px + 2.5 * s + (k - 2) * 1.6 * s, sill - 6 * s - (2 - Math.abs(k - 2)) * 1.5 * s, 1.2 * s, 2.2 * s, hx(k & 1 ? '#3f8a2a' : '#5cae3a'));
        K.commit(g, Lr, ink);
        const qx = wx + ww - 6 * s;
        if (thing === 'Cup') { rect(Lr, qx, sill - 4 * s, 3 * s, 4 * s, hx('#f2efe6')); rect(Lr, qx + 3 * s, sill - 3 * s, s, 2 * s, hx('#d8d4cc')); }
        else if (thing === 'Books') { const BK = ['#c23b3b', '#2f6db5', '#e0b030']; for (let k = 0; k < 3; k++) { rect(Lr, qx - s + k * 0.5, sill - (k + 1) * 1.5 * s, 5 * s - k, 1.5 * s, hx(BK[k])); rect(Lr, qx - s + k * 0.5, sill - (k + 1) * 1.5 * s, 1, 1.5 * s, hx('#f2ece0')); } }
        else { K.ell(Lr, qx + 1.5 * s, sill - 2.6 * s, 2.8 * s, 2.6 * s, (x, y, nx, ny) => ny < -0.55 ? 0 : ny < -0.25 ? hx('#cfe8f0') : nx < -0.5 && ny < 0.2 ? hx('#e8f6ff') : hx('#8ac8e0')); const fx = qx + 1.5 * s + Math.sin(t * 0.9) * 1.4 * s; put(Lr, fx, sill - 2 * s, hx('#f28a1e')); put(Lr, fx + (Math.cos(t * 0.9) > 0 ? -1 : 1), sill - 2 * s, hx('#e8622a')); }
        K.commit(g, Lr, ink);
        // the cat: breathing, tail twitch, head lifted while awake
        const breathe = Math.sin(t * 2.2) > 0.3 ? 1 : 0, lift = awake > 0.5 ? s : 0;
        const open = awake > 0.5;
        K.blit(Lr, catSpr, cx - 2 * s, cy - s - (open ? s : 0) * 0, (ch, q, r) => {
          const c = String.fromCharCode(ch), headRow = r <= 6 && q <= 6;
          if (open && headRow && r < 2) return 0;
          return c === 'b' ? cat[0] : c === 'h' || c === 'e' ? cat[1] : c === 'w' ? mix(cat[1], WHITE, 0.6) : c === 'n' ? hx('#f08a9a') : c === 'k' ? (open ? cat[2] : ink) : c === 't' ? cat[0] : 0;
        }, false, s);
        if (breathe) rect(Lr, cx + 6 * s, cy + s, 8 * s, s, cat[0]);
        if (open) { rect(Lr, cx - s, cy - 3 * s, s, 2 * s, cat[1]); rect(Lr, cx + 2 * s, cy - 3 * s, s, 2 * s, cat[1]); }
        if (Math.sin(t * 3) > 0.7) rect(Lr, cx + 12 * s, cy + 5 * s, 2 * s, s, cat[0]);
        K.commit(g, Lr, ink);
      };
    },
  });
})();
