// Set 3 · Weather: skies, rain, fog, wind and charts of them, as pixel art.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Weather' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // Variety: a weighted pick from g.alt for a new trait; the opening variation always gets the first
  // value (the original look), so it never changes. list = [[value, weight], ...]
  const vary = (g, list) => { if (g.home) return list[0][0]; let tot = 0; for (const e of list) tot += e[1]; let r = g.alt() * tot; for (const e of list) if ((r -= e[1]) < 0) return e[0]; return list[0][0]; };
  // the name of the palette X.inks rolled (any order), or Rainbow for the native hue wheel
  const inkName = cols => { for (const p of U.PALETTES) { const s = p.cols.map(U.pk); if (s.length === cols.length && s.every(c => cols.includes(c))) return p.name; } return 'Rainbow'; };

  add({
    name: 'Rain on Glass', seed: 1, sizes: [100], fps: 12,
    listens: 'The louder the room, the harder it rains on the glass; a clap throws a gust of spray.',
    recipe: 'Night city lights out of focus behind a window, drops gathering on the glass, swelling and running down in crooked paths that clear a streak of sharper light.',
    make(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 5, 0.5), bokeh = Array.from({ length: 40 }, () => ({ x: R() * n, y: R() * n * 0.9, r: R.range(3, 8), c: inks[R.int(0, inks.length - 1)], p: R() * 9 }));
      const bg = new Uint32Array(n * n), wet = new Float32Array(n * n), drops = [], gb = { n, d: bg };
      // the night behind the glass: deep blue overhead, a faint sodium glow from the street below
      const sky = new Uint32Array(n * n);
      // traits: how the lights are spread (the dice still place them; a city shape moves them), the hour, the window
      const city = g.trait('Lights', vary(g, [['Scattered', 3], ['Skyline', 1.5], ['Traffic', 1.2], ['Few and near', 1]]));
      const hour = g.trait('Hour', vary(g, [['Night', 3], ['Dusk', 1.2], ['Neon fog', 1]])), frame = g.trait('Window', vary(g, [['Pane', 3], ['Mullions', 1.2], ['Sash', 1.2]]));
      g.trait('Palette', city === 'Traffic' ? 'Tail lights' : inkName(inks));
      if (city === 'Skyline') for (const b of bokeh) { b.y = n * 0.42 + b.y * 0.6; b.r *= 0.8; }
      else if (city === 'Traffic') bokeh.forEach((b, i) => { b.y = n * 0.58 + (b.y / n) * n * 0.22; b.r *= 0.7; b.c = i % 3 ? X.rgb(255, 60, 50) : i % 2 ? X.rgb(255, 236, 200) : X.rgb(255, 170, 60); });
      else if (city === 'Few and near') { bokeh.length = 14; for (const b of bokeh) b.r *= 1.7; }
      const SKY = { Night: [[6, 8, 20], [30, 24, 34]], Dusk: [[20, 22, 58], [96, 60, 84]], 'Neon fog': [[26, 10, 40], [40, 60, 70]] }[hour];
      for (let y = 0; y < n; y++) sky.fill(X.mixPk(X.rgb(...SKY[0]), X.rgb(...SKY[1]), Math.floor((y / n) ** 1.6 * 5) / 5), y * n, y * n + n);
      // out-of-focus lights: hue kept, lifted toward warm white, each a soft disc with a brighter rim
      for (const b of bokeh) {
        b.c = X.mixPk(b.c, X.rgb(255, 238, 214), 0.22); b.rim = X.mixPk(b.c, WHITE, 0.28); b.k = 0.6;
        b.fn = (x, y) => { const e = Math.hypot(x + 0.5 - b.x, y + 0.5 - b.y) > b.r - 1; return X.mixPk(bg[y * n + x], e ? b.rim : b.c, e ? b.k : b.k * 0.78); };
      }
      const fog = hour === 'Neon fog' ? X.rgb(70, 50, 90) : hour === 'Dusk' ? X.rgb(60, 58, 90) : X.rgb(44, 50, 70), bead = X.rgb(120, 132, 164);
      let gust = 0;
      // the glass is already beaded when the view opens (from g.alt, so R is untouched)
      for (let k = 0; k < 26; k++) drops.push({ x: g.alt() * n, y: g.alt() * n * 0.9, m: 0.8 + g.alt() * 0.75, v: 0 });
      return (t, dt, f) => {
        bg.set(sky);
        for (const b of bokeh) { b.k = 0.6 + 0.2 * Math.sin(t * 0.4 + b.p); X.disc(gb, b.x, b.y, b.r, b.fn); }
        if (drops.length < 40 && R() < 0.7) drops.push({ x: R() * n, y: R() * n * 0.8, m: R.range(0.8, 1.6), v: 0 });
        const inp = g.input;
        if (inp.listening) {   // more rain when the room is loud, a gust of spray on a clap (from g.alt, so R is untouched)
          const A = g.alt;
          for (let k = 0; k < 3; k++) if (drops.length < 40 + 80 * inp.level && A() < inp.level * 1.4) drops.push({ x: A() * n, y: A() * n * 0.85, m: 0.8 + A() * 0.9, v: 0 });
          if (inp.beats()) gust = 1;
          if (gust > 0.05) { for (let k = 0; k < 4 && drops.length < 140; k++) drops.push({ x: A() * n, y: A() * n, m: 0.7 + A() * 0.4, v: 0 }); gust *= 0.6; }
        }
        for (let i = 0; i < wet.length; i++) wet[i] *= 0.985;
        for (let i = drops.length - 1; i >= 0; i--) {
          const q = drops[i]; q.m += 0.01;
          if (q.m > 1.6) { q.v = Math.min(1.6, q.v + 0.08); q.y += q.v; q.x += R.range(-0.6, 0.6); q.m -= 0.004; }
          const r = q.m * 1.4;
          for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= r * r) { const xx = Math.round(q.x + x), yy = Math.round(q.y + y); if (xx >= 0 && yy >= 0 && xx < n && yy < n) wet[yy * n + xx] = 1; }
          if (q.y > n + 3) drops.splice(i, 1);
        }
        // fogged glass softens and lifts the lights; where a drop has run the glass is clear again, then fogs over in a few steps
        for (let i = 0; i < n * n; i++) { const fg = Math.floor(U.clamp(1.25 - wet[i] * 2.5) * 4) / 4; d[i] = fg > 0 ? X.mixPk(bg[i], fog, 0.38 * fg) : bg[i]; }
        // each drop is a little lens: the lights above it, flipped and brightened, a dark lower rim and a glint
        for (const q of drops) {
          const r = q.m * 1.4, rr = Math.ceil(r);
          for (let y = -rr; y <= rr; y++) for (let x = -rr; x <= rr; x++) {
            if (x * x + y * y > r * r) continue;
            const xx = Math.round(q.x + x), yy = Math.round(q.y + y);
            if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
            const sx = Math.min(n - 1, Math.max(0, Math.round(q.x - x * 1.8))), sy = Math.min(n - 1, Math.max(0, Math.round(q.y - y * 1.8 - r * 2.5)));
            const c = X.mixPk(X.shade(bg[sy * n + sx], 1.3), bead, 0.3);
            d[yy * n + xx] = x + y > r * 0.5 && x * x + y * y > (r - 1) * (r - 1) ? X.shade(c, 0.5) : c;
          }
          X.put(g, Math.round(q.x - r * 0.35), Math.round(q.y - r * 0.4), X.mixPk(d[Math.min(n - 1, Math.max(0, Math.round(q.y - r * 0.4))) * n + Math.min(n - 1, Math.max(0, Math.round(q.x - r * 0.35)))], WHITE, 0.75));
        }
        if (frame !== 'Pane') {   // the window's wooden bars in silhouette, a sliver of light along their edges
          const bar = X.rgb(12, 11, 14), edge = X.rgb(46, 40, 44), hy = Math.round(n * (frame === 'Sash' ? 0.52 : 0.46));
          X.rect(g, 0, hy - 2, n, 4, bar); X.rect(g, 0, hy - 2, n, 1, edge);
          if (frame === 'Mullions') { const vx = Math.round(n * 0.5); X.rect(g, vx - 2, 0, 4, n, bar); X.rect(g, vx - 2, 0, 1, n, edge); }
        }
      };
    },
  });

  // Thunderhead: the shape of the storm and its rain, shared by both paths. Bank is the original
  // full-width cloud; Tower a single anvil-topped cumulonimbus in a starry sky; Shelf a low, hard-edged
  // squall line. The opening variation is always a Bank with light rain.
  function stormForm(g, n) {
    const shape = g.trait('Cloud', vary(g, [['Bank', 3], ['Tower', 1.5], ['Shelf', 1.2]])), rain = g.trait('Rain', vary(g, [['Light', 3], ['Heavy', 1.5], ['None', 1]]));
    const cx = n * (0.32 + 0.36 * (shape === 'Tower' ? g.alt() : 0.5));
    const F = { shape, rain, boltY: shape === 'Shelf' ? n * 0.46 : shape === 'Tower' ? n * 0.44 : n * 0.32, boltX: x => shape === 'Tower' ? Math.round(cx + (x - n / 2) * 0.3) : x };
    F.cloud = shape === 'Bank' ? (x, y, v) => U.clamp((n * 0.42 - y) / (n * 0.3) + v * 0.6 - 0.3)
      : shape === 'Shelf' ? (x, y, v) => U.clamp((n * 0.56 - y) / (n * 0.13) + v * 0.6 - 0.3)
      : (x, y, v) => { const hw = y < n * 0.16 ? n * (0.2 + 0.26 * (1 - y / (n * 0.16))) : n * 0.17 + (y - n * 0.16) * 0.12, edge = 1 - Math.abs(x - cx) / hw; return U.clamp(Math.min((n * 0.5 - y) / (n * 0.2), edge * 3, (y + 2) / (n * 0.04)) + v * 0.6 - 0.3); };
    F.star = (x, y) => shape === 'Tower' && y < n * 0.7 && ((x * 73 + y * 151) % 97) === 0;
    F.wet = (x, y, t, veil) => rain !== 'None' && y > F.boltY + n * 0.04 && y <= n * 0.86 && veil > 0 && (rain === 'Heavy' ? x % 2 === 1 : x % 3 === 1) && (y + ((t * 36) | 0) + x * 11) % 9 < 2 && ((x * 13 + ((y + ((t * 36) | 0)) / 9 | 0) * 7) % 10) / 10 < veil * (rain === 'Heavy' ? 1.8 : 1) * (1.1 - (y - n * 0.36) / (n * 0.55));
    return F;
  }

  add({
    name: 'Thunderhead', seed: 2, sizes: [100], fps: 12,
    interactive: 'Click to call down a bolt where you point.',
    listens: 'A clap calls down a bolt; a loud room sets the cloud flickering.',
    recipe: 'A storm cloud slowly churning over dark fields, the sea or a city. Now and then a bolt branches down through it, lighting the underside of the cloud, and fades in its own time. Night blue, violet, a green supercell, a red dusk or plain grey; click to call down a bolt.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, tint = X.hsbPk(R.range(55, 80), 40, 90), bolt = [];
      let flash = 0, next = R.range(2, 5);
      const grow = (x, y, depth, w) => { while (y < n * 0.9 && bolt.length < 600) { const nx = x + R.int(-1, 1), ny = y + 1; bolt.push([nx, ny, w]); x = nx; y = ny; if (depth < 3 && R() < 0.04) grow(x, y, depth + 1, w * 0.6); if (depth > 0 && R() < 0.06) return; } };
      // the viewer's bolts grow from their own stream, so R is untouched
      const growAlt = (x, y, depth, w) => { const A = g.alt; while (y < n * 0.9 && bolt.length < 600) { const nx = x + Math.floor(A() * 3) - 1, ny = y + 1; bolt.push([nx, ny, w]); x = nx; y = ny; if (depth < 3 && A() < 0.04) growAlt(x, y, depth + 1, w * 0.6); if (depth > 0 && A() < 0.06) return; } };
      const veil = new Float32Array(n), F = stormForm(g, n);
      g.trait('Storm', 'Night blue'); g.trait('Ground', 'Fields'); g.trait('Bolt', 'White');
      let cool = 0;
      return (t, dt) => {
        next -= dt; cool -= dt;
        const taps = g.input.taps();
        if (taps.length) { bolt.length = 0; growAlt(Math.round(taps[0].x * n), F.boltY, 0, 1); flash = 1; }
        if (g.input.listening) {   // a clap calls a bolt; a loud room flickers inside the cloud
          if (g.input.beats() && cool <= 0) { bolt.length = 0; growAlt(F.boltX(Math.round(n * (0.15 + 0.7 * g.alt()))), F.boltY, 0, 1); flash = 1; cool = 0.4; }
          if (g.input.level > 0.45 && g.alt() < g.input.level * 0.5) flash = Math.max(flash, (g.input.level - 0.3) * 0.5);
        }
        if (next < 0) { bolt.length = 0; grow(F.boltX(R.int(n * 0.2, n * 0.8)), F.boltY, 0, 1); flash = 1; next = R.range(3, 7); }
        flash *= 0.9;
        for (let x = 0; x < n; x++) veil[x] = U.clamp(nz(x * 0.035 + t * 0.04, 7.7) * 1.6 + 0.1);   // where rain hangs below the cloud
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, v = nz(x * 0.05 + t * 0.03, y * 0.08 - t * 0.02) * 0.5 + 0.5, cloud = F.cloud(x, y, v);
          const lit = cloud * (0.25 + 0.5 * v) + flash * 0.6 * cloud * (1 - y / n);
          const q = Math.floor(lit * 6 + X.dith4(x, y)) / 6;
          let c = y > n * 0.86 ? X.shade(X.rgb(20, 30, 20), 1 + flash * 1.5 + (X.dith4(x, y) < 0.2 ? 0.4 : 0)) : X.mixPk(X.rgb(10, 12, 22), tint, U.clamp(q));
          if (!cloud && F.star(x, y)) c = X.mixPk(c, WHITE, 0.45);
          // faint shafts of rain slanting down from the cloud base
          if (F.wet(x, y, t, veil[x])) c = X.mixPk(c, tint, 0.22 + flash * 0.3);
          d[i] = c;
        }
        if (flash > 0.08) {
          for (const [x, y, w] of bolt) for (let k = -1; k <= 1; k += 2) { const j = y * n + x + k; if (x + k >= 0 && x + k < n && y >= 0 && y < n) d[j] = X.mixPk(d[j], tint, Math.min(0.7, flash * 0.6 * w)); }   // a glow either side
          for (const [x, y, w] of bolt) X.put(g, x, y, X.mixPk(X.shade(tint, 0.6), WHITE, Math.min(1, flash * 1.6 * w)));
        }
      };
    }, function alt(R, U, g) {
      const STORMS = [[[10, 12, 22], [62, 40, 90]], [[16, 8, 28], [80, 40, 90]], [[8, 18, 14], [36, 30, 70]], [[24, 8, 10], [5, 50, 95]], [[14, 14, 16], [0, 0, 75]], [[6, 10, 30], [58, 30, 100]]];
      const [bgA, tt] = R.pick(STORMS), dark = X.rgb(bgA[0], bgA[1], bgA[2]), land = R.pick(['fields', 'sea', 'city']), boltC = R.pick([WHITE, X.rgb(220, 200, 255), X.rgb(255, 250, 200)]);
      const { n, d } = g, nz = U.noise(R).n2, tint = X.hsbPk(tt[0] + R.range(-5, 5), tt[1], tt[2]), bolt = [];
      let flash = 0, next = R.range(2, 5), cool = 0;
      const grow = (x, y, depth, w) => { while (y < n * 0.9 && bolt.length < 600) { const nx = x + R.int(-1, 1), ny = y + 1; bolt.push([nx, ny, w]); x = nx; y = ny; if (depth < 3 && R() < 0.04) grow(x, y, depth + 1, w * 0.6); if (depth > 0 && R() < 0.06) return; } };
      const veil = new Float32Array(n), F = stormForm(g, n);
      g.trait('Storm', ['Night blue', 'Violet', 'Supercell green', 'Red dusk', 'Grey', 'Midnight'][STORMS.findIndex(st => st[0] === bgA)]); g.trait('Ground', { fields: 'Fields', sea: 'Sea', city: 'City' }[land]); g.trait('Bolt', boltC === WHITE ? 'White' : X.lum(boltC) > 0.85 && (boltC & 255) > 250 ? 'Gold' : 'Lilac');
      return (t, dt) => {
        next -= dt; cool -= dt;
        const taps = g.input.taps();
        if (taps.length) next = -1;
        if (g.input.listening) {
          if (g.input.beats() && cool <= 0) { next = -1; cool = 0.4; }
          if (g.input.level > 0.45 && g.alt() < g.input.level * 0.5) flash = Math.max(flash, (g.input.level - 0.3) * 0.5);
        }
        if (next < 0) { bolt.length = 0; grow(taps.length ? Math.round(taps[0].x * n) : F.boltX(R.int(n * 0.2, n * 0.8)), F.boltY, 0, 1); flash = 1; next = R.range(3, 7); }
        flash *= 0.9;
        for (let x = 0; x < n; x++) veil[x] = U.clamp(nz(x * 0.035 + t * 0.04, 7.7) * 1.6 + 0.1);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, v = nz(x * 0.05 + t * 0.03, y * 0.08 - t * 0.02) * 0.5 + 0.5, cloud = F.cloud(x, y, v);
          const lit = cloud * (0.25 + 0.5 * v) + flash * 0.6 * cloud * (1 - y / n);
          const q = Math.floor(lit * 6 + X.dith4(x, y)) / 6;
          let c = X.mixPk(dark, tint, U.clamp(q));
          if (!cloud && F.star(x, y)) c = X.mixPk(c, WHITE, 0.45);
          if (F.wet(x, y, t, veil[x])) c = X.mixPk(c, tint, 0.22 + flash * 0.3);
          if (y > n * 0.86) {
            if (land === 'sea') c = (x * 5 + y * 3 + ((t * 4) | 0)) % 9 === 0 ? X.mixPk(dark, tint, 0.3 + flash * 0.6) : X.shade(dark, 0.8 + flash);
            else if (land === 'city') { c = x % 3 === 1 && y % 3 === 1 && (x * 7 + y * 13) % 5 < 2 ? X.rgb(255, 210, 120) : X.shade(dark, 0.6 + flash); }
            else c = X.shade(X.rgb(20, 30, 20), 1 + flash * 1.5 + (X.dith4(x, y) < 0.2 ? 0.4 : 0));
          }
          d[i] = c;
        }
        if (land === 'city') for (let x = 0; x < n; x++) { const h = Math.round(n * 0.86 - (((x / 4 | 0) * 37) % 9)); for (let y = h; y < n * 0.86; y++) d[y * n + x] = x % 3 === 1 && y % 3 === 1 && (x * 7 + y * 13) % 5 < 2 ? X.rgb(255, 210, 120) : X.shade(dark, 0.5); }
        if (flash > 0.08) {
          for (const [x, y, w] of bolt) for (let k = -1; k <= 1; k += 2) { const j = y * n + x + k; if (x + k >= 0 && x + k < n && y >= 0 && y < n) d[j] = X.mixPk(d[j], tint, Math.min(0.7, flash * 0.6 * w)); }
          for (const [x, y, w] of bolt) X.put(g, x, y, X.mixPk(X.shade(tint, 0.6), boltC, Math.min(1, flash * 1.6 * w)));
        }
      };
    }),
  });

  add({
    name: 'Fog Bank', seed: 3, sizes: [100, 200], fps: 10,
    recipe: 'Ridges of hills one behind another, with bands of fog drifting through the valleys between them, dithered so each band is a few flat tones.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, base = X.inks(R, 2, 0.5);
      // light: day (the original) or a moonlit night, where the sky is darkest and the ranges glow faintly toward the back
      const lightK = g.trait('Light', vary(g, [['Day', 3], ['Night', 1.2]])), view = g.trait('Viewpoint', vary(g, [['Level', 3], ['From above', 1.3], ['From below', 1.3]]));
      let far = X.mixPk(base[0], WHITE, 0.7), near = X.shade(base[1], 0.25), sky = X.mixPk(far, WHITE, 0.4);
      if (lightK === 'Night') { sky = X.mixPk(X.rgb(8, 10, 26), base[0], 0.1); far = X.mixPk(X.rgb(96, 108, 150), base[0], 0.2); near = X.mixPk(X.rgb(12, 12, 24), base[1], 0.12); }
      const y0 = view === 'From above' ? 0.5 : view === 'From below' ? 0.14 : 0.3, y1 = view === 'From above' ? 0.92 : view === 'From below' ? 0.66 : 0.8;
      // traits: how many ranges, the shape of the land, what hangs in the sky, trees on the near ridges, how thick the fog
      const L = g.trait('Ranges', vary(g, [[6, 3], [4, 1.5], [9, 1.5]])), land = g.trait('Terrain', vary(g, [['Rolling', 3], ['Peaks', 1.5], ['Mesas', 1.2]]));
      const light = g.trait('Sky', vary(g, [['Clear', 3], ['Sun', 1.3], ['Moon', 1.3]])), trees = g.trait('Trees', vary(g, [['None', 3], ['Pines', 1.5]])), fogK = g.trait('Fog', vary(g, [['Valley', 3], ['Thick', 1.3], ['Thin', 1]]));
      g.trait('Palette', inkName(base));
      const shapeOf = v => land === 'Peaks' ? (0.35 - Math.abs(v)) * 1.6 : land === 'Mesas' ? Math.max(-0.3, Math.min(0.3, v * 2.6)) * 1.2 : v;
      const ridge = Array.from({ length: L }, (_, k) => Float32Array.from({ length: n }, (_, x) => n * (L === 6 && view === 'Level' ? 0.3 + 0.1 * k : y0 + (y1 - y0) * k / (L - 1)) + shapeOf(nz(x * 0.012 * (1 + k * 0.3), k * 7)) * n * 0.08));
      const fogH = fogK === 'Thick' ? 0.12 : fogK === 'Thin' ? 0.045 : 0.07, fogA = fogK === 'Thick' ? 1 : fogK === 'Thin' ? 0.7 : 0.9;
      // pines along the two nearest ridges, as part of their ridge
      const tree = new Int8Array(n * n);
      if (trees === 'Pines') for (const k of [L - 2, L - 1]) for (let x = 1; x < n - 1; x += 2 + Math.floor(g.alt() * 3)) {
        const h = Math.round((3 + g.alt() * 4) * n / 100 * (k === L - 1 ? 1.3 : 1)), top = Math.round(ridge[k][x]) - h;
        for (let dy = 0; dy <= h + 1; dy++) { const hw = Math.floor(dy / 2.4); for (let dx = -hw; dx <= hw; dx++) { const xx = x + dx, yy = top + dy; if (xx >= 0 && yy >= 0 && xx < n && yy < n) tree[yy * n + xx] = k + 1; } }
      }
      const sun = light !== 'Clear' ? [n * (0.2 + 0.6 * g.alt()), n * (0.12 + 0.08 * g.alt()), n * (light === 'Sun' ? 0.075 : 0.05)] : null;
      const disc = light === 'Sun' && lightK === 'Day' ? X.mixPk(sky, X.rgb(255, 246, 220), 0.75) : X.mixPk(sky, WHITE, 0.85);
      if (lightK === 'Night' && sun) sun[1] = Math.min(sun[1], n * y0 * 0.6);
      const fogTo = lightK === 'Night' ? X.rgb(104, 114, 146) : sky;
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = sky, kc = -1;
          for (let k = L - 1; k >= 0; k--) if (y >= ridge[k][x]) { c = X.mixPk(far, near, k / (L - 1)); kc = k; break; }
          const tk = tree[y * n + x] - 1;
          if (tk > kc) c = X.mixPk(far, near, tk / (L - 1));
          else if (kc < 0 && sun) { const dx = x + 0.5 - sun[0], dy = y + 0.5 - sun[1], r2 = dx * dx + dy * dy; if (r2 < sun[2] * sun[2] && !(light === 'Moon' && (dx + sun[2] * 0.45) ** 2 + (dy + sun[2] * 0.2) ** 2 < sun[2] * sun[2] * 0.8)) c = disc; }
          let k = 0; while (k < L && y >= ridge[k][x]) k++;
          const fog = U.clamp(1 - Math.abs(y - (ridge[Math.min(L - 1, k)][x] - 2)) / (n * fogH)) * (0.6 + 0.4 * nz(x * 0.03 - t * 0.08 * (1 + k * 0.2), y * 0.05 + k));
          d[y * n + x] = X.dith8(x, y) < fog * fogA ? X.mixPk(c, fogTo, 0.75) : c;
        }
      };
    },
  });

  // curated pond palettes: deep water, near water, ring, sky top, sky at the horizon, rain
  const PONDS = [
    [[8, 14, 34], [20, 36, 72], [130, 225, 255], [8, 10, 26], [44, 46, 100], [160, 200, 255]],
    [[30, 12, 44], [62, 26, 82], [255, 160, 210], [60, 20, 70], [255, 120, 96], [255, 205, 225]],
    [[4, 28, 26], [10, 58, 50], [150, 255, 190], [8, 34, 28], [70, 120, 86], [200, 255, 220]],
    [[22, 26, 32], [46, 54, 66], [236, 240, 248], [34, 38, 46], [100, 108, 122], [214, 222, 232]],
    [[0, 52, 84], [0, 98, 128], [255, 236, 160], [250, 120, 50], [255, 214, 120], [255, 255, 255]],
    [[12, 12, 12], [34, 34, 34], [255, 60, 60], [10, 10, 10], [60, 20, 24], [255, 120, 120]],
  ];
  const POND_NAMES = ['Midnight', 'Rose dusk', 'Jade', 'Overcast', 'Sunset', 'Noir'];
  // Monsoon's lily pads (a trait): flat pads in perspective with a notch, a lighter rim toward the sky
  function lilyPads(g, n, hz) {
    const on = g.trait('Lilies', vary(g, [['None', 3], ['Pads', 1.3], ['Pads in flower', 0.8]]));
    if (on === 'None') return null;
    const pads = Array.from({ length: 5 + Math.floor(g.alt() * 6) }, () => { const y = hz + 4 + g.alt() * (n - hz - 6), p = (y - hz) / (n - hz); return { x: g.alt() * n, y, w: 2 + p * 5 + g.alt() * 2, h: 0.6 + p * 1.6, a: g.alt() * 6 }; });
    const leaf = X.rgb(40, 96, 56), rim = X.rgb(92, 150, 80), bloom = X.rgb(250, 190, 220);
    return () => {
      for (const q of pads) for (let y = Math.floor(q.y - q.h); y <= q.y + q.h; y++) for (let x = Math.floor(q.x - q.w); x <= q.x + q.w; x++) {
        const u = (x + 0.5 - q.x) / q.w, v = (y + 0.5 - q.y) / q.h; if (u * u + v * v > 1 || x < 0 || y <= hz || x >= n || y >= n) continue;
        if (Math.abs(Math.atan2(v, u) - (q.a % 6 - 3)) < 0.35) continue;   // the notch
        g.d[y * n + x] = v < -0.4 ? rim : leaf;
      }
      if (on === 'Pads in flower') for (const q of pads) if (q.w > 4) { X.put(g, q.x, q.y - q.h - 1, bloom); X.put(g, q.x - 1, q.y - q.h, bloom); X.put(g, q.x + 1, q.y - q.h, bloom); X.put(g, q.x, q.y - q.h, WHITE); }
    };
  }
  add({
    name: 'Monsoon', seed: 4, sizes: [100], fps: 12,
    interactive: 'Click the water to drop a stone.',
    listens: 'The rain comes down harder as the room gets louder; a clap drops a stone.',
    recipe: 'Heavy slanting rain over a dark pond. Every drop that lands opens a pixel ring that spreads and fades, big ones in doubles, and rings cross without disturbing each other. Palette, far shore, slant and how hard it rains change with every variation; click to drop a stone.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, hz = Math.round(n * R.range(0.25, 0.35)), col = X.inks(R, 3, 0.5), pal = PONDS[Math.floor(g.alt() * PONDS.length)].map(c => X.rgb(c[0], c[1], c[2])), water = pal[0], ring = pal[2], sky = X.mixPk(pal[3], pal[4], 0.45), rainC = pal[5], slant = R.range(0.2, 0.6) * R.sign();
      const rings = [], streaks = Array.from({ length: 60 }, () => ({ x: R() * n, y: R() * n, v: R.range(4, 7) }));
      // extra rain for a loud room, from g.alt so R is untouched; only drawn while listening
      const more = Array.from({ length: 90 }, () => ({ x: g.alt() * n, y: g.alt() * n, v: 4 + g.alt() * 3 }));
      const PI = PONDS.findIndex(p => X.rgb(...p[0]) === water); g.trait('Pond', POND_NAMES[PI]); g.trait('Shore', 'Open'); g.trait('Rain', 'Steady');
      const lilies = lilyPads(g, n, hz); g.trait('Slant', slant < 0 ? 'From the right' : 'From the left');
      return (t) => {
        for (const tp of g.input.taps()) if (tp.y * n > hz && rings.length < 400) rings.push({ x: tp.x * n, y: tp.y * n, r: 0 });
        const inp = g.input, loud = inp.listening ? inp.level : 0;
        if (inp.listening) {
          for (let k = Math.floor(loud * 6 + g.alt()); k > 0; k--) rings.push({ x: g.alt() * n, y: hz + 2 + g.alt() * (n - hz), r: 0 });
          if (inp.beats()) { const x = n * (0.2 + 0.6 * g.alt()), y = hz + (n - hz) * (0.3 + 0.6 * g.alt()); rings.push({ x, y, r: 0 }, { x, y, r: -1.5 }); }
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y < hz ? (X.dith4(x, y) < y / hz ? X.shade(sky, 0.6) : sky) : X.shade(water, 1 + 0.3 * ((x + (y >> 1)) % 7 === 0));
        for (let k = 0; k < 3; k++) rings.push({ x: R() * n, y: hz + 2 + R() * (n - hz), r: 0 });
        for (let i = rings.length - 1; i >= 0; i--) {
          const q = rings[i]; q.r += 0.35;
          const a = 1 - q.r / 9, sq = 0.3 + 0.7 * (q.y - hz) / (n - hz);
          if (a <= 0) { rings.splice(i, 1); continue; }
          if (q.r <= 0) continue;
          // an unbroken ellipse at every size (enough steps for its girth), so rings never break into dots
          const steps = Math.max(16, Math.round(q.r * 12)), rc = X.mixPk(water, ring, a);
          for (let s = 0; s < steps; s++) { const th = s / steps * U.TAU, x = q.x + Math.cos(th) * q.r * 2, y = q.y + Math.sin(th) * q.r * sq; if (y > hz) X.put(g, x, y, rc); }
        }
        if (lilies) lilies();
        for (const s of streaks) { s.y += s.v; s.x += s.v * slant; if (s.y > n) { s.y = -6; s.x = R() * n; } X.line(g, s.x, s.y, s.x - slant * 4, s.y - 4, X.mixPk(sky, rainC, 0.7)); }
        if (loud > 0) for (let k = 0, m = Math.round(loud * more.length); k < m; k++) { const s = more[k]; s.y += s.v; s.x += s.v * slant; if (s.y > n) { s.y = -6; s.x = g.alt() * n; } X.line(g, s.x, s.y, s.x - slant * 4, s.y - 4, X.mixPk(sky, rainC, 0.7)); }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, hz = Math.round(n * R.range(0.22, 0.36)), pal = R.pick(PONDS).map(c => X.rgb(c[0], c[1], c[2])), [deep, near, ringC, skyT, skyH, rainC] = pal;
      const slant = R.range(0.1, 0.6) * R.sign(), heavy = R.range(0.4, 1), shore = R.pick(['trees', 'reeds', 'city', 'none', 'hills']), nz = U.noise(R);
      const back = new Uint32Array(n * n), ramp = Array.from({ length: 8 }, (_, k) => X.mixPk(near, ringC, 1 - k / 8));
      // the still picture: banded sky, the far shore, water lightening toward the horizon with a dithered sky reflection
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c;
        if (y < hz) { const u = y / hz; c = X.mixPk(skyT, skyH, Math.floor(u * 5 + X.dith4(x, y) * 0.99) / 5); }
        else { const u = (y - hz) / (n - hz); c = X.mixPk(near, deep, Math.min(1, Math.floor(u * 6 + X.dith4(x, y)) / 6)); if (u < 0.12 && X.dith4(x, y) > u * 8) c = X.mixPk(c, skyH, 0.35); if ((x * 3 + y * 7) % 23 === 0) c = X.mixPk(c, skyH, 0.2); }
        back[y * n + x] = c;
      }
      const sil = X.shade(skyT, 0.45);
      for (let x = 0; x < n; x++) {
        let h = 0;
        if (shore === 'trees') h = 3 + Math.round(Math.abs(nz.n2(x * 0.25, 1)) * 6 + (x % 5 === 2 ? 2 : 0));
        else if (shore === 'hills') h = Math.round(4 + (nz.fbm(x * 0.03, 3, 0, 3) + 0.5) * hz * 0.5);
        else if (shore === 'reeds') h = x % 3 === 0 ? 2 + Math.round(Math.abs(nz.n2(x * 0.7, 5)) * 6) : 1;
        else if (shore === 'city') h = 2 + (Math.floor(x / 4) * 37 % 11);
        for (let y = hz - h; y < hz; y++) if (y >= 0) back[y * n + x] = sil;
        if (shore === 'city') for (let y = hz - h + 1; y < hz - 1; y += 2) if ((x * 7 + y * 3) % 5 === 0) back[y * n + x] = X.rgb(255, 214, 120);
        if (h && hz + 1 < n) back[(hz + 1) * n + x] = X.mixPk(back[(hz + 1) * n + x], sil, 0.6);
      }
      const rings = [], streaks = Array.from({ length: Math.round(30 + heavy * 70) }, () => ({ x: R() * n, y: R() * n, v: R.range(4, 7), l: R.int(3, 6) }));
      const ring = (q, r, c) => {
        const sq = 0.25 + 0.6 * (q.y - hz) / (n - hz), steps = Math.max(12, Math.round(r * 10));
        for (let s = 0; s < steps; s++) { const th = s / steps * U.TAU, x = Math.round(q.x + Math.cos(th) * r * 2), y = Math.round(q.y + Math.sin(th) * r * 2 * sq); if (y > hz && y < n && x >= 0 && x < n) d[y * n + x] = c; }
      };
      let acc = 0;
      const more = Array.from({ length: 90 }, () => ({ x: g.alt() * n, y: g.alt() * n, v: 4 + g.alt() * 3, l: 3 + Math.floor(g.alt() * 4) }));
      g.trait('Pond', POND_NAMES[PONDS.findIndex(p => X.rgb(...p[0]) === deep)]); g.trait('Shore', { trees: 'Trees', reeds: 'Reeds', city: 'City', none: 'Open', hills: 'Hills' }[shore]); g.trait('Rain', heavy > 0.75 ? 'Downpour' : heavy > 0.55 ? 'Steady' : 'Light');
      const lilies = lilyPads(g, n, hz); g.trait('Slant', slant < 0 ? 'From the right' : 'From the left');
      return (t, dt) => {
        for (const tp of g.input.taps()) if (tp.y * n > hz && rings.length < 400) rings.push({ x: tp.x * n, y: tp.y * n, r: 0, big: 2.2 });
        const inp = g.input, loud = inp.listening ? inp.level : 0;
        if (inp.listening && inp.beats()) rings.push({ x: n * (0.2 + 0.6 * g.alt()), y: hz + (n - hz) * (0.3 + 0.6 * g.alt()), r: 0, big: 2.2 });
        d.set(back);
        acc += heavy * 3 + loud * 6;
        for (; acc >= 1; acc--) rings.push({ x: R() * n, y: hz + 2 + R() ** 0.7 * (n - hz), r: 0, big: R.bool(0.15) ? 1.6 : 1 });
        for (let i = rings.length - 1; i >= 0; i--) {
          const q = rings[i], depth = 0.4 + 0.6 * (q.y - hz) / (n - hz); q.r += 0.3 * depth;
          const life = q.r / (7 * q.big * depth);
          if (life >= 1) { rings.splice(i, 1); continue; }
          ring(q, q.r, ramp[Math.min(7, Math.floor(life * 8))]);
          if (q.big > 1 && q.r > 1.2) ring(q, q.r * 0.55, ramp[Math.min(7, Math.floor(life * 8) + 2)]);
          if (q.r < 0.6) X.put(g, q.x, q.y - 1, rainC);
        }
        if (lilies) lilies();
        for (const s of streaks) { s.y += s.v; s.x += s.v * slant; if (s.y > n) { s.y = -6; s.x = R() * n * 1.2 - n * 0.1; } X.line(g, s.x, s.y, s.x - slant * s.l, s.y - s.l, X.mixPk(skyH, rainC, 0.6)); X.put(g, s.x, s.y, rainC); }
        if (loud > 0) for (let k = 0, m = Math.round(loud * more.length); k < m; k++) { const s = more[k]; s.y += s.v; s.x += s.v * slant; if (s.y > n) { s.y = -6; s.x = g.alt() * n * 1.2 - n * 0.1; } X.line(g, s.x, s.y, s.x - slant * s.l, s.y - s.l, X.mixPk(skyH, rainC, 0.6)); X.put(g, s.x, s.y, rainC); }
      };
    }),
  });

  add({
    name: 'Mirage', seed: 5, sizes: [100, 200], fps: 12,
    recipe: 'A desert road running to the horizon. Heat shimmer shifts each row of the far distance sideways, and the sky pools on the asphalt as a false lake.',
    make(R, U, g) {
      const { n, d } = g, hz = Math.round(n * 0.45), sky = X.inks(R, 2, 0.6), sand = X.rgb(214, 170, 110), road = X.rgb(60, 58, 64), nz = U.noise(R).n2;
      // desert skies, top to horizon: noon blue, haze, dusk, dawn, white heat, dust (sky above stays drawn from R for the sequence)
      const SKIES = [[[46, 92, 170], [120, 170, 220], [236, 226, 206]], [[120, 150, 190], [190, 200, 210], [250, 238, 214]], [[44, 30, 90], [200, 90, 110], [255, 190, 120]],
        [[70, 90, 150], [230, 160, 160], [255, 226, 190]], [[90, 140, 200], [200, 215, 225], [255, 250, 235]], [[120, 90, 80], [220, 150, 90], [250, 214, 150]]];
      const si = Math.floor(g.alt() * SKIES.length), ramp = SKIES[si].map(c => X.rgb(c[0], c[1], c[2]));
      // traits: the road's line, what stands on the horizon, what lines the road, the sun, the sand
      g.trait('Sky', ['Noon', 'Haze', 'Dusk', 'Dawn', 'White heat', 'Dust'][si]);
      const roadK = g.trait('Road', vary(g, [['Straight', 3], ['Bends left', 1], ['Bends right', 1], ['Dirt track', 1]])), bend = roadK === 'Bends left' ? -1 : roadK === 'Bends right' ? 1 : 0, dirt = roadK === 'Dirt track';
      const hor = g.trait('Horizon', vary(g, [['Dunes', 3], ['Mesas', 1.4], ['Mountains', 1.2], ['Flat', 1]])), side = g.trait('Roadside', vary(g, [['Poles', 3], ['Cacti', 1.4], ['Bare', 1]]));
      const sunK = g.trait('Sun', vary(g, [['Hidden', 3], ['High', 1.2], ['Low', 1.2]])), sandK = g.trait('Sand', vary(g, [['Gold', 3], ['Pale', 1], ['Red', 1]]));
      const sandC = sandK === 'Pale' ? X.rgb(226, 206, 170) : sandK === 'Red' ? X.rgb(200, 120, 80) : sand;
      const roadAt = p => n / 2 + bend * (1 - p) * (1 - p) * n * 0.32, roadW = p => 2 + p * n * 0.45;
      const scene = new Uint32Array(n * n), dunes = Float32Array.from({ length: n }, (_, x) => hz - 4 - Math.abs(nz(x * 0.03, 1)) * n * 0.08);
      let farC = X.shade(sandC, 0.75);
      if (hor === 'Flat') for (let x = 0; x < n; x++) dunes[x] = hz - 1 - Math.abs(nz(x * 0.05, 4)) * 2;
      else if (hor === 'Mountains') { farC = X.mixPk(ramp[2], X.rgb(110, 104, 140), 0.55); for (let x = 0; x < n; x++) dunes[x] = hz - 3 - (0.45 - Math.abs(nz(x * 0.025, 6))) * n * 0.22 - Math.abs(nz(x * 0.09, 8)) * n * 0.03; }
      else if (hor === 'Mesas') {
        farC = X.mixPk(X.shade(sandC, 0.7), X.rgb(150, 70, 50), 0.45);
        for (let x = 0; x < n; x++) dunes[x] = hz - 2 - Math.abs(nz(x * 0.05, 4)) * 2;
        for (let m = 0, M = 2 + Math.floor(g.alt() * 2); m < M; m++) { const mx = n * (0.1 + 0.8 * g.alt()), mw = n * (0.05 + 0.1 * g.alt()), mh = n * (0.07 + 0.08 * g.alt()); for (let x = 0; x < n; x++) { const e = Math.abs(x - mx) - mw, top = e < 0 ? hz - mh : hz - mh + e * 1.8; dunes[x] = Math.min(dunes[x], top); } }
      }
      const sunP = sunK === 'High' ? [n * (0.6 + 0.25 * g.alt()), n * 0.12, n * 0.045] : sunK === 'Low' ? [n * (0.2 + 0.6 * g.alt()), hz - n * 0.05, n * 0.09] : null;
      const sunC = sunK === 'High' ? X.mixPk(ramp[0], WHITE, 0.9) : X.mixPk(ramp[2], X.rgb(255, 200, 110), 0.65);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x;
        if (y < dunes[x]) { const u = Math.min(1.999, y / hz * 2.1), k = Math.floor(u); scene[i] = X.dith8(x, y) < u - k ? ramp[k + 1] : ramp[k]; if (sunP && (x + 0.5 - sunP[0]) ** 2 + (y + 0.5 - sunP[1]) ** 2 < sunP[2] * sunP[2]) scene[i] = sunC; }
        else if (y < hz) scene[i] = farC;
        else {
          const p = (y - hz) / (n - hz), w = roadW(p), c = roadAt(p), off = Math.abs(x - c);
          if (dirt) scene[i] = off < w * 0.85 ? (Math.abs(off - w * 0.42) < 0.5 + p * 1.2 ? X.shade(sandC, 0.6) : X.shade(sandC, 0.7 + 0.08 * (X.dith4(x, y) < 0.4))) : X.shade(sandC, 0.8 + 0.25 * p + 0.1 * (X.dith4(x, y) < 0.3));
          else scene[i] = off < w ? (off < 0.5 + p * 1.5 && ((y * y / n) | 0) % 4 < 2 ? X.rgb(240, 220, 120) : road) : X.shade(sandC, 0.8 + 0.25 * p + 0.1 * (X.dith4(x, y) < 0.3));
        }
      }
      // telegraph poles marching away beside the road, wired together, shrinking into the shimmer (or saguaros on both sides)
      const S = { n, d: scene }, pole = X.rgb(70, 54, 44), wire = X.rgb(96, 80, 70), cactus = X.rgb(60, 104, 60), cactusD = X.rgb(40, 76, 44);
      let last = null;
      if (side !== 'Bare') for (let k = 0; k < 9; k++) {
        const p = 0.95 * Math.pow(0.64, k), y = Math.round(hz + (n - hz) * p), h = Math.max(2, Math.round(1 + p * n * 0.55));
        if (y - hz < 1) break;
        if (side === 'Poles') {
          const x = Math.round(roadAt(p) + roadW(p) * 1.4);
          X.line(S, x, y, x, y - h, pole); if (p > 0.2) X.line(S, x - Math.round(p * 4), y - h + 1, x + Math.round(p * 4), y - h + 1, pole);
          if (last) X.line(S, last[0], last[1], x, y - h + 1, wire);
          last = [x, y - h + 1];
        } else {
          const x = Math.round(roadAt(p) + roadW(p) * (k % 2 ? -1.6 : 1.6)), hh = Math.round(h * 0.8), wd = Math.max(1, Math.round(p * 3));
          X.rect(S, x - (wd >> 1), y - hh, wd, hh, cactus); X.rect(S, x - (wd >> 1), y - hh, 1, hh, X.mixPk(cactus, WHITE, 0.2));
          if (p > 0.25) { const ay = y - Math.round(hh * 0.6), ah = Math.round(hh * 0.35), ax = Math.max(2, Math.round(p * 5)); X.rect(S, x - ax, ay, ax, wd, cactusD); X.rect(S, x - ax, ay - ah, wd, ah, cactus); X.rect(S, x + wd, ay + 2, ax - 1, wd, cactusD); X.rect(S, x + wd + ax - 2, ay + 2 - ah, wd, ah, cactus); }
        }
      }
      return (t) => {
        for (let y = 0; y < n; y++) {
          const near = Math.abs(y - hz), amp = near < n * 0.12 ? (1 - near / (n * 0.12)) * 3 : 0, sh = Math.round(amp * Math.sin(y * 0.9 + t * 3) + amp * 0.5 * Math.sin(y * 0.37 - t * 2));
          for (let x = 0; x < n; x++) {
            let src = scene[y * n + Math.min(n - 1, Math.max(0, x + sh))];
            if (y > hz && y < hz + n * 0.08) { const my = 2 * hz - y - 2; if (my > 0 && (nz(x * 0.08, y * 0.4 + t * 0.4) > -0.1)) src = X.mixPk(src, scene[my * n + Math.min(n - 1, Math.max(0, x + sh))], 0.7); }
            d[y * n + x] = src;
          }
        }
      };
    },
  });

  // Tide Table: a moon over every third day, drawn where that day falls on the chart (so each glides
  // smoothly left with the bars instead of blinking in and out), with a small tick under every day
  function tideMoons(g, bw) {
    const { n } = g, cy = Math.round(n * 0.12), r = n * 0.03 + 1;
    return (sh, base, foam) => {
      const D0 = Math.ceil((sh - 2 * r) / (bw * 2)), D1 = Math.floor((n + sh + 2 * r) / (bw * 2)), tick = X.shade(foam, 0.5);
      for (let D = Math.max(0, D0); D <= D1; D++) {
        const x = D * bw * 2 - sh;
        X.put(g, x, base + 2, tick); if (D % 3 === 0) X.put(g, x, base + 3, tick);
        if (D % 3) continue;
        const moon = (D / 29.5 % 1 + 1) % 1, cx = Math.round(x) + 1, lit = Math.cos(moon * U.TAU);
        for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) if (xx * xx + yy * yy <= r * r) { const k = xx / Math.sqrt(Math.max(0.01, r * r - yy * yy)); const on = moon < 0.5 ? k > lit : k < -lit; X.put(g, cx + xx, cy + yy, on ? X.rgb(240, 236, 210) : X.rgb(40, 40, 60)); }
      }
    };
  }

  add({
    name: 'Tide Table', seed: 6, sizes: [100, 200], fps: 12,
    recipe: 'A month of tides as a bar chart that scrolls past, each bar a pixel column of sea, with the moon\'s phase drawn above each day and the spring tides at full and new moon.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, col = X.inks(R, 3, 0.5), sea = col[0], foam = X.mixPk(col[1], WHITE, 0.5), bg = X.rgb(12, 14, 26), bw = n >= 200 ? 4 : 2, sp = R.range(3, 6);
      const moons = tideMoons(g, bw), guide = X.mixPk(bg, foam, 0.14);
      g.trait('Chart', 'Bars'); g.trait('Ground', 'Night'); g.trait('Bar width', 'Fine'); g.trait('Palette', inkName(col));
      return (t) => {
        d.fill(bg);
        for (const lv of [0.25, 0.5, 0.75]) { const y = Math.round(n * 0.82 - n * 0.52 * lv); for (let x = 1; x < n; x += 3) d[y * n + x] = guide; }   // faint level lines
        const base = n * 0.82, top = n * 0.3;
        for (let x = 0; x < n; x += bw) {
          const h = (x + t * sp * bw) / (bw * 2), moon = (h / 29.5 % 1 + 1) % 1, spring = 0.6 + 0.4 * Math.abs(Math.cos(moon * U.TAU)), lvl = 0.5 + 0.5 * Math.sin(h * 0.5 * U.TAU / 6.2) * spring;
          const y0 = base - (base - top) * lvl;
          X.rect(g, x, y0, bw - (bw > 2 ? 1 : 0), base - y0, sea); X.rect(g, x, y0, bw - (bw > 2 ? 1 : 0), 1, foam);
        }
        X.rect(g, 0, base, n, 1, X.shade(foam, 0.6));
        moons(t * sp * bw, base, foam);
      };
    }, function alt(R, U, g) {
      const style = R.pick(['bars', 'bars', 'line', 'dither']), paper = R.bool(0.3);
      const { n, d } = g, col = X.inks(R, 3, 0.5), sea = paper ? X.rgb(30, 80, 150) : col[0], foam = paper ? X.rgb(20, 40, 90) : X.mixPk(col[1], WHITE, 0.5), bg = paper ? X.rgb(238, 232, 214) : X.rgb(12, 14, 26), bw = (n >= 200 ? 4 : 2) * R.pick([1, 1, 2]), sp = R.range(3, 6);
      const moons = tideMoons(g, bw);
      g.trait('Chart', { bars: 'Bars', line: 'Line', dither: 'Dithered' }[style]); g.trait('Ground', paper ? 'Paper' : 'Night'); g.trait('Bar width', bw > (n >= 200 ? 4 : 2) ? 'Broad' : 'Fine'); g.trait('Palette', paper ? 'Ink blue' : inkName(col));
      return (t) => {
        d.fill(bg);
        if (paper) for (let y = 0; y < n; y += 6) X.rect(g, 0, y, n, 1, X.rgb(214, 206, 186));
        const base = n * 0.82, top = n * 0.3;
        let prevY = null;
        for (let x = 0; x < n; x += bw) {
          const h = (x + t * sp * bw) / (bw * 2), moon = (h / 29.5 % 1 + 1) % 1, spring = 0.6 + 0.4 * Math.abs(Math.cos(moon * U.TAU)), lvl = 0.5 + 0.5 * Math.sin(h * 0.5 * U.TAU / 6.2) * spring;
          const y0 = base - (base - top) * lvl;
          if (style === 'line') { if (prevY !== null) { X.line(g, x - bw, prevY, x, y0, sea); X.line(g, x - bw, prevY + 1, x, y0 + 1, sea); } X.rect(g, x, y0, 1, 2, foam); prevY = y0; }
          else if (style === 'dither') { for (let yy = Math.round(y0); yy < base; yy++) for (let xx = x; xx < x + bw; xx++) if (X.dith4(xx, yy) < 0.35 + 0.65 * (yy - y0) / (base - y0 + 1)) X.put(g, xx, yy, sea); X.rect(g, x, y0, bw, 1, foam); }
          else { X.rect(g, x, y0, bw - (bw > 2 ? 1 : 0), base - y0, sea); X.rect(g, x, y0, bw - (bw > 2 ? 1 : 0), 1, foam); }
        }
        X.rect(g, 0, base, n, 1, X.shade(foam, 0.6));
        moons(t * sp * bw, base, foam);
      };
    }),
  });

  add({
    name: 'Storm Radar', seed: 7, sizes: [100, 200], fps: 12,
    recipe: 'A weather radar screen: rain cells drift and grow across a coastline as the sweep turns, painting fresh returns in green, yellow and red that fade until it comes round again.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R).n2, mem = new Float32Array(n * n), c = n / 2, rmax = n * 0.48, sp = R.range(0.6, 1.1), wind = R.range(0, U.TAU);
      // traits: where the land lies, the colours of the returns, how many range rings, where the weather comes from
      const coastK = g.trait('Coast', vary(g, [['West', 3], ['East', 1.2], ['Island', 1.2], ['Open sea', 1]])), palK = g.trait('Returns', vary(g, [['Classic', 3], ['Phosphor', 1.2], ['Thermal', 1.2]]));
      const ringsN = g.trait('Rings', vary(g, [[3, 3], [4, 1], [2, 1]]));
      g.trait('Wind from', ['East', 'South-east', 'South', 'South-west', 'West', 'North-west', 'North', 'North-east'][Math.round(wind / (U.TAU / 8)) % 8]);
      const LEV = { Classic: [[0, 90, 20], [30, 200, 40], [240, 230, 40], [255, 120, 20], [230, 20, 30], [240, 60, 240]], Phosphor: [[10, 70, 30], [30, 140, 60], [60, 200, 90], [110, 240, 140], [170, 255, 190], [230, 255, 240]], Thermal: [[30, 30, 120], [40, 110, 200], [60, 200, 220], [240, 240, 120], [255, 160, 60], [255, 255, 255]] }[palK];
      const lev = LEV.map(c => X.rgb(c[0], c[1], c[2]));
      const coast = Float32Array.from({ length: n }, (_, y) => n * 0.35 + nz(y * 0.03, 9) * n * 0.12);
      const isLand = coastK === 'West' ? (x, y) => x < coast[y] : coastK === 'East' ? (x, y) => x > n - coast[y] : coastK === 'Island' ? (x, y) => Math.hypot(x - n * 0.55, (y - n * 0.45) * 1.3) < n * 0.17 + nz(x * 0.06, y * 0.06) * n * 0.07 : () => false;
      const landMask = new Uint8Array(n * n); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) landMask[y * n + x] = isLand(x, y) ? 1 : 0;
      return (t) => {
        const a = (t * sp) % U.TAU;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, dx = x - c, dy = y - c, r = Math.hypot(dx, dy);
          if (r > rmax) { d[i] = X.rgb(8, 10, 8); continue; }
          let da = a - Math.atan2(dy, dx); da = ((da % U.TAU) + U.TAU) % U.TAU;
          if (da < 0.12) { const v = nz(x * 0.04 - Math.cos(wind) * t * 0.12, y * 0.04 - Math.sin(wind) * t * 0.12) + 0.4 * nz(x * 0.1, y * 0.1 + t * 0.05) - 0.15; mem[i] = Math.max(0, v); }
          const land = landMask[i], rk = r / rmax * ringsN, ringl = ringsN === 3 ? Math.abs(r - rmax * 0.33) < 0.5 || Math.abs(r - rmax * 0.66) < 0.5 || Math.abs(r - rmax + 0.5) < 0.6 : Math.abs(rk - Math.round(rk)) * rmax / ringsN < 0.5 && rk > 0.5 || Math.abs(r - rmax + 0.5) < 0.6;
          const v = mem[i], fade = 1 - da / U.TAU * 0.7;
          let col = land ? X.rgb(26, 30, 22) : X.rgb(10, 16, 26);
          if (v > 0.02) col = X.shade(lev[Math.min(lev.length - 1, Math.floor(v * 7))], fade);
          if (ringl || (dx === 0 || dy === 0) && r < rmax) col = X.mixPk(col, X.rgb(60, 120, 80), 0.6);
          if (da < 0.05) col = X.mixPk(col, X.rgb(120, 255, 160), 0.5);
          d[i] = col;
        }
      };
    },
  });

  add({
    name: 'Weather Map', seed: 8, sizes: [100], fps: 10,
    interactive: 'Click to set a new low drifting in.',
    recipe: 'A pressure chart: highs and lows drift across a coast, isobars drawn as stepped pixel contours round them, cold fronts with blue teeth and warm fronts with red scallops trailing from each low, and H and L badges at their centres. It comes as a printed chart, a television map with rain bands, or a night screen; click to set a new low drifting in.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, sys = Array.from({ length: R.int(3, 5) }, () => ({ x: R() * n, y: R() * n, s: R.sign(), r: R.range(0.2, 0.4) * n, vx: R.range(1, 3), vy: R.range(-0.6, 0.6) }));
      const nz = U.noise(R).n2, ink = X.inks(R, 2, 0.5), paper = R.bool(0.5);
      // colours only: a printed chart, a television map or a night screen
      const STY = [
        { sea: [208, 228, 238], land: [236, 226, 196], coast: [150, 136, 110], hiIso: [110, 80, 70], loIso: [60, 80, 150], hi: [30, 60, 170], lo: [200, 30, 40] },
        { sea: [38, 92, 168], land: [88, 150, 76], coast: [220, 230, 210], hiIso: [255, 255, 255], loIso: [210, 232, 255], hi: [30, 80, 220], lo: [220, 40, 40] },
        { sea: [8, 14, 30], land: [22, 34, 32], coast: [60, 110, 100], hiIso: [255, 170, 80], loIso: [80, 200, 255], hi: [255, 170, 80], lo: [80, 200, 255] },
      ][Math.floor(g.alt() * 3)], K = k => X.rgb(STY[k][0], STY[k][1], STY[k][2]);
      g.trait('Chart', STY.sea[0] === 208 ? 'Printed' : STY.sea[0] === 38 ? 'Television' : 'Night screen'); g.trait('Systems', sys.length); g.trait('Fronts', 'None'); g.trait('Scale', 'Region');
      const land = new Uint8Array(n * n); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) land[y * n + x] = nz(x * 0.02, y * 0.02) > 0.15 ? 1 : 0;
      const p = new Float32Array(n * n);
      return (t, dt) => {
        for (const tp of g.input.taps()) {   // the viewer's lows drift off and are gone; at most six at once (a burst of replayed taps keeps the newest)
          sys.push({ x: tp.x * n, y: tp.y * n, s: -1, r: n * 0.3, vx: 2, vy: 0, u: 1 });
          if (sys.filter(s => s.u).length > 6) sys.splice(sys.findIndex(s => s.u), 1);
        }
        for (let k = sys.length - 1; k >= 0; k--) { const s = sys[k]; s.x += s.vx * dt; s.y += s.vy * dt; if (s.x > n * 1.3) { if (s.u) { sys.splice(k, 1); continue; } s.x = -n * 0.3; s.y = R() * n; s.s = R.sign(); } }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let v = 0; for (const s of sys) v += s.s * Math.exp(-((x - s.x) ** 2 + (y - s.y) ** 2) / (s.r * s.r)); p[y * n + x] = v; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, b = Math.floor(p[i] * 6), br = x < n - 1 ? Math.floor(p[i + 1] * 6) : b, bd = y < n - 1 ? Math.floor(p[i + n] * 6) : b;
          const L = land[i];
          let c = L ? K('land') : K('sea');
          if (L && x > 0 && !land[i - 1] || L && y > 0 && !land[i - n]) c = K('coast');
          if (b !== br || b !== bd) c = b >= 0 ? K('hiIso') : K('loIso');
          d[i] = c;
        }
        for (const s of sys) X.text(g, s.s > 0 ? 'H' : 'L', s.x - 2, s.y - 3, s.s > 0 ? K('hi') : K('lo'));
      };
    }, function alt(R, U, g) {
      const { n, d } = g, style = R.pick(['chart', 'tv', 'tv', 'night']), nz = U.noise(R).n2, zoom = R.range(0.015, 0.03), sea0 = R.range(0.0, 0.25);
      const sys = Array.from({ length: R.int(3, 5) }, (_, i) => ({ x: R() * n, y: R() * n, s: i === 0 ? -1 : R.sign(), r: R.range(0.2, 0.4) * n, vx: R.range(1, 3), vy: R.range(-0.6, 0.6), ang: R.range(0.3, 1.1) }));
      const S = {
        chart: { sea: [208, 228, 238], land: [236, 226, 196], coast: [150, 136, 110], iso: [70, 70, 84], iso2: [70, 70, 84], hi: [30, 60, 170], lo: [200, 30, 40], badge: [255, 255, 255], rain: null },
        tv: { sea: [38, 92, 168], land: [88, 150, 76], coast: [220, 230, 210], iso: [255, 255, 255], iso2: [220, 236, 255], hi: [30, 80, 220], lo: [220, 40, 40], badge: [255, 255, 255], rain: [[60, 200, 90], [240, 230, 60], [250, 140, 40]] },
        night: { sea: [8, 14, 30], land: [22, 34, 32], coast: [60, 110, 100], iso: [80, 200, 255], iso2: [255, 160, 80], hi: [255, 170, 80], lo: [80, 200, 255], badge: [20, 24, 36], rain: [[30, 80, 120], [60, 140, 200], [140, 220, 255]] },
      }[style];
      g.trait('Chart', { chart: 'Printed', tv: 'Television', night: 'Night screen' }[style]); g.trait('Systems', sys.length); g.trait('Fronts', 'Cold and warm'); g.trait('Scale', zoom < 0.02 ? 'Continent' : zoom < 0.025 ? 'Region' : 'Coast'); g.trait('Rain bands', S.rain ? 'Shown' : 'None');
      const C = k => X.rgb(S[k][0], S[k][1], S[k][2]), sea = C('sea'), landC = C('land'), coast = C('coast'), iso = C('iso'), iso2 = C('iso2'), hiC = C('hi'), loC = C('lo'), badge = C('badge');
      const rain = S.rain && S.rain.map(c => X.rgb(c[0], c[1], c[2])), cold = X.rgb(40, 90, 230), warm = X.rgb(220, 40, 40);
      const land = new Uint8Array(n * n); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) land[y * n + x] = nz(x * zoom, y * zoom) > sea0 ? 1 : 0;
      const base = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, L = land[i], edge = L && ((x > 0 && !land[i - 1]) || (y > 0 && !land[i - n]) || (x < n - 1 && !land[i + 1]) || (y < n - 1 && !land[i + n]));
        base[i] = edge ? coast : L ? (style === 'tv' && (x + y) % 9 === 0 ? X.shade(landC, 0.9) : landC) : sea;
      }
      const p = new Float32Array(n * n);
      // a front: a curve leaving a low, with teeth (cold) or scallops (warm) on its leading side
      const front = (s, dir, col, teeth) => {
        let x = s.x, y = s.y, a = s.ang * dir + (dir < 0 ? Math.PI * 0.55 : 0);
        for (let k = 0; k < 34; k++) {
          const nx = x + Math.cos(a) * 1.2, ny = y + Math.sin(a) * 1.2, px = -Math.sin(a) * dir, py = Math.cos(a) * dir;
          X.put(g, nx, ny, col); X.put(g, nx + 0.6, ny + 0.6, col);
          if (k % 6 === 3) {
            if (teeth) { X.put(g, nx + px, ny + py, col); X.put(g, nx + px * 2, ny + py * 2, col); X.put(g, nx + px - Math.cos(a), ny + py - Math.sin(a), col); }
            else { X.put(g, nx + px + Math.cos(a), ny + py + Math.sin(a), col); X.put(g, nx + px - Math.cos(a), ny + py - Math.sin(a), col); X.put(g, nx + px * 2, ny + py * 2, col); }
          }
          x = nx; y = ny; a += 0.035 * dir;
        }
      };
      return (t, dt) => {
        for (const tp of g.input.taps()) { sys.push({ x: tp.x * n, y: tp.y * n, s: -1, r: R.range(0.2, 0.35) * n, vx: R.range(1, 3), vy: R.range(-0.6, 0.6), ang: R.range(0.3, 1.1) }); if (sys.length > 7) sys.splice(1, 1); }
        for (const s of sys) { s.x += s.vx * dt; s.y += s.vy * dt; if (s.x > n * 1.3) { s.x = -n * 0.3; s.y = R() * n; s.s = R.sign(); } }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let v = 0; for (const s of sys) v += s.s * Math.exp(-((x - s.x) ** 2 + (y - s.y) ** 2) / (s.r * s.r)); p[y * n + x] = v; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, v = p[i], b = Math.floor(v * 6), br = x < n - 1 ? Math.floor(p[i + 1] * 6) : b, bd = y < n - 1 ? Math.floor(p[i + n] * 6) : b;
          let c = base[i];
          if (rain && v < -0.5) { const k = Math.min(2, Math.floor((-v - 0.5) * 4)); if (k > 0 || X.dith4(x, y) < 0.5) c = rain[k]; }
          if (b !== br || b !== bd) c = style === 'night' ? (b >= 0 ? iso2 : iso) : iso;
          d[i] = c;
        }
        for (const s of sys) if (s.s < 0) { front(s, 1, cold, true); front(s, -1, warm, false); }
        for (const s of sys) {
          const x = Math.round(s.x) - 3, y = Math.round(s.y) - 4, col = s.s > 0 ? hiC : loC;
          X.rect(g, x - 1, y - 1, 9, 11, style === 'night' ? col : X.shade(col, 0.7)); X.rect(g, x, y, 7, 9, badge);
          X.text(g, s.s > 0 ? 'H' : 'L', x + 1, y + 1, col);
        }
      };
    }),
  });

  add({
    name: 'Frost', seed: 9, sizes: [100, 200], fps: 12,
    recipe: 'Ice ferns creeping in from the edges of a cold window: needles grow at fixed angles, sprout side needles, and stop where they meet, over a dim winter blue.',
    make(R, U, g) {
      // ice keeps a breath of the rolled tint but stays ice: pale blue-white
      const { n, d } = g, occ = new Uint8Array(n * n), tips = [], ice = X.mixPk(X.mixPk(X.inks(R, 1, 0.3)[0], WHITE, 0.75), X.rgb(214, 236, 255), 0.55);
      // rime: the glass is frostier toward its edges, a dithered haze the ferns grow out of
      const rime = new Float32Array(n * n);
      let rimeC = X.rgb(64, 88, 122), glassHi = X.rgb(30, 50, 80), bg = X.rgb(10, 18, 34);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const e = Math.min(x, y, n - 1 - x, n - 1 - y) / (n * 0.18) + 0.25 * Math.sin(x * 0.31 + y * 0.07) * Math.sin(y * 0.27 - x * 0.05); rime[y * n + x] = U.clamp(1 - e) ** 1.5 * 0.8; }
      const angs = R.pick([[0, 60, 120, 180, 240, 300], [0, 45, 90, 135, 180, 225, 270, 315]]), ang = angs.map(a => a * Math.PI / 180);
      // traits: the crystal's symmetry, where the frost creeps in from, and the glass it grows on
      g.trait('Crystal', angs.length === 6 ? 'Hexagonal' : 'Octagonal');
      const from = g.trait('Creeps from', vary(g, [['Edges', 3], ['Corners', 1.3], ['Bottom', 1.2], ['Scattered', 1]])), glassK = g.trait('Glass', vary(g, [['Night blue', 3], ['Bottle green', 1], ['Dawn grey', 1], ['Amber', 1]]));
      if (glassK !== 'Night blue') { const GL = { 'Bottle green': [[6, 22, 16], [24, 60, 44], [56, 96, 76]], 'Dawn grey': [[34, 38, 50], [80, 90, 110], [120, 130, 150]], Amber: [[34, 18, 8], [80, 50, 24], [130, 96, 60]] }[glassK]; bg = X.rgb(...GL[0]); glassHi = X.rgb(...GL[1]); rimeC = X.rgb(...GL[2]); }
      const seedTip = () => { const e = R.int(0, 3), s = R() * n; let x = e === 0 ? 0 : e === 1 ? n - 1 : s, y = e === 2 ? 0 : e === 3 ? n - 1 : s;
        if (from === 'Corners') { x = e & 1 ? n - 1 - s * 0.25 : s * 0.25; y = e & 2 ? n - 1 - (s * 7 % n) * 0.25 : (s * 7 % n) * 0.25; } else if (from === 'Bottom') { x = s; y = n - 1 - (s * 7 % n) * 0.2; } else if (from === 'Scattered') { x = n * 0.15 + s * 0.7; y = n * 0.15 + (s * 13 % n) * 0.7; } const toward = Math.atan2(n / 2 - y, n / 2 - x) + (from === 'Scattered' ? Math.PI : 0); tips.push({ x, y, a: toward + R.range(-0.5, 0.5), life: R.int(20, 80), gen: 0 }); };
      for (let k = 0; k < 16; k++) seedTip();
      let age = 0;
      return (t, dt, f) => {
        age++;
        if (age <= 900) for (let s = 0; s < 5; s++) for (let i = tips.length - 1; i >= 0; i--) {
          const q = tips[i]; q.x += Math.cos(q.a); q.y += Math.sin(q.a); q.life--;
          const xi = Math.round(q.x), yi = Math.round(q.y);
          if (xi < 0 || yi < 0 || xi >= n || yi >= n || q.life < 0 || occ[yi * n + xi] && q.life < 70) { tips.splice(i, 1); continue; }
          occ[yi * n + xi] = Math.max(occ[yi * n + xi], 3 - Math.min(2, q.gen));
          if (q.gen < 3 && R() < 0.16) { const side = ang.reduce((b, a) => Math.abs(Math.sin(a - q.a)) > 0.6 && R() < 0.5 ? a : b, q.a + R.sign() * Math.PI / 3); tips.push({ x: q.x, y: q.y, a: side, life: q.life * 0.5 | 0, gen: q.gen + 1 }); }
        }
        if (tips.length < 14 && age <= 900) seedTip();
        // after a while the window thaws: the ice fades into the glass over four seconds, then frost starts again
        const thaw = age > 900 ? U.clamp((age - 900) / 48) : 0;
        for (let i = 0; i < n * n; i++) {
          const x = i % n, y = (i / n) | 0, v = occ[i];
          let c = X.mixPk(bg, glassHi, 0.3 + 0.3 * Math.sin(x * 0.02 + y * 0.03 + t * 0.2));
          if (X.dith4(x, y) < rime[i]) c = X.mixPk(c, rimeC, 0.55);
          d[i] = v ? (thaw ? X.mixPk(X.mixPk(X.shade(ice, 0.55), ice, v / 3), c, thaw) : X.mixPk(X.shade(ice, 0.55), ice, v / 3)) : c;
        }
        if (age > 948) { occ.fill(0); tips.length = 0; age = 0; for (let k = 0; k < 16; k++) seedTip(); }
      };
    },
  });

  add({
    name: 'Sandstorm', seed: 10, sizes: [100, 200], fps: 12,
    listens: 'The wind picks up with the noise in the room and drives the sand harder.',
    recipe: 'Wind lifts sand off a dune crest and carries it across in streaks, the dune itself creeping downwind grain by grain as its face slips.',
    make(R, U, g) {
      const { n, d } = g, h = new Float32Array(n), nz = U.noise(R).n2, wind = R.range(0.8, 1.6), tone = R.pick([[150, 90, 50, 214, 160, 100, 244, 206, 146], [120, 60, 60, 200, 110, 90, 240, 170, 130], [90, 80, 110, 170, 150, 170, 230, 210, 220]]), sand = [X.rgb(tone[0], tone[1], tone[2]), X.rgb(tone[3], tone[4], tone[5]), X.rgb(tone[6], tone[7], tone[8])], sky = X.mixPk(sand[2], WHITE, 0.35);
      const k1 = R.int(1, 2), p1 = R() * 6, creep = R.range(0.6, 1.4);
      const dune = (x, t) => { const u = ((x - t * creep) / n * k1 % 1 + 1) % 1, face = u < 0.75 ? u / 0.75 : (1 - u) / 0.25; return n * 0.62 - n * 0.28 * face * face * (3 - 2 * face) - n * 0.04 * nz(x * 0.02, 3); };
      const grains = Array.from({ length: n * 3 }, () => ({ x: R() * n, y: R() * n, v: R.range(0.5, 1.5) }));
      // a farther dune behind, paler with distance, creeping more slowly (its shape from g.alt, so R is untouched)
      const kf = 1 + Math.floor(g.alt() * 2), pf = g.alt() * n, hf = new Float32Array(n);
      const far = [X.mixPk(sand[0], sky, 0.5), X.mixPk(sand[1], sky, 0.55), X.mixPk(sand[2], sky, 0.5)];
      const farDune = (x, t) => { const u = ((x + pf - t * creep * 0.4) / n * kf % 1 + 1) % 1, face = u < 0.7 ? u / 0.7 : (1 - u) / 0.3; return n * 0.5 - n * 0.16 * face * face * (3 - 2 * face) - n * 0.03 * nz(x * 0.03, 11); };
      const tail1 = X.mixPk(sand[0], sky, 0.45), tail2 = X.mixPk(sand[0], sky, 0.75);
      // traits: the sand, the crests, how hard it blows, the sky, which way the wind runs, and what the dunes carry
      g.trait('Sand', ['Ochre', 'Rust', 'Lilac'][[150, 120, 90].indexOf(tone[0])]); g.trait('Crests', k1 === 1 ? 'One' : 'Two');
      const storm = g.trait('Storm', vary(g, [['Blowing', 3], ['Gale', 1.3], ['Drifting', 1.2]])), skyK = g.trait('Sky', vary(g, [['Haze', 3], ['Blue', 1.3], ['Dusk', 1.2]]));
      const flip = g.trait('Wind', vary(g, [['From the left', 3], ['From the right', 2]])) === 'From the right', feat = g.trait('On the dunes', vary(g, [['Nothing', 3], ['Caravan', 1.2], ['Ruins', 1.2]]));
      const shown = storm === 'Drifting' ? n : grains.length, hazeK = storm === 'Gale' ? 1.35 : storm === 'Drifting' ? 0.5 : 1;
      if (storm === 'Gale') for (let k = 0; k < n * 2; k++) grains.push({ x: g.alt() * n, y: g.alt() * n, v: 0.5 + g.alt() });
      const skyRow = new Uint32Array(n).fill(sky);
      if (skyK !== 'Haze') { const A = skyK === 'Blue' ? X.rgb(96, 150, 206) : X.rgb(70, 48, 96), B = skyK === 'Blue' ? sky : X.mixPk(X.rgb(244, 150, 110), sky, 0.3); for (let y = 0; y < n; y++) skyRow[y] = X.mixPk(A, B, Math.min(1, Math.floor(y / (n * 0.62) * 5) / 5)); }
      const caravan = feat === 'Caravan' ? Array.from({ length: 3 + Math.floor(g.alt() * 3) }, (_, k) => ({ x: g.alt() * n * 0.3 + k * 11, s: 0.9 + g.alt() * 0.2 })) : null;
      const ruins = feat === 'Ruins' ? Array.from({ length: 2 + Math.floor(g.alt() * 3) }, () => ({ x: Math.round(n * (0.1 + 0.8 * g.alt())), h: Math.round(n * (0.08 + 0.1 * g.alt())), broken: g.alt() < 0.5 })) : null;
      const CAMEL = ['.....XX.', '..XX.XX.', '.XXXXX..', 'XXXXXX..', '.X..X...', '.X..X...'], camelC = X.rgb(64, 42, 32), stone = X.rgb(222, 202, 168), stoneD = X.rgb(170, 148, 118);
      let gust = 1;
      return (t) => {
        gust += ((g.input.listening ? 1 + g.input.level * 3 : 1) - gust) * 0.2;
        for (let x = 0; x < n; x++) { h[x] = dune(x, t); hf[x] = farDune(x, t); }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, haze = Math.min(1, (0.3 + 0.4 * (nz(x * 0.02 - t * wind * 0.2, y * 0.04) * 0.5 + 0.5)) * (0.75 + 0.25 * gust));
          if (y >= h[x]) {
            // windward slope in sun with faint ripples, the slip face in shade, dithered between, a lit crest
            const slope = h[(x + 1) % n] - h[(x + n - 1) % n], dep = y - h[x];
            if (slope > 0.9 || (slope > 0.3 && X.dith4(x, y) < (slope - 0.3) / 0.6)) d[i] = sand[0];
            else d[i] = dep < 2 ? sand[2] : (dep | 0) % 5 === 3 ? X.mixPk(sand[1], sand[2], 0.3) : sand[1];
          } else if (y >= hf[x]) {
            const slope = hf[(x + 1) % n] - hf[(x + n - 1) % n];
            d[i] = slope > 0.5 ? far[0] : y - hf[x] < 1.5 ? far[2] : far[1];
          }
          else d[i] = X.dith8(x, y) < haze * hazeK * (y / n) ? X.mixPk(skyRow[y], sand[1], 0.5) : skyRow[y];
        }
        if (ruins) for (const r of ruins) {   // columns the dunes bury and uncover as they creep
          const base = Math.round(h[r.x]) + 3, top = base - r.h - (r.broken ? 0 : 2);
          X.rect(g, r.x - 1, top, 4, base - top, stone); X.rect(g, r.x + 2, top, 1, base - top, stoneD);
          if (!r.broken) X.rect(g, r.x - 2, top - 2, 6, 2, stone); else X.put(g, r.x + 2, top - 1, stoneD);
          for (let x = r.x - 2; x <= r.x + 3; x++) for (let y = Math.max(0, Math.floor(h[(x + n) % n])); y < base + 1; y++) if (x >= 0 && x < n && y < n && y >= h[x]) d[y * n + x] = (y - h[x]) < 2 ? sand[2] : sand[1];
        }
        if (caravan) for (const c of caravan) {   // camels plodding along the near dune
          const x = ((c.x + t * 1.1 * c.s) % (n + 40) + n + 40) % (n + 40) - 20, step = ((t * 3 + c.x) | 0) & 1;
          for (let r = 0; r < 6; r++) for (let k = 0; k < 8; k++) if (CAMEL[r][k] === 'X') { const xx = Math.round(x) + k; if (xx < 0 || xx >= n) continue; const yy = Math.round(h[Math.min(n - 1, Math.max(0, Math.round(x) + 3))]) - 6 + r + (r >= 4 && step && k === 1 ? -1 : 0); if (yy >= 0 && yy < n) d[yy * n + xx] = camelC; }
        }
        for (let gi = 0; gi < shown; gi++) {   // each grain a short streak, darkest at its head
          const q = grains[gi];
          q.x += wind * q.v * 2 * gust; q.y += Math.sin(q.x * 0.1) * 0.3; if (q.x > n) { q.x = 0; q.y = h[0] - R() * n * 0.5; }
          if (q.y < h[Math.min(n - 1, q.x | 0)]) { X.put(g, q.x - 2, q.y, tail2); X.put(g, q.x - 1, q.y, tail1); X.put(g, q.x, q.y, sand[0]); }
        }
        if (flip) for (let y = 0; y < n; y++) { const o = y * n; for (let a = 0, b = n - 1; a < b; a++, b--) { const v = d[o + a]; d[o + a] = d[o + b]; d[o + b] = v; } }
      };
    },
  });
})();
