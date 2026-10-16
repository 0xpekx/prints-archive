// Set 3 · Ecosystems: living systems with simple rules: grazers, hunters,
// colonies, swarms and growth, all on the cell grid.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Ecosystems' }, def));
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
    name: 'Wa-Tor', seed: 1, sizes: [80, 100], fps: 10,
    recipe: 'Fish and sharks on a toroidal sea. Fish breed, sharks hunt and starve, and the two populations chase each other round in slow waves of colour across the water.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, kind = new Uint8Array(N), age = new Uint16Array(N), food = new Uint16Array(N), moved = new Uint8Array(N);
      const fishC = X.inks(R, 2, 0.4), fb = R.int(3, 5), sb = R.int(10, 14), starve = R.int(3, 5);
      // curated seas (the rolled inks keep the dice in step; g.alt picks the sea): water, a young fish, a grown fish, the shark
      // (grown fish sit in the middle values, so a sea full of them is calm and the sharks stand out)
      const SEAS = [[[8, 20, 46], [30, 70, 90], [214, 136, 68], [250, 250, 250]], [[6, 22, 26], [22, 66, 56], [118, 196, 126], [240, 250, 230]], [[10, 14, 34], [40, 56, 92], [156, 182, 212], [255, 110, 84]],
        [[24, 10, 40], [80, 30, 74], [222, 108, 128], [255, 240, 220]], [[6, 16, 40], [30, 56, 84], [214, 180, 86], [255, 255, 255]]];
      const SE = SEAS[Math.floor(g.alt() * SEAS.length)].map(c => X.rgb(c[0], c[1], c[2])), sea = SE[0], seaB = X.mixPk(SE[0], SE[1], 0.18), shark = SE[3];
      const fishRamp = Array.from({ length: 4 }, (_, k) => X.mixPk(SE[1], SE[2], k / 3));
      for (let i = 0; i < N; i++) { const r = R(); kind[i] = r < 0.3 ? 1 : r < 0.33 ? 2 : 0; }
      // traits: the sea's colours, how fast fish breed and sharks starve, the grid, and islands the shoals swim round
      g.trait('Sea', ['Reef', 'Kelp', 'Silver', 'Coral', 'Gold'][SEAS.findIndex(q => X.rgb(...q[0]) === sea)]); g.trait('Fish breed', fb < 4 ? 'Fast' : fb < 5 ? 'Steady' : 'Slow'); g.trait('Sharks starve', starve < 4 ? 'Fast' : starve < 5 ? 'Steady' : 'Slow'); g.trait('Grid', n);
      const waters = g.trait('Waters', vary(g, [['Open', 3], ['Islands', 1.4], ['Atoll', 1]]));
      const sand = X.rgb(214, 196, 140), green = X.rgb(70, 130, 70), greenD = X.rgb(46, 100, 56), landC = new Uint32Array(N);
      if (waters !== 'Open') {
        const blobs = waters === 'Atoll' ? [[n / 2, n / 2, n * 0.3, n * 0.2]] : Array.from({ length: 3 + Math.floor(g.alt() * 4) }, () => [g.alt() * n, g.alt() * n, n * (0.05 + g.alt() * 0.08), 0]);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) for (const [bx, by, r, hole] of blobs) {
          const dd = Math.hypot(x - bx, y - by) + 1.5 * Math.sin(x * 0.4 + by) * Math.sin(y * 0.37 + bx);
          if (dd < r && dd >= hole) { const i = y * n + x; kind[i] = 3; landC[i] = dd > r - 1.5 || dd < hole + 1.5 ? sand : (x * 3 + y * 5) % 7 === 0 ? greenD : green; }
        }
      }
      const nb = (i, k) => { const x = i % n, y = (i / n) | 0; return k === 0 ? y * n + (x + 1) % n : k === 1 ? y * n + (x + n - 1) % n : k === 2 ? ((y + 1) % n) * n + x : ((y + n - 1) % n) * n + x; };
      return (t, dt, f) => {
        moved.fill(0);
        const start = R.int(0, N - 1);
        for (let j = 0; j < N; j++) {
          const i = (start + j * 7919) % N; if (!kind[i] || moved[i] || kind[i] === 3) continue;
          const opts = [], prey = [];
          for (let k = 0; k < 4; k++) { const q = nb(i, k); if (!kind[q]) opts.push(q); else if (kind[q] === 1) prey.push(q); }
          let to = -1;
          if (kind[i] === 2) { food[i]++; if (prey.length) { to = prey[R.int(0, prey.length - 1)]; food[i] = 0; } else if (opts.length) to = opts[R.int(0, opts.length - 1)]; if (food[i] > starve) { kind[i] = 0; continue; } }
          else if (opts.length) to = opts[R.int(0, opts.length - 1)];
          age[i]++;
          if (to < 0) continue;
          kind[to] = kind[i]; food[to] = food[i]; moved[to] = 1;
          if (age[i] >= (kind[i] === 1 ? fb : sb)) { age[to] = 0; age[i] = 0; food[i] = 0; } else { age[to] = age[i]; kind[i] = 0; }
        }
        let fish = 0, sh = 0; for (let i = 0; i < N; i++) { if (kind[i] === 1) fish++; else if (kind[i] === 2) sh++; }
        if (sh === 0) for (let k = 0; k < 20; k++) { const j = R.int(0, N - 1); if (kind[j] !== 3) kind[j] = 2; }
        if (fish < N * 0.02) for (let k = 0; k < N * 0.05; k++) { const j = R.int(0, N - 1); if (kind[j] !== 3) kind[j] = 1; }
        for (let i = 0; i < N; i++) d[i] = kind[i] === 3 ? landC[i] : kind[i] === 1 ? fishRamp[Math.min(3, Math.floor(age[i] / fb * 3.99))] : kind[i] === 2 ? shark : (i * 7 + ((i / n) | 0) * 3) % 11 === 0 ? seaB : sea;
      };
    },
  });

  add({
    name: 'Reef', seed: 2, sizes: [100], fps: 12,
    recipe: 'Corals growing up from the sea floor, each colony branching or mounding in its own colour, with a slow light swaying through the water and small fish drifting over them.',
    make(R, U, g) {
      const { n, d } = g, occ = new Int16Array(n * n).fill(-1), cols = X.inks(R, 6, 0.6), tips = [], fish = [];
      const colonies = Array.from({ length: R.int(5, 8) }, (_, k) => ({ x: R.int(4, n - 5), c: cols[k % cols.length], branchy: R.range(0.4, 1), up: R.range(0.3, 0.55) }));
      colonies.forEach((c, k) => { tips.push({ x: c.x, y: n - 3, k }); occ[(n - 3) * n + c.x] = k; });
      for (let k = 0; k < 6; k++) fish.push({ x: R() * n, y: R.range(5, n * 0.5), v: R.range(0.2, 0.5) * R.sign(), c: X.hsbPk(R.range(0, 100), 80, 100) });
      // reef colours, hand-picked (g.alt chooses the reef; the dice for growth are unchanged)
      const REEFS = [[[250, 110, 120], [255, 170, 70], [150, 90, 200], [240, 210, 90], [60, 200, 180], [230, 90, 60]], [[250, 180, 190], [190, 160, 240], [250, 220, 150], [150, 220, 210], [255, 200, 160], [220, 140, 200]],
        [[200, 60, 90], [120, 60, 160], [230, 120, 60], [60, 140, 170], [240, 180, 80], [170, 40, 60]]];
      const ri = Math.floor(g.alt() * REEFS.length), reef = REEFS[ri].map(c => X.rgb(c[0], c[1], c[2]));
      colonies.forEach((c, k) => { c.c = reef[k % reef.length]; });
      // traits: the reef's colours, how the corals grow, the water, the fish, how many colonies
      g.trait('Reef', ['Tropical', 'Pastel', 'Deep red'][ri]); g.trait('Colonies', colonies.length);
      const growth = g.trait('Growth', vary(g, [['Branching', 3], ['Mounds', 1.4], ['Towers', 1.2]])), water = g.trait('Water', vary(g, [['Shallow', 3], ['Lagoon', 1.3], ['Twilight', 1.2]])), fishK = g.trait('Fish', vary(g, [['A few', 3], ['A school', 1.5], ['None', 0.8]]));
      if (growth === 'Mounds') for (const c of colonies) { c.up *= 0.35; c.branchy *= 1.3; } else if (growth === 'Towers') for (const c of colonies) { c.up = Math.min(0.85, c.up * 1.6); c.branchy *= 0.6; }
      const WT = { Shallow: [[20, 90, 140], [6, 20, 50]], Lagoon: [[70, 190, 190], [12, 80, 110]], Twilight: [[24, 36, 90], [4, 6, 22]] }[water], wTop = X.rgb(...WT[0]), wLow = X.rgb(...WT[1]);
      if (fishK === 'None') fish.length = 0;
      const school = fishK === 'A school' ? Array.from({ length: 22 }, () => ({ dx: (g.alt() - 0.5) * 18, dy: (g.alt() - 0.5) * 8, p: g.alt() * 6 })) : null, schoolC = X.rgb(220, 230, 240), sdir = g.alt() < 0.5 ? 1 : -1;
      const fade = Float32Array.from({ length: n * n }, (_, i) => 0.7 * (((i * 2654435761) >>> 0) % 10007) / 10007 + 0.3 * ((i / n) | 0) / n);
      let age = 0;
      return (t) => {
        // an old reef crumbles away over a few seconds, top first, before the colonies start again
        if (++age > 1500) { const k = (age - 1500) / 48; for (let i = 0; i < n * n; i++) if (occ[i] >= 0 && fade[i] < k) occ[i] = -1; }
        if (age > 1548) { occ.fill(-1); tips.length = 0; age = 0; colonies.forEach((c, k) => { tips.push({ x: c.x, y: n - 3, k }); occ[(n - 3) * n + c.x] = k; }); }
        for (let s = 0; s < 4; s++) for (let i = tips.length - 1; i >= 0; i--) {
          const q = tips[i], c = colonies[q.k];
          const dx = R() < c.up ? 0 : R.sign(), dy = dx === 0 ? -1 : R() < 0.5 ? -1 : 0, x = q.x + dx, y = q.y + dy;
          if (x < 0 || x >= n || y < 4 || occ[y * n + x] >= 0) { if (R() < 0.3) tips.splice(i, 1); continue; }
          occ[y * n + x] = q.k; q.x = x; q.y = y;
          if (R() < c.branchy * 0.2 && tips.length < 400) tips.push({ x, y, k: q.k });
        }
        if (tips.length < 4) colonies.forEach((c, k) => { const x = R.int(0, n - 1); for (let y = 4; y < n; y++) if (occ[y * n + x] >= 0) { tips.push({ x, y: y - 1, k: occ[y * n + x] }); break; } });
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, o = occ[i], ray = Math.sin(x * 0.12 + y * 0.05 - t * 0.5) * Math.sin(x * 0.05 - t * 0.3);
          // coral lit from above left: bright where open water is up or left of it, in shade on its right flank
          const lit = o < 0 ? 0 : (y > 0 && occ[i - n] < 0) || (x > 0 && occ[i - 1] < 0) ? 1.15 : x < n - 1 && occ[i + 1] < 0 ? 0.68 : 0.9;
          d[i] = y >= n - 3 ? ((x * 5 + y * 3) % 7 === 0 ? X.rgb(176, 156, 110) : X.rgb(200, 180, 130)) : o >= 0 ? X.shade(colonies[o].c, lit + 0.12 * (ray > 0.5)) : X.mixPk(wTop, wLow, y / n * 0.9 + (ray > 0.6 ? -0.15 : 0));
        }
        for (const f of fish) { f.x += f.v; if (f.x < -4) f.x = n + 3; if (f.x > n + 3) f.x = -4; f.y += Math.sin(t + f.x * 0.1) * 0.1; X.rect(g, f.x, f.y, 3, 2, f.c); X.put(g, f.x + (f.v > 0 ? -1 : 3), f.y + (((t * 4) | 0) & 1), f.c); }
        if (school) {   // a school of small silver fish wheeling together above the reef
          const cx = ((t * 3 * sdir) % (n + 40) + n + 40) % (n + 40) - 20, cy = n * 0.25 + Math.sin(t * 0.4) * n * 0.08;
          for (const f of school) { const x = cx + f.dx + Math.sin(t * 1.3 + f.p) * 1.5, y = cy + f.dy + Math.cos(t * 1.1 + f.p) * 1; X.put(g, x, y, schoolC); X.put(g, x - sdir, y, X.shade(schoolC, 0.7)); }
        }
      };
    },
  });

  add({
    name: 'Lichen', seed: 3, sizes: [100, 200], fps: 12,
    recipe: 'Lichens colonising a stone: each species spreads from a few spores at its own pace, its growth rings showing in the shade, until the rivals meet in crisp borders.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, own = new Int16Array(N).fill(-1), born = new Float32Array(N), front = [], inks = X.inks(R, 6, 0.4), nz = U.noise(R).n2;
      const sp = Array.from({ length: R.int(4, 7) }, (_, k) => ({ c: inks[k % inks.length], rate: R.range(0.4, 1) }));
      const rock = Float32Array.from({ length: N }, (_, i) => nz((i % n) * 0.06, ((i / n) | 0) * 0.06));
      const seedAll = () => { own.fill(-1); front.length = 0; for (let k = 0; k < sp.length * 3; k++) { const i = R.int(0, N - 1); own[i] = k % sp.length; front.push(i); } };
      seedAll();
      let clock = 0;
      return (t) => {
        clock++;
        for (let s = 0; s < (n >= 200 ? 600 : 160) && front.length; s++) {
          const j = R.int(0, front.length - 1), i = front[j], k = own[i];
          if (R() > sp[k].rate) continue;
          const x = i % n, y = (i / n) | 0, dirs = [];
          if (x > 0 && own[i - 1] < 0) dirs.push(i - 1); if (x < n - 1 && own[i + 1] < 0) dirs.push(i + 1); if (y > 0 && own[i - n] < 0) dirs.push(i - n); if (y < n - 1 && own[i + n] < 0) dirs.push(i + n);
          if (!dirs.length) { front[j] = front[front.length - 1]; front.pop(); continue; }
          const q = R.pick(dirs); own[q] = k; born[q] = clock; front.push(q);
        }
        if (!front.length && clock > 50) { seedAll(); clock = 0; }
        for (let i = 0; i < N; i++) {
          const k = own[i], r = rock[i];
          d[i] = k < 0 ? X.rgb(110 + r * 30, 108 + r * 30, 100 + r * 26) : X.shade(sp[k].c, 0.7 + 0.25 * (((born[i] / 18) | 0) & 1) + r * 0.1);
        }
      };
    },
  });

  add({
    name: 'Migration', seed: 4, sizes: [80, 100], fps: 12,
    listens: 'The birds beat their wings harder in a loud room, and a clap startles the skeins out of line.',
    recipe: 'Skeins of birds crossing a banded evening sky above still water, wings beating in turn down each line. Far skeins fly small and pale, near ones large and dark, and the water below carries their reflections.',
    make(R, U, g) {
      // traits: how much water, the far shore, how many skeins, the sky (and the dice still roll the rest)
      const horizon = g.trait('Horizon', vary(g, [['Low', 3], ['Middle', 1.5]])), shoreK = g.trait('Shore', vary(g, [['Low hills', 3], ['Mountains', 1.3], ['Pines', 1.2], ['Reeds', 1.2]])), flocks = g.trait('Flocks', vary(g, [['Few', 3], ['Many', 1.5]]));
      const { n, d } = g, nz = U.noise(R).n2, hz = Math.round(n * (horizon === 'Middle' ? 0.58 : 0.74)), dir = R.sign();
      const SKIES = [
        [[24, 20, 60], [70, 34, 90], [150, 50, 90], [230, 90, 70], [250, 160, 80], [255, 220, 140]],
        [[10, 30, 60], [30, 70, 110], [80, 130, 160], [170, 190, 190], [240, 210, 170], [255, 240, 210]],
        [[40, 10, 40], [110, 20, 60], [200, 40, 60], [250, 100, 40], [255, 170, 30], [255, 230, 90]],
        [[8, 10, 24], [16, 22, 50], [30, 40, 80], [50, 64, 110], [80, 96, 140], [120, 130, 170]],
      ];
      const ki = R.int(0, SKIES.length - 1), night = ki === 3, sky = SKIES[ki].map(c => X.rgb(...c));
      g.trait('Sky', ['Dusk', 'Dawn', 'Sunset', 'Night'][ki]);
      const ink = night ? X.rgb(4, 4, 10) : X.rgb(18, 10, 24);

      // the still sky, sun or moon and the far shore, drawn once
      const base = new Uint32Array(n * n), bg = { n, d: base };
      for (let y = 0; y < hz; y++) {
        const fb = y / hz * sky.length, i = Math.floor(fb), fr = fb - i;
        for (let x = 0; x < n; x++) base[y * n + x] = fr > 0.7 && i + 1 < sky.length && X.dith4(x, y) < (fr - 0.7) / 0.3 ? sky[i + 1] : sky[i];
      }
      if (night) for (let k = 0; k < n * 0.4; k++) { const x = R.int(0, n - 1), y = R.int(0, Math.floor(hz * 0.5)); base[y * n + x] = X.rgb(230, 230, 210); }
      const sx = R.range(0.25, 0.75) * n, sr = n * (night ? 0.06 : 0.11), sy = night ? hz * 0.3 : hz - sr * 0.45, disc = night ? X.rgb(235, 235, 215) : X.mixPk(sky[5], WHITE, 0.55);
      for (let y = Math.floor(sy - sr); y < Math.min(hz, sy + sr + 1); y++) for (let x = Math.floor(sx - sr); x <= sx + sr; x++) if (y >= 0 && x >= 0 && x < n && (x - sx) ** 2 + (y - sy) ** 2 <= sr * sr) base[y * n + x] = disc;
      const shore = X.shade(sky[0], 0.55), z0 = R() * 50;
      if (shoreK === 'Mountains') { const pale = X.mixPk(shore, sky[2], 0.45); for (let x = 0; x < n; x++) { const h = Math.round(3 + (0.5 - Math.abs(nz(x * 0.03, z0 + 3))) * n * 0.3 + Math.abs(nz(x * 0.11, z0)) * 3); for (let y = hz - h; y < hz; y++) base[y * n + x] = y > hz - 3 ? shore : pale; } }
      else for (let x = 0; x < n; x++) { const h = Math.round(1 + 4 * (0.5 + 0.5 * nz(x * 0.05, z0))); for (let y = hz - h; y < hz; y++) base[y * n + x] = shore; }
      if (shoreK === 'Pines') for (let x = 2; x < n - 2; x += 2 + Math.floor(g.alt() * 4)) { const h = 3 + Math.floor(g.alt() * n * 0.07), b = hz - 2; for (let dy = 0; dy < h; dy++) { const hw = Math.floor(dy / 2.6); for (let dx = -hw; dx <= hw; dx++) if (x + dx >= 0 && x + dx < n) base[(b - h + dy) * n + x + dx] = shore; } }
      // reeds in the foreground, drawn over the water each frame
      const reeds = shoreK === 'Reeds' ? Array.from({ length: Math.round(n * 0.35) }, () => { const left = g.alt() < 0.5, x = left ? g.alt() * n * 0.35 : n - 1 - g.alt() * n * 0.35; return { x: Math.round(x), h: Math.round((0.12 + g.alt() * 0.18) * n), bend: (g.alt() - 0.5) * 3, head: g.alt() < 0.3 }; }) : null;

      // birds: three sizes, each with three wing frames (up, level, down)
      const SPR = [
        [['X.X', '.X.'], ['XXX', '.X.'], ['.X.', 'X.X']],
        [['X...X', '.XXX.', '..X..'], ['.....', 'XXXXX', '..X..'], ['.....', '.XXX.', 'X.X.X']],
        [['X.....X', '.X...X.', '..XXX..', '...X...'], ['.......', 'XX...XX', '..XXX..', '...X...'], ['.......', '..XXX..', '.X.X.X.', 'X.....X']],
      ];
      const DEPTH = [
        { gap: [4, 2], v: 1.6, ink: X.mixPk(ink, sky[2], 0.55) },
        { gap: [6, 3], v: 2.6, ink: X.mixPk(ink, sky[2], 0.25) },
        { gap: [9, 4], v: 3.8, ink },
      ];
      const spawn = (z, first) => {
        const m = R.int(3, z === 2 ? 4 : 6), D = DEPTH[z], span = m * D.gap[0] + 8;
        const lo = n * 0.08 + m * D.gap[1], hi = hz - n * 0.14 - m * D.gap[1];
        return { z, m, span, shape: R.pick(['v', 'v', 'echelon', 'line']), x: first ? R.range(0.15, 0.85) * n : dir > 0 ? -span * 0.3 : n + span * 0.3, y: R.range(lo, Math.max(lo, hi)), v: D.v * R.range(0.85, 1.15), ph: R() * 9 };
      };
      const skeins = [spawn(2, true), ...Array.from({ length: R.int(2, 3) }, () => spawn(R.int(0, 1), true))];
      if (flocks === 'Many') skeins.push(spawn(1, true), spawn(0, true), spawn(0, true));
      skeins.sort((p, q) => p.z - q.z);
      const stamp = (spr, x, y, c) => { const w = spr[0].length; for (let r = 0; r < spr.length; r++) for (let k = 0; k < w; k++) if (spr[r][k] === 'X') X.put(g, Math.round(x) - (w >> 1) + k, Math.round(y) + r, c); };

      let wing = 0, scare = 0;   // extra wing beats and the startle; both stay 0 unless the room is heard
      return (t, dt) => {
        d.set(base);
        const inp = g.input;
        if (inp.listening) { if (inp.beats()) scare = 1; wing += dt * 5 * (inp.level * 1.5 + scare * 2); }
        scare = scare > 0.02 ? scare * 0.94 : 0;
        for (let i = 0; i < skeins.length; i++) {
          let q = skeins[i];
          q.x += dir * q.v * dt * (1 + scare * 1.5);
          if (dir > 0 ? q.x - q.span > n : q.x + q.span < 0) { q = skeins[i] = spawn(q.z, false); }
          const D = DEPTH[q.z], frames = SPR[q.z];
          for (let k = 0; k <= 2 * q.m; k++) {
            const j = Math.ceil(k / 2), side = k === 0 ? 0 : k % 2 ? 1 : -1;
            if (q.shape === 'echelon' && side < 0) continue;
            const bx = q.x - dir * j * D.gap[0] * (q.shape === 'line' ? 1 : 0.8) - (q.shape === 'line' && side < 0 ? dir * D.gap[0] * 0.5 : 0);
            const by = q.shape === 'line' ? q.y + Math.sin(j * 0.9 + t * 0.8 + q.ph) * D.gap[1] * 0.8 + side * 2 : q.y + side * j * D.gap[1];
            const p = Math.sin(t * 5 + wing - j * 0.55 + q.ph), fr = p > 0.35 ? 0 : p < -0.35 ? 2 : 1;
            const sx = scare ? Math.sin(j * 2.1 + k * 1.3 + q.ph) * scare * D.gap[0] * 0.8 : 0, sy = scare ? Math.cos(j * 1.7 + k + q.ph) * scare * D.gap[1] * 1.4 : 0;
            stamp(frames[fr], bx + sx, by + sy + Math.sin(t * 1.3 + j * 0.7) * 0.6, D.ink);
          }
        }
        // still water: the sky and birds mirrored, darkened, with slow ripples
        for (let y = hz; y < n; y++) {
          const depth = (y - hz) / (n - hz), my = Math.max(0, Math.min(hz - 1, Math.round(hz - 1 - (y - hz) * 1.7)));
          const shift = Math.round(Math.sin(y * 0.9 + t * 0.9) * (0.5 + depth * 1.5)), dark = (y - hz) % 3 === 2 ? 0.42 : 0.55;
          for (let x = 0; x < n; x++) d[y * n + x] = X.shade(d[my * n + Math.max(0, Math.min(n - 1, x + shift))], dark);
        }
        if (reeds) for (const r of reeds) {   // reeds at the water's edge, swaying a little
          const sway = Math.sin(t * 0.8 + r.x * 0.3) * 0.8;
          X.line(g, r.x, n - 1, r.x + r.bend + sway, n - 1 - r.h, ink);
          if (r.head) X.rect(g, r.x + r.bend + sway - 0.5, n - 1 - r.h, 2, 3, X.mixPk(ink, sky[2], 0.15));
        }
      };
    },
  });

  // Comb: the wooden frame of a hive, a trait: the comb seen inside its frame with the grain of the wood
  function combFrame(g) {
    const { n } = g, k = Math.max(3, Math.round(n * 0.045)), wood = X.rgb(150, 104, 60), dark = X.rgb(104, 70, 40), light = X.rgb(186, 140, 90);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const e = Math.min(x, y, n - 1 - x, n - 1 - y); if (e >= k) continue;
      g.d[y * n + x] = e === k - 1 ? dark : e === 0 ? dark : (x < k || x >= n - k ? (y * 7 + x) % 9 === 0 : (x * 7 + y) % 9 === 0) ? light : wood;
    }
  }
  add({
    name: 'Comb', seed: 5, sizes: [100, 200], fps: 12,
    interactive: 'Click a cell to fill it with nectar; it is capped and kept. The bees come to your hand.',
    recipe: 'A honeycomb in pixel hexagons. Bees wander the comb; cells fill with nectar that thickens to honey through its shades, the full ones are capped in wax, and some hold brood. Acacia, clover, buckwheat or a neon comb, with cells and bees of every size; click a cell to fill it.',
    make: fork(function og(R, U, g) {
      // the original path varies too (from g.alt): the honey and the cell size
      const honeyK = vary(g, [['Acacia', 3], ['Clover', 1.3], ['Buckwheat', 1.3]]), sizeK = vary(g, [['Medium', 3], ['Small', 1.2], ['Large', 1.2]]);
      const { n, d } = g, r = (n >= 200 ? 7 : 5) + (sizeK === 'Small' ? -1 : sizeK === 'Large' ? 2 : 0), w = r * 2, h = Math.round(r * 1.75), cells = [], id = new Int16Array(n * n).fill(-1);
      for (let j = 0, y = 0; y < n + h; j++, y += h) for (let i = 0, x = (j & 1) * r; x < n + w; i++, x += w) cells.push({ x, y, fill: R() * 0.6, rate: R.range(0.002, 0.008) });
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let best = 1e9, b = -1; for (let k = 0; k < cells.length; k++) { const c = cells[k], dx = x - c.x, dy = (y - c.y) * 1.15, dd = dx * dx + dy * dy; if (dd < best) { best = dd; b = k; } } id[y * n + x] = b; }
      const HO = { Acacia: [[255, 236, 160], [250, 200, 60], [220, 140, 20], [160, 80, 10], [240, 214, 120], [120, 80, 20], [70, 46, 16]], Clover: [[255, 250, 210], [246, 232, 150], [236, 206, 90], [210, 170, 50], [250, 244, 220], [170, 140, 80], [90, 76, 44]], Buckwheat: [[230, 150, 70], [180, 90, 30], [120, 50, 20], [70, 26, 12], [210, 170, 110], [60, 34, 20], [30, 18, 12]] }[honeyK].map(c => X.rgb(...c));
      const amber = HO.slice(0, 4), wax = HO[4], wall = HO[5], emptyC = HO[6], keptWax = honeyK === 'Acacia' ? X.rgb(250, 226, 140) : X.mixPk(wax, WHITE, 0.3);
      const bees = Array.from({ length: n >= 200 ? 14 : 7 }, () => ({ x: R() * n, y: R() * n, a: R() * U.TAU }));
      g.trait('Honey', honeyK); g.trait('Cells', sizeK); g.trait('Bees', bees.length); g.trait('Brood', 'None');
      const framed = g.trait('Frame', vary(g, [['None', 3], ['Hive frame', 1.5]])) !== 'None';
      return (t) => {
        // a cell the viewer fills is capped and kept: it never empties, so the comb carries every visit
        for (const tp of g.input.taps()) { const k = id[Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0)]; if (k >= 0) { cells[k].fill = Math.max(cells[k].fill, 0.95); cells[k].kept = true; } }
        for (const c of cells) { if (c.kept) { c.fill = Math.min(1.2, c.fill + c.rate); continue; } c.fill += c.rate; if (c.fill > 1.4) c.fill = 0; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, k = id[i], c = cells[k], edge = (x > 0 && id[i - 1] !== k) || (y > 0 && id[i - n] !== k);
          d[i] = edge ? wall : c.fill > 1 ? (X.dith4(x, y) < 0.15 ? X.shade(wax, 0.9) : c.kept ? keptWax : wax) : c.fill < 0.1 ? emptyC : amber[Math.min(3, (c.fill * 4) | 0)];
        }
        const inp = g.input;
        for (const b of bees) {
          b.a += R.range(-0.4, 0.4);
          if (inp.inside) { const want = Math.atan2(inp.y * n - b.y, inp.x * n - b.x); b.a += Math.atan2(Math.sin(want - b.a), Math.cos(want - b.a)) * 0.2; }   // drawn to the pointer
          b.x = (b.x + Math.cos(b.a) * 0.6 + n) % n; b.y = (b.y + Math.sin(b.a) * 0.6 + n) % n;
          X.rect(g, b.x, b.y, 3, 2, X.rgb(30, 24, 10)); X.put(g, b.x + 1, b.y, X.rgb(250, 200, 30)); X.put(g, b.x + 1, b.y - 1 + (((t * 10) | 0) & 1), X.rgb(220, 230, 255));
        }
        if (framed) combFrame(g);
      };
    }, function alt(R, U, g) {
      const { n, d } = g, r = (n >= 200 ? 7 : 5) + R.pick([-1, 0, 0, 1, 2]), w = r * 2, h = Math.round(r * 1.75), cells = [], id = new Int16Array(n * n).fill(-1);
      for (let j = 0, y = 0; y < n + h; j++, y += h) for (let i = 0, x = (j & 1) * r; x < n + w; i++, x += w) cells.push({ x, y, fill: R() * 0.6, rate: R.range(0.002, 0.008) });
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let best = 1e9, b = -1; for (let k = 0; k < cells.length; k++) { const c = cells[k], dx = x - c.x, dy = (y - c.y) * 1.15, dd = dx * dx + dy * dy; if (dd < best) { best = dd; b = k; } } id[y * n + x] = b; }
      const HONEY = [
        [[255, 236, 160], [250, 200, 60], [220, 140, 20], [160, 80, 10], [240, 214, 120], [120, 80, 20], [70, 46, 16]],
        [[255, 250, 210], [246, 232, 150], [236, 206, 90], [210, 170, 50], [250, 244, 220], [170, 140, 80], [90, 76, 44]],
        [[230, 150, 70], [180, 90, 30], [120, 50, 20], [70, 26, 12], [210, 170, 110], [60, 34, 20], [30, 18, 12]],
        [[120, 255, 240], [0, 220, 220], [240, 60, 220], [130, 30, 200], [255, 255, 255], [20, 20, 30], [8, 8, 14]],
      ], H = R.pick(HONEY).map(c => X.rgb(c[0], c[1], c[2]));
      const amber = H.slice(0, 4), wax = H[4], wall = H[5], empty = H[6], brood = R.bool(0.5);
      cells.forEach(c => { c.brood = brood && R() < 0.15; });
      const bees = Array.from({ length: R.int(4, n >= 200 ? 18 : 12) }, () => ({ x: R() * n, y: R() * n, a: R() * U.TAU, s: R.range(0.4, 0.9) }));
      g.trait('Honey', ['Acacia', 'Clover', 'Buckwheat', 'Neon'][HONEY.findIndex(q => X.rgb(...q[4]) === wax)]); g.trait('Cells', r < (n >= 200 ? 7 : 5) ? 'Small' : r > (n >= 200 ? 7 : 5) ? 'Large' : 'Medium'); g.trait('Bees', bees.length); g.trait('Brood', brood ? 'Some' : 'None');
      const framed = g.trait('Frame', vary(g, [['None', 3], ['Hive frame', 1.5]])) !== 'None';
      return (t) => {
        for (const tp of g.input.taps()) { const k = id[Math.min(n - 1, tp.y * n | 0) * n + Math.min(n - 1, tp.x * n | 0)]; if (k >= 0) { cells[k].fill = Math.max(cells[k].fill, 0.95); cells[k].brood = false; cells[k].kept = true; } }
        for (const c of cells) { if (c.kept) { c.fill = Math.min(1.2, c.fill + c.rate); continue; } c.fill += c.rate; if (c.fill > 1.4) c.fill = 0; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, k = id[i], c = cells[k], edge = (x > 0 && id[i - 1] !== k) || (y > 0 && id[i - n] !== k);
          d[i] = edge ? wall : c.brood && c.fill > 0.6 ? (X.dith4(x, y) < 0.3 ? X.shade(wax, 0.85) : X.mixPk(wax, WHITE, 0.5)) : c.fill > 1 ? (X.dith4(x, y) < 0.15 ? X.shade(wax, 0.9) : wax) : c.fill < 0.1 ? empty : amber[Math.min(3, (c.fill * 4) | 0)];
        }
        const inp = g.input;
        for (const b of bees) {
          b.a += R.range(-0.4, 0.4);
          if (inp.inside) { const want = Math.atan2(inp.y * n - b.y, inp.x * n - b.x); b.a += Math.atan2(Math.sin(want - b.a), Math.cos(want - b.a)) * 0.2; }
          b.x = (b.x + Math.cos(b.a) * b.s + n) % n; b.y = (b.y + Math.sin(b.a) * b.s + n) % n;
          X.rect(g, b.x, b.y, 3, 2, X.rgb(30, 24, 10)); X.put(g, b.x + 1, b.y, X.rgb(250, 200, 30)); X.put(g, b.x + 1, b.y - 1 + (((t * 10) | 0) & 1), X.rgb(220, 230, 255));
        }
        if (framed) combFrame(g);
      };
    }),
  });

  add({
    name: 'Algal Bloom', seed: 6, sizes: [100], fps: 12,
    recipe: 'A plankton bloom in a slow current: the algae grow where it is warm, are carried and stretched into filaments by the swirling water, and thin out where the current runs cold.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, nz = U.noise(R).n2, a = new Float32Array(N), b = new Float32Array(N), deep = X.rgb(10, 30, 60), cols0 = X.inks(R, 3, 0.4);
      // blooms as they really colour water: green algae, a red tide, cyan cyanobacteria, golden diatoms, a glowing violet night bloom
      const BLOOMS = [[[30, 110, 80], [110, 190, 80], [230, 240, 150]], [[110, 40, 50], [210, 90, 60], [255, 190, 140]], [[20, 110, 130], [60, 200, 190], [200, 250, 230]],
        [[90, 80, 40], [200, 160, 60], [250, 230, 160]], [[60, 40, 110], [120, 90, 200], [190, 230, 255]]];
      const bi = Math.floor(g.alt() * BLOOMS.length), cols = cols0.length && BLOOMS[bi].map(c => X.rgb(c[0], c[1], c[2]));
      // traits: the bloom, the size of the eddies, and how much of the water starts green
      g.trait('Bloom', ['Green algae', 'Red tide', 'Cyanobacteria', 'Diatoms', 'Night bloom'][bi]);
      const curK = g.trait('Current', vary(g, [['Swirls', 3], ['Small eddies', 1.4], ['Broad gyres', 1.3]])), sc = curK === 'Small eddies' ? 0.055 : curK === 'Broad gyres' ? 0.018 : 0.03, vk = 60 * (0.03 / sc);   // the same current speed at every scale
      const seedK = g.trait('Start', vary(g, [['Patches', 3], ['Streaks', 1.2], ['Clear water', 1]]));
      const ramp = X.rampPk([deep, cols[0], cols[1], cols[2]], 16);
      for (let i = 0; i < N; i++) { const x = i % n, y = (i / n) | 0; a[i] = seedK === 'Streaks' ? (nz(x * 0.02 + 9, y * 0.2) > 0.25 ? 0.8 : 0.05) : seedK === 'Clear water' ? (nz(x * 0.05 + 9, y * 0.05) > 0.55 ? 0.8 : 0.05) : nz(x * 0.05 + 9, y * 0.05) > 0.2 ? 0.8 : 0.05; }
      return (t) => {
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const e = 0.01, s = sc, p0 = nz(x * s, y * s + t * 0.03), vx = (nz(x * s, (y + 1) * s + t * 0.03) - p0) * vk, vy = -(nz((x + 1) * s, y * s + t * 0.03) - p0) * vk;
          let sx = x - vx, sy = y - vy; sx = ((sx % n) + n) % n; sy = ((sy % n) + n) % n;
          const v = a[(sy | 0) * n + (sx | 0)], warm = 0.5 + 0.5 * nz(x * 0.02 + 40, y * 0.02 + t * 0.01);
          b[y * n + x] = U.clamp(v + 0.08 * (warm - 0.45) + (R() < 0.0004 ? 0.4 : 0));
        }
        a.set(b);
        for (let i = 0; i < N; i++) d[i] = ramp[Math.min(15, (a[i] * 16) | 0)];
      };
    },
  });

  add({
    name: 'Mycelium', seed: 7, sizes: [100, 200], fps: 12,
    recipe: 'Underground, threads of fungus fork outward through dark soil from a buried spore; where they reach the surface, mushrooms push up into the light, then the field rests and begins again.',
    make(R, U, g) {
      // traits: how deep the cut, the soil, the world above, how many spores, the caps' colours
      const depthK = g.trait('Cut', vary(g, [['Shallow', 3], ['Deep', 1.5]])), soilK = g.trait('Soil', vary(g, [['Loam', 3], ['Clay', 1.2], ['Peat', 1.2], ['Sand', 1]]));
      const above = g.trait('Above', vary(g, [['Meadow', 3], ['Forest', 1.3], ['Night', 1.3], ['Snow', 1]])), spores = g.trait('Spores', vary(g, [[3, 3], [1, 1.2], [6, 1.2]]));
      const glow = above === 'Night';
      const { n, d } = g, soil = Math.round(n * (depthK === 'Deep' ? 0.18 : 0.3)), occ = new Uint8Array(n * n), tips = [], caps = [], cap = X.inks(R, 2, 0.4), thread = glow ? X.rgb(150, 255, 230) : X.rgb(236, 230, 210);
      g.trait('Caps', inkName(cap));
      const start = () => { occ.fill(0); tips.length = 0; caps.length = 0; for (let k = 0; k < spores; k++) tips.push({ x: R.range(n * 0.2, n * 0.8), y: R.range(n * 0.6, n * 0.9), a: R() * U.TAU }); };
      start();
      let age = 0;
      // older threads darken as they age, so the newest growth reads at the tips; soil in dithered strata with grit
      const born = new Uint16Array(n * n), old = glow ? X.rgb(26, 80, 90) : X.rgb(100, 82, 66), soilC = new Uint32Array(n * n);
      const SO = { Loam: [[62, 42, 30], [24, 16, 14], [78, 58, 44]], Clay: [[122, 64, 42], [52, 26, 20], [146, 84, 60]], Peat: [[42, 32, 28], [12, 10, 10], [60, 48, 40]], Sand: [[150, 122, 84], [82, 62, 42], [176, 150, 108]] }[soilK].map(c => X.rgb(...c));
      const SKY = { Meadow: [[130, 170, 210], [220, 200, 170]], Forest: [[96, 120, 110], [170, 176, 150]], Night: [[6, 8, 24], [30, 36, 70]], Snow: [[170, 190, 214], [236, 238, 240]] }[above].map(c => X.rgb(...c));
      const grassC = above === 'Snow' ? [X.rgb(236, 240, 246), X.rgb(200, 210, 224), X.rgb(250, 252, 255)] : above === 'Night' ? [X.rgb(20, 44, 34), X.rgb(14, 30, 24), X.rgb(30, 60, 44)] : [X.rgb(60, 110, 50), X.rgb(44, 84, 40), X.rgb(80, 140, 60)];
      const trunks = above === 'Forest' ? Array.from({ length: 3 + Math.floor(g.alt() * 3) }, () => ({ x: Math.round(g.alt() * n), w: 2 + Math.floor(g.alt() * 3) })) : [];
      const stars = above === 'Night' ? Array.from({ length: 24 }, () => [Math.floor(g.alt() * n), Math.floor(g.alt() * (soil - 4))]) : [];
      let grown = 0;   // thread cells laid this cycle: past about a third of the soil the network stops spreading
      for (let y = soil; y < n; y++) for (let x = 0; x < n; x++) { const u = (y - soil) / (n - soil), b = Math.floor(u * 4 + X.dith4(x, y) * 0.9) / 4; soilC[y * n + x] = (x * 3 + y * 7) % 11 === 0 ? SO[2] : X.mixPk(SO[0], SO[1], b); }
      return (t) => {
        if (++age > 840) { start(); age = 0; grown = 0; }
        if (grown > (n - soil) * n * 0.32) tips.length = 0;
        const rest = age > 800 ? (age - 800) / 40 : 0;   // the field rests: threads fade into the soil, caps sink
        if (!rest) for (let s = 0; s < 3; s++) for (let i = tips.length - 1; i >= 0; i--) {
          const q = tips[i]; q.a += R.range(-0.35, 0.35); q.x += Math.cos(q.a) * 0.8; q.y += Math.sin(q.a) * 0.8;
          if (q.x < 0 || q.x >= n || q.y >= n) { tips.splice(i, 1); continue; }
          if (q.y <= soil + 1) { if (caps.length < 12) caps.push({ x: q.x, h: 0, max: R.int(4, 9), c: cap[R.int(0, 1)] }); tips.splice(i, 1); continue; }
          if (!occ[(q.y | 0) * n + (q.x | 0)]) grown++;
          occ[(q.y | 0) * n + (q.x | 0)] = 1; born[(q.y | 0) * n + (q.x | 0)] = age;
          if (R() < 0.015 && tips.length < 40) tips.push({ x: q.x, y: q.y, a: q.a + R.sign() * R.range(0.5, 1.1) });
        }
        if (!tips.length && age < 500 && grown < (n - soil) * n * 0.32) tips.push({ x: R.range(n * 0.2, n * 0.8), y: n - 2, a: -Math.PI / 2 + R.range(-1, 1) });
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x;
          if (y < soil) { d[i] = X.mixPk(SKY[0], SKY[1], Math.floor(y / soil * 5) / 5); continue; }
          if (!occ[i]) { d[i] = soilC[i]; continue; }
          const c = X.mixPk(old, thread, Math.max(0.3, 1 - (age - born[i]) / 260));
          d[i] = rest ? X.mixPk(c, soilC[i], rest) : c;
        }
        for (const [sx, sy] of stars) X.put(g, sx, sy, X.rgb(220, 224, 240));
        for (const tr of trunks) { X.rect(g, tr.x, 0, tr.w, soil - 2, X.rgb(54, 46, 40)); X.rect(g, tr.x, 0, 1, soil - 2, X.rgb(74, 64, 56)); }
        X.rect(g, 0, soil - 2, n, 2, grassC[0]); X.rect(g, 0, soil - 1, n, 1, grassC[1]);
        for (let x = 1; x < n; x += 3) if ((x * 7) % 5 < 2) X.put(g, x, soil - 3, grassC[2]);   // blades of grass
        for (const q of tips) X.put(g, q.x, q.y, WHITE);
        for (const c of caps) {
          c.h = rest ? Math.max(0, c.h - 0.25) : Math.min(c.max, c.h + 0.05);
          const h = c.h | 0; X.rect(g, c.x, soil - 2 - h, 2, h, X.rgb(236, 226, 200));
          if (h > 1) { const w = 2 + h, cc = glow ? X.mixPk(c.c, X.rgb(150, 255, 230), 0.5) : c.c; X.rect(g, c.x + 1 - w / 2, soil - 3 - h, w, 2, cc); X.rect(g, c.x + 2 - w / 2, soil - 4 - h, w - 2, 1, cc); X.put(g, c.x, soil - 3 - h, WHITE); }
        }
      };
    },
  });

  add({
    name: 'Sugarscape', seed: 8, sizes: [80, 100], fps: 10,
    interactive: 'Click to raise a new hill of sugar.',
    recipe: 'Grazers on one to three hills of sugar (or grass, candy or ice). Each one looks as far as it can see, walks to the richest free cell and eats; it grows back slowly, and the herds settle into restless rings on the slopes. Click to raise a new hill.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, N = n * n, cap = new Float32Array(N), sug = new Float32Array(N), who = new Int16Array(N).fill(-1), ramp = X.rampPk([X.rgb(30, 20, 10), X.rgb(140, 90, 20), X.rgb(250, 210, 90)], 8), tint = X.inks(R, 3, 0.6);
      const hills = [[R.range(0.2, 0.4), R.range(0.6, 0.8)], [R.range(0.6, 0.8), R.range(0.2, 0.4)]];
      g.trait('Field', 'Sugar'); g.trait('Hills', 2); const herd = g.trait('Grazers', vary(g, [['Herd', 3], ['Crowd', 1.3], ['Few', 1.3]])), herdK = herd === 'Crowd' ? 0.06 : herd === 'Few' ? 0.018 : 0.035; g.trait('Palette', inkName(tint));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let v = 0; for (const [hx, hy] of hills) v = Math.max(v, 1 - Math.hypot(x / n - hx, y / n - hy) * 2.4); cap[y * n + x] = sug[y * n + x] = Math.max(0, Math.ceil(v * 4)) / 4; }
      const pend = [], ag = Array.from({ length: Math.floor(N * herdK) }, (_, k) => { let i; do { i = R.int(0, N - 1); } while (who[i] >= 0); who[i] = k; return { i, vis: R.int(1, 5), met: R.range(0.1, 0.4), s: R.range(1, 4), c: tint[R.int(0, 2)] }; });
      return () => {
        // taps queue up and raise at most four hills a frame, so a replayed burst never stalls the piece
        for (const tp of g.input.taps()) if (pend.length < 64) pend.push(tp);
        for (let q = 0; q < 4 && pend.length; q++) { const tp = pend.shift(); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = Math.max(0, Math.ceil((1 - Math.hypot(x / n - tp.x, y / n - tp.y) * 3.2) * 4)) / 4; if (v > cap[y * n + x]) cap[y * n + x] = sug[y * n + x] = v; } }
        for (let i = 0; i < N; i++) sug[i] = Math.min(cap[i], sug[i] + 0.04);
        for (const a of R.shuffle(ag.slice())) {
          if (a.i < 0) continue;
          const x = a.i % n, y = (a.i / n) | 0; let best = a.i, bv = sug[a.i];
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let k = 1; k <= a.vis; k++) { const xx = (x + dx * k + n) % n, yy = (y + dy * k + n) % n, j = yy * n + xx; if (who[j] < 0 && sug[j] > bv) { bv = sug[j]; best = j; } }
          if (best !== a.i) { who[best] = who[a.i]; who[a.i] = -1; a.i = best; }
          a.s += sug[a.i] - a.met; sug[a.i] = 0;
          if (a.s < 0) { let j; do { j = R.int(0, N - 1); } while (who[j] >= 0); who[j] = who[a.i]; who[a.i] = -1; a.i = j; a.s = R.range(2, 4); }
        }
        for (let i = 0; i < N; i++) d[i] = ramp[Math.min(7, (sug[i] * 7.99) | 0)];
        for (const a of ag) d[a.i] = a.c;
      };
    }, function alt(R, U, g) {
      const RAMPS = [[[30, 20, 10], [140, 90, 20], [250, 210, 90]], [[16, 30, 14], [50, 120, 40], [170, 230, 90]], [[40, 14, 34], [190, 60, 140], [255, 190, 230]], [[10, 20, 40], [60, 120, 190], [210, 240, 255]]];
      const { n, d } = g, N = n * n, cap = new Float32Array(N), sug = new Float32Array(N), who = new Int16Array(N).fill(-1), rp = R.pick(RAMPS), ramp = X.rampPk(rp.map(c => X.rgb(c[0], c[1], c[2])), 8), tint = X.inks(R, 3, 0.6);
      const hills = Array.from({ length: R.pick([1, 2, 2, 3]) }, () => [R.range(0.2, 0.8), R.range(0.2, 0.8)]);
      g.trait('Field', ['Sugar', 'Grass', 'Candy', 'Ice'][RAMPS.indexOf(rp)]); g.trait('Hills', hills.length); const herd = g.trait('Grazers', vary(g, [['Herd', 3], ['Crowd', 1.3], ['Few', 1.3]])), herdK = herd === 'Crowd' ? 0.06 : herd === 'Few' ? 0.018 : 0.035; g.trait('Palette', inkName(tint));
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let v = 0; for (const [hx, hy] of hills) v = Math.max(v, 1 - Math.hypot(x / n - hx, y / n - hy) * 2.4); cap[y * n + x] = sug[y * n + x] = Math.max(0, Math.ceil(v * 4)) / 4; }
      const pend = [], ag = Array.from({ length: Math.floor(N * herdK) }, (_, k) => { let i; do { i = R.int(0, N - 1); } while (who[i] >= 0); who[i] = k; return { i, vis: R.int(1, 5), met: R.range(0.1, 0.4), s: R.range(1, 4), c: tint[R.int(0, 2)] }; });
      return () => {
        // taps queue up and raise at most four hills a frame, so a replayed burst never stalls the piece
        for (const tp of g.input.taps()) if (pend.length < 64) pend.push(tp);
        for (let q = 0; q < 4 && pend.length; q++) { const tp = pend.shift(); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = Math.max(0, Math.ceil((1 - Math.hypot(x / n - tp.x, y / n - tp.y) * 3.2) * 4)) / 4; if (v > cap[y * n + x]) cap[y * n + x] = sug[y * n + x] = v; } }
        for (let i = 0; i < N; i++) sug[i] = Math.min(cap[i], sug[i] + 0.04);
        for (const a of R.shuffle(ag.slice())) {
          if (a.i < 0) continue;
          const x = a.i % n, y = (a.i / n) | 0; let best = a.i, bv = sug[a.i];
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let k = 1; k <= a.vis; k++) { const xx = (x + dx * k + n) % n, yy = (y + dy * k + n) % n, j = yy * n + xx; if (who[j] < 0 && sug[j] > bv) { bv = sug[j]; best = j; } }
          if (best !== a.i) { who[best] = who[a.i]; who[a.i] = -1; a.i = best; }
          a.s += sug[a.i] - a.met; sug[a.i] = 0;
          if (a.s < 0) { let j; do { j = R.int(0, N - 1); } while (who[j] >= 0); who[j] = who[a.i]; who[a.i] = -1; a.i = j; a.s = R.range(2, 4); }
        }
        for (let i = 0; i < N; i++) d[i] = ramp[Math.min(7, (sug[i] * 7.99) | 0)];
        for (const a of ag) d[a.i] = a.c;
      };
    }),
  });

  add({
    name: 'Fireflies', seed: 9, sizes: [100, 200], fps: 12,
    recipe: 'A meadow at night full of fireflies, each on its own clock. Every flash nudges the neighbours’ clocks forward, and over a minute the field falls into step and pulses together.',
    make(R, U, g) {
      const { n, d } = g, M = n >= 200 ? 160 : 70, flies = Array.from({ length: M }, () => ({ x: R() * n, y: R.range(n * 0.25, n * 0.95), ph: R(), w: R.range(0.95, 1.05), lit: 0 })), glow = X.hsbPk(R.range(14, 30), 70, 100);
      const grass = new Float32Array(n).map(() => R.range(0.02, 0.18)), nz = U.noise(R).n2;
      let reset = 0;
      return (t, dt) => {
        reset += dt; if (reset > 70) { reset = 0; for (const f of flies) f.ph = R(); }
        for (let y = 0; y < n; y++) d.fill(X.mixPk(X.rgb(4, 6, 20), X.rgb(16, 24, 46), y / n), y * n, y * n + n);
        for (let x = 0; x < n; x++) { const top = n - n * grass[x] - 2 * nz(x * 0.2, t * 0.3); for (let y = Math.max(0, top | 0); y < n; y++) d[y * n + x] = X.rgb(6, 18 + ((x * 7) % 5), 10); }
        for (const f of flies) {
          f.ph += dt * 0.5 * f.w; f.lit *= 0.82;
          if (f.ph >= 1) { f.ph -= 1; f.lit = 1; for (const o of flies) if (o !== f && Math.abs(o.x - f.x) + Math.abs(o.y - f.y) < n * 0.3) o.ph = Math.min(1, o.ph + 0.035); }
          f.x += Math.sin(t * 0.7 + f.y) * 0.15; f.y += Math.cos(t * 0.5 + f.x) * 0.1;
          if (f.lit > 0.1) { X.put(g, f.x, f.y, X.mixPk(X.rgb(20, 30, 20), WHITE, f.lit)); for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) X.put(g, f.x + a, f.y + b, X.mixPk(X.rgb(10, 16, 30), glow, f.lit * 0.8)); }
          else X.put(g, f.x, f.y, X.rgb(40, 44, 30));
        }
      };
    },
  });

  add({
    name: 'Woodpile', seed: 10, sizes: [80, 100], fps: 12,
    recipe: 'Termites tidying a clearing: each wanders at random, picks up a wood chip that lies on its own and drops what it carries where chips are crowded. With no plan, stray chips vanish into a few growing piles.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, chip = new Uint8Array(N), wood = R.pick([[236, 200, 140], [210, 150, 100], [240, 220, 180]]), inks = [0.75, 0.85, 0.95, 1.05].map(k => X.rgb(wood[0] * k, wood[1] * k, wood[2] * k)), ground = X.rgb(46, 34, 26);
      const nz = U.noise(R).n2, scatter = () => { for (let i = 0; i < N; i++) { const v = nz((i % n) * 0.09, ((i / n) | 0) * 0.09); chip[i] = v > 0.3 ? (R() < 0.9 ? R.int(1, 4) : 0) : R() < 0.015 ? R.int(1, 4) : 0; } };
      scatter();
      const bugs = Array.from({ length: Math.floor(N * 0.02) }, () => ({ x: R.int(0, n - 1), y: R.int(0, n - 1), carry: 0 }));
      let clock = 0;
      return () => {
        if (++clock > 3600) { clock = 0; scatter(); for (const b of bugs) b.carry = 0; }
        for (let s = 0; s < 45; s++) for (const b of bugs) {
          b.x = (b.x + R.int(-1, 1) + n) % n; b.y = (b.y + R.int(-1, 1) + n) % n;
          const i = b.y * n + b.x;
          let k = 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) if (chip[((b.y + dy + n) % n) * n + (b.x + dx + n) % n]) k++;
          if (!b.carry && chip[i] && k <= 2 && R() < 0.9 - k * 0.3) { b.carry = chip[i]; chip[i] = 0; }
          else if (b.carry && !chip[i] && k >= 3 && R() < 0.3 + k * 0.1) { chip[i] = b.carry; b.carry = 0; }
        }
        for (let i = 0; i < N; i++) { if (!chip[i]) { d[i] = X.dith4(i % n, (i / n) | 0) < 0.08 ? X.shade(ground, 1.2) : ground; continue; } const x = i % n, y = (i / n) | 0; let k = 0; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (chip[((y + b + n) % n) * n + (x + a + n) % n]) k++; d[i] = X.shade(inks[chip[i] - 1], 0.55 + k * 0.12); }
        for (const b of bugs) d[b.y * n + b.x] = b.carry ? X.rgb(255, 120, 60) : X.rgb(120, 60, 40);
      };
    },
  });
})();
