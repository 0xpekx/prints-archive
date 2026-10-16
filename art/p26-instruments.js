// Set 3 · Instruments: machines that measure, keep time and make sound, drawn in
// cells. The music pieces play their notes (muted until the viewer unmutes),
// and the instruments answer the pointer in the large view.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 3, fam: 'Instruments' }, def));
  // The original piece is the og path: its own opening variation and most rolls
  // draw exactly what it always drew. The rework (alt) takes the other rolls.
  // Neither the choice nor any interaction draws from R (g.alt is its own stream).
  const fork = (og, alt, ok) => (R, U, g) => g.home || (ok && !ok(g)) || g.alt() < 0.6 ? og(R, U, g) : alt(R, U, g);
  // the viewer's hand: taps this frame, and whether they touched the piece lately
  function hand(g, hold = 10) {
    let t = 0, last = -1e9;
    const h = { taps: [], get active() { return t - last < hold; } };
    h.step = dt => { t += dt; h.taps = g.input.taps(); if (h.taps.length || g.input.down) last = t; return h; };
    return h;
  }
  // The first frame of a radar already shows a screen the sweep has been painting
  // for a full turn: each cell's afterglow is what it would have faded to since the beam passed.
  function radarWarm(buf, ang, echo, a1, speed, fps = 12) {
    for (let i = 0; i < buf.length; i++) {
      if (echo[i] < 0) continue;
      const da = ((((speed > 0 ? a1 - ang[i] : ang[i] - a1)) % TAU) + TAU) % TAU;
      buf[i] = (0.25 + echo[i] * 0.75) * Math.pow(0.955, da / Math.abs(speed) * fps);
    }
  }
  // Seismograph Listen: the pens write the room's own wave, scaled by its loudness, and
  // a clap rolls a quake through them. Silent (and exactly as before) when not listening.
  // It also keeps the quakes in hand when a burst of taps arrives at once.
  function seismoEar(g, gap) {
    const inp = g.input, wave = new Float32Array(256);
    const ear = { amp: 0, wave };
    let lastQ = -1e9;
    ear.hear = (t, quakes) => {
      ear.amp = 0;
      if (inp.listening) {
        let pk = 0.02;
        for (let i = 0; i < 256; i++) pk = Math.max(pk, Math.abs(inp.wave[i]));
        for (let i = 0; i < 256; i++) wave[i] = inp.wave[i] / pk;
        ear.amp = gap * 0.4 * Math.min(1, inp.level * 1.3);
        if (inp.beats() && t - lastQ > 1.5) { lastQ = t; quakes.push({ t0: t, amp: gap * (0.4 + 0.3 * inp.level), fr: 2.6 + (t * 7.3 % 1) * 1.2, dur: 3 }); }
      }
      while (quakes.length > 4) quakes.shift();
    };
    return ear;
  }
  // Music box: the inside of the box (a velvet lining between wooden walls, the wooden
  // floor with the drum's shadow on it), painted once; and the brass drum in five tones, lit from above.
  function boxBack(n, floorY, wood, velvet, dx, dw) {
    const out = new Uint32Array(n * n), wall = X.shade(wood, 0.8), wallL = X.shade(wood, 1.15), grain = X.shade(wood, 0.88);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      let c;
      if (y >= floorY) c = y === floorY ? X.shade(wood, 1.4) : (y - floorY) % 3 === 2 ? grain : wood;
      else if (x < 2 || x >= n - 2) c = x === 1 || x === n - 2 ? wallL : wall;
      else { c = X.shade(velvet, 0.55 + 0.45 * Math.pow(y / floorY, 0.7)); if ((x + y * 2) % 5 === 0) c = X.shade(c, 0.82); if (y === floorY - 1) c = X.shade(c, 0.6); }
      out[y * n + x] = c;
    }
    for (let x = dx + 1; x < dx + dw - 1; x++) for (const y of [floorY + 1, floorY + 2]) if (x >= 0 && x < n && y < n) out[y * n + x] = X.shade(out[y * n + x], 0.55);
    return out;
  }
  function drum(g, x, w, cy, rad, brass) {
    const tones = [X.shade(brass[0], 0.7), brass[0], brass[1], brass[2], X.mixPk(brass[2], WHITE, 0.55)];
    for (let y = cy - rad; y <= cy + rad; y++) {
      const b = Math.cos(Math.asin(Math.max(-1, Math.min(1, (y - cy) / rad))) + 0.35);
      X.rect(g, x, y, w, 1, tones[b > 0.97 ? 4 : b > 0.8 ? 3 : b > 0.5 ? 2 : b > 0.15 ? 1 : 0]);
    }
    X.rect(g, x, cy - rad + 1, 1, rad * 2 - 1, tones[0]); X.rect(g, x + w - 1, cy - rad + 1, 1, rad * 2 - 1, tones[0]);
  }
  // Metronomes: a striped wallpaper lit from the upper left, painted once.
  function wallpaper(n, wall, shelfY) {
    const out = new Uint32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const lamp = 1.15 + 1.3 * Math.exp(-((x - n * 0.25) ** 2 + (y - n * 0.05) ** 2) / (n * n * 0.2));
      let c = X.shade(wall, lamp * (x % 8 < 4 ? 1 : 1.3));
      if (y === Math.round(shelfY * 0.2)) c = X.shade(wall, 1.6 * lamp); else if (y === Math.round(shelfY * 0.2) + 1) c = X.shade(wall, 0.7);
      if (y > shelfY - 3) c = X.shade(c, 0.75);
      out[y * n + x] = c;
    }
    return out;
  }
  // Metronomes Listen: each clap pulls every pendulum toward its tick, and a steady clapping
  // tempo draws their speed toward it (relaxing back once the room is quiet).
  function metroEar(g, ph, om) {
    const om0 = om.slice();
    let clock = 0, lastClap = -1e9;
    return dt => {
      clock += dt;
      for (let i = 0; i < om.length; i++) om[i] += (om0[i] - om[i]) * Math.min(1, dt * 0.08);
      if (!g.input.listening || !g.input.beats()) return false;
      const gap = clock - lastClap; lastClap = clock;
      for (let i = 0; i < ph.length; i++) {
        ph[i] += (Math.round(ph[i] / Math.PI) * Math.PI - ph[i]) * 0.65;
        if (gap > 0.3 && gap < 1.6) om[i] += (Math.PI / gap - om[i]) * 0.35;
      }
      return true;
    };
  }
  // Patch Bay: a sagging cable with a soft shadow on the panel, a darker underside, beads of
  // signal running along it, and plugs in both jacks. Cables the viewer patched are kept
  // (the machine re-patches its own); a new patch still replaces the oldest cable.
  const CAB = new Float32Array(52);
  function cable(g, A, B, m, sag, col, pos, panel) {
    for (let s = 0; s <= m; s++) { const u = s / m; CAB[s * 2] = A.x + (B.x - A.x) * u; CAB[s * 2 + 1] = A.y + (B.y - A.y) * u + Math.sin(u * Math.PI) * sag; }
    const sh = X.shade(panel, 0.72), under = X.shade(col, 0.55), bead = X.mixPk(col, WHITE, 0.6);
    for (let s = 1; s <= m; s++) X.line(g, CAB[s * 2 - 2] + 1, CAB[s * 2 - 1] + 2, CAB[s * 2] + 1, CAB[s * 2 + 1] + 2, sh);
    for (let s = 1; s <= m; s++) X.line(g, CAB[s * 2 - 2], CAB[s * 2 - 1] + 1, CAB[s * 2], CAB[s * 2 + 1] + 1, under);
    for (let s = 1; s <= m; s++) { const u = s / m; X.line(g, CAB[s * 2 - 2], CAB[s * 2 - 1], CAB[s * 2], CAB[s * 2 + 1], ((u - pos) % 0.25 + 0.25) % 0.25 < 0.04 ? bead : col); }
    for (const J of [A, B]) { X.rect(g, J.x - 1, J.y - 1, 3, 3, X.shade(col, 0.7)); X.put(g, J.x - 1, J.y - 1, X.mixPk(col, WHITE, 0.35)); }
  }
  const freeCable = (cables, i) => !cables[i].user ? i : cables.findIndex(c => !c.user);
  // ---------- traits: what a variation rolled, named for the viewer ----------
  const HUES = [[5, 'Red'], [10, 'Orange'], [17, 'Amber'], [22, 'Yellow'], [28, 'Lime'], [40, 'Green'], [47, 'Teal'], [56, 'Cyan'], [65, 'Blue'], [75, 'Indigo'], [85, 'Violet'], [95, 'Magenta']];
  const hueName = h => { h = ((h % 100) + 100) % 100; for (const [lim, nm] of HUES) if (h < lim) return nm; return 'Red'; };
  const palName = sc => sc.native ? 'Spectrum' : sc.name;
  // a new roll from g.alt for other variations; the opening variation keeps its first value
  const roll = (g, vals, w) => { if (g.home) return vals[0]; let u = g.alt() * (w ? w.reduce((a, b) => a + b, 0) : vals.length); for (let i = 0; i < vals.length; i++) { u -= w ? w[i] : 1; if (u < 0) return vals[i]; } return vals[vals.length - 1]; };
  const SCALE_NAMES = { '0,2,4,5,7,9,11': 'Major', '0,2,3,5,7,8,10': 'Minor', '0,2,4,7,9': 'Pentatonic', '0,3,5,7,10': 'Blues pentatonic', '0,2,3,5,7,9,10': 'Dorian', '0,1,4,5,7,8,10': 'Hijaz', '0,2,3,7,8': 'Hirajoshi' };
  const scaleName = sc => SCALE_NAMES[sc.join(',')] || 'Modal';
  const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  // Piano Roll: the roll's look (night studio, an old pianola paper roll, or neon on black) and its zoom
  const rollZoom = g => g.trait('Zoom', roll(g, ['Wide', 'Close'], [3, 1])) === 'Close' ? 3 : 2;
  function rollTheme(g, voice) {
    const kind = g.trait('Roll', roll(g, ['Night', 'Pianola', 'Neon'], [5, 3, 2]));
    if (kind === 'Pianola') {
      const ink = voice.map(v => X.mixPk(v, X.rgb(54, 34, 24), 0.72));
      return { laneW: X.rgb(230, 218, 190), laneB: X.rgb(220, 206, 176), hover: X.rgb(242, 232, 206), beat: X.rgb(208, 192, 160), bar: X.rgb(176, 154, 118), note: ink, edge: ink.map(v => X.shade(v, 0.6)), sep: X.rgb(110, 80, 52) };
    }
    if (kind === 'Neon') return { laneW: X.rgb(8, 8, 14), laneB: X.rgb(4, 4, 8), hover: X.rgb(26, 22, 40), beat: X.rgb(20, 18, 34), bar: X.rgb(44, 30, 72), note: voice.map(v => X.mixPk(v, BLACK, 0.15)), edge: voice.map(v => X.mixPk(v, WHITE, 0.55)), sep: X.mixPk(voice[2], WHITE, 0.3) };
    return { laneW: X.rgb(30, 30, 40), laneB: X.rgb(20, 20, 28), hover: X.rgb(50, 48, 66), beat: X.rgb(36, 36, 48), bar: X.rgb(56, 56, 72), note: voice, edge: voice.map(v => X.shade(v, 0.65)), sep: WHITE };
  }
  // Music Box traits: the drum's size, how many pins it carries, the lining, the metal, and
  // now and then a little dancer turning on the comb's bar in time with the drum.
  // the view: inside the box (the original), or the whole little box on a table, its lid open
  // with a mirror in it
  const mbView = (g, n) => g.trait('View', roll(g, ['Inside', 'Whole box'], [2, 1])) === 'Whole box' ? { m: Math.round(n * 0.72), oy: Math.round(n * 0.2), whole: true } : { m: n, oy: 0, whole: false };
  function wholeBack(n, floorY, wood, velvet, dx, dw, combY) {
    const out = new Uint32Array(n * n), wall = X.rgb(34, 26, 32), wallB = X.rgb(42, 32, 40), tableY = floorY + 1;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const lamp = 1 + 0.6 * Math.exp(-((x - n * 0.3) ** 2 + (y - n * 0.1) ** 2) / (n * n * 0.2));
      out[y * n + x] = y >= tableY ? (y === tableY ? X.shade(wood, 1.7) : (y - tableY) % 3 === 2 ? X.shade(wood, 1.05) : X.shade(wood, 1.25)) : X.shade(x % 6 < 3 ? wall : wallB, lamp);
    }
    const bx0 = dx - 4, bx1 = dx + dw + 4, by0 = combY - 4, by1 = tableY, set = (x, y, c) => { if (x >= 0 && y >= 0 && x < n && y < n) out[y * n + x] = c; };
    for (let x = bx0 + 2; x < bx1 + 2; x++) for (const y of [by1, by1 + 1]) set(x, y, X.shade(wood, 0.75));   // the box's shadow on the table
    for (let y = by0; y < by1; y++) for (let x = bx0; x < bx1; x++) {
      const inner = x >= bx0 + 2 && x < bx1 - 2 && y >= by0 + 2;
      set(x, y, inner ? X.shade(velvet, 0.55 + 0.45 * (y - by0) / (by1 - by0)) : y === by0 ? X.shade(wood, 1.45) : x === bx0 ? X.shade(wood, 1.2) : x === bx1 - 1 ? X.shade(wood, 0.7) : wood);
    }
    // the lid, open and leaning back, with a mirror in its frame
    const lidH = Math.max(6, Math.round(by0 * 0.75));
    for (let y = by0 - lidH; y < by0; y++) {
      const k = (by0 - y) / lidH, ins = Math.round(k * 3), l0 = bx0 + ins, l1 = bx1 - ins;
      for (let x = l0; x < l1; x++) {
        const frame = x < l0 + 2 || x >= l1 - 2 || y < by0 - lidH + 2 || y >= by0 - 1;
        const glint = (x + (by0 - y) * 1.4) % 13 < 2;
        set(x, y, frame ? X.shade(wood, y === by0 - 1 ? 0.6 : 0.95) : glint ? X.rgb(214, 222, 232) : X.mixPk(X.rgb(120, 130, 146), X.rgb(176, 186, 200), k));
      }
    }
    return out;
  }
  const mbDrum = (g, teeth) => { return g.trait('Drum', roll(g, ['Standard', 'Grand'], [3, 1])) === 'Grand'; };
  function mbPins(g, pins, steps, teeth) {
    const kind = g.trait('Pins', roll(g, ['Even', 'Sparse', 'Dense'], [3, 1, 1]));
    if (kind === 'Sparse') { for (let i = pins.length - 1; i >= 0; i--) if (g.alt() < 0.45) pins.splice(i, 1); }
    else if (kind === 'Dense') for (let s = 0; s < steps; s++) if (g.alt() < 0.6) pins.push({ s, k: Math.floor(g.alt() * teeth) });
  }
  const METALS = { Brass: [[9, 90, 32], [10, 85, 62], [12, 60, 90]], Silver: [[0, 0, 34], [0, 0, 66], [0, 0, 94]], Copper: [[4, 80, 34], [5, 70, 64], [7, 45, 92]] };
  function mbMetal(g, m) {
    if (m) { g.trait('Metal', { 9: 'Brass', 12: 'Pewter', 55: 'Blue steel', 0: 'Silver' }[m[0]] || 'Brass'); return null; }
    return METALS[g.trait('Metal', roll(g, ['Brass', 'Silver', 'Copper'], [3, 1, 1]))].map(v => U.pk(U.hsb(...v)));
  }
  const LININGS = { Burgundy: [84, 18, 34], Navy: [22, 30, 70], Forest: [18, 54, 36], Plum: [62, 24, 66], Midnight: [16, 18, 28] };
  function mbLining(g, def) {
    const pick = roll(g, ['', 'Burgundy', 'Navy', 'Forest', 'Plum', 'Midnight'], [5, 1, 1, 1, 1, 1]);
    if (!pick) { g.trait('Lining', (def & 255) === 84 ? 'Burgundy' : 'Navy'); return def; }
    g.trait('Lining', pick); return X.rgb(...LININGS[pick]);
  }
  const DANCE = [['...o...', '..ooo..', '...o...', 'o.###.o', '.o###o.', '..###..', '#######', '.#####.', '..o.o..', '..o.o..', '..o.o..'],
    ['..o.o..', '..ooo..', '...o...', '..###..', '..###..', '...#...', '.#####.', '#######', '...o...', '...o...', '..oo...']].map(f => f.map(r => Uint8Array.from(r, ch => ch === '#' ? 1 : ch === 'o' ? 2 : 0)));
  function mbDancer(g, sc) {
    if (g.trait('Dancer', roll(g, ['None', 'Ballerina'], [5, 1])) === 'None') return null;
    const dress = U.pk(U.mix(sc.cols[0], [255, 255, 255], 0.35)), skin = X.rgb(236, 200, 172), stand = X.rgb(200, 170, 90);
    return (g, n, combY, pos, dx) => {
      const f = Math.floor(pos / 2) & 3, spr = DANCE[f & 1], x = dx ?? Math.round(n * 0.86) - 3, y = combY - spr.length - 1;
      X.rect(g, x + 1, combY - 1, 5, 1, stand);
      X.stamp(g, spr, x, y, [0, dress, skin], f === 3);
    };
  }
  // Side Scan: how high the fish is towed (the width of the dark water column) and how many fish
  const scanRoll = g => [{ Cruise: 1, Low: 0.6, High: 1.5 }[g.trait('Altitude', roll(g, ['Cruise', 'Low', 'High'], [3, 1, 1]))], { Shoals: 0.62, Empty: 2, Teeming: 0.42 }[g.trait('Fish', roll(g, ['Shoals', 'Empty', 'Teeming'], [3, 1, 1]))]];
  const SCALES = [[0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 8, 10], [0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 1, 4, 5, 7, 8, 10]];

  add({
    name: 'Radar', sizes: [80, 100], fps: 12,
    interactive: 'Click the screen to drop a contact; the sweep finds it.',
    recipe: 'A sweep turns over a coastline, an archipelago or open sea and its shipping; every cell it passes lights up and then slowly fades, so the screen is always half-remembered. Phosphor, range rings, sweep speed and the land change with every variation; click to drop a contact.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, N = n * n, c = n / 2, nz = U.noise(R), hue = R.pick([33, 33, 12, 50, R.range(0, 100)]);
      const tone = U.lut([[0, 0, 0], U.hsb(hue, 95, 22), U.hsb(hue, 85, 70), U.hsb(hue, 35, 100)], false);
      const ang = new Float32Array(N), echo = new Float32Array(N), buf = new Float32Array(N), grid = new Uint8Array(N);
      const zoom = R.range(2, 4), ox = R.range(0, 50), sea = R.range(-0.05, 0.25), rings = R.pick([4, 5, 6]);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, dx = x + 0.5 - c, dy = y + 0.5 - c, r = Math.hypot(dx, dy);
        ang[i] = (Math.atan2(dy, dx) + TAU) % TAU;
        if (r > c - 1) { echo[i] = -1; continue; }
        const v = nz.fbm(ox + x / n * zoom, y / n * zoom, 0.3, 4);
        echo[i] = v > sea + 0.12 ? 0.45 : v > sea ? 0.8 : 0;   // coast lines return hardest
        const ring = Math.abs(r - Math.round(r / (c / rings)) * (c / rings)) < 0.5;
        grid[i] = ring || Math.abs(dx) < 0.6 || Math.abs(dy) < 0.6 ? 1 : 0;
      }
      const ships = Array.from({ length: R.int(4, 9) }, () => ({ x: R.range(0.2, 0.8) * n, y: R.range(0.2, 0.8) * n, vx: R.range(-1, 1) * 0.6, vy: R.range(-1, 1) * 0.6 }));
      const speed = R.range(0.9, 1.5) * R.sign(), dim = X.hsbPk(hue, 80, 18);
      g.trait('Phosphor', hueName(hue)); g.trait('Ground', 'Coast'); g.trait('Rings', rings); g.trait('Contacts', ships.length); g.trait('Sweep', speed > 0 ? 'Clockwise' : 'Anticlockwise');
      let a0 = 0, warm = true;
      const frame = (t, dt) => {
        for (const tp of g.input.taps()) if (Math.hypot(tp.x * n - c, tp.y * n - c) < c - 3) { ships.push({ x: tp.x * n, y: tp.y * n, vx: (g.alt() * 2 - 1) * 0.6, vy: (g.alt() * 2 - 1) * 0.6 }); if (ships.length > 16) ships.splice(9, 1); }
        const a1 = t * speed, lo = Math.min(a0, a1), span = Math.abs(a1 - a0) * 1.05 + 0.02;
        if (warm) { warm = false; radarWarm(buf, ang, echo, a1, speed); }
        for (const s of ships) { s.x += s.vx * dt; s.y += s.vy * dt; if (Math.hypot(s.x - c, s.y - c) > c - 4) { s.vx *= -1; s.vy *= -1; } }
        for (let i = 0; i < N; i++) {
          if (echo[i] < 0) { d[i] = BLACK; continue; }
          let b = buf[i] * 0.955;
          const da = (((speed > 0 ? ang[i] - lo : lo + span - ang[i]) % TAU) + TAU) % TAU;
          if (da < span) b = Math.max(b, 0.25 + echo[i] * 0.75);
          buf[i] = b;
          d[i] = b > 0.04 ? tone[Math.min(255, b * 255 | 0)] : grid[i] ? dim : BLACK;
        }
        for (const s of ships) {
          const i = (s.y | 0) * n + (s.x | 0), da = (((speed > 0 ? ang[i] - lo : lo + span - ang[i]) % TAU) + TAU) % TAU;
          if (da < span) { buf[i] = 1.6; if (i + 1 < N) buf[i + 1] = 1.3; }
        }
        // the beam itself
        for (let r = 0; r < c - 1; r++) X.put(g, c + Math.cos(a1) * r, c + Math.sin(a1) * r, tone[255]);
        a0 = a1;
      };
      return frame;
    }, function alt(R, U, g) {
      const { n, d } = g, N = n * n, c = n / 2, nz = U.noise(R), me = hand(g), hue = R.pick([33, 33, 12, 50, 55, 0, R.range(0, 100)]);
      const mono = R.bool(0.15), tone = U.lut(mono ? [[0, 0, 0], [40, 40, 40], [170, 170, 170], [255, 255, 255]] : [[0, 0, 0], U.hsb(hue, 95, 22), U.hsb(hue, 85, 70), U.hsb(hue, 35, 100)], false);
      const ang = new Float32Array(N), echo = new Float32Array(N), buf = new Float32Array(N), grid = new Uint8Array(N);
      const land = R.pick(['coast', 'islands', 'sea', 'coast']), zoom = land === 'islands' ? R.range(4, 7) : R.range(2, 4), ox = R.range(0, 50), sea = land === 'sea' ? 0.55 : land === 'islands' ? R.range(0.15, 0.3) : R.range(-0.05, 0.2), rings = R.pick([3, 4, 5, 6]);
      const cross = R.bool(0.7), bearing = R.bool(0.5);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, dx = x + 0.5 - c, dy = y + 0.5 - c, r = Math.hypot(dx, dy);
        ang[i] = (Math.atan2(dy, dx) + TAU) % TAU;
        if (r > c - 1) { echo[i] = -1; continue; }
        const v = nz.fbm(ox + x / n * zoom, y / n * zoom, 0.3, 4);
        echo[i] = v > sea + 0.12 ? 0.45 : v > sea ? 0.8 : land === 'sea' && R() < 0.01 ? 0.3 : 0;
        const ring = Math.abs(r - Math.round(r / (c / rings)) * (c / rings)) < 0.5;
        const tick = bearing && r > c - 3 && Math.abs(((ang[i] / TAU * 36) % 1) - 0.5) > 0.45;
        grid[i] = ring || tick || (cross && (Math.abs(dx) < 0.6 || Math.abs(dy) < 0.6)) ? 1 : 0;
      }
      const ships = Array.from({ length: R.int(3, 10) }, () => ({ x: R.range(0.2, 0.8) * n, y: R.range(0.2, 0.8) * n, vx: R.range(-1, 1) * 0.6, vy: R.range(-1, 1) * 0.6 }));
      const speed = R.range(0.7, 1.7) * R.sign(), dim = mono ? X.rgb(30, 30, 30) : X.hsbPk(hue, 80, 18);
      g.trait('Phosphor', mono ? 'White' : hueName(hue)); g.trait('Ground', { coast: 'Coast', islands: 'Islands', sea: 'Open sea' }[land]); g.trait('Rings', rings); g.trait('Contacts', ships.length); g.trait('Sweep', speed > 0 ? 'Clockwise' : 'Anticlockwise');
      let a0 = 0, warm = true;
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) if (Math.hypot(tp.x * n - c, tp.y * n - c) < c - 3) { ships.push({ x: tp.x * n, y: tp.y * n, vx: R.range(-1, 1) * 0.6, vy: R.range(-1, 1) * 0.6 }); if (ships.length > 16) ships.shift(); }
        const a1 = t * speed, lo = Math.min(a0, a1), span = Math.abs(a1 - a0) * 1.05 + 0.02;
        if (warm) { warm = false; radarWarm(buf, ang, echo, a1, speed); }
        for (const s of ships) { s.x += s.vx * dt; s.y += s.vy * dt; if (Math.hypot(s.x - c, s.y - c) > c - 4) { s.vx *= -1; s.vy *= -1; } }
        for (let i = 0; i < N; i++) {
          if (echo[i] < 0) { d[i] = BLACK; continue; }
          let b = buf[i] * 0.955;
          const da = (((speed > 0 ? ang[i] - lo : lo + span - ang[i]) % TAU) + TAU) % TAU;
          if (da < span) b = Math.max(b, 0.25 + echo[i] * 0.75);
          buf[i] = b;
          d[i] = b > 0.04 ? tone[Math.min(255, b * 255 | 0)] : grid[i] ? dim : BLACK;
        }
        for (const s of ships) {
          const i = (s.y | 0) * n + (s.x | 0), da = (((speed > 0 ? ang[i] - lo : lo + span - ang[i]) % TAU) + TAU) % TAU;
          if (da < span) { buf[i] = 1.6; if (i + 1 < N) buf[i + 1] = 1.3; }
        }
        for (let r = 0; r < c - 1; r++) X.put(g, c + Math.cos(a1) * r, c + Math.sin(a1) * r, tone[255]);
        a0 = a1;
      };
    }),
  });

  add({
    name: 'Seismograph', sizes: [80, 100], fps: 12,
    interactive: 'Click to shake the table.',
    listens: 'The pens write the sound of the room; clap and a quake rolls through them.',
    recipe: 'A drum of graph paper scrolls under three to five pens. Most of the time they only tremble; now and then a quake rolls through, reaching each pen a moment after the last. Click to shake the table yourself.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, N = n * n, set = U.inkSet(R), ground = U.pk(set.ground), speck = U.pk(U.mix(set.ground, set.speck, 0.8)), ink = U.pk(set.ink);
      const sc = U.scheme(R, 0.3), colour = R.bool(0.4), pens = R.int(3, 5), gap = n / (pens + 1), nz = U.noise(R);
      const inks = Array.from({ length: pens }, (_, k) => colour ? U.pk(sc.cols[k * 2 % sc.cols.length]) : ink);
      const paper = new Uint32Array(N).fill(ground), last = new Float32Array(pens).fill(0), quakes = [];
      const sx = n - 6, cell = R.pick([5, 8, 10]);
      g.trait('Paper', set.name); g.trait('Pens', pens); g.trait('Ink', colour ? palName(sc) : 'One ink'); g.trait('Grid', cell === 5 ? 'Fine' : cell === 8 ? 'Medium' : 'Coarse');
      let col = 0, next = R.range(2, 5);
      for (let y = 0; y < n; y++) if (y % cell === 0) for (let x = 0; x < n; x++) paper[y * n + x] = speck;
      const frame = (t, dt, f) => {
        // scroll the paper one cell left; the new column gets grid lines
        for (let y = 0; y < n; y++) { const row = y * n; paper.copyWithin(row, row + 1, row + n); paper[row + n - 1] = col % cell === 0 || y % cell === 0 ? speck : ground; }
        col++;
        if (t > next) { quakes.push({ t0: t, amp: R.range(0.35, 1) * gap * 0.9, fr: R.range(2.2, 4), dur: R.range(3, 6) }); next = t + R.range(5, 11); }
        for (let k = 0; k < pens; k++) {
          let v = nz.n2(t * 0.7, k * 9) * gap * 0.07 + Math.sin(t * 13 + k) * 0.4 + (ear.amp ? ear.wave[(k * 53 + col * 11) & 255] * ear.amp : 0);
          for (const q of quakes) {
            const s = t - q.t0 - k * 0.35;
            if (s > 0 && s < q.dur) v += q.amp * Math.sin(s * q.fr * TAU) * Math.exp(-s * 1.1) * Math.min(1, s * 4);
          }
          const y = gap * (k + 1) + v;
          // draw on the paper as a vertical run between the last and this sample
          const a = Math.round(Math.min(last[k], y)), b = Math.round(Math.max(last[k], y));
          for (let yy = Math.max(0, a); yy <= Math.min(n - 1, b); yy++) paper[yy * n + sx - 1] = inks[k];
          last[k] = y;
        }
        while (quakes.length && t - quakes[0].t0 > 10) quakes.shift();
        d.set(paper);
        for (let k = 0; k < pens; k++) {        // pen arms reach in from the right
          const y = Math.round(last[k]);
          X.line(g, sx, y, n - 1, gap * (k + 1), X.shade(inks[k], 0.6));
          X.put(g, sx - 1, y, inks[k]); X.put(g, sx, y, inks[k]);
        }
      };
      let warm = -n * 0.1;
      const ear = seismoEar(g, gap);
      return (t, dt, f) => { if (f === 0) for (let i = 0; i < n; i++) { frame(warm, 0.1, 1); warm += 0.1; } if (g.input.taps().length) quakes.push({ t0: t, amp: gap * 0.9, fr: 2.5 + g.alt() * 1.5, dur: 4 }); ear.hear(t, quakes); frame(t, dt, f); };
    }, function alt(R, U, g) {
      const { n, d } = g, N = n * n, me = hand(g), set = U.inkSet(R), ground = U.pk(set.ground), speck = U.pk(U.mix(set.ground, set.speck, 0.8)), ink = U.pk(set.ink);
      const sc = U.scheme(R, 0.3), colour = R.bool(0.4), pens = R.int(3, 5), gap = n / (pens + 1), nz = U.noise(R), lag = R.range(0.2, 0.5);
      const inks = Array.from({ length: pens }, (_, k) => colour ? U.pk(sc.cols[k * 2 % sc.cols.length]) : ink);
      const paper = new Uint32Array(N).fill(ground), last = new Float32Array(pens).fill(0), quakes = [];
      const sx = n - 6, cell = R.pick([5, 8, 10]), calm = R.range(0.04, 0.1);
      g.trait('Paper', set.name); g.trait('Pens', pens); g.trait('Ink', colour ? palName(sc) : 'One ink'); g.trait('Grid', cell === 5 ? 'Fine' : cell === 8 ? 'Medium' : 'Coarse'); g.trait('Ground', calm < 0.065 ? 'Quiet' : 'Restless');
      let col = 0, next = R.range(2, 5);
      for (let y = 0; y < n; y++) if (y % cell === 0) for (let x = 0; x < n; x++) paper[y * n + x] = speck;
      const frame = (t, dt) => {
        for (let y = 0; y < n; y++) { const row = y * n; paper.copyWithin(row, row + 1, row + n); paper[row + n - 1] = col % cell === 0 || y % cell === 0 ? speck : ground; }
        col++;
        if (t > next) { quakes.push({ t0: t, amp: R.range(0.35, 1) * gap * 0.9, fr: R.range(2.2, 4), dur: R.range(3, 6) }); next = t + R.range(5, 11); }
        for (let k = 0; k < pens; k++) {
          let v = nz.n2(t * 0.7, k * 9) * gap * calm + Math.sin(t * 13 + k) * 0.4 + (ear.amp ? ear.wave[(k * 53 + col * 11) & 255] * ear.amp : 0);
          for (const q of quakes) {
            const s = t - q.t0 - k * lag;
            if (s > 0 && s < q.dur) v += q.amp * Math.sin(s * q.fr * TAU) * Math.exp(-s * 1.1) * Math.min(1, s * 4);
          }
          const y = gap * (k + 1) + v;
          const a = Math.round(Math.min(last[k], y)), b = Math.round(Math.max(last[k], y));
          for (let yy = Math.max(0, a); yy <= Math.min(n - 1, b); yy++) paper[yy * n + sx - 1] = inks[k];
          last[k] = y;
        }
        while (quakes.length && t - quakes[0].t0 > 10) quakes.shift();
        d.set(paper);
        for (let k = 0; k < pens; k++) {
          const y = Math.round(last[k]);
          X.line(g, sx, y, n - 1, gap * (k + 1), X.shade(inks[k], 0.6));
          X.put(g, sx - 1, y, inks[k]); X.put(g, sx, y, inks[k]);
        }
      };
      let warm = -n * 0.1;
      const ear = seismoEar(g, gap);
      return (t, dt, f) => {
        if (f === 0) for (let i = 0; i < n; i++) { frame(warm, 0.1, 1); warm += 0.1; }
        me.step(dt);
        if (me.taps.length) quakes.push({ t0: t, amp: gap * (0.5 + 0.5 * Math.min(1, me.taps.length)), fr: R.range(2.5, 4), dur: 4 });
        ear.hear(t, quakes);
        frame(t, dt, f);
      };
    }),
  });

  add({
    name: 'VU Meters', sizes: [50, 80], fps: 12,
    recipe: 'A rack of segmented level meters listening to an imaginary band: each channel hears its own part, rises on the beat, falls slowly, and leaves its peak hanging for a moment.',
    make(R, U, g) {
      const { n, d } = g, ch = R.pick([6, 8, 10, 12]), seg = R.pick([2, 3]), gapY = 1, sc = U.scheme(R, 0.35);
      const classic = R.bool(0.5), panel = X.rgb(18, 18, 22), tempo = R.range(1.6, 2.4);
      const colW = Math.floor((n - 4) / ch), barW = Math.max(2, colW - 2), x0 = Math.floor((n - colW * ch) / 2) + 1;
      const top = 4, bottom = n - 6, segs = Math.floor((bottom - top) / (seg + gapY));
      const lit = k => classic ? (k > segs * 0.85 ? X.rgb(255, 50, 40) : k > segs * 0.65 ? X.rgb(255, 210, 40) : X.rgb(60, 230, 90)) : U.pk(U.ramp(sc.cols, k / segs));
      const lits = Array.from({ length: segs }, (_, k) => lit(k)), dims = lits.map(v => X.shade(v, 0.18));
      const parts = Array.from({ length: ch }, () => ({ every: R.pick([1, 1, 2, 0.5, 0.25]), off: R.pick([0, 0, 0.5, 0.25, 0.75]), gain: R.range(0.55, 1), decay: R.range(1.5, 3) }));
      const level = new Float32Array(ch), peak = new Float32Array(ch), hold = new Float32Array(ch), nz = U.noise(R);
      return (t, dt) => {
        d.fill(panel);
        const beat = t * tempo;
        for (let k = 0; k < ch; k++) {
          const p = parts[k], ph = ((beat / p.every - p.off) % 1 + 1) % 1, swell = 0.5 + 0.5 * nz.n2(t * 0.15, k * 3);
          const target = p.gain * (0.25 + 0.75 * swell) * (0.35 + 0.65 * Math.exp(-ph * p.decay * 2.5));
          level[k] = target > level[k] ? level[k] + (target - level[k]) * 0.8 : level[k] - Math.min(level[k] - target, dt * 0.9);
          if (level[k] >= peak[k]) { peak[k] = level[k]; hold[k] = 1; } else if ((hold[k] -= dt) < 0) peak[k] = Math.max(level[k], peak[k] - dt * 0.4);
          const on = Math.round(level[k] * segs), pk = Math.min(segs - 1, Math.round(peak[k] * segs)), x = x0 + k * colW;
          for (let s = 0; s < segs; s++) X.rect(g, x, bottom - (s + 1) * (seg + gapY) + gapY, barW, seg, s < on || s === pk ? lits[s] : dims[s]);
          X.rect(g, x, bottom + 2, barW, 1, X.shade(lits[0], 0.5));
        }
        for (const [sx, sy] of [[1, 1], [n - 2, 1], [1, n - 2], [n - 2, n - 2]]) X.put(g, sx, sy, X.rgb(90, 90, 100));
      };
    },
  });

  add({
    name: 'Piano Roll', sizes: [80, 100], fps: 12, music: true,
    interactive: 'Click the keys to play them; click the roll to add or remove a note.',
    recipe: 'A seeded song in one scale (a bass line, block chords or arpeggios, and a wandering melody) scrolls into a keyboard; each key lights in its voice colour as its note arrives, and plays when unmuted. Click the keys to play, or the roll to write notes.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, rows = rollZoom(g), keys = Math.floor(n / rows), kw = Math.round(n * 0.12), cpb = R.pick([4, 5, 6]);
      const scale = R.pick([[0, 2, 4, 5, 7, 9, 11], [0, 2, 3, 5, 7, 8, 10], [0, 2, 4, 7, 9], [0, 3, 5, 7, 10]]), root = R.int(0, 11);
      const sc = U.scheme(R, 0.5), voice = [0, 1, 2].map(k => U.pk(sc.cols[(k * 3 + 1) % sc.cols.length])), black = X.rgb(14, 14, 18), T = rollTheme(g, voice);
      const inScale = p => scale.includes(((p - root) % 12 + 12) % 12), pitches = []; for (let p = 0; p < keys; p++) if (inScale(p)) pitches.push(p);
      const bars = R.pick([4, 8]), beats = bars * 4, notes = [], prog = Array.from({ length: bars }, () => R.int(0, scale.length - 1));
      for (let b = 0; b < bars; b++) {
        const deg = prog[b], low = pitches.filter(p => p < keys * 0.3);
        notes.push({ p: low[(deg) % low.length] ?? pitches[0], s: b * 4, l: R.pick([2, 4]), v: 0 });
        if (R.bool(0.7)) for (let k = 0; k < 3; k++) notes.push({ p: pitches[Math.floor(pitches.length * 0.35) + deg + 2 * k] ?? pitches[pitches.length - 1], s: b * 4, l: 4, v: 1 });
      }
      let mi = Math.floor(pitches.length * 0.7), s = 0;
      while (s < beats) { const l = R.pick([0.5, 0.5, 1, 1, 1.5, 2]); if (R.bool(0.85)) notes.push({ p: pitches[mi], s, l: l * 0.9, v: 2 }); mi = Math.max(Math.floor(pitches.length * 0.55), Math.min(pitches.length - 1, mi + R.pick([-2, -1, -1, 1, 1, 2, 0]))); s += l; }
      const tempo = R.range(1.6, 2.3), period = beats / tempo;
      g.trait('Key', KEYS[root] + ' ' + scaleName(scale)); g.trait('Parts', 'Bass, chords, melody'); g.trait('Length', bars + ' bars'); g.trait('Palette', palName(sc));
      const isBlack = p => [1, 3, 6, 8, 10].includes(((p) % 12 + 12) % 12);
      const userLit = new Float32Array(keys);
      let prevB = -1e-6;
      const frame = t => {
        const beat = (t * tempo) % beats, lit = new Int8Array(keys).fill(-1);
        for (const tp of g.input.taps()) {   // the keys play; the roll takes or loses a note
          const p = keys - 1 - Math.floor(tp.y * n / rows);
          if (p < 0 || p >= keys) continue;
          if (tp.x * n < kw) { userLit[p] = 0.4; g.sound.note(36 + p, { dur: 0.5, vel: 0.6, wave: 'square', cutoff: 3000 }); }
          else { const s = Math.round((beat + (tp.x * n - kw) / cpb) * 2) / 2 % beats, hit = notes.findIndex(nt => nt.p === p && s >= nt.s && s < nt.s + nt.l); if (hit >= 0) notes.splice(hit, 1); else if (notes.length < 600) notes.push({ p, s, l: 0.9, v: 2 }); }
        }
        // notes that start between the last frame and this one sound now
        for (const nt of notes) { const inWin = prevB <= beat ? nt.s > prevB && nt.s <= beat : nt.s > prevB || nt.s <= beat; if (inWin) g.sound.note(36 + nt.p, { dur: Math.min(1.5, nt.l / tempo), vel: nt.v === 1 ? 0.28 : nt.v === 0 ? 0.55 : 0.45, wave: ['triangle', 'sine', 'square'][nt.v], cutoff: nt.v === 2 ? 2600 : 0, pan: nt.v === 1 ? -0.3 : nt.v === 2 ? 0.3 : 0 }); }
        prevB = beat;
        for (let y = 0; y < n; y++) {
          const p = keys - 1 - Math.floor(y / rows), lane = g.input.inside && g.input.x * n >= kw && p === keys - 1 - Math.floor(g.input.y * n / rows) ? T.hover : isBlack(p) ? T.laneB : T.laneW;
          d.fill(lane, y * n + kw, y * n + n);
        }
        for (let b = 0; b < beats * 2; b++) { const x = kw + Math.round((b - beat) * cpb); if (x >= kw && x < n) for (let y = 0; y < n; y++) d[y * n + x] = b % 4 ? T.beat : T.bar; }
        for (const nt of notes) for (const rep of [0, beats]) {
          const s0 = nt.s + rep - beat, x0 = kw + Math.round(s0 * cpb), w = Math.max(1, Math.round(nt.l * cpb) - 1), y = (keys - 1 - nt.p) * rows;
          if (x0 > n || x0 + w < kw) continue;
          if (s0 <= 0 && s0 + nt.l > 0) lit[nt.p] = nt.v;
          for (let x = Math.max(kw, x0); x < Math.min(n, x0 + w); x++) for (let r = 0; r < rows; r++) d[(y + r) * n + x] = x === x0 || x === x0 + w - 1 ? T.edge[nt.v] : T.note[nt.v];
        }
        for (let p = 0; p < keys; p++) {
          if (userLit[p] > 0) { lit[p] = 2; userLit[p] -= 1 / 12; }
          const y = (keys - 1 - p) * rows, blk = isBlack(p), col = lit[p] >= 0 ? voice[lit[p]] : blk ? black : X.rgb(232, 226, 210);
          X.rect(g, 0, y, blk ? Math.round(kw * 0.62) : kw - 1, rows, col);
          if (!blk && lit[p] < 0) X.rect(g, Math.round(kw * 0.62), y, kw - 1 - Math.round(kw * 0.62), rows, X.rgb(232, 226, 210));
          if (((p - root) % 12 + 12) % 12 === 0) X.put(g, kw - 1, y, X.rgb(120, 120, 140));
        }
        for (let y = 0; y < n; y++) d[y * n + kw] = T.sep;
      };
      frame.period = period;
      return frame;
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g), rows = rollZoom(g), keys = Math.floor(n / rows), kw = Math.round(n * 0.12), cpb = R.pick([4, 5, 6]);
      const scale = R.pick(SCALES), root = R.int(0, 11), style = R.pick(['chords', 'arp', 'arp', 'counter']);
      const sc = U.scheme(R, 0.5), voice = [0, 1, 2].map(k => U.pk(sc.cols[(k * 3 + 1) % sc.cols.length])), black = X.rgb(14, 14, 18), T = rollTheme(g, voice);
      const inScale = p => scale.includes(((p - root) % 12 + 12) % 12), pitches = []; for (let p = 0; p < keys; p++) if (inScale(p)) pitches.push(p);
      const bars = R.pick([4, 8]), beats = bars * 4, notes = [], prog = Array.from({ length: bars }, () => R.pick([0, 0, 3, 4, 5, 1, 2]));
      const low = pitches.filter(p => p < keys * 0.3), mid = Math.floor(pitches.length * 0.35);
      for (let b = 0; b < bars; b++) {
        const deg = prog[b];
        notes.push({ p: low[deg % low.length] ?? pitches[0], s: b * 4, l: R.pick([2, 4]), v: 0 });
        if (R.bool(0.5)) notes.push({ p: low[deg % low.length] ?? pitches[0], s: b * 4 + 2, l: 2, v: 0 });
        const chord = [0, 2, 4].map(k => pitches[mid + deg + k] ?? pitches[pitches.length - 1]);
        if (style === 'chords') chord.forEach(p => notes.push({ p, s: b * 4, l: 4, v: 1 }));
        else if (style === 'arp') for (let k = 0; k < 8; k++) notes.push({ p: chord[[0, 1, 2, 1][k % 4]] + (k >= 4 && R.bool(0.3) ? 0 : 0), s: b * 4 + k * 0.5, l: 0.45, v: 1 });
      }
      for (const voiceN of style === 'counter' ? [2, 1] : [2]) {
        let mi = Math.floor(pitches.length * (voiceN === 2 ? 0.72 : 0.5)), s = 0;
        while (s < beats) { const l = R.pick([0.5, 0.5, 1, 1, 1.5, 2]); if (R.bool(0.85)) notes.push({ p: pitches[mi], s, l: l * 0.9, v: voiceN }); mi = Math.max(Math.floor(pitches.length * 0.45), Math.min(pitches.length - 1, mi + R.pick([-2, -1, -1, 1, 1, 2, 0]))); s += l; }
      }
      const tempo = R.range(1.6, 2.4), WAVES = ['triangle', 'sine', R.pick(['square', 'triangle', 'sawtooth'])];
      g.trait('Key', KEYS[root] + ' ' + scaleName(scale)); g.trait('Parts', { chords: 'Bass, chords, melody', arp: 'Bass, arpeggio, melody', counter: 'Bass, two melodies' }[style]); g.trait('Length', bars + ' bars'); g.trait('Palette', palName(sc));
      const isBlack = p => [1, 3, 6, 8, 10].includes(((p) % 12 + 12) % 12), userLit = new Float32Array(keys);
      const midi = p => 36 + p;
      let clock = 0, prev = -1e-6;
      return (t, dt) => {
        me.step(dt);
        clock += dt;
        const beat = (clock * tempo) % beats, lit = new Int8Array(keys).fill(-1);
        for (const tp of me.taps) {
          const p = keys - 1 - Math.floor(tp.y * n / rows);
          if (p < 0 || p >= keys) continue;
          if (tp.x * n < kw) { userLit[p] = 0.4; g.sound.note(midi(p), { dur: 0.5, vel: 0.6, wave: WAVES[2], cutoff: 3000 }); }
          else {
            const s = Math.round((beat + (tp.x * n - kw) / cpb) * 2) / 2 % beats, hit = notes.findIndex(nt => nt.p === p && s >= nt.s && s < nt.s + nt.l);
            if (hit >= 0) notes.splice(hit, 1); else if (notes.length < 600) notes.push({ p, s, l: 0.9, v: 2 });
          }
        }
        // notes that start between the last frame and this one sound now
        for (const nt of notes) {
          const inWin = prev <= beat ? nt.s > prev && nt.s <= beat : nt.s > prev || nt.s <= beat;
          if (inWin) g.sound.note(midi(nt.p), { dur: Math.min(1.5, nt.l / tempo), vel: nt.v === 1 ? 0.28 : nt.v === 0 ? 0.55 : 0.45, wave: WAVES[nt.v], cutoff: nt.v === 2 ? 2600 : 0, pan: nt.v === 1 ? -0.3 : nt.v === 2 ? 0.3 : 0 });
        }
        prev = beat;
        for (let y = 0; y < n; y++) {
          const p = keys - 1 - Math.floor(y / rows), lane = g.input.inside && g.input.x * n >= kw && p === keys - 1 - Math.floor(g.input.y * n / rows) ? T.hover : isBlack(p) ? T.laneB : T.laneW;
          d.fill(lane, y * n + kw, y * n + n);
        }
        for (let b = 0; b < beats * 2; b++) { const x = kw + Math.round((b - beat) * cpb); if (x >= kw && x < n) for (let y = 0; y < n; y++) d[y * n + x] = b % 4 ? T.beat : T.bar; }
        for (const nt of notes) for (const rep of [0, beats]) {
          const s0 = nt.s + rep - beat, x0 = kw + Math.round(s0 * cpb), w = Math.max(1, Math.round(nt.l * cpb) - 1), y = (keys - 1 - nt.p) * rows;
          if (x0 > n || x0 + w < kw) continue;
          if (s0 <= 0 && s0 + nt.l > 0) lit[nt.p] = nt.v;
          for (let x = Math.max(kw, x0); x < Math.min(n, x0 + w); x++) for (let r = 0; r < rows; r++) d[(y + r) * n + x] = x === x0 || x === x0 + w - 1 ? T.edge[nt.v] : T.note[nt.v];
        }
        for (let p = 0; p < keys; p++) {
          if (userLit[p] > 0) { lit[p] = 2; userLit[p] -= dt; }
          const y = (keys - 1 - p) * rows, blk = isBlack(p), col = lit[p] >= 0 ? voice[lit[p]] : blk ? black : X.rgb(232, 226, 210);
          X.rect(g, 0, y, blk ? Math.round(kw * 0.62) : kw - 1, rows, col);
          if (!blk && lit[p] < 0) X.rect(g, Math.round(kw * 0.62), y, kw - 1 - Math.round(kw * 0.62), rows, X.rgb(232, 226, 210));
          if (((p - root) % 12 + 12) % 12 === 0) X.put(g, kw - 1, y, X.rgb(120, 120, 140));
        }
        for (let y = 0; y < n; y++) d[y * n + kw] = T.sep;
      };
    }),
  });

  add({
    name: 'Music Box', sizes: [80, 100], fps: 12, music: true,
    interactive: 'Click a tooth of the comb to pluck it; click the drum to add or remove a pin.',
    recipe: 'A brass cylinder turns its pins past a steel comb. Each pin plucks a tooth, the tooth shivers, a little note floats up and fades, and a bell-like tone sounds when unmuted. Click the comb to pluck it, or the drum to set pins of your own.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, V = mbView(g, n), m = V.m, teeth = R.pick([12, 15, 18]), tw = Math.floor((m * 0.8) / teeth), x0 = Math.round((n - tw * teeth) / 2);
      const cy = Math.round(V.oy + m * 0.64), rad = Math.round(m * (mbDrum(g, teeth) ? 0.25 : 0.2)), steps = R.pick([32, 48]), pins = [];
      const scale = R.pick([[0, 2, 4, 7, 9], [0, 2, 4, 5, 7, 9, 11], [0, 3, 5, 7, 10]]);
      let tooth = R.int(0, teeth - 1);
      for (let s = 0; s < steps; s++) { if (R.bool(0.75)) { pins.push({ s, k: tooth }); if (R.bool(0.3)) pins.push({ s, k: (tooth + 2 + R.int(0, 2)) % teeth }); } tooth = Math.max(0, Math.min(teeth - 1, tooth + R.pick([-2, -1, 1, 2, 0]))); }
      mbPins(g, pins, steps, teeth);
      const sc = U.scheme(R, 0.55), brass = mbMetal(g, null), steel = X.rgb(200, 206, 214), wood = X.rgb(58, 34, 22);
      const vib = new Float32Array(teeth), floats = [], speed = R.range(2.2, 3.2), period = steps / speed, back = (V.whole ? wholeBack : boxBack)(n, cy + rad + 4, wood, mbLining(g, X.rgb(84, 18, 34)), x0 - 2, tw * teeth + 4, cy - rad - Math.round(m * 0.2)), dancer = mbDancer(g, sc);
      const NOTE = [[0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]];
      let last = -1;
      const bell = k => { const m = 60 + 12 * Math.floor(k / scale.length) + scale[k % scale.length]; g.sound.note(m, { dur: 1.4, vel: 0.5, wave: 'sine' }); g.sound.note(m + 12, { dur: 0.5, vel: 0.12, wave: 'triangle' }); };
      const frame = (t, dt) => {
        d.set(back);
        const pos = t * speed, step = Math.floor(pos);
        for (const tp of g.input.taps()) {   // pluck a tooth, or set a pin on the drum
          const k = Math.floor((tp.x * n - x0) / tw); if (k < 0 || k >= teeth) continue;
          if (tp.y * n < cy - rad) { vib[k] = 1; floats.push({ x: x0 + k * tw + tw / 2, y: cy - rad - m * 0.28, a: 1, c: U.pk(sc.cols[k % sc.cols.length]) }); bell(k); }
          else { const s = Math.round(pos) % steps, i = pins.findIndex(p => p.s === s && p.k === k); if (i >= 0) pins.splice(i, 1); else pins.push({ s, k }); }
        }
        if (step !== last) { for (const p of pins) if (p.s === step % steps) { vib[p.k] = 1; floats.push({ x: x0 + p.k * tw + tw / 2, y: cy - rad - m * 0.28, a: 1, c: U.pk(sc.cols[p.k % sc.cols.length]) }); bell(p.k); } last = step; }
        // the cylinder, shaded by the angle of each band
        drum(g, x0 - 2, tw * teeth + 4, cy, rad, brass);
        for (const p of pins) {
          const a = ((p.s - pos) / steps) * TAU - Math.PI / 2, s = Math.sin(a);
          if (Math.cos(a) < 0) continue;
          const px = x0 + p.k * tw + Math.floor(tw / 2) - 1, py = Math.round(cy + s * rad);
          X.rect(g, px, py, 2, 2, X.rgb(50, 30, 12)); X.put(g, px, py, WHITE);
        }
        // the comb
        X.rect(g, x0 - 3, cy - rad - Math.round(m * 0.2), tw * teeth + 6, 3, steel);
        for (let k = 0; k < teeth; k++) {
          const len = Math.round(m * 0.18 - k * m * 0.004), jig = Math.round(Math.sin(t * 40 + k) * vib[k] * 1.5);
          X.rect(g, x0 + k * tw + Math.floor(tw / 2) - 1 + jig, cy - rad - Math.round(m * 0.2) + 3, Math.max(1, tw - 2), len, vib[k] > 0.3 ? WHITE : X.rgb(150, 156, 166));
          vib[k] = Math.max(0, vib[k] - dt * 1.4);
        }
        if (dancer) dancer(g, n, cy - rad - Math.round(m * 0.2), pos, V.whole ? x0 + tw * teeth - 6 : undefined);
        for (const fl of floats) { fl.y -= dt * 4; fl.a -= dt * 0.35; if (fl.a > 0) X.stamp(g, NOTE, Math.round(fl.x - 1), Math.round(fl.y), [0, X.shade(fl.c, Math.min(1, fl.a * 1.5))]); }
        while (floats.length && floats[0].a <= 0) floats.shift();
      };
      frame.period = 0;
      return frame;
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g), V = mbView(g, n), m = V.m, teeth = R.pick([12, 15, 18]), tw = Math.floor((m * 0.8) / teeth), x0 = Math.round((n - tw * teeth) / 2);
      const cy = Math.round(V.oy + m * 0.64), rad = Math.round(m * (mbDrum(g, teeth) ? 0.25 : 0.2)), steps = R.pick([32, 48]), pins = [];
      const scale = R.pick([[0, 2, 4, 7, 9], [0, 2, 4, 5, 7, 9, 11], [0, 3, 5, 7, 10], [0, 2, 3, 7, 8]]), root = 60 + R.int(-3, 4);
      let tooth = R.int(0, teeth - 1);
      for (let s = 0; s < steps; s++) { if (R.bool(0.75)) { pins.push({ s, k: tooth }); if (R.bool(0.3)) pins.push({ s, k: (tooth + 2 + R.int(0, 2)) % teeth }); } tooth = Math.max(0, Math.min(teeth - 1, tooth + R.pick([-2, -1, 1, 2, 0]))); }
      mbPins(g, pins, steps, teeth);
      const sc = U.scheme(R, 0.55), metal = R.pick([[9, 90], [12, 20], [55, 30], [0, 0]]);
      mbMetal(g, metal);
      const brass = [U.hsb(metal[0], metal[1], 32), U.hsb(metal[0] + 1, metal[1] * 0.95, 62), U.hsb(metal[0] + 3, metal[1] * 0.65, 92)].map(U.pk), wood = U.pk(R.pick([[58, 34, 22], [90, 50, 30], [30, 26, 40], [110, 26, 40]]));
      const vib = new Float32Array(teeth), floats = [], speed = R.range(2.2, 3.4), back = (V.whole ? wholeBack : boxBack)(n, cy + rad + 4, wood, mbLining(g, (wood & 255) > 100 ? X.rgb(22, 30, 70) : X.rgb(84, 18, 34)), x0 - 2, tw * teeth + 4, cy - rad - Math.round(m * 0.2)), dancer = mbDancer(g, sc);
      const pitch = k => root + 12 * Math.floor(k / scale.length) + scale[k % scale.length];
      const NOTE = [[0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]];
      const combY = cy - rad - Math.round(m * 0.2);
      const pluck = k => { vib[k] = 1; floats.push({ x: x0 + k * tw + tw / 2, y: combY - 6, a: 1, c: U.pk(sc.cols[k % sc.cols.length]) }); g.sound.note(pitch(k), { dur: 1.4, vel: 0.5, wave: 'sine' }); g.sound.note(pitch(k) + 12, { dur: 0.5, vel: 0.12, wave: 'triangle' }); };
      let last = -1, pos = 0;
      return (t, dt) => {
        me.step(dt);
        pos += dt * speed;
        for (const tp of me.taps) {
          const k = Math.floor((tp.x * n - x0) / tw); if (k < 0 || k >= teeth) continue;
          if (tp.y * n < cy - rad) pluck(k);
          else { const s = Math.round(pos) % steps, i = pins.findIndex(p => p.s === s && p.k === k); if (i >= 0) pins.splice(i, 1); else pins.push({ s, k }); }
        }
        d.set(back);
        const step = Math.floor(pos);
        if (step !== last) { for (const p of pins) if (p.s === step % steps) pluck(p.k); last = step; }
        drum(g, x0 - 2, tw * teeth + 4, cy, rad, brass);
        for (const p of pins) {
          const a = ((p.s - pos) / steps) * TAU - Math.PI / 2, s = Math.sin(a);
          if (Math.cos(a) < 0) continue;
          const px = x0 + p.k * tw + Math.floor(tw / 2) - 1, py = Math.round(cy + s * rad);
          X.rect(g, px, py, 2, 2, X.rgb(50, 30, 12)); X.put(g, px, py, WHITE);
        }
        X.rect(g, x0 - 3, combY, tw * teeth + 6, 3, X.rgb(200, 206, 214));
        for (let k = 0; k < teeth; k++) {
          const len = Math.round(m * 0.18 - k * m * 0.004), jig = Math.round(Math.sin(t * 40 + k) * vib[k] * 1.5);
          X.rect(g, x0 + k * tw + Math.floor(tw / 2) - 1 + jig, combY + 3, Math.max(1, tw - 2), len, vib[k] > 0.3 ? WHITE : X.rgb(150, 156, 166));
          vib[k] = Math.max(0, vib[k] - dt * 1.4);
        }
        if (dancer) dancer(g, n, cy - rad - Math.round(m * 0.2), pos, V.whole ? x0 + tw * teeth - 6 : undefined);
        for (const fl of floats) { fl.y -= dt * 4; fl.a -= dt * 0.35; if (fl.a > 0) X.stamp(g, NOTE, Math.round(fl.x - 1), Math.round(fl.y), [0, X.shade(fl.c, Math.min(1, fl.a * 1.5))]); }
        while (floats.length && floats[0].a <= 0) floats.shift();
      };
    }),
  });

  add({
    name: 'Step Sequencer', sizes: [40, 80], fps: 12, music: true,
    interactive: 'Click a pad to switch it on or off.',
    listens: 'Clap and your clap is written into the beat where the playhead is.',
    recipe: 'Eight or sixteen steps by eight voices of chunky glowing pads: four drums and four notes of a scale. The playhead walks across, hit pads flare and play, and one voice is rewritten every bar. Click the pads to write your own beat.',
    make(R, U, g) {
      const { n, d } = g, me = hand(g, 20), cell = 5, cols = n / cell, rows = 8, ph = n === 40 ? 1 : 2, padW = cell - 1, padH = cell * ph - 1;
      const sc = U.scheme(R, 0.5), rowCol = Array.from({ length: rows }, (_, r) => U.pk(sc.cols[r % sc.cols.length])), off = X.rgb(30, 30, 38), offD = X.rgb(22, 22, 28);
      const scale = R.pick(SCALES), root = 48 + R.int(0, 11), wave = R.pick(['square', 'triangle', 'sawtooth']), round = ph > 1 && R.bool(0.6);
      const DRUMS = ['kick', 'snare', 'hat', 'click'];
      const pattern = r => { const k = r === 2 ? R.int(4, cols) : R.int(1, Math.max(2, cols / 2)), o = R.int(0, cols - 1); return Array.from({ length: cols }, (_, i) => ((i + o) * k) % cols < k); };
      const grid = Array.from({ length: rows }, (_, r) => pattern(r));
      const glow = new Float32Array(rows * cols), tempo = R.range(3.5, 5.5) * (cols === 8 ? 0.5 : 1), swing = R.pick([0, 0, 0.15]);
      g.trait('Steps', cols); g.trait('Pads', round ? 'Round' : 'Square'); g.trait('Sound', { square: 'Square lead', triangle: 'Soft', sawtooth: 'Saw' }[wave]); g.trait('Feel', swing ? 'Swung' : 'Straight'); g.trait('Key', KEYS[(root - 48) % 12] + ' ' + scaleName(scale)); g.trait('Palette', palName(sc));
      // rows the viewer has written stay theirs (the machine stops rewriting them); claps heard go on the snare row
      const touched = new Uint8Array(rows);
      let last = -1, bar = 0, clock = 0, heard = -1e9;
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) { const c = Math.floor(tp.x * cols), r = Math.floor(tp.y * n / (cell * ph)); if (c >= 0 && c < cols && r >= 0 && r < rows) { grid[r][c] = !grid[r][c]; glow[r * cols + c] = 0.6; touched[r] = 1; } }
        clock += dt;
        const raw = clock * tempo, step = Math.floor(raw + (Math.floor(raw) % 2 ? -swing : 0)) % cols;
        if (step !== last) {
          if (step === 0 && last >= 0 && !me.active) { const r = (bar++ * 3) % rows; if (!touched[r] && !(r === 1 && clock - heard < 6)) grid[r] = pattern(r); }
          for (let r = 0; r < rows; r++) if (grid[r][step]) {
            glow[r * cols + step] = 1;
            if (r < 4) g.sound.hit(DRUMS[r], r === 2 ? 0.35 : 0.7);
            else g.sound.note(root + 12 + scale[(7 - r) * 2 % scale.length] + ((7 - r) * 2 >= scale.length ? 12 : 0), { dur: 0.18, vel: 0.35, wave, cutoff: 1800 });
          }
          last = step;
        }
        if (g.input.listening && g.input.beats() && step >= 0) { if (!grid[1][step]) g.sound.hit('snare', 0.6); grid[1][step] = true; glow[cols + step] = 1; heard = clock; }
        d.fill(X.rgb(10, 10, 14));
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const i = r * cols + c, on = grid[r][c], gl = glow[i], x = c * cell, y = r * cell * ph, playing = c === step;
          let col = on ? X.shade(rowCol[r], 0.75) : (c >> 2) & 1 ? offD : off;
          if (playing && !on) col = X.shade(col, 1.6);
          if (gl > 0.02) col = X.mixPk(col, X.mixPk(rowCol[r], WHITE, 0.5), Math.min(1, gl));
          X.rect(g, x, y, padW, padH, col);
          if (padH >= 4) { X.rect(g, x, y, padW, 1, X.mixPk(col, WHITE, on || gl > 0.02 ? 0.3 : 0.07)); X.rect(g, x, y + padH - 1, padW, 1, X.shade(col, 0.72)); }
          if (round) { d[y * n + x] = BLACK; d[y * n + x + padW - 1] = BLACK; d[(y + padH - 1) * n + x] = BLACK; d[(y + padH - 1) * n + x + padW - 1] = BLACK; }
          if (on) X.put(g, x + 1, y + 1, X.mixPk(col, WHITE, 0.6));
          glow[i] = Math.max(0, gl - dt * 3);
        }
      };
    },
  });

  add({
    name: 'Side Scan', seed: 3, sizes: [80, 100], fps: 10,
    recipe: 'A sonar towed above the seabed paints a waterfall of returns: a dark water column down the middle, bright first echoes, ripples of sand, rocks and the odd wreck with long acoustic shadows, and shoals of fish. Its colour, the seabed and what lies on it change with every variation.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, c = n / 2, nz = U.noise(R), hue = R.pick([9, 9, 13, 55, 33]);
      const tone = U.lut([[0, 0, 0], U.hsb(hue, 95, 35), U.hsb(hue + 3, 80, 80), U.hsb(hue + 6, 25, 100)], false);
      const water = new Uint32Array(n * n).fill(BLACK), [altK, fishT] = scanRoll(g);
      g.trait('Sonar', { 9: 'Amber', 13: 'Gold', 55: 'Cyan', 33: 'Green' }[hue]); g.trait('Seabed', 'Sand and rock'); g.trait('Wrecks', 'None');
      let row = 0;
      return (t, dt, f) => {
        for (let rep = f === 0 ? n : 1; rep > 0; rep--) {
        water.copyWithin(n, 0, n * (n - 1));       // scroll down a row
        const z = row++ * 0.05, alt = c * altK * (0.25 + 0.12 * (nz.n2(z * 0.3, 7) + 1));
        for (let x = 0; x < n; x++) {
          const side = x < c ? -1 : 1, range = Math.abs(x + 0.5 - c);
          let v = 0;
          if (range < alt) {
            const fish = nz.n2(z * 2, range * 0.3 + side * 40) > fishT ? 0.5 : 0;
            v = 0.03 + fish;
          } else {
            const gr = range - alt, sand = 0.45 + 0.25 * Math.sin(gr * 0.9 + nz.n2(z * 0.5, gr * 0.05 + side * 10) * 6);
            const rock = nz.fbm(z * 0.6, gr * 0.08 + side * 30, 1, 3);
            // a rock throws a shadow outward from the fish's point of view
            const shadow = nz.fbm(z * 0.6, (gr - 4) * 0.08 + side * 30, 1, 3) > 0.28 && rock < 0.28 ? 0.15 : 1;
            v = (gr < 2 ? 1 : sand * Math.max(0.35, 1 - gr / c) + (rock > 0.28 ? 0.45 : 0)) * shadow;
          }
          water[x] = tone[Math.min(255, Math.max(0, v * 255 | 0))];
        }
        }
        d.set(water);
        for (let y = 0; y < n; y += 10) { X.put(g, 0, y, X.rgb(120, 120, 120)); X.put(g, n - 1, y, X.rgb(120, 120, 120)); }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, c = n / 2, nz = U.noise(R), pal = R.pick(['amber', 'amber', 'grey', 'blue', 'green', 'copper']);
      const hue = { amber: 9, grey: 0, blue: 58, green: 33, copper: 4 }[pal] ?? 9, sat = pal === 'grey' ? 0 : pal === 'copper' ? 60 : 95;
      const tone = U.lut([[0, 0, 0], U.hsb(hue, sat, 35), U.hsb(hue + 3, sat * 0.85, 80), U.hsb(hue + 6, sat * 0.25, 100)], false);
      const water = new Uint32Array(n * n).fill(BLACK), ripple = R.range(0.6, 1.4), rocky = R.range(0.2, 0.36), wrecks = [], [altK, fishT] = scanRoll(g);
      g.trait('Sonar', pal[0].toUpperCase() + pal.slice(1)); g.trait('Seabed', rocky > 0.28 ? 'Sandy' : 'Rocky'); g.trait('Wrecks', 'Some');
      let row = 0;
      return (t, dt, f) => {
        for (let rep = f === 0 ? n : 1; rep > 0; rep--) {
          water.copyWithin(n, 0, n * (n - 1));
          const z = row++ * 0.05, alt = c * altK * (0.25 + 0.12 * (nz.n2(z * 0.3, 7) + 1));
          if (R() < 0.006) wrecks.push({ z0: row, len: R.int(8, 18), r: R.range(0.15, 0.6) * c, w: R.int(3, 6), side: R.sign() });
          for (let x = 0; x < n; x++) {
            const side = x < c ? -1 : 1, range = Math.abs(x + 0.5 - c);
            let v = 0;
            if (range < alt) v = 0.03 + (nz.n2(z * 2, range * 0.3 + side * 40) > fishT ? 0.5 : 0);
            else {
              const gr = range - alt, sand = 0.45 + 0.25 * Math.sin(gr * ripple + nz.n2(z * 0.5, gr * 0.05 + side * 10) * 6);
              const rock = nz.fbm(z * 0.6, gr * 0.08 + side * 30, 1, 3);
              const shadow = nz.fbm(z * 0.6, (gr - 4) * 0.08 + side * 30, 1, 3) > rocky && rock < rocky ? 0.15 : 1;
              v = (gr < 2 ? 1 : sand * Math.max(0.35, 1 - gr / c) + (rock > rocky ? 0.45 : 0)) * shadow;
              for (const w of wrecks) if (w.side === side && row - w.z0 < w.len) { const rr = gr - w.r; if (rr >= 0 && rr < w.w) v = 1.1; else if (rr >= w.w && rr < w.w + w.len * 0.8) v *= 0.12; }
            }
            water[x] = tone[Math.min(255, Math.max(0, v * 255 | 0))];
          }
          while (wrecks.length && row - wrecks[0].z0 > 40) wrecks.shift();
        }
        d.set(water);
        for (let y = 0; y < n; y += 10) { X.put(g, 0, y, X.rgb(120, 120, 120)); X.put(g, n - 1, y, X.rgb(120, 120, 120)); }
      };
    }),
  });

  add({
    name: 'Tape Deck', sizes: [80, 100], fps: 12,
    recipe: 'A cassette seen through its window: the tape winds from one hub to the other, the reels changing size and speed as it goes, and auto-reverses at the end of the side.',
    make(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.4), shell = U.pk(U.mix(sc.cols[0], [20, 20, 24], 0.75)), label = U.pk(U.mix(sc.cols[1 % sc.cols.length], [255, 255, 255], 0.55));
      const stripe = U.pk(sc.cols[2 % sc.cols.length]), tape = X.rgb(60, 34, 22), hubc = WHITE, cy = Math.round(n * 0.52);
      const lx = Math.round(n * 0.3), rx = Math.round(n * 0.7), rMin = n * 0.06, rMax = n * 0.17, title = R.pick(['MIX', 'SIDE', 'TAPE', 'DUB', 'LOOP']) + ' ' + R.int(1, 99);
      let a1 = 0, a2 = 0, wound = 0, dir = 1;
      const disc = (cx, r, col) => X.disc(g, cx, cy, r, col);
      return (t, dt) => {
        d.fill(X.rgb(10, 10, 12));
        X.rect(g, n * 0.06, n * 0.2, n * 0.88, n * 0.66, shell);
        X.rect(g, n * 0.1, n * 0.24, n * 0.8, n * 0.16, label);
        X.rect(g, n * 0.1, n * 0.36, n * 0.8, 2, stripe);
        X.text(g, title, n * 0.12, n * 0.255, X.rgb(30, 30, 40), 1);
        X.rect(g, n * 0.2, n * 0.42, n * 0.6, n * 0.22, X.rgb(24, 22, 26));
        wound += dir * dt * 0.035;
        if (wound > 1 || wound < 0) { dir = -dir; wound = Math.max(0, Math.min(1, wound)); }
        const r1 = Math.sqrt(rMin * rMin + (1 - wound) * (rMax * rMax - rMin * rMin)), r2 = Math.sqrt(rMin * rMin + wound * (rMax * rMax - rMin * rMin));
        disc(lx, r1, tape); disc(rx, r2, tape);
        a1 += dir * dt * 6 / r1; a2 += dir * dt * 6 / r2;
        for (const [cx, a] of [[lx, a1], [rx, a2]]) {
          X.disc(g, cx, cy, n * 0.05, hubc);
          for (let k = 0; k < 6; k++) { const th = a + k * TAU / 6; X.line(g, cx, cy, cx + Math.cos(th) * n * 0.045, cy + Math.sin(th) * n * 0.045, X.rgb(40, 40, 46)); }
          X.disc(g, cx, cy, n * 0.018, X.rgb(40, 40, 46));
        }
        X.line(g, lx, cy + r1, n * 0.36, n * 0.8, tape); X.line(g, rx, cy + r2, n * 0.64, n * 0.8, tape); X.line(g, n * 0.36, n * 0.8, n * 0.64, n * 0.8, tape);
        X.rect(g, n * 0.46, n * 0.78, n * 0.08, n * 0.06, X.rgb(170, 170, 180));
        for (const [sx, sy] of [[0.09, 0.22], [0.9, 0.22], [0.09, 0.83], [0.9, 0.83]]) X.put(g, n * sx, n * sy, X.rgb(160, 160, 170));
        X.text(g, dir > 0 ? 'A' : 'B', n * 0.83, n * 0.255, X.rgb(30, 30, 40));
      };
    },
  });

  add({
    name: 'Metronomes', sizes: [80, 100], fps: 12, music: true,
    interactive: 'Click a metronome to knock it out of step.',
    listens: 'Clap a steady beat and the metronomes fall in with you.',
    recipe: 'A shelf of metronomes set to slightly different tempos, each ticking as it swings. The shelf rocks a little, and over half a minute that coupling pulls them into step; then one is nudged and they drift apart again. Click one to knock it out of step.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, k = R.pick([5, 6, 7, 8]), w = n / k, base = R.range(2.6, 3.4), sc = U.scheme(R, 0.5);
      const om = Array.from({ length: k }, () => base * (1 + R.range(-0.08, 0.08))), ph = Array.from({ length: k }, () => R.range(0, TAU));
      const body = Array.from({ length: k }, (_, i) => U.pk(sc.cols[i % sc.cols.length])), shelfY = Math.round(n * 0.82), h = n * 0.56;
      const paper = wallpaper(n, X.rgb(18, 16, 22), shelfY), ear = metroEar(g, ph, om);
      g.trait('Count', k); g.trait('Finish', 'Painted'); g.trait('Shape', 'Pyramid'); g.trait('Wall', 'Plum'); g.trait('Palette', palName(sc));
      let couple = 0, clock = 0;
      const lastS = ph.map(Math.sin);
      return (t, dt) => {
        clock += dt;
        if (clock > 32) { clock = 0; couple = 0; for (let i = 0; i < k; i++) ph[i] = R.range(0, TAU); }
        couple = Math.min(1.4, couple + dt * 0.05);
        let sx = 0, cx = 0; for (let i = 0; i < k; i++) { sx += Math.sin(ph[i]); cx += Math.cos(ph[i]); }
        const mean = Math.atan2(sx, cx), r = Math.hypot(sx, cx) / k;
        for (let i = 0; i < k; i++) ph[i] += dt * (om[i] + couple * r * Math.sin(mean - ph[i]) * 2);
        for (const tp of g.input.taps()) { const i = Math.floor(tp.x * k); if (i >= 0 && i < k) ph[i] += 1 + g.alt() * 1.5; }
        if (ear(dt)) couple = Math.max(couple, 0.8);
        for (let i = 0; i < k; i++) { const s = Math.sin(ph[i]); if ((s >= 0) !== (lastS[i] >= 0)) g.sound.hit('blip', 0.35, { freq: 1100 + i * 90, pan: (i + 0.5) / k * 1.6 - 0.8 }); lastS[i] = s; }
        const rock = Math.round(Math.sin(mean) * r * 1.2);
        d.set(paper);
        X.rect(g, 0, shelfY + 2, n, n, X.rgb(70, 46, 30)); X.rect(g, 0, shelfY + 2, n, 1, X.rgb(110, 76, 48));
        for (let i = 0; i < k; i++) {
          const cx0 = w * (i + 0.5) + rock, bw = w * 0.36, top = shelfY - h;
          X.poly(g, [cx0 - bw, shelfY + 2, cx0 + bw, shelfY + 2, cx0 + bw * 0.35, top, cx0 - bw * 0.35, top], body[i]);
          X.poly(g, [cx0 - bw * 0.6, shelfY - h * 0.15, cx0 + bw * 0.6, shelfY - h * 0.15, cx0 + bw * 0.3, top + h * 0.12, cx0 - bw * 0.3, top + h * 0.12], X.shade(body[i], 0.35));
          const th = Math.sin(ph[i]) * 0.42, px = cx0, py = shelfY - h * 0.2, len = h * 0.78;
          const ex = px + Math.sin(th) * len, ey = py - Math.cos(th) * len;
          X.line(g, px, py, ex, ey, X.rgb(220, 220, 228));
          const wx = px + Math.sin(th) * len * 0.62, wy = py - Math.cos(th) * len * 0.62;
          X.rect(g, wx - 1.5, wy - 1, 3, 3, X.rgb(240, 200, 80));
          if (Math.abs(th) < 0.06) X.put(g, cx0, top - 2, WHITE);
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g), k = R.pick([3, 4, 5, 6, 7, 8]), w = n / k, base = R.range(2.4, 3.6), sc = U.scheme(R, 0.5);
      const om = Array.from({ length: k }, () => base * (1 + R.range(-0.08, 0.08))), ph = Array.from({ length: k }, () => R.range(0, TAU));
      const look = R.pick(['wood', 'palette', 'palette', 'chrome']), woodC = [[120, 70, 36], [150, 96, 52], [90, 52, 30], [60, 36, 24]];
      const body = Array.from({ length: k }, (_, i) => look === 'wood' ? U.pk(R.pick(woodC)) : look === 'chrome' ? X.rgb(180, 186, 196) : U.pk(sc.cols[i % sc.cols.length]));
      const shape = R.pick(['pyramid', 'pyramid', 'box']), shelfY = Math.round(n * 0.82), h = n * R.range(0.38, 0.5) * 1.2, wall = X.rgb(...R.pick([[18, 16, 22], [26, 22, 34], [30, 24, 20], [16, 24, 30]])), paper = wallpaper(n, wall, shelfY), ear = metroEar(g, ph, om);
      const tick = Array.from({ length: k }, (_, i) => 1100 + i * 90), lastS = ph.map(Math.sin);
      g.trait('Count', k); g.trait('Finish', { wood: 'Wood', palette: 'Painted', chrome: 'Chrome' }[look]); g.trait('Shape', shape === 'box' ? 'Box' : 'Pyramid'); g.trait('Wall', { 18: 'Plum', 26: 'Aubergine', 30: 'Umber', 16: 'Slate' }[wall & 255]); if (look === 'palette') g.trait('Palette', palName(sc));
      let couple = 0, clock = 0;
      return (t, dt) => {
        me.step(dt);
        for (const tp of me.taps) { const i = Math.floor(tp.x * k); if (i >= 0 && i < k) { ph[i] += R.range(1, 2.5); couple = Math.min(couple, 0.4); } }
        if (ear(dt)) couple = Math.max(couple, 0.8);
        clock += dt;
        if (clock > 32) { clock = 0; couple = 0; for (let i = 0; i < k; i++) ph[i] = R.range(0, TAU); }
        couple = Math.min(1.4, couple + dt * 0.05);
        let sx = 0, cx = 0; for (let i = 0; i < k; i++) { sx += Math.sin(ph[i]); cx += Math.cos(ph[i]); }
        const mean = Math.atan2(sx, cx), r = Math.hypot(sx, cx) / k;
        for (let i = 0; i < k; i++) {
          ph[i] += dt * (om[i] + couple * r * Math.sin(mean - ph[i]) * 2);
          const s = Math.sin(ph[i]);
          if ((s >= 0) !== (lastS[i] >= 0)) g.sound.hit('blip', 0.35, { freq: tick[i], pan: (i + 0.5) / k * 1.6 - 0.8 });
          lastS[i] = s;
        }
        const rock = Math.round(Math.sin(mean) * r * 1.2);
        d.set(paper);
        X.rect(g, 0, shelfY + 2, n, n, X.rgb(70, 46, 30)); X.rect(g, 0, shelfY + 2, n, 1, X.rgb(110, 76, 48));
        for (let i = 0; i < k; i++) {
          const cx0 = w * (i + 0.5) + rock, bw = Math.min(w * 0.36, n * 0.09), top = shelfY - h;
          if (shape === 'pyramid') {
            X.poly(g, [cx0 - bw, shelfY + 2, cx0 + bw, shelfY + 2, cx0 + bw * 0.35, top, cx0 - bw * 0.35, top], body[i]);
            X.poly(g, [cx0 - bw, shelfY + 2, cx0 - bw * 0.7, shelfY + 2, cx0 - bw * 0.25, top, cx0 - bw * 0.35, top], X.shade(body[i], 1.25));
            X.poly(g, [cx0 - bw * 0.6, shelfY - h * 0.15, cx0 + bw * 0.6, shelfY - h * 0.15, cx0 + bw * 0.3, top + h * 0.12, cx0 - bw * 0.3, top + h * 0.12], X.shade(body[i], 0.35));
          } else {
            X.rect(g, cx0 - bw * 0.8, top + h * 0.05, bw * 1.6, h * 0.95 + 2, body[i]); X.rect(g, cx0 - bw * 0.8, top + h * 0.05, 1, h * 0.95 + 2, X.shade(body[i], 1.3));
            X.rect(g, cx0 - bw * 0.55, top + h * 0.12, bw * 1.1, h * 0.72, X.shade(body[i], 0.35));
          }
          const th = Math.sin(ph[i]) * 0.42, px = cx0, py = shelfY - h * 0.2, len = h * 0.78;
          X.line(g, px, py, px + Math.sin(th) * len, py - Math.cos(th) * len, X.rgb(220, 220, 228));
          const wx = px + Math.sin(th) * len * 0.62, wy = py - Math.cos(th) * len * 0.62;
          X.rect(g, wx - 1.5, wy - 1, 3, 3, X.rgb(240, 200, 80));
          if (Math.abs(th) < 0.06) X.rect(g, cx0 - 1, top - 3, 2, 2, WHITE);
        }
      };
    }),
  });

  add({
    name: 'Patch Bay', sizes: [80, 100], fps: 12, music: true,
    interactive: 'Click two jacks to patch a new cable; click a knob to retune it.',
    recipe: 'A modular synth panel of jacks, knobs and lights, wired with sagging patch cables. Signals run along each cable as beads of light, and each bead that arrives plays a note set by the knob it came from, so the cables make a slow polyrhythm. Every so often a cable is moved; click two jacks to patch your own, or a knob to retune it.',
    make: fork(function og(R, U, g) {
      const { n, d } = g, sc = U.scheme(R, 0.45), cols = 6, rowsN = 6, sx = n / cols, sy = n / rowsN, panel = X.rgb(36, 36, 40), seam = X.rgb(24, 24, 28);
      const jacks = []; for (let r = 0; r < rowsN; r++) for (let c = 0; c < cols; c++) jacks.push({ x: Math.round(sx * (c + 0.5)), y: Math.round(sy * (r + 0.62)), knob: R.bool(0.5), a: R.range(0, TAU), led: R.range(0, 1) });
      const ncab = R.int(5, 8), cables = [];
      g.trait('Panel', 'Graphite'); g.trait('Jacks', cols + ' x ' + rowsN); g.trait('Cables', ncab); g.trait('Palette', palName(sc)); g.trait('Voice', 'Soft');
      const plug = () => { let a = R.int(0, jacks.length - 1), b = R.int(0, jacks.length - 1); while (b === a) b = R.int(0, jacks.length - 1); return { a, b, col: U.pk(sc.cols[R.int(0, sc.cols.length - 1)]), sag: R.range(0.15, 0.35) * n, rate: R.range(0.3, 0.8), drop: 0 }; };
      for (let i = 0; i < ncab; i++) cables.push(plug());
      let next = R.range(5, 9), pick = -1;
      // sound: each bead that reaches a cable's far end plays a note set by the jack it came from (and its knob)
      const PENTA = [0, 2, 4, 7, 9], pitch = j => 48 + PENTA[j % 5] + 12 * (Math.floor(j / 5) % 3) + (jacks[j].tune || 0);
      return (t, dt) => {
        d.fill(panel);
        for (const tp of g.input.taps()) {   // two jacks patch a new cable; a knob retunes its jack
          const x = tp.x * n, y = tp.y * n, kn = jacks.findIndex(j => j.knob && Math.hypot(x - j.x, y - (j.y - sy * 0.38)) < sx * 0.2);
          if (kn >= 0) { const J = jacks[kn]; J.a += TAU / 8; J.tune = ((J.tune || 0) + 2) % 12; g.sound.note(pitch(kn), { dur: 0.3, vel: 0.4, wave: 'triangle' }); continue; }
          const j = jacks.findIndex(jj => Math.hypot(x - jj.x, y - jj.y) < sx * 0.3);
          if (j < 0) { pick = -1; continue; }
          if (pick < 0 || pick === j) pick = j;
          else { cables.shift(); cables.push({ a: pick, b: j, col: U.pk(sc.cols[Math.floor(g.alt() * sc.cols.length)]), sag: (0.15 + g.alt() * 0.2) * n, rate: 0.3 + g.alt() * 0.5, drop: 1, user: true }); pick = -1; }
        }
        for (let c = 1; c < cols; c++) if (c % 2 === 0) X.rect(g, Math.round(sx * c), 0, 1, n, seam);
        for (const j of jacks) {
          X.disc(g, j.x, j.y, sx * 0.17, pick >= 0 && jacks[pick] === j ? X.rgb(250, 220, 90) : X.rgb(14, 14, 16)); X.put(g, j.x, j.y, X.rgb(70, 70, 76));
          if (j.knob) { const kx = j.x, ky = j.y - sy * 0.38; X.disc(g, kx, ky, sx * 0.13, X.rgb(190, 190, 196)); X.line(g, kx, ky, kx + Math.cos(j.a + Math.sin(t * 0.3 + j.led * 6) * 0.4) * sx * 0.12, ky + Math.sin(j.a + Math.sin(t * 0.3 + j.led * 6) * 0.4) * sx * 0.12, X.rgb(30, 30, 30)); }
          else X.put(g, j.x + 2, j.y - sy * 0.35, 0.5 + 0.5 * Math.sin(t * (1 + j.led * 3) + j.led * 9) > 0.5 ? X.rgb(255, 60, 60) : X.rgb(70, 20, 20));
        }
        if (t > next) { next = t + R.range(5, 9); const i = freeCable(cables, R.int(0, cables.length - 1)); if (i >= 0) { cables[i] = plug(); cables[i].drop = 1; } }
        for (const cb of cables) {
          cb.drop = Math.max(0, cb.drop - dt * 0.8);
          const A = jacks[cb.a], B = jacks[cb.b], m = 24, sag = cb.sag * (1 + cb.drop * 0.8), beat = Math.floor(t * cb.rate * 4);
          if (beat !== cb.last) { if (cb.last !== undefined && beat % 4 === 0) g.sound.note(pitch(cb.a), { dur: 0.22, vel: 0.3, wave: 'triangle', cutoff: 2200, pan: B.x / n * 1.4 - 0.7 }); cb.last = beat; }
          cable(g, A, B, m, sag, cb.col, t * cb.rate, panel);
        }
      };
    }, function alt(R, U, g) {
      const { n, d } = g, me = hand(g, 15), sc = U.scheme(R, 0.45), cols = R.pick([5, 6]), rowsN = R.pick([5, 6]), sx = n / cols, sy = n / rowsN;
      const panels = [[36, 36, 40], [200, 196, 186], [30, 34, 48], [44, 30, 30]], pc = R.pick(panels), panel = X.rgb(...pc), light = pc[0] > 128, seam = X.shade(panel, 0.7);
      const scale = R.pick(SCALES), root = 48 + R.int(0, 7), wave = R.pick(['triangle', 'sine', 'square']);
      const jacks = []; for (let r = 0; r < rowsN; r++) for (let c = 0; c < cols; c++) jacks.push({ x: Math.round(sx * (c + 0.5)), y: Math.round(sy * (r + 0.62)), knob: R.bool(0.5), a: R.range(0, TAU), led: R.range(0, 1), deg: R.int(0, scale.length * 2 - 1) });
      const plug = (a, b) => {
        if (a === undefined) { a = R.int(0, jacks.length - 1); b = R.int(0, jacks.length - 1); while (b === a) b = R.int(0, jacks.length - 1); }
        return { a, b, col: U.pk(sc.cols[R.int(0, sc.cols.length - 1)]), sag: R.range(0.15, 0.35) * n, rate: R.pick([0.25, 0.375, 0.5, 0.75]), drop: 1, ph: R.range(0, 1), last: 0 };
      };
      const cables = Array.from({ length: R.int(4, 7) }, () => plug());
      g.trait('Panel', ['Graphite', 'Cream', 'Navy', 'Oxblood'][panels.indexOf(pc)]); g.trait('Jacks', cols + ' x ' + rowsN); g.trait('Cables', cables.length); g.trait('Palette', palName(sc)); g.trait('Voice', { triangle: 'Soft', sine: 'Pure', square: 'Reedy' }[wave]);
      cables.forEach(cb => cb.drop = 0);
      let next = R.range(6, 10), pick = -1, clock = 0;
      const pitch = j => root + 12 * Math.floor(j.deg / scale.length) + scale[j.deg % scale.length];
      return (t, dt) => {
        me.step(dt); clock += dt;
        for (const tp of me.taps) {
          const x = tp.x * n, y = tp.y * n;
          const knob = jacks.find(j => j.knob && Math.hypot(x - j.x, y - (j.y - sy * 0.38)) < sx * 0.2);
          if (knob) { knob.deg = (knob.deg + 1) % (scale.length * 2); knob.a += TAU / 8; g.sound.note(pitch(knob), { dur: 0.3, vel: 0.4, wave }); continue; }
          const j = jacks.findIndex(jj => Math.hypot(x - jj.x, y - jj.y) < sx * 0.3);
          if (j < 0) { pick = -1; continue; }
          if (pick < 0 || pick === j) pick = j;
          else { cables.shift(); cables.push(Object.assign(plug(pick, j), { user: true })); pick = -1; }
        }
        d.fill(panel);
        for (let c = 1; c < cols; c++) if (c % 2 === 0) X.rect(g, Math.round(sx * c), 0, 1, n, seam);
        for (let k = 0; k < jacks.length; k++) {
          const j = jacks[k];
          X.disc(g, j.x, j.y, sx * 0.17, k === pick ? X.rgb(250, 220, 90) : X.rgb(14, 14, 16)); X.put(g, j.x, j.y, X.rgb(70, 70, 76));
          if (j.knob) { const kx = j.x, ky = j.y - sy * 0.38, a = j.a + Math.sin(t * 0.3 + j.led * 6) * 0.2; X.disc(g, kx, ky, sx * 0.13, light ? X.rgb(40, 40, 44) : X.rgb(190, 190, 196)); X.line(g, kx, ky, kx + Math.cos(a) * sx * 0.12, ky + Math.sin(a) * sx * 0.12, light ? WHITE : X.rgb(30, 30, 30)); }
          else X.put(g, j.x + 2, j.y - sy * 0.35, 0.5 + 0.5 * Math.sin(t * (1 + j.led * 3) + j.led * 9) > 0.5 ? X.rgb(255, 60, 60) : X.rgb(70, 20, 20));
        }
        if (clock > next && !me.active) { next = clock + R.range(6, 10); const i = freeCable(cables, R.int(0, cables.length - 1)); if (i >= 0) cables[i] = plug(); }
        for (const cb of cables) {
          cb.drop = Math.max(0, cb.drop - dt * 0.8);
          const A = jacks[cb.a], B = jacks[cb.b], m = 24, sag = cb.sag * (1 + cb.drop * 0.8), pos = clock * cb.rate + cb.ph;
          // the lead bead reaching the far jack plays the source jack's note
          const beat = Math.floor(pos * 4);
          if (beat !== cb.last) { if (cb.last && beat % 4 === 0) g.sound.note(pitch(A), { dur: 0.22, vel: 0.3, wave, cutoff: 2200, pan: B.x / n * 1.4 - 0.7 }); cb.last = beat; }
          cable(g, A, B, m, sag, cb.col, pos, panel);
        }
      };
    }),
  });
})();
