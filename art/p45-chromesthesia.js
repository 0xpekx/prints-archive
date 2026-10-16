// Set 5 · Chromesthesia: sound becoming colour. Each piece runs a small piece of
// music theory (a chord walk, two voices in counterpoint, change ringing, FM
// synthesis, phasing) and the picture is what that music looks like. Pitch
// classes take hues round the circle of fifths, so related notes sit side by side.
(function () {
  'use strict';
  const P = window.Proto, U = P.U, X = U.X, BLACK = 0xff000000, WHITE = 0xffffffff, TAU = Math.PI * 2;
  const add = def => P.addPixel(Object.assign({ set: 5, fam: 'Chromesthesia' }, def));
  const mod = (a, m) => ((a % m) + m) % m;
  const wrapD = (v, n) => v > n / 2 ? v - n : v < -n / 2 ? v + n : v;
  const fifths = pc => mod(pc * 7, 12) / 12;   // a pitch class's place round the circle of fifths, 0..1
  const MAJOR = [0, 2, 4, 5, 7, 9, 11], MINOR = [0, 2, 3, 5, 7, 8, 10], DORIAN = [0, 2, 3, 5, 7, 9, 10];
  const colours = (R, share = 0.65) => { const sc = U.scheme(R, share), h0 = R.range(0, 256), f = pc => sc.lut[(h0 + fifths(pc) * 256) & 255]; f.sc = sc; return f; };
  // diatonic chord walk: degree -> the degrees it likes to move to
  const MOVES = [[3, 4, 5, 1], [4, 6], [5, 3], [4, 1, 0], [0, 5, 3], [1, 3, 4], [0, 4]];
  const few = (v, a, b, w) => v < a ? w[0] : v < b ? w[1] : w[2];
  const timbre = R => ({ wave: R.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: R.range(900, 3000) });
  // ---- trait names: words for the colours a variation already rolled (no new draws) ----
  const HUES = ['Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Jade', 'Teal', 'Cyan', 'Azure', 'Blue', 'Indigo', 'Violet', 'Purple', 'Magenta', 'Rose'];
  const hueWord = c => {
    const [r, gg, b] = typeof c === 'number' ? [c & 255, c >> 8 & 255, c >> 16 & 255] : c, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), dd = mx - mn;
    if (dd < 0.2 * mx || mx < 40) return mx > 190 ? 'White' : mx < 70 ? 'Black' : 'Grey';
    let h = mx === r ? (gg - b) / dd : mx === gg ? 2 + (b - r) / dd : 4 + (r - gg) / dd; h = (h / 6 + 1) % 1;
    return HUES[Math.round(h * 16) % 16];
  };
  const palName = cols => {
    const pk = cols.map(c => typeof c === 'number' ? c >>> 0 : U.pk(c));
    for (const p of U.PALETTES) if (p.cols.length === pk.length && p.cols.every(c => pk.includes(U.pk(c)))) return p.name;
    const words = [...new Set(pk.map(hueWord).filter(w => w !== 'Black'))];
    return words.length >= 7 ? 'Rainbow' : words.length >= 4 ? words[0] + ' to ' + words[words.length - 1] : words.length ? words.slice(0, 2).join(' and ') : 'Black';
  };
  const schemeName = sc => sc.native ? palName(sc.cols) : sc.name;
  const modeName = s => s === MAJOR ? 'Major' : s === MINOR ? 'Minor' : s === DORIAN ? 'Dorian' : 'Modal';
  const KEYS = ['C', 'C sharp', 'D', 'E flat', 'E', 'F', 'F sharp', 'G', 'A flat', 'A', 'B flat', 'B'];
  const colName = col => schemeName(col.sc);
  const toneName = w => w[0].toUpperCase() + w.slice(1);
  const triad = (scale, root, deg) => [0, 2, 4].map(k => root + scale[(deg + k) % 7] + (deg + k >= 7 ? 12 : 0));

  add({
    name: 'Tonnetz', seed: 2, sizes: [100, 200], fps: 12,
    recipe: 'The Tonnetz: a triangular lattice of pitch classes where every triangle is a major or minor chord. A chord progression walks across it one shared edge at a time; each chord it visits flares in its root’s colour and slowly fades, and the view pans to follow the walk.',
    make(R, U, g) {
      const { n, d } = g, col = colours(R, 0.8), a = n / R.range(7, 10), s3 = Math.sqrt(3) / 2, beat = R.range(0.6, 0.95), lit = new Map(), base = R.range(0.3, 0.42);
      const pc = (i, j) => mod(7 * i + 4 * j, 12), key = (i, j, up) => ((i + 4096) * 8192 + (j + 4096)) * 2 + up;
      let cur = { i: 0, j: 0, up: 1 }, prev = null, next = 0, panX = 0, panY = 0;
      lit.set(key(0, 0, 1), 0);
      const centre = c => { const ci = c.i + (c.up ? 1 / 3 : 2 / 3), cj = c.j + (c.up ? 1 / 3 : 2 / 3); return [a * (ci + cj / 2), a * s3 * cj]; };
      [panX, panY] = centre(cur);
      return (t, dt) => {
        next -= dt;
        if (next <= 0) {
          next = beat;
          const opts = cur.up ? [{ i: cur.i, j: cur.j, up: 0 }, { i: cur.i - 1, j: cur.j, up: 0 }, { i: cur.i, j: cur.j - 1, up: 0 }] : [{ i: cur.i, j: cur.j, up: 1 }, { i: cur.i + 1, j: cur.j, up: 1 }, { i: cur.i, j: cur.j + 1, up: 1 }];
          const fresh = opts.filter(o => !prev || o.i !== prev.i || o.j !== prev.j || o.up !== prev.up);
          prev = cur; cur = R.pick(fresh); lit.set(key(cur.i, cur.j, cur.up), t);
          if (lit.size > 400) for (const [k, v] of lit) if (t - v > 30) lit.delete(k);
        }
        const [tx, ty] = centre(cur);
        panX += (tx - panX) * 0.04; panY += (ty - panY) * 0.04;
        for (let y = 0; y < n; y++) {
          const wy = y + 0.5 - n / 2 + panY, j = wy / (a * s3), fj = Math.floor(j), v = j - fj;
          for (let x = 0; x < n; x++) {
            const i = (x + 0.5 - n / 2 + panX) / a - j / 2, fi = Math.floor(i), u = i - fi, up = u + v < 1 ? 1 : 0;
            const e = up ? Math.min(u, v, 1 - u - v) : Math.min(1 - u, 1 - v, u + v - 1), corner = up ? Math.max(u, v, 1 - u - v) : Math.max(1 - u, 1 - v, u + v - 1);
            if (corner > 0.86) { d[y * n + x] = WHITE; continue; }
            if (e < 0.045) { d[y * n + x] = BLACK; continue; }
            const root = up ? pc(fi, fj) : pc(fi, fj) + 4, l = lit.get(key(fi, fj, up)), b = l === undefined ? base : base + (1 - base) * Math.exp(-(t - l) / 5);
            const c = col(root);
            d[y * n + x] = (fi === cur.i && fj === cur.j && up === cur.up) ? X.mixPk(c, WHITE, 0.25) : X.shade(c, b);
          }
        }
      };
    },
  });

  add({
    name: 'Counterpoint', seed: 2, sizes: [100, 200], fps: 12, music: true,
    interactive: 'Click to move the duet into another mode.',
    recipe: 'Two melodies in counterpoint, each note of one set against each recent note of the other: every cell is the interval between them. Octaves burn white, fifths and fourths glow, thirds and sixths are mid tones, seconds and sevenths go dark and the tritone is a black void. The grid slides diagonally as the voices sing on.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, m = 25, c = n / m, col = colours(R), scale0 = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), beat = R.range(0.38, 0.55);
        let da = R.int(7, 10), db = R.int(0, 3), scale = scale0, live = false;
        const tm = { wave: g.alt.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: g.alt.range(900, 3000) }, tm2 = { wave: g.alt.pick(['triangle', 'sine', 'square']), cutoff: g.alt.range(900, 3000) }, snd = g.sound, inp = g.input;
        const note = deg => root + Math.floor(deg / 7) * 12 + scale[mod(deg, 7)];
        const A = [], B = [];
        g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale0).toLowerCase()); g.trait('Grid of notes', m); g.trait('Melody', 'Stepwise'); g.trait('Tritone', 'Void'); g.trait('Grid', n);
        const sing = () => {
          const sa = R.pick([-2, -1, -1, 1, 1, 2, 0, 4, -3]); da = U.clamp(da + sa, 4, 16) | 0;
          db = U.clamp(db + (R() < 0.6 ? -Math.sign(sa) * R.int(1, 2) : R.pick([-1, 1, 0])), -4, 8) | 0;
          A.push(note(da)); B.push(note(db));
          if (live) { snd.note(60 + note(da), { dur: beat * 0.95, vel: 0.32, wave: tm.wave, cutoff: tm.cutoff, pan: 0.35 }); snd.note(48 + note(db), { dur: beat * 1.1, vel: 0.36, wave: tm2.wave, cutoff: tm2.cutoff, pan: -0.35 }); }
          if (A.length > m + 1) { A.shift(); B.shift(); }
        };
        for (let k = 0; k <= m; k++) sing();
        live = true;
        let acc = 0;
        return (t, dt) => {
          if (inp.taps().length) scale = scale === MAJOR ? MINOR : scale === MINOR ? DORIAN : MAJOR;
          acc += dt; while (acc > beat) { acc -= beat; sing(); }
          const sh = Math.floor(acc / beat * c);
          d.fill(BLACK);
          for (let j = 0; j < A.length; j++) for (let i = 0; i < A.length; i++) {
            const iv = mod(A[i] - B[j], 12), x0 = i * c - sh, y0 = j * c - sh;
            let cc;
            if (iv === 0) cc = WHITE;
            else if (iv === 6) continue;
            else if (iv === 7 || iv === 5) cc = col(A[i]);
            else if (iv === 3 || iv === 4 || iv === 8 || iv === 9) cc = X.shade(col(B[j]), 0.62);
            else cc = X.shade(col(A[i]), 0.22);
            X.rect(g, x0, y0, c, c, cc);
          }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, snd = g.sound, m = R.pick([16, 20, 25, 25, 32]), c = n / m, col = colours(R), root = R.int(0, 11), beat = R.range(0.3, 0.55), tA = timbre(R), tB = timbre(R);
      const tritone = R.pick([BLACK, BLACK, X.rgb(20, 20, 28)]), step = R.pick([[-2, -1, -1, 1, 1, 2, 0, 4, -3], [-1, -1, 1, 1, 0, 0, 2, -2], [-3, -2, 2, 3, 4, -4, 1, -1]]);
      let scale = R.pick([MAJOR, MINOR, DORIAN]), da = R.int(7, 10), db = R.int(0, 3), live = false;
      const note = deg => root + Math.floor(deg / 7) * 12 + scale[mod(deg, 7)];
      const A = [], B = [];
      g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Grid of notes', m); g.trait('Melody', step.length === 9 ? 'Stepwise' : step[0] === -1 ? 'Smooth' : 'Leaping'); g.trait('Tritone', tritone === BLACK ? 'Void' : 'Shadow'); g.trait('Grid', n);
      const sing = () => {
        const sa = R.pick(step); da = U.clamp(da + sa, 4, 16) | 0;
        db = U.clamp(db + (R() < 0.6 ? -Math.sign(sa) * R.int(1, 2) : R.pick([-1, 1, 0])), -4, 8) | 0;
        A.push(note(da)); B.push(note(db));
        if (live) { snd.note(60 + note(da), { dur: beat * 0.95, vel: 0.32, wave: tA.wave, cutoff: tA.cutoff, pan: 0.35 }); snd.note(48 + note(db), { dur: beat * 1.1, vel: 0.36, wave: tB.wave, cutoff: tB.cutoff, pan: -0.35 }); }
        if (A.length > m + 1) { A.shift(); B.shift(); }
      };
      for (let k = 0; k <= m; k++) sing();
      live = true;
      let acc = 0;
      return (t, dt) => {
        if (inp.taps().length) scale = scale === MAJOR ? MINOR : scale === MINOR ? DORIAN : MAJOR;
        acc += dt; while (acc > beat) { acc -= beat; sing(); }
        const sh = Math.floor(acc / beat * c);
        d.fill(BLACK);
        for (let j = 0; j < A.length; j++) for (let i = 0; i < A.length; i++) {
          const iv = mod(A[i] - B[j], 12), x0 = i * c - sh, y0 = j * c - sh;
          let cc;
          if (iv === 0) cc = WHITE;
          else if (iv === 6) cc = tritone;
          else if (iv === 7 || iv === 5) cc = col(A[i]);
          else if (iv === 3 || iv === 4 || iv === 8 || iv === 9) cc = X.shade(col(B[j]), 0.62);
          else cc = X.shade(col(A[i]), 0.22);
          X.rect(g, x0, y0, c, c, cc);
        }
      };
    },
  });

  // a round brush with a sheen on its upper-left side, so the stroke reads as a lit tube
  // (thin brushes stay flat: a one-cell sheen would only read as speckle)
  const brush = (g, x, y, rad, c) => { X.disc(g, x, y, rad, c); if (rad >= 2.4) X.disc(g, x - rad * 0.32, y - rad * 0.32, rad * 0.42, X.mixPk(c, WHITE, 0.4)); };

  add({
    name: 'Melodic Line', seed: 1, sizes: [100, 200], fps: 12, music: true,
    interactive: 'Move the pointer to lead the brush; the melody keeps singing.',
    recipe: 'A melody painted as a single brushstroke: every interval turns the brush, up to the left and down to the right, and every note paints in its own colour. The stroke wanders and loops across the frame, crossing its own older, fading coils.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, col = colours(R, 0.8), scale = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), turn = R.range(0.18, 0.32), v = n / R.range(70, 110), rad = n >= 200 ? 3.2 : 1.8, beat = R.range(0.22, 0.34);
        const tm = { wave: g.alt.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: g.alt.range(900, 3000) }, tm2 = { wave: g.alt.pick(['triangle', 'sine', 'square']), cutoff: g.alt.range(900, 3000) }, snd = g.sound, inp = g.input;
        let live = false;
        g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Brush', 'Medium'); g.trait('Memory', 'Medium'); g.trait('Turning', few(turn, 0.23, 0.28, ['Gentle', 'Moderate', 'Sharp'])); g.trait('Grid', n);
        let deg = 7, pitch = root + 12, x = R() * n, y = R() * n, th = R() * TAU, acc = 0, left = 1;
        const paint = () => { brush(g, x, y, rad, col(pitch)); if (x < rad + 1) brush(g, x + n, y, rad, col(pitch)); if (y < rad + 1) brush(g, x, y + n, rad, col(pitch)); };
        const stepNote = () => { const s = R.pick([-2, -1, -1, 1, 1, 2, 0, 3, -4, 4]); deg = U.clamp(deg + s, 0, 18) | 0; const p = root + Math.floor(deg / 7) * 12 + scale[deg % 7]; th += (p - pitch) * turn; pitch = p; left = R.pick([1, 1, 2, 2, 3]); if (live) snd.note(55 + pitch, { dur: beat * left * 0.95, vel: 0.4, wave: tm.wave, cutoff: tm.cutoff, pan: (x / n - 0.5) }); };
        const move = dt => { acc += dt; while (acc > beat) { acc -= beat; if (--left <= 0) stepNote(); } x = mod(x + Math.cos(th) * v, n); y = mod(y + Math.sin(th) * v, n); th += Math.sin(acc * 3) * 0.01; paint(); };
        for (let k = 0; k < 1400; k++) { move(1 / 12); if (k % 4 === 0) U.fadePx(d, 0.996); }
        live = true;
        return (t, dt) => {
          if (inp.inside) { const want = Math.atan2(wrapD(inp.y * n - y, n), wrapD(inp.x * n - x, n)); th += Math.sin(want - th) * 0.25; }
          if (Math.round(t * 12) % 3 === 0) U.fadePx(d, 0.996); move(dt);
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, snd = g.sound, col = colours(R, 0.8), scale = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), turn = R.range(0.18, 0.32), v = n / R.range(60, 120), rad = (n >= 200 ? 3.2 : 1.8) * R.pick([0.7, 1, 1.5]), beat = R.range(0.2, 0.34), tm = timbre(R), keep = R.pick([0.99, 0.996, 0.999]);
      g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Brush', rad < (n >= 200 ? 2.9 : 1.6) ? 'Fine' : rad > (n >= 200 ? 3.5 : 2) ? 'Broad' : 'Medium'); g.trait('Memory', ['Short', 'Medium', 'Long'][[0.99, 0.996, 0.999].indexOf(keep)]); g.trait('Turning', few(turn, 0.23, 0.28, ['Gentle', 'Moderate', 'Sharp'])); g.trait('Grid', n);
      let deg = 7, pitch = root + 12, x = R() * n, y = R() * n, th = R() * TAU, acc = 0, left = 1, live = false;
      const paint = () => { brush(g, x, y, rad, col(pitch)); if (x < rad + 1) brush(g, x + n, y, rad, col(pitch)); if (y < rad + 1) brush(g, x, y + n, rad, col(pitch)); };
      const stepNote = () => { const s = R.pick([-2, -1, -1, 1, 1, 2, 0, 3, -4, 4]); deg = U.clamp(deg + s, 0, 18) | 0; const p = root + Math.floor(deg / 7) * 12 + scale[deg % 7]; th += (p - pitch) * turn; pitch = p; left = R.pick([1, 1, 2, 2, 3]); if (live) snd.note(55 + pitch, { dur: beat * left * 0.95, vel: 0.4, wave: tm.wave, cutoff: tm.cutoff, pan: (x / n - 0.5) }); };
      const move = dt => { acc += dt; while (acc > beat) { acc -= beat; if (--left <= 0) stepNote(); } x = mod(x + Math.cos(th) * v, n); y = mod(y + Math.sin(th) * v, n); th += Math.sin(acc * 3) * 0.01; paint(); };
      for (let k = 0; k < 1400; k++) { move(1 / 12); if (k % 4 === 0) U.fadePx(d, keep); }
      live = true;
      return (t, dt) => {
        if (inp.inside) { const want = Math.atan2(wrapD(inp.y * n - y, n), wrapD(inp.x * n - x, n)); th += Math.sin(want - th) * 0.25; }
        if (Math.round(t * 12) % 3 === 0) U.fadePx(d, keep); move(dt);
      };
    },
  });

  // one row of the beating tones: beat frequency df here, time tau running across the row
  // from tau0; the two cosines are stepped along by rotation instead of computed per cell
  function beatRow(d, n, y, df, tau0, ratio, harm, void0, lut, hb, k) {
    const a = Math.PI * df, b = a * ratio, da = a * 6 / n, db = b * 6 / n, ca = Math.cos(da), sa = Math.sin(da), cb = Math.cos(db), sb = Math.sin(db), w = 1 / (1 + harm);
    let c1 = Math.cos(a * tau0), s1 = Math.sin(a * tau0), c2 = Math.cos(b * tau0), s2 = Math.sin(b * tau0);
    for (let x = 0, i = y * n; x < n; x++, i++) {
      const e = ((c1 < 0 ? -c1 : c1) + (c2 < 0 ? -c2 : c2) * harm) * w;
      d[i] = e < void0 ? BLACK : lut[(hb + e * k) & 255];
      const u1 = c1 * ca - s1 * sa; s1 = s1 * ca + c1 * sa; c1 = u1;
      const u2 = c2 * cb - s2 * sb; s2 = s2 * cb + c2 * sb; c2 = u2;
    }
  }

  add({
    name: 'Beats', seed: 2, sizes: [80, 100], fps: 12, music: true,
    interactive: 'Move up and down to tune the second tone and hear the beats change.',
    recipe: 'Two tones beating against each other: across the frame runs time, down it the second tone is tuned from below the first to above it. Where they nearly agree the beats are slow and wide; further away they come faster, so the silent nodes between beats fan out as black curves through bands of colour.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256), y0 = R.range(0.35, 0.65) * n, span = R.range(5, 10), scroll = R.range(0.06, 0.12), k = R.range(120, 260), harm = R.range(0.3, 0.7), ratio = R.pick([2, 1.5, 3]);
        const tm = { wave: g.alt.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: g.alt.range(900, 3000) }, tm2 = { wave: g.alt.pick(['triangle', 'sine', 'square']), cutoff: g.alt.range(900, 3000) }, snd = g.sound, inp = g.input;
        const base = g.alt.pick([196, 220, 247, 262, 294]);
        g.trait('Palette', schemeName(sc0)); g.trait('Overtone', { 2: 'Octave', 1.5: 'Fifth', 3: 'Twelfth' }[ratio]); g.trait('Fan', few(span, 6.7, 8.4, ['Narrow', 'Medium', 'Wide'])); g.trait('Unison row', few(y0 / n, 0.45, 0.55, ['High', 'Middle', 'Low'])); g.trait('Nodes', 'Thin'); g.trait('Grid', n);
        let next = 0, row = 0;
        return (t, dt) => {
          const breathe = 1 + 0.25 * Math.sin(t * 0.09);
          // the row being heard: the pointer's, or a slow sweep; every 1.6 s both tones sound together
          row = inp.inside ? inp.y * n : y0 + Math.sin(t * 0.11) * n * 0.35;
          next -= dt;
          if (next <= 0) { next = 1.6; const df = Math.abs((row - y0) / n * span * breathe) * 1.3; snd.note(0, { freq: base, dur: 1.75, vel: 0.28, wave: 'sine', pan: -0.2 }); snd.note(0, { freq: base + df, dur: 1.75, vel: 0.28, wave: 'sine', pan: 0.2 }); if (harm > 0.5) snd.note(0, { freq: base * ratio, dur: 1.75, vel: 0.12, wave: 'sine' }); }
          for (let y = 0; y < n; y++) beatRow(d, n, y, (y - y0) / n * span * breathe, t * scroll * 6, ratio, harm, 0.1, lut, h0 + y / n * 60, k);
          if (snd.on || inp.inside) { const ry = Math.max(0, Math.min(n - 1, Math.round(row))); for (let x = 0; x < n; x += 2) d[ry * n + x] = WHITE; }
        };
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, snd = g.sound, sc0 = U.scheme(R, 0.65), lut = sc0.lut, h0 = R.range(0, 256), y0 = R.range(0.35, 0.65) * n, span = R.range(4, 12), scroll = R.range(0.06, 0.12), k = R.range(120, 260), harm = R.range(0.3, 0.7), ratio = R.pick([2, 1.5, 3]);
      const base = R.pick([196, 220, 247, 262, 294]), void0 = R.pick([0.08, 0.1, 0.16]);
      g.trait('Palette', schemeName(sc0)); g.trait('Overtone', { 2: 'Octave', 1.5: 'Fifth', 3: 'Twelfth' }[ratio]); g.trait('Fan', few(span, 6.7, 9.3, ['Narrow', 'Medium', 'Wide'])); g.trait('Unison row', few(y0 / n, 0.45, 0.55, ['High', 'Middle', 'Low'])); g.trait('Nodes', { 0.08: 'Fine', 0.1: 'Thin', 0.16: 'Bold' }[void0]); g.trait('Grid', n);
      let next = 0, row = y0 + n * 0.2;
      return (t, dt) => {
        const breathe = 1 + 0.25 * Math.sin(t * 0.09);
        // the row being heard: the pointer's, or a slow sweep; every 1.6 s both tones sound together
        row = inp.inside ? inp.y * n : y0 + Math.sin(t * 0.11) * n * 0.35;
        next -= dt;
        if (next <= 0) { next = 1.6; const df = Math.abs((row - y0) / n * span * breathe) * 1.3; snd.note(0, { freq: base, dur: 1.75, vel: 0.28, wave: 'sine', pan: -0.2 }); snd.note(0, { freq: base + df, dur: 1.75, vel: 0.28, wave: 'sine', pan: 0.2 }); if (harm > 0.5) snd.note(0, { freq: base * ratio, dur: 1.75, vel: 0.12, wave: 'sine' }); }
        for (let y = 0; y < n; y++) beatRow(d, n, y, (y - y0) / n * span * breathe, t * scroll * 6, ratio, harm, void0, lut, h0 + y / n * 60, k);
        const ry = Math.max(0, Math.min(n - 1, Math.round(row)));
        if (snd.on || inp.inside) for (let x = 0; x < n; x += 2) d[ry * n + x] = WHITE;
      };
    },
  });

  add({
    name: 'Four Voices', seed: 2, sizes: [100, 200], fps: 12, music: true,
    interactive: 'Click to move the choir on to the next chord.',
    recipe: 'A chorale for four voices scrolling past: the space between each pair of voices is filled with the colour of the lower one’s note, so bass, tenor, alto and soprano stack up as strata. Chords change every bar and each voice glides to the nearest note of the new chord, never crossing the others.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, col = colours(R), scale = R.pick([MAJOR, MAJOR, MINOR]), root = R.int(0, 11), lo = 34, hi = 82, bar = R.range(1.1, 1.6);
        let deg = 0, chord = triad(scale, root, 0), acc = 0, live = false, tapAt = 9;
        const tm = { wave: g.alt.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: g.alt.range(900, 3000) }, tm2 = { wave: g.alt.pick(['triangle', 'sine', 'square']), cutoff: g.alt.range(900, 3000) }, snd = g.sound, inp = g.input;
        const voices = [40, 52, 59, 66].map(p => p + root), aim = voices.slice(), ranges = [[34, 55], [46, 66], [53, 73], [60, 82]];
        const voice = (Q = R) => {
          deg = Q.pick(MOVES[deg]); chord = triad(scale, root, deg);
          const pcs = chord.map(p => mod(p, 12));
          aim[0] = U.clamp(Math.round((voices[0] - mod(voices[0] - pcs[0], 12) + (mod(voices[0] - pcs[0], 12) > 6 ? 12 : 0))), ranges[0][0], ranges[0][1]);
          for (let v = 1; v < 4; v++) {
            let best = aim[v - 1] + 1, bd = 99;
            for (let p = ranges[v][0]; p <= ranges[v][1]; p++) if (pcs.includes(mod(p, 12)) && p > aim[v - 1] && Math.abs(p - voices[v]) < bd) { bd = Math.abs(p - voices[v]); best = p; }
            aim[v] = best;
          }
          if (live) aim.forEach((p, v) => snd.note(p, { dur: bar * 0.95, vel: v === 0 ? 0.3 : 0.2, wave: tm.wave, cutoff: tm.cutoff, attack: 0.04, pan: (v - 1.5) * 0.3 }));
        };
        const yOf = p => n - 1 - (p - lo) / (hi - lo) * (n - 1);
        g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Voice lines', 'White'); g.trait('Bar', few(bar, 1.27, 1.43, ['Short', 'Medium', 'Long'])); g.trait('Grid', n);
        const column = x => {
          const ys = voices.map(yOf);
          for (let y = 0; y < n; y++) {
            let c;
            if (y > ys[0]) c = X.shade(col(Math.round(voices[0])), 0.3);
            else if (y > ys[1]) c = col(Math.round(voices[0]));
            else if (y > ys[2]) c = col(Math.round(voices[1]));
            else if (y > ys[3]) c = col(Math.round(voices[2]));
            else c = BLACK;
            if (ys.some(v => Math.abs(y - v) < 0.6)) c = y < ys[3] + 1 ? WHITE : BLACK;
            d[y * n + x] = c;
          }
        };
        const step = dt => {
          acc += dt; if (acc > bar) { acc -= bar; voice(); }
          if (inp.taps().length && tapAt > 0.5) { acc = 0; voice(g.alt); tapAt = 0; }
          tapAt += dt;
          for (let v = 0; v < 4; v++) voices[v] += (aim[v] - voices[v]) * 0.35;
          for (let y = 0; y < n; y++) d.copyWithin(y * n, y * n + 1, y * n + n);
          column(n - 1);
        };
        for (let k = 0; k < n; k++) step(1 / 12);
        live = true;
        return (t, dt) => step(dt);
      };
      if (g.home || g.alt() < 0.6) return og(R, U, g);
      const { n, d } = g, inp = g.input, snd = g.sound, col = colours(R), scale = R.pick([MAJOR, MAJOR, MINOR, DORIAN]), root = R.int(0, 11), lo = 34, hi = 82, bar = R.range(0.9, 1.7), tm = timbre(R), lines = R.pick([WHITE, BLACK, 'none']);
      let live = false;
      let deg = 0, chord = triad(scale, root, 0), acc = 0, tapAt = 9;
      const voices = [40, 52, 59, 66].map(p => p + root), aim = voices.slice(), ranges = [[34, 55], [46, 66], [53, 73], [60, 82]];
      const voice = () => {
        deg = R.pick(MOVES[deg]); chord = triad(scale, root, deg);
        const pcs = chord.map(p => mod(p, 12));
        aim[0] = U.clamp(Math.round((voices[0] - mod(voices[0] - pcs[0], 12) + (mod(voices[0] - pcs[0], 12) > 6 ? 12 : 0))), ranges[0][0], ranges[0][1]);
        for (let v = 1; v < 4; v++) {
          let best = aim[v - 1] + 1, bd = 99;
          for (let p = ranges[v][0]; p <= ranges[v][1]; p++) if (pcs.includes(mod(p, 12)) && p > aim[v - 1] && Math.abs(p - voices[v]) < bd) { bd = Math.abs(p - voices[v]); best = p; }
          aim[v] = best;
        }
        if (live) aim.forEach((p, v) => snd.note(p, { dur: bar * 0.95, vel: v === 0 ? 0.3 : 0.2, wave: tm.wave, cutoff: tm.cutoff, attack: 0.04, pan: (v - 1.5) * 0.3 }));
      };
      const yOf = p => n - 1 - (p - lo) / (hi - lo) * (n - 1);
      g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Voice lines', lines === 'none' ? 'None' : lines === WHITE ? 'White' : 'Dark'); g.trait('Bar', few(bar, 1.17, 1.43, ['Short', 'Medium', 'Long'])); g.trait('Grid', n);
      const column = x => {
        const ys = voices.map(yOf);
        for (let y = 0; y < n; y++) {
          let c;
          if (y > ys[0]) c = X.shade(col(Math.round(voices[0])), 0.3);
          else if (y > ys[1]) c = col(Math.round(voices[0]));
          else if (y > ys[2]) c = col(Math.round(voices[1]));
          else if (y > ys[3]) c = col(Math.round(voices[2]));
          else c = BLACK;
          if (lines !== 'none' && ys.some(v => Math.abs(y - v) < 0.6)) c = y < ys[3] + 1 ? WHITE : lines;
          d[y * n + x] = c;
        }
      };
      const step = dt => {
        acc += dt; if (acc > bar) { acc -= bar; voice(); }
        if (inp.taps().length && tapAt > 0.5) { acc = 0; voice(); tapAt = 0; }
        tapAt += dt;
        for (let v = 0; v < 4; v++) voices[v] += (aim[v] - voices[v]) * 0.35;
        for (let y = 0; y < n; y++) d.copyWithin(y * n, y * n + 1, y * n + n);
        column(n - 1);
      };
      for (let k = 0; k < n; k++) step(1 / 12);
      live = true;
      return (t, dt) => step(dt);
    },
  });

  // Bessel functions J_n(b) for the FM piece, built once: orders 0..24, b in 0..24
  let JT = null;
  const besselTable = () => {
    if (JT) return JT;
    const K = 25, S = 240, Q = 64;
    JT = Array.from({ length: K }, () => new Float32Array(S + 1));
    for (let k = 0; k < K; k++) for (let s = 0; s <= S; s++) {
      const b = s / S * 24; let sum = 0;
      for (let q = 0; q <= Q; q++) { const tau = q / Q * Math.PI, w = q === 0 || q === Q ? 0.5 : 1; sum += w * Math.cos(k * tau - b * Math.sin(tau)); }
      JT[k][s] = sum / Q;
    }
    return JT;
  };

  add({
    name: 'FM Sidebands', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'The spectrum of an FM synthesiser as its modulation deepens: across the frame are the sidebands round the carrier, down it the modulation index. Each column rises and falls with its Bessel function, so ripples fan out from the centre in hue by strength and sign, while the whole map drifts as if the patch were being played.',
    make(R, U, g) {
      const { n, d } = g, J = besselTable(), K = R.pick([10, 12, 16]), cw = n / (2 * K + 1), lut = U.scheme(R, 0.6).lut, h0 = R.range(0, 256), span = R.range(6, 14), sp = R.range(0.12, 0.3), gamma = R.range(0.45, 0.7);
      return t => {
        const off = 1 + (t * sp) % (24 - span - 1);
        for (let y = 0; y < n; y++) {
          const b = off + y / n * span, s = b / 24 * 240, s0 = Math.floor(s), f = s - s0;
          for (let x = 0; x < n; x++) {
            const k = Math.floor(x / cw) - K, ak = Math.abs(k), j = J[ak][s0] * (1 - f) + J[ak][Math.min(240, s0 + 1)] * f, v = k < 0 && ak & 1 ? -j : j, m = Math.abs(v);
            d[y * n + x] = m < 0.035 ? BLACK : X.shade(lut[(h0 + (v > 0 ? 0 : 128) + b * 6) & 255], Math.min(1, Math.pow(m * 2.4, gamma)));
          }
        }
      };
    },
  });

  add({
    name: 'Phasing', seed: 3, sizes: [80, 100], fps: 12,
    recipe: 'Two players repeat the same twelve-note figure, one a hair faster, as in a phase piece. Each row is one bar: the top half of each cell is the first player’s note and the bottom half the second’s, sliding a fraction further every bar; where the two meet on the same note the cell burns white, and every so often they lock into a new canon.',
    make(R, U, g) {
      const { n, d } = g, col = colours(R), scale = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), cw = n / 24, rh = n / 25, drift = R.range(1 / 14, 1 / 8), bar = R.range(0.5, 0.75);
      const fig = Array.from({ length: 12 }, () => root + scale[R.int(0, 6)]);
      let rows = [], acc = 0, phase = 0;
      for (let k = 0; k < 26; k++) { rows.push(phase); phase = (phase + drift) % 12; }
      return (t, dt) => {
        acc += dt; while (acc > bar) { acc -= bar; rows.push(phase); phase = (phase + drift) % 12; if (rows.length > 27) rows.shift(); }
        const sh = acc / bar * rh;
        d.fill(BLACK);
        rows.forEach((ph, r) => {
          const y0 = Math.round(n - (rows.length - r) * rh + rh - sh), half = Math.max(1, Math.round(rh / 2));
          for (let yy = 0; yy < Math.round(rh); yy++) {
            const Y = y0 + yy; if (Y < 0 || Y >= n) continue;
            for (let x = 0; x < n; x++) {
              const a = fig[Math.floor(x / cw) % 12], b = fig[mod(Math.floor(x / cw + ph), 12)];
              d[Y * n + x] = yy === Math.round(rh) - 1 && rh > 3 ? BLACK : a === b ? WHITE : yy < half ? col(a) : X.shade(col(b), 0.7);
            }
          }
        });
      };
    },
  });

  add({
    name: 'Change Ringing', seed: 1, sizes: [100, 200], fps: 12,
    recipe: 'Bells rung in changes, as in an English tower: each row is one round of the bells, and between rows pairs of neighbours swap places by a fixed method. Every bell keeps its colour, so their paths weave down the frame as zigzag ribbons, with the treble’s line in white.',
    make(R, U, g) {
      const { n, d } = g, Bn = R.pick([6, 8, 8, 10]), cw = Math.floor(n / Bn), ox = (n - cw * Bn) >> 1, rh = Math.max(2, Math.round(n / 50)), sc = U.scheme(R, 0.6), o = R(), cols = Array.from({ length: Bn }, (_, k) => U.pk(U.ramp(sc.cols, o + k / Bn, true))), every = R.range(0.2, 0.32);
      const lead = [];
      const kind = R.pick(['bob', 'bob', 'hunt']);
      for (let k = 0; k < Bn; k++) { lead.push('x'); lead.push(k === Bn - 1 && kind === 'bob' ? [0, 1] : [0, Bn - 1]); }
      let row = Array.from({ length: Bn }, (_, k) => k), ci = 0;
      const change = () => {
        const pn = lead[ci++ % lead.length], nx = row.slice();
        for (let p = 0; p < Bn;) { if (pn !== 'x' && pn.includes(p)) { p++; continue; } if (p + 1 < Bn && !(pn !== 'x' && pn.includes(p + 1))) { nx[p] = row[p + 1]; nx[p + 1] = row[p]; p += 2; } else p++; }
        row = nx; return row;
      };
      const rows = [];
      for (let k = 0; k < Math.ceil(n / rh) + 2; k++) rows.push(change());
      let acc = 0;
      return (t, dt) => {
        acc += dt; while (acc > every) { acc -= every; rows.push(change()); rows.shift(); }
        const sh = Math.floor(acc / every * rh);
        d.fill(BLACK);
        rows.forEach((r, j) => {
          const y0 = j * rh - sh;
          r.forEach((bell, p) => X.rect(g, ox + p * cw + 1, y0, cw - 2, rh, bell === 0 ? WHITE : cols[bell]));
        });
      };
    },
  });

  add({
    name: 'Harmony Tiles', seed: 5, sizes: [100, 200], fps: 12, music: true,
    interactive: 'Click a tile to hear its chord again.',
    recipe: 'A chord progression laid out like a page of tiles, one tile per chord: inside each tile the twelve pitch classes sit in circle-of-fifths order, and the chord’s notes light in their colours. Tiles fill row by row, older ones dimming, and when the page is full it moves up a row to make room.',
    make(R, U, g) {
      // the original, exactly (same draws from R), on the opening variation and on most rolls
      const og = (R, U, g) => {
        const { n, d } = g, per = 5, T = Math.floor(n / per), ox = (n - T * per) >> 1, cs = Math.floor((T - 3) / 4), ch = Math.floor((T - 3) / 3), col = colours(R, 0.75), scale = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), beat = R.range(0.45, 0.7);
        let deg = 0, tiles = [], acc = 0, fade = 1, full = 0;
        const tm = { wave: g.alt.pick(['triangle', 'triangle', 'sine', 'square', 'sawtooth']), cutoff: g.alt.range(900, 3000) }, tm2 = { wave: g.alt.pick(['triangle', 'sine', 'square']), cutoff: g.alt.range(900, 3000) }, snd = g.sound, inp = g.input;
        const play = (pcs, vel) => { snd.note(48 + pcs[0], { dur: beat * 1.6, vel: vel * 1.2, wave: tm.wave, cutoff: tm.cutoff * 0.7 }); pcs.forEach((pc, k) => snd.note(60 + pc + (k && pc < pcs[0] ? 12 : 0), { dur: beat * 1.4, vel, wave: tm.wave, cutoff: tm.cutoff, at: k * 0.02 })); };
        const chord = () => {
          deg = R.pick(MOVES[deg]);
          const pcs = triad(scale, root, deg).map(p => mod(p, 12));
          if (R() < 0.35) pcs.push(mod(root + scale[(deg + 6) % 7], 12));
          if (R() < 0.15) pcs.push(mod(root + scale[(deg + 1) % 7], 12));
          return pcs;
        };
        g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Page', per + ' by ' + per); g.trait('Tile', 'Grid of fifths'); g.trait('Grid', n);
        for (let k = 0; k < 16; k++) tiles.push({ pcs: chord(), at: -k * beat });
        tiles.reverse();
        return (t, dt) => {
          acc += dt;
          let tc = 0;
          for (const tap of inp.taps()) { const k = Math.floor((tap.y * n - ox) / T) * per + Math.floor((tap.x * n - ox) / T); if (tiles[k] && tc < 4) { if (!tc) play(tiles[k].pcs, 0.25); tiles[k].at = t; tc++; } }
          if (acc > beat) { acc -= beat; if (tiles.length >= per * per) tiles.splice(0, per); tiles.push({ pcs: chord(), at: t }); play(tiles[tiles.length - 1].pcs, 0.2); }   // a full page moves up a row
          d.fill(BLACK);
          tiles.forEach((tl, k) => {
            const x0 = ox + (k % per) * T + 2, y0 = ox + (k / per | 0) * T + 2, age = t - tl.at, b = (0.8 + 0.2 * Math.exp(-age / 4)) * fade, latest = k === tiles.length - 1, ground = X.shade(col(tl.pcs[0]), 0.22 * fade);
            X.rect(g, x0 - 1, y0 - 1, T - 2, T - 2, ground);
            for (let q = 0; q < 12; q++) {
              const pc = mod(q * 7, 12), on = tl.pcs.includes(pc), c = on ? X.shade(col(pc), b) : BLACK;
              X.rect(g, x0 + (q % 4) * cs, y0 + (q / 4 | 0) * ch, cs - 1, ch - 1, c);
            }
            if (latest) { X.rect(g, x0 - 2, y0 - 2, T, 1, WHITE); X.rect(g, x0 - 2, y0 + T - 3, T, 1, WHITE); }
          });
        };
      };
      if (g.home || g.alt() < 0.4) return og(R, U, g);   // the original look on 40% of rolls, new looks otherwise
      const { n, d } = g, inp = g.input, snd = g.sound, tm = timbre(R), per = R.pick([4, 5, 5, 6]), T = Math.floor(n / per), ox = (n - T * per) >> 1, cs = Math.floor((T - 3) / 4), ch = Math.floor((T - 3) / 3), col = colours(R, 0.75), scale = R.pick([MAJOR, MINOR, DORIAN]), root = R.int(0, 11), beat = R.range(0.45, 0.7);
      let deg = 0, tiles = [], acc = 0, fade = 1, full = 0;
      const chord = () => {
        deg = R.pick(MOVES[deg]);
        const pcs = triad(scale, root, deg).map(p => mod(p, 12));
        if (R() < 0.35) pcs.push(mod(root + scale[(deg + 6) % 7], 12));
        if (R() < 0.15) pcs.push(mod(root + scale[(deg + 1) % 7], 12));
        return pcs;
      };
      const clock = g.alt.bool(0.4), clk = Array.from({ length: 12 }, (_, q) => { const a = q / 12 * Math.PI * 2 - Math.PI / 2, r = (T - 4) * 0.36; return [Math.round((T - 4) / 2 + Math.cos(a) * r), Math.round((T - 4) / 2 + Math.sin(a) * r)]; }), dotS = Math.max(1, Math.round((T - 4) * 0.16));
      g.trait('Palette', colName(col)); g.trait('Key', KEYS[root] + ' ' + modeName(scale).toLowerCase()); g.trait('Page', per + ' by ' + per); g.trait('Tile', clock ? 'Clock of fifths' : 'Grid of fifths'); g.trait('Grid', n);
      for (let k = 0; k < 16; k++) tiles.push({ pcs: chord(), at: -k * beat });
      tiles.reverse();
      const play = (pcs, vel) => { snd.note(48 + pcs[0], { dur: beat * 1.6, vel: vel * 1.2, wave: tm.wave, cutoff: tm.cutoff * 0.7 }); pcs.forEach((pc, k) => snd.note(60 + pc + (k && pc < pcs[0] ? 12 : 0), { dur: beat * 1.4, vel, wave: tm.wave, cutoff: tm.cutoff, at: k * 0.02 })); };
      return (t, dt) => {
        acc += dt;
        let tc = 0;
        for (const tap of inp.taps()) { const k = Math.floor((tap.y * n - ox) / T) * per + Math.floor((tap.x * n - ox) / T); if (tiles[k] && tc < 4) { if (!tc) play(tiles[k].pcs, 0.25); tiles[k].at = t; tc++; } }
        if (acc > beat) { acc -= beat; if (tiles.length >= per * per) tiles.splice(0, per); const pcs = chord(); tiles.push({ pcs, at: t }); play(pcs, 0.2); }   // a full page moves up a row
        d.fill(BLACK);
        tiles.forEach((tl, k) => {
          const x0 = ox + (k % per) * T + 2, y0 = ox + (k / per | 0) * T + 2, age = t - tl.at, b = (0.8 + 0.2 * Math.exp(-age / 4)) * fade, latest = k === tiles.length - 1, ground = X.shade(col(tl.pcs[0]), 0.22 * fade);
          X.rect(g, x0 - 1, y0 - 1, T - 2, T - 2, ground);
          for (let q = 0; q < 12; q++) {
            const pc = mod(q * 7, 12), on = tl.pcs.includes(pc), c = on ? X.shade(col(pc), b) : BLACK;
            if (clock) X.rect(g, x0 + clk[q][0] - (dotS >> 1), y0 + clk[q][1] - (dotS >> 1), dotS, dotS, c);
            else X.rect(g, x0 + (q % 4) * cs, y0 + (q / 4 | 0) * ch, cs - 1, ch - 1, c);
          }
          if (latest) { X.rect(g, x0 - 2, y0 - 2, T, 1, WHITE); X.rect(g, x0 - 2, y0 + T - 3, T, 1, WHITE); }
        });
      };
    },
  });

  add({
    name: 'Resonance Field', seed: 4, sizes: [80, 100], fps: 12,
    recipe: 'Every cell is a tuned resonator, its natural pitch set by the product of its row and column through a remainder, as in the originals. A slow progression of chords sounds through the field and only the cells tuned near a chord tone or one of its overtones ring, in that tone’s colour, so bands of resonance shift with each chord.',
    make(R, U, g) {
      const { n, d } = g, N = n * n, col = colours(R), scale = R.pick([MAJOR, MINOR]), root = R.int(0, 11), a = R.range(0.002, 0.008), m = R.range(4, 7), Q = R.range(14, 30), bar = R.range(2, 3.2);
      const f0 = new Float32Array(N);
      let deg = 0, cur = triad(scale, root, 0), from = cur.slice(), at = 0;
      return (t, dt) => {
        if (t - at > bar) { at = t; from = cur; deg = R.pick(MOVES[deg]); cur = triad(scale, root, deg); }
        const u = U.smooth(U.clamp((t - at) / 0.6)), tones = cur.map((p, k) => from[k] + (p - from[k]) * u), ratios = tones.map(p => Math.pow(2, (p - tones[0]) / 12)), cols = tones.map(p => col(Math.round(p)));
        const drift = 1 + 0.15 * Math.sin(t * 0.05);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) f0[y * n + x] = 1 + mod((x + 1) * (y + 1) * a * drift, m);
        for (let i = 0; i < N; i++) {
          const f = f0[i];
          let best = 0, which = 0;
          for (let k = 0; k < 3; k++) for (let h = 1; h <= 3; h++) { const z = f / (h * ratios[k]) - 1, r = 1 / (1 + Q * Q * z * z) / h; if (r > best) { best = r; which = k; } }
          d[i] = best < 0.12 ? BLACK : X.shade(cols[which], Math.min(1, 0.35 + best));
        }
      };
    },
  });
})();
