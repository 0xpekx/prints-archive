// Projections: three and four dimensions flattened onto the square.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000, WHITE = 0xffffffff;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);
  const groundName = sh => (sh.paper ? (P.U.INKS.find(k => k.ground === sh.ground) || { name: 'Paper' }).name : 'Black');
  const sheetPal = sh => (sh.paper ? 'Ink' : palName(sh.scheme));

  // A cell grid for the newer variations of plot prototypes: drawn into pixels, then laid crisp over the stage.
  function pixelStage(g, n) {
    const off = document.createElement('canvas'); off.width = off.height = n;
    const octx = off.getContext('2d'), img = octx.createImageData(n, n), d = new Uint32Array(img.data.buffer);
    const pg = { n, d, S: g.S, input: g.input, sound: g.sound, home: g.home, alt: g.alt, trait: g.trait };
    pg.flush = () => { octx.putImageData(img, 0, 0); g.ctx.imageSmoothingEnabled = false; g.ctx.drawImage(off, 0, 0, 1000, 1000); };
    return pg;
  }

  P.add({
    name: 'Isometric Strata', seed: 2, fam: 'Projections', type: 'vec',
    recipe: 'The collection’s modulo formula read as height instead of hue: a city block of towers rising and settling in step.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R), N = R.int(11, 15), tw = 1120 / N, th = tw / 2, top = R.range(190, 280);
      const a = R.range(0.02, 0.06), yd = R.range(8, 13), y0 = R.int(200, 400), fs = R.int(1000, 30000), speed = R.range(0.5, 1), drift = R.range(1, 3), gapped = R.bool(0.5);
      const order = [];
      for (let s = 0; s <= 2 * (N - 1); s++) for (let i = 0; i < N; i++) { const j = s - i; if (j >= 0 && j < N) order.push([i, j]); }
      const quad = (x0, y0q, x1, y1, x2, y2, x3, y3, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, y0q); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.closePath(); ctx.fill(); };
      return t => {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        const tt = fs + t * speed, base = 500 - (N - 1) * th / 2 + top * 0.42, k = gapped ? 0.86 : 1;
        for (const [i, j] of order) {
          const x = (i + 1) * 800 / N, m = (y0 + (j + 1) * 800 / N) / yd, v = ((tt * x * a) % m) / m, tri = 1 - Math.abs(2 * v - 1);
          const h = 14 + tri * top, cx = 500 + (i - j) * tw / 2, cy = base + (i + j) * th / 2, c = U.ramp(sc.cols, v + t * drift * 0.01, true), w = tw / 2 * k, e = th / 2 * k;
          quad(cx - w, cy - h, cx, cy + e - h, cx, cy + e, cx - w, cy, U.css(U.mix(c, [0, 0, 0], 0.45)));
          quad(cx + w, cy - h, cx, cy + e - h, cx, cy + e, cx + w, cy, U.css(U.mix(c, [0, 0, 0], 0.68)));
          quad(cx, cy - e - h, cx + w, cy - h, cx, cy + e - h, cx - w, cy - h, U.css(c));
        }
      };
    },
  });

  P.add({
    name: 'Voxel Residue', seed: 3, fam: 'Projections', type: 'gl', n: 200,
    interactive: 'Move the pointer to steer down the corridor.',
    recipe: 'A flight down a corridor cut through a lattice of cubes, where a cube exists only if a sum of its coordinates (x·y, x² + y², or x + y) plus its depth leaves a small remainder.',
    frag: `uniform float u_m, u_k, u_th, u_z, u_roll, u_wide, u_rule, u_sx, u_sy;
      float solid(vec3 c){
        if (abs(c.x) < u_wide && abs(c.y) < u_wide) return -1.0;
        float q = u_rule < 0.5 ? c.x * c.y : u_rule < 1.5 ? c.x * c.x + c.y * c.y : abs(c.x) + abs(c.y) * 2.0;
        float v = mod(q + c.z * u_k, u_m);
        return v < u_th ? v : -1.0;
      }
      void main(){
        vec2 uv = v_uv * 2.0 - 1.0;
        float cr = cos(u_roll), sr = sin(u_roll);
        vec3 rd = normalize(vec3(uv.x * cr - uv.y * sr + u_sx * 0.5, uv.x * sr + uv.y * cr - u_sy * 0.5, 1.15)) + vec3(1e-5);
        vec3 ro = vec3(0.5 + u_sx * 0.8, 0.5 - u_sy * 0.8, u_z);
        vec3 cell = floor(ro), st = sign(rd), td = abs(1.0 / rd), tm = (cell + max(st, 0.0) - ro) / rd;
        float hit = -1.0, dist = 0.0; vec3 nrm = vec3(0.0);
        for (int i = 0; i < 80; i++) {
          if (tm.x < tm.y && tm.x < tm.z) { dist = tm.x; tm.x += td.x; cell.x += st.x; nrm = vec3(1.0, 0.0, 0.0); }
          else if (tm.y < tm.z) { dist = tm.y; tm.y += td.y; cell.y += st.y; nrm = vec3(0.0, 1.0, 0.0); }
          else { dist = tm.z; tm.z += td.z; cell.z += st.z; nrm = vec3(0.0, 0.0, 1.0); }
          float s = solid(cell);
          if (s >= 0.0) { hit = s; break; }
        }
        vec3 col = vec3(0.0);
        if (hit >= 0.0) col = palStep(hit / u_th * 0.999 + cell.z * 0.013) * (nrm.x > 0.5 ? 0.55 : nrm.y > 0.5 ? 1.0 : 0.78) * exp(-dist * 0.05);
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const sc = U.scheme(R), pal = U.glPalette(sc), m = R.int(5, 13), th = Math.max(1, Math.round(m * R.range(0.2, 0.42))), k = R.int(1, m - 1), speed = R.range(1.4, 2.6), roll = R.range(0.02, 0.06) * R.sign(), wide = R.pick([1.5, 1.5, 2.5]), rule = g.home || g.alt() < 0.5 ? 0 : g.alt.pick([1, 2]);   // rule 0 is the original
      let sx = 0, sy = 0;
      g.trait('Palette', palName(sc)); g.trait('Rule', ['Product', 'Circles', 'Diamonds'][rule]); g.trait('Modulus', m); g.trait('Density', th / m > 0.32 ? 'Dense' : 'Sparse'); g.trait('Corridor', wide > 2 ? 'Wide' : 'Narrow');
      return t => {
        sx += ((g.input.inside ? (g.input.x - 0.5) * 2 : 0) - sx) * 0.06; sy += ((g.input.inside ? (g.input.y - 0.5) * 2 : 0) - sy) * 0.06;
        return { ...pal, u_m: m, u_k: k, u_th: th, u_z: t * speed, u_roll: Math.sin(t * roll * 3) * 0.6 + t * roll, u_wide: wide, u_rule: rule, u_sx: sx, u_sy: sy };
      };
    },
  });

  P.add({
    name: 'Gyroid', seed: 3, fam: 'Projections', type: 'gl', n: 220,
    recipe: 'A tunnel bored straight through the gyroid, the surface that divides space into two tangled halves without ever crossing itself.',
    frag: `uniform float u_scale, u_thick, u_z, u_roll, u_bands, u_kind;
      float field(vec3 p){ return u_kind < 0.5 ? dot(sin(p), cos(p.yzx)) : u_kind < 1.5 ? cos(p.x) + cos(p.y) + cos(p.z) : sin(p.x) * sin(p.y) * sin(p.z) + sin(p.x) * cos(p.y) * cos(p.z) + cos(p.x) * sin(p.y) * cos(p.z) + cos(p.x) * cos(p.y) * sin(p.z); }
      float map(vec3 p){ float gy = (abs(field(p * u_scale)) - u_thick) / u_scale * 0.6; return max(gy, 0.5 - length(p.xy)); }
      void main(){
        vec2 uv = v_uv * 2.0 - 1.0;
        float cr = cos(u_roll), sr = sin(u_roll);
        vec3 rd = normalize(vec3(uv.x * cr - uv.y * sr, uv.x * sr + uv.y * cr, 1.1)), ro = vec3(0.0, 0.0, u_z);
        float t = 0.05, hit = 0.0;
        for (int i = 0; i < 72; i++) { float dd = map(ro + rd * t); if (dd < 0.0015 * t) { hit = 1.0; break; } t += dd; if (t > 14.0) break; }
        vec3 col = vec3(0.0);
        if (hit > 0.5) {
          vec3 p = ro + rd * t; vec2 e = vec2(0.003, 0.0);
          vec3 n = normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
          float lit = 0.35 + 0.65 * clamp(dot(n, normalize(vec3(0.4, 0.7, -0.6))), 0.0, 1.0);
          col = palStep(field(p * u_scale) * 0.5 + p.z * u_bands) * lit * exp(-t * 0.2);
        }
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const sc = U.scheme(R), pal = U.glPalette(sc), scale = R.range(2.4, 4.4), thick = R.range(0.08, 0.3), speed = R.range(0.25, 0.5), roll = R.range(0.03, 0.08) * R.sign(), bands = R.range(0.08, 0.3), kind = R.pick([0, 0, 1, 2]);
      return t => ({ ...pal, u_scale: scale, u_thick: thick, u_z: t * speed, u_roll: t * roll, u_bands: bands, u_kind: kind });
    },
  });

  P.add({
    interactive: 'Move the pointer to turn the solid yourself.',
    name: 'Polytope', fam: 'Projections', type: 'vec',
    recipe: 'A regular solid from four dimensions, turning in two planes at once; what you see is its shadow, drawn as a wire frame. Some rolls draw it in pixels instead, as a glowing frame or a constellation of its corners.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.5), kind = R.pick(['600', '600', '24', '24', '8', '16']), V = [], PHI = (1 + Math.sqrt(5)) / 2;
        const signs = (base, fn) => { const nz = base.map((v, i) => (v ? i : -1)).filter(i => i >= 0); for (let m = 0; m < 1 << nz.length; m++) { const v = base.slice(); nz.forEach((i, b) => { if ((m >> b) & 1) v[i] = -v[i]; }); fn(v); } };
        if (kind === '8') signs([1, 1, 1, 1], v => V.push(v));
        else if (kind === '16') for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { const v = [0, 0, 0, 0]; v[i] = s; V.push(v); }
        else if (kind === '24') { for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const b = [0, 0, 0, 0]; b[i] = 1; b[j] = 1; signs(b, v => V.push(v)); } }
        else {
          signs([1, 1, 1, 1], v => V.push(v));
          for (let i = 0; i < 4; i++) for (const s of [-2, 2]) { const v = [0, 0, 0, 0]; v[i] = s; V.push(v); }
          const even = [[0, 1, 2, 3], [0, 2, 3, 1], [0, 3, 1, 2], [1, 0, 3, 2], [1, 2, 0, 3], [1, 3, 2, 0], [2, 0, 1, 3], [2, 1, 3, 0], [2, 3, 0, 1], [3, 0, 2, 1], [3, 1, 0, 2], [3, 2, 1, 0]], vals = [PHI, 1, 1 / PHI, 0];
          for (const p of even) { const b = [0, 0, 0, 0]; p.forEach((slot, i) => { b[slot] = vals[i]; }); signs(b, v => V.push(v)); }
        }
        const rad = Math.hypot(...V[0]);
        V.forEach(v => { for (let i = 0; i < 4; i++) v[i] /= rad; });
        let best = 9;
        for (let i = 1; i < V.length; i++) best = Math.min(best, Math.hypot(V[0][0] - V[i][0], V[0][1] - V[i][1], V[0][2] - V[i][2], V[0][3] - V[i][3]));
        const E = [];
        for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) if (Math.abs(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2], V[i][3] - V[j][3]) - best) < 1e-3) E.push(i, j);
        const wa = R.range(0.08, 0.16), wb = R.range(0.05, 0.12), wc = R.range(0.03, 0.07), px = new Float32Array(V.length), py = new Float32Array(V.length), pw = new Float32Array(V.length);
        let ua = 0, ub = 0;   // the pointer turns it
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Solid', { 600: '600-cell', 24: '24-cell', 8: 'Tesseract', 16: '16-cell' }[kind]); g.trait('Look', 'Wire');
        return t => {
          ua += ((g.input.inside ? (g.input.x - 0.5) * 3 : 0) - ua) * 0.08; ub += ((g.input.inside ? (g.input.y - 0.5) * 2 : 0) - ub) * 0.08;
          if (Math.abs(ua) < 1e-6) ua = 0; if (Math.abs(ub) < 1e-6) ub = 0;
          const ca = Math.cos(t * wa + ua), sa = Math.sin(t * wa + ua), cb = Math.cos(t * wb + ub), sb = Math.sin(t * wb + ub), cc = Math.cos(t * wc), sc2 = Math.sin(t * wc);
          for (let i = 0; i < V.length; i++) {
            let [x, y, z, w] = V[i];
            let tx = x * ca - w * sa; w = x * sa + w * ca; x = tx;
            tx = y * cb - z * sb; z = y * sb + z * cb; y = tx;
            tx = x * cc - z * sc2; z = x * sc2 + z * cc; x = tx;
            const k4 = 1 / (2.1 - w), k3 = 1 / (3.4 - z * k4);
            px[i] = 500 + x * k4 * k3 * 2500; py[i] = 500 + y * k4 * k3 * 2500; pw[i] = w;
          }
          sh.paint();
          for (let pass = 0; pass < 2; pass++) {
            ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, pass * 0.4 + t * 0.01, true), pass ? 0.95 : 0.4);
            ctx.lineWidth = g.lw(pass ? (kind === '600' ? 1.5 : 2.6) : 1);
            ctx.beginPath();
            for (let e = 0; e < E.length; e += 2) { const a = E[e], b = E[e + 1]; if ((pw[a] + pw[b] > 0) === !!pass) { ctx.moveTo(px[a], py[a]); ctx.lineTo(px[b], py[b]); } }
            ctx.stroke();
          }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100, 100]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.5), kind = R.pick(['600', '600', '24', '24', '8', '16']), V = [], PHI = (1 + Math.sqrt(5)) / 2;
        const signs = (base, fn) => { const nz = base.map((v, i) => (v ? i : -1)).filter(i => i >= 0); for (let m = 0; m < 1 << nz.length; m++) { const v = base.slice(); nz.forEach((i, b) => { if ((m >> b) & 1) v[i] = -v[i]; }); fn(v); } };
        if (kind === '8') signs([1, 1, 1, 1], v => V.push(v));
        else if (kind === '16') for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { const v = [0, 0, 0, 0]; v[i] = s; V.push(v); }
        else if (kind === '24') { for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const b = [0, 0, 0, 0]; b[i] = 1; b[j] = 1; signs(b, v => V.push(v)); } }
        else {
          signs([1, 1, 1, 1], v => V.push(v));
          for (let i = 0; i < 4; i++) for (const s of [-2, 2]) { const v = [0, 0, 0, 0]; v[i] = s; V.push(v); }
          const even = [[0, 1, 2, 3], [0, 2, 3, 1], [0, 3, 1, 2], [1, 0, 3, 2], [1, 2, 0, 3], [1, 3, 2, 0], [2, 0, 1, 3], [2, 1, 3, 0], [2, 3, 0, 1], [3, 0, 2, 1], [3, 1, 0, 2], [3, 2, 1, 0]], vals = [PHI, 1, 1 / PHI, 0];
          for (const p of even) { const b = [0, 0, 0, 0]; p.forEach((slot, i) => { b[slot] = vals[i]; }); signs(b, v => V.push(v)); }
        }
        const rad = Math.hypot(...V[0]);
        V.forEach(v => { for (let i = 0; i < 4; i++) v[i] /= rad; });
        let best = 9;
        for (let i = 1; i < V.length; i++) best = Math.min(best, Math.hypot(V[0][0] - V[i][0], V[0][1] - V[i][1], V[0][2] - V[i][2], V[0][3] - V[i][3]));
        const E = [];
        for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) if (Math.abs(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2], V[i][3] - V[j][3]) - best) < 1e-3) E.push(i, j);
        const wa = R.range(0.08, 0.16), wb = R.range(0.05, 0.12), wc = R.range(0.03, 0.07), px = new Float32Array(V.length), py = new Float32Array(V.length), pw = new Float32Array(V.length);
        const look = R.pick(['wire', 'wire', 'glow', 'stars']), cols = Array.from({ length: 16 }, (_, i) => U.pk(U.ramp(sc.cols, i / 16, true)));
        const ground = R.bool(0.75) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.88)), zoomK = (kind === '600' ? 1.15 : 1) * n / 1000 * 2500 * R.range(0.9, 1.1);
        let ua = 0, ub = 0;
        g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Solid', { 600: '600-cell', 24: '24-cell', 8: 'Tesseract', 16: '16-cell' }[kind]); g.trait('Look', { wire: 'Pixel wire', glow: 'Glow', stars: 'Stars' }[look]); g.trait('Grid', n);
        return t => {
          ua += ((g.input.inside ? (g.input.x - 0.5) * 4 : 0) - ua) * 0.08; ub += ((g.input.inside ? (g.input.y - 0.5) * 4 : 0) - ub) * 0.08;
          const A = t * wa + ua, B = t * wb + ub, ca = Math.cos(A), sa = Math.sin(A), cb = Math.cos(B), sb = Math.sin(B), cc = Math.cos(t * wc), sc2 = Math.sin(t * wc);
          for (let i = 0; i < V.length; i++) {
            let [x, y, z, w] = V[i];
            let tx = x * ca - w * sa; w = x * sa + w * ca; x = tx;
            tx = y * cb - z * sb; z = y * sb + z * cb; y = tx;
            tx = x * cc - z * sc2; z = x * sc2 + z * cc; x = tx;
            const k4 = 1 / (2.1 - w), k3 = 1 / (3.4 - z * k4);
            px[i] = n / 2 + x * k4 * k3 * zoomK; py[i] = n / 2 + y * k4 * k3 * zoomK; pw[i] = w;
          }
          d.fill(ground);
          for (let pass = 0; pass < 2; pass++) for (let e = 0; e < E.length; e += 2) {
            const a = E[e], b = E[e + 1], front = pw[a] + pw[b] > 0;
            if (front !== !!pass) continue;
            const c = cols[((pw[a] + pw[b] + 2) * 3.5 + t * 0.4) & 15];
            if (look === 'stars') { if (!pass) continue; X.line(g, px[a], py[a], px[b], py[b], X.shade(c, 0.35)); continue; }
            X.line(g, px[a], py[a], px[b], py[b], pass ? c : X.shade(c, 0.4));
            if (look === 'glow' && pass) X.line(g, px[a] + 1, py[a], px[b] + 1, py[b], c);
          }
          if (look !== 'wire') for (let i = 0; i < V.length; i++) { const s = pw[i] > 0.3 ? 2 : 1; X.rect(g, px[i] - (s >> 1), py[i] - (s >> 1), s, s, look === 'stars' ? WHITE : cols[(i * 3) & 15]); }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Knot', seed: 1, fam: 'Projections', type: 'vec',
    recipe: 'A torus knot built like the BLU3PRINTS strands, two rails joined by rungs, turning slowly so its crossings trade places.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.6), [p, q] = R.pick([[2, 3], [3, 2], [2, 5], [3, 4], [3, 5], [4, 3], [5, 2], [2, 7]]), SEG = 420, width = R.range(0.07, 0.13), tube = R.range(0.32, 0.46), wx = R.range(0.1, 0.2), wy = R.range(0.07, 0.15), rungEvery = R.pick([2, 3, 4]);
      const A = new Float32Array((SEG + 1) * 3), B = new Float32Array((SEG + 1) * 3);
      const at = s => { const r = 1 + tube * Math.cos(q * s); return [r * Math.cos(p * s), r * Math.sin(p * s), tube * Math.sin(q * s)]; };
      return t => {
        const cx = Math.cos(t * wx), sx = Math.sin(t * wx), cy = Math.cos(t * wy), sy = Math.sin(t * wy);
        const proj = (v, out, k) => {
          let [x, y, z] = v;
          let ty = y * cx - z * sx; z = y * sx + z * cx; y = ty;
          const tx = x * cy + z * sy; z = -x * sy + z * cy; x = tx;
          const f = 1 / (4.2 - z);
          out[k * 3] = 500 + x * f * 1320; out[k * 3 + 1] = 500 + y * f * 1320; out[k * 3 + 2] = z;
        };
        for (let k = 0; k <= SEG; k++) {
          const s = k / SEG * U.TAU, c = at(s), n = at(s + 0.003), tx = n[0] - c[0], ty = n[1] - c[1], tz = n[2] - c[2];
          // offset across the strand: tangent crossed with the direction out from the torus's core circle
          const ox = c[0] - Math.cos(p * s), oy = c[1] - Math.sin(p * s), oz = c[2];
          let bx = ty * oz - tz * oy, by = tz * ox - tx * oz, bz = tx * oy - ty * ox;
          const m = width / (Math.hypot(bx, by, bz) || 1); bx *= m; by *= m; bz *= m;
          proj([c[0] + bx, c[1] + by, c[2] + bz], A, k); proj([c[0] - bx, c[1] - by, c[2] - bz], B, k);
        }
        sh.paint();
        for (let pass = 0; pass < 2; pass++) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, pass * 0.3 + t * 0.01, true), pass ? 1 : 0.35);
          ctx.lineWidth = g.lw(pass ? 2.3 : 1.1);
          ctx.beginPath();
          for (let k = 0; k < SEG; k++) {
            if ((A[k * 3 + 2] > 0) !== !!pass) continue;
            ctx.moveTo(A[k * 3], A[k * 3 + 1]); ctx.lineTo(A[k * 3 + 3], A[k * 3 + 4]);
            ctx.moveTo(B[k * 3], B[k * 3 + 1]); ctx.lineTo(B[k * 3 + 3], B[k * 3 + 4]);
            if (k % rungEvery === 0) { ctx.moveTo(A[k * 3], A[k * 3 + 1]); ctx.lineTo(B[k * 3], B[k * 3 + 1]); }
          }
          ctx.stroke();
        }
      };
    },
  });

  P.add({
    name: 'Attractor', seed: 2, fam: 'Projections', type: 'vec',
    recipe: 'Three points following the same three equations from almost the same start. Their paths never repeat and never leave the shape.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.5);
      const SYS = {
        thomas: { f: (x, y, z) => [Math.sin(y) - 0.208 * x, Math.sin(z) - 0.208 * y, Math.sin(x) - 0.208 * z], h: 0.07, k: 105, c: [0, 0, 0], s: [1, 0.5, 2] },
        aizawa: { f: (x, y, z) => [(z - 0.7) * x - 3.5 * y, 3.5 * x + (z - 0.7) * y, 0.6 + 0.95 * z - z * z * z / 3 - (x * x + y * y) * (1 + 0.25 * z) + 0.1 * z * x * x * x], h: 0.011, k: 255, c: [0, 0, 0.6], s: [0.1, 0, 0.1] },
        halvorsen: { f: (x, y, z) => [-1.89 * x - 4 * y - 4 * z - y * y, -1.89 * y - 4 * z - 4 * x - z * z, -1.89 * z - 4 * x - 4 * y - x * x], h: 0.005, k: 36, c: [-2, -2, -2], s: [-1.5, 0.3, 0.2] },
        lorenz: { f: (x, y, z) => [10 * (y - x), x * (28 - z) - y, x * y - 8 / 3 * z], h: 0.006, k: 15, c: [0, 0, 25], s: [1, 1, 20] },
        dadras: { f: (x, y, z) => [y - 3 * x + 2.7 * y * z, 1.7 * y - x * z + z, 2 * x * y - 9 * z], h: 0.008, k: 42, c: [0, 0, 0], s: [1.1, 2.1, -2] },
      };
      const sys = SYS[R.pick(Object.keys(SYS))], TAIL = 2600, trails = [0, 1, 2].map(i => ({ p: [sys.s[0] + i * 0.03, sys.s[1], sys.s[2]], buf: new Float32Array(TAIL * 3), head: 0, col: i }));
      const wy = R.range(0.06, 0.12) * R.sign(), tilt = R.range(0.2, 0.9), GROUPS = 8;
      const step = tr => {
        const [x, y, z] = tr.p, a = sys.f(x, y, z), b = sys.f(x + a[0] * sys.h / 2, y + a[1] * sys.h / 2, z + a[2] * sys.h / 2);
        tr.p = [x + b[0] * sys.h, y + b[1] * sys.h, z + b[2] * sys.h];
        tr.buf.set(tr.p, tr.head * 3); tr.head = (tr.head + 1) % TAIL;
      };
      for (const tr of trails) for (let k = 0; k < TAIL + 300; k++) step(tr);
      return (t, dt) => {
        const adds = Math.max(4, Math.round(dt * 240)), ca = Math.cos(t * wy), sa = Math.sin(t * wy), ct = Math.cos(tilt), st = Math.sin(tilt);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        ctx.lineWidth = g.lw(2);
        for (const tr of trails) {
          for (let k = 0; k < adds; k++) step(tr);
          const base = U.ramp(sc.cols, tr.col / 3 + t * 0.008, true);
          for (let q = 0; q < GROUPS; q++) {
            ctx.strokeStyle = U.css(base, 0.15 + 0.85 * (q + 1) / GROUPS);
            ctx.beginPath();
            const from = Math.floor(q * (TAIL - 1) / GROUPS), to = Math.floor((q + 1) * (TAIL - 1) / GROUPS);
            for (let k = from; k <= to; k++) {
              const i = ((tr.head + k) % TAIL) * 3, x = tr.buf[i] - sys.c[0], y = tr.buf[i + 1] - sys.c[1], z = tr.buf[i + 2] - sys.c[2];
              const rx = x * ca + y * sa, ry = -x * sa + y * ca, sy = ry * st - z * ct;
              if (k === from) ctx.moveTo(500 + rx * sys.k, 500 + sy * sys.k); else ctx.lineTo(500 + rx * sys.k, 500 + sy * sys.k);
            }
            ctx.stroke();
          }
        }
      };
    },
  });

  P.add({
    name: 'Hopf', seed: 4, fam: 'Projections', type: 'vec',
    recipe: 'Every point of an ordinary sphere becomes a whole circle in four dimensions. Projected down, the circles nest as linked rings.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.35), rings = R.pick([[0.55, 1.05, 1.55], [0.7, 1.3], [0.45, 0.85, 1.25, 1.65], [0.9, 1.5]]), per = R.int(14, 24), PTS = 44, wa = R.range(0.1, 0.22), wb = R.range(0.15, 0.3), wv = R.range(0.07, 0.14), tip = R.range(0.5, 1.1);
      const fibres = [];
      rings.forEach((th, r) => { for (let k = 0; k < per; k++) fibres.push({ th, ph: k / per * U.TAU, c: k / per, r }); });
      return t => {
        const cv = Math.cos(t * wv), sv = Math.sin(t * wv), ct = Math.cos(tip), st = Math.sin(tip);
        sh.paint();
        ctx.lineWidth = g.lw(1.5);
        for (const f of fibres) {
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, f.c + f.r * 0.13, true), 0.9);
          ctx.beginPath();
          let pen = false;
          for (let k = 0; k <= PTS; k++) {
            const s = k / PTS * U.TAU, th = f.th + 0.22 * Math.sin(t * wb + f.r * 1.7), c = Math.cos(th / 2), n = Math.sin(th / 2), ph = f.ph + t * wa * (f.r % 2 ? -1 : 1) * (0.5 + f.r * 0.3);
            const x1 = c * Math.cos(s + ph), y1 = c * Math.sin(s + ph), x2 = n * Math.cos(s), y2 = n * Math.sin(s);
            const den = 1 - y2;
            if (den < 0.07) { pen = false; continue; }
            const X = x1 / den, Y = y1 / den, Z = x2 / den, rx = X * cv + Y * sv, ry = -X * sv + Y * cv, px = 500 + rx * 190, py = 500 + (ry * ct + Z * st) * 190;
            if (Math.abs(px - 500) > 2000 || Math.abs(py - 500) > 2000) { pen = false; continue; }
            if (pen) ctx.lineTo(px, py); else ctx.moveTo(px, py);
            pen = true;
          }
          ctx.stroke();
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer to turn the crystal and hunt for the angles where it lines up.',
    name: 'Zone Axis', seed: 3, fam: 'Projections', type: 'vec',
    recipe: 'A crystal of points turning in space. Most of the time it is a cloud; now and then the rows line up with your eye and it snaps into a grid. Some rolls build it from pixel blocks instead, in more kinds of lattice.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sc = U.scheme(R, 0.5), kind = R.pick(['cubic', 'cubic', 'fcc', 'bcc', 'diamond']), H = kind === 'cubic' ? 3 : 2, pts = [];
        const basis = kind === 'cubic' ? [[0, 0, 0]] : kind === 'bcc' ? [[0, 0, 0], [0.5, 0.5, 0.5]] : kind === 'fcc' ? [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]] : [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5], [0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]];
        for (let i = -H; i <= H; i++) for (let j = -H; j <= H; j++) for (let k = -H; k <= H; k++) basis.forEach((b, bi) => { const p = [i + b[0], j + b[1], k + b[2]]; if (Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])) <= H + 0.01) pts.push({ p, c: kind === 'cubic' ? (k + H) % 7 : bi }); });
        const groups = kind === 'cubic' ? 7 : basis.length, scale = 330 / H, wa = R.range(0.05, 0.09), wb = R.range(0.03, 0.06), swing = R.range(0.4, 0.9), size = R.range(13, 19) * (kind === 'cubic' ? 1 : 0.75);
        let ua = 0, ub = 0;   // the pointer turns the crystal
        g.trait('Palette', palName(sc)); g.trait('Lattice', { cubic: 'Cubic', fcc: 'Face-centred', bcc: 'Body-centred', diamond: 'Diamond', hex: 'Hexagonal' }[kind]); g.trait('Atoms', pts.length); g.trait('Look', 'Squares'); g.trait('Habit', 'Cube');
        return t => {
          ua += ((g.input.inside ? (g.input.x - 0.5) * 3 : 0) - ua) * 0.08; ub += ((g.input.inside ? (g.input.y - 0.5) * 2 : 0) - ub) * 0.08;
          if (Math.abs(ua) < 1e-6) ua = 0; if (Math.abs(ub) < 1e-6) ub = 0;
          const a = t * wa + ua, b = swing * Math.sin(t * wb) + ub, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
          for (let q = 0; q < groups; q++) {
            ctx.fillStyle = U.css(U.ramp(sc.cols, q / groups, true), 0.85);
            ctx.beginPath();
            for (const pt of pts) {
              if (pt.c !== q) continue;
              const [x, y, z] = pt.p, rx = x * ca + z * sa, rz = -x * sa + z * ca, ry = y * cb - rz * sb, depth = y * sb + rz * cb, s = Math.max(g.px * 0.9, size * (1 + depth / (H * 3)));
              ctx.rect(500 + rx * scale * 0.86 - s / 2, 500 + ry * scale * 0.86 - s / 2, s, s);
            }
            ctx.fill();
          }
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([80, 100, 100]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.5), kind = R.pick(['cubic', 'cubic', 'fcc', 'bcc', 'diamond', 'hex']), H = kind === 'cubic' ? 4 : 3, pts = [];
        const basis = kind === 'cubic' ? [[0, 0, 0]] : kind === 'bcc' ? [[0, 0, 0], [0.5, 0.5, 0.5]] : kind === 'fcc' ? [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]] : kind === 'hex' ? [[0, 0, 0], [0.5, 0, 0.5]] : [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5], [0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]];
        // the crystal's habit (some rolls): cut as a cube, a ball or an octahedron
        const habit = g.alt.pick(['cube', 'cube', 'ball', 'octahedron']);
        const within = p => habit === 'ball' ? Math.hypot(p[0], p[1], p[2]) <= H * 1.12 : habit === 'octahedron' ? Math.abs(p[0]) + Math.abs(p[1]) + Math.abs(p[2]) <= H * 1.7 : Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])) <= H + 0.01;
        for (let i = -H - 1; i <= H + 1; i++) for (let j = -H - 1; j <= H + 1; j++) for (let k = -H - 1; k <= H + 1; k++) basis.forEach((b, bi) => {
          let p = [i + b[0], j + b[1], k + b[2]];
          if (kind === 'hex') p = [p[0] + p[1] * 0.5, p[1] * 0.866, p[2]];
          if (within(p) && Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])) <= H + 0.01) pts.push({ p, c: kind === 'cubic' ? ((k % 7) + 7 + H) % 7 : bi });
        });
        const groups = kind === 'cubic' ? 7 : basis.length, scale = n * 0.37 / H, wa = R.range(0.05, 0.09), wb = R.range(0.03, 0.06), swing = R.range(0.4, 0.9), size = R.pick([1.6, 2.2, 3]) * n / 100 * (kind === 'diamond' || kind === 'fcc' ? 0.75 : 1);
        const cols = Array.from({ length: groups }, (_, q) => U.pk(U.ramp(sc.cols, q / groups, true))), ground = R.bool(0.7) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.9));
        const proj = pts.map(() => [0, 0, 0]);
        let ua = 0, ub = 0;
        g.trait('Palette', palName(sc)); g.trait('Lattice', { cubic: 'Cubic', fcc: 'Face-centred', bcc: 'Body-centred', diamond: 'Diamond', hex: 'Hexagonal' }[kind]); g.trait('Atoms', pts.length); g.trait('Look', ground === BLACK ? 'Pixel blocks' : 'Pixel blocks, tinted'); g.trait('Habit', { cube: 'Cube', ball: 'Ball', octahedron: 'Octahedron' }[habit]); g.trait('Grid', n);
        return t => {
          ua += ((g.input.inside ? (g.input.x - 0.5) * 3 : 0) - ua) * 0.08; ub += ((g.input.inside ? (g.input.y - 0.5) * 2 : 0) - ub) * 0.08;
          const a = t * wa + ua, b = swing * Math.sin(t * wb) + ub, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
          pts.forEach((pt, i) => { const [x, y, z] = pt.p, rx = x * ca + z * sa, rz = -x * sa + z * ca, ry = y * cb - rz * sb, depth = y * sb + rz * cb; proj[i][0] = rx; proj[i][1] = ry; proj[i][2] = depth; });
          const order = pts.map((_, i) => i).sort((p, q) => proj[p][2] - proj[q][2]);
          d.fill(ground);
          for (const i of order) {
            const [rx, ry, depth] = proj[i], s = Math.max(1, Math.round(size * (1 + depth / (H * 3))));
            X.rect(g, Math.round(n / 2 + rx * scale - s / 2), Math.round(n / 2 + ry * scale - s / 2), s, s, depth > 0 ? cols[pts[i].c] : X.shade(cols[pts[i].c], 0.55 + depth / (H * 4)));
          }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Drape', fam: 'Projections', type: 'vec',
    recipe: 'A square of cloth hung from a few wandering pins and left to the wind, drawn as its warp and weft threads.',
    make(R, U, g) {
      const { ctx } = g, sh = U.sheet(R, g, 0.6), noise = U.noise(R), N = 24, REST = 30, M = N * N;
      const x = new Float32Array(M), y = new Float32Array(M), z = new Float32Array(M), ox = new Float32Array(M), oy = new Float32Array(M), oz = new Float32Array(M);
      for (let j = 0, i = 0; j < N; j++) for (let k = 0; k < N; k++, i++) { x[i] = ox[i] = (k - (N - 1) / 2) * REST; y[i] = oy[i] = j * REST * 0.6; z[i] = oz[i] = j * 6 + R.range(-1, 1); }
      const pinSet = R.pick([[0, N - 1], [0, (N - 1) >> 1, N - 1], [0, 7, 15, N - 1], [4, N - 5]]), pins = pinSet.map(k => ({ k, w: R.range(0.15, 0.4), ph: R.range(0, 6), amp: R.range(20, 70) }));
      const gust = R.range(0.3, 0.7), tilt = R.range(0.15, 0.4), turn = R.range(-0.5, 0.5), both = R.bool(0.75);
      let clock = 0;
      const sim = () => {
        clock += 1 / 24;
        for (let i = 0; i < M; i++) {
          const wx = noise.n3(x[i] * 0.004, y[i] * 0.004, clock * 0.4) * gust, wz = noise.n3(x[i] * 0.004 + 9, y[i] * 0.004, clock * 0.5) * gust * 1.6;
          const nx = x[i] + (x[i] - ox[i]) * 0.985 + wx, ny = y[i] + (y[i] - oy[i]) * 0.985 + 0.55, nz = z[i] + (z[i] - oz[i]) * 0.985 + wz;
          ox[i] = x[i]; oy[i] = y[i]; oz[i] = z[i]; x[i] = nx; y[i] = ny; z[i] = nz;
        }
        for (let it = 0; it < 5; it++) {
          for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
            const i = j * N + k;
            for (const o of [k < N - 1 ? i + 1 : -1, j < N - 1 ? i + N : -1]) {
              if (o < 0) continue;
              const dx = x[o] - x[i], dy = y[o] - y[i], dz = z[o] - z[i], dist = Math.hypot(dx, dy, dz) || 1, f = (dist - REST) / dist * 0.5;
              x[i] += dx * f; y[i] += dy * f; z[i] += dz * f; x[o] -= dx * f; y[o] -= dy * f; z[o] -= dz * f;
            }
          }
          for (const p of pins) { x[p.k] = (p.k - (N - 1) / 2) * REST * 0.82 + p.amp * Math.sin(clock * p.w + p.ph); y[p.k] = 0; z[p.k] = p.amp * 0.6 * Math.cos(clock * p.w * 1.3 + p.ph); }
        }
      };
      for (let k = 0; k < 260; k++) sim();
      const ct = Math.cos(turn), st = Math.sin(turn);
      const sxp = i => 500 + (x[i] * ct + z[i] * st) * 1.02, syp = i => 150 + y[i] * 1.02 + (-x[i] * st + z[i] * ct) * tilt;
      return (t, dt) => {
        for (let k = Math.max(1, Math.round(dt * 24)); k > 0; k--) sim();
        sh.paint();
        ctx.strokeStyle = U.css(sh.paper ? sh.ink : U.ramp(sh.cols, t * 0.01, true), 0.95); ctx.lineWidth = g.lw(1.3);
        ctx.beginPath();
        for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) { const i = j * N + k; if (k) ctx.lineTo(sxp(i), syp(i)); else ctx.moveTo(sxp(i), syp(i)); }
        if (both) for (let k = 0; k < N; k++) for (let j = 0; j < N; j++) { const i = j * N + k; if (j) ctx.lineTo(sxp(i), syp(i)); else ctx.moveTo(sxp(i), syp(i)); }
        ctx.stroke();
      };
    },
  });
})();
