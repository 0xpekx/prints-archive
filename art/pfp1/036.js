// Gremlin Works: from D:/code/synaesthesia/public/drop03/pieces/036.js (import-pfp.mjs), wrapped to get the runtime as Proto
;(function (Proto) {
// Gremlin Works: cartoon gremlins with their loot, drawn as pixel-art portraits
// on a 64-cell grid. Every part is filled cell by cell in a small ramp (shadow,
// base, light), outlined one cell wide in ink, and dithered on its shadow side
// where the old pen used to hatch; eyes, teeth, nostrils and claws are placed by
// hand. Each hash is a new gremlin with its own head shape, hide, ears, horns,
// eyes, nose, grin, hair, headgear, outfit, loot and pet.
// The first rolls keep their original per-draw FNV values; the variety added
// later rolls from a Park-Miller stream on the hash's tail, and the legendaries
// and the coveted jar from a Weyl-murmur stream of their own.
(() => {
  Proto.add({
    num: 36,
    name: 'Gremlin Works',
    fam: 'Creatures & Monsters',
    recipe: 'Cartoon gremlins as pixel-art portraits on a 64-cell grid: one-cell ink outlines, stepped shading with a dither on the shadow side, each one clutching something it took apart. Head shape, build, how it holds its loot, hide and its markings, ears, horns, eyes, nose, grin, hair, headgear, outfit, loot, a pet and the workshop backdrop vary, with rare gold hides, light-bulb heads and tiny rockets; legendary ones are a clockwork automaton seen through a thermal camera, phantoms on a haunted night, or the Scrap King in an illuminated initial.',
    interactive: 'Hover to make it jumpy. Tap to startle it.',
    music: true,
    seed: 788,
    fps: 24,
    make(c) {
      const S = c.size, ctx = c.ctx, H = c.hash, N = 64, NN = N * N;

      // every draw hashes the hash string afresh with a counter (FNV-1a + avalanche)
      let drawNo = 0;
      const roll = () => {
        drawNo++;
        let h = 0x811c9dc5 ^ Math.imul(drawNo, 0x9E3779B1);
        for (let i = 2; i < H.length; i++) h = Math.imul(h ^ H.charCodeAt(i), 16777619);
        h ^= h >>> 16; h = Math.imul(h, 0x7feb352d); h ^= h >>> 15; h = Math.imul(h, 0x846ca68b); h ^= h >>> 16; return (h >>> 0) / 4294967296;
      };
      const within = (a, b) => a + (b - a) * roll();
      const pickOne = (spec, from) => {
        const parts = spec.split('|').map(q => q.split(':')), r0 = from || roll;
        let sum = 0; for (const q of parts) sum += +q[1];
        let r = r0() * sum;
        for (const q of parts) { r -= +q[1]; if (r < 0) return q[0]; }
        return parts[0][0];
      };

      // ---------- the original rolls, in their original order ----------
      let hide = pickOne('Sludge:24|Rust:20|Bruise:18|Oil Blue:16|Mustard:14|Bubblegum:5|Chrome:3');
      let ears = pickOne('Bat:30|Torn:22|Floppy:20|Feelers:16|Tiny:12');
      let eyes = pickOne('Wide:30|Mismatched:24|Squint:20|Goggles:18|Monocle:8');
      const eyes0 = eyes;
      let grin = pickOne('Sawtooth:30|Buck Teeth:22|Gap:18|Tongue:18|Braces:7|Gold Grill:5');
      let hair = pickOne('Tufts:30|Mohawk:22|Bald:20|Wild:20|Sprout:8');
      let outfit = pickOne('Nothing:28|Overalls:24|Aviator Scarf:22|Raincoat:16|Bow Tie:10');
      let loot = pickOne('Wrench:24|Screwdriver:20|Chewed Wire:18|Fork:16|Spark Plug:14|Rubber Chicken:6|Lit Fuse:2');
      let backdrop = pickOne('Halftone:28|Blueprint:22|Hazard:18|Static:16|Burst:16');
      let hx = 0.5 + within(-0.03, 0.03), hy = within(0.45, 0.5), hrx = within(0.19, 0.23), hry = within(0.15, 0.18);
      const lumps = [within(0, 6), within(0.01, 0.02), within(2, 4) | 0];
      let earSpan = within(0.22, 0.3); const earLift = within(0.12, 0.22);
      const tilt = within(-0.08, 0.08);
      const eyeL = within(0.045, 0.06);
      let eyeRr = eyes0 === 'Mismatched' ? within(0.025, 0.035) : eyeL;
      let mouthW = within(0.12, 0.16), mouthOpen = within(0.04, 0.07);
      roll();  // the old tooth count, kept so later rolls stay put
      const outfitHue = pickOne('#3a6fb0:1|#c2453a:1|#3c8c5a:1|#d9a93a:1|#7a4fa0:1');
      const tufts = []; for (let ti = 0; ti < 9; ti++) tufts.push([roll(), roll()]);
      const dots = []; for (let di = 0; di < 40; di++) dots.push([roll(), roll(), roll()]);
      const blinkGap = within(2.8, 4.5), blinkOff = within(0, 3);

      // ---------- the new variety: Park-Miller on the hash's last words ----------
      let pm = ((parseInt(H.slice(50, 58), 16) ^ parseInt(H.slice(58, 66), 16)) >>> 0) % 2147483646 + 1;
      const lehmer = () => { pm = pm * 48271 % 2147483647; return (pm - 1) / 2147483646; };
      for (let lw = 0; lw < 2298; lw++) lehmer();
      const swap = (p, spec) => { const a = lehmer(), b = pickOne(spec, lehmer); return a < p ? b : null; };
      hide = swap(0.32, 'Moss:22|Ash Grey:18|Tangerine:18|Teal:18|Plum:14|Glow:6|Gold:4') || hide;
      ears = swap(0.3, 'Satellite:26|Long Droop:30|Bandaged:22|Fins:22') || ears;
      eyes = swap(0.34, 'Bloodshot:26|Sleepy:26|Spiral:18|Cyclops:20|Three Eyes:10') || eyes;
      grin = swap(0.32, 'Underbite:30|Snaggletooth:30|Grimace:26|Zipper:14') || grin;
      hair = swap(0.26, 'Comb-Over:32|Pigtails:26|Pompadour:28|Unibrow:14') || hair;
      outfit = swap(0.36, 'Hoodie:22|Lab Coat:20|Leather Jacket:18|Hawaiian Shirt:16|Patched Sweater:18|Tuxedo:6') || outfit;
      loot = swap(0.42, 'Light Bulb:16|Magnet:16|Gear:16|Battery:14|Plunger:12|Duct Tape:14|Golden Gear:5|Tiny Rocket:5') || loot;
      backdrop = swap(0.34, 'Pegboard:28|Circuit Board:26|Brick Alley:26|Oil Rainbow:12|Moon Night:8') || backdrop;
      const shape = pickOne('Spud:26|Pear:16|Wedge:16|Block:12|Bean:10|Long:12|Onion:8', lehmer);
      const build = pickOne('Scrawny:30|Hunched:30|Stocky:25|Potbelly:15', lehmer);
      const nose = pickOne('Snout:30|Hook:18|Bulb:18|Pig:14|Button:12|Long Pointy:8', lehmer);
      const horns = pickOne('None:46|Nubs:16|Ram Curls:10|Single Horn:8|Broken Horn:10|Light Bulb:4|Antenna Bolt:6', lehmer);
      let hat = pickOne('None:44|Welding Mask:10|Propeller Cap:9|Hard Hat:9|Bucket:6|Paper Hat:7|Headlamp:8|Foil Hat:5|Traffic Cone:2', lehmer);
      const marks = pickOne('None:44|Warts:14|Freckles:12|Stitches:10|Plaster:10|Spots:10', lehmer);
      let pet = pickOne('None:62|Bolt Bug:10|Dangling Spider:8|Moth:8|Pet Rock:8|Mini Gremlin:4', lehmer);
      const hue2 = pickOne('#e05a3a:1|#3aa0d0:1|#e8c03a:1|#5ab04a:1|#c05ab0:1|#f2ede0:1', lehmer);
      const extra = []; for (let ei = 0; ei < 24; ei++) extra.push([lehmer(), lehmer(), lehmer()]);

      // ---------- legendaries and the coveted jar: a Weyl sequence through murmur's finaliser ----------
      let wy = parseInt(H.slice(26, 34), 16) >>> 0;
      const weyl = () => { wy = (wy + 0x9E3779B9) >>> 0; let z = wy ^ (wy >>> 16); z = Math.imul(z, 0x85ebca6b); z ^= z >>> 13; z = Math.imul(z, 0xc2b2ae35); z ^= z >>> 16; return (z >>> 0) / 4294967296; };
      weyl(); weyl();
      const lr = weyl(), lk = weyl();
      const legend = lr < 1 / 420 ? (lk < 0.36 ? 'Clockwork' : lk < 0.7 ? 'Phantom' : 'Scrap King') : null;
      const jar = weyl() < 0.005;
      const flyPh = [weyl(), weyl(), weyl(), weyl(), weyl(), weyl()].map(v => v * 6.283);
      if (jar) loot = 'Jar of Fireflies';
      if (legend === 'Scrap King') { hat = 'None'; if (hair === 'Pompadour' || hair === 'Mohawk' || hair === 'Sprout') hair = 'Tufts'; }
      if (legend === 'Clockwork') hide = 'Steel';
      if (legend === 'Phantom') hide = 'Ectoplasm';
      // the pose rolls last, from a stream of its own on the hash's second word, so every other trait keeps its value
      let ps = (parseInt(H.slice(10, 18), 16) ^ 0x6a09e667) >>> 0;
      const prand = () => { ps = (ps + 0x9E3779B9) >>> 0; let z = ps; z = Math.imul(z ^ (z >>> 16), 0x21f0aaad); z = Math.imul(z ^ (z >>> 15), 0x735a2d97); return ((z ^ (z >>> 15)) >>> 0) / 4294967296; };
      prand();
      const pose = pickOne('Held Up:26|Hugged:20|Gnawing:18|On Its Head:16|Workbench:20', prand);
      // the face, headgear and pet fill-ins roll from a xorshift on the hash's fifth word, so the rolls above keep their values
      let es = (parseInt(H.slice(34, 42), 16) ^ 0x3c6ef372) >>> 0 || 1;
      const erand = () => { es ^= es << 13; es >>>= 0; es ^= es >>> 17; es ^= es << 5; es >>>= 0; return es / 4294967296; };
      erand(); erand();
      eyes = (erand() < 0.3 ? pickOne('Beady:28|Slits:28|Red Glow:22|Green Glow:22', erand) : (erand(), null)) || eyes;
      const eyeK = 0.88 + erand() * 0.3;
      const hatFill = erand() < 0.43, hatNew = pickOne('Saucepan:20|Beanie:20|Welding Mask:8|Propeller Cap:10|Hard Hat:10|Bucket:6|Paper Hat:8|Headlamp:8|Foil Hat:7|Traffic Cone:3', erand);
      if (hat === 'None' && hatFill && legend !== 'Scrap King') hat = hatNew;
      const petFill = erand() < 0.37, petNew = pickOne('Rat:24|Snail:20|Bolt Bug:14|Pet Rock:12|Mini Gremlin:10|Moth:10|Dangling Spider:10', erand);
      if (pet === 'None' && petFill) pet = petNew;
      if (legend === 'Clockwork') eyes = 'Lamp Lenses';

      c.trait('Head', shape); c.trait('Build', build); c.trait('Hide', hide); c.trait('Markings', marks);
      c.trait('Ears', ears); c.trait('Horns', horns); c.trait('Eyes', eyes); c.trait('Nose', nose);
      c.trait('Grin', grin); c.trait('Hair', hair); c.trait('Headgear', legend === 'Scrap King' ? 'Scrap Crown' : hat); c.trait('Outfit', outfit);
      c.trait('Loot', loot); c.trait('Pose', pose); c.trait('Pet', pet); c.trait('Backdrop', backdrop);
      if (legend) c.trait('Legendary', legend);

      // ---------- the palette: every colour is registered once, ramps are shadow / base / light ----------
      const pal = [];
      const C = h => { let i = pal.indexOf(h); if (i < 0) { pal.push(h); i = pal.length - 1; } return i; };
      const hexmix = (h, g, k) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - k) + parseInt(g.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('');
      const ramp = (mid, dark, light) => [C(dark || hexmix(mid, '#140c18', 0.34)), C(mid), C(light || hexmix(mid, '#fffbea', 0.4))];
      const HIDES = {
        Sludge: ['#8fb04a', '#5f7a2c'], Rust: ['#d9733a', '#9c4a20'], Bruise: ['#9a72c4', '#6a4a92'], 'Oil Blue': ['#4f8fbf', '#2e5f86'], Mustard: ['#e0b73c', '#a8841c'],
        Bubblegum: ['#f28cbf', '#c25a8f'], Chrome: ['#c8d0d8', '#8e98a2'], Moss: ['#6a9a5a', '#3f6a38'], 'Ash Grey': ['#9a9890', '#64625c'], Tangerine: ['#f29a3a', '#b86a1c'],
        Teal: ['#3aa8a0', '#1f6e6a'], Plum: ['#8a4a7a', '#5a2a52'], Glow: ['#b8ff5a', '#6ad02a'], Gold: ['#f2c84a', '#b8861a'],
        Steel: ['#9aa6b2', '#5a6470'], Ectoplasm: ['#a8e0d8', '#5fa8a8'],
      };
      const [skin, skinDark] = HIDES[hide];
      const INK = C('#16120f'), WHITEP = C('#ffffff');
      const SK = ramp(skin, skinDark), SKD = ramp(skinDark), HAIR = ramp('#2a2420', '#16120f', '#5a4a40');
      const OUT = ramp(outfitHue), HUE2 = ramp(hue2), HORN = ramp('#efe4c8', '#b8a684', '#fffbf0');
      const STEEL = ramp('#b8c0c8', '#78828c', '#eef2f6'), DSTEEL = ramp('#5a5a62', '#34343a', '#8a8a92');
      const GOLD = ramp('#f2c84a', '#a8761a', '#fff2a8'), RED = ramp('#d8333a', '#8a1c24', '#ff7a6a');
      const YEL = ramp('#f0c93a', '#b8861a', '#fff0a0'), WHITE = ramp('#f4f2ec', '#c4c0b4', '#ffffff');
      const TEETH = ramp('#fbf6e4', '#d2c6a6', '#ffffff'), MOUTH = ramp('#5a1a22', '#38101a', '#7a2a34');
      const PINK = ramp('#e89aa8', '#b8687a', '#ffd0d8'), EARIN = ramp('#e07a8a');
      const BACKS = {
        Halftone: ['#f5d547', '#e0662c'], Blueprint: ['#22508f', '#c8dcf5'], Hazard: ['#f2c230', '#6e5a18'], Static: ['#c9c6bd', '#3a3a3a'], Burst: ['#ef4a5a', '#ffd25a'],
        Pegboard: ['#c8a476', '#6e4e2c'], 'Circuit Board': ['#1f6a4a', '#d8b04a'], 'Brick Alley': ['#86453c', '#8a8076'], 'Oil Rainbow': ['#2a2a36', '#ffffff'], 'Moon Night': ['#1c2448', '#f6eed0'],
      };
      const bgA = C(BACKS[backdrop][0]), bgB = C(BACKS[backdrop][1]);

      // head proportions per shape (the rolled size stays, the silhouette changes)
      if (shape === 'Long') { hry *= 1.08; hrx *= 0.86; }
      if (shape === 'Block') { hrx *= 0.96; hry *= 0.96; }
      if (shape === 'Wedge') { hry *= 1.06; mouthW *= 0.8; }
      if (legend === 'Clockwork') mouthW *= 0.62;   // room for the open cheek panel
      const BUILD = { Scrawny: [0.16, 0.775, 0], Hunched: [0.21, 0.74, 0.01], Stocky: [0.25, 0.765, 0.02], Potbelly: [0.19, 0.78, 0.07] }[build];
      const sw = BUILD[0], shY = BUILD[1], belly = BUILD[2];
      if (build === 'Hunched') hy += 0.025;

      // ---------- the cell machinery ----------
      const L = new Uint8Array(NN).fill(255);   // the gremlin, 255 = clear
      const E = new Uint8Array(NN);             // live overlays: eyes, lids, the key, the fireflies
      const B = new Uint8Array(NN);             // the backdrop
      const O = new Uint8Array(NN);             // the frame
      const M = new Uint8Array(NN);             // the part being drawn
      const TM = new Uint8Array(NN), HM = new Uint8Array(NN), MM = new Uint8Array(NN);  // torso, head and mouth, kept for clipping
      let D = L, XF = null, CLIP = null;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      // the figure is drawn about 10% larger and lifted, so the head fills the upper middle (ZY is set once the top is known)
      const ZK = 1.1; let ZY = 0.9;
      const T = p => [0.5 + ZK * ((p[0] - 0.5) * ct - (p[1] - 0.9) * st), ZY + ZK * ((p[0] - 0.5) * st + (p[1] - 0.9) * ct)];
      const tf = p => T(XF ? XF(p) : p);
      const cellOf = p => { const q = tf(p); return [Math.floor(q[0] * N), Math.floor(q[1] * N)]; };
      const setD = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N && (!CLIP || CLIP[y * N + x])) D[y * N + x] = v; };
      const blk = (x, y, w, h, v) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) setD(x + i, y + j, v); };
      const stamp = (rows, x0, y0, map) => { for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) { const ch = rows[j][i]; if (ch !== '.') setD(x0 + i, y0 + j, map[ch]); } };
      const bres = (a, b, v) => {
        let [x0, y0] = a; const [x1, y1] = b;
        const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
        let err = dx + dy;
        for (let k = 0; k < 140; k++) {
          setD(x0, y0, v);
          if (x0 === x1 && y0 === y1) break;
          const e2 = 2 * err;
          if (e2 >= dy) { err += dy; x0 += sx; }
          if (e2 <= dx) { err += dx; y0 += sy; }
        }
      };
      const ink = (pts, v) => { const col = v === undefined ? INK : v; for (let i = 0; i + 1 < pts.length; i++) bres(cellOf(pts[i]), cellOf(pts[i + 1]), col); };
      // fill a polygon into the part mask, sampling at cell centres
      const scanRaw = Q => {
        let ya = 1e9, yb = -1e9; for (const q of Q) { ya = Math.min(ya, q[1]); yb = Math.max(yb, q[1]); }
        const y0 = Math.max(0, Math.floor(ya * N)), y1 = Math.min(N - 1, Math.ceil(yb * N)), xs = [];
        for (let y = y0; y <= y1; y++) {
          const yc = (y + 0.5) / N; xs.length = 0;
          for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) { const a = Q[i], b = Q[j]; if ((a[1] > yc) !== (b[1] > yc)) xs.push(a[0] + (yc - a[1]) / (b[1] - a[1]) * (b[0] - a[0])); }
          xs.sort((p, q) => p - q);
          for (let k = 0; k + 1 < xs.length; k += 2) {
            const xa = Math.max(0, Math.ceil(xs[k] * N - 0.5)), xb = Math.min(N - 1, Math.floor(xs[k + 1] * N - 0.5));
            for (let x = xa; x <= xb; x++) M[y * N + x] = 1;
          }
        }
      };
      const fill = pts => scanRaw(pts.map(tf));
      const oval = (cx, cy, rx, ry, n) => { const out = [], k = n || 30; for (let i = 0; i < k; i++) { const a = i / k * Math.PI * 2; out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return out; };
      // a fat stroke along points, r in cells
      const tube = (pts, r) => {
        const Q = pts.map(p => { const q = tf(p); return [q[0] * N, q[1] * N]; });
        let xa = 1e9, xb = -1e9, ya = 1e9, yb = -1e9;
        for (const q of Q) { xa = Math.min(xa, q[0]); xb = Math.max(xb, q[0]); ya = Math.min(ya, q[1]); yb = Math.max(yb, q[1]); }
        for (let y = Math.max(0, Math.floor(ya - r)); y <= Math.min(N - 1, Math.ceil(yb + r)); y++) for (let x = Math.max(0, Math.floor(xa - r)); x <= Math.min(N - 1, Math.ceil(xb + r)); x++) {
          const px = x + 0.5, py = y + 0.5;
          for (let i = 0; i < Q.length; i++) {
            const a = Q[i], b = Q[Math.min(i + 1, Q.length - 1)], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy || 1e-9;
            let u = ((px - a[0]) * dx + (py - a[1]) * dy) / l2; u = u < 0 ? 0 : u > 1 ? 1 : u;
            const ex = px - a[0] - u * dx, ey = py - a[1] - u * dy;
            if (ex * ex + ey * ey <= r * r) { M[y * N + x] = 1; break; }
          }
        }
      };
      const inM = (x, y) => x < 0 || y < 0 || x >= N || y >= N || M[y * N + x] === 1;
      // paint the part: shave lone cells, lay a one-cell ink outline, then fill with
      // shadow on the lower right, a light rim on the upper left and an optional dither
      const paint = (mat, o) => {
        o = o || {};
        if (o.clip) for (let i = 0; i < NN; i++) M[i] &= o.clip[i];
        if (!o.keep) {
          const kill = [];
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (M[y * N + x]) {
            const k = (x > 0 && M[y * N + x - 1]) + (x < N - 1 && M[y * N + x + 1]) + (y > 0 && M[y * N + x - N]) + (y < N - 1 && M[y * N + x + N]);
            if (k <= 1) kill.push(y * N + x);
          }
          for (const i of kill) M[i] = 0;
        }
        if (o.save) o.save.set(M);
        const line = o.line === undefined ? INK : o.line;
        let area = 0; for (let i = 0; i < NN; i++) area += M[i];
        const small = area < 45;  // little parts get a one-cell shadow
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (M[i]) {
            let v = mat[1];
            if (!o.flat) {
              if (!inM(x + 1, y + 1) || (!small && !inM(x + 2, y + 2))) v = mat[0];
              else if (!inM(x - 1, y - 1)) v = mat[2];
              else if (o.dither && ((x + y) & 1) && (!inM(x + 3, y + 3) || !inM(x + 4, y + 1))) v = mat[0];
            }
            setD(x, y, v);
          } else if (line !== null && ((x > 0 && M[i - 1]) || (x < N - 1 && M[i + 1]) || (y > 0 && M[i - N]) || (y < N - 1 && M[i + N]))) setD(x, y, line);
        }
        M.fill(0);
      };
      // punch through to the backdrop, with an ink rim
      const hole = () => {
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const i = y * N + x;
          if (M[i]) D[i] = 255;
          else if ((x > 0 && M[i - 1]) || (x < N - 1 && M[i + 1]) || (y > 0 && M[i - N]) || (y < N - 1 && M[i + N])) D[i] = INK;
        }
        M.fill(0);
      };
      const curve = (a, b, cc, d, n) => {
        const p = [], m = n || 16;
        for (let i = 0; i <= m; i++) { const t = i / m, u = 1 - t; p.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * cc[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * cc[1] + t * t * t * d[1]]); }
        return p;
      };
      const ell = (cx, cy, rx, ry, n, wob) => {
        const p = [];
        for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, w = wob ? 1 + wob[1] * Math.sin(a * wob[2] + wob[0]) : 1; p.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]); }
        return p;
      };

      // ---------- the backdrop, cell by cell ----------
      D = B; {
        B.fill(bgA);
        if (backdrop === 'Halftone') {
          for (let gy = 0; gy < 17; gy++) for (let gx = -1; gx < 17; gx++) {
            const x = gx * 4 + (gy % 2) * 2 + 1, y = gy * 4 + 1, d = Math.hypot(x - 32, y - 29);
            if (d < 13) stamp(['.o.', 'ooo', '.o.'], x - 1, y - 1, { o: bgB });
            else if (d < 23) blk(x, y, 2, 2, bgB);
            else if (d < 32) setD(x, y, bgB);
          }
        } else if (backdrop === 'Blueprint') {
          const gl = C('#3462a4'), wl = bgB;
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (x % 8 === 3 || y % 8 === 3) B[y * N + x] = gl;
          for (let i = 0; i < 4; i++) {
            const [a, b, k] = dots[i], cx = a * N, cy = b * N, r = (0.05 + k * 0.08) * N;
            for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (Math.abs(Math.hypot(x + 0.5 - cx, y + 0.5 - cy) - r) < 0.5) B[y * N + x] = wl;
            bres([Math.floor(cx - 7), Math.floor(cy)], [Math.floor(cx + 7), Math.floor(cy)], wl); bres([Math.floor(cx), Math.floor(cy - 7)], [Math.floor(cx), Math.floor(cy + 7)], wl);
          }
          for (let i = 0; i < 6; i++) {
            const [a, b, k] = dots[i + 4], x0 = Math.floor(a * 0.8 * N), y0 = Math.floor(b * 0.8 * N), w = Math.floor((0.08 + k * 0.1) * N), h = Math.floor((0.05 + k * 0.06) * N);
            bres([x0, y0], [x0 + w, y0], wl); bres([x0, y0 + h], [x0 + w, y0 + h], wl); bres([x0, y0], [x0, y0 + h], wl); bres([x0 + w, y0], [x0 + w, y0 + h], wl);
          }
        } else if (backdrop === 'Hazard') {
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if ((x + y) % 12 < 6) B[y * N + x] = bgB;
        } else if (backdrop === 'Static') {
          const greys = [C('#c9c6bd'), C('#a9a69e'), C('#efede6'), C('#4a4a48')];
          let q = (dots[0][0] * 4294967296) >>> 0;
          const nx = () => (q = (Math.imul(q, 1664525) + 1013904223) >>> 0) / 4294967296;
          for (let y = 0; y < N; y++) for (let x = 0; x < N;) {
            const run = 2 + Math.floor(nx() * 5), r = nx(), v = y % 3 === 2 ? greys[1] : r < 0.6 ? greys[0] : r < 0.85 ? greys[2] : greys[3];
            for (let k = 0; k < run && x < N; k++, x++) B[y * N + x] = v;
          }
        } else if (backdrop === 'Burst') {
          const pts = []; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2, r = i % 2 ? 0.25 : 0.75; pts.push([0.5 + Math.cos(a) * r, 0.45 + Math.sin(a) * r]); }
          scanRaw(pts); for (let i = 0; i < NN; i++) if (M[i]) B[i] = bgB; M.fill(0);
        } else if (backdrop === 'Pegboard') {
          const tool = C('#9a7448');
          for (let y = 1; y < N; y += 4) for (let x = 1; x < N; x += 4) setD(x, y, bgB);
          for (const [x, y, k] of [[6, 7, 0], [56, 6, 1], [8, 40, 2], [58, 35, 0]]) {
            if (k === 0) { bres([x, y], [x, y + 11], tool); bres([x - 2, y], [x + 2, y], tool); blk(x - 1, y + 7, 3, 5, tool); }
            else if (k === 1) { stamp(['.ttt.', 't...t', 't...t', 't...t', '.t.t.'], x - 2, y, { t: tool }); bres([x, y + 5], [x, y + 13], tool); }
            else { bres([x - 2, y], [x + 2, y + 8], tool); bres([x + 2, y], [x - 2, y + 8], tool); }
          }
        } else if (backdrop === 'Circuit Board') {
          const tr = bgB, chip = C('#1a1a1a'), pin = C('#9a9a9a');
          for (let i = 0; i < 16; i++) {
            const [a, b, k] = dots[i], x0 = Math.floor(a * N), y0 = Math.floor(b * N), hz = k > 0.5;
            const m = hz ? [x0 + 11, y0] : [x0, y0 + 11], e = hz ? [x0 + 15, y0 + 4] : [x0 + 4, y0 + 15];
            bres([x0, y0], m, tr); bres(m, e, tr);
            stamp(['ppp', 'p.p', 'ppp'], x0 - 1, y0 - 1, { p: tr });
          }
          for (const [x, y] of [[4, 5], [52, 11]]) { blk(x, y, 8, 5, chip); for (let k = 0; k < 4; k++) { setD(x + 1 + k * 2, y - 1, pin); setD(x + 1 + k * 2, y + 5, pin); } }
        } else if (backdrop === 'Brick Alley') {
          const tones = [C('#86453c'), C('#7a3c34'), C('#94524a')], hi = C('#a2645a');
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            const r = Math.floor(y / 5), off = (r % 2) * 6, k = Math.floor((x + off) / 13);
            const my = y % 5 === 4, mx = (x + off) % 13 === 12;
            B[y * N + x] = my || mx ? bgB : y % 5 === 0 ? hi : tones[(r * 7 + k * 3) % 3];
          }
        } else if (backdrop === 'Oil Rainbow') {
          const hsl = (h, s, l) => { const f = n => { const k = (n + h / 30) % 12, a = s * Math.min(l, 1 - l); return Math.round((l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255).toString(16).padStart(2, '0'); }; return '#' + f(0) + f(8) + f(4); };
          for (let k = 0; k < 9; k++) {
            const col = C(hexmix(hsl((k * 40 + dots[0][0] * 360) % 360, 0.8, 0.6), BACKS[backdrop][0], 0.55));
            for (let x = 0; x < N; x++) { const y = Math.round((0.1 + k * 0.1 + Math.sin((x + 0.5) / N * 7 + k) * 0.04) * N); setD(x, y, col); setD(x, y + 1, col); }
          }
        } else {
          const city = C('#10142c'), win = C('#e8c860'), dim = C('#8a90b8');
          for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (Math.hypot(x + 0.5 - 51.2, y + 0.5 - 11.5) < 6.4 && Math.hypot(x + 0.5 - 49, y + 0.5 - 10) >= 5.6) B[y * N + x] = bgB;
          for (let i = 0; i < 24; i++) { const [a, b, k] = dots[i], x = Math.floor(a * N), y = Math.floor(b * 0.6 * N); if (B[y * N + x] === bgA) setD(x, y, k > 0.7 ? bgB : dim); }
          for (let i = 0; i < 9; i++) {
            const x0 = Math.floor((i / 8 - 0.05) * N), top = Math.floor((0.62 - dots[i + 24][0] * 0.12) * N);
            blk(x0, top, 7, N - top, city);
            for (let wy2 = top + 2; wy2 < N; wy2 += 3) for (let wx = x0 + 1; wx < x0 + 6; wx += 2) if (((wx * 7 + wy2 * 13 + i * 5) % 9) < 2) setD(wx, wy2, win);
          }
        }
      }

      // ---------- the gremlin ----------
      D = L;
      // where headgear sits (an onion's point pokes up past it), and how high the whole figure reaches
      const headTip = shape === 'Long' ? hy - hry * 1.55 : shape === 'Onion' ? hy - hry * 1.78 : hy - hry;
      const topY = shape === 'Onion' ? hy - hry * 1.06 : headTip;
      {
        const hatH = { None: 0, 'Welding Mask': 0.065, 'Propeller Cap': 0.135, 'Hard Hat': 0.1, Bucket: 0.14, 'Paper Hat': 0.14, Headlamp: 0.06, 'Foil Hat': 0.17, 'Traffic Cone': 0.22, Saucepan: 0.115, Beanie: 0.15 }[hat] || 0;
        const hairH = { Tufts: 0.1, Wild: 0.135, Mohawk: 0.115, Sprout: 0.15, Pompadour: 0.14, Pigtails: 0.07 }[hair] || 0;
        const hornH = { Nubs: 0.045, 'Ram Curls': 0.08, 'Single Horn': 0.13, 'Broken Horn': 0.115, 'Light Bulb': 0.155, 'Antenna Bolt': 0.125 }[horns] || 0;
        let ytop = Math.min(headTip, topY - Math.max(hatH, hairH, hornH, legend === 'Scrap King' ? 0.15 : 0));
        if (ears === 'Feelers') ytop = Math.min(ytop, hy - hry - 0.18);
        if (pose === 'On Its Head') ytop -= 0.115;
        ZY = Math.max(0.42 - ZK * (hy - 0.9), 0.03 - ZK * (ytop - 0.9));
        // bat ears stay (mostly) inside the frame at the larger size
        if (ears === 'Bat' || ears === 'Torn') earSpan = Math.max(0.13, Math.min(earSpan, 0.52 / ZK - hrx - Math.abs(hx - 0.5)));
      }
      const handX = hx + within(0.21, 0.25), handY = within(0.7, 0.74);
      const sx0 = 0.5 + sw * 0.82, sy0 = shY + 0.035;
      const elbow = [Math.max(handX + 0.08, sx0 + 0.04), 0.93], wrist = [handX + 0.012, handY + 0.04];

      // the Scrap King's throne of junk, behind everything: a ragged back of crate planks, pipe posts and tin-can arms
      let kingBulb = null, capeAt = null;
      if (legend === 'Scrap King') {
        const tw = sw + 0.2, tTop = topY + 0.02, PLANK = ramp('#6e4a30', '#45291a', '#8e6640');
        fill([[0.5 - tw, tTop + 0.03], [0.5 - tw * 0.55, tTop - 0.02], [0.5 - tw * 0.2, tTop + 0.01], [0.5 + tw * 0.3, tTop - 0.04], [0.5 + tw * 0.7, tTop], [0.5 + tw, tTop - 0.01], [0.5 + tw - 0.01, 1.08], [0.5 - tw + 0.01, 1.08]]); paint(PLANK, { dither: true });
        for (let k = 1; k < 10; k++) { const y = tTop + k * 0.07; ink([[0.5 - tw, y + 0.01 + (k % 3) * 0.006], [0.5 + tw, y - 0.008]], PLANK[0]); }
        for (let k = 0; k < 10; k++) { const [x, y] = cellOf([0.5 + (k % 2 ? 1 : -1) * (tw - 0.035), tTop + 0.05 + Math.floor(k / 2) * 0.14]); setD(x, y, DSTEEL[0]); }
        for (const s of [-1, 1]) {
          tube([[0.5 + s * tw, 1.08], [0.5 + s * tw, tTop - 0.07]], 1.5); paint(STEEL, { keep: true });
          if (s < 0) { fill(oval(0.5 - tw, tTop - 0.1, 0.03, 0.03, 16)); paint(ramp('#d8333a', '#8a1c24', '#ff7a6a')); }
          else { const gp = []; for (let k = 0; k < 32; k++) { const a = k / 32 * Math.PI * 2, r = Math.floor(k / 2) % 2 ? 0.028 : 0.04; gp.push([0.5 + tw + Math.cos(a) * r, tTop - 0.1 + Math.sin(a) * r]); } fill(gp); paint(DSTEEL); }
          fill([[0.5 + s * (tw - 0.005), 0.86], [0.5 + s * (tw - 0.14), 0.86], [0.5 + s * (tw - 0.14), 1.08], [0.5 + s * (tw - 0.005), 1.08]]); paint(STEEL, { dither: true });
          fill([[0.5 + s * (tw - 0.005), 0.9], [0.5 + s * (tw - 0.14), 0.9], [0.5 + s * (tw - 0.14), 0.96], [0.5 + s * (tw - 0.005), 0.96]]); paint(s < 0 ? ramp('#3c8c5a') : ramp('#d9a93a'));
        }
        // a royal cape falls from his shoulders, crimson velvet trimmed down both edges with ermine
        const CAPE = ramp('#b01e2c', '#62101a', '#e4505c'), ERM = ramp('#f4efe4', '#c8c0b0', '#ffffff');
        const capeL = [[0.5 - sw * 0.8, shY - 0.04], [0.5 - sw - 0.12, shY + 0.05], [0.5 - sw - 0.25, 0.95], [0.5 - sw - 0.3, 1.09], [0.5 + sw + 0.3, 1.09], [0.5 + sw + 0.25, 0.95], [0.5 + sw + 0.12, shY + 0.05], [0.5 + sw * 0.8, shY - 0.04]];
        fill(capeL); paint(CAPE, { dither: true });
        for (const s of [-1, 1]) { fill([[0.5 + s * (sw + 0.12), shY + 0.05], [0.5 + s * (sw + 0.25), 0.95], [0.5 + s * (sw + 0.3), 1.09], [0.5 + s * (sw + 0.22), 1.09], [0.5 + s * (sw + 0.17), 0.95], [0.5 + s * (sw + 0.05), shY + 0.07]]); paint(ERM); }
        capeAt = capeL;
      }

      // neck and shoulders, hunched forward
      const neckTop = hy + hry * 0.7;
      const torso = curve([hx - 0.064, neckTop], [hx - 0.07, shY - 0.02], [0.5 - sw * 0.6, shY - 0.04], [0.5 - sw, shY + 0.02], 8)
        .concat(curve([0.5 - sw, shY + 0.02], [0.5 - sw - 0.04 - belly, shY + 0.1], [0.5 - sw - 0.02 - belly * 1.4, 0.95], [0.5 - sw - 0.01, 1.04], 8))
        .concat([[0.5 + sw + 0.01, 1.04]])
        .concat(curve([0.5 + sw + 0.01, 1.04], [0.5 + sw + 0.02 + belly * 1.4, 0.95], [0.5 + sw + 0.04 + belly, shY + 0.1], [0.5 + sw, shY + 0.02], 8))
        .concat(curve([0.5 + sw, shY + 0.02], [0.5 + sw * 0.6, shY - 0.04], [hx + 0.07, shY - 0.02], [hx + 0.064, neckTop], 8));
      fill(torso); paint(SK, { dither: true, save: TM });

      // the outfit, clipped to the body
      const clip = TM;
      if (outfit === 'Overalls') {
        fill([[0.38, 1.05], [0.39, 0.84], [0.61, 0.84], [0.62, 1.05]]); paint(OUT, { clip, dither: true });
        tube([[0.4, 0.85], [0.37, shY]], 1.1); paint(OUT, { clip }); tube([[0.6, 0.85], [0.63, shY]], 1.1); paint(OUT, { clip });
        for (const x of [0.405, 0.595]) { const [bx, by] = cellOf([x, 0.865]); blk(bx, by, 2, 2, C('#e8d8a0')); }
        ink([[0.45, 0.92], [0.45, 0.97], [0.55, 0.97], [0.55, 0.92]], OUT[0]);
      } else if (outfit === 'Raincoat') {
        fill([[0.2, 1.05], [0.2, shY - 0.05], [hx - 0.04, shY - 0.05], [0.5, 0.88], [hx + 0.04, shY - 0.05], [0.8, shY - 0.05], [0.8, 1.05]]); paint(YEL, { clip, dither: true });
        ink([[0.5, 0.88], [0.5, 1.05]]);
        for (const y of [0.92, 0.99]) { const [bx, by] = cellOf([0.53, y]); blk(bx, by, 2, 2, INK); }
      } else if (['Hoodie', 'Patched Sweater', 'Tuxedo', 'Hawaiian Shirt', 'Lab Coat', 'Leather Jacket'].includes(outfit)) {
        const baseHex = { Hoodie: outfitHue, 'Patched Sweater': hue2 === '#f2ede0' ? '#c26a3a' : hue2, Tuxedo: '#2a2832', 'Hawaiian Shirt': '#e8584a', 'Lab Coat': '#f4f2ec', 'Leather Jacket': '#3a2e2a' }[outfit];
        const BASE = outfit === 'Lab Coat' ? WHITE : ramp(baseHex);
        fill([[0.15, 1.06], [0.15, shY - 0.06], [0.85, shY - 0.06], [0.85, 1.06]]); paint(BASE, { clip, dither: true });
        CLIP = TM;
        if (outfit === 'Hoodie') {
          ink(curve([hx - 0.13, shY - 0.02], [hx - 0.08, shY + 0.07], [hx + 0.08, shY + 0.07], [hx + 0.13, shY - 0.02], 12));
          for (const s of [-1, 1]) ink([[hx + s * 0.04, shY + 0.05], [hx + s * 0.045, shY + 0.12], [hx + s * 0.035, shY + 0.17]], C('#f2ede0'));
          ink([[0.4, 1.05], [0.42, 0.95], [0.58, 0.95], [0.6, 1.05]], BASE[0]);
        } else if (outfit === 'Patched Sweater') {
          for (let k = 0; k < 5; k++) ink([[0.15, 0.88 + k * 0.03], [0.85, 0.88 + k * 0.03]], BASE[0]);
          fill([[0.36, 0.9], [0.45, 0.89], [0.46, 0.97], [0.37, 0.98]]); paint(ramp('#d8c08a'), { clip });
          for (let k = 0; k < 3; k++) { const [x, y] = cellOf([0.375 + k * 0.03, 0.885]); setD(x, y, INK); }
        } else if (outfit === 'Tuxedo') {
          fill([[0.5, 0.82], [0.42, shY - 0.04], [0.58, shY - 0.04]]); paint(WHITE, { clip });
          ink([[0.43, shY - 0.04], [0.5, 0.95]]); ink([[0.57, shY - 0.04], [0.5, 0.95]]);
          const [bx, by] = cellOf([0.5, 0.8]); stamp(['kk.kk', 'kkkkk', 'kk.kk'], bx - 2, by - 1, { k: INK });
        } else if (outfit === 'Hawaiian Shirt') {
          const pet2 = C('#ffe0e8'), mid = C('#f2c84a'), leaf = C('#3c8c5a');
          for (const [x, y] of [[0.33, 0.88], [0.6, 0.86], [0.45, 0.97], [0.68, 0.98], [0.28, 1.0], [0.55, 0.93]]) { const [fx, fy] = cellOf([x, y]); stamp(['.p.', 'pmp', '.pl'], fx - 1, fy - 1, { p: pet2, m: mid, l: leaf }); }
          ink([[0.5, shY + 0.02], [0.5, 1.05]], BASE[0]);
        } else if (outfit === 'Lab Coat') {
          fill([[0.5, 0.86], [hx - 0.06, shY - 0.05], [hx - 0.1, shY + 0.02], [0.47, 0.92]]); paint(WHITE, { clip });
          fill([[0.5, 0.86], [hx + 0.06, shY - 0.05], [hx + 0.1, shY + 0.02], [0.53, 0.92]]); paint(WHITE, { clip });
          ink([[0.58, 0.93], [0.58, 0.99], [0.66, 0.99], [0.66, 0.93], [0.58, 0.93]], WHITE[0]);
          const [px0, py0] = cellOf([0.6, 0.89]); blk(px0, py0, 1, 3, C('#3a6fb0')); blk(px0 + 2, py0 + 1, 1, 2, C('#d8333a'));
        } else {
          const lap = ramp('#2a201c');
          fill([[0.5, 0.9], [hx - 0.07, shY - 0.05], [hx - 0.13, shY + 0.05], [0.46, 0.98]]); paint(lap, { clip });
          fill([[0.5, 0.9], [hx + 0.07, shY - 0.05], [hx + 0.13, shY + 0.05], [0.54, 0.98]]); paint(lap, { clip });
          ink([[0.52, 0.9], [0.55, 1.05]], STEEL[1]);
          for (const [x, y] of [[0.3, 0.9], [0.36, 0.97], [0.68, 0.92]]) { const [sx, sy] = cellOf([x, y]); setD(sx, sy, STEEL[2]); setD(sx + 1, sy + 1, STEEL[0]); }
        }
        CLIP = null;
      } else if (outfit === 'Bow Tie') {
        const [bx, by] = cellOf([0.5, shY - 0.005]);
        stamp(['kk...kk', 'krk.krk', 'krrkrrk', 'krrkrrk', 'kdk.kdk', 'kk...kk'], bx - 3, by - 3, { k: INK, r: C('#d23a3a'), d: C('#8a1c24') });
      }
      if (marks === 'Spots' || hide === 'Glow') { CLIP = TM; for (let k = 0; k < 4; k++) { const [a, b2] = extra[k]; const [x, y] = cellOf([0.36 + a * 0.28, 0.9 + b2 * 0.1]); stamp(['.ss', 'sss', 'ss.'], x - 1, y - 1, { s: SKD[1] }); } CLIP = null; }
      if (legend === 'Scrap King') {
        // an ermine collar round his shoulders, and the black tails dotted over it and down the cape's edges
        const ERM = ramp('#f4efe4', '#c8c0b0', '#ffffff');
        fill(curve([0.5 - sw - 0.04, shY + 0.04], [hx - 0.12, shY - 0.07], [hx + 0.12, shY - 0.07], [0.5 + sw + 0.04, shY + 0.04], 12).concat(curve([0.5 + sw + 0.02, shY + 0.1], [hx + 0.1, shY + 0.03], [hx - 0.1, shY + 0.03], [0.5 - sw - 0.02, shY + 0.1], 12)));
        paint(ERM);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const v = L[y * N + x]; if ((v === ERM[1] || v === ERM[2] || v === ERM[0]) && ((x * 5 + y * 3) % 11 === 0)) { setD(x, y, INK); if (y + 1 < N && L[(y + 1) * N + x] !== INK) setD(x, y + 1, INK); } }
      }
      if (legend === 'Scrap King') {
        // a chain of office strung from bottle caps, red and steel by turns
        const ch = curve([0.5 - sw * 0.8, shY + 0.01], [hx - 0.1, shY + 0.13], [hx + 0.1, shY + 0.13], [0.5 + sw * 0.8, shY + 0.01], 9);
        for (let k = 0; k < ch.length; k++) { const [x, y] = cellOf(ch[k]); stamp(['kkkk', 'kabk', 'kbbk', 'kkkk'], x - 2, y - 2, k % 2 ? { k: INK, a: RED[2], b: RED[1] } : { k: INK, a: STEEL[2], b: STEEL[1] }); }
      }

      // ears behind the head
      for (const s of [-1, 1]) {
        const bx = hx + s * hrx * 0.8, by = hy - hry * 0.2;
        let pts;
        if (ears === 'Bat' || ears === 'Torn') {
          const tip = [hx + s * (hrx + earSpan), hy - earLift];
          pts = [[bx, by - hry * 0.5], tip];
          for (let k = 1; k <= 3; k++) {
            const t = k / 3, x = tip[0] + (bx - tip[0]) * t, y = tip[1] + (by + hry * 0.35 - tip[1]) * t;
            pts.push([x - s * 0.02 + (ears === 'Torn' && k === 1 ? s * 0.03 : 0), y + 0.05]);
            pts.push([x, y]);
          }
          pts.push([bx, by + hry * 0.4]);
        } else if (ears === 'Floppy' || ears === 'Long Droop') {
          const L2 = ears === 'Long Droop' ? 1.35 : 1;
          pts = curve([bx, by - hry * 0.4], [bx + s * earSpan * 0.6, by - 0.1], [bx + s * earSpan * 0.9 * L2, by + 0.05 * L2], [bx + s * earSpan * 0.7 * L2, by + 0.17 * L2 * L2], 14)
            .concat(curve([bx + s * earSpan * 0.7 * L2, by + 0.17 * L2 * L2], [bx + s * earSpan * 0.4, by + 0.15 * L2], [bx + s * 0.03, by + 0.1], [bx, by + hry * 0.3], 10));
        } else if (ears === 'Feelers') {
          const f = curve([bx - s * 0.04, hy - hry * 0.85], [bx, hy - hry - 0.12], [bx + s * 0.1, hy - hry - 0.15], [bx + s * 0.13, hy - hry - 0.1], 14);
          tube(f, 0.75); paint(SKD, { keep: true });
          fill(oval(bx + s * 0.13, hy - hry - 0.1, 0.026, 0.026)); paint(SKD);
          pts = [[bx, by - 0.03], [bx + s * 0.07, by - 0.01], [bx, by + 0.04]];
        } else if (ears === 'Satellite') {
          ink([[bx, by], [bx + s * 0.07, by - 0.03]]);
          pts = curve([bx + s * 0.05, by - 0.12], [bx + s * 0.16, by - 0.1], [bx + s * 0.16, by + 0.04], [bx + s * 0.06, by + 0.06], 12).concat(curve([bx + s * 0.06, by + 0.06], [bx + s * 0.1, by], [bx + s * 0.1, by - 0.06], [bx + s * 0.05, by - 0.12], 8));
        } else if (ears === 'Fins') {
          pts = [[bx, by - 0.06]];
          for (let k = 0; k <= 4; k++) pts.push([bx + s * (0.06 + k * 0.03), by - 0.08 + k * 0.035 - (k % 2 ? 0 : 0.03)]);
          pts.push([bx, by + 0.06]);
        } else if (ears === 'Bandaged') pts = [[bx, by - 0.04], [bx + s * 0.1, by - 0.13], [bx + s * 0.05, by + 0.03]];
        else pts = [[bx, by - 0.04], [bx + s * 0.08, by - 0.1], [bx + s * 0.03, by + 0.03]];
        fill(pts); paint(SK);
        if (ears !== 'Feelers' && ears !== 'Satellite') { fill(pts.map(q => [bx + (q[0] - bx) * 0.62, by + (q[1] - by) * 0.62])); paint(EARIN, { line: null }); }
        if (ears === 'Satellite') { const [x, y] = cellOf([bx + s * 0.11, by - 0.03]); blk(x, y, 2, 2, RED[1]); }
        if (ears === 'Torn') { fill(oval(hx + s * (hrx + earSpan * 0.6), hy - earLift * 0.55, 0.02, 0.02, 12)); hole(); }
        if (ears === 'Bandaged' && s > 0) { fill([[bx + 0.03, by - 0.09], [bx + 0.085, by - 0.11], [bx + 0.09, by - 0.075], [bx + 0.035, by - 0.055]]); paint(ramp('#f2e8d0')); const [x, y] = cellOf([bx + 0.06, by - 0.08]); setD(x, y, INK); setD(x, y + 1, INK); }
      }

      // horns behind the hair line
      for (const s of [-1, 1]) {
        const bx = hx + s * hrx * 0.45, by = topY + hry * 0.12;
        if (horns === 'Nubs') { fill([[bx - 0.022, by + 0.015], [bx + s * 0.005, by - 0.05], [bx + 0.022, by + 0.015]]); paint(HORN); }
        else if (horns === 'Ram Curls') { const cpts = []; for (let k = 0; k <= 20; k++) { const a = k / 20 * 5.2, r = 0.055 - k * 0.0018; cpts.push([bx + s * (0.03 + Math.sin(a) * r), by - 0.01 - Math.cos(a) * r * 0.9 + 0.03]); } tube(cpts, 1.5); paint(HORN, { keep: true }); }
        else if (horns === 'Broken Horn') { fill(s < 0 ? [[bx - 0.022, by + 0.015], [bx - 0.03, by - 0.1], [bx + 0.005, by - 0.13], [bx + 0.022, by + 0.015]] : [[bx - 0.022, by + 0.015], [bx - 0.018, by - 0.04], [bx, by - 0.03], [bx + 0.01, by - 0.055], [bx + 0.022, by + 0.015]]); paint(HORN); }
      }
      if (horns === 'Single Horn') { fill([[hx - 0.028, topY + 0.025], [hx + 0.01, topY - 0.13], [hx + 0.028, topY + 0.025]]); paint(HORN); }
      if (horns === 'Antenna Bolt') { tube([[hx, topY + 0.01], [hx, topY - 0.085]], 0.6); paint(STEEL, { keep: true }); fill(oval(hx, topY - 0.1, 0.022, 0.022, 14)); paint(RED); }
      if (horns === 'Light Bulb') {
        fill([[hx - 0.032, topY + 0.02], [hx - 0.032, topY - 0.025], [hx + 0.032, topY - 0.025], [hx + 0.032, topY + 0.02]]); paint(STEEL);
        fill(oval(hx, topY - 0.085, 0.058, 0.068)); paint(ramp('#fff4b0', '#e8c860', '#ffffff'));
        ink([[hx - 0.015, topY - 0.03], [hx - 0.015, topY - 0.08], [hx, topY - 0.095], [hx + 0.015, topY - 0.08], [hx + 0.015, topY - 0.03]], C('#c8902a'));
      }

      // the head silhouette
      const headPts = (() => {
        if (shape === 'Spud') return ell(hx, hy, hrx, hry, 48, [lumps[0], lumps[1], lumps[2]]);
        const p = [];
        for (let i = 0; i < 56; i++) {
          const a = i / 56 * Math.PI * 2;
          let x = Math.cos(a), y = Math.sin(a);
          const t = (y + 1) / 2;
          if (shape === 'Pear') x *= 0.74 + 0.4 * t;
          else if (shape === 'Wedge') { x *= 1.14 - 0.78 * Math.pow(t, 2.4); y *= 1 + 0.5 * Math.pow(Math.max(0, y), 3); }
          else if (shape === 'Block') { x = Math.sign(x) * Math.pow(Math.abs(x), 0.45); y = Math.sign(y) * Math.pow(Math.abs(y), 0.5); }
          else if (shape === 'Bean') { x += 0.16 * Math.exp(-Math.pow(a - Math.PI, 2) * 5); y *= 1 - 0.06 * Math.cos(a); }
          else if (shape === 'Long') { x *= 0.86 + 0.2 * t; if (y < 0) y *= 1.55; }
          else if (shape === 'Onion') { x *= 1 - 0.3 * Math.pow(Math.max(0, -y), 2); y -= 0.78 * Math.pow(Math.max(0, -Math.sin(a)), 16); }
          x *= 1 + 0.035 * Math.sin(a * 2 + lumps[0]);
          p.push([hx + x * hrx, hy + y * hry]);
        }
        return p;
      })();
      fill(headPts); paint(SK, { dither: true, save: HM });
      const shine = (x, y) => { const [sx, sy] = cellOf([x, y]); CLIP = HM; stamp(['.ww', 'ww.'], sx - 1, sy, { w: WHITEP }); CLIP = null; };
      if (hide === 'Chrome' || hide === 'Gold' || hide === 'Glow' || hide === 'Steel') shine(hx - hrx * 0.5, hy - hry * 0.62);
      if (legend === 'Clockwork') {
        // riveted plates: a seam over the brow and rivets round the dome and shoulders
        CLIP = HM;
        ink([[hx - hrx * 1.2, hy - hry * 0.42], [hx + hrx * 1.2, hy - hry * 0.42]], INK); ink([[hx, hy - hry * 1.6], [hx, hy - hry * 0.42]], INK);
        ink([[hx - hrx * 1.2, hy + hry * 0.32], [hx - hrx * 0.62, hy + hry * 0.32]], INK); ink([[hx + hrx * 0.62, hy + hry * 0.32], [hx + hrx * 1.2, hy + hry * 0.32]], INK);
        for (let k = 0; k < 7; k++) for (const s of [-1, 1]) { const [x, y] = cellOf([hx + s * hrx * (0.16 + k * 0.13), hy - hry * 0.42]); setD(x, y - 2, SK[2]); }
        for (let k = 0; k < 4; k++) { const [x, y] = cellOf([hx, hy - hry * (0.6 + k * 0.22)]); setD(x - 2, y, SK[2]); setD(x + 2, y, SK[2]); }
        CLIP = null;
        for (let k = 0; k < 9; k++) {
          const a = Math.PI * (1.08 + k * 0.105), [x, y] = cellOf([hx + Math.cos(a) * hrx * 0.78, hy + Math.sin(a) * hry * 0.8]);
          if (HM[y * N + x]) { setD(x, y, SK[2]); setD(x + 1, y + 1, SK[0]); }
        }
        if (outfit === 'Nothing' || outfit === 'Bow Tie') for (let k = 0; k < 5; k++) { const [x, y] = cellOf([0.5 - sw * 0.7 + k * sw * 0.35, shY + 0.03]); if (TM[y * N + x]) { setD(x, y, SK[2]); setD(x + 1, y + 1, SK[0]); } }
      }

      // markings
      CLIP = HM;
      if (marks === 'Warts') for (const [a, b2] of extra.slice(0, 3)) { const [x, y] = cellOf([hx + (a - 0.5) * hrx * 1.3, hy + (b2 - 0.2) * hry * 0.7]); stamp(['dd', 'dk'], x, y, { d: SKD[1], k: SKD[0] }); setD(x, y, SKD[2]); }
      else if (marks === 'Freckles') for (const s of [-1, 1]) for (let k = 0; k < 5; k++) { const [x, y] = cellOf([hx + s * hrx * (0.55 + (k % 3) * 0.09), hy + hry * (0.12 + Math.floor(k / 3) * 0.14)]); setD(x, y, SKD[1]); }
      else if (marks === 'Stitches') {
        const sp = curve([hx - hrx * 0.7, hy - hry * 0.75], [hx - hrx * 0.4, hy - hry * 0.4], [hx - hrx * 0.5, hy], [hx - hrx * 0.75, hy + hry * 0.2], 10);
        ink(sp);
        for (let k = 1; k < 10; k += 2) { const [x, y] = cellOf(sp[k]); setD(x - 1, y, INK); setD(x + 1, y, INK); }
      } else if (marks === 'Plaster') {
        CLIP = null;
        fill([[hx + hrx * 0.02, hy - hry * 0.66], [hx + hrx * 0.42, hy - hry * 0.98], [hx + hrx * 0.52, hy - hry * 0.78], [hx + hrx * 0.12, hy - hry * 0.46]]); paint(ramp('#f2d2a8'));
        const [x, y] = cellOf([hx + hrx * 0.27, hy - hry * 0.72]); setD(x, y, C('#c8a07a')); setD(x + 1, y - 1, C('#c8a07a'));
      } else if (marks === 'Spots') for (const [a, b2] of extra.slice(4, 8)) { const [x, y] = cellOf([hx + (a - 0.5) * hrx * 1.4, hy - hry * 0.4 + b2 * hry * 0.4]); stamp(['.ss', 'sss', 'ss.'], x - 1, y - 1, { s: SKD[1] }); }
      CLIP = null;

      // hair
      const top = topY;
      if (hair === 'Tufts' || hair === 'Wild') {
        const n = hair === 'Wild' ? 9 : 4, HR = hair === 'Wild' ? HAIR : SKD;
        for (let i = 0; i < n; i++) {
          const [a, b] = tufts[i], x = hx + (a - 0.5) * hrx * (hair === 'Wild' ? 1.7 : 1.1), y = top + 0.014 + Math.abs(a - 0.5) * 0.05;
          const len = hair === 'Wild' ? 0.07 + b * 0.06 : 0.055 + b * 0.04, lean2 = (a - 0.5) * 0.12;
          fill(curve([x - 0.016, y + 0.012], [x - 0.012, y - len * 0.5], [x + lean2, y - len * 0.8], [x + lean2 * 1.6, y - len], 8).concat(curve([x + lean2 * 1.6, y - len], [x + 0.006, y - len * 0.6], [x + 0.016, y - len * 0.3], [x + 0.016, y + 0.012], 8)));
          paint(HR);
        }
      } else if (hair === 'Mohawk') {
        const pts = [];
        for (let i = 0; i <= 8; i++) { const t = i / 8, x = hx - 0.075 + t * 0.15, y = top + 0.025 - Math.sin(t * Math.PI) * 0.02; pts.push([x, y]); if (i < 8) pts.push([x + 0.009, y - 0.065 - Math.sin(t * Math.PI) * 0.045]); }
        pts.push([hx + 0.075, top + 0.035]);
        fill(pts); paint(OUT);
      } else if (hair === 'Sprout') {
        ink(curve([hx, top + 0.01], [hx - 0.01, top - 0.04], [hx + 0.02, top - 0.06], [hx + 0.01, top - 0.09], 10), C('#3a7a2a'));
        const LEAF = ramp('#5bb04a');
        fill(curve([hx + 0.01, top - 0.09], [hx - 0.05, top - 0.13], [hx - 0.08, top - 0.08], [hx + 0.01, top - 0.09], 10)); paint(LEAF);
        fill(curve([hx + 0.01, top - 0.09], [hx + 0.06, top - 0.14], [hx + 0.09, top - 0.08], [hx + 0.01, top - 0.09], 10)); paint(LEAF);
      } else if (hair === 'Comb-Over') {
        CLIP = HM;
        for (let k = 0; k < 4; k++) ink(curve([hx - hrx * 0.7, top + 0.03 + k * 0.016], [hx - hrx * 0.2, top - 0.03 + k * 0.014], [hx + hrx * 0.3, top - 0.01 + k * 0.014], [hx + hrx * 0.6, top + 0.04 + k * 0.016], 12), HAIR[1]);
        CLIP = null;
      } else if (hair === 'Pigtails') for (const s of [-1, 1]) {
        const bx = hx + s * hrx * 0.55;
        fill(curve([bx, top + 0.01], [bx + s * 0.04, top - 0.07], [bx + s * 0.1, top - 0.06], [bx + s * 0.11, top - 0.02], 10).concat(curve([bx + s * 0.11, top - 0.02], [bx + s * 0.08, top - 0.03], [bx + s * 0.03, top - 0.02], [bx, top + 0.015], 8)));
        paint(HAIR);
        fill(oval(bx, top + 0.012, 0.016, 0.014, 12)); paint(HUE2);
      } else if (hair === 'Pompadour') {
        fill(curve([hx - hrx * 0.6, top + 0.04], [hx - hrx * 0.6, top - 0.1], [hx + hrx * 0.5, top - 0.14], [hx + hrx * 0.75, top - 0.05], 14).concat(curve([hx + hrx * 0.75, top - 0.05], [hx + hrx * 0.5, top - 0.06], [hx + hrx * 0.2, top - 0.02], [hx + hrx * 0.5, top + 0.04], 10)));
        paint(HAIR);
        ink(curve([hx - hrx * 0.4, top - 0.035], [hx - hrx * 0.2, top - 0.09], [hx + hrx * 0.2, top - 0.105], [hx + hrx * 0.45, top - 0.075], 8), HAIR[2]);
      } else if (hair === 'Bald' || hair === 'Unibrow') shine(hx - hrx * 0.42, hy - hry * 0.66);
      // brow: wrinkles, or one heavy unibrow
      if (hair === 'Unibrow') { fill(curve([hx - hrx * 0.62, hy - hry * 0.42], [hx - 0.04, hy - hry * 0.7], [hx + 0.04, hy - hry * 0.7], [hx + hrx * 0.62, hy - hry * 0.42], 12).concat(curve([hx + hrx * 0.62, hy - hry * 0.42], [hx + 0.04, hy - hry * 0.5], [hx - 0.04, hy - hry * 0.5], [hx - hrx * 0.62, hy - hry * 0.42], 12))); paint(HAIR, { keep: true }); }
      else ink([[hx - 0.05, hy - hry * 0.55], [hx - 0.02, hy - hry * 0.63], [hx + 0.02, hy - hry * 0.63], [hx + 0.05, hy - hry * 0.55]], SK[0]);

      // headgear on top of the hair
      if (hat === 'Welding Mask') {
        fill([[hx - hrx * 0.85, top + 0.05], [hx - hrx * 0.8, top - 0.06], [hx + hrx * 0.8, top - 0.06], [hx + hrx * 0.85, top + 0.05], [hx + hrx * 0.5, top + 0.08], [hx - hrx * 0.5, top + 0.08]]); paint(DSTEEL, { dither: true });
        fill([[hx - hrx * 0.42, top - 0.04], [hx + hrx * 0.42, top - 0.04], [hx + hrx * 0.42, top + 0.02], [hx - hrx * 0.42, top + 0.02]]); paint(ramp('#2a6a62', '#143a36', '#7ac8b8'));
        for (const s of [-1, 1]) { fill(oval(hx + s * hrx * 0.92, top + 0.06, 0.018, 0.018, 10)); paint(STEEL); }
      } else if (hat === 'Propeller Cap') {
        fill(curve([hx - hrx * 0.72, top + 0.045], [hx - hrx * 0.6, top - 0.085], [hx + hrx * 0.6, top - 0.085], [hx + hrx * 0.72, top + 0.045], 14)); paint(OUT);
        tube([[hx, top - 0.05], [hx, top - 0.11]], 0.6); paint(DSTEEL, { keep: true });
        fill(oval(hx - 0.055, top - 0.118, 0.055, 0.016, 14)); paint(YEL, { keep: true }); fill(oval(hx + 0.055, top - 0.118, 0.055, 0.016, 14)); paint(RED, { keep: true });
      } else if (hat === 'Hard Hat') {
        fill(curve([hx - hrx * 0.75, top + 0.04], [hx - hrx * 0.7, top - 0.1], [hx + hrx * 0.7, top - 0.1], [hx + hrx * 0.75, top + 0.04], 14)); paint(YEL);
        fill([[hx - hrx * 0.98, top + 0.035], [hx + hrx * 0.98, top + 0.035], [hx + hrx * 0.92, top + 0.07], [hx - hrx * 0.92, top + 0.07]]); paint(YEL);
        fill([[hx - 0.016, top - 0.065], [hx + 0.016, top - 0.065], [hx + 0.016, top + 0.03], [hx - 0.016, top + 0.03]]); paint(ramp('#e0a020'));
      } else if (hat === 'Bucket') {
        fill([[hx - hrx * 0.8, top + 0.06], [hx - hrx * 0.62, top - 0.14], [hx + hrx * 0.62, top - 0.14], [hx + hrx * 0.8, top + 0.06]]); paint(STEEL, { dither: true });
        for (let k = 1; k < 4; k++) ink([[hx - hrx * (0.8 - k * 0.045), top + 0.06 - k * 0.05], [hx + hrx * (0.8 - k * 0.045), top + 0.06 - k * 0.05]], STEEL[0]);
        ink(curve([hx - hrx * 0.78, top + 0.04], [hx - hrx * 0.9, top + 0.2], [hx + hrx * 0.9, top + 0.2], [hx + hrx * 0.78, top + 0.04], 12));
      } else if (hat === 'Paper Hat') {
        fill([[hx - hrx * 0.85, top + 0.05], [hx - 0.01, top - 0.14], [hx + hrx * 0.85, top + 0.05]]); paint(ramp('#f2eee2'));
        for (let k = 0; k < 3; k++) ink([[hx - 0.06 + k * 0.04, top - 0.02 + (k % 2) * 0.012], [hx - 0.035 + k * 0.04, top - 0.02 + (k % 2) * 0.012]], C('#9a968a'));
        fill([[hx - hrx * 0.82, top + 0.025], [hx + hrx * 0.82, top + 0.025], [hx + hrx * 0.87, top + 0.065], [hx - hrx * 0.87, top + 0.065]]); paint(ramp('#e2dccb'));
      } else if (hat === 'Headlamp') {
        tube(curve([hx - hrx * 0.98, hy - hry * 0.55], [hx - hrx * 0.5, top], [hx + hrx * 0.5, top], [hx + hrx * 0.98, hy - hry * 0.55], 14), 1.2); paint(HUE2, { clip: HM });
        fill([[hx - 0.036, top + 0.005], [hx - 0.036, top - 0.055], [hx + 0.036, top - 0.055], [hx + 0.036, top + 0.005]]); paint(DSTEEL);
        fill(oval(hx, top - 0.025, 0.022, 0.022, 12)); paint(ramp('#fff6c0', '#e8c860', '#ffffff'), { flat: true });
      } else if (hat === 'Foil Hat') {
        fill([[hx - hrx * 0.7, top + 0.045], [hx - hrx * 0.3, top - 0.03], [hx - 0.01, top - 0.17], [hx + hrx * 0.25, top - 0.05], [hx + hrx * 0.7, top + 0.045]]); paint(ramp('#d8dde4', '#8a929c', '#ffffff'), { dither: true });
        for (let k = 0; k < 3; k++) ink([[hx - 0.05 + k * 0.035, top + 0.02 - k * 0.02], [hx - 0.025 + k * 0.035, top - 0.01 - k * 0.02]], C('#8a929c'));
      } else if (hat === 'Traffic Cone') {
        fill([[hx - hrx * 0.72, top + 0.06], [hx - 0.026, top - 0.22], [hx + 0.026, top - 0.22], [hx + hrx * 0.72, top + 0.06]]); paint(ramp('#f2702a'));
        fill([[hx - hrx * 0.44, top - 0.035], [hx + hrx * 0.44, top - 0.035], [hx + hrx * 0.3, top - 0.1], [hx - hrx * 0.3, top - 0.1]]); paint(WHITE);
      } else if (hat === 'Saucepan') {
        // an upside-down saucepan, its long black handle sticking out sideways
        const hs = tufts[0][0] < 0.5 ? -1 : 1;
        tube([[hx + hs * hrx * 0.7, top - 0.04], [hx + hs * (hrx * 0.7 + 0.2), top - 0.075]], 1.6); paint(ramp('#34343e', '#1c1c24', '#6a6a7a'), { keep: true });
        fill([[hx - hrx * 0.86, top + 0.05], [hx - hrx * 0.78, top - 0.085], [hx + hrx * 0.78, top - 0.085], [hx + hrx * 0.86, top + 0.05]]); paint(ramp('#c8902a', '#8a5a1a', '#f2c87a'), { dither: true });
        fill([[hx - hrx * 0.82, top - 0.085], [hx + hrx * 0.82, top - 0.085], [hx + hrx * 0.82, top - 0.115], [hx - hrx * 0.82, top - 0.115]]); paint(ramp('#c8902a', '#8a5a1a', '#f2c87a'));
        const [rx, ry] = cellOf([hx + hs * hrx * 0.6, top - 0.04]); setD(rx, ry, STEEL[2]); setD(rx, ry + 2, STEEL[2]);
      } else if (hat === 'Beanie') {
        // a knitted beanie with a ribbed brim and a pom-pom
        const KN = ramp(hue2 === '#f2ede0' ? '#3a6fb0' : hue2);
        fill(curve([hx - hrx * 0.8, top + 0.05], [hx - hrx * 0.78, top - 0.12], [hx + hrx * 0.78, top - 0.12], [hx + hrx * 0.8, top + 0.05], 14)); paint(KN, { dither: true });
        for (let k = 0; k < 3; k++) ink(curve([hx - hrx * 0.7, top - 0.005 - k * 0.035], [hx - hrx * 0.3, top - 0.03 - k * 0.04], [hx + hrx * 0.3, top - 0.03 - k * 0.04], [hx + hrx * 0.7, top - 0.005 - k * 0.035], 10), KN[0]);
        fill([[hx - hrx * 0.86, top + 0.005], [hx + hrx * 0.86, top + 0.005], [hx + hrx * 0.88, top + 0.065], [hx - hrx * 0.88, top + 0.065]]); paint(KN);
        for (let x = cellOf([hx - hrx * 0.8, top])[0] + 1; x < cellOf([hx + hrx * 0.8, top])[0]; x += 2) { const y = cellOf([hx, top + 0.02])[1]; setD(x, y, KN[0]); setD(x, y + 1, KN[0]); }
        fill(oval(hx, top - 0.125, 0.034, 0.03, 16)); paint(WHITE, { dither: true });
      }
      if (legend === 'Scrap King') {
        // a crown built from his own scrap: a tin-can band, spark plugs, fork tines and a light bulb in the middle
        const [ccx, ccy] = cellOf([hx, top + 0.02]);
        const SPR = {
          plug: ['..k..', '.kck.', '.kwk.', 'kwwwk', 'kwwwk', 'kwwwk', 'kdSdk', 'kSSSk'],
          fork: ['k.k.k', 'ksksk', 'ksksk', 'ksksk', 'kSSSk', 'kSSSk', '.kSk.', '.kSk.'],
          bulb: ['..kkk..', '.kyyyk.', 'kyyYyyk', 'kyYoYyk', 'kyyYyyk', '.kyyyk.', '..kSk..', '..kdk..'],
        };
        const row = ['plug', 'fork', 'bulb', 'fork', 'plug'];
        const wide = row.reduce((s, k) => s + SPR[k][0].length - 1, 1), x0 = ccx - (wide >> 1);
        const cmap = { k: INK, c: C('#d8843a'), w: WHITE[1], s: STEEL[2], S: STEEL[1], d: STEEL[0], y: C('#fff4b0'), Y: C('#e8c860'), o: C('#c8902a') };
        // the band first (a red label round a tin can), then each piece of scrap stood in it
        for (let x = x0 - 1; x <= x0 + wide; x++) for (let y = ccy - 2; y < ccy + 2; y++) if (x >= 0 && x < N && y >= 0 && y < N) M[y * N + x] = 1;
        paint(STEEL, { keep: true });
        blk(x0 + 1, ccy - 1, wide - 2, 2, C('#c2453a')); blk(x0 + 1, ccy - 1, wide - 2, 1, C('#e0685a'));
        for (let x = x0 + 1; x < x0 + wide - 1; x += 4) setD(x, ccy - 1, C('#f2ede0'));
        let px = x0;
        for (const k of row) {
          const sp = SPR[k], h = sp.length, lift = k === 'bulb' ? 2 : k === 'fork' ? 1 : 0, y0 = ccy - 3 - lift - h + 1;
          stamp(sp, px, y0, cmap);
          if (k === 'bulb') kingBulb = [px + 3, y0 + 3];
          if (lift) blk(px + (sp[0].length >> 1), ccy - 2 - lift, 1, lift, STEEL[1]);
          px += sp[0].length - 1;
        }
      }

      // nose
      const ny = hy + hry * 0.15;
      if (nose === 'Snout') {
        fill(curve([hx - 0.028, ny + 0.018], [hx - 0.034, ny - 0.034], [hx + 0.034, ny - 0.034], [hx + 0.028, ny + 0.018], 10).concat([[hx, ny + 0.028]])); paint(SKD);
        for (const s of [-1, 1]) { const [x, y] = cellOf([hx + s * 0.013, ny + 0.006]); setD(x, y, INK); }
      } else if (nose === 'Hook') {
        fill(curve([hx - 0.012, ny - 0.065], [hx + 0.055, ny - 0.03], [hx + 0.055, ny + 0.035], [hx + 0.005, ny + 0.04], 10).concat(curve([hx + 0.005, ny + 0.04], [hx + 0.02, ny + 0.015], [hx - 0.01, ny], [hx - 0.018, ny + 0.022], 6))); paint(SKD);
      } else if (nose === 'Bulb') {
        fill(ell(hx, ny + 0.005, 0.042, 0.036, 20, [1, 0.06, 3])); paint(ramp('#d86a6a'));
      } else if (nose === 'Pig') {
        fill(oval(hx, ny + 0.005, 0.036, 0.028, 18)); paint(PINK);
        for (const s of [-1, 1]) { const [x, y] = cellOf([hx + s * 0.014, ny]); setD(x, y, INK); setD(x, y + 1, INK); }
      } else if (nose === 'Button') { fill(oval(hx, ny + 0.01, 0.02, 0.017, 12)); paint(SKD); }
      else { fill([[hx - 0.02, ny - 0.032], [hx + 0.115, ny + 0.03], [hx - 0.012, ny + 0.028]]); paint(SK, { dither: true }); }

      // mouth, with every tooth placed by hand
      const my = hy + hry * 0.55, mcx = hx + (legend === 'Clockwork' ? 0.045 : 0);
      const zip = grin === 'Zipper', grim = grin === 'Grimace';
      const open = zip ? 0.02 : grim ? mouthOpen * 0.6 : mouthOpen;
      const upper = curve([mcx - mouthW, my - 0.03], [mcx - mouthW * 0.5, my + (grim ? -0.005 : 0.01)], [mcx + mouthW * 0.5, my + (grim ? -0.005 : 0.01)], [mcx + mouthW, my - 0.03], 14);
      const lower = curve([mcx + mouthW, my - 0.03], [mcx + mouthW * 0.5, my + open + 0.008], [mcx - mouthW * 0.5, my + open + 0.008], [mcx - mouthW, my - 0.03], 14);
      fill(upper.concat(lower)); paint(MOUTH, { flat: true, save: MM });
      let mouthCols = null;
      {
        const colT = new Int16Array(N).fill(-1), colB = new Int16Array(N).fill(-1);
        let x0 = N, x1 = -1;
        for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) if (MM[y * N + x]) { if (colT[x] < 0) colT[x] = y; colB[x] = y; x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
        mouthCols = [colT, colB, x0, x1];
        CLIP = MM;
        const TT = grin === 'Gold Grill' ? GOLD : TEETH;
        const down = (x, h, v) => { if (x >= 0 && x < N && colT[x] >= 0) for (let j = 0; j < h; j++) setD(x, colT[x] + j, j === 0 ? v[2] : v[1]); };
        const up = (x, h, v) => { if (x >= 0 && x < N && colB[x] >= 0) for (let j = 0; j < h; j++) setD(x, colB[x] - j, j === h - 1 ? v[2] : v[1]); };
        const cxm = cellOf([mcx, my])[0];
        if (grin === 'Sawtooth' || grin === 'Braces' || grin === 'Gold Grill') {
          for (let x = x0; x <= x1; x++) { const k = (x - x0) % 4; down(x, [1, 2, 1, 0][k] + (colB[x] - colT[x] > 5 && k === 1 ? 1 : 0), TT); }
          for (let x = x0 + 1; x <= x1 - 1; x++) if (colB[x] - colT[x] >= 4) { const k = (x - x0 + 2) % 4; up(x, [1, 2, 1, 0][k], TT); }
          if (grin === 'Braces') for (let x = x0 + 1; x < x1; x++) if (colT[x] >= 0) setD(x, colT[x] + 1, (x - x0) % 4 === 1 ? STEEL[2] : STEEL[1]);
        } else if (grim) {
          for (let x = x0; x <= x1; x++) if (colT[x] >= 0) { const mid = (colT[x] + colB[x] + 1) >> 1; for (let y = colT[x]; y <= colB[x]; y++) if (y !== mid) setD(x, y, (x - x0) % 3 === 2 ? TEETH[0] : TEETH[1]); }
        } else if (grin === 'Buck Teeth') {
          for (let x = cxm - 2; x < cxm + 2; x++) down(x, 3, TEETH);
          if (colT[cxm - 1] >= 0) for (let j = 0; j < 3; j++) setD(cxm - 1, colT[cxm - 1] + j, TEETH[0]);
        } else if (grin === 'Gap') {
          for (const f of [-0.6, -0.12, 0.42]) { const x = cellOf([mcx + f * mouthW, my])[0]; down(x, 2, TEETH); down(x + 1, 2, TEETH); }
        } else if (grin === 'Underbite') {
          for (const f of [-0.55, 0.45]) { const x = cellOf([mcx + f * mouthW, my])[0]; up(x, 3, TEETH); up(x + 1, 2, TEETH); }
        } else if (grin === 'Snaggletooth') {
          const x = cellOf([mcx + 0.25 * mouthW, my])[0]; down(x, 3, TEETH); down(x + 1, 2, TEETH);
        } else if (zip) {
          for (let x = x0; x <= x1; x++) if (colT[x] >= 0) for (let y = colT[x]; y <= colB[x]; y++) setD(x, y, y === ((colT[x] + colB[x] + 1) >> 1) ? ((x & 1) ? INK : STEEL[2]) : STEEL[1]);
        } else for (const f of [-0.6, 0.6]) { const x = cellOf([mcx + f * mouthW, my])[0]; down(x, 2, TEETH); down(x + (f < 0 ? 1 : -1), 1, TEETH); }
        CLIP = null;
        if (zip) { const [tx, ty] = cellOf([mcx + mouthW * 0.98, my - 0.005]); stamp(['kk', 'ss', 'ss', 'kk'], tx, ty - 1, { k: INK, s: STEEL[1] }); }
      }
      // clockwork: an open panel in the cheek, the gear inside it is live
      let gearAt = null;
      if (legend === 'Clockwork') {
        let [pcx, pcy] = cellOf([hx - hrx * 0.6, hy + hry * 0.48]);
        for (let x = 0; x < N; x++) if (HM[(pcy + 3) * N + x]) { pcx = Math.max(pcx, x + 5); break; }
        stamp(['.kkkkkkk.', 'kSdddddSk', 'kdiiiiidk', 'kdiiiiidk', 'kdiiiiidk', 'kdiiiiidk', 'kdiiiiidk', 'kSdddddSk', '.kkkkkkk.'], pcx - 4, pcy - 4, { k: INK, S: STEEL[2], d: DSTEEL[1], i: C('#1a1416') });
        gearAt = [pcx, pcy];
      }
      if (grin === 'Tongue') { fill(curve([mcx - 0.032, my + mouthOpen * 0.55], [mcx - 0.045, my + mouthOpen + 0.06], [mcx + 0.05, my + mouthOpen + 0.06], [mcx + 0.036, my + mouthOpen * 0.55], 12)); paint(ramp('#ef6f86')); }
      if (outfit === 'Aviator Scarf') {
        fill(curve([hx - 0.16, shY - 0.01], [hx - 0.05, shY + 0.05], [hx + 0.05, shY + 0.05], [hx + 0.16, shY - 0.01], 12).concat(curve([hx + 0.16, shY + 0.045], [hx + 0.05, shY + 0.105], [hx - 0.05, shY + 0.105], [hx - 0.16, shY + 0.045], 12))); paint(ramp('#f2ede0'));
        fill([[hx - 0.1, shY + 0.06], [hx - 0.165, shY + 0.21], [hx - 0.1, shY + 0.225], [hx - 0.055, shY + 0.08]]); paint(ramp('#f2ede0'));
      }

      // ---------- the pose: held up beside the head, hugged to the chest, gnawed, balanced on its head, or set on a workbench ----------
      // each loot's extent in its own space, from the grip: [bottom, top, half width, centre x, long]
      const LOOTS = { Wrench: [0.02, -0.245, 0.036, 0, 1], Screwdriver: [0.11, -0.2, 0.03, 0, 1], Fork: [0.03, -0.235, 0.06, 0, 1], 'Chewed Wire': [0, -0.1, 0.02, 0, 0],
        'Spark Plug': [0.035, -0.18, 0.03, 0, 1], 'Rubber Chicken': [0.01, -0.28, 0.05, 0.04, 1], 'Lit Fuse': [-0.018, -0.22, 0.062, 0, 0], 'Light Bulb': [-0.01, -0.157, 0.047, 0, 0],
        Magnet: [-0.04, -0.245, 0.07, 0, 1], Gear: [-0.02, -0.18, 0.08, 0, 0], 'Golden Gear': [-0.02, -0.18, 0.08, 0, 0], Battery: [0.01, -0.18, 0.026, 0, 1], Plunger: [0.03, -0.245, 0.062, 0, 1],
        'Duct Tape': [0.022, -0.142, 0.062, 0, 0], 'Tiny Rocket': [0, -0.225, 0.055, 0, 1], 'Jar of Fireflies': [0.025, -0.19, 0.042, 0, 0] };
      const [lb, ltp, lhw, lcx, isLong] = LOOTS[loot], lmid = (lb + ltp) / 2;
      // a placement: the loot's own point f (from the grip) lands on P, turned by th and scaled by sc (flip mirrors it)
      const XFat = (P, f, th, sc, flip) => { const co = Math.cos(th), sn = Math.sin(th), fl = flip || 1; return p => { const dx = (p[0] - handX - f[0]) * fl, dy = p[1] - handY - f[1]; return [P[0] + sc * (co * dx - sn * dy), P[1] + sc * (sn * dx + co * dy)]; }; };
      const Tinv = q => { const u = (q[0] - 0.5) / ZK, v = (q[1] - ZY) / ZK; return [0.5 + u * ct + v * st, 0.9 - u * st + v * ct]; };
      const sleeveHex = { Hoodie: outfitHue, 'Lab Coat': '#f4f2ec', 'Leather Jacket': '#3a2e2a', 'Hawaiian Shirt': '#e8584a', 'Patched Sweater': hue2 === '#f2ede0' ? '#c26a3a' : hue2, Tuxedo: '#2a2832', Raincoat: '#f0c93a' }[outfit];
      const drawArm = armPts => {
        tube(armPts, (build === 'Stocky' ? 0.058 : build === 'Scrawny' ? 0.042 : 0.05) * ZK * N / 2 - 0.4); paint(SK);
        if (sleeveHex) { tube(armPts.slice(0, 11), (build === 'Stocky' ? 0.07 : 0.06) * ZK * N / 2 - 0.4); paint(outfit === 'Lab Coat' ? WHITE : ramp(sleeveHex), { dither: true }); }
      };
      const armTo = (sh, el, wr, s) => curve(sh, [sh[0] + s * 0.04, sh[1] + 0.04], [el[0] + s * 0.01, el[1] - 0.04], el, 8).concat(curve(el, [el[0] - s * 0.005, el[1] - 0.06], [wr[0] + s * 0.03, wr[1] + 0.05], wr, 8).slice(1));
      const benchY = 0.865, hugS = 1.3, hugY = 0.825, hugA = lhw * hugS + 0.035;
      let LT;
      // a cob held for gnawing spans the face at the mouth with room over, so each claw grips an end clear of the cheek
      const lootLen = lb - ltp, gnawSc = Math.min(1.9, Math.max(1.3, (2 * hrx * 0.84 + 0.11) / lootLen));
      const cobEnd = s => [hx + s * (gnawSc * lootLen / 2 - 0.018), my + 0.012];
      if (pose === 'Held Up') {
        // the arm, bent at the elbow, reaching up to the loot held at 1.45 times its size
        LT = XFat([handX, handY], [0, 0], 0, 1.45);
        drawArm(armTo([sx0, sy0], elbow, wrist, 1));
      } else if (pose === 'Hugged') {
        // both arms wrapped round the loot, held to the chest
        LT = XFat([hx + lcx * hugS, hugY], [lcx, lmid], 0, hugS);
        // each arm runs from the shoulder down the side to a low elbow, then the forearm wraps in under the loot to the claw
        for (const s of [-1, 1]) { const wr = [hx + lcx * hugS + s * (hugA + 0.02), hugY + 0.035], el = [0.5 + s * (sw + 0.05), Math.min(0.95, hugY + 0.1)]; drawArm(curve([0.5 + s * sw * 0.82, sy0], [0.5 + s * (sw + 0.05), sy0 + 0.03], [el[0], el[1] - 0.04], el, 8).concat(curve(el, [el[0] - s * 0.01, el[1] + 0.03], [wr[0] + s * 0.06, wr[1] + 0.06], wr, 8).slice(1))); }
      } else if (pose === 'Gnawing') {
        // the loot up at the mouth: long things crosswise like a bone, the rest bitten at one side
        if (loot === 'Chewed Wire') LT = XFat([hx + mouthW * 0.45, my], [0, -0.08], 0, 1.3);
        else if (isLong) LT = XFat([hx, my + 0.012], [lcx, lmid], -Math.PI / 2, gnawSc);
        else LT = XFat([hx + mouthW * 0.2, my + 0.01], [lcx - lhw, lmid], 0, 1.3);
        if (isLong) for (const s of [-1, 1]) { const [px, py] = cobEnd(s); const el = [s > 0 ? Math.max(0.5 + sw + 0.05, px + 0.06) : Math.min(0.5 - sw - 0.05, px - 0.06), sy0 + 0.04]; drawArm(curve([0.5 + s * sw * 0.82, sy0], [0.5 + s * (sw * 0.82 + 0.04), sy0 + 0.04], [el[0], el[1] + 0.02], el, 8).concat(curve(el, [el[0], el[1] - 0.06], [px + s * 0.02, py + 0.09], [px + s * 0.006, py + 0.035], 8).slice(1))); }
        else drawArm(armTo([sx0, sy0], [sx0 + 0.07, 0.96], LT([handX + lcx + lhw + 0.03, handY + lmid + 0.035]), 1));
      } else if (pose === 'On Its Head') {
        // balanced on top of whatever is on its head; long things (or anything too tall for the room) lie flat
        const cxs = cellOf([hx, topY])[0];
        let tc = N;
        for (let x = cxs - 2; x <= cxs + 2; x++) if (x >= 0 && x < N) for (let y = 0; y < tc; y++) if (L[y * N + x] !== 255) { tc = y; break; }
        const q = Tinv([(cxs + 0.5) / N, (tc + 0.7) / N]);
        LT = loot === 'Chewed Wire' ? XFat(q, [0, -0.1], Math.PI, 1.2) : isLong || (tc + 0.7) / N - ZK * (lb - ltp) < 0.03 ? XFat(q, [lcx - lhw, lmid], -Math.PI / 2, 1) : XFat(q, [lcx, lb], 0, 1);
        drawArm(curve([sx0, sy0], [sx0 + 0.04, sy0 + 0.05], [sx0 + 0.05, 0.97], [sx0 + 0.035, 1.07], 12));
      } else {
        // peeking over a workbench, the loot stood on it; the bench stays level whatever the tilt
        XF = Tinv;
        fill([[-0.05, benchY], [1.05, benchY], [1.05, 1.1], [-0.05, 1.1]]); paint(ramp('#a8743e', '#6a4424', '#d4a466'), { dither: true });
        fill([[-0.05, benchY], [1.05, benchY], [1.05, benchY + 0.03], [-0.05, benchY + 0.03]]); paint(ramp('#d4a466', '#a8743e', '#f0c88a'));
        for (const x of [0.2, 0.47, 0.81]) ink([[x, benchY + 0.045], [x, 1.05]], C('#6a4424'));
        for (const x of [0.08, 0.92]) { const [bx, by] = cellOf([x, benchY + 0.07]); blk(bx, by, 2, 2, DSTEEL[1]); setD(bx, by, DSTEEL[2]); }
        XF = null;
        LT = XFat(Tinv([handX - 0.02, benchY + 0.006]), [lcx, lb], 0, 1.2);
      }

      // the loot
      XF = LT;
      const lx = handX, ly = handY;
      if (loot === 'Wrench') {
        fill([[lx - 0.012, ly + 0.02], [lx - 0.012, ly - 0.18], [lx + 0.012, ly - 0.18], [lx + 0.012, ly + 0.02]]); paint(STEEL);
        fill([[lx - 0.036, ly - 0.17], [lx - 0.03, ly - 0.245], [lx - 0.01, ly - 0.245], [lx - 0.01, ly - 0.205], [lx + 0.01, ly - 0.205], [lx + 0.01, ly - 0.245], [lx + 0.03, ly - 0.245], [lx + 0.036, ly - 0.17]]); paint(STEEL);
      } else if (loot === 'Screwdriver') {
        // a fat see-through orange handle with grip ridges, a black-tipped flat blade
        fill([[lx - 0.007, ly - 0.06], [lx - 0.007, ly - 0.18], [lx - 0.012, ly - 0.2], [lx + 0.012, ly - 0.2], [lx + 0.007, ly - 0.18], [lx + 0.007, ly - 0.06]]); paint(STEEL, { keep: true });
        const [tx, ty] = cellOf([lx, ly - 0.195]); setD(tx, ty, DSTEEL[0]);
        const ORG = ramp('#f2902a', '#b8581a', '#ffc070');
        fill([[lx - 0.022, ly + 0.11], [lx - 0.03, ly + 0.06], [lx - 0.03, ly - 0.015], [lx - 0.022, ly - 0.075], [lx + 0.022, ly - 0.075], [lx + 0.03, ly - 0.015], [lx + 0.03, ly + 0.06], [lx + 0.022, ly + 0.11]]); paint(ORG);
        for (const f of [-0.01, 0.01]) ink([[lx + f, ly + 0.1], [lx + f, ly - 0.065]], ORG[0]);
      } else if (loot === 'Fork') {
        // a bent old fork: a wooden handle, its tines splayed every which way
        fill([[lx - 0.016, ly + 0.03], [lx - 0.016, ly - 0.08], [lx + 0.016, ly - 0.08], [lx + 0.016, ly + 0.03]]); paint(ramp('#a8743e', '#6a4424', '#d4a466'));
        tube([[lx, ly - 0.08], [lx + 0.006, ly - 0.13]], 0.9); paint(STEEL, { keep: true });
        fill([[lx - 0.036, ly - 0.122], [lx + 0.046, ly - 0.128], [lx + 0.046, ly - 0.158], [lx - 0.036, ly - 0.15]]); paint(STEEL, { keep: true });
        for (const [f, bend, up] of [[-0.024, -0.04, 0.2], [0.006, 0.006, 0.235], [0.036, 0.03, 0.215]]) { tube([[lx + f, ly - 0.15], [lx + f + bend * 0.3, ly - 0.185], [lx + f + bend, ly - up]], 0.85); paint(STEEL, { keep: true }); }
      } else if (loot === 'Chewed Wire') {
        tube(curve([lx - 0.25, 1.04], [lx - 0.1, 0.9], [lx + 0.05, ly + 0.05], [lx, ly - 0.06], 16), 1.2); paint(RED, { keep: true });
        for (let k = -1; k <= 1; k++) ink([[lx, ly - 0.065], [lx + k * 0.02, ly - 0.095]], C('#e8a050'));
      } else if (loot === 'Spark Plug') {
        // a white ribbed ceramic plug on a dark hex nut, with a copper cap
        fill([[lx - 0.012, ly + 0.0], [lx - 0.012, ly + 0.035], [lx + 0.012, ly + 0.035], [lx + 0.012, ly + 0.0]]); paint(STEEL, { keep: true });
        fill([[lx - 0.03, ly - 0.035], [lx - 0.03, ly + 0.004], [lx + 0.03, ly + 0.004], [lx + 0.03, ly - 0.035]]); paint(DSTEEL);
        for (const f of [-0.012, 0.012]) ink([[lx + f, ly - 0.03], [lx + f, ly]], DSTEEL[0]);
        fill([[lx - 0.02, ly - 0.035], [lx - 0.02, ly - 0.085], [lx - 0.014, ly - 0.15], [lx + 0.014, ly - 0.15], [lx + 0.02, ly - 0.085], [lx + 0.02, ly - 0.035]]); paint(ramp('#fbf8f0', '#c8c2b2', '#ffffff'));
        for (const y of [-0.06, -0.08]) ink([[lx - 0.018, ly + y], [lx + 0.018, ly + y]], C('#c8c2b2'));
        fill([[lx - 0.011, ly - 0.148], [lx - 0.011, ly - 0.18], [lx + 0.011, ly - 0.18], [lx + 0.011, ly - 0.148]]); paint(ramp('#d8843a', '#8a4a1a', '#ffc08a'));
      } else if (loot === 'Rubber Chicken') {
        fill(curve([lx, ly], [lx + 0.02, ly - 0.08], [lx - 0.02, ly - 0.16], [lx + 0.01, ly - 0.22], 10).concat(curve([lx + 0.01, ly - 0.22], [lx + 0.04, ly - 0.27], [lx + 0.075, ly - 0.22], [lx + 0.04, ly - 0.2], 8)).concat(curve([lx + 0.04, ly - 0.2], [lx + 0.02, ly - 0.14], [lx + 0.055, ly - 0.08], [lx + 0.028, ly + 0.01], 10)));
        paint(ramp('#f6e05a'));
        fill([[lx + 0.058, ly - 0.23], [lx + 0.09, ly - 0.215], [lx + 0.058, ly - 0.2]]); paint(ramp('#f08a2a'), { keep: true });
        fill([[lx + 0.018, ly - 0.25], [lx + 0.025, ly - 0.28], [lx + 0.038, ly - 0.255]]); paint(RED, { keep: true });
        const [ex, ey] = cellOf([lx + 0.035, ly - 0.228]); setD(ex, ey, INK);
      } else if (loot === 'Lit Fuse') {
        fill(oval(lx, ly - 0.08, 0.062, 0.062)); paint(ramp('#34343e', '#1c1c24', '#6a6a7a'));
        fill([[lx - 0.016, ly - 0.135], [lx - 0.016, ly - 0.165], [lx + 0.016, ly - 0.165], [lx + 0.016, ly - 0.135]]); paint(DSTEEL);
        ink(curve([lx, ly - 0.165], [lx + 0.01, ly - 0.2], [lx + 0.04, ly - 0.19], [lx + 0.05, ly - 0.22], 8), C('#c8a070'));
        const [gx, gy] = cellOf([lx - 0.025, ly - 0.105]); setD(gx, gy, WHITEP); setD(gx + 1, gy, WHITEP);
      } else if (loot === 'Light Bulb') {
        fill([[lx - 0.017, ly - 0.01], [lx - 0.017, ly - 0.052], [lx + 0.017, ly - 0.052], [lx + 0.017, ly - 0.01]]); paint(STEEL);
        fill(oval(lx, ly - 0.1, 0.047, 0.057)); paint(ramp('#fff4b0', '#e8c860', '#ffffff'));
        ink([[lx - 0.012, ly - 0.055], [lx - 0.012, ly - 0.1], [lx, ly - 0.11], [lx + 0.012, ly - 0.1], [lx + 0.012, ly - 0.055]], C('#c8902a'));
      } else if (loot === 'Magnet') {
        tube(curve([lx - 0.05, ly - 0.2], [lx - 0.05, ly - 0.02], [lx + 0.05, ly - 0.02], [lx + 0.05, ly - 0.2], 14), 1.9); paint(RED, { keep: true });
        for (const s of [-1, 1]) { fill([[lx + s * 0.05 - 0.019, ly - 0.2], [lx + s * 0.05 + 0.019, ly - 0.2], [lx + s * 0.05 + 0.019, ly - 0.245], [lx + s * 0.05 - 0.019, ly - 0.245]]); paint(STEEL); }
      } else if (loot === 'Gear' || loot === 'Golden Gear') {
        const gp = []; for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2, r = (Math.floor(k / 3) % 2 ? 0.062 : 0.08); gp.push([lx + Math.cos(a) * r, ly - 0.1 + Math.sin(a) * r]); }
        fill(gp); paint(loot === 'Golden Gear' ? GOLD : STEEL, { dither: true });
        fill(oval(lx, ly - 0.1, 0.024, 0.024, 14)); hole();
        if (loot === 'Golden Gear') { const [gx, gy] = cellOf([lx - 0.045, ly - 0.14]); setD(gx, gy, WHITEP); setD(gx + 1, gy - 1, WHITEP); }
      } else if (loot === 'Battery') {
        fill([[lx - 0.026, ly + 0.01], [lx - 0.026, ly - 0.16], [lx + 0.026, ly - 0.16], [lx + 0.026, ly + 0.01]]); paint(ramp('#34343e', '#1c1c24', '#6a6a7a'));
        fill([[lx - 0.026, ly - 0.11], [lx - 0.026, ly - 0.16], [lx + 0.026, ly - 0.16], [lx + 0.026, ly - 0.11]]); paint(ramp('#e8a83a'));
        fill([[lx - 0.01, ly - 0.16], [lx - 0.01, ly - 0.18], [lx + 0.01, ly - 0.18], [lx + 0.01, ly - 0.16]]); paint(STEEL, { keep: true });
      } else if (loot === 'Plunger') {
        fill([[lx - 0.008, ly + 0.03], [lx - 0.008, ly - 0.15], [lx + 0.008, ly - 0.15], [lx + 0.008, ly + 0.03]]); paint(ramp('#c8935a'), { keep: true });
        fill(curve([lx - 0.062, ly - 0.145], [lx - 0.055, ly - 0.245], [lx + 0.055, ly - 0.245], [lx + 0.062, ly - 0.145], 12)); paint(RED);
      } else if (loot === 'Duct Tape') {
        const TAPE = ramp('#b8bec6', '#78808a', '#e8ecf0');
        fill(oval(lx, ly - 0.08, 0.062, 0.062)); paint(TAPE, { dither: true });
        fill([[lx + 0.052, ly - 0.06], [lx + 0.12, ly], [lx + 0.1, ly + 0.022], [lx + 0.042, ly - 0.035]]); paint(TAPE);
        fill(oval(lx, ly - 0.08, 0.03, 0.03, 16)); hole();
      } else if (loot === 'Tiny Rocket') {
        fill(curve([lx - 0.027, ly - 0.02], [lx - 0.032, ly - 0.14], [lx, ly - 0.225], [lx, ly - 0.225], 10).concat(curve([lx, ly - 0.225], [lx, ly - 0.225], [lx + 0.032, ly - 0.14], [lx + 0.027, ly - 0.02], 10))); paint(WHITE);
        fill(oval(lx, ly - 0.12, 0.014, 0.014, 10)); paint(ramp('#4fb0e0'), { keep: true });
        for (const s of [-1, 1]) { fill([[lx + s * 0.024, ly - 0.07], [lx + s * 0.055, ly], [lx + s * 0.024, ly - 0.02]]); paint(RED, { keep: true }); }
      } else if (loot === 'Jar of Fireflies') {
        fill([[lx - 0.035, ly + 0.025], [lx - 0.042, ly + 0.01], [lx - 0.042, ly - 0.15], [lx - 0.032, ly - 0.165], [lx + 0.032, ly - 0.165], [lx + 0.042, ly - 0.15], [lx + 0.042, ly + 0.01], [lx + 0.035, ly + 0.025]]);
        paint(ramp('#2e5a50', '#1a3a36', '#9fd8c8'), { line: C('#5a98b0') });
        // the glass is lit from inside: a warm core, dithered out to the cool glass
        fill(oval(lx, ly - 0.07, 0.032, 0.075, 20)); paint(ramp('#8aa848', '#2e5a50', '#c8d860'), { line: null, keep: true, dither: true });
        fill(oval(lx, ly - 0.075, 0.018, 0.045, 16)); paint(ramp('#e8f080', '#c8d860', '#fff8b0'), { line: null, keep: true, flat: true });
        const [sx, sy] = cellOf([lx - 0.03, ly - 0.14]); blk(sx, sy, 1, 5, C('#cfeee0'));
      }
      // the hand: a paw placed cell by cell, a knuckle highlight on each of its three fingers and three
      // hooked claws, pale with dark tips, curled round the grip (drawn pointing left, turned to face dir)
      const PAW = ['....kkkkk.', '.wwkllmmmk', 'x..klmmmdk', '.wwkmlmmdk', 'x..kmmmmdk', '.wwkmlmddk', 'x..kmmdddk', '....kkkkk.'];
      const pawMap = { k: INK, d: SK[0], m: SK[1], l: SK[2], w: C('#eadcb4'), x: C('#4a3e36') };
      const paw = (cx, cy, dir) => {
        const h = PAW.length, w = PAW[0].length;
        for (let r = 0; r < h; r++) for (let q = 0; q < w; q++) {
          const ch = PAW[r][q]; if (ch === '.') continue;
          let dx = q - 5, dy = r - 4;
          if (dir === 'R') dx = -dx;
          else if (dir === 'D') [dx, dy] = [dy, -dx];
          else if (dir === 'U') [dx, dy] = [-dy, dx];
          setD(cx + dx, cy + dy, pawMap[ch]);
        }
      };
      const pawAt = (p, dir) => { const [x, y] = cellOf(p); paw(x, y, dir); };
      if (pose === 'Held Up' || pose === 'Workbench') pawAt([lx + 0.03, ly + 0.004], 'L');
      if (pose === 'Gnawing' && !isLong) pawAt([lx + lcx + lhw + 0.012, ly + lmid + 0.01], 'L');
      if (pose === 'Gnawing' && isLong) { XF = null; for (const s of [-1, 1]) pawAt(cobEnd(s), 'U'); }
      if (pose === 'Hugged') for (const s of [-1, 1]) { XF = XFat([hx + lcx * hugS + s * hugA, hugY + 0.01], [0, 0], 0, 1.45, s); pawAt([lx, ly], s > 0 ? 'L' : 'R'); }
      if (pose === 'Workbench') { const W2 = XFat([0.5 - sw * 0.5, benchY + 0.012], [0, 0], -Math.PI / 2, 1.45); XF = p => Tinv(W2(p)); pawAt([lx, ly], 'D'); }
      XF = null;
      // gnawing: its top teeth sink into the loot
      if (pose === 'Gnawing' && mouthCols) {
        const [colT, , x0, x1] = mouthCols, TT = grin === 'Gold Grill' ? GOLD : TEETH;
        for (let x = x0 + 1; x < x1; x++) if (colT[x] >= 0 && (x - x0) % 3 !== 0) { setD(x, colT[x], TT[2]); if ((x - x0) % 3 === 1) setD(x, colT[x] + 1, TT[1]); }
      }

      // the pet, sat up on the shoulder and drawn a size up so it reads in a tile
      const pax = 0.5 - sw * 0.7, pay = shY - 0.01;
      XF = p => [pax + (p[0] - pax) * 1.35, pay + (p[1] - pay) * 1.35];
      if (pet === 'Rat') {
        const bx = pax, by = shY - 0.02, RAT = ramp('#b0acb6', '#6a6670', '#dcd8e2'), PK = ramp('#e89aa8', '#b8687a', '#ffd0d8');
        tube(curve([bx - 0.045, by + 0.012], [bx - 0.09, by + 0.04], [bx - 0.02, by + 0.09], [bx - 0.06, by + 0.13], 12), 0.6); paint(PK, { keep: true, line: PK[0] });
        fill(ell(bx, by, 0.056, 0.036, 20)); paint(RAT, { dither: true });
        fill([[bx + 0.03, by - 0.025], [bx + 0.085, by + 0.002], [bx + 0.03, by + 0.022]]); paint(RAT);
        fill(oval(bx + 0.022, by - 0.03, 0.017, 0.017, 12)); paint(PK);
        const [nx, ny2] = cellOf([bx + 0.084, by + 0.001]); setD(nx, ny2, PK[0]);
        const [ex, ey] = cellOf([bx + 0.05, by - 0.006]); setD(ex, ey, INK); setD(ex, ey - 1, WHITEP);
      } else if (pet === 'Snail') {
        const bx = pax, by = shY - 0.015;
        fill([[bx - 0.06, by + 0.03], [bx + 0.05, by + 0.03], [bx + 0.07, by + 0.0], [bx + 0.05, by - 0.01], [bx - 0.04, by + 0.012]]); paint(ramp('#c8c890', '#8a8a5a', '#e8e8c0'));
        for (const s of [0, 1]) { ink([[bx + 0.055, by - 0.005], [bx + 0.06 + s * 0.022, by - 0.05]], C('#8a8a5a')); const [x, y] = cellOf([bx + 0.06 + s * 0.022, by - 0.052]); setD(x, y, INK); }
        fill(oval(bx - 0.008, by - 0.012, 0.042, 0.038, 20)); paint(ramp('#d9733a', '#8a3a1a', '#f2a86a'), { dither: true });
        ink(curve([bx - 0.008, by - 0.012], [bx + 0.02, by - 0.03], [bx - 0.02, by - 0.045], [bx - 0.032, by - 0.01], 10), C('#6a2a12'));
      } else if (pet === 'Bolt Bug') {
        const bx = 0.5 - sw * 0.7, by = shY - 0.005;
        fill(oval(bx, by, 0.038, 0.028, 16)); paint(STEEL);
        ink([[bx, by - 0.025], [bx, by + 0.025]], STEEL[0]);
        fill(oval(bx - 0.042, by + 0.002, 0.017, 0.015, 12)); paint(DSTEEL);
        for (const s of [-1, 1]) ink([[bx - 0.05, by - 0.005], [bx - 0.072, by - 0.03 * s]]);
        const [ex, ey] = cellOf([bx - 0.048, by - 0.002]); setD(ex, ey, RED[2]);
      } else if (pet === 'Pet Rock') {
        const bx = 0.5 - sw * 0.68, by = shY - 0.02;
        fill(ell(bx, by, 0.052, 0.037, 20, [2, 0.08, 3])); paint(ramp('#9a958a', '#5e5a52', '#c8c4b8'), { dither: true });
        for (const s of [-1, 1]) { const [x, y] = cellOf([bx + s * 0.017, by - 0.008]); stamp(['ww', 'wk'], x - 1, y - 1, { w: WHITEP, k: INK }); }
      } else if (pet === 'Mini Gremlin') {
        const bx = 0.5 - sw * 0.72, by = shY - 0.06;
        for (const s of [-1, 1]) { fill([[bx + s * 0.03, by], [bx + s * 0.078, by - 0.042], [bx + s * 0.042, by + 0.012]]); paint(SK); }
        fill(ell(bx, by + 0.01, 0.044, 0.038, 18, [lumps[0], 0.05, 3])); paint(SK);
        for (const s of [-1, 1]) { const [x, y] = cellOf([bx + s * 0.016, by + 0.002]); stamp(['yy', 'yk'], x - 1, y - 1, { y: C('#fff6c0'), k: INK }); }
        ink([[bx - 0.016, by + 0.026], [bx - 0.006, by + 0.032], [bx + 0.006, by + 0.032], [bx + 0.016, by + 0.026]]);
      }
      XF = null;

      // ---------- the legendaries' own scenes (the backdrop is replaced; live parts are drawn in show) ----------
      const hcc = T([hx, hy]), hcX = hcc[0] * N, hcY = hcc[1] * N;
      const LG = {}, gears = [], heap = [];
      if (legend === 'Clockwork') {
        // inside a clock tower: dark teal panelling, a great clock face behind the head (its hands are live),
        // brass gears turning in the corners, steam from the vents behind its ears
        D = B;
        const PW = [C('#0f1e22'), C('#132629'), C('#1a3234')], RIV = C('#2e4c4a');
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) B[y * N + x] = x % 9 === 0 ? PW[2] : (x % 9 === 8 ? PW[0] : PW[1]);
        for (let y = 4; y < N; y += 9) for (let x = 4; x < N; x += 9) B[y * N + x] = RIV;
        const R = Math.min(26, Math.max(21, Math.min(hcX, N - hcX, hcY + 6) + 4)), BR = [C('#7a5a2c'), C('#b8904e'), C('#ecca84')], DIAL = C('#e4d6b0'), DIALS = C('#c8b690'), TICK = C('#2a2018');
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const dx = x + 0.5 - hcX, dy = y + 0.5 - hcY, d = Math.hypot(dx, dy); if (d >= R) continue;
          B[y * N + x] = d > R - 2 ? (dx + dy < -R * 0.3 ? BR[2] : dx + dy > R * 0.3 ? BR[0] : BR[1]) : d > R - 2.9 ? BR[0] : (dx + dy > R * 0.55 && ((x + y) & 1)) || dx + dy > R * 0.95 ? DIALS : DIAL;
        }
        for (let k = 0; k < 60; k++) {
          const a = k / 60 * Math.PI * 2, cx = Math.cos(a), sy = Math.sin(a);
          if (k % 5) { const r = R - 4; setD(Math.floor(hcX + cx * r), Math.floor(hcY + sy * r), DIALS); continue; }
          for (let r = R - 7; r <= R - 3.6; r += 0.5) { setD(Math.floor(hcX + cx * r), Math.floor(hcY + sy * r), TICK); if (k % 15 === 0) setD(Math.floor(hcX + cx * r - sy * 0.9), Math.floor(hcY + sy * r + cx * 0.9), TICK); }
        }
        LG.dialR = R; LG.HAND = C('#1c1612'); LG.SEC = C('#c8302a'); LG.BR = BR; LG.HOLE = PW[0];
        LG.STEAM = [C('#dfe8e6'), C('#9db2b0')];
        LG.vents = [-1, 1].map(s2 => cellOf([hx + s2 * hrx * 0.95, hy - hry * 0.55]));
        gears.push([hcX < 32 ? 61 : 3, 58, 13, 12, 0.45], [hcX < 32 ? 3 : 61, 7, 10, 10, -0.6], [hcX < 32 ? 57 : 7, 40, 6, 7, 0.95]);
        for (const g of gears) {
          const [cx, cy, r, teeth] = g, poses = [];
          for (let q = 0; q < 48; q++) {
            const a0 = q * Math.PI / 24, cs = [];
            for (let y = Math.max(0, cy - r - 1); y <= Math.min(N - 1, cy + r + 1); y++) for (let x = Math.max(0, cx - r - 1); x <= Math.min(N - 1, cx + r + 1); x++) {
              const dx = x + 0.5 - cx, dy = y + 0.5 - cy, rr = Math.hypot(dx, dy); if (rr > r + 0.5) continue;
              const a = Math.atan2(dy, dx), out = Math.cos(teeth * (a - a0)) > 0.1 ? r : r - 2;
              if (rr > out) continue;
              let v = rr > out - 1 ? BR[0] : dx + dy < -r * 0.45 ? BR[2] : BR[1];
              if (rr < 1.6) v = BR[2]; else if (rr > r * 0.32 && rr < r - 3.2 && Math.cos(4 * (a - a0)) < 0.7) v = rr < r * 0.32 + 1 ? BR[0] : PW[0];
              cs.push(y * N + x, v);
            }
            poses.push(Int32Array.from(cs));
          }
          g.push(poses);
        }
        D = L;
      } else if (legend === 'Phantom') {
        // a haunted night: a deep violet sky, stars, a great moon, a bare tree and old headstones, fog drifting along
        // the ground; the ghost floats, its tail rippling into the mist, a cold light round it and wisps circling
        D = B;
        const SKY = ['#110d24', '#16112c', '#1c1534', '#22193e', '#2a1f4a'].map(C), BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) B[y * N + x] = SKY[Math.min(4, Math.floor(y / N * 4.6 + BAY[(y & 3) * 4 + (x & 3)] / 16))];
        const STAR = C('#b6b0dc');
        for (let i = 0; i < 22; i++) { const [a, b2] = dots[i]; setD(Math.floor(a * N), Math.floor(b2 * N * 0.55), STAR); }
        const mx = hcX > 32 ? 11 : 52, my = 11, MOON = C('#e6ead2'), CRAT = C('#c2c6ac'), HALO = C('#36305e');
        for (let y = 0; y < 26; y++) for (let x = Math.max(0, mx - 13); x < Math.min(N, mx + 14); x++) { const d = Math.hypot(x + 0.5 - mx, y + 0.5 - my); if (d < 7.5) B[y * N + x] = (Math.hypot(x - mx + 2, y - my - 1) < 1.6 || Math.hypot(x - mx - 3, y - my + 2) < 1.2 || Math.hypot(x - mx + 1, y - my + 4) < 1) ? CRAT : MOON; else if (d < 11 && ((x + y) & 1) && d < 9.5 + (x & 1)) B[y * N + x] = HALO; }
        const TREE = C('#08061a'), tx = hcX > 32 ? 4 : 59, td = hcX > 32 ? 1 : -1;
        for (let y = 26; y < N; y++) { const w = 1 + Math.floor((y - 26) / 14); for (let k = -w; k <= w; k++) setD(tx + k + Math.round(Math.sin(y * 0.15) * 1.5), y, TREE); }
        for (const [y0, l, up] of [[30, 9, 6], [38, 12, 5], [46, 8, 7], [33, 6, -1]]) { const x0 = tx + Math.round(Math.sin(y0 * 0.15) * 1.5); bres([x0, y0], [x0 + td * l, y0 - up], TREE); bres([x0 + td * l, y0 - up], [x0 + td * (l + 3), y0 - up - 3], TREE); bres([x0 + td * Math.floor(l / 2), y0 - Math.floor(up / 2)], [x0 + td * (Math.floor(l / 2) + 1), y0 - up - 2], TREE); }
        const STONE = C('#251f40'), STONEH = C('#3c3464');
        for (const [gx, gw, gh] of [[hcX > 32 ? 15 : 46, 7, 9], [hcX > 32 ? 24 : 38, 5, 6]]) for (let y = N - gh; y < N; y++) for (let x = gx - (gw >> 1); x <= gx + (gw >> 1); x++) { const top = N - gh, r = gw / 2, cy = top + r; if (y < cy && Math.hypot(x + 0.5 - gx - 0.5, y + 0.5 - cy) > r) continue; setD(x, y, (y === top || (y < cy && Math.hypot(x + 0.5 - gx - 0.5, y + 0.5 - cy) > r - 1)) ? STONEH : STONE); }
        LG.FOG = [C('#4a4278'), C('#6a62a0')]; LG.NIGHT = C('#07050f'); LG.LAMP = C('#6a5a2a'); LG.GLOWG = C('#2e5a66'); LG.WISP = [C('#9cf0dc'), C('#f0fff8')];
        D = L;
      } else if (legend === 'Scrap King') {
        // the throne room: crimson drapes tied back under a scalloped, gold-fringed valance, gold rays fanning out
        // behind the crown, a heap of golden scrap in front of him, glints on it and gold dust in the light
        D = B;
        const W1 = C('#2a0e26'), W2 = C('#4a1c3a'), CR = [C('#560a16'), C('#8a1424'), C('#ba2a3c')], GF = C('#e0b040'), GFD = C('#9a6a1c');
        const cx = hcX, cy = Math.max(2, hcY - hry * N * 1.6);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const a = Math.atan2(y + 0.5 - cy, x + 0.5 - cx); B[y * N + x] = Math.floor((a + Math.PI) / (Math.PI * 2) * 28 + 0.5) % 2 ? W1 : W2; }
        for (let y = 0; y < N; y++) {
          const w = Math.round(12 - 6 * Math.exp(-Math.pow((y - 42) / 6, 2)));
          for (let x = 0; x < w; x++) for (const xx of [x, N - 1 - x]) { const f = Math.sin(xx * 1.15 + y * 0.04); B[y * N + xx] = x === w - 1 ? CR[0] : f > 0.35 ? CR[2] : f < -0.45 ? CR[0] : CR[1]; }
          if (Math.abs(y - 42) <= 1) for (let x = 0; x < w + 1; x++) for (const xx of [x, N - 1 - x]) B[y * N + xx] = y === 43 ? GFD : GF;
        }
        for (let x = 0; x < N; x++) {
          const e = 5 + Math.round(2.4 * Math.abs(Math.sin((x + 0.5) * Math.PI / 8)));
          for (let y = 0; y <= e; y++) B[y * N + x] = y === 0 ? CR[0] : (x % 4 === 0 && y < e - 1) ? CR[0] : CR[1];
          B[(e + 1) * N + x] = GF; if ((x & 1) === 0) B[(e + 2) * N + x] = GFD;
          if (x % 8 === 4) { B[(e + 3) * N + x] = GF; B[(e + 4) * N + x] = GFD; }
        }
        LG.SPARK = C('#fffbe0'); LG.DUST = C('#d8a840');
        D = L;
        // the heap of golden scrap across the bottom, in front of everything: coins in rows, a red cap, a bolt, a cog
        const hb = x => N - (5 + Math.round(2.2 * Math.sin(x * 0.33 + lumps[0]) + 1.4 * Math.sin(x * 0.9 + 1)) + (Math.abs(x - hcX) < 10 ? -1 : 0));
        for (let x = 0; x < N; x++) {
          const top = hb(x);
          for (let y = top; y < N; y++) {
            const v = (x + (Math.floor(y / 2) % 2) * 2) % 4, row = y % 2;
            L[y * N + x] = y === top ? INK : v === 3 ? GOLD[0] : row === 0 && v === 0 ? GOLD[2] : GOLD[1];
            if (y > top) heap.push(y * N + x);
          }
        }
        const ck = (x0, sp, map) => { const top = hb(x0) - sp.length + 2; stamp(sp, x0 - (sp[0].length >> 1), top, map); };
        ck(9, ['.kkkk.', 'kRrrRk', 'kRrrRk', '.kkkk.'], { k: INK, R: RED[2], r: RED[1] });
        ck(53, ['.k.k.', 'kssSk', 'ksdsk', 'kSssk', '.k.k.'], { k: INK, s: STEEL[1], S: STEEL[2], d: STEEL[0] });
        ck(Math.round(hcX + (hcX < 32 ? 16 : -16)), ['kkkkk', 'kSssk', '.kdk.', '.kdk.', '.kdk.'], { k: INK, s: STEEL[1], S: STEEL[2], d: STEEL[0] });
      }

      // a phantom is the same gremlin in ghost light, see-through below the waist
      if (legend === 'Phantom') {
        const GH = ['#123038', '#356f72', '#6fb8b0', '#bdf0e6', '#f0fffa'].map(C);
        LG.GH = GH;
        for (let i = 0; i < NN; i++) if (L[i] !== 255) {
          const h = pal[L[i]], lum = parseInt(h.slice(1, 3), 16) * 0.3 + parseInt(h.slice(3, 5), 16) * 0.59 + parseInt(h.slice(5, 7), 16) * 0.11;
          L[i] = GH[lum < 45 ? 0 : lum < 95 ? 1 : lum < 150 ? 2 : lum < 205 ? 3 : 4];
        }
      }

      // ---------- live colours, registered up front ----------
      // the whites take a little of the hide's colour; glowing eyes and clockwork lamps have their own
      const EYEW = legend === 'Clockwork' ? ramp('#ffb43a', '#c06a10', '#ffe6a0') : ramp(hexmix('#fff6c0', skin, 0.2), hexmix('#d8c890', skinDark, 0.3), '#ffffff');
      const GLOWEYE = eyes === 'Red Glow' ? ramp('#ff5a3a', '#c0201a', '#ffd0a0') : ramp('#a8ff5a', '#4ac02a', '#efffc8');
      const GLOWPUP = C(eyes === 'Red Glow' ? '#3a0806' : '#0a3006'), GLOWHALO = C(hexmix(eyes === 'Red Glow' ? '#ff5a3a' : '#a8ff5a', skin, 0.45));
      const LAMPHI = C('#fff4c8'), SHUTTER = ramp('#6a6a72', '#3a3a42', '#9a9aa2');
      // the jar's warm light: each colour near it gets a lit twin
      const JARLIT = new Uint8Array(256);
      const [jarX, jarY] = (() => { XF = LT; const q = cellOf([handX, handY - 0.07]); XF = null; return q; })();
      if (jar) for (const LY of [L, B]) for (let y = Math.max(0, jarY - 21); y <= Math.min(N - 1, jarY + 21); y++) for (let x = Math.max(0, jarX - 21); x <= Math.min(N - 1, jarX + 21); x++) {
        const v = LY[y * N + x]; if (v !== 255 && !JARLIT[v] && pal.length < 250) JARLIT[v] = C(hexmix(pal[v], '#fff2a0', 0.42));
      }
      const BLOOD = ramp('#fff0e0', '#d8b8a8', '#ffffff'), VEIN = C('#d8333a');
      const BRASS = ramp('#8a6a3a', '#5a4220', '#c09a5a'), LENS = ramp('#2a5a52', '#163a34', '#6aa8a0'), GOGGLE = C('#ffe24a');
      const STRAP = ramp('#3a2a20', '#1e140e', '#5a4636');
      const SPARK1 = C('#ffe24a'), SPARK2 = C('#7af0ff'), EMBER = C('#ffb02a'), GLOWC = C('#fff0a8');
      const FLY = C('#eaff7a'), FLYDIM = C('#8aa040'), MOTH = C('#e8dcc0'), MOTHD = C('#a89878'), SPIDER = C('#2a2420');
      const GEMHI = C('#ffd8e0'), GEARHOLE = C('#1a1416'), STRING = C('#6a4424'), FLYHALO = C('#b8d050'), CLOTH = ramp('#efe4cc', '#c8b898', '#fff8ea');
      const P32 = new Uint32Array(pal.length);
      for (let i = 0; i < pal.length; i++) { const h = pal[i]; P32[i] = (0xff000000 | parseInt(h.slice(5, 7), 16) << 16 | parseInt(h.slice(3, 5), 16) << 8 | parseInt(h.slice(1, 3), 16)) >>> 0; }

      // ---------- eyes (live) ----------
      const eyeY = hy - hry * 0.2, eyeDX = hrx * 0.42 * (shape === 'Long' ? 1.1 : 1);
      if (eyes !== 'Mismatched' && eyes0 === 'Mismatched') eyeRr = eyeL;
      if (eyes === 'Mismatched' && eyes0 !== 'Mismatched') eyeRr = eyeL * 0.6;
      const SPIRALS = [['kkkk.', '...k.', 'kk.k.', 'k..k.', 'kkkk.'], ['kkkkk', 'k....', 'k.kk.', 'k..k.', 'kkkk.']];
      const eL = eyeL * eyeK * (eyes === 'Wide' ? 1.12 : 1), eR = eyeRr * eyeK * (eyes === 'Wide' ? 1.12 : 1);
      const eyeOne = (x, y, r, shut, look, f) => {
        const inward = Math.abs(x - hx) < 0.01 ? 0 : Math.sign(hx - x);
        if (eyes === 'Lamp Lenses') {
          // clockwork: a brass bezel round an amber lamp lens; a blink is a shutter coming down
          fill(oval(x, y, r * 1.35, r * 1.35)); paint(BRASS);
          fill(oval(x, y, r, r)); paint(shut > 0.5 ? SHUTTER : EYEW, { flat: shut > 0.5 });
          if (shut <= 0.5) { const [px0, py0] = cellOf([x + look * r * 0.3, y]); blk(px0 - 1, py0 - 1, 2, 2, LAMPHI); setD(px0 - 1, py0 - 2, LAMPHI); }
          for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.785, [bx, by] = cellOf([x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2]); setD(bx, by, BRASS[2]); }
          return;
        }
        if (eyes === 'Beady') {
          // beady pin eyes: no whites, a hard little bead in a dark socket
          fill(oval(x, y, r * 0.62, r * 0.55 * Math.max(0.2, 1 - shut))); paint(SKD, { line: SK[0] });
          if (shut > 0.6) return;
          const [px0, py0] = cellOf([x + look * r * 0.18, y]); blk(px0 - 1, py0 - 1, 2, 2, INK); setD(px0 - 1, py0 - 1, WHITEP);
          return;
        }
        if (eyes === 'Red Glow' || eyes === 'Green Glow') {
          // eyes that glow in the dark: a halo on the hide, a bright iris, a slit pupil
          const [cx0, cy0] = cellOf([x, y]), hr = r * N * ZK + 1.8 + nerves * 1.2;
          for (let yy = Math.floor(cy0 - hr); yy <= cy0 + hr; yy++) for (let xx = Math.floor(cx0 - hr); xx <= cx0 + hr; xx++) {
            if (xx < 0 || yy < 0 || xx >= N || yy >= N || ((xx + yy) & 1) || Math.hypot(xx + 0.5 - cx0, yy + 0.5 - cy0) > hr) continue;
            const v = L[yy * N + xx]; if (v === SK[0] || v === SK[1] || v === SK[2]) setD(xx, yy, GLOWHALO);
          }
          if (shut > 0.72) { ink([[x - r, y], [x + r, y]], GLOWEYE[0]); return; }
          fill(oval(x, y, r, r * 0.8 * Math.max(0.2, 1 - shut))); paint(GLOWEYE, { flat: true });
          const [px0, py0] = cellOf([x + look * r * 0.35, y]); blk(px0, py0 - 1, 1, 3, GLOWPUP); setD(px0 - 1, py0 - 1, GLOWEYE[2]);
          return;
        }
        if (eyes === 'Goggles') {
          fill(oval(x, y, r * 1.4, r * 1.4)); paint(BRASS);
          fill(oval(x, y, r, r)); paint(LENS);
          const [px0, py0] = cellOf([x + look * r * 0.3, y]);
          if (shut < 0.8) blk(px0 - 1, py0 - 1, 2, 2, GOGGLE);
          const [gx, gy] = cellOf([x - r * 0.5, y - r * 0.5]); setD(gx, gy, WHITEP);
          return;
        }
        const ry = r * (eyes === 'Squint' ? 0.55 : eyes === 'Slits' ? 0.62 : 1) * Math.max(0.15, 1 - shut);
        if (shut > 0.72) { ink([[x - r, y], [x + r, y]]); return; }
        fill(oval(x, y, r, ry)); paint(eyes === 'Bloodshot' ? BLOOD : EYEW);
        if (eyes === 'Bloodshot') for (let k = 0; k < 3; k++) { const a = k * 2.1 + 0.4; ink([[x + Math.cos(a) * r * 0.9, y + Math.sin(a) * ry * 0.9], [x + Math.cos(a + 0.2) * r * 0.5, y + Math.sin(a + 0.2) * ry * 0.5]], VEIN); }
        if (eyes === 'Spiral') { const [sx, sy] = cellOf([x, y]); stamp(SPIRALS[f % 2], sx - 2, sy - 2, { k: INK }); }
        else if (ry > r * 0.3) {
          const big = eyes === 'Cyclops' ? 4 : 2, [px0, py0] = cellOf([x + look * r * 0.42, y + r * (eyes === 'Slits' ? 0.2 : 0.08)]);
          blk(px0 - (big >> 1), py0 - (big >> 1), big, big, INK); setD(px0 - (big >> 1), py0 - (big >> 1), WHITEP);
          if (big > 3) setD(px0 - (big >> 1) + 1, py0 - (big >> 1), WHITEP);
        }
        if (eyes === 'Slits') {
          // heavy lids, low on the inner corner: a mean, sly look
          const d = inward || 1, lo = inward ? 0.2 : -0.35, hi = inward ? -0.6 : -0.35;
          fill([[x - d * r * 1.3, y - ry * 1.9], [x + d * r * 1.3, y - ry * 1.9], [x + d * r * 1.3, y + ry * lo], [x - d * r * 1.3, y + ry * hi]]);
          paint(SK);
        }
        if (eyes === 'Sleepy') { const lid = []; for (let i = 0; i <= 14; i++) { const a = Math.PI + i / 14 * Math.PI; lid.push([x + Math.cos(a) * r * 1.08, y + Math.sin(a) * ry * 1.08]); } lid.push([x + r * 1.08, y + ry * 0.12], [x - r * 1.08, y + ry * 0.12]); fill(lid); paint(SK); }
      };
      const drawEyes = (shut, look, f, pop) => {
        if (eyes === 'Goggles') { tube([[hx - hrx * 0.98, eyeY - 0.01], [hx + hrx * 0.98, eyeY - 0.01]], 1.1); paint(STRAP); }
        const k = pop ? 1 + pop * 0.45 : 1;
        if (eyes === 'Monocle') { fill(oval(hx + eyeDX, eyeY, eR * 1.5, eR * 1.5)); paint(GOLD); ink(curve([hx + eyeDX + eR * 1.5, eyeY + 0.01], [hx + eyeDX + 0.08, eyeY + 0.08], [hx + eyeDX + 0.05, eyeY + 0.16], [hx + eyeDX + 0.1, eyeY + 0.22], 10), GOLD[1]); }
        if (eyes === 'Cyclops') eyeOne(hx, eyeY - 0.01, Math.min(eL * 2, hrx * 0.62) * k, shut, look, f);
        else {
          eyeOne(hx - eyeDX, eyeY, eL * k, shut, look, f);
          eyeOne(hx + eyeDX, eyeY - (eyes === 'Mismatched' ? 0.012 : 0), eR * k, shut, look, f);
          if (eyes === 'Three Eyes') eyeOne(hx, eyeY - hry * 0.42, eL * 0.7 * k, shut, look, f);
        }
      };

      // ---------- nerves, a startle, and each rare one's own answer ----------
      // its yelp is pitched by a small multiply-xorshift on the hash's 3rd word
      let yv = parseInt(H.slice(18, 26), 16) | 1;
      const yr = () => { yv ^= yv << 7; yv ^= yv >>> 9; yv = Math.imul(yv, 0x2545F491) | 1; return (yv >>> 0) / 4294967296; };
      const yelpKey = 66 + Math.floor(yr() * 6), yelpRun = [[0, 7, 12], [0, 4, 7, 12], [12, 7, 3], [0, 6, 12]][Math.floor(yr() * 4)];
      let nerves = 0, jitter = 0, jump = 0, jumpV = 0, burst = 0, petRun = 0, legT = -9, jarT = -9;
      const glow = hat === 'Headlamp' || horns === 'Light Bulb' || loot === 'Light Bulb';
      const lootLamp = (() => { XF = LT; const q = cellOf([handX, handY - 0.1]); XF = null; return q; })();
      const [lampX, lampY] = hat === 'Headlamp' ? cellOf([hx, topY - 0.025]) : horns === 'Light Bulb' ? cellOf([hx, topY - 0.085]) : lootLamp;

      const chestAt = cellOf([hx, Math.min(shY + 0.11, 0.95)]);
      const keyAt = cellOf([0.5 - sw - 0.03 - belly * 0.5, pose === 'Workbench' ? Math.min(shY + 0.13, benchY - 0.05) : shY + 0.13]);
      XF = LT; const burstAt = pose === 'Held Up' ? null : cellOf([handX + lcx, handY + lmid]); XF = null;
      const headS = T([hx, hy]);
      const spiderX = cellOf([hx - hrx - 0.07, hy])[0], spiderLen = cellOf([hx, hy - hry * 0.1])[1], mothAt = cellOf([hx, topY - 0.06]);
      let keyPh = 0, keyV = 1.4, keyLast = 0, keyTap = -9;
      // the clockwork key: a brass bow of two lobes turning about its stem, seen at angle th
      const drawKey = (kx, ky, th) => {
        const cth = Math.abs(Math.cos(th)), cx = kx - 7;
        for (const s of [-1, 1]) {
          const cy = ky + 1 + s * (3.6 * cth + 0.9), ry = Math.max(0.8, 3.3 * cth), rx = 3.2;
          for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
            if (x < 0 || y < 0 || x >= N || y >= N) continue;
            const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry, d2 = u * u + v * v;
            if (d2 <= 1 && !(cth > 0.55 && d2 < 0.16)) M[y * N + x] = 1;
          }
        }
        for (let x = Math.max(0, Math.floor(cx)); x <= kx; x++) if (ky >= 0 && ky + 1 < N) M[ky * N + x] = M[(ky + 1) * N + x] = 1;
        paint(BRASS, { keep: true });
      };
      const cv = document.createElement('canvas'); cv.width = cv.height = N;
      const cg = cv.getContext('2d'), img = cg.createImageData(N, N), PX = new Uint32Array(img.data.buffer);
      // ---------- the legendaries' live parts ----------
      const GM = new Uint8Array(NN), ghostC = new Int16Array(256).fill(-1);
      const tailY = Math.floor(T([hx, shY + 0.06])[1] * N), tailW = Math.max(8, sw * ZK * N + 2);
      // the fog's two banks, laid out wide once and slid along (the back one drifts right, the front one left)
      const fogB = new Uint8Array(14 * 320), fogF = new Uint8Array(10 * 320);
      if (legend === 'Phantom') for (let x = 0; x < 320; x++) { for (let y = 0; y < 14; y++) fogB[y * 320 + x] = Math.sin(x * 0.18 + (y + 50) * 0.7) + Math.sin(x * 0.07 - (y + 50) * 0.3) + y * 0.12 > 1.1 ? 1 : 0; for (let y = 0; y < 10; y++) fogF[y * 320 + x] = Math.sin(x * 0.21 + (y + 54) * 0.9) + Math.sin(x * 0.09) + y * 0.18 > 1.25 ? 1 : 0; }
      const ghostOf = v => { if (ghostC[v] < 0) { const h = pal[v], lum = parseInt(h.slice(1, 3), 16) * 0.3 + parseInt(h.slice(3, 5), 16) * 0.59 + parseInt(h.slice(5, 7), 16) * 0.11; ghostC[v] = LG.GH[lum < 45 ? 0 : lum < 95 ? 1 : lum < 150 ? 2 : lum < 205 ? 3 : 4]; } return ghostC[v]; };
      const put = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) O[y * N + x] = v; };
      const line = (x0, y0, x1, y1, v) => { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2); for (let k = 0; k <= n; k++) put(Math.floor(x0 + (x1 - x0) * k / n), Math.floor(y0 + (y1 - y0) * k / n), v); };
      // clockwork: circling the head winds it (the key and the clock's hands follow your finger); let go and it runs
      // wild for as long as it was wound. phantom: your pointer is a lantern in the dark; the ghost flees the light,
      // and caught in it for a moment it bursts into wisps and comes back from the far side. scrap king: tap his heap
      // and a coin flies up and bounces; he counts them, and every tenth brings a fanfare and a shower of gold.
      const ghostLim = 9;
      let press0 = null, clockTap = null, wind = 0, windA = null, runAt = -9, runFor = 0, lastTick = 0, wasDown = false, ghostX = 0, litFor = 0, caughtAt = -9, coinsN = 0, fanAt = -9;
      const coins = [], burstW = [];
      const hTop = new Int16Array(N); for (let x = 0; x < N; x++) { hTop[x] = N; for (let y = 0; y < N; y++) if (heap.length && L[y * N + x] === INK && y > N - 12) { hTop[x] = y; break; } }
      const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];
      const running = t => t - runAt < runFor;
      const toyStep = (t, dt, inp) => {
        const px = inp.x * N, py = inp.y * N;
        if (legend === 'Clockwork') {
          if (inp.down && !wasDown) press0 = { x: inp.x, y: inp.y, t, moved: 0 };
          if (press0 && inp.down) press0.moved = Math.max(press0.moved, Math.hypot(inp.x - press0.x, inp.y - press0.y) * N);
          if (press0 && !inp.down) { if (press0.moved < 1.5 && t - press0.t < 0.45) clockTap = { x: press0.x, y: press0.y }; press0 = null; }
          if (inp.down && inp.inside) {
            const a = Math.atan2(py - hcY, px - hcX);
            if (windA !== null) { let d = a - windA; d = ((d + Math.PI * 3) % (Math.PI * 2)) - Math.PI; if (Math.hypot(px - hcX, py - hcY) > 4) { const w0 = wind; wind = Math.min(Math.PI * 10, wind + Math.abs(d)); keyPh += Math.abs(d) * 2; if (Math.floor(w0 / 1.2) !== Math.floor(wind / 1.2)) c.sound.hit('click', 0.2); } }
            windA = a;
          } else {
            if (wasDown && wind > Math.PI) { runAt = t; runFor = Math.min(9, wind / Math.PI * 1.2); c.sound.hit('blip', 0.3, { freq: 900 }); [0, 4, 7, 12].forEach((n, i) => c.sound.note(yelpKey + n, { dur: 0.08, vel: 0.1, wave: 'square', cutoff: 2400, at: i * 0.06 })); }
            if (!inp.down) { windA = null; if (!running(t)) wind = Math.max(0, wind - dt * 0.5); else wind = Math.max(0, wind - dt * Math.PI * 10 / 9); }
          }
          if (running(t) && Math.floor(t * 10) !== lastTick) { lastTick = Math.floor(t * 10); c.sound.hit('click', 0.1); if (lastTick % 4 === 0) c.sound.note(yelpKey + [0, 7, 12, 7][(lastTick / 4) % 4], { dur: 0.06, vel: 0.06, wave: 'square', cutoff: 2000 }); }
        } else if (legend === 'Phantom') {
          // it drifts away from the lantern, cornered only at the edges
          const gx = hcX + ghostX, d = inp.inside ? Math.hypot(px - gx, (py - hcY) * 0.7) : 99, back = t - caughtAt > 2.4;
          // it slides away from the beam, and when the beam goes it peeks back toward the middle; once the light has held
          // it for a moment it freezes, trembling and pale, and can be caught. It never leaves the frame.
          if (inp.inside && d < 26 && back && litFor < 0.35) ghostX += Math.sign(gx - px || 1) * (26 - d) / 26 * 34 * dt;
          else if (litFor < 0.35) ghostX += (0 - ghostX) * Math.min(1, dt * 0.8);
          ghostX = Math.max(-ghostLim, Math.min(ghostLim, ghostX));
          if (inp.inside && d < 12 && back) litFor += dt; else litFor = Math.max(0, litFor - dt * 1.5);
          if (litFor > 1.2) {
            litFor = 0; caughtAt = t; burstW.length = 0;
            for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283; burstW.push([gx, hcY, Math.cos(a) * (20 + k % 3 * 8), Math.sin(a) * (16 + k % 4 * 6)]); }
            c.sound.hit('noise', 0.2, { cutoff: 2600, dur: 0.6 }); [24, 19, 15, 12, 7, 3, 0].forEach((n, i) => c.sound.note(yelpKey - 12 + n, { dur: 0.3, vel: 0.08, wave: 'sine', at: i * 0.07 }));
            ghostX = ghostX > 0 ? -ghostLim * 0.6 : ghostLim * 0.6;   // it will come back at a free spot on the other side
          }
        } else if (legend === 'Scrap King') {
          for (const cn of coins) {
            if (cn[4]) continue;
            cn[0] += cn[2] * dt; cn[1] += cn[3] * dt; cn[3] += 70 * dt;
            if (cn[0] < 1 || cn[0] > N - 2) { cn[2] = -cn[2]; cn[0] = Math.max(1, Math.min(N - 2, cn[0])); }
            const top = hTop[Math.max(0, Math.min(N - 1, Math.floor(cn[0])))] - 1;
            if (cn[1] >= top && cn[3] > 0) { cn[1] = top; cn[3] *= -0.45; cn[2] *= 0.7; cn[5]++; c.sound.note(yelpKey + 12 + cn[5] * 2, { dur: 0.05, vel: 0.07, wave: 'square', cutoff: 3000 }); if (cn[5] >= 3 || Math.abs(cn[3]) < 6) { cn[4] = t; coinsN++; if (coinsN % 10 === 0) { fanAt = t; legT = t; [[0, 0], [4, 0.12], [7, 0.24], [12, 0.36], [7, 0.5], [12, 0.62]].forEach(([n, at]) => c.sound.note(yelpKey - 5 + n, { dur: 0.18, vel: 0.12, wave: 'square', cutoff: 2000, at })); } } }
          }
          for (let k = coins.length - 1; k >= 0; k--) if (coins[k][4] && t - coins[k][4] > 0.6) coins.splice(k, 1);
        }
        wasDown = inp.down;
      };
      const legendBack = t => {
        if (legend === 'Clockwork') {
          // the gears turn in clockwork steps of 7.5 degrees (each pose laid ready)
          const gt = t + (running(t) ? (t - runAt) * 5 : 0) + wind * 0.6;
          for (const g of gears) { const q = ((Math.floor(gt * g[4] / (Math.PI / 24)) % 48) + 48) % 48, cs = g[5][q]; for (let j = 0; j < cs.length; j += 2) O[cs[j]] = cs[j + 1]; }
          // the hands: the hour hand and the minute hand move on, the red second hand ticks
          const race = running(t) ? -(t - runAt) * 9 : 0, R = LG.dialR, hA = t * 0.03 + lumps[0] + wind / 12 + race / 12, mA = t * 0.35 + lumps[0] * 5 + wind + race, sA = (running(t) ? Math.floor(t * 8) : Math.floor(t)) * Math.PI / 30 - Math.PI / 2;
          for (const [a, l, w] of [[hA, R * 0.5, 1], [mA, R - 7, 0]]) { line(hcX, hcY, hcX + Math.cos(a) * l, hcY + Math.sin(a) * l, LG.HAND); if (w) line(hcX + 0.7, hcY + 0.7, hcX + 0.7 + Math.cos(a) * l, hcY + 0.7 + Math.sin(a) * l, LG.HAND); }
          line(hcX - Math.cos(sA) * 3, hcY - Math.sin(sA) * 3, hcX + Math.cos(sA) * (R - 4), hcY + Math.sin(sA) * (R - 4), LG.SEC);
        } else if (legend === 'Phantom') {
          // fog drifting along behind the ghost
          const sh = Math.floor(t * 3) % 256;
          for (let y = 50; y < N; y++) for (let x = 0; x < N; x++) if (fogB[(y - 50) * 320 + x + sh] && ((x + y) & 1)) O[y * N + x] = LG.FOG[0];
        } else if (legend === 'Scrap King') {
          // gold dust drifting down through the rays
          for (let k = 0; k < 9; k++) { const x = Math.floor(hcX + (k - 4) * 5 + Math.sin(t * 0.8 + k * 2) * 2), y = Math.floor((t * (4 + k % 3) + k * 13) % 56) + 6; put(x, y, LG.DUST); }
        }
      };
      const legendFront = t => {
        if (legend === 'Clockwork') {
          // steam puffs from the vents behind its ears, rising and thinning
          for (let k = 0; k < 2; k++) {
            const [vx, vy] = LG.vents[k], p = running(t) ? ((t * 3 + k * 0.5) % 1) : ((t + k * 1.3) % 2.4) / 2.4, s2 = k ? 1 : -1, cx = vx + s2 * (1 + p * 4) + Math.sin(p * 6) * 1.2, cy = vy - 2 - p * 13, r = 1 + p * 2.6;
            for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (d < r && ((x * 3 + y * 5 + Math.floor(p * 9)) % 7) / 7 > p * 0.9 - 0.1) put(x, y, d < r - 1 ? LG.STEAM[0] : LG.STEAM[1]); }
          }
          // the spring: a little brass gauge in the corner fills as you wind and empties as it runs
          if (wind > 0.05) { const h = Math.round(wind / (Math.PI * 10) * 14); for (let y = 0; y < 16; y++) for (const x of [N - 4, N - 3]) put(x, N - 3 - y, y === 15 || y === 0 ? LG.BR[0] : y <= h ? LG.BR[2] : LG.HOLE); }
        } else if (legend === 'Phantom') {
          // the lantern: away from its pool the night swallows everything but the ghost's own light
          if (c.input.inside) {
            const px = c.input.x * N, py = c.input.y * N;
            for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
              const i = y * N + x, dx = x + 0.5 - px, dy = y + 0.5 - py, d2 = dx * dx + dy * dy;
              if (d2 < 81) continue;
              const dark = d2 > 196 || (d2 > 144 ? ((x + y) & 3) !== 0 : ((x + y) & 1) === 1);
              if (!dark) continue;
              O[i] = GM[i] === 2 && t - caughtAt > 2.4 ? LG.GH[2] : LG.NIGHT;   // its eyes still glow in the dark
            }
            // the lantern's own warm rim
            for (let a = 0; a < 40; a++) { const x = Math.floor(px + Math.cos(a * 0.157) * 12.5), y = Math.floor(py + Math.sin(a * 0.157) * 12.5); if (x >= 0 && y >= 0 && x < N && y < N && (a & 1) && !GM[y * N + x]) O[y * N + x] = LG.LAMP; }
          }
          // caught: a white flash, then wisps flying apart
          const ct = t - caughtAt;
          if (ct < 1.4) for (const [x0, y0, vx, vy] of burstW) { const x = Math.floor(x0 + vx * ct), y = Math.floor(y0 + vy * ct + 6 * ct * ct); put(x, y, LG.WISP[ct < 0.7 ? 1 : 0]); if (ct < 0.5) put(x + 1, y, LG.WISP[0]); }
          // a cold light round the ghost, fog in front of its tail, and wisps circling its head
          const lpx = c.input.inside ? c.input.x * N : -999, lpy = c.input.y * N, lit = (x, y) => !c.input.inside || (x + 0.5 - lpx) ** 2 + (y + 0.5 - lpy) ** 2 < 100;
          for (let y = 1; y < N - 1; y++) for (let x = 1; x < N - 1; x++) { const i = y * N + x; if (!GM[i] && ((x + y) & 1) && (GM[i - 1] || GM[i + 1] || GM[i - N] || GM[i + N]) && lit(x, y)) O[i] = LG.GLOWG; }
          const sf = 255 - Math.floor(t * 4) % 256;
          for (let y = 54; y < N; y++) for (let x = 0; x < N; x++) if (fogF[(y - 54) * 320 + x + sf] && ((x + y) & 1) === 0) O[y * N + x] = LG.FOG[1];
          for (let k = 0; k < 3; k++) { const a = t * (0.8 + k * 0.15) + k * 2.1, x = Math.floor(hcX + Math.cos(a) * (19 + k * 3)), y = Math.floor(hcY - 3 + Math.sin(a) * 10 + Math.sin(t * 2 + k) * 2); put(x, y, LG.WISP[1]); put(x + 1, y, LG.WISP[0]); put(x - 1, y, LG.WISP[0]); put(x, y + 1, LG.WISP[0]); put(x, y - 1, LG.WISP[0]); }
        } else if (legend === 'Scrap King' && heap.length) {
          // the flicked coins, edge-on and face-on by turns as they spin
          for (const cn of coins) { const x = Math.floor(cn[0]), y = Math.floor(cn[1]), spin = Math.floor((cn[0] + cn[1]) * 0.8) % 2; if (cn[4]) { if ((x + y) & 1) put(x, y - 1, LG.SPARK); continue; } put(x, y, GOLD[1]); put(x, y - 1, spin ? GOLD[2] : GOLD[1]); if (!spin) { put(x + 1, y, GOLD[0]); put(x + 1, y - 1, GOLD[1]); } put(x, y + 1, INK); }
          // the tally, top left: a coin and the count
          if (coinsN) { const s = String(coinsN); put(2, 3, GOLD[2]); put(3, 3, GOLD[1]); put(2, 4, GOLD[1]); put(3, 4, GOLD[0]); for (let d = 0; d < s.length; d++) { const g = DIG[+s[d]]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') put(5 + d * 4 + i, 2 + j, LG.SPARK); } }
          // the fanfare: gold showers down the whole picture
          if (t - fanAt < 2.2) for (let k = 0; k < 40; k++) { const x = (k * 37 + Math.floor(fanAt * 7)) % N, y = Math.floor(((t - fanAt) * (30 + k % 7 * 6) + k * 5) % 70) - 6; put(x, y, k % 3 ? GOLD[2] : LG.SPARK); put(x, y - 1, GOLD[1]); }
          // glints wink across the heap of gold
          for (let k = 0; k < 4; k++) { const ph = t * 1.6 + k * 0.25, i = heap[((Math.floor(ph) * 7919 + k * 104729) % heap.length + heap.length) % heap.length], x = i % N, y = (i - x) / N; if (ph % 1 < 0.5) { put(x, y, LG.SPARK); if (ph % 1 > 0.12 && ph % 1 < 0.38) { put(x + 1, y, GOLD[2]); put(x - 1, y, GOLD[2]); put(x, y - 1, GOLD[2]); put(x, y + 1, GOLD[2]); } } }
        }
      };
      // ---------- the two redrawn legendaries: a thermal camera and an illuminated initial, on a 128 grid ----------
      const RD = legend === 'Clockwork' || legend === 'Scrap King', FIG = new Uint8Array(NN);
      const rcv = RD ? document.createElement('canvas') : null; if (rcv) rcv.width = rcv.height = 128;
      const rctx = rcv && rcv.getContext('2d'), rimg = rcv && rctx.createImageData(128, 128), R32 = RD ? new Uint32Array(rimg.data.buffer) : null;
      const rgbw = (r, g, b) => (0xff000000 | b << 16 | g << 8 | r) >>> 0;
      const hexw = h => rgbw(parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16));
      const LUM = RD ? pal.map(h => (parseInt(h.slice(1, 3), 16) * 0.3 + parseInt(h.slice(3, 5), 16) * 0.59 + parseInt(h.slice(5, 7), 16) * 0.11) / 255) : [];
      const FONT = { A: '010101111101101', B: '110101110101110', C: '011100100100011', E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '111101101101101', O: '010101101101010', P: '110101110100100', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010', '.': '000000000000010', '-': '000000111000000', '0': '111101101101111', '1': '010110010010111', '2': '111001111100111', '3': '111001111001111', '4': '101101111001001', '5': '111100111001111', '6': '111100111101111', '7': '111001001010010', '8': '111101111101111', '9': '111101111001111', ' ': '000000000000000' };
      const rtext = (str, x0, y0, col) => { for (let d = 0; d < str.length; d++) { const g = FONT[str[d]] || FONT[' ']; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') { const X = x0 + d * 4 + i, Y = y0 + j; if (X >= 0 && Y >= 0 && X < 128 && Y < 128) R32[Y * 128 + X] = col; } } };
      const rput = (X, Y, col) => { X = Math.round(X); Y = Math.round(Y); if (X >= 0 && Y >= 0 && X < 128 && Y < 128) R32[Y * 128 + X] = col; };

      // the thermal camera: the automaton seen as heat in an iron palette (black, violet, magenta, orange, yellow, white):
      // its body a warm silhouette, its lamp eyes and grin hot;
      // winding heats its mainspring and key white-hot, and when it runs the heat floods out through the body while it
      // jolts and throws sparks; a spot reading, a crosshair and a scale bar, as the camera shows them
      const IRON = [[0, 0, 0], [22, 0, 52], [62, 0, 104], [112, 0, 132], [160, 12, 122], [200, 42, 92], [230, 82, 40], [250, 132, 0], [255, 182, 0], [255, 222, 64], [255, 246, 156], [255, 255, 255]].map(q => rgbw(q[0], q[1], q[2]));
      const HEAT = new Float32Array(NN), HB = new Float32Array(NN), sparks = [], BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const MMs = MM; let hmBot = -1;
      const thermal = (t, ox, oy) => {
        const run = running(t), w = wind / (Math.PI * 10), [cx0, cy0] = chestAt, sxC = cx0 + ox, syC = cy0 + oy, kx = keyAt[0] + ox, ky = keyAt[1] + oy;
        const flood = run ? (t - runAt) * 40 : -1;
        if (hmBot < 0) { for (let i = 0; i < NN; i++) if (HM[i]) hmBot = Math.max(hmBot, i >> 6); hmBot = Math.max(hmBot, 8); }
        for (let i = 0; i < NN; i++) {
          const x = i & 63, y = i >> 6;
          let h = 0.015 + 0.012 * Math.sin(x * 0.4 + t * 0.7) * Math.sin(y * 0.33 - t * 0.5);   // the room: cold, near black
          if (FIG[i]) {
            const sx = x - ox, sy = y - oy, inH = sx >= 0 && sy >= 0 && sx < N && sy < N, head = inH && HM[sy * N + sx], v = O[i];
            // the body a plain shape cooling from the shoulders down; the head warm, its features drawn in heat
            h = head ? (v === INK ? 0.4 : 0.52) : 0.4 - 0.2 * Math.min(1, Math.max(0, (y - oy - hmBot) / (N - hmBot)));
            if (inH && MMs[sy * N + sx]) h = 0.72;   // the grin breathes out warm
            if (FIG[i] === 2 && head && LUM[v] > 0.55) h = 0.94;   // the lamp eyes
            const ds = Math.hypot(x - sxC, y - syC), dk = Math.hypot(x - kx, y - ky);
            if (ds < 6) { const coil = 0.5 + 0.5 * Math.cos(ds * 1.9 - Math.atan2(y - syC, x - sxC)); h = Math.max(h, 0.42 + coil * 0.1 + w * 0.6 * (0.5 + coil * 0.5) * (1 - ds / 9) + (run ? 0.4 : 0)); }   // the mainspring's coil, heating as it's wound
            if (dk < 6 && FIG[i] === 2) h = Math.max(h, 0.35 + w * 0.65);
            if (run && ds < flood && !head) h = Math.min(1, h + 0.26 * Math.min(1, (flood - ds) / 12) * (1 - Math.min(1, (t - runAt) / runFor) * 0.7));
          }
          HEAT[i] = Math.min(1, h);
        }
        // running wild, the head spins round on its neck about once a second: over eight frames the face squeezes to its
        // edge, the plain back of the head comes round, and the face swings back
        if (run) {
          const p = ((t - runAt) % 1) / 0.34;
          if (p < 1) {
            const cs = Math.cos(p * Math.PI * 2), sc = Math.max(0.12, Math.abs(cs)), back = cs < 0, hxs = hcX + ox, y0 = Math.max(0, Math.floor(hcY + oy - 18)), y1 = Math.min(N - 1, Math.ceil(hcY + oy + 16));
            const hm = (q, yy) => { const sx = q - ox, sy = yy - oy; return sx >= 0 && sy >= 0 && sx < N && sy < N && HM[sy * N + sx]; };
            for (let y = y0; y <= y1; y++) {
              const row = HB.subarray(0, N); for (let x = 0; x < N; x++) row[x] = HEAT[y * N + x];
              for (let x = Math.max(0, Math.floor(hxs - 20)); x <= Math.min(N - 1, Math.ceil(hxs + 20)); x++) {
                const src = Math.round(hxs + (x + 0.5 - hxs) / sc - 0.5);
                if (src >= 0 && src < N && hm(src, y)) HEAT[y * N + x] = back ? 0.5 : row[src]; else if (hm(x, y)) HEAT[y * N + x] = 0.015;
              }
            }
          }
        }
        // the camera's softness: one box blur
        for (let i = 0; i < NN; i++) { const x = i & 63, y = i >> 6; let sm = 0, n = 0; for (let v = -1; v <= 1; v++) for (let u = -1; u <= 1; u++) { const xx = x + u, yy = y + v; if (xx >= 0 && yy >= 0 && xx < N && yy < N) { sm += HEAT[yy * N + xx] * (u || v ? 1 : 4); n += u || v ? 1 : 4; } } HB[i] = sm / n; }
        for (let Y = 0; Y < 128; Y++) for (let X = 0; X < 128; X++) { const k = Math.max(0, Math.min(11, Math.floor(HB[(Y >> 1) * N + (X >> 1)] * 11 + BAY[(Y & 3) * 4 + (X & 3)] / 40 + 0.3))); R32[Y * 128 + X] = IRON[k]; }
        // sparks from the spring while it runs
        if (run && sparks.length < 40) for (let k = 0; k < 2; k++) sparks.push([sxC * 2, syC * 2, Math.sin(t * 37 + k * 2) * 40, -30 - Math.abs(Math.cos(t * 23 + k)) * 40, t]);
        for (let q = sparks.length - 1; q >= 0; q--) { const sp = sparks[q], k = t - sp[4]; if (k > 0.8) { sparks.splice(q, 1); continue; } const X = Math.round(sp[0] + sp[2] * k), Y = Math.round(sp[1] + sp[3] * k + 60 * k * k); rput(X, Y, IRON[11]); rput(X + 1, Y, IRON[9]); rput(X, Y + 1, IRON[8]); }
        // the camera's overlay: a crosshair on the spring, the spot temperature, the material, a scale bar
        const tx = Math.round(sxC * 2), ty = Math.round(syC * 2), WHT = IRON[11];
        for (let d = 3; d <= 6; d++) { rput(tx + d, ty, WHT); rput(tx - d, ty, WHT); rput(tx, ty + d, WHT); rput(tx, ty - d, WHT); }
        const temp = (20 + HB[Math.max(0, Math.min(NN - 1, Math.round(syC) * N + Math.round(sxC)))] * 600).toFixed(1);
        for (let Y = 4; Y <= 18; Y++) for (let X = 4; X <= 44; X++) R32[Y * 128 + X] = IRON[0];
        rtext(temp + 'C', 6, 6, WHT); rtext(hide.toUpperCase().slice(0, 5), 6, 12, IRON[8]);
        for (let Y = 20; Y <= 108; Y++) { const k = Math.round((108 - Y) / 88 * 11); for (let X = 120; X <= 123; X++) R32[Y * 128 + X] = IRON[k]; R32[Y * 128 + 119] = IRON[0]; R32[Y * 128 + 124] = IRON[0]; }
        for (const [x0, y0, dx, dy] of [[2, 2, 1, 1], [125, 2, -1, 1], [2, 125, 1, -1], [125, 125, -1, -1]]) for (let k = 0; k < 7; k++) { rput(x0 + dx * k, y0, WHT); rput(x0, y0 + dy * k, WHT); }
      };;

      // the illuminated initial: a vellum page; a great gilded K on lapis with white filigree, and inside it the king drawn
      // afresh in flat colours with a black ink line (his hide, head, ears, horns, eyes, nose and grin, his crown, his
      // robe, the scepter tipped with his loot, his throne, his hoard); a vine down the margin with his pet and little
      // gremlins in it, and lines of script below. Tap and a coin flies onto the hoard, which grows; every tenth crowns him.
      const VEL = hexw('#efe3c4'), VEL2 = hexw('#e4d4ae'), LAPIS = hexw('#1f3d8c'), LAPIS2 = hexw('#2c52a8'), VERM = hexw('#c8321e'), VERMD = hexw('#8a1e12'), GOLDM = hexw('#e0b040'), GOLDH = hexw('#fff0a0'), GOLDS = hexw('#a8761e'), INKM = hexw('#1a1210'), WHITEM = hexw('#fbf6e8'), GREENM = hexw('#3a7a32'), GREENL = hexw('#6aa84a');
      const HIDEM = hexw(HIDES[hide][0]), HIDED = hexw(HIDES[hide][1]);
      const ROBE = hexw({ Nothing: '#7a2a6a', Overalls: '#3a6fb0', 'Aviator Scarf': '#c8321e', Raincoat: '#d8a820', 'Bow Tie': '#7a2a6a', Hoodie: outfitHue, 'Lab Coat': '#e8e2d0', 'Leather Jacket': '#4a3428', 'Hawaiian Shirt': '#d8483a', 'Patched Sweater': '#a8603a', Tuxedo: '#2a2832' }[outfit] || '#7a2a6a');
      const MC = new Uint32Array(128 * 128), mm = new Uint8Array(128 * 128);
      let mReady = false, mCoinsN = 0, crownAt = -9, crowns = 0;
      const mCoins = [];
      // a flat shape with a black outline: fill where test(x, y) holds inside the box, then ink the edge just outside
      const mBlob = (x0, y0, x1, y1, test, col) => {
        x0 = Math.max(0, Math.floor(x0)); y0 = Math.max(0, Math.floor(y0)); x1 = Math.min(127, Math.ceil(x1)); y1 = Math.min(127, Math.ceil(y1));
        for (let Y = y0; Y <= y1; Y++) for (let X = x0; X <= x1; X++) { const n = Y * 128 + X; mm[n] = test(X + 0.5, Y + 0.5) ? 1 : 0; if (mm[n]) MC[n] = col; }
        for (let Y = Math.max(0, y0 - 1); Y <= Math.min(127, y1 + 1); Y++) for (let X = Math.max(0, x0 - 1); X <= Math.min(127, x1 + 1); X++) {
          const n = Y * 128 + X, inb = X >= x0 && X <= x1 && Y >= y0 && Y <= y1; if (inb && mm[n]) continue;
          const nb = (X > x0 && X - 1 <= x1 && Y >= y0 && Y <= y1 && mm[n - 1]) || (X < x1 && X + 1 >= x0 && Y >= y0 && Y <= y1 && mm[n + 1]) || (Y > y0 && Y - 1 <= y1 && X >= x0 && X <= x1 && mm[n - 128]) || (Y < y1 && Y + 1 >= y0 && X >= x0 && X <= x1 && mm[n + 128]);
          if (nb) MC[n] = INKM;
        }
        for (let Y = y0; Y <= y1; Y++) for (let X = x0; X <= x1; X++) mm[Y * 128 + X] = 0;
      };
      const mTri = (ax, ay, bx, by, cx, cy) => (X, Y) => { const d1 = (X - bx) * (ay - by) - (ax - bx) * (Y - by), d2 = (X - cx) * (by - cy) - (bx - cx) * (Y - cy), d3 = (X - ax) * (cy - ay) - (cx - ax) * (Y - ay); return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0)); };
      const mEll = (cx, cy, rx, ry) => (X, Y) => ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2 <= 1;
      const mRect = (x0, y0, x1, y1) => (X, Y) => X >= x0 && X <= x1 && Y >= y0 && Y <= y1;
      const mtext = (str, x0, y0, col) => { for (let d = 0; d < str.length; d++) { const g = FONT[str[d]] || FONT[' ']; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') MC[(y0 + j) * 128 + x0 + d * 4 + i] = col; } };
      const pileTop = () => 80 - 3 * Math.min(7, Math.floor(mCoinsN / 2));   // a row of coins more for every two
      const paintPage = () => {
        // vellum, with a faint grain
        for (let n = 0; n < 128 * 128; n++) { const X = n & 127, Y = n >> 7; MC[n] = (X * 13 + Y * 7) % 23 === 0 ? VEL2 : VEL; }
        // the initial's square: a gold frame, lapis inside with white filigree crosses
        mBlob(8, 8, 90, 90, mRect(8, 8, 90, 90), GOLDM);
        for (let Y = 9; Y <= 89; Y++) for (let X = 9; X <= 89; X++) if (X === 9 || Y === 9) MC[Y * 128 + X] = GOLDH; else if (X === 89 || Y === 89) MC[Y * 128 + X] = GOLDS;
        for (let Y = 12; Y <= 86; Y++) for (let X = 12; X <= 86; X++) { const n = Y * 128 + X; MC[n] = ((X >> 3) + (Y >> 3)) & 1 ? LAPIS : LAPIS2; const u = (X - 12) % 8, v = (Y - 12) % 8; if ((u === 4 && v >= 3 && v <= 5) || (v === 4 && u >= 3 && u <= 5)) MC[n] = WHITEM; }
        for (let k = 11; k <= 87; k++) { MC[11 * 128 + k] = INKM; MC[87 * 128 + k] = INKM; MC[k * 128 + 11] = INKM; MC[k * 128 + 87] = INKM; }
        // the letter K in vermilion, gold-edged: a stem and two arms
        const K = (X, Y) => (X >= 15 && X <= 25 && Y >= 15 && Y <= 83) || mTri(23, 52, 23, 40, 52, 15)(X, Y) || mTri(52, 15, 64, 15, 25, 50)(X, Y) || mTri(25, 46, 33, 46, 66, 83)(X, Y) || mTri(66, 83, 54, 83, 25, 52)(X, Y);
        mBlob(14, 14, 67, 84, K, VERM);
        for (let Y = 15; Y <= 83; Y++) MC[Y * 128 + 16] = GOLDH;
        // the throne: a gilt back with a round top, behind him
        mBlob(34, 20, 80, 76, (X, Y) => X >= 36 && X <= 78 && Y >= 34 && Y <= 76 || ((X - 57) ** 2 + (Y - 34) ** 2 <= 21 * 21 && Y < 34), GOLDS);
        mBlob(40, 27, 74, 70, (X, Y) => X >= 41 && X <= 73 && Y >= 36 && Y <= 70 || ((X - 57) ** 2 + (Y - 36) ** 2 <= 15 * 15 && Y < 36), VERMD);
        const pt = 86;
        // his robe and cape, by build
        const bw = { Scrawny: 11, Hunched: 13, Stocky: 15, Potbelly: 14 }[build] || 12;
        mBlob(57 - bw - 8, 52, 57 + bw + 8, pt + 1, mTri(57, 50, 57 - bw - 8, pt + 1, 57 + bw + 8, pt + 1), VERM);
        mBlob(57 - bw, 52, 57 + bw, pt + 1, (X, Y) => Math.abs(X - 57) <= bw * (0.6 + 0.4 * (Y - 52) / (pt - 52)) && Y >= 52 && Y <= pt, ROBE);
        mBlob(57 - bw - 2, 50, 57 + bw + 2, 56, mEll(57, 53, bw + 2, 3.5), WHITEM);   // the ermine collar
        for (let k = -bw; k <= bw; k += 4) MC[53 * 128 + 57 + k] = INKM;
        // the scepter with his loot at its tip, held up on his right
        const lootK = ['Wrench', 'Fork', 'Screwdriver', 'Plunger'].includes(loot) ? 0 : ['Light Bulb', 'Battery', 'Spark Plug', 'Tiny Rocket'].includes(loot) ? 1 : ['Gear', 'Golden Gear', 'Magnet', 'Duct Tape'].includes(loot) ? 2 : 3;
        const scX = pose === 'Hugged' ? 66 : 74, scTop = pose === 'Held Up' ? 22 : 30;
        mBlob(scX - 1, scTop, scX + 1, 76, mRect(scX - 1, scTop, scX + 1, 76), GOLDM);
        if (lootK === 0) mBlob(scX - 5, scTop - 9, scX + 5, scTop + 1, (X, Y) => (Math.abs(X - scX) <= 5 && Y >= scTop - 3) || (Math.abs(X - scX) >= 2 && Math.abs(X - scX) <= 5 && Y >= scTop - 9), hexw('#c8d0d8'));
        else if (lootK === 1) mBlob(scX - 5, scTop - 10, scX + 5, scTop + 1, mEll(scX, scTop - 4, 5, 6), hexw('#fff0a0'));
        else if (lootK === 2) mBlob(scX - 6, scTop - 12, scX + 6, scTop, (X, Y) => { const d = Math.hypot(X - scX, Y - scTop + 6), a = Math.atan2(Y - scTop + 6, X - scX); return d <= (Math.cos(a * 8) > 0 ? 6 : 4.5) && d > 1.5; }, hexw(loot === 'Golden Gear' ? '#f2c84a' : '#b8c0c8'));
        else mBlob(scX - 5, scTop - 10, scX + 5, scTop + 1, (X, Y) => Math.abs(X - scX) + Math.abs(Y - scTop + 4) <= 5, hexw(loot === 'Rubber Chicken' ? '#f6e05a' : loot === 'Lit Fuse' ? '#34343e' : '#c8321e'));
        mBlob(scX - 3, 56, scX + 3, 62, mEll(scX, 59, 3, 3), HIDEM);   // his hand on it
        // the hoard heaped at his feet, in front of his robe, growing with the coins he's given: round coins, each
        // outlined, lit on top
        const pk = pileTop();
        mBlob(14, pk - 2, 86, 86, (X, Y) => Y >= pk + Math.abs(X - 57) * 0.42 && Y <= 86, GOLDM);
        for (let Y = pk; Y <= 86; Y++) for (let X = 13; X <= 86; X++) { const n = Y * 128 + X; if (MC[n] !== GOLDM) continue; const u = (X + (Y % 6 < 3 ? 0 : 3)) % 6, v = Y % 3; if (u === 0 || (v === 2 && u < 5)) MC[n] = GOLDS; else if (v === 0 && u > 1 && u < 4) MC[n] = GOLDH; }
        // his head, by its shape, and his ears
        const hw = shape === 'Long' ? 10 : shape === 'Block' ? 13 : 12, hh = shape === 'Long' ? 14 : 11, hy0 = 38;
        const earT = ears === 'Floppy' || ears === 'Long Droop' ? 1 : ears === 'Feelers' || ears === 'Satellite' ? 2 : ears === 'Tiny' ? 3 : 0;
        for (const sd of [-1, 1]) {
          if (earT === 0) mBlob(57 + sd * 6 - 18, 24, 57 + sd * 6 + 18, 44, mTri(57 + sd * 8, 34, 57 + sd * 26, 26, 57 + sd * 9, 43), HIDEM);
          else if (earT === 1) mBlob(57 - 30, 30, 57 + 30, 58, mTri(57 + sd * 9, 32, 57 + sd * 22, 52, 57 + sd * 12, 44), HIDEM);
          else if (earT === 2) { mBlob(57 + sd * 7 - 1, 14, 57 + sd * 7 + 1, 30, mRect(57 + sd * 7 - 1, 14, 57 + sd * 7 + 1, 30), HIDED); mBlob(57 + sd * 7 - 3, 10, 57 + sd * 7 + 3, 16, mEll(57 + sd * 7, 13, 3, 3), HIDED); }
          else mBlob(57 + sd * 12 - 4, 32, 57 + sd * 12 + 4, 40, mEll(57 + sd * 13, 36, 3, 3), HIDEM);
        }
        const headT = shape === 'Wedge' ? (X, Y) => mEll(57, hy0, hw, hh)(X, Y) && Math.abs(X - 57) <= hw * (1.2 - (Y - hy0 + hh) / (2 * hh) * 0.6) : shape === 'Block' ? (X, Y) => Math.abs(X - 57) <= hw && Math.abs(Y - hy0) <= hh && !(Math.abs(X - 57) > hw - 2 && Math.abs(Y - hy0) > hh - 2) : shape === 'Pear' ? (X, Y) => ((X - 57) / (hw * (0.8 + 0.3 * (Y - hy0 + hh) / (2 * hh)))) ** 2 + ((Y - hy0) / hh) ** 2 <= 1 : mEll(57, hy0, hw, hh);
        mBlob(57 - hw - 2, hy0 - hh - 2, 57 + hw + 2, hy0 + hh + 2, headT, HIDEM);
        if (marks !== 'None') for (const [u, v] of [[-6, -4], [5, -6], [7, 2], [-8, 3]]) MC[(hy0 + v) * 128 + 57 + u] = marks === 'Freckles' || marks === 'Spots' || marks === 'Warts' ? HIDED : INKM;
        if (horns !== 'None') for (const sd of horns === 'Single Horn' || horns === 'Light Bulb' || horns === 'Antenna Bolt' ? [0] : [-1, 1]) mBlob(57 + sd * 7 - 3, hy0 - hh - 8, 57 + sd * 7 + 3, hy0 - hh + 2, mTri(57 + sd * 7 - 3, hy0 - hh + 2, 57 + sd * 7 + 3, hy0 - hh + 2, 57 + sd * 8, hy0 - hh - 8), hexw('#efe4c8'));
        // his eyes, by kind
        const eyeK = /Goggles|Monocle|Lamp/.test(eyes) ? 2 : /Squint|Sleepy|Slits/.test(eyes) ? 1 : eyes === 'Cyclops' ? 3 : /Glow/.test(eyes) ? 4 : 0;
        const eyePos = eyeK === 3 ? [[57, hy0 - 3]] : eyes === 'Three Eyes' ? [[52, hy0 - 2], [62, hy0 - 2], [57, hy0 - 8]] : [[52, hy0 - 2], [62, hy0 - 2]];
        for (const [ex, ey] of eyePos) {
          if (eyeK === 1) mBlob(ex - 3, ey, ex + 3, ey + 1, mRect(ex - 3, ey, ex + 3, ey + 1), INKM);
          else { const r = eyeK === 3 ? 4.5 : 3.2; mBlob(ex - r - 1, ey - r - 1, ex + r + 1, ey + r + 1, mEll(ex, ey, r, r), eyeK === 2 ? hexw('#ffb43a') : eyeK === 4 ? hexw(eyes === 'Red Glow' ? '#ff5a3a' : '#a8ff5a') : WHITEM); MC[ey * 128 + ex] = INKM; MC[ey * 128 + ex + 1] = INKM; MC[(ey + 1) * 128 + ex] = INKM; MC[(ey + 1) * 128 + ex + 1] = INKM; }
        }
        // his nose and his grin
        if (nose === 'Hook' || nose === 'Long Pointy') mBlob(55, hy0, 64, hy0 + 6, mTri(56, hy0, 64, hy0 + 5, 56, hy0 + 6), HIDED);
        else mBlob(54, hy0 + 1, 60, hy0 + 6, mEll(57, hy0 + 3.5, nose === 'Button' ? 2 : 3, 2.5), nose === 'Bulb' ? hexw('#d86a6a') : nose === 'Pig' ? hexw('#e89aa8') : HIDED);
        mBlob(49, hy0 + 6, 65, hy0 + 10, mEll(57, hy0 + 8, 7.5, 2.4), hexw('#5a1a22'));
        const tooth = grin === 'Gold Grill' ? GOLDM : WHITEM;
        if (grin === 'Gap' || grin === 'Buck Teeth') { MC[(hy0 + 7) * 128 + 55] = tooth; MC[(hy0 + 7) * 128 + 56] = tooth; MC[(hy0 + 7) * 128 + 59] = tooth; MC[(hy0 + 7) * 128 + 60] = tooth; }
        else for (let X = 51; X <= 63; X += 2) MC[(hy0 + 7) * 128 + X] = tooth;
        // hair tufts beside the crown (unless bald)
        if (hair !== 'Bald') for (const sd of [-1, 1]) mBlob(57 + sd * 9 - 3, hy0 - hh - 4, 57 + sd * 9 + 3, hy0 - hh + 3, mTri(57 + sd * 6, hy0 - hh + 3, 57 + sd * 12, hy0 - hh + 3, 57 + sd * 11, hy0 - hh - 4), hexw(hair === 'Wild' || hair === 'Mohawk' ? '#2a2420' : HIDES[hide][1]));
        // the crown: a gold band and points, a jewel for each crowning
        const cy0 = hy0 - hh - 1;
        mBlob(45, cy0 - 9, 69, cy0 + 1, (X, Y) => (Y >= cy0 - 3 && Y <= cy0 && X >= 46 && X <= 68) || [47, 52, 57, 62, 67].some(px => mTri(px - 3, cy0 - 3, px + 3, cy0 - 3, px, cy0 - 9)(X, Y)), GOLDM);
        for (let k = 0; k < Math.min(5, 1 + crowns); k++) MC[(cy0 - 2) * 128 + 49 + k * 4] = [VERM, hexw('#3a7a3c'), LAPIS2, WHITEM, VERM][k];
        // the margin: a vine with gold leaves, his pet and two little gremlins climbing it
        for (let Y = 8; Y <= 120; Y++) { const X = Math.round(108 + Math.sin(Y * 0.12) * 6); MC[Y * 128 + X] = GREENM; MC[Y * 128 + X + 1] = GREENM; if (Y % 12 === 0) mBlob(X - 5, Y - 3, X - 1, Y + 1, mEll(X - 3, Y - 1, 2.5, 2), Y % 24 ? GREENL : GOLDM); }
        const pal2 = [[106, 30], [104, 70], [110, 50]];
        // (every crowning gilds one of them)
        pal2.forEach(([gx, gy], q) => { const gc = q < crowns ? GOLDM : HIDEM; mBlob(gx - 5, gy - 4, gx + 5, gy + 5, mEll(gx, gy + 1, 4, 4), gc); mBlob(gx - 8, gy - 6, gx - 2, gy, mTri(gx - 3, gy - 2, gx - 8, gy - 6, gx - 3, gy + 1), gc); mBlob(gx + 2, gy - 6, gx + 8, gy, mTri(gx + 3, gy - 2, gx + 8, gy - 6, gx + 3, gy + 1), gc); if (q < crowns) { MC[(gy - 1) * 128 + gx - 2] = GOLDH; MC[(gy + 2) * 128 + gx + 2] = GOLDH; } MC[gy * 128 + gx - 1] = INKM; MC[gy * 128 + gx + 2] = INKM; });
        const PETC = { Rat: '#b0acb6', Snail: '#d9733a', 'Bolt Bug': '#b8c0c8', 'Pet Rock': '#9a958a', 'Mini Gremlin': HIDES[hide][0], Moth: '#e8dcc0', 'Dangling Spider': '#2a2420', None: '#d8a820' }[pet];
        mBlob(104, 98, 120, 110, pet === 'Moth' ? (X, Y) => mTri(112, 104, 104, 98, 106, 110)(X, Y) || mTri(112, 104, 120, 98, 118, 110)(X, Y) : pet === 'Snail' ? mEll(112, 103, 5, 5) : mEll(112, 104, 6, 4), hexw(PETC));
        if (pet === 'Dangling Spider') for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { MC[(101 + k * 2) * 128 + 112 + sd * 7] = INKM; MC[(101 + k * 2) * 128 + 112 + sd * 8] = INKM; }
        if (pet === 'Rat') for (let k = 0; k < 6; k++) MC[(106 + (k >> 1)) * 128 + 105 - k] = INKM;
        // lines of script below the initial, with a red rubric
        for (let L2 = 0; L2 < 4; L2++) { const y = 96 + L2 * 7; for (let X = 10; X <= 88; X++) if (Math.sin(X * 0.9 + L2 * 2) > -0.2 && (X + L2 * 5) % 13 !== 0) { MC[y * 128 + X] = L2 === 0 ? VERM : INKM; if ((X * 7 + L2) % 3 === 0) MC[(y - 1) * 128 + X] = L2 === 0 ? VERM : INKM; } }
        mReady = true;
      };
      const manuscript = t => {
        if (!mReady) paintPage();
        R32.set(MC);
        // the coins in flight, landing on the hoard
        for (let q = mCoins.length - 1; q >= 0; q--) {
          const cn = mCoins[q], k = (t - cn[2]) / 0.7;
          if (k >= 1) { mCoins.splice(q, 1); mCoinsN++; mReady = false; if (mCoinsN % 10 === 0) { crowns++; crownAt = t; c.sound.hit('snare', 0.2); [0, 4, 7, 12, 16].forEach((dd, i) => c.sound.note(yelpKey - 5 + dd, { dur: 0.25, vel: 0.12, wave: 'square', cutoff: 2000, at: i * 0.08 })); } else c.sound.note(yelpKey + 12 + (mCoinsN % 5) * 2, { dur: 0.06, vel: 0.08, wave: 'square', cutoff: 3000 }); continue; }
          // a gold disc spinning as it flies, along an arc with a trail of glints behind it
          const path = kk => [cn[0] + (57 + cn[3] - cn[0]) * kk, cn[1] + (pileTop() - 4 - cn[1]) * kk - Math.sin(kk * Math.PI) * 40];
          for (let q2 = 1; q2 <= 6; q2++) { const kk = k - q2 * 0.05; if (kk < 0) break; const [tx, ty] = path(kk); rput(tx, ty, q2 < 3 ? GOLDH : GOLDM); if (q2 < 4) rput(tx + 1, ty, GOLDM); }
          const [X, Y] = path(k), wdt = Math.abs(Math.cos(k * 16)) * 4.2 + 1;
          for (let v = -6; v <= 6; v++) for (let u = -6; u <= 6; u++) { const e2 = (u / wdt) ** 2 + (v / 5.5) ** 2; if (e2 <= 1.25) rput(X + u, Y + v, e2 > 0.72 ? INKM : e2 < 0.22 ? GOLDH : GOLDM); }
        }
        // a crowning: gold rays burst from the crown
        if (t - crownAt < 1.6) { const k = (t - crownAt) / 1.6; for (let a = 0; a < 16; a++) { const an = a / 16 * 6.283; for (let r = 6 + k * 30; r < 12 + k * 40; r += 1) rput(57 + Math.cos(an) * r, 22 + Math.sin(an) * r * 0.8, a & 1 ? GOLDH : GOLDM); } }
        // the little gremlins in the margin blink; the gold catches the light
        if (Math.floor(t * 0.7) % 4 === 0) { const gc = crowns > 0 ? GOLDM : HIDEM; rput(105, 30, gc); rput(108, 30, gc); }
        const gl = Math.floor((t * 40) % 220) - 40; for (let Y = 8; Y <= 90; Y++) { const X = gl - Y + 50; if (X >= 8 && X <= 90 && (Y < 12 || Y > 86 || X < 12 || X > 86)) rput(X, Y, GOLDH); }
      };;
      const show = (t, dt) => {
        dt = Math.min(dt || 0, 0.06);
        const inp = c.input;
        if (legend) toyStep(t, dt, inp);
        // the clockwork one takes a tap as a short, still release, so winding it never startles it
        const taps = inp.taps(); if (legend === 'Clockwork') { taps.length = 0; if (clockTap) taps.push(clockTap); clockTap = null; }
        for (const spook of taps) {
          if (legend === 'Scrap King') { if (mCoins.length < 12) mCoins.push([spook.x * 128, spook.y * 128, t, (mCoins.length % 5 - 2) * 5]); c.sound.hit('blip', 0.22, { freq: 2600 }); continue; }
          jumpV = 1.6; burst = 1; petRun = 1;
          const pan = (spook.x - 0.5) * 0.5;
          c.sound.hit('snare', 0.18); c.sound.hit('blip', 0.3, { freq: 1700, at: 0.02 });
          yelpRun.forEach((n, i) => c.sound.note(yelpKey + n, { dur: 0.07, vel: 0.17, wave: 'square', cutoff: 2600, at: 0.04 + i * 0.05, pan }));
          if (legend) legT = t;
          if (legend === 'Clockwork') { for (let i = 0; i < 7; i++) c.sound.hit('click', 0.14, { at: 0.25 + i * (0.11 - i * 0.011) }); c.sound.note(yelpKey + 12, { dur: 0.08, vel: 0.08, wave: 'square', cutoff: 2000, at: 0.85 }); c.sound.note(yelpKey + 19, { dur: 0.12, vel: 0.08, wave: 'square', cutoff: 2000, at: 0.93 }); }
          else if (legend === 'Phantom') [12, 10, 7, 3, 0].forEach((n, i) => c.sound.note(yelpKey - 12 + n, { dur: 0.5, vel: 0.06, wave: 'sine', at: 0.2 + i * 0.16, pan: -pan }));
          else if (legend === 'Scrap King') [[0, 0], [0, 0.12], [7, 0.24], [12, 0.42]].forEach(([n, at]) => c.sound.note(yelpKey - 5 + n, { dur: n === 12 ? 0.4 : 0.1, vel: 0.1, wave: 'square', cutoff: 1800, at: 0.2 + at, pan }));
          if (jar && Math.hypot(spook.x * N - jarX, spook.y * N - jarY) < 12) { jarT = t; [0, 4, 7, 9, 12, 16].forEach((n, i) => c.sound.note(yelpKey + 7 + n, { dur: 0.7, vel: 0.06, wave: 'sine', at: 0.15 + i * 0.07 + (i % 2) * 0.02, pan })); }
        }
        const near = inp.inside ? Math.max(0, 1 - Math.hypot(inp.x - headS[0], inp.y - headS[1]) / 0.45) : 0;
        nerves += (near - nerves) * Math.min(1, dt * 3);
        if (nerves < 1e-4 && !near) nerves = 0;
        jitter += dt * nerves * 6;
        if (jump || jumpV) { jump += jumpV * dt; jumpV -= 9 * dt; if (jump <= 0) { jump = 0; jumpV = 0; } }
        burst = Math.max(0, burst - dt * 2.2);
        petRun = Math.max(0, petRun - dt * 0.8);
        const f = Math.floor((t + jitter) * 6) % 4;
        const ox = (nerves > 0.15 ? Math.round(Math.sin(t * 31 + jitter * 3) * Math.min(1, nerves * 1.6)) : 0) + (legend === 'Phantom' ? Math.round(ghostX) + (litFor > 0.35 ? (Math.floor(t * 20) % 2 ? 1 : -1) : 0) : 0) + (legend === 'Clockwork' && running(t) ? [0, 2, 0, -2][Math.floor(t * 10) % 4] : 0);
        // the clockwork one jolts with every tick of the clock; the phantom floats
        const oy = -Math.round(jump * 0.09 * N) + (legend === 'Clockwork' ? ((t % 1) < 0.09 ? 1 : 0) - (running(t) ? [0, 2, 3, 2][Math.floor(t * 10) % 4] : 0) : 0) + (legend === 'Phantom' ? Math.round(Math.sin(t * 1.4) * 1.6) - 1 : 0);
        const hoverX = inp.inside ? inp.x * N : -99, hoverY = inp.inside ? inp.y * N : -99;

        // the live layer: eyes, the clockwork key, the crown's glint, the jar's lid and fireflies
        E.fill(255); D = E;
        const ph = (t + blinkOff) % blinkGap, shut = burst > 0.2 ? 0 : ph < 0.2 ? Math.sin(ph / 0.2 * Math.PI) : 0;
        const look = inp.inside ? Math.max(-1, Math.min(1, (inp.x - headS[0]) * 4)) * 0.8 : Math.sin(Math.floor((t + blinkOff) / blinkGap) * 1.9 + 0.5) * 0.7;
        drawEyes(shut, look, f, burst);
        if (legend === 'Clockwork') {
          // the key winds itself slowly while idle (faster when nervous); a tap lets it run down fast, then it winds again
          const dk = Math.max(0, Math.min(0.1, t - keyLast)); keyLast = t;
          if (legT === t) keyV = -18;
          if (running(t)) keyV = -22;
          keyV += (1.4 + nerves * 4 - keyV) * Math.min(1, dk * 1.3); keyPh += keyV * dk;
          // a porthole in its chest: the mainspring's gear turning behind the glass
          { const [cx, cy] = chestAt, gp = keyPh * 0.5; for (let y = cy - 5; y <= cy + 5; y++) for (let x = cx - 5; x <= cx + 5; x++) { const dx = x + 0.5 - cx, dy = y + 0.5 - cy, r = Math.hypot(dx, dy); if (r > 5) continue; if (r > 4) setD(x, y, dx + dy < 0 ? BRASS[2] : BRASS[0]); else if (r > 3.2) setD(x, y, BRASS[1]); else { const a = Math.atan2(dy, dx), tooth = Math.cos(8 * (a - gp)) > 0.2; setD(x, y, r < 0.9 ? BRASS[2] : r < (tooth ? 3 : 2.2) ? (dx + dy < -1 ? BRASS[2] : BRASS[1]) : GEARHOLE); } } setD(cx - 2, cy - 3, WHITEP); }
          drawKey(keyAt[0], keyAt[1], keyPh);
          // the cheek gear turns with it
          if (gearAt) {
            const [gx, gy] = gearAt, gp = keyPh * 0.7;
            for (let y = gy - 4; y <= gy + 3; y++) for (let x = gx - 4; x <= gx + 3; x++) {
              const dx = x + 0.5 - gx, dy = y + 0.5 - gy, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx), tooth = Math.cos(6 * (a - gp)) > 0.15;
              if (r < 1.1) setD(x, y, GEARHOLE);
              else if (r < (tooth ? 3.6 : 2.6)) setD(x, y, r > (tooth ? 2.8 : 2.0) && dx + dy > 0 ? BRASS[0] : dx + dy < -1.5 ? BRASS[2] : BRASS[1]);
            }
          }
        }
        let kingLit = 0;
        if (legend === 'Scrap King' && kingBulb) {
          // the bulb in his crown: it flickers on its own, burns steady under the pointer, and flares on a tap
          const flare = t - legT < 1.2 ? 1 - (t - legT) / 1.2 : 0;
          kingLit = flare > 0 ? 1 + flare : inp.inside ? 1 : (Math.sin(t * 2.3) + Math.sin(t * 5.1 + 1)) > -0.6 ? 0.7 : 0;
          if (kingLit) { const [bx, by] = kingBulb; for (let y = by - 2; y <= by + 2; y++) for (let x = bx - 2; x <= bx + 2; x++) if (Math.abs(x - bx) + Math.abs(y - by) <= 2 && L[y * N + x] !== INK) setD(x, y, (x === bx && y === by) || kingLit > 1.3 ? LAMPHI : GLOWC); }
        }
        let jarGlow = 0;
        if (jar) {
          const since = t - jarT, pop = since < 1.6 ? Math.round(Math.sin(Math.min(1, since / 0.3) * Math.PI / 2) * 3 * Math.max(0, 1 - Math.max(0, since - 1.1) / 0.5)) : 0, dl = pop / N / 1.45;
          // a cloth lid tied on with string; a tap lifts it and lets the fireflies out
          XF = LT;
          fill([[handX - 0.05, handY - 0.148 - dl], [handX - 0.038, handY - 0.19 - dl], [handX + 0.038, handY - 0.19 - dl], [handX + 0.05, handY - 0.148 - dl], [handX + 0.02, handY - 0.156 - dl], [handX - 0.02, handY - 0.153 - dl]]); paint(CLOTH);
          { const [ax, ay] = cellOf([handX - 0.06, handY - 0.2 - dl]), [bx2, by2] = cellOf([handX + 0.06, handY - 0.14 - dl]);
            for (let y = Math.max(0, Math.min(ay, by2)); y <= Math.min(N - 1, Math.max(ay, by2)); y++) for (let x = Math.max(0, Math.min(ax, bx2)); x <= Math.min(N - 1, Math.max(ax, bx2)); x++) { const v = E[y * N + x]; if ((v === CLOTH[0] || v === CLOTH[1] || v === CLOTH[2]) && ((x >> 1) + (y >> 1)) % 2 === 0) E[y * N + x] = v === CLOTH[0] ? RED[0] : RED[1]; } }
          ink([[handX - 0.044, handY - 0.168 - dl], [handX + 0.044, handY - 0.168 - dl]], STRING);
          XF = null;
          const lean = inp.inside ? Math.max(-2, Math.min(2, (hoverX - jarX) / 6)) : 0;
          jarGlow = 0.85 + 0.15 * Math.sin(t * 3.1) * Math.sin(t * 1.7) + (since < 1.6 ? 0.6 * (1 - since / 1.6) : 0) + (inp.inside ? 0.15 : 0);
          for (let k = 0; k < 6; k++) {
            const out = since < 1.6 ? Math.sin(Math.min(1, since / 1.6) * Math.PI) * (6 + k * 2) : 0;
            const a = t * (0.9 + k * 0.17) + flyPh[k];
            // the sixth is always out, drifting round the jar
            const fx = k === 5 ? Math.round(jarX + Math.cos(a * 0.7) * 8 + Math.sin(a * 1.9) * 1.5) : Math.round(jarX + Math.sin(a) * 2 + lean + Math.cos(a * 1.3) * out);
            const fy = k === 5 ? Math.round(jarY - 6 + Math.sin(a * 0.9) * 6) : Math.round(jarY - 1 + Math.cos(a * 0.8) * 4 - out * 0.8);
            const lit = k === 5 || inp.inside || since < 1.6 || ((t * 1.3 + flyPh[k]) % 2.4) < 1.8;
            if (lit) for (const [u, v] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = fx + u, yy = fy + v; if (xx >= 0 && yy >= 0 && xx < N && yy < N && (E[yy * N + xx] === 255 || k === 5)) setD(xx, yy, FLYHALO); }
            setD(fx, fy, lit ? FLY : FLYDIM);
          }
        }

        // compose: the backdrop (lit by any lamp), then the gremlin
        O.set(B);
        if (glow) {
          const fl = 5.5 + Math.round(Math.sin(t * 13) * Math.sin(t * 7.3) * 1.2) + burst * 3;
          for (let y = Math.max(0, lampY - 9); y <= Math.min(N - 1, lampY + 9); y++) for (let x = Math.max(0, lampX - 9); x <= Math.min(N - 1, lampX + 9); x++) {
            const d = Math.hypot(x - lampX, y - lampY);
            if (d < fl && (d < fl * 0.55 || ((x + y) & 1) === 0)) O[y * N + x] = GLOWC;
          }
        }
        if (legend && legend !== 'Clockwork') legendBack(t);
        const gone = legend === 'Phantom' && t - legT < 0.7;
        if (legend === 'Phantom') GM.fill(0);
        if (RD) FIG.fill(0);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const sxx = x - ox - (legend === 'Phantom' && y > 40 ? Math.round(Math.sin(t * 2.3 + y * 0.33) * (y - 40) / 9) : 0), syy = y - oy; if (sxx < 0 || syy < 0 || sxx >= N || syy >= N) continue;
          const s = syy * N + sxx;
          if (E[s] !== 255) {
            if (legend === 'Phantom') { const ct = t - caughtAt; if (ct < 1.6 || (ct < 2.4 && ((x * 3 + y) % 5) / 5 >= (ct - 1.6) / 0.8)) continue; O[y * N + x] = litFor > 0.35 ? LG.GH[4] : ghostOf(E[s]); GM[y * N + x] = 2; continue; }
            O[y * N + x] = E[s]; if (RD) FIG[y * N + x] = 2; continue;
          }
          const v = L[s]; if (v === 255) continue;
          if (legend === 'Phantom') {
            // it thins out toward its tail, under the pointer, and all at once when touched
            if (gone && ((x * 3 + y) % 5) !== 0) continue;
            if (syy > tailY) { const u = (syy - tailY) / (N - tailY), w = tailW * Math.pow(1 - u, 0.9) + 0.6, cxT = hcX + Math.sin(t * 2 + syy * 0.22) * u * 7 + u * u * 6 * Math.sin(t * 0.7); if (Math.abs(sxx + 0.5 - cxT) > w) continue; if (u > 0.7 && ((x + y) & 1)) continue; }
            const ct = t - caughtAt; if (ct < 1.6 || (ct < 2.4 && ((x * 3 + y) % 5) / 5 >= (ct - 1.6) / 0.8)) continue;
            GM[y * N + x] = 1;
            if (litFor > 0.35) { O[y * N + x] = v === LG.GH[0] || v === LG.GH[1] ? LG.GH[2] : LG.GH[4]; continue; }   // frozen: it blanches
          }
          if (RD) FIG[y * N + x] = 1;
          O[y * N + x] = v;
        }
        if (legend) legendFront(t);
        // the jar throws a warm dithered light on the hands, face and wall around it
        if (jarGlow) {
          const R = 10 + jarGlow * 6, jx = jarX + ox + 0.5, jy = jarY + oy + 0.5;
          for (let y = Math.max(0, Math.floor(jy - R)); y <= Math.min(N - 1, jy + R); y++) for (let x = Math.max(0, Math.floor(jx - R)); x <= Math.min(N - 1, jx + R); x++) {
            const d = Math.hypot(x + 0.5 - jx, y + 0.5 - jy), i = y * N + x, v = O[i];
            if (d < R && (d < R * 0.55 || ((x + y) & 1) === 0) && JARLIT[v] && E[(y - oy) * N + x - ox] === 255) O[i] = JARLIT[v];
          }
        }
        // the Scrap King's bulb lights the wall behind his crown
        if (kingLit && kingBulb) {
          const [bx, by] = kingBulb, fl = 3 + kingLit * 3;
          for (let y = Math.max(0, by - 9); y <= Math.min(N - 1, by + 9); y++) for (let x = Math.max(0, bx - 9); x <= Math.min(N - 1, bx + 9); x++) {
            const d = Math.hypot(x - bx, y - by), s = (y - oy) * N + x - ox;
            if (d < fl && (d < fl * 0.5 || ((x + y) & 1) === 0) && (s < 0 || s >= NN || L[s] === 255)) O[y * N + x] = GLOWC;
          }
        }
        // sparks and live pets
        D = O;
        if (burst > 0) {
          const [sx, sy] = burstAt || cellOf([handX, handY - 0.12]), grow = 1 - burst;
          for (let k = 0; k < 8; k++) {
            const a = k / 8 * Math.PI * 2 + f * 0.4, r0 = 2 + grow * 3.5, r1 = r0 + 2 + (k % 2);
            bres([Math.round(sx + Math.cos(a) * r0), Math.round(sy + oy + Math.sin(a) * r0)], [Math.round(sx + Math.cos(a) * r1), Math.round(sy + oy + Math.sin(a) * r1)], k % 2 ? SPARK1 : SPARK2);
          }
          if (legend === 'Scrap King') for (let k = 0; k < 5; k++) { const a = k * 1.256 + t * 3, r = 4 + grow * 10; setD(Math.round(sx + Math.cos(a) * r), Math.round(sy + oy + Math.sin(a) * r), GOLD[2]); }
        }
        if (loot === 'Chewed Wire' || loot === 'Lit Fuse' || loot === 'Tiny Rocket') {
          XF = LT; const [sx, sy] = cellOf(loot === 'Lit Fuse' ? [handX + 0.05, handY - 0.22] : loot === 'Tiny Rocket' ? [handX, handY + 0.01] : [handX, handY - 0.1]); XF = null;
          const col = loot === 'Chewed Wire' ? SPARK2 : EMBER, fr = Math.floor(t * 9);
          for (let k = 0; k < 4; k++) {
            const a = loot === 'Tiny Rocket' ? Math.PI / 2 + (k - 1.5) * 0.3 : k * 1.57 + fr * 2.1, l = 1 + ((fr + k) % 3);
            setD(Math.round(sx + ox + Math.cos(a) * l), Math.round(sy + oy + Math.sin(a) * l), col);
          }
        }
        if (pet === 'Dangling Spider') {
          // it hangs down beside the face on its thread, and shoots up out of reach on a tap
          const sx = Math.max(5, Math.min(N - 6, spiderX + ox)), len = Math.round(spiderLen + Math.sin(t * 1.3) * 2 - petRun * (spiderLen - 4));
          for (let y = 0; y < len - 1; y++) setD(sx, y, SPIDER);
          stamp(['k..k.k..k', '.k.kkk.k.', 'kkkdddkkk', '..kdddk..', 'kkkwdwkkk', '.k.kkk.k.', 'k.......k'], sx - 4, len - 1, { k: INK, d: SPIDER, w: WHITEP });
        } else if (pet === 'Moth') {
          const a = t * 1.7, r = 6 + petRun * 13, cx0 = glow ? lampX : mothAt[0], cy0 = glow ? lampY : mothAt[1];
          const mx = Math.round(cx0 + Math.cos(a) * r), my2 = Math.round(cy0 + Math.sin(a * 1.3) * r * 0.6);
          stamp(Math.floor(t * 10) % 2 ? ['ww...ww', 'wdw.wdw', '.wdbdw.', '..wbw..', '...b...'] : ['.......', 'wwwbwww', 'wddbddw', '.ww.ww.', '.......'], mx - 3, my2 - 2, { w: MOTH, d: MOTHD, b: SPIDER });
        }

        if (RD) {
          // the clockwork one through a thermal camera, the Scrap King in an illuminated initial: each on a 128 grid of its own
          if (legend === 'Clockwork') thermal(t, ox, oy); else manuscript(t);
          rctx.putImageData(rimg, 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = false; ctx.drawImage(rcv, 0, 0, 128, 128, 0, 0, S, S);
          return;
        }
        for (let i = 0; i < NN; i++) PX[i] = P32[O[i]];
        cg.putImageData(img, 0, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cv, 0, 0, N, N, 0, 0, S, S);
      };
      show(0);
      return show;
    },
  });
})();

})(window.Proto);
