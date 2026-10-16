// Synaesthesia engine: one parametric renderer that reproduces every 2023 p5
// sketch in this repo cell-for-cell, plus the trait tables and seeded
// generator used to mint new outputs from a token hash.
(function () {
  const W = 800, H = 800;
  const WHITE = [255, 255, 255]; // p5's default fill before the first cell
  const BLACK = [0, 0, 0];       // the sketches' void cells: fill(8, 85, 0)

  // p5 1.x colorMode(HSB, 100) -> 0-255 levels, quirks included: components
  // clamp to [0, 1] (hue never wraps), and a NaN hue makes an invalid CSS
  // colour that the canvas ignores, so the previous fill carries over (null).
  function hsbLevels(h, s, b) {
    let hue = h / 100, sat = s / 100, val = b / 100;
    if (hue < 0) hue = 0; else if (hue > 1) hue = 1;
    if (sat < 0) sat = 0; else if (sat > 1) sat = 1;
    if (val < 0) val = 0; else if (val > 1) val = 1;
    if (hue !== hue) return null;
    let r, g, bl;
    if (sat === 0) {
      r = g = bl = val;
    } else {
      hue *= 6;
      const sector = Math.floor(hue);
      const t1 = val * (1 - sat);
      const t2 = val * (1 - sat * (hue - sector));
      const t3 = val * (1 - sat * (1 + sector - hue));
      if (sector === 1) { r = t2; g = val; bl = t1; }
      else if (sector === 2) { r = t1; g = val; bl = t3; }
      else if (sector === 3) { r = t1; g = t2; bl = val; }
      else if (sector === 4) { r = t3; g = t1; bl = val; }
      else if (sector === 5) { r = val; g = t1; bl = t2; }
      else { r = val; g = t3; bl = t1; }
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(bl * 255)];
  }

  // The hue formula shared by every sketch. Operation order mirrors the
  // originals exactly (e.g. `i * x*0.05 % y*0.1` is ((i*x)*0.05 % y)*0.1), so
  // the genesis genomes reproduce their sketches bit for bit.
  // `f` holds the per-frame constants (b, k, h0), which a Dreaming mind
  // modulates; for everything else they are the genome's own values.
  function cellLevels(g, f, i, x, y) {
    // `op` (new species only) changes what time multiplies: x xor y, or x + y.
    const X = g.op === 'xor' ? ((x * g.xm + (f.sc || 0)) ^ y) : g.op === 'sum' ? (x * g.xm + y) : (x * g.xm);
    const v = ((i * g.m1 * X) * g.a % (y / g.yd)) * f.b;
    let hue;
    if (g.field === 'raw') hue = v;
    else if (g.field === 'linear') hue = f.h0 + v;
    else if (g.field === 'log') hue = f.h0 + Math.log(v) * f.k;
    else if (g.field === 'sin') hue = f.h0 + Math.sin(v) * f.k;
    else if (g.field === 'tan') hue = f.h0 + Math.tan(v) * f.k;
    else if (g.field === 'sqrt') hue = f.h0 + Math.sqrt(v) * f.k;
    else hue = f.h0 + Math.acos(v) * f.k;
    if (g.void && (hue > 95 || hue < 1)) return g.colors ? g.paper : BLACK;
    if (g.drift) hue = ((hue + f.dr) % 100 + 100) % 100;
    if (!g.colors) return hsbLevels(hue, g.sat, g.bri);
    // Named palettes: the clamped hue picks a swatch, cycling `bands` times.
    if (hue !== hue) return null;
    const t = hue < 0 ? 0 : hue > 100 ? 1 : hue / 100, n = g.colors.length;
    return g.colors[Math.floor(t * g.bands * n) % n];
  }

  const sigmoid = z => 1 / (1 + Math.exp(-z));

  // Dreaming (after Axons): a tiny seeded sigmoid network, fed a slow periodic
  // clock, nudges the field's scale, contrast and base hue as the piece runs.
  function frameConstants(g, fc) {
    const f = mindConstants(g, fc);
    // Candidate species: `drift` turns every hue smoothly round the wheel,
    // `scroll` slides the xor pattern sideways (both per frame/tempo).
    if (g.drift || g.scroll) { const tt = fc / g.speed; f.dr = (g.drift || 0) * tt; f.sc = (g.scroll || 0) * tt; }
    return f;
  }

  function mindConstants(g, fc) {
    const h0 = g.cycle ? (fc % 100) + g.h0 : g.h0;
    if (!g.mind) return { b: g.b, k: g.k, h0 };
    const { w1, b1, w2, b2 } = g.mind;
    const input = [Math.sin(fc * 0.021), Math.cos(fc * 0.013)];
    const hidden = b1.map((bias, j) => sigmoid(bias + w1[j][0] * input[0] + w1[j][1] * input[1]));
    const out = b2.map((bias, o) => sigmoid(bias + w2[o].reduce((s, w, j) => s + w * hidden[j], 0)));
    return { b: g.b * (0.8 + 0.4 * out[0]), k: g.k * (0.8 + 0.4 * out[1]), h0: h0 + 20 * (out[2] - 0.5) };
  }

  // A fixed per-cell coin flip, so Eroded cells stay put while the piece plays.
  function cellNoise(x, y, seed) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1274126177)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1103515245);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  // New species may read the field through other coordinates, all measured
  // from the canvas centre (cx, cy in 0-1, default the middle) and returned in
  // the originals' ranges (x about 0-800, y offset by ys) so the same constants
  // behave: polar = radius and angle, diag = the grid turned 45°, kaleido =
  // folded into four mirrored quarters, rings = radius for both.
  function remap(g, px, py, tt) {
    const sx = px - W * (g.cx ?? 0.5), sy = py - H * (g.cy ?? 0.5);
    let u, w;
    if (g.coord === 'polar') {
      const th = Math.atan2(sy, sx);
      u = Math.hypot(sx, sy); w = (th + Math.PI) / (2 * Math.PI) * 800 * (g.spin || 1);
    }
    else if (g.coord === 'diag') { u = (sx + sy + 800) / 2; w = (sx - sy + 800) / 2; }
    else if (g.coord === 'kaleido') { u = Math.abs(sx) * 2; w = Math.abs(sy) * 2; }
    else { u = Math.hypot(sx, sy); w = u; }
    return [u + g.xs, w + g.ys];
  }

  function eachCell(g, fc, carry, fn) {
    // `tr` (candidate species only) speeds time up without changing the pattern.
    const i = g.tr ? g.fs + fc / g.speed * g.tr : g.fs + fc / g.speed;
    const f = frameConstants(g, fc);
    const p = g.pixel;
    let cur = carry;
    for (let x = g.xs; x < W + g.xs; x += p) {
      for (let y = g.ys; y < H + g.ys; y += p) {
        let c = g.coord ? cellLevels(g, f, i, ...remap(g, x - g.xs + p / 2, y - g.ys + p / 2, fc / g.speed)) : cellLevels(g, f, i, x, y);
        if (g.erode && cellNoise(x, y, g.erode) < 0.25) c = g.colors ? g.paper : BLACK;
        if (c) cur = c;
        let px = x - g.xs, py = y - g.ys;
        if (g.transpose) { const t = px; px = py; py = t; }
        if (g.mirror) px = W - p - px;
        fn(px, py, cur);
      }
    }
    return cur;
  }

  const css = c => 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';

  // Drafting Paper (after BLU3PRINTS): tens of thousands of faint 1-2px
  // strokes in the palette's texture tint, drawn once per piece and reused.
  const textures = new Map();
  function texture(surface) {
    const key = surface.seed + ':' + surface.tint.join(',');
    if (textures.has(key)) return textures.get(key);
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    let t = surface.seed >>> 0;
    const rand = () => { // mulberry32, the generator BLU3PRINTS itself uses
      t = (t + 0x6D2B79F5) | 0;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
    ctx.lineWidth = 1;
    for (let n = 0; n < 60000; n++) {
      ctx.strokeStyle = 'rgba(' + surface.tint.join(',') + ',' + ((5 * rand() + 5) / 255).toFixed(3) + ')';
      const x = rand() * W, y = rand() * H, a = rand() * Math.PI * 2, len = rand() + 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
      ctx.stroke();
    }
    textures.set(key, cv);
    return cv;
  }

  // Draws frame `fc` (1-based, like p5's frameCount). `state.fill` carries the
  // last fill between frames, as p5 does.
  function drawFrame(ctx, g, fc, state) {
    const p = g.pixel;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    state.fill = eachCell(g, fc, state.fill || WHITE, (px, py, c) => {
      ctx.fillStyle = css(c);
      ctx.fillRect(px, py, p, p);
    });
    if (g.surface) ctx.drawImage(texture(g.surface), 0, 0);
    if (g.frame === 'none') return;
    // The originals' border reuses whatever fill the last cell left behind.
    ctx.fillStyle = g.frame === 'ink' ? '#000' : css(state.fill);
    ctx.fillRect(0, 0, p, H);
    ctx.fillRect(W - p, 0, p * 2, H);
    ctx.fillRect(0, 0, W, p);
    ctx.fillRect(0, H - p, W, p);
  }

  // ---- measured traits -------------------------------------------------

  const FAMILIES = ['Crimson', 'Ember', 'Gold', 'Verdant', 'Lagoon', 'Cobalt', 'Violet', 'Magenta', 'Mono'];
  const FAMILY_EDGES = [15, 40, 70, 165, 200, 255, 290, 345]; // upper bound in degrees

  function family(c) {
    const r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
    const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
    if (d < 0.1) return 8; // greys, black and white
    let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    if (h >= 345) return 0;
    return FAMILY_EDGES.findIndex(edge => h < edge);
  }

  // Samples a few frames across the loop and summarises what a viewer sees.
  function measure(g, frames = [1, 40, 80]) {
    let cells = 0, black = 0, carry = WHITE, prev = null, edge = 0;
    const voidColor = g.colors ? g.paper : BLACK;
    const sum = [0, 0, 0], sq = [0, 0, 0];
    const fam = new Array(FAMILIES.length).fill(0);
    const counts = new Map();
    for (const fc of frames) {
      carry = eachCell(g, fc, carry, (px, py, c) => {
        cells++;
        for (let ch = 0; ch < 3; ch++) { sum[ch] += c[ch]; sq[ch] += c[ch] * c[ch]; }
        if (prev) edge += Math.abs(c[0] - prev[0]) + Math.abs(c[1] - prev[1]) + Math.abs(c[2] - prev[2]);
        prev = c;
        if (c === voidColor) black++;
        else fam[family(c)]++;
        const key = (c[0] << 16) | (c[1] << 8) | c[2];
        counts.set(key, (counts.get(key) || 0) + 1);
      });
    }
    const blackShare = black / cells;
    // spread: colour standard deviation across the canvas; detail: mean change
    // between neighbouring cells. Together they separate patterns from flat fills.
    const spread = Math.sqrt([0, 1, 2].reduce((v, ch) => v + sq[ch] / cells - (sum[ch] / cells) ** 2, 0) / 3);
    const detail = edge / cells / 3;
    const topShare = Math.max(...counts.values()) / cells;
    const colored = cells - black || 1;
    const shares = fam.map(n => n / colored);
    const order = shares.map((s, idx) => idx).sort((a, b) => shares[b] - shares[a]);
    let tone;
    if (shares[order[0]] >= 0.6) tone = FAMILIES[order[0]];
    else if (shares.filter(s => s >= 0.1).length >= 4) tone = 'Spectrum';
    else tone = [order[0], order[1]].sort((a, b) => a - b).map(idx => FAMILIES[idx]).join(' & ');
    const voidLabel = blackShare < 0.01 ? 'None' : blackShare < 0.15 ? 'Trace' : blackShare < 0.5 ? 'Shadowed' : blackShare < 0.8 ? 'Eclipse' : 'Abyss';
    return { blackShare, topShare, spread, detail, tone, void: voidLabel };
  }

  // Rejects outputs a collector would call broken: almost all black, one flat
  // colour, or so little colour variation that it reads as a plain fill.
  const healthy = m => m.blackShare < 0.92 && m.topShare < 0.8 && m.spread >= 16 && m.detail >= 8;

  // ---- trait tables ------------------------------------------------------

  const TEMPO = [
    { name: 'Frantic', speed: 1, w: 22 },
    { name: 'Lively', speed: 2, w: 26 },
    { name: 'Steady', speed: 5, w: 22 },
    { name: 'Calm', speed: 10, w: 18 },
    { name: 'Glacial', speed: 20, w: 12 },
  ];
  const GRAIN = [
    { name: 'Ultrafine', pixel: 5, w: 2 },
    { name: 'Fine', pixel: 8, w: 6 },
    { name: 'Standard', pixel: 10, w: 85.5 },
    { name: 'Coarse', pixel: 16, w: 5 },
    { name: 'Chunky', pixel: 20, w: 0.5 },
    { name: 'Monolith', pixel: 40, w: 1 },
  ];
  const ORIENTATION = [
    { name: 'Upright', transpose: false, mirror: false, w: 45 },
    { name: 'Sideways', transpose: true, mirror: false, w: 33 },
    { name: 'Mirrored', transpose: false, mirror: true, w: 14 },
    { name: 'Sideways Mirrored', transpose: true, mirror: true, w: 8 },
  ];
  const FINISH = [
    { name: 'Vivid', sat: 85, bri: 90, w: 75 },
    { name: 'Neon', sat: 100, bri: 100, w: 25 },
  ];
  const FRAME = [
    { name: 'Echo', frame: 'echo', w: 75, note: 'border takes the colour of the last cell drawn (the original behaviour)' },
    { name: 'Bare', frame: 'none', w: 18, note: 'no border' },
    { name: 'Ink', frame: 'ink', w: 7, note: 'black border' },
  ];

  // Native keeps the sketches' own HSB colour (60%). Senses (33%) are this
  // collection's own palettes, each named for the sense or sound it evokes.
  // Then the BLU3PRINTS (2022) palettes, rare at 5% together in its own ratios:
  // each was ink lines on a coloured ground, so here it becomes a four-step
  // ramp from ground to ink, voids show the ground, and its texture tint feeds
  // Drafting Paper. Last, very rare (2% together, in Filaments' ratios), the sixteen Filaments (2021)
  // palettes; Oodles, Denza and Splatter had white grounds, so their voids
  // turn white. Names, colours and weights are read from the contracts
  // (BLU3PRINTS and Filaments).
  const hex = h => [1, 3, 5].map(n => parseInt(h.slice(n, n + 2), 16));
  const grey = v => [v, v, v];
  const ramp = (bg, ink) => [0, 0.34, 0.67, 1].map(t => bg.map((v, n) => Math.round(v + (ink[n] - v) * t)));
  const FIL = (name, filamentsWeight, colors, paper) => ({ name, w: filamentsWeight * 0.02, colors: colors.map(hex), paper: paper ? grey(255) : grey(0), tint: grey(200), source: 'Filaments' });
  const BLU = (name, bluWeight, bg, ink, tint) => {
    const [b, i] = [bg, ink].map(c => typeof c === 'string' ? hex(c) : grey(c));
    return { name, w: bluWeight * 5 / 9400, colors: ramp(b, i), paper: b, tint, source: 'BLU3PRINTS' };
  };
  // BLU3PRINTS' h2r(): hue in degrees, saturation and value in 0-1.
  const hsv = (h, s, v) => [5, 3, 1].map(n => { const k = (n + h / 60) % 6; return Math.round(255 * (v - v * s * Math.max(Math.min(k, 4 - k, 1), 0))); });
  const SEN = (name, w, colors) => ({ name, w, colors: colors.map(hex), paper: grey(0), tint: grey(200), source: 'Senses' });
  const PALETTE = [
    { name: 'Native', w: 60, colors: null, note: 'the sketches’ own HSB hue' },
    SEN('Neon Hum', 6, ['#00f5d4', '#f15bb5', '#fee440', '#9b5de5', '#00bbf9']),
    SEN('Middle C', 5, ['#ff2e2e', '#ff7a1a', '#ffd23f', '#fff3c4']),
    SEN('Treble', 5, ['#caf0f8', '#90e0ef', '#00b4d8', '#0077b6']),
    SEN('Bass', 4, ['#12002b', '#3a0ca3', '#7209b7', '#b5179e']),
    SEN('Citrus', 4, ['#f9f871', '#c2f970', '#44d492', '#0b8a6f']),
    SEN('Velvet', 3, ['#2b0a1e', '#6a1b4d', '#b23a48', '#f2a7b5']),
    SEN('Petrichor', 3, ['#2f3e46', '#52796f', '#84a98c', '#cad2c5']),
    SEN('Ultraviolet', 1.5, ['#10002b', '#5a189a', '#9d4edd', '#e0aaff']),
    SEN('Cymbal', 1, ['#fdf0d5', '#e9c46a', '#b08968', '#3d2c1e']),
    SEN('Static', 0.5, ['#f8f9fa', '#adb5bd', '#495057', '#212529']),
    BLU('Standard (Light)', 900, 238, '#009be1', grey(200)),
    BLU('Dark Mode', 900, '#252524', '#b5baff', [81, 86, 155]),
    BLU('Type 2', 900, '#333a57', 255, [81, 86, 155]),
    BLU('Standard (BLU3)', 800, '#2a5896', 255, [80, 126, 188]),
    BLU('Pool Table', 300, '#0b6633', 255, [19, 240, 95]),
    BLU('Electric', 300, '#ffe023', '#3c3e18', [204, 179, 27]),
    BLU('Parchment', 300, '#dfc6a9', '#2a1807', [103, 57, 11]),
    BLU('Force', 700, '#972929', 17, [94, 29, 29]),
    BLU('B&W', 100, 17, 221, grey(100)),
    BLU('Rusted', 100, '#fe8d00', '#081c2a', [177, 98, 0]),
    BLU('Sky', 400, '#009be1', 255, grey(200)),
    BLU('Pink', 100, '#e3a0be', 17, grey(200)),
    { name: 'Digital', w: 3600 * 5 / 9400, digital: true, colors: null, source: 'BLU3PRINTS', note: 'one random hue per piece, dark ground to bright ink' },
    FIL('Oodles', 1, ['#ffa4d5', '#83ffc1', '#ffe780', '#99e2ff'], true),
    FIL('Loot', 1, ['#ffffff', '#000000']),
    FIL('Denza', 1, ['#305e90', '#db4e54', '#4f3c2d', '#ffbb12', '#389894', '#e0d8c5', '#c7e3d4'], true),
    FIL('Ghost', 1, ['#0827f5', '#3751f7', '#8493fa']),
    FIL('Splatter', 1, ['#00c1ff', '#0023ff', '#7215ff', '#ff03fc', '#ff000a', '#ff8700', '#fff700', '#5fff00', '#00ff2e'], true),
    FIL('Matrix', 6, ['#00e000', '#005900', '#000000']),
    FIL('Lava', 6, ['#9d0208', '#d00000', '#e85d04', '#faa307']),
    FIL('Rich', 6, ['#fff69f', '#fdd870', '#d0902f', '#a15501', '#351409']),
    FIL('Alien', 6, ['#a0ffe3', '#65dc98', '#8d8980', '#575267', '#222035']),
    FIL('Blurple', 6, ['#0099ff', '#5655dd', '#8822ff', '#aa99ff']),
    FIL('Retrofuture', 6, ['#7700a6', '#fe00fe', '#defe47', '#00b3fe', '#0016ee']),
    FIL('Surf', 10, ['#c4ffff', '#08deea', '#1261d1']),
    FIL('Love', 10, ['#ff124f', '#ff00a0', '#fe75fe', '#7a04eb', '#120458']),
    FIL('Dark', 10, ['#111111', '#222222', '#333333', '#444444', '#666666']),
    FIL('Candy', 13, ['#f887ff', '#de004e', '#860029', '#321450', '#29132e']),
    FIL('Cold Blooded', 16, ['#8386f5', '#3d43b4', '#041348', '#083e12', '#1afe49']),
  ];

  // Finish on a named palette: Vivid as published, Neon pushes saturation and
  // brightness.
  function finishColors(colors, finish) {
    // Neon scales saturation and brightness but keeps each colour's hue, so
    // greys and muted swatches stay close to themselves.
    if (finish === 'Neon') return colors.map(c => {
      const max = Math.max(...c), min = Math.min(...c);
      if (max === min) return c;
      const v = max / 255, s = (max - min) / max, v2 = Math.min(1, v * 1.15), s2 = Math.min(1, s * 1.35);
      return c.map(ch => Math.round(255 * v2 * (1 - s2 * (max - ch) / (max - min))));
    });
    return colors.map(c => c.slice());
  }

  const SURFACE = [
    { name: 'Clean', w: 85 },
    { name: 'Drafting Paper', w: 15, note: 'faint hand-drawn grain, after the BLU3PRINTS paper texture' },
  ];
  const MODIFIER = [
    { name: 'None', w: 91 },
    { name: 'Eroded', w: 9, note: 'a quarter of the cells worn through to the ground, after the BLU3PRINTS modifier' },
  ];

  const MIND = [
    { name: 'Still', w: 82, note: 'constants fixed, as in the originals' },
    { name: 'Dreaming', w: 18, note: 'a seeded neural net (after Axons) slowly bends scale, contrast and hue' },
  ];
  const EPOCH = {
    Dawn: { name: 'Dawn', lo: 1000, hi: 5000 },
    Noon: { name: 'Noon', lo: 5000, hi: 30000 },
    Deep: { name: 'Deep', lo: 10000000, hi: 40000000 },
  };
  const epochs = spec => Object.entries(spec).map(([name, w]) => ({ ...EPOCH[name], w }));

  const BASE = { m1: 1, xm: 1, yd: 1, h0: 0, k: 1, cycle: false, void: false, xs: 0, ys: 330 };
  const round = (v, step) => Math.round(v / step) * step;

  // Each species is one lineage of the 2023 sketches: its formula family plus
  // the ranges its constants may wander in when minting.
  const SPECIES = [
    { name: 'Prism', w: 18, genesis: 'main rainbow look synae.js', epochs: epochs({ Noon: 70, Dawn: 30 }),
      blurb: 'Raw modulo hue swept across the whole wheel; rainbow spirals and moiré.',
      sample: r => ({ field: 'raw', m1: r.pick([1, 2]), a: r.pick([0.01, 0.02, 0.05]), b: r.pick([0.1, 0.05, 0.01]), ys: r.int(200, 600) }) },
    { name: 'Spiral', w: 12, genesis: 'big spiral.txt', epochs: epochs({ Noon: 70, Dawn: 30 }),
      blurb: 'A base hue plus the modulo field; warm concentric spirals.',
      sample: r => ({ field: 'linear', h0: round(r.range(0, 80), 0.1), a: r.pick([0.005, 0.01, 0.02]), b: r.pick([0.01, 0.02, 0.04]), ys: r.int(200, 600) }) },
    { name: 'Strata', w: 10, genesis: 'lines color changing.txt', epochs: epochs({ Noon: 70, Dawn: 30 }),
      blurb: 'Arccosine of the field; out-of-range cells smear the last colour into streaks.',
      sample: r => ({ field: 'acos', h0: round(r.range(0, 80), 0.1), k: round(r.range(5, 20), 0.1), a: r.pick([0.005, 0.01, 0.02]), b: r.pick([0.001, 0.002, 0.005, 0.01]), ys: r.int(200, 600) }) },
    { name: 'Ember', w: 14, genesis: 'orange and red only.txt', epochs: epochs({ Noon: 70, Dawn: 30 }),
      blurb: 'Gently compressed log field around one hue; near-monochrome glow.',
      sample: r => ({ field: 'log', h0: round(r.range(2, 85), 0.1), k: round(r.range(1.5, 6), 0.1), a: r.pick([0.02, 0.05, 0.1]), b: r.pick([0.02, 0.05, 0.1]), ys: r.int(200, 600) }) },
    { name: 'Decay', w: 12, genesis: 'color changing decay.txt', epochs: epochs({ Deep: 75, Noon: 25 }),
      blurb: 'Log field whose base hue cycles every 100 frames, with black voids.',
      sample: r => ({ field: 'log', cycle: true, void: true, h0: round(r.range(25, 60), 0.1), k: round(r.range(14, 26), 0.1), a: round(r.range(0.002, 0.004), 0.0001), b: round(r.range(0.004, 0.006), 0.0001), ys: r.int(200, 600) }) },
    { name: 'Cascade', w: 16, genesis: 'up to down smaller multicolor.txt', epochs: epochs({ Noon: 70, Dawn: 30 }),
      blurb: 'Steep log field; multicolour bands falling through black.',
      sample: r => ({ field: 'log', void: true, h0: round(r.range(5, 25), 0.1), k: round(r.range(60, 95), 0.1), a: round(r.range(0.05, 0.15), 0.001), b: round(r.range(0.0025, 0.005), 0.0001), ys: r.int(200, 600) }) },
    { name: 'Invader', w: 9, genesis: 'pink space invaders.txt', epochs: epochs({ Deep: 75, Noon: 25 }),
      blurb: 'Hue pushed past the void line so only rare glyphs of pink survive.',
      sample: r => ({ field: 'log', void: true, h0: round(r.range(112, 128), 0.1), k: round(r.range(3, 6), 0.1), a: round(r.range(0.002, 0.004), 0.0001), yd: r.int(30, 60), b: round(r.range(0.004, 0.006), 0.0001), ys: -r.int(200, 600) }) },
    { name: 'Axon', w: 9, genesis: 'axon circle.txt', epochs: epochs({ Dawn: 70, Noon: 30 }),
      blurb: 'A window far down the field where the pattern curls into neuron-like arcs.',
      sample: r => ({ field: 'log', void: true, h0: round(r.range(100, 118), 0.1), k: round(r.range(50, 90), 0.1), xm: 0.2, a: 0.5, yd: r.int(18, 32), b: 0.005, xs: r.int(50, 150), ys: -r.int(10500, 12000) }) },
  ];

  // Fourteen newer species, adopted by the founder after review (six of the
  // first twenty candidates were dropped). They use the same formula, read
  // through new coordinates (polar, rings, diag, kaleido), a sine field or a
  // new op (x xor y), and mint alongside the original eight.
  // Odds are percent of ALL mints once mixed in with the original eight (see
  // MIXED). The original lineages keep about 74% of mints (the founder's floor
  // is 60%) and no new species is as common as any original one: Kaleido and
  // Lattice 5% each; Sunburst, Comet, Halo, Iris, Mandala and Plaid 2% each;
  // Bloom, Target and Pulse 1% each; the xor pair 0.5% each; Ripple 0.1%.
  const ODDS = { Kaleido: 5, Lattice: 5, Bloom: 1, Target: 1, Pulse: 1, Sierpinski: 0.5, Circuit: 0.5, Ripple: 0.1 };
  const C = (name, blurb, sample) => ({ name, w: ODDS[name] ?? 2, blurb, epochs: epochs({ Noon: 70, Dawn: 30 }), sample, candidate: true });
  const r2 = (r, lo, hi, step = 0.001) => round(r.range(lo, hi), step);
  const CANDIDATES = [
    C('Sunburst', 'Rainbow rays fanning from the centre: the Prism field read in polar coordinates.', r => ({ coord: 'polar', field: 'raw', a: r.pick([0.01, 0.02, 0.05]), b: r.pick([0.05, 0.1]), ys: r.int(200, 500), tr: r2(r, 2.5, 4, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Comet', 'Sunburst with its centre thrown off-canvas, so the rays sweep in from one side.', r => ({ coord: 'polar', cx: r2(r, -0.3, 1.3), cy: r2(r, -0.3, 1.3), field: 'raw', a: r.pick([0.01, 0.02, 0.05]), b: r.pick([0.05, 0.1]), ys: r.int(200, 500), tr: r2(r, 2, 3.5, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Halo', 'Polar log field: banded arcs and wedges meeting at the centre.', r => ({ coord: 'polar', field: 'log', void: true, h0: r2(r, 10, 70, 0.1), k: r2(r, 15, 40, 0.1), a: r2(r, 0.002, 0.01, 0.0001), b: r2(r, 0.004, 0.008, 0.0001), ys: r.int(200, 500), tr: r2(r, 6, 11, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Iris', 'Polar sine field: smooth petals and rays, softer than Sunburst.', r => ({ coord: 'polar', field: 'sin', h0: r2(r, 10, 80, 0.1), k: r2(r, 15, 40, 0.1), a: r.pick([0.005, 0.01, 0.02]), b: r2(r, 0.003, 0.012, 0.0001), ys: r.int(200, 500), tr: r2(r, 4, 7, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Bloom', 'Concentric rings with Decay’s cycling hue and black voids: a flower that keeps changing colour.', r => ({ coord: 'rings', field: 'log', void: true, cycle: true, h0: r2(r, 25, 60, 0.1), k: r2(r, 14, 26, 0.1), a: r2(r, 0.002, 0.006, 0.0001), b: r2(r, 0.004, 0.008, 0.0001), ys: r.int(200, 500) })),
    C('Ripple', 'Rings read through the Spiral field: one-hue interference like a drop in water.', r => ({ coord: 'rings', field: 'linear', h0: r2(r, 0, 70, 0.1), a: r2(r, 0.005, 0.02, 0.0001), b: r2(r, 0.02, 0.06, 0.0001), ys: r.int(200, 500), tr: r2(r, 6, 11, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Target', 'Rings read through the Prism field: full-spectrum bullseyes and four-way blooms.', r => ({ coord: 'rings', field: 'raw', a: r.pick([0.005, 0.01, 0.02]), b: r.pick([0.05, 0.1]), ys: r.int(200, 500), tr: r2(r, 5, 9, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Pulse', 'Rings through a sine: symmetric medallions with soft, rolling bands.', r => ({ coord: 'rings', field: 'sin', h0: r2(r, 10, 80, 0.1), k: r2(r, 15, 40, 0.1), a: r.pick([0.005, 0.01, 0.02]), b: r2(r, 0.003, 0.012, 0.0001), ys: r.int(200, 500), tr: r2(r, 3, 6, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Mandala', 'The Prism field folded into four mirrored quarters.', r => ({ coord: 'kaleido', field: 'raw', a: r.pick([0.01, 0.02, 0.05]), b: r.pick([0.05, 0.1]), ys: r.int(200, 500), tr: r2(r, 3, 6, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Plaid', 'The Spiral field folded into mirrored quarters: tartan-like panels of swirls.', r => ({ coord: 'kaleido', field: 'linear', h0: r2(r, 0, 70, 0.1), a: r.pick([0.005, 0.01, 0.02]), b: r.pick([0.02, 0.04, 0.08]), ys: r.int(200, 500), tr: r2(r, 5, 8, 0.1), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Kaleido', 'Cascade folded into mirrored quarters: multicolour sparks with a vertical spine.', r => ({ coord: 'kaleido', field: 'log', void: true, h0: r2(r, 5, 25, 0.1), k: r2(r, 60, 95, 0.1), a: r2(r, 0.05, 0.15, 0.001), b: r2(r, 0.0025, 0.005, 0.0001), ys: r.int(200, 500) })),
    C('Lattice', 'Cascade on the diagonal grid: woven loops cut through with black.', r => ({ coord: 'diag', field: 'log', void: true, h0: r2(r, 5, 40, 0.1), k: r2(r, 40, 90, 0.1), a: r2(r, 0.03, 0.12, 0.001), b: r2(r, 0.002, 0.005, 0.0001), ys: r.int(200, 500) })),
    C('Sierpinski', 'Time multiplied by x xor y: nested checkerboards and fractal blocks.', r => ({ op: 'xor', field: 'raw', a: r2(r, 0.00005, 0.0005, 0.00001), b: r.pick([0.05, 0.1]), ys: r.int(200, 500), scroll: r2(r, 0.5, 1.5, 0.01) * r.pick([-1, 1]), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
    C('Circuit', 'The xor field through Cascade’s log and voids: blocky circuit-board tiles.', r => ({ op: 'xor', field: 'log', void: true, h0: r2(r, 5, 40, 0.1), k: r2(r, 20, 60, 0.1), a: r2(r, 0.00005, 0.0005, 0.00001), b: r2(r, 0.003, 0.008, 0.0001), ys: r.int(200, 500), scroll: r2(r, 0.5, 1.5, 0.01) * r.pick([-1, 1]), drift: r2(r, 0.8, 1.6, 0.01) * r.pick([-1, 1]) })),
  ];
  // The minting pool: the original eight keep their ratios and share whatever
  // the newer species leave (about 74%).
  const candidateShare = CANDIDATES.reduce((sum, c) => sum + c.w, 0);
  const MIXED = [...SPECIES.map(sp => ({ ...sp, w: sp.w * (100 - candidateShare) / 100 })), ...CANDIDATES];
  const findSpecies = name => MIXED.find(t => t.name === name);

  // A species on its own, every other trait at its plainest, for previews.
  function speciesPreview(sp, seed = 1) {
    const r = rngFromHash('0x' + Array.from(sp.name + ':' + seed, ch => ch.charCodeAt(0).toString(16)).join('').padEnd(64, '5').slice(0, 64));
    for (let n = 0; ; n++) {
      const g = { ...BASE, ...sp.sample(r), fs: 10000 + seed * 1000, speed: 2, pixel: 10, sat: 85, bri: 90, frame: 'echo', transpose: false, mirror: false };
      if (n >= 15 || healthy(measure(g))) return g;
    }
  }

  // The eleven 2023 sketches as genomes. These reproduce the originals exactly.
  const G = (species, file, o) => ({ species, file, name: file.replace(/\.(txt|js)$/, ''),
    genome: { ...BASE, pixel: 10, frame: 'echo', transpose: false, mirror: false, ...o } });
  const PASTEL = { sat: 65, bri: 80 }, VIVID = { sat: 85, bri: 90 };
  const GENESIS = [
    G('Prism', 'main rainbow look synae.js', { field: 'raw', a: 0.05, b: 0.1, fs: 10000, speed: 1, ...PASTEL }),
    G('Prism', 'big spiral rainbow.txt', { field: 'raw', a: 0.01, b: 0.1, fs: 10000, speed: 1, ...PASTEL }),
    G('Prism', 'reddish big spirals.txt', { field: 'raw', m1: 2, a: 0.01, b: 0.01, fs: 10000, speed: 1, ...PASTEL }),
    G('Spiral', 'big spiral.txt', { field: 'linear', h0: 6, a: 0.01, b: 0.01, fs: 10000, speed: 1, ...VIVID }),
    G('Strata', 'lines color changing.txt', { field: 'acos', h0: 6, a: 0.01, b: 0.01, fs: 10000, speed: 1, ...VIVID }),
    G('Ember', 'orange and red only.txt', { field: 'log', h0: 6, k: 1.5, a: 0.05, b: 0.05, fs: 10000, speed: 1, ...VIVID }),
    G('Decay', 'color changing decay.txt', { field: 'log', cycle: true, void: true, h0: 40, k: 20, a: 0.003, b: 0.005, fs: 22222000, speed: 1, ...VIVID }),
    G('Cascade', 'up to down smaller multicolor.txt', { field: 'log', void: true, h0: 15, k: 85, a: 0.1, b: 0.0035, fs: 10000, speed: 2, ...VIVID }),
    G('Cascade', 'left to right smaller multicolor.txt', { field: 'log', void: true, h0: 15, k: 85, a: 0.1, b: 0.0035, fs: 10000, speed: 2, transpose: true, ...VIVID }),
    G('Invader', 'pink space invaders.txt', { field: 'log', void: true, h0: 120, k: 4, a: 0.003, yd: 44, b: 0.005, fs: 22222000, speed: 20, ys: -400, ...VIVID }),
    G('Axon', 'axon circle.txt', { field: 'log', void: true, h0: 110, k: 70, xm: 0.2, a: 0.5, yd: 25, b: 0.005, fs: 2000, speed: 10, xs: 100, ys: -11300, transpose: true, ...VIVID }),
  ];

  // ---- labelling ---------------------------------------------------------

  const byName = (table, name) => table.find(t => t.name === name);
  const tempoOf = g => (TEMPO.find(t => t.speed === g.speed) || { name: 'Custom' }).name;
  const grainOf = g => (GRAIN.find(t => t.pixel === g.pixel) || { name: 'Custom' }).name;
  const orientationOf = g => ORIENTATION.find(t => t.transpose === g.transpose && t.mirror === g.mirror).name;
  const finishOf = g => (FINISH.find(t => t.sat === g.sat && t.bri === g.bri) || { name: g.sat === 65 && g.bri === 80 ? 'Pastel (genesis only)' : 'Custom' }).name;
  const frameOf = g => FRAME.find(t => t.frame === g.frame).name;
  const epochOf = g => g.fs >= EPOCH.Deep.lo ? 'Deep' : g.fs >= EPOCH.Noon.lo ? 'Noon' : 'Dawn';
  const paletteOf = g => g.paletteName || 'Native';
  const mindOf = g => g.mind ? 'Dreaming' : 'Still';
  const surfaceOf = g => g.surface ? 'Drafting Paper' : 'Clean';
  const modifierOf = g => g.erode ? 'Eroded' : 'None';

  const FIELD_NAMES = { raw: 'Raw', linear: 'Linear', log: 'Logarithmic', acos: 'Arccosine', sin: 'Sine', tan: 'Tangent', sqrt: 'Root' };

  // The genome's hue formula written out, for display.
  function formula(g) {
    const n = v => String(Number(v.toPrecision ? v.toPrecision(4) : v));
    const xb = g.xm === 1 ? 'x' : `(x·${n(g.xm)})`, y = g.yd === 1 ? 'y' : `y/${n(g.yd)}`;
    const x = g.op === 'xor' ? `(${xb} xor y)` : g.op === 'sum' ? `(${xb} + y)` : xb;
    const t = (g.m1 === 1 ? 't' : `t·${g.m1}`);
    const v = `((${t}·${x}·${n(g.a)}) mod ${y})·${n(g.b)}`;
    const h0 = g.cycle ? `(frame mod 100) + ${n(g.h0)}` : n(g.h0);
    const k = g.k === 1 ? '' : `·${n(g.k)}`;
    const fn = { log: 'ln', acos: 'acos', sin: 'sin', tan: 'tan', sqrt: 'sqrt' }[g.field];
    const hue = g.field === 'raw' ? v : g.field === 'linear' ? `${h0} + ${v}` : `${h0} + ${fn}(${v})${k}`;
    const coords = { polar: 'x = distance from centre, y = angle', diag: 'grid turned 45°', kaleido: 'folded into four mirrored quarters', rings: 'x = y = distance from centre' }[g.coord];
    return (coords ? `coords: ${coords}\n` : '') + `t = ${g.fs.toLocaleString('en-US')} + frame/${g.speed}\nhue = ${hue}` + (g.void ? '\nhue outside 1–95 → void' : '') + (g.xs || g.ys !== 330 ? `\nwindow x+${g.xs}, y${g.ys < 0 ? '' : '+'}${g.ys}` : '');
  }

  function describe(species, g, m) {
    m = m || measure(g);
    return {
      Species: species,
      Field: FIELD_NAMES[g.field],
      Palette: paletteOf(g),
      Tone: m.tone,
      Void: m.void,
      Mind: mindOf(g),
      Surface: surfaceOf(g),
      Modifier: modifierOf(g),
      Epoch: epochOf(g),
      Tempo: tempoOf(g),
      Grain: grainOf(g),
      Orientation: orientationOf(g),
      Finish: finishOf(g),
      Frame: frameOf(g),
    };
  }

  // ---- seeded generation ---------------------------------------------------

  function rngFromHash(hash) {
    const h = hash.replace(/^0x/, '').padEnd(64, '0');
    const word = n => parseInt(h.slice(n * 8, n * 8 + 8), 16);
    let a = word(0) ^ word(4), b = word(1) ^ word(5), c = word(2) ^ word(6), d = word(3) ^ word(7);
    const next = () => { // sfc32
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      let t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
    for (let i = 0; i < 16; i++) next();
    const r = next;
    r.range = (lo, hi) => lo + (hi - lo) * next();
    r.int = (lo, hi) => Math.floor(r.range(lo, hi + 1));
    r.pick = arr => arr[Math.floor(next() * arr.length)];
    r.weighted = table => {
      let roll = next() * table.reduce((s, t) => s + t.w, 0);
      for (const t of table) if ((roll -= t.w) < 0) return t;
      return table[table.length - 1];
    };
    return r;
  }

  function randomHash() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return '0x' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }

  // Designed traits that can be swapped one at a time to compare variants.
  const TABLES = { Species: MIXED, Palette: PALETTE, Mind: MIND, Surface: SURFACE, Modifier: MODIFIER, Epoch: Object.values(EPOCH), Tempo: TEMPO, Grain: GRAIN, Orientation: ORIENTATION, Finish: FINISH, Frame: FRAME };

  // Categorical traits are rolled once, so their rarities hold exactly. Only
  // the species' continuous constants are re-rolled (deterministically) when an
  // output comes out broken; after 16 misses the most detailed attempt is kept.
  function generate(hash) {
    const r = rngFromHash(hash);
    const sp = r.weighted(MIXED);
    const epoch = r.weighted(sp.epochs);
    const tempo = r.weighted(TEMPO), grain = r.weighted(GRAIN), orient = r.weighted(ORIENTATION);
    const finish = r.weighted(FINISH), frame = r.weighted(FRAME);
    const palette = r.weighted(PALETTE), mind = r.weighted(MIND);
    const globals = {
      speed: tempo.speed, pixel: grain.pixel, transpose: orient.transpose, mirror: orient.mirror,
      sat: finish.sat, bri: finish.bri, frame: frame.frame,
    };
    let { colors, paper, tint } = palette;
    if (palette.digital) {
      const hu = r.range(0, 360);
      paper = hsv(hu, 0.61, 0.14);
      colors = ramp(paper, hsv(hu, 0.81, 1));
      tint = hsv(hu, 0.81, 0.2);
    }
    if (colors) Object.assign(globals, {
      paletteName: palette.name, colors: finishColors(colors, finish.name), paper: paper.slice(),
      rawColors: colors, tint, // kept so variants can re-apply a different Finish
    });
    const surface = r.weighted(SURFACE), modifier = r.weighted(MODIFIER);
    if (surface.name === 'Drafting Paper') globals.surface = { seed: r.int(1, 2 ** 31), tint: tint || grey(200) };
    if (modifier.name === 'Eroded') globals.erode = r.int(1, 2 ** 31);
    if (mind.name === 'Dreaming') globals.mind = dreamNet(r);
    let genome, m, attempts = 0, best = null;
    for (; attempts < 16; attempts++) {
      genome = { ...BASE, ...sp.sample(r), fs: r.int(epoch.lo, epoch.hi), ...globals };
      if (colors) genome.bands = r.pick([1, 2, 3, 5, 8, 13]);
      m = measure(genome);
      if (healthy(m)) break;
      if (!best || m.detail > best.m.detail) best = { genome, m };
    }
    const fallback = !healthy(m);
    if (fallback) ({ genome, m } = best);
    return { hash, name: 'Synaesthesia #' + hash.slice(2, 8).toUpperCase(), species: sp.name, genome, traits: describe(sp.name, genome, m), attempts: attempts + 1, fallback };
  }

  function dreamNet(r) {
    const w = () => round(r.range(-4, 4), 0.001);
    return {
      w1: Array.from({ length: 8 }, () => [w(), w()]), b1: Array.from({ length: 8 }, w),
      w2: Array.from({ length: 3 }, () => Array.from({ length: 8 }, w)), b2: Array.from({ length: 3 }, w),
    };
  }

  // A second, independent random stream per hash and purpose, so variants can
  // invent what the token never rolled (a Dreaming net, an erosion seed…)
  // without disturbing anything it did roll.
  function sideRng(hash, tag) {
    let h1 = 0x811c9dc5, h2 = 0x01000193;
    const words = [];
    for (let n = 0; n < 8; n++) {
      for (const ch of hash + '|' + tag + '|' + n) { h1 = Math.imul(h1 ^ ch.charCodeAt(0), 16777619); h2 = Math.imul(h2 ^ ch.charCodeAt(0), 2246822519); }
      words.push(((h1 ^ h2) >>> 0).toString(16).padStart(8, '0'));
    }
    return rngFromHash('0x' + words.join(''));
  }

  // The same token with one or more designed traits swapped and everything
  // else left as it was. Overrides accumulate on top of the original token.
  function variant(token, overrides) {
    const base = token.base || token;
    const all = { ...(token.overrides || {}), ...overrides };
    const t = { ...base.traits, ...all };
    const changed = k => t[k] !== base.traits[k];
    const g0 = base.genome, hash = base.hash;
    let g = { ...g0 };
    if (changed('Species')) {
      const sp = findSpecies(t.Species);
      g = { ...g, m1: BASE.m1, xm: BASE.xm, yd: BASE.yd, h0: BASE.h0, k: BASE.k, cycle: BASE.cycle, void: BASE.void, xs: BASE.xs, ys: BASE.ys, ...sp.sample(sideRng(hash, 'species:' + sp.name)) };
    }
    if (changed('Epoch')) { const e = EPOCH[t.Epoch]; g.fs = sideRng(hash, 'epoch:' + e.name).int(e.lo, e.hi); }
    g.speed = byName(TEMPO, t.Tempo).speed;
    g.pixel = byName(GRAIN, t.Grain).pixel;
    const o = byName(ORIENTATION, t.Orientation);
    g.transpose = o.transpose; g.mirror = o.mirror;
    g.frame = byName(FRAME, t.Frame).frame;
    const finish = byName(FINISH, t.Finish) || { name: t.Finish, sat: g0.sat, bri: g0.bri };
    g.sat = finish.sat; g.bri = finish.bri;
    const palette = byName(PALETTE, t.Palette);
    let tint;
    if (!palette.colors && !palette.digital) {
      delete g.paletteName; delete g.colors; delete g.paper; delete g.rawColors; delete g.tint; delete g.bands;
    } else {
      let raw = palette.colors, paper = palette.paper;
      tint = palette.tint;
      if (palette.digital) {
        if (g0.paletteName === 'Digital') { raw = g0.rawColors; paper = g0.paper; tint = g0.tint; }
        else {
          const hu = sideRng(hash, 'digital').range(0, 360);
          paper = hsv(hu, 0.61, 0.14); raw = ramp(paper, hsv(hu, 0.81, 1)); tint = hsv(hu, 0.81, 0.2);
        }
      }
      Object.assign(g, { paletteName: palette.name, rawColors: raw, tint, colors: finishColors(raw, finish.name), paper: paper.slice() });
      if (g.bands === undefined) g.bands = sideRng(hash, 'bands').pick([1, 2, 3, 5, 8, 13]);
    }
    if (t.Surface === 'Drafting Paper') g.surface = { seed: g0.surface ? g0.surface.seed : sideRng(hash, 'surface').int(1, 2 ** 31), tint: tint || grey(200) };
    else delete g.surface;
    if (t.Modifier === 'Eroded') g.erode = g0.erode || sideRng(hash, 'erode').int(1, 2 ** 31);
    else delete g.erode;
    if (t.Mind === 'Dreaming') g.mind = g0.mind || dreamNet(sideRng(hash, 'mind'));
    else delete g.mind;
    return { hash, name: base.name, species: t.Species, genome: g, traits: describe(t.Species, g), base, overrides: all };
  }

  function metadata(token) {
    return {
      name: token.name,
      description: 'Synaesthesia: a field of hue computed from time, position and a single modulo, descended from eleven p5.js sketches made in 2023.',
      hash: token.hash,
      attributes: Object.entries(token.traits).map(([trait_type, value]) => ({ trait_type, value })),
    };
  }

  window.Synae = {
    W, H, WHITE, CANDIDATES, MIXED, findSpecies, speciesPreview, formula, drawFrame, eachCell, rng: rngFromHash, measure, generate, variant, randomHash, metadata, describe, TABLES,
    SPECIES, GENESIS, TEMPO, GRAIN, ORIENTATION, FINISH, FRAME, EPOCH, PALETTE, MIND, SURFACE, MODIFIER, FAMILIES, byName,
  };
})();
