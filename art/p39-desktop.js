// Set 4 · Desktop: an old operating system, drawn in cells, that you can use.
// Every piece keeps itself busy with a ghost user; in the large view your
// pointer takes over (click, drag) and the ghost comes back after a few idle seconds.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 4, fam: 'Desktop' }, def));
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
  const rgb = X.rgb;
  const WORDS = ['HUE', 'PRISM', 'ECHO', 'VOID', 'NEON', 'GRAIN', 'DRIFT', 'TONE', 'DUSK', 'BLOOM', 'EMBER', 'SPIRAL', 'STRATA', 'CASCADE', 'MIND', 'EPOCH', 'AXON', 'DECAY', 'GLOW', 'SYNAE'];

  // ---------- a 3 x 5 font, so a window title fits ----------
  const F3 = {
    A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7], F: [7, 4, 6, 4, 4], G: [3, 4, 5, 5, 3],
    H: [5, 5, 7, 5, 5], I: [7, 2, 2, 2, 7], J: [1, 1, 1, 5, 2], K: [5, 5, 6, 5, 5], L: [4, 4, 4, 4, 7], M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5],
    O: [2, 5, 5, 5, 2], P: [6, 5, 6, 4, 4], Q: [2, 5, 5, 6, 3], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2], U: [5, 5, 5, 5, 7],
    V: [5, 5, 5, 5, 2], W: [5, 5, 7, 7, 5], X: [5, 5, 2, 5, 5], Y: [5, 5, 2, 2, 2], Z: [7, 1, 2, 4, 7],
    0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1], 5: [7, 4, 6, 1, 6], 6: [3, 4, 7, 5, 7],
    7: [7, 1, 1, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 6],
    ' ': [0, 0, 0, 0, 0], '.': [0, 0, 0, 0, 2], ',': [0, 0, 0, 2, 4], ':': [0, 2, 0, 2, 0], '-': [0, 0, 7, 0, 0], '_': [0, 0, 0, 0, 7],
    '/': [1, 1, 2, 4, 4], '\\': [4, 4, 2, 1, 1], '!': [2, 2, 2, 0, 2], '?': [6, 1, 2, 0, 2], '%': [5, 1, 2, 4, 5], '+': [0, 2, 7, 2, 0],
    '=': [0, 7, 0, 7, 0], '(': [1, 2, 2, 2, 1], ')': [4, 2, 2, 2, 4], '>': [4, 2, 1, 2, 4], '<': [1, 2, 4, 2, 1], '*': [5, 2, 7, 2, 5],
    '#': [5, 7, 5, 7, 5], "'": [2, 2, 0, 0, 0], '"': [5, 5, 0, 0, 0], '[': [3, 2, 2, 2, 3], ']': [6, 2, 2, 2, 6], '|': [2, 2, 2, 2, 2],
    '@': [7, 5, 7, 4, 3], '~': [0, 3, 6, 0, 0], '&': [2, 5, 2, 5, 3], ';': [0, 2, 0, 2, 4], '^': [2, 5, 0, 0, 0], '$': [3, 6, 2, 3, 6],
  };
  // draws text with its top-left at (x, y); stops at maxW cells; returns the x after it
  function txt(g, s, x, y, c, maxW = 1e9) {
    x = Math.round(x); y = Math.round(y);
    const { n, d } = g, x0 = x;
    for (let k = 0; k < s.length; k++) {
      if (x - x0 + 3 > maxW) break;
      const rows = F3[s[k].toUpperCase()] || F3['?'];
      for (let r = 0; r < 5; r++) {
        const yy = y + r;
        if (yy < 0 || yy >= n) continue;
        for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) { const xx = x + b; if (xx >= 0 && xx < n) d[yy * n + xx] = c; }
      }
      x += 4;
    }
    return x;
  }
  const tw = s => s.length * 4 - 1;
  // the longest run of whole words that fits in maxW cells (a chat line never stops mid-word)
  const fit = (s, maxW) => { if (tw(s) <= maxW) return s; let out = ''; for (const w of s.split(' ')) { const nx = out ? out + ' ' + w : w; if (tw(nx) > maxW) break; out = nx; } return out || s.slice(0, Math.max(1, Math.floor((maxW + 1) / 4))); };
  // the microphone, when the viewer has it on: { level, bands, beats } once a frame, else null
  const hear = g => { const I = g.input; return I.listening ? { level: I.level, bands: I.bands, beats: I.beats() } : null; };

  // ---------- themes ----------
  // face, light, shadow, dark: the bevel; bar / barText / barOff: title bars; sel: selection; desk: wallpaper
  const THEMES = [
    { name: 'classic', face: rgb(192, 192, 192), light: WHITE, shadow: rgb(128, 128, 128), dark: rgb(16, 16, 16), bar: rgb(0, 0, 128), bar2: rgb(16, 132, 208), barText: WHITE, barOff: rgb(128, 128, 128), sel: rgb(0, 0, 128), selText: WHITE, desk: rgb(0, 128, 128), win: WHITE, text: BLACK },
    { name: 'plum', face: rgb(200, 192, 208), light: rgb(248, 244, 252), shadow: rgb(132, 120, 148), dark: rgb(28, 20, 36), bar: rgb(104, 40, 120), bar2: rgb(200, 90, 160), barText: WHITE, barOff: rgb(140, 128, 150), sel: rgb(104, 40, 120), selText: WHITE, desk: rgb(56, 44, 96), win: rgb(252, 250, 255), text: rgb(20, 12, 28) },
    { name: 'mono', face: WHITE, light: WHITE, shadow: rgb(150, 150, 150), dark: BLACK, bar: BLACK, bar2: BLACK, barText: WHITE, barOff: rgb(150, 150, 150), sel: BLACK, selText: WHITE, desk: rgb(160, 160, 160), win: WHITE, text: BLACK, stripes: true },
    { name: 'amiga', face: rgb(170, 170, 170), light: WHITE, shadow: rgb(0, 0, 0), dark: BLACK, bar: rgb(0, 85, 170), bar2: rgb(255, 136, 0), barText: WHITE, barOff: rgb(110, 110, 110), sel: rgb(255, 136, 0), selText: BLACK, desk: rgb(0, 85, 170), win: rgb(170, 170, 170), text: BLACK },
    { name: 'night', face: rgb(54, 58, 70), light: rgb(96, 102, 120), shadow: rgb(30, 32, 40), dark: rgb(10, 10, 14), bar: rgb(30, 160, 150), bar2: rgb(120, 230, 200), barText: rgb(10, 20, 20), barOff: rgb(70, 76, 90), sel: rgb(30, 160, 150), selText: rgb(10, 20, 20), desk: rgb(18, 20, 28), win: rgb(28, 30, 38), text: rgb(210, 220, 230) },
    { name: 'forest', face: rgb(196, 204, 180), light: rgb(240, 246, 226), shadow: rgb(120, 132, 104), dark: rgb(24, 32, 20), bar: rgb(40, 100, 60), bar2: rgb(150, 200, 90), barText: WHITE, barOff: rgb(130, 140, 116), sel: rgb(40, 100, 60), selText: WHITE, desk: rgb(70, 50, 40), win: rgb(250, 248, 236), text: rgb(24, 32, 20) },
    { name: 'candy', face: rgb(236, 210, 226), light: WHITE, shadow: rgb(176, 130, 160), dark: rgb(60, 24, 50), bar: rgb(220, 40, 120), bar2: rgb(255, 170, 60), barText: WHITE, barOff: rgb(190, 160, 180), sel: rgb(220, 40, 120), selText: WHITE, desk: rgb(40, 150, 170), win: WHITE, text: rgb(50, 20, 40) },
  ];
  const theme = R => R.pick(THEMES);
  const ICON_INKS = [rgb(255, 210, 60), rgb(80, 200, 255), rgb(255, 90, 110), rgb(120, 220, 100), rgb(200, 120, 255), rgb(255, 150, 60)];

  function bevel(g, th, x, y, w, h, sunk = false, face = th.face) {
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    X.rect(g, x, y, w, h, face);
    const a = sunk ? th.shadow : th.light, b = sunk ? th.light : th.dark, c = sunk ? th.dark : th.shadow;
    X.rect(g, x, y, w, 1, a); X.rect(g, x, y, 1, h, a);
    X.rect(g, x, y + h - 1, w, 1, b); X.rect(g, x + w - 1, y, 1, h, b);
    if (w > 4 && h > 4) { X.rect(g, x + 1, y + h - 2, w - 2, 1, c); X.rect(g, x + w - 2, y + 1, 1, h - 2, c); if (sunk) { X.rect(g, x + 1, y + 1, w - 2, 1, th.dark); X.rect(g, x + 1, y + 1, 1, h - 2, th.dark); } }
  }
  // a window frame with title bar and close box; returns the client rect [x, y, w, h]
  function frame(g, th, x, y, w, h, title, active = true, opts = {}) {
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    bevel(g, th, x, y, w, h);
    const by = y + 2, bh = 7, bx = x + 2, bw = w - 4;
    if (th.stripes) {
      X.rect(g, bx, by, bw, bh, th.face);
      if (active) for (let k = 1; k < bh; k += 2) X.rect(g, bx + 1, by + k, bw - 2, 1, th.dark);
      const tl = Math.min(tw(title), bw - 16), tx = x + Math.round((w - tl) / 2);
      X.rect(g, tx - 2, by, tl + 4, bh, th.face); txt(g, title, tx, by + 1, th.dark, bw - 16);
    } else {
      // two-tone title bar: dithered blend from bar to bar2
      for (let k = 0; k < bw; k++) {
        const u = k / bw;
        for (let r = 0; r < bh; r++) X.put(g, bx + k, by + r, !active ? th.barOff : u > X.dith4(k, r) * 0.9 + 0.1 ? th.bar2 : th.bar);
      }
      txt(g, title, bx + 2, by + 1, active ? th.barText : th.face, bw - 14);
    }
    if (opts.close !== false) {
      const cx = x + w - 9;
      bevel(g, th, cx, by + 1, 6, 5);
      X.put(g, cx + 2, by + 2, th.dark); X.put(g, cx + 3, by + 3, th.dark); X.put(g, cx + 2, by + 4, th.dark); X.put(g, cx + 3, by + 2, th.dark); X.put(g, cx + 2, by + 3, th.dark); X.put(g, cx + 3, by + 4, th.dark);
    }
    return [x + 3, y + 10, w - 6, h - 13];
  }
  const inRect = (px, py, r) => px >= r[0] && py >= r[1] && px < r[0] + r[2] && py < r[1] + r[3];
  const ARROW = ['1.......', '11......', '121.....', '1221....', '12221...', '122221..', '1222221.', '1222111.', '12121...', '11.121..', '1..121..', '....11..'].map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : +ch));
  const HAND = ['..11....', '.1221...', '.1221...', '.122111.', '11222221', '12222221', '12222221', '.1222221', '..122221', '..111111'].map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : +ch));
  const WAIT = ['1111111', '1222221', '.12221.', '..121..', '..121..', '.12121.', '1222221', '1111111'].map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : +ch));
  const cursor = (g, x, y, kind = ARROW) => X.stamp(g, kind, Math.round(x), Math.round(y), [0, BLACK, WHITE]);
  // icons: 9 x 9, drawn in a colour
  function icon(g, x, y, kind, col, sel = false) {
    x = Math.round(x); y = Math.round(y);
    const dk = X.shade(col, 0.55), lt = X.mixPk(col, WHITE, 0.45);
    if (kind === 'folder') { X.rect(g, x, y + 1, 4, 2, dk); X.rect(g, x, y + 2, 9, 7, dk); X.rect(g, x + 1, y + 3, 7, 5, col); X.rect(g, x + 1, y + 3, 7, 1, lt); }
    else if (kind === 'doc') { X.rect(g, x + 1, y, 7, 9, BLACK); X.rect(g, x + 2, y + 1, 5, 7, WHITE); X.rect(g, x + 5, y + 1, 2, 2, rgb(190, 190, 190)); for (let k = 3; k < 8; k += 2) X.rect(g, x + 3, y + k, 3, 1, col); }
    else if (kind === 'app') { X.rect(g, x, y + 1, 9, 7, BLACK); X.rect(g, x + 1, y + 2, 7, 1, rgb(0, 0, 160)); X.rect(g, x + 1, y + 3, 7, 4, col); X.rect(g, x + 2, y + 4, 2, 2, lt); }
    else if (kind === 'disk') { X.rect(g, x, y, 9, 9, dk); X.rect(g, x + 1, y + 1, 7, 7, col); X.rect(g, x + 2, y, 5, 3, rgb(200, 200, 210)); X.put(g, x + 5, y + 1, dk); X.rect(g, x + 2, y + 5, 5, 3, WHITE); }
    else if (kind === 'trash') { X.rect(g, x + 1, y + 1, 7, 1, rgb(80, 80, 80)); X.rect(g, x + 3, y, 3, 1, rgb(80, 80, 80)); X.rect(g, x + 2, y + 2, 5, 7, rgb(160, 160, 170)); for (let k = 3; k < 7; k += 2) X.rect(g, x + k, y + 3, 1, 5, rgb(100, 100, 110)); }
    else if (kind === 'paint') { X.rect(g, x, y, 9, 9, BLACK); X.rect(g, x + 1, y + 1, 7, 7, WHITE); X.disc(g, x + 3, y + 4, 2, rgb(255, 60, 60)); X.rect(g, x + 5, y + 2, 2, 2, rgb(40, 120, 255)); X.rect(g, x + 4, y + 6, 3, 1, rgb(40, 200, 80)); }
    else if (kind === 'clock') { X.disc(g, x + 4.5, y + 4.5, 4.5, BLACK); X.disc(g, x + 4.5, y + 4.5, 3.6, WHITE); X.rect(g, x + 4, y + 2, 1, 3, BLACK); X.rect(g, x + 4, y + 4, 3, 1, col); }
    else if (kind === 'term') { X.rect(g, x, y + 1, 9, 7, rgb(60, 60, 60)); X.rect(g, x + 1, y + 2, 7, 5, BLACK); X.put(g, x + 2, y + 3, col); X.put(g, x + 3, y + 4, col); X.put(g, x + 2, y + 5, col); X.rect(g, x + 4, y + 5, 2, 1, col); }
    else if (kind === 'chat') { X.rect(g, x, y + 1, 9, 6, BLACK); X.rect(g, x + 1, y + 2, 7, 4, col); X.put(g, x + 2, y + 7, BLACK); X.put(g, x + 2, y + 8, BLACK); X.rect(g, x + 2, y + 3, 5, 1, lt); }
    else { X.rect(g, x, y, 9, 7, BLACK); X.rect(g, x + 1, y + 1, 7, 5, col); X.rect(g, x + 2, y + 2, 2, 1, lt); X.rect(g, x + 3, y + 7, 3, 1, BLACK); X.rect(g, x + 1, y + 8, 7, 1, BLACK); }
    if (sel) for (let yy = y; yy < y + 9; yy++) for (let xx = x; xx < x + 9; xx++) if ((xx + yy) & 1) X.put(g, xx, yy, rgb(0, 0, 128));
  }
  // a wallpaper of a kind, precomputed
  function wallpaper(R, n, th) {
    const bg = new Uint32Array(n * n), kind = R.pick(['plain', 'plain', 'tile', 'field', 'checker', 'gradient', 'stars']);
    const base = th.desk, alt = X.shade(base, R.pick([0.8, 1.2, 0.7])), hue0 = R.range(0, 100), a = R.range(0.02, 0.06);
    const tile = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => R.bool(0.3)));
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      let c = base;
      if (kind === 'tile') c = tile[y & 7][(x & 3) < 4 ? x & 7 : 0] && tile[y & 7][7 - (x & 7)] ? alt : base;
      else if (kind === 'checker') c = ((x >> 3) + (y >> 3)) & 1 ? alt : base;
      else if (kind === 'gradient') c = y / n > X.dith4(x, y) * 0.9 + 0.05 ? X.shade(base, 0.6) : base;
      else if (kind === 'field') c = X.shade(base, [0.86, 1, 1.12][Math.floor(((x >> 2) + 3) * a * 40 % ((y >> 2) / 2 + 2)) % 3]);
      else if (kind === 'stars') c = (Math.imul(x * 7919 + y * 104729, 2654435761) >>> 0) % 97 === 0 ? WHITE : X.shade(base, 0.45);
      bg[y * n + x] = c;
    }
    bg.kind = kind;
    return bg;
  }
  const cap = w => w[0].toUpperCase() + w.slice(1).toLowerCase();
  const themeTraits = (g, th, bg) => { g.trait('Theme', cap(th.name)); if (bg) g.trait('Wallpaper', cap(bg.kind)); };
  // The pointer, handed to the piece in cells. `active` is true while the
  // viewer is using it (and for a few seconds after); the ghost user waits.
  function pointer(g) {
    const st = { px: -1, py: -1, idle: 99, down: false };
    return (dt, n) => {
      const I = g.input, taps = I.taps(), x = I.x * n, y = I.y * n;
      const moved = I.inside && (Math.abs(x - st.px) > 0.05 || Math.abs(y - st.py) > 0.05);
      if (moved || taps.length || I.down) st.idle = 0; else st.idle += dt;
      st.px = x; st.py = y;
      const pressed = I.down && !st.down, released = !I.down && st.down;
      st.down = I.down;
      return { active: st.idle < 5, inside: I.inside, x, y, down: I.down, pressed, released, taps: taps.map(q => [q.x * n, q.y * n]) };
    };
  }
  // the ghost's cursor: glides to a target; `arrived` once it is there
  function ghost(x, y) {
    return {
      x, y, tx: x, ty: y, wait: 0,
      to(tx, ty) { this.tx = tx; this.ty = ty; },
      step(dt, speed = 70) {
        const dx = this.tx - this.x, dy = this.ty - this.y, l = Math.hypot(dx, dy), s = speed * dt;
        if (l <= s) { this.x = this.tx; this.y = this.ty; return true; }
        this.x += dx / l * s; this.y += dy / l * s; return false;
      },
    };
  }
  const word = R => R.pick(WORDS);
  // the first version's own helpers, kept for the og paths so they draw exactly as before
  const GREY = rgb(192, 192, 192), DARK = rgb(128, 128, 128), DEEP = rgb(40, 40, 40), NAVY = rgb(0, 0, 128);
  const OG_ARROW = ['1.........', '11........', '121.......', '1221......', '12221.....', '122221....', '1222221...', '12222221..', '122221111.', '1221221...', '121.1221..', '11..1221..', '1....11...'].map(r => Uint8Array.from(r, ch => ch === '.' ? 0 : +ch));
  const ogCursor = (g, x, y) => X.stamp(g, OG_ARROW, Math.round(x), Math.round(y), [0, BLACK, WHITE]);
  function ogIcon(g, x, y, kind, col) {
    x = Math.round(x); y = Math.round(y);
    if (kind === 'folder') { X.rect(g, x, y + 1, 4, 2, col); X.rect(g, x, y + 2, 9, 6, col); X.rect(g, x, y + 7, 9, 1, X.shade(col, 0.6)); X.rect(g, x + 1, y + 3, 7, 1, X.mixPk(col, WHITE, 0.5)); }
    else if (kind === 'doc') { X.rect(g, x + 1, y, 7, 9, WHITE); X.rect(g, x + 1, y + 8, 7, 1, DARK); for (let k = 2; k < 8; k += 2) X.rect(g, x + 2, y + k, 5, 1, col); }
    else if (kind === 'app') { X.rect(g, x, y, 9, 8, DEEP); X.rect(g, x + 1, y + 1, 7, 2, NAVY); X.rect(g, x + 1, y + 3, 7, 4, col); }
    else if (kind === 'disk') { X.rect(g, x, y, 9, 9, col); X.rect(g, x + 2, y, 5, 3, GREY); X.rect(g, x + 2, y + 5, 5, 4, WHITE); }
    else { X.rect(g, x, y, 9, 7, DEEP); X.rect(g, x + 1, y + 1, 7, 5, col); X.rect(g, x + 3, y + 7, 3, 1, DEEP); X.rect(g, x + 1, y + 8, 7, 1, DEEP); }
  }
  const KINDS = ['folder', 'doc', 'app', 'disk', 'screen'];
  const desktopCol = R => R.pick([rgb(0, 128, 128), rgb(0, 96, 128), rgb(58, 110, 165), rgb(80, 60, 120), rgb(30, 90, 60), rgb(120, 50, 70)]);

  // ======================================================================
  add({
    name: 'Windows', seed: 5, sizes: [100], fps: 12,
    interactive: 'Click an icon to open it, drag windows by their title bars, click the close box or the taskbar.',
    recipe: 'A whole desktop that runs: icons open into windows (notes being typed, a paint sketch, a clock, a terminal, a picture of the collection’s field), windows stack, slide and close, and the taskbar keeps up. Your pointer can do all of it.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), bg = wallpaper(R, n, th), ptr = pointer(g), gh = ghost(n / 2, n / 2);
      const APPS = R.shuffle(['notes', 'paint', 'clock', 'term', 'view', 'calc', 'files']);
      const KIND = { notes: 'doc', paint: 'paint', clock: 'clock', term: 'term', view: 'screen', calc: 'app', files: 'folder' };
      const nIcons = 5, right = R.bool(0.3);
      themeTraits(g, th, bg); g.trait('Icons', right ? 'Right' : 'Left'); g.trait('First app', cap(APPS[0]));
      const icons = Array.from({ length: nIcons }, (_, i) => ({ app: APPS[i % APPS.length], name: APPS[i].toUpperCase(), col: ICON_INKS[(i + R.int(0, 5)) % ICON_INKS.length], x: right ? n - 16 : 3, y: 3 + i * 17 }));
      const TB = n - 9;
      let wins = [], serial = 0, menu = false, drag = null, ghostPlan = null, ghostT = 0;
      const hues = R.range(0, 100), notesText = Array.from({ length: 12 }, () => Array.from({ length: R.int(2, 4) }, () => word(R)).join(' '));
      function open(ic, t) {
        const live = wins.filter(w => w.state !== 'closing');
        if (live.length >= 4) close(live[0], t);
        const w = R.int(42, 62), h = R.int(30, 46);
        wins.push({ id: ++serial, ic, app: ic.app, title: ic.name, x: R.int(18, n - w - 2), y: R.int(2, TB - h - 2), w, h, state: 'opening', t0: t, min: false, seed: R() });
      }
      function close(w, t) { if (w.state !== 'closing') { w.state = 'closing'; w.t0 = t; } }
      const top = () => { for (let i = wins.length - 1; i >= 0; i--) if (!wins[i].min && wins[i].state !== 'closing') return wins[i]; return null; };
      const raise = w => { wins = wins.filter(o => o !== w); wins.push(w); };
      function content(w, cx, cy, cw, ch, t) {
        X.rect(g, cx, cy, cw, ch, w.app === 'term' ? BLACK : th.win);
        if (w.app === 'notes') {
          const shown = Math.floor((t - w.t0) * 9);
          let k = 0;
          const rows = Math.floor((ch - 3) / 6);
          for (let li = 0; li < rows; li++) {
            const line = notesText[(li + w.id) % notesText.length], m = Math.max(0, Math.min(line.length, shown - k)); k += line.length;
            const ex = txt(g, line.slice(0, m), cx + 2, cy + 2 + li * 6, th.text, cw - 3);
            if (m < line.length) { if ((t * 3 | 0) & 1) X.rect(g, Math.min(ex, cx + cw - 2), cy + 2 + li * 6, 1, 5, th.text); break; }
          }
        } else if (w.app === 'paint') {
          for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
            const r = Math.hypot(x - cw * 0.3, y - ch * 0.35);
            X.put(g, cx + x, cy + y, y > ch * 0.62 ? (y > ch * 0.62 + 1 ? rgb(60, 170, 70) : rgb(40, 120, 50)) : r < ch * 0.18 ? rgb(255, 210, 40) : X.hsbPk(55 + y / ch * 10, 40, 100));
          }
          X.poly(g, [cx + cw * 0.55, cy + ch * 0.62, cx + cw * 0.72, cy + ch * 0.3, cx + cw * 0.9, cy + ch * 0.62], rgb(200, 60, 60));
        } else if (w.app === 'clock') {
          const r = Math.min(cw, ch) / 2 - 2, ox = cx + cw / 2, oy = cy + ch / 2;
          X.disc(g, ox, oy, r + 1, th.text); X.disc(g, ox, oy, r, th.win);
          for (let k = 0; k < 12; k++) X.put(g, ox + Math.cos(k / 12 * TAU) * (r - 1.5), oy + Math.sin(k / 12 * TAU) * (r - 1.5), th.text);
          const sec = t % 60, a1 = sec / 60 * TAU - Math.PI / 2, a2 = (t / 600) * TAU - Math.PI / 2;
          X.line(g, ox, oy, ox + Math.cos(a2) * r * 0.55, oy + Math.sin(a2) * r * 0.55, th.text);
          X.line(g, ox, oy, ox + Math.cos(a1) * r * 0.85, oy + Math.sin(a1) * r * 0.85, rgb(220, 40, 40));
        } else if (w.app === 'term') {
          const lines = Math.floor((t - w.t0) * 4), rows = Math.floor((ch - 2) / 6);
          for (let r = 0; r < rows; r++) {
            const li = lines - rows + r;
            if (li < 0) continue;
            const s = li % 5 === 4 ? '> ' + WORDS[(li * 7 + w.id) % WORDS.length] : '  ' + WORDS[(li * 3 + w.id) % WORDS.length] + ' ' + ((li * 37 + w.id * 11) % 1000);
            txt(g, s, cx + 1, cy + 1 + r * 6, rgb(80, 255, 120), cw - 2);
          }
          if ((t * 3 | 0) & 1) X.rect(g, cx + 1, cy + 1 + (rows - 1) * 6 + 6 > cy + ch - 1 ? cy + ch - 3 : cy + 1 + rows * 6, 3, 1, rgb(80, 255, 120));
        } else if (w.app === 'view') {
          for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) X.put(g, cx + x, cy + y, X.hsbPk(hues + ((x + 1) * (2 + w.seed * 3) * (t * 0.2 + 10) % (y / 2 + 3)) * 7, 85, 92));
        } else if (w.app === 'calc') {
          bevel(g, th, cx + 1, cy + 1, cw - 2, 8, true, rgb(200, 220, 190));
          const v = String(Math.floor((t - w.t0) * 37 * (1 + w.seed)) % 100000);
          txt(g, v, cx + cw - 3 - tw(v), cy + 2, BLACK);
          const keys = '789/456*123-0.=+';
          const kw = Math.floor((cw - 3) / 4), kh = Math.floor((ch - 12) / 4), hot = Math.floor(t * 4 + w.id) % 16;
          for (let k = 0; k < 16; k++) { const kx = cx + 1 + (k % 4) * kw, ky = cy + 11 + Math.floor(k / 4) * kh; bevel(g, th, kx, ky, kw - 1, kh - 1, k === hot); txt(g, keys[k], kx + Math.floor((kw - 4) / 2), ky + Math.floor((kh - 6) / 2), th.text); }
        } else {
          for (let k = 0; k < 8; k++) { const ix = cx + 3 + (k % 4) * 12, iy = cy + 2 + Math.floor(k / 4) * 15; if (ix + 9 < cx + cw && iy + 14 < cy + ch) { icon(g, ix, iy, ['folder', 'doc', 'app', 'disk'][(k + w.id) % 4], ICON_INKS[(k + w.id) % 6]); txt(g, WORDS[(k * 3 + w.id) % WORDS.length].slice(0, 3), ix - 1, iy + 10, th.text); } }
        }
      }
      const closeBox = w => [w.x + w.w - 9, w.y + 3, 6, 5];
      const titleBar = w => [w.x, w.y, w.w - 10, 9];
      const tbBtn = k => [24 + k * 17, TB + 2, 16, 6];
      function click(px, py, t) {
        if (inRect(px, py, [1, TB + 1, 20, 7])) { menu = !menu; return; }
        if (menu) {
          const mi = Math.floor((TB - 2 - py) / 7);
          if (px < 40 && mi >= 0 && mi < APPS.length) { const ic = icons.find(o => o.app === APPS[mi]) || icons[0]; open(ic, t); }
          menu = false; return;
        }
        const list = wins.filter(o => o.state !== 'closing');
        for (let k = 0; k < list.length && k < 5; k++) if (inRect(px, py, tbBtn(k))) { const w = list[k]; if (w.min || w !== top()) { w.min = false; raise(w); } else w.min = true; return; }
        for (let i = wins.length - 1; i >= 0; i--) {
          const w = wins[i];
          if (w.min || w.state === 'closing') continue;
          if (inRect(px, py, closeBox(w))) { close(w, t); return; }
          if (inRect(px, py, [w.x, w.y, w.w, w.h])) { raise(w); return; }
        }
        for (const ic of icons) if (inRect(px, py, [ic.x, ic.y, 12, 12])) { open(ic, t); return; }
      }
      // the ghost: open something, move a window, raise one, close one
      function ghostNext(t) {
        const live = wins.filter(o => o.state !== 'closing' && !o.min), r = R();
        if (!live.length || (r < 0.35 && live.length < 4)) { const ic = R.pick(icons); return { kind: 'open', x: ic.x + 4, y: ic.y + 4, ic }; }
        const w = R.pick(live);
        if (r < 0.6) return { kind: 'drag', w, x: w.x + 6, y: w.y + 4, dx: R.int(18, n - w.w - 2) - w.x, dy: R.int(2, TB - w.h - 2) - w.y };
        if (r < 0.8 && live.length > 2) return { kind: 'close', w, x: w.x + w.w - 6, y: w.y + 5 };
        if (r < 0.9) return { kind: 'menu', x: 8, y: TB + 4 };
        return { kind: 'raise', w, x: w.x + w.w / 2, y: w.y + w.h / 2 };
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          for (const [x, y] of p.taps) {
            // a press on a title bar starts a drag, anything else is a click
            const hit = [...wins].reverse().find(w => !w.min && w.state !== 'closing' && inRect(x, y, [w.x, w.y, w.w, w.h]));
            if (hit && inRect(x, y, titleBar(hit)) && p.down) { raise(hit); drag = { w: hit, ox: x - hit.x, oy: y - hit.y }; }
            else click(x, y, t);
          }
          if (drag && p.down) { drag.w.x = U.clamp(Math.round(p.x - drag.ox), -drag.w.w + 12, n - 12); drag.w.y = U.clamp(Math.round(p.y - drag.oy), 0, TB - 9); }
          if (!p.down) drag = null;
          gh.x = p.x; gh.y = p.y; ghostPlan = null;
        } else {
          if (!ghostPlan && t > ghostT) { ghostPlan = ghostNext(t); ghostPlan.phase = 0; }
          if (ghostPlan) {
            const q = ghostPlan;
            if (q.phase === 0) { gh.to(q.x, q.y); if (gh.step(dt)) { q.phase = 1; q.wait = 0.25; } }
            else if (q.phase === 1) {
              q.wait -= dt;
              if (q.wait < 0) {
                if (q.kind === 'menu') { menu = true; q.kind = 'menuPick'; q.phase = 0; q.mi = R.int(0, APPS.length - 1); q.x = 14; q.y = TB - 5 - q.mi * 7; }
                else if (q.kind === 'drag') { raise(q.w); q.phase = 2; q.sx = q.w.x; q.sy = q.w.y; q.u = 0; }
                else {
                  if (q.kind === 'open') open(q.ic, t);
                  else if (q.kind === 'close') close(q.w, t);
                  else if (q.kind === 'menuPick') { menu = false; open(icons.find(o => o.app === APPS[q.mi]) || icons[0], t); }
                  else if (q.kind === 'raise') raise(q.w);
                  ghostPlan = null; ghostT = t + R.range(0.6, 1.8);
                }
              }
            } else {
              q.u = Math.min(1, q.u + dt / 1.4);
              const e = ease(q.u); q.w.x = Math.round(q.sx + q.dx * e); q.w.y = Math.round(q.sy + q.dy * e);
              gh.x = q.w.x + 6; gh.y = q.w.y + 4;
              if (q.u >= 1) { ghostPlan = null; ghostT = t + R.range(0.6, 1.6); }
            }
          }
        }
        d.set(bg);
        for (const ic of icons) { icon(g, ic.x + 1, ic.y, KIND[ic.app], ic.col); const lab = ic.name.slice(0, 4), lx = ic.x + 6 - Math.floor(tw(lab) / 2); X.rect(g, lx - 1, ic.y + 10, tw(lab) + 2, 6, th.desk); txt(g, lab, lx, ic.y + 10, WHITE); }
        wins = wins.filter(w => !(w.state === 'closing' && t - w.t0 > 0.35));
        const tp = top();
        for (const w of wins) {
          if (w.min) continue;
          const age = t - w.t0;
          if (w.state === 'opening' && age > 0.35) w.state = 'open';
          if (w.state !== 'open') {
            const u = w.state === 'opening' ? ease(age / 0.35) : 1 - ease(age / 0.35), sx = w.ic.x, sy = w.ic.y;
            const x = sx + (w.x - sx) * u, y = sy + (w.y - sy) * u, ww = 9 + (w.w - 9) * u, hh = 9 + (w.h - 9) * u;
            for (let k = 0; k < ww; k += 2) { X.put(g, x + k, y, th.dark); X.put(g, x + k, y + hh, th.dark); }
            for (let k = 0; k < hh; k += 2) { X.put(g, x, y + k, th.dark); X.put(g, x + ww, y + k, th.dark); }
            continue;
          }
          // drop shadow, then the window
          X.rect(g, w.x + 2, w.y + w.h, w.w, 1, X.shade(th.desk, 0.5)); X.rect(g, w.x + w.w, w.y + 2, 1, w.h - 1, X.shade(th.desk, 0.5));
          const [cx, cy, cw, ch] = frame(g, th, w.x, w.y, w.w, w.h, w.title, w === tp);
          content(w, cx, cy, cw, ch, t);
        }
        // taskbar, start button, window buttons, clock
        bevel(g, th, 0, TB, n, n - TB);
        bevel(g, th, 1, TB + 1, 20, 7, menu); txt(g, 'GO', 5, TB + 2, th.text); X.rect(g, 14, TB + 3, 3, 3, ICON_INKS[2]);
        wins.filter(o => o.state !== 'closing').slice(0, 5).forEach((w, k) => { const r = tbBtn(k); bevel(g, th, r[0], r[1] - 1, r[2], r[3] + 1, w === tp); X.rect(g, r[0] + 2, r[1] + 1, 3, 3, w.ic.col); txt(g, w.title.slice(0, 2), r[0] + 6, r[1], th.text); });
        const mins = Math.floor(t / 4) % 60, hrs = 9 + Math.floor(t / 240) % 12, clock = String(hrs).padStart(2, '0') + ':' + String(mins).padStart(2, '0');
        bevel(g, th, n - 22, TB + 1, 21, 7, true); txt(g, clock, n - 21 + 1, TB + 2, th.text);
        if (menu) {
          const mh = APPS.length * 7 + 3;
          bevel(g, th, 1, TB - mh, 40, mh);
          X.rect(g, 2, TB - mh + 1, 4, mh - 2, th.bar);
          APPS.forEach((a, k) => { const y = TB - 7 - k * 7; if (inRect(p.active ? p.x : gh.x, p.active ? p.y : gh.y, [6, y - 1, 34, 7])) X.rect(g, 6, y - 1, 34, 7, th.sel); txt(g, a, 8, y, th.text); });
        }
        cursor(g, gh.x, gh.y);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Paint', seed: 4, sizes: [100], fps: 12,
    interactive: 'Draw on the canvas; click a tool (pencil, brush, spray, line, box, oval, fill) or a colour.',
    recipe: 'A paint program draws a picture by itself, tool by tool: a sky flood-filled, a sun, hills, a house, sprayed grass, a scribbled signature; or an abstract of boxes and ovals. Then File, New. Take the mouse and it paints for you.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(50, 50);
      const PALS = [
        [BLACK, WHITE, rgb(128, 128, 128), rgb(192, 192, 192), rgb(128, 0, 0), rgb(255, 0, 0), rgb(128, 128, 0), rgb(255, 255, 0), rgb(0, 128, 0), rgb(0, 255, 0), rgb(0, 128, 128), rgb(0, 255, 255), rgb(0, 0, 128), rgb(0, 0, 255), rgb(128, 0, 128), rgb(255, 0, 255)],
        [rgb(20, 12, 28), WHITE, rgb(68, 36, 52), rgb(48, 52, 109), rgb(78, 74, 78), rgb(133, 76, 48), rgb(52, 101, 36), rgb(208, 70, 72), rgb(117, 113, 97), rgb(89, 125, 206), rgb(210, 125, 44), rgb(133, 149, 161), rgb(109, 170, 44), rgb(210, 170, 153), rgb(109, 194, 202), rgb(218, 212, 94)],
        Array.from({ length: 14 }, (_, i) => X.hsbPk(i / 14 * 100, 80, 95)).concat([BLACK, WHITE]),
        [rgb(26, 28, 44), rgb(244, 244, 244), rgb(93, 39, 93), rgb(177, 62, 83), rgb(239, 125, 87), rgb(255, 205, 117), rgb(167, 240, 112), rgb(56, 183, 100), rgb(37, 113, 121), rgb(41, 54, 111), rgb(59, 93, 201), rgb(65, 166, 246), rgb(115, 239, 247), rgb(148, 176, 194), rgb(86, 108, 134), rgb(51, 60, 87)],
      ];
      const palI = R.int(0, PALS.length - 1), pal = PALS[palI], TOOLS = ['pencil', 'brush', 'spray', 'line', 'rect', 'oval', 'fill', 'erase'];
      // layout: menu bar, toolbox on the left, canvas, palette below
      const CX = 13, CY = 9, CW = n - CX - 2, CH = n - CY - 15;
      const cvs = new Uint32Array(CW * CH);
      let tool = 'pencil', col = pal[0], bgCol = R.pick([WHITE, WHITE, pal[1]]);
      themeTraits(g, th); g.trait('Palette', ['Sixteen', 'Dusk', 'Rainbow', 'Sweetie'][palI]); g.trait('Canvas', bgCol === WHITE ? 'White' : 'Tinted');
      cvs.fill(bgCol);
      const cput = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < CW && y < CH) cvs[y * CW + x] = c; };
      const cline = (x0, y0, x1, y1, c, w = 1) => { const L = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= L; i++) { const x = x0 + (x1 - x0) * i / L, y = y0 + (y1 - y0) * i / L; if (w === 1) cput(x, y, c); else for (let a = 0; a < w; a++) for (let b = 0; b < w; b++) cput(x + a - (w >> 1), y + b - (w >> 1), c); } };
      const crect = (x0, y0, x1, y1, c, fill) => { const a = Math.min(x0, x1), b = Math.min(y0, y1), e = Math.max(x0, x1), f = Math.max(y0, y1); for (let y = b; y <= f; y++) for (let x = a; x <= e; x++) if (fill || y === b || y === f || x === a || x === e) cput(x, y, c); };
      const coval = (x0, y0, x1, y1, c, fill) => { const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = Math.abs(x1 - x0) / 2 + 0.5, ry = Math.abs(y1 - y0) / 2 + 0.5; for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const q = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (fill ? q <= 1 : q <= 1 && q > Math.pow(1 - 1.4 / Math.min(rx, ry), 2)) cput(x, y, c); } };
      function cfill(x, y, c) {
        x = Math.round(x); y = Math.round(y);
        if (x < 0 || y < 0 || x >= CW || y >= CH) return;
        const from = cvs[y * CW + x]; if (from === c) return;
        const st = [y * CW + x];
        while (st.length) { const i = st.pop(); if (cvs[i] !== from) continue; cvs[i] = c; const xx = i % CW; if (xx > 0) st.push(i - 1); if (xx < CW - 1) st.push(i + 1); if (i >= CW) st.push(i - CW); if (i < CW * (CH - 1)) st.push(i + CW); }
      }
      // the ghost's picture, as a list of strokes in canvas cells
      function plan() {
        const s = [], c = k => pal[k % pal.length], kind = R.pick(['landscape', 'abstract', 'pattern', 'face']);
        if (!g.traits.some(q => q[0] === 'First picture')) g.trait('First picture', cap(kind));
        const pick = () => pal[R.int(2, pal.length - 1)];
        if (kind === 'landscape') {
          const hor = R.int(CH * 0.45, CH * 0.65), sky = pick(), ground = pick(), sun = pick();
          s.push({ tool: 'line', col: c(0), pts: [[0, hor], [CW - 1, hor]] });
          s.push({ tool: 'fill', col: sky, pts: [[2, 2]] });
          s.push({ tool: 'fill', col: ground, pts: [[2, CH - 2]] });
          const sx = R.int(8, CW - 10), sy = R.int(5, hor - 10), sr = R.int(4, 7);
          s.push({ tool: 'oval', col: sun, fill: true, pts: [[sx - sr, sy - sr], [sx + sr, sy + sr]] });
          const hx = R.int(6, CW - 30), hw = R.int(14, 22), hh = R.int(9, 14), roof = pick();
          s.push({ tool: 'rect', col: pick(), fill: true, pts: [[hx, hor - hh + 3], [hx + hw, hor + 3]] });
          s.push({ tool: 'rect', col: c(0), pts: [[hx, hor - hh + 3], [hx + hw, hor + 3]] });
          s.push({ tool: 'line', col: roof, w: 2, pts: [[hx - 2, hor - hh + 3], [hx + hw / 2, hor - hh - 6], [hx + hw + 2, hor - hh + 3]] });
          s.push({ tool: 'rect', col: c(0), fill: true, pts: [[hx + 3, hor - 4], [hx + 7, hor + 3]] });
          s.push({ tool: 'rect', col: pick(), fill: true, pts: [[hx + hw - 8, hor - hh + 6], [hx + hw - 4, hor - hh + 10]] });
          s.push({ tool: 'spray', col: pick(), pts: Array.from({ length: 10 }, (_, i) => [i * CW / 9, hor + R.int(3, 8)]) });
          s.push({ tool: 'pencil', col: c(0), pts: Array.from({ length: 9 }, (_, i) => [CW - 22 + i * 2, CH - 5 - (i % 2) * 2 - Math.sin(i) * 1.5]) });
        } else if (kind === 'abstract') {
          s.push({ tool: 'fill', col: pick(), pts: [[1, 1]] });
          for (let k = 0; k < R.int(6, 10); k++) {
            const x = R.int(0, CW - 12), y = R.int(0, CH - 12), w = R.int(6, 26), h = R.int(6, 22), tl = R.pick(['rect', 'oval', 'rect', 'line']);
            s.push(tl === 'line' ? { tool: 'line', col: pick(), w: R.pick([1, 2, 3]), pts: [[x, y], [x + w, y + h]] } : { tool: tl, col: pick(), fill: R.bool(0.7), pts: [[x, y], [x + w, y + h]] });
          }
          s.push({ tool: 'brush', col: c(0), pts: Array.from({ length: 12 }, (_, i) => [5 + i * (CW - 10) / 11, CH / 2 + Math.sin(i * 1.3) * CH * 0.3]) });
        } else if (kind === 'pattern') {
          const a = pick(), b = pick(), st = R.int(6, 10);
          for (let y = 0; y < CH; y += st) for (let x = (y / st & 1) * st / 2; x < CW; x += st) s.push({ tool: R.bool(0.5) ? 'oval' : 'rect', col: (x + y) % 3 ? a : b, fill: true, pts: [[x, y], [x + st - 3, y + st - 3]] });
        } else {
          const cx = CW / 2, cy = CH / 2, r = Math.min(CW, CH) * 0.4, skin = pick(), eye = pal[0];
          s.push({ tool: 'fill', col: pick(), pts: [[1, 1]] });
          s.push({ tool: 'oval', col: skin, fill: true, pts: [[cx - r, cy - r], [cx + r, cy + r]] });
          s.push({ tool: 'oval', col: eye, fill: true, pts: [[cx - r * 0.5, cy - r * 0.35], [cx - r * 0.2, cy - r * 0.05]] });
          s.push({ tool: 'oval', col: eye, fill: true, pts: [[cx + r * 0.2, cy - r * 0.35], [cx + r * 0.5, cy - r * 0.05]] });
          s.push({ tool: 'brush', col: eye, pts: Array.from({ length: 7 }, (_, i) => [cx - r * 0.5 + i * r / 6, cy + r * 0.3 + Math.sin(i / 6 * Math.PI) * r * 0.25]) });
          s.push({ tool: 'spray', col: pick(), pts: [[cx - r * 0.7, cy + r * 0.1], [cx + r * 0.7, cy + r * 0.1]] });
        }
        return s.map(q => ({ ...q, pts: q.pts.map(([x, y]) => [Math.round(U.clamp(x, 0, CW - 1)), Math.round(U.clamp(y, 0, CH - 1))]) }));
      }
      let strokes = plan(), si = 0, sp = 0, sprog = 0, hold = 0, uDrag = null;
      const toolBtn = k => [1 + (k % 2) * 6, CY + Math.floor(k / 2) * 7, 6, 7];
      const palBtn = k => [CX + 14 + (k % 8) * 6, n - 13 + Math.floor(k / 8) * 6, 6, 6];
      function apply(tl, c, a, b, fill, w) {
        if (tl === 'pencil') cline(a[0], a[1], b[0], b[1], c);
        else if (tl === 'brush') cline(a[0], a[1], b[0], b[1], c, w || 2);
        else if (tl === 'erase') cline(a[0], a[1], b[0], b[1], bgCol, 3);
        else if (tl === 'spray') for (let k = 0; k < 6; k++) { const r = R() * 3.5, an = R() * TAU; cput(b[0] + Math.cos(an) * r, b[1] + Math.sin(an) * r, c); }
      }
      const drawToolIcon = (k, x, y, on) => {
        bevel(g, th, x, y, 6, 7, on);
        const c = th.text, tl = TOOLS[k];
        if (tl === 'pencil') { X.put(g, x + 4, y + 1, c); X.put(g, x + 3, y + 2, c); X.put(g, x + 2, y + 3, c); X.put(g, x + 1, y + 4, rgb(220, 160, 60)); }
        else if (tl === 'brush') { X.rect(g, x + 3, y + 1, 1, 3, rgb(150, 100, 50)); X.rect(g, x + 2, y + 4, 2, 2, c); }
        else if (tl === 'spray') { X.rect(g, x + 2, y + 3, 2, 3, c); for (const [a, b] of [[1, 1], [3, 1], [4, 2], [1, 2]]) X.put(g, x + a, y + b, c); }
        else if (tl === 'line') { X.put(g, x + 1, y + 5, c); X.put(g, x + 2, y + 4, c); X.put(g, x + 3, y + 3, c); X.put(g, x + 4, y + 2, c); }
        else if (tl === 'rect') { X.rect(g, x + 1, y + 2, 4, 1, c); X.rect(g, x + 1, y + 5, 4, 1, c); X.rect(g, x + 1, y + 2, 1, 4, c); X.rect(g, x + 4, y + 2, 1, 4, c); }
        else if (tl === 'oval') { X.rect(g, x + 2, y + 2, 2, 1, c); X.rect(g, x + 2, y + 5, 2, 1, c); X.rect(g, x + 1, y + 3, 1, 2, c); X.rect(g, x + 4, y + 3, 1, 2, c); }
        else if (tl === 'fill') { X.rect(g, x + 1, y + 2, 3, 3, c); X.put(g, x + 4, y + 4, rgb(60, 120, 255)); X.put(g, x + 4, y + 5, rgb(60, 120, 255)); }
        else { X.rect(g, x + 1, y + 2, 4, 3, rgb(255, 160, 190)); X.rect(g, x + 1, y + 5, 4, 1, c); }
      };
      return (t, dt) => {
        const p = ptr(dt, n), toCan = (x, y) => [Math.floor(x - CX), Math.floor(y - CY)];
        if (p.active) {
          for (const [x, y] of p.taps) {
            for (let k = 0; k < TOOLS.length; k++) if (inRect(x, y, toolBtn(k))) tool = TOOLS[k];
            for (let k = 0; k < pal.length; k++) if (inRect(x, y, palBtn(k))) col = pal[k];
            if (inRect(x, y, [CX, CY, CW, CH])) {
              const a = toCan(x, y);
              if (tool === 'fill') cfill(a[0], a[1], col);
              else uDrag = { a, last: a, snap: cvs.slice() };
              if (tool === 'pencil' || tool === 'brush' || tool === 'erase') apply(tool, col, a, a);
            }
            if (inRect(x, y, [2, 1, 14, 6])) { cvs.fill(bgCol); }   // FILE: new
          }
          if (uDrag && p.down) {
            const b = toCan(p.x, p.y);
            if (tool === 'line' || tool === 'rect' || tool === 'oval') { cvs.set(uDrag.snap); if (tool === 'line') cline(uDrag.a[0], uDrag.a[1], b[0], b[1], col); else if (tool === 'rect') crect(uDrag.a[0], uDrag.a[1], b[0], b[1], col, false); else coval(uDrag.a[0], uDrag.a[1], b[0], b[1], col, false); }
            else apply(tool, col, uDrag.last, b);
            uDrag.last = b;
          }
          if (!p.down) uDrag = null;
          gh.x = p.x; gh.y = p.y;
        } else if (hold > 0) {
          hold -= dt;
          if (hold <= 0) { cvs.fill(bgCol = R.pick([WHITE, WHITE, pal[1], pal[0]])); strokes = plan(); si = 0; sp = 0; sprog = 0; }
          gh.to(8, 3); gh.step(dt);
        } else {
          const q = strokes[si];
          if (!q) { hold = 3; }
          else if (sp === 0) {
            // walk to the toolbox, then the palette, then the first point
            const k = TOOLS.indexOf(q.tool), tb = toolBtn(k), pk = pal.indexOf(q.col), pb = palBtn(pk < 0 ? 0 : pk);
            if (sprog === 0) { gh.to(tb[0] + 3, tb[1] + 3); if (gh.step(dt, 110)) { tool = q.tool; sprog = 1; } }
            else if (sprog === 1) { gh.to(pb[0] + 3, pb[1] + 3); if (gh.step(dt, 110)) { col = q.col; sprog = 2; } }
            else { gh.to(q.pts[0][0] + CX, q.pts[0][1] + CY); if (gh.step(dt, 110)) { sp = 1; sprog = 0; if (q.tool === 'fill') { cfill(q.pts[0][0], q.pts[0][1], q.col); si++; sp = 0; } else { q.snap = cvs.slice(); q.last = q.pts[0]; } } }
          } else {
            // drag along the stroke's points
            const target = q.pts[Math.min(sp, q.pts.length - 1)], tgt = [target[0] + CX, target[1] + CY];
            gh.to(tgt[0], tgt[1]);
            const arrived = gh.step(dt, q.tool === 'spray' ? 30 : 55), cur = [Math.round(gh.x - CX), Math.round(gh.y - CY)];
            if (q.tool === 'rect' || q.tool === 'oval' || q.tool === 'line' && q.pts.length === 2) {
              cvs.set(q.snap);
              const a = q.pts[0];
              if (q.tool === 'rect') crect(a[0], a[1], cur[0], cur[1], q.col, q.fill); else if (q.tool === 'oval') coval(a[0], a[1], cur[0], cur[1], q.col, q.fill); else cline(a[0], a[1], cur[0], cur[1], q.col, q.w || 1);
            } else if (q.tool === 'line') cline(q.last[0], q.last[1], cur[0], cur[1], q.col, q.w || 1);
            else apply(q.tool, q.col, q.last, cur, false, q.w);
            q.last = cur;
            if (arrived) { sp++; if (sp >= q.pts.length || (q.tool === 'rect' || q.tool === 'oval') && sp >= 2) { si++; sp = 0; } }
          }
        }
        // chrome
        d.fill(th.face);
        X.rect(g, 0, 0, n, 7, th.face); X.rect(g, 0, 7, n, 1, th.shadow);
        txt(g, 'FILE', 2, 1, th.text); txt(g, 'EDIT', 20, 1, th.text); txt(g, 'VIEW', 38, 1, th.text); txt(g, 'PAINT', n - 22, 1, th.bar);
        for (let k = 0; k < TOOLS.length; k++) { const r = toolBtn(k); drawToolIcon(k, r[0], r[1], TOOLS[k] === tool); }
        bevel(g, th, CX - 1, CY - 1, CW + 2, CH + 2, true);
        for (let y = 0; y < CH; y++) d.set(cvs.subarray(y * CW, y * CW + CW), (CY + y) * n + CX);
        // palette with the current colour well
        bevel(g, th, CX, n - 13, 12, 12, true); X.rect(g, CX + 2, n - 11, 8, 8, col);
        for (let k = 0; k < pal.length; k++) { const r = palBtn(k); X.rect(g, r[0], r[1], 6, 6, th.dark); X.rect(g, r[0] + 1, r[1] + 1, 5, 5, pal[k]); }
        if (gh.x >= CX && gh.x < CX + CW && gh.y >= CY && gh.y < CY + CH && (tool === 'pencil' || tool === 'brush' || tool === 'spray')) {
          // a crosshair over the canvas
          const x = Math.round(gh.x), y = Math.round(gh.y);
          for (const [a, b] of [[-2, 0], [-1, 0], [1, 0], [2, 0], [0, -2], [0, -1], [0, 1], [0, 2]]) X.put(g, x + a, y + b, X.lum(d[y * n + x] || 0) > 0.5 ? BLACK : WHITE);
        } else cursor(g, gh.x, gh.y);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Setup', seed: 2, sizes: [100], fps: 12,
    interactive: 'Click Next (or Back), tick the boxes, agree to the licence; at the end, restart.',
    recipe: 'An installer runs, page by page: welcome, a licence that scrolls, a folder, components to tick, then the long copy with file names flickering and a billboard turning, and finally a restart into a text-mode boot screen. Some seeds install the old blue text-mode way.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(70, 70);
      const textMode = R.bool(0.3), product = word(R) + ' ' + R.pick(['OS', '95', 'PRO', 'STUDIO', '3.1', 'XP', 'DELUXE']);
      const grads = [[rgb(0, 0, 60), rgb(0, 40, 170)], [rgb(30, 0, 40), rgb(140, 20, 120)], [rgb(0, 30, 30), rgb(0, 130, 120)], [rgb(30, 10, 0), rgb(180, 70, 0)], [rgb(0, 20, 0), rgb(20, 120, 50)]];
      const gradI = R.int(0, grads.length - 1), [g0, g1] = grads[gradI], bg = new Uint32Array(n * n);
      themeTraits(g, th); g.trait('Product', product); g.trait('Mode', textMode ? 'Text' : 'Windowed'); g.trait('Backdrop', ['Navy', 'Plum', 'Teal', 'Rust', 'Forest'][gradI]);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = textMode ? rgb(0, 0, 170) : y / n > X.dith4(x, y) * 0.95 ? g0 : g1;
      const PAGES = ['welcome', 'license', 'folder', 'parts', 'copy', 'done', 'boot'];
      const files = Array.from({ length: 40 }, () => word(R) + '.' + R.pick(['EXE', 'DLL', 'INI', 'SYS', 'HLP', 'DAT', 'FON', 'BMP']));
      const parts = WORDS.slice().sort(() => R() - 0.5).slice(0, 4).map(w => ({ w, on: R.bool(0.7) }));
      const license = Array.from({ length: 30 }, (_, i) => i % 6 === 5 ? '' : Array.from({ length: R.int(2, 4) }, () => word(R)).join(' '));
      let page = 0, pt = 0, prog = 0, agree = false, scroll = 0, gwait = 1.5;
      const DX = 12, DY = 24, DW = 78, DH = 58;
      const nextBtn = [DX + DW - 30, DY + DH - 11, 27, 8], backBtn = [DX + DW - 59, DY + DH - 11, 27, 8];
      const go = by => { page = (page + by + PAGES.length) % PAGES.length; pt = 0; if (PAGES[page] === 'copy') prog = 0; if (page === 0) { agree = false; scroll = 0; } };
      function clickAt(x, y) {
        const pg = PAGES[page];
        if (pg === 'boot') return;
        if (inRect(x, y, nextBtn)) { if (pg === 'license' && !agree) return; if (pg !== 'copy') go(1); return; }
        if (inRect(x, y, backBtn) && page > 0 && pg !== 'copy') { go(-1); return; }
        if (pg === 'license' && inRect(x, y, [DX + 3, DY + DH - 20, 40, 6])) agree = !agree;
        if (pg === 'license' && inRect(x, y, [DX + 3, DY + 11, DW - 6, 22])) scroll += 3;
        if (pg === 'parts') parts.forEach((q, k) => { if (inRect(x, y, [DX + 4, DY + 18 + k * 7, 40, 6])) q.on = !q.on; });
      }
      function button(r, label, on = true) {
        if (textMode) { X.rect(g, r[0], r[1], r[2], r[3], on ? rgb(0, 170, 170) : rgb(110, 110, 110)); txt(g, label, r[0] + Math.floor((r[2] - tw(label)) / 2), r[1] + 2, BLACK); return; }
        bevel(g, th, r[0], r[1], r[2], r[3]); txt(g, label, r[0] + Math.floor((r[2] - tw(label)) / 2), r[1] + 2, on ? th.text : th.shadow);
      }
      function checkbox(x, y, on, label, tc) {
        if (textMode) txt(g, (on ? '[X] ' : '[ ] ') + label, x, y, tc);
        else { bevel(g, th, x, y, 6, 6, true, WHITE); if (on) { X.put(g, x + 1, y + 3, BLACK); X.put(g, x + 2, y + 4, BLACK); X.put(g, x + 3, y + 3, BLACK); X.put(g, x + 4, y + 2, BLACK); } txt(g, label, x + 8, y + 1, tc); }
      }
      return (t, dt) => {
        const p = ptr(dt, n), pg = PAGES[page];
        pt += dt;
        if (p.active) { for (const [x, y] of p.taps) clickAt(x, y); gh.x = p.x; gh.y = p.y; }
        else if (pg !== 'copy' && pg !== 'boot') {
          // the ghost reads for a moment, ticks what needs ticking, then presses Next
          let tgt = nextBtn;
          if (pg === 'license' && !agree) tgt = [DX + 3, DY + DH - 20, 6, 6];
          gh.to(tgt[0] + 4, tgt[1] + 3);
          gwait -= dt;
          if (gh.step(dt, 60) && gwait <= 0) { clickAt(tgt[0] + 2, tgt[1] + 2); gwait = R.range(1, 2.4); }
        }
        if (pg === 'copy') { prog = Math.min(1, prog + dt / R.range(9, 13) * (p.active && p.down ? 4 : 1)); if (prog >= 1) go(1); }
        if (pg === 'boot' && pt > 6) go(1);
        if (pg === 'license' && !p.active) scroll += dt * 4;
        // background
        if (pg === 'boot') {
          d.fill(BLACK);
          const lines = ['SYNAE BIOS V' + (1 + (t | 0) % 9) + '.0', 'MEMORY TEST: ' + Math.min(640, Math.floor(pt * 400)) + 'K OK', pt > 1.6 ? 'DETECTING DRIVES... OK' : '', pt > 2.6 ? 'STARTING ' + product + '...' : '', pt > 3.5 ? '' : ''];
          lines.forEach((s, k) => s && txt(g, s, 2, 2 + k * 7, rgb(190, 190, 190)));
          if (pt > 3.6) { const w = Math.floor((pt - 3.6) / 2 * 60); X.rect(g, 20, 70, 60, 4, rgb(60, 60, 60)); X.rect(g, 20, 70, Math.min(60, w), 4, rgb(0, 170, 255)); }
          if ((t * 3 | 0) & 1) X.rect(g, 2, 2 + lines.filter(Boolean).length * 7, 3, 5, rgb(190, 190, 190));
          return;
        }
        d.set(bg);
        if (textMode) {
          X.rect(g, 0, 0, n, 8, rgb(170, 170, 170)); txt(g, product + ' SETUP', 2, 2, BLACK);
          X.rect(g, 0, n - 8, n, 8, rgb(170, 170, 170)); txt(g, 'ENTER=NEXT  F3=EXIT', 2, n - 6, BLACK);
          X.rect(g, DX + 2, DY + 2, DW, DH, BLACK);
          X.rect(g, DX, DY, DW, DH, rgb(170, 170, 170));
          X.rect(g, DX + 1, DY + 1, DW - 2, 1, WHITE); X.rect(g, DX + 1, DY + DH - 2, DW - 2, 1, WHITE); X.rect(g, DX + 1, DY + 1, 1, DH - 2, WHITE); X.rect(g, DX + DW - 2, DY + 1, 1, DH - 2, WHITE);
        } else {
          // the big product name with a drop shadow, then the dialog
          const title = product;
          txt(g, title, 5, 7, BLACK); txt(g, title, 4, 6, WHITE);
          for (let k = 0; k < 3; k++) X.rect(g, 4 + tw(title) + 3 + k * 5, 7, 3, 3, ICON_INKS[k]);
          frame(g, th, DX, DY, DW, DH, 'SETUP', true, { close: false });
        }
        const tc = textMode ? BLACK : th.text, cx = DX + 4, cy = DY + 12;
        if (pg === 'welcome') {
          txt(g, 'WELCOME TO', cx, cy, tc); txt(g, product, cx, cy + 7, textMode ? rgb(0, 0, 170) : th.bar);
          txt(g, 'THIS WILL INSTALL', cx, cy + 16, tc); txt(g, 'IT ON YOUR MACHINE.', cx, cy + 22, tc);
          if (!textMode) icon(g, DX + DW - 14, cy, 'disk', ICON_INKS[2]);
        } else if (pg === 'license') {
          const box = [DX + 3, DY + 11, DW - 6, 22];
          if (textMode) X.rect(g, box[0], box[1], box[2], box[3], rgb(0, 0, 170)); else bevel(g, th, box[0], box[1], box[2], box[3], true, WHITE);
          const s0 = Math.floor(scroll / 6) * 6 % (license.length * 6);
          for (let k = 0; k < 3; k++) { const li = Math.floor(s0 / 6 + k) % license.length; txt(g, license[li], box[0] + 2, box[1] + 2 + k * 7, textMode ? WHITE : th.text, box[2] - 5); }
          X.rect(g, box[0] + box[2] - 2, box[1] + 1 + (s0 / (license.length * 6)) * (box[3] - 4), 1, 3, textMode ? WHITE : th.shadow);
          checkbox(DX + 3, DY + DH - 20, agree, 'I AGREE', tc);
        } else if (pg === 'folder') {
          txt(g, 'INSTALL TO:', cx, cy, tc);
          if (textMode) X.rect(g, cx, cy + 7, DW - 9, 7, rgb(0, 0, 170)); else bevel(g, th, cx, cy + 7, DW - 9, 8, true, WHITE);
          txt(g, 'C:\\' + product.split(' ')[0], cx + 2, cy + 9, textMode ? WHITE : th.text);
          txt(g, 'SPACE: ' + (40 + (product.length * 7) % 50) + ' MB', cx, cy + 19, tc);
        } else if (pg === 'parts') {
          txt(g, 'CHOOSE PARTS:', cx, cy, tc);
          parts.forEach((q, k) => checkbox(DX + 4, DY + 18 + k * 7, q.on, q.w, tc));
        } else if (pg === 'copy') {
          txt(g, 'COPYING FILES...', cx, cy, tc);
          const f = files[Math.floor(prog * 400) % files.length];
          txt(g, f, cx, cy + 7, textMode ? rgb(0, 0, 120) : th.shadow, DW - 8);
          const bx = cx, by = cy + 15, bw = DW - 8;
          if (textMode) { X.rect(g, bx, by, bw, 6, rgb(0, 0, 170)); X.rect(g, bx, by, Math.round(bw * prog), 6, rgb(255, 255, 85)); }
          else { bevel(g, th, bx, by, bw, 7, true, WHITE); const segs = Math.floor((bw - 2) * prog / 4); for (let k = 0; k < segs; k++) X.rect(g, bx + 2 + k * 4, by + 2, 3, 3, th.bar); }
          txt(g, Math.floor(prog * 100) + '%', cx, cy + 25, tc);
          // a billboard: a turning hue disc in its own frame
          if (!textMode) {
            const ox = DX + DW - 13, oy = cy + 28, r = 6;
            for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const q = Math.hypot(x, y); if (q <= r) X.put(g, ox + x, oy + y, X.hsbPk(((Math.atan2(y, x) / TAU + t * 0.3) * 100 + q * 6), 85, 95)); }
          }
        } else if (pg === 'done') {
          txt(g, 'SETUP IS COMPLETE.', cx, cy, tc);
          txt(g, 'RESTART NOW TO', cx, cy + 9, tc); txt(g, 'START ' + product.split(' ')[0] + '.', cx, cy + 15, tc);
        }
        if (pg !== 'copy') { button(nextBtn, pg === 'done' ? 'RESTART' : 'NEXT >', pg !== 'license' || agree); if (page > 0) button(backBtn, '< BACK'); }
        cursor(g, gh.x, gh.y, pg === 'copy' ? WAIT : ARROW);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Explorer', seed: 2, sizes: [100], fps: 12,
    interactive: 'Click folders in the tree to open or close them; click a folder or file on the right to open or select it.',
    recipe: 'A file manager browsing itself: a tree of folders named after the collection opens and closes along its dotted branches, the right pane shows each folder as big icons, a list or details with sizes, and the status bar counts what is there.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(50, 50), view = R.pick(['icons', 'list', 'details']);
      themeTraits(g, th); g.trait('View', cap(view));
      let id = 0;
      const mk = (name, depth) => {
        const node = { id: id++, name, depth, open: depth === 0, kids: [], files: Array.from({ length: R.int(2, 9) }, () => ({ name: word(R).slice(0, 6) + '.' + R.pick(['TXT', 'EXE', 'BMP', 'WAV', 'INI']), size: R.int(1, 900), col: R.pick(ICON_INKS) })) };
        if (depth < 3) for (let k = 0; k < R.int(depth ? 0 : 3, depth === 0 ? 5 : 3); k++) node.kids.push(mk(word(R), depth + 1));
        return node;
      };
      const root = mk('C:', 0);
      { let f = 0, k = 0; const walk = q => { k++; f += q.files.length; q.kids.forEach(walk); }; walk(root); g.trait('Folders', k); g.trait('Files', f); }
      let cur = root, sel = -1, ghostT = 1;
      const visible = () => { const out = []; const walk = q => { out.push(q); if (q.open) q.kids.forEach(walk); }; walk(root); return out; };
      const WX = 2, WY = 2, WW = n - 4, WH = n - 4, TREEW = 38;
      const path = q => { const p = []; const find = (o, trail) => { if (o === q) { p.push(...trail, o.name); return true; } return o.kids.some(k => find(k, [...trail, o.name])); }; find(root, []); return p.join('\\'); };
      function treeRow(i) { return [WX + 4, WY + 12 + i * 7, TREEW - 5, 7]; }
      const itemRect = (k, cw) => view === 'icons' ? [WX + TREEW + 3 + (k % Math.max(1, Math.floor((cw) / 15))) * 15, WY + 13 + Math.floor(k / Math.max(1, Math.floor(cw / 15))) * 16, 14, 15] : [WX + TREEW + 3, WY + 13 + k * 7, cw - 2, 7];
      return (t, dt) => {
        const p = ptr(dt, n), rows = visible(), items = [...cur.kids.map(k => ({ folder: k, name: k.name })), ...cur.files], cw = WW - TREEW - 6;
        const clickTree = (i) => { const q = rows[i]; if (!q) return; if (q.kids.length && cur === q) q.open = !q.open; else if (q.kids.length) q.open = true; cur = q; sel = -1; };
        const clickItem = k => { const it = items[k]; if (!it) return; if (it.folder && sel === k) { it.folder.open = true; cur.open = true; cur = it.folder; sel = -1; } else sel = k; };
        if (p.active) {
          for (const [x, y] of p.taps) {
            for (let i = 0; i < rows.length; i++) if (inRect(x, y, treeRow(i))) clickTree(i);
            for (let k = 0; k < items.length; k++) if (inRect(x, y, itemRect(k, cw))) clickItem(k);
          }
          gh.x = p.x; gh.y = p.y;
        } else if (t > ghostT) {
          if (!gh.plan) {
            if (R.bool(0.45) || !items.length) { const i = R.int(0, rows.length - 1), r = treeRow(i); gh.plan = { kind: 'tree', i, x: r[0] + 6, y: r[1] + 3 }; }
            else { const k = R.int(0, Math.min(items.length, 12) - 1), r = itemRect(k, cw); gh.plan = { kind: 'item', k, x: r[0] + 5, y: r[1] + 4, twice: !!items[k].folder && R.bool(0.6) }; }
          }
          gh.to(gh.plan.x, gh.plan.y);
          if (gh.step(dt, 70)) {
            if (gh.plan.kind === 'tree') clickTree(gh.plan.i); else { clickItem(gh.plan.k); if (gh.plan.twice) clickItem(gh.plan.k); }
            gh.plan = null; ghostT = t + R.range(0.8, 1.8);
          }
        }
        d.fill(th.desk);
        const [cx, cy, cw2, ch] = frame(g, th, WX, WY, WW, WH, 'EXPLORING - ' + path(cur), true);
        // tree pane
        bevel(g, th, WX + 2, WY + 10, TREEW, WH - 19, true, th.win);
        rows.forEach((q, i) => {
          const r = treeRow(i);
          if (r[1] + 6 > WY + WH - 10) return;
          const x = r[0] + q.depth * 4;
          if (q.depth) { for (let k = r[1] - 3; k < r[1] + 3; k += 2) X.put(g, x - 2, k, th.shadow); X.put(g, x - 1, r[1] + 3, th.shadow); }
          if (q.kids.length) { X.rect(g, x - 3, r[1] + 1, 3, 3, th.win); X.put(g, x - 2, r[1] + 2, th.text); }
          icon(g, x, r[1] - 1, 'folder', q === cur ? ICON_INKS[0] : X.shade(ICON_INKS[0], 0.85));
          if (q === cur) X.rect(g, x + 10, r[1], tw(q.name.slice(0, 5)) + 2, 6, th.sel);
          txt(g, q.name.slice(0, 5), x + 11, r[1] + 1, q === cur ? th.selText : th.text, TREEW - (x - WX) - 12);
        });
        // contents pane
        bevel(g, th, WX + TREEW + 2, WY + 10, cw, WH - 19, true, th.win);
        items.forEach((it, k) => {
          const r = itemRect(k, cw);
          if (r[1] + r[3] > WY + WH - 10) return;
          const on = k === sel, kind = it.folder ? 'folder' : it.name.endsWith('EXE') ? 'app' : it.name.endsWith('BMP') ? 'screen' : 'doc';
          if (view === 'icons') {
            icon(g, r[0] + 2, r[1], kind, it.folder ? ICON_INKS[0] : it.col, on);
            const lab = it.name.slice(0, 3); if (on) X.rect(g, r[0], r[1] + 10, 14, 6, th.sel); txt(g, lab, r[0] + 7 - Math.floor(tw(lab) / 2), r[1] + 10, on ? th.selText : th.text);
          } else {
            if (on) X.rect(g, r[0], r[1], r[2], 7, th.sel);
            X.rect(g, r[0] + 1, r[1] + 1, 5, 5, it.folder ? ICON_INKS[0] : it.col);
            // details: the size sits right-aligned and the name stops a clear cell before it
            const sz = view === 'details' && !it.folder ? it.size + 'K' : '', room = r[2] - 9 - (sz ? tw(sz) + 4 : 1);
            let nm = it.name.slice(0, view === 'details' ? 8 : 12);
            if (tw(nm) > room) nm = nm.split('.')[0];
            txt(g, nm, r[0] + 8, r[1] + 1, on ? th.selText : th.text, room);
            if (sz) txt(g, sz, r[0] + r[2] - tw(sz) - 2, r[1] + 1, on ? th.selText : th.shadow);
          }
        });
        // status bar
        bevel(g, th, WX + 2, WY + WH - 9, WW - 4, 7, true);
        txt(g, items.length + ' OBJECTS' + (sel >= 0 && items[sel] ? '  ' + (items[sel].size || 0) + 'K' : ''), WX + 4, WY + WH - 8, th.text);
        cursor(g, gh.x, gh.y);
      };
    },
  });

  // ======================================================================
  // Lasso: the original, exactly as first shared (always on the opening variation, and at least half the rolls)
  function ogLasso(R, U, g) {
      const { n, d } = g, desk = desktopCol(R), inks = X.inks(R, 6, 0.5);
      g.trait('Style', 'Classic'); g.trait('Desktop', ['Teal', 'Petrol', 'Steel', 'Plum', 'Pine', 'Wine'][[rgb(0, 128, 128), rgb(0, 96, 128), rgb(58, 110, 165), rgb(80, 60, 120), rgb(30, 90, 60), rgb(120, 50, 70)].indexOf(desk)]);
      const icons = Array.from({ length: g.trait('Icons', R.int(14, 20)) }, () => ({ x: R.int(2, n - 14), y: R.int(2, n - 16), kind: R.pick(KINDS), col: inks[R.int(0, inks.length - 1)], sel: false }));
      const trail = [];
      let job = null, mx = n / 2, my = n / 2;
      function plan(t) {
        const a = [R.int(0, n - 30), R.int(0, n - 30)], b = [a[0] + R.int(20, 45), a[1] + R.int(20, 45)];
        job = { t0: t, a, b, to: [R.int(0, n - 30), R.int(0, n - 30)] };
        icons.forEach(ic => { ic.sel = false; ic.ox = ic.x; ic.oy = ic.y; });
      }
      plan(0);
      const ptr = pointer(g);
      let user = null;
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          // the viewer's turn: the ghost's schedule waits
          job.t0 += dt;
          for (const [x, y] of p.taps) {
            const hit = icons.find(ic => x >= ic.x && x < ic.x + 10 && y >= ic.y && y < ic.y + 10);
            if (hit) { if (!hit.sel) icons.forEach(ic => ic.sel = ic === hit); user = { move: true, lx: x, ly: y }; }
            else { icons.forEach(ic => ic.sel = false); user = { move: false, a: [x, y] }; }
          }
          if (user && p.down) {
            if (user.move) { const dx = p.x - user.lx, dy = p.y - user.ly; icons.forEach(ic => { if (ic.sel) { ic.x = Math.round(U.clamp(ic.x + dx, 0, n - 10)); ic.y = Math.round(U.clamp(ic.y + dy, 0, n - 12)); } }); user.lx = p.x; user.ly = p.y; }
            else { const [ax2, ay2] = user.a; icons.forEach(ic => { ic.sel = ic.x + 9 > Math.min(ax2, p.x) && ic.x < Math.max(ax2, p.x) && ic.y + 9 > Math.min(ay2, p.y) && ic.y < Math.max(ay2, p.y); }); }
          } else if (!p.down) { if (user && user.move) icons.forEach(ic => { ic.ox = ic.x; ic.oy = ic.y; }); user = null; }
          mx = p.x; my = p.y;
        }
        const tt = t - job.t0, [ax, ay] = job.a, [bx, by] = job.b;
        let tx, ty, band = null;
        if (p.active) { tx = mx; ty = my; if (user && !user.move && p.down) band = [Math.round(user.a[0]), Math.round(user.a[1]), Math.round(p.x), Math.round(p.y)]; }
        else if (tt < 1) { tx = ax; ty = ay; }
        else if (tt < 2.6) { const u = ease((tt - 1) / 1.6); tx = ax + (bx - ax) * u; ty = ay + (by - ay) * u; band = [ax, ay, tx, ty]; icons.forEach(ic => { ic.sel = ic.x + 9 > Math.min(ax, tx) && ic.x < Math.max(ax, tx) && ic.y + 9 > Math.min(ay, ty) && ic.y < Math.max(ay, ty); }); }
        else if (tt < 3.2) { const sel = icons.find(ic => ic.sel); tx = sel ? sel.x + 4 : bx; ty = sel ? sel.y + 4 : by; }
        else if (tt < 5.4) { const u = ease((tt - 3.2) / 2.2), grab = icons.find(ic => ic.sel); const gx = grab ? grab.ox + 4 : bx, gy = grab ? grab.oy + 4 : by; tx = gx + (job.to[0] - gx + 10) * u; ty = gy + (job.to[1] - gy + 10) * u; icons.forEach(ic => { if (ic.sel) { ic.x = Math.round(U.clamp(ic.ox + (tx - gx), 0, n - 10)); ic.y = Math.round(U.clamp(ic.oy + (ty - gy), 0, n - 12)); } }); }
        else { tx = mx; ty = my; if (tt > 6.5) plan(t); }
        mx += (tx - mx) * Math.min(1, dt * 10); my += (ty - my) * Math.min(1, dt * 10);
        trail.push([mx, my]); if (trail.length > 7) trail.shift();
        d.fill(desk);
        for (const ic of icons) { if (ic.sel) X.rect(g, ic.x - 1, ic.y - 1, 12, 11, NAVY); ogIcon(g, ic.x + 1, ic.y, ic.kind, ic.sel ? X.mixPk(ic.col, NAVY, 0.4) : ic.col); }
        if (band) { const [x0, y0, x1, y1] = band, lo = Math.min(x0, x1), hi = Math.max(x0, x1), lo2 = Math.min(y0, y1), hi2 = Math.max(y0, y1), m = Math.floor(t * 8);
          for (let x = lo; x <= hi; x++) { const c = (x + m) % 4 < 2 ? BLACK : WHITE; X.put(g, x, lo2, c); X.put(g, x, hi2, c); }
          for (let y = lo2; y <= hi2; y++) { const c = (y + m) % 4 < 2 ? BLACK : WHITE; X.put(g, lo, y, c); X.put(g, hi, y, c); } }
        trail.forEach(([x, y], k) => { if (k < trail.length - 1 && k % 2 === 0) X.stamp(g, OG_ARROW, Math.round(x), Math.round(y), [0, X.shade(desk, 0.5), X.mixPk(desk, WHITE, 0.4)]); });
        ogCursor(g, mx, my);
      };
  }
  // Lasso: the rework, chosen on the other rolls
  function reLasso(R, U, g) {
      const { n, d } = g, th = theme(R), bg = wallpaper(R, n, th), ptr = pointer(g), gh = ghost(50, 50);
      g.trait('Style', 'Themed'); themeTraits(g, th, bg);
      const kinds = ['folder', 'doc', 'app', 'disk', 'screen', 'paint', 'term', 'clock', 'chat'];
      // icons on a loose grid of slots, some left empty, each nudged a little
      const slots = []; for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) if (!(i === 5 && j === 4)) slots.push([4 + i * 16, 3 + j * 18]);
      const N = g.trait('Icons', R.int(10, 18)), jit = R.bool(0.5) ? 0 : 2, icons = R.shuffle(slots).slice(0, N).map(([x, y]) => ({ x: x + R.int(-jit, jit), y: y + R.int(0, jit), kind: R.pick(kinds), col: R.pick(ICON_INKS), name: word(R).slice(0, 3), sel: false, gone: 0 }));
      const bin = { x: n - 14, y: n - 18 };
      let lasso = null, move = null, plan = null, ghostT = 1, binFull = 0;
      const hitIcon = (x, y) => icons.find(o => !o.gone && inRect(x, y, [o.x, o.y, 11, 15]));
      const selectIn = (a, b) => { const r = [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])]; for (const o of icons) o.sel = !o.gone && o.x + 9 > r[0] && o.x < r[0] + r[2] && o.y + 9 > r[1] && o.y < r[1] + r[3]; };
      function drop(t) {
        const onBin = icons.some(o => o.sel && Math.abs(o.x - bin.x) < 10 && Math.abs(o.y - bin.y) < 12);
        if (onBin) { for (const o of icons) if (o.sel) { o.gone = t; o.sel = false; } binFull = t; }
      }
      return (t, dt) => {
        const p = ptr(dt, n);
        // the bin gives everything back after a while
        for (const o of icons) if (o.gone && t - o.gone > 12) { o.gone = 0; o.x = R.int(3, n - 30); o.y = R.int(3, n - 30); }
        if (p.active) {
          plan = null;
          for (const [x, y] of p.taps) {
            const o = hitIcon(x, y);
            if (o) { if (!o.sel) { icons.forEach(q => q.sel = false); o.sel = true; } move = { lx: x, ly: y }; lasso = null; }
            else { icons.forEach(q => q.sel = false); lasso = { a: [x, y], b: [x, y] }; move = null; }
          }
          if (p.down && lasso) { lasso.b = [p.x, p.y]; selectIn(lasso.a, lasso.b); }
          if (p.down && move) { const dx = p.x - move.lx, dy = p.y - move.ly; for (const o of icons) if (o.sel) { o.x = U.clamp(o.x + dx, 0, n - 11); o.y = U.clamp(o.y + dy, 0, n - 16); } move.lx = p.x; move.ly = p.y; }
          if (!p.down) { if (move) drop(t); lasso = null; move = null; }
          gh.x = p.x; gh.y = p.y;
        } else if (t > ghostT) {
          if (!plan) {
            const live = icons.filter(o => !o.gone);
            const a = live.length ? R.pick(live) : { x: n / 2, y: n / 2 }, sx = a.x - R.int(2, 6), sy = a.y - R.int(2, 6), ex = sx + R.int(16, 40), ey = sy + R.int(16, 36);
            const toBin = R.bool(0.25);
            plan = { phase: 0, sx, sy, ex, ey, mx: toBin ? bin.x - 2 : R.int(4, n - 40), my: toBin ? bin.y - 2 : R.int(4, n - 40) };
          }
          const q = plan;
          if (q.phase === 0) { gh.to(q.sx, q.sy); if (gh.step(dt, 80)) { q.phase = 1; lasso = { a: [q.sx, q.sy], b: [q.sx, q.sy] }; } }
          else if (q.phase === 1) { gh.to(q.ex, q.ey); const ok = gh.step(dt, 40); lasso.b = [gh.x, gh.y]; selectIn(lasso.a, lasso.b); if (ok) { lasso = null; q.phase = icons.some(o => o.sel) ? 2 : 4; q.wait = 0.5; } }
          else if (q.phase === 2) { const s = icons.find(o => o.sel); gh.to(s.x + 4, s.y + 4); if (gh.step(dt, 80)) { q.phase = 3; q.lx = gh.x; q.ly = gh.y; q.tx = q.mx; q.ty = q.my; } }
          else if (q.phase === 3) { gh.to(q.tx, q.ty); const ok = gh.step(dt, 45), dx = gh.x - q.lx, dy = gh.y - q.ly; for (const o of icons) if (o.sel) { o.x = U.clamp(o.x + dx, 0, n - 11); o.y = U.clamp(o.y + dy, 0, n - 16); } q.lx = gh.x; q.ly = gh.y; if (ok) { drop(t); q.phase = 4; q.wait = 0.8; } }
          else { q.wait -= dt; if (q.wait < 0) { icons.forEach(o => o.sel = false); plan = null; ghostT = t + R.range(0.5, 1.5); } }
        }
        d.set(bg);
        // the bin, bulging while full
        icon(g, bin.x + 1, bin.y, 'trash', 0);
        if (t - binFull < 12 && icons.some(o => o.gone)) { X.rect(g, bin.x + 2, bin.y - 1, 7, 2, WHITE); X.put(g, bin.x + 4, bin.y - 2, ICON_INKS[1]); }
        txt(g, 'BIN', bin.x, bin.y + 10, WHITE);
        for (const o of icons) {
          if (o.gone) continue;
          icon(g, o.x + 1, o.y, o.kind, o.col, o.sel);
          const lx = o.x + 6 - Math.floor(tw(o.name) / 2);
          if (o.sel) X.rect(g, lx - 1, o.y + 10, tw(o.name) + 2, 6, th.sel);
          txt(g, o.name, lx, o.y + 10, o.sel ? th.selText : WHITE);
        }
        if (lasso) {
          const x0 = Math.round(Math.min(lasso.a[0], lasso.b[0])), y0 = Math.round(Math.min(lasso.a[1], lasso.b[1])), x1 = Math.round(Math.max(lasso.a[0], lasso.b[0])), y1 = Math.round(Math.max(lasso.a[1], lasso.b[1]));
          const ph = Math.floor(t * 8);
          for (let x = x0; x <= x1; x++) { X.put(g, x, y0, (x + ph) % 4 < 2 ? BLACK : WHITE); X.put(g, x, y1, (x - ph + 400) % 4 < 2 ? BLACK : WHITE); }
          for (let y = y0; y <= y1; y++) { X.put(g, x0, y, (y - ph + 400) % 4 < 2 ? BLACK : WHITE); X.put(g, x1, y, (y + ph) % 4 < 2 ? BLACK : WHITE); }
        }
        cursor(g, gh.x, gh.y, move || (plan && plan.phase === 3) ? HAND : ARROW);
      };
  }
  add({
    name: 'Lasso', seed: 3, sizes: [100], fps: 12,
    interactive: 'Drag on the desktop to lasso icons, drag the selection to move it (drop it on the bin to throw it away), click empty space to let go.',
    recipe: 'Nothing but the pointer and the icons: it drags a marching-ants rectangle over a few, they light up, and it carries them somewhere new, or into the bin, which empties itself and gives them back later.',
    make(R, U, g) { return g.home || g.alt() < 0.5 ? ogLasso(R, U, g) : reLasso(R, U, g); },
  });

  // ======================================================================
  add({
    name: 'Corner', seed: 1, sizes: [50, 80], fps: 12,
    interactive: 'Click to send the logo toward the pointer.',
    listens: 'Clap and the logo turns and changes colour.',
    recipe: 'A screensaver logo bounces round a dark screen, changing colour at every wall. Its size is chosen so that, every so often, it lands exactly in a corner, and the screen celebrates. Logos, counts, trails and screens vary by seed.',
    make(R, U, g) {
      const { n, d } = g, ptr = pointer(g), word0 = R.pick(['SYNAE', 'PRISM', 'NEON', 'HUE', 'VOID', 'ECHO', 'GLOW']);
      const shape = R.pick(['pill', 'word', 'disc', 'pill']), scr = R.pick(['black', 'stars', 'scan', 'grid']);
      const cols = R.bool(0.5) ? [rgb(255, 60, 90), rgb(255, 210, 40), rgb(60, 230, 120), rgb(60, 180, 255), rgb(200, 90, 255), rgb(255, 140, 40)] : X.inks(R, 6, 1);
      const sc = n >= 80 ? 2 : 1, lw = Math.max(shape === 'disc' ? 0 : tw(word0) * sc + 6 * sc, 14 * sc), lh = shape === 'disc' ? lw : 5 * sc + 6 * sc;
      const trail = R.bool(0.35), count = R.pick([1, 1, 1, 2, 3]);
      g.trait('Logo', word0); g.trait('Shape', { pill: 'Pill', word: 'Bare word', disc: 'Disc' }[shape]); g.trait('Screen', cap(scr)); g.trait('Trail', trail ? 'On' : 'Off'); g.trait('Logos', count);
      const bg = new Uint32Array(n * n);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) bg[y * n + x] = scr === 'stars' ? ((Math.imul(x * 7919 + y * 104729, 2654435761) >>> 0) % 61 === 0 ? rgb(120, 120, 150) : rgb(4, 4, 12)) : scr === 'scan' ? (y & 1 ? rgb(10, 10, 16) : rgb(2, 2, 6)) : scr === 'grid' ? ((x % 10 === 0 || y % 10 === 0) ? rgb(18, 10, 34) : rgb(4, 2, 10)) : BLACK;
      // positions on an integer lattice, one cell a step, so corners come round regularly
      const W = n - lw, H = n - lh;
      const logos = Array.from({ length: count }, (_, i) => ({ x: i ? R.int(0, W) : 0, y: i ? R.int(0, H) : 0, vx: 1, vy: 1, c: i, flash: 0 }));
      let corners = 0, party = 0, acc = 0, prev = new Uint32Array(n * n), aimAt = R.range(6, 14);
      // now and then the first logo is steered, a cell at a time, so its next wall is a corner
      const fold = (v, m) => { v = ((v % (2 * m)) + 2 * m) % (2 * m); return v > m ? 2 * m - v : v; };
      const draw = (L, col) => {
        const x = Math.round(L.x), y = Math.round(L.y);
        if (shape === 'disc') {
          const r = lw / 2; X.disc(g, x + r, y + r, r, col); X.disc(g, x + r, y + r, r * 0.55, BLACK);
          txt(g, word0[0], Math.round(x + r - 1), Math.round(y + r - 2), col);
        } else {
          if (shape === 'pill') { X.rect(g, x + 1, y, lw - 2, lh, col); X.rect(g, x, y + 1, lw, lh - 2, col); X.rect(g, x + 2 * sc, y + lh - 2 * sc, lw - 4 * sc, sc, X.shade(col, 0.6)); }
          const tx = x + Math.floor((lw - tw(word0) * sc) / 2), ty = y + Math.floor((lh - 5 * sc) / 2), tc = shape === 'pill' ? BLACK : col;
          for (let k = 0; k < word0.length; k++) { const rows = F3[word0[k]]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) X.rect(g, tx + (k * 4 + b) * sc, ty + r * sc, sc, sc, tc); }
          if (shape === 'pill') X.rect(g, x + 2, y + 1, Math.max(2, lw / 3), 1, X.mixPk(col, WHITE, 0.6));
        }
      };
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) for (const [x, y] of p.taps) { const L = logos[0]; L.vx = x > L.x + lw / 2 ? 1 : -1; L.vy = y > L.y + lh / 2 ? 1 : -1; }
        const ear = hear(g);
        if (ear && ear.beats) for (const L of logos) { if (g.alt.bool(0.5)) L.vx = -L.vx; else L.vy = -L.vy; L.c = (L.c + 1) % cols.length; L.flash = 1; }
        acc += dt * (n >= 80 ? 22 : 14);
        while (acc >= 1) {
          acc--;
          const L0 = logos[0];
          if (t > aimAt) {
            const tx = L0.vx > 0 ? W - L0.x : L0.x, py = L0.y + L0.vy * tx, delta = Math.round(py / H) * H - py;
            if (delta && Math.abs(delta) <= tx && tx > 0) { const ny = L0.y + Math.sign(delta); if (ny > 0 && ny < H) L0.y = ny; }
            void fold;
          }
          for (const L of logos) {
            L.x += L.vx; L.y += L.vy;
            let hx = false, hy = false;
            if (L.x <= 0 || L.x >= W) { L.vx = L.x <= 0 ? 1 : -1; L.x = U.clamp(L.x, 0, W); hx = true; }
            if (L.y <= 0 || L.y >= H) { L.vy = L.y <= 0 ? 1 : -1; L.y = U.clamp(L.y, 0, H); hy = true; }
            if (hx || hy) { L.c = (L.c + 1) % cols.length; L.flash = 1; }
            if (hx && hy) { corners++; party = 3; if (L === logos[0]) aimAt = t + R.range(10, 22); }
          }
        }
        if (trail) { for (let i = 0; i < n * n; i++) { const v = prev[i]; d[i] = v === bg[i] ? bg[i] : X.mixPk(v, bg[i], 0.25); } } else d.set(bg);
        if (party > 0) {
          party -= dt;
          for (let k = 0; k < 40; k++) { const a = k / 40 * TAU + t, r = (3 - party) * n * 0.25; X.put(g, n / 2 + Math.cos(a) * r, n / 2 + Math.sin(a) * r, cols[k % cols.length]); }
          if ((t * 6 | 0) & 1) { const s = 'CORNER!'; txt(g, s, Math.floor((n - tw(s)) / 2), 3, WHITE); }
        }
        for (const L of logos) { draw(L, L.flash > 0.5 ? WHITE : cols[L.c]); L.flash = Math.max(0, L.flash - dt * 4); }
        const s = String(corners);
        txt(g, s, n - tw(s) - 2, n - 7, rgb(90, 90, 110));
        if (trail) prev.set(d);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Chat', seed: 1, sizes: [100], fps: 12,
    interactive: 'Click a friend to talk to them, click Send (or the typing box) to say something.',
    recipe: 'An old messenger: friends sign on and off the buddy list with a creak of the door, lines of chat arrive with a typing dot first, little pixel faces drop in, and the window scrolls. Some seeds are a green IRC terminal or a bubbly phone.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(70, 80), style = R.pick(['messenger', 'messenger', 'irc', 'bubbles']);
      const names = R.shuffle(WORDS.slice()).slice(0, R.int(5, 8)).map((w, i) => ({ name: w, on: R.bool(0.7), col: ICON_INKS[i % 6], away: R.bool(0.2) }));
      const me = { name: 'YOU', col: style === 'irc' ? rgb(255, 255, 255) : th.bar };
      g.trait('App', { messenger: 'Messenger', irc: 'IRC', bubbles: 'Bubbles' }[style]); if (style !== 'irc') themeTraits(g, th); g.trait('Friends', names.length); g.trait('Online', names.filter(q => q.on).length);
      let who = names.find(q => q.on) || names[0], log = [], typing = 0, nextMsg = 1, ghostT = 3;
      const faces = ['smile', 'grin', 'wink', 'sad', 'heart'];
      const say = (from, t) => { const parts = Array.from({ length: R.int(1, 4) }, () => word(R).toLowerCase()); log.push({ from, text: parts.join(' '), face: R.bool(0.3) ? R.pick(faces) : null, t }); if (log.length > 40) log.shift(); };
      const face = (x, y, kind) => {
        X.disc(g, x + 2.5, y + 2.5, 2.6, kind === 'heart' ? rgb(255, 60, 90) : rgb(255, 214, 40));
        if (kind === 'heart') { X.put(g, x + 2, y + 5, WHITE); return; }
        X.put(g, x + 1, y + 1, BLACK); if (kind === 'wink') X.put(g, x + 4, y + 2, BLACK); else X.put(g, x + 3, y + 1, BLACK);
        if (kind === 'sad') { X.put(g, x + 1, y + 4, BLACK); X.put(g, x + 2, y + 3, BLACK); X.put(g, x + 3, y + 4, BLACK); } else { X.put(g, x + 1, y + 3, BLACK); X.put(g, x + 2, y + 4, BLACK); X.put(g, x + 3, y + 3, BLACK); if (kind === 'grin') X.put(g, x + 2, y + 3, WHITE); }
      };
      for (let k = 0; k < 6; k++) say(R.bool(0.5) ? who : me, -10 + k);
      const LW = 34, CXw = 37, sendBtn = [n - 22, n - 12, 19, 8], typeBox = [CXw + 3, n - 12, n - CXw - 27, 8];
      return (t, dt) => {
        const p = ptr(dt, n), online = names.filter(q => q.on);
        if (p.active) {
          for (const [x, y] of p.taps) {
            if (inRect(x, y, sendBtn) || inRect(x, y, typeBox)) say(me, t);
            names.forEach((q, k) => { if (inRect(x, y, [3, 13 + k * 8, LW - 4, 8]) && q.on) who = q; });
          }
          gh.x = p.x; gh.y = p.y;
        } else if (t > ghostT) { gh.to(sendBtn[0] + 8, sendBtn[1] + 4); if (gh.step(dt, 50)) { say(me, t); ghostT = t + R.range(5, 10); } }
        // friends type, then speak; sign on and off
        if (t > nextMsg) { if (!typing) typing = t; if (t - typing > R.range(0.8, 1.6)) { say(who, t); typing = 0; nextMsg = t + R.range(1.2, 3); } }
        if (R() < dt * 0.08) { const q = R.pick(names); q.on = !q.on; if (!q.on && q === who && online.length > 1) who = online.find(o => o !== q); }
        if (style === 'irc') {
          d.fill(BLACK);
          txt(g, '#' + who.name.toLowerCase() + '  ' + online.length + ' USERS', 2, 2, rgb(255, 255, 85));
          X.rect(g, 0, 8, n, 1, rgb(0, 120, 0));
          const rows = Math.floor((n - 20) / 6), vis = log.slice(-rows);
          vis.forEach((m, k) => { const y = 11 + k * 6, nm = '<' + m.from.name.toLowerCase().slice(0, 5) + '>'; txt(g, nm, 2, y, m.from === me ? WHITE : m.from.col); txt(g, fit(m.text, n - tw(nm) - 7), 2 + tw(nm) + 3, y, rgb(0, 220, 0)); });
          X.rect(g, 0, n - 9, n, 1, rgb(0, 120, 0));
          txt(g, '> ' + (typing ? who.name.toLowerCase() + ' is typing' : ''), 2, n - 7, rgb(0, 200, 0));
          if ((t * 3 | 0) & 1) X.rect(g, 70, n - 7, 3, 5, rgb(0, 220, 0));
          cursor(g, gh.x, gh.y);
          return;
        }
        d.fill(style === 'bubbles' ? X.shade(th.desk, 0.6) : th.desk);
        // buddy list
        frame(g, th, 1, 1, LW, n - 2, 'FRIENDS', false);
        X.rect(g, 3, 11, LW - 6, n - 15, th.win);
        names.forEach((q, k) => {
          const y = 13 + k * 8;
          if (q === who) X.rect(g, 3, y - 1, LW - 6, 7, th.sel);
          X.rect(g, 5, y + 1, 3, 3, q.on ? (q.away ? rgb(255, 180, 0) : rgb(40, 200, 60)) : rgb(150, 150, 150));
          txt(g, q.name.slice(0, 6), 10, y, q === who ? th.selText : q.on ? th.text : th.shadow);
        });
        // conversation
        const [cx, cy, cw, ch] = frame(g, th, CXw, 1, n - CXw - 1, n - 2, 'CHAT - ' + who.name, true);
        X.rect(g, cx, cy, cw, ch - 13, th.win);
        const rows = Math.floor((ch - 15) / (style === 'bubbles' ? 8 : 6)), vis = log.slice(-rows);
        vis.forEach((m, k) => {
          if (style === 'bubbles') {
            const line = fit(m.text, cw - 14), y = cy + 1 + k * 8, mine = m.from === me, wtxt = tw(line) + 4, bx = mine ? cx + cw - wtxt - 2 : cx + 2, bc = mine ? th.bar : rgb(225, 225, 232);
            X.rect(g, bx, y, wtxt, 7, bc); X.put(g, mine ? bx + wtxt : bx - 1, y + 5, bc);
            txt(g, line, bx + 2, y + 1, mine ? th.barText : BLACK);
            if (m.face) face(mine ? bx - 7 : bx + wtxt + 2, y + 1, m.face);
          } else {
            const y = cy + 1 + k * 6, nm = m.from.name.slice(0, 4) + ':';
            txt(g, nm, cx + 1, y, m.from === me ? th.bar : rgb(200, 30, 60));
            const ex = txt(g, fit(m.text, cw - tw(nm) - (m.face ? 11 : 5)), cx + 2 + tw(nm) + 2, y, th.text);
            if (m.face) face(Math.min(ex + 1, cx + cw - 6), y, m.face);
          }
        });
        if (typing) { const y = cy + ch - 20; for (let k = 0; k < 3; k++) if (((t * 4 | 0) + k) % 3) X.rect(g, cx + 3 + k * 3, y, 2, 2, th.shadow); }
        bevel(g, th, typeBox[0], typeBox[1], typeBox[2], typeBox[3], true, th.win);
        if ((t * 2 | 0) & 1) X.rect(g, typeBox[0] + 2, typeBox[1] + 2, 1, 4, th.text);
        bevel(g, th, sendBtn[0], sendBtn[1], sendBtn[2], sendBtn[3]); txt(g, 'SEND', sendBtn[0] + 2, sendBtn[1] + 2, th.text);
        cursor(g, gh.x, gh.y, inRect(gh.x, gh.y, sendBtn) ? HAND : ARROW);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Hung Window', seed: 2, sizes: [80, 100], fps: 12,
    interactive: 'Drag the error box yourself and paint with it; click OK to make the screen repaint.',
    recipe: 'The machine has hung: an error box is dragged across a desktop that no longer repaints, so every position it passes through stays behind, piling into ribbons, spirals and loops, until someone clicks OK and the screen wipes clean.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), bg = wallpaper(R, n, th), ptr = pointer(g);
      const BW = R.int(30, 40), BH = R.int(18, 22), kind = R.pick(['x', '!', '?', 'i']), msgs = ['NOT RESPONDING', 'GENERAL FAULT', 'OUT OF MEMORY', 'ILLEGAL OP', 'VOID ERROR', 'HUE OVERFLOW'], msg = R.pick(msgs);
      const pathKind = R.pick(['lissajous', 'spiral', 'wave', 'rose', 'scribble']), a = R.int(1, 4), b = R.int(1, 5), nz = U.noise(R).n2;
      themeTraits(g, th, bg); g.trait('Error', cap(msg)); g.trait('Drag', cap(pathKind));
      const box = new Uint32Array(BW * BH), tmp = { n: BW, d: box };
      // the box drawn once, then stamped
      (() => {
        const gg = tmp, t2 = { ...th };
        bevel(gg, t2, 0, 0, BW, BH);
        for (let k = 0; k < BW - 4; k++) for (let r = 0; r < 6; r++) X.put(gg, 2 + k, 2 + r, kind === 'x' ? rgb(160, 0, 0) : th.bar);
        txt(gg, 'ERROR', 4, 3, WHITE);
        const ix = 4, iy = 10;
        if (kind === 'x') { X.disc(gg, ix + 3, iy + 3, 3.5, rgb(220, 0, 0)); for (let k = 0; k < 5; k++) { X.put(gg, ix + 1 + k, iy + 1 + k, WHITE); X.put(gg, ix + 5 - k, iy + 1 + k, WHITE); } }
        else if (kind === '!') { X.poly(gg, [ix + 3.5, iy - 1, ix + 7.5, iy + 7, ix - 0.5, iy + 7], rgb(255, 220, 0)); X.rect(gg, ix + 3, iy + 1, 1, 3, BLACK); X.put(gg, ix + 3, iy + 5, BLACK); }
        else { X.disc(gg, ix + 3, iy + 3, 3.5, rgb(0, 80, 220)); txt(gg, kind, ix + 2, iy + 1, WHITE); }
        txt(gg, msg.slice(0, Math.floor((BW - 14) / 4)), 13, 10, th.text);
        bevel(gg, t2, BW - 14, BH - 8, 12, 6); txt(gg, 'OK', BW - 12, BH - 7, th.text);
      })();
      const stamp = (x, y) => { x = Math.round(x); y = Math.round(y); for (let r = 0; r < BH; r++) { const yy = y + r; if (yy < 0 || yy >= n) continue; for (let c = 0; c < BW; c++) { const xx = x + c; if (xx >= 0 && xx < n) d[yy * n + xx] = box[r * BW + c]; } } };
      const where = u => {
        const cx = (n - BW) / 2, cy = (n - BH) / 2, ax = cx * 0.95, ay = cy * 0.95;
        if (pathKind === 'lissajous') return [cx + ax * Math.sin(a * u), cy + ay * Math.sin(b * u + 0.7)];
        if (pathKind === 'spiral') { const r = (0.15 + 0.85 * ((u / TAU / 3) % 1)); return [cx + ax * r * Math.cos(u * 2), cy + ay * r * Math.sin(u * 2)]; }
        if (pathKind === 'wave') return [cx + ax * Math.sin(u * 0.5), cy + ay * Math.sin(u * 2.3) * Math.cos(u * 0.31)];
        if (pathKind === 'rose') { const r = Math.cos(a * u * 0.5); return [cx + ax * r * Math.cos(u * 0.5), cy + ay * r * Math.sin(u * 0.5)]; }
        return [cx + ax * nz(u * 0.12, 1.3), cy + ay * nz(u * 0.12, 7.1)];
      };
      let u = 0, life = 0, wipe = -1, drag = null, bx = n / 2, by = n / 2, idleClear = R.range(16, 26);
      d.set(bg);
      return (t, dt) => {
        const p = ptr(dt, n);
        if (wipe >= 0) {
          // the repaint: a band of fresh desktop sweeping down
          const y1 = Math.min(n, Math.round(wipe * n));
          d.set(bg.subarray(0, y1 * n), 0);
          wipe += dt * 1.6;
          if (wipe >= 1) { wipe = -1; life = 0; }
          stamp(bx, by);
          return;
        }
        if (p.active) {
          for (const [x, y] of p.taps) {
            if (inRect(x, y, [bx + BW - 14, by + BH - 8, 12, 6])) { wipe = 0; return; }
            if (inRect(x, y, [bx, by, BW, BH])) drag = { ox: x - bx, oy: y - by };
          }
          if (drag && p.down) { bx = p.x - drag.ox; by = p.y - drag.oy; }
          if (!p.down) drag = null;
        } else {
          u += dt * 0.9; life += dt;
          [bx, by] = where(u);
          if (life > idleClear) { wipe = 0; idleClear = R.range(16, 26); }
        }
        stamp(bx, by);
        cursor(g, bx + 6, by + 3);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Sweeper', seed: 1, sizes: [100], fps: 12,
    interactive: 'Click a square to open it, toggle the flag button to plant flags, click the face to start again.',
    recipe: 'A mine-sweeping game, playable: it opens the field in flood-filled clearings, reads the numbers, plants flags where it is sure and guesses only when it must. Win and the face puts on sunglasses; lose and every mine shows. Leave it and it plays itself.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(50, 50);
      const sz = R.pick([[10, 8], [13, 6], [16, 5]]), C = sz[0], S = sz[1], M = Math.round(C * C * R.range(0.13, 0.18));
      themeTraits(g, th); g.trait('Board', C + 'x' + C); g.trait('Mines', M); g.trait('Cells', S > 6 ? 'Big' : S > 5 ? 'Medium' : 'Small');
      const ox = Math.floor((n - C * S) / 2), oy = 17 + Math.floor((n - 19 - C * S) / 2);
      const NUM = [0, rgb(0, 0, 255), rgb(0, 128, 0), rgb(255, 0, 0), rgb(0, 0, 128), rgb(128, 0, 0), rgb(0, 128, 128), BLACK, rgb(128, 128, 128)];
      let mine, open, flag, cnt, state, started, timer, flagMode = false, boom = -1, endT = 0, ghostT = 0, guessQ = [];
      function reset() { mine = new Uint8Array(C * C); open = new Uint8Array(C * C); flag = new Uint8Array(C * C); cnt = new Uint8Array(C * C); state = 'play'; started = false; timer = 0; boom = -1; }
      reset();
      const nb = i => { const x = i % C, y = (i / C) | 0, out = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const a = x + dx, b = y + dy; if (a >= 0 && b >= 0 && a < C && b < C) out.push(b * C + a); } return out; };
      function seed(first) {
        const safe = new Set([first, ...nb(first)]);
        let k = 0; while (k < M) { const i = R.int(0, C * C - 1); if (!mine[i] && !safe.has(i)) { mine[i] = 1; k++; } }
        for (let i = 0; i < C * C; i++) cnt[i] = nb(i).reduce((s, j) => s + mine[j], 0);
        started = true;
      }
      function reveal(i, t) {
        if (state !== 'play' || flag[i] || open[i]) return;
        if (!started) seed(i);
        if (mine[i]) { state = 'lost'; boom = i; endT = t; for (let j = 0; j < C * C; j++) if (mine[j]) open[j] = 1; return; }
        const st = [i];
        while (st.length) { const j = st.pop(); if (open[j]) continue; open[j] = 1; flag[j] = 0; if (!cnt[j]) for (const k of nb(j)) if (!open[k] && !mine[k]) st.push(k); }
        let left = 0; for (let j = 0; j < C * C; j++) if (!open[j] && !mine[j]) left++;
        if (!left) { state = 'won'; endT = t; for (let j = 0; j < C * C; j++) if (mine[j]) flag[j] = 1; }
      }
      function chord(i, t) { if (!open[i] || !cnt[i]) return; const ns = nb(i); if (ns.filter(j => flag[j]).length === cnt[i]) for (const j of ns) if (!flag[j]) reveal(j, t); }
      // one move by a simple solver: certain flags, certain opens, else the safest-looking guess
      function solve() {
        if (!started) return { i: R.int(0, C * C - 1), act: 'open' };
        for (let i = 0; i < C * C; i++) {
          if (!open[i] || !cnt[i]) continue;
          const ns = nb(i), hid = ns.filter(j => !open[j]), fl = ns.filter(j => flag[j]);
          if (hid.length === cnt[i]) { const j = hid.find(q => !flag[q]); if (j !== undefined) return { i: j, act: 'flag' }; }
          if (fl.length === cnt[i]) { const j = hid.find(q => !flag[q]); if (j !== undefined) return { i: j, act: 'open' }; }
        }
        const cand = []; for (let i = 0; i < C * C; i++) if (!open[i] && !flag[i]) cand.push(i);
        return cand.length ? { i: R.pick(cand), act: 'open' } : null;
      }
      const cellAt = (x, y) => { const cx = Math.floor((x - ox) / S), cy = Math.floor((y - oy) / S); return cx >= 0 && cy >= 0 && cx < C && cy < C ? cy * C + cx : -1; };
      const face = [Math.floor(n / 2) - 5, 3, 11, 11], flagBtn = [Math.floor(n / 2) + 9, 4, 10, 9];
      function led(x, y, v) { X.rect(g, x, y, 15, 9, BLACK); const s = String(Math.max(0, Math.min(999, v))).padStart(3, '0'); for (let k = 0; k < 3; k++) { const rows = F3[s[k]]; for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) X.rect(g, x + 1 + k * 5 + b, y + 2 + r, 1, 1, rows[r] >> (2 - b) & 1 ? rgb(255, 30, 30) : rgb(70, 0, 0)); } }
      return (t, dt) => {
        const p = ptr(dt, n);
        if (state === 'play' && started) timer += dt;
        if (p.active) {
          for (const [x, y] of p.taps) {
            if (inRect(x, y, face)) { reset(); continue; }
            if (inRect(x, y, flagBtn)) { flagMode = !flagMode; continue; }
            const i = cellAt(x, y); if (i < 0 || state !== 'play') continue;
            if (open[i]) chord(i, t); else if (flagMode) flag[i] ^= 1; else reveal(i, t);
          }
          gh.x = p.x; gh.y = p.y;
        } else if (state !== 'play') { if (t - endT > 3) reset(); }
        else if (t > ghostT) {
          if (!gh.move) gh.move = solve();
          if (gh.move) {
            const i = gh.move.i; gh.to(ox + (i % C) * S + S / 2, oy + ((i / C) | 0) * S + S / 2);
            if (gh.step(dt, 90)) { if (gh.move.act === 'flag') flag[i] = 1; else reveal(i, t); gh.move = null; ghostT = t + R.range(0.15, 0.5); }
          }
        }
        // the case, header, counters, face
        d.fill(th.face);
        bevel(g, th, 0, 0, n, n);
        bevel(g, th, 2, 2, n - 4, 13, true);
        led(5, 4, M - flag.reduce((s, v) => s + v, 0)); led(n - 20, 4, Math.floor(timer));
        bevel(g, th, face[0], face[1], face[2], face[3], false);
        const fx = face[0] + 5.5, fy = face[1] + 5.5;
        X.disc(g, fx, fy, 4.2, rgb(255, 230, 0));
        if (state === 'won') { X.rect(g, fx - 3, fy - 2, 7, 2, BLACK); }
        else if (state === 'lost') { for (const s of [-2, 2]) { X.put(g, fx + s - 1, fy - 2, BLACK); X.put(g, fx + s, fy - 1, BLACK); X.put(g, fx + s - 1, fy - 1 + 0, BLACK); } }
        else { X.put(g, fx - 2, fy - 2, BLACK); X.put(g, fx + 1, fy - 2, BLACK); }
        if (state === 'lost') X.rect(g, fx - 2, fy + 2, 4, 1, BLACK); else { X.put(g, fx - 2, fy + 1, BLACK); X.rect(g, fx - 1, fy + 2, 3, 1, BLACK); X.put(g, fx + 2, fy + 1, BLACK); }
        bevel(g, th, flagBtn[0], flagBtn[1], flagBtn[2], flagBtn[3], flagMode);
        X.rect(g, flagBtn[0] + 4, flagBtn[1] + 2, 1, 6, BLACK); X.rect(g, flagBtn[0] + 2, flagBtn[1] + 2, 3, 3, rgb(230, 0, 0));
        bevel(g, th, ox - 2, oy - 2, C * S + 4, C * S + 4, true);
        // the field
        for (let i = 0; i < C * C; i++) {
          const x = ox + (i % C) * S, y = oy + ((i / C) | 0) * S;
          if (!open[i]) {
            bevel(g, th, x, y, S, S);
            if (flag[i]) { const m = Math.floor(S / 2); X.rect(g, x + m, y + 1, 1, S - 2, BLACK); X.rect(g, x + m - 2, y + 1, 2, Math.max(2, m - 1), rgb(230, 0, 0)); X.rect(g, x + m - 1, y + S - 2, 3, 1, BLACK); }
            continue;
          }
          X.rect(g, x, y, S, S, i === boom ? rgb(255, 0, 0) : th.face);
          X.rect(g, x, y, S, 1, th.shadow); X.rect(g, x, y, 1, S, th.shadow);
          if (mine[i]) { X.disc(g, x + S / 2 + 0.5, y + S / 2 + 0.5, S * 0.32, BLACK); X.put(g, x + S / 2 - 1, y + S / 2 - 1, WHITE); }
          else if (cnt[i]) {
            const rows = F3[cnt[i]];
            const tx = x + Math.floor((S - 3) / 2) + (S >= 6 ? 1 : 0), ty = y + Math.floor((S - 5) / 2) + (S >= 6 ? 1 : 0);
            for (let r = 0; r < 5; r++) for (let b = 0; b < 3; b++) if (rows[r] >> (2 - b) & 1) X.put(g, tx + b, ty + r, NUM[cnt[i]]);
          }
        }
        cursor(g, gh.x, gh.y);
      };
    },
  });

  // ======================================================================
  add({
    name: 'Icon Editor', seed: 6, sizes: [100], fps: 12,
    interactive: 'Paint in the fat-bit grid; click a colour, the mirror switch or Clear.',
    recipe: 'An icon editor at work: a pencil fills a fat-bit grid square by square, often in mirror mode, while the actual-size and double-size previews fill in beside it. When the icon is done it is saved to a strip of finished icons, and a new one begins.',
    make(R, U, g) {
      const { n, d } = g, th = theme(R), ptr = pointer(g), gh = ghost(50, 50);
      const G = R.pick([12, 16, 16]), FB = Math.floor(64 / G), GX = 4, GY = 13;
      const inks7 = X.inks(R, 7, 0.4), pal = [0, BLACK, WHITE].concat(inks7).concat([rgb(255, 214, 40), rgb(230, 40, 60)]);
      themeTraits(g, th); g.trait('Grid', G + 'x' + G); g.trait('Inks', (() => { for (const p of U.PALETTES) if (inks7.includes(U.pk(p.cols[0]))) return p.name; return 'Spectrum'; })());
      const art = new Uint8Array(G * G), done = [];
      let colour = 1, mirror = true, queue = [], qi = 0, hold = 0;
      // the ghost's next icon: a mirrored creature, a gem, a heart, a floppy, a face, a tree
      function plan() {
        art.fill(0); queue = []; qi = 0;
        const kind = R.pick(['creature', 'gem', 'heart', 'face', 'tree', 'creature', 'potion']);
        if (!g.traits.some(q => q[0] === 'First icon')) g.trait('First icon', cap(kind));
        const c1 = R.int(3, 9), c2 = R.int(3, 9), c3 = R.int(3, 9), m = G / 2;
        const set = (x, y, c) => { if (x >= 0 && y >= 0 && x < G && y < G) queue.push([x, y, c]); };
        if (kind === 'creature') { const s = X.mirrorSprite(R, G - 4, G - 4, 0.5, 0.2); for (let y = 0; y < s.length; y++) for (let x = 0; x < s[0].length; x++) if (s[y][x]) set(x + 2, y + 2, s[y][x] === 2 ? c2 : c1); queue.push(...outlineOf(1)); }
        else if (kind === 'gem') { for (let y = 2; y < G - 2; y++) { const w = y < G * 0.4 ? (y - 1) * 1.4 + 2 : (G - 2 - y) * 1.1; for (let x = Math.round(m - w); x < Math.round(m + w); x++) set(x, y, y < G * 0.4 ? c2 : (x < m ? c1 : c3)); } }
        else if (kind === 'heart') { for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const u = (x - m + 0.5) / (G * 0.42), v = (y - G * 0.45) / (G * 0.42); if (Math.pow(u * u + v * v - 0.35, 3) - u * u * v * v * v < 0) set(x, y, y < G * 0.35 && x < m - 1 ? 2 : c1); } }
        else if (kind === 'face') { for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const q = Math.hypot(x - m + 0.5, y - m + 0.5); if (q < G * 0.44) set(x, y, 10); } set(Math.round(m - 3), Math.round(m - 2), 1); set(Math.round(m + 2), Math.round(m - 2), 1); for (let x = Math.round(m - 3); x <= Math.round(m + 2); x++) set(x, Math.round(m + 2 + (Math.abs(x - m + 0.5) < 2 ? 1 : 0)), 1); }
        else if (kind === 'tree') { for (let y = 1; y < G - 4; y++) { const w = (y + 1) * 0.45; for (let x = Math.round(m - w); x < Math.round(m + w); x++) set(x, y, (x + y) % 5 ? c1 : c2); } for (let y = G - 4; y < G - 1; y++) set(Math.round(m) - 1, y, 1), set(Math.round(m), y, 1); }
        else { for (let y = 3; y < G - 1; y++) for (let x = 2; x < G - 2; x++) { const neck = y < G * 0.4 && Math.abs(x - m + 0.5) > 1.5; if (!neck) set(x, y, y < G * 0.55 && !neck ? 2 : c1); } set(Math.round(m) - 1, 2, c3); set(Math.round(m), 2, c3); }
        function outlineOf(c) { const pts = new Set(queue.map(([x, y]) => y * G + x)), out = []; for (const i of pts) { const x = i % G, y = (i / G) | 0; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const j = (y + b) * G + x + a; if (x + a >= 0 && x + a < G && y + b >= 0 && y + b < G && !pts.has(j)) out.push([x + a, y + b, c]); } } return out; }
        // draw left half in reading order, mirror fills the right
        queue = queue.filter(([x]) => !mirror || x < G / 2).sort((a, b2) => a[2] - b2[2] || a[1] - b2[1] || a[0] - b2[0]);
      }
      plan();
      const palBtn = k => [GX + 64, GY + k * 6, 9, 6];
      const mirBtn = [GX, GY + 68, 24, 8], clrBtn = [GX + 26, GY + 68, 24, 8];
      const paint = (x, y, c) => { if (x < 0 || y < 0 || x >= G || y >= G) return; art[y * G + x] = c; if (mirror) art[y * G + G - 1 - x] = c; };
      return (t, dt) => {
        const p = ptr(dt, n);
        if (p.active) {
          for (const [x, y] of p.taps) {
            pal.forEach((_, k) => { if (k && inRect(x, y, palBtn(k - 1))) colour = k; });
            if (inRect(x, y, mirBtn)) mirror = !mirror;
            if (inRect(x, y, clrBtn)) art.fill(0);
          }
          if (p.down) { const cx = Math.floor((p.x - GX) / FB), cy = Math.floor((p.y - GY) / FB); paint(cx, cy, colour); }
          gh.x = p.x; gh.y = p.y;
        } else if (hold > 0) { hold -= dt; if (hold <= 0) plan(); }
        else {
          const q = queue[qi];
          if (!q) { done.unshift(art.slice()); if (done.length > 5) done.pop(); hold = 2; }
          else {
            if (q[2] !== colour) { const r = palBtn(q[2] - 1); gh.to(r[0] + 5, r[1] + 3); if (gh.step(dt, 140)) colour = q[2]; }
            else { gh.to(GX + q[0] * FB + FB / 2, GY + q[1] * FB + FB / 2); if (gh.step(dt, 120)) { paint(q[0], q[1], q[2]); qi++; } }
          }
        }
        d.fill(th.desk);
        const [cx, cy] = frame(g, th, 1, 1, n - 2, n - 2, 'ICON EDIT - ' + (mirror ? 'MIRROR' : 'FREE'), true);
        // fat bits with a faint grid; empty cells as a checkerboard
        X.rect(g, GX - 1, GY - 1, G * FB + 2, G * FB + 2, th.dark);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
          const v = art[y * G + x], c = v ? pal[v] : ((x + y) & 1 ? rgb(200, 200, 200) : rgb(230, 230, 230));
          X.rect(g, GX + x * FB, GY + y * FB, FB, FB, c);
          if (FB >= 4) X.put(g, GX + x * FB + FB - 1, GY + y * FB + FB - 1, X.shade(c, 0.85));
        }
        if (mirror) for (let y = 0; y < G * FB; y += 2) X.put(g, GX + G * FB / 2, GY + y, rgb(255, 0, 128));
        // palette, buttons, previews, the strip of finished icons
        pal.forEach((c, k) => { if (!k) return; const r = palBtn(k - 1); X.rect(g, r[0], r[1], r[2], r[3], k === colour ? th.dark : th.shadow); X.rect(g, r[0] + 1, r[1] + 1, r[2] - 2, r[3] - 2, c); if (k === colour) X.rect(g, r[0] - 2, r[1] + 2, 1, 2, th.text); });
        bevel(g, th, mirBtn[0], mirBtn[1], mirBtn[2], mirBtn[3], mirror); txt(g, 'MIRR', mirBtn[0] + 3, mirBtn[1] + 2, th.text);
        bevel(g, th, clrBtn[0], clrBtn[1], clrBtn[2], clrBtn[3]); txt(g, 'CLEAR', clrBtn[0] + 2, clrBtn[1] + 2, th.text);
        const px = GX + 54, py = GY + 68;
        bevel(g, th, px - 1, py - 1, G + 2, G + 2, true, th.win);
        for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const v = art[y * G + x]; if (v) X.put(g, px + x, py + y, pal[v]); }
        // finished icons, newest first, down the right-hand side
        const sx = n - G - 4;
        txt(g, 'SAVED', sx + Math.floor((G - 19) / 2), GY - 1, th.text);
        done.forEach((a, k) => { const y0 = GY + 6 + k * (G + 3); if (y0 + G > n - 4) return; X.rect(g, sx - 1, y0 - 1, G + 2, G + 2, th.shadow); for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) { const v = a[y * G + x]; X.put(g, sx + x, y0 + y, v ? pal[v] : th.win); } });
        if (gh.x >= GX && gh.y >= GY && gh.x < GX + G * FB && gh.y < GY + G * FB) {
          const x = Math.round(gh.x), y = Math.round(gh.y);
          X.put(g, x, y, BLACK); X.put(g, x + 1, y - 1, BLACK); X.put(g, x + 2, y - 2, rgb(220, 160, 60)); X.put(g, x + 3, y - 3, rgb(220, 160, 60)); X.put(g, x + 4, y - 4, rgb(255, 120, 150));
        } else cursor(g, gh.x, gh.y);
        void cx; void cy;
      };
    },
  });
})();
