// Set 4 · Lamps: small lights in the dark, as chunky pixel art. Light is drawn
// the way pixel artists draw it: flat stepped halos, hard-edged pools and a
// few bright cells, never a blur. Most respond to the pointer.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, K = U.K4, BLACK = 0xff000000, WHITE = 0xffffffff;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Lamps' }, def));
  const { rgb, mixPk: mix, shade, put, line, rect } = X;
  const TAU = Math.PI * 2, hx = K.hx;

  // night skies: three bands top to bottom, plus the colour of things against them
  const SKIES = [
    ['#070b1e', '#121a3e', '#1f2a5c', '#04060f'], ['#0b0716', '#1e1036', '#3a1a52', '#06030c'], ['#04121a', '#0a2630', '#124050', '#020809'],
    ['#140a0a', '#2a1420', '#4a2030', '#080404'], ['#0a0a14', '#16162a', '#262a48', '#030308'],
  ].map(a => a.map(hx));
  function sky(g, S, y1, t, stars = 40, seed = 1) {
    K.bands(g, 0, y1, S.slice(0, 3));
    for (let k = 0; k < stars; k++) {
      const x = K.hash(k, 1, seed) * g.n, y = K.hash(k, 2, seed) * y1 * 0.85, tw = K.hash(k, (t * 3 | 0) + k, seed);
      // most stars are faint, a few bright, so the sky reads as depth rather than a scatter of grey squares
      if (tw > 0.12) put(g, x, y, tw > 0.85 ? WHITE : tw > 0.6 ? mix(S[2], WHITE, 0.45) : mix(S[2], WHITE, 0.2));
    }
  }
  // a flame sprite, 4 frames of flicker; c: [outer, mid, core]
  const FLAME = [
    ['..o..', '.ooo.', '.oyo.', 'oyyyo', 'oywyo', '.oyo.'],
    ['...o.', '..oo.', '.ooo.', 'oyyyo', 'oywyo', '.oyo.'],
    ['.o...', '.oo..', '.ooo.', 'oyyyo', 'oywyo', '.oyo.'],
    ['..o..', '..o..', '.ooo.', '.oyo.', 'oywyo', '.oyo.'],
  ].map(K.spr);
  const flameMap = (c) => ({ o: c[0], y: c[1], w: c[2] });
  const FIRE = { warm: ['#ff6a1a', '#ffc23a', '#fff4c0'], blue: ['#2a6aff', '#7ad0ff', '#e8fbff'], green: ['#2ab84a', '#a8f060', '#f0ffd0'], pink: ['#ff3a8a', '#ffa0d0', '#fff0f8'] };
  const fire = k => FIRE[k].map(hx);

  const ogLook = g => g.home || g.alt() < 0.5;
  // Traits: T names what a variation rolled; alt() rolls a new trait from g.alt (the opening variation keeps `home`)
  const T = (g, k, v) => (g.trait ? g.trait(k, v) : v);
  const alt = (g, home, opts) => { if (g.home) return home; let sum = 0; for (const o of opts) sum += o[1]; let r = g.alt() * sum; for (const o of opts) { r -= o[1]; if (r < 0) return o[0]; } return opts[0][0]; };
  const CAP = w => w.charAt(0).toUpperCase() + w.slice(1);
  const SKY_NAMES = ['Midnight', 'Violet', 'Teal Night', 'Ember Night', 'Ink'];
  // helpers the original lamps used
  const B4 = X.bayer(4), dth = (x, y) => B4[(y & 3) * 4 + (x & 3)], disc = X.disc;
  const levels = (dark, lit, k = 6) => Array.from({ length: k }, (_, i) => mix(dark, lit, i / (k - 1)));
  const lvl = (v, k, x, y) => { const q = (v * (k - 1) + dth(x, y)) | 0; return q < 0 ? 0 : q > k - 1 ? k - 1 : q; };

  // Glowworm Cave: the original, exactly, with input hooks that never draw from R
  function glowOG(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R), water = Math.round(58 * s);
      // new traits: how high the cave roof is, and the boat
      const ceil = T(g, 'Ceiling', alt(g, 'Arched', [['Arched', 3], ['High Vault', 1], ['Low', 1]])), boatK = T(g, 'Boat', alt(g, 'Drifting Boat', [['Drifting Boat', 3], ['Lantern Boat', 1], ['No Boat', 0.8]])), cs0 = { Arched: 1, 'High Vault': 0.55, Low: 1.45 }[ceil];
      const roof = Array.from({ length: n }, (_, x) => (20 + 10 * nz.n2(x * 0.04 / s, 0) + 5 * Math.sin(x * 0.11 / s)) * s * cs0);
      const glow = R.pick([[90, 230, 220], [120, 250, 170], [110, 190, 255]]);
      const worms = [];
      for (let k = 0; k < Math.round(240 * s); k++) { const x = R() * n, y = roof[Math.floor(x)] - R.range(0, 10) * s * (R() < 0.6 ? 1 : 0) + R.range(-1, 2) * s; worms.push({ x, y, len: R.range(3, 26) * s * (R() < 0.3 ? 0.3 : 1), ph: R() * TAU, b: R.range(0.55, 1) }); }
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = y < roof[x] ? (nz.n2(x * 0.2 / s, y * 0.2 / s) > 0.2 ? rgb(26, 30, 36) : rgb(16, 18, 24)) : y < water ? rgb(4, 6, 12) : rgb(2, 3, 6);
      let clap = -1;
      T(g, 'Look', 'Classic'); T(g, 'Glow', ['Teal', 'Mint', 'Blue'][[230, 250, 190].indexOf(glow[1])]); T(g, 'Worms', worms.length); T(g, 'Grid', n);
      const GC = rgb(...glow);
      return (t) => {
        if (g.input.taps().length) clap = t;
        // Listen: a clap or a shout in the cave and the glowworms go dark, as real ones do
        // (a listened clap counts at most every 8 s, so music does not keep the cave dark)
        if (g.input.listening && g.input.beats() && g.input.level > 0.15 && t - clap > 8) clap = t;
        d.set(bg);
        for (const w of worms) {
          // after a clap each worm stays dark for a while, then fades back in (no draws from R)
          const back = clap < 0 ? 1 : Math.max(0, Math.min(1, (t - clap - 1 - (w.ph / TAU) * 4) / 2));
          const b = w.b * (0.6 + 0.4 * Math.sin(t * 0.5 + w.ph)) * back, c = mix(BLACK, GC, Math.min(1, b * 1.15));
          if (b < 0.02) continue;
          // the threads first (beads brighter than the silk between), then the worm, with a small halo
          // round the bright ones so they still read on the fine grid at tile size
          for (let k = 1; k < w.len; k++) { const drop = k % 3 === 0; if (drop || k % 2) put(g, w.x, w.y + k, mix(BLACK, GC, b * (drop ? 0.78 : 0.3) * (1 - k / (w.len * 1.4)))); }
          if (b > 0.45) { const hc = mix(BLACK, GC, b * 0.42); put(g, w.x + 1, w.y, hc); put(g, w.x - 1, w.y, hc); put(g, w.x, w.y - 1, hc); }
          put(g, w.x, w.y, c);
        }
        const bx = ((t * 2.5 * s) % (n + 40 * s)) - 20 * s, by = water - 1;
        for (let y = water; y < n; y++) {
          const src = 2 * water - y - 1, wob = Math.round(Math.sin(y * 0.9 + t * 1.2) * (y - water) * 0.03);
          for (let x = 0; x < n; x++) { const sx = Math.min(n - 1, Math.max(0, x + wob)); const v = src >= 0 ? d[src * n + sx] : BLACK; d[y * n + x] = ((v >> 1 & 0x7f7f7f) + (v >> 2 & 0x3f3f3f) | 0xff000000) >>> 0; }
        }
        if (boatK !== 'No Boat') {
          X.poly(g, [bx - 10 * s, by - 2 * s, bx + 12 * s, by - 2 * s, bx + 9 * s, by + s, bx - 8 * s, by + s], BLACK);
          for (const [ox, h] of [[-4, 6], [1, 7], [6, 5.5]]) { rect(g, bx + ox * s - s, by - 2 * s - h * s, 2.5 * s, h * s, BLACK); disc(g, bx + ox * s, by - 2 * s - h * s - s, 1.4 * s, BLACK); }
          for (let x = Math.floor(bx - 10 * s); x < bx + 12 * s; x++) put(g, x, by + s + 1, mix(BLACK, rgb(...glow), 0.25));
          if (boatK === 'Lantern Boat') { const lx2 = bx + 10 * s, ly2 = by - 9 * s; line(g, bx + 8 * s, by - 2 * s, lx2, ly2, rgb(20, 16, 12)); K.glow(g, lx2, ly2 + 2 * s, 5 * s, hx('#ffb04a'), 3, 0.3); rect(g, lx2 - s, ly2 + s, 2 * s, 2 * s, hx('#ffd27a')); for (let k = 1; k < 5; k++) put(g, lx2, water + k * 2 * s, mix(BLACK, hx('#ffb04a'), 0.45 - k * 0.08)); }
        }
        if (boatK !== 'No Boat') for (let x = 0; x < n; x += 1) if (Math.abs(x - bx) < 14 * s && (x + Math.floor(t * 4)) % 3 === 0) put(g, x, water + 2 * s, rgb(30, 40, 50));
      };
  }
  // Glowworm Cave: the reworked look, an extra mode
  function glowNew(R, U, g) {
      const { n, d } = g, s = n / 40, col = hx(R.pick(['#5af0e0', '#7aff9a', '#a08aff', '#5ac8ff'])), rock = K.tones(hx(R.pick(['#2a2630', '#262a2a', '#30261e']))), water = R.bool(0.7), wl = Math.round(n * R.range(0.68, 0.8));
      const roof = Array.from({ length: n }, (_, x) => Math.round((0.12 + 0.08 * Math.sin(x * 0.2 + R.range(0, 6)) + 0.05 * K.hash(x >> 1, 3)) * n));
      const worms = Array.from({ length: R.int(70, 130) }, () => { const x = R.int(0, n - 1); return { x, y: roof[x], len: R.int(2, 12) * s, ph: R.range(0, TAU), dark: 0 }; });
      const tites = Array.from({ length: R.int(4, 9) }, () => ({ x: R.int(0, n - 1), h: R.int(2, 6) * s }));
      let heard = -99;
      T(g, 'Look', 'Chunky'); T(g, 'Glow', ['Teal', 'Mint', 'Violet', 'Blue'][['#5af0e0', '#7aff9a', '#a08aff', '#5ac8ff'].map(hx).indexOf(col)]); T(g, 'Worms', worms.length); T(g, 'River', water ? 'Yes' : 'No');
      return (t) => {
        if (g.input.taps().length) for (const w of worms) w.dark = 1 + K.hash(w.x, w.len, w.ph * 9) * 1.5;
        // a listened clap darkens them more lightly (they are back within about 15 s), at most every 8 s
        else if (g.input.listening && g.input.beats() && g.input.level > 0.15 && t - heard > 8) { heard = t; for (const w of worms) w.dark = Math.max(w.dark, 0.5 + K.hash(w.x, w.len, w.ph * 9) * 0.6); }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y < roof[x] ? (K.hash(x >> 1, y >> 1, 2) < 0.3 ? rock[1] : rock[0]) : y >= wl && water ? hx('#020408') : hx('#03050a');
        for (let x = 0; x < n; x++) { put(g, x, roof[x], mix(rock[2], col, 0.25)); put(g, x, roof[x] - 1, rock[1]); }
        for (const st of tites) for (let k = 0; k < st.h; k++) { const w = Math.max(0, Math.round((1 - k / st.h) * 1.5)); rect(g, st.x - w, roof[st.x] + k, 2 * w + 1, 1, k === st.h - 1 ? mix(rock[2], col, 0.3) : rock[1]); }
        for (const w of worms) {
          w.dark = Math.max(0, w.dark - 0.006);
          const pulse = 0.55 + 0.45 * Math.sin(t * 0.6 + w.x * 0.15 + w.ph), on = w.dark <= 0 ? pulse : Math.max(0, pulse - w.dark * 2);
          if (on <= 0.05) continue;
          const c = mix(hx('#03050a'), col, on);
          for (let k = 0; k < w.len; k++) put(g, w.x, w.y + 1 + k, (k & 1) ? mix(hx('#03050a'), col, on * 0.75) : mix(hx('#03050a'), col, on * 0.25));
          put(g, w.x, w.y + 1 + w.len, c);
          if (on > 0.6) K.glow(g, w.x + 0.5, w.y + 1, 2.2 * s, col, 2, 0.25 * on);
        }
        if (water) for (let y = wl; y < n; y++) for (let x = 0; x < n; x++) { const my = 2 * wl - y - 1, i = y * n + x; if (my > 0) { const c = d[my * n + x + (((y + (t * 3 | 0)) & 3) === 0 ? 1 : 0)]; d[i] = c === hx('#03050a') || c === undefined ? hx('#020408') : shade(c, 0.55); } }
      };
  }

  // Moths: the original, exactly, with input hooks that never draw from R
  function mothOG(R, U, g) {
      const { n, d } = g, s = n / 100, fall = new Float32Array(n * n);
      let bx = n / 2, by = n * 0.4, Rm = R, lastX = -1, lastY = -1;
      const wood = R.pick([[110, 80, 60], [90, 100, 110], [120, 110, 90]]), wallL = levels(rgb(4, 4, 6), rgb(...wood), 7), plankL = levels(rgb(2, 2, 3), rgb(...wood.map(c => c * 0.75)), 7);
      let fallK = 0.03;
      const light = () => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const dx = x - bx, dy = y - by; fall[y * n + x] = 1 / (1 + (dx * dx + dy * dy) / (n * n * fallK)); } };
      light();
      const moths = Array.from({ length: Math.round(22 * s + 6) }, () => ({ x: R() * n, y: R() * n, h: R() * TAU, side: R.sign(), ang: R.range(1.2, 1.45), away: 0, trail: [] }));
      T(g, 'Look', 'Classic'); T(g, 'Porch', ['Cedar', 'Slate', 'Oak'][[110, 90, 120].indexOf(wood[0])]); T(g, 'Grid', n);
      // new traits: the light, the wall it hangs on, and how many moths it has drawn
      const lampK = T(g, 'Light', alt(g, 'Bare Bulb', [['Bare Bulb', 3], ['Lantern', 1], ['Globe Lamp', 1]])), wallK = T(g, 'Wall', alt(g, 'Planks', [['Planks', 3], ['Brick', 1], ['Stone', 1]])), swarm = T(g, 'Moths', alt(g, 'Cloud', [['Cloud', 3], ['A Few', 1], ['Swarm', 1]]));
      if (swarm === 'A Few') moths.splice(Math.round(moths.length * 0.4));
      const night = T(g, 'Night', alt(g, 'Dark', [['Dark', 3], ['Moonlit', 1], ['Misty', 1]]));
      if (night === 'Moonlit') { wallL.splice(0, 7, ...levels(rgb(26, 32, 52), rgb(...wood), 7)); plankL.splice(0, 7, ...levels(rgb(14, 18, 32), rgb(...wood.map(c => c * 0.75)), 7)); }
      if (night === 'Misty') fallK = 0.075;
      // new traits: where the light hangs, and a moonlit window on the wall
      const spot = T(g, 'Hangs', alt(g, 'Centre', [['Centre', 1.5], ['High Corner', 1], ['Low', 1], ['By the Wall', 1]])), side = g.alt() < 0.5 ? -1 : 1, win = T(g, 'Window', alt(g, 'None', [['None', 2], ['Moonlit Window', 1]]));
      if (spot === 'High Corner') { bx = n / 2 + side * n * 0.28; by = n * 0.2; } else if (spot === 'Low') { by = n * 0.68; } else if (spot === 'By the Wall') { bx = n / 2 + side * n * 0.36; by = n * 0.46; }
      const wx0 = Math.round(spot === 'Centre' || spot === 'Low' ? n * 0.08 : n / 2 - side * n * 0.3 - n * 0.12), wy0 = Math.round(n * 0.12), ww = Math.round(n * 0.24), wh = Math.round(n * 0.32);
      if (!g.home) light();
      if (swarm === 'Swarm') { const A = g.alt; for (let k = 0, m0 = moths.length; k < m0; k++) moths.push({ x: A() * n, y: A() * n, h: A() * TAU, side: A() < 0.5 ? -1 : 1, ang: A.range(1.2, 1.45), away: 0, trail: [] }); }
      const b9 = Math.round(9 * s), b4 = Math.max(2, Math.round(4 * s)), b8 = Math.round(8 * s);
      const seam = (x, y) => wallK === 'Brick' ? y % b4 === 0 || (x + ((y / b4 | 0) & 1) * (b8 >> 1)) % b8 === 0 : wallK === 'Stone' ? K.hash((x / b8) | 0, (y / b4) | 0, 4) < 0.5 ? (x % b8 === 0 || y % b4 === 0) : (y % b4 === 0) : ((x / (9 * s)) | 0) % 2 === 0 && x % b9 === 0;
      return (t, dt) => {
        // the pointer carries the light; once it has moved, the moths take their chances from g.alt so R stays the original's
        if (g.input.inside) { bx += (g.input.x * n - bx) * 0.25; by += (g.input.y * n - by) * 0.25; Rm = g.alt; }
        // Listen: a clap scatters the moths away from the light (they drift back in)
        if (g.input.listening && g.input.beats() && g.input.level > 0.1) { Rm = g.alt; for (const m of moths) { m.away = Rm.range(0.5, 1.3); m.h = Math.atan2(by - m.y, bx - m.x) + Math.PI + Rm.range(-0.8, 0.8); } }
        if (Math.abs(bx - lastX) > 0.4 || Math.abs(by - lastY) > 0.4) { if (lastX >= 0) light(); lastX = bx; lastY = by; }
        const hum = 0.92 + 0.08 * Math.sin(t * 40);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const i = y * n + x; d[i] = seam(x, y) ? plankL[lvl(fall[i] * hum, 7, x, y)] : wallL[lvl(fall[i] * hum, 7, x, y)]; }
        if (win !== 'None') { rect(g, wx0 - s, wy0 - s, ww + 2 * s, wh + 2 * s, rgb(10, 10, 12)); for (let y = 0; y < wh; y++) for (let x = 0; x < ww; x++) d[(wy0 + y) * n + wx0 + x] = (x + y) % 9 === 0 ? rgb(60, 80, 130) : y < wh * 0.5 ? rgb(34, 46, 84) : rgb(26, 36, 66); K.ell(g, wx0 + ww * 0.7, wy0 + wh * 0.28, 2.5 * s, 2.5 * s, rgb(230, 232, 210)); rect(g, wx0 + ww / 2 - s / 2, wy0, Math.max(1, s), wh, rgb(10, 10, 12)); rect(g, wx0, wy0 + wh / 2, ww, Math.max(1, s), rgb(10, 10, 12)); }
        if (lampK === 'Lantern') {
          line(g, bx, 0, bx, by - 6 * s, rgb(20, 20, 20)); rect(g, bx - 3 * s, by - 6 * s, 6 * s, 1.5 * s, rgb(30, 30, 34)); disc(g, bx, by, 2.6 * s, rgb(255, 236, 180)); disc(g, bx, by, 1.4 * s, WHITE);
          for (const ox of [-3, 3]) rect(g, bx + ox * s - (ox > 0 ? s : 0), by - 5 * s, Math.max(1, s), 9 * s, rgb(30, 30, 34)); rect(g, bx - 3 * s, by + 4 * s, 6 * s, 1.5 * s, rgb(30, 30, 34));
        } else if (lampK === 'Globe Lamp') {
          rect(g, 0, by - 0.5 * s, bx, Math.max(1, s), rgb(30, 30, 34)); rect(g, bx - s, by - 4 * s, 2 * s, 1.5 * s, rgb(90, 80, 60));
          disc(g, bx, by, 4 * s, rgb(240, 236, 220)); disc(g, bx, by, 3 * s, rgb(255, 250, 230)); disc(g, bx - s, by - s, 1.2 * s, WHITE);
        } else {
          line(g, bx, 0, bx, by - 4 * s, rgb(20, 20, 20)); rect(g, bx - 1.5 * s, by - 5 * s, 3 * s, 2 * s, rgb(90, 90, 90));
          disc(g, bx, by, 3 * s, rgb(255, 250, 220)); disc(g, bx, by, 1.6 * s, WHITE);
        }
        for (const m of moths) {
          const dx = bx - m.x, dy = by - m.y, dist = Math.hypot(dx, dy), toL = Math.atan2(dy, dx);
          if (m.away > 0) m.away -= dt;
          else {
            let want = toL + m.side * m.ang, dh = ((want - m.h + Math.PI * 3) % TAU) - Math.PI;
            m.h += dh * Math.min(1, dt * 6);
            if (dist < 4 * s) { m.away = Rm.range(0.4, 1.4); m.h = toL + Math.PI + Rm.range(-1, 1); m.side = Rm.sign(); m.ang = Rm.range(1.2, 1.45); }
          }
          m.h += Math.sin(t * 7 + m.ang * 10) * 0.08;
          m.x += Math.cos(m.h) * 14 * s * dt; m.y += Math.sin(m.h) * 14 * s * dt;
          if (m.x < -5 || m.y < -5 || m.x > n + 5 || m.y > n + 5) { m.h = toL; }
          m.trail.unshift([m.x, m.y]); if (m.trail.length > 10) m.trail.pop();
          const li = 1 / (1 + dist * dist / (n * n * 0.04));
          for (let k = 2; k < m.trail.length; k += 2) put(g, m.trail[k][0], m.trail[k][1], mix(d[0], rgb(200, 190, 160), li * 0.25));
          const c = mix(rgb(60, 54, 44), rgb(240, 226, 190), Math.min(1, li * 1.6)), open = Math.floor(t * 14 + m.ang * 20) % 2, k = Math.max(1, Math.round(s));
          put(g, m.x, m.y, c);
          if (open) { rect(g, m.x - k, m.y, k, k, c); rect(g, m.x + k, m.y, k, k, c); } else rect(g, m.x, m.y - k, k, k, shade(c, 0.8));
        }
      };
  }
  // Moths: the reworked look, an extra mode
  function mothNew(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SKIES), seed = R.int(1, 99), lamp = R.pick(['porch', 'street', 'lantern']), warm = hx(R.pick(['#ffd27a', '#fff4e0', '#c8f0ff', '#ffb36b']));
      const wall = R.pick([hx('#1a1612'), hx('#121a1e'), null]);
      const moths = Array.from({ length: R.int(12, 30) }, () => ({ a: R.range(0, TAU), r: R.range(4, 18) * s, w: R.range(0.04, 0.12) * R.sign(), k: R.range(0.002, 0.006), c: hx(R.pick(['#c8b89a', '#e8e0d0', '#a89070', '#f0e8c0', '#d8c0e8'])), out: R.bool() }));
      let lx = n / 2, ly = n * 0.4;
      T(g, 'Look', 'Chunky'); T(g, 'Light', { porch: 'Porch Lamp', street: 'Street Lamp', lantern: 'Lantern' }[lamp]); T(g, 'Wall', wall ? 'Wall' : 'Open Sky'); T(g, 'Moths', moths.length);
      const spot = T(g, 'Hangs', alt(g, 'Centre', [['Centre', 1.5], ['High Corner', 1], ['Low', 1], ['By the Wall', 1]])), side = g.alt() < 0.5 ? -1 : 1;
      const hx0 = spot === 'High Corner' ? n / 2 + side * n * 0.28 : spot === 'By the Wall' ? n / 2 + side * n * 0.34 : n / 2, hy0 = spot === 'High Corner' ? n * 0.22 : spot === 'Low' ? n * 0.66 : spot === 'By the Wall' ? n * 0.46 : n * 0.4;
      lx = hx0; ly = hy0;
      return (t) => {
        if (g.input.inside) { lx += (g.input.x * n - lx) * 0.2; ly += (g.input.y * n - ly) * 0.2; }
        else { lx += (hx0 + Math.sin(t * 0.2) * n * 0.08 - lx) * 0.05; ly += (hy0 - ly) * 0.05; }
        if (g.input.listening && g.input.beats() && g.input.level > 0.1) for (const m of moths) { m.r = Math.min(20 * s, m.r + 7 * s); m.out = true; }
        if (wall) { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((y % 5 === 0) || ((x + ((y / 5 | 0) & 1) * 4) % 8 === 0)) ? shade(wall, 0.75) : wall; }
        else sky(g, S, n, t, 40, seed);
        K.glow(g, lx, ly, n * 0.45, warm, 6, 0.35);
        // the lamp
        if (lamp === 'porch') { rect(g, lx - 3 * s, ly - 6 * s, 6 * s, 2 * s, hx('#2a2a30')); rect(g, lx - s, ly - 4 * s, 2 * s, s, hx('#3a3a40')); }
        if (lamp === 'street') { rect(g, lx - 0.5, ly - 3 * s, 1, n, hx('#1a1a20')); rect(g, lx - 4 * s, ly - 4 * s, 8 * s, 2 * s, hx('#2a2a30')); }
        if (lamp === 'lantern') { rect(g, lx - 3 * s, ly - 3 * s, 6 * s, 7 * s, hx('#2a2a30')); rect(g, lx - 2 * s, ly - 2 * s, 4 * s, 5 * s, mix(warm, WHITE, 0.3)); }
        K.ell(g, lx, ly, 2 * s, 2.4 * s, (x, y, nx, ny) => nx < -0.2 && ny < -0.2 ? WHITE : mix(warm, WHITE, 0.5));
        for (const m of moths) {
          m.a += m.w; m.r += m.out ? m.k * 40 : -m.k * 40 * (m.r / (10 * s));
          if (m.r < 1.5 * s) m.out = true; if (m.r > 20 * s) m.out = false;
          const x = lx + Math.cos(m.a) * m.r, y = ly + Math.sin(m.a) * m.r * 0.8, flap = ((t * 18 + m.a * 3) | 0) & 1;
          put(g, x, y, m.c); put(g, x + 1, y, m.c);
          if (flap) { put(g, x - 1, y - 1, m.c); put(g, x + 2, y - 1, m.c); } else { put(g, x - 1, y, shade(m.c, 0.7)); put(g, x + 2, y, shade(m.c, 0.7)); }
        }
      };
  }

  // Stage Lights: the original, exactly, with input hooks that never draw from R
  function stageOG(R, U, g) {
      const { n, d } = g, s = n / 100, nz = U.noise(R), haze = new Float32Array(n * 2 * n), floorY = Math.round(78 * s);
      for (let y = 0; y < n; y++) for (let x = 0; x < 2 * n; x++) haze[y * 2 * n + x] = 0.55 + 0.45 * nz.fbm(x * 0.05 / s, y * 0.07 / s, 0, 3);
      const m = R.int(4, 6), h0 = R.range(0, 100), fixtures = Array.from({ length: m }, (_, k) => ({ x: (k + 0.5) / m * n, ph: R() * TAU, w: R.range(0.25, 0.5), amp: R.range(0.3, 0.6), half: R.range(0.07, 0.12), hue: h0 + k * R.range(8, 25) }));
      const acc = new Float32Array(n * n * 3), DARK0 = rgb(6, 6, 10), DARK1 = rgb(12, 12, 16);
      let strobe = 0, swing = 0, hueKick = 0, kick = 0;
      T(g, 'Look', 'Classic'); T(g, 'Lights', m); T(g, 'Grid', n);
      // new trait: who is on the stage
      const act = T(g, 'Act', alt(g, 'Singer', [['Singer', 3], ['Band', 1.2], ['Dancer', 1], ['Empty Stage', 0.6]]));
      return (t) => {
        if (g.input.taps().length) strobe = 4;
        // Listen: the beams swell with the music, swing faster when it is loud, and hit a short strobe on each beat
        // (no white flash from sound: a beat kicks the beams brighter instead, which is kinder to the eyes)
        const L = g.input.listening;
        if (L) { swing += g.input.level * 0.06; if (g.input.beats()) { kick = 1; hueKick += 9; } }
        kick *= 0.75;
        const gain = L ? 0.55 + g.input.level * 0.9 + kick * 0.7 : 1;
        acc.fill(0);
        const off = Math.floor(t * 2) % n;
        for (const f of fixtures) {
          // aimed at the pointer when there is one
          const th = g.input.inside ? Math.max(-1.2, Math.min(1.2, Math.atan2(g.input.x * n - f.x, Math.max(1, g.input.y * n - 6 * s)))) : Math.sin(t * f.w + f.ph + swing) * f.amp, dx0 = Math.sin(th), dy0 = Math.cos(th), tan = Math.tan(f.half);
          const col = U.hsb(f.hue + t * 2 + hueKick, 90, 100), cr = col[0] / 255 * gain, cg = col[1] / 255 * gain, cb = col[2] / 255 * gain;
          const ta = Math.tan(th - f.half), tb = Math.tan(th + f.half);
          for (let y = Math.ceil(6 * s); y < floorY; y++) {
            const vy = y - 6 * s, xa = Math.max(0, Math.floor(f.x + vy * ta) - 1), xb = Math.min(n - 1, Math.ceil(f.x + vy * tb) + 1);
            for (let x = xa; x <= xb; x++) {
              const vx = x - f.x, along = vx * dx0 + vy * dy0;
              if (along <= 0) continue;
              const perp = Math.abs(vx * dy0 - vy * dx0), w = along * tan;
              if (perp > w) continue;
              const k = (1 - perp / w) * 0.55 * haze[(y | 0) * 2 * n + x + off], i = ((y | 0) * n + x) * 3;
              acc[i] += cr * k; acc[i + 1] += cg * k; acc[i + 2] += cb * k;
            }
          }
          // a pool where the beam lands
          const ly = floorY + 3 * s, lx = f.x + (ly - 6 * s) * dx0 / dy0, pw = (ly - 6 * s) * tan * 1.2;
          for (let y = floorY; y < floorY + 8 * s && y < n; y++) for (let x = Math.floor(lx - pw); x <= lx + pw; x++) { if (x < 0 || x >= n) continue; const q = ((x - lx) / pw) ** 2 + ((y - ly) / (3 * s)) ** 2; if (q < 1) { const i = (y * n + x) * 3; acc[i] += cr * 0.7; acc[i + 1] += cg * 0.7; acc[i + 2] += cb * 0.7; } }
        }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, j = i * 3, b = dth(x, y) * 0.25 - 0.12, base = y < floorY ? 6 : 12;
          const r = acc[j], gg = acc[j + 1], bb = acc[j + 2];
          if (r === 0 && gg === 0 && bb === 0) { d[i] = y < floorY ? DARK0 : DARK1; continue; }
          const qr = Math.min(255, Math.max(0, Math.round((r + b) * 4) * 64)), qg = Math.min(255, Math.max(0, Math.round((gg + b) * 4) * 64)), qb = Math.min(255, Math.max(0, Math.round((bb + b) * 4) * 64));
          d[i] = rgb(base + qr, base + qg, base + 4 + qb);
        }
        rect(g, 0, 2 * s, n, 2 * s, rgb(70, 70, 76));
        for (const f of fixtures) { rect(g, f.x - 2 * s, 3 * s, 4 * s, 4 * s, rgb(30, 30, 34)); rect(g, f.x - s, 6 * s, 2 * s, s, rgb(255, 255, 255)); }
        // the singer and the mic stand (or the band, a dancer, or an empty stage)
        const sx = n / 2 + Math.sin(t * 0.8) * s, sy = floorY, SIL = rgb(4, 4, 6);
        const person = (px, ph, sc) => { X.poly(g, [px - 5 * s * sc, sy, px + 5 * s * sc, sy, px + 3 * s * sc, sy - 18 * s * sc, px - 3 * s * sc, sy - 18 * s * sc], SIL); disc(g, px, sy - 21 * s * sc, 3.2 * s * sc, SIL); };
        if (act !== 'Dancer') { if (act !== 'Empty Stage') person(sx, 0, 1); line(g, n / 2 + 6 * s, sy, n / 2 + 6 * s, sy - 20 * s, rgb(10, 10, 12)); line(g, n / 2 + 6 * s, sy - 20 * s, sx + 2 * s, sy - 20 * s, rgb(10, 10, 12)); }
        if (act === 'Band') {
          const gx = n * 0.24 + Math.sin(t * 1.1) * s; person(gx, 1, 0.9); K.thick(g, gx - 5 * s, sy - 9 * s, gx + 6 * s, sy - 13 * s, Math.max(2, Math.round(1.5 * s)), SIL); disc(g, gx - 3 * s, sy - 8 * s, 2.6 * s, SIL);
          const dx = n * 0.76; disc(g, dx, sy - 5 * s, 5 * s, SIL); rect(g, dx - 9 * s, sy - 10 * s, 5 * s, 1.2 * s, SIL); rect(g, dx + 4 * s, sy - 12 * s, 5 * s, 1.2 * s, SIL); person(dx, 2, 0.8);
        }
        if (act === 'Dancer') {
          const sw = Math.sin(t * 1.6), px = n / 2 + sw * 6 * s; person(px, 0, 0.95);
          K.thick(g, px, sy - 16 * s, px - 8 * s, sy - 24 * s + sw * 4 * s, Math.max(2, Math.round(1.4 * s)), SIL); K.thick(g, px, sy - 16 * s, px + 8 * s, sy - 22 * s - sw * 4 * s, Math.max(2, Math.round(1.4 * s)), SIL);
        }
        if (strobe > 0) { strobe--; if (strobe > 1) for (let i = 0; i < n * n; i++) d[i] = mix(d[i], WHITE, 0.7); }
      };
  }
  // Stage Lights: the reworked look, an extra mode
  function stageNew(R, U, g) {
      const { n, d } = g, s = n / 40, m = R.int(3, 6), PAL = R.pick([['#ff2a6a', '#2a8aff', '#ffd23a'], ['#ff00d0', '#00e0ff'], ['#ffffff'], ['#2aff6a', '#ff6a00', '#8a2aff'], ['#ff3a3a', '#ff9a2a']]).map(hx);
      const heads = Array.from({ length: m }, (_, k) => ({ x: n * (k + 0.5) / m, c: PAL[k % PAL.length], ph: R.range(0, TAU), w: R.range(0.06, 0.12) })), haze = hx('#0c0a14');
      const crowd = Array.from({ length: n }, (_, x) => Math.round((0.1 + 0.06 * K.hash(x >> 1, 5) + (K.hash(x >> 2, 9) > 0.8 ? 0.06 : 0)) * n));
      let strobe = 0, swing = 0, kick = 0;
      const smoke = T(g, 'Haze', alt(g, 'Clear', [['Clear', 3], ['Smoke', 1]]));
      T(g, 'Look', 'Chunky'); T(g, 'Gels', ['Pop', 'Neon', 'White', 'Acid', 'Fire'][['#ff2a6a', '#ff00d0', '#ffffff', '#2aff6a', '#ff3a3a'].map(hx).indexOf(PAL[0])]); T(g, 'Lights', m);
      return (t) => {
        if (g.input.taps().length) strobe = 4;
        const L = g.input.listening;
        if (L) { swing += g.input.level * 0.08; if (g.input.beats()) kick = 1; }
        kick *= 0.75;
        const widen = L ? 0.7 + g.input.level * 0.8 + kick * 0.6 : 1;
        strobe = Math.max(0, strobe - 1);
        for (let i = 0; i < n * n; i++) d[i] = haze;
        if (smoke === 'Smoke') for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (K.hash((x + (t * 2 | 0)) >> 2, y >> 2, 6) < 0.35) d[y * n + x] = hx('#1a1626');
        rect(g, 0, 0, n, 2 * s, hx('#2a2a30')); for (let x = 0; x < n; x += 2) put(g, x, s, hx('#4a4a54'));
        for (const h of heads) {
          const tx = g.input.inside ? g.input.x * n : n / 2 + Math.sin(t * 0.7 + h.ph + swing) * n * 0.45, ty = n, hw = h.w * widen;
          const ax = tx - h.x, ay = ty - 2 * s, len = Math.hypot(ax, ay), ux = ax / len, uy = ay / len;
          for (let y = Math.ceil(2 * s); y < n; y++) for (let x = 0; x < n; x++) {
            const px = x + 0.5 - h.x, py = y + 0.5 - 2 * s, along = px * ux + py * uy, across = Math.abs(px * uy - py * ux);
            if (along > 0 && across < 0.6 + along * hw) { const i = y * n + x; d[i] = mix(d[i], h.c, across < along * hw * 0.4 ? 0.45 : 0.25); }
          }
          rect(g, h.x - 1.5 * s, 2 * s, 3 * s, 2 * s, hx('#1a1a20')); put(g, h.x, 4 * s, mix(h.c, WHITE, 0.6));
        }
        for (let x = 0; x < n; x++) for (let y = n - crowd[x]; y < n; y++) d[y * n + x] = BLACK;
        for (let k = 0; k < n / 3; k++) { const x = K.hash(k, 1) * n, up = Math.sin(t * 4 + k) > 0.3; if (up) { const y = n - crowd[x | 0]; rect(g, x, y - 3 * s, 1, 3 * s, BLACK); } }
        if (strobe > 2) for (let i = 0; i < n * n; i++) d[i] = mix(d[i], WHITE, 0.7);
      };
  }

  add({
    name: 'Candles', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click a candle to blow it out or light it again.',
    listens: 'The flames dance with the noise in the room and duck low at every clap.',
    recipe: 'A cluster of candles of every height in a dark room, each flame a flickering sprite in a stepped halo that lights the wall behind. Wax drips and the candles slowly burn down. Click one to blow it out, and again to light it.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, Lr = K.layer(n), ink = hx('#0a0608');
      const WAX = R.pick([['#f2ece0'], ['#c8102e', '#f2ece0'], ['#f2ece0', '#e8c890', '#d0a070'], ['#1d1d24', '#3a3a44'], ['#ff6f91', '#ffc75f', '#00c9a7', '#845ec2'], ['#2f6db5', '#f2ece0']]).map(hx);
      const wall = hx(R.pick(['#1c1418', '#14181c', '#201612', '#16121e'])), brick = R.bool(0.45), table = K.tones(hx(R.pick(['#5a3420', '#2a2a34', '#6a5a4a']))), flameK = R.pick(['warm', 'warm', 'warm', 'blue', 'green', 'pink']), F = fire(flameK);
      const holder = R.pick(['none', 'sticks', 'jars', 'plate']), edge = Math.round(n * 0.8);
      const cs = [], m = R.int(3, 7);
      for (let k = 0; k < m; k++) cs.push({ x: n * (0.12 + 0.76 * (k + 0.5) / m) + R.range(-1.5, 1.5) * s, w: R.int(2, 4) * s, h: R.range(0.14, 0.4) * n, c: K.tones(R.pick(WAX)), lit: true, ph: R.range(0, 10), smoke: 0, drips: Array.from({ length: R.int(0, 3) }, () => [R.range(-0.8, 0.8), R.range(1, 4)]) });
      cs.sort((a, b) => a.h - b.h);
      T(g, 'Wax', ['Ivory', 'Red and Ivory', 'Beeswax', 'Black', 'Candy', 'Blue and Ivory'][[1, 2, 3, 2, 4, 2].findIndex((l, i) => l === WAX.length && hx(['#f2ece0', '#c8102e', '#f2ece0', '#1d1d24', '#ff6f91', '#2f6db5'][i]) === WAX[0])]); T(g, 'Flame', CAP(flameK)); T(g, 'Holder', { none: 'None', sticks: 'Brass Sticks', jars: 'Jars', plate: 'Plate' }[holder]); T(g, 'Candles', cs.length); T(g, 'Wall', brick ? 'Brick' : 'Plaster');
      let fph = 0, gut = 0;
      return (t) => {
        for (const tp of g.input.taps()) for (const c of cs) if (Math.abs(tp.x * n - c.x) < c.w + s && tp.y * n < edge + 2 && tp.y * n > edge - c.h - 8 * s) { c.lit = !c.lit; if (!c.lit) c.smoke = 30; }
        // Listen: the flames dance faster in a loud room and gutter low on every clap or beat
        const L = g.input.listening;
        if (L) { fph += g.input.level * 2.5; if (g.input.beats()) gut = 1; }
        gut *= 0.82;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = y < edge ? (brick && ((y % 4 === 0) || ((x + ((y >> 2) & 1) * 3) % 6 === 0)) ? shade(wall, 0.7) : wall) : y === edge ? table[3] : table[2];
        // halos first, so the candles sit in front of their own light
        for (const c of cs) if (c.lit) { const top = edge - c.h; K.glow(g, c.x, top - 3 * s, 10 * s, F[1], 4, gut > 0.02 || L ? 0.32 * (1 - gut * 0.5) * (L ? 0.9 + g.input.level * 0.3 : 1) : 0.32); }
        for (const c of cs) {
          const top = Math.round(edge - c.h + (t * 0.05 % 5) * 0);
          const holderY = holder === 'sticks' ? 3 * s : 0;
          K.lathe(Lr, c.x, top - holderY, edge - holderY, () => c.w, c.c, -0.55);
          rect(Lr, c.x - c.w, top - holderY, c.w * 2, 1, c.c[4]);
          for (const [dx, len] of c.drips) rect(Lr, c.x + dx * c.w, top - holderY, 1, len * s, c.c[3]);
          if (holder === 'sticks') { rect(Lr, c.x - s, edge - holderY, 2 * s, holderY, hx('#c9a227')); K.ell(Lr, c.x, edge - 0.5, c.w + 2 * s, 1.2 * s, hx('#a8861a')); }
          if (holder === 'jars') for (let y = Math.round(edge - c.h * 0.6); y < edge; y++) for (let x = Math.round(c.x - c.w - 1.5 * s); x < c.x + c.w + 1.5 * s; x++) { const i = y * n + x; if (x >= 0 && x < n) Lr.d[i] = mix(Lr.d[i] || d[i], hx('#a8d8e8'), 0.35); }
          K.commit(g, Lr, ink);
          put(g, c.x, top - holderY - 1, ink);   // the wick
          if (c.lit) {
            const fr = gut > 0.35 ? FLAME[3] : FLAME[((t * 10 + fph + c.ph * 7) | 0) % 4], sc = Math.max(1, Math.round(s));
            K.blit(g, fr, c.x - 2 * sc, top - holderY - 1 - fr.h * sc, flameMap(F), false, sc);
          } else if (c.smoke > 0) {
            c.smoke -= 0.25;
            for (let k = 0; k < 6; k++) put(g, c.x + Math.sin(t * 2 + k) * (k * 0.3), top - holderY - 2 - k * 1.5 * s, mix(wall, WHITE, 0.25 * c.smoke / 30));
          }
        }
        if (holder === 'plate') { K.ell(g, n / 2, edge + 1.5 * s, n * 0.44, 2.2 * s, (x, y, nx, ny) => ny < 0 ? 0 : hx('#c9a227')); }
      };
    },
  });

  add({
    name: 'Sky Lanterns', seed: 3, sizes: [40, 50], fps: 12,
    interactive: 'Click to let a lantern go from where you click.',
    recipe: 'Paper lanterns lift off a dark shore one after another and drift up into a banded night sky, swaying, shrinking with distance to single glowing cells, and doubled in the water below. Click to let one go.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SKIES), ground = R.pick(['lake', 'hills', 'city', 'roofs']), horizon = Math.round(n * R.range(0.6, 0.72)), seed = R.int(1, 99);
      const COL = R.pick([['#ff8a2a', '#ffd06a'], ['#ff4a3a', '#ffb07a'], ['#ff6aa8', '#ffd0e8'], ['#f2e8c8', '#ffffff'], ['#ffb02a', '#fff0a0']]).map(hx);
      // a paper lantern: a rounded top in shade, paper lit from inside (brightest near the flame), an open
      // bottom with the burner showing
      const big = K.spr(['.ooo.', 'oLLLo', 'oLllo', 'oLllo', '.lll.', '..y..']), mid = K.spr(['oo', 'll', '.y']);
      const lanterns = [];
      const launch = (x, y) => lanterns.push({ x, y, z: 1, vx: R.range(-0.08, 0.08), ph: R.range(0, TAU) });
      for (let k = 0; k < R.int(8, 16); k++) { launch(R.range(0.1, 0.9) * n, horizon - 2); const l = lanterns[lanterns.length - 1]; l.z = R.range(0.1, 1); l.y = horizon - (1 - l.z) * horizon * 1.1; }
      let next = 0;
      // new traits: how many lanterns go up, and the moon
      const crowd = T(g, 'Release', alt(g, 'Steady', [['Steady', 3], ['Festival', 1], ['A Few', 1]])), gapK = { Steady: 1, Festival: 0.45, 'A Few': 2.2 }[crowd], moonK = T(g, 'Moon', alt(g, 'None', [['None', 3], ['Full', 1], ['Crescent', 1]]));
      if (crowd === 'A Few') lanterns.splice(Math.ceil(lanterns.length / 3));
      if (crowd === 'Festival') { const A = g.alt; for (let k = 0; k < 14; k++) { const z = A.range(0.1, 0.9); lanterns.push({ x: A.range(0.08, 0.92) * n, y: horizon - (1 - z) * horizon * 1.1, z, vx: A.range(-0.08, 0.08), ph: A.range(0, TAU) }); } }
      T(g, 'Sky', SKY_NAMES[SKIES.indexOf(S)]); T(g, 'Shore', { lake: 'Lake', hills: 'Hills', city: 'City Lights', roofs: 'Rooftops' }[ground]); T(g, 'Paper', ['Orange', 'Red', 'Pink', 'Ivory', 'Gold'][['#ff8a2a', '#ff4a3a', '#ff6aa8', '#f2e8c8', '#ffb02a'].map(hx).indexOf(COL[0])]);
      const fieldA = mix(S[3], S[1], 0.35), fieldB = mix(S[3], S[1], 0.55), townC = mix(S[3], S[0], 0.4), PERSON = K.spr(['.k.', 'kkk', 'kkk', '.k.', 'k.k']);
      const town = []; for (let x = -2, k = 0; x < n; k++) { const w = Math.round((5 + 4 * K.hash(k, 21, seed)) * s); town.push({ x, w, y: Math.round(horizon + (0.25 + 0.45 * K.hash(k, 22, seed)) * (n - horizon)) }); x += w + 1; }
      const folk = Array.from({ length: 4 }, (_, k) => ({ x: Math.round((0.1 + 0.8 * (k + K.hash(k, 31, seed)) / 4) * n), y: Math.round(horizon + (0.35 + 0.5 * K.hash(k, 32, seed)) * (n - horizon)), f: K.hash(k, 33, seed) > 0.5 }));
      const sil = Array.from({ length: n }, (_, x) => ground === 'hills' ? Math.round((Math.sin(x * 0.11) * 0.5 + 0.5) * 6 * s + 2) : ground === 'city' ? Math.round(K.hash(x >> 2, 4, seed) * 9 * s + 2) : ground === 'roofs' ? Math.round(4 * s + Math.abs(((x + 3) % (10 * s | 0 || 10)) - 5 * s) * 0.8) : 1);
      return (t) => {
        for (const tp of g.input.taps()) if (lanterns.length < 48) launch(tp.x * n, Math.min(tp.y * n, horizon - 2));
        if (t > next) { launch(R.range(0.08, 0.92) * n, horizon - 2); next = t + R.range(1.4, 3.5) * gapK; }
        sky(g, S, horizon, t, 50, seed);
        if (moonK !== 'None') { const mx = n * (0.15 + 0.7 * (seed % 10) / 10), my = horizon * 0.22; K.glow(g, mx, my, 5 * s, hx('#f4eed0'), 2, 0.15); K.ell(g, mx, my, 2.6 * s, 2.6 * s, hx('#f4eed0')); if (moonK === 'Crescent') K.ell(g, mx + 1.2 * s, my - 0.6 * s, 2.4 * s, 2.4 * s, S[0]); }
        // silhouette and the water below
        for (let x = 0; x < n; x++) for (let y = horizon - sil[x]; y < horizon; y++) { const i = y * n + x; d[i] = ground === 'city' && K.hash(x, y, seed) > 0.93 ? COL[1] : S[3]; }
        const wet = ground === 'lake' || ground === 'city';
        for (let y = horizon; y < n; y++) for (let x = 0; x < n; x++) {
          const my = 2 * horizon - y - 1, i = y * n + x, src = my >= 0 ? d[my * n + x] : S[0], wob = ((y + (t * 4 | 0)) % 3 === 0);
          // water mirrors the sky with drifting ripple lines; dry ground is a dark field in two bands
          if (wet) { const rip = ((x + Math.round(Math.sin(y * 1.7 + t * 0.8) * 3) + (y * 5)) % 11) < 3 && (y & 1); d[i] = rip ? mix(shade(src, 0.75), S[2], 0.35) : wob ? shade(src, 0.5) : shade(src, 0.75); }
          else d[i] = y === horizon ? S[3] : (y - horizon) % 4 === 0 && ((x + y) % 7) < 3 ? fieldB : fieldA;
        }
        if (ground === 'roofs') {
          // the near rooftops of the town the lanterns rise from, a few windows still lit
          for (const r of town) { for (let y = r.y; y < n; y++) for (let x = r.x; x < r.x + r.w && x < n; x++) { const i = y * n + x, row = y - r.y; d[i] = x === r.x ? shade(S[3], 1.2) : row >= 2 && (row % 3) === 1 && ((x - r.x) % 3) === 1 && K.hash(x, y, seed) > 0.7 ? mix(COL[1], S[3], 0.35) : townC; } for (let k = 0; k < r.w / 2; k++) rect(g, r.x + k, r.y - Math.round(k * 0.6) - 1, r.w - 2 * k, 1, townC); }
        } else if (!wet) {
          // people on the hillside, each with the warm light of the lantern they are about to let go
          for (const p of folk) { const lx = p.x + (p.f ? 0 : 2), ly = p.y - 7; K.glow(g, lx + 0.5, ly + 1, 3 * s, COL[0], 3, 0.3); K.blit(g, PERSON, p.x, p.y - 4, { k: S[3] }, p.f); rect(g, lx, ly, 2, 2, COL[0]); put(g, lx, ly + 1, COL[1]); put(g, lx + (p.f ? 1 : 0), ly + 2, S[3]); }
        }
        for (let k = lanterns.length - 1; k >= 0; k--) {
          const l = lanterns[k];
          l.y -= 0.12 * s * (0.4 + l.z); l.x += l.vx + Math.sin(t * 0.7 + l.ph) * 0.04; l.z -= 0.0025;
          if (l.y < -4 || l.z <= 0.04) { lanterns.splice(k, 1); continue; }
          const sc = l.z > 0.75 && s > 1.1 ? 2 : 1, flick = (t * 8 + l.ph * 5 | 0) & 1;
          if (l.z > 0.5) { K.glow(g, l.x + 2.5 * sc, l.y + 3 * sc, 4 * sc, COL[0], 3, 0.24); K.blit(g, big, l.x, l.y, { o: shade(COL[0], 0.72), L: COL[0], l: mix(COL[0], COL[1], 0.6), y: flick ? WHITE : COL[1] }, false, sc); }
          else if (l.z > 0.22) K.blit(g, mid, l.x, l.y, { o: shade(COL[0], 0.8), l: mix(COL[0], COL[1], 0.5), y: COL[1] });
          else put(g, l.x, l.y, flick ? COL[1] : COL[0]);
          // the reflection: a short broken streak in the water, longer for the near lanterns
          const ry = Math.round(2 * horizon - l.y), rx = Math.round(l.x + (l.z > 0.5 ? 2 * sc : 1)), len = l.z > 0.5 ? 3 * sc : l.z > 0.22 ? 2 : 1;
          if (wet) for (let q = 0; q < len; q++) { const yy = ry + q * 2 + ((t * 4 | 0) % 2), xx = rx + (((yy + (t * 3 | 0)) % 3) - 1); if (yy > horizon && yy < n) put(g, xx, yy, mix(shade(COL[0], 0.8), d[yy * n + Math.max(0, Math.min(n - 1, xx))], q / len * 0.6)); }
        }
      };
    },
  });

  add({
    name: 'Glowworm Cave', seed: 0, sizes: [100, 200], fps: 12,
    interactive: 'Click to clap: the glowworms go dark and slowly come back.',
    listens: 'Clap or shout and the glowworms go dark, then come back one by one.',
    recipe: 'The roof of a cave studded with glowworms, each lowering silk threads beaded with sticky droplets that catch their light. They twinkle slowly over a still underground river, and a boat drifts silently through their reflection. Clap (click) and they go dark, then come back one by one; some variations are drawn in chunkier cells.',
    make(R, U, g) {
      if (ogLook(g)) return glowOG(R, U, g);
      return K.chunky(g, 40, g2 => { g2.trait = g.trait; return glowNew(R, U, g2); });
    },
  });

  add({
    name: 'Lava Lamp', seed: 4, sizes: [40, 50], fps: 12,
    interactive: 'Click inside the glass to heat a blob there.',
    recipe: 'A lava lamp big in the frame: blobs of wax warm at the bottom, swell upward and stretch, cool at the top and sink, merging and splitting as a metaball field on the coarse grid. The lamp throws a stepped glow on the wall. Click inside to heat a blob.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, ink = hx('#08060a');
      const PAIRS = [['#2a0a3a', '#ff4a8a'], ['#0a1a3a', '#ffb02a'], ['#0a2a2a', '#7aff5a'], ['#3a0a0a', '#ffd23a'], ['#101030', '#5ac8ff'], ['#2a1a00', '#ff6a1a'], ['#1a0a2a', '#c0ff3a']].map(a => a.map(hx));
      const [liq, wax] = R.pick(PAIRS), metal = K.tones(hx(R.pick(['#c9ced6', '#c9a227', '#2a2a30', '#e04a3f']))), wall = hx(R.pick(['#120c14', '#0c1014', '#14100c']));
      T(g, 'Wax', ['Pink on Plum', 'Amber on Navy', 'Lime on Teal', 'Gold on Red', 'Sky on Indigo', 'Orange on Brown', 'Acid on Violet'][PAIRS.findIndex(p => p[1] === wax)]); T(g, 'Base', ['Chrome', 'Brass', 'Black', 'Red'][['#c9ced6', '#c9a227', '#2a2a30', '#e04a3f'].map(hx).indexOf(metal[2])]);
      // new traits: the shape of the lamp and where it stands
      const form = T(g, 'Lamp', alt(g, 'Rocket', [['Rocket', 2], ['Globe', 1], ['Slim', 1], ['Mini', 1]])), spot = T(g, 'Setting', alt(g, 'Dark Room', [['Dark Room', 2], ['Shelf', 1], ['Window', 1], ['Bedside', 1]])), place = T(g, 'Stands', alt(g, 'Centre', [['Centre', 1.5], ['Left', 1], ['Right', 1]]));
      const cx = n / 2 + (place === 'Left' ? -n * 0.2 : place === 'Right' ? n * 0.2 : 0), mini = form === 'Mini', top = Math.round(n * (form === 'Globe' ? 0.2 : form === 'Slim' ? 0.08 : mini ? 0.4 : 0.14)), bot = Math.round(n * (form === 'Globe' ? 0.68 : mini ? 0.76 : 0.7)), wTop = n * (form === 'Slim' ? 0.065 : form === 'Globe' ? 0.09 : mini ? 0.07 : 0.1), wBot = n * (form === 'Slim' ? 0.11 : form === 'Globe' ? 0.13 : mini ? 0.12 : 0.17);
      const wAt = v => form === 'Globe' ? n * 0.09 + n * 0.13 * Math.sin(Math.PI * Math.min(1, v * 1.02)) : wTop + (wBot - wTop) * v, other = place === 'Right' ? -1 : 1;
      const blobs = Array.from({ length: R.int(4, 7) }, () => ({ x: cx + R.range(-0.5, 0.5) * wBot, y: R.range(top + 4, bot - 4), r: R.range(1.6, 2.8) * s, vy: R.range(-0.2, 0.2), heat: R.range(0, 1) }));
      return (t) => {
        for (const tp of g.input.taps()) { const px = tp.x * n, py = tp.y * n; if (py > top && py < bot && blobs.length < 12) blobs.push({ x: px, y: py, r: 3 * s, vy: -0.3, heat: 1 }); }
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = wall;
        if (spot === 'Window') { const wx0 = Math.round(other > 0 ? n * 0.62 : n * 0.08), wy0 = Math.round(n * 0.08), ww = Math.round(n * 0.3), wh = Math.round(n * 0.4); rect(g, wx0 - 1, wy0 - 1, ww + 2, wh + 2, shade(wall, 0.6)); rect(g, wx0, wy0, ww, wh, hx('#0e1430')); for (let k = 0; k < 6; k++) put(g, wx0 + K.hash(k, 1) * ww, wy0 + K.hash(k, 2) * wh * 0.6, hx('#cfd8ff')); K.ell(g, wx0 + ww * 0.68, wy0 + wh * 0.3, 2 * s, 2 * s, hx('#f2ecd0')); rect(g, wx0 + ww / 2, wy0, 1, wh, shade(wall, 0.6)); rect(g, wx0, wy0 + wh / 2, ww, 1, shade(wall, 0.6)); }
        K.glow(g, cx, (top + bot) / 2, n * 0.48, wax, 5, 0.35);
        if (spot === 'Shelf') { const sy = n - 2 * s; for (let k = 0; k < 5; k++) { const bx = Math.round((place === 'Left' ? n * 0.62 : n * 0.07) + k * 2.2 * s), bh = Math.round((5 + 3 * K.hash(k, 5)) * s); rect(g, bx, sy - bh, Math.round(2 * s), bh, mix(hx(['#7a2e2e', '#2e4a6a', '#5a4a2a', '#3a5a3a', '#6a3a5a'][k]), wax, 0.18)); } const px2 = place === 'Right' ? n * 0.3 : n * 0.84; K.ell(g, px2, sy - 2.5 * s, 2.4 * s, 2.4 * s, mix(hx('#3a6a3a'), wax, 0.2)); rect(g, px2 - 1.5 * s, sy - 2 * s, 3 * s, 2 * s, mix(hx('#a8582a'), wax, 0.2)); }
        if (spot === 'Bedside') { const tx0 = Math.round(cx - n * 0.3), tw = Math.round(n * 0.6), ty = Math.round(n * 0.86); rect(g, tx0, ty, tw, n - ty, mix(hx('#5a3a24'), wax, 0.12)); rect(g, tx0, ty, tw, Math.max(1, s), mix(hx('#8a5a36'), wax, 0.3)); const bkx = cx + other * n * 0.2; rect(g, bkx - 3 * s, ty - 2 * s, 6 * s, 2 * s, mix(hx('#2e4a6a'), wax, 0.2)); rect(g, bkx - 2.6 * s, ty - 3.4 * s, 5 * s, 1.4 * s, mix(hx('#7a2e2e'), wax, 0.2)); const ax = cx + other * n * 0.32; rect(g, ax - 2 * s, ty - 4 * s, 4 * s, 4 * s, hx('#d8d0c0')); put(g, ax, ty - 3 * s, hx('#1a1a1a')); put(g, ax + 0.6 * s, ty - 2 * s, hx('#1a1a1a')); }
        for (const b of blobs) {
          // heated at the bottom, cooled at the top
          if (b.y > bot - 6 * s) b.heat = Math.min(1, b.heat + 0.01); if (b.y < top + 6 * s) b.heat = Math.max(0, b.heat - 0.012);
          b.vy += (b.heat - 0.5) * -0.012; b.vy *= 0.97; b.y += b.vy * s;
          if (b.y < top + b.r) { b.y = top + b.r; b.vy = 0; } if (b.y > bot - b.r * 0.6) { b.y = bot - b.r * 0.6; b.vy = 0; }
          b.x += Math.sin(t * 0.3 + b.r) * 0.03;
        }
        if (blobs.length > 7 && R() < 0.003) blobs.shift();
        // the glass and its wax
        for (let y = top; y < bot; y++) {
          const v = (y - top) / (bot - top), w = wAt(v);
          for (let x = Math.round(cx - w); x < cx + w; x++) {
            let f = 0;
            for (const b of blobs) { const dx = x + 0.5 - b.x, dy = (y + 0.5 - b.y) * 0.8; f += b.r * b.r / (dx * dx + dy * dy + 0.01); }
            const nx = (x + 0.5 - cx) / w, i = y * n + x;
            let c = f > 1.6 ? (f > 3.5 && nx < 0 ? mix(wax, WHITE, 0.35) : wax) : f > 1.25 ? shade(wax, 0.7) : liq;
            if (nx < -0.62 && nx > -0.8) c = mix(c, WHITE, 0.4);
            d[i] = c;
          }
          put(g, cx - w - 1, y, ink); put(g, cx + w, y, ink);
        }
        // cap and base
        for (let y = Math.round(top - 5 * s); y < top; y++) { const w = wTop * (0.55 + 0.45 * (y - (top - 5 * s)) / (5 * s)); for (let x = Math.round(cx - w); x < cx + w; x++) d[y * n + x] = K.cel((x + 0.5 - cx) / w, 0, [-0.6, 0, 0.8], metal.slice(1)); }
        for (let y = bot; y < n - 2 * s; y++) { const v = (y - bot) / (n - 2 * s - bot), w = wBot * (1 - 0.35 * Math.sin(v * Math.PI)) + v * 4 * s; for (let x = Math.round(cx - w); x < cx + w; x++) d[y * n + x] = K.cel((x + 0.5 - cx) / w, 0, [-0.6, 0, 0.8], metal.slice(1)); }
        rect(g, 0, n - 2 * s, n, 2 * s, shade(wall, 1.6));
      };
    },
  });

  add({
    name: 'String Lights', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click to change the pattern the lights run in.',
    listens: 'Each bulb follows one band of the sound, bass at the left and treble at the right; beats flash them all.',
    recipe: 'Festoon lights strung in sagging loops across a night garden, a rooftop or a café front, each bulb a crisp little sprite in its own stepped halo. They chase, twinkle, breathe and run in waves. Click to change the pattern.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SKIES), seed = R.int(1, 99), scene = R.pick(['garden', 'roof', 'cafe']);
      const PAL = R.pick([['#ff4a4a', '#ffd23a', '#4ad04a', '#4a8aff', '#ff6af0'], ['#ffd27a'], ['#fff4e0'], ['#ff6f91', '#ffc75f', '#00c9a7', '#845ec2'], ['#ff8a2a', '#ffd06a']]).map(hx);
      const strands = [], m = R.int(2, 4);
      for (let k = 0; k < m; k++) { const y = n * (0.12 + 0.22 * k) + R.range(-2, 2) * s, sag = R.range(3, 7) * s, x0 = -2, x1 = n + 2, bulbs = []; for (let x = x0 + 2 * s; x < x1; x += R.pick([3, 4]) * s) { const u = (x - x0) / (x1 - x0); bulbs.push({ x, y: y + Math.sin(u * Math.PI * R.pick([1, 2])) * sag, c: PAL[bulbs.length % PAL.length] }); } strands.push({ y, sag, bulbs }); }
      let mode = R.int(0, 3), flash = 0;
      T(g, 'Scene', { garden: 'Garden', roof: 'Rooftop', cafe: 'Cafe' }[scene]); T(g, 'Bulbs', ['Rainbow', 'Warm', 'White', 'Candy', 'Amber'][[5, 1, 1, 4, 2].findIndex((l, i) => l === PAL.length && hx(['#ff4a4a', '#ffd27a', '#fff4e0', '#ff6f91', '#ff8a2a'][i]) === PAL[0])]); T(g, 'Strands', m); T(g, 'Pattern', ['Chase', 'Twinkle', 'Breathe', 'Wave'][mode]); T(g, 'Sky', SKY_NAMES[SKIES.indexOf(S)]);
      // the wire is a dim line against the sky (it was black on black); sockets a step lighter
      const wire = mix(S[2], hx('#8a7a66'), 0.4), sock = mix(S[2], hx('#b0a088'), 0.55);
      return (t) => {
        if (g.input.taps().length) mode = (mode + 1) % 4;
        // Listen: each bulb follows one band of the sound (low notes at the left, high at the right) and a beat flashes them all
        const L = g.input.listening;
        if (L) { if (g.input.beats()) flash = 1; flash *= 0.8; }
        sky(g, S, n, t, 30, seed);
        // the scene below
        const gy = Math.round(n * 0.8);
        for (let y = gy; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = scene === 'cafe' ? (((x >> 2) + (y >> 1)) & 1 ? hx('#3a2a22') : hx('#2a1e18')) : S[3];
        if (scene === 'garden') { for (let x = 0; x < n; x += 3 * s) rect(g, x, gy - 4 * s, 1.5 * s, 4 * s, hx('#1a1410')); K.ell(g, n * 0.85, gy - 8 * s, 7 * s, 9 * s, hx('#060a08')); }
        if (scene === 'roof') for (let x = 0; x < n; x++) { const h = Math.round(K.hash(x >> 2, 7, seed) * 12 * s); rect(g, x, gy - h, 1, h, S[3]); if (K.hash(x, 3, seed) > 0.9) put(g, x, gy - h + 2, hx('#ffd27a')); }
        if (scene === 'cafe') {
          rect(g, 0, n * 0.5, n, gy - n * 0.5, hx('#2a1a14'));
          // three lit windows with frames and glazing bars, warm toward the bottom
          for (let k = 0; k < 3; k++) { const wx = Math.round(n * (0.1 + k * 0.32)), wy = Math.round(n * 0.58), ww = Math.round(n * 0.2), wh = Math.round(gy - n * 0.6); rect(g, wx - 1, wy - 1, ww + 2, wh + 1, hx('#140c08')); for (let y = 0; y < wh; y++) rect(g, wx, wy + y, ww, 1, y < wh * 0.35 ? hx('#e89a52') : hx('#ffb86a')); rect(g, wx + (ww >> 1), wy, 1, wh, hx('#3a2418')); rect(g, wx, wy + Math.round(wh * 0.35), ww, 1, hx('#3a2418')); }
        }
        let idx = 0;
        for (const st of strands) {
          for (let k = 0; k + 1 < st.bulbs.length; k++) line(g, st.bulbs[k].x, st.bulbs[k].y - 2, st.bulbs[k + 1].x, st.bulbs[k + 1].y - 2, wire);
          line(g, -2, st.bulbs[0].y - 2, st.bulbs[0].x, st.bulbs[0].y - 2, wire);
          for (const b of st.bulbs) {
            idx++;
            let on = mode === 0 ? ((idx + (t * 4 | 0)) % 3 === 0 ? 1 : 0.35) : mode === 1 ? (K.hash(idx, t * 3 | 0, seed) > 0.3 ? 1 : 0.25) : mode === 2 ? 0.55 + 0.45 * Math.sin(t * 2) : 0.5 + 0.5 * Math.sin(t * 3 - b.x * 0.3);
            if (L) on = Math.min(1, Math.max(0.15, Math.pow(g.input.bands[Math.min(7, Math.max(0, Math.floor(b.x / n * 8)))], 0.7) * 1.1, flash));
            const c = mix(shade(b.c, 0.3), b.c, on);
            if (on > 0.55) K.glow(g, b.x + 1, b.y + 1.5, 3.2 * s, b.c, 3, 0.28 * on);
            // a little bulb: a socket on the wire, a two-cell-wide glass body and a rounded tip, lit at the top left
            const bx = Math.round(b.x), by = Math.round(b.y);
            put(g, bx, by - 1, sock);
            rect(g, bx, by, 2, 2, c); put(g, bx, by + 2, shade(c, 0.85));
            if (on > 0.75) put(g, bx, by, mix(c, WHITE, 0.7));
          }
        }
      };
    },
  });

  add({
    name: 'Campfire', seed: 1, sizes: [40, 50], fps: 15,
    interactive: 'Click to throw a log on the fire.',
    listens: 'The fire roars with the room, and every clap or beat throws up sparks.',
    recipe: 'A campfire in a ring of stones at night: the flames are a little fire simulation on the coarse grid, cooling through a stepped palette, over crossed logs, with sparks climbing, smoke drifting and the light falling off in rings on the ground. Click to add a log.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, S = R.pick(SKIES), seed = R.int(1, 99), scene = R.pick(['forest', 'beach', 'snow', 'desert']);
      const F = R.pick([['#200000', '#8a0a00', '#e8320a', '#ff8a1a', '#ffd23a', '#fff4c0'], ['#00102a', '#0a2a8a', '#2a6aff', '#5ac8ff', '#c8f0ff', '#ffffff'], ['#001a08', '#0a5a1a', '#2ab84a', '#a8f060', '#f0ffd0', '#ffffff'], ['#1a0020', '#5a0a6a', '#b02ad8', '#ff6af0', '#ffd0f8', '#ffffff']]).map(hx);
      const groundC = hx({ forest: '#141a10', beach: '#3a3020', snow: '#c8d4e8', desert: '#4a3420' }[scene]), cx = n / 2, base = Math.round(n * 0.78), fw = Math.round(n * R.range(0.34, 0.44)), fh = Math.round(n * 0.5);
      const heat = new Float32Array((fw + 2) * (fh + 2)), W = fw + 2;
      const sparks = [];
      let fuel = 1, roar = 0;
      T(g, 'Sky', SKY_NAMES[SKIES.indexOf(S)]); T(g, 'Setting', CAP(scene)); T(g, 'Flame', ['Wood Fire', 'Blue Fire', 'Green Fire', 'Pink Fire'][['#200000', '#00102a', '#001a08', '#1a0020'].map(hx).indexOf(F[0])]); T(g, 'Fire Size', fw > n * 0.4 ? 'Big' : fw > n * 0.37 ? 'Medium' : 'Small');
      // new traits: what is set up by the fire, and the weather
      const camp = T(g, 'Camp', alt(g, 'None', [['None', 3], ['Tent', 1], ['Kettle', 1], ['Bench', 1]])), sky2 = T(g, 'Weather', alt(g, 'Clear', [['Clear', 3], ['Snowfall', 0.8], ['Fireflies', 1]]));
      const side = seed & 1 ? 1 : -1;
      // the fire is already burning on the first frame: run its little simulation for a moment first
      for (let f = -40; f < 0; f++) {
        const t = f / 15;
        for (let x = 1; x <= fw; x++) { const u = (x - fw / 2) / (fw / 2); heat[fh * W + x] = Math.max(0, (1 - u * u * 1.3)) * (0.75 + 0.25 * K.hash(x, t * 15 | 0, seed)); }
        for (let y = 0; y < fh; y++) for (let x = 1; x <= fw; x++) { const i = y * W + x, src = (y + 1) * W + x + (K.hash(x, y + (t * 15 | 0), seed) < 0.33 ? -1 : K.hash(x, y + (t * 15 | 0), seed) > 0.66 ? 1 : 0); heat[i] = Math.max(0, (heat[src] + heat[(y + 1) * W + x]) * 0.5 - 0.035 * K.hash(x, y, t * 15 | 0) - 0.012); }
      }
      return (t) => {
        if (g.input.taps().length) fuel = Math.min(2.2, fuel + 0.6);
        fuel = Math.max(0.7, fuel - 0.0015);
        // Listen: the fire roars with the room (taller flames, more light) and every beat throws up a burst of sparks
        const L = g.input.listening;
        roar += ((L ? g.input.level : 0) - roar) * 0.3;
        if (L && g.input.beats()) for (let k = 0; k < 7 && sparks.length < 150; k++) { const A = g.alt; sparks.push({ x: cx + A.range(-0.35, 0.35) * fw, y: base - fh * 0.45, vx: A.range(-0.45, 0.45), vy: A.range(-1, -0.5) * s, life: A.range(14, 30) }); }
        const fl = fuel + roar * 0.9;
        // fire: seed the bottom row, then each cell takes the cooled average of those below
        for (let x = 1; x <= fw; x++) { const u = (x - fw / 2) / (fw / 2); heat[fh * W + x] = Math.max(0, (1 - u * u * 1.3)) * (0.75 + 0.25 * K.hash(x, t * 15 | 0, seed)) * fl; }
        for (let y = 0; y < fh; y++) for (let x = 1; x <= fw; x++) {
          const i = y * W + x, src = (y + 1) * W + x + (K.hash(x, y + (t * 15 | 0), seed) < 0.33 ? -1 : K.hash(x, y + (t * 15 | 0), seed) > 0.66 ? 1 : 0);
          heat[i] = Math.max(0, (heat[src] + heat[(y + 1) * W + x]) * 0.5 - 0.035 * K.hash(x, y, t * 15 | 0) - 0.012);
        }
        sky(g, S, Math.round(n * 0.62), t, 30, seed);
        for (let y = Math.round(n * 0.62); y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = groundC;
        if (scene === 'forest') for (let k = 0; k < 7; k++) { const tx = K.hash(k, 1, seed) * n, th = (0.25 + 0.15 * K.hash(k, 2, seed)) * n, base2 = n * 0.64; for (let y = 0; y < th; y++) { const w = (y / th) * 4 * s; rect(g, tx - w, base2 - th + y, w * 2 + 1, 1, hx('#05080a')); } }
        if (scene === 'beach') for (let y = Math.round(n * 0.62); y < n * 0.68; y++) for (let x = 0; x < n; x++) if (((x + y + (t * 2 | 0)) % 5) === 0) d[y * n + x] = hx('#3a5a8a');
        // the light on the ground: stepped rings
        for (let y = Math.round(n * 0.62); y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot((x + 0.5 - cx) / (n * 0.55), (y + 0.5 - base) / (n * 0.22)); if (r < 1) { const i = y * n + x; d[i] = mix(d[i], F[3], (r < 0.35 ? 0.45 : r < 0.65 ? 0.28 : 0.12) * Math.min(1.3, fl)); } }
        K.glow(g, cx, base - fh * 0.4, n * 0.42, F[3], 4, 0.22 * Math.min(1.4, fl));
        // stones and logs
        for (let k = 0; k < 9; k++) { const a = Math.PI * (k / 8), sx = cx + Math.cos(a) * fw * 0.7, sy = base + 1.5 * s - Math.sin(a) * 1.2 * s + (k % 2) * s; K.ell(g, sx, sy, 2.4 * s, 1.6 * s, (x, y, nx, ny) => ny < -0.3 ? hx('#8a8a90') : nx > 0.3 ? hx('#3a3a40') : hx('#5a5a62')); }
        K.thick(g, cx - fw * 0.45, base, cx + fw * 0.4, base - 3 * s, Math.round(2 * s), hx('#5a3418')); K.thick(g, cx + fw * 0.45, base, cx - fw * 0.4, base - 3 * s, Math.round(2 * s), hx('#7a4a24'));
        for (let k = 0; k < fuel * 2 - 1; k++) K.thick(g, cx - fw * 0.3, base - (4 + k * 2) * s, cx + fw * 0.3, base - (5 + k * 2) * s, Math.round(1.5 * s), hx('#6a3a1a'));
        // flames: a bigger fire grows taller but keeps its colours (it never blows out to a white block)
        const hk = 5.5 / Math.max(1, fl);
        for (let y = 0; y < fh; y++) for (let x = 1; x <= fw; x++) {
          const h = heat[y * W + x]; if (h < 0.12) continue;
          const px = Math.round(cx - fw / 2 + x - 1), py = base - fh + y - Math.round(s);
          if (px >= 0 && px < n && py >= 0 && py < n) d[py * n + px] = F[Math.min(5, Math.floor(h * hk))];
        }
        // the camp round the fire, lit on the side that faces it
        const lit = c => mix(c, F[3], 0.35 * Math.min(1.3, fl));
        if (camp === 'Tent') { const tx = cx + side * n * 0.34, tb = base - 1, th = Math.round(n * 0.2), tw = Math.round(n * 0.16); for (let y = 0; y < th; y++) { const w = Math.round(tw * y / th); for (let x = -w; x <= w; x++) put(g, tx + x, tb - th + y, (x * side < 0) ? lit(hx('#3a5a7a')) : hx('#1e2e44')); } for (let y = Math.round(th * 0.45); y < th; y++) put(g, tx, tb - th + y, hx('#0a0e14')); }
        if (camp === 'Kettle') { const kx = cx, ky = base - fh * 0.55; line(g, kx - fw * 0.55, base, kx, ky - 4 * s, hx('#3a2a1a')); line(g, kx + fw * 0.55, base, kx, ky - 4 * s, hx('#3a2a1a')); line(g, kx, ky - 4 * s, kx, ky - s, hx('#2a2a2a')); K.ell(g, kx, ky + s, 2.4 * s, 1.8 * s, (x, y, nx) => nx < -0.3 ? hx('#8a8a92') : hx('#4a4a52')); if (((t * 3) | 0) % 2) put(g, kx + 2 * s, ky - 2 * s, mix(S[2], WHITE, 0.5)); }
        if (camp === 'Bench') { const bx = cx - side * n * 0.36, by = base + 2 * s; K.thick(g, bx - 6 * s, by, bx + 6 * s, by - s, Math.max(2, Math.round(2 * s)), lit(hx('#5a3a1e'))); rect(g, bx - 5 * s, by + s, s, 2 * s, hx('#2a1a0e')); rect(g, bx + 4 * s, by, s, 2 * s, hx('#2a1a0e')); }
        if (sky2 === 'Snowfall') for (let k = 0; k < 40; k++) put(g, (K.hash(k, 7, seed) * n + Math.sin(t + k) * 2) % n, (K.hash(k, 8, seed) * n + t * 2.4 * (0.6 + K.hash(k, 9))) % n, WHITE);
        if (sky2 === 'Fireflies') for (let k = 0; k < 14; k++) if (Math.sin(t * 1.4 + k * 2.3) > 0.3) put(g, K.hash(k, 7, seed) * n + Math.sin(t * 0.4 + k) * 3 * s, n * 0.5 + K.hash(k, 8, seed) * n * 0.35 + Math.cos(t * 0.3 + k) * 2 * s, hx('#d8ff7a'));
        // sparks and smoke
        if (R() < 0.35 * fuel) sparks.push({ x: cx + R.range(-0.3, 0.3) * fw, y: base - fh * 0.5, vx: R.range(-0.2, 0.2), vy: R.range(-0.6, -0.3) * s, life: R.range(15, 40) });
        for (let k = sparks.length - 1; k >= 0; k--) { const p = sparks[k]; p.x += p.vx + Math.sin(t * 3 + k) * 0.1; p.y += p.vy; p.life--; if (p.life <= 0 || p.y < 0) { sparks.splice(k, 1); continue; } put(g, p.x, p.y, p.life > 10 ? F[4] : F[2]); }
      };
    },
  });

  add({
    name: 'Moths', seed: 2, sizes: [80, 100], fps: 12,
    interactive: 'Move the pointer to carry the light; the moths follow it.',
    listens: 'Clap and the moths scatter from the light, then spiral back in.',
    recipe: 'A bare bulb on a porch at night and the moths it draws. Each moth keeps the light at a fixed angle as it flies, so it spirals in toward the bulb, glances off and is caught again, tracing faint loops in the glow. Move the pointer and you carry the light, and the moths follow; some variations are drawn in chunkier cells with other lamps.',
    make(R, U, g) {
      if (ogLook(g)) return mothOG(R, U, g);
      return K.chunky(g, 40, g2 => { g2.trait = g.trait; return mothNew(R, U, g2); });
    },
  });

  add({
    name: 'Stage Lights', seed: 3, sizes: [80, 100], fps: 12,
    interactive: 'Move the pointer and the lights follow it; click to strobe.',
    listens: 'The beams swell and swing with the music and flare on the beat.',
    recipe: 'Moving heads on a lighting truss sweep coloured beams through stage haze, crossing and adding where they meet and pooling on the floor around a lone singer at a microphone stand. Point and the heads track you; click for a strobe hit; some variations are drawn in chunkier cells with a crowd instead of the singer.',
    make(R, U, g) {
      if (ogLook(g)) return stageOG(R, U, g);
      return K.chunky(g, 40, g2 => { g2.trait = g.trait; return stageNew(R, U, g2); });
    },
  });

  add({
    name: 'Lamplighter', seed: 2, sizes: [40, 50], fps: 12,
    interactive: 'Click a lamp to light it or put it out.',
    recipe: 'A cobbled street at dusk between rows of houses. The lamplighter walks along with his pole, and the gas lamps bloom one by one into stepped pools of light; windows light up behind him, snow or rain may fall. Click a lamp to light it yourself.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, seed = R.int(1, 99), S = R.pick(SKIES), dusk = R.pick([['#ff8a5a', '#c85a6a', '#5a3a7a'], ['#3a5a9a', '#2a3a6a', '#1a2040'], ['#ffb07a', '#e07a6a', '#7a4a8a']]).map(hx), weather = R.pick(['clear', 'clear', 'snow', 'rain']);
      const HOUSE = R.pick([['#5a3a3a', '#6a4a40', '#3a2a2a'], ['#3a4a5a', '#4a5a6a', '#2a3440'], ['#6a5a40', '#7a6a4a', '#4a3a2a'], ['#8a3a2a', '#3a5a4a', '#5a4a6a']]).map(hx);
      const street = Math.round(n * 0.72), lampX = [], gap = R.pick([10, 12, 14]) * s;
      for (let x = gap * 0.6; x < n; x += gap) lampX.push(x);
      const lamps = lampX.map(x => ({ x, lit: false, bloom: 0 }));
      const houses = []; for (let x = 0; x < n;) { const w = R.int(6, 11) * s; houses.push({ x, w, h: R.range(0.22, 0.42) * n, c: R.pick(HOUSE), roof: R.pick(['flat', 'gable']) }); x += w; }
      let man = -4, warm = hx('#ffd27a');
      T(g, 'Dusk', ['Rose', 'Blue Hour', 'Amber'][['#ff8a5a', '#3a5a9a', '#ffb07a'].map(hx).indexOf(dusk[0])]); T(g, 'Houses', ['Brick', 'Slate', 'Sandstone', 'Painted'][['#5a3a3a', '#3a4a5a', '#6a5a40', '#8a3a2a'].map(hx).indexOf(HOUSE[0])]); T(g, 'Weather', CAP(weather)); T(g, 'Lamps', lamps.length);
      // new traits: the street (cobbles or a canal), the moon, and the skyline
      const way = T(g, 'Street', alt(g, 'Cobbles', [['Cobbles', 3], ['Canal', 1.2]])), moon = T(g, 'Moon', alt(g, 'None', [['None', 3], ['Full', 1], ['Crescent', 1]])), sky2 = T(g, 'Skyline', alt(g, 'Rooftops', [['Rooftops', 3], ['Spires', 1], ['Chimneys', 1]]));
      const mX = n * (0.2 + 0.6 * (seed % 10) / 10), mY = n * 0.14, spireX = Math.round(n * (0.3 + 0.4 * ((seed * 7) % 10) / 10));
      return (t) => {
        for (const tp of g.input.taps()) for (const l of lamps) if (Math.abs(tp.x * n - l.x) < 3 * s && tp.y * n < street) l.lit = !l.lit;
        man += 0.12 * s; if (man > n + 6) { man = -6; for (const l of lamps) l.lit = false; }
        for (const l of lamps) { if (!l.lit && Math.abs(man - l.x) < 0.5 && man > 0) l.lit = true; l.bloom += ((l.lit ? 1 : 0) - l.bloom) * 0.1; }
        const lit = lamps.filter(l => l.lit).length / lamps.length;
        K.bands(g, 0, street, dusk.map(c => mix(c, S[0], lit * 0.6)));
        if (moon !== 'None') { K.ell(g, mX, mY, 2.6 * s, 2.6 * s, hx('#f4eed0')); if (moon === 'Crescent') K.ell(g, mX + 1.3 * s, mY - 0.6 * s, 2.4 * s, 2.4 * s, mix(dusk[0], S[0], lit * 0.6)); }
        if (sky2 === 'Spires') { const c = shade(HOUSE[2], 0.8), top = street - 0.62 * n; for (let y = Math.round(top); y < street; y++) { const w = y < top + 9 * s ? Math.round((y - top) / (9 * s) * 2.5 * s) : Math.round(2.5 * s); rect(g, spireX - w, y, 2 * w + 1, 1, c); } put(g, spireX, Math.round(top + 12 * s), lit > 0.3 ? warm : shade(c, 0.6)); }
        for (const h of houses) {
          if (sky2 === 'Chimneys') { const cx2 = Math.round(h.x + h.w * 0.7); rect(g, cx2, street - h.h - 4 * s, 2 * s, 4 * s, shade(h.c, 0.75)); for (let k = 0; k < 3; k++) { const a = (t * 0.25 + k / 3 + h.x * 0.13) % 1; put(g, cx2 + s + Math.sin(a * 5 + h.x) * a * 2 * s, street - h.h - 5 * s - a * 8 * s, mix(dusk[1], WHITE, 0.3 * (1 - a))); } }
          rect(g, h.x, street - h.h, h.w, h.h, h.c); rect(g, h.x, street - h.h, 1, h.h, shade(h.c, 0.7));
          if (h.roof === 'gable') for (let k = 0; k < h.w / 2; k++) rect(g, h.x + k, street - h.h - k * 0.6 - 1, h.w - 2 * k, 1, shade(h.c, 0.6));
          for (let wy = street - h.h + 3 * s; wy < street - 5 * s; wy += 5 * s) for (let wx = h.x + 2 * s; wx < h.x + h.w - 2 * s; wx += 4 * s) {
            const on = K.hash(wx, wy, seed) < lit * 1.2 - 0.1;
            rect(g, wx, wy, 2 * s, 3 * s, on ? warm : shade(h.c, 0.45));
          }
        }
        // cobbles, or a towpath and the canal mirroring the street
        for (let y = street; y < n; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((x + (((y - street) >> 1) & 1) * 2) % 4 === 0 || (y - street) % 2 === 0) ? hx('#2a2a30') : hx('#4a4a54');
        rect(g, 0, street, n, s, hx('#6a6a74'));
        if (way === 'Canal') { const w0 = street + Math.round(3 * s); rect(g, 0, w0 - 1, n, 1, hx('#6a6a74')); for (let y = w0; y < n; y++) { const sy2 = 2 * w0 - y - Math.round(4 * s), wob = ((y + (t * 3 | 0)) % 3 === 0) ? 1 : 0; for (let x = 0; x < n; x++) { const src = sy2 >= 0 && sy2 < street ? d[sy2 * n + Math.min(n - 1, x + wob)] : dusk[2]; d[y * n + x] = mix(shade(src, 0.55), hx('#14243a'), 0.35); } } }
        for (const l of lamps) {
          if (l.bloom > 0.05) { for (let y = street; y < n; y++) for (let x = 0; x < n; x++) { const r = Math.hypot((x + 0.5 - l.x) / (7 * s), (y + 0.5 - street - 3 * s) / (3 * s)); if (r < 1) { const i = y * n + x; d[i] = mix(d[i], warm, (r < 0.5 ? 0.4 : 0.2) * l.bloom); } } K.glow(g, l.x, street - 13 * s, 7 * s, warm, 3, 0.4 * l.bloom); }
          rect(g, l.x - 0.5 * s, street - 12 * s, Math.max(1, s), 12 * s, hx('#14141a'));
          rect(g, l.x - 1.5 * s, street - 15 * s, 3 * s, 3 * s, hx('#14141a'));
          rect(g, l.x - s, street - 14.5 * s, 2 * s, 2 * s, l.bloom > 0.3 ? mix(warm, WHITE, 0.5) : hx('#9a9aa8'));
        }
        // the lamplighter: hat, coat, legs, pole
        const mx = Math.round(man), step = (t * 6 | 0) & 1, my = street - 1;
        const body = hx('#0a0a10');
        rect(g, mx - s, my - 7 * s, 2 * s, 4 * s, body); rect(g, mx - s, my - 9 * s, 2 * s, 2 * s, hx('#e0b090')); rect(g, mx - 1.5 * s, my - 10 * s, 3 * s, s, body); rect(g, mx - s, my - 12 * s, 2 * s, 2 * s, body);
        rect(g, mx - s + (step ? 0 : s), my - 3 * s, Math.max(1, s), 3 * s, body); rect(g, mx + (step ? 0 : -s), my - 3 * s, Math.max(1, s), 3 * s, body);
        line(g, mx + s, my - 6 * s, mx + 5 * s, my - 15 * s, hx('#5a3a1a')); put(g, mx + 5 * s, my - 15 * s, (t * 8 | 0) & 1 ? hx('#ffd27a') : hx('#ff8a2a'));
        if (weather === 'snow') for (let k = 0; k < 40; k++) put(g, (K.hash(k, 1, seed) * n + Math.sin(t + k) * 2) % n, (K.hash(k, 2, seed) * n + t * 3 * (0.5 + K.hash(k, 3))) % n, WHITE);
        if (weather === 'rain') for (let k = 0; k < 40; k++) { const x = (K.hash(k, 1, seed) * n + t * 6) % n, y = (K.hash(k, 2, seed) * n + t * 20) % n; put(g, x, y, hx('#8aa0c8')); put(g, x - 0.5, y - 1, hx('#5a6a8a')); }
      };
    },
  });

  add({
    name: 'Filament Bulbs', seed: 1, sizes: [40, 50], fps: 12,
    interactive: 'Click a bulb to switch it.',
    recipe: 'Clear bulbs hanging on cords at different heights, each with its own filament drawn in hot single cells: zigzag cages, coils, hairpins and loops in globes, pears and tubes. A slow wave of dimming runs along them. Click a bulb to switch it.',
    make(R, U, g) {
      const { n, d } = g, s = n / 40, ink = hx('#050404'), warm = R.pick([['#ff8a1a', '#ffd06a', '#fff4d0'], ['#ffb02a', '#ffe08a', '#ffffff'], ['#ff5a2a', '#ffa05a', '#ffe0c0']]).map(hx);
      const bgK = R.pick(['brick', 'wood', 'concrete', 'dark']), bgC = K.tones(hx({ brick: '#4a2620', wood: '#3a2618', concrete: '#3a3a40', dark: '#101014' }[bgK]));
      const SHAPES = { globe: v => Math.sin(Math.min(1, v * 1.05) * Math.PI) * 4.2 + (v < 0.1 ? 1.4 : 0), pear: v => v < 0.2 ? 1.6 : Math.sin((v - 0.2) / 0.8 * Math.PI) * 3.8 + 1.2 * (1 - v), tube: v => v < 0.12 ? 1.4 : 2.4, tear: v => v < 0.15 ? 1.4 : Math.pow(Math.sin((v - 0.1) / 0.9 * Math.PI * 0.85), 1.4) * 4 };
      const FIL = ['zig', 'coil', 'hair', 'cage', 'loop'];
      const m = R.int(2, 5), bulbs = Array.from({ length: m }, (_, k) => ({ x: n * (k + 0.5) / m, cord: R.range(0.1, 0.5) * n, h: R.range(9, 14) * s, shape: R.pick(Object.keys(SHAPES)), fil: R.pick(FIL), on: true, sc: s * R.range(0.9, 1.25) }));
      T(g, 'Glow', ['Amber', 'Gold', 'Ember'][['#ff8a1a', '#ffb02a', '#ff5a2a'].map(hx).indexOf(warm[0])]); T(g, 'Wall', CAP(bgK)); T(g, 'Bulbs', m); T(g, 'Filaments', [...new Set(bulbs.map(b => b.fil))].length > 1 ? 'Mixed' : { zig: 'Zigzag', coil: 'Coil', hair: 'Hairpin', cage: 'Cage', loop: 'Loop' }[bulbs[0].fil]);
      // new trait: how they hang
      const hang = T(g, 'Hang', alt(g, 'Staggered', [['Staggered', 3], ['In a Row', 1], ['Cluster', 1], ['Stairs', 1]]));
      if (hang === 'In a Row') for (const b of bulbs) b.cord = n * 0.3;
      if (hang === 'Stairs') bulbs.forEach((b, k) => { b.cord = n * (0.1 + 0.4 * k / Math.max(1, m - 1)); });
      if (hang === 'Cluster') bulbs.forEach((b, k) => { b.x = n / 2 + (b.x - n / 2) * 0.55; b.cord = n * (0.15 + 0.32 * ((k * 0.618) % 1)); });
      return (t) => {
        for (const tp of g.input.taps()) for (const b of bulbs) if (Math.abs(tp.x * n - b.x) < 5 * b.sc && tp.y * n > b.cord && tp.y * n < b.cord + b.h + 2 * s) b.on = !b.on;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          let c = bgC[1];
          if (bgK === 'brick') c = (y % 4 === 3) || ((x + ((y >> 2) & 1) * 3) % 6 === 5) ? bgC[0] : bgC[1];
          else if (bgK === 'wood') c = x % 6 === 0 ? bgC[0] : K.hash(x, y >> 2, 3) < 0.1 ? bgC[2] : bgC[1];
          else if (bgK === 'concrete') c = K.hash(x, y, 4) < 0.08 ? bgC[2] : bgC[1];
          else c = bgC[0];
          d[y * n + x] = c;
        }
        for (const [k, b] of bulbs.entries()) {
          const lvl = b.on ? 0.55 + 0.45 * Math.sin(t * 0.8 - k * 0.7) : 0, top = b.cord, bot = top + b.h, prof = SHAPES[b.shape];
          if (lvl > 0.2) K.glow(g, b.x, top + b.h * 0.55, 8 * s * lvl, warm[1], 3, 0.32 * lvl);
          line(g, b.x, 0, b.x, top - 2 * s, ink); rect(g, b.x - s, top - 2 * s, 2 * s, 2 * s, hx('#8a7a5a'));
          // the glass: an outline with a tint and a glint
          for (let y = Math.round(top); y < bot; y++) {
            const v = (y - top) / b.h, r = prof(v) * b.sc / s * Math.max(1, s * 0.9);
            if (r < 0.6) continue;
            for (let x = Math.round(b.x - r); x < b.x + r; x++) { const i = y * n + x; if (x < 0 || x >= n) continue; const edgeC = x === Math.round(b.x - r) || x >= Math.round(b.x + r) - 1; d[i] = edgeC ? mix(hx('#d8c8a8'), warm[0], lvl * 0.4) : mix(d[i], mix(hx('#3a3020'), warm[0], lvl * 0.6), 0.45); }
            if (v > 0.2 && v < 0.6) put(g, b.x - r * 0.55, y, mix(WHITE, d[y * n + Math.round(b.x - r * 0.55)], 0.3));
          }
          // the filament, in hot single cells
          const fc = lvl > 0.2 ? (lvl > 0.75 ? warm[2] : warm[1]) : hx('#5a4a3a'), fy0 = top + b.h * 0.25, fy1 = top + b.h * 0.72, fx = b.x;
          line(g, fx - 1, top, fx - 1, fy0, hx('#8a7a5a')); line(g, fx + 1, top, fx + 1, fy0, hx('#8a7a5a'));
          if (b.fil === 'zig') for (let y = fy0; y < fy1; y++) put(g, fx + ((Math.round(y) & 1) ? 1 : -1), y, fc);
          else if (b.fil === 'coil') { for (let x = -2; x <= 2; x++) put(g, fx + x, fy1 - ((x + 3) & 1), fc); line(g, fx - 2, fy0, fx - 2, fy1, fc); }
          else if (b.fil === 'hair') { line(g, fx - 1, fy0, fx - 1, fy1, fc); line(g, fx + 1, fy0, fx + 1, fy1, fc); put(g, fx, fy1, fc); }
          else if (b.fil === 'cage') for (let k2 = -2; k2 <= 2; k2 += 2) line(g, fx + k2 * 0.6, fy0, fx + k2, fy1, fc);
          else K.ell(g, fx, (fy0 + fy1) / 2, 2, (fy1 - fy0) / 2, (x, y, nx, ny) => nx * nx + ny * ny > 0.45 ? fc : 0);
        }
      };
    },
  });
})();
