// Set 2 · Sprites: little generated characters and the worlds they move in.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  // ---------- curated pixel palettes, shared by the Set 2 files as X.PIX ----------
  // Each scheme is a ground (darkest first) and ramps of three (shadow, base, light),
  // so every sprite is shaded from one coherent set instead of random inks.
  const hex = h => X.rgb(parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16));
  const SCHEMES = [
    { name: 'Sweetie', ground: ['#1a1c2c', '#333c57', '#29366f'], ramps: [['#5d275d', '#b13e53', '#ef7d57'], ['#b13e53', '#ef7d57', '#ffcd75'], ['#257179', '#38b764', '#a7f070'], ['#29366f', '#3b5dc9', '#41a6f6'], ['#257179', '#41a6f6', '#73eff7'], ['#566c86', '#94b0c2', '#f4f4f4']] },
    { name: 'Pico', ground: ['#000000', '#1d2b53', '#5f574f'], ramps: [['#7e2553', '#ff004d', '#ff77a8'], ['#008751', '#00e436', '#fff1e8'], ['#1d2b53', '#29adff', '#c2c3c7'], ['#ab5236', '#ffa300', '#ffccaa'], ['#5f574f', '#83769c', '#fff1e8'], ['#ab5236', '#ffec27', '#fff1e8']] },
    { name: 'Neon', ground: ['#07020f', '#140829', '#1f0d40'], ramps: [['#3b0a5e', '#b026ff', '#f0a8ff'], ['#0b3d4a', '#00e5ff', '#c4fbff'], ['#4a0b2a', '#ff2a6d', '#ffb3c9'], ['#2e4a0b', '#9dff00', '#eaffb3'], ['#4a3a0b', '#ffd000', '#fff4b3']] },
    { name: 'Ember', ground: ['#170c10', '#2b1418', '#3e2731'], ramps: [['#3e2731', '#a22633', '#e43b44'], ['#733e39', '#be4a2f', '#d77643'], ['#be4a2f', '#feae34', '#fee761'], ['#5a6988', '#8b9bb4', '#c0cbdc'], ['#265c42', '#3e8948', '#63c74d']] },
    { name: 'Ice', ground: ['#0b1021', '#121a33', '#1d2b4a'], ramps: [['#1d3a6b', '#3a7bd5', '#9ad1ff'], ['#2a2a5a', '#6b6bd6', '#c9c9ff'], ['#1a4a4a', '#2ec4b6', '#cbf3f0'], ['#4a4a6a', '#9a9ab8', '#f0f0ff'], ['#5a1a4a', '#d65db1', '#ffc6e8']] },
    { name: 'Game Boy', ground: ['#0f380f', '#0f380f', '#306230'], ramps: [['#0f380f', '#306230', '#8bac0f'], ['#306230', '#8bac0f', '#9bbc0f']] },
    { name: 'Candy', ground: ['#21102b', '#331a40', '#1a0f2b'], ramps: [['#ad2f6b', '#ff6fae', '#ffd1e8'], ['#2f6bad', '#6fd3ff', '#d1f5ff'], ['#6bad2f', '#b8ff6f', '#efffd1'], ['#ad8a2f', '#ffd36f', '#fff5d1'], ['#6b2fad', '#b86fff', '#e8d1ff']] },
    { name: 'Dusk', ground: ['#0d0b1e', '#1b1736', '#2b2350'], ramps: [['#3d2c6b', '#7a4fb8', '#c49bf0'], ['#6b2c4f', '#c4527a', '#f5a3bd'], ['#6b4a2c', '#d18f4a', '#f5d08a'], ['#2c5a6b', '#4fa3b8', '#a3e8f0'], ['#4a4a5a', '#8a8aa0', '#e0e0f0']] },
  ];
  const PACKED = SCHEMES.map(s => ({ name: s.name, ground: s.ground.map(hex), ramps: s.ramps.map(r => r.map(hex)) }));
  const scheme = (R, names) => R.pick(names ? PACKED.filter(s => names.includes(s.name)) : PACKED);
  // for traits: which collection palette a list of packed inks (X.inks) came from, or Spectrum
  const inkName = cols => { const p = U.PALETTES.find(pl => cols.every(c => pl.cols.some(q => U.pk(q) === c))); return p ? p.name : 'Spectrum'; };
  const cap = w => w[0].toUpperCase() + w.slice(1);
  // A mask (rows: 0 empty, 1 body, 2 accent, 3 white, 4 dark) shaded with a ramp and
  // given a one-cell outline: lit from above, so top edges are light and bottom and
  // right edges dark. Returns rows of packed colours (0 = transparent), 2 cells larger.
  function shadeSprite(mask, ramp, accent, line = BLACK) {
    const h = mask.length, w = mask[0].length, out = Array.from({ length: h + 2 }, () => new Uint32Array(w + 2));
    const at = (x, y) => (x >= 0 && y >= 0 && x < w && y < h ? mask[y][x] : 0);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const v = mask[y][x];
      if (!v) continue;
      let c;
      if (v === 3) c = WHITE;
      else if (v === 4) c = line;
      else {
        const r = v === 2 ? accent : ramp, up = at(x, y - 1), dn = at(x, y + 1), rt = at(x + 1, y);
        c = !up ? r[2] : !dn || !rt ? r[0] : r[1];
      }
      out[y + 1][x + 1] = c;
    }
    for (let y = 0; y < h + 2; y++) for (let x = 0; x < w + 2; x++) if (!out[y][x] && (at(x - 2, y - 1) || at(x, y - 1) || at(x - 1, y - 2) || at(x - 1, y))) out[y][x] = line;
    return out;
  }
  // draw shaded rows into the grid; flip mirrors left-right; scale blows cells up
  function blit(g, spr, x0, y0, flip, scale = 1) {
    const { n, d } = g, h = spr.length, w = spr[0].length;
    x0 = Math.round(x0); y0 = Math.round(y0);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const c = spr[y][flip ? w - 1 - x : x];
      if (!c) continue;
      for (let sy = 0; sy < scale; sy++) {
        const yy = y0 + y * scale + sy;
        if (yy < 0 || yy >= n) continue;
        for (let sx = 0; sx < scale; sx++) { const xx = x0 + x * scale + sx; if (xx >= 0 && xx < n) d[yy * n + xx] = c; }
      }
    }
  }
  X.PIX = { hex, SCHEMES: PACKED, scheme, shadeSprite, blit };

  // ---------- 101 Hatchery ----------
  // A creature: a mirrored blob grown by smoothing noise, one connected body,
  // eyes with pupils, legs in two poses, maybe spots, horns or antennae.
  function creatureMasks(R, w, h) {
    const half = Math.ceil(w / 2);
    let m = Array.from({ length: h }, () => new Uint8Array(w));
    const mirror = () => { for (let y = 0; y < h; y++) for (let x = 0; x < half; x++) m[y][w - 1 - x] = m[y][x]; };
    const body = h - 2;
    for (let y = 0; y < body; y++) for (let x = 0; x < half; x++) {
      const cy = Math.abs((y + 0.5) / body - 0.5) * 2, cx = (x + 0.5) / half;
      m[y][x] = R() < 0.45 - 0.35 * cy * cy + 0.45 * cx ? 1 : 0;
    }
    mirror();
    for (let pass = 0; pass < 2; pass++) {
      const nm = m.map(r => r.slice());
      for (let y = 0; y < body; y++) for (let x = 0; x < half; x++) {
        let k = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && y + dy >= 0 && y + dy < body && x + dx >= 0 && x + dx < w && m[y + dy][x + dx]) k++;
        nm[y][x] = k >= 5 ? 1 : k <= 2 ? 0 : m[y][x];
      }
      m = nm; mirror();
    }
    for (let y = 1; y < body - 1; y++) m[y][half - 1] = m[y][w - half] = 1;   // a spine keeps it in one piece
    // spots or a belly patch in the accent colour
    const deco = R.pick(['spots', 'belly', 'none', 'stripe']);
    for (let y = 1; y < body - 1; y++) for (let x = 1; x < half; x++) {
      if (!m[y][x] || !m[y - 1][x] || !m[y + 1][x] || !m[y][x - 1]) continue;
      if ((deco === 'spots' && R() < 0.12) || (deco === 'belly' && y > body * 0.55 && x > half * 0.45) || (deco === 'stripe' && y % 3 === 0)) { m[y][x] = 2; m[y][w - 1 - x] = 2; }
    }
    // horns or antennae on the top row
    if (R.bool(0.5)) { let top = 0; while (top < body && !m[top][half - 2]) top++; const hx = Math.max(0, half - R.int(2, 3)); if (top > 0) { m[top - 1][hx] = m[top - 1][w - 1 - hx] = 2; } }
    // eyes: the highest row with room, a white cell and a pupil
    let ey = -1, ex = -1;
    for (let y = 1; y < body * 0.6 && ey < 0; y++) for (let x = Math.max(1, half - 3); x >= 1; x--) if (m[y][x] && m[y][x - 1] && m[y - 1][x] && m[y + 1][x]) { ey = y; ex = x; break; }
    if (ey < 0) { ey = Math.max(1, body >> 2); ex = Math.max(1, half - 2); }
    // legs: under the body, in two poses
    const legs = [];
    for (let x = 0; x < half - 1; x++) if (m[body - 1][x] && (legs.length === 0 || x - legs[legs.length - 1] > 1) && R() < 0.55) legs.push(x);
    if (!legs.length) legs.push(Math.max(0, half - 2));
    const frames = [];
    for (let pose = 0; pose < 2; pose++) for (let eye = 0; eye < 3; eye++) {
      const f = m.map(r => r.slice());
      for (const lx of legs) {
        const ox = pose ? (lx & 1 ? 1 : -1) : 0;
        f[body][lx] = f[body][w - 1 - lx] = 1;
        const bx = Math.max(0, Math.min(half - 1, lx + ox));
        f[body + 1][bx] = f[body + 1][w - 1 - bx] = 1;
      }
      // eye: 0 looking right, 1 looking left, 2 shut
      const L = [ex, w - 1 - ex];
      for (const x of L) { f[ey][x] = eye === 2 ? 4 : 3; }
      if (eye < 2) { const dx = eye === 0 ? 1 : -1; for (const x of L) if (f[ey][x + dx] !== undefined && f[ey][x + dx]) f[ey][x + dx] = 4; }
      frames.push(f);
    }
    return frames;
  }

  P.addPixel({
    name: 'Hatchery', fam: 'Sprites', sizes: [50, 80], fps: 8,
    listens: 'Clap and the creatures hop.',
    recipe: 'A nursery of creatures, each a mirrored body grown from noise and shaded from one palette: they bob, look about, blink and shuffle their feet, and now and then an egg wobbles, cracks and hatches a new one.',
    make(R, U, g) {
      const { n, d } = g, sc = scheme(R), k = R.pick([1, 2, 2, 3, 3, 4]), cell = n / k, inp = g.input;
      // two to a row on the big grid: draw them at double size so they fill their cells
      const big2 = k === 2 && n >= 80;
      const sz = big2 ? Math.min(15, Math.max(7, Math.round(cell * 0.72 / 2) - 2)) : Math.min(15, Math.max(7, Math.round(cell * 0.62))), scale = big2 ? 2 : Math.max(1, Math.floor(cell * 0.8 / (sz + 2)));
      const ground = sc.ground[0], floor = sc.ground[1], line = BLACK;
      const deco = R.pick(['plain', 'grid', 'dots', 'nests']);
      g.trait('Palette', sc.name); g.trait('Brood', k * k); g.trait('Floor', cap(deco)); g.trait('Grid', n);
      const shell = [hex('#8a7a66'), hex('#e8dcc4'), WHITE];
      const make = (born) => {
        const w = sz | 1, frames = creatureMasks(R, w, sz), ramp = R.pick(sc.ramps), accent = R.pick(sc.ramps.filter(r => r !== ramp)) || ramp;
        const egg = Array.from({ length: sz }, (_, y) => Uint8Array.from({ length: w }, (_, x) => { const u = (x + 0.5 - w / 2) / (w * 0.42), v = (y + 0.5 - sz * 0.55) / (sz * 0.5); return u * u + v * v * (v < 0 ? 0.8 : 1) < 1 ? (R() < 0.08 ? 2 : 1) : 0; }));
        return { spr: frames.map(f => shadeSprite(f, ramp, accent, line)), egg: shadeSprite(egg, shell, accent, line), w: w + 2, h: sz + 2, phase: R.int(0, 30), blink: R.int(24, 60), look: R.int(30, 90), born };
      };
      const herd = Array.from({ length: k * k }, () => make(-10));
      let next = k === 1 ? 7 : 2;
      const hops = new Float32Array(k * k).fill(-9), alt = g.alt, nestDark = X.mixPk(sc.ramps[0][0], BLACK, 0.3);
      return (t, dt, f) => {
        // Listen: a clap sets every creature hopping, each a moment after the last
        if (inp.listening && inp.beats()) for (let j = 0; j < hops.length; j++) if (t - hops[j] > 0.5) hops[j] = t + alt() * 0.25;
        d.fill(ground);
        if (deco === 'grid') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (x % cell < 1 || y % cell < 1) d[y * n + x] = floor; }
        if (deco === 'dots') for (let y = 2; y < n; y += 4) for (let x = (y >> 2) & 1 ? 2 : 0; x < n; x += 4) d[y * n + x] = floor;
        if (t > next) { next = t + R.range(1.6, 3.2) * (k === 1 ? 4 : k === 2 ? 2 : 1); herd[R.int(0, herd.length - 1)] = make(t); }
        herd.forEach((c, j) => {
          const W = c.w * scale, H = c.h * scale, cx = (j % k) * cell + (cell - W) / 2, cy = (j / k | 0) * cell + (cell - H) / 2;
          // a nest or a soft oval shadow underneath (smaller while the creature is in the air)
          const hp = t - hops[j], air = hp > 0 && hp < 0.45 ? Math.sin(hp / 0.45 * Math.PI) : 0, lift = Math.round(air * 3) * scale;
          const sy = Math.round(cy + H - scale), rx = W * (deco === 'nests' ? 0.55 : 0.4) * (1 - air * 0.3), ry = scale + 0.5, mx = cx + W / 2;
          for (let y = -scale; y <= scale; y++) {
            const w = rx * Math.sqrt(Math.max(0, 1 - (y / ry) ** 2));
            for (let x = Math.round(mx - w); x < Math.round(mx + w); x++) X.put(g, x, sy + y, deco === 'nests' ? ((x + y) & 1 ? sc.ramps[0][0] : y > 0 ? nestDark : floor) : floor);
          }
          const age = t - c.born;
          if (age < 1.6) {                     // an egg wobbles, then cracks
            const wob = age < 1.1 ? Math.round(Math.sin(age * 22) * (age > 0.5 ? 1 : 0)) * scale : 0;
            blit(g, c.egg, cx + wob, cy, false, scale);
            if (age > 1.1) { const yy = Math.round(cy + H * 0.45); for (let x = 2; x < c.w - 2; x++) X.rect(g, cx + x * scale, yy + ((x & 1) ? 0 : scale), scale, scale, line); }
            return;
          }
          const pose = ((f + c.phase) >> 2) & 1, blink = (f + c.phase) % c.blink < 2, look = ((f + c.phase) / c.look | 0) & 1;
          const spr = c.spr[pose * 3 + (blink ? 2 : look)], bob = pose ? 0 : scale;
          blit(g, spr, cx, cy + bob - scale - lift, false, scale);
          if (age < 2.2) {                     // the shell's halves fall away
            const a = (age - 1.6) / 0.6, top = c.egg.slice(0, c.h >> 1);
            blit(g, top, cx - a * 4 * scale, cy - a * 6 * scale, false, scale);
          }
        });
      };
    },
  });

  // ---------- 102 Fleet ----------
  // A ship faces right: a hull that tapers to the nose, swept wings, tail fins,
  // a canopy, engines at the back; shaded with light from above.
  function shipSprite(R, L, ramp, accent, glass) {
    const H = Math.max(3, Math.round(L * R.range(0.26, 0.38))), h = 2 * H + 1, w = L, mid = H;
    const m = Array.from({ length: h }, () => new Uint8Array(w));
    const hullW = R.range(0.3, 0.55), noseLen = R.range(0.2, 0.4), wingAt = R.range(0.12, 0.45), wingLen = R.range(0.2, 0.38), span = R.range(0.7, 1), fins = R.bool(0.6), finH = R.range(0.4, 0.8);
    for (let x = 0; x < w; x++) {
      const u = x / (w - 1);
      let e = H * hullW;
      if (u > 1 - noseLen) e *= Math.pow((1 - u) / noseLen, 0.6);
      if (u < 0.06) e *= 0.8;
      if (u >= wingAt && u <= wingAt + wingLen) e = Math.max(e, H * span * (1 - (u - wingAt) / wingLen * 0.85));
      if (fins && u < 0.14) e = Math.max(e, H * finH * (1 - u / 0.14));
      const top = Math.round(e);
      for (let y = mid - top; y <= mid + top; y++) if (y >= 0 && y < h) m[y][x] = 1;
    }
    // accent bands across the wings and a stripe down the hull
    const band = Math.round((wingAt + wingLen * 0.5) * (w - 1));
    for (let y = 0; y < h; y++) if (m[y][band] && Math.abs(y - mid) > 1) m[y][band] = 2;
    if (R.bool(0.5)) for (let x = 2; x < w - 3; x++) if (m[mid][x]) m[mid][x] = 2;
    // canopy
    const cp = Math.round(w * R.range(0.62, 0.78));
    for (let x = cp; x < Math.min(w - 1, cp + R.int(2, 3)); x++) if (m[mid - 1] && m[mid - 1][x]) m[mid - 1][x] = 5;
    // engines
    for (let y = mid - 1; y <= mid + 1; y++) if (m[y][0]) m[y][0] = 4;
    const out = Array.from({ length: h + 2 }, () => new Uint32Array(w + 2));
    const at = (x, y) => (x >= 0 && y >= 0 && x < w && y < h ? m[y][x] : 0);
    // lit from above like a cylinder: a bright band along the top of each column,
    // the base colour, a half shadow and a dark underside, with a glint on the long hull
    for (let x = 0; x < w; x++) {
      let top = -1, bot = -1;
      for (let y = 0; y < h; y++) if (m[y][x]) { if (top < 0) top = y; bot = y; }
      if (top < 0) continue;
      const span = Math.max(1, bot - top), mids = x > w * 0.2 && x < w * 0.75;
      for (let y = top; y <= bot; y++) {
        const v = m[y][x];
        if (!v) continue;
        let c;
        if (v === 4) c = y === top ? hex('#4a4a56') : hex('#2a2a33');
        else if (v === 5) c = y < mid - 1 || !at(x, y - 1) ? glass[2] : glass[1];
        else {
          const r = v === 2 ? accent : ramp, q = (y - top) / span;
          c = !at(x, y - 1) || q < 0.17 ? r[2] : q < 0.5 ? r[1] : q < 0.78 || at(x, y + 1) ? X.mixPk(r[1], r[0], 0.55) : r[0];
          if (mids && v === 1 && y === top + 1 && span >= 4) c = X.mixPk(r[2], WHITE, 0.45);
        }
        out[y + 1][x + 1] = c;
      }
    }
    for (let y = 0; y < h + 2; y++) for (let x = 0; x < w + 2; x++) if (!out[y][x] && (at(x - 2, y - 1) || at(x, y - 1) || at(x - 1, y - 2) || at(x - 1, y))) out[y][x] = BLACK;
    return { spr: out, w: w + 2, h: h + 2, mid: mid + 1 };
  }

  P.addPixel({
    name: 'Fleet', seed: 1, fam: 'Sprites', sizes: [80, 100], fps: 12,
    recipe: 'Ships drawn by the dice: tapered hulls, swept wings, fins and canopies, each shaded from one palette and lit from above, crossing three depths of stars. A convoy, a patrol turning at the edges, or two squadrons trading fire.',
    make(R, U, g) {
      const { n, d } = g, sc = scheme(R, ['Sweetie', 'Pico', 'Ember', 'Ice', 'Dusk', 'Neon']), mode = R.pick(['convoy', 'convoy', 'patrol', 'skirmish']);
      const glass = [hex('#1d3a6b'), hex('#41a6f6'), hex('#c4fbff')], space = R.bool(0.7) ? BLACK : sc.ground[0];
      const stars = Array.from({ length: Math.round(n * n / 60) }, () => ({ x: R.range(0, n), y: R.int(0, n - 1), z: R.pick([0.12, 0.3, 0.7]) }));
      const planet = R.bool(0.5) ? { x: R.range(0.1, 0.9) * n, y: R.pick([-0.15, 1.1]) * n, r: R.range(0.25, 0.45) * n, ramp: R.pick(sc.ramps) } : null;
      const flame = [WHITE, hex('#ffec27'), hex('#ffa300'), hex('#ff004d')];
      const ship = (side) => {
        const L = R.pick([16, 20, 24, 28, 32, 36].map(v => Math.round(v * n / 100))), ramp = R.pick(sc.ramps), accent = R.pick(sc.ramps);
        const s = shipSprite(R, L, ramp, accent, glass);
        // the first fleet starts on screen (new ships still fly in from the edges)
        return Object.assign(s, { x: R.range(0, n - s.w), y: R.range(2, n - s.h - 2), v: (0.25 + 6 / L) * R.range(0.6, 1) * side, bob: R.range(0, 6), side, cool: R.int(0, 30) });
      };
      const count = R.int(3, 5);
      g.trait('Palette', sc.name); g.trait('Formation', cap(mode)); g.trait('Ships', count); g.trait('Planet', planet ? 'Yes' : 'None'); g.trait('Space', space === BLACK ? 'Black' : 'Tinted');
      const fleet = Array.from({ length: count }, (_, i) => ship(mode === 'skirmish' ? (i & 1 ? -1 : 1) : 1)).sort((a, b) => a.w - b.w);
      const bolts = [], booms = [];
      return (t, dt, f) => {
        d.fill(space);
        for (const s of stars) {
          s.x -= s.z * (mode === 'patrol' ? 0.3 : 1); if (s.x < 0) { s.x += n; s.y = R.int(0, n - 1); }
          X.put(g, s.x, s.y, s.z > 0.5 ? WHITE : s.z > 0.2 ? 0xffa0a0a0 : 0xff505050);
        }
        if (planet) {
          const { x: px, y: py, r, ramp } = planet;
          for (let y = Math.max(0, Math.floor(py - r)); y < Math.min(n, py + r); y++) for (let x = Math.max(0, Math.floor(px - r)); x < Math.min(n, px + r); x++) {
            const dx = (x + 0.5 - px) / r, dy = (y + 0.5 - py) / r, q = dx * dx + dy * dy;
            if (q > 1) continue;
            const lit = -dx * 0.6 - dy * 0.5 + Math.sqrt(1 - q) * 0.6, band = Math.sin((dy + Math.sin(dx * 3) * 0.08) * 14) * 0.15;
            const v = lit + band + (X.dith4(x, y) - 0.5) * 0.35;
            d[y * n + x] = v > 0.55 ? ramp[2] : v > 0.15 ? ramp[1] : v > -0.25 ? ramp[0] : sc.ground[1];
          }
        }
        for (const s of fleet) {
          if (mode === 'patrol' && (s.x > n - s.w - 2 && s.v > 0 || s.x < 2 && s.v < 0) && R() < 0.05) s.v = -s.v;
          s.x += s.v;
          if (s.v > 0 && s.x > n + 4) Object.assign(s, ship(s.side), { x: -s.w - R.range(0, 20) });
          if (s.v < 0 && s.x < -s.w - 4) Object.assign(s, ship(s.side), { x: n + R.range(0, 20) });
          const flip = s.v < 0, x0 = Math.round(s.x), y0 = Math.round(s.y + Math.sin(t * 0.8 + s.bob));
          blit(g, s.spr, x0, y0, flip);
          const len = 2 + ((f + s.bob * 3 | 0) & 1) + (s.w > 20 ? 1 : 0);
          for (let k = 0; k < len; k++) {
            const fx = flip ? x0 + s.w + k : x0 - 1 - k, c = flame[Math.min(3, k)];
            X.put(g, fx, y0 + s.mid, c);
            if (s.h > 9 && k < len - 1) { X.put(g, fx, y0 + s.mid - 1, flame[Math.min(3, k + 1)]); X.put(g, fx, y0 + s.mid + 1, flame[Math.min(3, k + 1)]); }
          }
          if (mode === 'skirmish' && --s.cool < 0 && s.x > 0 && s.x < n - s.w) {
            s.cool = R.int(15, 40);
            bolts.push({ x: flip ? x0 : x0 + s.w, y: y0 + s.mid, v: Math.sign(s.v) * 2.5, c: s.side > 0 ? hex('#ff004d') : hex('#00e436'), life: 60 });
          }
        }
        for (let i = bolts.length - 1; i >= 0; i--) {
          const b = bolts[i]; b.x += b.v; b.life--;
          X.put(g, b.x, b.y, WHITE); X.put(g, b.x - Math.sign(b.v), b.y, b.c); X.put(g, b.x - 2 * Math.sign(b.v), b.y, b.c);
          const hit = fleet.find(s => s.side * b.v < 0 && b.x > s.x && b.x < s.x + s.w && b.y > s.y && b.y < s.y + s.h);
          if (hit || b.life < 0 || b.x < 0 || b.x > n) { if (hit) booms.push({ x: b.x, y: b.y, a: 0 }); bolts.splice(i, 1); }
        }
        for (let i = booms.length - 1; i >= 0; i--) {
          const b = booms[i]; b.a += 1;
          const r = b.a * 0.7;
          for (let k = 0; k < 10; k++) { const a = k / 10 * U.TAU; X.put(g, b.x + Math.cos(a) * r, b.y + Math.sin(a) * r, flame[Math.min(3, b.a >> 1)]); }
          if (b.a > 6) booms.splice(i, 1);
        }
      };
    },
  });

  // ---------- 103 Herbarium ----------
  P.addPixel({
    name: 'Herbarium', seed: 2, fam: 'Sprites', sizes: [80, 100], fps: 10,
    recipe: 'Potted plants grown from rules on a shelf, a window sill or a greenhouse bench: stems fork, leaves bud along them and flowers open at the tips; ferns unroll, cacti swell and vines climb. When all have bloomed, a new set is planted.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 6, 0.4);
      let plants = [], wall, shelf, wallTone;
      const GROW = 12, HOLD = 5, CYCLE = GROW + HOLD + 1.5;
      const green = [0xff2e9e4a, 0xff1f7a3a, 0xff5bc46a, 0xff3fae7c, 0xff78c850].map(c => c);
      const plant = (x0, y0, kind) => {
        const segs = [], leaves = [], flowers = [], flower = inks[R.int(0, inks.length - 1)], leaf = R.pick(green);
        const grow = (x, y, ang, len, depth, t0) => {
          const x1 = x + Math.cos(ang) * len, y1 = y - Math.sin(ang) * len, t1 = t0 + len / 9;
          segs.push({ x, y, x1, y1, t0, t1 });
          if (kind !== 'cactus') for (let k = 0.4; k < 1; k += R.range(0.25, 0.45)) leaves.push({ x: x + (x1 - x) * k, y: y + (y1 - y) * k, side: R.sign(), t: t0 + (t1 - t0) * k + 0.4 });
          if (depth <= 0 || len < 3) { flowers.push({ x: x1, y: y1, t: t1 + R.range(0.5, 2) }); return; }
          const forks = kind === 'tulip' ? 0 : R.int(1, 3);
          if (!forks) { flowers.push({ x: x1, y: y1, t: t1 + 1 }); return; }
          for (let k = 0; k < forks; k++) grow(x1, y1, ang + R.range(-0.7, 0.7), len * R.range(0.55, 0.8), depth - 1, t1);
        };
        if (kind === 'cactus') {
          const h = R.int(10, 18);
          segs.push({ x: x0, y: y0, x1: x0, y1: y0 - h, t0: 0, t1: 5, w: 2 });
          for (let k = 0; k < R.int(1, 3); k++) { const ay = y0 - R.int(4, h - 3), s = R.sign(); segs.push({ x: x0, y: ay, x1: x0 + 3 * s, y1: ay, t0: 3, t1: 4, w: 1 }, { x: x0 + 3 * s, y: ay, x1: x0 + 3 * s, y1: ay - R.int(3, 6), t0: 4, t1: 6, w: 1 }); }
          flowers.push({ x: x0, y: y0 - h - 1, t: 8 });
        } else grow(x0, y0, Math.PI / 2 + R.range(-0.15, 0.15), R.range(13, 20) * n / 100 * 1.25, kind === 'tulip' ? 0 : R.int(2, 3), 0);
        return { segs, leaves, flowers, flower, leaf, kind };
      };
      const plantShelf = () => {
        wallTone = X.shade(inks[R.int(0, inks.length - 1)], 0.3); wall = wallTone; shelf = X.shade(inks[R.int(0, inks.length - 1)], 0.5);
        const k = R.int(3, 5), base = n - Math.round(n * 0.14);
        plants = Array.from({ length: k }, (_, i) => ({ ...plant(Math.round((i + 0.5) * n / k), base - 7, R.pick(['bush', 'bush', 'tulip', 'cactus'])), px: Math.round((i + 0.5) * n / k), base, pot: inks[R.int(0, inks.length - 1)] }));
      };
      plantShelf();
      g.trait('Setting', 'Wall shelf'); g.trait('Palette', inkName(inks)); g.trait('Pots', plants.length); g.trait('Cacti', plants.filter(p => p.kind === 'cactus').length); g.trait('Grid', n);
      let cyc = 0;
      return t => {
        t += 7;   // open on plants already sprouting, not on empty pots
        const k = Math.floor(t / CYCLE);
        if (k !== cyc) { cyc = k; plantShelf(); }
        const local = t - k * CYCLE, grown = local * 0.85, fade = local > GROW + HOLD ? 1 - (local - GROW - HOLD) / 1.5 : 1, base = plants[0].base;
        // the wall a little darker toward the top, as if lit from the shelf's window side
        for (let y = 0; y < n; y++) d.fill(y > base ? shelf : X.shade(X.dith4(0, y) < 0.5 && y % 8 === 0 ? X.shade(wall, 1.25) : wall, 0.8 + 0.2 * Math.min(1, y / base + (X.dith4(y, 0) - 0.5) * 0.08)), y * n, y * n + n);
        X.rect(g, 0, base, n, 2, X.shade(shelf, 1.6)); X.rect(g, 0, base + 2, n, 1, X.shade(shelf, 0.7));
        for (const p of plants) {
          // pot, with its shadow falling right onto the wall
          X.rect(g, p.px + 5, base - 6, 2, 6, X.shade(wall, 0.72));
          for (let y = 0; y < 7; y++) { const w = 5 - (y >> 2); X.rect(g, p.px - w, p.base - 7 + y, w * 2, 1, y === 0 ? X.shade(p.pot, 1.3) : X.shade(p.pot, 1 - y * 0.05)); X.put(g, p.px + w - 1, p.base - 7 + y, X.shade(p.pot, 0.72 - y * 0.03)); }
          for (const s of p.segs) {
            if (grown < s.t0) continue;
            const u = Math.min(1, (grown - s.t0) / (s.t1 - s.t0)), col = p.kind === 'cactus' ? 0xff3a9a52 : X.shade(p.leaf, 0.8);
            X.line(g, s.x, s.y, s.x + (s.x1 - s.x) * u, s.y + (s.y1 - s.y) * u, (x, y) => { X.put(g, x, y, col); if (s.w) for (let q = 1; q <= s.w; q++) { X.put(g, x - q, y, X.shade(col, 0.8)); X.put(g, x + q, y, X.shade(col, 1.15)); } });
          }
          for (const l of p.leaves) if (grown > l.t) { X.put(g, l.x + l.side, l.y, p.leaf); X.put(g, l.x + 2 * l.side, l.y - 1, p.leaf); X.put(g, l.x + l.side, l.y - 1, X.shade(p.leaf, 1.25)); }
          for (const fl of p.flowers) {
            if (grown < fl.t) continue;
            const open = Math.min(1, (grown - fl.t) / 1.2), cx = Math.round(fl.x), cy = Math.round(fl.y);
            if (open < 0.5) { X.put(g, cx, cy, X.shade(p.flower, 0.7)); continue; }
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) X.put(g, cx + dx, cy + dy, p.flower);
            if (open >= 1) for (const [dx, dy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) X.put(g, cx + dx, cy + dy, X.shade(p.flower, 0.7));
            X.put(g, cx, cy, 0xff40e0ff);
          }
        }
        if (fade < 1) U.fadePx(d, fade);
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, sc = scheme(R, ['Sweetie', 'Pico', 'Ember', 'Candy', 'Dusk']);
      const setting = R.pick(['shelf', 'window', 'bench']);
      let plants = [], cyc = -1;
      const GROW = 12, HOLD = 5, CYCLE = GROW + HOLD + 1.5;
      const greens = [['#1f4d2b', '#2e8a3e', '#7fd068'], ['#1d3d2a', '#3e8948', '#a7f070'], ['#24402a', '#4f7a3a', '#b5c96a'], ['#173d3a', '#2a7a6a', '#7ad0b0']].map(r => r.map(hex));
      const plant = (x0, y0, kind) => {
        const segs = [], leaves = [], flowers = [], flower = R.pick(sc.ramps), leaf = R.pick(greens);
        const grow = (x, y, ang, len, depth, t0) => {
          const x1 = x + Math.cos(ang) * len, y1 = y - Math.sin(ang) * len, t1 = t0 + len / 9;
          segs.push({ x, y, x1, y1, t0, t1 });
          if (kind !== 'cactus') for (let k = 0.35; k < 1; k += R.range(0.2, 0.4)) leaves.push({ x: x + (x1 - x) * k, y: y + (y1 - y) * k, side: R.sign(), t: t0 + (t1 - t0) * k + 0.4, big: kind === 'fern' || R.bool(0.3) });
          if (depth <= 0 || len < 3) { if (kind !== 'fern') flowers.push({ x: x1, y: y1, t: t1 + R.range(0.5, 2) }); return; }
          const forks = kind === 'tulip' ? 0 : kind === 'fern' ? 2 : R.int(1, 3);
          if (!forks) { flowers.push({ x: x1, y: y1, t: t1 + 1 }); return; }
          for (let k = 0; k < forks; k++) grow(x1, y1, ang + (kind === 'fern' ? (k ? 0.6 : -0.6) : R.range(-0.7, 0.7)), len * R.range(0.55, 0.8), depth - 1, t1);
        };
        if (kind === 'cactus') {
          const h = R.int(10, 18) * n / 100;
          segs.push({ x: x0, y: y0, x1: x0, y1: y0 - h, t0: 0, t1: 5, w: 2 });
          for (let k = 0; k < R.int(1, 3); k++) { const ay = y0 - R.int(4, Math.max(5, h - 3)), s = R.sign(); segs.push({ x: x0, y: ay, x1: x0 + 3 * s, y1: ay, t0: 3, t1: 4, w: 1 }, { x: x0 + 3 * s, y: ay, x1: x0 + 3 * s, y1: ay - R.int(3, 6), t0: 4, t1: 6, w: 1 }); }
          flowers.push({ x: x0, y: y0 - h - 1, t: 8 });
        } else grow(x0, y0, Math.PI / 2 + R.range(-0.15, 0.15), R.range(13, 22) * n / 100 * 1.25, kind === 'tulip' ? 0 : kind === 'fern' ? 3 : R.int(2, 3), 0);
        return { segs, leaves, flowers, flower, leaf, kind };
      };
      const plantSet = () => {
        const k = R.int(3, 5), base = n - Math.round(n * (setting === 'bench' ? 0.2 : 0.14));
        plants = Array.from({ length: k }, (_, i) => ({ ...plant(Math.round((i + 0.5) * n / k), base - 7, R.pick(['bush', 'bush', 'tulip', 'cactus', 'fern'])), px: Math.round((i + 0.5) * n / k), base, pot: R.pick(sc.ramps), potShape: R.pick(['flower', 'tin', 'bowl']) }));
        if (!g.traits.some(t => t[0] === 'Pots')) { g.trait('Pots', plants.length); g.trait('Cacti', plants.filter(p => p.kind === 'cactus').length); g.trait('Ferns', plants.filter(p => p.kind === 'fern').length); }
      };
      g.trait('Setting', { shelf: 'Shelf', window: 'Window sill', bench: 'Greenhouse' }[setting]); g.trait('Palette', sc.name); g.trait('Grid', n);
      const wall = sc.ground[1], wallLo = sc.ground[0], wood = [hex('#4a2c1a'), hex('#7a4a2a'), hex('#b07a4a')], sky = R.pick(sc.ramps);
      return t => {
        t += 7;   // open on plants already sprouting, not on empty pots
        const k = Math.floor(t / CYCLE);
        if (k !== cyc) { cyc = k; plantSet(); }
        const local = t - k * CYCLE, grown = local * 0.85, fade = local > GROW + HOLD ? 1 - (local - GROW - HOLD) / 1.5 : 1, base = plants[0].base;
        for (let y = 0; y < n; y++) d.fill(y >= base ? wood[1] : wall, y * n, y * n + n);
        if (setting === 'window') {          // a window with sky behind the plants
          const x0 = Math.round(n * 0.12), x1 = Math.round(n * 0.88), y0 = Math.round(n * 0.1);
          for (let y = y0; y < base; y++) for (let x = x0; x < x1; x++) { const v = (y - y0) / (base - y0) + (X.dith4(x, y) - 0.5) * 0.3; d[y * n + x] = v < 0.35 ? sky[2] : v < 0.75 ? sky[1] : X.mixPk(sky[1], sky[2], 0.5); }
          X.rect(g, x0 - 2, y0 - 2, x1 - x0 + 4, 2, wood[2]); X.rect(g, x0 - 2, y0, 2, base - y0, wood[1]); X.rect(g, x1, y0, 2, base - y0, wood[0]); X.rect(g, (x0 + x1) >> 1, y0, 1, base - y0, wood[1]);
        } else if (setting === 'bench') {    // greenhouse panes
          for (let y = 0; y < base; y++) for (let x = 0; x < n; x++) if (x % 20 === 0 || y % 20 === 0) d[y * n + x] = wallLo; else if ((x + y) % 23 === 0) d[y * n + x] = X.mixPk(wall, WHITE, 0.15);
        } else for (let y = 6; y < base; y += 8) X.rect(g, 0, y, n, 1, wallLo);
        X.rect(g, 0, base, n, 1, wood[2]); X.rect(g, 0, base + 1, n, 1, wood[1]); X.rect(g, 0, base + 3, n, n, wood[0]);
        if (setting === 'bench') for (let x = 4; x < n; x += Math.round(n / 3)) X.rect(g, x, base + 3, 3, n, wood[1]);
        for (const p of plants) {
          // pot, with its shadow falling right onto the wall or the window
          X.rect(g, p.px + 5, p.base - 6, 2, 6, X.mixPk(d[(p.base - 3) * n + Math.min(n - 1, p.px + 6)], BLACK, 0.35));
          const pr = p.pot;
          for (let y = 0; y < 7; y++) {
            const w = p.potShape === 'tin' ? 4 : p.potShape === 'bowl' ? 6 - (y > 3 ? y - 3 : 0) : 5 - (y >> 2);
            for (let x = -w; x < w; x++) X.put(g, p.px + x, p.base - 7 + y, y === 0 ? pr[2] : x < -w + 2 ? pr[2] : x >= w - 2 ? pr[0] : pr[1]);
            X.put(g, p.px - w - 1, p.base - 7 + y, BLACK); X.put(g, p.px + w, p.base - 7 + y, BLACK);
          }
          X.rect(g, p.px - 5, p.base - 8, 10, 1, hex('#3a2416'));
          for (const s of p.segs) {
            if (grown < s.t0) continue;
            const u = Math.min(1, (grown - s.t0) / (s.t1 - s.t0)), col = p.kind === 'cactus' ? p.leaf[1] : p.leaf[0];
            X.line(g, s.x, s.y, s.x + (s.x1 - s.x) * u, s.y + (s.y1 - s.y) * u, (x, y) => { X.put(g, x, y, col); if (s.w) for (let q = 1; q <= s.w; q++) { X.put(g, x - q, y, p.leaf[q === s.w ? 0 : 1]); X.put(g, x + q, y, p.leaf[q === s.w ? 0 : 2]); } });
          }
          for (const l of p.leaves) if (grown > l.t) {
            const lx = Math.round(l.x), ly = Math.round(l.y), s = l.side;
            X.put(g, lx + s, ly, p.leaf[1]); X.put(g, lx + 2 * s, ly - 1, p.leaf[1]); X.put(g, lx + s, ly - 1, p.leaf[2]);
            if (l.big) { X.put(g, lx + 3 * s, ly - 1, p.leaf[1]); X.put(g, lx + 2 * s, ly, p.leaf[0]); X.put(g, lx + 3 * s, ly - 2, p.leaf[2]); }
          }
          for (const fl of p.flowers) {
            if (grown < fl.t) continue;
            const open = Math.min(1, (grown - fl.t) / 1.2), cx = Math.round(fl.x), cy = Math.round(fl.y), c = p.flower;
            if (open < 0.5) { X.put(g, cx, cy, c[0]); X.put(g, cx, cy - 1, c[1]); continue; }
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) X.put(g, cx + dx, cy + dy, c[1]);
            if (open >= 1) { for (const [dx, dy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) X.put(g, cx + dx, cy + dy, c[0]); X.put(g, cx - 1, cy - 1, c[2]); }
            X.put(g, cx, cy, hex('#ffec27'));
          }
        }
        if (fade < 1) U.fadePx(d, fade);
      };
      }

    },
  });

  // ---------- 104 Sitters ----------
  // A 20 x 20 portrait drawn like a pixel artist would: an oval head with a
  // shadowed side, ears, brows, eyes with whites and pupils, a nose shadow, lips,
  // hair in a style with its own highlight, and a collar.
  const SKINS = [['#5b3a29', '#8d5a3b', '#b97a50'], ['#7a4a2f', '#b5784c', '#d9a066'], ['#a0613f', '#d9956a', '#f2c39b'], ['#c48a63', '#eab48f', '#fcd9bd'], ['#3d261b', '#6b4430', '#99643f'], ['#8a5a44', '#c98f6f', '#efc4a4']].map(r => r.map(hex));
  const HAIRS = [['#0f0f14', '#24242e', '#454558'], ['#2e1b10', '#5a3620', '#8a5a34'], ['#8a6420', '#d4a83a', '#f5df8a'], ['#5e1e0e', '#a83c18', '#e07a3d'], ['#5a5a62', '#9a9aa4', '#e0e0e8']].map(r => r.map(hex));
  const RIMS = ['#6a6a7c', '#8a5a2e', '#c49a3a', '#a83c3c'].map(hex);
  function portrait(R, sc, alt) {
    const skin = R.pick(SKINS), hair = R.bool(0.2) ? R.pick(sc.ramps) : R.pick(HAIRS);
    return {
      skin, hair, bg: R.pick(sc.ramps)[R.int(0, 1)], shirt: R.pick(sc.ramps), lip: X.mixPk(skin[0], hex('#b13e53'), 0.5),
      style: R.pick(['short', 'long', 'bob', 'afro', 'bun', 'mohawk', 'bald', 'cap', 'side']), wide: R.int(5, 6), jaw: R.bool(0.5),
      glasses: R.bool(0.22), earring: R.bool(0.2), beard: R.bool(0.15), freckles: R.bool(0.15), blush: R.bool(0.25), smile: R.bool(0.6),
      hat: R.pick(sc.ramps), blink: R.int(24, 60), phase: R.int(0, 60), look: R.int(40, 120), born: 0, rim: alt ? alt.pick(RIMS) : RIMS[0],
    };
  }
  // mood (Listen): attn 0..1 makes a sitter look at you with raised brows; open 0..1 opens the mouth
  function drawPortrait(buf, s, f, attn = 0, open = 0) {
    const S = 20, set = (x, y, c) => { if (x >= 0 && y >= 0 && x < S && y < S) buf[y * S + x] = c; };
    const sk = s.skin, hr = s.hair, cx = 9.5, cy = 9, rx = s.wide, ry = 6.5;
    buf.fill(s.bg);
    for (let y = 0; y < S; y += 2) for (let x = (y >> 1) & 1; x < S; x += 4) set(x, y, X.mixPk(s.bg, BLACK, 0.12));
    // long hair falls behind the shoulders
    if (s.style === 'long' || s.style === 'side') for (let y = 5; y < 17; y++) for (let x = 2; x < 18; x++) if (Math.abs(x + 0.5 - cx) > rx - 1 && Math.abs(x + 0.5 - cx) < rx + 2.5) set(x, y, x < cx ? hr[1] : hr[0]);
    // shoulders and collar
    for (let y = 16; y < S; y++) for (let x = 2; x < 18; x++) { const e = 3 + (S - 1 - y) * 1.5; if (Math.abs(x + 0.5 - cx) < 8.5 - (S - 1 - y) * 0.6 + 0.5) set(x, y, x < cx - 3 ? s.shirt[2] : x > cx + 3 ? s.shirt[0] : s.shirt[1]); }
    set(8, 16, s.shirt[0]); set(11, 16, s.shirt[0]); set(9, 17, s.shirt[2]); set(10, 17, s.shirt[2]);
    // neck
    for (let y = 14; y < 17; y++) for (let x = 8; x < 12; x++) set(x, y, x > 9 ? sk[0] : sk[1]);
    // head: an oval, a little narrower at the chin
    for (let y = 2; y < 16; y++) for (let x = 2; x < 18; x++) {
      const dy = (y + 0.5 - cy) / ry, w = rx * (dy > 0.3 && s.jaw ? 1 - (dy - 0.3) * 0.45 : 1), dx = (x + 0.5 - cx) / w;
      if (dx * dx + dy * dy > 1) continue;
      set(x, y, dx > 0.55 || dy > 0.85 ? sk[0] : dx < -0.45 && dy < 0.3 ? sk[2] : sk[1]);
    }
    // ears
    const el = Math.round(cx - rx - 0.5), er = Math.round(cx + rx - 0.5);
    set(el, 9, sk[1]); set(el, 10, sk[0]); set(er, 9, sk[0]); set(er, 10, sk[0]);
    if (s.earring) set(el, 11, hex('#ffec27'));
    // eyes: whites, pupils that look around, brows; blinking shuts them
    const blink = (f + s.phase) % s.blink < 2 && attn < 0.9, look = attn > 0.3 ? 0 : ((f + s.phase) / s.look | 0) % 3 - 1;
    const eyes = [[7, 8], [11, 12]], pupil = hex('#1a1c2c');
    for (const [a, b] of eyes) {
      if (blink) { set(a, 9, sk[0]); set(b, 9, sk[0]); continue; }
      set(a, 9, WHITE); set(b, 9, WHITE);
      set(look < 0 ? a : look > 0 ? b : (a === 7 ? b : a), 9, pupil);
      set(a, 8, sk[0]); set(b, 8, sk[1]);
    }
    const by = attn > 0.3 ? 6 : 7;   // brows lift when something catches their attention
    for (const x of [6, 7, 8]) set(x, by, hr[0]);
    for (const x of [11, 12, 13]) set(x, by, hr[0]);
    // nose and mouth
    set(10, 10, sk[0]); set(10, 11, sk[0]); set(9, 11, sk[2]);
    const my = 13;
    set(9, my, s.lip); set(10, my, s.lip);
    if (open > 0.35) { set(9, my, pupil); set(10, my, pupil); set(8, my, s.lip); set(11, my, s.lip); set(9, my - 1, s.lip); set(10, my - 1, s.lip); set(9, my + 1, s.lip); set(10, my + 1, s.lip); }
    else if (s.smile) { set(8, my - 1, s.lip); set(11, my - 1, s.lip); set(9, my + 1, sk[0]); set(10, my + 1, sk[0]); } else { set(8, my, s.lip); set(11, my, sk[0]); }
    if (s.blush) { set(6, 11, X.mixPk(sk[1], hex('#ff77a8'), 0.5)); set(13, 11, X.mixPk(sk[0], hex('#ff77a8'), 0.4)); }
    if (s.freckles) { set(7, 11, sk[0]); set(12, 11, sk[0]); set(8, 10, sk[0]); }
    if (s.beard) for (let y = 12; y < 16; y++) for (let x = 5; x < 15; x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy <= 1 && !(y === my && x > 7 && x < 12)) set(x, y, x < cx ? hr[1] : hr[0]); }
    // glasses: thin rims open at the bottom, so the eyes stay readable (not a mask)
    if (s.glasses) { const fr = s.rim; for (const [a, b] of eyes) { for (let x = a - 1; x <= b + 1; x++) set(x, 8, fr); set(a - 1, 9, fr); set(b + 1, 9, fr); set(a - 1, 10, X.mixPk(fr, sk[1], 0.5)); set(b + 1, 10, X.mixPk(fr, sk[1], 0.5)); set(a, 10, X.mixPk(sk[1], WHITE, 0.35)); } }
    // hair on top, by style
    const top = (x, y) => set(x, y, x < cx - 1 && y < 5 ? hr[2] : x > cx + 2 ? hr[0] : hr[1]);
    const crown = (y0, y1, inset = 0) => { for (let y = y0; y <= y1; y++) for (let x = 2; x < 18; x++) { const dy = (y + 0.5 - cy) / (ry + 1), dx = (x + 0.5 - cx) / (rx + 1 - inset); if (dx * dx + dy * dy <= 1) top(x, y); } };
    switch (s.style) {
      case 'short': crown(1, 4); top(4, 5); top(15, 5); break;
      case 'long': crown(1, 4); for (let y = 5; y < 9; y++) { top(3, y); top(16, y); } break;
      case 'side': crown(1, 4); for (let x = 5; x < 11; x++) top(x, 5); top(4, 6); break;
      case 'bob': crown(1, 5); for (let y = 6; y < 13; y++) { top(3, y); top(4, y); top(15, y); top(16, y); } break;
      case 'afro': for (let y = 0; y < 9; y++) for (let x = 1; x < 19; x++) { const dx = (x + 0.5 - cx) / 8.5, dy = (y + 0.5 - 4.5) / 5; if (dx * dx + dy * dy <= 1 && (y < 5 || Math.abs(x + 0.5 - cx) > rx - 1)) set(x, y, X.dith4(x, y) < 0.25 ? hr[2] : x > cx + 3 ? hr[0] : hr[1]); } break;
      case 'bun': crown(2, 4); for (let y = 0; y < 3; y++) for (let x = 8; x < 12; x++) top(x, y); break;
      case 'mohawk': for (let y = 0; y < 5; y++) { top(9, y); top(10, y); } break;
      case 'cap': for (let y = 1; y < 5; y++) for (let x = 3; x < 17; x++) { const dy = (y + 0.5 - cy) / (ry + 1), dx = (x + 0.5 - cx) / (rx + 1); if (dx * dx + dy * dy <= 1) set(x, y, y === 4 ? s.hat[0] : x < cx ? s.hat[2] : s.hat[1]); } for (let x = 9; x < 19; x++) set(x, 5, s.hat[0]); break;
      default: set(7, 3, sk[2]); break;   // bald: a highlight on the crown
    }
  }

  P.addPixel({
    name: 'Sitters', fam: 'Sprites', sizes: [80], fps: 8,
    recipe: 'A wall of twenty-pixel portraits, each face drawn like a pixel artist would: shadowed cheek, ears, brows, eyes that look about and blink, a nose, lips, a hairstyle with its own highlight. Now and then a new sitter takes a frame.',
    listens: 'Clap and every sitter looks up at you; talk and they open their mouths.',
    make(R, U, g) {
      // the one-green handheld scheme turned every sitter into the same olive: swap it for a warmer set
      let sc = scheme(R);
      if (sc.name === 'Game Boy') sc = scheme(g.alt, ['Sweetie', 'Pico', 'Dusk', 'Candy', 'Ember']);
      const { n, d } = g, layout = R.pick(['wall', 'wall', 'pairs', 'frames', 'one']), inp = g.input;
      const k = layout === 'one' ? 1 : layout === 'pairs' ? 2 : 4, scale = 4 / k * (layout === 'frames' ? 0.8 : 1);
      const people = Array.from({ length: k * k }, () => portrait(R, sc, g.alt)), buf = new Uint32Array(400);
      for (const s of people) s.born = 1;   // the first wall is already hung; only newcomers fade in
      const frame = [hex('#4a2c1a'), hex('#b07a4a'), hex('#e0b070')], gold = [hex('#6b4a10'), hex('#d4a83a'), hex('#fff1a8')], fr = R.bool(0.5) ? gold : frame;
      let last = 0, attn = 0;
      g.trait('Hang', { wall: 'Wall', pairs: 'Pairs', frames: 'Framed', one: 'Portrait' }[layout]); g.trait('Sitters', k * k); g.trait('Palette', sc.name); g.trait('Frame', layout === 'frames' ? (fr === gold ? 'Gilt' : 'Wood') : 'None');
      return (t, dt, f) => {
        if (layout === 'frames') d.fill(sc.ground[1]);
        if (f - last > 36 && k > 1) { last = f; people[R.int(0, people.length - 1)] = portrait(R, sc, g.alt); }
        // Listen: a clap turns every head; loudness opens the mouths
        if (inp.listening) { if (inp.beats()) attn = 1.6; attn = Math.max(0, attn - dt); } else attn = 0;
        const open = inp.listening ? inp.level : 0;
        people.forEach((s, j) => {
          if (s.born < 1) s.born = Math.min(1, s.born + 0.1);
          drawPortrait(buf, s, f, Math.min(1, attn), open * (0.7 + 0.6 * ((j * 7) % 5) / 4));
          const size = Math.floor(n / k), cs = Math.max(1, Math.floor(size * (layout === 'frames' ? 0.8 : 1) / 20)), off = Math.floor((size - cs * 20) / 2);
          const ox = (j % k) * size + off, oy = (j / k | 0) * size + off;
          if (layout === 'frames') { X.rect(g, ox - 2, oy - 2, cs * 20 + 4, cs * 20 + 4, fr[0]); X.rect(g, ox - 2, oy - 2, cs * 20 + 3, 1, fr[2]); X.rect(g, ox - 2, oy - 2, 1, cs * 20 + 3, fr[1]); }
          for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) {
            if (s.born < 1 && X.dith4(x, y) > s.born) continue;
            X.rect(g, ox + x * cs, oy + y * cs, cs, cs, buf[y * 20 + x]);
          }
        });
      };
    },
  });

  // ---------- 105 Aquarium ----------
  // Fish shaded the way a pixel artist shades them: a darker back, a light belly,
  // fins and markings in a second ramp, a white eye with a pupil, a beating tail.
  function fishSprites(R, kind, body, fin) {
    let L, H;
    if (kind === 'tall') { L = R.int(8, 11); H = R.int(5, 7); }
    else if (kind === 'round') { L = R.int(8, 10); H = R.int(4, 5); }
    else if (kind === 'long') { L = R.int(16, 22); H = 2; }
    else if (kind === 'tiny') { L = 5; H = 1; }
    else { L = R.int(10, 15); H = R.int(3, 5); }
    const T = kind === 'tiny' ? 2 : kind === 'long' ? 2 : R.int(3, 4), fork = R.bool(0.5), w = L + T, h = 2 * H + 1 + (kind === 'tall' ? 6 : 2), mid = (h >> 1);
    const marks = R.pick(['plain', 'stripes', 'spots', 'band', 'stripes']);
    const frames = [0, 1].map(fr => {
      const m = Array.from({ length: h }, () => new Uint8Array(w));
      for (let x = 0; x < L; x++) {
        const u = x / (L - 1);
        let e;
        if (kind === 'tall') e = H * (1 - Math.abs(u - 0.45) / 0.6);
        else if (kind === 'round') e = H * Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.5) / 0.55, 2)));
        else if (kind === 'long') e = u > 0.85 ? 1 : H * 0.9;
        else if (kind === 'tiny') e = u > 0.8 ? 0 : 1;
        else e = H * Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.42) / 0.6, 2))) * (u > 0.8 ? 1 - (u - 0.8) * 1.6 : 1);
        e = Math.max(kind === 'tiny' ? 0 : 1, Math.round(e));
        for (let y = mid - e; y <= mid + e; y++) {
          const back = y < mid - e * 0.35, belly = y > mid + e * 0.3;
          let v = belly ? 6 : back ? 7 : 1;
          if (marks === 'stripes' && Math.floor(u * 7) % 2 === 1 && u > 0.15 && u < 0.85) v = 2;
          if (marks === 'band' && u > 0.45 && u < 0.6) v = 2;
          if (marks === 'spots' && ((x * 7 + y * 13) % 5 === 0) && !belly) v = 2;
          m[y][x + T] = v;
        }
        // fins: a dorsal on the back, an anal fin below
        if (kind === 'tall') { if (u > 0.2 && u < 0.6) { for (let y = mid - e - 3; y < mid - e; y++) m[y][x + T] = 5; for (let y = mid + e + 1; y <= mid + e + 3; y++) m[y][x + T] = 5; } }
        else if (kind !== 'tiny' && u > 0.3 && u < 0.55) { m[mid - e - 1][x + T] = 5; if (u < 0.45) m[mid + e + 1][x + T] = 5; }
      }
      // tail, beating between two frames
      const sway = fr ? 1 : 0;
      for (let k = 0; k < T; k++) {
        const s = k + 1 + (kind === 'tiny' ? 0 : 1);
        for (let y = -s; y <= s; y++) if (!(fork && Math.abs(y) < s - 1 && k > 0)) { const yy = mid + y + (k === T - 1 ? sway : 0); if (yy >= 0 && yy < h) m[yy][T - 1 - k] = 5; }
      }
      // eye near the nose
      const ex = T + Math.round(L * 0.78), ey = mid - (kind === 'tiny' ? 0 : 1);
      if (kind === 'tiny') m[ey][ex] = 4;
      else { m[ey][ex] = 3; m[ey][Math.min(w - 1, ex + 1)] = 4; }
      // gill line
      if (kind === 'normal' || kind === 'round') for (let y = mid - 1; y <= mid + 1; y++) if (m[y][ex - 2] === 1 || m[y][ex - 2] === 6 || m[y][ex - 2] === 7) m[y][ex - 2] = 8;
      return m;
    });
    const cols = v => v === 1 ? body[1] : v === 6 ? body[2] : v === 7 ? body[0] : v === 2 ? fin[1] : v === 5 ? fin[0] : v === 3 ? WHITE : v === 4 ? hex('#1a1c2c') : v === 8 ? body[0] : 0;
    return frames.map(m => {
      const out = Array.from({ length: h + 2 }, () => new Uint32Array(w + 2));
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y][x]) out[y + 1][x + 1] = cols(m[y][x]);
      for (let y = 0; y < h + 2; y++) for (let x = 0; x < w + 2; x++) {
        if (out[y][x]) continue;
        const at = (a, b) => a >= 0 && b >= 0 && a < w && b < h && m[b][a];
        if (at(x - 2, y - 1) || at(x, y - 1) || at(x - 1, y - 2) || at(x - 1, y)) out[y][x] = X.mixPk(body[0], BLACK, 0.55);
      }
      return out;
    });
  }

  P.addPixel({
    name: 'Aquarium', fam: 'Sprites', sizes: [100], fps: 12,
    listens: 'Clap and the fish dart; the louder the room, the faster the bubbles rise.',
    recipe: 'A tank of generated fish: oval, tall, round and long bodies with darker backs, light bellies, fins and markings in a second colour and a beating tail, swimming over sand and stones. A reef with coral, a planted tank with a school of tetras, or a dark tank lit from above.',
    make(R, U, g) {
      const { n, d } = g, mode = R.pick(['reef', 'planted', 'planted', 'reef', 'night']), alt = g.alt;
      // new tanks (from the second stream, so every existing roll keeps its fish): a bright shallow
      // lagoon, a kelp forest, and rarely the deep sea
      const tank = !g.home && alt() < 0.34 ? alt.pick(['lagoon', 'lagoon', 'kelp', 'kelp', 'deep']) : mode;
      const WATER = { reef: ['#0b2a3c', '#0f4c5c', '#16707f', '#2a9fb0', '#5fd0dc'], planted: ['#0d2418', '#14402c', '#1d5e3c', '#2e8550', '#6fbf7a'], night: ['#040612', '#0a1028', '#121d42', '#1b2d5e', '#2e4a8a'], lagoon: ['#16707f', '#2a9fb0', '#4fc4cc', '#7fe0dc', '#c4f6ec'], kelp: ['#0b1a14', '#11281c', '#1a3a26', '#2a5032', '#4a7a46'], deep: ['#010205', '#03060f', '#060c1c', '#0a1428', '#101e3a'] }[tank].map(hex);
      const sc = scheme(R, ['Sweetie', 'Pico', 'Candy', 'Ember', 'Neon']);
      const sand = n - 9, sandC = (tank === 'lagoon' ? ['#c4b48a', '#efe4c4', '#fffaf0'] : tank === 'kelp' ? ['#3a3a40', '#5e5e66', '#8a8a92'] : tank === 'deep' ? ['#141420', '#262634', '#3e3e52'] : ['#8a6a3a', '#c2a26b', '#e6cf9a']).map(hex);
      const fishes = [];
      const kinds = mode === 'planted' ? ['normal', 'tall', 'long', 'normal'] : ['normal', 'tall', 'round', 'normal', 'long'];
      for (let k = 0; k < R.int(4, 7); k++) {
        const kind = R.pick(kinds), body = R.pick(sc.ramps), fin = R.pick(sc.ramps), spr = fishSprites(R, kind, body, fin);
        fishes.push({ spr, w: spr[0][0].length, h: spr[0].length, x: R.range(0, n - 20), y: R.range(8, sand - 22), v: R.range(0.2, 0.55) * R.sign(), ph: R.range(0, 6), pause: 0 });
      }
      const school = mode === 'planted' || R.bool(0.4) ? (() => { const body = [hex('#1d3a6b'), hex('#29adff'), hex('#c4fbff')], fin = [hex('#ff004d'), hex('#ff004d'), WHITE]; const spr = fishSprites(R, 'tiny', body, fin); return Array.from({ length: R.int(10, 18) }, () => ({ spr, ox: R.range(-10, 10), oy: R.range(-6, 6), ph: R.range(0, 6) })); })() : [];
      // spread the tetras until no two overlap, so the school reads as fish and not a tangle
      for (let it = 0; it < 60; it++) for (let a = 0; a < school.length; a++) for (let b = a + 1; b < school.length; b++) {
        const A = school[a], B = school[b], dx = (B.ox - A.ox) / 8, dy = (B.oy - A.oy) / 4.5, q = dx * dx + dy * dy;
        if (q < 1) { const k = (1 - Math.sqrt(q)) * 0.5, l = Math.sqrt(q) || 1, ux = q ? dx / l : 1, uy = q ? dy / l : 0; A.ox -= ux * k * 8 * 0.5; B.ox += ux * k * 8 * 0.5; A.oy -= uy * k * 4.5 * 0.5; B.oy += uy * k * 4.5 * 0.5; }
      }
      // sometimes a tank of a few big fish, drawn at twice the size
      const big = !g.home && alt() < 0.25;
      if (big) { fishes.sort((a, b) => b.w * b.h - a.w * a.h); fishes.length = Math.min(fishes.length, 3); for (const fs of fishes) { fs.s = 2; fs.w *= 2; fs.h *= 2; fs.y = Math.min(fs.y, sand - fs.h - 2); } }
      const lead = { x: n / 2, y: n * 0.4, a: 0 };
      const rocks = Array.from({ length: R.int(2, 4) }, () => ({ x: R.int(0, n - 16), w: R.int(8, 18), h: R.int(5, 10) }));
      const grey = [hex('#3a3a46'), hex('#6a6a7a'), hex('#a0a0b0')];
      const plants = Array.from({ length: R.int(5, 10) }, () => ({ x: R.int(2, n - 3), h: R.int(n * 0.25, n * 0.65), ph: R.range(0, 6), ramp: mode === 'reef' ? R.pick(sc.ramps) : [hex('#1f4d2b'), hex('#2e8a3e'), hex('#7fd068')], kind: mode === 'reef' ? R.pick(['coral', 'fan', 'coral']) : R.pick(['blade', 'leafy']) }));
      if (tank === 'kelp') for (const p of plants) { p.kind = 'blade'; p.h = Math.min(Math.round(n * 0.92), Math.round(p.h * 1.5)); p.ramp = [hex('#2a3010'), hex('#5a6a1a'), hex('#a0a03a')]; }
      if (tank === 'lagoon') for (const p of plants) { p.kind = alt.pick(['coral', 'fan', 'coral']); p.ramp = alt.pick(sc.ramps); p.h = Math.round(p.h * 0.7); }
      if (tank === 'deep') { plants.length = Math.min(plants.length, 3); for (const p of plants) { p.kind = 'fan'; p.ramp = [hex('#1a0a2a'), hex('#3a1a5a'), hex('#7a4fb8')]; } }
      g.trait('Tank', cap(tank)); g.trait('Palette', sc.name); g.trait('Fish', fishes.length); g.trait('Size', big ? 'Large' : 'Small'); g.trait('School', school.length ? 'Tetras' : 'None');
      const bubbles = Array.from({ length: 12 }, () => ({ x: 0, y: R.range(0, n), v: R.range(0.35, 0.7) }));
      const bubbler = R.int(10, n - 10), inp = g.input;
      let dart = 0;
      return (t, dt, f) => {
        // Listen: a clap makes every fish dart and the school burst apart, then regroup
        if (inp.listening) { if (inp.beats()) dart = 1; dart = Math.max(0, dart - dt * 0.8); } else dart = 0;
        const rush = 1 + 3 * dart * dart, puff = inp.listening ? 1 + inp.level * 1.5 : 1;
        // water: dithered depth bands, light rays near the top
        for (let y = 0; y < sand; y++) {
          const z = (1 - y / sand) * (WATER.length - 1.2);
          for (let x = 0; x < n; x++) {
            let v = z + (X.dith4(x, y) - 0.5);
            if (tank !== 'night' && tank !== 'deep' && ((x + y * 0.45 + t * 2) % 26) < 4) v += (tank === 'kelp' ? 0.6 : 0.9) * (1 - y / sand);
            d[y * n + x] = WATER[Math.max(0, Math.min(WATER.length - 1, Math.round(v)))];
          }
        }
        for (let y = sand; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y === sand ? sandC[2] : ((x * 7 + y * 13) % 9 === 0 ? sandC[0] : (x * 3 + y * 5) % 7 === 0 ? sandC[2] : sandC[1]);
        for (const r of rocks) for (let y = 0; y < r.h; y++) for (let x = 0; x < r.w; x++) {
          const dx = (x + 0.5 - r.w / 2) / (r.w / 2), dy = (r.h - y - 0.5) / r.h;
          if (dx * dx + dy * dy * 1.2 > 1) continue;
          d[(sand - y) * n + r.x + x] = dx < -0.2 && dy > 0.5 ? grey[2] : dx > 0.4 || dy < 0.2 ? grey[0] : grey[1];
        }
        for (const p of plants) {
          const r = p.ramp;
          for (let k = 0; k < p.h; k++) {
            const u = k / p.h, sway = Math.round(Math.sin(t * 0.9 + p.ph + k * 0.15) * 2.5 * u), x = p.x + sway, y = sand - k;
            if (p.kind === 'blade') { X.put(g, x, y, r[1]); if (k % 3 === 0) X.put(g, x + 1, y, r[2]); X.put(g, x - 1, y, r[0]); }
            else if (p.kind === 'leafy') { X.put(g, x, y, r[0]); if (k % 4 === 1) { X.put(g, x + 1, y, r[1]); X.put(g, x + 2, y - 1, r[2]); } if (k % 4 === 3) { X.put(g, x - 1, y, r[1]); X.put(g, x - 2, y - 1, r[2]); } }
            else if (p.kind === 'fan') { if (k < p.h * 0.5) { const wdt = Math.round(k * 0.5); for (let q = -wdt; q <= wdt; q++) if ((q + k) % 3 !== 0) X.put(g, x + q, y, q < 0 ? r[2] : r[1]); } }
            else { X.put(g, x, y, r[1]); if (k % 5 === 2) { X.put(g, x + 1, y - 1, r[2]); X.put(g, x + 2, y - 2, r[1]); } if (k % 6 === 4) { X.put(g, x - 1, y - 1, r[0]); X.put(g, x - 2, y - 2, r[1]); } }
          }
        }
        for (const fs of fishes) {
          if (fs.pause > 0 && !dart) fs.pause--; else fs.x += fs.v * rush;
          if ((fs.x < -2 && fs.v < 0) || (fs.x > n - fs.w + 2 && fs.v > 0)) { fs.v = -fs.v; fs.pause = R.int(4, 20); fs.y = Math.max(6, Math.min(sand - fs.h - 2, fs.y + R.range(-15, 15))); }
          const tail = fs.pause && !dart ? 0 : ((f * (dart ? 2 : 1) + fs.ph * 4 | 0) >> 1) & 1;
          blit(g, fs.spr[tail], fs.x, fs.y + Math.sin(t * 0.7 + fs.ph) * 1.5, fs.v < 0, fs.s || 1);
        }
        if (school.length) {
          lead.a += 0.012 * (1 + dart); lead.x = n / 2 + Math.sin(lead.a) * n * 0.36; lead.y = n * 0.42 + Math.sin(lead.a * 2.3) * n * 0.15;
          const flip = Math.cos(lead.a) < 0, spread = 1 + 1.6 * dart;
          for (const s of school) blit(g, s.spr[(f >> 1) & 1], lead.x + s.ox * spread + Math.sin(t * 2 + s.ph), lead.y + s.oy * spread + Math.cos(t * 1.7 + s.ph), flip);
        }
        for (const b of bubbles) {
          b.y -= b.v * puff; if (b.y < 0) { b.y = sand - 2; b.x = 0; }
          const bx = bubbler + Math.round(Math.sin(b.y * 0.25) * 1.5) + b.x;
          X.put(g, bx, b.y, hex('#c4fbff')); if (b.v > 0.55) { X.put(g, bx + 1, b.y, hex('#5fd0dc')); X.put(g, bx, b.y - 1, hex('#5fd0dc')); }
        }
        X.rect(g, bubbler - 1, sand - 1, 3, 2, grey[1]);
      };
    },
  });

  // ---------- 106 Crawl ----------
  P.addPixel({
    name: 'Crawl', seed: 1, fam: 'Sprites', sizes: [100], fps: 10,
    interactive: 'Click a lit floor tile and the explorer walks there.',
    recipe: 'A dungeon of rooms and corridors cut fresh each time, in stone, ice, moss or sandstone. A lone explorer walks it room by room, picking up gold, and the map is only drawn as far as their torch has reached.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, T = 4, M = n / T, inks = X.inks(R, 5, 0.4);
      let map, seen, rooms, hero, path, gold;
      const stone = X.shade(inks[R.int(0, inks.length - 1)], 0.55), floorC = X.shade(inks[R.int(0, inks.length - 1)], 0.22), heroC = WHITE, goldC = 0xff30d0ff;
      const build = () => {
        map = new Uint8Array(M * M); seen = new Uint8Array(M * M); rooms = []; gold = [];
        for (let k = 0; k < 40 && rooms.length < 8; k++) {
          const w = R.int(3, 7), h = R.int(3, 6), x = R.int(1, M - w - 2), y = R.int(1, M - h - 2);
          if (rooms.some(r => x < r.x + r.w + 1 && x + w + 1 > r.x && y < r.y + r.h + 1 && y + h + 1 > r.y)) continue;
          rooms.push({ x, y, w, h, cx: x + (w >> 1), cy: y + (h >> 1), seen: false });
          for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) map[yy * M + xx] = 1;
          if (R.bool(0.6)) gold.push({ x: R.int(x, x + w - 1), y: R.int(y, y + h - 1) });
        }
        rooms.sort((a, b) => a.cx - b.cx);
        for (let k = 1; k < rooms.length; k++) {
          const a = rooms[k - 1], b = rooms[k];
          for (let x = Math.min(a.cx, b.cx); x <= Math.max(a.cx, b.cx); x++) map[a.cy * M + x] = 1;
          for (let y = Math.min(a.cy, b.cy); y <= Math.max(a.cy, b.cy); y++) map[y * M + b.cx] = 1;
        }
        hero = { x: rooms[0].cx, y: rooms[0].cy, px: rooms[0].cx * T, py: rooms[0].cy * T }; path = [];
      };
      const bfs = (sx, sy, tx, ty) => {
        const prev = new Int32Array(M * M).fill(-1), q = [sy * M + sx];
        prev[sy * M + sx] = sy * M + sx;
        while (q.length) {
          const i = q.shift();
          if (i === ty * M + tx) break;
          for (const o of [1, -1, M, -M]) { const j = i + o; if (j >= 0 && j < M * M && map[j] && prev[j] < 0) { prev[j] = i; q.push(j); } }
        }
        const out = [];
        for (let i = ty * M + tx; prev[i] >= 0 && i !== sy * M + sx; i = prev[i]) out.unshift(i);
        return out;
      };
      const visible = (x0, y0, x1, y1) => { let ok = true; X.line({ n: M, d: map }, x0, y0, x1, y1, (x, y) => { if (!map[y * M + x] && !(x === x1 && y === y1)) ok = false; }); return ok; };
      const torches = [];
      build();
      g.trait('Masonry', 'Dyed'); g.trait('Palette', inkName(inks)); g.trait('Plan', 'Rooms'); g.trait('Rooms', rooms.length); g.trait('Torch', 'Short');
      let rest = 0, idle = 99;
      const inp = g.input, vis = new Uint8Array(M * M), light = new Float32Array(M * M);
      const frame = (t, dt, f) => {
        for (const tap of inp.taps()) {          // walk where the viewer clicked, and leave a torch burning there
          const tx = Math.floor(tap.x * n / T), ty = Math.floor(tap.y * n / T);
          if (!(tx >= 0 && ty >= 0 && tx < M && ty < M && map[ty * M + tx])) continue;
          if (!torches.some(o => o.x === tx && o.y === ty)) { torches.push({ x: tx, y: ty, ph: (tx * 7 + ty * 3) % 5 }); if (torches.length > 16) torches.shift(); }
          if (seen[ty * M + tx]) { path = bfs(hero.x, hero.y, tx, ty); idle = 0; }
        }
        idle += dt || 0.1;
        if (!path.length && idle > 5) {
          const todo = rooms.filter(r => !r.seen);
          if (!todo.length) { if (++rest > 25) { rest = 0; build(); torches.length = 0; } }
          else { const r = todo[0]; path = bfs(hero.x, hero.y, r.cx, r.cy); r.seen = true; }
        }
        if (path.length) {
          const nx = (path[0] % M) * T, ny = (path[0] / M | 0) * T;
          hero.px += Math.sign(nx - hero.px); hero.py += Math.sign(ny - hero.py);
          if (hero.px === nx && hero.py === ny) { const i = path.shift(); hero.x = i % M; hero.y = i / M | 0; }
        }
        // the torch light falls off with distance and flickers a little
        vis.fill(0); light.fill(0.4);
        const flick = 1 + 0.04 * Math.sin(t * 9.3) + 0.03 * Math.sin(t * 23.1);
        for (let y = hero.y - 5; y <= hero.y + 5; y++) for (let x = hero.x - 5; x <= hero.x + 5; x++) {
          const r2 = (x - hero.x) ** 2 + (y - hero.y) ** 2;
          if (x < 0 || y < 0 || x >= M || y >= M || r2 > 26) continue;
          const wall = !map[y * M + x] && [1, -1, M, -M].some(o => map[y * M + x + o]);
          if ((map[y * M + x] || wall) && visible(hero.x, hero.y, x, y)) { vis[y * M + x] = 1; seen[y * M + x] = 1; light[y * M + x] = Math.min(1.1, (1 - 0.42 * r2 / 26) * flick); }
        }
        for (const o of torches) for (let y = o.y - 2; y <= o.y + 2; y++) for (let x = o.x - 2; x <= o.x + 2; x++) {
          const r2 = (x - o.x) ** 2 + (y - o.y) ** 2;
          if (x < 0 || y < 0 || x >= M || y >= M || r2 > 5 || !(map[y * M + x] || [1, -1, M, -M].some(q => map[y * M + x + q]))) continue;
          seen[y * M + x] = 1; light[y * M + x] = Math.max(light[y * M + x], 0.9 - 0.08 * r2);
        }
        gold = gold.filter(c => !(c.x === hero.x && c.y === hero.y));
        d.fill(BLACK);
        for (let ty = 0; ty < M; ty++) for (let tx = 0; tx < M; tx++) {
          const i = ty * M + tx;
          if (!seen[i]) continue;
          const lit = light[i], isFloor = map[i];
          for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
            const c = isFloor ? (x === 1 && y === 2 ? X.shade(floorC, 1.6) : floorC) : (y === 0 || (x === (ty & 1) * 2 && y === 2) ? X.shade(stone, 1.3) : y === 3 ? X.shade(stone, 0.7) : stone);
            d[(ty * T + y) * n + tx * T + x] = lit !== 1 ? X.shade(c, lit) : c;
          }
        }
        for (const c of gold) if (seen[c.y * M + c.x]) X.rect(g, c.x * T + 1, c.y * T + 1, 2, 2, vis[c.y * M + c.x] ? goldC : X.shade(goldC, 0.4));
        for (const o of torches) { const fl = ((f >> 1) + o.ph) & 1; X.put(g, o.x * T + 1, o.y * T + 2, 0xff1a3a5a); X.put(g, o.x * T + 1, o.y * T + 1, fl ? 0xff30d0ff : 0xff40a0ff); if (fl) X.put(g, o.x * T + 1, o.y * T, 0xffa0f0ff); }
        X.rect(g, hero.px + 1, hero.py, 2, 1, 0xff60c0ff); X.rect(g, hero.px + 1, hero.py + 1, 2, 2, heroC); X.put(g, hero.px, hero.py + 3, heroC); X.put(g, hero.px + 3, hero.py + 3, heroC);
      };
      // begin a few steps in, with the first room and corridor already found
      for (let i = 0; i < 60; i++) frame(i * 0.1, 0.1, i);
      let fc = 60;
      return (t, dt) => frame(t + 6, dt, fc++);
      }
      function rework(R, U, g) {
      const { n, d } = g, T = R.pick([4, 5]), M = Math.floor(n / T), inp = g.input;
      const STYLES = [['#2a2a3a', '#4a4a62', '#7a7a9a', '#14141c', '#26263a'], ['#1d3a4a', '#3a6b8a', '#8ac4e0', '#0b1a24', '#163044'], ['#24361d', '#3e5e2e', '#7aa05a', '#101a0c', '#1e2e16'], ['#4a3418', '#8a6430', '#d4a85a', '#24180a', '#3a2a14']].map(r => r.map(hex));
      const style = R.pick(STYLES), [s0, s1, s2, f0, f1] = style, goldC = hex('#ffec27'), torch = R.int(4, 6);
      // the plan: many small rooms, a few great halls, or a warren of cells
      const plan = g.alt.pick(['Rooms', 'Rooms', 'Halls', 'Cells']);
      let map, seen, rooms, hero, path, gold, idle = 99;
      const build = () => {
        map = new Uint8Array(M * M); seen = new Uint8Array(M * M); rooms = []; gold = [];
        const most = plan === 'Halls' ? 5 : plan === 'Cells' ? 16 : 10;
        for (let k = 0; k < 90 && rooms.length < R.int(Math.min(6, most - 1), most); k++) {
          const w = plan === 'Halls' ? R.int(6, 11) : plan === 'Cells' ? R.int(2, 4) : R.int(3, 7), h = plan === 'Halls' ? R.int(5, 9) : plan === 'Cells' ? R.int(2, 4) : R.int(3, 6), x = R.int(1, M - w - 2), y = R.int(1, M - h - 2);
          if (rooms.some(r => x < r.x + r.w + 1 && x + w + 1 > r.x && y < r.y + r.h + 1 && y + h + 1 > r.y)) continue;
          rooms.push({ x, y, w, h, cx: x + (w >> 1), cy: y + (h >> 1), seen: false });
          for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) map[yy * M + xx] = 1;
          if (R.bool(0.7)) gold.push({ x: R.int(x, x + w - 1), y: R.int(y, y + h - 1) });
        }
        rooms.sort((a, b) => a.cx - b.cx);
        for (let k = 1; k < rooms.length; k++) {
          const a = rooms[k - 1], b = rooms[k];
          for (let x = Math.min(a.cx, b.cx); x <= Math.max(a.cx, b.cx); x++) map[a.cy * M + x] = 1;
          for (let y = Math.min(a.cy, b.cy); y <= Math.max(a.cy, b.cy); y++) map[y * M + b.cx] = 1;
        }
        hero = { x: rooms[0].cx, y: rooms[0].cy, px: rooms[0].cx * T, py: rooms[0].cy * T }; path = [];
      };
      const prev = new Int32Array(M * M), q = new Int32Array(M * M);
      const bfs = (sx, sy, tx, ty) => {
        prev.fill(-1); let h = 0, e = 0; q[e++] = sy * M + sx; prev[sy * M + sx] = sy * M + sx;
        while (h < e) {
          const i = q[h++];
          if (i === ty * M + tx) break;
          for (const o of [1, -1, M, -M]) { const j = i + o; if (j >= 0 && j < M * M && map[j] && prev[j] < 0) { prev[j] = i; q[e++] = j; } }
        }
        const out = [];
        for (let i = ty * M + tx; prev[i] >= 0 && i !== sy * M + sx; i = prev[i]) out.unshift(i);
        return out;
      };
      const visible = (x0, y0, x1, y1) => { let ok = true; X.line({ n: M, d: map }, x0, y0, x1, y1, (x, y) => { if (!map[y * M + x] && !(x === x1 && y === y1)) ok = false; }); return ok; };
      const torches = [];
      build();
      g.trait('Masonry', ['Stone', 'Ice', 'Moss', 'Sandstone'][STYLES.indexOf(style)]); g.trait('Plan', plan); g.trait('Rooms', rooms.length); g.trait('Torch', torch > 5 ? 'Long' : torch > 4 ? 'Medium' : 'Short'); g.trait('Tile', T);
      let rest = 0;
      const vis = new Uint8Array(M * M), light = new Float32Array(M * M), T2 = torch * torch + 1;
      const frame = (t, dt, f) => {
        for (const tap of inp.taps()) {          // walk where the viewer clicked, and leave a torch burning there
          const tx = Math.floor(tap.x * n / T), ty = Math.floor(tap.y * n / T);
          if (!(tx >= 0 && ty >= 0 && tx < M && ty < M && map[ty * M + tx])) continue;
          if (!torches.some(o => o.x === tx && o.y === ty)) { torches.push({ x: tx, y: ty, ph: (tx * 7 + ty * 3) % 5 }); if (torches.length > 16) torches.shift(); }
          if (seen[ty * M + tx]) { path = bfs(hero.x, hero.y, tx, ty); idle = 0; }
        }
        idle += dt;
        if (!path.length && idle > 5) {
          const todo = rooms.filter(r => !r.seen);
          if (!todo.length) { if (++rest > 25) { rest = 0; build(); torches.length = 0; } }
          else { const r = todo[0]; path = bfs(hero.x, hero.y, r.cx, r.cy); r.seen = true; }
        }
        if (path.length) {
          const nx = (path[0] % M) * T, ny = (path[0] / M | 0) * T;
          hero.px += Math.sign(nx - hero.px); hero.py += Math.sign(ny - hero.py);
          if (hero.px === nx && hero.py === ny) { const i = path.shift(); hero.x = i % M; hero.y = i / M | 0; for (const r of rooms) if (hero.x >= r.x && hero.x < r.x + r.w && hero.y >= r.y && hero.y < r.y + r.h) r.seen = true; }
        }
        vis.fill(0); light.fill(0.4);
        const flick = 1 + 0.04 * Math.sin(t * 9.3) + 0.03 * Math.sin(t * 23.1);
        for (let y = hero.y - torch; y <= hero.y + torch; y++) for (let x = hero.x - torch; x <= hero.x + torch; x++) {
          const r2 = (x - hero.x) ** 2 + (y - hero.y) ** 2;
          if (x < 0 || y < 0 || x >= M || y >= M || r2 > T2) continue;
          const wall = !map[y * M + x] && [1, -1, M, -M].some(o => map[y * M + x + o]);
          if ((map[y * M + x] || wall) && visible(hero.x, hero.y, x, y)) { vis[y * M + x] = 1; seen[y * M + x] = 1; light[y * M + x] = Math.min(1.1, (1 - 0.42 * r2 / T2) * flick); }
        }
        for (const o of torches) for (let y = o.y - 2; y <= o.y + 2; y++) for (let x = o.x - 2; x <= o.x + 2; x++) {
          const r2 = (x - o.x) ** 2 + (y - o.y) ** 2;
          if (x < 0 || y < 0 || x >= M || y >= M || r2 > 5 || !(map[y * M + x] || [1, -1, M, -M].some(q => map[y * M + x + q]))) continue;
          seen[y * M + x] = 1; light[y * M + x] = Math.max(light[y * M + x], 0.9 - 0.08 * r2);
        }
        gold = gold.filter(c => !(c.x === hero.x && c.y === hero.y));
        d.fill(BLACK);
        for (let ty = 0; ty < M; ty++) for (let tx = 0; tx < M; tx++) {
          const i = ty * M + tx;
          if (!seen[i]) continue;
          const lit = light[i], isFloor = map[i];
          for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
            let c;
            if (isFloor) c = (x + y + tx + ty) % 5 === 0 ? f1 : f0;
            else { const face = map[i + M]; c = y === 0 ? s2 : face && y >= T - 2 ? s0 : (x === ((ty & 1) ? 1 : T - 2) && y === T >> 1) ? s0 : s1; }
            d[(ty * T + y) * n + tx * T + x] = lit !== 1 ? X.shade(c, lit) : c;
          }
        }
        for (const c of gold) if (seen[c.y * M + c.x]) { const b = vis[c.y * M + c.x] && (f >> 2) & 1 ? WHITE : goldC; X.rect(g, c.x * T + 1, c.y * T + 1, T - 2, T - 2, vis[c.y * M + c.x] ? goldC : X.shade(goldC, 0.4)); X.put(g, c.x * T + 1, c.y * T + 1, b); }
        for (const o of torches) { const fl = ((f >> 1) + o.ph) & 1, mx = o.x * T + (T >> 1); X.put(g, mx, o.y * T + T - 2, hex('#5a3a22')); X.put(g, mx, o.y * T + T - 3, fl ? hex('#ffec27') : hex('#ffa300')); if (fl) X.put(g, mx, o.y * T + T - 4, hex('#fff1e8')); }
        // the explorer: hat, face, cloak, a flickering torch
        const hx = hero.px, hy = hero.py;
        X.rect(g, hx, hy, T, T, BLACK);
        X.rect(g, hx + 1, hy, T - 2, 1, hex('#ab5236')); X.put(g, hx + 1, hy + 1, hex('#ffccaa')); X.put(g, hx + T - 2, hy + 1, hex('#ffccaa'));
        X.rect(g, hx + 1, hy + 2, T - 2, T - 2, hex('#29adff'));
        X.put(g, hx + T - 1, hy + 1 + ((f >> 1) & 1), (f & 2) ? hex('#ffec27') : hex('#ffa300'));
      };
      // begin a few steps in, with the first room and corridor already found
      for (let i = 0; i < 60; i++) frame(i * 0.1, 0.1, i);
      let fc = 60;
      return (t, dt) => frame(t + 6, dt, fc++);
      }

    },
  });

  // ---------- 107 Runner ----------
  P.addPixel({
    name: 'Runner', fam: 'Sprites', sizes: [100], fps: 12,
    interactive: 'Click or tap to jump; leave it and it runs itself.',
    recipe: 'A side-scrolling world that never ends, in hills, desert, snow or a night city: layers of scenery sliding at their own pace, coins to catch, and a small runner who leaps whatever the ground puts in the way.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 6, 0.4, true), nz = U.noise(R), ground = n - 18;
      const sky = X.rampPk([X.shade(inks[0], 0.5), X.mixPk(inks[inks.length - 1], WHITE, 0.3)], 6), far = X.shade(inks[1], 0.6), mid = X.shade(inks[2], 0.75), turf = inks[3], soil = X.shade(inks[3], 0.45);
      const runner = [
        ['..##..', '..##..', '.####.', '#.##.#', '..##..', '.#..#.', '#....#', '......'],
        ['..##..', '..##..', '.####.', '.###..', '..##..', '..##..', '.#.#..', '.#..#.'],
        ['..##..', '..##..', '.####.', '#.##.#', '..##..', '.#..#.', '.#..#.', '......'],
        ['..##..', '..##..', '.####.', '..###.', '..##..', '..##..', '..#.#.', '.#..#.'],
      ].map(f => f.map(r => [...r].map(c => (c === '#' ? 1 : 0))));
      const hero = X.mixPk(inks[inks.length - 1], WHITE, 0.4), heroHead = X.mixPk(hero, WHITE, 0.45), heroLegs = X.shade(hero, 0.68);
      const farHi = X.mixPk(far, sky[4], 0.4), midHi = X.mixPk(mid, WHITE, 0.16), obC = inks[0] === inks[1] ? BLACK : X.shade(inks[0], 0.8), obHi = X.mixPk(obC, WHITE, 0.3), obLo = X.shade(obC, 0.6), shadowC = X.shade(turf, 0.55);
      let x = 0, y = 0, vy = 0, obstacles = [], nextOb = 40, clouds = Array.from({ length: 4 }, () => ({ x: R.range(0, n), y: R.int(5, 30), w: R.int(8, 16) }));
      const inp = g.input;
      let player = 0;
      g.trait('Land', 'Hills'); g.trait('Palette', inkName(inks)); g.trait('Coins', 'None'); g.trait('Clouds', clouds.length);
      return (t, dt, f) => {
        const taps = inp.taps();
        if (taps.length) player = 6;
        player = Math.max(0, player - (dt || 0));
        x += 1;
        // sky bands with a dithered seam between each (cell by cell, not row by row, so no stripes)
        for (let yy = 0; yy < ground; yy++) { const z = yy / ground * 6, row = yy * n; for (let xx = 0; xx < n; xx++) d[row + xx] = sky[Math.min(5, Math.floor(z + (X.dith4(xx, yy) - 0.5) * 0.4))]; }
        for (const c of clouds) { c.x -= 0.15; if (c.x < -c.w) { c.x = n; c.y = R.int(5, 30); } X.rect(g, c.x, c.y, c.w, 2, X.mixPk(sky[2], WHITE, 0.5)); X.rect(g, c.x + 2, c.y - 1, c.w - 5, 1, X.mixPk(sky[2], WHITE, 0.5)); }
        for (let sx = 0; sx < n; sx++) {
          const hf = Math.round(ground - 30 - 18 * nz.n2((sx + x * 0.25) * 0.02, 1)), hm = Math.round(ground - 12 - 10 * nz.n2((sx + x * 0.5) * 0.035, 7));
          for (let yy = hf; yy < ground; yy++) d[yy * n + sx] = yy === hf ? farHi : far;
          for (let yy = hm; yy < ground; yy++) d[yy * n + sx] = yy === hm ? midHi : mid;
          for (let yy = ground; yy < n; yy++) d[yy * n + sx] = yy === ground ? turf : (yy === ground + 1 && ((sx + x) & 3) === 0) ? turf : ((sx + x) * 3 + yy * 5) % 11 === 0 ? X.shade(soil, 1.4) : soil;
        }
        if (x >= nextOb) { obstacles.push({ x: x + n, h: R.int(3, 7), w: R.int(2, 4) }); nextOb = x + R.int(30, 70); }
        obstacles = obstacles.filter(o => o.x - x > -10);
        const hx = 20;
        for (const o of obstacles) { const ox = o.x - x; X.rect(g, ox, ground - o.h, o.w, o.h, obC); X.rect(g, ox, ground - o.h, o.w, 1, obHi); X.rect(g, ox + o.w - 1, ground - o.h + 1, 1, o.h - 1, obLo); }
        const ahead = obstacles.find(o => o.x - x > hx - 2 && o.x - x < hx + 9);
        if (player > 0) { if (taps.length && y === 0) vy = 3.6; }
        else if (ahead && y === 0) vy = 3.4;
        y += vy; vy -= 0.45; if (y <= 0) { y = 0; vy = 0; }
        // a shadow on the turf that shrinks as the runner leaves the ground
        const sw = Math.max(1, 3 - Math.round(y / 4)); X.rect(g, hx + 3 - sw, ground, sw * 2, 1, shadowC);
        const frame = y > 0 ? runner[1] : runner[(f >> 1) & 3];
        for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) if (frame[r][c]) X.put(g, hx + c, ground - 8 - Math.round(y) + r, r < 2 ? heroHead : r > 4 ? heroLegs : hero);
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, nz = U.noise(R), ground = n - 18, inp = g.input;
      const BIOMES = {
        hills: { sky: ['#29366f', '#3b5dc9', '#41a6f6', '#73eff7'], far: '#257179', mid: '#38b764', turf: '#a7f070', soil: '#5d275d', ob: ['#333c57', '#566c86', '#94b0c2'] },
        desert: { sky: ['#b13e53', '#ef7d57', '#ffcd75', '#fff1e8'], far: '#ab5236', mid: '#d77643', turf: '#feae34', soil: '#733e39', ob: ['#265c42', '#3e8948', '#63c74d'] },
        snow: { sky: ['#1d2b53', '#29366f', '#566c86', '#94b0c2'], far: '#566c86', mid: '#94b0c2', turf: '#f4f4f4', soil: '#333c57', ob: ['#1d3a6b', '#3a7bd5', '#9ad1ff'] },
        city: { sky: ['#07020f', '#140829', '#3b0a5e', '#7e2553'], far: '#1f0d40', mid: '#3b0a5e', turf: '#ff2a6d', soil: '#140829', ob: ['#0b3d4a', '#00e5ff', '#c4fbff'] },
      };
      const bk = R.pick(Object.keys(BIOMES)), B = BIOMES[bk], sky = B.sky.map(hex), far = hex(B.far), mid = hex(B.mid), turf = hex(B.turf), soil = hex(B.soil), ob = B.ob.map(hex);
      const runner = [
        ['..##..', '..##..', '.####.', '#.##.#', '..##..', '.#..#.', '#....#', '......'],
        ['..##..', '..##..', '.####.', '.###..', '..##..', '..##..', '.#.#..', '.#..#.'],
        ['..##..', '..##..', '.####.', '#.##.#', '..##..', '.#..#.', '.#..#.', '......'],
        ['..##..', '..##..', '.####.', '..###.', '..##..', '..##..', '..#.#.', '.#..#.'],
      ].map(f => f.map(r => [...r].map(c => (c === '#' ? 1 : 0))));
      const hero = R.pick([hex('#fff1e8'), hex('#ffec27'), hex('#ff77a8'), hex('#00e436')]), heroDark = X.mixPk(hero, BLACK, 0.45), heroLegs = X.mixPk(hero, BLACK, 0.3);
      const winC = hex('#ffd000'), farHi = X.mixPk(far, sky[3], 0.4), midHi = X.mixPk(mid, WHITE, 0.16), shadowC = X.mixPk(turf, BLACK, 0.45);
      const stars = bk === 'city' || bk === 'snow' ? Array.from({ length: 30 }, () => ({ x: R.int(0, n - 1), y: R.int(0, ground - 30) })) : [];
      let x = 0, y = 0, vy = 0, obstacles = [], coins = [], nextOb = 40, score = 0, hurt = 0, player = 0;
      g.trait('Land', { hills: 'Hills', desert: 'Desert', snow: 'Snow', city: 'Night city' }[bk]); g.trait('Runner', ['Pale', 'Gold', 'Pink', 'Lime'][[hex('#fff1e8'), hex('#ffec27'), hex('#ff77a8'), hex('#00e436')].indexOf(hero)]); g.trait('Coins', 'Yes'); g.trait('Stars', stars.length ? 'Yes' : 'None');
      return (t, dt, f) => {
        const taps = inp.taps();
        if (taps.length) player = 6;
        player = Math.max(0, player - dt);
        x += 1 + Math.min(1, x / 3000);
        for (let yy = 0; yy < ground; yy++) { const z = yy / ground * 4, row = yy * n; for (let xx = 0; xx < n; xx++) d[row + xx] = sky[Math.min(3, Math.floor(z + (X.dith4(xx, yy) - 0.5) * 0.5))]; }
        for (const s of stars) if ((s.x + s.y + (f >> 3)) % 7) X.put(g, s.x, s.y, WHITE);
        for (let sx = 0; sx < n; sx++) {
          let hf, hm;
          if (bk === 'city') { const b = Math.floor((sx + x * 0.25) / 9), bh = 20 + (b * 7919 % 23); hf = ground - 18 - bh; const c = Math.floor((sx + x * 0.5) / 7); hm = ground - 6 - (c * 104729 % 19); }
          else { hf = Math.round(ground - 30 - 18 * nz.n2((sx + x * 0.25) * 0.02, 1)); hm = Math.round(ground - 12 - 10 * nz.n2((sx + x * 0.5) * 0.035, 7)); }
          for (let yy = Math.max(0, hf); yy < ground; yy++) d[yy * n + sx] = bk === 'city' && ((sx + Math.floor(x * 0.25)) % 4 === 1) && (yy % 5 === 2) && ((sx * 31 + yy) % 3) ? winC : yy === hf && bk !== 'city' ? farHi : far;
          for (let yy = Math.max(0, hm); yy < ground; yy++) d[yy * n + sx] = yy === hm ? midHi : mid;
          for (let yy = ground; yy < n; yy++) d[yy * n + sx] = yy === ground ? turf : (yy === ground + 1 && ((sx + x | 0) & 3) === 0) ? turf : ((sx + (x | 0)) * 3 + yy * 5) % 11 === 0 ? X.shade(soil, 1.6) : soil;
        }
        if (x >= nextOb) {
          obstacles.push({ x: x + n, h: R.int(3, 8), w: R.int(2, 5), kind: R.int(0, 2) });
          if (R.bool(0.6)) coins.push({ x: x + n + R.int(-12, 12), y: ground - R.int(14, 26) });
          nextOb = x + R.int(28, 70);
        }
        obstacles = obstacles.filter(o => o.x - x > -10);
        coins = coins.filter(c => c.x - x > -4 && !c.got);
        const hx = 20;
        for (const o of obstacles) {
          const ox = Math.round(o.x - x);
          X.rect(g, ox, ground - o.h, o.w, o.h, ob[1]); X.rect(g, ox, ground - o.h, o.w, 1, ob[2]); X.rect(g, ox + o.w - 1, ground - o.h + 1, 1, o.h - 1, ob[0]);
          if (o.kind === 0 && o.w > 2) X.put(g, ox - 1, ground - o.h + 2, ob[1]);   // a cactus arm or a ledge
        }
        for (const c of coins) { const cx = Math.round(c.x - x), spin = (f >> 1) & 3; X.rect(g, cx + (spin === 2 ? 1 : 0), c.y, spin === 2 ? 1 : 3, 3, hex('#ffec27')); X.put(g, cx, c.y, WHITE); }
        const ahead = obstacles.find(o => o.x - x > hx - 2 && o.x - x < hx + 9);
        if (player > 0) { if (taps.length && y === 0) vy = 3.6; }
        else if (ahead && y === 0) vy = 3.4;
        y += vy; vy -= 0.45; if (y <= 0) { y = 0; vy = 0; }
        // collisions: a stumble flashes the runner, coins are counted
        const top = ground - 8 - Math.round(y);
        if (!hurt && obstacles.some(o => o.x - x < hx + 5 && o.x - x + o.w > hx + 1 && ground - o.h < top + 8)) { hurt = 12; score = 0; }
        if (hurt) hurt--;
        for (const c of coins) if (Math.abs(c.x - x - hx - 3) < 4 && Math.abs(c.y - top - 3) < 5) { c.got = true; score++; }
        const frame = y > 0 ? runner[1] : runner[(f >> 1) & 3];
        const sw = Math.max(1, 3 - Math.round(y / 4)); X.rect(g, hx + 3 - sw, ground, sw * 2, 1, shadowC);
        if (!(hurt & 2)) for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) if (frame[r][c]) X.put(g, hx + c, top + r, r < 2 && c === 3 ? heroDark : r > 4 ? heroLegs : hero);
        X.text(g, String(score), 2, 2, WHITE);
      };
      }

    },
  });

  // ---------- 108 Chase ----------
  P.addPixel({
    name: 'Chase', fam: 'Sprites', sizes: [100], fps: 12,
    interactive: 'Point where to go and the round one heads there; leave it and it plays itself.',
    recipe: 'A mirrored maze full of dots and four power pills. A hungry round thing eats its way through them while ghosts hunt it along the corridors, turning blue and fleeing when it eats a pill; when the dots are gone, the maze refills.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, T = 5, M = n / T, inks = X.inks(R, 6, 0.4);
      const wallC = inks[R.int(0, inks.length - 1)], dotC = 0xffd0e0ff, hero = 0xff30e0ff, ghostCols = [inks[0], inks[2 % inks.length], inks[4 % inks.length]];
      // maze: carve the left half by a random walk, mirror it, then knock out some walls so there are loops
      const open = new Uint8Array(M * M);
      const H = M >> 1;
      const carve = (x, y) => {
        open[y * M + x] = 1;
        for (const [dx, dy] of R.shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]])) {
          const xx = x + dx, yy = y + dy;
          if (xx < 1 || yy < 1 || xx >= H || yy >= M - 1 || open[yy * M + xx]) continue;
          open[(y + dy / 2) * M + x + dx / 2] = 1; carve(xx, yy);
        }
      };
      carve(1, 1);
      for (let y = 1; y < M - 1; y++) open[y * M + H] = open[y * M + H - 1] && R.bool(0.5) ? 1 : 0;
      for (let k = 0; k < M * 2; k++) { const x = R.int(1, H - 1), y = R.int(1, M - 2); if ((x + y) & 1) open[y * M + x] = 1; }
      for (let y = 0; y < M; y++) for (let x = 0; x < H; x++) open[y * M + M - 1 - x] = open[y * M + x];
      for (let y = 1; y < M - 1; y++) if (open[y * M + H - 1]) open[y * M + H] = 1;
      const cells = []; for (let i = 0; i < M * M; i++) if (open[i]) cells.push(i);
      let dots;
      const refill = () => { dots = new Uint8Array(M * M); for (const i of cells) dots[i] = 1; };
      refill();
      const nb = i => [1, -1, M, -M].map(o => i + o).filter(j => j >= 0 && j < M * M && open[j] && Math.abs((j % M) - (i % M)) <= 1);
      const bfsStep = (from, goal) => {
        const prev = new Int32Array(M * M).fill(-1), q = [from]; prev[from] = from;
        while (q.length) { const i = q.shift(); if (goal(i)) { let j = i; while (prev[j] !== from && j !== from) j = prev[j]; return j; } for (const j of nb(i)) if (prev[j] < 0) { prev[j] = i; q.push(j); } }
        return from;
      };
      const actor = (i, speed) => ({ i, to: i, px: (i % M) * T, py: (i / M | 0) * T, speed, dir: 0 });
      let pac = actor(cells[0], 1), ghosts = ghostCols.map((c, k) => Object.assign(actor(cells[cells.length - 1 - k * 7], 1), { col: c }));
      g.trait('Palette', inkName(inks)); g.trait('Walls', 'Outline'); g.trait('Maze', 'Classic'); g.trait('Ghosts', ghosts.length); g.trait('Pills', 'None');
      const advance = (a, chooser) => {
        const tx = (a.to % M) * T, ty = (a.to / M | 0) * T;
        if (a.px === tx && a.py === ty) { a.i = a.to; a.to = chooser(a); a.dir = a.to - a.i; }
        const nx = (a.to % M) * T, ny = (a.to / M | 0) * T;
        a.px += Math.sign(nx - a.px); a.py += Math.sign(ny - a.py);
      };
      const inp = g.input;
      let idle = 99;
      return (t, dt, f) => {
        inp.taps();
        if (inp.inside && inp.live) idle = 0; else idle += dt || 0;
        const c = idle < 4 ? inp.cell(M) : null;
        advance(pac, a => {
          dots[a.i] = 0;
          if (c) {   // the viewer steers: the open neighbour nearest the pointer
            let best = a.i, bd = (a.i % M - c.x) ** 2 + ((a.i / M | 0) - c.y) ** 2;
            for (const j of nb(a.i)) { const dd = (j % M - c.x) ** 2 + ((j / M | 0) - c.y) ** 2; if (dd < bd) { bd = dd; best = j; } }
            return best;
          }
          return bfsStep(a.i, j => dots[j] && j !== a.i);
        });
        dots[pac.i] = 0;
        if ((f & 7) !== 0) ghosts.forEach(gh => advance(gh, a => (R.bool(0.75) ? bfsStep(a.i, j => j === pac.i) : R.pick(nb(a.i)))));
        if (!dots.some(v => v)) refill();
        if (ghosts.some(gh => Math.abs(gh.px - pac.px) + Math.abs(gh.py - pac.py) < 3)) { ghosts = ghostCols.map((c, k) => Object.assign(actor(cells[cells.length - 1 - k * 7], 1), { col: c })); }
        d.fill(BLACK);
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
          if (open[y * M + x]) { if (dots[y * M + x]) X.put(g, x * T + 2, y * T + 2, dotC); continue; }
          for (let v = 0; v < T; v++) for (let u = 0; u < T; u++) {
            const edge = (u === 0 && x > 0 && open[y * M + x - 1]) || (u === T - 1 && x < M - 1 && open[y * M + x + 1]) || (v === 0 && y > 0 && open[(y - 1) * M + x]) || (v === T - 1 && y < M - 1 && open[(y + 1) * M + x]);
            if (edge) d[(y * T + v) * n + x * T + u] = wallC;
          }
        }
        const mouth = (f >> 1) & 1, dir = pac.dir === 1 ? [1, 0] : pac.dir === -1 ? [-1, 0] : pac.dir === M ? [0, 1] : [0, -1];
        for (let v = 0; v < 5; v++) for (let u = 0; u < 5; u++) {
          const dx = u - 2, dy = v - 2;
          if (dx * dx + dy * dy > 5) continue;
          if (mouth && dx * dir[0] + dy * dir[1] > 0 && Math.abs(dx * dir[1] - dy * dir[0]) <= dx * dir[0] + dy * dir[1]) continue;
          X.put(g, pac.px + u, pac.py + v, hero);
        }
        for (const gh of ghosts) {
          const sk = (f >> 2) & 1;
          for (let v = 0; v < 5; v++) for (let u = 0; u < 5; u++) {
            if (v === 0 && (u === 0 || u === 4)) continue;
            if (v === 4 && (u + sk) % 2) continue;
            X.put(g, gh.px + u, gh.py + v, gh.col);
          }
          X.put(g, gh.px + 1, gh.py + 1, WHITE); X.put(g, gh.px + 3, gh.py + 1, WHITE);
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, T = R.pick([5, 5, 4]), M = Math.floor(n / T), inp = g.input, sc = scheme(R, ['Pico', 'Neon', 'Sweetie', 'Dusk', 'Candy']);
      const wallC = R.pick(sc.ramps), dotC = hex('#ffccaa'), heroC = hex('#ffec27'), ghostCols = R.shuffle(sc.ramps.map(r => r[1])).slice(0, R.int(2, 4)), wallStyle = R.pick(['line', 'double', 'solid']);
      const open = new Uint8Array(M * M), H = M >> 1;
      const carve = (x, y) => {
        open[y * M + x] = 1;
        for (const [dx, dy] of R.shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]])) {
          const xx = x + dx, yy = y + dy;
          if (xx < 1 || yy < 1 || xx >= H || yy >= M - 1 || open[yy * M + xx]) continue;
          open[(y + dy / 2) * M + x + dx / 2] = 1; carve(xx, yy);
        }
      };
      carve(1, 1);
      for (let y = 1; y < M - 1; y++) open[y * M + H] = open[y * M + H - 1] && R.bool(0.5) ? 1 : 0;
      // how many walls are knocked through: a tight labyrinth, the classic, or an open arena
      const mazeK = g.alt.pick(['Classic', 'Classic', 'Tight', 'Open']);
      for (let k = 0; k < M * (mazeK === 'Open' ? 6 : mazeK === 'Tight' ? 0.6 : 2); k++) { const x = R.int(1, H - 1), y = R.int(1, M - 2); if ((x + y) & 1) open[y * M + x] = 1; }
      for (let y = 0; y < M; y++) for (let x = 0; x < H; x++) open[y * M + M - 1 - x] = open[y * M + x];
      for (let y = 1; y < M - 1; y++) if (open[y * M + H - 1]) open[y * M + H] = 1;
      const cells = []; for (let i = 0; i < M * M; i++) if (open[i]) cells.push(i);
      g.trait('Palette', sc.name); g.trait('Walls', cap(wallStyle)); g.trait('Maze', mazeK); g.trait('Ghosts', ghostCols.length); g.trait('Pills', 'Four'); g.trait('Tile', T);
      const corners = [cells[0], cells[cells.length - 1], cells.find(i => i % M > M / 2), cells.slice().reverse().find(i => i % M < M / 2)];
      let dots, frightened = 0, idle = 99;
      const refill = () => { dots = new Uint8Array(M * M); for (const i of cells) dots[i] = 1; for (const c of corners) dots[c] = 2; };
      refill();
      const nb = i => [1, -1, M, -M].map(o => i + o).filter(j => j >= 0 && j < M * M && open[j] && Math.abs((j % M) - (i % M)) <= 1);
      const prev = new Int32Array(M * M), q = new Int32Array(M * M);
      const bfsStep = (from, goal) => {
        prev.fill(-1); let h = 0, e = 0; q[e++] = from; prev[from] = from;
        while (h < e) { const i = q[h++]; if (goal(i)) { let j = i; while (prev[j] !== from && j !== from) j = prev[j]; return j; } for (const j of nb(i)) if (prev[j] < 0) { prev[j] = i; q[e++] = j; } }
        return from;
      };
      const actor = (i) => ({ i, to: i, px: (i % M) * T, py: (i / M | 0) * T, dir: 1 });
      const home = () => ghostCols.map((c, k) => Object.assign(actor(cells[(cells.length >> 1) + k * 3] || cells[0]), { col: c }));
      let pac = actor(cells[0]), ghosts = home();
      const advance = (a, chooser) => {
        const tx = (a.to % M) * T, ty = (a.to / M | 0) * T;
        if (a.px === tx && a.py === ty) { a.i = a.to; a.to = chooser(a); if (a.to !== a.i) a.dir = a.to - a.i; }
        const nx = (a.to % M) * T, ny = (a.to / M | 0) * T;
        a.px += Math.sign(nx - a.px); a.py += Math.sign(ny - a.py);
      };
      return (t, dt, f) => {
        inp.taps();
        if (inp.inside && inp.live) idle = 0; else idle += dt;
        const target = idle < 4 ? (() => { const c = inp.cell(M); return c ? c.y * M + c.x : -1; })() : -1;
        advance(pac, a => {
          if (target >= 0) {   // the viewer steers: the open neighbour nearest the pointer
            const tx = target % M, ty = target / M | 0;
            let best = a.i, bd = (a.i % M - tx) ** 2 + ((a.i / M | 0) - ty) ** 2;
            for (const j of nb(a.i)) { const dd = (j % M - tx) ** 2 + ((j / M | 0) - ty) ** 2; if (dd < bd) { bd = dd; best = j; } }
            return best;
          }
          return bfsStep(a.i, j => dots[j] && j !== a.i);
        });
        if (dots[pac.i] === 2) frightened = 90;
        dots[pac.i] = 0;
        if (frightened) frightened--;
        if ((f & 7) !== 0 && (!frightened || (f & 1))) ghosts.forEach(gh => advance(gh, a => frightened ? R.pick(nb(a.i)) : (R.bool(0.7) ? bfsStep(a.i, j => j === pac.i) : R.pick(nb(a.i)))));
        if (!dots.some(v => v)) refill();
        for (const gh of ghosts) if (Math.abs(gh.px - pac.px) + Math.abs(gh.py - pac.py) < 3) {
          if (frightened) Object.assign(gh, actor(cells[cells.length >> 1]));
          else { ghosts = home(); pac = actor(cells[0]); break; }
        }
        d.fill(BLACK);
        for (let y = 0; y < M; y++) for (let x = 0; x < M; x++) {
          if (open[y * M + x]) {
            if (dots[y * M + x] === 1) X.put(g, x * T + (T >> 1), y * T + (T >> 1), dotC);
            else if (dots[y * M + x] === 2 && (f >> 2) & 1) X.rect(g, x * T + 1, y * T + 1, T - 2, T - 2, dotC);
            continue;
          }
          for (let v = 0; v < T; v++) for (let u = 0; u < T; u++) {
            const edge = (u === 0 && x > 0 && open[y * M + x - 1]) || (u === T - 1 && x < M - 1 && open[y * M + x + 1]) || (v === 0 && y > 0 && open[(y - 1) * M + x]) || (v === T - 1 && y < M - 1 && open[(y + 1) * M + x]);
            const inner = wallStyle === 'double' && !edge && ((u === 1 && x > 0 && open[y * M + x - 1]) || (u === T - 2 && x < M - 1 && open[y * M + x + 1]) || (v === 1 && y > 0 && open[(y - 1) * M + x]) || (v === T - 2 && y < M - 1 && open[(y + 1) * M + x]));
            if (edge) d[(y * T + v) * n + x * T + u] = wallC[2];
            else if (inner) d[(y * T + v) * n + x * T + u] = wallC[1];
            else if (wallStyle === 'solid') d[(y * T + v) * n + x * T + u] = wallC[0];
          }
        }
        const mouth = (f >> 1) & 1, dir = pac.dir === 1 ? [1, 0] : pac.dir === -1 ? [-1, 0] : pac.dir === M ? [0, 1] : [0, -1], c2 = (T - 1) / 2;
        for (let v = 0; v < T; v++) for (let u = 0; u < T; u++) {
          const dx = u - c2, dy = v - c2;
          if (dx * dx + dy * dy > c2 * c2 + 1) continue;
          if (mouth && dx * dir[0] + dy * dir[1] > 0 && Math.abs(dx * dir[1] - dy * dir[0]) <= dx * dir[0] + dy * dir[1]) continue;
          X.put(g, pac.px + u, pac.py + v, heroC);
        }
        for (const gh of ghosts) {
          const sk = (f >> 2) & 1, col = frightened ? ((frightened < 25 && (f & 2)) ? WHITE : hex('#3b5dc9')) : gh.col;
          for (let v = 0; v < T; v++) for (let u = 0; u < T; u++) {
            if (v === 0 && (u === 0 || u === T - 1)) continue;
            if (v === T - 1 && (u + sk) % 2) continue;
            X.put(g, gh.px + u, gh.py + v, col);
          }
          X.put(g, gh.px + 1, gh.py + 1, WHITE); X.put(g, gh.px + T - 2, gh.py + 1, WHITE);
        }
      };
      }

    },
  });

  // ---------- 109 Serpent ----------
  P.addPixel({
    name: 'Serpent', seed: 1, fam: 'Sprites', sizes: [25, 40], fps: 10,
    interactive: 'Point and the snake heads for the pointer; leave it and it plays itself.',
    recipe: 'A snake on a black board that plays its own game: it plans a path to the next fruit, checks it can still reach its tail afterwards, and grows a gradient body until it fills the board.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, N = n * n, inks0 = X.inks(R, 5, 0.5), ramp = X.rampPk(inks0, 32, true), fruitC = WHITE, floorA = BLACK, floorB = BLACK;
      g.trait('Palette', inkName(inks0)); g.trait('Board', 'Black'); g.trait('Fruit', 'White'); g.trait('Grid', n);   // the founder asked for a black background
      let body, food, dead = 0;
      // walls on the board (second stream): none as before, pillars, two bars or a box with doors; the snake plans round them
      const walls = g.home ? 'None' : g.alt.pick(['None', 'None', 'Pillars', 'Bars', 'Box']), W = walls === 'None' ? null : new Uint8Array(n * n);
      if (W) { const q = n >> 2, mid = n >> 1, set = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n && Math.abs(y - mid) > 1) W[y * n + x] = 1; };
        if (walls === 'Pillars') for (const py of [q, n - q - 2]) for (let px = q - 1; px < n - 2; px += q) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) set(px + a, py + b);
        else if (walls === 'Bars') for (const px of [q - 1, n - q]) for (let y = Math.round(n * 0.18); y < Math.round(n * 0.82); y++) set(px, y);
        else { const a = 2, b = n - 3; for (let k = a; k <= b; k++) { if (Math.abs(k - mid) > 1) { set(k, a); set(k, b); set(a, k); set(b, k); } } } }
      g.trait('Walls', walls);
      const place = () => { const occ = new Set(body); const free = []; for (let i = 0; i < N; i++) if (!occ.has(i) && !(W && W[i])) free.push(i); food = free.length ? R.pick(free) : -1; };
      const reset = () => { const c = (n >> 1) * n + (n >> 1); body = [c, c - 1, c - 2, c - 3, c - 4]; place(); dead = 0; };
      reset();
      const nb = i => { const x = i % n, y = i / n | 0, o = []; if (x > 0) o.push(i - 1); if (x < n - 1) o.push(i + 1); if (y > 0) o.push(i - n); if (y < n - 1) o.push(i + n); return W ? o.filter(j => !W[j]) : o; };
      const path = (from, to, blocked) => {
        const prev = new Int32Array(N).fill(-1), q = [from]; prev[from] = from;
        for (let h = 0; h < q.length; h++) { const i = q[h]; if (i === to) break; for (const j of nb(i)) if (prev[j] < 0 && (!blocked.has(j) || j === to)) { prev[j] = i; q.push(j); } }
        if (prev[to] < 0) return null;
        const out = []; for (let i = to; i !== from; i = prev[i]) out.unshift(i); return out;
      };
      const inp = g.input;
      let idle = 99, warm = true;
      const frame = (t, dt, f) => {
        inp.taps();
        if (inp.inside && inp.live && !warm) idle = 0; else idle += dt || 0;
        const c = idle < 4 ? inp.cell(n) : null;
        // after a crash the snake flashes, then winds itself in from the tail before a new one starts
        for (let rep = 0; rep < (c ? 1 : 2); rep++) if (dead) { dead++; if (dead > 12) { for (let k = Math.max(1, Math.ceil(body.length / 16)); k > 0 && body.length > 1; k--) body.pop(); if (body.length <= 1) reset(); } }
        else {
          const head = body[0], blocked = new Set(body.slice(0, -1));
          let move = null;
          if (c) {   // the viewer steers: the free neighbour nearest the pointer
            let bd = Infinity;
            for (const j of nb(head)) if (!blocked.has(j)) { const dd = (j % n - c.x) ** 2 + ((j / n | 0) - c.y) ** 2; if (dd < bd) { bd = dd; move = j; } }
          } else {
          const p = food >= 0 ? path(head, food, blocked) : null;
          if (p) {
            const future = [...p.reverse(), ...body].slice(0, body.length + 1);
            p.reverse();
            const fb = new Set(future.slice(0, -1));
            if (path(future[0], future[future.length - 1], fb)) move = p[0];
          }
          if (move === null) {
            const tailPath = path(head, body[body.length - 1], blocked);
            const opts = nb(head).filter(j => !blocked.has(j));
            move = opts.length ? opts.sort((a, b) => (path(b, body[body.length - 1], new Set(body.slice(0, -1))) ? 1 : 0) - (path(a, body[body.length - 1], new Set(body.slice(0, -1))) ? 1 : 0))[0] : tailPath ? tailPath[0] : null;
          }
          }
          if (move === null || (blocked.has(move) && move !== body[body.length - 1])) dead = 1;
          else { body.unshift(move); if (move === food) place(); else body.pop(); if (food < 0) dead = 1; }
        }
        for (let i = 0; i < N; i++) d[i] = ((i % n) + (i / n | 0)) & 1 ? floorA : floorB;
        if (W) for (let i = 0; i < N; i++) if (W[i]) d[i] = (i / n | 0) > 0 && W[i - n] ? 0xff3a3644 : 0xff5a566a;
        body.forEach((i, k) => { d[i] = dead && dead <= 12 && (dead >> 1) & 1 ? WHITE : ramp[(k + f) % 32]; });
        if (body.length && !dead) d[body[0]] = X.mixPk(ramp[f % 32], WHITE, 0.45);
        if (food >= 0) d[food] = fruitC;
      };
      // open on a snake that has already eaten a few fruit, not a five-cell stub
      const PRE = n >= 40 ? 300 : 200;
      for (let i = 0; i < PRE; i++) frame(0, 0.1, i);
      warm = false;
      return (t, dt, f) => frame(t, dt, f + PRE);
      }
      function rework(R, U, g) {
      const { n, d } = g, N = n * n, sc = scheme(R), ramp = X.rampPk(R.pick([[...R.pick(sc.ramps), ...R.pick(sc.ramps)], X.inks(R, 5, 0.6)]), 32, true), fruitC = R.pick([hex('#ff004d'), hex('#ffec27'), WHITE]), inp = g.input;
      const dotsC = R.bool(0.5) ? hex('#111118') : BLACK;
      g.trait('Palette', sc.name); g.trait('Board', dotsC === BLACK ? 'Black' : 'Dotted'); g.trait('Fruit', fruitC === WHITE ? 'White' : fruitC === hex('#ff004d') ? 'Cherry' : 'Lemon'); g.trait('Grid', n);
      let body, food, dead = 0, idle = 99;
      const occ = new Uint8Array(N);
      // walls on the board (second stream): none as before, pillars, two bars or a box with doors; the snake plans round them
      const walls = g.home ? 'None' : g.alt.pick(['None', 'None', 'Pillars', 'Bars', 'Box']), W = walls === 'None' ? null : new Uint8Array(n * n);
      if (W) { const q = n >> 2, mid = n >> 1, set = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n && Math.abs(y - mid) > 1) W[y * n + x] = 1; };
        if (walls === 'Pillars') for (const py of [q, n - q - 2]) for (let px = q - 1; px < n - 2; px += q) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) set(px + a, py + b);
        else if (walls === 'Bars') for (const px of [q - 1, n - q]) for (let y = Math.round(n * 0.18); y < Math.round(n * 0.82); y++) set(px, y);
        else { const a = 2, b = n - 3; for (let k = a; k <= b; k++) { if (Math.abs(k - mid) > 1) { set(k, a); set(k, b); set(a, k); set(b, k); } } } }
      g.trait('Walls', walls);
      const place = () => { occ.fill(0); for (const i of body) occ[i] = 1; const free = []; for (let i = 0; i < N; i++) if (!occ[i] && !(W && W[i])) free.push(i); food = free.length ? R.pick(free) : -1; };
      const reset = () => { const c = (n >> 1) * n + (n >> 1); body = [c, c - 1, c - 2, c - 3, c - 4]; place(); dead = 0; };
      reset();
      const nb = i => { const x = i % n, y = i / n | 0, o = []; if (x > 0) o.push(i - 1); if (x < n - 1) o.push(i + 1); if (y > 0) o.push(i - n); if (y < n - 1) o.push(i + n); return W ? o.filter(j => !W[j]) : o; };
      const prev = new Int32Array(N), q = new Int32Array(N);
      const path = (from, to, blocked) => {
        prev.fill(-1); let h = 0, e = 0; q[e++] = from; prev[from] = from;
        while (h < e) { const i = q[h++]; if (i === to) break; for (const j of nb(i)) if (prev[j] < 0 && (!blocked.has(j) || j === to)) { prev[j] = i; q[e++] = j; } }
        if (prev[to] < 0) return null;
        const out = []; for (let i = to; i !== from; i = prev[i]) out.unshift(i); return out;
      };
      let warm = true;
      const frame = (t, dt, f) => {
        inp.taps();
        if (inp.inside && inp.live && !warm) idle = 0; else idle += dt;
        // after a crash the snake flashes, then winds itself in from the tail before a new one starts
        for (let rep = 0; rep < 2; rep++) if (dead) { dead++; if (dead > 12) { for (let k = Math.max(1, Math.ceil(body.length / 16)); k > 0 && body.length > 1; k--) body.pop(); if (body.length <= 1) reset(); } }
        else {
          const head = body[0], blocked = new Set(body.slice(0, -1));
          let move = null;
          const c = idle < 4 ? inp.cell(n) : null;
          if (c) {   // the viewer steers: the free neighbour nearest the pointer
            let best = null, bd = Infinity;
            for (const j of nb(head)) if (!blocked.has(j)) { const dd = (j % n - c.x) ** 2 + ((j / n | 0) - c.y) ** 2; if (dd < bd) { bd = dd; best = j; } }
            move = best;
          } else {
            const p = food >= 0 ? path(head, food, blocked) : null;
            if (p) {
              const future = [...p.slice().reverse(), ...body].slice(0, body.length + 1);
              const fb = new Set(future.slice(0, -1));
              if (path(future[0], future[future.length - 1], fb)) move = p[0];
            }
            if (move === null) {
              const tailPath = path(head, body[body.length - 1], blocked);
              const opts = nb(head).filter(j => !blocked.has(j));
              move = opts.length ? opts.sort((a, b) => (path(b, body[body.length - 1], new Set(body.slice(0, -1))) ? 1 : 0) - (path(a, body[body.length - 1], new Set(body.slice(0, -1))) ? 1 : 0))[0] : tailPath ? tailPath[0] : null;
            }
          }
          if (move === null || (blocked.has(move) && move !== body[body.length - 1])) dead = 1;
          else { body.unshift(move); if (move === food) place(); else body.pop(); if (food < 0) dead = 1; }
          if (c) break;   // one step a frame when the viewer steers
        }
        d.fill(BLACK);
        if (dotsC !== BLACK) for (let i = 0; i < N; i++) if ((i % n) % 2 === 0 && ((i / n | 0) % 2 === 0)) d[i] = dotsC;
        if (W) for (let i = 0; i < N; i++) if (W[i]) d[i] = (i / n | 0) > 0 && W[i - n] ? sc.ground[1] : X.mixPk(sc.ground[2], WHITE, 0.2);
        body.forEach((i, k) => { d[i] = dead && dead <= 12 && (dead >> 1) & 1 ? WHITE : ramp[(k + f) % 32]; });
        if (body.length && !dead) d[body[0]] = WHITE;
        if (food >= 0) d[food] = (f >> 2) & 1 ? fruitC : X.mixPk(fruitC, WHITE, 0.4);
      };
      // open on a snake that has already eaten a few fruit, not a five-cell stub
      const PRE = n >= 40 ? 300 : 200;
      for (let i = 0; i < PRE; i++) frame(0, 0.1, i);
      warm = false;
      return (t, dt, f) => frame(t, dt, f + PRE);
      }

    },
  });

  // ---------- 110 Stack ----------
  P.addPixel({
    name: 'Stack', seed: 2, fam: 'Sprites', sizes: [100], fps: 12,
    interactive: 'Move the pointer to steer the falling piece, click to turn it; leave it and the machine plays.',
    recipe: 'Falling blocks played by a patient machine: it tries every turn and column for each piece, weighs height, holes and roughness, and drops it where the stack stays tidiest. Classic bevelled blocks, neon outlines or a four-green handheld.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, BW = 10, BH = 22, C = 4, ox = 8, oy = n - BH * C - 6;
      const SH = [[[0, 1], [1, 1], [2, 1], [3, 1]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[2, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [2, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [1, 1], [2, 1]]];
      const inks = X.inks(R, 7, 0.5), cols = SH.map((_, k) => inks[k % inks.length]);
      g.trait('Style', 'Bevel'); g.trait('Palette', inkName(inks)); g.trait('Well', 'Left'); g.trait('Ghost', 'None');
      const rot = (s, r) => { let p = s; for (let k = 0; k < r; k++) p = p.map(([x, y]) => [-y, x]); const mx = Math.min(...p.map(q => q[0])), my = Math.min(...p.map(q => q[1])); return p.map(([x, y]) => [x - mx, y - my]); };
      let board, cur, next, lines, flash, clearing;
      const fits = (b, s, x, y) => s.every(([u, v]) => x + u >= 0 && x + u < BW && y + v < BH && (y + v < 0 || !b[(y + v) * BW + x + u]));
      const score = b => {
        const hs = []; let holes = 0, full = 0;
        for (let x = 0; x < BW; x++) { let h = 0; for (let y = 0; y < BH; y++) if (b[y * BW + x]) { h = BH - y; break; } hs.push(h); for (let y = BH - h; y < BH; y++) if (!b[y * BW + x]) holes++; }
        for (let y = 0; y < BH; y++) { let k = 0; for (let x = 0; x < BW; x++) if (b[y * BW + x]) k++; if (k === BW) full++; }
        let bump = 0; for (let x = 1; x < BW; x++) bump += Math.abs(hs[x] - hs[x - 1]);
        return -0.51 * hs.reduce((a, c) => a + c, 0) + 0.76 * full - 0.36 * holes - 0.18 * bump - 0.6 * Math.max(...hs) - 0.05 * Math.max(...hs) ** 2;
      };
      const plan = type => {
        let best = null;
        for (let r = 0; r < 4; r++) {
          const s = rot(SH[type], r), w = Math.max(...s.map(q => q[0])) + 1;
          for (let x = 0; x + w <= BW; x++) {
            let y = -2; if (!fits(board, s, x, y)) continue;
            while (fits(board, s, x, y + 1)) y++;
            const b = board.slice(); s.forEach(([u, v]) => { if (y + v >= 0) b[(y + v) * BW + x + u] = type + 1; });
            const sc = score(b);
            if (!best || sc > best.sc) best = { sc, r, x };
          }
        }
        return best;
      };
      const spawn = () => {
        const type = next; next = R.int(0, 6);
        const p = plan(type);
        if (!p) { reset(); return; }
        cur = { type, s: rot(SH[type], p.r), x: 3, y: -2, tx: p.x };
      };
      const reset = () => { board = new Uint8Array(BW * BH); lines = 0; flash = 0; next = R.int(0, 6); spawn(); };
      reset();
      const cell = (x, y, c) => { X.rect(g, ox + x * C, oy + y * C, C, C, c); X.rect(g, ox + x * C, oy + y * C, C, 1, X.mixPk(c, WHITE, 0.4)); X.rect(g, ox + x * C + C - 1, oy + y * C + 1, 1, C - 1, X.shade(c, 0.55)); X.rect(g, ox + x * C, oy + y * C + C - 1, C, 1, X.shade(c, 0.55)); };
      const inp = g.input;
      let idle = 99, warm = true;
      const frame = (t, dt, f) => {
        const taps = warm ? [] : inp.taps();
        if (((inp.inside && inp.live) || taps.length) && !warm) idle = 0; else idle += dt || 0;
        if (!clearing && idle < 5) {   // the viewer steers: column under the pointer, a click turns the piece
          if (taps.length) { const s2 = rot(cur.s, 1); if (fits(board, s2, cur.x, cur.y)) cur.s = s2; }
          const w = Math.max(...cur.s.map(q => q[0])) + 1;
          cur.tx = Math.max(0, Math.min(BW - w, Math.floor((inp.x * n - ox) / C - w / 2 + 0.5)));
        }
        if (clearing) {
          if (++flash > 4) { for (const y of clearing) { board.copyWithin(BW, 0, y * BW); board.fill(0, 0, BW); } lines += clearing.length; clearing = null; flash = 0; spawn(); }
        } else {
          if (cur.x !== cur.tx) { const nx = cur.x + Math.sign(cur.tx - cur.x); if (fits(board, cur.s, nx, cur.y)) cur.x = nx; }
          if (fits(board, cur.s, cur.x, cur.y + 1)) cur.y++;
          else {
            if (cur.y < 0) { reset(); }
            else {
              cur.s.forEach(([u, v]) => { board[(cur.y + v) * BW + cur.x + u] = cur.type + 1; });
              const full = []; for (let y = 0; y < BH; y++) { let k = 0; for (let x = 0; x < BW; x++) if (board[y * BW + x]) k++; if (k === BW) full.push(y); }
              if (full.length) clearing = full; else spawn();
            }
          }
        }
        d.fill(0xff101010);
        X.rect(g, ox - 2, oy - 2, BW * C + 4, BH * C + 4, 0xff3a3a3a); X.rect(g, ox, oy, BW * C, BH * C, BLACK);
        for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
          const v = board[y * BW + x];
          if (v) cell(x, y, clearing && clearing.includes(y) && (flash & 1) ? WHITE : cols[v - 1]);
        }
        if (!clearing) cur.s.forEach(([u, v]) => { if (cur.y + v >= 0) cell(cur.x + u, cur.y + v, cols[cur.type]); });
        const px = ox + BW * C + 10;
        X.text(g, 'NEXT', px, oy, 0xff909090);
        rot(SH[next], 0).forEach(([u, v]) => { X.rect(g, px + u * C, oy + 12 + v * C, C, C, cols[next]); });
        X.text(g, 'LINES', px, oy + 30, 0xff909090);
        X.text(g, String(lines), px, oy + 40, WHITE);
      };
      // open on a game already under way, with a stack to look at
      for (let i = 0; i < 300; i++) frame(i / 12, 1 / 12, i);
      warm = false;
      return (t, dt, f) => frame(t, dt, f + 300);
      }
      function rework(R, U, g) {
      const { n, d } = g, BW = 10, BH = 22, C = 4, ox = R.pick([8, 30]), oy = n - BH * C - 6, inp = g.input;
      const SH = [[[0, 1], [1, 1], [2, 1], [3, 1]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[2, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [2, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [1, 1], [2, 1]]];
      const style = R.pick(['bevel', 'bevel', 'neon', 'handheld']), sc = style === 'handheld' ? PACKED.find(s => s.name === 'Game Boy') : scheme(R, ['Pico', 'Sweetie', 'Neon', 'Candy', 'Ember']);
      const rampsFor = SH.map((_, k) => sc.ramps[k % sc.ramps.length]);
      g.trait('Style', cap(style)); g.trait('Palette', sc.name); g.trait('Well', ox > 8 ? 'Centre' : 'Left'); g.trait('Ghost', 'Shown');
      const bg = style === 'handheld' ? sc.ground[0] : hex('#0c0c12'), well = style === 'handheld' ? sc.ramps[0][1] : BLACK, frame = style === 'handheld' ? sc.ramps[1][2] : sc.ground[2];
      const rot = (s, r) => { let p = s; for (let k = 0; k < r; k++) p = p.map(([x, y]) => [-y, x]); const mx = Math.min(...p.map(q => q[0])), my = Math.min(...p.map(q => q[1])); return p.map(([x, y]) => [x - mx, y - my]); };
      let board, cur, next, lines, flash, clearing, idle = 99;
      const fits = (b, s, x, y) => s.every(([u, v]) => x + u >= 0 && x + u < BW && y + v < BH && (y + v < 0 || !b[(y + v) * BW + x + u]));
      const score = b => {
        const hs = []; let holes = 0, full = 0;
        for (let x = 0; x < BW; x++) { let h = 0; for (let y = 0; y < BH; y++) if (b[y * BW + x]) { h = BH - y; break; } hs.push(h); for (let y = BH - h; y < BH; y++) if (!b[y * BW + x]) holes++; }
        for (let y = 0; y < BH; y++) { let k = 0; for (let x = 0; x < BW; x++) if (b[y * BW + x]) k++; if (k === BW) full++; }
        let bump = 0; for (let x = 1; x < BW; x++) bump += Math.abs(hs[x] - hs[x - 1]);
        return -0.51 * hs.reduce((a, c) => a + c, 0) + 0.76 * full - 0.36 * holes - 0.18 * bump - 0.6 * Math.max(...hs) - 0.05 * Math.max(...hs) ** 2;
      };
      const plan = type => {
        let best = null;
        for (let r = 0; r < 4; r++) {
          const s = rot(SH[type], r), w = Math.max(...s.map(q => q[0])) + 1;
          for (let x = 0; x + w <= BW; x++) {
            let y = -2; if (!fits(board, s, x, y)) continue;
            while (fits(board, s, x, y + 1)) y++;
            const b = board.slice(); s.forEach(([u, v]) => { if (y + v >= 0) b[(y + v) * BW + x + u] = type + 1; });
            const sc2 = score(b);
            if (!best || sc2 > best.sc) best = { sc: sc2, r, x };
          }
        }
        return best;
      };
      const spawn = () => {
        const type = next; next = R.int(0, 6);
        const p = plan(type);
        if (!p) { reset(); return; }
        cur = { type, r: 0, s: rot(SH[type], p.r), x: 3, y: -2, tx: p.x, pr: p.r };
      };
      const reset = () => { board = new Uint8Array(BW * BH); lines = 0; flash = 0; next = R.int(0, 6); spawn(); };
      reset();
      const cell = (x, y, r) => {
        const px = ox + x * C, py = oy + y * C;
        if (style === 'neon') { X.rect(g, px, py, C, C, BLACK); X.rect(g, px, py, C, 1, r[2]); X.rect(g, px, py, 1, C, r[2]); X.rect(g, px + C - 1, py, 1, C, r[1]); X.rect(g, px, py + C - 1, C, 1, r[1]); return; }
        X.rect(g, px, py, C, C, r[1]); X.rect(g, px, py, C, 1, r[2]); X.rect(g, px, py, 1, C - 1, r[2]); X.rect(g, px + C - 1, py + 1, 1, C - 1, r[0]); X.rect(g, px, py + C - 1, C, 1, r[0]);
      };
      let warm = true;
      const tick = (t, dt, f) => {
        const taps = warm ? [] : inp.taps();
        if (((inp.inside && inp.live) || taps.length) && !warm) idle = 0; else idle += dt;
        if (clearing) {
          if (++flash > 4) { for (const y of clearing) { board.copyWithin(BW, 0, y * BW); board.fill(0, 0, BW); } lines += clearing.length; clearing = null; flash = 0; spawn(); }
        } else {
          if (idle < 5) {   // the viewer steers: column under the pointer, a click turns the piece
            if (taps.length) { const s2 = rot(cur.s, 1); if (fits(board, s2, cur.x, cur.y)) cur.s = s2; }
            const w = Math.max(...cur.s.map(q => q[0])) + 1;
            cur.tx = Math.max(0, Math.min(BW - w, Math.floor((inp.x * n - ox) / C - w / 2 + 0.5)));
          }
          if (cur.x !== cur.tx) { const nx = cur.x + Math.sign(cur.tx - cur.x); if (fits(board, cur.s, nx, cur.y)) cur.x = nx; }
          if ((idle >= 5 || (f & 1)) && fits(board, cur.s, cur.x, cur.y + 1)) cur.y++;
          else if (!fits(board, cur.s, cur.x, cur.y + 1)) {
            if (cur.y < 0) { reset(); }
            else {
              cur.s.forEach(([u, v]) => { board[(cur.y + v) * BW + cur.x + u] = cur.type + 1; });
              const full = []; for (let y = 0; y < BH; y++) { let k = 0; for (let x = 0; x < BW; x++) if (board[y * BW + x]) k++; if (k === BW) full.push(y); }
              if (full.length) clearing = full; else spawn();
            }
          }
        }
        d.fill(bg);
        if (style !== 'handheld') for (let y = 0; y < n; y += 6) for (let x = (y / 6) & 1 ? 3 : 0; x < n; x += 6) d[y * n + x] = sc.ground[1];
        X.rect(g, ox - 2, oy - 2, BW * C + 4, BH * C + 4, frame); X.rect(g, ox, oy, BW * C, BH * C, well);
        for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
          const v = board[y * BW + x];
          if (v) cell(x, y, clearing && clearing.includes(y) && (flash & 1) ? [WHITE, WHITE, WHITE] : rampsFor[v - 1]);
        }
        if (!clearing) {
          // ghost of where it will land
          let gy = cur.y; while (fits(board, cur.s, cur.x, gy + 1)) gy++;
          if (gy > cur.y + 1) cur.s.forEach(([u, v]) => { if (gy + v >= 0) X.rect(g, ox + (cur.x + u) * C + 1, oy + (gy + v) * C + 1, C - 2, C - 2, rampsFor[cur.type][0]); });
          cur.s.forEach(([u, v]) => { if (cur.y + v >= 0) cell(cur.x + u, cur.y + v, rampsFor[cur.type]); });
        }
        const px = ox + BW * C + 8, tc = style === 'handheld' ? sc.ramps[1][2] : hex('#9a9ab8');
        if (px + 24 < n) {
          X.text(g, 'NEXT', px, oy, tc);
          rot(SH[next], 0).forEach(([u, v]) => cell((px - ox) / C + u, (oy + 12 - oy) / C + v, rampsFor[next]));
          X.text(g, 'LINES', px, oy + 30, tc);
          X.text(g, String(lines), px, oy + 40, style === 'handheld' ? sc.ramps[1][2] : WHITE);
        } else {
          X.text(g, String(lines), 2, 2, tc);
        }
      };
      // open on a game already under way, with a stack to look at
      for (let i = 0; i < 300; i++) tick(i / 12, 1 / 12, i);
      warm = false;
      return (t, dt, f) => tick(t, dt, f + 300);
      }

    },
  });
})();
