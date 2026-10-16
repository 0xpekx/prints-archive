// Set 2 · Dither: tone made out of nothing but a few flat inks.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;

  // a fixed scatter of thresholds (cheap blue-ish noise: jittered Bayer), so grain stays put on the paper
  function grainMask(R, n) {
    const m = new Float32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) m[y * n + x] = (X.dith8(x, y) * 0.55 + R() * 0.45);
    return m;
  }

  // ---------- naming what a variation rolled (traits), shared by p16-p20 as X.VG ----------
  // inksN draws exactly what X.inks draws, in the same order, and also names it
  const HUES = [[4, 'Red'], [11, 'Orange'], [19, 'Yellow'], [44, 'Green'], [56, 'Cyan'], [71, 'Blue'], [81, 'Violet'], [93, 'Magenta'], [101, 'Red']];
  const hueName = h => { h = ((h % 100) + 100) % 100; for (const [t, nm] of HUES) if (h < t) return nm; return 'Red'; };
  function inksN(R, k = 6, nativeShare = 0.4, sorted = false) {
    let cols, name;
    if (R() < nativeShare) {
      const from = R.range(0, 100), span = R.pick([100, 100, 70, 40]) * R.sign(), neon = R.bool(0.25);
      cols = Array.from({ length: k }, (_, i) => U.hsb(from + span * i / k, neon ? 100 : 85, neon ? 100 : 90));
      const a = hueName(from), b = hueName(from + span * (k - 1) / k);
      name = (neon ? 'Neon ' : '') + (Math.abs(span) === 100 ? 'Rainbow' : a === b ? a : a + '-' + b);
    } else { const p = U.palette(R); cols = p.cols.slice(); name = p.name; }
    const out = cols.map(U.pk);
    if (sorted) out.sort((a, b) => X.lum(a) - X.lum(b));
    out.name = name;
    return out;
  }
  const schemeName = sc => (sc.native ? 'Rainbow' : sc.name);
  // a new trait rolled on the second stream; the opening variation always keeps its original value
  const pick = (g, name, homeVal, opts) => g.trait(name, g.home ? homeVal : g.alt.pick(opts));
  const VG = X.VG = { inksN, hueName, schemeName, pick };

  // ---------- a small signed-distance scene, worked out once ----------
  const len3 = (x, y, z) => Math.sqrt(x * x + y * y + z * z);
  function sceneSDF(objs) {
    return (x, y, z) => {
      let best = y + 1, id = 0;   // floor at y = -1
      for (let k = 0; k < objs.length; k++) {
        const o = objs[k], px = x - o.x, py = y - o.y, pz = z - o.z;
        let dd;
        if (o.kind === 'sphere') dd = len3(px, py, pz) - o.r;
        else if (o.kind === 'torus') { const q = Math.hypot(px, pz) - o.r; dd = Math.hypot(q, py) - o.r * 0.38; }
        else if (o.kind === 'box') { const c = Math.cos(o.a), s = Math.sin(o.a), rx = c * px - s * pz, rz = s * px + c * pz; const qx = Math.abs(rx) - o.r * 0.8, qy = Math.abs(py) - o.r * 0.8, qz = Math.abs(rz) - o.r * 0.8; dd = len3(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0); }
        else { const qd = Math.hypot(px, pz) - o.r * 0.7, qh = Math.abs(py) - o.r; dd = Math.min(Math.max(qd, qh), 0) + Math.hypot(Math.max(qd, 0), Math.max(qh, 0)); }
        if (dd < best) { best = dd; id = k + 1; }
      }
      return [best, id];
    };
  }
  // per cell: did the ray hit, the surface normal, ambient occlusion, which object, floor coordinates
  function bake(R, n, objs, cam) {
    const f = sceneSDF(objs), N = n * n, nx = new Float32Array(N), ny = new Float32Array(N), nz = new Float32Array(N), ao = new Float32Array(N), id = new Int8Array(N).fill(-1), fx = new Float32Array(N), fz = new Float32Array(N), px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
    const { ox, oy, oz, tx, ty, tz } = cam;
    let fwx = tx - ox, fwy = ty - oy, fwz = tz - oz; const fl = len3(fwx, fwy, fwz); fwx /= fl; fwy /= fl; fwz /= fl;
    let rx = fwz, ry = 0, rz = -fwx; const rl = Math.hypot(rx, rz); rx /= rl; rz /= rl;
    const ux = fwy * rz - fwz * ry, uy = fwz * rx - fwx * rz, uz = fwx * ry - fwy * rx;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n * 2 - 1, v = 1 - (j + 0.5) / n * 2;
      let dx = fwx * 1.6 + rx * u + ux * v, dy = fwy * 1.6 + ry * u + uy * v, dz = fwz * 1.6 + rz * u + uz * v; const dl = len3(dx, dy, dz); dx /= dl; dy /= dl; dz /= dl;
      let t = 0, hit = -1;
      for (let s = 0; s < 80 && t < 30; s++) { const [dd, k] = f(ox + dx * t, oy + dy * t, oz + dz * t); if (dd < 0.002) { hit = k; break; } t += dd; }
      const c = j * n + i;
      if (hit < 0) continue;
      const x = ox + dx * t, y = oy + dy * t, z = oz + dz * t, e = 0.003;
      let gx = f(x + e, y, z)[0] - f(x - e, y, z)[0], gy = f(x, y + e, z)[0] - f(x, y - e, z)[0], gz = f(x, y, z + e)[0] - f(x, y, z - e)[0]; const gl = len3(gx, gy, gz) || 1;
      nx[c] = gx / gl; ny[c] = gy / gl; nz[c] = gz / gl; id[c] = hit; fx[c] = x; fz[c] = z; px[c] = x; py[c] = y; pz[c] = z;
      let occ = 0; for (let k = 1; k <= 4; k++) { const h = 0.08 * k; occ += (h - f(x + nx[c] * h, y + ny[c] * h, z + nz[c] * h)[0]) / Math.pow(2, k); }
      ao[c] = Math.max(0, 1 - occ * 3.5);
    }
    return { nx, ny, nz, ao, id, fx, fz, px, py, pz, f };
  }
  function makeObjs(R) {
    const kinds = R.shuffle(['sphere', 'torus', 'box', 'cyl', R.pick(['sphere', 'box'])]).slice(0, R.int(2, 4));
    return kinds.map((kind, k) => {
      const r = R.range(0.5, 0.8), a = (k / kinds.length) * U.TAU + R.range(-0.3, 0.3), dist = kinds.length === 1 ? 0 : R.range(0.8, 1.3);
      return { kind, r, x: Math.cos(a) * dist, z: Math.sin(a) * dist, y: -1 + (kind === 'torus' ? r * 0.38 : r * (kind === 'box' ? 0.8 : 1)), a: R.range(0, 3) };
    });
  }

  P.addPixel({
    name: 'One-Bit Still Life', seed: 1, fam: 'Dither', sizes: [80, 100], fps: 10,
    recipe: 'A table of solids rendered in two inks only, the way the first desktop computers drew: every grey is a pattern of on and off, and a lamp slowly circles the table, swinging the shadows round.',
    make(R, U, g) {
      const { n, d } = g, set = R.pick(U.INKS), paperC = U.pk(set.ground), ink = U.pk(set.ink), objs = makeObjs(R);
      const ang = R.range(0, U.TAU), camY = R.range(1.2, 2);
      g.trait('Inks', set.name); g.trait('Solids', objs.length); g.trait('View', camY < 1.6 ? 'Low' : 'High');
      // where the lamp circles, what the table top is, and how grey is screened into two inks
      const lamp = VG.pick(g, 'Lamp', 'Circling', ['Circling', 'Circling', 'Low sun', 'Overhead']), table = VG.pick(g, 'Table', 'Plain', ['Plain', 'Plain', 'Checked', 'Boards']), screen = VG.pick(g, 'Screen', 'Bayer', ['Bayer', 'Bayer', 'Fine', 'Halftone']);
      const LR = lamp === 'Overhead' ? 1.4 : 3.2, LH = lamp === 'Low sun' ? 1.1 : lamp === 'Overhead' ? 4 : 2.6;
      // pull the camera back just far enough that no solid is cut by the frame
      let D = 3.3;
      for (; D < 5; D += 0.1) {
        const ox = Math.cos(ang) * D, oz = Math.sin(ang) * D;
        let fx = -ox, fy = -0.5 - camY, fz = -oz; const fl = len3(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;
        let rx = fz, rz = -fx; const rl = Math.hypot(rx, rz); rx /= rl; rz /= rl;
        const ux = fy * rz, uy = fz * rx - fx * rz, uz = -fy * rx;
        const fits = objs.every(o => { const px = o.x - ox, py = o.y - camY, pz = o.z - oz, depth = px * fx + py * fy + pz * fz, m = o.r * 1.25 * 1.6 / depth; return Math.abs((px * rx + pz * rz) / depth * 1.6) + m < 0.98 && Math.abs((px * ux + py * uy + pz * uz) / depth * 1.6) + m < 0.98; });
        if (fits) break;
      }
      const b = bake(R, n, objs, { ox: Math.cos(ang) * D, oy: camY, oz: Math.sin(ang) * D, tx: 0, ty: -0.5, tz: 0 });
      const light = X.lum(paperC) > X.lum(ink), lightC = light ? paperC : ink, darkC = light ? ink : paperC, spd = R.range(0.15, 0.3), K = 48;
      // a one-cell contour where a solid meets the table or the wall, as a draughtsman would ink it
      const edge = new Uint8Array(n * n);
      for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x, k = b.id[i]; if (k > 0 && (b.id[i - 1] !== k && b.id[i - 1] <= 0 || b.id[i + 1] !== k && b.id[i + 1] <= 0 || b.id[i - n] !== k && b.id[i - n] <= 0 || b.id[i + n] !== k && b.id[i + n] <= 0)) edge[i] = 1; }
      // the camera's direction to each cell, for a small hard highlight
      const vx = new Float32Array(n * n), vy = new Float32Array(n * n), vz = new Float32Array(n * n);
      for (let i = 0; i < n * n; i++) if (b.id[i] > 0) { const ex = Math.cos(ang) * D - b.px[i], ey = camY - b.py[i], ez = Math.sin(ang) * D - b.pz[i], el = len3(ex, ey, ez); vx[i] = ex / el; vy[i] = ey / el; vz[i] = ez / el; }
      const lampAt = lamp === 'Circling' ? k => { const a = k / K * U.TAU; return [Math.cos(a) * 3, 2.6, Math.sin(a) * 3]; } : k => { const a = k / K * U.TAU; return [Math.cos(a) * LR, LH, Math.sin(a) * LR]; };
      // the screen's threshold at each cell: ordered 4 x 4, finer 8 x 8, or a clustered-dot halftone
      const CL = [12, 5, 6, 13, 4, 0, 1, 7, 11, 3, 2, 8, 15, 10, 9, 14], TH = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) TH[y * n + x] = screen === 'Fine' ? X.dith8(x, y) : screen === 'Halftone' ? (CL[(y & 3) * 4 + (x & 3)] + 0.5) / 16 : X.dith4(x, y);
      // the table's pattern, from where each cell meets the floor
      const FL = new Float32Array(n * n).fill(1);
      if (table !== 'Plain') for (let i = 0; i < n * n; i++) if (b.id[i] === 0) { const u = b.fx[i], w = b.fz[i]; FL[i] = table === 'Checked' ? ((Math.floor(u * 1.4) + Math.floor(w * 1.4)) & 1 ? 1 : 0.62) : (((u * 2.5) % 1 + 1) % 1 < 0.07 ? 0.35 : 0.85 + 0.15 * (Math.floor(u * 2.5) & 1)); }
      // the shadow for each of the 48 lamp positions is ray-marched once and kept; the next one along
      // is worked out a quarter at a time over the frames before it is needed, so no frame stalls
      const masks = new Array(K).fill(null), fill = new Array(K).fill(0), Q = Math.ceil(n * n / 4);
      const work = (k, upto) => {
        let m = masks[k];
        if (!m) m = masks[k] = new Uint8Array(n * n);
        const [lx, ly, lz] = lampAt(k);
        for (let i = fill[k]; i < upto; i++) {
          if (b.id[i] < 0) continue;
          let ox = b.px[i] + b.nx[i] * 0.01, oy = b.py[i] + b.ny[i] * 0.01, oz = b.pz[i] + b.nz[i] * 0.01, dx = lx - ox, dy = ly - oy, dz = lz - oz;
          const L = len3(dx, dy, dz); dx /= L; dy /= L; dz /= L;
          let t = 0.02, lit = 1;
          for (let s = 0; s < 40 && t < L; s++) { const dd = b.f(ox + dx * t, oy + dy * t, oz + dz * t)[0]; if (dd < 0.002) { lit = 0; break; } t += dd; }
          m[i] = lit;
        }
        fill[k] = Math.max(fill[k], upto);
      };
      const shadowMask = k => { if (fill[k] < n * n) work(k, n * n); return masks[k]; };
      return t => {
        // the shadows are worked out for 48 lamp positions; between two of them they
        // sweep across the dither, so the shade never jumps
        const ph = (t * spd / U.TAU * K) % K, k = Math.floor(ph), fr = ph - k, mask = shadowMask(k), mask2 = shadowMask((k + 1) % K), k3 = (k + 2) % K;
        if (fill[k3] < n * n) work(k3, Math.min(n * n, fill[k3] + Q));
        const [lx, ly, lz] = lampAt(ph);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          let v;
          const id = b.id[i];
          if (id < 0) v = 0.94;
          else {
            let Lx = lx - b.px[i], Ly = ly - b.py[i], Lz = lz - b.pz[i]; const ll = len3(Lx, Ly, Lz);
            Lx /= ll; Ly /= ll; Lz /= ll;
            const lam = Math.max(0, b.nx[i] * Lx + b.ny[i] * Ly + b.nz[i] * Lz) * (mask[i] + (mask2[i] - mask[i]) * fr);
            if (id === 0) v = (0.42 + 0.5 * lam) * FL[i];
            else {
              v = (0.2 + lam * 0.8) * (0.6 + 0.4 * b.ao[i]);
              if (lam > 0.2) { let hx = Lx + vx[i], hy = Ly + vy[i], hz = Lz + vz[i]; const hl = len3(hx, hy, hz), s = (b.nx[i] * hx + b.ny[i] * hy + b.nz[i] * hz) / hl; if (s > 0.96) v += (s - 0.96) * 25; }
            }
          }
          d[i] = edge[i] ? darkC : TH[i] < v ? lightC : darkC;
        }
      };
    },
  });

  P.addPixel({
    name: 'Engraving', fam: 'Dither', sizes: [100], fps: 10,
    recipe: 'Tone cut as an engraver cuts it: parallel lines that swell where the picture is dark and thin to nothing where it is light, bending over the forms beneath.',
    make(R, U, g) {
      const { n, d } = g, set = R.pick(U.INKS), paperC = U.pk(set.ground), ink = U.pk(set.ink), nz = U.noise(R), gap = n >= 200 ? 6 : 4, blobs = Array.from({ length: R.int(2, 4) }, () => ({ x: R.range(0.2, 0.8), y: R.range(0.2, 0.8), r: R.range(0.15, 0.3), vx: R.range(0.02, 0.05) * R.sign(), vy: R.range(0.02, 0.05) * R.sign(), ph: R.range(0, 6) }));
      const bend = R.range(2, 5), angle = R.pick([0, 0, 1]);
      const HT = new Float32Array(n * n), pos = blobs.map(() => [0, 0, 0]);
      g.trait('Inks', set.name); g.trait('Spheres', blobs.length);
      // the direction of the cut (as rolled, or across the plate, or rippling), the line spacing and the ground behind
      const cut = g.trait('Cut', g.home ? (angle ? 'Vertical' : 'Horizontal') : g.alt.pick(['Rolled', 'Rolled', 'Rolled', 'Diagonal', 'Rippled']).replace('Rolled', angle ? 'Vertical' : 'Horizontal'));
      const spacing = VG.pick(g, 'Spacing', 'Even', ['Even', 'Even', 'Fine', 'Open']), gp = spacing === 'Fine' ? gap - 1 : spacing === 'Open' ? gap + 2 : gap;
      const groundK = VG.pick(g, 'Ground', 'Mottled', ['Mottled', 'Mottled', 'Plain', 'Banded']);
      // a line swells one row at a time (its middle, then below, then above, then the last),
      // so the ground reads as lines thickening from one cell to two, not as solid blots
      return t => {
        d.fill(paperC);
        blobs.forEach((b, k) => { const p = pos[k]; p[0] = b.x + Math.sin(t * b.vx * 6 + b.ph) * 0.15; p[1] = b.y + Math.cos(t * b.vy * 6 + b.ph) * 0.15; p[2] = b.r; });
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const u = x / n, v = y / n;
          // shaded spheres over a soft noise ground: the picture being engraved
          let tone = groundK === 'Mottled' ? 0.6 + 0.2 * nz.n3(u * 2, v * 2, t * 0.05) : groundK === 'Plain' ? 0.7 : 0.62 + 0.2 * Math.sin(v * 9 + nz.n3(u, v, t * 0.05) * 2), height = 0;
          for (const [bx, by, br] of pos) {
            const dx = (u - bx) / br, dy = (v - by) / br, q = 1 - dx * dx - dy * dy;
            if (q > 0) { const z = Math.sqrt(q); tone = Math.min(tone, 0.08 + 0.85 * Math.max(0, -dx * 0.5 - dy * 0.6 + z * 0.62)); height = Math.max(height, z); }
          }
          // on the ground, each sphere throws a shadow down and to the right, away from the light
          if (!height) for (const [bx, by, br] of pos) { const sx = (u - bx - br * 0.32) / br, sy = (v - by - br * 0.4) / br, r2 = sx * sx + sy * sy; if (r2 < 0.9) tone = Math.min(tone, 0.34 + 0.3 * r2); }
          HT[y * n + x] = height;
          const s = cut === 'Diagonal' ? (x + y) * 0.7071 : cut === 'Rippled' ? y + Math.sin(x * 0.21) * 1.6 : angle ? x : y, line = ((s + height * bend * gp + 100 * gp) % gp) / gp, w = (1 - tone) * 0.95;
          const r = Math.round((line - 0.5) * gp), order = r === 0 ? 0 : r === 1 ? 1 : r === -1 ? 2 : 3;
          if (w * gp > order + 0.5) d[y * n + x] = ink;
        }
        // the outline of each sphere, cut in one clean line
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; if (HT[i] > 0 && (HT[i - 1] === 0 || HT[i + 1] === 0 || HT[i - n] === 0 || HT[i + n] === 0)) d[i] = ink; }
      };
    },
  });

  P.addPixel({
    name: 'Crosshatch', fam: 'Dither', sizes: [80, 100], fps: 10,
    recipe: 'Moving hills shaded by hand: one set of hatching for the light shadow, a second across it for the half dark, a third and a fourth for the deepest valleys.',
    make(R, U, g) {
      const { n, d } = g, set = R.pick(U.INKS), paperC = U.pk(set.ground), ink = U.pk(set.ink), nz = U.noise(R), sc0 = R.range(0.8, 1.4) / n, sp = R.pick([3, 4]);
      const H = new Float32Array((n + 1) * (n + 1));
      g.trait('Inks', set.name); g.trait('Hatch', sp === 3 ? 'Tight' : 'Open');
      // the lie of the land (as rolled, broad downs or steep crags), which way the hatching runs, contour lines and the light
      const land = VG.pick(g, 'Land', 'Hills', ['Hills', 'Hills', 'Downs', 'Crags']), sc = sc0 * (land === 'Downs' ? 0.55 : land === 'Crags' ? 1.9 : 1);
      const strokes = VG.pick(g, 'Strokes', 'Diagonal', ['Diagonal', 'Diagonal', 'Square']), contours = VG.pick(g, 'Contours', 'Some', ['Some', 'Some', 'Many', 'None']), CK = contours === 'Many' ? 13 : 7;
      const light = VG.pick(g, 'Light', 'North-west', ['North-west', 'North-west', 'North-east']), lx = light === 'North-east' ? -0.7 : 0.7, sq = strokes === 'Square';
      return t => {
        for (let y = 0; y <= n; y++) for (let x = 0; x <= n; x++) H[y * (n + 1) + x] = nz.fbm(x * sc + t * 0.03 * sc / sc0, y * sc, t * 0.02, 2);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const h = H[y * (n + 1) + x], gx = H[y * (n + 1) + x + 1] - h, gy = H[(y + 1) * (n + 1) + x] - h;
          const shade = Math.max(0, Math.min(1, 0.62 + (gx * lx + gy * 0.7) / sc * 0.2 + h * 0.3));
          const lv = Math.floor((1 - shade) * 5);
          let on = false;
          if (lv >= 1 && (sq ? y % sp === 0 : (x + y) % sp === 0)) on = true;
          if (lv >= 2 && (sq ? x % sp === 0 : ((x - y) % sp + sp) % sp === 0)) on = true;
          if (lv >= 3 && (sq ? (x + y) % sp === 1 : y % sp === 1)) on = true;
          if (lv >= 4 && x % 2 === 0) on = true;
          const contour = contours !== 'None' && (Math.floor(h * CK) !== Math.floor(H[y * (n + 1) + x + 1] * CK) || Math.floor(h * CK) !== Math.floor(H[(y + 1) * (n + 1) + x] * CK));
          d[y * n + x] = on || (contour && lv < 3) ? ink : paperC;
        }
      };
    },
  });

  // 5 x 5 motifs, light to dark
  const MOTIFS = [
    [0, 0, 0, 0, 0], [0, 0, 4, 0, 0], [0, 4, 14, 4, 0], [0, 10, 4, 10, 0], [4, 4, 31, 4, 4], [14, 17, 17, 17, 14], [17, 10, 4, 10, 17], [14, 31, 27, 31, 14], [21, 10, 21, 10, 21], [31, 17, 21, 17, 31], [31, 27, 21, 27, 31], [31, 31, 27, 31, 31],
  ];
  P.addPixel({
    name: 'Stipple Tiles', seed: 2, fam: 'Dither', sizes: [100, 200], fps: 10,
    recipe: 'A picture set in type that is not letters: each five-by-five tile picks one of twelve little marks, from a single dot to solid, by how dark the field is there, and takes its colour from the field’s hue.',
    make(R, U, g) {
      const { n, d } = g, T = 5, M = n / T, nz = U.noise(R), sc = U.scheme(R), sc2 = R.range(1.5, 3) / M, ground = R.bool(0.6) ? BLACK : 0xff141414;
      // the sparse marks sit back and the dense ones come forward: a little light in the field
      const shadeLv = MOTIFS.map((m, lv) => { const k = 0.62 + 0.38 * Math.min(1, lv / 8); return c => X.shade(c, k); });
      g.trait('Palette', VG.schemeName(sc)); g.trait('Grid', n); g.trait('Ground', ground === BLACK ? 'Black' : 'Charcoal');
      // which family of marks (the original twelve, growing dots, thickening crosses or diamonds) and what picture they set
      const marks = VG.pick(g, 'Marks', 'Mixed', ['Mixed', 'Mixed', 'Dots', 'Crosses', 'Diamonds']), field = VG.pick(g, 'Picture', 'Clouds', ['Clouds', 'Clouds', 'Rings', 'Waves', 'Rays']);
      const SET = marks === 'Mixed' ? MOTIFS : Array.from({ length: 12 }, (_, lv) => Array.from({ length: 5 }, (_, r) => { let row = 0; for (let c = 0; c < 5; c++) { const dx = Math.abs(c - 2), dy = Math.abs(r - 2), q = lv / 11; const on = marks === 'Dots' ? Math.hypot(dx, dy) <= q * 2.9 + 0.05 : marks === 'Diamonds' ? dx + dy <= Math.round(q * 4) : (dx <= Math.floor(q * 2.6) && dy <= Math.round(q * 2.2 + 0.4) || dy <= Math.floor(q * 2.6) && dx <= Math.round(q * 2.2 + 0.4)); if (on && lv) row |= 1 << (4 - c); } return row; }));
      const cx = g.alt.range(0.3, 0.7) * M, cy = g.alt.range(0.3, 0.7) * M;
      const fieldAt = (tx, ty, t) => {
        const v = nz.fbm(tx * sc2, ty * sc2, t * 0.06, 3);
        if (field === 'Clouds') return v;
        const rr = Math.hypot(tx - cx, ty - cy) / M;
        if (field === 'Rings') return 0.42 * Math.sin(rr * 26 + v * 3) + v * 0.4;
        if (field === 'Waves') return 0.42 * Math.sin(ty / M * 14 + Math.sin(tx / M * 6) * 1.6 + v * 2.5) + v * 0.4;
        return 0.42 * Math.sin(Math.atan2(ty - cy, tx - cx) * 7 + v * 2) * Math.min(1, rr * 4) + v * 0.5;
      };
      return t => {
        d.fill(ground);
        for (let ty = 0; ty < M; ty++) for (let tx = 0; tx < M; tx++) {
          const v = fieldAt(tx, ty, t), w = nz.n3(tx * sc2 * 0.5 + 9, ty * sc2 * 0.5, t * 0.04);
          const lv = Math.max(0, Math.min(11, Math.floor((v * 0.9 + 0.5) * 12))), col = shadeLv[lv](sc.lut[Math.floor((w * 0.5 + 0.5) * 255 + t * 6) & 255]);
          const m = SET[lv];
          for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) if (m[r] >> (4 - c) & 1) d[(ty * T + r) * n + tx * T + c] = col;
        }
      };
    },
  });

  P.addPixel({
    name: 'Banding', seed: 2, fam: 'Dither', sizes: [80, 100], fps: 10,
    recipe: 'Soft blobs shaded the way a pixel artist would: four or five flat tones, a checkerboard only along each seam, a hard highlight and a dark outline round the whole form.',
    make(R, U, g) {
      const { n, d } = g, k = R.int(2, 4), blobs = Array.from({ length: k }, () => ({ x: R.range(0.25, 0.75), y: R.range(0.25, 0.75), r: R.range(0.12, 0.2), ax: R.range(0.1, 0.22), ay: R.range(0.1, 0.22), fx: R.range(0.15, 0.35), fy: R.range(0.15, 0.35), ph: R.range(0, 6) }));
      const inks = VG.inksN(R, 5, 0.45, true), hiC = X.mixPk(inks[3 % inks.length], WHITE, 0.4), tones = [X.shade(inks[1], 0.35), X.shade(inks[1], 0.6), inks[1], X.mixPk(inks[1], hiC, 0.45), hiC], line = X.shade(inks[1], 0.16), bg = X.shade(inks[0], 0.12), bg2 = X.shade(inks[0], 0.18);
      g.trait('Palette', inks.name); g.trait('Grid', n); g.trait('Blobs', k);
      // where the light comes from, how big the forms are and what they sit on
      const light = VG.pick(g, 'Light', 'Upper left', ['Upper left', 'Upper left', 'Above', 'Upper right']), LX = light === 'Above' ? 0 : light === 'Upper right' ? -1 : 1, LY = light === 'Above' ? 1.41 : 1;
      const size = VG.pick(g, 'Size', 'Medium', ['Medium', 'Medium', 'Large', 'Small']);
      if (size !== 'Medium') for (const b of blobs) { b.r *= size === 'Large' ? 1.18 : 0.72; b.x = Math.max(b.r + 0.08, Math.min(1 - b.r - 0.08, b.x)); b.y = Math.max(b.r + 0.08, Math.min(1 - b.r - 0.08, b.y)); }
      const groundK = VG.pick(g, 'Ground', 'Checks', ['Checks', 'Checks', 'Plain', 'Stripes', 'Dots']), dot = X.shade(inks[0], 0.3);
      const F = new Float32Array(n * n), H = new Float32Array(n * n), H2 = new Float32Array(n * n), pos = blobs.map(() => [0, 0, 0]), R2 = blobs.reduce((s, b) => s + b.r, 0) / k * n / 2;
      return t => {
        blobs.forEach((b, k) => {
          // each blob swings only as far as keeps it inside the frame
          const ax = Math.min(b.ax, Math.max(0.04, Math.min(b.x, 1 - b.x) - b.r - 0.03)), ay = Math.min(b.ay, Math.max(0.04, Math.min(b.y, 1 - b.y) - b.r - 0.03));
          pos[k][0] = b.x + Math.sin(t * b.fx + b.ph) * ax; pos[k][1] = b.y + Math.cos(t * b.fy + b.ph * 2) * ay; pos[k][2] = b.r;
        });
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let s = 0; const u = (x + 0.5) / n, v = (y + 0.5) / n;
          for (const [bx, by, br] of pos) s += br * br / ((u - bx) ** 2 + (v - by) ** 2 + 1e-4);
          F[y * n + x] = s;
          // a dome over the blob: 0 at its edge, 1 at its heart
          H[y * n + x] = s > 1 ? Math.sqrt(1 - 1 / s) : 0;
        }
        // softened once, so the seams where blobs merge are smooth valleys, not creases
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) { const i = y * n + x; H2[i] = H[i] ? (H[i] * 4 + H[i - 1] + H[i + 1] + H[i - n] + H[i + n]) / 8 : 0; }
        H.set(H2);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, s = F[i];
          if (s < 1) { d[i] = groundK === 'Checks' ? ((x >> 3) + (y >> 3) & 1 ? bg2 : bg) : groundK === 'Plain' ? bg : groundK === 'Stripes' ? ((x + y) >> 2 & 1 ? bg2 : bg) : (x % 5 === 2 && y % 5 === 2 ? dot : bg); if (F[Math.min(n * n - 1, i + 1)] >= 1 || F[Math.max(0, i - 1)] >= 1 || (y < n - 1 && F[i + n] >= 1) || (y > 0 && F[i - n] >= 1)) d[i] = line; continue; }
          // light from the upper left falling on the dome's slope
          const gx = ((x < n - 1 ? H[i + 1] : 0) - (x > 0 ? H[i - 1] : 0)) * R2, gy = ((y < n - 1 ? H[i + n] : 0) - (y > 0 ? H[i - n] : 0)) * R2;
          const lit = Math.max(0, Math.min(0.999, 0.08 + 0.92 * (LX * gx + LY * gy + 0.8) / (Math.sqrt(gx * gx + gy * gy + 1) * 1.625)));
          const z = lit * 4.8, b = Math.floor(z), fr = z - b;
          let c = b + (fr > 0.75 && (x + y) & 1 ? 1 : 0);
          d[i] = tones[Math.min(4, c)];
        }
      };
    },
  });

  P.addPixel({
    name: 'Diffusion', fam: 'Dither', sizes: [100, 200], fps: 6,
    interactive: 'Point to carry a lamp of your own; click to leave one burning.',
    recipe: 'Light from drifting lamps forced into two or three inks by error diffusion: each cell rounds to the nearest ink and hands its mistake on to the cells it has not done yet.',
    make(R, U, g) {
      const { n, d } = g, inks = VG.inksN(R, 3, 0.4, true), lv = R.pick([2, 3]), cols = lv === 2 ? [inks[0] === inks[2] ? BLACK : X.shade(inks[0], 0.25), X.mixPk(inks[2], WHITE, 0.3)] : [X.shade(inks[0], 0.2), inks[1], X.mixPk(inks[2], WHITE, 0.4)];
      const lamps = Array.from({ length: R.int(2, 4) }, () => ({ fx: R.range(0.05, 0.12), fy: R.range(0.05, 0.12), ph: R.range(0, 6), r: R.range(0.25, 0.5) }));
      const E = new Float32Array(n * n), EXP = Float32Array.from({ length: 1025 }, (_, k) => Math.exp(-k / 128) * 0.7), inp = g.input;
      // lamps the viewer leaves behind (a click), the oldest going out past twelve
      const left = [], live = [];
      g.trait('Palette', inks.name); g.trait('Inks', lv); g.trait('Lamps', lamps.length);
      // how the error is handed on (Floyd and Steinberg's four neighbours, or Atkinson's six, losing a quarter, as the
      // first desktop computers did), the shape of the light and the way the lamps travel
      const diffuser = VG.pick(g, 'Diffuser', 'Floyd-Steinberg', ['Floyd-Steinberg', 'Floyd-Steinberg', 'Atkinson']), atk = diffuser === 'Atkinson';
      const beam = VG.pick(g, 'Beam', 'Round', ['Round', 'Round', 'Wide', 'Tall']), AX = beam === 'Wide' ? 0.3 : beam === 'Tall' ? 2.2 : 1, AY = beam === 'Wide' ? 2.2 : beam === 'Tall' ? 0.3 : 1;
      const path = VG.pick(g, 'Path', 'Wander', ['Wander', 'Wander', 'Orbit']);
      return t => {
        for (const tap of inp.taps()) { left.push([tap.x, tap.y, 128 / 0.012, 0]); if (left.length > 8) left.shift(); }
        E.fill(0.05);
        live.length = 0;
        for (const l of lamps) live.push(path === 'Orbit' ? [0.5 + 0.3 * Math.cos(t * l.fx * 6 + l.ph), 0.5 + 0.3 * Math.sin(t * l.fx * 6 + l.ph), 128 / (l.r * l.r), 1] : [0.5 + 0.38 * Math.sin(t * l.fx * 6 + l.ph), 0.5 + 0.38 * Math.cos(t * l.fy * 6 + l.ph * 1.7), 128 / (l.r * l.r), 1]);
        if (inp.inside) live.push([inp.x, inp.y, 128 / 0.09, 1]);
        // a left lamp lights up over a second and then burns with a slow flicker
        for (const l of left) { l[3] = Math.min(1, l[3] + 0.17); live.push([l[0], l[1], l[2], l[3] * (0.8 + 0.1 * Math.sin(t * 3 + l[0] * 40))]); }
        for (const [lx, ly, k, a] of live) for (let y = 0; y < n; y++) {
          const w = y / n - ly, wy = w * w * AY;
          if (wy * k > 1024) continue;
          for (let x = 0; x < n; x++) { const u = x / n - lx, q = (u * u * AX + wy) * k; if (q < 1024) E[y * n + x] += EXP[q | 0] * a; }
        }
        for (let i = 0; i < n * n; i++) if (E[i] > 1) E[i] = 1;
        for (let y = 0; y < n; y++) {
          const rev = y & 1;
          for (let k = 0; k < n; k++) {
            const x = rev ? n - 1 - k : k, i = y * n + x, v = E[i], q = Math.max(0, Math.min(lv - 1, Math.round(v * (lv - 1)))), err = v - q / (lv - 1);
            d[i] = cols[q];
            const dx = rev ? -1 : 1;
            if (atk) {
              const e = err / 8;
              if (x + dx >= 0 && x + dx < n) E[i + dx] += e; if (x + 2 * dx >= 0 && x + 2 * dx < n) E[i + 2 * dx] += e;
              if (y < n - 1) { if (x - dx >= 0 && x - dx < n) E[i + n - dx] += e; E[i + n] += e; if (x + dx >= 0 && x + dx < n) E[i + n + dx] += e; }
              if (y < n - 2) E[i + 2 * n] += e;
              continue;
            }
            if (x + dx >= 0 && x + dx < n) E[i + dx] += err * 7 / 16;
            if (y < n - 1) { if (x - dx >= 0 && x - dx < n) E[i + n - dx] += err * 3 / 16; E[i + n] += err * 5 / 16; if (x + dx >= 0 && x + dx < n) E[i + n + dx] += err / 16; }
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Bit Depth', fam: 'Dither', sizes: [100], fps: 10,
    recipe: 'One picture shown at many bit depths at once: the canvas is cut into squares, and each square keeps only one, two, three or six bits of every colour, labelled in its corner.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R), sc = R.range(1.5, 3) / n, sc2 = U.scheme(R, 0.6);
      let tiles = [];
      // squares on whole cells (a 25 splits into 12 and 13), so every cell belongs to one square
      const split = (x, y, w, h, s, depth) => { if (s > n / 8 && (depth < 1 || R.bool(0.55))) { const a = Math.floor(w / 2), b = Math.floor(h / 2); split(x, y, a, b, s / 2, depth + 1); split(x + a, y, w - a, b, s / 2, depth + 1); split(x, y + b, a, h - b, s / 2, depth + 1); split(x + a, y + b, w - a, h - b, s / 2, depth + 1); } else { const bits = R.pick([1, 1, 2, 2, 3, 4, 6]); tiles.push({ x, y, w, h, bits, nb: bits, wipe: -1 }); } };
      split(0, 0, n, n, n, 0);
      // the picture is worked out on every second cell and blended between, which looks the same and costs a quarter
      const m = (n >> 1) + 1, F = new Float32Array(m * m);
      let next = 6;
      g.trait('Palette', VG.schemeName(sc2)); g.trait('Squares', tiles.length); g.trait('Scale', sc * n < 2.2 ? 'Broad' : 'Fine');
      // what picture is shown, and whether the squares lean to few bits, many, or a spread
      const pic = VG.pick(g, 'Picture', 'Clouds', ['Clouds', 'Clouds', 'Rings', 'Sunset', 'Marble']), depths = VG.pick(g, 'Depths', 'Mixed', ['Mixed', 'Mixed', 'Low', 'High']);
      const LOW = [1, 1, 2, 2, 3], HIGH = [3, 4, 4, 6, 6];
      if (depths !== 'Mixed') tiles.forEach(tl => { tl.bits = tl.nb = g.alt.pick(depths === 'Low' ? LOW : HIGH); });
      const ox = g.home ? 0 : g.alt.range(0.25, 0.75) * m, oy = g.home ? 0 : g.alt.range(0.25, 0.75) * m;
      const picAt = (x, y, t) => {
        const v = nz.fbm(x * 2 * sc, y * 2 * sc, t * 0.05, 3);
        if (pic === 'Clouds') return v;
        if (pic === 'Rings') return 0.45 * Math.sin(Math.hypot(x - ox, y - oy) / m * 30 + v * 4);
        if (pic === 'Sunset') return (y / m - 0.5) * 1.1 + v * 0.35;
        return 0.45 * Math.sin((x + y) / m * 12 + v * 9);
      };
      return t => {
        // a square changing depth is rescanned from the top down over half a second
        if (t > next) { next = t + 5; tiles.forEach(tl => { if (R.bool(0.35)) { const b = R.pick([1, 2, 3, 4, 6]); tl.nb = depths === 'Mixed' ? b : depths === 'Low' ? LOW[b % 5] : HIGH[b % 5]; tl.wipe = t; } }); }
        for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) F[y * m + x] = picAt(x, y, t);
        for (const tl of tiles) {
          const scan = tl.wipe < 0 ? -1 : tl.y + Math.floor((t - tl.wipe) / 0.5 * tl.h);
          if (scan >= tl.y + tl.h) { tl.bits = tl.nb; tl.wipe = -1; }
          for (let y = tl.y; y < tl.y + tl.h; y++) {
            const bits = scan >= 0 && y < scan ? tl.nb : tl.bits, L = (1 << bits) - 1, dith = bits < 3, fy = y / 2, y0 = fy | 0, wy = fy - y0;
            for (let x = tl.x; x < tl.x + tl.w; x++) {
              const fx = x / 2, x0 = fx | 0, wx = fx - x0, i0 = y0 * m + x0;
              const v = (F[i0] * (1 - wx) + F[i0 + 1] * wx) * (1 - wy) + (F[i0 + m] * (1 - wx) + F[i0 + m + 1] * wx) * wy;
              const c = sc2.lut[Math.floor((v * 0.6 + 0.5) * 255 + t * 8) & 255], th = dith ? X.dith4(x, y) - 0.5 : 0;
              const r = Math.round(Math.max(0, Math.min(L, (c & 255) / 255 * L + th))) * 255 / L, gg = Math.round(Math.max(0, Math.min(L, (c >> 8 & 255) / 255 * L + th))) * 255 / L, b = Math.round(Math.max(0, Math.min(L, (c >> 16 & 255) / 255 * L + th))) * 255 / L;
              d[y * n + x] = X.rgb(r, gg, b);
            }
            if (y === scan) X.rect(g, tl.x, y, tl.w, 1, WHITE);
          }
          X.rect(g, tl.x, tl.y, tl.w, 1, 0xff000000); X.rect(g, tl.x, tl.y, 1, tl.h, 0xff000000);
          // the depth is labelled where a square is big enough to carry it without crowding
          if (tl.w >= 20) { X.rect(g, tl.x + 1, tl.y + 1, 7, 9, BLACK); X.text(g, String(scan >= 0 && scan > tl.y + 9 ? tl.nb : tl.bits), tl.x + 2, tl.y + 2, WHITE); }
        }
      };
    },
  });

  P.addPixel({
    name: 'Phosphor', fam: 'Dither', sizes: [100, 200], fps: 12,
    recipe: 'A picture as an old colour tube shows it: every pixel lit as stripes of red, green and blue phosphor, each line scanned with a dark gap, and the bright parts blooming into their neighbours.',
    make(R, U, g) {
      const { n, d } = g, K = 5, S = n / K, src = new Uint32Array(S * S), sc = U.scheme(R), word = R.pick(['SYNAESTHESIA', 'HELLO WORLD', 'INSERT COIN', 'PRESS START', 'READY.', 'LOADING']), bands = R.int(4, 9);
      const view = { n: S, d: src }, glow = new Float32Array(n * n * 3);
      // the tube's glass: brightest in the middle, falling off into the corners
      const vig = new Float32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const u = (x + 0.5) / n * 2 - 1, v = (y + 0.5) / n * 2 - 1, r2 = u * u * 0.8 + v * v; vig[y * n + x] = (1 - 0.2 * r2 * r2) * 300; }
      g.trait('Palette', VG.schemeName(sc)); g.trait('Grid', n); g.trait('Message', word); g.trait('Bands', bands);
      // the tube's phosphor mask (aperture-grille stripes, staggered slots or a delta of dots) and the picture behind the message
      const mask = VG.pick(g, 'Mask', 'Grille', ['Grille', 'Grille', 'Slot', 'Delta']), picture = VG.pick(g, 'Picture', 'Bands', ['Bands', 'Bands', 'Columns', 'Checks']);
      const SUB = new Uint8Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) SUB[y * n + x] = mask === 'Slot' ? (x + ((y / K | 0) & 1) * 2) % 3 : mask === 'Delta' ? (x + (y % 3) * 2) % 3 : x % 3;
      return (t, dt, f) => {
        // a darker picture behind the lettering, so the white text is what blooms
        if (picture === 'Bands') for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) src[y * S + x] = X.shade(sc.lut[Math.floor((y / S) * bands * 32 + t * 10) & 255], 0.3 + 0.28 * (y / S));
        else for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const q = picture === 'Columns' ? (x / S) * bands * 32 : (((x * bands / S) | 0) + ((y * bands / S) | 0)) % 2 * 96 + (y / S) * 64; src[y * S + x] = X.shade(sc.lut[Math.floor(q + t * 10) & 255], 0.3 + 0.28 * (y / S)); }
        // the message is already on screen at the first frame, then marches through
        const w = X.textWidth(word, 1), x0 = Math.round(S - ((t * 6 + S * 0.85) % (w + S))), y0 = Math.round(S / 2 - 3 + Math.sin(t * 1.5) * S * 0.18);
        X.text(view, word, x0 + 1, y0 + 1, BLACK); X.text(view, word, x0, y0, WHITE);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const c = src[(Math.floor(y / K)) * S + Math.floor(x / K)], sub = SUB[y * n + x], scan = y % K === K - 1 ? 0.2 : 1, o = (y * n + x) * 3;
          glow[o] = glow[o] * 0.35 + (sub === 0 ? (c & 255) / 255 : 0) * scan;
          glow[o + 1] = glow[o + 1] * 0.35 + (sub === 1 ? (c >> 8 & 255) / 255 : 0) * scan;
          glow[o + 2] = glow[o + 2] * 0.35 + (sub === 2 ? (c >> 16 & 255) / 255 : 0) * scan;
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const o = (y * n + x) * 3, l = x > 0 ? o - 3 : o, rr = x < n - 1 ? o + 3 : o, k = vig[y * n + x];
          d[y * n + x] = X.rgb(Math.min(255, (glow[o] + 0.45 * (glow[l] + glow[rr])) * k), Math.min(255, (glow[o + 1] + 0.45 * (glow[l + 1] + glow[rr + 1])) * k), Math.min(255, (glow[o + 2] + 0.45 * (glow[l + 2] + glow[rr + 2])) * k));
        }
      };
    },
  });

  P.addPixel({
    name: 'Cloud Sea', fam: 'Dither', sizes: [80, 100], fps: 10,
    recipe: 'The view from above the weather: a deck of cloud rolling past below, thin wisps drifting higher up, every bank only three flat tones joined by dithered seams.',
    make(R, U, g) {
      const { n, d } = g, nz = U.noise(R), inks = VG.inksN(R, 4, 0.35, true), deck = Math.round(n * R.range(0.5, 0.62));
      const sky = X.rampPk([X.shade(inks[0], 0.45), inks[1], X.mixPk(inks[3], WHITE, 0.55)], 7);
      const lit = X.mixPk(inks[3], WHITE, 0.75), mid = X.mixPk(inks[2], WHITE, 0.35);
      // the shade under each billow is the cloud's own colour gone down a step and cooled by the sky,
      // not a new ink; far banks fade into the haze along the horizon
      const shadow = X.shade(mid, 0.72), haze = sky[6];
      const far = [lit, mid, shadow].map(c => Array.from({ length: 6 }, (_, k) => X.mixPk(c, haze, 0.55 * (1 - k / 6))));
      const sp = R.range(0.01, 0.02), wisp = R.range(0.2, 0.35);
      g.trait('Palette', inks.name); g.trait('Grid', n); g.trait('Horizon', deck < n * 0.56 ? 'High' : 'Low'); g.trait('Wisps', wisp < 0.27 ? 'Thin' : 'Thick');
      // something in the sky (a sun, a moon or mountain peaks standing out of the cloud) and the kind of deck
      const feature = VG.pick(g, 'Above', 'Open sky', ['Open sky', 'Open sky', 'Sun', 'Moon', 'Peaks']), deckK = VG.pick(g, 'Deck', 'Rolling', ['Rolling', 'Rolling', 'Billowing', 'Broken']);
      const amp = deckK === 'Billowing' ? 0.55 : 0.35, sea = X.mixPk(X.shade(inks[0], 0.7), haze, 0.25), sea2 = X.mixPk(sea, mid, 0.2);
      const fx = (g.home ? 0.5 : g.alt.range(0.2, 0.8)) * n, fy = deck * (g.home ? 0.5 : g.alt.range(0.35, 0.6)), fr = n * 0.075;
      const disc = feature === 'Sun' ? X.mixPk(lit, 0xff80e8ff, 0.5) : X.mixPk(lit, WHITE, 0.6), halo = X.mixPk(sky[3], lit, 0.45);
      const peakH = new Float32Array(n), snow = X.mixPk(lit, haze, 0.2), rock = X.mixPk(shadow, sky[2], 0.35), rock2 = X.mixPk(rock, sky[4], 0.3);
      if (feature === 'Peaks') for (let x = 0; x < n; x++) { const u = x / n; peakH[x] = deck * 0.92 - Math.max(0, nz.n2(u * 3.1 + 40, 7) * 0.6 + 0.3 - Math.abs(nz.n2(u * 9 + 3, 2)) * 0.25) * deck * 0.75; }
      return t => {
        for (let y = 0; y < n; y++) { const z = Math.min(6.99, y / deck * 6.99); for (let x = 0; x < n; x++) d[y * n + x] = sky[Math.min(6, Math.floor(z) + (X.dith4(x, y) < z % 1 ? 1 : 0))]; }
        if (feature === 'Sun' || feature === 'Moon') for (let y = Math.max(0, Math.floor(fy - fr * 2.2)); y < Math.min(n, fy + fr * 2.2); y++) for (let x = Math.max(0, Math.floor(fx - fr * 2.2)); x < Math.min(n, fx + fr * 2.2); x++) {
          const r = Math.hypot(x + 0.5 - fx, y + 0.5 - fy) / fr, i = y * n + x;
          if (r < 1) { if (feature === 'Moon' && Math.hypot(x + 0.5 - fx - fr * 0.45, y + 0.5 - fy + fr * 0.2) < fr * 0.9) continue; d[i] = disc; }
          else if (r < 2.2 && X.dith4(x, y) < (2.2 - r) / 1.2 * (feature === 'Sun' ? 0.6 : 0.3)) d[i] = halo;
        }
        if (feature === 'Peaks') for (let x = 0; x < n; x++) for (let y = Math.max(0, Math.floor(peakH[x])); y < deck; y++) { const sl = peakH[Math.min(n - 1, x + 1)] - peakH[x]; d[y * n + x] = y - peakH[x] < deck * 0.06 ? snow : sl > 0 ? rock2 : rock; }
        // high wisps: thin veils only a little lighter than the sky behind them
        for (let y = Math.floor(n * 0.1); y < n * wisp + n * 0.1; y++) for (let x = 0; x < n; x++) {
          const v = nz.fbm(x / n * 3 + t * sp * 0.6, y / n * 9, 1, 2) + 0.12 - Math.abs(y / n - 0.1 - wisp / 2) * 1.5;
          if (v > 0 && X.dith4(x, y) < v * 5) d[y * n + x] = X.mixPk(d[y * n + x], lit, v > 0.12 ? 0.5 : 0.3);
        }
        // the deck: a height for each column and row of cloud tops, lit from above
        for (let y = Math.floor(deck * 0.8); y < n; y++) {
          const depth = (y - deck) / (n - deck), w = depth * 3, fade = depth < 0.3 ? Math.max(0, Math.min(5, Math.floor(depth / 0.3 * 6))) : -1;
          for (let x = 0; x < n; x++) {
            const u = x / n * 2.2 + t * sp * (1 + depth);
            const top = nz.fbm(u, w + 3, 2, 2) * amp - depth * 0.9;
            if (top > -0.08) continue;
            // a broken deck has holes through to the sea far below
            if (deckK === 'Broken' && depth > 0.15 && nz.n3(u * 1.6, w * 1.3 + 20, 5) > 0.28) { d[y * n + x] = (x + y) % 4 ? sea : sea2; continue; }
            const shade = nz.fbm(u, w + 3.14, 2, 2) * amp - depth * 0.9 - top;
            let k = shade < -0.02 ? 0 : shade < 0.035 ? 1 : 2;
            if (shade > -0.02 && shade < 0.0 && X.dith4(x, y) < 0.5) k = 0;
            else if (shade >= 0.035 && shade < 0.05 && X.dith4(x, y) < 0.5) k = 1;
            d[y * n + x] = fade >= 0 ? far[k][fade] : k === 0 ? lit : k === 1 ? mid : shadow;
          }
        }
      };
    },
  });

  P.addPixel({
    name: 'Riso', fam: 'Dither', sizes: [100], fps: 10,
    recipe: 'A two-ink print with the grain of a stencil duplicator: bold shapes in two spot colours overlap and darken, never quite in register, on speckled paper.',
    make(R, U, g) {
      const SPOTS = [[[255, 72, 176], [0, 120, 191]], [[255, 102, 94], [0, 169, 92]], [[255, 232, 0], [118, 91, 167]], [[255, 116, 119], [61, 85, 136]], [[0, 157, 165], [255, 108, 47]]];
      const { n, d } = g, spots = R.pick(SPOTS);
      const paper0 = [244, 240, 228], mask = [grainMask(R, n), grainMask(R, n)];
      const shapes = [0, 1].map(layer => Array.from({ length: R.int(3, 5) }, () => ({ kind: R.pick(['disc', 'bar', 'ring', 'stripes', 'tri']), x: R.range(0.15, 0.85), y: R.range(0.15, 0.85), r: R.range(0.12, 0.32), a: R.range(0, U.TAU), v: R.range(0.04, 0.1) * R.sign(), tone: R.pick([1, 1, 0.7, 0.45]), layer })));
      g.trait('Inks', ['Pink and Blue', 'Coral and Green', 'Yellow and Purple', 'Peach and Navy', 'Teal and Orange'][SPOTS.indexOf(spots)]);
      g.trait('Shapes', shapes[0].length + shapes[1].length);
      // the stock it is printed on, how the shapes are set on the sheet, and how far the second drum drifts
      const stock = VG.pick(g, 'Paper', 'Cream', ['Cream', 'Cream', 'White', 'Kraft', 'Grey']), paper = stock === 'White' ? [250, 250, 248] : stock === 'Kraft' ? [212, 186, 146] : stock === 'Grey' ? [214, 214, 210] : paper0;
      const layout = VG.pick(g, 'Layout', 'Scattered', ['Scattered', 'Scattered', 'Centred', 'Frieze', 'Grid']), reg = VG.pick(g, 'Register', 'Loose', ['Loose', 'Loose', 'Tight', 'Wild']), RG = reg === 'Tight' ? 0.4 : reg === 'Wild' ? 3 : 1;
      if (layout !== 'Scattered') shapes.forEach((layer, L) => layer.forEach((s, k) => {
        if (layout === 'Centred') { s.x = 0.5 + (s.x - 0.5) * 0.35; s.y = 0.5 + (s.y - 0.5) * 0.35; s.r *= 1.2; }
        else if (layout === 'Frieze') { s.x = (k + 0.5 + L * 0.5) / layer.length; s.y = 0.5 + (s.y - 0.5) * 0.3; s.r = Math.min(s.r, 0.6 / layer.length + 0.05); }
        else { const c = (k * 2 + L) % 9; s.x = 0.2 + (c % 3) * 0.3; s.y = 0.2 + Math.floor(c / 3) * 0.3; s.r = Math.min(s.r, 0.15); }
      }));
      const amount = (s, u, v) => {
        const dx = u - s.cx, dy = v - s.cy, rr2 = dx * dx + dy * dy;
        if (rr2 > s.reach) return 0;
        if (s.kind === 'disc') return rr2 < s.r * s.r ? s.tone : 0;
        if (s.kind === 'ring') return rr2 < s.r * s.r && rr2 > s.r * s.r * 0.3844 ? s.tone : 0;
        const rr = Math.sqrt(rr2), ru = dx * s.ca + dy * s.sa, rv = -dx * s.sa + dy * s.ca;
        if (s.kind === 'bar') return Math.abs(ru) < s.r && Math.abs(rv) < s.r * 0.3 ? s.tone : 0;
        if (s.kind === 'stripes') return rr < s.r * 1.1 && Math.floor(ru * 22) & 1 ? s.tone : 0;
        return rv > -s.r * 0.5 && Math.abs(ru) < (s.r * 0.9 - rv) * 0.7 && rv < s.r * 0.9 ? s.tone : 0;
      };
      return t => {
        const off = [Math.round(Math.sin(t * 0.3) * 1.5 * RG), Math.round(Math.cos(t * 0.23) * RG)];
        for (const layer of shapes) for (const s of layer) { s.cx = s.x + Math.sin(t * s.v + s.a) * 0.06; s.cy = s.y + Math.cos(t * s.v * 0.8 + s.a) * 0.06; const a = s.a + t * s.v; s.ca = Math.cos(a); s.sa = Math.sin(a); s.reach = (s.r * 1.45) ** 2; }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let r = paper[0], gg = paper[1], b = paper[2];
          for (let L = 0; L < 2; L++) {
            const xx = x + (L ? off[0] : 0), yy = y + (L ? off[1] : 0), u = xx / n, v = yy / n;
            let a = 0; for (const s of shapes[L]) { const q = amount(s, u, v); if (q > a) a = q; }
            if (a > 0 && mask[L][y * n + x] < a * 0.92) { const c = spots[L]; r = r * c[0] / 255; gg = gg * c[1] / 255; b = b * c[2] / 255; }
          }
          d[y * n + x] = X.rgb(r, gg, b);
        }
      };
    },
  });
})();
