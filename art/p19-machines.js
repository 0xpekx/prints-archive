// Set 2 · Machines: computers and contraptions shown working, one cell per part.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];   // N E S W, bit k = 1 << k

  P.addPixel({
    name: 'Plumbing', fam: 'Machines', sizes: [80, 100], fps: 12,
    interactive: 'Click a pipe to turn it; leave it and the board solves itself.',
    recipe: 'A board of scrambled pipe pieces in copper, steel or brass. One by one they turn into place, and water, lava or slime from the source runs along every pipe that now connects, until the whole tree of pipes is full.',
    make(R, U, g) {
      const { n } = g, T = n === 100 ? 10 : 8, hex = X.PIX.hex;
      // the original grey pipes on the opening variation and at least half the rolls; copper, steel or brass otherwise
      if (g.home || g.alt() < 0.5) {
        const inks = X.inks(R, 4, 0.4), FL = [0xfff0a030, 0xffe0e040, 0xff60f080, inks[0]], water = R.pick(FL);
        g.trait('Pipes', 'Steel'); g.trait('Fluid', ['Water', 'Aqua', 'Slime', 'Ink'][FL.indexOf(water)]);
        return board([0xff3a3a3a, 0xff8a8a8a, 0xffc4c4c4], water, 0xff1a1a1a, 0xff222222, true);
      }
      const MS = [['#3a2410', '#b5662a', '#f0a868'], ['#26262e', '#7a7a8a', '#d0d0dc'], ['#3a2e0a', '#a8862a', '#f0d070']], m0 = R.pick(MS), METAL = m0.map(hex), FS = ['#29adff', '#ff6a1a', '#9dff00', '#ff77a8'], f0 = R.pick(FS);
      g.trait('Pipes', ['Copper', 'Polished steel', 'Brass'][MS.indexOf(m0)]); g.trait('Fluid', ['Water', 'Lava', 'Slime', 'Syrup'][FS.indexOf(f0)]);
      return board(METAL, hex(f0), hex('#16161c'), hex('#1e1e26'), false);
      function board(METAL, water, floorA, floorB, og) {
        g.trait('Grid', n);
        // the order the pieces turn (scattered, outward from the source, or sweeping row by row), the bore of the pipe, and the floor
        const solve = X.VG.pick(g, 'Solving', 'Scattered', ['Scattered', 'Scattered', 'Outward', 'Row by row']), bore = X.VG.pick(g, 'Bore', 'Standard', ['Standard', 'Standard', 'Narrow', 'Wide']), floorK = X.VG.pick(g, 'Floor', 'Tiles', ['Tiles', 'Tiles', 'Plate', 'Bricks']);
        const { d } = g, M = n / T, inp = g.input, edgeC = METAL[0], pipeC = METAL[1], hiC = METAL[2], waterHi = X.mixPk(water, WHITE, 0.4), waterLo = X.shade(water, 0.78), glint = X.mixPk(water, WHITE, 0.7);
        let bits, rot, order, k, fill, src, hold, idle = 99, fade = 0;
        const old = new Uint32Array(n * n), dist = new Int16Array(M * M), q = new Int32Array(M * M);
        const rotb = (b, r) => ((b << r) | (b >> (4 - r))) & 15;
        const make = () => {
          bits = new Uint8Array(M * M); rot = new Uint8Array(M * M);
          const seen = new Uint8Array(M * M), st = [R.int(0, M * M - 1)]; seen[st[0]] = 1;
          while (st.length) {
            const i = st[st.length - 1], x = i % M, y = i / M | 0, opts = [];
            for (let k2 = 0; k2 < 4; k2++) { const xx = x + DIRS[k2][0], yy = y + DIRS[k2][1]; if (xx >= 0 && yy >= 0 && xx < M && yy < M && !seen[yy * M + xx]) opts.push(k2); }
            if (!opts.length) { st.pop(); continue; }
            const k2 = R.pick(opts), j = (y + DIRS[k2][1]) * M + x + DIRS[k2][0];
            bits[i] |= 1 << k2; bits[j] |= 1 << ((k2 + 2) % 4); seen[j] = 1; st.push(j);
          }
          for (let i = 0; i < M * M; i++) rot[i] = R.int(0, 3);
          order = R.shuffle(Array.from({ length: M * M }, (_, i) => i)); k = 0; fill = new Float32Array(M * M).fill(-1); src = R.int(0, M * M - 1); hold = 0;
          if (solve === 'Outward') { const sx = src % M, sy = src / M | 0; order.sort((a, b) => Math.abs(a % M - sx) + Math.abs((a / M | 0) - sy) - Math.abs(b % M - sx) - Math.abs((b / M | 0) - sy)); }
          else if (solve === 'Row by row') order.sort((a, b) => a - b);
        };
        make();
        const cur = i => rotb(bits[i], (4 - rot[i]) % 4);
        return (t, dt, f) => {
          for (const tap of inp.taps()) { const i = Math.min(M - 1, Math.floor(tap.y * M)) * M + Math.min(M - 1, Math.floor(tap.x * M)); rot[i] = (rot[i] + 3) % 4; idle = 0; }
          idle += dt || 0;
          if (idle > 4 && k < order.length) { rot[order[k]] = 0; k++; }
          else if (idle > 4 && f % 3 === 0) { const i = rot.findIndex(v => v); if (i >= 0) rot[i] = 0; }
          // flow: breadth-first from the source over pipes that meet
          dist.fill(-1); dist[src] = 0; q[0] = src;
          let qn = 1;
          for (let h = 0; h < qn; h++) { const i = q[h], x = i % M, y = i / M | 0, b = cur(i); for (let k2 = 0; k2 < 4; k2++) if (b >> k2 & 1) { const xx = x + DIRS[k2][0], yy = y + DIRS[k2][1]; if (xx < 0 || yy < 0 || xx >= M || yy >= M) continue; const j = yy * M + xx; if (dist[j] < 0 && (cur(j) >> ((k2 + 2) % 4) & 1)) { dist[j] = dist[i] + 1; q[qn++] = j; } } }
          for (let i = 0; i < M * M; i++) { if (dist[i] >= 0) fill[i] = Math.min(dist[i] + 1, Math.max(fill[i], 0) + 0.25); else fill[i] = -1; }
          // a full board is kept a few seconds, then the next one dissolves in over the last
          if (qn === M * M && (!og || k >= order.length) && ++hold > 60) { old.set(d); fade = 12; make(); }
          if (floorK === 'Tiles') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((x / T | 0) + (y / T | 0)) & 1 ? floorA : floorB;
          else if (floorK === 'Plate') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = (x + y) % 4 === 0 && (x - y + 400) % 8 === 0 ? X.mixPk(floorB, WHITE, 0.12) : floorA;
          else for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y % 4 === 3 || (x + ((y >> 2) & 1) * 4) % 8 === 0 ? X.shade(floorA, 0.6) : X.mixPk(floorB, 0xff20304a, 0.4);
          const w = Math.max(2, Math.round(T * 0.3) + (bore === 'Wide' ? 1 : bore === 'Narrow' ? -1 : 0)), c = T / 2;
          for (let i = 0; i < M * M; i++) {
            const x0 = (i % M) * T, y0 = (i / M | 0) * T, b = cur(i), wet = dist[i] >= 0 && fill[i] >= dist[i];
            for (let k2 = 0; k2 < 4; k2++) {
              if (!(b >> k2 & 1)) continue;
              // which way the water runs along this arm, for the glints that travel with it
              const xx = (i % M) + DIRS[k2][0], yy = (i / M | 0) + DIRS[k2][1], out = xx >= 0 && yy >= 0 && xx < M && yy < M && dist[yy * M + xx] === dist[i] + 1;
              for (let s2 = 0; s2 <= c; s2++) for (let q2 = -w; q2 <= w; q2++) {
                const along = c + DIRS[k2][0] * s2 + (k2 % 2 ? 0 : q2), across = c + DIRS[k2][1] * s2 + (k2 % 2 ? q2 : 0);
                let col;
                if (Math.abs(q2) === w) col = edgeC;
                else if (wet) { const ph = dist[i] * T + (out ? c + s2 : c - s2); col = q2 === -w + 1 ? waterHi : q2 === w - 1 ? waterLo : ((ph - f * 2) % 9 + 9) % 9 < 1.5 && q2 === 0 ? glint : water; }
                else col = q2 === -w + 1 ? hiC : q2 === w - 1 && w > 2 ? X.mixPk(pipeC, edgeC, 0.35) : pipeC;
                const px = x0 + Math.min(T - 1, Math.floor(along)), py = y0 + Math.min(T - 1, Math.floor(across));
                if (px >= 0 && py >= 0 && px < n && py < n) d[py * n + px] = col;
              }
            }
            if (i === src) { X.rect(g, x0 + c - 2, y0 + c - 2, 4, 4, WHITE); X.rect(g, x0 + c - 1, y0 + c - 1, 2, 2, water); }
          }
          if (fade > 0) { const p = 1 - fade / 12; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (X.dith8(x, y) > p) d[y * n + x] = old[y * n + x]; fade--; }
        };
      }
    },
  });

  P.addPixel({
    name: 'Factory', fam: 'Machines', sizes: [80, 100], fps: 12,
    recipe: 'A loop of conveyor belts seen from above. Raw parts drop from a hopper, pass under a sprayer that paints them, a press that stamps them, a vat that dips them and a boxer that packs them, and the finished goods tumble into a crate.',
    make(R, U, g) {
      const { n, d } = g, T = 5, M = n / T, sc = X.PIX.scheme(R, ['Sweetie', 'Pico', 'Ember', 'Dusk', 'Ice']), hex = X.PIX.hex;
      // a rectangular loop with a random inset on each side
      const x0 = R.int(2, 4), y0 = R.int(2, 4), x1 = M - 1 - R.int(2, 4), y1 = M - 1 - R.int(2, 4), path = [];
      for (let x = x0; x < x1; x++) path.push([x, y0]);
      for (let y = y0; y < y1; y++) path.push([x1, y]);
      for (let x = x1; x > x0; x--) path.push([x, y1]);
      for (let y = y1; y > y0; y--) path.push([x0, y]);
      const L = path.length, kinds = R.shuffle(['paint', 'press', 'vat', 'box']);
      const slots = [0.18, 0.4, 0.62, 0.82].map(u => Math.round(u * L));
      const machines = kinds.map((kind, k) => ({ p: slots[k], kind, ramp: sc.ramps[k % sc.ramps.length] }));
      const items = [], crate = [];
      const belt = hex('#3a3a46'), beltLine = hex('#5a5a6e'), floor = sc.ground[0], tile = sc.ground[1], steel = [hex('#3a3a46'), hex('#7a7a8a'), hex('#c4c4d0')];
      const side = ([px, py]) => (py === y0 ? [0, -1] : py === y1 ? [0, 1] : px === x0 ? [-1, 0] : [1, 0]);
      // the finished crates are stacked on the floor inside the loop, row by row; when the floor is full
      // they are carried off one by one and the stacking starts again
      const ix0 = (x0 + 1) * T + 3, iy0 = (y0 + 1) * T + 3, cols = Math.max(1, Math.floor(((x1 - x0 - 1) * T - 4) / 8)), rowsS = Math.max(1, Math.floor(((y1 - y0 - 1) * T - 4) / 8)), store = [];
      let shipping = false;
      const wood = [hex('#4a2c1a'), hex('#7a4a2a'), hex('#b07a4a')];
      g.trait('Palette', sc.name); g.trait('Grid', n); g.trait('Hall', (x1 - x0) * (y1 - y0) > M * M * 0.45 ? 'Roomy' : 'Tight');
      // what the line makes, the floor of the hall, and the shift (night has pools of lamplight under the machines)
      const goods = X.VG.pick(g, 'Goods', 'Blocks', ['Blocks', 'Blocks', 'Bottles', 'Discs']), floorK = X.VG.pick(g, 'Floor', 'Tiles', ['Tiles', 'Tiles', 'Plates', 'Walkways']), shift = X.VG.pick(g, 'Shift', 'Day', ['Day', 'Day', 'Night']);
      const night = shift === 'Night', floorD = night ? X.shade(floor, 0.55) : floor, tileD = night ? X.shade(tile, 0.55) : tile, FLR = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let c = floorD;
        if (floorK === 'Tiles') { if (x % 10 === 0 || y % 10 === 0) c = tileD; }
        else if (floorK === 'Plates') { if ((x + y) % 4 === 0 && (x - y + 400) % 8 === 0) c = tileD; }
        else if (y % 12 < 2 && (x >> 2) % 2 === 0) c = X.mixPk(floorD, hex('#ffd000'), night ? 0.25 : 0.45);
        FLR[y * n + x] = c;
      }
      if (night) for (const m of machines) { const [px, py] = path[m.p], [sx, sy] = side(path[m.p]), cx = px * T + 2 + sx * 4, cy = py * T + 2 + sy * 4; for (let y = Math.max(0, cy - 14); y < Math.min(n, cy + 14); y++) for (let x = Math.max(0, cx - 14); x < Math.min(n, cx + 14); x++) { const r = Math.hypot(x - cx, y - cy) / 14; if (r < 1 && X.dith4(x, y) < (1 - r) * 0.9) FLR[y * n + x] = X.mixPk(FLR[y * n + x], m.ramp[2], 0.28); } }
      const sim = f => {
        if (f % 8 === 0) items.push({ s: 0, c: steel[1], shape: 0, dip: 0 });
        for (const it of items) {
          it.s += 0.3;
          const cell = Math.floor(it.s), m = machines.find(mm => mm.p === cell);
          if (m && it.at !== cell) { it.at = cell; if (m.kind === 'paint') it.c = m.ramp[1]; else if (m.kind === 'press') it.shape = 1; else if (m.kind === 'vat') it.dip = 1; else it.shape = 2; }
        }
        for (let k = items.length - 1; k >= 0; k--) if (items[k].s >= L - 1) { crate.push(items[k].c); items.splice(k, 1); if (crate.length >= 9) { store.push(crate[4]); crate.length = 0; } }
        if (store.length >= cols * rowsS) shipping = true;
        if (shipping && f % 3 === 0) { store.shift(); if (!store.length) shipping = false; }
      };
      // the line is already running, goods spread along the whole belt, when the piece opens
      const WARM = Math.ceil(L / 0.3) + 8;
      for (let k = 0; k < WARM; k++) sim(k);
      return (t, dt, f) => {
        sim(f + WARM);
        d.set(FLR);
        // hazard stripes round the line
        for (let x = x0 * T - 2; x < (x1 + 1) * T + 2; x++) for (const y of [y0 * T - 2, (y1 + 1) * T + 1]) X.put(g, x, y, ((x + y) >> 1) & 1 ? hex('#ffd000') : BLACK);
        path.forEach(([px, py], i) => {
          const [nx, ny] = path[(i + 1) % L], dx = nx - px, dy = ny - py;
          X.rect(g, px * T, py * T, T, T, belt);
          for (let k = 0; k < T; k++) { const ph = (k + Math.floor(t * 6)) % T; if (ph === 0) { if (dx) X.rect(g, px * T + (dx > 0 ? k : T - 1 - k), py * T, 1, T, beltLine); else X.rect(g, px * T, py * T + (dy > 0 ? k : T - 1 - k), T, 1, beltLine); } }
        });
        // hopper at the start: a funnel feeding the belt
        { const [px, py] = path[0], [sx, sy] = side(path[0]), hx = px * T + sx * T * 2 - 2, hy = py * T + sy * T * 2 - 2;
          for (let k = 0; k < 9; k++) { const w = 9 - k; X.rect(g, hx + 2 + (k >> 1) - 2, hy + k - 2, w, 1, k === 0 ? steel[2] : k > 6 ? steel[0] : steel[1]); }
          if ((f >> 2) & 1) X.rect(g, hx + 3, hy + 1, 2, 2, steel[2]); }
        // the crate at the end
        { const [px, py] = path[L - 1], [sx, sy] = side(path[L - 1]), cx = px * T + sx * T * 2 - 2, cy = py * T + sy * T * 2 - 2;
          X.rect(g, cx - 1, cy - 1, 10, 10, hex('#4a2c1a')); X.rect(g, cx, cy, 8, 8, hex('#7a4a2a')); X.rect(g, cx, cy + 3, 8, 1, hex('#4a2c1a'));
          crate.forEach((c, k) => X.rect(g, cx + 1 + (k % 3) * 2, cy + 1 + Math.floor(k / 3) * 2, 2, 2, c)); }
        // the stacked crates: a lid line, a lit top edge and the colour of the goods inside on a label
        store.forEach((c, k) => { const sx = ix0 + (k % cols) * 8, sy = iy0 + Math.floor(k / cols) * 8; X.rect(g, sx, sy, 7, 7, wood[0]); X.rect(g, sx + 1, sy + 1, 5, 5, wood[1]); X.rect(g, sx + 1, sy + 1, 5, 1, wood[2]); X.rect(g, sx + 2, sy + 3, 3, 2, c); X.put(g, sx + 7, sy + 7, X.shade(floor, 0.6)); });
        for (const m of machines) {
          const [px, py] = path[m.p], [sx, sy] = side(path[m.p]), cx = px * T + 2, cy = py * T + 2, r = m.ramp, beat = (f >> 1) & 3;
          // a housing beside the belt and an arm over it
          const hx = cx + sx * 7 - 4, hy = cy + sy * 7 - 4;
          X.rect(g, hx - 1, hy - 1, 10, 10, BLACK); X.rect(g, hx, hy, 8, 8, r[1]); X.rect(g, hx, hy, 8, 1, r[2]); X.rect(g, hx, hy, 1, 8, r[2]); X.rect(g, hx + 7, hy + 1, 1, 7, r[0]); X.rect(g, hx + 1, hy + 7, 7, 1, r[0]);
          if (m.kind === 'paint') { X.rect(g, hx + 2, hy + 2, 4, 4, r[2]); if (beat < 2) for (let k = 1; k <= 3; k++) X.put(g, cx - sx * k * 0 + (beat ? 1 : -1) * (k & 1), cy - sy * 0 + k - 2, r[2]); }
          else if (m.kind === 'press') { const down = beat === 0; X.rect(g, hx + 2, hy + 2, 4, 4, steel[0]); X.rect(g, cx - 2, cy - 2 + (down ? 1 : -1), 5, 2, steel[2]); }
          else if (m.kind === 'vat') { X.rect(g, hx + 1, hy + 3, 6, 4, hex('#1d2b53')); X.rect(g, hx + 1, hy + 3 + (beat & 1), 6, 1, hex('#29adff')); }
          else { X.rect(g, hx + 2, hy + 2, 4, 4, hex('#b07a4a')); X.rect(g, hx + 2, hy + 3, 4, 1, hex('#7a4a2a')); }
          if ((f >> 3) & 1) X.put(g, hx + 6, hy + 1, hex('#00e436')); else X.put(g, hx + 6, hy + 1, hex('#008751'));
        }
        for (const it of items) {
          const i = Math.floor(it.s), fr = it.s - i, [ax, ay] = path[i], [bx, by] = path[(i + 1) % L], x = Math.round((ax + (bx - ax) * fr) * T + 1), y = Math.round((ay + (by - ay) * fr) * T + 1);
          const c = it.c, hi = X.mixPk(c, WHITE, 0.45), lo = X.mixPk(c, BLACK, 0.4);
          if (it.shape === 2) { X.rect(g, x, y, 3, 3, hex('#b07a4a')); X.rect(g, x, y + 1, 3, 1, hex('#7a4a2a')); X.put(g, x + 1, y, c); }
          else if (goods === 'Bottles') { X.rect(g, x, y, 3, 3, it.shape ? lo : c); X.put(g, x + 1, y, hi); X.put(g, x + 1, y + 1, it.shape ? c : hi); X.put(g, x, y, BLACK); X.put(g, x + 2, y, BLACK); }
          else if (goods === 'Discs') { X.rect(g, x, y + 1, 3, 1, c); X.put(g, x + 1, y, it.shape ? hi : c); X.put(g, x + 1, y + 2, lo); if (it.shape) X.put(g, x + 1, y + 1, lo); }
          else if (it.shape === 1) { X.rect(g, x, y, 3, 3, lo); X.put(g, x + 1, y + 1, hi); X.put(g, x, y, c); X.put(g, x + 2, y + 2, c); }
          else { X.rect(g, x, y, 3, 3, c); X.put(g, x, y, hi); X.put(g, x + 2, y + 2, lo); }
          if (it.dip) X.put(g, x + 2, y, hex('#c4fbff'));
        }
      };
    },
  });

  P.addPixel({
    name: 'Learning', fam: 'Machines', sizes: [50, 80], fps: 10,
    recipe: 'A tiny neural network, like the ones in Axons, taught live: each frame it sees a few hundred points of a target picture and nudges its weights, and its guess sharpens from fog.',
    make(R, U, g) {
      const { n, d } = g, inks = X.VG.inksN(R, 3, 0.45);
      // how big the network is, what it is given to look at besides its position, and how its guess is printed
      const net = X.VG.pick(g, 'Network', 'Small', ['Small', 'Small', 'Tiny', 'Wide']), H1 = net === 'Tiny' ? 6 : net === 'Wide' ? 20 : 12, H2 = net === 'Tiny' ? 5 : 10;
      const feat = X.VG.pick(g, 'Senses', 'Waves', ['Waves', 'Waves', 'Position only', 'Ripples']), FQ = feat === 'Ripples' ? 14 : 6, FA = feat === 'Position only' ? 0 : 1;
      const look = X.VG.pick(g, 'Print', 'Dithered', ['Dithered', 'Dithered', 'Flat', 'Contours']);
      g.trait('Palette', inks.name); g.trait('Grid', n);
      let kindName = '';
      // three inks too close in value would make the lesson unreadable: spread the darkest and lightest apart
      { const ord = [0, 1, 2].sort((a, b) => X.lum(inks[a]) - X.lum(inks[b])); if (X.lum(inks[ord[2]]) - X.lum(inks[ord[0]]) < 0.3) { inks[ord[0]] = X.shade(inks[ord[0]], 0.5); inks[ord[2]] = X.mixPk(inks[ord[2]], WHITE, 0.3); } }
      let W1, B1, W2, B2, W3, B3, target, age, lesson = 0, fade = 0;
      const tgt = () => {
        const kind = R.int(0, 3), k = R.int(2, 4), cs = Array.from({ length: k }, () => [R.range(0.2, 0.8), R.range(0.2, 0.8)]), turns = R.range(1.5, 3);
        if (!kindName) { kindName = ['Spiral', 'Cells', 'Checks', 'Waves'][kind]; g.trait('First lesson', kindName); }
        return (u, v) => {
          if (kind === 0) { const r = Math.hypot(u - 0.5, v - 0.5), a = Math.atan2(v - 0.5, u - 0.5); return ((Math.floor((a / U.TAU + r * turns) * k) % k) + k) % k; }
          if (kind === 1) { let b = 0, bd = 9; cs.forEach(([x, y], i) => { const dd = Math.hypot(u - x, v - y); if (dd < bd) { bd = dd; b = i; } }); return b % 3; }
          if (kind === 2) return (Math.floor(u * 4) + Math.floor(v * 4)) % 3;
          return Math.floor(((Math.sin(u * 9) + Math.cos(v * 7)) * 0.25 + 0.5) * 3) % 3;
        };
      };
      const init = () => {
        const w = (a, b) => Array.from({ length: a * b }, () => R.gauss() * Math.sqrt(2 / b));
        W1 = w(H1, 4); B1 = new Float64Array(H1); W2 = w(H2, H1); B2 = new Float64Array(H2); W3 = w(3, H2); B3 = new Float64Array(3); target = tgt(); age = 0;
      };
      init();
      const h1 = new Float64Array(H1), h2 = new Float64Array(H2), o = new Float64Array(3), xin = new Float64Array(4), g1 = new Float64Array(H1), g2 = new Float64Array(H2), g3 = new Float64Array(3);
      const fwd = (u, v, su, cv) => {
        xin[0] = u * 2 - 1; xin[1] = v * 2 - 1; xin[2] = su; xin[3] = cv;
        for (let j = 0; j < H1; j++) { let s = B1[j]; for (let i = 0; i < 4; i++) s += W1[j * 4 + i] * xin[i]; h1[j] = Math.tanh(s); }
        for (let j = 0; j < H2; j++) { let s = B2[j]; for (let i = 0; i < H1; i++) s += W2[j * H1 + i] * h1[i]; h2[j] = Math.tanh(s); }
        let mx = -1e9; for (let j = 0; j < 3; j++) { let s = B3[j]; for (let i = 0; i < H2; i++) s += W3[j * H2 + i] * h2[i]; o[j] = s; mx = Math.max(mx, s); }
        let z = 0; for (let j = 0; j < 3; j++) { o[j] = Math.exp(o[j] - mx); z += o[j]; } for (let j = 0; j < 3; j++) o[j] /= z;
      };
      const train = (u, v, y, lr) => {
        fwd(u, v, FA * Math.sin(u * FQ), FA * Math.cos(v * FQ));
        g3[0] = o[0] - (y === 0); g3[1] = o[1] - (y === 1); g3[2] = o[2] - (y === 2);
        for (let i = 0; i < H2; i++) { let s = 0; for (let j = 0; j < 3; j++) s += W3[j * H2 + i] * g3[j]; g2[i] = s * (1 - h2[i] * h2[i]); }
        for (let i = 0; i < H1; i++) { let s = 0; for (let j = 0; j < H2; j++) s += W2[j * H1 + i] * g2[j]; g1[i] = s * (1 - h1[i] * h1[i]); }
        for (let j = 0; j < 3; j++) { for (let i = 0; i < H2; i++) W3[j * H2 + i] -= lr * g3[j] * h2[i]; B3[j] -= lr * g3[j]; }
        for (let j = 0; j < H2; j++) { for (let i = 0; i < H1; i++) W2[j * H1 + i] -= lr * g2[j] * h1[i]; B2[j] -= lr * g2[j]; }
        for (let j = 0; j < H1; j++) { for (let i = 0; i < 4; i++) W1[j * 4 + i] -= lr * g1[j] * xin[i]; B1[j] -= lr * g1[j]; }
      };
      const cols = inks.map(X.unpk);
      // the guess is worked out on a coarser lattice (every second cell on the larger grid) and blended
      // between, which looks the same and costs a quarter
      const st = n > 50 ? 2 : 1, m = Math.floor((n - 1) / st) + 2, P0 = new Float32Array(m * m), P1 = new Float32Array(m * m), P2 = new Float32Array(m * m);
      const SU = Float64Array.from({ length: m }, (_, x) => FA * Math.sin(Math.min(1, (x * st + 0.5) / n) * FQ)), CV = Float64Array.from({ length: m }, (_, y) => FA * Math.cos(Math.min(1, (y * st + 0.5) / n) * FQ));
      const old = new Uint32Array(n * n);
      return (t, dt) => {
        // every fifteen seconds a new picture is set and the same network learns it, so one guess melts
        // into the next; every third lesson it starts again from fog, dissolving in over the last
        if ((age += dt) > 15) { lesson++; if (lesson % 3 === 0) { old.set(d); fade = 10; init(); } else { target = tgt(); age = 0; } }
        for (let k = 0; k < 300; k++) { const u = R(), v = R(); train(u, v, target(u, v), 0.05); }
        for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) { fwd(Math.min(1, (x * st + 0.5) / n), Math.min(1, (y * st + 0.5) / n), SU[x], CV[y]); const i = y * m + x; P0[i] = o[0]; P1[i] = o[1]; P2[i] = o[2]; }
        for (let y = 0; y < n; y++) {
          const fy = y / st, y0 = fy | 0, wy = fy - y0;
          for (let x = 0; x < n; x++) {
            const fx = x / st, x0 = fx | 0, wx = fx - x0, i = y0 * m + x0;
            const a = (P0[i] * (1 - wx) + P0[i + 1] * wx) * (1 - wy) + (P0[i + m] * (1 - wx) + P0[i + m + 1] * wx) * wy;
            const b = (P1[i] * (1 - wx) + P1[i + 1] * wx) * (1 - wy) + (P1[i + m] * (1 - wx) + P1[i + m + 1] * wx) * wy;
            const c = 1 - a - b, th = X.dith4(x, y);
            const r = a * cols[0][0] + b * cols[1][0] + c * cols[2][0], gg = a * cols[0][1] + b * cols[1][1] + c * cols[2][1], bb = a * cols[0][2] + b * cols[1][2] + c * cols[2][2];
            if (look === 'Dithered') d[y * n + x] = X.rgb(Math.min(255, Math.floor(r / 51 + th) * 51), Math.min(255, Math.floor(gg / 51 + th) * 51), Math.min(255, Math.floor(bb / 51 + th) * 51));
            else {
              const top = a > b ? (a > c ? 0 : 2) : (b > c ? 1 : 2), conf = Math.max(a, b, c);
              d[y * n + x] = look === 'Flat' ? (conf < 0.6 && th < 0.5 ? X.shade(inks[top], 0.7) : inks[top]) : conf < 0.5 ? X.shade(inks[top], 0.3) : X.mixPk(inks[top], WHITE, (conf - 0.5) * 0.3);
            }
          }
        }
        if (fade > 0) { const p = 1 - fade / 10; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (X.dith8(x, y) > p) d[y * n + x] = old[y * n + x]; fade--; }
        // the target in a corner, for comparison
        const s = Math.round(n / 5);
        X.rect(g, n - s - 2, 1, s + 2, s + 2, WHITE);
        for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) d[(2 + y) * n + n - s - 1 + x] = inks[target((x + 0.5) / s, (y + 0.5) / s)];
      };
    },
  });

  P.addPixel({
    name: 'Core War', seed: 2, fam: 'Machines', sizes: [50, 80], fps: 12,
    recipe: 'Small programs fighting inside one memory: each copies bombs over the others’ code or races through memory, and each cell shows whose instruction last wrote it, until one program is left.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, inks = X.VG.inksN(R, 5, 0.6);
      let core, owner, heat, procs, turn, clock;
      g.trait('Palette', inks.name); g.trait('Grid', n);
      // how the addresses are laid on the screen (rows, a snake, columns or a spiral), and what the empty memory looks like
      const lay = X.VG.pick(g, 'Memory map', 'Rows', ['Rows', 'Rows', 'Snake', 'Columns', 'Spiral']), empty = X.VG.pick(g, 'Empty memory', 'Checks', ['Checks', 'Checks', 'Black', 'Lines']);
      const POS = new Int32Array(N);
      if (lay === 'Spiral') { let x = 0, y = 0, dx = 1, dy = 0, x0 = 0, y0 = 0, x1 = n - 1, y1 = n - 1; for (let i = 0; i < N; i++) { POS[i] = y * n + x; if (dx === 1 && x === x1) { dx = 0; dy = 1; y0++; } else if (dy === 1 && y === y1) { dx = -1; dy = 0; x1--; } else if (dx === -1 && x === x0) { dx = 0; dy = -1; y1--; } else if (dy === -1 && y === y0) { dx = 1; dy = 0; x0++; } x += dx; y += dy; } }
      else for (let i = 0; i < N; i++) { const r = i / n | 0, c = i % n; POS[i] = lay === 'Snake' ? r * n + (r & 1 ? n - 1 - c : c) : lay === 'Columns' ? c * n + r : i; }
      const EMP = new Uint32Array(N);
      for (let i = 0; i < N; i++) { const x = i % n, y = i / n | 0; EMP[i] = empty === 'Black' ? 0xff0a0a0a : empty === 'Lines' ? (y % 2 ? 0xff101010 : 0xff1c1c1c) : (x + y) & 1 ? 0xff141414 : 0xff1a1a1a; }
      const ins = (op, am, a, bm, b) => ({ op, am, a, bm, b });
      const W = {
        imp: () => [ins('MOV', '$', 0, '$', 1)],
        dwarf: k => [ins('ADD', '#', k, '$', 3), ins('MOV', '$', 2, '@', 2), ins('JMP', '$', -2, '$', 0), ins('DAT', '#', 0, '#', 0)],
        swarm: () => [ins('SPL', '$', 2, '$', 0), ins('JMP', '$', -1, '$', 0), ins('MOV', '$', 0, '$', 1)],
        stone: k => [ins('MOV', '$', 3, '@', 3), ins('ADD', '#', k, '$', 2), ins('JMP', '$', -2, '$', 0), ins('DAT', '#', 0, '#', k)],
      };
      const reset = () => {
        core = Array.from({ length: N }, () => ins('DAT', '#', 0, '#', 0)); owner = new Int8Array(N).fill(-1); heat = new Float32Array(N); procs = []; turn = 0; clock = 0;
        const kinds = R.shuffle(['imp', 'dwarf', 'dwarf', 'swarm', 'stone', 'stone']).slice(0, R.int(3, 4));
        if (!g.traits.some(t => t[0] === 'Warriors')) g.trait('Warriors', kinds.map(k => k[0].toUpperCase() + k.slice(1)).join(', '));
        kinds.forEach((kind, w) => {
          const code = W[kind](R.pick([3, 4, 5, 7, 9, 11, 13])), at = Math.floor((w + R.range(0.1, 0.4)) * N / kinds.length);
          code.forEach((c, i) => { core[(at + i) % N] = c; owner[(at + i) % N] = w; });
          procs.push({ w, q: [at] });
        });
      };
      reset();
      const addr = (pc, mode, v) => (mode === '#' ? pc : mode === '$' ? (pc + v + N * 4) % N : (pc + v + core[(pc + v + N * 4) % N].b + N * 8) % N);
      const step = P2 => {
        if (!P2.q.length) return;
        const pc = P2.q.shift(), I = core[pc], A = addr(pc, I.am, I.a), B = addr(pc, I.bm, I.b);
        let next = (pc + 1) % N;
        if (I.op === 'DAT') return;
        if (I.op === 'MOV') { if (I.am === '#') core[B] = { ...core[B], b: I.a }; else core[B] = { ...core[A] }; owner[B] = P2.w; heat[B] = 1; }
        else if (I.op === 'ADD') { if (I.am === '#') core[B] = { ...core[B], b: core[B].b + I.a }; else core[B] = { ...core[B], a: core[B].a + core[A].a, b: core[B].b + core[A].b }; owner[B] = P2.w; heat[B] = 1; }
        else if (I.op === 'JMP') next = A;
        else if (I.op === 'SPL') { if (P2.q.length < 64) P2.q.push(A); }
        P2.q.push(next);
      };
      // a battle ends when one program is left, when one program's code covers nearly all of memory, or
      // after half a minute; the board is held a moment on the result, then the next battle dissolves in
      let hold = 0, fade = 0;
      const old = new Uint32Array(N), count = new Int32Array(8);
      const run = steps => {
        for (let k = 0; k < steps; k++) {
          let alive = 0; for (const p of procs) if (p.q.length) alive++;
          if (alive <= 1 || ++clock > 24000) { hold = 24; return; }
          step(procs[turn++ % procs.length]);
        }
        count.fill(0); let written = 0;
        for (let i = 0; i < N; i++) if (owner[i] >= 0) { count[owner[i]]++; written++; }
        if (written > N * 0.6 && Math.max(...count) > written * 0.88) hold = 24;
      };
      // the programs have already spread a little when the piece opens
      for (let k = 0; k < 30 && !hold; k++) run(60);
      return () => {
        if (hold > 0) { if (--hold === 0) { old.set(d); fade = 12; reset(); } }
        else run(60);
        for (let i = 0; i < N; i++) { heat[i] *= 0.92; const o = owner[i]; d[POS[i]] = o < 0 ? EMP[POS[i]] : heat[i] > 0.4 ? X.mixPk(inks[o % inks.length], WHITE, 0.35) : core[i].op === "DAT" ? X.shade(inks[o % inks.length], 0.4) : inks[o % inks.length]; }
        for (const p of procs) for (const pc of p.q) d[POS[pc]] = WHITE;
        if (fade > 0) { const p = 1 - fade / 12; for (let i = 0; i < N; i++) if (X.dith8(i % n, i / n | 0) > p) d[i] = old[i]; fade--; }
      };
    },
  });

  P.addPixel({
    name: 'Bytebeat', seed: 2, fam: 'Machines', sizes: [80, 100, 200], fps: 12, music: true,
    recipe: 'One-line music programs, where a counter t is bit-shifted and multiplied into a byte of sound at 8,000 samples a second, drawn as a picture: each row is the next run of samples, scrolling as the song plays. Unmute to hear the very samples on screen.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      // names the song and the weave, and rolls how the samples are laid out and inked; returns the drawing pass
      function traits(song, sc, W, n) {
        g.trait('Song', 'No. ' + (song + 1)); g.trait('Palette', X.VG.schemeName(sc)); g.trait('Weave', W); g.trait('Grid', n);
        const lay = X.VG.pick(g, 'Layout', 'Raster', ['Raster', 'Raster', 'Mirrored', 'Columns', 'Quilt']), ink = X.VG.pick(g, 'Ink', 'Full', ['Full', 'Full', 'Posterised', 'Bits']);
        const LUT = ink === 'Full' ? sc.lut : ink === 'Posterised' ? Uint32Array.from({ length: 256 }, (_, v) => sc.lut[((v >> 4) & 3) * 64 + 32]) : Uint32Array.from({ length: 256 }, (_, v) => v & 0x80 ? sc.lut[v & 0x7f | 0x40] : X.shade(sc.lut[(v * 2) & 255], 0.18));
        const XS = Int32Array.from({ length: n }, (_, x) => lay === 'Mirrored' ? Math.floor(Math.abs(x - n / 2 + 0.5) * 2 * W / n) : lay === 'Quilt' ? Math.floor((x % (n >> 1)) * 2 * W / n) : Math.floor(x * W / n));
        return (base, F, d) => {
          if (lay === 'Columns') { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = LUT[F(base + x * W + Math.floor(y * W / n)) & 255]; return; }
          for (let y = 0; y < n; y++) { const yy = lay === 'Quilt' ? y % (n >> 1) : y, row = base + yy * W; for (let x = 0; x < n; x++) d[y * n + x] = LUT[F(row + XS[x]) & 255]; }
        };
      }
      function og(R, U, g) {
      const { n, d } = g, FS = [
        t => t * (t >> 5 | t >> 8), t => (t * 5 & t >> 7) | (t * 3 & t >> 10), t => t * ((t >> 12 | t >> 8) & 63 & t >> 4), t => (t >> 6 | t | t >> (t >> 16)) * 10 + ((t >> 11) & 7),
        t => t * (t >> 11 & t >> 8 & 123 & t >> 3), t => (t & t >> 8) * (t >> 4 | t >> 8), t => t * (42 & t >> 10), t => (t >> 4) * (t >> 3) | t >> 2, t => t ^ t >> 4 | t >> 7, t => (t * 9 & t >> 4 | t * 5 & t >> 7 | t * 3 & t / 1024) - 1,
      ], F = R.pick(FS);
      const sc = U.scheme(R, 0.5), W = R.pick([128, 256, 256, 512]), rowsPer = R.pick([1, 2]);
      const VIEW = traits(FS.indexOf(F), sc, W, n);
      let base = R.int(0, 64) * W * 8;
      // sound: each frame plays the run of samples the picture scrolls past, at the
      // rate that makes it last exactly one frame (doubled up where that is too slow)
      const step = W * rowsPer, rate = step * 12, rep = Math.ceil(3000 / rate), buf = new Float32Array(step * rep);
      return (t, dt, f) => {
        if (g.sound.on) { for (let k = 0; k < step; k++) { const v = ((F(base + k) & 255) - 128) / 128; for (let r = 0; r < rep; r++) buf[k * rep + r] = v; } g.sound.pcm(buf, rate * rep, { vel: 0.45 }); }
        base += W * rowsPer;
        VIEW(base, F, d);
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, FS = [
        t => t * (t >> 5 | t >> 8), t => (t * 5 & t >> 7) | (t * 3 & t >> 10), t => t * ((t >> 12 | t >> 8) & 63 & t >> 4), t => (t >> 6 | t | t >> (t >> 16)) * 10 + ((t >> 11) & 7),
        t => t * (t >> 11 & t >> 8 & 123 & t >> 3), t => (t & t >> 8) * (t >> 4 | t >> 8), t => t * (42 & t >> 10), t => (t >> 4) * (t >> 3) | t >> 2, t => t ^ t >> 4 | t >> 7, t => (t * 9 & t >> 4 | t * 5 & t >> 7 | t * 3 & t / 1024) - 1,
        t => t * (t >> 9 | t >> 13) & 16, t => (t >> 7 | t | t >> 6) * 10 + 4 * (t & t >> 13 | t >> 6), t => t * ((t >> 9 | t >> 13) & 25 & t >> 6), t => (t * (t >> 8 | t >> 9) & 46 & t >> 8) ^ (t & t >> 13 | t >> 6),
      ], F = R.pick(FS);
      const sc = U.scheme(R, 0.5), W = R.pick([128, 256, 256, 512]), RATE = 8000, buf = new Float32Array(RATE);
      let base = R.int(0, 64) * W * 8;
      const VIEW = traits(FS.indexOf(F), sc, W, n);
      return (t, dt, f) => {
        // play exactly the samples the picture moves past
        const m = Math.max(1, Math.round(RATE * Math.min(0.12, dt || 1 / 12)));
        for (let k = 0; k < m; k++) buf[k] = ((F(base + k) & 255) - 128) / 128;
        g.sound.pcm(buf.subarray(0, m), RATE, { vel: 0.45 });
        base += m;
        VIEW(base, F, d);
      };
      }

    },
  });

  P.addPixel({
    name: 'Defrag', fam: 'Machines', sizes: [40, 50, 80], fps: 12,
    recipe: 'A disk being tidied, drawn in big bevelled blocks: files scattered in fragments are read and rewritten one block at a time until each lies in one unbroken run, under a stepping progress bar, then the disk is scattered again.',
    make(R, U, g) {
      const { n, d } = g, C = n === 80 ? 8 : 5, M = Math.floor(n / C), rows = M - 2, B = M * rows, hex = X.PIX.hex, sc = X.PIX.scheme(R, ['Sweetie', 'Pico', 'Candy', 'Neon', 'Dusk']);
      const ramps = sc.ramps, freeC = [hex('#2a2a36'), hex('#3a3a4a'), hex('#4a4a5e')], sysC = [hex('#4a4a56'), hex('#9a9aa6'), hex('#e0e0ea')];
      const style = R.pick(['bevel', 'bevel', 'flat']), BGS = [hex('#0c0c14'), hex('#1d2b53'), BLACK], bg = R.pick(BGS);
      let disk, plan, k, rest, readAt, writeAt;
      g.trait('Palette', sc.name); g.trait('Blocks', style === 'flat' ? 'Flat' : 'Bevelled'); g.trait('Grid', n);
      // how full the disk is, how its files are broken up (scattered blocks, or a few long fragments each), and how big the files run
      const full = X.VG.pick(g, 'Disk', 'Two-thirds full', ['Two-thirds full', 'Two-thirds full', 'Nearly full', 'Half empty']), FULL = full === 'Nearly full' ? 0.88 : full === 'Half empty' ? 0.45 : 0.7;
      const frag = X.VG.pick(g, 'Fragments', 'Scattered', ['Scattered', 'Scattered', 'Chunky']), files0 = X.VG.pick(g, 'Files', 'Mixed', ['Mixed', 'Mixed', 'Many small', 'Few large']);
      const scatter = () => {
        disk = new Int16Array(B).fill(-1);
        const files = [];
        let used = 0;
        while (used < B * FULL) { let len = R.int(2, Math.max(3, Math.round(B / 12))); if (files0 === 'Many small') len = 2 + (len % 3); else if (files0 === 'Few large') len = len * 2 + 4; files.push(len); used += len; }
        let slots = R.shuffle(Array.from({ length: B }, (_, i) => i));
        // chunky: the disk is cut into short runs that are shuffled as wholes, so each file lies in a few long pieces
        if (frag === 'Chunky') { const runs = []; for (let i = 0; i < B; i += 4) runs.push(Array.from({ length: Math.min(4, B - i) }, (_, j) => i + j)); slots = R.shuffle(runs).flat(); }
        let s2 = 0; files.forEach((len, fi) => { for (let j = 0; j < len && s2 < B; j++) disk[slots[s2++]] = fi; });
        const sysN = Math.min(3, B);
        for (let i = 0; i < sysN; i++) disk[i] = -2;
        plan = []; let p = sysN; files.forEach((len, fi) => { for (let j = 0; j < len; j++) plan.push([p++, fi]); });
        k = 0; rest = 0; readAt = writeAt = -1;
      };
      scatter();
      let tick = 0;
      const block = (i, r) => {
        const x = (i % M) * C, y = Math.floor(i / M) * C;
        if (style === 'flat') { X.rect(g, x, y, C - 1, C - 1, r[1]); return; }
        X.rect(g, x, y, C - 1, C - 1, r[1]); X.rect(g, x, y, C - 1, 1, r[2]); X.rect(g, x, y, 1, C - 1, r[2]); X.rect(g, x + C - 2, y + 1, 1, C - 2, r[0]); X.rect(g, x + 1, y + C - 2, C - 2, 1, r[0]);
      };
      const old = new Uint32Array(n * n);
      let fade = 0;
      return () => {
        readAt = writeAt = -1;
        // a finished disk is held, then the next scattered one dissolves in over it
        if (k >= plan.length) { if (++rest > 40) { old.set(d); fade = 10; scatter(); } }
        else if (++tick % 2 === 0) for (let moves = 0; moves < 1 && k < plan.length; k++) {
          const [p, fi] = plan[k];
          if (disk[p] === fi) continue;
          let src = -1; for (let i = B - 1; i > p; i--) if (disk[i] === fi) { src = i; break; }
          if (src < 0) continue;
          if (disk[p] >= 0) { let spare = -1; for (let i = B - 1; i > p; i--) if (disk[i] === -1) { spare = i; break; } if (spare >= 0) disk[spare] = disk[p]; }
          disk[p] = fi; disk[src] = -1; readAt = src; writeAt = p; moves++;
        }
        d.fill(bg);
        for (let i = 0; i < B; i++) {
          const v = disk[i];
          block(i, i === readAt ? [hex('#7e2553'), hex('#ff004d'), hex('#ff77a8')] : i === writeAt ? [hex('#008751'), hex('#00e436'), hex('#c4ffc4')] : v === -1 ? freeC : v === -2 ? sysC : ramps[v % ramps.length]);
        }
        // a progress bar of whole blocks under the map
        const y0 = rows * C + 1, h = n - y0 - 2, pct = Math.min(k, plan.length) / plan.length, cells = M - 2, lit = Math.round(pct * cells);
        X.rect(g, C - 1, y0, (cells) * C + 2, h, sysC[0]);
        for (let c = 0; c < cells; c++) X.rect(g, C + c * C, y0 + 1, C - 1, h - 2, c < lit ? (k >= plan.length ? hex('#00e436') : hex('#29adff')) : bg);
        if (fade > 0) { const p = 1 - fade / 10; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (X.dith8(x >> 1, y >> 1) > p) d[y * n + x] = old[y * n + x]; fade--; }
      };
    },
  });

  P.addPixel({
    name: 'Railyard', fam: 'Machines', sizes: [50, 80], fps: 12,
    interactive: 'Click to throw the points: trains reaching the junction change loops.',
    recipe: 'A model railway from above: two loops of track joined by points, trains of coloured wagons running round, and the points flipping so trains change loops as they go.',
    make(R, U, g) {
      const { n, d } = g, inks = X.VG.inksN(R, 6, 0.45), sleeper = 0xff20405a, rail = 0xffb0b0b0;
      // the season (or a desert), how the two loops are laid out, and what stands between the tracks
      const season = X.VG.pick(g, 'Season', 'Summer', ['Summer', 'Summer', 'Autumn', 'Winter', 'Desert']), layout = X.VG.pick(g, 'Layout', 'Stacked', ['Stacked', 'Stacked', 'Side by side']), scenery = X.VG.pick(g, 'Scenery', 'Trees', ['Trees', 'Trees', 'Forest', 'Village']);
      const SEA = { Summer: [0xff2a5a2a, 0xff306230, [0xff1a401a, 0xff1f4a1f, 0xff163816, 0xff3a7a3a, 0xff2e6a2e]], Autumn: [X.rgb(92, 76, 34), X.rgb(104, 84, 38), [X.rgb(150, 60, 20), X.rgb(170, 80, 24), X.rgb(120, 46, 16), X.rgb(230, 140, 40), X.rgb(200, 100, 30)]], Winter: [X.rgb(214, 222, 232), X.rgb(198, 208, 222), [X.rgb(30, 60, 50), X.rgb(36, 70, 58), X.rgb(24, 50, 42), WHITE, X.rgb(230, 240, 250)]], Desert: [X.rgb(196, 160, 100), X.rgb(184, 148, 92), [X.rgb(60, 110, 50), X.rgb(70, 124, 56), X.rgb(50, 92, 40), X.rgb(110, 160, 80), X.rgb(90, 140, 64)]] }[season];
      const grass = SEA[0], grass2 = SEA[1], TC = SEA[2];
      g.trait('Wagons', inks.name); g.trait('Grid', n);
      // two rounded rectangles that share one straight
      const loop = (x0, y0, x1, y1) => { const p = [], r = 6; for (let x = x0 + r; x < x1 - r; x++) p.push([x, y0]); for (let a = 0; a < 8; a++) p.push([x1 - r + Math.sin(a / 8 * Math.PI / 2) * r, y0 + r - Math.cos(a / 8 * Math.PI / 2) * r]); for (let y = y0 + r; y < y1 - r; y++) p.push([x1, y]); for (let a = 0; a < 8; a++) p.push([x1 - r + Math.cos(a / 8 * Math.PI / 2) * r, y1 - r + Math.sin(a / 8 * Math.PI / 2) * r]); for (let x = x1 - r; x > x0 + r; x--) p.push([x, y1]); for (let a = 0; a < 8; a++) p.push([x0 + r - Math.sin(a / 8 * Math.PI / 2) * r, y1 - r + Math.cos(a / 8 * Math.PI / 2) * r]); for (let y = y1 - r; y > y0 + r; y--) p.push([x0, y]); for (let a = 0; a < 8; a++) p.push([x0 + r - Math.cos(a / 8 * Math.PI / 2) * r, y0 + r - Math.sin(a / 8 * Math.PI / 2) * r]); return p; };
      const m = Math.round(n * 0.08), mid = Math.round(n * R.range(0.45, 0.55)), loops = [loop(m, m, n - m, mid), loop(m + Math.round(n * 0.12), mid, n - m - Math.round(n * 0.05), n - m)];
      // side by side: the same two loops turned a quarter, so they share an upright straight instead
      if (layout === 'Side by side') for (const p of loops) for (const q of p) { const x = q[0]; q[0] = q[1]; q[1] = x; }
      const trains = Array.from({ length: R.int(2, 3) }, (_, k) => ({ L: k % 2, s: R.range(0, 200), v: R.range(0.35, 0.6), cars: Array.from({ length: R.int(3, 6) }, () => inks[R.int(0, inks.length - 1)]), engine: inks[k % inks.length] }));
      const trees = Array.from({ length: Math.round(n / 8) }, () => [R.int(0, n - 1), R.int(0, n - 1)]), inp = g.input;
      g.trait('Trains', trains.length);
      // a forest adds many more trees, kept off the track; a village swaps the trees for little houses
      if (scenery === 'Forest') { const onTrack = new Uint8Array(n * n); for (const p of loops) for (const [x, y] of p) for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const xx = Math.round(x) + u, yy = Math.round(y) + v; if (xx >= 0 && yy >= 0 && xx < n && yy < n) onTrack[yy * n + xx] = 1; } for (let k = 0; k < n * 0.7; k++) { const x = g.alt.int(1, n - 2), y = g.alt.int(1, n - 2); if (!onTrack[y * n + x]) trees.push([x, y]); } }
      let thrown = null;
      // the scenery is drawn once: grass, trees with a shadow, and track laid as ballast, sleepers and two rails
      const scene = new Uint32Array(n * n), sg = { n, d: scene }, ballast = 0xff3e4a52, sleeperC = 0xff1c3046, railC = 0xffc0c0c0, railLo = 0xff707878;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) scene[y * n + x] = (x * 7 + y * 13) % 17 === 0 ? grass2 : grass;
      const ROOFS = [X.rgb(170, 60, 50), X.rgb(80, 90, 120), X.rgb(130, 90, 60)];
      if (scenery === 'Village') trees.forEach(([x, y], k) => { const rc = ROOFS[k % 3]; X.rect(sg, x, y, 4, 3, X.shade(grass, 0.6)); X.rect(sg, x - 1, y - 1, 4, 3, X.rgb(220, 210, 190)); X.rect(sg, x - 1, y - 1, 4, 1, rc); X.rect(sg, x - 1, y - 2, 4, 1, X.mixPk(rc, WHITE, 0.3)); X.put(sg, x, y + 1, X.rgb(60, 50, 40)); });
      else for (const [x, y] of trees) { X.put(sg, x + 2, y + 1, X.shade(grass, 0.6)); X.put(sg, x + 1, y + 2, X.shade(grass, 0.6)); X.rect(sg, x - 1, y, 3, 1, TC[0]); X.rect(sg, x, y - 1, 1, 3, TC[0]); X.put(sg, x - 1, y - 1, TC[1]); X.put(sg, x + 1, y + 1, TC[2]); X.put(sg, x, y - 1, TC[3]); X.put(sg, x - 1, y, TC[4]); }
      for (const p of loops) {
        const L = p.length, perp = i => { const a = p[(i + 1) % L], b = p[(i + L - 1) % L], tx = a[0] - b[0], ty = a[1] - b[1], l = Math.hypot(tx, ty) || 1; return [-ty / l, tx / l]; };
        for (let i = 0; i < L; i++) { const [x, y] = p[i], [px, py] = perp(i); for (let o = -1; o <= 1; o++) X.put(sg, Math.round(x + px * o), Math.round(y + py * o), ballast); }
        for (let i = 0; i < L; i += 2) { const [x, y] = p[i], [px, py] = perp(i); X.put(sg, Math.round(x), Math.round(y), sleeperC); }
        for (let i = 0; i < L; i++) { const [x, y] = p[i], [px, py] = perp(i); X.put(sg, Math.round(x + px), Math.round(y + py), railC); X.put(sg, Math.round(x - px), Math.round(y - py), railLo); }
      }
      return (t, dt, f) => {
        // each tap throws the points; a burst of remembered taps simply leaves them one way or the other
        if (inp.taps().length) thrown = thrown === null ? true : !thrown;
        d.set(scene);
        if (thrown !== null) { const [jx, jy] = loops[0][0]; X.rect(g, jx - 1, jy - 4, 3, 2, 0xff303030); X.put(g, jx + (thrown ? 1 : -1), jy - 4, thrown ? 0xff40ff40 : 0xff4040ff); }
        for (const tr of trains) {
          tr.s += tr.v;
          const p = loops[tr.L], at = k => p[((Math.floor(tr.s - k * 4) % p.length) + p.length) % p.length];
          if (Math.floor(tr.s) % p.length === 0 && Math.floor(tr.s - tr.v) % p.length !== 0 && (thrown === null ? R.bool(0.5) : thrown)) { tr.L = 1 - tr.L; tr.s = 0; }
          // wagons with a gap between them, a shadow on the ground and a lit roof edge
          tr.cars.forEach((c, k) => { const [x, y] = at(k + 1); X.rect(g, x, y, 3, 3, X.shade(grass, 0.55)); });
          { const [x, y] = at(0); X.rect(g, x, y, 3, 3, X.shade(grass, 0.55)); }
          tr.cars.forEach((c, k) => { const [x, y] = at(k + 1); X.rect(g, x - 1, y - 1, 3, 3, c); X.rect(g, x - 1, y - 1, 3, 1, X.mixPk(c, WHITE, 0.35)); });
          const [x, y] = at(0); X.rect(g, x - 1, y - 1, 3, 3, tr.engine); X.rect(g, x - 1, y - 1, 3, 1, X.mixPk(tr.engine, WHITE, 0.35)); X.put(g, x, y, (f >> 2) & 1 ? WHITE : 0xffd0d0d0);
        }
      };
    },
  });

  P.addPixel({
    name: 'Elevators', fam: 'Machines', sizes: [80, 100], fps: 12,
    interactive: 'Click a floor and someone there calls a lift.',
    recipe: 'A tower in cross-section: people arrive on every floor wanting another, walk to the lifts and wait; each car answers the longest-waiting call and drops riders off on the way.',
    make(R, U, g) {
      const VG = X.VG, storeys = VG.pick(g, 'Storeys', 'Standard', ['Standard', 'Standard', 'Tall']), bld = VG.pick(g, 'Building', 'Offices', ['Offices', 'Offices', 'Hotel', 'After dark']), carK = VG.pick(g, 'Cars', 'Steel', ['Steel', 'Steel', 'Glass', 'Brass']);
      const { n, d } = g, FH = storeys === 'Tall' ? 10 : 8, F = Math.floor((n - 6) / FH), inks = VG.inksN(R, 6, 0.45), S = R.int(2, 4), shaftX = Array.from({ length: S }, (_, k) => Math.round(n * (k + 1) / (S + 1)) - 3);
      const floorY = k => n - 3 - (k + 1) * FH, people = [], cars = shaftX.map(x => ({ x, y: floorY(0), riders: [], targets: [], pause: 0 }));
      const dark = bld === 'After dark', hotel = bld === 'Hotel', wallA = hotel ? X.mixPk(X.shade(inks[0], 0.2), X.rgb(90, 40, 30), 0.5) : X.shade(inks[0], dark ? 0.08 : 0.16), wallB = hotel ? X.mixPk(X.shade(inks[0], 0.26), X.rgb(110, 50, 36), 0.5) : X.shade(inks[0], dark ? 0.11 : 0.2), slab = hotel ? X.rgb(150, 110, 60) : 0xff5a5a5a, shaft = 0xff141414, inp = g.input;
      const winA = dark ? X.rgb(20, 24, 36) : hotel ? X.rgb(120, 80, 50) : 0xff3a5a70, winB = dark ? X.rgb(255, 210, 120) : hotel ? X.rgb(255, 200, 120) : 0xff70b0d0, carOut = carK === 'Brass' ? X.rgb(200, 160, 70) : carK === 'Glass' ? X.rgb(150, 200, 220) : 0xff9a9a9a, carIn = carK === 'Glass' ? X.rgb(60, 90, 110) : carK === 'Brass' ? X.rgb(70, 50, 30) : 0xff3a3a3a;
      g.trait('Palette', inks.name); g.trait('Lifts', S); g.trait('Grid', n);
      const add = p => { people.push(p); };
      const sim = () => {
        if (R() < 0.08 && people.length < F * 3) { const from = R.int(0, F - 1); let to = R.int(0, F - 1); if (to === from) to = (to + 1) % F; const left = R.bool(); add({ x: left ? 0 : n - 3, floor: from, to, state: 'walk', shaft: R.int(0, S - 1), c: inks[R.int(1, inks.length - 1)], wait: 0 }); }
        for (const p of people) {
          if (p.state === 'walk') {
            const side = p.x < shaftX[p.shaft] ? -1 : 1, tx = shaftX[p.shaft] + (side < 0 ? -3 : 7);
            p.x += Math.sign(tx - p.x) * 0.5;
            // the queue grows outward from the door, so people waiting together stand side by side
            if (Math.abs(p.x - tx) < 0.6) { p.state = 'wait'; let slot = 0; for (const q of people) if (q !== p && q.state === 'wait' && q.shaft === p.shaft && q.floor === p.floor && Math.sign(q.x - shaftX[q.shaft]) === side) slot++; p.x = tx + side * Math.min(slot, 3) * 3; }
          }
          else if (p.state === 'wait') p.wait++;
          else if (p.state === 'leave') { p.x += p.dir * 0.6; if (p.x < -3 || p.x > n + 3) p.gone = true; }
        }
        cars.forEach((car, k) => {
          if (car.pause > 0) { car.pause--; return; }
          if (!car.targets.length) { const w = people.filter(p => p.state === 'wait' && p.shaft === k).sort((a, b) => b.wait - a.wait)[0]; if (w) car.targets.push(w.floor); }
          if (!car.targets.length) return;
          const ty = floorY(car.targets[0]);
          if (car.y !== ty) { car.y += Math.sign(ty - car.y); return; }
          const fl = car.targets.shift();
          for (const p of car.riders.filter(r => r.to === fl)) { p.state = 'leave'; p.floor = fl; p.x = car.x + 2; p.dir = R.sign(); }
          car.riders = car.riders.filter(r => r.to !== fl);
          for (const p of people.filter(q => q.state === 'wait' && q.shaft === k && q.floor === fl).slice(0, 4 - car.riders.length)) { p.state = 'ride'; car.riders.push(p); if (!car.targets.includes(p.to)) car.targets.push(p.to); }
          car.pause = 12;
        });
        for (let i = people.length - 1; i >= 0; i--) if (people[i].gone) people.splice(i, 1);
      };
      // the building is already busy when the piece opens
      for (let k = 0; k < 240; k++) sim();
      const lampOn = 0xff40c0ff, lampOff = 0xff2a3440, carHere = 0xff40e060;
      return (t, dt, f) => {
        // a tap calls a lift from that floor; a burst of remembered taps is capped so the building never overfills
        for (const tap of inp.taps()) { if (people.length >= F * 4) continue; const from = Math.max(0, Math.min(F - 1, Math.floor((n - 3 - tap.y * n) / FH))); let to = g.alt.int(0, F - 1); if (to === from) to = (to + 1) % F; add({ x: tap.x * n, floor: from, to, state: 'walk', shaft: shaftX.reduce((b, x, k) => Math.abs(x - tap.x * n) < Math.abs(shaftX[b] - tap.x * n) ? k : b, 0), c: WHITE, wait: 99 }); }
        sim();
        for (let y = 0; y < n; y++) d.fill(Math.floor((n - 3 - y) / FH) & 1 ? wallA : wallB, y * n, y * n + n);
        for (let k = 0; k <= F; k++) X.rect(g, 0, floorY(k - 1), n, 1, slab);
        for (let k = 0; k < F; k++) for (let x = 3; x < n; x += 9) X.rect(g, x, floorY(k) + 2, 3, FH - 5, (k * 5 + x) % (dark ? 3 : 7) ? winA : winB);
        for (const x of shaftX) X.rect(g, x, floorY(F - 1), 6, n - 3 - floorY(F - 1), shaft);
        // a call lamp by each door: lit while someone waits there, green while the car stands at that floor
        for (let k = 0; k < F; k++) shaftX.forEach((x, s2) => { const car = cars[s2], here = car.y === floorY(k) && car.pause > 0, wait = people.some(p => p.state === 'wait' && p.shaft === s2 && p.floor === k); X.put(g, x - 1, floorY(k) + 2, here ? carHere : wait ? lampOn : lampOff); });
        for (const car of cars) {
          X.rect(g, car.x, car.y + 1, 6, FH - 1, carOut); X.rect(g, car.x + 1, car.y + 2, 4, FH - 3, car.riders.length ? (carK === 'Steel' ? 0xff3a4a5a : X.mixPk(carIn, WHITE, 0.15)) : carIn);
          car.riders.forEach((p, j) => X.rect(g, car.x + 1 + (j & 1) * 2, car.y + 3 + (j >> 1) * 0, 1, 4, p.c));
          X.rect(g, car.x + 2, floorY(F - 1), 2, car.y - floorY(F - 1), 0xff505050);
        }
        for (const p of people) if (p.state !== 'ride') { const y = floorY(p.floor) + FH - 5; X.rect(g, p.x, y + 1, 2, 3, p.c); X.put(g, p.x, y, X.mixPk(p.c, WHITE, 0.5)); X.put(g, p.x + 1, y, X.mixPk(p.c, WHITE, 0.5)); }
      };
    },
  });

  P.addPixel({
    name: 'Warehouse', seed: 1, fam: 'Machines', sizes: [50, 80], fps: 12,
    recipe: 'A robot warehouse from above: squat robots slide under shelving pods, carry them to the packing stations along the aisles, wait their turn, and take them home again.',
    make(R, U, g) {
      const { n, d } = g, T = 5, M = n / T, inks = X.VG.inksN(R, 6, 0.45), N = M * M;
      g.trait('Palette', inks.name); g.trait('Grid', n);
      // how the shelving is racked, how many robots run, and the floor
      const rack = X.VG.pick(g, 'Racking', 'Blocks', ['Blocks', 'Blocks', 'Long rows', 'Islands']), RX = rack === 'Long rows' ? 8 : rack === 'Islands' ? 3 : 4;
      const fleet = X.VG.pick(g, 'Fleet', 'Standard', ['Standard', 'Standard', 'Busy', 'Few']), floorK = X.VG.pick(g, 'Floor', 'Grey', ['Grey', 'Grey', 'Blue', 'Green']);
      const floorC = floorK === 'Blue' ? X.rgb(30, 42, 58) : floorK === 'Green' ? X.rgb(32, 46, 36) : 0xff2a2a2a, dotC = X.mixPk(floorC, WHITE, 0.07);
      const pods = [], podAt = new Int16Array(N).fill(-1), stations = [];
      for (let y = 2; y < M - 4; y++) for (let x = 2; x < M - 2; x++) if (y % 3 !== 1 && x % RX !== 1) { podAt[y * M + x] = pods.length; pods.push({ home: y * M + x, at: y * M + x, c: inks[R.int(0, inks.length - 1)] }); }
      for (let k = 0; k < 3; k++) stations.push((M - 2) * M + Math.round((k + 0.5) * M / 3));
      const robots = Array.from({ length: Math.round(M * (fleet === 'Busy' ? 0.8 : fleet === 'Few' ? 0.3 : 0.5)) }, (_, k) => ({ at: (M - 1 - Math.floor(k * 2 / M)) * M + (k * 2) % M + Math.floor(k * 2 / M), path: [], pod: -1, mode: 'idle', wait: 0, px: 0, py: 0 }));
      const occupied = i => robots.some(r => r.at === i);
      const route = (from, to, carrying, avoid) => {
        const prev = new Int32Array(N).fill(-1), q = [from]; prev[from] = from;
        for (let h = 0; h < q.length; h++) { const i = q[h]; if (i === to) break; const x = i % M; for (const o of [1, -1, M, -M]) { const j = i + o; if (j < 0 || j >= N || (o === 1 && x === M - 1) || (o === -1 && x === 0) || prev[j] >= 0) continue; if ((carrying && podAt[j] >= 0 && j !== to) || (avoid && avoid.has(j) && j !== to)) continue; prev[j] = i; q.push(j); } }
        if (prev[to] < 0) return [];
        const out = []; for (let i = to; i !== from; i = prev[i]) out.unshift(i); return out;
      };
      robots.forEach(r => { r.px = (r.at % M) * T; r.py = (r.at / M | 0) * T; });
      const sim = () => {
        for (const r of robots) {
          const tx = (r.at % M) * T, ty = (r.at / M | 0) * T;
          if (r.px !== tx || r.py !== ty) { r.px += Math.sign(tx - r.px); r.py += Math.sign(ty - r.py); if (r.pod >= 0) pods[r.pod].at = -1; continue; }
          if (r.path.length) {
            const nx = r.path[0];
            if (!occupied(nx)) { r.at = r.path.shift(); r.blocked = 0; }
            else if (++r.blocked > 4 + (robots.indexOf(r) % 3)) {
              // stuck behind another robot: route round everyone, or sidestep
              const goal = r.path[r.path.length - 1], others = new Set(robots.filter(o => o !== r).map(o => o.at)), alt = route(r.at, goal, r.pod >= 0, others);
              if (alt.length) r.path = alt;
              else { const side = [1, -1, M, -M].map(o => r.at + o).filter(j => j >= 0 && j < N && !others.has(j) && (r.pod < 0 || podAt[j] < 0)); if (side.length) { r.path.unshift(r.at); r.at = R.pick(side); } }
              r.blocked = 0;
            }
            continue;
          }
          if (r.wait > 0) { r.wait--; continue; }
          if (r.mode === 'idle') { const free = pods.map((p, i) => i).filter(i => pods[i].at === pods[i].home && !robots.some(o => o.pod === i || o.target === i)); if (free.length) { r.target = R.pick(free); r.path = route(r.at, pods[r.target].home, false); r.mode = 'fetch'; } }
          else if (r.mode === 'fetch') { r.pod = r.target; podAt[pods[r.pod].home] = -1; r.path = route(r.at, R.pick(stations), true); r.mode = 'deliver'; }
          else if (r.mode === 'deliver') { r.wait = 15; r.mode = 'return'; }
          else if (r.mode === 'return') { r.path = route(r.at, pods[r.pod].home, true); r.mode = 'drop'; }
          else if (r.mode === 'drop') { pods[r.pod].at = pods[r.pod].home; podAt[pods[r.pod].home] = r.pod; r.pod = -1; r.target = -1; r.mode = 'idle'; r.wait = 6; }
        }
      };
      // the shift is already under way when the piece opens
      for (let k = 0; k < 120; k++) sim();
      // a pod is a shelving unit seen from above: a frame, shelves across it and the stock on them
      const pod = (x, y, c) => { X.rect(g, x + 1, y + 1, T - 2, T - 2, c); X.rect(g, x + 1, y + 1, T - 2, 1, X.mixPk(c, WHITE, 0.35)); X.put(g, x + 2, y + 2, X.shade(c, 0.6)); X.rect(g, x + 1, y + T - 1, T - 2, 1, X.shade(c, 0.45)); };
      const robotC = 0xff30c0f0, robotTop = 0xff90e8ff, robotDark = 0xff107090, desk = 0xff3a5a7a, deskTop = 0xff5a8aa8;
      return (t, dt, f) => {
        sim();
        d.fill(floorC);
        for (let y = 0; y < n; y += T) for (let x = 0; x < n; x += T) X.put(g, x, y, floorK === 'Grey' ? 0xff3a3a3a : dotC);
        // painted lanes down the aisles between the shelving
        for (let y = 0; y < M; y++) if (y % 3 === 1) for (let x = 0; x < n; x += 2) X.put(g, x, y * T + 2, 0xff2a5a6a);
        // packing desks, each with a packer
        for (const s of stations) { const x = (s % M) * T - 1, y = (s / M | 0) * T + T; X.rect(g, x, y, T + 2, T, desk); X.rect(g, x, y, T + 2, 1, deskTop); X.put(g, x + (T + 2 >> 1), y + T - 1, 0xffc0d8f0); }
        pods.forEach(p => { if (p.at >= 0) pod((p.at % M) * T, (p.at / M | 0) * T, p.c); });
        robots.forEach((r, k) => {
          // a squat yellow robot with a blinking status light; carrying, it shows as a yellow rim under the pod it lifts
          if (r.pod >= 0) { X.rect(g, r.px, r.py, T, T, robotC); X.rect(g, r.px, r.py + T - 1, T, 1, robotDark); pod(r.px, r.py - 1, pods[r.pod].c); return; }
          X.rect(g, r.px + 1, r.py + 1, T - 2, T - 2, robotC); X.rect(g, r.px + 1, r.py + 1, T - 2, 1, robotTop); X.rect(g, r.px + 1, r.py + T - 2, T - 2, 1, robotDark);
          X.put(g, r.px + 2, r.py + 2, ((f + k * 3) >> 2) & 1 ? 0xff40ff60 : 0xff208030);
        });
      };
    },
  });

  P.addPixel({
    name: 'Logic Analyser', fam: 'Machines', sizes: [100, 200], fps: 12,
    listens: 'The bottom channel becomes a microphone probe and traces the room’s sound.',
    recipe: 'The probe screen of a small digital circuit: a clock, a counter’s bits each half as fast as the last, a shift register full of noise and two gates built from them, all scrolling past.',
    make(R, U, g) {
      const { n, d } = g, inks0 = X.VG.inksN(R, 6, 0.5), LBL = 26, names = ['CLK', 'Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'LF0', 'LF1', 'LF2', 'AND', 'XOR', 'BUS'];
      const TAPS = [[0, 2, 3, 5], [0, 1, 3, 4], [1, 2, 4, 7]], taps = R.pick(TAPS);
      g.trait('Palette', inks0.name); g.trait('Grid', n);
      // how many channels are probed, how a high signal is drawn, and the tube's colour
      const chans = X.VG.pick(g, 'Channels', 12, [12, 12, 8, 6]), trace = X.VG.pick(g, 'Trace', 'Hatched', ['Hatched', 'Hatched', 'Filled', 'Bare']), tube = X.VG.pick(g, 'Screen', 'Colour', ['Colour', 'Colour', 'Green', 'Amber']);
      const CH = chans === 8 ? [0, 1, 2, 3, 6, 7, 9, 11] : chans === 6 ? [0, 1, 2, 6, 10, 11] : names.map((_, i) => i), H = Math.floor((n - 4) / chans);
      const MONO = tube === 'Green' ? [X.rgb(60, 255, 120), X.rgb(30, 180, 80)] : tube === 'Amber' ? [X.rgb(255, 180, 40), X.rgb(200, 120, 20)] : null;
      const inks = MONO ? inks0.map((_, k) => MONO[k & 1]) : inks0;
      const hist = [], inp = g.input;
      let cnt = 0, lfsr = R.int(1, 255), sub = 0, total = 0;
      const sample = () => {
        sub++;
        const clk = sub & 1;
        if (sub % 2 === 0) { cnt = (cnt + 1) & 255; const fb = taps.reduce((a, b) => a ^ (lfsr >> b & 1), 0); lfsr = ((lfsr << 1) | fb) & 255; if (!lfsr) lfsr = 0x5a; }
        const q = k => cnt >> k & 1, l = k => lfsr >> k & 1;
        return [clk, q(0), q(1), q(2), q(3), q(4), l(0), l(1), l(2), q(1) & l(0), q(2) ^ l(1), cnt];
      };
      // on the finer grid each sample is two cells wide, so the traces read as square waves, not a solid band
      const sw = n >= 200 ? 2 : 1, W = n - LBL, SN = Math.ceil(W / sw) + 1;
      for (let k = 0; k < SN; k++) { hist.push(sample()); total++; }
      let acc = 0;
      return (t, dt) => {
        // the traces scroll past at the same number of cells a second as ever (wider samples come half as often)
        acc += dt * 12 / sw;
        while (acc >= 1) { acc--; hist.push(sample()); hist.shift(); total++; }
        d.fill(0xff0c0c0c);
        // a dotted time grid every eight samples, scrolling with the traces
        for (let k = 0; k < SN; k++) if ((total - SN + k) % 8 === 0 && k * sw - Math.floor(acc * sw) >= 0) for (let y = 1; y < n; y += 3) X.put(g, LBL + k * sw - Math.floor(acc * sw), y, 0xff222222);
        const mic = inp.listening, sh = Math.floor(acc * sw), at = x => (x + sh) / sw | 0;
        CH.forEach((r, row) => {
          const nm = names[r], y0 = 2 + row * H, c = r === 11 ? (MONO ? MONO[0] : WHITE) : inks[r % inks.length];
          X.text(g, r === 11 && mic ? 'MIC' : nm, 1, y0 + Math.max(0, (H - 7) >> 1), X.shade(c, 0.8));
          if (r === 11 && mic) {
            // the analogue probe: the sound in the room, drawn across the row
            const mid = y0 + (H >> 1), amp = (H >> 1) - 1;
            let py = mid;
            for (let x = 0; x < W; x++) { const v = Math.max(-1, Math.min(1, inp.wave[Math.floor(x / W * 255)] * 3)), y = Math.round(mid - v * amp); X.line(g, LBL + x - 1, py, LBL + x, y, x ? 0xff60ffa0 : 0xff60ffa0); py = y; }
            return;
          }
          if (r === 11) {
            for (let x = 0; x < W; x++) { const v = hist[at(x)][11], pv = x ? hist[at(x - 1)][11] : v, edge = v !== pv; if (edge) { X.line(g, LBL + x, y0 + 1, LBL + x, y0 + H - 2, X.shade(c, 0.6)); } else { X.put(g, LBL + x, y0 + 1, X.shade(c, 0.6)); X.put(g, LBL + x, y0 + H - 2, X.shade(c, 0.6)); } }
            return;
          }
          for (let x = 0; x < W; x++) {
            const v = hist[at(x)][r], pv = x ? hist[at(x - 1)][r] : v, y = v ? y0 + 1 : y0 + H - 2;
            if (v !== pv) X.line(g, LBL + x, y0 + 1, LBL + x, y0 + H - 2, c); else X.put(g, LBL + x, y, c);
            if (v && trace !== 'Bare') for (let yy = y0 + 2; yy < y0 + H - 2; yy++) if (trace === 'Filled' || (x + yy) % 4 === 0) X.put(g, LBL + x, yy, X.shade(c, trace === 'Filled' ? 0.32 : 0.25));
          }
        });
        X.rect(g, LBL - 2, 0, 1, n, 0xff303030);
      };
    },
  });
})();
