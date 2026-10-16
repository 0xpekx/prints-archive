// Feedback and fields: images that are a function of every point at once.
(function () {
  'use strict';
  const P = window.Proto, BLACK = 0xff000000;
  // Trait names (the variation chips in the large view)
  const palName = sc => (sc.native ? 'Spectrum' : sc.name);
  // The pointer in the large view as an eased offset from the middle (-0.5..0.5), back to zero when it leaves.
  function easedPointer(g, ease = 0.08) {
    const o = { x: 0, y: 0 };
    o.update = () => { o.x += ((g.input.inside ? g.input.x - 0.5 : 0) - o.x) * ease; o.y += ((g.input.inside ? g.input.y - 0.5 : 0) - o.y) * ease; return o; };
    return o;
  }
  // The pointer blended over a piece's own motion: w eases to 1 while the pointer is in and back to 0 a couple of
  // seconds after it leaves, so nothing jumps when a hand comes and goes (and with no pointer the piece runs exactly as before).
  function hand(g) {
    const h = { w: 0, x: 0.5, y: 0.5, idle: 99 };
    h.update = dt => { const p = g.input; if (p.inside) { h.idle = 0; h.x = p.x; h.y = p.y; h.w += (1 - h.w) * 0.12; } else if ((h.idle += dt || 1 / 12) > 2) { h.w *= 0.93; if (h.w < 0.002) h.w = 0; } return h; };
    h.mix = (own, theirs) => h.w ? own + (theirs - own) * h.w : own;
    return h;
  }
  const CPLX = `vec2 cmul(vec2 a, vec2 b){ return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x); }
      vec2 cdiv(vec2 a, vec2 b){ return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / max(dot(b, b), 1e-12); }`;

  P.add({
    interactive: 'Move the pointer to move the vanishing point.',
    listens: 'Clap and the picture drops one frame deeper into its own past.',
    name: 'Echo Chamber', fam: 'Fields', type: 'px', n: 110,
    recipe: 'The Echo frame taken all the way down: each frame inward shows the original modulo field one moment earlier, so the picture falls into its own past. Square or round frames, turning or not, folded into a kaleidoscope on some seeds.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), c = n / 2, s = R.range(0.74, 0.86), th = R.pick([0, 0, 0.05, 0.1, -0.08, 0.2]), CELLS = R.pick([28, 40, 40, 56]), round = R.bool(0.25);
        const a = R.range(0.02, 0.06), yd = R.range(8, 13), y0 = R.int(200, 400), b = 100 * yd / (800 + y0) * R.range(1.05, 1.35), fs = R.range(3, 24), spd = R.range(2.5, 6), drift = R.range(2, 5), rate = R.range(0.5, 0.9);
        const size = (u, v) => (round ? Math.hypot(u, v) : Math.max(Math.abs(u), Math.abs(v)));
        const snap = v => (Math.floor((Math.min(c - 0.01, Math.max(-c, v)) + c) / n * CELLS) + 1) * 800 / CELLS;
        let ox = c, oy = c;   // the pointer moves the vanishing point
        const jump = { v: 0, to: 0 };   // Listen: every clap drops the picture one frame deeper
        g.trait('Palette', palName(sc)); g.trait('Frames', round ? 'Round' : 'Square'); g.trait('Turn', th ? 'Turning' : 'Straight'); g.trait('Cells', CELLS); g.trait('Fold', 'None');
        return t => {
          if (g.input.listening) jump.to += g.input.beats();
          jump.v += (jump.to - jump.v) * 0.2;
          ox += ((g.input.inside ? g.input.x * n : c) - ox) * 0.08; oy += ((g.input.inside ? g.input.y * n : c) - oy) * 0.08;
          if (Math.abs(ox - c) < 1e-6) ox = c; if (Math.abs(oy - c) < 1e-6) oy = c;
          const tr = t * rate + jump.v, whole = Math.floor(tr), ph = tr - whole, grow = Math.pow(s, -ph), c0 = Math.cos(-th * ph), s0 = Math.sin(-th * ph), ct = Math.cos(-th), st = Math.sin(-th), hd = t * drift;
          for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
            // slide the whole picture inward by the fraction of a step already taken, then count frames in from the edge
            let u = ((x + 0.5 - ox) * c0 - (y + 0.5 - oy) * s0) * grow, v = ((x + 0.5 - ox) * s0 + (y + 0.5 - oy) * c0) * grow, m = 0;
            if (size(u, v) >= c) { const tu = (u * ct + v * st) * s; v = (-u * st + v * ct) * s; u = tu; m = -1; }
            else while (size(u, v) < c * s && m < 60) { const tu = (u * ct - v * st) / s; v = (u * st + v * ct) / s; u = tu; m++; }
            const tt = fs + (whole - m) / spd, hue = ((tt * snap(u) * a) % ((snap(v) + y0) / yd)) * b;
            d[i] = hue > 95 || hue < 1 ? 0xff000000 : sc.lut[(hue * 2.56 - (whole - m) * 9 + hd) & 255];
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), c = n / 2, s = R.range(0.68, 0.88), th = R.pick([0, 0, 0.05, 0.1, -0.08, 0.2, 0.3]), CELLS = R.pick([20, 28, 40, 40, 56]), round = R.bool(0.25), fold = R.bool(0.25), ptr = easedPointer(g), shift = R.int(0, 255), lut = R.bool(0.35) ? U.scheme(R, 0).lut : sc.lut;
      const a = R.range(0.02, 0.06), yd = R.range(8, 13), y0 = R.int(200, 400), b = 100 * yd / (800 + y0) * R.range(1.05, 1.35), fs = R.range(3, 24), spd = R.range(2.5, 6), drift = R.range(2, 5), rate = R.range(0.4, 0.9);
      const size = (u, v) => (round ? Math.hypot(u, v) : Math.max(Math.abs(u), Math.abs(v)));
      const snap = v => (Math.floor((Math.min(c - 0.01, Math.max(-c, v)) + c) / n * CELLS) + 1) * 800 / CELLS;
      const jump = { v: 0, to: 0 };   // Listen: every clap drops the picture one frame deeper
      g.trait('Palette', palName(sc)); g.trait('Frames', round ? 'Round' : 'Square'); g.trait('Turn', th ? 'Turning' : 'Straight'); g.trait('Cells', CELLS); g.trait('Fold', fold ? 'Kaleidoscope' : 'None');
      return t => {
        if (g.input.listening) jump.to += g.input.beats();
        jump.v += (jump.to - jump.v) * 0.2;
        const tr = t * rate + jump.v, whole = Math.floor(tr), ph = tr - whole, grow = Math.pow(s, -ph), c0 = Math.cos(-th * ph), s0 = Math.sin(-th * ph), ct = Math.cos(-th), st = Math.sin(-th), hd = t * drift;
        const p = ptr.update(), ox = c + p.x * n * 0.8, oy = c + p.y * n * 0.8;
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          // slide the whole picture inward by the fraction of a step already taken, then count frames in from the edge
          let ax = x + 0.5 - ox, ay = y + 0.5 - oy;
          if (fold) { ax = Math.abs(ax); ay = Math.abs(ay); }
          let u = (ax * c0 - ay * s0) * grow, v = (ax * s0 + ay * c0) * grow, m = 0;
          if (size(u, v) >= c) { const tu = (u * ct + v * st) * s; v = (-u * st + v * ct) * s; u = tu; m = -1; }
          else while (size(u, v) < c * s && m < 60) { const tu = (u * ct - v * st) / s; v = (u * st + v * ct) / s; u = tu; m++; }
          const tt = fs + (whole - m) / spd, hue = ((tt * snap(u) * a) % ((snap(v) + y0) / yd)) * b;
          d[i] = hue > 95 || hue < 1 ? 0xff000000 : lut[(hue * 2.56 - (whole - m) * 9 + hd + shift) & 255];
        }
      };
    },
  });
  P.add({
    name: 'Marble', seed: 1, fam: 'Fields', type: 'gl', n: 240,
    interactive: 'Move the pointer to drift across the stone.',
    recipe: 'Noise bent by noise bent by noise, then cut into flat bands of colour with an inked line between each.',
    frag: `uniform float u_scale, u_warp, u_bands, u_speed, u_gap; uniform vec2 u_off;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * vn(p); p = p * 2.03 + vec2(17.0, 9.0); a *= 0.5; } return v; }
      void main(){
        vec2 p = (v_uv - 0.5) * u_scale + u_off; float t = u_t * u_speed;
        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
        vec2 r = vec2(fbm(p + u_warp * q + vec2(1.7, 9.2) + 0.5 * t), fbm(p + u_warp * q + vec2(8.3, 2.8) - 0.4 * t));
        float b = (fbm(p + u_warp * r) + 0.35 * length(q)) * u_bands, fr = fract(b);
        vec3 col = palStep(floor(b) * 0.137 + 0.02) * (0.72 + 0.28 * fr) * step(u_gap, fr);
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const og = g.home || g.alt() < 0.5;   // the original ranges, or wider ones
      const sch = U.scheme(R), pal = U.glPalette(sch), scale = og ? R.range(1.2, 2.6) : R.range(1, 3.2), warp = og ? R.range(2.5, 4.5) : R.range(1.5, 5), bands = og ? R.range(6, 12) : R.range(4, 14), speed = R.range(0.02, 0.045), gap = og ? R.range(0.1, 0.2) : R.pick([0, R.range(0.1, 0.2)]), off = [R.range(0, 50), R.range(0, 50)], ptr = easedPointer(g, 0.04), o2 = [0, 0];
      g.trait('Palette', palName(sch)); g.trait('Bands', Math.round(bands)); g.trait('Warp', warp > 3.5 ? 'Deep' : 'Gentle'); g.trait('Veins', gap === 0 ? 'None' : 'Inked'); g.trait('Grain', scale > 2.2 ? 'Fine' : 'Broad');
      return () => { const p = ptr.update(); o2[0] = off[0] + p.x * 3; o2[1] = off[1] + p.y * 3; return { ...pal, u_scale: scale, u_warp: warp, u_bands: bands, u_speed: speed, u_gap: gap, u_off: o2 }; };
    },
  });

  P.add({
    name: 'Phase Portrait', seed: 3, fam: 'Fields', type: 'gl', n: 240,
    interactive: 'Move the pointer to carry an extra zero round the plane.',
    recipe: 'A function of a complex number: hue is the direction of its value, the rings are the logarithm of its size, and its zeros and poles wander.',
    frag: CPLX + `uniform vec2 u_zero[4]; uniform vec2 u_pole[4]; uniform float u_nz, u_poles, u_bands, u_zoom, u_rays, u_pon; uniform vec2 u_ptr;
      void main(){
        vec2 z = (v_uv * 2.0 - 1.0) * u_zoom, f = vec2(1.0, 0.0);
        for (int i = 0; i < 4; i++) { if (float(i) < u_nz) f = cmul(f, z - u_zero[i]); if (float(i) < u_poles) f = cdiv(f, z - u_pole[i]); }
        if (u_pon > 0.0) f = cmul(f, mix(vec2(1.0, 0.0), z - u_ptr, u_pon));
        float arg = atan(f.y, f.x) / 6.2831853 + 0.5, band = fract(log(length(f) + 1e-9) * u_bands), ray = fract(arg * u_rays);
        vec3 col = pal(arg + u_t * 0.015) * (0.5 + 0.5 * band) * step(0.09, band);
        if (u_rays > 0.5) col *= step(0.06, ray);
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const sch = U.scheme(R, 0.6), pal = U.glPalette(sch), nz = R.int(2, 4), np = R.int(1, 3), bands = R.range(1.4, 3), zoom = R.range(1.6, 2.4), rays = R.pick([0, 0, 8, 12]);
      const orbit = () => ({ r: R.range(0.3, 1.4), w: R.range(0.05, 0.16) * R.sign(), ph: R.range(0, 6), e: R.range(0.5, 1) }), zs = Array.from({ length: 4 }, orbit), ps = Array.from({ length: 4 }, orbit);
      const za = new Float32Array(8), pa = new Float32Array(8), hnd = hand(g);   // the extra zero eases in and out with the pointer
      g.trait('Palette', palName(sch)); g.trait('Zeros', nz); g.trait('Poles', np); g.trait('Rays', rays || 'None'); g.trait('Rings', bands > 2.2 ? 'Close' : 'Wide');
      return t => {
        for (let i = 0; i < 4; i++) { za[i * 2] = zs[i].r * Math.cos(t * zs[i].w + zs[i].ph); za[i * 2 + 1] = zs[i].r * zs[i].e * Math.sin(t * zs[i].w + zs[i].ph); pa[i * 2] = ps[i].r * Math.cos(t * ps[i].w + ps[i].ph); pa[i * 2 + 1] = ps[i].r * ps[i].e * Math.sin(t * ps[i].w * 1.3 + ps[i].ph); }
        const ip = hnd.update(1 / 24);
        return { ...pal, u_zero: { a: za, n: 2 }, u_pole: { a: pa, n: 2 }, u_nz: nz, u_poles: np, u_bands: bands, u_zoom: zoom, u_rays: rays, u_pon: ip.w, u_ptr: [(ip.x * 2 - 1) * zoom, (1 - ip.y * 2) * zoom] };
      };
    },
  });

  P.add({
    name: 'Julia Drift', seed: 3, fam: 'Fields', type: 'gl', n: 240,
    recipe: 'Square a number, add a constant, repeat. Black is where it never escapes; the constant creeps along the edge of the Mandelbrot set.',
    frag: `uniform vec2 u_c; uniform float u_zoom, u_rot, u_bands, u_pow;
      void main(){
        vec2 z = (v_uv * 2.0 - 1.0) * u_zoom;
        z = vec2(z.x * cos(u_rot) - z.y * sin(u_rot), z.x * sin(u_rot) + z.y * cos(u_rot));
        float n = 0.0, m2 = 0.0;
        for (int i = 0; i < 110; i++) {
          if (u_pow < 2.5) z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + u_c;
          else z = vec2(z.x * z.x * z.x - 3.0 * z.x * z.y * z.y, 3.0 * z.x * z.x * z.y - z.y * z.y * z.y) + u_c;
          m2 = dot(z, z); if (m2 > 64.0) break; n += 1.0;
        }
        vec3 col = vec3(0.0);
        if (m2 > 64.0) { float sn = n + 1.0 - log(log(m2) * 0.5) / log(u_pow); col = pal(sn * u_bands + u_t * 0.01) * (0.6 + 0.4 * fract(sn * 0.5)) * step(0.12, fract(sn * 0.5)); }
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const pal = U.glPalette(U.scheme(R)), cubic = R.bool(0.2), w = R.range(0.035, 0.07) * R.sign(), ph = R.range(0, 6), zoom = R.range(1.25, 1.55), bands = R.range(0.02, 0.05), spin = R.range(0.01, 0.03) * R.sign(), wk = R.range(0.08, 0.15);
      return t => {
        const a = ph + t * w, k = 1.005 + 0.03 * Math.sin(t * wk);
        const c = cubic ? [0.55 * k * Math.cos(a), 0.55 * k * Math.sin(a)] : [(0.5 * Math.cos(a) - 0.25 * Math.cos(2 * a)) * k, (0.5 * Math.sin(a) - 0.25 * Math.sin(2 * a)) * k];
        return { ...pal, u_c: c, u_zoom: zoom, u_rot: t * spin, u_bands: bands, u_pow: cubic ? 3 : 2 };
      };
    },
  });

  P.add({
    interactive: 'Move the pointer left and right to spin the prisms faster or back.',
    name: 'Slit Scan', fam: 'Fields', type: 'px', n: 120,
    recipe: 'Turning prisms and ribbons filmed one line at a time, each line a moment later than the one above, so their rotation is recorded as a twist: one fat column or a row of thin ones, standing or lying down, over a striped ground.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), count = R.pick([1, 2, 2, 3]), sideways = R.bool(0.3);
        const cols = Array.from({ length: count }, (_, k) => ({ sides: R.pick([3, 4, 4, 5, 6]), cx: n * (k + 0.5) / count, r: n / count * R.range(0.3, 0.44), w: R.range(0.5, 1.1) * R.sign(), amp: R.range(1.5, 4), w2: R.range(0.25, 0.6), delay: R.range(0.012, 0.03), sway: R.range(0, 5), hue: R.range(0, 1) }));
        const faces = cols.map(c => Array.from({ length: c.sides }, (_, j) => U.ramp(sc.cols, c.hue + j / c.sides, true)));
        let extra = 0, lastT = 0, spin = 1;   // the pointer spins the prisms faster or back
        g.trait('Palette', palName(sc)); g.trait('Prisms', count); g.trait('Orientation', sideways ? 'Lying' : 'Standing'); g.trait('Ground', 'Black');
        return t => {
          spin += ((g.input.inside ? (g.input.x - 0.5) * 6 : 1) - spin) * 0.05; if (Math.abs(spin - 1) < 1e-6) spin = 1;
          extra += (spin - 1) * Math.min(0.1, t - lastT); lastT = t;
          d.fill(BLACK);
          for (let y = 0; y < n; y++) for (let k = 0; k < count; k++) {
            const c = cols[k], tau = t + extra - y * c.delay, a = tau * c.w + c.amp * Math.sin(tau * c.w2), cx = c.cx + c.sway * Math.sin(tau * 0.7 + k), step = U.TAU / c.sides, full = 2 * c.r * Math.sin(step / 2);
            for (let j = 0; j < c.sides; j++) {
              const x0 = cx + c.r * Math.cos(a + j * step), x1 = cx + c.r * Math.cos(a + (j + 1) * step);
              if (x1 <= x0) continue;
              const shade = 0.3 + 0.7 * (x1 - x0) / full, f = faces[k][j], col = U.pk([f[0] * shade, f[1] * shade, f[2] * shade]);
              for (let x = Math.max(0, Math.ceil(x0)); x < Math.min(n, x1); x++) d[sideways ? x * n + y : y * n + x] = col;
            }
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), count = R.pick([1, 2, 3, 3, 4, 5, 6]), sideways = R.bool(0.3);
      const back = R.pick(['black', 'black', 'stripes', 'dark']), bgA = U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.82)), bgB = U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.7)), stripeW = R.int(3, 8);
      let spin = 1;
      const cols = Array.from({ length: count }, (_, k) => ({ sides: R.pick([2, 3, 4, 4, 5, 6]), cx: n * (k + 0.5) / count, r: n / count * R.range(0.34, 0.5), w: R.range(0.5, 1.1) * R.sign(), amp: R.range(1.5, 4), w2: R.range(0.25, 0.6), delay: R.range(0.012, 0.03), sway: R.range(0, 5), hue: R.range(0, 1) }));
      const faces = cols.map(c => Array.from({ length: c.sides }, (_, j) => U.ramp(sc.cols, c.hue + j / c.sides, true)));
      let clock = 0;
      g.trait('Palette', palName(sc)); g.trait('Prisms', count); g.trait('Orientation', sideways ? 'Lying' : 'Standing'); g.trait('Ground', { black: 'Black', stripes: 'Striped', dark: 'Dark' }[back]);
      return (t, dt) => {
        spin += ((g.input.inside ? (g.input.x - 0.5) * 6 : 1) - spin) * 0.05;
        clock += Math.min(0.1, dt) * spin;
        if (back === 'black') d.fill(BLACK);
        else for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) d[i] = back === 'dark' ? bgA : ((sideways ? y : x) / stripeW | 0) & 1 ? bgA : bgB;
        for (let y = 0; y < n; y++) for (let k = 0; k < count; k++) {
          const c = cols[k], tau = clock - y * c.delay, a = tau * c.w + c.amp * Math.sin(tau * c.w2), cx = c.cx + c.sway * Math.sin(tau * 0.7 + k), step = U.TAU / c.sides, full = c.sides === 2 ? 2 * c.r : 2 * c.r * Math.sin(step / 2);
          for (let j = 0; j < c.sides; j++) {
            let x0 = cx + c.r * Math.cos(a + j * step), x1 = cx + c.r * Math.cos(a + (j + 1) * step);
            if (c.sides === 2) { if (j) continue; if (x1 < x0) { const q = x0; x0 = x1; x1 = q; } }
            if (x1 <= x0) continue;
            const shade = 0.3 + 0.7 * (x1 - x0) / full, f = faces[k][j], col = U.pk([f[0] * shade, f[1] * shade, f[2] * shade]);
            for (let x = Math.max(0, Math.ceil(x0)); x < Math.min(n, x1); x++) d[sideways ? x * n + y : y * n + x] = col;
          }
        }
      };
    },
  });
  P.add({
    name: 'Bayer', seed: 1, fam: 'Fields', type: 'px', n: 96,
    interactive: 'Move the pointer to move the centre of the gradients.',
    recipe: 'Soft gradients forced into a handful of flat inks by an ordered dither, the way early screens faked their greys.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.15), M = new Float32Array(64);
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { let v = 0; for (let b = 0; b < 3; b++) { const xb = (x >> b) & 1, yb = (y >> b) & 1; v = v * 4 + ((xb ^ yb) << 1 | yb); } M[y * 8 + x] = (v + 0.5) / 64 - 0.5; }
      const lum = c => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11, inks = [[0, 0, 0], ...sc.cols.slice(0, R.int(2, 4)).sort((p, q) => lum(p) - lum(q))].map(U.pk), L = inks.length - 1;
      const tri = v => { v -= Math.floor(v); return v < 0.5 ? v * 2 : 2 - v * 2; };
      const kinds = R.shuffle(['conic', 'rings', 'linear', 'conic']).slice(0, 2), lobes = R.int(1, 4), rings = R.range(1, 3), w1 = R.range(0.02, 0.05) * R.sign(), w2 = R.range(0.04, 0.09) * R.sign(), orbit = R.range(0.1, 0.3), wo = R.range(0.05, 0.12);
      const tilt = R.range(0, 6), wt = R.range(0.02, 0.06), big = R.pick([1, 1, 2]);
      const hnd = hand(g);
      g.trait('Palette', palName(sc)); g.trait('Inks', L + 1); g.trait('Gradients', kinds.map(k => ({ conic: 'Fan', rings: 'Rings', linear: 'Ramp' })[k]).sort().join(' + ')); g.trait('Dither', big === 2 ? 'Coarse' : 'Fine'); g.trait('Lobes', lobes);
      return t => {
        const gx = Math.cos(tilt + t * wt), gy = Math.sin(tilt + t * wt), hh = hnd.update(), cx0 = hh.mix(orbit * Math.cos(t * wo), hh.x - 0.5), cy0 = hh.mix(orbit * Math.sin(t * wo * 1.3), hh.y - 0.5);
        for (let y = 0, i = 0; y < n; y++) for (let x = 0; x < n; x++, i++) {
          const u = x / n - 0.5, v = y / n - 0.5;
          const du = u - cx0, dv = v - cy0;
          let f = 0;
          for (const kind of kinds) f += 0.5 * (kind === 'conic' ? tri(Math.atan2(dv, du) / U.TAU * lobes + t * w1) : kind === 'rings' ? tri(Math.sqrt(du * du + dv * dv) * rings - t * w2) : tri((u * gx + v * gy) * 1.2 + t * w2 * 0.5));
          const lvl = U.clamp(f) * L + M[((y / big) & 7) * 8 + ((x / big) & 7)];
          d[i] = inks[Math.max(0, Math.min(L, Math.round(lvl)))];
        }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer to drag one of the corners.',
    name: 'Chaos Game', seed: 1, fam: 'Fields', type: 'px', n: 160,
    recipe: 'Jump part of the way toward a corner chosen at random, with one rule about which corner may follow which. Order appears out of dice.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R), N = n * n, hist = new Float32Array(N), who = new Uint8Array(N), k = R.pick([3, 4, 4, 5, 5, 6, 8]);
        const rule = k === 3 ? 'any' : R.pick(['noRepeat', 'noNext', 'noOpposite', 'any']);
        let sum = 1; for (let j = 1; j <= Math.floor(k / 4); j++) sum += Math.cos(U.TAU * j / k);
        const base = k === 4 && rule !== 'any' ? 0.5 : k === 4 ? 0.42 : 1 / (2 * sum), w = R.range(0.03, 0.07) * R.sign(), breathe = R.range(0.02, 0.05), wb = R.range(0.1, 0.2);
        const tint = Array.from({ length: k }, (_, i) => U.ramp(sc.cols, i / k, true)), vx = new Float32Array(k), vy = new Float32Array(k), hnd = hand(g);
        let x = 0, y = 0, last = 0;
        const throwDice = (t, pts) => {
          const s = base + breathe * Math.sin(t * wb);
          for (let i = 0; i < k; i++) { vx[i] = n / 2 + n * 0.47 * Math.cos(t * w + i * U.TAU / k); vy[i] = n / 2 + n * 0.47 * Math.sin(t * w + i * U.TAU / k); }
          if (hnd.w) { vx[0] = hnd.mix(vx[0], hnd.x * n); vy[0] = hnd.mix(vy[0], hnd.y * n); }
          for (let p = 0; p < pts; p++) {
            let v = R() * k | 0;
            if (rule === 'noRepeat' && v === last) continue;
            if (rule === 'noNext' && v === (last + 1) % k) continue;
            if (rule === 'noOpposite' && k % 2 === 0 && v === (last + k / 2) % k) continue;
            x = vx[v] + (x - vx[v]) * s; y = vy[v] + (y - vy[v]) * s; last = v;
            const i = (y | 0) * n + (x | 0);
            if (i >= 0 && i < N) { hist[i] += 1; who[i] = v; }
          }
        };
        for (let q = 0; q < 10; q++) throwDice(0, 14000);
        g.trait('Palette', palName(sc)); g.trait('Corners', k); g.trait('Rule', { noRepeat: 'No repeat', noNext: 'No neighbour', noOpposite: 'No opposite', any: 'Any corner' }[rule]); g.trait('Frame', 'Inset');
        return t => {
          for (let i = 0; i < N; i++) hist[i] *= 0.88;
          hnd.update();
          throwDice(t, 14000);
          for (let i = 0; i < N; i++) {
            const h = hist[i];
            if (h < 0.5) { d[i] = BLACK; continue; }
            const b = Math.min(1, 0.3 + Math.log(1 + h) * 0.3), c = tint[who[i]];
            d[i] = (255 << 24 | (c[2] * b) << 16 | (c[1] * b) << 8 | (c[0] * b)) >>> 0;
          }
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R), N = n * n, hist = new Float32Array(N), who = new Uint8Array(N), k = R.pick([3, 4, 4, 5, 5, 6, 8]);
      const rule = k === 3 ? 'any' : R.pick(['noRepeat', 'noNext', 'noOpposite', 'any']);
      let sum = 1; for (let j = 1; j <= Math.floor(k / 4); j++) sum += Math.cos(U.TAU * j / k);
      const base = k === 4 && rule !== 'any' ? 0.5 : k === 4 ? 0.42 : 1 / (2 * sum), w = R.range(0.03, 0.07) * R.sign(), breathe = R.range(0.02, 0.05), wb = R.range(0.1, 0.2);
      const tint = Array.from({ length: k }, (_, i) => U.ramp(sc.cols, i / k, true)), vx = new Float32Array(k), vy = new Float32Array(k), hnd = hand(g);
      let x = 0, y = 0, last = 0;
      const throwDice = (t, pts) => {
        const s = base + breathe * Math.sin(t * wb);
        for (let i = 0; i < k; i++) { vx[i] = n / 2 + n * 0.5 * Math.cos(t * w + i * U.TAU / k); vy[i] = n / 2 + n * 0.5 * Math.sin(t * w + i * U.TAU / k); }
        if (hnd.w) { vx[0] = hnd.mix(vx[0], hnd.x * n); vy[0] = hnd.mix(vy[0], hnd.y * n); }
        for (let p = 0; p < pts; p++) {
          let v = R() * k | 0;
          if (rule === 'noRepeat' && v === last) continue;
          if (rule === 'noNext' && v === (last + 1) % k) continue;
          if (rule === 'noOpposite' && k % 2 === 0 && v === (last + k / 2) % k) continue;
          x = vx[v] + (x - vx[v]) * s; y = vy[v] + (y - vy[v]) * s; last = v;
          const i = (y | 0) * n + (x | 0);
          if (i >= 0 && i < N) { hist[i] += 1; who[i] = v; }
        }
      };
      for (let q = 0; q < 10; q++) throwDice(0, 14000);
      g.trait('Palette', palName(sc)); g.trait('Corners', k); g.trait('Rule', { noRepeat: 'No repeat', noNext: 'No neighbour', noOpposite: 'No opposite', any: 'Any corner' }[rule]); g.trait('Frame', 'Full');
      return t => {
        for (let i = 0; i < N; i++) hist[i] *= 0.88;
        hnd.update();
        throwDice(t, 14000);
        for (let i = 0; i < N; i++) {
          const h = hist[i];
          if (h < 0.5) { d[i] = BLACK; continue; }
          const b = Math.min(1, 0.3 + Math.log(1 + h) * 0.3), c = tint[who[i]];
          d[i] = (255 << 24 | (c[2] * b) << 16 | (c[1] * b) << 8 | (c[0] * b)) >>> 0;
        }
      };
    },
  });
  P.add({
    name: 'Cortex', seed: 1, fam: 'Fields', type: 'gl', n: 200,
    interactive: 'Move the pointer to feed the network a new question.',
    recipe: 'A small random neural network, as in Axons, asked one question per cell: given where you are, what time it is and where the pointer is, what colour are you?',
    frag: `uniform float u_w1[48]; uniform float u_w2[64]; uniform float u_w3[16]; uniform float u_bias[8]; uniform float u_bands, u_cut, u_px, u_py;
      float act(float x, float k){ if (k > 0.5) return sin(x); float e = exp(2.0 * clamp(x, -6.0, 6.0)); return (e - 1.0) / (e + 1.0); }
      void main(){
        vec2 p = v_uv * 2.0 - 1.0;
        float inp[6]; inp[0] = p.x * 1.8; inp[1] = p.y * 1.8; inp[2] = length(p) * 1.8; inp[3] = sin(u_t * 0.21) + u_px; inp[4] = cos(u_t * 0.13) + u_py; inp[5] = 1.0;
        float h1[8]; float h2[8];
        for (int j = 0; j < 8; j++) { float s = 0.0; for (int i = 0; i < 6; i++) s += u_w1[j * 6 + i] * inp[i]; h1[j] = act(s, mod(float(j), 2.0)); }
        for (int j = 0; j < 8; j++) { float s = u_bias[j]; for (int i = 0; i < 8; i++) s += u_w2[j * 8 + i] * h1[i]; h2[j] = act(s, mod(float(j + 1), 2.0)); }
        float o1 = 0.0, o2 = 0.0;
        for (int i = 0; i < 8; i++) { o1 += u_w3[i] * h2[i]; o2 += u_w3[8 + i] * h2[i]; }
        float b = o1 * u_bands, fr = fract(b);
        vec3 col = palStep(floor(b) * 0.161 + u_t * 0.004) * (0.7 + 0.3 * fr);
        if (sin(o2 * 1.7) > u_cut || fr < 0.1) col = vec3(0.0);
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const sch = U.scheme(R), pal = U.glPalette(sch), w = (len, s) => ({ a: Float32Array.from({ length: len }, () => R.gauss() * s), n: 1 });
      const uni = { ...pal, u_w1: w(48, 1.1), u_w2: w(64, 0.8), u_w3: w(16, 0.9), u_bias: w(8, 0.5), u_bands: R.range(1.5, 4), u_cut: R.range(0.45, 0.85), u_px: 0, u_py: 0 }, ptr = easedPointer(g, 0.05);
      g.trait('Palette', palName(sch)); g.trait('Bands', Math.round(uni.u_bands)); g.trait('Holes', uni.u_cut < 0.6 ? 'Many' : 'Few');
      return () => { const p = ptr.update(); uni.u_px = p.x * 3; uni.u_py = p.y * 3; return uni; };
    },
  });

  P.add({
    name: 'Newton Basins', seed: 4, fam: 'Fields', type: 'gl', n: 240,
    recipe: 'Each cell runs Newton’s method on the same equation and takes the colour of the root it falls to; the borders between answers are fractal.',
    frag: CPLX + `uniform vec2 u_root[5]; uniform float u_n, u_zoom, u_relax;
      void main(){
        vec2 z = (v_uv * 2.0 - 1.0) * u_zoom; float it = 0.0, which = -1.0;
        for (int i = 0; i < 44; i++) {
          vec2 s = vec2(0.0);
          for (int k = 0; k < 5; k++) if (float(k) < u_n) { vec2 dz = z - u_root[k]; float dd = dot(dz, dz); if (dd < 2e-5) which = float(k); s += vec2(dz.x, -dz.y) / max(dd, 1e-12); }
          if (which >= 0.0) break;
          z -= u_relax * cdiv(vec2(1.0, 0.0), s); it += 1.0;
        }
        vec3 col = which < 0.0 ? vec3(0.0) : pal(which / u_n + 0.04) * (0.25 + 0.75 * exp(-it * 0.09)) * step(0.5, mod(it, 9.0));
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const pal = U.glPalette(U.scheme(R)), k = R.int(3, 5), relax = R.pick([1, 1, 1, 0.7, 1.4]), zoom = R.range(1.5, 2.2), roots = Array.from({ length: 5 }, (_, i) => ({ r: R.range(0.6, 1.2), w: R.range(0.04, 0.12) * R.sign(), ph: i * U.TAU / k + R.range(-0.3, 0.3), e: R.range(0.6, 1) })), ra = new Float32Array(10);
      return t => {
        roots.forEach((q, i) => { ra[i * 2] = q.r * Math.cos(t * q.w + q.ph); ra[i * 2 + 1] = q.r * q.e * Math.sin(t * q.w + q.ph); });
        return { ...pal, u_root: { a: ra, n: 2 }, u_n: k, u_zoom: zoom, u_relax: relax };
      };
    },
  });

  P.add({
    name: 'Inversion', fam: 'Fields', type: 'gl', n: 260,
    recipe: 'Fold the plane into a square, turn it inside out through a circle, and repeat nine times: lace that reknits as the circle changes size.',
    frag: `uniform float u_s, u_zoom, u_rot; uniform vec2 u_off;
      void main(){
        vec2 p = (v_uv * 2.0 - 1.0) * u_zoom;
        p = vec2(p.x * cos(u_rot) - p.y * sin(u_rot), p.x * sin(u_rot) + p.y * cos(u_rot)) + u_off;
        float scale = 1.0, trap = 1e9, trap2 = 1e9;
        for (int i = 0; i < 9; i++) { p = -1.0 + 2.0 * fract(0.5 * p + 0.5); float r2 = dot(p, p); trap = min(trap, r2); trap2 = min(trap2, abs(p.x)); float k = u_s / r2; p *= k; scale *= k; }
        float dd = 0.25 * abs(p.y) / scale;
        vec3 col = pal(trap * 0.8 + trap2 * 0.5 + u_t * 0.012) * smoothstep(0.0008, 0.006, dd) * (0.45 + 0.55 * smoothstep(0.0, 0.5, trap));
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const pal = U.glPalette(U.scheme(R)), s0 = R.range(1.1, 1.35), amp = R.range(0.08, 0.18), w = R.range(0.07, 0.13), zoom = R.range(0.8, 1.5), spin = R.range(0.008, 0.02) * R.sign(), off = [R.pick([0, 0, 0.5, 1]), R.pick([0, 0, 0.5, 1])];
      return t => ({ ...pal, u_s: s0 + amp * Math.sin(t * w), u_zoom: zoom, u_rot: t * spin, u_off: off });
    },
  });
})();
