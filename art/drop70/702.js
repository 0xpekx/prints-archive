// 702 Corner Stack: unit cubes in the corner of a room, seen straight down the room's diagonal, so
// the whole picture is a hexagon of three kinds of rhombus. Every one builds a thing of its own kind
// out of them, a cube at a time (a ziggurat, a skyline, a fountain, a volcano, a knot, a lighthouse...),
// in flat paint or in matter (stone, sand, snow, brick, gold, glass, bismuth, a city of lit windows...).
// It is lit: by the room, dimmer in the creases; by a sun or a moon that casts shadows (for some the day
// goes round); through a window; and by whatever shines (molten rock, lamps, lights that drift round it).
// While it stands it moves, slowly: it turns, twists, sways, heaves, is cut through, or has water, oil or
// molten rock run down it; or sand pours over it, marbles roll down it, or ivy (or frost) creeps up it. Then it is taken down, reworked into the next of its kind, or it never rests at all.
// A tap knocks cubes out of it (they fly, fall, and later fly home); a held pointer opens a spring (or pours
// sand, lets marbles go, or brings out flowers).
Proto.add({
  num: 702,
  name: 'Corner Stack',
  fam: 'Tilings',
  recipe: 'Unit cubes in the corner of a room, seen straight down its diagonal, so the picture is a hexagon made of three kinds of rhombus. Each one has its own thing to build out of them, one cube at a time: a ziggurat, a skyline, a fountain, a volcano, a knot, a lighthouse, and many more. Some are painted in flat colour, and a colour in shade turns toward blue-violet instead of toward grey; some are made of something: stone, sand, snow, brick, gold, glass, bismuth, a city of lit windows. Each has its light: plain day, sunrise, sunset, a window whose patch crosses the room, the moon, or the whole day going round. Creases are dimmer, shadows are cast, and what shines (molten rock, lamps, lights that drift round it after dark) lights what is near it. While it stands it keeps moving, slowly: it turns, twists, sways, heaves, is cut through, or has water, oil or molten rock run down it, filling pools and spilling over their rims; on others sand pours from a spout and stands in cones, marbles roll down it step by step and gather at its foot, or ivy or frost creeps up its faces and flowers. Then it is taken down again, or reworked into the next of its kind.',
  interactive: 'Tap the build and the cubes you hit burst out of it in a flash, fall, and then fly home. Hold, and a spring opens under your finger: water, oil or molten rock runs down the build for as long as you hold, and follows a drag. Where sand, marbles or ivy move over it instead, a hold pours sand, lets marbles go or opens flowers under your finger, and a tap throws the sand up, scatters the marbles or shakes the leaves off.',
  music: true,
  seed: 171,
  make(c) {
    const M = Math, fl = M.floor, ab = M.abs, mn = M.min, mx = M.max, hyp = M.hypot, TAU = M.PI * 2;
    const forced = '';                                  // 'form|matter|motion|cover|liquid|colours|paint|light|event' here fixes any of the nine (for checking them one at a time)
    // two multiply-with-carry halves folded from the hash; a stream can be started again from any pair
    let lo = 0x9e3779b9, hi = 0x243f6a88;
    for (let i = 0; i < 8; i++) {
      const word = parseInt(c.hash.slice(2 + i * 8, 10 + i * 8), 16) >>> 0;
      lo = (M.imul(lo ^ word, 0x01000193) + i) >>> 0;
      hi = (M.imul(hi + word, 0x85ebca77) ^ lo >>> 13) >>> 0;
    }
    const stream = (a, b) => () => {
      a = (36969 * (a & 65535) + (a >>> 16)) >>> 0;
      b = (18000 * (b & 65535) + (b >>> 16)) >>> 0;
      return (((a << 16) + (b & 65535)) >>> 0) / 4294967296;
    };
    const rand = stream(lo || 1, hi || 2);
    let dice = rand;                                    // the stream choose() draws from
    const choose = (...opts) => {
      let total = 0; for (let i = 1; i < opts.length; i += 2) total += opts[i];
      let r = dice() * total;
      for (let i = 0; i < opts.length; i += 2) { r -= opts[i + 1]; if (r < 0) return opts[i]; }
      return opts[0];
    };
    // smooth noise on a lattice of hashed knots, for ground that rolls
    const knot = (i, j, s) => { let h = M.imul(i, 0x1f123bb5) ^ M.imul(j, 0x5f356495) ^ M.imul(s, 0x2545f491); h = M.imul(h ^ h >>> 15, 0x2c1b3c6d); h ^= h >>> 12; h = M.imul(h, 0x297a2d39); return ((h ^ h >>> 15) >>> 0) / 4294967296; };
    const noise = (x, y, s) => {
      const i = fl(x), j = fl(y), u = x - i, v = y - j, a = u * u * (3 - 2 * u), b = v * v * (3 - 2 * v);
      const p = knot(i, j, s), q = knot(i + 1, j, s), r = knot(i, j + 1, s), t = knot(i + 1, j + 1, s);
      return p + (q - p) * a + (r - p) * b + (p - q - r + t) * a * b;
    };
    const fbm = (x, y, s) => 0.58 * noise(x, y, s) + 0.29 * noise(x * 2.1 + 5.3, y * 2.1 + 1.7, s + 11) + 0.13 * noise(x * 4.3 + 2.2, y * 4.3 + 8.1, s + 23);

    // ================= the plans: what there is to build =================
    // A plan is drawn into T: a part number for every cell of the room (0 for air), cell (x, y, z) at
    // z << 10 | y << 5 | x; x and y run out along the floor from the far corner, z is up. O, when a
    // form keeps one, is the order its cells grew in. R is the stream a plan draws its numbers from.
    // push: when a plan is drawn again for coming out too slight, a form may draw itself bigger or denser (0, 1 or 2)
    let n = 16, T = null, O = null, R = rand, beatNo = 0, moving = false, push = 0;
    const at = (x, y, z) => z << 10 | y << 5 | x;
    const put = (x, y, z, p) => { if (x >= 0 && y >= 0 && z >= 0 && x < n && y < n && z < n) T[z << 10 | y << 5 | x] = p; };
    const block = (x0, y0, z0, x1, y1, z1, p) => {
      x0 = mx(0, fl(x0)); y0 = mx(0, fl(y0)); z0 = mx(0, fl(z0)); x1 = mn(n, fl(x1)); y1 = mn(n, fl(y1)); z1 = mn(n, fl(z1));
      for (let z = z0; z < z1; z++) for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) T[z << 10 | y << 5 | x] = p;
    };
    const solid = fn => { for (let z = 0; z < n; z++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const p = fn(x, y, z); if (p > 0) T[z << 10 | y << 5 | x] = p; } };
    // a ground: a height for every column, and a part for every cube in it
    const ground = (hf, pf) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const h = mn(n, fl(hf(x, y))); for (let z = 0; z < h; z++) T[z << 10 | y << 5 | x] = pf ? pf(x, y, z, h) : 1; } };
    const ri = (a, b) => a + fl(R() * (b - a + 1));
    const pk = list => list[fl(R() * list.length)];
    const ball = (cx, cy, cz, r, p) => { for (let z = fl(cz - r); z <= cz + r; z++) for (let y = fl(cy - r); y <= cy + r; y++) for (let x = fl(cx - r); x <= cx + r; x++) if (hyp(x + 0.5 - cx, y + 0.5 - cy, z + 0.5 - cz) < r) put(x, y, z, p); };
    // a form may say where its own springs are (cells of its own room), and may set lamps: a part that is always a light
    let SP = null;
    const LAMP = 31, spring = (x, y, z) => { if (SP) SP.push([fl(x), fl(y), fl(z)]); };

    // the heap of the first Corner Stack: heights that never rise away from the corner, shuffled a cube at a time
    let heapH = null, heapVol = 0, heapR = null, heapPhase = 0;
    const heapTry = (i, j, add) => {
      const o = i * n + j, v = heapH[o];
      if (add) { if (v >= n || (i > 0 && heapH[o - n] <= v) || (j > 0 && heapH[o - 1] <= v)) return; heapH[o] = v + 1; heapVol++; }
      else { if (v <= 0 || (i < n - 1 && heapH[o + n] >= v) || (j < n - 1 && heapH[o + 1] >= v)) return; heapH[o] = v - 1; heapVol--; }
    };
    const heap = () => {
      const full = n * n * n;
      if (!heapH) {
        heapH = new Int16Array(n * n); heapR = stream(lo ^ 0x5bd1e995, hi + 0x1b873593); heapPhase = R() * TAU;
        const f0 = 0.46 + 0.12 * M.sin(heapPhase);
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = mx(0, mn(n, M.round(1.5 * n - i - j - 0.5 + (f0 - 0.5) * n))); heapH[i * n + j] = v; heapVol += v; }
        for (let q = 0; q < full * 40; q++) heapTry(fl(heapR() * n), fl(heapR() * n), heapR() < 0.5);
      }
      const goal = full * (0.46 + 0.12 * M.sin(heapPhase + beatNo * 0.022));
      for (let q = 0; q < n * n * 6 && ab(goal - heapVol) > 0.5; q++) heapTry(fl(heapR() * n), fl(heapR() * n), goal > heapVol);
      for (let q = 0; q < n * 3; q++) heapTry(fl(heapR() * n), fl(heapR() * n), heapR() < 0.5);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let z = 0; z < heapH[i * n + j]; z++) T[z << 10 | j << 5 | i] = 1 + (z & 1);
    };

    // Every form: a name, a family, a weight, the room sizes it suits, and go(), which draws one of it.
    // corner: it leans on the two walls. live: it has a clock (beatNo) and can be kept moving.
    // nat: it fills O with the order it grew in. bare: leave it whole (no finish). parts: how many part numbers it uses.
    // cone: it narrows to a point, so it covers less of the square than a block of its size and is let off a little.
    const forms = [
      { id: 'Heap', flat: 1, fam: 'Heaps', w: 4, sizes: [12, 16, 20], corner: 1, live: 1, bare: 1, parts: 2, go: heap },
      { id: 'Drift', flat: 1, fam: 'Heaps', w: 3, sizes: [12, 16, 20, 24], corner: 1, parts: 2, go() {
        // (never a plane or a pyramid sloping straight at the eye, which reads as a flat triangle)
        const kind = pk([0, 0, 1, 3]), top = n * (0.55 + R() * 0.4), reach = n * (0.75 + R() * 0.5), prof = kind === 1 ? ri(1, 2) : ri(0, 2), step = pk([1, 1, 2, 3]), sd = ri(1, 9999), rough = R() < 0.4 ? 1.5 + R() * 2 : 0;
        ground((x, y) => {
          const r = (kind === 0 ? hyp(x, y) : kind === 1 ? mx(x, y) : kind === 2 ? (x + y) * 0.75 : hyp(x, y) * 0.6 + mx(x, y) * 0.5) / reach;
          const h = (r >= 1 ? 0 : top * (prof === 0 ? 1 - r : prof === 1 ? M.sqrt(1 - r * r) : (1 - r) * (1 - r))) + rough * (noise(x * 0.3, y * 0.3, sd) - 0.5);
          return fl(h / step + 0.5) * step;
        }, (x, y, z) => 1 + (fl(z / step) & 1));
      } },
      { id: 'Ziggurat', cone: 1, flat: 1, fam: 'Steps', w: 4, sizes: [16, 20, 24, 32], parts: 4, go() {
        const half = fl(n / 2) - ri(0, 2), tiers = ri(3, mn(9, half)), ins = mx(1, fl(half / (tiers + R() * 1.5))), th = mx(1, fl((n - 3) * (0.72 + R() * 0.28) / tiers)), round = R() < 0.25, cx = n / 2, stair = R() < 0.6, shrine = R() < 0.5;
        let w = half, z = 0, tier = 0;
        while (w >= 1 && z + th <= n - 2) {
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
            const dx = ab(x + 0.5 - cx), dy = ab(y + 0.5 - cx);
            if (round ? hyp(dx, dy) < w : mx(dx, dy) < w) for (let q = 0; q < th; q++) T[at(x, y, z + q)] = 1 + (tier & 1);
          }
          z += th; w -= ins; tier++;
        }
        if (shrine && w + ins >= 2) block(cx - 1, cx - 1, z, cx + 1, cx + 1, z + ri(2, 4), 4);
        if (stair) { const sw = ri(1, 2); for (let s = 0; s < z; s++) { const out = half + 1 - s * ins / th; for (let x = fl(cx); x < cx + out; x++) for (let y = fl(cx) - sw; y < cx + sw; y++) if (x < n && !T[at(x, y, s)]) put(x, y, s, 3); } }
      } },
      { id: 'Skyline', flat: 1, fam: 'Towers', w: 4, sizes: [16, 20, 24, 32], parts: 5, go() {
        const m = ri(0, 2), gap = pk([0, 1, 1]), small = n >= 24 ? 3 : 2, lots = [], peak = R() < 0.5, tall = 0.7 + R() * 0.4;
        const split = (x0, y0, x1, y1, d) => {
          const w = x1 - x0, h = y1 - y0, canX = w >= 2 * small + gap, canY = h >= 2 * small + gap;
          if (d > 5 || (!canX && !canY) || (d > 1 && R() < 0.12)) { lots.push([x0, y0, x1, y1]); return; }
          if (canX && (!canY || w >= h)) { const cut = x0 + small + fl(R() * (w - 2 * small - gap + 1)); split(x0, y0, cut, y1, d + 1); split(cut + gap, y0, x1, y1, d + 1); }
          else { const cut = y0 + small + fl(R() * (h - 2 * small - gap + 1)); split(x0, y0, x1, cut, d + 1); split(x0, cut + gap, x1, y1, d + 1); }
        };
        split(m, m, n - m, n - m, 0);
        lots.forEach((L, i) => {
          let x0 = L[0], y0 = L[1], x1 = L[2], y1 = L[3], h = n * tall * (0.15 + 0.85 * R());
          if (peak) h *= 1.5 - hyp((x0 + x1) / 2 - n / 2, (y0 + y1) / 2 - n / 2) / n * 2.2;
          h = R() < 0.1 ? 0 : mx(1, mn(n - 1, fl(h)));
          const back = R() < 0.4 ? ri(3, 7) : 0;
          for (let z = 0; z < h; z++) { if (back && z && z % back === 0 && x1 - x0 > 2 && y1 - y0 > 2) { x0++; y0++; x1--; y1--; } block(x0, y0, z, x1, y1, z + 1, 1 + i % 5); }
        });
      } },
      { id: 'Lattice', live: 1, fine: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const p = pk([3, 4, 4, 5, 6]), t = p >= 5 ? pk([1, 2]) : 1, clip = ri(0, 3), cx = n / 2, far = n / 2 - 0.5, off = ri(0, p - 1);
        solid((x, y, z) => {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, dz = z + 0.5 - cx;
          if (clip === 1 && hyp(dx, dy, dz) > far) return 0;
          if (clip === 2 && ab(dx) + ab(dy) > (n - z) * 0.5) return 0;
          if (clip === 3 && ab(dx) + ab(dy) + ab(dz) > far * 1.25) return 0;
          const a = (x + off + fl(beatNo / 9)) % p < t, b = (y + off) % p < t, e = z % p < t;
          return a && b ? 1 : b && e ? 2 : a && e ? 3 : 0;
        });
      } },
      { id: 'Ball', fam: 'Rounds', w: 3, sizes: [16, 20, 24, 32], parts: 1, go() {
        const squash = pk([1, 1, 1, 0.7, 1.3]), r = n * (0.37 + R() * 0.11) / mx(1, squash), cx = n / 2, cz = R() < 0.6 ? r * squash : mn(n - r * squash, r * squash + ri(1, 4));
        solid((x, y, z) => hyp(x + 0.5 - cx, y + 0.5 - cx, (z + 0.5 - cz) / squash) < r ? 1 : 0);
      } },
      { id: 'Swell', flat: 1, fam: 'Surfaces', w: 4, sizes: [16, 20, 24, 32], live: 1, parts: 3, go() {
        const kind = ri(0, 3), base = n * ((moving ? 0.32 : 0.42) + R() * 0.15), amp = n * (0.1 + R() * 0.14), ax = TAU / (n * (0.4 + R() * 0.6)), ay = TAU / (n * (0.4 + R() * 0.6)), run = (0.1 + R() * 0.1) * beatNo, bw = pk([1, 2, 3]), px = n * R(), py = n * R();
        ground((x, y) => base + amp * (kind === 0 ? M.sin(x * ax + run) * M.sin(y * ay + run * 0.7) : kind === 1 ? M.sin((x + y) * ax * 0.7 - run) : kind === 2 ? 0.5 * (M.sin(x * ax - run) + M.sin(y * ay - run * 1.3)) : M.sin(hyp(x - px, y - py) * ax * 1.3 - run)),
          (x, y, z, h) => 1 + fl((h - 1 - z) / bw) % 3);
      } },
      { id: 'Residue', fine: 1, fam: 'Residue', w: 4, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        const kind = ri(0, 5), m = ri(3, 9), t = mx(1, fl(m * (0.25 + R() * 0.3))), a = ri(1, 4), b = ri(1, 4), e = ri(1, 4), clip = pk([2, 3]), ox = ri(0, 7), cx = n / 2, ck = fl(beatNo / 15);
        solid((x, y, z) => {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx;
          if (clip === 1 && hyp(dx, dy, z + 0.5 - cx) > cx) return 0;
          if (clip === 2 && mx(ab(dx), ab(dy)) > (n - z) * 0.5) return 0;
          if (clip === 3 && x + y + z >= n + (n >> 1)) return 0;
          const X = x + ox, Y = y + ox, Z = z + 1;
          const v = kind === 0 ? X * X + Y * Y + Z * Z + ck : kind === 1 ? (X ^ Y ^ Z) + ck : kind === 2 ? X * Y + Y * Z + Z * X + ck : kind === 3 ? a * X + b * Y + e * Z + ck : kind === 4 ? X * Y * Z + ck : ((X * Y + ck) ^ Z);
          const r = ((v % m) + m) % m;
          return r < t ? 1 + r % 4 : 0;
        });
      } },
      { id: 'Sponge', solo: 1, fine: 1, fam: 'Residue', w: 3, sizes: [27, 18], bare: 1, parts: 3, go() {
        const unit = n === 18 ? 2 : pk([1, 1, 3]), levels = n === 18 ? 2 : unit === 1 ? 3 : 2;
        // which of a 3 x 3 x 3 block stay, by how many of the three coordinates are the middle one
        const masks = [[1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1]];
        const first = pk(masks), keep = [first, R() < 0.6 ? first : pk(masks), R() < 0.6 ? first : pk(masks)];
        solid((x, y, z) => {
          let X = fl(x / unit), Y = fl(y / unit), Z = fl(z / unit), part = 1;
          for (let l = 0; l < levels; l++) {
            const mids = (X % 3 === 1 ? 1 : 0) + (Y % 3 === 1 ? 1 : 0) + (Z % 3 === 1 ? 1 : 0);
            if (!keep[l][mids]) return 0;
            if (l === levels - 1) part = 1 + mids % 3;
            X = fl(X / 3); Y = fl(Y / 3); Z = fl(Z / 3);
          }
          return part;
        });
      } },
      { id: 'Crystal', fine: 1, fam: 'Growths', w: 3, sizes: [16, 20, 24, 32], nat: 1, bare: 1, parts: 3, go() {
        // a cell is born when the number of its six neighbours already there is in the rule; nothing dies
        // (a few cells are never born, by a hash of their place that is not the same both ways along the floor: grown from
        // one seed it would otherwise be its own mirror image to the eye, holes and all, in pairs like eyes)
        const rule = [1], afloat = R() < 0.4, gens = fl(n / 2) - 1 + (afloat ? 0 : fl(n / 3)), sd = ri(1, 9999);
        const cx = fl(n / 2), cz = afloat ? fl(n / 2) : 0, seeds = pk([1, 1, 1, 2, 3, 4]);
        let born = [];
        for (let s = 0; s < seeds; s++) { const i = at(mx(1, mn(n - 2, cx + (s ? ri(-4, 4) : 0))), mx(1, mn(n - 2, cx + (s ? ri(-4, 4) : 0))), cz); T[i] = 1; O[i] = 1; born.push(i); }
        const seen = new Uint16Array(32768);
        const count = (x, y, z) => (x > 0 && T[at(x - 1, y, z)] ? 1 : 0) + (x < n - 1 && T[at(x + 1, y, z)] ? 1 : 0) + (y > 0 && T[at(x, y - 1, z)] ? 1 : 0) + (y < n - 1 && T[at(x, y + 1, z)] ? 1 : 0) + (z > 0 && T[at(x, y, z - 1)] ? 1 : 0) + (z < n - 1 && T[at(x, y, z + 1)] ? 1 : 0);
        for (let g = 2; g <= gens + 1 && born.length; g++) {
          const next = [];
          for (const i of born) {
            const x = i & 31, y = i >> 5 & 31, z = i >> 10;
            for (let d = 0; d < 6; d++) {
              const X = x + (d === 0 ? 1 : d === 1 ? -1 : 0), Y = y + (d === 2 ? 1 : d === 3 ? -1 : 0), Z = z + (d === 4 ? 1 : d === 5 ? -1 : 0);
              if (X < 0 || Y < 0 || Z < 0 || X >= n || Y >= n || Z >= n) continue;
              const j = at(X, Y, Z);
              if (T[j] || seen[j] === g) continue;
              seen[j] = g;
              if (rule.indexOf(count(X, Y, Z)) >= 0 && knot(X + 7, Y * 3 + Z * 97, sd) > 0.12) next.push(j);
            }
          }
          for (const j of next) { T[j] = 1 + fl(g / 3) % 3; O[j] = g; }
          born = next;
        }
      } },
      { id: 'Crates', flat: 1, fam: 'Stores', w: 4, sizes: [16, 20, 24], corner: 1, nat: 1, bare: 1, parts: 3, go() {
        // a store of crates piled high in the corner and stepping down toward the eye: each crate goes as low and as far
        // back as it can, but never over the slope the pile keeps (steep or gentle)
        const top = new Int16Array(n * n), unit = pk([2, 2, 3]), big = mx(1, fl(n / (2.4 * unit))), fall = 0.42 + R() * 0.2;
        const cap = (x, y) => n * (1.04 - fall * (x + y) / n);
        for (let b = 0, miss = 0; b < 240 && miss < 30; b++) {
          const w = unit * ri(1, big), d = unit * ri(1, big), h = unit * ri(1, big);
          let bx = -1, by = 0, bz = 0, best = 1e9;
          for (let tries = 0; tries < 14; tries++) {
            const x0 = unit * ri(0, fl((n - w) / unit)), y0 = unit * ri(0, fl((n - d) / unit));
            let z0 = 0;
            for (let y = y0; y < y0 + d; y++) for (let x = x0; x < x0 + w; x++) z0 = mx(z0, top[y * n + x]);
            if (z0 + h > n || z0 + h > cap(x0 + w / 2, y0 + d / 2)) continue;
            const score = z0 * 1.2 + x0 + y0 + R() * 3;
            if (score < best) { best = score; bx = x0; by = y0; bz = z0; }
          }
          if (bx < 0) { miss++; continue; }
          for (let z = bz; z < bz + h; z++) for (let y = by; y < by + d; y++) for (let x = bx; x < bx + w; x++) { T[at(x, y, z)] = b % 5 === 2 ? 2 : b % 7 === 4 ? 3 : 1; O[at(x, y, z)] = b * 32 + z; }
          for (let y = by; y < by + d; y++) for (let x = bx; x < bx + w; x++) top[y * n + x] = bz + h;
        }
      } },
      { id: 'Carving', live: 1, fam: 'Rounds', w: 4, sizes: [16, 20, 24], bare: 1, parts: 2, go() {
        const cx = n / 2, shape = (k, x0, y0, z0, r) => (x, y, z) => {
          const dx = x + 0.5 - x0, dy = y + 0.5 - y0, dz = z + 0.5 - z0;
          return k === 0 ? mx(ab(dx), ab(dy), ab(dz)) < r : k === 1 ? hyp(dx, dy, dz) < r * 1.2 : k === 2 ? hyp(dx, dy) < r && ab(dz) < r : k === 3 ? ab(dx) + ab(dy) + ab(dz) < r * 1.5 : k === 4 ? hyp(dy, dz) < r * 0.8 : k === 5 ? hyp(dx, dz) < r * 0.8 : mx(ab(dx), ab(dy)) < r * (0.5 - dz / r * 0.5);
        };
        const op0 = pk([0, 0, 0, 1, 2, 2]), op = moving ? 0 : op0, ka = ri(0, 3), ra = n * (op === 1 ? 0.3 : 0.4 + R() * 0.07) / (ka === 1 ? 1.2 : ka === 3 ? 1.5 * 0.67 : 1), A = shape(ka, cx, cx, n * 0.47, ra);
        let kb = ri(0, 6); if (kb === ka) kb = (kb + 1) % 7;
        const rb = ra * (op === 2 ? 0.8 + R() * 0.35 : 0.55 + R() * 0.4), off = op === 2 ? 0 : ra * (0.55 + R() * 0.5), sx = pk([0, 1, 1]), sy = pk([0, 1, 1]), sz = sx + sy === 0 ? 1 : pk([0, 1, 1]);
        const turn = beatNo * 0.025, B = moving ? shape(kb, cx + off * 1.1 * M.cos(turn), cx + off * 1.1 * M.sin(turn), n * 0.47 + off * sz, rb) : shape(kb, cx + off * sx, cx + off * sy, n * 0.47 + off * sz, rb);
        solid((x, y, z) => { const a = A(x, y, z), b = B(x, y, z); return op === 0 ? (a && !b ? 1 : 0) : op === 1 ? (a ? 1 : b ? 2 : 0) : (a && b ? 1 : 0); });
        // where one was cut out of the other, the cut face is its own part
        if (op === 0) solid((x, y, z) => T[at(x, y, z)] && (B(x + 1, y, z) || B(x, y + 1, z) || B(x, y, z + 1) || B(x - 1, y, z) || B(x, y - 1, z) || B(x, y, z - 1)) ? 2 : 0);
      } },
      { id: 'Scree', fam: 'Heaps', w: 2, sizes: [16, 20, 24], corner: 1, parts: 3, go() {
        const sd = ri(1, 9999), lam = n * (0.2 + R() * 0.2), slope = 0.5 + R() * 0.5, lift = n * (0.75 + R() * 0.3), amp = n * (0.2 + R() * 0.25);
        ground((x, y) => lift - (x + y) * slope + amp * (fbm(x / lam, y / lam, sd) - 0.5), (x, y, z) => 1 + fl(fbm(x / 3 + z * 0.4, y / 3 - z * 0.3, sd + 5) * 3.2) % 3);
      } },
      { id: 'Steps', flat: 1, fam: 'Steps', w: 3, sizes: [12, 16, 20, 24], corner: 1, parts: 2, go() {
        const kind = ri(0, 3), tread = ri(1, 3), rise = ri(1, 2), top = n - ri(0, fl(n / 4));
        ground((x, y) => top - fl((kind === 0 ? mx(x, y) : kind === 1 ? x + y : kind === 2 ? x : mn(x, y) + mx(x, y) * 0.5) / tread) * rise, (x, y, z, h) => 1 + (fl(h / rise) & 1));
      } },
      { id: 'Spiral Stair', live: 1, solo: 1, fam: 'Steps', w: 3, sizes: [20, 24, 24], bare: 1, parts: 3, go() {
        // narrow treads winding round a post inside a round tower whose near quarter is open to the eye (treads alone,
        // turned, read as arms or as a letter)
        const cx = n / 2, core = 1 + R() * 1.6, reach = n * (0.34 + R() * 0.1), rise = pk([1, 1, 2]), per = ri(10, 14), thick = ri(1, 2), dir = R() < 0.5 ? 1 : -1, slit = ri(3, 5);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, r = hyp(dx, dy);
          if (r < core) { for (let z = 0; z < n - 1; z++) T[at(x, y, z)] = 3; continue; }
          if (r >= reach && r < reach + 1.25 && (dx < 0 || dy < 0)) { for (let z = 0; z < n - 1; z++) if (z % slit !== slit - 1 || ((x + y) & 3)) T[at(x, y, z)] = 3; continue; }
          if (r > reach) continue;
          const s = fl((((M.atan2(dy, dx) * dir / TAU + beatNo * 0.008) % 1) + 1) % 1 * per);
          for (let turn = 0; ; turn++) { const zs = (s + turn * per) * rise; if (zs >= n - 1) break; for (let q = 0; q < thick; q++) if (zs - q >= 0) T[at(x, y, zs - q)] = 1 + (s & 1); }
        }
      } },
      { id: 'Amphitheatre', flat: 1, fam: 'Steps', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const cx = n / 2, round = R() < 0.6, arena = n * (0.1 + R() * 0.1), tread = ri(1, 2), rise = tread + ri(0, 1), reach = n / 2 - ri(0, 1), cut = R() < 0.7 ? arena * (0.5 + R()) : 99;
        ground((x, y) => {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, d = round ? hyp(dx, dy) : mx(ab(dx), ab(dy));
          if (d > reach || dx + dy > cut) return 0;
          return d < arena ? 1 : 1 + (fl((d - arena) / tread) + 1) * rise;
        }, (x, y, z, h) => h === 1 ? 3 : 1 + (fl(h / rise) & 1));
      } },
      { id: 'Octahedron', fam: 'Steps', w: 2.5, sizes: [16, 20, 24, 32], parts: 2, go() {
        const cx = n / 2, half = R() < 0.5, zs = half ? pk([1, 0.8, 0.7, 0.7]) : pk([1, 1, 1.4]), far = n / 2 - 0.5, cz = half ? 0 : far / zs, st = pk([1, 1, 2, 3]);
        solid((x, y, z) => { const X = fl(x / st) * st + st / 2, Y = fl(y / st) * st + st / 2, Z = fl(z / st) * st + st / 2; return ab(X - cx) + ab(Y - cx) + ab(Z - cz) * zs <= far ? 1 + (fl(z / st) & 1) : 0; });
      } },
      { id: 'Terraces', live: 1, flat: 1, fam: 'Grounds', w: 3, sizes: [16, 20, 24, 32], corner: 1, parts: 4, go() {
        const sd = ri(1, 9999), lam = n * (0.3 + R() * 0.3), amp = n * (0.5 + R() * 0.4), step = pk([1, 2, 2, 3, 4]), tilt = 0.15 + R() * 0.3;
        ground((x, y) => mx(step, fl((fbm(x / lam + beatNo * 0.012, y / lam, sd) * amp + tilt * (2 * n - x - y) * 0.5) / step) * step), (x, y, z, h) => 1 + fl(h / step) % 4);
      } },
      { id: 'Mesa', flat: 1, fam: 'Grounds', w: 2.5, sizes: [16, 20, 24, 32], corner: 1, parts: 3, go() {
        const sd = ri(1, 9999), lam = n * (0.25 + R() * 0.25), l1 = ri(2, fl(n / 4)), l2 = l1 + ri(3, fl(n / 3)), l3 = l2 + ri(3, fl(n / 3)), t1 = 0.4 + R() * 0.1, t2 = t1 + 0.1 + R() * 0.08;
        ground((x, y) => { const v = fbm(x / lam, y / lam, sd) + (2 * n - x - y) / n * 0.12; return v > t2 ? l3 : v > t1 ? l2 : l1; }, (x, y, z, h) => h === l3 ? 3 : h === l2 ? 2 : 1);
      } },
      { id: 'Spire', cone: 1, lamp: 1, fam: 'Towers', w: 4.5, sizes: [16, 20, 24, 32], parts: 3, go() {
        const cx = fl(n / 2); let w = ri(fl(n / 6), fl(n / 3.2)), z = ri(1, 2);
        block(cx - w - 2, cx - w - 2, 0, cx + w + 2, cx + w + 2, z, 3);
        while (w >= 1 && z < n - 2) {
          const seg = ri(2, mx(3, fl(n / 3.5)));
          block(cx - w, cx - w, z, cx + w, cx + w, z + seg, 1 + (w & 1));
          if (R() < 0.5 && w > 1 && z < n * 0.3) for (const s of [-1, 1]) { block(cx + s * w - (s < 0 ? 1 : 0), cx - 1, z, cx + s * w + (s > 0 ? 1 : 0), cx + 1, z + fl(seg / 2), 3); block(cx - 1, cx + s * w - (s < 0 ? 1 : 0), z, cx + 1, cx + s * w + (s > 0 ? 1 : 0), z + fl(seg / 2), 3); }
          z += seg; w -= ri(1, mx(1, fl(w / 3)));
        }
        block(cx - 1, cx - 1, z, cx, cx, n - 1, 3); put(cx - 1, cx - 1, n - 1, LAMP);
      } },
      { id: 'Organ', live: 1, flat: 1, fam: 'Towers', w: 3, sizes: [12, 16, 20, 24], parts: 3, go() {
        const p = pk([2, 3, 3, 4]), q = mx(1, p - ri(1, 2)), a = ri(1, 5), b = ri(1, 5), m = ri(3, 9), u = mx(1, fl((n - 3) / m)), base = ri(1, 3), wavy = R() < 0.45 || moving, off = ri(0, m), f1 = 0.3 + R() * 0.7, f2 = 0.3 + R() * 0.7;
        for (let j = 0; j * p + q <= n; j++) for (let i = 0; i * p + q <= n; i++) {
          const h = wavy ? base + fl((n - base - 1) * (moving ? 0.6 + 0.22 * M.sin(i * f1 + j * f2 + off + beatNo * 0.07) : 0.5 + 0.5 * M.sin(i * f1 + j * f2 + off))) : base + ((a * i + b * j + off) % m) * u;
          block(i * p, j * p, 0, i * p + q, j * p + q, h, 1 + (i + j) % 3);
        }
      } },
      { id: 'Hall', flat: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 2, go() {
        const floors = ri(2, mx(2, fl(n / 5))), fh = mx(3, fl((n - 1) / floors)), p = pk([3, 4, 5]), m = ri(0, 2), shrink = R() < 0.45;
        for (let f = 0; f < floors; f++) {
          const z0 = f * fh, ins = m + (shrink ? f : 0);
          if (n - 2 * ins < 4) break;
          for (let y = ins; y < n - ins; y += p) for (let x = ins; x < n - ins; x += p) block(x, y, z0, x + 1, y + 1, z0 + fh - 1, 2);
          block(ins, ins, z0 + fh - 1, n - ins, n - ins, z0 + fh, 1);
        }
      } },
      { id: 'Pagoda', fam: 'Towers', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const cx = n / 2, eave = ri(1, 2), bh = ri(2, 4), taper = 0.74 + R() * 0.14; let w = n * (0.3 + R() * 0.1), z = 1;
        block(cx - w - 2, cx - w - 2, 0, cx + w + 2, cx + w + 2, 1, 3);
        while (w >= 1 && z + bh + 1 < n) {
          block(cx - w, cx - w, z, M.ceil(cx + w), M.ceil(cx + w), z + bh, 1); z += bh;
          block(fl(cx - w) - eave, fl(cx - w) - eave, z, M.ceil(cx + w) + eave, M.ceil(cx + w) + eave, z + 1, 2); z++;
          w *= taper;
        }
        block(cx - 0.5, cx - 0.5, z, cx + 0.5, cx + 0.5, z + ri(2, 4), 3);
      } },
      { id: 'Plates', live: 1, flat: 1, fam: 'Stores', w: 3, sizes: [12, 16, 20, 24], bare: 1, parts: 4, go() {
        let x = n / 2, y = n / 2, z = 0, s = n * (0.28 + R() * 0.16), i = 0; const t = pk([1, 1, 2]), gap = pk([0, 0, 1]), wander = R() * 3.2;
        while (z + t <= n) {
          const hw = mx(1.5, s);
          const lean = moving ? 1.7 * M.sin(beatNo * 0.05 + z * 0.33) : 0;
          block(x - hw + lean, y - hw, z, x + hw + lean, y + hw, z + t, 1 + i++ % 4);
          z += t + gap; x = mx(hw, mn(n - hw, x + (R() - 0.5) * wander)); y = mx(hw, mn(n - hw, y + (R() - 0.5) * wander)); s = mx(1.5, mn(n * 0.46, s * (0.88 + R() * 0.24)));
        }
      } },
      { id: 'Chimneys', fam: 'Towers', w: 2.5, sizes: [12, 16, 20, 24], bare: 1, parts: 5, go() {
        // a stack of flues crowded together on one hearth, the tallest at the back
        const count = ri(5, 8) + push, area = fl(n * 0.75), m = (n - area) >> 1;
        for (let i = 0; i < count; i++) {
          const w = ri(3, mx(3, fl(n / 3))), x0 = m + ri(0, mx(0, area - w)), y0 = m + ri(0, mx(0, area - w)), back = 1 - (x0 + y0 - 2 * m) / mx(1, 2 * (area - w)), h = mn(n - 1, mx(fl(n * 0.4), fl((n - 1) * (0.6 + 0.4 * back) - R() * n * 0.2)));
          for (let z = 0; z < h; z++) for (let y = y0; y < y0 + w; y++) for (let x = x0; x < x0 + w; x++) if (x === x0 || y === y0 || x === x0 + w - 1 || y === y0 + w - 1) T[at(x, y, z)] = 1 + i % 5;
        }
      } },
      { id: 'Cube Frames', solo: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const count = ri(1, 4), t = n >= 24 ? pk([1, 2]) : 1, a = ri(0, 1), inward = mx(t + 1, fl((n / 2 - a) / (count + 0.3)));
        for (let i = 0; i < count; i++) {
          const lo = a + i * inward, hi = n - 1 - a - i * inward;
          if (hi - lo < 2 * t + 1) break;
          for (let z = lo; z <= hi; z++) for (let y = lo; y <= hi; y++) for (let x = lo; x <= hi; x++) if ((x < lo + t || x > hi - t ? 1 : 0) + (y < lo + t || y > hi - t ? 1 : 0) + (z < lo + t || z > hi - t ? 1 : 0) >= 2) T[at(x, y, z - a)] = 1 + i % 3;
        }
      } },
      { id: 'Arcade', solo: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 2, go() {
        const tiers = ri(1, 3), th = fl((n - 1) / tiers), spanW = pk([3, 4, 5, 6]), pier = pk([1, 1, 2]), thick = pk([1, 2, 3]), both = R() < 0.55, round = R() < 0.7, at0 = fl(n / 2) - (thick >> 1) - (both ? 0 : ri(0, 3));
        const run = (alongX, at0) => {
          for (let tier = 0; tier < tiers; tier++) for (let u = 0; u < n; u++) for (let zz = 0; zz < th; zz++) {
            const m = u % (spanW + pier), mid = pier + (spanW - 1) / 2, dm = ab(m - mid);
            const open = m >= pier && zz < th - 2 - (round ? spanW / 2 - M.sqrt(mx(0, spanW * spanW / 4 - dm * dm)) : 0);
            if (!open) for (let q = 0; q < thick; q++) alongX ? put(u, at0 + q, tier * th + zz, 1 + (tier & 1)) : put(at0 + q, u, tier * th + zz, 1 + (tier & 1));
          }
        };
        // a second one crosses it near an end, never through its middle (a cross of two arcades, turned, reads as a figure)
        run(true, at0); if (both) run(false, R() < 0.5 ? 1 : n - 1 - thick);
      } },
      { id: 'Gates', solo: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 2, go() {
        const count = ri(3, 7), sp = mx(2, fl(n / count)), t = n >= 20 ? pk([1, 2]) : 1, grow = R() < 0.65 ? mx(1, fl(n / (2.4 * count))) : 0, deep = pk([1, 1, 2]);
        for (let i = 0; i < count; i++) {
          const y0 = fl(sp / 2) + i * sp, m = (count - 1 - i) * grow, top = n - 1 - m;
          if (y0 >= n || n - 2 * m < 2 * t + 2) continue;
          for (let d = 0; d < deep; d++) for (let z = 0; z < top; z++) for (let x = m; x < n - m; x++) if (x < m + t || x >= n - m - t || z >= top - t) put(x, y0 + d, z, 1 + (i & 1));
        }
      } },
      { id: 'Bridge', solo: 1, lamp: 1, fam: 'Frames', w: 2.5, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const w = ri(2, mx(2, fl(n / 4))), y0 = fl(n / 2) - (w >> 1), deck = ri(fl(n * 0.4), fl(n * 0.7)), spans = ri(1, 3), sp = n / spans, rail = R() < 0.6;
        // most often a second bridge crosses the first, over it or under it, so the two fill the floor both ways
        const cross = R() < 0.7, deck2 = deck + 6 < n ? deck + 4 : deck - 4;
        const run = (deck, along) => {
          const P = (x, y, z, p) => along ? put(y, x, z, p) : put(x, y, z, p);
          for (let x = 0; x < n; x++) {
            const m = ((x + 0.5) % sp) / sp - 0.5, under = (deck - 1) * M.sqrt(mx(0, 1 - (2 * m / 0.84) * (2 * m / 0.84)));
            for (let z = 0; z <= deck; z++) if (z === deck || z >= under) for (let q = 0; q < w; q++) P(x, y0 + q, z, z === deck ? 2 : 1);
            if (rail && (x & 1)) { P(x, y0, deck + 1, 3); P(x, y0 + w - 1, deck + 1, 3); if (x % 4 === 1) { P(x, y0, deck + 2, LAMP); P(x, y0 + w - 1, deck + 2, LAMP); } }
          }
        };
        if (cross && deck2 >= 3 && deck2 < deck) run(deck2, 1);
        run(deck, 0);
        if (cross && deck2 > deck) run(deck2, 1);
      } },
      { id: 'Hoops', live: 1, fam: 'Rounds', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const cx = n / 2;
        if (R() < 0.55 || moving) {
          // a vase of hoops, one above another
          const round = R() < 0.55, k1 = 1 + R() * 3, ph = R() * TAU, t = pk([1, 1, 2]), gap = pk([0, 1, 1, 2]);
          for (let z = 0, i = 0; z < n - 1; z += 1 + gap, i++) {
            const r = n * (moving ? 0.31 + 0.12 * (0.5 + 0.5 * M.sin(z / n * k1 * 3 + ph - beatNo * 0.06)) : 0.24 + 0.22 * (0.5 + 0.5 * M.sin(z / n * k1 * 3 + ph)));
            for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const d = round ? hyp(x + 0.5 - cx, y + 0.5 - cx) : mx(ab(x + 0.5 - cx), ab(y + 0.5 - cx)); if (d < r && d >= r - t) T[at(x, y, z)] = 1 + (i & 1); }
          }
        } else {
          // three hoops through one another
          const r = n / 2 - 1.5, t = n >= 20 ? 1.7 : 1.2;
          solid((x, y, z) => { const dx = x + 0.5 - cx, dy = y + 0.5 - cx, dz = z + 0.5 - cx; return ab(hyp(dx, dy) - r) < t && ab(dz) < t ? 1 : ab(hyp(dy, dz) - r * 0.8) < t && ab(dx) < t ? 2 : ab(hyp(dx, dz) - r * 0.6) < t && ab(dy) < t ? 3 : 0; });
        }
      } },
      { id: 'Screen', solo: 1, still: 1, fam: 'Frames', w: 2.5, sizes: [16, 20, 24, 32], bare: 1, parts: 2, go() {
        // a pierced screen that is never seen edge-on: two that cross, or one folded back and forth across the floor
        const t = pk([1, 2, 2]), p = pk([3, 4, 5]), hole = p - pk([1, 2]), top = n - ri(1, 4), fold = R() < 0.5;
        const shut = (u, z) => !(u % p >= p - hole && z % p >= p - hole && z < top - 1);
        const slab = (alongX, a0, part) => { for (let u = 0; u < n; u++) for (let z = 0; z < top; z++) if (shut(u, z)) for (let q = 0; q < t; q++) alongX ? put(u, a0 + q, z, part) : put(a0 + q, u, z, part); };
        if (!fold) { slab(true, fl(n / 2) - ri(0, 4), 1); slab(false, fl(n / 2) - ri(0, 4), 2); return; }
        // the leaves turn a right angle each, one along the floor one way and the next back the other, so the screen runs across the picture
        const pw = mx(3, fl((n - t) / pk([2, 2, 3])));
        for (let i = 0, x = 0, y = n - t; x + pw <= n && y >= 0; i++) {
          for (let u = 0; u <= pw; u++) for (let z = 0; z < top; z++) if (shut(u, z)) for (let q = 0; q < t; q++) i & 1 ? put(x + q, y + t - 1 - u, z, 2) : put(x + u, y + q, z, 1);
          if (i & 1) y -= pw; else x += pw;
        }
      } },
      { id: 'Dome', fam: 'Rounds', w: 3, sizes: [16, 20, 24, 32], parts: 2, go() {
        const r = n * (0.34 + R() * 0.13), cx = n / 2, drum = ri(1, mx(1, fl(n - r - 2))), bowl = R() < 0.25;
        solid((x, y, z) => {
          const d = hyp(x + 0.5 - cx, y + 0.5 - cx);
          if (bowl) { const e = hyp(d, z + 0.5 - r - 1); return e < r && e >= r - 2 && z < r ? 1 : d < r * 0.35 && z < 1 ? 2 : 0; }
          return z < drum ? (d < r ? 2 : 0) : hyp(d, z + 0.5 - drum) < r ? 1 : 0;
        });
      } },
      { id: 'Torus', fam: 'Rounds', w: 3, sizes: [16, 20, 24, 32], parts: 1, go() {
        const axis = R() < 0.25 ? 0 : ri(1, 2), big = n * (0.28 + R() * 0.07), r = n * (0.09 + R() * 0.07), cx = n / 2, cz = axis === 0 ? r + (R() < 0.4 ? ri(1, fl(n / 3)) : 0) : big + r;
        solid((x, y, z) => { const dx = x + 0.5 - cx, dy = y + 0.5 - cx, dz = z + 0.5 - cz; return (axis === 0 ? hyp(hyp(dx, dy) - big, dz) : axis === 1 ? hyp(hyp(dy, dz) - big, dx) : hyp(hyp(dx, dz) - big, dy)) < r ? 1 : 0; });
      } },
      { id: 'Turning', live: 1, fam: 'Rounds', w: 4, sizes: [16, 20, 24, 32], parts: 2, go() {
        const kind0 = ri(0, 6), kind = moving ? 3 : kind0, cx = n / 2, top = n - ri(1, 3), wide = n * (0.3 + R() * 0.17), tube = R() < 0.3 ? 0.6 : 0, k1 = 1 + R() * 2.5, ph = R() * TAU, bw = pk([1, 2, 3, 99]);
        const rad = v => kind === 0 ? 1 : kind === 1 ? 1 - v * 0.96 : kind === 2 ? 0.3 + 0.7 * ab(2 * v - 1) : kind === 3 ? 0.62 + 0.38 * M.sin(v * k1 * TAU + ph - beatNo * 0.05) : kind === 4 ? M.sqrt(mx(0, 1 - (2 * v - 1) * (2 * v - 1))) : kind === 5 ? M.pow(M.sin(v * M.PI), 0.6) * (1 - 0.35 * v) : 0.22 + 0.78 * v;
        solid((x, y, z) => { if (z >= top) return 0; const d = hyp(x + 0.5 - cx, y + 0.5 - cx), rr = wide * rad((z + 0.5) / top); return d < rr && d >= rr * tube ? 1 + (fl(z / bw) & 1) : 0; });
      } },
      { id: 'Molecule', solo: 1, fam: 'Rounds', w: 3, sizes: [16, 20, 24], bare: 1, parts: 6, go() {
        const count = ri(3, 6) + push, g = fl(n / 4), pts = [];
        for (let i = 0; i < count; i++) pts.push([ri(1, 3) * g, ri(1, 3) * g, mx(3, ri(1, 3) * g - fl(g / 2)), 2.4 + R() * (n / 7)]);
        for (let i = 1; i < count; i++) {
          const a = pts[i - 1], b = pts[i]; let x = a[0], y = a[1], z = a[2];
          while (x !== b[0]) { put(x, y, z, 6); x += x < b[0] ? 1 : -1; } while (y !== b[1]) { put(x, y, z, 6); y += y < b[1] ? 1 : -1; } while (z !== b[2]) { put(x, y, z, 6); z += z < b[2] ? 1 : -1; }
        }
        pts.forEach((p, i) => ball(p[0] + 0.5, p[1] + 0.5, p[2] + 0.5, p[3], 1 + i % 5));
      } },
      { id: 'Bubbles', fam: 'Rounds', w: 3, sizes: [16, 20, 24], bare: 1, parts: 3, go() {
        // each comes to rest at the lowest of a few places, the nearer the middle the better, so they heap into one foam;
        // most are of the first colour, every third of the second, the last of the third
        const count = ri(5, 11) + 2 * push, top = new Float32Array(n * n);
        for (let i = 0; i < count; i++) {
          const r = n * (0.13 + R() * 0.15);
          let x = 0, y = 0, z = 1e9;
          let sc = 1e9;
          for (let t = 0; t < 4; t++) { const X = r + R() * (n - 2 * r), Y = r + R() * (n - 2 * r), Z = mn(n - r, top[fl(Y) * n + fl(X)] * 0.75 + r), S = Z + 0.45 * hyp(X - n / 2, Y - n / 2); if (S < sc) { sc = S; x = X; y = Y; z = Z; } }
          ball(x, y, z, r, i % 3 === 2 ? 2 : i === count - 1 ? 3 : 1);
          for (let yy = fl(y - r); yy <= y + r; yy++) for (let xx = fl(x - r); xx <= x + r; xx++) if (xx >= 0 && yy >= 0 && xx < n && yy < n && hyp(xx - x, yy - y) < r) top[yy * n + xx] = mx(top[yy * n + xx], z + r * 0.6);
        }
      } },
      { id: 'Ripple', flat: 1, fam: 'Surfaces', w: 3, sizes: [16, 20, 24, 32], live: 1, parts: 3, go() {
        const px = n * (0.2 + R() * 0.6), py = n * (0.2 + R() * 0.6), base = n * ((moving ? 0.28 : 0.4) + R() * 0.12), amp = n * (0.1 + R() * 0.12), kk = TAU / (n * (0.2 + R() * 0.25)), run = (0.14 + R() * 0.1) * beatNo, fade = 0.5 + R(), bw = pk([1, 2]);
        ground((x, y) => { const d = hyp(x - px, y - py); return base + amp * M.cos(d * kk - run) / (1 + d / n * fade * 3); }, (x, y, z, h) => 1 + fl((h - 1 - z) / bw) % 3);
      } },
      { id: 'Saddle', live: 1, fam: 'Surfaces', w: 2.5, sizes: [16, 20, 24, 32], parts: 2, go() {
        // (its high sides to the left and right of the eye: high at the back and the front, it reads as a flat triangle)
        const cx = n / 2, kind = pk([0, 0, 2]), t = pk([1, 2, 2]), mid = n * (0.42 + R() * 0.1), bend = (0.55 + R() * 0.4) / (n / 2) * (moving ? M.cos(beatNo * 0.04) : 1), below = R() < 0.4;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, zc = fl(mid + (kind === 0 ? (dx * dx - dy * dy) * bend * 0.8 : kind === 1 ? dx * dy * bend * 1.3 : (dx * dx * dx - 3 * dx * dy * dy) * bend * bend * 0.7));
          for (let z = below ? 0 : zc; z < zc + t; z++) put(x, y, z, z >= zc ? 1 : 2);
        }
      } },
      { id: 'Ramp', live: 1, fam: 'Steps', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        // a ramp winding round a post, at least three turns of it: a turn or two with no post reads as a letter
        const cx = n / 2, r0 = n * (0.06 + R() * 0.12), r1 = n * (0.36 + R() * 0.12), pitch = ri(4, mx(5, fl(n / 3))), t = pk([1, 1, 2]), dir = R() < 0.5 ? 1 : -1;
        solid((x, y, z) => {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, d = hyp(dx, dy);
          if (d < r0) return z < n - 1 ? 3 : 0;
          if (d > r1) return 0;
          const lift = z - ((((M.atan2(dy, dx) * dir / TAU + beatNo * 0.006) % 1) + 1) % 1) * pitch;
          return ((lift % pitch) + pitch) % pitch < t ? 1 + (fl(lift / pitch) & 1) : 0;
        });
      } },
      { id: 'Gyroid', fine: 1, fam: 'Surfaces', w: 4, sizes: [16, 20, 24, 32], live: 1, bare: 1, parts: 2, go() {
        const kind = ri(0, 2), lam = mx(10, n / pk([1, 1.5, 2, 2.5])), w = 0.36 + R() * 0.34, sheet = R() < 0.5, clip = ri(0, 2), cx = n / 2, ox = R() * TAU, slide = 1.4 * M.sin(beatNo * 0.03);
        const sX = [], cX = [], sY = [], cY = [], sZ = [], cZ = [];
        for (let i = 0; i < n; i++) { const X = (i + 0.5) / lam * TAU + ox + slide, Y = (i + 0.5) / lam * TAU + ox * 1.7, Z = (i + 0.5) / lam * TAU + slide * 0.6; sX.push(M.sin(X)); cX.push(M.cos(X)); sY.push(M.sin(Y)); cY.push(M.cos(Y)); sZ.push(M.sin(Z)); cZ.push(M.cos(Z)); }
        solid((x, y, z) => {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cx, dz = z + 0.5 - cx;
          if (clip === 1 && dx * dx + dy * dy + dz * dz > cx * cx) return 0;
          if (clip === 2 && dx * dx + dy * dy > cx * cx) return 0;
          const g = kind === 0 ? sX[x] * cY[y] + sY[y] * cZ[z] + sZ[z] * cX[x] : kind === 1 ? cX[x] + cY[y] + cZ[z] : sX[x] * sY[y] * sZ[z] + sX[x] * cY[y] * cZ[z] + cX[x] * sY[y] * cZ[z] + cX[x] * cY[y] * sZ[z];
          return (sheet ? ab(g) < w : g > w - 0.5) ? (g > 0 ? 1 : 2) : 0;
        });
      } },
      { id: 'Dunes', flat: 1, fam: 'Surfaces', w: 2.5, sizes: [16, 20, 24, 32], live: 1, parts: 2, go() {
        const lam = n * (0.3 + R() * 0.3), amp = n * (0.22 + R() * 0.22), base = n * ((moving ? 0.12 : 0.24) + R() * 0.1), wob = R() * 4, ky = TAU / (n * (0.5 + R())), sk = 0.2 + R() * 0.25, run = beatNo * 0.12;
        ground((x, y) => { let u = ((x + wob * M.sin(y * ky) + run) / lam) % 1; if (u < 0) u++; return base + amp * (u < 1 - sk ? u / (1 - sk) : (1 - u) / sk); }, (x, y, z) => 1 + (z & 1));
      } },
      { id: 'Bit Pyramid', cone: 1, solo: 1, fam: 'Residue', w: 3, sizes: [16, 16, 32], bare: 1, parts: 3, go() {
        // a stepped pyramid on the floor made of five of itself at half the size, four standing on the ground and one on
        // their shoulders, down to small solid ones; each step is one cube in and one up (or one and two by turns, steeper),
        // so every tier has a lit top
        const steep = n === 32 || R() < 0.8, H = m => steep ? m + (m >> 1) : m, least = n === 32 ? 8 : pk([2, 4, 4]), wide = R() < 0.4;
        const pyr = (x0, y0, z0, B, d) => {
          if (B <= least) { for (let l = 0; l < B / 2; l++) block(x0 + l, y0 + l, z0 + H(l), x0 + B - l, y0 + B - l, z0 + H(l + 1), 1 + d % 3); return; }
          const h = B / 2;
          for (let q = 0; q < 4; q++) pyr(x0 + (q & 1) * h, y0 + (q >> 1) * h, z0, h, d + (wide && q === 0 ? 1 : 0));
          pyr(x0 + h / 2, y0 + h / 2, z0 + H(h / 2), h, d + 1);
        };
        pyr(0, 0, 0, n, 0);
      } },
      { id: 'Coral', solo: 1, fam: 'Growths', w: 4, sizes: [16, 20, 24, 32], nat: 1, bare: 1, parts: 3, go() {
        const cx = fl(n / 2), leafy = R() < 0.55; let step = 1;
        const grow = (x, y, z, dx, dy, dz, len, depth, th) => {
          for (let i = 0; i < len; i++) {
            if (x < 0 || y < 0 || z < 0 || x >= n || y >= n || z >= n) return;
            for (let a = 0; a < th; a++) for (let b = 0; b < th; b++) { const X = x + (dx ? 0 : a), Y = y + (dy ? 0 : (dx ? a : b)), Z = z + (dz ? 0 : b); if (X < n && Y < n && Z < n) { T[at(X, Y, Z)] = 1; O[at(X, Y, Z)] = step; } }
            step++; x += dx; y += dy; z += dz;
          }
          if (depth <= 0) { if (leafy) { const r = 2 + R() * (n / 6); for (let Z = fl(z - r); Z <= z + r; Z++) for (let Y = fl(y - r); Y <= y + r; Y++) for (let X = fl(x - r); X <= x + r; X++) if (X >= 0 && Y >= 0 && Z >= 0 && X < n && Y < n && Z < n && hyp(X - x, Y - y, Z - z) < r && !T[at(X, Y, Z)]) { T[at(X, Y, Z)] = 2 + (depth & 1); O[at(X, Y, Z)] = step + fl(hyp(X - x, Y - y, Z - z)); } step += 3; } return; }
          const kids = ri(2, 4);
          for (let q = 0; q < kids; q++) {
            const up = R() < 0.32, d = ri(0, 3), ndx = up ? 0 : d === 0 ? 1 : d === 1 ? -1 : 0, ndy = up ? 0 : d === 2 ? 1 : d === 3 ? -1 : 0;
            if (!up && ndx === -dx && ndy === -dy) continue;
            grow(x, y, z, ndx, ndy, up ? 1 : 0, mx(2, fl(len * (up ? 0.55 + R() * 0.35 : 0.75 + R() * 0.3))), depth - 1, mx(1, th - (R() < 0.6 ? 1 : 0)));
          }
        };
        // it spreads as wide as it stands tall
        grow(cx, cx, 0, 0, 0, 1, ri(fl(n / 4), fl(n / 3)), n >= 24 ? 5 : 4, n >= 24 ? 3 : 2);
      } },
      { id: 'Pipes', solo: 1, fam: 'Growths', w: 2, sizes: [16, 20, 24], nat: 1, bare: 1, parts: 6, go() {
        const th = n >= 20 ? pk([1, 2]) : 1, cell = th + ri(1, 2), m = fl(n / cell), used = new Uint8Array(m * m * m), count = ri(2, 6); let step = 1;
        const lay = (a, b, e, part) => { for (let z = 0; z < th; z++) for (let y = 0; y < th; y++) for (let x = 0; x < th; x++) { const i = at(a + x, b + y, e + z); if (a + x < n && b + y < n && e + z < n) { T[i] = part; O[i] = step; } } step++; };
        for (let p = 0; p < count; p++) {
          let x = ri(0, m - 1), y = ri(0, m - 1), z = ri(0, m - 1), d = ri(0, 5);
          if (used[(z * m + y) * m + x]) continue;
          used[(z * m + y) * m + x] = 1; lay(x * cell, y * cell, z * cell, 1 + p % 6);
          for (let s = 0; s < m * m * 2; s++) {
            let moved = false;
            for (let tries = 0; tries < 7 && !moved; tries++) {
              const nd = tries === 0 && R() < 0.62 ? d : ri(0, 5), X = x + (nd === 0 ? 1 : nd === 1 ? -1 : 0), Y = y + (nd === 2 ? 1 : nd === 3 ? -1 : 0), Z = z + (nd === 4 ? 1 : nd === 5 ? -1 : 0);
              if (X < 0 || Y < 0 || Z < 0 || X >= m || Y >= m || Z >= m || used[(Z * m + Y) * m + X]) continue;
              for (let q = 1; q <= cell; q++) lay(x * cell + (X - x) * q, y * cell + (Y - y) * q, z * cell + (Z - z) * q, 1 + p % 6);
              x = X; y = Y; z = Z; d = nd; used[(z * m + y) * m + x] = 1; moved = true;
            }
            if (!moved) break;
          }
        }
      } },
      { id: 'Shelves', solo: 1, fam: 'Stores', w: 3, sizes: [16, 20, 24], bare: 1, parts: 6, go() {
        const colsN = ri(2, 5), rowsN = ri(2, 5), deep = ri(3, fl(n / 2)), cw = fl((n - 1 - ri(0, 3)) / colsN), rh = fl((n - 1 - ri(0, 3)) / rowsN), y0 = fl((n - deep) / 2);
        for (let z = 0; z <= rowsN * rh; z++) for (let x = 0; x <= colsN * cw; x++) for (let y = y0; y < y0 + deep; y++) if (x % cw === 0 || z % rh === 0 || y === y0) put(x, y, z, 1);
        for (let j = 0; j < rowsN; j++) for (let i = 0; i < colsN; i++) {
          if (R() < 0.42) continue;
          const w = ri(1, cw - 1), h = ri(1, rh - 1), d = ri(1, deep - 1), x0 = i * cw + 1 + ri(0, cw - 1 - w);
          block(x0, y0 + 1, j * rh + 1, x0 + w, y0 + 1 + d, j * rh + 1 + h, 2 + (i + j * 3) % 5);
        }
      } },
      { id: 'Nest', fam: 'Stores', w: 2.5, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        const count = ri(2, 5), gap = mx(2, fl(n / (2 * count + 1))), t = n >= 24 ? pk([1, 2]) : 1;
        for (let i = 0; i < count; i++) {
          const lo = i * gap, hi = n - 1 - i * gap;
          if (hi - lo < 2) break;
          for (let z = lo; z <= hi; z++) for (let y = lo; y <= hi; y++) for (let x = lo; x <= hi; x++) if (x < lo + t || y < lo + t || z < lo + t) T[at(x, y, z - (i ? lo - i * t : 0))] = 1 + i % 4;
        }
      } },
      { id: 'Crib', fam: 'Stores', w: 1.5, sizes: [16, 20, 24], bare: 1, parts: 2, go() {
        const t = pk([1, 1, 2]), w = pk([1, 1, 2]), p = w + pk([1, 2, 3]), taper = R() < 0.5 ? 0.2 + R() * 0.3 : 0, m = ri(0, 2), layers = fl((n - 1) / t);
        for (let L = 0; L < layers; L++) {
          const z = L * t, ins = m + fl(L * t * taper);
          if (n - 2 * ins < p + w) break;
          for (let u = ins; u + w <= n - ins; u += p) (L & 1) ? block(u, ins, z, u + w, n - ins, z + t, 1) : block(ins, u, z, n - ins, u + w, z + t, 2);
        }
        // (mostly its corner nearest the eye is taken out from part way up, in one step or two, so it is never a plain
        // box: its outline steps and its inside shows)
        if (R() < 0.75) {
          const a = fl(n * (0.42 + R() * 0.16)), b = fl(n * (0.42 + R() * 0.16)), c = fl(n * (0.25 + R() * 0.3));
          block(a, b, c, n, n, n, 0);
          if (R() < 0.5) block(a - fl(n * 0.2), b - fl(n * 0.2), c + fl(n * 0.25), n, n, n, 0);
        }
      } },
      { id: 'Louvres', live: 1, flat: 1, fam: 'Stores', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const gap = pk([1, 1, 2]), k1 = 0.6 + R() * 2.4, ph = R() * TAU, round = R() < 0.5, cx = n / 2, pole = R() < 0.6;
        for (let z = 0, i = 0; z < n - 1; z += 1 + gap, i++) { const r = n * (moving ? 0.27 + 0.14 * (0.5 + 0.5 * M.sin(z / n * k1 * TAU + ph - beatNo * 0.05)) : 0.2 + 0.27 * (0.5 + 0.5 * M.sin(z / n * k1 * TAU + ph))); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if ((round ? hyp(x + 0.5 - cx, y + 0.5 - cx) : mx(ab(x + 0.5 - cx), ab(y + 0.5 - cx))) < r) T[at(x, y, z)] = 1 + (i & 1); }
        if (pole) block(cx - 1, cx - 1, 0, cx + 1, cx + 1, n - 1, 3);
      } },
      { id: 'Keep', solo: 1, lamp: 1, flat: 1, fam: 'Grounds', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const m = ri(1, 3), hw = ri(3, mx(3, fl(n * 0.3))), tw = ri(2, 3), th = hw + ri(3, 7), lo = m, hi = n - m, mid = fl(n / 2);
        for (let u = lo; u < hi; u++) for (let z = 0; z < hw; z++) if (z < hw - 1 || (u & 1)) { put(u, lo, z, 1); put(u, hi - 1, z, 1); put(lo, u, z, 1); put(hi - 1, u, z, 1); }
        for (let z = 0; z < hw - 2; z++) for (let x = mid - 1; x <= mid; x++) T[at(x, hi - 1, z)] = 0;
        for (const cx of [lo, hi - tw]) for (const cy of [lo, hi - tw]) { block(cx - 1, cy - 1, 0, cx + tw + 1, cy + tw + 1, th, 2); for (let x = cx - 1; x < cx + tw + 1; x++) for (let y = cy - 1; y < cy + tw + 1; y++) if ((x + y) & 1) put(x, y, th, 2); put(cx + (tw >> 1), cy + (tw >> 1), th, 2); put(cx + (tw >> 1), cy + (tw >> 1), th + 1, LAMP); }
        if (R() < 0.75) { const q = mx(2, fl((hi - lo) * (0.16 + R() * 0.12))); block(mid - q, mid - q, 0, mid + q, mid + q, mn(n - 2, th + ri(1, 5)), 3); block(mid - q + 1, mid - q + 1, 0, mid + q - 1, mid + q - 1, mn(n - 1, th + ri(5, 8)), 3); }
      } },
      { id: 'Garden', solo: 1, flat: 1, fam: 'Grounds', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 6, go() {
        // beds on a plinth, each with a shape of its own; the one at the back stands tallest
        const g = n >= 24 ? pk([2, 3, 3, 4]) : pk([2, 2, 3]), cell = fl((n - 1) / g), base = ri(2, 4);
        block(0, 0, 0, n, n, base, 6);
        for (let j = 0; j < g; j++) for (let i = 0; i < g; i++) {
          const x0 = i * cell + 1, y0 = j * cell + 1, s = cell - 2, cxm = x0 + s / 2, cym = y0 + s / 2, kind = ri(0, 5), part = 1 + (i + j * g) % 5, tall = i + j ? ri(mn(n - base - 1, fl(s * 1.5)), mx(s, mn(n - base - 1, s * 3))) : n - base - ri(1, 3);
          if (kind === 0) block(x0, y0, base, x0 + s, y0 + s, base + tall, part);
          else if (kind === 1) { for (let z = 0; z < s; z++) block(cxm - (s - z) / 2, cym - (s - z) / 2, base + z, cxm + (s - z) / 2, cym + (s - z) / 2, base + z + 1, part); }
          else if (kind === 2) ball(cxm, cym, base + s / 2, s / 2, part);
          else if (kind === 3) { const h = mx(1, s / 4); block(cxm - h, cym - h, base, cxm + h, cym + h, base + tall, part); }
          else if (kind === 4) { for (let z = 0; z < s; z++) for (let x = x0; x < x0 + s; x++) if (x === x0 || x === x0 + s - 1 || z === s - 1) for (let q = 0; q < mx(2, s >> 1); q++) put(x, fl(cym) - (s >> 2) + q, base + z, part); }
          else for (let x = 0; x < s; x++) block(x0 + x, y0, base, x0 + x + 1, y0 + s, base + x + 1, part);
        }
      } },
      { id: 'Islands', live: 1, flat: 1, fam: 'Grounds', w: 1.2, sizes: [16, 20, 24, 32], corner: 1, bare: 1, parts: 5, go() {
        const sd = ri(1, 9999), lam = n * (0.28 + R() * 0.25), amp = n * (0.6 + R() * 0.35), sea = ri(2, fl(n * 0.28));
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const h = fl(fbm(x / lam + beatNo * 0.01, y / lam, sd) * amp - n * 0.1 + (2 * n - x - y) * 0.07); for (let z = 0; z < mn(n, mx(h, sea + (moving ? M.round(1.6 * M.sin(beatNo * 0.03)) : 0))); z++) T[at(x, y, z)] = z < h ? 1 + fl(z / 2) % 3 : 5; }
      } },
      { id: 'Canyon', live: 1, flat: 1, fam: 'Grounds', w: 2.5, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        const top = n - ri(2, fl(n / 3)), wid = n * (0.12 + R() * 0.14), kk = TAU / (n * (0.5 + R() * 0.6)), amp = n * (0.1 + R() * 0.16), ph = R() * TAU, along = R() < 0.5, st = pk([1, 2, 3]), fork = R() < 0.4;
        ground((x, y) => {
          const u = along ? x : y, v = along ? y : x;
          let d = ab(v - (n / 2 + amp * M.sin(u * kk + ph + beatNo * 0.02)));
          if (fork) d = mn(d, ab(u - (n / 2 + amp * M.sin(v * kk * 1.3 + ph * 2))) * 1.3);
          return d >= wid ? top : mx(1, top - fl((top - 1) * (1 - d / wid) / st + 0.5) * st);
        }, (x, y, z) => 1 + fl(z / 2) % 4);
      } },
      { id: 'Quarry', flat: 1, fam: 'Grounds', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        const top = n - ri(2, fl(n / 3)), pits = ri(1, 3), tread = ri(1, 2), rise = ri(1, 2), hmap = new Int16Array(n * n).fill(top);
        for (let p = 0; p < pits; p++) {
          const px = ri(3, n - 4), py = ri(3, n - 4), rad = ri(fl(n / 4), fl(n / 1.9)), round = R() < 0.4;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const d = round ? hyp(x - px, y - py) : mx(ab(x - px), ab(y - py)); if (d < rad) hmap[y * n + x] = mn(hmap[y * n + x], mx(1, top - (fl((rad - d) / tread) + 1) * rise)); }
        }
        ground((x, y) => hmap[y * n + x], (x, y, z) => 1 + fl(z / 2) % 4);
      } },
      { id: 'Wedges', fam: 'Steps', w: 2.5, sizes: [16, 20, 24, 32], parts: 3, go() {
        // a few plain ramps leaning on one another
        const count = ri(2, 5);
        for (let i = 0; i < count; i++) {
          const w = ri(fl(n / 4), fl(n / 1.6)), d = ri(fl(n / 4), fl(n / 1.6)), x0 = ri(0, n - w), y0 = ri(0, n - d), top = ri(fl(n / 3), n - 1), way = ri(0, 3);
          for (let y = 0; y < d; y++) for (let x = 0; x < w; x++) { const f = way === 0 ? x / w : way === 1 ? 1 - x / w : way === 2 ? y / d : 1 - y / d, h = fl(top * f) + 1; for (let z = 0; z < h; z++) if (!T[at(x0 + x, y0 + y, z)]) T[at(x0 + x, y0 + y, z)] = 1 + i % 3; }
        }
      } },
      { id: 'Blocks', solo: 1, flat: 1, fam: 'Stores', w: 2, sizes: [16, 16, 20], bare: 1, parts: 6, go() {
        // a child's pile: a few big bricks, each resting on what is under it, the broadest laid first and the pile never
        // taller than about two thirds of the room, every brick lying on its broad side (a small brick on a tall stack reads
        // as a head on a body)
        const top = new Int16Array(n * n), count = ri(7, 14), bricks = [];
        for (let b = 0; b < count; b++) { const w = ri(fl(n / 6), fl(n / 2)), d = ri(fl(n / 6), fl(n / 2)); bricks.push([w, d, mx(1, mn(ri(fl(n / 8) + 1, fl(n / 3)), fl(mn(w, d) * 0.7)))]); }
        bricks.sort((p, q) => q[0] * q[1] - p[0] * p[1]);
        for (let b = 0; b < count; b++) {
          // (of two places, the lower)
          const [w, d, h] = bricks[b];
          let x0 = 0, y0 = 0, z0 = 99;
          for (let t = 0; t < 2; t++) {
            const X = mx(0, mn(n - w, fl(n / 2 + (R() - 0.5) * n * 0.5 - w / 2))), Y = mx(0, mn(n - d, fl(n / 2 + (R() - 0.5) * n * 0.5 - d / 2)));
            let Z = 0;
            for (let y = Y; y < Y + d; y++) for (let x = X; x < X + w; x++) Z = mx(Z, top[y * n + x]);
            if (Z < z0) { x0 = X; y0 = Y; z0 = Z; }
          }
          if (z0 + h > mn(n, n * 0.6 + 2)) continue;
          block(x0, y0, z0, x0 + w, y0 + d, z0 + h, 1 + b % 6);
          for (let y = y0; y < y0 + d; y++) for (let x = x0; x < x0 + w; x++) top[y * n + x] = z0 + h;
        }
      } },
      { id: 'Quartz', fam: 'Growths', w: 3, sizes: [16, 20, 24], bare: 1, parts: 4, go() {
        // a cluster of pointed prisms growing out of a low rock, leaning out from its middle, so they read as one druse
        // and never as a few things standing apart
        const count = ri(5, 10) + 2 * push, cx = n / 2, rr = n * (0.3 + R() * 0.08), rh = mx(2, fl(n * (0.08 + R() * 0.06)));
        solid((x, y, z) => hyp((x + 0.5 - cx) / rr, (y + 0.5 - cx) / rr, (z + 0.5) / rh) < 1 ? 4 : 0);
        for (let i = 0; i < count; i++) {
          const w = ri(1, mx(2, fl(n / 7))), h = ri(fl(n / 3), n - 2), x0 = cx + (R() - 0.5) * n * 0.45, y0 = cx + (R() - 0.5) * n * 0.45, lx = (x0 - cx) / n * 1.1 + (R() - 0.5) * 0.2, ly = (y0 - cx) / n * 1.1 + (R() - 0.5) * 0.2, tip = ri(2, 4);
          for (let z = 0; z < h; z++) { const hw = w * (z > h - tip * w ? (h - z) / (tip * w) : 1), ox = x0 + lx * z, oy = y0 + ly * z; block(ox - hw, oy - hw, z, ox + hw + 1, oy + hw + 1, z + 1, 1 + i % 3); }
        }
      } },
      { id: 'Drilled', live: 1, fam: 'Rounds', w: 3, sizes: [16, 20, 24], bare: 1, parts: 2, go() {
        // on each face the holes run along one diagonal, a big one then a small one: never two alike side by side, never one under two
        // the stock drilled is a block, a tall pillar or a drum
        const holes = [], round = R() < 0.6, stock = pk([0, 1, 1, 2, 2]), c0 = n / 2, pw = n * 0.3, dr = n / 2 - 0.3;
        for (let axis = 0; axis < 3; axis++) {
          const count = ri(stock ? 1 : 0, 3), up = R() < 0.5, r0 = 1.4 + R() * n / 7;
          for (let i = 0; i < count; i++) { const a = (i + 0.5) / count * (n - 4) + 2 + (R() - 0.5) * 2; holes.push([axis, a + (moving ? 2.5 * M.sin(beatNo * 0.03 + i * 1.7 + axis) : 0), up ? a : n - a, r0 * (i & 1 ? 0.5 : 1.1) * (0.85 + R() * 0.3)]); }
        }
        if (!holes.length) holes.push([2, n / 2, n / 2, n / 5]);
        solid((x, y, z) => {
          if (stock === 1 && (ab(x + 0.5 - c0) > pw || ab(y + 0.5 - c0) > pw)) return 0;
          if (stock === 2 && hyp(x + 0.5 - c0, y + 0.5 - c0) > dr) return 0;
          let lip = 0;
          for (const h of holes) { const a = h[0] === 0 ? y : x, b = h[0] === 2 ? y : z, d = round ? hyp(a + 0.5 - h[1], b + 0.5 - h[2]) : mx(ab(a + 0.5 - h[1]), ab(b + 0.5 - h[2])); if (d < h[3]) return 0; if (d < h[3] + 1) lip = 1; }
          return lip ? 2 : 1;
        });
      } },
      { id: 'Ribbons', solo: 1, fam: 'Growths', w: 3, sizes: [16, 20, 24, 32], nat: 1, bare: 1, parts: 2, go() {
        // one to three closed loops, each a whole number of turns along every axis (so it comes back to where it began and
        // has no loose ends), a thick tube in one colour, the loops in two colours by turns
        const count = pk([1, 1, 1, 2, 2, 3]), cx = n / 2; let step = 1;
        for (let i = 0; i < count; i++) {
          const F = pk([[1, 2, 3], [2, 1, 3], [1, 3, 2], [3, 2, 1], [1, 2, 1], [2, 1, 2], [1, 1, 2], [2, 3, 1]]);
          const r = 1.1 + R() * (n / (count > 1 ? 26 : 18)), ax = R() * TAU, ay = R() * TAU, az = R() * TAU, fx = F[0], fy = F[1], fz = F[2], far = cx - r - 1;
          for (let q = 0; q <= 360; q++, step++) {
            const u = q / 360 * TAU, x = cx + far * M.sin(fx * u + ax), y = cx + far * M.sin(fy * u + ay), z = cx + far * M.sin(fz * u + az);
            for (let Z = fl(z - r); Z <= z + r; Z++) for (let Y = fl(y - r); Y <= y + r; Y++) for (let X = fl(x - r); X <= x + r; X++) if (X >= 0 && Y >= 0 && Z >= 0 && X < n && Y < n && Z < n && hyp(X + 0.5 - x, Y + 0.5 - y, Z + 0.5 - z) < r && !T[at(X, Y, Z)]) { T[at(X, Y, Z)] = 1 + i % 2; O[at(X, Y, Z)] = step; }
          }
        }
      } },
      { id: 'Jacks', solo: 1, fam: 'Frames', w: 1.5, sizes: [16, 20, 24], bare: 1, parts: 4, go() {
        // (heaped together toward the middle and low, the first on the floor, so their arms cross into one pile)
        const count = ri(3, 7) + push;
        for (let i = 0; i < count; i++) {
          const L = ri(fl(n / 4), fl(n / 2.2)), t = ri(mx(1, fl(L / 4)), mx(1, fl(L / 2.2))), x = ri(mx(L, fl(n * 0.3)), mx(L, mn(n - 1 - L, fl(n * 0.7)))), y = ri(mx(L, fl(n * 0.3)), mx(L, mn(n - 1 - L, fl(n * 0.7)))), z = i ? ri(L, mx(L, mn(n - 1 - L, fl(n * 0.55)))) : L;
          block(x - L, y - t + 1, z - t + 1, x + L + 1, y + t, z + t, 1 + i % 4); block(x - t + 1, y - L, z - t + 1, x + t, y + L + 1, z + t, 1 + i % 4); block(x - t + 1, y - t + 1, z - L, x + t, y + t, z + L + 1, 1 + i % 4);
        }
      } },
      { id: 'Helix', live: 1, solo: 1, fam: 'Rounds', w: 2.5, sizes: [16, 20, 24, 32], bare: 1, parts: 3, go() {
        const cx = n / 2, rad = n * (0.24 + R() * 0.16), strands = pk([1, 2, 2, 3]), turns = 1 + R() * 2.5, r = 1 + R() * (n / 12), rungs = R() < 0.6, dir = R() < 0.5 ? 1 : -1;
        for (let z4 = 0; z4 < n * 4; z4++) for (let q = 0; q < strands; q++) {
          const z = z4 / 4, a = dir * (z / n * turns * TAU + beatNo * 0.045) + q * TAU / strands, x = cx + rad * M.cos(a), y = cx + rad * M.sin(a);
          ball(x, y, z + 0.5, r, 1 + q);
          if (rungs && q === 0 && strands > 1 && z4 % 12 === 4) { const b = a + TAU / strands, x2 = cx + rad * M.cos(b), y2 = cx + rad * M.sin(b); for (let w = 0; w <= 14; w++) put(fl(x + (x2 - x) * w / 14), fl(y + (y2 - y) * w / 14), z, 3); }
        }
      } },
      { id: 'Fountain', solo: 1, wet: 1, fam: 'Waters', w: 3.5, sizes: [16, 20, 24], bare: 1, parts: 3, go() {
        // bowls one above another on a stem, each wider than the one above it, over a pool; the water rises at the top
        const cx = fl(n / 2), round = R() < 0.65, tiers = n >= 24 ? 3 : 2, gap = ri(4, mn(6, fl((n - 4) / tiers)));
        const dish = (r, z, part) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const d = round ? hyp(x + 0.5 - cx, y + 0.5 - cx) : mx(ab(x + 0.5 - cx), ab(y + 0.5 - cx)); if (d < r) { put(x, y, z, part); if (d >= r - 1) put(x, y, z + 1, part); } } };
        dish(n / 2 - 1, 0, 3);
        let z = 1;
        for (let i = tiers - 1; i >= 0; i--) { z += gap; dish(2.5 + i * 3, z, 1 + (i & 1)); }
        block(cx - 1, cx - 1, 1, cx + 1, cx + 1, z + 1, 3);
        for (let a = -1; a <= 0; a++) for (let b = -1; b <= 0; b++) spring(cx + a, cx + b, z + 1);
      } },
      { id: 'Volcano', cone: 1, solo: 1, wet: 1, fam: 'Grounds', w: 3.5, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        // a cone with a crater: what wells up fills the crater and runs out at a notch in the rim, on a side the eye can see
        // (its flanks smooth, or stepped in terraces, or with a lesser cone grown on the flank toward the eye)
        const cx = fl(n / 2) + ri(-1, 1), cy = fl(n / 2) + ri(-1, 1), top = fl(n * (0.6 + R() * 0.22)), cr = n >= 24 ? 3.5 : 2.5, run = mx(0.56, (n / 2 - 2 - cr) / top), sd = ri(1, 9999), deep = ri(2, 3), rough = R() * 2.2, side = R() < 0.5;
        const kind = pk([0, 1, 2]), terr = ri(2, 3), kx = cx + (side ? 0 : n * 0.3), ky = cy + (side ? n * 0.3 : 0), kTop = top * 0.5;
        ground((x, y) => {
          const d = hyp(x + 0.5 - cx, y + 0.5 - cy);
          if (d < cr) return d < cr - 1 ? top - deep : top + 1;
          let h = top + 1 - (d - cr + (noise(x * 0.45, y * 0.45, sd) - 0.5) * rough) / run;
          if (kind === 1) h = fl(h / terr) * terr;
          if (kind === 2) h = mx(h, kTop - hyp(x + 0.5 - kx, y + 0.5 - ky) / run);
          return mx(1, fl(h));
        }, (x, y, z) => 1 + fl(z / 2) % 4);
        for (let q = fl(cr - 1); q < fl(cr - 1) + 3; q++) T[at(side ? cx + q : cx, side ? cy : cy + q, top)] = 0;
        for (let a = -1; a <= 0; a++) for (let b = -1; b <= 0; b++) spring(cx + a, cy + b, top - deep);
      } },
      { id: 'Cascade', solo: 1, wet: 1, corner: 1, flat: 1, fam: 'Grounds', w: 3.5, sizes: [16, 20, 24], bare: 1, parts: 4, go() {
        // pools stepping down from the corner, each with a rim, some a long fall below the last: the water rises in the
        // highest and spills from pool to pool
        const kind = ri(0, 1), pools = ri(2, n >= 20 ? 4 : 3), edge = [0], base = [];
        let top = 1;
        for (let j = 0; j < pools; j++) { edge.push(edge[j] + ri(3, kind ? 6 : 5)); base.push(R() < 0.7 ? ri(3, mx(3, fl(n / 3))) : ri(2, 3)); top += base[j]; }
        while (edge[pools] > (kind ? n + 4 : n - 2)) for (let j = 1; j <= pools; j++) edge[j] -= j;      // too wide for the room: every pool narrower
        while (top > n - 2) { top = 1; for (let j = 0; j < pools; j++) { base[j] = mx(1, base[j] - 1); top += base[j]; } }
        for (let j = pools - 1, h = 1; j >= 0; j--) { const f = base[j]; base[j] = h; h += f; }      // from heights of fall to the height of each pool's floor
        ground((x, y) => { const d = kind ? x + y : mx(x, y); let j = 0; while (j < pools && d >= edge[j + 1]) j++; return j >= pools ? 0 : base[j] + (d === edge[j + 1] - 1 ? 1 : 0); }, (x, y) => { const d = kind ? x + y : mx(x, y); let j = 0; while (j < pools && d >= edge[j + 1]) j++; return 1 + j % 4; });
        spring(0, 0, base[0]); if (!kind) spring(1, 1, base[0]);
      } },
      { id: 'Hopper', fam: 'Growths', w: 3, sizes: [16, 20, 24], bare: 1, parts: 4, go() {
        // a hopper crystal: square rims one on another, each a step wider than the one under it (or narrower), so its walls
        // climb in stairs; one or two smaller ones grow out of it
        const up = R() < 0.65, th = n >= 20 ? 2 : 1, kids = ri(0, 2) + (push ? 1 : 0);
        const grow = (cx, cy, z0, size, t, i) => {
          for (let l = 0; l <= size; l++) {
            const w = up ? l + 1 : size - l + 1;
            for (let q = 0; q < t; q++) for (let y = fl(cy - w); y < cy + w; y++) for (let x = fl(cx - w); x < cx + w; x++) { const d = mx(ab(x + 0.5 - cx), ab(y + 0.5 - cy)); if (d >= w - th || l === 0) put(x, y, z0 + l * t + q, 1 + (fl(l / 2) + i) % 4); }
          }
        };
        const main = fl(n / 2) - 2, t = mx(1, fl((n - 1) / (main + 1)));
        grow(n / 2, n / 2, 0, main, t, 0);
        for (let i = 1; i <= kids; i++) { const sz = ri(2, mx(2, fl(main / 2))), a = R() * TAU, r = main * (0.55 + R() * 0.3); grow(n / 2 + r * M.cos(a), n / 2 + r * M.sin(a), ri(0, fl(n / 3)), sz, mx(1, t - 1 + ri(0, 1)), i); }
      } },
      { id: 'Hilbert', fine: 1, solo: 1, nat: 1, fam: 'Growths', w: 3, sizes: [24, 24, 32], bare: 1, parts: 6, go() {
        // one path through every point of a grid, never crossing itself: Hilbert's curve, in three dimensions
        const bits = 3, side = 1 << bits, sp = fl((n - 1) / (side - 1)), total = side * side * side;
        let lx = 0, ly = 0, lz = 0, step = 1;
        for (let idx = 0; idx < total; idx++) {
          const X = [0, 0, 0];
          for (let b = 0; b < bits; b++) for (let d = 0; d < 3; d++) X[d] |= (idx >> (3 * b + 2 - d) & 1) << b;
          let t = X[2] >> 1; X[2] ^= X[1]; X[1] ^= X[0]; X[0] ^= t;
          for (let Q = 2; Q !== side; Q <<= 1) { const P = Q - 1; for (let i = 2; i >= 0; i--) if (X[i] & Q) X[0] ^= P; else { t = (X[0] ^ X[i]) & P; X[0] ^= t; X[i] ^= t; } }
          const x = X[0] * sp, y = X[1] * sp, z = X[2] * sp, part = 1 + fl(idx * 6 / total);
          for (let q = idx ? 1 : sp; q <= sp; q++) { const j = at(lx + (x - lx) * q / sp, ly + (y - ly) * q / sp, lz + (z - lz) * q / sp); T[j] = part; O[j] = step++; }
          lx = x; ly = y; lz = z;
        }
      } },
      { id: 'Knot', solo: 1, nat: 1, fam: 'Rounds', w: 3, sizes: [24, 32], bare: 1, parts: 3, go() {
        // one tube round a ring, winding through the ring's hole as it goes: p times round for q times through
        const pq = pk([[2, 3], [3, 2], [2, 5], [3, 4], [3, 5]]), cx = n / 2, r = n >= 32 ? 1.8 + R() * 0.5 : 1.55, big = n * 0.29, small = big * (0.42 + R() * 0.1), squash = 1 + R() * 0.4, cz = R() < 0.5 ? small * squash + r : n / 2;
        for (let st = 0; st <= 560; st++) {
          const u = st / 560 * TAU, w = big + small * M.cos(pq[1] * u), x = cx + w * M.cos(pq[0] * u), y = cx + w * M.sin(pq[0] * u), z = cz + small * squash * M.sin(pq[1] * u);
          for (let Z = fl(z - r); Z <= z + r; Z++) for (let Y = fl(y - r); Y <= y + r; Y++) for (let X = fl(x - r); X <= x + r; X++) if (X >= 0 && Y >= 0 && Z >= 0 && X < n && Y < n && Z < n && hyp(X + 0.5 - x, Y + 0.5 - y, Z + 0.5 - z) < r && !T[at(X, Y, Z)]) { T[at(X, Y, Z)] = 1 + fl(st * 3 * pq[0] / 561) % 3; O[at(X, Y, Z)] = st + 1; }
        }
      } },
      { id: 'Temple', flat: 1, fam: 'Frames', w: 3, sizes: [16, 20, 24, 32], bare: 1, parts: 4, go() {
        // steps, a ring of columns, a slab on them, and a roof
        const steps = ri(1, 3), sp = pk([2, 3, 3]), colH = ri(fl(n / 4), fl(n / 2.3)), deep = mx(7, fl(n * (0.5 + R() * 0.45))), y0 = fl((n - deep) / 2), gable = R() < 0.65, cella = R() < 0.6;
        for (let q = 0; q < steps; q++) block(q, y0 + q, q, n - q, y0 + deep - q, q + 1, 3);
        const xa = steps, xb = n - steps - 1, ya = y0 + steps, yb = y0 + deep - steps - 1, zt = steps + colH;
        for (let x = xa; x <= xb; x++) for (let y = ya; y <= yb; y++) if (((x === xa || x === xb) && ((y - ya) % sp === 0 || y === yb)) || ((y === ya || y === yb) && ((x - xa) % sp === 0 || x === xb))) block(x, y, steps, x + 1, y + 1, zt, 2);
        if (cella && xb - xa > 5 && yb - ya > 5) block(xa + 2, ya + 2, steps, xb - 1, yb - 1, zt, 4);
        block(xa, ya, zt, xb + 1, yb + 1, zt + 1, 1);
        if (gable) for (let q = 0; ya + 2 * q <= yb - 2 * q && zt + 1 + q < n; q++) block(xa, ya + 2 * q, zt + 1 + q, xb + 1, yb - 2 * q + 1, zt + 2 + q, q ? 1 : 4);
      } },
      { id: 'Lighthouse', cone: 1, solo: 1, lamp: 1, fam: 'Towers', w: 4.5, sizes: [20, 24, 32], bare: 1, parts: 4, go() {
        // a slender tower, four or five times as tall as it is wide, in many even bands (or none), narrowing a little as
        // it rises from a broad rock or a pier; a thin gallery, a lit lantern and a cap
        const cx = n / 2, top = n - 5, r0 = mx(1.6, n * (0.075 + R() * 0.025)), r1 = mx(1.3, r0 * (0.65 + R() * 0.15)), band = R() < 0.2 ? 99 : pk([1, 1, 2]), sd = ri(1, 9999), pier = R() < 0.35;
        if (pier) { const s = n * (0.3 + R() * 0.08), h = ri(2, 3); block(cx - s, cx - s, 0, cx + s, cx + s, h - 1, 3); block(cx - s + 1, cx - s + 1, h - 1, cx + s - 1, cx + s - 1, h, 3); }
        else { const h = n * (0.1 + R() * 0.05), far = n * (0.42 + R() * 0.05); ground((x, y) => { const d = hyp(x + 0.5 - cx, y + 0.5 - cx) / far; return d >= 1 ? 0 : 1 + h * (1 - d * d) + (noise(x * 0.22, y * 0.22, sd) - 0.5) * 2.4; }, () => 3); }
        solid((x, y, z) => z < top && hyp(x + 0.5 - cx, y + 0.5 - cx) < r0 + (r1 - r0) * z / top ? 1 + (fl(z / band) & 1) : 0);
        const ring = (r, z, part) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (hyp(x + 0.5 - cx, y + 0.5 - cx) < r) put(x, y, z, part); };
        ring(r1 + 0.9, top, 4); ring(r1 - 0.4, top + 1, LAMP); ring(r1 - 0.4, top + 2, LAMP); ring(r1 + 0.2, top + 3, 4); ring(mx(0.8, r1 - 0.9), top + 4, 4);
      } },
    ];

    // ---- how much of the square a build covers ----
    // The outline of every cube is marked on a grid one eye step across (cell u across, v down, both from -64): a cube at
    // (x, y, z) is a hexagon of twelve cells round u = 2(x - y), v = x + y - 2z. It may be turned about the room's middle
    // first (by rot, or up to rot at height zr for a twist).
    const HX = new Uint8Array(16384);
    const hexes = (part, oX, oY, hm, rot, zr) => {
      HX.fill(0);
      let e1a = 99, e1b = -99, e2a = 99, e2b = -99;
      for (let i = 0; i < 32768; i++) if (part[i]) {
        let x = (i & 31) - oX, y = (i >> 5 & 31) - oY;
        const z = i >> 10;
        if (rot) { const a = rot * (zr ? mn(1, z / zr) : 1), dx = x + 0.5 - hm, dy = y + 0.5 - hm, ca = M.cos(a), sa = M.sin(a); x = fl(hm + dx * ca - dy * sa); y = fl(hm + dx * sa + dy * ca); }
        const e1 = x - y, e2 = x + y - 2 * z, u = 2 * e1 + 64, v = e2 + 64;
        if (u < 2 || u > 125 || v < 2 || v > 126) continue;
        if (e1 < e1a) e1a = e1; if (e1 > e1b) e1b = e1; if (e2 < e2a) e2a = e2; if (e2 > e2b) e2b = e2;
        const o = v << 7 | u;
        HX[o - 257] = HX[o - 256] = HX[o - 130] = HX[o - 129] = HX[o - 128] = HX[o - 127] = HX[o - 2] = HX[o - 1] = HX[o] = HX[o + 1] = HX[o + 127] = HX[o + 128] = 1;
      }
      return { e1a, e1b, e2a, e2b };
    };
    // the share of a picture of side g, at step kk with the room's corner at (ex, ey), that what is marked covers
    const coverIn = (kk, g, ex, ey) => {
      let c = 0;
      for (let v = 0; v < 128; v++) { const py = ey + kk * (v - 63.5); if (py < 0 || py >= g) continue; for (let u = 0, o = v << 7; u < 128; u++, o++) if (HX[o]) { const px = ex + kk * (u - 63.5); if (px >= 0 && px < g) c++; } }
      return c * kk * kk / (g * g);
    };
    // The eye frames a box (across in half steps, down in steps): the largest k that leaves a rim of a fourteenth of the
    // square clear all round it, the picture no bigger than that needs (a room of 32 filled to its walls needs 288 at the
    // smallest k), and the box in the middle by its own middle
    // (a print, with its margin, is framed with a wider rim: fill is the share of the square the box may span)
    // (one framed close is drawn a little coarser, on a smaller grid: wide is the picture's side it aims at)
    // (and the picture is then cut so the box spans a little more of it than k was chosen for: tight)
    const frameBox = (X0, X1, Y0, Y1, fill = 0.86, wide = 240, tight = fill + 0.02) => {
      const E = mx(X1 - X0, Y1 - Y0);
      let kk = 14;
      while (kk > 2 && E * kk > fill * wide) kk--;
      const g = mn(kk === 2 ? 288 : 256, mx(176, 4 * M.ceil(E * kk / tight / 4)));
      return [kk, g, M.round(g / 2 - kk * (X0 + X1) / 2), M.round(g / 2 - kk * (Y0 + Y1) / 2)];
    };
    // one drawing of a form at a size, standing alone and still, and the share of the square it would cover
    const tryForm = (f, size, s) => {
      n = size; T = new Uint8Array(32768); O = f.nat ? new Uint16Array(32768) : null; SP = []; R = s;
      f.go();
      const b = hexes(T, 0, 0, 0, 0, 0);
      return b.e1b < b.e1a ? 0 : coverIn(...frameBox(2 * b.e1a - 3, 2 * b.e1b + 3, b.e2a - 4, b.e2b + 3));
    };

    // ================= what this one rolled =================
    const want = forced.split('|');
    let form = forms[0];
    { let total = 0; for (const f of forms) total += f.w; let r = rand() * total; for (const f of forms) { r -= f.w; if (r < 0) { form = f; break; } } }
    if (want[0]) form = forms.find(f => f.id === want[0]) || form;
    n = form.sizes[fl(rand() * form.sizes.length)];
    // a form that comes out slight (a sliver, a mat, a scatter) in both of two drawings is given up for another of its
    // family; these draws are the gate's own, so whatever passes is rolled exactly as it would have been
    const gs = stream((lo ^ 0x3c6ef372) >>> 0 || 5, (hi + 0x14292967) >>> 0 || 6);
    if (!want[0]) for (let tries = 0; tries < 3 && form.id !== 'Heap'; tries++) {
      // (a stepped pyramid of five of itself is let through only a third of the time, a lattice of residues one in four, a
      // spiral stair half, a store of crates one in three, a drilled block four in five, ribbons a little over half, bubbles two in three)
      if (mx(tryForm(form, n, gs), tryForm(form, n, gs)) >= (form.cone ? 0.21 : 0.27) && (form.id !== 'Bit Pyramid' || gs() < 0.34) && (form.id !== 'Residue' || gs() < 0.25) && (form.id !== 'Spiral Stair' || gs() < 0.5)
        && (form.id !== 'Crates' || gs() < 0.35) && (form.id !== 'Drilled' || gs() < 0.8) && (form.id !== 'Ribbons' || gs() < 0.55) && (form.id !== 'Bubbles' || gs() < 0.65)) break;
      const kin = forms.filter(f => f.fam === form.fam && f !== form && f.id !== 'Heap');
      if (!kin.length) break;
      let total = 0; for (const f of kin) total += f.w; let r = gs() * total; for (const f of kin) { r -= f.w; if (r < 0) { form = f; break; } }
      n = form.sizes[fl(gs() * form.sizes.length)];
    }
    let paint = choose('Three Tone', 5, 'Strata', 4, 'Parts', 4, 'Shade', 3, 'Bands', 2, 'Shells', 1.5, 'Order', 2, 'Tops', 2, 'Checker', 1, 'Ink', 3, 'Wire', 1.5);
    // (a drawing in lines on the dark is given up: it is painted by its parts instead)
    if (paint === 'Wire') paint = form.parts > 1 ? 'Parts' : 'Three Tone';
    // ---- the colour sets: name, how often it comes up, its colours. The first is the wheel of hues; the twelve after it are
    // kept rare, and 'Unique' is the rare green ----
    const SETS = [
      ['Spectrum', 5, ''],
      ['Parlour', 0.5, '305e90 db4e54 ffbb12 389894 e0d8c5'], ['Furnace', 0.5, 'fff69f faa307 e85d04 d00000 9d0208'], ['Reef', 0.5, 'c4ffff 08deea 1261d1 0827f5'],
      ['Neon', 0.5, 'defe47 fe00fe 00b3fe 7700a6 0016ee'], ['Flamingo', 0.5, 'fe75fe ff124f 7a04eb ff00a0'], ['Sorbet', 0.5, 'ffa4d5 83ffc1 ffe780 99e2ff'],
      ['Bullion', 0.5, 'fff69f fdd870 d0902f a15501'], ['Lichen', 0.5, 'a0ffe3 65dc98 8d8980 575267'], ['Indigo', 0.5, '0099ff 5655dd 8822ff aa99ff'],
      ['Sweetshop', 0.5, 'f887ff de004e 860029 5b2a8c'], ['Newt', 0.5, '8386f5 3d43b4 0d2a8a 65dc98'], ['Pewter', 0.5, 'eeeeee aaaaaa 666666 333333'],
      ['Unique', 2.6, '1afe49 0c8f2a 083e12 b6ffb6'],
      ['Carnival', 1, '17b8a0 e2569f f4d58a 1f6f80 f6ead8'], ['Hearth', 1, 'ff2e2e ff7a1a ffd23f fff3c4'], ['Glacier', 1, 'caf0f8 90e0ef 00b4d8 0077b6'],
      ['Plum', 1, '3a0ca3 7209b7 b5179e f72585'], ['Grove', 1, 'f9f871 c2f970 44d492 0b8a6f'], ['Damask', 1, '6a1b4d b23a48 f2a7b5 ffe5ec'],
      ['Violet', 1, '5a189a 9d4edd e0aaff ffffff'], ['Harbour', 1.2, 'ff6b35 f7c59f efefd0 1a659e 4f9fd6'], ['Parade', 1.2, 'ffbe0b fb5607 ff006e 0f8973 3a86ff'],
      ['Pueblo', 1.2, 'e07a5f f2cc8f 81b29a 5a5f8a f4f1de'], ['Orchard', 1.2, 'f94144 f3722c f8961e f9c74f 90be6d 43aa8b 577590'], ['Toybox', 1.2, 'ff5a4e ffcb47 ff9a3c 2f6fd0 2b4f7a'],
      ['Saffron', 1.2, 'fff1d0 f0b808 b8401c 086788 e88a1c'], ['Papaya', 1.2, 'ff9f1c ffbf69 ffffff cbf3f0 2ec4b6'], ['Poppy', 1.2, 'd62828 f77f00 fcbf49 eae2b7 457b9d'],
      ['Marigold', 1.2, 'ff7b00 ff9500 ffb700 ffd000 ffea00'], ['Verdigris', 1.2, 'bb3e03 ee9b00 e9d8a6 94d2bd 0a9396'], ['Lemonade', 1.2, 'ffe66d ff6b6b 4ecdc4 f7fff7 2f7f86'],
      ['Kite', 1.2, 'f9c80e f86624 ea3546 4175c3 43bccd'], ['Toucan', 1.2, 'ffbc42 d81159 8f2d56 218380 73d2de'], ['Zinnia', 1.2, 'ff006e ff5400 ffbd00 ffe8a3'],
      ['Amber', 1.2, 'e36414 ff9e00 ffb627 ffd27a fff1cc'], ['Infrared', 1.2, 'e5172f ff4d00 ff0080 ffd6e8'], ['Sherbet', 1.2, '70d6ff ff70a6 ff9770 ffd670 e9ff70'],
      ['Vinyl', 1.2, 'f4a259 f4e285 8cb369 5b8e7d bc4b51'], ['Sideboard', 1.2, 'fff3b0 e09f3e c0544b 4a7f8c 9e2a2b'], ['Claret', 1.2, 'a4133c ff4d6d ff8fa3 ffccd5 ffd166'],
      ['Jukebox', 1.2, 'e8303f f57a2a ffc23d 1f6f7a 7a1a33'], ['Lagoon', 1.2, 'd9ed92 99d98c 52b69a 168aad 1e6091'], ['Tidepool', 1.2, '2a9d8f e9c46a f4a261 e76f51 2f5d6e'],
      ['Seaglass', 1.2, '05668d 028090 00a896 02c39a f0f3bd'], ['Regatta', 1.2, '00509d 3f8efc fdc500 ffd500 fffbe6'], ['Shoreline', 1.2, '006d77 83c5be edf6f9 ffddd2 e29578'],
      ['Voltage', 1.2, '00f5ff 00bbf9 0077ff 4d00ff e0fbff'], ['Pinata', 1.2, '2f6aa0 ef476f ffd166 06d6a0 fcfcfc'], ['Mariner', 1.2, 'e63946 f1faee a8dadc 3f7fbf 2b4f8f'],
      ['Turquoise', 1.2, '07beb8 3dccc7 68d8d6 9ceaef c4fff9'], ['Estuary', 1.2, '2289c3 33b8ca 74d1c0 e8d4a1 fcf4e7'], ['Delft', 1.2, '1f4fb0 4f86f7 a9c8ff f4f8ff'],
      ['Porcelain', 1.2, '0047ab 6f9cff ff6f61 ffd8cc ffffff'], ['Kingfisher', 1.2, '1f5fd1 9cc4ff f58a1f ffd9a8'], ['Iris', 1.2, '4361ee 4895ef 4cc9f0 f72585 fdf0ff'],
      ['Limeade', 1.2, 'ece655 d8d018 a6c91d 6ebe2f 38a872'], ['Dewdrop', 1.2, 'f2c5cd e7bf91 a3c4f3 90dbf4 8eecf5 98f5e1 b9fbc0'], ['Seaside', 1.2, 'ffb5a7 fcd5ce f8edeb a2d2ff 5fa8d3'],
      ['Kimono', 1.2, '00afb9 0081a7 fdfcdc fed9b7 f07167'], ['Aurora', 1.2, '7400b8 5e60ce 4ea8de 56cfe1 72efdd 80ffdb'], ['Wisteria', 1.2, 'ffcbf2 f3c4fb deaaff c0fdff b8c0ff'],
      ['Peony', 1.2, 'ff4d6d ff758f ff8fa3 ffb3c1 fff0f3'], ['Thistle', 1.2, 'c77dff e0aaff eee0ff 7ccf5a ffffff'], ['Bubblegum', 1.2, 'ff0a54 ff5c8a ff99ac 00e5ff fbffe2'],
      ['Crocus', 1.2, '7b2cbf c77dff ffd60a fff3b0'], ['Mermaid', 1.2, '1e78aa 45c9c9 06d6a0 e0fff4'], ['Fuchsia', 1.2, 'c800a1 ff48c4 ff7ad9 ffa6e6 ffd6f5'],
      ['Blossom', 1.2, 'ffb7c5 ff8fab fb6f92 ffe5ec 8ecae6'], ['Vesper', 1.2, 'ffd60a ffc300 1282c2 08306c f8f7ff'], ['Boardwalk', 1.2, 'ff71ce 01cdfe 05ffa1 ff644f fffb96'],
      ['Macaron', 1.2, 'ffadad ffd6a5 fdffb6 caffbf 9bf6ff ff9cc0'], ['Meringue', 1.2, 'd3bba4 ffc8dd ffafcc bde0fe a2d2ff'], ['Harvest', 1.2, '3a6b4f a3b18a fefae0 dda15e bc6c25'],
      ['Semaphore', 1.2, '8d99ae edf2f4 ef233c d90429'], ['Beacon', 1.2, 'fca311 e5e5e5 ffffff 5c677d'], ['Typeset', 1.2, 'f8f4e3 ff8552 297373 85ffc7'],
      ['Patina', 1.2, 'c9793a e6a36b 3aa28a 8fe0c9 f6efe4'], ['Lacquer', 1.2, 'ffffff ff2a2a 9a9a9a'], ['Offset', 1.2, '19c3e6 ef47c4 ffe234 ffffff'],
      ['Primary', 1.2, 'd8434e 26467f e8b04a f4f1e8'], ['Watermelon', 1.2, '00c16e ff66c4 fff4fb 037a46'], ['Wasp', 1.2, 'ffe600 fffbe0 3a3226'],
      ['Lifeboat', 1.2, '00b3a4 ff3b30 fff3e6'], ['Buoy', 1.2, 'ff7a00 ffb347 2b4c9b dbe4ff'], ['Vermilion', 1.2, '3550c4 f2542d ffe0b2 ffffff'],
      ['Regalia', 1.2, 'c8175d f3e6cf 2b55a8 f2c230'],
      ['Tangelo', 1.2, 'ff5d00 ff8500 ffb100 00a6fb 0582ca'], ['Glowstick', 1.2, '08f7fe 09fbd3 fe53bb f5d300'], ['Tulip', 1.2, 'e4572e f3a712 a8c686 669bbc 3c4a86'],
      ['Peacock', 1.2, '3e92cc fffaff d8315b 2a52be'], ['Sunflower', 1.2, 'ffb703 fb8500 8ecae6 219ebc 2f6690'], ['Tropic', 1.2, '00a878 d8f1a0 f3c178 fe5e41'],
      ['Bunting', 1.2, 'd62839 ffba08 3f88c5 1d3557 f4f4f9'], ['Firework', 1.2, '0871d1 f107a3 ff8a00 ffe29a'], ['Zest', 1.2, 'f9dc5c e84855 3185fc efbcd5'],
      ['Persimmon', 1.2, 'ff6b3d ffb199 ffe8d6 3f6c9a'], ['Matcha', 1.2, '9bc53d c5e384 f4f9e9 5b8c5a e9b872'], ['Lido', 1.2, '6fcfcf c2eaf0 ff9ecf ffd6a5 3088da'],
      ['Clementine', 1.2, 'ff8c42 ffd166 fff1d6 3bceac'], ['Coralline', 1.2, 'ff5d73 ff8fa3 ffc2d1 ffe5ec 7ae7c7'], ['Pool', 1.2, '00c2d1 7fe7e7 f9f9f9 ffd23f ff7f51'],
      ['Apricot', 1.2, 'ffb38a ff8552 ffe3d3 6ecbc7'], ['Blueberry', 1.2, '3d5af1 6f8cff a9bbff ffe14d'], ['Citron', 1.2, 'e9ff70 c8f560 7bd389 2ec4b6 ffffff'],
      ['Raspberry', 1.2, 'd81e5b f0544f ff9b85 ffd9c0 3a86c8'], ['Spearmint', 1.2, '6da9e0 b8cdf8 95f2d9 1cfeba'], ['Jadeite', 1.2, '00a676 37d6a4 a8f0d8 f7f9f9 ff6f59'],
      ['Afterglow', 1.2, 'ff4e50 fc913a f9d423 ede574 e1f5c4'], ['Floe', 1.2, 'e0fbfc c2dfe3 9db4c0 6f8794 ee6c4d'], ['Honeydew', 1.2, 'd8f3dc b7e4c7 74c69d 40916c ffb4a2'],
      ['Cornflower', 1.2, '6c8cff 9fb8ff d0dcff fff3b0 ff8fab'], ['Seafoam', 1.2, '9ef0e0 5fd1c1 2aa198 fdf6e3 ff8a5b'], ['Orchid', 1.2, 'da70d6 ee9ae5 f7c5f0 7bdff2 f2f7f2'],
    ];
    let setName = (() => { let total = 0; for (const e of SETS) total += e[1]; let r = dice() * total; for (const e of SETS) { r -= e[1]; if (r < 0) return e[0]; } return SETS[0][0]; })();
    if (want[5]) setName = want[5];
    // a print's sheet: the field it is printed on, the flat tone of its lit sides, the key ink of its lines and its
    // hatching, and the paper left bare (its tops and its margin)
    const sheet = choose(['Canary', '#ffd21f', '#2a5cc4', '#17171c', '#f6f2e7'], 3, ['Cobalt', '#2a5896', '#f2b632', '#0b1830', '#f4efe3'], 3, ['Baize', '#0b6633', '#ff8a9e', '#04200f', '#f6f0e2'], 2.5,
      ['Brick', '#972929', '#f2a65a', '#260909', '#ffeedd'], 2.5, ['Tangerine', '#fe8d00', '#17707c', '#0e1820', '#fff5e6'], 2.5, ['Vellum', '#e6e0d2', '#0b62b0', '#0c1a33', '#ffffff'], 2,
      ['Carbon', '#262625', '#e8452c', '#000000', '#efe9dd'], 2, ['Blush', '#e3a0be', '#2b3f9e', '#151515', '#fbf4ee'], 2, ['Manila', '#dfc6a9', '#c4372b', '#2a1807', '#fbf5ea'], 2, ['Sky', '#009be1', '#ffcf3a', '#06263f', '#ffffff'], 2);
    let light = choose('Flat', 2.3, 'Cast', 2.8, 'Haze', 1.2, 'Sunrise', 1.35, 'Sunset', 1.2, 'Window', 2.2, 'Moonlit', 1.4, 'Round the Clock', 1.1);
    // the room: plain walls, seldom a faint weave of two close tones in squares of four cubes, or (only for a big build in
    // strong colour) a void; how light it is is rolled once the build is known
    let room = choose('Plain', 8.6, 'Tiled', 0.9, 'Void', 2.6);
    // the order it is laid in: always a clean sweep, most often row by row, back and forth, or along the diagonal
    let method = choose('Layer by Layer', 4, 'Printed', 2, 'Swept', 3, 'Outward', 2, 'Grown', 2, 'Printed', 1, 'Column by Column', 1, 'Column by Column', 2, 'Part by Part', 2);
    if (form.nat && rand() < 0.7) method = 'In Its Own Order';
    const undo = choose('Unbuilt', 4, 'Melted', 3, 'Unbuilt', 2);
    const born = form.fam === 'Heaps' || form.fam === 'Surfaces';       // forms that were made to move
    const life = form.id === 'Heap' ? choose('Restless', 7, 'Rebuilt', 2) : form.live ? choose('Restless', born ? 7 : 4, 'Rebuilt', 2, 'Reworked', 2) : choose('Rebuilt', 4, 'Reworked', 5);
    moving = life === 'Restless';
    let finish = form.bare || rand() > 0.3 ? 'Whole' : choose('Hollowed', 3, 'Sliced', 1, 'Pierced', 1.5, 'Worn', 1.5);
    // company: how many of its kind stand together (only things that stand free and hold still can have company)
    let company = moving || form.corner || form.solo || form.id === 'Crib' || rand() > 0.22 ? 'Alone' : choose('Pair', 4, 'Row', 2, 'Quartet', 3);
    const nAlone = n;
    if (company !== 'Alone') n = form.sizes[0];

    // what it is made of, and how it moves while it stands, are rolled from a stream of their own
    const also = stream((hi ^ 0x7f4a7c15) >>> 0 || 1, (lo + 0x632be5ab) >>> 0 || 2);
    for (let i = 0; i < 4; i++) also();
    const pick = (...opts) => { dice = also; const v = choose(...opts); dice = rand; return v; };
    const land = form.fam === 'Heaps' || form.fam === 'Grounds' || form.fam === 'Surfaces', wildRoll = also() < (land ? 0.75 : 0.22), some = also() < 0.45;
    let matter = !some ? '' : wildRoll ? pick('Earth', 2, 'Alpine', 1.6, 'Desert', 3, 'Tundra', 2.5, 'Volcanic', 3, 'Lode', 2.5, 'Seams', 2.5, 'Badlands', 3, 'Saltpan', 2.2, 'Fungal', 2.5, 'Cinder', 2.5, 'Geode', 2.5, 'Lunar', 2.2)
      : pick('Gold', 3, 'Copper', 2.5, 'Steel', 2.5, 'Chrome', 2, 'Rusted', 2, 'Timber', 3, 'Brickwork', 3, 'Stonework', 2.5, 'Concrete', 2, 'Marble', 2.5, 'Glass', 2.5, 'Ice', 2, 'Obsidian', 1.5, 'Gems', 2.5, 'Glazed', 2.5, 'Metals', 3.5, 'Works', 3, 'Masonry', 2.5, 'Treasury', 2.5,
        'Bismuth', 3, 'Lumen', 3.5, 'City', form.fam === 'Towers' ? 9 : 2.5, 'Jade', 2.2, 'Lapis', 2.2, 'Terracotta', 2, 'Faience', 2.2, 'Circuit', 2.2, 'Opal', 2);
    if (matter && form.id === 'Volcano') matter = pick('Volcanic', 3.5, 'Cinder', 3, 'Alpine', 1.5, 'Tundra', 1.5, 'Badlands', 2, 'Lunar', 1.5, 'Saltpan', 1);
    else if (matter && form.id === 'Hopper' && also() < 0.5) matter = 'Bismuth';
    else if (matter && form.id === 'Fountain') matter = pick('Marble', 3, 'Stonework', 3, 'Brickwork', 2, 'Jade', 1, 'Faience', 1.5, 'Terracotta', 1.5, 'Concrete', 1, 'Gold', 0.7);
    // grey ground (moon dust, a geode's dark rind) reads only as a strong shape: on a heap, a residue, a mesa, crates or a
    // rolling surface it is a grey mush, so those take another ground
    if ((matter === 'Lunar' || matter === 'Geode') && !/^(Skyline|Spire|Organ|Pagoda|Chimneys|Lighthouse|Volcano|Arcade|Gates|Bridge|Keep|Temple|Ziggurat|Octahedron|Torus|Knot|Hoops|Dome|Wedges|Amphitheatre|Steps|Hall|Cube Frames|Ramp|Helix|Carving|Canyon)$/.test(form.id))
      matter = pick('Desert', 3, 'Tundra', 2.5, 'Volcanic', 3, 'Lode', 2.5, 'Seams', 2.5, 'Badlands', 3, 'Saltpan', 2.2, 'Fungal', 2.5, 'Cinder', 2.5);
    // a fine form (or a thin one: a crib, pipes, jacks, a nest) in a busy matter is a mush: it takes a calm one
    if ((form.fine || /^(Crib|Pipes|Jacks|Nest)$/.test(form.id)) && /^(Bismuth|Opal|Geode|Circuit|Treasury|Masonry|Metals|Works|Gems|Seams|Lode|Badlands|Fungal|Saltpan|Marble|Chrome|Faience)$/.test(matter)) matter = pick('Gold', 3, 'Copper', 2, 'Steel', 2, 'Jade', 2, 'Lapis', 1.5, 'Terracotta', 1.5, 'Obsidian', 1.5, 'Glazed', 2, 'Lumen', 2, 'Timber', 1.5, 'Ice', 1);
    if (want[1]) matter = want[1] === '-' ? '' : want[1];
    const wild = ['Earth', 'Alpine', 'Desert', 'Tundra', 'Volcanic', 'Lode', 'Seams', 'Badlands', 'Saltpan', 'Fungal', 'Cinder', 'Geode', 'Lunar'].indexOf(matter) >= 0;
    let cover = matter && !wild ? pick('Bare', 12, 'Turfed', 0.9, 'Mossy', 0.9, 'Snowed', 2.5, 'Gilded', 2.2) : 'Bare';
    if ((cover === 'Gilded' && matter === 'Gold') || matter === 'Lumen') cover = 'Bare';
    if (want[3]) cover = want[3];
    // the motion: a thing that leans on the walls cannot turn (nor can a screen, which would show its edge), and a fine lattice turns to dust if it tries
    let motion = moving ? 'Its Own' : form.corner || form.still ? pick('Heaving', 4, 'Pumping', 3, 'Scanning', 2.5, 'Flooding', 5.5, 'Settling', 2)
      : form.fine ? pick('Scanning', 4, 'Heaving', 3, 'Pumping', 2, 'Swaying', 3, 'Flooding', 3, 'Settling', 1)
        : pick('Turning', 6, 'Twisting', 3, 'Swaying', 2.5, 'Heaving', 3, 'Pumping', 2.5, 'Scanning', 2.5, 'Flooding', 5, 'Settling', 1.5);
    if (form.wet && !moving && also() < 0.8) motion = 'Flooding';      // a form made for water mostly has it
    // a twist reads only on a thing round in plan: one of square courses tears into a ragged heap as it twists, so it
    // turns instead (a quarter at a time, resting square between)
    if (motion === 'Twisting' && !/^(Ball|Torus|Dome|Hoops|Helix|Bubbles|Molecule|Knot|Lighthouse|Fountain|Volcano|Coral|Ribbons|Turning|Carving|Drilled)$/.test(form.id)) motion = 'Turning';
    if (want[2] && !moving) motion = want[2];
    if (motion === 'Turning' || motion === 'Twisting') n = form.sizes[0];      // its room must hold its diagonal
    // none of it hurries: a turn takes most of a minute, a wave ten seconds to pass
    const spinW = (also() < 0.5 ? -1 : 1) * TAU / (30 + also() * 20), twA = (0.3 + also() * 0.5) * M.PI * (also() < 0.5 ? -1 : 1), twW = TAU / (16 + also() * 10);
    const swA = 1 + fl(also() * 1.6), swW = TAU / (7 + also() * 6), swK = 0.25 + also() * 0.7, swKind = fl(also() * 4), swS = 1 + fl(also() * 3);
    const hvA = 1 + fl(also() * 2.2), hvW = TAU / (6 + also() * 6), hvKind = fl(also() * 4), hvLam = 0.4 + also() * 0.7, pumpDiv = 3 + fl(also() * 6);
    const scAxis = fl(also() * 4), scW = TAU / (18 + also() * 10), standFor = 14 + also() * 8, root = 45 + fl(also() * 12);
    // what runs down it, from its own springs or from the pointer: hot ground runs with molten rock, cold ground with water
    const hot = matter === 'Volcanic' || matter === 'Cinder', cold = matter === 'Tundra' || matter === 'Alpine' || matter === 'Ice';
    let liquid = pick('Water', hot ? 1 : cold ? 6 : 5, 'Oil', hot || matter === 'Obsidian' ? 0.6 : matter === 'Desert' ? 5 : 2.5, 'Magma', hot ? 8 : cold ? 1.2 : 3);
    if (form.id === 'Volcano' && also() < 0.7) liquid = 'Magma';
    // (and it stands out from what it runs over: oil, which is dark, never on a dark ground or stone, nor water on a blue one)
    if (/^(Obsidian|Volcanic|Cinder|Geode|Lunar|Steel|Circuit|Bismuth|Lode|Seams|Metals|Works)$/.test(matter) && liquid === 'Oil') liquid = hot ? 'Magma' : 'Water';
    if (/^(Lapis|Faience|Opal|Chrome|Glass)$/.test(matter) && liquid === 'Water') liquid = 'Magma';
    const dryWant = /^(Sand|Marbles|Ivy|Frost)$/.test(want[4]);
    if (want[4] && !dryWant) liquid = want[4] === 'Molten' ? 'Magma' : want[4];
    // what moves over it is a liquid on about half; on the rest it is sand, marbles or something growing, each leaning to the
    // builds it suits (drawn from a stream of its own, so whatever keeps its liquid keeps the very one it had). A build of
    // its own springs keeps its liquid, and so does one that never rests
    const fr = stream((lo ^ 0x6a09e667) >>> 0 || 9, (hi + 0x510e527f) >>> 0 || 10);
    let flow = liquid;
    {
      const sandy = /^(Desert|Saltpan|Badlands|Lunar)$/.test(matter) || /^(Dunes|Heap|Drift|Scree|Mesa|Canyon|Quarry|Hopper|Swell|Ripple)$/.test(form.id);
      const stepped = form.fam === 'Steps' || /^(Terraces|Pagoda|Bit Pyramid|Helix|Skyline|Plates|Shelves|Blocks)$/.test(form.id);
      const ruin = /^(Stonework|Masonry|Brickwork|Marble|Concrete|Terracotta|Earth|Jade|Seams|Ice|Tundra|Alpine)$/.test(matter) || /^(Temple|Garden|Keep|Arcade|Gates|Hall|Bridge|Organ|Lighthouse|Coral)$/.test(form.id) || finish === 'Worn';
      const wS = sandy ? 4.2 : 1, wM = (stepped ? 4.5 : 1.15) * (form.fine ? 0.3 : 1), wG = (ruin ? 3 : 1) * (form.fine ? 1.6 : 1);
      if (!form.wet && !moving && fr() < 0.645) { const r = fr() * (wS + wM + wG); flow = r < wS ? 'Sand' : r < wS + wM ? 'Marbles' : 'Ivy'; }
      if (dryWant && !moving) flow = want[4];
      // (on what is cold, or under snow, the growth is frost)
      if (flow === 'Ivy' && (cold || /^(Steel|Chrome|Glass|Lunar|Opal|Faience|Geode)$/.test(matter) || cover === 'Snowed')) flow = 'Frost';
    }
    let dry = flow === 'Sand' ? 1 : flow === 'Marbles' ? 2 : flow === 'Ivy' || flow === 'Frost' ? 3 : 0;

    if (life === 'Restless' && (paint === 'Shells' || paint === 'Order')) paint = 'Strata';
    if (paint === 'Parts' && form.parts < 2) paint = 'Strata';
    if (form.fine && paint === 'Ink') paint = form.parts > 1 ? 'Parts' : 'Three Tone';
    // a print reads only on a form of big clean planes, and a checker only on one of broad ones: on a busy form the
    // one turns to a scribble and the other to a moire (as it does on small cubes)
    const drawn = /^(Skyline|Steps|Pagoda|Plates|Cube Frames|Arcade|Gates|Crates|Blocks|Keep|Temple|Shelves|Wedges|Organ|Spire|Lighthouse|Hall|Amphitheatre|Chimneys)$/.test(form.id);
    if (paint === 'Ink' && !drawn
      || (paint === 'Checker' && (n > 20 || !/^(Ziggurat|Skyline|Steps|Mesa|Crates|Blocks|Plates|Quarry|Wedges|Canyon|Keep|Garden)$/.test(form.id)))) paint = form.parts > 1 ? 'Parts' : 'Three Tone';
    // (and a form that prints well is printed a little more often, so about one in thirty is a print)
    else if (paint === 'Three Tone' && drawn && rand() < 0.7) paint = 'Ink';
    if (paint === 'Tops' && !form.flat) paint = 'Strata';
    // coloured in its order of growth from the middle out, a ball shows rings like an eye
    if (paint === 'Order' && form.fam === 'Rounds') paint = form.parts > 1 ? 'Parts' : 'Strata';
    // a rolling surface takes its bands level, as contours: slanting ones cross its ripples into a muddle
    if (paint === 'Bands' && form.fam === 'Surfaces') paint = 'Strata';
    if (paint === 'Shells' && finish === 'Whole' && motion !== 'Scanning') paint = form.parts > 1 ? 'Parts' : 'Strata';
    if (finish === 'Hollowed' && paint !== 'Ink' && paint !== 'Wire' && rand() < 0.5) paint = 'Shells';
    if (matter) paint = 'Matter'; else if (want[6]) paint = want[6];
    // a lighthouse is coloured by its own parts (its bands, its rock, its gallery), never in courses up it like clothes
    if (form.id === 'Lighthouse' && /Strata|Bands|Order|Shells|Checker|Tops/.test(paint)) paint = 'Parts';
    // a print keeps to a plain sun, whose shadows it lays as flats of ink, and to whole forms that never turn, whose planes
    // stay clean (turned, a form of cubes goes ragged)
    if (paint === 'Ink') { light = 'Cast'; finish = 'Whole'; if (motion === 'Turning' || motion === 'Twisting') motion = also() < 0.5 ? 'Heaving' : 'Flooding'; }
    // (a print keeps its liquid, which it draws in its own way; and only a liquid floods: a build with sand, marbles or a
    // growth on it heaves, pumps, sways or is cut through instead)
    if (dry && paint === 'Ink' && !dryWant) { flow = liquid; dry = 0; }
    if (dry && motion === 'Flooding' && !want[2]) { const r = fr(); motion = r < 0.4 ? 'Heaving' : r < 0.7 ? 'Pumping' : r < 0.85 || form.corner || form.still ? 'Scanning' : 'Swaying'; }
    // what shines is more often seen after dark
    if ((/Lumen|City|Cinder|Fungal|Volcanic/.test(matter) || (liquid === 'Magma' && motion === 'Flooding')) && paint !== 'Ink' && paint !== 'Wire' && also() < 0.5) light = also() < 0.75 ? 'Moonlit' : 'Round the Clock';
    if (want[7]) light = want[7];
    // after dark a few lights drift round it
    const wispN = light === 'Moonlit' || light === 'Round the Clock' ? 3 + fl(also() * 4) : 0;
    const planSeed = (rand() * 4294967296) >>> 0, bandW = 1 + fl(rand() * 3), bandAxis = fl(rand() * 3), partShift = fl(rand() * 8), swap = rand() < 0.5;
    // a grey build is seen more often by a coloured light: a sunrise, a sunset or a window (read from bits already drawn)
    if (!want[7] && paint !== 'Ink' && paint !== 'Wire' && (matter ? /^(Concrete|Steel|Chrome|Marble|Stonework|Lunar|Rusted)$/.test(matter) : setName === 'Pewter')
      && (light === 'Flat' || ((light === 'Haze' || light === 'Cast') && (planSeed & 7) < 5))) light = ['Sunrise', 'Sunset', 'Window'][(planSeed >>> 3) % 3];
    // and a build already warm or pink never by a low sun, which only warms it on into a brown: a high sun instead
    if (!want[7] && (light === 'Sunrise' || light === 'Sunset') && (cover === 'Gilded' || (matter ? /^(Gold|Copper|Bronze|Rusted|Timber|Brickwork|Terracotta|Desert|Badlands|Volcanic|Cinder)$/.test(matter) : (SETS.find(e => e[0] === setName)[2].match(/\w{6}/g) || []).filter(h => parseInt(h.slice(0, 2), 16) > parseInt(h.slice(4), 16) + 40).length * 2 > (SETS.find(e => e[0] === setName)[2].match(/\w{6}/g) || [1]).length))) light = 'Cast';
    const arrival = moving ? 'Placed' : choose('Placed', 6, 'Dropped', 4);
    c.trait('Build', form.id); c.trait('Kind', form.fam); c.trait('Side', n);
    c.trait('Paint', paint);
    if (matter) { c.trait('Matter', matter); c.trait('Cover', cover); }
    if (!matter || matter === 'Glass' || matter === 'Glazed' || matter === 'Lumen') c.trait(paint === 'Ink' ? 'Sheet' : 'Colours', paint === 'Ink' ? sheet[0] : setName);
    c.trait('Light', light); c.trait('Wisps', wispN || 'None');
    c.trait('Company', company); c.trait('Method', method); c.trait('Arrival', arrival); c.trait('Life', life); c.trait('Motion', motion); c.trait('Flow', flow === 'Magma' ? 'Molten' : flow); c.trait('Finish', finish);

    // ---- colours ----
    const hex3 = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
    // a colour as hue (0 to 1 round the wheel), saturation and lightness, and back again
    const hsl = c => {
      const r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, top = mx(r, g, b), low = mn(r, g, b), l = (top + low) / 2, d = top - low;
      return d < 1e-6 ? [0.64, 0, l] : [(top === r ? ((g - b) / d + 6) % 6 : top === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6, d / (1 - ab(2 * l - 1) + 1e-6), l];
    };
    const rgb = (h, s, l) => { const f = q => { const u = (q + h * 12) % 12; return 255 * (l - s * mn(l, 1 - l) * mx(-1, mn(u - 3, 9 - u, 1))); }; return [f(0), f(8), f(4)]; };
    // a hue moved toward another by the short way round, by no more than so much
    const toward = (h, to, by) => { const d = ((to - h + 1.5) % 1) - 0.5; return (h + mx(-by, mn(by, d)) + 1) % 1; };
    // a colour in a given light (1: full light, its own colour). In less it is darker, but not by a grey: its hue turns
    // toward blue-violet and it grows a little more saturated, so a yellow shades to orange and red, a green to teal;
    // in more it is lighter and turns toward yellow.
    const lightAt = (c, l) => {
      const q = hsl(c), dark = mx(0, 1 - l), over = mn(1, mx(0, l - 1) * 2);
      // as value (how bright its brightest part is) and strength (how far it is from grey at that brightness)
      let v = q[2] + q[1] * mn(q[2], 1 - q[2]), st = v > 1e-6 ? 2 * (1 - q[2] / v) : 0;
      const grey = mx(0, 1 - st / 0.3);
      if (l < 1) { v *= M.pow(l, 0.65); st = mn(1, st * (1 + 0.14 * dark) + 0.04 * dark); } else { v += (1 - v) * over * 0.4; st *= 1 - 0.3 * over; }
      const L = v * (1 - st / 2), m = mn(L, 1 - L), out = rgb(l < 1 ? toward(q[0], 0.69, 0.1 * dark) : toward(q[0], 0.14, 0.04 * over), m > 1e-6 ? (v - L) / m : 0, L);
      // (a colour near grey has no hue of its own to keep: in shade it goes over to a slate and in more light to a cream of
      // the same lightness, so a grey thing has coloured shadows and a warm lit top, never a grey mush)
      if (grey > 0 && (dark > 0 || over > 0)) { const tc = l < 1 ? rgb(0.62, 0.3 * dark, L) : rgb(0.11, 0.14 * over, L); for (let ch = 0; ch < 3; ch++) out[ch] += (tc[ch] - out[ch]) * grey; }
      return out;
    };
    // a colour too strong to shade (a neon: as bright and as pure as a screen makes it) taken a step down in both, so a
    // face can be lit past it and shaded under it; any other is kept
    const tame = c => {
      const q = hsl(c), v = q[2] + q[1] * mn(q[2], 1 - q[2]), st = v > 1e-6 ? 2 * (1 - q[2] / v) : 0;
      if (st < 0.8 || v < 0.86) return c;
      const v2 = mn(v, 0.9), s2 = 0.8 + (st - 0.8) * 0.3, L = v2 * (1 - s2 / 2), m = mn(L, 1 - L);
      return rgb(q[0], m > 1e-6 ? (v2 - L) / m : 0, L);
    };
    const wheel = h => {
      h = (h % 1 + 1) % 1 * 6;
      const i = fl(h), f = h - i, lowv = 0.9 * 0.15, up = 0.9 * (1 - 0.85 * (1 - f)), dn = 0.9 * (1 - 0.85 * f);
      const t = [[0.9, up, lowv], [dn, 0.9, lowv], [lowv, 0.9, up], [lowv, dn, 0.9], [up, lowv, 0.9], [0.9, lowv, dn]][i % 6];
      return [t[0] * 255, t[1] * 255, t[2] * 255];
    };
    // (the wheel is never the whole round of it, a rainbow, but a stretch of it, and runs from a pale to a deep)
    const hue0 = rand(), hueN = 3 + fl(rand() * 6), hueSpan = [0.42, 0.34, 0.26, 0.18][fl(rand() * 4)];
    const setRow = SETS.find(e => e[0] === setName);
    const pal = setRow && setRow[2] ? setRow[2].split(' ').map(h => hex3('#' + h))
      : Array.from({ length: hueN }, (_, i) => { const w = wheel(hue0 + hueSpan * i / (hueN - 1)), t = i / (hueN - 1); return w.map(v => t < 0.5 ? v + (255 - v) * (0.5 - t) * 0.9 : v * (1 - (t - 0.5) * 0.8)); });
    // a colour too dark to read in the room is lifted
    const liftUp = col => { const l = col[0] * 0.3 + col[1] * 0.59 + col[2] * 0.11; if (l < 72) { const up = 72 / mx(8, l); for (let ch = 0; ch < 3; ch++) col[ch] = mn(255, col[ch] * up + 14); } return col; };
    if (setName !== 'Unique') pal.forEach(liftUp);
    const order = pal.map((_, i) => i);
    for (let i = pal.length - 1; i > 0; i--) { const j = fl(rand() * (i + 1)), sw = order[i]; order[i] = order[j]; order[j] = sw; }
    const lum = i => pal[i][0] * 0.3 + pal[i][1] * 0.59 + pal[i][2] * 0.11;
    // The colours of a set take parts: one leads, one seconds it (the one furthest from it in lightness), one is kept
    // for accents (of those far from the lead in hue, or a little less far and also in lightness, the furthest in hue).
    // A set with no such colour for its lead is given one: a hue known to sit well against the lead's, light against a
    // dark lead and deep against a light one, so no build is one hue only. And they are dealt out as a run: graded from light to dark and
    // back, one leading with the others as thin bands, a pair, or all of them in turn; the accent comes up seldom.
    const hues = pal.map(c => hsl(c)), hueGap = (i, j) => { const d = ab(hues[i][0] - hues[j][0]); return mn(d, 1 - d) * mn(1, (hues[i][1] + hues[j][1]) * 2); };
    const apart = (i, j) => hueGap(i, j) >= 0.3 || (hueGap(i, j) >= 0.2 && ab(lum(i) - lum(j)) >= 45);
    const lead = setName === 'Unique' ? 0 : order[0];
    let second = lead, accent = lead, made = false;
    for (let i = 0; i < pal.length; i++) if (i !== lead && (second === lead || ab(lum(i) - lum(lead)) > ab(lum(second) - lum(lead)))) second = i;
    for (let i = 0; i < pal.length; i++) if (i !== lead && i !== second && apart(i, lead) && (accent === lead || hueGap(i, lead) > hueGap(accent, lead))) accent = i;
    if (accent === lead && apart(second, lead)) accent = second;
    if (accent === lead && setName !== 'Unique') {
      const q = hues[lead], dim = lum(lead) < 130;
      // its hue: a teal for a red or a pink, a blue for an orange or a yellow, an indigo for a green, an amber for a blue,
      // a gold for a violet; and a warm amber for a grey
      const h = q[0], to = q[1] < 0.15 ? 0.08 : h > 0.85 || h < 0.04 ? 0.48 : h < 0.18 ? 0.61 : h < 0.45 ? 0.67 : h < 0.7 ? 0.09 : 0.13;
      pal.push(liftUp(rgb(to, 0.82, dim ? 0.74 : 0.48))); hues.push(hsl(pal[pal.length - 1]));
      accent = pal.length - 1; order.push(accent); made = true;
    }
    if (accent === lead) for (let i = 0; i < pal.length; i++) if (i !== lead && i !== second && (accent === lead || hueGap(i, lead) > hueGap(accent, lead))) accent = i;
    if (accent === lead) accent = second;
    const NC = pal.length;
    // one colour shaded reads only where its top can be lit a clear step past its sides: never from a pale lead or a grey
    // one, nor in the greens of the rare set, which has no other hue for its accent, nor on a fine form, whose top is a scatter
    if (paint === 'Shade' && !want[6] && (lum(lead) > 175 || hues[lead][1] < 0.25 || setName === 'Unique' || form.fine)) { paint = 'Three Tone'; c.trait('Paint', paint); }
    const byLight = order.slice().sort((p, q) => lum(q) - lum(p)), ramp = byLight.filter(i => !made || i !== accent);
    const mix = setName === 'Unique' ? 'All' : choose('Graded', 3.5, 'One Leads', 3.5, 'Pair', 1.2, 'All', 1.8);
    // (in every run the lead takes the most of the build, the second less and the rest least: the lead's courses come three
    // at a time and the second's two, so no two strong colours ever stand at equal weight)
    const wide = i => i === lead ? [i, i, i] : i === second ? [i, i] : [i];
    const seq = setName === 'Unique' ? pal.map((_, i) => i) : mix === 'Graded' ? ramp.flatMap(wide).concat(ramp.slice(1, -1).reverse().flatMap(wide), made ? [accent] : []) : mix === 'One Leads' ? [lead, lead, second, lead, lead, second, lead, accent]
      : mix === 'Pair' ? (apart(second, lead) ? [lead, lead, second] : [lead, second, lead, lead, second, lead, accent]) : order.filter(i => !made || i !== accent).flatMap(wide).concat(made ? [accent] : []), SQ = seq.length;
    // painted by parts, a thing of many parts that never reaches the accent in the run gives it its last part; one of few
    // parts never gives a whole part to a colour the set was given; one of two or three has the lead for its first part
    // and never two of one colour side by side
    const pseq = Array.from({ length: mx(1, form.parts) }, (_, p) => seq[(p + partShift) % SQ]);
    if (form.parts > 1 && form.parts <= 3 && setName !== 'Unique') { pseq[0] = lead; pseq[1] = apart(second, lead) || accent === lead ? second : accent; if (form.parts === 3) pseq[2] = pseq[1] === second ? accent : second; }
    // (and one of four or more parts keeps to three colours, the lead on every other part, its first among them, so one
    // colour always leads and no three strong ones stand at equal weight)
    if (form.parts >= 4 && setName !== 'Unique') { const pat = [lead, second, lead, accent, lead, second], r = (partShift & 1) * 2; for (let p = 0; p < pseq.length; p++) pseq[p] = pat[(p + r) % 6]; }
    if (form.parts >= 4 && pseq.indexOf(accent) < 0) pseq[pseq.length - 1] = accent;
    if (made && form.parts < 4) for (let p = 0; p < pseq.length; p++) if (pseq[p] === accent) pseq[p] = lead;
    if (form.id === 'Lighthouse') {
      // its bands are the lead (or the first colour that is not skin-like) and the lightest other colour that is not;
      // the rock the darkest, the gallery and cap the accent
      const skin = i => (hues[i][0] > 0.96 || hues[i][0] < 0.13) && hues[i][2] > 0.58 && hues[i][2] < 0.94 && hues[i][1] > 0.2;
      const ok = order.filter(i => !skin(i)), a = ok.indexOf(lead) >= 0 ? lead : ok[0] === undefined ? lead : ok[0];
      const b = ok.filter(i => i !== a).sort((p, q) => lum(q) - lum(p))[0], bb = b === undefined ? second : b, rest = byLight.filter(i => i !== a && i !== bb);
      pseq[0] = a; pseq[1] = bb; pseq[2] = rest.length ? rest[rest.length - 1] : a; pseq[3] = skin(accent) || accent === bb ? a : accent;
    }
    if (!matter && paint !== 'Ink' && paint !== 'Three Tone' && paint !== 'Shade' && paint !== 'Shells' && paint !== 'Order') c.trait('Mix', paint === 'Checker' ? 'Pair' : mix);
    // three tones: the lightest of the three on top, the darkest on the side away from the light. They are the lead, the
    // lead a step deeper, and the second (or the accent, where the second is of the lead's own hue), so the lead takes two
    // faces of every cube and the other one
    const deep = (() => { const q = hues[lead]; return rgb(toward(q[0], 0.69, 0.04), mn(1, q[1] * 1.08), q[2] * 0.72); })();
    const three = setName === 'Unique' ? [pal[0], pal[1], pal[2]] : [pal[lead], deep, pal[apart(second, lead) || accent === lead ? second : accent]].sort((p, q) => (q[0] * 0.3 + q[1] * 0.59 + q[2] * 0.11) - (p[0] * 0.3 + p[1] * 0.59 + p[2] * 0.11));
    // The room is a ground, never a rival: a darker or quieter foil to the build, never its own hue and never louder
    // than it. Mostly the lead's opposite muted, or one beside the opposite; sometimes a warm or cool near-grey (and a
    // build with hardly any colour of its own stands in a quiet one). How light it is (pale as coloured paper, a clear middle, or deep but plainly
    // coloured) is chosen later against how light the build is, so the two part by lightness first. These draws come
    // from a stream of their own.
    const tint = stream((hi + 0x3c6ef372) >>> 0 || 3, (lo ^ 0x1b873593) >>> 0 || 4);
    for (let i = 0; i < 4; i++) tint();
    const bgRoll = rand(), tuneRoll = tint(), toneRoll = tint(), sideRoll = tint();
    // a colour of a hue and strength whose lightness to the eye is Y (0 to 255)
    const atLum = (h, s, Y) => { let a = 0, b = 1, q = null; for (let i = 0; i < 16; i++) { const m = (a + b) / 2; q = rgb(h, s, m); if (q[0] * 0.3 + q[1] * 0.59 + q[2] * 0.11 < Y) a = m; else b = m; } return q; };
    // how light the floor and the two walls are in each kind of room: three tones, so the corner reads
    const ROOMY = { Pale: [228, 214, 200], Mid: [146, 129, 113], Deep: [50, 41, 34] };
    // A middling or deep room is a colour of its own, from a few that hold, chosen against the build: an oxblood, a rust,
    // an ochre-brown, a forest, a teal, a petrol, an ink, an aubergine, a plum, a wine (its hue, its strength, how much
    // lighter it is drawn, and whether it is a warm one). A warm build takes a cool dark across the wheel from it or a
    // warm dark beside it; a cool one a warm dark or a cool one well apart; never its own hue. A pale room is a peach, a
    // sand, a mint, a sky or a paper more often than a pink, and seldom a lilac.
    // (the reds, the wine and the forest the least often: they were seen too much; an ink, an indigo, a petrol, a plum the most)
    const RICH = [[0.985, 0.56, 0.95, 1, 0.45], [0.035, 0.62, 0.95, 1, 0.55], [0.1, 0.62, 1.12, 1, 1], [0.375, 0.44, 1, 0, 0.45], [0.465, 0.56, 0.95, 0, 0.7], [0.525, 0.56, 0.95, 0, 1],
      [0.6, 0.5, 0.9, 0, 1.2], [0.66, 0.42, 0.95, 0, 1], [0.775, 0.34, 0.95, 0, 1], [0.855, 0.36, 0.95, 0, 0.9], [0.93, 0.5, 0.95, 1, 0.45]];
    // (and the pale ones, the same way: a peach, a sand, a mint, an aqua, a sky, seldom a blush or a lilac; how often each comes up is its last number)
    const PALE = [[0.06, 0.56, 1, 1, 1], [0.1, 0.5, 1, 1, 1], [0.42, 0.46, 1, 0, 1], [0.49, 0.48, 1, 0, 1], [0.565, 0.54, 1, 0, 0.8], [0.97, 0.4, 1, 1, 0.5], [0.72, 0.3, 1, 0, 0.35]];
    const richRoll = tint(), paleRoll = tint(), richPick = tint();
    const chroma = c => (mx(c[0], c[1], c[2]) - mn(c[0], c[1], c[2])) / 255;
    // the opposite of a hue as a room can take it: the opposite of a violet is an olive, which never sits well, so it
    // is an amber-brown or a deep teal instead; that of a yellow or a lime is a violet, which is a slate blue instead
    const foil = (h0, tone) => {
      const h = (h0 + 1) % 1;
      if (h > 0.12 && h < 0.4) return tone === 'Pale' ? (sideRoll < 0.5 ? 0.09 : 0.5) : sideRoll < 0.5 ? 0.075 : 0.47;
      if (h > 0.58 && h < 0.89) return h < 0.75 ? 0.565 : 0.95;      // (and a muted blue-violet reads as a lilac: it is a slate blue)
      return h;
    };
    const roomFor = (q, tone) => {
      let h, s, rich = -1;
      const warmLit = /Sunrise|Sunset|Window|Round the Clock/.test(light), lowSun = light === 'Sunrise' || light === 'Sunset';
      const gap = h2 => { const d = ab(h2 - q[0]); return mn(d, 1 - d); };
      // how strong the build's colour is (a material's mean colour is duller than its faces): the room stays under it
      const bc = tinted ? mx(chroma(pal[lead]), chroma(pal[second])) : chroma(seen.rgb) * 1.6;
      const opp = (q[0] + 0.5 + (bgRoll - 0.5) * 0.06) % 1;
      // (a build of hardly any colour of its own, a stone, a steel, a grey set, leaves the colour of the picture to its room)
      const dull = bc < 0.3;
      // (a grey build in a pale room: under a warm light a cool one, which the light warms to a grey)
      if (q[1] < 0.15 && tone === 'Pale') { h = (warmLit ? [0.5, 0.52, 0.55, 0.565] : [0.02, 0.08, 0.1, 0.47, 0.52, 0.55, 0.565, 0.08])[fl(bgRoll * (warmLit ? 4 : 8))]; s = 0.44; }
      else if (tone === 'Pale' || richRoll > 0.08 || dull) {
        // (a build's second colour is not echoed either, if it is a strong one; a green or a teal under a warm sun would
        // go olive, and a red, a plum or a wine under the moon goes purple, so those are kept from them; a low sun turns
        // the warm darks hot, so they are seldom seen by one)
        const TAB = tone === 'Pale' ? PALE : RICH, warmB = q[1] >= 0.15 && (q[0] < 0.17 || q[0] > 0.9), q2 = tinted && hues[second][1] >= 0.3 ? hues[second][0] : -9;
        const wt = TAB.map(e => {
          if (warmLit && e[0] > 0.3 && e[0] < 0.5 || light === 'Moonlit' && (e[0] > 0.8 || e[0] < 0.05)) return 0;
          if (lowSun && (e[0] > 0.75 || e[0] < 0.05)) return tone !== 'Pale' && (e[0] < 0.13 || e[0] > 0.9) ? 0.06 : 0.3;
          let w = q[1] < 0.15 ? 1 : gap(e[0]) < 0.1 ? 0 : dull ? 1 : gap(e[0]) >= 0.3 ? 2 : warmB && e[3] ? 1.5 : 1;
          const d2 = ab(e[0] - q2); if (mn(d2, 1 - d2) < 0.06) w *= 0.25;
          // (a deep room is the shade of the picture, so it is mostly a cool one: a warm dark, a maroon, a rust, a brown,
          // comes up less often, even across the wheel from a cool build)
          if (tone !== 'Pale' && (e[0] < 0.13 || e[0] > 0.9)) w *= 0.2;
          return w * e[4];
        });
        let r = (tone === 'Pale' ? tuneRoll : richPick) * wt.reduce((a, b) => a + b, 0), e = 0;
        while (e < TAB.length - 1 && (r -= wt[e]) >= 0) e++;
        while (e > 0 && !wt[e]) e--;
        h = TAB[e][0]; s = TAB[e][1] * (tone === 'Mid' ? 0.8 : 1); if (tone !== 'Pale') rich = e;
      } else { h = q[0] < 0.17 || q[0] > 0.9 ? [0.58, 0.5, 0.08][fl(sideRoll * 3)] : [0.08, 0.02, 0.58][fl(sideRoll * 3)]; s = 0.16; }      // (now and then a warm or cool near-grey)
      // half the time a painted build's room takes the hue of one of its own other colours (the most colourful of those
      // well apart from the lead), far lighter or deeper than the build, so the picture is one family of colour
      if (tinted && setName !== 'Unique' && (h3(lo >>> 0, hi >>> 0, 97) & 3) < 2) {
        let best = -1;
        // (but a deep room never from a red, an orange or a pink, which go to a maroon or a brown so deep)
        for (let i = 0; i < NC; i++) if (i !== lead && chroma(pal[i]) >= 0.25 && gap(hues[i][0]) >= 0.12 && (tone === 'Pale' || (hues[i][0] > 0.2 && hues[i][0] < 0.88)) && (best < 0 || chroma(pal[i]) > chroma(pal[best]))) best = i;
        if (best >= 0) { h = hues[best][0]; s = tone === 'Pale' ? 0.55 : 0.5; rich = -1; }
      }
      // a room never goes olive, khaki or mustard: that band is a sand when pale and a warm grey when deeper
      if (h > (tone === 'Pale' ? 0.14 : 0.1) && h < 0.37 && s > 0.15) { h = tone === 'Pale' ? 0.1 : 0.07; s = tone === 'Pale' ? 0.36 : 0.14; }
      // (under a warm sun a green or a teal room would go olive: it is turned to a blue-green)
      if (warmLit && h > 0.28 && h < (rich >= 0 ? 0.5 : 0.54)) h = 0.55;
      // and some pale rooms are a paper, warm or cool, hardly coloured at all
      if (tone === 'Pale' && paleRoll > 0.84 && !dull) { h = q[0] > 0.4 && q[0] < 0.75 && q[1] >= 0.15 ? 0.09 : 0.58; s = 0.2; }
      // never the build's own hue; by moonlight never a red or a pink, which the moon turns to a purple; under a low sun a
      // warm room is quieter, as the sun warms it; and never stronger in colour than the build (but round a grey build a
      // deeper room keeps some colour, as the picture has no other)
      if (light === 'Moonlit' && (h > 0.88 || h < 0.04)) h = 0.075;
      if (q[1] >= 0.15 && gap(h) < 0.1) { h = foil(opp, tone); s = mn(s, 0.3); if (light === 'Moonlit' && (h > 0.88 || h < 0.04)) h = 0.6; }
      if (lowSun && (h < 0.13 || h > 0.75)) s *= 0.6;
      const lift = rich >= 0 && tone === 'Deep' ? RICH[rich][2] : 1;
      // (the floor, which the light falls on, a little warmer if the room is a cool one; the walls, which the sky lights, a
      // little cooler; by the moon the one light is cool, and they keep one hue)
      const split = light === 'Moonlit' ? 0 : 0.03, coolR = h > 0.3 && h < 0.85, room3 = () => ROOMY[tone].map((Y, j) => atLum(j ? toward(h, 0.62, split * 0.8) : coolR ? toward(h, 0.08, split) : h, s, Y * lift));
      let out = room3();
      const lim = mx(tone === 'Pale' || q[1] >= 0.15 ? 0.06 : 0.15, bc * 0.85, dull ? (tone === 'Pale' ? 0.16 : 0.3) : 0), now = chroma(out[0]);
      if (now > lim) { s *= lim / now; out = room3(); }
      return out;
    };
    // what runs over a painted build always stands out from it: never water on a blue, teal or violet build (molten
    // rock instead), never molten rock on a red, orange or yellow one (water instead), never oil on a dark one
    if (!matter && !want[4] && paint !== 'Ink') {
      const q = hues[lead], strong = q[1] >= 0.25, was = liquid;
      if (liquid === 'Water' && strong && q[0] > 0.44 && q[0] < 0.8) liquid = 'Magma';
      else if (liquid === 'Magma' && strong && (q[0] < 0.15 || q[0] > 0.93)) liquid = 'Water';
      else if (liquid === 'Oil' && lum(lead) < 120) liquid = strong && q[0] > 0.44 && q[0] < 0.8 ? 'Magma' : 'Water';
      if (liquid !== was && flow === was) { flow = liquid; c.trait('Flow', flow === 'Magma' ? 'Molten' : flow); }
    }
    const liqRGB = liquid === 'Water' ? [0, 1, 2].map(ch => [38, 138, 232][ch] * 0.9 + pal[lead][ch] * 0.1) : liquid === 'Oil' ? [70, 52, 112] : [255, 128, 24];   // what runs over a painted build
    const field = hex3(sheet[1]), toneC = hex3(sheet[2]), inkc = hex3(sheet[3]), paper = hex3(sheet[4]);
    // (where a shadow falls the field is overprinted with the key; the room's own lines are in whichever of the key and
    // the paper stands out from the field)
    const fieldY = field[0] * 0.3 + field[1] * 0.59 + field[2] * 0.11, shadowC = field.map((v, ch) => v * 0.58 + inkc[ch] * 0.42), ruleC = fieldY > 110 ? inkc : paper;

    // ---- matter: a material is eight flat tones and a way of laying them over a face, texel by texel ----
    // [tones, pattern, a light runs over it, its tones move (1 wind, 2 waves, 4 heat, 5 a sheen; 3 its glints, held still), how much of it has turned,
    //  the lowest of its tones that shines by itself, the colour it throws on what is near (or 'tint'), how strongly]
    const STUFF = {
      // (a meadow: its beds of earth down the sides, then from a blue-green in its hollows to a gold-green where it is
      // lit; the soil in level beds of loam, umber and ochre that run on through the ground, never a speckle)
      turf: ['573629 8a4d2c b07b45 2c5a3e 4a7a38 6f9440 93ab55 b89c48', 1, 0, 1], soil: ['573629 8a4d2c b07b45', 2],
      moss: ['24473a 3b6646 5f8a4a 93ab62', 41],
      stone: ['5b5e64 6c7077 7e838a 90959c 3d4045', 3], sand: ['d2b064 e3c678 f1da92 c09a52', 4], sandstone: ['a8622e c07a3c d6934e e6ad68 8f4f24 f2c88a', 5],
      snow: ['e2eaf4 c3d1e4 e2eaf4 5b5e64 ffffff 6c7077 7e838a ffffff', 6, 0, 3], snowcap: ['e2eaf4 c3d1e4 e2eaf4 d2ddeb ffffff e2eaf4 c3d1e4 ffffff', 6, 0, 3],
      ice: ['7cc6e8 97d6f0 b5e5f8 97d6f0 ecfaff', 7, 1], water: ['3aa3d2 48b4de 5ac4e8 48b4de 48b4de 48b4de b4ecfa f4fdff', 8, 0, 2], foam: ['3e9cd8 52b0e4 68c2ee 52b0e4 52b0e4 52b0e4 c4f0fb f6feff', 8, 0, 2],
      oil: ['2e2648 3a2f5a 46386c 8a7ac8 c8f0f0 b48ccf 4a2e40 efe2ea', 28, 0, 5, 0, 3], molten: ['2a1210 5a1c0c e04a0a ff7a12 ffa322 ffd84a', 27, 0, 4, 0, 2, 'ff7016', 1.5],
      oilfall: ['463a6a 54467c 62528e 9a8ad8 dcfaf8 c8a0e0 5a3a50 fff4fa', 28, 0, 5, 0, 3], moltenfall: ['ff8a1a ffa322 ffc23a ffd84a ffe680 fff2b0', 27, 0, 4, 0, 0, 'ff8a20', 1.6],
      magma: ['1c0f0d 2e1712 a01c08 dc440a ff8a18 ffd84a', 9, 0, 4, 0, 2, 'ff5a10', 0.9], basalt: ['3a3a42 484851 575761 25252b', 10],
      leaf: ['173f30 24523a 24523a 2f6a3f 4f8a3e 7aa64a a8c060', 11, 0, 1], clay: ['b4532f c5653a 8f3f22', 12],
      timber: ['8a5a2a 9c6a33 ae7a3c 5c3a1a', 13], walnut: ['5a3a22 68452a 765032 38230f', 13],
      brick: ['9a3a2a ac4733 be553c ac4733 d9d0c0', 14], buff: ['c79a55 d4a962 e0b870 d4a962 efe6d2', 14], block: ['8f8674 a39a86 b8ae98 d0c7b0 5a5446 6f9a3c', 15],
      concrete: ['86888b 96989b a6a8ab 5f6164 b4642a 7f9c46', 16], marble: ['f2efe9 e4e0d8 e4e0d8 d2c6ae a8803c', 17, 1], nero: ['24242a 2e2e36 2e2e36 6a6a74 b9b9c4', 17, 1],
      gold: ['b47a0e e0a41c ffc832 fff0a0', 18, 1], bronze: ['6a4420 8f5f2c ad783a d09a56', 18, 1], steel: ['4a6488 6a8cb4 8cacd2 c4dcf4', 18, 1],
      copper: ['8a4520 b8622e d27a3e f2a467 b8622e 3aa28a 62c8ac', 18, 1, 0, 200], rusted: ['4c545e 707a86 8b96a2 b4bfca 707a86 b55a20 7c3a14', 18, 0, 0, 130],
      chrome: ['161b24 4a4440 a9c4dc f4f9ff 8a6a4e 7f9ab4', 19, 1], obsidian: ['1c1630 2a2148 3a2f64 8c7ee0 9f90f0', 20, 1],
      oreGold: ['5b5e64 6c7077 7e838a 90959c ffe272 d4961a', 26, 0, 3], oreCopper: ['5b5e64 6c7077 7e838a 90959c 7fe0c4 c8703a', 26, 0, 3], oreGem: ['5b5e64 6c7077 7e838a 90959c d2f6ff 3cc4ea', 26, 0, 3],
      glass: ['', 22, 1], gem: ['', 24, 1, 3], glazed: ['', 25, 1], wisp: ['', 30, 0, 0, 0, 0, 'tint', 1.7],
      bismuth: ['f2c14e e8509a 8a4fff 3a7bff 3ecf8e ffe9ff', 31, 1], lumen: ['', 32, 0, 0, 0, 3, 'tint', 0.5], cityOn: ['', 33, 0, 0, 1, 4, 'ffcf7a', 0.45], cityOff: ['', 33],
      jade: ['2e9e6b 3fb57d 3fb57d 8fdcb4 1f7a50', 17, 1], lapis: ['1d3fa8 2450c4 2a5fe0 1a348c ffe07a 4b78f2', 37, 1], terracotta: ['c8643c d6744a e08658 d6744a 8a3f24', 14],
      faience: ['f6f8ff e3ecff 1f4fd0 6f9cff 0f2f8f c8ccd8', 34, 1], circuit: ['0e5236 126a45 178254 e2bd52 ff5a3a 26262b', 35, 0, 3], opal: ['7a80c8 9ca8e6 ff9fd0 86ecc8 ffd98a ffffff 5a5fa0', 36, 1, 3],
      bed: ['', 5], salt: ['f4f1ee e9e4e0 fbf9f7 e9e4e0 ffffff', 7, 1, 3], ash: ['8d8a88 9c9997 aaa7a5 7a7775', 40], dust: ['8f9096 a0a1a8 b2b3ba 7c7d84', 40],
      mycel: ['2a1d3d 35254c 43305e 35254c 8a7ab8 1c1230', 2], heath: ['2a1d3d 35254c 43305e 6a3fa8 8250c8 9b68e0 c9a8ff ffe680', 1, 0, 1], cap: ['0c3b3a 126a60 22e0c0 7dffe6', 39, 0, 0, 0, 2, '22e0c0', 0.6],
      cinder: ['1e1916 2c2420 3a2f28 8a2408 ff6a1a ffd24a', 38, 0, 0, 0, 4, 'ff5a10', 0.55], glow: ['', 41, 0, 0, 0, 0, 'tint', 2.2],
    };
    const h3 = (a, b, e) => { let h = M.imul(a, 0x27d4eb2d) ^ M.imul(b, 0x165667b1) ^ M.imul(e, 0x1b873593); h = M.imul(h ^ h >>> 15, 0x2c1b3c6d); return (h ^ h >>> 13) >>> 0; };
    const mats = [null], got = {};
    const use = (name, tint) => {
      const key = tint ? name + tint.join() : name;
      if (got[key]) return got[key];
      const spec = STUFF[name], w = [255, 255, 255], K = [0, 0, 0], mix = (col, f, to) => [col[0] + (to[0] - col[0]) * f, col[1] + (to[1] - col[1]) * f, col[2] + (to[2] - col[2]) * f];
      // a material made from one colour: dark, shaded, itself, light, itself again (the one that sparks), grout, deep, white;
      // one with lit edges is nearly black but for them; a facade is wall, wall, wall, glass (dark at night, the sky's blue by
      // day), a lit window, ledge, a light roof
      const tones = !tint ? spec[0].split(' ').map(s => hex3('#' + s)) : name === 'lumen' ? [mix(tint, 0.9, K), mix(tint, 0.86, K), mix(tint, 0.82, K), tint, mix(tint, 0.5, w), tint, tint, w]
        : spec[1] === 33 ? [mix(tint, 0.35, K), mix(tint, 0.14, K), tint, /Moonlit|Round/.test(light) ? [34, 46, 78] : [66, 104, 152], [255, 216, 136], mix(tint, 0.4, K), mix(tint, 0.3, w), w]
          : [mix(tint, 0.55, K), mix(tint, 0.25, K), tint, mix(tint, 0.45, w), tint, [232, 228, 218], mix(tint, 0.4, K), w];
      while (tones.length < 8) tones.push(tones.length === 7 ? w : tones[1]);
      const glow = spec[6] ? (spec[6] === 'tint' ? tint : hex3('#' + spec[6])).map(v => v / 255 * spec[7]) : null;
      mats.push({ tones, pat: spec[1], glint: spec[2] || 0, anim: spec[3] || 0, q: spec[4] || 0, self: spec[5] === undefined ? 9 : spec[5], glow });
      return got[key] = mats.length - 1;
    };
    let isle = 0, stuffFor = null, wetNo = NC + 1, flakeNo = NC + 2, topZ = 1, fallNo = paint !== 'Ink' && paint !== 'Wire' ? NC + 6 : NC + 1;   // what falls shows lighter than what lies
    // the drifting lights: up to three colours of them, each a colour number of its own
    const wispCol = matter ? [[255, 206, 140], [140, 226, 255], [255, 150, 210], [190, 255, 150]].slice(form.lamp ? 0 : fl(rand() * 2), 4) : [0, 1, 2].map(j => pal[byLight[j % NC]].map(v => v + (255 - v) * 0.25));
    const wispCi = matter ? [] : [NC + 3, NC + 4, NC + 5];
    // Every build carries one hot light of its own (never a drawing, nor one with lamps or shining stuff of its own, nor
    // one with molten rock running down it): a few cubes lit deep in a recess, lit windows up a tower, a glowing seam
    // round a ground, or a lamp on its top. It is the brightest and most saturated thing in the picture, small, and of
    // the warm light the blue-violet shade is the foil to: an amber, or the set's accent where that is a hot hue apart
    // from the lead; a cyan on a build that is itself warm, and an ice blue in cold stuff.
    const glowOn = paint !== 'Ink' && paint !== 'Wire' && !form.lamp && !/^(Lumen|City|Cinder|Volcanic|Circuit|Fungal)$/.test(matter) && !(liquid === 'Magma' && motion === 'Flooding');
    const hotC = h => rgb(h, 1, h > 0.4 && h < 0.6 ? 0.6 : h < 0.04 || h > 0.8 ? 0.68 : 0.62);
    const glowCol = (() => {
      if (matter) return /^(Ice|Tundra|Alpine|Lapis|Faience|Chrome|Steel|Glass|Opal)$/.test(matter) ? [110, 222, 255] : /^(Gold|Copper|Bismuth|Brickwork|Terracotta|Desert|Badlands)$/.test(matter) ? hotC(0.5) : hotC(0.095);
      const qa = hues[accent], ql = hues[lead], gap = h => { const d = ab(h - ql[0]); return mn(d, 1 - d); };
      const warmLead = ql[1] >= 0.3 && (ql[0] < 0.17 || ql[0] > 0.9);
      if (qa[1] >= 0.45 && (qa[0] < 0.17 || qa[0] > 0.83) && (ql[1] < 0.3 || gap(qa[0]) >= 0.1)) return hotC(qa[0] < 0.17 ? mn(0.14, qa[0]) : qa[0]);
      return warmLead ? hotC(0.5) : hotC(0.095);
    })();
    let glowNo = glowOn && !matter ? NC + 7 : 0;
    if (matter) {
      const U = (...names) => names.map(nm => use(nm)), mixUp = list => { for (let i = list.length - 1; i > 0; i--) { const j = fl(also() * (i + 1)), s = list[i]; list[i] = list[j]; list[j] = s; } return list; };
      const gemTints = mixUp([[150, 80, 225], [30, 195, 115], [228, 40, 72], [45, 95, 235], [246, 172, 40]]), gemN = 2 + fl(also() * 3);
      // what the parts of a made thing are made of (one material, a few kinds of one, or a mix)
      const list = matter === 'Timber' ? U('timber', 'walnut') : matter === 'Brickwork' ? U('brick', 'buff') : matter === 'Stonework' ? U('block') : matter === 'Marble' ? U('marble', 'nero')
        : matter === 'Glass' ? pal.map(col => use('glass', col)) : matter === 'Glazed' ? pal.map(col => use('glazed', col)) : matter === 'Gems' ? gemTints.slice(0, gemN).map(col => use('gem', col))
          : matter === 'Metals' ? mixUp(U('gold', 'copper', 'steel', 'chrome', 'bronze')) : matter === 'Works' ? mixUp(U('timber', 'steel', 'copper', 'brick', 'concrete'))
            : matter === 'Lumen' ? pal.map(col => use('lumen', col)) : matter === 'City' ? mixUp([[176, 178, 190], [226, 186, 120], [204, 104, 76], [92, 132, 200], [100, 172, 150], [232, 226, 212]]).slice(0, 2 + fl(also() * 3)).flatMap(col => [use('cityOn', col), use('cityOff', col)])
            : matter === 'Badlands' ? mixUp([[200, 96, 60], [226, 150, 84], [240, 214, 170], [150, 84, 110], [124, 62, 50], [232, 186, 120]]).slice(0, 5).map(col => use('bed', col))
            : matter === 'Saltpan' ? [use('bed', [244, 164, 186]), use('bed', [124, 212, 200]), use('bed', [250, 238, 230])] : matter === 'Geode' ? (gt => [use('gem', gt), use('gem', [236, 236, 255]), use('lumen', gt)])(mixUp([[150, 80, 225], [60, 150, 235], [228, 70, 140]])[0])
            : matter === 'Terracotta' ? U('terracotta', 'clay')
            : matter === 'Masonry' ? mixUp(U('brick', 'block', 'concrete', 'marble', 'clay')) : matter === 'Treasury' ? mixUp([use('marble'), use('gold'), use('gem', gemTints[0]), use('obsidian'), use('nero')])
              : matter === 'Seams' ? mixUp(['stone', 'sandstone', 'clay', 'basalt', 'soil', 'sand']).slice(0, 4).map(nm => use(nm))
                : wild ? [1] : U({ Gold: 'gold', Copper: 'copper', Steel: 'steel', Chrome: 'chrome', Rusted: 'rusted', Concrete: 'concrete', Ice: 'ice', Obsidian: 'obsidian', Bismuth: 'bismuth', Jade: 'jade', Lapis: 'lapis', Faience: 'faience', Circuit: 'circuit', Opal: 'opal' }[matter] || 'stone');
      const m = {};
      for (const nm of ({ Earth: 'turf soil stone', Alpine: 'snow stone turf soil', Desert: 'sand sandstone', Tundra: 'snow ice basalt', Volcanic: 'basalt magma', Lode: 'stone oreGold oreCopper oreGem gold', Seams: 'turf', Saltpan: 'salt', Fungal: 'mycel heath cap', Cinder: 'cinder ash', Geode: 'basalt', Lunar: 'dust basalt' }[matter] || '').split(' ')) if (nm) m[nm] = use(nm);
      const tree = form.id === 'Coral' && (wild || matter === 'Timber'), top = cover === 'Turfed' ? use('turf') : cover === 'Mossy' ? use('moss') : cover === 'Snowed' ? use('snowcap') : cover === 'Gilded' ? use('gold') : 0;
      if (tree) { m.timber = use('timber'); m.leaf = use('leaf'); }
      // moon ground is lit from inside by a seam of glowing colour running through it
      if (matter === 'Lunar') m.vein = use('lumen', [[110, 220, 255], [255, 160, 70], [190, 120, 255]][fl(also() * 3)]);
      const sea = use(liquid === 'Oil' ? 'oil' : liquid === 'Magma' ? 'molten' : 'water');
      if (wispN || form.lamp) for (let j = 0; j < 3; j++) wispCi.push(use('wisp', wispCol[j]));
      fallNo = use(liquid === 'Water' ? 'foam' : liquid === 'Oil' ? 'oilfall' : 'moltenfall');
      // water takes a little of its scene: toward the hue of what it runs over, greener on moss, cooler by moonlight
      if (liquid === 'Water') {
        const s3 = [0, 0, 0];
        for (let j = 1; j < sea; j++) for (let ch = 0; ch < 3; ch++) s3[ch] += mats[j].tones[2][ch] / (sea - 1);
        const q = hsl(s3), green = cover === 'Mossy' || cover === 'Turfed' || /Earth|Fungal|Seams/.test(matter);
        for (const no of [sea, fallNo]) mats[no].tones = mats[no].tones.map(t => {
          const w = hsl(t);
          let h = q[1] >= 0.15 && sea > 1 ? toward(w[0], q[0], 0.05) : w[0];
          if (green) h = toward(h, 0.4, 0.06);
          if (light === 'Moonlit') h = toward(h, 0.62, 0.03);
          return rgb(h, w[1], w[2]);
        });
      }
      if (form.id === 'Islands') { mats.push(Object.assign({}, mats[sea])); isle = mats.length - 1; }   // (the islands' own sea is a part of the build)
      if (glowOn) { glowNo = use('glow', glowCol); mats[glowNo].tones[3] = glowCol.map(v => v + (255 - v) * 0.22); }
      wetNo = sea; flakeNo = motion === 'Settling' ? use(matter === 'Desert' ? 'sand' : matter === 'Volcanic' ? 'basalt' : matter === 'Cinder' ? 'ash' : matter === 'Lunar' ? 'dust' : 'snowcap') : 1;
      // a cover is laid over every material it can lie on: its own on the tops and a lip down the sides, the material under it
      // below (grass and moss keep to the tops: no lip)
      const caps = [];
      const snowAt = 0.4 + also() * 0.3, seamTh = 2 + fl(also() * 3), seamTilt = (also() - 0.5) * 0.8, grassy = also() < 0.25, ores = mixUp([m.oreGold, m.oreCopper, m.oreGem]);
      // (grassy seams wear the meadow as a cover: on their tops only, the beds running on down the sides under it)
      const capT = top || (matter === 'Seams' && grassy ? m.turf : 0);
      if (capT) for (const j of new Set(list.concat(Object.values(m)))) if (j > 0 && j !== capT) { mats.push(Object.assign({}, mats[capT], { under: j })); caps[j] = mats.length - 1; }
      // dep: how many cubes lie between this one and the open air above it
      stuffFor = (x, y, z, p, dep) => {
        if (p === LAMP) return wispCi[0];
        if (form.id === 'Islands' && p === 5) return isle;
        if (tree) return p === 1 ? m.timber : m.leaf;
        const s = under(x, y, z, p, dep);
        return capT && dep === 0 ? caps[s] || capT : s;      // (moss lies in patches, laid texel by texel)
      };
      const under = (x, y, z, p, dep) => {
        switch (matter) {
          case 'Earth': return dep === 0 ? m.turf : dep <= 1 + fl(knot(x >> 1, y >> 1, 3) * 2.6) ? m.soil : m.stone;
          case 'Alpine': return z + fl(knot(x >> 1, y >> 1, 4) * 2.4) >= topZ * snowAt + 1 ? (dep === 0 ? m.snow : m.stone) : dep === 0 ? m.turf : dep === 1 ? m.soil : m.stone;
          case 'Desert': return dep <= 1 ? m.sand : m.sandstone;
          case 'Tundra': return dep === 0 ? m.snow : dep <= 2 ? m.ice : m.basalt;
          case 'Volcanic': return (h3(x >> 1, y >> 1, z >> 1) & 255) > 176 ? m.magma : m.basalt;
          case 'Lode': { const b = h3(x >> 1, y >> 1, (z >> 1) + 9) & 255; return b > 240 ? m.gold : b > 190 ? ores[b & 1] : m.stone; }
          case 'Badlands': { const q = fl((z + knot(x >> 2, y >> 2, 8) * 1.6) / seamTh); return list[((q % list.length) + list.length) % list.length]; }
          case 'Saltpan': return dep === 0 ? m.salt : list[fl((z + knot(x >> 2, y >> 2, 8)) / 2) % list.length];
          case 'Fungal': return dep === 0 ? (knot(x >> 1, y >> 1, 21) > 0.7 ? m.cap : m.heath) : m.mycel;
          case 'Cinder': return dep === 0 && knot(x >> 1, y >> 1, 31) > 0.62 ? m.ash : m.cinder;
          // (a geode's crystal lies in pockets a few cubes across, each with a glowing heart)
          case 'Geode': { const q = noise(x * 0.22 + z * 0.13, y * 0.22 - z * 0.11, 40); return q > 0.74 ? list[2] : q > 0.6 ? list[0] : (h3(x >> 1, y >> 1, z >> 1) & 15) === 0 ? list[1] : m.basalt; }
          case 'Lunar': { const q = (z + (x - y) * 0.35 + noise(x * 0.2, y * 0.2, 51) * 3) / 7; return dep > 0 && q - fl(q) < 0.22 ? m.vein : dep <= 1 ? m.dust : m.basalt; }
          case 'City': { const q = ((form.parts > 1 ? p - 1 + partShift : fl(z / (bandW + 3))) % (list.length >> 1)) * 2; return list[q + ((h3(x, y, z) & 15) < 6 ? 0 : 1)]; }
          case 'Seams': { const q = fl((z + (x - y) * seamTilt + knot(x >> 2, y >> 2, 8) * 1.5) / seamTh); return list[((q % 4) + 4) % 4]; }
        }
        return list[(form.parts > 1 ? p - 1 + partShift : fl(z / (bandW + 1))) % list.length];
      };
    }
    // which colours are liquid (drawn as a film or a thread, not a whole cube)
    const liqA = new Uint8Array(256);
    liqA[wetNo] = liqA[fallNo] = 1;
    // ---- what moves over it besides a liquid: its colours ----
    // Each is lit by the scene's own light, as the build is, and stands clear of the build in value first, then in hue:
    // sand of a sand, a salt, a gold dust, a rose or a black one (on a pale build); marbles of a bright hue across the
    // wheel from the build's, and a clear one; a growth of deep green leaves (autumn reds on a green build) with flowers of
    // a hue the build has not got, or frost and its crystals. Each stuff is a ramp of its own, darker toward the room's
    // blue-violet and lighter toward a warm light. xOf: what each colour number is (1 a grain, 2 a bead that takes a
    // highlight, 3 a growth); dryC: the colour numbers in order; xFlat: the flat colours of a painted build's
    const xOf = new Uint8Array(256), dryC = [], xFlat = [];
    if (dry) {
      const bc = matter ? (() => { const s3 = [0, 0, 0]; for (let j = 1; j < wetNo; j++) for (let ch = 0; ch < 3; ch++) s3[ch] += mats[j].tones[2][ch] / (wetNo - 1); return s3; })() : pal[lead];
      const bq = hsl(bc), bY = (bc[0] * 0.3 + bc[1] * 0.59 + bc[2] * 0.11) / 255, hd = (a, b) => { const d = ab(a - b); return mn(d, 1 - d); };
      const rampOf = (h, s, l) => [[-0.2, 0.05, 0.7], [-0.1, 0.025, 0.85], [0, 0, 1], [0.08, -0.02, 0.9], [0.15, -0.03, 0.7], [0, 0, 1], [-0.1, 0.025, 0.85], [0.3, -0.03, 0.25]]
        .map(([dl, dh, ds]) => rgb(dh > 0 ? toward(h, 0.7, dh) : toward(h, 0.1, -dh), mn(1, s * ds), mn(0.97, mx(0.06, l + dl))));
      const kinds = [];      // [hue, saturation, lightness, pattern]
      if (dry === 1) {
        // (a sand, a salt, a gold dust (on a pale build most of all), a rose and a sea-green, each with how much it is liked
        // besides how well it stands out)
        const SANDS = [[0.11, 0.55, 0.76, 0.35], [0.07, 0.25, 0.92, 0.15], [0.125, 0.85, 0.56, bY > 0.7 ? 0.4 : 0.12], [0.97, 0.5, 0.78, 0.05], [0.52, 0.45, 0.66, 0.03]];
        let best = SANDS[0], bs = -9;
        for (const s of SANDS) { const sc = ab(s[2] - bY) * 1.2 + hd(s[0], bq[0]) * mn(1, bq[1] * 2) + s[3] + fr() * 0.25; if (sc > bs) { bs = sc; best = s; } }
        kinds.push([best[0], best[1], best[2], 42], [toward(best[0], 0.08, 0.02), best[1] * 0.9, best[2] + (best[2] > 0.8 ? -0.08 : 0.08), 42]);
      } else if (dry === 2) {
        const hc = bq[1] < 0.15 ? [0.02, 0.09, 0.55, 0.93][fl(fr() * 4)] : (bq[0] + 0.5 + (fr() - 0.5) * 0.12) % 1;
        // (a blue or a violet is lifted, so no marble is ever a dark bead on a dark ground)
        const bl = h => h > 0.5 && h < 0.8 ? 0.68 : 0.6;
        kinds.push([hc, 0.9, bl(hc), 43], [(hc + 0.09) % 1, 0.85, bl((hc + 0.09) % 1) + 0.04, 43], [(hc + 0.93) % 1, 0.3, 0.86, 43]);
      } else {
        // (leaf, leaf, tip, bud, a flower and another: of the four flowers the two furthest in hue from the build)
        const FL = [[0.93, 0.75, 0.72], [0.1, 0.2, 0.93], [0.14, 0.9, 0.6], [0.76, 0.6, 0.68]].map(f => [f, hd(f[0], bq[0]) * (0.3 + f[1]) + fr() * 0.2]).sort((p, q) => q[1] - p[1]).map(e => e[0]);
        // (frost on a pale build is a deeper ice blue, so it shows; a creeper on a green build, or one already mossy, turns to its autumn reds)
        const fd = bY > 0.55 ? 0.14 : 0;
        if (flow === 'Frost') kinds.push([0.57, 0.35 + fd * 2, 0.74 - fd, 44], [0.56, 0.3 + fd * 2, 0.84 - fd, 44], [0.55, 0.25 + fd, 0.93 - fd * 0.5, 44], [0.53, 0.5 + fd, 0.8 - fd, 43], [0.52, 0.35, 0.92, 43], [0.6, 0.45 + fd, 0.86 - fd, 43]);
        else if ((bq[1] >= 0.2 && bq[0] > 0.2 && bq[0] < 0.5) || /^(Earth|Seams|Stonework|Fungal)$/.test(matter) || cover === 'Mossy' || cover === 'Turfed') kinds.push([0.0, 0.6, 0.32, 44], [0.025, 0.68, 0.42, 44], [0.085, 0.85, 0.54, 44], [0.12, 0.6, 0.6, 45], FL[0].concat(45), FL[1].concat(45));
        else kinds.push([0.37, 0.5, 0.25, 44], [0.32, 0.55, 0.34, 44], [0.25, 0.65, 0.5, 44], [0.95, 0.45, 0.72, 45], FL[0].concat(45), FL[1].concat(45));
      }
      for (const [h, s, l, pat] of kinds) {
        const tones = rampOf(h, s, l);
        if (matter) { mats.push({ tones, pat, glint: pat === 43 ? 1 : 0, anim: 0, q: 0, self: 9, glow: null }); dryC.push(mats.length - 1); }
        else { xFlat.push(tones[2]); dryC.push(NC + 7 + xFlat.length); }
        const ci = dryC[dryC.length - 1];
        xOf[ci] = pat === 43 ? 2 : dry === 1 ? 1 : 3;
        if (pat === 44 || pat === 45) liqA[ci] = 2;      // (a growth lies on the faces as a film; frost's crystals stand as cubes)
      }
    }

    // ---- one plan: the form drawn from its own stream, finished, turned, and given its colours ----
    const depthOf = new Uint8Array(32768), keyBuf = new Float64Array(32768);
    const methodNo = ['Layer by Layer', 'Printed', 'Swept', 'Outward', 'Grown', 'Scattered', 'Column by Column', 'Part by Part', 'In Its Own Order'].indexOf(method);
    const undoNo = undo === 'Melted' ? 0 : methodNo;
    const keyFor = (style, i) => {
      const x = i & 31, y = i >> 5 & 31, z = i >> 10, j = knot(i & 1023, z, 7);
      switch (style) {
        case 0: return z * 1024 + y * 32 + x;
        case 1: return z * 1024 + (z & 1 ? 31 - y : y) * 32 + ((y + z) & 1 ? 31 - x : x);
        case 2: return (x + y + z) * 4 + j * 3;
        case 3: return hyp(x - cmid, y - cmid) * 8 + z * 0.5 + j;
        case 4: return hyp(x - cmid, y - cmid, z) * 8 + j * 4;
        case 5: return j * 1000;
        case 6: return knot(x, y, 91) * 4096 + z;
        case 7: return (T[i] || 0) * 4096 + z * 32 + j * 30;
        default: return O ? O[i] * 4 + j : z * 1024 + y * 32 + x;
      }
    };
    // the order cubes are laid in, as a clean sweep with no scatter in it: cubes whose keys share a whole number of 32s
    // lie in one line (a row, a ring, a column), and the builder lays a line, or a few cubes of it, at a time
    const layKey = (style, i) => {
      const x = i & 31, y = i >> 5 & 31, z = i >> 10, a = (M.atan2(y - cmid, x - cmid) / TAU + 0.5) * 32 & 31;
      switch (style) {
        case 1: return z * 1024 + (z & 1 ? 31 - y : y) * 32 + ((y + z) & 1 ? 31 - x : x);
        case 2: return (x + y + z) * 1024 + z * 32 + x;
        case 3: return fl(hyp(x - cmid, y - cmid)) * 1024 + z * 32 + a;
        case 4: return fl(hyp(x - cmid, y - cmid, z)) * 1024 + z * 32 + a;
        case 6: return (y * 32 + (y & 1 ? 31 - x : x)) * 32 + z;
        case 7: return (T[i] || 0) * 32768 + z * 1024 + y * 32 + x;
        case 8: if (O) return (O[i] * 32 + z) * 32 + x;
      }
      return z * 1024 + y * 32 + x;
    };
    const finishIt = () => {
      if (finish === 'Whole') return;
      if (finish === 'Sliced') { const p = 2 + fl(R() * 3), ax = R() < 0.6 ? 2 : fl(R() * 2); for (let i = 0; i < 32768; i++) if (T[i] && [i & 31, i >> 5 & 31, i >> 10][ax] % p === p - 1) T[i] = 0; return; }
      if (finish === 'Pierced') { const kind = fl(R() * 3), p = 3 + fl(R() * 2); for (let i = 0; i < 32768; i++) if (T[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; if (kind === 0 ? (x + y + z) & 1 : kind === 1 ? x % p === 1 && y % p === 1 : (x % p === 1 ? 1 : 0) + (y % p === 1 ? 1 : 0) + (z % p === 1 ? 1 : 0) >= 2) T[i] = 0; } return; }
      if (finish === 'Worn') { const sd = 1 + fl(R() * 9999), th = 0.56 + R() * 0.12; for (let i = 0; i < 32768; i++) if (T[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; if (fbm(x * 0.28 + z * 0.17, y * 0.28 - z * 0.13, sd) > th) T[i] = 0; } return; }
      // Hollowed: a shell two cubes thick, with the corner nearest the eye cut away to show it
      const shell = new Uint8Array(32768);
      let x0 = n, y0 = n, z0 = n, x1 = 0, y1 = 0, z1 = 0;
      for (let z = 0; z < n; z++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = at(x, y, z);
        if (!T[i]) continue;
        x0 = mn(x0, x); y0 = mn(y0, y); z0 = mn(z0, z); x1 = mx(x1, x); y1 = mx(y1, y); z1 = mx(z1, z);
        let deep = true;
        for (let d = 1; d <= 2 && deep; d++) if (x < d || y < d || z < d || x >= n - d || y >= n - d || z >= n - d || !T[at(x - d, y, z)] || !T[at(x + d, y, z)] || !T[at(x, y - d, z)] || !T[at(x, y + d, z)] || !T[at(x, y, z - d)] || !T[at(x, y, z + d)]) deep = false;
        shell[i] = deep ? 0 : T[i];
      }
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, cz = (z0 + z1) / 2;
      for (let i = 0; i < 32768; i++) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; T[i] = x > cx && y > cy && z > cz ? 0 : shell[i]; }
    };
    // A build whose outline comes out a plain box (as the eye sees it, all but the whole of the outline of the box round
    // it) has the corner nearest the eye taken out from part way up, in one step or two, so its outline steps and its
    // inside shows (the same cut through every plan of it); never a frame, steps or a heap, whose outline is their own
    const boxB = new Uint8Array(32768);
    const boxCut = () => {
      let x0 = 32, y0 = 32, x1 = -1, y1 = -1, z1 = -1;
      for (let i = 0; i < 32768; i++) if (T[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; if (z > z1) z1 = z; }
      if (x1 - x0 < 5 || y1 - y0 < 5 || z1 < 4 || /^(Frames|Steps|Heaps)$/.test(form.fam) || form.id === 'Keep') return;
      hexes(T, 0, 0, 0, 0, 0);
      let a = 0, b = 0;
      for (let o = 0; o < 16384; o++) a += HX[o];
      boxB.fill(0);
      for (let z = 0; z <= z1; z++) for (let y = y0; y <= y1; y++) boxB.fill(1, at(x0, y, z), at(x1, y, z) + 1);
      hexes(boxB, 0, 0, 0, 0, 0);
      for (let o = 0; o < 16384; o++) b += HX[o];
      if (a < 0.88 * b) return;
      const ax = x0 + fl((x1 - x0 + 1) * (0.42 + R() * 0.16)), ay = y0 + fl((y1 - y0 + 1) * (0.42 + R() * 0.16)), az = fl((z1 + 1) * (0.3 + R() * 0.25));
      block(ax, ay, az, x1 + 1, y1 + 1, z1 + 1, 0);
      if (R() < 0.5) { const s = mx(2, fl((x1 - x0) * 0.18)); block(ax - s, ay - s, az + mx(2, fl((z1 - az) * 0.45)), x1 + 1, y1 + 1, z1 + 1, 0); }
    };
    // a draft is the form as drawn in its own room of side n; dressing it moves it into the view's room and colours it
    let nv = n, fitted = false, held = null, orderCuts = null;
    // where a draft stands in its room: in the middle of the floor, or (aside: 0 or 1) with its back to one wall, a cube
    // off it, and the floor open beside it
    let aside = -1; const ASIDE = 0.35;
    const mid = (a0, a1, ax) => aside === ax ? a0 - 1 : a0 - ((nv - (a1 - a0 + 1)) >> 1);
    const boxOf = d => {
      let x0 = 32, y0 = 32, x1 = -1, y1 = -1, z1 = -1;
      for (let i = 0; i < 32768; i++) if (d.part[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; if (z > z1) z1 = z; }
      d.x0 = x0; d.y0 = y0; d.x1 = x1; d.y1 = y1; d.z1 = z1;
      return d;
    };
    // A plan is drawn from numbers of its own (planOff moves them all when a plan is drawn again). ed, when given, draws
    // it again with the same numbers up to the ed.at-th, and then either afresh from ed.alt or with that one nudged by ed.d.
    let planOff = 0;
    const one = (number, ed) => {
      T = new Uint8Array(32768); O = form.nat ? new Uint16Array(32768) : null;
      number += planOff;
      const base = stream((planSeed ^ M.imul(number + 1, 0x9e3779b1)) >>> 0 || 1, (M.imul(planSeed + number, 0x85ebca6b) ^ 0x5bd1e995) >>> 0 || 2);
      for (let i = 0; i < 5; i++) base();
      let used = 0;
      R = ed ? () => { const v = base(), i = used++; return i < ed.at ? v : ed.alt ? ed.alt() : i === ed.at ? mn(0.9999, mx(0, v + ed.d)) : v; } : () => (used++, base());
      SP = [];
      form.go();
      const drew = used;
      // the finish is cut the same way through every plan and every one of its company
      R = stream((planSeed ^ 0x2f6b9a1d) >>> 0 || 1, (planSeed + 0x6a09e667) >>> 0 || 2);
      finishIt();
      boxCut();
      return boxOf({ part: T, grew: O, spr: SP, used: drew });
    };
    // how alike two plans are: none at all if one is more than two cubes wider, deeper or taller than the other, or if
    // their outlines as the eye sees them differ by more than a few cubes' worth, else the share of their cubes they
    // have in common, set middle on middle
    const HY = new Uint8Array(16384);
    const alike = (a, b) => {
      if (a.x1 < 0 || b.x1 < 0 || ab(a.x1 - a.x0 - b.x1 + b.x0) > 2 || ab(a.y1 - a.y0 - b.y1 + b.y0) > 2 || ab(a.z1 - b.z1) > 2) return -1;
      const sx = form.corner ? 0 : (b.x0 + b.x1 >> 1) - (a.x0 + a.x1 >> 1), sy = form.corner ? 0 : (b.y0 + b.y1 >> 1) - (a.y0 + a.y1 >> 1);
      let both = 0, na = 0, nb = 0;
      for (let i = 0; i < 32768; i++) {
        if (b.part[i]) nb++;
        if (!a.part[i]) continue;
        na++;
        const x = (i & 31) + sx, y = (i >> 5 & 31) + sy;
        if (x >= 0 && y >= 0 && x < 32 && y < 32 && b.part[(i >> 10) << 10 | y << 5 | x]) both++;
      }
      const q = both / mx(1, na + nb - both);
      if (q < 0.5 || q > 0.96) return q;
      hexes(a.part, 0, 0, 0, 0, 0); HY.set(HX); hexes(b.part, sx, sy, 0, 0, 0);
      let on = 0, either = 0;
      for (let o = 0; o < 16384; o++) if (HX[o] | HY[o]) { either++; if (HX[o] & HY[o]) on++; }
      return on < 0.86 * either ? -1 : q;
    };
    // a plan like another, drawn round plan number 0: of a few redrawings the one kept is plainly the same build (within
    // two cubes of its size, between lo and hi of its cubes in common), and as near the middle of that as can be
    const like = (ref, salt, lo, hi) => {
      if (ref.x1 < 0 || !ref.used) return null;
      const s = stream((planSeed ^ M.imul(salt + 7, 0x2545f491)) >>> 0 || 1, (M.imul(planSeed + salt, 0x9e3779b1) ^ 0x7f4a7c15) >>> 0 || 2);
      let best = null, bestS = -1;
      for (let t = 0; t < (n >= 28 ? 4 : 7) && bestS < 0.9; t++) {
        const at = fl(ref.used * (0.3 + 0.7 * s())), tail = s() < 0.45, d = (s() < 0.5 ? -1 : 1) * (0.06 + 0.22 * s()), a1 = fl(s() * 4e9), a2 = fl(s() * 4e9);
        const e = one(0, { at, d, alt: tail ? stream(a1 || 1, a2 || 2) : null }), q = alike(ref, e);
        if (q >= lo && q <= hi && 1 - ab(q - (lo + hi) / 2) > bestS) { bestS = 1 - ab(q - (lo + hi) / 2); best = e; }
      }
      return best;
    };
    // the company as first drawn: the first of them, and the others drawn like it (their heights vary a little)
    let mates0 = null;
    const draft = stage => {
      let d;
      if (moving || !stage) {
        const first = one(0), want = company === 'Pair' ? 2 : company === 'Row' ? 3 : company === 'Quartet' ? 4 : 1;
        mates0 = [first];
        for (let i = 1; i < want; i++) mates0.push(like(first, 900 + i, 0.5, 0.9) || first);
        d = mates0;
      } else {
        // a later stage is the same build reworked: one of them (or the one) is drawn like itself, the others stand as they were
        d = mates0.slice();
        const j = (stage - 1) % d.length;
        d[j] = like(mates0[j], stage * 13 + j, 0.55, 0.92) || mates0[j];
      }
      if (d.length > 1) {
        // several of the same kind, set side by side or one on another, in the same colours
        const all = d, wide = e => e.x1 - e.x0 + 1, deep = e => e.y1 - e.y0 + 1, t2 = new Uint8Array(32768), o2 = form.nat ? new Uint16Array(32768) : null;
        const live = all.filter(e => e.x1 >= 0);
        const set = (e, i, ox, oy, oz) => { for (let z = 0; z <= e.z1; z++) for (let y = e.y0; y <= e.y1; y++) for (let x = e.x0; x <= e.x1; x++) { const p = e.part[at(x, y, z)], X = x - e.x0 + ox, Y = y - e.y0 + oy, Z = z + oz; if (p && X < 32 && Y < 32 && Z < 32) { t2[at(X, Y, Z)] = p; if (o2) o2[at(X, Y, Z)] = mn(65535, e.grew[at(x, y, z)] + i * 9000); } } };
        if (company === 'Quartet') {
          const W = mx(...live.map(wide)), D = mx(...live.map(deep));
          // the near pair is set a part of a width along from the far pair, so the slots between them never sit side by
          // side at one height (two lit openings over two small feet would read as a face)
          // (where there is no room for that, the pairs are pushed into one another, so those slots close)
          const sh = 2 * W + 1 + (W >> 1) <= 32 ? W >> 1 : 2 * W + 1 + (W >> 2) <= 32 ? W >> 2 : -2;
          live.forEach((e, i) => { if (2 * W + 1 + mx(0, sh) <= 32 && 2 * D + 1 <= 32) set(e, i, (i & 1) * (W + 1 + mn(0, sh)) + (i >> 1) * mx(0, sh) + ((W - wide(e)) >> 1), (i >> 1) * (D + 1) + ((D - deep(e)) >> 1), 0); else if (!i) set(e, 0, 0, 0, 0); });
        } else {
          // side by side as the eye sees it: each one a step further along the floor one way and back the other, so the
          // row runs across the picture and not away into it
          const D = mx(...live.map(deep)), fit = []; let x = 0;
          for (const e of live) if (x + wide(e) <= 32) { fit.push(e); x += wide(e) + 1; }
          const m = fit.length - 1, s = m ? mn((D + 2) >> 1, fl((32 - D) / m), mx(0, fl((x - 1 - D) / m))) : 0;
          x = 0;
          fit.forEach((e, i) => { set(e, i, x, (m - i) * s + ((D - deep(e)) >> 1), 0); x += wide(e) + 1; });
        }
        T = t2; O = o2; d = boxOf({ part: T, grew: O });
      } else { d = d[0]; T = d.part; O = d.grew; }
      if (swap) { const t2 = new Uint8Array(32768), o2 = O ? new Uint16Array(32768) : null; for (let z = 0; z < 32; z++) for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { t2[at(y, x, z)] = T[at(x, y, z)]; if (O) o2[at(y, x, z)] = O[at(x, y, z)]; } T = t2; O = o2; }
      const out = boxOf({ part: T, grew: O });
      out.spr = company === 'Alone' && d.spr && d.spr.length ? d.spr.map(q => swap ? [q[1], q[0], q[2]] : q) : null;
      return out;
    };
    // how big a room a draft needs: one cube of air round a thing that stands free, none where it leans on the walls,
    // as wide as its widest reach from the middle if it is to turn (a round thing needs less than a square one),
    // and room to sway along the way it sways, or to heave
    const needs = (d, mo = motion) => {
      if (d.x1 < 0) return 6;
      const w = d.x1 - d.x0 + 1, e = d.y1 - d.y0 + 1, sw = mo === 'Swaying' ? 2 * swA : 2, tall = d.z1 + 1 + (mo === 'Heaving' || mo === 'Pumping' ? mx(1, hvA) : 1);
      if (form.corner) return mx(mx(d.x1, d.y1) + 2, tall);
      if (mo === 'Turning' || mo === 'Twisting') {
        const cx = (d.x0 + d.x1 + 1) / 2, cy = (d.y0 + d.y1 + 1) / 2;
        let r2 = 0;
        for (let i = 0; i < 32768; i++) if (d.part[i]) { const dx = (i & 31) + 0.5 - cx, dy = (i >> 5 & 31) + 0.5 - cy, q = dx * dx + dy * dy; if (q > r2) r2 = q; }
        return mx(M.ceil(2 * M.sqrt(r2) + 2.6), tall);
      }
      return mx(w + (swKind === 1 ? 2 : sw), e + (swKind === 0 || swKind === 3 ? 2 : sw), tall);
    };
    // the glow a build carries, laid over its colours (each plan of it finds its own places the same way): the cubes
    // at the back of its deepest pockets (a cell of air before a face, closed in on five sides, or on four with a roof);
    // failing those, a pool in a hollow of its top, windows up a tall build, a seam round a ground or a block, or a lamp on its top
    let glowXY = -1;
    const glowUp = TC => {
      if (!glowNo) return TC;
      const V = nv, pocket = [];
      let bx = 0, by = 0, bn = 0, zTop = -1;
      for (let z = 0; z < V; z++) for (let y = 0; y < V; y++) for (let x = 0; x < V; x++) {
        const i = at(x, y, z);
        if (!TC[i] || T[i] === LAMP) continue;
        if (z > zTop) { zTop = z; bx = by = bn = 0; }
        if (z === zTop) { bx += x; by += y; bn++; }
        for (let d = 0; d < 3; d++) {
          const X = x + (d === 0), Y = y + (d === 1), Z = z + (d === 2);
          if (X >= V || Y >= V || Z >= V) continue;
          const j = at(X, Y, Z);
          if (T[j]) continue;
          const up = Z < V - 1 && T[j + 1024] ? 1 : 0, sc = up + (Z === 0 || T[j - 1024] ? 1 : 0) + (X > 0 && T[j - 1] ? 1 : 0) + (X < V - 1 && T[j + 1] ? 1 : 0) + (Y > 0 && T[j - 32] ? 1 : 0) + (Y < V - 1 && T[j + 32] ? 1 : 0);
          // (and only where the eye can see into it)
          if ((sc >= 5 || (sc >= 4 && up)) && !(X < V - 1 && Y < V - 1 && Z < V - 1 && T[j + 1057]) && !(X < V - 2 && Y < V - 2 && Z < V - 2 && T[j + 2114])) { pocket.push(i); break; }
        }
      }
      const lit = [];
      // (a thing that never rests keeps its lamp in one column of the room, riding on whatever is at the top of it, so
      // the light never jumps from place to place as it moves)
      if (moving && glowXY >= 0) {
        for (const o of V >= 16 ? [0, 1, 32, 33] : [0]) { const X = (glowXY & 31) + (o & 1), Y = (glowXY >> 5) + (o >> 5); if (X < V && Y < V) for (let z = V - 1; z >= 0; z--) if (TC[at(X, Y, z)]) { if (T[at(X, Y, z)] !== LAMP) lit.push(at(X, Y, z)); break; } }
        for (const i of lit) TC[i] = glowNo;
        return TC;
      }
      // (a round build takes only a lamp on its top, or a pool in a hollow of its top: lit pockets or windows in a round
      // body read as eyes or feet)
      const roundish = form.fam === 'Rounds' || form.fam === 'Heaps' || /^(Jacks|Blocks|Crib|Molecule|Bubbles|Crystal|Quartz|Coral)$/.test(form.id);
      if (roundish || moving) pocket.length = 0;
      else for (let q = pocket.length - 1; q >= 0; q--) if ((pocket[q] >> 10) < mx(2, zTop * 0.3)) pocket.splice(q, 1);
      // a hollow seen from above (a court, a crater, an arena, the well of a bowl): the top of a column lower than the
      // build round it on three sides of the four, open to the eye; it is lit as a pool of light
      const basin = [];
      if (!moving && !(form.fam === 'Towers' && zTop >= V * 0.55)) {
        const hq = new Int8Array(1024);
        for (let y = 0; y < V; y++) for (let x = 0; x < V; x++) { let z = zTop; while (z >= 0 && !TC[at(x, y, z)]) z--; hq[y << 5 | x] = z; }
        for (let y = 1; y < V - 1; y++) for (let x = 1; x < V - 1; x++) {
          const h = hq[y << 5 | x];
          if (h < 0 || T[at(x, y, h)] === LAMP || (roundish && h < zTop * 0.4)) continue;
          let sides = 0;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let s = 1; s <= 4; s++) { const X = x + dx * s, Y = y + dy * s; if (X < 0 || Y < 0 || X >= V || Y >= V) break; if (hq[Y << 5 | X] > h) { sides++; break; } }
          if (sides >= 3 && !(h + 1 < V && hq[(y + 1) << 5 | (x + 1)] > h) && !(h + 2 < V && x + 2 < V && y + 2 < V && hq[(y + 2) << 5 | (x + 2)] > h + 1)) basin.push(at(x, y, h));
        }
      }
      if (!pocket.length && basin.length >= 2) {
        // the hollow's cube nearest the middle, and those beside it at its own height: a pool of two to nine
        const cx = (V - 1) / 2;
        let b0 = basin[0], bs = 1e9;
        for (const i of basin) { const s = hyp((i & 31) - cx, (i >> 5 & 31) - cx) + (h3(i, 7, 85) & 255) / 160; if (s < bs) { bs = s; b0 = i; } }
        const K = V >= 24 ? 9 : V >= 16 ? 6 : 4, X0 = b0 & 31, Y0 = b0 >> 5 & 31;
        lit.push(b0);
        for (let r = 1; r <= 2; r++) for (const i of basin) if (lit.length < K && lit.indexOf(i) < 0 && (i >> 10) === (b0 >> 10) && mx(ab((i & 31) - X0), ab((i >> 5 & 31) - Y0)) <= r) lit.push(i);
      } else if (pocket.length) {
        // the deepest-looking pocket (the one nearest the middle, half way up), and the pockets near it: two to five cubes
        const cx = (V - 1) / 2;
        let b0 = pocket[0], bs = 1e9;
        for (const i of pocket) { const s = hyp((i & 31) - cx, (i >> 5 & 31) - cx) + ab((i >> 10) - zTop * 0.55) * 0.7 + (h3(i, 5, 85) & 255) / 128; if (s < bs) { bs = s; b0 = i; } }
        const K = 3 + (h3(lo >>> 0, hi >>> 0, 87) % (V >= 24 ? 4 : 3)), X0 = b0 & 31, Y0 = b0 >> 5 & 31, Z0 = b0 >> 10;
        lit.push(b0);
        for (const i of pocket) if (lit.length < K && i !== b0 && ab((i & 31) - X0) <= 2 && ab((i >> 5 & 31) - Y0) <= 2 && ab((i >> 10) - Z0) <= 2) lit.push(i);
      } else if (!roundish && !moving && (form.fam === 'Towers' || (zTop >= V * 0.55 && form.fam !== 'Steps'))) {
        // windows: on the faces turned to the eye, every third course and every third cube along it, some of them lit
        for (let z = 2; z < zTop - 1 && lit.length < 12; z += 3) for (let y = 0; y < V; y++) for (let x = 0; x < V; x++) {
          const i = at(x, y, z);
          if (!TC[i] || T[i] === LAMP) continue;
          if (((x < V - 1 && !T[i + 1] && y % 3 === 1) || (y < V - 1 && !T[i + 32] && x % 3 === 1)) && (h3(x, y, z + 89) & 3) === 0 && lit.length < 12 && lit.indexOf(i - 1) < 0 && lit.indexOf(i - 32) < 0 && lit.indexOf(i - 3) < 0 && lit.indexOf(i - 96) < 0) lit.push(i);
        }
        // (two or three lit windows alone read as eyes: a facade has many or none)
        if (lit.length < 4) lit.length = 0;
      } else if (!roundish && !moving && (wild || form.fam === 'Grounds' || form.fam === 'Surfaces')) {
        // a seam: one course round its sides glows in dashes, as if something hot showed through a crack
        const z = mx(0, M.round(zTop * 0.45)), q = h3(lo >>> 0, hi >>> 0, 91) % 9;
        for (let y = 0; y < V; y++) for (let x = 0; x < V; x++) {
          const i = at(x, y, z);
          if (TC[i] && T[i] !== LAMP && ((x < V - 1 && !T[i + 1]) || (y < V - 1 && !T[i + 32])) && (x + y + q) % 9 < 4) lit.push(i);
        }
      }
      if (!lit.length && !roundish && !moving && zTop >= 2) {
        // a lit niche: a recess a cube deep, two or three wide and high, cut into a side the eye sees (low on it and near
        // its middle), framed on every side by the build and lit at its back, like a furnace mouth or a lit door
        const w = V >= 20 ? 3 : 2, hh = zTop >= 8 && V >= 20 ? 3 : 2, cx = (V - 1) / 2;
        let best = null, bs = 1e9;
        for (let d = 0; d < 2; d++) {
          const P = (a, b, z) => d ? at(a, b, z) : at(b, a, z);
          for (let z = mx(0, fl(zTop * 0.12)); z + hh <= zTop && z <= zTop * 0.55; z++) for (let b = 1; b < V; b++) for (let a = 1; a + w < V; a++) {
            const s = ab(a + w / 2 - 0.5 - cx) + (V - 1 - b) * 0.7 + ab(z - zTop * 0.25) * 0.5 + (h3(a * 64 + b, z, 93 + d) & 255) / 256;
            if (s >= bs) continue;
            let ok = [1, 2].every(s => b + s >= V || a + s >= V || z + s >= V || !T[P(a + s, b + s, z + s)]) && TC[P(a - 1, b, z)] && TC[P(a + w, b, z)] && TC[P(a - 1, b, z + hh - 1)] && TC[P(a + w, b, z + hh - 1)];
            for (let q = 0; q < w && ok; q++) {
              if (!TC[P(a + q, b, z + hh)] || (z > 0 && !TC[P(a + q, b, z - 1)])) ok = false;
              for (let r = 0; r < hh && ok; r++) { const f = P(a + q, b, z + r); if (!TC[f] || !TC[P(a + q, b - 1, z + r)] || T[f] === LAMP || (b < V - 1 && T[P(a + q, b + 1, z + r)])) ok = false; }
            }
            if (ok) { bs = s; best = [d, a, b, z]; }
          }
        }
        if (best) {
          const [d, a, b, z] = best, P = (a, b, z) => d ? at(a, b, z) : at(b, a, z);
          for (let q = 0; q < w; q++) for (let r = 0; r < hh; r++) { const f = P(a + q, b, z + r); TC[f] = 0; T[f] = 0; lit.push(P(a + q, b - 1, z + r)); }
        }
      }
      if (!lit.length && bn) {
        // a lamp on its top: the cube of its highest course nearest that course's middle, and on a big build the ones beside it
        const mx0 = bx / bn, my0 = by / bn;
        let b0 = -1, bs = 1e9;
        for (let y = 0; y < V; y++) for (let x = 0; x < V; x++) { const i = at(x, y, zTop); if (TC[i] && T[i] !== LAMP) { const s = hyp(x - mx0, y - my0); if (s < bs) { bs = s; b0 = i; } } }
        if (b0 >= 0) { lit.push(b0); if (moving) glowXY = b0 & 1023; else if (V >= 16) for (const j of [b0 + 1, b0 + 32, b0 + 33]) if (TC[j] && (j >> 10) === zTop) lit.push(j); }
      }
      for (const i of lit) TC[i] = glowNo;
      return TC;
    };
    const dress = d => {
      T = d.part; O = d.grew; topZ = mx(1, d.z1);
      const offX = held ? held[0] : fitted && !form.corner && d.x1 >= 0 ? mid(d.x0, d.x1, 0) : 0, offY = held ? held[1] : fitted && !form.corner && d.x1 >= 0 ? mid(d.y0, d.y1, 1) : 0;
      const spr = d.spr ? d.spr.filter(q => q[0] >= offX && q[1] >= offY && q[0] - offX < nv && q[1] - offY < nv && q[2] < nv).map(q => at(q[0] - offX, q[1] - offY, q[2])) : null;
      if (fitted) {
        const t2 = new Uint8Array(32768), o2 = O ? new Uint16Array(32768) : null;
        for (let z = 0; z < nv; z++) for (let y = 0; y < nv; y++) for (let x = 0; x < nv; x++) { const X = x + offX, Y = y + offY; if (X >= 0 && Y >= 0 && X < 32 && Y < 32) { t2[at(x, y, z)] = T[at(X, Y, z)]; if (O) o2[at(x, y, z)] = O[at(X, Y, z)]; } }
        T = t2; O = o2;
      }
      const TC = new Uint8Array(32768);
      if (matter) {
        // every column is read from the top down, so each cube knows how far under the open air it lies
        for (let y = 0; y < nv; y++) for (let x = 0; x < nv; x++) for (let z = nv - 1, dep = 0; z >= 0; z--) { const i = at(x, y, z); if (T[i]) TC[i] = stuffFor(x, y, z, T[i], dep++); else dep = 0; }
        return { col: glowUp(TC), part: T, grew: O, spr };
      }
      if (paint === 'Shells') {
        // how many cubes deep each one lies under the surface
        let edge = [];
        for (let z = 0; z < nv; z++) for (let y = 0; y < nv; y++) for (let x = 0; x < nv; x++) { const i = at(x, y, z); depthOf[i] = 0; if (T[i] && (x === 0 || y === 0 || x === nv - 1 || y === nv - 1 || z === nv - 1 || !T[i - 1] || !T[i + 1] || !T[i - 32] || !T[i + 32] || !T[i + 1024] || (z > 0 && !T[i - 1024]))) { depthOf[i] = 1; edge.push(i); } }
        for (let d = 2; edge.length && d < 40; d++) { const nx = []; for (const i of edge) for (const j of [i - 1, i + 1, i - 32, i + 32, i - 1024, i + 1024]) if (j >= 0 && j < 32768 && T[j] && !depthOf[j]) { depthOf[j] = d; nx.push(j); } edge = nx; }
      }
      if (paint === 'Order') {
        // the colours change where the first plan's cubes passed each share of its order; a later plan keeps those
        // places, so the same parts keep the same colours (an order that scatters, or goes column by column, would
        // give a confetti: those colour it from the middle out)
        const cells = []; for (let i = 0; i < 32768; i++) if (T[i]) { cells.push(i); keyBuf[i] = keyFor(methodNo === 5 || methodNo === 6 ? 3 : methodNo, i); }
        cells.sort((p, q) => keyBuf[p] - keyBuf[q]);
        if (!orderCuts && cells.length) { orderCuts = []; for (let q = 1; q < NC; q++) orderCuts.push(keyBuf[cells[fl(q * cells.length / NC)]]); }
        for (let r = 0, b = 0; r < cells.length; r++) { const i = cells[r]; while (b < NC - 1 && keyBuf[i] >= orderCuts[b]) b++; TC[i] = T[i] === LAMP ? NC + 3 : 1 + byLight[NC - 1 - b]; }
        return { col: glowUp(TC), part: T, grew: O, spr };
      }
      // one colour shaded is capped in its accent: its highest course or two
      const capZ = topZ - fl(topZ / 8);
      for (let i = 0; i < 32768; i++) {
        const p = T[i];
        if (!p) continue;
        const x = i & 31, y = i >> 5 & 31, z = i >> 10;
        TC[i] = p === LAMP ? NC + 3 : paint === 'Three Tone' || paint === 'Ink' ? 1
          : paint === 'Shade' ? 1 + (z >= capZ ? accent : lead)
          : paint === 'Strata' || paint === 'Tops' ? 1 + seq[fl(z / bandW) % SQ]
            : paint === 'Parts' || paint === 'Wire' ? 1 + pseq[(p - 1) % pseq.length]
              : paint === 'Bands' ? 1 + seq[fl((bandAxis === 0 ? x + y + z : bandAxis === 1 ? x + y : x - y + 64) / (bandW + 1)) % SQ]
                : paint === 'Shells' ? 1 + byLight[(depthOf[i] - 1) % NC]
                  : 1 + ((x + y + z) & 1 ? second : lead);
      }
      return { col: glowUp(TC), part: T, grew: O, spr };
    };

    const stages = life === 'Reworked' ? 3 + fl(rand() * 2) : 1, beat = 0.2;
    let drafts = [], beats = [];
    fitted = true;
    // the plans are drawn and the room is fitted to them
    const fit = () => {
      beats = []; beatNo = 0; held = null;
      drafts = [draft(0)];
      if (moving && form.id === 'Heap') { nv = n; held = [0, 0]; }
      else if (moving) {
        // a thing that never rests is measured at several moments (a winding one through most of a turn); the room must hold
        // them all, and it is not re-centred as it moves
        const u = { x0: 32, y0: 32, x1: -1, y1: -1, z1: -1 };
        for (const b of [195, 150, 110, 75, 47, 31, 19, 9, 0]) { beatNo = b; const d = draft(0); u.x0 = mn(u.x0, d.x0); u.y0 = mn(u.y0, d.y0); u.x1 = mx(u.x1, d.x1); u.y1 = mx(u.y1, d.y1); u.z1 = mx(u.z1, d.z1); drafts[0] = d; beats.push(d); }
        nv = mx(6, mn(32, needs(u)));
        held = form.corner || u.x1 < 0 ? [0, 0] : [u.x0 - ((nv - (u.x1 - u.x0 + 1)) >> 1), u.y0 - ((nv - (u.y1 - u.y0 + 1)) >> 1)];
      } else {
        // a build too wide to turn in the largest room heaves, pumps, is cut through or sways instead
        if ((motion === 'Turning' || motion === 'Twisting') && needs(drafts[0]) > 32) motion = ['Heaving', 'Pumping', 'Scanning', 'Swaying'][planSeed >>> 30];
        // each later plan is the first reworked, near enough its size; the room is made just big enough for all of them
        let most = nv = mx(6, mn(32, needs(drafts[0])));
        for (let s = 1; s < stages; s++) { const d = draft(s); drafts.push(d); most = mx(most, needs(d)); }
        nv = mx(6, mn(32, most));
      }
    };
    // The eye frames the build, apart from the room's size. In the picture a cell (x, y, z) lies at
    // px = eyeX + 2k(x - y), py = eyeY + k(x + y - 2z): k art pixels a step, and a face of a cube is k texels across.
    // What the build sweeps over its whole life is measured (every plan, its company, its turning, swaying or heaving,
    // a little air for what runs off it), and k, the picture's side G and where the room's corner falls are set so that
    // this fills the square but for a rim all round, in the middle. The room box stays as big as the
    // motion needs; past it the floor and the walls run on to the edges of the square.
    const framing = (style, crop = 1.3) => {
      let e1a = 99, e1b = -99, e2a = 99, e2b = -99, r2 = 0, zt = 0, u1a = 99, u1b = -99, Xa = 99, Xb = -1, Ya = 99, Yb = -1;
      const hm = nv / 2, spin = !moving && (motion === 'Turning' || motion === 'Twisting'), every = moving && beats.length ? beats : drafts;
      // (a tall build is framed across by its upper part alone: what spreads at its foot may run past the sides)
      const zc = fl(0.3 * mx(0, ...every.map(d => d.z1)));
      for (const d of every) {
        if (d.x1 < 0) continue;
        const offX = held ? held[0] : !form.corner ? mid(d.x0, d.x1, 0) : 0, offY = held ? held[1] : !form.corner ? mid(d.y0, d.y1, 1) : 0;
        for (let z = 0; z <= mn(nv - 1, d.z1); z++) for (let y = mx(0, d.y0); y <= d.y1; y++) for (let x = mx(0, d.x0); x <= d.x1; x++) {
          const X = x - offX, Y = y - offY;
          if (!d.part[at(x, y, z)] || X < 0 || Y < 0 || X >= nv || Y >= nv) continue;
          const e1 = X - Y, e2 = X + Y - 2 * z;
          if (e1 < e1a) e1a = e1; if (e1 > e1b) e1b = e1; if (e2 < e2a) e2a = e2; if (e2 > e2b) e2b = e2;
          if (z >= zc) { if (e1 < u1a) u1a = e1; if (e1 > u1b) u1b = e1; }
          if (X < Xa) Xa = X; if (X > Xb) Xb = X; if (Y < Ya) Ya = Y; if (Y > Yb) Yb = Y;
          if (spin) { const q = mx(ab(X - hm), ab(X + 1 - hm)) ** 2 + mx(ab(Y - hm), ab(Y + 1 - hm)) ** 2; if (q > r2) r2 = q; if (z + 1 > zt) zt = z + 1; }
        }
      }
      // (set against a wall, it is framed with the floor that lies open beside it, out to the room's edge)
      if (aside >= 0 && Xb >= 0) for (const [X, Y] of aside === 0 ? [[nv - 1, Ya], [nv - 1, Yb + 1]] : [[Xa, nv - 1], [Xb + 1, nv - 1]]) { const e1 = X - Y, e2 = X + Y; if (e1 < e1a) e1a = e1; if (e1 > e1b) e1b = e1; if (e2 > e2b) e2b = e2; }
      // a heap that never rests is framed as it would stand at its fullest (it swells and shrinks), with a cube to spare
      if (moving && form.id === 'Heap') for (let i = 0; i < nv; i++) for (let j = 0; j < nv; j++) {
        const v = mx(0, mn(nv, M.round(1.5 * nv - i - j + 0.6 + 0.08 * nv)));
        if (v) { e1a = mn(e1a, i - j); e1b = mx(e1b, i - j); e2a = mn(e2a, i + j - 2 * v + 2); e2b = mx(e2b, i + j); }
      }
      if (e1b < e1a) { e1a = -nv; e1b = nv; e2a = -nv; e2b = nv; }
      // the outline of every cube: across, 2(x - y) - 2 to 2(x - y) + 2; down, x + y - 2z - 2 to x + y + 2
      let X0 = 2 * e1a - 2, X1 = 2 * e1b + 2, Y0 = e2a - 2, Y1 = e2b + 2;
      // a turning build is framed most of the way from how it stands to the whole round its corners sweep
      if (spin) { const r = M.sqrt(r2 * 2), f = 0.75; X0 += (mn(X0, -2 * r) - X0) * f; X1 += (mx(X1, 2 * r) - X1) * f; Y0 += (mn(Y0, nv - r - 2 * zt) - Y0) * f; Y1 += (mx(Y1, nv + r) - Y1) * f; }
      const sw = motion === 'Swaying' ? (nv < 12 ? 1 : swA) * ((swKind === 1 ? 0 : 1) + (swKind === 1 || swKind === 2 ? 1 : 0)) : 0;
      // a little air: more over the top (what settles there, what is thrown up) and round a thing that never rests
      const air = moving ? 2 : 1;
      X0 -= 2 * sw + air; X1 += 2 * sw + air; Y0 -= sw + air + 1 + (motion === 'Settling' ? 3 : 0); Y1 += sw + 1;
      if (motion === 'Heaving' || motion === 'Pumping') Y0 -= 2 * mn(hvA, nv < 13 ? 1 : nv < 22 ? 2 : 3);
      // framed close, a mass or a field is wider than the square by crop and runs past both its sides (and past the
      // bottom, if it is deep enough), so it reads as bigger than the picture; its top is kept in, under a narrow rim
      if (style === 'Close') {
        let kk = 14;
        while (kk > 2 && (X1 - X0) * kk > crop * 216) kk--;
        const g = mn(kk === 2 ? 288 : 224, mx(176, 4 * M.round((X1 - X0) * kk / crop / 4)));
        return [kk, g, M.round(g / 2 - kk * (X0 + X1) / 2), M.round(mx(g / 2 - kk * (Y0 + Y1) / 2, g * 0.05 - kk * Y0))];
      }
      // framed tall, it runs from the foot of the square to near its top, as wide as its upper part needs
      const A = 2 * u1a - 2 - air - 2 * sw, B = 2 * u1b + 2 + air + 2 * sw;
      if (style === 'Box') return [X0, X1, Y0, Y1, A, B];
      if (style === 'Tall') {
        let kk = 14;
        while (kk > 2 && ((Y1 - Y0) * kk > 0.95 * 232 || (B - A) * kk > 0.86 * 232)) kk--;
        const g = mn(kk === 2 ? 288 : 256, mx(176, 4 * M.ceil(mx((Y1 - Y0) * kk / 0.95, (B - A) * kk / 0.86) / 4)));
        return [kk, g, M.round(g / 2 - kk * (A + B) / 2), M.round(g * 0.985 - kk * Y1)];
      }
      // framed alone, it is small and low in a large quiet room: about half the square across, its foot a fifth up
      if (style === 'Alone') {
        let kk = 14;
        while (kk > 2 && (X1 - X0) * kk > 0.47 * 256) kk--;
        const g = mn(kk === 2 ? 288 : 256, mx(120, 4 * M.ceil((X1 - X0) * kk / 0.5 / 4)));
        return [kk, g, M.round(g / 2 - kk * (X0 + X1) / 2), M.round(g * 0.8 - kk * Y1)];
      }
      return frameBox(X0, X1, Y0, Y1, paint === 'Ink' ? 0.78 : 0.86);
    };
    // how the first plan looks once framed: the share of the square it covers, and for one that turns or twists, the
    // least it covers turned an eighth, a quarter and three eighths of the way round (a twist, as far as it twists)
    const judge = () => {
      const fr = framing(), d = drafts[0], spin = !moving && (motion === 'Turning' || motion === 'Twisting');
      if (d.x1 < 0 || form.id === 'Heap') return { fr, cover: 1, thin: 1, ok: true, score: 1 };
      const oX = held ? held[0] : !form.corner ? mid(d.x0, d.x1, 0) : 0, oY = held ? held[1] : !form.corner ? mid(d.y0, d.y1, 1) : 0;
      hexes(d.part, oX, oY, 0, 0, 0);
      const cover = coverIn(...fr);
      let thin = cover;
      if (spin) for (const a of motion === 'Turning' ? [0.785, 1.571, 2.356] : [twA, -twA]) { hexes(d.part, oX, oY, nv / 2, a, motion === 'Twisting' ? mx(1, d.z1) : 0); thin = mn(thin, coverIn(...fr)); }
      // company must make a fuller picture than a build alone, or it reads as a scatter (and so must a thin build: a crib,
      // pipes, jacks, a store of blocks, or it reads as a tangle)
      const floor = (company === 'Alone' ? 0.3 : 0.32) - (form.cone ? 0.05 : 0) + (/^(Crib|Pipes|Jacks|Blocks)$/.test(form.id) ? 0.05 : 0);
      return { fr, cover, thin, full: cover >= floor, ok: cover >= floor && thin >= mx(0.15, cover * 0.55), score: mn(cover, thin / 0.55) - floor };
    };
    // The gate: a build that would cover much under three tenths of the square once framed, or that turns to show a sliver,
    // is tried again: drawn from other numbers and bigger, without its company, with another motion, whole. All of it
    // is drawn from the hash's own streams; the best that was tried is kept.
    fit();
    let seenJ = judge();
    if (!seenJ.ok) {
      const snap = () => ({ drafts, beats, nv, held, motion, company, finish, n, planOff, push, mates0 });
      let keep = snap();
      for (const step of seenJ.full ? ['still', 'again', 'again'] : ['again', 'again', 'alone', 'still', 'whole']) {
        if (seenJ.ok) break;
        const spinning = motion === 'Turning' || motion === 'Twisting';
        if (step === 'again') { planOff += 7919; push = mn(2, push + 1); }
        else if (step === 'alone') { if (company === 'Alone') continue; company = 'Alone'; if (!spinning) n = nAlone; }
        else if (step === 'still') {
          if (moving) continue;
          if (spinning) motion = ['Heaving', 'Pumping', 'Swaying', 'Scanning'][fl(gs() * 4)];
          else if (seenJ.cover < 0.22 && /Swaying|Heaving|Pumping|Settling/.test(motion)) motion = gs() < 0.5 ? 'Scanning' : 'Flooding';
          else continue;
        } else { if (finish === 'Whole' || paint === 'Shells') continue; finish = 'Whole'; }
        fit();
        const j = judge();
        if (j.score > seenJ.score) { seenJ = j; keep = snap(); }
      }
      ({ drafts, beats, nv, held, motion, company, finish, n, planOff, push, mates0 } = keep);
      c.trait('Company', company); c.trait('Finish', finish);
    }
    // How it is framed: most often in the middle of the square. A mass or a field (a mesa, a quarry, a city block, a
    // sponge) is often framed close and cropped, bigger than the picture; a tower, a spire or a screen is framed tall,
    // up the height of the corner; a small strong simple thing (a ball, a ring, a crystal) is now and then drawn small
    // and set low, alone in a large quiet room, where the light falls plain
    let frameAs = 'Centred';
    {
      const d = drafts[0], w = d.x1 - d.x0 + 1, e = d.y1 - d.y0 + 1, h = d.z1 + 1, u = (h3(lo >>> 0, hi >>> 0, 97) & 1023) / 1024, u2 = (h3(lo >>> 0, hi >>> 0, 98) & 1023) / 1024;
      const spin = motion === 'Turning' || motion === 'Twisting';
      const lone = (/^(Ball|Torus|Dome|Octahedron|Cube Frames|Pagoda|Turning|Drilled|Carving)$/.test(form.id) || (form.id === 'Hoops' && moving)) && company === 'Alone' && paint !== 'Ink'
        && /^(Cast|Sunrise|Sunset|Window|Flat)$/.test(light) && motion !== 'Settling'
        && (!matter || /^(Gold|Copper|Glazed|Glass|Gems|Lumen|Jade|Lapis|Terracotta|Ice|Obsidian|Marble|Timber|Brickwork)$/.test(matter));
      if (d.x1 >= 0 && paint !== 'Ink') {
        if (lone && u < 0 && form.sizes[0] <= 20) {
          // drawn again at its smallest; it must still be small once framed, with air over it
          const was = { drafts, beats, nv, held, n };
          n = form.sizes[0]; fit();
          const fr = framing('Alone'), bx = framing('Box');
          if (fr[0] === 2 && (bx[1] - bx[0]) * 2 > 0.56 * fr[1] || fr[3] + fr[0] * bx[2] < 0.1 * fr[1]) ({ drafts, beats, nv, held, n } = was);
          else { frameAs = 'Alone'; seenJ.fr = fr; }
        }
        if (frameAs === 'Centred' && !spin && company === 'Alone' && /^(Spire|Lighthouse|Chimneys|Organ|Pagoda|Screen|Skyline|Coral|Quartz|Crystal|Keep)$/.test(form.id)
          && (bx => bx[3] - bx[2] >= 1.3 * (bx[5] - bx[4]))(framing('Box')) && u2 < 0.85) frameAs = 'Tall';
        else if (frameAs === 'Centred' && !spin && /^(Mesa|Quarry|Terraces|Canyon|Skyline|Sponge|Swell|Ripple|Dunes|Garden|Drift|Scree|Crates|Cascade|Saddle|Organ)$/.test(form.id)
          && h <= 1.1 * mx(w, e) && u2 < 0) frameAs = 'Close';
      }
      // now and then a lone thing of middling size that stands still is set with its back to one wall of a larger room,
      // off the room's diagonal, the floor open beside it where the light falls
      if (frameAs === 'Centred' && d.x1 >= 0 && !spin && !moving && !form.corner && company === 'Alone' && paint !== 'Ink' && motion !== 'Swaying' && /^(Cast|Sunrise|Sunset|Window)$/.test(light)
        && !/^(Grounds|Surfaces|Heaps)$/.test(form.fam) && h >= mx(6, mx(w, e)) && (h3(lo >>> 0, hi >>> 0, 99) & 1023) < ASIDE * 1024 && M.round(nv * 1.4) <= 32) {
        aside = h3(lo >>> 0, hi >>> 0, 101) & 1; nv = M.round(nv * 1.4); frameAs = 'Aside'; seenJ.fr = framing();
      }
      if (frameAs === 'Tall' || frameAs === 'Close') seenJ.fr = framing(frameAs, frameAs === 'Close' ? 0.9 : 1.15 + 0.3 * u);
      c.trait('Framing', frameAs);
    }
    const [k, G, eyeX, eyeY] = seenJ.fr;
    const cmid = (nv - 1) / 2;
    c.grid = G;
    c.trait('Side', nv); c.trait('Motion', motion);
    // a void is kept for a build that fills the square in strong colour; any other stands in its room
    {
      const d = drafts[0], wide = d.x1 - d.x0 + d.y1 - d.y0 + 2, span = d.x1 < 0 ? 0 : mx(wide, wide / 2 + d.z1 + 1) / (2 * nv);
      const strong = matter ? /^(Gold|Copper|Bismuth|Volcanic|Cinder|Lumen|Fungal|Gems|Glazed|Glass|Circuit|City|Lapis|Treasury|Lode|Badlands|Desert|Terracotta)$/.test(matter) : hues[lead][1] >= 0.55 && lum(lead) < 215;
      if (room === 'Void' && !(span >= 0.78 && strong && company === 'Alone' && light !== 'Window' && paint !== 'Wire') || frameAs === 'Alone') room = 'Plain';
    }
    // the room: its tones are tuned to a painted build's lead colour, or to the colour a build of matter is mostly made of
    const tinted = !matter || matter === 'Glass' || matter === 'Glazed' || matter === 'Lumen';
    // how light the build is to the eye, and its mean colour, over all its cubes
    const seen = (() => {
      const keep = [T, O, topZ], d = dress(drafts[0]), s3 = [0, 0, 0], cnt = new Float32Array(768);
      let k = 0;
      for (let i = 0; i < 32768; i++) {
        const ci = d.col[i];
        if (!ci || (!matter && ci > NC)) continue;
        const t = matter ? mats[ci].tones[2] : paint === 'Three Tone' ? three[(i >> 3) % 3] : paint === 'Shade' ? pal[lead] : pal[ci - 1];
        s3[0] += t[0]; s3[1] += t[1]; s3[2] += t[2]; k++;
        // (and how many of each colour's tops and two sides face the eye with nothing in front of them)
        const x = i & 31, y = i >> 5 & 31, z = i >> 10;
        if (z === 31 || !d.col[i + 1024]) cnt[ci * 3]++; if (x === 31 || !d.col[i + 1]) cnt[ci * 3 + 1]++; if (y === 31 || !d.col[i + 32]) cnt[ci * 3 + 2]++;
      }
      if (!matter) [T, O, topZ] = keep;
      const m3 = k ? s3.map(v => v / k) : [128, 128, 128];
      // a build seen by a window or the moon is dimmer than its colours
      return { cnt, rgb: m3, Y: paint === 'Wire' ? 130 : (m3[0] * 0.3 + m3[1] * 0.59 + m3[2] * 0.11) * (paint === 'Shade' ? 1.08 : 1) * (light === 'Window' ? 0.6 : light === 'Moonlit' ? 0.8 : 1) };
    })();
    // A build with gaps and posts in it (an arcade, a lattice, a row of towers) is seen more often by a light that throws
    // its shapes over the room: a low sun's long bars from the side its gaps face, or a window's patch. A warm build is
    // kept from the warm lights and takes a hard white sun instead. A plain lump keeps a plain light.
    if (!want[7] && paint !== 'Ink' && paint !== 'Wire' && /^(Flat|Cast|Haze|Sunrise|Sunset|Window)$/.test(light)) {
      const d = drafts[0], wq = tinted ? hues[lead] : hsl(seen.rgb), warm = wq[1] >= 0.28 && (wq[0] < 0.13 || wq[0] > 0.87), u = (h3(lo >>> 0, hi >>> 0, 71) & 1023) / 1024;
      let rA = 0, rB = 0, rows = 0;
      if (d.x1 >= 0) for (let z = 0; z <= d.z1; z++) {
        let a = 0, b = 0, pa = 0, pb = 0;
        for (let x = d.x0; x <= d.x1; x++) { let f = 0; for (let y = d.y0; y <= d.y1 && !f; y++) if (d.part[at(x, y, z)]) f = 1; if (f && !pa) a++; pa = f; }
        for (let y = d.y0; y <= d.y1; y++) { let f = 0; for (let x = d.x0; x <= d.x1 && !f; x++) if (d.part[at(x, y, z)]) f = 1; if (f && !pb) b++; pb = f; }
        if (a) { rows++; rA += a; rB += b; }
      }
      const oA = rows ? rA / rows - 1 : 0, oB = rows ? rB / rows - 1 : 0, open = mx(oA, oB), tall = d.z1 >= 3;
      const was = light;
      if (warm && /Sunrise|Sunset|Window/.test(light)) light = u < 0.7 ? 'Cast' : 'Flat';
      else if (!warm && tall && open >= 0.4 && light !== 'Sunrise' && light !== 'Sunset') light = u < 0.72 ? (oA > oB + 0.3 || (oB <= oA + 0.3 && (fl(u * 1024) & 1)) ? 'Sunrise' : 'Sunset') : u < 0.9 && room !== 'Void' ? 'Window' : light;
      else if (!warm && open >= 0.2 && light === 'Flat' && room !== 'Void' && u < 0.45) light = 'Window';
      if (light !== was) { c.trait('Light', light); if (light === 'Window') seen.Y *= 0.6; if (was === 'Window') seen.Y /= 0.6; }
    }
    // and only under a build bright enough to stand in the dark
    if (room === 'Void' && (seen.Y < 120 || light === 'Haze')) room = 'Plain';
    const plan = stage => dress(!moving && stage < drafts.length ? drafts[stage] : draft(stage));

    // ---- the rare event: now and then something happens to it. A charge set in it goes off; a tree grows on it; a storm
    // passes over it; a meteor strikes it; it floats; it turns to gold; fireworks go up over it; or, by moonlight, curtains
    // of light hang on the walls. Each comes up for under one in a hundred, from a stream of its own, so nothing else
    // about a build changes for having one ----
    const evS = stream((lo ^ 0x3b9aca07) >>> 0 || 13, (hi + 0x2f6b4e1d) >>> 0 || 14);
    for (let i = 0; i < 3; i++) evS();
    let event = 'None';
    { const EVS = ['TNT', 'Tree', 'Storm', 'Meteor', 'Weightless', 'Midas', 'Fireworks'], r = evS(), ra = evS();
      if (r < 0.0075 * EVS.length) event = EVS[fl(r / 0.0075)]; else if (light === 'Moonlit' && ra < 0.075) event = 'Aurora'; }
    if (paint === 'Ink') event = 'None';                // (a print keeps to its own inks)
    if (want[8]) event = want[8];
    c.trait('Event', event);
    // its colours: each a ramp lit by the scene as the build is (a painted build takes its middle step), darker toward
    // the room's blue-violet and lighter toward the warm; one that shines by itself is a light, and throws its colour
    const EVC = {}, evEm = [], evOwn = new Uint8Array(256);
    const evAdd = (name, h, s, l, em) => {
      const tones = [[-0.2, 0.05, 0.7], [-0.1, 0.025, 0.85], [0, 0, 1], [0.08, -0.02, 0.9], [0.15, -0.03, 0.7], [0, 0, 1], [-0.1, 0.025, 0.85], [0.3, -0.03, 0.25]]
        .map(([dl, dh, ds]) => em ? rgb(h, s, l) : rgb(dh > 0 ? toward(h, 0.7, dh) : toward(h, 0.1, -dh), mn(1, s * ds), mn(0.97, mx(0.06, l + dl))));
      let ci;
      if (matter) { mats.push({ tones, pat: 43, glint: 0, anim: 0, q: 0, self: em ? 0 : 9, glow: null }); ci = mats.length - 1; }
      else { xFlat.push(tones[2]); ci = NC + 7 + xFlat.length; }
      evOwn[ci] = em ? 2 : 1;
      if (em) evEm.push(ci, em);
      return EVC[name] = ci;
    };
    if (event === 'TNT') { evAdd('case', 0.71, 0.22, 0.2); }
    else if (event === 'Tree') {
      // bark, then leaves in three greens (a clump takes one; its lit top the paler), a bud, two blossoms, a fruit, and
      // the three colours of autumn
      evAdd('bark', 0.06, 0.32, 0.26); evAdd('limb', 0.07, 0.3, 0.33);
      evAdd('leaf0', 0.36, 0.52, 0.27); evAdd('leaf1', 0.31, 0.56, 0.35); evAdd('leaf2', 0.25, 0.6, 0.45); evAdd('bud', 0.21, 0.72, 0.58);
      evAdd('bloom0', 0.94, 0.62, 0.84); evAdd('bloom1', 0.97, 0.5, 0.93); evAdd('fruit', 0.015, 0.78, 0.5);
      evAdd('fall0', 0.13, 0.86, 0.56); evAdd('fall1', 0.075, 0.88, 0.52); evAdd('fall2', 0.015, 0.72, 0.42);
    } else if (event === 'Storm') { evAdd('cloud0', 0.68, 0.22, 0.2); evAdd('cloud1', 0.67, 0.18, 0.28); evAdd('cloud2', 0.66, 0.15, 0.37); }
    else if (event === 'Meteor') {
      evAdd('hot0', 0.13, 1, 0.93, [2.4, 2.2, 1.7]); evAdd('hot1', 0.12, 1, 0.68, [2.2, 1.6, 0.6]); evAdd('hot2', 0.07, 1, 0.56, [1.8, 0.9, 0.25]);
      evAdd('hot3', 0.02, 0.85, 0.44, [1.1, 0.35, 0.12]); evAdd('hot4', 0.98, 0.5, 0.26, [0.4, 0.12, 0.08]);
    } else if (event === 'Midas') {
      const sq = hsl(seen.rgb), already = matter === 'Gold' || cover === 'Gilded' || setName === 'Bullion' || (!matter && sq[0] > 0.08 && sq[0] < 0.18 && sq[1] > 0.4);      // (on what is gold already, or gold-yellow, it is white gold)
      if (matter) {
        for (const nm of ['gold', 'shine']) {
          const tones = (already ? (nm === 'gold' ? '8f8a80 c4beb0 e8e3d6 fffdf6' : 'c4beb0 e8e3d6 fffdf6 ffffff') : nm === 'gold' ? 'b47a0e e0a41c ffc832 fff0a0' : 'e0a41c ffc832 ffe680 fffbe0').split(' ').map(s => hex3('#' + s));
          while (tones.length < 8) tones.push(tones.length === 7 ? [255, 255, 255] : tones[1]);
          mats.push({ tones, pat: 18, glint: 1, anim: 0, q: 0, self: 9, glow: null }); EVC[nm] = mats.length - 1; evOwn[mats.length - 1] = 1;
        }
      } else if (already) { evAdd('gold', 0.11, 0.12, 0.8); evAdd('shine', 0.12, 0.3, 0.93); }
      else { evAdd('gold', 0.125, 0.9, 0.58); evAdd('shine', 0.135, 1, 0.8); }
    } else if (event === 'Fireworks') {
      // a rocket, and five colours of star, each in three steps as it burns out: white hot, its colour, its embers
      evAdd('rocket', 0.12, 1, 0.9, [2.2, 2, 1.6]);
      for (const [j, h] of [0.93, 0.12, 0.5, 0.77, 0.36].entries()) {
        const c3 = rgb(h, 1, 0.62);
        evAdd('star' + j + 'a', h, 1, 0.86, c3.map(v => v / 255 * 2.4)); evAdd('star' + j + 'b', h, 1, 0.6, c3.map(v => v / 255 * 1.9)); evAdd('star' + j + 'c', toward(h, 0.75, 0.05), 0.8, 0.36, c3.map(v => v / 255 * 0.7));
      }
    }

    const N = nv;                                     // the side of the room the eye looks into
    // ================= the room and the eye =================
    const vox = new Uint8Array(32768);                 // the colour (or material) number of every cube now standing, 0 for air
    const shade = new Int8Array(33 * 64 + 1).fill(-1), shadeB = new Int8Array(33 * 64 + 1).fill(-1);   // along each slanted line of light (from the right, from the left), the highest cube on it, and one line no cube is ever on
    // occ: for every corner where eight cells meet, how many of the eight are filled (the floor and the two walls count as filled)
    const occ = new Uint8Array(35937);
    for (let z = 0; z < 33; z++) for (let y = 0; y < 33; y++) for (let x = 0; x < 33; x++) occ[(z * 33 + y) * 33 + x] = 8 - (x ? 2 : 1) * (y ? 2 : 1) * (z ? 2 : 1);
    const vis = new Int32Array(G * G).fill(-1), flat = new Int32Array(G * G).fill(-1);   // what each art pixel sees, and which flat face that is
    // for a pixel of the floor or a wall: how much it is darkened where the build stands (pdim), and in the creases (pao)
    const pdim = new Float32Array(G * G).fill(1), pao = new Float32Array(G * G).fill(1), boxed = room === 'Void' || paint === 'Ink' || paint === 'Wire';
    const tone = new Uint8Array(G * G);                // for a material: which of its tones this pixel shows (3 bits) and where it is in its cycle (5 bits)
    // for the light: the corner of the face a pixel lies on (vbase) and where on the face it is (uvw, sixteenths), and the cell of air in front of it (lc)
    const vbase = new Uint16Array(G * G), uvw = new Uint8Array(G * G), lc = new Uint16Array(G * G);
    let cubes = 0;
    // one texel of a material: a face is k texels across and k down; a and b run on across the whole room so
    // courses, planks and veins carry from cube to cube
    const lip = k >= 5 ? 2 : 1;
    let layAs = 0;                                     // the material a texel was laid in: a cover gives way to what it covers below its lip
    const bisOff = h3(lo >>> 0, hi >>> 0, 77) % 5;      // where in its run of colours a bismuth build starts
    let litSide = 1;                                   // the side a material shows its lighter side on: the side the sun or the moon is on (set with the light)
    const lay = (mat, kind, u, v, x, y, z) => {
      const a = (kind === 1 ? y : x) * k + u, b = kind === 0 ? y * k + v : z * k + k - 1 - v, e = (kind === 0 ? z : kind === 1 ? x : y) * 3 + kind;
      if (mats[mat].under) {
        // (grass and moss lie on the tops only, so a cube's sides are what it is made of; moss in patches that run across
        // the cubes, not a cube at a time)
        const P = mats[mat].pat;
        if (kind ? P === 1 || P === 41 || k < 3 || v >= lip + (k >= 4 ? h3(a, e, 5) & 1 : 0) : P === 41 && noise(a / (k * 2.3) + z * 0.31, b / (k * 2.3), 18) < 0.44) mat = mats[mat].under;
      }
      const S = mats[layAs = mat], h = h3(a, b, e) & 255, blot = h3(a >> 1, b >> 1, e) & 255;
      let t = 0, ph = 0;
      switch (S.pat) {
        case 1:                                        // a meadow on the tops, the beds of the ground down the sides
          if (kind === 0) {
            // (in broad drifts of tone across many cubes, the higher the drier and lighter; a darker tuft here and there and,
            // seldom, a few heads gone to seed)
            const w = noise(a / (k * 2.8) + z * 0.23, b / (k * 2.8), 14) + z / mx(6, topZ) * 0.3 - 0.12, tuft = h3(a >> 1, b >> 1, e);
            t = w < 0.34 ? 3 : w < 0.6 ? 4 : w < 0.84 ? 5 : 6;
            if (k >= 3 && (tuft & 31) === 0 && t > 3) t--; else if (k >= 4 && (tuft & 255) === 7) t = 7;
            ph = (a + b + (h & 3)) & 31;
            break;
          }
        // falls through
        case 2: { const q = fl((b + noise(a / (k * 3.1) + e * 0.13, e * 0.29, 61) * k * 0.9) / mx(1.5, k * 0.72)); t = (q * 2 + (h3(q & 1023, 3, 17) & 1)) % 3; break; }   // soil in level beds of three earths
        case 3: { const w = noise(a / (k * 1.7) + e * 0.37, b / (k * 1.7) + kind * 5.1, 13); t = h < 9 ? 4 : h > 248 ? 3 : w < 0.3 ? 0 : w < 0.7 ? 1 : 2; break; }   // stone: soft masses a cube or two across, a grain here and there
        case 4: t = kind === 0 && (a + b * 2) % (k + 3) === 0 ? 3 : h < 50 ? 0 : h > 215 ? 2 : 1; break;   // sand, rippled on top
        case 5: t = h < 16 ? 5 : h3(7, fl((kind === 0 ? z * k + k - 1 : b) / mx(1, k >> 1)), 77) % 5; break;   // sandstone in beds
        case 6:                                        // snow lying on rock
          // (in broad drifts, a glint here and there; the rock under its lip in soft masses; a small cube has no lip, as one
        // texel of white over one of rock reads as a speckle)
          if (kind === 0 || (k >= 3 && v < lip + (k >= 4 ? h3(a, e, 5) & 1 : 0))) { t = (h & 31) === 0 ? 4 : noise(a / (k * 2.2) + e * 0.37, b / (k * 2.2) + kind * 5.1, 33) > 0.64 ? 1 : 0; ph = h >> 3; }
          else t = noise(a / (k * 1.7) + e * 0.37, b / (k * 1.7) + kind * 5.1, 13) < 0.5 ? 3 : 5;
          break;
        case 7: { const w = noise(a / (k * 1.6) + e * 0.37, b / (k * 1.6) + kind * 5.1, 29); t = h < 7 ? 4 : w < 0.34 ? 0 : w < 0.665 ? 1 : 2; break; }   // ice and salt: clear and cloudy masses, a glint here and there
        case 37: {                                     // lapis: deep blue clouds and a seam of gold running through them
          const sp = k * 4.8, q = (a + b * 0.6) / sp + noise(a / (k * 2.4) + e * 0.29, b / (k * 2.4) - kind * 3.7, 43) * 1.5, w = noise(a / (k * 1.6) + e * 0.37, b / (k * 1.6) + kind * 5.1, 41);
          t = q - fl(q) < 1.4 / sp ? (h < 80 ? 4 : 3) : h < 3 ? 4 : w < 0.26 ? 3 : w < 0.5 ? 0 : w < 0.7 ? 1 : 5; break;
        }
        case 8:                                        // water: glints run over the top and down the sides
          if (kind === 0) { t = blot % 3; ph = (a + b * 3 + (h & 3)) & 31; } else { t = h3(a, 0, e) % 3; ph = (b * 2 + h3(a, 1, e)) & 31; }
          break;
        case 28: t = blot < 40 ? 0 : blot > 236 ? 2 : 1; ph = (kind === 0 ? -(a + b) : b + (a >> 2)) & 31; break;   // oil: one dark gloss, with a soft sheen sliding along it
        case 9: { const w = noise(a / (k * 1.2) + e * 0.37, b / (k * 1.2) + kind * 5.1, 47); if (w < 0.4) t = w < 0.3 ? 0 : 1; else { t = 2; ph = blot >> 3; } break; }   // a dark crust in broad plates with the heat showing between
        case 10: { const w = noise(a / (k * 1.5) + e * 0.37, b / (k * 1.5) + kind * 5.1, 31); t = kind > 0 && k >= 3 && a % (2 * k) === 0 ? 3 : w < 0.36 ? 0 : w < 0.66 ? 1 : 2; break; }   // basalt, jointed in columns two cubes wide
        case 11: { const w = noise(a / (k * 1.5) + e * 0.31, b / (k * 1.5) - kind * 2.7, 23); t = w < 0.3 ? 0 : w < 0.5 ? 3 : w < 0.74 ? 4 : 5; ph = (a + b + e) & 31; break; }   // leaves, in clumps with deep gaps between
        case 41: { const w = noise(a / (k * 1.9) - z * 0.17, b / (k * 1.9), 19); t = w < 0.5 ? 0 : w < 0.62 ? 1 : w < 0.78 ? 2 : 3; break; }   // moss: soft cushions in four greens
        case 12: t = h < 12 ? 2 : (kind === 0 ? blot : h3(3, b >> 1, 5)) & 1; break;                   // clay
        case 13: { const hgt = k >= 6 ? k >> 1 : k, r = fl(b / hgt); t = k >= 3 && (b % hgt === 0 || (a + r * 3) % (3 * k) === 0) ? 3 : h3(a >> 2, r, e) % 3; break; }   // planks
        case 14: case 15: {                            // brick in courses (14), cut stone in bigger ones (15)
          const hgt = S.pat === 15 || k < 6 ? k : k >> 1, r = fl(b / hgt), ax = a + (r & 1) * hgt;
          t = k >= (S.pat === 15 ? 4 : 3) && (b % hgt === 0 || ax % (2 * hgt) === 0) ? 4 : h3(fl(ax / (2 * hgt)), r, e) % 3;
          if (S.pat === 15 && h < 14 && t < 4) t = 3;
          // (and moss in the stones' joints where it is damp, and in patches over their tops)
          if (S.pat === 15 && (t === 4 || kind === 0) && noise(a / (k * 2.4) + e * 0.31, b / (k * 2.4) + kind * 4.3, 19) > (t === 4 ? 0.56 : 0.7)) t = 5;
          break;
        }
        case 16: { const w = noise(a / (k * 2.2) + e * 0.37, b / (k * 2.2) + kind * 5.1, 17); t = k >= 3 && b % (2 * k) === 0 ? 3 : k >= 6 && u === k >> 1 && v === k >> 1 ? 3 : h < 10 ? 0 : w < 0.36 ? 0 : w < 0.7 ? 1 : 2;
          if (kind === 0 && w < 0.24) t = 5; else if (kind && t !== 3 && (h3(fl(a / mx(1, k >> 1)), e, 61) & 7) === 0 && b % (2 * k) < (1 + (h3(fl(a / mx(1, k >> 1)), e, 62) & 3)) * k * 0.5) t = 4;
          break; }   // concrete: a seam every two cubes and broad stains, moss in the stains on its tops, and a rust streak run down from a seam here and there
        case 17: {                                     // marble: veins a texel wide in a soft halo, running on from cube to cube, over broad clouds
          const sp = k * 3.4, q = (a * (kind === 2 ? -0.55 : 0.55) + b) / sp + noise(a / (k * 2.2) + e * 0.37, b / (k * 2.2) + kind * 5.1, 71) * 1.7, f = ab(q - fl(q) - 0.5) * sp;
          t = f < 0.6 ? 4 : f < 1.7 ? 3 : noise(a / (k * 2.6) + e * 0.21, b / (k * 2.6) - kind * 2.3, 72) > 0.62 ? 1 : 0; break;
        }
        case 18: {                                     // metal: plates with a lit upper edge, a dark seam when the cubes are big, and whole faces turned where q says
          const cq = knot(x >> 1, (y >> 1) + (z >> 1) * 17, 5) * 255;
          if (S.q && cq > S.q) t = v * 2 < k ? 5 : 6;
          else if (k >= 5 && (u === 0 || v === 0)) t = 0;
          else t = kind === 0 ? ((((a + b) / (k * 6)) % 1 + 1) % 1 < 0.15 ? 3 : 2) : kind === litSide ? (v * 3 < k ? 2 : 1) : k >= 3 && v === 0 ? 1 : 0;   // (a light top crossed now and then by a broad sheen, a middling right, a dark left)
          break;
        }
        case 19: {                                     // chrome: the tops mirror the sky's steel, the side to the light a cool blue and the other the warm ground, each crossed now and then by a band of glare running on over the whole face (narrow and white on the tops)
          const sp = k * 5.5, q = (kind === 0 ? a + b : b + (kind === 1 ? a : -a) * 0.5) / sp, f = q - fl(q);
          t = kind === 0 ? (f < 0.07 ? 3 : f < 0.2 ? 2 : 5) : kind === litSide ? (k >= 4 && f < 0.18 ? 2 : 5) : k >= 4 && f < 0.14 ? 4 : 1;   // (small cubes: one tone a side)
          break;
        }
        case 20: t = kind === 0 ? (u + v < k - 1 ? 3 : 2) : k >= 4 && v === 0 ? 2 : kind === litSide ? 1 : 0; break;   // obsidian: black glass, each top lit on its back half and each side along its top edge
        case 22: {                                     // glass: its own colour, each top lit on its back half, and now and then a long slanting gleam down the sides
          // (small cubes keep one tone a face and no gleam, so a build of them reads as its shape, not as stripes)
          const sp = k * 9, q = (a + (kind === 1 ? b : -b) + e * k * 0.7) / sp, f = (q - fl(q)) * sp;
          t = kind === 0 ? (k < 4 || u + v < k - 1 ? 3 : 2) : k >= 3 && f < 1 ? 7 : k >= 4 && f < 2 ? 3 : kind === litSide ? 4 : 1;
          break;
        }
        case 24: t = (h & 63) === 0 ? 4 : kind === 0 ? (k >= 6 && u + v < (k >> 1) ? 7 : 3) : kind === litSide ? 2 : 1; ph = h >> 3; break;   // a cut gem: a light top (its back corner bright when big), a middling right side and a dark left one
        case 25: t = k >= 3 && (u === 0 || v === 0) ? 5 : k >= 5 && u === 1 && v === 1 ? 3 : 2; break;     // a glazed tile in its grout
        case 31: {                                     // bismuth: a whole cube one oxide colour, turning a step every four courses up, and a big cube's face stepped in to a frame of the next colour
          // (three neighbouring colours a build, turning there and back, so no face ever jumps across the rainbow)
          const q = fl(z / 4) + (k >= 5 && u > 0 && v > 0 && u < k - 1 && v < k - 1 && (u === 1 || v === 1 || u === k - 2 || v === k - 2) ? 1 : 0);
          t = (bisOff + [0, 1, 2, 1][q & 3]) % 5;
          break;
        }
        case 32: { const per = k >= 3 ? k : 2 * k; t = a % per === 0 || b % per === 0 ? 3 : blot % 3; break; }   // nearly black, with lit edges
        case 33:                                       // a facade: a window to a cube (two when the cubes are big), some of them lit, and a flat roof
          if (kind === 0) t = h < 10 ? 5 : 6;
          else if (k < 3) t = u === 0 && v === 0 ? (S.q && (h3(x + kind * 7, y, z) & 7) < 5 ? 4 : 3) : (blot & 3) === 0 ? 1 : 2;
          else { const half = k >= 6 ? k >> 1 : k, wu = u % half; t = wu >= 1 && wu <= half - 2 && v >= 1 && v <= k - 2 ? (S.q && (h3(x + kind * 7 + (u >= half ? 3 : 0), y, z) & 7) < 5 ? 4 : 3) : k >= 4 && v === 0 ? 5 : (blot & 3) === 0 ? 1 : 2; }
          break;
        case 34: {                                     // white ware painted in blue
          // (in whole tiles: a white tile to a cube in a fine grout, a small blue mark at its heart when it is big; down the
          // sides a course of deep blue tiles every fourth course)
          const m2 = (k - 1) / 2, mark = k >= 5 && ab(u - m2) + ab(v - m2) <= (k >= 8 ? 2 : 1);
          t = k >= 4 && (u === 0 || v === 0) ? 5 : kind && z % 4 === 2 ? (mark ? 1 : 2) : mark ? 3 : 0;
          break;
        }
        case 35: {                                     // a circuit board: one calm green, a few long gold traces, and now and then a dark chip with a lamp on it
          const tr = k >= 3 ? k : 2 * k, mid = tr >> 1;
          const chip = k >= 4 && (h3(x + kind * 11, y, z) & 15) === 0 && u > 0 && v > 0 && u < k - 1 && v < k - 1;
          t = chip ? (u === 1 && v === 1 ? 4 : 5) : b % tr === mid && (h3(fl(b / tr), fl(a / (tr * 4)), e) & 7) < 3 ? 3 : kind === 0 && a % tr === mid && (h3(fl(a / tr), fl(b / (tr * 4)), e + 7) & 7) < 2 ? 3 : 1;
          ph = h >> 3; break;
        }
        case 36: t = [0, 1, 2, 0, 1, 3, 1, 4][fl(noise(a / (k * 2.2) + e * 0.7, b / (k * 2.2) + kind * 3.3, 55) * 7 + (x + y + z) * 0.22) % 8]; if (kind && kind !== litSide && t > 1) t = t & 1 ? 6 : 0; ph = h >> 3; break;   // opal: a milky lavender body with drifts of fire in it, the fire on the tops and the lit side
        case 38: {                                     // cinder: black in broad dull masses, cracked, the heat showing in the cracks
          const w = ab(noise(a / (k * 2.6) + e * 0.37, b / (k * 2.6) + kind * 5.1, 83) - 0.5);
          t = w < (k >= 4 ? 0.016 : 0.01) ? 4 : k >= 4 && w < 0.034 ? 3 : noise(a / (k * 2.4) - e * 0.23, b / (k * 2.4) + kind * 3.1, 84) > 0.6 ? 2 : 1; break;
        }
        case 40: t = noise(a / (k * 2) + e * 0.37, b / (k * 2) + kind * 5.1, 85) < 0.42 ? 1 : 2; break;   // ash and dust: soft drifts in two tones
        case 39: t = h < 70 ? 0 : h < 110 ? 1 : 2 + (h & 1); break;                                     // caps that shine
        case 30: t = 2; break;                                                                          // a light: all one colour
        case 41: t = kind === 0 || (u > 0 && v > 0 && u < k - 1 && v < k - 1) ? 3 : 2; break;          // a build's own light: a paler hot heart, and its top
        case 42: t = kind === 0 && h > 236 ? 3 : 2; break;                                               // sand: one even colour, so a pile reads as one mass (a glint here and there on top)
        case 43: t = kind === 0 ? 3 : kind === litSide ? 2 : 1; break;                                   // a marble or a crystal: a light top, its sides by the light
        case 44: { const w = noise(a / (k * 1.3) + e * 0.31, b / (k * 1.3) - kind * 2.7, 24); t = w < 0.3 ? 0 : w < 0.52 ? 1 : w < 0.78 ? 2 : 3; break; }   // leaves (or frost) lying over a face, in clumps
        case 45: { const m2 = (k - 1) / 2; t = (u - m2) * (u - m2) + (v - m2) * (v - m2) <= k * k * 0.07 ? 4 : h < 70 ? 1 : 2; break; }   // a flower open, its heart paler
        case 27: if (blot < 26) t = blot & 1; else { t = 2; ph = ((kind === 0 ? (a + b) * 3 : b * 4) + (blot >> 4)) & 31; } break;   // molten rock: a little crust, and the glow moving the way it runs
        default: { const w = noise(a / (k * 1.7) + e * 0.37, b / (k * 1.7) + kind * 5.1, 13), o = noise(a / (k * 1.3) - e * 0.29, b / (k * 1.3) + kind * 2.9, 77); t = o > 0.7 && h > 120 ? (h > 200 ? 5 : 4) : w < 0.3 ? 0 : w < 0.7 ? 1 : 2; ph = h & 31; }   // ore in stone, in clusters
      }
      return t | ph << 3;
    };
    // a box round every cube standing: a ray is only walked inside it, and one that misses it goes straight to the floor or a wall
    let bx0 = 0, by0 = 0, bx1 = -1, by1 = -1, bz1 = -1, stale = true;
    // Liquid is never a whole cube: where it lies on something it is a film (and a thread where more comes down onto
    // it), and in the air it is a thread, joined to the liquid beside, above and under it; so what is behind shows
    // round it. wetIn: does the ray meet the liquid in this cell, and where (wA: the face, wU, wV: where on it, 0 to 1)
    let wA = 0, wU = 0, wV = 0, wB = 0, wX = 0, wY = 0, wZ = 0, wSx = 0, wSy = 0;
    const FILM = 0.4, T0 = 0.26, T1 = 0.74;
    const wBox = (a0, a1, b0, b1, c0, c1) => {
      const X0 = wX + a0 - wSx, X1 = wX + a1 - wSx, Y0 = wY + b0 - wSy, Y1 = wY + b1 - wSy, Z0 = wZ + c0, Z1 = wZ + c1, hi = mn(X1, Y1, Z1);
      if (hi <= mx(X0, Y0, Z0) || hi <= wB) return;
      wB = hi;
      if (hi === Z1) { wA = 0; wU = (hi - X0) / (a1 - a0); wV = (hi - Y0) / (b1 - b0); }
      else if (hi === X1) { wA = 1; wU = (hi - Y0) / (b1 - b0); wV = (hi - Z0) / (c1 - c0); }
      else { wA = 2; wU = (hi - X0) / (a1 - a0); wV = (hi - Z0) / (c1 - c0); }
    };
    // a growth (or frost) lies over every face its cell touches as a thin cover a whole cell wide, so cells side by side
    // are one sheet and one in a crease covers both faces; a leaf shaken loose, in the air, is a small square
    const LEAF = 0.2;
    const leafIn = (i, xi, yi, zi, sx, sy) => {
      wB = -1e9; wX = xi; wY = yi; wZ = zi; wSx = sx; wSy = sy;
      const sol = j => vox[j] && !liqA[vox[j]];
      let on = 0;
      if (xi > 0 && sol(i - 1)) { wBox(0, LEAF, 0, 1, 0, 1); on = 1; }
      if (yi > 0 && sol(i - 32)) { wBox(0, 1, 0, LEAF, 0, 1); on = 1; }
      if (zi === 0 || sol(i - 1024)) { wBox(0, 1, 0, 1, 0, LEAF); on = 1; }
      if (!on && xi < N - 1 && sol(i + 1)) { wBox(1 - LEAF, 1, 0, 1, 0, 1); on = 1; }
      if (!on && yi < N - 1 && sol(i + 32)) { wBox(0, 1, 1 - LEAF, 1, 0, 1); on = 1; }
      if (!on) wBox(0.25, 0.75, 0.25, 0.75, 0.42, 0.58);
      if (wB === -1e9) return false;
      wU = mn(0.999, mx(0, wU)); wV = mn(0.999, mx(0, wV));
      return true;
    };
    const wetIn = (i, xi, yi, zi, sx, sy) => {
      if (liqA[vox[i]] === 2) return leafIn(i, xi, yi, zi, sx, sy);
      const up = zi < N - 1 && liqA[vox[i + 1024]], sits = zi === 0 || (vox[i - 1024] && !liqA[vox[i - 1024]]);
      // liquid standing shut in (nothing but liquid or the build round it) shows only its surface: it is seen through
      const shut = (xi === 0 || vox[i - 1]) && (yi === 0 || vox[i - 32]) && xi < N - 1 && vox[i + 1] && yi < N - 1 && vox[i + 32];
      if (shut && up) return false;
      wB = -1e9; wX = xi; wY = yi; wZ = zi; wSx = sx; wSy = sy;
      if (sits || shut) { wBox(0, 1, 0, 1, 0, FILM); if (up) wBox(T0, T1, T0, T1, 0, 1); }
      else if (vox[i] === fallNo) {
        // a fall that runs down a face is a sheet laid over it, a whole cube wide along it, so falls side by side are one
        // broad fall; one in the open air is a broad column, joined to the liquid beside it
        const sol = j => vox[j] && !liqA[vox[j]], dn = liqA[vox[i - 1024]];
        let cx = xi > 0 && sol(i - 1) ? -1 : xi < N - 1 && sol(i + 1) ? 1 : 0, cy = yi > 0 && sol(i - 32) ? -1 : yi < N - 1 && sol(i + 32) ? 1 : 0;
        // (where it passes a gap in the face it runs down, it keeps the face's line, so it does not jog in and out)
        if (!cx && !cy) for (const o of [1024, -1024, 2048, -2048]) {
          const j = i + o;
          if (j < 0 || j >= 32768 || !liqA[vox[j]] || (o * o > 1048576 && !liqA[vox[i + o / 2]])) continue;
          cx = xi > 0 && sol(j - 1) ? -1 : xi < N - 1 && sol(j + 1) ? 1 : 0; cy = yi > 0 && sol(j - 32) ? -1 : yi < N - 1 && sol(j + 32) ? 1 : 0;
          if (cx || cy) break;
        }
        const lx = xi > 0 && liqA[vox[i - 1]], hx = xi < N - 1 && liqA[vox[i + 1]], ly = yi > 0 && liqA[vox[i - 32]], hy = yi < N - 1 && liqA[vox[i + 32]];
        const th = cx && cy ? 0.6 : 0.42, fr = 0.14;
        const a0 = cx < 0 ? 0 : cx > 0 ? 1 - th : cy || lx ? 0 : fr, a1 = cx < 0 ? th : cx > 0 ? 1 : cy || hx ? 1 : 1 - fr;
        const b0 = cy < 0 ? 0 : cy > 0 ? 1 - th : cx || ly ? 0 : fr, b1 = cy < 0 ? th : cy > 0 ? 1 : cx || hy ? 1 : 1 - fr;
        wBox(a0, a1, b0, b1, dn ? 0 : T0, up ? 1 : T1);
      } else {
        // (a thread running up and down is never joined to the one beside it, so threads side by side stay threads)
        // (and what leaps up from a spring is a little thicker than what falls)
        const dn = liqA[vox[i - 1024]], side = !(up && dn), t0 = 0.2, t1 = 1 - t0;
        wBox(side && xi > 0 && liqA[vox[i - 1]] ? 0 : t0, side && xi < N - 1 && liqA[vox[i + 1]] ? 1 : t1, side && yi > 0 && liqA[vox[i - 32]] ? 0 : t0, side && yi < N - 1 && liqA[vox[i + 32]] ? 1 : t1, dn ? 0 : t0, up ? 1 : t1);
      }
      if (wB === -1e9) return false;
      wU = mn(0.999, mx(0, wU)); wV = mn(0.999, mx(0, wV));
      return true;
    };
    const see = (px, py) => {
      const p = py * G + px, a = (px + 0.5 - eyeX) / (2 * k), b = (py + 0.5 - eyeY) / k, sx = (a + b) / 2, sy = (b - a) / 2;
      // the ray x = t + sx, y = t + sy, z = t leaves the room at t = out, through the floor or a wall; only a void and
      // a drawing keep the room's box, and see nothing past it
      const out = mx(0, -sx, -sy);
      if (boxed && mn(N, N - sx, N - sy) <= out) { vis[p] = -1; flat[p] = -1; return; }
      // it comes into the box through whichever face it meets first
      let t = bz1 + 1, axis = 0;
      if (bx1 + 1 - sx < t) { t = bx1 + 1 - sx; axis = 1; }
      if (by1 + 1 - sy < t) { t = by1 + 1 - sy; axis = 2; }
      if (t > mx(0, bx0 - sx, by0 - sy)) {
        let xi = fl(t + sx - 1e-7), yi = fl(t + sy - 1e-7), zi = fl(t - 1e-7);
        while (zi >= 0 && xi >= bx0 && yi >= by0) {
          const i = zi << 10 | yi << 5 | xi;
          const wet = vox[i] && liqA[vox[i]];
          if (vox[i] && (!wet || wetIn(i, xi, yi, zi, sx, sy))) {
            if (wet) axis = wA;
            vis[p] = i << 3 | axis; flat[p] = axis << 8 | (axis === 0 ? zi : axis === 1 ? xi : yi) + 1;
            // where on that face the ray lands: u and v run from 0 to 1 across it (on a side, v runs up)
            const th = axis === 0 ? zi + 1 : axis === 1 ? xi + 1 - sx : yi + 1 - sy;
            const u = wet ? wU : mn(0.999, mx(0, axis === 1 ? th + sy - yi : th + sx - xi)), v = wet ? wV : mn(0.999, mx(0, axis === 0 ? th + sy - yi : th - zi));
            uvw[p] = fl(u * 16) | fl(v * 16) << 4;
            vbase[p] = (zi * 33 + yi) * 33 + xi + (axis === 0 ? 1089 : axis === 1 ? 1 : 33);
            lc[p] = axis === 0 ? (zi < N - 1 ? i + 1024 : i) : axis === 1 ? (xi < N - 1 ? i + 1 : i) : yi < N - 1 ? i + 32 : i;
            if (matter) { tone[p] = lay(vox[i], axis, fl(u * k), axis === 0 ? fl(v * k) : k - 1 - fl(v * k), xi, yi, zi); pm[p] = layAs; }
            else if (edgy) eg[p] = wet || xOf[vox[i]] === 1 ? 426 : edgeAt(axis, u, v, xi, yi, zi);      // (sand draws no lines: a pile is one mass)
            return;
          }
          // step back to the next cell along the ray: the largest of the three crossing times
          const tx = xi - sx, ty = yi - sy;
          if (zi >= tx && zi >= ty) { zi--; axis = 0; } else if (tx >= ty) { xi--; axis = 1; } else { yi--; axis = 2; }
        }
      }
      // the floor or a wall, which run on past the room's box: its cell is packed seven bits a side (x, y, z), lc is
      // its place on that plane (64 a side, 4096 past that), and its creases are read as at the box's edge
      let kind, X = 0, Y = 0, Z = 0, u, w;
      if (out === 0) { kind = 3; X = fl(sx); Y = fl(sy); u = sx - X; w = sy - Y; }
      else if (out === -sx) { kind = 4; Y = fl(out + sy); Z = fl(out); u = out + sy - Y; w = out - Z; }
      else { kind = 5; X = fl(out + sx); Z = fl(out); u = out + sx - X; w = out - Z; }
      const A = kind === 4 ? Y : X, B = kind === 3 ? Y : Z;
      vis[p] = (mn(127, Z) << 14 | mn(127, Y) << 7 | mn(127, X)) << 3 | kind; flat[p] = kind << 8; uvw[p] = fl(u * 16) | fl(w * 16) << 4;
      vbase[p] = (mn(31, Z) * 33 + mn(31, Y)) * 33 + mn(31, X); lc[p] = A < 64 && B < 64 ? B << 6 | A : 4096;
      planeAt(p);
    };
    // a cube set or taken: the pixels under its own hexagon are marked, to be looked at again
    const marked = new Uint8Array(G * G);
    let markLo = G, markHi = 0;                        // the rows that hold a marked pixel
    let glowLive = 0;                                  // for how many more ticks the glow is worked out (it is kept up while anything shines)
    const occd = new Uint8Array(32768);
    const setCube = (i, ci) => {
      const was = vox[i];
      if (was === ci) return;
      vox[i] = ci;
      if (emC[ci * 3] + emC[ci * 3 + 1] + emC[ci * 3 + 2] > 0 && glowLive < 60) glowLive = 60;
      const x = i & 31, y = i >> 5 & 31, z = i >> 10, L = x << 6 | (y + z), LB = y << 6 | (x + z);
      // (a cube in the air or thrown down loose darkens nothing round it, so it leaves no smudge where it has been)
      const solid = !was ? !(aloft && aloft[i]) && !(lying && lying[i]) : !ci && occd[i];
      if (solid && (z < 4 || x < 4 || y < 4 || lowSun)) grounded = 0;      // the darkness where it stands is worked out again
      if (!was || !ci) fsDirty = 1;                    // and the shadow on the floor
      if (solid) {
        // the eight corners of the cell each have one more (or one fewer) filled cell round them
        const vb = (z * 33 + y) * 33 + x, dv = was ? -1 : 1;
        occd[i] = was ? 0 : 1;
        occ[vb] += dv; occ[vb + 1] += dv; occ[vb + 33] += dv; occ[vb + 34] += dv; occ[vb + 1089] += dv; occ[vb + 1090] += dv; occ[vb + 1122] += dv; occ[vb + 1123] += dv;
      }
      if (edgy && (was && !liqA[was] && !ghost[was]) !== (ci && !liqA[ci] && !ghost[ci])) edgeMark(i, ci && !liqA[ci] && !ghost[ci]);
      if (!was) { cubes++; fresh[i] = 1; anyFresh = 1; if (!ghost[ci]) { if (z > shade[L]) shade[L] = z; if (z > shadeB[LB]) shadeB[LB] = z; } if (x < bx0) bx0 = x; if (y < by0) by0 = y; if (x > bx1) bx1 = x; if (y > by1) by1 = y; if (z > bz1) bz1 = z; }
      else if (!ci) {
        cubes--; stale = true;
        // (a light that drifts round it throws no shadow)
        if (shade[L] === z && !ghost[was]) { let zz = z - 1, yy = y + 1; while (zz >= 0 && yy < N && (!vox[zz << 10 | yy << 5 | x] || ghost[vox[zz << 10 | yy << 5 | x]])) { zz--; yy++; } shade[L] = zz >= 0 && yy < N ? zz : -1; }
        if (shadeB[LB] === z && !ghost[was]) { let zz = z - 1, xx = x + 1; while (zz >= 0 && xx < N && (!vox[zz << 10 | y << 5 | xx] || ghost[vox[zz << 10 | y << 5 | xx]])) { zz--; xx++; } shadeB[LB] = zz >= 0 && xx < N ? zz : -1; }
      }
      else if (!matter) return;                        // only its colour changed
      const px0 = mx(0, eyeX + 2 * k * (x - y - 1)), px1 = mn(G, eyeX + 2 * k * (x - y + 1)), py0 = mx(0, eyeY + k * (x + y) - 2 * k * (z + 1)), py1 = mn(G, eyeY + k * (x + y + 2) - 2 * k * z);
      // (only those it can change: where it shows now, if it has gone or changed, and these must be looked at in this
      // frame; where it may stand in front of what shows there, if it has come, and these may wait a frame: a cube whose
      // x + y + z is three or more under that of the one seen is behind it)
      const sum = x + y + z;
      for (let py = py0; py < py1; py++) for (let o = py * G + px0, end = py * G + px1; o < end; o++) {
        const v = vis[o];
        if (v < 0 || (v & 7) > 2) { if (!marked[o]) marked[o] = 1; continue; }
        const j = v >> 3;
        if (ci && !was) { if (!marked[o] && sum > (j & 31) + (j >> 5 & 31) + (j >> 10) - 3) marked[o] = 1; }
        else if (j === i) marked[o] = 2;
      }
      if (py0 < markLo) markLo = py0; if (py1 > markHi) markHi = py1;
    };
    // once a frame: every marked pixel is looked at again, or, given a most, every one that must be and as many of the
    // rest as that allows (the others wait for the next frame)
    const look = most => {
      if (stale) {
        // cubes have gone, so the box is drawn again round what is left
        stale = false; bx0 = by0 = 32; bx1 = by1 = bz1 = -1;
        for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (vox[z << 10 | y << 5 | x]) { if (x < bx0) bx0 = x; if (y < by0) by0 = y; if (x > bx1) bx1 = x; if (y > by1) by1 = y; if (z > bz1) bz1 = z; }
        if (boxMore) boxMore();
      }
      let left = most || 1e9, lo = G;
      for (let py = markLo; py < markHi; py++) for (let px = 0, o = py * G; px < G; px++, o++) { const m = marked[o]; if (m) { if (m > 1 || left > 0) { marked[o] = 0; see(px, py); left--; } else if (py < lo) lo = py; } }
      if (lo < G) markLo = lo; else { markLo = G; markHi = 0; }
    };

    // ---- the frame: colour, light and line for every art pixel. A change of light is eased toward; a pixel that comes
    // to show another cube (or the room behind one) takes it at once, so a moving cube is always whole, and a cube just
    // set shows a step dimmer and comes up to full light over a few frames ----
    const cv = document.createElement('canvas');
    cv.width = cv.height = G;
    const cx2 = cv.getContext('2d'), img = cx2.createImageData(G, G), d8 = img.data, shown = new Float32Array(G * G * 3);
    const who = new Int32Array(G * G).fill(-2), fresh = new Uint8Array(32768), pm = new Uint8Array(G * G);   // what each pixel showed; the cells just filled; the material each pixel shows
    let anyFresh = 0;
    // a cube that has just landed (thump: ticks left): a dark line round its foot and a puff at its two near corners, for
    // a few frames; and the glint that runs along a line once it is down (gleam: lit now; glL, glD: the cells waiting
    // their turn, and how many ticks)
    const thump = new Uint8Array(32768), thL = new Int32Array(2048), gleam = new Uint8Array(32768), glL = new Int32Array(2048), glD = new Int16Array(2048), puffs = new Uint8Array(32768);
    let thN = 0, glN = 0, gleams = 0;
    const landed = (i, q, puff) => {
      if (!thump[i] && thN < thL.length) thL[thN++] = i;
      thump[i] = 6; puffs[i] = puff ? 1 : 0;
      if (q >= 0 && glN < glL.length) { glL[glN] = i; glD[glN++] = 1 + q; }
    };
    // A painted cube is shaded by its edges: a crease darkens the pixel along it (and less the one beside it), deeper where
    // two creases meet; the edge a top makes with a side open to the air catches the light, the more on the side the sun
    // is on; and a big face drifts a step lighter and darker over a few cubes, so it never reads as an empty plane.
    // eg, for each pixel when it is looked at: how near it is to each edge of its face (0 within a pixel, 1 within two,
    // 2 further; u low, u high, v low, v high, two bits each) and its drift (0 to 2, above them). nbr, for each cell and
    // kind of face: which of the cells its edges look at are solid (kept up as cubes are set: the four over its edges,
    // then those that keep its upper edges from the air). egT: from the two, the edge's code (a crease 1 to 3, the lit
    // edge to the right 4, to the left 5); egM: what each code and drift makes of the light, set each frame
    const eg = new Uint16Array(G * G), edgy = !matter && paint !== 'Ink' && paint !== 'Wire';
    const EGD = [0.955, 1, 1.045], EGC = [1, 0.84, 0.68, 0.54], nbr = edgy ? new Uint8Array(3 * 32768) : null, egT = new Uint8Array(edgy ? 3 * 256 * 64 : 0), egM = new Float32Array(54).fill(1);
    const NB = [[[-1, 0, 1], [1, 0, 1], [0, -1, 1], [0, 1, 1], [1, 0, 0], [0, 1, 0]], [[1, -1, 0], [1, 1, 0], [1, 0, -1], [1, 0, 1], [0, 0, 1]], [[-1, 1, 0], [1, 1, 0], [0, 1, -1], [0, 1, 1], [0, 0, 1]]];
    if (edgy) for (let kind = 0; kind < 3; kind++) for (let band = 0; band < 256; band++) for (let m = 0; m < 64; m++) {
      let c = 0, two = 0;
      for (let j = 0; j < 4; j++) if (m >> j & 1) { const d = band >> 2 * j & 3, e = d === 0 ? 2 : d === 1 ? 1 : 0; if (e === 2) two++; if (e > c) c = e; }
      if (two > 1) c = 3;
      const open = j => (band >> 2 * j & 3) === 0 && !(m >> j & 1);
      egT[(kind << 14) | band << 6 | m] = c || (kind === 0 ? (open(1) && !(m & 16) ? 4 : open(3) && !(m & 32) ? 5 : 0) : open(3) && !(m & 16) ? (kind === 1 ? 4 : 5) : 0);
    }
    const edgeMark = (i, on) => {
      const x = i & 31, y = i >> 5 & 31, z = i >> 10;
      for (let kind = 0; kind < 3; kind++) for (let j = 0; j < NB[kind].length; j++) {
        const o = NB[kind][j], X = x - o[0], Y = y - o[1], Z = z - o[2];
        if (X >= 0 && Y >= 0 && Z >= 0 && X < 32 && Y < 32 && Z < 32) { const q = kind << 15 | Z << 10 | Y << 5 | X; if (on) nbr[q] |= 1 << j; else nbr[q] &= ~(1 << j); }
      }
    };
    const edgeAt = (kind, u, v, x, y, z) => {
      // (its distance from each edge in pixels of the picture)
      const d0 = u * 2 * k, d1 = (1 - u) * 2 * k, d2 = v * 2 * k, d3 = (1 - v) * 2 * k, cl = d => d < 1 ? 0 : d < 2 ? 1 : 2;
      const X = kind === 1 ? y + u : x + u, Y = kind === 0 ? y + v : z + v, P = kind === 0 ? z : kind === 1 ? x + 40 : y + 80;
      // (the drift steps by texels, so it reads as laid on, not as a gradient)
      const n = noise(fl(X * k) / (k * 3.3) + P * 0.37, fl(Y * k) / (k * 3.3) - P * 0.21, 91);
      return cl(d0) | cl(d1) << 2 | cl(d2) << 4 | cl(d3) << 6 | (n < 0.37 ? 0 : n > 0.63 ? 2 : 1) << 8;
    };
    // when each cube catches the light passing over a shining material: by how far back it stands, and a little of its own
    const gph = new Uint8Array(32768).map((_, i) => ((i & 31) + (i >> 5 & 31) + (i >> 10)) * 3 + (h3(i & 31, i >> 5 & 31, i >> 10) & 31) & 255);
    // every face of every colour or material, in each of its eight tones, in each of 64 lights from none to more than
    // full (50 is full light: the colour itself); cyc is where a tone goes as the clock turns
    const count = matter ? mats.length - 1 : NC + 7 + xFlat.length;
    const face = new Float32Array((count + 1) * 4608), wall = new Float32Array(9), cyc = new Uint8Array((count + 1) << 8), glints = new Uint8Array(count + 1);
    // selfT: the lowest tone of a colour that shines by itself (9: none of them). emC: the light it throws on what is near
    const selfT = new Uint8Array(count + 1).fill(9), emC = new Float32Array((count + 1) * 3);
    // a material's faces are read in much more light on top, so its lit top comes up near white (or as near as its colour
    // goes), and its sides in a little more, so the side away from the sun is a deep colour and never a black (under a
    // low sun the side it lights takes the top's step instead); what shines by itself is not
    const fgain = (S, kind) => {
      if (!S || !S.tones.length) return 1;
      const t = S.tones[2], Y = t[0] * 0.3 + t[1] * 0.59 + t[2] * 0.11, dk = mx(0, 1 - Y / 120), pl = S.pat === 8 || S.pat === 27 || S.pat === 28 ? 0 : mx(0, (Y - 150) / 105);
      // (a pale material, a snow, an ice, a chrome, a white stone, keeps its top a step under white, so what glints on it
      // shows, and its side away from the light goes properly dark, so it reads as a solid and not as a fluff)
      const away = light === 'Sunset' ? 1 : 2;
      // (a low sun grazes a top, which is the dimmer the paler it is, so a snowy top never matches the side in the sun)
      if (light === 'Sunrise' || light === 'Sunset') return kind === 0 ? 1 + 0.3 * dk - 0.15 * pl : kind === (light === 'Sunrise' ? 1 : 2) ? 1.14 + 0.3 * dk : 1.08 - 0.42 * pl;
      return kind === 0 ? (light === 'Moonlit' ? 1.36 : 1.42) + 0.24 * dk - 0.3 * pl : light === 'Moonlit' ? 1.05 + 0.05 * dk - 0.25 * pl : (kind === 1 ? 1.12 + 0.12 * dk : 1.2) - (kind === away ? 0.5 * pl : 0);      // (the moon may be on either side)
    };
    const inkOrWire = paint === 'Ink' || paint === 'Wire';
    for (let ci = 1; ci <= count; ci++) {
      const S = matter ? mats[ci] : null, wisp = wispCi.indexOf(ci);
      if (S) { selfT[ci] = S.self; if (S.glow) for (let ch = 0; ch < 3; ch++) emC[ci * 3 + ch] = S.glow[ch]; }
      else if (ci === NC + 7) { selfT[ci] = 0; for (let ch = 0; ch < 3; ch++) emC[ci * 3 + ch] = glowCol[ch] / 255 * 2.2; }
      else if (wisp >= 0 || ((ci === NC + 1 || ci === NC + 6) && liquid === 'Magma')) { selfT[ci] = 0; if (wisp < 0) { emC[ci * 3] = 1.5; emC[ci * 3 + 1] = 0.66; emC[ci * 3 + 2] = 0.13; } }
      for (let kind = 0; kind < 3; kind++) for (let tn = 0; tn < 8; tn++) {
        let col, m = 1;
        if (S) { col = S.tones[tn]; if (tn >= S.self) m = [1, 0.93, 0.86][kind]; }
        else if (wisp >= 0) { col = wispCol[wisp]; m = [1, 0.92, 0.84][kind]; }
        else if (ci > NC + 7) { col = xFlat[ci - NC - 8]; if (evOwn[ci] === 2) m = [1, 0.9, 0.8][kind]; }       // sand, marbles or a growth on a painted build (or what a rare event brings)
        else if (ci === NC + 7) { col = kind ? glowCol : glowCol.map(v => v + (255 - v) * 0.18); m = [1, 0.95, 0.9][kind]; }
        else if (ci > NC) { col = ci === NC + 6 ? (liquid === 'Water' ? liqRGB.map((v, ch) => v * 0.6 + [44, 156, 246][ch] * 0.4 + (255 - v) * 0.1) : liquid === 'Oil' ? liqRGB.map(v => v * 1.3) : [[255, 222, 110], [255, 170, 50], [244, 124, 30]][kind]) : ci > NC + 1 ? [245, 245, 245] : liquid === 'Magma' ? [[255, 168, 44], [246, 108, 20], [214, 74, 12]][kind] : liqRGB; if ((ci === NC + 1 || ci === NC + 6) && liquid === 'Oil') m = [1.35, 0.85, 0.74][kind]; }   // what runs over a painted build, and what settles on it
        else if (paint === 'Three Tone') col = three[kind];
        else col = pal[ci - 1];
        if (paint === 'Wire' && ci <= NC) { const w = hsl(col); col = rgb(toward(w[0], 0.69, 0.25), w[1], w[2]); }   // a wire drawing's faces shade toward violet and blue, never to a brown
        if (!S && tn) continue;                           // a flat colour has one tone
        const own = [0, 0, 0];
        // (a dark material's top catches the sky: it is read a step paler, so even a black glass has a lit top)
        const sky = S && kind === 0 && tn < S.self ? 0.32 * mx(0, 1 - (S.tones[2][0] * 0.3 + S.tones[2][1] * 0.59 + S.tones[2][2] * 0.11) / 120) : 0;
        // (a painted colour at full strength is taken a little under it, so its lit top can still come up past it)
        if (!S && ci <= NC && !inkOrWire) col = tame(col);
        for (let ch = 0; ch < 3; ch++) { let v = col[ch] * m; if (paint === 'Shade' && kind === 0 && ci <= NC) v += (255 - v) * 0.42; own[ch] = v + (255 - v) * sky; }
        const fg = (S && tn < S.self ? fgain(S, kind) : !S && ci <= NC && kind === 0 && !inkOrWire && paint !== 'Three Tone' && paint !== 'Shade' ? 1.14 : 1)
          * (xOf[ci] === 1 ? (kind ? 1.45 : 1.12) : xOf[ci] === 2 ? (kind ? 1.25 : 1.08) : 1);      // (sand and marbles are read in a little more light, so a pile never goes to a brown nor a marble to a stone)
        for (let lv = 0, o = ((ci * 3 + kind) * 8 + tn) * 192; lv < 64; lv++, o += 3) { const lit3 = lightAt(own, lv / 50 * fg); face[o] = lit3[0]; face[o + 1] = lit3[1]; face[o + 2] = lit3[2]; }
      }
      if (S) {
        glints[ci] = S.glint;
        for (let tn = 0; tn < 8; tn++) for (let p = 0; p < 32; p++) {
          let f = tn; const an = S.anim;
          // (only what moves with what it is moving moves: no sparks, and the light on water and oil one soft step)
          if (an === 1 && tn >= 3 && tn <= 5 && p < 3) f = tn + 1;            // wind over grass and leaves: a step lighter as it passes
          else if (an === 2 && tn <= 2 && p < 3) f = 6;                       // light on water
          else if (an === 5 && tn <= 2 && p < 4) f = p === 0 || p === 3 ? 2 : 3;   // the sheen on oil
          else if (an === 4 && tn >= 2) f = 2 + fl(ab(p - 16) / (S.pat === 9 ? 8.01 : 4.01));   // heat running with molten rock; in a crust's cracks only breathing
          cyc[ci << 8 | tn << 5 | p] = f;
        }
      }
    }
    const cast = light !== 'Flat' && light !== 'Haze', hazy = light === 'Haze', inked = paint === 'Ink', wired = paint === 'Wire', tiled = room === 'Tiled';

    // ---- the light ----
    // A face takes the room's own light (kA, by which way it faces: top, right, left, then floor and the two walls),
    // dimmer in the creases; the sun's or the moon's (kS) unless something higher on its slanted line stands in the
    // way; and the glow of whatever shines nearby (GR, GG, GB: a level for every cell of air, handed on from cell to
    // cell and losing a fifth at each step, so it goes round corners but not through cubes).
    // (a top always takes more of the room's light than a side, and the right side more than the left, so a cube reads
    // as a cube in shade as well as in the sun)
    const kA = matter ? [0.64, 0.47, 0.36, 0.55, 0.5, 0.5] : paint === 'Three Tone' ? [0.72, 0.72, 0.8, 0.55, 0.5, 0.5] : paint === 'Shade' ? [0.52, 0.38, 0.28, 0.55, 0.5, 0.5] : paint === 'Tops' ? [0.55, 0.12, 0.12, 0.55, 0.5, 0.5] : [0.52, 0.36, 0.26, 0.55, 0.5, 0.5];
    const kS = matter ? [0.38, 0.14, 0, 0.45, 0.25, 0] : paint === 'Three Tone' ? [0.28, 0.18, 0, 0.45, 0.25, 0] : paint === 'Shade' ? [0.5, 0.2, 0, 0.45, 0.25, 0] : paint === 'Tops' ? [0.45, 0, 0, 0.45, 0.25, 0] : [0.5, 0.14, 0, 0.45, 0.25, 0];
    // the room takes a smaller share of the sun than the build, so a shadow cast on it is the room's own colour in shade, never near black
    if (light !== 'Window') for (let j = 3; j < 6; j++) kS[j] *= light === 'Sunrise' || light === 'Sunset' ? 0.75 : 0.6;
    const aoL = new Float32Array(matter || wired ? [1, 1, 1, 1, 1, 0.8, 0.62, 0.5, 0.44] : [1, 1, 1, 1, 1, 0.68, 0.48, 0.38, 0.32]),   // a flat-painted build is shaded deeper in its creases, so it reads as solid
      ST1 = [1, 33, 1, 1, 33, 1], ST2 = [33, 1089, 1089, 33, 1089, 1089];
    const GR = new Float32Array(32768), GG = new Float32Array(32768), GB = new Float32Array(32768);
    // the hour: [when in the day, the sun from the right, from the left, its colour, the room's colour, how much it is night]
    // At night the room's light stays near grey, so the build keeps its own colours, and the moon is a cold light that
    // catches the edges turned to it
    const DAY = [[0, 1.3, 0, 1.45, 1.02, 0.8, 0.6, 0.6, 0.9, 0.3], [0.1, 1.1, 0, 1.1, 1, 0.9, 0.9, 0.92, 1, 0], [0.26, 0.6, 0.6, 1, 1, 1, 1.02, 1.02, 1.02, 0], [0.42, 0, 1, 1.06, 1, 0.92, 0.96, 0.96, 1, 0],
      [0.54, 0, 1.3, 1.55, 0.8, 0.5, 0.66, 0.56, 0.88, 0.25], [0.62, 0, 0.5, 1.1, 0.7, 0.9, 0.5, 0.48, 0.7, 0.8], [0.68, 0.8, 0, 0.92, 1.08, 1.4, 0.6, 0.6, 0.68, 1], [0.93, 0.8, 0, 0.92, 1.08, 1.4, 0.6, 0.6, 0.68, 1], [1, 1.3, 0, 1.45, 1.02, 0.8, 0.6, 0.6, 0.9, 0.3]];
    const amb = [1, 1, 1], sun = [1, 1, 1], win = new Uint8Array(33 * 64 + 1), windowed = light === 'Window', clocked = light === 'Round the Clock';
    const dayLen = 100 + rand() * 60, moonLeft = rand() < 0.5, winW = mx(3, M.round(N * (0.5 + rand() * 0.25))), winH = mx(4, M.round(N * (0.9 + rand() * 0.5))), winP = rand() * TAU, winQ = rand() * TAU, winS = TAU / (30 * (100 + rand() * 80));
    let sunA = 1, sunB = 0, night = 0, glowK = 0.45, dayAt = rand(), hourNo = 0, shimT = 0, flashT = 0, flashI = 0, glowAt = 0;
    // (by moonlight the side the moon is on takes the more of the room's light and the other much less, so a cube in the
    // dark still shows three faces)
    // (by a window the build takes much more of the room's light than the room, so outside the patch it is not lost in the dim)
    if (windowed) for (let j = 0; j < 3; j++) kA[j] *= 1.4;
    if (light === 'Moonlit') { const lit = kA[1], dim = kA[2] * 0.7; kA[moonLeft ? 2 : 1] = lit; kA[moonLeft ? 1 : 2] = dim; }
    litSide = light === 'Sunset' || (light === 'Moonlit' && moonLeft) ? 2 : 1;
    // a blow: how far its flash reaches, the ring of light that runs out from it over the floor and the faces round it,
    // the hole it leaves (dent: cells of air the eye sees into, a step darker), and a cube come home that flashes (spark)
    let flashR = 4, blowT = 0, inAir = false, ringT = 0, ringR = 0, dents = 0, sparks = 0;
    // what an event does to the light: the room's light dimmed (a storm) and a flash added to it (evFl), a light of its
    // own in a cell of air (evLI, evLE), whether that reaches the room, whether the room is drawn whole, and what it draws over the picture
    let evDim = 1, evLI = -1, evLit = false, evFull = false, evSnap = false, evDraw = null;
    const evFl = [0, 0, 0], evLE = [0, 0, 0];
    const RING = 15, dent = new Uint8Array(32768), spark = new Uint8Array(32768);
    const hourIs = (A, B, f) => {
      sunA = A[1] + (B[1] - A[1]) * f; sunB = A[2] + (B[2] - A[2]) * f; night = A[9] + (B[9] - A[9]) * f; glowK = 0.45 + 0.55 * night;
      for (let ch = 0; ch < 3; ch++) { sun[ch] = A[3 + ch] + (B[3 + ch] - A[3 + ch]) * f; amb[ch] = A[6 + ch] + (B[6 + ch] - A[6 + ch]) * f; }
      for (let j = 0; j < wispCi.length; j++) for (let ch = 0; ch < 3; ch++) emC[wispCi[j] * 3 + ch] = wispCol[j][ch] / 255 * 2.6 * (0.3 + 0.7 * night);
    };
    // Flat: one even light, no shadows. Cast: a strong sun over a low room light, so its shadows are hard. Sunrise: a
    // gold-pink sun low on the right; Sunset: an orange-red one low on the left; both over a cool violet room, with long
    // shadows. Window: a bright patch of sun in a dim room. Moonlit: a grey room and a cold moon on the edges.
    const fixed = { Cast: [0, 1.75, 0, 1.06, 1, 0.9, 0.52, 0.54, 0.62, 0], Sunrise: [0, 1.6, 0, 1.55, 1.08, 0.86, 0.62, 0.6, 0.76, 0], Sunset: [0, 0, 1.6, 1.7, 0.78, 0.46, 0.66, 0.57, 0.76, 0],
      Window: [0, 2.3, 0, 1.8, 1.5, 1.08, 0.58, 0.6, 0.7, 0.3], Moonlit: [0, moonLeft ? 0 : 0.8, moonLeft ? 0.8 : 0, 0.92, 1.08, 1.4, 0.6, 0.6, 0.68, 1] }[light];
    if (!clocked) { const h = fixed || [0, 1, 0, 1, 1, 1, 1, 1, 1, 0]; hourIs(h, h, 0); }
    // How light the build looks in this light (0 to 100, as the eye sees it): each of its colours as each kind of face
    // shows it at the level the hour's full light gives that face (the room's light, and the sun or the moon on the faces
    // turned to it, some of them in shadow), mixed by the share of the picture each kind of face takes
    let litL = 0, litR = 0;                            // (and how light its lightest kind of face looks; litR: as its faces alone give it)
    const lin = v => (v /= 255) <= 0.04045 ? v / 12.92 : M.pow((v + 0.055) / 1.055, 2.4);
    const seenL = (() => {
      const h = clocked ? DAY[2] : fixed || [0, 1, 0, 1, 1, 1, 1, 1, 1, 0], low = light === 'Sunrise' || light === 'Sunset', aM = (h[6] + h[7] + h[8]) / 3, sM = (h[3] + h[4] + h[5]) / 3 * (windowed ? 0.3 : 0.7);
      const s0 = low ? kS[0] * 0.6 : kS[0], s1 = low ? kS[1] && (paint === 'Three Tone' ? 0.26 : 0.65) : kS[1];
      const lv = [aM * kA[0] + sM * (h[1] + h[2]) * s0, aM * kA[1] + sM * h[1] * s1, aM * kA[2] + sM * h[2] * s1];
      let sum = 0, w = 0;
      const kS3 = [0, 0, 0], kW3 = [0, 0, 0];
      // (a material's face is read texel by texel as it is laid, over a few cubes, so its tones count as often as they show)
      const ks = mx(1, mn(5, M.round(k))), kq = mx(1, M.round(k)) / ks, at3 = [[3, 5, 2], [8, 2, 5], [1, 9, 7], [11, 11, 1]];
      for (let ci = 1; ci <= count; ci++) for (let kind = 0; kind < 3; kind++) if (seen.cnt[ci * 3 + kind]) for (let j = 0; j < (matter ? at3.length * ks * ks : 1); j++) {
        const tn = matter ? lay(ci, kind, fl((j % ks) * kq), fl((fl(j / ks) % ks) * kq), ...at3[fl(j / (ks * ks))]) & 7 : 0, cj = matter ? layAs : ci;
        // (its lightness as the eye has it, from the light each channel gives, so a cyan reads as light as it is and a blue as dark)
        const o = ((cj * 3 + kind) * 8 + tn) * 192 + mn(63, tn >= selfT[cj] ? 50 : M.round(lv[kind] * 50)) * 3, Y = 0.2126 * lin(face[o]) + 0.7152 * lin(face[o + 1]) + 0.0722 * lin(face[o + 2]);
        const e = seen.cnt[ci * 3 + kind] * 100 * M.cbrt(Y);
        sum += e; w += seen.cnt[ci * 3 + kind]; kS3[kind] += e; kW3[kind] += seen.cnt[ci * 3 + kind];
      }
      for (let kind = 0; kind < 3; kind++) if (kW3[kind]) litL = mx(litL, kS3[kind] / kW3[kind]);
      litR = litL;
      litL = 21 + 0.71 * litL + ({ Cast: -2, Sunset: -2.5, Window: -5.5, Moonlit: 5, Haze: 3, Flat: 5.5 }[light] || 0);
      // (what is lit by its neighbours' glow, by the moon's rim or by a haze looks a little lighter than its faces alone)
      // (its creases, its own shadows and the dimmer cubes deep in it draw it together toward the middle; measured so)
      return 21 + 0.57 * (w ? sum / w : 50) + ({ Cast: -3, Window: -4, Moonlit: 3, Haze: 3.5, Flat: 3 }[light] || 0);
    })();
    // A void only under a build bright enough to stand in it. Otherwise the room is pale, middling or deep, and always far
    // from how light the build looks, so the build is the lightest or the darkest thing in the picture and reads in grey
    // alone: a dark or middling build in a pale room, a light or middling one in a deep one, and a middling room only round
    // a build much darker or lighter than it. Night, a build that shines and a wire frame want the deeper rooms; a haze and
    // a window the paler.
    // (seenL is how light the build is on the whole; bL how light most of its pixels look, which runs further to either
    // end; RL how light most of the room's pixels look in each kind of room, a window's dimmer)
    const RL = { Pale: windowed ? 79 : 86, Mid: 57, Deep: 28 }, bL = 1.51 * seenL - 27;
    const lightness = room === 'Void' ? 'Void' : (() => {
      // (a build of clear strong colour parts from its room by its hue as well, so it may stand a little nearer it)
      const vivid = tinted ? mx(chroma(pal[lead]), chroma(pal[second])) : chroma(seen.rgb) * 1.6, need = vivid >= 0.45 ? 25 : 28;
      const far = t => ab(RL[t] - bL), ok = [];
      if (bL + 5 - RL.Deep >= need) ok.push('Deep');      // (in a deep room the build is lit the more: see below)
      if (far('Mid') >= need + 4) ok.push('Mid');
      if (RL.Pale - bL >= need && (litR < 76 || bL < 40)) ok.push('Pale');      // (never a build with near-white tops in a pale room: they would melt into it)
      if (!ok.length) ok.push(far('Pale') > far('Deep') + 3 && (litR < 80 || bL < 44) ? 'Pale' : 'Deep');
      // (one that may take a pale room or a deep one takes the deep the more often the lighter it is)
      const pD = mx(0.15, mn(0.85, (bL - 48) / 16));
      ok.sort((p, q) => (p === 'Mid' ? 0 : p === 'Deep' ? (toneRoll < pD ? 1 : 2) : toneRoll < pD ? 3 : 0.5) - (q === 'Mid' ? 0 : q === 'Deep' ? (toneRoll < pD ? 1 : 2) : toneRoll < pD ? 3 : 0.5));
      const glows = /Lumen|City|Cinder|Fungal|Volcanic|Circuit/.test(matter);
      const wish = light === 'Moonlit' || glows || paint === 'Wire' ? ['Deep', 'Mid'] : light === 'Round the Clock' ? ['Mid', 'Deep'] : light === 'Haze' || light === 'Window' ? ['Pale', 'Mid'] : null;
      const both = wish ? wish.filter(t => ok.indexOf(t) >= 0) : [];
      if (wish && both.length) return both.length > 1 && toneRoll < 0.42 ? both[1] : both[0];
      return ok[0];
    })();
    // a deep room is a dim one round a build in the light: the build takes more of it, so it is the lightest thing there
    if (lightness === 'Deep') for (let j = 0; j < 3; j++) { kA[j] *= 1.15; kS[j] *= 1.15; }
    if (paint !== 'Ink') { c.trait('Room', lightness); if (lightness !== 'Void') c.trait('Walls', room); }
    // (a void keeps the tones of a deep room for the pool of light the build stands in)
    const roomRGB = roomFor(tinted ? hues[lead] : hsl(seen.rgb), lightness === 'Void' ? 'Deep' : lightness);
    for (let kind = 0; kind < 3; kind++) for (let ch = 0; ch < 3; ch++) wall[kind * 3 + ch] = roomRGB[kind][ch];
    // wallK: how far each of the room's three surfaces takes the light, set below so each shows its lightness in the hour's
    // full light; the weave's second lightness is a small step lighter in a deep room and a small step darker in any other
    const wallK = new Float32Array(3), weave = lightness === 'Deep' ? 1.035 : 0.976;
    // in a haze the far side of everything goes pale: how much, by how far a cell is from the eye (x + y + z); the room
    // itself takes its own tones, a little paler
    const haze = new Float32Array(100), fogW = new Float32Array(9).map((_, j) => wall[j] * 0.9 + [226, 224, 230][j % 3] * 0.1), fogC = [fogW[0], fogW[1], fogW[2]];
    for (let s = 0; s < 100; s++) haze[s] = light === 'Haze' ? mn(0.26, M.pow(mx(0, 1 - s / (2.4 * N)), 1.3) * 0.34) : 0;
    // the room's surfaces show their tones in the hour's full light (noon, if the day goes round); by a window, a step
    // under them outside its patch, and the patch far over
    { const h = clocked ? DAY[2] : fixed || [0, 1, 0, 1, 1, 1, 1, 1, 1, 0], aL = (h[6] + h[7] + h[8]) / 3, sL = windowed ? 0 : (h[3] + h[4] + h[5]) / 3;
      for (let j = 0; j < 3; j++) wallK[j] = (windowed ? 0.8 : 1) / (aL * kA[3 + j] + sL * (h[1] * (j < 2 ? kS[3 + j] : 0) + h[2] * (j === 0 ? kS[3] : j === 2 ? kS[4] : 0)));
      // under a low sun the room's light is violet; the room is given back most of its own hue under it
      if (light === 'Sunrise' || light === 'Sunset') for (let j = 0; j < 9; j++) wall[j] = mn(255, wall[j] * (1 + 0.6 * (aL / h[6 + j % 3] - 1))); }
    // A void is dark but for a pool of light on the floor round the build, in flat steps, that climbs a little way up
    // the walls where the build stands near them: its level for every place on the floor and the walls (set once the
    // build stands)
    // (and any other room, but by a window, which has its patch, or round a drawing: the light gathers a little on the
    // floor round the build and falls off, in a few flat steps, toward the far floor and up the walls; in a deep room the
    // more, so the build stands in its light)
    const pooled = lightness === 'Pale' || lightness === 'Deep' ? !windowed && paint !== 'Ink' && paint !== 'Wire' : false;
    const poolHi = lightness === 'Deep' ? 1.14 : 1.05, poolLo = lightness === 'Deep' ? 0.8 : 1;
    const pool = lightness === 'Void' || pooled ? new Float32Array(3 * 4097) : null;
    const poolUp = () => {
      if (!pool || bx1 < 0) return;
      const cx = (bx0 + bx1 + 1) / 2, cy = (by0 + by1 + 1) / 2, R = mx(bx1 - bx0, by1 - by0) / 2 + 3.5;
      for (let kind = 3; kind < 6; kind++) for (let B = 0; B < 64; B++) for (let A = 0; A < 64; A++) {
        const x = kind === 4 ? 0 : A + 0.5, y = kind === 3 ? B + 0.5 : kind === 4 ? A + 0.5 : 0, z = kind === 3 ? 0 : B + 0.5;
        const d = hyp(x - cx, y - cy) + 1.5 * z - R;
        if (pooled) { const f = d < 0 ? 1 : d < 3 ? 0.72 : d < 7 ? 0.46 : d < 12 ? 0.22 : 0; pool[(kind - 3) * 4097 + (B << 6 | A)] = (poolLo + (poolHi - poolLo) * f) * wallK[kind - 3]; continue; }
        const f = x > N || y > N ? 0 : d < 0 ? 1 : d < 2 ? 0.6 : d < 4 ? 0.34 : d < 6 ? 0.17 : d < 9 ? 0.07 : 0;
        pool[(kind - 3) * 4097 + (B << 6 | A)] = f * wallK[kind - 3] * 1.1;
      }
      if (pooled) for (let j = 0; j < 3; j++) pool[j * 4097 + 4096] = poolLo * wallK[j];
    };
    // a window's patch on the room is the room's own tone, lighter and warmer, never burnt out to white
    const winK = windowed && wallK[0] > 0 ? (lightness === 'Pale' ? 0.37 : lightness === 'Mid' ? 0.7 : 1.1) / (2.3 * 1.5 * kS[3] * wallK[0]) : 1;
    // the floor and the two walls in less than full light are shaded as a face is: a shadow on the room is the room's own
    // colour, deeper and a little cooler (PF: how far its colour turns for each step into the dark, as it has at four
    // tenths of full light)
    const PF = new Float32Array(9);
    for (let j = 0; j < 3; j++) { const q = lightAt([wall[j * 3], wall[j * 3 + 1], wall[j * 3 + 2]], 0.4); for (let ch = 0; ch < 3; ch++) PF[j * 3 + ch] = (q[ch] / 0.4 - wall[j * 3 + ch]) / 0.6; }
    const hours = () => {
      hourNo++;
      if (clocked) {
        // the day goes round: sunrise from the right, noon, sunset to the left, dusk, the moon, and round again
        const u = (dayAt += 1 / (30 * dayLen)) % 1;
        let q = 0;
        while (DAY[q + 1][0] < u) q++;
        hourIs(DAY[q], DAY[q + 1], (u - DAY[q][0]) / (DAY[q + 1][0] - DAY[q][0]));
      }
      if (windowed && (hourNo & 7) === 1) {
        // the sun comes in at a window, and its patch drifts across the room: a pane lights the slanted lines that pass through it
        // (its one bar stands upright, so on the walls and the build it never draws a slanted line of dots)
        const wx = M.round((N - winW * 0.6) * (0.5 + 0.5 * M.sin(hourNo * winS + winP)) - winW * 0.2), ws = M.round((2 * N - winH) * (0.5 + 0.5 * M.sin(hourNo * winS * 0.73 + winQ)));
        win.fill(0);
        for (let x = mx(0, wx); x < mn(33, wx + winW); x++) for (let q = mx(0, ws); q < mn(64, ws + winH); q++) if (!(winW >= 6 && x - wx === winW >> 1)) win[x << 6 | q] = 1;
      }
    };
    // one colour of the glow is handed on a step: a cube gives off its own light (or none), a cell of air takes four fifths of the brightest beside it
    // (a glow the build carries by day lights its own faces, not the room: only a light seen at night, or one of
    // shining stuff, reaches the floor and the walls)
    let shineElse = false;
    for (let ci = 1; ci <= count; ci++) if (ci !== glowNo && wispCi.indexOf(ci) < 0 && emC[ci * 3] + emC[ci * 3 + 1] + emC[ci * 3 + 2] > 0) shineElse = true;
    // (what an event brings that shines by itself is a light from now on: set after, so it changes nothing while it is not there)
    for (let j = 0; j < evEm.length; j += 2) { const ci = evEm[j]; selfT[ci] = 0; for (let ch = 0; ch < 3; ch++) emC[ci * 3 + ch] = evEm[j + 1][ch]; }
    const glowStep = () => {
      const ch = glowAt = (glowAt + 1) % 3, A = ch === 0 ? GR : ch === 1 ? GG : GB, fE = flashT > 0 ? [2.6, 2.3, 1.9][ch] * mn(100, flashT * flashT) / 100 : 0;
      let any = fE;
      if (fE) A[flashI] = fE;
      const eE = evLI >= 0 ? evLE[ch] : 0;
      if (eE) { A[evLI] = eE; any = 1; }
      for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0, i = z << 10 | y << 5; x < N; x++, i++) {
        const cc = vox[i];
        if (cc) { const e = emC[cc * 3 + ch]; A[i] = e; if (e > 0) any = 1; continue; }
        let m = x > 0 ? A[i - 1] : 0, q;
        if (x < N - 1 && (q = A[i + 1]) > m) m = q;
        if (y > 0 && (q = A[i - 32]) > m) m = q;
        if (y < N - 1 && (q = A[i + 32]) > m) m = q;
        if (z > 0 && (q = A[i - 1024]) > m) m = q;
        if (z < N - 1 && (q = A[i + 1024]) > m) m = q;
        A[i] = m > 0.03 ? m * 0.79 : 0;      // (a glow too faint to see is none, so the room far from it is not worked out)
      }
      if (fE) A[flashI] = fE;
      if (eE) A[evLI] = eE;
      if (any && glowLive < 60) glowLive = 60;
    };
    // Where it stands: one soft dark patch on the floor under the build and close round it, and on a wall only where
    // the build stands against it. Each plane keeps a level a cell (64 a side): the cubes on it or just over it, the
    // nearer the darker, spread over two cells round; a pixel takes it at the middle of its texel, between the four
    // nearest cells, so the patch steps by texels and not by whole cubes. It is weaker in a pale room. Low suns throw
    // long shadows over the floor. All of it is worked out again only when the cubes near the floor have moved.
    const pF = new Float32Array(4097), pA = new Float32Array(4097), pB = new Float32Array(4097), pT = new Float32Array(4096), fsA = new Uint8Array(4097), fsB = new Uint8Array(4097), fsT = new Uint8Array(4097), fsU = new Uint8Array(4097);
    const lowSun = light === 'Sunrise' || light === 'Sunset', ghost = new Uint8Array(count + 1);
    if (lowSun) { kS[1] = kS[1] && (paint === 'Three Tone' ? 0.26 : 0.65); kS[0] *= 0.6; }      // a low sun falls more on the sides than on the tops: the side it lights is the brightest face
    for (const j of wispCi) ghost[j] = 1;
    for (const j of dryC) if (liqA[j] === 2) ghost[j] = 1;      // (a growth lying over a face throws no shadow)
    let grounded = 0, gWait = 7, fsDirty = 1;
    let aloft = null, hotT = 0, boxMore = null;        // the cubes in the air (set below): they leave no mark where it stands; how long they still glow; what widens the box for them
    let lying = null;                                  // the cubes a blow has thrown that lie where they fell (set below): nor do they
    const firmAt = i => vox[i] && !ghost[vox[i]] && !(aloft && aloft[i]) && !(lying && lying[i]);
    const pale = lightness === 'Pale' ? 0.8 : lightness === 'Mid' ? 0.45 : 0.15;
    const sF = 0.62 * (1 - 0.55 * pale), sW = sF * 0.7, pLim = mn(64, N + 3);
    // how far the floor runs in the picture, for the long shadows
    const fsLim = mn(64, mx(N, ...[[0, 0], [G, 0], [0, G], [G, G]].map(([qx, qy]) => { const a = (qx - eyeX) / (2 * k), b = (qy - eyeY) / k; return fl(mx((a + b) / 2, (b - a) / 2)) + 2; })));
    const patch = (sa, sb, sd, deep, out, kind) => {
      let a0 = 99, b0 = 99, a1 = -1, b1 = -1;
      pT.fill(0);
      for (let b = 0; b < N; b++) for (let a = 0; a < N; a++) for (let d = 0, i = a * sa + b * sb; d < deep; d++, i += sd) if (firmAt(i)) { pT[b << 6 | a] = 1 - d * 0.24; break; }
      // spread over two cells each way (1 4 6 4 1), the edge of the room held as it is
      for (let b = 0; b < pLim; b++) for (let a = 0, o = b << 6; a < pLim; a++) out[o + a] = (pT[o + (a > 1 ? a - 2 : 0)] + 4 * pT[o + (a > 0 ? a - 1 : 0)] + 6 * pT[o + a] + 4 * pT[o + a + 1] + pT[o + a + 2]) * 0.0625;
      for (let b = 0; b < pLim; b++) for (let a = 0; a < pLim; a++) pT[b << 6 | a] = (out[(b > 1 ? b - 2 : 0) << 6 | a] + 4 * out[(b > 0 ? b - 1 : 0) << 6 | a] + 6 * out[b << 6 | a] + 4 * out[(b + 1) << 6 | a] + out[(b + 2) << 6 | a]) * 0.0625;
      for (let b = 0; b < pLim; b++) for (let a = 0; a < pLim; a++) { const o = b << 6 | a, q = mn(1, pT[o] * 1.5); if (ab(out[o] - q) > 0.05) { out[o] = q; if (a < a0) a0 = a; if (a > a1) a1 = a; if (b < b0) b0 = b; if (b > b1) b1 = b; } }
      if (a1 < 0) return;
      // the pixels of that plane round the cells that changed are read again
      let x0 = G, x1 = 0, y0 = G, y1 = 0;
      for (const A of [a0 - 1, a1 + 2]) for (const B of [b0 - 1, b1 + 2]) {
        const qx = eyeX + 2 * k * (kind === 3 ? A - B : kind === 4 ? -A : A), qy = eyeY + (kind === 3 ? k * (A + B) : k * A - 2 * k * B);
        x0 = mn(x0, qx); x1 = mx(x1, qx); y0 = mn(y0, qy); y1 = mx(y1, qy);
      }
      for (let py = mx(0, y0); py < mn(G, y1 + 1); py++) for (let px = mx(0, x0), p = py * G + px; px < mn(G, x1 + 1); px++, p++) if ((vis[p] & 7) === kind && vis[p] >= 0) planeAt(p);
    };
    // how much darker a pixel of the floor or a wall is, read at the middle of its texel; and its creases, the four
    // corners of its cell blended across it
    const planeAt = p => {
      const v = vis[p], kind = v & 7, c2 = lc[p], i3 = v >> 3;
      if (v < 0 || kind < 3) return;
      // (past the room's box a cell has no creases: its corners would be read from the box's edge, a stripe a cell)
      const vb = vbase[p], s1 = ST1[kind], s2 = ST2[kind], o0 = aoL[occ[vb]], o1 = aoL[occ[vb + s1]], o2 = aoL[occ[vb + s2]], o3 = aoL[occ[vb + s1 + s2]], w = uvw[p];
      if (o0 + o1 + o2 + o3 < 4 && (i3 & 127) < 32 && (i3 >> 7 & 127) < 32 && i3 >> 14 < 32) { const fu = (w & 15) + 0.5, fv = (w >> 4) + 0.5; pao[p] = ((o0 * (16 - fu) + o1 * fu) * (16 - fv) + (o2 * (16 - fu) + o3 * fu) * fv) * 0.00390625; } else pao[p] = 1;
      // (and on the floor, the texel right at the foot of a cube standing on it is a clear step darker: a crisp line where it touches)
      let foot = 1;
      if (kind === 3 && (i3 & 127) < N && (i3 >> 7 & 127) < N) { const X = i3 & 127, Y = i3 >> 7 & 127, j = Y << 5 | X; if (((w & 15) * k >> 4) === 0 && X > 0 && firmAt(j - 1) && !liqA[vox[j - 1]] || ((w >> 4) * k >> 4) === 0 && Y > 0 && firmAt(j - 32) && !liqA[vox[j - 32]]) foot = 0.7; }
      if (c2 === 4096 || (c2 & 63) > pLim || c2 >> 6 > pLim) { pdim[p] = foot; return; }
      const F = kind === 3 ? pF : kind === 4 ? pA : pB, A = c2 & 63, B = c2 >> 6;
      const fu = (fl((w & 15) * k / 16) + 0.5) / k - 0.5, fv = (fl((w >> 4) * k / 16) + 0.5) / k - 0.5;
      const a0 = mx(0, fu < 0 ? A - 1 : A), b0 = mx(0, fv < 0 ? B - 1 : B), a1 = mn(63, (fu < 0 ? A - 1 : A) + 1), b1 = mn(63, (fv < 0 ? B - 1 : B) + 1), tu = fu < 0 ? fu + 1 : fu, tv = fv < 0 ? fv + 1 : fv;
      const val = (F[b0 << 6 | a0] * (1 - tu) + F[b0 << 6 | a1] * tu) * (1 - tv) + (F[b1 << 6 | a0] * (1 - tu) + F[b1 << 6 | a1] * tu) * tv;
      pdim[p] = (1 - (kind === 3 ? sF : sW) * val) * foot;
    };
    const standOn = () => {
      grounded = 1;
      patch(1, 32, 1024, 4, pF, 3); patch(32, 1024, 1, 1, pA, 4); patch(1, 1024, 32, 1, pB, 5);
      if (lowSun) { fsDirty = 0; castFloor(); }
    };
    // The shadow on the floor, a cell at a time: under a low sun two cells along for every one up, under any other one
    // along each slanted line. A gap of one cell in it is closed and a lone cell of it dropped, so a solid thing throws
    // a solid shadow with a clean stepped edge.
    const sideA = cast && (clocked || fixed[1] > 0), sideB = cast && (clocked || fixed[2] > 0);   // which suns this light can have
    // (fsChg: the cells of the floor whose shadow has just changed, drawn in full for the next two frames, so a moving
    // shadow never shows half old and half new, in combs)
    const fsPA = new Uint8Array(4097), fsPB = new Uint8Array(4097), fsChg = new Uint8Array(4097);
    let fsNew = 0;
    const castFloor = () => {
      fsPA.set(fsA); fsPB.set(fsB); castFloor0();
      for (let o = 0; o < 4096; o++) fsChg[o] = fsA[o] !== fsPA[o] || fsB[o] !== fsPB[o] ? 1 : 0;
      fsNew = 2;
    };
    const castFloor0 = () => {
      let x0 = 64, x1 = -1, y0 = 64, y1 = -1;
      for (let Y = 0, top = mn(N - 1, bz1); Y < fsLim; Y++) for (let X = 0; X < fsLim; X++) {
        let a = 0, b = 0;
        if (!lowSun) { a = sideA && X < 33 && shade[X << 6 | Y] > 0 ? 1 : 0; b = sideB && Y < 33 && shadeB[Y << 6 | X] > 0 ? 1 : 0; }
        else {
          if (sideA && X < N) for (let j = mx(1, Y - N + 1); !a && j <= Y && (j - 1) >> 1 <= top; j++) a = firmAt((j >> 1) << 10 | (Y - j) << 5 | X) || firmAt(((j - 1) >> 1) << 10 | (Y - j) << 5 | X) ? 1 : 0;
          if (sideB && Y < N) for (let j = mx(1, X - N + 1); !b && j <= X && (j - 1) >> 1 <= top; j++) b = firmAt((j >> 1) << 10 | Y << 5 | (X - j)) || firmAt(((j - 1) >> 1) << 10 | Y << 5 | (X - j)) ? 1 : 0;
        }
        fsA[Y << 6 | X] = a; fsB[Y << 6 | X] = b;
        if (a | b) { if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; }
      }
      // (only round the cells that are in shadow): a lone cell is dropped, then every gap or hole up to two cells across
      // is closed (spread a cell each way, then pulled back a cell each way), so a lattice or a knot throws one shadow
      if (x1 < 0) return;
      const X0 = mx(0, x0 - 2), X1 = mn(fsLim - 1, x1 + 2), Y0 = mx(0, y0 - 2), Y1 = mn(fsLim - 1, y1 + 2);
      for (const F of sideA && sideB ? [fsA, fsB] : sideA ? [fsA] : [fsB]) {
        fsT.set(F);
        for (let Y = Y0; Y <= Y1; Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) if (fsT[o] && !((X > 0 && fsT[o - 1]) | (X < fsLim - 1 && fsT[o + 1]) | (Y > 0 && fsT[o - 64]) | (Y < fsLim - 1 && fsT[o + 64]))) F[o] = 0;
        // (a row at a time and then a column at a time)
        for (let Y = mx(0, Y0 - 1); Y <= mn(fsLim - 1, Y1 + 1); Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) fsU[o] = F[o] | F[X > 0 ? o - 1 : o] | F[X < fsLim - 1 ? o + 1 : o];
        for (let Y = Y0; Y <= Y1; Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) fsT[o] = fsU[o] | fsU[Y > 0 ? o - 64 : o] | fsU[Y < fsLim - 1 ? o + 64 : o];
        for (let Y = mx(0, Y0 - 1); Y <= mn(fsLim - 1, Y1 + 1); Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) fsU[o] = fsT[o] & fsT[X > 0 ? o - 1 : o] & fsT[X < fsLim - 1 ? o + 1 : o];
        for (let Y = Y0; Y <= Y1; Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) F[o] = fsU[o] & fsU[Y > 0 ? o - 64 : o] & fsU[Y < fsLim - 1 ? o + 64 : o];
        // a cell on the shadow's edge (one of the eight round it differs) is marked, and read there between the cells
        for (let Y = Y0; Y <= Y1; Y++) for (let X = X0, o = Y << 6 | X; X <= X1; X++, o++) {
          const f = F[o] & 1;
          for (let dy = -1; dy <= 1 && F[o] < 2; dy++) for (let dx = -1; dx <= 1; dx++) { const q = o + dy * 64 + dx; if (X + dx >= 0 && Y + dy >= 0 && (F[q] & 1) !== f) { F[o] |= 2; break; } }
        }
      }
    };
    // Is a pixel of the floor in a shadow: inside one or out of it, it is as its cell is; on its edge it is read at the
    // pixel's own place between the middles of the four nearest cells, and is in it past half way. So a stepped edge is
    // cut as a run of fine steps along its true line, and a corner is cut across.
    const fsGet = (F, a, b) => a < 0 || b < 0 || a > 63 || b > 63 ? 0 : F[b << 6 | a] & 1;
    const inFs = (F, p) => {
      const c2 = lc[p], f = F[c2];
      if (f < 2) return f;
      const w = uvw[p], A = c2 & 63, B = c2 >> 6, du = ((w & 15) + 0.5) / 16 - 0.5, dv = ((w >> 4) + 0.5) / 16 - 0.5;
      const a0 = du < 0 ? A - 1 : A, b0 = dv < 0 ? B - 1 : B, tu = du < 0 ? du + 1 : du, tv = dv < 0 ? dv + 1 : dv;
      return (fsGet(F, a0, b0) * (1 - tu) + fsGet(F, a0 + 1, b0) * tu) * (1 - tv) + (fsGet(F, a0, b0 + 1) * (1 - tu) + fsGet(F, a0 + 1, b0 + 1) * tu) * tv >= 0.5 ? 1 : 0;
    };
    // and of a wall, under a sun on its own side (S: the slanted lines of that sun; a: along the wall, z: up, both whole
    // cells): read at the pixel's own place, so a shadow's slanted edge runs straight along the line of the light
    // (wall3: for each slanted line along the foot of each wall, the lowest and the highest of the tops on it and the
    // lines either side, set each frame: below the lowest a pixel is surely in the shadow, over the highest surely not)
    const wall3 = new Int8Array(4 * 64);
    const inWall = (S, a, z, p) => {
      const w = uvw[p], ac = a + ((w & 15) + 0.5) / 16, zc = z + ((w >> 4) + 0.5) / 16, s = ac + zc, n = fl(s);
      return (n >= 1 && n <= 64 && S[n - 1] > zc - 1) || (n < 64 && S[n] >= zc - (s - n));
    };
    // the glow on the floor and the walls fades out before the edge of the room's box, past which it does not reach
    const GK3 = [1, kA[1] / kA[0], kA[2] / kA[0]];      // (a glow is taken by each kind of face as the room's light is)
    const glowF = new Float32Array(33).map((_, m) => mx(0, mn(1, (N - 0.5 - m) / 2.5)));
    let clock = 0, sweep = 0, showNo = 0, slow = 0;      // (slow: where in its four seconds the one glint over a shining build is)
    // a print's margin of bare paper, and the build's outline: a pixel of the build beside one of the room, or of the
    // room beside one of the build (so the outline is twice as heavy as the lines inside it)
    const mg = inked ? M.round(G * 0.045) : 0, isB = q => { const w = vis[q]; return w >= 0 && (w & 7) < 3; };
    // a coloured sun tints the build's faces less than it tints the room, so a warm sun on a cool colour warms it
    // without greying it to a brown (the room's light keeps its full colour: shade stays cool)
    const tintK = lowSun ? 0.5 : clocked ? 0.65 : 0.8;
    const liqNo = matter ? 0 : NC + 1, oilNo = liquid === 'Oil' ? wetNo : -1, oE = mn(4, 16 / k), oilRim = [236, 222, 255], waterRim = [214, 240, 255], magmaRim = [255, 236, 150];
    // the light streaks and the lit edge of what runs take (water nearly white, oil a pale lilac, molten rock a pale gold); and the pool at its foot (set below)
    const hiC = liquid === 'Water' ? [232, 248, 255] : liquid === 'Oil' ? [226, 210, 255] : [255, 244, 184], crustC = [66, 34, 28];
    let mereRef = null, mereCapRef = 0;
    // where a fall lands on liquid lying (up to four; found while it runs): the rings run out from there
    const landX = new Float32Array(4), landY = new Float32Array(4), landZ = new Int32Array(4);
    let lands = 0;
    const show = ease => {
      const aR = amb[0] * evDim + evFl[0], aG = amb[1] * evDim + evFl[1], aB = amb[2] * evDim + evFl[2], uR = sun[0] * evDim, uG = sun[1] * evDim, uB = sun[2] * evDim, sA = sunA, sB = sunB, uM = (uR + uG + uB) / 3,
        vR = uM + (uR - uM) * tintK, vG = uM + (uG - uM) * tintK, vB = uM + (uB - uM) * tintK, gk = glowLive > 0 ? glowK : 0, gT = gk > 0 ? 0.05 / gk : 0, gP = gk > 0 && (night > 0.2 || shineElse || inAir || flashT > 0 || evLit), sh = shimT > 0 ? (3 * N + 8) * shimT / 40 - 3 : -99, shim = shimT > 0,
        litK = sA + kA[1] >= sB + kA[2] ? 1 : 2, fClk = liquid === 'Magma' ? clock >> 1 : clock;      // (the side of a fall the light is on, and how far its streaks have run)
      if (!grounded && ++gWait >= 8) { gWait = 0; standOn(); }
      if (cast && !lowSun && fsDirty && showNo % 3 === 0) { fsDirty = 0; castFloor(); }
      if (cast) for (let j = 0; j < 64; j++) for (let h = 0; h < 2; h++) {
        const S = h ? shadeB : shade, a = j ? S[j - 1] : -1, b = S[j], c = j < 63 ? S[j + 1] : -1;
        wall3[h * 128 + j] = mn(a, b, c); wall3[h * 128 + 64 + j] = mx(a, b, c);
      }
      // the moon's rim: the edge texel of a face, where that edge stands against open air on the moon's side
      const fl0 = blowT > 0 ? M.pow(blowT / 12, 1.5) * 0.9 : 0, fX = flashI & 31, fY = flashI >> 5 & 31, fZ = flashI >> 10, fR2 = (flashR + 0.8) ** 2;
      // the ring: a band of cells about a cell wide, running out fast and slowing, fading as it goes
      const rU = ringT > 0 ? 1 - ringT / RING : 0, rOut = 1 + (ringR - 1) * (1 - (1 - rU) * (1 - rU)), rIn2 = mx(0, rOut - 1.1) ** 2, rOut2 = rOut * rOut, rK = ringT > 0 ? 0.25 + 0.75 * ringT / RING : 0;
      const rimK = night > 0.4 ? (night - 0.4) * 1.5 : 0, rimW = 16 - mx(2, 16 / k);
      // the one glint over a shining build: once every four seconds it runs along the top edges from the back to the front
      const gS = bx0 + by0 - 1, gE = bx1 + by1 + bz1 + 2, gU = slow / 72, gF = gU < 1 && bx1 >= 0 ? gS + (gE - gS) * gU * gU * (3 - 2 * gU) : -99;
      // the light a painted cube's edge catches, as so much more than the face it is on: the edge leans half to the top and
      // half to the side, so it takes the room's light of both and the sun's when the sun is on that side
      const aM = (aR + aG + aB) / 3, eT = aM * kA[0] + uM * (sA + sB) * kS[0], eR = aM * (kA[0] + kA[1]) / 2 + uM * (sA * (kS[0] + kS[1]) * 0.75 + sB * kS[0] * 0.7), eL = aM * (kA[0] + kA[2]) / 2 + uM * (sB * (kS[0] + kS[1]) * 0.75 + sA * kS[0] * 0.7);
      if (edgy) for (let kind = 0; kind < 3; kind++) for (let code = 0; code < 6; code++) for (let dr = 0; dr < 3; dr++)
        egM[(kind * 6 + code) * 3 + dr] = EGD[dr] * (code < 4 ? EGC[code] : kind === 0 ? mn(1.6, mx(1.1, (code === 4 ? eR : eL) / eT))
          : mn(2.2, mx(1.3, kind === 1 ? eR / (aM * kA[1] + uM * sA * kS[1]) : eL / (aM * kA[2] + uM * sB * kS[1]))));
      // the floor and the walls change slowly: each frame only every other row of them is worked out again
      // (while a blow's ring runs or its cubes are in the air the floor and the walls are drawn whole every frame)
      const skip = ease < 1 ? (++showNo & 1) : 2, skipK = ringT || inAir || thN || evFull ? 9 : 2, fsK = fsNew > 0 ? fsNew-- : 0;
      for (let p = 0, o = 0, q = 0, px = 0, py = 0; p < G * G; p++, o += 3, q += 4) {
        const v = vis[p];
        if ((py & 1) === skip && (v & 7) > skipK && v >= 0 && v === (who[p] & 0x1fffffff) && !(fsK && (v & 7) === 3 && fsChg[lc[p]])) { if (++px === G) { px = 0; py++; } continue; }
        let r = 0, g = 0, b = 0, lit = 0, glm = 0;
        if (inked) { r = field[0]; g = field[1]; b = field[2]; } else if (hazy) { r = fogC[0]; g = fogC[1]; b = fogC[2]; }
        if (v >= 0) {
          const kind = v & 7, i = v >> 3, pl = kind > 2, x = pl ? i & 127 : i & 31, y = pl ? i >> 7 & 127 : i >> 5 & 31, z = pl ? i >> 14 : i >> 10;
          if (inked) {
            // a print: the tops left as bare paper (the tone where a shadow falls on them), the side to the sun a flat
            // tone, the other side that tone hatched over in the key; the room is the field, its shadows the field
            // overprinted with the key; what runs over it is bare paper cut with key, ripples on top and streaks down a fall
            const dark = cast && (kind === 0 ? shade[x << 6 | (y + z + 1)] > z + 1 : kind === 1 ? shade[(x + 1) << 6 | (y + z)] > z : kind === 3 ? shade[x << 6 | y] > 0 : kind === 4 ? shade[y + z] > z : false);
            const rip = vox[i] === NC + 1 && (kind === 0 ? ((px + 2 * py - (clock >> 2)) & 7) === 0 : px % 3 === 0 && ((py - (clock >> 1)) & 7) !== 0);
            if (rip) lit = 0x10000000;
            const c3 = kind < 3 ? (vox[i] === NC + 1 ? (rip ? inkc : paper) : vox[i] > NC ? paper : kind === 0 ? (dark ? toneC : paper) : kind === 1 ? toneC : (px + 2 * py) % 3 === 0 ? inkc : toneC) : dark && kind !== 5 ? shadowC : field;
            r = c3[0]; g = c3[1]; b = c3[2];
            if (dark) lit ^= 0x20000000;
          } else {
            // the sun or the moon, from the right and from the left (the floor or a wall past the reach of the lines reads
            // the last line, which no cube is ever on; a window's patch falls only on the build and the floor inside the room's box, never up a wall, where it would read as a stray wedge)
            let d = 0, q8 = 0;
            if (sA > 0 && kind !== 2 && kind !== 5) {
              const L = kind === 0 ? x << 6 | (y + z + 1) : kind === 1 ? (x + 1) << 6 | (y + z) : kind === 3 ? (x < 33 && y < 64 ? x << 6 | y : 2112) : y + z < 64 ? y + z : 2112;
              if (!(cast && (kind === 3 ? ((q8 = fsA[lc[p]]) < 2 ? q8 : inFs(fsA, p)) : kind === 4 ? ((q8 = y + z) < 64 && wall3[64 + q8] >= z - 1 && (wall3[q8] > z || inWall(shade, y, z, p))) : shade[L] > (kind === 0 ? z + 1 : z))) && (!windowed || (win[L] && (!pl || (kind === 3 && x < N && y < N))))) {
                d = sA * kS[kind];
                if (rimK && kind < 2 && x < N - 1 && (kind === 0 ? (uvw[p] & 15) >= rimW && !vox[i + 1] : (uvw[p] >> 4) >= rimW && !vox[i + 1024])) d += rimK;
              }
            }
            if (sB > 0 && kind !== 1 && kind !== 4) {
              const L = kind === 0 ? y << 6 | (x + z + 1) : kind === 2 ? (y + 1) << 6 | (x + z) : kind === 3 ? (y < 33 && x < 64 ? y << 6 | x : 2112) : x + z < 64 ? x + z : 2112;
              if (!(cast && (kind === 3 ? ((q8 = fsB[lc[p]]) < 2 ? q8 : inFs(fsB, p)) : kind === 5 ? ((q8 = x + z) < 64 && wall3[192 + q8] >= z - 1 && (wall3[128 + q8] > z || inWall(shadeB, x, z, p))) : shadeB[L] > (kind === 0 ? z + 1 : z)))) {
                d += sB * kS[kind === 2 ? 1 : kind === 5 ? 4 : kind];
                if (rimK && (kind === 0 || kind === 2) && y < N - 1 && (kind === 0 ? (uvw[p] >> 4) >= rimW && !vox[i + 32] : (uvw[p] >> 4) >= rimW && !vox[i + 1024])) d += rimK;
              }
            }
            if (d > 0) lit = 0x20000000;
            if (windowed && kind > 2) d *= winK;
            // the room's own light, dimmer in the creases: the four corners of the face, blended across it (a painted cube
            // has its creases drawn as lines instead, so its faces stay flat)
            let am = kA[kind];
            if (pl) am *= pao[p];
            else if (!edgy) { const vb = vbase[p], s1 = ST1[kind], s2 = ST2[kind], o0 = aoL[occ[vb]], o1 = aoL[occ[vb + s1]], o2 = aoL[occ[vb + s2]], o3 = aoL[occ[vb + s1 + s2]]; if (o0 + o1 + o2 + o3 < 4) { const w = uvw[p], fu = (w & 15) + 0.5, fv = (w >> 4) + 0.5; am *= ((o0 * (16 - fu) + o1 * fu) * (16 - fv) + (o2 * (16 - fu) + o3 * fu) * fv) * 0.00390625; } }
            let lr, lg, lb;
            if (pl) { lr = aR * am + uR * d; lg = aG * am + uG * d; lb = aB * am + uB * d; } else { lr = aR * am + vR * d; lg = aG * am + vG * d; lb = aB * am + vB * d; }
            if (kind < 3) {
              const ci = matter ? pm[p] : vox[i];
              let f = (ci * 3 + kind) << 3, t8 = 0;
              lit |= ci << 20;                         // (a cell that keeps a cube but takes another colour shows another cube)
              if (matter) { const tn = tone[p]; t8 = cyc[ci << 8 | (tn & 7) << 5 | ((tn >> 3) + clock & 31)]; f += t8; }
              f *= 192;
              let run = ci !== liqNo ? 0 : liquid === 'Oil' ? ((((x + y - z) * 3 - clock) & 31) < 6 ? 34 : 0) : ((x + y - z + (clock >> 1)) & 3) === 0 ? 6 : 0;      // a lighter cell in what runs over paint (on oil one soft sheen), moving the way it runs
              const lq = liqA[vox[i]] === 1;
              let hiL = 0;
              if (lq) {
                // liquid: down its sides streaks of light run, and its edge on the side of the light is bright; on a pool
                // glints drift, and a ring runs out where a fall lands
                const w = uvw[p], tu = (w & 15) * k >> 4, tv = (w >> 4) * k >> 4;
                // (a few lanes of each face carry streaks a cube long that run down it unbroken)
                if (kind) {
                  const s1 = kind === 1 ? 32 : 1, e0 = tu === 0 && !liqA[vox[i - s1]], e1 = tu === k - 1 && !liqA[vox[i + s1]];
                  run += liquid === 'Oil' ? 0 : liquid === 'Water' ? (matter ? 15 : 11) : 5;      // (water that falls is clear and lit through)
                  if (((x * 7 + y * 13 + tu * 5 + kind * 3) & 3) === 0 && ((z * k + tv + fClk + x * 5 + y * 3) & 7) < 4) hiL = 0.32;
                  if (e0 || e1) hiL = kind === litK ? (e0 ? 0.6 : 0.36) : 0.22;
                } else if (liquid === 'Water' && vox[i] === wetNo) {
                  // (a pool of water shines: short soft glints in rows over it, drifting slowly)
                  const X = x * k + tu, Y = y * k + tv;
                  if ((Y & 3) === 1 && (X + 3 * (Y >> 2) + (clock >> 2)) % 9 < 2) hiL = 0.3;
                }
                if (kind === 0 && lands) {
                  const fx = x + ((w & 15) * k >> 4) / k + 0.5 / k, fy = y + ((w >> 4) * k >> 4) / k + 0.5 / k, ph = ((sweep >> 1) % 24) / 24;
                  for (let q = 0; q < lands; q++) if (landZ[q] === z) { const d = hyp(fx - landX[q], fy - landY[q]); if (ab(d - 0.35 - (1 - ph) * 2.2) < 0.3 || ab(d - 0.35 - ((1.5 - ph) % 1) * 2.2) < 0.3) { run += 18; break; } }
                }
              }
              if (t8 >= selfT[ci]) { const o3 = f + mn(63, 50 + run) * 3; r = face[o3]; g = face[o3 + 1]; b = face[o3 + 2]; }      // it shines by itself
              else {
                if (z === 0 && kind) { const tv = (uvw[p] >> 4) * k >> 4; if (tv < 2) { const f = tv ? 0.86 : 0.7; lr *= f; lg *= f; lb *= f; } }      // the lowest course is darker where it meets the floor
                // a shining material: now and then a cube catches the light, the catch rolling slowly from the back to the
                // front, its top a step lighter and its sides half a step; a build just finished or mended catches it all
                // over, quickly, from the front to the back (whole faces, so nothing draws a line across them)
                // (and else one slow glint runs along its top edges, and along a line just laid: never a scatter of them)
                if (shim && ab(x + y + z + (gph[i] & 31) * 0.19 - sh) < 1.1) { const e = kind ? 0.13 : 0.26; lr += e; lg += e; lb += e; }
                else if (!kind && ((gleams && gleam[i]) || (glints[ci] && ab(x + y + z - gF) < 0.9))) {
                  const w = uvw[p];
                  glm = ((w & 15) >= 16 - oE && (x === N - 1 || !vox[i + 1])) || ((w >> 4) >= 16 - oE && (y === N - 1 || !vox[i + 32])) ? 0.42 : gleam[i] ? 0.08 : 0;
                }
                // a cube just landed: a dark line round its foot, on its own sides and on the top it stands on
                if (thN) {
                  const w = uvw[p];
                  if (kind) { if (thump[i] && ((w >> 4) * k >> 4) === 0) { const f = 1 - 0.04 * thump[i]; lr *= f; lg *= f; lb *= f; } }
                  else if (z < 31) { const t1 = x > 0 && ((w & 15) * k >> 4) === 0 ? thump[i + 1023] : 0, t2 = y > 0 && ((w >> 4) * k >> 4) === 0 ? thump[i + 992] : 0, tt = t1 > t2 ? t1 : t2; if (tt) { const f = 1 - 0.05 * tt; lr *= f; lg *= f; lb *= f; } }
                }
                if (gk > 0) { const c2 = lc[p], g3 = gk * GK3[kind]; lr += GR[c2] * g3; lg += GG[c2] * g3; lb += GB[c2] * g3; }
                if (fl0 && (x - fX) ** 2 + (y - fY) ** 2 + (z - fZ) ** 2 < fR2) { lr += fl0 * 1.2; lg += fl0 * 1.1; lb += fl0 * 0.95; }      // the faces round a blow flash
                if (rK) { const q = (x - fX) ** 2 + (y - fY) ** 2 + ((z - fZ) * 0.8) ** 2; if (q < rOut2 && q >= rIn2) { lr += rK; lg += rK * 0.95; lb += rK * 0.85; } }      // and its ring runs over them
                if (inAir && aloft[i] && !lie[i]) { lr *= 1.3; lg *= 1.3; lb *= 1.3; }      // a cube in flight catches the light (more of the light it is in, so it keeps its colour)
                if (sparks && spark[i]) { const s = spark[i] * 0.2; lr += s; lg += s; lb += s; }      // a cube just come home
                if (dents && dent[lc[p]]) { lr *= 0.66; lg *= 0.66; lb *= 0.66; }      // the inside of a hole
                // its colour in this much light, tinted by the colour of the light
                // (a painted cube's edge scales the light its face is read at)
                const l = (lr + lg + lb) * 0.33333, le = edgy ? l * egM[(kind * 6 + egT[(kind << 14) | (eg[p] & 255) << 6 | nbr[kind << 15 | i]]) * 3 + (eg[p] >> 8)] : l, o3 = f + mn(63, ((le * 50) | 0) + run) * 3, kq = 1 / (l + 1e-6);
                r = face[o3] * lr * kq; g = face[o3 + 1] * lg * kq; b = face[o3 + 2] * lb * kq;
                if (glm) { r += (252 - r) * glm; g += (248 - g) * glm; b += (238 - b) * glm; glm = 0; }      // (a glint is a paler light, so it shows on a top already in full light)
              }
              if (xOf[ci] === 2 && kind === 0) {
                // a marble (or a crystal of frost) catches the light in a small bright spot on its top, toward the back
                const w = uvw[p], u = w & 15, vv = w >> 4;
                if (u >= 3 && u < 8 && vv >= 3 && vv < 8) { const e = mn(1.12, (lr + lg + lb) * 0.3 + 0.5); r += (255 * e - r) * 0.8; g += (250 * e - g) * 0.8; b += (238 * e - b) * 0.8; }
              }
              if (hotT && inAir && aloft[i] && !lie[i]) { const h = 1 + hotT * 0.009; r *= h; g *= h; b *= h; }      // (a cube just thrown is a little brighter for a moment, and keeps its own colour)
              if (lq && (liquid === 'Oil' || kind === 0)) {
                // liquid catches the light along its edges, where it meets the air or the build (oil on every face, the others on top)
                const w = uvw[p], u = w & 15, vv = w >> 4, s1 = kind === 1 ? 32 : 1, s2 = kind === 0 ? 32 : 1024;
                // (its surface edges brightly; down the sides of a fall only faintly, so a stream does not read as a post)
                const top = (vv >= 16 - oE && !liqA[vox[i + s2]]) || (kind === 0 && vv < oE && !liqA[vox[i - s2]]), m = top ? 0.6 : (u < oE && !liqA[vox[i - s1]]) || (u >= 16 - oE && !liqA[vox[i + s1]]) ? (kind ? 0.28 : 0.6) : 0;
                if (m) { const e = mn(1.3, (lr + lg + lb) * 0.6), rc = liquid === 'Oil' ? oilRim : liquid === 'Water' ? waterRim : magmaRim; r += (rc[0] * e - r) * m; g += (rc[1] * e - g) * m; b += (rc[2] * e - b) * m; }
              }
              if (hiL) { const e = mn(1.25, (lr + lg + lb) * 0.5 + 0.3); r += (hiC[0] * e - r) * hiL; g += (hiC[1] * e - g) * hiL; b += (hiC[2] * e - b) * hiL; }
              // molten rock lying at the foot crusts over toward its rim: dark plates, the heat showing between them
              // (any pool of it crusts at its rim, where it meets what it lies on; the pool at the foot by how far it has crept)
              if (lq && kind === 0 && liquid === 'Magma' && vox[i] === wetNo) {
                const w = uvw[p], X = x * k + ((w & 15) * k >> 4), Y = y * k + ((w >> 4) * k >> 4), bl = h3(X >> 1, Y >> 1, 9) & 7;
                const rim = (x > 0 && liqA[vox[i - 1]] ? 0 : 1) + (x < N - 1 && liqA[vox[i + 1]] ? 0 : 1) + (y > 0 && liqA[vox[i - 32]] ? 0 : 1) + (y < N - 1 && liqA[vox[i + 32]] ? 0 : 1);
                const dd = z === 0 && mereRef && mereRef[i] < 99 ? mereCapRef - mereRef[i] : -1;
                if (dd >= 0 ? (dd < 0.9 ? bl > 3 : dd < 2 && bl === 0) : rim > 1 ? bl > 4 : rim && bl === 0) { const e = mn(1.2, (lr + lg + lb) * 0.33 + 0.3); r = crustC[0] * e; g = crustC[1] * e; b = crustC[2] * e; }
              }
            } else {
              const w = (kind - 3) * 3, m = pool ? pool[(kind - 3) * 4097 + lc[p]] : wallK[kind - 3], wv = tiled && ((kind === 3 ? (x >> 1) + (y >> 1) : kind === 4 ? (y >> 1) + (z >> 1) : (x >> 1) + (z >> 1)) & 1) ? weave : 1;
              lr *= m; lg *= m; lb *= m;
              if (thN && kind === 3 && x < N && y < N) { const w = uvw[p], j = y << 5 | x, t1 = x > 0 && ((w & 15) * k >> 4) === 0 ? thump[j - 1] : 0, t2 = y > 0 && ((w >> 4) * k >> 4) === 0 ? thump[j - 32] : 0, tt = t1 > t2 ? t1 : t2; if (tt) { const f = 1 - 0.05 * tt; lr *= f; lg *= f; lb *= f; } }      // (round the foot of a cube just landed on the floor)
              if (rK && kind === 3) { const q = (x - fX) ** 2 + (y - fY) ** 2 + ((z - fZ) * 0.8) ** 2; if (q < rOut2 && q >= rIn2) { const e = rK * 0.7; lr += e; lg += e * 0.95; lb += e * 0.85; } }
              if (gP && x < N && y < N && z < N && GR[z << 10 | y << 5 | x] + GG[z << 10 | y << 5 | x] + GB[z << 10 | y << 5 | x] > gT) {      // (a glow too faint to show on the room is passed over)
                // the glow is read at the middle of the texel, between the four nearest cells of air along the plane, so it
                // steps by texels and not by whole cubes
                const c2 = z << 10 | y << 5 | x, gw = gk * 0.6 * glowF[mx(x, y, z)], w = uvw[p], fu = (fl((w & 15) * k / 16) + 0.5) / k - 0.5, fv = (fl((w >> 4) * k / 16) + 0.5) / k - 0.5;
                const i1 = kind === 4 ? y : x, i2 = kind === 3 ? y : z, s1 = kind === 4 ? 32 : 1, s2 = kind === 3 ? 32 : 1024;
                const d1 = fu < 0 ? (i1 > 0 ? -s1 : 0) : i1 < N - 1 ? s1 : 0, d2 = fv < 0 ? (i2 > 0 ? -s2 : 0) : i2 < N - 1 ? s2 : 0, t1 = ab(fu), t2 = ab(fv);
                const q1 = t1 * (1 - t2) * gw, q2 = (1 - t1) * t2 * gw, q3 = t1 * t2 * gw, q0 = gw - q1 - q2 - q3, e1 = c2 + d1, e2 = c2 + d2, e3 = e1 + d2;
                lr += GR[c2] * q0 + GR[e1] * q1 + GR[e2] * q2 + GR[e3] * q3; lg += GG[c2] * q0 + GG[e1] * q1 + GG[e2] * q2 + GG[e3] * q3; lb += GB[c2] * q0 + GB[e1] * q1 + GB[e2] * q2 + GB[e3] * q3;
              }
              // the patch where it stands darkens the light, not the colour; and in less than full light the room is its own
              // colour deeper, never a grey
              if (!hazy) { const gd = d > 0 ? pdim[p] : 0.5 + 0.5 * pdim[p]; lr *= gd; lg *= gd; lb *= gd; }      // (half as dark in a shadow, which is dark already)
              const l = (lr + lg + lb) * 0.33333;
              // (and the deeper it is, the less the colour of the room's light tints it, so a cool light does not grey a warm floor;
              // but under a low sun, whose violet the room's own colour is already turned against, it keeps all of it)
              if (l < 1) { const q = 1 - l, t = 1 - l * 1.3; if (t > 0 && !lowSun) { lr += (l - lr) * t; lg += (l - lg) * t; lb += (l - lb) * t; } r = (wall[w] + PF[w] * q) * lr; g = (wall[w + 1] + PF[w + 1] * q) * lg; b = (wall[w + 2] + PF[w + 2] * q) * lb; }
              else { r = wall[w] * lr; g = wall[w + 1] * lg; b = wall[w + 2] * lb; const top = r > g ? (r > b ? r : b) : g > b ? g : b; if (top > 232) { const f = (232 + (top - 232) * 0.3) / top; r *= f; g *= f; b *= f; } }
              if (wv !== 1) { r *= wv; g *= wv; b *= wv; }      // (a tiled room's second tone is laid on the colour, so it shows as clearly in the dark)      // (a strong light on a pale room keeps its colour, never burns to white)
            }
            if (hazy) { const f = kind > 2 ? 0.84 : haze[x + y + z + 1], w = kind > 2 ? (kind - 3) * 3 : 0; r += (fogW[w] - r) * f; g += (fogW[w + 1] - g) * f; b += (fogW[w + 2] - b) * f; }
            if (pl && hazy) { const gd = pdim[p]; r *= gd; g *= gd; b *= gd; }
          }
        }
        let line = false;
        if (inked) {
          // a line wherever the flat face changes: the build's outline heavy, its inner edges and the room's fine
          if (px < mg || py < mg || px >= G - mg || py >= G - mg) { r = paper[0]; g = paper[1]; b = paper[2]; }
          else {
            const fp = flat[p], me = v >= 0 && (v & 7) < 3;
            line = (px > 0 && fp !== flat[p - 1]) || (py > 0 && fp !== flat[p - G]);
            const out = (line || (px < G - 1 && fp !== flat[p + 1]) || (py < G - 1 && fp !== flat[p + G])) && px > 0 && px < G - 1 && py > 0 && py < G - 1 && (isB(p - 1) !== me || isB(p + 1) !== me || isB(p - G) !== me || isB(p + G) !== me);
            line = line || out;
            if (line) { const c3 = out || me ? inkc : ruleC; r = c3[0]; g = c3[1]; b = c3[2]; }
          }
        }
        const id = (line ? v ^ 0x40000000 : v) ^ lit;      // (a shadow coming or going is a change of what it shows, too: shadows are hard)
        if (id !== who[p]) {
          // it shows another cube, or the room: at once, and a cube just set (not one in the air) a step dimmer, or one
          // that has just settled into its place with a glint on its top
          const fr = v >= 0 && (v & 7) < 3 && !(aloft && aloft[v >> 3]) ? fresh[v >> 3] : 0, dm = fr === 1 ? 0.84 : fr === 2 && !(v & 7) ? 1.2 : 1;
          who[p] = id; d8[q] = shown[o] = r * dm; d8[q + 1] = shown[o + 1] = g * dm; d8[q + 2] = shown[o + 2] = b * dm;
        } else { d8[q] = shown[o] += (r - shown[o]) * ease; d8[q + 1] = shown[o + 1] += (g - shown[o + 1]) * ease; d8[q + 2] = shown[o + 2] += (b - shown[o + 2]) * ease; }
        d8[q + 3] = 255;
        if (++px === G) { px = 0; py++; }
      }
      // the puff a landing throws: a pixel of the room's light flicked out from each of the cube's two near corners over
      // what it came down on, a pixel further and fainter each tick (drawn over the picture, and drawn afresh after)
      if (thN && !inked) {
        const aM2 = mx(aR, aG, aB) || 1, pc0 = 255 * aR / aM2, pc1 = 250 * aG / aM2, pc2 = 240 * aB / aM2;
        for (let q = 0; q < thN; q++) {
          const j = thL[q], a = 6 - thump[j];
          if (a > 3 || !puffs[j]) continue;
          const x = j & 31, y = j >> 5 & 31, z = j >> 10, al = 0.5 - a * 0.12, py = fl(eyeY + k * (x + y + 1) - 2 * k * z) + (a >> 1);
          for (let s = -1; s <= 1; s += 2) {
            const px = fl(eyeX + 2 * k * (x - y + s)) + (s > 0 ? a : -1 - a);
            if (px < 0 || px >= G || py < 0 || py >= G) continue;
            const p = py * G + px, v = vis[p];
            if (v < 0 || !((v & 7) === 3 ? z === 0 : (v & 7) === 0 && (v >> 13) === z - 1)) continue;      // (only where it shows what the cube came down on)
            const q4 = p * 4;
            d8[q4] += (pc0 - d8[q4]) * al; d8[q4 + 1] += (pc1 - d8[q4 + 1]) * al; d8[q4 + 2] += (pc2 - d8[q4 + 2]) * al;
            who[p] = -3;
          }
        }
      }
      if (evDraw) evDraw();                            // (and what an event draws over the picture)
      if (anyFresh) { fresh.fill(0); anyFresh = 0; }
      cx2.putImageData(img, 0, 0);
      c.ctx.imageSmoothingEnabled = false;
      c.ctx.drawImage(cv, 0, 0, c.size, c.size);
    };

    // ================= the builder: from the cubes standing to the next plan, in order =================
    let opI = new Int32Array(4096), opC = new Uint8Array(4096), opU = new Float32Array(4096), ops = 0, opAt = 0, span = 1, spent = 0;
    const byKey = (p, q) => keyBuf[p] - keyBuf[q];
    // the beat each cube of a sorted list goes in (written into out from at): a new line starts a new beat once `lines`
    // lines are in the one before, and no beat takes more than `per` cubes; how many beats that makes
    let beatB = new Int32Array(4096);
    const beatsOf = (list, per, lines, out, at) => {
      let n = -1, g = -1, c = per, l = lines;
      for (let q = 0; q < list.length; q++) {
        const h = fl(ab(keyBuf[list[q]]) / 32);
        if (h !== g) { g = h; if (++l > lines) { l = 1; c = per; } }
        if (c >= per) { n++; c = 0; }
        c++;
        if (out) out[at + q] = n;
      }
      return n + 1;
    };
    // a line a beat, cut into as few cubes a beat as fit in `most` beats; or, if lines alone are too many, two or more lines a beat
    const layIn = (list, most, out, at) => {
      if (!list.length) return 0;
      let lines = 1, per = 1e9;
      const whole = beatsOf(list, per, 1);
      if (whole > most) { lines = mx(2, fl(whole / most)); while (beatsOf(list, per, lines) > most) lines++; }
      else { let a = 1, b = list.length; while (a < b) { const m = (a + b) >> 1; if (beatsOf(list, m, 1) <= most) b = m; else a = m + 1; } per = a; }
      return beatsOf(list, per, lines, out, at);
    };
    // style: the order cubes go up in (a style of keyFor, or a key of the cell's own, when what comes down goes in
    // just the reverse). sweep: the old and the new trade places in one pass in that order, a line rising through the
    // build with the new under it and the old over it, so it is a whole form at every moment
    const shiftTo = (next, seconds, style, sweep) => {
      const rem = [], add = [], TC = next.col, own = typeof style === 'function', kk = moving ? keyFor : layKey, kf = own ? style : i => kk(style === undefined ? methodNo : style, i);
      if (next.part) { T = next.part; O = next.grew; }      // the keys below read the parts and growth order of the plan being built
      for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = z << 10 | y << 5 | x, want = TC[i];
        if (vox[i] === want || (!want && !moving && (liqA[vox[i]] || (motion === 'Settling' && vox[i] === flakeNo)))) continue;
        if (want) { add.push(i); keyBuf[i] = kf(i); } else { rem.push(i); keyBuf[i] = sweep ? kf(i) : own ? -kf(i) : -kk(undoNo, i); }
      }
      rem.sort(byKey); add.sort(byKey);
      ops = rem.length + add.length; opAt = 0; spent = 0;
      if (ops > opI.length) { opI = new Int32Array(ops + 1024); opC = new Uint8Array(ops + 1024); opU = new Float32Array(ops + 1024); beatB = new Int32Array(ops + 1024); }
      if (!moving && !sweep) {
        // a build that stands changes in beats, one every other tick: a line of it (a row, a ring, a column), or a few
        // cubes of one, laid down at a time, as few at a time as let the change be done in its time (a big change
        // takes longer, and lays a whole line a beat, or two lines)
        const most = fl(mx(4, mn(14, 2.5 + ops / 120)) * 15), both = rem.length && add.length;
        const nR = layIn(rem, most, beatB, 0), off = both ? M.round(nR * 0.25) : 0, nA = layIn(add, most, beatB, rem.length), B = mx(nR, off + nA, 1);
        let a = 0, b = 0;
        for (let o = 0; o < ops; o++) {
          const ta = a < rem.length ? beatB[a] : 1e9, tb = b < add.length ? off + beatB[rem.length + b] : 1e9;
          if (ta <= tb) { opI[o] = rem[a++]; opC[o] = 0; opU[o] = (ta + 0.25) / B; } else { opI[o] = add[b]; opC[o] = TC[add[b++]]; opU[o] = (tb + 0.25) / B; }
        }
        span = B / 15;
        return;
      }
      // else the new goes up while the old comes down, the taking away a little ahead, so most of a build stands throughout
      const both = rem.length && add.length, cut = sweep ? 1 : both ? 0.75 : 1, from = sweep || !both ? 0 : 0.2;
      let a = 0, b = 0;
      for (let o = 0; o < ops; o++) {
        const ua = a < rem.length ? sweep ? keyBuf[rem[a]] : (a + 0.5) / rem.length * cut : 1e12, ub = b < add.length ? sweep ? keyBuf[add[b]] : from + (b + 0.5) / add.length * (1 - from) : 1e12;
        if (ua <= ub) { opI[o] = rem[a++]; opC[o] = 0; opU[o] = sweep ? (o + 0.5) / ops : ua; } else { opI[o] = add[b]; opC[o] = TC[add[b++]]; opU[o] = sweep ? (o + 0.5) / ops : ub; }
      }
      span = seconds > 0 ? seconds : mx(4, mn(16, 3 + ops / 450));
    };
    const home = plan(0), plans = [home], empty = { col: new Uint8Array(32768), part: null, grew: null };
    // a build is never taken down whole, and never in a scatter: a clean part of it comes down, a sixth to a quarter of
    // it, and goes up again just as it came down, in reverse. Mostly its top is peeled off a course at a time (each
    // course row by row); else one side, a slice at a time from the outside in
    let cycle = 0;
    const gapOf = (whole, no) => {
      const r = h3(lo >>> 0, hi >>> 0, 60 + no), kind = (r & 3) < 3 ? 0 : 1, side = r >> 4 & 3, list = [], sc = keyBuf;
      const key = kind === 0 ? i => keyFor(1, i) : i => { const x = i & 31, y = i >> 5 & 31, z = i >> 10; return [x, y, N - 1 - x, N - 1 - y][side] * 1024 + z * 32 + (side & 1 ? x : y); };
      let all = 0, c0 = 99, c1 = -1;
      for (let i = 0; i < 32768; i++) if (whole.col[i]) { all++; sc[i] = key(i); list.push(i); c0 = mn(c0, sc[i] >> 10); c1 = mx(c1, sc[i] >> 10); }
      list.sort((p, q) => sc[q] - sc[p]);
      const col = whole.col.slice(), want = all * (0.16 + (r >> 8 & 15) * 0.006), most = all * 0.3, deepest = c1 - mx(1, M.round((c1 - c0 + 1) * 0.3));
      // whole courses or slices come away, unless that would take too much of it (or more than three tenths of its height
      // or its width: a tall thin thing loses its top, not itself)
      for (let q = 0; q < list.length; q++) { const s = sc[list[q]] >> 10; if (s <= deepest || (q >= want && (s !== sc[list[q - 1]] >> 10 || q >= most))) break; col[list[q]] = 0; }
      return { col, part: whole.part, grew: whole.grew, spr: whole.spr, gap: true, key };
    };
    // A build that changes grows out of itself, and goes back the way it grew: a tier rises on its top, a course at a
    // time from the middle out, each drawn in from the one under it (a thin top rises as it is, as a spire grows);
    // or, where there is no room over it, a low wing reaches out from its side toward the eye, a cell at a time. What
    // grows is made of what it grows from. (kArr: the order every added cube came in, over all the growths so far)
    const grow = (was, no) => {
      const r = h3(lo >>> 0, hi >>> 0, 120 + no), col = was.col.slice(), part = was.part ? was.part.slice() : null, grew = was.grew ? was.grew.slice() : null, kArr = was.kArr ? was.kArr.slice() : new Float32Array(32768);
      let x1 = -1, y1 = -1, z1 = -1, added = 0, sx = 0, sy = 0, sn = 0;
      for (let i = 0; i < 32768; i++) if (col[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10; if (x > x1) x1 = x; if (y > y1) y1 = y; if (z > z1) z1 = z; }
      if (z1 < 0) return null;
      for (let i = z1 << 10, e = i + 1024; i < e; i++) if (col[i]) { sx += i & 31; sy += i >> 5 & 31; sn++; }
      const cx = sx / sn, cy = sy / sn, base = (no + 1) * 4096, up = N - 1 - z1, roomX = N - 2 - x1, roomY = N - 2 - y1;
      // the order a course of it is laid in, by the build's own order: ring by ring from the middle out, each ring laid
      // round, when it goes outward or grows; along the diagonal when swept; else row by row (back and forth when printed)
      const course = (x, y) => methodNo === 3 || methodNo === 4 ? mn(60, fl(hyp(x - cx, y - cy) * 2)) + (M.atan2(y - cy, x - cx) / TAU + 0.5) * 0.99
        : methodNo === 2 ? x + y + x / 64 : y + (methodNo === 1 && y & 1 ? 31 - x : x) / 32;
      const add = (i, from, ord) => { if (col[i]) return; col[i] = col[from]; if (part) part[i] = part[from]; if (grew) grew[i] = grew[from]; kArr[i] = base + ord; added++; };
      const tier = low => {
        // on its top, or (where that meets the ceiling, or is only a point) on the highest of its lower tops, and then
        // never higher than its top
        let cur = [], zt = z1;
        if (low || !up) for (zt = z1 - 1; zt >= 0; zt--) { cur = []; for (let i = zt << 10, e = i + 1024; i < e; i++) if (col[i] && !col[i + 1024]) cur.push(i); if (cur.length >= 6) break; }
        else for (let i = z1 << 10, e = i + 1024; i < e; i++) if (col[i]) cur.push(i);
        if (zt < 0) return;
        const H = mn(low || !up ? z1 - zt : up, 1 + (r >>> 4) % 3), most = cubes * 0.22;
        for (let h = 1; h <= H && added < most; h++) {
          // drawn in by a cell all round (two on a broad top), so it steps up like a tier, not a box on a box; a thin
          // top (a wall, a spire) rises as it is
          let nxt = cur;
          for (let e = cur.length > 90 ? 2 : 1; e > 0; e--) { const has = new Set(nxt); nxt = nxt.filter(i => has.has(i - 1) && has.has(i + 1) && has.has(i - 32) && has.has(i + 32)); }
          if (nxt.length < 2) { if ((h > 1 && cur.length > 8) || cur.length < 2) break; nxt = cur; }
          for (const i of nxt) add(i + 1024, i, h * 64 + course(i & 31, i >> 5 & 31));
          cur = nxt.map(i => i + 1024);
        }
      };
      const wing = () => {
        // out from whichever open side has the room, as long as the side is deep and half as high as the build
        const alongX = roomX >= 2 && (roomY < 2 || roomX > roomY || (roomX === roomY && r & 64)), L = mn(alongX ? roomX : roomY, 2 + (r >>> 8) % 3), zc = mx(0, M.round(z1 * 0.45)), e1 = alongX ? x1 : y1, st = alongX ? 1 : 32;
        if (L < 2) return;
        for (let z = 0; z <= zc; z++) for (let a = 0; a < N; a++) {
          // the side as the eye sees it from out there: the nearest cube of its outer two slices
          let from = -1;
          for (let d = 0; d < 2 && from < 0; d++) { const j = alongX ? z << 10 | a << 5 | (e1 - d) : z << 10 | (e1 - d) << 5 | a; if (e1 - d >= 0 && col[j]) from = j; }
          if (from < 0) continue;
          const j0 = alongX ? z << 10 | a << 5 | e1 : z << 10 | e1 << 5 | a;
          // (each cell of it stands on the floor or on the wing under it: nothing of it hangs in the air)
          for (let d = 1; d <= L; d++) { const j = j0 + d * st; if (z && !col[j - 1024]) break; add(j, from, d * 64 + z); }
        }
      };
      if (roomX < 2 && roomY < 2 || (r & 3) !== 0) { tier(); if (added < mx(12, cubes * 0.02)) tier(true); if (added < 3) wing(); } else { wing(); if (added < 8) tier(); }
      if (added < 3) return null;
      return { col, part, grew, spr: was.spr, grown: true, kArr, key: i => kArr[i] };
    };
    // the first plan is already standing when the piece opens
    for (let i = 0; i < 32768; i++) if (home.col[i]) setCube(i, home.col[i]);
    marked.fill(1); markLo = 0; markHi = G;
    look(); poolUp();
    hours();
    if (glowLive) for (let q = 0; q < 36; q++) glowStep();
    show(1);
    // cubes on their way down: [cell it is bound for, its colour, the height it is shown at now (or -1), how far over its
    // place it starts, the beats it has been falling, the beats its fall takes]; and cubes taken away, shown a cell over
    // where they stood for a beat: [the cell, 0, the height it is shown at, beats left]
    // (one dropped from a height hangs there a moment and comes down faster and faster, and all that went in one beat
    // land together on one beat, whatever height each fell from)
    const falling = [], shownAs = new Uint8Array(32768), dropped = arrival === 'Dropped', downs = [];
    const fallIn = (i, col) => falling.push(dropped ? [i, col, -1, 2 + i * 7 % 3, 0, 4] : [i, col, -1, 1, 0, 1]);
    let rowZ = -1, rowNo = 0;
    const fall = from => {
      downs.length = 0;
      for (let f = falling.length - 1; f >= from; f--) {
        const d = falling[f], x = d[0] & 31, y = d[0] >> 5 & 31, zt = d[0] >> 10;
        if (!d[1] && d[3]-- > 0) continue;
        // take its picture off the cell it was shown in, unless a real cube has been set there since
        if (d[2] >= 0) { const j = d[2] << 10 | y << 5 | x; if (shownAs[j]) { shownAs[j] = 0; setCube(j, 0); } d[2] = -1; }
        if (!d[1]) { falling.splice(f, 1); continue; }
        const t = d[4]++, T = d[5];
        // it lands, and its top catches the light for a moment
        if (t >= T) { shownAs[d[0]] = 0; setCube(d[0], d[1]); fresh[d[0]] = 2; anyFresh = 1; downs.push(d[0]); falling.splice(f, 1); continue; }
        const z = zt + d[3] - fl(d[3] * t * t / (T * T)), j = z << 10 | y << 5 | x;
        if (z < N && !vox[j]) { setCube(j, d[1]); shownAs[j] = 1; d[2] = z; }
      }
      if (!downs.length) return;
      // what came down together: a mark round each foot, a glint that runs along them in the order they were laid, and one
      // soft tap, a step higher for each line of a layer and back to the bottom with the next layer
      const z0 = downs[downs.length - 1] >> 10;
      if (z0 !== rowZ) { rowZ = z0; rowNo = 0; } else rowNo++;
      for (let q = downs.length - 1, n = 0; q >= 0; q--, n++) landed(downs[q], n, q === 0 || n === 0);      // (a puff only at the two ends of the line)
      ping(downs[downs.length - 1], 0.07, rowNo);
    };
    // a note for a cube set down, short and soft, a tap more than a ring: higher cubes tap higher (heard only after Unmute)
    const voice = /Gold|Copper|Steel|Chrome|Metals|Rusted|Glass|Gems|Ice|Treasury|Obsidian|Bismuth|Lumen|Jade|Lapis|Opal|Geode|Saltpan/.test(matter) ? 'sine' : matter ? 'square' : 'triangle';
    let rang = 0;
    const DX = [1, -1, 0, 0], DY = [0, 0, 1, -1], STEP = [1, -1, 32, -32], far = [0, 0, 0, 0];
    // (a line landing taps on every beat, a step up the scale for each line of its layer, so a layer is heard filling)
    const ping = (i, vel, row) => {
      if (rang > 0 || !c.sound) return;
      rang = row === undefined ? 3 : 1;
      const z = i >> 10, s = row === undefined ? z : row % 10;
      c.sound.note(root + [0, 2, 4, 7, 9][s % 5] + 12 * (row === undefined ? fl(z / 5) % 3 : fl(s / 5)), { dur: voice === 'sine' ? 0.24 : 0.07, vel, wave: voice, pan: mx(-1, mn(1, ((i & 31) - (i >> 5 & 31)) / N)), cutoff: voice === 'square' ? 760 : 2000 });
    };

    // ================= while it stands: its motion, what runs over it, and the pointer =================
    // Every cell of the room looks back to a cell of the standing plan (back): turned about the middle, slid
    // layer by layer, or lifted column by column. On top of the plan lie the marks of the pointer (edit: -1 where
    // a cube has been knocked out of its place, a colour where one lies that fell there), whatever is running
    // over it or settling on it (wet), and, in the room's own space, the cubes that are in the air (fly).
    // (ov: sand, marbles or a growth lying in a cell of the plan's space, by its colour; own: which of them it is)
    const ov = new Uint8Array(32768), own = new Uint8Array(32768);
    const edit = new Int16Array(32768), wet = new Uint8Array(32768), fly = new Uint8Array(32768), listed = new Uint8Array(32768), seenAt = new Int32Array(32768);
    aloft = fly; lying = new Uint8Array(32768);
    // what an event lays over it: a colour (or 255, none) on a cube of the plan (evP), things in the plan's air (evQ),
    // and things in the room's own air (evR)
    const evOn = event !== 'None', evP = new Uint8Array(evOn ? 32768 : 1), evQ = new Uint8Array(evOn ? 32768 : 1), evR = new Uint8Array(evOn ? 32768 : 1);
    const mere = new Uint8Array(1024);                 // the pool at its foot, in the room's own space (see below)
    const wl = new Int32Array(3200), fedBuf = new Uint8Array(3200), sl = new Int32Array(1600), chI = new Int32Array(32768), chV = new Uint8Array(32768);
    const lift = new Int8Array(1024), cosL = new Float32Array(32).fill(1), sinL = new Float32Array(32), slX = new Int8Array(32), slY = new Int8Array(32);
    // a thing that is the same all the way round shows nothing when it turns or twists: it heaves, pumps or sways instead
    if ((motion === 'Turning' || motion === 'Twisting') && !moving) {
      let all = 0, miss = 0;
      const ca = M.cos(0.5), sa = M.sin(0.5), hm = N / 2;
      for (let i = 0; i < 32768; i++) if (home.col[i]) {
        const dx = (i & 31) + 0.5 - hm, dy = (i >> 5 & 31) + 0.5 - hm, x = fl(hm + dx * ca - dy * sa), y = fl(hm + dx * sa + dy * ca);
        all++; if (x < 0 || y < 0 || x >= N || y >= N || !home.col[(i >> 10) << 10 | y << 5 | x]) miss++;
      }
      if (miss < all * 0.16) { motion = ['Heaving', 'Pumping', 'Swaying'][h3(hi >>> 0, lo >>> 0, 41) % 3]; c.trait('Motion', motion); }
    }
    const spins = motion === 'Turning' || motion === 'Twisting';
    // a build that has no springs of its own seeps now and then, each in its own way: a trickle from the top, a sheet
    // over one edge, a leak from a crack in a side, or a slow drip; some often, some seldom, so some stay dry a long while
    const seep = !moving && motion !== 'Flooding' && !dry, seepH = h3(lo >>> 0, hi >>> 0, 43), seepKind = seepH % 4, seepWet = [100, 100, 90, 75][seepH >> 2 & 3];
    const seepP = 14 + (seepH >> 4) % 12, seep0 = 1 + (h3(hi >>> 0, lo >>> 0, 47) % 40) / 10, seepX = (seepH >> 8) % 4;
    let seepOn = false, rises = 0;
    const wr = stream((lo ^ 0x2545f491) >>> 0 || 3, (hi + 0x6c8e9cf5) >>> 0 || 4);
    // a small room is moved less: one cube is already a lot of it
    const hvAmp = mn(hvA, N < 13 ? 1 : N < 22 ? 2 : 3), swAmp = N < 12 ? 1 : swA;
    const hvK = TAU / (N * hvLam), pumpB = mx(1, M.round(N / pumpDiv)), flakes = mx(1, M.round(N * N / 500)), melt = flakes / (0.5 * N * N);
    // how thick the liquid is: water runs a cell every few ticks, oil half as fast, molten rock slower still
    const thick = liquid === 'Water' ? 1 : liquid === 'Oil' ? 2 : 3.2, every = mx(2, M.round(thick * 80 / N)), reach = N < 12 ? 2 : liquid === 'Water' ? 4 : 3;
    const stand = motion === 'Turning' ? TAU / ab(spinW) : motion === 'Twisting' ? TAU / twW : motion === 'Scanning' ? TAU / scW : motion === 'Flooding' ? standFor * (0.7 + 0.3 * thick) : standFor;
    let amp = 0, rest = 0, now = home, tau = 0, zTop = 1, c0 = 0, c1 = 0, cMin = 0, clipAt = 99, springs = [], wn = 0, sn = 0, touched = false, edits = 0, tickNo = 0;
    const back = (x, y, z) => {
      z -= lift[y << 5 | x]; if (z < 0) z = 0;
      if (spins) { const dx = x + 0.5 - N / 2, dy = y + 0.5 - N / 2; x = fl(N / 2 + dx * cosL[z] + dy * sinL[z]); y = fl(N / 2 - dx * sinL[z] + dy * cosL[z]); }
      else { x -= slX[z]; y -= slY[z]; }
      return x < 0 || y < 0 || x >= N || y >= N ? -1 : z << 10 | y << 5 | x;
    };
    const calm = () => { lift.fill(0); cosL.fill(1); sinL.fill(0); slX.fill(0); slY.fill(0); clipAt = 99; };
    const cut = s => clipAt < 99 && (scAxis === 0 ? s & 31 : scAxis === 1 ? s >> 5 & 31 : scAxis === 2 ? s >> 10 : (s & 31) + (s >> 5 & 31)) >= clipAt;
    // in the plan's own space: is a cube here (the plan's, unless it has been knocked out, or one lying where it fell)
    const firm = j => { const e = edit[j]; return e > 0 || (e === 0 && now.col[j] !== 0); };
    const open = j => !wet[j] && !firm(j);
    const mark = (s, v) => { if (!edit[s]) { if (v) edits++; } else if (!v) edits--; edit[s] = v; };
    // what a cell of the room should be showing now
    const due = i => {
      const s = back(i & 31, i >> 5 & 31, i >> 10);
      if (s < 0 || cut(s)) return fly[i] || (evOn && evR[i]) || (i < 1024 && mere[i] ? wetNo : 0);
      const e = edit[s], w = wet[s];
      let v = e < 0 ? 0 : e || now.col[s];
      if (v && evOn && !e && evP[s]) v = evP[s] === 255 ? 0 : evP[s];
      return v || (w ? (w === 16 || w === 17 ? flakeNo : w === 13 ? fallNo : wetNo) : ov[s] || (evOn && evQ[s]) || fly[i] || (evOn && evR[i]) || (i < 1024 && mere[i] ? wetNo : 0));
    };
    // is a cell of the room taken by something a flying cube cannot pass: a wall, the floor, a cube
    const hard = (x, y, z) => {
      if (x < 0 || y < 0 || z < 0 || x >= N || y >= N || z >= N) return true;
      const s = back(x, y, z);
      return s >= 0 && firm(s) && !cut(s);
    };
    // a build has just come to stand: measure it for its motion, and find it its springs
    const rise = () => {
      tau = 0; zTop = 1; c0 = 99; c1 = -1; springs = [];
      if (!moving && now !== empty && !now.gap) { shimT = 40; if (tickNo > 2 && c.sound) for (const q of [12, 19, 24]) c.sound.note(root + q, { dur: 1.4, vel: 0.08, wave: 'sine', pan: 0 }); }
      const col = now.col;
      const slab = new Int32Array(64);
      let all = 0;
      for (let i = 0; i < 32768; i++) if (col[i]) { const x = i & 31, y = i >> 5 & 31, z = i >> 10, cc = scAxis === 0 ? x : scAxis === 1 ? y : scAxis === 2 ? z : x + y; if (z > zTop) zTop = z; if (cc < c0) c0 = cc; if (cc > c1) c1 = cc; slab[cc]++; all++; }
      // the cut goes no deeper than where 60 in a hundred of its cubes are still standing
      cMin = c0; for (let acc = 0; cMin <= c1 && acc < all * 0.6; cMin++) acc += slab[cMin];
      if ((motion === 'Flooding' || seep) && c1 >= 0) {
        // up to three springs, each on the highest of a handful of columns, and by choice one with an edge to run over on the side the eye is on
        // a form that knows where its water rises (a fountain, a crater) has its springs there
        const own = now.spr && now.spr.length ? now.spr : null;
        // a seep runs on some stands and not others
        seepOn = seep && h3(lo >>> 0, rises++, 59) % 100 < seepWet;
        if (seep && !own && seepKind === 2) for (let q = 0; q < 48 && !springs.length; q++) {
          // a crack in a side: the air in front of a face turned to the eye, partway up
          const x = fl(wr() * N), y = fl(wr() * N), z = fl(zTop * (0.3 + wr() * 0.45)), i = at(x, y, z);
          if (!col[i]) continue;
          const j = x < N - 1 && !col[i + 1] ? i + 1 : y < N - 1 && !col[i + 32] ? i + 32 : -1;
          if (j >= 0) { springs.push(j); const j2 = j === i + 1 ? j + 32 : j + 1, o = j - i; if ((j2 & 31) < N && (j2 >> 5 & 31) < N && !col[j2] && col[j2 - o]) springs.push(j2); }      // (two cells wide)
        }
        const count = own || springs.length ? 0 : seep ? 1 : 1 + fl(wr() * 3);
        if (own) for (const j of own) if (!col[j]) springs.push(j);
        for (let s = 0; s < count; s++) {
          let best = -1, bz = -1, bdir = 0;
          for (let q = 0; q < 28; q++) {
            const x = fl(wr() * N), y = fl(wr() * N);
            let z = N - 1; while (z >= 0 && !col[at(x, y, z)]) z--;
            if (z < 0 || z >= N - 1) continue;
            let edge = 0, ed = 0;
            for (let dir = 0; dir < 4 && !edge; dir += 2) for (let kk = 1, px = x + DX[dir], py = y + DY[dir]; kk <= reach && px >= 0 && py >= 0 && px < N && py < N; kk++, px += DX[dir], py += DY[dir]) {
              if (col[at(px, py, z + 1)]) break;
              if (!col[at(px, py, z)]) {
                // the further it would fall in the open, the better: best of all to the floor, where it is seen to land
                // and a fall that runs down a face, not one that hangs free in the air like a pipe
                let zz = z, free = 0, near = 0; while (zz >= 0 && !col[at(px, py, zz)]) { const j = at(px, py, zz); if ((px > 0 && col[j - 1]) || (px < N - 1 && col[j + 1]) || (py > 0 && col[j - 32]) || (py < N - 1 && col[j + 32])) near++; else free++; zz--; }
                edge = 40 + mn(12, near) - 3 * free + (zz < 0 && free <= 1 ? 12 : 0); ed = dir; break;
              }
            }
            if (z + edge >= bz) { bz = z + edge; best = at(x, y, z + 1); bdir = ed; }
          }
          // in all but a small room a spring is four cubes wide; a seep two side by side, or a row of them along the edge it runs over
          const row = [best];
          if (seep && seepKind !== 1 && best >= 0) { const j = best + (bdir ? 1 : 32); if (j < 32768 && col[j - 1024]) row.push(j); else if (best - (bdir ? 1 : 32) >= 1024 && col[best - (bdir ? 1 : 32) - 1024]) row.push(best - (bdir ? 1 : 32)); }      // a trickle or a drip is two cells wide along its edge
          if (seep && seepKind === 1 && best >= 0) for (let a = 1, st = bdir ? 1 : 32; a <= 2 + (seepX & 1); a++) for (const j of [best + a * st, best - a * st]) if (j >= 1024 && j < 32768 && col[j - 1024]) row.push(j);
          if (best >= 0) for (const j of seep ? row : N >= 12 ? [best, best + 1, best + 32, best + 33] : [best]) if ((j & 31) < N && (j >> 5 & 31) < N && !col[j]) springs.push(j);
        }
      }
      if (dry) dryRise();
    };
    // the pose for this moment
    const strike = () => {
      // (its motion eases in as it comes to stand, and out again before it changes: amp, eased in and out)
      const fade = amp * amp * (3 - 2 * amp), heave = motion === 'Heaving', pump = motion === 'Pumping';
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let d = 0;
        if (heave) d = hvAmp * fade * (0.5 - 0.5 * M.cos((hvKind === 0 ? x + y : hvKind === 1 ? hyp(x - N / 2, y - N / 2) * 1.5 : hvKind === 2 ? x : y) * hvK - tau * hvW));
        else if (pump) d = hvAmp * fade * (0.5 - 0.5 * M.cos(tau * hvW + TAU * knot(fl(x / pumpB), fl(y / pumpB), 61)));
        lift[y << 5 | x] = d + 0.5;
      }
      // a turn goes a quarter at a time: it rests square for most of each quarter and swings on in the last fifth of it
      const qt = tau * ab(spinW) / (M.PI / 2), qf = qt - fl(qt), qs = qf < 0.8 ? 0 : (qf - 0.8) / 0.2, qa = (fl(qt) + qs * qs * (3 - 2 * qs)) * (M.PI / 2) * (spinW < 0 ? -1 : 1);
      if (spins) for (let z = 0; z < N; z++) { const a = motion === 'Turning' ? qa : twA * fade * M.sin(tau * twW) * mn(1, z / zTop); cosL[z] = M.cos(a); sinL[z] = M.sin(a); }
      if (motion === 'Swaying') for (let z = 0; z < N; z++) {
        const s = swKind === 3 ? M.sin(tau * swW) * (fl(z / swS) & 1 ? 1 : -1) : M.sin(tau * swW + z * swK);
        slX[z] = M.round(swAmp * fade * (swKind === 1 ? 0 : s)); slY[z] = M.round(swAmp * fade * (swKind === 1 ? s : swKind === 2 ? M.cos(tau * swW + z * swK) : 0));
      }
      if (motion === 'Scanning') { if (pressed > 0 || nf > 0 || edits > 0 || tapN > 0) { clipAt = 99; amp = 0; } else clipAt = c1 + 1 - (c1 + 1 - cMin) * fade * 0.5 * (1 - M.cos(tau * scW)); }   // shown whole while it is played with, and the cut eases back in after
    };
    // the pose: whatever differs from what stands is listed, and the list is worked off a share at a time
    // so that a big change is spread over a few ticks
    const quota = mx(60, fl(0.6 * N * N));
    let chN = 0, chAt = 0, rush = 0;
    const drain = () => { const share = rush > 0 ? quota * 4 : quota; if (rush > 0) rush--; for (const end = mn(chN, chAt + share); chAt < end; chAt++) setCube(chI[chAt], chV[chAt]); };
    const pose = () => {
      const col = now.col, cutting = clipAt < 99;
      let nc = 0;
      for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const i = z << 10 | y << 5 | x, s = back(x, y, z);
        let v = 0;
        if (s >= 0 && !(cutting && cut(s))) {
          const e = edit[s];
          v = e < 0 ? 0 : e || col[s];
          if (v && evOn && !e && evP[s]) v = evP[s] === 255 ? 0 : evP[s];
          if (!v) { const w = wet[s]; v = w ? (w === 16 || w === 17 ? flakeNo : w === 13 ? fallNo : wetNo) : ov[s] || (evOn ? evQ[s] : 0); }
        }
        if (!v) v = fly[i] || (evOn ? evR[i] : 0) || (i < 1024 && mere[i] ? wetNo : 0);
        if (vox[i] !== v) { chI[nc] = i; chV[nc++] = v; }
      }
      chN = nc; chAt = 0;
    };

    // ---- what runs over it ----
    // wet holds, for every cell of the plan's space: 1 to 12 for liquid running over a floor (how much further it
    // can still spread), 13 for liquid falling, 14 for a spring, 15 for liquid standing in a place it cannot run
    // out of; 16 for a flake falling, 17 for one lying; 18 for the jet a held spring throws up and over, which neither
    // spreads nor falls. The longer springs run, the further what lands can spread. A cell of liquid lasts only while it is fed, by liquid
    // above it or by fuller liquid beside it that stands on something: shut the spring and its stream runs dry
    // from the top down, and what stood in the hollows sinks away a level at a time.
    const tapI = new Int32Array(512), tapT = new Int32Array(512), tapK = new Uint8Array(512);      // where the pointer has poured lately, and until which tick each spring runs
    let tapN = 0, snowNo = 0, spread = reach, gush = 0, fed = false;
    const FALL = 13, SPRING = 14, STILL = 15, JET = 18, widest = mx(reach, mn(12, N >> 1)), dropN = liquid === 'Water' ? 3 : 2;
    // how deep a pool on the floor may be where it is fed (twice its width in cells, and one): wider under the pointer
    let poolL = 5;
    const wetAt = (j, v) => { if (!listed[j]) { if (wn >= wl.length) return; listed[j] = 1; wl[wn++] = j; } wet[j] = v; };
    const floorAt = j => firm(j) || wet[j] === STILL;
    // does a cell of air lie against the build (a cube beside it), and if not, the cell beside it that does (or -1)
    const clings = j => { const x = j & 31, y = j >> 5 & 31; return (x > 0 && firm(j - 1)) || (x < N - 1 && firm(j + 1)) || (y > 0 && firm(j - 32)) || (y < N - 1 && firm(j + 32)); };
    const slide = j => { const x = j & 31, y = j >> 5 & 31; for (let dir = 0; dir < 4; dir++) { const px = x + DX[dir], py = y + DY[dir], k = j + STEP[dir]; if (px >= 0 && py >= 0 && px < N && py < N && !firm(k) && clings(k)) return k; } return -1; };
    const feeds = (j, d) => { const w = wet[j]; return w > d && w < 16 && (j < 1024 || floorAt(j - 1024)); };
    // is the level this cell is on shut in on every side (a crater, a courtyard)? how many cells it holds if so, else 0
    const basin = new Int32Array(400), inBasin = new Int32Array(32768);
    let basinNo = 0;
    const shutIn = i => {
      let n = 0, got = 0;
      basinNo++; basin[n++] = i; inBasin[i] = basinNo;
      while (got < n) {
        const j = basin[got++], x = j & 31, y = j >> 5 & 31;
        if (j > 1023 && !floorAt(j - 1024)) return 0;        // it can still run down from here
        for (let dir = 0; dir < 4; dir++) {
          const px = x + DX[dir], py = y + DY[dir], q = j + STEP[dir];
          if (px >= N || py >= N) return 0;                  // the open side of the room
          if (px < 0 || py < 0 || inBasin[q] === basinNo || firm(q)) continue;
          if (n >= basin.length) return 0;                   // too wide to fill
          inBasin[q] = basinNo; basin[n++] = q;
        }
      }
      return n;
    };
    const run = () => {
      // a spring runs only while it is held open: all are stood down, and those still open are raised again
      for (let q = 0; q < wn; q++) if (wet[wl[q]] === SPRING) wet[wl[q]] = FALL; else if (wet[wl[q]] === JET) wet[wl[q]] = 0;
      let live = 0, any = 0;
      // a seep is open long enough for what it lets out to reach the floor and spread there; a drip opens in short beats
      const sp = (tau - seep0) % seepP, seepFor = zTop * every / 30 + 3 + seepX * 1.5;
      if ((motion === 'Flooding' ? tau > 0.6 : seepOn && tau > seep0 && sp < seepFor * (seepKind === 3 ? 1.8 : 1) && (seepKind !== 3 || sp % 2.4 < 1.1)) && now !== empty && tau < stand * 0.84) for (const s of springs) if (!firm(s)) { wetAt(s, SPRING); any = 1; }
      for (let q = 0; q < tapN; q++) if (tapT[q] > tickNo) { if (!firm(tapI[q])) wetAt(tapI[q], tapK[q] ? JET : SPRING); tapI[live] = tapI[q]; tapK[live] = tapK[q]; tapT[live++] = tapT[q]; any = 1; }
      tapN = live;
      fed = any > 0;
      poolL = 2 * mx(2, M.round(N * (tapN ? (liquid === 'Water' ? 0.24 : 0.17) : 0.16))) + 1;
      // (a held spring spreads its pool fast and wide over the floor)
      if (!any) { gush = 0; spread = reach; } else if ((tapN || ++gush % 3 === 0) && spread < (tapN ? (liquid === 'Water' ? 9 : 5) : mx(reach, widest >> 1))) spread++;
      const count = wn, top = (N - 1) << 10;
      for (let q = 0; q < count; q++) {
        const i = wl[q], d = wet[i];
        let ok = 0;
        if (d === JET) ok = firm(i) ? 0 : 1;
        else if (d > 0 && d < 16 && !firm(i)) {
          const up = i < top ? wet[i + 1024] : 0;
          if (d === SPRING || (up > 0 && up < 16) || (d === STILL && any)) ok = 1;      // what stands in a hollow stays while any spring runs
          // (a fall that slid in to keep to a face is fed from the cell above beside it)
          else if (d === FALL && i < top) { const u = i + 1024, x = i & 31, y = i >> 5 & 31; for (const q of [x > 0 ? u - 1 : -1, x < N - 1 ? u + 1 : -1, y > 0 ? u - 32 : -1, y < N - 1 ? u + 32 : -1]) if (q >= 0 && (wet[q] === FALL || wet[q] === SPRING) && !floorAt(q - 1024)) ok = 1; }
          else if (d < FALL) {
            const x = i & 31, y = i >> 5 & 31;
            if ((x > 0 && feeds(i - 1, d)) || (x < N - 1 && feeds(i + 1, d)) || (y > 0 && feeds(i - 32, d)) || (y < N - 1 && feeds(i + 32, d))) ok = 1;
            // a pool on the floor is fed on the slant too
            else if (i < 1024 && ((x > 0 && ((y > 0 && feeds(i - 33, d)) || (y < N - 1 && feeds(i + 31, d)))) || (x < N - 1 && ((y > 0 && feeds(i - 31, d)) || (y < N - 1 && feeds(i + 33, d)))))) ok = 1;
          }
        }
        fedBuf[q] = ok;
      }
      let keep = 0;
      for (let q = 0; q < count; q++) {
        const i = wl[q], d = wet[i];
        if (!fedBuf[q]) { if (d < 16 || d === JET) wet[i] = 0; listed[i] = 0; continue; }
        wl[keep++] = i;
        const x = i & 31, y = i >> 5 & 31, z = i >> 10;
        if (d === STILL || d === JET) continue;
        if (z > 0 && !floorAt(i - 1024)) {
          // nothing under it: it falls (water three cells a turn, the thicker two), or joins what is already there
          // (from an edge over open air it does not fall in a long thread like a pipe: it gathers at the lip, even while a
          // spring is held; where the face it runs down draws in under it, it keeps to the face: it slides in a cell)
          if (!clings(i - 1024) && slide(i - 1024) < 0) { let dd = 0; for (let j = i - 1024; dd < 3 && j >= 0 && !floorAt(j); j -= 1024) dd++; if (dd >= 3) continue; }
          for (let j = i - 1024, n = 0; n < dropN && j >= 0 && !floorAt(j); n++, j -= 1024) {
            // (past a gap a cell or two tall, as in a lattice, it falls straight on: it would only step in and out again)
            if (j >= 1024 && !floorAt(j - 1024) && !clings(j) && !(j >= 2048 && (clings(j - 1024) || (j >= 3072 && !floorAt(j - 2048) && clings(j - 2048))))) { const k = slide(j); if (k >= 0) { const w = wet[k]; if (!w || w > 15) wetAt(k, FALL); else if (w < FALL) wet[k] = FALL; break; } }
            const w = wet[j]; if (!w || w > 15) wetAt(j, FALL); else if (w < FALL) wet[j] = FALL; else if (w === SPRING) break;
          }
          continue;
        }
        if (d >= FALL) {
          // a spring, or a fall that has landed: if this level is shut in it fills, and the spring rises with it
          const held = shutIn(i);
          if (held) {
            // it fills the level a share at a time, spreading out from where it lands (the shut-in cells are found
            // nearest first), and only once the level is full does it rise to the next
            let full = 0; for (let b = 1; b < held; b++) if (wet[basin[b]] === STILL) full++;
            const more = full + mx(2, M.ceil(held / 5));
            if (more < held - 1) { for (let b = 1; b <= more; b++) wetAt(basin[b], STILL); continue; }
            for (let b = 0; b < held; b++) wetAt(basin[b], STILL);
            if (d === SPRING && z < N - 1) { for (let t = 0; t < tapN; t++) if (tapI[t] === i) tapI[t] = i + 1024; for (let t = 0; t < springs.length; t++) if (springs[t] === i) springs[t] = i + 1024; }
            continue;
          }
        }
        if (z === 0) {
          // on the floor it spreads as a pool, every way and a little less far on the slant (two steps straight, three
          // on the slant), only so wide, and never to the open edge of the room: where it lands it is as deep as the
          // pool is to be wide, and less the nearer it lands to that edge
          const L = d >= FALL ? mn(12, 1 + spread, poolL, 2 * (N - 1 - mx(x, y))) : d;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const px = x + dx, py = y + dy, v = L - (dx && dy ? 3 : 2);
            if ((!dx && !dy) || v < 1 || px < 0 || py < 0 || px >= N || py >= N) continue;
            const j = i + dx + dy * 32, w = wet[j];
            if (firm(j)) continue;
            if (!w || w > 15) wetAt(j, v); else if (w < v) wet[j] = v;
          }
          continue;
        }
        // over a pool that is already full it runs as far as it likes: a full pool spills at its rim, wherever it was fed
        const L = d >= FALL ? (z > 0 && wet[i - 1024] === STILL ? 12 : spread) : d - 1;
        if (L < 1) continue;
        // it runs toward the nearest edge it can find; with none in sight it spreads every way
        let best = 50;
        for (let dir = 0; dir < 4; dir++) {
          let px = x + DX[dir], py = y + DY[dir], j = i + STEP[dir], dist = 50;
          if (px < 0 || py < 0 || px >= N || py >= N || firm(j)) { far[dir] = -1; continue; }
          if (z > 0) for (let kk = 1; kk <= reach; kk++, j += STEP[dir], px += DX[dir], py += DY[dir]) {
            if (px < 0 || py < 0 || px >= N || py >= N || firm(j)) break;
            if (!floorAt(j - 1024)) { dist = kk + (dir & 1) * 2; break; }   // an edge on the far side counts as further off: it would run down where it cannot be seen
          }
          far[dir] = dist; if (dist < best) best = dist;
        }
        // of several edges equally near it takes one, and always the same one from the same place: a stream stays a stream
        let only = -1;
        if (best < 50) { let ties = 0; for (let dir = 0; dir < 4; dir++) if (far[dir] === best) ties++; let pickNo = fl(knot(i & 1023, i >> 10, 77) * ties); for (let dir = 0; dir < 4; dir++) if (far[dir] === best && pickNo-- === 0) only = dir; }
        // (but near a held spring what it lets out on a top spreads every way as a pool first, and spills at its rims)
        for (let dir = 0; dir < 4; dir++) if (tapN && L > 4 ? far[dir] >= 0 : far[dir] === best && (only < 0 || dir === only)) {
          const j = i + STEP[dir], w = wet[j];
          if (!w || w > 15) wetAt(j, L); else if (w < L) wet[j] = L;
        }
      }
      for (let q = count; q < wn; q++) wl[keep++] = wl[q];
      wn = keep;
    };
    // flakes fall from the top of the room, only over the build, lie a while where they land on it, and go; a few at a
    // time, fewer in a small room, where each is a big cube; one that reaches the floor is gone at once
    const flakeMost = mx(5, fl(N * N / 28));
    const snow = () => {
      snowNo++;
      if (motion === 'Settling' && M.sin(tau * 0.3) > -0.3 && (N >= 24 || snowNo % 3 === 0)) for (let q = 0; q < flakes && sn < mn(sl.length, flakeMost); q++) {
        const x = fl(wr() * N), y = fl(wr() * N), s = (N - 1) << 10 | y << 5 | x;
        let z = N - 2; while (z >= 0 && !firm(z << 10 | y << 5 | x)) z--;
        if (z >= 0 && open(s)) { wet[s] = 16; sl[sn++] = s; }
      }
      let keep = 0;
      for (let q = 0; q < sn; q++) {
        let i = sl[q];
        const d = wet[i];
        if (d < 16 || seenAt[i] === snowNo) continue;  // dug away or run over, or already moved this turn
        let gone = false;
        if (i > 1023 && open(i - 1024)) { wet[i] = 0; i -= 1024; wet[i] = d; }
        else if (i < 1024) gone = true;
        else if (d === 16) { if (i > 2047 && wet[i - 1024] === 17 && wet[i - 2048] === 17) gone = true; else wet[i] = 17; }
        else gone = wr() < (i < 1024 ? melt * 5 : melt);
        if (gone) wet[i] = 0; else { seenAt[i] = snowNo; sl[keep++] = i; }
      }
      sn = keep;
    };

    // ---- the pool at its foot ----
    // What its own springs let out gathers on the floor round its foot and stays there: a pool that grows out from where
    // the liquid lands, round the build and never to the open edge of the room, while anything runs into it. Once it is
    // as wide as it gets it lies a while, then sinks away from its rim, and the next pool begins where liquid lands next.
    // It lies in the room's own space, so a build that turns turns over it.
    const mereD = new Float32Array(1024).fill(99), mereW = new Float32Array(1024), mereB = new Uint8Array(1024), mereMax = liquid === 'Magma' ? mx(2, N * 0.15) : mx(2.5, N * 0.24);
    mereRef = mereD;      // (molten rock stays a small pool that creeps and crusts over at its rim; water a wider one)
    for (let j = 0; j < 1024; j++) mereW[j] = 0.65 + 1.1 * knot((j & 31) >> 1, j >> 6, 91) + 0.35 * knot(j & 31, j >> 5, 92);     // (each cell of floor a little nearer or further, so its rim is ragged)
    let mereCap = 0, mereHold = 0, ebb = false, brim = false;
    const mereStep = () => {
      // where liquid lies on the floor now, taken from the plan's space back to the room's
      let fedNow = 0;
      const c0 = cosL[0], s0 = sinL[0];
      for (let q = 0; q < wn; q++) {
        const s = wl[q], w = wet[s];
        if (s >= 1024 || !w || w > 15) continue;
        let x = s & 31, y = s >> 5 & 31;
        if (spins) { const px = x + 0.5 - N / 2, py = y + 0.5 - N / 2; x = fl(N / 2 + px * c0 - py * s0); y = fl(N / 2 + px * s0 + py * c0); } else { x += slX[0]; y += slY[0]; }
        if (x < 0 || y < 0 || x >= N || y >= N) continue;
        if (x === N - 1) x--; if (y === N - 1) y--;      // (what lands at the open edge gathers just inside it)
        if (!hard(x, y, 0)) { mereD[y << 5 | x] = 0; fedNow++; }
      }
      if (!fedNow && !mereCap) return;
      // how far each cell of floor is from where it has landed, going round the build
      for (let y = 0; y < N - 1; y++) for (let x = 0; x < N - 1; x++) if (hard(x, y, 0)) mereD[y << 5 | x] = 99, mereB[y << 5 | x] = 1; else mereB[y << 5 | x] = 0;
      for (let pass = 0; pass < 2; pass++) for (let n = 0; n < 1024; n++) {
        const j = pass ? 1023 - n : n, x = j & 31, y = j >> 5;
        if (x >= N - 1 || y >= N - 1 || mereB[j]) continue;
        let d = mereD[j];
        const w = mereW[j];
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const px = x + dx, py = y + dy;
          if ((!dx && !dy) || px < 0 || py < 0 || px >= N - 1 || py >= N - 1) continue;
          const e = mereD[j + dx + dy * 32] + (dx && dy ? w * 1.41 : w);
          if (e < d) d = e;
        }
        mereD[j] = d;
      }
      // it grows while fed, lies a while once full, then sinks away
      if (ebb) { mereCap -= mereMax / 34; if (mereCap <= 0) { mereCap = 0; ebb = false; mereD.fill(99); } }
      else if (brim || mereCap >= mereMax) { if (++mereHold > 40) { ebb = true; mereHold = 0; brim = false; } }
      else if (fedNow) mereCap = mn(mereMax, mereCap + mereMax / 64);
      // (and it never covers more than an eighth of the floor, molten rock a sixteenth: then it is as wide as it gets)
      let area = 0;
      mereCapRef = mereCap;
      for (let j = 0; j < 1024; j++) area += mere[j] = mereD[j] < mereCap ? 1 : 0;
      if (!ebb && area > N * N * (liquid === 'Magma' ? 0.06 : 0.12)) brim = true;
    };

    // ---- cubes in the air ----
    // A blow from the pointer throws cubes out of the build, up and away in big arcs. Each bounces once, slides on over
    // whatever it comes down on (out over the floor in front of the room, as far as the picture shows it), may roll off
    // an edge, and comes to lie. When the pointer has been away a little while, every cube out of place flies home.
    const FM = 1400, fx = new Float32Array(FM), fy = new Float32Array(FM), fz = new Float32Array(FM), fvx = new Float32Array(FM), fvy = new Float32Array(FM), fvz = new Float32Array(FM);
    const fsx = new Float32Array(FM), fsy = new Float32Array(FM), fsz = new Float32Array(FM), fu = new Float32Array(FM), fdu = new Float32Array(FM), fh = new Float32Array(FM);
    const fc = new Uint8Array(FM), fmode = new Uint8Array(FM), fhop = new Uint8Array(FM), fat = new Int32Array(FM), fto = new Int32Array(FM), fage = new Uint16Array(FM);
    let nf = 0, loose = 0;                              // how many are in the air, and how many of those are still falling
    // the reach of a blow, in cells: a ball about a quarter of the picture across, whatever the size of the room; the
    // pace of what it throws goes with it, so a blow looks as big in a small room as in a large one
    const R0 = mn(N * 0.42, mx(1.8, 0.13 * G / (2.24 * k))), grav = 0.022 * R0, vOut = 0.17 * R0, vUp = 0.2 * R0, BURST = 1.7, DRAG = 0.93, R0t = R0, vOutT = vOut, vUpT = vUp;
    // a cube that comes to lie where the plan has no place (on the floor in front of the room) lies in the room's own
    // space (lie: its colour), until it flies home
    const lie = new Uint8Array(32768), strays = new Int32Array(FM), spL = new Int32Array(512);
    let sN = 0, spN = 0;
    const inPic = (x, y, z) => { const px = eyeX + 2 * k * (x - y), py = eyeY + k * (x + y + 1 - 2 * z); return px >= 2 * k + 1 && px <= G - 2 * k - 1 && py >= 3 * k + 1 && py <= G - 4 * k; };   // (its whole hexagon, top to foot, clear of the picture's foot)
    // is a cell taken by something a flying cube cannot pass: a wall, the floor, the edge of the picture (what flies is
    // always seen), a cube; just thrown, it passes through the build, so that a blow into a lattice or a cage still
    // comes out of it
    const hardF = (x, y, z, early) => {
      if (x < 0 || y < 0 || z < 0 || x > 31 || y > 31 || z > 31) return true;
      if (lie[z << 10 | y << 5 | x]) return true;
      if (!inPic(x, y, z)) return true;
      if (x >= N + 2 || y >= N + 2) return true;         // (out past the room it may come only a step or two, so what lies there lies by the build, not along the picture's foot)
      if (x >= N || y >= N) return boxed;
      if (z >= N) return boxed;                          // over the top of the room (where there is a room)
      if (early) return false;
      const s = back(x, y, z);
      return s >= 0 && firm(s) && !cut(s);
    };
    // the picture of a flying cube is taken off the cell it was in, and put on the one it has come to (if that is empty)
    const leave = p => { const j = fat[p]; if (j >= 0) { fat[p] = -1; if (fly[j]) { fly[j] = lie[j]; setCube(j, due(j)); } } };
    const enter = (p, j) => { if (!vox[j] && !fly[j]) { fly[j] = fc[p]; setCube(j, fc[p]); fat[p] = j; } };
    // the box the eye walks takes in the cubes thrown out past the room from an open build
    // (every cube in the air, and every one lying out past the room's own box, widens it, so each is seen whole)
    boxMore = () => {
      const grow = j => { const x = j & 31, y = j >> 5 & 31, z = j >> 10; if (x < bx0) bx0 = x; if (y < by0) by0 = y; if (x > bx1) bx1 = x; if (y > by1) by1 = y; if (z > bz1) bz1 = z; };
      for (let p = 0; p < nf; p++) { const j = fat[p]; if (j >= 0) grow(j); }
      for (let q = 0; q < sN; q++) if (lie[strays[q]]) grow(strays[q]);
    };
    const drop = p => {
      const q = --nf;
      if (p === q) return;
      fx[p] = fx[q]; fy[p] = fy[q]; fz[p] = fz[q]; fvx[p] = fvx[q]; fvy[p] = fvy[q]; fvz[p] = fvz[q]; fsx[p] = fsx[q]; fsy[p] = fsy[q]; fsz[p] = fsz[q]; fu[p] = fu[q]; fdu[p] = fdu[q]; fh[p] = fh[q];
      fc[p] = fc[q]; fmode[p] = fmode[q]; fhop[p] = fhop[q]; fat[p] = fat[q]; fto[p] = fto[q]; fage[p] = fage[q];
    };
    const fliers = () => {
      for (let p = nf - 1; p >= 0; p--) {
        if (fmode[p]) {
          // on its way home (1), or out of the room for good (2), along an arc
          const u = fu[p] += fdu[p];
          if (u >= 1) {
            leave(p);
            if (fmode[p] === 1) {
              const s = fto[p], j = fl(fvz[p]) << 10 | fl(fvy[p]) << 5 | fl(fvx[p]);
              if (edit[s] === -2) mark(s, 0);
              setCube(j, due(j)); ping(j, 0.16);
              // it lands with a flash, and with the mark round its foot that a cube laid down makes
              dent[j] = 0; spark[j] = 5; if (spN < spL.length) spL[spN++] = j; sparks = spN; landed(j, -1, true);
            }
            drop(p); continue;
          }
          const e = u * u * (3 - 2 * u), x = fsx[p] + (fvx[p] - fsx[p]) * e, y = fsy[p] + (fvy[p] - fsy[p]) * e, z = fsz[p] + (fvz[p] - fsz[p]) * e + fh[p] * 4 * u * (1 - u);
          const j = x >= 0 && y >= 0 && z >= 0 && x < 32 && y < 32 && z < 32 ? fl(z) << 10 | fl(y) << 5 | fl(x) : -1;
          if (j !== fat[p]) { leave(p); if (j >= 0) enter(p, j); }
          continue;
        }
        // flying free: a fast one is moved in steps of under a cell, so it cannot pass through anything
        let x = fx[p], y = fy[p], z = fz[p], vx = fvx[p], vy = fvy[p], vz = mx(-2.5, fvz[p] - grav), rest = ++fage[p] > 150, ground = false, early = fage[p] < (fhop[p] & 16 ? 13 : 7) && !(fhop[p] & 8), inRoom = fhop[p] & 16 && fage[p] > 13;      // (from an open build it passes through the bars a while longer, then keeps over the room's floor, where it is seen lying)
        if (fage[p] <= 10) { vx *= DRAG; vy *= DRAG; if (vz > 0) vz *= DRAG; }      // the blast's first rush, slowed by the air
        const n = M.ceil(mx(ab(vx), ab(vy), ab(vz)) / 0.9) || 1;
        for (let sub = 0; sub < n; sub++) {
          const cx = fl(x), cy = fl(y), cz = fl(z);
          let z2 = z + vz / n;
          if (fl(z2) !== cz && hardF(cx, cy, fl(z2), early && vz > 0)) {
            z2 = z;
            if (vz >= 0) vz = 0;
            else if (vz < -4 * grav && !(fhop[p] & 8)) { vz *= -0.35; vx *= 0.7; vy *= 0.7; fhop[p] |= 8; }   // it bounces, once
            else { vz = 0; z2 = cz + 0.02; ground = true; }                    // it has come down on something, and slides on over it
          }
          const x2 = x + vx / n; if (fl(x2) !== cx && (hardF(fl(x2), cy, fl(z2), early) || (inRoom && x2 >= N))) vx *= -0.35; else x = x2;
          const y2 = y + vy / n; if (fl(y2) !== cy && (hardF(fl(x), fl(y2), fl(z2), early) || (inRoom && y2 >= N))) vy *= -0.35; else y = y2;
          z = z2;
        }
        if (ground) {
          vx *= 0.84; vy *= 0.84;
          if (vx * vx + vy * vy < 0.01) {
            rest = true;
            // it may roll off an edge instead of lying where it stopped
            const cx = fl(x), cy = fl(y), cz = fl(z);
            if ((fhop[p] & 7) < 5 && wr() < 0.7) {
              const d0 = ab(vx) > ab(vy) ? (vx > 0 ? 0 : 1) : vy > 0 ? 2 : 3;
              for (let t = 0; t < 4; t++) {
                const dir = t === 0 ? d0 : t === 1 ? d0 ^ 2 : t === 2 ? d0 ^ 3 : d0 ^ 1, nx = cx + DX[dir], ny = cy + DY[dir];
                if (!hardF(nx, ny, cz) && !hardF(nx, ny, cz - 1)) { x = nx + 0.5; y = ny + 0.5; vx = DX[dir] * 0.1; vy = DY[dir] * 0.1; vz = 0; fhop[p]++; rest = false; break; }
              }
            }
          }
        }
        if (rest) {
          leave(p); loose--;
          const cx = fl(x), cy = fl(y), cz = fl(z), col = fc[p];
          let j = cz << 10 | cy << 5 | cx, s = cz < N ? back(cx, cy, cz) : -1;
          // if another has come to lie here meanwhile, this one lies on top of it
          for (let up = 0; up < 3 && j < 31 << 10 && (lie[j] || (s >= 0 && firm(s))); up++) { j += 1024; s = (j >> 10) < N ? back(j & 31, j >> 5 & 31, j >> 10) : -1; }
          if (s >= 0 && !firm(s)) {
            if (edit[s] < 0) mark(s, 0); else { mark(s, col); wet[s] = 0; lying[j] = 1; }       // back where a cube belongs, or lying where none does
            dent[j] = 0; setCube(j, due(j)); ping(j, 0.1);
          } else if (s < 0 && !lie[j] && !(vox[j] && !fly[j]) && sN < FM) { lie[j] = fly[j] = col; strays[sN++] = j; setCube(j, col); ping(j, 0.1); }   // where the plan has no place
          drop(p); continue;
        }
        fx[p] = x; fy[p] = y; fz[p] = z; fvx[p] = vx; fvy[p] = vy; fvz[p] = vz;
        const j = fl(z) << 10 | fl(y) << 5 | fl(x);
        if (j !== fat[p]) { leave(p); enter(p, j); }
      }
    };
    // one cube sets off for home: from where it lies (or from the top of the room, if none is left lying) to where
    // it belongs (or up and out of the room, if nothing is missing any more), on a high arc
    const send = (from, to, s, col) => {
      if (nf >= FM) { if (s >= 0) { mark(s, 0); setCube(to, due(to)); } return; }
      const p = nf++, a = to >= 0 ? to : from, b = from >= 0 ? from : to;
      const tx = (a & 31) + 0.5, ty = (a >> 5 & 31) + 0.5, tz = to >= 0 ? (to >> 10) + 0.5 : N + 1.5, sx = (b & 31) + 0.5, sy = (b >> 5 & 31) + 0.5, sz = from >= 0 ? (from >> 10) + 0.5 : N - 0.5;
      const dist = hyp(tx - sx, ty - sy, tz - sz);
      fsx[p] = sx; fsy[p] = sy; fsz[p] = sz; fvx[p] = tx; fvy[p] = ty; fvz[p] = tz; fu[p] = 0; fdu[p] = 1 / mn(46, 20 + dist * 1.1); fh[p] = from >= 0 && to >= 0 ? mn(N * 0.45, 2 + dist * 0.45) : 0;
      fc[p] = col; fmode[p] = to >= 0 ? 1 : 2; fhop[p] = 0; fat[p] = -1; fto[p] = s; fage[p] = 0;
      if (s >= 0) mark(s, -2);                           // a cube is on its way to this place
      if (from >= 0) enter(p, from);
    };
    let holes = [], extras = [], hAt = 0, eAt = 0, scanned = false, per = 1, owe = 0;
    const mend = () => {
      if (!scanned) {
        // every place in the room that lacks its cube, from the bottom up, and every cube lying loose, from the top down
        // (those lying out in front of the room last)
        holes = []; extras = [];
        for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const s = back(x, y, z); if (s < 0) continue; const e = edit[s]; if (e === -1) holes.push(z << 10 | y << 5 | x); else if (e > 0) extras.push(z << 10 | y << 5 | x); }
        extras.reverse();
        let keep = 0;
        for (let q = 0; q < sN; q++) if (lie[strays[q]]) { extras.push(strays[q] | 1 << 20); strays[keep++] = strays[q]; }
        sN = keep;
        // they go home in a stagger, all of them set off within about two and a half seconds
        const most = mx(holes.length, extras.length);
        hAt = eAt = 0; scanned = true; per = most / mn(80, 20 + most / 3); owe = 0;
        // marks left where nothing in the room looks back to are forgotten
        if (!holes.length && !extras.length && !nf) { edit.fill(0); lying.fill(0); edits = 0; chN = chAt = 0; scanned = false; }
        return;
      }
      for (owe += per; owe >= 1; owe--) {
        let from = -1, to = -1, ts = -1, col = 0;
        while (eAt < extras.length && from < 0) {
          const e = extras[eAt++];
          if (e >> 20) { const j = e & 32767; if (lie[j]) { from = j; col = lie[j]; lie[j] = 0; if (fly[j] === col) fly[j] = 0; setCube(j, due(j)); } continue; }
          const s = back(e & 31, e >> 5 & 31, e >> 10);
          if (s >= 0 && edit[s] > 0) { from = e; col = edit[s]; mark(s, 0); lying[e] = 0; setCube(e, due(e)); }
        }
        while (hAt < holes.length && to < 0) { const h = holes[hAt++], s = back(h & 31, h >> 5 & 31, h >> 10); if (s >= 0 && edit[s] === -1) { to = h; ts = s; col = now.col[s] || col; } }
        if (from < 0 && to < 0) { if (!nf) scanned = false; return; }
        send(from, to, ts, col);
      }
    };

    // ---- the lights that drift round it after dark ----
    // Each goes slowly round the middle of the room, rising and sinking, and is shown in whatever empty cell it has
    // come to; behind or inside the build it is simply not seen. They are only out while it is night.
    const wispAt = new Int32Array(8).fill(-1), wispP = [];
    for (let j = 0; j < wispN; j++) wispP.push([(form.corner ? 0.34 : 0.48) * N * (0.5 + 0.5 * wr()), N * (0.2 + 0.65 * wr()), N * (0.06 + 0.12 * wr()), (wr() < 0.5 ? -1 : 1) * TAU / (30 * (50 + 60 * wr())), wr() * TAU, TAU / (30 * (17 + 20 * wr())), 1 + fl(wr() * 3)]);
    const drift = () => {
      const mid = form.corner ? N * 0.62 : N / 2, out = night > 0.08;
      for (let j = 0; j < wispN; j++) {
        const P = wispP[j], a = P[4] + tickNo * P[3], rad = P[0] * (1 + 0.25 * M.sin(a * P[6])), ci = wispCi[j % wispCi.length];
        const x = mn(N - 1, mx(0, fl(mid + rad * M.cos(a)))), y = mn(N - 1, mx(0, fl(mid + rad * M.sin(a)))), z = mn(N - 1, mx(0, fl(P[1] + P[2] * M.sin(tickNo * P[5] + j * 2.4))));
        const i = out ? z << 10 | y << 5 | x : -1, was = wispAt[j];
        if (i !== was) {
          if (was >= 0 && fly[was] === ci) { fly[was] = 0; if (vox[was] === ci) setCube(was, ops || falling.length ? 0 : due(was)); }
          wispAt[j] = i;
        }
        if (i >= 0 && !vox[i] && (!fly[i] || fly[i] === ci)) { fly[i] = ci; setCube(i, ci); }
      }
    };

    // ---- the pointer ----
    // what firm thing lies under a point of the picture (liquid, flakes and flying cubes are looked through): its
    // cell and which of its faces, packed as the eye packs them, or the floor or a wall behind it
    const probe = (ux, uy) => {
      const px = mn(G - 1, mx(0, fl(ux * G))), py = mn(G - 1, mx(0, fl(uy * G)));
      const a = (px + 0.5 - eyeX) / (2 * k), b = (py + 0.5 - eyeY) / k, sx = (a + b) / 2, sy = (b - a) / 2, out = mx(0, -sx, -sy);
      let t = N, axis = 0;
      if (N - sx < t) { t = N - sx; axis = 1; }
      if (N - sy < t) { t = N - sy; axis = 2; }
      if (t <= out) return -1;
      let xi = fl(t + sx - 1e-7), yi = fl(t + sy - 1e-7), zi = fl(t - 1e-7);
      while (zi >= 0 && xi >= 0 && yi >= 0) {
        if (hard(xi, yi, zi)) return (zi << 10 | yi << 5 | xi) << 3 | axis;
        const tx = xi - sx, ty = yi - sy;
        if (zi >= tx && zi >= ty) { zi--; axis = 0; } else if (tx >= ty) { xi--; axis = 1; } else { yi--; axis = 2; }
      }
      return out === 0 ? (fl(sy) << 5 | fl(sx)) << 3 | 3 : out === -sx ? (fl(out) << 10 | fl(out + sy) << 5) << 3 | 4 : (fl(out) << 10 | fl(out + sx)) << 3 | 5;
    };
    // a point of the picture with no part of the build behind it: the first cell along that line of sight (from the eye)
    // that has some of the build straight under it, or -1
    const over = (ux, uy) => {
      const px = mn(G - 1, mx(0, fl(ux * G))), py = mn(G - 1, mx(0, fl(uy * G)));
      const a = (px + 0.5 - eyeX) / (2 * k), b = (py + 0.5 - eyeY) / k, sx = (a + b) / 2, sy = (b - a) / 2;
      let xi = fl(mn(N, N - sx, N - sy) + sx - 1e-7), yi = fl(mn(N, N - sx, N - sy) + sy - 1e-7), zi = fl(mn(N, N - sx, N - sy) - 1e-7);
      while (zi >= 0 && xi >= 0 && yi >= 0) {
        for (let z = zi - 1; z >= 0; z--) if (hard(xi, yi, z)) return zi << 10 | yi << 5 | xi;
        const tx = xi - sx, ty = yi - sy;
        if (zi >= tx && zi >= ty) zi--; else if (tx >= ty) xi--; else yi--;
      }
      return -1;
    };
    let standing = true, stage = 0, wait = moving ? 0 : spins ? stand * 0.8 : mn(stand * 0.8, 13), nextWait = stand, pressed = 0, idle = 999, quiet = 999, thud = 0, wasBusy = false;
    // the pointer has come down on it: whatever was going up or coming down is finished at once, and it stands
    const grab = () => {
      if (!ops && !falling.length && now !== empty) return;
      for (const d of falling) if (d[2] >= 0) { const j = d[2] << 10 | (d[0] & 1023); if (shownAs[j]) { shownAs[j] = 0; setCube(j, 0); } }
      falling.length = 0; ops = 0;
      if (now === empty || now.gap) { now = life === 'Rebuilt' ? home : plans[stage]; standing = true; }
      calm(); rise(); chN = chAt = 0; rush = 20;
      if (!moving) wait = mx(wait, stand * 0.5);
    };
    // a blow: every cube within reach of the point struck is thrown up and out through the face that was struck, away
    // from a point a little way inside it; the reach is R0, less where that would throw too many at once, and up to
    // twice as far where there is little to throw (a thread, a lattice, a knot)
    const reachN = new Int32Array(64);
    const burst = (ux, uy) => {
      grab();
      let v = probe(ux, uy);
      if (v < 0) return;
      if ((v & 7) > 3) {
        // it points at a wall: the blow lands on whatever lies under that point of the air
        let j = over(ux, uy);
        if (j >= 0) { while (j > 1023 && !hard(j & 31, j >> 5 & 31, (j >> 10) - 1)) j -= 1024; if (j > 1023) v = (j - 1024) << 3; }
      }
      const kind = v & 7, i = v >> 3;
      blow(i & 31, i >> 5 & 31, i >> 10, kind === 1 || kind === 4 ? 0 : kind === 2 || kind === 5 ? 1 : 2, 1, wr);
    };
    // the blow itself, at a cell, through a face (ax: 0, 1, 2), or (3) out every way from it, up and toward the eye; big
    // scales its reach and its pace (a charge or a meteor blows harder than a finger); rnd: the stream it scatters by
    const blow = (cx, cy, cz, ax, big, rnd, most = 1e9) => {
      const R0 = R0t * big, vOut = vOutT * big, vUp = vUpT * big;
      // how many there are to throw within each half cell of the point struck
      const RM = mn(N * 0.6, R0 * 2.2, 31);
      reachN.fill(0);
      let inAll = 0, inGot = 0;
      for (let z = mx(0, fl(cz - RM)); z <= mn(N - 1, M.ceil(cz + RM)); z++) for (let y = mx(0, fl(cy - RM)); y <= mn(N - 1, M.ceil(cy + RM)); y++) for (let x = mx(0, fl(cx - RM)); x <= mn(N - 1, M.ceil(cx + RM)); x++) {
        const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy) + (z - cz) * (z - cz);
        if (d2 > RM * RM) continue;
        const s = back(x, y, z);
        const f = s >= 0 && firm(s) && !cut(s);
        if (f) reachN[mn(63, fl(M.sqrt(d2) * 2))]++;
        if (d2 <= R0 * R0 && (ax === 0 ? x <= cx : ax === 1 ? y <= cy : z <= cz)) { inAll++; if (s >= 0 && now.col[s]) inGot++; }      // (the half of the ball behind the face struck, as it was built: a crater is not a lattice)
      }
      let b = mn(63, fl(R0 * 2)), got = 0;
      for (let q = 0; q <= b; q++) got += reachN[q];
      // (an open build, a lattice or a cage, has a third or less of what lies behind the face struck filled: it throws
      // more, and throws it out toward the eye, clear of the build, so the blow is seen and not lost in the bars)
      const holey = inGot < 0.33 * inAll;
      while (b > 2 && got > mn(most, mx(60, mn(300 * big, 900 - nf)))) got -= reachN[b--];      // (fewer while many are still in the air)
      while (b < 63 && (b + 1) / 2 <= RM && got < mn(most, holey ? mn(120 * big, cubes * 0.4) : mn(300, cubes * 0.32, mx(100, cubes * 0.05)) * big)) got += reachN[++b];      // (a big dense build gives up a clear chunk)
      const r = mx(1.4, (b + 0.99) / 2), o = r * 0.7;
      const ox = cx + 0.5 - (ax === 0 ? o : 0), oy = cy + 0.5 - (ax === 1 ? o : 0), oz = cz + 0.5 - (ax === 2 ? o : 0);
      let threw = 0;
      const nf0 = nf;
      for (let z = mx(0, fl(cz - r)); z <= mn(N - 1, M.ceil(cz + r)); z++) for (let y = mx(0, fl(cy - r)); y <= mn(N - 1, M.ceil(cy + r)); y++) for (let x = mx(0, fl(cx - r)); x <= mn(N - 1, M.ceil(cx + r)); x++) {
        if ((x - cx) * (x - cx) + (y - cy) * (y - cy) + (z - cz) * (z - cz) > r * r || nf >= FM) continue;
        const s = back(x, y, z);
        if (s < 0) continue;
        if (wet[s] && (x - cx) * (x - cx) + (y - cy) * (y - cy) + (z - cz) * (z - cz) <= r * r * 0.2) wet[s] = 0;      // what was running right where it struck is splashed away (the rest stays: it is still the same thing)
        if (!firm(s) || cut(s)) continue;
        const j = z << 10 | y << 5 | x, col = edit[s] > 0 ? edit[s] : now.col[s], p = nf++;
        // all of it goes out through the struck face, and up
        let wx = x + 0.5 - ox, wy = y + 0.5 - oy, wz = z + 0.5 - oz;
        // (struck from above, it leans toward the eye, out over the floor in front)
        if (ax === 0) wx = ab(wx) + 0.3 * r; else if (ax === 1) wy = ab(wy) + 0.3 * r; else if (ax === 2) { wz = ab(wz) + 0.3 * r; wx += 0.35 * r; wy += 0.35 * r; }
        else { wz = ab(wz) + 0.4 * r; wx += 0.15 * r; wy += 0.15 * r; }
        // (each flies straight out from the point struck, the further out the faster, with little scatter, and starts fast
        // and is slowed by the air, so the first moments read as one blast outward)
        const sp = BURST * vOut * (0.85 + 0.3 * rnd() + 0.25 * mn(1, hyp(wx, wy, wz) / r)) / (hyp(wx, wy, wz) || 1);
        fx[p] = x + 0.5; fy[p] = y + 0.5; fz[p] = z + 0.5; fvx[p] = wx * sp + (rnd() - 0.5) * vOut * 0.2; fvy[p] = wy * sp + (rnd() - 0.5) * vOut * 0.2; fvz[p] = mn(vUp * 1.5 * BURST, wz * sp * 0.6 + vUp * (0.7 + 0.3 * rnd()));
        if (holey) {
          // (from an open build each flies out in a ring round the point struck as the eye sees it, and toward the eye, so
          // that it comes out in front of the bars at once)
          const du = (x - cx + y - cy + z - cz) / 3, rx = x - cx - du, ry = y - cy - du, rz = z - cz - du, rl = hyp(rx, ry, rz) || 1, q = rnd() * TAU;
          const ux = rl > 0.5 ? rx / rl : M.cos(q) * 0.7, uy = rl > 0.5 ? ry / rl : -M.cos(q) * 0.7, uz = rl > 0.5 ? rz / rl : M.sin(q) * 0.7, sR = BURST * vOut * (0.9 + 0.3 * rnd()) * (0.6 + 0.4 * mn(1, rl / r)), F = 0.12 * R0 + 0.4;
          fvx[p] = ux * sR + F; fvy[p] = uy * sR + F; fvz[p] = uz * sR + F + vUp * 0.4;
        }
        fc[p] = col; fmode[p] = 0; fhop[p] = holey ? 16 : 0; fat[p] = j; fto[p] = -1; fage[p] = 0; loose++;
        mark(s, edit[s] > 0 ? 0 : -1); lying[j] = 0;
        fly[j] = col; setCube(j, due(j));
        dent[j] = 1; dents = 1;
        threw++;
      }
      chN = chAt = 0; scanned = false;
      // a thin or open build has little to throw: what it throws goes faster and further, and its ring runs wider
      const sparse = threw < 50;
      if (sparse) for (let p = nf0; p < nf; p++) if (!holey) { fvx[p] *= 1.35; fvy[p] *= 1.35; fvz[p] *= 1.2; }
      // a flash where it was struck, and a ring of light that runs out from it over the faces, the floor and the walls round it
      flashI = cz << 10 | cy << 5 | cx; flashR = mn(r * 0.5, 3) + (sparse || holey ? 1 : 0); ringT = RING; ringR = mx(r * 1.6 + 1.5, sparse || holey ? R0 * 2.2 : 0);
      if (threw) { blowT = 12; hotT = 27; }
      if (threw && thud <= 0 && c.sound) { thud = 4; c.sound.hit('kick', big > 1 ? 0.9 : 0.5); if (big > 1) c.sound.hit('noise', 0.32, { cutoff: 520, dur: 1.3 }); }
      return threw;
    };
    // a spring: liquid leaps up in a thin jet from the face under the pointer (taller the longer it is held), arcs
    // over to one side (the side of the picture the pointer is on) and falls from there; where it rises it also runs
    // over what it rises from. Each cell of it goes on running for a moment after the pointer has moved on, so that
    // a drag leaves a line of them
    const jetH = mx(2, M.round(R0 * 0.45));
    const tapCell = (s, jet) => {
      let q = 0;
      while (q < tapN && tapI[q] !== s) q++;
      if (q === tapN) { if (tapN >= tapI.length) return; tapI[tapN++] = s; }
      tapT[q] = tickNo + 2 * every + 3; tapK[q] = jet;
      wetAt(s, jet ? JET : SPRING);
    };
    const pour = (ux, uy) => {
      const v = probe(ux, uy);
      if (v < 0) return;
      const kind = v & 7, i = v >> 3, wide = 1, hgt = mn(jetH, 1 + ((pressed - 5) >> 1));
      if (c.sound && tickNo % 9 === 0) c.sound.hit('noise', 0.1, { cutoff: liquid === 'Water' ? 1900 : liquid === 'Oil' ? 800 : 450, dur: 0.4 });
      let x = i & 31, y = i >> 5 & 31, z = i >> 10;
      if (kind === 0) z++; else if (kind === 1) x++; else if (kind === 2) y++;
      // pointing at a wall, it rises from whatever lies under that point of the air
      if (kind > 3) { let j = over(ux, uy); if (j >= 0) { while (j > 1023 && !hard(j & 31, j >> 5 & 31, (j >> 10) - 1)) j -= 1024; x = j & 31; y = j >> 5 & 31; z = j >> 10; } }
      if (z >= N) return;
      const st = ux > 0.5 ? 1 : 32, arc = mn(5, 2 + hgt);
      for (let b = 0; b < wide; b++) for (let a = 0; a < wide; a++) {
        if (x + a >= N || y + b >= N) continue;
        let s = back(x + a, y + b, z);
        if (s < 0 || firm(s)) continue;
        while (wet[s] === STILL && s < (N - 1) << 10 && !firm(s + 1024)) s += 1024;      // on top of what already stands there
        // the spring (a broad one, four cells where there is room: it comes in volume), and the jet over it
        let top = s;
        tapCell(s, 0);
        for (const d of [1, 32, 33]) { const s2 = s + d; if (((s2 & 31) < N) && ((s2 >> 5 & 31) < N) && !firm(s2) && (s2 < 1024 || floorAt(s2 - 1024))) tapCell(s2, 0); }
        for (let h = 1; h < hgt && top < (N - 1) << 10 && !firm(top + 1024); h++) { top += 1024; tapCell(top, 1); }
        if (top === s) continue;
        // the arc: out a cell, and down by more at each step out, cell by cell so it holds together
        let cur = top, last = top, zd = 0;
        for (let j = 1; j <= arc; j++) {
          const n2 = cur + st;
          if (((st === 1 ? n2 & 31 : n2 >> 5 & 31) >= N) || (st === 1 ? (n2 & 31) === 0 : (n2 >> 5 & 31) === 0) || firm(n2)) break;
          // (and never out over a drop: it comes down on the build, where it can pool, not in a column through the air)
          let fall = 0; for (let q = n2 - 1024; q >= 0 && !floorAt(q) && fall < 9; q -= 1024) fall++;
          if (fall > hgt - zd + 1) break;
          cur = n2; tapCell(cur, 1); last = cur;
          const want = fl(j * j / arc);
          let ok = true;
          while (zd < want) { if (cur < 1024 || firm(cur - 1024)) { ok = false; break; } cur -= 1024; zd++; tapCell(cur, 1); last = cur; }
          if (!ok) break;
        }
        // from its end it falls, two cells thick
        if (last !== top || hgt > 1) { tapCell(last, 0); const s2 = last + (st === 1 ? 32 : 1); if (((s2 & 31) < N) && ((s2 >> 5 & 31) < N) && !firm(s2)) tapCell(s2, 0); }
      }
    };

    // ================= what else moves over it: sand, marbles, a growth =================
    // Each lives in the plan's space, as a liquid does (ov: its colour in a cell, own: 1 a grain, 2 a marble, 3 a growth,
    // 4 something thrown loose), so a build that heaves, pumps or sways carries it. It is worked a step at a time while the
    // build stands; what lies on a build that is taken down goes with it, and a growth then creeps back over what is left
    // and grows on. A hold pours sand, lets marbles go or opens flowers under the finger; a tap throws up the sand, scatters
    // the marbles or shakes the leaves off round where it struck.
    const dr = stream((lo ^ 0x1f83d9ab) >>> 0 || 11, (hi + 0x5be0cd19) >>> 0 || 12);
    const inR = (x, y, z) => x >= 0 && y >= 0 && z >= 0 && x < N && y < N && z < N;
    const free = j => !own[j] && !wet[j] && !firm(j);
    const putOv = (j, ci, who) => { ov[j] = ci; own[j] = who; };
    const takeOv = j => { ov[j] = 0; own[j] = 0; };
    let dryOn = 0;                                     // ticks since the build came to stand (it starts as it rises)
    // the cell in front of the face under a point of the picture, in the plan's space (or -1)
    const aim = (ux, uy) => {
      const v = probe(ux, uy);
      if (v < 0) return -1;
      const kind = v & 7, i = v >> 3;
      let x = i & 31, y = i >> 5 & 31, z = kind === 3 ? 0 : i >> 10;
      if (kind === 0) z++; else if (kind === 1) x++; else if (kind === 2) y++;
      else if (kind > 3) { let j = over(ux, uy); if (j < 0) return -1; while (j > 1023 && !hard(j & 31, j >> 5 & 31, (j >> 10) - 1)) j -= 1024; x = j & 31; y = j >> 5 & 31; z = j >> 10; }
      return inR(x, y, z) ? back(x, y, z) : -1;
    };
    // the air over the top of the build: the highest of a handful of its columns, by choice near the eye and at an edge
    const topCell = edgy => {
      let best = -1, bs = -1e9;
      for (let q = 0; q < 32; q++) {
        const x = fl(dr() * N), y = fl(dr() * N);
        let z = N - 1; while (z >= 0 && !firm(z << 10 | y << 5 | x)) z--;
        if (z < 0 || z >= N - 1) continue;
        const t = (z + 1) << 10 | y << 5 | x;
        let edge = 0;
        if (edgy) for (let d = 0; d < 4; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx >= 0 && ny >= 0 && nx < N && ny < N && free(t + STEP[d]) && free(t + STEP[d] - 1024)) edge = (d & 1) ? 2 : 3; }
        const sc = z * 2 + (x + y) * 0.35 + edge;
        if (sc > bs) { bs = sc; best = t; }
      }
      return best;
    };

    // ---- things thrown loose: a grain or a marble on an arc, a leaf drifting down ----
    // (kind 1 a grain, 2 a marble, 3 a leaf falling, 4 a leaf lying a moment where it fell)
    const PM = 360, qx = new Float32Array(PM), qy = new Float32Array(PM), qz = new Float32Array(PM), qvx = new Float32Array(PM), qvy = new Float32Array(PM), qvz = new Float32Array(PM);
    const qc = new Uint8Array(PM), qk = new Uint8Array(PM), qat = new Int32Array(PM), qt = new Uint16Array(PM);
    let qn = 0;
    const qMove = (p, j) => { const a = qat[p]; if (a >= 0 && own[a] === 4) takeOv(a); qat[p] = -1; if (j >= 0 && free(j)) { putOv(j, qc[p], 4); qat[p] = j; } };
    const qDrop = p => { const q = --qn; if (p === q) return; qx[p] = qx[q]; qy[p] = qy[q]; qz[p] = qz[q]; qvx[p] = qvx[q]; qvy[p] = qvy[q]; qvz[p] = qvz[q]; qc[p] = qc[q]; qk[p] = qk[q]; qat[p] = qat[q]; qt[p] = qt[q]; };
    const toss = (j, ci, kind, vx, vy, vz) => {
      if (qn >= PM) return false;
      const p = qn++;
      qx[p] = (j & 31) + 0.5; qy[p] = (j >> 5 & 31) + 0.5; qz[p] = (j >> 10) + 0.5; qvx[p] = vx; qvy[p] = vy; qvz[p] = vz; qc[p] = ci; qk[p] = kind; qat[p] = -1; qt[p] = 0;
      takeOv(j); qMove(p, j);
      return true;
    };
    // a blow throws what lies within reach of the cell struck out and up, away from it
    const throwNear = (s, r, who, kind, out, up) => {
      const sx = s & 31, sy = s >> 5 & 31, sz = s >> 10, list = who === 1 ? gl : who === 2 ? mc : vl, n = who === 1 ? gn : who === 2 ? bn : vn;
      let got = 0;
      for (let q = 0; q < n && got < 140; q++) {
        const j = list[q];
        if (own[j] !== who) continue;
        const dx = (j & 31) - sx, dy = (j >> 5 & 31) - sy, dz = (j >> 10) - sz, d = hyp(dx, dy, dz);
        if (d > r) continue;
        const f = out * (1.15 - d / r * 0.5) / (d || 1);
        if (toss(j, ov[j], kind, dx * f + (dr() - 0.5) * out * 0.5, dy * f + (dr() - 0.5) * out * 0.5, up * (0.6 + 0.5 * dr()) + mx(0, dz) * f * 0.5)) got++;
      }
      return got;
    };
    const qStep = () => {
      for (let p = qn - 1; p >= 0; p--) {
        if (qt[p] < 65535) qt[p]++;
        if (qk[p] === 4) { if (qt[p] > 45 || qat[p] < 0 || own[qat[p]] !== 4) { qMove(p, -1); qDrop(p); } continue; }
        const leaf = qk[p] === 3;
        if (leaf) { qvz[p] = mx(-0.07, qvz[p] - 0.006); qvx[p] *= 0.94; qvy[p] *= 0.94; } else qvz[p] = mx(-0.9, qvz[p] - 0.03);
        let x = qx[p] + qvx[p] + (leaf ? M.sin(qt[p] * 0.19 + p) * 0.05 : 0), y = qy[p] + qvy[p] + (leaf ? M.cos(qt[p] * 0.17 + p) * 0.03 : 0), z = qz[p] + qvz[p];
        if (x < 0.02) { x = 0.02; qvx[p] = ab(qvx[p]) * 0.3; }
        if (y < 0.02) { y = 0.02; qvy[p] = ab(qvy[p]) * 0.3; }
        if (z > N - 0.02) { z = N - 0.02; qvz[p] = 0; }
        if (x >= N || y >= N) { qMove(p, -1); qDrop(p); continue; }            // out over the open edge of the room: gone
        const cur = qat[p] >= 0 ? qat[p] : fl(qz[p]) << 10 | fl(qy[p]) << 5 | fl(qx[p]), j = z < 0 ? -1 : fl(z) << 10 | fl(y) << 5 | fl(x);
        if (j === cur) { qx[p] = x; qy[p] = y; qz[p] = z; continue; }
        if (j >= 0 && free(j)) { qx[p] = x; qy[p] = y; qz[p] = z; qMove(p, j); continue; }
        // it meets something: while it can still fall it slides down past it, else it comes to rest where it is
        const cz = cur >> 10;
        if (qvz[p] > 0 || (cz > 0 && free(cur - 1024))) { qvx[p] *= -0.25; qvy[p] *= -0.25; if (qvz[p] > 0) qvz[p] = 0; continue; }
        qMove(p, -1);
        const ci = qc[p];
        if (!free(cur)) { qDrop(p); continue; }
        if (qk[p] === 1) addGrain(cur, ci);
        else if (qk[p] === 2) { addBead(cur, ci, ab(qvx[p]) > ab(qvy[p]) ? (qvx[p] > 0 ? 0 : 1) : qvy[p] > 0 ? 2 : 3); clink(cur); }
        else { qk[p] = 4; qt[p] = 0; qMove(p, cur); continue; }
        qDrop(p);
      }
    };

    // ---- sand ----
    // Grains pour from a spout over a high edge of the build (or from a crack in a side), fall, and come to rest only where
    // the cells under them and on the slant under them are full: else they slide. So they run down the steps, slip off the
    // edges and stand in cones on the tops and on the floor. For a while the grains hold a steeper slope, then let go all at
    // once and slump. What lies on the floor sinks away from under its piles as fast as more comes, as in an hourglass.
    const GM = 1600, gl = new Int32Array(GM), gmv = new Uint8Array(32768);
    let gn = 0, spout = -1, gStep = 0, sticky = true, gHeld = 0;
    const grainCap = mx(20, mn(120, fl(N * 3.6), fl(N * N * 0.17))), crackK = h3(lo >>> 0, hi >>> 0, 71) % 10 < 3, gPace = N < 14 ? 2 : 3;
    const addGrain = (j, ci) => { if (gn >= GM || !free(j)) return false; putOv(j, ci || dryC[(h3(j, gStep, 5) & 3) === 0 ? 1 : 0], 1); gl[gn++] = j; gmv[j] = 1; return true; };
    const sandStep = () => {
      gStep++;
      // the spout lets a grain go two steps in three (fewer in a small room); with a hold, the pointer pours instead
      if (spout >= 0 && !gHeld && gStep % gPace && gn < GM - 60) addGrain(spout, 0);
      // (steep for a few seconds, then a small slump, and again, on a steady count)
      const ph = gStep % 55; sticky = ph < 44;
      // what is on the floor sinks away from under its piles when there is more than the room should hold
      // (and, if there is none there, the oldest grain lying open to the air on the build is blown away, so it is never buried)
      if (gn > grainCap) {
        let n = gn > grainCap * 1.3 ? 3 : 1;
        for (let q = 0; q < gn && n > 0; q++) { const j = gl[q]; if (j < 1024 && own[j] === 1 && own[j + 1024] === 1) { takeOv(j); n--; } }
        for (let q = 0; q < gn && n > 0; q++) { const j = gl[q]; if (j >= 1024 && own[j] === 1 && !gmv[j] && (j >= 31744 || own[j + 1024] !== 1)) { takeOv(j); n--; } }
      }
      let keep = 0;
      for (let q = 0; q < gn; q++) {
        const j = gl[q];
        if (own[j] !== 1) continue;
        if (firm(j) || wet[j]) { takeOv(j); continue; }
        const ci = ov[j], x = j & 31, y = j >> 5 & 31, z = j >> 10;
        if (z === 0) { gmv[j] = 0; gl[keep++] = j; continue; }
        const b = j - 1024;
        let to = -1;
        if (free(b)) to = b;
        else if (own[b] === 1 && gmv[b]) { gl[keep++] = j; continue; }      // (in a falling stream it waits on the grain under it)
        else {
          let open = 0, pickD = -1;
          for (let t = 0, off = h3(j, gStep, 9) & 3; t < 4; t++) {
            const d = (t + off) & 3, nx = x + DX[d], ny = y + DY[d];
            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            const sd = j + STEP[d];
            if (!free(sd) || !free(sd - 1024)) continue;
            open++; if (pickD < 0) pickD = d;
          }
          if (open && !(sticky && open <= 2 && own[b] === 1 && (h3(j, 3, 7) & 3))) {      // (only a pile holds a steeper slope: on the build it slides)
            to = j + STEP[pickD];
          }
        }
        if (to >= 0) { takeOv(j); gmv[j] = 0; putOv(to, ci, 1); gmv[to] = 1; gl[keep++] = to; }
        else { gmv[j] = 0; gl[keep++] = j; }
      }
      gn = keep;
      // a soft hiss while it pours (heard only after Unmute)
      if (c.sound && (spout >= 0 || gHeld) && gStep % (gHeld ? 5 : 11) === 0) c.sound.hit('noise', gHeld ? 0.045 : 0.02, { cutoff: 5200, dur: 0.5 });
      if (gHeld) gHeld--;
    };
    const sandHold = (ux, uy) => {
      const s = aim(ux, uy);
      if (s < 0) return;
      // it pours from a little over the finger, two grains wide
      let top = s;
      for (let h = 0; h < 2 && top < (N - 1) << 10 && free(top + 1024); h++) top += 1024;
      gHeld = 4;
      if (pressed & 1) addGrain(top, 0); else if ((top & 31) < N - 1) addGrain(top + 1, 0);
    };

    // ---- marbles ----
    // One at a time they are let go on the highest top and roll, a cell a beat, all of them on the same beat; one that is
    // stopped turns aside (to where there is a drop if it can), drops off the edge with a click, rolls on over the floor and
    // comes to rest where it is stopped or has run out; a while after, it is gone, so there is always a slow run of them.
    const MM = 48, mc = new Int32Array(MM), md = new Uint8Array(MM), mFall = new Uint8Array(MM), mRest = new Uint16Array(MM), mRoll = new Uint8Array(MM), mTurn = new Uint8Array(MM);
    let bn = 0, src = -1, relT = 0, beatT = 0, clinkT = 0, bHeld = 0;
    const bBeat = 6, bEvery = N < 14 ? 5 : 3, bMost = mn(MM - 8, 8 + (N >> 1)), bLife = 170 + (h3(hi >>> 0, lo >>> 0, 73) % 60);
    const addBead = (j, ci, d) => { if (bn >= MM || !free(j)) return; const p = bn++; mc[p] = j; md[p] = d; mFall[p] = 0; mRest[p] = 0; mRoll[p] = 0; mTurn[p] = 0; putOv(j, ci || dryC[h3(j, beatT, 13) % 3], 2); };
    const bDrop = p => { const q = --bn; if (p === q) return; mc[p] = mc[q]; md[p] = md[q]; mFall[p] = mFall[q]; mRest[p] = mRest[q]; mRoll[p] = mRoll[q]; mTurn[p] = mTurn[q]; };
    const bTo = (p, j) => { const ci = ov[mc[p]]; takeOv(mc[p]); putOv(j, ci, 2); mc[p] = j; };
    // a click as one lands (gentle: never two in a row)
    const clink = j => { if (c.sound && clinkT <= 0) { clinkT = 3; c.sound.hit('blip', 0.05, { freq: 2300 + 260 * (j % 5) }); } };
    const beadStep = () => {
      beatT++; if (clinkT > 0) clinkT--;
      const beat = beatT % bBeat === 0;
      if (beat && src >= 0 && !bHeld && ++relT >= bEvery) {
        relT = 0;
        if (bn >= bMost) { let old = -1; for (let p = 0; p < bn; p++) if (mRest[p] && (old < 0 || mRest[p] > mRest[old])) old = p; if (old >= 0) { takeOv(mc[old]); bDrop(old); } }
        if (bn < bMost) addBead(src, 0, (h3(beatT, 1, 17) & 1) ? 0 : 2);
      }
      if (bHeld) bHeld--;
      for (let p = bn - 1; p >= 0; p--) {
        const j = mc[p];
        if (own[j] !== 2) { bDrop(p); continue; }                           // thrown up by a blow
        if (firm(j) || wet[j]) { takeOv(j); bDrop(p); continue; }
        const x = j & 31, y = j >> 5 & 31, z = j >> 10;
        if (z > 0 && free(j - 1024)) { bTo(p, j - 1024); mFall[p]++; mRest[p] = 0; continue; }      // nothing under it: it drops, a cell a tick
        if (mFall[p]) {
          if (mFall[p] > 1) clink(j);
          mFall[p] = 0;
          // (come down on the floor, it rolls out toward the eye, the way that is open longest, so it gathers where it is seen)
          if (z === 0) { let best = md[p], bl = -1; for (const d of [0, 2]) { let n = 0; for (let q = j + STEP[d], k2 = 1; k2 <= 8 && (d ? y + k2 : x + k2) < N && free(q); q += STEP[d], k2++) n++; if (n > bl) { bl = n; best = d; } } md[p] = best; }
        }
        if (!beat) continue;
        if (mRest[p]) { if (++mRest[p] > bLife / bBeat) { takeOv(j); bDrop(p); } continue; }
        const goes = d => { const nx = x + DX[d], ny = y + DY[d]; return nx >= 0 && ny >= 0 && nx < N && ny < N && free(j + STEP[d]) ? j + STEP[d] : -1; };
        let d = md[p], to = goes(d);
        if (z === 0 && mRoll[p] >= 5 + (h3(j, p, 19) & 7)) to = -1;          // (on the floor it runs out after a few cells)
        if (to < 0) {
          if (z === 0) { mRest[p] = 1; continue; }
          let bd = -1, bs = -1;
          for (const e of [d ^ 2, d ^ 3, d ^ 1]) {
            const t = goes(e);
            if (t < 0) continue;
            const sc = (t >= 1024 && free(t - 1024) ? 2 : 1) - (e === (d ^ 1) ? 0.6 : 0) + ((e & 1) === 0 ? 0.3 : 0) + ((h3(j, e, 23) & 3) * 0.05);
            if (sc > bs) { bs = sc; bd = e; }
          }
          if (bd < 0 || ++mTurn[p] > 8) { mRest[p] = 1; continue; }
          md[p] = d = bd; to = goes(d);
        }
        bTo(p, to); if (z === 0) mRoll[p]++;
      }
    };
    const beadHold = (ux, uy) => {
      bHeld = 8;
      if (pressed % 4) return;
      const s = aim(ux, uy);
      if (s >= 0 && bn < MM) addBead(s, 0, ux > 0.5 ? 0 : 2);
    };

    // ---- a growth: ivy (or frost) ----
    // It starts at the foot of the build and climbs its faces a cell at a time: a few runners, each reaching on from its
    // tip (up most of all, round an edge when it gets there), branching now and then, while what is already there thickens
    // into patches; buds come here and there among the leaves, and open. It covers no more than about two fifths of what it
    // could, so the build always shows. A cell holds on to a face beside it or a top under it; one that loses it falls.
    const VM = 1800, vl = new Int32Array(VM), vs = new Uint8Array(32768), budQ = new Int32Array(64), budT = new Int32Array(64);
    let vn = 0, tips = [], vStep = 0, vCap = 200, vMem = null, vMemAt = 0, budA = 0, budB = 0;
    const vEvery = N < 14 ? 11 : 8;
    const NB18 = [];
    for (let dz = -1; dz <= 1; dz++) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const m = ab(dx) + ab(dy) + ab(dz); if (m === 1 || m === 2) NB18.push(dx, dy, dz); }
    const holds = j => { const x = j & 31, y = j >> 5 & 31, z = j >> 10; return (x > 0 && firm(j - 1)) || (y > 0 && firm(j - 32)) || (z > 0 && firm(j - 1024)) || (spins && ((x < N - 1 && firm(j + 1)) || (y < N - 1 && firm(j + 32)))); };
    // its colour by stage (1 a tip, 2 a leaf, 3 a bud, 4 a flower), each leaf one of two greens by its place
    const vCol = (j, st) => dryC[st === 1 ? 2 : st === 2 ? (h3(j, 1, 33) % 3 === 0 ? 1 : 0) : st === 3 ? 3 : (h3(j, 2, 35) & 1) ? 4 : 5];
    const vAdd = (j, st) => { if (vn >= VM || !free(j) || !holds(j)) return false; vs[j] = st; putOv(j, vCol(j, st), 3); vl[vn++] = j; return true; };
    const vSet = (j, st) => { vs[j] = st; ov[j] = vCol(j, st); };
    const vReach = (j, up) => {
      const x = j & 31, y = j >> 5 & 31, z = j >> 10;
      let best = -1, bs = -1;
      for (let q = 0; q < NB18.length; q += 3) {
        const nx = x + NB18[q], ny = y + NB18[q + 1], nz = z + NB18[q + 2];
        if (!inR(nx, ny, nz)) continue;
        const t = nz << 10 | ny << 5 | nx;
        if (!free(t) || !holds(t)) continue;
        const sc = (NB18[q + 2] > 0 ? up : NB18[q + 2] < 0 ? 0.25 : 1) * (0.4 + dr()) * (nx + ny > x + y ? 1.25 : 1);
        if (sc > bs) { bs = sc; best = t; }
      }
      return best;
    };
    // where a runner starts: at the foot of a face the eye can see, else anywhere it can hold
    const vSeed = () => {
      let best = -1, bs = -1;
      for (let q = 0; q < 40; q++) {
        const x = fl(dr() * N), y = fl(dr() * N), z = q < 30 ? 0 : fl(dr() * mn(N, zTop + 2)), j = z << 10 | y << 5 | x;
        if (!free(j) || !holds(j)) continue;
        const sc = x + y + dr() * N * 0.6 - z * 2;
        if (sc > bs) { bs = sc; best = j; }
      }
      return best >= 0 && vAdd(best, 1) ? best : -1;
    };
    const vGrow = () => {
      vStep++;
      if (vn < vCap) {
        if (!tips.length || (tips.length < 4 && dr() < 0.06)) { const s = vSeed(); if (s >= 0) tips.push(s); }
        if (tips.length) {
          const ti = vStep % tips.length, j = tips[ti], q = own[j] === 3 ? vReach(j, 4) : -1;
          if (q >= 0 && vAdd(q, 1)) { if (vs[j] === 1) vSet(j, 2); tips[ti] = q; if (dr() < 0.1 && tips.length < 6) tips.push(q); }
          else { if (own[j] === 3 && vs[j] === 1) vSet(j, 2); tips.splice(ti, 1); if (vn > 6 && dr() < 0.5) { const b = vl[fl(dr() * vn)]; if (own[b] === 3) tips.push(b); } }
        }
        // (and it thickens where it already is, so it lies in patches, not in lines)
        if (vn > 3 && dr() < 0.75) { const b = vl[fl(dr() * vn)]; if (own[b] === 3) { const q = vReach(b, 1); if (q >= 0) vAdd(q, 2); } }
      }
      // now and then a bud among the leaves, and a little after, it opens
      if (vStep % 5 === 0 && vn > 8 && budB - budA < 64) { const b = vl[fl(dr() * vn)]; if (own[b] === 3 && vs[b] === 2) { vSet(b, 3); budQ[budB & 63] = b; budT[budB++ & 63] = vStep; } }
      while (budA < budB && vStep - budT[budA & 63] > 7) { const b = budQ[budA++ & 63]; if (own[b] === 3 && vs[b] === 3) vSet(b, 4); }
    };
    // what has lost its hold falls as leaves; what the build has taken back is gone
    const vCheck = () => {
      let keep = 0;
      for (let q = 0; q < vn; q++) {
        const j = vl[q];
        if (own[j] !== 3) continue;
        if (firm(j) || wet[j]) { takeOv(j); continue; }
        if (!holds(j)) { toss(j, ov[j], 3, (dr() - 0.5) * 0.06, (dr() - 0.5) * 0.06, 0.02); continue; }
        vl[keep++] = j;
      }
      vn = keep;
      if (tips.length) tips = tips.filter(j => own[j] === 3);
    };
    // a hold: it bursts into flower round the finger, more the longer it is held
    const vHold = (ux, uy) => {
      if (pressed & 1) return;
      const s = aim(ux, uy);
      if (s < 0) return;
      const sx = s & 31, sy = s >> 5 & 31, sz = s >> 10, r = mn(3.6, 1.2 + (pressed - 5) * 0.05), ri = M.ceil(r);
      let opened = 0, grown = 0;
      for (let z = mx(0, sz - ri); z <= mn(N - 1, sz + ri); z++) for (let y = mx(0, sy - ri); y <= mn(N - 1, sy + ri); y++) for (let x = mx(0, sx - ri); x <= mn(N - 1, sx + ri); x++) {
        const d = hyp(x - sx, y - sy, z - sz);
        if (d > r) continue;
        const j = z << 10 | y << 5 | x;
        if (own[j] === 3) { if (vs[j] < 3 && opened < 3 && (h3(j, pressed >> 3, 41) & 3) === 0) { vSet(j, d < r - 1 ? 4 : 3); opened++; } }
        else if (grown < 2 && d <= r - 0.6 && (h3(j, 0, 43) & 1) && vAdd(j, 4)) grown++;
      }
      if (c.sound && pressed % 18 === 0) c.sound.hit('noise', 0.012, { cutoff: 2600, dur: 0.25 });
    };

    // ---- the three together ----
    const dryClear = () => {
      if (dry === 3) { vMem = vl.slice(0, vn).filter(j => own[j] === 3).sort((p, q) => (p >> 10) - (q >> 10) || p - q); vMemAt = 0; }
      for (let q = 0; q < qn; q++) if (qat[q] >= 0 && own[qat[q]] === 4) takeOv(qat[q]);
      ov.fill(0); own.fill(0); gn = bn = vn = qn = 0; tips = []; budA = budB = 0;
    };
    const dryRise = () => {
      dryOn = 0;
      if (dry === 1) {
        spout = -1;
        if (crackK) for (let q = 0; q < 48 && spout < 0; q++) {
          // a crack in a side the eye can see, partway up
          const x = fl(dr() * N), y = fl(dr() * N), z = fl(zTop * (0.35 + dr() * 0.4)), i = z << 10 | y << 5 | x;
          if (z < 2 || !firm(i)) continue;
          if (x < N - 2 && free(i + 1)) spout = i + 1; else if (y < N - 2 && free(i + 32)) spout = i + 32;
        }
        if (spout < 0) { const t = topCell(true); if (t >= 0) { spout = t; for (let h = 0; h < 3 && spout < (N - 1) << 10 && free(spout + 1024); h++) spout += 1024; } }
      } else if (dry === 2) src = topCell(false);
      else {
        // it may cover two fifths of the cells where it could hold
        let can = 0;
        for (let z = 0; z <= mn(N - 1, zTop + 1); z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const j = z << 10 | y << 5 | x; if (!firm(j) && holds(j)) can++; }
        vCap = mn(VM - 60, mx(24, fl(can * 0.4)));
        // the first time it stands, some of it is there already
        if (!vMem && tickNo < 2) for (let q = 0; q < N * 2; q++) vGrow();
      }
    };
    const dryTick = () => {
      dryOn++;
      if (qn) qStep();
      if (dry === 1) { if ((tickNo & 1) === 0) sandStep(); }
      else if (dry === 2) beadStep();
      else {
        // (after the build has been reworked, what was on it and can still hold there creeps back, from the floor up)
        if (vMem && vMemAt < vMem.length) for (let q = 0; q < 3 && vMemAt < vMem.length; q++) { const j = vMem[vMemAt++]; vAdd(j, vs[j] === 1 ? 2 : vs[j] || 2); }
        else if (tickNo % vEvery === 0) vGrow();
        if (tickNo % 24 === 0) vCheck();
      }
    };
    const dryHold = (ux, uy) => { if (dry === 1) sandHold(ux, uy); else if (dry === 2) beadHold(ux, uy); else vHold(ux, uy); };
    const dryTap = (ux, uy) => {
      const s = aim(ux, uy);
      if (s < 0) return;
      const r = mx(2.2, R0 * 0.85);
      if (dry === 1) throwNear(s, r, 1, 1, 0.34, 0.42);
      else if (dry === 2) throwNear(s, r * 1.3, 2, 2, 0.3, 0.38);
      else if (throwNear(s, r, 3, 3, 0.12, 0.1) && c.sound) c.sound.hit('noise', 0.03, { cutoff: 2400, dur: 0.35 });      // (a faint rustle)
    };

    // ================= the rare event =================
    // It keeps a clock of its own (evT, in ticks), which stands still while the build is being played with. Each kind
    // comes round again and again, the first time within a few seconds of the start. What it puts in the build or in the
    // air is laid in evP, evQ and evR (see due), so the build under it is never touched, and is whole again once it has passed.
    let evT = 0, evTick = null;
    const evIdle = () => pressed === 0 && idle > 40;
    // a cell of the plan shown at once where the room is square to it (where the build is turned, slid or lifted, the pose
    // shows it); while the build is being laid, only a cell that is empty or the event's own is touched
    const evShow = s => { if (back(s & 31, s >> 5 & 31, s >> 10) !== s) return; if (!ops && !falling.length) setCube(s, due(s)); else if (!vox[s] || evOwn[vox[s]]) setCube(s, evQ[s]); };
    const evSetP = (s, v) => { if (evP[s] !== v) { evP[s] = v; evShow(s); } };
    const evSetQ = (s, v) => { if (evQ[s] !== v) { evQ[s] = v; evShow(s); } };
    const evSetR = (i, v) => { if (evR[i] !== v) { evR[i] = v; setCube(i, due(i)); } };
    // the top cube of a column of the plan (or -1)
    const evTop = (x, y) => { let z = N - 1; while (z >= 0 && !(firm(z << 10 | y << 5 | x) && !cut(z << 10 | y << 5 | x))) z--; return z; };
    // the room cell that shows a cell of the plan now (undoing the turn or the slide, then the lift), or -1
    const OFF = [0, -1, 1];
    const roomOf = s => {
      const px = s & 31, py = s >> 5 & 31, pz = s >> 10;
      if (back(px, py, pz) === s) return s;
      let x = px, y = py;
      if (spins) { const c = cosL[pz], sn = sinL[pz], ax = px + 0.5 - N / 2, ay = py + 0.5 - N / 2; x = fl(N / 2 + ax * c - ay * sn); y = fl(N / 2 + ax * sn + ay * c); }
      else { x += slX[pz]; y += slY[pz]; }
      for (let dz = 0; dz < 4; dz++) for (const oy of OFF) for (const ox of OFF) {
        const X = x + ox, Y = y + oy, Z = pz + dz;
        if (X >= 0 && Y >= 0 && Z < 32 && X < 32 && Y < 32 && back(X, Y, Z) === s) return Z << 10 | Y << 5 | X;
      }
      return -1;
    };
    // the room's own air: a set of cells shown this tick, the last set taken away where it is not shown again
    const stampR = new Int32Array(evOn ? 32768 : 1), rNow = [], rWas = [];
    let stampNo = 1;
    const rStart = () => { stampNo++; rNow.length = 0; };
    const rPut = (x, y, z, ci) => {
      x = fl(x); y = fl(y); z = fl(z);
      if (x < 0 || y < 0 || z < 0 || x > 31 || y > 31 || z > 31 || x >= N + (boxed ? 0 : 2) || y >= N + (boxed ? 0 : 2) || !inPic(x, y, z)) return;
      const i = z << 10 | y << 5 | x;
      if (stampR[i] !== stampNo) { stampR[i] = stampNo; rNow.push(i); }
      evSetR(i, ci);
    };
    const rEnd = () => { for (const i of rWas) if (stampR[i] !== stampNo) evSetR(i, 0); rWas.length = 0; for (const i of rNow) rWas.push(i); };
    // a pixel of the picture taken toward a colour by a (1: all the way), unless the build stands in front of a point that
    // far from the eye (dep: x + y + z; none for one drawn over all); added light (add) instead where it is a glow
    const evDot = (px, py, r, g, b, a, dep) => {
      px = fl(px); py = fl(py);
      if (px < 0 || py < 0 || px >= G || py >= G) return;
      const p = py * G + px, v = vis[p];
      if (dep !== undefined && v >= 0 && (v & 7) < 3) { const j = v >> 3; if ((j & 31) + (j >> 5 & 31) + (j >> 10) + 2 > dep) return; }
      const q = p * 4;
      d8[q] += (r - d8[q]) * a; d8[q + 1] += (g - d8[q + 1]) * a; d8[q + 2] += (b - d8[q + 2]) * a;
      who[p] = -3;
    };
    const pX = (x, y) => eyeX + 2 * k * (x - y), pY = (x, y, z) => eyeY + k * (x + y - 2 * z);
    // a flash that lights the whole room for a moment (its colour, and how strong, falling away each tick)
    let flK = 0, flC = [1, 1, 1], flF = 0.8;
    const flashRoom = (col, f, fall) => { flC = col; flK = mx(flK, f); flF = fall; };
    const flashStep = () => {
      if (flK > 0.01) { const e = M.pow(flK, 1.2); for (let ch = 0; ch < 3; ch++) evFl[ch] = flC[ch] * e; flK *= flF; evSnap = flK > 0.2; }
      else if (flK) { flK = 0; evFl[0] = evFl[1] = evFl[2] = 0; evSnap = false; }
    };
    // (and the flash laid over the picture as added light, most on the room, which a dark room's own tones would hardly show)
    const flashDraw = () => {
      if (flK < 0.02) return;
      const e = M.pow(flK, 1.2) * 64, r0 = flC[0] * e, g0 = flC[1] * e, b0 = flC[2] * e;
      for (let p = 0, q = 0; p < G * G; p++, q += 4) { const v = vis[p], w = v < 0 || (v & 7) > 2 ? 1 : 0.5; d8[q] += r0 * w; d8[q + 1] += g0 * w; d8[q + 2] += b0 * w; who[p] = -3; }
    };
    // a top cube to strike or to set something on: high, toward the eye, and not cut away
    const strikeCell = () => {
      let best = -1, bs = -1e9;
      for (let q = 0; q < 50; q++) {
        const x = fl(evS() * N), y = fl(evS() * N), z = evTop(x, y);
        if (z < 0 || z >= N - 1) continue;
        const sc = z * 1.5 + (x + y) * 0.4 + evS() * 3;
        if (sc > bs) { bs = sc; best = z << 10 | y << 5 | x; }
      }
      return best;
    };
    // sparks: hot points thrown from a blow, falling, cooling from white to a deep red (drawn over the picture)
    const SPM = 90, spx = new Float32Array(SPM), spy = new Float32Array(SPM), spz = new Float32Array(SPM), svx = new Float32Array(SPM), svy = new Float32Array(SPM), svz = new Float32Array(SPM), sAge = new Uint8Array(SPM), sLife = new Uint8Array(SPM);
    let sn2 = 0;
    const sparkOut = (x, y, z, n, sp) => {
      for (let q = 0; q < n && sn2 < SPM; q++) {
        const p = sn2++, a = evS() * TAU, u = 0.25 + evS() * 0.75, v = sp * (0.5 + evS() * 0.7);
        spx[p] = x; spy[p] = y; spz[p] = z; svx[p] = M.cos(a) * M.sqrt(1 - u * u) * v + 0.08 * sp; svy[p] = M.sin(a) * M.sqrt(1 - u * u) * v + 0.08 * sp; svz[p] = u * v * 1.2; sAge[p] = 0; sLife[p] = 16 + fl(evS() * 22);
      }
    };
    const sparkStep = () => {
      for (let p = sn2 - 1; p >= 0; p--) {
        spx[p] += svx[p]; spy[p] += svy[p]; spz[p] += svz[p]; svz[p] -= 0.03; svx[p] *= 0.96; svy[p] *= 0.96;
        if (++sAge[p] >= sLife[p] || spz[p] < 0) { const q = --sn2; spx[p] = spx[q]; spy[p] = spy[q]; spz[p] = spz[q]; svx[p] = svx[q]; svy[p] = svy[q]; svz[p] = svz[q]; sAge[p] = sAge[q]; sLife[p] = sLife[q]; }
      }
    };
    const SPC = [[255, 252, 226], [255, 214, 110], [255, 150, 54], [214, 72, 38]];
    const sparkDraw = () => {
      const sz = mx(1, M.round(k * 0.4));
      for (let p = 0; p < sn2; p++) {
        const c3 = SPC[mn(3, fl(sAge[p] / sLife[p] * 4))], px = pX(spx[p], spy[p]), py = pY(spx[p], spy[p], spz[p]), dep = spx[p] + spy[p] + spz[p];
        for (let b = 0; b < sz; b++) for (let a = 0; a < sz; a++) evDot(px + a, py + b, c3[0], c3[1], c3[2], 1, dep);
      }
    };
    // a scorch: the faces round where something went off, darkened in clumps of texels, fading over a few seconds
    let scX = 0, scY = 0, scZ = 0, scR = 0, scT = 0;
    const SCT = 200;
    const scorchDraw = () => {
      if (scT <= 0) return;
      const f = scT / SCT, R = scR, cx = pX(scX, scY), cy = pY(scX, scY, scZ), reach = fl(3 * k * (R + 1));
      for (let py = mx(0, fl(cy - reach)); py < mn(G, cy + reach); py++) for (let px = mx(0, fl(cx - reach)), p = py * G + px; px < mn(G, cx + reach); px++, p++) {
        const v = vis[p];
        if (v < 0) continue;
        const kind = v & 7, i = v >> 3, w = uvw[p];
        let x, y, z;
        if (kind < 3) { if (aloft[i] && !lie[i]) continue; x = (i & 31) + 0.5; y = (i >> 5 & 31) + 0.5; z = (i >> 10) + 0.5; if (kind === 0) z += 0.5; else if (kind === 1) x += 0.5; else y += 0.5; }
        else { x = (i & 127) + 0.5; y = (i >> 7 & 127) + 0.5; z = (i >> 14) + 0.5; if (kind === 3) z = 0; else if (kind === 4) x = 0; else y = 0; }
        const d = hyp(x - scX, y - scY, (z - scZ) * 1.2) / R;
        if (d >= 1) continue;
        const tu = ((w & 15) * k) >> 4, tv = ((w >> 4) * k) >> 4, hh = h3((fl(x) * k + tu) >> 1, (fl(y) * k + tv + fl(z) * 7 * k) >> 1, kind + 61) & 255;
        if (hh > 255 * (1.15 - d) * f) continue;
        const q = p * 4, m = d < 0.45 ? 0.34 : 0.55;
        d8[q] = d8[q] * m + 6; d8[q + 1] = d8[q + 1] * m + 3; d8[q + 2] = d8[q + 2] * m + 12;
        who[p] = -3;
      }
    };

    if (event === 'TNT') {
      // A charge is set into the top of the build: a dark block (a cube, or eight in a big room, so it is seen) banded in
      // pale metal near its top and its foot, with a hot core that shows in a seam round its sides and in a square on its
      // top. A fuse runs from it over the tops beside it; a spark creeps along the fuse, and when it reaches the charge the
      // charge goes off: a flash that lights the room, a blow bigger and faster than a finger's, out every way, a ring and
      // a scorch round the hole; then the cubes fly home, and a while later another is set.
      let cs = 1, ph = 0, next = 50, x0 = 0, y0 = 0, z0 = 0, dir = 0, len = 0, fuse = 1, tm = 0, pos = 0;
      const cCells = [], cRoom = new Int32Array(8).fill(-1), fRoom = new Int32Array(6).fill(-1);
      let core0 = 0.3;
      // a place: tops level over the charge's width, with a run of level tops beside it for the fuse (toward the eye by choice)
      const level = (x, y, z) => { for (let b = 0; b < cs; b++) for (let a = 0; a < cs; a++) { const X = x + a, Y = y + b; if (X >= N || Y >= N || evTop(X, Y) !== z || (cs > 1 && !firm((z - 1) << 10 | Y << 5 | X))) return false; } return true; };
      const edgeX = d => DX[d] > 0 ? x0 + cs - 1 : x0, edgeY = d => DY[d] > 0 ? y0 + cs - 1 : DY[d] < 0 ? y0 : y0 + cs - 1;
      const fuseCol = (d, j) => DX[d] ? [edgeX(d) + DX[d] * j, y0 + cs - 1] : [x0 + cs - 1, edgeY(d) + DY[d] * j];
      const place = () => {
        let best = null, bs = -1e9;
        for (let q = 0; q < 80; q++) {
          const x = fl(evS() * (N - cs + 1)), y = fl(evS() * (N - cs + 1)), z = evTop(x, y);
          if (z < cs - 1 || z >= N - 1 || !level(x, y, z)) continue;
          x0 = x; y0 = y;
          let bl = 0, bd = 0;
          for (let d = 0; d < 4; d++) {
            let L = 0;
            for (let j = 1; j <= 4; j++) { const [nx, ny] = fuseCol(d, j); if (nx < 0 || ny < 0 || nx >= N || ny >= N || evTop(nx, ny) !== z) break; L = j; }
            const sc = L + (DX[d] + DY[d] > 0 ? 0.6 : 0);
            if (sc > bl) { bl = sc; bd = d; }
          }
          const sc = z * 1.4 + (x + y) * 0.45 + mn(3, bl) * 2.4 + evS() * 3;
          if (sc > bs) { bs = sc; best = [x, y, z, bd, fl(bl)]; }
        }
        return best;
      };
      const charge = v => { for (const s of cCells) evSetP(s, v); };
      // where the charge and its fuse are shown now (the room cell its plan cell looks back from, or, while a motion is
      // being laid a share at a time, the one beside that still shows it)
      const shownAt = (s, ci) => { const r = roomOf(s); if (r < 0 || ci < 0 || vox[r] === ci) return r; for (const d of [1024, -1024, 2048, -2048]) if (r + d >= 0 && r + d < 32768 && vox[r + d] === ci) return r + d; return r; };
      const where = () => {
        cCells.forEach((s, j) => { cRoom[j] = shownAt(s, EVC.case); });
        for (let j = 1; j <= len; j++) { const [x, y] = fuseCol(dir, j); fRoom[j] = roomOf(z0 << 10 | y << 5 | x); }
        const [x, y] = fuseCol(dir, 0); fRoom[0] = cRoom[(y - y0) * cs + (x - x0)];      // (the edge of the charge's own top)
      };
      evTick = () => {
        flashStep(); sparkStep();
        if (scT > 0) scT--;
        evFull = flK > 0.01 || scT > 0 || sn2 > 0;
        if (ph === 0) {
          if (evT < next || ops || falling.length || edits || nf || now === empty) return;
          cs = N >= 20 ? 2 : 1;
          let b = place();
          if (!b && cs > 1) { cs = 1; b = place(); }
          if (!b) { next = evT + 30; return; }
          [x0, y0, z0, dir, len] = b; core0 = cs === 1 ? 0.3 : 0.62;
          cCells.length = 0;
          for (let c3 = 0; c3 < cs; c3++) for (let b2 = 0; b2 < cs; b2++) for (let a = 0; a < cs; a++) cCells.push((z0 - c3) << 10 | (y0 + b2) << 5 | (x0 + a));
          charge(EVC.case); fuse = 70 + 16 * len; tm = 0; ph = 1;
          if (!moving) wait = mx(wait, fuse / 30 + 6);
          if (c.sound) c.sound.hit('noise', 0.05, { cutoff: 3800, dur: 0.25 });
        }
        if (ph === 1) {
          // (knocked out by a finger before it went off: it is gone, and another is set later)
          if (cCells.some(s => edit[s])) { charge(0); evLI = -1; evLit = false; ph = 0; next = evT + 240; return; }
          if (evIdle()) tm++;
          pos = (len + core0) * (1 - tm / fuse) - core0;
          where();
          const js = mn(len, mx(0, M.ceil(pos))), above = fRoom[js] >= 0 && (fRoom[js] >> 10) < N - 1 ? fRoom[js] + 1024 : -1, fk = 0.75 + 0.25 * (h3(tickNo, 3, 5) & 255) / 255;
          evLI = above; evLE[0] = 1.5 * fk; evLE[1] = 1.0 * fk; evLE[2] = 0.35 * fk; evLit = true; if (glowLive < 30) glowLive = 30;
          if (c.sound && tickNo % 3 === 0) c.sound.hit('noise', 0.016, { cutoff: 7200, dur: 0.12 });
          if (tm >= fuse) {
            // it goes off
            ph = 2; evLI = -1;
            const cc = cRoom[0] >= 0 ? cRoom[0] : cCells[0];
            charge(0);
            grab();
            blow(cc & 31, cc >> 5 & 31, mx(0, (cc >> 10) - (cs - 1)), 3, cs > 1 ? 1.45 : 1.35, evS);
            flashI = cc; flashT = 12; glowLive = 60;
            flashRoom([1.7, 1.2, 0.6], 1, 0.8);
            scX = (cc & 31) + cs / 2; scY = (cc >> 5 & 31) + cs / 2; scZ = (cc >> 10) + 1 - cs / 2; scR = mx(1.8, R0t * 1.15) + cs - 1; scT = SCT;
            sparkOut(scX, scY, scZ + cs / 2, 40, 0.5);
            idle = mn(idle, 30);
          }
          return;
        }
        // after: once every cube is home, the next is set a while later
        if (ph === 2) { evLit = flK > 0.05 || sn2 > 0; if (!edits && !nf && !loose && flK < 0.02) { ph = 0; next = evT + 200 + fl(evS() * 120); } }
      };
      // the charge's faces, read as one block: where on it (U across, V up its sides or along its top, 0 to 1) a pixel lies
      const casing = (p, kind, j) => {
        const w = uvw[p], u = (w & 15) / 16, v = (w >> 4) / 16, a = j % cs, b = (j / cs | 0) % cs, c3 = j / (cs * cs) | 0;
        const U = (kind === 1 ? b + u : a + u) / cs, V = (kind === 0 ? b + v : cs - 1 - c3 + v) / cs, q = p * 4;
        // (it beats faster as the spark comes nearer)
        const beat = 0.5 + 0.5 * M.sin(tm * (0.2 + 0.7 * tm / fuse)), core = kind ? V >= 0.44 && V < 0.57 : U >= 0.32 && U < 0.68 && V >= 0.32 && V < 0.68;
        const band = kind ? (V >= 0.12 && V < 0.25) || (V >= 0.76 && V < 0.89) : (U < 0.12 || U >= 0.88 || V < 0.12 || V >= 0.88);
        if (core) { d8[q] = 255; d8[q + 1] = 130 + 100 * beat; d8[q + 2] = 40 + 110 * beat; }
        else if (band) { d8[q] = d8[q] * 1.55 + 42; d8[q + 1] = d8[q + 1] * 1.55 + 40; d8[q + 2] = d8[q + 2] * 1.5 + 48; }
        else return;
        who[p] = -3;
      };
      evDraw = () => {
        if (ph === 1) {
          where();
          for (let j = 0; j < cCells.length; j++) {
            const rc = cRoom[j];
            if (rc < 0) continue;
            const x = rc & 31, y = rc >> 5 & 31, z = rc >> 10, cx = pX(x + 0.5, y + 0.5), cy = pY(x + 0.5, y + 0.5, z + 0.5);
            for (let py = mx(0, fl(cy - 2 * k - 1)); py < mn(G, cy + 2 * k + 1); py++) for (let px = mx(0, fl(cx - 2 * k - 1)), p = py * G + px; px < mn(G, cx + 2 * k + 1); px++, p++) {
              const v = vis[p];
              if (v >= 0 && (v & 7) < 3 && (v >> 3) === rc) casing(p, v & 7, j);
            }
          }
          // the fuse: a dark cord over the tops, burnt away behind the spark, a red ember just behind it (t: cells out
          // from the charge's edge; on the charge's own top it runs in to the core)
          const along = DX[dir] ? 0 : 1, sgn = DX[dir] + DY[dir];
          for (let j = 0; j <= len; j++) {
            const rc = fRoom[j];
            if (rc < 0) continue;
            const x = rc & 31, y = rc >> 5 & 31, z = rc >> 10, cx = pX(x + 0.5, y + 0.5), cy = pY(x + 0.5, y + 0.5, z + 1);
            for (let py = mx(0, fl(cy - k - 1)); py < mn(G, cy + k + 1); py++) for (let px = mx(0, fl(cx - 2 * k - 1)), p = py * G + px; px < mn(G, cx + 2 * k + 1); px++, p++) {
              const v = vis[p];
              if (v < 0 || (v & 7) !== 0 || (v >> 3) !== rc) continue;
              const w = uvw[p], a = (along ? w >> 4 : w & 15) / 16, cr = along ? w & 15 : w >> 4;
              if (cr < 5 || cr >= 11) continue;
              const t = j - 1 + (sgn > 0 ? a : 1 - a), q = p * 4;
              if (t < -core0) continue;
              if (t <= pos) { d8[q] = d8[q] * 0.3 + 14; d8[q + 1] = d8[q + 1] * 0.3 + 8; d8[q + 2] = d8[q + 2] * 0.3 + 20; }
              else if (t < pos + 0.4) { d8[q] = 236; d8[q + 1] = 92; d8[q + 2] = 40; }
              else continue;
              who[p] = -3;
            }
          }
          // the spark itself, and a few sparks thrown off it, new each tick
          const js = mn(len, mx(0, M.ceil(pos))), rc = fRoom[js];
          if (rc >= 0) {
            const off = pos - (js - 0.5), X = (rc & 31) + 0.5 + DX[dir] * off, Y = (rc >> 5 & 31) + 0.5 + DY[dir] * off, Z = (rc >> 10) + 1.05, sx = pX(X, Y), sy = pY(X, Y, Z), dep = X + Y + Z + 1, sz = mx(1, M.round(k * 0.45));
            for (let b = -sz; b < sz; b++) for (let a = -sz; a < sz; a++) evDot(sx + a, sy + b, 255, 250, 214, 1, dep);
            for (let q = 0; q < 5; q++) {
              const hh = h3(tickNo, q, 17), an = (hh & 255) / 255 * TAU, rr = (1.2 + (hh >> 8 & 7) * 0.4) * mx(1.5, k * 0.6), c3 = (hh >> 11) & 1 ? [255, 214, 96] : [255, 150, 50];
              evDot(sx + M.cos(an) * rr, sy - ab(M.sin(an)) * rr * 1.2, c3[0], c3[1], c3[2], 1, dep);
            }
          }
        }
        scorchDraw(); sparkDraw(); flashDraw();
      };
    } else if (event === 'Meteor') {
      // A glowing cube streaks down from the sky with a tail of cooling ones, strikes the top of the build with a flash,
      // throws it out, sparks fly, and it lies glowing in the crater, cooling, while the cubes fly home
      let ph = 0, next = 70, tx = 0, ty = 0, tz = 0, dx = 0, dy = 0, dz = 0, u = 0, L = 0, hit = -1, ember = 0;
      const tail = [];
      evTick = () => {
        flashStep(); sparkStep();
        if (scT > 0) scT--;
        evFull = flK > 0.01 || scT > 0 || sn2 > 0 || ph === 1;
        if (ph === 0) {
          if (evT < next || ops || falling.length || edits || nf || now === empty || !evIdle()) return;
          const s = strikeCell();
          if (s < 0) { next = evT + 30; return; }
          const rc = roomOf(s);
          if (rc < 0) { next = evT + 30; return; }
          tx = (rc & 31) + 0.5; ty = (rc >> 5 & 31) + 0.5; tz = (rc >> 10) + 1;
          // from high over the back, at a slant to one side
          const side = evS() < 0.5, l = hyp(0.42, 0.14, 1);
          dx = (side ? 0.42 : 0.14) / l; dy = (side ? 0.14 : 0.42) / l; dz = -1 / l;
          L = 0;
          while (L < 30) { const x = tx - dx * (L + 1), y = ty - dy * (L + 1), z = tz - dz * (L + 1); if (x < 0 || y < 0 || z > 31.5 || !inPic(fl(x), fl(y), fl(z))) break; L++; }
          if (L < 4) L = 4;
          u = 0; ph = 1; tail.length = 0;
          if (!moving) wait = mx(wait, 10);
        }
        if (ph === 1) {
          u += 0.6;
          const d = L - u, x = tx - dx * d, y = ty - dy * d, z = tz - dz * d;
          tail.unshift([x, y, z]); if (tail.length > 7) tail.length = 7;
          rStart();
          for (let j = tail.length - 1; j >= 0; j--) rPut(tail[j][0], tail[j][1], tail[j][2], EVC['hot' + mn(4, j === 0 ? 0 : 1 + (j >> 1))]);
          rEnd();
          evLit = true;
          if (c.sound && tickNo % 3 === 0) c.sound.note(root + 36 - fl(u / L * 12), { dur: 0.12, vel: 0.02, wave: 'sine', pan: 0 });
          if (d <= 0.5) {
            // it strikes
            rStart(); rEnd();
            const cc = fl(tz - 1) << 10 | fl(ty) << 5 | fl(tx);
            grab();
            blow(cc & 31, cc >> 5 & 31, cc >> 10, 2, 1.1, evS);
            flashI = cc; flashT = 10; glowLive = 60;
            flashRoom([1.5, 1.3, 1.0], 0.9, 0.8);
            scX = tx; scY = ty; scZ = tz - 0.5; scR = mx(1.6, R0t * 1.0); scT = SCT;
            sparkOut(tx, ty, tz, 40, 0.55);
            hit = cc; ember = 120; ph = 2;
          }
          return;
        }
        if (ph === 2) {
          // the stone lies in the crater, cooling (it is gone when a cube comes home to its place)
          if (ember > 0) {
            ember--;
            rStart(); if (ember > 0) rPut(hit & 31, hit >> 5 & 31, hit >> 10, EVC['hot' + mn(4, 1 + fl((120 - ember) / 30))]); rEnd();
          }
          evLit = ember > 0 || flK > 0.05 || sn2 > 0;
          if (!ember && !edits && !nf && !loose && flK < 0.02) { ph = 0; next = evT + 330 + fl(evS() * 150); }
        }
      };
      evDraw = () => { scorchDraw(); sparkDraw(); flashDraw(); };
    } else if (event === 'Storm') {
      // A dark cloud of cubes gathers over the build and drifts across it, shading it; rain falls from it in streaks and
      // splashes where it lands; lightning lights the room and strikes the top, knocking a few cubes loose; then it thins away
      let ph = 0, next = 45, t = 0, cx = 0, cy = 0, zc = 0, vx = 0, vy = 0, bolt = null, boltT = 0, thunder = 0, strikes = 0, dim = 0;
      const shape = [];      // [dx, dy, dz, colour, when it comes and goes (0 to 1)]
      const RM2 = 160, rx = new Float32Array(RM2), ry = new Float32Array(RM2), rz = new Float32Array(RM2), sp = [];
      let rn = 0;
      const STORM = 480;
      evTick = () => {
        flashStep();
        evDim = 1 - 0.24 * dim;
        if (ph === 0) {
          dim = mx(0, dim - 0.02);
          if (evT < next || now === empty) return;
          // its size goes with the room's; it hangs a few cells over the top of the build, low enough to be in the picture
          const a = mn(10, mx(3.5, N * 0.38)), b = a * 0.75, sd = fl(evS() * 999);
          shape.length = 0;
          for (let dzz = 0; dzz < 3; dzz++) for (let y = -fl(a) - 1; y <= a + 1; y++) for (let x = -fl(a) - 1; x <= a + 1; x++) {
            const r = (dzz === 0 ? 0.92 : dzz === 1 ? 0.78 : 0.48) - 0.32 * knot(x + 40 >> 1, y + 40 >> 1, sd + dzz);
            const e = ((x - y) * (x - y)) / (2 * a * a) + ((x + y) * (x + y)) / (2 * b * b);
            if (e < r * r) shape.push([x, y, dzz, dzz === 0 ? EVC.cloud0 : dzz === 2 || e < r * r * 0.3 ? EVC.cloud2 : EVC.cloud1, (h3(x + 50, y + 50, dzz + sd) & 255) / 255]);
          }
          let top = 0; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) top = mx(top, evTop(x, y));
          zc = mn(29, top + 4);
          const side = evS() < 0.5 ? 1 : -1;
          cx = N / 2 - side * N * 0.42; cy = N / 2 + side * N * 0.42; vx = side * N * 0.84 / STORM; vy = -vx;
          while (zc > top + 1 && !inPic(fl(N / 2), fl(N / 2), zc + 2)) zc--;
          ph = 1; t = 0; strikes = 0;
          if (!moving) wait = mx(wait, 6);
        }
        if (ph !== 1) return;
        if (evIdle() || t < 60) t++;
        const u = t / STORM, grow = mn(1, u * 6, (1 - u) * 6);
        dim = mn(1, dim + 0.02); if (u > 0.85) dim = mx(0, (1 - u) / 0.15);
        cx += vx; cy += vy;
        rStart();
        for (const [x, y, z, ci, w] of shape) if (w < grow) rPut(cx + x, cy + y, zc + z, ci);
        rEnd();
        // rain: from the cloud's underside, falling fast, a little with the wind
        if (u > 0.08 && u < 0.88) for (let q = 0; q < 3 + (N >> 3) && rn < RM2; q++) {
          const c3 = shape[fl(evS() * shape.length)];
          if (c3[2] || c3[4] >= grow) continue;
          rx[rn] = cx + c3[0] + evS(); ry[rn] = cy + c3[1] + evS(); rz[rn++] = zc - 0.05;
        }
        sp.length = 0;
        for (let p = rn - 1; p >= 0; p--) {
          rx[p] += vx * 2; ry[p] += vy * 2; rz[p] -= 0.75;
          const x = fl(rx[p]), y = fl(ry[p]), z = fl(rz[p]);
          let gone = rz[p] < 0 || x < 0 || y < 0 || x >= N || y >= N;
          if (!gone && z < N) { const i = z << 10 | y << 5 | x, v = vox[i]; if (v && !evOwn[v] && !ghost[v] && !(aloft[i] && !lie[i])) { gone = true; sp.push(rx[p], ry[p], z + 1); } }
          else if (rz[p] < 0 && x >= 0 && y >= 0) sp.push(rx[p], ry[p], 0);
          if (gone) { const q = --rn; rx[p] = rx[q]; ry[p] = ry[q]; rz[p] = rz[q]; }
        }
        if (c.sound && tickNo % 6 === 0 && u > 0.08 && u < 0.88) c.sound.hit('noise', 0.014, { cutoff: 5600, dur: 0.45 });
        // lightning: twice in a storm, the first within a few seconds
        if ((strikes === 0 && u > 0.26) || (strikes === 1 && u > 0.62)) {
          strikes++;
          let best = -1, bz = -1;
          for (let q = 0; q < 24; q++) {
            const x = fl(cx + (evS() - 0.5) * 4), y = fl(cy + (evS() - 0.5) * 4);
            if (x < 0 || y < 0 || x >= N || y >= N) continue;
            const z = evTop(x, y);
            if (z > bz) { bz = z; best = z << 10 | y << 5 | x; }
          }
          const rc = best >= 0 ? roomOf(best) : -1, X = rc >= 0 ? (rc & 31) + 0.5 : cx, Y = rc >= 0 ? (rc >> 5 & 31) + 0.5 : cy, Z = rc >= 0 ? (rc >> 10) + 1 : 0;
          // the bolt: a jagged line from the cloud down to where it strikes, and a fork off it
          // (from the cloud's underside over where it strikes)
          const x0 = pX(X, Y) + (evS() - 0.5) * 2 * k, y0 = pY(X, Y, zc), x1 = pX(X, Y), y1 = pY(X, Y, Z), n = mx(4, fl((y1 - y0) / mx(3, k * 1.6)));
          bolt = [[x0, y0]];
          for (let j = 1; j < n; j++) bolt.push([x0 + (x1 - x0) * j / n + (evS() - 0.5) * mx(4, k * 2.4), y0 + (y1 - y0) * j / n]);
          bolt.push([x1, y1]);
          const fj = 1 + fl(evS() * (n - 2)), fx = bolt[fj][0], fy = bolt[fj][1], fs = evS() < 0.5 ? -1 : 1;
          bolt.fork = [[fx, fy], [fx + fs * mx(3, k * 1.5), fy + mx(3, k * 1.8)], [fx + fs * mx(5, k * 2.2), fy + mx(6, k * 3.6)]];
          boltT = 9; thunder = 9;
          flashRoom([1.05, 1.08, 1.35], 1, 0.62);
          if (rc >= 0) { grab(); blow(rc & 31, rc >> 5 & 31, rc >> 10, 2, 0.7, evS, 14); flashI = rc; flashT = 8; glowLive = 60; sparkOut(X, Y, Z, 16, 0.4); }
        }
        if (boltT > 0) { boltT--; if (boltT === 5) flashRoom([1.05, 1.08, 1.35], 0.75, 0.6); }
        if (thunder > 0 && --thunder === 0 && c.sound) { c.sound.hit('noise', 0.3, { cutoff: 240, dur: 2.4 }); c.sound.hit('kick', 0.3); }
        sparkStep();
        evFull = true;
        if (u >= 1) { ph = 0; next = evT + 300 + fl(evS() * 90); rStart(); rEnd(); rn = 0; evFull = false; }
      };
      evDraw = () => {
        // the rain: short streaks, a little paler than what they fall over, and a splash where they land
        const L = mx(3, M.round(k * 1.7));
        for (let p = 0; p < rn; p++) {
          const px = pX(rx[p], ry[p]), py = pY(rx[p], ry[p], rz[p]);
          for (let j = 0; j < L; j++) evDot(px, py - j, 196, 212, 244, 0.5, rx[p] + ry[p] + rz[p] + j / (2 * k));
        }
        for (let j = 0; j < sp.length; j += 3) { const px = pX(sp[j], sp[j + 1]), py = pY(sp[j], sp[j + 1], sp[j + 2]), dep = sp[j] + sp[j + 1] + sp[j + 2] + 1; evDot(px - 1, py - 1, 214, 226, 250, 0.7, dep); evDot(px + 1, py - 1, 214, 226, 250, 0.7, dep); }
        // the bolt, white with a violet edge, on and off as it flickers
        if (boltT > 0 && boltT !== 6 && boltT !== 7) {
          const wd = mx(1, M.round(k / 4));
          const line = pts => {
            for (let j = 0; j + 1 < pts.length; j++) {
              const [ax, ay] = pts[j], [bx, by] = pts[j + 1], n = mx(1, M.ceil(mx(ab(bx - ax), ab(by - ay))));
              for (let q = 0; q <= n; q++) {
                const x = ax + (bx - ax) * q / n, y = ay + (by - ay) * q / n;
                for (let o = -wd - 1; o <= wd; o++) { const edge = o < -wd + 0 || o === wd; evDot(x + o, y, edge ? 200 : 255, edge ? 190 : 255, 255, edge ? 0.6 : 1); }
              }
            }
          };
          line(bolt); if (boltT > 3) line(bolt.fork);
        }
        sparkDraw(); flashDraw();
      };
    } else if (event === 'Weightless') {
      // Cubes of its top lift off one at a time, rise a few cells, and hang there, bobbing and going slowly round, then
      // settle back into their places one by one
      let ph = 0, next = 45, t = 0;
      const fs = [];      // [plan cell, colour, how high it may go, when it lifts, its phase, where it is shown]
      const RUN = 420;
      evTick = () => {
        if (ph === 0) {
          if (evT < next || ops || falling.length || edits || nf || now === empty || !evIdle()) return;
          const want2 = mn(28, mx(8, M.round(M.sqrt(cubes) * 1.2)));
          const tops = [];
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const z = evTop(x, y); if (z >= 0 && z < N - 2) tops.push(z << 10 | y << 5 | x); }
          for (let i = tops.length - 1; i > 0; i--) { const j = fl(evS() * (i + 1)), s = tops[i]; tops[i] = tops[j]; tops[j] = s; }
          fs.length = 0;
          for (const s of tops) {
            if (fs.length >= want2) break;
            if (fs.some(f => ab((f[0] & 31) - (s & 31)) + ab((f[0] >> 5 & 31) - (s >> 5 & 31)) < 2)) continue;
            let h = 0; while (h < 4 && (s >> 10) + h + 1 < N && !firm(s + (h + 1) * 1024) && !wet[s + (h + 1) * 1024]) h++;
            if (h < 2) continue;
            fs.push([s, edit[s] > 0 ? edit[s] : now.col[s], h, 0, evS() * TAU, -1]);
          }
          fs.sort((p, q) => (q[0] >> 10) - (p[0] >> 10) || ((q[0] & 31) + (q[0] >> 5 & 31)) - ((p[0] & 31) + (p[0] >> 5 & 31)));
          fs.forEach((f, j) => { f[3] = j * 7; });
          if (!fs.length) { next = evT + 60; return; }
          ph = 1; t = 0;
          if (!moving) wait = mx(wait, RUN / 30 + 3);
        }
        if (ph !== 1) return;
        if (evIdle()) t++;
        const n = fs.length;
        for (let j = 0; j < n; j++) {
          const f = fs[j], s = f[0], lift = f[3], down = RUN - 30 - (n - 1 - j) * 7 - f[2] * 8;
          let h = 0;
          if (t >= lift) h = mn(f[2], 1 + fl((t - lift) / 9));
          if (t >= down) h = mx(0, f[2] - 1 - fl((t - down) / 7));
          // (hanging, it bobs a cell and goes round a little, in its own time)
          let ox = 0, oy = 0;
          if (h === f[2]) {
            const a = f[4] + t * TAU / 200, b = M.sin(f[4] * 3 + t * TAU / 95);
            if (b < -0.55 && h > 1) h--;
            const X = M.round(M.cos(a) * 0.9), Y = M.round(M.sin(a) * 0.9), x = (s & 31) + X, y = (s >> 5 & 31) + Y, c3 = (s >> 10) + h;
            if (x >= 0 && y >= 0 && x < N && y < N && !firm(c3 << 10 | y << 5 | x) && !wet[c3 << 10 | y << 5 | x]) { ox = X; oy = Y; }
          }
          const at2 = h ? s + h * 1024 + ox + oy * 32 : -1;
          if (at2 !== f[5]) {
            if (f[5] >= 0) evSetQ(f[5], 0);
            if (at2 >= 0) evSetQ(at2, f[1]);
            if (f[5] < 0 && at2 >= 0) { evSetP(s, 255); if (c.sound) c.sound.note(root + 24 + [0, 4, 7, 11][j & 3], { dur: 0.6, vel: 0.022, wave: 'sine', pan: mx(-1, mn(1, ((s & 31) - (s >> 5 & 31)) / N)) }); }
            if (at2 < 0 && f[5] >= 0) { evSetP(s, 0); ping(s, 0.05); const rc = roomOf(s); if (rc >= 0) landed(rc, -1, true); }
            f[5] = at2;
          }
        }
        if (t >= RUN) { for (const f of fs) { if (f[5] >= 0) evSetQ(f[5], 0); evSetP(f[0], 0); } fs.length = 0; ph = 0; next = evT + 330 + fl(evS() * 120); }
      };
    } else if (event === 'Midas') {
      // A wave of gold sweeps over the build a cube at a time, its edge brightest, holds while a glint runs over it, and
      // goes back the way it came
      let ph = 0, next = 45, t = 0, cells = [], a = 0, b = 0, c2 = 0, d2 = 0;
      const IN = 140, HOLD = 100, EDGE = 0.07;
      evTick = () => {
        if (ph === 0) {
          if (evT < next || ops || falling.length || edits || nf || now === empty || !evIdle()) return;
          // every cube the eye could see, in the order the wave reaches it: across from one side, and a little from the top down
          const an = evS() * TAU, ca = M.cos(an), sa = M.sin(an), sd = fl(evS() * 999), list = [];
          for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            const s = z << 10 | y << 5 | x;
            if (!now.col[s] || edit[s]) continue;
            if (x < N - 1 && y < N - 1 && z < N - 1 && now.col[s + 1] && now.col[s + 32] && now.col[s + 1024]) continue;
            list.push([(x - N / 2) * ca + (y - N / 2) * sa - z * 0.6 + noise(x * 0.4, y * 0.4 + z * 0.3, sd) * 3, s]);
          }
          if (!list.length) { next = evT + 60; return; }
          list.sort((p, q) => p[0] - q[0]);
          const lo2 = list[0][0], span = list[list.length - 1][0] - lo2 || 1;
          cells = list.map(e => [(e[0] - lo2) / span, e[1]]);
          a = b = c2 = d2 = 0; t = 0; ph = 1;
          if (!moving) wait = mx(wait, (2 * IN + HOLD) / 30 + 3);
        }
        if (ph !== 1) return;
        if (evIdle()) t++;
        const f1 = mn(1 + EDGE, t / IN * (1 + EDGE)), f2 = t > IN + HOLD ? mn(1 + EDGE, (t - IN - HOLD) / IN * (1 + EDGE)) : 0, n = cells.length;
        // (the wave's edge shines; behind it the gold settles; as it goes back its edge shines again, and behind that is the build)
        while (a < n && cells[a][0] < f1) evSetP(cells[a++][1], EVC.shine);
        while (b < n && cells[b][0] < f1 - EDGE) evSetP(cells[b++][1], EVC.gold);
        while (c2 < n && cells[c2][0] < f2) evSetP(cells[c2++][1], EVC.shine);
        while (d2 < n && cells[d2][0] < f2 - EDGE) evSetP(cells[d2++][1], 0);
        if (t === IN + 10) shimT = 40;
        if (c.sound && tickNo % 7 === 0 && ((t < IN && a < n) || (f2 > 0 && d2 < n))) c.sound.note(root + 24 + [0, 4, 7, 12, 16][fl(t / 7) % 5], { dur: 0.9, vel: 0.02, wave: 'sine', pan: 0 });
        if (d2 >= n && t > IN + HOLD) { ph = 0; next = evT + 330 + fl(evS() * 120); }
      };
      // while it is gold, now and then a cube of it glints: a small star of light on its top, new each tick
      evDraw = () => {
        if (ph !== 1 || b <= d2) return;
        for (let q = 0; q < 7; q++) {
          const hh = h3(tickNo >> 1, q, 23), j = d2 + hh % (b - d2), rc = roomOf(cells[j][1]);
          if (rc < 0 || (rc < 31744 && vox[rc + 1024])) continue;
          const x = (rc & 31) + 0.3 + (hh >> 12 & 3) * 0.13, y = (rc >> 5 & 31) + 0.3 + (hh >> 14 & 3) * 0.13, z = (rc >> 10) + 1, px = pX(x, y), py = pY(x, y, z), dep = x + y + z + 0.5, r = mx(1, M.round(k * 0.35)) + ((hh >> 16) & 1);
          evDot(px, py, 255, 252, 230, 1, dep);
          for (let e = 1; e <= r; e++) { const a = e === r ? 0.5 : 0.85; evDot(px + e, py, 255, 246, 200, a, dep); evDot(px - e, py, 255, 246, 200, a, dep); evDot(px, py + e, 255, 246, 200, a, dep); evDot(px, py - e, 255, 246, 200, a, dep); }
        }
      };
    } else if (event === 'Fireworks') {
      // Rockets go up from the top of the build, one after another, and burst over it in spheres of coloured stars that
      // drift down, burning out from white through their colour to embers; at night they light the build
      let ph = 0, next = 36, t = 0, shots = [];
      const PM2 = 220, fx2 = new Float32Array(PM2), fy2 = new Float32Array(PM2), fz2 = new Float32Array(PM2), fvx2 = new Float32Array(PM2), fvy2 = new Float32Array(PM2), fvz2 = new Float32Array(PM2), fa = new Uint8Array(PM2), flf = new Uint8Array(PM2), fcol = new Uint8Array(PM2);
      let pn = 0;
      const rockets = [];      // [x, y, z, top, colour]
      evTick = () => {
        if (ph === 0) {
          if (evT < next || now === empty) return;
          shots = [];
          let at3 = 0;
          for (let j = 0; j < 5; j++) { shots.push([at3, fl(evS() * 5)]); at3 += 40 + fl(evS() * 30); }
          ph = 1; t = 0;
        }
        if (ph !== 1) return;
        if (evIdle() || rockets.length || pn) t++;
        while (shots.length && shots[0][0] <= t) {
          // (each from the floor in front of the build, to one side or the other, so it bursts against the build and the walls, in the picture)
          const [, hue] = shots.shift(), side = evS() < 0.5, along = 0.25 + evS() * 0.5, x0 = (side ? N - 1.5 - evS() * 2 : N * along) + 0.5, y0 = (side ? N * along : N - 1.5 - evS() * 2) + 0.5;
          const x = mn(N - 0.5, x0), y = mn(N - 0.5, y0), z = 0;
          let hi2 = 0; for (let yy = 0; yy < N; yy += 2) for (let xx = 0; xx < N; xx += 2) hi2 = mx(hi2, evTop(xx, yy));
          let top = mn(29, mx(4, fl(hi2 * 0.55 + 3 + evS() * 4))); while (top > 4 && !inPic(fl(x), fl(y), mn(31, fl(top + 4)))) top--;
          rockets.push([x, y, z, mn(30, top), hue]);
          if (c.sound) c.sound.note(root + 31, { dur: 0.5, vel: 0.016, wave: 'sine', pan: 0 });
        }
        for (let j = rockets.length - 1; j >= 0; j--) {
          const r = rockets[j];
          r[2] += 0.5;
          if (r[2] >= r[3]) {
            // it bursts
            const n = 46 + fl(evS() * 24), sp2 = 0.32 + evS() * 0.1;
            for (let q = 0; q < n && pn < PM2; q++) {
              const p = pn++, u2 = evS() * 2 - 1, an = evS() * TAU, rr = M.sqrt(1 - u2 * u2), v = sp2 * (0.75 + evS() * 0.35);
              fx2[p] = r[0]; fy2[p] = r[1]; fz2[p] = r[2]; fvx2[p] = M.cos(an) * rr * v; fvy2[p] = M.sin(an) * rr * v; fvz2[p] = u2 * v + 0.04; fa[p] = 0; flf[p] = 34 + fl(evS() * 18); fcol[p] = r[4];
            }
            const c3 = rgb([0.93, 0.12, 0.5, 0.77, 0.36][r[4]], 1, 0.62);
            flashRoom([c3[0] / 255 * 0.3, c3[1] / 255 * 0.3, c3[2] / 255 * 0.3], 0.2 + 0.6 * night, 0.82);
            evLI = mn(N - 1, fl(r[2])) << 10 | mn(N - 1, fl(r[1])) << 5 | mn(N - 1, fl(r[0])); evLE[0] = c3[0] / 255 * 2.4; evLE[1] = c3[1] / 255 * 2.4; evLE[2] = c3[2] / 255 * 2.4; glowLive = 60;
            if (c.sound) { c.sound.hit('kick', 0.2); c.sound.hit('noise', 0.05, { cutoff: 6800, dur: 0.9 }); }
            rockets.splice(j, 1);
          }
        }
        for (let p = pn - 1; p >= 0; p--) {
          fx2[p] += fvx2[p]; fy2[p] += fvy2[p]; fz2[p] += fvz2[p]; fvx2[p] *= 0.95; fvy2[p] *= 0.95; fvz2[p] = fvz2[p] * 0.95 - 0.006;
          if (++fa[p] >= flf[p]) { const q = --pn; fx2[p] = fx2[q]; fy2[p] = fy2[q]; fz2[p] = fz2[q]; fvx2[p] = fvx2[q]; fvy2[p] = fvy2[q]; fvz2[p] = fvz2[q]; fa[p] = fa[q]; flf[p] = flf[q]; fcol[p] = fcol[q]; }
        }
        if (evLI >= 0) { for (let ch = 0; ch < 3; ch++) evLE[ch] *= 0.9; if (evLE[0] + evLE[1] + evLE[2] < 0.1) evLI = -1; else if (glowLive < 30) glowLive = 30; }
        flashStep();
        rStart();
        for (const r of rockets) { rPut(r[0], r[1], r[2], EVC.rocket); rPut(r[0], r[1], r[2] - 1, EVC['star' + r[4] + 'c']); }
        for (let p = 0; p < pn; p++) { const u2 = fa[p] / flf[p]; rPut(fx2[p], fy2[p], fz2[p], EVC['star' + fcol[p] + (u2 < 0.3 ? 'a' : u2 < 0.75 ? 'b' : 'c')]); }
        rEnd();
        evLit = pn > 0 || rockets.length > 0;
        evFull = evLit || flK > 0.01;
        if (!shots.length && !rockets.length && !pn) { ph = 0; next = evT + 450 + fl(evS() * 150); evLI = -1; }
      };
    } else if (event === 'Aurora') {
      // By moonlight, now and then, curtains of light hang on the walls (or in the dark round a build in a void): bands
      // that ripple slowly, in hard steps of green, teal and violet, brightest at their lower edge, lighting the room a little
      let t = 0, lev = 0;
      const ON = 480, PER = 690, sd = fl(evS() * 999);
      const SN = 1024, edge = new Float32Array(SN), ray = new Float32Array(SN);
      const AC = [[0, 0, 0], [70, 84, 210], [34, 204, 150], [170, 255, 206]], AA = [0, 0.32, 0.46, 0.6];
      let s0 = 0, sK = 1, zLo = 0, zH = 1;
      evTick = () => {
        t = (t + 1) % PER;
        const u = t < 15 ? -1 : (t - 15) / ON;
        lev = u < 0 || u > 1 ? 0 : mn(1, u * 6, (1 - u) * 6);
        evFull = lev > 0;
        for (let ch = 0; ch < 3; ch++) evFl[ch] = [0.015, 0.1, 0.07][ch] * lev;
      };
      evDraw = () => {
        if (lev <= 0) return;
        // along the walls (s: from the far left round to the far right, in texels), where each curtain's lower edge is and how bright its rays are
        const T = tickNo / 30;
        s0 = -N * k - 2; sK = 1; zLo = N * 0.42; zH = N * 0.5;
        for (let j = 0; j < SN; j++) {
          const s = (j + s0) / k;
          edge[j] = zLo + 1.6 * M.sin(s * 0.23 + T * 0.21) + 1.1 * M.sin(s * 0.57 - T * 0.13 + sd);
          const s2 = fl(s * 2) / 2, r = 0.5 + 0.3 * M.sin(s2 * 2.1 + 2.6 * M.sin(s2 * 0.19 + T * 0.17)) + 0.22 * M.sin(s2 * 0.47 - T * 0.29 + sd * 0.7);      // (in rays two texels wide)
          ray[j] = r * lev;
        }
        for (let p = 0, py = 0, px = 0; p < G * G; p++) {
          const v = vis[p];
          let s, z;
          if (v < 0) { if (room !== 'Void') { if (++px === G) { px = 0; py++; } continue; } s = (px - eyeX) / (2 * k) * 1.2; z = (eyeY - py) / (2 * k) + N * 0.25; }
          else {
            const kind = v & 7;
            if (kind < 4) { if (++px === G) { px = 0; py++; } continue; }
            const i = v >> 3, w = uvw[p];
            z = (i >> 14) + (w >> 4) / 16; s = kind === 4 ? -((i >> 7 & 127) + (w & 15) / 16) : (i & 127) + (w & 15) / 16;
          }
          if (++px === G) { px = 0; py++; }
          const j = fl(s * k) - s0;
          if (j < 0 || j >= SN) continue;
          const zq = fl(z * k) / k, h = (zq - edge[j]) / zH;
          if (h < 0 || h > 1) continue;
          const L = fl(ray[j] * (1.25 - h) * 3.2);
          if (L <= 0) continue;
          // (light laid over the wall: on a dark wall it is a light, on a pale one its colour)
          const l3 = mn(3, L), c3 = AC[l3], q = p * 4, a = AA[l3];
          d8[q] += (c3[0] - d8[q]) * a + c3[0] * a * 0.4; d8[q + 1] += (c3[1] - d8[q + 1]) * a + c3[1] * a * 0.4; d8[q + 2] += (c3[2] - d8[q + 2]) * a + c3[2] * a * 0.4;
          who[p] = -3;
        }
      };
    } else if (event === 'Tree') {
      // A sapling sprouts on the top of the build (or on the floor beside it, where there is no room over it) and grows a
      // cell at a time into a tree: its trunk rises and branches and thickens, clumps of leaves fill out round the tips; it
      // blossoms, bears fruit, its leaves turn and fall, it stands bare, and its leaves come again. It is a part of the
      // picture, lit and shadowed as the build is, and rides on it as it moves
      const tc = [];      // [dx, dy, dz, what it is (0 trunk, 1 limb, 2 leaf, 3 thickening), colour, when it grows, its clump]
      let rx = 0, ry = 0, base = 0, onTop = true, grown = 0, gEvery = 8, gTick = 0, yearT = -1, tH = 4, budS = -1;
      const YEAR = 1700;
      const make = () => {
        const H = mn(9, mx(4, M.round(N * 0.32)));
        // where: a column of the top with room over it for a tree, near the middle of the build (the middle of all for one that turns)
        let best = -1, bs = -1e9, cxm = 0, cym = 0, cn = 0;
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (evTop(x, y) >= 0) { cxm += x; cym += y; cn++; }
        cxm = cn ? cxm / cn : N / 2; cym = cn ? cym / cn : N / 2;
        if (spins) { cxm = N / 2 - 0.5; cym = N / 2 - 0.5; }
        for (let q = 0; q < 120; q++) {
          const x = q < 100 ? fl(evS() * N) : fl(cxm), y = q < 100 ? fl(evS() * N) : fl(cym), z = evTop(x, y);
          if (z < 0 || N - 1 - z < H + 3) continue;
          const sc = z * 0.8 - hyp(x - cxm, y - cym) * (spins ? 3 : 1.2) + evS() * 2;
          if (sc > bs) { bs = sc; best = y << 5 | x; }
        }
        onTop = best >= 0;
        if (!onTop) {
          // the floor beside it: a spot clear of the build two cells round, toward the eye
          for (let q = 0; q < 160; q++) {
            const x = 1 + fl(evS() * (N - 2)), y = 1 + fl(evS() * (N - 2));
            let clear = true;
            for (let yy = mx(0, y - 2); yy <= mn(N - 1, y + 2) && clear; yy++) for (let xx = mx(0, x - 2); xx <= mn(N - 1, x + 2) && clear; xx++) if (evTop(xx, yy) >= 0 || home.col[yy << 5 | xx]) clear = false;
            if (!clear) continue;
            const sc = (x + y) * 0.5 - ab(x - y) * 0.6 + evS() * 3;
            if (sc > bs) { bs = sc; best = y << 5 | x; }
          }
          if (best < 0) best = (N - 2) << 5 | (N - 2);
        }
        rx = best & 31; ry = best >> 5; base = evTop(rx, ry) + 1;
        const room2 = N - base, h = mn(H, mx(3, room2 - 3)), add = (dx, dy, dz, kind, col, when, cl) => tc.push([dx, dy, dz, kind, col, when, cl]);
        for (let z = 0; z < h; z++) add(0, 0, z, 0, EVC.bark, z * 10, -1);
        // limbs: two to four, from the upper half of the trunk, out and up
        const nb = mn(4, 2 + (N >= 20 ? 1 : 0) + (evS() < 0.5 ? 1 : 0)), DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]], tips = [[0, 0, h, h * 10, mn(3.2, mx(1.9, N * 0.12))]];
        const d0 = fl(evS() * 8);
        for (let j = 0; j < nb; j++) {
          const [ddx, ddy] = DIRS[(d0 + j * 3) % 8], hz = mx(1, fl(h * 0.45) + fl(evS() * mx(1, h * 0.45))), len = 2 + (evS() < 0.5 ? 1 : 0) + (N >= 24 ? 1 : 0);
          let x = 0, y = 0, z = hz;
          for (let st = 1; st <= len; st++) { x += ddx; y += ddy; if (st & 1) z++; add(x, y, z, 1, EVC.limb, hz * 10 + 6 + st * 8, -1); }
          tips.push([x, y, z + 1, hz * 10 + 6 + len * 8, mn(2.5, mx(1.5, N * 0.09))]);
        }
        // clumps of leaves round the tips: full in the middle, gaps in clumps of cells toward the rim; each clump one green, its upper half the paler
        const own2 = new Map();
        tips.forEach(([tx, ty, tz, tw, r], cl) => {
          const g0 = cl % 2;
          for (let dz = -fl(r); dz <= r; dz++) for (let dy = -M.ceil(r); dy <= r; dy++) for (let dx = -M.ceil(r); dx <= r; dx++) {
            const d = hyp(dx, dy, dz * 1.3) / r;
            if (d >= 1) continue;
            const X = tx + dx, Y = ty + dy, Z = tz + dz;
            if (d > 0.5 && (h3((X + 40) >> 1, (Y + 40) >> 1, ((Z + 40) >> 1) + sdT) & 255) < 70) continue;
            const key = X * 4096 + Y * 64 + Z;
            if (own2.has(key)) continue;
            own2.set(key, 1);
            add(X, Y, Z, 2, dz > 0 ? (g0 ? EVC.leaf2 : EVC.leaf1) : (g0 ? EVC.leaf1 : EVC.leaf0), tw + 4 + d * 22 + (h3(X + 40, Y + 40, Z + 9) & 7), cl);
          }
        });
        // the trunk thickens at its foot, late
        if (N >= 16) for (let z = 0; z < mx(1, fl(h * 0.35)); z++) for (const [dx, dy] of [[1, 0], [0, 1]]) add(dx, dy, z, 3, EVC.bark, h * 10 + 40 + z * 8, -1);
        // (a cell of wood wins over a leaf in the same place)
        const seen2 = new Set();
        tc.sort((p, q) => (p[3] === 2) - (q[3] === 2) || p[5] - q[5]);
        const keep = tc.filter(e => { const key = e[0] * 4096 + e[1] * 64 + e[2]; if (seen2.has(key)) return false; seen2.add(key); return true; });
        tc.length = 0; for (const e of keep) tc.push(e);
        tc.sort((p, q) => p[5] - q[5]);
        // (the colour it has now, and whether it is a leaf on the outside of its clump, open to the sky)
        tc.forEach(e => { e[7] = e[4]; e[8] = e[3] === 2 && !seen2.has(e[0] * 4096 + e[1] * 64 + e[2] + 1); });
        tH = h;
        gEvery = mn(20, mx(5, M.round(2000 / tc.length)));
      };
      const sdT = fl(evS() * 999);
      const cellOf = e => { const x = rx + e[0], y = ry + e[1], z = base + e[2]; return x >= 0 && y >= 0 && z >= 0 && x < N && y < N && z < N ? z << 10 | y << 5 | x : -1; };
      const showAll = on => { for (let j = 0; j < grown; j++) { const e = tc[j], s = cellOf(e); if (s >= 0) { evQ[s] = on && e[7] ? e[7] : 0; evShow(s); } } };
      // leaves falling: each a cell drifting down with a little sway, lying a moment where it lands
      const lf = [];
      let made = false;
      evTick = () => {
        if (!made) { if (now === empty || evT < 30) return; make(); made = true; }
        evT2++;
        // it rides on the build: when the top under it rises or falls, so does it
        if (evT2 % 15 === 0) {
          // (it stands on what is under its foot: lifted where the build has grown into it, let down where that has gone)
          let b = base;
          const F = z => firm(z << 10 | ry << 5 | rx);
          if (b < N && F(b)) { while (b < N && F(b)) b++; } else while (b > 0 && !F(b - 1)) b--;
          if (b !== base && b < N - 2 && !ops && !falling.length) { showAll(false); if (budS >= 0) { evSetQ(budS, 0); budS = -1; } base = b; }
          showAll(true);      // (and what the builder has laid over it is put right)
        }
        // growing: a cell at a time, the tip of the trunk a bud while it rises
        if (grown < tc.length) {
          if (++gTick >= gEvery) {
            gTick = 0;
            const e = tc[grown++], s = cellOf(e);
            if (s >= 0) evSetQ(s, e[7]);
            if (e[3] === 0) { budS = -1; const s2 = cellOf([0, 0, e[2] + 1]); if (s2 >= 0 && e[2] + 1 < tH) { evSetQ(s2, EVC.bud); budS = s2; } }
            if (grown === tc.length) yearT = 0;
          }
        } else if (yearT >= 0) {
          yearT = (yearT + 1) % YEAR;
          const y2 = yearT, leaves = [];
          for (let j = 0; j < tc.length; j++) if (tc[j][3] === 2) leaves.push(j);
          const setC = (j, ci) => { const e = tc[j]; if (e[7] === ci) return; e[7] = ci; const s = cellOf(e); if (s >= 0) evSetQ(s, ci); };
          const hj = j => (h3(j, sdT, 77) & 1023) / 1024;
          // the year: summer, blossom, fruit, autumn, the fall, bare, the leaves come again
          if (y2 < 240) { /* summer */ }
          else if (y2 < 520) {
            // blossom opens over the outer leaves, then goes, leaving a few fruit under the clumps
            const u = (y2 - 240) / 280;
            for (const j of leaves) {
              const e = tc[j], hh = hj(j);
              if (e[8] && hh < 0.42) setC(j, u > hh * 0.6 && u < 0.62 + hh * 0.5 ? (hh < 0.2 ? EVC.bloom0 : EVC.bloom1) : hh < 0.07 && u > 0.8 ? EVC.fruit : e[4]);
            }
          }
          else if (y2 < 760) { /* full, with fruit */ }
          else if (y2 < 1000) {
            // the leaves turn: yellow, orange, red, each in its own time
            const u = (y2 - 760) / 240;
            for (const j of leaves) { const e = tc[j]; if (e[7] === EVC.fruit) continue; const hh = hj(j) * 0.6; setC(j, u < hh ? e[4] : u < hh + 0.15 ? EVC.fall0 : u < hh + 0.3 ? EVC.fall1 : EVC.fall2); }
          }
          else if (y2 < 1360) {
            // and fall
            const u = (y2 - 1000) / 330;
            for (const j of leaves) {
              const e = tc[j];
              if (!e[7] || hj(j + 7) > u) continue;
              const s = cellOf(e);
              if (s >= 0 && lf.length < 40) lf.push([rx + e[0] + 0.5, ry + e[1] + 0.5, base + e[2] + 0.5, e[7], 0, -1, hj(j) * TAU]);
              setC(j, 0);
            }
          }
          else if (y2 < 1500) { /* bare */ }
          else {
            // the leaves come again, a bud first, from the middle of each clump out
            const u = (y2 - 1500) / 190;
            for (const j of leaves) { const e = tc[j], w = (e[5] - tc[0][5]) / (tc[tc.length - 1][5] - tc[0][5] + 1) * 0.5 + hj(j) * 0.3; setC(j, u < w ? 0 : u < w + 0.12 ? EVC.bud : e[4]); }
          }
        }
        // leaves on their way down
        for (let j = lf.length - 1; j >= 0; j--) {
          const L = lf[j];
          let s = -1;
          if (L[4] > 0) { if (--L[4] === 0) { if (L[5] >= 0 && evQ[L[5]] === L[3]) evSetQ(L[5], 0); lf.splice(j, 1); } continue; }
          L[6] += 0.11;
          const nx = L[0] + M.cos(L[6]) * 0.05, ny = L[1] + M.sin(L[6] * 0.8) * 0.04, nz = L[2] - 0.065;
          const x = fl(nx), y = fl(ny), z = fl(nz);
          if (nz < 0 || x < 0 || y < 0 || x >= N || y >= N) L[4] = 40;
          else { s = z << 10 | y << 5 | x; if (firm(s) || (evQ[s] && s !== L[5])) L[4] = 40; else { L[0] = nx; L[1] = ny; L[2] = nz; if (s !== L[5]) { if (L[5] >= 0 && evQ[L[5]] === L[3]) evSetQ(L[5], 0); evSetQ(s, L[3]); L[5] = s; } } }
        }
      };
      let evT2 = 0;
    }

    rise();
    const tick = () => {
      if (rang > 0) rang--;
      if (thud > 0) thud--;
      tickNo++;
      if (evTick) { if (evIdle()) evT++; evTick(); }
      if (shimT > 0) shimT--;
      if (flashT > 0) flashT--;
      if (blowT > 0) blowT--;
      if (hotT > 0) hotT--;
      if (ringT > 0) ringT--;
      if (spN) { let keep = 0; for (let q = 0; q < spN; q++) { const j = spL[q]; if (spark[j] > 0 && --spark[j] > 0) spL[keep++] = j; } spN = sparks = keep; }
      if (thN) { let keep = 0; for (let q = 0; q < thN; q++) { const j = thL[q]; if (thump[j] > 0 && --thump[j] > 0) thL[keep++] = j; } thN = keep; }
      // (each cube of a line just down glints for two ticks in its turn, the first on the off-beat after it lands)
      if (glN) { let keep = 0; for (let q = 0; q < glN; q++) { const j = glL[q], d = --glD[q]; gleam[j] = d <= 0 && d > -2 ? 1 : 0; if (d > -2) { glL[keep] = j; glD[keep++] = d; } } glN = keep; gleams = keep; }
      hours();
      if (wispN && (tickNo & 1)) drift();
      // (while cubes fly, all three colours are worked out together, every other tick, so no colour runs ahead of the others)
      if (glowLive > 0) { if (!nf) glowStep(); else if (tickNo & 1) { glowStep(); glowStep(); glowStep(); } if (--glowLive === 0) { GR.fill(0); GG.fill(0); GB.fill(0); } }
      if (falling.length && (tickNo & 1) && !(ops && !moving)) fall(0);
      if (ops) {
        spent += 1 / 30;
        const u = spent / span;
        if (!moving && opAt < ops && opU[opAt] <= u) {
          // a beat: what hung a cell over its place settles into it (or, taken away, is gone), and the next line comes,
          // each cube of it shown a cell over its place (or, from a height, dropped) to settle in the beat after
          if (falling.length) fall(0);
          const n0 = falling.length;
          while (opAt < ops && opU[opAt] <= u) {
            const i = opI[opAt], col = opC[opAt++], z = i >> 10, was = vox[i];
            if (shownAs[i]) { shownAs[i] = 0; setCube(i, col); }
            else if (col) { if (!was) fallIn(i, col); else setCube(i, col); }
            else { setCube(i, 0); ping(i, 0.045); if (was && z < N - 1 && !vox[i + 1024]) { setCube(i + 1024, was); shownAs[i + 1024] = 1; falling.push([i, 0, z + 1, 1]); } }
          }
          fall(n0);
        }
        while (moving && opAt < ops && opU[opAt] <= u) {
          const i = opI[opAt], col = opC[opAt++];
          if (shownAs[i]) { shownAs[i] = 0; setCube(i, col); }                 // a real cube takes the place of a falling one's picture
          else if (col && dropped && !vox[i]) fallIn(i, col);
          else { setCube(i, col); if (col && !moving) ping(i, 0.14); }
        }
        if (opAt >= ops && u >= 1) { ops = 0; wait = moving ? 0 : nextWait; if (!moving) rise(); }
        return;
      }
      if (falling.length) return;
      if (nf) fliers();
      inAir = nf > 0;
      // while the pointer is down, or cubes are out of place, it holds still
      const busy = pressed > 0 || nf > 0 || edits > 0 || sN > 0;
      if (wasBusy && !busy) { if (!moving) { wait = mx(wait, 5); shimT = 40; } if (dents) { dent.fill(0); dents = 0; } }      // just mended: the last one home rings it, and it stands a little longer
      wasBusy = busy;
      if ((edits > 0 || sN > 0) && !pressed && quiet > 36 && !loose) mend();
      if (moving) {
        // a restless one re-plans every beat; while it is being played with, or has liquid on it, it is posed directly so it can answer
        const was = touched;
        touched = busy || wn > 0 || tapN > 0;
        if (!touched) {
          if (was) { calm(); chN = chAt = 0; }
          if ((wait -= 1 / 30) > 0) return;
          beatNo += 0.5; now = plan(0); shiftTo(now, beat);
          if (!ops) wait = beat;
          return;
        }
        if (!busy && tickNo % 6 === 0) { beatNo += 0.5; now = plan(0); }
      } else {
        // its motion eases out in the last moments of its stand, and it changes only once it stands still and square
        amp = wait > 2.6 ? mn(1, amp + 1 / 75) : mx(0, amp - 1 / 75); rest = amp > 0 || chAt < chN ? 0 : rest + 1;
        const qt = tau * ab(spinW) / (M.PI / 2), square = motion !== 'Turning' || (fl(qt) & 3) === 0 && qt - fl(qt) > 0.1 && qt - fl(qt) < 0.8;
        if ((wait -= 1 / 30) <= 0 && !busy && (idle > 90 || wait < -20) && rest > 3 && square) {
          // its time is up, and nobody is playing with it: the next build begins
          // (what runs over it is left to run dry, and the pool at its foot to lie, while the build changes under them)
          tapN = 0; chN = chAt = 0; calm();
          if (dry) dryClear();
          const was = now;
          // it grows out of itself and goes back the way it grew (a rebuilt one by one growth and back, each time another;
          // a reworked one by several, one on another, and then back to what it was)
          nextWait = stand;
          if (was.gap) { now = life === 'Rebuilt' ? home : plans[stage]; shiftTo(now, 0, was.key); }
          else if (life === 'Rebuilt') { const g = was.grown ? home : grow(home, cycle++); if (g) { now = g; shiftTo(now, 6, (was.grown ? was : g).key); } }
          else {
            const next = (stage + 1) % stages, g = next ? plans[next] || (plans[next] = grow(plans[next - 1], next)) : home;
            if (g) { stage = next; now = g; shiftTo(now, 6, (next ? g : was).key); }
          }
          // a form with no room to grow has a part taken down and put back instead
          if (now === was || !ops) { now = gapOf(was.grown ? home : was, cycle++); shiftTo(now, 0, now.key); nextWait = 1.2; }
          if (!ops) { wait = nextWait; rise(); }
          return;
        }
        if (!busy) tau += 1 / 30;
      }
      // what runs moves a cell every so many ticks (four times as often while a spring is held); once no spring is open, what
      // is left runs dry at twice the pace
      if (tickNo % (tapN ? mx(1, every >> 2) : fed ? every : mx(2, every >> 1)) === 0 && (wn || tapN || motion === 'Flooding' || seep)) run();
      if (!moving && tickNo % 15 === 0) mereStep();
      if (dry && now !== empty) dryTick();
      // where what falls lands on something: rings run out over the liquid lying there
      if ((tickNo & 1) === 0) { lands = 0; for (let q = 0; q < wn && lands < 4; q++) { const s = wl[q]; if (wet[s] === FALL && (s < 1024 || floorAt(s - 1024))) { landX[lands] = (s & 31) + 0.5; landY[lands] = (s >> 5 & 31) + 0.5; landZ[lands++] = (s >> 10) + (lift[s & 1023] | 0); } } }
      if ((tickNo & 3) === 0 && (sn || motion === 'Settling') && now !== empty) snow();
      if (chAt >= chN && (tickNo & 1)) { strike(); pose(); }
      drain();
    };

    let owed = 0, beatTick = 0;
    const LOOK = 6000;                                 // how many pixels a frame may look at again, besides those that must be
    return (t, dt) => {
      owed += mn(0.2, dt || 0);
      const ptr = c.input, taps = ptr && ptr.taps ? ptr.taps() : [];
      while (owed >= 1 / 30) {
        owed -= 1 / 30; idle++; quiet++;
        if ((++beatTick & 3) === 0) clock = clock + 1 & 31;
        sweep = sweep - 2 & 511; slow = (slow + 1) % 120;
        // a pointer that only passes over does nothing; held down, a spring opens under it
        pressed = ptr && ptr.inside && ptr.down ? pressed + 1 : 0;
        if (pressed) {
          idle = quiet = 0;
          if (pressed === 1) { grab(); if (!moving) wait = mx(wait, 6); }
          if (pressed > 5) { if (dry) dryHold(ptr.x, ptr.y); else pour(ptr.x, ptr.y); }
        }
        tick();
      }
      for (const tp of taps) { if (dry) dryTap(tp.x, tp.y); burst(tp.x, tp.y); idle = quiet = 0; if (!moving) wait = mx(wait, 6); }
      look(nf ? 0 : LOOK);                             // (while cubes are in the air every marked pixel is looked at, so none is drawn half)
      show(evSnap ? 1 : nf ? 0.85 : 1 - M.exp(-18 * mn(0.1, mx(0.008, dt || 0.033))));    // softly, except while cubes are in the air
    };
  },
});
