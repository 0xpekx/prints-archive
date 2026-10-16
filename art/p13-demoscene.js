// Set 2 · Demoscene: the effects people wrote in the eighties and nineties to
// show off what a home computer could do, each with a twist.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff;
  const inkName = cols => { const p = U.PALETTES.find(pl => cols.every(c => pl.cols.some(q => U.pk(q) === c))); return p ? p.name : 'Spectrum'; };
  const cap = w => w[0].toUpperCase() + w.slice(1);
  const scName = sc => sc.native ? 'Rainbow' : sc.name;
  const WORDS = ['SYNAESTHESIA', 'GREETINGS', 'HELLO', 'COLOUR', 'PIXELS', 'NO SIGNAL', 'DREAMING', 'ECHO', 'NEON', 'SENSES'];

  // Tunnel's depth: sixteen steps from the bright mouth to a dark far end (a smooth fall-off
  // instead of eight hard rings), and the room's sound: loudness speeds the flight, a beat
  // sends a ring of light down the tube.
  function tunnelKit(g, lut) {
    const inp = g.input, shades = Array.from({ length: 16 }, (_, k) => U.dim(lut, Math.max(0.1, 1 - 0.88 * Math.pow(k / 15, 0.85))));
    let travel = 0, ring = -1;
    return {
      shades,
      // where along the tube we are: time, plus extra distance while the room is loud
      step(t, dt, fwd) {
        if (inp.listening) { travel += (dt || 0) * fwd * inp.level * 2.5; if (inp.beats()) ring = 0; } else ring = -1;
        if (ring >= 0) { ring += (dt || 0) * 1.6; if (ring > 1) ring = -1; }
        return t * fwd + travel;
      },
      // shade index for a pixel at distance r from the centre (0 near, 15 far)
      k(r, n) { let k = Math.min(15, Math.floor(15 * (1 - Math.min(1, r / (n * 0.6))))); if (ring >= 0) { const q = (r / (n * 0.6) - ring) / 0.12; if (q > -1 && q < 1) k = Math.max(0, k - Math.round(9 * (1 - q * q))); } return k; },
    };
  }

  // Sine Scroller's text: a dark drop shadow under every letter so it stays crisp over any
  // background, and the wave it rides, which follows the room's own sound wave while listening.
  function scrollKit(g, n, d, buf, S, water, amp, freq) {
    const inp = g.input, sm = new Float32Array(n), shadowC = 0xff0a0408;
    let mix = 0;
    return {
      lift(x, t) {
        const base = water * 0.45 + Math.sin(x * freq + t * 2) * amp * (1 - 0.5 * mix) - 3.5 * S;
        return Math.round(base + sm[x] * amp * 1.1 * mix);
      },
      step() {
        mix += ((inp.listening ? Math.min(1, inp.level * 4) : 0) - mix) * 0.15;
        if (mix > 0.001) for (let x = 0; x < n; x++) { const w = inp.listening ? inp.wave[Math.floor(x / n * 255)] : 0; sm[x] += (Math.max(-1, Math.min(1, w * 3)) - sm[x]) * 0.25; }
        if (mix > 0.001) for (let x = 1; x < n - 1; x++) sm[x] = (sm[x - 1] + 2 * sm[x] + sm[x + 1]) / 4;
      },
      // copy the letters onto the screen, shadow first
      blit(t) {
        for (let x = 0; x < n; x++) {
          const off = this.lift(x, t);
          for (let y = 0; y < 7 * S; y++) { if (!buf[y * n + x]) continue; const yy = off + y + 1, xx = x + 1; if (yy >= 0 && yy < water && xx < n) d[yy * n + xx] = shadowC; }
        }
        for (let x = 0; x < n; x++) {
          const off = this.lift(x, t);
          for (let y = 0; y < 7 * S; y++) { const c = buf[y * n + x]; if (c && off + y >= 0 && off + y < water) d[(off + y) * n + x] = c; }
        }
      },
    };
  }

  // Vector Balls and the room: a beat swells the formation, loudness spins it, and a clap
  // (once the current shape has formed) moves straight on to the next one.
  function ballsEar(g) {
    const inp = g.input;
    let pulse = 0, spin = 0, skip = 0;
    return {
      step(t, dt) {
        if (!inp.listening) { pulse = 0; return; }
        spin += (dt || 0) * inp.level * 2.2;
        if (inp.beats()) { pulse = 1; const ph = (t + skip) / 5, frac = ph - Math.floor(ph); if (frac > 0.42) skip += (1 - frac) * 5; }
        pulse = Math.max(0, pulse - (dt || 0) * 3.5);
      },
      get ph() { return skip; }, get spin() { return spin; }, get scale() { return 1 + 0.22 * pulse * pulse; },
    };
  }

  // Shadebobs' renewal and touch: every thirty seconds the picture dissolves away through an
  // ordered dither instead of snapping to black; a click presses a deep ring into the sums.
  function bobsKit(g, n, acc, stamp) {
    const inp = g.input;
    return {
      press() {
        for (const tp of inp.taps()) {
          const cx = Math.round(tp.x * n), cy = Math.round(tp.y * n);
          for (let s = 0; s < stamp.length; s += 3) { const x = cx + stamp[s + 1], y = cy + stamp[s + 2]; if (x >= 0 && y >= 0 && x < n && y < n) acc[y * n + x] = (acc[y * n + x] + 40) & 255; }
        }
      },
      // 0 while the picture holds, rising to 1 over the last second and a half before it renews
      fade(life) { return life > 28.5 ? (life - 28.5) / 1.5 : 0; },
    };
  }

  // Emboss: letters polished a shade brighter than the plate with a glint where the lamp
  // catches them, and dents the viewer presses in, kept (at most forty, oldest smoothed out).
  function embossKit(g, n, H, L, ramp) {
    const inp = g.input, dents = [], glint = X.mixPk(ramp[63], WHITE, 0.55);
    const press = (cx, cy, k) => { for (let y = cy - 4; y <= cy + 4; y++) for (let x = cx - 4; x <= cx + 4; x++) if (x > 0 && y > 0 && x < n - 1 && y < n - 1) { const r2 = (x - cx) ** 2 + (y - cy) ** 2; if (r2 <= 16) H[y * n + x] -= k * 2.4 * Math.exp(-r2 / 5); } };
    return {
      step() {
        for (const tp of inp.taps()) {
          const cx = Math.round(tp.x * n), cy = Math.round(tp.y * n);
          press(cx, cy, 1); dents.push([cx, cy]);
          if (dents.length > 40) { const [ox, oy] = dents.shift(); press(ox, oy, -1); }
        }
      },
      // the colour of a cell lit at v (0..1), letters a little brighter and glinting
      at(i, v) { const lv = v + L[i] * 0.1; return lv > 0.93 && L[i] > 0.4 ? glint : ramp[Math.max(0, Math.min(63, Math.floor(lv * 64)))]; },
    };
  }

  // Fire's extras, the same for both looks: coals the viewer drops (they keep burning, and
  // the next visitor finds them), the room's sound (loudness makes it roar, a clap flares it),
  // and sparks that rise off the hottest cells.
  function fireKit(g, F, n) {
    const inp = g.input, alt = g.alt, coals = [], sparks = [];
    let flare = 0;
    return {
      warm: true,
      // before the fire spreads; returns how much less it cools this frame
      feed() {
        if (!this.warm) for (const tp of inp.taps()) {
          const x = Math.max(1, Math.min(n - 2, Math.round(tp.x * n))), y = Math.max(0, Math.min(n - 2, Math.round(tp.y * n)));
          if (!coals.some(c => Math.abs(c.x - x) < 2 && Math.abs(c.y - y) < 2)) { coals.push({ x, y }); if (coals.length > 24) coals.shift(); }
        }
        for (const c of coals) for (let dy = 0; dy < 2; dy++) for (let dx = -1; dx <= 1; dx++) F[(c.y + dy) * n + c.x + dx] = 190 + (alt() * 65 | 0);
        let k = 1;
        if (inp.listening && !this.warm) { k = 1 - 0.2 * inp.level; if (inp.beats() && flare <= 0) flare = 1; }
        // a clap: one burst of heat through the flames already burning (not a white-out), and a shower of sparks
        if (flare === 1) { for (let i = 0; i < n * n; i++) if (F[i] > 60) F[i] = Math.min(255, F[i] + 45); for (let k2 = 0; k2 < 8; k2++) this.spark(true); }
        if (flare > 0) flare -= 0.25;
        return k;
      },
      spark(force) {
        if (sparks.length >= 18) return;
        for (let tries = 0; tries < 4; tries++) {
          const i = (alt() * n * (n - 2)) | 0;
          if (F[i] > 215 || (force && F[i] > 120)) { sparks.push({ x: i % n, y: (i / n) | 0, v: 0.5 + alt() * 0.5, ph: alt() * 6, life: 18 + (alt() * 18 | 0) }); return; }
        }
      },
      // after the colours are drawn
      draw(d, pal) {
        if (alt() < 0.5) this.spark(false);
        for (let k = sparks.length - 1; k >= 0; k--) {
          const s = sparks[k];
          s.y -= s.v; s.x += Math.sin(s.ph + s.life * 0.4) * 0.35; s.life--;
          const x = Math.round(s.x), y = Math.round(s.y);
          if (s.life < 0 || y < 0 || x < 0 || x >= n) { sparks.splice(k, 1); continue; }
          d[y * n + x] = pal[Math.min(255, 150 + s.life * 4)];
        }
      },
    };
  }

  P.addPixel({
    name: 'Fire', seed: 1, fam: 'Demoscene', sizes: [80, 100], fps: 12,
    interactive: 'Drag across the picture to set it alight; a click drops a coal that keeps burning.',
    listens: 'The fire roars when the room is loud and flares at every clap.',
    recipe: 'The classic fire: each cell is the cooling average of the cells below it. The hottest cells are the letters of a word, a row of braziers or the floor itself, burning in flame, gas-blue, toxic green, violet or gold, with a wind that leans it.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, N = n * n, F = new Uint8Array(N + 2 * n), word = R.pick(WORDS), inks = X.inks(R, 3, 0.35, true);
      const pal = X.rampPk([BLACK, X.shade(inks[0], 0.6), inks[1], inks[2], X.mixPk(inks[2], WHITE, 0.7)], 256);
      const scale = Math.max(1, Math.floor(n * 0.9 / (word.length * 6))), w = X.textWidth(word, scale), src = new Uint8Array(N);
      const fake = { n, d: src };
      X.text(fake, word, Math.round((n - w) / 2), Math.round(n * 0.6), 1, scale);
      const cool = R.range(4.5, 6.5);
      const wind = g.home ? 0 : g.alt.pick([0, 0, 1, -1]);
      g.trait('Fuel', 'Word'); g.trait('Word', word); g.trait('Flame', inkName(inks)); g.trait('Wind', wind ? (wind > 0 ? 'Eastward' : 'Westward') : 'Still'); g.trait('Height', cool < 5.2 ? 'Tall' : cool < 5.9 ? 'Medium' : 'Low'); g.trait('Grid', n);
      const inp = g.input, kit = fireKit(g, F, n);
      const frame = () => {
        for (let x = 0; x < n; x++) { F[(n - 1) * n + x] = R() < 0.35 ? 255 : 40; F[N + x] = F[(n - 1) * n + x]; }
        for (let i = 0; i < N; i++) if (src[i] && R() < 0.85) F[i] = 255;
        if (inp.down && !kit.warm) { const cx = Math.round(inp.x * n), cy = Math.round(inp.y * n); for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - 2; x <= cx + 2; x++) if (x >= 0 && y >= 0 && x < n && y < n) F[y * n + x] = 255; }
        const ck = cool * kit.feed();
        for (let y = 0; y < n - 1; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, b = i + n + (wind && R() < 0.5 ? (x + wind >= 0 && x + wind < n ? wind : 0) : 0), s = F[b] + F[b + (x > 0 ? -1 : 0)] + F[b + (x < n - 1 ? 1 : 0)] + F[b + n];
          F[i] = Math.max(0, s / 4 - ck * (R() < 0.5 ? 1 : 0.4));
        }
        for (let i = 0; i < N; i++) d[i] = src[i] ? X.mixPk(pal[F[i] | 0], WHITE, 0.25) : pal[F[i] | 0];
        kit.draw(d, pal);
      };
      // open with the fire already burning, not on a cold word
      for (let k = 0; k < 40; k++) frame();
      kit.warm = false;
      return frame;
      }
      function rework(R, U, g) {
      const { n, d } = g, N = n * n, F = new Uint8Array(N + 2 * n), word = R.pick(WORDS), inp = g.input;
      const FIRES = [['#000000', '#3e0a0a', '#a22633', '#ff6a1a', '#ffd04a', '#fff8e0'], ['#000000', '#0b1033', '#1d3a8a', '#3a7bd5', '#9ad1ff', '#ffffff'], ['#000000', '#0b2a0b', '#1f6b1a', '#9dff00', '#eaffb3', '#ffffff'], ['#000000', '#2a0a3a', '#6b1a8a', '#d65db1', '#ffc6e8', '#ffffff'], ['#000000', '#3a2410', '#8a5a1a', '#d4a83a', '#fff1a8', '#ffffff']];
      const fire = R.pick(FIRES), pal = X.rampPk(fire.map(X.PIX.hex), 256);
      const mode = R.pick(['word', 'word', 'braziers', 'floor']);
      const scale = Math.max(1, Math.floor(n * 0.9 / (word.length * 6))), w = X.textWidth(word, scale), src = new Uint8Array(N);
      const fake = { n, d: src };
      if (mode === 'word') X.text(fake, word, Math.round((n - w) / 2), Math.round(n * R.range(0.5, 0.7)), 1, scale);
      if (mode === 'braziers') for (let k = 0, m = R.int(2, 4); k < m; k++) { const bx = Math.round((k + 0.5) * n / m), by = Math.round(n * R.range(0.55, 0.85)); X.rect(fake, bx - 3, by, 7, 1, 1); for (let y = by + 1; y < n; y++) X.rect(fake, bx - 1, y, 3, 1, 2); }
      const cool = R.range(4.5, 6.5) * (mode === 'floor' ? 0.8 : 1), wind = R.pick([0, 0, 1, -1]), kit = fireKit(g, F, n);
      g.trait('Fuel', { word: 'Word', braziers: 'Braziers', floor: 'Floor' }[mode]); g.trait('Word', mode === 'word' ? word : 'None'); g.trait('Flame', ['Flame', 'Gas', 'Toxic', 'Violet', 'Gold'][FIRES.indexOf(fire)]); g.trait('Wind', wind ? (wind > 0 ? 'Eastward' : 'Westward') : 'Still'); g.trait('Height', cool < 5.2 ? 'Tall' : cool < 5.9 ? 'Medium' : 'Low'); g.trait('Grid', n);
      const frame = () => {
        for (let x = 0; x < n; x++) { F[(n - 1) * n + x] = R() < (mode === 'floor' ? 0.6 : 0.35) ? 255 : 40; F[N + x] = F[(n - 1) * n + x]; }
        for (let i = 0; i < N; i++) if (src[i] === 1 && R() < 0.85) F[i] = 255;
        if (inp.down && !kit.warm) { const cx = Math.round(inp.x * n), cy = Math.round(inp.y * n); for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - 2; x <= cx + 2; x++) if (x >= 0 && y >= 0 && x < n && y < n) F[y * n + x] = 255; }
        const ck = cool * kit.feed();
        for (let y = 0; y < n - 1; y++) for (let x = 0; x < n; x++) {
          const i = y * n + x, b = i + n + (wind && R() < 0.5 ? (x + wind >= 0 && x + wind < n ? wind : 0) : 0), s = F[b] + F[b + (x > 0 ? -1 : 0)] + F[b + (x < n - 1 ? 1 : 0)] + F[b + n];
          F[i] = Math.max(0, s / 4 - ck * (R() < 0.5 ? 1 : 0.4));
        }
        // braziers: dark iron with a hot rim where the flame licks it
        for (let i = 0; i < N; i++) d[i] = src[i] === 2 ? (F[i] > 120 ? 0xff20202a : 0xff14141a) : src[i] ? X.mixPk(pal[F[i] | 0], WHITE, 0.25) : pal[F[i] | 0];
        kit.draw(d, pal);
      };
      for (let k = 0; k < 40; k++) frame();
      kit.warm = false;
      return frame;
      }

    },
  });

  P.addPixel({
    name: 'Tunnel', fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    interactive: 'Point to steer down the tube.',
    listens: 'The louder the room, the faster you fly; every beat flashes down the tube.',
    recipe: 'Flying down a tube: every pixel looks up its own angle and distance from a table and reads the wall’s pattern there, darker the further away it is. Round, square or flower-shaped, lined with checks, bricks, rings, hexes, stripes, xor or the modulo field, and it bends as you go.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), T = 64, tex = new Uint8Array(T * T), kind = R.pick(['xor', 'mod', 'check', 'bricks']);
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) tex[y * T + x] = kind === 'xor' ? (x ^ y) * 4 : kind === 'mod' ? ((x * R.int(1, 1) * 7) % (y + 9)) * 8 : kind === 'check' ? (((x >> 3) + (y >> 3)) & 1) * 128 + y * 2 : ((y & 15) === 0 || ((x + ((y >> 4) & 1) * 16) & 31) === 0 ? 0 : 60 + ((x * 13 + y * 7) & 63));
      const spinV = R.range(0.1, 0.25) * R.sign(), fwd = R.range(4, 9), bend = R.range(0.15, 0.3), kit = tunnelKit(g, sc.lut), shades = kit.shades;
      g.trait('Lining', cap(kind)); g.trait('Palette', scName(sc)); g.trait('Bore', typeof shape === 'string' ? cap(shape) : 'Round'); g.trait('Spin', spinV > 0 ? 'Clockwise' : 'Anticlockwise'); g.trait('Grid', n);
      const inp = g.input;
      let px = null, py = null;
      return (t, dt) => {
        let cx = n / 2 + Math.sin(t * 0.4) * n * bend, cy = n / 2 + Math.cos(t * 0.31) * n * bend * 0.7;
        if (inp.inside) { px = px === null ? cx : px + (inp.x * n - px) * 0.15; py = py === null ? cy : py + (inp.y * n - py) * 0.15; cx = px; cy = py; } else px = py = null;
        const go = kit.step(t, dt, fwd);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - cx, dy = y - cy, r = Math.sqrt(dx * dx + dy * dy) + 0.5;
          const u = Math.floor((Math.atan2(dy, dx) / Math.PI + 1) * T + t * spinV * T) & (T - 1), v = Math.floor(n * 6 / r + go) & (T - 1);
          d[y * n + x] = r < 2.5 ? BLACK : shades[kit.k(r, n)][tex[v * T + u]];
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, sc = U.scheme(R), T = 64, tex = new Uint8Array(T * T), kind = R.pick(['xor', 'mod', 'check', 'bricks', 'rings', 'hex', 'stripes']), shape = R.pick(['round', 'round', 'square', 'flower']), petals = R.int(3, 7), inp = g.input;
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) tex[y * T + x] = kind === 'xor' ? (x ^ y) * 4 : kind === 'mod' ? ((x * 7) % (y + 9)) * 8 : kind === 'check' ? (((x >> 3) + (y >> 3)) & 1) * 128 + y * 2 : kind === 'rings' ? ((y >> 2) & 1) * 120 + (y & 3) * 30 : kind === 'hex' ? (((x + ((y >> 3) & 1) * 4) >> 3) * 37 + (y >> 3) * 53) & 255 : kind === 'stripes' ? ((x + y) & 15) * 16 : ((y & 15) === 0 || ((x + ((y >> 4) & 1) * 16) & 31) === 0 ? 0 : 60 + ((x * 13 + y * 7) & 63));
      const spinV = R.range(0.1, 0.25) * R.sign(), fwd = R.range(4, 9), bend = R.range(0.15, 0.3), kit = tunnelKit(g, sc.lut), shades = kit.shades;
      g.trait('Lining', cap(kind)); g.trait('Palette', scName(sc)); g.trait('Bore', typeof shape === 'string' ? cap(shape) : 'Round'); g.trait('Spin', spinV > 0 ? 'Clockwise' : 'Anticlockwise'); g.trait('Grid', n);
      let px = n / 2, py = n / 2;
      return (t, dt) => {
        const ax = inp.inside ? inp.x * n : n / 2 + Math.sin(t * 0.4) * n * bend, ay = inp.inside ? inp.y * n : n / 2 + Math.cos(t * 0.31) * n * bend * 0.7;
        px += (ax - px) * 0.15; py += (ay - py) * 0.15;
        const cx = px, cy = py, go = kit.step(t, dt, fwd);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const dx = x - cx, dy = y - cy, ang = Math.atan2(dy, dx), r = (shape === 'square' ? Math.max(Math.abs(dx), Math.abs(dy)) : Math.sqrt(dx * dx + dy * dy)) * (shape === 'flower' ? 1 + 0.25 * Math.cos(ang * petals + t) : 1) + 0.5;
          const u = Math.floor((ang / Math.PI + 1) * T + t * spinV * T) & (T - 1), v = Math.floor(n * 6 / r + go) & (T - 1);
          d[y * n + x] = r < 2.5 ? BLACK : shades[kit.k(r, n)][tex[v * T + u]];
        }
      };
      }

    },
  });

  P.addPixel({
    name: 'Rotozoomer', seed: 2, fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    recipe: 'One small tile, a creature drawn by the dice, repeated to the edges of the world and then turned and zoomed through it, each pixel just a lookup into the tile.',
    make(R, U, g) {
      const { n, d } = g, T = 16, tile = new Uint32Array(T * T), inks = X.inks(R, 5, 0.45);
      const bg = X.shade(inks[0], 0.25), bg2 = X.shade(inks[0], 0.35), spr = X.outline(X.mirrorSprite(R, 9, 9, 0.55, 0.15)), body = inks[R.int(1, inks.length - 1)], acc = inks[R.int(1, inks.length - 1)];
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) tile[y * T + x] = (x + y) & 1 ? bg : bg2;
      for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) { const v = spr[y][x]; if (v) tile[(y + 2) * T + x + 2] = v === 9 ? BLACK : v === 2 ? acc : body; }
      const zr = R.range(0.04, 0.08), spin = R.range(0.08, 0.16) * R.sign(), zs = n / 100;
      return t => {
        const a = t * spin, z = (0.14 + 0.16 * (1 + Math.sin(t * zr * 6))) / zs, ca = Math.cos(a) * z, sa = Math.sin(a) * z, ox = t * 3, oy = t * 2;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          const u = (x - n / 2) * ca - (y - n / 2) * sa + ox, v = (x - n / 2) * sa + (y - n / 2) * ca + oy;
          d[y * n + x] = tile[((Math.floor(v) & (T - 1)) << 4) | (Math.floor(u) & (T - 1))];
        }
      };
    },
  });

  P.addPixel({
    name: 'Copper Bars', seed: 2, fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    recipe: 'Bars of colour that exist only because the palette was changed between scan lines, swinging up and down on their own sines and passing in front of and behind each other.',
    make(R, U, g) {
      const { n, d } = g, k = R.int(5, 8), inks = X.inks(R, k, 0.5), h = Math.max(7, Math.round(n / 9));
      const bars = inks.map((c, i) => ({ ramp: X.rampPk([X.shade(c, 0.15), c, X.mixPk(c, WHITE, 0.75), c, X.shade(c, 0.15)], h), ph: i * 0.7, sp: R.range(0.6, 1.1) }));
      const floor = Math.round(n * 0.78), checkA = X.shade(inks[0], 0.25), checkB = X.shade(inks[1 % k], 0.4);
      return t => {
        d.fill(BLACK);
        const order = bars.map(b => ({ b, z: Math.cos(t * b.sp + b.ph), y: Math.round((floor - h) / 2 + Math.sin(t * b.sp + b.ph) * (floor - h) * 0.45) })).sort((a, c) => a.z - c.z);
        for (const { b, y } of order) for (let r = 0; r < h; r++) if (y + r >= 0 && y + r < floor) d.fill(b.ramp[r], (y + r) * n, (y + r) * n + n);
        // a checkerboard floor in perspective under the bars
        for (let y = floor; y < n; y++) {
          const z = 1 / ((y - floor + 1) / (n - floor)), row = Math.floor(z * 4 + t * 3);
          for (let x = 0; x < n; x++) { const u = Math.floor(((x - n / 2) * z * 0.12) + 100); d[y * n + x] = (u + row) & 1 ? checkA : checkB; }
        }
      };
    },
  });

  P.addPixel({
    name: 'Colour Cycle', seed: 1, fam: 'Demoscene', sizes: [100, 200], fps: 12,
    recipe: 'A waterfall where nothing moves: the picture is drawn once in palette indices, and only the palette rotates, so the water falls, the river runs and the stars twinkle.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, idx = new Uint8Array(N), nz = U.noise(R), inks = X.inks(R, 4, 0.3, true);
      // index ranges: 0-15 sky (still), 16-31 water fall (cycles), 32-47 river (cycles), 48-63 rock (still), 64-71 stars (cycle)
      const fx0 = Math.round(n * R.range(0.35, 0.5)), fw = Math.round(n * R.range(0.12, 0.2)), lip = Math.round(n * R.range(0.25, 0.35)), river = Math.round(n * 0.78);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, cliffEdge = lip + nz.n2(x * 0.08, 3) * 4, inFall = x >= fx0 && x < fx0 + fw && y >= lip && y < river;
        if (y >= river) idx[i] = 32 + ((x + Math.floor(nz.n2(x * 0.15, y * 0.5) * 6) + (y - river) * 3) & 15);
        else if (inFall) idx[i] = 16 + ((y * 2 + Math.floor(nz.n2(x * 0.6, 0) * 8)) & 15);
        else if (y >= cliffEdge) { const k = nz.fbm(x * 0.06, y * 0.06, 1, 3); idx[i] = 48 + Math.max(0, Math.min(15, Math.floor((k + 0.5) * 12 + (X.dith4(x, y) - 0.5) * 3))); }
        else idx[i] = R() < 0.012 ? 64 + R.int(0, 7) : Math.min(15, Math.floor(y / cliffEdge * 15 + (X.dith4(x, y) - 0.5)));
      }
      for (let y = river - 3; y < river + 3; y++) for (let x = fx0 - 3; x < fx0 + fw + 3; x++) if (x >= 0 && x < n && y >= 0 && y < n && R() < 0.5) idx[y * n + x] = 16 + R.int(0, 15);
      const pal = new Uint32Array(72);
      const skyR = X.rampPk([X.shade(inks[0], 0.3), X.mixPk(inks[1], WHITE, 0.2)], 16), rock = X.rampPk([0xff102030, X.shade(inks[2], 0.5), X.mixPk(inks[2], 0xff90a0b0, 0.5)], 16);
      const water = Array.from({ length: 16 }, (_, k) => X.mixPk(0xffc08040, WHITE, k < 3 ? 0.85 : k < 6 ? 0.4 : 0.05 + (k % 3) * 0.1));
      const riverC = Array.from({ length: 16 }, (_, k) => X.mixPk(0xff804020, 0xffe0c080, k % 8 < 2 ? 0.7 : 0.15));
      return (t, dt, f) => {
        const s = Math.floor(t * 12);
        for (let k = 0; k < 16; k++) { pal[k] = skyR[k]; pal[48 + k] = rock[k]; pal[16 + k] = water[(k - s + 1600) & 15]; pal[32 + k] = riverC[(k + Math.floor(s / 2)) & 15]; }
        for (let k = 0; k < 8; k++) pal[64 + k] = (k + (s >> 2)) % 8 === 0 ? WHITE : 0xff909090;
        for (let i = 0; i < N; i++) d[i] = pal[idx[i]];
      };
    },
  });

  P.addPixel({
    name: 'Sine Scroller', seed: 2, fam: 'Demoscene', sizes: [80, 100], fps: 12,
    listens: 'Speak or play music and the letters ride the shape of the sound.',
    recipe: 'A greeting written in large pixels and sent across the screen on a sine wave, every row of the letters a different colour, with its reflection rippling underneath.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, msg = '   ' + R.shuffle(WORDS.slice()).slice(0, 4).join(' * ') + '   ', S = n >= 100 ? 3 : 2, inks = X.inks(R, 7, 0.5);
      const rows = X.rampPk(inks, 7 * S), water = Math.round(n * 0.7), stars = Array.from({ length: 50 }, () => [R.range(0, n), R.int(0, water - 1), R.pick([0.3, 0.6, 1])]);
      const buf = new Uint32Array(n * n), view = { n, d: buf }, amp = R.range(0.1, 0.18) * n, freq = R.range(0.04, 0.08), speed = R.range(14, 22);
      const kit = scrollKit(g, n, d, buf, S, water, amp, freq), lead = (n * 0.75 + 18 * S) / speed;   // open with the words already on screen
      g.trait('Greeting', msg.trim().split(' * ')[0]); g.trait('Palette', inkName(inks)); g.trait('Backdrop', typeof back === 'string' ? cap(back) : 'Stars'); g.trait('Wave', amp > n * 0.14 ? 'Tall' : 'Gentle'); g.trait('Letters', S === 3 ? 'Large' : 'Small');
      return t => {
        d.fill(BLACK);
        for (const s of stars) { s[0] -= s[2]; if (s[0] < 0) s[0] += n; X.put(g, s[0], s[1], s[2] > 0.8 ? WHITE : 0xff707070); }
        buf.fill(0);
        const w = X.textWidth(msg, S), x0 = Math.round(n - ((t + lead) * speed) % (w + n));
        X.text(view, msg, x0, 0, (x, y) => rows[Math.min(rows.length - 1, y)], S);
        kit.step(); kit.blit(t);
        for (let y = water; y < n; y++) {
          const src = water - 1 - (y - water) * 2, shift = Math.round(Math.sin(y * 0.8 + t * 3) * 1.5);
          for (let x = 0; x < n; x++) { const sx = Math.min(n - 1, Math.max(0, x + shift)), c = src >= 0 ? d[src * n + sx] : BLACK; d[y * n + x] = X.mixPk(c, 0xff401808, 0.55); }
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, msg = '   ' + R.shuffle(WORDS.slice()).slice(0, 4).join(' * ') + '   ', S = n >= 100 ? 3 : 2, inks = X.inks(R, 7, 0.5);
      const rows = X.rampPk(inks, 7 * S), water = Math.round(n * 0.7), stars = Array.from({ length: 50 }, () => [R.range(0, n), R.int(0, water - 1), R.pick([0.3, 0.6, 1])]);
      const buf = new Uint32Array(n * n), view = { n, d: buf }, amp = R.range(0.1, 0.18) * n, freq = R.range(0.04, 0.08), speed = R.range(14, 22), back = R.pick(['stars', 'stars', 'bars', 'checks', 'plasma']);
      const barsR = inks.map(c => X.rampPk([X.shade(c, 0.1), X.shade(c, 0.5), X.shade(c, 0.1)], 9));
      const kit = scrollKit(g, n, d, buf, S, water, amp, freq), lead = (n * 0.75 + 18 * S) / speed;
      g.trait('Greeting', msg.trim().split(' * ')[0]); g.trait('Palette', inkName(inks)); g.trait('Backdrop', typeof back === 'string' ? cap(back) : 'Stars'); g.trait('Wave', amp > n * 0.14 ? 'Tall' : 'Gentle'); g.trait('Letters', S === 3 ? 'Large' : 'Small');
      return t => {
        d.fill(BLACK);
        if (back === 'stars') for (const s of stars) { s[0] -= s[2]; if (s[0] < 0) s[0] += n; X.put(g, s[0], s[1], s[2] > 0.8 ? WHITE : 0xff707070); }
        else if (back === 'bars') barsR.forEach((rr, k) => { const y0 = Math.round(water / 2 + Math.sin(t * 1.3 + k * 0.8) * water * 0.4 - 4); for (let r = 0; r < 9; r++) if (y0 + r >= 0 && y0 + r < water) d.fill(rr[r], (y0 + r) * n, (y0 + r) * n + n); });
        else if (back === 'checks') for (let y = 0; y < water; y++) for (let x = 0; x < n; x++) d[y * n + x] = ((((x + t * 6) / 8 | 0) + ((y + Math.sin(t + x * 0.05) * 3) / 8 | 0)) & 1) ? X.shade(inks[0], 0.18) : X.shade(inks[1], 0.1);
        else for (let y = 0; y < water; y += 1) for (let x = 0; x < n; x++) { const v = Math.sin(x * 0.11 + t) + Math.sin(y * 0.13 - t * 0.7) + Math.sin((x + y) * 0.07 + t * 0.4); d[y * n + x] = X.shade(rows[Math.floor((v + 3) / 6 * (rows.length - 1))], 0.22); }
        buf.fill(0);
        const w = X.textWidth(msg, S), x0 = Math.round(n - ((t + lead) * speed) % (w + n));
        X.text(view, msg, x0, 0, (x, y) => rows[Math.min(rows.length - 1, y)], S);
        kit.step(); kit.blit(t);
        for (let y = water; y < n; y++) {
          const src = water - 1 - (y - water) * 2, shift = Math.round(Math.sin(y * 0.8 + t * 3) * 1.5);
          for (let x = 0; x < n; x++) { const sx = Math.min(n - 1, Math.max(0, x + shift)), c = src >= 0 ? d[src * n + sx] : BLACK; d[y * n + x] = X.mixPk(c, 0xff401808, 0.55); }
        }
      };
      }

    },
  });

  P.addPixel({
    name: 'Vector Balls', seed: 1, fam: 'Demoscene', sizes: [80, 100], fps: 12,
    interactive: 'Drag to turn the formation.',
    listens: 'The balls pulse on every beat, spin faster when the room is loud, and a clap moves them to the next shape.',
    recipe: 'Shaded balls arranged in three dimensions, turning, and every few seconds flowing from one formation to the next: cube, sphere, ring, spiral, wave, torus, double helix and star.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, M = 64, inks = X.inks(R, 4, 0.45);
      const forms = [
        k => { const a = k % 4, b = (k >> 2) % 4, c = k >> 4; return [(a - 1.5) / 1.5, (b - 1.5) / 1.5, (c - 1.5) / 1.5]; },
        k => { const ph = Math.acos(1 - 2 * (k + 0.5) / M), th = Math.PI * (1 + Math.sqrt(5)) * k; return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)]; },
        k => { const a = k / M * U.TAU; return [Math.cos(a) * (1 + 0.3 * Math.cos(a * 8)), 0.3 * Math.sin(a * 8), Math.sin(a) * (1 + 0.3 * Math.cos(a * 8))]; },
        k => { const a = k / M * U.TAU * 3; return [Math.cos(a) * 0.8, k / M * 2 - 1, Math.sin(a) * 0.8]; },
        k => { const a = k % 8, b = k >> 3; return [(a - 3.5) / 3.5, Math.sin(a * 0.9 + b * 0.9) * 0.4, (b - 3.5) / 3.5]; },
      ];
      const order = R.shuffle(forms.slice()), cols = Array.from({ length: M }, (_, k) => inks[k % inks.length]);
      const ball = r => { const out = [], R0 = Math.ceil(r); for (let y = -R0; y <= R0; y++) for (let x = -R0; x <= R0; x++) { const q = (x * x + y * y) / (r * r + 0.5); if (q <= 1) out.push([x, y, Math.max(0, 1 - q) * 0.6 + Math.max(0, -(x + y) / (2 * r)) * 0.6]); } return out; };
      // the smallest ball is a full three-by-three, so even far ones read round
      const sprites = [1.5, 2, 3, 4].map(ball), ear = ballsEar(g);
      const colouring = g.home ? 'Mixed' : g.alt.pick(['Mixed', 'Mixed', 'Layers', 'Pairs']), zoom = g.home ? 1 : g.alt.pick([1, 1, 0.78, 1.18]); if (colouring !== 'Mixed') for (let q = 0; q < M; q++) cols[q] = inks[(colouring === 'Layers' ? q >> 4 : (q >> 1) & 1) % inks.length]; g.trait('First form', ['Cube', 'Sphere', 'Ring', 'Spiral', 'Wave', 'Torus', 'Helix', 'Star'][forms.indexOf(order[0])]); g.trait('Palette', typeof sc === 'object' ? sc.name : inkName(inks)); g.trait('Colouring', colouring); g.trait('Scale', zoom > 1 ? 'Close' : zoom < 1 ? 'Far' : 'Middle'); g.trait('Grid', n);
      const inp = g.input;
      let dragX = 0, dragY = 0, lx = null, ly = null;
      return (t, dt) => {
        if (inp.down) { if (lx !== null) { dragX += (inp.x - lx) * 6; dragY += (inp.y - ly) * 6; } lx = inp.x; ly = inp.y; } else lx = null;
        ear.step(t, dt);
        const ph = (t + ear.ph) / 5, k = Math.floor(ph), u = U.smooth(Math.min(1, (ph - k) * 2.5)), A = order[k % order.length], B = order[(k + 1) % order.length];
        const ay = t * 0.5 + dragX + ear.spin, ax = t * 0.31 + dragY, cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
        for (let y = 0; y < n; y++) d.fill(X.shade(inks[0], 0.08 + 0.1 * y / n), y * n, y * n + n);
        const pts = [], sc0 = n * 0.29 * zoom * ear.scale;
        for (let i = 0; i < M; i++) {
          const a = A(i), b = B(i), p = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
          let x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y = p[1] * cx - z * sx; z = p[1] * sx + z * cx;
          const s = sc0 / (2.6 + z) * 2.6;
          pts.push({ x: n / 2 + x * s, y: n / 2 + y * s, z, c: cols[i] });
        }
        pts.sort((a, b) => b.z - a.z);
        for (const p of pts) {
          const spr = sprites[Math.max(0, Math.min(3, Math.round((1.4 - p.z) * 1.4 * n / 100)))];
          for (const [dx, dy, l] of spr) X.put(g, Math.round(p.x) + dx, Math.round(p.y) + dy, l > 0.75 ? X.mixPk(p.c, WHITE, 0.6) : X.shade(p.c, 0.35 + l));
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, M = 64, sc = X.PIX.scheme(R), inks = sc.ramps.map(r => r[1]), inp = g.input;
      const forms = [
        k => { const a = k % 4, b = (k >> 2) % 4, c = k >> 4; return [(a - 1.5) / 1.5, (b - 1.5) / 1.5, (c - 1.5) / 1.5]; },
        k => { const ph = Math.acos(1 - 2 * (k + 0.5) / M), th = Math.PI * (1 + Math.sqrt(5)) * k; return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)]; },
        k => { const a = k / M * U.TAU; return [Math.cos(a) * (1 + 0.3 * Math.cos(a * 8)), 0.3 * Math.sin(a * 8), Math.sin(a) * (1 + 0.3 * Math.cos(a * 8))]; },
        k => { const a = k / M * U.TAU * 3; return [Math.cos(a) * 0.8, k / M * 2 - 1, Math.sin(a) * 0.8]; },
        k => { const a = k % 8, b = k >> 3; return [(a - 3.5) / 3.5, Math.sin(a * 0.9 + b * 0.9) * 0.4, (b - 3.5) / 3.5]; },
        k => { const a = (k % 16) / 16 * U.TAU, b = (k >> 4) / 4 * U.TAU; return [(0.75 + 0.3 * Math.cos(b)) * Math.cos(a), 0.3 * Math.sin(b), (0.75 + 0.3 * Math.cos(b)) * Math.sin(a)]; },
        k => { const a = (k >> 1) / 32 * U.TAU * 2, s = k & 1 ? Math.PI : 0; return [Math.cos(a + s) * 0.6, (k >> 1) / 32 * 2 - 1, Math.sin(a + s) * 0.6]; },
        k => { const a = k / M * U.TAU * 5, r = 0.4 + 0.6 * Math.abs(Math.cos(k / M * U.TAU * 2.5)); return [Math.cos(a / 5) * r, Math.sin(a / 5) * r, Math.sin(a) * 0.15]; },
      ];
      const order = R.shuffle(forms.slice()), cols = Array.from({ length: M }, (_, k) => inks[k % inks.length]);
      const ball = r => { const out = [], R0 = Math.ceil(r); for (let y = -R0; y <= R0; y++) for (let x = -R0; x <= R0; x++) { const q = (x * x + y * y) / (r * r + 0.5); if (q <= 1) out.push([x, y, Math.max(0, 1 - q) * 0.6 + Math.max(0, -(x + y) / (2 * r)) * 0.6]); } return out; };
      const sprites = [1.5, 2, 3, 4].map(ball), ear = ballsEar(g);
      const colouring = g.home ? 'Mixed' : g.alt.pick(['Mixed', 'Mixed', 'Layers', 'Pairs']), zoom = g.home ? 1 : g.alt.pick([1, 1, 0.78, 1.18]); if (colouring !== 'Mixed') for (let q = 0; q < M; q++) cols[q] = inks[(colouring === 'Layers' ? q >> 4 : (q >> 1) & 1) % inks.length]; g.trait('First form', ['Cube', 'Sphere', 'Ring', 'Spiral', 'Wave', 'Torus', 'Helix', 'Star'][forms.indexOf(order[0])]); g.trait('Palette', typeof sc === 'object' ? sc.name : inkName(inks)); g.trait('Colouring', colouring); g.trait('Scale', zoom > 1 ? 'Close' : zoom < 1 ? 'Far' : 'Middle'); g.trait('Grid', n);
      // a smooth backdrop from the scheme's darkest ground to its lightest, dithered cell by cell
      const bgR = X.rampPk([sc.ground[0], sc.ground[sc.ground.length - 1]], 8), back = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const z = y / n * 7 * 0.8; back[y * n + x] = bgR[Math.min(7, Math.floor(z + X.dith8(x, y)))]; }
      let dragX = 0, dragY = 0, lx = null, ly = null;
      return (t, dt) => {
        if (inp.down) { if (lx !== null) { dragX += (inp.x - lx) * 6; dragY += (inp.y - ly) * 6; } lx = inp.x; ly = inp.y; } else lx = null;
        ear.step(t, dt);
        const ph = (t + ear.ph) / 5, k = Math.floor(ph), u = U.smooth(Math.min(1, (ph - k) * 2.5)), A = order[k % order.length], B = order[(k + 1) % order.length];
        const ay = t * 0.5 + dragX + ear.spin, ax = t * 0.31 + dragY, cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
        d.set(back);
        const pts = [], sc0 = n * 0.29 * zoom * ear.scale;
        for (let i = 0; i < M; i++) {
          const a = A(i), b = B(i), p = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
          let x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y = p[1] * cx - z * sx; z = p[1] * sx + z * cx;
          const s = sc0 / (2.6 + z) * 2.6;
          pts.push({ x: n / 2 + x * s, y: n / 2 + y * s, z, c: cols[i] });
        }
        pts.sort((a, b) => b.z - a.z);
        for (const p of pts) {
          const spr = sprites[Math.max(0, Math.min(3, Math.round((1.4 - p.z) * 1.4 * n / 100)))];
          for (const [dx, dy, l] of spr) X.put(g, Math.round(p.x) + dx, Math.round(p.y) + dy, l > 0.75 ? X.mixPk(p.c, WHITE, 0.6) : X.shade(p.c, 0.35 + l));
        }
      };
      }

    },
  });

  P.addPixel({
    name: 'Shadebobs', seed: 1, fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    interactive: 'Move the pointer to drag your own bob through the colours; a click presses a ring into them.',
    recipe: 'Soft stamps (discs, squares, rings or diamonds) dragged along looping paths, each pass adding a little to every cell it covers. The sums wrap round the palette, so overlaps turn into rings of colour.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, N = n * n, acc = new Uint8Array(N), sc = U.scheme(R, 0.5), k = R.int(3, 6), r = Math.round(n * R.range(0.08, 0.14));
      const bobs = Array.from({ length: k }, () => ({ a: R.range(0.3, 0.9), b: R.range(0.3, 0.9), p: R.range(0, 6), q: R.range(0, 6) }));
      const stamp = [];
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r) stamp.push(y * n + x, x, y);
      let life = 0;
      const kit = bobsKit(g, n, acc, stamp);
      g.trait('Palette', scName(sc)); g.trait('Bobs', bobs.length); g.trait('Stamp', typeof shape === 'string' ? cap(shape) : 'Disc'); g.trait('Size', r < n * 0.09 ? 'Small' : r < n * 0.12 ? 'Medium' : 'Large'); g.trait('Grid', n);
      return (t, dt) => {
        if ((life += dt) > 30) { life = 0; acc.fill(0); }
        for (const b of bobs) {
          const cx = Math.round(n / 2 + Math.sin(t * b.a + b.p) * n * 0.32), cy = Math.round(n / 2 + Math.sin(t * b.b + b.q) * n * 0.32);
          for (let s = 0; s < stamp.length; s += 3) { const x = cx + stamp[s + 1], y = cy + stamp[s + 2]; if (x >= 0 && y >= 0 && x < n && y < n) acc[y * n + x] = (acc[y * n + x] + 3) & 255; }
        }
        if (g.input.inside) { const cx = Math.round(g.input.x * n), cy = Math.round(g.input.y * n); for (let s = 0; s < stamp.length; s += 3) { const x = cx + stamp[s + 1], y = cy + stamp[s + 2]; if (x >= 0 && y >= 0 && x < n && y < n) acc[y * n + x] = (acc[y * n + x] + 3) & 255; } }
        kit.press();
        const fade = kit.fade(life);
        for (let i = 0; i < N; i++) d[i] = acc[i] && !(fade && X.dith4(i % n, (i / n) | 0) < fade) ? sc.lut[acc[i] & 0xf0] : BLACK;
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, N = n * n, acc = new Uint8Array(N), sc = U.scheme(R, 0.5), k = R.int(2, 6), r = Math.round(n * R.range(0.06, 0.15)), shape = R.pick(['disc', 'disc', 'square', 'ring', 'diamond']), inp = g.input, step = R.pick([2, 3, 5]);
      const bobs = Array.from({ length: k }, () => ({ a: R.range(0.3, 0.9), b: R.range(0.3, 0.9), p: R.range(0, 6), q: R.range(0, 6) }));
      const stamp = [];
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const q = shape === 'square' ? Math.max(Math.abs(x), Math.abs(y)) / r : shape === 'diamond' ? (Math.abs(x) + Math.abs(y)) / r : Math.hypot(x, y) / r; if (q <= 1 && (shape !== 'ring' || q > 0.55)) stamp.push(y * n + x, x, y); }
      let life = 0;
      const kit = bobsKit(g, n, acc, stamp);
      g.trait('Palette', scName(sc)); g.trait('Bobs', bobs.length); g.trait('Stamp', typeof shape === 'string' ? cap(shape) : 'Disc'); g.trait('Size', r < n * 0.09 ? 'Small' : r < n * 0.12 ? 'Medium' : 'Large'); g.trait('Grid', n);
      return (t, dt) => {
        if ((life += dt) > 30) { life = 0; acc.fill(0); }
        const centres = bobs.map(b => [Math.round(n / 2 + Math.sin(t * b.a + b.p) * n * 0.32), Math.round(n / 2 + Math.sin(t * b.b + b.q) * n * 0.32)]);
        if (inp.inside) centres.push([Math.round(inp.x * n), Math.round(inp.y * n)]);
        for (const [cx, cy] of centres) {
          for (let s = 0; s < stamp.length; s += 3) { const x = cx + stamp[s + 1], y = cy + stamp[s + 2]; if (x >= 0 && y >= 0 && x < n && y < n) acc[y * n + x] = (acc[y * n + x] + step) & 255; }
        }
        kit.press();
        const fade = kit.fade(life);
        for (let i = 0; i < N; i++) d[i] = acc[i] && !(fade && X.dith4(i % n, (i / n) | 0) < fade) ? sc.lut[acc[i] & 0xf0] : BLACK;
      };
      }

    },
  });

  P.addPixel({
    name: 'Twister', fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    recipe: 'A square column twisted along its length, drawn one scan line at a time: on each line only the faces turned toward you are filled, each with its own colour and light.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, inks = X.inks(R, 4, 0.5), k = R.pick([1, 1, 2]), w = n * (k === 1 ? 0.22 : 0.14), bg = X.rampPk([X.shade(inks[0], 0.1), X.shade(inks[1], 0.25)], n);
      const twist = R.range(0.015, 0.035), wob = R.range(0.6, 1.4);
      const F = g.home ? 4 : g.alt.pick([4, 4, 3, 6]);
      g.trait('Columns', k); g.trait('Faces', F); g.trait('Twist', twist < 0.022 ? 'Gentle' : twist < 0.028 ? 'Medium' : 'Tight'); g.trait('Palette', inkName(inks)); g.trait('Bands', 'None'); g.trait('Grid', n);
      return t => {
        for (let y = 0; y < n; y++) d.fill(bg[y], y * n, y * n + n);
        for (let c = 0; c < k; c++) {
          const cx = k === 1 ? n / 2 : n * (c ? 0.68 : 0.32);
          for (let y = 0; y < n; y++) {
            const a = t * (c ? -0.9 : 0.8) + Math.sin(y * twist + t * wob + c) * 2.2, sway = Math.sin(y * 0.03 + t * 0.7 + c * 2) * n * 0.06;
            for (let f = 0; f < F; f++) {
              const a1 = a + f * U.TAU / F, a2 = a1 + U.TAU / F, x1 = cx + sway + Math.sin(a1) * w, x2 = cx + sway + Math.sin(a2) * w;
              if (x2 <= x1) continue;
              const light = 0.35 + 0.65 * Math.cos(a1 + Math.PI / F), col = X.shade(inks[f % inks.length], light), r1 = Math.round(x1), r2 = Math.round(x2), hi = light > 0.86 ? X.mixPk(col, WHITE, (light - 0.86) * 2.2) : 0, mid = (r1 + r2) >> 1;
              for (let x = r1; x < r2; x++) if (x >= 0 && x < n) d[y * n + x] = x === r1 ? X.shade(col, 0.5) : x === r2 - 1 && r2 - r1 > 2 ? X.shade(col, 0.72) : hi && Math.abs(x - mid) <= (r2 - r1) >> 3 ? hi : col;
            }
          }
        }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, sc = X.PIX.scheme(R), inks = R.shuffle(sc.ramps.map(r => r[1])).concat(sc.ramps.map(r => r[2])).slice(0, 4), k = R.pick([1, 1, 2, 3]), w = n * (k === 1 ? 0.22 : k === 2 ? 0.14 : 0.1), bg = X.rampPk([sc.ground[0], sc.ground[sc.ground.length - 1]], n);
      const twist = R.range(0.015, 0.035), wob = R.range(0.6, 1.4), stripes = R.bool(0.4);
      const F = g.alt.pick([4, 4, 3, 6]);
      g.trait('Columns', k); g.trait('Faces', F); g.trait('Twist', twist < 0.022 ? 'Gentle' : twist < 0.028 ? 'Medium' : 'Tight'); g.trait('Palette', sc.name); g.trait('Bands', stripes ? 'Striped' : 'None'); g.trait('Grid', n);
      return t => {
        for (let y = 0; y < n; y++) d.fill(bg[y], y * n, y * n + n);
        for (let c = 0; c < k; c++) {
          const cx = n * (c + 0.5) / k;
          for (let y = 0; y < n; y++) {
            const a = t * (c ? -0.9 : 0.8) + Math.sin(y * twist + t * wob + c) * 2.2, sway = Math.sin(y * 0.03 + t * 0.7 + c * 2) * n * 0.06;
            for (let f = 0; f < F; f++) {
              const a1 = a + f * U.TAU / F, a2 = a1 + U.TAU / F, x1 = cx + sway + Math.sin(a1) * w, x2 = cx + sway + Math.sin(a2) * w;
              if (x2 <= x1) continue;
              const light = 0.35 + 0.65 * Math.cos(a1 + Math.PI / F), col = X.shade(inks[f % inks.length], stripes && ((y + Math.floor(a * 6)) & 7) < 2 ? light * 0.6 : light), r1 = Math.round(x1), r2 = Math.round(x2), hi = light > 0.86 ? X.mixPk(col, WHITE, (light - 0.86) * 2.2) : 0, mid = (r1 + r2) >> 1;
              for (let x = r1; x < r2; x++) if (x >= 0 && x < n) d[y * n + x] = x === r1 ? X.shade(col, 0.5) : x === r2 - 1 && r2 - r1 > 2 ? X.shade(col, 0.72) : hi && Math.abs(x - mid) <= (r2 - r1) >> 3 ? hi : col;
            }
          }
        }
      };
      }

    },
  });

  P.addPixel({
    name: 'Emboss', seed: 1, fam: 'Demoscene', sizes: [80, 100, 200], fps: 12,
    interactive: 'Point to move the lamp; click to press a dent into the plate (it stays for the next visitor).',
    recipe: 'A relief lit by a moving lamp: a height map of a word and some soft shapes, where each cell takes its light from the slope it sits on, so the letters rise out of a plate of gold, steel, ice, jade, copper or amethyst.',
    make(R, U, g) {
      // the original, exactly, on the opening variation and at least half the rolls; the rework otherwise
      return g.home || g.alt() < 0.5 ? og(R, U, g) : rework(R, U, g);
      function og(R, U, g) {
      const { n, d } = g, N = n * n, H = new Float32Array(N), nz = U.noise(R), inks = X.inks(R, 3, 0.35, true), word = R.pick(WORDS);
      // the plate (second stream): cloudy as before, hammered, brushed or smooth
      const plate = g.home ? 'Cloudy' : g.alt.pick(['Cloudy', 'Cloudy', 'Hammered', 'Brushed', 'Smooth']);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) H[y * n + x] = plate === 'Hammered' ? nz.fbm(x / n * 6, y / n * 6, 2, 2) * 1.4 + nz.fbm(x / n * 1.6, y / n * 1.6, 2, 2) : plate === 'Brushed' ? nz.fbm(x / n * 0.5, y / n * 14, 2, 3) * 1.2 : plate === 'Smooth' ? nz.fbm(x / n * 0.7, y / n * 0.7, 2, 2) * 2 : nz.fbm(x / n * 1.6, y / n * 1.6, 2, 3) * 3;
      const S = Math.max(1, Math.floor(n * 0.9 / (word.length * 6))), mask = new Uint8Array(N), view = { n, d: mask };
      g.trait('Metal', typeof metal === 'object' ? ['Gold', 'Steel', 'Ice', 'Jade', 'Copper', 'Amethyst'][METALS.indexOf(metal)] : inkName(inks)); g.trait('Word', word); g.trait('Plate', plate); g.trait('Grid', n);
      X.text(view, word, Math.round((n - X.textWidth(word, S)) / 2), Math.round(n / 2 - 3.5 * S), 1, S);
      // soften the letters a little so they have bevels
      const L = new Float32Array(N);
      for (let i = 0; i < N; i++) L[i] = mask[i];
      for (let it = 0; it < 2; it++) for (let i = n + 1; i < N - n - 1; i++) L[i] = (L[i] * 2 + L[i - 1] + L[i + 1] + L[i - n] + L[i + n]) / 6;
      for (let i = 0; i < N; i++) H[i] += L[i] * 5;
      const ramp = X.rampPk([X.shade(inks[0], 0.2), inks[1], X.mixPk(inks[2], WHITE, 0.7)], 64), kit = embossKit(g, n, H, L, ramp);
      return t => {
        let lx = Math.cos(t * 0.5), ly = Math.sin(t * 0.5);
        if (g.input.inside) { const ax = g.input.x - 0.5, ay = g.input.y - 0.5, m = Math.hypot(ax, ay) || 1; lx = -ax / m; ly = -ay / m; }
        kit.step();
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
          const i = y * n + x, gx = H[i + 1] - H[i - 1], gy = H[i + n] - H[i - n];
          const v = 0.5 - (gx * lx + gy * ly) * 0.35;
          d[i] = kit.at(i, v);
        }
        for (let k = 0; k < n; k++) { d[k] = d[k + n]; d[(n - 1) * n + k] = d[(n - 2) * n + k]; d[k * n] = d[k * n + 1]; d[k * n + n - 1] = d[k * n + n - 2]; }
      };
      }
      function rework(R, U, g) {
      const { n, d } = g, N = n * n, H = new Float32Array(N), nz = U.noise(R), word = R.pick(WORDS), inp = g.input;
      const METALS = [['#3a2a0a', '#a07a20', '#fff1a8'], ['#1f1f26', '#6e6e7a', '#f0f0f8'], ['#0b1a2a', '#5a8ab0', '#ffffff'], ['#0b2a1a', '#2e8a5a', '#c4f0d0'], ['#2a0f0a', '#b5562a', '#ffd0a0'], ['#1a0b2a', '#7a4fb8', '#f0d0ff']];
      const metal = R.pick(METALS), inks = metal.map(X.PIX.hex);
      // the plate (second stream): cloudy as before, hammered, brushed or smooth
      const plate = g.home ? 'Cloudy' : g.alt.pick(['Cloudy', 'Cloudy', 'Hammered', 'Brushed', 'Smooth']);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) H[y * n + x] = plate === 'Hammered' ? nz.fbm(x / n * 6, y / n * 6, 2, 2) * 1.4 + nz.fbm(x / n * 1.6, y / n * 1.6, 2, 2) : plate === 'Brushed' ? nz.fbm(x / n * 0.5, y / n * 14, 2, 3) * 1.2 : plate === 'Smooth' ? nz.fbm(x / n * 0.7, y / n * 0.7, 2, 2) * 2 : nz.fbm(x / n * 1.6, y / n * 1.6, 2, 3) * 3;
      const S = Math.max(1, Math.floor(n * 0.9 / (word.length * 6))), mask = new Uint8Array(N), view = { n, d: mask };
      g.trait('Metal', typeof metal === 'object' ? ['Gold', 'Steel', 'Ice', 'Jade', 'Copper', 'Amethyst'][METALS.indexOf(metal)] : inkName(inks)); g.trait('Word', word); g.trait('Plate', plate); g.trait('Grid', n);
      X.text(view, word, Math.round((n - X.textWidth(word, S)) / 2), Math.round(n / 2 - 3.5 * S), 1, S);
      // soften the letters a little so they have bevels
      const L = new Float32Array(N);
      for (let i = 0; i < N; i++) L[i] = mask[i];
      for (let it = 0; it < 2; it++) for (let i = n + 1; i < N - n - 1; i++) L[i] = (L[i] * 2 + L[i - 1] + L[i + 1] + L[i - n] + L[i + n]) / 6;
      for (let i = 0; i < N; i++) H[i] += L[i] * 5;
      const ramp = X.rampPk([inks[0], inks[1], inks[2]], 64), kit = embossKit(g, n, H, L, ramp);
      return t => {
        let lx = Math.cos(t * 0.5), ly = Math.sin(t * 0.5);
        if (inp.inside) { const ax = inp.x - 0.5, ay = inp.y - 0.5, m = Math.hypot(ax, ay) || 1; lx = -ax / m; ly = -ay / m; }
        kit.step();
        for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
          const i = y * n + x, gx = H[i + 1] - H[i - 1], gy = H[i + n] - H[i - n];
          const v = 0.5 - (gx * lx + gy * ly) * 0.35;
          d[i] = kit.at(i, v);
        }
        for (let k = 0; k < n; k++) { d[k] = d[k + n]; d[(n - 1) * n + k] = d[(n - 2) * n + k]; d[k * n] = d[k * n + 1]; d[k * n + n - 1] = d[k * n + n - 2]; }
      };
      }

    },
  });
})();
