// Tilings and subdivision: ways of cutting the plane into pieces.
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
    name: 'Partition', fam: 'Tilings', type: 'vec',
    recipe: 'A rectangle cut in two, and each part cut again, seven times over; every cut slides back and forth at its own pace.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.35), depth = R.int(5, 7), lead = R.range(5, 11), empty = R.range(0.15, 0.4), inset = R.bool(0.3);
      const build = (d, vertical) => d === 0 || (d < depth - 2 && R.bool(0.12)) ? { col: R.bool(empty) ? null : U.css(R.pick(sc.cols)) } : { mid: R.range(0.34, 0.66), amp: R.range(0.05, 0.17), w: R.range(0.08, 0.3), ph: R.range(0, 6), vertical, a: build(d - 1, !vertical), b: build(d - 1, !vertical) };
      const root = build(depth, R.bool());
      const draw = (node, x, y, w, h, t) => {
        if (!node.a) {
          if (node.col) { ctx.fillStyle = node.col; const m = inset ? Math.min(w, h) * 0.14 : 0; ctx.fillRect(x + lead / 2 + m, y + lead / 2 + m, Math.max(0, w - lead - 2 * m), Math.max(0, h - lead - 2 * m)); }
          return;
        }
        const k = node.mid + node.amp * Math.sin(t * node.w + node.ph);
        if (node.vertical) { draw(node.a, x, y, w * k, h, t); draw(node.b, x + w * k, y, w * (1 - k), h, t); }
        else { draw(node.a, x, y, w, h * k, t); draw(node.b, x, y + h * k, w, h * (1 - k), t); }
      };
      return t => { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000); draw(root, 20, 20, 960, 960, t); };
    },
  });

  P.add({
    interactive: 'Move the pointer to move the centre the colour ripples from.',
    name: 'Penrose', seed: 3, fam: 'Tilings', type: 'vec',
    recipe: 'Two rhombs that can tile the plane but never periodically, cut down from a ten-fold wheel, with colour running out from the hub. Some rolls lay the tiles on the pixel grid instead, at other zooms and colourings.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.25), sc = sh.scheme, PHI = (1 + Math.sqrt(5)) / 2, depth = R.pick([5, 5, 6]);
        let tris = [];
        for (let i = 0; i < 10; i++) {
          const a = (2 * i - 1) * Math.PI / 10, b = (2 * i + 1) * Math.PI / 10, B = [720 * Math.cos(a), 720 * Math.sin(a)], C = [720 * Math.cos(b), 720 * Math.sin(b)];
          tris.push(i % 2 ? [0, [0, 0], B, C] : [0, [0, 0], C, B]);
        }
        const mixp = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
        for (let d = 0; d < depth; d++) {
          const next = [];
          for (const [kind, A, B, C] of tris) {
            if (kind === 0) { const Pp = mixp(A, B, 1 / PHI); next.push([0, C, Pp, B], [1, Pp, C, A]); }
            else { const Q = mixp(B, A, 1 / PHI), Rr = mixp(B, C, 1 / PHI); next.push([1, Rr, C, A], [1, Q, Rr, B], [0, Rr, Q, A]); }
          }
          tris = next;
        }
        const items = tris.map(([kind, A, B, C]) => ({ kind, A, B, C, r: Math.hypot((A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3) })).filter(q => q.r < 760);
        const GROUPS = 18, rings = R.range(1.2, 3), speed = R.range(0.05, 0.12) * R.sign(), spin = R.range(0.006, 0.014) * R.sign(), thinDark = R.bool(0.6);
        let ox = 0, oy = 0;   // the pointer moves the centre the colour ripples from
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Tiles', depth > 5 ? 'Small' : 'Large'); g.trait('Colour', sh.paper ? 'Line only' : 'Rings'); g.trait('Thin rhombs', sh.paper ? 'Plain' : thinDark ? 'Dark' : 'Bright');
        return t => {
          ox += ((g.input.inside ? (g.input.x - 0.5) * 1000 : 0) - ox) * 0.1; oy += ((g.input.inside ? (g.input.y - 0.5) * 1000 : 0) - oy) * 0.1;
          if (Math.abs(ox) < 1e-3) ox = 0; if (Math.abs(oy) < 1e-3) oy = 0;
          sh.paint();
          ctx.save(); ctx.translate(500, 500); ctx.rotate(t * spin);
          const paths = Array.from({ length: GROUPS * 2 }, () => new Path2D()), lines = new Path2D();
          for (const q of items) {
            const qr = ox || oy ? Math.hypot((q.A[0] + q.B[0] + q.C[0]) / 3 - ox, (q.A[1] + q.B[1] + q.C[1]) / 3 - oy) : q.r;
            const ph = ((qr / 700 * rings - t * speed) % 1 + 1) % 1, p = paths[(q.kind ? GROUPS : 0) + Math.floor(ph * GROUPS)];
            p.moveTo(q.A[0], q.A[1]); p.lineTo(q.B[0], q.B[1]); p.lineTo(q.C[0], q.C[1]); p.closePath();
            lines.moveTo(q.B[0], q.B[1]); lines.lineTo(q.A[0], q.A[1]); lines.lineTo(q.C[0], q.C[1]);
          }
          if (!sh.paper) for (let k = 0; k < GROUPS * 2; k++) {
            const thin = k >= GROUPS, col = U.ramp(sc.cols, (k % GROUPS) / GROUPS, true);
            ctx.fillStyle = U.css(thin && thinDark ? U.mix(col, [0, 0, 0], 0.72) : col); ctx.fill(paths[k]);
          }
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : [0, 0, 0]); ctx.lineWidth = g.lw(sh.paper ? 1.6 : 2.4); ctx.stroke(lines);
          ctx.restore();
        };
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([100, 200, 200]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.6), PHI = (1 + Math.sqrt(5)) / 2, zoom = R.pick([1, 1, 1.6, 2.4]), depth = n >= 200 ? (zoom > 1.5 ? 5 : 6) : (zoom > 1.5 ? 4 : 5);
        let tris = [];
        for (let i = 0; i < 10; i++) {
          const a = (2 * i - 1) * Math.PI / 10, b = (2 * i + 1) * Math.PI / 10, B = [720 * Math.cos(a), 720 * Math.sin(a)], C = [720 * Math.cos(b), 720 * Math.sin(b)];
          tris.push(i % 2 ? [0, [0, 0], B, C] : [0, [0, 0], C, B]);
        }
        const mixp = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
        for (let dd = 0; dd < depth; dd++) {
          const next = [];
          for (const [kind, A, B, C] of tris) {
            if (kind === 0) { const Pp = mixp(A, B, 1 / PHI); next.push([0, C, Pp, B], [1, Pp, C, A]); }
            else { const Q = mixp(B, A, 1 / PHI), Rr = mixp(B, C, 1 / PHI); next.push([1, Rr, C, A], [1, Q, Rr, B], [0, Rr, Q, A]); }
          }
          tris = next;
        }
        const k = n / 1000 * zoom;
        const items = tris.map(([kind, A, B, C]) => ({ kind, A, B, C, cx: (A[0] + B[0] + C[0]) / 3, cy: (A[1] + B[1] + C[1]) / 3, dir: Math.atan2(C[1] - A[1], C[0] - A[0]) })).filter(q => Math.hypot(q.cx, q.cy) * k < n * 0.75);
        const look = R.pick(['rings', 'rings', 'direction', 'kinds']), rings = R.range(1.2, 3), speed = R.range(0.05, 0.12) * R.sign(), spin = R.range(0.006, 0.014) * R.sign(), thinDark = R.bool(0.6);
        const edge = R.bool(0.75) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.6)), pts = [0, 0, 0, 0, 0, 0];
        let ox = 0, oy = 0;
        g.trait('Ground', edge === BLACK ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Tiles', zoom > 2 ? 'Huge' : zoom > 1.5 ? 'Large' : depth > 5 ? 'Small' : 'Medium'); g.trait('Colour', { rings: 'Rings', direction: 'Direction', kinds: 'Two kinds' }[look]); g.trait('Thin rhombs', thinDark ? 'Dark' : 'Bright'); g.trait('Grid', n);
        return t => {
          ox += ((g.input.inside ? (g.input.x - 0.5) * n : 0) - ox) * 0.1; oy += ((g.input.inside ? (g.input.y - 0.5) * n : 0) - oy) * 0.1;
          d.fill(edge);
          const ca = Math.cos(t * spin) * k, sa = Math.sin(t * spin) * k, h = n / 2;
          const tx = (p, o) => { pts[o] = h + p[0] * ca - p[1] * sa; pts[o + 1] = h + p[0] * sa + p[1] * ca; };
          for (const q of items) {
            tx(q.A, 0); tx(q.B, 2); tx(q.C, 4);
            const mx = (pts[0] + pts[2] + pts[4]) / 3 - h - ox, my = (pts[1] + pts[3] + pts[5]) / 3 - h - oy;
            let f;
            if (look === 'direction') f = ((q.dir + t * spin) / U.TAU * 2 + 4) % 1;
            else if (look === 'kinds') f = q.kind ? 0.6 : 0.1;
            else f = ((Math.hypot(mx, my) / n * 1.4 * rings - t * speed) % 1 + 1) % 1;
            const col = U.pk(U.ramp(sc.cols, f, true));
            X.poly(g, pts, q.kind && thinDark ? X.shade(col, 0.3) : col);
          }
          for (const q of items) { tx(q.A, 0); tx(q.B, 2); tx(q.C, 4); X.line(g, pts[2], pts[3], pts[0], pts[1], edge); X.line(g, pts[0], pts[1], pts[4], pts[5], edge); }
        };
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    interactive: 'Click to change the treadling.',
    name: 'Weave Draft', seed: 1, fam: 'Tilings', type: 'px', n: 96,
    recipe: 'Cloth worked out as a weaver would: which shaft each warp thread hangs on, which shafts each pick lifts. Twills, satins and point twills on four to eight shafts; the treadling changes as the cloth rolls up.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { n, d } = g, sc = U.scheme(R, 0.2), shafts = R.pick([4, 4, 6, 8]), cols = sc.cols.map(U.pk), N = n * n;
        const zig = (len, k) => Array.from({ length: len }, (_, i) => { const m = i % (2 * k - 2); return m < k ? m : 2 * k - 2 - m; });
        const straight = (len, k) => Array.from({ length: len }, (_, i) => i % k);
        const threading = R.pick([zig(n, shafts), straight(n, shafts), [...zig(n / 2, shafts), ...straight(n / 2, shafts)]]);
        const float = shafts / 2 | 0, tieup = Array.from({ length: shafts }, (_, s) => Array.from({ length: shafts }, (_, tr) => ((s - tr + shafts) % shafts) < float));
        const stripe = () => { const out = []; while (out.length < n) { const c = R.pick(cols), w = R.pick([2, 4, 6, 8, 12]); for (let k = 0; k < w; k++) out.push(c); } return out; };
        const warp = stripe(), weftSeq = stripe(), rows = new Uint32Array(N);
        let made = 0, mode = 0, left = 0, treadle = 0, dir = 1;
        const next = () => {
          if (left-- <= 0) { mode = R.int(0, 3); left = R.int(16, 40); dir = R.sign(); }
          if (mode === 0) treadle = (treadle + dir + shafts) % shafts;
          else if (mode === 1) { if (treadle + dir < 0 || treadle + dir >= shafts) dir = -dir; treadle += dir; }
          else if (mode === 2) treadle = (treadle + 2) % shafts;
          else treadle = (treadle + (made % 4 < 2 ? 1 : shafts - 1)) % shafts;
          const weft = weftSeq[made % n];
          rows.copyWithin(0, n);
          for (let x = 0; x < n; x++) rows[N - n + x] = tieup[threading[x]][treadle] ? warp[x] : weft;
          made++;
        };
        for (let i = 0; i < n; i++) next();
        const speed = R.range(5, 8);
        g.trait('Palette', palName(sc)); g.trait('Shafts', shafts); g.trait('Threading', threading.join() === zig(n, shafts).join() ? 'Point' : threading.join() === straight(n, shafts).join() ? 'Straight' : 'Mixed'); g.trait('Weave', 'Even twill');
        return t => {
          if (g.input.taps().length) left = 0;   // a click changes the treadling at the next pick
          const want = n + Math.floor(t * speed);
          while (made < want) next();
          d.set(rows);
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, sc = U.scheme(R, 0.2), shafts = R.pick([4, 4, 6, 8]), cols = sc.cols.map(U.pk), N = n * n;
      const zig = (len, k) => Array.from({ length: len }, (_, i) => { const m = i % (2 * k - 2); return m < k ? m : 2 * k - 2 - m; });
      const straight = (len, k) => Array.from({ length: len }, (_, i) => i % k);
      const threading = R.pick([zig(n, shafts), straight(n, shafts), [...zig(n / 2, shafts), ...straight(n / 2, shafts)]]);
      const float = R.pick([shafts / 2 | 0, shafts / 2 | 0, 1, shafts - 1]), skip = R.pick([1, 1, shafts > 4 ? 3 : 1]), tieup = Array.from({ length: shafts }, (_, s) => Array.from({ length: shafts }, (_, tr) => ((s - tr * skip + shafts * 8) % shafts) < float));
      const stripe = () => { const out = []; while (out.length < n) { const c = R.pick(cols), w = R.pick([2, 4, 6, 8, 12]); for (let k = 0; k < w; k++) out.push(c); } return out; };
      const warp = stripe(), rows = new Uint32Array(N);
      let weftSeq = stripe();
      let made = 0, mode = 0, left = 0, treadle = 0, dir = 1;
      const next = () => {
        if (left-- <= 0) { mode = R.int(0, 3); left = R.int(16, 40); dir = R.sign(); }
        if (mode === 0) treadle = (treadle + dir + shafts) % shafts;
        else if (mode === 1) { if (treadle + dir < 0 || treadle + dir >= shafts) dir = -dir; treadle += dir; }
        else if (mode === 2) treadle = (treadle + 2) % shafts;
        else treadle = (treadle + (made % 4 < 2 ? 1 : shafts - 1)) % shafts;
        const weft = weftSeq[made % n];
        rows.copyWithin(0, n);
        for (let x = 0; x < n; x++) rows[N - n + x] = tieup[threading[x]][treadle] ? warp[x] : weft;
        made++;
      };
      for (let i = 0; i < n; i++) next();
      const speed = R.range(5, 8);
      g.trait('Palette', palName(sc)); g.trait('Shafts', shafts); g.trait('Threading', threading.join() === zig(n, shafts).join() ? 'Point' : threading.join() === straight(n, shafts).join() ? 'Straight' : 'Mixed'); g.trait('Weave', skip > 1 ? 'Satin' : float === 1 ? 'Weft twill' : float === shafts - 1 ? 'Warp twill' : 'Even twill');
      return t => {
        if (g.input.taps().length) { left = 0; weftSeq = stripe(); }
        const want = n + Math.floor(t * speed);
        while (made < want) next();
        d.set(rows);
      };
    },
  });
  P.add({
    name: 'Poincaré', seed: 1, fam: 'Tilings', type: 'gl', n: 400, smooth: true,
    recipe: 'A tiling that only fits in curved space, drawn in a disc where the edge is infinitely far away, and slid slowly under the window.',
    frag: `uniform vec2 u_a; uniform float u_rot, u_p, u_q, u_shade;
      vec2 cmul(vec2 a, vec2 b){ return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x); }
      vec2 cdiv(vec2 a, vec2 b){ return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / dot(b, b); }
      void main(){
        vec2 z = (v_uv * 2.0 - 1.0) * 1.03;
        float r2 = dot(z, z);
        if (r2 >= 1.0) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
        z = cdiv(z - u_a, vec2(1.0, 0.0) - cmul(vec2(u_a.x, -u_a.y), z));
        z = cmul(z, vec2(cos(u_rot), sin(u_rot)));
        float sp = sin(3.14159265 / u_p), cq = cos(3.14159265 / u_q);
        float rr = sp * sp / (cq * cq - sp * sp), dc = sqrt(1.0 + rr), rc = sqrt(rr);
        vec2 nrm = vec2(-sp, cos(3.14159265 / u_p));
        float n = 0.0, dd = 1.0, dn = 0.0;
        for (int i = 0; i < 48; i++) {
          bool moved = false;
          if (z.y < 0.0) { z.y = -z.y; n += 1.0; moved = true; }
          dn = dot(z, nrm);
          if (dn > 0.0) { z -= 2.0 * dn * nrm; n += 1.0; moved = true; }
          vec2 dz = z - vec2(dc, 0.0); dd = dot(dz, dz);
          if (dd < rr) { z = vec2(dc, 0.0) + dz * rr / dd; n += 1.0; moved = true; }
          if (!moved) break;
        }
        float edge = min(min(z.y, -dot(z, nrm)), sqrt(dot(z - vec2(dc, 0.0), z - vec2(dc, 0.0))) - rc);
        float par = mod(n, 2.0);
        vec3 col = pal(n * 0.045 + u_t * 0.02 + length(z) * 0.4) * mix(1.0, u_shade, par);
        col *= smoothstep(0.004, 0.02, edge) * smoothstep(1.0, 0.97, r2);
        gl_FragColor = vec4(col, 1.0);
      }`,
    make(R, U, g) {
      const sc = U.scheme(R), pq = R.pick([[7, 3], [5, 4], [4, 5], [3, 7], [6, 4], [8, 3], [4, 6], [3, 8], [5, 5]]), pal = U.glPalette(sc);
      const reach = R.range(0.35, 0.7), w = R.range(0.05, 0.11) * R.sign(), spin = R.range(0.02, 0.05) * R.sign(), shade = R.pick([0.0, 0.25, 0.5]);
      return t => ({ ...pal, u_a: [reach * Math.cos(t * w), reach * Math.sin(t * w * 1.37)], u_rot: t * spin, u_p: pq[0], u_q: pq[1], u_shade: shade });
    },
  });

  P.add({
    interactive: 'Click to shuffle the dominoes again from the start.',
    name: 'Aztec Diamond', seed: 2, fam: 'Tilings', type: 'px', n: 84,
    recipe: 'Dominoes shuffled outward one ring at a time. The four corners freeze into order while the middle stays random, split by a perfect circle. Coloured by direction (four colours or two), lit as raised blocks, or as a field of arrows.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.38) return (function () {   // (the original look: still more than a third of the rolls)
        const { n, d } = g, sc = U.scheme(R, 0.3), MAX = n / 2 - 1, h = n / 2, occ = new Uint8Array(n * n);
        const picks = R.shuffle(sc.cols.slice()), base = [0, 1, 2, 3].map(i => picks[i % picks.length]);
        const cols = base.map((c, i) => U.pk(i >= picks.length ? U.mix(c, [255, 255, 255], 0.35) : c)), dark = base.map((c, i) => U.pk(U.mix(i >= picks.length ? U.mix(c, [255, 255, 255], 0.35) : c, [0, 0, 0], 0.3)));
        let order, dom, born = 0, hold;
        const inside = (x, y, k) => Math.abs(x + 0.5) + Math.abs(y + 0.5) <= k;
        const create = k => {
          occ.fill(0);
          for (const q of dom) { occ[(q.y + h) * n + q.x + h] = 1; if (q.t < 2) occ[(q.y + h) * n + q.x + 1 + h] = 1; else occ[(q.y + 1 + h) * n + q.x + h] = 1; }
          for (let y = -k; y < k; y++) for (let x = -k; x < k; x++) {
            if (!inside(x, y, k) || occ[(y + h) * n + x + h]) continue;
            if (R.bool()) dom.push({ x, y, t: 0 }, { x, y: y + 1, t: 1 }); else dom.push({ x, y, t: 2 }, { x: x + 1, y, t: 3 });
            occ[(y + h) * n + x + h] = occ[(y + h) * n + x + 1 + h] = occ[(y + 1 + h) * n + x + h] = occ[(y + 1 + h) * n + x + 1 + h] = 1;
          }
        };
        const reset = t => { order = 1; dom = []; create(1); born = t; hold = 0; };
        const grow = () => {
          // types: 0 moves up, 1 down (both lie flat); 2 moves left, 3 right (both stand)
          const at = new Map();
          for (const q of dom) at.set(q.t * 1e6 + (q.x + 500) * 1000 + q.y + 500, q);
          const gone = new Set();
          for (const q of dom) {
            if (q.t === 0) { const o = at.get(1e6 + (q.x + 500) * 1000 + q.y - 1 + 500); if (o) { gone.add(q); gone.add(o); } }
            if (q.t === 2) { const o = at.get(3e6 + (q.x - 1 + 500) * 1000 + q.y + 500); if (o) { gone.add(q); gone.add(o); } }
          }
          dom = dom.filter(q => !gone.has(q));
          for (const q of dom) { if (q.t === 0) q.y--; else if (q.t === 1) q.y++; else if (q.t === 2) q.x--; else q.x++; }
          order++; create(order);
        };
        reset(0);
        for (let k = 0; k < 8; k++) grow();
        g.trait('Palette', palName(sc)); g.trait('Look', 'Four colours'); g.trait('Ground', 'Black'); g.trait('View', 'Whole');
        return (t, dt, f) => {
          if (g.input.taps().length) { order = MAX; hold = 7; }   // a click ends this shuffle; the next one starts
          if (order < MAX) { if (f % 3 === 0) grow(); } else if ((hold += dt) > 7) reset(t);
          d.fill(BLACK);
          for (const q of dom) {
            const i = (q.y + h) * n + q.x + h;
            d[i] = cols[q.t]; d[q.t < 2 ? i + 1 : i + n] = dark[q.t];
          }
          U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, order >= MAX ? (7 - hold) / 1.2 : 1));
        };
      })();
      // otherwise one of the newer variations
      const { n, d } = g, X = U.X, sc = U.scheme(R, 0.3), MAX = n / 2 - 1, h = n / 2, occ = new Uint8Array(n * n);
      const look = R.pick(['four', 'four', 'two', 'blocks', 'arrows']);
      const picks = R.shuffle(sc.cols.slice()), base = [0, 1, 2, 3].map(i => picks[(look === 'two' ? i >> 1 : i) % picks.length]);
      const cols = base.map((c, i) => U.pk(i >= picks.length ? U.mix(c, [255, 255, 255], 0.35) : c)), dark = cols.map(c => X.shade(c, 0.7)), lite = cols.map(c => X.shade(c, 1.3));
      const ground = R.bool(0.7) ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.88));
      // a close-up (some rolls): twice the size, looking at one corner where the frozen order meets the random middle
      const close = g.alt.bool(0.35), fa = g.alt.int(0, 3) * Math.PI / 2, fx = Math.round(Math.cos(fa) * MAX * 0.6), fy = Math.round(Math.sin(fa) * MAX * 0.6);
      const put = (x, y, c) => { const sx = (x - fx) * 2 + h, sy = (y - fy) * 2 + h; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) { const px = sx + b, py = sy + a; if (px >= 0 && py >= 0 && px < n && py < n) d[py * n + px] = c; } };
      let order, dom, born = 0, hold;
      const inside = (x, y, k) => Math.abs(x + 0.5) + Math.abs(y + 0.5) <= k;
      const create = k => {
        occ.fill(0);
        for (const q of dom) { occ[(q.y + h) * n + q.x + h] = 1; if (q.t < 2) occ[(q.y + h) * n + q.x + 1 + h] = 1; else occ[(q.y + 1 + h) * n + q.x + h] = 1; }
        for (let y = -k; y < k; y++) for (let x = -k; x < k; x++) {
          if (!inside(x, y, k) || occ[(y + h) * n + x + h]) continue;
          if (R.bool()) dom.push({ x, y, t: 0 }, { x, y: y + 1, t: 1 }); else dom.push({ x, y, t: 2 }, { x: x + 1, y, t: 3 });
          occ[(y + h) * n + x + h] = occ[(y + h) * n + x + 1 + h] = occ[(y + 1 + h) * n + x + h] = occ[(y + 1 + h) * n + x + 1 + h] = 1;
        }
      };
      const reset = t => { order = 1; dom = []; create(1); born = t; hold = 0; };
      const grow = () => {
        // types: 0 moves up, 1 down (both lie flat); 2 moves left, 3 right (both stand)
        const at = new Map();
        for (const q of dom) at.set(q.t * 1e6 + (q.x + 500) * 1000 + q.y + 500, q);
        const gone = new Set();
        for (const q of dom) {
          if (q.t === 0) { const o = at.get(1e6 + (q.x + 500) * 1000 + q.y - 1 + 500); if (o) { gone.add(q); gone.add(o); } }
          if (q.t === 2) { const o = at.get(3e6 + (q.x - 1 + 500) * 1000 + q.y + 500); if (o) { gone.add(q); gone.add(o); } }
        }
        dom = dom.filter(q => !gone.has(q));
        for (const q of dom) { if (q.t === 0) q.y--; else if (q.t === 1) q.y++; else if (q.t === 2) q.x--; else q.x++; }
        order++; create(order);
      };
      reset(0);
      for (let k = 0; k < MAX * 0.55; k++) grow();
      g.trait('Palette', palName(sc)); g.trait('Look', { four: 'Four colours', two: 'Two colours', blocks: 'Raised', arrows: 'Arrows' }[look]); g.trait('Ground', ground === BLACK ? 'Black' : 'Tinted'); g.trait('View', close ? 'Close-up' : 'Whole');
      if (close) for (let k = MAX * 0.55; k < MAX * 0.75; k++) grow();
      return (t, dt, f) => {
        if (g.input.taps().length) { reset(t); for (let k = 0; k < MAX * 0.3; k++) grow(); }
        if (order < MAX) { if (f % 3 === 0) grow(); } else if ((hold += dt) > 7) { reset(t); if (close) for (let k = 0; k < MAX * 0.6; k++) grow(); }
        d.fill(ground);
        if (close) for (const q of dom) {
          const fwd = q.t === 0 || q.t === 2, x2 = q.t < 2 ? q.x + 1 : q.x, y2 = q.t < 2 ? q.y : q.y + 1;
          if (look === 'blocks') { put(q.x, q.y, lite[q.t]); put(x2, y2, dark[q.t]); }
          else if (look === 'arrows') { put(q.x, q.y, fwd ? WHITE : cols[q.t]); put(x2, y2, fwd ? cols[q.t] : WHITE); }
          else { put(q.x, q.y, cols[q.t]); put(x2, y2, dark[q.t]); }
        }
        else for (const q of dom) {
          const i = (q.y + h) * n + q.x + h, j = q.t < 2 ? i + 1 : i + n;
          if (look === 'blocks') { d[i] = lite[q.t]; d[j] = dark[q.t]; }
          else if (look === 'arrows') { const fwd = q.t === 0 || q.t === 2; d[i] = fwd ? WHITE : cols[q.t]; d[j] = fwd ? cols[q.t] : WHITE; }
          else { d[i] = cols[q.t]; d[j] = dark[q.t]; }
        }
        U.fadePx(d, Math.min(born ? (t - born) / 0.8 : 1, order >= MAX ? (7 - hold) / 1.2 : 1));
      };
    },
  });
  P.add({
    name: 'Pinwheel', seed: 4, fam: 'Tilings', type: 'vec',
    recipe: 'One right triangle cut into five copies of itself, again and again; the copies turn up at endlessly many angles, and angle is colour.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.6), depth = 3, GROUPS = 30;
      let tris = R.bool() ? [[[0, 0], [0, 500], [1000, 0]], [[1000, 500], [1000, 0], [0, 500]], [[0, 500], [0, 1000], [1000, 500]], [[1000, 1000], [1000, 500], [0, 1000]]]
        : [[[0, 0], [500, 0], [0, 1000]], [[500, 1000], [0, 1000], [500, 0]], [[500, 0], [1000, 0], [500, 1000]], [[1000, 1000], [500, 1000], [1000, 0]]];
      const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (let k = 0; k < depth; k++) {
        const next = [];
        for (const [Pp, S, L] of tris) {
          const F = [S[0] + (L[0] - S[0]) / 5, S[1] + (L[1] - S[1]) / 5], ms = mid(F, Pp), ml = mid(F, L), mh = mid(Pp, L);
          next.push([F, S, Pp], [F, ms, ml], [ms, Pp, mh], [ml, mh, L], [mh, ml, ms]);
        }
        tris = next;
      }
      const items = tris.map(([Pp, S, L]) => ({ Pp, S, L, cx: (Pp[0] + S[0] + L[0]) / 3, cy: (Pp[1] + S[1] + L[1]) / 3, a: (Math.atan2(L[1] - Pp[1], L[0] - Pp[0]) / U.TAU + 1) % 1 }));
      const drift = R.range(0.015, 0.04) * R.sign(), wave = R.range(0.004, 0.009), speed = R.range(0.5, 1), turn = R.range(0, 6), twice = R.pick([1, 2, 4]);
      return t => {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1000, 1000);
        const paths = Array.from({ length: GROUPS }, () => new Path2D());
        for (const q of items) {
          const s = 0.78 + 0.2 * Math.sin((q.cx * Math.cos(turn) + q.cy * Math.sin(turn)) * wave - t * speed), p = paths[Math.floor((((q.a * twice + t * drift) % 1) + 1) % 1 * GROUPS)];
          p.moveTo(q.cx + (q.Pp[0] - q.cx) * s, q.cy + (q.Pp[1] - q.cy) * s); p.lineTo(q.cx + (q.S[0] - q.cx) * s, q.cy + (q.S[1] - q.cy) * s); p.lineTo(q.cx + (q.L[0] - q.cx) * s, q.cy + (q.L[1] - q.cy) * s); p.closePath();
        }
        for (let k = 0; k < GROUPS; k++) { ctx.fillStyle = U.css(U.ramp(sc.cols, k / GROUPS, true)); ctx.fill(paths[k]); }
      };
    },
  });

  P.add({
    interactive: 'Move the pointer up and down to tighten or loosen the spirals.',
    name: 'Pursuit', seed: 2, fam: 'Tilings', type: 'vec',
    recipe: 'In every tile, a polygon inside a polygon, each turned a little from the last; neighbours turn opposite ways so the spirals join up. Some rolls draw it in pixels instead, as lines or filled bands of colour.',
    make(R, U, g) {
      // the original, exactly as it was: the opening variation and at least half of the rolls
      if (g.home || g.alt() < 0.5) return (function () {
        const { ctx } = g, sh = U.sheet(R, g, 0.6), shape = R.pick(['square', 'square', 'triangle', 'hex']), N = shape === 'square' ? R.int(3, 6) : R.int(3, 5), levels = R.int(11, 18), lo = R.range(0.04, 0.08), hi = R.range(0.16, 0.3), w = R.range(0.15, 0.3), wave = R.range(0.6, 1.6);
        const cells = [];
        if (shape === 'square') { const C = 1000 / N; for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) cells.push({ p: [[i * C, j * C], [(i + 1) * C, j * C], [(i + 1) * C, (j + 1) * C], [i * C, (j + 1) * C]], flip: (i + j) & 1, u: i / N, v: j / N }); }
        else if (shape === 'triangle') { const s = 1000 / N, hh = s * Math.sqrt(3) / 2; for (let j = 0; j < 1000 / hh; j++) for (let i = -1; i < 2 * N + 1; i++) { const up = (i + j) % 2 === 0, x = i * s / 2, y = j * hh; cells.push({ p: up ? [[x, y + hh], [x + s / 2, y], [x + s, y + hh]] : [[x, y], [x + s, y], [x + s / 2, y + hh]], flip: up ? 0 : 1, u: x / 1000, v: y / 1000 }); } }
        else { const r = 1000 / N / 1.5, ww = Math.sqrt(3) * r; for (let j = -1; j < 1000 / (1.5 * r) + 1; j++) for (let i = -1; i < 1000 / ww + 1; i++) { const cx = i * ww + (j & 1 ? ww / 2 : 0), cy = j * 1.5 * r; cells.push({ p: Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos(Math.PI / 6 + k * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + k * Math.PI / 3)]), flip: 0, u: cx / 1000, v: cy / 1000 }); } }
        const xs = new Float32Array(6), ys = new Float32Array(6), depth = shape === 'hex' ? Math.min(levels, 12) : levels;
        let tight = 0;   // the pointer tightens or loosens the spirals
        g.trait('Ground', groundName(sh)); g.trait('Palette', sheetPal(sh)); g.trait('Look', 'Lines'); g.trait('Tiles', { square: 'Squares', triangle: 'Triangles', hex: 'Hexagons' }[shape]); g.trait('Across', N); g.trait('Turns', depth);
        return Object.assign(t => {
          tight += ((g.input.inside ? (0.5 - g.input.y) * 0.25 : 0) - tight) * 0.1; if (Math.abs(tight) < 1e-6) tight = 0;
          sh.paint();
          ctx.lineWidth = g.lw(1.3);
          ctx.strokeStyle = U.css(sh.paper ? sh.ink : sh.cols[0]);
          ctx.beginPath();
          for (const c of cells) {
            const f = tight ? Math.max(0.02, Math.min(0.48, U.lerp(lo, hi, 0.5 + 0.5 * Math.sin(t * w + (c.u + c.v) * wave * U.TAU)) + tight)) : U.lerp(lo, hi, 0.5 + 0.5 * Math.sin(t * w + (c.u + c.v) * wave * U.TAU)), k = c.flip ? 1 - f : f, m = c.p.length;
            for (let q = 0; q < m; q++) { xs[q] = c.p[q][0]; ys[q] = c.p[q][1]; }
            for (let l = 0; l < depth; l++) {
              ctx.moveTo(xs[0], ys[0]);
              for (let q = 1; q < m; q++) ctx.lineTo(xs[q], ys[q]);
              ctx.closePath();
              const x0 = xs[0], y0 = ys[0];
              for (let q = 0; q < m; q++) { const bx = q === m - 1 ? x0 : xs[q + 1], by = q === m - 1 ? y0 : ys[q + 1]; xs[q] += (bx - xs[q]) * k; ys[q] += (by - ys[q]) * k; }
            }
          }
          ctx.stroke();
        }, { period: U.TAU / w });
      })();
      // otherwise one of the newer variations
      // the newer variations are drawn on a cell grid and laid over the plot stage
      const pg = pixelStage(g, R.pick([100, 200, 200]));
      const fr = (function (g) {
        const { n, d } = g, X = U.X, sc = U.scheme(R, 0.6), shape = R.pick(['square', 'square', 'triangle', 'hex']), N = shape === 'square' ? R.int(2, 6) : R.int(2, 5), levels = R.int(10, 18), lo = R.range(0.04, 0.08), hi = R.range(0.16, 0.3), w = R.range(0.15, 0.3), wave = R.range(0.6, 1.6);
        const look = R.pick(['lines', 'bands', 'bands', 'gradient']), ground = look === 'lines' ? BLACK : U.pk(U.mix(sc.cols[0], [0, 0, 0], 0.7)), ink = U.pk(sc.cols[sc.cols.length > 2 ? 2 : 0]);
        const cells = [], S = n;
        if (shape === 'square') { const C = S / N; for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) cells.push({ p: [[i * C, j * C], [(i + 1) * C, j * C], [(i + 1) * C, (j + 1) * C], [i * C, (j + 1) * C]], flip: (i + j) & 1, u: i / N, v: j / N }); }
        else if (shape === 'triangle') { const s = S / N, hh = s * Math.sqrt(3) / 2; for (let j = 0; j < S / hh; j++) for (let i = -1; i < 2 * N + 1; i++) { const up = (i + j) % 2 === 0, x = i * s / 2, y = j * hh; cells.push({ p: up ? [[x, y + hh], [x + s / 2, y], [x + s, y + hh]] : [[x, y], [x + s, y], [x + s / 2, y + hh]], flip: up ? 0 : 1, u: x / S, v: y / S }); } }
        else { const r = S / N / 1.5, ww = Math.sqrt(3) * r; for (let j = -1; j < S / (1.5 * r) + 1; j++) for (let i = -1; i < S / ww + 1; i++) { const cx = i * ww + (j & 1 ? ww / 2 : 0), cy = j * 1.5 * r; cells.push({ p: Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos(Math.PI / 6 + k * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + k * Math.PI / 3)]), flip: 0, u: cx / S, v: cy / S }); } }
        const xs = new Float32Array(6), ys = new Float32Array(6), pts = new Array(12).fill(0), depth = shape === 'hex' ? Math.min(levels, 12) : levels;
        let tight = 0;
        g.trait('Ground', look === 'lines' ? 'Black' : 'Tinted'); g.trait('Palette', palName(sc)); g.trait('Look', { lines: 'Pixel lines', bands: 'Bands', gradient: 'Gradient' }[look]); g.trait('Tiles', { square: 'Squares', triangle: 'Triangles', hex: 'Hexagons' }[shape]); g.trait('Across', N); g.trait('Turns', depth);
        return Object.assign(t => {
          tight += ((g.input.inside ? (0.5 - g.input.y) * 0.25 : 0) - tight) * 0.1;
          d.fill(ground);
          for (const c of cells) {
            const f = Math.max(0.02, Math.min(0.48, U.lerp(lo, hi, 0.5 + 0.5 * Math.sin(t * w + (c.u + c.v) * wave * U.TAU)) + tight)), k = c.flip ? 1 - f : f, m = c.p.length;
            for (let q = 0; q < m; q++) { xs[q] = c.p[q][0]; ys[q] = c.p[q][1]; }
            for (let l = 0; l < depth; l++) {
              if (look === 'lines') for (let q = 0; q < m; q++) X.line(g, xs[q], ys[q], xs[(q + 1) % m], ys[(q + 1) % m], ink);
              else {
                pts.length = 2 * m;
                for (let q = 0; q < m; q++) { pts[2 * q] = xs[q]; pts[2 * q + 1] = ys[q]; }
                X.poly(g, pts, look === 'gradient' ? U.pk(U.ramp(sc.cols, l / depth, false)) : l & 1 ? ground : U.pk(U.ramp(sc.cols, (c.u + c.v) / 2 + l * 0.02, true)));
              }
              const x0 = xs[0], y0 = ys[0];
              for (let q = 0; q < m; q++) { const bx = q === m - 1 ? x0 : xs[q + 1], by = q === m - 1 ? y0 : ys[q + 1]; xs[q] += (bx - xs[q]) * k; ys[q] += (by - ys[q]) * k; }
            }
          }
        }, { period: U.TAU / w });
      })(pg);
      const out = (t, dt, f) => { fr(t, dt, f); pg.flush(); };
      if (fr.period) out.period = fr.period;
      return out;
    },
  });
  P.add({
    name: 'Movement', seed: 3, fam: 'Tilings', type: 'vec',
    recipe: 'A plain checkerboard whose columns and rows are squeezed toward moving folds, after the op art of the 1960s.',
    make(R, U, g) {
      const { ctx } = g, sc = U.scheme(R, 0.2), cols = R.int(26, 40), rows = R.pick([cols, 14, 20, cols]), both = rows === cols && R.bool(0.6);
      const a = U.css(R.pick(sc.cols)), b = R.bool(0.7) ? '#000' : U.css(R.pick(sc.cols)), folds = R.pick([1, 1, 2]), wx = R.range(0.08, 0.16), wy = R.range(0.06, 0.13), squeeze = R.range(0.8, 0.94), spread = R.range(0.1, 0.2);
      const edges = (count, t, w, active) => {
        const out = [0];
        let sum = 0;
        for (let i = 0; i < count; i++) {
          const u = (i + 0.5) / count;
          let k = 1;
          if (active) for (let f = 0; f < folds; f++) { const c = 0.5 + 0.38 * Math.sin(t * w * (f ? 1.4 : 1) + f * 2.4); k *= 1 - squeeze * Math.exp(-((u - c) ** 2) / (spread * spread)); }
          sum += k; out.push(sum);
        }
        return out.map(v => v / sum * 1000);
      };
      return t => {
        const xs = edges(cols, t, wx, true), ys = edges(rows, t + 40, wy, both);
        ctx.fillStyle = b; ctx.fillRect(0, 0, 1000, 1000);
        ctx.fillStyle = a;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) for (let i = (j & 1); i < cols; i += 2) ctx.rect(xs[i], ys[j], xs[i + 1] - xs[i] + 0.5, ys[j + 1] - ys[j] + 0.5);
        ctx.fill();
      };
    },
  });
})();
